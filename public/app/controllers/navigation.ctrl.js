'use strict';

angular.module('pairToLearnApp')
  .controller('NavCtrl', ['UserService','$rootScope', '$scope', '$location', '$window', '$timeout',  
    function(UserService,$rootScope, $scope, $location,  $window, $timeout) {
    (function($){
      $(function(){
         $('.dropdown-button')
          .dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true // Displays dropdown below the button
          }
        ); 
      });
      $('.button-collapse')
        .sideNav({
          menuWidth: 180, // Default is 240
          edge: 'right', // Choose the horizontal origin
          closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
      );
    })(jQuery);

    $rootScope.logout = function() {
      $rootScope.hideOutProg = false;
      $window.sessionStorage.clear();
      $timeout(function(){
        $rootScope.hideOutProg = true;
        $location.url("/home");
      }, 1500);
    };
    
    $rootScope.$on("$routeChangeSuccess", function(event) {
      if ($window.sessionStorage.token) {
         var parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
          };
        var decodedToken = parseJwt($window.sessionStorage.token);
        $rootScope.decodedToken = decodedToken;
      }
    }); 

    $scope.editProfile = function() {
      UserService.update($scope.decodedToken.user._id, $scope.decodedToken.user).then(function(res) {
        console.log("profile updated");
        $location.url("/home");
        console.log(res);
      });
    };
    
  }]);
