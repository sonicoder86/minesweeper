define(['backbone', 'underscore', './timer', '../event'], function (Backbone, _, TimerModel, Event) {
    "use strict";
    return Backbone.Model.extend({
        initialize: function(options) {
            this.game = options.game;
            this.timer = new TimerModel();

            this.bindEventListeners();
        },

        bindEventListeners: function() {
            this.listenTo(this.game, 'change:status', function(game, status) {
                if (status === 'in_progress') {
                    return;
                }

                this.timer.stop();
            });

            this.listenTo(this.game, 'flag', function() {
                if (!this.game.isPlayable()) {
                    return;
                }

                this.timer.start();
            });

            this.listenTo(this.game, 'display', function() {
                if (!this.game.isPlayable()) {
                    return;
                }

                this.timer.start();
            });

            this.listenTo(Event, 'timer:start', function() {
                if (!this.game.isPlayable()) {
                    return;
                }

                this.timer.start();
            });

            this.listenTo(this.game, 'generate', function() {
                this.timer.reset();
            });
        }
    });
});