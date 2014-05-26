"use strict";
var fs   = require('fs');
var config = require('../config');
var setup = function(requirejs) {
    var baseDir = __dirname+'/../..';
    fs.readFileSync(baseDir+'/'+config.publicDir+'/minesweeper/requireconfig.js');

    requirejs.config({
        baseUrl: baseDir+'/'+config.publicDir,
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