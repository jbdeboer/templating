define(["assert"], function($__0) {
  "use strict";
  var __moduleName = "linked_list";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var assert = ($__0).assert;
  var LinkedListItem = function LinkedListItem() {
    this.next = null;
    this.prev = null;
  };
  ($traceurRuntime.createClass)(LinkedListItem, {}, {});
  var LinkedList = function LinkedList() {
    this.tail = null;
    this.head = null;
  };
  ($traceurRuntime.createClass)(LinkedList, {
    remove: function(item) {
      assert.argumentTypes(item, LinkedListItem);
      if (item.prev) {
        item.prev.next = item.next;
      }
      if (item.next) {
        item.next.prev = item.prev;
      }
      if (item === this.tail) {
        this.tail = item.prev;
      }
      if (item === this.head) {
        this.head = item.next;
      }
      item.next = null;
      item.prev = null;
    },
    append: function(item) {
      assert.argumentTypes(item, LinkedListItem);
      this.remove(item);
      if (!this.tail) {
        this.tail = this.head = item;
      } else {
        this.tail.next = item;
        item.prev = this.tail;
        this.tail = item;
      }
    },
    insertBefore: function(item, referenceItem) {
      assert.argumentTypes(item, LinkedListItem, referenceItem, LinkedListItem);
      this.remove(item);
      if (!referenceItem.prev) {
        this.head.prev = item;
        item.next = referenceItem;
        this.head = item;
      } else {
        var oldPrev = referenceItem.prev;
        oldPrev.next = item;
        item.prev = oldPrev;
        item.next = referenceItem;
        referenceItem.prev = item;
      }
    },
    insertAfter: function(item, referenceItem) {
      assert.argumentTypes(item, LinkedListItem, referenceItem, LinkedListItem);
      if (!referenceItem.next) {
        this.append(item);
      } else {
        this.insertBefore(item, referenceItem.next);
      }
    },
    prepend: function(item) {
      assert.argumentTypes(item, LinkedListItem);
      if (this.head) {
        this.insertBefore(item, this.head);
      } else {
        this.append(item);
      }
    }
  }, {});
  LinkedList.prototype.remove.parameters = [[LinkedListItem]];
  LinkedList.prototype.append.parameters = [[LinkedListItem]];
  LinkedList.prototype.insertBefore.parameters = [[LinkedListItem], [LinkedListItem]];
  LinkedList.prototype.insertAfter.parameters = [[LinkedListItem], [LinkedListItem]];
  LinkedList.prototype.prepend.parameters = [[LinkedListItem]];
  return {
    get LinkedListItem() {
      return LinkedListItem;
    },
    get LinkedList() {
      return LinkedList;
    },
    __esModule: true
  };
});
