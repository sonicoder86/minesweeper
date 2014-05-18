"use strict";
var requirejs = require('requirejs'),
    fs   = require('fs');

fs.readFileSync(__dirname+'/../../web/js/minesweeper/requireconfig.js');

requirejs.config({
    baseUrl: __dirname+'/../../web/js',
    urlArgs: null
});

requirejs.define('jquery', function() {
    return require('jquery');
});

requirejs.define('underscore', function() {
    return require('underscore');
});

requirejs.define('backbone', function() {
    return require('backbone');
});

exports.requirejs = requirejs;
