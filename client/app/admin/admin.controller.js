'use strict';

angular.module('myAngelApp')
  .controller('AdminCtrl', function ($scope, $http, NgTableParams, Auth, User) {

    $scope.tableParams = new NgTableParams({
      page:1,
      count:100
    },
    {
      getData: function($defer, params){
        User.query(params.url(), function(data){
          $defer.resolve(data);
        });
      }
    });

    var ctrl = this;

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

  });
