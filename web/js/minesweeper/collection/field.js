define(['backbone','../model/field'], function (Backbone, FieldModel) {
    "use strict";
    return Backbone.Collection.extend({
        model: FieldModel
    });
});