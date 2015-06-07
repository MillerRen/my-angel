'use strict';

angular.module('myAngelApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    //$scope.users = User.query();

    var ctrl = this;

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.index = function(tableState){
      $scope.users = User.query(tableState);
    }

  });
