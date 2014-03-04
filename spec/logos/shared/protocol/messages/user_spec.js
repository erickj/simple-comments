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
