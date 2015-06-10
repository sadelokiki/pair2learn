'use strict';

angular.module('pairToLearnApp')
  .controller('UserCtrl', ['UserService', '$scope', '$location', function(UserService, $scope, $location) {
   
    $scope.signUp = function(user) {
      console.log(user)
      UserService.signUp(user).then(function(data){
        console.log(data)
      })
    };

    (function($){
      $(function(){
        $('.parallax').parallax();
      });
    })(jQuery);
  }]);
