"use strict";

angular.module('pairToLearnApp')
  .controller('ExpertCtrl', ['CraftService', 'expertPromise', '$scope', '$location', '$timeout', '$rootScope', '$window', function(CraftService, expertPromise, $scope, $location, $timeout, $rootScope, $window) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    //expert page
    console.log(expertPromise);
    $rootScope.oneCraft = expertPromise;

    $scope.saveCraftExpert = function(craftId, expertId) {
      $window.sessionStorage.craft = craftId;
      $window.sessionStorage.expert = expertId;
    };
  }]);
