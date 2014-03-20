"use strict";
var __moduleName = "directive_class_set";
var assert = require("assert").assert;
var Directive = require('./annotations').Directive;
var $__1 = require('./directive_class'),
    DirectiveClass = $__1.DirectiveClass,
    ArrayOfDirectiveClass = $__1.ArrayOfDirectiveClass;
var Selector = require('./selector/selector').Selector;
var assert = require('assert').assert;
var DirectiveClassSet = function DirectiveClassSet() {
  var parentDirectives = arguments[0] !== (void 0) ? arguments[0] : null;
  var directives = arguments[1];
  assert.argumentTypes(parentDirectives, $DirectiveClassSet, directives, ArrayOfDirectiveClass);
  this.parentDirectives = parentDirectives;
  this.directives = directives;
};
var $DirectiveClassSet = DirectiveClassSet;
($traceurRuntime.createClass)(DirectiveClassSet, {selector: function() {
    return assert.returnType((new Selector(this.directives, null)), Selector);
  }}, {});
DirectiveClassSet.parameters = [[DirectiveClassSet], [ArrayOfDirectiveClass]];
module.exports = {
  get DirectiveClassSet() {
    return DirectiveClassSet;
  },
  __esModule: true
};
