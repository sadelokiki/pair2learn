'use strict';

angular.module('pairToLearnApp')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
    (function($){
      $(function(){
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    $rootScope.hideFeatures = false;
    $rootScope.isLoggedIn = false;
  }]);
