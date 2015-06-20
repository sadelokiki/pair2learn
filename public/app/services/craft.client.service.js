"use strict";

angular.module('pairToLearnApp')
  .factory('CraftService', ['$http', 'Upload', function($http, Upload) {
    var baseUrl = "http://localhost:3000";
    var crafts = {};

    crafts.createCraft = function(file, craft) {
      return Upload.upload({
          url: baseUrl + '/crafts',
          method: "POST",
          file: file,
          fields: craft
      })
      .then(function(res) {
        return res.data;
      });
    };

    crafts.getOne = function(id) {
      return $http.get(baseUrl + '/crafts/' + id).then(function(res) {
        return res.data;
      });
    };

    crafts.getAll = function() {
      return $http.get(baseUrl + '/crafts/').then(function(res) {
        return res.data;
      });
    };

    return crafts;
  }]);
