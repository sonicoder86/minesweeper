define(['backbone','../model/gametype'], function (Backbone, GameTypeModel) {
    return Backbone.Collection.extend({
        model: GameTypeModel
    })
});