goog.provide('spec.logos.protocol.messages.ThreadSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Thread');
goog.require('logos.protocol.messages.Topic');
goog.require('logos.protocol.messages.Topic.Type');


/** Tests for {@code logos.protocol.messages.Thread}. */
describe('logos.protocol.messages.Thread', function() {
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Thread();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Thread()).toEqual(
          jasmine.any(logos.protocol.messages.Thread));
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

    describe('Topic', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasTopic()).toBe(false);
        expect(message.getTopic()).toBe(null);
        expect(message.getTopicOrDefault()).toEqual(
            new logos.protocol.messages.Topic());

        var topic = new logos.protocol.messages.Topic();
        message.setTopic(topic);
        expect(message.hasTopic()).toBe(true);
        expect(message.getTopic()).toEqual(topic);
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor = logos.protocol.messages.Thread.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': 'xyz123',
        '2': {
          '1': 1
        }
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(logos.protocol.messages.Thread));
      expect(message.getGuid()).toBe('xyz123');

      var topic = new logos.protocol.messages.Topic();
      topic.setType(logos.protocol.messages.Topic.Type.MAIN);
      expect(message.getTopic()).toEqual(topic);
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Thread();
      message.setGuid('xyz123');
      var topic = new logos.protocol.messages.Topic();
      topic.setType(logos.protocol.messages.Topic.Type.MAIN);
      message.setTopic(topic);
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
