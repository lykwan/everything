const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  res.send(models.Plugin.findAll({}));
});

module.exports = router;
