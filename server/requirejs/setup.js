"use strict";
var requirejs = require('requirejs'),
    setupLibraries = require('./libraries').setup;

setupLibraries(requirejs);

exports.requirejs = requirejs;