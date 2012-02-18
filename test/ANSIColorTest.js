#!/usr/bin/env node
// -*- coding: utf-8 -*-

var assert   = require('assert');
var util     = require('util');
var colorize = require('../lib/ANSIColor').colorize;

var text = '@hnagato テストです。 https://github.com/ #foobar abcdefghijklmnopqrstuvwzyz';

console.log(colorize(text).onBlue().white().end());

console.log(colorize(text).bold().underline().red().end());

console.log(colorize(text)
            .apply(/@\S+/g)
            .brightGreen().apply(/#\S+/g)
            .blue().underline().apply(/https?:\S+/g)
            .end());

console.log("%s", colorize(text).onBrightBlack().white());

