/* Setup file run before spec files to setup the context (and RequireJS
 * specifically) to execute the spec file.
 *
 * Defined by caller:
 * - Jasmine predefines
 * - require (Node require)
 * - __dirname, __filename
 * - baseUrl (Relative path to the directory containing this file)
 * - csPath (Path to require-cs module)
 *
 * See requirejs-runner source for full invocation details.
 */
var define,
    requirejs = require('requirejs'),
    fs   = require('fs');

fs.readFileSync(process.cwd()+'/web/js/minesweeper/requireconfig.js');

requirejs.config({
    baseUrl: process.cwd()+'/web/js',
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

define = requirejs.define;