define(
    ['marionette', 'underscore', 'text!../template/menu.html', './gametype', 'bootstrap'],
    function (Marionette, _, html, GameTypeView)
{
    "use strict";
    return Marionette.CompositeView.extend({
        template: _.template(html),
        tagName: 'ul',
        className: 'nav navbar-nav',
        childView: GameTypeView,
        childViewContainer: '#game-type-list',

        initialize: function()
        {
            this.listenTo(this, 'childview:new_game', function(gameTypeView) {
                this.trigger('new_game', gameTypeView.model);
                this.$('.dropdown-menu').dropdown('toggle');
            });
        }
    });
});