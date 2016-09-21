var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var users = require('./routes/users.js');
var collections = require('./routes/collections.js');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: 'boo',
  resave: false,
  saveUninitialized: false
}));

// function restrictLogin(req, res, next) {
//   if (req.session.user || req.url === '/') {
//     next();
//   } else {
//     req.session.error = 'Access denied!';
//     res.redirect('/login');
//   }
// }
//
// app.use(restrictLogin);
// app.get('/login', function (req, res) {
//   req.session.user = 'blah';
//   console.log(req.session);
//   res.send('hello');
// });
//
// app.get('/blah', function(req, res) {
//   console.log(req.session);
//   res.send('hellowws');
// });
//
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/users', users);
app.use('/collections', collections);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
