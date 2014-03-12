goog.provide('spec.logos.common.equalsSpec');

goog.require('logos.common.equals');

describe('logos.common.equals', function() {
  var objectsEqual = logos.common.equals.objectsEqual;
  var arraysEqual = logos.common.equals.arraysEqual;

  describe('objectsEqual', function() {
    var obj = {
      'a': 'the',
      'b': 'cat',
      'c': 'jumps'
    };

    it('returns true for the same object', function() {
      expect(objectsEqual(obj, obj)).toBe(true);
    });

    it('returns true for similar objects', function() {
      var similar = {
        'a': 'the',
        'b': 'cat',
        'c': 'jumps'
      };
      expect(objectsEqual(obj, similar)).toBe(true);
      expect(objectsEqual(similar, obj)).toBe(true);
    });

    it('returns false for dissimilar objects', function() {
      var dissimilar = {};
      expect(objectsEqual(obj, dissimilar)).toBe(false);
      expect(objectsEqual(dissimilar, obj)).toBe(false);
    });

    it('returns false for comparing subsets', function() {
      var subset = {'a': 'the'};
      expect(objectsEqual(obj, subset)).toBe(false);
      expect(objectsEqual(subset, obj)).toBe(false);
    });

    it('delegates comparisons to the comparator function', function() {
      var obj1 = {'a': 1, 'b': 2};
      var obj2 = {'a': '1.1', 'b': '2.2'};
      expect(objectsEqual(obj1, obj2)).toBe(false);

      /**
       * @param {!Object.<number>} map1
       * @param {!Object.<string>} map2
       * @param {string} key
       * @return {boolean}
       */
      var intParserComparatorFn = function(map1, map2, key) {
        var base = 10;
        return parseInt(map1[key], base) == parseInt(map2[key], base);
      };
      expect(objectsEqual(obj1, obj2, intParserComparatorFn)).toBe(true);
      expect(objectsEqual(obj2, obj1, intParserComparatorFn)).toBe(true);
    });
  });

  describe('arraysEqual', function() {
    var arr = [1, 2, 3];

    it('returns true for the same array', function() {
      expect(arraysEqual(arr, arr)).toBe(true);
    });

    it('returns true for similar arrays', function() {
      var similar = [1, 2, 3];
      expect(arraysEqual(arr, similar)).toBe(true);
      expect(arraysEqual(similar, arr)).toBe(true);
    });

    it('returns false for dissimilar arrays', function() {
      expect(arraysEqual(arr, [])).toBe(false);
      expect(arraysEqual([], arr)).toBe(false);
    });

    it('delegates to a comparator function', function() {
      var delegateArr = ['1.1', '2.2', '3.3'];
      expect(arraysEqual(arr, delegateArr)).toBe(false);

      /**
       * @param {*} val1
       * @param {*} val2
       * @return {boolean}
       */
      var intParserComparatorFn = function(val1, val2) {
        var base = 10;
        return parseInt(val1, base) == parseInt(val2, base);
      };
      expect(arraysEqual(arr, delegateArr, intParserComparatorFn)).toBe(true);
      expect(arraysEqual(delegateArr, arr, intParserComparatorFn)).toBe(true);
    });

    describe('order independence', function() {
      var arr1;
      var arr2;

      beforeEach(function() {
        arr1 = [1, 2, 3];
        arr2 = [3, 2, 1];
      });

      it('compares with strict ordering by default', function() {
        expect(arraysEqual(arr1, arr2)).toBe(false);
      });

      it('compares independent of ordering with a parameter', function() {
        var orderIndependent = true;
        expect(arraysEqual(arr1, arr2, undefined /* opt_f */,
            undefined /* opt_scope */, orderIndependent)).toBe(true);
      });
    });
  });
});
