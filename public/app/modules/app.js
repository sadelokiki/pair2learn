'use strict';

var app = angular.module('pairToLearnApp', ['ngRoute', 'ngMessages', 'ngFileUpload', 'angular-loading-bar','timer']);
app.config(['$routeProvider', '$httpProvider', '$locationProvider', 'cfpLoadingBarProvider', function($routeProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: 'app/views/home.view.html',
      controller: 'HomeCtrl'
    })
    .when('/wallet/success', {
      templateUrl: 'app/views/success.view.html',
      controller: 'HomeCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/wallet/fail', {
      templateUrl: 'app/views/fail.view.html',
      controller: 'HomeCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/user/:id', {
      templateUrl: 'app/views/Userpage.view.html',
      controller: 'CraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/crafts', {
      templateUrl: 'app/views/crafts.view.html',
      controller: 'CraftCtrl'
    })
    .when('/user/:id/dashboard', {
      templateUrl: 'app/views/profile.view.html',
      controller: 'CraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/wallet/user/:userId', {
      templateUrl: 'app/views/wallet.view.html',
      controller: 'WalletCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/:craft/:id/experts', {
      templateUrl: 'app/views/Expertpage.view.html',
      controller: 'ExpertCtrl',
      data: {
        requiresLogin: true
      },
      resolve: {
        expertPromise: ['$routeParams', 'CraftService', function($routeParams, CraftService) {
          return CraftService.getOneCraft($routeParams.id);
        }]
      }
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
      templateUrl: 'app/views/Editprofile.view.html',
      controller: 'NavCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/user/:id/apply/expert', {
      templateUrl: 'app/views/apply.expert.view.html',
      controller: 'CraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/post-craft', {
      templateUrl: 'app/views/admin.view.html',
      controller: 'CreateCraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/admin/crafts', {
      templateUrl: 'app/views/admincraft.view.html',
      controller: 'CraftCtrl'
    })
    .when('/edit/craft/:id', {
      templateUrl: 'app/views/EditCraft.view.html',
      controller: 'CreateCraftCtrl'
    })
    .when('/user/pair/expert/:expertId/:craft', {
      templateUrl: 'app/views/pair.view.html',
      controller: 'PairCtrl',
      data: {
        requiresLogin: true
      }
    })
    .otherwise({
      redirectTo: '/home'
    });

  // $locationProvider.html5Mode(true);// Clean Url
  //circle loading false
  cfpLoadingBarProvider.includeSpinner = false;

  $httpProvider.interceptors.push(['$q', '$location', '$window', '$rootScope',
    function($q, $location, $window, $rootScope) {
      return {
        'request': function(config) {
          var querytoken = $location.search().token;
          $location.search('token', null);
          if (!$window.sessionStorage.token && querytoken) {
            Materialize.toast('You are signed in!', 4000);
            $window.sessionStorage.token = querytoken;
          }
          if ($window.sessionStorage.token || querytoken) {
            config.headers.Authorization = $window.sessionStorage.token || querytoken;
          }
          return config;
        },
        // optional method
        'response': function(response) {
          return response;
        },

        'responseError': function(rejection) {
          console.log('response error', rejection);
          if (rejection.status === 401 || rejection.status === 403) {
            $location.url('/login');
          }
          return $q.reject(rejection);
        }
      };
    }
  ]);
}])

.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {

  $rootScope.$on("$routeChangeStart", function(event, to) {
    if (to.data && to.data.requiresLogin) {
      if (!($window.sessionStorage.token || $location.search().token)) {
        event.preventDefault();
        $location.url('/login'); //redirect to login if user is not authenitcated
      }
    }
  });
}]);
