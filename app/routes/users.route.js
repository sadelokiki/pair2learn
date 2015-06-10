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
    .post(ctrl.authCallBack('local-login'));
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


  app.use('/', router);

  return router;
}
