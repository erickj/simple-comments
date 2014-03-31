goog.provide('spec.helpers.matchers.Promises');

goog.require('goog.Promise');


/**
 * Additional matchers {@code #toResolvePromise} and
 * {@code #toRejectPromise} for testing with promises.
 */
beforeEach(function() {
  /**
   * Verifies the {@code promise} is fulfilled or rejected.
   * @param {boolean} expectSuccess Whether to expect fulfillment or
   *     rejection. True indicates fulfillment, false indicates
   *     rejection.
   * @param {!goog.Promise.<T>} promise
   * @param {T=} opt_expected If given the result of the
   *    {@code onFulfilled} will be checked against it
   * @param {!goog.testing.MockClock=} opt_mockClock The mock clock to
   *     tick, if given {@code mockClock.tick()} will be called to try to
   *     execute any queued callbacks from the promise.
   * @template T
   */
  var toFulfillOrRejectPromise =
      function(expectSuccess, promise, opt_expected, opt_mockClock) {
    var wasCallbackCalled = false;
    var callback = function(value) {
      wasCallbackCalled = true;
      if (goog.isDef(opt_expected)) {
        expect(value).toEqual(opt_expected);
      }
    };

    if (expectSuccess) {
      promise.then(callback);
    } else {
      promise.thenCatch(callback);
    }

    if (opt_mockClock) {
      opt_mockClock.tick();
    }
    return wasCallbackCalled;
  };

  var isJasmine2 = goog.isFunction(jasmine.addMatchers);
  if (!isJasmine2) {
    this.addMatchers(/** @lends {jasmine.Matcher.prototype} */ ({
      toFulfillPromise: function(opt_fulfillment, opt_mockClock) {
        return toFulfillOrRejectPromise(true /* expectSuccess */,
            this.actual, opt_fulfillment, opt_mockClock);
      },
      toRejectPromise: function(opt_rejection, opt_mockClock) {
        return toFulfillOrRejectPromise(false /* expectSuccess */,
            this.actual, opt_rejection, opt_mockClock);
      }
    }));
  } else {
    jasmine.addMatchers(/** @lends {jasmine.Matcher.prototype} */ ({
      toFulfillPromise: function() {
        return {
          compare: function(promise, opt_fulfillment, opt_mockClock) {
            return {
              pass: (function() {
                return toFulfillOrRejectPromise(true /* expectSuccess */,
                    promise, opt_fulfillment, opt_mockClock);
              })()
            };
          }
        };
      },

      toRejectPromise: function() {
        return {
          compare: function(promise, opt_rejection, opt_mockClock) {
            return {
              pass: (function() {
                return toFulfillOrRejectPromise(false /* expectSuccess */,
                    promise, opt_rejection, opt_mockClock);
              })()
            };
          }
        };
      }
    }));
  }
});
