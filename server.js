const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const users = require('./routes/users.js');

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

app.post('/login', function(req, res) {
  console.log(req);
  // https.get('https://graph.facebook.com/me?fields=id,name&access_token=EAACEdEose0cBAMxMDz4ZBgB7rIBO6kn1BhNBQLqhZB20D2NikOlRkmvX3NIPsbgnEHDO2jQou7fpxajXVOCRpEvftU6JY6lj8IOwm0FDzlPeFjFntEgqM65HyXdQumkarif2ZBcDd6KSPGqDxxWefotQK4X15kkbN4t556IZAAZDZD', (res) => {
  //   console.log('statusCode:', res.statusCode);
  //
  //   res.on('data', (d) => {
  //     const p = JSON.parse(d);
  //     console.log(p);
  //     console.log(p.id);
  //   });
  //
  // }).on('error', (e) => {
  //   console.error(e);
  // });
  // console.log(req.session);
  res.send('hello');
});

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.send('hello');
});

function restrictLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(restrictLogin);
app.use('/users', users);

app.listen(3000, function () {
  console.log('Everything listening on port 3000!');
});
