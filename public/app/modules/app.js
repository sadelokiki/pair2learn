'use strict';

var app = angular.module('pairToLearnApp',['ngRoute','ngMessages', 'ngFileUpload']);
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
        controller: 'CraftCtrl',
        data: {
          requiresLogin: true
        }
      }) 
      .when('/user/:id/profile', {
        templateUrl: 'app/views/profile.view.html',
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
      .when('/edit/user/:id', {
        templateUrl:'app/views/Editprofile.view.html',
        controller: 'NavCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/user/:id/apply/expert', {
        templateUrl:'app/views/apply.expert.view.html',
        controller: 'CraftCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/admin', {
        templateUrl:'app/views/admin.view.html',
        controller: 'CraftCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/:userId/pair/:craft', {
        templateUrl:'app/views/pair.view.html',
        controller: 'PairCtrl',
        data: {
          requiresLogin: true
        }
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
                  Materialize.toast('You are signed in!', 4000);
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
          $location.url('/login');//redirect to login if user is not authenitcated
        }
      }
    }); 
  }]);


