define(
    ['../model/maze', '../model/game', 'socketio'],
    function (MazeModel, GameModel, SocketIO)
{
    "use strict";
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper) {
            var game = new GameModel();
            MazeGenerator.game = game;

            Minesweeper.reqres.setHandler("new_game", function(gameType) {
                game.generate(gameType);
                return game;
            });

            MazeGenerator.on('start', function() {
                SocketIO.connect();
            });
        });
    };
});
