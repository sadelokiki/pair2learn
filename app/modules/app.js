'use strict';

angular.module('pairToLearnApp', ['ngRoute']);

angular.module('pairToLearnApp').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl:'app/views/home.view.html',
      controller:'HomeCtrl'
    })
    .when('/success',{
      templateUrl:'app/views/success.view.html',
      controller:'HomeCtrl'
    })
    .when('/confirm',{
      templateUrl:'app/views/confirm.view.html',
      controller:'HomeCtrl'
    })
    .when('/user',{
      templateUrl:'app/views/Userpage.view.html',
      controller:'HomeCtrl'
    })

    .otherwise({
      redirectTo: '/home'
    });
  }]);



