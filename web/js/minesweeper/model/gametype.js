define(['backbone'], function (Backbone) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            size: 0,
            bombs: 0,
            isRemote: false
        }
    });
});