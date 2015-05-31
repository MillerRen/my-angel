'use strict';

angular.module('myAngelApp')
  .config(function ($routeSegmentProvider) {

    $routeSegmentProvider
      .when('/', 'main')
      .segment('main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });