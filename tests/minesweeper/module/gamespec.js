define(['minesweeper/application', 'minesweeper/module/game', 'minesweeper/model/game', 'minesweeper/model/gametype'],
    function(application, gameModuleSetup, Game, GameType)
{
    "use strict";
    gameModuleSetup(application);
    var game, gameModule = application.Game, gameType = new GameType({size: 1, bombs: 0});

    beforeEach(function() {
        game = new Game();
        game.generate(gameType);
        application.reqres.setHandler("new_game", function() {
            return game;
        });
    });

    afterEach(function() {
        application.reqres.removeHandler("new_game");
        gameModule.stop();
    });

    describe('GameModule', function() {
        it('should request new game on start', function() {
            gameModule.start();

            expect(gameModule.layoutView.model).toEqual(game);
        });

        it('should show game layout on start', function() {
            var shown = false;
            gameModule.layoutView.on('show', function() {
                shown = true;
            });
            gameModule.start();

            expect(shown).toEqual(true);
        });
    });
});
