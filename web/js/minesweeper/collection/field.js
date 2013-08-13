define(['backbone','../model/field'], function (Backbone, FieldModel) {
    return Backbone.Collection.extend({
        model: FieldModel
    })
});