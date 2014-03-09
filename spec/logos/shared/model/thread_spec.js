goog.provide('spec.logos.model.ThreadSpec');

goog.require('logos.model.Comment');
goog.require('logos.model.Object');
goog.require('logos.model.Thread');

describe('logos.model.Thread', function() {
  var comment;
  var Topic = logos.model.Thread.Topic;

  beforeEach(function() {
    comment = new logos.model.Comment(
        'comment-id', 'text text text', 123456, 'a-user');
  });

  describe('#getId', function() {
    it('gets the thread id', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      expect(thread.getId()).toBe('thread-id');
    });
  });

  describe('#getType', function() {
    it('gets the thread object type', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      expect(thread.getType()).toBe('thread');
    });
  });

  describe('#getTopic', function() {
    it('gets the thread topic', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      expect(thread.getTopic()).toBe('main');
    });
  });

  describe('#addComment', function() {
    it('adds comments to the thread', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      thread.addComment(comment);
      expect(thread.getComment('comment-id')).toBe(comment);
    });
  });

  describe('#hasComment', function() {
    it('returns false if there is no comment', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      expect(thread.hasComment('comment-id')).toBe(false);
    });

    it('returns true if there is a comment', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      thread.addComment(comment);
      expect(thread.hasComment('comment-id')).toBe(true);
    });
  });

  describe('#getComment', function() {
    it('errors if the there is no comment', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      expect(function() {
        thread.getComment('none');
      }).toThrow();
    });

    it('gets the comment if it exists', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      thread.addComment(comment);
      expect(thread.getComment('comment-id')).toBe(comment);
    });
  });

  describe('#getComments', function() {
    it('returns an empty array if there are no comments', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      expect(thread.getComments()).toEqual([]);
    });

    it('returns an array of all added comments', function() {
      var thread = new logos.model.Thread('thread-id', Topic.MAIN);
      thread.addComment(comment);
      expect(thread.getComments()).toEqual([comment]);
    });
  });
});
