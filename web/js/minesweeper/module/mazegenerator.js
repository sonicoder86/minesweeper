define(
    ['../model/maze', '../model/game', 'socketio'],
    function (MazeModel, GameModel, SocketIO)
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
                });
            });
        });
    };
});
