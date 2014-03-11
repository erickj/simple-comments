goog.provide('logos.model.VersionProvider');



/**
 * A class to provide the model version number and control incrementing it.
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


/**
 * Increases the version number by 1.
 */
logos.model.VersionProvider.prototype.incrementVersion = function() {
  this.version_++;
};
