goog.provide('logos.command.NoopCommand');

goog.require('logos.command.Command');



/**
 * @constructor
 * @extends {logos.command.Command}
 * @struct
 * @final
 */
logos.command.NoopCommand = function() {
  logos.command.Command.apply(this, [logos.command.Command.Type.NOOP]);
};
goog.inherits(logos.command.NoopCommand, logos.command.Command);
