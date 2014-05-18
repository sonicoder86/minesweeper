"use strict";
var fs   = require('fs');
var setup = function(requirejs) {
    var baseDir = __dirname+'/../..';
    fs.readFileSync(baseDir+'/web/js/minesweeper/requireconfig.js');

    requirejs.config({
        baseUrl: baseDir+'/web/js',
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
};

exports.setup = setup;