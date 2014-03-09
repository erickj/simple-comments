goog.provide('spec.logos.protocol.messages.CommentSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Comment');
goog.require('logos.protocol.messages.User');


/** Tests for {@code logos.protocol.messages.Comment}. */
describe('logos.protocol.messages.Comment', function() {
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Comment();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Comment()).toEqual(
          jasmine.any(logos.protocol.messages.Comment));
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

    describe('body', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasBody()).toBe(false);
        expect(message.getBody()).toBe(null);
        expect(message.getBodyOrDefault()).toBe('');

        message.setBody('the rain in spain falls mainly on the plain');
        expect(message.hasBody()).toBe(true);
        expect(message.getBody()).toBe(
            'the rain in spain falls mainly on the plain');
      });
    });

    describe('modified_timestamp', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasModifiedTimestamp()).toBe(false);
        expect(message.getModifiedTimestamp()).toBe(null);
        expect(message.getModifiedTimestampOrDefault()).toBe(0);

        message.setModifiedTimestamp(1234567890);
        expect(message.hasModifiedTimestamp()).toBe(true);
        expect(message.getModifiedTimestamp()).toBe(1234567890);
      });
    });

    describe('user_id', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasUserId()).toBe(false);
        expect(message.getUserId()).toBe(null);
        expect(message.getUserIdOrDefault()).toBe('');

        message.setUserId('user-abc');
        expect(message.hasUserId()).toBe(true);
        expect(message.getUserId()).toEqual('user-abc');
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor = logos.protocol.messages.Comment.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': 'xyz123',
        '2': 'body body body',
        '3': 10987654321,
        '4': 'user-id'
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(logos.protocol.messages.Comment));
      expect(message.getId()).toBe('xyz123');
      expect(message.getBody()).toBe('body body body');
      expect(message.getModifiedTimestamp()).toBe(10987654321);
      expect(message.getUserId()).toEqual('user-id');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Comment();
      message.setId('xyz123');
      message.setBody('body body body');
      message.setModifiedTimestamp(10987654321);
      message.setUserId('user-id');
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
