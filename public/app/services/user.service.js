"use strict";

angular.module('pairToLearnApp')
  .factory('UserService', ['$http', function($http) {
    var baseUrl = "http://localhost:3000";
    var User = {
      signUp: function(data) {
        return $http.post(baseUrl + '/signup', data).then(function(data){
          return data;
        });
      },

      signIn: function(data) {
        $http.post(baseUrl + '/login', data);
      }
    };
    return User;
  }]);