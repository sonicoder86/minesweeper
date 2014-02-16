define(['marionette', 'underscore', 'text!../template/field.html'], function (Marionette, _, html) {
    "use strict";
    return Marionette.ItemView.extend({
        template: _.template(html),

        render: function() {
            this.$el.addClass('field btn btn-default')
                .attr('id', this.model.get('x') + '-' + this.model.get('y'));

            this.trigger('render');
        }
    });
});