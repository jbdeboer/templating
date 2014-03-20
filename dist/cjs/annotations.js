"use strict";
var __moduleName = "annotations";
var assert = require("assert").assert;
var assert = require('assert').assert;
var DirectiveArgs = function DirectiveArgs() {};
($traceurRuntime.createClass)(DirectiveArgs, {}, {assert: function(obj) {
    if (obj.selector) {
      assert(obj.selector).is(assert.string);
    }
    if (obj.exports) {
      assert(obj.exports).is(assert.arrayOf(assert.string));
    }
  }});
var Directive = function Directive() {
  var data = arguments[0] !== (void 0) ? arguments[0] : null;
  assert.argumentTypes(data, DirectiveArgs);
  if (data) {
    for (var prop in data) {
      this[prop] = data[prop];
    }
  }
};
($traceurRuntime.createClass)(Directive, {}, {});
Directive.parameters = [[DirectiveArgs]];
var DecoratorDirective = function DecoratorDirective() {
  var data = arguments[0] !== (void 0) ? arguments[0] : null;
  assert.argumentTypes(data, DirectiveArgs);
  $traceurRuntime.superCall(this, $DecoratorDirective.prototype, "constructor", [data]);
};
var $DecoratorDirective = DecoratorDirective;
($traceurRuntime.createClass)(DecoratorDirective, {}, {}, Directive);
DecoratorDirective.parameters = [[DirectiveArgs]];
var TemplateDirective = function TemplateDirective() {
  var data = arguments[0] !== (void 0) ? arguments[0] : null;
  assert.argumentTypes(data, DirectiveArgs);
  $traceurRuntime.superCall(this, $TemplateDirective.prototype, "constructor", [data]);
};
var $TemplateDirective = TemplateDirective;
($traceurRuntime.createClass)(TemplateDirective, {}, {}, Directive);
TemplateDirective.parameters = [[DirectiveArgs]];
var ComponentArgs = function ComponentArgs() {};
($traceurRuntime.createClass)(ComponentArgs, {}, {assert: function(obj) {
    DirectiveArgs.assert(obj);
    if (obj.template) {
      var type = typeof obj.template;
      if (type !== 'string' && type !== 'object') {
        assert.fail('expected either string of object');
      }
    }
  }});
var ComponentDirective = function ComponentDirective() {
  var data = arguments[0] !== (void 0) ? arguments[0] : null;
  assert.argumentTypes(data, ComponentArgs);
  $traceurRuntime.superCall(this, $ComponentDirective.prototype, "constructor", [data]);
};
var $ComponentDirective = ComponentDirective;
($traceurRuntime.createClass)(ComponentDirective, {}, {}, Directive);
ComponentDirective.parameters = [[ComponentArgs]];
module.exports = {
  get Directive() {
    return Directive;
  },
  get DecoratorDirective() {
    return DecoratorDirective;
  },
  get TemplateDirective() {
    return TemplateDirective;
  },
  get ComponentDirective() {
    return ComponentDirective;
  },
  __esModule: true
};
