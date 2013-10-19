define(['marionette', 'underscore', 'text!../template/menu.html', './gametype'], function (Marionette, _, html, GameTypeView) {
    return Marionette.CompositeView.extend({
        template: _.template(html),
        tagName: 'ul',
        className: 'nav navbar-nav',
        itemView: GameTypeView,
        itemViewContainer: '#game-type-list'
    })
});