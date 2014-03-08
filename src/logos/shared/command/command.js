goog.provide('logos.command.Command');



/**
 * @param {logos.command.Command.Type} type
 * @constructor
 * @struct
 */
logos.command.Command = function(type) {
  /** @private {logos.command.Command.Type} */
  this.type_ = type;
};


/** @enum {string} */
logos.command.Command.Type = {
  NOOP: 'noop',
  ADD_CONVERSATION: 'addconversation',
  ADD_THREAD: 'addthread',
  ADD_COMMENT: 'addcomment'
};
