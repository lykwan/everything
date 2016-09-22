const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const users = require('./routes/users.js');

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

app.post('/login', function(req, res) {
  https.get(
    `https://graph.facebook.com/me?fields=id,name&access_token=${req.body.accessToken}`,
    (fbRes) => {
    fbRes.on('data', (data) => {
      const userProfile = JSON.parse(data);
      req.session.accessToken = req.body.accessToken;
    });
  }).on('error', (e) => {
    console.error(e);
  });

  console.log(req.session);
  res.send('hello');
});

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.send('hello');
});

function restrictLogin(req, res, next) {
  if (req.session && req.session.user && req.) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(restrictLogin);
app.use(express.static('public'));

app.use('/users', users);

app.listen(3000, function () {
  console.log('Everything listening on port 3000!');
});
