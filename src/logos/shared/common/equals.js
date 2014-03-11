/**
 * @fileoverview Static utilities for performing equality checks.
 */
goog.provide('logos.common.equals');

goog.require('goog.array');
goog.require('goog.object');


/**
 * Compares two objects for equality using the given comparator function.
 * @param {!Object.<K,V1>} map1
 * @param {!Object.<K,V2>} map2
 * @param {function(this:T, !Object.<K,V1>, !Object.<K,V2>, K):boolean=} opt_f
 *     The function used to compare map1 and map2. This function must return
 *     true for every key/value pair for the objects to be equal. If not
 *     provided, ==, will be used to compare.
 * @param {T=} opt_scope The "this" context for {@code f}.
 * @return {boolean} Whether the maps are the same.
 * @template T,K,V1,V2
 */
logos.common.equals.objectsEqual =
    function(map1, map2, opt_f, opt_scope) {
  if (map1 == map2) {
    return true;
  }
  var map1Keys = Object.getOwnPropertyNames(map1);
  var map2Keys = Object.getOwnPropertyNames(map2);
  if (!logos.common.equals.arraysEqual(map1Keys, map2Keys,
      undefined /* opt_f */, undefined /* opt_scope */,
      true /* opt_orderIndependent */)) {
    return false;
  }
  for (var i = 0; i < map1Keys.length; i++) {
    var key = map1Keys[i];
    if ((opt_f && !opt_f.call(opt_scope, map1, map2, key)) ||
        // TODO(erick): It would be good to add a static equals method that
        // checks for EqualsComparable implementation and calls the #equals
        // methods or compares using ==.
        (!opt_f && map1[key] != map2[key])) {
      return false;
    }
  }
  return true;
};


/**
 * Compares to arrays for equality using the given comparator function.
 * @param {!Array.<V1>} array1
 * @param {!Array.<V2>} array2
 * @param {function(this:T, V1, V2):boolean=} opt_f The function used to compare
 *     array1 and array2. This function must return true for every value for the
 *     arrays to be equal. If not provided, ==, will be used to compare.
 * @param {T=} opt_scope The "this" context for {@code f}.
 * @param {boolean=} opt_orderIndependent Whether the arrays should be compared
 *     in sorted order, default is false. If true the input arrays will be
 *     cloned and sorted.
 * @return {boolean}
 * @template T,V1,V2
 */
logos.common.equals.arraysEqual =
    function(array1, array2, opt_f, opt_scope, opt_orderIndependent) {
  if (array1 == array2) {
    return true;
  } else if (array1.length != array2.length) {
    return false;
  }

  if (opt_orderIndependent) {
    array1 = array1.concat();
    goog.array.sort(array1);
    array2 = array2.concat();
    goog.array.sort(array2);
  }
  for (var i = 0; i < array1.length; i++) {
    if ((opt_f && !opt_f.call(opt_scope, array1[i], array2[i])) ||
        (!opt_f && array1[i] != array2[i])) {
      return false;
    }
  }
  return true;
};
