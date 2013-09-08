define(['marionette', '../collection/field', '../model/field', '../model/maze'], function (Marionette, FieldCollection, FieldModel, MazeModel) {
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper, Backbone, Marionette, $, _) {
            Minesweeper.reqres.setHandler("maze:generateFields", function(size, bombs) {
                MazeGenerator.maze = new MazeModel({size: size, bombs: bombs});
                return MazeGenerator.maze.getFields();
            });

            Minesweeper.reqres.setHandler("maze:display", function(field) {
                return MazeGenerator.maze.display(field);
            });

            Minesweeper.reqres.setHandler("maze:status", function() {
                return MazeGenerator.maze.getStatus();
            });
        });
    };
});
