define([], function() {
  "use strict";
  var __moduleName = (void 0);
  var IncredibleCalculator = function IncredibleCalculator() {};
  ($traceurRuntime.createClass)(IncredibleCalculator, {sum: function(a, b) {
      return a + b;
    }}, {});
  IncredibleCalculator.prototype.sum.parameters = [[assert.number], [assert.number]];
  return {
    get IncredibleCalculator() {
      return IncredibleCalculator;
    },
    __transpiledModule: true
  };
});
