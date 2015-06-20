"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', 'Upload', '$window', function(CraftService, $scope, $location, $timeout, $rootScope, Upload, $window) {    
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    $scope.createCraft = function(craft) {
      if(!craft) {
        return;
      }
      if(!$scope.craft.picture){
        return;
      }
      var user = $rootScope.decodedToken.user.firstname + " " + $rootScope.decodedToken.user.lastname;
      craft.createdBy = user;
      $rootScope.showProg = true;
      CraftService.createCraft(craft.picture, craft).then(function(data) {
        Materialize.toast('Craft created successfully!', 4000);
        console.log(data);
        $rootScope.showProg = false;
        $location.url("/user/" + data._id);
      }, function(err){
        $rootScope.showProg = false;
      });
    };

    CraftService.getAll().then(function(data) {
      $scope.allCrafts = data;
    });
  }]);
