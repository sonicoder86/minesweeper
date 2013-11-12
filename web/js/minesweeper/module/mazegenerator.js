define(['../collection/field', '../model/field', '../model/maze', 'socketio'], function (FieldCollection, FieldModel, MazeModel, SocketIO) {
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper, Backbone, Marionette, $, _) {
            MazeGenerator.maze = new MazeModel();

            Minesweeper.reqres.setHandler("maze:generate", function(size, bombs) {
                MazeGenerator.maze.set({size: size, bombs: bombs});
                MazeGenerator.maze.generate();
                return MazeGenerator.maze;
            });
        });
    };
});
