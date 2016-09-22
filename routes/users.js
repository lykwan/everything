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

router.get('/login', function(req, res) {
  req.session.user = 'blah';
  console.log(req.session);
  res.send('hello');
});

router.get('/hello', function(req, res) {
  console.log(req.session);
  res.send('hellowws');
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.send('hello');
});

module.exports = router;
