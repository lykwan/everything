const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const models = require('./models/index');
const userRoutes = require('./routes/users.js');
const feedRoutes = require('./routes/feeds.js');
const subfeedRoutes = require('./routes/subfeeds.js');
const pluginRoutes = require('./routes/plugins.js');
const fs = require('fs');
const path = require('path');
const redis = require('redis');
const async = require('async');
const blockQueue = require('block-queue');

const client = redis.createClient();
client.on('connect', function() {
  console.log('connected');
});

app.use(express.static('public'));

// req body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express auth session
app.use(cookieParser());
app.use(session({
  secret: 'boo',
  resave: false,
  saveUninitialized: false
}));

// update plugins table
let files = fs.readdirSync(path.join(__dirname, 'plugins'));
models.Plugin.addNewPlugins(files);
models.Plugin.cleanUpOldPlugins(files);

// defining the blockqueue for
app.locals.makeNewBlockQueue = function(subfeedId) {
  const queue = blockQueue(1, function(dataPoint, done) {
    client.hgetall(subfeedId, function(getErr, itemsObj) {
      let min;
      if (itemsObj) {
        min = Math.min.apply(Math, Object.keys(itemsObj));
      } else {
        min = 0;
      }

      let newItemsObj = itemsObj || {};
      newItemsObj[min - 1] = JSON.stringify(dataPoint);
      client.hmset(subfeedId, newItemsObj, function(setErr) {
        done();
      });
    });

  });

  return queue;
};



// var findDocuments = function(db) {
//   return new Promise(function (resolve, reject) {
//     // Get the documents collection
//     var collection = db.collection('documents');
//     // Find some documents
//     collection.find({'a': 3}).toArray(function(err, docs) {
//       assert.equal(err, null);
//       console.log("Found the following records");
//       console.log(docs);
//       resolve(docs);
//     });
//   }).then(function (docs) {
//     return docs.map(functionfdsklfmd)
//   }).then(function (modifiedDocs) {
//
//   }).error(function
// }

// keeping all the subfeed plugin instances in app.locals
app.locals.subfeedPlugins = {};

app.post('/login', function(req, res) {
  if (req.body.accessToken === "guest") {
    guestLogin(req, res);
  }

  https.get(
    `https://graph.facebook.com/me?fields=id,name&access_token=${req.body.accessToken}`,
    (fbRes) => {
    fbRes.on('data', (data) => {
      const userProfile = JSON.parse(data);
      if (userProfile.error) {
        res.status(401).json({ error: userProfile.error });
      } else {
        req.session.accessToken = req.body.accessToken;
        models.User.findOrCreate({
          where: { fbId: userProfile.id },
          defaults: { name: userProfile.name }
        }).spread(user => {
          login(req, res, user);
        });
      }
    }).on('error', (e) => {
      res.status(404).json({ error: e });
    });
  });
});

function guestLogin(req, res) {
  models.User.findOrCreate({
    where: { fbId: "guest" },
    defaults: { name: "Guest" }
  }).spread(user => {
    login(req, res, user);
  });
}

function login(req, res, user) {
  let subfeedsData;
  req.session.user = user;
  user.getFeeds()
  .then(feeds => {
    return models.Subfeed.findPluginsFromFeeds(
      feeds, models.Feed, models.Plugin
    );
  }).then(subfeeds => {
    subfeeds.forEach(subfeed => {
      subfeed.createNewSubfeedPlugin(app.locals.subfeedPlugins,
                                     app.locals.makeNewBlockQueue
                                    );
    });

    res.send(req.session.user);
  });
}

app.delete('/logout', function(req, res) {
  req.session.destroy();
  res.send({ message: 'successfully logged out' });
});

function restrictLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'user must be logged in' });
  }
}

app.use(restrictLogin);
app.use('/users', userRoutes);
app.use('/plugins', pluginRoutes);
app.use('/feeds', feedRoutes);
app.use('/subfeeds', subfeedRoutes(app, client));

app.listen(3000, function () {
  console.log('Everything listening on port 3000!');
});
