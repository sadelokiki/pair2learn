'use strict';

angular.module('pairToLearnApp')
  .controller('WalletCtrl', ['$rootScope', '$scope', '$window', '$location', 'UserService', '$timeout', function($rootScope, $scope, $window, $location, UserService, $timeout) {
    $timeout(function() {
      console.log($rootScope);
      UserService.getOneUser($rootScope.decodedToken.user._id).then(function(data) {
        $scope.minutes = data.minutes;
        // $rootScope.hours = data.hours;
      });
    }, 1000);
    //UserService.getOneUser($rootScope.decodedToken.user._id).then(function(data) {
      $scope.counter = $scope.minutes * 60;
   // });

    var mytimeout = null;
    $scope.onTimeout = function() {
      if ($scope.counter === 0) {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        return;
      }
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
    }
    $scope.startTimer = function() {
      console.log("time starts now");
      mytimeout = $timeout($scope.onTimeout, 1000);
    }
    
    $scope.craftId = $window.sessionStorage.craft;
    $scope.expertId = $window.sessionStorage.expert;
  }]);
