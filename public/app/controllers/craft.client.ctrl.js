"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', '$window', function(CraftService, $scope, $location, $timeout, $rootScope, $window) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);


    $scope.applyAsExpert = function(craftId) {
      var data = {
        userId: $rootScope.decodedToken.user._id,
        craftId: craftId
      };
      CraftService.applyAsExpert(data).then(function(userId) {
        Materialize.toast('You are now an Expert', 4000);
        $location.url("/user/" + userId + '/dashboard');
      }, function(err) {
        console.log(err);
      });
    };

    CraftService.getAll().then(function(data) {
      $scope.allCrafts = data;
    });

    $timeout(function() {
      CraftService.getExpertCrafts($rootScope.decodedToken.user._id).then(function(data) {
        $scope.expertCrafts = data;
      });
    }, 1000);
  }]);
