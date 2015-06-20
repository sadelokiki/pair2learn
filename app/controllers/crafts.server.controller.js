'use strict';

require('../models/crafts.server.model.js');
var mongoose = require("mongoose"),
  formidable = require("formidable"),
  cloudinary = require("cloudinary"),
  Crafts = mongoose.model('Crafts');

cloudinary.config({
  cloud_name: 'dtpf1mle2',
  api_key: '548953239178178',
  api_secret: 'JLqmFBkh_rDjvSNJs8rBDm4MSbI'
});

exports.postImage = function(req, res, next) {
  var forms = new formidable.IncomingForm();
  forms.parse(req, function(err, fields, files) {
    req.body = fields;
    cloudinary.uploader.upload(files.file.path, function(result) {
      req.body.picture = result.url;
      next();
    }, {
      width: 300,
      height: 300
    });
  });
};

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

exports.editCraft = function(req, res) {
  var craft_id = req.params.id;
  Crafts.update({
    _id: craft_id
  }, req.body, function(err, data) {
    if (err) {
      res.send({
        error: {
          code: 9000,
          message: 'user not found',
          error: err
        }
      });
    }
    return res.status(200).json({
      // token: generateJWT(user),
      data: data
    });
  });
};

exports.deleteOneCraft = function(req, res) {
  var craft_id = req.params.id;
  Crafts.remove({
    _id: craft_id
  }, function(err, craft) {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(craft);
  });
};

