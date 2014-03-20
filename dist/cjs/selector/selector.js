"use strict";
var __moduleName = "selector";
var assert = require("assert").assert;
var Directive = require('../annotations').Directive;
var $__1 = require('../directive_class'),
    ArrayOfDirectiveClass = $__1.ArrayOfDirectiveClass,
    DirectiveClass = $__1.DirectiveClass;
var $__1 = require('./element_selector'),
    ElementSelector = $__1.ElementSelector,
    SelectedElementBindings = $__1.SelectedElementBindings;
var assert = require('assert').assert;
var NonElementSelector = require('./non_element_selector').NonElementSelector;
var CompilerConfig = require('../compiler_config').CompilerConfig;
;
var Selector = function Selector(directives, compilerConfig) {
  assert.argumentTypes(directives, ArrayOfDirectiveClass, compilerConfig, CompilerConfig);
  this.directives = directives;
  this.nonElementSelector = new NonElementSelector(compilerConfig);
  this.elementSelector = new ElementSelector('', this.nonElementSelector);
  this.directives.forEach(this.addDirective.bind(this));
};
($traceurRuntime.createClass)(Selector, {
  addDirective: function(directive) {
    assert.argumentTypes(directive, DirectiveClass);
    var annotation = directive.annotation,
        type = directive.clazz,
        selector = annotation.selector;
    var match;
    if (!selector) {
      throw new Error(("Missing selector annotation for " + type));
    }
    this.elementSelector.addDirective(directive);
  },
  matchElement: function(element) {
    assert.argumentTypes(element, HTMLElement);
    var builder = new SelectedElementBindings(),
        nodeName = element.tagName.toLowerCase(),
        attributeList = element.attributes,
        attrs = {},
        classList = element.classList,
        classes = {},
        i,
        length,
        j,
        jlength,
        partialSelection;
    if (nodeName == 'input' && !attributeList['type']) {
      attributeList['type'] = 'text';
    }
    partialSelection = this.elementSelector.selectNode(builder, partialSelection, nodeName);
    for (i = 0, length = classList.length; i < length; i++) {
      var className = classList[i];
      classes[className] = true;
      partialSelection = this.elementSelector.selectClass(builder, partialSelection, className);
    }
    for (i = 0, length = attributeList.length; i < length; i++) {
      var attr = attributeList[i],
          attrName = attr.name,
          attrValue = attr.value;
      attrs[attrName] = attrValue;
      this.nonElementSelector.selectBindAttr(builder, attrName, attrValue);
      partialSelection = this.elementSelector.selectAttr(builder, partialSelection, attrName, attrValue);
    }
    while (partialSelection != null) {
      var elementSelectors = partialSelection;
      partialSelection = null;
      for (i = 0, length = elementSelectors.length; i < length; i++) {
        var elementSelector = elementSelectors[i];
        for (var className in classes) {
          partialSelection = elementSelector.selectClass(builder, partialSelection, className);
        }
        for (var attrName in attrs) {
          partialSelection = elementSelector.selectAttr(builder, partialSelection, attrName, attrs[attrName]);
        }
      }
    }
    return assert.returnType((builder), SelectedElementBindings);
  },
  matchText: function(node) {
    assert.argumentTypes(node, Text);
    return assert.returnType((this.nonElementSelector.selectTextNode(node.nodeValue)), $traceurRuntime.type.string);
  }
}, {});
Selector.parameters = [[ArrayOfDirectiveClass], [CompilerConfig]];
Selector.prototype.addDirective.parameters = [[DirectiveClass]];
Selector.prototype.matchElement.parameters = [[HTMLElement]];
Selector.prototype.matchText.parameters = [[Text]];
module.exports = {
  get SelectedElementBindings() {
    return SelectedElementBindings;
  },
  get Selector() {
    return Selector;
  },
  __esModule: true
};
