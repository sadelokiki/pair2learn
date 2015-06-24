"use strict";

angular.module('pairToLearnApp')
  .controller('ExpertCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    //expert page
    CraftService.getOneCraft($routeParams.id).then(function(data) {
      $rootScope.oneCraft = data;
    });

    $scope.saveCraftExpert = function(craftId, expertId) {
      $window.sessionStorage.craft = craftId;
      $window.sessionStorage.expert = expertId;
      $window.sessionStorage.user = $rootScope.decodedToken.user.firstname;
    };
  }]);
