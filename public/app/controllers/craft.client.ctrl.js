"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', '$window', function(CraftService, $scope, $location, $timeout, $rootScope, $window) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    $scope.createCraft = function(craft) {
      if (!craft) {
        return;
      }
      if (!$scope.craft.picture) {
        return;
      }
      var user = $rootScope.decodedToken.user.firstname + " " + $rootScope.decodedToken.user.lastname;
      craft.createdBy = user;
      $rootScope.showProg = true;
      CraftService.createCraft(craft.picture, craft).then(function(data) {
        Materialize.toast('Craft created successfully!', 4000);
        $rootScope.showProg = false;
        $location.url("/user/" + data._id);
      }, function(err) {
        $rootScope.showProg = false;
      });
    };

    $scope.applyAsExpert = function(craftId) {
      var data = {
        userId: $rootScope.decodedToken.user._id,
        craftId: craftId
      };
      CraftService.applyAsExpert(data).then(function(userId) {
        Materialize.toast('You are now an Expert', 4000);
        $location.url("/user/" + userId + '/profile');
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
