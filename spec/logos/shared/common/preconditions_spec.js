goog.provide('spec.logos.common.preconditionsSpec');

goog.require('logos.common.preconditions');
goog.require('logos.common.preconditions.IllegalArgumentException');


/** Tests for {@code logos.common.precondtions}. */
describe('logos.common.preconditions', function() {
  var preconditions = logos.common.preconditions;

  describe('.checkArgument', function() {
    it('throws an IllegalArgument exception for falsy values', function() {
      expect(function() {
        preconditions.checkArgument(false);
      }).toThrow(new preconditions.IllegalArgumentException());
    });

    it('does not throw for true values', function() {
      preconditions.checkArgument(true);
    });
  });

  describe('.checkState', function() {
    it('throws an IllegalState exception for falsy values', function() {
      expect(function() {
        preconditions.checkState(false);
      }).toThrow(new preconditions.IllegalStateException());
    });

    it('does not throw for true values', function() {
      preconditions.checkState(true);
    });
  });

  describe('.checkNotNull', function() {
    it('throws a NullPointer exception for null values', function() {
      expect(function() {
        preconditions.checkNotNull(null);
      }).toThrow(new preconditions.NullPointerException());
    });

    it('does not throw for non null values', function() {
      preconditions.checkNotNull('a');
      preconditions.checkNotNull({});
      preconditions.checkNotNull([]);
      preconditions.checkNotNull(false);
      preconditions.checkNotNull(undefined);
      preconditions.checkNotNull(0);
      preconditions.checkNotNull('');
    });

    it('returns the given non-null value', function() {
      var value = {};
      expect(preconditions.checkNotNull(value)).toBe(value);
    });
  });
});
