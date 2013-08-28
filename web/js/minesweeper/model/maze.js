define(['backbone', '../model/field', '../collection/field'], function (Backbone, FieldModel, FieldCollection) {
    return Backbone.Model.extend({
        fieldsCollection: null,
        fieldsArray: [],

        defaults: {
            size: 3,
            bombs: 1
        },

        initialize: function()
        {
            this.fieldsCollection = new FieldCollection();

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
            var size = this.get('size');
            var bombs = this.get('bombs');

            for (var i = 0; i < bombs;) {
                var randomX = Math.floor(Math.random() * (size));
                var randomY = Math.floor(Math.random() * (size));

                var field = this.fieldsArray[randomX][randomY];
                if (field.get('isBomb')) {
                    continue;
                }

                field.set('isBomb', true);
                i++;

                _.forEach(field.getPossibleNeighbours(), function(possibleNeighbour) {
                    if (!this.fieldsArray[possibleNeighbour.x] || !this.fieldsArray[possibleNeighbour.x][possibleNeighbour.y]) {
                        return;
                    }
                    var neighbour = this.fieldsArray[possibleNeighbour.x][possibleNeighbour.y];

                    neighbour.set('bombsNear', neighbour.get('bombsNear') + 1)
                }, this);
            }
        },

        getField: function(x, y)
        {
            return this.fieldsArray[x][y];
        }
    })
});