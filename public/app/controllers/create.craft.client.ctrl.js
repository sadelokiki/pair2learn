"use strict";

angular.module('pairToLearnApp')
  .controller('CreateCraftCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {

    $scope.createCraft = function(craft) {
      if (!craft) {
        return;
      }
      var user = $rootScope.decodedToken.user.firstname + " " + $rootScope.decodedToken.user.lastname;
      craft.createdBy = user;
      craft.userId = $rootScope.decodedToken.user._id;
      $rootScope.showProg = true;
      CraftService.createCraft(craft.picture, craft).then(function(data) {
        console.log(data);
        console.log($scope.craft);
        $rootScope.craft = data;
        Materialize.toast('Craft created successfully!', 4000);
        $rootScope.showProg = false;
        $location.url("/admin/" + "crafts");
      }, function(err) {
        $rootScope.showProg = false;
        return err;
      });
    };

    // $scope.getPostedCraft = function() {

    // }
    if ($routeParams.hasOwnProperty("id")) {
      $scope.craft_id = $routeParams.id
      CraftService.getOneCraft($scope.craft_id).then(function(data) {
        $scope.craft = data;
      }, function(err) {
        $rootScope.showProg = false;
        return err;
      })
    }


    $scope.updateCraft = function() {
      CraftService.updateCraft($scope.craft._id, $scope.craft).then(function(data) {
        Materialize.toast('Craft updated successfully!', 4000);
      });
    };
  }]);
