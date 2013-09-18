define(['marionette', './module/mazegenerator', './module/game'], function (Marionette, mazeGeneratorModule, gameModule) {
    var application = new Marionette.Application();

    application.addRegions({
        mainRegion: '#main-region',
        statusRegion: '#status-region'
    });

    application.setup = function() {
        mazeGeneratorModule(application);
        gameModule(application);
    };

    return application;
});