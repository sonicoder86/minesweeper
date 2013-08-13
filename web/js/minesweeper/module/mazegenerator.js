define(['marionette', '../collection/field'], function (Marionette, FieldCollection) {
    return function(application) {
        application.module('Maze.Generator', function(MazeGenerator, Minesweeper, Backbone, Marionette, $, _) {
            var API = {
                getMazeFields: function() {
                    if (!MazeGenerator.fields) {
                        MazeGenerator.fields = new FieldCollection();
                    }
                    return MazeGenerator.fields;
                }
            };

            Minesweeper.reqres.setHandler("maze:getFields", function(){
                return API.getMazeFields();
            });
        });
    };
});
