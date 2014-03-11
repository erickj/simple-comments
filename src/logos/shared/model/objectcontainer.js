goog.provide('logos.model.ObjectContainer');

goog.require('goog.object');
goog.require('logos.common.EqualsComparable');
goog.require('logos.common.equals');
goog.require('logos.common.preconditions');
goog.require('logos.model.Object');



/**
 * A class for storing instances of {@code logos.model.Object}.
 * @param {!Array.<logos.model.Object.Type>} allowedTypes The types of objects
 *     allowed in this container.
 * @constructor
 * @struct
 * @implements {logos.common.EqualsComparable}
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
 * Adds an object to the container using its id as the key.
 * @param {T} object
 * @throws Error if the object is not a model Object, if the object is not of
 *     the allowed type, or if an object already exists with the given id.
 */
logos.model.ObjectContainer.prototype.addObject = function(object) {
  logos.common.preconditions.checkArgument(
      object instanceof logos.model.Object, 'Cannot contain non model object');

  object = /** @type {!logos.model.Object} */ (object);
  logos.common.preconditions.checkArgument(this.allowedTypeSet_[object.getType()],
      'Cannot contain object of type ' + object.getType());

  var id = object.getId();
  logos.common.preconditions.checkState(
      !this.objectContainer_[id], 'Container contains object at key ' + id);
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
  logos.common.preconditions.checkState(
      this.hasObjectWithId(id), 'Missing object with id ' + id);
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


/** @override */
logos.model.ObjectContainer.prototype.equals = function(other) {
  if (this == other) {
    return true;
  } else if (other instanceof logos.model.ObjectContainer) {
    other = /** @type {!logos.model.ObjectContainer} */ (other);
    return logos.common.equals.objectsEqual(
            this.allowedTypeSet_, other.allowedTypeSet_) &&
        logos.common.equals.arraysEqual(
            this.idOrder_, other.idOrder_) &&
        logos.common.equals.objectsEqual(
            this.objectContainer_, other.objectContainer_,
            this.compareObjectContainerKey_, this /** opt_scope */);
  }
  return false;
};


/**
 * Compares the value stored in the given containers at the key.
 * @param {!Object.<T>} container1
 * @param {!Object.<T>} container2
 * @param {string} key
 * @return {boolean}
 */
logos.model.ObjectContainer.prototype.compareObjectContainerKey_ =
    function(container1, container2, key) {
  return /** @type {!logos.model.Object } */ (container1[key]).
      equals(container2[key]);
};
