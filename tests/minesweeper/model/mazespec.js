define(['minesweeper/model/maze'], function(MazeModel) {
    var maze;

    describe('Maze model', function() {
        beforeEach(function() {

        });

        it('should have 9 fields with size 3', function() {
            maze = new MazeModel({size: 3});

            expect(maze.getFields().length).toEqual(9);
        });

        it('should have 1 bomb field when given 1 bombs', function() {
            maze = new MazeModel({size: 3, bombs: 1});
            var fieldsWithBomb = maze.getFields().where({isBomb: true});

            expect(fieldsWithBomb.length).toEqual(1);
        });

        it('fields next to a bombed field should know the count of bombs in the vicinity', function() {
            spyOn(Math, 'random').andReturn(0);

            maze = new MazeModel({size: 3, bombs: 1});

            expect(maze.getField(1, 1).get('bombsNear')).toEqual(1);
            expect(maze.getField(0, 1).get('bombsNear')).toEqual(1);
            expect(maze.getField(1, 0).get('bombsNear')).toEqual(1);
        });

        it('should return existing neighbours of field', function() {
            maze = new MazeModel({size: 3, bombs: 1});

            var neighbours = maze.getNeighbours(0, 0);

            expect(neighbours.length).toEqual(3);

            expect(neighbours).toContain(maze.getField(0, 1));
            expect(neighbours).toContain(maze.getField(1, 0));
            expect(neighbours).toContain(maze.getField(1, 1));
        });
    });
});