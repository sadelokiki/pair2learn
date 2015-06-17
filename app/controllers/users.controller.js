"use strict";

require('../models/users.model.js');
var passport = require("passport"),
    jwt = require('jsonwebtoken'),
    mongoose = require("mongoose"),
    Users = mongoose.model('Users'),
    secret = require('../../config/config');
    

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

exports.authCallBack = function(strategy) {
  return function(req, res, next){
    passport.authenticate(strategy, function(err, user) {
      if(err){
        return next(err);
      }
      if(!user) {
        res.redirect('/#/login');
      }
      else {
        var token = generateJWT(user);
        res.redirect('/#/user/' + user._id + '?token=' + token);
      }
    })(req, res, next);
  };
};

exports.findUser = function(req, res){
  Users.find({firstname:req.params.firstname}, function(err, user){
    if(err){
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

exports.findOne = function (req, res) {
  var user_id = req.params.id;
  Users.find({_id: user_id}, function(err, user) {
    if(err){
      res.send(err);
    }
    res.send(user);
  })
};

exports.findAll = function(req, res) {
  Users.find({}, function (err, users){
    if(err){
      res.send({ error: { code: 9000, message: 'An error occured, sowie', error: err } });
    }
    res.send(users);
  });
};

// End of custom find methods


exports.editProfile = function(req, res){
  var user_id = req.params.id;
  Users.findById({_id: user_id}, function(err, user) {
    if(err) {
      res.send({ error: { code: 9000, message: 'user not found', error: err } });
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.phonenumber = req.body.phonenumber;
    user.password = req.body.password;

    user.save(function (err, user){
      if(err){
        return res.status(400).json(err);
      }
      return res.status(200).json(user);
    });
  });
};



