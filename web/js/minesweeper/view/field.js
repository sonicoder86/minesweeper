define(['marionette', 'underscore', 'text!../template/field.html'], function (Marionette, _, html) {
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'pull-left',

        events: {
            'click .btn': 'triggerClick'
        },

        serializeData: function() {
            return {
                text: this.model.get('x')+''+this.model.get('y')
            }
        },

        triggerClick: function(e) {
            e.preventDefault();
            this.model.set('status', 'clicked');
            this.model.trigger('reset');
        },

        serializeData: function() {
            return {
                displayText : this.model.get('status') ?
                    this.model.get('isBomb') ?
                        'B' :
                        this.model.get('bombsNear'):
                    '&nbsp;&nbsp;'
            }
        }
    })
});