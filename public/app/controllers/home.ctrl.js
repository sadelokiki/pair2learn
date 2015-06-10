'use strict';

angular.module('pairToLearnApp')
  .controller('HomeCtrl', [function($rootScope, $scope, $location) {
    (function($){
      $(function(){
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
        $('.modal-trigger').leanModal();
        $('ul.tabs').tabs();
      });
    })(jQuery);
  }]);
