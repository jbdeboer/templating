define(["assert", 'assert'], function($__0,$__1) {
  "use strict";
  var __moduleName = "tree_array";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var assert = ($__0).assert;
  var assert = ($__1).assert;
  var TreeArrayNode = function TreeArrayNode() {
    throw new Error('not instantiable');
  };
  ($traceurRuntime.createClass)(TreeArrayNode, {}, {assert: function(obj) {
      assert(obj).is(assert.structure({level: assert.number}));
    }});
  var TreeArray = function TreeArray() {
    throw new Error('not instantiable');
  };
  ($traceurRuntime.createClass)(TreeArray, {}, {assert: function(obj) {
      assert(obj).is(assert.arrayOf(TreeArrayNode));
      var prevLevel = -1;
      obj.forEach((function(node) {
        var newLevel = node.level;
        if (newLevel === null) {
          assert.fail('level must be set');
        }
        if (newLevel < 0) {
          assert.fail('level must be >=0');
        }
        if (newLevel >= prevLevel && newLevel - prevLevel > 1) {
          assert.fail("levels can't be skipped");
        }
        prevLevel = newLevel;
      }));
    }});
  function reduceTree(tree, reduceCallback) {
    var initValue = arguments[2] !== (void 0) ? arguments[2] : null;
    assert.argumentTypes(tree, TreeArray, reduceCallback, $traceurRuntime.type.any, initValue, $traceurRuntime.type.any);
    var stack = [],
        i,
        currNode,
        prevValue,
        leafeValues = [];
    for (i = 0; i < tree.length; i++) {
      currNode = tree[i];
      if (stack.length > currNode.level) {
        leafeValues.push(stack[stack.length - 1]);
      }
      stack.splice(currNode.level, stack.length - currNode.level);
      prevValue = stack.length ? stack[stack.length - 1] : initValue;
      stack.push(reduceCallback(prevValue, currNode, i, tree));
    }
    leafeValues.push(stack[stack.length - 1]);
    return leafeValues;
  }
  reduceTree.parameters = [[TreeArray], [], []];
  return {
    get TreeArrayNode() {
      return TreeArrayNode;
    },
    get TreeArray() {
      return TreeArray;
    },
    get reduceTree() {
      return reduceTree;
    },
    __esModule: true
  };
});
