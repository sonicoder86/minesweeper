define(['marionette', '../view/maze', '../view/status'], function (Marionette, MazeView, StatusView) {
    return function(application) {
        application.module('Game', function(Game, Minesweeper, Backbone, Marionette, $, _) {
            var maze = Minesweeper.request('maze:generate', 9, 15);

            Game.mazeView = new MazeView({collection: maze.getFields()});
            Game.mazeView.on('itemview:display', function(view) {
                maze.display(view.model);
            });
            Game.mazeView.on('itemview:flag', function(view) {
                maze.flag(view.model);
            });

            var status = new StatusView();
            status.status = maze.calculateStatus();
            maze.getFields().on('change', function() {
                status.status = maze.calculateStatus();
                status.render();
            });

            Game.on('start', function() {
                Minesweeper.mainRegion.show(Game.mazeView);
                Minesweeper.statusRegion.show(status);
            });
        });
    };
});
