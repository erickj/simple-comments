goog.provide('spec.logos.command.AddThreadCommandSpec');

goog.require('logos.command.AddThreadCommand');
goog.require('logos.command.CommandContext');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.Conversation');
goog.require('logos.model.Thread');
goog.require('logos.model.Model');

describe('logos.command.AddThreadCommand', function() {
  var thread;
  var conversation;
  var commandContext;
  var model;

  beforeEach(function() {
    thread = new logos.model.Thread('thread-id', logos.model.Thread.Topic.MAIN);
    conversation = new logos.model.Conversation('convo-id');
    model = new logos.model.Model();
    commandContext = new logos.command.CommandContext(model);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing thread with the same id',
       function() {
         var command = new logos.command.AddThreadCommand('convo-id', thread);
         model.addConversation(conversation);
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a conversation doesn\'t exist', function() {
      conversation.addThread(thread);
      var command = new logos.command.AddThreadCommand('convo-id', thread);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });

    it('errors when a thread exists with the same id', function() {
      model.addConversation(conversation);
      conversation.addThread(thread);
      var command = new logos.command.AddThreadCommand('convo-id', thread);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });
  });

  describe('#apply', function() {
    it('adds a thread to a conversation in the model', function() {
      model.addConversation(conversation);
      expect(conversation.hasThread('thread-id')).toBe(false);
      var command = new logos.command.AddThreadCommand('convo-id', thread);
      command.apply(commandContext);
      expect(conversation.hasThread('thread-id')).toBe(true);
    });
  });
});
