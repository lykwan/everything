const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.post('/', function(req, res) {
  
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




module.exports = router;
