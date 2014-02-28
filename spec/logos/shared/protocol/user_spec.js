goog.provide('spec.logos.protocol.UserSpec');

goog.require('logos.protocol.User');


/** Tests for {@code logos.protocol.User}. */
describe('logos.protocol.User', function() {
  var user;

  beforeEach(function() {
    user = new logos.protocol.User();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(
          new logos.protocol.User()).toEqual(jasmine.any(logos.protocol.User));
    });
  });

  describe('email', function() {
    it('#set*, #get*, #has*', function() {
      expect(user.hasEmail()).toBe(false);
      expect(user.getEmail()).toBe(null);

      user.setEmail('erick@j.com');
      expect(user.hasEmail()).toBe(true);
      expect(user.getEmail()).toBe('erick@j.com');
    });
  });
});
