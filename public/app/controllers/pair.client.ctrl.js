'use strict';

angular.module('pairToLearnApp')
  .controller('PairCtrl', ['$rootScope', '$scope', '$timeout', '$location', '$window', 'UserService', function($rootScope, $scope, $timeout, $location, $window, UserService) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.collapsible').collapsible({
          accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
    })(jQuery);
    UserService.getOneUser($rootScope.decodedToken.user._id).then(function(data) {
      $scope.counter = data.minutes * 60;
    });

    var mytimeout = null;
    $scope.onTimeout = function() {
      if ($scope.counter === 0) {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        return;
      }
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
    }
    mytimeout = $timeout($scope.onTimeout, 1000);

    $scope.stopTimer = function() {
      $scope.$broadcast('timer-stopped', $scope.counter);
      // $scope.counter= ;
      $timeout.cancel(mytimeout);
    }
    // mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.$on('timer-stopped', function(event, remaining) {
      if (remaining === 0) {
        alert('your time ran out!');
      }
    });

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
