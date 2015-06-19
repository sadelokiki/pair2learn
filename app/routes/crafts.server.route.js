"use strict";

var express = require("express"),
  ctrl = require("../controllers/crafts.server.controller.js"),
  router = express.Router();

module.exports = function(app) {
  router.route('/crafts')
    .post(ctrl.postCraft)
    .get(ctrl.findCrafts)

  router.route('/crafts/:id')
    .get(ctrl.findOneCraft)

  app.use('/', router);
  return router;
}
