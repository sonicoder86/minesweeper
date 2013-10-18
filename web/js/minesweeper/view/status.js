define(['marionette', 'underscore', 'text!../template/status.html'], function (Marionette, _, html) {
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'btn btn-primary',

        ui: {
            statusContainer: '#statusContainer'
        },

        initialize: function()
        {
            this.listenTo(this.model, 'change:status', this.render);
        }
    })
});
