goog.provide('spec.logos.protocol.messages.CommandSetSpec');

goog.require('goog.proto2.ObjectSerializer');
goog.require('logos.protocol.messages.Command');
goog.require('logos.protocol.messages.CommandSet');
goog.require('logos.protocol.messages.Command.NoopCommand');
goog.require('logos.protocol.messages.Command.Type');


/** Tests for {@code logos.protocol.messages.CommandSet}. */
describe('logos.protocol.messages.CommandSet', function() {
  var message;

  beforeEach(function() {
    message = new logos.protocol.messages.CommandSet();
  });

  describe('constructor', function() {
    it('can be constructed', function() {
      expect(new logos.protocol.messages.CommandSet()).toEqual(
          jasmine.any(logos.protocol.messages.CommandSet));
    });
  });

  describe('fields', function() {
    describe('command', function() {
      it('#add*, #get*, #has*', function() {
        expect(message.hasCommand()).toBe(false);
        expect(message.commandCount()).toBe(0);
        expect(message.getCommandOrDefault()).toEqual(
            new logos.protocol.messages.Command());
        expect(message.commandArray()).toEqual([]);

        var command = new logos.protocol.messages.Command();
        message.addCommand(command);
        expect(message.hasCommand()).toBe(true);
        expect(message.commandCount()).toBe(1);
        expect(message.getCommand(0)).toBe(command);
        expect(message.commandArray()).toEqual([command]);

        message.clearCommand();
        expect(message.hasCommand()).toBe(false);
      });
    });
  });

  describe('serialization', function() {
    var descriptor;
    var serializer;
    var serializedMessage;

    beforeEach(function() {
      descriptor =
          logos.protocol.messages.CommandSet.getDescriptor();
      serializer = new goog.proto2.ObjectSerializer();
      serializedMessage = {
        '1': [
          { '1': 2, '2': {}}
        ]
      };
    });

    it('deserializes from JSON', function() {
      var message = serializer.deserialize(descriptor, serializedMessage);
      expect(message).toEqual(jasmine.any(
          logos.protocol.messages.CommandSet));

      var command = message.getCommand(0);
      expect(command).toEqual(
          jasmine.any(logos.protocol.messages.Command));
      expect(command.getNoopCommand()).toEqual(
          jasmine.any(logos.protocol.messages.Command.NoopCommand));
    });

    it('serializes to JSON', function() {
      var message = new logos.protocol.messages.CommandSet();
      var command = new logos.protocol.messages.Command();
      command.setType(logos.protocol.messages.Command.Type.NOOP);
      command.setNoopCommand(new logos.protocol.messages.Command.NoopCommand());
      message.addCommand(command)
      expect(serializer.serialize(message)).toEqual(serializedMessage);
    });
  });
});