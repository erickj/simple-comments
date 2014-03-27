goog.provide('logos.model.State');



/**
 * @param {!logos.model.VersionProvider} versionProvider
 * @param {!logos.model.Model} model
 * @constructor
 * @struct
 * @final
 */
logos.model.State = function(versionProvider, model) {
  /** @private {!logos.model.State} */
  this.versionProvider_ = versionProvider;

  /** @private {!logos.model.Model} */
  this.model_ = model;
};


/** @return {!logos.model.Model} */
logos.model.State.prototype.getModel = function() {
  return this.model_;
};


/** @return {number} */
logos.model.State.prototype.getVersion = function() {
  return this.versionProvider_.getVersion();
};


/**
 * Increments the model version.
 */
logos.model.State.prototype.incrementVersion = function() {
  return this.versionProvider_.incrementVersion();
};
