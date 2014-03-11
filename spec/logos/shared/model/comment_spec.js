goog.provide('spec.logos.model.CommentSpec');

goog.require('logos.model.Comment');
goog.require('logos.model.Object');

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

  describe('#equals', function() {
    it('is true for the same object', function() {
      var comment = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      expect(comment.equals(comment)).toBe(true);
    });

    it('is true for similar objects', function() {
      var comment1 = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      var comment2 = new logos.model.Comment(
          'comment-id', 'text text text', 123456, 'a-user');
      expect(comment1.equals(comment2)).toBe(true);
    });

    it('is false for dissimilar objects', function() {
      var comment1 = new logos.model.Comment('x', 'y', 123456, 'z');
      var comment2 = new logos.model.Comment('a', 'b', 123456, 'c');
      expect(comment1.equals(comment2)).toBe(false);
    });
  });
});
