#!/usr/bin/env node
// -*- coding: utf-8 -*-

var colorize = require('./lib/ANSIColor.js').colorize;

String.prototype.colorize = function() {
  return colorize.bind(this)(this);
}; 

console.log('%s',
  "@hnagato https://github.com/hnagato a sample tweet. #test"
    .colorize()
    .apply(/@[a-zA-Z0-9_]+/)
    .apply(/#\S+/)
    .blue().underline().apply(/https:\/\/\S+/));

