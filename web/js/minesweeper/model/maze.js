define(
    ['backbone', '../model/field', '../collection/field', 'underscore', '../util/math'],
    function (Backbone, FieldModel, FieldCollection, _, Math
) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            size: 3,
            bombs: 1
        },

        initialize: function()
        {
            this.set({fields: new FieldCollection()}, {silent: true});
        },

        generate: function()
        {
            this.generateFields();
            this.placeBombs();
        },

        getFields: function()
        {
            return this.get('fields');
        },

        generateFields: function()
        {
            var size = this.get('size'),
                fields = [],
                i, j, field;

            for (i = 0; i < size; i += 1) {
                for (j = 0; j < size; j += 1) {
                    field = new FieldModel({x: i, y: j});

                    fields.push(field);
                }
            }

            this.getFields().reset(fields);
        },

        placeBombs: function()
        {
            var bombs = this.get('bombs'),
                i, field;

            for (i = 0; i < bombs;) {
                field = this.getRandomField();

                if (field.get('isBomb')) {
                    continue;
                }

                field.set('isBomb', true);
                i += 1;

                this.getNeighbours(field).forEach(function(neighbour) {
                    this.incrementBombsNear(neighbour);
                }, this);
                this.incrementBombsNear(field);
            }
        },

        incrementBombsNear: function(field) {
            field.set('bombsNear', field.get('bombsNear') + 1);
        },

        getRandomField: function()
        {
            var randomX = Math.floor(Math.random() * (this.get('size'))),
                randomY = Math.floor(Math.random() * (this.get('size')));
            return this.getField(randomX, randomY);
        },

        getField: function(x, y)
        {
            return this.getFields().findWhere({x: x, y: y});
        },

        getNeighbours: function(field)
        {
            var neighbours = new FieldCollection(),
                possibleNeighbours = field.getPossibleNeighbours();

            _.forEach(possibleNeighbours, function(possibleNeighbour) {
                var neighbour = this.getField(possibleNeighbour.x, possibleNeighbour.y);
                if (neighbour) {
                    neighbours.add(neighbour);
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
            return this.getFields().where({isDisplayed: true}).length === this.get('size') * this.get('size');
        },

        getCompletePercent: function()
        {
            var size = this.get('size');

            return Math.round(this.getFields().where({isDisplayed: true}).length / (size * size) * 100);
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
            this.set({size: json.size, bombs: json.bombs});
            this.getFields().reset(json.fields);
        }
    });
});