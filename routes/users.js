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

router.get('/me', function(req, res) {
  models.User.findOne({
    where: {
      fbId: req.session.userProfile.id
    }
  }).then(function(user) {
    if (user) {
      res.json(user);
    } else {
      models.User.create({
        fbId: req.session.userProfile.id,
        name: req.session.userProfile.name
      }).then(function(newUser) {
        res.json(newUser);
      }).catch(function(err) {
        res.status(422).json({ error: err });
      });
    }
  });
});

module.exports = router;
