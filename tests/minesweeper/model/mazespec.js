var testDefine = typeof window === 'undefined' ? requirejs : define;
testDefine(['minesweeper/model/maze', 'minesweeper/util/math'], function(MazeModel, Math) {
    var maze;

    describe('Maze model', function() {
        var markGameAsDefeat = function()
        {
            maze.getFields().findWhere({isBomb: true}).display();
        };

        var getFieldWithoutBomb = function()
        {
            return maze.getFields().findWhere({isBomb: false});
        };

        beforeEach(function() {
            maze = new MazeModel({size: 3, bombs: 1});
        });

        afterEach(function() {
            maze.stopListening();
        });

        describe('generateFields', function() {
            it('should create 9 fields when size is 3', function() {
                maze.generate();

                expect(maze.getFields().length).toEqual(9);
                expect(maze.get('status')).toEqual('in_progress');
            });

            it('should create 2 fields in a row when size is 2', function() {
                maze.set('size', 2);
                maze.generate();

                expect(maze.getField(0, 0)).toBeTruthy();
                expect(maze.getField(0, 1)).toBeTruthy();

                expect(maze.getField(0, 2)).toBeUndefined();
            });

            it('should create 2 fields in a column when size is 2', function() {
                maze.set('size', 2);
                maze.generate();

                expect(maze.getField(0, 0)).toBeTruthy();
                expect(maze.getField(1, 0)).toBeTruthy();

                expect(maze.getField(2, 0)).toBeUndefined();
            });
        });

        describe('placeBombs', function() {
            it('should have 1 bomb field when given 1 bombs', function() {
                maze.generate();
                var fieldsWithBomb = maze.getFields().where({isBomb: true});

                expect(fieldsWithBomb.length).toEqual(1);
            });

            it('fields next to a bombed field should know the count of bombs in the vicinity', function() {
                spyOn(Math, 'random').andReturn(0);
                maze.generate();

                expect(maze.getField(1, 1).get('bombsNear')).toEqual(1);
                expect(maze.getField(0, 1).get('bombsNear')).toEqual(1);
                expect(maze.getField(1, 0).get('bombsNear')).toEqual(1);
            });
        });

        describe('getNeighbours', function() {
            it('should return existing neighbours of field', function() {
                maze.generate();
                var neighbours = maze.getNeighbours(maze.getField(0, 0));

                expect(neighbours.length).toEqual(3);

                expect(neighbours).toContain(maze.getField(0, 1));
                expect(neighbours).toContain(maze.getField(1, 0));
                expect(neighbours).toContain(maze.getField(1, 1));
            });

            it('should not return non existing neighbours', function() {
                maze.generate();
                var neighbours = maze.getNeighbours(maze.getField(0, 0));

                expect(neighbours).not.toContain(maze.getField(-1, -1));
            });
        });

        describe('display', function() {
            it('should reveal neighbour fields recursively when displayed field has no bombs near', function() {
                spyOn(Math, 'random').andReturn(0);
                maze.generate();

                maze.display(maze.getField(2, 2));

                expect(maze.getFields().where({isDisplayed: true}).length).toEqual(8);
            });

            it('should only reveal field itself when bomb(s) are near', function() {
                spyOn(Math, 'random').andReturn(0);
                maze.generate();

                maze.display(maze.getField(0, 1));

                expect(maze.getFields().where({isDisplayed: true}).length).toEqual(1);
            });

            it('should display field when game is in progress', function() {
                maze.generate();

                var field = maze.getField(0, 0);
                spyOn(field, 'display');

                maze.display(field);

                expect(field.display).toHaveBeenCalled();
            });

            it('should not flag field when game is defeated', function() {
                maze.generate();
                markGameAsDefeat();

                var field = getFieldWithoutBomb();
                spyOn(field, 'display');

                maze.display(field);

                expect(field.display).not.toHaveBeenCalled();
            });
        });

        describe('calculateStatus', function() {
            it('should mark game as victory when all bombs are flagged and all fields are displayed', function() {
                maze.generate();
                maze.getFields().forEach(function(field) {
                    field.get('isBomb') ? field.flag() : field.display();
                });

                expect(maze.get('status')).toEqual('victory');
            });

            it('should mark game as defeat when a bomb is displayed and not flagged', function() {
                maze.generate();
                markGameAsDefeat();

                expect(maze.get('status')).toEqual('defeat');
            });

            it('should mark game as in progress when not all the fields are displayed', function() {
                maze.generate();
                getFieldWithoutBomb().display();

                expect(maze.get('status')).toEqual('in_progress');
            });
        });

        describe('flag', function() {
            it('should flag field when game is in progress', function() {
                maze.generate();

                var field = getFieldWithoutBomb();
                spyOn(field, 'flag');

                maze.flag(field);

                expect(field.flag).toHaveBeenCalled();
            });

            it('should not flag field when game is defeated', function() {
                maze.generate();
                markGameAsDefeat();

                var field = getFieldWithoutBomb();
                spyOn(field, 'flag');

                maze.flag(field);

                expect(field.flag).not.toHaveBeenCalled();
            });

            it('should not flag field when field is displayed', function() {
                maze.generate();

                var field = getFieldWithoutBomb();
                spyOn(field, 'flag');
                field.display();

                maze.flag(field);

                expect(field.flag).not.toHaveBeenCalled();
            });
        });
    });
});