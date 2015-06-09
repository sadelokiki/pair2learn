"use strict";

var express = require("express"),
    ctrl = require("../controllers/users.controller"),
    router = express.Router();

module.exports = function(app) {
  router.route('/users')
    .post(ctrl.signup)

  app.use("/api", router);
}
