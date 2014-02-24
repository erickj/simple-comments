goog.provide('spec.logos.protocol.UserSpec');

goog.require('logos.protocol.User');


/** Tests for {@code logos.protocol.User}. */
describe('logos.protocol.User', function() {
  describe('email', function() {
    it('can be set', function() {
      var user = new logos.protocol.User();
      expect(user.hasEmail()).toBe(false);
      expect(user.getEmail()).toBe(null);

      user.setEmail('erick@j.com');
      expect(user.hasEmail()).toBe(true);
      expect(user.getEmail()).toBe('erick@j.com');
    });
  });
});
