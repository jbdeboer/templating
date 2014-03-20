"use strict";
var __moduleName = "context_watcher";
var EXECUTION_CONTEXT = require('./annotations').EXECUTION_CONTEXT;
var ContextWatcher = function ContextWatcher(executionContext) {
  this.executionContext = executionContext;
};
($traceurRuntime.createClass)(ContextWatcher, {}, {});
ContextWatcher.annotations = [new Inject(EXECUTION_CONTEXT)];
module.exports = {
  get ContextWatcher() {
    return ContextWatcher;
  },
  __esModule: true
};
