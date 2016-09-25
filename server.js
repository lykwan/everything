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

const client = redis.createClient();
client.on('connect', function() {
  console.log('connected');
});

const itemsPerPage = 20;

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

app.post('/login', function(req, res) {
  https.get(
    `https://graph.facebook.com/me?fields=id,name&access_token=${req.body.accessToken}`,
    (fbRes) => {
    fbRes.on('data', (data) => {
      const userProfile = JSON.parse(data);
      if (userProfile.error) {
        res.status(401).json({ error: userProfile.error });
      } else {
        req.session.accessToken = req.body.accessToken;
        let subfeedsData;
        models.User.findOrCreate({
          where: { fbId: userProfile.id },
          defaults: { name: userProfile.name }
        }).spread(user => {
          req.session.user = user;
          return user.getFeeds();
        }).then(feeds => {
          return models.Subfeed.findPluginsFromFeeds(
            feeds, models.Feed, models.Plugin
          );
        }).then(subfeeds => {
          req.session.subfeedPlugins = {};
          subfeeds.forEach(subfeed => {
            subfeed.createNewSubfeedPlugin(req.session.subfeedPlugins);
          });

          res.send(req.session.user);
        });
      }
    }).on('error', (e) => {
      res.status(404).json({ error: e });
    });
  });
});

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

// app.get('subfeeds/:id', function(req, res) {
//   const subfeedPlugin = req.session.subfeedPlugins[req.params.id];
//   let startRange, endRange;
//   client.hgetall(req.params.id, function(err, itemsObj) {
//     let feedItems = [];
//     if (itemsObj) {
//       const min = Math.min.apply(Math, Object.keys(itemsObj));
//       const max = Math.max.apply(Math, Object.keys(itemsObj));
//       startRange = itemsPerPage * req.params.page + min;
//       endRange = itemsPerPage * (req.params.page + 1) + min;
//       if (itemsObj[endRange - 1] !== undefined) {
//         for (let i = startRange; i < endRange; i++) {
//           const feedItem = JSON.parse(itemsObj[i]);
//           feedItems.push(feedItem);
//         }
//       } else {
//         feedItems = fetchSubfeedData(startRange,
//                                       endRange,
//                                       itemsObj,
//                                       subfeedPlugin,
//                                       req.params.id,
//                                       max+1
//                                     );
//       }
//     } else {
//       startRange = itemsPerPage * req.params.page;
//       endRange = itemsPerPage * (req.params.page + 1);
//       feedItems = fetchSubfeedData(startRange,
//                                     endRange,
//                                     {},
//                                     subfeedPlugin,
//                                     req.params.id,
//                                     0
//                                   );
//     }
//     res.send({ feedItems: feedItems });
//   });
// });
//
// function fetchSubfeedData
//   (startRange, endRange, itemsObj, subfeedPlugin, subfeedId, startIdx) {
//   let feedItems = [];
//   subfeedPlugin.getOlderData(itemsPerPage, dataPoints => {
//     for (let i = 0; i < dataPoints.length; i++) {
//       const feedItem = dataPoints[i];
//       feedItems.push(feedItem);
//       itemsObj[startIdx + i] = JSON.stringify(feedItem);
//     }
//   });
//   client.hmset(subfeedId, itemsObj, function(err, reply) {
//     if (reply === "OK") {
//       return feedItems;
//     }
//   });
// }
//
//
app.use(restrictLogin);
app.use('/users', userRoutes);
app.use('/plugins', pluginRoutes);
app.use('/feeds', feedRoutes);
app.use('/subfeeds', subfeedRoutes);

app.listen(3000, function () {
  console.log('Everything listening on port 3000!');
});
