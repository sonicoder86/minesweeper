define(
    ['marionette', '../view/maze', '../view/status', '../view/game', '../model/gametype'],
    function (Marionette, MazeView, StatusView, GameLayout, GameType)
{
    "use strict";
    return function(application) {
        application.module('Game', function(Game, Minesweeper) {
            Game.layoutView = new GameLayout();

            Game.on('start', function() {
                var game = Minesweeper.request('new_game', new GameType({sizeX: 9, sizeY: 9, bombs: 10}));
                Game.layoutView.initializeGame(game);

                Minesweeper.gameRegion.show(Game.layoutView);
            });

            Game.on('stop', function() {
                Minesweeper.gameRegion.close();
            });
        });
    };
});
