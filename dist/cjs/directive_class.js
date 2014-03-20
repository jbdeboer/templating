"use strict";
var __moduleName = "directive_class";
var assert = require("assert").assert;
var Directive = require('./annotations').Directive;
var assert = require('assert').assert;
var DirectiveClass = function DirectiveClass(annotation, clazz) {
  assert.argumentTypes(annotation, Directive, clazz, Function);
  this.annotation = annotation;
  this.clazz = clazz;
};
($traceurRuntime.createClass)(DirectiveClass, {}, {});
DirectiveClass.parameters = [[Directive], [Function]];
var ArrayOfDirectiveClass = function ArrayOfDirectiveClass() {
  assert.fail('type is not instantiable');
};
($traceurRuntime.createClass)(ArrayOfDirectiveClass, {}, {assert: function(obj) {
    assert(obj).is(assert.arrayOf(DirectiveClass));
  }});
module.exports = {
  get DirectiveClass() {
    return DirectiveClass;
  },
  get ArrayOfDirectiveClass() {
    return ArrayOfDirectiveClass;
  },
  __esModule: true
};
