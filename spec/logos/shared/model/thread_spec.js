goog.provide('spec.logos.model.ThreadSpec');

goog.require('logos.model.Comment');
goog.require('logos.model.Object');
goog.require('logos.model.Thread');

describe('logos.model.Thread', function() {
  var comment;
  var Topic = logos.model.Thread.Topic;
  var thread;

  beforeEach(function() {
    comment = new logos.model.Comment(
        'comment-id', 'text text text', 123456, 'a-user');
    thread = new logos.model.Thread('thread-id', Topic.MAIN);
  });

  describe('#getId', function() {
    it('gets the thread id', function() {
      expect(thread.getId()).toBe('thread-id');
    });
  });

  describe('#getType', function() {
    it('gets the thread object type', function() {
      expect(thread.getType()).toBe('thread');
    });
  });

  describe('#getTopic', function() {
    it('gets the thread topic', function() {
      expect(thread.getTopic()).toBe('main');
    });
  });

  describe('#addComment', function() {
    it('adds comments to the thread', function() {
      thread.addComment(comment);
      expect(thread.getComment('comment-id')).toBe(comment);
    });
  });

  describe('#hasComment', function() {
    it('returns false if there is no comment', function() {
      expect(thread.hasComment('comment-id')).toBe(false);
    });

    it('returns true if there is a comment', function() {
      thread.addComment(comment);
      expect(thread.hasComment('comment-id')).toBe(true);
    });
  });

  describe('#getComment', function() {
    it('errors if the there is no comment', function() {
      expect(function() {
        thread.getComment('none');
      }).toThrow();
    });

    it('gets the comment if it exists', function() {
      thread.addComment(comment);
      expect(thread.getComment('comment-id')).toBe(comment);
    });
  });

  describe('#getComments', function() {
    it('returns an empty array if there are no comments', function() {
      expect(thread.getComments()).toEqual([]);
    });

    it('returns an array of all added comments', function() {
      thread.addComment(comment);
      expect(thread.getComments()).toEqual([comment]);
    });
  });

  describe('#equals', function() {
    it('returns true for the same object', function() {
      expect(thread.equals(thread)).toBe(true);
    });

    it('equals other threads with the same id, topic and comments', function() {
      var otherThread = new logos.model.Thread('thread-id', Topic.MAIN);
      expect(thread.equals(otherThread)).toBe(true);

      thread.addComment(comment);
      expect(thread.equals(otherThread)).toBe(false);

      var otherComment = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      otherThread.addComment(otherComment);
      expect(thread.equals(otherThread)).toBe(true);
    });
  });
});
