goog.provide('logos.command.AddCommentCommand');

goog.require('logos.command.AbstractCommand');
goog.require('logos.command.Command');
goog.require('logos.common.preconditions');
goog.require('logos.model.Object');



/**
 * @param {string} conversationId
 * @param {string} threadId
 * @param {!logos.model.Comment} comment
 * @constructor
 * @extends {logos.command.AbstractCommand}
 * @struct
 * @final
 */
logos.command.AddCommentCommand = function(conversationId, threadId, comment) {
  logos.command.AbstractCommand.call(
      this, logos.command.Command.Type.ADD_COMMENT);

  /** @private {string} */
  this.conversationId_ = conversationId;

  /** @private {string} */
  this.threadId_ = threadId;

  /** @private {!logos.model.Comment} */
  this.comment_ = comment;
};
goog.inherits(logos.command.AddCommentCommand, logos.command.AbstractCommand);


/** @override */
logos.command.AddCommentCommand.prototype.canApply = function(context) {
  var checkState = logos.common.preconditions.checkState;
  var model = context.getModel();
  checkState(model.hasUser(this.comment_.getUserId()), 'missing user');
  checkState(
      model.hasConversation(this.conversationId_), 'missing conversation');

  var conversation = model.getConversation(this.conversationId_);
  checkState(conversation.hasThread(this.threadId_), 'missing thread');

  var thread = conversation.getThread(this.threadId_);
  checkState(!thread.hasComment(this.comment_.getId()), 'already has comment');
  return true;
};


/** @override */
logos.command.AddCommentCommand.prototype.applyInternal = function(context) {
  var conversation = context.getModel().getConversation(this.conversationId_);
  var thread = conversation.getThread(this.threadId_);
  thread.addComment(this.comment_);
};
