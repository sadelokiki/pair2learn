'use strict';

angular.module('pairToLearnApp')
  .controller('WalletCtrl', ['$rootScope', '$scope', '$window', '$location', 'UserService', '$timeout', function($rootScope, $scope, $window, $location, UserService, $timeout) {
    $timeout(function() {
      UserService.getOneUser($rootScope.decodedToken.user._id).then(function(data) {
        $scope.hours = data.hours;
      });
    }, 1000);

    $scope.craftId = $window.sessionStorage.craft;
    $scope.expertId = $window.sessionStorage.expert;
  }]);
