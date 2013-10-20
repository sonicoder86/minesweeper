define(['../collection/gametype', '../view/menu'], function (GameTypeCollection, MenuView) {
    var gameTypes = new GameTypeCollection([
        {size: 9, bombs: 10},
        {size: 16, bombs: 40}
    ]);

    return function(application) {
        application.module('Menu', function(Menu, Minesweeper, Backbone, Marionette, $, _) {
            Menu.menuView = new MenuView({collection: gameTypes});

            Menu.menuView.on('new_game', function(newGameType) {
                Minesweeper.request('maze:generate', newGameType.get('size'), newGameType.get('bombs'));
            });

            Minesweeper.menuRegion.show(Menu.menuView);
        });
    };
});
