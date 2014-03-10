goog.provide('logos.command.CommandApplier');
goog.provide('logos.command.CommandEvent');

goog.require('goog.events');
goog.require('logos.command.Command');
goog.require('logos.common.preconditions');
goog.require('logos.common.preconditions.IllegalStateException');



/**
 * @param {!logos.event.EventBus} eventBus
 * @param {!logos.command.CommandContext} commandContext
 * @param {!logos.command.CommandSetHistory} commandSetHistory
 * @param {!logos.model.VersionProvider} modelVersionProvider
 * @constructor
 * @struct
 * @final
 */
logos.command.CommandApplier = function(
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
 * Applies a CommandSet if it the whole command set can be applied. Dispatches
 * events before and after each command is applied.
 * @param {!logos.command.CommandSet} commandSet
 * @return {boolean} Whether the command was applied.
 */
logos.command.CommandApplier.prototype.maybeApplyCommandSet =
    function(commandSet) {
  if (this.shouldTransformCommandSet_(commandSet)) {
    commandSet = this.transformCommandSet_(commandSet);
  }

  var commands = commandSet.getCommands();
  var lastCommandType;
  try {
    for (var i = 0; i < commands.length; i++) {
      lastCommandType = commands[i].getType();
      if (!commands[i].canApply(this.commandContext_)) {
        throw Error('cannot apply command');
      }
    };
  } catch(e) {
    var message = 'Unable to apply command type ' + lastCommandType;
    message += (e instanceof logos.common.preconditions.IllegalStateException) ?
        ' invalid model state: ' + e.message :
        ' for reason: ' + e.message;
  }

  var currentModelVersion = this.getCurrentModelVersion_();
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    this.eventBus_.dispatchEvent(new logos.command.CommandEvent(
        logos.command.CommandEventType.BEFORE_APPLY, command,
        currentModelVersion));
    command.apply(this.commandContext_);
    this.eventBus_.dispatchEvent(new logos.command.CommandEvent(
        logos.command.CommandEventType.AFTER_APPLY, command,
        currentModelVersion));
  }

  this.commandSetHistory_.
      addCommandSetToHistory(currentModelVersion, commandSet);
  this.incrementModelVersion_();

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
 */
logos.command.CommandApplier.prototype.shouldTransformCommandSet_ =
    function(commandSet) {
  var commandSetModelVesion = commandSet.getModelVersion();
  logos.common.preconditions.checkState(
      commandSetModelVesion <= this.getCurrentModelVersion_());
  return this.commandSetHistory_.hasCommandsSinceVersion(commandSetModelVesion);
};


/**
 * Transforms the given {@code commandSet} against the command sets since the
 * version the command set is applied at.
 * @param {!logos.command.CommandSet} commandSet
 * @return {!logos.command.CommandSet} The transformed command set.
 */
logos.command.CommandApplier.protoytpe.transformCommandSet_ =
    function(commandSet) {
  var commandSetModelVesion = commandSet.getModelVersion();
  var transformSets = this.commandSetHistory_.getCommandsSinceVersion(
      commandSetModelVesion);
  for (var i = 0; i < transformSets.length; i++) {
    commandSet = commandSet.transform(transformSets[i]);
  }
  return commandSet;
};


/** @return {number} The current model version. */
logos.command.CommandApplier.prototype.getCurrentModelVersion_ = function() {
  this.modelVersionProvider_.getVersion()
};


/**
 * Increments the model version by 1 to reflect a CommandSet has been processed.
 * @private
 */
logos.command.CommandApplier.prototype.incrementModelVersion_ = function() {
  this.modelVersionProvider_.setVersion(++this.getCurrentModelVersion_());
};



/**
 * @param {logos.command.CommandEvent.Type} eventType
 * @param {logos.command.Command} command
 * @param {number} modelVersion The version at which the common will be/was
 *     applied.
 * @constructor
 * @struct
 */
logos.command.CommandEvent = function(eventType, command, modelVersion) {
  /** @type {logos.command.CommandEvent.Type} */
  this.eventType = eventType;

  /** @type {logos.command.Command} */
  this.command = command;

  /** @type {number} */
  this.modelVersion = modelVersion;
};


/** @enum {string} */
logos.command.CommandEvent.Type = {
  BEFORE_APPLY: goog.events.getUniqueId('before-apply-command'),
  AFTER_APPLY: goog.events.getUniqueId('after-apply-command')
};
