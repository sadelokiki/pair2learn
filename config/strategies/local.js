"use strict";


require("../../app/models/users.model");
var mongoose = require("mongoose"),
    LocalStrategy = require("passport-local").Strategy,
    Users = mongoose.model('Users');

module.exports = function(passport) {
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, 
  function(req, email, password, done) {
    process.nextTick(function() {
      Users.findOne({'email': email}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          console.log('existing', user)
          return done(null, false);
        }
        else {
          var newUser = new Users();
          newUser.firstname = req.body.firstname;
          newUser.lastname =  req.body.lastname;
          newUser.phonenumber =  req.body.phonenumber;
          newUser.picture =  req.body.picture;
          newUser.email = email;
          newUser.hashPassword(password);
          newUser.save(function(err) {
            if(err) {
              throw err;
            }
            console.log(newUser)
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use("local-login", new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
  }, 
  function(email, password, done) {
    process.nextTick(function() {
      Users.findOne({'email': email}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          // user.comparePassword(password, function(err, sss) {
          //     console.log(err, sss)
          // })
          if(user.comparePassword(password)){
            return done(null, user);
          }
          else {
            return done(null, false);
          }
        }
        else {
          return done(null, false);
        }
      });
    });
  }));
}