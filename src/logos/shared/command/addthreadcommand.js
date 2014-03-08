goog.provide('logos.command.AddThreadCommand');

goog.require('logos.command.Command');



/**
 * @param {string} conversationId
 * @param {!logos.model.Thread} thread
 * @constructor
 * @extends {logos.command.Command}
 * @struct
 * @final
 */
logos.command.AddThreadCommand = function(conversationId, thread) {
  logos.command.Command.call(this, logos.command.Command.Type.ADD_THREAD);
};
goog.inherits(logos.command.AddThreadCommand, logos.command.Command);
