"use strict";

var passport = require("passport"),
    jwt = require('jsonwebtoken'),
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
