"use strict";

angular.module('pairToLearnApp')
  .factory('SessionService', ['$http', function($http) {
    var session = {}

    session.bookSession = function () {
        return $http.get(baseUrl + '/pair/' + craftId + ' /' + userId).then(function(res) {
        return res.data;
      });
    }


  }])