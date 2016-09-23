const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  models.Apps.findAll()
    .then(function(apps) {
      res.send(apps);
    }
  });




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
