define(['minesweeper/view/menu', 'minesweeper/collection/gametype'], function(MenuView, GameTypeCollection) {
    describe('MenuView', function() {
        var gameTypes, menu, triggered, gameType;

        beforeEach(function () {
            gameTypes = new GameTypeCollection([{bombs: 1, size: 2, isRemote: false}]);
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
            expect(gameType.get('size')).toEqual(2);
        });
    });
});
