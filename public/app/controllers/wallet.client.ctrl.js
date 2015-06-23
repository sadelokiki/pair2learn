'use strict';

angular.module('pairToLearnApp')
  .controller('WalletCtrl', ['$rootScope', '$scope', '$window', '$location', 'UserService', '$timeout', function($rootScope, $scope, $window, $location, UserService, $timeout) {
    $timeout(function() {
      console.log($rootScope);
      UserService.getOneUser($rootScope.decodedToken.user._id).then(function(data) {
        $scope.hours = data.hours;
        // $rootScope.hours = data.hours;
      });
    }, 1000);

    $scope.craftId = $window.sessionStorage.craft;
    $scope.expertId = $window.sessionStorage.expert;
  }]);
