const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const users = require('./routes/users.js');
const apps = require('./routes/apps.js');
const models = require('./models/index');
const fs = require('fs');
const path = require('path');

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

// fs.readdirSync(path.join(__dirname, 'plugins'))
//   .forEach(file => {
//     // does this need to be async as well?
//     models.Plugin.create({ name: file, path: file });
//   });




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
      const jsonData = JSON.parse(data);
      if (jsonData.error) {
        res.status(401).json({ error: jsonData.error });
      } else {
        req.session.accessToken = req.body.accessToken;
        req.session.userProfile = jsonData;
        res.redirect('/users/me');
      }
    });
  }).on('error', (e) => {
    res.status(404).json({ error: e });
  });
});

app.delete('/logout', function(req, res) {
  req.session.destroy();
  res.send({ message: 'successfully logged out' });
});

function restrictLogin(req, res, next) {
  if (req.session && req.session.accessToken) {
    next();
  } else {
    res.status(401).json({ message: 'user must be logged in' });
  }
}

app.use(restrictLogin);
app.use('/users', users);
app.use('/apps', apps);

app.listen(3000, function () {
  console.log('Everything listening on port 3000!');
});
