define(['marionette', 'underscore', 'text!../template/status.html'], function (Marionette, _, html) {
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'btn btn-primary',

        serializeData: function()
        {
            return {
                status: this.status
            }
        }
    })
});
