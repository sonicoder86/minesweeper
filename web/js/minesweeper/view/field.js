define(['marionette', 'underscore', 'text!../template/field.html'], function (Marionette, _, html) {
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'pull-left',

        events: {
            'contextmenu .btn': 'disableContextMenu',
            'mousedown .btn': 'triggerDownClick'
        },

        disableContextMenu: function(e) {
            e.preventDefault();
        },

        triggerDownClick: function(e) {
            e.preventDefault();
            switch (event.which) {
                case 1:
                    this.model.display();
                    break;
                case 2:
                    break;
                case 3:
                    this.model.flag();
                    break;
                default:
                    alert('You have a strange mouse');
            }
            this.model.trigger('reset');
        },

        serializeData: function() {
            var displayStatus = this.model.getDisplayStatus();

            return {
                displayText : displayStatus == '' ? '&nbsp;&nbsp;' : displayStatus
            }
        }
    })
});