"use strict";

angular.module('pairToLearnApp')
  .factory('UserService', ['$http', 'Upload', function($http, Upload) {
    var baseUrl = "http://localhost:3000";
    var User = {
    };
    User.updateProfile = function(id, params) {
      return $http.put(baseUrl + '/users/' + id, params).then(function(data) {
         return data;
      });
    };
    User.uploadPic = function(file, fields) {
      return Upload.upload({
            url: baseUrl + '/users',
            method: "POST",
            file: file,
            fields: fields
          })
          .then(function(res) {
            return res.data;
          });
    };
    return User;
  }]);
