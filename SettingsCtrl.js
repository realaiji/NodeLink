angular.module('app.controllers.Settings', [])
  .controller('SettingsCtrl', function($scope) {

    var configFile = ipc.sendSync('get-config-file');

    $scope.config = fse.readJsonSync(configFile);

    $scope.save = function () {
      fse.writeJson(configFile, $scope.config, function (err) {
        if (err) alert('ERROR: ' + JSON.stringify(err));
        else {
          alert('Success');
        }
      })
    }
  })
