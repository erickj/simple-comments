goog.provide('spec.logos.protocol.messages.UserSpec');

goog.require('logos.protocol.messages.User');


/** Tests for {@code logos.protocol.messages.User}. */
describe('logos.protocol.messages.User', function() {
  var user;

  beforeEach(function() {
    user = new logos.protocol.messages.User();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.User()).toEqual(
          jasmine.any(logos.protocol.messages.User));
    });
  });

  describe('fields', function() {
    describe('email', function() {
      it('#set*, #get*, #has*', function() {
        expect(user.hasEmail()).toBe(false);
        expect(user.getEmail()).toBe(null);
        expect(user.getEmailOrDefault()).toBe('anonymous.coward@example.com');

        user.setEmail('erick@j.com');
        expect(user.hasEmail()).toBe(true);
        expect(user.getEmail()).toBe('erick@j.com');
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor = logos.protocol.messages.User.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': 'erick@j.com'
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(logos.protocol.messages.User));
      expect(message.getEmail()).toBe('erick@j.com');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.User();
      message.setEmail('erick@j.com');
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
