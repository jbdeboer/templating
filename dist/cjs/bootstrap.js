"use strict";
var __moduleName = "bootstrap";
var assert = require("assert").assert;
var Injector = require('di/injector').Injector;
var Compiler = require('templating/compiler').Compiler;
var ArrayOfClass = require('templating/types').ArrayOfClass;
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
