define(['backbone', './maze'], function (Backbone, Maze) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            status: 'in_progress',
            type: 'local'
        },

        initialize: function()
        {
            this.maze = new Maze();

            this.listenTo(this, 'change:status', this.showRemainingBombs);
        },

        generate: function(gameType)
        {
            this.maze.set(gameType.getMazeFields());
            this.set('type', gameType.get('isRemote') ? 'remote' : 'local');

            this.maze.generate();

            this.set('status', 'in_progress');
            this.trigger('generate');
        },

        generateFromJSON: function(json)
        {
            this.maze.fromJSON(json);
            this.set('status', 'in_progress');
            this.set('type', 'remote');
            this.trigger('generate');
        },

        calculateStatus: function()
        {
            var status = 'in_progress';
            if (this.maze.anyBombDisplayed()) {
                status = 'defeat';
            }

            if (this.maze.allBombsFlagged() && this.maze.allFieldsDisplayed()) {
                status = 'victory';
            }

            this.set('status', status);
            this.trigger('calculate');
        },

        showRemainingBombs: function() {
            if (this.isPlayable()) {
                return;
            }

            this.maze.getFields().where({isBomb: true, isDisplayed: false}).forEach(function(field) {
                field.display();
            });
        },

        display: function(field)
        {
            if (!this.isPlayable()) {
                return;
            }

            this.maze.display(field);
            this.calculateStatus();
            this.trigger('display', field);
        },

        displayRemote: function(field) {
            this.maze.display(
                this.maze.getField(field.x, field.y)
            );
            this.calculateStatus();
        },

        flag: function(field)
        {
            if (!this.isPlayable()) {
                return;
            }

            this.maze.flag(field);
            this.calculateStatus();
            this.trigger('flag', field);
        },

        flagRemote: function(field) {
            this.maze.flag(
                this.maze.getField(field.x, field.y)
            );
            this.calculateStatus();
        },

        isPlayable: function()
        {
            return this.get('status') !== 'defeat';
        }
    });
});