"use strict";

angular.module('pairToLearnApp')
  .factory('SessionService', ['$http', 'baseUrl', function($http, baseUrl) {
    var Session = {}

    Session.bookSession = function () {
        return $http.get(baseUrl + '/pair/' + craftId + ' /' + userId).then(function(res) {
        return res.data;
      });
    };

    Session.sendMail = function (userId, craftId, expertId) {
      var mailDetails = {
        userId: userId,
        craftId: craftId,
        expertId: expertId
      }

      return $http.post(baseUrl + '/mail', mailDetails).then(function(res) {
        return res.data;
      });
    };
    return Session;

  }]);