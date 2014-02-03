define(['marionette', 'underscore', 'text!../template/status.html'], function (Marionette, _, html) {
    "use strict";
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'status-wrapper',

        ui: {
            statusContainer: '#statusContainer',
            flagsContainer: '#flagsContainer',
            percentContainer: '#percentContainer'
        },

        onShow: function() {
            this.listenTo(this.model, 'generate', this.render);
            this.listenTo(this.model, 'calculate', this.render);
            this.listenTo(this.model, 'change:status', this.render);
        },

        serializeData: function ()
        {
            var maze = this.model.maze,
                modelProperties = this.model.toJSON();

            modelProperties.flagsLeft = maze.getFlagsLeft();
            modelProperties.percentCompleted = maze.getCompletePercent();

            return modelProperties;
        }
    });
});
