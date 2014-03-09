goog.provide('logos.command.AddUserCommand');

goog.require('logos.command.AbstractCommand');
goog.require('logos.command.Command');
goog.require('logos.common.preconditions');



/**
 * @param {!logos.model.User} user
 * @constructor
 * @extends {logos.command.AbstractCommand}
 * @struct
 * @final
 */
logos.command.AddUserCommand = function(user) {
  logos.command.AbstractCommand.call(
      this, logos.command.Command.Type.ADD_USER);

  /** @private {!logos.model.User} */
  this.user_ = user;
};
goog.inherits(
    logos.command.AddUserCommand, logos.command.AbstractCommand);


/** @override */
logos.command.AddUserCommand.prototype.canApply = function(context) {
  var checkState = logos.common.preconditions.checkState;
  var model = context.getModel();
  checkState(!model.hasUser(this.user_.getId()),
      'already has user');
  return true;
};


/** @override */
logos.command.AddUserCommand.prototype.applyInternal =
    function(context) {
  context.getModel().addUser(this.user_);
};
