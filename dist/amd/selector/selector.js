define(["assert", '../annotations', '../directive_class', './element_selector', 'assert', './non_element_selector', '../compiler_config'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6) {
  "use strict";
  var __moduleName = "selector";
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
  if (!$__5 || !$__5.__esModule)
    $__5 = {'default': $__5};
  if (!$__6 || !$__6.__esModule)
    $__6 = {'default': $__6};
  var assert = ($__0).assert;
  var Directive = ($__1).Directive;
  var $__8 = $__2,
      ArrayOfDirectiveClass = $__8.ArrayOfDirectiveClass,
      DirectiveClass = $__8.DirectiveClass;
  var $__8 = $__3,
      ElementSelector = $__8.ElementSelector,
      SelectedElementBindings = $__8.SelectedElementBindings;
  var assert = ($__4).assert;
  var NonElementSelector = ($__5).NonElementSelector;
  var CompilerConfig = ($__6).CompilerConfig;
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
  return {
    get SelectedElementBindings() {
      return SelectedElementBindings;
    },
    get Selector() {
      return Selector;
    },
    __esModule: true
  };
});
