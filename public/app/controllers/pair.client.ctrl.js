'use strict';

angular.module('pairToLearnApp')
  .controller('PairCtrl', ['$rootScope', '$scope', '$location', '$window', function($rootScope, $scope, $location, $window) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.collapsible').collapsible({
          accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
    })(jQuery);

    var firepadRef = new Firebase('https://pairtolearn.firebaseio.com/');

    var userId = $window.sessionStorage.user;
    var expert = $window.sessionStorage.expert;
    console.log(userId);
    //// Create FirepadUserList (with our desired userId).
    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
      document.getElementById('userlist'), userId, expert);

    //// Create CodeMirror (with line numbers and the JavaScript mode).
    function javaScript() {
      var codeMirror2 = CodeMirror(document.getElementById('firepad'), {
        lineNumbers: true,
        mode: 'javascript'
      });
      var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror2, {
        userId: userId
      });
    }

    function richText() {
        //RichText
        var codeMirror = CodeMirror(document.getElementById('firepad'), {
          lineWrapping: true
        });

        var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
          userId: userId,
          defaultText: 'Type Live text here',
          richTextShortcuts: true,
          richTextToolbar: true
        });
      }
      //javaScript();
    richText();



  }]);
