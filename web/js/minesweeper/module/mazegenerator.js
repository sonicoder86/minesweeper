define(['marionette', '../collection/field', '../model/field'], function (Marionette, FieldCollection, FieldModel) {
    return function(application) {
        application.module('Maze.Generator', function(MazeGenerator, Minesweeper, Backbone, Marionette, $, _) {
            var API = {
                fieldsCollection: null,
                fieldsArray: [],

                getMazeFields: function(mazeSize, bombs) {
                    if (!this.fieldsCollection) {
                        this.generateFields(mazeSize);
                        this.placeBombs(mazeSize, bombs);
                    }

                    return this.fieldsCollection;
                },

                generateFields: function(mazeSize) {
                    this.fieldsCollection = new FieldCollection();

                    var field;
                    for (var i = 0; i < mazeSize; i++) {
                        for (var j = 0; j < mazeSize; j++) {
                            field = new FieldModel({x: i, y: j});

                            if (!this.fieldsArray[i]) {
                                this.fieldsArray[i] = [];
                            }
                            this.fieldsArray[i][j] = field;

                            this.fieldsCollection.add(field);
                        }
                    }
                },

                placeBombs: function(mazeSize, bombs) {
                    for (var i = 0; i < bombs; i++) {
                        var randomX = Math.floor(Math.random() * (mazeSize));
                        var randomY = Math.floor(Math.random() * (mazeSize));

                        var field = this.fieldsArray[randomX][randomY];
                        field.set('isBomb', true);
                        _.forEach(field.getPossibleNeighbours(), function(possibleNeighbour) {
                            if (!this.fieldsArray[possibleNeighbour.x] || !this.fieldsArray[possibleNeighbour.x][possibleNeighbour.y]) {
                                return;
                            }
                            var neighbour = this.fieldsArray[possibleNeighbour.x][possibleNeighbour.y];

                            neighbour.set('bombsNear', neighbour.get('bombsNear') + 1)
                        }, this);
                    }
                },

                get: function(x, y) {
                    return this.fieldsArray[x][y];
                }
            };

            Minesweeper.reqres.setHandler("maze:getFields", function(mazeSize, bombs) {
                return API.getMazeFields(mazeSize, bombs);
            });

            Minesweeper.reqres.setHandler("maze:get", function(x, y) {
                return API.get(x, y);
            });
        });
    };
});
