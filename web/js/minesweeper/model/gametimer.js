define(['backbone', 'underscore', './timer'], function (Backbone, _, TimerModel) {
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

            this.listenTo(this.game, 'display, flag', function() {
                this.timer.start();
            });

            this.listenTo(this.game, 'generate', function() {
                this.timer.reset();
            });
        }
    });
});