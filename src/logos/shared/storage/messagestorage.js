goog.provide('logos.storage.MessageStorage');

goog.require('goog.asserts');
goog.require('goog.json');
goog.require('logos.storage.mechanism.Mechanism');



/**
 * A storage class for storing a single protocol buffer message type.
 * @param {!logos.storage.mechanism.Mechanism.<string>} mechanism The underlying
 *     storage mechanism.
 * @param {!goog.proto2.Descriptor} descriptor
 * @param {!goog.proto2.Serializer} serializer
 * @constructor
 * @struct
 * @final
 * @template T
 */
logos.storage.MessageStorage = function(mechanism, descriptor, serializer) {
  /** @private {!logos.storage.mechanism.Mechanism.<string>} */
  this.mechanism_ = mechanism;

  /** @private {!goog.proto2.Descriptor} */
  this.descriptor_ = descriptor;

  /** @private {!goog.proto2.Serializer} */
  this.serializer_ = serializer;
};


/**
 * @param {string} key
 * @return {!goog.Promise.<T>}
 */
logos.storage.MessageStorage.prototype.get = function(key) {
  var jsonPromise = this.mechanism_.get(key);
  return jsonPromise.then(this.deserializePbJson_, undefined, this);
};


/**
 * @param {string}
 * @return {T}
 * @private
 */
logos.storage.MessageStorage.prototype.deserializePbJson_ = function(value) {
  return this.serializer_.deserialize(
      this.descriptor_, goog.json.parse(value));
};


/**
 * @param {string} key
 * @param {T} message
 * @return {!goog.Promise.<boolean>}
 */
logos.storage.MessageStorage.prototype.set = function(key, message) {
  if (!message) {
    return goog.Promise.reject('Invalid value for set');
  }
  // Make sure we're storing the correct type
  goog.asserts.assert(message.getDescriptor() == this.descriptor_);
  return this.mechanism_.set(
      key, goog.json.serialize(this.serializer_.serialize(message)));
};


/**
 * @param {string} key
 * @return {!goog.Promise.<boolean>}
 */
logos.storage.MessageStorage.prototype.remove = function(key) {
  return this.mechanism_.remove(key);
};
