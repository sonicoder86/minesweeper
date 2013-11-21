define(['minesweeper/application', 'minesweeper/module/menu', 'minesweeper/model/gametype'],
function(application, menuModuleSetup, GameTypeModel)
{
    "use strict";
    describe('MenuModule', function() {
        var gameType = new GameTypeModel({size: 2, bombs: 1}),
            generateArguments = null;

        beforeEach(function() {
            menuModuleSetup(application);
            application.reqres.setHandler("maze:generate", function(gameType) {
                generateArguments = gameType;
            });
        });

        afterEach(function() {
            application.reqres.removeHandler("maze:generate");
        });

        it('should generate new maze when new game is selected', function() {
            application.Menu.menuView.trigger('new_game', gameType);

            expect(generateArguments).toEqual(gameType);
        });
    });
});
