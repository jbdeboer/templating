"use strict";
var __moduleName = "view_factory";
var assert = require("assert").assert;
var NodeAttrs = require('./types').NodeAttrs;
var NodeContainer = require('./node_container').NodeContainer;
var $__2 = require('./directive_class'),
    DirectiveClass = $__2.DirectiveClass,
    ArrayOfDirectiveClass = $__2.ArrayOfDirectiveClass;
var assert = require('assert').assert;
var $__2 = require('./annotations'),
    TemplateDirective = $__2.TemplateDirective,
    ComponentDirective = $__2.ComponentDirective,
    DecoratorDirective = $__2.DecoratorDirective,
    EXECUTION_CONTEXT = $__2.EXECUTION_CONTEXT;
var Injector = require('di/injector').Injector;
var $__2 = require('di/annotations'),
    Inject = $__2.Inject,
    Provide = $__2.Provide;
var $__2 = require('./view'),
    ViewPort = $__2.ViewPort,
    View = $__2.View;
var TreeArray = require('./tree_array').TreeArray;
var EventHandler = require('./event_handler').EventHandler;
var reduceTree = require('./tree_array').reduceTree;
var NgNode = require('./ng_node').NgNode;
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
    var $__0 = this;
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
      $__0._initExportedProperty(node, directiveInstance, directiveClass.annotation.exports || []);
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
    var $__3;
    ($__3 = target).push.apply($__3, $traceurRuntime.toObject(this.decorators));
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
module.exports = {
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
