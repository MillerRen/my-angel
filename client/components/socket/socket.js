(function() {
  'use strict';
  angular.module('socketMock', []).factory('socket', function() {
    return {
      socket: {
        connect: function() {},
        on: function() {},
        emit: function() {},
        receive: function() {}
      },
      syncUpdates: function() {},
      unsyncUpdates: function() {}
    };
  });

  'use strict';

  angular.module('myAngelApp').factory('socket', function(socketFactory) {
    var ioSocket, socket;
    ioSocket = io('', {
      path: '/socket.io-client'
    });
    socket = socketFactory({
      ioSocket: ioSocket
    });
    return {
      socket: socket,

      /*
      Register listeners to sync an array with updates on a model
      
      Takes the array we want to sync, the model name that socket updates are sent from,
      and an optional callback function after new items are updated.
      
      @param {String} modelName
      @param {Array} array
      @param {Function} callback
       */
      syncUpdates: function(modelName, array, callback) {

        /*
        Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function(item) {
          var event, index, oldItem;
          oldItem = _.find(array, {
            _id: item._id
          });
          index = array.indexOf(oldItem);
          event = 'created';
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }
          return typeof callback === "function" ? callback(event, item, array) : void 0;
        });

        /*
        Syncs removed items on 'model:remove'
         */
        return socket.on(modelName + ':remove', function(item) {
          var event;
          event = 'deleted';
          _.remove(array, {
            _id: item._id
          });
          return typeof callback === "function" ? callback(event, item, array) : void 0;
        });
      },

      /*
      Removes listeners for a models updates on the socket
      
      @param modelName
       */
      unsyncUpdates: function(modelName) {
        socket.removeAllListeners(modelName + ':save');
        return socket.removeAllListeners(modelName + ':remove');
      }
    };
  });

}).call(this);
