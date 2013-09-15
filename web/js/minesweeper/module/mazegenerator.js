define(['marionette', '../collection/field', '../model/field', '../model/maze'], function (Marionette, FieldCollection, FieldModel, MazeModel) {
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper, Backbone, Marionette, $, _) {
            MazeGenerator.maze = new MazeModel();

            Minesweeper.reqres.setHandler("maze:generateFields", function(size, bombs) {
                MazeGenerator.maze.set({size: size, bombs: bombs});
                MazeGenerator.maze.generate();
                return MazeGenerator.maze.getFields();
            });

            Minesweeper.reqres.setHandler("maze:display", function(field) {
                return MazeGenerator.maze.display(field);
            });

            Minesweeper.reqres.setHandler("maze:flag", function(field) {
                return MazeGenerator.maze.flag(field);
            });

            Minesweeper.reqres.setHandler("maze:status", function() {
                return MazeGenerator.maze.getStatus();
            });
        });
    };
});
