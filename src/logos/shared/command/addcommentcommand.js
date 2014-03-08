goog.provide('logos.command.AddCommentCommand');

goog.require('logos.command.Command');



/**
 * @param {string} conversationId
 * @param {string} threadId
 * @param {!logos.model.Comment} comment
 * @constructor
 * @extends {logos.command.Command}
 * @struct
 * @final
 */
logos.command.AddCommentCommand = function(conversationId, threadId, comment) {
  logos.command.Command.call(this, logos.command.Command.Type.ADD_COMMENT);
};
goog.inherits(logos.command.AddCommentCommand, logos.command.Command);
