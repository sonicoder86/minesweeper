define(['minesweeper/application', 'minesweeper/module/mazegenerator'],
function(application, mazeGeneratorSetup)
{
    "use strict";
    beforeEach(function() {
        mazeGeneratorSetup(application);
    });

    afterEach(function() {
        application.reqres.removeHandler("maze:generate");
    });

    describe('MazeGeneratorModule', function() {

    });
});
