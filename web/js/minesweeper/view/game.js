define(['marionette', 'underscore', 'text!../template/game.html', '../view/maze', '../view/status'],
function (Marionette, _, html, MazeView, StatusView) {
    "use strict";
    return Marionette.Layout.extend({
        template: _.template(html),

        initialize: function()
        {
            this.mazeView = new MazeView({collection: this.model.getFields()});

            this.listenTo(this.mazeView, 'itemview:display', function(view) {
                this.model.display(view.model);
            });
            this.listenTo(this.mazeView, 'itemview:flag', function(view) {
                this.model.flag(view.model);
            });

            this.statusView = new StatusView({model: this.model});
        },

        regions: {
            mainRegion: '#main-region',
            statusRegion: '#status-region'
        },

        onRender: function()
        {
            this.mainRegion.show(this.mazeView);
            this.statusRegion.show(this.statusView);
        }
    });
});