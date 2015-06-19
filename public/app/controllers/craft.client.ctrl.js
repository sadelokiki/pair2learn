"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', '$scope', '$location', '$timeout', function(CraftService, $scope, $location, $timeout) {
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

    $scope.viewCrafts = function() {
      CraftService.getAll().then(function(res) {
        console.log(res);
        $scope.allCrafts = res.data;
        console.log($scope.allCrafts);
        return $scope.allCrafts;
      });
    };

    

  }])
