# Minesweeper #

[![Build Status](https://travis-ci.org/blacksonic/minesweeper.png?branch=master)](https://travis-ci.org/blacksonic/minesweeper) [![Dependency Status](https://david-dm.org/blacksonic/minesweeper.svg)](https://david-dm.org/blacksonic/minesweeper) [![Code Climate](https://codeclimate.com/github/blacksonic/minesweeper.png)](https://codeclimate.com/github/blacksonic/minesweeper)

Play the well known minesweeper game in the original manner, or play it with your friends!
This project proves that it's isomorphic code and tests can be run in multiple environments without modifications.

## Why is it special? ##

When generating the maze for the game, the same Javascript code is used on both sides.
In single player mode the maze is generated in the browser, in multiplayer on the server and sent to both participants of the game.

## Wanna try it? ##

Check out the [live demo](http://minesweeper-online.herokuapp.com/).

Or build it on your machine!

Clone the repo, run ```npm install``` then ```npm test```. If everything is green (the tests run without errors), launch the application with ```npm start```.

## Technologies used ##

- [RequireJS](http://requirejs.org/)
- [Backbone](http://backbonejs.org/)
- [Backbone Marionette](http://marionettejs.com/)
- [Karma](http://karma-runner.github.io/)
- [Jasmine](http://pivotal.github.io/jasmine/)
- [Grunt](http://gruntjs.com/)