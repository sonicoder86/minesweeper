define(['marionette', 'underscore', 'text!../template/field.html'], function (Marionette, _, html) {
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'pull-left',

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
                case 2:
                    break;
                case 3:
                    this.model.flag();
                    break;
                default:
                    alert('You have a strange mouse');
            }
        },

        serializeData: function()
        {
            var displayStatus = this.model.getDisplayStatus();

            return {
                displayText : displayStatus == '' ? '&nbsp;&nbsp;' : displayStatus
            }
        },

        onRender: function()
        {
            if (this.model.get('isDisplayed')) {
                this.$('.btn').addClass('active')
            }
        }
    })
});