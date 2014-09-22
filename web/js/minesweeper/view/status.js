define(['marionette', 'underscore', 'text!../template/status.html'], function (Marionette, _, html) {
    "use strict";
    var statusConversion = {
        victory: 'Victory',
        defeat: 'Defeat'
    };

    /*jshint sub:true */
    statusConversion['in_progress'] = 'In progress';

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
        },

        serializeData: function ()
        {
            var maze = this.model.maze,
                modelProperties = this.model.toJSON();

            modelProperties.flagsLeft = maze.getFlagsLeft();
            modelProperties.percentCompleted = maze.getCompletePercent();
            modelProperties.statusDisplay = statusConversion[modelProperties.status];

            return modelProperties;
        }
    });
});
