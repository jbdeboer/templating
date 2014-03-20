"use strict";
var __moduleName = "non_element_selector";
var assert = require("assert").assert;
var assert = require('assert').assert;
var SelectedElementBindings = require('./element_selector').SelectedElementBindings;
var CompilerConfig = require('../compiler_config').CompilerConfig;
var NodeAttrs = require('../types').NodeAttrs;
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
module.exports = {
  get ArrayOfMarkedText() {
    return ArrayOfMarkedText;
  },
  get NonElementSelector() {
    return NonElementSelector;
  },
  __esModule: true
};
