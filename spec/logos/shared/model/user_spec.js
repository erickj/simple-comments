goog.provide('spec.logos.model.UserSpec');

goog.require('logos.model.Object');
goog.require('logos.model.User');

describe('logos.model.User', function() {
  describe('#getId', function() {
    it('gets the user id', function() {
      var user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
      expect(user.getId()).toBe('user-id');
    });
  });

  describe('#getType', function() {
    it('gets the user object type', function() {
      var user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
      expect(user.getType()).toBe('user');
    });
  });

  describe('#getEmail', function() {
    it('gets the user email', function() {
      var user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
      expect(user.getEmail()).toBe('erick@j.com');
    });
  });

  describe('#getHandle', function() {
    it('gets the user handle', function() {
      var user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
      expect(user.getHandle()).toBe('Erick J');
    });
  });
});
