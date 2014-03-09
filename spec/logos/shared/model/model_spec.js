goog.provide('spec.logos.model.ModelSpec');

goog.require('logos.model.Conversation');
goog.require('logos.model.Model');
goog.require('logos.model.User');

describe('logos.model.Model', function() {
  var user;
  var conversation;

  beforeEach(function() {
    user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
    conversation = new logos.model.Conversation('convo-id');
  });

  describe('conversations', function() {
    describe('#addConversation', function() {
      it('adds a conversation to the model', function() {
        var model = new logos.model.Model();
        model.addConversation(conversation);
        expect(model.getConversation('convo-id')).toBe(conversation);
      });
    });

    describe('#getConversation', function() {
      it('throws an error if there is no conversation', function() {
        var model = new logos.model.Model();
        expect(function() {
          model.getConversation('convo');
        }).toThrow();
      });

      it('gets the expected conversation if it exists', function() {
        var model = new logos.model.Model();
        model.addConversation(conversation);
        expect(model.getConversation('convo-id')).toBe(conversation);
      });
    });

    describe('#hasConversation', function() {
      it('returns false if there is no conversation', function() {
        var model = new logos.model.Model();
        expect(model.hasConversation('convo-id')).toBe(false);
      });

      it('returns true if there is a conversation', function() {
        var model = new logos.model.Model();
        model.addConversation(conversation);
        expect(model.hasConversation('convo-id')).toBe(true);
      });
    });
  });

  describe('users', function() {
    describe('#addUser', function() {
      it('adds a user to the model', function() {
        var model = new logos.model.Model();
        model.addUser(user);
        expect(model.getUser('user-id')).toBe(user);
      });
    });

    describe('#getUser', function() {
      it('throws an error if there is no user', function() {
        var model = new logos.model.Model();
        expect(function() {
          model.getUser('user');
        }).toThrow();
      });

      it('gets the expected user if it exists', function() {
        var model = new logos.model.Model();
        model.addUser(user);
        expect(model.getUser('user-id')).toBe(user);
      });
    });

    describe('#hasUser', function() {
      it('returns false if there is no user', function() {
        var model = new logos.model.Model();
        expect(model.hasUser('user-id')).toBe(false);
      });

      it('returns true if there is a user', function() {
        var model = new logos.model.Model();
        model.addUser(user);
        expect(model.hasUser('user-id')).toBe(true);
      });
    });
  });
});
