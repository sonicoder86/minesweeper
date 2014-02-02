define(
    ['marionette', './field'],
    function (Marionette, fieldView
) {
    "use strict";
    return Marionette.CollectionView.extend({
        itemView: fieldView,
        className: 'row'
    });
});
