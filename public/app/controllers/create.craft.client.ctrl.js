"use strict";

angular.module('pairToLearnApp')
  .controller('CreateCraftCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', '$window', function(CraftService, $scope, $location, $timeout, $rootScope, $window) {

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
  }]);
