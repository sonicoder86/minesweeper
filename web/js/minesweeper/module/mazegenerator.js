define(
    ['../model/maze', '../model/game', 'socketio', '../event', '../model/gametype'],
    function (MazeModel, GameModel, SocketIO, Events, GameTypeModel)
{
    "use strict";
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper) {
            var game = new GameModel(), socket;
            MazeGenerator.game = game;

            Minesweeper.reqres.setHandler("new_game", function(gameType) {
                if (!gameType) {
                    gameType = new GameTypeModel({sizeX: 9, sizeY: 9, bombs: 10});
                }

                if (gameType.get('isRemote')) {
                    game.set('status', 'waiting');
                    socket.emit('join');
                    return game;
                }

                //console.profile('refakt');
                game.generate(gameType);
                //console.profileEnd();
                return game;
            });

            MazeGenerator.on('start', function() {
                socket = SocketIO.connect();
                MazeGenerator.socket = socket;

                Events.on('restart', function () {
                    if (game.get('type') === 'remote') {
                        socket.emit('restart');
                    }
                    else {
                        game.start();
                    }
                });

                socket.on('game', function (mazeJSON) {
                    game.generateFromJSON(mazeJSON);
                });

                socket.on('display', function (field) {
                    game.displayRemote(field);
                    Events.trigger('timer:start');
                });

                socket.on('flag', function (field) {
                    game.flagRemote(field);
                    Events.trigger('timer:start');
                });

                game.on('display', function(field) {
                    if (game.get('type') !== 'remote') {
                        return;
                    }

                    socket.emit('display', field.toJSON());
                });

                game.on('flag', function(field) {
                    if (game.get('type') !== 'remote') {
                        return;
                    }

                    socket.emit('flag', field.toJSON());
                });
            });
        });
    };
});
