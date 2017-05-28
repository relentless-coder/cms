webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Random utility functions used in the UI-Router code
 *
 * These functions are exported, but are subject to change without notice.
 *
 * @preferred
 * @module common
 */
/** for typedoc */
var predicates_1 = __webpack_require__(1);
var hof_1 = __webpack_require__(2);
var coreservices_1 = __webpack_require__(4);
var w = typeof window === 'undefined' ? {} : window;
var angular = w.angular || {};
exports.fromJson = angular.fromJson || JSON.parse.bind(JSON);
exports.toJson = angular.toJson || JSON.stringify.bind(JSON);
exports.copy = angular.copy || _copy;
exports.forEach = angular.forEach || _forEach;
exports.extend = Object.assign || _extend;
exports.equals = angular.equals || _equals;
function identity(x) { return x; }
exports.identity = identity;
function noop() { }
exports.noop = noop;
/**
 * Builds proxy functions on the `to` object which pass through to the `from` object.
 *
 * For each key in `fnNames`, creates a proxy function on the `to` object.
 * The proxy function calls the real function on the `from` object.
 *
 *
 * #### Example:
 * This example creates an new class instance whose functions are prebound to the new'd object.
 * ```js
 * class Foo {
 *   constructor(data) {
 *     // Binds all functions from Foo.prototype to 'this',
 *     // then copies them to 'this'
 *     bindFunctions(Foo.prototype, this, this);
 *     this.data = data;
 *   }
 *
 *   log() {
 *     console.log(this.data);
 *   }
 * }
 *
 * let myFoo = new Foo([1,2,3]);
 * var logit = myFoo.log;
 * logit(); // logs [1, 2, 3] from the myFoo 'this' instance
 * ```
 *
 * #### Example:
 * This example creates a bound version of a service function, and copies it to another object
 * ```
 *
 * var SomeService = {
 *   this.data = [3, 4, 5];
 *   this.log = function() {
 *     console.log(this.data);
 *   }
 * }
 *
 * // Constructor fn
 * function OtherThing() {
 *   // Binds all functions from SomeService to SomeService,
 *   // then copies them to 'this'
 *   bindFunctions(SomeService, this, SomeService);
 * }
 *
 * let myOtherThing = new OtherThing();
 * myOtherThing.log(); // logs [3, 4, 5] from SomeService's 'this'
 * ```
 *
 * @param source A function that returns the source object which contains the original functions to be bound
 * @param target A function that returns the target object which will receive the bound functions
 * @param bind A function that returns the object which the functions will be bound to
 * @param fnNames The function names which will be bound (Defaults to all the functions found on the 'from' object)
 * @param latebind If true, the binding of the function is delayed until the first time it's invoked
 */
function createProxyFunctions(source, target, bind, fnNames, latebind) {
    if (latebind === void 0) { latebind = false; }
    var bindFunction = function (fnName) {
        return source()[fnName].bind(bind());
    };
    var makeLateRebindFn = function (fnName) { return function lateRebindFunction() {
        target[fnName] = bindFunction(fnName);
        return target[fnName].apply(null, arguments);
    }; };
    fnNames = fnNames || Object.keys(source());
    return fnNames.reduce(function (acc, name) {
        acc[name] = latebind ? makeLateRebindFn(name) : bindFunction(name);
        return acc;
    }, target);
}
exports.createProxyFunctions = createProxyFunctions;
/**
 * prototypal inheritance helper.
 * Creates a new object which has `parent` object as its prototype, and then copies the properties from `extra` onto it
 */
exports.inherit = function (parent, extra) {
    return exports.extend(Object.create(parent), extra);
};
/**
 * Given an arguments object, converts the arguments at index idx and above to an array.
 * This is similar to es6 rest parameters.
 *
 * Optionally, the argument at index idx may itself already be an array.
 *
 * For example,
 * given either:
 *        arguments = [ obj, "foo", "bar" ]
 * or:
 *        arguments = [ obj, ["foo", "bar"] ]
 * then:
 *        restArgs(arguments, 1) == ["foo", "bar"]
 *
 * This allows functions like pick() to be implemented such that it allows either a bunch
 * of string arguments (like es6 rest parameters), or a single array of strings:
 *
 * given:
 *        var obj = { foo: 1, bar: 2, baz: 3 };
 * then:
 *        pick(obj, "foo", "bar");   // returns { foo: 1, bar: 2 }
 *        pick(obj, ["foo", "bar"]); // returns { foo: 1, bar: 2 }
 */
var restArgs = function (args, idx) {
    if (idx === void 0) { idx = 0; }
    return Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(args, idx));
};
/** Given an array, returns true if the object is found in the array, (using indexOf) */
exports.inArray = hof_1.curry(_inArray);
function _inArray(array, obj) {
    return array.indexOf(obj) !== -1;
}
exports._inArray = _inArray;
/**
 * Given an array, and an item, if the item is found in the array, it removes it (in-place).
 * The same array is returned
 */
exports.removeFrom = hof_1.curry(_removeFrom);
function _removeFrom(array, obj) {
    var idx = array.indexOf(obj);
    if (idx >= 0)
        array.splice(idx, 1);
    return array;
}
exports._removeFrom = _removeFrom;
/** pushes a values to an array and returns the value */
exports.pushTo = hof_1.curry(_pushTo);
function _pushTo(arr, val) {
    return (arr.push(val), val);
}
exports._pushTo = _pushTo;
/** Given an array of (deregistration) functions, calls all functions and removes each one from the source array */
exports.deregAll = function (functions) {
    return functions.slice().forEach(function (fn) {
        typeof fn === 'function' && fn();
        exports.removeFrom(functions, fn);
    });
};
/**
 * Applies a set of defaults to an options object.  The options object is filtered
 * to only those properties of the objects in the defaultsList.
 * Earlier objects in the defaultsList take precedence when applying defaults.
 */
function defaults(opts) {
    var defaultsList = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        defaultsList[_i - 1] = arguments[_i];
    }
    var _defaultsList = defaultsList.concat({}).reverse();
    var defaultVals = exports.extend.apply(null, _defaultsList);
    return exports.extend({}, defaultVals, pick(opts || {}, Object.keys(defaultVals)));
}
exports.defaults = defaults;
/** Reduce function that merges each element of the list into a single object, using extend */
exports.mergeR = function (memo, item) { return exports.extend(memo, item); };
/**
 * Finds the common ancestor path between two states.
 *
 * @param {Object} first The first state.
 * @param {Object} second The second state.
 * @return {Array} Returns an array of state names in descending order, not including the root.
 */
function ancestors(first, second) {
    var path = [];
    for (var n in first.path) {
        if (first.path[n] !== second.path[n])
            break;
        path.push(first.path[n]);
    }
    return path;
}
exports.ancestors = ancestors;
/**
 * Return a copy of the object only containing the whitelisted properties.
 *
 * #### Example:
 * ```
 * var foo = { a: 1, b: 2, c: 3 };
 * var ab = pick(foo, ['a', 'b']); // { a: 1, b: 2 }
 * ```
 * @param obj the source object
 * @param propNames an Array of strings, which are the whitelisted property names
 */
function pick(obj, propNames) {
    var objCopy = {};
    for (var prop_1 in obj) {
        if (propNames.indexOf(prop_1) !== -1) {
            objCopy[prop_1] = obj[prop_1];
        }
    }
    return objCopy;
}
exports.pick = pick;
/**
 * Return a copy of the object omitting the blacklisted properties.
 *
 * @example
 * ```
 *
 * var foo = { a: 1, b: 2, c: 3 };
 * var ab = omit(foo, ['a', 'b']); // { c: 3 }
 * ```
 * @param obj the source object
 * @param propNames an Array of strings, which are the blacklisted property names
 */
function omit(obj, propNames) {
    return Object.keys(obj)
        .filter(hof_1.not(exports.inArray(propNames)))
        .reduce(function (acc, key) { return (acc[key] = obj[key], acc); }, {});
}
exports.omit = omit;
/**
 * Maps an array, or object to a property (by name)
 */
function pluck(collection, propName) {
    return map(collection, hof_1.prop(propName));
}
exports.pluck = pluck;
/** Filters an Array or an Object's properties based on a predicate */
function filter(collection, callback) {
    var arr = predicates_1.isArray(collection), result = arr ? [] : {};
    var accept = arr ? function (x) { return result.push(x); } : function (x, key) { return result[key] = x; };
    exports.forEach(collection, function (item, i) {
        if (callback(item, i))
            accept(item, i);
    });
    return result;
}
exports.filter = filter;
/** Finds an object from an array, or a property of an object, that matches a predicate */
function find(collection, callback) {
    var result;
    exports.forEach(collection, function (item, i) {
        if (result)
            return;
        if (callback(item, i))
            result = item;
    });
    return result;
}
exports.find = find;
/** Given an object, returns a new object, where each property is transformed by the callback function */
exports.mapObj = map;
/** Maps an array or object properties using a callback function */
function map(collection, callback) {
    var result = predicates_1.isArray(collection) ? [] : {};
    exports.forEach(collection, function (item, i) { return result[i] = callback(item, i); });
    return result;
}
exports.map = map;
/**
 * Given an object, return its enumerable property values
 *
 * @example
 * ```
 *
 * let foo = { a: 1, b: 2, c: 3 }
 * let vals = values(foo); // [ 1, 2, 3 ]
 * ```
 */
exports.values = function (obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
};
/**
 * Reduce function that returns true if all of the values are truthy.
 *
 * @example
 * ```
 *
 * let vals = [ 1, true, {}, "hello world"];
 * vals.reduce(allTrueR, true); // true
 *
 * vals.push(0);
 * vals.reduce(allTrueR, true); // false
 * ```
 */
exports.allTrueR = function (memo, elem) { return memo && elem; };
/**
 * Reduce function that returns true if any of the values are truthy.
 *
 *  * @example
 * ```
 *
 * let vals = [ 0, null, undefined ];
 * vals.reduce(anyTrueR, true); // false
 *
 * vals.push("hello world");
 * vals.reduce(anyTrueR, true); // true
 * ```
 */
exports.anyTrueR = function (memo, elem) { return memo || elem; };
/**
 * Reduce function which un-nests a single level of arrays
 * @example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * input.reduce(unnestR, []) // [ "a", "b", "c", "d", [ "double, "nested" ] ]
 * ```
 */
exports.unnestR = function (memo, elem) { return memo.concat(elem); };
/**
 * Reduce function which recursively un-nests all arrays
 *
 * @example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * input.reduce(unnestR, []) // [ "a", "b", "c", "d", "double, "nested" ]
 * ```
 */
exports.flattenR = function (memo, elem) {
    return predicates_1.isArray(elem) ? memo.concat(elem.reduce(exports.flattenR, [])) : pushR(memo, elem);
};
/**
 * Reduce function that pushes an object to an array, then returns the array.
 * Mostly just for [[flattenR]] and [[uniqR]]
 */
function pushR(arr, obj) {
    arr.push(obj);
    return arr;
}
exports.pushR = pushR;
/** Reduce function that filters out duplicates */
exports.uniqR = function (acc, token) {
    return exports.inArray(acc, token) ? acc : pushR(acc, token);
};
/**
 * Return a new array with a single level of arrays unnested.
 *
 * @example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * unnest(input) // [ "a", "b", "c", "d", [ "double, "nested" ] ]
 * ```
 */
exports.unnest = function (arr) { return arr.reduce(exports.unnestR, []); };
/**
 * Return a completely flattened version of an array.
 *
 * @example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * flatten(input) // [ "a", "b", "c", "d", "double, "nested" ]
 * ```
 */
exports.flatten = function (arr) { return arr.reduce(exports.flattenR, []); };
/**
 * Given a .filter Predicate, builds a .filter Predicate which throws an error if any elements do not pass.
 * @example
 * ```
 *
 * let isNumber = (obj) => typeof(obj) === 'number';
 * let allNumbers = [ 1, 2, 3, 4, 5 ];
 * allNumbers.filter(assertPredicate(isNumber)); //OK
 *
 * let oneString = [ 1, 2, 3, 4, "5" ];
 * oneString.filter(assertPredicate(isNumber, "Not all numbers")); // throws Error(""Not all numbers"");
 * ```
 */
exports.assertPredicate = assertFn;
/**
 * Given a .map function, builds a .map function which throws an error if any mapped elements do not pass a truthyness test.
 * @example
 * ```
 *
 * var data = { foo: 1, bar: 2 };
 *
 * let keys = [ 'foo', 'bar' ]
 * let values = keys.map(assertMap(key => data[key], "Key not found"));
 * // values is [1, 2]
 *
 * let keys = [ 'foo', 'bar', 'baz' ]
 * let values = keys.map(assertMap(key => data[key], "Key not found"));
 * // throws Error("Key not found")
 * ```
 */
exports.assertMap = assertFn;
function assertFn(predicateOrMap, errMsg) {
    if (errMsg === void 0) { errMsg = "assert failure"; }
    return function (obj) {
        var result = predicateOrMap(obj);
        if (!result) {
            throw new Error(predicates_1.isFunction(errMsg) ? errMsg(obj) : errMsg);
        }
        return result;
    };
}
exports.assertFn = assertFn;
/**
 * Like _.pairs: Given an object, returns an array of key/value pairs
 *
 * @example
 * ```
 *
 * pairs({ foo: "FOO", bar: "BAR }) // [ [ "foo", "FOO" ], [ "bar": "BAR" ] ]
 * ```
 */
exports.pairs = function (obj) {
    return Object.keys(obj).map(function (key) { return [key, obj[key]]; });
};
/**
 * Given two or more parallel arrays, returns an array of tuples where
 * each tuple is composed of [ a[i], b[i], ... z[i] ]
 *
 * @example
 * ```
 *
 * let foo = [ 0, 2, 4, 6 ];
 * let bar = [ 1, 3, 5, 7 ];
 * let baz = [ 10, 30, 50, 70 ];
 * arrayTuples(foo, bar);       // [ [0, 1], [2, 3], [4, 5], [6, 7] ]
 * arrayTuples(foo, bar, baz);  // [ [0, 1, 10], [2, 3, 30], [4, 5, 50], [6, 7, 70] ]
 * ```
 */
function arrayTuples() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 0)
        return [];
    var maxArrayLen = args.reduce(function (min, arr) { return Math.min(arr.length, min); }, 9007199254740991); // aka 2^53 − 1 aka Number.MAX_SAFE_INTEGER
    var i, result = [];
    for (i = 0; i < maxArrayLen; i++) {
        // This is a hot function
        // Unroll when there are 1-4 arguments
        switch (args.length) {
            case 1:
                result.push([args[0][i]]);
                break;
            case 2:
                result.push([args[0][i], args[1][i]]);
                break;
            case 3:
                result.push([args[0][i], args[1][i], args[2][i]]);
                break;
            case 4:
                result.push([args[0][i], args[1][i], args[2][i], args[3][i]]);
                break;
            default:
                result.push(args.map(function (array) { return array[i]; }));
                break;
        }
    }
    return result;
}
exports.arrayTuples = arrayTuples;
/**
 * Reduce function which builds an object from an array of [key, value] pairs.
 *
 * Each iteration sets the key/val pair on the memo object, then returns the memo for the next iteration.
 *
 * Each keyValueTuple should be an array with values [ key: string, value: any ]
 *
 * @example
 * ```
 *
 * var pairs = [ ["fookey", "fooval"], ["barkey", "barval"] ]
 *
 * var pairsToObj = pairs.reduce((memo, pair) => applyPairs(memo, pair), {})
 * // pairsToObj == { fookey: "fooval", barkey: "barval" }
 *
 * // Or, more simply:
 * var pairsToObj = pairs.reduce(applyPairs, {})
 * // pairsToObj == { fookey: "fooval", barkey: "barval" }
 * ```
 */
function applyPairs(memo, keyValTuple) {
    var key, value;
    if (predicates_1.isArray(keyValTuple))
        key = keyValTuple[0], value = keyValTuple[1];
    if (!predicates_1.isString(key))
        throw new Error("invalid parameters to applyPairs");
    memo[key] = value;
    return memo;
}
exports.applyPairs = applyPairs;
/** Get the last element of an array */
function tail(arr) {
    return arr.length && arr[arr.length - 1] || undefined;
}
exports.tail = tail;
/**
 * shallow copy from src to dest
 *
 * note: This is a shallow copy, while angular.copy is a deep copy.
 * ui-router uses `copy` only to make copies of state parameters.
 */
function _copy(src, dest) {
    if (dest)
        Object.keys(dest).forEach(function (key) { return delete dest[key]; });
    if (!dest)
        dest = {};
    return exports.extend(dest, src);
}
/** Naive forEach implementation works with Objects or Arrays */
function _forEach(obj, cb, _this) {
    if (predicates_1.isArray(obj))
        return obj.forEach(cb, _this);
    Object.keys(obj).forEach(function (key) { return cb(obj[key], key); });
}
function _extend(toObj) {
    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj)
            continue;
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; j++) {
            toObj[keys[j]] = obj[keys[j]];
        }
    }
    return toObj;
}
exports._extend = _extend;
function _equals(o1, o2) {
    if (o1 === o2)
        return true;
    if (o1 === null || o2 === null)
        return false;
    if (o1 !== o1 && o2 !== o2)
        return true; // NaN === NaN
    var t1 = typeof o1, t2 = typeof o2;
    if (t1 !== t2 || t1 !== 'object')
        return false;
    var tup = [o1, o2];
    if (hof_1.all(predicates_1.isArray)(tup))
        return _arraysEq(o1, o2);
    if (hof_1.all(predicates_1.isDate)(tup))
        return o1.getTime() === o2.getTime();
    if (hof_1.all(predicates_1.isRegExp)(tup))
        return o1.toString() === o2.toString();
    if (hof_1.all(predicates_1.isFunction)(tup))
        return true; // meh
    var predicates = [predicates_1.isFunction, predicates_1.isArray, predicates_1.isDate, predicates_1.isRegExp];
    if (predicates.map(hof_1.any).reduce(function (b, fn) { return b || !!fn(tup); }, false))
        return false;
    var key, keys = {};
    for (key in o1) {
        if (!_equals(o1[key], o2[key]))
            return false;
        keys[key] = true;
    }
    for (key in o2) {
        if (!keys[key])
            return false;
    }
    return true;
}
function _arraysEq(a1, a2) {
    if (a1.length !== a2.length)
        return false;
    return arrayTuples(a1, a2).reduce(function (b, t) { return b && _equals(t[0], t[1]); }, true);
}
/**
 * Create a sort function
 *
 * Creates a sort function which sorts by a numeric property.
 *
 * The `propFn` should return the property as a number which can be sorted.
 *
 * #### Example:
 * This example returns the `priority` prop.
 * ```js
 * var sortfn = sortBy(obj => obj.priority)
 * // equivalent to:
 * var longhandSortFn = (a, b) => a.priority - b.priority;
 * ```
 *
 * #### Example:
 * This example uses [[prop]]
 * ```js
 * var sortfn = sortBy(prop('priority'))
 * ```
 *
 * The `checkFn` can be used to exclude objects from sorting.
 *
 * #### Example:
 * This example only sorts objects with type === 'FOO'
 * ```js
 * var sortfn = sortBy(prop('priority'), propEq('type', 'FOO'))
 * ```
 *
 * @param propFn a function that returns the property (as a number)
 * @param checkFn a predicate
 *
 * @return a sort function like: `(a, b) => (checkFn(a) && checkFn(b)) ? propFn(a) - propFn(b) : 0`
 */
exports.sortBy = function (propFn, checkFn) {
    if (checkFn === void 0) { checkFn = hof_1.val(true); }
    return function (a, b) {
        return (checkFn(a) && checkFn(b)) ? propFn(a) - propFn(b) : 0;
    };
};
/**
 * Composes a list of sort functions
 *
 * Creates a sort function composed of multiple sort functions.
 * Each sort function is invoked in series.
 * The first sort function to return non-zero "wins".
 *
 * @param sortFns list of sort functions
 */
exports.composeSort = function () {
    var sortFns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sortFns[_i] = arguments[_i];
    }
    return function composedSort(a, b) {
        return sortFns.reduce(function (prev, fn) { return prev || fn(a, b); }, 0);
    };
};
// issue #2676
exports.silenceUncaughtInPromise = function (promise) {
    return promise.catch(function (e) { return 0; }) && promise;
};
exports.silentRejection = function (error) {
    return exports.silenceUncaughtInPromise(coreservices_1.services.$q.reject(error));
};
//# sourceMappingURL=common.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Predicates
 *
 * These predicates return true/false based on the input.
 * Although these functions are exported, they are subject to change without notice.
 *
 * @module common_predicates
 */
/** */
var hof_1 = __webpack_require__(2);
var stateObject_1 = __webpack_require__(28);
var toStr = Object.prototype.toString;
var tis = function (t) { return function (x) { return typeof (x) === t; }; };
exports.isUndefined = tis('undefined');
exports.isDefined = hof_1.not(exports.isUndefined);
exports.isNull = function (o) { return o === null; };
exports.isNullOrUndefined = hof_1.or(exports.isNull, exports.isUndefined);
exports.isFunction = tis('function');
exports.isNumber = tis('number');
exports.isString = tis('string');
exports.isObject = function (x) { return x !== null && typeof x === 'object'; };
exports.isArray = Array.isArray;
exports.isDate = (function (x) { return toStr.call(x) === '[object Date]'; });
exports.isRegExp = (function (x) { return toStr.call(x) === '[object RegExp]'; });
exports.isState = stateObject_1.StateObject.isState;
/**
 * Predicate which checks if a value is injectable
 *
 * A value is "injectable" if it is a function, or if it is an ng1 array-notation-style array
 * where all the elements in the array are Strings, except the last one, which is a Function
 */
function isInjectable(val) {
    if (exports.isArray(val) && val.length) {
        var head = val.slice(0, -1), tail = val.slice(-1);
        return !(head.filter(hof_1.not(exports.isString)).length || tail.filter(hof_1.not(exports.isFunction)).length);
    }
    return exports.isFunction(val);
}
exports.isInjectable = isInjectable;
/**
 * Predicate which checks if a value looks like a Promise
 *
 * It is probably a Promise if it's an object, and it has a `then` property which is a Function
 */
exports.isPromise = hof_1.and(exports.isObject, hof_1.pipe(hof_1.prop('then'), exports.isFunction));
//# sourceMappingURL=predicates.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Higher order functions
 *
 * These utility functions are exported, but are subject to change without notice.
 *
 * @module common_hof
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a new function for [Partial Application](https://en.wikipedia.org/wiki/Partial_application) of the original function.
 *
 * Given a function with N parameters, returns a new function that supports partial application.
 * The new function accepts anywhere from 1 to N parameters.  When that function is called with M parameters,
 * where M is less than N, it returns a new function that accepts the remaining parameters.  It continues to
 * accept more parameters until all N parameters have been supplied.
 *
 *
 * This contrived example uses a partially applied function as an predicate, which returns true
 * if an object is found in both arrays.
 * @example
 * ```
 * // returns true if an object is in both of the two arrays
 * function inBoth(array1, array2, object) {
 *   return array1.indexOf(object) !== -1 &&
 *          array2.indexOf(object) !== 1;
 * }
 * let obj1, obj2, obj3, obj4, obj5, obj6, obj7
 * let foos = [obj1, obj3]
 * let bars = [obj3, obj4, obj5]
 *
 * // A curried "copy" of inBoth
 * let curriedInBoth = curry(inBoth);
 * // Partially apply both the array1 and array2
 * let inFoosAndBars = curriedInBoth(foos, bars);
 *
 * // Supply the final argument; since all arguments are
 * // supplied, the original inBoth function is then called.
 * let obj1InBoth = inFoosAndBars(obj1); // false
 *
 * // Use the inFoosAndBars as a predicate.
 * // Filter, on each iteration, supplies the final argument
 * let allObjs = [ obj1, obj2, obj3, obj4, obj5, obj6, obj7 ];
 * let foundInBoth = allObjs.filter(inFoosAndBars); // [ obj3 ]
 *
 * ```
 *
 * Stolen from: http://stackoverflow.com/questions/4394747/javascript-curry-function
 *
 * @param fn
 * @returns {*|function(): (*|any)}
 */
function curry(fn) {
    var initial_args = [].slice.apply(arguments, [1]);
    var func_args_length = fn.length;
    function curried(args) {
        if (args.length >= func_args_length)
            return fn.apply(null, args);
        return function () {
            return curried(args.concat([].slice.apply(arguments)));
        };
    }
    return curried(initial_args);
}
exports.curry = curry;
/**
 * Given a varargs list of functions, returns a function that composes the argument functions, right-to-left
 * given: f(x), g(x), h(x)
 * let composed = compose(f,g,h)
 * then, composed is: f(g(h(x)))
 */
function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function () {
        var i = start, result = args[start].apply(this, arguments);
        while (i--)
            result = args[i].call(this, result);
        return result;
    };
}
exports.compose = compose;
/**
 * Given a varargs list of functions, returns a function that is composes the argument functions, left-to-right
 * given: f(x), g(x), h(x)
 * let piped = pipe(f,g,h);
 * then, piped is: h(g(f(x)))
 */
function pipe() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return compose.apply(null, [].slice.call(arguments).reverse());
}
exports.pipe = pipe;
/**
 * Given a property name, returns a function that returns that property from an object
 * let obj = { foo: 1, name: "blarg" };
 * let getName = prop("name");
 * getName(obj) === "blarg"
 */
exports.prop = function (name) {
    return function (obj) { return obj && obj[name]; };
};
/**
 * Given a property name and a value, returns a function that returns a boolean based on whether
 * the passed object has a property that matches the value
 * let obj = { foo: 1, name: "blarg" };
 * let getName = propEq("name", "blarg");
 * getName(obj) === true
 */
exports.propEq = curry(function (name, val, obj) { return obj && obj[name] === val; });
/**
 * Given a dotted property name, returns a function that returns a nested property from an object, or undefined
 * let obj = { id: 1, nestedObj: { foo: 1, name: "blarg" }, };
 * let getName = prop("nestedObj.name");
 * getName(obj) === "blarg"
 * let propNotFound = prop("this.property.doesnt.exist");
 * propNotFound(obj) === undefined
 */
exports.parse = function (name) {
    return pipe.apply(null, name.split(".").map(exports.prop));
};
/**
 * Given a function that returns a truthy or falsey value, returns a
 * function that returns the opposite (falsey or truthy) value given the same inputs
 */
exports.not = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !fn.apply(null, args);
    };
};
/**
 * Given two functions that return truthy or falsey values, returns a function that returns truthy
 * if both functions return truthy for the given arguments
 */
function and(fn1, fn2) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn1.apply(null, args) && fn2.apply(null, args);
    };
}
exports.and = and;
/**
 * Given two functions that return truthy or falsey values, returns a function that returns truthy
 * if at least one of the functions returns truthy for the given arguments
 */
function or(fn1, fn2) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn1.apply(null, args) || fn2.apply(null, args);
    };
}
exports.or = or;
/**
 * Check if all the elements of an array match a predicate function
 *
 * @param fn1 a predicate function `fn1`
 * @returns a function which takes an array and returns true if `fn1` is true for all elements of the array
 */
exports.all = function (fn1) {
    return function (arr) { return arr.reduce(function (b, x) { return b && !!fn1(x); }, true); };
};
exports.any = function (fn1) {
    return function (arr) { return arr.reduce(function (b, x) { return b || !!fn1(x); }, false); };
};
/** Given a class, returns a Predicate function that returns true if the object is of that class */
exports.is = function (ctor) {
    return function (obj) {
        return (obj != null && obj.constructor === ctor || obj instanceof ctor);
    };
};
/** Given a value, returns a Predicate function that returns true if another value is === equal to the original value */
exports.eq = function (val) { return function (other) {
    return val === other;
}; };
/** Given a value, returns a function which returns the value */
exports.val = function (v) { return function () { return v; }; };
function invoke(fnName, args) {
    return function (obj) {
        return obj[fnName].apply(obj, args);
    };
}
exports.invoke = invoke;
/**
 * Sorta like Pattern Matching (a functional programming conditional construct)
 *
 * See http://c2.com/cgi/wiki?PatternMatching
 *
 * This is a conditional construct which allows a series of predicates and output functions
 * to be checked and then applied.  Each predicate receives the input.  If the predicate
 * returns truthy, then its matching output function (mapping function) is provided with
 * the input and, then the result is returned.
 *
 * Each combination (2-tuple) of predicate + output function should be placed in an array
 * of size 2: [ predicate, mapFn ]
 *
 * These 2-tuples should be put in an outer array.
 *
 * @example
 * ```
 *
 * // Here's a 2-tuple where the first element is the isString predicate
 * // and the second element is a function that returns a description of the input
 * let firstTuple = [ angular.isString, (input) => `Heres your string ${input}` ];
 *
 * // Second tuple: predicate "isNumber", mapfn returns a description
 * let secondTuple = [ angular.isNumber, (input) => `(${input}) That's a number!` ];
 *
 * let third = [ (input) => input === null,  (input) => `Oh, null...` ];
 *
 * let fourth = [ (input) => input === undefined,  (input) => `notdefined` ];
 *
 * let descriptionOf = pattern([ firstTuple, secondTuple, third, fourth ]);
 *
 * console.log(descriptionOf(undefined)); // 'notdefined'
 * console.log(descriptionOf(55)); // '(55) That's a number!'
 * console.log(descriptionOf("foo")); // 'Here's your string foo'
 * ```
 *
 * @param struct A 2D array.  Each element of the array should be an array, a 2-tuple,
 * with a Predicate and a mapping/output function
 * @returns {function(any): *}
 */
function pattern(struct) {
    return function (x) {
        for (var i = 0; i < struct.length; i++) {
            if (struct[i][0](x))
                return struct[i][1](x);
        }
    };
}
exports.pattern = pattern;
//# sourceMappingURL=hof.js.map

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.notImplemented = function (fnname) { return function () {
    throw new Error(fnname + "(): No coreservices implementation for UI-Router is loaded.");
}; };
var services = {
    $q: undefined,
    $injector: undefined,
};
exports.services = services;
//# sourceMappingURL=coreservices.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @coreapi
 * @module common
 */ /** */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(18));
__export(__webpack_require__(79));
__export(__webpack_require__(80));
__export(__webpack_require__(81));
__export(__webpack_require__(82));
__export(__webpack_require__(83));
__export(__webpack_require__(84));
__export(__webpack_require__(88));
__export(__webpack_require__(35));
__export(__webpack_require__(40));
__export(__webpack_require__(85));
__export(__webpack_require__(78));
//# sourceMappingURL=index.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Main entry point for angular 1.x build
 * @module ng1
 */ /** */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core = __webpack_require__(5);
exports.core = core;
__export(__webpack_require__(5));
__export(__webpack_require__(31));
__export(__webpack_require__(32));
__export(__webpack_require__(60));
__export(__webpack_require__(61));
__webpack_require__(93);
__webpack_require__(91);
__webpack_require__(95);
__webpack_require__(92);
__webpack_require__(98);
exports.default = "ui.router";
//# sourceMappingURL=index.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Functions that manipulate strings
 *
 * Although these functions are exported, they are subject to change without notice.
 *
 * @module common_strings
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var predicates_1 = __webpack_require__(1);
var rejectFactory_1 = __webpack_require__(14);
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var transition_1 = __webpack_require__(21);
var resolvable_1 = __webpack_require__(13);
/**
 * Returns a string shortened to a maximum length
 *
 * If the string is already less than the `max` length, return the string.
 * Else return the string, shortened to `max - 3` and append three dots ("...").
 *
 * @param max the maximum length of the string to return
 * @param str the input string
 */
function maxLength(max, str) {
    if (str.length <= max)
        return str;
    return str.substr(0, max - 3) + "...";
}
exports.maxLength = maxLength;
/**
 * Returns a string, with spaces added to the end, up to a desired str length
 *
 * If the string is already longer than the desired length, return the string.
 * Else returns the string, with extra spaces on the end, such that it reaches `length` characters.
 *
 * @param length the desired length of the string to return
 * @param str the input string
 */
function padString(length, str) {
    while (str.length < length)
        str += " ";
    return str;
}
exports.padString = padString;
function kebobString(camelCase) {
    return camelCase
        .replace(/^([A-Z])/, function ($1) { return $1.toLowerCase(); }) // replace first char
        .replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); }); // replace rest
}
exports.kebobString = kebobString;
function _toJson(obj) {
    return JSON.stringify(obj);
}
function _fromJson(json) {
    return predicates_1.isString(json) ? JSON.parse(json) : json;
}
function promiseToString(p) {
    return "Promise(" + JSON.stringify(p) + ")";
}
function functionToString(fn) {
    var fnStr = fnToString(fn);
    var namedFunctionMatch = fnStr.match(/^(function [^ ]+\([^)]*\))/);
    var toStr = namedFunctionMatch ? namedFunctionMatch[1] : fnStr;
    var fnName = fn['name'] || "";
    if (fnName && toStr.match(/function \(/)) {
        return 'function ' + fnName + toStr.substr(9);
    }
    return toStr;
}
exports.functionToString = functionToString;
function fnToString(fn) {
    var _fn = predicates_1.isArray(fn) ? fn.slice(-1)[0] : fn;
    return _fn && _fn.toString() || "undefined";
}
exports.fnToString = fnToString;
var stringifyPatternFn = null;
var stringifyPattern = function (value) {
    var isRejection = rejectFactory_1.Rejection.isRejectionPromise;
    stringifyPatternFn = stringifyPatternFn || hof_1.pattern([
        [hof_1.not(predicates_1.isDefined), hof_1.val("undefined")],
        [predicates_1.isNull, hof_1.val("null")],
        [predicates_1.isPromise, hof_1.val("[Promise]")],
        [isRejection, function (x) { return x._transitionRejection.toString(); }],
        [hof_1.is(rejectFactory_1.Rejection), hof_1.invoke("toString")],
        [hof_1.is(transition_1.Transition), hof_1.invoke("toString")],
        [hof_1.is(resolvable_1.Resolvable), hof_1.invoke("toString")],
        [predicates_1.isInjectable, functionToString],
        [hof_1.val(true), common_1.identity]
    ]);
    return stringifyPatternFn(value);
};
function stringify(o) {
    var seen = [];
    function format(val) {
        if (predicates_1.isObject(val)) {
            if (seen.indexOf(val) !== -1)
                return '[circular ref]';
            seen.push(val);
        }
        return stringifyPattern(val);
    }
    return JSON.stringify(o, function (key, val) { return format(val); }).replace(/\\"/g, '"');
}
exports.stringify = stringify;
/** Returns a function that splits a string on a character or substring */
exports.beforeAfterSubstr = function (char) { return function (str) {
    if (!str)
        return ["", ""];
    var idx = str.indexOf(char);
    if (idx === -1)
        return [str, ""];
    return [str.substr(0, idx), str.substr(idx + 1)];
}; };
/**
 * Splits on a delimiter, but returns the delimiters in the array
 *
 * #### Example:
 * ```js
 * var splitOnSlashes = splitOnDelim('/');
 * splitOnSlashes("/foo"); // ["/", "foo"]
 * splitOnSlashes("/foo/"); // ["/", "foo", "/"]
 * ```
 */
function splitOnDelim(delim) {
    var re = new RegExp("(" + delim + ")", "g");
    return function (str) {
        return str.split(re).filter(common_1.identity);
    };
}
exports.splitOnDelim = splitOnDelim;
;
/**
 * Reduce fn that joins neighboring strings
 *
 * Given an array of strings, returns a new array
 * where all neighboring strings have been joined.
 *
 * #### Example:
 * ```js
 * let arr = ["foo", "bar", 1, "baz", "", "qux" ];
 * arr.reduce(joinNeighborsR, []) // ["foobar", 1, "bazqux" ]
 * ```
 */
function joinNeighborsR(acc, x) {
    if (predicates_1.isString(common_1.tail(acc)) && predicates_1.isString(x))
        return acc.slice(0, -1).concat(common_1.tail(acc) + x);
    return common_1.pushR(acc, x);
}
exports.joinNeighborsR = joinNeighborsR;
;
//# sourceMappingURL=strings.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Transition tracing (debug)
 *
 * Enable transition tracing to print transition information to the console,
 * in order to help debug your application.
 * Tracing logs detailed information about each Transition to your console.
 *
 * To enable tracing, import the [[Trace]] singleton and enable one or more categories.
 *
 * ### ES6
 * ```js
 * import {trace} from "ui-router-ng2"; // or "angular-ui-router"
 * trace.enable(1, 5); // TRANSITION and VIEWCONFIG
 * ```
 *
 * ### CJS
 * ```js
 * let trace = require("angular-ui-router").trace; // or "ui-router-ng2"
 * trace.enable("TRANSITION", "VIEWCONFIG");
 * ```
 *
 * ### Globals
 * ```js
 * let trace = window["angular-ui-router"].trace; // or "ui-router-ng2"
 * trace.enable(); // Trace everything (very verbose)
 * ```
 *
 * ### Angular 1:
 * ```js
 * app.run($trace => $trace.enable());
 * ```
 *
 * @coreapi
 * @module trace
 */ /** for typedoc */
var hof_1 = __webpack_require__(2);
var predicates_1 = __webpack_require__(1);
var strings_1 = __webpack_require__(7);
/** @hidden */
function uiViewString(viewData) {
    if (!viewData)
        return 'ui-view (defunct)';
    return "[ui-view#" + viewData.id + " tag " +
        ("in template from '" + (viewData.creationContext && viewData.creationContext.name || '(root)') + "' state]: ") +
        ("fqn: '" + viewData.fqn + "', ") +
        ("name: '" + viewData.name + "@" + viewData.creationContext + "')");
}
/** @hidden */
var viewConfigString = function (viewConfig) {
    return "[ViewConfig#" + viewConfig.$id + " from '" + (viewConfig.viewDecl.$context.name || '(root)') + "' state]: target ui-view: '" + viewConfig.viewDecl.$uiViewName + "@" + viewConfig.viewDecl.$uiViewContextAnchor + "'";
};
/** @hidden */
function normalizedCat(input) {
    return predicates_1.isNumber(input) ? Category[input] : Category[Category[input]];
}
/**
 * Trace categories Enum
 *
 * Enable or disable a category using [[Trace.enable]] or [[Trace.disable]]
 *
 * `trace.enable(Category.TRANSITION)`
 *
 * These can also be provided using a matching string, or position ordinal
 *
 * `trace.enable("TRANSITION")`
 *
 * `trace.enable(1)`
 */
var Category;
(function (Category) {
    Category[Category["RESOLVE"] = 0] = "RESOLVE";
    Category[Category["TRANSITION"] = 1] = "TRANSITION";
    Category[Category["HOOK"] = 2] = "HOOK";
    Category[Category["UIVIEW"] = 3] = "UIVIEW";
    Category[Category["VIEWCONFIG"] = 4] = "VIEWCONFIG";
})(Category = exports.Category || (exports.Category = {}));
/** @hidden */ var _tid = hof_1.parse("$id");
/** @hidden */ var _rid = hof_1.parse("router.$id");
/** @hidden */ var transLbl = function (trans) { return "Transition #" + _tid(trans) + "-" + _rid(trans); };
/**
 * Prints UI-Router Transition trace information to the console.
 */
var Trace = (function () {
    /** @hidden */
    function Trace() {
        /** @hidden */
        this._enabled = {};
        this.approximateDigests = 0;
    }
    /** @hidden */
    Trace.prototype._set = function (enabled, categories) {
        var _this = this;
        if (!categories.length) {
            categories = Object.keys(Category)
                .map(function (k) { return parseInt(k, 10); })
                .filter(function (k) { return !isNaN(k); })
                .map(function (key) { return Category[key]; });
        }
        categories.map(normalizedCat).forEach(function (category) { return _this._enabled[category] = enabled; });
    };
    /**
     * Enables a trace [[Category]]
     *
     * ```js
     * trace.enable("TRANSITION");
     * ```
     *
     * @param categories categories to enable. If `categories` is omitted, all categories are enabled.
     *        Also takes strings (category name) or ordinal (category position)
     */
    Trace.prototype.enable = function () {
        var categories = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            categories[_i] = arguments[_i];
        }
        this._set(true, categories);
    };
    /**
     * Disables a trace [[Category]]
     *
     * ```js
     * trace.disable("VIEWCONFIG");
     * ```
     *
     * @param categories categories to disable. If `categories` is omitted, all categories are disabled.
     *        Also takes strings (category name) or ordinal (category position)
     */
    Trace.prototype.disable = function () {
        var categories = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            categories[_i] = arguments[_i];
        }
        this._set(false, categories);
    };
    /**
     * Retrieves the enabled stateus of a [[Category]]
     *
     * ```js
     * trace.enabled("VIEWCONFIG"); // true or false
     * ```
     *
     * @returns boolean true if the category is enabled
     */
    Trace.prototype.enabled = function (category) {
        return !!this._enabled[normalizedCat(category)];
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceTransitionStart = function (trans) {
        if (!this.enabled(Category.TRANSITION))
            return;
        console.log(transLbl(trans) + ": Started  -> " + strings_1.stringify(trans));
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceTransitionIgnored = function (trans) {
        if (!this.enabled(Category.TRANSITION))
            return;
        console.log(transLbl(trans) + ": Ignored  <> " + strings_1.stringify(trans));
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceHookInvocation = function (step, trans, options) {
        if (!this.enabled(Category.HOOK))
            return;
        var event = hof_1.parse("traceData.hookType")(options) || "internal", context = hof_1.parse("traceData.context.state.name")(options) || hof_1.parse("traceData.context")(options) || "unknown", name = strings_1.functionToString(step.registeredHook.callback);
        console.log(transLbl(trans) + ":   Hook -> " + event + " context: " + context + ", " + strings_1.maxLength(200, name));
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceHookResult = function (hookResult, trans, transitionOptions) {
        if (!this.enabled(Category.HOOK))
            return;
        console.log(transLbl(trans) + ":   <- Hook returned: " + strings_1.maxLength(200, strings_1.stringify(hookResult)));
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceResolvePath = function (path, when, trans) {
        if (!this.enabled(Category.RESOLVE))
            return;
        console.log(transLbl(trans) + ":         Resolving " + path + " (" + when + ")");
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceResolvableResolved = function (resolvable, trans) {
        if (!this.enabled(Category.RESOLVE))
            return;
        console.log(transLbl(trans) + ":               <- Resolved  " + resolvable + " to: " + strings_1.maxLength(200, strings_1.stringify(resolvable.data)));
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceError = function (reason, trans) {
        if (!this.enabled(Category.TRANSITION))
            return;
        console.log(transLbl(trans) + ": <- Rejected " + strings_1.stringify(trans) + ", reason: " + reason);
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceSuccess = function (finalState, trans) {
        if (!this.enabled(Category.TRANSITION))
            return;
        console.log(transLbl(trans) + ": <- Success  " + strings_1.stringify(trans) + ", final state: " + finalState.name);
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceUIViewEvent = function (event, viewData, extra) {
        if (extra === void 0) { extra = ""; }
        if (!this.enabled(Category.UIVIEW))
            return;
        console.log("ui-view: " + strings_1.padString(30, event) + " " + uiViewString(viewData) + extra);
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceUIViewConfigUpdated = function (viewData, context) {
        if (!this.enabled(Category.UIVIEW))
            return;
        this.traceUIViewEvent("Updating", viewData, " with ViewConfig from context='" + context + "'");
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceUIViewFill = function (viewData, html) {
        if (!this.enabled(Category.UIVIEW))
            return;
        this.traceUIViewEvent("Fill", viewData, " with: " + strings_1.maxLength(200, html));
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceViewServiceEvent = function (event, viewConfig) {
        if (!this.enabled(Category.VIEWCONFIG))
            return;
        console.log("VIEWCONFIG: " + event + " " + viewConfigString(viewConfig));
    };
    /** @internalapi called by ui-router code */
    Trace.prototype.traceViewServiceUIViewEvent = function (event, viewData) {
        if (!this.enabled(Category.VIEWCONFIG))
            return;
        console.log("VIEWCONFIG: " + event + " " + uiViewString(viewData));
    };
    return Trace;
}());
exports.Trace = Trace;
/**
 * The [[Trace]] singleton
 *
 * #### Example:
 * ```js
 * import {trace} from "angular-ui-router";
 * trace.enable(1, 5);
 * ```
 */
var trace = new Trace();
exports.trace = trace;
//# sourceMappingURL=trace.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @coreapi
 * @module state
 */ /** for typedoc */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
/**
 * Encapsulate the target (destination) state/params/options of a [[Transition]].
 *
 * This class is frequently used to redirect a transition to a new destination.
 *
 * See:
 *
 * - [[HookResult]]
 * - [[TransitionHookFn]]
 * - [[TransitionService.onStart]]
 *
 * To create a `TargetState`, use [[StateService.target]].
 *
 * ---
 *
 * This class wraps:
 *
 * 1) an identifier for a state
 * 2) a set of parameters
 * 3) and transition options
 * 4) the registered state object (the [[StateDeclaration]])
 *
 * Many UI-Router APIs such as [[StateService.go]] take a [[StateOrName]] argument which can
 * either be a *state object* (a [[StateDeclaration]] or [[StateObject]]) or a *state name* (a string).
 * The `TargetState` class normalizes those options.
 *
 * A `TargetState` may be valid (the state being targeted exists in the registry)
 * or invalid (the state being targeted is not registered).
 */
var TargetState = (function () {
    /**
     * The TargetState constructor
     *
     * Note: Do not construct a `TargetState` manually.
     * To create a `TargetState`, use the [[StateService.target]] factory method.
     *
     * @param _identifier An identifier for a state.
     *    Either a fully-qualified state name, or the object used to define the state.
     * @param _definition The internal state representation, if exists.
     * @param _params Parameters for the target state
     * @param _options Transition options.
     *
     * @internalapi
     */
    function TargetState(_identifier, _definition, _params, _options) {
        if (_options === void 0) { _options = {}; }
        this._identifier = _identifier;
        this._definition = _definition;
        this._options = _options;
        this._params = _params || {};
    }
    /** The name of the state this object targets */
    TargetState.prototype.name = function () {
        return this._definition && this._definition.name || this._identifier;
    };
    /** The identifier used when creating this TargetState */
    TargetState.prototype.identifier = function () {
        return this._identifier;
    };
    /** The target parameter values */
    TargetState.prototype.params = function () {
        return this._params;
    };
    /** The internal state object (if it was found) */
    TargetState.prototype.$state = function () {
        return this._definition;
    };
    /** The internal state declaration (if it was found) */
    TargetState.prototype.state = function () {
        return this._definition && this._definition.self;
    };
    /** The target options */
    TargetState.prototype.options = function () {
        return this._options;
    };
    /** True if the target state was found */
    TargetState.prototype.exists = function () {
        return !!(this._definition && this._definition.self);
    };
    /** True if the object is valid */
    TargetState.prototype.valid = function () {
        return !this.error();
    };
    /** If the object is invalid, returns the reason why */
    TargetState.prototype.error = function () {
        var base = this.options().relative;
        if (!this._definition && !!base) {
            var stateName = base.name ? base.name : base;
            return "Could not resolve '" + this.name() + "' from state '" + stateName + "'";
        }
        if (!this._definition)
            return "No such state '" + this.name() + "'";
        if (!this._definition.self)
            return "State '" + this.name() + "' has an invalid definition";
    };
    TargetState.prototype.toString = function () {
        return "'" + this.name() + "'" + common_1.toJson(this.params());
    };
    return TargetState;
}());
/** Returns true if the object has a state property that might be a state or state name */
TargetState.isDef = function (obj) {
    return obj && obj.state && (predicates_1.isString(obj.state) || predicates_1.isString(obj.state.name));
};
exports.TargetState = TargetState;
//# sourceMappingURL=targetState.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module params
 */ /** for typedoc */
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var predicates_1 = __webpack_require__(1);
var coreservices_1 = __webpack_require__(4);
var paramType_1 = __webpack_require__(26);
/** @hidden */ var hasOwn = Object.prototype.hasOwnProperty;
/** @hidden */ var isShorthand = function (cfg) {
    return ["value", "type", "squash", "array", "dynamic"].filter(hasOwn.bind(cfg || {})).length === 0;
};
/** @internalapi */
var DefType;
(function (DefType) {
    DefType[DefType["PATH"] = 0] = "PATH";
    DefType[DefType["SEARCH"] = 1] = "SEARCH";
    DefType[DefType["CONFIG"] = 2] = "CONFIG";
})(DefType = exports.DefType || (exports.DefType = {}));
/** @hidden */
function unwrapShorthand(cfg) {
    cfg = isShorthand(cfg) && { value: cfg } || cfg;
    getStaticDefaultValue['__cacheable'] = true;
    function getStaticDefaultValue() {
        return cfg.value;
    }
    return common_1.extend(cfg, {
        $$fn: predicates_1.isInjectable(cfg.value) ? cfg.value : getStaticDefaultValue,
    });
}
/** @hidden */
function getType(cfg, urlType, location, id, paramTypes) {
    if (cfg.type && urlType && urlType.name !== 'string')
        throw new Error("Param '" + id + "' has two type configurations.");
    if (cfg.type && urlType && urlType.name === 'string' && paramTypes.type(cfg.type))
        return paramTypes.type(cfg.type);
    if (urlType)
        return urlType;
    if (!cfg.type) {
        var type = location === DefType.CONFIG ? "any" :
            location === DefType.PATH ? "path" :
                location === DefType.SEARCH ? "query" : "string";
        return paramTypes.type(type);
    }
    return cfg.type instanceof paramType_1.ParamType ? cfg.type : paramTypes.type(cfg.type);
}
/**
 * @internalapi
 * returns false, true, or the squash value to indicate the "default parameter url squash policy".
 */
function getSquashPolicy(config, isOptional, defaultPolicy) {
    var squash = config.squash;
    if (!isOptional || squash === false)
        return false;
    if (!predicates_1.isDefined(squash) || squash == null)
        return defaultPolicy;
    if (squash === true || predicates_1.isString(squash))
        return squash;
    throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
}
/** @internalapi */
function getReplace(config, arrayMode, isOptional, squash) {
    var replace, configuredKeys, defaultPolicy = [
        { from: "", to: (isOptional || arrayMode ? undefined : "") },
        { from: null, to: (isOptional || arrayMode ? undefined : "") },
    ];
    replace = predicates_1.isArray(config.replace) ? config.replace : [];
    if (predicates_1.isString(squash))
        replace.push({ from: squash, to: undefined });
    configuredKeys = common_1.map(replace, hof_1.prop("from"));
    return common_1.filter(defaultPolicy, function (item) { return configuredKeys.indexOf(item.from) === -1; }).concat(replace);
}
/** @internalapi */
var Param = (function () {
    function Param(id, type, config, location, urlMatcherFactory) {
        config = unwrapShorthand(config);
        type = getType(config, type, location, id, urlMatcherFactory.paramTypes);
        var arrayMode = getArrayMode();
        type = arrayMode ? type.$asArray(arrayMode, location === DefType.SEARCH) : type;
        var isOptional = config.value !== undefined || location === DefType.SEARCH;
        var dynamic = predicates_1.isDefined(config.dynamic) ? !!config.dynamic : !!type.dynamic;
        var raw = predicates_1.isDefined(config.raw) ? !!config.raw : !!type.raw;
        var squash = getSquashPolicy(config, isOptional, urlMatcherFactory.defaultSquashPolicy());
        var replace = getReplace(config, arrayMode, isOptional, squash);
        var inherit = predicates_1.isDefined(config.inherit) ? !!config.inherit : !!type.inherit;
        // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
        function getArrayMode() {
            var arrayDefaults = { array: (location === DefType.SEARCH ? "auto" : false) };
            var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
            return common_1.extend(arrayDefaults, arrayParamNomenclature, config).array;
        }
        common_1.extend(this, { id: id, type: type, location: location, isOptional: isOptional, dynamic: dynamic, raw: raw, squash: squash, replace: replace, inherit: inherit, array: arrayMode, config: config });
    }
    Param.prototype.isDefaultValue = function (value) {
        return this.isOptional && this.type.equals(this.value(), value);
    };
    /**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     */
    Param.prototype.value = function (value) {
        var _this = this;
        /**
         * [Internal] Get the default value of a parameter, which may be an injectable function.
         */
        var getDefaultValue = function () {
            if (_this._defaultValueCache)
                return _this._defaultValueCache.defaultValue;
            if (!coreservices_1.services.$injector)
                throw new Error("Injectable functions cannot be called at configuration time");
            var defaultValue = coreservices_1.services.$injector.invoke(_this.config.$$fn);
            if (defaultValue !== null && defaultValue !== undefined && !_this.type.is(defaultValue))
                throw new Error("Default value (" + defaultValue + ") for parameter '" + _this.id + "' is not an instance of ParamType (" + _this.type.name + ")");
            if (_this.config.$$fn['__cacheable']) {
                _this._defaultValueCache = { defaultValue: defaultValue };
            }
            return defaultValue;
        };
        var replaceSpecialValues = function (val) {
            for (var _i = 0, _a = _this.replace; _i < _a.length; _i++) {
                var tuple = _a[_i];
                if (tuple.from === val)
                    return tuple.to;
            }
            return val;
        };
        value = replaceSpecialValues(value);
        return predicates_1.isUndefined(value) ? getDefaultValue() : this.type.$normalize(value);
    };
    Param.prototype.isSearch = function () {
        return this.location === DefType.SEARCH;
    };
    Param.prototype.validates = function (value) {
        // There was no parameter value, but the param is optional
        if ((predicates_1.isUndefined(value) || value === null) && this.isOptional)
            return true;
        // The value was not of the correct ParamType, and could not be decoded to the correct ParamType
        var normalized = this.type.$normalize(value);
        if (!this.type.is(normalized))
            return false;
        // The value was of the correct type, but when encoded, did not match the ParamType's regexp
        var encoded = this.type.encode(normalized);
        return !(predicates_1.isString(encoded) && !this.type.pattern.exec(encoded));
    };
    Param.prototype.toString = function () {
        return "{Param:" + this.id + " " + this.type + " squash: '" + this.squash + "' optional: " + this.isOptional + "}";
    };
    Param.values = function (params, values) {
        if (values === void 0) { values = {}; }
        var paramValues = {};
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            paramValues[param.id] = param.value(values[param.id]);
        }
        return paramValues;
    };
    /**
     * Finds [[Param]] objects which have different param values
     *
     * Filters a list of [[Param]] objects to only those whose parameter values differ in two param value objects
     *
     * @param params: The list of Param objects to filter
     * @param values1: The first set of parameter values
     * @param values2: the second set of parameter values
     *
     * @returns any Param objects whose values were different between values1 and values2
     */
    Param.changed = function (params, values1, values2) {
        if (values1 === void 0) { values1 = {}; }
        if (values2 === void 0) { values2 = {}; }
        return params.filter(function (param) { return !param.type.equals(values1[param.id], values2[param.id]); });
    };
    /**
     * Checks if two param value objects are equal (for a set of [[Param]] objects)
     *
     * @param params The list of [[Param]] objects to check
     * @param values1 The first set of param values
     * @param values2 The second set of param values
     *
     * @returns true if the param values in values1 and values2 are equal
     */
    Param.equals = function (params, values1, values2) {
        if (values1 === void 0) { values1 = {}; }
        if (values2 === void 0) { values2 = {}; }
        return Param.changed(params, values1, values2).length === 0;
    };
    /** Returns true if a the parameter values are valid, according to the Param definitions */
    Param.validates = function (params, values) {
        if (values === void 0) { values = {}; }
        return params.map(function (param) { return param.validates(values[param.id]); }).reduce(common_1.allTrueR, true);
    };
    return Param;
}());
exports.Param = Param;
//# sourceMappingURL=param.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransitionHookPhase;
(function (TransitionHookPhase) {
    TransitionHookPhase[TransitionHookPhase["CREATE"] = 0] = "CREATE";
    TransitionHookPhase[TransitionHookPhase["BEFORE"] = 1] = "BEFORE";
    TransitionHookPhase[TransitionHookPhase["RUN"] = 2] = "RUN";
    TransitionHookPhase[TransitionHookPhase["SUCCESS"] = 3] = "SUCCESS";
    TransitionHookPhase[TransitionHookPhase["ERROR"] = 4] = "ERROR";
})(TransitionHookPhase = exports.TransitionHookPhase || (exports.TransitionHookPhase = {}));
var TransitionHookScope;
(function (TransitionHookScope) {
    TransitionHookScope[TransitionHookScope["TRANSITION"] = 0] = "TRANSITION";
    TransitionHookScope[TransitionHookScope["STATE"] = 1] = "STATE";
})(TransitionHookScope = exports.TransitionHookScope || (exports.TransitionHookScope = {}));
//# sourceMappingURL=interface.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ng_from_import = __webpack_require__(3);
var ng_from_global = angular;
exports.ng = (ng_from_import && ng_from_import.module) ? ng_from_import : ng_from_global;
//# sourceMappingURL=angular.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module resolve
 */ /** for typedoc */
var common_1 = __webpack_require__(0);
var coreservices_1 = __webpack_require__(4);
var trace_1 = __webpack_require__(8);
var strings_1 = __webpack_require__(7);
var predicates_1 = __webpack_require__(1);
// TODO: explicitly make this user configurable
exports.defaultResolvePolicy = {
    when: "LAZY",
    async: "WAIT"
};
/**
 * The basic building block for the resolve system.
 *
 * Resolvables encapsulate a state's resolve's resolveFn, the resolveFn's declared dependencies, the wrapped (.promise),
 * and the unwrapped-when-complete (.data) result of the resolveFn.
 *
 * Resolvable.get() either retrieves the Resolvable's existing promise, or else invokes resolve() (which invokes the
 * resolveFn) and returns the resulting promise.
 *
 * Resolvable.get() and Resolvable.resolve() both execute within a context path, which is passed as the first
 * parameter to those fns.
 */
var Resolvable = (function () {
    function Resolvable(arg1, resolveFn, deps, policy, data) {
        this.resolved = false;
        this.promise = undefined;
        if (arg1 instanceof Resolvable) {
            common_1.extend(this, arg1);
        }
        else if (predicates_1.isFunction(resolveFn)) {
            if (arg1 == null || arg1 == undefined)
                throw new Error("new Resolvable(): token argument is required");
            if (!predicates_1.isFunction(resolveFn))
                throw new Error("new Resolvable(): resolveFn argument must be a function");
            this.token = arg1;
            this.policy = policy;
            this.resolveFn = resolveFn;
            this.deps = deps || [];
            this.data = data;
            this.resolved = data !== undefined;
            this.promise = this.resolved ? coreservices_1.services.$q.when(this.data) : undefined;
        }
        else if (predicates_1.isObject(arg1) && arg1.token && predicates_1.isFunction(arg1.resolveFn)) {
            var literal = arg1;
            return new Resolvable(literal.token, literal.resolveFn, literal.deps, literal.policy, literal.data);
        }
    }
    Resolvable.prototype.getPolicy = function (state) {
        var thisPolicy = this.policy || {};
        var statePolicy = state && state.resolvePolicy || {};
        return {
            when: thisPolicy.when || statePolicy.when || exports.defaultResolvePolicy.when,
            async: thisPolicy.async || statePolicy.async || exports.defaultResolvePolicy.async,
        };
    };
    /**
     * Asynchronously resolve this Resolvable's data
     *
     * Given a ResolveContext that this Resolvable is found in:
     * Wait for this Resolvable's dependencies, then invoke this Resolvable's function
     * and update the Resolvable's state
     */
    Resolvable.prototype.resolve = function (resolveContext, trans) {
        var _this = this;
        var $q = coreservices_1.services.$q;
        // Gets all dependencies from ResolveContext and wait for them to be resolved
        var getResolvableDependencies = function () {
            return $q.all(resolveContext.getDependencies(_this).map(function (resolvable) {
                return resolvable.get(resolveContext, trans);
            }));
        };
        // Invokes the resolve function passing the resolved dependencies as arguments
        var invokeResolveFn = function (resolvedDeps) {
            return _this.resolveFn.apply(null, resolvedDeps);
        };
        /**
         * For RXWAIT policy:
         *
         * Given an observable returned from a resolve function:
         * - enables .cache() mode (this allows multicast subscribers)
         * - then calls toPromise() (this triggers subscribe() and thus fetches)
         * - Waits for the promise, then return the cached observable (not the first emitted value).
         */
        var waitForRx = function (observable$) {
            var cached = observable$.cache(1);
            return cached.take(1).toPromise().then(function () { return cached; });
        };
        // If the resolve policy is RXWAIT, wait for the observable to emit something. otherwise pass through.
        var node = resolveContext.findNode(this);
        var state = node && node.state;
        var maybeWaitForRx = this.getPolicy(state).async === "RXWAIT" ? waitForRx : common_1.identity;
        // After the final value has been resolved, update the state of the Resolvable
        var applyResolvedValue = function (resolvedValue) {
            _this.data = resolvedValue;
            _this.resolved = true;
            trace_1.trace.traceResolvableResolved(_this, trans);
            return _this.data;
        };
        // Sets the promise property first, then getsResolvableDependencies in the context of the promise chain. Always waits one tick.
        return this.promise = $q.when()
            .then(getResolvableDependencies)
            .then(invokeResolveFn)
            .then(maybeWaitForRx)
            .then(applyResolvedValue);
    };
    /**
     * Gets a promise for this Resolvable's data.
     *
     * Fetches the data and returns a promise.
     * Returns the existing promise if it has already been fetched once.
     */
    Resolvable.prototype.get = function (resolveContext, trans) {
        return this.promise || this.resolve(resolveContext, trans);
    };
    Resolvable.prototype.toString = function () {
        return "Resolvable(token: " + strings_1.stringify(this.token) + ", requires: [" + this.deps.map(strings_1.stringify) + "])";
    };
    Resolvable.prototype.clone = function () {
        return new Resolvable(this);
    };
    return Resolvable;
}());
Resolvable.fromData = function (token, data) {
    return new Resolvable(token, function () { return data; }, null, null, data);
};
exports.Resolvable = Resolvable;
//# sourceMappingURL=resolvable.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @coreapi
 * @module transition
 */ /** for typedoc */

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var strings_1 = __webpack_require__(7);
var hof_1 = __webpack_require__(2);
var RejectType;
(function (RejectType) {
    RejectType[RejectType["SUPERSEDED"] = 2] = "SUPERSEDED";
    RejectType[RejectType["ABORTED"] = 3] = "ABORTED";
    RejectType[RejectType["INVALID"] = 4] = "INVALID";
    RejectType[RejectType["IGNORED"] = 5] = "IGNORED";
    RejectType[RejectType["ERROR"] = 6] = "ERROR";
})(RejectType = exports.RejectType || (exports.RejectType = {}));
/** @hidden */ var id = 0;
var Rejection = (function () {
    function Rejection(type, message, detail) {
        this.$id = id++;
        this.type = type;
        this.message = message;
        this.detail = detail;
    }
    Rejection.prototype.toString = function () {
        var detailString = function (d) {
            return d && d.toString !== Object.prototype.toString ? d.toString() : strings_1.stringify(d);
        };
        var detail = detailString(this.detail);
        var _a = this, $id = _a.$id, type = _a.type, message = _a.message;
        return "Transition Rejection($id: " + $id + " type: " + type + ", message: " + message + ", detail: " + detail + ")";
    };
    Rejection.prototype.toPromise = function () {
        return common_1.extend(common_1.silentRejection(this), { _transitionRejection: this });
    };
    /** Returns true if the obj is a rejected promise created from the `asPromise` factory */
    Rejection.isRejectionPromise = function (obj) {
        return obj && (typeof obj.then === 'function') && hof_1.is(Rejection)(obj._transitionRejection);
    };
    /** Returns a Rejection due to transition superseded */
    Rejection.superseded = function (detail, options) {
        var message = "The transition has been superseded by a different transition";
        var rejection = new Rejection(RejectType.SUPERSEDED, message, detail);
        if (options && options.redirected) {
            rejection.redirected = true;
        }
        return rejection;
    };
    /** Returns a Rejection due to redirected transition */
    Rejection.redirected = function (detail) {
        return Rejection.superseded(detail, { redirected: true });
    };
    /** Returns a Rejection due to invalid transition */
    Rejection.invalid = function (detail) {
        var message = "This transition is invalid";
        return new Rejection(RejectType.INVALID, message, detail);
    };
    /** Returns a Rejection due to ignored transition */
    Rejection.ignored = function (detail) {
        var message = "The transition was ignored";
        return new Rejection(RejectType.IGNORED, message, detail);
    };
    /** Returns a Rejection due to aborted transition */
    Rejection.aborted = function (detail) {
        var message = "The transition has been aborted";
        return new Rejection(RejectType.ABORTED, message, detail);
    };
    /** Returns a Rejection due to aborted transition */
    Rejection.errored = function (detail) {
        var message = "The transition errored";
        return new Rejection(RejectType.ERROR, message, detail);
    };
    /**
     * Returns a Rejection
     *
     * Normalizes a value as a Rejection.
     * If the value is already a Rejection, returns it.
     * Otherwise, wraps and returns the value as a Rejection (Rejection type: ERROR).
     *
     * @returns `detail` if it is already a `Rejection`, else returns an ERROR Rejection.
     */
    Rejection.normalize = function (detail) {
        return hof_1.is(Rejection)(detail) ? detail : Rejection.errored(detail);
    };
    return Rejection;
}());
exports.Rejection = Rejection;
//# sourceMappingURL=rejectFactory.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module transition
 */
/** for typedoc */
var interface_1 = __webpack_require__(11);
var common_1 = __webpack_require__(0);
var strings_1 = __webpack_require__(7);
var predicates_1 = __webpack_require__(1);
var hof_1 = __webpack_require__(2);
var trace_1 = __webpack_require__(8);
var coreservices_1 = __webpack_require__(4);
var rejectFactory_1 = __webpack_require__(14);
var targetState_1 = __webpack_require__(9);
var defaultOptions = {
    current: common_1.noop,
    transition: null,
    traceData: {},
    bind: null,
};
/** @hidden */
var TransitionHook = (function () {
    function TransitionHook(transition, stateContext, registeredHook, options) {
        var _this = this;
        this.transition = transition;
        this.stateContext = stateContext;
        this.registeredHook = registeredHook;
        this.options = options;
        this.isSuperseded = function () {
            return _this.type.hookPhase === interface_1.TransitionHookPhase.RUN && !_this.options.transition.isActive();
        };
        this.options = common_1.defaults(options, defaultOptions);
        this.type = registeredHook.eventType;
    }
    TransitionHook.prototype.logError = function (err) {
        this.transition.router.stateService.defaultErrorHandler()(err);
    };
    TransitionHook.prototype.invokeHook = function () {
        var _this = this;
        var hook = this.registeredHook;
        if (hook._deregistered)
            return;
        var notCurrent = this.getNotCurrentRejection();
        if (notCurrent)
            return notCurrent;
        var options = this.options;
        trace_1.trace.traceHookInvocation(this, this.transition, options);
        var invokeCallback = function () {
            return hook.callback.call(options.bind, _this.transition, _this.stateContext);
        };
        var normalizeErr = function (err) {
            return rejectFactory_1.Rejection.normalize(err).toPromise();
        };
        var handleError = function (err) {
            return hook.eventType.getErrorHandler(_this)(err);
        };
        var handleResult = function (result) {
            return hook.eventType.getResultHandler(_this)(result);
        };
        try {
            var result = invokeCallback();
            if (!this.type.synchronous && predicates_1.isPromise(result)) {
                return result.catch(normalizeErr)
                    .then(handleResult, handleError);
            }
            else {
                return handleResult(result);
            }
        }
        catch (err) {
            // If callback throws (synchronously)
            return handleError(rejectFactory_1.Rejection.normalize(err));
        }
    };
    /**
     * This method handles the return value of a Transition Hook.
     *
     * A hook can return false (cancel), a TargetState (redirect),
     * or a promise (which may later resolve to false or a redirect)
     *
     * This also handles "transition superseded" -- when a new transition
     * was started while the hook was still running
     */
    TransitionHook.prototype.handleHookResult = function (result) {
        var _this = this;
        var notCurrent = this.getNotCurrentRejection();
        if (notCurrent)
            return notCurrent;
        // Hook returned a promise
        if (predicates_1.isPromise(result)) {
            // Wait for the promise, then reprocess with the resulting value
            return result.then(function (val) { return _this.handleHookResult(val); });
        }
        trace_1.trace.traceHookResult(result, this.transition, this.options);
        // Hook returned false
        if (result === false) {
            // Abort this Transition
            return rejectFactory_1.Rejection.aborted("Hook aborted transition").toPromise();
        }
        var isTargetState = hof_1.is(targetState_1.TargetState);
        // hook returned a TargetState
        if (isTargetState(result)) {
            // Halt the current Transition and redirect (a new Transition) to the TargetState.
            return rejectFactory_1.Rejection.redirected(result).toPromise();
        }
    };
    /**
     * Return a Rejection promise if the transition is no longer current due
     * to a stopped router (disposed), or a new transition has started and superseded this one.
     */
    TransitionHook.prototype.getNotCurrentRejection = function () {
        var router = this.transition.router;
        // The router is stopped
        if (router._disposed) {
            return rejectFactory_1.Rejection.aborted("UIRouter instance #" + router.$id + " has been stopped (disposed)").toPromise();
        }
        if (this.transition._aborted) {
            return rejectFactory_1.Rejection.aborted().toPromise();
        }
        // This transition is no longer current.
        // Another transition started while this hook was still running.
        if (this.isSuperseded()) {
            // Abort this transition
            return rejectFactory_1.Rejection.superseded(this.options.current()).toPromise();
        }
    };
    TransitionHook.prototype.toString = function () {
        var _a = this, options = _a.options, registeredHook = _a.registeredHook;
        var event = hof_1.parse("traceData.hookType")(options) || "internal", context = hof_1.parse("traceData.context.state.name")(options) || hof_1.parse("traceData.context")(options) || "unknown", name = strings_1.fnToString(registeredHook.callback);
        return event + " context: " + context + ", " + strings_1.maxLength(200, name);
    };
    /**
     * Chains together an array of TransitionHooks.
     *
     * Given a list of [[TransitionHook]] objects, chains them together.
     * Each hook is invoked after the previous one completes.
     *
     * #### Example:
     * ```js
     * var hooks: TransitionHook[] = getHooks();
     * let promise: Promise<any> = TransitionHook.chain(hooks);
     *
     * promise.then(handleSuccess, handleError);
     * ```
     *
     * @param hooks the list of hooks to chain together
     * @param waitFor if provided, the chain is `.then()`'ed off this promise
     * @returns a `Promise` for sequentially invoking the hooks (in order)
     */
    TransitionHook.chain = function (hooks, waitFor) {
        // Chain the next hook off the previous
        var createHookChainR = function (prev, nextHook) {
            return prev.then(function () { return nextHook.invokeHook(); });
        };
        return hooks.reduce(createHookChainR, waitFor || coreservices_1.services.$q.when());
    };
    /**
     * Invokes all the provided TransitionHooks, in order.
     * Each hook's return value is checked.
     * If any hook returns a promise, then the rest of the hooks are chained off that promise, and the promise is returned.
     * If no hook returns a promise, then all hooks are processed synchronously.
     *
     * @param hooks the list of TransitionHooks to invoke
     * @param doneCallback a callback that is invoked after all the hooks have successfully completed
     *
     * @returns a promise for the async result, or the result of the callback
     */
    TransitionHook.invokeHooks = function (hooks, doneCallback) {
        for (var idx = 0; idx < hooks.length; idx++) {
            var hookResult = hooks[idx].invokeHook();
            if (predicates_1.isPromise(hookResult)) {
                var remainingHooks = hooks.slice(idx + 1);
                return TransitionHook.chain(remainingHooks, hookResult)
                    .then(doneCallback);
            }
        }
        return doneCallback();
    };
    /**
     * Run all TransitionHooks, ignoring their return value.
     */
    TransitionHook.runAllHooks = function (hooks) {
        hooks.forEach(function (hook) { return hook.invokeHook(); });
    };
    return TransitionHook;
}());
/**
 * These GetResultHandler(s) are used by [[invokeHook]] below
 * Each HookType chooses a GetResultHandler (See: [[TransitionService._defineCoreEvents]])
 */
TransitionHook.HANDLE_RESULT = function (hook) { return function (result) {
    return hook.handleHookResult(result);
}; };
/**
 * If the result is a promise rejection, log it.
 * Otherwise, ignore the result.
 */
TransitionHook.LOG_REJECTED_RESULT = function (hook) { return function (result) {
    predicates_1.isPromise(result) && result.catch(function (err) {
        return hook.logError(rejectFactory_1.Rejection.normalize(err));
    });
    return undefined;
}; };
/**
 * These GetErrorHandler(s) are used by [[invokeHook]] below
 * Each HookType chooses a GetErrorHandler (See: [[TransitionService._defineCoreEvents]])
 */
TransitionHook.LOG_ERROR = function (hook) { return function (error) {
    return hook.logError(error);
}; };
TransitionHook.REJECT_ERROR = function (hook) { return function (error) {
    return common_1.silentRejection(error);
}; };
TransitionHook.THROW_ERROR = function (hook) { return function (error) {
    throw error;
}; };
exports.TransitionHook = TransitionHook;
//# sourceMappingURL=transitionHook.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var index_1 = __webpack_require__(18);
var common_1 = __webpack_require__(0);
var beforeAfterSubstr = function (char) { return function (str) {
    if (!str)
        return ["", ""];
    var idx = str.indexOf(char);
    if (idx === -1)
        return [str, ""];
    return [str.substr(0, idx), str.substr(idx + 1)];
}; };
exports.splitHash = beforeAfterSubstr("#");
exports.splitQuery = beforeAfterSubstr("?");
exports.splitEqual = beforeAfterSubstr("=");
exports.trimHashVal = function (str) { return str ? str.replace(/^#/, "") : ""; };
exports.keyValsToObjectR = function (accum, _a) {
    var key = _a[0], val = _a[1];
    if (!accum.hasOwnProperty(key)) {
        accum[key] = val;
    }
    else if (index_1.isArray(accum[key])) {
        accum[key].push(val);
    }
    else {
        accum[key] = [accum[key], val];
    }
    return accum;
};
exports.getParams = function (queryString) {
    return queryString.split("&").filter(common_1.identity).map(exports.splitEqual).reduce(exports.keyValsToObjectR, {});
};
function parseUrl(url) {
    var orEmptyString = function (x) { return x || ""; };
    var _a = exports.splitHash(url).map(orEmptyString), beforehash = _a[0], hash = _a[1];
    var _b = exports.splitQuery(beforehash).map(orEmptyString), path = _b[0], search = _b[1];
    return { path: path, search: search, hash: hash, url: url };
}
exports.parseUrl = parseUrl;
exports.buildUrl = function (loc) {
    var path = loc.path();
    var searchObject = loc.search();
    var hash = loc.hash();
    var search = Object.keys(searchObject).map(function (key) {
        var param = searchObject[key];
        var vals = index_1.isArray(param) ? param : [param];
        return vals.map(function (val) { return key + "=" + val; });
    }).reduce(common_1.unnestR, []).join("&");
    return path + (search ? "?" + search : "") + (hash ? "#" + hash : "");
};
function locationPluginFactory(name, isHtml5, serviceClass, configurationClass) {
    return function (router) {
        var service = router.locationService = new serviceClass(router);
        var configuration = router.locationConfig = new configurationClass(router, isHtml5);
        function dispose(router) {
            router.dispose(service);
            router.dispose(configuration);
        }
        return { name: name, service: service, configuration: configuration, dispose: dispose };
    };
}
exports.locationPluginFactory = locationPluginFactory;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module core
 */
/**
 * Matches state names using glob-like pattern strings.
 *
 * Globs can be used in specific APIs including:
 *
 * - [[StateService.is]]
 * - [[StateService.includes]]
 * - The first argument to Hook Registration functions like [[TransitionService.onStart]]
 *    - [[HookMatchCriteria]] and [[HookMatchCriterion]]
 *
 * A `Glob` string is a pattern which matches state names.
 * Nested state names are split into segments (separated by a dot) when processing.
 * The state named `foo.bar.baz` is split into three segments ['foo', 'bar', 'baz']
 *
 * Globs work according to the following rules:
 *
 * ### Exact match:
 *
 * The glob `'A.B'` matches the state named exactly `'A.B'`.
 *
 * | Glob        |Matches states named|Does not match state named|
 * |:------------|:--------------------|:---------------------|
 * | `'A'`       | `'A'`               | `'B'` , `'A.C'`      |
 * | `'A.B'`     | `'A.B'`             | `'A'` , `'A.B.C'`    |
 * | `'foo'`     | `'foo'`             | `'FOO'` , `'foo.bar'`|
 *
 * ### Single star (`*`)
 *
 * A single star (`*`) is a wildcard that matches exactly one segment.
 *
 * | Glob        |Matches states named  |Does not match state named |
 * |:------------|:---------------------|:--------------------------|
 * | `'*'`       | `'A'` , `'Z'`        | `'A.B'` , `'Z.Y.X'`       |
 * | `'A.*'`     | `'A.B'` , `'A.C'`    | `'A'` , `'A.B.C'`         |
 * | `'A.*.*'`   | `'A.B.C'` , `'A.X.Y'`| `'A'`, `'A.B'` , `'Z.Y.X'`|
 *
 * ### Double star (`**`)
 *
 * A double star (`'**'`) is a wildcard that matches *zero or more segments*
 *
 * | Glob        |Matches states named                           |Does not match state named         |
 * |:------------|:----------------------------------------------|:----------------------------------|
 * | `'**'`      | `'A'` , `'A.B'`, `'Z.Y.X'`                    | (matches all states)              |
 * | `'A.**'`    | `'A'` , `'A.B'` , `'A.C.X'`                   | `'Z.Y.X'`                         |
 * | `'**.X'`    | `'X'` , `'A.X'` , `'Z.Y.X'`                   | `'A'` , `'A.login.Z'`             |
 * | `'A.**.X'`  | `'A.X'` , `'A.B.X'` , `'A.B.C.X'`             | `'A'` , `'A.B.C'`                 |
 *
 */
var Glob = (function () {
    function Glob(text) {
        this.text = text;
        this.glob = text.split('.');
        var regexpString = this.text.split('.')
            .map(function (seg) {
            if (seg === '**')
                return '(?:|(?:\\.[^.]*)*)';
            if (seg === '*')
                return '\\.[^.]*';
            return '\\.' + seg;
        }).join('');
        this.regexp = new RegExp("^" + regexpString + "$");
    }
    Glob.prototype.matches = function (name) {
        return this.regexp.test('.' + name);
    };
    /** Returns true if the string has glob-like characters in it */
    Glob.is = function (text) {
        return !!/[!,*]+/.exec(text);
    };
    /** Returns a glob from the string, or null if the string isn't Glob-like */
    Glob.fromString = function (text) {
        return Glob.is(text) ? new Glob(text) : null;
    };
    return Glob;
}());
exports.Glob = Glob;
//# sourceMappingURL=glob.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/** @module common */ /** for typedoc */
__export(__webpack_require__(0));
__export(__webpack_require__(4));
__export(__webpack_require__(17));
__export(__webpack_require__(2));
__export(__webpack_require__(1));
__export(__webpack_require__(25));
__export(__webpack_require__(7));
__export(__webpack_require__(8));
//# sourceMappingURL=index.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module path */ /** for typedoc */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var targetState_1 = __webpack_require__(9);
var pathNode_1 = __webpack_require__(27);
/**
 * This class contains functions which convert TargetStates, Nodes and paths from one type to another.
 */
var PathUtils = (function () {
    function PathUtils() {
    }
    /** Given a PathNode[], create an TargetState */
    PathUtils.makeTargetState = function (path) {
        var state = common_1.tail(path).state;
        return new targetState_1.TargetState(state, state, path.map(hof_1.prop("paramValues")).reduce(common_1.mergeR, {}));
    };
    PathUtils.buildPath = function (targetState) {
        var toParams = targetState.params();
        return targetState.$state().path.map(function (state) { return new pathNode_1.PathNode(state).applyRawParams(toParams); });
    };
    /** Given a fromPath: PathNode[] and a TargetState, builds a toPath: PathNode[] */
    PathUtils.buildToPath = function (fromPath, targetState) {
        var toPath = PathUtils.buildPath(targetState);
        if (targetState.options().inherit) {
            return PathUtils.inheritParams(fromPath, toPath, Object.keys(targetState.params()));
        }
        return toPath;
    };
    /**
     * Creates ViewConfig objects and adds to nodes.
     *
     * On each [[PathNode]], creates ViewConfig objects from the views: property of the node's state
     */
    PathUtils.applyViewConfigs = function ($view, path, states) {
        // Only apply the viewConfigs to the nodes for the given states
        path.filter(function (node) { return common_1.inArray(states, node.state); }).forEach(function (node) {
            var viewDecls = common_1.values(node.state.views || {});
            var subPath = PathUtils.subPath(path, function (n) { return n === node; });
            var viewConfigs = viewDecls.map(function (view) { return $view.createViewConfig(subPath, view); });
            node.views = viewConfigs.reduce(common_1.unnestR, []);
        });
    };
    /**
     * Given a fromPath and a toPath, returns a new to path which inherits parameters from the fromPath
     *
     * For a parameter in a node to be inherited from the from path:
     * - The toPath's node must have a matching node in the fromPath (by state).
     * - The parameter name must not be found in the toKeys parameter array.
     *
     * Note: the keys provided in toKeys are intended to be those param keys explicitly specified by some
     * caller, for instance, $state.transitionTo(..., toParams).  If a key was found in toParams,
     * it is not inherited from the fromPath.
     */
    PathUtils.inheritParams = function (fromPath, toPath, toKeys) {
        if (toKeys === void 0) { toKeys = []; }
        function nodeParamVals(path, state) {
            var node = common_1.find(path, hof_1.propEq('state', state));
            return common_1.extend({}, node && node.paramValues);
        }
        var noInherit = fromPath.map(function (node) { return node.paramSchema; })
            .reduce(common_1.unnestR, [])
            .filter(function (param) { return !param.inherit; })
            .map(hof_1.prop('id'));
        /**
         * Given an [[PathNode]] "toNode", return a new [[PathNode]] with param values inherited from the
         * matching node in fromPath.  Only inherit keys that aren't found in "toKeys" from the node in "fromPath""
         */
        function makeInheritedParamsNode(toNode) {
            // All param values for the node (may include default key/vals, when key was not found in toParams)
            var toParamVals = common_1.extend({}, toNode && toNode.paramValues);
            // limited to only those keys found in toParams
            var incomingParamVals = common_1.pick(toParamVals, toKeys);
            toParamVals = common_1.omit(toParamVals, toKeys);
            var fromParamVals = common_1.omit(nodeParamVals(fromPath, toNode.state) || {}, noInherit);
            // extend toParamVals with any fromParamVals, then override any of those those with incomingParamVals
            var ownParamVals = common_1.extend(toParamVals, fromParamVals, incomingParamVals);
            return new pathNode_1.PathNode(toNode.state).applyRawParams(ownParamVals);
        }
        // The param keys specified by the incoming toParams
        return toPath.map(makeInheritedParamsNode);
    };
    /**
     * Computes the tree changes (entering, exiting) between a fromPath and toPath.
     */
    PathUtils.treeChanges = function (fromPath, toPath, reloadState) {
        var keep = 0, max = Math.min(fromPath.length, toPath.length);
        var nodesMatch = function (node1, node2) {
            return node1.equals(node2, PathUtils.nonDynamicParams);
        };
        while (keep < max && fromPath[keep].state !== reloadState && nodesMatch(fromPath[keep], toPath[keep])) {
            keep++;
        }
        /** Given a retained node, return a new node which uses the to node's param values */
        function applyToParams(retainedNode, idx) {
            var cloned = pathNode_1.PathNode.clone(retainedNode);
            cloned.paramValues = toPath[idx].paramValues;
            return cloned;
        }
        var from, retained, exiting, entering, to;
        from = fromPath;
        retained = from.slice(0, keep);
        exiting = from.slice(keep);
        // Create a new retained path (with shallow copies of nodes) which have the params of the toPath mapped
        var retainedWithToParams = retained.map(applyToParams);
        entering = toPath.slice(keep);
        to = (retainedWithToParams).concat(entering);
        return { from: from, to: to, retained: retained, exiting: exiting, entering: entering };
    };
    /**
     * Returns a new path which is: the subpath of the first path which matches the second path.
     *
     * The new path starts from root and contains any nodes that match the nodes in the second path.
     * It stops before the first non-matching node.
     *
     * Nodes are compared using their state property and their parameter values.
     * If a `paramsFn` is provided, only the [[Param]] returned by the function will be considered when comparing nodes.
     *
     * @param pathA the first path
     * @param pathB the second path
     * @param paramsFn a function which returns the parameters to consider when comparing
     *
     * @returns an array of PathNodes from the first path which match the nodes in the second path
     */
    PathUtils.matching = function (pathA, pathB, paramsFn) {
        var done = false;
        var tuples = common_1.arrayTuples(pathA, pathB);
        return tuples.reduce(function (matching, _a) {
            var nodeA = _a[0], nodeB = _a[1];
            done = done || !nodeA.equals(nodeB, paramsFn);
            return done ? matching : matching.concat(nodeA);
        }, []);
    };
    /**
     * Returns true if two paths are identical.
     *
     * @param pathA
     * @param pathB
     * @param paramsFn a function which returns the parameters to consider when comparing
     * @returns true if the the states and parameter values for both paths are identical
     */
    PathUtils.equals = function (pathA, pathB, paramsFn) {
        return pathA.length === pathB.length &&
            PathUtils.matching(pathA, pathB, paramsFn).length === pathA.length;
    };
    /**
     * Return a subpath of a path, which stops at the first matching node
     *
     * Given an array of nodes, returns a subset of the array starting from the first node,
     * stopping when the first node matches the predicate.
     *
     * @param path a path of [[PathNode]]s
     * @param predicate a [[Predicate]] fn that matches [[PathNode]]s
     * @returns a subpath up to the matching node, or undefined if no match is found
     */
    PathUtils.subPath = function (path, predicate) {
        var node = common_1.find(path, predicate);
        var elementIdx = path.indexOf(node);
        return elementIdx === -1 ? undefined : path.slice(0, elementIdx + 1);
    };
    return PathUtils;
}());
PathUtils.nonDynamicParams = function (node) {
    return node.state.parameters({ inherit: false })
        .filter(function (param) { return !param.dynamic; });
};
/** Gets the raw parameter values from a path */
PathUtils.paramValues = function (path) {
    return path.reduce(function (acc, node) { return common_1.extend(acc, node.paramValues); }, {});
};
exports.PathUtils = PathUtils;
//# sourceMappingURL=pathFactory.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module resolve */
/** for typedoc */
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var trace_1 = __webpack_require__(8);
var coreservices_1 = __webpack_require__(4);
var interface_1 = __webpack_require__(39);
var resolvable_1 = __webpack_require__(13);
var pathFactory_1 = __webpack_require__(19);
var strings_1 = __webpack_require__(7);
var when = interface_1.resolvePolicies.when;
var ALL_WHENS = [when.EAGER, when.LAZY];
var EAGER_WHENS = [when.EAGER];
exports.NATIVE_INJECTOR_TOKEN = "Native Injector";
/**
 * Encapsulates Dependency Injection for a path of nodes
 *
 * UI-Router states are organized as a tree.
 * A nested state has a path of ancestors to the root of the tree.
 * When a state is being activated, each element in the path is wrapped as a [[PathNode]].
 * A `PathNode` is a stateful object that holds things like parameters and resolvables for the state being activated.
 *
 * The ResolveContext closes over the [[PathNode]]s, and provides DI for the last node in the path.
 */
var ResolveContext = (function () {
    function ResolveContext(_path) {
        this._path = _path;
    }
    /** Gets all the tokens found in the resolve context, de-duplicated */
    ResolveContext.prototype.getTokens = function () {
        return this._path.reduce(function (acc, node) { return acc.concat(node.resolvables.map(function (r) { return r.token; })); }, []).reduce(common_1.uniqR, []);
    };
    /**
     * Gets the Resolvable that matches the token
     *
     * Gets the last Resolvable that matches the token in this context, or undefined.
     * Throws an error if it doesn't exist in the ResolveContext
     */
    ResolveContext.prototype.getResolvable = function (token) {
        var matching = this._path.map(function (node) { return node.resolvables; })
            .reduce(common_1.unnestR, [])
            .filter(function (r) { return r.token === token; });
        return common_1.tail(matching);
    };
    /** Returns the [[ResolvePolicy]] for the given [[Resolvable]] */
    ResolveContext.prototype.getPolicy = function (resolvable) {
        var node = this.findNode(resolvable);
        return resolvable.getPolicy(node.state);
    };
    /**
     * Returns a ResolveContext that includes a portion of this one
     *
     * Given a state, this method creates a new ResolveContext from this one.
     * The new context starts at the first node (root) and stops at the node for the `state` parameter.
     *
     * #### Why
     *
     * When a transition is created, the nodes in the "To Path" are injected from a ResolveContext.
     * A ResolveContext closes over a path of [[PathNode]]s and processes the resolvables.
     * The "To State" can inject values from its own resolvables, as well as those from all its ancestor state's (node's).
     * This method is used to create a narrower context when injecting ancestor nodes.
     *
     * @example
     * `let ABCD = new ResolveContext([A, B, C, D]);`
     *
     * Given a path `[A, B, C, D]`, where `A`, `B`, `C` and `D` are nodes for states `a`, `b`, `c`, `d`:
     * When injecting `D`, `D` should have access to all resolvables from `A`, `B`, `C`, `D`.
     * However, `B` should only be able to access resolvables from `A`, `B`.
     *
     * When resolving for the `B` node, first take the full "To Path" Context `[A,B,C,D]` and limit to the subpath `[A,B]`.
     * `let AB = ABCD.subcontext(a)`
     */
    ResolveContext.prototype.subContext = function (state) {
        return new ResolveContext(pathFactory_1.PathUtils.subPath(this._path, function (node) { return node.state === state; }));
    };
    /**
     * Adds Resolvables to the node that matches the state
     *
     * This adds a [[Resolvable]] (generally one created on the fly; not declared on a [[StateDeclaration.resolve]] block).
     * The resolvable is added to the node matching the `state` parameter.
     *
     * These new resolvables are not automatically fetched.
     * The calling code should either fetch them, fetch something that depends on them,
     * or rely on [[resolvePath]] being called when some state is being entered.
     *
     * Note: each resolvable's [[ResolvePolicy]] is merged with the state's policy, and the global default.
     *
     * @param newResolvables the new Resolvables
     * @param state Used to find the node to put the resolvable on
     */
    ResolveContext.prototype.addResolvables = function (newResolvables, state) {
        var node = common_1.find(this._path, hof_1.propEq('state', state));
        var keys = newResolvables.map(function (r) { return r.token; });
        node.resolvables = node.resolvables.filter(function (r) { return keys.indexOf(r.token) === -1; }).concat(newResolvables);
    };
    /**
     * Returns a promise for an array of resolved path Element promises
     *
     * @param when
     * @param trans
     * @returns {Promise<any>|any}
     */
    ResolveContext.prototype.resolvePath = function (when, trans) {
        var _this = this;
        if (when === void 0) { when = "LAZY"; }
        // This option determines which 'when' policy Resolvables we are about to fetch.
        var whenOption = common_1.inArray(ALL_WHENS, when) ? when : "LAZY";
        // If the caller specified EAGER, only the EAGER Resolvables are fetched.
        // if the caller specified LAZY, both EAGER and LAZY Resolvables are fetched.`
        var matchedWhens = whenOption === interface_1.resolvePolicies.when.EAGER ? EAGER_WHENS : ALL_WHENS;
        // get the subpath to the state argument, if provided
        trace_1.trace.traceResolvePath(this._path, when, trans);
        var matchesPolicy = function (acceptedVals, whenOrAsync) {
            return function (resolvable) {
                return common_1.inArray(acceptedVals, _this.getPolicy(resolvable)[whenOrAsync]);
            };
        };
        // Trigger all the (matching) Resolvables in the path
        // Reduce all the "WAIT" Resolvables into an array
        var promises = this._path.reduce(function (acc, node) {
            var nodeResolvables = node.resolvables.filter(matchesPolicy(matchedWhens, 'when'));
            var nowait = nodeResolvables.filter(matchesPolicy(['NOWAIT'], 'async'));
            var wait = nodeResolvables.filter(hof_1.not(matchesPolicy(['NOWAIT'], 'async')));
            // For the matching Resolvables, start their async fetch process.
            var subContext = _this.subContext(node.state);
            var getResult = function (r) { return r.get(subContext, trans)
                .then(function (value) { return ({ token: r.token, value: value }); }); };
            nowait.forEach(getResult);
            return acc.concat(wait.map(getResult));
        }, []);
        // Wait for all the "WAIT" resolvables
        return coreservices_1.services.$q.all(promises);
    };
    ResolveContext.prototype.injector = function () {
        return this._injector || (this._injector = new UIInjectorImpl(this));
    };
    ResolveContext.prototype.findNode = function (resolvable) {
        return common_1.find(this._path, function (node) { return common_1.inArray(node.resolvables, resolvable); });
    };
    /**
     * Gets the async dependencies of a Resolvable
     *
     * Given a Resolvable, returns its dependencies as a Resolvable[]
     */
    ResolveContext.prototype.getDependencies = function (resolvable) {
        var _this = this;
        var node = this.findNode(resolvable);
        // Find which other resolvables are "visible" to the `resolvable` argument
        // subpath stopping at resolvable's node, or the whole path (if the resolvable isn't in the path)
        var subPath = pathFactory_1.PathUtils.subPath(this._path, function (x) { return x === node; }) || this._path;
        var availableResolvables = subPath
            .reduce(function (acc, node) { return acc.concat(node.resolvables); }, []) //all of subpath's resolvables
            .filter(function (res) { return res !== resolvable; }); // filter out the `resolvable` argument
        var getDependency = function (token) {
            var matching = availableResolvables.filter(function (r) { return r.token === token; });
            if (matching.length)
                return common_1.tail(matching);
            var fromInjector = _this.injector().getNative(token);
            if (!fromInjector) {
                throw new Error("Could not find Dependency Injection token: " + strings_1.stringify(token));
            }
            return new resolvable_1.Resolvable(token, function () { return fromInjector; }, [], fromInjector);
        };
        return resolvable.deps.map(getDependency);
    };
    return ResolveContext;
}());
exports.ResolveContext = ResolveContext;
var UIInjectorImpl = (function () {
    function UIInjectorImpl(context) {
        this.context = context;
        this.native = this.get(exports.NATIVE_INJECTOR_TOKEN) || coreservices_1.services.$injector;
    }
    UIInjectorImpl.prototype.get = function (token) {
        var resolvable = this.context.getResolvable(token);
        if (resolvable) {
            if (this.context.getPolicy(resolvable).async === 'NOWAIT') {
                return resolvable.get(this.context);
            }
            if (!resolvable.resolved) {
                throw new Error("Resolvable async .get() not complete:" + strings_1.stringify(resolvable.token));
            }
            return resolvable.data;
        }
        return this.native && this.native.get(token);
    };
    UIInjectorImpl.prototype.getAsync = function (token) {
        var resolvable = this.context.getResolvable(token);
        if (resolvable)
            return resolvable.get(this.context);
        return coreservices_1.services.$q.when(this.native.get(token));
    };
    UIInjectorImpl.prototype.getNative = function (token) {
        return this.native && this.native.get(token);
    };
    return UIInjectorImpl;
}());
//# sourceMappingURL=resolveContext.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module transition
 */
/** for typedoc */
var trace_1 = __webpack_require__(8);
var coreservices_1 = __webpack_require__(4);
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var hof_1 = __webpack_require__(2);
var interface_1 = __webpack_require__(11); // has or is using
var transitionHook_1 = __webpack_require__(15);
var hookRegistry_1 = __webpack_require__(29);
var hookBuilder_1 = __webpack_require__(46);
var pathFactory_1 = __webpack_require__(19);
var targetState_1 = __webpack_require__(9);
var param_1 = __webpack_require__(10);
var resolvable_1 = __webpack_require__(13);
var resolveContext_1 = __webpack_require__(20);
/** @hidden */
var stateSelf = hof_1.prop("self");
/**
 * Represents a transition between two states.
 *
 * When navigating to a state, we are transitioning **from** the current state **to** the new state.
 *
 * This object contains all contextual information about the to/from states, parameters, resolves.
 * It has information about all states being entered and exited as a result of the transition.
 */
var Transition = (function () {
    /**
     * Creates a new Transition object.
     *
     * If the target state is not valid, an error is thrown.
     *
     * @internalapi
     *
     * @param fromPath The path of [[PathNode]]s from which the transition is leaving.  The last node in the `fromPath`
     *        encapsulates the "from state".
     * @param targetState The target state and parameters being transitioned to (also, the transition options)
     * @param router The [[UIRouter]] instance
     */
    function Transition(fromPath, targetState, router) {
        var _this = this;
        /** @hidden */
        this._deferred = coreservices_1.services.$q.defer();
        /**
         * This promise is resolved or rejected based on the outcome of the Transition.
         *
         * When the transition is successful, the promise is resolved
         * When the transition is unsuccessful, the promise is rejected with the [[Rejection]] or javascript error
         */
        this.promise = this._deferred.promise;
        /** @hidden Holds the hook registration functions such as those passed to Transition.onStart() */
        this._registeredHooks = {};
        /** @hidden */
        this._hookBuilder = new hookBuilder_1.HookBuilder(this);
        /** Checks if this transition is currently active/running. */
        this.isActive = function () {
            return _this.router.globals.transition === _this;
        };
        this.router = router;
        this._targetState = targetState;
        if (!targetState.valid()) {
            throw new Error(targetState.error());
        }
        // current() is assumed to come from targetState.options, but provide a naive implementation otherwise.
        this._options = common_1.extend({ current: hof_1.val(this) }, targetState.options());
        this.$id = router.transitionService._transitionCount++;
        var toPath = pathFactory_1.PathUtils.buildToPath(fromPath, targetState);
        this._treeChanges = pathFactory_1.PathUtils.treeChanges(fromPath, toPath, this._options.reloadState);
        this.createTransitionHookRegFns();
        var onCreateHooks = this._hookBuilder.buildHooksForPhase(interface_1.TransitionHookPhase.CREATE);
        transitionHook_1.TransitionHook.invokeHooks(onCreateHooks, function () { return null; });
        this.applyViewConfigs(router);
    }
    /** @hidden */
    Transition.prototype.onBefore = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    Transition.prototype.onStart = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    Transition.prototype.onExit = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    Transition.prototype.onRetain = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    Transition.prototype.onEnter = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    Transition.prototype.onFinish = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    Transition.prototype.onSuccess = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    Transition.prototype.onError = function (criteria, callback, options) { return; };
    /** @hidden
     * Creates the transition-level hook registration functions
     * (which can then be used to register hooks)
     */
    Transition.prototype.createTransitionHookRegFns = function () {
        var _this = this;
        this.router.transitionService._pluginapi._getEvents()
            .filter(function (type) { return type.hookPhase !== interface_1.TransitionHookPhase.CREATE; })
            .forEach(function (type) { return hookRegistry_1.makeEvent(_this, _this.router.transitionService, type); });
    };
    /** @internalapi */
    Transition.prototype.getHooks = function (hookName) {
        return this._registeredHooks[hookName];
    };
    Transition.prototype.applyViewConfigs = function (router) {
        var enteringStates = this._treeChanges.entering.map(function (node) { return node.state; });
        pathFactory_1.PathUtils.applyViewConfigs(router.transitionService.$view, this._treeChanges.to, enteringStates);
    };
    /**
     * @internalapi
     *
     * @returns the internal from [State] object
     */
    Transition.prototype.$from = function () {
        return common_1.tail(this._treeChanges.from).state;
    };
    /**
     * @internalapi
     *
     * @returns the internal to [State] object
     */
    Transition.prototype.$to = function () {
        return common_1.tail(this._treeChanges.to).state;
    };
    /**
     * Returns the "from state"
     *
     * Returns the state that the transition is coming *from*.
     *
     * @returns The state declaration object for the Transition's ("from state").
     */
    Transition.prototype.from = function () {
        return this.$from().self;
    };
    /**
     * Returns the "to state"
     *
     * Returns the state that the transition is going *to*.
     *
     * @returns The state declaration object for the Transition's target state ("to state").
     */
    Transition.prototype.to = function () {
        return this.$to().self;
    };
    /**
     * Gets the Target State
     *
     * A transition's [[TargetState]] encapsulates the [[to]] state, the [[params]], and the [[options]] as a single object.
     *
     * @returns the [[TargetState]] of this Transition
     */
    Transition.prototype.targetState = function () {
        return this._targetState;
    };
    /**
     * Determines whether two transitions are equivalent.
     * @deprecated
     */
    Transition.prototype.is = function (compare) {
        if (compare instanceof Transition) {
            // TODO: Also compare parameters
            return this.is({ to: compare.$to().name, from: compare.$from().name });
        }
        return !((compare.to && !hookRegistry_1.matchState(this.$to(), compare.to)) ||
            (compare.from && !hookRegistry_1.matchState(this.$from(), compare.from)));
    };
    Transition.prototype.params = function (pathname) {
        if (pathname === void 0) { pathname = "to"; }
        return Object.freeze(this._treeChanges[pathname].map(hof_1.prop("paramValues")).reduce(common_1.mergeR, {}));
    };
    /**
     * Creates a [[UIInjector]] Dependency Injector
     *
     * Returns a Dependency Injector for the Transition's target state (to state).
     * The injector provides resolve values which the target state has access to.
     *
     * The `UIInjector` can also provide values from the native root/global injector (ng1/ng2).
     *
     * #### Example:
     * ```js
     * .onEnter({ entering: 'myState' }, trans => {
     *   var myResolveValue = trans.injector().get('myResolve');
     *   // Inject a global service from the global/native injector (if it exists)
     *   var MyService = trans.injector().get('MyService');
     * })
     * ```
     *
     * In some cases (such as `onBefore`), you may need access to some resolve data but it has not yet been fetched.
     * You can use [[UIInjector.getAsync]] to get a promise for the data.
     * #### Example:
     * ```js
     * .onBefore({}, trans => {
     *   return trans.injector().getAsync('myResolve').then(myResolveValue =>
     *     return myResolveValue !== 'ABORT';
     *   });
     * });
     * ```
     *
     * If a `state` is provided, the injector that is returned will be limited to resolve values that the provided state has access to.
     * This can be useful if both a parent state `foo` and a child state `foo.bar` have both defined a resolve such as `data`.
     * #### Example:
     * ```js
     * .onEnter({ to: 'foo.bar' }, trans => {
     *   // returns result of `foo` state's `data` resolve
     *   // even though `foo.bar` also has a `data` resolve
     *   var fooData = trans.injector('foo').get('data');
     * });
     * ```
     *
     * If you need resolve data from the exiting states, pass `'from'` as `pathName`.
     * The resolve data from the `from` path will be returned.
     * #### Example:
     * ```js
     * .onExit({ exiting: 'foo.bar' }, trans => {
     *   // Gets the resolve value of `data` from the exiting state.
     *   var fooData = trans.injector(null, 'foo.bar').get('data');
     * });
     * ```
     *
     *
     * @param state Limits the resolves provided to only the resolves the provided state has access to.
     * @param pathName Default: `'to'`: Chooses the path for which to create the injector. Use this to access resolves for `exiting` states.
     *
     * @returns a [[UIInjector]]
     */
    Transition.prototype.injector = function (state, pathName) {
        if (pathName === void 0) { pathName = "to"; }
        var path = this._treeChanges[pathName];
        if (state)
            path = pathFactory_1.PathUtils.subPath(path, function (node) { return node.state === state || node.state.name === state; });
        return new resolveContext_1.ResolveContext(path).injector();
    };
    /**
     * Gets all available resolve tokens (keys)
     *
     * This method can be used in conjunction with [[injector]] to inspect the resolve values
     * available to the Transition.
     *
     * This returns all the tokens defined on [[StateDeclaration.resolve]] blocks, for the states
     * in the Transition's [[TreeChanges.to]] path.
     *
     * #### Example:
     * This example logs all resolve values
     * ```js
     * let tokens = trans.getResolveTokens();
     * tokens.forEach(token => console.log(token + " = " + trans.injector().get(token)));
     * ```
     *
     * #### Example:
     * This example creates promises for each resolve value.
     * This triggers fetches of resolves (if any have not yet been fetched).
     * When all promises have all settled, it logs the resolve values.
     * ```js
     * let tokens = trans.getResolveTokens();
     * let promise = tokens.map(token => trans.injector().getAsync(token));
     * Promise.all(promises).then(values => console.log("Resolved values: " + values));
     * ```
     *
     * Note: Angular 1 users whould use `$q.all()`
     *
     * @param pathname resolve context's path name (e.g., `to` or `from`)
     *
     * @returns an array of resolve tokens (keys)
     */
    Transition.prototype.getResolveTokens = function (pathname) {
        if (pathname === void 0) { pathname = "to"; }
        return new resolveContext_1.ResolveContext(this._treeChanges[pathname]).getTokens();
    };
    /**
     * Dynamically adds a new [[Resolvable]] (i.e., [[StateDeclaration.resolve]]) to this transition.
     *
     * #### Example:
     * ```js
     * transitionService.onBefore({}, transition => {
     *   transition.addResolvable({
     *     token: 'myResolve',
     *     deps: ['MyService'],
     *     resolveFn: myService => myService.getData()
     *   });
     * });
     * ```
     *
     * @param resolvable a [[ResolvableLiteral]] object (or a [[Resolvable]])
     * @param state the state in the "to path" which should receive the new resolve (otherwise, the root state)
     */
    Transition.prototype.addResolvable = function (resolvable, state) {
        if (state === void 0) { state = ""; }
        resolvable = hof_1.is(resolvable_1.Resolvable)(resolvable) ? resolvable : new resolvable_1.Resolvable(resolvable);
        var stateName = (typeof state === "string") ? state : state.name;
        var topath = this._treeChanges.to;
        var targetNode = common_1.find(topath, function (node) { return node.state.name === stateName; });
        var resolveContext = new resolveContext_1.ResolveContext(topath);
        resolveContext.addResolvables([resolvable], targetNode.state);
    };
    /**
     * Gets the transition from which this transition was redirected.
     *
     * If the current transition is a redirect, this method returns the transition that was redirected.
     *
     * #### Example:
     * ```js
     * let transitionA = $state.go('A').transition
     * transitionA.onStart({}, () => $state.target('B'));
     * $transitions.onSuccess({ to: 'B' }, (trans) => {
     *   trans.to().name === 'B'; // true
     *   trans.redirectedFrom() === transitionA; // true
     * });
     * ```
     *
     * @returns The previous Transition, or null if this Transition is not the result of a redirection
     */
    Transition.prototype.redirectedFrom = function () {
        return this._options.redirectedFrom || null;
    };
    /**
     * Gets the original transition in a redirect chain
     *
     * A transition might belong to a long chain of multiple redirects.
     * This method walks the [[redirectedFrom]] chain back to the original (first) transition in the chain.
     *
     * #### Example:
     * ```js
     * // states
     * registry.register({ name: 'A', redirectTo: 'B' });
     * registry.register({ name: 'B', redirectTo: 'C' });
     * registry.register({ name: 'C', redirectTo: 'D' });
     * registry.register({ name: 'D' });
     *
     * let transitionA = $state.go('A').transition
     *
     * $transitions.onSuccess({ to: 'D' }, (trans) => {
     *   trans.to().name === 'D'; // true
     *   trans.redirectedFrom().to().name === 'C'; // true
     *   trans.originalTransition() === transitionA; // true
     *   trans.originalTransition().to().name === 'A'; // true
     * });
     * ```
     *
     * @returns The original Transition that started a redirect chain
     */
    Transition.prototype.originalTransition = function () {
        var rf = this.redirectedFrom();
        return (rf && rf.originalTransition()) || this;
    };
    /**
     * Get the transition options
     *
     * @returns the options for this Transition.
     */
    Transition.prototype.options = function () {
        return this._options;
    };
    /**
     * Gets the states being entered.
     *
     * @returns an array of states that will be entered during this transition.
     */
    Transition.prototype.entering = function () {
        return common_1.map(this._treeChanges.entering, hof_1.prop('state')).map(stateSelf);
    };
    /**
     * Gets the states being exited.
     *
     * @returns an array of states that will be exited during this transition.
     */
    Transition.prototype.exiting = function () {
        return common_1.map(this._treeChanges.exiting, hof_1.prop('state')).map(stateSelf).reverse();
    };
    /**
     * Gets the states being retained.
     *
     * @returns an array of states that are already entered from a previous Transition, that will not be
     *    exited during this Transition
     */
    Transition.prototype.retained = function () {
        return common_1.map(this._treeChanges.retained, hof_1.prop('state')).map(stateSelf);
    };
    /**
     * Get the [[ViewConfig]]s associated with this Transition
     *
     * Each state can define one or more views (template/controller), which are encapsulated as `ViewConfig` objects.
     * This method fetches the `ViewConfigs` for a given path in the Transition (e.g., "to" or "entering").
     *
     * @param pathname the name of the path to fetch views for:
     *   (`'to'`, `'from'`, `'entering'`, `'exiting'`, `'retained'`)
     * @param state If provided, only returns the `ViewConfig`s for a single state in the path
     *
     * @returns a list of ViewConfig objects for the given path.
     */
    Transition.prototype.views = function (pathname, state) {
        if (pathname === void 0) { pathname = "entering"; }
        var path = this._treeChanges[pathname];
        path = !state ? path : path.filter(hof_1.propEq('state', state));
        return path.map(hof_1.prop("views")).filter(common_1.identity).reduce(common_1.unnestR, []);
    };
    Transition.prototype.treeChanges = function (pathname) {
        return pathname ? this._treeChanges[pathname] : this._treeChanges;
    };
    /**
     * Creates a new transition that is a redirection of the current one.
     *
     * This transition can be returned from a [[TransitionService]] hook to
     * redirect a transition to a new state and/or set of parameters.
     *
     * @internalapi
     *
     * @returns Returns a new [[Transition]] instance.
     */
    Transition.prototype.redirect = function (targetState) {
        var redirects = 1, trans = this;
        while ((trans = trans.redirectedFrom()) != null) {
            if (++redirects > 20)
                throw new Error("Too many consecutive Transition redirects (20+)");
        }
        var redirectOpts = { redirectedFrom: this, source: "redirect" };
        // If the original transition was caused by URL sync, then use { location: 'replace' }
        // on the new transition (unless the target state explicitly specifies location: false).
        // This causes the original url to be replaced with the url for the redirect target
        // so the original url disappears from the browser history.
        if (this.options().source === 'url' && targetState.options().location !== false) {
            redirectOpts.location = 'replace';
        }
        var newOptions = common_1.extend({}, this.options(), targetState.options(), redirectOpts);
        targetState = new targetState_1.TargetState(targetState.identifier(), targetState.$state(), targetState.params(), newOptions);
        var newTransition = this.router.transitionService.create(this._treeChanges.from, targetState);
        var originalEnteringNodes = this._treeChanges.entering;
        var redirectEnteringNodes = newTransition._treeChanges.entering;
        // --- Re-use resolve data from original transition ---
        // When redirecting from a parent state to a child state where the parent parameter values haven't changed
        // (because of the redirect), the resolves fetched by the original transition are still valid in the
        // redirected transition.
        //
        // This allows you to define a redirect on a parent state which depends on an async resolve value.
        // You can wait for the resolve, then redirect to a child state based on the result.
        // The redirected transition does not have to re-fetch the resolve.
        // ---------------------------------------------------------
        var nodeIsReloading = function (reloadState) { return function (node) {
            return reloadState && node.state.includes[reloadState.name];
        }; };
        // Find any "entering" nodes in the redirect path that match the original path and aren't being reloaded
        var matchingEnteringNodes = pathFactory_1.PathUtils.matching(redirectEnteringNodes, originalEnteringNodes, pathFactory_1.PathUtils.nonDynamicParams)
            .filter(hof_1.not(nodeIsReloading(targetState.options().reloadState)));
        // Use the existing (possibly pre-resolved) resolvables for the matching entering nodes.
        matchingEnteringNodes.forEach(function (node, idx) {
            node.resolvables = originalEnteringNodes[idx].resolvables;
        });
        return newTransition;
    };
    /** @hidden If a transition doesn't exit/enter any states, returns any [[Param]] whose value changed */
    Transition.prototype._changedParams = function () {
        var tc = this._treeChanges;
        /** Return undefined if it's not a "dynamic" transition, for the following reasons */
        // If user explicitly wants a reload
        if (this._options.reload)
            return undefined;
        // If any states are exiting or entering
        if (tc.exiting.length || tc.entering.length)
            return undefined;
        // If to/from path lengths differ
        if (tc.to.length !== tc.from.length)
            return undefined;
        // If the to/from paths are different
        var pathsDiffer = common_1.arrayTuples(tc.to, tc.from)
            .map(function (tuple) { return tuple[0].state !== tuple[1].state; })
            .reduce(common_1.anyTrueR, false);
        if (pathsDiffer)
            return undefined;
        // Find any parameter values that differ
        var nodeSchemas = tc.to.map(function (node) { return node.paramSchema; });
        var _a = [tc.to, tc.from].map(function (path) { return path.map(function (x) { return x.paramValues; }); }), toValues = _a[0], fromValues = _a[1];
        var tuples = common_1.arrayTuples(nodeSchemas, toValues, fromValues);
        return tuples.map(function (_a) {
            var schema = _a[0], toVals = _a[1], fromVals = _a[2];
            return param_1.Param.changed(schema, toVals, fromVals);
        }).reduce(common_1.unnestR, []);
    };
    /**
     * Returns true if the transition is dynamic.
     *
     * A transition is dynamic if no states are entered nor exited, but at least one dynamic parameter has changed.
     *
     * @returns true if the Transition is dynamic
     */
    Transition.prototype.dynamic = function () {
        var changes = this._changedParams();
        return !changes ? false : changes.map(function (x) { return x.dynamic; }).reduce(common_1.anyTrueR, false);
    };
    /**
     * Returns true if the transition is ignored.
     *
     * A transition is ignored if no states are entered nor exited, and no parameter values have changed.
     *
     * @returns true if the Transition is ignored.
     */
    Transition.prototype.ignored = function () {
        return !!this._ignoredReason();
    };
    /** @hidden */
    Transition.prototype._ignoredReason = function () {
        var pending = this.router.globals.transition;
        var reloadState = this._options.reloadState;
        var same = function (pathA, pathB) {
            if (pathA.length !== pathB.length)
                return false;
            var matching = pathFactory_1.PathUtils.matching(pathA, pathB);
            return pathA.length === matching.filter(function (node) { return !reloadState || !node.state.includes[reloadState.name]; }).length;
        };
        var newTC = this.treeChanges();
        var pendTC = pending && pending.treeChanges();
        if (pendTC && same(pendTC.to, newTC.to) && same(pendTC.exiting, newTC.exiting))
            return "SameAsPending";
        if (newTC.exiting.length === 0 && newTC.entering.length === 0 && same(newTC.from, newTC.to))
            return "SameAsCurrent";
    };
    /**
     * Runs the transition
     *
     * This method is generally called from the [[StateService.transitionTo]]
     *
     * @internalapi
     *
     * @returns a promise for a successful transition.
     */
    Transition.prototype.run = function () {
        var _this = this;
        var runAllHooks = transitionHook_1.TransitionHook.runAllHooks;
        // Gets transition hooks array for the given phase
        var getHooksFor = function (phase) {
            return _this._hookBuilder.buildHooksForPhase(phase);
        };
        // When the chain is complete, then resolve or reject the deferred
        var transitionSuccess = function () {
            trace_1.trace.traceSuccess(_this.$to(), _this);
            _this.success = true;
            _this._deferred.resolve(_this.to());
            runAllHooks(getHooksFor(interface_1.TransitionHookPhase.SUCCESS));
        };
        var transitionError = function (reason) {
            trace_1.trace.traceError(reason, _this);
            _this.success = false;
            _this._deferred.reject(reason);
            _this._error = reason;
            runAllHooks(getHooksFor(interface_1.TransitionHookPhase.ERROR));
        };
        var runTransition = function () {
            // Wait to build the RUN hook chain until the BEFORE hooks are done
            // This allows a BEFORE hook to dynamically add additional RUN hooks via the Transition object.
            var allRunHooks = getHooksFor(interface_1.TransitionHookPhase.RUN);
            var done = function () { return coreservices_1.services.$q.when(undefined); };
            return transitionHook_1.TransitionHook.invokeHooks(allRunHooks, done);
        };
        var startTransition = function () {
            var globals = _this.router.globals;
            globals.lastStartedTransitionId = _this.$id;
            globals.transition = _this;
            globals.transitionHistory.enqueue(_this);
            trace_1.trace.traceTransitionStart(_this);
            return coreservices_1.services.$q.when(undefined);
        };
        var allBeforeHooks = getHooksFor(interface_1.TransitionHookPhase.BEFORE);
        transitionHook_1.TransitionHook.invokeHooks(allBeforeHooks, startTransition)
            .then(runTransition)
            .then(transitionSuccess, transitionError);
        return this.promise;
    };
    /**
     * Checks if the Transition is valid
     *
     * @returns true if the Transition is valid
     */
    Transition.prototype.valid = function () {
        return !this.error() || this.success !== undefined;
    };
    /**
     * Aborts this transition
     *
     * Imperative API to abort a Transition.
     * This only applies to Transitions that are not yet complete.
     */
    Transition.prototype.abort = function () {
        // Do not set flag if the transition is already complete
        if (predicates_1.isUndefined(this.success)) {
            this._aborted = true;
        }
    };
    /**
     * The Transition error reason.
     *
     * If the transition is invalid (and could not be run), returns the reason the transition is invalid.
     * If the transition was valid and ran, but was not successful, returns the reason the transition failed.
     *
     * @returns an error message explaining why the transition is invalid, or the reason the transition failed.
     */
    Transition.prototype.error = function () {
        var state = this.$to();
        if (state.self.abstract)
            return "Cannot transition to abstract state '" + state.name + "'";
        if (!param_1.Param.validates(state.parameters(), this.params()))
            return "Param values not valid for state '" + state.name + "'";
        if (this.success === false)
            return this._error;
    };
    /**
     * A string representation of the Transition
     *
     * @returns A string representation of the Transition
     */
    Transition.prototype.toString = function () {
        var fromStateOrName = this.from();
        var toStateOrName = this.to();
        var avoidEmptyHash = function (params) {
            return (params["#"] !== null && params["#"] !== undefined) ? params : common_1.omit(params, ["#"]);
        };
        // (X) means the to state is invalid.
        var id = this.$id, from = predicates_1.isObject(fromStateOrName) ? fromStateOrName.name : fromStateOrName, fromParams = common_1.toJson(avoidEmptyHash(this._treeChanges.from.map(hof_1.prop('paramValues')).reduce(common_1.mergeR, {}))), toValid = this.valid() ? "" : "(X) ", to = predicates_1.isObject(toStateOrName) ? toStateOrName.name : toStateOrName, toParams = common_1.toJson(avoidEmptyHash(this.params()));
        return "Transition#" + id + "( '" + from + "'" + fromParams + " -> " + toValid + "'" + to + "'" + toParams + " )";
    };
    return Transition;
}());
/** @hidden */
Transition.diToken = Transition;
exports.Transition = Transition;
//# sourceMappingURL=transition.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module url
 */
/** for typedoc */
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var predicates_1 = __webpack_require__(1);
var param_1 = __webpack_require__(10);
var strings_1 = __webpack_require__(7);
/** @hidden */
function quoteRegExp(string, param) {
    var surroundPattern = ['', ''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
    if (!param)
        return result;
    switch (param.squash) {
        case false:
            surroundPattern = ['(', ')' + (param.isOptional ? '?' : '')];
            break;
        case true:
            result = result.replace(/\/$/, '');
            surroundPattern = ['(?:\/(', ')|\/)?'];
            break;
        default:
            surroundPattern = ["(" + param.squash + "|", ')?'];
            break;
    }
    return result + surroundPattern[0] + param.type.pattern.source + surroundPattern[1];
}
/** @hidden */
var memoizeTo = function (obj, prop, fn) {
    return obj[prop] = obj[prop] || fn();
};
/** @hidden */
var splitOnSlash = strings_1.splitOnDelim('/');
/**
 * Matches URLs against patterns.
 *
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL.
 *
 * A URL pattern consists of a path pattern, optionally followed by '?' and a list of search (query)
 * parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by [[UrlMatcher.exec]].
 *
 * - *Path parameters* are defined using curly brace placeholders (`/somepath/{param}`)
 * or colon placeholders (`/somePath/:param`).
 *
 * - *A parameter RegExp* may be defined for a param after a colon
 * (`/somePath/{param:[a-zA-Z0-9]+}`) in a curly brace placeholder.
 * The regexp must match for the url to be matched.
 * Should the regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Note: a RegExp parameter will encode its value using either [[ParamTypes.path]] or [[ParamTypes.query]].
 *
 * - *Custom parameter types* may also be specified after a colon (`/somePath/{param:int}`) in curly brace parameters.
 *   See [[UrlMatcherFactory.type]] for more information.
 *
 * - *Catch-all parameters* are defined using an asterisk placeholder (`/somepath/*catchallparam`).
 *   A catch-all * parameter value will contain the remainder of the URL.
 *
 * ---
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters).
 * A path parameter matches any number of characters other than '/'. For catch-all
 * placeholders the path parameter matches any number of characters.
 *
 * Examples:
 *
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/{id:[^/]*}'` - Same as the previous example.
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` ParamType matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 */
var UrlMatcher = (function () {
    /**
     * @param pattern The pattern to compile into a matcher.
     * @param paramTypes The [[ParamTypes]] registry
     * @param config  A configuration object
     * - `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
     * - `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
     */
    function UrlMatcher(pattern, paramTypes, paramFactory, config) {
        var _this = this;
        this.config = config;
        /** @hidden */
        this._cache = { path: [this] };
        /** @hidden */
        this._children = [];
        /** @hidden */
        this._params = [];
        /** @hidden */
        this._segments = [];
        /** @hidden */
        this._compiled = [];
        this.pattern = pattern;
        this.config = common_1.defaults(this.config, {
            params: {},
            strict: true,
            caseInsensitive: false,
            paramMap: common_1.identity
        });
        // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
        //   '*' name
        //   ':' name
        //   '{' name '}'
        //   '{' name ':' regexp '}'
        // The regular expression is somewhat complicated due to the need to allow curly braces
        // inside the regular expression. The placeholder regexp breaks down as follows:
        //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
        //    \{([\w\[\]]+)(?:\:\s*( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
        //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
        //    [^{}\\]+                       - anything other than curly braces or backslash
        //    \\.                            - a backslash escape
        //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
        var placeholder = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, last = 0, m, patterns = [];
        var checkParamErrors = function (id) {
            if (!UrlMatcher.nameValidator.test(id))
                throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
            if (common_1.find(_this._params, hof_1.propEq('id', id)))
                throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
        };
        // Split into static segments separated by path parameter placeholders.
        // The number of segments is always 1 more than the number of parameters.
        var matchDetails = function (m, isSearch) {
            // IE[78] returns '' for unmatched groups instead of null
            var id = m[2] || m[3];
            var regexp = isSearch ? m[4] : m[4] || (m[1] === '*' ? '.*' : null);
            var makeRegexpType = function (regexp) { return common_1.inherit(paramTypes.type(isSearch ? "query" : "path"), {
                pattern: new RegExp(regexp, _this.config.caseInsensitive ? 'i' : undefined)
            }); };
            return {
                id: id,
                regexp: regexp,
                cfg: _this.config.params[id],
                segment: pattern.substring(last, m.index),
                type: !regexp ? null : paramTypes.type(regexp) || makeRegexpType(regexp)
            };
        };
        var p, segment;
        while ((m = placeholder.exec(pattern))) {
            p = matchDetails(m, false);
            if (p.segment.indexOf('?') >= 0)
                break; // we're into the search part
            checkParamErrors(p.id);
            this._params.push(paramFactory.fromPath(p.id, p.type, this.config.paramMap(p.cfg, false)));
            this._segments.push(p.segment);
            patterns.push([p.segment, common_1.tail(this._params)]);
            last = placeholder.lastIndex;
        }
        segment = pattern.substring(last);
        // Find any search parameter names and remove them from the last segment
        var i = segment.indexOf('?');
        if (i >= 0) {
            var search = segment.substring(i);
            segment = segment.substring(0, i);
            if (search.length > 0) {
                last = 0;
                while ((m = searchPlaceholder.exec(search))) {
                    p = matchDetails(m, true);
                    checkParamErrors(p.id);
                    this._params.push(paramFactory.fromSearch(p.id, p.type, this.config.paramMap(p.cfg, true)));
                    last = placeholder.lastIndex;
                    // check if ?&
                }
            }
        }
        this._segments.push(segment);
        this._compiled = patterns.map(function (pattern) { return quoteRegExp.apply(null, pattern); }).concat(quoteRegExp(segment));
    }
    /**
     * Creates a new concatenated UrlMatcher
     *
     * Builds a new UrlMatcher by appending another UrlMatcher to this one.
     *
     * @param url A `UrlMatcher` instance to append as a child of the current `UrlMatcher`.
     */
    UrlMatcher.prototype.append = function (url) {
        this._children.push(url);
        url._cache = {
            path: this._cache.path.concat(url),
            parent: this,
            pattern: null,
        };
        return url;
    };
    /** @hidden */
    UrlMatcher.prototype.isRoot = function () {
        return this._cache.path[0] === this;
    };
    /** Returns the input pattern string */
    UrlMatcher.prototype.toString = function () {
        return this.pattern;
    };
    /**
     * Tests the specified url/path against this matcher.
     *
     * Tests if the given url matches this matcher's pattern, and returns an object containing the captured
     * parameter values.  Returns null if the path does not match.
     *
     * The returned object contains the values
     * of any search parameters that are mentioned in the pattern, but their value may be null if
     * they are not present in `search`. This means that search parameters are always treated
     * as optional.
     *
     * #### Example:
     * ```js
     * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
     *   x: '1', q: 'hello'
     * });
     * // returns { id: 'bob', q: 'hello', r: null }
     * ```
     *
     * @param path    The URL path to match, e.g. `$location.path()`.
     * @param search  URL search parameters, e.g. `$location.search()`.
     * @param hash    URL hash e.g. `$location.hash()`.
     * @param options
     *
     * @returns The captured parameter values.
     */
    UrlMatcher.prototype.exec = function (path, search, hash, options) {
        var _this = this;
        if (search === void 0) { search = {}; }
        if (options === void 0) { options = {}; }
        var match = memoizeTo(this._cache, 'pattern', function () {
            return new RegExp([
                '^',
                common_1.unnest(_this._cache.path.map(hof_1.prop('_compiled'))).join(''),
                _this.config.strict === false ? '\/?' : '',
                '$'
            ].join(''), _this.config.caseInsensitive ? 'i' : undefined);
        }).exec(path);
        if (!match)
            return null;
        //options = defaults(options, { isolate: false });
        var allParams = this.parameters(), pathParams = allParams.filter(function (param) { return !param.isSearch(); }), searchParams = allParams.filter(function (param) { return param.isSearch(); }), nPathSegments = this._cache.path.map(function (urlm) { return urlm._segments.length - 1; }).reduce(function (a, x) { return a + x; }), values = {};
        if (nPathSegments !== match.length - 1)
            throw new Error("Unbalanced capture group in route '" + this.pattern + "'");
        function decodePathArray(string) {
            var reverseString = function (str) { return str.split("").reverse().join(""); };
            var unquoteDashes = function (str) { return str.replace(/\\-/g, "-"); };
            var split = reverseString(string).split(/-(?!\\)/);
            var allReversed = common_1.map(split, reverseString);
            return common_1.map(allReversed, unquoteDashes).reverse();
        }
        for (var i = 0; i < nPathSegments; i++) {
            var param = pathParams[i];
            var value = match[i + 1];
            // if the param value matches a pre-replace pair, replace the value before decoding.
            for (var j = 0; j < param.replace.length; j++) {
                if (param.replace[j].from === value)
                    value = param.replace[j].to;
            }
            if (value && param.array === true)
                value = decodePathArray(value);
            if (predicates_1.isDefined(value))
                value = param.type.decode(value);
            values[param.id] = param.value(value);
        }
        searchParams.forEach(function (param) {
            var value = search[param.id];
            for (var j = 0; j < param.replace.length; j++) {
                if (param.replace[j].from === value)
                    value = param.replace[j].to;
            }
            if (predicates_1.isDefined(value))
                value = param.type.decode(value);
            values[param.id] = param.value(value);
        });
        if (hash)
            values["#"] = hash;
        return values;
    };
    /**
     * @hidden
     * Returns all the [[Param]] objects of all path and search parameters of this pattern in order of appearance.
     *
     * @returns {Array.<Param>}  An array of [[Param]] objects. Must be treated as read-only. If the
     *    pattern has no parameters, an empty array is returned.
     */
    UrlMatcher.prototype.parameters = function (opts) {
        if (opts === void 0) { opts = {}; }
        if (opts.inherit === false)
            return this._params;
        return common_1.unnest(this._cache.path.map(function (matcher) { return matcher._params; }));
    };
    /**
     * @hidden
     * Returns a single parameter from this UrlMatcher by id
     *
     * @param id
     * @param opts
     * @returns {T|Param|any|boolean|UrlMatcher|null}
     */
    UrlMatcher.prototype.parameter = function (id, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        var findParam = function () {
            for (var _i = 0, _a = _this._params; _i < _a.length; _i++) {
                var param = _a[_i];
                if (param.id === id)
                    return param;
            }
        };
        var parent = this._cache.parent;
        return findParam() || (opts.inherit !== false && parent && parent.parameter(id, opts)) || null;
    };
    /**
     * Validates the input parameter values against this UrlMatcher
     *
     * Checks an object hash of parameters to validate their correctness according to the parameter
     * types of this `UrlMatcher`.
     *
     * @param params The object hash of parameters to validate.
     * @returns Returns `true` if `params` validates, otherwise `false`.
     */
    UrlMatcher.prototype.validates = function (params) {
        var validParamVal = function (param, val) {
            return !param || param.validates(val);
        };
        params = params || {};
        // I'm not sure why this checks only the param keys passed in, and not all the params known to the matcher
        var paramSchema = this.parameters().filter(function (paramDef) { return params.hasOwnProperty(paramDef.id); });
        return paramSchema.map(function (paramDef) { return validParamVal(paramDef, params[paramDef.id]); }).reduce(common_1.allTrueR, true);
    };
    /**
     * Given a set of parameter values, creates a URL from this UrlMatcher.
     *
     * Creates a URL that matches this pattern by substituting the specified values
     * for the path and search parameters.
     *
     * #### Example:
     * ```js
     * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
     * // returns '/user/bob?q=yes'
     * ```
     *
     * @param values  the values to substitute for the parameters in this pattern.
     * @returns the formatted URL (path and optionally search part).
     */
    UrlMatcher.prototype.format = function (values) {
        if (values === void 0) { values = {}; }
        // Build the full path of UrlMatchers (including all parent UrlMatchers)
        var urlMatchers = this._cache.path;
        // Extract all the static segments and Params (processed as ParamDetails)
        // into an ordered array
        var pathSegmentsAndParams = urlMatchers.map(UrlMatcher.pathSegmentsAndParams)
            .reduce(common_1.unnestR, [])
            .map(function (x) { return predicates_1.isString(x) ? x : getDetails(x); });
        // Extract the query params into a separate array
        var queryParams = urlMatchers.map(UrlMatcher.queryParams)
            .reduce(common_1.unnestR, [])
            .map(getDetails);
        var isInvalid = function (param) { return param.isValid === false; };
        if (pathSegmentsAndParams.concat(queryParams).filter(isInvalid).length) {
            return null;
        }
        /**
         * Given a Param, applies the parameter value, then returns detailed information about it
         */
        function getDetails(param) {
            // Normalize to typed value
            var value = param.value(values[param.id]);
            var isValid = param.validates(value);
            var isDefaultValue = param.isDefaultValue(value);
            // Check if we're in squash mode for the parameter
            var squash = isDefaultValue ? param.squash : false;
            // Allow the Parameter's Type to encode the value
            var encoded = param.type.encode(value);
            return { param: param, value: value, isValid: isValid, isDefaultValue: isDefaultValue, squash: squash, encoded: encoded };
        }
        // Build up the path-portion from the list of static segments and parameters
        var pathString = pathSegmentsAndParams.reduce(function (acc, x) {
            // The element is a static segment (a raw string); just append it
            if (predicates_1.isString(x))
                return acc + x;
            // Otherwise, it's a ParamDetails.
            var squash = x.squash, encoded = x.encoded, param = x.param;
            // If squash is === true, try to remove a slash from the path
            if (squash === true)
                return (acc.match(/\/$/)) ? acc.slice(0, -1) : acc;
            // If squash is a string, use the string for the param value
            if (predicates_1.isString(squash))
                return acc + squash;
            if (squash !== false)
                return acc; // ?
            if (encoded == null)
                return acc;
            // If this parameter value is an array, encode the value using encodeDashes
            if (predicates_1.isArray(encoded))
                return acc + common_1.map(encoded, UrlMatcher.encodeDashes).join("-");
            // If the parameter type is "raw", then do not encodeURIComponent
            if (param.raw)
                return acc + encoded;
            // Encode the value
            return acc + encodeURIComponent(encoded);
        }, "");
        // Build the query string by applying parameter values (array or regular)
        // then mapping to key=value, then flattening and joining using "&"
        var queryString = queryParams.map(function (paramDetails) {
            var param = paramDetails.param, squash = paramDetails.squash, encoded = paramDetails.encoded, isDefaultValue = paramDetails.isDefaultValue;
            if (encoded == null || (isDefaultValue && squash !== false))
                return;
            if (!predicates_1.isArray(encoded))
                encoded = [encoded];
            if (encoded.length === 0)
                return;
            if (!param.raw)
                encoded = common_1.map(encoded, encodeURIComponent);
            return encoded.map(function (val) { return param.id + "=" + val; });
        }).filter(common_1.identity).reduce(common_1.unnestR, []).join("&");
        // Concat the pathstring with the queryString (if exists) and the hashString (if exists)
        return pathString + (queryString ? "?" + queryString : "") + (values["#"] ? "#" + values["#"] : "");
    };
    /** @hidden */
    UrlMatcher.encodeDashes = function (str) {
        return encodeURIComponent(str).replace(/-/g, function (c) { return "%5C%" + c.charCodeAt(0).toString(16).toUpperCase(); });
    };
    /** @hidden Given a matcher, return an array with the matcher's path segments and path params, in order */
    UrlMatcher.pathSegmentsAndParams = function (matcher) {
        var staticSegments = matcher._segments;
        var pathParams = matcher._params.filter(function (p) { return p.location === param_1.DefType.PATH; });
        return common_1.arrayTuples(staticSegments, pathParams.concat(undefined))
            .reduce(common_1.unnestR, [])
            .filter(function (x) { return x !== "" && predicates_1.isDefined(x); });
    };
    /** @hidden Given a matcher, return an array with the matcher's query params */
    UrlMatcher.queryParams = function (matcher) {
        return matcher._params.filter(function (p) { return p.location === param_1.DefType.SEARCH; });
    };
    /**
     * Compare two UrlMatchers
     *
     * This comparison function converts a UrlMatcher into static and dynamic path segments.
     * Each static path segment is a static string between a path separator (slash character).
     * Each dynamic segment is a path parameter.
     *
     * The comparison function sorts static segments before dynamic ones.
     */
    UrlMatcher.compare = function (a, b) {
        /**
         * Turn a UrlMatcher and all its parent matchers into an array
         * of slash literals '/', string literals, and Param objects
         *
         * This example matcher matches strings like "/foo/:param/tail":
         * var matcher = $umf.compile("/foo").append($umf.compile("/:param")).append($umf.compile("/")).append($umf.compile("tail"));
         * var result = segments(matcher); // [ '/', 'foo', '/', Param, '/', 'tail' ]
         *
         * Caches the result as `matcher._cache.segments`
         */
        var segments = function (matcher) {
            return matcher._cache.segments = matcher._cache.segments ||
                matcher._cache.path.map(UrlMatcher.pathSegmentsAndParams)
                    .reduce(common_1.unnestR, [])
                    .reduce(strings_1.joinNeighborsR, [])
                    .map(function (x) { return predicates_1.isString(x) ? splitOnSlash(x) : x; })
                    .reduce(common_1.unnestR, []);
        };
        /**
         * Gets the sort weight for each segment of a UrlMatcher
         *
         * Caches the result as `matcher._cache.weights`
         */
        var weights = function (matcher) {
            return matcher._cache.weights = matcher._cache.weights ||
                segments(matcher).map(function (segment) {
                    // Sort slashes first, then static strings, the Params
                    if (segment === '/')
                        return 1;
                    if (predicates_1.isString(segment))
                        return 2;
                    if (segment instanceof param_1.Param)
                        return 3;
                });
        };
        var cmp, i, pairs = common_1.arrayTuples(weights(a), weights(b));
        for (i = 0; i < pairs.length; i++) {
            cmp = pairs[i][0] - pairs[i][1];
            if (cmp !== 0)
                return cmp;
        }
        return 0;
    };
    return UrlMatcher;
}());
/** @hidden */
UrlMatcher.nameValidator = /^\w+([-.]+\w+)*(?:\[\])?$/;
exports.UrlMatcher = UrlMatcher;
//# sourceMappingURL=urlMatcher.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @internalapi
 * @module vanilla
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(16);
var predicates_1 = __webpack_require__(1);
var common_1 = __webpack_require__(0);
/** A base `LocationServices` */
var BaseLocationServices = (function () {
    function BaseLocationServices(router, fireAfterUpdate) {
        var _this = this;
        this.fireAfterUpdate = fireAfterUpdate;
        this._listener = function (evt) { return _this._listeners.forEach(function (cb) { return cb(evt); }); };
        this._listeners = [];
        this.hash = function () { return utils_1.parseUrl(_this._get()).hash; };
        this.path = function () { return utils_1.parseUrl(_this._get()).path; };
        this.search = function () { return utils_1.getParams(utils_1.parseUrl(_this._get()).search); };
        this._location = window && window.location;
        this._history = window && window.history;
    }
    BaseLocationServices.prototype.url = function (url, replace) {
        if (replace === void 0) { replace = true; }
        if (predicates_1.isDefined(url) && url !== this._get()) {
            this._set(null, null, url, replace);
            if (this.fireAfterUpdate) {
                var evt_1 = common_1.extend(new Event("locationchange"), { url: url });
                this._listeners.forEach(function (cb) { return cb(evt_1); });
            }
        }
        return utils_1.buildUrl(this);
    };
    BaseLocationServices.prototype.onChange = function (cb) {
        var _this = this;
        this._listeners.push(cb);
        return function () { return common_1.removeFrom(_this._listeners, cb); };
    };
    BaseLocationServices.prototype.dispose = function (router) {
        common_1.deregAll(this._listeners);
    };
    return BaseLocationServices;
}());
exports.BaseLocationServices = BaseLocationServices;
//# sourceMappingURL=baseLocationService.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tokenFactory = exports.tokenFactory = 'tokenFactory';
var tokenFactoryFunc = exports.tokenFactoryFunc = function tokenFactoryFunc($localStorage) {
  return {
    setToken: function setToken(value) {
      $localStorage.token = value;
      console.log($localStorage.token);
    },
    getToken: function getToken() {
      return $localStorage.token;
    },
    findToken: function findToken() {
      if ($localStorage.token) {
        return true;
      }
    },
    deleteToken: function deleteToken() {
      delete $localStorage.token;
    }
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module common
 */ /** for typedoc */
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = (function () {
    function Queue(_items, _limit) {
        if (_items === void 0) { _items = []; }
        if (_limit === void 0) { _limit = null; }
        this._items = _items;
        this._limit = _limit;
    }
    Queue.prototype.enqueue = function (item) {
        var items = this._items;
        items.push(item);
        if (this._limit && items.length > this._limit)
            items.shift();
        return item;
    };
    Queue.prototype.dequeue = function () {
        if (this.size())
            return this._items.splice(0, 1)[0];
    };
    Queue.prototype.clear = function () {
        var current = this._items;
        this._items = [];
        return current;
    };
    Queue.prototype.size = function () {
        return this._items.length;
    };
    Queue.prototype.remove = function (item) {
        var idx = this._items.indexOf(item);
        return idx > -1 && this._items.splice(idx, 1)[0];
    };
    Queue.prototype.peekTail = function () {
        return this._items[this._items.length - 1];
    };
    Queue.prototype.peekHead = function () {
        if (this.size())
            return this._items[0];
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module params
 */
/** */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
/**
 * An internal class which implements [[ParamTypeDefinition]].
 *
 * A [[ParamTypeDefinition]] is a plain javascript object used to register custom parameter types.
 * When a param type definition is registered, an instance of this class is created internally.
 *
 * This class has naive implementations for all the [[ParamTypeDefinition]] methods.
 *
 * Used by [[UrlMatcher]] when matching or formatting URLs, or comparing and validating parameter values.
 *
 * #### Example:
 * ```js
 * var paramTypeDef = {
 *   decode: function(val) { return parseInt(val, 10); },
 *   encode: function(val) { return val && val.toString(); },
 *   equals: function(a, b) { return this.is(a) && a === b; },
 *   is: function(val) { return angular.isNumber(val) && isFinite(val) && val % 1 === 0; },
 *   pattern: /\d+/
 * }
 *
 * var paramType = new ParamType(paramTypeDef);
 * ```
 * @internalapi
 */
var ParamType = (function () {
    /**
     * @param def  A configuration object which contains the custom type definition.  The object's
     *        properties will override the default methods and/or pattern in `ParamType`'s public interface.
     * @returns a new ParamType object
     */
    function ParamType(def) {
        /** @inheritdoc */
        this.pattern = /.*/;
        /** @inheritdoc */
        this.inherit = true;
        common_1.extend(this, def);
    }
    // consider these four methods to be "abstract methods" that should be overridden
    /** @inheritdoc */
    ParamType.prototype.is = function (val, key) { return true; };
    /** @inheritdoc */
    ParamType.prototype.encode = function (val, key) { return val; };
    /** @inheritdoc */
    ParamType.prototype.decode = function (val, key) { return val; };
    /** @inheritdoc */
    ParamType.prototype.equals = function (a, b) { return a == b; };
    ParamType.prototype.$subPattern = function () {
        var sub = this.pattern.toString();
        return sub.substr(1, sub.length - 2);
    };
    ParamType.prototype.toString = function () {
        return "{ParamType:" + this.name + "}";
    };
    /** Given an encoded string, or a decoded object, returns a decoded object */
    ParamType.prototype.$normalize = function (val) {
        return this.is(val) ? val : this.decode(val);
    };
    /**
     * Wraps an existing custom ParamType as an array of ParamType, depending on 'mode'.
     * e.g.:
     * - urlmatcher pattern "/path?{queryParam[]:int}"
     * - url: "/path?queryParam=1&queryParam=2
     * - $stateParams.queryParam will be [1, 2]
     * if `mode` is "auto", then
     * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
     * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
     */
    ParamType.prototype.$asArray = function (mode, isSearch) {
        if (!mode)
            return this;
        if (mode === "auto" && !isSearch)
            throw new Error("'auto' array mode is for query parameters only");
        return new ArrayType(this, mode);
    };
    return ParamType;
}());
exports.ParamType = ParamType;
/**
 * Wraps up a `ParamType` object to handle array values.
 * @internalapi
 */
function ArrayType(type, mode) {
    var _this = this;
    // Wrap non-array value as array
    function arrayWrap(val) {
        return predicates_1.isArray(val) ? val : (predicates_1.isDefined(val) ? [val] : []);
    }
    // Unwrap array value for "auto" mode. Return undefined for empty array.
    function arrayUnwrap(val) {
        switch (val.length) {
            case 0: return undefined;
            case 1: return mode === "auto" ? val[0] : val;
            default: return val;
        }
    }
    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
    function arrayHandler(callback, allTruthyMode) {
        return function handleArray(val) {
            if (predicates_1.isArray(val) && val.length === 0)
                return val;
            var arr = arrayWrap(val);
            var result = common_1.map(arr, callback);
            return (allTruthyMode === true) ? common_1.filter(result, function (x) { return !x; }).length === 0 : arrayUnwrap(result);
        };
    }
    // Wraps type (.equals) functions to operate on each value of an array
    function arrayEqualsHandler(callback) {
        return function handleArray(val1, val2) {
            var left = arrayWrap(val1), right = arrayWrap(val2);
            if (left.length !== right.length)
                return false;
            for (var i = 0; i < left.length; i++) {
                if (!callback(left[i], right[i]))
                    return false;
            }
            return true;
        };
    }
    ['encode', 'decode', 'equals', '$normalize'].forEach(function (name) {
        var paramTypeFn = type[name].bind(type);
        var wrapperFn = name === 'equals' ? arrayEqualsHandler : arrayHandler;
        _this[name] = wrapperFn(paramTypeFn);
    });
    common_1.extend(this, {
        dynamic: type.dynamic,
        name: type.name,
        pattern: type.pattern,
        inherit: type.inherit,
        is: arrayHandler(type.is.bind(type), true),
        $arrayMode: mode
    });
}
//# sourceMappingURL=paramType.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module path */ /** for typedoc */
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var param_1 = __webpack_require__(10);
/**
 * @internalapi
 *
 * A node in a [[TreeChanges]] path
 *
 * For a [[TreeChanges]] path, this class holds the stateful information for a single node in the path.
 * Each PathNode corresponds to a state being entered, exited, or retained.
 * The stateful information includes parameter values and resolve data.
 */
var PathNode = (function () {
    function PathNode(stateOrNode) {
        if (stateOrNode instanceof PathNode) {
            var node = stateOrNode;
            this.state = node.state;
            this.paramSchema = node.paramSchema.slice();
            this.paramValues = common_1.extend({}, node.paramValues);
            this.resolvables = node.resolvables.slice();
            this.views = node.views && node.views.slice();
        }
        else {
            var state = stateOrNode;
            this.state = state;
            this.paramSchema = state.parameters({ inherit: false });
            this.paramValues = {};
            this.resolvables = state.resolvables.map(function (res) { return res.clone(); });
        }
    }
    /** Sets [[paramValues]] for the node, from the values of an object hash */
    PathNode.prototype.applyRawParams = function (params) {
        var getParamVal = function (paramDef) { return [paramDef.id, paramDef.value(params[paramDef.id])]; };
        this.paramValues = this.paramSchema.reduce(function (memo, pDef) { return common_1.applyPairs(memo, getParamVal(pDef)); }, {});
        return this;
    };
    /** Gets a specific [[Param]] metadata that belongs to the node */
    PathNode.prototype.parameter = function (name) {
        return common_1.find(this.paramSchema, hof_1.propEq("id", name));
    };
    /**
     * @returns true if the state and parameter values for another PathNode are
     * equal to the state and param values for this PathNode
     */
    PathNode.prototype.equals = function (node, paramsFn) {
        var diff = this.diff(node, paramsFn);
        return diff && diff.length === 0;
    };
    /**
     * Finds Params with different parameter values on another PathNode.
     *
     * Given another node (of the same state), finds the parameter values which differ.
     * Returns the [[Param]] (schema objects) whose parameter values differ.
     *
     * Given another node for a different state, returns `false`
     *
     * @param node The node to compare to
     * @param paramsFn A function that returns which parameters should be compared.
     * @returns The [[Param]]s which differ, or null if the two nodes are for different states
     */
    PathNode.prototype.diff = function (node, paramsFn) {
        if (this.state !== node.state)
            return false;
        var params = paramsFn ? paramsFn(this) : this.paramSchema;
        return param_1.Param.changed(params, this.paramValues, node.paramValues);
    };
    /** Returns a clone of the PathNode */
    PathNode.clone = function (node) {
        return new PathNode(node);
    };
    return PathNode;
}());
exports.PathNode = PathNode;
//# sourceMappingURL=pathNode.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var glob_1 = __webpack_require__(17);
var predicates_1 = __webpack_require__(1);
/**
 * Internal representation of a UI-Router state.
 *
 * Instances of this class are created when a [[StateDeclaration]] is registered with the [[StateRegistry]].
 *
 * A registered [[StateDeclaration]] is augmented with a getter ([[StateDeclaration.$$state]]) which returns the corresponding [[StateObject]] object.
 *
 * This class prototypally inherits from the corresponding [[StateDeclaration]].
 * Each of its own properties (i.e., `hasOwnProperty`) are built using builders from the [[StateBuilder]].
 */
var StateObject = (function () {
    /** @deprecated use State.create() */
    function StateObject(config) {
        return StateObject.create(config || {});
    }
    /**
     * Create a state object to put the private/internal implementation details onto.
     * The object's prototype chain looks like:
     * (Internal State Object) -> (Copy of State.prototype) -> (State Declaration object) -> (State Declaration's prototype...)
     *
     * @param stateDecl the user-supplied State Declaration
     * @returns {StateObject} an internal State object
     */
    StateObject.create = function (stateDecl) {
        stateDecl = StateObject.isStateClass(stateDecl) ? new stateDecl() : stateDecl;
        var state = common_1.inherit(common_1.inherit(stateDecl, StateObject.prototype));
        stateDecl.$$state = function () { return state; };
        state.self = stateDecl;
        state.__stateObjectCache = {
            nameGlob: glob_1.Glob.fromString(state.name) // might return null
        };
        return state;
    };
    /**
     * Returns true if the provided parameter is the same state.
     *
     * Compares the identity of the state against the passed value, which is either an object
     * reference to the actual `State` instance, the original definition object passed to
     * `$stateProvider.state()`, or the fully-qualified name.
     *
     * @param ref Can be one of (a) a `State` instance, (b) an object that was passed
     *        into `$stateProvider.state()`, (c) the fully-qualified name of a state as a string.
     * @returns Returns `true` if `ref` matches the current `State` instance.
     */
    StateObject.prototype.is = function (ref) {
        return this === ref || this.self === ref || this.fqn() === ref;
    };
    /**
     * @deprecated this does not properly handle dot notation
     * @returns Returns a dot-separated name of the state.
     */
    StateObject.prototype.fqn = function () {
        if (!this.parent || !(this.parent instanceof this.constructor))
            return this.name;
        var name = this.parent.fqn();
        return name ? name + "." + this.name : this.name;
    };
    /**
     * Returns the root node of this state's tree.
     *
     * @returns The root of this state's tree.
     */
    StateObject.prototype.root = function () {
        return this.parent && this.parent.root() || this;
    };
    /**
     * Gets the state's `Param` objects
     *
     * Gets the list of [[Param]] objects owned by the state.
     * If `opts.inherit` is true, it also includes the ancestor states' [[Param]] objects.
     * If `opts.matchingKeys` exists, returns only `Param`s whose `id` is a key on the `matchingKeys` object
     *
     * @param opts options
     */
    StateObject.prototype.parameters = function (opts) {
        opts = common_1.defaults(opts, { inherit: true, matchingKeys: null });
        var inherited = opts.inherit && this.parent && this.parent.parameters() || [];
        return inherited.concat(common_1.values(this.params))
            .filter(function (param) { return !opts.matchingKeys || opts.matchingKeys.hasOwnProperty(param.id); });
    };
    /**
     * Returns a single [[Param]] that is owned by the state
     *
     * If `opts.inherit` is true, it also searches the ancestor states` [[Param]]s.
     * @param id the name of the [[Param]] to return
     * @param opts options
     */
    StateObject.prototype.parameter = function (id, opts) {
        if (opts === void 0) { opts = {}; }
        return (this.url && this.url.parameter(id, opts) ||
            common_1.find(common_1.values(this.params), hof_1.propEq('id', id)) ||
            opts.inherit && this.parent && this.parent.parameter(id));
    };
    StateObject.prototype.toString = function () {
        return this.fqn();
    };
    return StateObject;
}());
/** Predicate which returns true if the object is an class with @State() decorator */
StateObject.isStateClass = function (stateDecl) {
    return predicates_1.isFunction(stateDecl) && stateDecl['__uiRouterState'] === true;
};
/** Predicate which returns true if the object is an internal [[StateObject]] object */
StateObject.isState = function (obj) {
    return predicates_1.isObject(obj['__stateObjectCache']);
};
exports.StateObject = StateObject;
//# sourceMappingURL=stateObject.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module transition
 */ /** for typedoc */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var interface_1 = __webpack_require__(11); // has or is using
var glob_1 = __webpack_require__(17);
/**
 * Determines if the given state matches the matchCriteria
 *
 * @hidden
 *
 * @param state a State Object to test against
 * @param criterion
 * - If a string, matchState uses the string as a glob-matcher against the state name
 * - If an array (of strings), matchState uses each string in the array as a glob-matchers against the state name
 *   and returns a positive match if any of the globs match.
 * - If a function, matchState calls the function with the state and returns true if the function's result is truthy.
 * @returns {boolean}
 */
function matchState(state, criterion) {
    var toMatch = predicates_1.isString(criterion) ? [criterion] : criterion;
    function matchGlobs(_state) {
        var globStrings = toMatch;
        for (var i = 0; i < globStrings.length; i++) {
            var glob = new glob_1.Glob(globStrings[i]);
            if ((glob && glob.matches(_state.name)) || (!glob && globStrings[i] === _state.name)) {
                return true;
            }
        }
        return false;
    }
    var matchFn = (predicates_1.isFunction(toMatch) ? toMatch : matchGlobs);
    return !!matchFn(state);
}
exports.matchState = matchState;
/**
 * @internalapi
 * The registration data for a registered transition hook
 */
var RegisteredHook = (function () {
    function RegisteredHook(tranSvc, eventType, callback, matchCriteria, options) {
        if (options === void 0) { options = {}; }
        this.tranSvc = tranSvc;
        this.eventType = eventType;
        this.callback = callback;
        this.matchCriteria = matchCriteria;
        this.priority = options.priority || 0;
        this.bind = options.bind || null;
        this._deregistered = false;
    }
    /**
     * Gets the matching [[PathNode]]s
     *
     * Given an array of [[PathNode]]s, and a [[HookMatchCriterion]], returns an array containing
     * the [[PathNode]]s that the criteria matches, or `null` if there were no matching nodes.
     *
     * Returning `null` is significant to distinguish between the default
     * "match-all criterion value" of `true` compared to a `() => true` function,
     * when the nodes is an empty array.
     *
     * This is useful to allow a transition match criteria of `entering: true`
     * to still match a transition, even when `entering === []`.  Contrast that
     * with `entering: (state) => true` which only matches when a state is actually
     * being entered.
     */
    RegisteredHook.prototype._matchingNodes = function (nodes, criterion) {
        if (criterion === true)
            return nodes;
        var matching = nodes.filter(function (node) { return matchState(node.state, criterion); });
        return matching.length ? matching : null;
    };
    /**
     * Gets the default match criteria (all `true`)
     *
     * Returns an object which has all the criteria match paths as keys and `true` as values, i.e.:
     *
     * ```js
     * {
     *   to: true,
     *   from: true,
     *   entering: true,
     *   exiting: true,
     *   retained: true,
     * }
     */
    RegisteredHook.prototype._getDefaultMatchCriteria = function () {
        return common_1.map(this.tranSvc._pluginapi._getPathTypes(), function () { return true; });
    };
    /**
     * Gets matching nodes as [[IMatchingNodes]]
     *
     * Create a IMatchingNodes object from the TransitionHookTypes that is roughly equivalent to:
     *
     * ```js
     * let matches: IMatchingNodes = {
     *   to:       _matchingNodes([tail(treeChanges.to)],   mc.to),
     *   from:     _matchingNodes([tail(treeChanges.from)], mc.from),
     *   exiting:  _matchingNodes(treeChanges.exiting,      mc.exiting),
     *   retained: _matchingNodes(treeChanges.retained,     mc.retained),
     *   entering: _matchingNodes(treeChanges.entering,     mc.entering),
     * };
     * ```
     */
    RegisteredHook.prototype._getMatchingNodes = function (treeChanges) {
        var _this = this;
        var criteria = common_1.extend(this._getDefaultMatchCriteria(), this.matchCriteria);
        var paths = common_1.values(this.tranSvc._pluginapi._getPathTypes());
        return paths.reduce(function (mn, pathtype) {
            // STATE scope criteria matches against every node in the path.
            // TRANSITION scope criteria matches against only the last node in the path
            var isStateHook = pathtype.scope === interface_1.TransitionHookScope.STATE;
            var path = treeChanges[pathtype.name] || [];
            var nodes = isStateHook ? path : [common_1.tail(path)];
            mn[pathtype.name] = _this._matchingNodes(nodes, criteria[pathtype.name]);
            return mn;
        }, {});
    };
    /**
     * Determines if this hook's [[matchCriteria]] match the given [[TreeChanges]]
     *
     * @returns an IMatchingNodes object, or null. If an IMatchingNodes object is returned, its values
     * are the matching [[PathNode]]s for each [[HookMatchCriterion]] (to, from, exiting, retained, entering)
     */
    RegisteredHook.prototype.matches = function (treeChanges) {
        var matches = this._getMatchingNodes(treeChanges);
        // Check if all the criteria matched the TreeChanges object
        var allMatched = common_1.values(matches).every(common_1.identity);
        return allMatched ? matches : null;
    };
    return RegisteredHook;
}());
exports.RegisteredHook = RegisteredHook;
/** @hidden Return a registration function of the requested type. */
function makeEvent(registry, transitionService, eventType) {
    // Create the object which holds the registered transition hooks.
    var _registeredHooks = registry._registeredHooks = (registry._registeredHooks || {});
    var hooks = _registeredHooks[eventType.name] = [];
    // Create hook registration function on the IHookRegistry for the event
    registry[eventType.name] = hookRegistrationFn;
    function hookRegistrationFn(matchObject, callback, options) {
        if (options === void 0) { options = {}; }
        var registeredHook = new RegisteredHook(transitionService, eventType, callback, matchObject, options);
        hooks.push(registeredHook);
        return function deregisterEventHook() {
            registeredHook._deregistered = true;
            common_1.removeFrom(hooks)(registeredHook);
        };
    }
    return hookRegistrationFn;
}
exports.makeEvent = makeEvent;
//# sourceMappingURL=hookRegistry.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module transition
 */
/** for typedoc */
var interface_1 = __webpack_require__(11);
var transition_1 = __webpack_require__(21);
var hookRegistry_1 = __webpack_require__(29);
var coreResolvables_1 = __webpack_require__(69);
var redirectTo_1 = __webpack_require__(73);
var onEnterExitRetain_1 = __webpack_require__(72);
var resolve_1 = __webpack_require__(74);
var views_1 = __webpack_require__(77);
var updateGlobals_1 = __webpack_require__(75);
var url_1 = __webpack_require__(76);
var lazyLoad_1 = __webpack_require__(36);
var transitionEventType_1 = __webpack_require__(47);
var transitionHook_1 = __webpack_require__(15);
var predicates_1 = __webpack_require__(1);
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var ignoredTransition_1 = __webpack_require__(70);
var invalidTransition_1 = __webpack_require__(71);
/**
 * The default [[Transition]] options.
 *
 * Include this object when applying custom defaults:
 * let reloadOpts = { reload: true, notify: true }
 * let options = defaults(theirOpts, customDefaults, defaultOptions);
 */
exports.defaultTransOpts = {
    location: true,
    relative: null,
    inherit: false,
    notify: true,
    reload: false,
    custom: {},
    current: function () { return null; },
    source: "unknown"
};
/**
 * This class provides services related to Transitions.
 *
 * - Most importantly, it allows global Transition Hooks to be registered.
 * - It allows the default transition error handler to be set.
 * - It also has a factory function for creating new [[Transition]] objects, (used internally by the [[StateService]]).
 *
 * At bootstrap, [[UIRouter]] creates a single instance (singleton) of this class.
 */
var TransitionService = (function () {
    /** @hidden */
    function TransitionService(_router) {
        /** @hidden */
        this._transitionCount = 0;
        /** @hidden The transition hook types, such as `onEnter`, `onStart`, etc */
        this._eventTypes = [];
        /** @hidden The registered transition hooks */
        this._registeredHooks = {};
        /** @hidden The  paths on a criteria object */
        this._criteriaPaths = {};
        this._router = _router;
        this.$view = _router.viewService;
        this._deregisterHookFns = {};
        this._pluginapi = common_1.createProxyFunctions(hof_1.val(this), {}, hof_1.val(this), [
            '_definePathType',
            '_defineEvent',
            '_getPathTypes',
            '_getEvents',
            'getHooks',
        ]);
        this._defineCorePaths();
        this._defineCoreEvents();
        this._registerCoreTransitionHooks();
    }
    /**
     * Registers a [[TransitionHookFn]], called *while a transition is being constructed*.
     *
     * Registers a transition lifecycle hook, which is invoked during transition construction.
     *
     * This low level hook should only be used by plugins.
     * This can be a useful time for plugins to add resolves or mutate the transition as needed.
     * The Sticky States plugin uses this hook to modify the treechanges.
     *
     * ### Lifecycle
     *
     * `onCreate` hooks are invoked *while a transition is being constructed*.
     *
     * ### Return value
     *
     * The hook's return value is ignored
     *
     * @internalapi
     * @param criteria defines which Transitions the Hook should be invoked for.
     * @param callback the hook function which will be invoked.
     * @param options the registration options
     * @returns a function which deregisters the hook.
     */
    TransitionService.prototype.onCreate = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onBefore = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onStart = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onExit = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onRetain = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onEnter = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onFinish = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onSuccess = function (criteria, callback, options) { return; };
    /** @inheritdoc */
    TransitionService.prototype.onError = function (criteria, callback, options) { return; };
    /**
     * dispose
     * @internalapi
     */
    TransitionService.prototype.dispose = function (router) {
        common_1.values(this._registeredHooks).forEach(function (hooksArray) { return hooksArray.forEach(function (hook) {
            hook._deregistered = true;
            common_1.removeFrom(hooksArray, hook);
        }); });
    };
    /**
     * Creates a new [[Transition]] object
     *
     * This is a factory function for creating new Transition objects.
     * It is used internally by the [[StateService]] and should generally not be called by application code.
     *
     * @param fromPath the path to the current state (the from state)
     * @param targetState the target state (destination)
     * @returns a Transition
     */
    TransitionService.prototype.create = function (fromPath, targetState) {
        return new transition_1.Transition(fromPath, targetState, this._router);
    };
    /** @hidden */
    TransitionService.prototype._defineCoreEvents = function () {
        var Phase = interface_1.TransitionHookPhase;
        var TH = transitionHook_1.TransitionHook;
        var paths = this._criteriaPaths;
        var NORMAL_SORT = false, REVERSE_SORT = true;
        var ASYNCHRONOUS = false, SYNCHRONOUS = true;
        this._defineEvent("onCreate", Phase.CREATE, 0, paths.to, NORMAL_SORT, TH.LOG_REJECTED_RESULT, TH.THROW_ERROR, SYNCHRONOUS);
        this._defineEvent("onBefore", Phase.BEFORE, 0, paths.to);
        this._defineEvent("onStart", Phase.RUN, 0, paths.to);
        this._defineEvent("onExit", Phase.RUN, 100, paths.exiting, REVERSE_SORT);
        this._defineEvent("onRetain", Phase.RUN, 200, paths.retained);
        this._defineEvent("onEnter", Phase.RUN, 300, paths.entering);
        this._defineEvent("onFinish", Phase.RUN, 400, paths.to);
        this._defineEvent("onSuccess", Phase.SUCCESS, 0, paths.to, NORMAL_SORT, TH.LOG_REJECTED_RESULT, TH.LOG_ERROR, SYNCHRONOUS);
        this._defineEvent("onError", Phase.ERROR, 0, paths.to, NORMAL_SORT, TH.LOG_REJECTED_RESULT, TH.LOG_ERROR, SYNCHRONOUS);
    };
    /** @hidden */
    TransitionService.prototype._defineCorePaths = function () {
        var STATE = interface_1.TransitionHookScope.STATE, TRANSITION = interface_1.TransitionHookScope.TRANSITION;
        this._definePathType("to", TRANSITION);
        this._definePathType("from", TRANSITION);
        this._definePathType("exiting", STATE);
        this._definePathType("retained", STATE);
        this._definePathType("entering", STATE);
    };
    /** @hidden */
    TransitionService.prototype._defineEvent = function (name, hookPhase, hookOrder, criteriaMatchPath, reverseSort, getResultHandler, getErrorHandler, synchronous) {
        if (reverseSort === void 0) { reverseSort = false; }
        if (getResultHandler === void 0) { getResultHandler = transitionHook_1.TransitionHook.HANDLE_RESULT; }
        if (getErrorHandler === void 0) { getErrorHandler = transitionHook_1.TransitionHook.REJECT_ERROR; }
        if (synchronous === void 0) { synchronous = false; }
        var eventType = new transitionEventType_1.TransitionEventType(name, hookPhase, hookOrder, criteriaMatchPath, reverseSort, getResultHandler, getErrorHandler, synchronous);
        this._eventTypes.push(eventType);
        hookRegistry_1.makeEvent(this, this, eventType);
    };
    ;
    /** @hidden */
    TransitionService.prototype._getEvents = function (phase) {
        var transitionHookTypes = predicates_1.isDefined(phase) ?
            this._eventTypes.filter(function (type) { return type.hookPhase === phase; }) :
            this._eventTypes.slice();
        return transitionHookTypes.sort(function (l, r) {
            var cmpByPhase = l.hookPhase - r.hookPhase;
            return cmpByPhase === 0 ? l.hookOrder - r.hookOrder : cmpByPhase;
        });
    };
    /**
     * Adds a Path to be used as a criterion against a TreeChanges path
     *
     * For example: the `exiting` path in [[HookMatchCriteria]] is a STATE scoped path.
     * It was defined by calling `defineTreeChangesCriterion('exiting', TransitionHookScope.STATE)`
     * Each state in the exiting path is checked against the criteria and returned as part of the match.
     *
     * Another example: the `to` path in [[HookMatchCriteria]] is a TRANSITION scoped path.
     * It was defined by calling `defineTreeChangesCriterion('to', TransitionHookScope.TRANSITION)`
     * Only the tail of the `to` path is checked against the criteria and returned as part of the match.
     *
     * @hidden
     */
    TransitionService.prototype._definePathType = function (name, hookScope) {
        this._criteriaPaths[name] = { name: name, scope: hookScope };
    };
    /** * @hidden */
    TransitionService.prototype._getPathTypes = function () {
        return this._criteriaPaths;
    };
    /** @hidden */
    TransitionService.prototype.getHooks = function (hookName) {
        return this._registeredHooks[hookName];
    };
    /** @hidden */
    TransitionService.prototype._registerCoreTransitionHooks = function () {
        var fns = this._deregisterHookFns;
        fns.addCoreResolves = coreResolvables_1.registerAddCoreResolvables(this);
        fns.ignored = ignoredTransition_1.registerIgnoredTransitionHook(this);
        fns.invalid = invalidTransition_1.registerInvalidTransitionHook(this);
        // Wire up redirectTo hook
        fns.redirectTo = redirectTo_1.registerRedirectToHook(this);
        // Wire up onExit/Retain/Enter state hooks
        fns.onExit = onEnterExitRetain_1.registerOnExitHook(this);
        fns.onRetain = onEnterExitRetain_1.registerOnRetainHook(this);
        fns.onEnter = onEnterExitRetain_1.registerOnEnterHook(this);
        // Wire up Resolve hooks
        fns.eagerResolve = resolve_1.registerEagerResolvePath(this);
        fns.lazyResolve = resolve_1.registerLazyResolveState(this);
        // Wire up the View management hooks
        fns.loadViews = views_1.registerLoadEnteringViews(this);
        fns.activateViews = views_1.registerActivateViews(this);
        // Updates global state after a transition
        fns.updateGlobals = updateGlobals_1.registerUpdateGlobalState(this);
        // After globals.current is updated at priority: 10000
        fns.updateUrl = url_1.registerUpdateUrl(this);
        // Lazy load state trees
        fns.lazyLoad = lazyLoad_1.registerLazyLoadHook(this);
    };
    return TransitionService;
}());
exports.TransitionService = TransitionService;
//# sourceMappingURL=transitionService.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Angular 1 types
 *
 * UI-Router core provides various Typescript types which you can use for code completion and validating parameter values, etc.
 * The customizations to the core types for Angular UI-Router are documented here.
 *
 * The optional [[$resolve]] service is also documented here.
 *
 * @module ng1
 * @preferred
 */
/** for typedoc */
var angular_1 = __webpack_require__(12);
var core_1 = __webpack_require__(5);
var views_1 = __webpack_require__(32);
var templateFactory_1 = __webpack_require__(97);
var stateProvider_1 = __webpack_require__(60);
var onEnterExitRetain_1 = __webpack_require__(96);
var locationServices_1 = __webpack_require__(94);
var urlRouterProvider_1 = __webpack_require__(61);
angular_1.ng.module("ui.router.angular1", []);
var mod_init = angular_1.ng.module('ui.router.init', []);
var mod_util = angular_1.ng.module('ui.router.util', ['ng', 'ui.router.init']);
var mod_rtr = angular_1.ng.module('ui.router.router', ['ui.router.util']);
var mod_state = angular_1.ng.module('ui.router.state', ['ui.router.router', 'ui.router.util', 'ui.router.angular1']);
var mod_main = angular_1.ng.module('ui.router', ['ui.router.init', 'ui.router.state', 'ui.router.angular1']);
var mod_cmpt = angular_1.ng.module('ui.router.compat', ['ui.router']); // tslint:disable-line
var router = null;
$uiRouter.$inject = ['$locationProvider'];
/** This angular 1 provider instantiates a Router and exposes its services via the angular injector */
function $uiRouter($locationProvider) {
    // Create a new instance of the Router when the $uiRouterProvider is initialized
    router = this.router = new core_1.UIRouter();
    router.stateProvider = new stateProvider_1.StateProvider(router.stateRegistry, router.stateService);
    // Apply ng1 specific StateBuilder code for `views`, `resolve`, and `onExit/Retain/Enter` properties
    router.stateRegistry.decorator("views", views_1.ng1ViewsBuilder);
    router.stateRegistry.decorator("onExit", onEnterExitRetain_1.getStateHookBuilder("onExit"));
    router.stateRegistry.decorator("onRetain", onEnterExitRetain_1.getStateHookBuilder("onRetain"));
    router.stateRegistry.decorator("onEnter", onEnterExitRetain_1.getStateHookBuilder("onEnter"));
    router.viewService._pluginapi._viewConfigFactory('ng1', views_1.getNg1ViewConfigFactory());
    var ng1LocationService = router.locationService = router.locationConfig = new locationServices_1.Ng1LocationServices($locationProvider);
    locationServices_1.Ng1LocationServices.monkeyPatchPathParameterType(router);
    // backwards compat: also expose router instance as $uiRouterProvider.router
    router['router'] = router;
    router['$get'] = $get;
    $get.$inject = ['$location', '$browser', '$sniffer', '$rootScope', '$http', '$templateCache'];
    function $get($location, $browser, $sniffer, $rootScope, $http, $templateCache) {
        ng1LocationService._runtimeServices($rootScope, $location, $sniffer, $browser);
        delete router['router'];
        delete router['$get'];
        return router;
    }
    return router;
}
var getProviderFor = function (serviceName) { return ['$uiRouterProvider', function ($urp) {
        var service = $urp.router[serviceName];
        service["$get"] = function () { return service; };
        return service;
    }]; };
// This effectively calls $get() on `$uiRouterProvider` to trigger init (when ng enters runtime)
runBlock.$inject = ['$injector', '$q', '$uiRouter'];
function runBlock($injector, $q, $uiRouter) {
    core_1.services.$injector = $injector;
    core_1.services.$q = $q;
    // The $injector is now available.
    // Find any resolvables that had dependency annotation deferred
    $uiRouter.stateRegistry.get()
        .map(function (x) { return x.$$state().resolvables; })
        .reduce(core_1.unnestR, [])
        .filter(function (x) { return x.deps === "deferred"; })
        .forEach(function (resolvable) { return resolvable.deps = $injector.annotate(resolvable.resolveFn); });
}
// $urlRouter service and $urlRouterProvider
var getUrlRouterProvider = function (uiRouter) {
    return uiRouter.urlRouterProvider = new urlRouterProvider_1.UrlRouterProvider(uiRouter);
};
// $state service and $stateProvider
// $urlRouter service and $urlRouterProvider
var getStateProvider = function () {
    return core_1.extend(router.stateProvider, { $get: function () { return router.stateService; } });
};
watchDigests.$inject = ['$rootScope'];
function watchDigests($rootScope) {
    $rootScope.$watch(function () { core_1.trace.approximateDigests++; });
}
exports.watchDigests = watchDigests;
mod_init.provider("$uiRouter", $uiRouter);
mod_rtr.provider('$urlRouter', ['$uiRouterProvider', getUrlRouterProvider]);
mod_util.provider('$urlService', getProviderFor('urlService'));
mod_util.provider('$urlMatcherFactory', ['$uiRouterProvider', function () { return router.urlMatcherFactory; }]);
mod_util.provider('$templateFactory', function () { return new templateFactory_1.TemplateFactory(); });
mod_state.provider('$stateRegistry', getProviderFor('stateRegistry'));
mod_state.provider('$uiRouterGlobals', getProviderFor('globals'));
mod_state.provider('$transitions', getProviderFor('transitionService'));
mod_state.provider('$state', ['$uiRouterProvider', getStateProvider]);
mod_state.factory('$stateParams', ['$uiRouter', function ($uiRouter) { return $uiRouter.globals.params; }]);
mod_main.factory('$view', function () { return router.viewService; });
mod_main.service("$trace", function () { return core_1.trace; });
mod_main.run(watchDigests);
mod_util.run(['$urlMatcherFactory', function ($urlMatcherFactory) { }]);
mod_state.run(['$state', function ($state) { }]);
mod_rtr.run(['$urlRouter', function ($urlRouter) { }]);
mod_init.run(runBlock);
/** @hidden TODO: find a place to move this */
exports.getLocals = function (ctx) {
    var tokens = ctx.getTokens().filter(core_1.isString);
    var tuples = tokens.map(function (key) {
        var resolvable = ctx.getResolvable(key);
        var waitPolicy = ctx.getPolicy(resolvable).async;
        return [key, waitPolicy === 'NOWAIT' ? resolvable.promise : resolvable.data];
    });
    return tuples.reduce(core_1.applyPairs, {});
};
//# sourceMappingURL=services.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(5);
function getNg1ViewConfigFactory() {
    var templateFactory = null;
    return function (path, view) {
        templateFactory = templateFactory || core_1.services.$injector.get("$templateFactory");
        return [new Ng1ViewConfig(path, view, templateFactory)];
    };
}
exports.getNg1ViewConfigFactory = getNg1ViewConfigFactory;
var hasAnyKey = function (keys, obj) {
    return keys.reduce(function (acc, key) { return acc || core_1.isDefined(obj[key]); }, false);
};
/**
 * This is a [[StateBuilder.builder]] function for angular1 `views`.
 *
 * When the [[StateBuilder]] builds a [[StateObject]] object from a raw [[StateDeclaration]], this builder
 * handles the `views` property with logic specific to @uirouter/angularjs (ng1).
 *
 * If no `views: {}` property exists on the [[StateDeclaration]], then it creates the `views` object
 * and applies the state-level configuration to a view named `$default`.
 */
function ng1ViewsBuilder(state) {
    // Do not process root state
    if (!state.parent)
        return {};
    var tplKeys = ['templateProvider', 'templateUrl', 'template', 'notify', 'async'], ctrlKeys = ['controller', 'controllerProvider', 'controllerAs', 'resolveAs'], compKeys = ['component', 'bindings', 'componentProvider'], nonCompKeys = tplKeys.concat(ctrlKeys), allViewKeys = compKeys.concat(nonCompKeys);
    // Do not allow a state to have both state-level props and also a `views: {}` property.
    // A state without a `views: {}` property can declare properties for the `$default` view as properties of the state.
    // However, the `$default` approach should not be mixed with a separate `views: ` block.
    if (core_1.isDefined(state.views) && hasAnyKey(allViewKeys, state)) {
        throw new Error("State '" + state.name + "' has a 'views' object. " +
            "It cannot also have \"view properties\" at the state level.  " +
            "Move the following properties into a view (in the 'views' object): " +
            (" " + allViewKeys.filter(function (key) { return core_1.isDefined(state[key]); }).join(", ")));
    }
    var views = {}, viewsObject = state.views || { "$default": core_1.pick(state, allViewKeys) };
    core_1.forEach(viewsObject, function (config, name) {
        // Account for views: { "": { template... } }
        name = name || "$default";
        // Account for views: { header: "headerComponent" }
        if (core_1.isString(config))
            config = { component: config };
        // Make a shallow copy of the config object
        config = core_1.extend({}, config);
        // Do not allow a view to mix props for component-style view with props for template/controller-style view
        if (hasAnyKey(compKeys, config) && hasAnyKey(nonCompKeys, config)) {
            throw new Error("Cannot combine: " + compKeys.join("|") + " with: " + nonCompKeys.join("|") + " in stateview: '" + name + "@" + state.name + "'");
        }
        config.resolveAs = config.resolveAs || '$resolve';
        config.$type = "ng1";
        config.$context = state;
        config.$name = name;
        var normalized = core_1.ViewService.normalizeUIViewTarget(config.$context, config.$name);
        config.$uiViewName = normalized.uiViewName;
        config.$uiViewContextAnchor = normalized.uiViewContextAnchor;
        views[name] = config;
    });
    return views;
}
exports.ng1ViewsBuilder = ng1ViewsBuilder;
var id = 0;
var Ng1ViewConfig = (function () {
    function Ng1ViewConfig(path, viewDecl, factory) {
        var _this = this;
        this.path = path;
        this.viewDecl = viewDecl;
        this.factory = factory;
        this.$id = id++;
        this.loaded = false;
        this.getTemplate = function (uiView, context) {
            return _this.component ? _this.factory.makeComponentTemplate(uiView, context, _this.component, _this.viewDecl.bindings) : _this.template;
        };
    }
    Ng1ViewConfig.prototype.load = function () {
        var _this = this;
        var $q = core_1.services.$q;
        var context = new core_1.ResolveContext(this.path);
        var params = this.path.reduce(function (acc, node) { return core_1.extend(acc, node.paramValues); }, {});
        var promises = {
            template: $q.when(this.factory.fromConfig(this.viewDecl, params, context)),
            controller: $q.when(this.getController(context))
        };
        return $q.all(promises).then(function (results) {
            core_1.trace.traceViewServiceEvent("Loaded", _this);
            _this.controller = results.controller;
            core_1.extend(_this, results.template); // Either { template: "tpl" } or { component: "cmpName" }
            return _this;
        });
    };
    /**
     * Gets the controller for a view configuration.
     *
     * @returns {Function|Promise.<Function>} Returns a controller, or a promise that resolves to a controller.
     */
    Ng1ViewConfig.prototype.getController = function (context) {
        var provider = this.viewDecl.controllerProvider;
        if (!core_1.isInjectable(provider))
            return this.viewDecl.controller;
        var deps = core_1.services.$injector.annotate(provider);
        var providerFn = core_1.isArray(provider) ? core_1.tail(provider) : provider;
        var resolvable = new core_1.Resolvable("", providerFn, deps);
        return resolvable.get(context);
    };
    return Ng1ViewConfig;
}());
exports.Ng1ViewConfig = Ng1ViewConfig;
//# sourceMappingURL=views.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getPosts = exports.getPosts = 'getPosts';
var getPostsFunc = exports.getPostsFunc = function getPostsFunc($http) {
  return {
    allPosts: function allPosts() {
      return $http.get('/post');
    }
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  'use strict';

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (root.hasOwnProperty('angular')) {
    // Browser globals (root is window), we don't register it.
    factory(root.angular);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'));
  }
}(this , function (angular) {
    'use strict';

    // In cases where Angular does not get passed or angular is a truthy value
    // but misses .module we can fall back to using window.
    angular = (angular && angular.module ) ? angular : window.angular;


    function isStorageSupported($window, storageType) {

      // Some installations of IE, for an unknown reason, throw "SCRIPT5: Error: Access is denied"
      // when accessing window.localStorage. This happens before you try to do anything with it. Catch
      // that error and allow execution to continue.

      // fix 'SecurityError: DOM Exception 18' exception in Desktop Safari, Mobile Safari
      // when "Block cookies": "Always block" is turned on
      var supported;
      try {
        supported = $window[storageType];
      }
      catch(err) {
        supported = false;
      }

      // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage and sessionStorage
      // is available, but trying to call .setItem throws an exception below:
      // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
      if(supported) {
        var key = '__' + Math.round(Math.random() * 1e7);
        try {
          $window[storageType].setItem(key, key);
          $window[storageType].removeItem(key, key);
        }
        catch(err) {
          supported = false;
        }
      }

      return supported;
    }

    /**
     * @ngdoc overview
     * @name ngStorage
     */

    return angular.module('ngStorage', [])

    /**
     * @ngdoc object
     * @name ngStorage.$localStorage
     * @requires $rootScope
     * @requires $window
     */

    .provider('$localStorage', _storageProvider('localStorage'))

    /**
     * @ngdoc object
     * @name ngStorage.$sessionStorage
     * @requires $rootScope
     * @requires $window
     */

    .provider('$sessionStorage', _storageProvider('sessionStorage'));

    function _storageProvider(storageType) {
        var providerWebStorage = isStorageSupported(window, storageType);

        return function () {
          var storageKeyPrefix = 'ngStorage-';

          this.setKeyPrefix = function (prefix) {
            if (typeof prefix !== 'string') {
              throw new TypeError('[ngStorage] - ' + storageType + 'Provider.setKeyPrefix() expects a String.');
            }
            storageKeyPrefix = prefix;
          };

          var serializer = angular.toJson;
          var deserializer = angular.fromJson;

          this.setSerializer = function (s) {
            if (typeof s !== 'function') {
              throw new TypeError('[ngStorage] - ' + storageType + 'Provider.setSerializer expects a function.');
            }

            serializer = s;
          };

          this.setDeserializer = function (d) {
            if (typeof d !== 'function') {
              throw new TypeError('[ngStorage] - ' + storageType + 'Provider.setDeserializer expects a function.');
            }

            deserializer = d;
          };

          this.supported = function() {
            return !!providerWebStorage;
          };

          // Note: This is not very elegant at all.
          this.get = function (key) {
            return providerWebStorage && deserializer(providerWebStorage.getItem(storageKeyPrefix + key));
          };

          // Note: This is not very elegant at all.
          this.set = function (key, value) {
            return providerWebStorage && providerWebStorage.setItem(storageKeyPrefix + key, serializer(value));
          };

          this.remove = function (key) {
            providerWebStorage && providerWebStorage.removeItem(storageKeyPrefix + key);
          }

          this.$get = [
              '$rootScope',
              '$window',
              '$log',
              '$timeout',
              '$document',

              function(
                  $rootScope,
                  $window,
                  $log,
                  $timeout,
                  $document
              ){

                // The magic number 10 is used which only works for some keyPrefixes...
                // See https://github.com/gsklee/ngStorage/issues/137
                var prefixLength = storageKeyPrefix.length;

                // #9: Assign a placeholder object if Web Storage is unavailable to prevent breaking the entire AngularJS app
                // Note: recheck mainly for testing (so we can use $window[storageType] rather than window[storageType])
                var isSupported = isStorageSupported($window, storageType),
                    webStorage = isSupported || ($log.warn('This browser does not support Web Storage!'), {setItem: angular.noop, getItem: angular.noop, removeItem: angular.noop}),
                    $storage = {
                        $default: function(items) {
                            for (var k in items) {
                                angular.isDefined($storage[k]) || ($storage[k] = angular.copy(items[k]) );
                            }

                            $storage.$sync();
                            return $storage;
                        },
                        $reset: function(items) {
                            for (var k in $storage) {
                                '$' === k[0] || (delete $storage[k] && webStorage.removeItem(storageKeyPrefix + k));
                            }

                            return $storage.$default(items);
                        },
                        $sync: function () {
                            for (var i = 0, l = webStorage.length, k; i < l; i++) {
                                // #8, #10: `webStorage.key(i)` may be an empty string (or throw an exception in IE9 if `webStorage` is empty)
                                (k = webStorage.key(i)) && storageKeyPrefix === k.slice(0, prefixLength) && ($storage[k.slice(prefixLength)] = deserializer(webStorage.getItem(k)));
                            }
                        },
                        $apply: function() {
                            var temp$storage;

                            _debounce = null;

                            if (!angular.equals($storage, _last$storage)) {
                                temp$storage = angular.copy(_last$storage);
                                angular.forEach($storage, function(v, k) {
                                    if (angular.isDefined(v) && '$' !== k[0]) {
                                        webStorage.setItem(storageKeyPrefix + k, serializer(v));
                                        delete temp$storage[k];
                                    }
                                });

                                for (var k in temp$storage) {
                                    webStorage.removeItem(storageKeyPrefix + k);
                                }

                                _last$storage = angular.copy($storage);
                            }
                        },
                        $supported: function() {
                            return !!isSupported;
                        }
                    },
                    _last$storage,
                    _debounce;

                $storage.$sync();

                _last$storage = angular.copy($storage);

                $rootScope.$watch(function() {
                    _debounce || (_debounce = $timeout($storage.$apply, 100, false));
                });

                // #6: Use `$window.addEventListener` instead of `angular.element` to avoid the jQuery-specific `event.originalEvent`
                $window.addEventListener && $window.addEventListener('storage', function(event) {
                    if (!event.key) {
                      return;
                    }

                    // Reference doc.
                    var doc = $document[0];

                    if ( (!doc.hasFocus || !doc.hasFocus()) && storageKeyPrefix === event.key.slice(0, prefixLength) ) {
                        event.newValue ? $storage[event.key.slice(prefixLength)] = deserializer(event.newValue) : delete $storage[event.key.slice(prefixLength)];

                        _last$storage = angular.copy($storage);

                        $rootScope.$apply();
                    }
                });

                $window.addEventListener && $window.addEventListener('beforeunload', function() {
                    $storage.$apply();
                });

                return $storage;
              }
          ];
      };
    }

}));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module core
 */ /** */
var stateParams_1 = __webpack_require__(38);
var queue_1 = __webpack_require__(25);
/**
 * Global router state
 *
 * This is where we hold the global mutable state such as current state, current
 * params, current transition, etc.
 */
var UIRouterGlobals = (function () {
    function UIRouterGlobals() {
        /**
         * Current parameter values
         *
         * The parameter values from the latest successful transition
         */
        this.params = new stateParams_1.StateParams();
        /** @internalapi */
        this.lastStartedTransitionId = -1;
        /** @internalapi */
        this.transitionHistory = new queue_1.Queue([], 1);
        /** @internalapi */
        this.successfulTransitions = new queue_1.Queue([], 1);
    }
    UIRouterGlobals.prototype.dispose = function () {
        this.transitionHistory.clear();
        this.successfulTransitions.clear();
        this.transition = null;
    };
    return UIRouterGlobals;
}());
exports.UIRouterGlobals = UIRouterGlobals;
//# sourceMappingURL=globals.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var coreservices_1 = __webpack_require__(4);
/**
 * A [[TransitionHookFn]] that performs lazy loading
 *
 * When entering a state "abc" which has a `lazyLoad` function defined:
 * - Invoke the `lazyLoad` function (unless it is already in process)
 *   - Flag the hook function as "in process"
 *   - The function should return a promise (that resolves when lazy loading is complete)
 * - Wait for the promise to settle
 *   - If the promise resolves to a [[LazyLoadResult]], then register those states
 *   - Flag the hook function as "not in process"
 * - If the hook was successful
 *   - Remove the `lazyLoad` function from the state declaration
 * - If all the hooks were successful
 *   - Retry the transition (by returning a TargetState)
 *
 * ```
 * .state('abc', {
 *   component: 'fooComponent',
 *   lazyLoad: () => System.import('./fooComponent')
 *   });
 * ```
 *
 * See [[StateDeclaration.lazyLoad]]
 */
var lazyLoadHook = function (transition) {
    var router = transition.router;
    function retryTransition() {
        if (transition.originalTransition().options().source !== 'url') {
            // The original transition was not triggered via url sync
            // The lazy state should be loaded now, so re-try the original transition
            var orig = transition.targetState();
            return router.stateService.target(orig.identifier(), orig.params(), orig.options());
        }
        // The original transition was triggered via url sync
        // Run the URL rules and find the best match
        var $url = router.urlService;
        var result = $url.match($url.parts());
        var rule = result && result.rule;
        // If the best match is a state, redirect the transition (instead
        // of calling sync() which supersedes the current transition)
        if (rule && rule.type === "STATE") {
            var state = rule.state;
            var params = result.match;
            return router.stateService.target(state, params, transition.options());
        }
        // No matching state found, so let .sync() choose the best non-state match/otherwise
        router.urlService.sync();
    }
    var promises = transition.entering()
        .filter(function (state) { return !!state.$$state().lazyLoad; })
        .map(function (state) { return lazyLoadState(transition, state); });
    return coreservices_1.services.$q.all(promises).then(retryTransition);
};
exports.registerLazyLoadHook = function (transitionService) {
    return transitionService.onBefore({ entering: function (state) { return !!state.lazyLoad; } }, lazyLoadHook);
};
/**
 * Invokes a state's lazy load function
 *
 * @param transition a Transition context
 * @param state the state to lazy load
 * @returns A promise for the lazy load result
 */
function lazyLoadState(transition, state) {
    var lazyLoadFn = state.$$state().lazyLoad;
    // Store/get the lazy load promise on/from the hookfn so it doesn't get re-invoked
    var promise = lazyLoadFn['_promise'];
    if (!promise) {
        var success = function (result) {
            delete state.lazyLoad;
            delete state.$$state().lazyLoad;
            delete lazyLoadFn['_promise'];
            return result;
        };
        var error = function (err) {
            delete lazyLoadFn['_promise'];
            return coreservices_1.services.$q.reject(err);
        };
        promise = lazyLoadFn['_promise'] =
            coreservices_1.services.$q.when(lazyLoadFn(transition, state))
                .then(updateStateRegistry)
                .then(success, error);
    }
    /** Register any lazy loaded state definitions */
    function updateStateRegistry(result) {
        if (result && Array.isArray(result.states)) {
            result.states.forEach(function (state) { return transition.router.stateRegistry.register(state); });
        }
        return result;
    }
    return promise;
}
exports.lazyLoadState = lazyLoadState;
//# sourceMappingURL=lazyLoad.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module params
 */
/** */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var hof_1 = __webpack_require__(2);
var coreservices_1 = __webpack_require__(4);
var paramType_1 = __webpack_require__(26);
/**
 * A registry for parameter types.
 *
 * This registry manages the built-in (and custom) parameter types.
 *
 * The built-in parameter types are:
 *
 * - [[string]]
 * - [[path]]
 * - [[query]]
 * - [[hash]]
 * - [[int]]
 * - [[bool]]
 * - [[date]]
 * - [[json]]
 * - [[any]]
 */
var ParamTypes = (function () {
    /** @internalapi */
    function ParamTypes() {
        /** @hidden */
        this.enqueue = true;
        /** @hidden */
        this.typeQueue = [];
        /** @internalapi */
        this.defaultTypes = common_1.pick(ParamTypes.prototype, ["hash", "string", "query", "path", "int", "bool", "date", "json", "any"]);
        // Register default types. Store them in the prototype of this.types.
        var makeType = function (definition, name) {
            return new paramType_1.ParamType(common_1.extend({ name: name }, definition));
        };
        this.types = common_1.inherit(common_1.map(this.defaultTypes, makeType), {});
    }
    /** @internalapi */
    ParamTypes.prototype.dispose = function () {
        this.types = {};
    };
    /**
     * Registers a parameter type
     *
     * End users should call [[UrlMatcherFactory.type]], which delegates to this method.
     */
    ParamTypes.prototype.type = function (name, definition, definitionFn) {
        if (!predicates_1.isDefined(definition))
            return this.types[name];
        if (this.types.hasOwnProperty(name))
            throw new Error("A type named '" + name + "' has already been defined.");
        this.types[name] = new paramType_1.ParamType(common_1.extend({ name: name }, definition));
        if (definitionFn) {
            this.typeQueue.push({ name: name, def: definitionFn });
            if (!this.enqueue)
                this._flushTypeQueue();
        }
        return this;
    };
    /** @internalapi */
    ParamTypes.prototype._flushTypeQueue = function () {
        while (this.typeQueue.length) {
            var type = this.typeQueue.shift();
            if (type.pattern)
                throw new Error("You cannot override a type's .pattern at runtime.");
            common_1.extend(this.types[type.name], coreservices_1.services.$injector.invoke(type.def));
        }
    };
    return ParamTypes;
}());
exports.ParamTypes = ParamTypes;
/** @hidden */
function initDefaultTypes() {
    var makeDefaultType = function (def) {
        var valToString = function (val) {
            return val != null ? val.toString() : val;
        };
        var defaultTypeBase = {
            encode: valToString,
            decode: valToString,
            is: hof_1.is(String),
            pattern: /.*/,
            equals: function (a, b) { return a == b; },
        };
        return common_1.extend({}, defaultTypeBase, def);
    };
    // Default Parameter Type Definitions
    common_1.extend(ParamTypes.prototype, {
        string: makeDefaultType({}),
        path: makeDefaultType({
            pattern: /[^/]*/,
        }),
        query: makeDefaultType({}),
        hash: makeDefaultType({
            inherit: false,
        }),
        int: makeDefaultType({
            decode: function (val) { return parseInt(val, 10); },
            is: function (val) {
                return !predicates_1.isNullOrUndefined(val) && this.decode(val.toString()) === val;
            },
            pattern: /-?\d+/,
        }),
        bool: makeDefaultType({
            encode: function (val) { return val && 1 || 0; },
            decode: function (val) { return parseInt(val, 10) !== 0; },
            is: hof_1.is(Boolean),
            pattern: /0|1/
        }),
        date: makeDefaultType({
            encode: function (val) {
                return !this.is(val) ? undefined : [
                    val.getFullYear(),
                    ('0' + (val.getMonth() + 1)).slice(-2),
                    ('0' + val.getDate()).slice(-2)
                ].join("-");
            },
            decode: function (val) {
                if (this.is(val))
                    return val;
                var match = this.capture.exec(val);
                return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
            },
            is: function (val) { return val instanceof Date && !isNaN(val.valueOf()); },
            equals: function (l, r) {
                return ['getFullYear', 'getMonth', 'getDate']
                    .reduce(function (acc, fn) { return acc && l[fn]() === r[fn](); }, true);
            },
            pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
            capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
        }),
        json: makeDefaultType({
            encode: common_1.toJson,
            decode: common_1.fromJson,
            is: hof_1.is(Object),
            equals: common_1.equals,
            pattern: /[^/]*/
        }),
        // does not encode/decode
        any: makeDefaultType({
            encode: common_1.identity,
            decode: common_1.identity,
            is: function () { return true; },
            equals: common_1.equals,
        }),
    });
}
initDefaultTypes();
//# sourceMappingURL=paramTypes.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module params
 */
/** */
var common_1 = __webpack_require__(0);
/** @internalapi */
var StateParams = (function () {
    function StateParams(params) {
        if (params === void 0) { params = {}; }
        common_1.extend(this, params);
    }
    /**
     * Merges a set of parameters with all parameters inherited between the common parents of the
     * current state and a given destination state.
     *
     * @param {Object} newParams The set of parameters which will be composited with inherited params.
     * @param {Object} $current Internal definition of object representing the current state.
     * @param {Object} $to Internal definition of object representing state to transition to.
     */
    StateParams.prototype.$inherit = function (newParams, $current, $to) {
        var parents = common_1.ancestors($current, $to), parentParams, inherited = {}, inheritList = [];
        for (var i in parents) {
            if (!parents[i] || !parents[i].params)
                continue;
            parentParams = Object.keys(parents[i].params);
            if (!parentParams.length)
                continue;
            for (var j in parentParams) {
                if (inheritList.indexOf(parentParams[j]) >= 0)
                    continue;
                inheritList.push(parentParams[j]);
                inherited[parentParams[j]] = this[parentParams[j]];
            }
        }
        return common_1.extend({}, inherited, newParams);
    };
    ;
    return StateParams;
}());
exports.StateParams = StateParams;
//# sourceMappingURL=stateParams.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @internalapi */
exports.resolvePolicies = {
    when: {
        LAZY: "LAZY",
        EAGER: "EAGER"
    },
    async: {
        WAIT: "WAIT",
        NOWAIT: "NOWAIT",
        RXWAIT: "RXWAIT"
    }
};
//# sourceMappingURL=interface.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module core
 */ /** */
var urlMatcherFactory_1 = __webpack_require__(48);
var urlRouter_1 = __webpack_require__(49);
var transitionService_1 = __webpack_require__(30);
var view_1 = __webpack_require__(59);
var stateRegistry_1 = __webpack_require__(44);
var stateService_1 = __webpack_require__(45);
var globals_1 = __webpack_require__(35);
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var urlService_1 = __webpack_require__(51);
var trace_1 = __webpack_require__(8);
/** @hidden */
var _routerInstance = 0;
/**
 * The master class used to instantiate an instance of UI-Router.
 *
 * UI-Router (for each specific framework) will create an instance of this class during bootstrap.
 * This class instantiates and wires the UI-Router services together.
 *
 * After a new instance of the UIRouter class is created, it should be configured for your app.
 * For instance, app states should be registered with the [[UIRouter.stateRegistry]].
 *
 * ---
 *
 * Normally the framework code will bootstrap UI-Router.
 * If you are bootstrapping UIRouter manually, tell it to monitor the URL by calling
 * [[UrlService.listen]] then [[UrlService.sync]].
 */
var UIRouter = (function () {
    /**
     * Creates a new `UIRouter` object
     *
     * @param locationService a [[LocationServices]] implementation
     * @param locationConfig a [[LocationConfig]] implementation
     * @internalapi
     */
    function UIRouter(locationService, locationConfig) {
        if (locationService === void 0) { locationService = urlService_1.UrlService.locationServiceStub; }
        if (locationConfig === void 0) { locationConfig = urlService_1.UrlService.locationConfigStub; }
        this.locationService = locationService;
        this.locationConfig = locationConfig;
        /** @hidden */ this.$id = _routerInstance++;
        /** @hidden */ this._disposed = false;
        /** @hidden */ this._disposables = [];
        /** Provides trace information to the console */
        this.trace = trace_1.trace;
        /** Provides services related to ui-view synchronization */
        this.viewService = new view_1.ViewService();
        /** Provides services related to Transitions */
        this.transitionService = new transitionService_1.TransitionService(this);
        /** Global router state */
        this.globals = new globals_1.UIRouterGlobals();
        /**
         * Deprecated for public use. Use [[urlService]] instead.
         * @deprecated Use [[urlService]] instead
         */
        this.urlMatcherFactory = new urlMatcherFactory_1.UrlMatcherFactory();
        /**
         * Deprecated for public use. Use [[urlService]] instead.
         * @deprecated Use [[urlService]] instead
         */
        this.urlRouter = new urlRouter_1.UrlRouter(this);
        /** Provides a registry for states, and related registration services */
        this.stateRegistry = new stateRegistry_1.StateRegistry(this);
        /** Provides services related to states */
        this.stateService = new stateService_1.StateService(this);
        /** Provides services related to the URL */
        this.urlService = new urlService_1.UrlService(this);
        /** @hidden */
        this._plugins = {};
        this.viewService._pluginapi._rootViewContext(this.stateRegistry.root());
        this.globals.$current = this.stateRegistry.root();
        this.globals.current = this.globals.$current.self;
        this.disposable(this.globals);
        this.disposable(this.stateService);
        this.disposable(this.stateRegistry);
        this.disposable(this.transitionService);
        this.disposable(this.urlRouter);
        this.disposable(locationService);
        this.disposable(locationConfig);
    }
    /** Registers an object to be notified when the router is disposed */
    UIRouter.prototype.disposable = function (disposable) {
        this._disposables.push(disposable);
    };
    /**
     * Disposes this router instance
     *
     * When called, clears resources retained by the router by calling `dispose(this)` on all
     * registered [[disposable]] objects.
     *
     * Or, if a `disposable` object is provided, calls `dispose(this)` on that object only.
     *
     * @param disposable (optional) the disposable to dispose
     */
    UIRouter.prototype.dispose = function (disposable) {
        var _this = this;
        if (disposable && predicates_1.isFunction(disposable.dispose)) {
            disposable.dispose(this);
            return undefined;
        }
        this._disposed = true;
        this._disposables.slice().forEach(function (d) {
            try {
                typeof d.dispose === 'function' && d.dispose(_this);
                common_1.removeFrom(_this._disposables, d);
            }
            catch (ignored) { }
        });
    };
    /**
     * Adds a plugin to UI-Router
     *
     * This method adds a UI-Router Plugin.
     * A plugin can enhance or change UI-Router behavior using any public API.
     *
     * #### Example:
     * ```js
     * import { MyCoolPlugin } from "ui-router-cool-plugin";
     *
     * var plugin = router.addPlugin(MyCoolPlugin);
     * ```
     *
     * ### Plugin authoring
     *
     * A plugin is simply a class (or constructor function) which accepts a [[UIRouter]] instance and (optionally) an options object.
     *
     * The plugin can implement its functionality using any of the public APIs of [[UIRouter]].
     * For example, it may configure router options or add a Transition Hook.
     *
     * The plugin can then be published as a separate module.
     *
     * #### Example:
     * ```js
     * export class MyAuthPlugin implements UIRouterPlugin {
     *   constructor(router: UIRouter, options: any) {
     *     this.name = "MyAuthPlugin";
     *     let $transitions = router.transitionService;
     *     let $state = router.stateService;
     *
     *     let authCriteria = {
     *       to: (state) => state.data && state.data.requiresAuth
     *     };
     *
     *     function authHook(transition: Transition) {
     *       let authService = transition.injector().get('AuthService');
     *       if (!authService.isAuthenticated()) {
     *         return $state.target('login');
     *       }
     *     }
     *
     *     $transitions.onStart(authCriteria, authHook);
     *   }
     * }
     * ```
     *
     * @param plugin one of:
     *        - a plugin class which implements [[UIRouterPlugin]]
     *        - a constructor function for a [[UIRouterPlugin]] which accepts a [[UIRouter]] instance
     *        - a factory function which accepts a [[UIRouter]] instance and returns a [[UIRouterPlugin]] instance
     * @param options options to pass to the plugin class/factory
     * @returns the registered plugin instance
     */
    UIRouter.prototype.plugin = function (plugin, options) {
        if (options === void 0) { options = {}; }
        var pluginInstance = new plugin(this, options);
        if (!pluginInstance.name)
            throw new Error("Required property `name` missing on plugin: " + pluginInstance);
        this._disposables.push(pluginInstance);
        return this._plugins[pluginInstance.name] = pluginInstance;
    };
    UIRouter.prototype.getPlugin = function (pluginName) {
        return pluginName ? this._plugins[pluginName] : common_1.values(this._plugins);
    };
    return UIRouter;
}());
exports.UIRouter = UIRouter;
//# sourceMappingURL=router.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module state */ /** for typedoc */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var strings_1 = __webpack_require__(7);
var hof_1 = __webpack_require__(2);
var resolvable_1 = __webpack_require__(13);
var coreservices_1 = __webpack_require__(4);
var parseUrl = function (url) {
    if (!predicates_1.isString(url))
        return false;
    var root = url.charAt(0) === '^';
    return { val: root ? url.substring(1) : url, root: root };
};
function nameBuilder(state) {
    return state.name;
}
function selfBuilder(state) {
    state.self.$$state = function () { return state; };
    return state.self;
}
function dataBuilder(state) {
    if (state.parent && state.parent.data) {
        state.data = state.self.data = common_1.inherit(state.parent.data, state.data);
    }
    return state.data;
}
var getUrlBuilder = function ($urlMatcherFactoryProvider, root) {
    return function urlBuilder(state) {
        var stateDec = state;
        // For future states, i.e., states whose name ends with `.**`,
        // match anything that starts with the url prefix
        if (stateDec && stateDec.url && stateDec.name && stateDec.name.match(/\.\*\*$/)) {
            stateDec.url += "{remainder:any}"; // match any path (.*)
        }
        var parsed = parseUrl(stateDec.url), parent = state.parent;
        var url = !parsed ? stateDec.url : $urlMatcherFactoryProvider.compile(parsed.val, {
            params: state.params || {},
            paramMap: function (paramConfig, isSearch) {
                if (stateDec.reloadOnSearch === false && isSearch)
                    paramConfig = common_1.extend(paramConfig || {}, { dynamic: true });
                return paramConfig;
            }
        });
        if (!url)
            return null;
        if (!$urlMatcherFactoryProvider.isMatcher(url))
            throw new Error("Invalid url '" + url + "' in state '" + state + "'");
        return (parsed && parsed.root) ? url : ((parent && parent.navigable) || root()).url.append(url);
    };
};
var getNavigableBuilder = function (isRoot) {
    return function navigableBuilder(state) {
        return !isRoot(state) && state.url ? state : (state.parent ? state.parent.navigable : null);
    };
};
var getParamsBuilder = function (paramFactory) {
    return function paramsBuilder(state) {
        var makeConfigParam = function (config, id) { return paramFactory.fromConfig(id, null, config); };
        var urlParams = (state.url && state.url.parameters({ inherit: false })) || [];
        var nonUrlParams = common_1.values(common_1.mapObj(common_1.omit(state.params || {}, urlParams.map(hof_1.prop('id'))), makeConfigParam));
        return urlParams.concat(nonUrlParams).map(function (p) { return [p.id, p]; }).reduce(common_1.applyPairs, {});
    };
};
function pathBuilder(state) {
    return state.parent ? state.parent.path.concat(state) : [state];
}
function includesBuilder(state) {
    var includes = state.parent ? common_1.extend({}, state.parent.includes) : {};
    includes[state.name] = true;
    return includes;
}
/**
 * This is a [[StateBuilder.builder]] function for the `resolve:` block on a [[StateDeclaration]].
 *
 * When the [[StateBuilder]] builds a [[StateObject]] object from a raw [[StateDeclaration]], this builder
 * validates the `resolve` property and converts it to a [[Resolvable]] array.
 *
 * resolve: input value can be:
 *
 * {
 *   // analyzed but not injected
 *   myFooResolve: function() { return "myFooData"; },
 *
 *   // function.toString() parsed, "DependencyName" dep as string (not min-safe)
 *   myBarResolve: function(DependencyName) { return DependencyName.fetchSomethingAsPromise() },
 *
 *   // Array split; "DependencyName" dep as string
 *   myBazResolve: [ "DependencyName", function(dep) { return dep.fetchSomethingAsPromise() },
 *
 *   // Array split; DependencyType dep as token (compared using ===)
 *   myQuxResolve: [ DependencyType, function(dep) { return dep.fetchSometingAsPromise() },
 *
 *   // val.$inject used as deps
 *   // where:
 *   //     corgeResolve.$inject = ["DependencyName"];
 *   //     function corgeResolve(dep) { dep.fetchSometingAsPromise() }
 *   // then "DependencyName" dep as string
 *   myCorgeResolve: corgeResolve,
 *
 *  // inject service by name
 *  // When a string is found, desugar creating a resolve that injects the named service
 *   myGraultResolve: "SomeService"
 * }
 *
 * or:
 *
 * [
 *   new Resolvable("myFooResolve", function() { return "myFooData" }),
 *   new Resolvable("myBarResolve", function(dep) { return dep.fetchSomethingAsPromise() }, [ "DependencyName" ]),
 *   { provide: "myBazResolve", useFactory: function(dep) { dep.fetchSomethingAsPromise() }, deps: [ "DependencyName" ] }
 * ]
 */
function resolvablesBuilder(state) {
    /** convert resolve: {} and resolvePolicy: {} objects to an array of tuples */
    var objects2Tuples = function (resolveObj, resolvePolicies) {
        return Object.keys(resolveObj || {}).map(function (token) { return ({ token: token, val: resolveObj[token], deps: undefined, policy: resolvePolicies[token] }); });
    };
    /** fetch DI annotations from a function or ng1-style array */
    var annotate = function (fn) {
        var $injector = coreservices_1.services.$injector;
        // ng1 doesn't have an $injector until runtime.
        // If the $injector doesn't exist, use "deferred" literal as a
        // marker indicating they should be annotated when runtime starts
        return fn['$inject'] || ($injector && $injector.annotate(fn, $injector.strictDi)) || "deferred";
    };
    /** true if the object has both `token` and `resolveFn`, and is probably a [[ResolveLiteral]] */
    var isResolveLiteral = function (obj) { return !!(obj.token && obj.resolveFn); };
    /** true if the object looks like a provide literal, or a ng2 Provider */
    var isLikeNg2Provider = function (obj) { return !!((obj.provide || obj.token) && (obj.useValue || obj.useFactory || obj.useExisting || obj.useClass)); };
    /** true if the object looks like a tuple from obj2Tuples */
    var isTupleFromObj = function (obj) { return !!(obj && obj.val && (predicates_1.isString(obj.val) || predicates_1.isArray(obj.val) || predicates_1.isFunction(obj.val))); };
    /** extracts the token from a Provider or provide literal */
    var token = function (p) { return p.provide || p.token; };
    /** Given a literal resolve or provider object, returns a Resolvable */
    var literal2Resolvable = hof_1.pattern([
        [hof_1.prop('resolveFn'), function (p) { return new resolvable_1.Resolvable(token(p), p.resolveFn, p.deps, p.policy); }],
        [hof_1.prop('useFactory'), function (p) { return new resolvable_1.Resolvable(token(p), p.useFactory, (p.deps || p.dependencies), p.policy); }],
        [hof_1.prop('useClass'), function (p) { return new resolvable_1.Resolvable(token(p), function () { return new p.useClass(); }, [], p.policy); }],
        [hof_1.prop('useValue'), function (p) { return new resolvable_1.Resolvable(token(p), function () { return p.useValue; }, [], p.policy, p.useValue); }],
        [hof_1.prop('useExisting'), function (p) { return new resolvable_1.Resolvable(token(p), common_1.identity, [p.useExisting], p.policy); }],
    ]);
    var tuple2Resolvable = hof_1.pattern([
        [hof_1.pipe(hof_1.prop("val"), predicates_1.isString), function (tuple) { return new resolvable_1.Resolvable(tuple.token, common_1.identity, [tuple.val], tuple.policy); }],
        [hof_1.pipe(hof_1.prop("val"), predicates_1.isArray), function (tuple) { return new resolvable_1.Resolvable(tuple.token, common_1.tail(tuple.val), tuple.val.slice(0, -1), tuple.policy); }],
        [hof_1.pipe(hof_1.prop("val"), predicates_1.isFunction), function (tuple) { return new resolvable_1.Resolvable(tuple.token, tuple.val, annotate(tuple.val), tuple.policy); }],
    ]);
    var item2Resolvable = hof_1.pattern([
        [hof_1.is(resolvable_1.Resolvable), function (r) { return r; }],
        [isResolveLiteral, literal2Resolvable],
        [isLikeNg2Provider, literal2Resolvable],
        [isTupleFromObj, tuple2Resolvable],
        [hof_1.val(true), function (obj) { throw new Error("Invalid resolve value: " + strings_1.stringify(obj)); }]
    ]);
    // If resolveBlock is already an array, use it as-is.
    // Otherwise, assume it's an object and convert to an Array of tuples
    var decl = state.resolve;
    var items = predicates_1.isArray(decl) ? decl : objects2Tuples(decl, state.resolvePolicy || {});
    return items.map(item2Resolvable);
}
exports.resolvablesBuilder = resolvablesBuilder;
/**
 * @internalapi A internal global service
 *
 * StateBuilder is a factory for the internal [[StateObject]] objects.
 *
 * When you register a state with the [[StateRegistry]], you register a plain old javascript object which
 * conforms to the [[StateDeclaration]] interface.  This factory takes that object and builds the corresponding
 * [[StateObject]] object, which has an API and is used internally.
 *
 * Custom properties or API may be added to the internal [[StateObject]] object by registering a decorator function
 * using the [[builder]] method.
 */
var StateBuilder = (function () {
    function StateBuilder(matcher, urlMatcherFactory) {
        this.matcher = matcher;
        var self = this;
        var root = function () { return matcher.find(""); };
        var isRoot = function (state) { return state.name === ""; };
        function parentBuilder(state) {
            if (isRoot(state))
                return null;
            return matcher.find(self.parentName(state)) || root();
        }
        this.builders = {
            name: [nameBuilder],
            self: [selfBuilder],
            parent: [parentBuilder],
            data: [dataBuilder],
            // Build a URLMatcher if necessary, either via a relative or absolute URL
            url: [getUrlBuilder(urlMatcherFactory, root)],
            // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
            navigable: [getNavigableBuilder(isRoot)],
            params: [getParamsBuilder(urlMatcherFactory.paramFactory)],
            // Each framework-specific ui-router implementation should define its own `views` builder
            // e.g., src/ng1/statebuilders/views.ts
            views: [],
            // Keep a full path from the root down to this state as this is needed for state activation.
            path: [pathBuilder],
            // Speed up $state.includes() as it's used a lot
            includes: [includesBuilder],
            resolvables: [resolvablesBuilder]
        };
    }
    /**
     * Registers a [[BuilderFunction]] for a specific [[StateObject]] property (e.g., `parent`, `url`, or `path`).
     * More than one BuilderFunction can be registered for a given property.
     *
     * The BuilderFunction(s) will be used to define the property on any subsequently built [[StateObject]] objects.
     *
     * @param name The name of the State property being registered for.
     * @param fn The BuilderFunction which will be used to build the State property
     * @returns a function which deregisters the BuilderFunction
     */
    StateBuilder.prototype.builder = function (name, fn) {
        var builders = this.builders;
        var array = builders[name] || [];
        // Backwards compat: if only one builder exists, return it, else return whole arary.
        if (predicates_1.isString(name) && !predicates_1.isDefined(fn))
            return array.length > 1 ? array : array[0];
        if (!predicates_1.isString(name) || !predicates_1.isFunction(fn))
            return;
        builders[name] = array;
        builders[name].push(fn);
        return function () { return builders[name].splice(builders[name].indexOf(fn, 1)) && null; };
    };
    /**
     * Builds all of the properties on an essentially blank State object, returning a State object which has all its
     * properties and API built.
     *
     * @param state an uninitialized State object
     * @returns the built State object
     */
    StateBuilder.prototype.build = function (state) {
        var _a = this, matcher = _a.matcher, builders = _a.builders;
        var parent = this.parentName(state);
        if (parent && !matcher.find(parent, undefined, false)) {
            return null;
        }
        for (var key in builders) {
            if (!builders.hasOwnProperty(key))
                continue;
            var chain = builders[key].reduce(function (parentFn, step) { return function (_state) { return step(_state, parentFn); }; }, common_1.noop);
            state[key] = chain(state);
        }
        return state;
    };
    StateBuilder.prototype.parentName = function (state) {
        var name = state.name || "";
        var segments = name.split('.');
        if (segments.length > 1) {
            if (state.parent) {
                throw new Error("States that specify the 'parent:' property should not have a '.' in their name (" + name + ")");
            }
            var lastSegment = segments.pop();
            if (lastSegment === '**')
                segments.pop();
            return segments.join(".");
        }
        if (!state.parent)
            return "";
        return predicates_1.isString(state.parent) ? state.parent : state.parent.name;
    };
    StateBuilder.prototype.name = function (state) {
        var name = state.name;
        if (name.indexOf('.') !== -1 || !state.parent)
            return name;
        var parentName = predicates_1.isString(state.parent) ? state.parent : state.parent.name;
        return parentName ? parentName + "." + name : name;
    };
    return StateBuilder;
}());
exports.StateBuilder = StateBuilder;
//# sourceMappingURL=stateBuilder.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module state */ /** for typedoc */
var predicates_1 = __webpack_require__(1);
var common_1 = __webpack_require__(0);
var StateMatcher = (function () {
    function StateMatcher(_states) {
        this._states = _states;
    }
    StateMatcher.prototype.isRelative = function (stateName) {
        stateName = stateName || "";
        return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
    };
    StateMatcher.prototype.find = function (stateOrName, base, matchGlob) {
        if (matchGlob === void 0) { matchGlob = true; }
        if (!stateOrName && stateOrName !== "")
            return undefined;
        var isStr = predicates_1.isString(stateOrName);
        var name = isStr ? stateOrName : stateOrName.name;
        if (this.isRelative(name))
            name = this.resolvePath(name, base);
        var state = this._states[name];
        if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
            return state;
        }
        else if (isStr && matchGlob) {
            var _states = common_1.values(this._states);
            var matches = _states.filter(function (state) {
                return state.__stateObjectCache.nameGlob &&
                    state.__stateObjectCache.nameGlob.matches(name);
            });
            if (matches.length > 1) {
                console.log("stateMatcher.find: Found multiple matches for " + name + " using glob: ", matches.map(function (match) { return match.name; }));
            }
            return matches[0];
        }
        return undefined;
    };
    StateMatcher.prototype.resolvePath = function (name, base) {
        if (!base)
            throw new Error("No reference point given for path '" + name + "'");
        var baseState = this.find(base);
        var splitName = name.split("."), i = 0, pathLength = splitName.length, current = baseState;
        for (; i < pathLength; i++) {
            if (splitName[i] === "" && i === 0) {
                current = baseState;
                continue;
            }
            if (splitName[i] === "^") {
                if (!current.parent)
                    throw new Error("Path '" + name + "' not valid for state '" + baseState.name + "'");
                current = current.parent;
                continue;
            }
            break;
        }
        var relName = splitName.slice(i).join(".");
        return current.name + (current.name && relName ? "." : "") + relName;
    };
    return StateMatcher;
}());
exports.StateMatcher = StateMatcher;
//# sourceMappingURL=stateMatcher.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module state */ /** for typedoc */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var stateObject_1 = __webpack_require__(28);
var hof_1 = __webpack_require__(2);
/** @internalapi */
var StateQueueManager = (function () {
    function StateQueueManager($registry, $urlRouter, states, builder, listeners) {
        this.$registry = $registry;
        this.$urlRouter = $urlRouter;
        this.states = states;
        this.builder = builder;
        this.listeners = listeners;
        this.queue = [];
        this.matcher = $registry.matcher;
    }
    /** @internalapi */
    StateQueueManager.prototype.dispose = function () {
        this.queue = [];
    };
    StateQueueManager.prototype.register = function (stateDecl) {
        var queue = this.queue;
        var state = stateObject_1.StateObject.create(stateDecl);
        var name = state.name;
        if (!predicates_1.isString(name))
            throw new Error("State must have a valid name");
        if (this.states.hasOwnProperty(name) || common_1.inArray(queue.map(hof_1.prop('name')), name))
            throw new Error("State '" + name + "' is already defined");
        queue.push(state);
        this.flush();
        return state;
    };
    StateQueueManager.prototype.flush = function () {
        var _this = this;
        var _a = this, queue = _a.queue, states = _a.states, builder = _a.builder;
        var registered = [], // states that got registered
        orphans = [], // states that don't yet have a parent registered
        previousQueueLength = {}; // keep track of how long the queue when an orphan was first encountered
        var getState = function (name) {
            return _this.states.hasOwnProperty(name) && _this.states[name];
        };
        while (queue.length > 0) {
            var state = queue.shift();
            var name_1 = state.name;
            var result = builder.build(state);
            var orphanIdx = orphans.indexOf(state);
            if (result) {
                var existingState = getState(name_1);
                if (existingState && existingState.name === name_1) {
                    throw new Error("State '" + name_1 + "' is already defined");
                }
                var existingFutureState = getState(name_1 + ".**");
                if (existingFutureState) {
                    // Remove future state of the same name
                    this.$registry.deregister(existingFutureState);
                }
                states[name_1] = state;
                this.attachRoute(state);
                if (orphanIdx >= 0)
                    orphans.splice(orphanIdx, 1);
                registered.push(state);
                continue;
            }
            var prev = previousQueueLength[name_1];
            previousQueueLength[name_1] = queue.length;
            if (orphanIdx >= 0 && prev === queue.length) {
                // Wait until two consecutive iterations where no additional states were dequeued successfully.
                // throw new Error(`Cannot register orphaned state '${name}'`);
                queue.push(state);
                return states;
            }
            else if (orphanIdx < 0) {
                orphans.push(state);
            }
            queue.push(state);
        }
        if (registered.length) {
            this.listeners.forEach(function (listener) { return listener("registered", registered.map(function (s) { return s.self; })); });
        }
        return states;
    };
    StateQueueManager.prototype.attachRoute = function (state) {
        if (state.abstract || !state.url)
            return;
        this.$urlRouter.rule(this.$urlRouter.urlRuleFactory.create(state));
    };
    return StateQueueManager;
}());
exports.StateQueueManager = StateQueueManager;
//# sourceMappingURL=stateQueueManager.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @coreapi
 * @module state
 */ /** for typedoc */
Object.defineProperty(exports, "__esModule", { value: true });
var stateMatcher_1 = __webpack_require__(42);
var stateBuilder_1 = __webpack_require__(41);
var stateQueueManager_1 = __webpack_require__(43);
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var StateRegistry = (function () {
    /** @internalapi */
    function StateRegistry(_router) {
        this._router = _router;
        this.states = {};
        this.listeners = [];
        this.matcher = new stateMatcher_1.StateMatcher(this.states);
        this.builder = new stateBuilder_1.StateBuilder(this.matcher, _router.urlMatcherFactory);
        this.stateQueue = new stateQueueManager_1.StateQueueManager(this, _router.urlRouter, this.states, this.builder, this.listeners);
        this._registerRoot();
    }
    /** @internalapi */
    StateRegistry.prototype._registerRoot = function () {
        var rootStateDef = {
            name: '',
            url: '^',
            views: null,
            params: {
                '#': { value: null, type: 'hash', dynamic: true }
            },
            abstract: true
        };
        var _root = this._root = this.stateQueue.register(rootStateDef);
        _root.navigable = null;
    };
    /** @internalapi */
    StateRegistry.prototype.dispose = function () {
        var _this = this;
        this.stateQueue.dispose();
        this.listeners = [];
        this.get().forEach(function (state) { return _this.get(state) && _this.deregister(state); });
    };
    /**
     * Listen for a State Registry events
     *
     * Adds a callback that is invoked when states are registered or deregistered with the StateRegistry.
     *
     * #### Example:
     * ```js
     * let allStates = registry.get();
     *
     * // Later, invoke deregisterFn() to remove the listener
     * let deregisterFn = registry.onStatesChanged((event, states) => {
     *   switch(event) {
     *     case: 'registered':
     *       states.forEach(state => allStates.push(state));
     *       break;
     *     case: 'deregistered':
     *       states.forEach(state => {
     *         let idx = allStates.indexOf(state);
     *         if (idx !== -1) allStates.splice(idx, 1);
     *       });
     *       break;
     *   }
     * });
     * ```
     *
     * @param listener a callback function invoked when the registered states changes.
     *        The function receives two parameters, `event` and `state`.
     *        See [[StateRegistryListener]]
     * @return a function that deregisters the listener
     */
    StateRegistry.prototype.onStatesChanged = function (listener) {
        this.listeners.push(listener);
        return function deregisterListener() {
            common_1.removeFrom(this.listeners)(listener);
        }.bind(this);
    };
    /**
     * Gets the implicit root state
     *
     * Gets the root of the state tree.
     * The root state is implicitly created by UI-Router.
     * Note: this returns the internal [[StateObject]] representation, not a [[StateDeclaration]]
     *
     * @return the root [[StateObject]]
     */
    StateRegistry.prototype.root = function () {
        return this._root;
    };
    /**
     * Adds a state to the registry
     *
     * Registers a [[StateDeclaration]] or queues it for registration.
     *
     * Note: a state will be queued if the state's parent isn't yet registered.
     *
     * @param stateDefinition the definition of the state to register.
     * @returns the internal [[StateObject]] object.
     *          If the state was successfully registered, then the object is fully built (See: [[StateBuilder]]).
     *          If the state was only queued, then the object is not fully built.
     */
    StateRegistry.prototype.register = function (stateDefinition) {
        return this.stateQueue.register(stateDefinition);
    };
    /** @hidden */
    StateRegistry.prototype._deregisterTree = function (state) {
        var _this = this;
        var all = this.get().map(function (s) { return s.$$state(); });
        var getChildren = function (states) {
            var children = all.filter(function (s) { return states.indexOf(s.parent) !== -1; });
            return children.length === 0 ? children : children.concat(getChildren(children));
        };
        var children = getChildren([state]);
        var deregistered = [state].concat(children).reverse();
        deregistered.forEach(function (state) {
            var $ur = _this._router.urlRouter;
            // Remove URL rule
            $ur.rules().filter(hof_1.propEq("state", state)).forEach($ur.removeRule.bind($ur));
            // Remove state from registry
            delete _this.states[state.name];
        });
        return deregistered;
    };
    /**
     * Removes a state from the registry
     *
     * This removes a state from the registry.
     * If the state has children, they are are also removed from the registry.
     *
     * @param stateOrName the state's name or object representation
     * @returns {StateObject[]} a list of removed states
     */
    StateRegistry.prototype.deregister = function (stateOrName) {
        var _state = this.get(stateOrName);
        if (!_state)
            throw new Error("Can't deregister state; not found: " + stateOrName);
        var deregisteredStates = this._deregisterTree(_state.$$state());
        this.listeners.forEach(function (listener) { return listener("deregistered", deregisteredStates.map(function (s) { return s.self; })); });
        return deregisteredStates;
    };
    StateRegistry.prototype.get = function (stateOrName, base) {
        var _this = this;
        if (arguments.length === 0)
            return Object.keys(this.states).map(function (name) { return _this.states[name].self; });
        var found = this.matcher.find(stateOrName, base);
        return found && found.self || null;
    };
    StateRegistry.prototype.decorator = function (name, func) {
        return this.builder.builder(name, func);
    };
    return StateRegistry;
}());
exports.StateRegistry = StateRegistry;
//# sourceMappingURL=stateRegistry.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module state
 */
/** */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var queue_1 = __webpack_require__(25);
var coreservices_1 = __webpack_require__(4);
var pathFactory_1 = __webpack_require__(19);
var pathNode_1 = __webpack_require__(27);
var transitionService_1 = __webpack_require__(30);
var rejectFactory_1 = __webpack_require__(14);
var targetState_1 = __webpack_require__(9);
var param_1 = __webpack_require__(10);
var glob_1 = __webpack_require__(17);
var resolveContext_1 = __webpack_require__(20);
var lazyLoad_1 = __webpack_require__(36);
var hof_1 = __webpack_require__(2);
/**
 * Provides state related service functions
 *
 * This class provides services related to ui-router states.
 * An instance of this class is located on the global [[UIRouter]] object.
 */
var StateService = (function () {
    /** @internalapi */
    function StateService(router) {
        this.router = router;
        /** @internalapi */
        this.invalidCallbacks = [];
        /** @hidden */
        this._defaultErrorHandler = function $defaultErrorHandler($error$) {
            if ($error$ instanceof Error && $error$.stack) {
                console.error($error$);
                console.error($error$.stack);
            }
            else if ($error$ instanceof rejectFactory_1.Rejection) {
                console.error($error$.toString());
                if ($error$.detail && $error$.detail.stack)
                    console.error($error$.detail.stack);
            }
            else {
                console.error($error$);
            }
        };
        var getters = ['current', '$current', 'params', 'transition'];
        var boundFns = Object.keys(StateService.prototype).filter(hof_1.not(common_1.inArray(getters)));
        common_1.createProxyFunctions(hof_1.val(StateService.prototype), this, hof_1.val(this), boundFns);
    }
    Object.defineProperty(StateService.prototype, "transition", {
        /**
         * The [[Transition]] currently in progress (or null)
         *
         * This is a passthrough through to [[UIRouterGlobals.transition]]
         */
        get: function () { return this.router.globals.transition; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "params", {
        /**
         * The latest successful state parameters
         *
         * This is a passthrough through to [[UIRouterGlobals.params]]
         */
        get: function () { return this.router.globals.params; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "current", {
        /**
         * The current [[StateDeclaration]]
         *
         * This is a passthrough through to [[UIRouterGlobals.current]]
         */
        get: function () { return this.router.globals.current; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "$current", {
        /**
         * The current [[StateObject]]
         *
         * This is a passthrough through to [[UIRouterGlobals.$current]]
         */
        get: function () { return this.router.globals.$current; },
        enumerable: true,
        configurable: true
    });
    /** @internalapi */
    StateService.prototype.dispose = function () {
        this.defaultErrorHandler(common_1.noop);
        this.invalidCallbacks = [];
    };
    /**
     * Handler for when [[transitionTo]] is called with an invalid state.
     *
     * Invokes the [[onInvalid]] callbacks, in natural order.
     * Each callback's return value is checked in sequence until one of them returns an instance of TargetState.
     * The results of the callbacks are wrapped in $q.when(), so the callbacks may return promises.
     *
     * If a callback returns an TargetState, then it is used as arguments to $state.transitionTo() and the result returned.
     *
     * @internalapi
     */
    StateService.prototype._handleInvalidTargetState = function (fromPath, toState) {
        var _this = this;
        var fromState = pathFactory_1.PathUtils.makeTargetState(fromPath);
        var globals = this.router.globals;
        var latestThing = function () { return globals.transitionHistory.peekTail(); };
        var latest = latestThing();
        var callbackQueue = new queue_1.Queue(this.invalidCallbacks.slice());
        var injector = new resolveContext_1.ResolveContext(fromPath).injector();
        var checkForRedirect = function (result) {
            if (!(result instanceof targetState_1.TargetState)) {
                return;
            }
            var target = result;
            // Recreate the TargetState, in case the state is now defined.
            target = _this.target(target.identifier(), target.params(), target.options());
            if (!target.valid()) {
                return rejectFactory_1.Rejection.invalid(target.error()).toPromise();
            }
            if (latestThing() !== latest) {
                return rejectFactory_1.Rejection.superseded().toPromise();
            }
            return _this.transitionTo(target.identifier(), target.params(), target.options());
        };
        function invokeNextCallback() {
            var nextCallback = callbackQueue.dequeue();
            if (nextCallback === undefined)
                return rejectFactory_1.Rejection.invalid(toState.error()).toPromise();
            var callbackResult = coreservices_1.services.$q.when(nextCallback(toState, fromState, injector));
            return callbackResult.then(checkForRedirect).then(function (result) { return result || invokeNextCallback(); });
        }
        return invokeNextCallback();
    };
    /**
     * Registers an Invalid State handler
     *
     * Registers a [[OnInvalidCallback]] function to be invoked when [[StateService.transitionTo]]
     * has been called with an invalid state reference parameter
     *
     * Example:
     * ```js
     * stateService.onInvalid(function(to, from, injector) {
     *   if (to.name() === 'foo') {
     *     let lazyLoader = injector.get('LazyLoadService');
     *     return lazyLoader.load('foo')
     *         .then(() => stateService.target('foo'));
     *   }
     * });
     * ```
     *
     * @param {function} callback invoked when the toState is invalid
     *   This function receives the (invalid) toState, the fromState, and an injector.
     *   The function may optionally return a [[TargetState]] or a Promise for a TargetState.
     *   If one is returned, it is treated as a redirect.
     *
     * @returns a function which deregisters the callback
     */
    StateService.prototype.onInvalid = function (callback) {
        this.invalidCallbacks.push(callback);
        return function deregisterListener() {
            common_1.removeFrom(this.invalidCallbacks)(callback);
        }.bind(this);
    };
    /**
     * Reloads the current state
     *
     * A method that force reloads the current state, or a partial state hierarchy.
     * All resolves are re-resolved, and components reinstantiated.
     *
     * #### Example:
     * ```js
     * let app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   }
     * });
     * ```
     *
     * Note: `reload()` is just an alias for:
     *
     * ```js
     * $state.transitionTo($state.current, $state.params, {
     *   reload: true, inherit: false
     * });
     * ```
     *
     * @param reloadState A state name or a state object.
     *    If present, this state and all its children will be reloaded, but ancestors will not reload.
     *
     * #### Example:
     * ```js
     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item'
     * //and current state is 'contacts.detail.item'
     * let app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     //will reload 'contact.detail' and nested 'contact.detail.item' states
     *     $state.reload('contact.detail');
     *   }
     * });
     * ```
     *
     * @returns A promise representing the state of the new transition. See [[StateService.go]]
     */
    StateService.prototype.reload = function (reloadState) {
        return this.transitionTo(this.current, this.params, {
            reload: predicates_1.isDefined(reloadState) ? reloadState : true,
            inherit: false,
            notify: false,
        });
    };
    ;
    /**
     * Transition to a different state and/or parameters
     *
     * Convenience method for transitioning to a new state.
     *
     * `$state.go` calls `$state.transitionTo` internally but automatically sets options to
     * `{ location: true, inherit: true, relative: router.globals.$current, notify: true }`.
     * This allows you to use either an absolute or relative `to` argument (because of `relative: router.globals.$current`).
     * It also allows you to specify * only the parameters you'd like to update, while letting unspecified parameters
     * inherit from the current parameter values (because of `inherit: true`).
     *
     * #### Example:
     * ```js
     * let app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   };
     * });
     * ```
     *
     * @param to Absolute state name, state object, or relative state path (relative to current state).
     *
     * Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to the parent state
     * - `$state.go('^.sibling')` - if current state is `home.child`, will go to the `home.sibling` state
     * - `$state.go('.child.grandchild')` - if current state is home, will go to the `home.child.grandchild` state
     *
     * @param params A map of the parameters that will be sent to the state, will populate $stateParams.
     *
     *    Any parameters that are not specified will be inherited from current parameter values (because of `inherit: true`).
     *    This allows, for example, going to a sibling state that shares parameters defined by a parent state.
     *
     * @param options Transition options
     *
     * @returns {promise} A promise representing the state of the new transition.
     */
    StateService.prototype.go = function (to, params, options) {
        var defautGoOpts = { relative: this.$current, inherit: true };
        var transOpts = common_1.defaults(options, defautGoOpts, transitionService_1.defaultTransOpts);
        return this.transitionTo(to, params, transOpts);
    };
    ;
    /**
     * Creates a [[TargetState]]
     *
     * This is a factory method for creating a TargetState
     *
     * This may be returned from a Transition Hook to redirect a transition, for example.
     */
    StateService.prototype.target = function (identifier, params, options) {
        if (options === void 0) { options = {}; }
        // If we're reloading, find the state object to reload from
        if (predicates_1.isObject(options.reload) && !options.reload.name)
            throw new Error('Invalid reload state object');
        var reg = this.router.stateRegistry;
        options.reloadState = options.reload === true ? reg.root() : reg.matcher.find(options.reload, options.relative);
        if (options.reload && !options.reloadState)
            throw new Error("No such reload state '" + (predicates_1.isString(options.reload) ? options.reload : options.reload.name) + "'");
        var stateDefinition = reg.matcher.find(identifier, options.relative);
        return new targetState_1.TargetState(identifier, stateDefinition, params, options);
    };
    ;
    StateService.prototype.getCurrentPath = function () {
        var _this = this;
        var globals = this.router.globals;
        var latestSuccess = globals.successfulTransitions.peekTail();
        var rootPath = function () { return [new pathNode_1.PathNode(_this.router.stateRegistry.root())]; };
        return latestSuccess ? latestSuccess.treeChanges().to : rootPath();
    };
    /**
     * Low-level method for transitioning to a new state.
     *
     * The [[go]] method (which uses `transitionTo` internally) is recommended in most situations.
     *
     * #### Example:
     * ```js
     * let app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   };
     * });
     * ```
     *
     * @param to State name or state object.
     * @param toParams A map of the parameters that will be sent to the state,
     *      will populate $stateParams.
     * @param options Transition options
     *
     * @returns A promise representing the state of the new transition. See [[go]]
     */
    StateService.prototype.transitionTo = function (to, toParams, options) {
        var _this = this;
        if (toParams === void 0) { toParams = {}; }
        if (options === void 0) { options = {}; }
        var router = this.router;
        var globals = router.globals;
        options = common_1.defaults(options, transitionService_1.defaultTransOpts);
        var getCurrent = function () {
            return globals.transition;
        };
        options = common_1.extend(options, { current: getCurrent });
        var ref = this.target(to, toParams, options);
        var currentPath = this.getCurrentPath();
        if (!ref.exists())
            return this._handleInvalidTargetState(currentPath, ref);
        if (!ref.valid())
            return common_1.silentRejection(ref.error());
        /**
         * Special handling for Ignored, Aborted, and Redirected transitions
         *
         * The semantics for the transition.run() promise and the StateService.transitionTo()
         * promise differ. For instance, the run() promise may be rejected because it was
         * IGNORED, but the transitionTo() promise is resolved because from the user perspective
         * no error occurred.  Likewise, the transition.run() promise may be rejected because of
         * a Redirect, but the transitionTo() promise is chained to the new Transition's promise.
         */
        var rejectedTransitionHandler = function (transition) { return function (error) {
            if (error instanceof rejectFactory_1.Rejection) {
                var isLatest = router.globals.lastStartedTransitionId === transition.$id;
                if (error.type === rejectFactory_1.RejectType.IGNORED) {
                    isLatest && router.urlRouter.update();
                    // Consider ignored `Transition.run()` as a successful `transitionTo`
                    return coreservices_1.services.$q.when(globals.current);
                }
                var detail = error.detail;
                if (error.type === rejectFactory_1.RejectType.SUPERSEDED && error.redirected && detail instanceof targetState_1.TargetState) {
                    // If `Transition.run()` was redirected, allow the `transitionTo()` promise to resolve successfully
                    // by returning the promise for the new (redirect) `Transition.run()`.
                    var redirect = transition.redirect(detail);
                    return redirect.run().catch(rejectedTransitionHandler(redirect));
                }
                if (error.type === rejectFactory_1.RejectType.ABORTED) {
                    isLatest && router.urlRouter.update();
                    return coreservices_1.services.$q.reject(error);
                }
            }
            var errorHandler = _this.defaultErrorHandler();
            errorHandler(error);
            return coreservices_1.services.$q.reject(error);
        }; };
        var transition = this.router.transitionService.create(currentPath, ref);
        var transitionToPromise = transition.run().catch(rejectedTransitionHandler(transition));
        common_1.silenceUncaughtInPromise(transitionToPromise); // issue #2676
        // Return a promise for the transition, which also has the transition object on it.
        return common_1.extend(transitionToPromise, { transition: transition });
    };
    ;
    /**
     * Checks if the current state *is* the provided state
     *
     * Similar to [[includes]] but only checks for the full state name.
     * If params is supplied then it will be tested for strict equality against the current
     * active params object, so all params must match with none missing and no extras.
     *
     * #### Example:
     * ```js
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     * ```
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * ```html
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
     * ```
     *
     * @param stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param params A param object, e.g. `{sectionId: section.id}`, that you'd like
     * to test against the current active state.
     * @param options An options object. The options are:
     *   - `relative`: If `stateOrName` is a relative state name and `options.relative` is set, .is will
     *     test relative to `options.relative` state (or name).
     *
     * @returns Returns true if it is the state.
     */
    StateService.prototype.is = function (stateOrName, params, options) {
        options = common_1.defaults(options, { relative: this.$current });
        var state = this.router.stateRegistry.matcher.find(stateOrName, options.relative);
        if (!predicates_1.isDefined(state))
            return undefined;
        if (this.$current !== state)
            return false;
        if (!params)
            return true;
        var schema = state.parameters({ inherit: true, matchingKeys: params });
        return param_1.Param.equals(schema, param_1.Param.values(schema, params), this.params);
    };
    ;
    /**
     * Checks if the current state *includes* the provided state
     *
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * #### Example when `$state.$current.name === 'contacts.details.item'`
     * ```js
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     * ```
     *
     * #### Glob Examples when `* $state.$current.name === 'contacts.details.item.url'`:
     * ```js
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * ```
     *
     * @param stateOrName A partial name, relative name, glob pattern,
     *   or state object to be searched for within the current state name.
     * @param params A param object, e.g. `{sectionId: section.id}`,
     *   that you'd like to test against the current active state.
     * @param options An options object. The options are:
     *   - `relative`: If `stateOrName` is a relative state name and `options.relative` is set, .is will
     *     test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it does include the state
     */
    StateService.prototype.includes = function (stateOrName, params, options) {
        options = common_1.defaults(options, { relative: this.$current });
        var glob = predicates_1.isString(stateOrName) && glob_1.Glob.fromString(stateOrName);
        if (glob) {
            if (!glob.matches(this.$current.name))
                return false;
            stateOrName = this.$current.name;
        }
        var state = this.router.stateRegistry.matcher.find(stateOrName, options.relative), include = this.$current.includes;
        if (!predicates_1.isDefined(state))
            return undefined;
        if (!predicates_1.isDefined(include[state.name]))
            return false;
        if (!params)
            return true;
        var schema = state.parameters({ inherit: true, matchingKeys: params });
        return param_1.Param.equals(schema, param_1.Param.values(schema, params), this.params);
    };
    ;
    /**
     * Generates a URL for a state and parameters
     *
     * Returns the url for the given state populated with the given params.
     *
     * #### Example:
     * ```js
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
     * ```
     *
     * @param stateOrName The state name or state object you'd like to generate a url from.
     * @param params An object of parameter values to fill the state's required parameters.
     * @param options Options object. The options are:
     *
     * @returns {string} compiled state url
     */
    StateService.prototype.href = function (stateOrName, params, options) {
        var defaultHrefOpts = {
            lossy: true,
            inherit: true,
            absolute: false,
            relative: this.$current,
        };
        options = common_1.defaults(options, defaultHrefOpts);
        params = params || {};
        var state = this.router.stateRegistry.matcher.find(stateOrName, options.relative);
        if (!predicates_1.isDefined(state))
            return null;
        if (options.inherit)
            params = this.params.$inherit(params, this.$current, state);
        var nav = (state && options.lossy) ? state.navigable : state;
        if (!nav || nav.url === undefined || nav.url === null) {
            return null;
        }
        return this.router.urlRouter.href(nav.url, params, {
            absolute: options.absolute,
        });
    };
    ;
    /**
     * Sets or gets the default [[transitionTo]] error handler.
     *
     * The error handler is called when a [[Transition]] is rejected or when any error occurred during the Transition.
     * This includes errors caused by resolves and transition hooks.
     *
     * Note:
     * This handler does not receive certain Transition rejections.
     * Redirected and Ignored Transitions are not considered to be errors by [[StateService.transitionTo]].
     *
     * The built-in default error handler logs the error to the console.
     *
     * You can provide your own custom handler.
     *
     * #### Example:
     * ```js
     * stateService.defaultErrorHandler(function() {
     *   // Do not log transitionTo errors
     * });
     * ```
     *
     * @param handler a global error handler function
     * @returns the current global error handler
     */
    StateService.prototype.defaultErrorHandler = function (handler) {
        return this._defaultErrorHandler = handler || this._defaultErrorHandler;
    };
    StateService.prototype.get = function (stateOrName, base) {
        var reg = this.router.stateRegistry;
        if (arguments.length === 0)
            return reg.get();
        return reg.get(stateOrName, base || this.$current);
    };
    /**
     * Lazy loads a state
     *
     * Explicitly runs a state's [[StateDeclaration.lazyLoad]] function.
     *
     * @param stateOrName the state that should be lazy loaded
     * @param transition the optional Transition context to use (if the lazyLoad function requires an injector, etc)
     * Note: If no transition is provided, a noop transition is created using the from the current state to the current state.
     * This noop transition is not actually run.
     *
     * @returns a promise to lazy load
     */
    StateService.prototype.lazyLoad = function (stateOrName, transition) {
        var state = this.get(stateOrName);
        if (!state || !state.lazyLoad)
            throw new Error("Can not lazy load " + stateOrName);
        var currentPath = this.getCurrentPath();
        var target = pathFactory_1.PathUtils.makeTargetState(currentPath);
        transition = transition || this.router.transitionService.create(currentPath, target);
        return lazyLoad_1.lazyLoadState(transition, state);
    };
    return StateService;
}());
exports.StateService = StateService;
//# sourceMappingURL=stateService.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @coreapi
 * @module transition
 */ /** for typedoc */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var interface_1 = __webpack_require__(11);
var transitionHook_1 = __webpack_require__(15);
/**
 * This class returns applicable TransitionHooks for a specific Transition instance.
 *
 * Hooks ([[RegisteredHook]]) may be registered globally, e.g., $transitions.onEnter(...), or locally, e.g.
 * myTransition.onEnter(...).  The HookBuilder finds matching RegisteredHooks (where the match criteria is
 * determined by the type of hook)
 *
 * The HookBuilder also converts RegisteredHooks objects to TransitionHook objects, which are used to run a Transition.
 *
 * The HookBuilder constructor is given the $transitions service and a Transition instance.  Thus, a HookBuilder
 * instance may only be used for one specific Transition object. (side note: the _treeChanges accessor is private
 * in the Transition class, so we must also provide the Transition's _treeChanges)
 *
 */
var HookBuilder = (function () {
    function HookBuilder(transition) {
        this.transition = transition;
    }
    HookBuilder.prototype.buildHooksForPhase = function (phase) {
        var _this = this;
        var $transitions = this.transition.router.transitionService;
        return $transitions._pluginapi._getEvents(phase)
            .map(function (type) { return _this.buildHooks(type); })
            .reduce(common_1.unnestR, [])
            .filter(common_1.identity);
    };
    /**
     * Returns an array of newly built TransitionHook objects.
     *
     * - Finds all RegisteredHooks registered for the given `hookType` which matched the transition's [[TreeChanges]].
     * - Finds [[PathNode]] (or `PathNode[]`) to use as the TransitionHook context(s)
     * - For each of the [[PathNode]]s, creates a TransitionHook
     *
     * @param hookType the type of the hook registration function, e.g., 'onEnter', 'onFinish'.
     */
    HookBuilder.prototype.buildHooks = function (hookType) {
        var transition = this.transition;
        var treeChanges = transition.treeChanges();
        // Find all the matching registered hooks for a given hook type
        var matchingHooks = this.getMatchingHooks(hookType, treeChanges);
        if (!matchingHooks)
            return [];
        var baseHookOptions = {
            transition: transition,
            current: transition.options().current
        };
        var makeTransitionHooks = function (hook) {
            // Fetch the Nodes that caused this hook to match.
            var matches = hook.matches(treeChanges);
            // Select the PathNode[] that will be used as TransitionHook context objects
            var matchingNodes = matches[hookType.criteriaMatchPath.name];
            // Return an array of HookTuples
            return matchingNodes.map(function (node) {
                var _options = common_1.extend({
                    bind: hook.bind,
                    traceData: { hookType: hookType.name, context: node }
                }, baseHookOptions);
                var state = hookType.criteriaMatchPath.scope === interface_1.TransitionHookScope.STATE ? node.state.self : null;
                var transitionHook = new transitionHook_1.TransitionHook(transition, state, hook, _options);
                return { hook: hook, node: node, transitionHook: transitionHook };
            });
        };
        return matchingHooks.map(makeTransitionHooks)
            .reduce(common_1.unnestR, [])
            .sort(tupleSort(hookType.reverseSort))
            .map(function (tuple) { return tuple.transitionHook; });
    };
    /**
     * Finds all RegisteredHooks from:
     * - The Transition object instance hook registry
     * - The TransitionService ($transitions) global hook registry
     *
     * which matched:
     * - the eventType
     * - the matchCriteria (to, from, exiting, retained, entering)
     *
     * @returns an array of matched [[RegisteredHook]]s
     */
    HookBuilder.prototype.getMatchingHooks = function (hookType, treeChanges) {
        var isCreate = hookType.hookPhase === interface_1.TransitionHookPhase.CREATE;
        // Instance and Global hook registries
        var $transitions = this.transition.router.transitionService;
        var registries = isCreate ? [$transitions] : [this.transition, $transitions];
        return registries.map(function (reg) { return reg.getHooks(hookType.name); }) // Get named hooks from registries
            .filter(common_1.assertPredicate(predicates_1.isArray, "broken event named: " + hookType.name)) // Sanity check
            .reduce(common_1.unnestR, []) // Un-nest RegisteredHook[][] to RegisteredHook[] array
            .filter(function (hook) { return hook.matches(treeChanges); }); // Only those satisfying matchCriteria
    };
    return HookBuilder;
}());
exports.HookBuilder = HookBuilder;
/**
 * A factory for a sort function for HookTuples.
 *
 * The sort function first compares the PathNode depth (how deep in the state tree a node is), then compares
 * the EventHook priority.
 *
 * @param reverseDepthSort a boolean, when true, reverses the sort order for the node depth
 * @returns a tuple sort function
 */
function tupleSort(reverseDepthSort) {
    if (reverseDepthSort === void 0) { reverseDepthSort = false; }
    return function nodeDepthThenPriority(l, r) {
        var factor = reverseDepthSort ? -1 : 1;
        var depthDelta = (l.node.state.path.length - r.node.state.path.length) * factor;
        return depthDelta !== 0 ? depthDelta : r.hook.priority - l.hook.priority;
    };
}
//# sourceMappingURL=hookBuilder.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transitionHook_1 = __webpack_require__(15);
/**
 * This class defines a type of hook, such as `onBefore` or `onEnter`.
 * Plugins can define custom hook types, such as sticky states does for `onInactive`.
 *
 * @interalapi
 */
var TransitionEventType = (function () {
    function TransitionEventType(name, hookPhase, hookOrder, criteriaMatchPath, reverseSort, getResultHandler, getErrorHandler, synchronous) {
        if (reverseSort === void 0) { reverseSort = false; }
        if (getResultHandler === void 0) { getResultHandler = transitionHook_1.TransitionHook.HANDLE_RESULT; }
        if (getErrorHandler === void 0) { getErrorHandler = transitionHook_1.TransitionHook.REJECT_ERROR; }
        if (synchronous === void 0) { synchronous = false; }
        this.name = name;
        this.hookPhase = hookPhase;
        this.hookOrder = hookOrder;
        this.criteriaMatchPath = criteriaMatchPath;
        this.reverseSort = reverseSort;
        this.getResultHandler = getResultHandler;
        this.getErrorHandler = getErrorHandler;
        this.synchronous = synchronous;
    }
    return TransitionEventType;
}());
exports.TransitionEventType = TransitionEventType;
//# sourceMappingURL=transitionEventType.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module url
 */ /** for typedoc */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var urlMatcher_1 = __webpack_require__(22);
var param_1 = __webpack_require__(10);
var paramTypes_1 = __webpack_require__(37);
/**
 * Factory for [[UrlMatcher]] instances.
 *
 * The factory is available to ng1 services as
 * `$urlMatcherFactor` or ng1 providers as `$urlMatcherFactoryProvider`.
 */
var UrlMatcherFactory = (function () {
    function UrlMatcherFactory() {
        var _this = this;
        /** @hidden */ this.paramTypes = new paramTypes_1.ParamTypes();
        /** @hidden */ this._isCaseInsensitive = false;
        /** @hidden */ this._isStrictMode = true;
        /** @hidden */ this._defaultSquashPolicy = false;
        /** @hidden */
        this._getConfig = function (config) {
            return common_1.extend({ strict: _this._isStrictMode, caseInsensitive: _this._isCaseInsensitive }, config);
        };
        /** @internalapi Creates a new [[Param]] for a given location (DefType) */
        this.paramFactory = {
            /** Creates a new [[Param]] from a CONFIG block */
            fromConfig: function (id, type, config) {
                return new param_1.Param(id, type, config, param_1.DefType.CONFIG, _this);
            },
            /** Creates a new [[Param]] from a url PATH */
            fromPath: function (id, type, config) {
                return new param_1.Param(id, type, config, param_1.DefType.PATH, _this);
            },
            /** Creates a new [[Param]] from a url SEARCH */
            fromSearch: function (id, type, config) {
                return new param_1.Param(id, type, config, param_1.DefType.SEARCH, _this);
            },
        };
        common_1.extend(this, { UrlMatcher: urlMatcher_1.UrlMatcher, Param: param_1.Param });
    }
    /** @inheritdoc */
    UrlMatcherFactory.prototype.caseInsensitive = function (value) {
        return this._isCaseInsensitive = predicates_1.isDefined(value) ? value : this._isCaseInsensitive;
    };
    /** @inheritdoc */
    UrlMatcherFactory.prototype.strictMode = function (value) {
        return this._isStrictMode = predicates_1.isDefined(value) ? value : this._isStrictMode;
    };
    /** @inheritdoc */
    UrlMatcherFactory.prototype.defaultSquashPolicy = function (value) {
        if (predicates_1.isDefined(value) && value !== true && value !== false && !predicates_1.isString(value))
            throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
        return this._defaultSquashPolicy = predicates_1.isDefined(value) ? value : this._defaultSquashPolicy;
    };
    /**
     * Creates a [[UrlMatcher]] for the specified pattern.
     *
     * @param pattern  The URL pattern.
     * @param config  The config object hash.
     * @returns The UrlMatcher.
     */
    UrlMatcherFactory.prototype.compile = function (pattern, config) {
        return new urlMatcher_1.UrlMatcher(pattern, this.paramTypes, this.paramFactory, this._getConfig(config));
    };
    /**
     * Returns true if the specified object is a [[UrlMatcher]], or false otherwise.
     *
     * @param object  The object to perform the type check against.
     * @returns `true` if the object matches the `UrlMatcher` interface, by
     *          implementing all the same methods.
     */
    UrlMatcherFactory.prototype.isMatcher = function (object) {
        // TODO: typeof?
        if (!predicates_1.isObject(object))
            return false;
        var result = true;
        common_1.forEach(urlMatcher_1.UrlMatcher.prototype, function (val, name) {
            if (predicates_1.isFunction(val))
                result = result && (predicates_1.isDefined(object[name]) && predicates_1.isFunction(object[name]));
        });
        return result;
    };
    ;
    /**
     * Creates and registers a custom [[ParamType]] object
     *
     * A [[ParamType]] can be used to generate URLs with typed parameters.
     *
     * @param name  The type name.
     * @param definition The type definition. See [[ParamTypeDefinition]] for information on the values accepted.
     * @param definitionFn A function that is injected before the app runtime starts.
     *        The result of this function should be a [[ParamTypeDefinition]].
     *        The result is merged into the existing `definition`.
     *        See [[ParamType]] for information on the values accepted.
     *
     * @returns - if a type was registered: the [[UrlMatcherFactory]]
     *   - if only the `name` parameter was specified: the currently registered [[ParamType]] object, or undefined
     *
     * Note: Register custom types *before using them* in a state definition.
     *
     * See [[ParamTypeDefinition]] for examples
     */
    UrlMatcherFactory.prototype.type = function (name, definition, definitionFn) {
        var type = this.paramTypes.type(name, definition, definitionFn);
        return !predicates_1.isDefined(definition) ? type : this;
    };
    ;
    /** @hidden */
    UrlMatcherFactory.prototype.$get = function () {
        this.paramTypes.enqueue = false;
        this.paramTypes._flushTypeQueue();
        return this;
    };
    ;
    /** @internalapi */
    UrlMatcherFactory.prototype.dispose = function () {
        this.paramTypes.dispose();
    };
    return UrlMatcherFactory;
}());
exports.UrlMatcherFactory = UrlMatcherFactory;
//# sourceMappingURL=urlMatcherFactory.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module url
 */
/** for typedoc */
var common_1 = __webpack_require__(0);
var predicates_1 = __webpack_require__(1);
var urlMatcher_1 = __webpack_require__(22);
var hof_1 = __webpack_require__(2);
var urlRule_1 = __webpack_require__(50);
var targetState_1 = __webpack_require__(9);
/** @hidden */
function appendBasePath(url, isHtml5, absolute, baseHref) {
    if (baseHref === '/')
        return url;
    if (isHtml5)
        return baseHref.slice(0, -1) + url;
    if (absolute)
        return baseHref.slice(1) + url;
    return url;
}
/** @hidden */
var getMatcher = hof_1.prop("urlMatcher");
/**
 * Default rule priority sorting function.
 *
 * Sorts rules by:
 *
 * - Explicit priority (set rule priority using [[UrlRulesApi.when]])
 * - Rule type (STATE: 4, URLMATCHER: 4, REGEXP: 3, RAW: 2, OTHER: 1)
 * - `UrlMatcher` specificity ([[UrlMatcher.compare]]): works for STATE and URLMATCHER types to pick the most specific rule.
 * - Registration order (for rule types other than STATE and URLMATCHER)
 *
 * @coreapi
 */
var defaultRuleSortFn;
defaultRuleSortFn = common_1.composeSort(common_1.sortBy(hof_1.pipe(hof_1.prop("priority"), function (x) { return -x; })), common_1.sortBy(hof_1.pipe(hof_1.prop("type"), function (type) { return ({ "STATE": 4, "URLMATCHER": 4, "REGEXP": 3, "RAW": 2, "OTHER": 1 })[type]; })), function (a, b) { return (getMatcher(a) && getMatcher(b)) ? urlMatcher_1.UrlMatcher.compare(getMatcher(a), getMatcher(b)) : 0; }, common_1.sortBy(hof_1.prop("$id"), common_1.inArray(["REGEXP", "RAW", "OTHER"])));
/**
 * Updates URL and responds to URL changes
 *
 * ### Deprecation warning:
 * This class is now considered to be an internal API
 * Use the [[UrlService]] instead.
 * For configuring URL rules, use the [[UrlRulesApi]] which can be found as [[UrlService.rules]].
 *
 * This class updates the URL when the state changes.
 * It also responds to changes in the URL.
 */
var UrlRouter = (function () {
    /** @hidden */
    function UrlRouter(router) {
        /** @hidden */ this._sortFn = defaultRuleSortFn;
        /** @hidden */ this._rules = [];
        /** @hidden */ this.interceptDeferred = false;
        /** @hidden */ this._id = 0;
        /** @hidden */ this._sorted = false;
        this._router = router;
        this.urlRuleFactory = new urlRule_1.UrlRuleFactory(router);
        common_1.createProxyFunctions(hof_1.val(UrlRouter.prototype), this, hof_1.val(this));
    }
    /** @internalapi */
    UrlRouter.prototype.dispose = function () {
        this.listen(false);
        this._rules = [];
        delete this._otherwiseFn;
    };
    /** @inheritdoc */
    UrlRouter.prototype.sort = function (compareFn) {
        this._rules.sort(this._sortFn = compareFn || this._sortFn);
        this._sorted = true;
    };
    UrlRouter.prototype.ensureSorted = function () {
        this._sorted || this.sort();
    };
    /**
     * Given a URL, check all rules and return the best [[MatchResult]]
     * @param url
     * @returns {MatchResult}
     */
    UrlRouter.prototype.match = function (url) {
        var _this = this;
        this.ensureSorted();
        url = common_1.extend({ path: '', search: {}, hash: '' }, url);
        var rules = this.rules();
        if (this._otherwiseFn)
            rules.push(this._otherwiseFn);
        // Checks a single rule. Returns { rule: rule, match: match, weight: weight } if it matched, or undefined
        var checkRule = function (rule) {
            var match = rule.match(url, _this._router);
            return match && { match: match, rule: rule, weight: rule.matchPriority(match) };
        };
        // The rules are pre-sorted.
        // - Find the first matching rule.
        // - Find any other matching rule that sorted *exactly the same*, according to `.sort()`.
        // - Choose the rule with the highest match weight.
        var best;
        for (var i = 0; i < rules.length; i++) {
            // Stop when there is a 'best' rule and the next rule sorts differently than it.
            if (best && this._sortFn(rules[i], best.rule) !== 0)
                break;
            var current = checkRule(rules[i]);
            // Pick the best MatchResult
            best = (!best || current && current.weight > best.weight) ? current : best;
        }
        return best;
    };
    /** @inheritdoc */
    UrlRouter.prototype.sync = function (evt) {
        if (evt && evt.defaultPrevented)
            return;
        var router = this._router, $url = router.urlService, $state = router.stateService;
        var url = {
            path: $url.path(), search: $url.search(), hash: $url.hash(),
        };
        var best = this.match(url);
        var applyResult = hof_1.pattern([
            [predicates_1.isString, function (newurl) { return $url.url(newurl, true); }],
            [targetState_1.TargetState.isDef, function (def) { return $state.go(def.state, def.params, def.options); }],
            [hof_1.is(targetState_1.TargetState), function (target) { return $state.go(target.state(), target.params(), target.options()); }],
        ]);
        applyResult(best && best.rule.handler(best.match, url, router));
    };
    /** @inheritdoc */
    UrlRouter.prototype.listen = function (enabled) {
        var _this = this;
        if (enabled === false) {
            this._stopFn && this._stopFn();
            delete this._stopFn;
        }
        else {
            return this._stopFn = this._stopFn || this._router.urlService.onChange(function (evt) { return _this.sync(evt); });
        }
    };
    /**
     * Internal API.
     * @internalapi
     */
    UrlRouter.prototype.update = function (read) {
        var $url = this._router.locationService;
        if (read) {
            this.location = $url.path();
            return;
        }
        if ($url.path() === this.location)
            return;
        $url.url(this.location, true);
    };
    /**
     * Internal API.
     *
     * Pushes a new location to the browser history.
     *
     * @internalapi
     * @param urlMatcher
     * @param params
     * @param options
     */
    UrlRouter.prototype.push = function (urlMatcher, params, options) {
        var replace = options && !!options.replace;
        this._router.urlService.url(urlMatcher.format(params || {}), replace);
    };
    /**
     * Builds and returns a URL with interpolated parameters
     *
     * #### Example:
     * ```js
     * matcher = $umf.compile("/about/:person");
     * params = { person: "bob" };
     * $bob = $urlRouter.href(matcher, params);
     * // $bob == "/about/bob";
     * ```
     *
     * @param urlMatcher The [[UrlMatcher]] object which is used as the template of the URL to generate.
     * @param params An object of parameter values to fill the matcher's required parameters.
     * @param options Options object. The options are:
     *
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     *
     * @returns Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
     */
    UrlRouter.prototype.href = function (urlMatcher, params, options) {
        var url = urlMatcher.format(params);
        if (url == null)
            return null;
        options = options || { absolute: false };
        var cfg = this._router.urlService.config;
        var isHtml5 = cfg.html5Mode();
        if (!isHtml5 && url !== null) {
            url = "#" + cfg.hashPrefix() + url;
        }
        url = appendBasePath(url, isHtml5, options.absolute, cfg.baseHref());
        if (!options.absolute || !url) {
            return url;
        }
        var slash = (!isHtml5 && url ? '/' : ''), port = cfg.port();
        port = (port === 80 || port === 443 ? '' : ':' + port);
        return [cfg.protocol(), '://', cfg.host(), port, slash, url].join('');
    };
    /**
     * Manually adds a URL Rule.
     *
     * Usually, a url rule is added using [[StateDeclaration.url]] or [[when]].
     * This api can be used directly for more control (to register a [[BaseUrlRule]], for example).
     * Rules can be created using [[UrlRouter.urlRuleFactory]], or create manually as simple objects.
     *
     * A rule should have a `match` function which returns truthy if the rule matched.
     * It should also have a `handler` function which is invoked if the rule is the best match.
     *
     * @return a function that deregisters the rule
     */
    UrlRouter.prototype.rule = function (rule) {
        var _this = this;
        if (!urlRule_1.UrlRuleFactory.isUrlRule(rule))
            throw new Error("invalid rule");
        rule.$id = this._id++;
        rule.priority = rule.priority || 0;
        this._rules.push(rule);
        this._sorted = false;
        return function () { return _this.removeRule(rule); };
    };
    /** @inheritdoc */
    UrlRouter.prototype.removeRule = function (rule) {
        common_1.removeFrom(this._rules, rule);
    };
    /** @inheritdoc */
    UrlRouter.prototype.rules = function () {
        this.ensureSorted();
        return this._rules.slice();
    };
    /** @inheritdoc */
    UrlRouter.prototype.otherwise = function (handler) {
        var handlerFn = getHandlerFn(handler);
        this._otherwiseFn = this.urlRuleFactory.create(hof_1.val(true), handlerFn);
        this._sorted = false;
    };
    ;
    /** @inheritdoc */
    UrlRouter.prototype.initial = function (handler) {
        var handlerFn = getHandlerFn(handler);
        var matchFn = function (urlParts, router) {
            return router.globals.transitionHistory.size() === 0 && !!/^\/?$/.exec(urlParts.path);
        };
        this.rule(this.urlRuleFactory.create(matchFn, handlerFn));
    };
    ;
    /** @inheritdoc */
    UrlRouter.prototype.when = function (matcher, handler, options) {
        var rule = this.urlRuleFactory.create(matcher, handler);
        if (predicates_1.isDefined(options && options.priority))
            rule.priority = options.priority;
        this.rule(rule);
        return rule;
    };
    ;
    /** @inheritdoc */
    UrlRouter.prototype.deferIntercept = function (defer) {
        if (defer === undefined)
            defer = true;
        this.interceptDeferred = defer;
    };
    ;
    return UrlRouter;
}());
exports.UrlRouter = UrlRouter;
function getHandlerFn(handler) {
    if (!predicates_1.isFunction(handler) && !predicates_1.isString(handler) && !hof_1.is(targetState_1.TargetState)(handler) && !targetState_1.TargetState.isDef(handler)) {
        throw new Error("'handler' must be a string, function, TargetState, or have a state: 'newtarget' property");
    }
    return predicates_1.isFunction(handler) ? handler : hof_1.val(handler);
}
//# sourceMappingURL=urlRouter.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module url
 */ /** */
var urlMatcher_1 = __webpack_require__(22);
var predicates_1 = __webpack_require__(1);
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
/**
 * Creates a [[UrlRule]]
 *
 * Creates a [[UrlRule]] from a:
 *
 * - `string`
 * - [[UrlMatcher]]
 * - `RegExp`
 * - [[StateObject]]
 * @internalapi
 */
var UrlRuleFactory = (function () {
    function UrlRuleFactory(router) {
        this.router = router;
    }
    UrlRuleFactory.prototype.compile = function (str) {
        return this.router.urlMatcherFactory.compile(str);
    };
    UrlRuleFactory.prototype.create = function (what, handler) {
        var _this = this;
        var makeRule = hof_1.pattern([
            [predicates_1.isString, function (_what) { return makeRule(_this.compile(_what)); }],
            [hof_1.is(urlMatcher_1.UrlMatcher), function (_what) { return _this.fromUrlMatcher(_what, handler); }],
            [predicates_1.isState, function (_what) { return _this.fromState(_what, _this.router); }],
            [hof_1.is(RegExp), function (_what) { return _this.fromRegExp(_what, handler); }],
            [predicates_1.isFunction, function (_what) { return new BaseUrlRule(_what, handler); }],
        ]);
        var rule = makeRule(what);
        if (!rule)
            throw new Error("invalid 'what' in when()");
        return rule;
    };
    /**
     * A UrlRule which matches based on a UrlMatcher
     *
     * The `handler` may be either a `string`, a [[UrlRuleHandlerFn]] or another [[UrlMatcher]]
     *
     * ## Handler as a function
     *
     * If `handler` is a function, the function is invoked with:
     *
     * - matched parameter values ([[RawParams]] from [[UrlMatcher.exec]])
     * - url: the current Url ([[UrlParts]])
     * - router: the router object ([[UIRouter]])
     *
     * #### Example:
     * ```js
     * var urlMatcher = $umf.compile("/foo/:fooId/:barId");
     * var rule = factory.fromUrlMatcher(urlMatcher, match => "/home/" + match.fooId + "/" + match.barId);
     * var match = rule.match('/foo/123/456'); // results in { fooId: '123', barId: '456' }
     * var result = rule.handler(match); // '/home/123/456'
     * ```
     *
     * ## Handler as UrlMatcher
     *
     * If `handler` is a UrlMatcher, the handler matcher is used to create the new url.
     * The `handler` UrlMatcher is formatted using the matched param from the first matcher.
     * The url is replaced with the result.
     *
     * #### Example:
     * ```js
     * var urlMatcher = $umf.compile("/foo/:fooId/:barId");
     * var handler = $umf.compile("/home/:fooId/:barId");
     * var rule = factory.fromUrlMatcher(urlMatcher, handler);
     * var match = rule.match('/foo/123/456'); // results in { fooId: '123', barId: '456' }
     * var result = rule.handler(match); // '/home/123/456'
     * ```
     */
    UrlRuleFactory.prototype.fromUrlMatcher = function (urlMatcher, handler) {
        var _handler = handler;
        if (predicates_1.isString(handler))
            handler = this.router.urlMatcherFactory.compile(handler);
        if (hof_1.is(urlMatcher_1.UrlMatcher)(handler))
            _handler = function (match) { return handler.format(match); };
        function match(url) {
            var match = urlMatcher.exec(url.path, url.search, url.hash);
            return urlMatcher.validates(match) && match;
        }
        // Prioritize URLs, lowest to highest:
        // - Some optional URL parameters, but none matched
        // - No optional parameters in URL
        // - Some optional parameters, some matched
        // - Some optional parameters, all matched
        function matchPriority(params) {
            var optional = urlMatcher.parameters().filter(function (param) { return param.isOptional; });
            if (!optional.length)
                return 0.000001;
            var matched = optional.filter(function (param) { return params[param.id]; });
            return matched.length / optional.length;
        }
        var details = { urlMatcher: urlMatcher, matchPriority: matchPriority, type: "URLMATCHER" };
        return common_1.extend(new BaseUrlRule(match, _handler), details);
    };
    /**
     * A UrlRule which matches a state by its url
     *
     * #### Example:
     * ```js
     * var rule = factory.fromState($state.get('foo'), router);
     * var match = rule.match('/foo/123/456'); // results in { fooId: '123', barId: '456' }
     * var result = rule.handler(match);
     * // Starts a transition to 'foo' with params: { fooId: '123', barId: '456' }
     * ```
     */
    UrlRuleFactory.prototype.fromState = function (state, router) {
        /**
         * Handles match by transitioning to matched state
         *
         * First checks if the router should start a new transition.
         * A new transition is not required if the current state's URL
         * and the new URL are already identical
         */
        var handler = function (match) {
            var $state = router.stateService;
            var globals = router.globals;
            if ($state.href(state, match) !== $state.href(globals.current, globals.params)) {
                $state.transitionTo(state, match, { inherit: true, source: "url" });
            }
        };
        var details = { state: state, type: "STATE" };
        return common_1.extend(this.fromUrlMatcher(state.url, handler), details);
    };
    /**
     * A UrlRule which matches based on a regular expression
     *
     * The `handler` may be either a [[UrlRuleHandlerFn]] or a string.
     *
     * ## Handler as a function
     *
     * If `handler` is a function, the function is invoked with:
     *
     * - regexp match array (from `regexp`)
     * - url: the current Url ([[UrlParts]])
     * - router: the router object ([[UIRouter]])
     *
     * #### Example:
     * ```js
     * var rule = factory.fromRegExp(/^\/foo\/(bar|baz)$/, match => "/home/" + match[1])
     * var match = rule.match('/foo/bar'); // results in [ '/foo/bar', 'bar' ]
     * var result = rule.handler(match); // '/home/bar'
     * ```
     *
     * ## Handler as string
     *
     * If `handler` is a string, the url is *replaced by the string* when the Rule is invoked.
     * The string is first interpolated using `string.replace()` style pattern.
     *
     * #### Example:
     * ```js
     * var rule = factory.fromRegExp(/^\/foo\/(bar|baz)$/, "/home/$1")
     * var match = rule.match('/foo/bar'); // results in [ '/foo/bar', 'bar' ]
     * var result = rule.handler(match); // '/home/bar'
     * ```
     */
    UrlRuleFactory.prototype.fromRegExp = function (regexp, handler) {
        if (regexp.global || regexp.sticky)
            throw new Error("Rule RegExp must not be global or sticky");
        /**
         * If handler is a string, the url will be replaced by the string.
         * If the string has any String.replace() style variables in it (like `$2`),
         * they will be replaced by the captures from [[match]]
         */
        var redirectUrlTo = function (match) {
            // Interpolates matched values into $1 $2, etc using a String.replace()-style pattern
            return handler.replace(/\$(\$|\d{1,2})/, function (m, what) {
                return match[what === '$' ? 0 : Number(what)];
            });
        };
        var _handler = predicates_1.isString(handler) ? redirectUrlTo : handler;
        var match = function (url) {
            return regexp.exec(url.path);
        };
        var details = { regexp: regexp, type: "REGEXP" };
        return common_1.extend(new BaseUrlRule(match, _handler), details);
    };
    return UrlRuleFactory;
}());
UrlRuleFactory.isUrlRule = function (obj) {
    return obj && ['type', 'match', 'handler'].every(function (key) { return predicates_1.isDefined(obj[key]); });
};
exports.UrlRuleFactory = UrlRuleFactory;
/**
 * A base rule which calls `match`
 *
 * The value from the `match` function is passed through to the `handler`.
 * @internalapi
 */
var BaseUrlRule = (function () {
    function BaseUrlRule(match, handler) {
        var _this = this;
        this.match = match;
        this.type = "RAW";
        this.matchPriority = function (match) { return 0 - _this.$id; };
        this.handler = handler || common_1.identity;
    }
    return BaseUrlRule;
}());
exports.BaseUrlRule = BaseUrlRule;
//# sourceMappingURL=urlRule.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @coreapi
 * @module url
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var coreservices_1 = __webpack_require__(4);
var common_1 = __webpack_require__(0);
/** @hidden */
var makeStub = function (keys) {
    return keys.reduce(function (acc, key) { return (acc[key] = coreservices_1.notImplemented(key), acc); }, { dispose: common_1.noop });
};
/** @hidden */ var locationServicesFns = ["url", "path", "search", "hash", "onChange"];
/** @hidden */ var locationConfigFns = ["port", "protocol", "host", "baseHref", "html5Mode", "hashPrefix"];
/** @hidden */ var umfFns = ["type", "caseInsensitive", "strictMode", "defaultSquashPolicy"];
/** @hidden */ var rulesFns = ["sort", "when", "initial", "otherwise", "rules", "rule", "removeRule"];
/** @hidden */ var syncFns = ["deferIntercept", "listen", "sync", "match"];
/**
 * API for URL management
 */
var UrlService = (function () {
    /** @hidden */
    function UrlService(router, lateBind) {
        if (lateBind === void 0) { lateBind = true; }
        this.router = router;
        this.rules = {};
        this.config = {};
        // proxy function calls from UrlService to the LocationService/LocationConfig
        var locationServices = function () { return router.locationService; };
        common_1.createProxyFunctions(locationServices, this, locationServices, locationServicesFns, lateBind);
        var locationConfig = function () { return router.locationConfig; };
        common_1.createProxyFunctions(locationConfig, this.config, locationConfig, locationConfigFns, lateBind);
        var umf = function () { return router.urlMatcherFactory; };
        common_1.createProxyFunctions(umf, this.config, umf, umfFns);
        var urlRouter = function () { return router.urlRouter; };
        common_1.createProxyFunctions(urlRouter, this.rules, urlRouter, rulesFns);
        common_1.createProxyFunctions(urlRouter, this, urlRouter, syncFns);
    }
    UrlService.prototype.url = function (newurl, replace, state) { return; };
    ;
    /** @inheritdoc */
    UrlService.prototype.path = function () { return; };
    ;
    /** @inheritdoc */
    UrlService.prototype.search = function () { return; };
    ;
    /** @inheritdoc */
    UrlService.prototype.hash = function () { return; };
    ;
    /** @inheritdoc */
    UrlService.prototype.onChange = function (callback) { return; };
    ;
    /**
     * Returns the current URL parts
     *
     * This method returns the current URL components as a [[UrlParts]] object.
     *
     * @returns the current url parts
     */
    UrlService.prototype.parts = function () {
        return { path: this.path(), search: this.search(), hash: this.hash() };
    };
    UrlService.prototype.dispose = function () { };
    /** @inheritdoc */
    UrlService.prototype.sync = function (evt) { return; };
    /** @inheritdoc */
    UrlService.prototype.listen = function (enabled) { return; };
    ;
    /** @inheritdoc */
    UrlService.prototype.deferIntercept = function (defer) { return; };
    /** @inheritdoc */
    UrlService.prototype.match = function (urlParts) { return; };
    return UrlService;
}());
/** @hidden */
UrlService.locationServiceStub = makeStub(locationServicesFns);
/** @hidden */
UrlService.locationConfigStub = makeStub(locationConfigFns);
exports.UrlService = UrlService;
//# sourceMappingURL=urlService.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var predicates_1 = __webpack_require__(1);
/** A `LocationConfig` that delegates to the browser's `location` object */
var BrowserLocationConfig = (function () {
    function BrowserLocationConfig(router, _isHtml5) {
        if (_isHtml5 === void 0) { _isHtml5 = false; }
        this._isHtml5 = _isHtml5;
        this._baseHref = undefined;
        this._hashPrefix = "";
    }
    BrowserLocationConfig.prototype.port = function () {
        if (location.port) {
            return Number(location.port);
        }
        return this.protocol() === 'https' ? 443 : 80;
    };
    BrowserLocationConfig.prototype.protocol = function () {
        return location.protocol.replace(/:/g, '');
    };
    BrowserLocationConfig.prototype.host = function () {
        return location.host;
    };
    BrowserLocationConfig.prototype.html5Mode = function () {
        return this._isHtml5;
    };
    BrowserLocationConfig.prototype.hashPrefix = function (newprefix) {
        return predicates_1.isDefined(newprefix) ? this._hashPrefix = newprefix : this._hashPrefix;
    };
    ;
    BrowserLocationConfig.prototype.baseHref = function (href) {
        return predicates_1.isDefined(href) ? this._baseHref = href : this._baseHref || this.applyDocumentBaseHref();
    };
    BrowserLocationConfig.prototype.applyDocumentBaseHref = function () {
        var baseTags = document.getElementsByTagName("base");
        return this._baseHref = baseTags.length ? baseTags[0].href.substr(location.origin.length) : "";
    };
    BrowserLocationConfig.prototype.dispose = function () { };
    return BrowserLocationConfig;
}());
exports.BrowserLocationConfig = BrowserLocationConfig;
//# sourceMappingURL=browserLocationConfig.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var utils_1 = __webpack_require__(16);
var baseLocationService_1 = __webpack_require__(23);
/** A `LocationServices` that uses the browser hash "#" to get/set the current location */
var HashLocationService = (function (_super) {
    __extends(HashLocationService, _super);
    function HashLocationService(router) {
        var _this = _super.call(this, router, false) || this;
        window.addEventListener('hashchange', _this._listener, false);
        return _this;
    }
    HashLocationService.prototype._get = function () {
        return utils_1.trimHashVal(this._location.hash);
    };
    HashLocationService.prototype._set = function (state, title, url, replace) {
        this._location.hash = url;
    };
    HashLocationService.prototype.dispose = function (router) {
        _super.prototype.dispose.call(this, router);
        window.removeEventListener('hashchange', this._listener);
    };
    return HashLocationService;
}(baseLocationService_1.BaseLocationServices));
exports.HashLocationService = HashLocationService;
//# sourceMappingURL=hashLocationService.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var index_1 = __webpack_require__(18);
// globally available injectables
var globals = {};
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
/**
 * A basic angular1-like injector api
 *
 * This object implements four methods similar to the
 * [angular 1 dependency injector](https://docs.angularjs.org/api/auto/service/$injector)
 *
 * UI-Router evolved from an angular 1 library to a framework agnostic library.
 * However, some of the `@uirouter/core` code uses these ng1 style APIs to support ng1 style dependency injection.
 *
 * This object provides a naive implementation of a globally scoped dependency injection system.
 * It supports the following DI approaches:
 *
 * ### Function parameter names
 *
 * A function's `.toString()` is called, and the parameter names are parsed.
 * This only works when the parameter names aren't "mangled" by a minifier such as UglifyJS.
 *
 * ```js
 * function injectedFunction(FooService, BarService) {
 *   // FooService and BarService are injected
 * }
 * ```
 *
 * ### Function annotation
 *
 * A function may be annotated with an array of dependency names as the `$inject` property.
 *
 * ```js
 * injectedFunction.$inject = [ 'FooService', 'BarService' ];
 * function injectedFunction(fs, bs) {
 *   // FooService and BarService are injected as fs and bs parameters
 * }
 * ```
 *
 * ### Array notation
 *
 * An array provides the names of the dependencies to inject (as strings).
 * The function is the last element of the array.
 *
 * ```js
 * [ 'FooService', 'BarService', function (fs, bs) {
 *   // FooService and BarService are injected as fs and bs parameters
 * }]
 * ```
 *
 * @type {$InjectorLike}
 */
exports.$injector = {
    /** Gets an object from DI based on a string token */
    get: function (name) { return globals[name]; },
    /** Returns true if an object named `name` exists in global DI */
    has: function (name) { return exports.$injector.get(name) != null; },
    /**
     * Injects a function
     *
     * @param fn the function to inject
     * @param context the function's `this` binding
     * @param locals An object with additional DI tokens and values, such as `{ someToken: { foo: 1 } }`
     */
    invoke: function (fn, context, locals) {
        var all = index_1.extend({}, globals, locals || {});
        var params = exports.$injector.annotate(fn);
        var ensureExist = index_1.assertPredicate(function (key) { return all.hasOwnProperty(key); }, function (key) { return "DI can't find injectable: '" + key + "'"; });
        var args = params.filter(ensureExist).map(function (x) { return all[x]; });
        if (index_1.isFunction(fn))
            return fn.apply(context, args);
        else
            return fn.slice(-1)[0].apply(context, args);
    },
    /**
     * Returns a function's dependencies
     *
     * Analyzes a function (or array) and returns an array of DI tokens that the function requires.
     * @return an array of `string`s
     */
    annotate: function (fn) {
        if (!index_1.isInjectable(fn))
            throw new Error("Not an injectable function: " + fn);
        if (fn && fn.$inject)
            return fn.$inject;
        if (index_1.isArray(fn))
            return fn.slice(0, -1);
        var fnStr = fn.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        return result || [];
    }
};
//# sourceMappingURL=injector.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var predicates_1 = __webpack_require__(1);
var common_1 = __webpack_require__(0);
/** A `LocationConfig` mock that gets/sets all config from an in-memory object */
var MemoryLocationConfig = (function () {
    function MemoryLocationConfig() {
        var _this = this;
        this._baseHref = '';
        this._port = 80;
        this._protocol = "http";
        this._host = "localhost";
        this._hashPrefix = "";
        this.port = function () { return _this._port; };
        this.protocol = function () { return _this._protocol; };
        this.host = function () { return _this._host; };
        this.baseHref = function () { return _this._baseHref; };
        this.html5Mode = function () { return false; };
        this.hashPrefix = function (newval) { return predicates_1.isDefined(newval) ? _this._hashPrefix = newval : _this._hashPrefix; };
        this.dispose = common_1.noop;
    }
    return MemoryLocationConfig;
}());
exports.MemoryLocationConfig = MemoryLocationConfig;
//# sourceMappingURL=memoryLocationConfig.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var baseLocationService_1 = __webpack_require__(23);
/** A `LocationServices` that gets/sets the current location from an in-memory object */
var MemoryLocationService = (function (_super) {
    __extends(MemoryLocationService, _super);
    function MemoryLocationService(router) {
        return _super.call(this, router, true) || this;
    }
    MemoryLocationService.prototype._get = function () {
        return this._url;
    };
    MemoryLocationService.prototype._set = function (state, title, url, replace) {
        this._url = url;
    };
    return MemoryLocationService;
}(baseLocationService_1.BaseLocationServices));
exports.MemoryLocationService = MemoryLocationService;
//# sourceMappingURL=memoryLocationService.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(16);
var baseLocationService_1 = __webpack_require__(23);
/**
 * A `LocationServices` that gets/sets the current location using the browser's `location` and `history` apis
 *
 * Uses `history.pushState` and `history.replaceState`
 */
var PushStateLocationService = (function (_super) {
    __extends(PushStateLocationService, _super);
    function PushStateLocationService(router) {
        var _this = _super.call(this, router, true) || this;
        _this._config = router.urlService.config;
        window.addEventListener("popstate", _this._listener, false);
        return _this;
    }
    ;
    PushStateLocationService.prototype._get = function () {
        var _a = this._location, pathname = _a.pathname, hash = _a.hash, search = _a.search;
        search = utils_1.splitQuery(search)[1]; // strip ? if found
        hash = utils_1.splitHash(hash)[1]; // strip # if found
        return pathname + (search ? "?" + search : "") + (hash ? "$" + search : "");
    };
    PushStateLocationService.prototype._set = function (state, title, url, replace) {
        var _a = this, _config = _a._config, _history = _a._history;
        var fullUrl = _config.baseHref() + url;
        if (replace) {
            _history.replaceState(state, title, fullUrl);
        }
        else {
            _history.pushState(state, title, fullUrl);
        }
    };
    PushStateLocationService.prototype.dispose = function (router) {
        _super.prototype.dispose.call(this, router);
        window.removeEventListener("popstate", this._listener);
    };
    return PushStateLocationService;
}(baseLocationService_1.BaseLocationServices));
exports.PushStateLocationService = PushStateLocationService;
//# sourceMappingURL=pushStateLocationService.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var index_1 = __webpack_require__(18);
/**
 * An angular1-like promise api
 *
 * This object implements four methods similar to the
 * [angular 1 promise api](https://docs.angularjs.org/api/ng/service/$q)
 *
 * UI-Router evolved from an angular 1 library to a framework agnostic library.
 * However, some of the `@uirouter/core` code uses these ng1 style APIs to support ng1 style dependency injection.
 *
 * This API provides native ES6 promise support wrapped as a $q-like API.
 * Internally, UI-Router uses this $q object to perform promise operations.
 * The `angular-ui-router` (ui-router for angular 1) uses the $q API provided by angular.
 *
 * $q-like promise api
 */
exports.$q = {
    /** Normalizes a value as a promise */
    when: function (val) { return new Promise(function (resolve, reject) { return resolve(val); }); },
    /** Normalizes a value as a promise rejection */
    reject: function (val) { return new Promise(function (resolve, reject) { reject(val); }); },
    /** @returns a deferred object, which has `resolve` and `reject` functions */
    defer: function () {
        var deferred = {};
        deferred.promise = new Promise(function (resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        return deferred;
    },
    /** Like Promise.all(), but also supports object key/promise notation like $q */
    all: function (promises) {
        if (index_1.isArray(promises)) {
            return Promise.all(promises);
        }
        if (index_1.isObject(promises)) {
            // Convert promises map to promises array.
            // When each promise resolves, map it to a tuple { key: key, val: val }
            var chain = Object.keys(promises)
                .map(function (key) { return promises[key].then(function (val) { return ({ key: key, val: val }); }); });
            // Then wait for all promises to resolve, and convert them back to an object
            return exports.$q.all(chain).then(function (values) {
                return values.reduce(function (acc, tuple) { acc[tuple.key] = tuple.val; return acc; }, {});
            });
        }
    }
};
//# sourceMappingURL=q.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @coreapi
 * @module view
 */ /** for typedoc */
var common_1 = __webpack_require__(0);
var hof_1 = __webpack_require__(2);
var predicates_1 = __webpack_require__(1);
var trace_1 = __webpack_require__(8);
/**
 * The View service
 *
 * This service pairs existing `ui-view` components (which live in the DOM)
 * with view configs (from the state declaration objects: [[StateDeclaration.views]]).
 *
 * - After a successful Transition, the views from the newly entered states are activated via [[activateViewConfig]].
 *   The views from exited states are deactivated via [[deactivateViewConfig]].
 *   (See: the [[registerActivateViews]] Transition Hook)
 *
 * - As `ui-view` components pop in and out of existence, they register themselves using [[registerUIView]].
 *
 * - When the [[sync]] function is called, the registered `ui-view`(s) ([[ActiveUIView]])
 * are configured with the matching [[ViewConfig]](s)
 *
 */
var ViewService = (function () {
    function ViewService() {
        var _this = this;
        this._uiViews = [];
        this._viewConfigs = [];
        this._viewConfigFactories = {};
        this._pluginapi = {
            _rootViewContext: this._rootViewContext.bind(this),
            _viewConfigFactory: this._viewConfigFactory.bind(this),
            _registeredUIViews: function () { return _this._uiViews; },
            _activeViewConfigs: function () { return _this._viewConfigs; },
        };
    }
    ViewService.prototype._rootViewContext = function (context) {
        return this._rootContext = context || this._rootContext;
    };
    ;
    ViewService.prototype._viewConfigFactory = function (viewType, factory) {
        this._viewConfigFactories[viewType] = factory;
    };
    ViewService.prototype.createViewConfig = function (path, decl) {
        var cfgFactory = this._viewConfigFactories[decl.$type];
        if (!cfgFactory)
            throw new Error("ViewService: No view config factory registered for type " + decl.$type);
        var cfgs = cfgFactory(path, decl);
        return predicates_1.isArray(cfgs) ? cfgs : [cfgs];
    };
    /**
     * Deactivates a ViewConfig.
     *
     * This function deactivates a `ViewConfig`.
     * After calling [[sync]], it will un-pair from any `ui-view` with which it is currently paired.
     *
     * @param viewConfig The ViewConfig view to deregister.
     */
    ViewService.prototype.deactivateViewConfig = function (viewConfig) {
        trace_1.trace.traceViewServiceEvent("<- Removing", viewConfig);
        common_1.removeFrom(this._viewConfigs, viewConfig);
    };
    ViewService.prototype.activateViewConfig = function (viewConfig) {
        trace_1.trace.traceViewServiceEvent("-> Registering", viewConfig);
        this._viewConfigs.push(viewConfig);
    };
    ViewService.prototype.sync = function () {
        var _this = this;
        var uiViewsByFqn = this._uiViews.map(function (uiv) { return [uiv.fqn, uiv]; }).reduce(common_1.applyPairs, {});
        // Return a weighted depth value for a uiView.
        // The depth is the nesting depth of ui-views (based on FQN; times 10,000)
        // plus the depth of the state that is populating the uiView
        function uiViewDepth(uiView) {
            var stateDepth = function (context) {
                return context && context.parent ? stateDepth(context.parent) + 1 : 1;
            };
            return (uiView.fqn.split(".").length * 10000) + stateDepth(uiView.creationContext);
        }
        // Return the ViewConfig's context's depth in the context tree.
        function viewConfigDepth(config) {
            var context = config.viewDecl.$context, count = 0;
            while (++count && context.parent)
                context = context.parent;
            return count;
        }
        // Given a depth function, returns a compare function which can return either ascending or descending order
        var depthCompare = hof_1.curry(function (depthFn, posNeg, left, right) { return posNeg * (depthFn(left) - depthFn(right)); });
        var matchingConfigPair = function (uiView) {
            var matchingConfigs = _this._viewConfigs.filter(ViewService.matches(uiViewsByFqn, uiView));
            if (matchingConfigs.length > 1) {
                // This is OK.  Child states can target a ui-view that the parent state also targets (the child wins)
                // Sort by depth and return the match from the deepest child
                // console.log(`Multiple matching view configs for ${uiView.fqn}`, matchingConfigs);
                matchingConfigs.sort(depthCompare(viewConfigDepth, -1)); // descending
            }
            return [uiView, matchingConfigs[0]];
        };
        var configureUIView = function (_a) {
            var uiView = _a[0], viewConfig = _a[1];
            // If a parent ui-view is reconfigured, it could destroy child ui-views.
            // Before configuring a child ui-view, make sure it's still in the active uiViews array.
            if (_this._uiViews.indexOf(uiView) !== -1)
                uiView.configUpdated(viewConfig);
        };
        // Sort views by FQN and state depth. Process uiviews nearest the root first.
        this._uiViews.sort(depthCompare(uiViewDepth, 1)).map(matchingConfigPair).forEach(configureUIView);
    };
    ;
    /**
     * Registers a `ui-view` component
     *
     * When a `ui-view` component is created, it uses this method to register itself.
     * After registration the [[sync]] method is used to ensure all `ui-view` are configured with the proper [[ViewConfig]].
     *
     * Note: the `ui-view` component uses the `ViewConfig` to determine what view should be loaded inside the `ui-view`,
     * and what the view's state context is.
     *
     * Note: There is no corresponding `deregisterUIView`.
     *       A `ui-view` should hang on to the return value of `registerUIView` and invoke it to deregister itself.
     *
     * @param uiView The metadata for a UIView
     * @return a de-registration function used when the view is destroyed.
     */
    ViewService.prototype.registerUIView = function (uiView) {
        trace_1.trace.traceViewServiceUIViewEvent("-> Registering", uiView);
        var uiViews = this._uiViews;
        var fqnMatches = function (uiv) { return uiv.fqn === uiView.fqn; };
        if (uiViews.filter(fqnMatches).length)
            trace_1.trace.traceViewServiceUIViewEvent("!!!! duplicate uiView named:", uiView);
        uiViews.push(uiView);
        this.sync();
        return function () {
            var idx = uiViews.indexOf(uiView);
            if (idx === -1) {
                trace_1.trace.traceViewServiceUIViewEvent("Tried removing non-registered uiView", uiView);
                return;
            }
            trace_1.trace.traceViewServiceUIViewEvent("<- Deregistering", uiView);
            common_1.removeFrom(uiViews)(uiView);
        };
    };
    ;
    /**
     * Returns the list of views currently available on the page, by fully-qualified name.
     *
     * @return {Array} Returns an array of fully-qualified view names.
     */
    ViewService.prototype.available = function () {
        return this._uiViews.map(hof_1.prop("fqn"));
    };
    /**
     * Returns the list of views on the page containing loaded content.
     *
     * @return {Array} Returns an array of fully-qualified view names.
     */
    ViewService.prototype.active = function () {
        return this._uiViews.filter(hof_1.prop("$config")).map(hof_1.prop("name"));
    };
    /**
     * Normalizes a view's name from a state.views configuration block.
     *
     * This should be used by a framework implementation to calculate the values for
     * [[_ViewDeclaration.$uiViewName]] and [[_ViewDeclaration.$uiViewContextAnchor]].
     *
     * @param context the context object (state declaration) that the view belongs to
     * @param rawViewName the name of the view, as declared in the [[StateDeclaration.views]]
     *
     * @returns the normalized uiViewName and uiViewContextAnchor that the view targets
     */
    ViewService.normalizeUIViewTarget = function (context, rawViewName) {
        if (rawViewName === void 0) { rawViewName = ""; }
        // TODO: Validate incoming view name with a regexp to allow:
        // ex: "view.name@foo.bar" , "^.^.view.name" , "view.name@^.^" , "" ,
        // "@" , "$default@^" , "!$default.$default" , "!foo.bar"
        var viewAtContext = rawViewName.split("@");
        var uiViewName = viewAtContext[0] || "$default"; // default to unnamed view
        var uiViewContextAnchor = predicates_1.isString(viewAtContext[1]) ? viewAtContext[1] : "^"; // default to parent context
        // Handle relative view-name sugar syntax.
        // Matches rawViewName "^.^.^.foo.bar" into array: ["^.^.^.foo.bar", "^.^.^", "foo.bar"],
        var relativeViewNameSugar = /^(\^(?:\.\^)*)\.(.*$)/.exec(uiViewName);
        if (relativeViewNameSugar) {
            // Clobbers existing contextAnchor (rawViewName validation will fix this)
            uiViewContextAnchor = relativeViewNameSugar[1]; // set anchor to "^.^.^"
            uiViewName = relativeViewNameSugar[2]; // set view-name to "foo.bar"
        }
        if (uiViewName.charAt(0) === '!') {
            uiViewName = uiViewName.substr(1);
            uiViewContextAnchor = ""; // target absolutely from root
        }
        // handle parent relative targeting "^.^.^"
        var relativeMatch = /^(\^(?:\.\^)*)$/;
        if (relativeMatch.exec(uiViewContextAnchor)) {
            var anchor = uiViewContextAnchor.split(".").reduce((function (anchor, x) { return anchor.parent; }), context);
            uiViewContextAnchor = anchor.name;
        }
        else if (uiViewContextAnchor === '.') {
            uiViewContextAnchor = context.name;
        }
        return { uiViewName: uiViewName, uiViewContextAnchor: uiViewContextAnchor };
    };
    return ViewService;
}());
/**
 * Given a ui-view and a ViewConfig, determines if they "match".
 *
 * A ui-view has a fully qualified name (fqn) and a context object.  The fqn is built from its overall location in
 * the DOM, describing its nesting relationship to any parent ui-view tags it is nested inside of.
 *
 * A ViewConfig has a target ui-view name and a context anchor.  The ui-view name can be a simple name, or
 * can be a segmented ui-view path, describing a portion of a ui-view fqn.
 *
 * In order for a ui-view to match ViewConfig, ui-view's $type must match the ViewConfig's $type
 *
 * If the ViewConfig's target ui-view name is a simple name (no dots), then a ui-view matches if:
 * - the ui-view's name matches the ViewConfig's target name
 * - the ui-view's context matches the ViewConfig's anchor
 *
 * If the ViewConfig's target ui-view name is a segmented name (with dots), then a ui-view matches if:
 * - There exists a parent ui-view where:
 *    - the parent ui-view's name matches the first segment (index 0) of the ViewConfig's target name
 *    - the parent ui-view's context matches the ViewConfig's anchor
 * - And the remaining segments (index 1..n) of the ViewConfig's target name match the tail of the ui-view's fqn
 *
 * Example:
 *
 * DOM:
 * <ui-view>                        <!-- created in the root context (name: "") -->
 *   <ui-view name="foo">                <!-- created in the context named: "A"      -->
 *     <ui-view>                    <!-- created in the context named: "A.B"    -->
 *       <ui-view name="bar">            <!-- created in the context named: "A.B.C"  -->
 *       </ui-view>
 *     </ui-view>
 *   </ui-view>
 * </ui-view>
 *
 * uiViews: [
 *  { fqn: "$default",                  creationContext: { name: "" } },
 *  { fqn: "$default.foo",              creationContext: { name: "A" } },
 *  { fqn: "$default.foo.$default",     creationContext: { name: "A.B" } }
 *  { fqn: "$default.foo.$default.bar", creationContext: { name: "A.B.C" } }
 * ]
 *
 * These four view configs all match the ui-view with the fqn: "$default.foo.$default.bar":
 *
 * - ViewConfig1: { uiViewName: "bar",                       uiViewContextAnchor: "A.B.C" }
 * - ViewConfig2: { uiViewName: "$default.bar",              uiViewContextAnchor: "A.B" }
 * - ViewConfig3: { uiViewName: "foo.$default.bar",          uiViewContextAnchor: "A" }
 * - ViewConfig4: { uiViewName: "$default.foo.$default.bar", uiViewContextAnchor: "" }
 *
 * Using ViewConfig3 as an example, it matches the ui-view with fqn "$default.foo.$default.bar" because:
 * - The ViewConfig's segmented target name is: [ "foo", "$default", "bar" ]
 * - There exists a parent ui-view (which has fqn: "$default.foo") where:
 *    - the parent ui-view's name "foo" matches the first segment "foo" of the ViewConfig's target name
 *    - the parent ui-view's context "A" matches the ViewConfig's anchor context "A"
 * - And the remaining segments [ "$default", "bar" ].join("."_ of the ViewConfig's target name match
 *   the tail of the ui-view's fqn "default.bar"
 *
 * @internalapi
 */
ViewService.matches = function (uiViewsByFqn, uiView) { return function (viewConfig) {
    // Don't supply an ng1 ui-view with an ng2 ViewConfig, etc
    if (uiView.$type !== viewConfig.viewDecl.$type)
        return false;
    // Split names apart from both viewConfig and uiView into segments
    var vc = viewConfig.viewDecl;
    var vcSegments = vc.$uiViewName.split(".");
    var uivSegments = uiView.fqn.split(".");
    // Check if the tails of the segment arrays match. ex, these arrays' tails match:
    // vc: ["foo", "bar"], uiv fqn: ["$default", "foo", "bar"]
    if (!common_1.equals(vcSegments, uivSegments.slice(0 - vcSegments.length)))
        return false;
    // Now check if the fqn ending at the first segment of the viewConfig matches the context:
    // ["$default", "foo"].join(".") == "$default.foo", does the ui-view $default.foo context match?
    var negOffset = (1 - vcSegments.length) || undefined;
    var fqnToFirstSegment = uivSegments.slice(0, negOffset).join(".");
    var uiViewContext = uiViewsByFqn[fqnToFirstSegment].creationContext;
    return vc.$uiViewContextAnchor === (uiViewContext && uiViewContext.name);
}; };
exports.ViewService = ViewService;
//# sourceMappingURL=view.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module ng1 */ /** for typedoc */
var core_1 = __webpack_require__(5);
/**
 * The Angular 1 `StateProvider`
 *
 * The `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
var StateProvider = (function () {
    function StateProvider(stateRegistry, stateService) {
        this.stateRegistry = stateRegistry;
        this.stateService = stateService;
        core_1.createProxyFunctions(core_1.val(StateProvider.prototype), this, core_1.val(this));
    }
    /**
     * Decorates states when they are registered
     *
     * Allows you to extend (carefully) or override (at your own peril) the
     * `stateBuilder` object used internally by [[StateRegistry]].
     * This can be used to add custom functionality to ui-router,
     * for example inferring templateUrl based on the state name.
     *
     * When passing only a name, it returns the current (original or decorated) builder
     * function that matches `name`.
     *
     * The builder functions that can be decorated are listed below. Though not all
     * necessarily have a good use case for decoration, that is up to you to decide.
     *
     * In addition, users can attach custom decorators, which will generate new
     * properties within the state's internal definition. There is currently no clear
     * use-case for this beyond accessing internal states (i.e. $state.$current),
     * however, expect this to become increasingly relevant as we introduce additional
     * meta-programming features.
     *
     * **Warning**: Decorators should not be interdependent because the order of
     * execution of the builder functions in non-deterministic. Builder functions
     * should only be dependent on the state definition object and super function.
     *
     *
     * Existing builder functions and current return values:
     *
     * - **parent** `{object}` - returns the parent state object.
     * - **data** `{object}` - returns state data, including any inherited data that is not
     *   overridden by own values (if any).
     * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
     *   or `null`.
     * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is
     *   navigable).
     * - **params** `{object}` - returns an array of state params that are ensured to
     *   be a super-set of parent's params.
     * - **views** `{object}` - returns a views object where each key is an absolute view
     *   name (i.e. "viewName@stateName") and each value is the config object
     *   (template, controller) for the view. Even when you don't use the views object
     *   explicitly on a state config, one is still created for you internally.
     *   So by decorating this builder function you have access to decorating template
     *   and controller properties.
     * - **ownParams** `{object}` - returns an array of params that belong to the state,
     *   not including any params defined by ancestor states.
     * - **path** `{string}` - returns the full path from the root down to this state.
     *   Needed for state activation.
     * - **includes** `{object}` - returns an object that includes every state that
     *   would pass a `$state.includes()` test.
     *
     * #### Example:
     * Override the internal 'views' builder with a function that takes the state
     * definition, and a reference to the internal function being overridden:
     * ```js
     * $stateProvider.decorator('views', function (state, parent) {
     *   let result = {},
     *       views = parent(state);
     *
     *   angular.forEach(views, function (config, name) {
     *     let autoName = (state.name + '.' + name).replace('.', '/');
     *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
     *     result[name] = config;
     *   });
     *   return result;
     * });
     *
     * $stateProvider.state('home', {
     *   views: {
     *     'contact.list': { controller: 'ListController' },
     *     'contact.item': { controller: 'ItemController' }
     *   }
     * });
     * ```
     *
     *
     * ```js
     * // Auto-populates list and item views with /partials/home/contact/list.html,
     * // and /partials/home/contact/item.html, respectively.
     * $state.go('home');
     * ```
     *
     * @param {string} name The name of the builder function to decorate.
     * @param {object} func A function that is responsible for decorating the original
     * builder function. The function receives two parameters:
     *
     *   - `{object}` - state - The state config object.
     *   - `{object}` - super - The original builder function.
     *
     * @return {object} $stateProvider - $stateProvider instance
     */
    StateProvider.prototype.decorator = function (name, func) {
        return this.stateRegistry.decorator(name, func) || this;
    };
    StateProvider.prototype.state = function (name, definition) {
        if (core_1.isObject(name)) {
            definition = name;
        }
        else {
            definition.name = name;
        }
        this.stateRegistry.register(definition);
        return this;
    };
    /**
     * Registers an invalid state handler
     *
     * This is a passthrough to [[StateService.onInvalid]] for ng1.
     */
    StateProvider.prototype.onInvalid = function (callback) {
        return this.stateService.onInvalid(callback);
    };
    return StateProvider;
}());
exports.StateProvider = StateProvider;
//# sourceMappingURL=stateProvider.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module url */ /** */
var core_1 = __webpack_require__(5);
var core_2 = __webpack_require__(5);
/**
 * Manages rules for client-side URL
 *
 * ### Deprecation warning:
 * This class is now considered to be an internal API
 * Use the [[UrlService]] instead.
 * For configuring URL rules, use the [[UrlRulesApi]] which can be found as [[UrlService.rules]].
 *
 * This class manages the router rules for what to do when the URL changes.
 *
 * This provider remains for backwards compatibility.
 *
 * @deprecated
 */
var UrlRouterProvider = (function () {
    /** @hidden */
    function UrlRouterProvider(router) {
        this._router = router;
        this._urlRouter = router.urlRouter;
    }
    /** @hidden */
    UrlRouterProvider.prototype.$get = function () {
        var urlRouter = this._urlRouter;
        urlRouter.update(true);
        if (!urlRouter.interceptDeferred)
            urlRouter.listen();
        return urlRouter;
    };
    /**
     * Registers a url handler function.
     *
     * Registers a low level url handler (a `rule`).
     * A rule detects specific URL patterns and returns a redirect, or performs some action.
     *
     * If a rule returns a string, the URL is replaced with the string, and all rules are fired again.
     *
     * #### Example:
     * ```js
     * var app = angular.module('app', ['ui.router.router']);
     *
     * app.config(function ($urlRouterProvider) {
     *   // Here's an example of how you might allow case insensitive urls
     *   $urlRouterProvider.rule(function ($injector, $location) {
     *     var path = $location.path(),
     *         normalized = path.toLowerCase();
     *
     *     if (path !== normalized) {
     *       return normalized;
     *     }
     *   });
     * });
     * ```
     *
     * @param ruleFn
     * Handler function that takes `$injector` and `$location` services as arguments.
     * You can use them to detect a url and return a different url as a string.
     *
     * @return [[UrlRouterProvider]] (`this`)
     */
    UrlRouterProvider.prototype.rule = function (ruleFn) {
        var _this = this;
        if (!core_2.isFunction(ruleFn))
            throw new Error("'rule' must be a function");
        var match = function () {
            return ruleFn(core_2.services.$injector, _this._router.locationService);
        };
        var rule = new core_1.BaseUrlRule(match, core_2.identity);
        this._urlRouter.rule(rule);
        return this;
    };
    ;
    /**
     * Defines the path or behavior to use when no url can be matched.
     *
     * #### Example:
     * ```js
     * var app = angular.module('app', ['ui.router.router']);
     *
     * app.config(function ($urlRouterProvider) {
     *   // if the path doesn't match any of the urls you configured
     *   // otherwise will take care of routing the user to the
     *   // specified url
     *   $urlRouterProvider.otherwise('/index');
     *
     *   // Example of using function rule as param
     *   $urlRouterProvider.otherwise(function ($injector, $location) {
     *     return '/a/valid/url';
     *   });
     * });
     * ```
     *
     * @param rule
     * The url path you want to redirect to or a function rule that returns the url path or performs a `$state.go()`.
     * The function version is passed two params: `$injector` and `$location` services, and should return a url string.
     *
     * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
     */
    UrlRouterProvider.prototype.otherwise = function (rule) {
        var _this = this;
        var urlRouter = this._urlRouter;
        if (core_2.isString(rule)) {
            urlRouter.otherwise(rule);
        }
        else if (core_2.isFunction(rule)) {
            urlRouter.otherwise(function () { return rule(core_2.services.$injector, _this._router.locationService); });
        }
        else {
            throw new Error("'rule' must be a string or function");
        }
        return this;
    };
    ;
    /**
     * Registers a handler for a given url matching.
     *
     * If the handler is a string, it is
     * treated as a redirect, and is interpolated according to the syntax of match
     * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
     *
     * If the handler is a function, it is injectable.
     * It gets invoked if `$location` matches.
     * You have the option of inject the match object as `$match`.
     *
     * The handler can return
     *
     * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
     *   will continue trying to find another one that matches.
     * - **string** which is treated as a redirect and passed to `$location.url()`
     * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
     *
     * #### Example:
     * ```js
     * var app = angular.module('app', ['ui.router.router']);
     *
     * app.config(function ($urlRouterProvider) {
     *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
     *     if ($state.$current.navigable !== state ||
     *         !equalForKeys($match, $stateParams) {
     *      $state.transitionTo(state, $match, false);
     *     }
     *   });
     * });
     * ```
     *
     * @param what A pattern string to match, compiled as a [[UrlMatcher]].
     * @param handler The path (or function that returns a path) that you want to redirect your user to.
     * @param ruleCallback [optional] A callback that receives the `rule` registered with [[UrlMatcher.rule]]
     *
     * Note: the handler may also invoke arbitrary code, such as `$state.go()`
     */
    UrlRouterProvider.prototype.when = function (what, handler) {
        if (core_2.isArray(handler) || core_2.isFunction(handler)) {
            handler = UrlRouterProvider.injectableHandler(this._router, handler);
        }
        this._urlRouter.when(what, handler);
        return this;
    };
    ;
    UrlRouterProvider.injectableHandler = function (router, handler) {
        return function (match) {
            return core_2.services.$injector.invoke(handler, null, { $match: match, $stateParams: router.globals.params });
        };
    };
    /**
     * Disables monitoring of the URL.
     *
     * Call this method before UI-Router has bootstrapped.
     * It will stop UI-Router from performing the initial url sync.
     *
     * This can be useful to perform some asynchronous initialization before the router starts.
     * Once the initialization is complete, call [[listen]] to tell UI-Router to start watching and synchronizing the URL.
     *
     * #### Example:
     * ```js
     * var app = angular.module('app', ['ui.router']);
     *
     * app.config(function ($urlRouterProvider) {
     *   // Prevent $urlRouter from automatically intercepting URL changes;
     *   $urlRouterProvider.deferIntercept();
     * })
     *
     * app.run(function (MyService, $urlRouter, $http) {
     *   $http.get("/stuff").then(function(resp) {
     *     MyService.doStuff(resp.data);
     *     $urlRouter.listen();
     *     $urlRouter.sync();
     *   });
     * });
     * ```
     *
     * @param defer Indicates whether to defer location change interception.
     *        Passing no parameter is equivalent to `true`.
     */
    UrlRouterProvider.prototype.deferIntercept = function (defer) {
        this._urlRouter.deferIntercept(defer);
    };
    ;
    return UrlRouterProvider;
}());
exports.UrlRouterProvider = UrlRouterProvider;
//# sourceMappingURL=urlRouterProvider.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function sidebarController(tokenFactory, $state, $rootScope, notifsFactory) {
  var ctrl = this;
  var host = window.location.host;
  var path = window.location.pathname;
  var socket = io(host, {
    query: path
  });

  socket.on('comment-posted', function (msg) {
    console.log(msg);
    var span = document.createElement('span');
    var text = document.createTextNode(msg.name + ' commented');
    span.appendChild(text);
    document.getElementById('comments').appendChild(span);
  });
  ctrl.items = [{ name: 'Home', icon: 'home', status: 'home' }, { name: 'New Post', icon: 'note_add', status: 'new' }, { name: 'Profile', icon: 'person', status: 'profile' }];
  ctrl.logout = function () {
    tokenFactory.deleteToken();
    ctrl.isLoggedIn = tokenFactory.findToken();
    $state.go('login');
  };

  ctrl.$onInit = function () {
    ctrl.isLoggedIn = tokenFactory.findToken();
    notifsFactory.getNotifs().then(function (data) {
      console.log(data);
    });
  };

  $rootScope.$on('userLoggedIn', function () {
    ctrl.isLoggedIn = tokenFactory.findToken();
  });
}

exports.sidebarController = sidebarController;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var thisPost = exports.thisPost = 'thisPost';

var thisPostFunc = exports.thisPostFunc = function thisPostFunc($http) {
  return {
    createPost: function createPost(value) {
      console.log(value);
      return $http.post('/post', value);
    }
  };
};

/***/ }),
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sidebar = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

__webpack_require__(34);

var _tokenFactory = __webpack_require__(24);

var _notifs = __webpack_require__(99);

var _sidebar = __webpack_require__(100);

var _sidebar2 = __webpack_require__(62);

__webpack_require__(122);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sidebar = exports.sidebar = _angular2.default.module('sidebar', [_angularUiRouter2.default, 'ngStorage']).component(_sidebar.sidebarComponentName, _sidebar.sidebarComponent).factory(_tokenFactory.tokenFactory, ['$localStorage', _tokenFactory.tokenFactoryFunc]).factory(_notifs.notifsFactory, ['$http', _notifs.notifsFactoryFunc]).name;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.components = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _post = __webpack_require__(105);

var _loginModule = __webpack_require__(104);

var _userModule = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = exports.components = _angular2.default.module('components', [_post.post, _loginModule.login, _userModule.user]).name;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootComponentName = exports.rootComponentName = 'root';
var rootComponent = exports.rootComponent = {
  templateUrl: '/dashboard/src/app/root.html'
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module hooks */ /** */
var transition_1 = __webpack_require__(21);
var router_1 = __webpack_require__(40);
function addCoreResolvables(trans) {
    trans.addResolvable({ token: router_1.UIRouter, deps: [], resolveFn: function () { return trans.router; }, data: trans.router }, "");
    trans.addResolvable({ token: transition_1.Transition, deps: [], resolveFn: function () { return trans; }, data: trans }, "");
    trans.addResolvable({ token: '$transition$', deps: [], resolveFn: function () { return trans; }, data: trans }, "");
    trans.addResolvable({ token: '$stateParams', deps: [], resolveFn: function () { return trans.params(); }, data: trans.params() }, "");
    trans.entering().forEach(function (state) {
        trans.addResolvable({ token: '$state$', deps: [], resolveFn: function () { return state; }, data: state }, state);
    });
}
exports.registerAddCoreResolvables = function (transitionService) {
    return transitionService.onCreate({}, addCoreResolvables);
};
//# sourceMappingURL=coreResolvables.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module hooks */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var trace_1 = __webpack_require__(8);
var rejectFactory_1 = __webpack_require__(14);
/**
 * A [[TransitionHookFn]] that skips a transition if it should be ignored
 *
 * This hook is invoked at the end of the onBefore phase.
 *
 * If the transition should be ignored (because no parameter or states changed)
 * then the transition is ignored and not processed.
 */
function ignoredHook(trans) {
    var ignoredReason = trans._ignoredReason();
    if (!ignoredReason)
        return;
    trace_1.trace.traceTransitionIgnored(trans);
    var pending = trans.router.globals.transition;
    // The user clicked a link going back to the *current state* ('A')
    // However, there is also a pending transition in flight (to 'B')
    // Abort the transition to 'B' because the user now wants to be back at 'A'.
    if (ignoredReason === 'SameAsCurrent' && pending) {
        pending.abort();
    }
    return rejectFactory_1.Rejection.ignored().toPromise();
}
exports.registerIgnoredTransitionHook = function (transitionService) {
    return transitionService.onBefore({}, ignoredHook, { priority: -9999 });
};
//# sourceMappingURL=ignoredTransition.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module hooks */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A [[TransitionHookFn]] that rejects the Transition if it is invalid
 *
 * This hook is invoked at the end of the onBefore phase.
 * If the transition is invalid (for example, param values do not validate)
 * then the transition is rejected.
 */
function invalidTransitionHook(trans) {
    if (!trans.valid()) {
        throw new Error(trans.error());
    }
}
exports.registerInvalidTransitionHook = function (transitionService) {
    return transitionService.onBefore({}, invalidTransitionHook, { priority: -10000 });
};
//# sourceMappingURL=invalidTransition.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A factory which creates an onEnter, onExit or onRetain transition hook function
 *
 * The returned function invokes the (for instance) state.onEnter hook when the
 * state is being entered.
 *
 * @hidden
 */
function makeEnterExitRetainHook(hookName) {
    return function (transition, state) {
        var _state = state.$$state();
        var hookFn = _state[hookName];
        return hookFn(transition, state);
    };
}
/**
 * The [[TransitionStateHookFn]] for onExit
 *
 * When the state is being exited, the state's .onExit function is invoked.
 *
 * Registered using `transitionService.onExit({ exiting: (state) => !!state.onExit }, onExitHook);`
 *
 * See: [[IHookRegistry.onExit]]
 */
var onExitHook = makeEnterExitRetainHook('onExit');
exports.registerOnExitHook = function (transitionService) {
    return transitionService.onExit({ exiting: function (state) { return !!state.onExit; } }, onExitHook);
};
/**
 * The [[TransitionStateHookFn]] for onRetain
 *
 * When the state was already entered, and is not being exited or re-entered, the state's .onRetain function is invoked.
 *
 * Registered using `transitionService.onRetain({ retained: (state) => !!state.onRetain }, onRetainHook);`
 *
 * See: [[IHookRegistry.onRetain]]
 */
var onRetainHook = makeEnterExitRetainHook('onRetain');
exports.registerOnRetainHook = function (transitionService) {
    return transitionService.onRetain({ retained: function (state) { return !!state.onRetain; } }, onRetainHook);
};
/**
 * The [[TransitionStateHookFn]] for onEnter
 *
 * When the state is being entered, the state's .onEnter function is invoked.
 *
 * Registered using `transitionService.onEnter({ entering: (state) => !!state.onEnter }, onEnterHook);`
 *
 * See: [[IHookRegistry.onEnter]]
 */
var onEnterHook = makeEnterExitRetainHook('onEnter');
exports.registerOnEnterHook = function (transitionService) {
    return transitionService.onEnter({ entering: function (state) { return !!state.onEnter; } }, onEnterHook);
};
//# sourceMappingURL=onEnterExitRetain.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module hooks */ /** */
var predicates_1 = __webpack_require__(1);
var coreservices_1 = __webpack_require__(4);
var targetState_1 = __webpack_require__(9);
/**
 * A [[TransitionHookFn]] that redirects to a different state or params
 *
 * Registered using `transitionService.onStart({ to: (state) => !!state.redirectTo }, redirectHook);`
 *
 * See [[StateDeclaration.redirectTo]]
 */
var redirectToHook = function (trans) {
    var redirect = trans.to().redirectTo;
    if (!redirect)
        return;
    var $state = trans.router.stateService;
    function handleResult(result) {
        if (!result)
            return;
        if (result instanceof targetState_1.TargetState)
            return result;
        if (predicates_1.isString(result))
            return $state.target(result, trans.params(), trans.options());
        if (result['state'] || result['params'])
            return $state.target(result['state'] || trans.to(), result['params'] || trans.params(), trans.options());
    }
    if (predicates_1.isFunction(redirect)) {
        return coreservices_1.services.$q.when(redirect(trans)).then(handleResult);
    }
    return handleResult(redirect);
};
exports.registerRedirectToHook = function (transitionService) {
    return transitionService.onStart({ to: function (state) { return !!state.redirectTo; } }, redirectToHook);
};
//# sourceMappingURL=redirectTo.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module hooks */
/** for typedoc */
var common_1 = __webpack_require__(0);
var resolveContext_1 = __webpack_require__(20);
var hof_1 = __webpack_require__(2);
/**
 * A [[TransitionHookFn]] which resolves all EAGER Resolvables in the To Path
 *
 * Registered using `transitionService.onStart({}, eagerResolvePath);`
 *
 * When a Transition starts, this hook resolves all the EAGER Resolvables, which the transition then waits for.
 *
 * See [[StateDeclaration.resolve]]
 */
var eagerResolvePath = function (trans) {
    return new resolveContext_1.ResolveContext(trans.treeChanges().to)
        .resolvePath("EAGER", trans)
        .then(common_1.noop);
};
exports.registerEagerResolvePath = function (transitionService) {
    return transitionService.onStart({}, eagerResolvePath, { priority: 1000 });
};
/**
 * A [[TransitionHookFn]] which resolves all LAZY Resolvables for the state (and all its ancestors) in the To Path
 *
 * Registered using `transitionService.onEnter({ entering: () => true }, lazyResolveState);`
 *
 * When a State is being entered, this hook resolves all the Resolvables for this state, which the transition then waits for.
 *
 * See [[StateDeclaration.resolve]]
 */
var lazyResolveState = function (trans, state) {
    return new resolveContext_1.ResolveContext(trans.treeChanges().to)
        .subContext(state.$$state())
        .resolvePath("LAZY", trans)
        .then(common_1.noop);
};
exports.registerLazyResolveState = function (transitionService) {
    return transitionService.onEnter({ entering: hof_1.val(true) }, lazyResolveState, { priority: 1000 });
};
//# sourceMappingURL=resolve.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
/**
 * A [[TransitionHookFn]] which updates global UI-Router state
 *
 * Registered using `transitionService.onBefore({}, updateGlobalState);`
 *
 * Before a [[Transition]] starts, updates the global value of "the current transition" ([[Globals.transition]]).
 * After a successful [[Transition]], updates the global values of "the current state"
 * ([[Globals.current]] and [[Globals.$current]]) and "the current param values" ([[Globals.params]]).
 *
 * See also the deprecated properties:
 * [[StateService.transition]], [[StateService.current]], [[StateService.params]]
 */
var updateGlobalState = function (trans) {
    var globals = trans.router.globals;
    var transitionSuccessful = function () {
        globals.successfulTransitions.enqueue(trans);
        globals.$current = trans.$to();
        globals.current = globals.$current.self;
        common_1.copy(trans.params(), globals.params);
    };
    var clearCurrentTransition = function () {
        // Do not clear globals.transition if a different transition has started in the meantime
        if (globals.transition === trans)
            globals.transition = null;
    };
    trans.onSuccess({}, transitionSuccessful, { priority: 10000 });
    trans.promise.then(clearCurrentTransition, clearCurrentTransition);
};
exports.registerUpdateGlobalState = function (transitionService) {
    return transitionService.onCreate({}, updateGlobalState);
};
//# sourceMappingURL=updateGlobals.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A [[TransitionHookFn]] which updates the URL after a successful transition
 *
 * Registered using `transitionService.onSuccess({}, updateUrl);`
 */
var updateUrl = function (transition) {
    var options = transition.options();
    var $state = transition.router.stateService;
    var $urlRouter = transition.router.urlRouter;
    // Dont update the url in these situations:
    // The transition was triggered by a URL sync (options.source === 'url')
    // The user doesn't want the url to update (options.location === false)
    // The destination state, and all parents have no navigable url
    if (options.source !== 'url' && options.location && $state.$current.navigable) {
        var urlOptions = { replace: options.location === 'replace' };
        $urlRouter.push($state.$current.navigable.url, $state.params, urlOptions);
    }
    $urlRouter.update(true);
};
exports.registerUpdateUrl = function (transitionService) {
    return transitionService.onSuccess({}, updateUrl, { priority: 9999 });
};
//# sourceMappingURL=url.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module hooks */ /** for typedoc */
var common_1 = __webpack_require__(0);
var coreservices_1 = __webpack_require__(4);
/**
 * A [[TransitionHookFn]] which waits for the views to load
 *
 * Registered using `transitionService.onStart({}, loadEnteringViews);`
 *
 * Allows the views to do async work in [[ViewConfig.load]] before the transition continues.
 * In angular 1, this includes loading the templates.
 */
var loadEnteringViews = function (transition) {
    var $q = coreservices_1.services.$q;
    var enteringViews = transition.views("entering");
    if (!enteringViews.length)
        return;
    return $q.all(enteringViews.map(function (view) { return $q.when(view.load()); })).then(common_1.noop);
};
exports.registerLoadEnteringViews = function (transitionService) {
    return transitionService.onFinish({}, loadEnteringViews);
};
/**
 * A [[TransitionHookFn]] which activates the new views when a transition is successful.
 *
 * Registered using `transitionService.onSuccess({}, activateViews);`
 *
 * After a transition is complete, this hook deactivates the old views from the previous state,
 * and activates the new views from the destination state.
 *
 * See [[ViewService]]
 */
var activateViews = function (transition) {
    var enteringViews = transition.views("entering");
    var exitingViews = transition.views("exiting");
    if (!enteringViews.length && !exitingViews.length)
        return;
    var $view = transition.router.viewService;
    exitingViews.forEach(function (vc) { return $view.deactivateViewConfig(vc); });
    enteringViews.forEach(function (vc) { return $view.activateViewConfig(vc); });
    $view.sync();
};
exports.registerActivateViews = function (transitionService) {
    return transitionService.onSuccess({}, activateViews);
};
//# sourceMappingURL=views.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * # Core classes and interfaces
 *
 * The classes and interfaces that are core to ui-router and do not belong
 * to a more specific subsystem (such as resolve).
 *
 * @coreapi
 * @preferred
 * @module core
 */ /** for typedoc */
Object.defineProperty(exports, "__esModule", { value: true });
/** @internalapi */
var UIRouterPluginBase = (function () {
    function UIRouterPluginBase() {
    }
    UIRouterPluginBase.prototype.dispose = function (router) { };
    return UIRouterPluginBase;
}());
exports.UIRouterPluginBase = UIRouterPluginBase;
//# sourceMappingURL=interface.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(10));
__export(__webpack_require__(37));
__export(__webpack_require__(38));
__export(__webpack_require__(26));
//# sourceMappingURL=index.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/** @module path */ /** for typedoc */
__export(__webpack_require__(27));
__export(__webpack_require__(19));
//# sourceMappingURL=index.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/** @module resolve */ /** for typedoc */
__export(__webpack_require__(39));
__export(__webpack_require__(13));
__export(__webpack_require__(20));
//# sourceMappingURL=index.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(41));
__export(__webpack_require__(28));
__export(__webpack_require__(42));
__export(__webpack_require__(43));
__export(__webpack_require__(44));
__export(__webpack_require__(45));
__export(__webpack_require__(9));
//# sourceMappingURL=index.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Transition subsystem
 *
 * This module contains APIs related to a Transition.
 *
 * See:
 * - [[TransitionService]]
 * - [[Transition]]
 * - [[HookFn]], [[TransitionHookFn]], [[TransitionStateHookFn]], [[HookMatchCriteria]], [[HookResult]]
 *
 * @coreapi
 * @preferred
 * @module transition
 */ /** for typedoc */
__export(__webpack_require__(11));
__export(__webpack_require__(46));
__export(__webpack_require__(29));
__export(__webpack_require__(14));
__export(__webpack_require__(21));
__export(__webpack_require__(15));
__export(__webpack_require__(47));
__export(__webpack_require__(30));
//# sourceMappingURL=index.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(22));
__export(__webpack_require__(48));
__export(__webpack_require__(49));
__export(__webpack_require__(50));
__export(__webpack_require__(51));
//# sourceMappingURL=index.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
__export(__webpack_require__(86));
//# sourceMappingURL=vanilla.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(58));
__export(__webpack_require__(54));
__export(__webpack_require__(23));
__export(__webpack_require__(53));
__export(__webpack_require__(56));
__export(__webpack_require__(57));
__export(__webpack_require__(55));
__export(__webpack_require__(52));
__export(__webpack_require__(16));
__export(__webpack_require__(87));
//# sourceMappingURL=index.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var browserLocationConfig_1 = __webpack_require__(52);
var hashLocationService_1 = __webpack_require__(53);
var utils_1 = __webpack_require__(16);
var pushStateLocationService_1 = __webpack_require__(57);
var memoryLocationService_1 = __webpack_require__(56);
var memoryLocationConfig_1 = __webpack_require__(55);
var injector_1 = __webpack_require__(54);
var q_1 = __webpack_require__(58);
var coreservices_1 = __webpack_require__(4);
function servicesPlugin(router) {
    coreservices_1.services.$injector = injector_1.$injector;
    coreservices_1.services.$q = q_1.$q;
    return { name: "vanilla.services", $q: q_1.$q, $injector: injector_1.$injector, dispose: function () { return null; } };
}
exports.servicesPlugin = servicesPlugin;
/** A `UIRouterPlugin` uses the browser hash to get/set the current location */
exports.hashLocationPlugin = utils_1.locationPluginFactory('vanilla.hashBangLocation', false, hashLocationService_1.HashLocationService, browserLocationConfig_1.BrowserLocationConfig);
/** A `UIRouterPlugin` that gets/sets the current location using the browser's `location` and `history` apis */
exports.pushStateLocationPlugin = utils_1.locationPluginFactory("vanilla.pushStateLocation", true, pushStateLocationService_1.PushStateLocationService, browserLocationConfig_1.BrowserLocationConfig);
/** A `UIRouterPlugin` that gets/sets the current location from an in-memory object */
exports.memoryLocationPlugin = utils_1.locationPluginFactory("vanilla.memoryLocation", false, memoryLocationService_1.MemoryLocationService, memoryLocationConfig_1.MemoryLocationConfig);
//# sourceMappingURL=plugins.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(59));
//# sourceMappingURL=index.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports) {

/**
 * @license AngularJS v1.6.4
 * (c) 2010-2017 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) {'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *     Any commits to this file should be reviewed with security in mind.  *
 *   Changes to this file can potentially create security vulnerabilities. *
 *          An approval from 2 Core members with history of modifying      *
 *                         this file is required.                          *
 *                                                                         *
 *  Does the change somehow allow for arbitrary javascript to be executed? *
 *    Or allows for someone to change the prototype of built-in objects?   *
 *     Or gives undesired access to variables likes document or window?    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var $sanitizeMinErr = angular.$$minErr('$sanitize');
var bind;
var extend;
var forEach;
var isDefined;
var lowercase;
var noop;
var nodeContains;
var htmlParser;
var htmlSanitizeWriter;

/**
 * @ngdoc module
 * @name ngSanitize
 * @description
 *
 * # ngSanitize
 *
 * The `ngSanitize` module provides functionality to sanitize HTML.
 *
 *
 * <div doc-module-components="ngSanitize"></div>
 *
 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.
 */

/**
 * @ngdoc service
 * @name $sanitize
 * @kind function
 *
 * @description
 *   Sanitizes an html string by stripping all potentially dangerous tokens.
 *
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
 *   then serialized back to properly escaped html string. This means that no unsafe input can make
 *   it into the returned string.
 *
 *   The whitelist for URL sanitization of attribute values is configured using the functions
 *   `aHrefSanitizationWhitelist` and `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider
 *   `$compileProvider`}.
 *
 *   The input may also contain SVG markup if this is enabled via {@link $sanitizeProvider}.
 *
 * @param {string} html HTML input.
 * @returns {string} Sanitized HTML.
 *
 * @example
   <example module="sanitizeExample" deps="angular-sanitize.js" name="sanitize-service">
   <file name="index.html">
     <script>
         angular.module('sanitizeExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
             $scope.snippet =
               '<p style="color:blue">an html\n' +
               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +
               'snippet</p>';
             $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml($scope.snippet);
             };
           }]);
     </script>
     <div ng-controller="ExampleController">
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <td>Directive</td>
           <td>How</td>
           <td>Source</td>
           <td>Rendered</td>
         </tr>
         <tr id="bind-html-with-sanitize">
           <td>ng-bind-html</td>
           <td>Automatically uses $sanitize</td>
           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind-html="snippet"></div></td>
         </tr>
         <tr id="bind-html-with-trust">
           <td>ng-bind-html</td>
           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>
           <td>
           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
&lt;/div&gt;</pre>
           </td>
           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>
         </tr>
         <tr id="bind-default">
           <td>ng-bind</td>
           <td>Automatically escapes</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
       </div>
   </file>
   <file name="protractor.js" type="protractor">
     it('should sanitize the html snippet by default', function() {
       expect(element(by.css('#bind-html-with-sanitize div')).getAttribute('innerHTML')).
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
     });

     it('should inline raw snippet if bound to a trusted value', function() {
       expect(element(by.css('#bind-html-with-trust div')).getAttribute('innerHTML')).
         toBe("<p style=\"color:blue\">an html\n" +
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
              "snippet</p>");
     });

     it('should escape snippet without any filter', function() {
       expect(element(by.css('#bind-default div')).getAttribute('innerHTML')).
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
              "snippet&lt;/p&gt;");
     });

     it('should update', function() {
       element(by.model('snippet')).clear();
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-html-with-sanitize div')).getAttribute('innerHTML')).
         toBe('new <b>text</b>');
       expect(element(by.css('#bind-html-with-trust div')).getAttribute('innerHTML')).toBe(
         'new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-default div')).getAttribute('innerHTML')).toBe(
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
     });
   </file>
   </example>
 */


/**
 * @ngdoc provider
 * @name $sanitizeProvider
 * @this
 *
 * @description
 * Creates and configures {@link $sanitize} instance.
 */
function $SanitizeProvider() {
  var svgEnabled = false;

  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
    if (svgEnabled) {
      extend(validElements, svgElements);
    }
    return function(html) {
      var buf = [];
      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
        return !/^unsafe:/.test($$sanitizeUri(uri, isImage));
      }));
      return buf.join('');
    };
  }];


  /**
   * @ngdoc method
   * @name $sanitizeProvider#enableSvg
   * @kind function
   *
   * @description
   * Enables a subset of svg to be supported by the sanitizer.
   *
   * <div class="alert alert-warning">
   *   <p>By enabling this setting without taking other precautions, you might expose your
   *   application to click-hijacking attacks. In these attacks, sanitized svg elements could be positioned
   *   outside of the containing element and be rendered over other elements on the page (e.g. a login
   *   link). Such behavior can then result in phishing incidents.</p>
   *
   *   <p>To protect against these, explicitly setup `overflow: hidden` css rule for all potential svg
   *   tags within the sanitized content:</p>
   *
   *   <br>
   *
   *   <pre><code>
   *   .rootOfTheIncludedContent svg {
   *     overflow: hidden !important;
   *   }
   *   </code></pre>
   * </div>
   *
   * @param {boolean=} flag Enable or disable SVG support in the sanitizer.
   * @returns {boolean|ng.$sanitizeProvider} Returns the currently configured value if called
   *    without an argument or self for chaining otherwise.
   */
  this.enableSvg = function(enableSvg) {
    if (isDefined(enableSvg)) {
      svgEnabled = enableSvg;
      return this;
    } else {
      return svgEnabled;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Private stuff
  //////////////////////////////////////////////////////////////////////////////////////////////////

  bind = angular.bind;
  extend = angular.extend;
  forEach = angular.forEach;
  isDefined = angular.isDefined;
  lowercase = angular.lowercase;
  noop = angular.noop;

  htmlParser = htmlParserImpl;
  htmlSanitizeWriter = htmlSanitizeWriterImpl;

  nodeContains = window.Node.prototype.contains || /** @this */ function(arg) {
    // eslint-disable-next-line no-bitwise
    return !!(this.compareDocumentPosition(arg) & 16);
  };

  // Regular Expressions for parsing tags and attributes
  var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    // Match everything outside of normal chars and " (quote character)
    NON_ALPHANUMERIC_REGEXP = /([^#-~ |!])/g;


  // Good source of info about elements and attributes
  // http://dev.w3.org/html5/spec/Overview.html#semantics
  // http://simon.html5.org/html-elements

  // Safe Void Elements - HTML5
  // http://dev.w3.org/html5/spec/Overview.html#void-elements
  var voidElements = toMap('area,br,col,hr,img,wbr');

  // Elements that you can, intentionally, leave open (and which close themselves)
  // http://dev.w3.org/html5/spec/Overview.html#optional-tags
  var optionalEndTagBlockElements = toMap('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
      optionalEndTagInlineElements = toMap('rp,rt'),
      optionalEndTagElements = extend({},
                                              optionalEndTagInlineElements,
                                              optionalEndTagBlockElements);

  // Safe Block Elements - HTML5
  var blockElements = extend({}, optionalEndTagBlockElements, toMap('address,article,' +
          'aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
          'h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul'));

  // Inline Elements - HTML5
  var inlineElements = extend({}, optionalEndTagInlineElements, toMap('a,abbr,acronym,b,' +
          'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,' +
          'samp,small,span,strike,strong,sub,sup,time,tt,u,var'));

  // SVG Elements
  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
  // Note: the elements animate,animateColor,animateMotion,animateTransform,set are intentionally omitted.
  // They can potentially allow for arbitrary javascript to be executed. See #11290
  var svgElements = toMap('circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,' +
          'hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,' +
          'radialGradient,rect,stop,svg,switch,text,title,tspan');

  // Blocked Elements (will be stripped)
  var blockedElements = toMap('script,style');

  var validElements = extend({},
                                     voidElements,
                                     blockElements,
                                     inlineElements,
                                     optionalEndTagElements);

  //Attributes that have href and hence need to be sanitized
  var uriAttrs = toMap('background,cite,href,longdesc,src,xlink:href');

  var htmlAttrs = toMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
      'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
      'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
      'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
      'valign,value,vspace,width');

  // SVG attributes (without "id" and "name" attributes)
  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
  var svgAttrs = toMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
      'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +
      'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +
      'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +
      'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +
      'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +
      'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +
      'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +
      'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +
      'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +
      'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +
      'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +
      'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +
      'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +
      'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);

  var validAttrs = extend({},
                                  uriAttrs,
                                  svgAttrs,
                                  htmlAttrs);

  function toMap(str, lowercaseKeys) {
    var obj = {}, items = str.split(','), i;
    for (i = 0; i < items.length; i++) {
      obj[lowercaseKeys ? lowercase(items[i]) : items[i]] = true;
    }
    return obj;
  }

  var inertBodyElement;
  (function(window) {
    var doc;
    if (window.document && window.document.implementation) {
      doc = window.document.implementation.createHTMLDocument('inert');
    } else {
      throw $sanitizeMinErr('noinert', 'Can\'t create an inert html document');
    }
    var docElement = doc.documentElement || doc.getDocumentElement();
    var bodyElements = docElement.getElementsByTagName('body');

    // usually there should be only one body element in the document, but IE doesn't have any, so we need to create one
    if (bodyElements.length === 1) {
      inertBodyElement = bodyElements[0];
    } else {
      var html = doc.createElement('html');
      inertBodyElement = doc.createElement('body');
      html.appendChild(inertBodyElement);
      doc.appendChild(html);
    }
  })(window);

  /**
   * @example
   * htmlParser(htmlString, {
   *     start: function(tag, attrs) {},
   *     end: function(tag) {},
   *     chars: function(text) {},
   *     comment: function(text) {}
   * });
   *
   * @param {string} html string
   * @param {object} handler
   */
  function htmlParserImpl(html, handler) {
    if (html === null || html === undefined) {
      html = '';
    } else if (typeof html !== 'string') {
      html = '' + html;
    }
    inertBodyElement.innerHTML = html;

    //mXSS protection
    var mXSSAttempts = 5;
    do {
      if (mXSSAttempts === 0) {
        throw $sanitizeMinErr('uinput', 'Failed to sanitize html because the input is unstable');
      }
      mXSSAttempts--;

      // strip custom-namespaced attributes on IE<=11
      if (window.document.documentMode) {
        stripCustomNsAttrs(inertBodyElement);
      }
      html = inertBodyElement.innerHTML; //trigger mXSS
      inertBodyElement.innerHTML = html;
    } while (html !== inertBodyElement.innerHTML);

    var node = inertBodyElement.firstChild;
    while (node) {
      switch (node.nodeType) {
        case 1: // ELEMENT_NODE
          handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));
          break;
        case 3: // TEXT NODE
          handler.chars(node.textContent);
          break;
      }

      var nextNode;
      if (!(nextNode = node.firstChild)) {
        if (node.nodeType === 1) {
          handler.end(node.nodeName.toLowerCase());
        }
        nextNode = getNonDescendant('nextSibling', node);
        if (!nextNode) {
          while (nextNode == null) {
            node = getNonDescendant('parentNode', node);
            if (node === inertBodyElement) break;
            nextNode = getNonDescendant('nextSibling', node);
            if (node.nodeType === 1) {
              handler.end(node.nodeName.toLowerCase());
            }
          }
        }
      }
      node = nextNode;
    }

    while ((node = inertBodyElement.firstChild)) {
      inertBodyElement.removeChild(node);
    }
  }

  function attrToMap(attrs) {
    var map = {};
    for (var i = 0, ii = attrs.length; i < ii; i++) {
      var attr = attrs[i];
      map[attr.name] = attr.value;
    }
    return map;
  }


  /**
   * Escapes all potentially dangerous characters, so that the
   * resulting string can be safely inserted into attribute or
   * element text.
   * @param value
   * @returns {string} escaped text
   */
  function encodeEntities(value) {
    return value.
      replace(/&/g, '&amp;').
      replace(SURROGATE_PAIR_REGEXP, function(value) {
        var hi = value.charCodeAt(0);
        var low = value.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
      }).
      replace(NON_ALPHANUMERIC_REGEXP, function(value) {
        return '&#' + value.charCodeAt(0) + ';';
      }).
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;');
  }

  /**
   * create an HTML/XML writer which writes to buffer
   * @param {Array} buf use buf.join('') to get out sanitized html string
   * @returns {object} in the form of {
   *     start: function(tag, attrs) {},
   *     end: function(tag) {},
   *     chars: function(text) {},
   *     comment: function(text) {}
   * }
   */
  function htmlSanitizeWriterImpl(buf, uriValidator) {
    var ignoreCurrentElement = false;
    var out = bind(buf, buf.push);
    return {
      start: function(tag, attrs) {
        tag = lowercase(tag);
        if (!ignoreCurrentElement && blockedElements[tag]) {
          ignoreCurrentElement = tag;
        }
        if (!ignoreCurrentElement && validElements[tag] === true) {
          out('<');
          out(tag);
          forEach(attrs, function(value, key) {
            var lkey = lowercase(key);
            var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
            if (validAttrs[lkey] === true &&
              (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
              out(' ');
              out(key);
              out('="');
              out(encodeEntities(value));
              out('"');
            }
          });
          out('>');
        }
      },
      end: function(tag) {
        tag = lowercase(tag);
        if (!ignoreCurrentElement && validElements[tag] === true && voidElements[tag] !== true) {
          out('</');
          out(tag);
          out('>');
        }
        // eslint-disable-next-line eqeqeq
        if (tag == ignoreCurrentElement) {
          ignoreCurrentElement = false;
        }
      },
      chars: function(chars) {
        if (!ignoreCurrentElement) {
          out(encodeEntities(chars));
        }
      }
    };
  }


  /**
   * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare
   * ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). This is undesirable since we don't want
   * to allow any of these custom attributes. This method strips them all.
   *
   * @param node Root element to process
   */
  function stripCustomNsAttrs(node) {
    while (node) {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        var attrs = node.attributes;
        for (var i = 0, l = attrs.length; i < l; i++) {
          var attrNode = attrs[i];
          var attrName = attrNode.name.toLowerCase();
          if (attrName === 'xmlns:ns1' || attrName.lastIndexOf('ns1:', 0) === 0) {
            node.removeAttributeNode(attrNode);
            i--;
            l--;
          }
        }
      }

      var nextNode = node.firstChild;
      if (nextNode) {
        stripCustomNsAttrs(nextNode);
      }

      node = getNonDescendant('nextSibling', node);
    }
  }

  function getNonDescendant(propName, node) {
    // An element is clobbered if its `propName` property points to one of its descendants
    var nextNode = node[propName];
    if (nextNode && nodeContains.call(node, nextNode)) {
      throw $sanitizeMinErr('elclob', 'Failed to sanitize html because the element is clobbered: {0}', node.outerHTML || node.outerText);
    }
    return nextNode;
  }
}

function sanitizeText(chars) {
  var buf = [];
  var writer = htmlSanitizeWriter(buf, noop);
  writer.chars(chars);
  return buf.join('');
}


// define ngSanitize module and register $sanitize service
angular.module('ngSanitize', [])
  .provider('$sanitize', $SanitizeProvider)
  .info({ angularVersion: '1.6.4' });

/**
 * @ngdoc filter
 * @name linky
 * @kind function
 *
 * @description
 * Finds links in text input and turns them into html links. Supports `http/https/ftp/mailto` and
 * plain email address links.
 *
 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.
 *
 * @param {string} text Input text.
 * @param {string} target Window (`_blank|_self|_parent|_top`) or named frame to open links in.
 * @param {object|function(url)} [attributes] Add custom attributes to the link element.
 *
 *    Can be one of:
 *
 *    - `object`: A map of attributes
 *    - `function`: Takes the url as a parameter and returns a map of attributes
 *
 *    If the map of attributes contains a value for `target`, it overrides the value of
 *    the target parameter.
 *
 *
 * @returns {string} Html-linkified and {@link $sanitize sanitized} text.
 *
 * @usage
   <span ng-bind-html="linky_expression | linky"></span>
 *
 * @example
   <example module="linkyExample" deps="angular-sanitize.js" name="linky-filter">
     <file name="index.html">
       <div ng-controller="ExampleController">
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <th>Filter</th>
           <th>Source</th>
           <th>Rendered</th>
         </tr>
         <tr id="linky-filter">
           <td>linky filter</td>
           <td>
             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>
           </td>
           <td>
             <div ng-bind-html="snippet | linky"></div>
           </td>
         </tr>
         <tr id="linky-target">
          <td>linky target</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithSingleURL | linky:'_blank'"></div>
          </td>
         </tr>
         <tr id="linky-custom-attributes">
          <td>linky custom attributes</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"></div>
          </td>
         </tr>
         <tr id="escaped-html">
           <td>no filter</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
     </file>
     <file name="script.js">
       angular.module('linkyExample', ['ngSanitize'])
         .controller('ExampleController', ['$scope', function($scope) {
           $scope.snippet =
             'Pretty text with some links:\n' +
             'http://angularjs.org/,\n' +
             'mailto:us@somewhere.org,\n' +
             'another@somewhere.org,\n' +
             'and one more: ftp://127.0.0.1/.';
           $scope.snippetWithSingleURL = 'http://angularjs.org/';
         }]);
     </file>
     <file name="protractor.js" type="protractor">
       it('should linkify the snippet with urls', function() {
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
       });

       it('should not linkify snippet without the linky filter', function() {
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
       });

       it('should update', function() {
         element(by.model('snippet')).clear();
         element(by.model('snippet')).sendKeys('new http://link.');
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('new http://link.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
             .toBe('new http://link.');
       });

       it('should work with the target property', function() {
        expect(element(by.id('linky-target')).
            element(by.binding("snippetWithSingleURL | linky:'_blank'")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
       });

       it('should optionally add custom attributes', function() {
        expect(element(by.id('linky-custom-attributes')).
            element(by.binding("snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-custom-attributes a')).getAttribute('rel')).toEqual('nofollow');
       });
     </file>
   </example>
 */
angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
  var LINKY_URL_REGEXP =
        /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
      MAILTO_REGEXP = /^mailto:/i;

  var linkyMinErr = angular.$$minErr('linky');
  var isDefined = angular.isDefined;
  var isFunction = angular.isFunction;
  var isObject = angular.isObject;
  var isString = angular.isString;

  return function(text, target, attributes) {
    if (text == null || text === '') return text;
    if (!isString(text)) throw linkyMinErr('notstring', 'Expected string but received: {0}', text);

    var attributesFn =
      isFunction(attributes) ? attributes :
      isObject(attributes) ? function getAttributesObject() {return attributes;} :
      function getEmptyAttributesObject() {return {};};

    var match;
    var raw = text;
    var html = [];
    var url;
    var i;
    while ((match = raw.match(LINKY_URL_REGEXP))) {
      // We can not end in these as they are sometimes found at the end of the sentence
      url = match[0];
      // if we did not match ftp/http/www/mailto then assume mailto
      if (!match[2] && !match[4]) {
        url = (match[3] ? 'http://' : 'mailto:') + url;
      }
      i = match.index;
      addText(raw.substr(0, i));
      addLink(url, match[0].replace(MAILTO_REGEXP, ''));
      raw = raw.substring(i + match[0].length);
    }
    addText(raw);
    return $sanitize(html.join(''));

    function addText(text) {
      if (!text) {
        return;
      }
      html.push(sanitizeText(text));
    }

    function addLink(url, text) {
      var key, linkAttributes = attributesFn(url);
      html.push('<a ');

      for (key in linkAttributes) {
        html.push(key + '="' + linkAttributes[key] + '" ');
      }

      if (isDefined(target) && !('target' in linkAttributes)) {
        html.push('target="',
                  target,
                  '" ');
      }
      html.push('href="',
                url.replace(/"/g, '&quot;'),
                '">');
      addText(text);
      html.push('</a>');
    }
  };
}]);


})(window, window.angular);


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
module.exports = 'ngSanitize';


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Angular 1 Directives
 *
 * These are the directives included in UI-Router for Angular 1.
 * These directives are used in templates to create viewports and link/navigate to states.
 *
 * @ng1api
 * @preferred
 * @module directives
 */ /** for typedoc */
var angular_1 = __webpack_require__(12);
var core_1 = __webpack_require__(5);
/** @hidden */
function parseStateRef(ref) {
    var paramsOnly = ref.match(/^\s*({[^}]*})\s*$/), parsed;
    if (paramsOnly)
        ref = '(' + paramsOnly[1] + ')';
    parsed = ref.replace(/\n/g, " ").match(/^\s*([^(]*?)\s*(\((.*)\))?\s*$/);
    if (!parsed || parsed.length !== 4)
        throw new Error("Invalid state ref '" + ref + "'");
    return { state: parsed[1] || null, paramExpr: parsed[3] || null };
}
/** @hidden */
function stateContext(el) {
    var $uiView = el.parent().inheritedData('$uiView');
    var path = core_1.parse('$cfg.path')($uiView);
    return path ? core_1.tail(path).state.name : undefined;
}
/** @hidden */
function processedDef($state, $element, def) {
    var uiState = def.uiState || $state.current.name;
    var uiStateOpts = core_1.extend(defaultOpts($element, $state), def.uiStateOpts || {});
    var href = $state.href(uiState, def.uiStateParams, uiStateOpts);
    return { uiState: uiState, uiStateParams: def.uiStateParams, uiStateOpts: uiStateOpts, href: href };
}
/** @hidden */
function getTypeInfo(el) {
    // SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.
    var isSvg = Object.prototype.toString.call(el.prop('href')) === '[object SVGAnimatedString]';
    var isForm = el[0].nodeName === "FORM";
    return {
        attr: isForm ? "action" : (isSvg ? 'xlink:href' : 'href'),
        isAnchor: el.prop("tagName").toUpperCase() === "A",
        clickable: !isForm
    };
}
/** @hidden */
function clickHook(el, $state, $timeout, type, getDef) {
    return function (e) {
        var button = e.which || e.button, target = getDef();
        if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr('target'))) {
            // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
            var transition = $timeout(function () {
                $state.go(target.uiState, target.uiStateParams, target.uiStateOpts);
            });
            e.preventDefault();
            // if the state has no URL, ignore one preventDefault from the <a> directive.
            var ignorePreventDefaultCount = type.isAnchor && !target.href ? 1 : 0;
            e.preventDefault = function () {
                if (ignorePreventDefaultCount-- <= 0)
                    $timeout.cancel(transition);
            };
        }
    };
}
/** @hidden */
function defaultOpts(el, $state) {
    return {
        relative: stateContext(el) || $state.$current,
        inherit: true,
        source: "sref"
    };
}
/** @hidden */
function bindEvents(element, scope, hookFn, uiStateOpts) {
    var events;
    if (uiStateOpts) {
        events = uiStateOpts.events;
    }
    if (!core_1.isArray(events)) {
        events = ['click'];
    }
    var on = element.on ? 'on' : 'bind';
    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
        var event_1 = events_1[_i];
        element[on](event_1, hookFn);
    }
    scope.$on('$destroy', function () {
        var off = element.off ? 'off' : 'unbind';
        for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
            var event_2 = events_2[_i];
            element[off](event_2, hookFn);
        }
    });
}
/**
 * `ui-sref`: A directive for linking to a state
 *
 * A directive which links to a state (and optionally, parameters).
 * When clicked, this directive activates the linked state with the supplied parameter values.
 *
 * ### Linked State
 * The attribute value of the `ui-sref` is the name of the state to link to.
 *
 * #### Example:
 * This will activate the `home` state when the link is clicked.
 * ```html
 * <a ui-sref="home">Home</a>
 * ```
 *
 * ### Relative Links
 * You can also use relative state paths within `ui-sref`, just like a relative path passed to `$state.go()` ([[StateService.go]]).
 * You just need to be aware that the path is relative to the state that *created* the link.
 * This allows a state to create a relative `ui-sref` which always targets the same destination.
 *
 * #### Example:
 * Both these links are relative to the parent state, even when a child state is currently active.
 * ```html
 * <a ui-sref=".child1">child 1 state</a>
 * <a ui-sref=".child2">child 2 state</a>
 * ```
 *
 * This link activates the parent state.
 * ```html
 * <a ui-sref="^">Return</a>
 * ```
 *
 * ### hrefs
 * If the linked state has a URL, the directive will automatically generate and
 * update the `href` attribute (using the [[StateService.href]]  method).
 *
 * #### Example:
 * Assuming the `users` state has a url of `/users/`
 * ```html
 * <a ui-sref="users" href="/users/">Users</a>
 * ```
 *
 * ### Parameter Values
 * In addition to the state name, a `ui-sref` can include parameter values which are applied when activating the state.
 * Param values can be provided in the `ui-sref` value after the state name, enclosed by parentheses.
 * The content inside the parentheses is an expression, evaluated to the parameter values.
 *
 * #### Example:
 * This example renders a list of links to users.
 * The state's `userId` parameter value comes from each user's `user.id` property.
 * ```html
 * <li ng-repeat="user in users">
 *   <a ui-sref="users.detail({ userId: user.id })">{{ user.displayName }}</a>
 * </li>
 * ```
 *
 * Note:
 * The parameter values expression is `$watch`ed for updates.
 *
 * ### Transition Options
 * You can specify [[TransitionOptions]] to pass to [[StateService.go]] by using the `ui-sref-opts` attribute.
 * Options are restricted to `location`, `inherit`, and `reload`.
 *
 * #### Example:
 * ```html
 * <a ui-sref="home" ui-sref-opts="{ reload: true }">Home</a>
 * ```
 *
 * ### Other DOM Events
 *
 * You can also customize which DOM events to respond to (instead of `click`) by
 * providing an `events` array in the `ui-sref-opts` attribute.
 *
 * #### Example:
 * ```html
 * <input type="text" ui-sref="contacts" ui-sref-opts="{ events: ['change', 'blur'] }">
 * ```
 *
 * ### Highlighting the active link
 * This directive can be used in conjunction with [[uiSrefActive]] to highlight the active link.
 *
 * ### Examples
 * If you have the following template:
 *
 * ```html
 * <a ui-sref="home">Home</a>
 * <a ui-sref="about">About</a>
 * <a ui-sref="{page: 2}">Next page</a>
 *
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
 *     </li>
 * </ul>
 * ```
 *
 * Then (assuming the current state is `contacts`) the rendered html including hrefs would be:
 *
 * ```html
 * <a href="#/home" ui-sref="home">Home</a>
 * <a href="#/about" ui-sref="about">About</a>
 * <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
 *
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
 *     </li>
 * </ul>
 *
 * <a href="#/home" ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
 * ```
 *
 * ### Notes
 *
 * - You can use `ui-sref` to change **only the parameter values** by omitting the state name and parentheses.
 * #### Example:
 * Sets the `lang` parameter to `en` and remains on the same state.
 *
 * ```html
 * <a ui-sref="{ lang: 'en' }">English</a>
 * ```
 *
 * - A middle-click, right-click, or ctrl-click is handled (natively) by the browser to open the href in a new window, for example.
 *
 * - Unlike the parameter values expression, the state name is not `$watch`ed (for performance reasons).
 * If you need to dynamically update the state being linked to, use the fully dynamic [[uiState]] directive.
 */
var uiSref;
uiSref = ['$uiRouter', '$timeout',
    function $StateRefDirective($uiRouter, $timeout) {
        var $state = $uiRouter.stateService;
        return {
            restrict: 'A',
            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
            link: function (scope, element, attrs, uiSrefActive) {
                var type = getTypeInfo(element);
                var active = uiSrefActive[1] || uiSrefActive[0];
                var unlinkInfoFn = null;
                var hookFn;
                var rawDef = {};
                var getDef = function () { return processedDef($state, element, rawDef); };
                var ref = parseStateRef(attrs.uiSref);
                rawDef.uiState = ref.state;
                rawDef.uiStateOpts = attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {};
                function update() {
                    var def = getDef();
                    if (unlinkInfoFn)
                        unlinkInfoFn();
                    if (active)
                        unlinkInfoFn = active.$$addStateInfo(def.uiState, def.uiStateParams);
                    if (def.href != null)
                        attrs.$set(type.attr, def.href);
                }
                if (ref.paramExpr) {
                    scope.$watch(ref.paramExpr, function (val) {
                        rawDef.uiStateParams = core_1.extend({}, val);
                        update();
                    }, true);
                    rawDef.uiStateParams = core_1.extend({}, scope.$eval(ref.paramExpr));
                }
                update();
                scope.$on('$destroy', $uiRouter.stateRegistry.onStatesChanged(update));
                scope.$on('$destroy', $uiRouter.transitionService.onSuccess({}, update));
                if (!type.clickable)
                    return;
                hookFn = clickHook(element, $state, $timeout, type, getDef);
                bindEvents(element, scope, hookFn, rawDef.uiStateOpts);
            }
        };
    }];
/**
 * `ui-state`: A fully dynamic directive for linking to a state
 *
 * A directive which links to a state (and optionally, parameters).
 * When clicked, this directive activates the linked state with the supplied parameter values.
 *
 * **This directive is very similar to [[uiSref]], but it `$observe`s and `$watch`es/evaluates all its inputs.**
 *
 * A directive which links to a state (and optionally, parameters).
 * When clicked, this directive activates the linked state with the supplied parameter values.
 *
 * ### Linked State
 * The attribute value of `ui-state` is an expression which is `$watch`ed and evaluated as the state to link to.
 * **This is in contrast with `ui-sref`, which takes a state name as a string literal.**
 *
 * #### Example:
 * Create a list of links.
 * ```html
 * <li ng-repeat="link in navlinks">
 *   <a ui-state="link.state">{{ link.displayName }}</a>
 * </li>
 * ```
 *
 * ### Relative Links
 * If the expression evaluates to a relative path, it is processed like [[uiSref]].
 * You just need to be aware that the path is relative to the state that *created* the link.
 * This allows a state to create relative `ui-state` which always targets the same destination.
 *
 * ### hrefs
 * If the linked state has a URL, the directive will automatically generate and
 * update the `href` attribute (using the [[StateService.href]]  method).
 *
 * ### Parameter Values
 * In addition to the state name expression, a `ui-state` can include parameter values which are applied when activating the state.
 * Param values should be provided using the `ui-state-params` attribute.
 * The `ui-state-params` attribute value is `$watch`ed and evaluated as an expression.
 *
 * #### Example:
 * This example renders a list of links with param values.
 * The state's `userId` parameter value comes from each user's `user.id` property.
 * ```html
 * <li ng-repeat="link in navlinks">
 *   <a ui-state="link.state" ui-state-params="link.params">{{ link.displayName }}</a>
 * </li>
 * ```
 *
 * ### Transition Options
 * You can specify [[TransitionOptions]] to pass to [[StateService.go]] by using the `ui-state-opts` attribute.
 * Options are restricted to `location`, `inherit`, and `reload`.
 * The value of the `ui-state-opts` is `$watch`ed and evaluated as an expression.
 *
 * #### Example:
 * ```html
 * <a ui-state="returnto.state" ui-state-opts="{ reload: true }">Home</a>
 * ```
 *
 * ### Other DOM Events
 *
 * You can also customize which DOM events to respond to (instead of `click`) by
 * providing an `events` array in the `ui-state-opts` attribute.
 *
 * #### Example:
 * ```html
 * <input type="text" ui-state="contacts" ui-state-opts="{ events: ['change', 'blur'] }">
 * ```
 *
 * ### Highlighting the active link
 * This directive can be used in conjunction with [[uiSrefActive]] to highlight the active link.
 *
 * ### Notes
 *
 * - You can use `ui-params` to change **only the parameter values** by omitting the state name and supplying only `ui-state-params`.
 *   However, it might be simpler to use [[uiSref]] parameter-only links.
 *
 * #### Example:
 * Sets the `lang` parameter to `en` and remains on the same state.
 *
 * ```html
 * <a ui-state="" ui-state-params="{ lang: 'en' }">English</a>
 * ```
 *
 * - A middle-click, right-click, or ctrl-click is handled (natively) by the browser to open the href in a new window, for example.
 * ```
 */
var uiState;
uiState = ['$uiRouter', '$timeout',
    function $StateRefDynamicDirective($uiRouter, $timeout) {
        var $state = $uiRouter.stateService;
        return {
            restrict: 'A',
            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
            link: function (scope, element, attrs, uiSrefActive) {
                var type = getTypeInfo(element);
                var active = uiSrefActive[1] || uiSrefActive[0];
                var unlinkInfoFn = null;
                var hookFn;
                var rawDef = {};
                var getDef = function () { return processedDef($state, element, rawDef); };
                var inputAttrs = ['uiState', 'uiStateParams', 'uiStateOpts'];
                var watchDeregFns = inputAttrs.reduce(function (acc, attr) { return (acc[attr] = core_1.noop, acc); }, {});
                function update() {
                    var def = getDef();
                    if (unlinkInfoFn)
                        unlinkInfoFn();
                    if (active)
                        unlinkInfoFn = active.$$addStateInfo(def.uiState, def.uiStateParams);
                    if (def.href != null)
                        attrs.$set(type.attr, def.href);
                }
                inputAttrs.forEach(function (field) {
                    rawDef[field] = attrs[field] ? scope.$eval(attrs[field]) : null;
                    attrs.$observe(field, function (expr) {
                        watchDeregFns[field]();
                        watchDeregFns[field] = scope.$watch(expr, function (newval) {
                            rawDef[field] = newval;
                            update();
                        }, true);
                    });
                });
                update();
                scope.$on('$destroy', $uiRouter.stateRegistry.onStatesChanged(update));
                scope.$on('$destroy', $uiRouter.transitionService.onSuccess({}, update));
                if (!type.clickable)
                    return;
                hookFn = clickHook(element, $state, $timeout, type, getDef);
                bindEvents(element, scope, hookFn, rawDef.uiStateOpts);
            }
        };
    }];
/**
 * `ui-sref-active` and `ui-sref-active-eq`: A directive that adds a CSS class when a `ui-sref` is active
 *
 * A directive working alongside [[uiSref]] and [[uiState]] to add classes to an element when the
 * related directive's state is active (and remove them when it is inactive).
 *
 * The primary use-case is to highlight the active link in navigation menus,
 * distinguishing it from the inactive menu items.
 *
 * ### Linking to a `ui-sref` or `ui-state`
 * `ui-sref-active` can live on the same element as `ui-sref`/`ui-state`, or it can be on a parent element.
 * If a `ui-sref-active` is a parent to more than one `ui-sref`/`ui-state`, it will apply the CSS class when **any of the links are active**.
 *
 * ### Matching
 *
 * The `ui-sref-active` directive applies the CSS class when the `ui-sref`/`ui-state`'s target state **or any child state is active**.
 * This is a "fuzzy match" which uses [[StateService.includes]].
 *
 * The `ui-sref-active-eq` directive applies the CSS class when the `ui-sref`/`ui-state`'s target state is directly active (not when child states are active).
 * This is an "exact match" which uses [[StateService.is]].
 *
 * ### Parameter values
 * If the `ui-sref`/`ui-state` includes parameter values, the current parameter values must match the link's values for the link to be highlighted.
 * This allows a list of links to the same state with different parameters to be rendered, and the correct one highlighted.
 *
 * #### Example:
 * ```html
 * <li ng-repeat="user in users" ui-sref-active="active">
 *   <a ui-sref="user.details({ userId: user.id })">{{ user.lastName }}</a>
 * </li>
 * ```
 *
 * ### Examples
 *
 * Given the following template:
 * #### Example:
 * ```html
 * <ul>
 *   <li ui-sref-active="active" class="item">
 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
 *   </li>
 * </ul>
 * ```
 *
 * When the app state is `app.user` (or any child state),
 * and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 *
 * ```html
 * <ul>
 *   <li ui-sref-active="active" class="item active">
 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
 *   </li>
 * </ul>
 * ```
 *
 * ### Glob mode
 *
 * It is possible to pass `ui-sref-active` an expression that evaluates to an object.
 * The objects keys represent active class names and values represent the respective state names/globs.
 * `ui-sref-active` will match if the current active state **includes** any of
 * the specified state names/globs, even the abstract ones.
 *
 * #### Example:
 * Given the following template, with "admin" being an abstract state:
 * ```html
 * <div ui-sref-active="{'active': 'admin.**'}">
 *   <a ui-sref-active="active" ui-sref="admin.roles">Roles</a>
 * </div>
 * ```
 *
 * When the current state is "admin.roles" the "active" class will be applied to both the <div> and <a> elements.
 * It is important to note that the state names/globs passed to `ui-sref-active` override any state provided by a linked `ui-sref`.
 *
 * ### Notes:
 *
 * - The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * - Multiple classes may be specified in a space-separated format: `ui-sref-active='class1 class2 class3'`
 */
var uiSrefActive;
uiSrefActive = ['$state', '$stateParams', '$interpolate', '$uiRouter',
    function $StateRefActiveDirective($state, $stateParams, $interpolate, $uiRouter) {
        return {
            restrict: "A",
            controller: ['$scope', '$element', '$attrs',
                function ($scope, $element, $attrs) {
                    var states = [], activeEqClass, uiSrefActive;
                    // There probably isn't much point in $observing this
                    // uiSrefActive and uiSrefActiveEq share the same directive object with some
                    // slight difference in logic routing
                    activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);
                    try {
                        uiSrefActive = $scope.$eval($attrs.uiSrefActive);
                    }
                    catch (e) {
                        // Do nothing. uiSrefActive is not a valid expression.
                        // Fall back to using $interpolate below
                    }
                    uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || '', false)($scope);
                    if (core_1.isObject(uiSrefActive)) {
                        core_1.forEach(uiSrefActive, function (stateOrName, activeClass) {
                            if (core_1.isString(stateOrName)) {
                                var ref = parseStateRef(stateOrName);
                                addState(ref.state, $scope.$eval(ref.paramExpr), activeClass);
                            }
                        });
                    }
                    // Allow uiSref to communicate with uiSrefActive[Equals]
                    this.$$addStateInfo = function (newState, newParams) {
                        // we already got an explicit state provided by ui-sref-active, so we
                        // shadow the one that comes from ui-sref
                        if (core_1.isObject(uiSrefActive) && states.length > 0) {
                            return;
                        }
                        var deregister = addState(newState, newParams, uiSrefActive);
                        update();
                        return deregister;
                    };
                    function updateAfterTransition(trans) {
                        trans.promise.then(update);
                    }
                    $scope.$on('$stateChangeSuccess', update);
                    $scope.$on('$destroy', $uiRouter.transitionService.onStart({}, updateAfterTransition));
                    if ($uiRouter.globals.transition) {
                        updateAfterTransition($uiRouter.globals.transition);
                    }
                    function addState(stateName, stateParams, activeClass) {
                        var state = $state.get(stateName, stateContext($element));
                        var stateInfo = {
                            state: state || { name: stateName },
                            params: stateParams,
                            activeClass: activeClass
                        };
                        states.push(stateInfo);
                        return function removeState() {
                            core_1.removeFrom(states)(stateInfo);
                        };
                    }
                    // Update route state
                    function update() {
                        var splitClasses = function (str) {
                            return str.split(/\s/).filter(core_1.identity);
                        };
                        var getClasses = function (stateList) {
                            return stateList.map(function (x) { return x.activeClass; }).map(splitClasses).reduce(core_1.unnestR, []);
                        };
                        var allClasses = getClasses(states).concat(splitClasses(activeEqClass)).reduce(core_1.uniqR, []);
                        var fuzzyClasses = getClasses(states.filter(function (x) { return $state.includes(x.state.name, x.params); }));
                        var exactlyMatchesAny = !!states.filter(function (x) { return $state.is(x.state.name, x.params); }).length;
                        var exactClasses = exactlyMatchesAny ? splitClasses(activeEqClass) : [];
                        var addClasses = fuzzyClasses.concat(exactClasses).reduce(core_1.uniqR, []);
                        var removeClasses = allClasses.filter(function (cls) { return !core_1.inArray(addClasses, cls); });
                        $scope.$evalAsync(function () {
                            addClasses.forEach(function (className) { return $element.addClass(className); });
                            removeClasses.forEach(function (className) { return $element.removeClass(className); });
                        });
                    }
                    update();
                }]
        };
    }];
angular_1.ng.module('ui.router.state')
    .directive('uiSref', uiSref)
    .directive('uiSrefActive', uiSrefActive)
    .directive('uiSrefActiveEq', uiSrefActive)
    .directive('uiState', uiState);
//# sourceMappingURL=stateDirectives.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @ng1api
 * @module directives
 */ /** for typedoc */
var angular_1 = __webpack_require__(12);
var angular_2 = __webpack_require__(3);
var core_1 = __webpack_require__(5);
var views_1 = __webpack_require__(32);
var services_1 = __webpack_require__(31);
exports.uiView = ['$view', '$animate', '$uiViewScroll', '$interpolate', '$q',
    function $ViewDirective($view, $animate, $uiViewScroll, $interpolate, $q) {
        function getRenderer(attrs, scope) {
            return {
                enter: function (element, target, cb) {
                    if (angular_1.ng.version.minor > 2) {
                        $animate.enter(element, null, target).then(cb);
                    }
                    else {
                        $animate.enter(element, null, target, cb);
                    }
                },
                leave: function (element, cb) {
                    if (angular_1.ng.version.minor > 2) {
                        $animate.leave(element).then(cb);
                    }
                    else {
                        $animate.leave(element, cb);
                    }
                }
            };
        }
        function configsEqual(config1, config2) {
            return config1 === config2;
        }
        var rootData = {
            $cfg: { viewDecl: { $context: $view._pluginapi._rootViewContext() } },
            $uiView: {}
        };
        var directive = {
            count: 0,
            restrict: 'ECA',
            terminal: true,
            priority: 400,
            transclude: 'element',
            compile: function (tElement, tAttrs, $transclude) {
                return function (scope, $element, attrs) {
                    var previousEl, currentEl, currentScope, unregister, onloadExp = attrs['onload'] || '', autoScrollExp = attrs['autoscroll'], renderer = getRenderer(attrs, scope), viewConfig = undefined, inherited = $element.inheritedData('$uiView') || rootData, name = $interpolate(attrs['uiView'] || attrs['name'] || '')(scope) || '$default';
                    var activeUIView = {
                        $type: 'ng1',
                        id: directive.count++,
                        name: name,
                        fqn: inherited.$uiView.fqn ? inherited.$uiView.fqn + "." + name : name,
                        config: null,
                        configUpdated: configUpdatedCallback,
                        get creationContext() {
                            var fromParentTagConfig = core_1.parse('$cfg.viewDecl.$context')(inherited);
                            // Allow <ui-view name="foo"><ui-view name="bar"></ui-view></ui-view>
                            // See https://github.com/angular-ui/ui-router/issues/3355
                            var fromParentTag = core_1.parse('$uiView.creationContext')(inherited);
                            return fromParentTagConfig || fromParentTag;
                        }
                    };
                    core_1.trace.traceUIViewEvent("Linking", activeUIView);
                    function configUpdatedCallback(config) {
                        if (config && !(config instanceof views_1.Ng1ViewConfig))
                            return;
                        if (configsEqual(viewConfig, config))
                            return;
                        core_1.trace.traceUIViewConfigUpdated(activeUIView, config && config.viewDecl && config.viewDecl.$context);
                        viewConfig = config;
                        updateView(config);
                    }
                    $element.data('$uiView', { $uiView: activeUIView });
                    updateView();
                    unregister = $view.registerUIView(activeUIView);
                    scope.$on("$destroy", function () {
                        core_1.trace.traceUIViewEvent("Destroying/Unregistering", activeUIView);
                        unregister();
                    });
                    function cleanupLastView() {
                        if (previousEl) {
                            core_1.trace.traceUIViewEvent("Removing (previous) el", previousEl.data('$uiView'));
                            previousEl.remove();
                            previousEl = null;
                        }
                        if (currentScope) {
                            core_1.trace.traceUIViewEvent("Destroying scope", activeUIView);
                            currentScope.$destroy();
                            currentScope = null;
                        }
                        if (currentEl) {
                            var _viewData_1 = currentEl.data('$uiViewAnim');
                            core_1.trace.traceUIViewEvent("Animate out", _viewData_1);
                            renderer.leave(currentEl, function () {
                                _viewData_1.$$animLeave.resolve();
                                previousEl = null;
                            });
                            previousEl = currentEl;
                            currentEl = null;
                        }
                    }
                    function updateView(config) {
                        var newScope = scope.$new();
                        var animEnter = $q.defer(), animLeave = $q.defer();
                        var $uiViewData = {
                            $cfg: config,
                            $uiView: activeUIView,
                        };
                        var $uiViewAnim = {
                            $animEnter: animEnter.promise,
                            $animLeave: animLeave.promise,
                            $$animLeave: animLeave
                        };
                        /**
                         * @ngdoc event
                         * @name ui.router.state.directive:ui-view#$viewContentLoading
                         * @eventOf ui.router.state.directive:ui-view
                         * @eventType emits on ui-view directive scope
                         * @description
                         *
                         * Fired once the view **begins loading**, *before* the DOM is rendered.
                         *
                         * @param {Object} event Event object.
                         * @param {string} viewName Name of the view.
                         */
                        newScope.$emit('$viewContentLoading', name);
                        var cloned = $transclude(newScope, function (clone) {
                            clone.data('$uiViewAnim', $uiViewAnim);
                            clone.data('$uiView', $uiViewData);
                            renderer.enter(clone, $element, function onUIViewEnter() {
                                animEnter.resolve();
                                if (currentScope)
                                    currentScope.$emit('$viewContentAnimationEnded');
                                if (core_1.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                                    $uiViewScroll(clone);
                                }
                            });
                            cleanupLastView();
                        });
                        currentEl = cloned;
                        currentScope = newScope;
                        /**
                         * @ngdoc event
                         * @name ui.router.state.directive:ui-view#$viewContentLoaded
                         * @eventOf ui.router.state.directive:ui-view
                         * @eventType emits on ui-view directive scope
                         * @description           *
                         * Fired once the view is **loaded**, *after* the DOM is rendered.
                         *
                         * @param {Object} event Event object.
                         */
                        currentScope.$emit('$viewContentLoaded', config || viewConfig);
                        currentScope.$eval(onloadExp);
                    }
                };
            }
        };
        return directive;
    }];
$ViewDirectiveFill.$inject = ['$compile', '$controller', '$transitions', '$view', '$q', '$timeout'];
/** @hidden */
function $ViewDirectiveFill($compile, $controller, $transitions, $view, $q, $timeout) {
    var getControllerAs = core_1.parse('viewDecl.controllerAs');
    var getResolveAs = core_1.parse('viewDecl.resolveAs');
    return {
        restrict: 'ECA',
        priority: -400,
        compile: function (tElement) {
            var initial = tElement.html();
            tElement.empty();
            return function (scope, $element) {
                var data = $element.data('$uiView');
                if (!data) {
                    $element.html(initial);
                    $compile($element.contents())(scope);
                    return;
                }
                var cfg = data.$cfg || { viewDecl: {}, getTemplate: angular_2.noop };
                var resolveCtx = cfg.path && new core_1.ResolveContext(cfg.path);
                $element.html(cfg.getTemplate($element, resolveCtx) || initial);
                core_1.trace.traceUIViewFill(data.$uiView, $element.html());
                var link = $compile($element.contents());
                var controller = cfg.controller;
                var controllerAs = getControllerAs(cfg);
                var resolveAs = getResolveAs(cfg);
                var locals = resolveCtx && services_1.getLocals(resolveCtx);
                scope[resolveAs] = locals;
                if (controller) {
                    var controllerInstance = $controller(controller, core_1.extend({}, locals, { $scope: scope, $element: $element }));
                    if (controllerAs) {
                        scope[controllerAs] = controllerInstance;
                        scope[controllerAs][resolveAs] = locals;
                    }
                    // TODO: Use $view service as a central point for registering component-level hooks
                    // Then, when a component is created, tell the $view service, so it can invoke hooks
                    // $view.componentLoaded(controllerInstance, { $scope: scope, $element: $element });
                    // scope.$on('$destroy', () => $view.componentUnloaded(controllerInstance, { $scope: scope, $element: $element }));
                    $element.data('$ngControllerController', controllerInstance);
                    $element.children().data('$ngControllerController', controllerInstance);
                    registerControllerCallbacks($q, $transitions, controllerInstance, scope, cfg);
                }
                // Wait for the component to appear in the DOM
                if (core_1.isString(cfg.viewDecl.component)) {
                    var cmp_1 = cfg.viewDecl.component;
                    var kebobName = core_1.kebobString(cmp_1);
                    var tagRegexp_1 = new RegExp("^(x-|data-)?" + kebobName + "$", "i");
                    var getComponentController = function () {
                        var directiveEl = [].slice.call($element[0].children)
                            .filter(function (el) { return el && el.tagName && tagRegexp_1.exec(el.tagName); });
                        return directiveEl && angular_1.ng.element(directiveEl).data("$" + cmp_1 + "Controller");
                    };
                    var deregisterWatch_1 = scope.$watch(getComponentController, function (ctrlInstance) {
                        if (!ctrlInstance)
                            return;
                        registerControllerCallbacks($q, $transitions, ctrlInstance, scope, cfg);
                        deregisterWatch_1();
                    });
                }
                link(scope);
            };
        }
    };
}
/** @hidden */
var hasComponentImpl = typeof angular_1.ng.module('ui.router')['component'] === 'function';
/** @hidden incrementing id */
var _uiCanExitId = 0;
/** @hidden TODO: move these callbacks to $view and/or `/hooks/components.ts` or something */
function registerControllerCallbacks($q, $transitions, controllerInstance, $scope, cfg) {
    // Call $onInit() ASAP
    if (core_1.isFunction(controllerInstance.$onInit) && !(cfg.viewDecl.component && hasComponentImpl)) {
        controllerInstance.$onInit();
    }
    var viewState = core_1.tail(cfg.path).state.self;
    var hookOptions = { bind: controllerInstance };
    // Add component-level hook for onParamsChange
    if (core_1.isFunction(controllerInstance.uiOnParamsChanged)) {
        var resolveContext = new core_1.ResolveContext(cfg.path);
        var viewCreationTrans_1 = resolveContext.getResolvable('$transition$').data;
        // Fire callback on any successful transition
        var paramsUpdated = function ($transition$) {
            // Exit early if the $transition$ is the same as the view was created within.
            // Exit early if the $transition$ will exit the state the view is for.
            if ($transition$ === viewCreationTrans_1 || $transition$.exiting().indexOf(viewState) !== -1)
                return;
            var toParams = $transition$.params("to");
            var fromParams = $transition$.params("from");
            var toSchema = $transition$.treeChanges().to.map(function (node) { return node.paramSchema; }).reduce(core_1.unnestR, []);
            var fromSchema = $transition$.treeChanges().from.map(function (node) { return node.paramSchema; }).reduce(core_1.unnestR, []);
            // Find the to params that have different values than the from params
            var changedToParams = toSchema.filter(function (param) {
                var idx = fromSchema.indexOf(param);
                return idx === -1 || !fromSchema[idx].type.equals(toParams[param.id], fromParams[param.id]);
            });
            // Only trigger callback if a to param has changed or is new
            if (changedToParams.length) {
                var changedKeys_1 = changedToParams.map(function (x) { return x.id; });
                // Filter the params to only changed/new to params.  `$transition$.params()` may be used to get all params.
                var newValues = core_1.filter(toParams, function (val, key) { return changedKeys_1.indexOf(key) !== -1; });
                controllerInstance.uiOnParamsChanged(newValues, $transition$);
            }
        };
        $scope.$on('$destroy', $transitions.onSuccess({}, paramsUpdated, hookOptions));
    }
    // Add component-level hook for uiCanExit
    if (core_1.isFunction(controllerInstance.uiCanExit)) {
        var id_1 = _uiCanExitId++;
        var cacheProp_1 = '_uiCanExitIds';
        // Returns true if a redirect transition already answered truthy
        var prevTruthyAnswer_1 = function (trans) {
            return !!trans && (trans[cacheProp_1] && trans[cacheProp_1][id_1] === true || prevTruthyAnswer_1(trans.redirectedFrom()));
        };
        // If a user answered yes, but the transition was later redirected, don't also ask for the new redirect transition
        var wrappedHook = function (trans) {
            var promise, ids = trans[cacheProp_1] = trans[cacheProp_1] || {};
            if (!prevTruthyAnswer_1(trans)) {
                promise = $q.when(controllerInstance.uiCanExit(trans));
                promise.then(function (val) { return ids[id_1] = (val !== false); });
            }
            return promise;
        };
        var criteria = { exiting: viewState.name };
        $scope.$on('$destroy', $transitions.onBefore(criteria, wrappedHook, hookOptions));
    }
}
angular_1.ng.module('ui.router.state').directive('uiView', exports.uiView);
angular_1.ng.module('ui.router.state').directive('uiView', $ViewDirectiveFill);
//# sourceMappingURL=viewDirective.js.map

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * # Angular 1 injectable services
 *
 * This is a list of the objects which can be injected using angular's injector.
 *
 * There are three different kind of injectable objects:
 *
 * ## **Provider** objects
 * #### injectable into a `.config()` block during configtime
 *
 * - [[$uiRouterProvider]]: The UI-Router instance
 * - [[$stateProvider]]: State registration
 * - [[$transitionsProvider]]: Transition hooks
 * - [[$urlServiceProvider]]: All URL related public APIs
 *
 * - [[$uiViewScrollProvider]]: Disable ui-router view scrolling
 * - [[$urlRouterProvider]]: (deprecated) Url matching rules
 * - [[$urlMatcherFactoryProvider]]: (deprecated) Url parsing config
 *
 * ## **Service** objects
 * #### injectable globally during runtime
 *
 * - [[$uiRouter]]: The UI-Router instance
 * - [[$trace]]: Enable transition trace/debug
 * - [[$transitions]]: Transition hooks
 * - [[$state]]: Imperative state related APIs
 * - [[$stateRegistry]]: State registration
 * - [[$urlService]]: All URL related public APIs
 * - [[$uiRouterGlobals]]: Global variables
 * - [[$uiViewScroll]]: Scroll an element into view
 *
 * - [[$stateParams]]: (deprecated) Global state param values
 * - [[$urlRouter]]: (deprecated) URL synchronization
 * - [[$urlMatcherFactory]]: (deprecated) URL parsing config
 *
 * ## **Per-Transition** objects
 *
 * - These kind of objects are injectable into:
 *   - Resolves ([[Ng1StateDeclaration.resolve]]),
 *   - Transition Hooks ([[TransitionService.onStart]], etc),
 *   - Routed Controllers ([[Ng1ViewDeclaration.controller]])
 *
 * #### Different instances are injected based on the [[Transition]]
 *
 * - [[$transition$]]: The current Transition object
 * - [[$stateParams]]: State param values for pending Transition (deprecated)
 * - Any resolve data defined using [[Ng1StateDeclaration.resolve]]
 *
 * @ng1api
 * @preferred
 * @module injectables
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The current (or pending) State Parameters
 *
 * An injectable global **Service Object** which holds the state parameters for the latest **SUCCESSFUL** transition.
 *
 * The values are not updated until *after* a `Transition` successfully completes.
 *
 * **Also:** an injectable **Per-Transition Object** object which holds the pending state parameters for the pending `Transition` currently running.
 *
 * ### Deprecation warning:
 *
 * The value injected for `$stateParams` is different depending on where it is injected.
 *
 * - When injected into an angular service, the object injected is the global **Service Object** with the parameter values for the latest successful `Transition`.
 * - When injected into transition hooks, resolves, or view controllers, the object is the **Per-Transition Object** with the parameter values for the running `Transition`.
 *
 * Because of these confusing details, this service is deprecated.
 *
 * ### Instead of using the global `$stateParams` service object,
 * inject [[$uiRouterGlobals]] and use [[UIRouterGlobals.params]]
 *
 * ```js
 * MyService.$inject = ['$uiRouterGlobals'];
 * function MyService($uiRouterGlobals) {
 *   return {
 *     paramValues: function () {
 *       return $uiRouterGlobals.params;
 *     }
 *   }
 * }
 * ```
 *
 * ### Instead of using the per-transition `$stateParams` object,
 * inject the current `Transition` (as [[$transition$]]) and use [[Transition.params]]
 *
 * ```js
 * MyController.$inject = ['$transition$'];
 * function MyController($transition$) {
 *   var username = $transition$.params().username;
 *   // .. do something with username
 * }
 * ```
 *
 * ---
 *
 * This object can be injected into other services.
 *
 * #### Deprecated Example:
 * ```js
 * SomeService.$inject = ['$http', '$stateParams'];
 * function SomeService($http, $stateParams) {
 *   return {
 *     getUser: function() {
 *       return $http.get('/api/users/' + $stateParams.username);
 *     }
 *   }
 * };
 * angular.service('SomeService', SomeService);
 * ```
 * @deprecated
 */
var $stateParams;
/**
 * Global UI-Router variables
 *
 * The router global state as a **Service Object** (injectable during runtime).
 *
 * This object contains globals such as the current state and current parameter values.
 */
var $uiRouterGlobals;
/**
 * The UI-Router instance
 *
 * The [[UIRouter]] singleton (the router instance) as a **Service Object** (injectable during runtime).
 *
 * This object is the UI-Router singleton instance, created by angular dependency injection during application bootstrap.
 * It has references to the other UI-Router services
 *
 * #### Note: This object is also exposed as [[$uiRouterProvider]] for injection during angular config time.
 */
var $uiRouter;
/**
 * The UI-Router instance
 *
 * The [[UIRouter]] singleton (the router instance) as a **Provider Object** (injectable during config phase).
 *
 * This object is the UI-Router singleton instance, created by angular dependency injection during application bootstrap.
 * It has references to the other UI-Router services
 *
 * #### Note: This object is also exposed as [[$uiRouter]] for injection during runtime.
 */
var $uiRouterProvider;
/**
 * Transition debug/tracing
 *
 * The [[Trace]] singleton as a **Service Object** (injectable during runtime).
 *
 * Enables or disables Transition tracing which can help to debug issues.
 */
var $trace;
/**
 * The Transition Service
 *
 * The [[TransitionService]] singleton as a **Service Object** (injectable during runtime).
 *
 * This angular service exposes the [[TransitionService]] singleton, which is primarily
 * used to register global transition hooks.
 *
 * #### Note: This object is also exposed as [[$transitionsProvider]] for injection during the config phase.
 */
var $transitions;
/**
 * The Transition Service
 *
 * The [[TransitionService]] singleton as a **Provider Object** (injectable during config phase)
 *
 * This angular service exposes the [[TransitionService]] singleton, which is primarily
 * used to register global transition hooks.
 *
 * #### Note: This object is also exposed as [[$transitions]] for injection during runtime.
 */
var $transitionsProvider;
/**
 * The current [[Transition]] object
 *
 * The current [[Transition]] object as a **Per-Transition Object** (injectable into Resolve, Hooks, Controllers)
 *
 * This object returns information about the current transition, including:
 *
 * - To/from states
 * - To/from parameters
 * - Transition options
 * - States being entered, exited, and retained
 * - Resolve data
 * - A Promise for the transition
 * - Any transition failure information
 * - An injector for both Service and Per-Transition Objects
 */
var $transition$;
/**
 * The State Service
 *
 * The [[StateService]] singleton as a **Service Object** (injectable during runtime).
 *
 * This service used to manage and query information on registered states.
 * It exposes state related APIs including:
 *
 * - Start a [[Transition]]
 * - Imperatively lazy load states
 * - Check if a state is currently active
 * - Look up states by name
 * - Build URLs for a state+parameters
 * - Configure the global Transition error handler
 *
 * This angular service exposes the [[StateService]] singleton.
 */
var $state;
/**
 * The State Registry
 *
 * The [[StateRegistry]] singleton as a **Service Object** (injectable during runtime).
 *
 * This service is used to register/deregister states.
 * It has state registration related APIs including:
 *
 * - Register/deregister states
 * - Listen for state registration/deregistration
 * - Get states by name
 * - Add state decorators (to customize the state creation process)
 *
 * #### Note: This object is also exposed as [[$stateRegistryProvider]] for injection during the config phase.
 */
var $stateRegistry;
/**
 * The State Registry
 *
 * The [[StateRegistry]] singleton as a **Provider Object** (injectable during config time).
 *
 * This service is used to register/deregister states.
 * It has state registration related APIs including:
 *
 * - Register/deregister states
 * - Listen for state registration/deregistration
 * - Get states by name
 * - Add state decorators (to customize the state creation process)
 *
 * #### Note: This object is also exposed as [[$stateRegistry]] for injection during runtime.
 */
var $stateRegistryProvider;
/**
 * The View Scroll provider
 *
 * The [[UIViewScrollProvider]] as a **Provider Object** (injectable during config time).
 *
 * This angular service exposes the [[UIViewScrollProvider]] singleton and is
 * used to disable UI-Router's scroll behavior.
 */
var $uiViewScrollProvider;
/**
 * The View Scroll function
 *
 * The View Scroll function as a **Service Object** (injectable during runtime).
 *
 * This is a function that scrolls an element into view.
 * The element is scrolled after a `$timeout` so the DOM has time to refresh.
 *
 * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
 * this can be enabled by calling [[UIViewScrollProvider.useAnchorScroll]].
 *
 * Note: this function is used by the [[directives.uiView]] when the `autoscroll` expression evaluates to true.
 */
var $uiViewScroll;
/**
 * The StateProvider
 *
 * An angular1-only [[StateProvider]] as a **Provider Object** (injectable during config time).
 *
 * This angular service exposes the [[StateProvider]] singleton.
 *
 * The `StateProvider` is primarily used to register states or add custom state decorators.
 *
 * ##### Note: This provider is a ng1 vestige.
 * It is a passthrough to [[$stateRegistry]] and [[$state]].
 */
var $stateProvider;
/**
 * The URL Service Provider
 *
 * The [[UrlService]] singleton as a **Provider Object** (injectable during the angular config phase).
 *
 * A service used to configure and interact with the URL.
 * It has URL related APIs including:
 *
 * - register custom Parameter types `UrlService.config.type` ([[UrlConfigApi.type]])
 * - add URL rules: `UrlService.rules.when` ([[UrlRulesApi.when]])
 * - configure behavior when no url matches: `UrlService.rules.otherwise` ([[UrlRulesApi.otherwise]])
 * - delay initial URL synchronization [[UrlService.deferIntercept]].
 * - get or set the current url: [[UrlService.url]]
 *
 * ##### Note: This service can also be injected during runtime as [[$urlService]].
 */
var $urlServiceProvider;
/**
 * The URL Service
 *
 * The [[UrlService]] singleton as a **Service Object** (injectable during runtime).
 *
 * Note: This service can also be injected during the config phase as [[$urlServiceProvider]].
 *
 * Used to configure the URL.
 * It has URL related APIs including:
 *
 * - register custom Parameter types `UrlService.config.type` ([[UrlConfigApi.type]])
 * - add URL rules: `UrlService.rules.when` ([[UrlRulesApi.when]])
 * - configure behavior when no url matches: `UrlService.rules.otherwise` ([[UrlRulesApi.otherwise]])
 * - delay initial URL synchronization [[UrlService.deferIntercept]].
 * - get or set the current url: [[UrlService.url]]
 *
 * ##### Note: This service can also be injected during the config phase as [[$urlServiceProvider]].
 */
var $urlService;
/**
 * The URL Router Provider
 *
 * ### Deprecation warning: This object is now considered internal. Use [[$urlServiceProvider]] instead.
 *
 * The [[UrlRouter]] singleton as a **Provider Object** (injectable during config time).
 *
 * #### Note: This object is also exposed as [[$urlRouter]] for injection during runtime.
 *
 * @deprecated
 */
var $urlRouterProvider;
/**
 * The Url Router
 *
 * ### Deprecation warning: This object is now considered internal. Use [[$urlService]] instead.
 *
 * The [[UrlRouter]] singleton as a **Service Object** (injectable during runtime).
 *
 * #### Note: This object is also exposed as [[$urlRouterProvider]] for injection during angular config time.
 *
 * @deprecated
 */
var $urlRouter;
/**
 * The URL Matcher Factory
 *
 * ### Deprecation warning: This object is now considered internal. Use [[$urlService]] instead.
 *
 * The [[UrlMatcherFactory]] singleton as a **Service Object** (injectable during runtime).
 *
 * This service is used to set url mapping options, define custom parameter types, and create [[UrlMatcher]] objects.
 *
 * #### Note: This object is also exposed as [[$urlMatcherFactoryProvider]] for injection during angular config time.
 *
 * @deprecated
 */
var $urlMatcherFactory;
/**
 * The URL Matcher Factory
 *
 * ### Deprecation warning: This object is now considered internal. Use [[$urlService]] instead.
 *
 * The [[UrlMatcherFactory]] singleton as a **Provider Object** (injectable during config time).
 *
 * This service is used to set url mapping options, define custom parameter types, and create [[UrlMatcher]] objects.
 *
 * #### Note: This object is also exposed as [[$urlMatcherFactory]] for injection during runtime.
 *
 * @deprecated
 */
var $urlMatcherFactoryProvider;
//# sourceMappingURL=injectables.js.map

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(5);
/**
 * Implements UI-Router LocationServices and LocationConfig using Angular 1's $location service
 */
var Ng1LocationServices = (function () {
    function Ng1LocationServices($locationProvider) {
        // .onChange() registry
        this._urlListeners = [];
        this.$locationProvider = $locationProvider;
        var _lp = core_1.val($locationProvider);
        core_1.createProxyFunctions(_lp, this, _lp, ['hashPrefix']);
    }
    Ng1LocationServices.prototype.dispose = function () { };
    Ng1LocationServices.prototype.onChange = function (callback) {
        var _this = this;
        this._urlListeners.push(callback);
        return function () { return core_1.removeFrom(_this._urlListeners)(callback); };
    };
    Ng1LocationServices.prototype.html5Mode = function () {
        var html5Mode = this.$locationProvider.html5Mode();
        html5Mode = core_1.isObject(html5Mode) ? html5Mode.enabled : html5Mode;
        return html5Mode && this.$sniffer.history;
    };
    Ng1LocationServices.prototype.url = function (newUrl, replace, state) {
        if (replace === void 0) { replace = false; }
        if (newUrl)
            this.$location.url(newUrl);
        if (replace)
            this.$location.replace();
        if (state)
            this.$location.state(state);
        return this.$location.url();
    };
    Ng1LocationServices.prototype._runtimeServices = function ($rootScope, $location, $sniffer, $browser) {
        var _this = this;
        this.$location = $location;
        this.$sniffer = $sniffer;
        // Bind $locationChangeSuccess to the listeners registered in LocationService.onChange
        $rootScope.$on("$locationChangeSuccess", function (evt) { return _this._urlListeners.forEach(function (fn) { return fn(evt); }); });
        var _loc = core_1.val($location);
        var _browser = core_1.val($browser);
        // Bind these LocationService functions to $location
        core_1.createProxyFunctions(_loc, this, _loc, ["replace", "path", "search", "hash"]);
        // Bind these LocationConfig functions to $location
        core_1.createProxyFunctions(_loc, this, _loc, ['port', 'protocol', 'host']);
        // Bind these LocationConfig functions to $browser
        core_1.createProxyFunctions(_browser, this, _browser, ['baseHref']);
    };
    /**
     * Applys ng1-specific path parameter encoding
     *
     * The Angular 1 `$location` service is a bit weird.
     * It doesn't allow slashes to be encoded/decoded bi-directionally.
     *
     * See the writeup at https://github.com/angular-ui/ui-router/issues/2598
     *
     * This code patches the `path` parameter type so it encoded/decodes slashes as ~2F
     *
     * @param router
     */
    Ng1LocationServices.monkeyPatchPathParameterType = function (router) {
        var pathType = router.urlMatcherFactory.type('path');
        pathType.encode = function (val) {
            return val != null ? val.toString().replace(/(~|\/)/g, function (m) { return ({ '~': '~~', '/': '~2F' }[m]); }) : val;
        };
        pathType.decode = function (val) {
            return val != null ? val.toString().replace(/(~~|~2F)/g, function (m) { return ({ '~~': '~', '~2F': '/' }[m]); }) : val;
        };
    };
    return Ng1LocationServices;
}());
exports.Ng1LocationServices = Ng1LocationServices;
//# sourceMappingURL=locationServices.js.map

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module ng1 */ /** for typedoc */
Object.defineProperty(exports, "__esModule", { value: true });
var angular_1 = __webpack_require__(12);
/**
 * `isState` Filter: truthy if the current state is the parameter
 *
 * Translates to [[StateService.is]] `$state.is("stateName")`.
 *
 * #### Example:
 * ```html
 * <div ng-if="'stateName' | isState">show if state is 'stateName'</div>
 * ```
 */
$IsStateFilter.$inject = ['$state'];
function $IsStateFilter($state) {
    var isFilter = function (state, params, options) {
        return $state.is(state, params, options);
    };
    isFilter.$stateful = true;
    return isFilter;
}
exports.$IsStateFilter = $IsStateFilter;
/**
 * `includedByState` Filter: truthy if the current state includes the parameter
 *
 * Translates to [[StateService.includes]]` $state.is("fullOrPartialStateName")`.
 *
 * #### Example:
 * ```html
 * <div ng-if="'fullOrPartialStateName' | includedByState">show if state includes 'fullOrPartialStateName'</div>
 * ```
 */
$IncludedByStateFilter.$inject = ['$state'];
function $IncludedByStateFilter($state) {
    var includesFilter = function (state, params, options) {
        return $state.includes(state, params, options);
    };
    includesFilter.$stateful = true;
    return includesFilter;
}
exports.$IncludedByStateFilter = $IncludedByStateFilter;
angular_1.ng.module('ui.router.state')
    .filter('isState', $IsStateFilter)
    .filter('includedByState', $IncludedByStateFilter);
//# sourceMappingURL=stateFilters.js.map

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module ng1 */ /** */
var core_1 = __webpack_require__(5);
var services_1 = __webpack_require__(31);
/**
 * This is a [[StateBuilder.builder]] function for angular1 `onEnter`, `onExit`,
 * `onRetain` callback hooks on a [[Ng1StateDeclaration]].
 *
 * When the [[StateBuilder]] builds a [[StateObject]] object from a raw [[StateDeclaration]], this builder
 * ensures that those hooks are injectable for @uirouter/angularjs (ng1).
 */
exports.getStateHookBuilder = function (hookName) {
    return function stateHookBuilder(state, parentFn) {
        var hook = state[hookName];
        var pathname = hookName === 'onExit' ? 'from' : 'to';
        function decoratedNg1Hook(trans, state) {
            var resolveContext = new core_1.ResolveContext(trans.treeChanges(pathname));
            var locals = core_1.extend(services_1.getLocals(resolveContext), { $state$: state, $transition$: trans });
            return core_1.services.$injector.invoke(hook, this, locals);
        }
        return hook ? decoratedNg1Hook : undefined;
    };
};
//# sourceMappingURL=onEnterExitRetain.js.map

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module view */
/** for typedoc */
var angular_1 = __webpack_require__(12);
var core_1 = __webpack_require__(5);
/**
 * Service which manages loading of templates from a ViewConfig.
 */
var TemplateFactory = (function () {
    function TemplateFactory() {
        var _this = this;
        /** @hidden */ this._useHttp = angular_1.ng.version.minor < 3;
        /** @hidden */ this.$get = ['$http', '$templateCache', '$injector', function ($http, $templateCache, $injector) {
                _this.$templateRequest = $injector.has && $injector.has('$templateRequest') && $injector.get('$templateRequest');
                _this.$http = $http;
                _this.$templateCache = $templateCache;
                return _this;
            }];
    }
    /** @hidden */
    TemplateFactory.prototype.useHttpService = function (value) {
        this._useHttp = value;
    };
    ;
    /**
     * Creates a template from a configuration object.
     *
     * @param config Configuration object for which to load a template.
     * The following properties are search in the specified order, and the first one
     * that is defined is used to create the template:
     *
     * @param params  Parameters to pass to the template function.
     * @param context The resolve context associated with the template's view
     *
     * @return {string|object}  The template html as a string, or a promise for
     * that string,or `null` if no template is configured.
     */
    TemplateFactory.prototype.fromConfig = function (config, params, context) {
        var defaultTemplate = "<ui-view></ui-view>";
        var asTemplate = function (result) { return core_1.services.$q.when(result).then(function (str) { return ({ template: str }); }); };
        var asComponent = function (result) { return core_1.services.$q.when(result).then(function (str) { return ({ component: str }); }); };
        return (core_1.isDefined(config.template) ? asTemplate(this.fromString(config.template, params)) :
            core_1.isDefined(config.templateUrl) ? asTemplate(this.fromUrl(config.templateUrl, params)) :
                core_1.isDefined(config.templateProvider) ? asTemplate(this.fromProvider(config.templateProvider, params, context)) :
                    core_1.isDefined(config.component) ? asComponent(config.component) :
                        core_1.isDefined(config.componentProvider) ? asComponent(this.fromComponentProvider(config.componentProvider, params, context)) :
                            asTemplate(defaultTemplate));
    };
    ;
    /**
     * Creates a template from a string or a function returning a string.
     *
     * @param template html template as a string or function that returns an html template as a string.
     * @param params Parameters to pass to the template function.
     *
     * @return {string|object} The template html as a string, or a promise for that
     * string.
     */
    TemplateFactory.prototype.fromString = function (template, params) {
        return core_1.isFunction(template) ? template(params) : template;
    };
    ;
    /**
     * Loads a template from the a URL via `$http` and `$templateCache`.
     *
     * @param {string|Function} url url of the template to load, or a function
     * that returns a url.
     * @param {Object} params Parameters to pass to the url function.
     * @return {string|Promise.<string>} The template html as a string, or a promise
     * for that string.
     */
    TemplateFactory.prototype.fromUrl = function (url, params) {
        if (core_1.isFunction(url))
            url = url(params);
        if (url == null)
            return null;
        if (this._useHttp) {
            return this.$http.get(url, { cache: this.$templateCache, headers: { Accept: 'text/html' } })
                .then(function (response) {
                return response.data;
            });
        }
        return this.$templateRequest(url);
    };
    ;
    /**
     * Creates a template by invoking an injectable provider function.
     *
     * @param provider Function to invoke via `locals`
     * @param {Function} injectFn a function used to invoke the template provider
     * @return {string|Promise.<string>} The template html as a string, or a promise
     * for that string.
     */
    TemplateFactory.prototype.fromProvider = function (provider, params, context) {
        var deps = core_1.services.$injector.annotate(provider);
        var providerFn = core_1.isArray(provider) ? core_1.tail(provider) : provider;
        var resolvable = new core_1.Resolvable("", providerFn, deps);
        return resolvable.get(context);
    };
    ;
    /**
     * Creates a component's template by invoking an injectable provider function.
     *
     * @param provider Function to invoke via `locals`
     * @param {Function} injectFn a function used to invoke the template provider
     * @return {string} The template html as a string: "<component-name input1='::$resolve.foo'></component-name>".
     */
    TemplateFactory.prototype.fromComponentProvider = function (provider, params, context) {
        var deps = core_1.services.$injector.annotate(provider);
        var providerFn = core_1.isArray(provider) ? core_1.tail(provider) : provider;
        var resolvable = new core_1.Resolvable("", providerFn, deps);
        return resolvable.get(context);
    };
    ;
    /**
     * Creates a template from a component's name
     *
     * This implements route-to-component.
     * It works by retrieving the component (directive) metadata from the injector.
     * It analyses the component's bindings, then constructs a template that instantiates the component.
     * The template wires input and output bindings to resolves or from the parent component.
     *
     * @param uiView {object} The parent ui-view (for binding outputs to callbacks)
     * @param context The ResolveContext (for binding outputs to callbacks returned from resolves)
     * @param component {string} Component's name in camel case.
     * @param bindings An object defining the component's bindings: {foo: '<'}
     * @return {string} The template as a string: "<component-name input1='::$resolve.foo'></component-name>".
     */
    TemplateFactory.prototype.makeComponentTemplate = function (uiView, context, component, bindings) {
        bindings = bindings || {};
        // Bind once prefix
        var prefix = angular_1.ng.version.minor >= 3 ? "::" : "";
        // Convert to kebob name. Add x- prefix if the string starts with `x-` or `data-`
        var kebob = function (camelCase) {
            var kebobed = core_1.kebobString(camelCase);
            return /^(x|data)-/.exec(kebobed) ? "x-" + kebobed : kebobed;
        };
        var attributeTpl = function (input) {
            var name = input.name, type = input.type;
            var attrName = kebob(name);
            // If the ui-view has an attribute which matches a binding on the routed component
            // then pass that attribute through to the routed component template.
            // Prefer ui-view wired mappings to resolve data, unless the resolve was explicitly bound using `bindings:`
            if (uiView.attr(attrName) && !bindings[name])
                return attrName + "='" + uiView.attr(attrName) + "'";
            var resolveName = bindings[name] || name;
            // Pre-evaluate the expression for "@" bindings by enclosing in {{ }}
            // some-attr="{{ ::$resolve.someResolveName }}"
            if (type === '@')
                return attrName + "='{{" + prefix + "$resolve." + resolveName + "}}'";
            // Wire "&" callbacks to resolves that return a callback function
            // Get the result of the resolve (should be a function) and annotate it to get its arguments.
            // some-attr="$resolve.someResolveResultName(foo, bar)"
            if (type === '&') {
                var res = context.getResolvable(resolveName);
                var fn = res && res.data;
                var args = fn && core_1.services.$injector.annotate(fn) || [];
                // account for array style injection, i.e., ['foo', function(foo) {}]
                var arrayIdxStr = core_1.isArray(fn) ? "[" + (fn.length - 1) + "]" : '';
                return attrName + "='$resolve." + resolveName + arrayIdxStr + "(" + args.join(",") + ")'";
            }
            // some-attr="::$resolve.someResolveName"
            return attrName + "='" + prefix + "$resolve." + resolveName + "'";
        };
        var attrs = getComponentBindings(component).map(attributeTpl).join(" ");
        var kebobName = kebob(component);
        return "<" + kebobName + " " + attrs + "></" + kebobName + ">";
    };
    ;
    return TemplateFactory;
}());
exports.TemplateFactory = TemplateFactory;
// Gets all the directive(s)' inputs ('@', '=', and '<') and outputs ('&')
function getComponentBindings(name) {
    var cmpDefs = core_1.services.$injector.get(name + "Directive"); // could be multiple
    if (!cmpDefs || !cmpDefs.length)
        throw new Error("Unable to find component named '" + name + "'");
    return cmpDefs.map(getBindings).reduce(core_1.unnestR, []);
}
// Given a directive definition, find its object input attributes
// Use different properties, depending on the type of directive (component, bindToController, normal)
var getBindings = function (def) {
    if (core_1.isObject(def.bindToController))
        return scopeBindings(def.bindToController);
    return scopeBindings(def.scope);
};
// for ng 1.2 style, process the scope: { input: "=foo" }
// for ng 1.3 through ng 1.5, process the component's bindToController: { input: "=foo" } object
var scopeBindings = function (bindingsObj) { return Object.keys(bindingsObj || {})
    .map(function (key) { return [key, /^([=<@&])[?]?(.*)/.exec(bindingsObj[key])]; })
    .filter(function (tuple) { return core_1.isDefined(tuple) && core_1.isArray(tuple[1]); })
    .map(function (tuple) { return ({ name: tuple[1][2] || tuple[0], type: tuple[1][1] }); }); };
//# sourceMappingURL=templateFactory.js.map

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @module ng1 */ /** */
var angular_1 = __webpack_require__(12);
/** @hidden */
function $ViewScrollProvider() {
    var useAnchorScroll = false;
    this.useAnchorScroll = function () {
        useAnchorScroll = true;
    };
    this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
            if (useAnchorScroll) {
                return $anchorScroll;
            }
            return function ($element) {
                return $timeout(function () {
                    $element[0].scrollIntoView();
                }, 0, false);
            };
        }];
}
angular_1.ng.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);
//# sourceMappingURL=viewScroll.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var notifsFactory = exports.notifsFactory = 'notifsFactory';
var notifsFactoryFunc = exports.notifsFactoryFunc = function notifsFactoryFunc($http) {
    return {
        getNotifs: function getNotifs() {
            return $http.get('/notifs');
        }
    };
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sidebarComponent = exports.sidebarComponentName = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _sidebar = __webpack_require__(62);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sidebarComponentName = exports.sidebarComponentName = 'sidebar';
var sidebarComponent = exports.sidebarComponent = {
  templateUrl: '/dashboard/src/app/common/sidebar.html',
  controller: ['tokenFactory', '$state', '$rootScope', 'notifsFactory', _sidebar.sidebarController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginOptions = exports.loginComponent = undefined;

var _login = __webpack_require__(102);

var loginComponent = exports.loginComponent = 'loginComponent';
var loginOptions = exports.loginOptions = {
  templateUrl: '/dashboard/src/app/components/login/login.html',
  controller: ['loginFactory', 'tokenFactory', '$state', '$rootScope', _login.loginController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function loginController(loginFactory, tokenFactory, $state, $rootScope) {
  var ctrl = this;
  ctrl.user = {};
  ctrl.loginUser = function () {
    loginFactory.loginUser(ctrl.user).then(function (data) {
      ctrl.user = {};
      console.log(data);
      tokenFactory.setToken(data.data.token);
      $rootScope.$broadcast('userLoggedIn');
      $state.go('home');
    }, function (err) {
      console.log(err);
    });
  };
}

exports.loginController = loginController;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var loginFactory = exports.loginFactory = 'loginFactory';

var loginFactoryFunc = exports.loginFactoryFunc = function loginFactoryFunc($http) {
  return {
    loginUser: function loginUser(value) {
      return $http.post('/admin/login', value);
    }
  };
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

__webpack_require__(34);

var _login = __webpack_require__(103);

var _token = __webpack_require__(24);

var _login2 = __webpack_require__(101);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = _angular2.default.module('login', [_angularUiRouter2.default, 'ngStorage']).config(['$stateProvider', function ($stateProvider) {
  var loginState = {
    name: 'login',
    url: '/admin/login',
    component: _login2.loginComponent
  };

  $stateProvider.state(loginState);
}]).component(_login2.loginComponent, _login2.loginOptions).factory(_login.loginFactory, ['$http', _login.loginFactoryFunc]).factory(_token.tokenFactory, ['$localStorage', _token.tokenFactoryFunc]).name;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _postNewModule = __webpack_require__(108);

var _postPostsModule = __webpack_require__(116);

var _postSingleModule = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = exports.post = _angular2.default.module('post', [_postNewModule.newPost, _postPostsModule.posts, _postSingleModule.postSingle]).name;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postNewComponent = exports.postNewOptions = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _postNew = __webpack_require__(107);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postNewOptions = exports.postNewOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_new/post.new.html',
  controller: _postNew.postNewController,
  controllerAs: 'ctrl'
};

var postNewComponent = exports.postNewComponent = 'postNew';

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postNewController = undefined;

var _postNew = __webpack_require__(63);

function postNewController(thisPost, $http) {
  'ngInject';

  var ctrl = this;

  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
    image_title: true,
    // enable automatic uploads of images represented by blob or data URIs
    automatic_uploads: true,
    // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: '/post/images',
    // here we add custom filepicker only to Image dialog
    file_picker_types: 'image',
    // and here's our custom image picker
    file_picker_callback: function file_picker_callback(cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      /* Note: In modern browsers input[type="file"] is functional without
         even adding it to the DOM, but that might not be the case in some older
         or quirky browsers like IE, so you might want to add it to the DOM
         just in case, and visually hide it. And do not forget do remove it
         once you do not need it anymore.
      */
      input.onchange = function () {
        var file = this.files[0];

        /*
        Note: Now we need to register the blob in TinyMCEs image blob
        registry.
        */
        var id = 'blobid' + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var blobInfo = blobCache.create(id, file);
        blobCache.add(blobInfo);

        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: file.name });
      };

      input.click();
    }
  };
  ctrl.postImage = false;
  ctrl.post = {};
  ctrl.heading = 'Create A New Post';
  ctrl.createPost = function (value) {
    thisPost.createPost(value).then(function (data) {
      console.log('After blog post the response is', data);
    }, function (err) {
      console.log(err.status);
    });
  };
}

exports.postNewController = postNewController;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newPost = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _postNew = __webpack_require__(63);

var _postNew2 = __webpack_require__(106);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newPost = exports.newPost = _angular2.default.module('post.new', [_angularUiRouter2.default, 'ui.tinymce']).component(_postNew2.postNewComponent, _postNew2.postNewOptions).config(['$stateProvider', function ($stateProvider) {
  var newState = {
    name: 'new',
    url: '/admin/new',
    component: _postNew2.postNewComponent
  };

  $stateProvider.state(newState);
}]).factory(_postNew.thisPost, ['$http', _postNew.thisPostFunc]).name;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSingleOptions = exports.postSingleComponent = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _postSingle = __webpack_require__(110);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postSingleComponent = exports.postSingleComponent = 'postSingleComponent';
var postSingleOptions = exports.postSingleOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_single/post.single.html',
  controller: ['postSingleFactory', 'postUpdateFactory', '$stateParams', _postSingle.postSingleController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSingleController = undefined;

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function postSingleController(postSingleFactory, postUpdateFactory, $stateParams) {
  var ctrl = this;
  ctrl.$onInit = function () {
    postSingleFactory.getSinglePost($stateParams.url).then(function (data) {
      ctrl.post = data.data.post;
    }, function (err) {
      console.log(err);
    });
  };

  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
    image_title: true,
    // enable automatic uploads of images represented by blob or data URIs
    automatic_uploads: true,
    // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: '/post/images',
    // here we add custom filepicker only to Image dialog
    file_picker_types: 'image',
    // and here's our custom image picker
    file_picker_callback: function file_picker_callback(cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      // Note: In modern browsers input[type="file"] is functional without
      // even adding it to the DOM, but that might not be the case in some older
      // or quirky browsers like IE, so you might want to add it to the DOM
      // just in case, and visually hide it. And do not forget do remove it
      // once you do not need it anymore.

      input.onchange = function () {
        var file = this.files[0];

        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        var id = 'blobid' + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var blobInfo = blobCache.create(id, file);
        blobCache.add(blobInfo);

        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: file.name });
      };

      input.click();
    }
  };

  ctrl.updatePost = function (url, value) {
    postUpdateFactory.updatePost(url, value).then(function (data) {
      postSingleFactory.getSinglePost(url).then(function (data) {
        ctrl.post = data.data.post[0];
      });
    }, function (err) {
      console.log(err);
    });
  };
}

exports.postSingleController = postSingleController;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var postSingleFactory = exports.postSingleFactory = 'postSingleFactory';
var postSingleFactoryFunc = exports.postSingleFactoryFunc = function postSingleFactoryFunc($http, $stateParams) {
  return {
    getSinglePost: function getSinglePost(value) {
      return $http.get('/post/' + value);
    }
  };
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSingle = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _postSingle = __webpack_require__(109);

var _postSingle2 = __webpack_require__(111);

var _postUpdate = __webpack_require__(113);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postSingle = exports.postSingle = _angular2.default.module('postSingle', [_angularUiRouter2.default, 'ui.tinymce']).component(_postSingle.postSingleComponent, _postSingle.postSingleOptions).config(function ($stateProvider) {
  var editState = {
    url: '/admin/edit/:url',
    name: 'edit',
    component: _postSingle.postSingleComponent
  };
  $stateProvider.state(editState);
}).factory(_postSingle2.postSingleFactory, ['$http', _postSingle2.postSingleFactoryFunc]).factory(_postUpdate.postUpdateFactory, ['$http', _postUpdate.postUpdateFactoryFunc]).name;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var postUpdateFactory = exports.postUpdateFactory = 'postUpdateFactory';
var postUpdateFactoryFunc = exports.postUpdateFactoryFunc = function postUpdateFactoryFunc($http) {
  return {
    updatePost: function updatePost(url, value) {
      return $http.put('/post/' + url, value);
    }
  };
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPostsOptions = exports.allPostsComponent = undefined;

var _postPosts = __webpack_require__(33);

var _postPosts2 = __webpack_require__(115);

var allPostsComponent = exports.allPostsComponent = 'allPosts';
var allPostsOptions = exports.allPostsOptions = {
  templateUrl: '/dashboard/src/app/components/post/posts/post.posts.html',
  controller: [_postPosts.getPosts, '$state', _postPosts2.allPostsController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPostsController = allPostsController;

var _postPosts = __webpack_require__(33);

function allPostsController(getPosts, $state) {
  var ctrl = this;
  ctrl.$onInit = function () {
    getPosts.allPosts().then(function (data) {
      ctrl.posts = data.data.posts;
      console.log(ctrl.posts);
    }, function (err) {
      console.log(err.status, err.message);
    });
  };
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.posts = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _angularSanitize = __webpack_require__(90);

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

var _postPosts = __webpack_require__(33);

var _postPosts2 = __webpack_require__(114);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posts = exports.posts = _angular2.default.module('post.posts', [_angularUiRouter2.default, _angularSanitize2.default]).component(_postPosts2.allPostsComponent, _postPosts2.allPostsOptions).config(function ($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: 'home',
    url: '/admin/home',
    component: _postPosts2.allPostsComponent
  };
  $stateProvider.state(homeState);
  $urlRouterProvider.when('/admin/', '/admin/home');
}).factory(_postPosts.getPosts, ['$http', _postPosts.getPostsFunc]).name;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userComponentOptions = exports.userComponent = undefined;

var _user = __webpack_require__(118);

var userComponent = exports.userComponent = 'userComponent';
var userComponentOptions = exports.userComponentOptions = {
  templateUrl: '/dashboard/src/app/components/user/user.html',
  controller: ['Upload', 'userFactory', '$localStorage', _user.userController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function userController(Upload, userFactory, $localStorage) {
  var ctrl = this;
  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample'

  };

  ctrl.editUser = function () {
    if (_typeof(ctrl.user.navs) === String) {
      var arr = ctrl.user.navs.split(',');
      ctrl.user.navs = arr;
    }
    Upload.upload({
      url: '/admin/user',
      data: { file: ctrl.profile, user: ctrl.user },
      method: 'PUT'
    }).then(function (data) {
      console.log(data);
    }, function (err) {
      console.log(err);
    });
  };

  ctrl.$onInit = function init() {
    if ($localStorage.user) {
      ctrl.user = $localStorage.user;
    } else {
      userFactory.getUser().then(function (data) {
        console.log(data);
      });
    }
  };
}

exports.userController = userController;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var userFactory = exports.userFactory = 'userFactory';
var userFactoryFunc = exports.userFactoryFunc = function userFactoryFunc($http, $localStorage) {
  return {
    getUser: function getUser() {
      return $http.get('/admin/user');
    },
    storeUser: function storeUser(value) {
      $localStorage.user = value;
    },
    editUser: function editUser(value) {
      return $http.put('/admin/user', value);
    }
  };
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _ngFileUpload = __webpack_require__(124);

var _ngFileUpload2 = _interopRequireDefault(_ngFileUpload);

__webpack_require__(34);

var _userFactory = __webpack_require__(119);

var _userComponent = __webpack_require__(117);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = exports.user = _angular2.default.module('user', [_angularUiRouter2.default, _ngFileUpload2.default, 'ngStorage']).component(_userComponent.userComponent, _userComponent.userComponentOptions).config(['$stateProvider', function ($stateProvider) {
  var profileState = {
    name: 'profile',
    url: '/admin/profile',
    component: _userComponent.userComponent
  };
  $stateProvider.state(profileState);
}]).factory(_userFactory.userFactory, ['$http', _userFactory.userFactoryFunc]).name;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _sidebar = __webpack_require__(65);

var _component = __webpack_require__(66);

var _root = __webpack_require__(67);

var _tokenFactory = __webpack_require__(24);

__webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('cms', [_sidebar.sidebar, _component.components, _angularUiRouter2.default, 'ngStorage']).component(_root.rootComponentName, _root.rootComponent).config(function ($locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
}).run([_tokenFactory.tokenFactory, '$http', function (tokenFactory, $http) {
  if (tokenFactory.findToken()) {
    var token = tokenFactory.getToken();
    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
  }
}]).name;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 123 */
/***/ (function(module, exports) {

/**!
 * AngularJS file upload directives and services. Supports: file upload/drop/paste, resume, cancel/abort,
 * progress, resize, thumbnail, preview, validation and CORS
 * FileAPI Flash shim for old browsers not supporting FormData
 * @author  Danial  <danial.farid@gmail.com>
 * @version 12.2.13
 */

(function () {
  /** @namespace FileAPI.noContentTimeout */

  function patchXHR(fnName, newFn) {
    window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
  }

  function redefineProp(xhr, prop, fn) {
    try {
      Object.defineProperty(xhr, prop, {get: fn});
    } catch (e) {/*ignore*/
    }
  }

  if (!window.FileAPI) {
    window.FileAPI = {};
  }

  if (!window.XMLHttpRequest) {
    throw 'AJAX is not supported. XMLHttpRequest is not defined.';
  }

  FileAPI.shouldLoad = !window.FormData || FileAPI.forceLoad;
  if (FileAPI.shouldLoad) {
    var initializeUploadListener = function (xhr) {
      if (!xhr.__listeners) {
        if (!xhr.upload) xhr.upload = {};
        xhr.__listeners = [];
        var origAddEventListener = xhr.upload.addEventListener;
        xhr.upload.addEventListener = function (t, fn) {
          xhr.__listeners[t] = fn;
          if (origAddEventListener) origAddEventListener.apply(this, arguments);
        };
      }
    };

    patchXHR('open', function (orig) {
      return function (m, url, b) {
        initializeUploadListener(this);
        this.__url = url;
        try {
          orig.apply(this, [m, url, b]);
        } catch (e) {
          if (e.message.indexOf('Access is denied') > -1) {
            this.__origError = e;
            orig.apply(this, [m, '_fix_for_ie_crossdomain__', b]);
          }
        }
      };
    });

    patchXHR('getResponseHeader', function (orig) {
      return function (h) {
        return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(h) : (orig == null ? null : orig.apply(this, [h]));
      };
    });

    patchXHR('getAllResponseHeaders', function (orig) {
      return function () {
        return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : (orig == null ? null : orig.apply(this));
      };
    });

    patchXHR('abort', function (orig) {
      return function () {
        return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : (orig == null ? null : orig.apply(this));
      };
    });

    patchXHR('setRequestHeader', function (orig) {
      return function (header, value) {
        if (header === '__setXHR_') {
          initializeUploadListener(this);
          var val = value(this);
          // fix for angular < 1.2.0
          if (val instanceof Function) {
            val(this);
          }
        } else {
          this.__requestHeaders = this.__requestHeaders || {};
          this.__requestHeaders[header] = value;
          orig.apply(this, arguments);
        }
      };
    });

    patchXHR('send', function (orig) {
      return function () {
        var xhr = this;
        if (arguments[0] && arguments[0].__isFileAPIShim) {
          var formData = arguments[0];
          var config = {
            url: xhr.__url,
            jsonp: false, //removes the callback form param
            cache: true, //removes the ?fileapiXXX in the url
            complete: function (err, fileApiXHR) {
              if (err && angular.isString(err) && err.indexOf('#2174') !== -1) {
                // this error seems to be fine the file is being uploaded properly.
                err = null;
              }
              xhr.__completed = true;
              if (!err && xhr.__listeners.load)
                xhr.__listeners.load({
                  type: 'load',
                  loaded: xhr.__loaded,
                  total: xhr.__total,
                  target: xhr,
                  lengthComputable: true
                });
              if (!err && xhr.__listeners.loadend)
                xhr.__listeners.loadend({
                  type: 'loadend',
                  loaded: xhr.__loaded,
                  total: xhr.__total,
                  target: xhr,
                  lengthComputable: true
                });
              if (err === 'abort' && xhr.__listeners.abort)
                xhr.__listeners.abort({
                  type: 'abort',
                  loaded: xhr.__loaded,
                  total: xhr.__total,
                  target: xhr,
                  lengthComputable: true
                });
              if (fileApiXHR.status !== undefined) redefineProp(xhr, 'status', function () {
                return (fileApiXHR.status === 0 && err && err !== 'abort') ? 500 : fileApiXHR.status;
              });
              if (fileApiXHR.statusText !== undefined) redefineProp(xhr, 'statusText', function () {
                return fileApiXHR.statusText;
              });
              redefineProp(xhr, 'readyState', function () {
                return 4;
              });
              if (fileApiXHR.response !== undefined) redefineProp(xhr, 'response', function () {
                return fileApiXHR.response;
              });
              var resp = fileApiXHR.responseText || (err && fileApiXHR.status === 0 && err !== 'abort' ? err : undefined);
              redefineProp(xhr, 'responseText', function () {
                return resp;
              });
              redefineProp(xhr, 'response', function () {
                return resp;
              });
              if (err) redefineProp(xhr, 'err', function () {
                return err;
              });
              xhr.__fileApiXHR = fileApiXHR;
              if (xhr.onreadystatechange) xhr.onreadystatechange();
              if (xhr.onload) xhr.onload();
            },
            progress: function (e) {
              e.target = xhr;
              if (xhr.__listeners.progress) xhr.__listeners.progress(e);
              xhr.__total = e.total;
              xhr.__loaded = e.loaded;
              if (e.total === e.loaded) {
                // fix flash issue that doesn't call complete if there is no response text from the server
                var _this = this;
                setTimeout(function () {
                  if (!xhr.__completed) {
                    xhr.getAllResponseHeaders = function () {
                    };
                    _this.complete(null, {status: 204, statusText: 'No Content'});
                  }
                }, FileAPI.noContentTimeout || 10000);
              }
            },
            headers: xhr.__requestHeaders
          };
          config.data = {};
          config.files = {};
          for (var i = 0; i < formData.data.length; i++) {
            var item = formData.data[i];
            if (item.val != null && item.val.name != null && item.val.size != null && item.val.type != null) {
              config.files[item.key] = item.val;
            } else {
              config.data[item.key] = item.val;
            }
          }

          setTimeout(function () {
            if (!FileAPI.hasFlash) {
              throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
            }
            xhr.__fileApiXHR = FileAPI.upload(config);
          }, 1);
        } else {
          if (this.__origError) {
            throw this.__origError;
          }
          orig.apply(xhr, arguments);
        }
      };
    });
    window.XMLHttpRequest.__isFileAPIShim = true;
    window.FormData = FormData = function () {
      return {
        append: function (key, val, name) {
          if (val.__isFileAPIBlobShim) {
            val = val.data[0];
          }
          this.data.push({
            key: key,
            val: val,
            name: name
          });
        },
        data: [],
        __isFileAPIShim: true
      };
    };

    window.Blob = Blob = function (b) {
      return {
        data: b,
        __isFileAPIBlobShim: true
      };
    };
  }

})();

(function () {
  /** @namespace FileAPI.forceLoad */
  /** @namespace window.FileAPI.jsUrl */
  /** @namespace window.FileAPI.jsPath */

  function isInputTypeFile(elem) {
    return elem[0].tagName.toLowerCase() === 'input' && elem.attr('type') && elem.attr('type').toLowerCase() === 'file';
  }

  function hasFlash() {
    try {
      var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (fo) return true;
    } catch (e) {
      if (navigator.mimeTypes['application/x-shockwave-flash'] !== undefined) return true;
    }
    return false;
  }

  function getOffset(obj) {
    var left = 0, top = 0;

    if (window.jQuery) {
      return jQuery(obj).offset();
    }

    if (obj.offsetParent) {
      do {
        left += (obj.offsetLeft - obj.scrollLeft);
        top += (obj.offsetTop - obj.scrollTop);
        obj = obj.offsetParent;
      } while (obj);
    }
    return {
      left: left,
      top: top
    };
  }

  if (FileAPI.shouldLoad) {
    FileAPI.hasFlash = hasFlash();

    //load FileAPI
    if (FileAPI.forceLoad) {
      FileAPI.html5 = false;
    }

    if (!FileAPI.upload) {
      var jsUrl, basePath, script = document.createElement('script'), allScripts = document.getElementsByTagName('script'), i, index, src;
      if (window.FileAPI.jsUrl) {
        jsUrl = window.FileAPI.jsUrl;
      } else if (window.FileAPI.jsPath) {
        basePath = window.FileAPI.jsPath;
      } else {
        for (i = 0; i < allScripts.length; i++) {
          src = allScripts[i].src;
          index = src.search(/\/ng\-file\-upload[\-a-zA-z0-9\.]*\.js/);
          if (index > -1) {
            basePath = src.substring(0, index + 1);
            break;
          }
        }
      }

      if (FileAPI.staticPath == null) FileAPI.staticPath = basePath;
      script.setAttribute('src', jsUrl || basePath + 'FileAPI.min.js');
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    FileAPI.ngfFixIE = function (elem, fileElem, changeFn) {
      if (!hasFlash()) {
        throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
      }
      var fixInputStyle = function () {
        var label = fileElem.parent();
        if (elem.attr('disabled')) {
          if (label) label.removeClass('js-fileapi-wrapper');
        } else {
          if (!fileElem.attr('__ngf_flash_')) {
            fileElem.unbind('change');
            fileElem.unbind('click');
            fileElem.bind('change', function (evt) {
              fileApiChangeFn.apply(this, [evt]);
              changeFn.apply(this, [evt]);
            });
            fileElem.attr('__ngf_flash_', 'true');
          }
          label.addClass('js-fileapi-wrapper');
          if (!isInputTypeFile(elem)) {
            label.css('position', 'absolute')
              .css('top', getOffset(elem[0]).top + 'px').css('left', getOffset(elem[0]).left + 'px')
              .css('width', elem[0].offsetWidth + 'px').css('height', elem[0].offsetHeight + 'px')
              .css('filter', 'alpha(opacity=0)').css('display', elem.css('display'))
              .css('overflow', 'hidden').css('z-index', '900000')
              .css('visibility', 'visible');
            fileElem.css('width', elem[0].offsetWidth + 'px').css('height', elem[0].offsetHeight + 'px')
              .css('position', 'absolute').css('top', '0px').css('left', '0px');
          }
        }
      };

      elem.bind('mouseenter', fixInputStyle);

      var fileApiChangeFn = function (evt) {
        var files = FileAPI.getFiles(evt);
        //just a double check for #233
        for (var i = 0; i < files.length; i++) {
          if (files[i].size === undefined) files[i].size = 0;
          if (files[i].name === undefined) files[i].name = 'file';
          if (files[i].type === undefined) files[i].type = 'undefined';
        }
        if (!evt.target) {
          evt.target = {};
        }
        evt.target.files = files;
        // if evt.target.files is not writable use helper field
        if (evt.target.files !== files) {
          evt.__files_ = files;
        }
        (evt.__files_ || evt.target.files).item = function (i) {
          return (evt.__files_ || evt.target.files)[i] || null;
        };
      };
    };

    FileAPI.disableFileInput = function (elem, disable) {
      if (disable) {
        elem.removeClass('js-fileapi-wrapper');
      } else {
        elem.addClass('js-fileapi-wrapper');
      }
    };
  }
})();

if (!window.FileReader) {
  window.FileReader = function () {
    var _this = this, loadStarted = false;
    this.listeners = {};
    this.addEventListener = function (type, fn) {
      _this.listeners[type] = _this.listeners[type] || [];
      _this.listeners[type].push(fn);
    };
    this.removeEventListener = function (type, fn) {
      if (_this.listeners[type]) _this.listeners[type].splice(_this.listeners[type].indexOf(fn), 1);
    };
    this.dispatchEvent = function (evt) {
      var list = _this.listeners[evt.type];
      if (list) {
        for (var i = 0; i < list.length; i++) {
          list[i].call(_this, evt);
        }
      }
    };
    this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null;

    var constructEvent = function (type, evt) {
      var e = {type: type, target: _this, loaded: evt.loaded, total: evt.total, error: evt.error};
      if (evt.result != null) e.target.result = evt.result;
      return e;
    };
    var listener = function (evt) {
      if (!loadStarted) {
        loadStarted = true;
        if (_this.onloadstart) _this.onloadstart(constructEvent('loadstart', evt));
      }
      var e;
      if (evt.type === 'load') {
        if (_this.onloadend) _this.onloadend(constructEvent('loadend', evt));
        e = constructEvent('load', evt);
        if (_this.onload) _this.onload(e);
        _this.dispatchEvent(e);
      } else if (evt.type === 'progress') {
        e = constructEvent('progress', evt);
        if (_this.onprogress) _this.onprogress(e);
        _this.dispatchEvent(e);
      } else {
        e = constructEvent('error', evt);
        if (_this.onerror) _this.onerror(e);
        _this.dispatchEvent(e);
      }
    };
    this.readAsDataURL = function (file) {
      FileAPI.readAsDataURL(file, listener);
    };
    this.readAsText = function (file) {
      FileAPI.readAsText(file, listener);
    };
  };
}

/**!
 * AngularJS file upload directives and services. Supoorts: file upload/drop/paste, resume, cancel/abort,
 * progress, resize, thumbnail, preview, validation and CORS
 * @author  Danial  <danial.farid@gmail.com>
 * @version 12.2.13
 */

if (window.XMLHttpRequest && !(window.FileAPI && FileAPI.shouldLoad)) {
  window.XMLHttpRequest.prototype.setRequestHeader = (function (orig) {
    return function (header, value) {
      if (header === '__setXHR_') {
        var val = value(this);
        // fix for angular < 1.2.0
        if (val instanceof Function) {
          val(this);
        }
      } else {
        orig.apply(this, arguments);
      }
    };
  })(window.XMLHttpRequest.prototype.setRequestHeader);
}

var ngFileUpload = angular.module('ngFileUpload', []);

ngFileUpload.version = '12.2.13';

ngFileUpload.service('UploadBase', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
  var upload = this;
  upload.promisesCount = 0;

  this.isResumeSupported = function () {
    return window.Blob && window.Blob.prototype.slice;
  };

  var resumeSupported = this.isResumeSupported();

  function sendHttp(config) {
    config.method = config.method || 'POST';
    config.headers = config.headers || {};

    var deferred = config._deferred = config._deferred || $q.defer();
    var promise = deferred.promise;

    function notifyProgress(e) {
      if (deferred.notify) {
        deferred.notify(e);
      }
      if (promise.progressFunc) {
        $timeout(function () {
          promise.progressFunc(e);
        });
      }
    }

    function getNotifyEvent(n) {
      if (config._start != null && resumeSupported) {
        return {
          loaded: n.loaded + config._start,
          total: (config._file && config._file.size) || n.total,
          type: n.type, config: config,
          lengthComputable: true, target: n.target
        };
      } else {
        return n;
      }
    }

    if (!config.disableProgress) {
      config.headers.__setXHR_ = function () {
        return function (xhr) {
          if (!xhr || !xhr.upload || !xhr.upload.addEventListener) return;
          config.__XHR = xhr;
          if (config.xhrFn) config.xhrFn(xhr);
          xhr.upload.addEventListener('progress', function (e) {
            e.config = config;
            notifyProgress(getNotifyEvent(e));
          }, false);
          //fix for firefox not firing upload progress end, also IE8-9
          xhr.upload.addEventListener('load', function (e) {
            if (e.lengthComputable) {
              e.config = config;
              notifyProgress(getNotifyEvent(e));
            }
          }, false);
        };
      };
    }

    function uploadWithAngular() {
      $http(config).then(function (r) {
          if (resumeSupported && config._chunkSize && !config._finished && config._file) {
            var fileSize = config._file && config._file.size || 0;
            notifyProgress({
                loaded: Math.min(config._end, fileSize),
                total: fileSize,
                config: config,
                type: 'progress'
              }
            );
            upload.upload(config, true);
          } else {
            if (config._finished) delete config._finished;
            deferred.resolve(r);
          }
        }, function (e) {
          deferred.reject(e);
        }, function (n) {
          deferred.notify(n);
        }
      );
    }

    if (!resumeSupported) {
      uploadWithAngular();
    } else if (config._chunkSize && config._end && !config._finished) {
      config._start = config._end;
      config._end += config._chunkSize;
      uploadWithAngular();
    } else if (config.resumeSizeUrl) {
      $http.get(config.resumeSizeUrl).then(function (resp) {
        if (config.resumeSizeResponseReader) {
          config._start = config.resumeSizeResponseReader(resp.data);
        } else {
          config._start = parseInt((resp.data.size == null ? resp.data : resp.data.size).toString());
        }
        if (config._chunkSize) {
          config._end = config._start + config._chunkSize;
        }
        uploadWithAngular();
      }, function (e) {
        throw e;
      });
    } else if (config.resumeSize) {
      config.resumeSize().then(function (size) {
        config._start = size;
        if (config._chunkSize) {
          config._end = config._start + config._chunkSize;
        }
        uploadWithAngular();
      }, function (e) {
        throw e;
      });
    } else {
      if (config._chunkSize) {
        config._start = 0;
        config._end = config._start + config._chunkSize;
      }
      uploadWithAngular();
    }


    promise.success = function (fn) {
      promise.then(function (response) {
        fn(response.data, response.status, response.headers, config);
      });
      return promise;
    };

    promise.error = function (fn) {
      promise.then(null, function (response) {
        fn(response.data, response.status, response.headers, config);
      });
      return promise;
    };

    promise.progress = function (fn) {
      promise.progressFunc = fn;
      promise.then(null, null, function (n) {
        fn(n);
      });
      return promise;
    };
    promise.abort = promise.pause = function () {
      if (config.__XHR) {
        $timeout(function () {
          config.__XHR.abort();
        });
      }
      return promise;
    };
    promise.xhr = function (fn) {
      config.xhrFn = (function (origXhrFn) {
        return function () {
          if (origXhrFn) origXhrFn.apply(promise, arguments);
          fn.apply(promise, arguments);
        };
      })(config.xhrFn);
      return promise;
    };

    upload.promisesCount++;
    if (promise['finally'] && promise['finally'] instanceof Function) {
      promise['finally'](function () {
        upload.promisesCount--;
      });
    }
    return promise;
  }

  this.isUploadInProgress = function () {
    return upload.promisesCount > 0;
  };

  this.rename = function (file, name) {
    file.ngfName = name;
    return file;
  };

  this.jsonBlob = function (val) {
    if (val != null && !angular.isString(val)) {
      val = JSON.stringify(val);
    }
    var blob = new window.Blob([val], {type: 'application/json'});
    blob._ngfBlob = true;
    return blob;
  };

  this.json = function (val) {
    return angular.toJson(val);
  };

  function copy(obj) {
    var clone = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = obj[key];
      }
    }
    return clone;
  }

  this.isFile = function (file) {
    return file != null && (file instanceof window.Blob || (file.flashId && file.name && file.size));
  };

  this.upload = function (config, internal) {
    function toResumeFile(file, formData) {
      if (file._ngfBlob) return file;
      config._file = config._file || file;
      if (config._start != null && resumeSupported) {
        if (config._end && config._end >= file.size) {
          config._finished = true;
          config._end = file.size;
        }
        var slice = file.slice(config._start, config._end || file.size);
        slice.name = file.name;
        slice.ngfName = file.ngfName;
        if (config._chunkSize) {
          formData.append('_chunkSize', config._chunkSize);
          formData.append('_currentChunkSize', config._end - config._start);
          formData.append('_chunkNumber', Math.floor(config._start / config._chunkSize));
          formData.append('_totalSize', config._file.size);
        }
        return slice;
      }
      return file;
    }

    function addFieldToFormData(formData, val, key) {
      if (val !== undefined) {
        if (angular.isDate(val)) {
          val = val.toISOString();
        }
        if (angular.isString(val)) {
          formData.append(key, val);
        } else if (upload.isFile(val)) {
          var file = toResumeFile(val, formData);
          var split = key.split(',');
          if (split[1]) {
            file.ngfName = split[1].replace(/^\s+|\s+$/g, '');
            key = split[0];
          }
          config._fileKey = config._fileKey || key;
          formData.append(key, file, file.ngfName || file.name);
        } else {
          if (angular.isObject(val)) {
            if (val.$$ngfCircularDetection) throw 'ngFileUpload: Circular reference in config.data. Make sure specified data for Upload.upload() has no circular reference: ' + key;

            val.$$ngfCircularDetection = true;
            try {
              for (var k in val) {
                if (val.hasOwnProperty(k) && k !== '$$ngfCircularDetection') {
                  var objectKey = config.objectKey == null ? '[i]' : config.objectKey;
                  if (val.length && parseInt(k) > -1) {
                    objectKey = config.arrayKey == null ? objectKey : config.arrayKey;
                  }
                  addFieldToFormData(formData, val[k], key + objectKey.replace(/[ik]/g, k));
                }
              }
            } finally {
              delete val.$$ngfCircularDetection;
            }
          } else {
            formData.append(key, val);
          }
        }
      }
    }

    function digestConfig() {
      config._chunkSize = upload.translateScalars(config.resumeChunkSize);
      config._chunkSize = config._chunkSize ? parseInt(config._chunkSize.toString()) : null;

      config.headers = config.headers || {};
      config.headers['Content-Type'] = undefined;
      config.transformRequest = config.transformRequest ?
        (angular.isArray(config.transformRequest) ?
          config.transformRequest : [config.transformRequest]) : [];
      config.transformRequest.push(function (data) {
        var formData = new window.FormData(), key;
        data = data || config.fields || {};
        if (config.file) {
          data.file = config.file;
        }
        for (key in data) {
          if (data.hasOwnProperty(key)) {
            var val = data[key];
            if (config.formDataAppender) {
              config.formDataAppender(formData, key, val);
            } else {
              addFieldToFormData(formData, val, key);
            }
          }
        }

        return formData;
      });
    }

    if (!internal) config = copy(config);
    if (!config._isDigested) {
      config._isDigested = true;
      digestConfig();
    }

    return sendHttp(config);
  };

  this.http = function (config) {
    config = copy(config);
    config.transformRequest = config.transformRequest || function (data) {
        if ((window.ArrayBuffer && data instanceof window.ArrayBuffer) || data instanceof window.Blob) {
          return data;
        }
        return $http.defaults.transformRequest[0].apply(this, arguments);
      };
    config._chunkSize = upload.translateScalars(config.resumeChunkSize);
    config._chunkSize = config._chunkSize ? parseInt(config._chunkSize.toString()) : null;

    return sendHttp(config);
  };

  this.translateScalars = function (str) {
    if (angular.isString(str)) {
      if (str.search(/kb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1024);
      } else if (str.search(/mb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1048576);
      } else if (str.search(/gb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1073741824);
      } else if (str.search(/b/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      } else if (str.search(/s/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      } else if (str.search(/m/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1) * 60);
      } else if (str.search(/h/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1) * 3600);
      }
    }
    return str;
  };

  this.urlToBlob = function(url) {
    var defer = $q.defer();
    $http({url: url, method: 'get', responseType: 'arraybuffer'}).then(function (resp) {
      var arrayBufferView = new Uint8Array(resp.data);
      var type = resp.headers('content-type') || 'image/WebP';
      var blob = new window.Blob([arrayBufferView], {type: type});
      var matches = url.match(/.*\/(.+?)(\?.*)?$/);
      if (matches.length > 1) {
        blob.name = matches[1];
      }
      defer.resolve(blob);
    }, function (e) {
      defer.reject(e);
    });
    return defer.promise;
  };

  this.setDefaults = function (defaults) {
    this.defaults = defaults || {};
  };

  this.defaults = {};
  this.version = ngFileUpload.version;
}

]);

ngFileUpload.service('Upload', ['$parse', '$timeout', '$compile', '$q', 'UploadExif', function ($parse, $timeout, $compile, $q, UploadExif) {
  var upload = UploadExif;
  upload.getAttrWithDefaults = function (attr, name) {
    if (attr[name] != null) return attr[name];
    var def = upload.defaults[name];
    return (def == null ? def : (angular.isString(def) ? def : JSON.stringify(def)));
  };

  upload.attrGetter = function (name, attr, scope, params) {
    var attrVal = this.getAttrWithDefaults(attr, name);
    if (scope) {
      try {
        if (params) {
          return $parse(attrVal)(scope, params);
        } else {
          return $parse(attrVal)(scope);
        }
      } catch (e) {
        // hangle string value without single qoute
        if (name.search(/min|max|pattern/i)) {
          return attrVal;
        } else {
          throw e;
        }
      }
    } else {
      return attrVal;
    }
  };

  upload.shouldUpdateOn = function (type, attr, scope) {
    var modelOptions = upload.attrGetter('ngfModelOptions', attr, scope);
    if (modelOptions && modelOptions.updateOn) {
      return modelOptions.updateOn.split(' ').indexOf(type) > -1;
    }
    return true;
  };

  upload.emptyPromise = function () {
    var d = $q.defer();
    var args = arguments;
    $timeout(function () {
      d.resolve.apply(d, args);
    });
    return d.promise;
  };

  upload.rejectPromise = function () {
    var d = $q.defer();
    var args = arguments;
    $timeout(function () {
      d.reject.apply(d, args);
    });
    return d.promise;
  };

  upload.happyPromise = function (promise, data) {
    var d = $q.defer();
    promise.then(function (result) {
      d.resolve(result);
    }, function (error) {
      $timeout(function () {
        throw error;
      });
      d.resolve(data);
    });
    return d.promise;
  };

  function applyExifRotations(files, attr, scope) {
    var promises = [upload.emptyPromise()];
    angular.forEach(files, function (f, i) {
      if (f.type.indexOf('image/jpeg') === 0 && upload.attrGetter('ngfFixOrientation', attr, scope, {$file: f})) {
        promises.push(upload.happyPromise(upload.applyExifRotation(f), f).then(function (fixedFile) {
          files.splice(i, 1, fixedFile);
        }));
      }
    });
    return $q.all(promises);
  }

  function resizeFile(files, attr, scope, ngModel) {
    var resizeVal = upload.attrGetter('ngfResize', attr, scope);
    if (!resizeVal || !upload.isResizeSupported() || !files.length) return upload.emptyPromise();
    if (resizeVal instanceof Function) {
      var defer = $q.defer();
      return resizeVal(files).then(function (p) {
        resizeWithParams(p, files, attr, scope, ngModel).then(function (r) {
          defer.resolve(r);
        }, function (e) {
          defer.reject(e);
        });
      }, function (e) {
        defer.reject(e);
      });
    } else {
      return resizeWithParams(resizeVal, files, attr, scope, ngModel);
    }
  }

  function resizeWithParams(params, files, attr, scope, ngModel) {
    var promises = [upload.emptyPromise()];

    function handleFile(f, i) {
      if (f.type.indexOf('image') === 0) {
        if (params.pattern && !upload.validatePattern(f, params.pattern)) return;
        params.resizeIf = function (width, height) {
          return upload.attrGetter('ngfResizeIf', attr, scope,
            {$width: width, $height: height, $file: f});
        };
        var promise = upload.resize(f, params);
        promises.push(promise);
        promise.then(function (resizedFile) {
          files.splice(i, 1, resizedFile);
        }, function (e) {
          f.$error = 'resize';
          (f.$errorMessages = (f.$errorMessages || {})).resize = true;
          f.$errorParam = (e ? (e.message ? e.message : e) + ': ' : '') + (f && f.name);
          ngModel.$ngfValidations.push({name: 'resize', valid: false});
          upload.applyModelValidation(ngModel, files);
        });
      }
    }

    for (var i = 0; i < files.length; i++) {
      handleFile(files[i], i);
    }
    return $q.all(promises);
  }

  upload.updateModel = function (ngModel, attr, scope, fileChange, files, evt, noDelay) {
    function update(files, invalidFiles, newFiles, dupFiles, isSingleModel) {
      attr.$$ngfPrevValidFiles = files;
      attr.$$ngfPrevInvalidFiles = invalidFiles;
      var file = files && files.length ? files[0] : null;
      var invalidFile = invalidFiles && invalidFiles.length ? invalidFiles[0] : null;

      if (ngModel) {
        upload.applyModelValidation(ngModel, files);
        ngModel.$setViewValue(isSingleModel ? file : files);
      }

      if (fileChange) {
        $parse(fileChange)(scope, {
          $files: files,
          $file: file,
          $newFiles: newFiles,
          $duplicateFiles: dupFiles,
          $invalidFiles: invalidFiles,
          $invalidFile: invalidFile,
          $event: evt
        });
      }

      var invalidModel = upload.attrGetter('ngfModelInvalid', attr);
      if (invalidModel) {
        $timeout(function () {
          $parse(invalidModel).assign(scope, isSingleModel ? invalidFile : invalidFiles);
        });
      }
      $timeout(function () {
        // scope apply changes
      });
    }

    var allNewFiles, dupFiles = [], prevValidFiles, prevInvalidFiles,
      invalids = [], valids = [];

    function removeDuplicates() {
      function equals(f1, f2) {
        return f1.name === f2.name && (f1.$ngfOrigSize || f1.size) === (f2.$ngfOrigSize || f2.size) &&
          f1.type === f2.type;
      }

      function isInPrevFiles(f) {
        var j;
        for (j = 0; j < prevValidFiles.length; j++) {
          if (equals(f, prevValidFiles[j])) {
            return true;
          }
        }
        for (j = 0; j < prevInvalidFiles.length; j++) {
          if (equals(f, prevInvalidFiles[j])) {
            return true;
          }
        }
        return false;
      }

      if (files) {
        allNewFiles = [];
        dupFiles = [];
        for (var i = 0; i < files.length; i++) {
          if (isInPrevFiles(files[i])) {
            dupFiles.push(files[i]);
          } else {
            allNewFiles.push(files[i]);
          }
        }
      }
    }

    function toArray(v) {
      return angular.isArray(v) ? v : [v];
    }

    function resizeAndUpdate() {
      function updateModel() {
        $timeout(function () {
          update(keep ? prevValidFiles.concat(valids) : valids,
            keep ? prevInvalidFiles.concat(invalids) : invalids,
            files, dupFiles, isSingleModel);
        }, options && options.debounce ? options.debounce.change || options.debounce : 0);
      }

      var resizingFiles = validateAfterResize ? allNewFiles : valids;
      resizeFile(resizingFiles, attr, scope, ngModel).then(function () {
        if (validateAfterResize) {
          upload.validate(allNewFiles, keep ? prevValidFiles.length : 0, ngModel, attr, scope)
            .then(function (validationResult) {
              valids = validationResult.validsFiles;
              invalids = validationResult.invalidsFiles;
              updateModel();
            });
        } else {
          updateModel();
        }
      }, function () {
        for (var i = 0; i < resizingFiles.length; i++) {
          var f = resizingFiles[i];
          if (f.$error === 'resize') {
            var index = valids.indexOf(f);
            if (index > -1) {
              valids.splice(index, 1);
              invalids.push(f);
            }
            updateModel();
          }
        }
      });
    }

    prevValidFiles = attr.$$ngfPrevValidFiles || [];
    prevInvalidFiles = attr.$$ngfPrevInvalidFiles || [];
    if (ngModel && ngModel.$modelValue) {
      prevValidFiles = toArray(ngModel.$modelValue);
    }

    var keep = upload.attrGetter('ngfKeep', attr, scope);
    allNewFiles = (files || []).slice(0);
    if (keep === 'distinct' || upload.attrGetter('ngfKeepDistinct', attr, scope) === true) {
      removeDuplicates(attr, scope);
    }

    var isSingleModel = !keep && !upload.attrGetter('ngfMultiple', attr, scope) && !upload.attrGetter('multiple', attr);

    if (keep && !allNewFiles.length) return;

    upload.attrGetter('ngfBeforeModelChange', attr, scope, {
      $files: files,
      $file: files && files.length ? files[0] : null,
      $newFiles: allNewFiles,
      $duplicateFiles: dupFiles,
      $event: evt
    });

    var validateAfterResize = upload.attrGetter('ngfValidateAfterResize', attr, scope);

    var options = upload.attrGetter('ngfModelOptions', attr, scope);
    upload.validate(allNewFiles, keep ? prevValidFiles.length : 0, ngModel, attr, scope)
      .then(function (validationResult) {
      if (noDelay) {
        update(allNewFiles, [], files, dupFiles, isSingleModel);
      } else {
        if ((!options || !options.allowInvalid) && !validateAfterResize) {
          valids = validationResult.validFiles;
          invalids = validationResult.invalidFiles;
        } else {
          valids = allNewFiles;
        }
        if (upload.attrGetter('ngfFixOrientation', attr, scope) && upload.isExifSupported()) {
          applyExifRotations(valids, attr, scope).then(function () {
            resizeAndUpdate();
          });
        } else {
          resizeAndUpdate();
        }
      }
    });
  };

  return upload;
}]);

ngFileUpload.directive('ngfSelect', ['$parse', '$timeout', '$compile', 'Upload', function ($parse, $timeout, $compile, Upload) {
  var generatedElems = [];

  function isDelayedClickSupported(ua) {
    // fix for android native browser < 4.4 and safari windows
    var m = ua.match(/Android[^\d]*(\d+)\.(\d+)/);
    if (m && m.length > 2) {
      var v = Upload.defaults.androidFixMinorVersion || 4;
      return parseInt(m[1]) < 4 || (parseInt(m[1]) === v && parseInt(m[2]) < v);
    }

    // safari on windows
    return ua.indexOf('Chrome') === -1 && /.*Windows.*Safari.*/.test(ua);
  }

  function linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile, upload) {
    /** @namespace attr.ngfSelect */
    /** @namespace attr.ngfChange */
    /** @namespace attr.ngModel */
    /** @namespace attr.ngfModelOptions */
    /** @namespace attr.ngfMultiple */
    /** @namespace attr.ngfCapture */
    /** @namespace attr.ngfValidate */
    /** @namespace attr.ngfKeep */
    var attrGetter = function (name, scope) {
      return upload.attrGetter(name, attr, scope);
    };

    function isInputTypeFile() {
      return elem[0].tagName.toLowerCase() === 'input' && attr.type && attr.type.toLowerCase() === 'file';
    }

    function fileChangeAttr() {
      return attrGetter('ngfChange') || attrGetter('ngfSelect');
    }

    function changeFn(evt) {
      if (upload.shouldUpdateOn('change', attr, scope)) {
        var fileList = evt.__files_ || (evt.target && evt.target.files), files = [];
        /* Handle duplicate call in  IE11 */
        if (!fileList) return;
        for (var i = 0; i < fileList.length; i++) {
          files.push(fileList[i]);
        }
        upload.updateModel(ngModel, attr, scope, fileChangeAttr(),
          files.length ? files : null, evt);
      }
    }

    upload.registerModelChangeValidator(ngModel, attr, scope);

    var unwatches = [];
    if (attrGetter('ngfMultiple')) {
      unwatches.push(scope.$watch(attrGetter('ngfMultiple'), function () {
        fileElem.attr('multiple', attrGetter('ngfMultiple', scope));
      }));
    }
    if (attrGetter('ngfCapture')) {
      unwatches.push(scope.$watch(attrGetter('ngfCapture'), function () {
        fileElem.attr('capture', attrGetter('ngfCapture', scope));
      }));
    }
    if (attrGetter('ngfAccept')) {
      unwatches.push(scope.$watch(attrGetter('ngfAccept'), function () {
        fileElem.attr('accept', attrGetter('ngfAccept', scope));
      }));
    }
    unwatches.push(attr.$observe('accept', function () {
      fileElem.attr('accept', attrGetter('accept'));
    }));
    function bindAttrToFileInput(fileElem, label) {
      function updateId(val) {
        fileElem.attr('id', 'ngf-' + val);
        label.attr('id', 'ngf-label-' + val);
      }

      for (var i = 0; i < elem[0].attributes.length; i++) {
        var attribute = elem[0].attributes[i];
        if (attribute.name !== 'type' && attribute.name !== 'class' && attribute.name !== 'style') {
          if (attribute.name === 'id') {
            updateId(attribute.value);
            unwatches.push(attr.$observe('id', updateId));
          } else {
            fileElem.attr(attribute.name, (!attribute.value && (attribute.name === 'required' ||
            attribute.name === 'multiple')) ? attribute.name : attribute.value);
          }
        }
      }
    }

    function createFileInput() {
      if (isInputTypeFile()) {
        return elem;
      }

      var fileElem = angular.element('<input type="file">');

      var label = angular.element('<label>upload</label>');
      label.css('visibility', 'hidden').css('position', 'absolute').css('overflow', 'hidden')
        .css('width', '0px').css('height', '0px').css('border', 'none')
        .css('margin', '0px').css('padding', '0px').attr('tabindex', '-1');
      bindAttrToFileInput(fileElem, label);

      generatedElems.push({el: elem, ref: label});

      document.body.appendChild(label.append(fileElem)[0]);

      return fileElem;
    }

    function clickHandler(evt) {
      if (elem.attr('disabled')) return false;
      if (attrGetter('ngfSelectDisabled', scope)) return;

      var r = detectSwipe(evt);
      // prevent the click if it is a swipe
      if (r != null) return r;

      resetModel(evt);

      // fix for md when the element is removed from the DOM and added back #460
      try {
        if (!isInputTypeFile() && !document.body.contains(fileElem[0])) {
          generatedElems.push({el: elem, ref: fileElem.parent()});
          document.body.appendChild(fileElem.parent()[0]);
          fileElem.bind('change', changeFn);
        }
      } catch (e) {/*ignore*/
      }

      if (isDelayedClickSupported(navigator.userAgent)) {
        setTimeout(function () {
          fileElem[0].click();
        }, 0);
      } else {
        fileElem[0].click();
      }

      return false;
    }


    var initialTouchStartY = 0;
    var initialTouchStartX = 0;

    function detectSwipe(evt) {
      var touches = evt.changedTouches || (evt.originalEvent && evt.originalEvent.changedTouches);
      if (touches) {
        if (evt.type === 'touchstart') {
          initialTouchStartX = touches[0].clientX;
          initialTouchStartY = touches[0].clientY;
          return true; // don't block event default
        } else {
          // prevent scroll from triggering event
          if (evt.type === 'touchend') {
            var currentX = touches[0].clientX;
            var currentY = touches[0].clientY;
            if ((Math.abs(currentX - initialTouchStartX) > 20) ||
              (Math.abs(currentY - initialTouchStartY) > 20)) {
              evt.stopPropagation();
              evt.preventDefault();
              return false;
            }
          }
          return true;
        }
      }
    }

    var fileElem = elem;

    function resetModel(evt) {
      if (upload.shouldUpdateOn('click', attr, scope) && fileElem.val()) {
        fileElem.val(null);
        upload.updateModel(ngModel, attr, scope, fileChangeAttr(), null, evt, true);
      }
    }

    if (!isInputTypeFile()) {
      fileElem = createFileInput();
    }
    fileElem.bind('change', changeFn);

    if (!isInputTypeFile()) {
      elem.bind('click touchstart touchend', clickHandler);
    } else {
      elem.bind('click', resetModel);
    }

    function ie10SameFileSelectFix(evt) {
      if (fileElem && !fileElem.attr('__ngf_ie10_Fix_')) {
        if (!fileElem[0].parentNode) {
          fileElem = null;
          return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        fileElem.unbind('click');
        var clone = fileElem.clone();
        fileElem.replaceWith(clone);
        fileElem = clone;
        fileElem.attr('__ngf_ie10_Fix_', 'true');
        fileElem.bind('change', changeFn);
        fileElem.bind('click', ie10SameFileSelectFix);
        fileElem[0].click();
        return false;
      } else {
        fileElem.removeAttr('__ngf_ie10_Fix_');
      }
    }

    if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
      fileElem.bind('click', ie10SameFileSelectFix);
    }

    if (ngModel) ngModel.$formatters.push(function (val) {
      if (val == null || val.length === 0) {
        if (fileElem.val()) {
          fileElem.val(null);
        }
      }
      return val;
    });

    scope.$on('$destroy', function () {
      if (!isInputTypeFile()) fileElem.parent().remove();
      angular.forEach(unwatches, function (unwatch) {
        unwatch();
      });
    });

    $timeout(function () {
      for (var i = 0; i < generatedElems.length; i++) {
        var g = generatedElems[i];
        if (!document.body.contains(g.el[0])) {
          generatedElems.splice(i, 1);
          g.ref.remove();
        }
      }
    });

    if (window.FileAPI && window.FileAPI.ngfFixIE) {
      window.FileAPI.ngfFixIE(elem, fileElem, changeFn);
    }
  }

  return {
    restrict: 'AEC',
    require: '?ngModel',
    link: function (scope, elem, attr, ngModel) {
      linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile, Upload);
    }
  };
}]);

(function () {

  ngFileUpload.service('UploadDataUrl', ['UploadBase', '$timeout', '$q', function (UploadBase, $timeout, $q) {
    var upload = UploadBase;
    upload.base64DataUrl = function (file) {
      if (angular.isArray(file)) {
        var d = $q.defer(), count = 0;
        angular.forEach(file, function (f) {
          upload.dataUrl(f, true)['finally'](function () {
            count++;
            if (count === file.length) {
              var urls = [];
              angular.forEach(file, function (ff) {
                urls.push(ff.$ngfDataUrl);
              });
              d.resolve(urls, file);
            }
          });
        });
        return d.promise;
      } else {
        return upload.dataUrl(file, true);
      }
    };
    upload.dataUrl = function (file, disallowObjectUrl) {
      if (!file) return upload.emptyPromise(file, file);
      if ((disallowObjectUrl && file.$ngfDataUrl != null) || (!disallowObjectUrl && file.$ngfBlobUrl != null)) {
        return upload.emptyPromise(disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl, file);
      }
      var p = disallowObjectUrl ? file.$$ngfDataUrlPromise : file.$$ngfBlobUrlPromise;
      if (p) return p;

      var deferred = $q.defer();
      $timeout(function () {
        if (window.FileReader && file &&
          (!window.FileAPI || navigator.userAgent.indexOf('MSIE 8') === -1 || file.size < 20000) &&
          (!window.FileAPI || navigator.userAgent.indexOf('MSIE 9') === -1 || file.size < 4000000)) {
          //prefer URL.createObjectURL for handling refrences to files of all sizes
          //since it doesn´t build a large string in memory
          var URL = window.URL || window.webkitURL;
          if (URL && URL.createObjectURL && !disallowObjectUrl) {
            var url;
            try {
              url = URL.createObjectURL(file);
            } catch (e) {
              $timeout(function () {
                file.$ngfBlobUrl = '';
                deferred.reject();
              });
              return;
            }
            $timeout(function () {
              file.$ngfBlobUrl = url;
              if (url) {
                deferred.resolve(url, file);
                upload.blobUrls = upload.blobUrls || [];
                upload.blobUrlsTotalSize = upload.blobUrlsTotalSize || 0;
                upload.blobUrls.push({url: url, size: file.size});
                upload.blobUrlsTotalSize += file.size || 0;
                var maxMemory = upload.defaults.blobUrlsMaxMemory || 268435456;
                var maxLength = upload.defaults.blobUrlsMaxQueueSize || 200;
                while ((upload.blobUrlsTotalSize > maxMemory || upload.blobUrls.length > maxLength) && upload.blobUrls.length > 1) {
                  var obj = upload.blobUrls.splice(0, 1)[0];
                  URL.revokeObjectURL(obj.url);
                  upload.blobUrlsTotalSize -= obj.size;
                }
              }
            });
          } else {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              $timeout(function () {
                file.$ngfDataUrl = e.target.result;
                deferred.resolve(e.target.result, file);
                $timeout(function () {
                  delete file.$ngfDataUrl;
                }, 1000);
              });
            };
            fileReader.onerror = function () {
              $timeout(function () {
                file.$ngfDataUrl = '';
                deferred.reject();
              });
            };
            fileReader.readAsDataURL(file);
          }
        } else {
          $timeout(function () {
            file[disallowObjectUrl ? '$ngfDataUrl' : '$ngfBlobUrl'] = '';
            deferred.reject();
          });
        }
      });

      if (disallowObjectUrl) {
        p = file.$$ngfDataUrlPromise = deferred.promise;
      } else {
        p = file.$$ngfBlobUrlPromise = deferred.promise;
      }
      p['finally'](function () {
        delete file[disallowObjectUrl ? '$$ngfDataUrlPromise' : '$$ngfBlobUrlPromise'];
      });
      return p;
    };
    return upload;
  }]);

  function getTagType(el) {
    if (el.tagName.toLowerCase() === 'img') return 'image';
    if (el.tagName.toLowerCase() === 'audio') return 'audio';
    if (el.tagName.toLowerCase() === 'video') return 'video';
    return /./;
  }

  function linkFileDirective(Upload, $timeout, scope, elem, attr, directiveName, resizeParams, isBackground) {
    function constructDataUrl(file) {
      var disallowObjectUrl = Upload.attrGetter('ngfNoObjectUrl', attr, scope);
      Upload.dataUrl(file, disallowObjectUrl)['finally'](function () {
        $timeout(function () {
          var src = (disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl) || file.$ngfDataUrl;
          if (isBackground) {
            elem.css('background-image', 'url(\'' + (src || '') + '\')');
          } else {
            elem.attr('src', src);
          }
          if (src) {
            elem.removeClass('ng-hide');
          } else {
            elem.addClass('ng-hide');
          }
        });
      });
    }

    $timeout(function () {
      var unwatch = scope.$watch(attr[directiveName], function (file) {
        var size = resizeParams;
        if (directiveName === 'ngfThumbnail') {
          if (!size) {
            size = {
              width: elem[0].naturalWidth || elem[0].clientWidth,
              height: elem[0].naturalHeight || elem[0].clientHeight
            };
          }
          if (size.width === 0 && window.getComputedStyle) {
            var style = getComputedStyle(elem[0]);
            if (style.width && style.width.indexOf('px') > -1 && style.height && style.height.indexOf('px') > -1) {
              size = {
                width: parseInt(style.width.slice(0, -2)),
                height: parseInt(style.height.slice(0, -2))
              };
            }
          }
        }

        if (angular.isString(file)) {
          elem.removeClass('ng-hide');
          if (isBackground) {
            return elem.css('background-image', 'url(\'' + file + '\')');
          } else {
            return elem.attr('src', file);
          }
        }
        if (file && file.type && file.type.search(getTagType(elem[0])) === 0 &&
          (!isBackground || file.type.indexOf('image') === 0)) {
          if (size && Upload.isResizeSupported()) {
            size.resizeIf = function (width, height) {
              return Upload.attrGetter('ngfResizeIf', attr, scope,
                {$width: width, $height: height, $file: file});
            };
            Upload.resize(file, size).then(
              function (f) {
                constructDataUrl(f);
              }, function (e) {
                throw e;
              }
            );
          } else {
            constructDataUrl(file);
          }
        } else {
          elem.addClass('ng-hide');
        }
      });

      scope.$on('$destroy', function () {
        unwatch();
      });
    });
  }


  /** @namespace attr.ngfSrc */
  /** @namespace attr.ngfNoObjectUrl */
  ngFileUpload.directive('ngfSrc', ['Upload', '$timeout', function (Upload, $timeout) {
    return {
      restrict: 'AE',
      link: function (scope, elem, attr) {
        linkFileDirective(Upload, $timeout, scope, elem, attr, 'ngfSrc',
          Upload.attrGetter('ngfResize', attr, scope), false);
      }
    };
  }]);

  /** @namespace attr.ngfBackground */
  /** @namespace attr.ngfNoObjectUrl */
  ngFileUpload.directive('ngfBackground', ['Upload', '$timeout', function (Upload, $timeout) {
    return {
      restrict: 'AE',
      link: function (scope, elem, attr) {
        linkFileDirective(Upload, $timeout, scope, elem, attr, 'ngfBackground',
          Upload.attrGetter('ngfResize', attr, scope), true);
      }
    };
  }]);

  /** @namespace attr.ngfThumbnail */
  /** @namespace attr.ngfAsBackground */
  /** @namespace attr.ngfSize */
  /** @namespace attr.ngfNoObjectUrl */
  ngFileUpload.directive('ngfThumbnail', ['Upload', '$timeout', function (Upload, $timeout) {
    return {
      restrict: 'AE',
      link: function (scope, elem, attr) {
        var size = Upload.attrGetter('ngfSize', attr, scope);
        linkFileDirective(Upload, $timeout, scope, elem, attr, 'ngfThumbnail', size,
          Upload.attrGetter('ngfAsBackground', attr, scope));
      }
    };
  }]);

  ngFileUpload.config(['$compileProvider', function ($compileProvider) {
    if ($compileProvider.imgSrcSanitizationWhitelist) $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/);
    if ($compileProvider.aHrefSanitizationWhitelist) $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/);
  }]);

  ngFileUpload.filter('ngfDataUrl', ['UploadDataUrl', '$sce', function (UploadDataUrl, $sce) {
    return function (file, disallowObjectUrl, trustedUrl) {
      if (angular.isString(file)) {
        return $sce.trustAsResourceUrl(file);
      }
      var src = file && ((disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl) || file.$ngfDataUrl);
      if (file && !src) {
        if (!file.$ngfDataUrlFilterInProgress && angular.isObject(file)) {
          file.$ngfDataUrlFilterInProgress = true;
          UploadDataUrl.dataUrl(file, disallowObjectUrl);
        }
        return '';
      }
      if (file) delete file.$ngfDataUrlFilterInProgress;
      return (file && src ? (trustedUrl ? $sce.trustAsResourceUrl(src) : src) : file) || '';
    };
  }]);

})();

ngFileUpload.service('UploadValidate', ['UploadDataUrl', '$q', '$timeout', function (UploadDataUrl, $q, $timeout) {
  var upload = UploadDataUrl;

  function globStringToRegex(str) {
    var regexp = '', excludes = [];
    if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
      regexp = str.substring(1, str.length - 1);
    } else {
      var split = str.split(',');
      if (split.length > 1) {
        for (var i = 0; i < split.length; i++) {
          var r = globStringToRegex(split[i]);
          if (r.regexp) {
            regexp += '(' + r.regexp + ')';
            if (i < split.length - 1) {
              regexp += '|';
            }
          } else {
            excludes = excludes.concat(r.excludes);
          }
        }
      } else {
        if (str.indexOf('!') === 0) {
          excludes.push('^((?!' + globStringToRegex(str.substring(1)).regexp + ').)*$');
        } else {
          if (str.indexOf('.') === 0) {
            str = '*' + str;
          }
          regexp = '^' + str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&') + '$';
          regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
        }
      }
    }
    return {regexp: regexp, excludes: excludes};
  }

  upload.validatePattern = function (file, val) {
    if (!val) {
      return true;
    }
    var pattern = globStringToRegex(val), valid = true;
    if (pattern.regexp && pattern.regexp.length) {
      var regexp = new RegExp(pattern.regexp, 'i');
      valid = (file.type != null && regexp.test(file.type)) ||
        (file.name != null && regexp.test(file.name));
    }
    var len = pattern.excludes.length;
    while (len--) {
      var exclude = new RegExp(pattern.excludes[len], 'i');
      valid = valid && (file.type == null || exclude.test(file.type)) &&
        (file.name == null || exclude.test(file.name));
    }
    return valid;
  };

  upload.ratioToFloat = function (val) {
    var r = val.toString(), xIndex = r.search(/[x:]/i);
    if (xIndex > -1) {
      r = parseFloat(r.substring(0, xIndex)) / parseFloat(r.substring(xIndex + 1));
    } else {
      r = parseFloat(r);
    }
    return r;
  };

  upload.registerModelChangeValidator = function (ngModel, attr, scope) {
    if (ngModel) {
      ngModel.$formatters.push(function (files) {
        if (ngModel.$dirty) {
          var filesArray = files;
          if (files && !angular.isArray(files)) {
            filesArray = [files];
          }
          upload.validate(filesArray, 0, ngModel, attr, scope).then(function () {
            upload.applyModelValidation(ngModel, filesArray);
          });
        }
        return files;
      });
    }
  };

  function markModelAsDirty(ngModel, files) {
    if (files != null && !ngModel.$dirty) {
      if (ngModel.$setDirty) {
        ngModel.$setDirty();
      } else {
        ngModel.$dirty = true;
      }
    }
  }

  upload.applyModelValidation = function (ngModel, files) {
    markModelAsDirty(ngModel, files);
    angular.forEach(ngModel.$ngfValidations, function (validation) {
      ngModel.$setValidity(validation.name, validation.valid);
    });
  };

  upload.getValidationAttr = function (attr, scope, name, validationName, file) {
    var dName = 'ngf' + name[0].toUpperCase() + name.substr(1);
    var val = upload.attrGetter(dName, attr, scope, {$file: file});
    if (val == null) {
      val = upload.attrGetter('ngfValidate', attr, scope, {$file: file});
      if (val) {
        var split = (validationName || name).split('.');
        val = val[split[0]];
        if (split.length > 1) {
          val = val && val[split[1]];
        }
      }
    }
    return val;
  };

  upload.validate = function (files, prevLength, ngModel, attr, scope) {
    ngModel = ngModel || {};
    ngModel.$ngfValidations = ngModel.$ngfValidations || [];

    angular.forEach(ngModel.$ngfValidations, function (v) {
      v.valid = true;
    });

    var attrGetter = function (name, params) {
      return upload.attrGetter(name, attr, scope, params);
    };

    var ignoredErrors = (upload.attrGetter('ngfIgnoreInvalid', attr, scope) || '').split(' ');
    var runAllValidation = upload.attrGetter('ngfRunAllValidations', attr, scope);

    if (files == null || files.length === 0) {
      return upload.emptyPromise({'validFiles': files, 'invalidFiles': []});
    }

    files = files.length === undefined ? [files] : files.slice(0);
    var invalidFiles = [];

    function validateSync(name, validationName, fn) {
      if (files) {
        var i = files.length, valid = null;
        while (i--) {
          var file = files[i];
          if (file) {
            var val = upload.getValidationAttr(attr, scope, name, validationName, file);
            if (val != null) {
              if (!fn(file, val, i)) {
                if (ignoredErrors.indexOf(name) === -1) {
                  file.$error = name;
                  (file.$errorMessages = (file.$errorMessages || {}))[name] = true;
                  file.$errorParam = val;
                  if (invalidFiles.indexOf(file) === -1) {
                    invalidFiles.push(file);
                  }
                  if (!runAllValidation) {
                    files.splice(i, 1);
                  }
                  valid = false;
                } else {
                  files.splice(i, 1);
                }
              }
            }
          }
        }
        if (valid !== null) {
          ngModel.$ngfValidations.push({name: name, valid: valid});
        }
      }
    }

    validateSync('pattern', null, upload.validatePattern);
    validateSync('minSize', 'size.min', function (file, val) {
      return file.size + 0.1 >= upload.translateScalars(val);
    });
    validateSync('maxSize', 'size.max', function (file, val) {
      return file.size - 0.1 <= upload.translateScalars(val);
    });
    var totalSize = 0;
    validateSync('maxTotalSize', null, function (file, val) {
      totalSize += file.size;
      if (totalSize > upload.translateScalars(val)) {
        files.splice(0, files.length);
        return false;
      }
      return true;
    });

    validateSync('validateFn', null, function (file, r) {
      return r === true || r === null || r === '';
    });

    if (!files.length) {
      return upload.emptyPromise({'validFiles': [], 'invalidFiles': invalidFiles});
    }

    function validateAsync(name, validationName, type, asyncFn, fn) {
      function resolveResult(defer, file, val) {
        function resolveInternal(fn) {
          if (fn()) {
            if (ignoredErrors.indexOf(name) === -1) {
              file.$error = name;
              (file.$errorMessages = (file.$errorMessages || {}))[name] = true;
              file.$errorParam = val;
              if (invalidFiles.indexOf(file) === -1) {
                invalidFiles.push(file);
              }
              if (!runAllValidation) {
                var i = files.indexOf(file);
                if (i > -1) files.splice(i, 1);
              }
              defer.resolve(false);
            } else {
              var j = files.indexOf(file);
              if (j > -1) files.splice(j, 1);
              defer.resolve(true);
            }
          } else {
            defer.resolve(true);
          }
        }

        if (val != null) {
          asyncFn(file, val).then(function (d) {
            resolveInternal(function () {
              return !fn(d, val);
            });
          }, function () {
            resolveInternal(function () {
              return attrGetter('ngfValidateForce', {$file: file});
            });
          });
        } else {
          defer.resolve(true);
        }
      }

      var promises = [upload.emptyPromise(true)];
      if (files) {
        files = files.length === undefined ? [files] : files;
        angular.forEach(files, function (file) {
          var defer = $q.defer();
          promises.push(defer.promise);
          if (type && (file.type == null || file.type.search(type) !== 0)) {
            defer.resolve(true);
            return;
          }
          if (name === 'dimensions' && upload.attrGetter('ngfDimensions', attr) != null) {
            upload.imageDimensions(file).then(function (d) {
              resolveResult(defer, file,
                attrGetter('ngfDimensions', {$file: file, $width: d.width, $height: d.height}));
            }, function () {
              defer.resolve(false);
            });
          } else if (name === 'duration' && upload.attrGetter('ngfDuration', attr) != null) {
            upload.mediaDuration(file).then(function (d) {
              resolveResult(defer, file,
                attrGetter('ngfDuration', {$file: file, $duration: d}));
            }, function () {
              defer.resolve(false);
            });
          } else {
            resolveResult(defer, file,
              upload.getValidationAttr(attr, scope, name, validationName, file));
          }
        });
      }
      var deffer = $q.defer();
      $q.all(promises).then(function (values) {
        var isValid = true;
        for (var i = 0; i < values.length; i++) {
          if (!values[i]) {
            isValid = false;
            break;
          }
        }
        ngModel.$ngfValidations.push({name: name, valid: isValid});
        deffer.resolve(isValid);
      });
      return deffer.promise;
    }

    var deffer = $q.defer();
    var promises = [];

    promises.push(validateAsync('maxHeight', 'height.max', /image/,
      this.imageDimensions, function (d, val) {
        return d.height <= val;
      }));
    promises.push(validateAsync('minHeight', 'height.min', /image/,
      this.imageDimensions, function (d, val) {
        return d.height >= val;
      }));
    promises.push(validateAsync('maxWidth', 'width.max', /image/,
      this.imageDimensions, function (d, val) {
        return d.width <= val;
      }));
    promises.push(validateAsync('minWidth', 'width.min', /image/,
      this.imageDimensions, function (d, val) {
        return d.width >= val;
      }));
    promises.push(validateAsync('dimensions', null, /image/,
      function (file, val) {
        return upload.emptyPromise(val);
      }, function (r) {
        return r;
      }));
    promises.push(validateAsync('ratio', null, /image/,
      this.imageDimensions, function (d, val) {
        var split = val.toString().split(','), valid = false;
        for (var i = 0; i < split.length; i++) {
          if (Math.abs((d.width / d.height) - upload.ratioToFloat(split[i])) < 0.01) {
            valid = true;
          }
        }
        return valid;
      }));
    promises.push(validateAsync('maxRatio', 'ratio.max', /image/,
      this.imageDimensions, function (d, val) {
        return (d.width / d.height) - upload.ratioToFloat(val) < 0.0001;
      }));
    promises.push(validateAsync('minRatio', 'ratio.min', /image/,
      this.imageDimensions, function (d, val) {
        return (d.width / d.height) - upload.ratioToFloat(val) > -0.0001;
      }));
    promises.push(validateAsync('maxDuration', 'duration.max', /audio|video/,
      this.mediaDuration, function (d, val) {
        return d <= upload.translateScalars(val);
      }));
    promises.push(validateAsync('minDuration', 'duration.min', /audio|video/,
      this.mediaDuration, function (d, val) {
        return d >= upload.translateScalars(val);
      }));
    promises.push(validateAsync('duration', null, /audio|video/,
      function (file, val) {
        return upload.emptyPromise(val);
      }, function (r) {
        return r;
      }));

    promises.push(validateAsync('validateAsyncFn', null, null,
      function (file, val) {
        return val;
      }, function (r) {
        return r === true || r === null || r === '';
      }));

    $q.all(promises).then(function () {

      if (runAllValidation) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (file.$error) {
            files.splice(i--, 1);
          }
        }
      }

      runAllValidation = false;
      validateSync('maxFiles', null, function (file, val, i) {
        return prevLength + i < val;
      });

      deffer.resolve({'validFiles': files, 'invalidFiles': invalidFiles});
    });
    return deffer.promise;
  };

  upload.imageDimensions = function (file) {
    if (file.$ngfWidth && file.$ngfHeight) {
      var d = $q.defer();
      $timeout(function () {
        d.resolve({width: file.$ngfWidth, height: file.$ngfHeight});
      });
      return d.promise;
    }
    if (file.$ngfDimensionPromise) return file.$ngfDimensionPromise;

    var deferred = $q.defer();
    $timeout(function () {
      if (file.type.indexOf('image') !== 0) {
        deferred.reject('not image');
        return;
      }
      upload.dataUrl(file).then(function (dataUrl) {
        var img = angular.element('<img>').attr('src', dataUrl)
          .css('visibility', 'hidden').css('position', 'fixed')
          .css('max-width', 'none !important').css('max-height', 'none !important');

        function success() {
          var width = img[0].naturalWidth || img[0].clientWidth;
          var height = img[0].naturalHeight || img[0].clientHeight;
          img.remove();
          file.$ngfWidth = width;
          file.$ngfHeight = height;
          deferred.resolve({width: width, height: height});
        }

        function error() {
          img.remove();
          deferred.reject('load error');
        }

        img.on('load', success);
        img.on('error', error);

        var secondsCounter = 0;
        function checkLoadErrorInCaseOfNoCallback() {
          $timeout(function () {
            if (img[0].parentNode) {
              if (img[0].clientWidth) {
                success();
              } else if (secondsCounter++ > 10) {
                error();
              } else {
                checkLoadErrorInCaseOfNoCallback();
              }
            }
          }, 1000);
        }

        checkLoadErrorInCaseOfNoCallback();

        angular.element(document.getElementsByTagName('body')[0]).append(img);
      }, function () {
        deferred.reject('load error');
      });
    });

    file.$ngfDimensionPromise = deferred.promise;
    file.$ngfDimensionPromise['finally'](function () {
      delete file.$ngfDimensionPromise;
    });
    return file.$ngfDimensionPromise;
  };

  upload.mediaDuration = function (file) {
    if (file.$ngfDuration) {
      var d = $q.defer();
      $timeout(function () {
        d.resolve(file.$ngfDuration);
      });
      return d.promise;
    }
    if (file.$ngfDurationPromise) return file.$ngfDurationPromise;

    var deferred = $q.defer();
    $timeout(function () {
      if (file.type.indexOf('audio') !== 0 && file.type.indexOf('video') !== 0) {
        deferred.reject('not media');
        return;
      }
      upload.dataUrl(file).then(function (dataUrl) {
        var el = angular.element(file.type.indexOf('audio') === 0 ? '<audio>' : '<video>')
          .attr('src', dataUrl).css('visibility', 'none').css('position', 'fixed');

        function success() {
          var duration = el[0].duration;
          file.$ngfDuration = duration;
          el.remove();
          deferred.resolve(duration);
        }

        function error() {
          el.remove();
          deferred.reject('load error');
        }

        el.on('loadedmetadata', success);
        el.on('error', error);
        var count = 0;

        function checkLoadError() {
          $timeout(function () {
            if (el[0].parentNode) {
              if (el[0].duration) {
                success();
              } else if (count > 10) {
                error();
              } else {
                checkLoadError();
              }
            }
          }, 1000);
        }

        checkLoadError();

        angular.element(document.body).append(el);
      }, function () {
        deferred.reject('load error');
      });
    });

    file.$ngfDurationPromise = deferred.promise;
    file.$ngfDurationPromise['finally'](function () {
      delete file.$ngfDurationPromise;
    });
    return file.$ngfDurationPromise;
  };
  return upload;
}
]);

ngFileUpload.service('UploadResize', ['UploadValidate', '$q', function (UploadValidate, $q) {
  var upload = UploadValidate;

  /**
   * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
   * images to fit into a certain area.
   * Source:  http://stackoverflow.com/a/14731922
   *
   * @param {Number} srcWidth Source area width
   * @param {Number} srcHeight Source area height
   * @param {Number} maxWidth Nestable area maximum available width
   * @param {Number} maxHeight Nestable area maximum available height
   * @return {Object} { width, height }
   */
  var calculateAspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight, centerCrop) {
    var ratio = centerCrop ? Math.max(maxWidth / srcWidth, maxHeight / srcHeight) :
      Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio, height: srcHeight * ratio,
      marginX: srcWidth * ratio - maxWidth, marginY: srcHeight * ratio - maxHeight
    };
  };

  // Extracted from https://github.com/romelgomez/angular-firebase-image-upload/blob/master/app/scripts/fileUpload.js#L89
  var resize = function (imagen, width, height, quality, type, ratio, centerCrop, resizeIf) {
    var deferred = $q.defer();
    var canvasElement = document.createElement('canvas');
    var imageElement = document.createElement('img');
    imageElement.setAttribute('style', 'visibility:hidden;position:fixed;z-index:-100000');
    document.body.appendChild(imageElement);

    imageElement.onload = function () {
      var imgWidth = imageElement.width, imgHeight = imageElement.height;
      imageElement.parentNode.removeChild(imageElement);
      if (resizeIf != null && resizeIf(imgWidth, imgHeight) === false) {
        deferred.reject('resizeIf');
        return;
      }
      try {
        if (ratio) {
          var ratioFloat = upload.ratioToFloat(ratio);
          var imgRatio = imgWidth / imgHeight;
          if (imgRatio < ratioFloat) {
            width = imgWidth;
            height = width / ratioFloat;
          } else {
            height = imgHeight;
            width = height * ratioFloat;
          }
        }
        if (!width) {
          width = imgWidth;
        }
        if (!height) {
          height = imgHeight;
        }
        var dimensions = calculateAspectRatioFit(imgWidth, imgHeight, width, height, centerCrop);
        canvasElement.width = Math.min(dimensions.width, width);
        canvasElement.height = Math.min(dimensions.height, height);
        var context = canvasElement.getContext('2d');
        context.drawImage(imageElement,
          Math.min(0, -dimensions.marginX / 2), Math.min(0, -dimensions.marginY / 2),
          dimensions.width, dimensions.height);
        deferred.resolve(canvasElement.toDataURL(type || 'image/WebP', quality || 0.934));
      } catch (e) {
        deferred.reject(e);
      }
    };
    imageElement.onerror = function () {
      imageElement.parentNode.removeChild(imageElement);
      deferred.reject();
    };
    imageElement.src = imagen;
    return deferred.promise;
  };

  upload.dataUrltoBlob = function (dataurl, name, origSize) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new window.Blob([u8arr], {type: mime});
    blob.name = name;
    blob.$ngfOrigSize = origSize;
    return blob;
  };

  upload.isResizeSupported = function () {
    var elem = document.createElement('canvas');
    return window.atob && elem.getContext && elem.getContext('2d') && window.Blob;
  };

  if (upload.isResizeSupported()) {
    // add name getter to the blob constructor prototype
    Object.defineProperty(window.Blob.prototype, 'name', {
      get: function () {
        return this.$ngfName;
      },
      set: function (v) {
        this.$ngfName = v;
      },
      configurable: true
    });
  }

  upload.resize = function (file, options) {
    if (file.type.indexOf('image') !== 0) return upload.emptyPromise(file);

    var deferred = $q.defer();
    upload.dataUrl(file, true).then(function (url) {
      resize(url, options.width, options.height, options.quality, options.type || file.type,
        options.ratio, options.centerCrop, options.resizeIf)
        .then(function (dataUrl) {
          if (file.type === 'image/jpeg' && options.restoreExif !== false) {
            try {
              dataUrl = upload.restoreExif(url, dataUrl);
            } catch (e) {
              setTimeout(function () {throw e;}, 1);
            }
          }
          try {
            var blob = upload.dataUrltoBlob(dataUrl, file.name, file.size);
            deferred.resolve(blob);
          } catch (e) {
            deferred.reject(e);
          }
        }, function (r) {
          if (r === 'resizeIf') {
            deferred.resolve(file);
          }
          deferred.reject(r);
        });
    }, function (e) {
      deferred.reject(e);
    });
    return deferred.promise;
  };

  return upload;
}]);

(function () {
  ngFileUpload.directive('ngfDrop', ['$parse', '$timeout', '$window', 'Upload', '$http', '$q',
    function ($parse, $timeout, $window, Upload, $http, $q) {
      return {
        restrict: 'AEC',
        require: '?ngModel',
        link: function (scope, elem, attr, ngModel) {
          linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $window, Upload, $http, $q);
        }
      };
    }]);

  ngFileUpload.directive('ngfNoFileDrop', function () {
    return function (scope, elem) {
      if (dropAvailable()) elem.css('display', 'none');
    };
  });

  ngFileUpload.directive('ngfDropAvailable', ['$parse', '$timeout', 'Upload', function ($parse, $timeout, Upload) {
    return function (scope, elem, attr) {
      if (dropAvailable()) {
        var model = $parse(Upload.attrGetter('ngfDropAvailable', attr));
        $timeout(function () {
          model(scope);
          if (model.assign) {
            model.assign(scope, true);
          }
        });
      }
    };
  }]);

  function linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $window, upload, $http, $q) {
    var available = dropAvailable();

    var attrGetter = function (name, scope, params) {
      return upload.attrGetter(name, attr, scope, params);
    };

    if (attrGetter('dropAvailable')) {
      $timeout(function () {
        if (scope[attrGetter('dropAvailable')]) {
          scope[attrGetter('dropAvailable')].value = available;
        } else {
          scope[attrGetter('dropAvailable')] = available;
        }
      });
    }
    if (!available) {
      if (attrGetter('ngfHideOnDropNotAvailable', scope) === true) {
        elem.css('display', 'none');
      }
      return;
    }

    function isDisabled() {
      return elem.attr('disabled') || attrGetter('ngfDropDisabled', scope);
    }

    if (attrGetter('ngfSelect') == null) {
      upload.registerModelChangeValidator(ngModel, attr, scope);
    }

    var leaveTimeout = null;
    var stopPropagation = $parse(attrGetter('ngfStopPropagation'));
    var dragOverDelay = 1;
    var actualDragOverClass;

    elem[0].addEventListener('dragover', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      // handling dragover events from the Chrome download bar
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        var b = evt.dataTransfer.effectAllowed;
        evt.dataTransfer.dropEffect = ('move' === b || 'linkMove' === b) ? 'move' : 'copy';
      }
      $timeout.cancel(leaveTimeout);
      if (!actualDragOverClass) {
        actualDragOverClass = 'C';
        calculateDragOverClass(scope, attr, evt, function (clazz) {
          actualDragOverClass = clazz;
          elem.addClass(actualDragOverClass);
          attrGetter('ngfDrag', scope, {$isDragging: true, $class: actualDragOverClass, $event: evt});
        });
      }
    }, false);
    elem[0].addEventListener('dragenter', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
    }, false);
    elem[0].addEventListener('dragleave', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      leaveTimeout = $timeout(function () {
        if (actualDragOverClass) elem.removeClass(actualDragOverClass);
        actualDragOverClass = null;
        attrGetter('ngfDrag', scope, {$isDragging: false, $event: evt});
      }, dragOverDelay || 100);
    }, false);
    elem[0].addEventListener('drop', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      if (actualDragOverClass) elem.removeClass(actualDragOverClass);
      actualDragOverClass = null;
      extractFilesAndUpdateModel(evt.dataTransfer, evt, 'dropUrl');
    }, false);
    elem[0].addEventListener('paste', function (evt) {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 &&
        attrGetter('ngfEnableFirefoxPaste', scope)) {
        evt.preventDefault();
      }
      if (isDisabled() || !upload.shouldUpdateOn('paste', attr, scope)) return;
      extractFilesAndUpdateModel(evt.clipboardData || evt.originalEvent.clipboardData, evt, 'pasteUrl');
    }, false);

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 &&
      attrGetter('ngfEnableFirefoxPaste', scope)) {
      elem.attr('contenteditable', true);
      elem.on('keypress', function (e) {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
        }
      });
    }

    function extractFilesAndUpdateModel(source, evt, updateOnType) {
      if (!source) return;
      // html needs to be calculated on the same process otherwise the data will be wiped
      // after promise resolve or setTimeout.
      var html;
      try {
        html = source && source.getData && source.getData('text/html');
      } catch (e) {/* Fix IE11 that throw error calling getData */
      }
      extractFiles(source.items, source.files, attrGetter('ngfAllowDir', scope) !== false,
        attrGetter('multiple') || attrGetter('ngfMultiple', scope)).then(function (files) {
        if (files.length) {
          updateModel(files, evt);
        } else {
          extractFilesFromHtml(updateOnType, html).then(function (files) {
            updateModel(files, evt);
          });
        }
      });
    }

    function updateModel(files, evt) {
      upload.updateModel(ngModel, attr, scope, attrGetter('ngfChange') || attrGetter('ngfDrop'), files, evt);
    }

    function extractFilesFromHtml(updateOn, html) {
      if (!upload.shouldUpdateOn(updateOn, attr, scope) || typeof html !== 'string') return upload.rejectPromise([]);
      var urls = [];
      html.replace(/<(img src|img [^>]* src) *=\"([^\"]*)\"/gi, function (m, n, src) {
        urls.push(src);
      });
      var promises = [], files = [];
      if (urls.length) {
        angular.forEach(urls, function (url) {
          promises.push(upload.urlToBlob(url).then(function (blob) {
            files.push(blob);
          }));
        });
        var defer = $q.defer();
        $q.all(promises).then(function () {
          defer.resolve(files);
        }, function (e) {
          defer.reject(e);
        });
        return defer.promise;
      }
      return upload.emptyPromise();
    }

    function calculateDragOverClass(scope, attr, evt, callback) {
      var obj = attrGetter('ngfDragOverClass', scope, {$event: evt}), dClass = 'dragover';
      if (angular.isString(obj)) {
        dClass = obj;
      } else if (obj) {
        if (obj.delay) dragOverDelay = obj.delay;
        if (obj.accept || obj.reject) {
          var items = evt.dataTransfer.items;
          if (items == null || !items.length) {
            dClass = obj.accept;
          } else {
            var pattern = obj.pattern || attrGetter('ngfPattern', scope, {$event: evt});
            var len = items.length;
            while (len--) {
              if (!upload.validatePattern(items[len], pattern)) {
                dClass = obj.reject;
                break;
              } else {
                dClass = obj.accept;
              }
            }
          }
        }
      }
      callback(dClass);
    }

    function extractFiles(items, fileList, allowDir, multiple) {
      var maxFiles = upload.getValidationAttr(attr, scope, 'maxFiles');
      if (maxFiles == null) {
        maxFiles = Number.MAX_VALUE;
      }
      var maxTotalSize = upload.getValidationAttr(attr, scope, 'maxTotalSize');
      if (maxTotalSize == null) {
        maxTotalSize = Number.MAX_VALUE;
      }
      var includeDir = attrGetter('ngfIncludeDir', scope);
      var files = [], totalSize = 0;

      function traverseFileTree(entry, path) {
        var defer = $q.defer();
        if (entry != null) {
          if (entry.isDirectory) {
            var promises = [upload.emptyPromise()];
            if (includeDir) {
              var file = {type: 'directory'};
              file.name = file.path = (path || '') + entry.name;
              files.push(file);
            }
            var dirReader = entry.createReader();
            var entries = [];
            var readEntries = function () {
              dirReader.readEntries(function (results) {
                try {
                  if (!results.length) {
                    angular.forEach(entries.slice(0), function (e) {
                      if (files.length <= maxFiles && totalSize <= maxTotalSize) {
                        promises.push(traverseFileTree(e, (path ? path : '') + entry.name + '/'));
                      }
                    });
                    $q.all(promises).then(function () {
                      defer.resolve();
                    }, function (e) {
                      defer.reject(e);
                    });
                  } else {
                    entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                    readEntries();
                  }
                } catch (e) {
                  defer.reject(e);
                }
              }, function (e) {
                defer.reject(e);
              });
            };
            readEntries();
          } else {
            entry.file(function (file) {
              try {
                file.path = (path ? path : '') + file.name;
                if (includeDir) {
                  file = upload.rename(file, file.path);
                }
                files.push(file);
                totalSize += file.size;
                defer.resolve();
              } catch (e) {
                defer.reject(e);
              }
            }, function (e) {
              defer.reject(e);
            });
          }
        }
        return defer.promise;
      }

      var promises = [upload.emptyPromise()];

      if (items && items.length > 0 && $window.location.protocol !== 'file:') {
        for (var i = 0; i < items.length; i++) {
          if (items[i].webkitGetAsEntry && items[i].webkitGetAsEntry() && items[i].webkitGetAsEntry().isDirectory) {
            var entry = items[i].webkitGetAsEntry();
            if (entry.isDirectory && !allowDir) {
              continue;
            }
            if (entry != null) {
              promises.push(traverseFileTree(entry));
            }
          } else {
            var f = items[i].getAsFile();
            if (f != null) {
              files.push(f);
              totalSize += f.size;
            }
          }
          if (files.length > maxFiles || totalSize > maxTotalSize ||
            (!multiple && files.length > 0)) break;
        }
      } else {
        if (fileList != null) {
          for (var j = 0; j < fileList.length; j++) {
            var file = fileList.item(j);
            if (file.type || file.size > 0) {
              files.push(file);
              totalSize += file.size;
            }
            if (files.length > maxFiles || totalSize > maxTotalSize ||
              (!multiple && files.length > 0)) break;
          }
        }
      }

      var defer = $q.defer();
      $q.all(promises).then(function () {
        if (!multiple && !includeDir && files.length) {
          var i = 0;
          while (files[i] && files[i].type === 'directory') i++;
          defer.resolve([files[i]]);
        } else {
          defer.resolve(files);
        }
      }, function (e) {
        defer.reject(e);
      });

      return defer.promise;
    }
  }

  function dropAvailable() {
    var div = document.createElement('div');
    return ('draggable' in div) && ('ondrop' in div) && !/Edge\/12./i.test(navigator.userAgent);
  }

})();

// customized version of https://github.com/exif-js/exif-js
ngFileUpload.service('UploadExif', ['UploadResize', '$q', function (UploadResize, $q) {
  var upload = UploadResize;

  upload.isExifSupported = function () {
    return window.FileReader && new FileReader().readAsArrayBuffer && upload.isResizeSupported();
  };

  function applyTransform(ctx, orientation, width, height) {
    switch (orientation) {
      case 2:
        return ctx.transform(-1, 0, 0, 1, width, 0);
      case 3:
        return ctx.transform(-1, 0, 0, -1, width, height);
      case 4:
        return ctx.transform(1, 0, 0, -1, 0, height);
      case 5:
        return ctx.transform(0, 1, 1, 0, 0, 0);
      case 6:
        return ctx.transform(0, 1, -1, 0, height, 0);
      case 7:
        return ctx.transform(0, -1, -1, 0, height, width);
      case 8:
        return ctx.transform(0, -1, 1, 0, 0, width);
    }
  }

  upload.readOrientation = function (file) {
    var defer = $q.defer();
    var reader = new FileReader();
    var slicedFile = file.slice ? file.slice(0, 64 * 1024) : file;
    reader.readAsArrayBuffer(slicedFile);
    reader.onerror = function (e) {
      return defer.reject(e);
    };
    reader.onload = function (e) {
      var result = {orientation: 1};
      var view = new DataView(this.result);
      if (view.getUint16(0, false) !== 0xFFD8) return defer.resolve(result);

      var length = view.byteLength,
        offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) return defer.resolve(result);

          var little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              var orientation = view.getUint16(offset + (i * 12) + 8, little);
              if (orientation >= 2 && orientation <= 8) {
                view.setUint16(offset + (i * 12) + 8, 1, little);
                result.fixedArrayBuffer = e.target.result;
              }
              result.orientation = orientation;
              return defer.resolve(result);
            }
        } else if ((marker & 0xFF00) !== 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return defer.resolve(result);
    };
    return defer.promise;
  };

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  upload.applyExifRotation = function (file) {
    if (file.type.indexOf('image/jpeg') !== 0) {
      return upload.emptyPromise(file);
    }

    var deferred = $q.defer();
    upload.readOrientation(file).then(function (result) {
      if (result.orientation < 2 || result.orientation > 8) {
        return deferred.resolve(file);
      }
      upload.dataUrl(file, true).then(function (url) {
        var canvas = document.createElement('canvas');
        var img = document.createElement('img');

        img.onload = function () {
          try {
            canvas.width = result.orientation > 4 ? img.height : img.width;
            canvas.height = result.orientation > 4 ? img.width : img.height;
            var ctx = canvas.getContext('2d');
            applyTransform(ctx, result.orientation, img.width, img.height);
            ctx.drawImage(img, 0, 0);
            var dataUrl = canvas.toDataURL(file.type || 'image/WebP', 0.934);
            dataUrl = upload.restoreExif(arrayBufferToBase64(result.fixedArrayBuffer), dataUrl);
            var blob = upload.dataUrltoBlob(dataUrl, file.name);
            deferred.resolve(blob);
          } catch (e) {
            return deferred.reject(e);
          }
        };
        img.onerror = function () {
          deferred.reject();
        };
        img.src = url;
      }, function (e) {
        deferred.reject(e);
      });
    }, function (e) {
      deferred.reject(e);
    });
    return deferred.promise;
  };

  upload.restoreExif = function (orig, resized) {
    var ExifRestorer = {};

    ExifRestorer.KEY_STR = 'ABCDEFGHIJKLMNOP' +
      'QRSTUVWXYZabcdef' +
      'ghijklmnopqrstuv' +
      'wxyz0123456789+/' +
      '=';

    ExifRestorer.encode64 = function (input) {
      var output = '',
        chr1, chr2, chr3 = '',
        enc1, enc2, enc3, enc4 = '',
        i = 0;

      do {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          this.KEY_STR.charAt(enc1) +
          this.KEY_STR.charAt(enc2) +
          this.KEY_STR.charAt(enc3) +
          this.KEY_STR.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < input.length);

      return output;
    };

    ExifRestorer.restore = function (origFileBase64, resizedFileBase64) {
      if (origFileBase64.match('data:image/jpeg;base64,')) {
        origFileBase64 = origFileBase64.replace('data:image/jpeg;base64,', '');
      }

      var rawImage = this.decode64(origFileBase64);
      var segments = this.slice2Segments(rawImage);

      var image = this.exifManipulation(resizedFileBase64, segments);

      return 'data:image/jpeg;base64,' + this.encode64(image);
    };


    ExifRestorer.exifManipulation = function (resizedFileBase64, segments) {
      var exifArray = this.getExifArray(segments),
        newImageArray = this.insertExif(resizedFileBase64, exifArray);
      return new Uint8Array(newImageArray);
    };


    ExifRestorer.getExifArray = function (segments) {
      var seg;
      for (var x = 0; x < segments.length; x++) {
        seg = segments[x];
        if (seg[0] === 255 & seg[1] === 225) //(ff e1)
        {
          return seg;
        }
      }
      return [];
    };


    ExifRestorer.insertExif = function (resizedFileBase64, exifArray) {
      var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', ''),
        buf = this.decode64(imageData),
        separatePoint = buf.indexOf(255, 3),
        mae = buf.slice(0, separatePoint),
        ato = buf.slice(separatePoint),
        array = mae;

      array = array.concat(exifArray);
      array = array.concat(ato);
      return array;
    };


    ExifRestorer.slice2Segments = function (rawImageArray) {
      var head = 0,
        segments = [];

      while (1) {
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) {
          break;
        }
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) {
          head += 2;
        }
        else {
          var length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3],
            endPoint = head + length + 2,
            seg = rawImageArray.slice(head, endPoint);
          segments.push(seg);
          head = endPoint;
        }
        if (head > rawImageArray.length) {
          break;
        }
      }

      return segments;
    };


    ExifRestorer.decode64 = function (input) {
      var chr1, chr2, chr3 = '',
        enc1, enc2, enc3, enc4 = '',
        i = 0,
        buf = [];

      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        console.log('There were invalid base64 characters in the input text.\n' +
          'Valid base64 characters are A-Z, a-z, 0-9, ' + ', ' / ',and "="\n' +
          'Expect errors in decoding.');
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      do {
        enc1 = this.KEY_STR.indexOf(input.charAt(i++));
        enc2 = this.KEY_STR.indexOf(input.charAt(i++));
        enc3 = this.KEY_STR.indexOf(input.charAt(i++));
        enc4 = this.KEY_STR.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        buf.push(chr1);

        if (enc3 !== 64) {
          buf.push(chr2);
        }
        if (enc4 !== 64) {
          buf.push(chr3);
        }

        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';

      } while (i < input.length);

      return buf;
    };

    return ExifRestorer.restore(orig, resized);  //<= EXIF
  };

  return upload;
}]);



/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = 'ngFileUpload';

/***/ })
],[121]);