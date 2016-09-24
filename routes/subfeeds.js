const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.post('/', function(req, res) {
  let subfeedData;
  models.Feed.findOrCreate({
    pluginId: req.body.pluginId,
    userId: req.session.user.id
  }).then(feed => {
    models.Subfeed.create({
      feedId: feed
  }).then(subfeed => {
    subfeedData = subfeed;
    models.Plugin.find({ id: req.body.feedId });
  }).then(feed => {
    const Plugin = require(`./plugins/${ feed.path }/backend.js`);
    req.session.plugins[subfeedData.id] = new Plugin(subfeedData.params);
  });
});

router.get('/:id', function(req, res) {
  const appId = req.params.id;
  //TODO: fix this
  const testData = [{
    id:   1,
    title: 'hey',
    img: null,
    appName: 'ABC News'
  }];

});

// router.get('/authForm', function (req, res) {
// get the auth form string, pass it to frontend??

// router.post('/:id/login', ) {





module.exports = router;
