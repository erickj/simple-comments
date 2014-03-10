goog.provide('logos.common.EqualsComparable');



/**
 * An interface for providing an {@code #equals} method.
 * @interface
 */
logos.common.EqualsComparable = function() {};


/**
 * Returns true when the given object is semantically equivalent to this
 * object. This doesn't necessarily mean the same instance.
 * @param {*} other
 */
logos.common.EqualsComparable.prototype.equals = goog.abstractMethod;
