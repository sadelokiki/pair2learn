'use strict';

angular.module('pairToLearnApp')
  .controller('UserCtrl', ['$rootScope', '$scope', '$location', function($rootScope, UserService, $scope, $location) {
   
    (function($){
      $(function(){
        $('.parallax').parallax();
        $('.collapsible').collapsible({
		      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		    });
      });
    })(jQuery);

    $scope.editProfile = function() {
      UserService.update($scope.decodedToken.user._id, $scope.decodedToken.user).then(function(res) {
        console.log("profile updated");
        Materialize.toast('Profile updated successfully!', 4000);
        $location.url("/home");
        console.log(res);
      });
    };
  }]);