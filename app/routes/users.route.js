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
  router.route('/logout')
    .post(function(req, res, next) {
      req.logOut();
      res.redirect('/#/home')
      res.send(200);
    });
  router.route('/logout')
    .delete(function(req, res) {
      if (req.session.authenticated) {
        req.session.destroy(function() {
        });
      } 
      else {
        res.send('cant remove public session', 500); // public sessions don't containt sensible information so we leave them
    }
  });
  router.route('/editprofile')
    .post(ctrl.authCallBack('local-update'));


  
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
};
