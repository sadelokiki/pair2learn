'use strict';

angular.module('pairToLearnApp')
  .controller('NavCtrl', ['UserService', '$rootScope', '$scope', '$location', '$window', '$timeout', 'Upload',
    function(UserService, $rootScope, $scope, $location, $window, $timeout, Upload) {
      (function($) {
        $(function() {
          $('.dropdown-button')
            .dropdown({
              inDuration: 300,
              outDuration: 225,
              constrain_width: false, // Does not change width of dropdown to that of the activator
              hover: true, // Activate on hover
              gutter: 0, // Spacing from edge
              belowOrigin: true // Displays dropdown below the button
            });
        });
        $('.button-collapse')
          .sideNav({
            menuWidth: 180, // Default is 240
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
          });
      })(jQuery);

      $rootScope.$on("$routeChangeSuccess", function(event) {
        if ($window.sessionStorage.token) {
          var parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
          };
          var decodedToken = parseJwt($window.sessionStorage.token);
          $rootScope.decodedToken = decodedToken;
          console.log($rootScope.decodedToken);
          $rootScope.isLoggedIn = true;
        } else {
          $rootScope.isLoggedIn = false;
        }

        //show features link only on homepage
        if ($location.path() === '/home') {
          $rootScope.hideFeatures = false;
        } else {
          $rootScope.hideFeatures = true;
        }
      });

      $rootScope.addProfilePic = function(profpic) {
        console.log(profpic)
        var localhost = "http://localhost:3000/users";
        // decodedToken.user.picture = decodedToken.user.picture[0];
        var upload = Upload.upload({
            url: localhost,
            method: "POST",
            file: profpic,
            fields: $rootScope.decodedToken.user
          })
          .success(function(data) {
            // $scope.showProfile();
            console.log(data);
            $window.sessionStorage.token = data.token;
            $location.url("/user/" + data.user._id + '/profile');
          });

      };

      $rootScope.logout = function() {
        $rootScope.hideOutProg = false;
        $window.sessionStorage.clear();
        $timeout(function() {
          $rootScope.hideOutProg = true;
          Materialize.toast('You are signed out!', 2000);
          $location.url("/home");
        }, 1500);
      };

      $scope.editProfile = function() {
        UserService.update($scope.decodedToken.user._id, $scope.decodedToken.user).then(function(res) {
          console.log("profile updated");
          Materialize.toast('Profile updated successfully!', 4000);
          console.log(res.data);
          $window.sessionStorage.token = res.data.token;
          $location.url("/user/" + res.data.user._id + '/profile');
        });
      };
    }
  ]);
