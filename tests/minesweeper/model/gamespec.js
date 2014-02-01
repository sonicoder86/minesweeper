var testDefine = typeof window === 'undefined' ? requirejs : define;
testDefine(['minesweeper/model/game', 'minesweeper/model/gametype'], function(Game, GameType) {
    "use strict";
    var game,
        markGameAsDefeat = function() {
            game.maze.getFields().findWhere({isBomb: true}).display();
        },
        getFieldWithoutBomb = function() {
            return game.maze.getFields().findWhere({isBomb: false, isDisplayed: false});
        },
        markGameAsVictory = function() {
            game.maze.getFields().forEach(function(field) {
                if (field.get('isBomb')) {
                    field.flag();
                }
                else {
                    field.display();
                }
            });
        };

    describe('Game model', function() {
        beforeEach(function() {
            game = new Game();
            game.generate(new GameType());
        });

        it('should generate maze with given parameters', function() {
            expect(game.maze.get('fields').length).toEqual(9);
            expect(game.maze.get('bombs')).toEqual(1);
        });

        it('should mark game as victory when all bombs are flagged and all fields are displayed', function() {
            markGameAsVictory();

            expect(game.get('status')).toEqual('victory');
        });

        it('should mark game as defeat when a bomb is displayed and not flagged', function() {
            markGameAsDefeat();

            expect(game.get('status')).toEqual('defeat');
        });

        it('should mark game as in progress when not all the fields are displayed', function() {
            getFieldWithoutBomb().display();

            expect(game.get('status')).toEqual('in_progress');
        });

        it('should display field when game is in progress', function() {
            var field = game.maze.getField(0, 0);
            spyOn(field, 'display');

            game.display(field);

            expect(field.display).toHaveBeenCalled();
        });

        it('should not display field when game is defeated', function() {
            markGameAsDefeat();

            var field = getFieldWithoutBomb();
            spyOn(field, 'display');

            game.display(field);

            expect(field.display).not.toHaveBeenCalled();
        });

        it('should flag field when game is in progress', function() {
            var field = getFieldWithoutBomb();
            spyOn(field, 'flag');

            game.flag(field);

            expect(field.flag).toHaveBeenCalled();
        });

        it('should not flag field when game is defeated', function() {
            markGameAsDefeat();

            var field = getFieldWithoutBomb();
            spyOn(field, 'flag');

            game.flag(field);

            expect(field.flag).not.toHaveBeenCalled();
        });

        it('should display all bombs when one of the bombs displayed', function() {
            game.generate(new GameType({sizeX: 3, sizeY: 3,bombs: 2}));
            markGameAsDefeat();

            var bombsDisplayed = game.maze.getFields().where({isBomb: true, isDisplayed: true});

            expect(bombsDisplayed.length).toEqual(2);
        });
    });
});