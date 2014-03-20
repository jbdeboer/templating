define(["assert", './directive_class', './annotations', './types'], function($__0,$__1,$__2,$__3) {
  "use strict";
  var __moduleName = "compiler_config";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  var assert = ($__0).assert;
  var $__5 = $__1,
      DirectiveClass = $__5.DirectiveClass,
      ArrayOfDirectiveClass = $__5.ArrayOfDirectiveClass;
  var Directive = ($__2).Directive;
  var ArrayOfClass = ($__3).ArrayOfClass;
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
  return {
    get CompilerConfig() {
      return CompilerConfig;
    },
    __esModule: true
  };
});
