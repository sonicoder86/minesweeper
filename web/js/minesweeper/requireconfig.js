requirejs.config({
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: 'lib/jquery/jquery',
        underscore: 'lib/underscore-amd/underscore',
        backbone: 'lib/backbone-amd/backbone',
        marionette: 'lib/backbone.marionette/lib/backbone.marionette',
        text: 'lib/requirejs-text/text',
        bootstrap: 'lib/bootstrap/dist/js/bootstrap',
        socketio: 'lib/socket.io-client/dist/socket.io'
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