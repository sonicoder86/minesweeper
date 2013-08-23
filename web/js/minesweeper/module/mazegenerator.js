define(['marionette', '../collection/field', '../model/field'], function (Marionette, FieldCollection, FieldModel) {
    return function(application) {
        application.module('Maze.Generator', function(MazeGenerator, Minesweeper, Backbone, Marionette, $, _) {
            var API = {
                getMazeFields: function(mazeSize) {
                    if (!MazeGenerator.fieldsCollection) {
                        this.generateFields(mazeSize);
                    }

                    return MazeGenerator.fieldsCollection;
                },

                generateFields: function(mazeSize) {
                    MazeGenerator.fieldsCollection = new FieldCollection();

                    var field;
                    for (var i = 0; i < mazeSize; i++) {

                        for (var j = 0; j < mazeSize; j++) {
                            field = new FieldModel({x: i, y: j});

                            MazeGenerator.fieldsCollection.add(field);
                        }
                    }
                }
            };

            Minesweeper.reqres.setHandler("maze:getFields", function(mazeSize) {
                return API.getMazeFields(mazeSize);
            });
        });
    };
});
