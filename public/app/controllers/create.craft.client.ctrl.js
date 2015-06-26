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

    if ($routeParams.hasOwnProperty("id")) {
      $scope.craft_id = $routeParams.id;
      CraftService.getOneCraft($scope.craft_id).then(function(data) {
        $scope.craft = data;
      }, function(err) {
        return err;
      });
    }


    $scope.addCraftpic = function(profpic) {
      console.log(profpic);
      if (!profpic) {
        return;
      }
      $rootScope.showProg = true;
      CraftService.uploadPic(profpic, $scope.craft).then(function(data) {
        if (data) {
          Materialize.toast('Picture updated successfully!', 4000);
          console.log(data);
          $rootScope.showProg = false;
        }
      }, function(err) {
        Materialize.toast('Picture upload failed');
        $rootScope.showProg = false;
      });
    };

    $scope.updateCraft = function() {
      console.log($scope.craft);
      $rootScope.showProg = true;
      CraftService.updateCraft($scope.craft._id, $scope.craft).then(function(data) {
        console.log(data);
        // console.log($scope.craft);
        $rootScope.craft = data;
        console.log($rootScope.craft);
        Materialize.toast('Craft created successfully!', 4000);
        $rootScope.showProg = false;
        $location.url("/admin/" + "crafts");
      }, function(err) {
        $rootScope.showProg = false;
        return err;
      });
    };

    $scope.deleteCraft = function(craftId) {
      // console.log("time to go yo!")
      $window.sessionStorage.craft = $scope.craft._id;
      CraftService.deleteCraft($scope.craft._id).then(function(data) {
        // console.log("bye craft", data);
        Materialize.toast('Craft deleted!', 4000);
        $location.url("/admin/" + "crafts");
      })
    };

  }]);
