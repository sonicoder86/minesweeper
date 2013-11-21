define(['backbone','../model/gametype'], function (Backbone, GameTypeModel) {
    "use strict";
    return Backbone.Collection.extend({
        model: GameTypeModel
    });
});