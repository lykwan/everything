const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  models.Feed.findAll({
    where: { userId: req.session.user.id },
    include: [
      { model: models.Plugin, attributes: ['name'] },
      { model: models.Subfeed, attributes: ['id', 'name', 'feedId'] }
    ]
  }).then(feeds => {
    res.json(feeds);
  });
});

module.exports = router;
