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

        initialize: function()
        {
            this.listenTo(this.model, 'change:status', this.render);
            this.listenTo(this.model.getFields(), 'change', this.render);
        },

        serializeData: function ()
        {
            var modelProperties = this.model.toJSON();
            modelProperties.flagsLeft = this.model.getFlagsLeft();
            modelProperties.percentCompleted = this.model.getCompletePercent();

            return modelProperties;
        }
    });
});
