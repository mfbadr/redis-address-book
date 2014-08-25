'use strict';

var Mongo  = require('mongodb');

function Address(o, id){
  this._id = Mongo.ObjectID();
  this.name = o.name;
  this.color = o.color;
  this.twitter = o.twitter;
  this.userId = id;
}

Object.defineProperty(Address, 'collection', {
  get: function(){return global.mongodb.collection('addresses');}
});

Address.create = function(o,id, cb){
  var a = new Address(o, id);
  Address.collection.save(a, cb);
};

Address.all = function(cb){
  Address.collection.find().toArray(cb);
};

Address.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Address.collection.findOne({_id:id}, function(err, address){
    cb(err, address);
  });
};


module.exports = Address;

