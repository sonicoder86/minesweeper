define(['backbone', '../model/field', '../collection/field', 'underscore'], function (Backbone, FieldModel, FieldCollection, _) {
    return Backbone.Model.extend({
        fieldsCollection: null,
        fieldsArray: null,

        defaults: {
            size: 3,
            bombs: 1
        },

        initialize: function()
        {
            this.fieldsCollection = new FieldCollection();
            this.fieldsArray = [];

            this.generateFields();
            this.placeBombs();
        },

        getFields: function()
        {
            return this.fieldsCollection;
        },

        generateFields: function()
        {
            var size = this.get('size');

            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    var field = new FieldModel({x: i, y: j});

                    if (!this.fieldsArray[i]) {
                        this.fieldsArray[i] = [];
                    }
                    this.fieldsArray[i][j] = field;

                    this.fieldsCollection.add(field);
                }
            }
        },

        placeBombs: function()
        {
            var size = this.get('size'),
                bombs = this.get('bombs');

            for (var i = 0; i < bombs;) {
                var randomX = Math.floor(Math.random() * (size));
                var randomY = Math.floor(Math.random() * (size));

                var field = this.fieldsArray[randomX][randomY];
                if (field.get('isBomb')) {
                    continue;
                }

                field.set('isBomb', true);
                i++;

                this.getNeighbours(field).forEach(function(neighbour) {
                    neighbour.set('bombsNear', neighbour.get('bombsNear') + 1)
                }, this);
            }
        },

        getField: function(x, y)
        {
            if (!this.fieldsArray[x]) {
                return;
            }

            return this.fieldsArray[x][y];
        },

        getNeighbours: function(field)
        {
            var neighbours = new FieldCollection(),
                neighbour = null,
                possibleNeighbours = field.getPossibleNeighbours();

            _.forEach(possibleNeighbours, function(possibleNeighbour) {
                if (neighbour = this.getField(possibleNeighbour.x, possibleNeighbour.y)) {
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

            field.set('isDisplayed', true);
            if (field.get('bombsNear') > 0) {
                return;
            }

            this.getNeighbours(field).forEach(function(neighbourField) {
                this.display(neighbourField)
            }, this)
        },

        getStatus: function()
        {

        }
    })
});