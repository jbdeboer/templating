"use strict";
var __moduleName = "ng_if";
var TemplateDirective = require('../annotations').TemplateDirective;
var Injector = require('di/injector').Injector;
var Inject = require('di/annotations').Inject;
var $__1 = require('../view'),
    View = $__1.View,
    ViewPort = $__1.ViewPort;
var ViewFactory = require('../view_factory').ViewFactory;
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
module.exports = {
  get NgIf() {
    return NgIf;
  },
  __esModule: true
};
