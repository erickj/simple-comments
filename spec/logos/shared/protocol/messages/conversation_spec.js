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
    describe('id', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasId()).toBe(false);
        expect(message.getId()).toBe(null);
        expect(message.getIdOrDefault()).toBe('');

        message.setId('idy');
        expect(message.hasId()).toBe(true);
        expect(message.getId()).toBe('idy');
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
      expect(message.getId()).toBe('xyz123');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Conversation();
      message.setId('xyz123');
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
