goog.provide('spec.logos.storage.mechanism.InMemoryMechanismSpec');

goog.require('logos.storage.mechanism.InMemoryMechanism');


/** Tests for {@code logos.storage.mechanism.InMemoryMechanism} */
describe('logos.storage.mechanism.InMemoryMechanism', function() {
  var mechanism;

  beforeEach(function() {
    mechanism = new logos.storage.mechanism.InMemoryMechanism();
  });

  describe('#get #set', function() {
    it('gets and sets values in storage', function() {
      expect(mechanism.get('key')).toBe(null);
      mechanism.set('key', 'value');
      expect(mechanism.get('key')).toBe('value');
    });
  });

  describe('#remove', function() {
    it('removes keys that have been set', function() {
      mechanism.set('key', 'value');
      mechanism.remove('key');
      expect(mechanism.get('key')).toBe(null);
    });
  });
});
