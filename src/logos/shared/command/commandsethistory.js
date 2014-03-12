goog.provide('logos.command.CommandSetHistory');

goog.require('logos.common.preconditions');



/**
 * @constructor
 * @struct
 * @final
 */
logos.command.CommandSetHistory = function() {
  /** @private {!Array.<!logos.command.CommandSet>} */
  this.commandSetHistory_ = [];
};


/**
 * Adds a command set to the history. Throws an error if the key already exists.
 * @param {number} version
 * @param {!logos.command.CommandSet} commandSet
 */
logos.command.CommandSetHistory.prototype.addCommandSetToHistory =
    function(version, commandSet) {
  logos.common.preconditions.checkState(
      version == this.commandSetHistory_.length);
  this.commandSetHistory_[version] = commandSet;
};


/**
 * Returns the subset of command sets from the given version to the end of the
 * history. This subset is inclusive of the given version.
 * @param {number} version
 * @return {!Array.<!logos.command.CommandSet>}
 */
logos.command.CommandSetHistory.prototype.getCommandsSinceVersion =
    function(version) {
  return this.commandSetHistory_.slice(version);
};


/**
 * @param {number} version
 * @return {boolean} True indicates there are additional command sets at and
 *     after the given version.
 */
logos.command.CommandSetHistory.prototype.hasCommandsSinceVersion =
    function(version) {
  return this.getCommandsSinceVersion(version).length > 0;
};
