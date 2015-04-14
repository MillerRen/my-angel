(function() {
  'use strict';
  angular.module('myAngelApp').controller('SettingsCtrl', function($scope, User, Auth) {
    $scope.errors = {};
    return $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        return Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword).then(function() {
          return $scope.message = 'Password successfully changed.';
        })["catch"](function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          return $scope.message = '';
        });
      }
    };
  });

}).call(this);
