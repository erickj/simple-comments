goog.provide('spec.logos.storage.MessageStorageSpec');

goog.require('goog.json');
goog.require('goog.proto2.PbLiteSerializer');
goog.require('logos.protocol.messages.User');
goog.require('logos.storage.MessageStorage');
goog.require('logos.storage.mechanism.InMemoryMechanism');


/** Tests for {@code logos.storage.MessageStorage} */
describe('logos.storage.MessageStorage', function() {
  var mechanism;
  var descriptor;
  var serializer;
  /** @type {!logos.storage.MessageStorage.<logos.protocol.messages.User>} */
  var messageStorage;

  beforeEach(function() {
    mechanism = new logos.storage.mechanism.InMemoryMechanism();
    descriptor = logos.protocol.messages.User.getDescriptor();
    serializer = new goog.proto2.PbLiteSerializer();
    messageStorage =
        new logos.storage.MessageStorage(mechanism, descriptor, serializer);
  });

  describe('#set', function() {
    it('sets messages in storage', function() {
      var userMessage = new logos.protocol.messages.User();
      userMessage.setEmail('erick@j.com');

      messageStorage.set('key', userMessage);
      expect(mechanism.get('key')).toBeDefined();

      var jsonSerializer = new goog.json.Serializer();
      expect(mechanism.get('key')).toBe(
          jsonSerializer.serialize(serializer.serialize(userMessage)));
    });

    it('does nothing for null values', function() {
      messageStorage.set('key', null);
      expect(messageStorage.get('key')).toBeNull();
    });
  });

  describe('#get', function() {
    it('returns null for a key that has not been #set', function() {
      expect(messageStorage.get('key')).toBeNull();
    });

    it('returns the deserialized message for a message previously #set', function() {
      var userMessage = new logos.protocol.messages.User();
      userMessage.setEmail('erick@j.com');
      messageStorage.set('key', userMessage);

      var message = messageStorage.get('key');
      expect(message).toEqual(jasmine.any(logos.protocol.messages.User));
      expect(message.getEmail()).toBe('erick@j.com');
    });
  });

  describe('#remove', function() {
    it('is a noop for a key that has not been #set', function() {
      messageStorage.remove('key');
    });

    it('removes a key that has been #set', function() {
      var userMessage = new logos.protocol.messages.User();
      userMessage.setEmail('erick@j.com');
      messageStorage.set('key', userMessage);

      messageStorage.remove('key');
      expect(messageStorage.get('key')).toBeNull();
      expect(mechanism.get('key')).toBeNull();
    });
  });
});
