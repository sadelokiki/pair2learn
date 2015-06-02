'use strict'

var app = angular.module('pairToLearnApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl:'app/views/home.view.html',
      controller:'HomeCtrl'
    })

    // .when('/signin',{
    //   templateUrl:'views/signin.view.html',
    //   controller:'UserCtrl'
    // })
    .when('/signup',{
      templateUrl:'app/views/signup.view.html',
      controller:'UserCtrl'
    })
/*


    .when('/submit',{
      templateUrl:'views/submit.view.html',
      controller:'HomeCtrl',
      resolve : {
        'allowAccess': ['UserService','$location', function(UserService, $location){
        if(Object.keys(UserService.currentUser).length === 0){
          $location.path('/signin');
        }
          else{
            $location.path('/submit');
          }
        }]
      }

    /*.when('/editprofile',{
      templateUrl:'views/editprofile.view.html',
      controller: 'UserCtrl',
      resolve : {
        'allowAccess': ['UserService','$location', function(UserService, $location){
        if(Object.keys(UserService.currentUser).length === 0){
          $location.path('/signin');
        }
          else{
            $location.path('/editprofile');
          }
        }]
      }
    })
*/

  }]);



