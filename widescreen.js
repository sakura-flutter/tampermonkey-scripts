// ==UserScript==
// @name         论坛文章页宽屏
// @version      2.1.0
// @description  适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、搜狗搜索、segmentfault、哔哩哔哩、微博、豆瓣电影、今日头条、Google
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @run-at       document-start
// @noframes
// @match        https://bcy.net/item/detail/*
// @match        https://mp.weixin.qq.com/s*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @match        https://www.zhihu.com/
// @match        https://www.zhihu.com/follow
// @match        https://www.zhihu.com/hot*
// @match        https://www.zhihu.com/topic*
// @match        https://juejin.cn/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.baidu.com/s?*
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?*
// @match        https://www.sogou.com/web*
// @match        https://tieba.baidu.com/p/*
// @match        https://tieba.baidu.com/f?*
// @match        https://segmentfault.com/a/*
// @match        https://segmentfault.com/q/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://t.bilibili.com/*
// @match        https://weibo.com/*
// @match        https://d.weibo.com/*
// @match        https://movie.douban.com/subject/*
// @match        https://www.toutiao.com/*
// @match        *://www.google.com/search?*
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://cdn.jsdelivr.net/npm/vue@3.0.4/dist/vue.runtime.global.prod.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=876846
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3099:
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ 1530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = __webpack_require__(8710).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 9670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ 1318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5656);
var toLength = __webpack_require__(7466);
var toAbsoluteIndex = __webpack_require__(1400);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 9341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 9207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var has = __webpack_require__(6656);

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ 3671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(3099);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);
var toLength = __webpack_require__(7466);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ 4326:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 9920:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(6656);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
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

/***/ 9781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
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

/***/ 5268:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);
var global = __webpack_require__(7854);

module.exports = classof(global.process) == 'process';


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
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


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
var getOwnPropertyDescriptor = __webpack_require__(1236).f;
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
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

/***/ 7007:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(4916);
var redefine = __webpack_require__(1320);
var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var regexpExec = __webpack_require__(2261);
var createNonEnumerableProperty = __webpack_require__(8880);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 5005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(857);
var global = __webpack_require__(7854);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 7854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 6656:
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 3501:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 2788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(5465);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var objectHas = __webpack_require__(6656);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

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

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
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

/***/ 4705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
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
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 1913:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ 8536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 3070:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var anObject = __webpack_require__(9670);
var toPrimitive = __webpack_require__(7593);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPrimitive = __webpack_require__(7593);
var has = __webpack_require__(6656);
var IE8_DOM_DEFINE = __webpack_require__(4664);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 6324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(6656);
var toIndexedObject = __webpack_require__(5656);
var indexOf = __webpack_require__(1318).indexOf;
var hiddenKeys = __webpack_require__(3501);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ 3887:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 857:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = global;


/***/ }),

/***/ 1320:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var createNonEnumerableProperty = __webpack_require__(8880);
var has = __webpack_require__(6656);
var setGlobal = __webpack_require__(3505);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 7651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);
var regexpExec = __webpack_require__(2261);

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var fails = __webpack_require__(7293);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 4488:
/***/ ((module) => {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3505:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var createNonEnumerableProperty = __webpack_require__(8880);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
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
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.8.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 8710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);
var requireObjectCoercible = __webpack_require__(4488);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 1400:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
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

/***/ 9958:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ 7466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 9711:
/***/ ((module) => {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ 3307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 5112:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var has = __webpack_require__(6656);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 5827:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $reduce = __webpack_require__(3671).left;
var arrayMethodIsStrict = __webpack_require__(9341);
var arrayMethodUsesToLength = __webpack_require__(9207);
var CHROME_VERSION = __webpack_require__(7392);
var IS_NODE = __webpack_require__(5268);

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 4916:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var exec = __webpack_require__(2261);

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 5306:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var anObject = __webpack_require__(9670);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var toInteger = __webpack_require__(9958);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var regExpExec = __webpack_require__(7651);

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ 5482:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-button{line-height:1.5715;border:1px solid;border-radius:2px;cursor:pointer;box-shadow:var(--skr-button-box-shadow);transition:var(--skr-button-transition)}.skr-button:focus:not(:focus-visible){outline:0}.skr-button:hover{filter:brightness(1.15)}.skr-button--primary{color:var(--skr-text-inverse-color);background-color:var(--skr-primary-color);border-color:var(--skr-primary-color)}.skr-button--default{color:var(--skr-text-primary-color);background-color:var(--skr-white-color);border-color:var(--skr-border-color)}.skr-button--default:hover{filter:brightness(1);color:var(--skr-primary-color);border-color:currentColor}.skr-button--round{border-radius:50%}.skr-button--shadow{box-shadow:var(--skr-box-shadow-normal)}.skr-button--mini{padding:2px 7px;font-size:12px}.skr-button--small{padding:4px 8px;font-size:12px}.skr-button--normal{padding:4px 15px;font-size:14px}.skr-button--large{padding:10px 20px;font-size:15px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9261:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-input{margin-top:5px;width:100%;padding-left:8px;padding-right:8px;border:1px solid #d9d9d9;transition:all .3s}.skr-input:hover,.skr-input:focus{border-color:var(--skr-primary-color)}.skr-input:focus{box-shadow:0 0 0 2px var(--skr-primary-lighten-color)}.skr-input--small{padding-top:2px;padding-bottom:2px}.skr-input--small.skr-input--scale:focus{padding-top:6px;padding-bottom:6px;font-size:14px}.skr-input--normal{padding-top:6px;padding-bottom:6px}.skr-input--large{padding-top:10px;padding-bottom:10px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8443:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-ripple-container{contain:strict;position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;padding:0 !important;margin:0 !important;pointer-events:none !important;border-radius:inherit !important}.skr-ripple{contain:layout;position:absolute;padding:0 !important;margin:0 !important;border-radius:100%;transform:scale(0);pointer-events:none;background:var(--skr-ripple-color);transition:opacity 2s cubic-bezier(0.23, 1, 0.32, 1);animation:skr-ripple forwards cubic-bezier(0.23, 1, 0.32, 1)}@keyframes skr-ripple{to{transform:scale(3)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9354:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--skr-primary-color: #2878ff;--skr-primary-lighten-color: rgba(24, 144, 255, 0.2);--skr-white-color: #fff;--skr-transition-duration-fast: 0.1s;--skr-transition-duration-normal: 0.3s;--skr-box-shadow-lighten: 0 1px 6px rgba(0, 0, 0, 0.15);--skr-box-shadow-normal: 0 1px 6px rgba(0, 0, 0, 0.2);--skr-border-color: #d9d9d9;--skr-text-primary-color: #303133;--skr-text-regular-color: #666;--skr-text-secondary-color: #909399;--skr-text-inverse-color: var(--skr-white-color);--skr-button-transition: all var(--skr-transition-duration-normal);--skr-button-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);--skr-ripple-color: rgb(138 218 255 / 20%)}.inject-widescreen-js{contain:layout;position:fixed;z-index:99;top:150px;right:7vw;display:flex;flex-direction:column;align-items:center;opacity:.5;transition:opacity var(--skr-transition-duration-normal)}.inject-widescreen-js:hover{opacity:1}.inject-widescreen-js:hover label{transform:translateY(100%)}.inject-widescreen-js button{background-image:none !important}.inject-widescreen-js label{position:absolute;bottom:0;z-index:-1;display:flex;align-items:center;margin:0;padding:0;font-size:14px;transform:translateY(-10px);transition:transform var(--skr-transition-duration-normal);cursor:pointer}.inject-widescreen-js input{margin:0 2px 0 0}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3528:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1580px){:root{--inject-page-width:min(75vw, 1440px)}.inject-widescreen-loose-js{--inject-page-width:75vw}.container .row{width:var(--inject-page-width)}.container .row .col-big{flex:.97}.detail-main header{width:auto !important}.container .row .col-big .album{width:100%}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8343:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1300px){:root{--inject-page-width:min(77.5vw, 1330px)}.inject-widescreen-loose-js{--inject-page-width:77.5vw}.WB_frame{display:flex;width:var(--inject-page-width) !important}.WB_frame #plc_main{flex:1;display:flex !important}.WB_frame_c{flex:1}.tab_box{display:flex}.tab_box::after{content:none}.tab_box .fr_box{flex:1}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5502:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1250px){:root{--inject-page-width:min(85vw, 1280px)}.inject-widescreen-loose-js{--inject-page-width:85vw}[role=main]{width:var(--inject-page-width)}[role=main]>div:first-child{flex:1}#__next>div:last-child{left:calc(50% - (var(--inject-page-width) / 2) - 80px)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8584:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1300px){:root{--inject-page-width:min(82vw, 1230px)}.inject-widescreen-loose-js{--inject-page-width:82vw}.main-container{max-width:var(--inject-page-width)}.main-container .main-area{width:calc(100% - 21rem)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9108:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1300px){:root{--inject-page-width:min(82vw, 1318px)}.inject-widescreen-loose-js{--inject-page-width:82vw}#wrapper{width:var(--inject-page-width)}#content .article{width:calc(100% - 360px)}#content .article .subject{width:calc(100% - 175px)}#content .article #info{width:calc(100% - 160px);max-width:none}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5811:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 750px){:root{--inject-page-width:min(90vw, 1150px)}.inject-widescreen-loose-js{--inject-page-width:90vw}.rich_media_area_primary_inner{max-width:var(--inject-page-width) !important;margin-left:auto;margin-right:auto}#js_pc_qr_code .qr_code_pc{position:fixed;top:25vh;right:3vw;opacity:.2}#js_pc_qr_code .qr_code_pc:hover{opacity:1}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3250:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1390px){:root{--inject-page-width:min(82vw, 1350px)}.inject-widescreen-loose-js{--inject-page-width:82vw}.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:var(--inject-page-width)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3338:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1380px){:root{--inject-page-width:min(85vw, 1454px)}.inject-widescreen-loose-js{--inject-page-width:85vw}.home-content{width:var(--inject-page-width) !important}.center-panel{width:calc(100% - 524px) !important}.main-content{width:auto !important;margin-right:20px}.live-container,.video-container,.bangumi-container,.shop-panel{width:auto !important}.video-container .text-area{width:calc(100% - 233px) !important}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 778:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1390px){:root{--inject-page-width:min(80vw, 1250px)}.inject-widescreen-loose-js{--inject-page-width:80vw}.head_main .head_middle,.head_main .head_content{width:var(--inject-page-width) !important}.content,.foot{width:var(--inject-page-width)}.forum_content{background:#fff}#content_wrap{width:calc(100% - 248px);border-right:1px solid #eee}.threadlist_detail{display:flex}.threadlist_detail .pull_left{flex:auto}.threadlist_detail .pull_left .threadlist_abs{width:97%}.frs_content_footer_pagelet{width:auto !important}.tb_rich_poster_container{margin-left:0 !important}.tbui_aside_float_bar{left:calc(50% + (var(--inject-page-width) / 2) + 12px) !important;right:auto;margin-left:0 !important}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2257:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1390px){:root{--inject-page-width:min(80vw, 1250px)}.inject-widescreen-loose-js{--inject-page-width:80vw}#container{width:var(--inject-page-width)}#container>.content{width:100%}.nav_wrap,.p_thread,.pb_content,.core_title_wrap_bright,.core_reply_wrapper,.l_post_bright .core_reply_wrapper,.pb_footer{width:100%}.core_title_absolute_bright{width:calc(var(--inject-page-width) - 240px)}.pb_content{display:flex;background-size:100%}.pb_content::after{content:none}.pb_content .replace_div{width:fit-content !important;width:-moz-fit-content !important}.pb_content .replace_div .replace_tip{width:100% !important}.left_section{flex:1;border-right:2px solid #e4e6eb}.l_post_bright{display:flex;width:100% !important}.l_post_bright .d_post_content_main{flex:1;width:0}.l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-down,.l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-up,.l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-action{right:180px !important}.tbui_aside_float_bar{left:calc(50% + (var(--inject-page-width) / 2) + 12px);right:auto;margin-left:0}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5258:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1340px){:root{--inject-page-width:min(90vw, 1380px)}.inject-widescreen-loose-js{--inject-page-width:90vw}[class*=Frame_content]{max-width:none;width:var(--inject-page-width)}[class*=Frame_main],[class*=Main_full]{flex-grow:1}.woo-box-wrap[class*=picture_inlineNum3]{max-width:409px}.u-col-4.woo-box-wrap{max-width:546px}[class*=content_row] [class*=card-video_videoBox]{max-width:540px}[class*=content_row] [class*=card-article_pic]{max-width:540px}[class*=Index_backTop]{left:calc(50% + var(--inject-page-width) / 2 + var(--frame-mod-gap-space));margin-left:0;transform:translateX(0)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8184:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1450px){:root{--inject-page-width:min(91vw, 91vw)}.inject-widescreen-loose-js{--inject-page-width:91vw}[class*=Frame_content2]{max-width:none;width:var(--inject-page-width)}[class*=Frame_main2]{flex-grow:1;padding-right:20px}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 632:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1460px){:root{--inject-page-width:min(75vw, 1300px)}.inject-widescreen-loose-js{--inject-page-width:75vw}#head:not(.s-skin-hasbg){background-color:#ffffffd1;backdrop-filter:blur(10px)}.head_wrapper .s_form{margin-left:auto;margin-right:auto;width:fit-content;width:-moz-fit-content}.s_tab{margin-left:auto;margin-right:auto;padding-left:0 !important;width:fit-content;width:-moz-fit-content}#container{margin-left:auto !important;margin-right:auto !important;width:var(--inject-page-width) !important}#content_left{width:calc(var(--inject-page-width) - 450px) !important}#content_left>div:not([tpl*=img_address]){width:100% !important}#content_left .op-bk-polysemy-video__wrap{width:560px !important}#content_left .wenda-abstract-img-wrap-new{height:auto}#content_left .c-group-wrapper .result-op,#content_left .c-group-wrapper .c-group{width:95% !important}#content_left .new-pmd .c-span9{width:75%}}@media screen and (min-width: 1460px)and (min-width: 1680px){#content_left .new-pmd .c-span9{width:81%}}@media screen and (min-width: 1460px){#content_left .new-pmd .c-span12{width:100%}}@media screen and (min-width: 1460px){.page-inner{margin-left:auto;margin-right:auto;padding-left:0 !important;width:var(--inject-page-width)}}@media screen and (min-width: 1460px){.foot-inner{margin-left:auto;margin-right:auto;width:var(--inject-page-width)}}@media screen and (min-width: 1460px){#foot .foot-inner #help{padding-left:0 !important}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5927:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1350px){:root{--inject-page-width:min(50vw, 915px)}.inject-widescreen-loose-js{--inject-page-width:50vw}.page-container{width:var(--inject-page-width) !important;max-width:none !important;padding-right:0 !important;left:-5vw}.article-holder,.head-container{width:var(--inject-page-width);max-width:none !important}.banner-img-holder{width:auto !important;max-width:100%}.up-info-holder{margin-left:0 !important}.up-info-holder .fixed-box{left:calc(50% + (var(--inject-page-width) / 2) + -5vw + 50px);margin-left:0 !important;transition:transform .2s}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2797:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1450px){:root{--inject-page-width:min(82vw, 1330px)}.inject-widescreen-loose-js{--inject-page-width:82vw}.lEXIrb{max-width:none !important}#center_col{width:calc(var(--inject-page-width) - 480px)}#rso>.g{width:100%}#rso>.g .IsZvec{max-width:none}#rso>.g .kp-blk{width:100%}#rso>.g .kno-ftr{margin-right:0}#rso g-section-with-header{width:652px}#rhs{margin-left:calc(var(--inject-page-width) - 240px)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3471:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1200px){:root{--inject-page-width:min(80vw, 1340px)}.inject-widescreen-loose-js{--inject-page-width:80vw}.hintBox,#pagebar_container,#s_footer>div,#wrapper,.header .header-box{margin-left:auto;margin-right:auto;padding-left:0;width:var(--inject-page-width) !important}.header .header-box{position:relative;padding:0 5px 45px}.header,.header.headsearch .header-box{padding-bottom:0}.header .header-box .logo{top:-8px}.headsearch{background-color:#ffffffd1;backdrop-filter:blur(10px)}#wrapper{display:flex}#main{flex:1;width:0;max-width:none;padding-right:74px}#main .results{width:auto}#main .results>.vrwrap,#main .results>.rb{width:auto !important}.special-wrap,.vrPicBox{box-sizing:border-box;width:550px}#s_footer{padding-left:0}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5186:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1350px){:root{--inject-page-width:min(90vw, 1470px)}.inject-widescreen-loose-js{--inject-page-width:90vw}.detail-content-wrapper{width:var(--inject-page-width)}.detail-article-container{display:flex}.article-content{flex:auto;margin-right:60px}.footer-feed{width:auto;margin-right:60px}.feedbox-wrapper{width:auto}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1131:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1100px){:root{--inject-page-width:min(91vw, 1360px)}.inject-widescreen-loose-js{--inject-page-width:91vw}.Topstory-container{width:var(--inject-page-width)}.Topstory-mainColumn{flex:1}.GlobalSideBar{width:296px;flex:initial}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7231:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1350px){:root{--inject-page-width:min(75vw, 1300px)}.inject-widescreen-loose-js{--inject-page-width:75vw}.QuestionHeader-content,.QuestionHeader-footer{width:var(--inject-page-width);margin-left:auto;margin-right:auto}.QuestionHeader-footer-inner{width:auto}.QuestionHeader-footer-main{padding-left:0}.QuestionHeader-main{width:0;flex:1}.Question-main{width:var(--inject-page-width)}.Question-main .ListShortcut{flex:1}.Question-mainColumn{flex:1;width:auto;padding-right:10px}.ztext .content_image,.ztext .origin_image{max-width:694px}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 486:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1100px){:root{--inject-page-width:min(91vw, 1295px)}.inject-widescreen-loose-js{--inject-page-width:91vw}.ContentLayout{width:var(--inject-page-width)}.ContentLayout-mainColumn{flex:1}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9123:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1000px){:root{--inject-page-width:min(75vw, 1120px)}.inject-widescreen-loose-js{--inject-page-width:75vw}.Post-NormalMain .Post-Header,.Post-NormalMain>div,.Post-NormalSub>div{width:var(--inject-page-width)}.ztext .content_image,.ztext .origin_image{max-width:690px}.Post-SideActions{left:calc(50% - (var(--inject-page-width) / 2) - 120px)}}", ""]);
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
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 3379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
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
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
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
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 				() => module['default'] :
/******/ 				() => module;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
"use strict";

// NAMESPACE OBJECT: ./src/utils/ready-state.js
var ready_state_namespaceObject = {};
__webpack_require__.r(ready_state_namespaceObject);
__webpack_require__.d(ready_state_namespaceObject, {
  "DOMContentLoaded": () => DOMContentLoaded,
  "complete": () => complete,
  "interactive": () => interactive,
  "load": () => load,
  "loading": () => loading
});

;// CONCATENATED MODULE: ./src/utils/compatibility.js
/**
 * 兼容性检查
 * @param {object} param0 & param1 版本, notify
 * @return {boolean} 是否通过
 */
function checker({
  chrome = 80,
  firefox = 75,
  notify = true
} = {}) {
  const {
    userAgent
  } = window.navigator;
  const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1];
  const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)?.[1];
  let pass = false;

  if (chromeVersion && chromeVersion >= chrome) {
    pass = true;
  } else if (firefoxVersion && firefoxVersion >= firefox) {
    pass = true;
  }

  if (!pass) {
    notify && Toast.error(`哎呀！遇到错误：不支持的浏览器版本(需要Chrome${chrome}或Firefox${firefox}以上~)，请更新浏览器版本 o(╥﹏╥)o`, 0);
  }

  return pass;
}
;// CONCATENATED MODULE: ./src/utils/log.js
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn(...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/utils/ready-state.js

/**
 * 在tampermonkey中，DOMContentLoaded监听后会被缓存，总是会执行
 * readyState的值会因为脚本加载时间可能被抛弃没有版本被监听到
 *
 * 基于上面原因，pool中的状态区分先后顺序
 * 靠后定义的会自动将靠前定义的但没有监听到的执行一次，但实际上不再是原来的状态
 */

const pool = new Map([['loading', []], ['interactive', []], ['DOMContentLoaded', []], // 扩展状态
['complete', []], ['load', []] // 扩展状态
]);

const execute = readyState => {
  for (const [state, functions] of pool) {
    while (functions.length) {
      functions.shift()();
    }

    if (readyState === state) break;
  }
};

warn('document.readyState', document.readyState);
execute(document.readyState);
document.readyState !== 'complete' && document.addEventListener('readystatechange', () => execute(document.readyState));
window.addEventListener('DOMContentLoaded', () => {
  // 确认tampermonkey中脚本真正加载状态
  execute(document.readyState === 'complete' ? 'complete' : 'DOMContentLoaded');
});
window.addEventListener('load', () => execute('load'));

const wrapper = (readyState, fn) => new Promise(resolve => {
  pool.get(readyState).push(function () {
    resolve(fn?.());
  });
});

const loading = fn => wrapper('loading', fn);
const interactive = fn => wrapper('interactive', fn);
const DOMContentLoaded = fn => wrapper('DOMContentLoaded', fn);
const complete = fn => wrapper('complete', fn);
const load = fn => wrapper('load', fn);
;// CONCATENATED MODULE: ./src/store/index.js
/**
 * store
 * @param {string} modulename key会加入 [[modulename]]- 前缀
 * @param {boolean} local 是否本地存储
 * @return {proxy}
 */
function createStore(modulename = '', local = true) {
  const getRealProp = property => modulename ? `[[${modulename}]]-${property}` : property;

  const handler = {
    get(target, property) {
      const realProp = getRealProp(property);
      const value = local ? GM_getValue(realProp) : target[realProp];
      return value;
    },

    set(target, property, value) {
      const realProp = getRealProp(property);
      local ? GM_setValue(realProp, value) : target[realProp] = value;
      return true;
    },

    deleteProperty(target, property) {
      const realProp = getRealProp(property);
      local ? GM_deleteValue(realProp) : delete target[realProp];
      return true;
    }

  };
  const store = new Proxy({}, handler);
  return store;
}

/* harmony default export */ const src_store = (createStore());

;// CONCATENATED MODULE: ./src/utils/selector.js
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(3379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/bcy-net/index.lazy.scss
var index_lazy = __webpack_require__(3528);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/bcy-net/index.lazy.scss

            

var refs = 0;
var update;
var options = {"injectType":"lazyStyleTag"};

options.insert = "head";
options.singleton = false;

var exported = {};

exported.locals = index_lazy/* default.locals */.Z.locals || {};
exported.use = function() {
  if (!(refs++)) {
    update = injectStylesIntoStyleTag_default()(index_lazy/* default */.Z, options);
  }

  return exported;
};
exported.unuse = function() {
  if (refs > 0 && !--refs) {
    update();
    update = null;
  }
};



;
       /* harmony default export */ const bcy_net_index_lazy = (exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/bcy-net/index.js



const banciyuan = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      interactive(() => {
        // eslint-disable-next-line no-constant-condition
        if (true) return;
        const {
          multi
        } = unsafeWindow.__ssr_data.detail.post_data;
        const imgEls = $$('.container .album .img-wrap-inner img');
        if (multi.length !== imgEls.length) return;
        imgEls.forEach((img, index) => {
          img.src = multi[index].original_path;
        });
      });
      bcy_net_index_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/mp-weixin-qq-com/index.lazy.scss
var mp_weixin_qq_com_index_lazy = __webpack_require__(5811);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/mp-weixin-qq-com/index.lazy.scss

            

var index_lazy_refs = 0;
var index_lazy_update;
var index_lazy_options = {"injectType":"lazyStyleTag"};

index_lazy_options.insert = "head";
index_lazy_options.singleton = false;

var index_lazy_exported = {};

index_lazy_exported.locals = mp_weixin_qq_com_index_lazy/* default.locals */.Z.locals || {};
index_lazy_exported.use = function() {
  if (!(index_lazy_refs++)) {
    index_lazy_update = injectStylesIntoStyleTag_default()(mp_weixin_qq_com_index_lazy/* default */.Z, index_lazy_options);
  }

  return index_lazy_exported;
};
index_lazy_exported.unuse = function() {
  if (index_lazy_refs > 0 && !--index_lazy_refs) {
    index_lazy_update();
    index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_mp_weixin_qq_com_index_lazy = (index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/mp-weixin-qq-com/index.js

const weixin = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_mp_weixin_qq_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhuanlan-zhihu-com/index.lazy.scss
var zhuanlan_zhihu_com_index_lazy = __webpack_require__(9123);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhuanlan-zhihu-com/index.lazy.scss

            

var zhuanlan_zhihu_com_index_lazy_refs = 0;
var zhuanlan_zhihu_com_index_lazy_update;
var zhuanlan_zhihu_com_index_lazy_options = {"injectType":"lazyStyleTag"};

zhuanlan_zhihu_com_index_lazy_options.insert = "head";
zhuanlan_zhihu_com_index_lazy_options.singleton = false;

var zhuanlan_zhihu_com_index_lazy_exported = {};

zhuanlan_zhihu_com_index_lazy_exported.locals = zhuanlan_zhihu_com_index_lazy/* default.locals */.Z.locals || {};
zhuanlan_zhihu_com_index_lazy_exported.use = function() {
  if (!(zhuanlan_zhihu_com_index_lazy_refs++)) {
    zhuanlan_zhihu_com_index_lazy_update = injectStylesIntoStyleTag_default()(zhuanlan_zhihu_com_index_lazy/* default */.Z, zhuanlan_zhihu_com_index_lazy_options);
  }

  return zhuanlan_zhihu_com_index_lazy_exported;
};
zhuanlan_zhihu_com_index_lazy_exported.unuse = function() {
  if (zhuanlan_zhihu_com_index_lazy_refs > 0 && !--zhuanlan_zhihu_com_index_lazy_refs) {
    zhuanlan_zhihu_com_index_lazy_update();
    zhuanlan_zhihu_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_zhuanlan_zhihu_com_index_lazy = (zhuanlan_zhihu_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhuanlan-zhihu-com/index.js



const zhihuZhuanlan = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      DOMContentLoaded(() => {
        const process = new WeakSet();
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const {
              target,
              oldValue
            } = mutation;
            if (process.has(target) || target.tagName !== 'IMG' || !oldValue.startsWith('data:image/') || // 与知乎同样的选择器判断
            !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))) return;
            process.add(target); // 替换原图

            target.dataset.original && (target.src = target.dataset.original);
          });
        });
        observer.observe($('.Post-RichTextContainer'), {
          subtree: true,
          attributeFilter: ['src'],
          attributeOldValue: true
        });
      });
      sites_zhuanlan_zhihu_com_index_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhihu-com/question.lazy.scss
var question_lazy = __webpack_require__(7231);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/question.lazy.scss

            

var question_lazy_refs = 0;
var question_lazy_update;
var question_lazy_options = {"injectType":"lazyStyleTag"};

question_lazy_options.insert = "head";
question_lazy_options.singleton = false;

var question_lazy_exported = {};

question_lazy_exported.locals = question_lazy/* default.locals */.Z.locals || {};
question_lazy_exported.use = function() {
  if (!(question_lazy_refs++)) {
    question_lazy_update = injectStylesIntoStyleTag_default()(question_lazy/* default */.Z, question_lazy_options);
  }

  return question_lazy_exported;
};
question_lazy_exported.unuse = function() {
  if (question_lazy_refs > 0 && !--question_lazy_refs) {
    question_lazy_update();
    question_lazy_update = null;
  }
};



;
       /* harmony default export */ const zhihu_com_question_lazy = (question_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/question.js



const zhihuQuestion = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      DOMContentLoaded(() => {
        const process = new WeakSet();
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const {
              target,
              oldValue
            } = mutation;
            if (process.has(target) || target.tagName !== 'IMG' || !oldValue.startsWith('data:image/') || // 不对非文章图片处理
            !$('.ListShortcut').contains(target) || // 与知乎同样的选择器判断
            !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))) return;
            process.add(target); // 替换原图

            target.dataset.original && (target.src = target.dataset.original);
          });
        }); // 查看全部回答时知乎会替换Question-mainColumn标签，只能往更父级监听

        observer.observe($('.QuestionPage'), {
          subtree: true,
          attributeFilter: ['src'],
          attributeOldValue: true
        });
      });
      zhihu_com_question_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhihu-com/home.lazy.scss
var home_lazy = __webpack_require__(1131);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/home.lazy.scss

            

var home_lazy_refs = 0;
var home_lazy_update;
var home_lazy_options = {"injectType":"lazyStyleTag"};

home_lazy_options.insert = "head";
home_lazy_options.singleton = false;

var home_lazy_exported = {};

home_lazy_exported.locals = home_lazy/* default.locals */.Z.locals || {};
home_lazy_exported.use = function() {
  if (!(home_lazy_refs++)) {
    home_lazy_update = injectStylesIntoStyleTag_default()(home_lazy/* default */.Z, home_lazy_options);
  }

  return home_lazy_exported;
};
home_lazy_exported.unuse = function() {
  if (home_lazy_refs > 0 && !--home_lazy_refs) {
    home_lazy_update();
    home_lazy_update = null;
  }
};



;
       /* harmony default export */ const zhihu_com_home_lazy = (home_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/home.js

const zhihuHome = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: zhihu_com_home_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhihu-com/topic.lazy.scss
var topic_lazy = __webpack_require__(486);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/topic.lazy.scss

            

var topic_lazy_refs = 0;
var topic_lazy_update;
var topic_lazy_options = {"injectType":"lazyStyleTag"};

topic_lazy_options.insert = "head";
topic_lazy_options.singleton = false;

var topic_lazy_exported = {};

topic_lazy_exported.locals = topic_lazy/* default.locals */.Z.locals || {};
topic_lazy_exported.use = function() {
  if (!(topic_lazy_refs++)) {
    topic_lazy_update = injectStylesIntoStyleTag_default()(topic_lazy/* default */.Z, topic_lazy_options);
  }

  return topic_lazy_exported;
};
topic_lazy_exported.unuse = function() {
  if (topic_lazy_refs > 0 && !--topic_lazy_refs) {
    topic_lazy_update();
    topic_lazy_update = null;
  }
};



;
       /* harmony default export */ const zhihu_com_topic_lazy = (topic_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/topic.js

const zhihuTopic = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: zhihu_com_topic_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/index.js




// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/juejin-im/index.lazy.scss
var juejin_im_index_lazy = __webpack_require__(8584);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/juejin-im/index.lazy.scss

            

var juejin_im_index_lazy_refs = 0;
var juejin_im_index_lazy_update;
var juejin_im_index_lazy_options = {"injectType":"lazyStyleTag"};

juejin_im_index_lazy_options.insert = "head";
juejin_im_index_lazy_options.singleton = false;

var juejin_im_index_lazy_exported = {};

juejin_im_index_lazy_exported.locals = juejin_im_index_lazy/* default.locals */.Z.locals || {};
juejin_im_index_lazy_exported.use = function() {
  if (!(juejin_im_index_lazy_refs++)) {
    juejin_im_index_lazy_update = injectStylesIntoStyleTag_default()(juejin_im_index_lazy/* default */.Z, juejin_im_index_lazy_options);
  }

  return juejin_im_index_lazy_exported;
};
juejin_im_index_lazy_exported.unuse = function() {
  if (juejin_im_index_lazy_refs > 0 && !--juejin_im_index_lazy_refs) {
    juejin_im_index_lazy_update();
    juejin_im_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_juejin_im_index_lazy = (juejin_im_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/juejin-im/index.js

const juejin = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_juejin_im_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/jianshu-com/index.lazy.scss
var jianshu_com_index_lazy = __webpack_require__(5502);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/jianshu-com/index.lazy.scss

            

var jianshu_com_index_lazy_refs = 0;
var jianshu_com_index_lazy_update;
var jianshu_com_index_lazy_options = {"injectType":"lazyStyleTag"};

jianshu_com_index_lazy_options.insert = "head";
jianshu_com_index_lazy_options.singleton = false;

var jianshu_com_index_lazy_exported = {};

jianshu_com_index_lazy_exported.locals = jianshu_com_index_lazy/* default.locals */.Z.locals || {};
jianshu_com_index_lazy_exported.use = function() {
  if (!(jianshu_com_index_lazy_refs++)) {
    jianshu_com_index_lazy_update = injectStylesIntoStyleTag_default()(jianshu_com_index_lazy/* default */.Z, jianshu_com_index_lazy_options);
  }

  return jianshu_com_index_lazy_exported;
};
jianshu_com_index_lazy_exported.unuse = function() {
  if (jianshu_com_index_lazy_refs > 0 && !--jianshu_com_index_lazy_refs) {
    jianshu_com_index_lazy_update();
    jianshu_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_jianshu_com_index_lazy = (jianshu_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/jianshu-com/index.js

const jianshu = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_jianshu_com_index_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-baidu-com/index.js


const styles = __webpack_require__(632)/* .default.toString */ .Z.toString();

const baidu = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      const styleSheet = GM_addStyle(styles);
      interactive(() => {
        const template = document.createElement('template');
        template.appendChild(styleSheet); // 搜索时百度会清除head这里将样式插入一次到body

        document.body.insertAdjacentElement('afterbegin', template);
      });
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/tieba-baidu-com/p.lazy.scss
var p_lazy = __webpack_require__(2257);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/p.lazy.scss

            

var p_lazy_refs = 0;
var p_lazy_update;
var p_lazy_options = {"injectType":"lazyStyleTag"};

p_lazy_options.insert = "head";
p_lazy_options.singleton = false;

var p_lazy_exported = {};

p_lazy_exported.locals = p_lazy/* default.locals */.Z.locals || {};
p_lazy_exported.use = function() {
  if (!(p_lazy_refs++)) {
    p_lazy_update = injectStylesIntoStyleTag_default()(p_lazy/* default */.Z, p_lazy_options);
  }

  return p_lazy_exported;
};
p_lazy_exported.unuse = function() {
  if (p_lazy_refs > 0 && !--p_lazy_refs) {
    p_lazy_update();
    p_lazy_update = null;
  }
};



;
       /* harmony default export */ const tieba_baidu_com_p_lazy = (p_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/p.js



const tieba = ({
  store,
  createControl
}) => ({
  handler() {
    const postlistSelector = '#j_p_postlist';

    function execute() {
      const replaceOriSrc = function () {
        const process = new WeakSet();
        return function () {
          const BDEImgEls = $$(`${postlistSelector} .BDE_Image`);
          BDEImgEls.forEach(img => {
            if (process.has(img)) return;
            process.add(img); // 贴吧自身根据
            // /^http:\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/ 判断是否相册，
            // 后续chrome更改必须为https访问时可能需要更改这里的逻辑
            // eslint-disable-next-line no-useless-escape

            if (/^http(s?):\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/.test(img.src)) {
              const protocol = img.src.match(/^(https?:\/\/)/)[0];
              img.src = `${protocol}tiebapic.baidu.com/forum/pic/item/${img.src.split('/').slice(-1)[0]}`; // 不能直接用css：贴吧根据宽高判断,用css宽高auto时若图片未加载宽高获取到0 导致无法查看大图

              img.style.cssText += 'max-width: 100%; width: auto !important; height: auto; max-height: 130vh;';
            }
          });
        };
      }();

      interactive(() => {
        // 替换原图
        replaceOriSrc();
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const {
              target
            } = mutation;
            if (target.id !== postlistSelector.slice(1)) return;
            replaceOriSrc();
          });
        });
        observer.observe($('.left_section'), {
          childList: true,
          subtree: true
        });
      });
      tieba_baidu_com_p_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/tieba-baidu-com/f.lazy.scss
var f_lazy = __webpack_require__(778);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/f.lazy.scss

            

var f_lazy_refs = 0;
var f_lazy_update;
var f_lazy_options = {"injectType":"lazyStyleTag"};

f_lazy_options.insert = "head";
f_lazy_options.singleton = false;

var f_lazy_exported = {};

f_lazy_exported.locals = f_lazy/* default.locals */.Z.locals || {};
f_lazy_exported.use = function() {
  if (!(f_lazy_refs++)) {
    f_lazy_update = injectStylesIntoStyleTag_default()(f_lazy/* default */.Z, f_lazy_options);
  }

  return f_lazy_exported;
};
f_lazy_exported.unuse = function() {
  if (f_lazy_refs > 0 && !--f_lazy_refs) {
    f_lazy_update();
    f_lazy_update = null;
  }
};



;
       /* harmony default export */ const tieba_baidu_com_f_lazy = (f_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/f.js

const tiebaForum = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: tieba_baidu_com_f_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/index.js



// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-sogou-com/index.lazy.scss
var www_sogou_com_index_lazy = __webpack_require__(3471);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-sogou-com/index.lazy.scss

            

var www_sogou_com_index_lazy_refs = 0;
var www_sogou_com_index_lazy_update;
var www_sogou_com_index_lazy_options = {"injectType":"lazyStyleTag"};

www_sogou_com_index_lazy_options.insert = "head";
www_sogou_com_index_lazy_options.singleton = false;

var www_sogou_com_index_lazy_exported = {};

www_sogou_com_index_lazy_exported.locals = www_sogou_com_index_lazy/* default.locals */.Z.locals || {};
www_sogou_com_index_lazy_exported.use = function() {
  if (!(www_sogou_com_index_lazy_refs++)) {
    www_sogou_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_sogou_com_index_lazy/* default */.Z, www_sogou_com_index_lazy_options);
  }

  return www_sogou_com_index_lazy_exported;
};
www_sogou_com_index_lazy_exported.unuse = function() {
  if (www_sogou_com_index_lazy_refs > 0 && !--www_sogou_com_index_lazy_refs) {
    www_sogou_com_index_lazy_update();
    www_sogou_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_www_sogou_com_index_lazy = (www_sogou_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-sogou-com/index.js

const sougou = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_www_sogou_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/segmentfault-com/index.lazy.scss
var segmentfault_com_index_lazy = __webpack_require__(3250);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/segmentfault-com/index.lazy.scss

            

var segmentfault_com_index_lazy_refs = 0;
var segmentfault_com_index_lazy_update;
var segmentfault_com_index_lazy_options = {"injectType":"lazyStyleTag"};

segmentfault_com_index_lazy_options.insert = "head";
segmentfault_com_index_lazy_options.singleton = false;

var segmentfault_com_index_lazy_exported = {};

segmentfault_com_index_lazy_exported.locals = segmentfault_com_index_lazy/* default.locals */.Z.locals || {};
segmentfault_com_index_lazy_exported.use = function() {
  if (!(segmentfault_com_index_lazy_refs++)) {
    segmentfault_com_index_lazy_update = injectStylesIntoStyleTag_default()(segmentfault_com_index_lazy/* default */.Z, segmentfault_com_index_lazy_options);
  }

  return segmentfault_com_index_lazy_exported;
};
segmentfault_com_index_lazy_exported.unuse = function() {
  if (segmentfault_com_index_lazy_refs > 0 && !--segmentfault_com_index_lazy_refs) {
    segmentfault_com_index_lazy_update();
    segmentfault_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_segmentfault_com_index_lazy = (segmentfault_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/segmentfault-com/index.js

const segmentfault = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_segmentfault_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-bilibili-com/index.lazy.scss
var www_bilibili_com_index_lazy = __webpack_require__(5927);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-bilibili-com/index.lazy.scss

            

var www_bilibili_com_index_lazy_refs = 0;
var www_bilibili_com_index_lazy_update;
var www_bilibili_com_index_lazy_options = {"injectType":"lazyStyleTag"};

www_bilibili_com_index_lazy_options.insert = "head";
www_bilibili_com_index_lazy_options.singleton = false;

var www_bilibili_com_index_lazy_exported = {};

www_bilibili_com_index_lazy_exported.locals = www_bilibili_com_index_lazy/* default.locals */.Z.locals || {};
www_bilibili_com_index_lazy_exported.use = function() {
  if (!(www_bilibili_com_index_lazy_refs++)) {
    www_bilibili_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_bilibili_com_index_lazy/* default */.Z, www_bilibili_com_index_lazy_options);
  }

  return www_bilibili_com_index_lazy_exported;
};
www_bilibili_com_index_lazy_exported.unuse = function() {
  if (www_bilibili_com_index_lazy_refs > 0 && !--www_bilibili_com_index_lazy_refs) {
    www_bilibili_com_index_lazy_update();
    www_bilibili_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_www_bilibili_com_index_lazy = (www_bilibili_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-bilibili-com/index.js

const bilibili = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_www_bilibili_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/t-bilibili-com/index.lazy.scss
var t_bilibili_com_index_lazy = __webpack_require__(3338);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/index.lazy.scss

            

var t_bilibili_com_index_lazy_refs = 0;
var t_bilibili_com_index_lazy_update;
var t_bilibili_com_index_lazy_options = {"injectType":"lazyStyleTag"};

t_bilibili_com_index_lazy_options.insert = "head";
t_bilibili_com_index_lazy_options.singleton = false;

var t_bilibili_com_index_lazy_exported = {};

t_bilibili_com_index_lazy_exported.locals = t_bilibili_com_index_lazy/* default.locals */.Z.locals || {};
t_bilibili_com_index_lazy_exported.use = function() {
  if (!(t_bilibili_com_index_lazy_refs++)) {
    t_bilibili_com_index_lazy_update = injectStylesIntoStyleTag_default()(t_bilibili_com_index_lazy/* default */.Z, t_bilibili_com_index_lazy_options);
  }

  return t_bilibili_com_index_lazy_exported;
};
t_bilibili_com_index_lazy_exported.unuse = function() {
  if (t_bilibili_com_index_lazy_refs > 0 && !--t_bilibili_com_index_lazy_refs) {
    t_bilibili_com_index_lazy_update();
    t_bilibili_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_t_bilibili_com_index_lazy = (t_bilibili_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/index.js

const bilibiliDynamic = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_t_bilibili_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/movie-douban-com/index.lazy.scss
var movie_douban_com_index_lazy = __webpack_require__(9108);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/movie-douban-com/index.lazy.scss

            

var movie_douban_com_index_lazy_refs = 0;
var movie_douban_com_index_lazy_update;
var movie_douban_com_index_lazy_options = {"injectType":"lazyStyleTag"};

movie_douban_com_index_lazy_options.insert = "head";
movie_douban_com_index_lazy_options.singleton = false;

var movie_douban_com_index_lazy_exported = {};

movie_douban_com_index_lazy_exported.locals = movie_douban_com_index_lazy/* default.locals */.Z.locals || {};
movie_douban_com_index_lazy_exported.use = function() {
  if (!(movie_douban_com_index_lazy_refs++)) {
    movie_douban_com_index_lazy_update = injectStylesIntoStyleTag_default()(movie_douban_com_index_lazy/* default */.Z, movie_douban_com_index_lazy_options);
  }

  return movie_douban_com_index_lazy_exported;
};
movie_douban_com_index_lazy_exported.unuse = function() {
  if (movie_douban_com_index_lazy_refs > 0 && !--movie_douban_com_index_lazy_refs) {
    movie_douban_com_index_lazy_update();
    movie_douban_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_movie_douban_com_index_lazy = (movie_douban_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/movie-douban-com/index.js

const doubanMovie = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_movie_douban_com_index_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/utils/base.js
function throttle(fn, delay) {
  let t = null;
  let begin = Date.now();
  return function (...args) {
    const self = this;
    const cur = Date.now();
    clearTimeout(t);

    if (cur - begin >= delay) {
      fn.apply(self, args);
      begin = cur;
    } else {
      t = setTimeout(function () {
        fn.apply(self, args);
      }, delay);
    }
  };
}
function once(fn) {
  let called = false;
  return function (...args) {
    if (called === false) {
      called = true;
      return fn.apply(this, args);
    }
  };
}
/**
 * 延时
 * @param {number} ms 毫秒数
 */

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-toutiao-com/index.lazy.scss
var www_toutiao_com_index_lazy = __webpack_require__(5186);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-toutiao-com/index.lazy.scss

            

var www_toutiao_com_index_lazy_refs = 0;
var www_toutiao_com_index_lazy_update;
var www_toutiao_com_index_lazy_options = {"injectType":"lazyStyleTag"};

www_toutiao_com_index_lazy_options.insert = "head";
www_toutiao_com_index_lazy_options.singleton = false;

var www_toutiao_com_index_lazy_exported = {};

www_toutiao_com_index_lazy_exported.locals = www_toutiao_com_index_lazy/* default.locals */.Z.locals || {};
www_toutiao_com_index_lazy_exported.use = function() {
  if (!(www_toutiao_com_index_lazy_refs++)) {
    www_toutiao_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_toutiao_com_index_lazy/* default */.Z, www_toutiao_com_index_lazy_options);
  }

  return www_toutiao_com_index_lazy_exported;
};
www_toutiao_com_index_lazy_exported.unuse = function() {
  if (www_toutiao_com_index_lazy_refs > 0 && !--www_toutiao_com_index_lazy_refs) {
    www_toutiao_com_index_lazy_update();
    www_toutiao_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_www_toutiao_com_index_lazy = (www_toutiao_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-toutiao-com/index.js


const toutiao = ({
  store,
  createControl
}) => ({
  handler() {
    const call = once(() => {
      createControl({
        store,
        execute: sites_www_toutiao_com_index_lazy.use
      });
    });
    document.addEventListener('readystatechange', () => {
      unsafeWindow.Page && call();
    });
  }

});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/weibo-com/index.js





const homeStyles = __webpack_require__(5258)/* .default.toString */ .Z.toString();

const playDetailStyles = __webpack_require__(8184)/* .default.toString */ .Z.toString();

const weibo = ({
  store,
  createControl
}) => ({
  handler() {
    const uiControl = createControl({
      store,
      visible: false,
      silent: true
    });
    execute();

    function execute() {
      let proxyConfig;
      document.addEventListener('readystatechange', () => {
        // 是否启用新版微博
        if ($('#app') && $('#app').__vue__) {
          WbNewVersion();
          return;
        }

        if (!unsafeWindow.$CONFIG) return;
        if (proxyConfig && proxyConfig === unsafeWindow.$CONFIG) return;
        const handler = {
          set(target, property, value) {
            const oldVal = target[property];
            target[property] = value;

            if (property === 'location' && value !== oldVal) {
              warn('script：reinsert styleSheet');
              addStyle();
            }

            return true;
          }

        };
        proxyConfig = new Proxy(unsafeWindow.$CONFIG, handler);
        unsafeWindow.$CONFIG = proxyConfig;
        addStyle();
      });
    }
    /* 新版========start */


    const WbNewVersion = once(() => {
      const uiControl = createControl({
        store,
        visible: false,
        silent: true
      });

      const app = $('#app').__vue__;

      let styleSheet;
      warn('新版本', app);
      const pageStyleMap = new Map([// 首页、首页左侧分组、博主主页、博主主页(名称)、自定义主页、微博详情、at我的、评论、赞、我的关注、粉丝、收藏、赞、热门内容、相关用户、实时微博、[我关注的、视频、图片、话题]、热门微博、热门榜单、话题榜、热搜榜
      [['home', 'mygroups', 'profile', 'nameProfile', 'customProfile', 'bidDetail', 'atWeibo', 'cmtInbox', 'likeInbox', 'follow', 'collect', 'like', 'sweiboDefault', 'suserDefault', 'sweibo', 'weibo', 'list', 'topic', 'search'], () => GM_addStyle(homeStyles)], // 视频详情
      [['Playdetail'], () => GM_addStyle(playDetailStyles)]]);
      const notify = once(() => {
        uiControl.notify();
      });
      app.$watch('$route', (to, from) => {
        styleSheet?.remove();
        warn('route changed', to);
        uiControl.hide();

        for (const [routenames, fn] of pageStyleMap.entries()) {
          if (routenames.includes(to.name)) {
            uiControl.show();

            if (store.enabled) {
              styleSheet = fn();
              notify();
            }

            break;
          }
        }
      }, {
        immediate: true
      });
    });
    /* 新版========end */

    /* 旧版(保留，不再更新) */

    const addStyle = function () {
      let styleSheet;
      return function () {
        const {
          $CONFIG
        } = unsafeWindow;
        const classnamePrefix = 'inject-ws-';

        const getClassname = classname => `${classnamePrefix}${classname}`;

        styleSheet?.remove();
        [...document.body.classList.values()].forEach(item => {
          if (item.startsWith(classnamePrefix)) {
            document.body.classList.remove(item);
          }
        });
        const pages = {
          // 首页(含特别关注)、我的收藏、我的赞、好友圈
          mainpage: {
            test: /^v6.*_content_home$/.test($CONFIG.location) || /v6_(fav|likes_outbox|content_friends)/.test($CONFIG.location),
            use: doMainPage
          },
          // 用户资料页、相册、管理中心、粉丝、服务、财经专家、热门话题
          profilepage: {
            test: /^page_.*_(home|photos|manage|myfollow|service|expert|topic)$/.test($CONFIG.location),
            use: doProfilePage
          },
          // 微博详情
          singleweibo: {
            test: /^page_.*_single_weibo$/.test($CONFIG.location),
            use: doSingleWBPage
          }
        };
        const target = Object.entries(pages).find(([, {
          test
        }]) => test);
        warn(target, $CONFIG.location);
        if (!target) return;
        uiControl.show();
        if (!store.enabled) return;
        styleSheet = target[1].use(getClassname(target[0]));
        document.body.classList.add(getClassname(target[0]));
        uiControl.notify();
      };
    }();

    function doMainPage(classname) {
      return GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            display: flex;
            width: var(--inject-page-width) !important;
          }
          /* 内容 */
          |> #plc_main {
            display: flex !important;
            flex: 1;
            width: auto !important;
          }
          |> .WB_main_c {
            flex: 1;
          }
          /* 微博类型 */
          |> .tab_box {
            display: flex;
          }
          |> .tab_box::after {
            content: none;
          }
          |> .tab_box .fr_box {
            flex: 1;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2));
            margin-left: 0 !important;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
    }

    function doProfilePage(classname) {
      return GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            width: var(--inject-page-width) !important;
          }
          |> .WB_frame_a, .WB_frame_a_fix {
            width: 100%;
          }
          /* 内容 */
          |> #plc_main {
            width: 100% !important;
            display: flex;
          }
          /* 这里修复特殊博主页右边距 */
          |> #plc_main > div:last-child {
            margin-right: 0;
          }
          /* 特殊博主页评论 */
          |> .WB_frame_c .input_simple_wrap .inputfunc_simple_wrap {
            width: calc(100% - 80px);
          }
          |> .WB_frame_c {
            flex: 1;
          }
          /* 右侧悬浮时间线 */
          |> .WB_timeline {
            left: calc(50% + (var(--inject-page-width) / 2) + 10px);
            margin-left: 0;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2));
            margin-left: 0 !important;
          }
          /* 个人资料 管理中心 */
          |> .WB_frame_a_fix {
            display: flex;
            justify-content: center;
          }
          |> .WB_frame_a_fix > .PCD_admin_content {
            float: none;
            margin-left: 18px;
          }
          |> .WB_frame_a_fix > .PCD_admin_content .PCD_admin_content {
            float: none;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
    }

    function doSingleWBPage(classname) {
      return GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            width: var(--inject-page-width) !important;
          }
          /* 内容 */
          |> #plc_main {
            display: flex !important;
            width: auto !important;
          }
          |> #plc_main .WB_frame_c {
            flex: 1;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2) - 19px);
            margin-left: 0 !important;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
    }
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/d-weibo-com/index.lazy.scss
var d_weibo_com_index_lazy = __webpack_require__(8343);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/d-weibo-com/index.lazy.scss

            

var d_weibo_com_index_lazy_refs = 0;
var d_weibo_com_index_lazy_update;
var d_weibo_com_index_lazy_options = {"injectType":"lazyStyleTag"};

d_weibo_com_index_lazy_options.insert = "head";
d_weibo_com_index_lazy_options.singleton = false;

var d_weibo_com_index_lazy_exported = {};

d_weibo_com_index_lazy_exported.locals = d_weibo_com_index_lazy/* default.locals */.Z.locals || {};
d_weibo_com_index_lazy_exported.use = function() {
  if (!(d_weibo_com_index_lazy_refs++)) {
    d_weibo_com_index_lazy_update = injectStylesIntoStyleTag_default()(d_weibo_com_index_lazy/* default */.Z, d_weibo_com_index_lazy_options);
  }

  return d_weibo_com_index_lazy_exported;
};
d_weibo_com_index_lazy_exported.unuse = function() {
  if (d_weibo_com_index_lazy_refs > 0 && !--d_weibo_com_index_lazy_refs) {
    d_weibo_com_index_lazy_update();
    d_weibo_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_d_weibo_com_index_lazy = (d_weibo_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/d-weibo-com/index.js

const weiboDynamic = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_d_weibo_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(5827);
;// CONCATENATED MODULE: ./src/utils/querystring.js


/**
 * 解析querystring
 * @param {string} href 或 带有参数格式的string；有search则不再hash
 * @return {object}
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

  const searchParams = new URLSearchParams(search);
  return [...searchParams.entries()].reduce((acc, [key, value]) => (acc[key] = value, acc), {});
}
function stringify(obj) {
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-google-com/index.lazy.scss
var www_google_com_index_lazy = __webpack_require__(2797);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-google-com/index.lazy.scss

            

var www_google_com_index_lazy_refs = 0;
var www_google_com_index_lazy_update;
var www_google_com_index_lazy_options = {"injectType":"lazyStyleTag"};

www_google_com_index_lazy_options.insert = "head";
www_google_com_index_lazy_options.singleton = false;

var www_google_com_index_lazy_exported = {};

www_google_com_index_lazy_exported.locals = www_google_com_index_lazy/* default.locals */.Z.locals || {};
www_google_com_index_lazy_exported.use = function() {
  if (!(www_google_com_index_lazy_refs++)) {
    www_google_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_google_com_index_lazy/* default */.Z, www_google_com_index_lazy_options);
  }

  return www_google_com_index_lazy_exported;
};
www_google_com_index_lazy_exported.unuse = function() {
  if (www_google_com_index_lazy_refs > 0 && !--www_google_com_index_lazy_refs) {
    www_google_com_index_lazy_update();
    www_google_com_index_lazy_update = null;
  }
};



;
       /* harmony default export */ const sites_www_google_com_index_lazy = (www_google_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-google-com/index.js


const google = ({
  store,
  createControl
}) => ({
  handler() {
    if (parse().tbm) return; // 选择了tab搜索时终止

    createControl({
      store,
      execute: sites_www_google_com_index_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/index.js

















const {
  host,
  pathname
} = location;
const sites = [{
  name: '半次元',
  namespace: 'banciyuan',
  test: /bcy\.net\/item\/detail\//,
  use: banciyuan
}, {
  name: '微信',
  namespace: 'weixin',
  test: /mp\.weixin\.qq\.com\/s/,
  use: weixin
}, {
  name: '知乎专栏',
  namespace: 'zhihu',
  test: /zhuanlan\.zhihu\.com\/p\//,
  use: zhihuZhuanlan
}, {
  name: '知乎问答',
  namespace: 'zhihu',
  test: /zhihu\.com\/question\//,
  use: zhihuQuestion
}, {
  name: '知乎',
  namespace: 'zhihu',
  test: /www\.zhihu\.com/.test(host) && /^\/(follow|hot)?$/.test(pathname),
  use: zhihuHome
}, {
  name: '知乎话题',
  namespace: 'zhihu',
  test: /www\.zhihu\.com\/topic\//,
  use: zhihuTopic
}, {
  name: '掘金',
  namespace: 'juejin',
  test: /juejin\.cn\/post\//,
  use: juejin
}, {
  name: '简书',
  namespace: 'jianshu',
  test: /jianshu\.com\/p\//,
  use: jianshu
}, {
  name: '百度',
  namespace: 'baidu',
  test: /www\.baidu\.com\/s?/,
  use: baidu
}, {
  name: '贴吧',
  namespace: 'tieba',
  test: /tieba\.baidu\.com\/p\//,
  use: tieba
}, {
  name: '贴吧吧页',
  namespace: 'tieba',
  test: /tieba\.baidu\.com\/f/,
  use: tiebaForum
}, {
  name: '搜狗',
  namespace: 'sougou',
  test: /www\.sogou\.com\/web?/,
  use: sougou
}, {
  name: 'segmentfault',
  namespace: 'segmentfault',
  test: /segmentfault\.com/,
  use: segmentfault
}, {
  name: 'bilibili',
  namespace: 'bilibili',
  test: /www\.bilibili\.com\/read\/cv/,
  use: bilibili
}, {
  name: 'bilibili动态',
  namespace: 'bilibili',
  test: /t\.bilibili\.com/.test(host) && pathname === '/',
  use: bilibiliDynamic
}, {
  name: '豆瓣电影',
  namespace: 'doubanmovie',
  test: /movie\.douban\.com/,
  use: doubanMovie
}, {
  name: '头条',
  namespace: 'toutiao',
  test: /www\.toutiao\.com/,
  use: toutiao
}, {
  name: '微博',
  namespace: 'weibo',
  test: /\/\/weibo.com/,
  use: weibo
}, {
  name: '微博动态',
  namespace: 'weibo',
  test: /d\.weibo\.com/,
  use: weiboDynamic
}, {
  name: '谷歌',
  namespace: 'google',
  test: /www\.google\.com\/search/,
  use: google
}];
/* harmony default export */ const widescreen_sites = (sites);
;// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
;// CONCATENATED MODULE: ./src/utils/mount-component.js
/*
  引用：https://github.com/youzan/vant/blob/dev/src/utils/mount-component.ts
*/


function append(el) {
  document.body ? document.body.appendChild(el) : window.addEventListener('DOMContentLoaded', () => append(el));
}

function mountComponent(RootComponent) {
  const app = (0,external_Vue_namespaceObject.createApp)(RootComponent);
  const root = document.createElement('div');
  append(root);
  return {
    instance: app.mount(root),

    unmount() {
      app.unmount(root);
      document.body.removeChild(root);
    }

  };
}
;// CONCATENATED MODULE: ./src/composables/use-expose.js
/*
  引用：https://github.com/youzan/vant/blob/dev/src/composables/use-expose.ts
*/
 // expose public api

function useExpose(apis) {
  const instance = (0,external_Vue_namespaceObject.getCurrentInstance)();

  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
;// CONCATENATED MODULE: ./src/composables/use-gm-value.js

/**
 * 同GM_getValue、GM_setValue
 * @param {string} name
 * @param {any} defaultValue
 * @param {boolean | object} options: listening, deep
 * @return {any}
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/input/index.scss
var input = __webpack_require__(9261);
;// CONCATENATED MODULE: ./src/components/input/index.scss

            

var input_options = {};

input_options.insert = "head";
input_options.singleton = false;

var input_update = injectStylesIntoStyleTag_default()(input/* default */.Z, input_options);



/* harmony default export */ const components_input = (input/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/components/input/index.js



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
    return () => (0,external_Vue_namespaceObject.createVNode)("input", {
      "class": [prefixCls, `${prefixCls}--${props.size}`, {
        [`${prefixCls}--scale`]: props.scale
      }],
      "value": props.modelValue,
      "type": "text",
      "onInput": event => emit('update:modelValue', event.target.value)
    }, null);
  }

});
/* harmony default export */ const src_components_input = ((/* unused pure expression or super */ null && (Input)));
;// CONCATENATED MODULE: ./src/directives/v-ripple/utils.js
/**
 * 计算一个点离矩形中心点的距离
 * @param {number} width 矩形宽
 * @param {number} height 矩形高
 * @return {function} function(left top 在矩形内点的坐标) @return {number} 距离
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
 * 例如：value:50 extent:100 则计算50在0-100中的位置返回1
 * value:0或100 extent:100 返回0
 * @param {number} value 当前值
 * @param {number} extent 总值
 * @return {number} 取值0-1
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

v_ripple_options.insert = "head";
v_ripple_options.singleton = false;

var v_ripple_update = injectStylesIntoStyleTag_default()(v_ripple/* default */.Z, v_ripple_options);



/* harmony default export */ const directives_v_ripple = (v_ripple/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/directives/v-ripple/index.js


const containerClassname = 'skr-ripple-container';
const rippleClassname = 'skr-ripple';
const vmap = new WeakMap();
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

function checkOptions(options = {}) {
  if (typeof options === 'boolean') {
    return {
      disabled: !options
    };
  }

  return options;
}
/**
 * 添加涟漪效果
 * @param {object} options color颜色 disabled禁用   布尔值时false为禁用
 */


const addRippleEffect = function (options = {}) {
  options = checkOptions(options); // 涟漪个数

  let count = 0;

  function listener(event) {
    if (options.disabled) return;
    const {
      currentTarget
    } = event; // 优化: 处理过后不再调用getComputedStyle

    if (vmap.get(currentTarget).position === false) {
      vmap.get(currentTarget).position = true; // 注意：会改变当前元素定位方式

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

    rippleEl.style.background = options.color;
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
          rippleEl.style.opacity = 0;
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
          container.remove();
        }
      }
    });
  } // 更新配置项


  function update(newOpts) {
    options = Object.assign({}, options, checkOptions(newOpts));
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
    vmap.set(el, {
      listener,
      update,
      // 更新配置项函数
      position: false // 是否已经改变了el的定位方式

    });
    el.addEventListener('mousedown', listener, false);
  },

  updated(el, binding) {
    const val = vmap.get(el);
    val.update(binding.value);
  }

};
/* harmony default export */ const src_directives_v_ripple = (vRipple);
;// CONCATENATED MODULE: ./src/directives/index.js

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/button/index.scss
var components_button = __webpack_require__(5482);
;// CONCATENATED MODULE: ./src/components/button/index.scss

            

var button_options = {};

button_options.insert = "head";
button_options.singleton = false;

var button_update = injectStylesIntoStyleTag_default()(components_button/* default */.Z, button_options);



/* harmony default export */ const src_components_button = (components_button/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/components/button/index.js






const button_prefixCls = 'skr-button'; // button type非default时覆盖一层白色

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
    // 涟漪效果 object时参数会透传给ripple
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
    }, [slots.default()]), [[(0,external_Vue_namespaceObject.resolveDirective)("ripple"), rippleOptions.value]]);
  }

});
/* harmony default export */ const src_components_button_0 = (Button);
;// CONCATENATED MODULE: ./src/components/index.js


// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/control.scss
var control = __webpack_require__(9354);
;// CONCATENATED MODULE: ./src/scripts/widescreen/control.scss

            

var control_options = {};

control_options.insert = "head";
control_options.singleton = false;

var control_update = injectStylesIntoStyleTag_default()(control/* default */.Z, control_options);



/* harmony default export */ const widescreen_control = (control/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/scripts/widescreen/control.js











 // 宽屏开关 options: store<store>, execute要执行的函数，visible是否可见(后续用show hide控制)，silent是否显示通知

function createControl(options) {
  const {
    store,
    execute = () => {},
    visible = true,
    silent = false
  } = options;
  const {
    instance
  } = mountComponent({
    setup() {
      const state = (0,external_Vue_namespaceObject.reactive)({
        // 总开关
        uiVisible: useGMvalue('ui_visible', true),
        visible,
        loose: store.loose || false
      });

      function notify() {
        (src_store.notify_enabled ?? true) && Toast('已宽屏处理');
      }

      function toggle() {
        store.enabled = !store.enabled;
        location.reload();
      }

      useExpose({
        notify,
        show: () => {
          state.visible = true;
        },
        hide: () => {
          state.visible = false;
        }
      });

      if (store.enabled) {
        (0,external_Vue_namespaceObject.watchEffect)(() => {
          store.loose = state.loose;
          document.documentElement.classList[state.loose ? 'add' : 'remove']('inject-widescreen-loose-js');
        });
        execute();
        !silent && notify();
      }

      return () => (0,external_Vue_namespaceObject.createVNode)(external_Vue_namespaceObject.Fragment, null, [state.uiVisible && state.visible && (0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "inject-widescreen-js"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "title": "注意：页面会被刷新",
        "type": "primary",
        "shadow": true,
        "onClick": toggle
      }, {
        default: () => [store.enabled ? '已开启' : '关闭']
      }), store.enabled && (0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "勾选后不再限制最大宽度，酌情使用"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => state.loose = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, state.loose]]), (0,external_Vue_namespaceObject.createTextVNode)("\u66F4\u5BBD")])])]);
    }

  });
  return instance;
}
;// CONCATENATED MODULE: ./src/scripts/widescreen/index.js
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }






 // 主函数

function main() {
  if (!checker()) return;
  GM_registerMenuCommand('宽屏通知', function () {
    const nextStatus = !(src_store.notify_enabled ?? true);
    Toast.success(nextStatus ? '已开启通知' : '已关闭通知');
    src_store.notify_enabled = nextStatus;
  });
  GM_registerMenuCommand('控制按钮', function () {
    const nextStatus = !(src_store.ui_visible ?? true);
    Toast.success(nextStatus ? '已显示按钮' : '已隐藏按钮');
    src_store.ui_visible = nextStatus;
  });
  new App(widescreen_sites).boot();
}

var _sites = _classPrivateFieldLooseKey("sites");

class App {
  constructor(sites) {
    Object.defineProperty(this, _sites, {
      writable: true,
      value: []
    });
    _classPrivateFieldLooseBase(this, _sites)[_sites] = sites;
  }

  boot() {
    const briefURL = location.origin + location.pathname;

    _classPrivateFieldLooseBase(this, _sites)[_sites].forEach(async site => {
      const {
        name,
        namespace,
        test,
        use
      } = site; // 一个符合就可以了

      const some = [].concat(test).some(item => {
        if (item instanceof RegExp) return item.test(briefURL);
        if (typeof item === 'boolean') return item;
        return false;
      });
      if (some === false) return;
      const config = use({
        createControl: createControl,
        store: widescreen_createStore(namespace)
      });
      const {
        readyState: state,
        handler
      } = config;
      if (state) await ready_state_namespaceObject[state]();
      warn(name);
      handler();
    });
  }

} // 存储


function widescreen_createStore(namespace) {
  if (!namespace) throw new TypeError('缺少namespace，期望<string>');
  const handler = {
    get(target, property) {
      let value = target[property];

      if (property === 'enabled') {
        // 默认开启
        value ?? (value = true);
      }

      return value;
    }

  };
  const store = new Proxy(createStore(namespace), handler);
  return store;
}

main();
})();

/******/ })()
;