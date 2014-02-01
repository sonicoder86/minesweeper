define(['backbone'], function (Backbone) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            sizeX: 3,
            sizeY: 3,
            bombs: 1,
            isRemote: false
        }
    });
});