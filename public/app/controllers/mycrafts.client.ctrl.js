"use strict";

angular.module('pairToLearnApp')
  .controller('myCraftsCtrl', ['CraftService', 'UserService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, UserService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {
    (function($) {
      $(function() {
        $('ul.tabs').tabs();
      });
    })(jQuery);

    UserService.getOneUser($window.sessionStorage.user).then(function(data) {
      var sessions = data.sessions;
      sessions.forEach(function(element, index) {
        var craftId = element.sessionId.split('-')[1];
        CraftService.getOneCraft(craftId).then(function(data) {
          element.craftData = data;
        }, function(err) {
          return err;
        });
      });
      $scope.sessions = sessions;
    });
  }]);
