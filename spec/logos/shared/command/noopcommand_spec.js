goog.provide('spec.logos.command.NoopCommandSpec');

goog.require('logos.command.Command');
goog.require('logos.command.NoopCommand');

describe('logos.command.NoopCommand', function() {
  var commandContext = /** @type {!logos.command.CommandContext} */ ({});
  var noopCommand = logos.command.NoopCommand.INSTANCE;

  describe('#getType', function() {
    it('gets the NOOP type', function() {
      expect(noopCommand.getType()).toBe(logos.command.Command.Type.NOOP);
    });
  });

  describe('#canApply', function() {
    it('can be applied', function() {
      expect(noopCommand.canApply(commandContext)).toBe(true);
    });
  });

  describe('#apply', function() {
    it('apples without error', function() {
      noopCommand.apply(commandContext);
    });
  });

  describe('#transform', function() {
    it('returns itself', function() {
      expect(noopCommand.transform(/** @type {!logos.command.Command} */ ({}))).
          toBe(noopCommand);
    });
  });

  describe('#equals', function() {
    it('is true for any NoopCommand', function() {
      expect(noopCommand.equals(noopCommand)).toBe(true);
      expect(noopCommand.equals(new logos.command.NoopCommand())).toBe(true);
    });

    it('is false for non-noops', function() {
      expect(noopCommand.equals(/** @type {!logos.command.Command} */ ({}))).
          toBe(false);
    });
  });
});
