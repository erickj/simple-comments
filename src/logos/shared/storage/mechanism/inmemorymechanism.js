goog.provide('logos.storage.mechanism.InMemoryMechanism');

goog.require('goog.Promise');
goog.require('logos.storage.mechanism.Mechanism');



/**
 * A simple in memory storage mechanism.
 * @constructor
 * @implements {logos.storage.mechanism.Mechanism.<T>}
 * @struct
 * @final
 * @template T
 */
logos.storage.mechanism.InMemoryMechanism = function() {
  /** @private {!Object.<T>} */
  this.store_ = {};
};


/** @override */
logos.storage.mechanism.InMemoryMechanism.prototype.get = function(key) {
  return goog.isDef(this.store_[key]) ?
      goog.Promise.resolve(this.store_[key]) :
      goog.Promise.reject(
          logos.storage.mechanism.Mechanism.Failure.NOT_FOUND);
};


/** @override */
logos.storage.mechanism.InMemoryMechanism.prototype.set = function(key, value) {
  this.store_[key] = value;
  return goog.Promise.resolve(true);
};


/** @override */
logos.storage.mechanism.InMemoryMechanism.prototype.remove = function(key) {
  var willDelete = goog.isDef(this.store_[key]);
  delete this.store_[key];
  return goog.Promise.resolve(willDelete);
};
