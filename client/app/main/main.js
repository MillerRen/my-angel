'use strict';

angular.module('myAngelApp')
  .config(function ($routeSegmentProvider) {
    $routeSegmentProvider.options.autoLoadTemplates = true;
    $routeSegmentProvider
      .when('/main', 'main')
      .segment('main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });