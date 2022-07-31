// ==UserScript==
// @name         百度贴吧签到
// @version      3.2.1
// @description  网页版签到或模拟客户端签到，模拟客户端可获得与客户端相同经验并且签到速度更快~
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome >= Latest
// @compatible   firefox >= Latest
// @run-at       document-end
// @match        https://tieba.baidu.com/index.html
// @match        https://tieba.baidu.com
// @connect      tieba.baidu.com
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/md5/dist/md5.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/vue.runtime.global.prod.min.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=862073
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var defineProperty = (__webpack_require__(3070).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 9670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 1318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 9920:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8052:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8113:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2109:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 4374:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 2788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 30:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var definePropertiesModule = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var toIndexedObject = __webpack_require__(5656);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 4488:
/***/ ((module) => {

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.24.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 1400:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 6330:
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 5112:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 6699:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $includes = (__webpack_require__(1318).includes);
var fails = __webpack_require__(7293);
var addToUnscopables = __webpack_require__(1223);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 5482:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-button{border:1px solid;border-radius:2px;box-shadow:var(--skr-button-box-shadow);cursor:pointer;line-height:1.5715;transition:var(--skr-button-transition)}.skr-button:hover{filter:brightness(1.15)}.skr-button:focus:not(:focus-visible){outline:0}.skr-button--primary{background-color:var(--skr-primary-color);border-color:var(--skr-primary-color);color:var(--skr-text-inverse-color)}.skr-button--default{background-color:var(--skr-white-color);border-color:var(--skr-border-color);color:var(--skr-text-primary-color)}.skr-button--default:hover{border-color:currentcolor;color:var(--skr-primary-color);filter:brightness(1)}.skr-button--round{border-radius:50%}.skr-button--shadow{box-shadow:var(--skr-box-shadow-normal)}.skr-button--mini{font-size:12px;padding:2px 7px}.skr-button--small{font-size:12px;padding:4px 8px}.skr-button--normal{font-size:14px;padding:4px 15px}.skr-button--large{font-size:15px;padding:10px 20px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9261:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-input{border:1px solid #d9d9d9;margin-top:5px;transition:all .3s;width:100%;padding-left:8px;padding-right:8px}.skr-input:hover,.skr-input:focus{border-color:var(--skr-primary-color)}.skr-input:focus{box-shadow:0 0 0 2px var(--skr-primary-lighten-color)}.skr-input--small{padding-bottom:2px;padding-top:2px}.skr-input--small.skr-input--scale:focus{font-size:14px;padding-bottom:6px;padding-top:6px}.skr-input--normal{padding-bottom:6px;padding-top:6px}.skr-input--large{padding-bottom:10px;padding-top:10px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8443:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-ripple-container{border-radius:inherit !important;bottom:0;contain:strict;left:0;margin:0 !important;overflow:hidden;padding:0 !important;pointer-events:none !important;position:absolute;right:0;top:0}.skr-ripple{animation:skr-ripple forwards cubic-bezier(0.23, 1, 0.32, 1);background:var(--skr-ripple-color);border-radius:100%;contain:layout;margin:0 !important;padding:0 !important;pointer-events:none;position:absolute;transform:scale(0);transition:opacity 2s cubic-bezier(0.23, 1, 0.32, 1)}@keyframes skr-ripple{to{transform:scale(3)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 596:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--skr-primary-color: #2878ff;--skr-primary-lighten-color: rgb(24 144 255 / 20%);--skr-white-color: #fff;--skr-transition-duration-fast: 0.1s;--skr-transition-duration-normal: 0.3s;--skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);--skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);--skr-border-color: #d9d9d9;--skr-text-primary-color: #303133;--skr-text-regular-color: #666;--skr-text-secondary-color: #909399;--skr-text-inverse-color: var(--skr-white-color);--skr-button-transition: all var(--skr-transition-duration-normal);--skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);--skr-ripple-color: rgb(138 218 255 / 20%)}#inject-sign{--container-width: 19vw;--container-right: 10px;box-sizing:border-box;color:var(--skr-text-regular-color)}#inject-sign [class*=skr-]{box-sizing:border-box}#inject-sign.normal,#inject-sign.large{--container-width: 21vw}#inject-sign *::-webkit-scrollbar{background:#f2f2f2;height:8px;width:8px}#inject-sign *::-webkit-scrollbar-thumb{background:#c1c1c1;border:0}#inject-sign a{color:var(--skr-primary-color)}#inject-sign button{background-image:none}#inject-sign .control{align-items:center;bottom:12px;contain:content;display:flex;position:fixed;right:max(var(--container-right) + var(--container-width)/2,150px);transform:translateX(50%);transition:bottom .3s,right .15s;user-select:none;z-index:500}#inject-sign .control label{cursor:pointer;height:20px;margin-left:8px;text-shadow:0 1px 3px #fff}#inject-sign .control input{margin-right:4px;vertical-align:text-top}#inject-sign .control .label-wrap{display:inline-flex;flex:1;flex-wrap:wrap;margin-left:10px;max-width:156px}#inject-sign .forums-container{background:#fafafa;bottom:60px;box-shadow:0 2px 4px rgba(0,0,0,.2);contain:content;display:flex;flex-direction:column;max-height:calc(100vh - 124px);min-width:280px;padding:5px;position:fixed;right:var(--container-right);transition:transform .3s,bottom .3s,width .15s,box-shadow .3s;width:var(--container-width);z-index:2}#inject-sign .forums-container:hover{box-shadow:0 2px 4px 3px rgba(0,0,0,.1)}#inject-sign.forums-hide .forums-container{bottom:0;transform:translateY(calc(100% - 35px))}#inject-sign.forums-hide .control{bottom:40px}#inject-sign.cover .forums-container{z-index:9999}#inject-sign header{display:flex;margin-bottom:4px}#inject-sign .reverse-btn{flex:1;text-align:center}#inject-sign .resize-btn{flex:none;margin-left:4px}#inject-sign li{border-bottom:1px solid rgba(221,221,221,.4);cursor:default;display:flex;transition:height .15s}#inject-sign li:hover{background-color:#f0f8ff}#inject-sign li>*{line-height:2.325em}#inject-sign li a{flex:1;overflow:hidden;padding-left:.2em;text-overflow:ellipsis;white-space:nowrap}#inject-sign li .signed{width:.9em}#inject-sign li .level{width:2.4em}#inject-sign li .gain{width:1.8em}#inject-sign li .exp{flex:none;width:6.7em}#inject-sign ul{overflow-x:hidden}#inject-sign ul.small li{height:24px}#inject-sign ul.normal li{font-size:13px;height:28px}#inject-sign ul.large li{font-size:14px;height:32px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 8081:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 3379:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 9216:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 3565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 7795:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 4589:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/utils/base.ts
function throttle(fn, delay) {
  let timeoutId;
  let begin = Date.now();
  return function (...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const cur = Date.now();
    clearTimeout(timeoutId);

    if (cur - begin >= delay) {
      fn.apply(self, args);
      begin = cur;
    } else {
      timeoutId = setTimeout(function () {
        fn.apply(self, args);
      }, delay);
    }
  };
}
function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      fn.apply(this, args);
    }
  };
}
/**
 * 延时
 * @param ms 毫秒数
 */

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function isFunction(value) {
  return typeof value === 'function';
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
;// CONCATENATED MODULE: ./src/utils/querystring.ts


/**
 * 解析 query
 * @param href 或 带有参数格式的 string；有 search 则不再 hash
 */
function parse(href = location.href) {
  if (!href) return {};
  let search;

  try {
    // 链接
    const url = new URL(href);
    ({
      search
    } = url); // 主要处理对hash的search

    if (!search && url.hash.includes('?')) {
      search = url.hash.split('?')[1];
    }
  } catch {
    // 非链接,如：a=1&b=2、?a=1、/foo?a=1、/foo#bar?a=1
    if (href.includes('?')) {
      search = href.split('?')[1];
    } else {
      search = href;
    }
  }

  return Object.fromEntries(new URLSearchParams(search));
}
function stringify(obj) {
  return Object.entries(obj) // 过滤 undefined，保留 null 且转成 ''
  .filter(([, value]) => value !== undefined).map(([key, value]) => `${key}=${value ?? ''}`).join('&');
}
;// CONCATENATED MODULE: ./src/utils/queue.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Queue {
  /** 同时进行任务数 默认 5 个 */

  /** 当前执行数 */

  /** 任务数 */

  /** 已完成数 */
  constructor({
    tasks,
    limit = 5
  }) {
    _defineProperty(this, "tasks", void 0);

    _defineProperty(this, "limit", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "tasksCount", void 0);

    _defineProperty(this, "finishedCount", void 0);

    this.tasks = [...tasks];
    this.limit = limit;
    this.count = 0;
    this.tasksCount = tasks.length;
    this.finishedCount = 0;
  }

  run() {
    return new Promise(resolve => {
      if (this.tasksCount === 0) {
        resolve();
        return;
      }

      const {
        tasks
      } = this;

      const _run = function () {
        const idle = Math.min(tasks.length, this.limit - this.count);

        for (let i = 0; i < idle; i++) {
          this.count++;
          const task = tasks.shift();
          task().finally(() => {
            this.count--;
            this.finishedCount++;

            if (this.finishedCount < this.tasksCount) {
              _run();
            } else {
              resolve();
            }
          });
        }
      }.bind(this);

      _run();
    });
  }

}
;// CONCATENATED MODULE: ./src/utils/compatibility.ts
/**
 * 兼容性检查
 * @return 是否通过
 */
function checker({
  firefox = 75,
  edge = 80,
  chrome = 80,
  safari = 14,
  notify = true
} = {}) {
  const {
    userAgent
  } = window.navigator;
  const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)?.[1];
  const edgeVersion = userAgent.match(/Edg\/(\d+)/)?.[1];
  const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1];
  const safariVersion = userAgent.match(/Version\/(\d+).*Safari/)?.[1]; // 不保证兼容

  let pass = false;

  if (firefoxVersion && Number(firefoxVersion) >= firefox || edgeVersion && Number(edgeVersion) >= edge || chromeVersion && Number(chromeVersion) >= chrome || safariVersion && Number(safariVersion) >= safari) {
    pass = true;
  }

  if (!pass) {
    const {
      Toast
    } = window;
    notify && Toast && Toast.error(`哎呀！遇到错误：不支持的浏览器版本(需要Chrome${chrome}或Firefox${firefox}以上~)，请更新浏览器版本 o(╥﹏╥)o`, 0);
  }

  return pass;
}
;// CONCATENATED MODULE: ./src/store/index.ts
/**
 * store
 * @param modulename 会加入 [[modulename]]- 前缀
 * @param local 是否本地存储
 */
function createStore(modulename = '', local = true) {
  const getRealProp = property => modulename ? `[[${modulename}]]-${property}` : property;

  const store = new Proxy({}, {
    get(target, property, receiver) {
      const realProp = getRealProp(property);
      const value = local ? GM_getValue(realProp) : Reflect.get(target, realProp, receiver);
      return value;
    },

    set(target, property, value, receiver) {
      const realProp = getRealProp(property);
      local ? GM_setValue(realProp, value) : Reflect.set(target, realProp, value, receiver);
      return true;
    },

    deleteProperty(target, property) {
      const realProp = getRealProp(property);
      local ? GM_deleteValue(realProp) : Reflect.deleteProperty(target, realProp);
      return true;
    }

  });
  return store;
}

/* harmony default export */ const store = (createStore());

;// CONCATENATED MODULE: ./src/scripts/tieba/signature.ts
/* global MD5 */
const FAKE_VERSION = '11.8.8.0';
function makeFakeParams(obj) {
  return Object.assign({
    _client_type: 4,
    // prohibit
    _client_version: FAKE_VERSION,
    _phone_imei: '0'.repeat(15),
    model: 'HUAWEI P40',
    // HUAWEI加油 ヾ(◍°∇°◍)ﾉﾞ
    net_type: 1,
    stErrorNums: 1,
    stMethod: 1,
    stMode: 1,
    stSize: 320,
    stTime: 117,
    stTimesNum: 1,
    timestamp: Date.now()
  }, obj);
}
function signature(payload, isFake = true) {
  if (isFake) {
    payload = makeFakeParams(payload);
  }

  const sortKeys = Object.keys(payload).sort();
  let str = sortKeys.reduce((acc, key) => acc += `${key}=${payload[key]}`, '');
  str += 'tiebaclient!!!';
  return MD5(str);
}
;// CONCATENATED MODULE: ./src/scripts/tieba/api.ts



/**
 * 跨域请求，依赖GM_xmlhttpRequest
 * @param {string} url
 * @param {object} options
 */

function GMRequest(url, options) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      timeout: 1000 * 15,
      // 15s超时，0点高峰期失败概率大，BD是1分钟超时，实际上不必等这么久
      ...options,
      url,

      onload(res) {
        try {
          resolve(JSON.parse(res.response));
        } catch (e) {
          resolve(res.response);
        }
      },

      onerror: reject
    });
  });
}

GMRequest.post = function (url, data, options) {
  return GMRequest(url, { ...options,
    data,
    method: 'POST'
  });
};
/**
 * 页面直接发起请求
 * @param {string} url
 * @param {object} options
 */


function request(url, options) {
  return fetch(url, { ...options
  });
}

request.post = function (url, data, options = {}) {
  options.headers = Object.assign({}, options.headers);

  if (data) {
    let body = data; // @ts-ignore

    if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded') && Object.prototype.toString.call(data) === '[object Object]') {
      body = stringify(data);
    } // @ts-ignore


    if (options.headers['Content-Type'].includes('application/json') && Object.prototype.toString.call(data) === '[object Object]') {
      body = JSON.stringify(data);
    }

    options.body = body;
  }

  return request(url, { ...options,
    method: 'POST'
  });
};
/* web接口 */
// 获取关注列表


function getNewmoindex() {
  return request.post('/mo/q/newmoindex');
}
function doWebSign(params) {
  return request.post('/sign/add', {
    ie: 'utf-8',
    ...params
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
}
/* app接口 */
// 获取关注列表

function getForumLike(params) {
  // 签名处理
  params = makeFakeParams(params);
  const paramsSigned = { ...params,
    sign: signature(params)
  };
  return GMRequest.post('http://c.tieba.baidu.com/c/f/forum/like', stringify(paramsSigned), {
    headers: {
      'User-agent': `bdtb for Android ${FAKE_VERSION}`,
      Accept: '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip',
      Cookie: 'ka=open'
    }
  });
}
function api_doSign(params) {
  params = makeFakeParams(params);
  const paramsSigned = { ...params,
    sign: signature(params)
  };
  return GMRequest.post('http://c.tieba.baidu.com/c/c/forum/sign', stringify(paramsSigned), {
    headers: {
      'User-agent': `bdtb for Android ${FAKE_VERSION}`,
      Accept: '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip',
      Cookie: 'ka=open'
    }
  });
}
;// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
;// CONCATENATED MODULE: ./src/composables/use-gm-value.ts

/**
 * 同 GM_getValue、GM_setValue
 */

function useGMvalue(name, defaultValue, _options) {
  const {
    listening,
    deep
  } = Object.assign({
    listening: typeof _options === 'boolean' ? _options : true,
    deep: false
  }, _options);
  const value = (0,external_Vue_namespaceObject.ref)(GM_getValue(name, defaultValue));
  (0,external_Vue_namespaceObject.watch)(value, () => {
    GM_setValue(name, value.value);
  }, {
    deep
  });

  if (listening) {
    (0,external_Vue_namespaceObject.onUnmounted)(() => {
      GM_removeValueChangeListener(id);
    });
    const id = GM_addValueChangeListener(name, (name, oldVal, newVal) => {
      value.value = newVal;
    });
  }

  return value;
}
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(3379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(3565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(9216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(4589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/input/index.scss
var input = __webpack_require__(9261);
;// CONCATENATED MODULE: ./src/components/input/index.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(input/* default */.Z, options);




       /* harmony default export */ const components_input = (input/* default */.Z && input/* default.locals */.Z.locals ? input/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/components/input/index.tsx




const prefixCls = 'skr-input';
const Input = (0,external_Vue_namespaceObject.defineComponent)({
  name: 'SkrInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      validator: value => ['small', 'normal', 'large'].includes(value),
      default: 'normal'
    },
    scale: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],

  setup(props, {
    emit
  }) {
    const handleInput = event => {
      // vue 自带的
      if (!event.target.composing) {
        emit('update:modelValue', event.target.value);
      }
    };

    return () => (0,external_Vue_namespaceObject.createVNode)("input", {
      "class": [prefixCls, `${prefixCls}--${props.size}`, {
        [`${prefixCls}--scale`]: props.scale
      }],
      "value": props.modelValue,
      "type": "text",
      "onInput": handleInput
    }, null);
  }

});
/* harmony default export */ const src_components_input = (Input);
;// CONCATENATED MODULE: ./src/directives/v-ripple/utils.ts
/**
 * 计算一个点离矩形中心点的距离
 * @param width 矩形宽
 * @param height 矩形高
 * @return (left top 在矩形内点的坐标) => {} => () => {} 距离
 */
function calcDiagInRect(width, height) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  return function (left, top) {
    const a = left <= halfWidth ? halfWidth - left : left - halfWidth;
    const b = top <= halfHeight ? halfHeight - top : top - halfHeight;
    const c = Math.sqrt(a * a + b * b);
    return c;
  };
}
/**
 * 计算当前值离总值中心的位置 越靠近中心值为1，远离中心值为0
 * @param value 当前值
 * @param extent 总值
 * @return 取值 0-1
 * @example value：50 extent：100 则计算 50 在 0-100 中的位置返回 1
 * value：0 或 100 extent：100 返回 0
 */

function closeness(value, extent) {
  if (!value || !extent) return 0;
  const half = extent / 2;
  return value <= half ? value / half : 1 - value / extent;
}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/directives/v-ripple/index.scss
var v_ripple = __webpack_require__(8443);
;// CONCATENATED MODULE: ./src/directives/v-ripple/index.scss

      
      
      
      
      
      
      
      
      

var v_ripple_options = {};

v_ripple_options.styleTagTransform = (styleTagTransform_default());
v_ripple_options.setAttributes = (setAttributesWithoutAttributes_default());

      v_ripple_options.insert = insertBySelector_default().bind(null, "head");
    
v_ripple_options.domAPI = (styleDomAPI_default());
v_ripple_options.insertStyleElement = (insertStyleElement_default());

var v_ripple_update = injectStylesIntoStyleTag_default()(v_ripple/* default */.Z, v_ripple_options);




       /* harmony default export */ const directives_v_ripple = (v_ripple/* default */.Z && v_ripple/* default.locals */.Z.locals ? v_ripple/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/directives/v-ripple/index.ts


const containerClassname = 'skr-ripple-container';
const rippleClassname = 'skr-ripple';
const weakmap = new WeakMap();

/**
 * 创建容器元素
 */
function createRippleContainer() {
  const div = document.createElement('div');
  div.classList.add(containerClassname);
  return div;
}
/**
 * 创建涟漪元素
 */


function createRippleEl() {
  const span = document.createElement('div');
  span.classList.add(rippleClassname);
  return span;
}

function normalizeOptions(options) {
  if (typeof options === 'boolean') {
    return {
      disabled: !options
    };
  }

  return options;
}
/**
 * 添加涟漪效果
 */


const addRippleEffect = function (_options = {}) {
  let options = normalizeOptions(_options); // 涟漪个数

  let count = 0;

  function listener(event) {
    if (options.disabled) return;
    const currentTarget = event.currentTarget; // 优化: 处理过后不再调用getComputedStyle

    if (weakmap.get(currentTarget).position === false) {
      weakmap.get(currentTarget).position = true; // 注意：会改变当前元素定位方式

      if (getComputedStyle(currentTarget).position === 'static') {
        currentTarget.style.position = 'relative';
      }
    }

    const rect = currentTarget.getBoundingClientRect();
    const rippleEl = createRippleEl(); // 取元素长的一边作为涟漪的周长

    const side = Math.max(rect.width, rect.height);
    const radius = side / 2; // 鼠标在元素中的坐标

    const left = event.pageX - rect.left - window.scrollX;
    const top = event.pageY - rect.top - window.scrollY; // 选项加入到元素中

    options.color && (rippleEl.style.background = options.color);
    rippleEl.style.width = side + 'px';
    rippleEl.style.height = side + 'px'; // 元素定位再各减自身的宽高一半

    rippleEl.style.top = top - radius + 'px';
    rippleEl.style.left = left - radius + 'px'; // 动画在元素中间扩散时基础时长1.5s，当点击范围处于元素边缘时，动画扩散比在元素中间位置要长，所以要加快动画进行

    const base = 1.5;
    const diagonal = calcDiagInRect(rect.width, rect.height)(left, top);
    rippleEl.style.animationDuration = base - base * diagonal / side + 's';
    let container = currentTarget.querySelector(`.${containerClassname}`);

    if (!container) {
      container = createRippleContainer();
      currentTarget.appendChild(container);
    }

    container.appendChild(rippleEl);
    count++;

    const unlisten = (() => {
      const leaveEvents = ['mouseup', 'mouseleave'];

      const listener = () => {
        // 为了尽量能看清动画效果，延时一下再进行透明
        setTimeout(() => {
          rippleEl.style.opacity = '0';
        }, 100);
      };

      leaveEvents.forEach(eventname => currentTarget.addEventListener(eventname, listener));
      return () => {
        leaveEvents.forEach(eventname => currentTarget.removeEventListener(eventname, listener));
      };
    })(); // 移除涟漪元素


    rippleEl.addEventListener('transitionend', transEvent => {
      if (transEvent.propertyName === 'opacity') {
        unlisten();
        rippleEl.remove(); // 没有涟漪元素时移除容器

        if (--count <= 0) {
          container?.remove();
        }
      }
    });
  } // 更新配置项


  function update(newOpts) {
    options = Object.assign({}, options, normalizeOptions(newOpts));
  }

  return {
    listener,
    update
  };
};

const vRipple = {
  mounted(el, binding) {
    const {
      listener,
      update
    } = addRippleEffect(binding.value);
    weakmap.set(el, {
      listener,
      update,
      // 更新配置项函数
      position: false // 是否已经改变了 el 的定位方式

    });
    el.addEventListener('mousedown', listener, false);
  },

  updated(el, binding) {
    const val = weakmap.get(el);
    val.update(binding.value);
  }

};
/* harmony default export */ const src_directives_v_ripple = (vRipple);
;// CONCATENATED MODULE: ./src/directives/index.ts


// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/button/index.scss
var components_button = __webpack_require__(5482);
;// CONCATENATED MODULE: ./src/components/button/index.scss

      
      
      
      
      
      
      
      
      

var button_options = {};

button_options.styleTagTransform = (styleTagTransform_default());
button_options.setAttributes = (setAttributesWithoutAttributes_default());

      button_options.insert = insertBySelector_default().bind(null, "head");
    
button_options.domAPI = (styleDomAPI_default());
button_options.insertStyleElement = (insertStyleElement_default());

var button_update = injectStylesIntoStyleTag_default()(components_button/* default */.Z, button_options);




       /* harmony default export */ const src_components_button = (components_button/* default */.Z && components_button/* default.locals */.Z.locals ? components_button/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/components/button/index.tsx





const button_prefixCls = 'skr-button'; // button type 非 default 时覆盖一层白色

const rippleColor = 'rgb(255 255 255 / 15%)';
const Button = (0,external_Vue_namespaceObject.defineComponent)({
  name: 'SkrButton',
  directives: {
    ripple: src_directives_v_ripple
  },
  props: {
    type: {
      type: String,
      validator: value => ['primary', 'info', 'warning', 'danger', 'default'].includes(value),
      default: 'default'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: value => ['mini', 'small', 'normal', 'large'].includes(value),
      default: 'normal'
    },
    // 涟漪效果 object 时参数会透传给 ripple
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  setup(props, {
    slots
  }) {
    const rippleOptions = (0,external_Vue_namespaceObject.computed)(() => {
      return Object.assign({}, {
        color: props.type === 'default' ? undefined : rippleColor
      }, typeof props.ripple === 'boolean' ? {
        disabled: !props.ripple
      } : props.ripple);
    });
    return () => (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("button", {
      "class": [button_prefixCls, `${button_prefixCls}--${props.type}`, {
        [`${button_prefixCls}--round`]: props.round,
        [`${button_prefixCls}--shadow`]: props.shadow
      }, `${button_prefixCls}--${props.size}`]
    }, [slots.default?.()]), [[(0,external_Vue_namespaceObject.resolveDirective)("ripple"), rippleOptions.value]]);
  }

});
/* harmony default export */ const src_components_button_0 = (Button);
;// CONCATENATED MODULE: ./src/components/index.ts


// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/tieba/ui.scss
var ui = __webpack_require__(596);
;// CONCATENATED MODULE: ./src/scripts/tieba/ui.scss

      
      
      
      
      
      
      
      
      

var ui_options = {};

ui_options.styleTagTransform = (styleTagTransform_default());
ui_options.setAttributes = (setAttributesWithoutAttributes_default());

      ui_options.insert = insertBySelector_default().bind(null, "head");
    
ui_options.domAPI = (styleDomAPI_default());
ui_options.insertStyleElement = (insertStyleElement_default());

var ui_update = injectStylesIntoStyleTag_default()(ui/* default */.Z, ui_options);




       /* harmony default export */ const tieba_ui = (ui/* default */.Z && ui/* default.locals */.Z.locals ? ui/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/scripts/tieba/ui.tsx


// @ts-nocheck




/* eslint-disable camelcase */

function createUI({
  store,
  runByBDUSS,
  runByWeb
}) {
  // 兼容性：名称字段更换 middle -> normal
  if (store.size === 'middle') {
    store.size = 'normal';
  }

  const sizeTick = function* () {
    const sizes = ['small', 'normal', 'large'];
    let currSize = store.size ?? 'small';
    let index = sizes.findIndex(v => v === currSize);

    while (true) {
      index >= sizes.length && (index = 0);
      currSize = sizes[index++];
      store.size = currSize;
      yield currSize;
    }
  }();

  const app = (0,external_Vue_namespaceObject.createApp)({
    setup() {
      const state = (0,external_Vue_namespaceObject.reactive)({
        loading: false,
        size: sizeTick.next().value,
        isSimulate: false,
        isReverse: store.is_reverse || false,
        likeForums: [],
        keyword: useGMvalue('keyword', ''),
        isComplete: useGMvalue('is_complete', false),
        isForumsHide: useGMvalue('is_forums_hide', false),
        isCover: useGMvalue('is_cover', false)
      });
      const diaplayForums = (0,external_Vue_namespaceObject.computed)(() => {
        let ectype = [...state.likeForums];
        state.isReverse && ectype.reverse();

        if (state.keyword) {
          // 忽略大小写
          ectype = ectype.filter(forum => forum.forum_name.toUpperCase().includes(state.keyword.toUpperCase()));
        }

        return ectype;
      });
      const counter = (0,external_Vue_namespaceObject.computed)(() => ({
        total: state.likeForums.length,
        sign: state.likeForums.filter(({
          is_sign
        }) => is_sign).length
      })); // 勾选模拟APP并且确认有BDUSS 才算开启

      if (store.is_simulate && store.BDUSS) {
        state.isSimulate = true;
      } // 自动签到


      if (state.isComplete) {
        run();
      }

      function run() {
        state.loading = true; // TODO: 应该有更好的实现方法

        const exportApi = {
          updateLikeForum,
          checkUnsign
        };
        (state.isSimulate ? runByBDUSS : runByWeb)(exportApi).finally(() => {
          state.loading = false;
        });
      }

      function setLikeForums(forums) {
        state.likeForums = [...forums];
      }

      function updateLikeForum(fid, forum) {
        const index = state.likeForums.findIndex(item => +fid === +item.forum_id);
        if (index === -1) return;
        const target = { ...state.likeForums[index],
          ...forum
        };

        if (forum.sign_bonus_point) {
          target.user_exp = Number(target.user_exp) + Number(forum.sign_bonus_point);
        }

        state.likeForums.splice(index, 1, target);
      } // 未签到的靠前


      function checkUnsign() {
        state.likeForums.sort((a, b) => {
          if (!a.is_sign && b.is_sign) return -1;
          return 0;
        });
      }

      function changeReverse() {
        state.isReverse = !state.isReverse;
        store.is_reverse = state.isReverse;
      }

      function changeSize() {
        state.size = sizeTick.next().value;
      }

      function onSimulateChange({
        target: {
          checked
        }
      }) {
        store.is_simulate = checked;
        if (!checked) return;
        const {
          BDUSS
        } = store;
        const result = window.prompt('请输入F12->Application->Cookies中的BDUSS', BDUSS || undefined);

        if (result) {
          store.BDUSS = result;
          location.reload();
        } else {
          (0,external_Vue_namespaceObject.nextTick)(() => {
            state.isSimulate = false;
            store.is_simulate = false;
          });
        }
      }

      return { ...(0,external_Vue_namespaceObject.toRefs)(state),
        diaplayForums,
        counter,
        run,
        setLikeForums,
        updateLikeForum,
        checkUnsign,
        changeReverse,
        changeSize,
        onSimulateChange
      };
    },

    render() {
      const {
        loading,
        size,
        isForumsHide,
        isCover,
        isReverse,
        counter,
        likeForums,
        diaplayForums,
        run,
        changeReverse,
        changeSize,
        onSimulateChange
      } = this;

      function expTitle(item) {
        const MAX_EXP_DAILY = 8;
        const needed = item.levelup_score - item.user_exp;
        return `距离升级还需要${needed}经验，若每天+${MAX_EXP_DAILY}，还需要${Math.ceil(needed / MAX_EXP_DAILY)}天`;
      }

      return (0,external_Vue_namespaceObject.createVNode)("div", {
        "id": "inject-sign",
        "class": {
          'forums-hide': isForumsHide,
          cover: isCover,
          [size]: true
        }
      }, [(0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "control"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "disabled": loading,
        "type": "primary",
        "shadow": true,
        "onClick": run
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u4E00\u952E\u7B7E\u5230")]
      }), (0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "label-wrap"
      }, [(0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "模拟APP签到可以获得与APP相同的经验，比网页签到经验更多，也提供更多功能，但需要BDUSS，重新登录后需要再次输入，请网上搜索获得方法，不勾选则通过网页签到，此时不需要BDUSS"
      }, [(0,external_Vue_namespaceObject.createVNode)("input", {
        "checked": this.isSimulate,
        "type": "checkbox",
        "onChange": onSimulateChange
      }, null), (0,external_Vue_namespaceObject.createTextVNode)("\u6A21\u62DFAPP")]), (0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "下次进入贴吧时自动签到，建议同时勾选模拟APP"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => this.isComplete = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, this.isComplete]]), (0,external_Vue_namespaceObject.createTextVNode)("\u81EA\u52A8\u7B7E\u5230")]), likeForums.length > 0 && (0,external_Vue_namespaceObject.createVNode)(external_Vue_namespaceObject.Fragment, null, [(0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "列表将缩到底部"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => this.isForumsHide = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, this.isForumsHide]]), (0,external_Vue_namespaceObject.createTextVNode)("\u9690\u85CF\u5217\u8868")]), (0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "覆盖在页面上显示"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => this.isCover = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, this.isCover]]), (0,external_Vue_namespaceObject.createTextVNode)("\u9632\u6B62\u906E\u6321")])])])]), likeForums.length > 0 && (0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "forums-container"
      }, [(0,external_Vue_namespaceObject.createVNode)("header", {
        "class": "top-btns"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "class": "reverse-btn",
        "size": "mini",
        "onClick": changeReverse
      }, {
        default: () => [isReverse ? '已倒序' : '普通', (0,external_Vue_namespaceObject.createVNode)("span", {
          "title": "已签/总数"
        }, [counter.sign, (0,external_Vue_namespaceObject.createTextVNode)("/"), counter.total])]
      }), (0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "class": "resize-btn",
        "size": "mini",
        "onClick": changeSize
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u5927\u5C0F")]
      })]), (0,external_Vue_namespaceObject.createVNode)("ul", {
        "class": {
          [size]: true
        }
      }, [diaplayForums.map(item => (0,external_Vue_namespaceObject.createVNode)("li", {
        "key": item.forum_id
      }, [(0,external_Vue_namespaceObject.createVNode)("a", {
        "href": '/f?kw=' + item.forum_name,
        "title": item.forum_name,
        "target": "_blank"
      }, [item.forum_name]), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "signed"
      }, [item.is_sign ? ' √' : '']), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "level",
        "title": item.level_name
      }, [item.user_level, (0,external_Vue_namespaceObject.createTextVNode)("\u7EA7")]), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "gain"
      }, [item.sign_bonus_point ? '+' + item.sign_bonus_point : '']), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "exp",
        "title": expTitle(item)
      }, [item.user_exp, (0,external_Vue_namespaceObject.createTextVNode)("/"), item.levelup_score])]))]), likeForums.length > 25 && (0,external_Vue_namespaceObject.createVNode)(src_components_input, {
        "modelValue": this.keyword,
        "onUpdate:modelValue": $event => this.keyword = $event,
        "placeholder": "搜索",
        "size": "small",
        "scale": true
      }, null)])]);
    }

  });
  const rootContainer = document.createElement('div');
  const ui = app.mount(rootContainer);
  document.body.appendChild(rootContainer);
  return {
    setLikeForums: ui.setLikeForums,
    updateLikeForum: ui.updateLikeForum,
    checkUnsign: ui.checkUnsign
  };
}
;// CONCATENATED MODULE: ./src/scripts/tieba/index.ts
// @ts-nocheck







/* eslint-disable camelcase */

const $$ = document.querySelectorAll.bind(document); // 页面节点 jquery元素

let $moreforumEl;

async function main() {
  if (!checker()) return;
  const {
    jQuery
  } = unsafeWindow;
  $moreforumEl = jQuery('#moreforum'); // 未登录时删除已有的BDUSS

  if (!$moreforumEl.length) {
    delete store.BDUSS;
    delete store.is_complete;
    return;
  }

  let likeForums = null;

  if (store.BDUSS) {
    try {
      likeForums = await getLikeForums();
    } catch (error) {
      console.error(error);
      Toast.error('获取贴吧列表失败。。请刷新重试~', 0);
    }
  }

  const ui = createUI({
    store: store,
    runByBDUSS,
    runByWeb
  });

  if (likeForums) {
    ui.setLikeForums(likeForums);
    ui.checkUnsign();
  }
} // 界面上无法获得失效的贴吧，这里调用接口获取所有关注的贴吧


async function getLikeForums() {
  const {
    BDUSS
  } = store;
  const tbs = unsafeWindow.PageData.tbs;
  const req2 = {
    BDUSS,
    tbs
  };
  const [like1, like2Map] = await Promise.all([getNewmoindex().then(response => response.json()).then(data => data.data.like_forum), getForumLike(req2).then(data => data.forum_list).then(forum_list => forum_list.reduce((acc, val) => (acc[val.id] = val, acc), {}))]); // 融合数据

  like1.forEach(forum => {
    const {
      forum_id
    } = forum;
    const like2Forum = like2Map[forum_id];
    if (!like2Forum) return;
    Object.assign(forum, {
      levelup_score: like2Forum.levelup_score,
      level_name: like2Forum.level_name,
      slogan: like2Forum.slogan
    });
  }); // 经验降序

  like1.sort((a, b) => b.user_exp - a.user_exp);
  return like1;
} // 通过BDUSS签到 获得经验与客户端签到相同


async function runByBDUSS(ui) {
  // 贴吧必须先触发才能获取剩下贴吧
  $moreforumEl.trigger(new MouseEvent('mouseenter')); // 侧边元素

  const likeUnsignEls = $$('#likeforumwraper .unsign'); // 查看更多元素

  const alwayUnsignEls = $$('#alwayforum-wraper .unsign'); // 关闭面板

  $moreforumEl.trigger(new Event('click'));
  const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]; // 需要重新签到元素（失败时尝试重签）

  const resignEls = [];

  if (!allUnsignEls.length) {
    Toast.success('所有贴吧已经签到');
    return;
  }

  const toast = Toast('开始签到，请等待', 0); // 签到

  function doSign(data) {
    const {
      BDUSS
    } = store;
    const {
      tbs,
      fid,
      kw
    } = data;
    const params = {
      // 以下4个参数 + sign参数 是必选的
      BDUSS,
      tbs,
      fid,
      kw
    };
    return api_doSign(params);
  }

  const tbs = unsafeWindow.PageData.tbs;
  const queue = new Queue({
    // 限制5个任务，大于5个签到失败的概率好像大点了！
    limit: 5,
    tasks: allUnsignEls.map(current => {
      return async function () {
        const {
          kw
        } = parse(current.href);
        const {
          fid
        } = current.dataset;

        try {
          const response = await doSign({
            tbs,
            kw,
            fid
          });
          const {
            error_code,
            error,
            user_info
          } = response; // 贴吧成功码为0 还会出现code为0但error的情况

          if (error_code !== '0' || error) throw response; // 标记为已签到

          user_info.is_sign = true;
          ui.updateLikeForum(fid, user_info); // 替换已签到样式

          current.classList.replace('unsign', 'sign');
        } catch (e) {
          console.error(e); // 重签

          resignEls.push(current);
        } // 客户端签到可以将延时缩短，随机延时一下 50ms以上


        const ms = parseInt(Math.random() * 20 + 50);
        await sleep(ms);
      };
    })
  });
  await queue.run();
  let failCount = 0; // 重签

  while (resignEls.length) {
    const current = resignEls.shift();
    const {
      kw
    } = parse(current.href);
    const {
      fid
    } = current.dataset;

    try {
      const response = await doSign({
        tbs,
        kw,
        fid
      });
      const {
        error_code,
        error,
        user_info
      } = response;
      if (error_code !== '0' || error) throw response;
      user_info.is_sign = true;
      ui.updateLikeForum(fid, user_info);
      current.classList.replace('unsign', 'sign');
    } catch (e) {
      console.error(e);
      failCount++;
      Toast.error(`${decodeURIComponent(kw)} 签到失败`);
    }

    await sleep(500);
  }

  toast.close();
  failCount ? Toast.warning(`签到成功，失败${failCount}个`, 0) : Toast.success('签到成功');
  ui.checkUnsign();
} // 网页签到 经验没客户端那么多 但不需要获得BDUSS只需贴吧已登录即可


async function runByWeb() {
  // 贴吧必须先触发才能获取剩下贴吧
  $moreforumEl.trigger(new MouseEvent('mouseenter')); // 侧边元素

  const likeUnsignEls = $$('#likeforumwraper .unsign'); // 查看更多元素

  const alwayUnsignEls = $$('#alwayforum-wraper .unsign'); // 关闭面板

  $moreforumEl.trigger(new Event('click'));
  const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]; // 需要重新签到元素（失败时尝试重签）

  const resignEls = [];

  if (!allUnsignEls.length) {
    Toast.success('所有贴吧已经签到');
    return;
  }

  const toast = Toast('开始签到，请等待', 0); // 签到

  function doSign(data) {
    return doWebSign(data).then(response => response.json());
  }

  while (allUnsignEls.length) {
    const current = allUnsignEls.shift();
    const {
      kw
    } = parse(current.href);

    try {
      const response = await doSign({
        kw
      });
      const {
        no
      } = response; // 贴吧成功码为0

      if (no !== 0) throw response; // 替换已签到样式

      current.classList.replace('unsign', 'sign');
    } catch (e) {
      console.error(e); // 重签

      resignEls.push(current);
    } // 网页签到不能太短，否则很容易出现验证码(ಥ﹏ಥ) 验证码2150040


    const ms = parseInt(Math.random() * 500 + 500);
    await sleep(ms);
  }

  let failCount = 0; // 重签

  while (resignEls.length) {
    const current = resignEls.shift();
    const {
      kw
    } = parse(current.href);

    try {
      const response = await doSign({
        kw
      });
      const {
        no
      } = response;
      if (no !== 0) throw response;
      current.classList.replace('unsign', 'sign');
    } catch (e) {
      console.error(e);
      failCount++;
      Toast.error(`${decodeURIComponent(kw)} 签到失败`);
    }

    await sleep(500);
  }

  toast.close();
  failCount ? Toast.warning(`签到成功，失败${failCount}个`, 0) : Toast.success('签到成功');
}

main();
})();

/******/ })()
;