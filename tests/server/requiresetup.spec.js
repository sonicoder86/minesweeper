var chaiExpect = require('chai').expect,
    requireJs = require('../../server/requiresetup');

describe('requirejssetup', function() {
    "use strict";
    it('should requirejs as function defined', function() {
        chaiExpect(requireJs.requirejs).to.be.a('function');
    });

    it('should require given dependency', function() {
        var maze = requireJs.requirejs('minesweeper/model/maze');
        chaiExpect(maze).to.be.a('function');
    });
});