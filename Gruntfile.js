/*jshint camelcase:false */

var config = require('./server/config');
module.exports = function(grunt) {
    "use strict";
console.log(config.publicDir);
    grunt.initConfig({
        jshint: {
            files: [config.publicDir + '/minesweeper/**/*.js'],
            options: {
                ignores: [config.publicDir + '/minesweeper/application.min.js'],
                jshintrc : '.jshintrc'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: config.publicDir,

                    optimize: "uglify2",
                    generateSourceMaps: true,
                    preserveLicenseComments: false,

                    name: "minesweeper/application",
                    mainConfigFile: config.publicDir + '/minesweeper/requireconfig.js',
                    out: config.publicDir + '/minesweeper/application.min.js',
                    wrap: {
                        startFile: [config.publicDir + '//lib/almond/almond.js']
                    }
                }
            }
        },
        cssmin: {
            minprod: {
                files: {
                    'web/css/minified.css': [
                        'web/css/main.css'
                    ]
                }
            }
        },
        jasmine_node: {
            options: {
                verbose: false
            },
            client: {
                options: {
                    specFolders: ['tests/minesweeper/model'],
                    projectRoot: config.publicDir + '/minesweeper',
                    useRequireJs: "tests/lib/requireconfig/node.js"
                },
                all: ['tests/minesweeper/model']
            },
            server: {
                options: {
                    specFolders: ['tests/server']
                },
                all: ['tests/server']
            }
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
                autoWatch: true,
                browsers: ['Chrome']
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: config.publicDir + '/lib',
                    install: true
                }
            }
        },
        forever: {
            server: {
                options: {
                    index: 'server/app.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-forever');

    grunt.registerTask('test', ['jshint', 'karma:continous', 'jasmine_node']);

    grunt.registerTask('default', ['test']);
    grunt.registerTask('minify', ['requirejs', 'cssmin']);
    //grunt.registerTask('install', ['bower', 'minify']);
    grunt.registerTask('start', ['forever:server:start']);
    grunt.registerTask('stop', ['forever:server:stop']);
};