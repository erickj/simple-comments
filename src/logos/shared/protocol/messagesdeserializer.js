goog.provide('logos.protocol.MessagesDeserializer');

goog.require('logos.command.AddCommentCommand');
goog.require('logos.command.AddConversationCommand');
goog.require('logos.command.AddThreadCommand');
goog.require('logos.command.Command');
goog.require('logos.command.NoopCommand');
goog.require('logos.common.preconditions');
goog.require('logos.model.Comment');
goog.require('logos.model.Conversation');
goog.require('logos.model.Thread');
goog.require('logos.model.User');
goog.require('logos.protocol.messages.Command');
goog.require('logos.protocol.messages.Command.AddCommentCommand');
goog.require('logos.protocol.messages.Command.AddConversationCommand');
goog.require('logos.protocol.messages.Command.AddThreadCommand');
goog.require('logos.protocol.messages.Command.NoopCommand');
goog.require('logos.protocol.messages.Command.Type');
goog.require('logos.protocol.messages.CommandSet');
goog.require('logos.protocol.messages.Comment');
goog.require('logos.protocol.messages.Conversation');
goog.require('logos.protocol.messages.Thread');
goog.require('logos.protocol.messages.Topic');
goog.require('logos.protocol.messages.Topic.Type');
goog.require('logos.protocol.messages.User');



/**
 * Deserializes protocol command structures into commands and models.
 * @constructor
 * @struct
 * @final
 */
logos.protocol.MessagesDeserializer = function() {};


/**
 * @param {!logos.protocol.messages.CommandSet} protoCommandSet
 * @return {!Array.<!logos.command.Command>}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeCommandSet =
    function(protoCommandSet) {
  var commands = [];
  var protoCommands = protoCommandSet.commandArray();
  for (var i = 0, l = protoCommands.length; i < l; i++) {
    commands.push(this.deserializeCommand(protoCommands[i]));
  }
  return commands;
};


/**
 * @param {!logos.protocol.messages.Command} protoCommand
 * @return {!logos.command.Command}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeCommand =
    function(protoCommand) {
  var checkNotNull = logos.common.preconditions.checkNotNull;
  var Type = logos.protocol.messages.Command.Type;
  var protoCmd;
  switch (protoCommand.getType()) {
    case Type.NOOP:
      protoCmd =
          checkNotNull(protoCommand.getNoopCommand(), 'Missing Noop command');
      return this.deserializeNoopCommand(
          /** @type {!logos.protocol.messages.Command.NoopCommand} */ (
              protoCmd));
    case Type.ADD_CONVERSATION:
      protoCmd = checkNotNull(protoCommand.getAddConversationCommand(),
          'Missing AddConversation command');
      return this.deserializeAddConversationCommand(/** @type {!logos.
          protocol.messages.Command.AddConversationCommand} */ (protoCmd));
    case Type.ADD_THREAD:
      protoCmd = checkNotNull(
          protoCommand.getAddThreadCommand(), 'Missing AddThread command');
      return this.deserializeAddThreadCommand(
          /** @type {!logos.protocol.messages.Command.AddThreadCommand} */ (
              protoCmd));
    case Type.ADD_COMMENT:
      protoCmd = checkNotNull(
          protoCommand.getAddCommentCommand(), 'Missing AddComment command');
      return this.deserializeAddCommentCommand(
          /** @type {!logos.protocol.messages.Command.AddCommentCommand} */ (
              protoCmd));
    default:
      throw Error('Unknown command type ' + protoCommand.getType());
  }
};


/**
 * @param {!logos.protocol.messages.Command.NoopCommand} protoCommand
 * @return {!logos.command.NoopCommand}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeNoopCommand =
    function(protoCommand) {
  return new logos.command.NoopCommand();
};


/**
 * @param {!logos.protocol.messages.Command.AddConversationCommand} protoCommand
 * @return {!logos.command.AddConversationCommand}
 */
logos.protocol.MessagesDeserializer.prototype.
    deserializeAddConversationCommand = function(protoCommand) {
  var protoConversation = logos.common.preconditions.checkNotNull(
      protoCommand.getConversation(), 'Conversation is null');
  return new logos.command.AddConversationCommand(this.deserializeConversation(
      /** @type {!logos.protocol.messages.Conversation} */ (
          protoConversation)));
};


/**
 * @param {!logos.protocol.messages.Command.AddThreadCommand} protoCommand
 * @return {!logos.command.AddThreadCommand}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeAddThreadCommand =
    function(protoCommand) {
  var conversationId = logos.common.preconditions.checkNotNull(
      protoCommand.getConversationId(), 'Conversation id is null');
  var protoThread = logos.common.preconditions.checkNotNull(
      protoCommand.getThread(), 'Thread is null');
  return new logos.command.AddThreadCommand(
      /** @type {string} */ (conversationId),
      this.deserializeThread(
          /** @type {!logos.protocol.messages.Thread} */ (protoThread)));
};


/**
 * @param {!logos.protocol.messages.Command.AddCommentCommand} protoCommand
 * @return {!logos.command.AddCommentCommand}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeAddCommentCommand =
    function(protoCommand) {
  var conversationId = logos.common.preconditions.checkNotNull(
      protoCommand.getConversationId(), 'Conversation id is null');
  var threadId = logos.common.preconditions.checkNotNull(
      protoCommand.getThreadId(), 'Thread id is null');
  var protoComment = logos.common.preconditions.checkNotNull(
      protoCommand.getComment(), 'Comment is null');
  return new logos.command.AddCommentCommand(
      /** @type {string} */ (conversationId),
      /** @type {string} */ (threadId),
      this.deserializeComment(
          /** @type {!logos.protocol.messages.Comment} */ (protoComment)));
};


/**
 * @param {!logos.protocol.messages.Conversation} protoConversation
 * @return {!logos.model.Conversation}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeConversation =
    function(protoConversation) {
  var id = logos.common.preconditions.checkNotNull(
      protoConversation.getId(), 'Conversation id is null');
  return new logos.model.Conversation(/** @type {string} */ (id));
};


/**
 * @param {!logos.protocol.messages.Thread} protoThread
 * @return {!logos.model.Thread}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeThread =
    function(protoThread) {
  var topic;
  switch (protoThread.getTopic().getType()) {
    case logos.protocol.messages.Topic.Type.MAIN:
      topic = logos.model.Thread.Topic.MAIN;
      break;
    default:
      throw Error('Unknown topic ' + protoThread.getTopic());
  }
  var id = logos.common.preconditions.checkNotNull(
      protoThread.getId(), 'Thread id is null');
  return new logos.model.Thread(/** @type {string} */ (id), topic);
};


/**
 * @param {!logos.protocol.messages.Comment} protoComment
 * @return {!logos.model.Comment}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeComment =
    function(protoComment) {
  var id = logos.common.preconditions.checkNotNull(
      protoComment.getId(), 'Comment id is null');
  var body = logos.common.preconditions.checkNotNull(
      protoComment.getBody(), 'Body is null');
  var timestamp = logos.common.preconditions.checkNotNull(
      protoComment.getModifiedTimestamp(), 'Modified timestamp is null');
  var userId = logos.common.preconditions.checkNotNull(
      protoComment.getUserId(), 'User id is null');
  return new logos.model.Comment(
      /** @type {string} */ (id), /** @type {string} */ (body),
      /** @type {number} */ (timestamp), /** @type {string} */ (userId));
};


/**
 * @param {!logos.protocol.messages.User} protoUser
 * @return {!logos.model.User}
 */
logos.protocol.MessagesDeserializer.prototype.deserializeUser =
    function(protoUser) {
  var id = logos.common.preconditions.checkNotNull(
      protoUser.getId(), 'User id is null');
  var email = logos.common.preconditions.checkNotNull(
      protoUser.getEmail(), 'Email is null');
  var handle = logos.common.preconditions.checkNotNull(
      protoUser.getHandle(), 'Handle is null');
  return new logos.model.User(/** @type {string} */ (id),
      /** @type {string} */ (email), /** @type {string} */ (handle));
};
