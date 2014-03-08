goog.provide('spec.logos.protocol.MessagesDeserializerSpec');

goog.require('logos.protocol.MessagesDeserializer');
goog.require('logos.protocol.messages.Command');
goog.require('logos.protocol.messages.CommandSet');
goog.require('logos.protocol.messages.Command.NoopCommand');
goog.require('logos.protocol.messages.Command.Type');

describe('logos.protocol.MessagesDeserializer', function() {
  var deserializer;

  beforeEach(function() {
    deserializer = new logos.protocol.MessagesDeserializer();
  });

  describe('#deserializeCommandSet', function() {
    var commandSet;

    beforeEach(function() {
      commandSet = new logos.protocol.messages.CommandSet();
    });

    it('deserializes an empty command set into an empty array', function() {
      expect(deserializer.deserializeCommandSet(commandSet)).toEqual([]);
    });
  });
});
