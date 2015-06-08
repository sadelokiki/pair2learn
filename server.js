'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require("express")
var db = require("./config/mongoose")(),
    app = require("./config/express")(),
    port = process.env.PORT || 3000;

app.listen(port, function(error) {
  if(error){
    console.log(error);
  }
  console.log('Available on port' + port);
});

app.use(express.static(__dirname + '/public/'));

module.exports = app;