"use strict";

require("../models/users.model");
var mongoose = require("mongoose"),
    passport = require("passport"),
    Users = mongoose.model('Users');

exports.signup = function(req, res, next) {
  if(!req.body) {
    return res.status(400).json("Please, fill in all fields");
  }
  else {
    Users.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        return next(err);
      }
      if(user) {
        return res.status(400).json("User already registered, please sign in");
      }
      else {
        var user = new Users();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.hashPassword(req.body.password);
        user.save(function(err, user) {
          if(err) {
            return next(err)
          }
          else {
            req.login(user, function(err) {
              if(err) {
                return res.status(400).json(err);
              }
              else {
                return res.status(200).json(user);
              }
            });
          }
        });
      }
    });
  }
}



