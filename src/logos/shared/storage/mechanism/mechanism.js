goog.provide('logos.storage.mechanism.Mechanism');



/**
 * An interface for a {@code goog.Promise} based storage system.
 * @interface
 * @template T
 */
logos.storage.mechanism.Mechanism = function() {};


/**
 * A list of failure reasons
 * @enum {string}
 */
logos.storage.mechanism.Mechanism.Failure = {
  NOT_FOUND: 'value-not-found',
  UNKNOWN_SET_FAILURE: 'unknown-set-failure',
  UNKNOWN_REMOVE_FAILURE: 'unknown-remove-failure'
};


/**
 * Gets the value stored a key {@code key} via a promise.
 * @param {string} key
 * @return {!goog.Promise.<T>} The promise is either fulfilled with a successful
 *     result or rejected if no value is found at {@code key}.
 */
logos.storage.mechanism.Mechanism.prototype.get = goog.abstractMethod;


/**
 * Sets the value at the key.
 * @param {string} key
 * @param {T} value
 * @return {!goog.Promise.<boolean>} Whether the set was successful. This will
 *     TRUE indicates the set was successful, false indicates the set was not
 *     done, but not an error.
 */
logos.storage.mechanism.Mechanism.prototype.set = goog.abstractMethod;


/**
 * Removes the value at the key
 * @param {string} key
 * @return {!goog.Promise.<boolean>} Whether the remove was eventually
 *     successful. True indicates a remove occurred, false indicates there was
 *     no object at the key to remove.
 */
logos.storage.mechanism.Mechanism.prototype.remove = goog.abstractMethod;
