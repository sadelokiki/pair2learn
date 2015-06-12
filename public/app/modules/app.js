'use strict';

var app = angular.module('pairToLearnApp',['ngRoute','ngMessages']);
  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/home', {
        templateUrl: 'app/views/home.view.html',
        controller: 'HomeCtrl'
      })
      .when('/success', {
        templateUrl: 'app/views/success.view.html',
        controller: 'HomeCtrl'
      })
      .when('/confirm', {
        templateUrl: 'app/views/confirm.view.html',
        controller: 'HomeCtrl'
      })
      .when('/user/:id', {
        templateUrl: 'app/views/Userpage.view.html',
        controller: 'HomeCtrl'
      }) 
      .when('/php/experts', {
        templateUrl: 'app/views/Expertpage.view.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'app/views/login.view.html',
        controller: 'UserCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/views/signup.view.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
    }])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.location = $location.path();
    $rootScope.showWelcome = true;
  }]);


