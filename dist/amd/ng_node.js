define(["assert"], function($__0) {
  "use strict";
  var __moduleName = "ng_node";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var assert = ($__0).assert;
  var NgNode = function NgNode(node) {
    var data = arguments[1] !== (void 0) ? arguments[1] : null;
    assert.argumentTypes(node, Node, data, Object);
    node.ngNode = this;
    this._node = node;
    this._data = data;
    this._dirty = false;
    this._classes = {
      cache: null,
      changed: {}
    };
    this._props = {
      cache: {},
      changed: {}
    };
    this._styles = {
      cache: {},
      changed: {}
    };
    this._installPropertyChangeEventListeners();
  };
  ($traceurRuntime.createClass)(NgNode, {
    _installPropertyChangeEventListeners: function() {
      var self = this;
      this._node.addEventListener('propchange', (function(e) {
        clearCache(e.properties || []);
      }));
      if (this._node.nodeName === 'INPUT') {
        var listener = createClearCacheListener(['value']);
        this._node.addEventListener('input', listener);
        this._node.addEventListener('change', listener);
        this._node.addEventListener('keypress', listener);
      } else if (this._node.nodeName === 'SELECT') {
        var listener = createClearCacheListener(['value']);
        this._node.addEventListener('change', listener);
      } else if (this._node.nodeName === 'OPTION') {
        var listener = createClearCacheListener(['selected']);
        this._node.parentNode.addEventListener('change', listener);
      }
      function createClearCacheListener(props) {
        return (function() {
          clearCache(props);
        });
      }
      function clearCache(props) {
        props.forEach((function(prop) {
          delete self._props.cache[prop];
          delete self._props.changed[prop];
        }));
      }
    },
    nativeNode: function() {
      return this._node;
    },
    data: function() {
      return this._data;
    },
    isDirty: function() {
      return this._dirty;
    },
    flush: function() {
      this._dirty = false;
      var changedClasses = this._flushClasses();
      var changedProps = this._flushGeneric(this._node, this._props);
      var changedStyles = this._flushGeneric(this._node.style, this._styles);
      return {
        classes: changedClasses,
        props: changedProps,
        styles: changedStyles
      };
    },
    hasClass: function(classes) {
      var $__1 = this;
      assert.argumentTypes(classes, $traceurRuntime.type.string);
      this._ensureClassCache();
      return classes.split(' ').reduce((function(state, className) {
        return state && !!$__1._classes.cache[className];
      }), true);
      return this;
    },
    _ensureClassCache: function() {
      if (!this._classes.cache) {
        var cache = this._classes.cache = {};
        (this._node.className || '').split(/\s*/).forEach((function(className) {
          cache[className] = true;
        }));
      }
    },
    toggleClass: function(classes) {
      var condition = arguments[1] !== (void 0) ? arguments[1] : null;
      var $__1 = this;
      assert.argumentTypes(classes, $traceurRuntime.type.string, condition, $traceurRuntime.type.boolean);
      this._ensureClassCache();
      classes.split(' ').forEach((function(className) {
        var classCondition = condition;
        if (classCondition === null) {
          classCondition = !$__1._classes.cache[className];
        }
        $__1._classes.cache[className] = classCondition;
        $__1._classes.changed[className] = true;
      }));
      this._dirty = true;
      return this;
    },
    _flushClasses: function() {
      var changedValues = {};
      var nativeClasses = [];
      var changed = false;
      for (var name in this._classes.cache) {
        var value = this._classes.cache[name];
        if (this._classes.changed[name]) {
          changed = true;
          changedValues[name] = value;
        }
        nativeClasses.push(name);
      }
      this._classes.changed = {};
      if (changed) {
        this._node.className = nativeClasses.join(' ');
      }
      return changedValues;
    },
    prop: function(name) {
      var value = arguments[1] !== (void 0) ? arguments[1] : null;
      assert.argumentTypes(name, $traceurRuntime.type.string, value, $traceurRuntime.type.string);
      return this._accessGeneric(this._node, this._props, name, value);
    },
    css: function(name) {
      var value = arguments[1] !== (void 0) ? arguments[1] : null;
      assert.argumentTypes(name, $traceurRuntime.type.string, value, $traceurRuntime.type.any);
      return this._accessGeneric(this._node.style, this._styles, name, value);
    },
    _accessGeneric: function(nativeObj, localObj, name) {
      var value = arguments[3] !== (void 0) ? arguments[3] : null;
      assert.argumentTypes(nativeObj, $traceurRuntime.type.any, localObj, $traceurRuntime.type.any, name, $traceurRuntime.type.string, value, $traceurRuntime.type.any);
      if (value !== null) {
        localObj.cache[name] = value;
        localObj.changed[name] = true;
        this._dirty = true;
        return this;
      }
      if (!(name in localObj.cache)) {
        localObj.cache[name] = nativeObj[name];
      }
      return localObj.cache[name];
    },
    _flushGeneric: function(nativeObj, localObj) {
      var changedValues = {};
      for (var name in localObj.changed) {
        nativeObj[name] = localObj.cache[name];
        changedValues[name] = localObj.cache[name];
      }
      localObj.changed = {};
      return changedValues;
    }
  }, {});
  NgNode.parameters = [[Node], [Object]];
  NgNode.prototype.hasClass.parameters = [[$traceurRuntime.type.string]];
  NgNode.prototype.toggleClass.parameters = [[$traceurRuntime.type.string], [$traceurRuntime.type.boolean]];
  NgNode.prototype.prop.parameters = [[$traceurRuntime.type.string], [$traceurRuntime.type.string]];
  NgNode.prototype.css.parameters = [[$traceurRuntime.type.string], []];
  NgNode.prototype._accessGeneric.parameters = [[], [], [$traceurRuntime.type.string], []];
  return {
    get NgNode() {
      return NgNode;
    },
    __esModule: true
  };
});
