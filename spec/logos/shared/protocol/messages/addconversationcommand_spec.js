goog.provide('spec.logos.protocol.messages.Command.AddConversationCommandSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Command.AddConversationCommand');
goog.require('logos.protocol.messages.Conversation');


/** Tests for {@code logos.protocol.messages.Command.AddConversationCommand}. */
describe('logos.protocol.messages.Command.AddConversationCommand', function() {
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Command.AddConversationCommand();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Command.AddConversationCommand()).toEqual(
          jasmine.any(logos.protocol.messages.Command.AddConversationCommand));
    });
  });

  describe('fields', function() {
    describe('conversation', function() {
      it('#set, #get*, #has*', function() {
        expect(message.hasConversation()).toBe(false);
        expect(message.getConversation()).toBe(null);
        expect(message.getConversationOrDefault()).toEqual(
            new logos.protocol.messages.Conversation());

        var conversation = new logos.protocol.messages.Conversation();
        message.setConversation(conversation);
        expect(message.hasConversation()).toBe(true);
        expect(message.getConversation()).toBe(conversation);
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor =
          logos.protocol.messages.Command.AddConversationCommand.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': {
          '1': 'conversation-guid'
        }
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(
          logos.protocol.messages.Command.AddConversationCommand));

      var expectedConversation = new logos.protocol.messages.Conversation();
      expectedConversation.setGuid('conversation-guid');
      expect(message.getConversation()).toEqual(expectedConversation);
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Command.AddConversationCommand();
      var expectedConversation = new logos.protocol.messages.Conversation();
      expectedConversation.setGuid('conversation-guid');
      message.setConversation(expectedConversation);
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
