const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.post('/', function(req, res) {
  models.Feed.findOrCreate({
    where: {
      pluginId: req.body.pluginId,
      userId: req.session.user.id
    }
  }).spread(feed => {
    console.log(feed.id);
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
    console.log(subfeed.Feed);
    const plugin = subfeed.Feed.Plugin;
    console.log(plugin);
    const SubfeedPlugin = require(`../plugins/${ plugin.path }/backend.js`);
    req.session.subfeedPlugins[subfeed.id] =
      new SubfeedPlugin(subfeed.params);
    res.json(subfeed);
  });
});

// router.get('/authForm', function (req, res) {
// get the auth form string, pass it to frontend??

// router.post('/:id/login', ) {

module.exports = router;
