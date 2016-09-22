const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  models.Collection.findAll({
    include: [{
      model: models.User,
      as: 'User',
      attributes: ['name', 'id'],
      where: { id: 1 }
    }]
  }).then(function(collections) {
    res.json(collections);
  });
});

router.post('/', function(req, res) {
  models.Collection.create({
    title: req.body.title
    //ADD USER ID HERE
  }).then(function(collection) {
    res.json(collection);
  });
});

module.exports = router;
