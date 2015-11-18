angular.module('app.controllers.Main', ['app.services.Main'])
  .controller('MainCtrl', function($scope,  MainService) {

    $scope.date = new Date();

    $scope.getList = function () {
      var date = moment($scope.date).format('YYYY-MM-DD');

      MainService.list(date)
      .then(function (rows) {
        $scope.person = rows;
      }, function (err) {
        console.log(err);
      })
    }
  })
