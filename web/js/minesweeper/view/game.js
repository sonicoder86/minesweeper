define(['marionette', 'underscore', 'text!../template/game.html', './maze', './status', './waiting', './timer'],
function (Marionette, _, html, MazeView, StatusView, WaitingView, TimerView) {
    "use strict";
    return Marionette.Layout.extend({
        template: _.template(html),

        initializeGame: function(game, gameTimer) {
            this.model = game;
            this.timer = gameTimer;

            this.listenTo(this.model, 'change:status', function(model, status) {
                if (status === 'waiting') {
                    this.statusRegion.show(new WaitingView());
                }

                if (status === 'in_progress' && model.previous('status') === 'waiting') {
                    this.statusRegion.show(this.statusView);
                }
            });

            this.createMaze();
            this.statusView = new StatusView({model: this.model});
            this.timerView = new TimerView({model: gameTimer.timer, game: game});
        },

        createMaze: function() {
            this.mazeView = new MazeView({
                maze: this.model.maze,
                collection: this.model.maze.getFields()
            });

            this.listenTo(this.mazeView, 'display', function(model) {
                this.model.display(model);
            });
            this.listenTo(this.mazeView, 'flag', function(model) {
                this.model.flag(model);
            });
        },

        regions: {
            timerRegion: '#timer-region',
            mainRegion: '#main-region',
            statusRegion: '#status-region'
        },

        onRender: function()
        {
            this.listenTo(this.mainRegion, 'show', this.setMainRegionWidth);
            this.listenTo(this.model.maze.get('fields'), 'reset', this.setMainRegionWidth);

            this.mainRegion.show(this.mazeView);
            this.statusRegion.show(this.statusView);
            this.timerRegion.show(this.timerView);
        },

        setMainRegionWidth: function()
        {
            this.mainRegion.$el.css(
                'width',
                this.model.maze.get('sizeY') * (40 + 2) + 2 * 30
            );
        }
    });
});