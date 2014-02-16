define(
    ['backbone', '../model/field', '../collection/field', 'underscore', '../util/math'],
    function (Backbone, FieldModel, FieldCollection, _, Math
) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            sizeX: 3,
            sizeY: 3,
            bombs: 1
        },

        initialize: function()
        {
            this.resetCache();
            this.set({fields: new FieldCollection()}, {silent: true});
        },

        resetCache: function() {
            this.fieldsCache = {};
        },

        generate: function()
        {
            this.resetCache();
            this.generateFields();
            this.placeBombs();
        },

        buildCache: function() {
            this.resetCache();

            this.getFields().forEach(function(field) {
                this.fieldsCache[field.attributes.x+'-'+field.attributes.y] = field;
            }, this);
        },

        getFields: function()
        {
            return this.get('fields');
        },

        generateFields: function()
        {
            var fields = [],
                i, j, field;

            for (i = 0; i < this.attributes.sizeX; i += 1) {
                for (j = 0; j < this.attributes.sizeY; j += 1) {
                    field = new FieldModel({x: i, y: j});

                    fields.push(field);
                    this.fieldsCache[field.attributes.x+'-'+field.attributes.y] = field;
                }
            }

            this.getFields().reset(fields);
        },

        placeBombs: function()
        {
            var bombs = this.attributes.bombs,
                i, field;

            for (i = 0; i < bombs;) {
                field = this.getRandomField();

                if (field.attributes.isBomb) {
                    continue;
                }

                field.attributes.isBomb = true;
                i += 1;

                this.getNeighbours(field).forEach(function(neighbour) {
                    this.incrementBombsNear(neighbour);
                }, this);
                this.incrementBombsNear(field);
            }
        },

        incrementBombsNear: function(field) {
            field.attributes.bombsNear += 1;
        },

        getRandomField: function()
        {
            var randomX = Math.floor(Math.random() * this.attributes.sizeX),
                randomY = Math.floor(Math.random() * this.attributes.sizeY);
            return this.getField(randomX, randomY);
        },

        getField: function(x, y)
        {
            return this.fieldsCache[x+'-'+y];
        },

        getNeighbours: function(field)
        {
            var neighbours = [],
                possibleNeighbours = field.getPossibleNeighbours();

            possibleNeighbours.forEach(function(possibleNeighbour) {
                var neighbour = this.getField(possibleNeighbour.x, possibleNeighbour.y);
                if (neighbour) {
                    neighbours.push(neighbour);
                }
            }, this);

            return neighbours;
        },

        display: function(field)
        {
            if (field.get('isDisplayed')) {
                return;
            }

            field.display();
            if (field.get('bombsNear') > 0) {
                return;
            }

            this.getNeighbours(field).forEach(function(neighbourField) {
                this.display(neighbourField);
            }, this);
        },

        flag: function(field)
        {
            field.flag();
        },

        anyBombDisplayed: function()
        {
            return this.getFields().where({isBomb: true, isFlagged: false, isDisplayed: true}).length > 0;
        },

        allBombsFlagged: function()
        {
            return this.getFields().where({isBomb: true, isFlagged: true}).length === this.get('bombs');
        },

        allFieldsDisplayed: function()
        {
            return this.getFields().where({isDisplayed: true}).length === this.getSizeCount();
        },

        getCompletePercent: function()
        {
            return Math.round(this.getFields().where({isDisplayed: true}).length / this.getSizeCount() * 100);
        },

        getFlagsLeft: function ()
        {
            return this.get('bombs') - this.getFields().where({isFlagged: true}).length;
        },

        toJSON: function()
        {
            var json = Backbone.Model.prototype.toJSON.apply(this);
            json.fields = json.fields.toJSON();

            return json;
        },

        fromJSON: function(json)
        {
            this.set({sizeX: json.sizeX, sizeY: json.sizeY, bombs: json.bombs});
            this.getFields().reset(json.fields);
            this.buildCache();
        },

        getSizeCount: function() {
            return this.get('sizeX') * this.get('sizeY');
        }
    });
});