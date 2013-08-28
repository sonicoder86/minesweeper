define(['marionette', '../collection/field', '../model/field', '../model/maze'], function (Marionette, FieldCollection, FieldModel, MazeModel) {
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper, Backbone, Marionette, $, _) {
            Minesweeper.reqres.setHandler("maze:generateFields", function(size, bombs) {
                MazeGenerator.maze = new MazeModel({size: size, bombs: bombs});
                return MazeGenerator.maze.getFields();
            });

            Minesweeper.reqres.setHandler("maze:get", function(x, y) {
                return MazeGenerator.maze.getField(x, y);
            });
        });
    };
});
