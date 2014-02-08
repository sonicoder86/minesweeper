define(['marionette', 'underscore', 'text!../template/timer.html'], function (Marionette, _, html) {
    "use strict";
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'status-wrapper',

        initialize: function(options) {
            this.game = options.game;

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.game, 'change:status', this.render);
        },

        serializeData: function() {
            return {
                time: this.model.format(),
                isHappy: this.game.isPlayable()
            };
        }
    });
});
