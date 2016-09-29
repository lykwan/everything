const models = require('../models/index');
const express = require('express');
const router  = express.Router();
const blockQueue = require('block-queue');

const itemsPerPage = 3;

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
            { model: models.Plugin, attributes: ['path'] }
          ]}
        ]
      });
    }).then(subfeed => {
      const plugin = subfeed.Feed.Plugin;
      const SubfeedPlugin = require(`../plugins/${ plugin.path }/backend.js`);
      const queue = app.locals.makeNewBlockQueue(subfeed.id);
      const pluginInstance = new SubfeedPlugin(subfeed.params);
      pluginInstance.getNewerData(queue);
      app.locals.subfeedPlugins[subfeed.id] = pluginInstance;
      res.json(subfeed);
    });
  });

  // router.get('/authForm', function (req, res) {
  // get the auth form string, pass it to frontend??

  // router.post('/:id/login', ) {


  router.get('/:id', function(req, res) {
    const subfeedPlugin = app.locals.subfeedPlugins[req.params.id];
    let startRange, endRange;
    client.hgetall(req.params.id, function(err, itemsObj) {
      let feedItems = [];
      console.log('itemsObj', itemsObj);
      if (itemsObj) {
        const min = Math.min.apply(Math, Object.keys(itemsObj));
        const max = Math.max.apply(Math, Object.keys(itemsObj));
        console.log(max);
        console.log(max + 5);
        startRange = itemsPerPage * parseInt(req.query.page) + min;
        endRange = itemsPerPage * (parseInt(req.query.page) + 1) + min;
        console.log('page', req.query.page);
        console.log('min', min);
        console.log('startRange', startRange);
        console.log('endRange', endRange);
        if (itemsObj[endRange - 1] !== undefined) {
          console.log('in this if block');
          for (let i = startRange; i < endRange; i++) {
            const feedItem = JSON.parse(itemsObj[i]);
            feedItems.push(feedItem);
          }
          res.send({ feedItems: feedItems });
        } else {
          console.log('in this else block, fetching more data');
          fetchSubfeedData(startRange,
                            endRange,
                            itemsObj,
                            subfeedPlugin,
                            req.params.id,
                            max+1,
                            res
                          );
        }
      } else {
        console.log('in the else block, fetching completely new data');
        startRange = itemsPerPage * req.query.page;
        endRange = itemsPerPage * (req.query.page + 1);
        fetchSubfeedData(startRange,
                          endRange,
                          {},
                          subfeedPlugin,
                          req.params.id,
                          0,
                          res
                        );
      }
    });
  });

  function fetchSubfeedData
    (startRange, endRange, itemsObj, subfeedPlugin, subfeedId, startIdx, res) {
    let feedItems = [];
    // subfeedPlugin.getOlderData(itemsPerPage, dataPoints => {
    const dataPoints = [{ title: 'hey1', img: 'blah' }, { title: 'what2', img: 'blah again' }, { title: 'whattttt3', img: 'blah againaayy' }, { title: 'whaaaaat4', img: 'yuppp again' }];
      for (let i = 0; i < dataPoints.length; i++) {
        const feedItem = dataPoints[i];
        feedItems.push(feedItem);
        itemsObj[startIdx + i] = JSON.stringify(feedItem);
      }
    // });
    client.hmset(subfeedId, itemsObj, function(setErr, reply) {
      if (reply === "OK") {
        client.hgetall(subfeedId, function(getErr, fetchedItemsObj) {
          let fetchedFeedItems = [];
          for (let i = startRange; i < endRange; i++) {
            const feedItem = JSON.parse(fetchedItemsObj[i]);
            fetchedFeedItems.push(feedItem);
          }

          res.send({ feedItems: fetchedFeedItems });
          return feedItems;
        });
      }
    });
  }


  return router;

};
