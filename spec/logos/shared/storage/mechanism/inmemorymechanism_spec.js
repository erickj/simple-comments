goog.provide('spec.logos.storage.mechanism.InMemoryMechanismSpec');

goog.require('goog.testing.MockClock');
goog.require('logos.storage.mechanism.InMemoryMechanism');
goog.require('logos.storage.mechanism.Mechanism');
goog.require('spec.helpers.matchers.Promises');


/** Tests for {@code logos.storage.mechanism.InMemoryMechanism} */
describe('logos.storage.mechanism.InMemoryMechanism', function() {
  var mockClock = new goog.testing.MockClock();
  var mechanism;
  var Failure = logos.storage.mechanism.Mechanism.Failure;

  beforeEach(function() {
    mockClock.install();
    mechanism = new logos.storage.mechanism.InMemoryMechanism();
  });

  afterEach(function() {
    // The system should leave no pending unhandled rejections. Advance the mock
    // clock to the end of time to catch any rethrows waiting in the queue.
    // @see {closure_library/goog/promise/promise_test.js}
    mockClock.tick(Infinity);
    mockClock.uninstall();
    mockClock.reset();
  });

  describe('#get', function() {
    it('gets rejected when no object is found', function() {
      expect(mechanism.get('key')).
          toRejectPromise(Failure.NOT_FOUND, mockClock);
    });

    it('gets fulfilled when an object is found', function() {
      mechanism.set('key', 'value');
      expect(mechanism.get('key')).toFulfillPromise('value', mockClock);
    });
  });

  describe('#set', function() {
    it('sets the value and fulfills the promise with true', function() {
      expect(mechanism.set('key', 'value')).toFulfillPromise(true, mockClock);
      expect(mechanism.get('key')).toFulfillPromise('value', mockClock);
    });
  });

  describe('#remove', function() {
    it('fulfills with false for keys that have not been set', function() {
      expect(mechanism.remove('notset')).toFulfillPromise(false, mockClock);
    });

    it('removes keys that have been set', function() {
      mechanism.set('key', 'value');
      expect(mechanism.remove('key')).toFulfillPromise(true, mockClock);
      expect(mechanism.get('key')).
          toRejectPromise(Failure.NOT_FOUND, mockClock);
    });
  });
});
