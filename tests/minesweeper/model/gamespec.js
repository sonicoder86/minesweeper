var testDefine = typeof window === 'undefined' ? requirejs : define;
testDefine(['minesweeper/model/game', 'minesweeper/model/gametype'], function(Game, GameType) {
    "use strict";
    var game;

    describe('Field model', function() {
        beforeEach(function() {
            game = new Game();
        });

        it('should generate maze with given parameters', function() {
            game.generate(new GameType({size: 3, bombs: 1}));

            expect(game.maze.get('fields').length).toEqual(9);
            expect(game.maze.get('bombs')).toEqual(1);
        });
    });
});