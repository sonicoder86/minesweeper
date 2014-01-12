"use strict";
var req = require('../requiresetup').requirejs,
    mazeModel = req('minesweeper/model/maze'),
    roomModel = require('./room').room,
    room = new roomModel(),
    maze;

exports.initialize = function(socket) {
    socket.on('join', function() {
        var roomId = room.add(socket.id);
        socket.join('room_'+roomId);

        if (room.isRoomReady(roomId)) {
            maze = new mazeModel({size: 9, bombs: 10});
            maze.generate();

            socket.emit('game', maze.toJSON());
            socket.broadcast.to('room_'+roomId).emit('game', maze.toJSON());
        }
    });


};