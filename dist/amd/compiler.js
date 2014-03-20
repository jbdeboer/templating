define(["assert", './types', './node_container', './directive_class', './view_factory', './selector/selector', './annotations', './tree_array', 'di/annotations', './compiler_config'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6,$__7,$__8,$__9) {
  "use strict";
  var __moduleName = "compiler";
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
  if (!$__7 || !$__7.__esModule)
    $__7 = {'default': $__7};
  if (!$__8 || !$__8.__esModule)
    $__8 = {'default': $__8};
  if (!$__9 || !$__9.__esModule)
    $__9 = {'default': $__9};
  var assert = ($__0).assert;
  var $__11 = $__1,
      NodeAttrs = $__11.NodeAttrs,
      ArrayOfClass = $__11.ArrayOfClass,
      ArrayLikeOfNodes = $__11.ArrayLikeOfNodes,
      ArrayOfString = $__11.ArrayOfString;
  var $__11 = $__2,
      NodeContainer = $__11.NodeContainer,
      SimpleNodeContainer = $__11.SimpleNodeContainer;
  var $__11 = $__3,
      DirectiveClass = $__11.DirectiveClass,
      ArrayOfDirectiveClass = $__11.ArrayOfDirectiveClass;
  var $__11 = $__4,
      ViewFactory = $__11.ViewFactory,
      ElementBinder = $__11.ElementBinder,
      NonElementBinder = $__11.NonElementBinder,
      DirectiveClassWithViewFactory = $__11.DirectiveClassWithViewFactory;
  var $__11 = $__5,
      Selector = $__11.Selector,
      SelectedElementBindings = $__11.SelectedElementBindings;
  var TemplateDirective = ($__6).TemplateDirective;
  var $__11 = $__7,
      TreeArray = $__11.TreeArray,
      reduceTree = $__11.reduceTree;
  var Inject = ($__8).Inject;
  var CompilerConfig = ($__9).CompilerConfig;
  var Compiler = function Compiler(config) {
    assert.argumentTypes(config, CompilerConfig);
    this.config = config;
  };
  ($traceurRuntime.createClass)(Compiler, {
    compileNodes: function(nodes, directives) {
      assert.argumentTypes(nodes, ArrayLikeOfNodes, directives, ArrayOfClass);
      return assert.returnType((this.compileChildNodes(new SimpleNodeContainer(nodes), directives)), ViewFactory);
    },
    compileChildNodes: function(container, directives) {
      assert.argumentTypes(container, NodeContainer, directives, ArrayOfClass);
      var directiveClasses = this.config.directiveClassesForDirectives(directives);
      return assert.returnType((this._compileChildNodes(container, new Selector(directiveClasses, this.config))), ViewFactory);
    },
    _compileChildNodes: function(container, selector) {
      assert.argumentTypes(container, NodeContainer, selector, Selector);
      return assert.returnType((new CompileRun(selector).compile(container).createViewFactory(container)), ViewFactory);
    }
  }, {});
  Compiler.annotations = [new Inject(CompilerConfig)];
  Compiler.parameters = [[CompilerConfig]];
  Compiler.prototype.compileNodes.parameters = [[ArrayLikeOfNodes], [ArrayOfClass]];
  Compiler.prototype.compileChildNodes.parameters = [[NodeContainer], [ArrayOfClass]];
  Compiler.prototype._compileChildNodes.parameters = [[NodeContainer], [Selector]];
  var CompileElement = function CompileElement(element, binder, level) {
    assert.argumentTypes(element, HTMLElement, binder, ElementBinder, level, $traceurRuntime.type.number);
    this.element = element;
    this.binder = binder;
    this.level = level;
  };
  ($traceurRuntime.createClass)(CompileElement, {}, {});
  CompileElement.parameters = [[HTMLElement], [ElementBinder], [$traceurRuntime.type.number]];
  var ArrayOfCompileElements = function ArrayOfCompileElements() {
    throw new Error('not instantiable as just a type');
  };
  ($traceurRuntime.createClass)(ArrayOfCompileElements, {}, {assert: function(obj) {
      assert(obj).is(assert.arrayOf(CompileElement));
    }});
  var CompileRun = function CompileRun(selector) {
    var initialCompileElement = arguments[1] !== (void 0) ? arguments[1] : null;
    assert.argumentTypes(selector, Selector, initialCompileElement, CompileElement);
    this.selector = selector;
    this.initialCompileElement = initialCompileElement;
  };
  var $CompileRun = CompileRun;
  ($traceurRuntime.createClass)(CompileRun, {
    compile: function(container) {
      assert.argumentTypes(container, NodeContainer);
      this.compileElements = [new CompileElement(null, new ElementBinder(), 0)];
      if (this.initialCompileElement) {
        this.compileElements.push(this.initialCompileElement);
        this.initialCompileElement.level = 1;
      }
      this.compileRecurse(container, this.compileElements[this.compileElements.length - 1]);
      return assert.returnType((this), $CompileRun);
    },
    createViewFactory: function(container) {
      assert.argumentTypes(container, NodeContainer);
      var binders = [];
      reduceTree(this.compileElements, collectNonEmptyBindersAndCalcBinderTreeLevel, -1);
      return new ViewFactory(container, binders);
      function collectNonEmptyBindersAndCalcBinderTreeLevel(parentLevel, compileElement, index) {
        var newLevel;
        var binder = compileElement.binder;
        if (index === 0 || binder.hasBindings()) {
          newLevel = parentLevel + 1;
          if (index > 0) {
            if (compileElement.element.className) {
              compileElement.element.className += ' ng-binder';
            } else {
              compileElement.element.className = 'ng-binder';
            }
          }
          binder.setLevel(newLevel);
          binders.push(binder);
        } else {
          newLevel = parentLevel;
        }
        return newLevel;
      }
    },
    compileRecurse: function(container, parentElement) {
      assert.argumentTypes(container, NodeContainer, parentElement, CompileElement);
      var nodes = container.childNodes,
          nodeCount = nodes.length,
          nodeIndex,
          nodeType,
          node,
          nonElementBinder;
      for (nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
        node = nodes[nodeIndex];
        nodeType = node.nodeType;
        nonElementBinder = null;
        if (nodeType == Node.ELEMENT_NODE) {
          var matchedBindings = this.selector.matchElement(node);
          var component;
          if (matchedBindings.component) {
            component = this._compileComponentDirective(matchedBindings.component);
          }
          var binder = new ElementBinder({
            attrs: matchedBindings.attrs,
            decorators: matchedBindings.decorators,
            component: component
          });
          var compileElement = new CompileElement(node, binder, parentElement.level + 1);
          if (matchedBindings.template) {
            nonElementBinder = this._compileTemplateDirective(node, matchedBindings.template, compileElement);
          } else {
            this.compileElements.push(compileElement);
            this.compileRecurse(node, compileElement);
          }
        } else if (nodeType == Node.TEXT_NODE) {
          nonElementBinder = this._compileTextNode(node, nodeIndex);
        }
        if (nonElementBinder) {
          parentElement.binder.addNonElementBinder(nonElementBinder, nodeIndex);
        }
      }
    },
    _compileTextNode: function(node) {
      assert.argumentTypes(node, Text);
      var bindExpression = this.selector.matchText(node);
      if (bindExpression) {
        return new NonElementBinder({attrs: new NodeAttrs({bind: {'text-content': this.selector.matchText(node)}})});
      }
    },
    _compileTemplateDirective: function(node, templateDirective, compileElement) {
      assert.argumentTypes(node, HTMLElement, templateDirective, DirectiveClass, compileElement, CompileElement);
      this._replaceNodeWithComment(node, 'template anchor');
      var initialCompiledTemplateElement = null;
      var templateContainer = node.content ? node.content : node;
      var templateNodeAttrs = compileElement.binder.attrs;
      var viewFactoryRoot = templateContainer;
      if (node.nodeName !== 'TEMPLATE') {
        viewFactoryRoot = document.createDocumentFragment();
        viewFactoryRoot.appendChild(node);
        if (compileElement.binder.hasBindings()) {
          initialCompiledTemplateElement = compileElement;
        }
        templateNodeAttrs = compileElement.binder.attrs.split(templateDirective.annotation.exports || []);
      }
      var viewFactory = new $CompileRun(this.selector, initialCompiledTemplateElement).compile(templateContainer).createViewFactory(viewFactoryRoot);
      return assert.returnType((new NonElementBinder({
        attrs: templateNodeAttrs,
        template: {
          directive: templateDirective,
          viewFactory: viewFactory
        }
      })), NonElementBinder);
    },
    _replaceNodeWithComment: function(node, commentText) {
      var parent = node.parentNode;
      var comment = document.createComment(commentText);
      parent.insertBefore(comment, node);
      parent.removeChild(node);
      return comment;
    },
    _compileComponentDirective: function(componentDirective) {
      assert.argumentTypes(componentDirective, DirectiveClass);
      var template = componentDirective.annotation.template;
      var viewFactory;
      if (template instanceof ViewFactory) {
        viewFactory = template;
      } else {
        var templateContainer = document.createElement('div');
        templateContainer.innerHTML = template;
        viewFactory = new $CompileRun(this.selector).compile(templateContainer).createViewFactory(templateContainer);
      }
      return assert.returnType(({
        directive: componentDirective,
        viewFactory: viewFactory
      }), DirectiveClassWithViewFactory);
    }
  }, {});
  CompileRun.parameters = [[Selector], [CompileElement]];
  CompileRun.prototype.compile.parameters = [[NodeContainer]];
  CompileRun.prototype.createViewFactory.parameters = [[NodeContainer]];
  CompileRun.prototype.compileRecurse.parameters = [[NodeContainer], [CompileElement]];
  CompileRun.prototype._compileTextNode.parameters = [[Text]];
  CompileRun.prototype._compileTemplateDirective.parameters = [[HTMLElement], [DirectiveClass], [CompileElement]];
  CompileRun.prototype._compileComponentDirective.parameters = [[DirectiveClass]];
  return {
    get Compiler() {
      return Compiler;
    },
    __esModule: true
  };
});
