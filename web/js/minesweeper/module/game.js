define(
    ['marionette', '../view/maze', '../view/status', '../view/game', '../model/gametype'],
    function (Marionette, MazeView, StatusView, GameLayout, GameType)
{
    "use strict";
    return function(application) {
        application.module('Game', function(Game, Minesweeper) {
            var maze = Minesweeper.request('maze:generate', new GameType({size: 9, bombs: 10}));
            Game.layoutView = new GameLayout({
                model: maze
            });

            Game.on('start', function() {
                Minesweeper.gameRegion.show(Game.layoutView);
            });
        });
    };
});
