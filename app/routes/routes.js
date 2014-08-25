'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    users          = require('../controllers/users'),
    addresses      = require('../controllers/addresses'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session), //link the two
    security       = require('../lib/security'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));


  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.use(session({store:new RedisStore(),
    secret:'keyboard cat', //use to generate hash
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:null}
  }));
  app.use(security.authenticate);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', users.authenticate);

  app.use(security.bounce); //sites below require a log in to be viewed

  app.delete('/logout', users.logout);
  app.get('/addresses', addresses.index);
  app.get('/addresses/new', addresses.new);
  app.post('/addresses', addresses.create);

  console.log('Express: Routes Loaded');
};

