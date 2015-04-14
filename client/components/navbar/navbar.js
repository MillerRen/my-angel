(function() {
  'use strict';
  angular.module('myAngelApp').controller('NavbarCtrl', function($scope, $location, Auth) {
    $scope.menu = [
      {
        title: 'Home',
        link: '/'
      }
    ];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.logout = function() {
      Auth.logout();
      return $location.path('/login');
    };
    return $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

}).call(this);
