"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', 'Upload','$window', function(CraftService, $scope, $location, $timeout, $rootScope, Upload, $window) {    
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    $scope.createCraft = function(craft) {
      var user_id = $rootScope.decodedToken.user._id
      craft.createdBy = user_id;
      var localhost = "http://localhost:3000/crafts";
      var upload = Upload.upload({
          url: localhost,
          method: "POST",
          file: craft.picture,
          fields: craft
        })
        .success(function(data) {
          console.log(data);
          $location.url("/user/" + data._id);
        });
      }

    CraftService.getAll().then(function(data) {
      console.log(data);
      $scope.allCrafts = data;
      console.log($scope.allCrafts);
      return $scope.allCrafts;
    });

}])
