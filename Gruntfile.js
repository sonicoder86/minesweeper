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
                    out: "web/js/minesweeper/application.min.js",
                    wrap: {
                        startFile: ["web/js/lib/almond/almond.js"]
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
                    projectRoot: "web/js/minesweeper",
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
                    targetDir: 'web/js/lib',
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
    grunt.registerTask('install', ['bower', 'minify']);
    grunt.registerTask('start', ['forever:server:start']);
    grunt.registerTask('stop', ['forever:server:stop']);
};