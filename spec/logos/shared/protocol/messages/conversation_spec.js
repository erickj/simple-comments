goog.provide('spec.logos.protocol.messages.ConversationSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Conversation');


/** Tests for {@code logos.protocol.messages.Conversation}. */
describe('logos.protocol.messages.Conversation', function() {
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Conversation();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Conversation()).toEqual(
          jasmine.any(logos.protocol.messages.Conversation));
    });
  });

  describe('fields', function() {
    describe('guid', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasGuid()).toBe(false);
        expect(message.getGuid()).toBe(null);
        expect(message.getGuidOrDefault()).toBe('');

        message.setGuid('guidy');
        expect(message.hasGuid()).toBe(true);
        expect(message.getGuid()).toBe('guidy');
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor = logos.protocol.messages.Conversation.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': 'xyz123'
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(
          logos.protocol.messages.Conversation));
      expect(message.getGuid()).toBe('xyz123');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Conversation();
      message.setGuid('xyz123');
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
