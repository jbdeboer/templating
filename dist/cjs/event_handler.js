"use strict";
var __moduleName = "event_handler";
var assert = require("assert").assert;
var Inject = require('di/annotations').Inject;
var View = require('./view').View;
var EventHandler = function EventHandler(view) {
  this.view = view;
};
($traceurRuntime.createClass)(EventHandler, {listen: function(node, eventName, expression) {
    assert.argumentTypes(node, Node, eventName, $traceurRuntime.type.string, expression, $traceurRuntime.type.string);
  }}, {});
EventHandler.annotations = [new Inject(View)];
EventHandler.prototype.listen.parameters = [[Node], [$traceurRuntime.type.string], [$traceurRuntime.type.string]];
module.exports = {
  get EventHandler() {
    return EventHandler;
  },
  __esModule: true
};
