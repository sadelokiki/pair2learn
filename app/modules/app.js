'use strict';

angular.module('pairToLearnApp', ['ngRoute']);

angular.module('pairToLearnApp').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl:'app/views/home.view.html',
      controller:'HomeCtrl'
    })
    .when('/signup',{
      templateUrl:'app/views/signup.view.html',
      controller:'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
  }]);



