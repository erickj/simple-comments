goog.provide('spec.logos.model.UserSpec');

goog.require('logos.model.Object');
goog.require('logos.model.User');

describe('logos.model.User', function() {
  var user;

  beforeEach(function() {
    user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
  });

  describe('#getId', function() {
    it('gets the user id', function() {
      expect(user.getId()).toBe('user-id');
    });
  });

  describe('#getType', function() {
    it('gets the user object type', function() {
      expect(user.getType()).toBe('user');
    });
  });

  describe('#getEmail', function() {
    it('gets the user email', function() {
      expect(user.getEmail()).toBe('erick@j.com');
    });
  });

  describe('#getHandle', function() {
    it('gets the user handle', function() {
      expect(user.getHandle()).toBe('Erick J');
    });
  });

  describe('#equals', function() {
    it('returns true for the same object', function() {
      expect(user.equals(user)).toBe(true);
    });

    it('returns true for similar objects', function() {
      var similar = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
      expect(user.equals(similar)).toBe(true);
    });

    it('returns false for dissimilar objects', function() {
      var dissimilar = new logos.model.User('foo-user-id', 'foo@j.com', 'Foo J');
      expect(user.equals(dissimilar)).toBe(false);
    });
  });
});
