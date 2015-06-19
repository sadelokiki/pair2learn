"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', '$scope', '$location' ,function(CraftService, $scope,$location) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    $scope.createCraft = function() {
      CraftService.post($scope.craft).then(function(res) {
        Materialize.toast('Craft successfully added!', 2000);
        $location.url("/home");
      });
    };

    $scope.allCrafts = []
    CraftService.get(function(success) {
      console.log(success);
      $timeout(function() {
        $scope.allCrafts = success;
        console.log($scope.allCrafts);
        return $scope.allCrafts;
      }, 500);
    }, function(err) {
      return err;
    });
    
  }])
