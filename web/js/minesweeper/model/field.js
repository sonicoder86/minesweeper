define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            isBomb: false,
            bombsNear: 0,
            status: null
        },

        getPossibleNeighbours: function()
        {
            var neighbours = [],
                x = this.get('x'),
                y = this.get('y');

            for (var i = x - 1; i <= x + 1; i++) {
                for (var j = y - 1; j <= y + 1; j++) {
                    if (x == i && y == j) {
                        continue;
                    }

                    neighbours.push({x: i, y: j});
                }
            }

            return neighbours;
        }
    })
});