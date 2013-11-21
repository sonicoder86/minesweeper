define(['backbone'], function (Backbone) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            isBomb: false,
            isDisplayed: false,
            isFlagged: false,
            bombsNear: 0
        },

        getPossibleNeighbours: function()
        {
            var neighbours = [],
                x = this.get('x'),
                y = this.get('y');

            for (var i = x - 1; i <= x + 1; i = i + 1) {
                for (var j = y - 1; j <= y + 1; j = j + 1) {
                    if (x === i && y === j) {
                        continue;
                    }

                    neighbours.push({x: i, y: j});
                }
            }

            return neighbours;
        },

        getDisplayStatus: function()
        {
            if (!this.get('isDisplayed')) {
                return '';
            }

            if (this.get('isFlagged')) {
                return 'F';
            }

            if (this.get('isBomb')) {
                return 'B';
            }

            return this.get('bombsNear') > 0 ? this.get('bombsNear').toString() : '';
        },

        display: function()
        {
            this.set({isDisplayed: true});
        },

        flag: function()
        {
            if (this.get('isDisplayed')) {
                if (this.get('isFlagged')) {
                    this.set({isDisplayed: false, isFlagged: false});
                }
                return;
            }

            this.set({isFlagged: true});
            this.display();
        }
    });
});