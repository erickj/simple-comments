goog.provide('logos.command.AddConversationCommand');

goog.require('logos.command.AbstractCommand');
goog.require('logos.command.Command');
goog.require('logos.common.preconditions');



/**
 * @param {!logos.model.Conversation} conversation
 * @constructor
 * @extends {logos.command.AbstractCommand}
 * @struct
 * @final
 */
logos.command.AddConversationCommand = function(conversation) {
  logos.command.AbstractCommand.call(
      this, logos.command.Command.Type.ADD_CONVERSATION);

  /** @private {!logos.model.Conversation} */
  this.conversation_ = conversation;
};
goog.inherits(
    logos.command.AddConversationCommand, logos.command.AbstractCommand);


/** @override */
logos.command.AddConversationCommand.prototype.canApply = function(context) {
  var checkState = logos.common.preconditions.checkState;
  var model = context.getModel();
  checkState(!model.hasConversation(this.conversation_.getId()),
      'already has conversation');
  return true;
};


/** @override */
logos.command.AddConversationCommand.prototype.applyInternal =
    function(context) {
  context.getModel().addConversation(this.conversation_);
};
