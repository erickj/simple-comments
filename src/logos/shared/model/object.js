goog.provide('logos.model.Object');

goog.require('logos.common.EqualsComparable');



/**
 * @param {string} id
 * @param {logos.model.Object.Type} type
 * @constructor
 * @struct
 * @implements {logos.common.EqualsComparable}
 */
logos.model.Object = function(id, type) {
  /** @private {string} */
  this.id_ = id;

  /** @private {logos.model.Object.Type} */
  this.type_ = type;
};


/** @enum {string} */
logos.model.Object.Type = {
  COMMENT: 'comment',
  CONVERSATION: 'conversation',
  THREAD: 'thread',
  USER: 'user'
};


/** @return {string} */
logos.model.Object.prototype.getId = function() {
  return this.id_;
};


/** @return {logos.model.Object.Type} */
logos.model.Object.prototype.getType = function() {
  return this.type_;
};


/** @override */
logos.model.Object.prototype.equals = function(other) {
  return (other instanceof logos.model.Object) &&
      other.getId() == this.id_ &&
      other.getType() == this.type_;
};
