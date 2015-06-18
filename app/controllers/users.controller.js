"use strict";

require('../models/users.model.js');
var passport = require("passport"),
  formidable = require("formidable"),
  cloudinary = require("cloudinary"),
  jwt = require('jsonwebtoken'),
  mongoose = require("mongoose"),
  Users = mongoose.model('Users'),
  secret = require('../../config/config');

cloudinary.config({
  cloud_name: 'dtpf1mle2',
  api_key: '548953239178178',
  api_secret: 'JLqmFBkh_rDjvSNJs8rBDm4MSbI'
});


var generateJWT = function(user) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var token = jwt.sign({
      user: user,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret.jwtSecret
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
    })
  })
}

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

exports.findUser = function(req, res) {
  Users.find({
    firstname: req.params.firstname
  }, function(err, user) {
    if (err) {
      return res.json(err);
    }
    return res.json(user);
  });
};

/**
 * @desc new methods for '/users' route
 * findOne { function }
 * findAll { function }
 */

exports.findOne = function(req, res) {
  var user_id = req.params.id;
  Users.find({
    _id: user_id
  }, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.send(user);
  })
};

exports.findAll = function(req, res) {
  Users.find({}, function(err, users) {
    if (err) {
      res.send({
        error: {
          code: 9000,
          message: 'An error occured, sowie',
          error: err
        }
      });
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
  }, {
    picture: req.body.picture
  }, function(err, user) {
    if (err) {
      console.log(1, err);
      return res.status(400).json(err);
    }
    console.log(2, user);
    res.status(200).json({
      token: generateJWT(user),
      user: new_user
    });
  });
};

exports.editProfile = function(req, res) {
  var user_id = req.params.id;
  Users.findById({
    _id: user_id
  }, function(err, user) {
    if (err) {
      res.send({
        error: {
          code: 9000,
          message: 'user not found',
          error: err
        }
      });
    }
    var newuser = new Users();
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.email = req.body.email;
    newuser.phonenumber = req.body.phonenumber;
    newuser.password = req.body.password;
    newuser.save(function(err, user) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({

        token: generateJWT(user),
        user: user
      }); 
    });
  });
};
