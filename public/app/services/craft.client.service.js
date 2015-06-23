"use strict";

angular.module('pairToLearnApp')
  .factory('CraftService', ['$http', 'Upload', 'baseUrl', function($http, Upload, baseUrl) {
    var crafts = {
      oneCraft: []
    };

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

    crafts.getOneCraft = function(id) {
      return $http.get(baseUrl + '/crafts/' + id).then(function(res) {
        return res.data;
      });
    };

    crafts.applyAsExpert = function(data) {
      return $http.put(baseUrl + '/apply/crafts/' + data.craftId, data).then(function(res) {
        return res.data;
      });
    };

    crafts.getExpertCrafts = function(userId) {
      return $http.get(baseUrl + '/expert/' + userId + '/crafts').then(function(res) {
        return res.data;
      });
    };

     crafts.updateCraft = function(id, params) {
      return $http.put(baseUrl + '/crafts/' + id, params).then(function(res) {
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
