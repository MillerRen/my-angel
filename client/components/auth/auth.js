(function() {
  'use strict';
  angular.module('myAngelApp').factory('Auth', function($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser;
    currentUser = $cookieStore.get('token') ? User.get() : {};
    return {

      /*
      Authenticate user and save token
      
      @param  {Object}   user     - login info
      @param  {Function} callback - optional
      @return {Promise}
       */
      login: function(user, callback) {
        var deferred;
        deferred = $q.defer();
        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return typeof callback === "function" ? callback() : void 0;
        }).error((function(_this) {
          return function(err) {
            _this.logout();
            deferred.reject(err);
            return typeof callback === "function" ? callback(err) : void 0;
          };
        })(this));
        return deferred.promise;
      },

      /*
      Delete access token and user info
      
      @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /*
      Create a new user
      
      @param  {Object}   user     - user info
      @param  {Function} callback - optional
      @return {Promise}
       */
      createUser: function(user, callback) {
        return User.save(user, function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          return typeof callback === "function" ? callback(user) : void 0;
        }, (function(_this) {
          return function(err) {
            _this.logout();
            return typeof callback === "function" ? callback(err) : void 0;
          };
        })(this)).$promise;
      },

      /*
      Change password
      
      @param  {String}   oldPassword
      @param  {String}   newPassword
      @param  {Function} callback    - optional
      @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return typeof callback === "function" ? callback(user) : void 0;
        }, function(err) {
          return typeof callback === "function" ? callback(err) : void 0;
        }).$promise;
      },

      /*
      Gets all available info on authenticated user
      
      @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /*
      Check if a user is logged in synchronously
      
      @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /*
      Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(callback) {
        if (currentUser.hasOwnProperty('$promise')) {
          return currentUser.$promise.then(function() {
            if (typeof callback === "function") {
              callback(true);
            }
          })["catch"](function() {
            if (typeof callback === "function") {
              callback(false);
            }
          });
        } else {
          return typeof callback === "function" ? callback(currentUser.hasOwnProperty('role')) : void 0;
        }
      },

      /*
      Check if a user is an admin
      
      @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /*
      Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });

}).call(this);
