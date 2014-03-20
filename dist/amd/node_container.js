define(["assert", './types'], function($__0,$__1) {
  "use strict";
  var __moduleName = "node_container";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var assert = ($__0).assert;
  var ArrayLikeOfNodes = ($__1).ArrayLikeOfNodes;
  var NodeContainer = function NodeContainer() {};
  ($traceurRuntime.createClass)(NodeContainer, {}, {assert: function(obj) {
      assert(obj).is(assert.structure({
        cloneNode: Function,
        querySelectorAll: Function,
        childNodes: ArrayLikeOfNodes,
        nodeType: assert.number
      }));
    }});
  var SimpleNodeContainer = function SimpleNodeContainer(nodes) {
    assert.argumentTypes(nodes, ArrayLikeOfNodes);
    this.childNodes = Array.prototype.slice.call(nodes);
    this.nodeType = -1;
  };
  var $SimpleNodeContainer = SimpleNodeContainer;
  ($traceurRuntime.createClass)(SimpleNodeContainer, {
    cloneNode: function(deepClone) {
      var clonedNodes;
      if (!deepClone) {
        clonedNodes = Array.prototype.slice.call(this.childNodes);
      } else {
        clonedNodes = this.childNodes.map((function(node) {
          return node.cloneNode(deepClone);
        }));
      }
      return new $SimpleNodeContainer(clonedNodes);
    },
    querySelectorAll: function(selector) {
      var res = [];
      var matchesFnNames = ['matches', 'matchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'];
      this.childNodes.forEach((function(node) {
        var $__4;
        if (matchesSelector(node, selector)) {
          res.push(node);
        }
        if (node.querySelectorAll) {
          ($__4 = res).push.apply($__4, $traceurRuntime.toObject(node.querySelectorAll(selector)));
        }
      }));
      return res;
    }
  }, {});
  SimpleNodeContainer.parameters = [[ArrayLikeOfNodes]];
  var matchesSelectorFnName = findMatchesSelectorFnName();
  function findMatchesSelectorFnName() {
    var res = null;
    var el = document.createElement('div');
    ['matches', 'matchesSelector', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].forEach((function(fnName) {
      if (!res && el[fnName]) {
        res = fnName;
      }
    }));
    if (!res) {
      throw new Error('matchesSelector is not supported on this platform!');
    }
    return res;
  }
  function matchesSelector(node, selector) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }
    return node[matchesSelectorFnName](selector);
  }
  return {
    get NodeContainer() {
      return NodeContainer;
    },
    get SimpleNodeContainer() {
      return SimpleNodeContainer;
    },
    get matchesSelector() {
      return matchesSelector;
    },
    __esModule: true
  };
});