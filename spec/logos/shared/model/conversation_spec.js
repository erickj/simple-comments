goog.provide('spec.logos.model.ConversationSpec');

goog.require('logos.model.Conversation');
goog.require('logos.model.Object');
goog.require('logos.model.Thread');

describe('logos.model.Conversation', function() {
  var thread;

  beforeEach(function() {
    thread = new logos.model.Thread('thread-id', logos.model.Thread.Topic.MAIN);
  });

  describe('#getId', function() {
    it('gets the conversation id', function() {
      var conversation = new logos.model.Conversation('convo-id');
      expect(conversation.getId()).toBe('convo-id');
    });
  });

  describe('#getType', function() {
    it('gets the conversation object type', function() {
      var conversation = new logos.model.Conversation('convo-id');
      expect(conversation.getType()).toBe('conversation');
    });
  });

  describe('#addThread', function() {
    it('adds threads to the conversation', function() {
      var conversation = new logos.model.Conversation('convo-id');
      conversation.addThread(thread);
      expect(conversation.getThread('thread-id')).toBe(thread);
    });
  });

  describe('#hasThread', function() {
    it('returns false if there is no thread', function() {
      var conversation = new logos.model.Conversation('convo-id');
      expect(conversation.hasThread('thread-id')).toBe(false);
    });

    it('returns true if there is a thread', function() {
      var conversation = new logos.model.Conversation('convo-id');
      conversation.addThread(thread);
      expect(conversation.hasThread('thread-id')).toBe(true);
    });
  });

  describe('#getThread', function() {
    it('errors if the there is no thread', function() {
      var conversation = new logos.model.Conversation('convo-id');
      expect(function() {
        conversation.getThread('none');
      }).toThrow();
    });

    it('gets the thread if it exists', function() {
      var conversation = new logos.model.Conversation('convo-id');
      conversation.addThread(thread);
      expect(conversation.getThread('thread-id')).toBe(thread);
    });
  });

  describe('#getThreads', function() {
    it('returns an empty array if there are no threads', function() {
      var conversation = new logos.model.Conversation('convo-id');
      expect(conversation.getThreads()).toEqual([]);
    });

    it('returns an array of all added threads', function() {
      var conversation = new logos.model.Conversation('convo-id');
      conversation.addThread(thread);
      expect(conversation.getThreads()).toEqual([thread]);
    });
  });
});
