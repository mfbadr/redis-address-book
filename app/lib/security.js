'use strict';

var User = require('../models/user');

exports.authenticate = function(req, res, next){
  console.log('looking into session...');
  console.log(req.session);
  if(req.session.userId){
    User.findById(req.session.userId, function(err, user){
      console.log(user);
      res.locals.user = user;
      next();
    });
  }else{
    next();
  }
};
