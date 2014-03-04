goog.provide('spec.logos.protocol.messages.TopicSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Topic');
goog.require('logos.protocol.messages.Topic.Type');


/** Tests for {@code logos.protocol.messages.Topic}. */
describe('logos.protocol.messages.Topic', function() {
  var Type = logos.protocol.messages.Topic.Type;
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Topic();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Topic()).toEqual(
          jasmine.any(logos.protocol.messages.Topic));
    });
  });

  describe('fields', function() {
    describe('type', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasType()).toBe(false);
        expect(message.getType()).toBe(null);

        message.setType(Type.MAIN);
        expect(message.hasType()).toBe(true);
        expect(message.getType()).toBe(Type.MAIN);
      });

      it('#getTypeOrDefault', function() {
        expect(message.getTypeOrDefault()).toBe(Type.MAIN);
      })
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor = logos.protocol.messages.Topic.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': 1
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(logos.protocol.messages.Topic));
      expect(message.getType()).toBe(Type.MAIN);
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Topic();
      message.setType(Type.MAIN);
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
