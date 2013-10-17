define(['backbone', '../model/field', '../collection/field', 'underscore', '../util/math'], function (Backbone, FieldModel, FieldCollection, _, Math) {
    return Backbone.Model.extend({
        fieldsCollection: null,
        fieldsArray: null,

        defaults: {
            size: 3,
            bombs: 1,
            status: 'in_progress'
        },

        initialize: function()
        {
            this.fieldsCollection = new FieldCollection();
            this.fieldsArray = [];
        },

        generate: function()
        {
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

            var fields = [];
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    var field = new FieldModel({x: i, y: j});

                    if (!this.fieldsArray[i]) {
                        this.fieldsArray[i] = [];
                    }

                    this.fieldsArray[i][j] = field;
                    fields.push(field);
                }
            }

            this.fieldsCollection.reset(fields);
        },

        placeBombs: function()
        {
            var size = this.get('size'),
                bombs = this.get('bombs');

            for (var i = 0; i < bombs;) {
                var randomX = Math.floor(Math.random() * (size));
                var randomY = Math.floor(Math.random() * (size));

                var field = this.fieldsArray[randomX][randomY];
                if (field.get('isBomb'))  continue;

                field.set('isBomb', true);
                i++;

                this.getNeighbours(field).forEach(function(neighbour) {
                    neighbour.set('bombsNear', neighbour.get('bombsNear') + 1)
                }, this);
            }
        },

        getField: function(x, y)
        {
            if (!this.fieldsArray[x]) return;

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
            if (this.calculateStatus() == 'defeat') return;

            if (field.get('isDisplayed')) return;

            field.display();
            if (field.get('bombsNear') > 0) return;

            this.getNeighbours(field).forEach(function(neighbourField) {
                this.display(neighbourField)
            }, this)
        },

        flag: function(field)
        {
            if (this.calculateStatus() == 'defeat') return;

            field.flag();
        },

        calculateStatus: function()
        {
            var status = 'in_progress';
            if (this.fieldsCollection.where({isBomb: true, isFlagged: false, isDisplayed: true}).length > 0) {
                status = 'defeat';
            }

            if (this.fieldsCollection.where({isBomb: true, isFlagged: true}).length == this.get('bombs')
                && this.fieldsCollection.where({isDisplayed: true}).length == this.get('size') * this.get('size')) {
                status = 'victory';
            }

            this.set('status', status);
            return status;
        }
    })
});