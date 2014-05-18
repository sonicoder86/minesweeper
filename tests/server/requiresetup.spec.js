var requireJs = require(__dirname+'/../../server/requirejs/setup');

describe('requirejssetup', function() {
    "use strict";
    it('should requirejs as function defined', function() {
        expect(requireJs.requirejs).toBeDefined();
    });

    it('should require given dependency', function() {
        var Maze = requireJs.requirejs('minesweeper/model/maze');
        expect(requireJs.requirejs).toBeTruthy(Maze);
        expect(requireJs.requirejs).toBeTruthy(new Maze());
    });
});