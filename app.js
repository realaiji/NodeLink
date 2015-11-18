require('angular');
require('angular-ui-router');
var ipc = require('ipc');
var fse = require('fs-extra');
var moment = require('moment');
var _ = require('lodash');

angular.module('app', [
    'ui.router',
    'app.controllers.Main',
    'app.controllers.Settings'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/"); //http://localhost/#/
    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: "partials/main.html",
        controller: 'MainCtrl'
      })
      .state('settings', {
        url: "/settings",
        templateUrl: "partials/settings.html",
        controller: 'SettingsCtrl'
      })
  });
