
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  //, wine = require('./routes/wines')
  , progressbar = require('./routes/progressbars')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
/*
app.get('/', routes.index);
app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
*/
app.get('/progressbars', progressbar.findAll);
app.get('/progressbar/:id', progressbar.findById);
app.get('/progressbars/:id', progressbar.findById);
app.post('/progressbar', progressbar.addWine);
app.post('/progressbars', progressbar.addWine);
app.put('/progressbar/:id', progressbar.updateWine);
app.put('/progressbars/:id', progressbar.updateWine);
app.delete('/progressbar/:id', progressbar.deleteWine);
app.delete('/progressbars/:id', progressbar.deleteWine);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
