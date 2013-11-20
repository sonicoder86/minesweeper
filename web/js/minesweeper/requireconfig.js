requirejs.config({
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: 'bower_components/jquery/jquery',
        underscore: 'bower_components/underscore/underscore',
        backbone: 'bower_components/backbone/backbone',
        marionette: 'bower_components/backbone.marionette/lib/backbone.marionette',
        text: 'lib/require/require.text-2.0.10',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        socketio: 'lib/socketio-0.9.16'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});