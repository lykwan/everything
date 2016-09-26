const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  models.Plugin.findAll()
    .then(plugins => {
      res.send(plugins);
    });
});

module.exports = router;
