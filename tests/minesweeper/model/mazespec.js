var testDefine = typeof window === 'undefined' ? requirejs : define;
testDefine(['minesweeper/model/maze', 'minesweeper/util/math'], function(MazeModel, Math) {
    "use strict";
    var maze,
    getFieldWithoutBomb = function() {
        return maze.getFields().findWhere({isBomb: false, isDisplayed: false});
    };

    describe('Maze model', function() {
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
            });

            it('should create 2 fields in a row when size is 2', function() {
                maze.set('size', 2);
                maze.generate();

                expect(maze.getField(0, 0)).toBeTruthy();
                expect(maze.getField(0, 1)).toBeTruthy();

                expect(maze.getField(0, 2)).toBeNull();
            });

            it('should create 2 fields in a column when size is 2', function() {
                maze.set('size', 2);
                maze.generate();

                expect(maze.getField(0, 0)).toBeTruthy();
                expect(maze.getField(1, 0)).toBeTruthy();

                expect(maze.getField(2, 0)).toBeNull();
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
                expect(maze.getField(0, 0).get('bombsNear')).toEqual(1);
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

                maze.display(field);

                expect(field.get('isDisplayed')).toBe(true);
            });
        });

        describe('flag', function() {

        });

        describe('getCompletePercent', function() {
            it('should return percent of displayed fields', function() {
                maze.generate();

                getFieldWithoutBomb().display();
                getFieldWithoutBomb().display();
                getFieldWithoutBomb().display();

                expect(maze.getCompletePercent()).toEqual(33);
            });
        });

        describe('getFlagsLeft', function() {
            it('should return difference between fields with bomb and flagged fields', function() {
                maze.generate();

                getFieldWithoutBomb().display();
                getFieldWithoutBomb().flag();

                expect(maze.getFlagsLeft()).toEqual(0);
            });
        });

        describe('JSON', function() {
            it('should return fields also in JSON format', function() {
                maze.generate();

                var json = maze.toJSON();

                expect(json.fields.length).toEqual(9);
                expect(json.fields.models).toBeUndefined();
            });

            it('should load size from JSON', function() {
                maze.generate();

                var json = {size: 2, bombs: 1, fields: []};

                maze.fromJSON(json);

                expect(maze.get('size')).toEqual(2);
                expect(maze.get('bombs')).toEqual(1);
            });

            it('should load fields from JSON', function() {
                maze.generate();

                var json = {size: 2, bombs: 1, fields: [{}, {}]};

                maze.fromJSON(json);

                expect(maze.getFields().length).toEqual(2);
            });
        });
    });
});