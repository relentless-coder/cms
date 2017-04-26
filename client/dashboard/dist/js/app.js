webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * State-based routing for AngularJS
 * @version v1.0.0-alpha.3
 * @link http://angular-ui.github.com/ui-router
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angular-ui-router", [], factory);
	else if(typeof exports === 'object')
		exports["angular-ui-router"] = factory();
	else
		root["angular-ui-router"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Main entry point for angular 1.x build
	 * @module ng1
	 */
	/** for typedoc */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(53));
	__export(__webpack_require__(54));
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "ui.router";


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @module common */ /** */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(20));
	__export(__webpack_require__(44));
	__export(__webpack_require__(40));
	__export(__webpack_require__(17));
	__export(__webpack_require__(13));
	__export(__webpack_require__(45));
	__export(__webpack_require__(49));
	var router_1 = __webpack_require__(51);
	exports.UIRouter = router_1.UIRouter;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module common */ /** for typedoc */
	__export(__webpack_require__(3));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	__export(__webpack_require__(5));
	__export(__webpack_require__(4));
	__export(__webpack_require__(8));
	__export(__webpack_require__(9));
	__export(__webpack_require__(12));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Random utility functions used in the UI-Router code
	 *
	 * @preferred @module common
	 */ /** for typedoc */
	"use strict";
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var angular = window.angular || {};
	exports.fromJson = angular.fromJson || JSON.parse.bind(JSON);
	exports.toJson = angular.toJson || JSON.stringify.bind(JSON);
	exports.copy = angular.copy || _copy;
	exports.forEach = angular.forEach || _forEach;
	exports.extend = angular.extend || _extend;
	exports.equals = angular.equals || _equals;
	exports.identity = function (x) { return x; };
	exports.noop = function () { return undefined; };
	exports.abstractKey = 'abstract';
	/**
	 * Binds and copies functions onto an object
	 *
	 * Takes functions from the 'from' object, binds those functions to the _this object, and puts the bound functions
	 * on the 'to' object.
	 *
	 * This example creates an new class instance whose functions are prebound to the new'd object.
	 * @example
	 * ```
	 *
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
	 * This example creates a bound version of a service function, and copies it to another object
	 * @example
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
	 * @param from The object which contains the functions to be bound
	 * @param to The object which will receive the bound functions
	 * @param bindTo The object which the functions will be bound to
	 * @param fnNames The function names which will be bound (Defaults to all the functions found on the 'from' object)
	 */
	function bindFunctions(from, to, bindTo, fnNames) {
	    if (fnNames === void 0) { fnNames = Object.keys(from); }
	    return fnNames.filter(function (name) { return typeof from[name] === 'function'; })
	        .forEach(function (name) { return to[name] = from[name].bind(bindTo); });
	}
	exports.bindFunctions = bindFunctions;
	/**
	 * prototypal inheritance helper.
	 * Creates a new object which has `parent` object as its prototype, and then copies the properties from `extra` onto it
	 */
	exports.inherit = function (parent, extra) {
	    return exports.extend(new (exports.extend(function () { }, { prototype: parent }))(), extra);
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
	var inArray = function (array, obj) { return array.indexOf(obj) !== -1; };
	/** Given an array, and an item, if the item is found in the array, it removes it (in-place).  The same array is returned */
	exports.removeFrom = hof_1.curry(function (array, obj) {
	    var idx = array.indexOf(obj);
	    if (idx >= 0)
	        array.splice(idx, 1);
	    return array;
	});
	/**
	 * Applies a set of defaults to an options object.  The options object is filtered
	 * to only those properties of the objects in the defaultsList.
	 * Earlier objects in the defaultsList take precedence when applying defaults.
	 */
	function defaults(opts) {
	    if (opts === void 0) { opts = {}; }
	    var defaultsList = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        defaultsList[_i - 1] = arguments[_i];
	    }
	    var defaults = merge.apply(null, [{}].concat(defaultsList));
	    return exports.extend({}, defaults, pick(opts || {}, Object.keys(defaults)));
	}
	exports.defaults = defaults;
	/**
	 * Merges properties from the list of objects to the destination object.
	 * If a property already exists in the destination object, then it is not overwritten.
	 */
	function merge(dst) {
	    var objs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        objs[_i - 1] = arguments[_i];
	    }
	    exports.forEach(objs, function (obj) {
	        exports.forEach(obj, function (value, key) {
	            if (!dst.hasOwnProperty(key))
	                dst[key] = value;
	        });
	    });
	    return dst;
	}
	exports.merge = merge;
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
	 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
	 *
	 * @param {Object} a The first object.
	 * @param {Object} b The second object.
	 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
	 *                     it defaults to the list of keys in `a`.
	 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
	 */
	function equalForKeys(a, b, keys) {
	    if (keys === void 0) { keys = Object.keys(a); }
	    for (var i = 0; i < keys.length; i++) {
	        var k = keys[i];
	        if (a[k] != b[k])
	            return false; // Not '===', values aren't necessarily normalized
	    }
	    return true;
	}
	exports.equalForKeys = equalForKeys;
	function pickOmitImpl(predicate, obj) {
	    var objCopy = {}, keys = restArgs(arguments, 2);
	    for (var key in obj) {
	        if (predicate(keys, key))
	            objCopy[key] = obj[key];
	    }
	    return objCopy;
	}
	/** Return a copy of the object only containing the whitelisted properties. */
	function pick(obj) { return pickOmitImpl.apply(null, [inArray].concat(restArgs(arguments))); }
	exports.pick = pick;
	/** Return a copy of the object omitting the blacklisted properties. */
	function omit(obj) { return pickOmitImpl.apply(null, [hof_1.not(inArray)].concat(restArgs(arguments))); }
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
	exports.values = function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); };
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
	exports.flattenR = function (memo, elem) { return predicates_1.isArray(elem) ? memo.concat(elem.reduce(exports.flattenR, [])) : pushR(memo, elem); };
	/** Reduce function that pushes an object to an array, then returns the array.  Mostly just for [[flattenR]] */
	function pushR(arr, obj) { arr.push(obj); return arr; }
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
	function assertPredicate(predicate, errMsg) {
	    if (errMsg === void 0) { errMsg = "assert failure"; }
	    return function (obj) {
	        if (!predicate(obj)) {
	            throw new Error(predicates_1.isFunction(errMsg) ? errMsg(obj) : errMsg);
	        }
	        return true;
	    };
	}
	exports.assertPredicate = assertPredicate;
	/**
	 * Like _.pairs: Given an object, returns an array of key/value pairs
	 *
	 * @example
	 * ```
	 *
	 * pairs({ foo: "FOO", bar: "BAR }) // [ [ "foo", "FOO" ], [ "bar": "BAR" ] ]
	 * ```
	 */
	exports.pairs = function (object) { return Object.keys(object).map(function (key) { return [key, object[key]]; }); };
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
	    var arrayArgs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        arrayArgs[_i - 0] = arguments[_i];
	    }
	    if (arrayArgs.length === 0)
	        return [];
	    var length = arrayArgs.reduce(function (min, arr) { return Math.min(arr.length, min); }, 9007199254740991); // aka 2^53 − 1 aka Number.MAX_SAFE_INTEGER
	    return Array.apply(null, Array(length)).map(function (ignored, idx) { return arrayArgs.map(function (arr) { return arr[idx]; }); });
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
	function _forEach(obj, cb, _this) {
	    if (predicates_1.isArray(obj))
	        return obj.forEach(cb, _this);
	    Object.keys(obj).forEach(function (key) { return cb(obj[key], key); });
	}
	function _copyProps(to, from) { Object.keys(from).forEach(function (key) { return to[key] = from[key]; }); return to; }
	function _extend(toObj, rest) {
	    return restArgs(arguments, 1).filter(exports.identity).reduce(_copyProps, toObj);
	}
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
	//
	//const _addToGroup = (result, keyFn) => (item) =>
	//  (result[keyFn(item)] = result[keyFn(item)] || []).push(item) && result;
	//const groupBy = (array, keyFn) => array.reduce((memo, item) => _addToGroup(memo, keyFn), {});
	//
	//


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** Predicates @module common_predicates */ /** */
	var hof_1 = __webpack_require__(5);
	var toStr = Object.prototype.toString;
	var tis = function (t) { return function (x) { return typeof (x) === t; }; };
	exports.isUndefined = tis('undefined');
	exports.isDefined = hof_1.not(exports.isUndefined);
	exports.isNull = function (o) { return o === null; };
	exports.isFunction = tis('function');
	exports.isNumber = tis('number');
	exports.isString = tis('string');
	exports.isObject = function (x) { return x !== null && typeof x === 'object'; };
	exports.isArray = Array.isArray;
	exports.isDate = function (x) { return toStr.call(x) === '[object Date]'; };
	exports.isRegExp = function (x) { return toStr.call(x) === '[object RegExp]'; };
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Higher order functions
	 *
	 * @module common_hof
	 */
	"use strict";
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
	        funcs[_i - 0] = arguments[_i];
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
	exports.prop = function (name) { return function (obj) { return obj && obj[name]; }; };
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
	exports.parse = function (name) { return pipe.apply(null, name.split(".").map(exports.prop)); };
	/**
	 * Given a function that returns a truthy or falsey value, returns a
	 * function that returns the opposite (falsey or truthy) value given the same inputs
	 */
	exports.not = function (fn) { return function () {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    return !fn.apply(null, args);
	}; };
	/**
	 * Given two functions that return truthy or falsey values, returns a function that returns truthy
	 * if both functions return truthy for the given arguments
	 */
	function and(fn1, fn2) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
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
	            args[_i - 0] = arguments[_i];
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
	exports.all = function (fn1) { return function (arr) { return arr.reduce(function (b, x) { return b && !!fn1(x); }, true); }; };
	exports.any = function (fn1) { return function (arr) { return arr.reduce(function (b, x) { return b || !!fn1(x); }, false); }; };
	exports.none = exports.not(exports.any);
	/** Given a class, returns a Predicate function that returns true if the object is of that class */
	exports.is = function (ctor) { return function (obj) { return (obj != null && obj.constructor === ctor || obj instanceof ctor); }; };
	/** Given a value, returns a Predicate function that returns true if another value is === equal to the original value */
	exports.eq = function (val) { return function (other) { return val === other; }; };
	/** Given a value, returns a function which returns the value */
	exports.val = function (v) { return function () { return v; }; };
	function invoke(fnName, args) {
	    return function (obj) { return obj[fnName].apply(obj, args); };
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * This module is a stub for core services such as Dependency Injection or Browser Location.
	 * Core services may be implemented by a specific framework, such as ng1 or ng2, or be pure javascript.
	 *
	 * @module common
	 */
	"use strict";
	/** for typedoc */
	//import {IQService} from "angular";
	//import {IInjectorService} from "angular";
	var notImplemented = function (fnname) { return function () {
	    throw new Error(fnname + "(): No coreservices implementation for UI-Router is loaded. You should include one of: ['angular1.js']");
	}; };
	var services = {
	    $q: undefined,
	    $injector: undefined,
	    location: {},
	    locationConfig: {},
	    template: {}
	};
	exports.services = services;
	["replace", "url", "path", "search", "hash", "onChange"]
	    .forEach(function (key) { return services.location[key] = notImplemented(key); });
	["port", "protocol", "host", "baseHref", "html5Mode", "hashPrefix"]
	    .forEach(function (key) { return services.locationConfig[key] = notImplemented(key); });


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	/** @module state */ /** for typedoc */
	var Glob = (function () {
	    function Glob(text) {
	        this.text = text;
	        this.glob = text.split('.');
	    }
	    Glob.prototype.matches = function (name) {
	        var segments = name.split('.');
	        // match single stars
	        for (var i = 0, l = this.glob.length; i < l; i++) {
	            if (this.glob[i] === '*')
	                segments[i] = '*';
	        }
	        // match greedy starts
	        if (this.glob[0] === '**') {
	            segments = segments.slice(segments.indexOf(this.glob[1]));
	            segments.unshift('**');
	        }
	        // match greedy ends
	        if (this.glob[this.glob.length - 1] === '**') {
	            segments.splice(segments.indexOf(this.glob[this.glob.length - 2]) + 1, Number.MAX_VALUE);
	            segments.push('**');
	        }
	        if (this.glob.length != segments.length)
	            return false;
	        return segments.join('') === this.glob.join('');
	    };
	    Glob.is = function (text) {
	        return text.indexOf('*') > -1;
	    };
	    Glob.fromString = function (text) {
	        if (!this.is(text))
	            return null;
	        return new Glob(text);
	    };
	    return Glob;
	}());
	exports.Glob = Glob;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @module common */ /** for typedoc */
	"use strict";
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @module common_strings */ /** */
	"use strict";
	var predicates_1 = __webpack_require__(4);
	var rejectFactory_1 = __webpack_require__(10);
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var transition_1 = __webpack_require__(11);
	var resolvable_1 = __webpack_require__(32);
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
	exports.kebobString = function (camelCase) { return camelCase.replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); }); };
	function _toJson(obj) {
	    return JSON.stringify(obj);
	}
	function _fromJson(json) {
	    return predicates_1.isString(json) ? JSON.parse(json) : json;
	}
	function promiseToString(p) {
	    if (hof_1.is(rejectFactory_1.TransitionRejection)(p.reason))
	        return p.reason.toString();
	    return "Promise(" + JSON.stringify(p) + ")";
	}
	function functionToString(fn) {
	    var fnStr = fnToString(fn);
	    var namedFunctionMatch = fnStr.match(/^(function [^ ]+\([^)]*\))/);
	    return namedFunctionMatch ? namedFunctionMatch[1] : fnStr;
	}
	exports.functionToString = functionToString;
	function fnToString(fn) {
	    var _fn = predicates_1.isArray(fn) ? fn.slice(-1)[0] : fn;
	    return _fn && _fn.toString() || "undefined";
	}
	exports.fnToString = fnToString;
	var stringifyPattern = hof_1.pattern([
	    [hof_1.not(predicates_1.isDefined), hof_1.val("undefined")],
	    [predicates_1.isNull, hof_1.val("null")],
	    [predicates_1.isPromise, promiseToString],
	    [hof_1.is(transition_1.Transition), hof_1.invoke("toString")],
	    [hof_1.is(resolvable_1.Resolvable), hof_1.invoke("toString")],
	    [predicates_1.isInjectable, functionToString],
	    [hof_1.val(true), common_1.identity]
	]);
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @module transition */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var coreservices_1 = __webpack_require__(6);
	var strings_1 = __webpack_require__(9);
	(function (RejectType) {
	    RejectType[RejectType["SUPERSEDED"] = 2] = "SUPERSEDED";
	    RejectType[RejectType["ABORTED"] = 3] = "ABORTED";
	    RejectType[RejectType["INVALID"] = 4] = "INVALID";
	    RejectType[RejectType["IGNORED"] = 5] = "IGNORED";
	})(exports.RejectType || (exports.RejectType = {}));
	var RejectType = exports.RejectType;
	var TransitionRejection = (function () {
	    function TransitionRejection(type, message, detail) {
	        common_1.extend(this, {
	            type: type,
	            message: message,
	            detail: detail
	        });
	    }
	    TransitionRejection.prototype.toString = function () {
	        var detailString = function (d) { return d && d.toString !== Object.prototype.toString ? d.toString() : strings_1.stringify(d); };
	        var type = this.type, message = this.message, detail = detailString(this.detail);
	        return "TransitionRejection(type: " + type + ", message: " + message + ", detail: " + detail + ")";
	    };
	    return TransitionRejection;
	}());
	exports.TransitionRejection = TransitionRejection;
	var RejectFactory = (function () {
	    function RejectFactory() {
	    }
	    RejectFactory.prototype.superseded = function (detail, options) {
	        var message = "The transition has been superseded by a different transition (see detail).";
	        var reason = new TransitionRejection(RejectType.SUPERSEDED, message, detail);
	        if (options && options.redirected) {
	            reason.redirected = true;
	        }
	        return common_1.extend(coreservices_1.services.$q.reject(reason), { reason: reason });
	    };
	    RejectFactory.prototype.redirected = function (detail) {
	        return this.superseded(detail, { redirected: true });
	    };
	    RejectFactory.prototype.invalid = function (detail) {
	        var message = "This transition is invalid (see detail)";
	        var reason = new TransitionRejection(RejectType.INVALID, message, detail);
	        return common_1.extend(coreservices_1.services.$q.reject(reason), { reason: reason });
	    };
	    RejectFactory.prototype.ignored = function (detail) {
	        var message = "The transition was ignored.";
	        var reason = new TransitionRejection(RejectType.IGNORED, message, detail);
	        return common_1.extend(coreservices_1.services.$q.reject(reason), { reason: reason });
	    };
	    RejectFactory.prototype.aborted = function (detail) {
	        // TODO think about how to encapsulate an Error() object
	        var message = "The transition has been aborted.";
	        var reason = new TransitionRejection(RejectType.ABORTED, message, detail);
	        return common_1.extend(coreservices_1.services.$q.reject(reason), { reason: reason });
	    };
	    return RejectFactory;
	}());
	exports.RejectFactory = RejectFactory;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module transition */ /** for typedoc */
	var trace_1 = __webpack_require__(12);
	var coreservices_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var module_1 = __webpack_require__(13);
	var node_1 = __webpack_require__(39);
	var pathFactory_1 = __webpack_require__(38);
	var module_2 = __webpack_require__(17);
	var module_3 = __webpack_require__(20);
	var module_4 = __webpack_require__(40);
	var transitionCount = 0, REJECT = new module_1.RejectFactory();
	var stateSelf = hof_1.prop("self");
	/**
	 * The representation of a transition between two states.
	 *
	 * Contains all contextual information about the to/from states, parameters, resolves, as well as the
	 * list of states being entered and exited as a result of this transition.
	 */
	var Transition = (function () {
	    /**
	     * Creates a new Transition object.
	     *
	     * If the target state is not valid, an error is thrown.
	     *
	     * @param fromPath The path of [[Node]]s from which the transition is leaving.  The last node in the `fromPath`
	     *        encapsulates the "from state".
	     * @param targetState The target state and parameters being transitioned to (also, the transition options)
	     * @param _transitionService The Transition Service instance
	     */
	    function Transition(fromPath, targetState, _transitionService) {
	        var _this = this;
	        this._transitionService = _transitionService;
	        this._deferred = coreservices_1.services.$q.defer();
	        /**
	         * This promise is resolved or rejected based on the outcome of the Transition.
	         *
	         * When the transition is successful, the promise is resolved
	         * When the transition is unsuccessful, the promise is rejected with the [[TransitionRejection]] or javascript error
	         */
	        this.promise = this._deferred.promise;
	        this.treeChanges = function () { return _this._treeChanges; };
	        this.isActive = function () { return _this === _this._options.current(); };
	        if (!targetState.valid()) {
	            throw new Error(targetState.error());
	        }
	        // Makes the Transition instance a hook registry (onStart, etc)
	        module_1.HookRegistry.mixin(new module_1.HookRegistry(), this);
	        // current() is assumed to come from targetState.options, but provide a naive implementation otherwise.
	        this._options = common_1.extend({ current: hof_1.val(this) }, targetState.options());
	        this.$id = transitionCount++;
	        var toPath = pathFactory_1.PathFactory.buildToPath(fromPath, targetState);
	        toPath = pathFactory_1.PathFactory.applyViewConfigs(_transitionService.$view, toPath);
	        this._treeChanges = pathFactory_1.PathFactory.treeChanges(fromPath, toPath, this._options.reloadState);
	        pathFactory_1.PathFactory.bindTransitionResolve(this._treeChanges, this);
	    }
	    Transition.prototype.$from = function () {
	        return common_1.tail(this._treeChanges.from).state;
	    };
	    Transition.prototype.$to = function () {
	        return common_1.tail(this._treeChanges.to).state;
	    };
	    /**
	     * Returns the "from state"
	     *
	     * @returns The state object for the Transition's "from state".
	     */
	    Transition.prototype.from = function () {
	        return this.$from().self;
	    };
	    /**
	     * Returns the "to state"
	     *
	     * @returns The state object for the Transition's target state ("to state").
	     */
	    Transition.prototype.to = function () {
	        return this.$to().self;
	    };
	    /**
	     * Determines whether two transitions are equivalent.
	     */
	    Transition.prototype.is = function (compare) {
	        if (compare instanceof Transition) {
	            // TODO: Also compare parameters
	            return this.is({ to: compare.$to().name, from: compare.$from().name });
	        }
	        return !((compare.to && !module_1.matchState(this.$to(), compare.to)) ||
	            (compare.from && !module_1.matchState(this.$from(), compare.from)));
	    };
	    /**
	     * Gets transition parameter values
	     *
	     * @param pathname Pick which treeChanges path to get parameters for:
	     *   (`'to'`, `'from'`, `'entering'`, `'exiting'`, `'retained'`)
	     * @returns transition parameter values for the desired path.
	     */
	    Transition.prototype.params = function (pathname) {
	        if (pathname === void 0) { pathname = "to"; }
	        return this._treeChanges[pathname].map(hof_1.prop("paramValues")).reduce(common_1.mergeR, {});
	    };
	    /**
	     * Get resolved data
	     *
	     * @returns an object (key/value pairs) where keys are resolve names and values are any settled resolve data,
	     *    or `undefined` for pending resolve data
	     */
	    Transition.prototype.resolves = function () {
	        return common_1.map(common_1.tail(this._treeChanges.to).resolveContext.getResolvables(), function (res) { return res.data; });
	    };
	    /**
	     * Adds new resolves to this transition.
	     *
	     * @param resolves an [[ResolveDeclarations]] object which describes the new resolves
	     * @param state the state in the "to path" which should receive the new resolves (otherwise, the root state)
	     */
	    Transition.prototype.addResolves = function (resolves, state) {
	        if (state === void 0) { state = ""; }
	        var stateName = (typeof state === "string") ? state : state.name;
	        var topath = this._treeChanges.to;
	        var targetNode = common_1.find(topath, function (node) { return node.state.name === stateName; });
	        common_1.tail(topath).resolveContext.addResolvables(module_4.Resolvable.makeResolvables(resolves), targetNode.state);
	    };
	    /**
	     * Gets the previous transition, from which this transition was redirected.
	     *
	     * @returns The previous Transition, or null if this Transition is not the result of a redirection
	     */
	    Transition.prototype.previous = function () {
	        return this._options.previous || null;
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
	    /**
	     * @ngdoc function
	     * @name ui.router.state.type:Transition#redirect
	     * @methodOf ui.router.state.type:Transition
	     *
	     * @description
	     * Creates a new transition that is a redirection of the current one. This transition can
	     * be returned from a `$transitionsProvider` hook, `$state` event, or other method, to
	     * redirect a transition to a new state and/or set of parameters.
	     *
	     * @returns {Transition} Returns a new `Transition` instance.
	     */
	    Transition.prototype.redirect = function (targetState) {
	        var newOptions = common_1.extend({}, this.options(), targetState.options(), { previous: this });
	        targetState = new module_2.TargetState(targetState.identifier(), targetState.$state(), targetState.params(), newOptions);
	        var redirectTo = new Transition(this._treeChanges.from, targetState, this._transitionService);
	        var reloadState = targetState.options().reloadState;
	        // If the current transition has already resolved any resolvables which are also in the redirected "to path", then
	        // add those resolvables to the redirected transition.  Allows you to define a resolve at a parent level, wait for
	        // the resolve, then redirect to a child state based on the result, and not have to re-fetch the resolve.
	        var redirectedPath = this.treeChanges().to;
	        var copyResolvesFor = node_1.Node.matching(redirectTo.treeChanges().to, redirectedPath)
	            .filter(function (node) { return !reloadState || !reloadState.includes[node.state.name]; });
	        var includeResolve = function (resolve, key) { return ['$stateParams', '$transition$'].indexOf(key) === -1; };
	        copyResolvesFor.forEach(function (node, idx) { return common_1.extend(node.resolves, common_1.filter(redirectedPath[idx].resolves, includeResolve)); });
	        return redirectTo;
	    };
	    /** @hidden If a transition doesn't exit/enter any states, returns any [[Param]] whose value changed */
	    Transition.prototype._changedParams = function () {
	        var _a = this._treeChanges, to = _a.to, from = _a.from;
	        if (this._options.reload || common_1.tail(to).state !== common_1.tail(from).state)
	            return undefined;
	        var nodeSchemas = to.map(function (node) { return node.paramSchema; });
	        var _b = [to, from].map(function (path) { return path.map(function (x) { return x.paramValues; }); }), toValues = _b[0], fromValues = _b[1];
	        var tuples = common_1.arrayTuples(nodeSchemas, toValues, fromValues);
	        return tuples.map(function (_a) {
	            var schema = _a[0], toVals = _a[1], fromVals = _a[2];
	            return module_3.Param.changed(schema, toVals, fromVals);
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
	        var changes = this._changedParams();
	        return !changes ? false : changes.length === 0;
	    };
	    /**
	     * @hidden
	     */
	    Transition.prototype.hookBuilder = function () {
	        return new module_1.HookBuilder(this._transitionService, this, {
	            transition: this,
	            current: this._options.current
	        });
	    };
	    /**
	     * Runs the transition
	     *
	     * This method is generally called from the [[StateService.transitionTo]]
	     *
	     * @returns a promise for a successful transition.
	     */
	    Transition.prototype.run = function () {
	        var _this = this;
	        var hookBuilder = this.hookBuilder();
	        var runSynchronousHooks = module_1.TransitionHook.runSynchronousHooks;
	        // TODO: nuke these in favor of chaining off the promise, i.e.,
	        // $transitions.onBefore({}, $transition$ => {$transition$.promise.then()}
	        var runSuccessHooks = function () { return runSynchronousHooks(hookBuilder.getOnSuccessHooks(), {}, true); };
	        var runErrorHooks = function ($error$) { return runSynchronousHooks(hookBuilder.getOnErrorHooks(), { $error$: $error$ }, true); };
	        // Run the success/error hooks *after* the Transition promise is settled.
	        this.promise.then(runSuccessHooks, runErrorHooks);
	        var syncResult = runSynchronousHooks(hookBuilder.getOnBeforeHooks());
	        if (module_1.TransitionHook.isRejection(syncResult)) {
	            var rejectReason = syncResult.reason;
	            this._deferred.reject(rejectReason);
	            return this.promise;
	        }
	        if (!this.valid()) {
	            var error = new Error(this.error());
	            this._deferred.reject(error);
	            return this.promise;
	        }
	        if (this.ignored()) {
	            trace_1.trace.traceTransitionIgnored(this);
	            var ignored = REJECT.ignored();
	            this._deferred.reject(ignored.reason);
	            return this.promise;
	        }
	        // When the chain is complete, then resolve or reject the deferred
	        var resolve = function () {
	            _this.success = true;
	            _this._deferred.resolve(_this);
	            trace_1.trace.traceSuccess(_this.$to(), _this);
	        };
	        var reject = function (error) {
	            _this.success = false;
	            _this._deferred.reject(error);
	            trace_1.trace.traceError(error, _this);
	            return coreservices_1.services.$q.reject(error);
	        };
	        trace_1.trace.traceTransitionStart(this);
	        var chain = hookBuilder.asyncHooks().reduce(function (_chain, step) { return _chain.then(step.invokeStep); }, syncResult);
	        chain.then(resolve, reject);
	        return this.promise;
	    };
	    /**
	     * Checks if the Transition is valid
	     *
	     * @returns true if the Transition is valid
	     */
	    Transition.prototype.valid = function () {
	        return !this.error();
	    };
	    /**
	     * The reason the Transition is invalid
	     *
	     * @returns an error message explaining why the transition is invalid
	     */
	    Transition.prototype.error = function () {
	        var state = this.$to();
	        if (state.self[common_1.abstractKey])
	            return "Cannot transition to abstract state '" + state.name + "'";
	        if (!module_3.Param.validates(state.parameters(), this.params()))
	            return "Param values not valid for state '" + state.name + "'";
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
	            return (params["#"] !== null && params["#"] !== undefined) ? params : common_1.omit(params, "#");
	        };
	        // (X) means the to state is invalid.
	        var id = this.$id, from = predicates_1.isObject(fromStateOrName) ? fromStateOrName.name : fromStateOrName, fromParams = common_1.toJson(avoidEmptyHash(this._treeChanges.from.map(hof_1.prop('paramValues')).reduce(common_1.mergeR, {}))), toValid = this.valid() ? "" : "(X) ", to = predicates_1.isObject(toStateOrName) ? toStateOrName.name : toStateOrName, toParams = common_1.toJson(avoidEmptyHash(this.params()));
	        return "Transition#" + id + "( '" + from + "'" + fromParams + " -> " + toValid + "'" + to + "'" + toParams + " )";
	    };
	    return Transition;
	}());
	exports.Transition = Transition;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * UI-Router Transition Tracing
	 *
	 * Enable transition tracing to print transition information to the console, in order to help debug your application.
	 * Tracing logs detailed information about each Transition to your console.
	 *
	 * To enable tracing, import the [[trace]] singleton and enable one or more categories.
	 *
	 * ES6
	 * ```
	 *
	 * import {trace} from "ui-router-ng2"; // or "angular-ui-router"
	 * trace.enable(1, 5); // TRANSITION and VIEWCONFIG
	 * ```
	 *
	 * CJS
	 * ```
	 *
	 * let trace = require("angular-ui-router").trace; // or "ui-router-ng2"
	 * trace.enable("TRANSITION", "VIEWCONFIG");
	 * ```
	 *
	 * Globals
	 * ```
	 *
	 * let trace = window["angular-ui-router"].trace; // or "ui-router-ng2"
	 * trace.enable(); // Trace everything (very verbose)
	 * ```
	 *
	 * @module trace
	 */ /** for typedoc */
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var strings_1 = __webpack_require__(9);
	/** @hidden */
	function uiViewString(viewData) {
	    if (!viewData)
	        return 'ui-view (defunct)';
	    return "ui-view id#" + viewData.id + ", contextual name '" + viewData.name + "@" + viewData.creationContext + "', fqn: '" + viewData.fqn + "'";
	}
	/** @hidden */
	var viewConfigString = function (viewConfig) {
	    return ("ViewConfig targeting ui-view: '" + viewConfig.viewDecl.$uiViewName + "@" + viewConfig.viewDecl.$uiViewContextAnchor + "', context: '" + viewConfig.viewDecl.$context.name + "'");
	};
	/** @hidden */
	function normalizedCat(input) {
	    return predicates_1.isNumber(input) ? Category[input] : Category[Category[input]];
	}
	/**
	 * Trace categories
	 *
	 * [[Trace.enable]] or [[Trace.disable]] a category
	 *
	 * `trace.enable(Category.TRANSITION)`
	 *
	 * These can also be provided using a matching string, or position ordinal
	 *
	 * `trace.enable("TRANSITION")`
	 *
	 * `trace.enable(1)`
	 */
	(function (Category) {
	    Category[Category["RESOLVE"] = 0] = "RESOLVE";
	    Category[Category["TRANSITION"] = 1] = "TRANSITION";
	    Category[Category["HOOK"] = 2] = "HOOK";
	    Category[Category["INVOKE"] = 3] = "INVOKE";
	    Category[Category["UIVIEW"] = 4] = "UIVIEW";
	    Category[Category["VIEWCONFIG"] = 5] = "VIEWCONFIG";
	})(exports.Category || (exports.Category = {}));
	var Category = exports.Category;
	/**
	 * Prints UI-Router Transition trace information to the console.
	 */
	var Trace = (function () {
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
	                .filter(function (k) { return isNaN(parseInt(k, 10)); })
	                .map(function (key) { return Category[key]; });
	        }
	        categories.map(normalizedCat).forEach(function (category) { return _this._enabled[category] = enabled; });
	    };
	    /**
	     * Enables a trace [[Category]]
	     *
	     * ```
	     * trace.enable("TRANSITION");
	     * ```
	     *
	     * @param categories categories to enable. If `categories` is omitted, all categories are enabled.
	     *        Also takes strings (category name) or ordinal (category position)
	     */
	    Trace.prototype.enable = function () {
	        var categories = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            categories[_i - 0] = arguments[_i];
	        }
	        this._set(true, categories);
	    };
	    /**
	     * Disables a trace [[Category]]
	     *
	     * ```
	     * trace.disable("VIEWCONFIG");
	     * ```
	     *
	     * @param categories categories to disable. If `categories` is omitted, all categories are disabled.
	     *        Also takes strings (category name) or ordinal (category position)
	     */
	    Trace.prototype.disable = function () {
	        var categories = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            categories[_i - 0] = arguments[_i];
	        }
	        this._set(false, categories);
	    };
	    /**
	     * Retrieves the enabled stateus of a [[Category]]
	     *
	     * ```
	     * trace.enabled("VIEWCONFIG"); // true or false
	     * ```
	     *
	     * @returns boolean true if the category is enabled
	     */
	    Trace.prototype.enabled = function (category) {
	        return !!this._enabled[normalizedCat(category)];
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceTransitionStart = function (transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, transitionStr = strings_1.stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": Started  -> " + transitionStr);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceTransitionIgnored = function (transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, transitionStr = strings_1.stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": Ignored  <> " + transitionStr);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceHookInvocation = function (step, options) {
	        if (!this.enabled(Category.HOOK))
	            return;
	        var tid = hof_1.parse("transition.$id")(options), digest = this.approximateDigests, event = hof_1.parse("traceData.hookType")(options) || "internal", context = hof_1.parse("traceData.context.state.name")(options) || hof_1.parse("traceData.context")(options) || "unknown", name = strings_1.functionToString(step.fn);
	        console.log("Transition #" + tid + " Digest #" + digest + ":   Hook -> " + event + " context: " + context + ", " + strings_1.maxLength(200, name));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceHookResult = function (hookResult, transitionResult, transitionOptions) {
	        if (!this.enabled(Category.HOOK))
	            return;
	        var tid = hof_1.parse("transition.$id")(transitionOptions), digest = this.approximateDigests, hookResultStr = strings_1.stringify(hookResult), transitionResultStr = strings_1.stringify(transitionResult);
	        console.log("Transition #" + tid + " Digest #" + digest + ":   <- Hook returned: " + strings_1.maxLength(200, hookResultStr) + ", transition result: " + strings_1.maxLength(200, transitionResultStr));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceResolvePath = function (path, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = hof_1.parse("transition.$id")(options), digest = this.approximateDigests, pathStr = path && path.toString(), policyStr = options && options.resolvePolicy;
	        console.log("Transition #" + tid + " Digest #" + digest + ":         Resolving " + pathStr + " (" + policyStr + ")");
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceResolvePathElement = function (pathElement, resolvablePromises, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        if (!resolvablePromises.length)
	            return;
	        var tid = hof_1.parse("transition.$id")(options), digest = this.approximateDigests, resolvablePromisesStr = Object.keys(resolvablePromises).join(", "), pathElementStr = pathElement && pathElement.toString(), policyStr = options && options.resolvePolicy;
	        console.log("Transition #" + tid + " Digest #" + digest + ":         Resolve " + pathElementStr + " resolvables: [" + resolvablePromisesStr + "] (" + policyStr + ")");
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceResolveResolvable = function (resolvable, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = hof_1.parse("transition.$id")(options), digest = this.approximateDigests, resolvableStr = resolvable && resolvable.toString();
	        console.log("Transition #" + tid + " Digest #" + digest + ":               Resolving -> " + resolvableStr);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceResolvableResolved = function (resolvable, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = hof_1.parse("transition.$id")(options), digest = this.approximateDigests, resolvableStr = resolvable && resolvable.toString(), result = strings_1.stringify(resolvable.data);
	        console.log("Transition #" + tid + " Digest #" + digest + ":               <- Resolved  " + resolvableStr + " to: " + strings_1.maxLength(200, result));
	    };
	    /** called by ui-router code */
	    Trace.prototype.tracePathElementInvoke = function (node, fn, deps, options) {
	        if (!this.enabled(Category.INVOKE))
	            return;
	        var tid = hof_1.parse("transition.$id")(options), digest = this.approximateDigests, stateName = node && node.state && node.state.toString(), fnName = strings_1.functionToString(fn);
	        console.log("Transition #" + tid + " Digest #" + digest + ":         Invoke " + options.when + ": context: " + stateName + " " + strings_1.maxLength(200, fnName));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceError = function (error, transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, transitionStr = strings_1.stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": <- Rejected " + transitionStr + ", reason: " + error);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceSuccess = function (finalState, transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, state = finalState.name, transitionStr = strings_1.stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": <- Success  " + transitionStr + ", final state: " + state);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceUiViewEvent = function (event, viewData, extra) {
	        if (extra === void 0) { extra = ""; }
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        console.log("ui-view: " + strings_1.padString(30, event) + " " + uiViewString(viewData) + extra);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceUiViewConfigUpdated = function (viewData, context) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUiViewEvent("Updating", viewData, " with ViewConfig from context='" + context + "'");
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceUiViewScopeCreated = function (viewData, newScope) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUiViewEvent("Created scope for", viewData, ", scope #" + newScope.$id);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceUiViewFill = function (viewData, html) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUiViewEvent("Fill", viewData, " with: " + strings_1.maxLength(200, html));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceViewServiceEvent = function (event, viewConfig) {
	        if (!this.enabled(Category.VIEWCONFIG))
	            return;
	        console.log("$view.ViewConfig: " + event + " " + viewConfigString(viewConfig));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceViewServiceUiViewEvent = function (event, viewData) {
	        if (!this.enabled(Category.VIEWCONFIG))
	            return;
	        console.log("$view.ViewConfig: " + event + " " + uiViewString(viewData));
	    };
	    return Trace;
	}());
	exports.Trace = Trace;
	/**
	 * The [[Trace]] singleton
	 *
	 * @example
	 * ```js
	 *
	 * import {trace} from "angular-ui-router";
	 * trace.enable(1, 5);
	 * ```
	 */
	var trace = new Trace();
	exports.trace = trace;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/**
	 * This module contains APIs related to a Transition.
	 *
	 * See [[Transition]], [[$transitions]]
	 *
	 * @module transition
	 * @preferred
	 */
	/** for typedoc */
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	__export(__webpack_require__(16));
	__export(__webpack_require__(43));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @module transition */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var module_1 = __webpack_require__(13);
	/**
	 * This class returns applicable TransitionHooks for a specific Transition instance.
	 *
	 * Hooks (IEventHook) may be registered globally, e.g., $transitions.onEnter(...), or locally, e.g.
	 * myTransition.onEnter(...).  The HookBuilder finds matching IEventHooks (where the match criteria is
	 * determined by the type of hook)
	 *
	 * The HookBuilder also converts IEventHooks objects to TransitionHook objects, which are used to run a Transition.
	 *
	 * The HookBuilder constructor is given the $transitions service and a Transition instance.  Thus, a HookBuilder
	 * instance may only be used for one specific Transition object. (side note: the _treeChanges accessor is private
	 * in the Transition class, so we must also provide the Transition's _treeChanges)
	 *
	 */
	var HookBuilder = (function () {
	    function HookBuilder($transitions, transition, baseHookOptions) {
	        var _this = this;
	        this.$transitions = $transitions;
	        this.transition = transition;
	        this.baseHookOptions = baseHookOptions;
	        // TODO: These get* methods are returning different cardinalities of hooks
	        // onBefore/onStart/onFinish/onSuccess/onError returns an array of hooks
	        // onExit/onRetain/onEnter returns an array of arrays of hooks
	        this.getOnBeforeHooks = function () { return _this._buildNodeHooks("onBefore", "to", tupleSort(), undefined, { async: false }); };
	        this.getOnStartHooks = function () { return _this._buildNodeHooks("onStart", "to", tupleSort()); };
	        this.getOnExitHooks = function () { return _this._buildNodeHooks("onExit", "exiting", tupleSort(true), function (node) { return ({ $state$: node.state }); }); };
	        this.getOnRetainHooks = function () { return _this._buildNodeHooks("onRetain", "retained", tupleSort(), function (node) { return ({ $state$: node.state }); }); };
	        this.getOnEnterHooks = function () { return _this._buildNodeHooks("onEnter", "entering", tupleSort(), function (node) { return ({ $state$: node.state }); }); };
	        this.getOnFinishHooks = function () { return _this._buildNodeHooks("onFinish", "to", tupleSort(), function (node) { return ({ $treeChanges$: _this.treeChanges }); }); };
	        this.getOnSuccessHooks = function () { return _this._buildNodeHooks("onSuccess", "to", tupleSort(), undefined, { async: false, rejectIfSuperseded: false }); };
	        this.getOnErrorHooks = function () { return _this._buildNodeHooks("onError", "to", tupleSort(), undefined, { async: false, rejectIfSuperseded: false }); };
	        this.treeChanges = transition.treeChanges();
	        this.toState = common_1.tail(this.treeChanges.to).state;
	        this.fromState = common_1.tail(this.treeChanges.from).state;
	        this.transitionOptions = transition.options();
	    }
	    HookBuilder.prototype.asyncHooks = function () {
	        var onStartHooks = this.getOnStartHooks();
	        var onExitHooks = this.getOnExitHooks();
	        var onRetainHooks = this.getOnRetainHooks();
	        var onEnterHooks = this.getOnEnterHooks();
	        var onFinishHooks = this.getOnFinishHooks();
	        var asyncHooks = [onStartHooks, onExitHooks, onRetainHooks, onEnterHooks, onFinishHooks];
	        return asyncHooks.reduce(common_1.unnestR, []).filter(common_1.identity);
	    };
	    /**
	     * Returns an array of newly built TransitionHook objects.
	     *
	     * - Finds all IEventHooks registered for the given `hookType` which matched the transition's [[TreeChanges]].
	     * - Finds [[Node]] (or `Node[]`) to use as the TransitionHook context(s)
	     * - For each of the [[Node]]s, creates a TransitionHook
	     *
	     * @param hookType the name of the hook registration function, e.g., 'onEnter', 'onFinish'.
	     * @param matchingNodesProp selects which [[Node]]s from the [[IMatchingNodes]] object to create hooks for.
	     * @param getLocals a function which accepts a [[Node]] and returns additional locals to provide to the hook as injectables
	     * @param sortHooksFn a function which compares two HookTuple and returns <1, 0, or >1
	     * @param options any specific Transition Hook Options
	     */
	    HookBuilder.prototype._buildNodeHooks = function (hookType, matchingNodesProp, sortHooksFn, getLocals, options) {
	        var _this = this;
	        if (getLocals === void 0) { getLocals = function (node) { return ({}); }; }
	        // Find all the matching registered hooks for a given hook type
	        var matchingHooks = this._matchingHooks(hookType, this.treeChanges);
	        if (!matchingHooks)
	            return [];
	        var makeTransitionHooks = function (hook) {
	            // Fetch the Nodes that caused this hook to match.
	            var matches = hook.matches(_this.treeChanges);
	            // Select the Node[] that will be used as TransitionHook context objects
	            var nodes = matches[matchingNodesProp];
	            // Return an array of HookTuples
	            return nodes.map(function (node) {
	                var _options = common_1.extend({ bind: hook.bind, traceData: { hookType: hookType, context: node } }, _this.baseHookOptions, options);
	                var transitionHook = new module_1.TransitionHook(hook.callback, getLocals(node), node.resolveContext, _options);
	                return { hook: hook, node: node, transitionHook: transitionHook };
	            });
	        };
	        return matchingHooks.map(makeTransitionHooks)
	            .reduce(common_1.unnestR, [])
	            .sort(sortHooksFn)
	            .map(function (tuple) { return tuple.transitionHook; });
	    };
	    /**
	     * Finds all IEventHooks from:
	     * - The Transition object instance hook registry
	     * - The TransitionService ($transitions) global hook registry
	     *
	     * which matched:
	     * - the eventType
	     * - the matchCriteria (to, from, exiting, retained, entering)
	     *
	     * @returns an array of matched [[IEventHook]]s
	     */
	    HookBuilder.prototype._matchingHooks = function (hookName, treeChanges) {
	        return [this.transition, this.$transitions] // Instance and Global hook registries
	            .map(function (reg) { return reg.getHooks(hookName); }) // Get named hooks from registries
	            .filter(common_1.assertPredicate(predicates_1.isArray, "broken event named: " + hookName)) // Sanity check
	            .reduce(common_1.unnestR, []) // Un-nest IEventHook[][] to IEventHook[] array
	            .filter(function (hook) { return hook.matches(treeChanges); }); // Only those satisfying matchCriteria
	    };
	    return HookBuilder;
	}());
	exports.HookBuilder = HookBuilder;
	/**
	 * A factory for a sort function for HookTuples.
	 *
	 * The sort function first compares the Node depth (how deep in the state tree a node is), then compares
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


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module transition */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var glob_1 = __webpack_require__(7);
	/**
	 * Determines if the given state matches the matchCriteria
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
	            var glob = glob_1.Glob.fromString(globStrings[i]);
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
	var EventHook = (function () {
	    function EventHook(matchCriteria, callback, options) {
	        if (options === void 0) { options = {}; }
	        this.callback = callback;
	        this.matchCriteria = common_1.extend({ to: true, from: true, exiting: true, retained: true, entering: true }, matchCriteria);
	        this.priority = options.priority || 0;
	        this.bind = options.bind || null;
	    }
	    EventHook._matchingNodes = function (nodes, criterion) {
	        if (criterion === true)
	            return nodes;
	        var matching = nodes.filter(function (node) { return matchState(node.state, criterion); });
	        return matching.length ? matching : null;
	    };
	    /**
	     * Determines if this hook's [[matchCriteria]] match the given [[TreeChanges]]
	     *
	     * @returns an IMatchingNodes object, or null. If an IMatchingNodes object is returned, its values
	     * are the matching [[Node]]s for each [[HookMatchCriterion]] (to, from, exiting, retained, entering)
	     */
	    EventHook.prototype.matches = function (treeChanges) {
	        var mc = this.matchCriteria, _matchingNodes = EventHook._matchingNodes;
	        var matches = {
	            to: _matchingNodes([common_1.tail(treeChanges.to)], mc.to),
	            from: _matchingNodes([common_1.tail(treeChanges.from)], mc.from),
	            exiting: _matchingNodes(treeChanges.exiting, mc.exiting),
	            retained: _matchingNodes(treeChanges.retained, mc.retained),
	            entering: _matchingNodes(treeChanges.entering, mc.entering),
	        };
	        // Check if all the criteria matched the TreeChanges object
	        var allMatched = ["to", "from", "exiting", "retained", "entering"]
	            .map(function (prop) { return matches[prop]; })
	            .reduce(common_1.allTrueR, true);
	        return allMatched ? matches : null;
	    };
	    return EventHook;
	}());
	exports.EventHook = EventHook;
	// Return a registration function of the requested type.
	function makeHookRegistrationFn(hooks, name) {
	    return function (matchObject, callback, options) {
	        if (options === void 0) { options = {}; }
	        var eventHook = new EventHook(matchObject, callback, options);
	        hooks[name].push(eventHook);
	        return function deregisterEventHook() {
	            common_1.removeFrom(hooks[name])(eventHook);
	        };
	    };
	}
	var HookRegistry = (function () {
	    function HookRegistry() {
	        var _this = this;
	        this._transitionEvents = {
	            onBefore: [], onStart: [], onEnter: [], onRetain: [], onExit: [], onFinish: [], onSuccess: [], onError: []
	        };
	        this.getHooks = function (name) { return _this._transitionEvents[name]; };
	        this.onBefore = makeHookRegistrationFn(this._transitionEvents, "onBefore");
	        this.onStart = makeHookRegistrationFn(this._transitionEvents, "onStart");
	        /**
	         * @ngdoc function
	         * @name ui.router.state.$transitionsProvider#onEnter
	         * @methodOf ui.router.state.$transitionsProvider
	         *
	         * @description
	         * Registers a function to be injected and invoked during a transition between the matched 'to' and 'from' states,
	         * when the matched 'to' state is being entered. This function is injected with the entering state's resolves.
	         *
	         * This function can be injected with two additional special value:
	         * - **`$transition$`**: The current transition
	         * - **`$state$`**: The state being entered
	         *
	         * @param {object} matchObject See transitionCriteria in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         * @param {function} callback See callback in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         */
	        this.onEnter = makeHookRegistrationFn(this._transitionEvents, "onEnter");
	        /**
	         * @ngdoc function
	         * @name ui.router.state.$transitionsProvider#onRetain
	         * @methodOf ui.router.state.$transitionsProvider
	         *
	         * @description
	         * Registers a function to be injected and invoked during a transition between the matched 'to' and 'from states,
	         * when the matched 'from' state is already active and is not being exited nor entered.
	         *
	         * This function can be injected with two additional special value:
	         * - **`$transition$`**: The current transition
	         * - **`$state$`**: The state that is retained
	         *
	         * @param {object} matchObject See transitionCriteria in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         * @param {function} callback See callback in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         */
	        this.onRetain = makeHookRegistrationFn(this._transitionEvents, "onRetain");
	        /**
	         * @ngdoc function
	         * @name ui.router.state.$transitionsProvider#onExit
	         * @methodOf ui.router.state.$transitionsProvider
	         *
	         * @description
	         * Registers a function to be injected and invoked during a transition between the matched 'to' and 'from states,
	         * when the matched 'from' state is being exited. This function is in injected with the exiting state's resolves.
	         *
	         * This function can be injected with two additional special value:
	         * - **`$transition$`**: The current transition
	         * - **`$state$`**: The state being entered
	         *
	         * @param {object} matchObject See transitionCriteria in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         * @param {function} callback See callback in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         */
	        this.onExit = makeHookRegistrationFn(this._transitionEvents, "onExit");
	        /**
	         * @ngdoc function
	         * @name ui.router.state.$transitionsProvider#onFinish
	         * @methodOf ui.router.state.$transitionsProvider
	         *
	         * @description
	         * Registers a function to be injected and invoked when a transition is finished entering/exiting all states.
	         *
	         * This function can be injected with:
	         * - **`$transition$`**: The current transition
	         *
	         * @param {object} matchObject See transitionCriteria in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         * @param {function} callback See callback in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         */
	        this.onFinish = makeHookRegistrationFn(this._transitionEvents, "onFinish");
	        /**
	         * @ngdoc function
	         * @name ui.router.state.$transitionsProvider#onSuccess
	         * @methodOf ui.router.state.$transitionsProvider
	         *
	         * @description
	         * Registers a function to be injected and invoked when a transition has successfully completed between the matched
	         * 'to' and 'from' state is being exited.
	         * This function is in injected with the 'to' state's resolves (note: `JIT` resolves are not injected).
	         *
	         * This function can be injected with two additional special value:
	         * - **`$transition$`**: The current transition
	         *
	         * @param {object} matchObject See transitionCriteria in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         * @param {function} callback The function which will be injected and invoked, when a matching transition is started.
	         *   The function's return value is ignored.
	         */
	        this.onSuccess = makeHookRegistrationFn(this._transitionEvents, "onSuccess");
	        /**
	         * @ngdoc function
	         * @name ui.router.state.$transitionsProvider#onError
	         * @methodOf ui.router.state.$transitionsProvider
	         *
	         * @description
	         * Registers a function to be injected and invoked when a transition has failed for any reason between the matched
	         * 'to' and 'from' state. The transition rejection reason is injected as `$error$`.
	         *
	         * @param {object} matchObject See transitionCriteria in {@link ui.router.state.$transitionsProvider#on $transitionsProvider.on}.
	         * @param {function} callback The function which will be injected and invoked, when a matching transition is started.
	         *   The function's return value is ignored.
	         */
	        this.onError = makeHookRegistrationFn(this._transitionEvents, "onError");
	    }
	    HookRegistry.mixin = function (source, target) {
	        Object.keys(source._transitionEvents).concat(["getHooks"]).forEach(function (key) { return target[key] = source[key]; });
	    };
	    return HookRegistry;
	}());
	exports.HookRegistry = HookRegistry;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(3);
	var strings_1 = __webpack_require__(9);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var trace_1 = __webpack_require__(12);
	var coreservices_1 = __webpack_require__(6);
	var rejectFactory_1 = __webpack_require__(10);
	var module_1 = __webpack_require__(17);
	var REJECT = new rejectFactory_1.RejectFactory();
	var defaultOptions = {
	    async: true,
	    rejectIfSuperseded: true,
	    current: common_1.noop,
	    transition: null,
	    traceData: {},
	    bind: null
	};
	var TransitionHook = (function () {
	    function TransitionHook(fn, locals, resolveContext, options) {
	        var _this = this;
	        this.fn = fn;
	        this.locals = locals;
	        this.resolveContext = resolveContext;
	        this.options = options;
	        this.isSuperseded = function () { return _this.options.current() !== _this.options.transition; };
	        /**
	         * Handles transition abort and transition redirect. Also adds any returned resolvables
	         * to the pathContext for the current pathElement.  If the transition is rejected, then a rejected
	         * promise is returned here, otherwise undefined is returned.
	         */
	        this.mapHookResult = hof_1.pattern([
	            // Transition is no longer current
	            [this.isSuperseded, function () { return REJECT.superseded(_this.options.current()); }],
	            // If the hook returns false, abort the current Transition
	            [hof_1.eq(false), function () { return REJECT.aborted("Hook aborted transition"); }],
	            // If the hook returns a Transition, halt the current Transition and redirect to that Transition.
	            [hof_1.is(module_1.TargetState), function (target) { return REJECT.redirected(target); }],
	            // A promise was returned, wait for the promise and then chain another hookHandler
	            [predicates_1.isPromise, function (promise) { return promise.then(_this.handleHookResult.bind(_this)); }]
	        ]);
	        this.invokeStep = function (moreLocals) {
	            var _a = _this, options = _a.options, fn = _a.fn, resolveContext = _a.resolveContext;
	            var locals = common_1.extend({}, _this.locals, moreLocals);
	            trace_1.trace.traceHookInvocation(_this, options);
	            if (options.rejectIfSuperseded && _this.isSuperseded()) {
	                return REJECT.superseded(options.current());
	            }
	            // TODO: Need better integration of returned promises in synchronous code.
	            if (!options.async) {
	                var hookResult = resolveContext.invokeNow(fn, locals, options);
	                return _this.handleHookResult(hookResult);
	            }
	            return resolveContext.invokeLater(fn, locals, options).then(_this.handleHookResult.bind(_this));
	        };
	        this.options = common_1.defaults(options, defaultOptions);
	    }
	    TransitionHook.prototype.handleHookResult = function (hookResult) {
	        if (!predicates_1.isDefined(hookResult))
	            return undefined;
	        trace_1.trace.traceHookResult(hookResult, undefined, this.options);
	        var transitionResult = this.mapHookResult(hookResult);
	        if (transitionResult)
	            trace_1.trace.traceHookResult(hookResult, transitionResult, this.options);
	        return transitionResult;
	    };
	    TransitionHook.prototype.toString = function () {
	        var _a = this, options = _a.options, fn = _a.fn;
	        var event = hof_1.parse("traceData.hookType")(options) || "internal", context = hof_1.parse("traceData.context.state.name")(options) || hof_1.parse("traceData.context")(options) || "unknown", name = strings_1.fnToString(fn);
	        return event + " context: " + context + ", " + strings_1.maxLength(200, name);
	    };
	    /**
	     * Given an array of TransitionHooks, runs each one synchronously and sequentially.
	     *
	     * Returns a promise chain composed of any promises returned from each hook.invokeStep() call
	     */
	    TransitionHook.runSynchronousHooks = function (hooks, locals, swallowExceptions) {
	        if (locals === void 0) { locals = {}; }
	        if (swallowExceptions === void 0) { swallowExceptions = false; }
	        var results = [];
	        for (var i = 0; i < hooks.length; i++) {
	            try {
	                results.push(hooks[i].invokeStep(locals));
	            }
	            catch (exception) {
	                if (!swallowExceptions)
	                    return REJECT.aborted(exception);
	                console.log("Swallowed exception during synchronous hook handler: " + exception); // TODO: What to do here?
	            }
	        }
	        var rejections = results.filter(TransitionHook.isRejection);
	        if (rejections.length)
	            return rejections[0];
	        return results
	            .filter(hof_1.not(TransitionHook.isRejection))
	            .filter(predicates_1.isPromise)
	            .reduce(function (chain, promise) { return chain.then(hof_1.val(promise)); }, coreservices_1.services.$q.when());
	    };
	    TransitionHook.isRejection = function (hookResult) {
	        return hookResult && hookResult.reason instanceof rejectFactory_1.TransitionRejection && hookResult;
	    };
	    return TransitionHook;
	}());
	exports.TransitionHook = TransitionHook;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module state */ /** for typedoc */
	__export(__webpack_require__(18));
	__export(__webpack_require__(19));
	__export(__webpack_require__(26));
	__export(__webpack_require__(33));
	__export(__webpack_require__(34));
	__export(__webpack_require__(35));
	__export(__webpack_require__(36));
	__export(__webpack_require__(37));
	__export(__webpack_require__(27));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var common_1 = __webpack_require__(3);
	/**
	 * @ngdoc object
	 * @name ui.router.state.$stateProvider
	 *
	 * @requires ui.router.router.$urlRouterProvider
	 * @requires ui.router.util.$urlMatcherFactoryProvider
	 *
	 * @description
	 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
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
	    function StateProvider(stateRegistry) {
	        this.stateRegistry = stateRegistry;
	        this.invalidCallbacks = [];
	        common_1.bindFunctions(StateProvider.prototype, this, this);
	    }
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$stateProvider#decorator
	     * @methodOf ui.router.state.$stateProvider
	     *
	     * @description
	     * Allows you to extend (carefully) or override (at your own peril) the
	     * `stateBuilder` object used internally by `$stateProvider`. This can be used
	     * to add custom functionality to ui-router, for example inferring templateUrl
	     * based on the state name.
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
	     * @example
	     * <pre>
	     * // Override the internal 'views' builder with a function that takes the state
	     * // definition, and a reference to the internal function being overridden:
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
	     *
	     * // ...
	     *
	     * $state.go('home');
	     * // Auto-populates list and item views with /partials/home/contact/list.html,
	     * // and /partials/home/contact/item.html, respectively.
	     * </pre>
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
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$stateProvider#state
	     * @methodOf ui.router.state.$stateProvider
	     *
	     * @description
	     * Registers a state configuration under a given state name. The stateConfig object
	     * has the following acceptable properties.
	     *
	     * <a id='template'></a>
	     *
	     * - **`template`** - {string|function=} - html template as a string or a function that returns
	     *   an html template as a string which should be used by the uiView directives. This property
	     *   takes precedence over templateUrl.
	     *
	     *   If `template` is a function, it will be called with the following parameters:
	     *
	     *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
	     *     applying the current state
	     *
	     * <a id='templateUrl'></a>
	     *
	     * - **`templateUrl`** - {string|function=} - path or function that returns a path to an html
	     *   template that should be used by uiView.
	     *
	     *   If `templateUrl` is a function, it will be called with the following parameters:
	     *
	     *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
	     *     applying the current state
	     *
	     * <a id='templateProvider'></a>
	     *
	     * - **`templateProvider`** - {function=} - Provider function that returns HTML content
	     *   string.
	     *
	     * <a id='controller'></a>
	     *
	     * - **`controller`** - {string|function=} -  Controller fn that should be associated with newly
	     *   related scope or the name of a registered controller if passed as a string.
	     *
	     * <a id='controllerProvider'></a>
	     *
	     * - **`controllerProvider`** - {function=} - Injectable provider function that returns
	     *   the actual controller or string.
	     *
	     * <a id='controllerAs'></a>
	     *
	     * - **`controllerAs`** – {string=} – A controller alias name. If present the controller will be
	     *   published to scope under the controllerAs name.
	     *
	     * <a id='resolve'></a>
	     *
	     * - **`resolve`** - {object.&lt;string, function&gt;=} - An optional map of dependencies which
	     *   should be injected into the controller. If any of these dependencies are promises,
	     *   the router will wait for them all to be resolved or one to be rejected before the
	     *   controller is instantiated. If all the promises are resolved successfully, the values
	     *   of the resolved promises are injected and $stateChangeSuccess event is fired. If any
	     *   of the promises are rejected the $stateChangeError event is fired. The map object is:
	     *
	     *   - key - {string}: name of dependency to be injected into controller
	     *   - factory - {string|function}: If string then it is alias for service. Otherwise if function,
	     *     it is injected and return value it treated as dependency. If result is a promise, it is
	     *     resolved before its value is injected into controller.
	     *
	     * <a id='url'></a>
	     *
	     * - **`url`** - {string=} - A url with optional parameters. When a state is navigated or
	     *   transitioned to, the `$stateParams` service will be populated with any
	     *   parameters that were passed.
	     *
	     * <a id='params'></a>
	     *
	     * - **`params`** - {object=} - An array of parameter names or regular expressions. Only
	     *   use this within a state if you are not using url. Otherwise you can specify your
	     *   parameters within the url. When a state is navigated or transitioned to, the
	     *   $stateParams service will be populated with any parameters that were passed.
	     *
	     * <a id='views'></a>
	     *
	     * - **`views`** - {object=} - Use the views property to set up multiple views or to target views
	     *   manually/explicitly.
	     *
	     * <a id='abstract'></a>
	     *
	     * - **`abstract`** - {boolean=} - An abstract state will never be directly activated,
	     *   but can provide inherited properties to its common children states.
	     *
	     * <a id='onEnter'></a>
	     *
	     * - **`onEnter`** - {object=} - Callback function for when a state is entered. Good way
	     *   to trigger an action or dispatch an event, such as opening a dialog.
	     * If minifying your scripts, make sure to use the `['injection1', 'injection2', function(injection1, injection2){}]` syntax.
	     *
	     * <a id='onExit'></a>
	     *
	     * - **`onExit`** - {object=} - Callback function for when a state is exited. Good way to
	     *   trigger an action or dispatch an event, such as opening a dialog.
	     * If minifying your scripts, make sure to use the `['injection1', 'injection2', function(injection1, injection2){}]` syntax.
	     *
	     * <a id='reloadOnSearch'></a>
	     *
	     * - **`reloadOnSearch = true`** - {boolean=} - If `false`, will not retrigger the same state
	     *   just because a search/query parameter has changed (via $location.search() or $location.hash()).
	     *   Useful for when you'd like to modify $location.search() without triggering a reload.
	     *
	     * <a id='data'></a>
	     *
	     * - **`data`** - {object=} - Arbitrary data object, useful for custom configuration.
	     *
	     * @example
	     * <pre>
	     * // Some state name examples
	     *
	     * // stateName can be a single top-level name (must be unique).
	     * $stateProvider.state("home", {});
	     *
	     * // Or it can be a nested state name. This state is a child of the
	     * // above "home" state.
	     * $stateProvider.state("home.newest", {});
	     *
	     * // Nest states as deeply as needed.
	     * $stateProvider.state("home.newest.abc.xyz.inception", {});
	     *
	     * // state() returns $stateProvider, so you can chain state declarations.
	     * $stateProvider
	     *   .state("home", {})
	     *   .state("about", {})
	     *   .state("contacts", {});
	     * </pre>
	     *
	     * @param {string} name A unique state name, e.g. "home", "about", "contacts".
	     * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
	     * @param {object} definition State configuration object.
	     */
	    StateProvider.prototype.state = function (name, definition) {
	        if (predicates_1.isObject(name)) {
	            definition = name;
	        }
	        else {
	            definition.name = name;
	        }
	        this.stateRegistry.register(definition);
	        return this;
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$stateProvider#onInvalid
	     * @methodOf ui.router.state.$stateProvider
	     *
	     * @description
	     * Registers a function to be injected and invoked when transitionTo has been called with an invalid
	     * state reference parameter
	     *
	     * This function can be injected with one some special values:
	     * - **`$to$`**: TargetState
	     * - **`$from$`**: TargetState
	     *
	     * @param {function} callback
	     *   The function which will be injected and invoked, when a matching transition is started.
	     *   The function may optionally return a {TargetState} or a Promise for a TargetState.  If one
	     *   is returned, it is treated as a redirect.
	     */
	    StateProvider.prototype.onInvalid = function (callback) {
	        this.invalidCallbacks.push(callback);
	    };
	    return StateProvider;
	}());
	exports.StateProvider = StateProvider;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var module_1 = __webpack_require__(20);
	var parseUrl = function (url) {
	    if (!predicates_1.isString(url))
	        return false;
	    var root = url.charAt(0) === '^';
	    return { val: root ? url.substring(1) : url, root: root };
	};
	/**
	 * @internalapi A internal global service
	 *
	 * StateBuilder is a factory for the internal [[State]] objects.
	 *
	 * When you register a state with the [[StateRegistry]], you register a plain old javascript object which
	 * conforms to the [[StateDeclaration]] interface.  This factory takes that object and builds the corresponding
	 * [[State]] object, which has an API and is used internally.
	 *
	 * Custom properties or API may be added to the internal [[State]] object by registering a decorator function
	 * using the [[builder]] method.
	 */
	var StateBuilder = (function () {
	    function StateBuilder(matcher, $urlMatcherFactoryProvider) {
	        this.matcher = matcher;
	        var self = this;
	        var isRoot = function (state) { return state.name === ""; };
	        var root = function () { return matcher.find(""); };
	        this.builders = {
	            self: [function (state) {
	                    state.self.$$state = function () { return state; };
	                    return state.self;
	                }],
	            parent: [function (state) {
	                    if (isRoot(state))
	                        return null;
	                    return matcher.find(self.parentName(state)) || root();
	                }],
	            data: [function (state) {
	                    if (state.parent && state.parent.data) {
	                        state.data = state.self.data = common_1.inherit(state.parent.data, state.data);
	                    }
	                    return state.data;
	                }],
	            // Build a URLMatcher if necessary, either via a relative or absolute URL
	            url: [function (state) {
	                    var stateDec = state;
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
	                }],
	            // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
	            navigable: [function (state) {
	                    return !isRoot(state) && state.url ? state : (state.parent ? state.parent.navigable : null);
	                }],
	            params: [function (state) {
	                    var makeConfigParam = function (config, id) { return module_1.Param.fromConfig(id, null, config); };
	                    var urlParams = (state.url && state.url.parameters({ inherit: false })) || [];
	                    var nonUrlParams = common_1.values(common_1.map(common_1.omit(state.params || {}, urlParams.map(hof_1.prop('id'))), makeConfigParam));
	                    return urlParams.concat(nonUrlParams).map(function (p) { return [p.id, p]; }).reduce(common_1.applyPairs, {});
	                }],
	            // Each framework-specific ui-router implementation should define its own `views` builder
	            // e.g., src/ng1/viewsBuilder.ts
	            views: [],
	            // Keep a full path from the root down to this state as this is needed for state activation.
	            path: [function (state) {
	                    return state.parent ? state.parent.path.concat(state) : [state];
	                }],
	            // Speed up $state.includes() as it's used a lot
	            includes: [function (state) {
	                    var includes = state.parent ? common_1.extend({}, state.parent.includes) : {};
	                    includes[state.name] = true;
	                    return includes;
	                }]
	        };
	    }
	    /**
	     * Registers a [[BuilderFunction]] for a specific [[State]] property (e.g., `parent`, `url`, or `path`).
	     * More than one BuilderFunction can be registered for a given property.
	     *
	     * The BuilderFunction(s) will be used to define the property on any subsequently built [[State]] objects.
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
	        if (parent && !matcher.find(parent))
	            return null;
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
	        if (name.indexOf('.') !== -1)
	            return name.substring(0, name.lastIndexOf('.'));
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/**
	 * This module contains code for State Parameters.
	 *
	 * See [[ParamDeclaration]]
	 * @module params
	 * @preferred doc
	 */
	/** for typedoc */
	__export(__webpack_require__(21));
	__export(__webpack_require__(24));
	__export(__webpack_require__(25));
	__export(__webpack_require__(23));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var urlMatcherConfig_1 = __webpack_require__(22);
	var type_1 = __webpack_require__(23);
	var paramTypes_1 = __webpack_require__(24);
	var hasOwn = Object.prototype.hasOwnProperty;
	var isShorthand = function (cfg) { return ["value", "type", "squash", "array", "dynamic"].filter(hasOwn.bind(cfg || {})).length === 0; };
	(function (DefType) {
	    DefType[DefType["PATH"] = 0] = "PATH";
	    DefType[DefType["SEARCH"] = 1] = "SEARCH";
	    DefType[DefType["CONFIG"] = 2] = "CONFIG";
	})(exports.DefType || (exports.DefType = {}));
	var DefType = exports.DefType;
	function unwrapShorthand(cfg) {
	    cfg = isShorthand(cfg) && { value: cfg } || cfg;
	    return common_1.extend(cfg, {
	        $$fn: predicates_1.isInjectable(cfg.value) ? cfg.value : function () { return cfg.value; }
	    });
	}
	function getType(cfg, urlType, location, id) {
	    if (cfg.type && urlType && urlType.name !== 'string')
	        throw new Error("Param '" + id + "' has two type configurations.");
	    if (cfg.type && urlType && urlType.name === 'string' && paramTypes_1.paramTypes.type(cfg.type))
	        return paramTypes_1.paramTypes.type(cfg.type);
	    if (urlType)
	        return urlType;
	    if (!cfg.type)
	        return (location === DefType.CONFIG ? paramTypes_1.paramTypes.type("any") : paramTypes_1.paramTypes.type("string"));
	    return cfg.type instanceof type_1.Type ? cfg.type : paramTypes_1.paramTypes.type(cfg.type);
	}
	/**
	 * returns false, true, or the squash value to indicate the "default parameter url squash policy".
	 */
	function getSquashPolicy(config, isOptional) {
	    var squash = config.squash;
	    if (!isOptional || squash === false)
	        return false;
	    if (!predicates_1.isDefined(squash) || squash == null)
	        return urlMatcherConfig_1.matcherConfig.defaultSquashPolicy();
	    if (squash === true || predicates_1.isString(squash))
	        return squash;
	    throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
	}
	function getReplace(config, arrayMode, isOptional, squash) {
	    var replace, configuredKeys, defaultPolicy = [
	        { from: "", to: (isOptional || arrayMode ? undefined : "") },
	        { from: null, to: (isOptional || arrayMode ? undefined : "") }
	    ];
	    replace = predicates_1.isArray(config.replace) ? config.replace : [];
	    if (predicates_1.isString(squash))
	        replace.push({ from: squash, to: undefined });
	    configuredKeys = common_1.map(replace, hof_1.prop("from"));
	    return common_1.filter(defaultPolicy, function (item) { return configuredKeys.indexOf(item.from) === -1; }).concat(replace);
	}
	var Param = (function () {
	    function Param(id, type, config, location) {
	        config = unwrapShorthand(config);
	        type = getType(config, type, location, id);
	        var arrayMode = getArrayMode();
	        type = arrayMode ? type.$asArray(arrayMode, location === DefType.SEARCH) : type;
	        var isOptional = config.value !== undefined;
	        var dynamic = config.dynamic === true;
	        var squash = getSquashPolicy(config, isOptional);
	        var replace = getReplace(config, arrayMode, isOptional, squash);
	        // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
	        function getArrayMode() {
	            var arrayDefaults = { array: (location === DefType.SEARCH ? "auto" : false) };
	            var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
	            return common_1.extend(arrayDefaults, arrayParamNomenclature, config).array;
	        }
	        common_1.extend(this, { id: id, type: type, location: location, squash: squash, replace: replace, isOptional: isOptional, dynamic: dynamic, config: config, array: arrayMode });
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
	        var $$getDefaultValue = function () {
	            if (!coreservices_1.services.$injector)
	                throw new Error("Injectable functions cannot be called at configuration time");
	            var defaultValue = coreservices_1.services.$injector.invoke(_this.config.$$fn);
	            if (defaultValue !== null && defaultValue !== undefined && !_this.type.is(defaultValue))
	                throw new Error("Default value (" + defaultValue + ") for parameter '" + _this.id + "' is not an instance of Type (" + _this.type.name + ")");
	            return defaultValue;
	        };
	        var $replace = function (val) {
	            var replacement = common_1.map(common_1.filter(_this.replace, hof_1.propEq('from', val)), hof_1.prop("to"));
	            return replacement.length ? replacement[0] : val;
	        };
	        value = $replace(value);
	        return !predicates_1.isDefined(value) ? $$getDefaultValue() : this.type.$normalize(value);
	    };
	    Param.prototype.isSearch = function () {
	        return this.location === DefType.SEARCH;
	    };
	    Param.prototype.validates = function (value) {
	        // There was no parameter value, but the param is optional
	        if ((!predicates_1.isDefined(value) || value === null) && this.isOptional)
	            return true;
	        // The value was not of the correct Type, and could not be decoded to the correct Type
	        var normalized = this.type.$normalize(value);
	        if (!this.type.is(normalized))
	            return false;
	        // The value was of the correct type, but when encoded, did not match the Type's regexp
	        var encoded = this.type.encode(normalized);
	        return !(predicates_1.isString(encoded) && !this.type.pattern.exec(encoded));
	    };
	    Param.prototype.toString = function () {
	        return "{Param:" + this.id + " " + this.type + " squash: '" + this.squash + "' optional: " + this.isOptional + "}";
	    };
	    /** Creates a new [[Param]] from a CONFIG block */
	    Param.fromConfig = function (id, type, config) {
	        return new Param(id, type, config, DefType.CONFIG);
	    };
	    /** Creates a new [[Param]] from a url PATH */
	    Param.fromPath = function (id, type, config) {
	        return new Param(id, type, config, DefType.PATH);
	    };
	    /** Creates a new [[Param]] from a url SEARCH */
	    Param.fromSearch = function (id, type, config) {
	        return new Param(id, type, config, DefType.SEARCH);
	    };
	    Param.values = function (params, values) {
	        if (values === void 0) { values = {}; }
	        return params.map(function (param) { return [param.id, param.value(values[param.id])]; }).reduce(common_1.applyPairs, {});
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


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var MatcherConfig = (function () {
	    function MatcherConfig() {
	        this._isCaseInsensitive = false;
	        this._isStrictMode = true;
	        this._defaultSquashPolicy = false;
	    }
	    MatcherConfig.prototype.caseInsensitive = function (value) {
	        return this._isCaseInsensitive = predicates_1.isDefined(value) ? value : this._isCaseInsensitive;
	    };
	    MatcherConfig.prototype.strictMode = function (value) {
	        return this._isStrictMode = predicates_1.isDefined(value) ? value : this._isStrictMode;
	    };
	    MatcherConfig.prototype.defaultSquashPolicy = function (value) {
	        if (predicates_1.isDefined(value) && value !== true && value !== false && !predicates_1.isString(value))
	            throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
	        return this._defaultSquashPolicy = predicates_1.isDefined(value) ? value : this._defaultSquashPolicy;
	    };
	    return MatcherConfig;
	}());
	exports.MatcherConfig = MatcherConfig;
	// TODO: Do not export global instance; create one in UIRouter() constructor
	exports.matcherConfig = new MatcherConfig();


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	/**
	 * Wraps up a `Type` object to handle array values.
	 */
	function ArrayType(type, mode) {
	    var _this = this;
	    // Wrap non-array value as array
	    function arrayWrap(val) { return predicates_1.isArray(val) ? val : (predicates_1.isDefined(val) ? [val] : []); }
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
	    ['encode', 'decode', 'equals', '$normalize'].map(function (name) {
	        _this[name] = (name === 'equals' ? arrayEqualsHandler : arrayHandler)(type[name].bind(type));
	    });
	    common_1.extend(this, {
	        name: type.name,
	        pattern: type.pattern,
	        is: arrayHandler(type.is.bind(type), true),
	        $arrayMode: mode
	    });
	}
	/**
	 * Implements an interface to define custom parameter types that can be decoded from and encoded to
	 * string parameters matched in a URL. Used by [[UrlMatcher]]
	 * objects when matching or formatting URLs, or comparing or validating parameter values.
	 *
	 * See [[UrlMatcherFactory.type]] for more information on registering custom types.
	 *
	 * @example
	 * ```
	 *
	 * {
	 *   decode: function(val) { return parseInt(val, 10); },
	 *   encode: function(val) { return val && val.toString(); },
	 *   equals: function(a, b) { return this.is(a) && a === b; },
	 *   is: function(val) { return angular.isNumber(val) && isFinite(val) && val % 1 === 0; },
	 *   pattern: /\d+/
	 * }
	 * ```
	 */
	var Type = (function () {
	    /**
	     * @param def  A configuration object which contains the custom type definition.  The object's
	     *        properties will override the default methods and/or pattern in `Type`'s public interface.
	     * @returns a new Type object
	     */
	    function Type(def) {
	        this.pattern = /.*/;
	        common_1.extend(this, def);
	    }
	    // consider these four methods to be "abstract methods" that should be overridden
	    /** @inheritdoc */
	    Type.prototype.is = function (val, key) { return true; };
	    /** @inheritdoc */
	    Type.prototype.encode = function (val, key) { return val; };
	    /** @inheritdoc */
	    Type.prototype.decode = function (val, key) { return val; };
	    /** @inheritdoc */
	    Type.prototype.equals = function (a, b) { return a == b; };
	    Type.prototype.$subPattern = function () {
	        var sub = this.pattern.toString();
	        return sub.substr(1, sub.length - 2);
	    };
	    Type.prototype.toString = function () {
	        return "{Type:" + this.name + "}";
	    };
	    /** Given an encoded string, or a decoded object, returns a decoded object */
	    Type.prototype.$normalize = function (val) {
	        return this.is(val) ? val : this.decode(val);
	    };
	    /**
	     * Wraps an existing custom Type as an array of Type, depending on 'mode'.
	     * e.g.:
	     * - urlmatcher pattern "/path?{queryParam[]:int}"
	     * - url: "/path?queryParam=1&queryParam=2
	     * - $stateParams.queryParam will be [1, 2]
	     * if `mode` is "auto", then
	     * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
	     * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
	     */
	    Type.prototype.$asArray = function (mode, isSearch) {
	        if (!mode)
	            return this;
	        if (mode === "auto" && !isSearch)
	            throw new Error("'auto' array mode is for query parameters only");
	        return new ArrayType(this, mode);
	    };
	    return Type;
	}());
	exports.Type = Type;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var coreservices_1 = __webpack_require__(6);
	var type_1 = __webpack_require__(23);
	// Use tildes to pre-encode slashes.
	// If the slashes are simply URLEncoded, the browser can choose to pre-decode them,
	// and bidirectional encoding/decoding fails.
	// Tilde was chosen because it's not a RFC 3986 section 2.2 Reserved Character
	function valToString(val) { return val != null ? val.toString().replace(/~/g, "~~").replace(/\//g, "~2F") : val; }
	function valFromString(val) { return val != null ? val.toString().replace(/~2F/g, "/").replace(/~~/g, "~") : val; }
	var ParamTypes = (function () {
	    function ParamTypes() {
	        this.enqueue = true;
	        this.typeQueue = [];
	        this.defaultTypes = {
	            "hash": {
	                encode: valToString,
	                decode: valFromString,
	                is: hof_1.is(String),
	                pattern: /.*/,
	                equals: hof_1.val(true)
	            },
	            "string": {
	                encode: valToString,
	                decode: valFromString,
	                is: hof_1.is(String),
	                pattern: /[^/]*/
	            },
	            "int": {
	                encode: valToString,
	                decode: function (val) { return parseInt(val, 10); },
	                is: function (val) { return predicates_1.isDefined(val) && this.decode(val.toString()) === val; },
	                pattern: /-?\d+/
	            },
	            "bool": {
	                encode: function (val) { return val && 1 || 0; },
	                decode: function (val) { return parseInt(val, 10) !== 0; },
	                is: hof_1.is(Boolean),
	                pattern: /0|1/
	            },
	            "date": {
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
	            },
	            "json": {
	                encode: common_1.toJson,
	                decode: common_1.fromJson,
	                is: hof_1.is(Object),
	                equals: common_1.equals,
	                pattern: /[^/]*/
	            },
	            "any": {
	                encode: common_1.identity,
	                decode: common_1.identity,
	                equals: common_1.equals,
	                pattern: /.*/
	            }
	        };
	        // Register default types. Store them in the prototype of this.types.
	        var makeType = function (definition, name) { return new type_1.Type(common_1.extend({ name: name }, definition)); };
	        this.types = common_1.inherit(common_1.map(this.defaultTypes, makeType), {});
	    }
	    ParamTypes.prototype.type = function (name, definition, definitionFn) {
	        if (!predicates_1.isDefined(definition))
	            return this.types[name];
	        if (this.types.hasOwnProperty(name))
	            throw new Error("A type named '" + name + "' has already been defined.");
	        this.types[name] = new type_1.Type(common_1.extend({ name: name }, definition));
	        if (definitionFn) {
	            this.typeQueue.push({ name: name, def: definitionFn });
	            if (!this.enqueue)
	                this._flushTypeQueue();
	        }
	        return this;
	    };
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
	exports.paramTypes = new ParamTypes();


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
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


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var hof_1 = __webpack_require__(5);
	var param_1 = __webpack_require__(21);
	var rejectFactory_1 = __webpack_require__(10);
	var targetState_1 = __webpack_require__(27);
	var viewHooks_1 = __webpack_require__(28);
	var enterExitHooks_1 = __webpack_require__(29);
	var resolveHooks_1 = __webpack_require__(30);
	var coreservices_1 = __webpack_require__(6);
	/**
	 * This class:
	 *
	 * * Takes a blank transition object and adds all the hooks necessary for it to behave like a state transition.
	 *
	 * * Runs the transition, returning a chained promise which:
	 *   * transforms the resolved Transition.promise to the final destination state.
	 *   * manages the rejected Transition.promise, checking for Dynamic or Redirected transitions
	 *
	 * * Registers a handler to update global $state data such as "active transitions" and "current state/params"
	 *
	 * * Registers view hooks, which maintain the list of active view configs and sync with/update the ui-views
	 *
	 * * Registers onEnter/onRetain/onExit hooks which delegate to the state's hooks of the same name, at the appropriate time
	 *
	 * * Registers eager and lazy resolve hooks
	 */
	var TransitionManager = (function () {
	    function TransitionManager(transition, $transitions, $urlRouter, $view, // service
	        $state, globals) {
	        this.transition = transition;
	        this.$transitions = $transitions;
	        this.$urlRouter = $urlRouter;
	        this.$view = $view;
	        this.$state = $state;
	        this.globals = globals;
	        this.$q = coreservices_1.services.$q;
	        this.viewHooks = new viewHooks_1.ViewHooks(transition, $view);
	        this.enterExitHooks = new enterExitHooks_1.EnterExitHooks(transition);
	        this.resolveHooks = new resolveHooks_1.ResolveHooks(transition);
	        this.treeChanges = transition.treeChanges();
	        this.registerUpdateGlobalState();
	        this.viewHooks.registerHooks();
	        this.enterExitHooks.registerHooks();
	        this.resolveHooks.registerHooks();
	    }
	    TransitionManager.prototype.runTransition = function () {
	        var _this = this;
	        this.globals.transitionHistory.enqueue(this.transition);
	        return this.transition.run()
	            .then(function (trans) { return trans.to(); }) // resolve to the final state (TODO: good? bad?)
	            .catch(function (error) { return _this.transRejected(error); }); // if rejected, handle dynamic and redirect
	    };
	    TransitionManager.prototype.registerUpdateGlobalState = function () {
	        // After globals.current is updated at priority: 10000
	        this.transition.onSuccess({}, this.updateUrl.bind(this), { priority: 9999 });
	    };
	    TransitionManager.prototype.transRejected = function (error) {
	        var _a = this, transition = _a.transition, $state = _a.$state, $q = _a.$q;
	        // Handle redirect and abort
	        if (error instanceof rejectFactory_1.TransitionRejection) {
	            if (error.type === rejectFactory_1.RejectType.IGNORED) {
	                // Update $stateParmas/$state.params/$location.url if transition ignored, but dynamic params have changed.
	                var dynamic = $state.$current.parameters().filter(hof_1.prop('dynamic'));
	                if (!param_1.Param.equals(dynamic, $state.params, transition.params())) {
	                    this.updateUrl();
	                }
	                return $state.current;
	            }
	            if (error.type === rejectFactory_1.RejectType.SUPERSEDED && error.redirected && error.detail instanceof targetState_1.TargetState) {
	                return this._redirectMgr(transition.redirect(error.detail)).runTransition();
	            }
	            if (error.type === rejectFactory_1.RejectType.ABORTED) {
	                this.$urlRouter.update();
	            }
	        }
	        this.$transitions.defaultErrorHandler()(error);
	        return $q.reject(error);
	    };
	    TransitionManager.prototype.updateUrl = function () {
	        var transition = this.transition;
	        var _a = this, $urlRouter = _a.$urlRouter, $state = _a.$state;
	        var options = transition.options();
	        var toState = transition.$to();
	        if (options.location && $state.$current.navigable) {
	            $urlRouter.push($state.$current.navigable.url, $state.params, { replace: options.location === 'replace' });
	        }
	        $urlRouter.update(true);
	    };
	    TransitionManager.prototype._redirectMgr = function (redirect) {
	        var _a = this, $transitions = _a.$transitions, $urlRouter = _a.$urlRouter, $view = _a.$view, $state = _a.$state, globals = _a.globals;
	        return new TransitionManager(redirect, $transitions, $urlRouter, $view, $state, globals);
	    };
	    return TransitionManager;
	}());
	exports.TransitionManager = TransitionManager;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/** @module state */ /** for typedoc */
	"use strict";
	/**
	 * @ngdoc object
	 * @name ui.router.state.type:TargetState
	 *
	 * @description
	 * Encapsulate the desired target of a transition.
	 * Wraps an identifier for a state, a set of parameters, and transition options with the definition of the state.
	 *
	 * @param {StateOrName} _identifier  An identifier for a state. Either a fully-qualified path, or the object
	 *            used to define the state.
	 * @param {IState} _definition The `State` object definition.
	 * @param {ParamsOrArray} _params Parameters for the target state
	 * @param {TransitionOptions} _options Transition options.
	 */
	var TargetState = (function () {
	    function TargetState(_identifier, _definition, _params, _options) {
	        if (_params === void 0) { _params = {}; }
	        if (_options === void 0) { _options = {}; }
	        this._identifier = _identifier;
	        this._definition = _definition;
	        this._options = _options;
	        this._params = _params || {};
	    }
	    TargetState.prototype.name = function () {
	        return this._definition && this._definition.name || this._identifier;
	    };
	    TargetState.prototype.identifier = function () {
	        return this._identifier;
	    };
	    TargetState.prototype.params = function () {
	        return this._params;
	    };
	    TargetState.prototype.$state = function () {
	        return this._definition;
	    };
	    TargetState.prototype.state = function () {
	        return this._definition && this._definition.self;
	    };
	    TargetState.prototype.options = function () {
	        return this._options;
	    };
	    TargetState.prototype.exists = function () {
	        return !!(this._definition && this._definition.self);
	    };
	    TargetState.prototype.valid = function () {
	        return !this.error();
	    };
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
	    return TargetState;
	}());
	exports.TargetState = TargetState;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var coreservices_1 = __webpack_require__(6);
	var ViewHooks = (function () {
	    function ViewHooks(transition, $view) {
	        this.transition = transition;
	        this.$view = $view;
	        this.treeChanges = transition.treeChanges();
	        this.enteringViews = transition.views("entering");
	        this.exitingViews = transition.views("exiting");
	    }
	    ViewHooks.prototype.loadAllEnteringViews = function () {
	        return coreservices_1.services.$q.all(this.enteringViews.map(function (view) { return view.load(); })).then(common_1.noop);
	    };
	    ViewHooks.prototype.updateViews = function () {
	        var $view = this.$view;
	        this.exitingViews.forEach(function (viewConfig) { return $view.deactivateViewConfig(viewConfig); });
	        this.enteringViews.forEach(function (viewConfig) { return $view.activateViewConfig(viewConfig); });
	        $view.sync();
	    };
	    ViewHooks.prototype.registerHooks = function () {
	        if (this.enteringViews.length) {
	            this.transition.onStart({}, this.loadAllEnteringViews.bind(this));
	        }
	        if (this.exitingViews.length || this.enteringViews.length)
	            this.transition.onSuccess({}, this.updateViews.bind(this));
	    };
	    return ViewHooks;
	}());
	exports.ViewHooks = ViewHooks;


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	var EnterExitHooks = (function () {
	    function EnterExitHooks(transition) {
	        this.transition = transition;
	    }
	    EnterExitHooks.prototype.registerHooks = function () {
	        this.registerOnEnterHooks();
	        this.registerOnRetainHooks();
	        this.registerOnExitHooks();
	    };
	    EnterExitHooks.prototype.registerOnEnterHooks = function () {
	        var _this = this;
	        this.transition.entering().filter(function (state) { return !!state.onEnter; })
	            .forEach(function (state) { return _this.transition.onEnter({ entering: state.name }, state.onEnter); });
	    };
	    EnterExitHooks.prototype.registerOnRetainHooks = function () {
	        var _this = this;
	        this.transition.retained().filter(function (state) { return !!state.onRetain; })
	            .forEach(function (state) { return _this.transition.onRetain({ retained: state.name }, state.onRetain); });
	    };
	    EnterExitHooks.prototype.registerOnExitHooks = function () {
	        var _this = this;
	        this.transition.exiting().filter(function (state) { return !!state.onExit; })
	            .forEach(function (state) { return _this.transition.onExit({ exiting: state.name }, state.onExit); });
	    };
	    return EnterExitHooks;
	}());
	exports.EnterExitHooks = EnterExitHooks;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var interface_1 = __webpack_require__(31);
	var hof_2 = __webpack_require__(5);
	var resolvable_1 = __webpack_require__(32);
	var LAZY = interface_1.ResolvePolicy[interface_1.ResolvePolicy.LAZY];
	var EAGER = interface_1.ResolvePolicy[interface_1.ResolvePolicy.EAGER];
	/**
	 * Registers Eager and Lazy (for entering states) resolve hooks
	 *
	 * * registers a hook that resolves EAGER resolves, for the To Path, onStart of the transition
	 * * registers a hook that resolves LAZY resolves, for each state, before it is entered
	 */
	var ResolveHooks = (function () {
	    function ResolveHooks(transition) {
	        this.transition = transition;
	    }
	    ResolveHooks.prototype.registerHooks = function () {
	        var treeChanges = this.transition.treeChanges();
	        /** a function which resolves any EAGER Resolvables for a Path */
	        $eagerResolvePath.$inject = ['$transition$'];
	        function $eagerResolvePath($transition$) {
	            return common_1.tail(treeChanges.to).resolveContext.resolvePath(common_1.extend({ transition: $transition$ }, { resolvePolicy: EAGER }));
	        }
	        /** Returns a function which pre-resolves any LAZY Resolvables for a Node in a Path */
	        $lazyResolveEnteringState.$inject = ['$state$', '$transition$'];
	        function $lazyResolveEnteringState($state$, $transition$) {
	            var node = common_1.find(treeChanges.entering, hof_1.propEq('state', $state$));
	            // A new Resolvable contains all the resolved data in this context as a single object, for injection as `$resolve$`
	            var context = node.resolveContext;
	            var $resolve$ = new resolvable_1.Resolvable("$resolve$", function () { return common_1.map(context.getResolvables(), function (r) { return r.data; }); });
	            var options = common_1.extend({ transition: $transition$ }, { resolvePolicy: LAZY });
	            // Resolve all the LAZY resolves, then resolve the `$resolve$` object, then add `$resolve$` to the context
	            return context.resolvePathElement(node.state, options)
	                .then(function () { return $resolve$.resolveResolvable(context); })
	                .then(function () { return context.addResolvables({ $resolve$: $resolve$ }, node.state); });
	        }
	        // Resolve eager resolvables before when the transition starts
	        this.transition.onStart({}, $eagerResolvePath, { priority: 1000 });
	        // Resolve lazy resolvables before each state is entered
	        this.transition.onEnter({ entering: hof_2.val(true) }, $lazyResolveEnteringState, { priority: 1000 });
	    };
	    return ResolveHooks;
	}());
	exports.ResolveHooks = ResolveHooks;


/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	// Defines the available policies and their ordinals.
	(function (ResolvePolicy) {
	    ResolvePolicy[ResolvePolicy["JIT"] = 0] = "JIT";
	    ResolvePolicy[ResolvePolicy["LAZY"] = 1] = "LAZY";
	    ResolvePolicy[ResolvePolicy["EAGER"] = 2] = "EAGER"; // Eager resolves are resolved before the transition starts.
	})(exports.ResolvePolicy || (exports.ResolvePolicy = {}));
	var ResolvePolicy = exports.ResolvePolicy;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module resolve */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var trace_1 = __webpack_require__(12);
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
	    function Resolvable(name, resolveFn, preResolvedData) {
	        this.promise = undefined;
	        common_1.extend(this, {
	            name: name,
	            resolveFn: resolveFn,
	            deps: coreservices_1.services.$injector.annotate(resolveFn, coreservices_1.services.$injector.strictDi),
	            data: preResolvedData
	        });
	    }
	    // synchronous part:
	    // - sets up the Resolvable's promise
	    // - retrieves dependencies' promises
	    // - returns promise for async part
	    // asynchronous part:
	    // - wait for dependencies promises to resolve
	    // - invoke the resolveFn
	    // - wait for resolveFn promise to resolve
	    // - store unwrapped data
	    // - resolve the Resolvable's promise
	    Resolvable.prototype.resolveResolvable = function (resolveContext, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var _a = this, name = _a.name, deps = _a.deps, resolveFn = _a.resolveFn;
	        trace_1.trace.traceResolveResolvable(this, options);
	        // First, set up an overall deferred/promise for this Resolvable
	        var deferred = coreservices_1.services.$q.defer();
	        this.promise = deferred.promise;
	        // Load a map of all resolvables for this state from the context path
	        // Omit the current Resolvable from the result, so we don't try to inject this into this
	        var ancestorsByName = resolveContext.getResolvables(null, { omitOwnLocals: [name] });
	        // Limit the ancestors Resolvables map to only those that the current Resolvable fn's annotations depends on
	        var depResolvables = common_1.pick(ancestorsByName, deps);
	        // Get promises (or synchronously invoke resolveFn) for deps
	        var depPromises = common_1.map(depResolvables, function (resolvable) { return resolvable.get(resolveContext, options); });
	        // Return a promise chain that waits for all the deps to resolve, then invokes the resolveFn passing in the
	        // dependencies as locals, then unwraps the resulting promise's data.
	        return coreservices_1.services.$q.all(depPromises).then(function (locals) {
	            try {
	                var result = coreservices_1.services.$injector.invoke(resolveFn, null, locals);
	                deferred.resolve(result);
	            }
	            catch (error) {
	                deferred.reject(error);
	            }
	            return _this.promise;
	        }).then(function (data) {
	            _this.data = data;
	            trace_1.trace.traceResolvableResolved(_this, options);
	            return _this.promise;
	        });
	    };
	    Resolvable.prototype.get = function (resolveContext, options) {
	        return this.promise || this.resolveResolvable(resolveContext, options);
	    };
	    Resolvable.prototype.toString = function () {
	        return "Resolvable(name: " + this.name + ", requires: [" + this.deps + "])";
	    };
	    /**
	     * Validates the result map as a "resolve:" style object, then transforms the resolves into Resolvables
	     */
	    Resolvable.makeResolvables = function (resolves) {
	        // If a hook result is an object, it should be a map of strings to functions.
	        var invalid = common_1.filter(resolves, hof_1.not(predicates_1.isInjectable)), keys = Object.keys(invalid);
	        if (keys.length)
	            throw new Error("Invalid resolve key/value: " + keys[0] + "/" + invalid[keys[0]]);
	        return common_1.map(resolves, function (fn, name) { return new Resolvable(name, fn); });
	    };
	    return Resolvable;
	}());
	exports.Resolvable = Resolvable;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/** @module state */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	/**
	 * @ngdoc object
	 * @name ui.router.state.type:State
	 *
	 * @description
	 * Definition object for states. Includes methods for manipulating the state heirarchy.
	 *
	 * @param {Object} config  A configuration object hash that includes the results of user-supplied
	 *        values, as well as values from `StateBuilder`.
	 *
	 * @returns {Object}  Returns a new `State` object.
	 */
	var State = (function () {
	    function State(config) {
	        common_1.extend(this, config);
	        // Object.freeze(this);
	    }
	    /**
	     * @ngdoc function
	     * @name ui.router.state.type:State#is
	     * @methodOf ui.router.state.type:State
	     *
	     * @description
	     * Compares the identity of the state against the passed value, which is either an object
	     * reference to the actual `State` instance, the original definition object passed to
	     * `$stateProvider.state()`, or the fully-qualified name.
	     *
	     * @param {Object} ref Can be one of (a) a `State` instance, (b) an object that was passed
	     *        into `$stateProvider.state()`, (c) the fully-qualified name of a state as a string.
	     * @returns {boolean} Returns `true` if `ref` matches the current `State` instance.
	     */
	    State.prototype.is = function (ref) {
	        return this === ref || this.self === ref || this.fqn() === ref;
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.state.type:State#fqn
	     * @methodOf ui.router.state.type:State
	     *
	     * @description
	     * Returns the fully-qualified name of the state, based on its current position in the tree.
	     *
	     * @returns {string} Returns a dot-separated name of the state.
	     */
	    State.prototype.fqn = function () {
	        if (!this.parent || !(this.parent instanceof this.constructor))
	            return this.name;
	        var name = this.parent.fqn();
	        return name ? name + "." + this.name : this.name;
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.state.type:State#root
	     * @methodOf ui.router.state.type:State
	     *
	     * @description
	     * Returns the root node of this state's tree.
	     *
	     * @returns {State} The root of this state's tree.
	     */
	    State.prototype.root = function () {
	        return this.parent && this.parent.root() || this;
	    };
	    State.prototype.parameters = function (opts) {
	        opts = common_1.defaults(opts, { inherit: true });
	        var inherited = opts.inherit && this.parent && this.parent.parameters() || [];
	        return inherited.concat(common_1.values(this.params));
	    };
	    State.prototype.parameter = function (id, opts) {
	        if (opts === void 0) { opts = {}; }
	        return (this.url && this.url.parameter(id, opts) ||
	            common_1.find(common_1.values(this.params), hof_1.propEq('id', id)) ||
	            opts.inherit && this.parent && this.parent.parameter(id));
	    };
	    State.prototype.toString = function () {
	        return this.fqn();
	    };
	    return State;
	}());
	exports.State = State;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var StateMatcher = (function () {
	    function StateMatcher(_states) {
	        this._states = _states;
	    }
	    StateMatcher.prototype.isRelative = function (stateName) {
	        stateName = stateName || "";
	        return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
	    };
	    StateMatcher.prototype.find = function (stateOrName, base) {
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


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var module_1 = __webpack_require__(17);
	var StateQueueManager = (function () {
	    function StateQueueManager(states, builder, $urlRouterProvider) {
	        this.states = states;
	        this.builder = builder;
	        this.$urlRouterProvider = $urlRouterProvider;
	        this.queue = [];
	    }
	    StateQueueManager.prototype.register = function (config) {
	        var _a = this, states = _a.states, queue = _a.queue, $state = _a.$state;
	        // Wrap a new object around the state so we can store our private details easily.
	        // @TODO: state = new State(extend({}, config, { ... }))
	        var state = common_1.inherit(new module_1.State(), common_1.extend({}, config, {
	            self: config,
	            resolve: config.resolve || {},
	            toString: function () { return config.name; }
	        }));
	        if (!predicates_1.isString(state.name))
	            throw new Error("State must have a valid name");
	        if (states.hasOwnProperty(state.name) || common_1.pluck(queue, 'name').indexOf(state.name) !== -1)
	            throw new Error("State '" + state.name + "' is already defined");
	        queue.push(state);
	        if (this.$state) {
	            this.flush($state);
	        }
	        return state;
	    };
	    StateQueueManager.prototype.flush = function ($state) {
	        var _a = this, queue = _a.queue, states = _a.states, builder = _a.builder;
	        var result, state, orphans = [], orphanIdx, previousQueueLength = {};
	        while (queue.length > 0) {
	            state = queue.shift();
	            result = builder.build(state);
	            orphanIdx = orphans.indexOf(state);
	            if (result) {
	                if (states.hasOwnProperty(state.name))
	                    throw new Error("State '" + name + "' is already defined");
	                states[state.name] = state;
	                this.attachRoute($state, state);
	                if (orphanIdx >= 0)
	                    orphans.splice(orphanIdx, 1);
	                continue;
	            }
	            var prev = previousQueueLength[state.name];
	            previousQueueLength[state.name] = queue.length;
	            if (orphanIdx >= 0 && prev === queue.length) {
	                // Wait until two consecutive iterations where no additional states were dequeued successfully.
	                throw new Error("Cannot register orphaned state '" + state.name + "'");
	            }
	            else if (orphanIdx < 0) {
	                orphans.push(state);
	            }
	            queue.push(state);
	        }
	        return states;
	    };
	    StateQueueManager.prototype.autoFlush = function ($state) {
	        this.$state = $state;
	        this.flush($state);
	    };
	    StateQueueManager.prototype.attachRoute = function ($state, state) {
	        var $urlRouterProvider = this.$urlRouterProvider;
	        if (state[common_1.abstractKey] || !state.url)
	            return;
	        $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
	                if ($state.$current.navigable !== state || !common_1.equalForKeys($match, $stateParams)) {
	                    $state.transitionTo(state, $match, { inherit: true });
	                }
	            }]);
	    };
	    return StateQueueManager;
	}());
	exports.StateQueueManager = StateQueueManager;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/** @module state */ /** for typedoc */
	"use strict";
	var stateMatcher_1 = __webpack_require__(34);
	var stateBuilder_1 = __webpack_require__(19);
	var stateQueueManager_1 = __webpack_require__(35);
	var StateRegistry = (function () {
	    function StateRegistry(urlMatcherFactory, urlRouterProvider) {
	        this.states = {};
	        this.matcher = new stateMatcher_1.StateMatcher(this.states);
	        this.builder = new stateBuilder_1.StateBuilder(this.matcher, urlMatcherFactory);
	        this.stateQueue = new stateQueueManager_1.StateQueueManager(this.states, this.builder, urlRouterProvider);
	        var rootStateDef = {
	            name: '',
	            url: '^',
	            views: null,
	            params: {
	                '#': { value: null, type: 'hash' }
	            },
	            abstract: true
	        };
	        var _root = this._root = this.stateQueue.register(rootStateDef);
	        _root.navigable = null;
	    }
	    StateRegistry.prototype.root = function () {
	        return this._root;
	    };
	    StateRegistry.prototype.register = function (stateDefinition) {
	        return this.stateQueue.register(stateDefinition);
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


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var queue_1 = __webpack_require__(8);
	var coreservices_1 = __webpack_require__(6);
	var pathFactory_1 = __webpack_require__(38);
	var node_1 = __webpack_require__(39);
	var transitionService_1 = __webpack_require__(43);
	var rejectFactory_1 = __webpack_require__(10);
	var targetState_1 = __webpack_require__(27);
	var transitionManager_1 = __webpack_require__(26);
	var param_1 = __webpack_require__(21);
	var glob_1 = __webpack_require__(7);
	var common_2 = __webpack_require__(3);
	var common_3 = __webpack_require__(3);
	var StateService = (function () {
	    function StateService($view, $urlRouter, $transitions, stateRegistry, stateProvider, globals) {
	        this.$view = $view;
	        this.$urlRouter = $urlRouter;
	        this.$transitions = $transitions;
	        this.stateRegistry = stateRegistry;
	        this.stateProvider = stateProvider;
	        this.globals = globals;
	        this.rejectFactory = new rejectFactory_1.RejectFactory();
	        var getters = ['current', '$current', 'params', 'transition'];
	        var boundFns = Object.keys(StateService.prototype).filter(function (key) { return getters.indexOf(key) === -1; });
	        common_3.bindFunctions(StateService.prototype, this, this, boundFns);
	    }
	    Object.defineProperty(StateService.prototype, "transition", {
	        get: function () { return this.globals.transition; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(StateService.prototype, "params", {
	        get: function () { return this.globals.params; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(StateService.prototype, "current", {
	        get: function () { return this.globals.current; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(StateService.prototype, "$current", {
	        get: function () { return this.globals.$current; },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Invokes the onInvalid callbacks, in natural order.  Each callback's return value is checked in sequence
	     * until one of them returns an instance of TargetState.   The results of the callbacks are wrapped
	     * in $q.when(), so the callbacks may return promises.
	     *
	     * If a callback returns an TargetState, then it is used as arguments to $state.transitionTo() and
	     * the result returned.
	     */
	    StateService.prototype._handleInvalidTargetState = function (fromPath, $to$) {
	        var _this = this;
	        var latestThing = function () { return _this.globals.transitionHistory.peekTail(); };
	        var latest = latestThing();
	        var $from$ = pathFactory_1.PathFactory.makeTargetState(fromPath);
	        var callbackQueue = new queue_1.Queue([].concat(this.stateProvider.invalidCallbacks));
	        var rejectFactory = this.rejectFactory;
	        var $q = coreservices_1.services.$q, $injector = coreservices_1.services.$injector;
	        var invokeCallback = function (callback) { return $q.when($injector.invoke(callback, null, { $to$: $to$, $from$: $from$ })); };
	        var checkForRedirect = function (result) {
	            if (!(result instanceof targetState_1.TargetState)) {
	                return;
	            }
	            var target = result;
	            // Recreate the TargetState, in case the state is now defined.
	            target = _this.target(target.identifier(), target.params(), target.options());
	            if (!target.valid())
	                return rejectFactory.invalid(target.error());
	            if (latestThing() !== latest)
	                return rejectFactory.superseded();
	            return _this.transitionTo(target.identifier(), target.params(), target.options());
	        };
	        function invokeNextCallback() {
	            var nextCallback = callbackQueue.dequeue();
	            if (nextCallback === undefined)
	                return rejectFactory.invalid($to$.error());
	            return invokeCallback(nextCallback).then(checkForRedirect).then(function (result) { return result || invokeNextCallback(); });
	        }
	        return invokeNextCallback();
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#reload
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A method that force reloads the current state, or a partial state hierarchy. All resolves are re-resolved,
	     * controllers reinstantiated, and events re-fired.
	     *
	     * @example
	     * <pre>
	     * let app angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.reload = function(){
	     *     $state.reload();
	     *   }
	     * });
	     * </pre>
	     *
	     * `reload()` is just an alias for:
	     * <pre>
	     * $state.transitionTo($state.current, $stateParams, {
	     *   reload: true, inherit: false, notify: true
	     * });
	     * </pre>
	     *
	     * @param {string=|object=} reloadState - A state name or a state object, which is the root of the resolves to be re-resolved.
	     * @example
	     * <pre>
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
	     * </pre>
	     *
	     * @returns {promise} A promise representing the state of the new transition. See
	     * {@link ui.router.state.$state#methods_go $state.go}.
	     */
	    StateService.prototype.reload = function (reloadState) {
	        return this.transitionTo(this.current, this.params, {
	            reload: predicates_1.isDefined(reloadState) ? reloadState : true,
	            inherit: false,
	            notify: false
	        });
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#go
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Convenience method for transitioning to a new state. `$state.go` calls
	     * `$state.transitionTo` internally but automatically sets options to
	     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`.
	     * This allows you to easily use an absolute or relative to path and specify
	     * only the parameters you'd like to update (while letting unspecified parameters
	     * inherit from the currently active ancestor states).
	     *
	     * @example
	     * <pre>
	     * let app = angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.changeState = function () {
	     *     $state.go('contact.detail');
	     *   };
	     * });
	     * </pre>
	     * <img src='../ngdoc_assets/StateGoExamples.png'/>
	     *
	     * @param {string} to Absolute state name or relative state path. Some examples:
	     *
	     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
	     * - `$state.go('^')` - will go to a parent state
	     * - `$state.go('^.sibling')` - will go to a sibling state
	     * - `$state.go('.child.grandchild')` - will go to grandchild state
	     *
	     * @param {object=} params A map of the parameters that will be sent to the state,
	     * will populate $stateParams. Any parameters that are not specified will be inherited from currently
	     * defined parameters. This allows, for example, going to a sibling state that shares parameters
	     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
	     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
	     * will get you all current parameters, etc.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'),
	     *    defines which state to be relative from.
	     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params
	     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
	     *    use this when you want to force a reload when *everything* is the same, including search params.
	     *
	     * @returns {promise} A promise representing the state of the new transition.
	     *
	     * Possible success values:
	     *
	     * - $state.current
	     *
	     * <br/>Possible rejection values:
	     *
	     * - 'transition superseded' - when a newer transition has been started after this one
	     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
	     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
	     *   when a `$stateNotFound` `event.retry` promise errors.
	     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
	     * - *resolve error* - when an error has occurred with a `resolve`
	     *
	     */
	    StateService.prototype.go = function (to, params, options) {
	        var defautGoOpts = { relative: this.$current, inherit: true };
	        var transOpts = common_1.defaults(options, defautGoOpts, transitionService_1.defaultTransOpts);
	        return this.transitionTo(to, params, transOpts);
	    };
	    ;
	    /** Factory method for creating a TargetState */
	    StateService.prototype.target = function (identifier, params, options) {
	        if (options === void 0) { options = {}; }
	        // If we're reloading, find the state object to reload from
	        if (predicates_1.isObject(options.reload) && !options.reload.name)
	            throw new Error('Invalid reload state object');
	        options.reloadState = options.reload === true ? this.stateRegistry.root() : this.stateRegistry.matcher.find(options.reload, options.relative);
	        if (options.reload && !options.reloadState)
	            throw new Error("No such reload state '" + (predicates_1.isString(options.reload) ? options.reload : options.reload.name) + "'");
	        var stateDefinition = this.stateRegistry.matcher.find(identifier, options.relative);
	        return new targetState_1.TargetState(identifier, stateDefinition, params, options);
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#transitionTo
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
	     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
	     *
	     * @example
	     * <pre>
	     * let app = angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.changeState = function () {
	     *     $state.transitionTo('contact.detail');
	     *   };
	     * });
	     * </pre>
	     *
	     * @param {string} to State name.
	     * @param {object=} toParams A map of the parameters that will be sent to the state,
	     * will populate $stateParams.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'),
	     *    defines which state to be relative from.
	     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params
	     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
	     *    use this when you want to force a reload when *everything* is the same, including search params.
	     *
	     * @returns {promise} A promise representing the state of the new transition. See
	     * {@link ui.router.state.$state#methods_go $state.go}.
	     */
	    StateService.prototype.transitionTo = function (to, toParams, options) {
	        var _this = this;
	        if (toParams === void 0) { toParams = {}; }
	        if (options === void 0) { options = {}; }
	        var transHistory = this.globals.transitionHistory;
	        options = common_1.defaults(options, transitionService_1.defaultTransOpts);
	        options = common_1.extend(options, { current: transHistory.peekTail.bind(transHistory) });
	        var ref = this.target(to, toParams, options);
	        var latestSuccess = this.globals.successfulTransitions.peekTail();
	        var rootPath = function () { return pathFactory_1.PathFactory.bindTransNodesToPath([new node_1.Node(_this.stateRegistry.root())]); };
	        var currentPath = latestSuccess ? latestSuccess.treeChanges().to : rootPath();
	        if (!ref.exists())
	            return this._handleInvalidTargetState(currentPath, ref);
	        if (!ref.valid())
	            return coreservices_1.services.$q.reject(ref.error());
	        var transition = this.$transitions.create(currentPath, ref);
	        var tMgr = new transitionManager_1.TransitionManager(transition, this.$transitions, this.$urlRouter, this.$view, this, this.globals);
	        var transitionPromise = tMgr.runTransition();
	        // Return a promise for the transition, which also has the transition object on it.
	        return common_1.extend(transitionPromise, { transition: transition });
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#is
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
	     * but only checks for the full state name. If params is supplied then it will be
	     * tested for strict equality against the current active params object, so all params
	     * must match with none missing and no extras.
	     *
	     * @example
	     * <pre>
	     * $state.$current.name = 'contacts.details.item';
	     *
	     * // absolute name
	     * $state.is('contact.details.item'); // returns true
	     * $state.is(contactDetailItemStateObject); // returns true
	     *
	     * // relative name (. and ^), typically from a template
	     * // E.g. from the 'contacts.details' template
	     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
	     * </pre>
	     *
	     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
	     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
	     * to test against the current active state.
	     * @param {object=} options An options object.  The options are:
	     *
	     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
	     * test relative to `options.relative` state (or name).
	     *
	     * @returns {boolean} Returns true if it is the state.
	     */
	    StateService.prototype.is = function (stateOrName, params, options) {
	        options = common_1.defaults(options, { relative: this.$current });
	        var state = this.stateRegistry.matcher.find(stateOrName, options.relative);
	        if (!predicates_1.isDefined(state))
	            return undefined;
	        if (this.$current !== state)
	            return false;
	        return predicates_1.isDefined(params) && params !== null ? param_1.Param.equals(state.parameters(), this.params, params) : true;
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#includes
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A method to determine if the current active state is equal to or is the child of the
	     * state stateName. If any params are passed then they will be tested for a match as well.
	     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
	     *
	     * @example
	     * Partial and relative names
	     * <pre>
	     * $state.$current.name = 'contacts.details.item';
	     *
	     * // Using partial names
	     * $state.includes("contacts"); // returns true
	     * $state.includes("contacts.details"); // returns true
	     * $state.includes("contacts.details.item"); // returns true
	     * $state.includes("contacts.list"); // returns false
	     * $state.includes("about"); // returns false
	     *
	     * // Using relative names (. and ^), typically from a template
	     * // E.g. from the 'contacts.details' template
	     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
	     * </pre>
	     *
	     * Basic globbing patterns
	     * <pre>
	     * $state.$current.name = 'contacts.details.item.url';
	     *
	     * $state.includes("*.details.*.*"); // returns true
	     * $state.includes("*.details.**"); // returns true
	     * $state.includes("**.item.**"); // returns true
	     * $state.includes("*.details.item.url"); // returns true
	     * $state.includes("*.details.*.url"); // returns true
	     * $state.includes("*.details.*"); // returns false
	     * $state.includes("item.**"); // returns false
	     * </pre>
	     *
	     * @param {string} stateOrName A partial name, relative name, or glob pattern
	     * to be searched for within the current state name.
	     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
	     * that you'd like to test against the current active state.
	     * @param {object=} options An options object.  The options are:
	     *
	     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
	     * .includes will test relative to `options.relative` state (or name).
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
	        var state = this.stateRegistry.matcher.find(stateOrName, options.relative), include = this.$current.includes;
	        if (!predicates_1.isDefined(state))
	            return undefined;
	        if (!predicates_1.isDefined(include[state.name]))
	            return false;
	        // @TODO Replace with Param.equals() ?
	        return params ? common_2.equalForKeys(param_1.Param.values(state.parameters(), params), this.params, Object.keys(params)) : true;
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#href
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A url generation method that returns the compiled url for the given state populated with the given params.
	     *
	     * @example
	     * <pre>
	     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
	     * </pre>
	     *
	     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
	     * @param {object=} params An object of parameter values to fill the state's required parameters.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
	     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
	     *    ancestor with a valid url).
	     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'),
	     *    defines which state to be relative from.
	     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	     *
	     * @returns {string} compiled state url
	     */
	    StateService.prototype.href = function (stateOrName, params, options) {
	        var defaultHrefOpts = {
	            lossy: true,
	            inherit: true,
	            absolute: false,
	            relative: this.$current
	        };
	        options = common_1.defaults(options, defaultHrefOpts);
	        var state = this.stateRegistry.matcher.find(stateOrName, options.relative);
	        if (!predicates_1.isDefined(state))
	            return null;
	        if (options.inherit)
	            params = this.params.$inherit(params || {}, this.$current, state);
	        var nav = (state && options.lossy) ? state.navigable : state;
	        if (!nav || nav.url === undefined || nav.url === null) {
	            return null;
	        }
	        return this.$urlRouter.href(nav.url, param_1.Param.values(state.parameters(), params), {
	            absolute: options.absolute
	        });
	    };
	    ;
	    StateService.prototype.get = function (stateOrName, base) {
	        if (arguments.length === 0)
	            return this.stateRegistry.get();
	        return this.stateRegistry.get(stateOrName, base || this.$current);
	    };
	    return StateService;
	}());
	exports.StateService = StateService;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/** @module path */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var module_1 = __webpack_require__(17);
	var node_1 = __webpack_require__(39);
	var module_2 = __webpack_require__(40);
	/**
	 * This class contains functions which convert TargetStates, Nodes and paths from one type to another.
	 */
	var PathFactory = (function () {
	    function PathFactory() {
	    }
	    /** Given a Node[], create an TargetState */
	    PathFactory.makeTargetState = function (path) {
	        var state = common_1.tail(path).state;
	        return new module_1.TargetState(state, state, path.map(hof_1.prop("paramValues")).reduce(common_1.mergeR, {}));
	    };
	    PathFactory.buildPath = function (targetState) {
	        var toParams = targetState.params();
	        return targetState.$state().path.map(function (state) { return new node_1.Node(state).applyRawParams(toParams); });
	    };
	    /** Given a fromPath: Node[] and a TargetState, builds a toPath: Node[] */
	    PathFactory.buildToPath = function (fromPath, targetState) {
	        var toPath = PathFactory.buildPath(targetState);
	        if (targetState.options().inherit) {
	            return PathFactory.inheritParams(fromPath, toPath, Object.keys(targetState.params()));
	        }
	        return toPath;
	    };
	    PathFactory.applyViewConfigs = function ($view, path) {
	        return path.map(function (node) {
	            return common_1.extend(node, { views: common_1.values(node.state.views || {}).map(function (view) { return $view.createViewConfig(node, view); }) });
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
	    PathFactory.inheritParams = function (fromPath, toPath, toKeys) {
	        if (toKeys === void 0) { toKeys = []; }
	        function nodeParamVals(path, state) {
	            var node = common_1.find(path, hof_1.propEq('state', state));
	            return common_1.extend({}, node && node.paramValues);
	        }
	        /**
	         * Given an Node "toNode", return a new Node with param values inherited from the
	         * matching node in fromPath.  Only inherit keys that aren't found in "toKeys" from the node in "fromPath""
	         */
	        var makeInheritedParamsNode = hof_1.curry(function (_fromPath, _toKeys, toNode) {
	            // All param values for the node (may include default key/vals, when key was not found in toParams)
	            var toParamVals = common_1.extend({}, toNode && toNode.paramValues);
	            // limited to only those keys found in toParams
	            var incomingParamVals = common_1.pick(toParamVals, _toKeys);
	            toParamVals = common_1.omit(toParamVals, _toKeys);
	            var fromParamVals = nodeParamVals(_fromPath, toNode.state) || {};
	            // extend toParamVals with any fromParamVals, then override any of those those with incomingParamVals
	            var ownParamVals = common_1.extend(toParamVals, fromParamVals, incomingParamVals);
	            return new node_1.Node(toNode.state).applyRawParams(ownParamVals);
	        });
	        // The param keys specified by the incoming toParams
	        return toPath.map(makeInheritedParamsNode(fromPath, toKeys));
	    };
	    /**
	     * Given a path, upgrades the path to a Node[].  Each node is assigned a ResolveContext
	     * and ParamValues object which is bound to the whole path, but closes over the subpath from root to the node.
	     * The views are also added to the node.
	     */
	    PathFactory.bindTransNodesToPath = function (resolvePath) {
	        var resolveContext = new module_2.ResolveContext(resolvePath);
	        // let paramValues = new ParamValues(resolvePath);
	        // Attach bound resolveContext and paramValues to each node
	        // Attach views to each node
	        resolvePath.forEach(function (node) {
	            node.resolveContext = resolveContext.isolateRootTo(node.state);
	            node.resolveInjector = new module_2.ResolveInjector(node.resolveContext, node.state);
	            node.resolves['$stateParams'] = new module_2.Resolvable("$stateParams", function () { return node.paramValues; }, node.paramValues);
	        });
	        return resolvePath;
	    };
	    /**
	     * Computes the tree changes (entering, exiting) between a fromPath and toPath.
	     */
	    PathFactory.treeChanges = function (fromPath, toPath, reloadState) {
	        var keep = 0, max = Math.min(fromPath.length, toPath.length);
	        var staticParams = function (state) { return state.parameters({ inherit: false }).filter(hof_1.not(hof_1.prop('dynamic'))).map(hof_1.prop('id')); };
	        var nodesMatch = function (node1, node2) { return node1.equals(node2, staticParams(node1.state)); };
	        while (keep < max && fromPath[keep].state !== reloadState && nodesMatch(fromPath[keep], toPath[keep])) {
	            keep++;
	        }
	        /** Given a retained node, return a new node which uses the to node's param values */
	        function applyToParams(retainedNode, idx) {
	            var cloned = node_1.Node.clone(retainedNode);
	            cloned.paramValues = toPath[idx].paramValues;
	            return cloned;
	        }
	        var from, retained, exiting, entering, to;
	        // intermediate vars
	        var retainedWithToParams, enteringResolvePath, toResolvePath;
	        from = fromPath;
	        retained = from.slice(0, keep);
	        exiting = from.slice(keep);
	        // Create a new retained path (with shallow copies of nodes) which have the params of the toPath mapped
	        retainedWithToParams = retained.map(applyToParams);
	        enteringResolvePath = toPath.slice(keep);
	        // "toResolvePath" is "retainedWithToParams" concat "enteringResolvePath".
	        toResolvePath = (retainedWithToParams).concat(enteringResolvePath);
	        // "to: is "toResolvePath" with ParamValues/ResolveContext added to each node and bound to the path context
	        to = PathFactory.bindTransNodesToPath(toResolvePath);
	        // "entering" is the tail of "to"
	        entering = to.slice(keep);
	        return { from: from, to: to, retained: retained, exiting: exiting, entering: entering };
	    };
	    PathFactory.bindTransitionResolve = function (treeChanges, transition) {
	        var rootNode = treeChanges.to[0];
	        rootNode.resolves['$transition$'] = new module_2.Resolvable('$transition$', function () { return transition; }, transition);
	    };
	    /**
	     * Find a subpath of a path that stops at the node for a given state
	     *
	     * Given an array of nodes, returns a subset of the array starting from the first node, up to the
	     * node whose state matches `stateName`
	     *
	     * @param path a path of [[Node]]s
	     * @param state the [[State]] to stop at
	     */
	    PathFactory.subPath = function (path, state) {
	        var node = common_1.find(path, function (_node) { return _node.state === state; });
	        var elementIdx = path.indexOf(node);
	        if (elementIdx === -1)
	            throw new Error("The path does not contain the state: " + state);
	        return path.slice(0, elementIdx + 1);
	    };
	    /** Gets the raw parameter values from a path */
	    PathFactory.paramValues = function (path) { return path.reduce(function (acc, node) { return common_1.extend(acc, node.paramValues); }, {}); };
	    return PathFactory;
	}());
	exports.PathFactory = PathFactory;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module path */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var module_1 = __webpack_require__(40);
	var Node = (function () {
	    function Node(state) {
	        if (state instanceof Node) {
	            var node = state;
	            this.state = node.state;
	            this.paramSchema = node.paramSchema.slice();
	            this.paramValues = common_1.extend({}, node.paramValues);
	            this.resolves = common_1.extend({}, node.resolves);
	            this.views = node.views && node.views.slice();
	            this.resolveContext = node.resolveContext;
	            this.resolveInjector = node.resolveInjector;
	        }
	        else {
	            this.state = state;
	            this.paramSchema = state.parameters({ inherit: false });
	            this.paramValues = {};
	            this.resolves = common_1.mapObj(state.resolve, function (fn, name) { return new module_1.Resolvable(name, fn); });
	        }
	    }
	    Node.prototype.applyRawParams = function (params) {
	        var getParamVal = function (paramDef) { return [paramDef.id, paramDef.value(params[paramDef.id])]; };
	        this.paramValues = this.paramSchema.reduce(function (memo, pDef) { return common_1.applyPairs(memo, getParamVal(pDef)); }, {});
	        return this;
	    };
	    Node.prototype.parameter = function (name) {
	        return common_1.find(this.paramSchema, hof_1.propEq("id", name));
	    };
	    Node.prototype.equals = function (node, keys) {
	        var _this = this;
	        if (keys === void 0) { keys = this.paramSchema.map(hof_1.prop('id')); }
	        var paramValsEq = function (key) { return _this.parameter(key).type.equals(_this.paramValues[key], node.paramValues[key]); };
	        return this.state === node.state && keys.map(paramValsEq).reduce(common_1.allTrueR, true);
	    };
	    Node.clone = function (node) {
	        return new Node(node);
	    };
	    /**
	     * Returns a new path which is a subpath of the first path. The new path starts from root and contains any nodes
	     * that match the nodes in the second path. Nodes are compared using their state property.
	     * @param first {Node[]}
	     * @param second {Node[]}
	     * @returns {Node[]}
	     */
	    Node.matching = function (first, second) {
	        var matchedCount = first.reduce(function (prev, node, i) {
	            return prev === i && i < second.length && node.state === second[i].state ? i + 1 : prev;
	        }, 0);
	        return first.slice(0, matchedCount);
	    };
	    return Node;
	}());
	exports.Node = Node;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module resolve */ /** for typedoc */
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	__export(__webpack_require__(41));
	__export(__webpack_require__(42));


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module resolve */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(12);
	var coreservices_1 = __webpack_require__(6);
	var interface_1 = __webpack_require__(31);
	var common_2 = __webpack_require__(3);
	var pathFactory_1 = __webpack_require__(38);
	// TODO: make this configurable
	var defaultResolvePolicy = interface_1.ResolvePolicy[interface_1.ResolvePolicy.LAZY];
	var ResolveContext = (function () {
	    function ResolveContext(_path) {
	        this._path = _path;
	        common_1.extend(this, {
	            _nodeFor: function (state) {
	                return common_1.find(this._path, hof_1.propEq('state', state));
	            },
	            _pathTo: function (state) {
	                return pathFactory_1.PathFactory.subPath(this._path, state);
	            }
	        });
	    }
	    /**
	     * Gets the available Resolvables for the last element of this path.
	     *
	     * @param state the State (within the ResolveContext's Path) for which to get resolvables
	     * @param options
	     *
	     * options.omitOwnLocals: array of property names
	     *   Omits those Resolvables which are found on the last element of the path.
	     *
	     *   This will hide a deepest-level resolvable (by name), potentially exposing a parent resolvable of
	     *   the same name further up the state tree.
	     *
	     *   This is used by Resolvable.resolve() in order to provide the Resolvable access to all the other
	     *   Resolvables at its own PathElement level, yet disallow that Resolvable access to its own injectable Resolvable.
	     *
	     *   This is also used to allow a state to override a parent state's resolve while also injecting
	     *   that parent state's resolve:
	     *
	     *   state({ name: 'G', resolve: { _G: function() { return "G"; } } });
	     *   state({ name: 'G.G2', resolve: { _G: function(_G) { return _G + "G2"; } } });
	     *   where injecting _G into a controller will yield "GG2"
	     */
	    ResolveContext.prototype.getResolvables = function (state, options) {
	        options = common_1.defaults(options, { omitOwnLocals: [] });
	        var path = (state ? this._pathTo(state) : this._path);
	        var last = common_1.tail(path);
	        return path.reduce(function (memo, node) {
	            var omitProps = (node === last) ? options.omitOwnLocals : [];
	            var filteredResolvables = common_1.omit(node.resolves, omitProps);
	            return common_1.extend(memo, filteredResolvables);
	        }, {});
	    };
	    /** Inspects a function `fn` for its dependencies.  Returns an object containing any matching Resolvables */
	    ResolveContext.prototype.getResolvablesForFn = function (fn) {
	        var deps = coreservices_1.services.$injector.annotate(fn, coreservices_1.services.$injector.strictDi);
	        return common_1.pick(this.getResolvables(), deps);
	    };
	    ResolveContext.prototype.isolateRootTo = function (state) {
	        return new ResolveContext(this._pathTo(state));
	    };
	    ResolveContext.prototype.addResolvables = function (resolvables, state) {
	        common_1.extend(this._nodeFor(state).resolves, resolvables);
	    };
	    /** Gets the resolvables declared on a particular state */
	    ResolveContext.prototype.getOwnResolvables = function (state) {
	        return common_1.extend({}, this._nodeFor(state).resolves);
	    };
	    // Returns a promise for an array of resolved path Element promises
	    ResolveContext.prototype.resolvePath = function (options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        trace_1.trace.traceResolvePath(this._path, options);
	        var promiseForNode = function (node) { return _this.resolvePathElement(node.state, options); };
	        return coreservices_1.services.$q.all(common_1.map(this._path, promiseForNode)).then(function (all) { return all.reduce(common_2.mergeR, {}); });
	    };
	    // returns a promise for all the resolvables on this PathElement
	    // options.resolvePolicy: only return promises for those Resolvables which are at 
	    // the specified policy, or above.  i.e., options.resolvePolicy === 'lazy' will
	    // resolve both 'lazy' and 'eager' resolves.
	    ResolveContext.prototype.resolvePathElement = function (state, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        // The caller can request the path be resolved for a given policy and "below" 
	        var policy = options && options.resolvePolicy;
	        var policyOrdinal = interface_1.ResolvePolicy[policy || defaultResolvePolicy];
	        // Get path Resolvables available to this element
	        var resolvables = this.getOwnResolvables(state);
	        var matchesRequestedPolicy = function (resolvable) { return getPolicy(state.resolvePolicy, resolvable) >= policyOrdinal; };
	        var matchingResolves = common_1.filter(resolvables, matchesRequestedPolicy);
	        var getResolvePromise = function (resolvable) { return resolvable.get(_this.isolateRootTo(state), options); };
	        var resolvablePromises = common_1.map(matchingResolves, getResolvePromise);
	        trace_1.trace.traceResolvePathElement(this, matchingResolves, options);
	        return coreservices_1.services.$q.all(resolvablePromises);
	    };
	    /**
	     * Injects a function given the Resolvables available in the path, from the first node
	     * up to the node for the given state.
	     *
	     * First it resolves all the resolvable depencies.  When they are done resolving, it invokes
	     * the function.
	     *
	     * @return a promise for the return value of the function.
	     *
	     * @param fn: the function to inject (i.e., onEnter, onExit, controller)
	     * @param locals: are the angular $injector-style locals to inject
	     * @param options: options (TODO: document)
	     */
	    ResolveContext.prototype.invokeLater = function (fn, locals, options) {
	        var _this = this;
	        if (locals === void 0) { locals = {}; }
	        if (options === void 0) { options = {}; }
	        var resolvables = this.getResolvablesForFn(fn);
	        trace_1.trace.tracePathElementInvoke(common_1.tail(this._path), fn, Object.keys(resolvables), common_1.extend({ when: "Later" }, options));
	        var getPromise = function (resolvable) { return resolvable.get(_this, options); };
	        var promises = common_1.map(resolvables, getPromise);
	        return coreservices_1.services.$q.all(promises).then(function () {
	            try {
	                return _this.invokeNow(fn, locals, options);
	            }
	            catch (error) {
	                return coreservices_1.services.$q.reject(error);
	            }
	        });
	    };
	    /**
	     * Immediately injects a function with the dependent Resolvables available in the path, from
	     * the first node up to the node for the given state.
	     *
	     * If a Resolvable is not yet resolved, then null is injected in place of the resolvable.
	     *
	     * @return the return value of the function.
	     *
	     * @param fn: the function to inject (i.e., onEnter, onExit, controller)
	     * @param locals: are the angular $injector-style locals to inject
	     * @param options: options (TODO: document)
	     */
	    // Injects a function at this PathElement level with available Resolvables
	    // Does not wait until all Resolvables have been resolved; you must call PathElement.resolve() (or manually resolve each dep) first
	    ResolveContext.prototype.invokeNow = function (fn, locals, options) {
	        if (options === void 0) { options = {}; }
	        var resolvables = this.getResolvablesForFn(fn);
	        trace_1.trace.tracePathElementInvoke(common_1.tail(this._path), fn, Object.keys(resolvables), common_1.extend({ when: "Now  " }, options));
	        var resolvedLocals = common_1.map(resolvables, hof_1.prop("data"));
	        return coreservices_1.services.$injector.invoke(fn, options.bind || null, common_1.extend({}, locals, resolvedLocals));
	    };
	    return ResolveContext;
	}());
	exports.ResolveContext = ResolveContext;
	/**
	 * Given a state's resolvePolicy attribute and a resolvable from that state, returns the policy ordinal for the Resolvable
	 * Use the policy declared for the Resolve. If undefined, use the policy declared for the State.  If
	 * undefined, use the system defaultResolvePolicy.
	 *
	 * @param stateResolvePolicyConf The raw resolvePolicy declaration on the state object; may be a String or Object
	 * @param resolvable The resolvable to compute the policy for
	 */
	function getPolicy(stateResolvePolicyConf, resolvable) {
	    // Normalize the configuration on the state to either state-level (a string) or resolve-level (a Map of string:string)
	    var stateLevelPolicy = (predicates_1.isString(stateResolvePolicyConf) ? stateResolvePolicyConf : null);
	    var resolveLevelPolicies = (predicates_1.isObject(stateResolvePolicyConf) ? stateResolvePolicyConf : {});
	    var policyName = resolveLevelPolicies[resolvable.name] || stateLevelPolicy || defaultResolvePolicy;
	    return interface_1.ResolvePolicy[policyName];
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module resolve */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var ResolveInjector = (function () {
	    function ResolveInjector(_resolveContext, _state) {
	        this._resolveContext = _resolveContext;
	        this._state = _state;
	    }
	    /** Returns a promise to invoke an annotated function in the resolve context */
	    ResolveInjector.prototype.invokeLater = function (injectedFn, locals) {
	        return this._resolveContext.invokeLater(injectedFn, locals);
	    };
	    /** Invokes an annotated function in the resolve context */
	    ResolveInjector.prototype.invokeNow = function (injectedFn, locals) {
	        return this._resolveContext.invokeNow(null, injectedFn, locals);
	    };
	    /** Returns the a promise for locals (realized Resolvables) that a function wants */
	    ResolveInjector.prototype.getLocals = function (injectedFn) {
	        var _this = this;
	        var resolve = function (r) { return r.get(_this._resolveContext); };
	        return common_1.map(this._resolveContext.getResolvablesForFn(injectedFn), resolve);
	    };
	    return ResolveInjector;
	}());
	exports.ResolveInjector = ResolveInjector;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transition_1 = __webpack_require__(11);
	var hookRegistry_1 = __webpack_require__(15);
	/**
	 * The default transition options.
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
	    current: function () { return null; }
	};
	/**
	 * This class provides services related to Transitions.
	 *
	 * Most importantly, it allows global Transition Hooks to be registered, and has a factory function
	 * for creating new Transitions.
	 */
	var TransitionService = (function () {
	    function TransitionService($view) {
	        this.$view = $view;
	        this._defaultErrorHandler = function $defaultErrorHandler($error$) {
	            if ($error$ instanceof Error) {
	                console.error($error$);
	            }
	        };
	        hookRegistry_1.HookRegistry.mixin(new hookRegistry_1.HookRegistry(), this);
	    }
	    TransitionService.prototype.defaultErrorHandler = function (handler) {
	        return this._defaultErrorHandler = handler || this._defaultErrorHandler;
	    };
	    /**
	     * Creates a new [[Transition]] object
	     *
	     * This is a factory function for creating new Transition objects.
	     *
	     * @param fromPath
	     * @param targetState
	     * @returns {Transition}
	     */
	    TransitionService.prototype.create = function (fromPath, targetState) {
	        return new transition_1.Transition(fromPath, targetState, this);
	    };
	    return TransitionService;
	}());
	exports.TransitionService = TransitionService;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module path */ /** for typedoc */
	__export(__webpack_require__(39));
	__export(__webpack_require__(38));


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module url */ /** for typedoc */
	__export(__webpack_require__(46));
	__export(__webpack_require__(22));
	__export(__webpack_require__(47));
	__export(__webpack_require__(48));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var module_1 = __webpack_require__(20);
	var predicates_2 = __webpack_require__(4);
	var param_1 = __webpack_require__(21);
	var common_2 = __webpack_require__(3);
	var common_3 = __webpack_require__(3);
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
	            surroundPattern = [("(" + param.squash + "|"), ')?'];
	            break;
	    }
	    return result + surroundPattern[0] + param.type.pattern.source + surroundPattern[1];
	}
	var memoizeTo = function (obj, prop, fn) { return obj[prop] = obj[prop] || fn(); };
	/**
	 * @ngdoc object
	 * @name ui.router.util.type:UrlMatcher
	 *
	 * @description
	 * Matches URLs against patterns and extracts named parameters from the path or the search
	 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
	 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
	 * do not influence whether or not a URL is matched, but their values are passed through into
	 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
	 *
	 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
	 * syntax, which optionally allows a regular expression for the parameter to be specified:
	 *
	 * * `':'` name - colon placeholder
	 * * `'*'` name - catch-all placeholder
	 * * `'{' name '}'` - curly placeholder
	 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
	 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
	 *
	 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
	 * must be unique within the pattern (across both path and search parameters). For colon
	 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
	 * number of characters other than '/'. For catch-all placeholders the path parameter matches
	 * any number of characters.
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
	 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
	 *
	 * @param {string} pattern  The pattern to compile into a matcher.
	 * @param {Object} config  A configuration object hash
	 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
	 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
	 *
	 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
	 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
	 *   non-null) will start with this prefix.
	 *
	 * @property {string} pattern  The pattern that was passed into the constructor
	 *
	 * @returns {Object}  New `UrlMatcher` object
	 */
	var UrlMatcher = (function () {
	    function UrlMatcher(pattern, config) {
	        var _this = this;
	        this.pattern = pattern;
	        this.config = config;
	        this._cache = { path: [], pattern: null };
	        this._children = [];
	        this._params = [];
	        this._segments = [];
	        this._compiled = [];
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
	            var id = m[2] || m[3], regexp = isSearch ? m[4] : m[4] || (m[1] === '*' ? '.*' : null);
	            return {
	                id: id,
	                regexp: regexp,
	                cfg: _this.config.params[id],
	                segment: pattern.substring(last, m.index),
	                type: !regexp ? null : module_1.paramTypes.type(regexp || "string") || common_1.inherit(module_1.paramTypes.type("string"), {
	                    pattern: new RegExp(regexp, _this.config.caseInsensitive ? 'i' : undefined)
	                })
	            };
	        };
	        var p, segment;
	        while ((m = placeholder.exec(pattern))) {
	            p = matchDetails(m, false);
	            if (p.segment.indexOf('?') >= 0)
	                break; // we're into the search part
	            checkParamErrors(p.id);
	            this._params.push(module_1.Param.fromPath(p.id, p.type, this.config.paramMap(p.cfg, false)));
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
	                    this._params.push(module_1.Param.fromSearch(p.id, p.type, this.config.paramMap(p.cfg, true)));
	                    last = placeholder.lastIndex;
	                }
	            }
	        }
	        this._segments.push(segment);
	        common_1.extend(this, {
	            _compiled: patterns.map(function (pattern) { return quoteRegExp.apply(null, pattern); }).concat(quoteRegExp(segment)),
	            prefix: this._segments[0]
	        });
	        Object.freeze(this);
	    }
	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#append
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * @TODO
	     *
	     * @example
	     * @TODO
	     *
	     * @param {UrlMatcher} url A `UrlMatcher` instance to append as a child of the current `UrlMatcher`.
	     */
	    UrlMatcher.prototype.append = function (url) {
	        this._children.push(url);
	        common_1.forEach(url._cache, function (val, key) { return url._cache[key] = predicates_1.isArray(val) ? [] : null; });
	        url._cache.path = this._cache.path.concat(this);
	        return url;
	    };
	    UrlMatcher.prototype.isRoot = function () {
	        return this._cache.path.length === 0;
	    };
	    UrlMatcher.prototype.toString = function () {
	        return this.pattern;
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#exec
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Tests the specified path against this matcher, and returns an object containing the captured
	     * parameter values, or null if the path does not match. The returned object contains the values
	     * of any search parameters that are mentioned in the pattern, but their value may be null if
	     * they are not present in `search`. This means that search parameters are always treated
	     * as optional.
	     *
	     * @example
	     * <pre>
	     * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
	     *   x: '1', q: 'hello'
	     * });
	     * // returns { id: 'bob', q: 'hello', r: null }
	     * </pre>
	     *
	     * @param {string} path  The URL path to match, e.g. `$location.path()`.
	     * @param {Object} search  URL search parameters, e.g. `$location.search()`.
	     * @param {string} hash  URL hash e.g. `$location.hash()`.
	     * @param {Object} options
	     * @returns {Object}  The captured parameter values.
	     */
	    UrlMatcher.prototype.exec = function (path, search, hash, options) {
	        var _this = this;
	        if (search === void 0) { search = {}; }
	        if (options === void 0) { options = {}; }
	        var match = memoizeTo(this._cache, 'pattern', function () {
	            return new RegExp([
	                '^',
	                common_1.unnest(_this._cache.path.concat(_this).map(hof_1.prop('_compiled'))).join(''),
	                _this.config.strict === false ? '\/?' : '',
	                '$'
	            ].join(''), _this.config.caseInsensitive ? 'i' : undefined);
	        }).exec(path);
	        if (!match)
	            return null;
	        //options = defaults(options, { isolate: false });
	        var allParams = this.parameters(), pathParams = allParams.filter(function (param) { return !param.isSearch(); }), searchParams = allParams.filter(function (param) { return param.isSearch(); }), nPathSegments = this._cache.path.concat(this).map(function (urlm) { return urlm._segments.length - 1; }).reduce(function (a, x) { return a + x; }), values = {};
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
	            if (predicates_2.isDefined(value))
	                value = param.type.decode(value);
	            values[param.id] = param.value(value);
	        }
	        common_1.forEach(searchParams, function (param) {
	            var value = search[param.id];
	            for (var j = 0; j < param.replace.length; j++) {
	                if (param.replace[j].from === value)
	                    value = param.replace[j].to;
	            }
	            if (predicates_2.isDefined(value))
	                value = param.type.decode(value);
	            values[param.id] = param.value(value);
	        });
	        if (hash)
	            values["#"] = hash;
	        return values;
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#parameters
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Returns the names of all path and search parameters of this pattern in order of appearance.
	     *
	     * @returns {Array.<Param>}  An array of [[Param]] objects. Must be treated as read-only. If the
	     *    pattern has no parameters, an empty array is returned.
	     */
	    UrlMatcher.prototype.parameters = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        if (opts.inherit === false)
	            return this._params;
	        return common_1.unnest(this._cache.path.concat(this).map(hof_1.prop('_params')));
	    };
	    UrlMatcher.prototype.parameter = function (id, opts) {
	        if (opts === void 0) { opts = {}; }
	        var parent = common_1.tail(this._cache.path);
	        return (common_1.find(this._params, hof_1.propEq('id', id)) ||
	            (opts.inherit !== false && parent && parent.parameter(id)) ||
	            null);
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#validates
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Checks an object hash of parameters to validate their correctness according to the parameter
	     * types of this `UrlMatcher`.
	     *
	     * @param {Object} params The object hash of parameters to validate.
	     * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
	     */
	    UrlMatcher.prototype.validates = function (params) {
	        var _this = this;
	        var validParamVal = function (param, val) { return !param || param.validates(val); };
	        return common_1.pairs(params || {}).map(function (_a) {
	            var key = _a[0], val = _a[1];
	            return validParamVal(_this.parameter(key), val);
	        }).reduce(common_1.allTrueR, true);
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#format
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Creates a URL that matches this pattern by substituting the specified values
	     * for the path and search parameters. Null values for path parameters are
	     * treated as empty strings.
	     *
	     * @example
	     * <pre>
	     * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
	     * // returns '/user/bob?q=yes'
	     * </pre>
	     *
	     * @param {Object} values  the values to substitute for the parameters in this pattern.
	     * @returns {string}  the formatted URL (path and optionally search part).
	     */
	    UrlMatcher.prototype.format = function (values) {
	        if (values === void 0) { values = {}; }
	        if (!this.validates(values))
	            return null;
	        // Build the full path of UrlMatchers (including all parent UrlMatchers)
	        var urlMatchers = this._cache.path.slice().concat(this);
	        // Extract all the static segments and Params into an ordered array
	        var pathSegmentsAndParams = urlMatchers.map(UrlMatcher.pathSegmentsAndParams).reduce(common_2.unnestR, []);
	        // Extract the query params into a separate array
	        var queryParams = urlMatchers.map(UrlMatcher.queryParams).reduce(common_2.unnestR, []);
	        /**
	         * Given a Param,
	         * Applies the parameter value, then returns details about it
	         */
	        function getDetails(param) {
	            // Normalize to typed value
	            var value = param.value(values[param.id]);
	            var isDefaultValue = param.isDefaultValue(value);
	            // Check if we're in squash mode for the parameter
	            var squash = isDefaultValue ? param.squash : false;
	            // Allow the Parameter's Type to encode the value
	            var encoded = param.type.encode(value);
	            return { param: param, value: value, isDefaultValue: isDefaultValue, squash: squash, encoded: encoded };
	        }
	        // Build up the path-portion from the list of static segments and parameters
	        var pathString = pathSegmentsAndParams.reduce(function (acc, x) {
	            // The element is a static segment (a raw string); just append it
	            if (predicates_1.isString(x))
	                return acc + x;
	            // Otherwise, it's a Param.  Fetch details about the parameter value
	            var _a = getDetails(x), squash = _a.squash, encoded = _a.encoded, param = _a.param;
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
	            if (param.type.raw)
	                return acc + encoded;
	            // Encode the value
	            return acc + encodeURIComponent(encoded);
	        }, "");
	        // Build the query string by applying parameter values (array or regular)
	        // then mapping to key=value, then flattening and joining using "&"
	        var queryString = queryParams.map(function (param) {
	            var _a = getDetails(param), squash = _a.squash, encoded = _a.encoded, isDefaultValue = _a.isDefaultValue;
	            if (encoded == null || (isDefaultValue && squash !== false))
	                return;
	            if (!predicates_1.isArray(encoded))
	                encoded = [encoded];
	            if (encoded.length === 0)
	                return;
	            if (!param.type.raw)
	                encoded = common_1.map(encoded, encodeURIComponent);
	            return encoded.map(function (val) { return (param.id + "=" + val); });
	        }).filter(common_1.identity).reduce(common_2.unnestR, []).join("&");
	        // Concat the pathstring with the queryString (if exists) and the hashString (if exists)
	        return pathString + (queryString ? "?" + queryString : "") + (values["#"] ? "#" + values["#"] : "");
	    };
	    UrlMatcher.encodeDashes = function (str) {
	        return encodeURIComponent(str).replace(/-/g, function (c) { return ("%5C%" + c.charCodeAt(0).toString(16).toUpperCase()); });
	    };
	    /** Given a matcher, return an array with the matcher's path segments and path params, in order */
	    UrlMatcher.pathSegmentsAndParams = function (matcher) {
	        var staticSegments = matcher._segments;
	        var pathParams = matcher._params.filter(function (p) { return p.location === param_1.DefType.PATH; });
	        return common_3.arrayTuples(staticSegments, pathParams.concat(undefined)).reduce(common_2.unnestR, []).filter(function (x) { return x !== "" && predicates_2.isDefined(x); });
	    };
	    /** Given a matcher, return an array with the matcher's query params */
	    UrlMatcher.queryParams = function (matcher) {
	        return matcher._params.filter(function (p) { return p.location === param_1.DefType.SEARCH; });
	    };
	    UrlMatcher.nameValidator = /^\w+([-.]+\w+)*(?:\[\])?$/;
	    return UrlMatcher;
	}());
	exports.UrlMatcher = UrlMatcher;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var module_1 = __webpack_require__(45);
	var module_2 = __webpack_require__(20);
	function getDefaultConfig() {
	    return {
	        strict: module_1.matcherConfig.strictMode(),
	        caseInsensitive: module_1.matcherConfig.caseInsensitive()
	    };
	}
	/**
	 * Factory for [[UrlMatcher]] instances.
	 *
	 * The factory is available to ng1 services as
	 * `$urlMatcherFactor` or ng1 providers as `$urlMatcherFactoryProvider`.
	 */
	var UrlMatcherFactory = (function () {
	    function UrlMatcherFactory() {
	        common_1.extend(this, { UrlMatcher: module_1.UrlMatcher, Param: module_2.Param });
	    }
	    /**
	     * Defines whether URL matching should be case sensitive (the default behavior), or not.
	     *
	     * @param value `false` to match URL in a case sensitive manner; otherwise `true`;
	     * @returns the current value of caseInsensitive
	     */
	    UrlMatcherFactory.prototype.caseInsensitive = function (value) {
	        return module_1.matcherConfig.caseInsensitive(value);
	    };
	    /**
	     * Defines whether URLs should match trailing slashes, or not (the default behavior).
	     *
	     * @param value `false` to match trailing slashes in URLs, otherwise `true`.
	     * @returns the current value of strictMode
	     */
	    UrlMatcherFactory.prototype.strictMode = function (value) {
	        return module_1.matcherConfig.strictMode(value);
	    };
	    /**
	     * Sets the default behavior when generating or matching URLs with default parameter values.
	     *
	     * @param value A string that defines the default parameter URL squashing behavior.
	     *    - `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
	     *    - `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
	     *             parameter is surrounded by slashes, squash (remove) one slash from the URL
	     *    - any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
	     *             the parameter value from the URL and replace it with this string.
	     * @returns the current value of defaultSquashPolicy
	     */
	    UrlMatcherFactory.prototype.defaultSquashPolicy = function (value) {
	        return module_1.matcherConfig.defaultSquashPolicy(value);
	    };
	    /**
	     * Creates a [[UrlMatcher]] for the specified pattern.
	     *
	     * @param pattern  The URL pattern.
	     * @param config  The config object hash.
	     * @returns The UrlMatcher.
	     */
	    UrlMatcherFactory.prototype.compile = function (pattern, config) {
	        return new module_1.UrlMatcher(pattern, common_1.extend(getDefaultConfig(), config));
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
	        common_1.forEach(module_1.UrlMatcher.prototype, function (val, name) {
	            if (predicates_1.isFunction(val))
	                result = result && (predicates_1.isDefined(object[name]) && predicates_1.isFunction(object[name]));
	        });
	        return result;
	    };
	    ;
	    /**
	     * Registers a custom [[Type]] object that can be used to generate URLs with typed parameters.
	     *
	     * @param name  The type name.
	     * @param definition The type definition. See [[Type]] for information on the values accepted.
	     * @param definitionFn A function that is injected before the app
	     *        runtime starts.  The result of this function is merged into the existing `definition`.
	     *        See [[Type]] for information on the values accepted.
	     *
	     * @returns - if a type was registered: the [[UrlMatcherFactory]]
	     *   - if only the `name` parameter was specified: the currently registered [[Type]] object, or undefined
	     *
	     * ---
	     *
	     * This is a simple example of a custom type that encodes and decodes items from an
	     * array, using the array index as the URL-encoded value:
	     *
	     * @example
	     * ```
	     *
	     * var list = ['John', 'Paul', 'George', 'Ringo'];
	     *
	     * $urlMatcherFactoryProvider.type('listItem', {
	     *   encode: function(item) {
	     *     // Represent the list item in the URL using its corresponding index
	     *     return list.indexOf(item);
	     *   },
	     *   decode: function(item) {
	     *     // Look up the list item by index
	     *     return list[parseInt(item, 10)];
	     *   },
	     *   is: function(item) {
	     *     // Ensure the item is valid by checking to see that it appears
	     *     // in the list
	     *     return list.indexOf(item) > -1;
	     *   }
	     * });
	     *
	     * $stateProvider.state('list', {
	     *   url: "/list/{item:listItem}",
	     *   controller: function($scope, $stateParams) {
	     *     console.log($stateParams.item);
	     *   }
	     * });
	     *
	     * // ...
	     *
	     * // Changes URL to '/list/3', logs "Ringo" to the console
	     * $state.go('list', { item: "Ringo" });
	     * ```
	     */
	    UrlMatcherFactory.prototype.type = function (name, definition, definitionFn) {
	        var type = module_2.paramTypes.type(name, definition, definitionFn);
	        return !predicates_1.isDefined(definition) ? type : this;
	    };
	    ;
	    /** @hidden */
	    UrlMatcherFactory.prototype.$get = function () {
	        module_2.paramTypes.enqueue = false;
	        module_2.paramTypes._flushTypeQueue();
	        return this;
	    };
	    ;
	    return UrlMatcherFactory;
	}());
	exports.UrlMatcherFactory = UrlMatcherFactory;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var $location = coreservices_1.services.location;
	// Returns a string that is a prefix of all strings matching the RegExp
	function regExpPrefix(re) {
	    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
	    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
	}
	// Interpolates matched values into a String.replace()-style pattern
	function interpolate(pattern, match) {
	    return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
	        return match[what === '$' ? 0 : Number(what)];
	    });
	}
	function handleIfMatch($injector, $stateParams, handler, match) {
	    if (!match)
	        return false;
	    var result = $injector.invoke(handler, handler, { $match: match, $stateParams: $stateParams });
	    return predicates_1.isDefined(result) ? result : true;
	}
	function appendBasePath(url, isHtml5, absolute) {
	    var baseHref = coreservices_1.services.locationConfig.baseHref();
	    if (baseHref === '/')
	        return url;
	    if (isHtml5)
	        return baseHref.slice(0, -1) + url;
	    if (absolute)
	        return baseHref.slice(1) + url;
	    return url;
	}
	// TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
	function update(rules, otherwiseFn, evt) {
	    if (evt && evt.defaultPrevented)
	        return;
	    function check(rule) {
	        var handled = rule(coreservices_1.services.$injector, $location);
	        if (!handled)
	            return false;
	        if (predicates_1.isString(handled)) {
	            $location.replace();
	            $location.url(handled);
	        }
	        return true;
	    }
	    var n = rules.length, i;
	    for (i = 0; i < n; i++) {
	        if (check(rules[i]))
	            return;
	    }
	    // always check otherwise last to allow dynamic updates to the set of rules
	    if (otherwiseFn)
	        check(otherwiseFn);
	}
	/**
	 * @ngdoc object
	 * @name ui.router.router.$urlRouterProvider
	 *
	 * @requires ui.router.util.$urlMatcherFactoryProvider
	 * @requires $locationProvider
	 *
	 * @description
	 * `$urlRouterProvider` has the responsibility of watching `$location`.
	 * When `$location` changes it runs through a list of rules one by one until a
	 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify
	 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
	 *
	 * There are several methods on `$urlRouterProvider` that make it useful to use directly
	 * in your module config.
	 */
	var UrlRouterProvider = (function () {
	    function UrlRouterProvider($urlMatcherFactory, $stateParams) {
	        this.$urlMatcherFactory = $urlMatcherFactory;
	        this.$stateParams = $stateParams;
	        /** @hidden */
	        this.rules = [];
	        /** @hidden */
	        this.otherwiseFn = null;
	        /** @hidden */
	        this.interceptDeferred = false;
	    }
	    /**
	     * @ngdoc function
	     * @name ui.router.router.$urlRouterProvider#rule
	     * @methodOf ui.router.router.$urlRouterProvider
	     *
	     * @description
	     * Defines rules that are used by `$urlRouterProvider` to find matches for
	     * specific URLs.
	     *
	     * @example
	     * <pre>
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
	     * </pre>
	     *
	     * @param {function} rule Handler function that takes `$injector` and `$location`
	     * services as arguments. You can use them to return a valid path as a string.
	     *
	     * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
	     */
	    UrlRouterProvider.prototype.rule = function (rule) {
	        if (!predicates_1.isFunction(rule))
	            throw new Error("'rule' must be a function");
	        this.rules.push(rule);
	        return this;
	    };
	    ;
	    /**
	     * @ngdoc object
	     * @name ui.router.router.$urlRouterProvider#otherwise
	     * @methodOf ui.router.router.$urlRouterProvider
	     *
	     * @description
	     * Defines a path that is used when an invalid route is requested.
	     *
	     * @example
	     * <pre>
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
	     * </pre>
	     *
	     * @param {string|function} rule The url path you want to redirect to or a function
	     * rule that returns the url path. The function version is passed two params:
	     * `$injector` and `$location` services, and must return a url string.
	     *
	     * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
	     */
	    UrlRouterProvider.prototype.otherwise = function (rule) {
	        if (!predicates_1.isFunction(rule) && !predicates_1.isString(rule))
	            throw new Error("'rule' must be a string or function");
	        this.otherwiseFn = predicates_1.isString(rule) ? function () { return rule; } : rule;
	        return this;
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.router.$urlRouterProvider#when
	     * @methodOf ui.router.router.$urlRouterProvider
	     *
	     * @description
	     * Registers a handler for a given url matching.
	     *
	     * If the handler is a string, it is
	     * treated as a redirect, and is interpolated according to the syntax of match
	     * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
	     *
	     * If the handler is a function, it is injectable. It gets invoked if `$location`
	     * matches. You have the option of inject the match object as `$match`.
	     *
	     * The handler can return
	     *
	     * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
	     *   will continue trying to find another one that matches.
	     * - **string** which is treated as a redirect and passed to `$location.url()`
	     * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
	     *
	     * @example
	     * <pre>
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
	     * </pre>
	     *
	     * @param {string|object} what The incoming path that you want to redirect.
	     * @param {string|function} handler The path you want to redirect your user to.
	     */
	    UrlRouterProvider.prototype.when = function (what, handler) {
	        var _a = this, $urlMatcherFactory = _a.$urlMatcherFactory, $stateParams = _a.$stateParams;
	        var redirect, handlerIsString = predicates_1.isString(handler);
	        // @todo Queue this
	        if (predicates_1.isString(what))
	            what = $urlMatcherFactory.compile(what);
	        if (!handlerIsString && !predicates_1.isFunction(handler) && !predicates_1.isArray(handler))
	            throw new Error("invalid 'handler' in when()");
	        var strategies = {
	            matcher: function (_what, _handler) {
	                if (handlerIsString) {
	                    redirect = $urlMatcherFactory.compile(_handler);
	                    _handler = ['$match', redirect.format.bind(redirect)];
	                }
	                return common_1.extend(function () {
	                    return handleIfMatch(coreservices_1.services.$injector, $stateParams, _handler, _what.exec($location.path(), $location.search(), $location.hash()));
	                }, {
	                    prefix: predicates_1.isString(_what.prefix) ? _what.prefix : ''
	                });
	            },
	            regex: function (_what, _handler) {
	                if (_what.global || _what.sticky)
	                    throw new Error("when() RegExp must not be global or sticky");
	                if (handlerIsString) {
	                    redirect = _handler;
	                    _handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
	                }
	                return common_1.extend(function () {
	                    return handleIfMatch(coreservices_1.services.$injector, $stateParams, _handler, _what.exec($location.path()));
	                }, {
	                    prefix: regExpPrefix(_what)
	                });
	            }
	        };
	        var check = {
	            matcher: $urlMatcherFactory.isMatcher(what),
	            regex: what instanceof RegExp
	        };
	        for (var n in check) {
	            if (check[n])
	                return this.rule(strategies[n](what, handler));
	        }
	        throw new Error("invalid 'what' in when()");
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.router.$urlRouterProvider#deferIntercept
	     * @methodOf ui.router.router.$urlRouterProvider
	     *
	     * @description
	     * Disables (or enables) deferring location change interception.
	     *
	     * If you wish to customize the behavior of syncing the URL (for example, if you wish to
	     * defer a transition but maintain the current URL), call this method at configuration time.
	     * Then, at run time, call `$urlRouter.listen()` after you have configured your own
	     * `$locationChangeSuccess` event handler.
	     *
	     * @example
	     * <pre>
	     * var app = angular.module('app', ['ui.router.router']);
	     *
	     * app.config(function ($urlRouterProvider) {
	     *
	     *   // Prevent $urlRouter from automatically intercepting URL changes;
	     *   // this allows you to configure custom behavior in between
	     *   // location changes and route synchronization:
	     *   $urlRouterProvider.deferIntercept();
	     *
	     * }).run(function ($rootScope, $urlRouter, UserService) {
	     *
	     *   $rootScope.$on('$locationChangeSuccess', function(e) {
	     *     // UserService is an example service for managing user state
	     *     if (UserService.isLoggedIn()) return;
	     *
	     *     // Prevent $urlRouter's default handler from firing
	     *     e.preventDefault();
	     *
	     *     UserService.handleLogin().then(function() {
	     *       // Once the user has logged in, sync the current URL
	     *       // to the router:
	     *       $urlRouter.sync();
	     *     });
	     *   });
	     *
	     *   // Configures $urlRouter's listener *after* your custom listener
	     *   $urlRouter.listen();
	     * });
	     * </pre>
	     *
	     * @param {boolean} defer Indicates whether to defer location change interception. Passing
	     *        no parameter is equivalent to `true`.
	     */
	    UrlRouterProvider.prototype.deferIntercept = function (defer) {
	        if (defer === undefined)
	            defer = true;
	        this.interceptDeferred = defer;
	    };
	    ;
	    return UrlRouterProvider;
	}());
	exports.UrlRouterProvider = UrlRouterProvider;
	var UrlRouter = (function () {
	    function UrlRouter(urlRouterProvider) {
	        this.urlRouterProvider = urlRouterProvider;
	        common_1.bindFunctions(UrlRouter.prototype, this, this);
	    }
	    /**
	     * @ngdoc function
	     * @name ui.router.router.$urlRouter#sync
	     * @methodOf ui.router.router.$urlRouter
	     *
	     * @description
	     * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
	     * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
	     * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
	     * with the transition by calling `$urlRouter.sync()`.
	     *
	     * @example
	     * <pre>
	     * angular.module('app', ['ui.router'])
	     *   .run(function($rootScope, $urlRouter) {
	     *     $rootScope.$on('$locationChangeSuccess', function(evt) {
	     *       // Halt state change from even starting
	     *       evt.preventDefault();
	     *       // Perform custom logic
	     *       var meetsRequirement = ...
	     *       // Continue with the update and state transition if logic allows
	     *       if (meetsRequirement) $urlRouter.sync();
	     *     });
	     * });
	     * </pre>
	     */
	    UrlRouter.prototype.sync = function () {
	        update(this.urlRouterProvider.rules, this.urlRouterProvider.otherwiseFn);
	    };
	    UrlRouter.prototype.listen = function () {
	        var _this = this;
	        return this.listener = this.listener || $location.onChange(function (evt) { return update(_this.urlRouterProvider.rules, _this.urlRouterProvider.otherwiseFn, evt); });
	    };
	    UrlRouter.prototype.update = function (read) {
	        if (read) {
	            this.location = $location.url();
	            return;
	        }
	        if ($location.url() === this.location)
	            return;
	        $location.url(this.location);
	        $location.replace();
	    };
	    UrlRouter.prototype.push = function (urlMatcher, params, options) {
	        $location.url(urlMatcher.format(params || {}));
	        if (options && options.replace)
	            $location.replace();
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.router.$urlRouter#href
	     * @methodOf ui.router.router.$urlRouter
	     *
	     * @description
	     * A URL generation method that returns the compiled URL for a given
	     * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
	     *
	     * @example
	     * <pre>
	     * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
	     *   person: "bob"
	     * });
	     * // $bob == "/about/bob";
	     * </pre>
	     *
	     * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
	     * @param {object=} params An object of parameter values to fill the matcher's required parameters.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	     *
	     * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
	     */
	    UrlRouter.prototype.href = function (urlMatcher, params, options) {
	        if (!urlMatcher.validates(params))
	            return null;
	        var url = urlMatcher.format(params);
	        options = options || {};
	        var cfg = coreservices_1.services.locationConfig;
	        var isHtml5 = cfg.html5Mode();
	        if (!isHtml5 && url !== null) {
	            url = "#" + cfg.hashPrefix() + url;
	        }
	        url = appendBasePath(url, isHtml5, options.absolute);
	        if (!options.absolute || !url) {
	            return url;
	        }
	        var slash = (!isHtml5 && url ? '/' : ''), port = cfg.port();
	        port = (port === 80 || port === 443 ? '' : ':' + port);
	        return [cfg.protocol(), '://', cfg.host(), port, slash, url].join('');
	    };
	    return UrlRouter;
	}());
	exports.UrlRouter = UrlRouter;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module view */ /** for typedoc */
	__export(__webpack_require__(50));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module view */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var module_1 = __webpack_require__(2);
	var match = function (obj1) {
	    var keys = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        keys[_i - 1] = arguments[_i];
	    }
	    return function (obj2) { return keys.reduce(function (memo, key) { return memo && obj1[key] === obj2[key]; }, true); };
	};
	/**
	 * The View service
	 */
	var ViewService = (function () {
	    function ViewService() {
	        var _this = this;
	        this.uiViews = [];
	        this.viewConfigs = [];
	        this._viewConfigFactories = {};
	        this.sync = function () {
	            var uiViewsByFqn = _this.uiViews.map(function (uiv) { return [uiv.fqn, uiv]; }).reduce(common_1.applyPairs, {});
	            /**
	             * Given a ui-view and a ViewConfig, determines if they "match".
	             *
	             * A ui-view has a fully qualified name (fqn) and a context object.  The fqn is built from its overall location in
	             * the DOM, describing its nesting relationship to any parent ui-view tags it is nested inside of.
	             *
	             * A ViewConfig has a target ui-view name and a context anchor.  The ui-view name can be a simple name, or
	             * can be a segmented ui-view path, describing a portion of a ui-view fqn.
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
	             * <div ui-view>                        <!-- created in the root context (name: "") -->
	             *   <div ui-view="foo">                <!-- created in the context named: "A"      -->
	             *     <div ui-view>                    <!-- created in the context named: "A.B"    -->
	             *       <div ui-view="bar">            <!-- created in the context named: "A.B.C"  -->
	             *       </div>
	             *     </div>
	             *   </div>
	             * </div>
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
	             */
	            var matches = function (uiView) { return function (viewConfig) {
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
	            // Return the number of dots in the fully qualified name
	            function uiViewDepth(uiView) {
	                return uiView.fqn.split(".").length;
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
	                var matchingConfigs = _this.viewConfigs.filter(matches(uiView));
	                if (matchingConfigs.length > 1)
	                    matchingConfigs.sort(depthCompare(viewConfigDepth, -1)); // descending
	                return [uiView, matchingConfigs[0]];
	            };
	            var configureUiView = function (_a) {
	                var uiView = _a[0], viewConfig = _a[1];
	                // If a parent ui-view is reconfigured, it could destroy child ui-views.
	                // Before configuring a child ui-view, make sure it's still in the active uiViews array.
	                if (_this.uiViews.indexOf(uiView) !== -1)
	                    uiView.configUpdated(viewConfig);
	            };
	            _this.uiViews.sort(depthCompare(uiViewDepth, 1)).map(matchingConfigPair).forEach(configureUiView);
	        };
	    }
	    ViewService.prototype.rootContext = function (context) {
	        return this._rootContext = context || this._rootContext;
	    };
	    ;
	    ViewService.prototype.viewConfigFactory = function (viewType, factory) {
	        this._viewConfigFactories[viewType] = factory;
	    };
	    ViewService.prototype.createViewConfig = function (node, decl) {
	        var cfgFactory = this._viewConfigFactories[decl.$type];
	        if (!cfgFactory)
	            throw new Error("ViewService: No view config factory registered for type " + decl.$type);
	        return cfgFactory(node, decl);
	    };
	    /**
	     * De-registers a ViewConfig.
	     *
	     * @param viewConfig The ViewConfig view to deregister.
	     */
	    ViewService.prototype.deactivateViewConfig = function (viewConfig) {
	        module_1.trace.traceViewServiceEvent("<- Removing", viewConfig);
	        common_1.removeFrom(this.viewConfigs, viewConfig);
	    };
	    ;
	    ViewService.prototype.activateViewConfig = function (viewConfig) {
	        module_1.trace.traceViewServiceEvent("-> Registering", viewConfig);
	        this.viewConfigs.push(viewConfig);
	    };
	    ;
	    /**
	     * Allows a `ui-view` element to register its canonical name with a callback that allows it to
	     * be updated with a template, controller, and local variables.
	     *
	     * @param {String} name The fully-qualified name of the `ui-view` object being registered.
	     * @param {Function} configUpdatedCallback A callback that receives updates to the content & configuration
	     *                   of the view.
	     * @return {Function} Returns a de-registration function used when the view is destroyed.
	     */
	    ViewService.prototype.registerUiView = function (uiView) {
	        module_1.trace.traceViewServiceUiViewEvent("-> Registering", uiView);
	        var uiViews = this.uiViews;
	        var fqnMatches = function (uiv) { return uiv.fqn === uiView.fqn; };
	        if (uiViews.filter(fqnMatches).length)
	            module_1.trace.traceViewServiceUiViewEvent("!!!! duplicate uiView named:", uiView);
	        uiViews.push(uiView);
	        this.sync();
	        return function () {
	            var idx = uiViews.indexOf(uiView);
	            if (idx <= 0) {
	                module_1.trace.traceViewServiceUiViewEvent("Tried removing non-registered uiView", uiView);
	                return;
	            }
	            module_1.trace.traceViewServiceUiViewEvent("<- Deregistering", uiView);
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
	        return this.uiViews.map(hof_1.prop("fqn"));
	    };
	    /**
	     * Returns the list of views on the page containing loaded content.
	     *
	     * @return {Array} Returns an array of fully-qualified view names.
	     */
	    ViewService.prototype.active = function () {
	        return this.uiViews.filter(hof_1.prop("$config")).map(hof_1.prop("name"));
	    };
	    /**
	     * Normalizes a view's name from a state.views configuration block.
	     *
	     * @param context the context object (state declaration) that the view belongs to
	     * @param rawViewName the name of the view, as declared in the [[StateDeclaration.views]]
	     *
	     * @returns the normalized uiViewName and uiViewContextAnchor that the view targets
	     */
	    ViewService.normalizeUiViewTarget = function (context, rawViewName) {
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
	        return { uiViewName: uiViewName, uiViewContextAnchor: uiViewContextAnchor };
	    };
	    return ViewService;
	}());
	exports.ViewService = ViewService;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module core */ /** */
	var urlMatcherFactory_1 = __webpack_require__(47);
	var urlRouter_1 = __webpack_require__(48);
	var state_1 = __webpack_require__(18);
	var urlRouter_2 = __webpack_require__(48);
	var transitionService_1 = __webpack_require__(43);
	var view_1 = __webpack_require__(50);
	var stateRegistry_1 = __webpack_require__(36);
	var stateService_1 = __webpack_require__(37);
	var globals_1 = __webpack_require__(52);
	/**
	 * The master class used to instantiate an instance of UI-Router.
	 *
	 * This class instantiates and wires the global UI-Router services.
	 *
	 * After instantiating a new instance of the Router class, configure it for your app.  For instance, register
	 * your app states with the [[stateRegistry]] (and set url options using ...).  Then, tell UI-Router to monitor
	 * the URL by calling `urlRouter.listen()` ([[URLRouter.listen]])
	 */
	var UIRouter = (function () {
	    function UIRouter() {
	        this.viewService = new view_1.ViewService();
	        this.transitionService = new transitionService_1.TransitionService(this.viewService);
	        this.globals = new globals_1.UIRouterGlobals(this.transitionService);
	        this.urlMatcherFactory = new urlMatcherFactory_1.UrlMatcherFactory();
	        this.urlRouterProvider = new urlRouter_1.UrlRouterProvider(this.urlMatcherFactory, this.globals.params);
	        this.urlRouter = new urlRouter_2.UrlRouter(this.urlRouterProvider);
	        this.stateRegistry = new stateRegistry_1.StateRegistry(this.urlMatcherFactory, this.urlRouterProvider);
	        /** @hidden TODO: move this to ng1.ts */
	        this.stateProvider = new state_1.StateProvider(this.stateRegistry);
	        this.stateService = new stateService_1.StateService(this.viewService, this.urlRouter, this.transitionService, this.stateRegistry, this.stateProvider, this.globals);
	        this.viewService.rootContext(this.stateRegistry.root());
	        this.globals.$current = this.stateRegistry.root();
	        this.globals.current = this.globals.$current.self;
	    }
	    return UIRouter;
	}());
	exports.UIRouter = UIRouter;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module core */ /** */
	var stateParams_1 = __webpack_require__(25);
	var queue_1 = __webpack_require__(8);
	var common_1 = __webpack_require__(3);
	/**
	 * Global mutable state
	 *
	 * This is where we hold the global mutable state such as current state, current
	 * params, current transition, last successful transition, last attempted transition, etc.
	 */
	var UIRouterGlobals = (function () {
	    function UIRouterGlobals(transitionService) {
	        var _this = this;
	        /**
	         * Current parameter values
	         *
	         * The parameter values from the latest successful transition
	         */
	        this.params = new stateParams_1.StateParams();
	        /**
	         * The transition history
	         *
	         * This queue's size is limited to a maximum number (default: 1)
	         */
	        this.transitionHistory = new queue_1.Queue([], 1);
	        /**
	         * The history of successful transitions
	         *
	         * This queue's size is limited to a maximum number (default: 1)
	         */
	        this.successfulTransitions = new queue_1.Queue([], 1);
	        var beforeNewTransition = function ($transition$) {
	            _this.transition = $transition$;
	            _this.transitionHistory.enqueue($transition$);
	            var updateGlobalState = function () {
	                _this.successfulTransitions.enqueue($transition$);
	                _this.$current = $transition$.$to();
	                _this.current = _this.$current.self;
	                common_1.copy($transition$.params(), _this.params);
	            };
	            $transition$.onSuccess({}, updateGlobalState, { priority: 10000 });
	            var clearCurrentTransition = function () { if (_this.transition === $transition$)
	                _this.transition = null; };
	            $transition$.promise.then(clearCurrentTransition, clearCurrentTransition);
	        };
	        transitionService.onBefore({}, ['$transition$', beforeNewTransition]);
	    }
	    return UIRouterGlobals;
	}());
	exports.UIRouterGlobals = UIRouterGlobals;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * # UI-Router for Angular 1
	 *
	 * - Provides an implementation for the [[CoreServices]] API, based on angular 1 services.
	 * - Also registers some services with the angular 1 injector.
	 * - Creates and bootstraps a new [[UIRouter]] object.  Ties it to the the angular 1 lifecycle.
	 *
	 * @module ng1
	 * @preferred
	 */
	"use strict";
	/** for typedoc */
	var router_1 = __webpack_require__(51);
	var coreservices_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var module_1 = __webpack_require__(44);
	var module_2 = __webpack_require__(40);
	var module_3 = __webpack_require__(17);
	var trace_1 = __webpack_require__(12);
	var viewsBuilder_1 = __webpack_require__(54);
	var templateFactory_1 = __webpack_require__(55);
	/** @hidden */
	var app = angular.module("ui.router.angular1", []);
	/**
	 * @ngdoc overview
	 * @name ui.router.util
	 *
	 * @description
	 * # ui.router.util sub-module
	 *
	 * This module is a dependency of other sub-modules. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 *
	 */
	angular.module('ui.router.util', ['ng', 'ui.router.init']);
	/**
	 * @ngdoc overview
	 * @name ui.router.router
	 *
	 * @requires ui.router.util
	 *
	 * @description
	 * # ui.router.router sub-module
	 *
	 * This module is a dependency of other sub-modules. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 */
	angular.module('ui.router.router', ['ui.router.util']);
	/**
	 * @ngdoc overview
	 * @name ui.router.state
	 *
	 * @requires ui.router.router
	 * @requires ui.router.util
	 *
	 * @description
	 * # ui.router.state sub-module
	 *
	 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 *
	 */
	angular.module('ui.router.state', ['ui.router.router', 'ui.router.util', 'ui.router.angular1']);
	/**
	 * @ngdoc overview
	 * @name ui.router
	 *
	 * @requires ui.router.state
	 *
	 * @description
	 * # ui.router
	 *
	 * ## The main module for ui.router
	 * There are several sub-modules included with the ui.router module, however only this module is needed
	 * as a dependency within your angular app. The other modules are for organization purposes.
	 *
	 * The modules are:
	 * * ui.router - the main "umbrella" module
	 * * ui.router.router -
	 *
	 * *You'll need to include **only** this module as the dependency within your angular app.*
	 *
	 * <pre>
	 * <!doctype html>
	 * <html ng-app="myApp">
	 * <head>
	 *   <script src="js/angular.js"></script>
	 *   <!-- Include the ui-router script -->
	 *   <script src="js/angular-ui-router.min.js"></script>
	 *   <script>
	 *     // ...and add 'ui.router' as a dependency
	 *     var myApp = angular.module('myApp', ['ui.router']);
	 *   </script>
	 * </head>
	 * <body>
	 * </body>
	 * </html>
	 * </pre>
	 */
	angular.module('ui.router', ['ui.router.init', 'ui.router.state', 'ui.router.angular1']);
	angular.module('ui.router.compat', ['ui.router']);
	/**
	 * Annotates a controller expression (may be a controller function(), a "controllername",
	 * or "controllername as name")
	 *
	 * - Temporarily decorates $injector.instantiate.
	 * - Invokes $controller() service
	 *   - Calls $injector.instantiate with controller constructor
	 * - Annotate constructor
	 * - Undecorate $injector
	 *
	 * returns an array of strings, which are the arguments of the controller expression
	 */
	function annotateController(controllerExpression) {
	    var $injector = coreservices_1.services.$injector;
	    var $controller = $injector.get("$controller");
	    var oldInstantiate = $injector.instantiate;
	    try {
	        var deps_1;
	        $injector.instantiate = function fakeInstantiate(constructorFunction) {
	            $injector.instantiate = oldInstantiate; // Un-decorate ASAP
	            deps_1 = $injector.annotate(constructorFunction);
	        };
	        $controller(controllerExpression, { $scope: {} });
	        return deps_1;
	    }
	    finally {
	        $injector.instantiate = oldInstantiate;
	    }
	}
	exports.annotateController = annotateController;
	runBlock.$inject = ['$injector', '$q'];
	function runBlock($injector, $q) {
	    coreservices_1.services.$injector = $injector;
	    coreservices_1.services.$q = $q;
	}
	app.run(runBlock);
	var router = null;
	ng1UIRouter.$inject = ['$locationProvider'];
	/** This angular 1 provider instantiates a Router and exposes its services via the angular injector */
	function ng1UIRouter($locationProvider) {
	    // Create a new instance of the Router when the ng1UIRouterProvider is initialized
	    router = new router_1.UIRouter();
	    // Apply ng1 `views` builder to the StateBuilder
	    router.stateRegistry.decorator("views", viewsBuilder_1.ng1ViewsBuilder);
	    router.viewService.viewConfigFactory('ng1', viewsBuilder_1.ng1ViewConfigFactory);
	    // Bind LocationConfig.hashPrefix to $locationProvider.hashPrefix
	    common_1.bindFunctions($locationProvider, coreservices_1.services.locationConfig, $locationProvider, ['hashPrefix']);
	    // Create a LocationService.onChange registry
	    var urlListeners = [];
	    coreservices_1.services.location.onChange = function (callback) {
	        urlListeners.push(callback);
	        return function () { return common_1.removeFrom(urlListeners)(callback); };
	    };
	    this.$get = $get;
	    $get.$inject = ['$location', '$browser', '$sniffer', '$rootScope', '$http', '$templateCache'];
	    function $get($location, $browser, $sniffer, $rootScope, $http, $templateCache) {
	        // Bind $locationChangeSuccess to the listeners registered in LocationService.onChange
	        $rootScope.$on("$locationChangeSuccess", function (evt) { return urlListeners.forEach(function (fn) { return fn(evt); }); });
	        // Bind LocationConfig.html5Mode to $locationProvider.html5Mode and $sniffer.history
	        coreservices_1.services.locationConfig.html5Mode = function () {
	            var html5Mode = $locationProvider.html5Mode();
	            html5Mode = predicates_1.isObject(html5Mode) ? html5Mode.enabled : html5Mode;
	            return html5Mode && $sniffer.history;
	        };
	        coreservices_1.services.template.get = function (url) {
	            return $http.get(url, { cache: $templateCache, headers: { Accept: 'text/html' } }).then(hof_1.prop("data"));
	        };
	        // Bind these LocationService functions to $location
	        common_1.bindFunctions($location, coreservices_1.services.location, $location, ["replace", "url", "path", "search", "hash"]);
	        // Bind these LocationConfig functions to $location
	        common_1.bindFunctions($location, coreservices_1.services.locationConfig, $location, ['port', 'protocol', 'host']);
	        // Bind these LocationConfig functions to $browser
	        common_1.bindFunctions($browser, coreservices_1.services.locationConfig, $browser, ['baseHref']);
	        return router;
	    }
	}
	var resolveFactory = function () { return ({
	    /**
	     * This emulates most of the behavior of the ui-router 0.2.x $resolve.resolve() service API.
	     * @param invocables an object, with keys as resolve names and values as injectable functions
	     * @param locals key/value pre-resolved data (locals)
	     * @param parent a promise for a "parent resolve"
	     */
	    resolve: function (invocables, locals, parent) {
	        if (locals === void 0) { locals = {}; }
	        var parentNode = new module_1.Node(new module_3.State({ params: {} }));
	        var node = new module_1.Node(new module_3.State({ params: {} }));
	        var context = new module_2.ResolveContext([parentNode, node]);
	        context.addResolvables(module_2.Resolvable.makeResolvables(invocables), node.state);
	        var resolveData = function (parentLocals) {
	            var rewrap = function (_locals) { return module_2.Resolvable.makeResolvables(common_1.map(_locals, function (local) { return function () { return local; }; })); };
	            context.addResolvables(rewrap(parentLocals), parentNode.state);
	            context.addResolvables(rewrap(locals), node.state);
	            return context.resolvePath();
	        };
	        return parent ? parent.then(resolveData) : resolveData({});
	    }
	}); };
	function $stateParamsFactory(ng1UIRouter) {
	    return ng1UIRouter.globals.params;
	}
	// The 'ui.router' ng1 module depends on 'ui.router.init' module.
	angular.module('ui.router.init', []).provider("ng1UIRouter", ng1UIRouter);
	// This effectively calls $get() to init when we enter runtime
	angular.module('ui.router.init').run(['ng1UIRouter', function (ng1UIRouter) { }]);
	// $urlMatcherFactory service and $urlMatcherFactoryProvider
	angular.module('ui.router.util').provider('$urlMatcherFactory', ['ng1UIRouterProvider', function () { return router.urlMatcherFactory; }]);
	angular.module('ui.router.util').run(['$urlMatcherFactory', function ($urlMatcherFactory) { }]);
	// $urlRouter service and $urlRouterProvider
	function getUrlRouterProvider() {
	    router.urlRouterProvider["$get"] = function () {
	        router.urlRouter.update(true);
	        if (!this.interceptDeferred)
	            router.urlRouter.listen();
	        return router.urlRouter;
	    };
	    return router.urlRouterProvider;
	}
	angular.module('ui.router.router').provider('$urlRouter', ['ng1UIRouterProvider', getUrlRouterProvider]);
	angular.module('ui.router.router').run(['$urlRouter', function ($urlRouter) { }]);
	// $state service and $stateProvider
	// $urlRouter service and $urlRouterProvider
	function getStateProvider() {
	    router.stateProvider["$get"] = function () {
	        // Autoflush once we are in runtime
	        router.stateRegistry.stateQueue.autoFlush(router.stateService);
	        return router.stateService;
	    };
	    return router.stateProvider;
	}
	angular.module('ui.router.state').provider('$state', ['ng1UIRouterProvider', getStateProvider]);
	angular.module('ui.router.state').run(['$state', function ($state) { }]);
	// $stateParams service
	angular.module('ui.router.state').factory('$stateParams', ['ng1UIRouter', function (ng1UIRouter) {
	        return ng1UIRouter.globals.params;
	    }]);
	// $transitions service and $transitionsProvider
	function getTransitionsProvider() {
	    loadAllControllerLocals.$inject = ['$transition$'];
	    function loadAllControllerLocals($transition$) {
	        var loadLocals = function (vc) {
	            var node = common_1.find($transition$.treeChanges().to, hof_1.propEq('state', vc.viewDecl.$context));
	            // Temporary fix; This whole callback should be nuked when fixing #2662
	            if (!node)
	                return coreservices_1.services.$q.when();
	            var resolveCtx = node.resolveContext;
	            var controllerDeps = annotateController(vc.controller);
	            var resolvables = resolveCtx.getResolvables();
	            function $loadControllerLocals() { }
	            $loadControllerLocals.$inject = controllerDeps.filter(function (dep) { return resolvables.hasOwnProperty(dep); });
	            // Load any controller resolves that aren't already loaded
	            return resolveCtx.invokeLater($loadControllerLocals)
	                .then(function () { return vc.locals = common_1.map(resolvables, function (res) { return res.data; }); });
	        };
	        var loadAllLocals = $transition$.views("entering").filter(function (vc) { return !!vc.controller; }).map(loadLocals);
	        return coreservices_1.services.$q.all(loadAllLocals).then(common_1.noop);
	    }
	    router.transitionService.onFinish({}, loadAllControllerLocals);
	    router.transitionService["$get"] = function () { return router.transitionService; };
	    return router.transitionService;
	}
	angular.module('ui.router.state').provider('$transitions', ['ng1UIRouterProvider', getTransitionsProvider]);
	// $templateFactory service
	angular.module('ui.router.util').factory('$templateFactory', ['ng1UIRouter', function () { return new templateFactory_1.TemplateFactory(); }]);
	// The $view service
	angular.module('ui.router').factory('$view', function () { return router.viewService; });
	// The old $resolve service
	angular.module('ui.router').factory('$resolve', resolveFactory);
	// $trace service
	angular.module("ui.router").service("$trace", function () { return trace_1.trace; });
	watchDigests.$inject = ['$rootScope'];
	function watchDigests($rootScope) {
	    $rootScope.$watch(function () { trace_1.trace.approximateDigests++; });
	}
	exports.watchDigests = watchDigests;
	angular.module("ui.router").run(watchDigests);


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(3);
	var strings_1 = __webpack_require__(9);
	var view_1 = __webpack_require__(50);
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var trace_1 = __webpack_require__(12);
	var templateFactory_1 = __webpack_require__(55);
	exports.ng1ViewConfigFactory = function (node, view) { return new Ng1ViewConfig(node, view); };
	/**
	 * This is a [[StateBuilder.builder]] function for angular1 `views`.
	 *
	 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
	 * handles the `views` property with logic specific to angular-ui-router (ng1).
	 *
	 * If no `views: {}` property exists on the [[StateDeclaration]], then it creates the `views` object
	 * and applies the state-level configuration to a view named `$default`.
	 */
	function ng1ViewsBuilder(state) {
	    var tplKeys = ['templateProvider', 'templateUrl', 'template', 'notify', 'async'], ctrlKeys = ['controller', 'controllerProvider', 'controllerAs', 'resolveAs'], compKeys = ['component', 'bindings'], nonCompKeys = tplKeys.concat(ctrlKeys), allKeys = compKeys.concat(nonCompKeys);
	    var views = {}, viewsObject = state.views || { "$default": common_1.pick(state, allKeys) };
	    common_1.forEach(viewsObject, function (config, name) {
	        // Account for views: { "": { template... } }
	        name = name || "$default";
	        // Account for views: { header: "headerComponent" }
	        if (predicates_1.isString(config))
	            config = { component: config };
	        if (!Object.keys(config).length)
	            return;
	        // Configure this view for routing to an angular 1.5+ style .component (or any directive, really)
	        if (config.component) {
	            if (nonCompKeys.map(function (key) { return predicates_1.isDefined(config[key]); }).reduce(common_1.anyTrueR, false)) {
	                throw new Error("Cannot combine: " + compKeys.join("|") + " with: " + nonCompKeys.join("|") + " in stateview: 'name@" + state.name + "'");
	            }
	            // Dynamically build a template like "<component-name input1='$resolve.foo'></component-name>"
	            config.templateProvider = ['$injector', function ($injector) {
	                    var resolveFor = function (key) { return config.bindings && config.bindings[key] || key; };
	                    var prefix = angular.version.minor >= 3 ? "::" : "";
	                    var attrs = getComponentInputs($injector, config.component).map(function (key) { return (strings_1.kebobString(key) + "='" + prefix + "$resolve." + resolveFor(key) + "'"); }).join(" ");
	                    var kebobName = strings_1.kebobString(config.component);
	                    return "<" + kebobName + " " + attrs + "></" + kebobName + ">";
	                }];
	        }
	        config.resolveAs = config.resolveAs || '$resolve';
	        config.$type = "ng1";
	        config.$context = state;
	        config.$name = name;
	        var normalized = view_1.ViewService.normalizeUiViewTarget(config.$context, config.$name);
	        config.$uiViewName = normalized.uiViewName;
	        config.$uiViewContextAnchor = normalized.uiViewContextAnchor;
	        views[name] = config;
	    });
	    return views;
	}
	exports.ng1ViewsBuilder = ng1ViewsBuilder;
	// for ng 1.2 style, process the scope: { input: "=foo" } object
	var scopeBindings = function (bindingsObj) { return Object.keys(bindingsObj || {})
	    .map(function (key) { return [key, /^[=<](.*)/.exec(bindingsObj[key])]; })
	    .filter(function (tuple) { return predicates_1.isDefined(tuple[1]); })
	    .map(function (tuple) { return tuple[1][1] || tuple[0]; }); };
	// for ng 1.3+ bindToController or 1.5 component style, process a $$bindings object
	var bindToCtrlBindings = function (bindingsObj) { return Object.keys(bindingsObj || {})
	    .filter(function (key) { return !!/[=<]/.exec(bindingsObj[key].mode); })
	    .map(function (key) { return bindingsObj[key].attrName; }); };
	// Given a directive definition, find its object input attributes
	// Use different properties, depending on the type of directive (component, bindToController, normal)
	var getBindings = function (def) {
	    if (predicates_1.isObject(def.bindToController))
	        return scopeBindings(def.bindToController);
	    if (def.$$bindings && def.$$bindings.bindToController)
	        return bindToCtrlBindings(def.$$bindings.bindToController);
	    if (def.$$isolateBindings)
	        return bindToCtrlBindings(def.$$isolateBindings);
	    return scopeBindings(def.scope);
	};
	// Gets all the directive(s)' inputs ('=' and '<')
	function getComponentInputs($injector, name) {
	    var cmpDefs = $injector.get(name + "Directive"); // could be multiple
	    if (!cmpDefs || !cmpDefs.length)
	        throw new Error("Unable to find component named '" + name + "'");
	    return cmpDefs.map(getBindings).reduce(common_1.unnestR, []);
	}
	var Ng1ViewConfig = (function () {
	    function Ng1ViewConfig(node, viewDecl) {
	        this.node = node;
	        this.viewDecl = viewDecl;
	        this.loaded = false;
	    }
	    Ng1ViewConfig.prototype.load = function () {
	        var _this = this;
	        var $q = coreservices_1.services.$q;
	        if (!this.hasTemplate())
	            throw new Error("No template configuration specified for '" + this.viewDecl.$uiViewName + "@" + this.viewDecl.$uiViewContextAnchor + "'");
	        var injector = this.node.resolveContext;
	        var params = this.node.paramValues;
	        var promises = {
	            template: $q.when(this.getTemplate(params, new templateFactory_1.TemplateFactory(), injector)),
	            controller: $q.when(this.getController(injector))
	        };
	        return $q.all(promises).then(function (results) {
	            trace_1.trace.traceViewServiceEvent("Loaded", _this);
	            _this.controller = results.controller;
	            _this.template = results.template;
	        });
	    };
	    /**
	     * Checks a view configuration to ensure that it specifies a template.
	     *
	     * @return {boolean} Returns `true` if the configuration contains a valid template, otherwise `false`.
	     */
	    Ng1ViewConfig.prototype.hasTemplate = function () {
	        return !!(this.viewDecl.template || this.viewDecl.templateUrl || this.viewDecl.templateProvider);
	    };
	    Ng1ViewConfig.prototype.getTemplate = function (params, $factory, injector) {
	        return $factory.fromConfig(this.viewDecl, params, injector.invokeLater.bind(injector));
	    };
	    /**
	     * Gets the controller for a view configuration.
	     *
	     * @returns {Function|Promise.<Function>} Returns a controller, or a promise that resolves to a controller.
	     */
	    Ng1ViewConfig.prototype.getController = function (injector) {
	        //* @param {Object} locals A context object from transition.context() to invoke a function in the correct context
	        var provider = this.viewDecl.controllerProvider;
	        return predicates_1.isInjectable(provider) ? injector.invokeLater(provider, {}) : this.viewDecl.controller;
	    };
	    return Ng1ViewConfig;
	}());
	exports.Ng1ViewConfig = Ng1ViewConfig;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module view */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	/**
	 * Service which manages loading of templates from a ViewConfig.
	 */
	var TemplateFactory = (function () {
	    function TemplateFactory() {
	    }
	    /**
	     * Creates a template from a configuration object.
	     *
	     * @param config Configuration object for which to load a template.
	     * The following properties are search in the specified order, and the first one
	     * that is defined is used to create the template:
	     *
	     * @param params  Parameters to pass to the template function.
	     * @param injectFn Function to which an injectable function may be passed.
	     *        If templateProvider is defined, this injectFn will be used to invoke it.
	     *
	     * @return {string|object}  The template html as a string, or a promise for
	     * that string,or `null` if no template is configured.
	     */
	    TemplateFactory.prototype.fromConfig = function (config, params, injectFn) {
	        return (predicates_1.isDefined(config.template) ? this.fromString(config.template, params) :
	            predicates_1.isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
	                predicates_1.isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, injectFn) :
	                    null);
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
	        return predicates_1.isFunction(template) ? template(params) : template;
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
	        if (predicates_1.isFunction(url))
	            url = url(params);
	        if (url == null)
	            return null;
	        return coreservices_1.services.template.get(url);
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
	    TemplateFactory.prototype.fromProvider = function (provider, params, injectFn) {
	        return injectFn(provider);
	    };
	    ;
	    return TemplateFactory;
	}());
	exports.TemplateFactory = TemplateFactory;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * These are the UI-Router angular 1 directives.
	 *
	 * These directives are used in templates to create viewports and navigate to states
	 *
	 * @preferred @module ng1_directives
	 */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	/** @hidden */
	function parseStateRef(ref, current) {
	    var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
	    if (preparsed)
	        ref = current + '(' + preparsed[1] + ')';
	    parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
	    if (!parsed || parsed.length !== 4)
	        throw new Error("Invalid state ref '" + ref + "'");
	    return { state: parsed[1], paramExpr: parsed[3] || null };
	}
	/** @hidden */
	function stateContext(el) {
	    var $uiView = el.parent().inheritedData('$uiView');
	    var context = hof_1.parse('$cfg.node.state')($uiView);
	    return context && context.name ? context : undefined;
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
	function clickHook(el, $state, $timeout, type, current) {
	    return function (e) {
	        var button = e.which || e.button, target = current();
	        if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr('target'))) {
	            // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
	            var transition = $timeout(function () {
	                $state.go(target.state, target.params, target.options);
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
	    return { relative: stateContext(el) || $state.$current, inherit: true };
	}
	/**
	 * `ui-sref`: A directive for linking to a state
	 *
	 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated
	 * URL, the directive will automatically generate & update the `href` attribute via
	 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking
	 * the link will trigger a state transition with optional parameters.
	 *
	 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be
	 * handled natively by the browser.
	 *
	 * You can also use relative state paths within ui-sref, just like the relative
	 * paths passed to `$state.go()`. You just need to be aware that the path is relative
	 * to the state that the link lives in, in other words the state that loaded the
	 * template containing the link.
	 *
	 * You can specify options to pass to {@link ui.router.state.$state#go $state.go()}
	 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
	 * and `reload`.
	 *
	 * Here's an example of how you'd use ui-sref and how it would compile. If you have the
	 * following template:
	 *
	 * @example
	 * ```html
	 *
	 * <pre>
	 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
	 *
	 * <ul>
	 *     <li ng-repeat="contact in contacts">
	 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
	 *     </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
	 *
	 * ```html
	 *
	 * <pre>
	 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
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
	 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
	 * </pre>
	 * ```
	 *
	 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
	 * @param {Object} ui-sref-opts options to pass to [[StateService.go]]
	 */
	var uiSrefNg1 = ['$state', '$timeout',
	    function $StateRefDirective($state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	            link: function (scope, element, attrs, uiSrefActive) {
	                var ref = parseStateRef(attrs.uiSref, $state.current.name);
	                var def = { state: ref.state, href: null, params: null, options: null };
	                var type = getTypeInfo(element);
	                var active = uiSrefActive[1] || uiSrefActive[0];
	                var unlinkInfoFn = null;
	                def.options = common_1.extend(defaultOpts(element, $state), attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {});
	                var update = function (val) {
	                    if (val)
	                        def.params = angular.copy(val);
	                    def.href = $state.href(ref.state, def.params, def.options);
	                    if (unlinkInfoFn)
	                        unlinkInfoFn();
	                    if (active)
	                        unlinkInfoFn = active.$$addStateInfo(ref.state, def.params);
	                    if (def.href !== null)
	                        attrs.$set(type.attr, def.href);
	                };
	                if (ref.paramExpr) {
	                    scope.$watch(ref.paramExpr, function (val) { if (val !== def.params)
	                        update(val); }, true);
	                    def.params = angular.copy(scope.$eval(ref.paramExpr));
	                }
	                update();
	                if (!type.clickable)
	                    return;
	                element.bind("click", clickHook(element, $state, $timeout, type, function () { return def; }));
	            }
	        };
	    }];
	/**
	 * `ui-state`: A dynamic version of `ui-sref`
	 *
	 * Much like ui-sref, but will accept named $scope properties to evaluate for a state definition,
	 * params and override options.
	 *
	 * @example
	 * ```html
	 *
	 * <li ng-repeat="nav in navlinks">
	 *   <a ui-state="nav.statename">{{nav.description}}</a>
	 * </li>
	 *
	 * @param {string} ui-state 'stateName' can be any valid absolute or relative state
	 * @param {Object} ui-state-params params to pass to [[StateService.href]]
	 * @param {Object} ui-state-opts options to pass to [[StateService.go]]
	 */
	var uiStateNg1 = ['$state', '$timeout',
	    function $StateRefDynamicDirective($state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	            link: function (scope, element, attrs, uiSrefActive) {
	                var type = getTypeInfo(element);
	                var active = uiSrefActive[1] || uiSrefActive[0];
	                var group = [attrs.uiState, attrs.uiStateParams || null, attrs.uiStateOpts || null];
	                var watch = '[' + group.map(function (val) { return val || 'null'; }).join(', ') + ']';
	                var def = { state: null, params: null, options: null, href: null };
	                var unlinkInfoFn = null;
	                function runStateRefLink(group) {
	                    def.state = group[0];
	                    def.params = group[1];
	                    def.options = group[2];
	                    def.href = $state.href(def.state, def.params, def.options);
	                    if (unlinkInfoFn)
	                        unlinkInfoFn();
	                    if (active)
	                        unlinkInfoFn = active.$$addStateInfo(def.state, def.params);
	                    if (def.href)
	                        attrs.$set(type.attr, def.href);
	                }
	                scope.$watch(watch, runStateRefLink, true);
	                runStateRefLink(scope.$eval(watch));
	                if (!type.clickable)
	                    return;
	                element.bind("click", clickHook(element, $state, $timeout, type, function () { return def; }));
	            }
	        };
	    }];
	/**
	 * `ui-sref-active` and `ui-sref-active-eq`: A directive that adds a CSS class when a `ui-sref` is active
	 *
	 * A directive working alongside ui-sref to add classes to an element when the
	 * related ui-sref directive's state is active, and removing them when it is inactive.
	 * The primary use-case is to simplify the special appearance of navigation menus
	 * relying on `ui-sref`, by having the "active" state's menu button appear different,
	 * distinguishing it from the inactive menu items.
	 *
	 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
	 * ui-sref-active found at the same level or above the ui-sref will be used.
	 *
	 * Will activate when the ui-sref's target state or any child state is active. If you
	 * need to activate only when the ui-sref target state is active and *not* any of
	 * it's children, then you will use ui-sref-active-eq
	 *
	 * Given the following template:
	 * @example
	 * ```html
	 *
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active="active" class="item">
	 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 *
	 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
	 * the resulting HTML will appear as (note the 'active' class):
	 *
	 * ```html
	 *
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active="active" class="item active">
	 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 * The class name is interpolated **once** during the directives link time (any further changes to the
	 * interpolated value are ignored).
	 *
	 * Multiple classes may be specified in a space-separated format:
	 *
	 * ```html
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active='class1 class2 class3'>
	 *     <a ui-sref="app.user">link</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 * It is also possible to pass ui-sref-active an expression that evaluates
	 * to an object hash, whose keys represent active class names and whose
	 * values represent the respective state names/globs.
	 * ui-sref-active will match if the current active state **includes** any of
	 * the specified state names/globs, even the abstract ones.
	 *
	 * Given the following template, with "admin" being an abstract state:
	 * @example
	 * ```html
	 *
	 * <pre>
	 * <div ui-sref-active="{'active': 'admin.*'}">
	 *   <a ui-sref-active="active" ui-sref="admin.roles">Roles</a>
	 * </div>
	 * </pre>
	 * ```
	 *
	 * When the current state is "admin.roles" the "active" class will be applied
	 * to both the <div> and <a> elements. It is important to note that the state
	 * names/globs passed to ui-sref-active shadow the state provided by ui-sref.
	 */
	var uiSrefActiveNg1 = ['$state', '$stateParams', '$interpolate', '$transitions',
	    function $StateRefActiveDirective($state, $stateParams, $interpolate, $transitions) {
	        return {
	            restrict: "A",
	            controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
	                    var states = [], activeClasses = {}, activeEqClass, uiSrefActive;
	                    // There probably isn't much point in $observing this
	                    // uiSrefActive and uiSrefActiveEq share the same directive object with some
	                    // slight difference in logic routing
	                    activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);
	                    try {
	                        uiSrefActive = $scope.$eval($attrs.uiSrefActive);
	                    }
	                    catch (e) {
	                    }
	                    uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || '', false)($scope);
	                    if (predicates_1.isObject(uiSrefActive)) {
	                        common_1.forEach(uiSrefActive, function (stateOrName, activeClass) {
	                            if (predicates_1.isString(stateOrName)) {
	                                var ref = parseStateRef(stateOrName, $state.current.name);
	                                addState(ref.state, $scope.$eval(ref.paramExpr), activeClass);
	                            }
	                        });
	                    }
	                    // Allow uiSref to communicate with uiSrefActive[Equals]
	                    this.$$addStateInfo = function (newState, newParams) {
	                        // we already got an explicit state provided by ui-sref-active, so we
	                        // shadow the one that comes from ui-sref
	                        if (predicates_1.isObject(uiSrefActive) && states.length > 0) {
	                            return;
	                        }
	                        var deregister = addState(newState, newParams, uiSrefActive);
	                        update();
	                        return deregister;
	                    };
	                    $scope.$on('$stateChangeSuccess', update);
	                    var updateAfterTransition = ['$transition$', function ($transition$) { $transition$.promise.then(update); }];
	                    var deregisterFn = $transitions.onStart({}, updateAfterTransition);
	                    $scope.$on('$destroy', deregisterFn);
	                    function addState(stateName, stateParams, activeClass) {
	                        var state = $state.get(stateName, stateContext($element));
	                        var stateHash = createStateHash(stateName, stateParams);
	                        var stateInfo = {
	                            state: state || { name: stateName },
	                            params: stateParams,
	                            hash: stateHash
	                        };
	                        states.push(stateInfo);
	                        activeClasses[stateHash] = activeClass;
	                        return function removeState() {
	                            var idx = states.indexOf(stateInfo);
	                            if (idx !== -1)
	                                states.splice(idx, 1);
	                        };
	                    }
	                    /**
	                     * @param {string} state
	                     * @param {Object|string} [params]
	                     * @return {string}
	                     */
	                    function createStateHash(state, params) {
	                        if (!predicates_1.isString(state)) {
	                            throw new Error('state should be a string');
	                        }
	                        if (predicates_1.isObject(params)) {
	                            return state + common_1.toJson(params);
	                        }
	                        params = $scope.$eval(params);
	                        if (predicates_1.isObject(params)) {
	                            return state + common_1.toJson(params);
	                        }
	                        return state;
	                    }
	                    // Update route state
	                    function update() {
	                        for (var i = 0; i < states.length; i++) {
	                            if (anyMatch(states[i].state, states[i].params)) {
	                                addClass($element, activeClasses[states[i].hash]);
	                            }
	                            else {
	                                removeClass($element, activeClasses[states[i].hash]);
	                            }
	                            if (exactMatch(states[i].state, states[i].params)) {
	                                addClass($element, activeEqClass);
	                            }
	                            else {
	                                removeClass($element, activeEqClass);
	                            }
	                        }
	                    }
	                    function addClass(el, className) { $timeout(function () { el.addClass(className); }); }
	                    function removeClass(el, className) { el.removeClass(className); }
	                    function anyMatch(state, params) { return $state.includes(state.name, params); }
	                    function exactMatch(state, params) { return $state.is(state.name, params); }
	                    update();
	                }]
	        };
	    }];
	angular.module('ui.router.state')
	    .directive('uiSref', uiSrefNg1)
	    .directive('uiSrefActive', uiSrefActiveNg1)
	    .directive('uiSrefActiveEq', uiSrefActiveNg1)
	    .directive('uiState', uiStateNg1);


/***/ },
/* 57 */
/***/ function(module, exports) {

	/** @module state */ /** for typedoc */
	"use strict";
	/**
	 * @ngdoc filter
	 * @name ui.router.state.filter:isState
	 *
	 * @requires ui.router.state.$state
	 *
	 * @description
	 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
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
	 * @ngdoc filter
	 * @name ui.router.state.filter:includedByState
	 *
	 * @requires ui.router.state.$state
	 *
	 * @description
	 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
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
	angular.module('ui.router.state')
	    .filter('isState', $IsStateFilter)
	    .filter('includedByState', $IncludedByStateFilter);


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/** @module ng1_directives */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(12);
	var rejectFactory_1 = __webpack_require__(10);
	var hof_1 = __webpack_require__(5);
	var strings_1 = __webpack_require__(9);
	/**
	 * `ui-view`: A viewport directive which is filled in by a view from the active state.
	 *
	 * @param {string=} name A view name. The name should be unique amongst the other views in the
	 * same state. You can have views of the same name that live in different states.
	 *
	 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
	 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
	 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
	 * scroll ui-view elements into view when they are populated during a state activation.
	 *
	 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
	 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
	 *
	 * @param {string=} onload Expression to evaluate whenever the view updates.
	 *
	 * A view can be unnamed or named.
	 * @example
	 * ```html
	 *
	 * <!-- Unnamed -->
	 * <div ui-view></div>
	 *
	 * <!-- Named -->
	 * <div ui-view="viewName"></div>
	 * ```
	 *
	 * You can only have one unnamed view within any template (or root html). If you are only using a
	 * single view and it is unnamed then you can populate it like so:
	 * ```
	 *
	 * <div ui-view></div>
	 * $stateProvider.state("home", {
	 *   template: "<h1>HELLO!</h1>"
	 * })
	 * ```
	 *
	 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
	 * config property, by name, in this case an empty name:
	 * ```js
	 *
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "": {
	 *       template: "<h1>HELLO!</h1>"
	 *     }
	 *   }
	 * })
	 * ```
	 *
	 * But typically you'll only use the views property if you name your view or have more than one view
	 * in the same template. There's not really a compelling reason to name a view if its the only one,
	 * but you could if you wanted, like so:
	 *
	 * ```html
	 *
	 * <div ui-view="main"></div>
	 * ```
	 *
	 * ```js
	 *
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "main": {
	 *       template: "<h1>HELLO!</h1>"
	 *     }
	 *   }
	 * })
	 * ```
	 *
	 * Really though, you'll use views to set up multiple views:
	 * ```html
	 *
	 * <div ui-view></div>
	 * <div ui-view="chart"></div>
	 * <div ui-view="data"></div>
	 * ```
	 *
	 * ```js
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "": {
	 *       template: "<h1>HELLO!</h1>"
	 *     },
	 *     "chart": {
	 *       template: "<chart_thing/>"
	 *     },
	 *     "data": {
	 *       template: "<data_thing/>"
	 *     }
	 *   }
	 * })
	 * ```
	 *
	 * Examples for `autoscroll`:
	 *
	 * ```html
	 *
	 * <!-- If autoscroll present with no expression,
	 *      then scroll ui-view into view -->
	 * <ui-view autoscroll/>
	 *
	 * <!-- If autoscroll present with valid expression,
	 *      then scroll ui-view into view if expression evaluates to true -->
	 * <ui-view autoscroll='true'/>
	 * <ui-view autoscroll='false'/>
	 * <ui-view autoscroll='scopeVariable'/>
	 * ```
	 *
	 * Resolve data:
	 *
	 * The resolved data from the state's `resolve` block is placed on the scope as `$resolve` (this
	 * can be customized using [[ViewDeclaration.resolveAs]]).  This can be then accessed from the template.
	 *
	 * Note that when `controllerAs` is being used, `$resolve` is set on the controller instance *after* the
	 * controller is instantiated.  The `$onInit()` hook can be used to perform initialization code which
	 * depends on `$resolve` data.
	 *
	 * @example
	 * ```js
	 *
	 * $stateProvider.state('home', {
	 *   template: '<my-component user="$resolve.user"></my-component>',
	 *   resolve: {
	 *     user: function(UserService) { return UserService.fetchUser(); }
	 *   }
	 * });
	 * ```
	 */
	var uiViewNg1 = ['$view', '$animate', '$uiViewScroll', '$interpolate', '$q',
	    function $ViewDirective($view, $animate, $uiViewScroll, $interpolate, $q) {
	        function getRenderer(attrs, scope) {
	            return {
	                enter: function (element, target, cb) {
	                    if (angular.version.minor > 2) {
	                        $animate.enter(element, null, target).then(cb);
	                    }
	                    else {
	                        $animate.enter(element, null, target, cb);
	                    }
	                },
	                leave: function (element, cb) {
	                    if (angular.version.minor > 2) {
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
	            $cfg: { viewDecl: { $context: $view.rootContext() } },
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
	                    var previousEl, currentEl, currentScope, unregister, onloadExp = attrs.onload || '', autoScrollExp = attrs.autoscroll, renderer = getRenderer(attrs, scope), viewConfig = undefined, inherited = $element.inheritedData('$uiView') || rootData, name = $interpolate(attrs.uiView || attrs.name || '')(scope) || '$default';
	                    var activeUIView = {
	                        id: directive.count++,
	                        name: name,
	                        fqn: inherited.$uiView.fqn ? inherited.$uiView.fqn + "." + name : name,
	                        config: null,
	                        configUpdated: configUpdatedCallback,
	                        get creationContext() {
	                            return hof_1.parse('$cfg.viewDecl.$context')(inherited);
	                        }
	                    };
	                    trace_1.trace.traceUiViewEvent("Linking", activeUIView);
	                    function configUpdatedCallback(config) {
	                        if (configsEqual(viewConfig, config))
	                            return;
	                        trace_1.trace.traceUiViewConfigUpdated(activeUIView, config && config.viewDecl && config.viewDecl.$context);
	                        viewConfig = config;
	                        updateView(config);
	                    }
	                    $element.data('$uiView', { $uiView: activeUIView });
	                    updateView();
	                    unregister = $view.registerUiView(activeUIView);
	                    scope.$on("$destroy", function () {
	                        trace_1.trace.traceUiViewEvent("Destroying/Unregistering", activeUIView);
	                        unregister();
	                    });
	                    function cleanupLastView() {
	                        if (previousEl) {
	                            trace_1.trace.traceUiViewEvent("Removing (previous) el", previousEl.data('$uiView'));
	                            previousEl.remove();
	                            previousEl = null;
	                        }
	                        if (currentScope) {
	                            trace_1.trace.traceUiViewEvent("Destroying scope", activeUIView);
	                            currentScope.$destroy();
	                            currentScope = null;
	                        }
	                        if (currentEl) {
	                            var _viewData_1 = currentEl.data('$uiView');
	                            trace_1.trace.traceUiViewEvent("Animate out", _viewData_1);
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
	                        trace_1.trace.traceUiViewScopeCreated(activeUIView, newScope);
	                        var animEnter = $q.defer(), animLeave = $q.defer();
	                        var $uiViewData = {
	                            $cfg: config,
	                            $uiView: activeUIView,
	                            $animEnter: animEnter.promise,
	                            $animLeave: animLeave.promise,
	                            $$animLeave: animLeave
	                        };
	                        var cloned = $transclude(newScope, function (clone) {
	                            renderer.enter(clone.data('$uiView', $uiViewData), $element, function onUiViewEnter() {
	                                animEnter.resolve();
	                                if (currentScope)
	                                    currentScope.$emit('$viewContentAnimationEnded');
	                                if (predicates_1.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
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
	$ViewDirectiveFill.$inject = ['$compile', '$controller', '$transitions', '$view', '$timeout'];
	/** @hidden */
	function $ViewDirectiveFill($compile, $controller, $transitions, $view, $timeout) {
	    var getControllerAs = hof_1.parse('viewDecl.controllerAs');
	    var getResolveAs = hof_1.parse('viewDecl.resolveAs');
	    var getResolveContext = hof_1.parse('node.resolveContext');
	    return {
	        restrict: 'ECA',
	        priority: -400,
	        compile: function (tElement) {
	            var initial = tElement.html();
	            return function (scope, $element) {
	                var data = $element.data('$uiView');
	                if (!data)
	                    return;
	                var cfg = data.$cfg || { viewDecl: {} };
	                $element.html(cfg.template || initial);
	                trace_1.trace.traceUiViewFill(data.$uiView, $element.html());
	                var link = $compile($element.contents());
	                var controller = cfg.controller;
	                var controllerAs = getControllerAs(cfg);
	                var resolveAs = getResolveAs(cfg);
	                var resolveCtx = getResolveContext(cfg);
	                var locals = resolveCtx && common_1.map(resolveCtx.getResolvables(), function (r) { return r.data; });
	                scope[resolveAs] = locals;
	                if (controller) {
	                    var controllerInstance = $controller(controller, common_1.extend({}, locals, { $scope: scope, $element: $element }));
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
	                    registerControllerCallbacks($transitions, controllerInstance, scope, cfg);
	                }
	                // Wait for the component to appear in the DOM
	                if (cfg.viewDecl.component) {
	                    var cmp_1 = cfg.viewDecl.component;
	                    var kebobName_1 = strings_1.kebobString(cmp_1);
	                    var getComponentController = function () {
	                        var directiveEl = [].slice.call($element[0].children)
	                            .filter(function (el) { return el && el.tagName && el.tagName.toLowerCase() === kebobName_1; });
	                        return directiveEl && angular.element(directiveEl).data("$" + cmp_1 + "Controller");
	                    };
	                    var deregisterWatch_1 = scope.$watch(getComponentController, function (ctrlInstance) {
	                        if (!ctrlInstance)
	                            return;
	                        registerControllerCallbacks($transitions, ctrlInstance, scope, cfg);
	                        deregisterWatch_1();
	                    });
	                }
	                link(scope);
	            };
	        }
	    };
	}
	/** @hidden */
	var hasComponentImpl = typeof angular.module('ui.router')['component'] === 'function';
	/** @hidden TODO: move these callbacks to $view and/or `/hooks/components.ts` or something */
	function registerControllerCallbacks($transitions, controllerInstance, $scope, cfg) {
	    // Call $onInit() ASAP
	    if (predicates_1.isFunction(controllerInstance.$onInit) && !(cfg.viewDecl.component && hasComponentImpl))
	        controllerInstance.$onInit();
	    var hookOptions = { bind: controllerInstance };
	    // Add component-level hook for onParamsChange
	    if (predicates_1.isFunction(controllerInstance.uiOnParamsChanged)) {
	        // Fire callback on any successful transition
	        var paramsUpdated_1 = function ($transition$) {
	            var ctx = cfg.node.resolveContext;
	            var viewCreationTrans = ctx.getResolvables()['$transition$'].data;
	            // Exit early if the $transition$ is the same as the view was created within.
	            // Exit early if the $transition$ will exit the state the view is for.
	            if ($transition$ === viewCreationTrans || $transition$.exiting().indexOf(cfg.node.state.self) !== -1)
	                return;
	            var toParams = $transition$.params("to");
	            var fromParams = $transition$.params("from");
	            var toSchema = $transition$.treeChanges().to.map(function (node) { return node.paramSchema; }).reduce(common_1.unnestR, []);
	            var fromSchema = $transition$.treeChanges().from.map(function (node) { return node.paramSchema; }).reduce(common_1.unnestR, []);
	            // Find the to params that have different values than the from params
	            var changedToParams = toSchema.filter(function (param) {
	                var idx = fromSchema.indexOf(param);
	                return idx === -1 || !fromSchema[idx].type.equals(toParams[param.id], fromParams[param.id]);
	            });
	            // Only trigger callback if a to param has changed or is new
	            if (changedToParams.length) {
	                var changedKeys_1 = changedToParams.map(function (x) { return x.id; });
	                // Filter the params to only changed/new to params.  `$transition$.params()` may be used to get all params.
	                controllerInstance.uiOnParamsChanged(common_1.filter(toParams, function (val, key) { return changedKeys_1.indexOf(key) !== -1; }), $transition$);
	            }
	        };
	        $scope.$on('$destroy', $transitions.onSuccess({}, ['$transition$', paramsUpdated_1]), hookOptions);
	        // Fire callback on any IGNORED transition
	        var onDynamic = function ($error$, $transition$) {
	            if ($error$.type === rejectFactory_1.RejectType.IGNORED)
	                paramsUpdated_1($transition$);
	        };
	        $scope.$on('$destroy', $transitions.onError({}, ['$error$', '$transition$', onDynamic]), hookOptions);
	    }
	    // Add component-level hook for uiCanExit
	    if (predicates_1.isFunction(controllerInstance.uiCanExit)) {
	        var criteria = { exiting: cfg.node.state.name };
	        $scope.$on('$destroy', $transitions.onBefore(criteria, controllerInstance.uiCanExit, hookOptions));
	    }
	}
	angular.module('ui.router.state').directive('uiView', uiViewNg1);
	angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);


/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @ngdoc object
	 * @name ui.router.state.$uiViewScrollProvider
	 *
	 * @description
	 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
	 */
	function $ViewScrollProvider() {
	    var useAnchorScroll = false;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
	     * @methodOf ui.router.state.$uiViewScrollProvider
	     *
	     * @description
	     * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
	     * scrolling based on the url anchor.
	     */
	    this.useAnchorScroll = function () {
	        useAnchorScroll = true;
	    };
	    /**
	     * @ngdoc object
	     * @name ui.router.state.$uiViewScroll
	     *
	     * @requires $anchorScroll
	     * @requires $timeout
	     *
	     * @description
	     * When called with a jqLite element, it scrolls the element into view (after a
	     * `$timeout` so the DOM has time to refresh).
	     *
	     * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
	     * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
	     */
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
	angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-ui-router.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const tokenFactory = 'tokenFactory';
/* harmony export (immutable) */ __webpack_exports__["a"] = tokenFactory;

const tokenFactoryFunc = function ($localStorage) {
  return {
    setToken: function (value) {
      $localStorage.token = value;
      console.log($localStorage.token);
    },
    getToken: function () {
      return $localStorage.token;
    },
    findToken: function () {
      if ($localStorage.token) {
        return true;
      }
    },
    deleteToken: function () {
      delete $localStorage.token;
    }
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = tokenFactoryFunc;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const getPosts = 'getPosts';
/* harmony export (immutable) */ __webpack_exports__["a"] = getPosts;

const getPostsFunc = function ($http) {
  return {
    allPosts: function () {
      return $http.get('/post');
    }
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = getPostsFunc;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  'use strict';

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sidebarController; });
function sidebarController(tokenFactory, $state, $rootScope) {
  var ctrl = this;
  ctrl.items = [{ name: 'Home', icon: 'home', status: 'home' }, { name: 'New Post', icon: 'note_add', status: 'new' }, { name: 'Profile', icon: 'person', status: 'profile' }];
  ctrl.logout = function () {
    tokenFactory.deleteToken();
    ctrl.isLoggedIn = tokenFactory.findToken();
    $state.go('login');
  };

  ctrl.$onInit = function () {
    ctrl.isLoggedIn = tokenFactory.findToken();
  };

  $rootScope.$on('userLoggedIn', function () {
    ctrl.isLoggedIn = tokenFactory.findToken();
  });
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const thisPost = 'thisPost';
/* harmony export (immutable) */ __webpack_exports__["a"] = thisPost;


const thisPostFunc = function ($http) {
  return {
    createPost: function (value) {
      console.log(value);
      return $http.post('/post', value);
    }
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = thisPostFunc;


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_ui_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngstorage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngstorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ngstorage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_token_factory_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sidebar_component__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sidebar_controller__ = __webpack_require__(5);







const sidebar = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('sidebar', [__WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default.a, 'ngStorage']).component(__WEBPACK_IMPORTED_MODULE_4__sidebar_component__["a" /* sidebarComponentName */], __WEBPACK_IMPORTED_MODULE_4__sidebar_component__["b" /* sidebarComponent */]).factory(__WEBPACK_IMPORTED_MODULE_3__components_login_token_factory_js__["a" /* tokenFactory */], ['$localStorage', __WEBPACK_IMPORTED_MODULE_3__components_login_token_factory_js__["b" /* tokenFactoryFunc */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = sidebar;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_post_module__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login_module_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_user_module_js__ = __webpack_require__(33);





const components = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('components', [__WEBPACK_IMPORTED_MODULE_1__post_post_module__["a" /* post */], __WEBPACK_IMPORTED_MODULE_2__login_login_module_js__["a" /* login */], __WEBPACK_IMPORTED_MODULE_3__user_user_module_js__["a" /* user */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = components;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const rootComponentName = 'root';
/* harmony export (immutable) */ __webpack_exports__["a"] = rootComponentName;

const rootComponent = {
  templateUrl: '/dashboard/src/app/root.html'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = rootComponent;


/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
module.exports = 'ngSanitize';


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_controller__ = __webpack_require__(5);



const sidebarComponentName = 'sidebar';
/* harmony export (immutable) */ __webpack_exports__["a"] = sidebarComponentName;

const sidebarComponent = {
  templateUrl: '/dashboard/src/app/common/sidebar.html',
  controller: ['tokenFactory', '$state', '$rootScope', __WEBPACK_IMPORTED_MODULE_1__sidebar_controller__["a" /* sidebarController */]],
  controllerAs: 'ctrl'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = sidebarComponent;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_controller__ = __webpack_require__(15);


const loginComponent = 'loginComponent';
/* harmony export (immutable) */ __webpack_exports__["a"] = loginComponent;

const loginOptions = {
  templateUrl: '/dashboard/src/app/components/login/login.html',
  controller: ['loginFactory', 'tokenFactory', '$state', '$rootScope', __WEBPACK_IMPORTED_MODULE_0__login_controller__["a" /* loginController */]],
  controllerAs: 'ctrl'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = loginOptions;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loginController; });
function loginController(loginFactory, tokenFactory, $state, $rootScope) {
  const ctrl = this;
  ctrl.user = {};
  ctrl.loginUser = function () {
    loginFactory.loginUser(ctrl.user).then(data => {
      ctrl.user = {};
      console.log(data);
      tokenFactory.setToken(data.data.token);
      $rootScope.$broadcast('userLoggedIn');
      $state.go('home');
    }, err => {
      console.log(err);
    });
  };
}



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const loginFactory = 'loginFactory';
/* harmony export (immutable) */ __webpack_exports__["a"] = loginFactory;


const loginFactoryFunc = function ($http) {
  return {
    loginUser: function (value) {
      return $http.post('/admin/login', value);
    }
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = loginFactoryFunc;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_ui_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngstorage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngstorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ngstorage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_factory__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__token_factory__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_component__ = __webpack_require__(14);







const login = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('login', [__WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default.a, 'ngStorage']).config(['$stateProvider', function ($stateProvider) {
  const loginState = {
    name: 'login',
    url: '/admin/login',
    component: __WEBPACK_IMPORTED_MODULE_5__login_component__["a" /* loginComponent */]
  };

  $stateProvider.state(loginState);
}]).component(__WEBPACK_IMPORTED_MODULE_5__login_component__["a" /* loginComponent */], __WEBPACK_IMPORTED_MODULE_5__login_component__["b" /* loginOptions */]).factory(__WEBPACK_IMPORTED_MODULE_3__login_factory__["a" /* loginFactory */], ['$http', __WEBPACK_IMPORTED_MODULE_3__login_factory__["b" /* loginFactoryFunc */]]).factory(__WEBPACK_IMPORTED_MODULE_4__token_factory__["a" /* tokenFactory */], ['$localStorage', __WEBPACK_IMPORTED_MODULE_4__token_factory__["b" /* tokenFactoryFunc */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = login;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_new_post_new_module_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__posts_post_posts_module_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__post_single_post_single_module_js__ = __webpack_require__(25);





const post = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('post', [__WEBPACK_IMPORTED_MODULE_1__post_new_post_new_module_js__["a" /* newPost */], __WEBPACK_IMPORTED_MODULE_2__posts_post_posts_module_js__["a" /* posts */], __WEBPACK_IMPORTED_MODULE_3__post_single_post_single_module_js__["a" /* postSingle */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = post;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_new_controller__ = __webpack_require__(20);



const postNewOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_new/post.new.html',
  controller: __WEBPACK_IMPORTED_MODULE_1__post_new_controller__["a" /* postNewController */],
  controllerAs: 'ctrl'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = postNewOptions;


const postNewComponent = 'postNew';
/* harmony export (immutable) */ __webpack_exports__["a"] = postNewComponent;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_new_factory__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return postNewController; });


function postNewController(thisPost, $http) {
  'ngInject';

  const ctrl = this;

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
    file_picker_callback: function (cb, value, meta) {
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
  ctrl.postImage = false;
  ctrl.post = {};
  ctrl.heading = 'Create A New Post';
  ctrl.createPost = function (value) {
    thisPost.createPost(value).then(data => {
      console.log(`After blog post the response is`, data);
    }, err => {
      console.log(err.status);
    });
  };
}



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_ui_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post_new_factory__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__post_new_component__ = __webpack_require__(19);





const newPost = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('post.new', [__WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default.a, 'ui.tinymce']).component(__WEBPACK_IMPORTED_MODULE_3__post_new_component__["a" /* postNewComponent */], __WEBPACK_IMPORTED_MODULE_3__post_new_component__["b" /* postNewOptions */]).config(['$stateProvider', function ($stateProvider) {
  var newState = {
    name: 'new',
    url: '/admin/new',
    component: __WEBPACK_IMPORTED_MODULE_3__post_new_component__["a" /* postNewComponent */]
  };

  $stateProvider.state(newState);
}]).factory(__WEBPACK_IMPORTED_MODULE_2__post_new_factory__["a" /* thisPost */], ['$http', __WEBPACK_IMPORTED_MODULE_2__post_new_factory__["b" /* thisPostFunc */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = newPost;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_single_controller__ = __webpack_require__(23);



const postSingleComponent = 'postSingleComponent';
/* harmony export (immutable) */ __webpack_exports__["a"] = postSingleComponent;

const postSingleOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_single/post.single.html',
  controller: ['postSingleFactory', 'postUpdateFactory', '$stateParams', __WEBPACK_IMPORTED_MODULE_1__post_single_controller__["a" /* postSingleController */]],
  controllerAs: 'ctrl'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = postSingleOptions;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular_ui_router__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return postSingleController; });


function postSingleController(postSingleFactory, postUpdateFactory, $stateParams) {
  const ctrl = this;
  ctrl.$onInit = function () {
    postSingleFactory.getSinglePost($stateParams.url).then(data => {
      ctrl.post = data.data.post[0];
    }, err => {
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
    file_picker_callback: function (cb, value, meta) {
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
    postUpdateFactory.updatePost(url, value).then(data => {
      postSingleFactory.getSinglePost(url).then(data => {
        ctrl.post = data.data.post[0];
      });
    }, err => {
      console.log(err);
    });
  };
}



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const postSingleFactory = 'postSingleFactory';
/* harmony export (immutable) */ __webpack_exports__["a"] = postSingleFactory;

const postSingleFactoryFunc = function ($http, $stateParams) {
  return {
    getSinglePost: function (value) {
      return $http.get('/post/' + value);
    }
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = postSingleFactoryFunc;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_ui_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post_single_component__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__post_single_factory__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__post_update_factory__ = __webpack_require__(26);






const postSingle = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('postSingle', [__WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default.a, 'ui.tinymce']).component(__WEBPACK_IMPORTED_MODULE_2__post_single_component__["a" /* postSingleComponent */], __WEBPACK_IMPORTED_MODULE_2__post_single_component__["b" /* postSingleOptions */]).config(function ($stateProvider) {
  var editState = {
    url: '/admin/edit/:url',
    name: 'edit',
    component: __WEBPACK_IMPORTED_MODULE_2__post_single_component__["a" /* postSingleComponent */]
  };
  $stateProvider.state(editState);
}).factory(__WEBPACK_IMPORTED_MODULE_3__post_single_factory__["a" /* postSingleFactory */], ['$http', __WEBPACK_IMPORTED_MODULE_3__post_single_factory__["b" /* postSingleFactoryFunc */]]).factory(__WEBPACK_IMPORTED_MODULE_4__post_update_factory__["a" /* postUpdateFactory */], ['$http', __WEBPACK_IMPORTED_MODULE_4__post_update_factory__["b" /* postUpdateFactoryFunc */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = postSingle;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const postUpdateFactory = 'postUpdateFactory';
/* harmony export (immutable) */ __webpack_exports__["a"] = postUpdateFactory;

const postUpdateFactoryFunc = function ($http) {
  return {
    updatePost: function (url, value) {
      return $http.put('/post/' + url, value);
    }
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = postUpdateFactoryFunc;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_posts_factory__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_posts_controller__ = __webpack_require__(28);



const allPostsComponent = 'allPosts';
/* harmony export (immutable) */ __webpack_exports__["a"] = allPostsComponent;

const allPostsOptions = {
  templateUrl: '/dashboard/src/app/components/post/posts/post.posts.html',
  controller: [__WEBPACK_IMPORTED_MODULE_0__post_posts_factory__["a" /* getPosts */], '$state', __WEBPACK_IMPORTED_MODULE_1__post_posts_controller__["a" /* allPostsController */]],
  controllerAs: 'ctrl'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = allPostsOptions;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_posts_factory__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = allPostsController;


function allPostsController(getPosts, $state) {
  const ctrl = this;
  ctrl.$onInit = function () {
    getPosts.allPosts().then(data => {
      ctrl.posts = data.data.posts;
      console.log(ctrl.posts);
    }, err => {
      console.log(err.status, err.message);
    });
  };
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_ui_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_sanitize__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_sanitize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_sanitize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__post_posts_factory__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__post_posts_component__ = __webpack_require__(27);






const posts = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('post.posts', [__WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default.a, __WEBPACK_IMPORTED_MODULE_2_angular_sanitize___default.a]).component(__WEBPACK_IMPORTED_MODULE_4__post_posts_component__["a" /* allPostsComponent */], __WEBPACK_IMPORTED_MODULE_4__post_posts_component__["b" /* allPostsOptions */]).config(function ($stateProvider, $urlRouterProvider) {
  const homeState = {
    name: 'home',
    url: '/admin/home',
    component: __WEBPACK_IMPORTED_MODULE_4__post_posts_component__["a" /* allPostsComponent */]
  };
  $stateProvider.state(homeState);
  $urlRouterProvider.when('/admin', '/admin/home');
}).factory(__WEBPACK_IMPORTED_MODULE_3__post_posts_factory__["a" /* getPosts */], ['$http', __WEBPACK_IMPORTED_MODULE_3__post_posts_factory__["b" /* getPostsFunc */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = posts;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_controller__ = __webpack_require__(31);


const userComponent = 'userComponent';
/* harmony export (immutable) */ __webpack_exports__["a"] = userComponent;

const userComponentOptions = {
  templateUrl: '/dashboard/src/app/components/user/user.html',
  controller: ['Upload', 'userFactory', '$localStorage', __WEBPACK_IMPORTED_MODULE_0__user_controller__["a" /* userController */]],
  controllerAs: 'ctrl'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = userComponentOptions;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userController; });
function userController(Upload, userFactory, $localStorage) {
  const ctrl = this;
  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample'

  };
  ctrl.upload = function upload($file) {
    Upload.upload({
      url: '/user/picture',
      file: $file
    }).then(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  };

  ctrl.editUser = function () {
    userFactory.editUser(ctrl.user).then(data => {
      console.log(data);
    });
  };

  ctrl.$onInit = function init() {
    if ($localStorage.user) {
      ctrl.user = $localStorage.user;
    } else {
      userFactory.getUser().then(data => {
        console.log(data);
      });
    }
  };
}



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const userFactory = 'userFactory';
/* harmony export (immutable) */ __webpack_exports__["a"] = userFactory;

const userFactoryFunc = function ($http, $localStorage) {
  return {
    getUser: function () {
      return $http.get('/user');
    },
    storeUser: function (value) {
      $localStorage.user = value;
    },
    editUser: function editUser(value) {
      return $http.put('/user', value);
    }
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = userFactoryFunc;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_ui_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_file_upload__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngstorage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngstorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ngstorage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_factory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_component_js__ = __webpack_require__(30);







const user = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('user', [__WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default.a, __WEBPACK_IMPORTED_MODULE_2_ng_file_upload___default.a, 'ngStorage']).component(__WEBPACK_IMPORTED_MODULE_5__user_component_js__["a" /* userComponent */], __WEBPACK_IMPORTED_MODULE_5__user_component_js__["b" /* userComponentOptions */]).config(['$stateProvider', function ($stateProvider) {
  const profileState = {
    name: 'profile',
    url: '/admin/profile',
    component: __WEBPACK_IMPORTED_MODULE_5__user_component_js__["a" /* userComponent */]
  };
  $stateProvider.state(profileState);
}]).factory(__WEBPACK_IMPORTED_MODULE_4__user_factory_js__["a" /* userFactory */], ['$http', __WEBPACK_IMPORTED_MODULE_4__user_factory_js__["b" /* userFactoryFunc */]]).name;
/* harmony export (immutable) */ __webpack_exports__["a"] = user;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_ui_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_sidebar_module__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_component_module__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__root_component__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_login_token_factory_js__ = __webpack_require__(2);







__WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('cms', [__WEBPACK_IMPORTED_MODULE_2__common_sidebar_module__["a" /* sidebar */], __WEBPACK_IMPORTED_MODULE_3__components_component_module__["a" /* components */], __WEBPACK_IMPORTED_MODULE_1_angular_ui_router___default.a, 'ngStorage']).component(__WEBPACK_IMPORTED_MODULE_4__root_component__["a" /* rootComponentName */], __WEBPACK_IMPORTED_MODULE_4__root_component__["b" /* rootComponent */]).config(($locationProvider, $stateProvider) => {
  $locationProvider.html5Mode(true);
}).run([__WEBPACK_IMPORTED_MODULE_5__components_login_token_factory_js__["a" /* tokenFactory */], '$http', function (tokenFactory, $http) {
  if (tokenFactory.findToken()) {
    const token = tokenFactory.getToken();
    $http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}]).name;

/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
module.exports = 'ngFileUpload';

/***/ })
],[34]);