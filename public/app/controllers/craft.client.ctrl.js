"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', 'UserService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, UserService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {
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

    UserService.getOneUser($routeParams.id).then(function(data) {
      console.log(data);
      $rootScope.currentUser = data;
    })

    $scope.startLearning = function(userId, craftId) {
      console.log("start learning");
      $window.sessionStorage.user = $rootScope.decodedToken.user._id;
      var userId = $window.sessionStorage.user;
      $window.sessionStorage.craft = craftId;
      $location.url('/user/' + userId + '/craft/' + craftId);
    };



    // //$timeout(function() {
    //   //CraftService.getExpertCrafts($rootScope.decodedToken.user._id).then(function(data) {
    //     //$scope.expertCrafts = data;
    //   });
    // }, 1000);
  }]);
