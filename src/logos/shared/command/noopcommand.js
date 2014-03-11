goog.provide('logos.command.NoopCommand');

goog.require('goog.functions');
goog.require('logos.command.Command');



/**
 * @constructor
 * @implements {logos.command.Command}
 * @struct
 * @final
 */
logos.command.NoopCommand = function() {};


/** @const {!logos.command.NoopCommand} */
logos.command.NoopCommand.INSTANCE = new logos.command.NoopCommand();


/** @override */
logos.command.NoopCommand.prototype.getType =
    goog.functions.constant(logos.command.Command.Type.NOOP);


/** @override */
logos.command.NoopCommand.prototype.canApply = goog.functions.TRUE;


/** @override */
logos.command.NoopCommand.prototype.apply = goog.functions.NULL;


/** @override */
logos.command.NoopCommand.prototype.transform = function() {
  return this;
};


/** @override */
logos.command.NoopCommand.prototype.equals = function(other) {
  return other instanceof logos.command.NoopCommand;
};
