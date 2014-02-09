define(['marionette', 'underscore', 'text!../template/timer.html', '../event'], function (Marionette, _, html, Events) {
    "use strict";
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'status-wrapper',

        events: {
            'click .happiness': 'triggerRestart'
        },

        initialize: function(options) {
            this.game = options.game;

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.game, 'change:status', this.render);
        },

        triggerRestart: function() {
            Events.trigger('restart');
        },

        serializeData: function() {
            return {
                time: this.model.format(),
                isHappy: this.game.isPlayable()
            };
        }
    });
});
