define(['./annotations'], function($__0) {
  "use strict";
  var __moduleName = "context_watcher";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var EXECUTION_CONTEXT = ($__0).EXECUTION_CONTEXT;
  var ContextWatcher = function ContextWatcher(executionContext) {
    this.executionContext = executionContext;
  };
  ($traceurRuntime.createClass)(ContextWatcher, {}, {});
  ContextWatcher.annotations = [new Inject(EXECUTION_CONTEXT)];
  return {
    get ContextWatcher() {
      return ContextWatcher;
    },
    __esModule: true
  };
});
