var requirejs = require('requirejs'),
    fs   = require('fs');

eval(
    fs.readFileSync(__dirname+'/../web/js/minesweeper/requireconfig.js')+''
);

requirejs.define('jquery', function() {
    return require('jquery');
});

requirejs.define('underscore', function() {
    return require('underscore');
});

requirejs.define('backbone', function() {
    return require('backbone');
});

requirejs.config({
    baseUrl: __dirname+'/../web/js',
    urlArgs: null
});

exports.requirejs = requirejs;
