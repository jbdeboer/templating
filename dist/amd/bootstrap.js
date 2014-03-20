define(["assert", 'di/injector', 'templating/compiler', 'templating/types'], function($__0,$__1,$__2,$__3) {
  "use strict";
  var __moduleName = "bootstrap";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  var assert = ($__0).assert;
  var Injector = ($__1).Injector;
  var Compiler = ($__2).Compiler;
  var ArrayOfClass = ($__3).ArrayOfClass;
  var apps = Array.prototype.slice.call(document.querySelectorAll('[ng-app]'));
  var moduleScripts = Array.prototype.slice.call(document.querySelectorAll('module'));
  var modulesSrc = moduleScripts.map((function(moduleScript) {
    return moduleScript.getAttribute('src');
  }));
  require(modulesSrc, function() {
    var modules = Array.prototype.slice.call(arguments);
    var moduleClasses = extractClasses(modules);
    apps.forEach(function(appRootElement) {
      createApp(appRootElement, moduleClasses);
    });
  });
  function createApp(appRootElement, moduleClasses) {
    var rootInjector = new Injector();
    var compiler = rootInjector.get(Compiler);
    var vf = compiler.compileNodes([appRootElement], moduleClasses);
    vf.createView(rootInjector, {}, true);
  }
  function extractClasses(modules) {
    var res = [];
    modules.forEach((function(module) {
      var exportedValue;
      for (var prop in module) {
        exportedValue = module[prop];
        if (typeof exportedValue === 'function') {
          res.push(exportedValue);
        }
      }
    }));
    return assert.returnType((res), ArrayOfClass);
  }
  return {};
});
