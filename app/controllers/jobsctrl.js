app.controller('JobsCtrl', function($scope, $location, $timeout, JobService, UserService ){

  $scope.createJob = function(){
    console.log($scope.job);
    JobService.create($scope.job);
  };

  $scope.allJobs = [];
  JobService.get(function (success) {
  $timeout(function () {
    $scope.allJobs = success;
    return $scope.allJobs;
  }, 500);
}, function (err) {
  return err;
});

 $scope.submitApplication = function(data){
  
  console.log('now submit!');
    JobService.apply($scope.user, function(data){
      console.log('data',data);
      $location.path('/home');
    });
  };

$scope.viewApplications = function(){

  JobService.view($scope.currentUser, function(data){
    console.log(data);
    // $location.path('/applications');
  });
};

$scope.applicants = function(){
  JobService.list($scope.currentUser, function(){
    console.log(data);
  });
};


});