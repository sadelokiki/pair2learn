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
          return done(null, false, {message: "email already taken"});
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
            // console.log(newUser)
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local', new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
  }, 
  function(email, password, done) {
    process.nextTick(function() {
      Users.findOne({'email': email}, function(err, user) {
        console.log(user);
        if(err) {
          return done(err);
        }
        if(!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }));

passport.use('local-update', new LocalStrategy({
    usernameField : 'email',
    passwordField: "password",
    passReqToCallback : true
},
function(req, email, done) {
  console.log(req)
   process.nextTick(function() {
    Users.findOne({ 'email' :  email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
          return done(null, false, {message: "email already taken"});
      } 
      else {
        var updateUser = new Users();
          updateUser.email    =  email;
          updateUser.hashPassword(password);
          updateUser.save(function(err) {
            if (err) {
              return next(err)
            }
            console.log("Before relogin: "+req.session.passport.user.changedField)

            req.login(user, function(err) {
                if (err) return next(err)

                console.log("After relogin: "+req.session.passport.user.changedField)
                res.send(200)
            });
        });
      }

  });    

});

}));

}








