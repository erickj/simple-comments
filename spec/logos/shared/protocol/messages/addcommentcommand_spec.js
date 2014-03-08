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

    describe('conversation_id', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasConversationId()).toBe(false);
        expect(message.getConversationId()).toBe(null);
        expect(message.getConversationIdOrDefault()).toBe('');

        message.setConversationId('cidy');
        expect(message.hasConversationId()).toBe(true);
        expect(message.getConversationId()).toBe('cidy');
      });
    });

    describe('thread_id', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasThreadId()).toBe(false);
        expect(message.getThreadId()).toBe(null);
        expect(message.getThreadIdOrDefault()).toBe('');

        message.setThreadId('tidy');
        expect(message.hasThreadId()).toBe(true);
        expect(message.getThreadId()).toBe('tidy');
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
          '1': 'comment-id',
          '2': 'body body'
        },
        '2': 'convo-id',
        '3': 'thread-id'
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(
          logos.protocol.messages.Command.AddCommentCommand));

      var expectedComment = new logos.protocol.messages.Comment();
      expectedComment.setId('comment-id');
      expectedComment.setBody('body body');
      expect(message.getComment()).toEqual(expectedComment);
      expect(message.getConversationId()).toBe('convo-id');
      expect(message.getThreadId()).toBe('thread-id');
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Command.AddCommentCommand();
      message.setConversationId('convo-id');
      message.setThreadId('thread-id');

      var expectedComment = new logos.protocol.messages.Comment();
      expectedComment.setId('comment-id');
      expectedComment.setBody('body body');
      message.setComment(expectedComment);
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
