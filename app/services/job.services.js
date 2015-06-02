'use strict';

app.factory('JobService',['$http','$localStorage', function($http, $localStorage){

  var jobUrl = "http://localhost:3000/api/jobs";

  return{
    get: function(success, error){
      $http.get(jobUrl).success(success).error(error);
    },
    create: function(data, success,error){
      console.log(data._id);
      $http.post(jobUrl, data).success(success).error(error);
    },
    delete: function(id, success,error){
      // console.log(id);
      $http.delete(jobUrl + id).success(success).error(error);
    },
    apply: function(data, success,error){
      var me = data;
      console.log(me);
      $http.post(jobUrl + '/' + me.id + '/apply').success(success).error(error);
    },
    list: function(data, success, error){
      $http.get(jobUrl +  '/' + data._id + '/applicants').success(success).error(error);
    },
    view: function(data, success, error){
      $http.get(jobUrl +  '/' + data._id + '/applications').success(success).error(error);
    }

}
}]);