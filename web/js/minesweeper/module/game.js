define(
    ['marionette', '../view/maze', '../view/status', '../view/game', '../model/gametimer', '../model/gametimer'],
    function (Marionette, MazeView, StatusView, GameLayout, GameTimer)
{
    "use strict";
    return function(application) {
        application.module('Game', function(Game, Minesweeper) {
            Game.layoutView = new GameLayout({el: '#game-region'});

            Game.on('start', function() {
                var game = Minesweeper.request('new_game');
                this.timer = new GameTimer({game: game});

                Game.layoutView.initializeGame(game, this.timer);

                Game.layoutView.render();
            });

            Game.on('stop', function() {
                Minesweeper.gameRegion.close();
            });
        });
    };
});
