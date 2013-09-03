define(['marionette', '../view/maze'], function (Marionette, MazeView) {
    return function(application) {
        application.module('Game', function(Game, Minesweeper, Backbone, Marionette, $, _) {
            var fields = application.request('maze:generateFields', 9, 15);

            var maze = new MazeView({collection: fields});
            maze.on('itemview:display', function(view) {
                application.request('maze:display', view.model);
            });

            Minesweeper.mainRegion.show(maze);
        });
    };
});
