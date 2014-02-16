define(
    ['marionette', 'jquery', 'underscore', 'text!../template/field.html'],
    function (Marionette, $, _, fieldHtml)
{
    "use strict";
    var fieldTemplate = _.template(fieldHtml);

    return Marionette.CollectionView.extend({
        className: 'row',

        initialize: function(options) {
            this.maze = options.maze;
            this.listenTo(options.collection, 'change:isDisplayed', this.update);
        },

        events: {
            'contextmenu': 'disableContextMenu',
            'mousedown .btn': 'triggerDownClick'
        },

        disableContextMenu: function(e)
        {
            e.preventDefault();
        },

        triggerDownClick: function(e)
        {
            var $target = $(e.currentTarget),
                id = $target.attr('id'),
                parts = id.split('-'),
                x = parseInt(parts[0], 10),
                y = parseInt(parts[1], 10),
                field;

            if (!_.isNumber(x) || !_.isNumber(y)) {
                return;
            }

            field = this.maze.getField(x, y);
            switch (e.which) {
                case 1:
                    this.trigger('display', field);
                    break;
                case 3:
                    this.trigger('flag', field);
                    break;
                default:
                    break;
            }
        },

        update: function(field) {
            var $field = this.$el.find('#'+field.get('x')+'-'+field.get('y'));

            $field.html(this.getDisplayText(field));
            if (field.get('isDisplayed') && !field.get('isFlagged')) {
                $field.addClass('active');
            }
            else {
                $field.removeClass('active');
            }
        },

        getDisplayText: function(model) {
            var displayStatus = model.getDisplayStatus();

            if (displayStatus === "B") {
                displayStatus = '<i class="icon-bomb"></i>';
            } else if (displayStatus === "F") {
                displayStatus = '<i class="fa fa-flag"></i>';
            }

            return (displayStatus === '' ? '&nbsp;&nbsp;' : displayStatus);
        },

        render: function() {
            var generatedHtml = '';

            this.collection.forEach(function(field) {
                generatedHtml += fieldTemplate(field.attributes);
            }, this);

            this.$el.html(generatedHtml);
            this.trigger('render');
        }
    });
});
