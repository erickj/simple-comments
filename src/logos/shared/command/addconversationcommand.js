goog.provide('logos.command.AddConversationCommand');

goog.require('logos.command.Command');



/**
 * @param {!logos.model.Conversation} conversation
 * @constructor
 * @extends {logos.command.Command}
 * @struct
 * @final
 */
logos.command.AddConversationCommand = function(conversation) {
  logos.command.Command.call(this, logos.command.Command.Type.ADD_CONVERSATION);
};
goog.inherits(logos.command.AddConversationCommand, logos.command.Command);
