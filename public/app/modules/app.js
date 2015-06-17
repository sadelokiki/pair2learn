'use strict';

var app = angular.module('pairToLearnApp',['ngRoute','ngMessages']);
  app.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider,  $httpProvider, $locationProvider){

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
        controller: 'UserCtrl',
        data: {
          requiresLogin: true
        }
      }) 
      .when('/php/experts', {
        templateUrl: 'app/views/Expertpage.view.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'app/views/login.view.html',
        controller: 'SignCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/views/signup.view.html',
        controller: 'SignCtrl'
      })
      .when('/logout', {
        templateUrl:'app/views/home.view.html',
        controller: 'UserCtrl'
      })
      .when('/editprofile', {
        templateUrl:'app/views/Editprofile.view.html',
        controller: 'NavCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });

    // $locationProvider.html5Mode(true);// Clean Url

    $httpProvider.interceptors.push(['$q', '$location', '$window', '$rootScope',
        function($q, $location, $window, $rootScope) {
          return {
            'request': function (config) {
                var querytoken = $location.search().token;
                $location.search('token', null);
                if(!$window.sessionStorage.token && querytoken){
                  Materialize.toast('You are sigined in!', 4000);
                  $window.sessionStorage.token = querytoken;
                }
                if ($window.sessionStorage.token || querytoken) {
                  config.headers.Authorization = $window.sessionStorage.token || querytoken;
                }
                  return config;
              },

            'responseError': function(rejection) {
                console.log('response error', rejection);
               if(rejection.status === 401 || rejection.status === 403) {
                  $location.url('/login');
                }
                return $q.reject(rejection);
            }
          };
      }]);
  }])
  
  .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {

    $rootScope.$on("$routeChangeStart", function(event, to) {
      if(to.data && to.data.requiresLogin) {
        if(!($window.sessionStorage.token || $location.search().token)) {
          event.preventDefault();
          $location.url('/login');
        }
      }
    }); 
  }]);


