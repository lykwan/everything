const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.post('/', function(req, res) {
  models.Feed.create({
    pluginId: req.body.pluginId,
    collectionId: req.body.collectionId
  }).then(function(feed) {
    res.json(feed);
  }).catch(function(errors) {
    res.send(errors);
  });
});

module.exports = router;
