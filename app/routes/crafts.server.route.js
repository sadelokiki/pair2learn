"use strict";

var express = require("express"),
  ctrl = require("../controllers/crafts.server.controller.js"),
  router = express.Router();

module.exports = function(app) {
  router.route('/crafts')
    .get(ctrl.findCrafts)
    .post(ctrl.postImage, ctrl.postCraft)

  router.route('/crafts/:id')
    .get(ctrl.findOneCraft)
    .put(ctrl.editCraft)
    .delete(ctrl.deleteOneCraft);


  app.use('/', router);
  return router;
}
