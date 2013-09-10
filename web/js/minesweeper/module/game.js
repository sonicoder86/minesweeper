define(['marionette', '../view/maze', '../view/status'], function (Marionette, MazeView, StatusView) {
    return function(application) {
        application.module('Game', function(Game, Minesweeper, Backbone, Marionette, $, _) {
            var fields = Minesweeper.request('maze:generateFields', 9, 15);

            var maze = new MazeView({collection: fields});
            maze.on('itemview:display', function(view) {
                application.request('maze:display', view.model);
            });
            maze.on('itemview:flag', function(view) {
                application.request('maze:flag', view.model);
            });

            var status = new StatusView();
            status.status = Minesweeper.request('maze:status');
            fields.on('change', function() {
                status.status = Minesweeper.request('maze:status');
                status.render();
            });

            Minesweeper.mainRegion.show(maze);
            Minesweeper.statusRegion.show(status);
        });
    };
});
