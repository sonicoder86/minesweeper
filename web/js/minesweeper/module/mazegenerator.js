define(
    ['../model/maze', '../model/game', 'socketio', '../event', '../model/gametype'],
    function (MazeModel, GameModel, SocketIO, Event, GameTypeModel)
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

                game.generate(gameType);
                return game;
            });

            MazeGenerator.on('start', function() {
                socket = SocketIO.connect();
                MazeGenerator.socket = socket;

                socket.on('game', function (mazeJSON) {
                    game.generateFromJSON(mazeJSON);
                    game.set('status', 'in_progress');
                    game.set('type', 'remote');
                });

                socket.on('display', function (field) {
                    game.maze.display(
                        game.maze.getField(field.x, field.y)
                    );
                });

                socket.on('flag', function (field) {
                    game.maze.flag(
                        game.maze.getField(field.x, field.y)
                    );
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
