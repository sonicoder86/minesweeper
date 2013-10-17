define(['minesweeper/application', 'minesweeper/module/game', 'minesweeper/collection/field', 'minesweeper/model/maze'],
    function(application, GameModuleSetup, FieldCollection, MazeModel)
{
    var fields, maze, status = 'in_progress';

    beforeEach(function() {
        fields = new FieldCollection();
        maze = new MazeModel({size: 3, bombs: 1});
        maze.generate();

        application.reqres.setHandler("maze:generate", function(size, bombs) {
            return maze;
        });
    });

    afterEach(function() {
        application.reqres.removeHandler("maze:generate");
    });

    describe('GameModule', function() {

    });
});
