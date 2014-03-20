define(["assert", 'di/annotations', './view'], function($__0,$__1,$__2) {
  "use strict";
  var __moduleName = "event_handler";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var assert = ($__0).assert;
  var Inject = ($__1).Inject;
  var View = ($__2).View;
  var EventHandler = function EventHandler(view) {
    this.view = view;
  };
  ($traceurRuntime.createClass)(EventHandler, {listen: function(node, eventName, expression) {
      assert.argumentTypes(node, Node, eventName, $traceurRuntime.type.string, expression, $traceurRuntime.type.string);
    }}, {});
  EventHandler.annotations = [new Inject(View)];
  EventHandler.prototype.listen.parameters = [[Node], [$traceurRuntime.type.string], [$traceurRuntime.type.string]];
  return {
    get EventHandler() {
      return EventHandler;
    },
    __esModule: true
  };
});
