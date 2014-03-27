goog.provide('logos.command.CommandExecutionContext');



/**
 * @param {!logos.model.Model} model
 * @constructor
 * @struct
 * @final
 */
logos.command.CommandExecutionContext = function(model) {
  /** @private {!logos.model.Model} */
  this.model_ = model;
};


/** @return {!logos.model.Model} */
logos.command.CommandExecutionContext.prototype.getModel = function() {
  return this.model_;
};
