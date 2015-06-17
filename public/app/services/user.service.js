"use strict";

angular.module('pairToLearnApp')
  .factory('UserService', ['$http', function($http) {
    var baseUrl = "http://localhost:3000";
    var User = {
<<<<<<< HEAD
      update: function(id, params) {
        return $http.put(baseUrl + '/users/' + id, params).then(function(data) {
           return data;
        });
      }
=======
     
>>>>>>> remove unnecessary service calls
    };
    
    return User;
  }]);