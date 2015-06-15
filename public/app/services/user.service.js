"use strict";

angular.module('pairToLearnApp')
  .factory('UserService', ['$http', function($http) {
    var baseUrl = "http://localhost:3000";
    var User = {
      signUp: function(data) {
        return $http.post(baseUrl + '/signup', data).then(function(data){
          console.log(data);
          return data;
        });
      },
      signIn: function(data) {
        return $http.post(baseUrl + '/login', data).then(function(data) {
          return data;
        });
      },
      update: function(data) {
        return $http.put(baseUrl + '/users/edit', data).then(function(data) {
          return data;
        });
      }
    };
    return User;
  }]);