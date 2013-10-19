define(['marionette', '../view/maze', '../view/status', '../view/game'], function (Marionette, MazeView, StatusView, GameLayout) {
    return function(application) {
        application.module('Game', function(Game, Minesweeper, Backbone, Marionette, $, _) {
            Game.layoutView = new GameLayout({
                model: Minesweeper.request('maze:generate', 9, 10)
            });

            Game.on('start', function() {
                Minesweeper.gameRegion.show(Game.layoutView);
            });
        });
    };
});
