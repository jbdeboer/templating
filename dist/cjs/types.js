"use strict";
var __moduleName = "types";
var assert = require("assert").assert;
var assert = require('assert').assert;
var Injector = require('di/injector').Injector;
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
    var $__0 = this;
    assert.argumentTypes(props, ArrayOfString);
    var res = new $NodeAttrs();
    props.forEach((function(propName) {
      if (propName in $__0.init) {
        res.init[propName] = $__0.init[propName];
        delete $__0.init[propName];
      }
      if (propName in $__0.bind) {
        res.bind[propName] = $__0.bind[propName];
        delete $__0.bind[propName];
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
module.exports = {
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
