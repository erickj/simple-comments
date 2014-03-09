goog.provide('logos.command.CommandSet');



/**
 * @param {!Array.<!logos.command.Command>} commands
 * @param {number} modelVersion
 * @constructor
 * @struct
 * @final
 */
logos.command.CommandSet = function(commands, modelVersion) {
  /** @private {!Array.<!logos.command.Command>} */
  this.commands_ = commands;

  /** @private {number} */
  this.modelVersion_ = modelVersion;
};


/**
 * @return {number} The model version at which this command set was applied.
 */
logos.command.CommandSet.prototype.getModelVersion = function() {
  return this.modelVersion_;
};


/**
 * @return {!Array.<!logos.command.Command>} The commands
 */
logos.command.CommandSet.prototype.getCommands = function() {
  return this.commands_.concat();
};
