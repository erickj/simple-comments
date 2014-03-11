goog.provide('spec.logos.command.AddCommentCommandSpec');

goog.require('logos.command.AddCommentCommand');
goog.require('logos.command.CommandContext');
goog.require('logos.command.NoopCommand');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.Comment');
goog.require('logos.model.Conversation');
goog.require('logos.model.Model');
goog.require('logos.model.Thread');
goog.require('logos.model.User');
goog.require('logos.model.VersionProvider');

describe('logos.command.AddCommentCommand', function() {
  var comment;
  var thread;
  var conversation;
  var commandContext;
  var model;
  var user;
  var command;

  beforeEach(function() {
    user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
    comment =
        new logos.model.Comment('comment-id', 'body body', 123, 'user-id');
    thread = new logos.model.Thread('thread-id', logos.model.Thread.Topic.MAIN);
    conversation = new logos.model.Conversation('convo-id');
    model = new logos.model.Model(new logos.model.VersionProvider());
    commandContext = new logos.command.CommandContext(model);
    command = new logos.command.AddCommentCommand(
        'convo-id', 'thread-id', comment);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing comment with the same id',
       function() {
         model.addUser(user);
         model.addConversation(conversation);
         conversation.addThread(thread);
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a user doesn\'t exist', function() {
      model.addUser(user);
      model.addConversation(conversation);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });

    it('errors when a conversation doesn\'t exist', function() {
      model.addUser(user);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });

    it('errors when a thread doesn\'t exist', function() {
      model.addUser(user);
      model.addConversation(conversation);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });

    it('errors when a comment exists with the same id', function() {
      model.addUser(user);
      model.addConversation(conversation);
      conversation.addThread(thread);
      thread.addComment(comment);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });
  });

  describe('#apply', function() {
    it('adds a comment to a thread in the model', function() {
      model.addConversation(conversation);
      conversation.addThread(thread);
      expect(thread.hasComment('comment-id')).toBe(false);
      command.apply(commandContext);
      expect(thread.hasComment('comment-id')).toBe(true);
    });
  });

  describe('#transform', function() {
    it('returns itself for any command it doesn\'t transform against',
       function() {
         expect(command.transform(logos.command.NoopCommand.INSTANCE)).
             toBe(command);
       });

    it('returns a noop command when transforming against a command equal to itself',
       function() {
         expect(command.transform(command)).
             toBe(logos.command.NoopCommand.INSTANCE);
       });
  });

  describe('#equals', function() {
    it('returns true for commands like itself', function() {
      expect(command.equals(command)).toBe(true);
      var similarCommand = new logos.command.AddCommentCommand(
        'convo-id', 'thread-id', comment);
      expect(command.equals(similarCommand)).toBe(true);
    });

    it('returns false for command unlike itself', function() {
      var dissimilarCommand = new logos.command.AddCommentCommand(
        'foo-id', 'foo-thread-id', comment);
      expect(command.equals(dissimilarCommand)).toBe(false);
    });
  });
});
