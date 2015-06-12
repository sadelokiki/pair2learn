"use strict";

var passport = require("passport");

exports.authCallBack = function(strategy) {
  return function(req, res, next){
    passport.authenticate(strategy, function(err, user) {
      if(err){
        return next(err);
      }
      if(!user) {
        res.redirect('/#/login')
      }
      else {
        console.log('thhe', user)
        res.redirect('/#/user/' + user._id);
      }
    })(req, res, next);
  };
};

exports.postlogin = function(strategy) {
  return function(req, res, next){
    passport.authenticate(strategy, function(err, user) {

      if(err){
        return next(err);
      }
      if(!user) {
        console.log("wrong login details")
          res.redirect('/#/login');
      }
      else {
        var valid = user.comparePassword(req.body.password);
        if(!valid){
          console.log('wrong password');
        res.redirect('/#/login/');
          
        }
        else {
        console.log('thhe')
        res.redirect('/#/user/' + user._id);
          
        }
      }
    })(req, res, next);
  };
};
