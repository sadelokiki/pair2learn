'use strict';

angular.module('pairToLearnApp')
  .controller('UserCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
   
    (function($){
      $(function(){
        $('.parallax').parallax();
      });
    })(jQuery);
    
    $rootScope.hideFeatures = true;
    $rootScope.isLoggedIn = true;

  }]);