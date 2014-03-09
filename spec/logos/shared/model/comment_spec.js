goog.provide('spec.logos.model.CommentSpec');

goog.require('logos.model.Comment');
goog.require('logos.model.Object');
goog.require('logos.model.Comment');

describe('logos.model.Comment', function() {
  describe('#getId', function() {
    it('gets the comment id', function() {
      var comment = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      expect(comment.getId()).toBe('comment-id');
    });
  });

  describe('#getType', function() {
    it('gets the comment object type', function() {
      var comment = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      expect(comment.getType()).toBe('comment');
    });
  });

  describe('#getBody', function() {
    it('gets the comment object body', function() {
      var comment = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      expect(comment.getBody()).toBe('text text text');
    });
  });

  describe('#getModifiedTimestamp', function() {
    it('gets the comment object modifiedTimestamp', function() {
      var comment = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      expect(comment.getModifiedTimestamp()).toBe(123456);
    });
  });

  describe('#getUserId', function() {
    it('gets the comment object user id', function() {
      var comment = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      expect(comment.getUserId()).toBe('a-user');
    });
  });
});
