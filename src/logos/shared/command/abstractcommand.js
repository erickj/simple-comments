goog.provide('logos.command.AbstractCommand');

goog.require('logos.command.Command');



/**
 * @param {logos.command.Command.Type} type
 * @constructor
 * @implements {logos.command.Command}
 * @struct
 */
logos.command.AbstractCommand = function(type) {
  /** @private {logos.command.Command.Type} */
  this.type_ = type;
};


/** @override */
logos.command.AbstractCommand.prototype.getType = function() {
  return this.type_;
};


/** @override */
logos.command.AbstractCommand.prototype.canApply = goog.abstractMethod;


/** @override */
logos.command.AbstractCommand.prototype.apply = function(commandContext) {
  this.applyInternal(commandContext);
};


/**
 * To be overriden by subclasses.
 * @param {!logos.command.CommandContext} commandContext
 * @protected
 */
logos.command.AbstractCommand.prototype.applyInternal = goog.abstractMethod;


/** @override */
logos.command.AbstractCommand.prototype.transform = function(againstCommand) {
  return this;
};


/** @override */
logos.command.AbstractCommand.prototype.equals = function(other) {
  return (other instanceof logos.command.AbstractCommand) &&
      other.getType() == this.type_;
};
