define(["assert", './types', './node_container', './directive_class', 'assert', './annotations', 'di/injector', 'di/annotations', './view', './tree_array', './event_handler', './tree_array', './ng_node'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6,$__7,$__8,$__9,$__10,$__11,$__12) {
  "use strict";
  var __moduleName = "view_factory";
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
  if (!$__10 || !$__10.__esModule)
    $__10 = {'default': $__10};
  if (!$__11 || !$__11.__esModule)
    $__11 = {'default': $__11};
  if (!$__12 || !$__12.__esModule)
    $__12 = {'default': $__12};
  var assert = ($__0).assert;
  var NodeAttrs = ($__1).NodeAttrs;
  var NodeContainer = ($__2).NodeContainer;
  var $__15 = $__3,
      DirectiveClass = $__15.DirectiveClass,
      ArrayOfDirectiveClass = $__15.ArrayOfDirectiveClass;
  var assert = ($__4).assert;
  var $__15 = $__5,
      TemplateDirective = $__15.TemplateDirective,
      ComponentDirective = $__15.ComponentDirective,
      DecoratorDirective = $__15.DecoratorDirective,
      EXECUTION_CONTEXT = $__15.EXECUTION_CONTEXT;
  var Injector = ($__6).Injector;
  var $__15 = $__7,
      Inject = $__15.Inject,
      Provide = $__15.Provide;
  var $__15 = $__8,
      ViewPort = $__15.ViewPort,
      View = $__15.View;
  var TreeArray = ($__9).TreeArray;
  var EventHandler = ($__10).EventHandler;
  var reduceTree = ($__11).reduceTree;
  var NgNode = ($__12).NgNode;
  var ViewFactory = function ViewFactory(templateContainer, elementBinders) {
    assert.argumentTypes(templateContainer, NodeContainer, elementBinders, TreeArrayOfElementBinder);
    this.templateContainer = templateContainer;
    this.elementBinders = elementBinders;
  };
  ($traceurRuntime.createClass)(ViewFactory, {createView: function(injector, executionContext) {
      var inplace = arguments[2] !== (void 0) ? arguments[2] : false;
      assert.argumentTypes(injector, Injector, executionContext, Object, inplace, $traceurRuntime.type.boolean);
      var container;
      if (inplace) {
        container = this.templateContainer;
      } else {
        container = this.templateContainer.cloneNode(true);
      }
      function viewProvider(injector) {
        assert.argumentTypes(injector, Injector);
        return new View(container, injector, executionContext);
      }
      viewProvider.annotations = [new Provide(View), new Inject(Injector)];
      viewProvider.parameters = [[Injector]];
      var viewInjector = injector.createChild([viewProvider]);
      var view = viewInjector.get(View);
      var boundElements = container.querySelectorAll('.ng-binder');
      reduceTree(this.elementBinders, bindBinder, viewInjector);
      return assert.returnType((view), View);
      function bindBinder(parentInjector, binder, index) {
        var childInjector,
            element;
        if (index === 0) {
          element = container;
          childInjector = parentInjector;
        } else {
          element = boundElements[index - 1];
          childInjector = binder.bind(parentInjector, element);
        }
        binder.nonElementBinders.forEach((function(nonElementBinder) {
          var nonElementNode = element.childNodes[nonElementBinder.indexInParent];
          nonElementBinder.bind(childInjector, nonElementNode);
        }));
        return childInjector;
      }
    }}, {});
  ViewFactory.parameters = [[NodeContainer], [TreeArrayOfElementBinder]];
  ViewFactory.prototype.createView.parameters = [[Injector], [Object], [$traceurRuntime.type.boolean]];
  var DirectiveClassWithViewFactory = function DirectiveClassWithViewFactory() {
    assert.fail('type is not instantiable');
  };
  ($traceurRuntime.createClass)(DirectiveClassWithViewFactory, {}, {assert: function(obj) {
      assert(obj).is(assert.structure({
        directive: DirectiveClass,
        viewFactory: ViewFactory
      }));
    }});
  var TreeArrayOfElementBinder = function TreeArrayOfElementBinder() {
    assert.fail('type is not instantiable');
  };
  ($traceurRuntime.createClass)(TreeArrayOfElementBinder, {}, {assert: function(obj) {
      assert(obj).is(assert.arrayOf(ElementBinder));
      assert(obj).is(TreeArray);
    }});
  var NodeBinderArgs = function NodeBinderArgs() {};
  ($traceurRuntime.createClass)(NodeBinderArgs, {}, {assert: function(obj) {
      obj.attrs && assert(obj.attrs).is(NodeAttrs);
    }});
  var ElementBinderArgs = function ElementBinderArgs() {
    $traceurRuntime.defaultSuperCall(this, $ElementBinderArgs.prototype, arguments);
  };
  var $ElementBinderArgs = ElementBinderArgs;
  ($traceurRuntime.createClass)(ElementBinderArgs, {}, {assert: function(obj) {
      obj.decorators && assert(obj.decorators).is(ArrayOfDirectiveClass);
      obj.component && assert(obj.component).is(DirectiveClassWithViewFactory);
    }}, NodeBinderArgs);
  var ArrayOfNonElementBinder = function ArrayOfNonElementBinder() {
    assert.fail('type is not instantiable');
  };
  ($traceurRuntime.createClass)(ArrayOfNonElementBinder, {}, {assert: function(obj) {
      assert(obj).is(assert.arrayOf(NonElementBinder));
    }});
  var NonElementBinderArgs = function NonElementBinderArgs() {
    $traceurRuntime.defaultSuperCall(this, $NonElementBinderArgs.prototype, arguments);
  };
  var $NonElementBinderArgs = NonElementBinderArgs;
  ($traceurRuntime.createClass)(NonElementBinderArgs, {}, {assert: function(obj) {
      if (obj.template) {
        assert(obj.template).is(DirectiveClassWithViewFactory);
      }
    }}, NodeBinderArgs);
  var NodeBinder = function NodeBinder() {
    var data = arguments[0] !== (void 0) ? arguments[0] : {};
    assert.argumentTypes(data, NodeBinderArgs);
    this.attrs = data.attrs || new NodeAttrs();
  };
  ($traceurRuntime.createClass)(NodeBinder, {
    hasBindings: function() {
      for (var prop in this.attrs.bind) {
        return true;
      }
      for (var prop in this.attrs.event) {
        return true;
      }
      return false;
    },
    bind: function(injector, node) {
      var $__13 = this;
      assert.argumentTypes(injector, Injector, node, Node);
      var self = this;
      function ngNodeProvider(injector) {
        assert.argumentTypes(injector, Injector);
        return new NgNode(node, {
          injector: injector,
          directives: []
        });
      }
      ngNodeProvider.annotations = [new Provide(NgNode), new Inject(Injector)];
      ngNodeProvider.parameters = [[Injector]];
      var providers = [ngNodeProvider];
      this._collectDiProviders(providers);
      var childInjector = injector.createChild(providers);
      var ngNode = childInjector.get(NgNode);
      var view = injector.get(View);
      var directiveClasses = [];
      this._collectDirectives(directiveClasses);
      directiveClasses.forEach((function(directiveClass) {
        var directiveInstance = childInjector.get(directiveClass.clazz);
        $__13._initExportedProperty(node, directiveInstance, directiveClass.annotation.exports || []);
        ngNode.data().directives.push(directiveInstance);
      }));
      var attrName;
      for (attrName in this.attrs.bind) {
        this._setupBidiBinding(view, ngNode, attrName, this.attrs.bind[attrName]);
      }
      var eventHandler = childInjector.get(EventHandler);
      for (attrName in this.attrs.event) {
        eventHandler.listen(node, attrName, this.attrs.event[attrName]);
      }
      return assert.returnType((childInjector), Injector);
    },
    _setupBidiBinding: function(view, ngNode, property, expression) {
      var lastValue;
      view.watch(expression, (function(value) {
        if (value !== lastValue) {
          ngNode.prop(property, value);
        }
        lastValue = value;
      }), view.executionContext);
      view.watch('prop("' + property + '")', (function(value) {
        if (value !== lastValue) {
          view.assign(expression, value, view.executionContext);
        }
        lastValue = value;
      }), ngNode);
    },
    _initExportedProperty: function(node, directiveInstance, exportedProps) {
      var self = this;
      exportedProps.forEach(function(propName) {
        if (propName in node) {
          throw new Error('The directive ' + JSON.stringify(directiveClass) + ' tries to export the property ' + propName + ' although the property is already present');
        }
        Object.defineProperty(node, propName, {
          get: (function() {
            return directiveInstance[propName];
          }),
          set: (function(value) {
            directiveInstance[propName] = value;
          })
        });
        if (propName in self.attrs.init) {
          node[propName] = self.attrs.init[propName];
        }
      });
    },
    _collectDirectives: function(target) {},
    _collectDiProviders: function(target) {}
  }, {});
  NodeBinder.parameters = [[NodeBinderArgs]];
  NodeBinder.prototype.bind.parameters = [[Injector], [Node]];
  var ElementBinder = function ElementBinder() {
    var data = arguments[0] !== (void 0) ? arguments[0] : {};
    assert.argumentTypes(data, ElementBinderArgs);
    $traceurRuntime.superCall(this, $ElementBinder.prototype, "constructor", [data]);
    this.decorators = data.decorators || [];
    this.component = data.component;
    this.nonElementBinders = [];
    this.level = null;
  };
  var $ElementBinder = ElementBinder;
  ($traceurRuntime.createClass)(ElementBinder, {
    addNonElementBinder: function(binder, indexInParent) {
      assert.argumentTypes(binder, NonElementBinder, indexInParent, $traceurRuntime.type.number);
      this.nonElementBinders.push(binder);
      binder.setIndexInParent(indexInParent);
    },
    setLevel: function(level) {
      assert.argumentTypes(level, $traceurRuntime.type.number);
      this.level = level;
    },
    hasBindings: function() {
      return $traceurRuntime.superCall(this, $ElementBinder.prototype, "hasBindings", []) || this.component || this.decorators.length || this.nonElementBinders.length;
    },
    bind: function(injector, element) {
      assert.argumentTypes(injector, Injector, element, HTMLElement);
      var childInjector = $traceurRuntime.superCall(this, $ElementBinder.prototype, "bind", [injector, element]);
      if (this.component) {
        this._bindComponentTemplate(childInjector, element);
      }
      return assert.returnType((childInjector), Injector);
    },
    _collectDirectives: function(target) {
      var $__16;
      ($__16 = target).push.apply($__16, $traceurRuntime.toObject(this.decorators));
      if (this.component) {
        target.push(this.component.directive);
      }
    },
    _bindComponentTemplate: function(injector, element) {
      assert.argumentTypes(injector, Injector, element, HTMLElement);
      var componentInstance = injector.get(this.component.directive.clazz);
      var view = this.component.viewFactory.createView(injector, componentInstance);
      var root = element.createShadowRoot();
      view.appendTo(root);
    }
  }, {}, NodeBinder);
  ElementBinder.parameters = [[ElementBinderArgs]];
  ElementBinder.prototype.addNonElementBinder.parameters = [[NonElementBinder], [$traceurRuntime.type.number]];
  ElementBinder.prototype.setLevel.parameters = [[$traceurRuntime.type.number]];
  ElementBinder.prototype.bind.parameters = [[Injector], [HTMLElement]];
  ElementBinder.prototype._bindComponentTemplate.parameters = [[Injector], [HTMLElement]];
  var NonElementBinder = function NonElementBinder() {
    var data = arguments[0] !== (void 0) ? arguments[0] : {};
    assert.argumentTypes(data, NonElementBinderArgs);
    $traceurRuntime.superCall(this, $NonElementBinder.prototype, "constructor", [data]);
    this.template = data.template;
    this.indexInParent = null;
  };
  var $NonElementBinder = NonElementBinder;
  ($traceurRuntime.createClass)(NonElementBinder, {
    setIndexInParent: function(index) {
      assert.argumentTypes(index, $traceurRuntime.type.number);
      this.indexInParent = index;
    },
    _collectDirectives: function(target) {
      if (this.template) {
        target.push(this.template.directive);
      }
    },
    _collectDiProviders: function(target) {
      $traceurRuntime.superCall(this, $NonElementBinder.prototype, "_collectDiProviders", [target]);
      var self = this;
      function viewPortProvider(ngNode) {
        return new ViewPort(ngNode.nativeNode());
      }
      viewPortProvider.annotations = [new Provide(ViewPort), new Inject(NgNode)];
      function viewFactoryProvider() {
        return self.template.viewFactory;
      }
      viewFactoryProvider.annotations = [new Provide(ViewFactory)];
      if (this.template) {
        target.push(viewPortProvider, viewFactoryProvider);
      }
    }
  }, {}, NodeBinder);
  NonElementBinder.parameters = [[NonElementBinderArgs]];
  NonElementBinder.prototype.setIndexInParent.parameters = [[$traceurRuntime.type.number]];
  return {
    get ViewFactory() {
      return ViewFactory;
    },
    get DirectiveClassWithViewFactory() {
      return DirectiveClassWithViewFactory;
    },
    get TreeArrayOfElementBinder() {
      return TreeArrayOfElementBinder;
    },
    get NodeBinderArgs() {
      return NodeBinderArgs;
    },
    get ElementBinderArgs() {
      return ElementBinderArgs;
    },
    get ArrayOfNonElementBinder() {
      return ArrayOfNonElementBinder;
    },
    get NonElementBinderArgs() {
      return NonElementBinderArgs;
    },
    get ElementBinder() {
      return ElementBinder;
    },
    get NonElementBinder() {
      return NonElementBinder;
    },
    __esModule: true
  };
});
