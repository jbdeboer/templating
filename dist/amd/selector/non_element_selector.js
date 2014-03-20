define(["assert", 'assert', './element_selector', '../compiler_config', '../types'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  var __moduleName = "non_element_selector";
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
  var assert = ($__1).assert;
  var SelectedElementBindings = ($__2).SelectedElementBindings;
  var CompilerConfig = ($__3).CompilerConfig;
  var NodeAttrs = ($__4).NodeAttrs;
  var ArrayOfMarkedText = function ArrayOfMarkedText() {};
  ($traceurRuntime.createClass)(ArrayOfMarkedText, {}, {assert: function(obj) {
      assert(obj).arrayOf(structure({
        val: assert.string,
        expr: assert.boolean
      }));
    }});
  var NonElementSelector = function NonElementSelector(config) {
    assert.argumentTypes(config, CompilerConfig);
    this.config = config;
  };
  ($traceurRuntime.createClass)(NonElementSelector, {
    _convertInterpolationToExpression: function(text) {
      assert.argumentTypes(text, $traceurRuntime.type.string);
      var interpolationParts = text.split(this.config.interpolationRegex),
          part,
          isExpression;
      if (interpolationParts.length <= 1) {
        return null;
      }
      interpolationParts.forEach(function(part, index) {
        if (index % 2 === 0) {
          interpolationParts[index] = "'" + part + "'";
        }
      });
      return interpolationParts.join('+');
    },
    selectTextNode: function(text) {
      assert.argumentTypes(text, $traceurRuntime.type.string);
      return this._convertInterpolationToExpression(text);
    },
    selectBindAttr: function(binder, attrName, attrValue) {
      assert.argumentTypes(binder, SelectedElementBindings, attrName, $traceurRuntime.type.string, attrValue, $traceurRuntime.type.string);
      var interpolationExpr = this._convertInterpolationToExpression(attrValue);
      var match;
      if (interpolationExpr) {
        attrValue = interpolationExpr;
        binder.attrs.bind[NodeAttrs.toCamelCase(attrName)] = attrValue;
      } else if (match = this.config.bindAttrRegex.exec(attrName)) {
        binder.attrs.bind[NodeAttrs.toCamelCase(match[1])] = attrValue;
      } else if (match = this.config.eventAttrRegex.exec(attrName)) {
        binder.attrs.event[NodeAttrs.toCamelCase(match[1])] = attrValue;
      } else {
        binder.attrs.init[NodeAttrs.toCamelCase(attrName)] = attrValue;
      }
    }
  }, {});
  NonElementSelector.parameters = [[CompilerConfig]];
  NonElementSelector.prototype._convertInterpolationToExpression.parameters = [[$traceurRuntime.type.string]];
  NonElementSelector.prototype.selectTextNode.parameters = [[$traceurRuntime.type.string]];
  NonElementSelector.prototype.selectBindAttr.parameters = [[SelectedElementBindings], [$traceurRuntime.type.string], [$traceurRuntime.type.string]];
  return {
    get ArrayOfMarkedText() {
      return ArrayOfMarkedText;
    },
    get NonElementSelector() {
      return NonElementSelector;
    },
    __esModule: true
  };
});
