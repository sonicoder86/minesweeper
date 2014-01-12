define(['marionette', 'underscore', 'text!../template/status.html'], function (Marionette, _, html) {
    "use strict";
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'btn btn-primary',

        ui: {
            statusContainer: '#statusContainer',
            flagsContainer: '#flagsContainer',
            percentContainer: '#percentContainer'
        },

        onShow: function() {
            this.listenTo(this.model, 'change:status', this.render);
            this.listenTo(this.model.maze.getFields(), 'change', this.render);
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
