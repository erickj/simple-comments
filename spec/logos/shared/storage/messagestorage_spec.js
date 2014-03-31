goog.provide('spec.logos.storage.MessageStorageSpec');

goog.require('goog.json');
goog.require('goog.proto2.ObjectSerializer');
goog.require('goog.testing.MockClock');
goog.require('logos.protocol.messages.User');
goog.require('logos.storage.MessageStorage');
goog.require('logos.storage.mechanism.InMemoryMechanism');
goog.require('spec.helpers.matchers.Promises');


/** Tests for {@code logos.storage.MessageStorage} */
describe('logos.storage.MessageStorage', function() {
  var mockClock = new goog.testing.MockClock();
  var mechanism;
  var descriptor;
  var serializer;
  /** @type {!logos.storage.MessageStorage.<logos.protocol.messages.User>} */
  var messageStorage;

  beforeEach(function() {
    mockClock.install();

    mechanism = new logos.storage.mechanism.InMemoryMechanism();
    descriptor = logos.protocol.messages.User.getDescriptor();
    serializer = new goog.proto2.ObjectSerializer();
    messageStorage =
        new logos.storage.MessageStorage(mechanism, descriptor, serializer);
  });

  afterEach(function() {
    // The system should leave no pending unhandled rejections. Advance the mock
    // clock to the end of time to catch any rethrows waiting in the queue.
    // @see {closure_library/goog/promise/promise_test.js}
    mockClock.tick(Infinity);
    mockClock.uninstall();
    mockClock.reset();
  });

  describe('#set', function() {
    it('sets messages in storage', function() {
      var userMessage = new logos.protocol.messages.User();
      userMessage.setEmail('erick@j.com');

      expect(messageStorage.set('key', userMessage)).
          toFulfillPromise(true, mockClock);
      expect(messageStorage.get('key')).
          toFulfillPromise(userMessage, mockClock);
    });

    it('does nothing for null values', function() {
      expect(messageStorage.set('key', null)).
          toRejectPromise(undefined, mockClock);
      expect(messageStorage.get('key')).
          toRejectPromise(undefined, mockClock);
    });
  });

  describe('#get', function() {
    it('returns null for a key that has not been #set', function() {
      expect(messageStorage.get('key')).toRejectPromise(
          undefined, mockClock);
    });

    it('returns the deserialized message for a message previously #set',
       function() {
         var userMessage = new logos.protocol.messages.User();
         userMessage.setEmail('erick@j.com');
         messageStorage.set('key', userMessage);

         expect(messageStorage.get('key')).
             toFulfillPromise(userMessage, mockClock);
       });
  });

  describe('#remove', function() {
    it('is a noop for a key that has not been #set', function() {
      expect(messageStorage.remove('key')).toFulfillPromise(false, mockClock);
    });

    it('removes a key that has been #set', function() {
      var userMessage = new logos.protocol.messages.User();
      userMessage.setEmail('erick@j.com');
      messageStorage.set('key', userMessage);

      expect(messageStorage.remove('key')).toFulfillPromise(true, mockClock);
      expect(mechanism.get('key')).toRejectPromise(undefined, mockClock);
    });
  });
});
