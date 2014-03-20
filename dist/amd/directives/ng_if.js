define(['../annotations', 'di/injector', 'di/annotations', '../view', '../view_factory'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  var __moduleName = "ng_if";
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
  var TemplateDirective = ($__0).TemplateDirective;
  var Injector = ($__1).Injector;
  var Inject = ($__2).Inject;
  var $__6 = $__3,
      View = $__6.View,
      ViewPort = $__6.ViewPort;
  var ViewFactory = ($__4).ViewFactory;
  var NgIf = function NgIf(viewFactory, viewPort, parentView, injector) {
    this.viewPort = viewPort;
    this.viewFactory = viewFactory;
    this.injector = injector;
    this.parentView = parentView;
    this._ngIf = null;
    this.view = null;
    Object.defineProperty(this, 'ngIf', {
      get: function() {
        return this.ngIfGetter();
      },
      set: function(value) {
        this.ngIfSetter(value);
      }
    });
  };
  ($traceurRuntime.createClass)(NgIf, {
    ngIfGetter: function() {
      return this._ngIf;
    },
    ngIfSetter: function(value) {
      if (typeof value === 'string') {
        value = value === 'true';
      }
      this._ngIf = value;
      if (!value && this.view) {
        this.viewPort.remove(this.view);
        this.view = null;
      }
      if (value) {
        this.view = this.viewFactory.createView(this.injector, this.parentView.executionContext);
        this.viewPort.append(this.view);
      }
    }
  }, {});
  NgIf.annotations = [new TemplateDirective({
    selector: '[ng-if]',
    exports: ['ngIf']
  }), new Inject(ViewFactory, ViewPort, View, Injector)];
  return {
    get NgIf() {
      return NgIf;
    },
    __esModule: true
  };
});
