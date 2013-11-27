define(['../collection/gametype', '../view/menu'], function (GameTypeCollection, MenuView) {
    "use strict";
    var gameTypes = new GameTypeCollection([
        {size: 9, bombs: 10, isRemote: false},
        {size: 16, bombs: 40, isRemote: false},
        {size: 9, bombs: 10, isRemote: true}
    ]);

    return function(application) {
        application.module('Menu', function(Menu, Minesweeper) {
            Menu.menuView = new MenuView({collection: gameTypes});

            Menu.menuView.on('new_game', function(newGameType) {
                Minesweeper.request('new_game', newGameType);
            });

            Minesweeper.menuRegion.show(Menu.menuView);
        });
    };
});
