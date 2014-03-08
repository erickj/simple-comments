goog.provide('logos.model.Comment');

goog.require('logos.model.Object');



/**
 * @param {string} id
 * @param {string} body
 * @param {number} modifiedTimestamp
 * @param {!logos.model.User} author
 * @constructor
 * @extends {logos.model.Object};
 * @struct
 */
logos.model.Comment = function(id, body, modifiedTimestamp, author) {
  logos.model.Object.call(this, id, logos.model.Object.Type.COMMENT);

  /** @private {string} */
  this.body_ = body;

  /** @private {number} */
  this.modifiedTimestamp_ = modifiedTimestamp;

  /** @private {!logos.model.User} */
  this.author_ = author;
};
goog.inherits(logos.model.Comment, logos.model.Object);
