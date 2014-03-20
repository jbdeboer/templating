"use strict";
var __moduleName = "compiler_config";
var assert = require("assert").assert;
var $__1 = require('./directive_class'),
    DirectiveClass = $__1.DirectiveClass,
    ArrayOfDirectiveClass = $__1.ArrayOfDirectiveClass;
var Directive = require('./annotations').Directive;
var ArrayOfClass = require('./types').ArrayOfClass;
var CompilerConfig = function CompilerConfig() {
  this.interpolationRegex = /{{(.*?)}}/g;
  this.bindAttrRegex = /bind-(.+)/;
  this.eventAttrRegex = /on-(.+)/;
};
($traceurRuntime.createClass)(CompilerConfig, {directiveClassesForDirectives: function(directives) {
    assert.argumentTypes(directives, ArrayOfClass);
    var directiveClasses = [];
    directives.forEach(function(directive) {
      var annotations = directive.annotations || [];
      annotations.filter(function(annotation) {
        return annotation instanceof Directive;
      }).forEach(function(directiveAnnotation) {
        directiveClasses.push(new DirectiveClass(directiveAnnotation, directive));
      });
    });
    return assert.returnType((directiveClasses), ArrayOfDirectiveClass);
  }}, {});
CompilerConfig.prototype.directiveClassesForDirectives.parameters = [[ArrayOfClass]];
module.exports = {
  get CompilerConfig() {
    return CompilerConfig;
  },
  __esModule: true
};
