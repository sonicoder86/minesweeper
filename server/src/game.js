"use strict";
var req = require('../requirejs/setup').requirejs,
    mazeModel = req('minesweeper/model/maze'),
    _ = require('underscore');

var gameSocket = function(socket, room) {
    this.socket = socket;
    this.room = room;
    _.bindAll(this, 'join', 'display', 'flag', 'disconnect', 'restart');
};

gameSocket.prototype.bindEventHandlers = function() {
    this.socket.on('join', this.join);
    this.socket.on('display', this.display);
    this.socket.on('flag', this.flag);
    this.socket.on('leave', this.leave);
    this.socket.on('restart', this.restart);
    this.socket.on('disconnect', this.disconnect);
};

gameSocket.prototype.join = function() {
    if (typeof this.room.getRoom(this.socket.id) !== 'undefined') {
        return;
    }

    var roomId = this.room.add(this.socket.id);
    this.socket.join('room_'+roomId);
    console.log(this.socket.id+" joined room "+roomId);

    if (this.room.isRoomReady(roomId)) {
        this.startGame(roomId);
    }
};

gameSocket.prototype.startGame = function(roomId) {
    console.log("room "+roomId+" is ready");
    var maze = new mazeModel({sizeX: 9, sizeY: 9, bombs: 10});
    maze.generate();

    this.socket.emit('game', maze.toJSON());
    this.socket.broadcast.to('room_'+roomId).emit('game', maze.toJSON());
    console.log(this.socket.id+" started the game");
};

function transmitEvent (eventType) {
    return function(field) {
        var roomId = this.room.getRoom(this.socket.id);
        this.socket.broadcast.to('room_'+roomId).emit(eventType, field);
        console.log(this.socket.id + " " + eventType + "s field " + field.x + " " + field.y);
    };
}

gameSocket.prototype.display = transmitEvent('display');

gameSocket.prototype.flag = transmitEvent('flag');

gameSocket.prototype.leave = gameSocket.prototype.disconnect = function() {
    this.room.remove(this.socket.id);
    console.log(this.socket.id+" left");
};

gameSocket.prototype.restart = function() {
    console.log(this.socket.id+" restart");
    var roomId = this.room.getRoom(this.socket.id);
    if (this.room.isRoomReady(roomId)) {
        this.startGame(roomId);
    }
};

exports.gameSocket = gameSocket;