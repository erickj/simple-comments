goog.provide('logos.model.User');



/**
 * @param {string} email
 * @constructor
 * @struct
 * @final
 */
logos.model.User = function(email) {
  /** @private {string} */
  this.email_ = email;
};
