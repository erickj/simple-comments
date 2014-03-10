goog.provide('spec.logos.command.AddConversationCommandSpec');

goog.require('logos.command.AddConversationCommand');
goog.require('logos.command.CommandContext');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.Conversation');
goog.require('logos.model.Model');
goog.require('logos.model.VersionProvider');

describe('logos.command.AddConversationCommand', function() {
  var conversation;
  var commandContext;
  var model;

  beforeEach(function() {
    conversation = new logos.model.Conversation('convo-id');
    model = new logos.model.Model(new logos.model.VersionProvider());
    commandContext = new logos.command.CommandContext(model);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing conversation with the same id',
       function() {
         var command = new logos.command.AddConversationCommand(conversation);
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a conversation exists with the same id', function() {
      model.addConversation(conversation);
      var command = new logos.command.AddConversationCommand(conversation);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });
  });

  describe('#apply', function() {
    it('adds a conversation to the model', function() {
      expect(model.hasConversation('convo-id')).toBe(false);
      var command = new logos.command.AddConversationCommand(conversation);
      command.apply(commandContext);
      expect(model.hasConversation('convo-id')).toBe(true);
    });
  });
});
