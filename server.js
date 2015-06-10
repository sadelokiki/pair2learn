'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var db = require("./config/mongoose")(),
    app = require("./config/express")(),
    port = process.env.PORT || 3000;

app.listen(port, function(err) {
  if(err){
    console.log(err);
  }
  console.log('Available on port' + port);
});

module.exports = app;