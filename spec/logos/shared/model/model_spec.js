goog.provide('spec.logos.model.ModelSpec');

goog.require('logos.model.Conversation');
goog.require('logos.model.Model');
goog.require('logos.model.User');
goog.require('logos.model.VersionProvider');

describe('logos.model.Model', function() {
  var user;
  var conversation;
  var versionProvider;
  var model;

  beforeEach(function() {
    user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
    conversation = new logos.model.Conversation('convo-id');
    versionProvider = new logos.model.VersionProvider();

    model = new logos.model.Model(versionProvider);
  });

  describe('#getVersion', function() {
    it('gets the version from the version provider', function() {
      expect(model.getVersion()).toBe(0);

      versionProvider.setVersion(123987);
      expect(model.getVersion()).toBe(123987);
    });
  });

  describe('conversations', function() {
    describe('#addConversation', function() {
      it('adds a conversation to the model', function() {
        model.addConversation(conversation);
        expect(model.getConversation('convo-id')).toBe(conversation);
      });
    });

    describe('#getConversation', function() {
      it('throws an error if there is no conversation', function() {
        expect(function() {
          model.getConversation('convo');
        }).toThrow();
      });

      it('gets the expected conversation if it exists', function() {
        model.addConversation(conversation);
        expect(model.getConversation('convo-id')).toBe(conversation);
      });
    });

    describe('#hasConversation', function() {
      it('returns false if there is no conversation', function() {
        expect(model.hasConversation('convo-id')).toBe(false);
      });

      it('returns true if there is a conversation', function() {
        model.addConversation(conversation);
        expect(model.hasConversation('convo-id')).toBe(true);
      });
    });
  });

  describe('users', function() {
    describe('#addUser', function() {
      it('adds a user to the model', function() {
        model.addUser(user);
        expect(model.getUser('user-id')).toBe(user);
      });
    });

    describe('#getUser', function() {
      it('throws an error if there is no user', function() {
        expect(function() {
          model.getUser('user');
        }).toThrow();
      });

      it('gets the expected user if it exists', function() {
        model.addUser(user);
        expect(model.getUser('user-id')).toBe(user);
      });
    });

    describe('#hasUser', function() {
      it('returns false if there is no user', function() {
        expect(model.hasUser('user-id')).toBe(false);
      });

      it('returns true if there is a user', function() {
        model.addUser(user);
        expect(model.hasUser('user-id')).toBe(true);
      });
    });
  });
});
