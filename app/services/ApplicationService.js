app.factory('ApplicationService',['$http','$localStorage', function($http, $localStorage){

  // var applicationUrl = "http://localhost:3000/api/jobs";

  return{
    get: function(success, error){
      return $http.get(jobUrl).success(success).error(error);
    },

    create: function(data, success,error){
      return $http.post(jobUrl, data).success(success).error(error);
    },

    delete: function(id, success,error){
      return $http.delete(jobUrl + id).success(success).error(error);
    }
  }
}]);