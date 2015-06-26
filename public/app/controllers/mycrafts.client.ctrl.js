"use strict";

angular.module('pairToLearnApp')
  .controller('myCraftsCtrl', ['CraftService', 'UserService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, UserService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    UserService.getOneUser($window.sessionStorage.user).then(function(data) {
      console.log(data);
      $scope.sessions = data.crafts;
    });
  }]);
