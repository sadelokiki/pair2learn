"use strict";

require("../../app/models/users.model");
var mongoose = require("mongoose"),
    FacebookStrategy = require('passport-facebook').Strategy,
    Users = mongoose.model('Users'),
    config = require('../config');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID:  config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: "/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log(profile._json.email);
      Users.findOne({'email': profile._json.email}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, user);
        }
        else {
          var newUser = new Users();
          newUser.firstname = profile._json.first_name;
          newUser.lastname =  profile._json.last_name;
          //newUser.picture =  profile._json.image.url;
          newUser.email = profile._json.email;
          newUser.hashPassword('temp-facebook-password-dfjkdfgjkudgjkf37//57jfj');
          newUser.save(function(err) {
            if(err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
}