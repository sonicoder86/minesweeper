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
    });
});