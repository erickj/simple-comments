goog.provide('logos.model.Object');



/**
 * @param {string} id
 * @param {logos.model.Object.Type} type
 * @constructor
 * @struct
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
  THREAD: 'thread'
};


/** @return {string} */
logos.model.Object.prototype.getId = function() {
  return this.id_;
};


/** @return {logos.model.Object.Type} */
logos.model.Object.prototype.getType = function() {
  return this.type_;
};
