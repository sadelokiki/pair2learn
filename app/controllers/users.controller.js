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



// {
//       successRedirect: '/#/user/',
//       failureRedirect: '/#/login' 
//     }