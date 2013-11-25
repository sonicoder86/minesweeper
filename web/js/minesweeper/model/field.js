define(['backbone', 'underscore'], function (Backbone, _) {
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

            _.forEach([-1, 0, 1], function(offsetX) {
                _.forEach([-1, 0, 1], function(offsetY) {
                    if (offsetY === 0 && offsetX === 0) {
                        return;
                    }

                    neighbours.push({x: x + offsetX, y: y + offsetY});
                });
            });

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
                    this.removeFlag();
                }
                return;
            }

            this.set({isDisplayed: true, isFlagged: true});
        },

        removeFlag: function()
        {
            this.set({isDisplayed: false, isFlagged: false});
        }
    });
});