define(['backbone', './maze'], function (Backbone, Maze) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            size: 3,
            bombs: 1,
            status: 'in_progress'
        },

        initialize: function()
        {
            this.maze = new Maze();
        },

        generate: function(gameType)
        {
            this.maze.set({size: gameType.get('size'), bombs: gameType.get('bombs')});
            this.maze.generate();
        }
    });
});