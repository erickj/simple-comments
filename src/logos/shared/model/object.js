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


/**
 * @override
 * @final
 */
logos.model.Object.prototype.equals = function(other) {
  return this === other || (other instanceof logos.model.Object) &&
      other.constructor == this.constructor &&
      other.getId() == this.id_ &&
      other.getType() == this.type_ &&
      this.equalsInternal(other);
};


/**
 * Method to be overriden by subclasses to check for internal equality.
 * @param {!logos.model.Object} object
 * @return {boolean}
 * @protected
 */
logos.model.Object.prototype.equalsInternal = function(object) {
  return true;
};
