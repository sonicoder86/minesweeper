define(['marionette', 'underscore', 'text!../template/menu.html', './gametype'], function (Marionette, _, html, GameTypeView) {
    return Marionette.CompositeView.extend({
        template: _.template(html),
        tagName: 'ul',
        className: 'nav navbar-nav',
        itemView: GameTypeView,
        itemViewContainer: '#game-type-list',

        initialize: function()
        {
            this.listenTo(this, 'itemview:new_game', function(gameTypeView) {
                this.trigger('new_game', gameTypeView.model);
            });
        }
    })
});