var expect = require('chai').expect
    requirejs = require('../../server/requiresetup');

describe('requirejssetup', function() {
    it('should requirejs as function defined', function() {
        expect(requirejs.requirejs).to.be.a('function');
    });

    it('should require given dependency', function() {
        var maze = requirejs.requirejs('minesweeper/model/maze');
        expect(maze).to.be.a('function');
    });
});