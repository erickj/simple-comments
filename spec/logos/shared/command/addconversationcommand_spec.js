goog.provide('spec.logos.command.AddConversationCommandSpec');

goog.require('logos.command.AddConversationCommand');
goog.require('logos.command.CommandExecutionContext');
goog.require('logos.command.NoopCommand');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.Conversation');
goog.require('logos.model.Model');
goog.require('logos.model.VersionProvider');

describe('logos.command.AddConversationCommand', function() {
  var conversation;
  var commandContext;
  var model;
  var command;

  beforeEach(function() {
    conversation = new logos.model.Conversation('convo-id');
    model = new logos.model.Model(new logos.model.VersionProvider());
    commandContext = new logos.command.CommandExecutionContext(model);
    command = new logos.command.AddConversationCommand(conversation);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing conversation with the same id',
       function() {
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a conversation exists with the same id', function() {
      model.addConversation(conversation);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });
  });

  describe('#apply', function() {
    it('adds a conversation to the model', function() {
      expect(model.hasConversation('convo-id')).toBe(false);
      command.apply(commandContext);
      expect(model.hasConversation('convo-id')).toBe(true);
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
          new logos.command.AddConversationCommand(conversation);
      expect(command.equals(similarCommand)).toBe(true);
    });

    it('returns false for command unlike itself', function() {
      var dissimilarCommand =
          new logos.command.AddConversationCommand(
              new logos.model.Conversation('foo-convo-id'));
      expect(command.equals(dissimilarCommand)).toBe(false);
    });
  });
});
