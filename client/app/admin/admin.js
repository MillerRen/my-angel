'use strict';

angular.module('myAngelApp')
  .config(function ($routeSegmentProvider) {
    $routeSegmentProvider
      .when('/admin', 'admin')
      .segment('admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });