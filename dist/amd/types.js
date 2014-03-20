define(["assert", 'assert', 'di/injector'], function($__0,$__1,$__2) {
  "use strict";
  var __moduleName = "types";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var assert = ($__0).assert;
  var assert = ($__1).assert;
  var Injector = ($__2).Injector;
  var ArrayLikeOfNodes = function ArrayLikeOfNodes() {
    assert.fail('type is not instantiable');
  };
  ($traceurRuntime.createClass)(ArrayLikeOfNodes, {}, {assert: function(obj) {
      assert(obj.length).is(assert.number);
      for (var i = 0,
          ii = obj.length; i < ii; i++) {
        assert(obj[i]).is(Node);
      }
    }});
  var ArrayOfObject = function ArrayOfObject() {
    assert.fail('type is not instantiable');
  };
  ($traceurRuntime.createClass)(ArrayOfObject, {}, {assert: function(obj) {
      assert(obj).is(assert.arrayOf(assert.object));
    }});
  var ArrayOfString = function ArrayOfString() {
    assert.fail('type is not instantiable');
  };
  ($traceurRuntime.createClass)(ArrayOfString, {}, {assert: function(obj) {
      assert(obj).is(assert.arrayOf(assert.string));
    }});
  var NodeAttrs = function NodeAttrs() {
    var data = arguments[0] !== (void 0) ? arguments[0] : {};
    this.init = data.init || {};
    this.bind = data.bind || {};
    this.event = data.event || {};
  };
  var $NodeAttrs = NodeAttrs;
  ($traceurRuntime.createClass)(NodeAttrs, {split: function(props) {
      var $__3 = this;
      assert.argumentTypes(props, ArrayOfString);
      var res = new $NodeAttrs();
      props.forEach((function(propName) {
        if (propName in $__3.init) {
          res.init[propName] = $__3.init[propName];
          delete $__3.init[propName];
        }
        if (propName in $__3.bind) {
          res.bind[propName] = $__3.bind[propName];
          delete $__3.bind[propName];
        }
      }));
      return res;
    }}, {toCamelCase: function(attrName) {
      return attrName.split('-').map((function(part, index) {
        if (index > 0) {
          return part.charAt(0).toUpperCase() + part.substring(1);
        } else {
          return part;
        }
      })).join('');
    }});
  NodeAttrs.prototype.split.parameters = [[ArrayOfString]];
  var ArrayOfClass = function ArrayOfClass() {
    assert.fail('type is not instantiable');
  };
  ($traceurRuntime.createClass)(ArrayOfClass, {}, {assert: function(obj) {
      assert(obj).is(assert.arrayOf(Function));
    }});
  return {
    get ArrayLikeOfNodes() {
      return ArrayLikeOfNodes;
    },
    get ArrayOfObject() {
      return ArrayOfObject;
    },
    get ArrayOfString() {
      return ArrayOfString;
    },
    get NodeAttrs() {
      return NodeAttrs;
    },
    get ArrayOfClass() {
      return ArrayOfClass;
    },
    __esModule: true
  };
});
