goog.provide('logos.model.VersionProvider');



/**
 * A class to provide the model version number and control incrementing it.
 * @param {number=} opt_version The version, default is 0.
 * @constructor
 * @struct
 * @final
 */
logos.model.VersionProvider = function(opt_version) {
  /** @private {number} */
  this.version_ = opt_version || 0;
};


/** @return {number} */
logos.model.VersionProvider.prototype.getVersion = function() {
  return this.version_;
};


/**
 * Increases the version number by 1.
 */
logos.model.VersionProvider.prototype.incrementVersion = function() {
  this.version_++;
};
