define(['marionette', './module/mazegenerator', './module/game', './module/menu', 'bootstrap'],
function (Marionette, mazeGeneratorModule, gameModule, menuModule) {
    var application = new Marionette.Application();

    application.addRegions({
        menuRegion: '#menu-region',
        gameRegion: '#game-region'
    });

    application.setup = function() {
        mazeGeneratorModule(application);
        gameModule(application);
        menuModule(application);
    };

    return application;
});