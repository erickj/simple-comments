goog.provide('logos.command.CommandContext');



/**
 * @param {!logos.model.Model} model
 * @constructor
 * @struct
 * @final
 */
logos.command.CommandContext = function(model) {
  /** @private {!logos.model.Model} */
  this.model_ = model;
};


/** @return {!logos.model.Model} */
logos.command.CommandContext.prototype.getModel = function() {
  return this.model_;
};
