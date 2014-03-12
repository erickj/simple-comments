goog.provide('logos.command.CommandSetHistory');

goog.require('logos.common.preconditions');



/**
 * A class to keep track of the history of CommandSets that have been applied to
 * the model. Each command set is added at its model version.
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
 * @param {!logos.command.CommandSet} commandSet
 * @throws {Error} if adding a CommandSet whose version number does not match
 *     the current model version.
 */
logos.command.CommandSetHistory.prototype.addCommandSetToHistory =
    function(commandSet) {
  var currentVersion = this.getVersion_();
  logos.common.preconditions.checkArgument(
      currentVersion == commandSet.getModelVersion(),
      'History version out of sync with CommandSet version.');
  this.commandSetHistory_[currentVersion] = commandSet;
};


/**
 * Returns the subset of command sets from the given version to the end of the
 * history. This subset is inclusive of the given version. Returns an empty arry
 * if {@code vesion} is at or ahead of the current version.
 * @param {number} version
 * @return {!Array.<!logos.command.CommandSet>}
 */
logos.command.CommandSetHistory.prototype.getCommandsSinceVersion =
    function(version) {
  logos.common.preconditions.checkArgument(
      version >= 0, 'Invalid version ' + version);
  return this.commandSetHistory_.slice(version);
};


/**
 * @param {number} version
 * @return {boolean} True indicates there are additional command sets at and
 *     after the given version.
 */
logos.command.CommandSetHistory.prototype.hasCommandsSinceVersion =
    function(version) {
  logos.common.preconditions.checkArgument(
      version >= 0, 'Invalid version ' + version);
  return !!this.commandSetHistory_[version];
};


/**
 * @return {number}
 * @private
 */
logos.command.CommandSetHistory.prototype.getVersion_ = function() {
  return this.commandSetHistory_.length;
};
