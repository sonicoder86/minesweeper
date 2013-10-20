define(['minesweeper/application', 'minesweeper/module/menu', 'minesweeper/model/gametype'],
function(application, MenuModuleSetup, GameTypeModel)
{
    describe('MenuModule', function() {
        MenuModuleSetup(application);
        var gameType = new GameTypeModel({size: 2, bombs: 1}),
            generateArguments = null;

        beforeEach(function() {
            application.reqres.setHandler("maze:generate", function(size, bombs) {
                generateArguments = [size, bombs];
            });
        });

        afterEach(function() {
            application.reqres.removeHandler("maze:generate");
        });

        it('should generate new maze when new game is selected', function() {
            application.Menu.menuView.trigger('new_game', gameType);

            expect(generateArguments).toEqual([2, 1]);
        });
    });
});
