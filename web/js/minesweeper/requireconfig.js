requirejs.config({
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: 'bower_components/jquery/jquery',
        underscore: 'bower_components/underscore-amd/underscore',
        backbone: 'bower_components/backbone-amd/backbone',
        marionette: 'bower_components/backbone.marionette/lib/backbone.marionette',
        text: 'bower_components/requirejs-text/text',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        socketio: 'bower_components/socket.io-client/dist/socket.io'
    },

    shim: {
        marionette: {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});