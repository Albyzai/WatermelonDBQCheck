const fc = require('fast-check');


function delay(timeout, f) {
    var complete;
    var p = new Promise(function (c, r) {
      complete = c;
    });
  
    setTimeout(function () {
      complete(f());
    }, timeout);
  
    return p;
  }
  
  var noEffectOnPureComputations =
    fc.assert("json -> json", "json", fc.nat(100), function (f, x, t) {
      var sync = f(x);
      return delay(t, function () {
        return f(x);
      })
      .then(function (async) {
        return _.isEqual(sync, async);
      });
    });
  
  fc.check(noEffectOnPureComputations);