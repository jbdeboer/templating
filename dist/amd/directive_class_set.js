define(["assert", './annotations', './directive_class', './selector/selector', 'assert'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  var __moduleName = "directive_class_set";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  var assert = ($__0).assert;
  var Directive = ($__1).Directive;
  var $__6 = $__2,
      DirectiveClass = $__6.DirectiveClass,
      ArrayOfDirectiveClass = $__6.ArrayOfDirectiveClass;
  var Selector = ($__3).Selector;
  var assert = ($__4).assert;
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
  return {
    get DirectiveClassSet() {
      return DirectiveClassSet;
    },
    __esModule: true
  };
});
