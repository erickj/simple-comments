goog.provide('spec.helpers.fake.FakeCommand');

goog.require('logos.command.Command');



/**
 * A fake Command implementation.
 * @constructor
 * @implements {logos.command.Command}
 */
spec.helpers.fake.FakeCommand = function() {
  /** @type {!Array.<!logos.command.Command>} */
  this.transformedAgainst = [];
};


/** @override */
spec.helpers.fake.FakeCommand.prototype.apply = function() {};


/** @override */
spec.helpers.fake.FakeCommand.prototype.canApply = function() {
  return true;
};


/** @override */
spec.helpers.fake.FakeCommand.prototype.getType = function() {
  return logos.command.Command.Type.NOOP;
};


/** @override */
spec.helpers.fake.FakeCommand.prototype.equals = function(other) {
  return this == other;
};


/** @override */
spec.helpers.fake.FakeCommand.prototype.transform = function(other) {
  this.transformedAgainst.push(other);
  return this;
};
