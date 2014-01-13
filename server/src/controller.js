"use strict";
var req = require('../requiresetup').requirejs,
    mazeModel = req('minesweeper/model/maze'),
    roomModel = require('./room').room,
    room = new roomModel(),
    maze, socketHandler = {};

socketHandler.initialize = function(socket) {
    socket.on('connect', function() {
        console.log(socket.id+" connected");
    });

    socket.on('join', function() {
        if (typeof room.getRoom(socket.id) !== 'undefined') {
            return;
        }

        var roomId = room.add(socket.id);
        socket.join('room_'+roomId);
        console.log(socket.id+" joined room "+roomId);

        if (room.isRoomReady(roomId)) {
            console.log("room "+roomId+" is ready");
            maze = new mazeModel({size: 9, bombs: 10});
            maze.generate();

            socket.emit('game', maze.toJSON());
            socket.broadcast.to('room_'+roomId).emit('game', maze.toJSON());
            console.log(socket.id+" started the game");
        }
    });

    socket.on('display', function(field) {
        var roomId = room.getRoom(socket.id);
        socket.broadcast.to('room_'+roomId).emit('display', field);
        console.log(socket.id+" displays field "+field.x+" "+field.y);
    });

    socket.on('flag', function(field) {
        var roomId = room.getRoom(socket.id);
        socket.broadcast.to('room_'+roomId).emit('flag', field);
        console.log(socket.id+" flags field "+field.x+" "+field.y);
    });
};

exports.initialize = socketHandler.initialize;