#!/usr/bin/env node
// -*- coding: utf-8 -*-

var assert = require('assert');
var range  = require('../lib/range');


console.log('Testing module lib/range.js...');

assert.equal(typeof range, 'function');
assert.deepEqual(range(1, 0),     []);
assert.deepEqual(range(1, 1),     [1]);
assert.deepEqual(range(0, 1),     [0,1]);
assert.deepEqual(range(0, 1, 2),  [0]);
assert.deepEqual(range(31, 36),   [31, 32, 33, 34, 35, 36]);
assert.deepEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);

console.log('OK');
