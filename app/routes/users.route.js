"use strict";

var express = require("express"),
    passport = require("passport"),
    ctrl = require("../controllers/users.controller"),
    router = express.Router();

module.exports = function(app, passport) {
  //local
  router.route('/signup')
    .post(ctrl.authCallBack('local-signup'));
  router.route('/login')
    .post(ctrl.authCallBack('local'));

  //google
  router.route('/auth/google')
    .get(passport.authenticate('google', {
      scope : [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));
  router.route('/auth/google/callback')
    .get(ctrl.authCallBack('google'));

  //facebook
  router.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
  router.route('/auth/facebook/callback')
    .get(ctrl.authCallBack('facebook'));


  
  //Route to get all users in the db.
  router.route('/users')
    .get(function(req, res) {
      ctrl.findAll(req, res);
    })

  router.route('/users/:id')
    .get(function(req, res) {
      ctrl.findOne(req, res);
    })
    .put(ctrl.editProfile)
  // End of custom route

  app.use('/', router);



  return router;
};
