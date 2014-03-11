goog.provide('spec.logos.model.ConversationSpec');

goog.require('logos.model.Conversation');
goog.require('logos.model.Object');
goog.require('logos.model.Thread');

describe('logos.model.Conversation', function() {
  var thread;
  var conversation;

  beforeEach(function() {
    thread = new logos.model.Thread('thread-id', logos.model.Thread.Topic.MAIN);
    conversation = new logos.model.Conversation('convo-id');
  });

  describe('#getId', function() {
    it('gets the conversation id', function() {
      expect(conversation.getId()).toBe('convo-id');
    });
  });

  describe('#getType', function() {
    it('gets the conversation object type', function() {
      expect(conversation.getType()).toBe('conversation');
    });
  });

  describe('#addThread', function() {
    it('adds threads to the conversation', function() {
      conversation.addThread(thread);
      expect(conversation.getThread('thread-id')).toBe(thread);
    });
  });

  describe('#hasThread', function() {
    it('returns false if there is no thread', function() {
      expect(conversation.hasThread('thread-id')).toBe(false);
    });

    it('returns true if there is a thread', function() {
      conversation.addThread(thread);
      expect(conversation.hasThread('thread-id')).toBe(true);
    });
  });

  describe('#getThread', function() {
    it('errors if the there is no thread', function() {
      expect(function() {
        conversation.getThread('none');
      }).toThrow();
    });

    it('gets the thread if it exists', function() {
      conversation.addThread(thread);
      expect(conversation.getThread('thread-id')).toBe(thread);
    });
  });

  describe('#getThreads', function() {
    it('returns an empty array if there are no threads', function() {
      expect(conversation.getThreads()).toEqual([]);
    });

    it('returns an array of all added threads', function() {
      conversation.addThread(thread);
      expect(conversation.getThreads()).toEqual([thread]);
    });
  });

  describe('#equals', function() {
    it('equals itself', function() {
      expect(conversation.equals(conversation)).toBe(true);
    });

    it('equals other conversations with the same id and threads', function() {
      var otherConvo = new logos.model.Conversation('convo-id');
      expect(conversation.equals(otherConvo)).toBe(true);

      conversation.addThread(thread);
      expect(conversation.equals(otherConvo)).toBe(false);

      var otherThread =
          new logos.model.Thread('thread-id', logos.model.Thread.Topic.MAIN);
      otherConvo.addThread(otherThread);
      expect(conversation.equals(otherConvo)).toBe(true);
    });
  });
});
