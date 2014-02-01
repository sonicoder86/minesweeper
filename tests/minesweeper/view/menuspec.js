define(['minesweeper/view/menu', 'minesweeper/collection/gametype'], function(MenuView, GameTypeCollection) {
    "use strict";
    describe('MenuView', function() {
        var gameTypes, menu, triggered, gameType;

        beforeEach(function () {
            gameTypes = new GameTypeCollection([{}]);
            menu = new MenuView({collection: gameTypes});
            triggered = false;
            gameType = null;
        });

        it('should convert itemview events to new game events', function() {
            menu.render();
            menu.on('new_game', function(type) {
                gameType = type;
                triggered = true;
            });

            menu.$('#game-type-list a').first().trigger('click');

            expect(triggered).toBeTruthy();
            expect(gameType).toEqual(gameTypes.at(0));
        });
    });
});
