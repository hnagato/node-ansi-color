module.exports = function(a, b, step) {
  step = step || 1;

  var r = [];
  for (var x = a; x <= b; x += step) {
    r.push(x);
  }

  return r;
};
