"use strict";
var express = require('express'),
    errorHandler = require('errorhandler'),
    favicon = require('static-favicon'),
    index = require('./routes/index'),
    http = require('http'),
    path = require('path'),
    socketIO = require('socket.io');

var app = express(),
    server = http.createServer(app),
    io = socketIO.listen(server);
io.set('log level', 0);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/../web/favicon.ico'));
app.use(express.static(path.join(__dirname, '../web')));
app.use(express.static(path.join(__dirname, '../tests')));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

app.get('/', index.index);
app.get('/dev', index.devIndex);
app.get('/test', index.test);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + "\n");
});

io.sockets.on('connection', require('./src/controller').initialize);
