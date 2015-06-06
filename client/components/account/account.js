'use strict';

angular.module('myAngelApp')
  .config(function ($routeSegmentProvider) {
    $routeSegmentProvider
      .when('/login','login')
      .segment('login', {
        templateUrl: 'components/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', 'signup')
      .segment('signup',{
        templateUrl: 'components/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', '')
      .segment('settings', {
        templateUrl: 'components/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });