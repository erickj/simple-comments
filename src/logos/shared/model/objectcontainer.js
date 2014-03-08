goog.provide('logos.model.ObjectContainer');

goog.require('logos.model.Object');


/**
 * @param {!Array.<logos.model.Object.Type>} allowedTypes
 * @constructor
 * @struct
 * @template T
 */
logos.model.ObjectContainer = function(allowedTypes) {
  /** @private {!Object.<logos.model.Object.Type, boolean>} */
  this.allowedTypeSet_ = {};
  for (var i = 0; i < allowedTypes.length; i++) {
    this.allowedTypeSet_[allowedTypes[i]] = true;
  }

  /** @private {!Object.<T>} */
  this.objectContainer_ = {};

  /** @private {!Array.<string>} */
  this.idOrder_ = [];
};


/**
 * Adds an object to the container using its id as the key, throws an error if
 * an object already exists with the given id.
 * @param {T} object
 * @throws Error
 */
logos.model.ObjectContainer.prototype.addObject = function(object) {
  if (!(object instanceof logos.model.Object)) {
    throw Error('Cannot contain non model object');
  }
  object = /** @type {!logos.model.Object} */ (object);
  if (!this.allowedTypeSet_[object.getType()]) {
    throw Error('Cannot contain object of type ' + object.getType());
  }

  var id = object.getId();
  if (this.objectContainer_[id]) {
    throw Error('Container contains object at key ' + id);
  }
  this.idOrder_.push(id);
  this.objectContainer_[id] = object;
};


/**
 * @param {string} id
 * @return {boolean} True indicates an object with the id is in the container.
 */
logos.model.ObjectContainer.prototype.hasObjectWithId = function(id) {
  return !!this.objectContainer_[id];
};


/**
 * @param {string} id
 * @return {T} The object with the id
 * @throws Error if there is no object at the given id.
 */
logos.model.ObjectContainer.prototype.getObjectWithId = function(id) {
  if (!this.hasObjectWithId(id)) {
    throw Error('Missing object with id ' + id);
  }
  return this.objectContainer_[id];
};


/**
 * @return {!Array.<T>} All T in the order added.
 */
logos.model.ObjectContainer.prototype.getObjectsInOrder = function() {
  var orderedObjects = [];
  for (var i = 0; i < this.idOrder_.length; i++) {
    var id = this.idOrder_[i];
    orderedObjects.push(this.objectContainer_[id]);
  }
  return orderedObjects;
};
