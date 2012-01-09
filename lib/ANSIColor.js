 // -*- conding:utf8 -*-

var util = require('util');
var range = require('./range');

var CODES = {
  clear:           0,
  bold:            1,
  underline:       4,
  blink:           5,
  strike:          9,
  black:           30,
  red:             31,
  green:           32,
  yellow:          33,
  blue:            34,
  magenta:         35,
  cyan:            36,
  white:           37,
  on_black:        30,
  onRed:           41,
  onGreen:         42,
  onYellow:        43,
  onBlue:          44,
  onMagenta:       45,
  onCyan:          46,
  onWhite:         47,
  brightBlack:     90,
  brightRed:       91,
  brightGreen:     92,
  brightYellow:    93,
  brightBlue:      94,
  brightMagenta:   95,
  brightCyan:      96,
  brightWhite:     97,
  onBrightBlack:   100,
  onBrightRed:     101,
  onBrightGreen:   102,
  onBrightYellow:  103,
  onBrightBlue:    104,
  onBrightMagenta: 105,
  onBrightCyan:    106,
  onBrightWhite:   107
};

var COLORS = range(CODES.red, CODES.cyan).concat(range(CODES.brightRed, CODES.brightCyan));

function of(text, colors) {
  colors = colors || COLORS;
  var code = parseInt(text.replace(/[^0-9a-zA-Z]/g, ''), 36) % colors.length;
  if (isNaN(code)) {
    code = Math.floor(Math.random() * colors.length);
  }
  return colors[code];
}

function wrap(text, codes) {
  return util.format("\033[%sm%s\033[0m", codes.join(';'), text);
}


function ANSIColor(text) {
  this.text = text || '';
  this.codes = [ CODES.clear ];
  this.hasColor = false;

  if (!(this instanceof ANSIColor)) {
    return new ANSIColor(this instanceof String ? this : text);
  }
}

ANSIColor.prototype.apply = function(pattern, colorRange) {
  var self = this;
  if (util.isRegExp(pattern)) {
    this.text = this.text.replace(pattern, function(m) {
      return wrap(m, self.hasColor ? self.codes : self.codes.concat(of(m, colorRange)));
    });
  } else {
    this.text = wrap(this.text, this.codes);
  }

  return this.reset();
};

ANSIColor.prototype.reset = function() {
  this.codes = [ CODES.clear ];
  this.hasColor = false;
  return this;
};

ANSIColor.prototype.fb256 = function(code) {
  this.codes.push(38, 5, code);
  this.hasColor = true;
  return this;
};

ANSIColor.prototype.bg256 = function(code) {
  this.codes.push(48, 5, code);
  this.hasColor = true;
  return this;
};

['toString', 'valueOf', 'end'].forEach(function(name) {
  ANSIColor.prototype[name] = function() {
    if (this.hasColor) {
      this.apply();
    }
    return this.text;
  };
});

for (var k in CODES) {
  (function(name, code) {
    ANSIColor.prototype[name] = function() {
      this.codes.push(code);
      if (code >= 30) {
        this.hasColor = true;
      }
      return this;
    };
  })(k, CODES[k]);
}

ANSIColor.colorize = function(text) {
  return new ANSIColor(text);
};

module.exports = ANSIColor;

