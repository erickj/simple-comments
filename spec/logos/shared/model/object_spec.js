goog.provide('spec.logos.model.ObjectSpec');

goog.require('logos.model.Object');

describe('logos.model.Object', function() {
  var comment;

  beforeEach(function() {
    comment = new logos.model.Object('an-id', logos.model.Object.Type.COMMENT);
  });

  describe('#getType', function() {
    it('returns the type', function() {
      expect(comment.getType()).toBe('comment');
    });
  });

  describe('#getId', function() {
    it('returns the id', function() {
      expect(comment.getId()).toBe('an-id');
    });
  });
});
