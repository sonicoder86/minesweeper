define(['backbone', 'underscore', '../util/pad'], function (Backbone, _, pad) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            counter: 0
        },

        start: function() {
            if (this.intervalId) {
                return;
            }

            this.intervalId = setInterval(_.bind(this.increment, this), 1000);
        },

        increment: function() {
            this.set('counter', this.get('counter') + 1);
            console.log(this.get('counter'));
        },

        stop: function() {
            clearInterval(this.intervalId);
            delete this.intervalId;
        },

        reset: function() {
            this.stop();
            this.set('counter', 0);
        },

        format: function() {
            var minutes = Math.floor(this.get('counter') / 60),
                seconds = this.get('counter') % 60;

            return pad(minutes, 2)+':'+pad(seconds, 2);
        }
    });
});