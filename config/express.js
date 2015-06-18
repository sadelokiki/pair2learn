'use strict';

var express = require("express"),
    morgan  = require("morgan"),
    bodyParser = require("body-parser"),
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
  app.use(passport.initialize());
  app.use(express.static('./public/'));

  require('./passport')(passport);
  require("../app/routes/users.server.route")(app, passport);

  return app;
};