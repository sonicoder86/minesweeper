requirejs.config({
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: 'lib/jquery/jquery-2.0.3',
        underscore: 'lib/underscore-1.5.1',
        backbone: 'lib/backbone/backbone-1.0.0',
        marionette: 'lib/backbone/backbone.marionette-1.0.4',
        text: 'lib/require/require.text-2.0.10'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        }
    }
});