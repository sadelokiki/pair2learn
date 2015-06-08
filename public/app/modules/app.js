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
    .when('/user/susan',{
      templateUrl:'app/views/Userpage.view.html',
      controller:'HomeCtrl'
    }) 
    .when('/php/experts',{
      templateUrl:'app/views/Expertpage.view.html',
      controller:'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
  }]);



