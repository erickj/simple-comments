goog.provide('spec.logos.protocol.messages.Command.AddCommentCommandSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Command.AddCommentCommand');
goog.require('logos.protocol.messages.Comment');


/** Tests for {@code logos.protocol.messages.Command.AddCommentCommand}. */
describe('logos.protocol.messages.Command.AddCommentCommand', function() {
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Command.AddCommentCommand();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Command.AddCommentCommand()).toEqual(
          jasmine.any(logos.protocol.messages.Command.AddCommentCommand));
    });
  });

  describe('fields', function() {
    describe('comment', function() {
      it('#set, #get*, #has*', function() {
        expect(message.hasComment()).toBe(false);
        expect(message.getComment()).toBe(null);
        expect(message.getCommentOrDefault()).toEqual(
            new logos.protocol.messages.Comment());

        var comment = new logos.protocol.messages.Comment();
        comment.setBody('hi there!');
        message.setComment(comment);
        expect(message.hasComment()).toBe(true);
        expect(message.getComment()).toBe(comment);
      });
    });

    describe('conversation_guid', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasConversationGuid()).toBe(false);
        expect(message.getConversationGuid()).toBe(null);
        expect(message.getConversationGuidOrDefault()).toBe('');

        message.setConversationGuid('cguidy');
        expect(message.hasConversationGuid()).toBe(true);
        expect(message.getConversationGuid()).toBe('cguidy');
      });
    });

    describe('thread_guid', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasThreadGuid()).toBe(false);
        expect(message.getThreadGuid()).toBe(null);
        expect(message.getThreadGuidOrDefault()).toBe('');

        message.setThreadGuid('tguidy');
        expect(message.hasThreadGuid()).toBe(true);
        expect(message.getThreadGuid()).toBe('tguidy');
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor =
          logos.protocol.messages.Command.AddCommentCommand.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': {
          '1': 'comment-guid',
          '2': 'body body'
        },
        '2': 'convo-guid',
        '3': 'thread-guid'
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(
          logos.protocol.messages.Command.AddCommentCommand));

      var expectedComment = new logos.protocol.messages.Comment();
      expectedComment.setGuid('comment-guid');
      expectedComment.setBody('body body');
      expect(message.getComment()).toEqual(expectedComment);
      expect(message.getConversationGuid()).toBe('convo-guid');
      expect(message.getThreadGuid()).toBe('thread-guid');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Command.AddCommentCommand();
      message.setConversationGuid('convo-guid');
      message.setThreadGuid('thread-guid');

      var expectedComment = new logos.protocol.messages.Comment();
      expectedComment.setGuid('comment-guid');
      expectedComment.setBody('body body');
      message.setComment(expectedComment);
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
