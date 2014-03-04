goog.provide('spec.logos.protocol.messages.Command.AddThreadCommandSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Command.AddThreadCommand');
goog.require('logos.protocol.messages.Thread');


/** Tests for {@code logos.protocol.messages.Command.AddThreadCommand}. */
describe('logos.protocol.messages.Command.AddThreadCommand', function() {
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Command.AddThreadCommand();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Command.AddThreadCommand()).toEqual(
          jasmine.any(logos.protocol.messages.Command.AddThreadCommand));
    });
  });

  describe('fields', function() {
    describe('thread', function() {
      it('#set, #get*, #has*', function() {
        expect(message.hasThread()).toBe(false);
        expect(message.getThread()).toBe(null);
        expect(message.getThreadOrDefault()).toEqual(
            new logos.protocol.messages.Thread());

        var thread = new logos.protocol.messages.Thread();
        thread.setGuid('t-guid');
        message.setThread(thread);
        expect(message.hasThread()).toBe(true);
        expect(message.getThread()).toBe(thread);
      });
    });

    describe('conversation_guid', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasConversationGuid()).toBe(false);
        expect(message.getConversationGuid()).toBe(null);
        expect(message.getConversationGuidOrDefault()).toBe('');

        message.setConversationGuid('cguidy');
        expect(message.hasConversationGuid()).toBe(true);
        expect(message.getConversationGuid()).toBe('cguidy');
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor =
          logos.protocol.messages.Command.AddThreadCommand.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': {
          '1': 'thread-guid'
        },
        '2': 'convo-guid'
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(
          logos.protocol.messages.Command.AddThreadCommand));

      var expectedThread = new logos.protocol.messages.Thread();
      expectedThread.setGuid('thread-guid');
      expect(message.getThread()).toEqual(expectedThread);
      expect(message.getConversationGuid()).toBe('convo-guid');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Command.AddThreadCommand();
      message.setConversationGuid('convo-guid');

      var expectedThread = new logos.protocol.messages.Thread();
      expectedThread.setGuid('thread-guid');
      message.setThread(expectedThread);
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
