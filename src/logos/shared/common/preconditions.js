/**
 * @fileoverview Preconditions are a subset of the Guava Preconditions.
 * @see https://code.google.com/p/guava-libraries/wiki/PreconditionsExplained
 */
goog.provide('logos.common.preconditions');
goog.provide('logos.common.preconditions.IllegalArgumentException');
goog.provide('logos.common.preconditions.IllegalStateException');
goog.provide('logos.common.preconditions.NullPointerException');


/**
 * @param {string=} opt_message
 * @constructor
 * @extends {Error}
 * @final
 */
logos.common.preconditions.IllegalArgumentException = function(opt_message) {
  Error.apply(this, arguments);
};
goog.inherits(logos.common.preconditions.IllegalArgumentException, Error);


/**
 * @param {string=} opt_message
 * @constructor
 * @extends {Error}
 * @final
 */
logos.common.preconditions.IllegalStateException = function(opt_message) {
  Error.apply(this, arguments);
};
goog.inherits(logos.common.preconditions.IllegalStateException, Error);


/**
 * @param {string=} opt_message
 * @constructor
 * @extends {Error}
 * @final
 */
logos.common.preconditions.NullPointerException = function(opt_message) {
  Error.apply(this, arguments);
};
goog.inherits(logos.common.preconditions.NullPointerException, Error);


/**
 * Checks the given expression evaluates to true or throws an IllegalArgument
 * error.
 * @param {boolean} expression
 * @param {string=} opt_message
 * @throws {logos.common.preconditions.IllegalArgumentException}
 */
logos.common.preconditions.checkArgument = function(expression, opt_message) {
  if (!expression) {
    throw new logos.common.preconditions.IllegalArgumentException(
        opt_message || 'Illegal argument exception');
  }
};


/**
 * Checks the given expression evaluates to true or throws an IllegalState
 * error.
 * @param {boolean} expression
 * @param {string=} opt_message
 * @throws {logos.common.preconditions.IllegalStateException}
 */
logos.common.preconditions.checkState = function(expression, opt_message) {
  if (!expression) {
    throw new logos.common.preconditions.IllegalStateException(
        opt_message || 'Illegal state exception');
  }
};


// TODO(erick): The "@return {!T}" doesn't actually cast the template type to a
// non-null type, :( It would be really nice if this worked so the precondition
// could just be used as an implicit cast.
/**
 * Checks the given value is not null, or throws a NullPointer error.
 * @param {T} given
 * @param {string=} opt_message
 * @return {!T} Whatever was given, guaranteed not to be null.
 * @throws {logos.common.preconditions.IllegalArgumentException}
 * @template T
 */
logos.common.preconditions.checkNotNull = function(given, opt_message) {
  if (goog.isNull(given)) {
    throw new logos.common.preconditions.NullPointerException(
        opt_message || 'Null pointer exception');
  }
  return given;
};
