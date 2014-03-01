goog.provide('logos.storage.mechanism.InMemoryMechanism');

goog.require('goog.storage.mechanism.Mechanism');



/**
 * A simple in memory storage mechanism.
 *
 * NB: This doesn't actually extend {@code goog.storage.mechanism.Mechanism}, it
 * is actually just implementing an ill-conceived interface.
 * @constructor
 * @extends {goog.storage.mechanism.Mechanism}
 * @final
 */
logos.storage.mechanism.InMemoryMechanism = function() {
  /** @private {!Object.<string>} */
  this.store_ = {};
};


/** @override */
logos.storage.mechanism.InMemoryMechanism.prototype.set = function(key, value) {
  this.store_[key] = value;
};


/** @override */
logos.storage.mechanism.InMemoryMechanism.prototype.get = function(key) {
  return this.store_[key] || null;
};


/** @override */
logos.storage.mechanism.InMemoryMechanism.prototype.remove = function(key) {
  delete this.store_[key];
};
