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
    // const result = feeds.map(feed => {
    //   const feedObj = Object.assign({}, feed);
    //   feedObj.name = feed.Plugin.name;
    //   feedObj.subfeeds = feed.Subfeeds;
    //   delete feedObj.Subfeeds;
    //   return feedObj;
    // });
    // console.log(result);
    res.json(feeds);
  });
});

module.exports = router;
