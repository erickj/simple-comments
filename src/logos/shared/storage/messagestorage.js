goog.provide('logos.storage.MessageStorage');

goog.require('goog.asserts');
goog.require('goog.storage.Storage');
goog.require('goog.storage.mechanism.Mechanism');



/**
 * A storage class for storing a single protocol buffer message type.
 * @param {!goog.storage.mechanism.Mechanism} mechanism The underlying storage
 *     mechanism.
 * @param {!goog.proto2.Descriptor} descriptor
 * @param {!goog.proto2.Serializer} serializer
 * @constructor
 * @extends {goog.storage.Storage}
 * @final
 * @template T
 * NB: This cannot be a struct since {@code goog.storage.Storage} is not a
 * struct.
 */
logos.storage.MessageStorage = function(mechanism, descriptor, serializer) {
  goog.base(this, mechanism);

  /** @private {!goog.proto2.Descriptor} */
  this.descriptor_ = descriptor;

  /** @private {!goog.proto2.Serializer} */
  this.serializer_ = serializer;
};
goog.inherits(logos.storage.MessageStorage, goog.storage.Storage);


/**
 * @return {T}
 * @template T
 * @override
 */
logos.storage.MessageStorage.prototype.get = function(key) {
  var json = goog.base(this, 'get', key);
  if (!goog.isDef(json)) {
    return null;
  }
  return this.serializer_.deserialize(this.descriptor_, json);
};


/**
 * @param {string} key
 * @param {T} message
 * @template T
 * @override
 */
logos.storage.MessageStorage.prototype.set = function(key, message) {
  if (!message) {
    return;
  }
  // Make sure we're storing the correct type
  goog.asserts.assert(message.getDescriptor() == this.descriptor_);
  goog.base(this, 'set', key, this.serializer_.serialize(message));
};
