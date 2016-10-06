const models = require('../models/index');
const express = require('express');
const router  = express.Router();
const blockQueue = require('block-queue');

const itemsPerPage = 20;

module.exports = function(app, client) {
  router.post('/', function(req, res) {
    models.Feed.findOrCreate({
      where: {
        pluginId: req.body.pluginId,
        userId: req.session.user.id
      }
    }).spread(feed => {
      return models.Subfeed.create({
        feedId: feed.id,
        name: req.body.subfeedName,
        params: req.body.subfeedParams
      });
    }).then(subfeed => {
      return models.Subfeed.find({
        where: { id: subfeed.id },
        include: [
          { model: models.Feed, attributes: ['pluginId'], include: [
            { model: models.Plugin, attributes: ['path', 'name'] }
          ]}
        ]
      });
    }).then(subfeed => {
      if (!app.locals.subfeedPlugins[subfeed.id]) {
        subfeed.createNewSubfeedPlugin(app.locals.subfeedPlugins,
                                       app.locals.makeNewBlockQueue
                                      );
      }

      res.json(subfeed);
    });
  });

  // router.get('/authForm', function (req, res) {
  // get the auth form string, pass it to frontend??

  // router.post('/:id/login', ) {
  //
  router.get('/all', function(req, res) {
    models.User.find({
      where: { id: req.session.user.id }
    }).then(user => {
      return user.getFeeds();
    }).then(feeds => {
      return models.Subfeed.findPluginsFromFeeds(
        feeds, models.Feed, models.Plugin
      );
    }).then(subfeeds => {
      const subfeedIds = subfeeds.map(subfeed => subfeed.id);
      const numSubfeeds = subfeedIds.length;
      const numItemsPerSubfeed = Math.floor(itemsPerPage / numSubfeeds) + 1;
      let allFeedItems = {};
      let numSubfeedsGottenBack = 0;
      subfeedIds.forEach(id => {
        let lastItemId = req.body.lastItemIds ?
                          req.body.lastItemIds[id] :
                          null;
        // push all the feed items to the all feed items arr, then send it
        // when all of the fetching is done
        getFeedItems(id, lastItemId, numItemsPerSubfeed, feedItems => {
          numSubfeedsGottenBack++;
          allFeedItems[id] = feedItems;
          if (numSubfeedsGottenBack === numSubfeeds) {
            res.send({ feedItems: allFeedItems });
          }
        });
      });
    });
  });

  router.get('/:id', function(req, res) {
    getFeedItems(req.params.id, req.body.lastItemId, itemsPerPage,
      (feedItems) => {
        res.send({ feedItems: feedItems });
    });
  });

  function getFeedItems(subfeedId, lastItemId, numfeedItems, sendFeedItems) {
    const subfeedPlugin = app.locals.subfeedPlugins[subfeedId];
    let startRange, endRange;
    client.hgetall(subfeedId, function(err, itemsDict) {
      let feedItems = [];
      if (itemsDict) {
        const min = Math.min.apply(Math, Object.keys(itemsDict));
        const max = Math.max.apply(Math, Object.keys(itemsDict));
        startRange = (lastItemId) ?
                      parseInt(lastItemId) + 1 :
                      min;
        endRange = startRange + itemsPerPage;

        if (startRange < min) {
          sendFeedItems([]);
          return;
        }

        if (itemsDict[endRange - 1] !== undefined) {
          console.log('in this if block');
          for (let i = startRange; i < endRange; i++) {
            const feedItem = JSON.parse(itemsDict[i]);
            feedItems.push(feedItem);
          }
          sendFeedItems(feedItems);
        } else {
          console.log('in this else block, fetching more data');
          fetchSubfeedData(startRange,
                            endRange,
                            itemsDict,
                            subfeedPlugin,
                            subfeedId,
                            max+1,
                            sendFeedItems
                          );
        }
      } else {
        console.log('in the else block, fetching completely new data');
        startRange = 0;
        endRange = startRange + itemsPerPage;
        fetchSubfeedData(startRange,
                          endRange,
                          {},
                          subfeedPlugin,
                          subfeedId,
                          0,
                          sendFeedItems
                        );
      }
    });
  }

  function fetchSubfeedData
    (startRange, endRange, itemsDict, subfeedPlugin, subfeedId,
      startIdx, sendFeedItems) {
    models.Subfeed.find({
      where: { id: subfeedId },
      include: [
        { model: models.Feed, attributes: ['pluginId'], include: [
          { model: models.Plugin, attributes: ['path'] }
        ]}
      ]
    }).then(subfeed => {
      const pluginPath = subfeed.Feed.Plugin.path;
      const putDataInDict = function(dataPoints) {
        if (dataPoints === null) {
          noMoreData = true;
          return;
        }

        dataPoints.forEach((dataPoint) => {
          dataPoint.id = feedItemId;
          dataPoint.pluginPath = pluginPath;
          itemsDict[feedItemId] = JSON.stringify(dataPoint);
          feedItemId++;
        });

      };

      let feedItemId = startIdx;
      let noMoreData = false;
      while (!itemsDict[endRange - 1] && !noMoreData) {
        // fetching older data points from the plugin
        subfeedPlugin.getOlderData(itemsPerPage, putDataInDict);
      }

      // putting the updated feed items dict in cache, and
      // fetching the feed items needed to send a response
      client.hmset(subfeedId, itemsDict, function(setErr, reply) {
        if (reply === "OK") {
          client.hgetall(subfeedId, function(getErr, fetchedItemsDict) {
            let feedItems = [];
            for (let i = startRange; i < endRange; i++) {
              if (!fetchedItemsDict[i]) {
                break;
              }
              const feedItem = JSON.parse(fetchedItemsDict[i]);
              feedItems.push(feedItem);
            }

            sendFeedItems(feedItems);
          });
        }
      });
    });

  }

  return router;
};
