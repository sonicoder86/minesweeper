"use strict";
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.devIndex = function(req, res){
    res.render('devindex', { title: 'Express' });
};

exports.test = function(req, res){
    res.render('test');
};