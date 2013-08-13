define(['marionette', './module/mazegenerator'], function (Marionette, mazeGeneratorModule) {
    var application = new Marionette.Application();

    application.addRegions({
        mainRegion: '#main-region'
    });

    mazeGeneratorModule(application);

    return application;
});