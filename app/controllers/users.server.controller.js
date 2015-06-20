"use strict";

require('../models/users.server.model.js');
var passport = require("passport"),
  formidable = require("formidable"),
  cloudinary = require("cloudinary"),
  jwt = require('jsonwebtoken'),
  mongoose = require("mongoose"),
  Users = mongoose.model('Users'),
  config = require('../../config/config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});


var generateJWT = function(user) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var token = jwt.sign({
      user: user,
      exp: parseInt(exp.getTime() / 1000),
    },
    config.jwtSecret
  );
  return token;
};


exports.getImage = function(req, res, next) {
  var forms = new formidable.IncomingForm();
  forms.parse(req, function(err, fields, files) {
    req.body = fields;
    cloudinary.uploader.upload(files.file.path, function(result) {
      req.body.picture = result.url;
      next();
    },
    {
      width: 300,
      height: 300
    });
  });
};

exports.authCallBack = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect('/#/login');
      } else {
        var token = generateJWT(user);
        res.redirect('/#/user/' + user._id + '?token=' + token);
      }
    })(req, res, next);
  };
};

exports.findOne = function(req, res) {
  var user_id = req.params.id;
  Users.findOne(req, res)({
    _id: user_id
  }, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.send(user);
  });
};

exports.findAll = function(req, res) {
  Users.find({}, function(err, users) {
    if (err) {
      return res.status(400).json(err);
    }
    res.send(users);
  });
};
// End of custom find methods

exports.editImage = function(req, res) {
  var user_id = req.body._id;
  var new_user = req.body;
  Users.update({
    _id: user_id
  }, 
  {
    picture: req.body.picture
  }, 
  function(err, user) {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json({
      token: generateJWT(new_user),
      user: new_user
    });
  });
};

exports.editProfile = function(req, res) {
  var user_id = req.params.id;
  Users.update({
    _id: user_id
  }, req.body, function(err, data) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      token: generateJWT(req.body),
      user: req.body
    });
  });
};
