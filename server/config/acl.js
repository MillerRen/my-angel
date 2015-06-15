/**
 * Access Control List definition
 */

'use strict';

var mongoose = require('mongoose');
var ACL = require('acl');
var backend = new ACL.mongodbBackend(mongoose.connection.db, 'acl_');
var acl = new ACL(backend);

mongoose.connection.on('connected',function(err){
    //if(err) proccess.exit();
    acl.allow([
        {
            roles: 'admin',
            allows: [
                { resources: 'users', permissions: '*' }
            ]
        }, {
            roles: 'user',
            allows: [
                { resources: 'thins', permissions: '*' }
            ]
        }, {
            roles: 'guest',
            allows: []
        }
    ]);
})

module.exports = function(app) {
  app.use('/api', acl.middleware());
  //acl error handler
  app.use(function(err, req, res, next) {
      if(!err) return next();
      res.status(403).json({message:err.msg});
  });
};