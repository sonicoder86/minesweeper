# Minesweeper [![Build Status](https://travis-ci.org/blacksonic/minesweeper.png?branch=master)](https://travis-ci.org/blacksonic/minesweeper) #

Play the well known minesweeper game in the original manner, or play it with Your friends!
This project aims is to prove, that it's code and tests can be shared between multiple environments without modifications.

## Why is it special? ##

When generating the maze for the game, the very same Javascript code is used on both sides.
In single player mode the maze is generated in the browser, in multiplayer it is generated on the server and sent to both participants of the game.

## Wanna try it? ##

Check out the [live demo](http://minesweeper-online.herokuapp.com/).

## Technologies used ##

- [RequireJS](http://requirejs.org/)
- [Backbone](http://backbonejs.org/)
- [Backbone Marionette](http://marionettejs.com/)
- [Karma](http://karma-runner.github.io/)
- [Jasmine](http://pivotal.github.io/jasmine/)
- [Grunt](http://gruntjs.com/)