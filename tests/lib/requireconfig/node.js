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
    setupLibraries = require(process.cwd()+'/server/requirejs/libraries').setup;

setupLibraries(requirejs);

define = requirejs.define;