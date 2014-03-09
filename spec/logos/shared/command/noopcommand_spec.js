goog.provide('spec.logos.command.NoopCommandSpec');

goog.require('logos.command.NoopCommand');

describe('logos.command.NoopCommand', function() {
  var commandContext = /** @type {!logos.command.CommandContext} */ ({});

  it('can be applied', function() {
    var noopCommand = new logos.command.NoopCommand();
    expect(noopCommand.canApply(commandContext)).toBe(true);
  });

  it('apples without error', function() {
    var noopCommand = new logos.command.NoopCommand();
    noopCommand.apply(commandContext);
  });
});
