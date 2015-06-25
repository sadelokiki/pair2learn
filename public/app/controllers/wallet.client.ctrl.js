'use strict';

angular.module('pairToLearnApp')
  .controller('WalletCtrl', ['$rootScope', '$scope', '$window', '$location', 'UserService', '$timeout', 'SessionService', function($rootScope, $scope, $window, $location, UserService, $timeout, SessionService) {

    $timeout(function() {
      UserService.getOneUser($rootScope.decodedToken.user._id).then(function(data) {
        console.log(data)
        $scope.minutes = data.minutes;
      });
    }, 1000);
    $scope.counter = $scope.minutes * 60;

    var mytimeout = null;
    $scope.onTimeout = function() {
      if ($scope.counter === 0) {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        return;
      }
      $scope.counter--;
     mytimeout = $timeout($scope.onTimeout, 1000);
    };

    $scope.bookMentorSession = function(userId, craftId) {
      var expertId = $scope.expertId;
      SessionService.sendMail(userId, craftId, expertId).then(function(data) {
        console.log(data);
      });
    };

    $scope.userId = $window.sessionStorage.user;
    $scope.craftId = $window.sessionStorage.craft;
    $scope.expertId = $window.sessionStorage.expert;
  }]);
