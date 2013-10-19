define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            size: 0,
            bombs: 0
        }
    })
});