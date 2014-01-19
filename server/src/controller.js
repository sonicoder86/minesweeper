"use strict";
var roomModel = require('./room').room,
    gameSocket = require('./game').gameSocket,
    room = new roomModel(), socketHandler = {};

socketHandler.initialize = function(socket) {
    console.log(socket.id+" connected");

    (new gameSocket(socket, room)).bindEventHandlers();
};

exports.initialize = socketHandler.initialize;