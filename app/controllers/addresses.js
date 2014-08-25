'use strict';

var Address = require('../models/address'),
    Mongo   = require('mongodb');

exports.index = function(req, res){
  Address.collection.find({userId:res.locals.user._id}).toArray(function(err, addresses){
    res.render('addresses/index', {addresses:addresses});
  });
};

exports.new = function(req, res){
  res.render('addresses/new');
};

exports.create = function(req, res){
  Address.create(req.body, res.locals.user._id, function(){
    res.redirect('/addresses');
  });
};
