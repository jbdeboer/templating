"use strict";
var __moduleName = "precompiler";
function precompile(config, loder, html) {
  var data = {};
  var dependencies = [];
  var res = "\nimport {ViewFactory, ElementBinder} from \"templating/view_factory\";\n\nfunction createNodeContainer(html) {\n  var el = document.createElement('div');\n  el.innerHTML = html;\n  return el;\n}\n\nvar rootBinder = new ElementBinder();\nrootBinder.setLevel(0);\n// TODO: use export default\nexport var viewFactory = new ViewFactory(\n  createNodeContainer('<div></div>'), \n  [\n    rootBinder\n  ]\n);\n";
  return Promise.resolve(res);
}
module.exports = {
  get precompile() {
    return precompile;
  },
  __esModule: true
};
