define(['../collection/gametype', '../view/menu'], function (GameTypeCollection, MenuView) {
    var gameTypes = new GameTypeCollection([
        {size: 9, bombs: 10},
        {size: 16, bombs: 40}
    ]);

    return function(application) {
        application.module('Menu', function(Menu, Minesweeper, Backbone, Marionette, $, _) {
            var menuView = new MenuView({collection: gameTypes});

            Minesweeper.menuRegion.show(menuView);
        });
    };
});
