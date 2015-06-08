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

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ 
    extended: false 
  }));
  return app;
}