'use strict';

angular.module('pairToLearnApp')
  .controller('PairCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.collapsible').collapsible({
          accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
    })(jQuery);

    var firepadRef = new Firebase('https://pairtolearn.firebaseio.com/');

    var codeMirror = CodeMirror(document.getElementById('firepad'), {
      lineWrapping: false
    });

    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      userId: 'fdhhfd',
      defaultText: 'Type Live text here'
    });
    firepad.on('ready', function() {
      // Firepad is ready.

    });

  }]);
