goog.provide('spec.logos.command.AddCommentCommandSpec');

goog.require('logos.command.AddCommentCommand');
goog.require('logos.command.CommandContext');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.Comment');
goog.require('logos.model.Conversation');
goog.require('logos.model.Thread');
goog.require('logos.model.User');
goog.require('logos.model.Model');

describe('logos.command.AddCommentCommand', function() {
  var comment;
  var thread;
  var conversation;
  var commandContext;
  var model;
  var user;

  beforeEach(function() {
    user = new logos.model.User('user-id', 'erick@j.com', 'Erick J')
    comment = new logos.model.Comment('comment-id', 'body body', 123, 'user-id');
    thread = new logos.model.Thread('thread-id', logos.model.Thread.Topic.MAIN);
    conversation = new logos.model.Conversation('convo-id');
    model = new logos.model.Model();
    commandContext = new logos.command.CommandContext(model);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing comment with the same id',
       function() {
         var command = new logos.command.AddCommentCommand(
             'convo-id', 'thread-id', comment);
         model.addUser(user);
         model.addConversation(conversation);
         conversation.addThread(thread);
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a user doesn\'t exist', function() {
      var command = new logos.command.AddCommentCommand(
          'convo-id', 'thread-id', comment);
      model.addUser(user);
      model.addConversation(conversation);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });

    it('errors when a conversation doesn\'t exist', function() {
      var command = new logos.command.AddCommentCommand(
          'convo-id', 'thread-id', comment);
      model.addUser(user);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });

    it('errors when a thread doesn\'t exist', function() {
      var command = new logos.command.AddCommentCommand(
          'convo-id', 'thread-id', comment);
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
      var command = new logos.command.AddCommentCommand(
          'convo-id', 'thread-id', comment);
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
      var command = new logos.command.AddCommentCommand(
          'convo-id', 'thread-id', comment);
      command.apply(commandContext);
      expect(thread.hasComment('comment-id')).toBe(true);
    });
  });
});
