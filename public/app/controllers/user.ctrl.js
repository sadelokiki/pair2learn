'use strict';

angular.module('pairToLearnApp')
  .controller('UserCtrl', ['UserService', '$scope', '$location', function(UserService, $scope, $location) {
   
    $scope.signUp = function(user) {
      UserService.signUp(user).then(function(data){
        console.log(data)
      });
    };
    $scope.signIn = function() {
      UserService.signIn(user).then(function(data) {
        console.log(data)
      });
    };
    (function($){
      $(function(){
        $('.parallax').parallax();
      });
    })(jQuery);
  }]);
