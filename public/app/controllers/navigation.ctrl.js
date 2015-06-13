'use strict';

angular.module('pairToLearnApp')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
    
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
    
  }]);
