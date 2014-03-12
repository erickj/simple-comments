goog.provide('logos.command.CommandSetApplier');
goog.provide('logos.command.CommandSetApplicationEvent');

goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('logos.command.Command');
goog.require('logos.common.preconditions');
goog.require('logos.common.preconditions.IllegalStateException');



/**
 * Applies CommandSets to the model.
 * @param {!logos.event.EventBus} eventBus
 * @param {!logos.command.CommandContext} commandContext
 * @param {!logos.command.CommandSetHistory} commandSetHistory
 * @param {!logos.model.VersionProvider} modelVersionProvider
 * @constructor
 * @struct
 * @final
 */
logos.command.CommandSetApplier = function(
    eventBus, commandContext, commandSetHistory, modelVersionProvider) {
  /** @private {!logos.event.EventBus} */
  this.eventBus_ = eventBus;

  /** @private {!logos.command.CommandContext} */
  this.commandContext_ = commandContext;

  /** @private {!logos.command.CommandSetHistory} */
  this.commandSetHistory_ = commandSetHistory;

  /** @private {!logos.model.VersionProvider} */
  this.modelVersionProvider_ = modelVersionProvider;
};


/**
 * Events dispatched when applying a command set.
 * @enum {string}
 */
logos.command.CommandSetApplier.EventType = {
  BEFORE_APPLY: goog.events.getUniqueId('before-apply-commandset'),
  AFTER_APPLY: goog.events.getUniqueId('after-apply-commandset')
};


/**
 * Applies a CommandSet if it the whole command set can be applied. Dispatches
 * events before and after the commandset is applied. If any Command in the
 * CommandSet returns false for {@code #canApply} then the CommandSet will not
 * be applied.
 * @param {!logos.command.CommandSet} commandSet
 * @return {boolean} Whether the command was applied.
 * @throws {Error} if the command set is at an invalid version or if
 *     unable to apply a command.
 */
logos.command.CommandSetApplier.prototype.maybeApplyCommandSet =
    function(commandSet) {
  var commandSetModelVesion = commandSet.getModelVersion();
  logos.common.preconditions.checkArgument(
      commandSetModelVesion <= this.getCurrentModelVersion_(),
      'Invalid CommandSet version ' + commandSetModelVesion);

  if (this.shouldTransformCommandSet_(commandSet)) {
    commandSet = this.transformCommandSet_(commandSet);
  }

  var commands = commandSet.getCommands();
  for (var i = 0; i < commands.length; i++) {
    try {
      if (!commands[i].canApply(this.commandContext_)) {
        return false;
      }
    } catch (e) {
      var message = 'Unable to apply command type ' + commands[i].getType();
      message +=
          (e instanceof logos.common.preconditions.IllegalStateException) ?
              ' invalid model state: ' + e.message :
              ' for unknown reason: ' + e.message;
      throw Error(message);
    }
  }

  var currentModelVersion = this.getCurrentModelVersion_();
  this.eventBus_.dispatchEvent(new logos.command.CommandSetApplicationEvent(
      logos.command.CommandSetApplier.EventType.BEFORE_APPLY, commandSet));

  for (var i = 0; i < commands.length; i++) {
    commands[i].apply(this.commandContext_);
  }
  this.commandSetHistory_.addCommandSetToHistory(commandSet);
  this.modelVersionProvider_.incrementVersion();

  this.eventBus_.dispatchEvent(new logos.command.CommandSetApplicationEvent(
      logos.command.CommandSetApplier.EventType.AFTER_APPLY, commandSet));

  return true;
};


/**
 * Compares the model version of the {@code commandSet} to the current model
 * version. If the current model vesion is ahead of the {@code commandSet} model
 * version then returns true.
 * @param {!logos.command.CommandSet} commandSet
 * @return {boolean} Whether this command set needs to be transformed.
 * @throws {logos.common.preconditions.IllegalStateException} If the command set
 *     version is ahead of the current model version.
 * @private
 */
logos.command.CommandSetApplier.prototype.shouldTransformCommandSet_ =
    function(commandSet) {
  return this.commandSetHistory_.hasCommandsSinceVersion(
      commandSet.getModelVersion());
};


/**
 * Transforms the given {@code commandSet} against the command sets since the
 * version the command set is applied at.
 * @param {!logos.command.CommandSet} commandSet
 * @return {!logos.command.CommandSet} The transformed command set.
 * @private
 */
logos.command.CommandSetApplier.prototype.transformCommandSet_ =
    function(commandSet) {
  var commandSetModelVesion = commandSet.getModelVersion();
  var transformSets = this.commandSetHistory_.getCommandsSinceVersion(
      commandSetModelVesion);
  for (var i = 0; i < transformSets.length; i++) {
    commandSet = commandSet.transform(transformSets[i]);
  }
  return commandSet;
};


/**
 * @return {number} The current model version.
 * @private
 */
logos.command.CommandSetApplier.prototype.getCurrentModelVersion_ = function() {
  return this.modelVersionProvider_.getVersion();
};



/**
 * @param {logos.command.CommandSetApplier.EventType} type
 * @param {logos.command.CommandSet} commandSet
 * @constructor
 * @extends {goog.events.Event}
 */
logos.command.CommandSetApplicationEvent = function(type, commandSet) {
  goog.events.Event.call(this, type);

  /** @type {logos.command.CommandSet} */
  this.commandSet = commandSet;
};
goog.inherits(logos.command.CommandSetApplicationEvent, goog.events.Event);
