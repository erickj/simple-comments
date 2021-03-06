goog.provide('logos.command.Command');

goog.require('logos.common.EqualsComparable');



/**
 * @interface
 * @extends {logos.common.EqualsComparable}
 */
logos.command.Command = function() {};


/** @enum {string} */
logos.command.Command.Type = {
  NOOP: 'noop',
  ADD_CONVERSATION: 'add_conversation',
  ADD_THREAD: 'add_thread',
  ADD_COMMENT: 'add_comment',
  ADD_USER: 'add_user'
};


/**
 * Gets the command type.
 * @return {logos.command.Command.Type}
 */
logos.command.Command.prototype.getType = goog.abstractMethod;


/**
 * Applies the command.
 * @param {!logos.command.CommandExecutionContext} commandContext
 */
logos.command.Command.prototype.apply = goog.abstractMethod;


/**
 * Verifies that the command can be applied. True indicates the command can be
 * applied. False indicates the commmand should not be applied but the reason
 * is not an error. An error is thrown if the command should not be applied and
 * the command should not have been requested.
 * @param {!logos.command.CommandExecutionContext} commandContext
 * @return {boolean} True indicates success.
 * @throws {logos.common.preconditions.IllegalStateException}
 */
logos.command.Command.prototype.canApply = goog.abstractMethod;


/**
 * Transforms this command against the given command. The given command to
 * transform against has already been applied to the model, so only this command
 * should be transformed.
 * @param {!logos.command.Command} againstCommand
 */
logos.command.Command.prototype.transform = goog.abstractMethod;
