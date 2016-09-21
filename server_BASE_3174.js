var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var users = require('./routes/users.js');

app.use(express.static(__dirname + 'public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/users', users);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
