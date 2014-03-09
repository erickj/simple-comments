goog.provide('logos.model.User');

goog.require('logos.model.Object');



/**
 * @param {string} id
 * @param {string} email
 * @param {string} handle
 * @constructor
 * @extends {logos.model.Object}
 * @struct
 * @final
 */
logos.model.User = function(id, email, handle) {
  logos.model.Object.call(this, id, logos.model.Object.Type.USER);

  /** @private {string} */
  this.email_ = email;

  /** @private {string} */
  this.handle_ = handle;
};
goog.inherits(logos.model.User, logos.model.Object);


/**
 * @return {string}
 */
logos.model.User.prototype.getEmail = function() {
  return this.email_;
};


/**
 * @return {string}
 */
logos.model.User.prototype.getHandle = function() {
  return this.handle_;
};
