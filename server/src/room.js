"use strict";
var room = function Room() {
    this.users = [];
    this.rooms = [];
    this.rooms.push([]);
},
usersPerRoom = 2;

room.prototype.add = function(userId) {
    this.users.push(userId);

    var lastRoomId = this.rooms.length - 1;
    if (!this.addToRoom(lastRoomId, userId)) {
        lastRoomId += 1;
        this.addToRoom(lastRoomId, userId);
    }

    return lastRoomId;
};

room.prototype.addToRoom = function(roomId, userId) {
    if (!this.rooms[roomId]) {
        this.rooms[roomId] = [];
    }

    if (this.rooms[roomId].length >= usersPerRoom) {
        return false;
    }

    this.rooms[roomId].push(userId);
    return true;
};

room.prototype.isRoomReady = function(roomId) {
    return this.rooms[roomId].length >= usersPerRoom;
};

room.prototype.getRoom = function(userId) {
    var roomId;

    this.rooms.forEach(function(currentRoom, index) {
        if (currentRoom.indexOf(userId) !== -1) {
            roomId = index;
        }
    });

    return roomId;
};

room.prototype.remove = function(userId) {
    var roomId = this.getRoom(userId);
    if (!roomId) {
        return false;
    }

    delete this.users[this.users.indexOf(userId)];
    delete this.rooms[roomId][this.rooms[roomId].indexOf(userId)];
    return true;
};

exports.room = room;