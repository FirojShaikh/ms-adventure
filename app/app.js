//

var express = require('express');

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var flow = require('./routes/flow-node.js')('public/content/events');
// Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = false;

var twitter = require('twitter');

var mongoose = require('mongoose');
require('./models/userprofile.js');
require('./models/event.js');
require('./models/registration.js');
require('./models/contact.js');
var eventService=require('./services/event-service');
var registrationService=require('./services/registration-service');
var contactService=require('./services/contact-service');
var twitterService=require('./services/twitter-feed-service');
var api = require('./routes/api');
var besmartapi = require('./routes/besmart-api')(eventService,registrationService,contactService,twitterService);
var authenticate = require('./routes/authenticate')(passport);

mongoose.connect("mongodb://localhost:27017/besmart_dev");

var app = express();
var port = process.env.PORT || 3000;

app.use(session({
	secret:"super duper secret"
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initilize passport
var initPassport=require('./passport-init');
initPassport(passport);

app.use('/api', api);
app.use('/besmartapi',besmartapi);
app.use('/auth', authenticate);

app.use(express.static(__dirname + '/public'));     //serve static assets
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// app.get('*', function(req, res) {
//     res.sendfile('./public/#/home'); // load the single view file (angular will handle the page changes on the front-end)
// });

// Handle uploads through Flow.js
app.post('/upload', multipartMiddleware, function(req, res) {
  flow.post(req, function(status, filename, original_filename, identifier) {
    console.log('POST', status, original_filename, identifier);
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }
    res.status(status).send();
  });
});


app.options('/upload', function(req, res){
  console.log('OPTIONS');
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.status(200).send();
});

// Handle status checks on chunks through Flow.js
app.get('/upload', function(req, res) {
  flow.get(req, function(status, filename, original_filename, identifier) {
    console.log('GET', status);
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }

    if (status == 'found') {
      status = 200;
    } else {
      status = 204;
    }

    res.status(status).send();
  });
});

app.listen(port, function() {
    console.log('Listening on ' + port);
});