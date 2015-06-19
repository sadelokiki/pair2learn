"use strict";

angular.module('pairToLearnApp')
  .factory('CraftService', ['$http', function($http) {
    var baseUrl = "http://localhost:3000";
    return {
    post: function(data) {
      return $http.post(baseUrl + '/crafts/', data).then(function(res) {
        return res.data;
      });
    },

    getOne: function(id, params) {
      return $http.get(baseUrl + '/crafts/' + id, data).then(function(res) {
        return res.data;
      });
    },

    getAll: function() {
      return $http.get(baseUrl + '/crafts/').then(function(res) {
        return res.data;
      })
    }
  };
    
  }])
