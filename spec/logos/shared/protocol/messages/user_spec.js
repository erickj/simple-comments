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
    describe('id', function() {
      it('#set*, #get*, #has*', function() {
        expect(user.hasId()).toBe(false);
        expect(user.getId()).toBe(null);
        expect(user.getIdOrDefault()).toBe('');

        user.setId('user-id');
        expect(user.hasId()).toBe(true);
        expect(user.getId()).toBe('user-id');
      });
    });

    describe('email', function() {
      it('#set*, #get*, #has*', function() {
        expect(user.hasEmail()).toBe(false);
        expect(user.getEmail()).toBe(null);
        expect(user.getEmailOrDefault()).toBe('');

        user.setEmail('erick@j.com');
        expect(user.hasEmail()).toBe(true);
        expect(user.getEmail()).toBe('erick@j.com');
      });
    });

    describe('handle', function() {
      it('#set*, #get*, #has*', function() {
        expect(user.hasHandle()).toBe(false);
        expect(user.getHandle()).toBe(null);
        expect(user.getHandleOrDefault()).toBe('');

        user.setHandle('Erick J');
        expect(user.hasHandle()).toBe(true);
        expect(user.getHandle()).toBe('Erick J');
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
        '1': 'user-id',
        '2': 'erick@j.com',
        '3': 'Erick J'
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(logos.protocol.messages.User));
      expect(message.getId()).toBe('user-id');
      expect(message.getEmail()).toBe('erick@j.com');
      expect(message.getHandle()).toBe('Erick J');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.User();
      message.setId('user-id');
      message.setEmail('erick@j.com');
      message.setHandle('Erick J');
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
