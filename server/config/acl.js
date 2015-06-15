/**
 * Access Control List definition
 */

'use strict';

var mongoose = require('mongoose');

module.exports = function(app, acl) {
  
  acl.allow('admin','users','*');
  app.use('/api', acl.middleware());
  //acl error handler
  app.use(function(err, req, res, next) {
      if(!err) return next();
      res.status(403).json({message:err.msg});
  });
};