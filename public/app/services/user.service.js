"use strict";

angular.module('pairToLearnApp')
  .factory('UserService', ['$http', function($http) {
    var baseUrl = "http://localhost:3000";
    var User = {

      update: function(id, params) {
        return $http.put(baseUrl + '/users/' + id, params).then(function(data) {
           return data;
        });
      }
    };
    
    return User;
  }]);