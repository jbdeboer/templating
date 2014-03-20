"use strict";
var __moduleName = "element_selector";
var assert = require("assert").assert;
var $__1 = require('../annotations'),
    TemplateDirective = $__1.TemplateDirective,
    ComponentDirective = $__1.ComponentDirective,
    DecoratorDirective = $__1.DecoratorDirective;
var $__1 = require('../directive_class'),
    DirectiveClass = $__1.DirectiveClass,
    ArrayOfDirectiveClass = $__1.ArrayOfDirectiveClass;
var $__1 = require('./selector_part'),
    SelectorPart = $__1.SelectorPart,
    ArrayOfSelectorPart = $__1.ArrayOfSelectorPart;
var NodeAttrs = require('../types').NodeAttrs;
var SELECTOR_REGEXP = /^(?:([\w\-]+)|(?:\.([\w\-]+))|(?:\[([\w\-\*]+)(?:=([^\]]*))?\]))/;
var wildcard = new RegExp('\\*', 'g');
function matchingKey(obj, attrName) {
  assert.argumentTypes(obj, $traceurRuntime.type.any, attrName, $traceurRuntime.type.string);
  for (var key in obj) {
    var pattern = key.replace(wildcard, '[\\w\\-]+');
    var exp = new RegExp(("^" + pattern + "\$"));
    if (exp.test(attrName)) {
      return key;
    }
  }
}
matchingKey.parameters = [[], [$traceurRuntime.type.string]];
function putIfAbsent(obj, name, create) {
  var val = obj[name];
  if (!val) {
    val = obj[name] = create();
  }
  return val;
}
function splitCss(selector) {
  assert.argumentTypes(selector, $traceurRuntime.type.string);
  var parts = [];
  var remainder = selector;
  var match;
  while (remainder !== '') {
    if ((match = SELECTOR_REGEXP.exec(remainder)) != null) {
      if (match[1] != null) {
        parts.push(SelectorPart.fromElement(match[1].toLowerCase()));
      } else if (match[2] != null) {
        parts.push(SelectorPart.fromClass(match[2].toLowerCase()));
      } else if (match[3] != null) {
        var attrValue = match[4] == null ? '' : match[4].toLowerCase();
        parts.push(SelectorPart.fromAttribute(match[3].toLowerCase(), attrValue));
      } else {
        throw ("Missmatched RegExp " + SELECTOR_REGEXP + " on " + remainder);
      }
    } else {
      throw new Error(("Unknown selector format '" + selector + "'."));
    }
    var end = match.index + match[0].length;
    remainder = remainder.substring(end);
  }
  return assert.returnType((parts), ArrayOfSelectorPart);
}
splitCss.parameters = [[$traceurRuntime.type.string]];
var SelectedElementBindings = function SelectedElementBindings() {
  this.decorators = [];
  this.component = null;
  this.template = null;
  this.attrs = new NodeAttrs();
};
($traceurRuntime.createClass)(SelectedElementBindings, {
  addDirectives: function(directiveClasses) {
    assert.argumentTypes(directiveClasses, ArrayOfDirectiveClass);
    for (var i = 0,
        length = directiveClasses.length; i < length; i++) {
      this.addDirective(directiveClasses[i]);
    }
  },
  addDirective: function(directive) {
    assert.argumentTypes(directive, DirectiveClass);
    if (directive.annotation instanceof TemplateDirective) {
      this.template = directive;
    } else if (directive.annotation instanceof ComponentDirective) {
      this.component = directive;
    } else if (directive.annotation instanceof DecoratorDirective) {
      this.decorators.push(directive);
    }
  }
}, {});
SelectedElementBindings.prototype.addDirectives.parameters = [[ArrayOfDirectiveClass]];
SelectedElementBindings.prototype.addDirective.parameters = [[DirectiveClass]];
var ElementSelector = function ElementSelector(name) {
  assert.argumentTypes(name, $traceurRuntime.type.string);
  this.name = name;
  this.elementMap = {};
  this.elementPartialMap = {};
  this.classMap = {};
  this.classPartialMap = {};
  this.attrValueMap = {};
  this.attrValuePartialMap = {};
};
var $ElementSelector = ElementSelector;
($traceurRuntime.createClass)(ElementSelector, {
  addDirective: function(directive) {
    assert.argumentTypes(directive, DirectiveClass);
    var selector = directive.annotation.selector;
    var selectorParts = splitCss(selector);
    if (!selectorParts) {
      throw new Error(("Unsupported Selector: " + selector));
    }
    this._addDirective(selectorParts, directive);
  },
  _addDirective: function(selectorParts, directive) {
    var selectorPart = selectorParts.splice(0, 1)[0];
    var terminal = selectorParts.length == 0;
    var name;
    if ((name = selectorPart.element) != null) {
      if (terminal) {
        putIfAbsent(this.elementMap, name, (function() {
          return [];
        })).push(directive);
      } else {
        putIfAbsent(this.elementPartialMap, name, (function() {
          return new $ElementSelector(name);
        }))._addDirective(selectorParts, directive);
      }
    } else if ((name = selectorPart.className) != null) {
      if (terminal) {
        putIfAbsent(this.classMap, name, (function() {
          return [];
        })).push(directive);
      } else {
        putIfAbsent(this.classPartialMap, name, (function() {
          return new $ElementSelector(name);
        }))._addDirective(selectorParts, directive);
      }
    } else if ((name = selectorPart.attrName) != null) {
      if (terminal) {
        var attrMap = putIfAbsent(this.attrValueMap, name, (function() {
          return {};
        }));
        putIfAbsent(attrMap, selectorPart.attrValue, (function() {
          return [];
        })).push(directive);
      } else {
        var attrPartialMap = putIfAbsent(this.attrValuePartialMap, name, (function() {
          return {};
        }));
        putIfAbsent(attrPartialMap, selectorPart.attrValue, (function() {
          return new $ElementSelector(name);
        }))._addDirective(selectorParts, directive);
      }
    } else {
      throw new Error(("Unknown selector part '" + selectorPart + "'."));
    }
  },
  selectNode: function(builder, partialSelection, nodeName) {
    assert.argumentTypes(builder, SelectedElementBindings, partialSelection, $traceurRuntime.type.any, nodeName, $traceurRuntime.type.string);
    var partial;
    if (this.elementMap[nodeName]) {
      builder.addDirectives(this.elementMap[nodeName]);
    }
    if (partial = this.elementPartialMap[nodeName]) {
      if (partialSelection == null) {
        partialSelection = [];
      }
      partialSelection.push(partial);
    }
    return partialSelection;
  },
  selectClass: function(builder, partialSelection, className) {
    assert.argumentTypes(builder, SelectedElementBindings, partialSelection, $traceurRuntime.type.any, className, $traceurRuntime.type.string);
    var partial;
    if (this.classMap[className]) {
      builder.addDirectives(this.classMap[className]);
    }
    if (partial = this.classPartialMap[className]) {
      if (partialSelection == null) {
        partialSelection = [];
      }
      partialSelection.push(partial);
    }
    return partialSelection;
  },
  selectAttr: function(builder, partialSelection, attrName, attrValue) {
    assert.argumentTypes(builder, SelectedElementBindings, partialSelection, $traceurRuntime.type.any, attrName, $traceurRuntime.type.string, attrValue, $traceurRuntime.type.string);
    var key = matchingKey(this.attrValueMap, attrName);
    var partial,
        lookup;
    if (key) {
      var valuesMap = this.attrValueMap[key];
      if (lookup = valuesMap['']) {
        builder.addDirectives(lookup);
      }
      if (attrValue != '' && (lookup = valuesMap[attrValue])) {
        builder.addDirectives(lookup);
      }
    }
    if (this.attrValuePartialMap[attrName]) {
      var valuesPartialMap = this.attrValuePartialMap[attrName];
      if (partial = valuesPartialMap['']) {
        if (partialSelection == null) {
          partialSelection = [];
        }
        partialSelection.push(partial);
      }
      if (attrValue != '' && (partial = valuesPartialMap[attrValue])) {
        if (partialSelection == null) {
          partialSelection = [];
        }
        partialSelection.push(partial);
      }
    }
    return partialSelection;
  },
  toString: function() {
    return ("ElementSelector(" + this.name + ")");
  }
}, {});
ElementSelector.parameters = [[$traceurRuntime.type.string]];
ElementSelector.prototype.addDirective.parameters = [[DirectiveClass]];
ElementSelector.prototype._addDirective.parameters = [[ArrayOfSelectorPart], [DirectiveClass]];
ElementSelector.prototype.selectNode.parameters = [[SelectedElementBindings], [], [$traceurRuntime.type.string]];
ElementSelector.prototype.selectClass.parameters = [[SelectedElementBindings], [], [$traceurRuntime.type.string]];
ElementSelector.prototype.selectAttr.parameters = [[SelectedElementBindings], [], [$traceurRuntime.type.string], [$traceurRuntime.type.string]];
module.exports = {
  get SelectedElementBindings() {
    return SelectedElementBindings;
  },
  get ElementSelector() {
    return ElementSelector;
  },
  __esModule: true
};