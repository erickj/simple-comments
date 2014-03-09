goog.provide('logos.command.NoopCommand');

goog.require('goog.functions');
goog.require('logos.command.AbstractCommand');



/**
 * @constructor
 * @extends {logos.command.AbstractCommand}
 * @struct
 * @final
 */
logos.command.NoopCommand = function() {
  logos.command.AbstractCommand.apply(this, [logos.command.Command.Type.NOOP]);
};
goog.inherits(logos.command.NoopCommand, logos.command.AbstractCommand);


/** @override */
logos.command.NoopCommand.prototype.canApply = goog.functions.TRUE;


/** @override */
logos.command.NoopCommand.prototype.applyInternal = goog.functions.NULL;
