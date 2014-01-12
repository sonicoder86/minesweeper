/*jshint camelcase:false */
module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            files: ['web/js/minesweeper/**/*.js'],
            options: {
                ignores: ['web/js/minesweeper/application.min.js'],
                jshintrc : '.jshintrc'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "web/js",

                    optimize: "uglify2",
                    generateSourceMaps: true,
                    preserveLicenseComments: false,

                    name: "minesweeper/application",
                    mainConfigFile: "web/js/minesweeper/requireconfig.js",
                    out: "web/js/minesweeper/application.min.js"
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            test: {
                src: ['tests/server/**/*.js']
            }
        },
        jasmine_node: {
            specFolders: ['tests/minesweeper/model'],
            projectRoot: "web/js/minesweeper",
            requirejs: "tests/lib/requireconfig/node.js"
        },
        karma: {
            options: {
                configFile: 'karmaconfig.js',
                browsers: ['PhantomJS']
            },
            continous: {
                singleRun: true
            },
            unit: {
                autoWatch: true
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'web/js/lib',
                    install: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('mocha', ['mochaTest']);
    grunt.registerTask('test', ['bower', 'karma:continous', 'mocha', 'jasmine_node']);

    // Default task.
    grunt.registerTask('default', ['test']);
};