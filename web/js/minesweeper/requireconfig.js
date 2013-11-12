requirejs.config({
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: 'lib/jquery/jquery-2.0.3',
        underscore: 'lib/underscore-1.5.2',
        backbone: 'lib/backbone/backbone-1.1.0',
        marionette: 'lib/backbone/backbone.marionette-1.2.2',
        text: 'lib/require/require.text-2.0.10',
        bootstrap: 'lib/bootstrap/bootstrap-3.0.0',
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