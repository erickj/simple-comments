goog.provide('logos.model.Comment');

goog.require('logos.model.Object');



/**
 * @param {string} id
 * @param {string} body
 * @param {number} modifiedTimestamp
 * @param {string} userId
 * @constructor
 * @extends {logos.model.Object};
 * @struct
 */
logos.model.Comment = function(id, body, modifiedTimestamp, userId) {
  logos.model.Object.call(this, id, logos.model.Object.Type.COMMENT);

  /** @private {string} */
  this.body_ = body;

  /** @private {number} */
  this.modifiedTimestamp_ = modifiedTimestamp;

  /** @private {!string} */
  this.userId_ = userId;
};
goog.inherits(logos.model.Comment, logos.model.Object);


/**
 * @return {string}
 */
logos.model.Comment.prototype.getBody = function() {
  return this.body_;
};


/**
 * @return {number}
 */
logos.model.Comment.prototype.getModifiedTimestamp = function() {
  return this.modifiedTimestamp_;
};


/**
 * @return {string}
 */
logos.model.Comment.prototype.getUserId = function() {
  return this.userId_;
};


/** @override */
logos.model.Comment.prototype.equalsInternal = function(other) {
  other = /** @type {!logos.model.Comment} */ (other);
  return this.modifiedTimestamp_ == other.modifiedTimestamp_ &&
      this.userId_ == other.userId_ &&
      this.body_ == other.body_;
};
