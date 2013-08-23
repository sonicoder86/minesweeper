define(['marionette', './field', 'underscore', 'text!../template/maze.html'], function (Marionette, fieldView, _, html) {
    return Marionette.CompositeView.extend({
        itemView: fieldView,
        template: _.template(html),
        className: 'row',
        itemViewContainer: '.js-minesweeper'
    })
});
