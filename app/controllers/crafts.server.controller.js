'use strict';

require('../models/crafts.server.model.js');
var mongoose = require("mongoose"),
  Crafts = mongoose.model('Crafts');

exports.postCraft = function(req, res) {
  Crafts.create(req.body, function(err, craft) {
    if (err) {
      res.send(err);
    }
    res.json(craft)
  })
};

exports.findCrafts = function(req, res) {
  Crafts.find({}, function(err, crafts) {
    if (err) {
      res.send(err);
    }
    res.json(crafts);
  });
};

exports.findOneCraft = function(req, res) {
  var craft_id = req.params.id
  Crafts.find({
    _id: craft_id
  }, function(err, craft) {
    if (err) {
      res.send(err);
    }
    res.send(craft);
  });
};
