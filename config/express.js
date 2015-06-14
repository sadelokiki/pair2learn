'use strict';

var express = require("express"),
    morgan  = require("morgan"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    passport = require("passport");

module.exports = function() {
  var app = express();

  if(process.env.NODE_ENV ===  'development') {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ 
    extended: true 
  }));
  app.use(bodyParser.json());
  app.use(expressSession({secret: 'chitech'}));
  app.use(passport.initialize());
  app.use(passport.session()); 
  
  app.use(express.static('./public/'));

  require('./passport')(passport);

  var routes = require("../app/routes/users.route")(app, passport);
  

  //  app.use('/', require('./routes')(passport));

  return app;
};