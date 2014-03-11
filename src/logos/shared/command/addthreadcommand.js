goog.provide('logos.command.AddThreadCommand');

goog.require('logos.command.AbstractCommand');
goog.require('logos.command.Command');
goog.require('logos.common.preconditions');



/**
 * @param {string} conversationId
 * @param {!logos.model.Thread} thread
 * @constructor
 * @extends {logos.command.AbstractCommand}
 * @struct
 * @final
 */
logos.command.AddThreadCommand = function(conversationId, thread) {
  logos.command.AbstractCommand.call(
      this, logos.command.Command.Type.ADD_THREAD);

  /** @private {string} */
  this.conversationId_ = conversationId;

  /** @private {!logos.model.Thread} */
  this.thread_ = thread;
};
goog.inherits(logos.command.AddThreadCommand, logos.command.AbstractCommand);


/** @override */
logos.command.AddThreadCommand.prototype.canApply = function(context) {
  var checkState = logos.common.preconditions.checkState;
  var model = context.getModel();
  checkState(
      model.hasConversation(this.conversationId_), 'missing conversation');
  checkState(!model.getConversation(this.conversationId_).hasThread(
      this.thread_.getId()), 'already has thread');
  return true;
};


/** @override */
logos.command.AddThreadCommand.prototype.applyInternal = function(context) {
  var conversation = context.getModel().getConversation(this.conversationId_);
  conversation.addThread(this.thread_);
};


/** @override */
logos.command.AddThreadCommand.prototype.equalsInternal = function(other) {
  if (other instanceof logos.command.AddThreadCommand) {
    other = /** @type {!logos.command.AddThreadCommand} */ (other);
    return other.conversationId_ == this.conversationId_ &&
        other.thread_.equals(this.thread_)
  }
  return false;
};
