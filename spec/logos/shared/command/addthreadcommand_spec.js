goog.provide('spec.logos.command.AddThreadCommandSpec');

goog.require('logos.command.AddThreadCommand');
goog.require('logos.command.CommandContext');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.Conversation');
goog.require('logos.model.Model');
goog.require('logos.model.Thread');
goog.require('logos.model.VersionProvider');

describe('logos.command.AddThreadCommand', function() {
  var thread;
  var conversation;
  var commandContext;
  var model;
  var command;

  beforeEach(function() {
    thread = new logos.model.Thread('thread-id', logos.model.Thread.Topic.MAIN);
    conversation = new logos.model.Conversation('convo-id');
    model = new logos.model.Model(new logos.model.VersionProvider());
    commandContext = new logos.command.CommandContext(model);
    command = new logos.command.AddThreadCommand('convo-id', thread);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing thread with the same id',
       function() {
         model.addConversation(conversation);
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a conversation doesn\'t exist', function() {
      conversation.addThread(thread);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });

    it('errors when a thread exists with the same id', function() {
      model.addConversation(conversation);
      conversation.addThread(thread);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });
  });

  describe('#apply', function() {
    it('adds a thread to a conversation in the model', function() {
      model.addConversation(conversation);
      expect(conversation.hasThread('thread-id')).toBe(false);
      command.apply(commandContext);
      expect(conversation.hasThread('thread-id')).toBe(true);
    });
  });

  describe('#transform', function() {
    it('returns itself for any command it doesn\'t transform against',
       function() {
         expect(command.transform(logos.command.NoopCommand.INSTANCE)).
             toBe(command);
       });

    it('returns a noop command when transforming against a command equal to ' +
       'itself',
       function() {
         expect(command.transform(command)).
             toBe(logos.command.NoopCommand.INSTANCE);
       });
  });

  describe('#equals', function() {
    it('returns true for commands like itself', function() {
      expect(command.equals(command)).toBe(true);
      var similarCommand =
          new logos.command.AddThreadCommand('convo-id', thread);
      expect(command.equals(similarCommand)).toBe(true);
    });

    it('returns false for command unlike itself', function() {
      var dissimilarCommand =
          new logos.command.AddThreadCommand('foo-convo-id', thread);
      expect(command.equals(dissimilarCommand)).toBe(false);
    });
  });
});
