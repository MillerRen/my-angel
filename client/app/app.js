'use strict';

angular.module('myAngelApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'route-segment',
  'view-segment',
  'smart-table',
  'btford.socket-io',
  'angular-async-loader'
])
  .config(function ($routeProvider, $routeSegmentProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
      
    $routeSegmentProvider.options.autoLoadTemplates = true;
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .config(function($ngLoadProvider){
    
  })

  .run(function ($rootScope, $location,$ngLoad, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });