goog.provide('logos.model.VersionProvider');



/**
 * @constructor
 * @struct
 * @final
 */
logos.model.VersionProvider = function() {
  /** @private {number} */
  this.version_ = 0;
};


/** @return {number} */
logos.model.VersionProvider.prototype.getVersion = function() {
  return this.version_;
};


/** @param {number} version */
logos.model.VersionProvider.prototype.setVersion = function(version) {
  this.version_ = version;
};
