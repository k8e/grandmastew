'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var data = require('./data/data.json');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Add headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  next();
});

// Create our Express router
var router = express.Router();
app.use('/', router);

/////////////////WebPages/////////////////////////
app.get('/', function(req, res) {
  //res.send("Hello world");
  res.render('index.ejs', data);
});
app.get('/viewfood', function(req, res) {
  var obj = {};
  var food = data.food[req.query.foodId];
  obj["food"]=food;
  obj["seller"]=data.sellers[food.seller];
  res.render('viewfood.ejs',obj);
});
app.get('/addToCart', function(req, res) {
  res.render('addToCart.ejs');
});

//////////Start the server
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address,
    server.address().port);
  console.log('Press Ctrl+C to quit.');
});
