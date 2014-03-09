goog.provide('spec.logos.protocol.MessagesDeserializerSpec');

goog.require('logos.command.AddCommentCommand');
goog.require('logos.command.AddConversationCommand');
goog.require('logos.command.AddThreadCommand');
goog.require('logos.command.AddUserCommand');
goog.require('logos.command.NoopCommand');
goog.require('logos.model.Comment');
goog.require('logos.model.Conversation');
goog.require('logos.model.Thread');
goog.require('logos.model.User');
goog.require('logos.protocol.MessagesDeserializer');
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
goog.require('logos.protocol.messages.User');

describe('logos.protocol.MessagesDeserializer', function() {
  var deserializer;

  /**
   * Creates the command wrapper union type.
   * @param {!Object} protoSubCommand
   * @return {!logos.protocol.messages.Command}
   */
  var createProtoCommandWrapper = function(protoSubCommand) {
    var Command = logos.protocol.messages.Command;
    var protoCommand = new Command();
    if (protoSubCommand instanceof Command.NoopCommand) {
      protoCommand.setNoopCommand(protoSubCommand);
      protoCommand.setType(Command.Type.NOOP);
    } else if (protoSubCommand instanceof Command.AddConversationCommand) {
      protoCommand.setAddConversationCommand(protoSubCommand);
      protoCommand.setType(Command.Type.ADD_CONVERSATION);
    } else if (protoSubCommand instanceof Command.AddThreadCommand) {
      protoCommand.setAddThreadCommand(protoSubCommand);
      protoCommand.setType(Command.Type.ADD_THREAD);
    } else if (protoSubCommand instanceof Command.AddCommentCommand) {
      protoCommand.setAddCommentCommand(protoSubCommand);
      protoCommand.setType(Command.Type.ADD_COMMENT);
    } else if (protoSubCommand instanceof Command.AddUserCommand) {
      protoCommand.setAddUserCommand(protoSubCommand);
      protoCommand.setType(Command.Type.ADD_USER);
    } else {
      throw Error('Unknown command type');
    }
    return protoCommand;
  };

  beforeEach(function() {
    deserializer = new logos.protocol.MessagesDeserializer();
  });

  describe('#deserializeCommandSet', function() {
    var protoCommandSet;

    beforeEach(function() {
      protoCommandSet = new logos.protocol.messages.CommandSet();
    });

    it('deserializes an empty command set into an empty array', function() {
      expect(deserializer.deserializeCommandSet(protoCommandSet)).toEqual([]);
    });

    describe('multiple commands', function() {
      beforeEach(function() {
        // Adds a noop command
        protoCommandSet.addCommand(createProtoCommandWrapper(
            new logos.protocol.messages.Command.NoopCommand()));

        // Adds a conversation command
        var protoConversation = new logos.protocol.messages.Conversation();
        protoConversation.setId('convo-id');
        var protoAddConversationCommand =
            new logos.protocol.messages.Command.AddConversationCommand();
        protoAddConversationCommand.setConversation(protoConversation);

        protoCommandSet.addCommand(
            createProtoCommandWrapper(protoAddConversationCommand));
      });

      it('deserializes in order', function() {
        var commandSet = deserializer.deserializeCommandSet(protoCommandSet);
        expect(commandSet.length).toBe(2);
        expect(commandSet[0]).toEqual(jasmine.any(logos.command.NoopCommand));
        expect(commandSet[1]).toEqual(
            jasmine.any(logos.command.AddConversationCommand));
      });
    });

    describe('noop command', function() {
      beforeEach(function() {
        protoCommandSet.addCommand(createProtoCommandWrapper(
            new logos.protocol.messages.Command.NoopCommand()));
      });

      it('deserializes', function() {
        var commandSet = deserializer.deserializeCommandSet(protoCommandSet);
        expect(commandSet.length).toBe(1);
        expect(commandSet[0]).toEqual(new logos.command.NoopCommand());
      });
    });

    describe('add conversation command', function() {
      beforeEach(function() {
        var protoConversation = new logos.protocol.messages.Conversation();
        protoConversation.setId('convo-id');
        var protoAddConversationCommand =
            new logos.protocol.messages.Command.AddConversationCommand();
        protoAddConversationCommand.setConversation(protoConversation);

        protoCommandSet.addCommand(
            createProtoCommandWrapper(protoAddConversationCommand));
      });

      it('deserializes', function() {
        var commandSet = deserializer.deserializeCommandSet(protoCommandSet);
        expect(commandSet.length).toBe(1);
        expect(commandSet[0]).toEqual(
            new logos.command.AddConversationCommand(
                new logos.model.Conversation('convo-id')));
      });
    });

    describe('add thread command', function() {
      beforeEach(function() {
        var protoTopic = new logos.protocol.messages.Topic();
        protoTopic.setType(logos.protocol.messages.Topic.Type.MAIN);
        var protoThread = new logos.protocol.messages.Thread();
        protoThread.setId('thread-id');
        protoThread.setTopic(protoTopic);
        var protoAddThreadCommand =
            new logos.protocol.messages.Command.AddThreadCommand();
        protoAddThreadCommand.setConversationId('convo-id');
        protoAddThreadCommand.setThread(protoThread);

        protoCommandSet.addCommand(
            createProtoCommandWrapper(protoAddThreadCommand));
      });

      it('deserializes', function() {
        var commandSet = deserializer.deserializeCommandSet(protoCommandSet);
        expect(commandSet.length).toBe(1);
        expect(commandSet[0]).toEqual(new logos.command.AddThreadCommand(
            'convo-id',
            new logos.model.Thread(
                'thread-id', logos.model.Thread.Topic.MAIN)));
      });
    });

    describe('add comment command', function() {
      beforeEach(function() {
        var protoComment = new logos.protocol.messages.Comment();
        protoComment.setId('comment-id');
        protoComment.setBody('body body body');
        protoComment.setModifiedTimestamp(123456);
        protoComment.setUserId('a-user-id');
        var protoAddCommentCommand =
            new logos.protocol.messages.Command.AddCommentCommand();
        protoAddCommentCommand.setConversationId('convo-id');
        protoAddCommentCommand.setThreadId('thread-id');
        protoAddCommentCommand.setComment(protoComment);

        protoCommandSet.addCommand(
            createProtoCommandWrapper(protoAddCommentCommand));
      });

      it('deserializes', function() {
        var commandSet = deserializer.deserializeCommandSet(protoCommandSet);
        expect(commandSet.length).toBe(1);
        expect(commandSet[0]).toEqual(new logos.command.AddCommentCommand(
            'convo-id', 'thread-id', new logos.model.Comment(
                'comment-id', 'body body body', 123456, 'a-user-id')));
      });
    });

    describe('add user command', function() {
      beforeEach(function() {
        var protoUser = new logos.protocol.messages.User();
        protoUser.setId('user-id');
        protoUser.setEmail('erick@j.com');
        protoUser.setHandle('Erick J');
        var protoAddUserCommand =
            new logos.protocol.messages.Command.AddUserCommand();
        protoAddUserCommand.setUser(protoUser);

        protoCommandSet.addCommand(
            createProtoCommandWrapper(protoAddUserCommand));
      });

      it('deserializes', function() {
        var commandSet = deserializer.deserializeCommandSet(protoCommandSet);
        expect(commandSet.length).toBe(1);
        expect(commandSet[0]).toEqual(new logos.command.AddUserCommand(
            new logos.model.User('user-id', 'erick@j.com', 'Erick J')));
      });
    });
  });
});
