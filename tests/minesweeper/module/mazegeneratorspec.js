define(['minesweeper/application', 'minesweeper/module/mazegenerator'],
function(application, MazeGeneratorSetup)
{
    beforeEach(function() {
        MazeGeneratorSetup(application);
    });

    afterEach(function() {
        application.reqres.removeHandler("maze:generate");
    });

    describe('MazeGeneratorModule', function() {

    });
});
