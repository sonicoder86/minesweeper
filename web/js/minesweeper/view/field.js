define(['marionette', 'underscore', 'text!../template/field.html'], function (Marionette, _, html) {
    "use strict";
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'field',

        events: {
            'contextmenu .btn': 'disableContextMenu',
            'mousedown .btn': 'triggerDownClick'
        },

        initialize: function()
        {
            this.listenTo(this.model, 'change:isDisplayed', this.render);
        },

        disableContextMenu: function(e)
        {
            e.preventDefault();
        },

        triggerDownClick: function(e)
        {
            switch (e.which) {
                case 1:
                    this.trigger('display');
                    break;
                case 3:
                    this.trigger('flag');
                    break;
                default:
                    break;
            }
        },

        serializeData: function() {
            var displayStatus = this.model.getDisplayStatus();

            if (displayStatus === "B") {
                displayStatus = '<i class="icon-bomb"></i>';
            } else if (displayStatus === "F") {
                displayStatus = '<i class="fa fa-flag"></i>';
            }

            return {
                displayText: displayStatus === '' ? '&nbsp;&nbsp;' : displayStatus
            };
        },

        onRender: function() {
            if (this.model.get('isDisplayed')) {
                setTimeout(_.bind(function() {
                    this.$('.btn').addClass('active');
                }, this), 1);
            }
        }
    });
});