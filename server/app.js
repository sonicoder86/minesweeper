var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path')
  , socketIO = require('socket.io');

var app = express(),
    server = http.createServer(app),
    io = socketIO.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../web')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', index.index);
app.get('/dev', index.devIndex);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function(socket) {

});