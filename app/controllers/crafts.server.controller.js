'use strict';

require('../models/crafts.server.model.js');
var mongoose = require("mongoose"),
  formidable = require("formidable"),
  cloudinary = require("cloudinary"),
  Crafts = mongoose.model('Crafts'),
  config = require('../../config/config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
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
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(craft);
  });
};

exports.findCrafts = function(req, res) {
  Crafts.find({}, function(err, crafts) {
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(crafts);
  });
};

exports.findOneCraft = function(req, res) {
  var craft_id = req.params.id;
  Crafts.find({
    _id: craft_id
  }, function(err, craft) {
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(craft);
  });
};

exports.editCraft = function(req, res) {
  var craft_id = req.params.id;
  Crafts.update({
    _id: craft_id
  }, 
  req.body, 
  function(err, craft) {
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(craft);
  });
};
