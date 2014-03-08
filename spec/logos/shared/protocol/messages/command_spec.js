goog.provide('spec.logos.protocol.messages.Command');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Command');
goog.require('logos.protocol.messages.Command.NoopCommand');
goog.require('logos.protocol.messages.Command.Type');


/** Tests for {@code logos.protocol.messages.Command}. */
describe('logos.protocol.messages.Command', function() {
  var Type = logos.protocol.messages.Command.Type;
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.Command();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.Command()).toEqual(
          jasmine.any(logos.protocol.messages.Command));
    });
  });

  describe('fields', function() {
    describe('type', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasType()).toBe(false);
        expect(message.getType()).toBe(null);
        expect(message.getTypeOrDefault()).toEqual(Type.NOOP);

        message.setType(Type.NOOP);
        expect(message.hasType()).toBe(true);
        expect(message.getType()).toBe(Type.NOOP);
      });
    });

    describe('noop_command', function() {
      it('#set*, #get*, #has*', function() {
        expect(message.hasNoopCommand()).toBe(false);
        expect(message.getNoopCommand()).toBe(null);
        expect(message.getNoopCommandOrDefault()).toEqual(jasmine.any(
            logos.protocol.messages.Command.NoopCommand));

        var noopCommand = new logos.protocol.messages.Command.NoopCommand();
        message.setNoopCommand(noopCommand);
        expect(message.hasNoopCommand()).toBe(true);
        expect(message.getNoopCommand()).toBe(noopCommand);
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor = logos.protocol.messages.Command.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': 2,
        '2': {}
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(logos.protocol.messages.Command));

      expect(message.getType()).toEqual(Type.NOOP);
      expect(message.getNoopCommand()).toEqual(
          jasmine.any(logos.protocol.messages.Command.NoopCommand));
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.Command();
      message.setType(logos.protocol.messages.Command.Type.NOOP);
      message.setNoopCommand(new logos.protocol.messages.Command.NoopCommand());
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});
