const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  models.App.findAll()
    .then(function(apps) {
      res.send(apps);
    });
});

// router.get('/:id', function(req, res) {
//   const
// });




module.exports = router;
