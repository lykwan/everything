const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.post('/', function(req, res) {
  models.User.create({
    fbAccessToken: 'whatever',
    name: req.body.name
  }).then(function(user) {
    res.json(user);
  });
});

module.exports = router;
