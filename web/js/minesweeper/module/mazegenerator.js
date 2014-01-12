define(
    ['../model/maze', '../model/game', 'socketio', '../event'],
    function (MazeModel, GameModel, SocketIO, Event)
{
    "use strict";
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper) {
            var game = new GameModel(), socket;
            MazeGenerator.game = game;

            Minesweeper.reqres.setHandler("new_game", function(gameType) {
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
                    game.maze.fromJSON(mazeJSON);
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

                Event.on('display', function(field) {
                    if (game.get('type') !== 'remote') {
                        return;
                    }

                    socket.emit('display', field.toJSON());
                });

                Event.on('flag', function(field) {
                    if (game.get('type') !== 'remote') {
                        return;
                    }

                    socket.emit('flag', field.toJSON());
                });
            });
        });
    };
});
