(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Typesense = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],2:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],3:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],4:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

var isNativeReflectConstruct = require("./isNativeReflectConstruct");

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
},{"./isNativeReflectConstruct":11,"./setPrototypeOf":13}],13:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],11:[function(require,module,exports){
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;
},{}],5:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],6:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],7:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":13}],8:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],9:[function(require,module,exports){
var _typeof = require("@babel/runtime/helpers/typeof");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;
},{"@babel/runtime/helpers/typeof":14}],14:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],10:[function(require,module,exports){
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;
},{}],12:[function(require,module,exports){
var _typeof = require("@babel/runtime/helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"./assertThisInitialized":1,"@babel/runtime/helpers/typeof":14}],15:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

var setPrototypeOf = require("./setPrototypeOf");

var isNativeFunction = require("./isNativeFunction");

var construct = require("./construct");

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
},{"./construct":4,"./getPrototypeOf":6,"./isNativeFunction":10,"./setPrototypeOf":13}],16:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":49}],49:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],17:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":19}],19:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":20,"./cancel/CancelToken":21,"./cancel/isCancel":22,"./core/Axios":23,"./core/mergeConfig":29,"./defaults":32,"./helpers/bind":33,"./helpers/spread":41,"./utils":42}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    if (
      (utils.isBlob(requestData) || utils.isFile(requestData)) &&
      requestData.type
    ) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = unescape(encodeURIComponent(config.auth.password)) || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../core/buildFullPath":25,"../core/createError":26,"./../core/settle":30,"./../helpers/buildURL":34,"./../helpers/cookies":36,"./../helpers/isURLSameOrigin":38,"./../helpers/parseHeaders":40,"./../utils":42}],42:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  /* common-shake removed: isFunction: isFunction */
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  /* common-shake removed: stripBOM: stripBOM */
};

},{"./helpers/bind":33}],34:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":42}],36:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":42}],38:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":42}],40:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":42}],30:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":26}],25:[function(require,module,exports){
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/combineURLs":35,"../helpers/isAbsoluteURL":37}],26:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":28}],33:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],20:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],22:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],41:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],29:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":42}],21:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":20}],23:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":34,"./../utils":42,"./InterceptorManager":24,"./dispatchRequest":27,"./mergeConfig":29}],32:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))

},{"./adapters/http":18,"./adapters/xhr":18,"./helpers/normalizeHeaderName":39,"./utils":42,"_process":48}],24:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":42}],27:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":22,"../defaults":32,"./../utils":42,"./transformData":31}],37:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],35:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],28:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],31:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":42}],48:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],39:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":42}],43:[function(require,module,exports){
'use strict'

/* common-shake removed: exports.byteLength = */ void byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],44:[function(require,module,exports){

},{}],45:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
/* common-shake removed: exports.SlowBuffer = */ void SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
/* common-shake removed: exports.kMaxLength = */ void K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)

},{"base64-js":43,"buffer":45,"ieee754":46}],46:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],47:[function(require,module,exports){
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(definition);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));

},{}],50:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Client", {
  enumerable: true,
  get: function get() {
    return _Client["default"];
  }
});
Object.defineProperty(exports, "SearchClient", {
  enumerable: true,
  get: function get() {
    return _SearchClient["default"];
  }
});
exports.Errors = void 0;

var _Client = _interopRequireDefault(require("./Typesense/Client"));

var _SearchClient = _interopRequireDefault(require("./Typesense/SearchClient"));

var Errors = _interopRequireWildcard(require("./Typesense/Errors"));

exports.Errors = Errors;

},{"./Typesense/Client":54,"./Typesense/Errors":70,"./Typesense/SearchClient":77,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/interopRequireWildcard":9}],77:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Configuration = _interopRequireDefault(require("./Configuration"));

var _ApiCall = _interopRequireDefault(require("./ApiCall"));

var _Collection = _interopRequireDefault(require("./Collection"));

var SearchClient = /*#__PURE__*/function () {
  function SearchClient(options) {
    (0, _classCallCheck2["default"])(this, SearchClient);
    this.configuration = new _Configuration["default"](options);
    this._apiCall = new _ApiCall["default"](this.configuration);
    this._individualCollections = {};
  }

  (0, _createClass2["default"])(SearchClient, [{
    key: "collections",
    value: function collections(collectionName) {
      if (collectionName === undefined) {
        throw new Error('Typesense.SearchClient only supports search operations, so the collectionName that needs to ' + 'be searched must be specified. Use Typesense.Client if you need to access the collection object.');
      } else {
        if (this._individualCollections[collectionName] === undefined) {
          this._individualCollections[collectionName] = new _Collection["default"](collectionName, this._apiCall);
        }

        return this._individualCollections[collectionName];
      }
    }
  }]);
  return SearchClient;
}();

exports["default"] = SearchClient;

},{"./ApiCall":53,"./Collection":55,"./Configuration":57,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],70:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HTTPError", {
  enumerable: true,
  get: function get() {
    return _HTTPError["default"];
  }
});
Object.defineProperty(exports, "MissingConfigurationError", {
  enumerable: true,
  get: function get() {
    return _MissingConfigurationError["default"];
  }
});
Object.defineProperty(exports, "ObjectAlreadyExists", {
  enumerable: true,
  get: function get() {
    return _ObjectAlreadyExists["default"];
  }
});
Object.defineProperty(exports, "ObjectNotFound", {
  enumerable: true,
  get: function get() {
    return _ObjectNotFound["default"];
  }
});
Object.defineProperty(exports, "ObjectUnprocessable", {
  enumerable: true,
  get: function get() {
    return _ObjectUnprocessable["default"];
  }
});
Object.defineProperty(exports, "RequestMalformed", {
  enumerable: true,
  get: function get() {
    return _RequestMalformed["default"];
  }
});
Object.defineProperty(exports, "RequestUnauthorized", {
  enumerable: true,
  get: function get() {
    return _RequestUnauthorized["default"];
  }
});
Object.defineProperty(exports, "ServerError", {
  enumerable: true,
  get: function get() {
    return _ServerError["default"];
  }
});
Object.defineProperty(exports, "TypesenseError", {
  enumerable: true,
  get: function get() {
    return _TypesenseError["default"];
  }
});

var _HTTPError = _interopRequireDefault(require("./HTTPError"));

var _MissingConfigurationError = _interopRequireDefault(require("./MissingConfigurationError"));

var _ObjectAlreadyExists = _interopRequireDefault(require("./ObjectAlreadyExists"));

var _ObjectNotFound = _interopRequireDefault(require("./ObjectNotFound"));

var _ObjectUnprocessable = _interopRequireDefault(require("./ObjectUnprocessable"));

var _RequestMalformed = _interopRequireDefault(require("./RequestMalformed"));

var _RequestUnauthorized = _interopRequireDefault(require("./RequestUnauthorized"));

var _ServerError = _interopRequireDefault(require("./ServerError"));

var _TypesenseError = _interopRequireDefault(require("./TypesenseError"));

},{"./HTTPError":61,"./MissingConfigurationError":62,"./ObjectAlreadyExists":63,"./ObjectNotFound":64,"./ObjectUnprocessable":65,"./RequestMalformed":66,"./RequestUnauthorized":67,"./ServerError":68,"./TypesenseError":69,"@babel/runtime/helpers/interopRequireDefault":8}],54:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Configuration = _interopRequireDefault(require("./Configuration"));

var _ApiCall = _interopRequireDefault(require("./ApiCall"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _Aliases = _interopRequireDefault(require("./Aliases"));

var _Alias = _interopRequireDefault(require("./Alias"));

var _Keys = _interopRequireDefault(require("./Keys"));

var _Key = _interopRequireDefault(require("./Key"));

var _Debug = _interopRequireDefault(require("./Debug"));

var _Metrics = _interopRequireDefault(require("./Metrics"));

var _Health = _interopRequireDefault(require("./Health"));

var Client = /*#__PURE__*/function () {
  function Client(options) {
    (0, _classCallCheck2["default"])(this, Client);
    this.configuration = new _Configuration["default"](options);
    this._apiCall = new _ApiCall["default"](this.configuration);
    this.debug = new _Debug["default"](this._apiCall);
    this.metrics = new _Metrics["default"](this._apiCall);
    this.health = new _Health["default"](this._apiCall);
    this._collections = new _Collections["default"](this._apiCall);
    this._individualCollections = {};
    this._aliases = new _Aliases["default"](this._apiCall);
    this._individualAliases = {};
    this._keys = new _Keys["default"](this._apiCall);
    this._individualKeys = {};
  }

  (0, _createClass2["default"])(Client, [{
    key: "collections",
    value: function collections(collectionName) {
      if (collectionName === undefined) {
        return this._collections;
      } else {
        if (this._individualCollections[collectionName] === undefined) {
          this._individualCollections[collectionName] = new _Collection["default"](collectionName, this._apiCall);
        }

        return this._individualCollections[collectionName];
      }
    }
  }, {
    key: "aliases",
    value: function aliases(aliasName) {
      if (aliasName === undefined) {
        return this._aliases;
      } else {
        if (this._individualAliases[aliasName] === undefined) {
          this._individualAliases[aliasName] = new _Alias["default"](aliasName, this._apiCall);
        }

        return this._individualAliases[aliasName];
      }
    }
  }, {
    key: "keys",
    value: function keys(id) {
      if (id === undefined) {
        return this._keys;
      } else {
        if (this._individualKeys[id] === undefined) {
          this._individualKeys[id] = new _Key["default"](id, this._apiCall);
        }

        return this._individualKeys[id];
      }
    }
  }]);
  return Client;
}();

exports["default"] = Client;

},{"./Alias":51,"./Aliases":52,"./ApiCall":53,"./Collection":55,"./Collections":56,"./Configuration":57,"./Debug":58,"./Health":71,"./Key":72,"./Keys":73,"./Metrics":74,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],51:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Aliases = _interopRequireDefault(require("./Aliases"));

var Alias = /*#__PURE__*/function () {
  function Alias(name, apiCall) {
    (0, _classCallCheck2["default"])(this, Alias);
    this._apiCall = apiCall;
    this._name = name;
  }

  (0, _createClass2["default"])(Alias, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this._apiCall["delete"](this._endpointPath());
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Aliases["default"].RESOURCEPATH, "/").concat(this._name);
    }
  }]);
  return Alias;
}();

exports["default"] = Alias;

},{"./Aliases":52,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],52:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/aliases';

var Aliases = /*#__PURE__*/function () {
  function Aliases(apiCall) {
    (0, _classCallCheck2["default"])(this, Aliases);
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Aliases, [{
    key: "upsert",
    value: function upsert(name, mapping) {
      return this._apiCall.put(this._endpointPath(name), mapping);
    }
  }, {
    key: "retrieve",
    value: function retrieve(schema) {
      return this._apiCall.get(RESOURCEPATH);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(aliasName) {
      return "".concat(Aliases.RESOURCEPATH, "/").concat(aliasName);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Aliases;
}();

exports["default"] = Aliases;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],53:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _Errors = require("./Errors");

var APIKEYHEADERNAME = 'X-TYPESENSE-API-KEY';
var HEALTHY = true;
var UNHEALTHY = false;

var ApiCall = /*#__PURE__*/function () {
  function ApiCall(configuration) {
    (0, _classCallCheck2["default"])(this, ApiCall);
    this._configuration = configuration;
    this._apiKey = this._configuration.apiKey;
    this._nodes = JSON.parse(JSON.stringify(this._configuration.nodes)); // Make a copy, since we'll be adding additional metadata to the nodes

    this._nearestNode = JSON.parse(JSON.stringify(this._configuration.nearestNode));
    this._connectionTimeoutSeconds = this._configuration.connectionTimeoutSeconds;
    this._healthcheckIntervalSeconds = this._configuration.healthcheckIntervalSeconds;
    this._numRetriesPerRequest = this._configuration.numRetries;
    this._retryIntervalSeconds = this._configuration.retryIntervalSeconds;
    this.logger = this._configuration.logger;

    this._initializeMetadataForNodes();

    this._currentNodeIndex = -1;
  }

  (0, _createClass2["default"])(ApiCall, [{
    key: "get",
    value: function get(endpoint) {
      var queryParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('get', endpoint, {
        queryParameters: queryParameters
      });
    }
  }, {
    key: "delete",
    value: function _delete(endpoint) {
      var queryParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('delete', endpoint, {
        queryParameters: queryParameters
      });
    }
  }, {
    key: "post",
    value: function post(endpoint) {
      var bodyParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.performRequest('post', endpoint, {
        queryParameters: queryParameters,
        bodyParameters: bodyParameters
      });
    }
  }, {
    key: "put",
    value: function put(endpoint) {
      var bodyParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.performRequest('put', endpoint, {
        queryParameters: queryParameters,
        bodyParameters: bodyParameters
      });
    }
  }, {
    key: "patch",
    value: function patch(endpoint) {
      var bodyParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.performRequest('patch', endpoint, {
        queryParameters: queryParameters,
        bodyParameters: bodyParameters
      });
    }
  }, {
    key: "performRequest",
    value: function () {
      var _performRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(requestType, endpoint, _ref) {
        var _ref$queryParameters, queryParameters, _ref$bodyParameters, bodyParameters, _ref$additionalHeader, additionalHeaders, requestNumber, lastException, numTries, node, requestOptions, response;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$queryParameters = _ref.queryParameters, queryParameters = _ref$queryParameters === void 0 ? null : _ref$queryParameters, _ref$bodyParameters = _ref.bodyParameters, bodyParameters = _ref$bodyParameters === void 0 ? null : _ref$bodyParameters, _ref$additionalHeader = _ref.additionalHeaders, additionalHeaders = _ref$additionalHeader === void 0 ? {} : _ref$additionalHeader;

                this._configuration.validate();

                requestNumber = Date.now();
                this.logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));
                numTries = 1;

              case 5:
                if (!(numTries <= this._numRetriesPerRequest + 1)) {
                  _context.next = 39;
                  break;
                }

                node = this._getNextNode(requestNumber);
                this.logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));
                _context.prev = 8;
                requestOptions = {
                  method: requestType,
                  url: this._uriFor(endpoint, node),
                  headers: Object.assign({}, this._defaultHeaders(), additionalHeaders),
                  timeout: this._connectionTimeoutSeconds * 1000,
                  maxContentLength: Infinity,
                  maxBodyLength: Infinity,
                  validateStatus: function validateStatus(status) {
                    /* Override default validateStatus, which only considers 2xx a success.
                        In our case, if the server returns any HTTP code, we will handle it below.
                        We do this to be able to raise custom errors based on response code.
                     */
                    return status > 0;
                  },
                  transformResponse: [function (data, headers) {
                    var transformedData = data;

                    if (headers !== undefined && typeof data === 'string' && headers['content-type'].startsWith('application/json')) {
                      transformedData = JSON.parse(data);
                    }

                    return transformedData;
                  }]
                };

                if (queryParameters && Object.keys(queryParameters).length !== 0) {
                  requestOptions.params = queryParameters;
                }

                if (bodyParameters && Object.keys(bodyParameters).length !== 0) {
                  requestOptions.data = bodyParameters;
                }

                _context.next = 14;
                return (0, _axios["default"])(requestOptions);

              case 14:
                response = _context.sent;

                if (response.status >= 1 && response.status <= 499) {
                  // Treat any status code > 0 and < 500 to be an indication that node is healthy
                  // We exclude 0 since some clients return 0 when request fails
                  this._setNodeHealthcheck(node, HEALTHY);
                }

                this.logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was made. Response Code was ").concat(response.status, "."));

                if (!(response.status >= 200 && response.status < 300)) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(response.data));

              case 21:
                if (!(response.status < 500)) {
                  _context.next = 25;
                  break;
                }

                return _context.abrupt("return", Promise.reject(this._customErrorForResponse(response, response.data.message)));

              case 25:
                throw this._customErrorForResponse(response, response.data.message);

              case 26:
                _context.next = 36;
                break;

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](8);

                // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
                this._setNodeHealthcheck(node, UNHEALTHY);

                lastException = _context.t0;
                this.logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat(_context.t0.code, " ").concat(_context.t0.message).concat(_context.t0.response == null ? '' : ' - ' + JSON.stringify(_context.t0.response.data), "\"")); // this.logger.debug(error.stack)

                this.logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this._retryIntervalSeconds, "s and then retrying request..."));
                _context.next = 36;
                return this._timer(this._retryIntervalSeconds);

              case 36:
                numTries++;
                _context.next = 5;
                break;

              case 39:
                this.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
                return _context.abrupt("return", Promise.reject(lastException));

              case 41:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 28]]);
      }));

      function performRequest(_x, _x2, _x3) {
        return _performRequest.apply(this, arguments);
      }

      return performRequest;
    }() // Attempts to find the next healthy node, looping through the list of nodes once.
    //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
    //     so we can try the request for good measure, in case that node has become healthy since

  }, {
    key: "_getNextNode",
    value: function _getNextNode() {
      var requestNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // Check if nearestNode is set and is healthy, if so return it
      if (this._nearestNode != null) {
        this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: Node ").concat(this._nearestNode.index, " is ").concat(this._nearestNode.isHealthy === true ? 'Healthy' : 'Unhealthy'));

        if (this._nearestNode.isHealthy === true || this._nodeDueForHealthcheck(this._nearestNode, requestNumber)) {
          this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(this._nearestNode.index));
          return this._nearestNode;
        }

        this.logger.debug("Request #".concat(requestNumber, ": Falling back to individual nodes"));
      } // Fallback to nodes as usual


      this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: ").concat(this._nodes.map(function (node) {
        return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? 'Healthy' : 'Unhealthy');
      }).join(' || ')));
      var candidateNode;

      for (var i = 0; i <= this._nodes.length; i++) {
        this._currentNodeIndex = (this._currentNodeIndex + 1) % this._nodes.length;
        candidateNode = this._nodes[this._currentNodeIndex];

        if (candidateNode.isHealthy === true || this._nodeDueForHealthcheck(candidateNode, requestNumber)) {
          this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(candidateNode.index));
          return candidateNode;
        }
      } // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
      //  So we will just return the next node.


      this.logger.debug("Request #".concat(requestNumber, ": No healthy nodes were found. Returning the next node, Node ").concat(candidateNode.index));
      return candidateNode;
    }
  }, {
    key: "_nodeDueForHealthcheck",
    value: function _nodeDueForHealthcheck(node) {
      var requestNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var isDueForHealthcheck = Date.now() - node.lastAccessTimestamp > this._healthcheckIntervalSeconds * 1000;

      if (isDueForHealthcheck) {
        this.logger.debug("Request #".concat(requestNumber, ": Node ").concat(node.index, " has exceeded healtcheckIntervalSeconds of ").concat(this._healthcheckIntervalSeconds, ". Adding it back into rotation."));
      }

      return isDueForHealthcheck;
    }
  }, {
    key: "_initializeMetadataForNodes",
    value: function _initializeMetadataForNodes() {
      var _this = this;

      if (this._nearestNode != null) {
        this._nearestNode.index = 'nearestNode';

        this._setNodeHealthcheck(this._nearestNode, HEALTHY);
      }

      this._nodes.forEach(function (node, i) {
        node.index = i;

        _this._setNodeHealthcheck(node, HEALTHY);
      });
    }
  }, {
    key: "_setNodeHealthcheck",
    value: function _setNodeHealthcheck(node, isHealthy) {
      node.isHealthy = isHealthy;
      node.lastAccessTimestamp = Date.now();
    }
  }, {
    key: "_uriFor",
    value: function _uriFor(endpoint, node) {
      return "".concat(node.protocol, "://").concat(node.host, ":").concat(node.port).concat(node.path).concat(endpoint);
    }
  }, {
    key: "_defaultHeaders",
    value: function _defaultHeaders() {
      var defaultHeaders = {};
      defaultHeaders[APIKEYHEADERNAME] = this._apiKey;
      defaultHeaders['Content-Type'] = 'application/json';
      return defaultHeaders;
    }
  }, {
    key: "_timer",
    value: function () {
      var _timer2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(seconds) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve) {
                  return setTimeout(resolve, seconds * 1000);
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _timer(_x4) {
        return _timer2.apply(this, arguments);
      }

      return _timer;
    }()
  }, {
    key: "_customErrorForResponse",
    value: function _customErrorForResponse(response, messageFromServer) {
      var CustomErrorKlass;

      if (response.status === 400) {
        CustomErrorKlass = _Errors.RequestMalformed;
      } else if (response.status === 401) {
        CustomErrorKlass = _Errors.RequestUnauthorized;
      } else if (response.status === 404) {
        CustomErrorKlass = _Errors.ObjectNotFound;
      } else if (response.status === 409) {
        CustomErrorKlass = _Errors.ObjectAlreadyExists;
      } else if (response.status === 422) {
        CustomErrorKlass = _Errors.ObjectUnprocessable;
      } else if (response.status >= 500 && response.status <= 599) {
        CustomErrorKlass = _Errors.ServerError;
      } else {
        CustomErrorKlass = _Errors.HTTPError;
      }

      var errorMessage = "Request failed with HTTP code ".concat(response.status);

      if (typeof messageFromServer === 'string' && messageFromServer.trim() !== '') {
        errorMessage += " | Server said: ".concat(messageFromServer);
      }

      var customErrror = new CustomErrorKlass(errorMessage);
      customErrror.httpStatus = response.status;
      return customErrror;
    }
  }]);
  return ApiCall;
}();

exports["default"] = ApiCall;

},{"./Errors":70,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/regenerator":16,"axios":17}],56:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/collections';

var Collections = /*#__PURE__*/function () {
  function Collections(apiCall) {
    (0, _classCallCheck2["default"])(this, Collections);
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Collections, [{
    key: "create",
    value: function create(schema) {
      return this._apiCall.post(RESOURCEPATH, schema);
    }
  }, {
    key: "retrieve",
    value: function retrieve(schema) {
      return this._apiCall.get(RESOURCEPATH);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Collections;
}();

exports["default"] = Collections;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],72:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Keys = _interopRequireDefault(require("./Keys"));

var Key = /*#__PURE__*/function () {
  function Key(id, apiCall) {
    (0, _classCallCheck2["default"])(this, Key);
    this._apiCall = apiCall;
    this._id = id;
  }

  (0, _createClass2["default"])(Key, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this._apiCall["delete"](this._endpointPath());
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Keys["default"].RESOURCEPATH, "/").concat(this._id);
    }
  }]);
  return Key;
}();

exports["default"] = Key;

},{"./Keys":73,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],58:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/debug';

var Debug = /*#__PURE__*/function () {
  function Debug(apiCall) {
    (0, _classCallCheck2["default"])(this, Debug);
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Debug, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }]);
  return Debug;
}();

exports["default"] = Debug;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],74:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/metrics.json';

var Metrics = /*#__PURE__*/function () {
  function Metrics(apiCall) {
    (0, _classCallCheck2["default"])(this, Metrics);
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Metrics, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }]);
  return Metrics;
}();

exports["default"] = Metrics;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],71:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/health';

var Health = /*#__PURE__*/function () {
  function Health(apiCall) {
    (0, _classCallCheck2["default"])(this, Health);
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Health, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }]);
  return Health;
}();

exports["default"] = Health;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],57:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loglevel = _interopRequireDefault(require("loglevel"));

var _Errors = require("./Errors");

var Configuration = /*#__PURE__*/function () {
  function Configuration() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Configuration);
    this.nodes = options.nodes || [];
    this.nodes = this.nodes.map(function (node) {
      return _this._setDefaultPathInNode(node);
    }).map(function (node) {
      return _this._setDefaultPortInNode(node);
    });
    this.nearestNode = options.nearestNode || null;
    this.nearestNode = this._setDefaultPathInNode(this.nearestNode);
    this.nearestNode = this._setDefaultPortInNode(this.nearestNode);
    this.connectionTimeoutSeconds = options.connectionTimeoutSeconds || options.timeoutSeconds || 10;
    this.healthcheckIntervalSeconds = options.healthcheckIntervalSeconds || 15;
    this.numRetries = options.numRetries || this.nodes.length + (this.nearestNode == null ? 0 : 1) || 3;
    this.retryIntervalSeconds = options.retryIntervalSeconds || 0.1;
    this.apiKey = options.apiKey;
    this.logger = options.logger || _loglevel["default"];
    this.logLevel = options.logLevel || 'warn';
    this.logger.setLevel(this.logLevel);

    this._showDeprecationWarnings(options);

    this.validate();
  }

  (0, _createClass2["default"])(Configuration, [{
    key: "validate",
    value: function validate() {
      if (this.nodes == null || this.nodes.length === 0 || this._validateNodes()) {
        throw new _Errors.MissingConfigurationError('Ensure that nodes[].protocol, nodes[].host and nodes[].port are set');
      }

      if (this.nearestNode != null && this._isNodeMissingAnyParameters(this.nearestNode)) {
        throw new _Errors.MissingConfigurationError('Ensure that nearestNodes.protocol, nearestNodes.host and nearestNodes.port are set');
      }

      if (this.apiKey == null) {
        throw new _Errors.MissingConfigurationError('Ensure that apiKey is set');
      }

      return true;
    }
  }, {
    key: "_validateNodes",
    value: function _validateNodes() {
      var _this2 = this;

      return this.nodes.some(function (node) {
        return _this2._isNodeMissingAnyParameters(node);
      });
    }
  }, {
    key: "_isNodeMissingAnyParameters",
    value: function _isNodeMissingAnyParameters(node) {
      return !['protocol', 'host', 'port', 'path'].every(function (key) {
        return node.hasOwnProperty(key);
      });
    }
  }, {
    key: "_setDefaultPathInNode",
    value: function _setDefaultPathInNode(node) {
      if (node != null && !node.hasOwnProperty('path')) {
        node.path = '';
      }

      return node;
    }
  }, {
    key: "_setDefaultPortInNode",
    value: function _setDefaultPortInNode(node) {
      if (node != null && !node.hasOwnProperty('port') && node.hasOwnProperty('protocol')) {
        switch (node.protocol) {
          case 'https':
            node.port = 443;
            break;

          case 'http':
            node.port = 80;
            break;
        }
      }

      return node;
    }
  }, {
    key: "_showDeprecationWarnings",
    value: function _showDeprecationWarnings(options) {
      if (options.timeoutSeconds) {
        this.logger.warn('Deprecation warning: timeoutSeconds is now renamed to connectionTimeoutSeconds');
      }

      if (options.masterNode) {
        this.logger.warn('Deprecation warning: masterNode is now consolidated to nodes, starting with Typesense Server v0.12');
      }

      if (options.readReplicaNodes) {
        this.logger.warn('Deprecation warning: readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12');
      }
    }
  }]);
  return Configuration;
}();

exports["default"] = Configuration;

},{"./Errors":70,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"loglevel":47}],73:[function(require,module,exports){
(function (Buffer){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _crypto = require("crypto");

var RESOURCEPATH = '/keys';

var Keys = /*#__PURE__*/function () {
  function Keys(apiCall) {
    (0, _classCallCheck2["default"])(this, Keys);
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Keys, [{
    key: "create",
    value: function create(params) {
      return this._apiCall.post(Keys.RESOURCEPATH, params);
    }
  }, {
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }, {
    key: "generateScopedSearchKey",
    value: function generateScopedSearchKey(searchKey, parameters) {
      // Note: only a key generated with the `documents:search` action will be
      // accepted by the server, when usined with the search endpoint.
      var paramsJSON = JSON.stringify(parameters);
      var digest = Buffer.from((0, _crypto.createHmac)('sha256', searchKey).update(paramsJSON).digest('base64'));
      var keyPrefix = searchKey.substr(0, 4);
      var rawScopedKey = "".concat(digest).concat(keyPrefix).concat(paramsJSON);
      return Buffer.from(rawScopedKey).toString('base64');
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Keys;
}();

exports["default"] = Keys;

}).call(this,require("buffer").Buffer)

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"buffer":45,"crypto":44}],55:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Documents = _interopRequireDefault(require("./Documents"));

var _Document = _interopRequireDefault(require("./Document"));

var _Overrides = _interopRequireDefault(require("./Overrides"));

var _Override = _interopRequireDefault(require("./Override"));

var Collection = /*#__PURE__*/function () {
  function Collection(name, apiCall) {
    (0, _classCallCheck2["default"])(this, Collection);
    this._name = name;
    this._apiCall = apiCall;
    this._documents = new _Documents["default"](this._name, this._apiCall);
    this._individualDocuments = {};
    this._overrides = new _Overrides["default"](this._name, this._apiCall);
    this._individualOverrides = {};
  }

  (0, _createClass2["default"])(Collection, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this._apiCall["delete"](this._endpointPath());
    }
  }, {
    key: "documents",
    value: function documents(documentId) {
      if (documentId === undefined) {
        return this._documents;
      } else {
        if (this._individualDocuments[documentId] === undefined) {
          this._individualDocuments[documentId] = new _Document["default"](this._name, documentId, this._apiCall);
        }

        return this._individualDocuments[documentId];
      }
    }
  }, {
    key: "overrides",
    value: function overrides(overrideId) {
      if (overrideId === undefined) {
        return this._overrides;
      } else {
        if (this._individualOverrides[overrideId] === undefined) {
          this._individualOverrides[overrideId] = new _Override["default"](this._name, overrideId, this._apiCall);
        }

        return this._individualOverrides[overrideId];
      }
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Collections["default"].RESOURCEPATH, "/").concat(this._name);
    }
  }]);
  return Collection;
}();

exports["default"] = Collection;

},{"./Collections":56,"./Document":59,"./Documents":60,"./Override":75,"./Overrides":76,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],75:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Overrides = _interopRequireDefault(require("./Overrides"));

var Override = /*#__PURE__*/function () {
  function Override(collectionName, overrideId, apiCall) {
    (0, _classCallCheck2["default"])(this, Override);
    this._collectionName = collectionName;
    this._overrideId = overrideId;
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Override, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this._apiCall["delete"](this._endpointPath());
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Collections["default"].RESOURCEPATH, "/").concat(this._collectionName).concat(_Overrides["default"].RESOURCEPATH, "/").concat(this._overrideId);
    }
  }]);
  return Override;
}();

exports["default"] = Override;

},{"./Collections":56,"./Overrides":76,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],76:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var RESOURCEPATH = '/overrides';

var Overrides = /*#__PURE__*/function () {
  function Overrides(collectionName, apiCall) {
    (0, _classCallCheck2["default"])(this, Overrides);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Overrides, [{
    key: "create",
    value: function create(params) {
      return this._apiCall.put(this._endpointPath(), params);
    }
  }, {
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections["default"].RESOURCEPATH, "/").concat(this._collectionName).concat(Overrides.RESOURCEPATH);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Overrides;
}();

exports["default"] = Overrides;

},{"./Collections":56,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],59:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Documents = _interopRequireDefault(require("./Documents"));

var Document = /*#__PURE__*/function () {
  function Document(collectionName, documentId, apiCall) {
    (0, _classCallCheck2["default"])(this, Document);
    this._collectionName = collectionName;
    this._documentId = documentId;
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Document, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this._apiCall["delete"](this._endpointPath());
    }
  }, {
    key: "update",
    value: function update(partialDocument) {
      return this._apiCall.patch(this._endpointPath(), partialDocument);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Collections["default"].RESOURCEPATH, "/").concat(this._collectionName).concat(_Documents["default"].RESOURCEPATH, "/").concat(this._documentId);
    }
  }]);
  return Document;
}();

exports["default"] = Document;

},{"./Collections":56,"./Documents":60,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8}],60:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var RESOURCEPATH = '/documents';

var Documents = /*#__PURE__*/function () {
  function Documents(collectionName, apiCall) {
    (0, _classCallCheck2["default"])(this, Documents);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
  }

  (0, _createClass2["default"])(Documents, [{
    key: "create",
    value: function create(document) {
      return this._apiCall.post(this._endpointPath(), document);
    }
  }, {
    key: "upsert",
    value: function upsert(document) {
      return this._apiCall.post(this._endpointPath(), document, {
        action: 'upsert'
      });
    }
  }, {
    key: "update",
    value: function update(document) {
      return this._apiCall.post(this._endpointPath(), document, {
        action: 'update'
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      var queryParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._apiCall["delete"](this._endpointPath(), queryParameters);
    }
  }, {
    key: "createMany",
    value: function () {
      var _createMany = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(documents) {
        var options,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

                this._apiCall.logger.warn('createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents');

                return _context.abrupt("return", this["import"](documents, options));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMany(_x) {
        return _createMany.apply(this, arguments);
      }

      return createMany;
    }()
    /**
     * Import a set of documents in a batch.
     * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
     * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
     */

  }, {
    key: "import",
    value: function () {
      var _import2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(documents) {
        var options,
            documentsInJSONLFormat,
            resultsInJSONLFormat,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

                if (Array.isArray(documents)) {
                  documentsInJSONLFormat = documents.map(function (document) {
                    return JSON.stringify(document);
                  }).join('\n');
                } else {
                  documentsInJSONLFormat = documents;
                }

                _context2.next = 4;
                return this._apiCall.performRequest('post', this._endpointPath('import'), {
                  queryParameters: options,
                  bodyParameters: documentsInJSONLFormat,
                  additionalHeaders: {
                    'Content-Type': 'text/plain'
                  }
                });

              case 4:
                resultsInJSONLFormat = _context2.sent;

                if (!Array.isArray(documents)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", resultsInJSONLFormat.split('\n').map(function (r) {
                  return JSON.parse(r);
                }));

              case 9:
                return _context2.abrupt("return", resultsInJSONLFormat);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _import(_x2) {
        return _import2.apply(this, arguments);
      }

      return _import;
    }()
  }, {
    key: "export",
    value: function _export() {
      return this._apiCall.get(this._endpointPath('export'));
    }
  }, {
    key: "search",
    value: function search(searchParameters) {
      return this._apiCall.get(this._endpointPath('search'), searchParameters);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections["default"].RESOURCEPATH, "/").concat(this._collectionName).concat(Documents.RESOURCEPATH).concat(operation === undefined ? '' : '/' + operation);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Documents;
}();

exports["default"] = Documents;

},{"./Collections":56,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/regenerator":16}],61:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTTPError = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(HTTPError, _TypesenseError);

  var _super = _createSuper(HTTPError);

  function HTTPError() {
    (0, _classCallCheck2["default"])(this, HTTPError);
    return _super.apply(this, arguments);
  }

  return HTTPError;
}(_TypesenseError2["default"]);

exports["default"] = HTTPError;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}],69:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TypesenseError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(TypesenseError, _Error);

  var _super = _createSuper(TypesenseError);

  function TypesenseError() {
    (0, _classCallCheck2["default"])(this, TypesenseError);
    return _super.apply(this, arguments);
  }

  return TypesenseError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports["default"] = TypesenseError;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12,"@babel/runtime/helpers/wrapNativeSuper":15}],62:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MissingConfigurationError = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(MissingConfigurationError, _TypesenseError);

  var _super = _createSuper(MissingConfigurationError);

  function MissingConfigurationError() {
    (0, _classCallCheck2["default"])(this, MissingConfigurationError);
    return _super.apply(this, arguments);
  }

  return MissingConfigurationError;
}(_TypesenseError2["default"]);

exports["default"] = MissingConfigurationError;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}],63:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ObjectAlreadyExists = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(ObjectAlreadyExists, _TypesenseError);

  var _super = _createSuper(ObjectAlreadyExists);

  function ObjectAlreadyExists() {
    (0, _classCallCheck2["default"])(this, ObjectAlreadyExists);
    return _super.apply(this, arguments);
  }

  return ObjectAlreadyExists;
}(_TypesenseError2["default"]);

exports["default"] = ObjectAlreadyExists;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}],64:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ObjectNotFound = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(ObjectNotFound, _TypesenseError);

  var _super = _createSuper(ObjectNotFound);

  function ObjectNotFound() {
    (0, _classCallCheck2["default"])(this, ObjectNotFound);
    return _super.apply(this, arguments);
  }

  return ObjectNotFound;
}(_TypesenseError2["default"]);

exports["default"] = ObjectNotFound;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}],65:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ObjectUnprocessable = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(ObjectUnprocessable, _TypesenseError);

  var _super = _createSuper(ObjectUnprocessable);

  function ObjectUnprocessable() {
    (0, _classCallCheck2["default"])(this, ObjectUnprocessable);
    return _super.apply(this, arguments);
  }

  return ObjectUnprocessable;
}(_TypesenseError2["default"]);

exports["default"] = ObjectUnprocessable;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}],66:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RequestMalformed = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(RequestMalformed, _TypesenseError);

  var _super = _createSuper(RequestMalformed);

  function RequestMalformed() {
    (0, _classCallCheck2["default"])(this, RequestMalformed);
    return _super.apply(this, arguments);
  }

  return RequestMalformed;
}(_TypesenseError2["default"]);

exports["default"] = RequestMalformed;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}],67:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RequestUnauthorized = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(RequestUnauthorized, _TypesenseError);

  var _super = _createSuper(RequestUnauthorized);

  function RequestUnauthorized() {
    (0, _classCallCheck2["default"])(this, RequestUnauthorized);
    return _super.apply(this, arguments);
  }

  return RequestUnauthorized;
}(_TypesenseError2["default"]);

exports["default"] = RequestUnauthorized;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}],68:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _TypesenseError2 = _interopRequireDefault(require("./TypesenseError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ServerError = /*#__PURE__*/function (_TypesenseError) {
  (0, _inherits2["default"])(ServerError, _TypesenseError);

  var _super = _createSuper(ServerError);

  function ServerError() {
    (0, _classCallCheck2["default"])(this, ServerError);
    return _super.apply(this, arguments);
  }

  return ServerError;
}(_TypesenseError2["default"]);

exports["default"] = ServerError;

},{"./TypesenseError":69,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":12}]},{},[50])(50)
});


;
(function ($, window, document, undefined) {

	// Default options
	var pluginName = 'aem-form-container',
		lang = $('html').prop('lang'),
		defaults = {
			doNotAllowDuplicateSubmission : '',		
		 	starfleetAuthRequired : '',
		 	aemFormPageLocale : "",
        	starfleetAuthUrl : '',
			geoCountryCode : '',
			geoStateCode : '',
			geoCountryName : '',
			geoStateName : '',
			geoCity	 :  '',
        	geoLat	 : '',
        	geoLong	 : '',
        	geoTimeZone	 : '',
        	geoRegion	 : '', 	
        	autoFormFill : '',
        	syncToMarketo : '',
        	syncToSfmc : ''
        	
		};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype.init = function () {
		this.guideBridgePreprocess();
		this.selectStyled();
		this.multiselectStyled();
		this.checkboxStyled();
		this.radioButtonStyled();
		this.btnRipple();
		this.eleblur();
		this.disablePaste();
		this.setNcidVal();

        /*if(typeof guideBridge !== 'undefined' && guideBridge != null){
            $(".optin-topics-field-name").each(function(index){
                    var optinFieldName =  $(this).attr('data-name');
                    console.log(optinFieldName);
                    if(optinFieldName !== undefined && optinFieldName !== null && optinFieldName !== ''){
                        var optinField = guideBridge.resolveNode(optinFieldName);
                        if(optinField !== undefined && optinField !== null){
                            optinField.value = $("."+ optinFieldName + ' input').data("optin-topics");
                        }		
                    }

            });
        } */

		if(typeof enableCompanySuggestions !== 'undefined' && enableCompanySuggestions){
		   this.companyAutofill();
		}
		
		this.setFormProperties();
		if (this.options.starfleetAuthRequired === 'true') {
			this.checkStarfleetLogin('');
		}
		else{
			setTimeout(function(){
				/* below commented code moved to '/etc/designs/nvidiaGDC/clientlibs_base_lite/js/modalPopup.js'
				 * as it's making cross domain issue AD-2317
				
				var spinner = $(window.parent.document).find('.nv-spinner-container');
				if(spinner && spinner != null) {
					$(spinner).remove();
				}*/
				$('.aemformcontainer').removeClass('hide');
			}, 800);
			
		}	
		
		if (this.options.autoFormFill === 'true' && this.options.syncToMarketo === 'true') {
			this.autoFormFill();
		}
		
		//this.btnSubmit();	
		var doNotAllowDuplicate = this.options.doNotAllowDuplicateSubmission;
		guideBridge.on("elementValueChanged", function(e, focuspayload){		
            var component = focuspayload.target;
            if(component.jsonModel.name === "userEmail") {
			  //console.log('doNotAllowDuplicateSubmission', doNotAllowDuplicate);
              if(doNotAllowDuplicate === "true") {
                $.ajax({
                  "url" : NVIDIAGDC.apps.endpoint + "/aem-forms-api/api/v1/submitdata/check/email?form-name="+NVIDIAGDC.AdaptiveForm.formName+"&email="+encodeURIComponent(guideBridge.resolveNode('userEmail').value),
                  "async": false,
                  "crossDomain": true,
                  "success" : function(response) {     
                    if(response.userExist){
                      guideBridge.resolveNode('userEmail').isValidEmail = false;
                      guideBridge.validate([],'userEmail', true);
                    }
                  },
                  "error" : function(err) {   
                      console.error(err);      
                  }
                });      
              }	
        	}
          }); 
	};

	//Custom Styled Checkbox
	Plugin.prototype.checkboxStyled = function () {
		$('.guideFieldWidget input[type="checkbox"]').each(function () {
			//$(this).wrap('<label class="checkbox-container"></label>');
			if ($(this).next('span.optin-sentence').length) {
				$(this).next('span.optin-sentence').andSelf().wrapAll('<label class="checkbox-container"></label>');
				$(this).after('<span class="checkmark optin-check-box"></span>');
			} else {
				$(this).wrap('<label class="checkbox-container"></label>');
				$(this).after('<span class="checkmark optin-check-box"></span>');
			}
		});		
	}
	
	// Custom Styled RadioButton
	Plugin.prototype.radioButtonStyled = function () {
        $('.guideFieldWidget input[type="radio"]').each(function () {
			$(this).wrap('<label class="checkbox-container"></label>');
			$(this).after('<span class="checkmark"></span>');
        });
    }

	// Custom Styled Mutli Select 
	Plugin.prototype.multiselectStyled = function () {
        $('.dropDownList.listBoxWidget').each(function() {
			var $this = $(this),
            labelDiv = $this.siblings('.guideFieldLabel'),
            labelTxt = $(labelDiv).find('label'),
            optionsList = $this.find('ol'),
            optionItem = $(optionsList).children('li');

            $(labelDiv).addClass('multiDiv').attr('tabindex', '0');
            $(labelDiv).find('label').addClass('multiSelectDropdown');
            $(labelDiv).prepend('<label class="label-title">'+$(labelTxt).text()+'</label>');
            $(optionsList).addClass('options');

			var keepFocus = false;
            function hideList(){
                if(!keepFocus){
                    $(labelDiv).removeClass('active');
                	$(optionsList).hide();
                    $('#page-content').removeClass('ovrflow');
                }
            }

            $(labelDiv).on('click keydown', function(e) {
				e.stopPropagation();
                if(e.keyCode == 32 || e.type === 'click') {
                    e.preventDefault();
                    $(labelDiv).toggleClass('active');
                	$(optionsList).toggle();
					$(optionsList).children('li:first-child').focus();
                    $('#page-content').toggleClass('ovrflow');
                }
            }).blur( () => {
			 	keepFocus = false;
                window.setTimeout(hideList, 50);
            }).focus( () => {
                keepFocus = true;   
            });

			$(optionItem).on('keydown click', function(e) {
                //e.stopPropagation();
                var keyC = e.keyCode,
                    isClick = e.type === 'click' ? true : false;
                if (keyC == 32 || isClick) {
                    $(this).toggleClass('option-selected');
                    var isSelected = $(this).hasClass('option-selected');
                    setMultiText($(this).text(), isSelected);
                }
            }).blur( () => {
				keepFocus = false;
                window.setTimeout(hideList, 50);
            }).focus( () => {
                keepFocus = true;
    		});

			var $selectedItems = [];
            function setMultiText(selectedOption, isSelected) {
                if(isSelected) {
                     if ($.inArray(selectedOption, $selectedItems) == -1) {
                		$selectedItems.push(selectedOption);
    					$(labelTxt).text($selectedItems.join(', '));
                        $(labelDiv).attr('title', $selectedItems.join(', '));
                     }
                } else {
                    if ($.inArray(selectedOption, $selectedItems) !== -1) {
                        $selectedItems.splice($.inArray(selectedOption, $selectedItems), 1);
                        $(labelTxt).text($selectedItems.join(', '));
                        $(labelDiv).attr('title', $selectedItems.join(', '));
                    }
                }
            }
        });

       /* $('.dropDownList.listBoxWidget').parents('.guidefield').each(function(){
			$(this).before('<div class="multiselect"></div>');
        });
        $('.multiselect').each(function(){
            var $this = $(this);
            console.log($this);
			$this.prepend('<div class="styledMultiselect" tabindex="0"></div>');
			var $stylemultiselect = $('div.styledMultiselect');
            //$this.parent().siblings('.guideFieldLabel').find('label').css('z-index', '99');
            $this.find($stylemultiselect).append('<div id="multiselectlabel" title=""></div>');
            $this.find($stylemultiselect).click(function (e) {
                e.stopPropagation();
                $('div.styledMultiselect.active').not(this).each(function () {
                    $(this).removeClass('active');
                    $this.next().find('ol').hide();
                });
                $(this).toggleClass('active');
                $this.next().find('ol').toggle();
			});

			$('.multiselect').next().find('ol').addClass('options');
            //$('.multiselect ol li:first-child').attr('tabindex', '-1');
			$('.multiselect').next().find('ol').hide();

		var $listItems = $this.next().find('ol.options').children('li');
		var $selectedItems = [];
		//$this.find('#multiselectlabel').append('<label>' + $listItems.parent().attr('placeholder') + '</label>');
            $listItems.click(function (e) {
                e.stopPropagation();
                if ($(this).hasClass('item-selected')) {
                    if ($.inArray($(this).text(), $selectedItems) == -1) {
                        //$(this).toggleClass('multicheck');
                        $selectedItems.push($(this).text());
                        $this.find('#multiselectlabel').text($selectedItems.join(', '));
                        $this.find('#multiselectlabel').attr('title', $selectedItems.join(', '));
                        //$this.find('#multiselectlabel').append('<label>' + $(this).parent().attr('placeholder') + '</label>');
                    }
                } else {
                    if ($.inArray($(this).text(), $selectedItems) !== -1) {
                        //$(this).toggleClass('multicheck');
                        $selectedItems.splice($.inArray($(this).text(), $selectedItems), 1);
                        $this.find('#multiselectlabel').text($selectedItems.join(', '));
                        $this.find('#multiselectlabel').attr('title', $selectedItems.join(', '));
                        //$this.find('#multiselectlabel').append('<label>' + $(this).parent().attr('placeholder') + '</label>');
                    }
                }
                if ($selectedItems === undefined || $selectedItems.length == 0) {				
                    $this.find($stylemultiselect).removeClass('select-field-filled');
    
                } else {
                    $this.find($stylemultiselect).addClass('select-field-filled');
                }
            });



        });

        $(document).click(function () {
			$('div.styledMultiselect').removeClass('active');
			$('.multiselect ol').hide();
		});

		$('div.styledMultiselect').on( "focus", function (e) {
               console.log('focus function');
              e.preventDefault();
				e.stopPropagation();
            $(this).keydown(function(e){
            e.preventDefault();
            if(e.which=="32") {
            console.log(e.which);
                console.log($(this));
                $(this).toggleClass('active');
                $(this).next().toggle();
            }

            });	
         });*/
	}

	Plugin.prototype.eleblur = function () {
		$('input, select, textarea').focus(function () {
            if ( $(this).is('[readonly]') ) {
                $(this).attr('tabindex','-1');
               this.blur();
            } 
		});
	}

	// Custom Styled Select Dropdown
	Plugin.prototype.selectStyled = function () {

		var event;
        if (typeof (Event) === 'function') {
            event = new Event('change');
        } else {
            event = document.createEvent('Event');
            event.initEvent('change', true, true);
        }

        $('.guideFieldWidget select').each(function () {    
            $(this).selectmenu({
                appendTo: $(this).parent(),
                open: function( event, ui ) {
                    $('#page-content').css("overflow-x", "initial");
                },
                close: function( event, ui ) {
                    $('#page-content').css("overflow-x", "hidden");
                }
            });
            $(this).next().attr('tabindex', '0');
        });

        // Dropdown onchange 
        $('.guideFieldWidget select').selectmenu({
            change: function (e, ui) {
                $(this).get(0).dispatchEvent(event);
                $(this).selectmenu('refresh');    
            }
        });
		
		// if form opens in modal destroying the select fields and re-setting
        $(document).on('cbox_complete', function() {
            if($('.aemformcontainer').parents('.modal-content').is(":visible")) {

                $('.guideFieldWidget select').each(function () {
	
                    var selectmenuDefaultHeight = 300;
					var modalHeight= $(this).parents('.modal-content').height();
    				var selectEle = $(this).siblings('.ui-selectmenu-button');
                    var selectEleBottomPos = ($(selectEle).offset().top - $("#cboxLoadedContent").offset().top) + $(selectEle).height();

                    var selectEleBottomHeight = modalHeight - selectEleBottomPos;                 
                    
                    $(this).selectmenu("destroy").selectmenu({
                        appendTo : $(this).parent(),                       
                        change : function (e, ui) {
                            $(this).get(0).dispatchEvent(event);
                            $(this).selectmenu('refresh');    
                        }
                    }).selectmenu('refresh');
					if(selectEleBottomHeight < selectmenuDefaultHeight) {
						$(this).siblings('.ui-selectmenu-menu').find('ul.ui-menu.ui-widget').css('max-height', selectEleBottomHeight);
                    }
                    $(this).next().attr('tabindex', '0');    
    
                });
				// setting multiselect dropdown height
				$('.dropDownList.listBoxWidget').each(function() {
					var multiSelectDefaultHeight = 300;
					var modalHt= $(this).parents('.modal-content').height();
                    var multiSelectEle = $(this).siblings('.guideFieldLabel');
                    var multiSelectEleBottomPos = ($(multiSelectEle).offset().top - $("#cboxLoadedContent").offset().top) + 52;// 52 is field height;
                    var multiSelectEleBottomHeight = modalHt - multiSelectEleBottomPos; 
					if(multiSelectEleBottomHeight < multiSelectDefaultHeight) {
						$(this).find('ol').css('max-height', multiSelectEleBottomHeight);
                    }
                });
            }
         });

		//select field autofill
        $('.guideFieldWidget select').on("change", function() {	
			//$(this).get(0).dispatchEvent(event);
            $(this).selectmenu('refresh');
    	});
    	
    	$('.prefill-login-clear').on("click", function(e) {	
			e.preventDefault();
            //console.log('.prefill-login-clear clicked');
            
            guideBridge.reset();
            $('select').selectmenu('refresh');
            if(NVIDIAGDC !== undefined){
				NVIDIAGDC.AdaptiveForm.userLoggedIn = 'false';
				NVIDIAGDC.AdaptiveForm.userLoggedInData = undefined;
				NVIDIAGDC.AdaptiveForm.formPreFilled = 'false';
			}
			$('.userEmail input').attr('disabled', false);
			$('.prefill-message.logged-in').hide();
			
			var lastLogin = window.localStorage.getItem('lastLoginData');			
			if (lastLogin !== undefined && lastLogin !== null && lastLogin !== "") {
				window.localStorage.removeItem(lastLogin);
			}
				
    	});
    	
    	$('.prefill-remember-me-clear').on("click", function(e) {	
			e.preventDefault();            
            guideBridge.reset();
            $('select').selectmenu('refresh');
			$('.prefill-message.remember-me').hide();  
			//console.log('.prefill-remember-me-clear clicked');          
    	});
		
		$('.guideFieldWidget input[type="text"]').keydown(function (e) {
			if (e.which == "13") {
				//guideBridge.submit(); AD-1134
			}
		});

		// PreferredLanguage default selection by page html lang attribute
		//$(document).ready(function () {
			var selectTag = $('.preferredLanguage').find('.guideFieldWidget select');
			$('.preferredLanguage').find('.guideFieldWidget select option').filter(function () {
				if(window.frameElement !== null) {
					return $(this).val() === window.parent.$('html').attr('lang');
				}else {
					return $(this).val() === lang;
				}
			}).prop('selected', true);
			if ($(selectTag).get(0) !== undefined) {
				if ($(selectTag).val() == '') {
					$('.preferredLanguage').find('.guideFieldWidget select option[value="en-us"]').prop('selected', true);
					$(selectTag).get(0).dispatchEvent(event);
					$(selectTag).selectmenu('refresh');
				} else {
					$(selectTag).get(0).dispatchEvent(event);
					$(selectTag).selectmenu('refresh');
				}
			}
	}
	
	
	Plugin.prototype.companyAutofill = function () {
	
	    var client = new Typesense.Client({
	        'nodes': [{
	            'host': 'typesense.svc.nvidia.com',
	            'port': '443',
	            'protocol': 'https',
	        }],
	        'apiKey': 'vYjb1FBJmwOeRq5zt6mrQCEvPYVa6YaO',
	        'connectionTimeoutSeconds': 2
	    });
	
	     var selectedCompany = autocomplete('.company input', { hint: false, minLength: 2 }, [
	        {
	            source: function(query, callback) {
	                let searchParameters = {
	                    'q'         : query,
	                    'query_by'  : 'name,aliases',
	                    'per_page'  : 8,
	                    'num_typos' : 1
	                };

	                client.collections('companies').documents().search(searchParameters).then(function(answer) {
	                    callback(answer.hits);
	                }, function() {
	                    callback([]);
	                });
	            },
	            displayKey: 'name',
	            templates: {
	                suggestion: function(suggestion) {
	                    return suggestion.document.name;
	                }
	            }
	        }
	    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
			
	        guideBridge.resolveNode('company').value = suggestion.document.name;
	        selectedCompany.autocomplete.setVal(suggestion.document.name);
	
	    });	
	}
	
	
	Plugin.prototype.setFormProperties = function () {
		var formRedirectActionField = $('#\\:redirect');
		var formPath = "";
		var pathSplit = "";
		var formName = "";
		var formLocation = "";
		if(formRedirectActionField !== null && formRedirectActionField !== "undefined") {
			formPath = formRedirectActionField.val().replace('/jcr:content/guideContainer.guideThankYouPage.html', '');
			pathSplit = formPath.split('/');
			formName = pathSplit[pathSplit.length - 1];
			formLocation = formPath.replace(formName, '');
		}
		if(NVIDIAGDC !== undefined){
			NVIDIAGDC.addProperty("AdaptiveForm", "formName", formName);
			NVIDIAGDC.addProperty("AdaptiveForm", "formPath", formLocation);	
			NVIDIAGDC.addProperty("AdaptiveForm", "starfleetAuthRequired", this.options.starfleetAuthRequired);	
			NVIDIAGDC.addProperty("AdaptiveForm", "starfleetAuthUrl", this.options.starfleetAuthUrl);	
			NVIDIAGDC.addProperty("AdaptiveForm", "syncToSfdc", this.options.syncToSfdc);
			NVIDIAGDC.addProperty("AdaptiveForm", "syncToMarketo", this.options.syncToMarketo);
			NVIDIAGDC.addProperty("AdaptiveForm", "syncToSfmc", this.options.syncToSfmc);
            NVIDIAGDC.addProperty("AdaptiveForm", "autoFormFill", 'false');
			//NVIDIAGDC.addProperty("AdaptiveForm", "autoFormFill", this.options.autoFormFill);	
			NVIDIAGDC.addProperty("AdaptiveForm", "geoCountryCode", this.options.geoCountryCode);
			NVIDIAGDC.addProperty("AdaptiveForm", "geoStateCode", this.options.geoStateCode);
			NVIDIAGDC.addProperty("AdaptiveForm", "geoCountryName", this.options.geoCountryName);
			NVIDIAGDC.addProperty("AdaptiveForm", "geoStateName", this.options.geoStateName);		
			NVIDIAGDC.addProperty("AdaptiveForm", "geoCity", this.options.geoCity);	
			NVIDIAGDC.addProperty("AdaptiveForm", "geoLat", this.options.geoLat);	
			NVIDIAGDC.addProperty("AdaptiveForm", "geoLong", this.options.geoLong);	
			NVIDIAGDC.addProperty("AdaptiveForm", "geoTimeZone", this.options.geoTimeZone);	
			NVIDIAGDC.addProperty("AdaptiveForm", "geoRegion", this.options.geoRegion);
			NVIDIAGDC.addProperty("AdaptiveForm", "pageLocale", this.options.aemFormPageLocale);
			NVIDIAGDC.addProperty("AdaptiveForm", "doNotAllowDuplicateSubmission", this.options.doNotAllowDuplicateSubmission);	
		}
	}
	
	Plugin.prototype.setNcidVal = function () {
		$(document).ready(function () {
			if ($('.ncid-hidden-field').length > 0 && guideBridge.resolveNode('ncid') !== null) {
				var ncidVal = getParameterByName('ncid');
				if (ncidVal !== '') {
					//console.log('not null');
					guideBridge.resolveNode('ncid').value = ncidVal;
				} else {
					guideBridge.resolveNode('ncid').value = '';
				}
			}

			if ($('.nvid-hidden-field').length > 0 && guideBridge.resolveNode('nvid') !== null) {
				var nvidVal = getParameterByName('nvid');
				if (nvidVal !== '') {				
					guideBridge.resolveNode('nvid').value = nvidVal;
				} else {
					guideBridge.resolveNode('nvid').value = '';
				}
			} 
		});

		function getParameterByName(name) {
			var name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if (results == null) {
				return "";
			} else {
				return decodeURIComponent(results[1].replace(/\+/g, " "));
			}
		}
	}

	

	// Disable Paste on Confirm Email Field
	Plugin.prototype.disablePaste = function () {
		$(document).on("cut copy paste", ".confirmEmail input", function (e) {
			e.preventDefault();
		});
	}
	
	Plugin.prototype.guideBridgePreprocess = function () {
		guideBridge.connect(function (){
			   //this callback will be called after adaptive form is initialized
			  // console.log("Adaptive form Initated");
			});
	}
	
	Plugin.prototype.getLoggedInUserData = function(){
		var lastLogin = window.localStorage.getItem('lastLoginData');			
		if (lastLogin !== undefined && lastLogin !== null && lastLogin !== "") {
			var userProfile = window.localStorage.getItem(lastLogin);
			if (userProfile !== undefined && userProfile !== null && userProfile !== "") {	
				return JSON.parse(userProfile);
			}
		} 
		return null;
	}
	
	Plugin.prototype.autoFormFill = function(){
		
		userProfileData = this.getLoggedInUserData();		
		if(userProfileData !== null){

			if(new Date() <= new Date(userProfileData.expiration)){
				if(NVIDIAGDC !== undefined){
					NVIDIAGDC.addProperty("AdaptiveForm", "userLoggedIn", 'true');
				}
				$.ajax({
					type: "GET",
					url: NVIDIAGDC.apps.endpoint + '/services/eupservice/v1/user/getProfile',
					crossDomain: true,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'idToken': userProfileData['id_token']
					},
					success: function(data) {
						
						if (data.userEmail !== undefined) {
							
							$('.prefill-message.logged-in').css("display", "block");
							
							if(NVIDIAGDC !== undefined){
                                NVIDIAGDC.addProperty("AdaptiveForm", "userLoggedInData", data);
                        	}
							
							//Set email;
							if(guideBridge.resolveNode("userEmail") !== undefined && guideBridge.resolveNode("userEmail") !== null){
								guideBridge.resolveNode("userEmail").value = data.userEmail;
								$('.userEmail input').attr('disabled', '');
							}
							
							//Set all other fields
							if(guideBridge.resolveNode("firstName") !== undefined && guideBridge.resolveNode("firstName") !== null
										&& data.firstName !== undefined && data.firstName !== null){
								guideBridge.resolveNode("firstName").value = data.firstName;
							}
							
							if(guideBridge.resolveNode("lastName") !== undefined && guideBridge.resolveNode("lastName") !== null
										&& data.lastName !== undefined && data.lastName !== null){
								guideBridge.resolveNode("lastName").value = data.lastName ;
							}
							
							if(guideBridge.resolveNode("country") !== undefined && guideBridge.resolveNode("country") !== null
										&& data.country !== undefined && data.country !== null){
								//Set country mapping
								var countryName =  formIsoToCountryMap[data.country];
								if(NVIDIAGDC !== undefined){
	                                	NVIDIAGDC.addProperty("AdaptiveForm", "countrySelected", countryName);
	                        	}
								if(countryName !== null && $(".country option[value='"+ countryName + "']").length > 0){
									guideBridge.resolveNode("country").value = countryName ;
								} 								
							}
							
							if(guideBridge.resolveNode("preferredLanguage") !== undefined && guideBridge.resolveNode("preferredLanguage") !== null
										&& data.locale !== undefined && data.locale !== null){
								var locale = data.locale.replace('_', '-').toLowerCase();
								if(NVIDIAGDC !== undefined){
	                                	NVIDIAGDC.addProperty("AdaptiveForm", "preferredLanguageSelected", locale);
	                        	}
								if($(".preferredLanguage option[value='"+ locale + "']").length > 0){
									guideBridge.resolveNode("preferredLanguage").value = locale;
								}
							}
							
							if(guideBridge.resolveNode("company") !== undefined && guideBridge.resolveNode("company") !== null
										&& data.userOrg !== undefined && data.userOrg !== null && data.userOrg.length > 0 && data.userOrg[0].organization !== undefined && data.userOrg[0].organization !== null){
								guideBridge.resolveNode("company").value = data.userOrg[0].organization;
							}
							
							if(guideBridge.resolveNode("industry") !== undefined && guideBridge.resolveNode("industry") !== null
										&& data.userOrg !== undefined && data.userOrg !== null && data.userOrg.length > 0 && data.userOrg[0].industry !== undefined && data.userOrg[0].industry !== null){
								if(NVIDIAGDC !== undefined){
	                                	NVIDIAGDC.addProperty("AdaptiveForm", "industrySelected", data.userOrg[0].industry.machineName);
	                        	}
								if($(".industry option[value='"+ data.userOrg[0].industry.machineName + "']").length > 0){
									guideBridge.resolveNode("industry").value = data.userOrg[0].industry.machineName;								
                        		}
							}
							
							if(guideBridge.resolveNode("jobTitle") !== undefined && guideBridge.resolveNode("jobTitle") !== null
										&& data.userOrg !== undefined && data.userOrg !== null && data.userOrg.length > 0 && data.userOrg[0].jobRole !== undefined && data.userOrg[0].jobRole !== null){
								if(NVIDIAGDC !== undefined){
	                                	NVIDIAGDC.addProperty("AdaptiveForm", "jobTitleSelected", data.userOrg[0].jobRole.machineName);
	                        	}
								if($(".jobTitle option[value='"+ data.userOrg[0].jobRole.machineName + "']").length > 0){
									guideBridge.resolveNode("jobTitle").value = data.userOrg[0].jobRole.machineName;
									
                        		}
							}
							
							if(guideBridge.resolveNode("jobRole") !== undefined && guideBridge.resolveNode("jobRole") !== null
										&& data.userOrg !== undefined && data.userOrg !== null && data.userOrg.length > 0 && data.userOrg[0].jobTitle !== undefined && data.userOrg[0].jobTitle !== null){
								if(NVIDIAGDC !== undefined){
	                               	NVIDIAGDC.addProperty("AdaptiveForm", "jobRoleSelected", data.userOrg[0].jobTitle.machineName);
	                        	}
								if($(".jobRole option[value='"+ data.userOrg[0].jobTitle.machineName + "']").length > 0){
									guideBridge.resolveNode("jobRole").value = data.userOrg[0].jobTitle.machineName;
                        		}
							}
								
							if(guideBridge.resolveNode("Job_Role__c") !== undefined && guideBridge.resolveNode("Job_Role__c") !== null
										&& data.userOrg !== undefined && data.userOrg !== null && data.userOrg.length > 0 && data.userOrg[0].jobTitle !== undefined && data.userOrg[0].jobTitle !== null){
								if(NVIDIAGDC !== undefined){
	                                NVIDIAGDC.addProperty("AdaptiveForm", "jobRoleSelected", data.userOrg[0].jobTitle.machineName);
	                        	}
								if($(".Job_Role__c option[value='"+ data.userOrg[0].jobTitle.machineName + "']").length > 0){
									guideBridge.resolveNode("Job_Role__c").value = data.userOrg[0].jobTitle.machineName;
                        		}
							}

							$('select').selectmenu('refresh');
							
							if(NVIDIAGDC !== undefined){
                                NVIDIAGDC.addProperty("AdaptiveForm", "formPreFilled", 'true');
                            }
						}
					},
					error: function(data) {
						console.log("Error when getting user profile");
						console.log(data);
					}
				});
			}
		}		

	}
	
	
	Plugin.prototype.changeSelected = function($select, value)  {
	  const $options = Array.from($select.options);
	  const optionToSelect = $options.find(item => item.text === value);
	  optionToSelect.selected = true;
	};
	

	Plugin.prototype.setFirstPartyCookies = function(userProfileData) {
					var cookieDomain = '.nvidia.com';
				if (window.location.hostname.indexOf('nvidia.cn') > -1) {
					cookieDomain = '.nvidia.cn';
				} else if (window.location.hostname.indexOf('.nvidia.') === -1) {
					cookieDomain = window.location.hostname;
				}	
				
				if(userProfileData['idp_id'] !== "undefined"){
					Cookies.set('idp_id', userProfileData['idp_id'], { expires: 1095, domain: cookieDomain });
				}
				
				if(userProfileData['id_token'] !== "undefined"){
					//create startfleet token
					if(Cookies.get('nvweb_S') !== "undefined" || Cookies.get('nvweb_S') !== null){
						$.ajax({
							type: "GET",
							url: NVIDIAGDC.apps.endpoint + '/services/ets/v1/generate/starfleet/token',
							crossDomain: true,
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json',
								'idToken': userProfileData['id_token']
							},
							success: function(data) {
								if (data.token !== 'undefined') {
									Cookies.set('nvweb_S', data.token, { expires: 1095, domain: cookieDomain });
								}
							},
							error: function(data) {
								console.log("Error when calling starfleet token service");
								console.log(data);
							}
						});
					}
				
					if(Cookies.get('nvweb_E') !== "undefined" || Cookies.get('nvweb_E') !== null){
							//create email token
						$.ajax({
							type: "GET",
							url: NVIDIAGDC.apps.endpoint + '/services/ets/v1/generate/email/token?email=' + encodeURIComponent(this.aemFormloggedInuserEmail),
							crossDomain: true,
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							success: function(data) {
								if (data.token !== 'undefined') {
									Cookies.set('nvweb_E', data.token, { expires: 1095, domain: cookieDomain });
								}
							},
							error: function(data) {
								console.log("Error when calling email token service");
								console.log(data);
							}
						});
					}						
						
				}
	}

	Plugin.prototype.checkStarfleetLogin = function (formModalId) {		
		var queryString = "";
		if (formModalId !== undefined && formModalId != "") {
			if (window.location.search == '') {
				queryString = "?formModalId=" + formModalId;
			} else {
				queryString = "&formModalId=" + formModalId;
			}
		}
		var loginRedirectUrl = this.options.starfleetAuthUrl + '&ui_locales=' + guideBridge._readRuntimeLocale() + '&redirect_uri=' + encodeURIComponent(window.location.href.split('/').slice(0, 3).join('/') + window.location.pathname + window.location.search + queryString);
		
		console.log(loginRedirectUrl);	
		
		var userProfileData = this.getLoggedInUserData();
		
		if(userProfileData === null){
			window.location = loginRedirectUrl;
		}  else {			
			if(new Date() > new Date(userProfileData.expiration)){
				window.location = loginRedirectUrl;
			} else {
				var userProfile = this.parseJwtPayload(userProfileData.id_token)				
				this.aemFormloggedInuserEmail = userProfile.email;
				//console.log(this.aemFormloggedInuserEmail);
				if (this.aemFormloggedInuserEmail) {
					guideBridge.resolveNode("userEmail").value = this.aemFormloggedInuserEmail;
					$('.userEmail input').attr('disabled', '');
				}
				if(NVIDIAGDC !== undefined && userProfile){
					NVIDIAGDC.addProperty("AdaptiveForm", "userProfile", userProfile);	
				}	
				
				this.setFirstPartyCookies(userProfileData);
				$('.aemformcontainer').removeClass('hide');
			}
		}
	}

	Plugin.prototype.getJarvisCookieForAemForm = function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	
	Plugin.prototype.parseJwtPayload = function (token) {
	    var base64Url = token.split('.')[1];
	    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));
	    return JSON.parse(jsonPayload);
	}

	// Button ripple effect
	Plugin.prototype.btnRipple = function () {
		$('.guideFieldButtonWidget button').each(function () {
			$(this).addClass('nvRipple');
			var rippleElements = $(".nvRipple");
			$(this).click(function (e) {
				var X = e.pageX - this.offsetLeft;
				var Y = e.pageY - this.offsetTop - 115;
				var $rippleDiv = $(document.createElement('div'));
				$rippleDiv.addClass('ripple');
				$rippleDiv.attr('style', 'top:' + Y + 'px; left:' + X + 'px;');
				$(this).append($rippleDiv);
				setTimeout(function () {
					$rippleDiv.remove();
				}, 1010);
			});
		});
	}

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		setTimeout(function () {
			return $(this).each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName,
						new Plugin(this, options));
				}
			});
		}, 0.005);
	}
})(jQuery, window, document);
function FormsSubmitPlugin() { }

FormsSubmitPlugin.prototype.handlePreFormSubmit = function ($) {
    //console.log("handlePreFormSubmit called");
 	var consumerOptInsField = window.guideBridge.resolveNode('consumerOptIns');
    setOptinFieldValue( $('.marketo-hidden-optin-consumer'), consumerOptInsField );

	var developerOptInsField = window.guideBridge.resolveNode('developerOptIns');
    setOptinFieldValue( $('.marketo-hidden-optin-developer'), developerOptInsField );

	var enterpriseOptInsField = window.guideBridge.resolveNode('enterpriseOptIns');
	setOptinFieldValue( $('.marketo-hidden-optin-enterprise'), enterpriseOptInsField );

	var globalOptInsField = window.guideBridge.resolveNode('globalOptIns');
	setOptinFieldValue( $('.marketo-hidden-optin-global'), globalOptInsField );

	var inceptionOptInsField = window.guideBridge.resolveNode('inceptionOptIns');
	setOptinFieldValue( $('.marketo-hidden-optin-inception'), inceptionOptInsField );


    function setOptinFieldValue( $optinField, optinFieldType ) {
        if ( $optinField.length > 0 && optinFieldType !== null ) {
			if ($optinField[0].type === 'checkbox') {
                if ($optinField.hasClass('optin-check')) {
                    if (optinFieldType.value !== null && optinFieldType.value.indexOf('::') > -1) {
                        let optinSplit = optinFieldType.value.split('::');
                        optinFieldType.value = optinSplit[0] + '::' + $optinField.attr('data-optin-sentence');
                    } else {
                        optinFieldType.value = optinFieldType.value + '::' + $optinField.attr('data-optin-sentence');
                    }
                } else {
                    optinFieldType.value = $optinField.attr('data-optins') + "::" + $optinField.prop("checked");
                }
            } else {
                if ($optinField.hasClass('optin-check')) {
                    if (optinFieldType.value !== null && optinFieldType.value.indexOf('::') > -1) {
                        let optinSplit = optinFieldType.value.split('::');
                        optinFieldType.value = optinSplit[0] + '::' + $optinField.attr('data-optin-sentence');
                    } else {
                        optinFieldType.value = optinFieldType.value + '::' + $optinField.attr('data-optin-sentence');
                    }
                } else {
                    optinFieldType.value = $optinField.attr('data-optins');
                }
            }
            //console.log("optinValue : " +  optinFieldType.value); 
        }
    }

    var preSubmitResponse = {};
    var preSubmitSuccess = true;
    if (typeof aemFormPreSubmitSteps !== 'undefined' && $.isArray(aemFormPreSubmitSteps)) {
        var stepReturnValues = [];
        aemFormPreSubmitSteps.forEach(function (preSubmitStep) {
            var preSubmitStepReturnValue;
            if (typeof preSubmitStep === 'function') {
                try {
                    preSubmitStepReturnValue = preSubmitStep.apply(this);
                } catch (exception) {
                    console.log("Exception during presubmit step function, " + exception.message);
                    console.log(exception);
                    preSubmitStepReturnValue = { "success": false, "message": "Exception during presubmit step call, " + exception.message, "exception": exception };
                }
                if (preSubmitStepReturnValue !== undefined && preSubmitStepReturnValue !== null) {
                    if (preSubmitStepReturnValue.success === undefined) {
                        preSubmitStepReturnValue.success = false;
                    }
                    if (preSubmitSuccess) {
                        preSubmitSuccess = preSubmitStepReturnValue.success;
                    }
                }
                stepReturnValues.push(preSubmitStepReturnValue);
            }
        });
        
        preSubmitResponse.stepReturnValues = stepReturnValues;
    }
    preSubmitResponse.preSubmitSuccess = preSubmitSuccess;
    return preSubmitResponse;
}

//

FormsSubmitPlugin.prototype.handleFormSubmit = function () {
    //console.log('FormsSubmitPlugin : handleFormSubmit called... ');
    if (NVIDIAGDC.AdaptiveForm.starfleetAuthRequired === 'true' || NVIDIAGDC.AdaptiveForm.userLoggedIn === 'true') {
    	new FormsSubmitPlugin().handleStarfleetToken();
    }
    window.guideBridge.submit({
        success: function (guideResultObject) {
            $('#form-submit-success').hide();
            $('#form-submit-error').hide();
            $('.prefill-message').hide();
            $('.form-container > form').show();
            if (guideResultObject !== undefined) {
                if (guideResultObject.data.submittedToVoltron === 'true') {
                    // Analytics success event trigger
                    document.dispatchEvent(new CustomEvent("formSubmissionSuccess", { detail: { 'formName': NVIDIAGDC.AdaptiveForm.formName } }));
					
					//Handle ucp token - start	
					if(Cookies.get('nvweb_E') !== "undefined" || Cookies.get('nvweb_E') !== null){
											
						var cookieDomain = '.nvidia.com';
						if (window.location.hostname.indexOf('nvidia.cn') > -1) {
							cookieDomain = '.nvidia.cn';
						} else if (window.location.hostname.indexOf('.nvidia.') === -1) {
							cookieDomain = window.location.hostname;
						}
						
						$.ajax({
							type: "GET",
							url: NVIDIAGDC.apps.endpoint + '/services/ets/v1/generate/email/token?email=' + encodeURIComponent(guideBridge.resolveNode('userEmail').value),
							crossDomain: true,
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							success: function(data) {
								if (data.token !== 'undefined') {
									Cookies.set('nvweb_E', data.token, { expires: 1095, domain: cookieDomain });
								}
							},
							error: function(data) {
								console.log("Error when calling email token service");
								console.log(data);
							}
						});	
					}					
					//Handle ucp token - end 
					
					var enterpriseForm =  $('.marketo-hidden-optin.marketo-hidden-optin-enterprise').length > 0;
					var developerForm =  $('.marketo-hidden-optin.marketo-hidden-optin-developer').length > 0;
					var globalForm =  $('.marketo-hidden-optin.marketo-hidden-optin-global').length > 0;
					
					//Handle autoform prefill update EUP for developer or enterprise forms
					if((enterpriseForm || developerForm || globalForm) 
							&& NVIDIAGDC !== undefined && NVIDIAGDC.AdaptiveForm !== undefined 
							&& NVIDIAGDC.AdaptiveForm.userLoggedIn === 'true' 
							&& NVIDIAGDC.AdaptiveForm.formPreFilled === 'true' 
							&& NVIDIAGDC.AdaptiveForm.userLoggedInData !== undefined){
						
						//console.log("Updating UCP with new form data")						
						//console.log(NVIDIAGDC.AdaptiveForm.userLoggedInData);
						
						var userData = {};
					
						var eupGetData = NVIDIAGDC.AdaptiveForm.userLoggedInData;
						
						//Set all other fields except email
						
						if(guideBridge.resolveNode("userEmail") !== undefined && guideBridge.resolveNode("userEmail") !== null){
							userData.userEmail = guideBridge.resolveNode("userEmail").value;
						} else {
							userData.userEmail = eupGetData.userEmail;
						}
						
						if(guideBridge.resolveNode("firstName") !== undefined && guideBridge.resolveNode("firstName") !== null){
							userData.firstName = guideBridge.resolveNode("firstName").value;
						} else {
							userData.firstName =eupGetData.firstName;
						}
						
						if(guideBridge.resolveNode("lastName") !== undefined && guideBridge.resolveNode("lastName") !== null){
							userData.lastName = guideBridge.resolveNode("lastName").value;
						} else {
							userData.lastName = eupGetData.lastName;
						}
						
						if(guideBridge.resolveNode("country") !== undefined && guideBridge.resolveNode("country") !== null){
							//Set country - ISO code mapping
							var countryCode =  formCountryToIsoMap[guideBridge.resolveNode("country").value];
							if(countryCode !== undefined && countryCode !== null){
								userData.country = countryCode;
							} else {
								userData.country = 'US';
							}
						} else {
							userData.country = eupGetData.country;
						}
						
						if(guideBridge.resolveNode("preferredLanguage") !== undefined && guideBridge.resolveNode("preferredLanguage") !== null){
							var locale = guideBridge.resolveNode("preferredLanguage").value;
							userData.locale  = locale.replace('-','_');
						} else {
							userData.locale = eupGetData.locale;
						}
						
						var userOrgData = {};
					
						if(guideBridge.resolveNode("company") !== undefined && guideBridge.resolveNode("company") !== null){
						 	userOrgData.organization = guideBridge.resolveNode("company").value;
						} else if(eupGetData.userOrg !== undefined && eupGetData.userOrg !== null && eupGetData.userOrg.length > 0 && eupGetData.userOrg[0].organization !== undefined && eupGetData.userOrg[0].organization !== null){
							userOrgData.organization = eupGetData.userOrg[0].organization;
						}
						
						if(guideBridge.resolveNode("industry") !== undefined && guideBridge.resolveNode("industry") !== null){
							userOrgData.industry = guideBridge.resolveNode("industry").value;
						} else if(eupGetData.userOrg !== undefined && eupGetData.userOrg !== null && eupGetData.userOrg.length > 0 && eupGetData.userOrg[0].industry !== undefined && eupGetData.userOrg[0].industry !== null){
							userOrgData.industry = eupGetData.userOrg[0].industry.machineName;
						}
						
						if(guideBridge.resolveNode("jobTitle") !== undefined && guideBridge.resolveNode("jobTitle") !== null){
							userOrgData.jobRole = guideBridge.resolveNode("jobTitle").value;
						} else if(eupGetData.userOrg !== undefined && eupGetData.userOrg !== null && eupGetData.userOrg.length > 0 && eupGetData.userOrg[0].jobRole !== undefined && eupGetData.userOrg[0].jobRole !== null){
							userOrgData.jobRole = eupGetData.userOrg[0].jobRole.machineName;
						}
						
						if(guideBridge.resolveNode("jobRole") !== undefined && guideBridge.resolveNode("jobRole") !== null){
							userOrgData.jobTitle = guideBridge.resolveNode("jobRole").value;
						} else if(eupGetData.userOrg !== undefined && eupGetData.userOrg !== null && eupGetData.userOrg.length > 0 && eupGetData.userOrg[0].jobTitle !== undefined && eupGetData.userOrg[0].jobTitle !== null){
							userOrgData.jobTitle = eupGetData.userOrg[0].jobTitle.machineName;
						}
						
						if(guideBridge.resolveNode("Job_Role__c") !== undefined && guideBridge.resolveNode("Job_Role__c") !== null){
							userOrgData.jobTitle = guideBridge.resolveNode("Job_Role__c").value;
						} else if(eupGetData.userOrg !== undefined && eupGetData.userOrg !== null && eupGetData.userOrg.length > 0 && eupGetData.userOrg[0].jobTitle !== undefined && eupGetData.userOrg[0].jobTitle !== null){
							userOrgData.jobTitle = eupGetData.userOrg[0].jobTitle.machineName;
						}
						
						userData.userOrg = [];
						
						userData.userOrg.push(userOrgData);
						//userData.preferences = NVIDIAGDC.AdaptiveForm.userLoggedInData.preferences;
						
						userData.preferences = [];
						
						eupGetData.preferences.forEach(function(preference){
							userData.preferences.push(preference.machineName);
						});
						
						if(guideBridge.resolveNode('enterpriseOptIns') !== null){
							var optInsValue = guideBridge.resolveNode('enterpriseOptIns').value
							if(optInsValue !== undefined){							
								var optinTopics = optInsValue.split("::")[0].split(',');
								optinTopics.forEach(function(topic){
									//console.log(topic);									
									if(optinTopicsMap[topic] !== undefined){
										userData.preferences.push(optinTopicsMap[topic]);	
									}	
								});
								
							}
						}
						
						if(guideBridge.resolveNode('developerOptIns') !== null){
							var optInsValue = guideBridge.resolveNode('developerOptIns').value
							if(optInsValue !== undefined){							
								var optinTopics = optInsValue.split("::")[0].split(',');
								optinTopics.forEach(function(topic){
									//console.log(topic);									
									if(optinTopicsMap[topic] !== undefined){
										userData.preferences.push(optinTopicsMap[topic]);	
									}	
								});
								
							}
						}
								
						if(guideBridge.resolveNode('globalOptIns') !== null){
							var optInsValue = guideBridge.resolveNode('globalOptIns').value
							if(optInsValue !== undefined){							
								var optinTopics = optInsValue.split("::")[0].split(',');
								optinTopics.forEach(function(topic){
									//console.log(topic);									
									if(optinTopicsMap[topic] !== undefined){
										userData.preferences.push(optinTopicsMap[topic]);	
									}	
								});
								
							}
						}			

						
						if($('.marketo-hidden-optin.marketo-hidden-optin-enterprise').prop('checked')){
							userData.entEmailable = true;							
						} 
						
						if($('.marketo-hidden-optin.marketo-hidden-optin-developer').prop('checked')){
							userData.devEmailable = true;							
						} 
						
						//console.log(JSON.stringify(userData));
						
						
						$.ajax({
							type: "POST",
							url: NVIDIAGDC.apps.endpoint + '/services/eupservice/v1/user/updateProfile',
							crossDomain: true,
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json',
								'idToken': userProfileData['id_token']
							},
							data : JSON.stringify(userData),
							success: function(data) {
								console.log("Success EUP :");
								//console.log(data);	
							},
							error: function(data) {
								console.error("Error when eup update");
								console.log(data);
							}
						});  
						
						NVIDIAGDC.AdaptiveForm.userLoggedInData = undefined;
					}
										
                    //Call post-submit success step scripts.
                    var postSubmitResponse;
                    if (typeof aemFormPostSubmitSuccessSteps !== 'undefined' && $.isArray(aemFormPostSubmitSuccessSteps)) {
                    	var pathFactoryStep;
                    	for(var i = 0; i < aemFormPostSubmitSuccessSteps.length; i++) {
                    		if(aemFormPostSubmitSuccessSteps[i].name = 'postSuccessPathFactoryTrackRedirect'){
                    			pathFactoryStep = aemFormPostSubmitSuccessSteps.splice(i,1)[0];
                    			break;
                    		}
                    	}
                    	if(pathFactoryStep !== 'undefined'){
                    		aemFormPostSubmitSuccessSteps.push(pathFactoryStep);
                    	}                    	
                    	postSubmitResponse = new FormsSubmitPlugin().callPostSubmitScripts($, aemFormPostSubmitSuccessSteps, guideResultObject.data, true);
                    }               
                    var postSubmitErrMsg = '';
                    if (typeof postSubmitResponse !== 'undefined') {
                        var postSubmitArr = postSubmitResponse.stepReturnValues;
                        if (postSubmitResponse.showErrorMessage) {
                            if (typeof postSubmitArr !== 'undefined' && $.isArray(postSubmitArr)) {
                                postSubmitArr.forEach(function (postSubmitStep) {
                                    if (postSubmitStep.showErrorMessage) {
                                        postSubmitErrMsg += postSubmitStep.message + '<br/>';
                                    }
                                });
                            }
                        }
                    }
                    
                    if (postSubmitErrMsg === '') {                    	
                        if (NVIDIAGDC.AdaptiveForm.thankyouConfig === "message") {
                            var postSubmitErrMsg = '';
                            if (typeof postSubmitResponse !== 'undefined') {
                                var postSubmitArr = postSubmitResponse.stepReturnValues;
                                if (postSubmitResponse.showErrorMessage) {
                                    if (typeof postSubmitArr !== 'undefined' && $.isArray(postSubmitArr)) {
                                        postSubmitArr.forEach(function (postSubmitStep) {
                                            if (postSubmitStep.showErrorMessage) {
                                                postSubmitErrMsg += postSubmitStep.message + '<br/>';
                                            }
                                        });
                                    }
                                }
                            }
                            
                            $('#form-submit-success').toggle();
                            $('.form-container > #aem-form-title').hide();
                            $('.form-container > form').hide();
                            $('#form-submit-success').html(NVIDIAGDC.AdaptiveForm.thankyouMessage);
                            if ($('.modal-content').is(':visible') !== true) {
                                $('html,body').animate({ scrollTop: $("#form-submit-success").offset().top - 200 }, 'slow');
                            }
                            if ($('.modal-content').is(':visible')) {
                                $('.modal-content').parent().colorbox.resize();
                            }

                        } else {
                            if (NVIDIAGDC.AdaptiveForm.thankyouConfig === 'page' && NVIDIAGDC.AdaptiveForm.thankyouPage) {

                                var thankYouPage = NVIDIAGDC.AdaptiveForm.thankyouPage;
                                var currentdomain = (window.location.hostname === "localhost") ? window.location.hostname + ":" + window.location.port : window.location.hostname;

                                if (thankYouPage.startsWith('/content')) {
                                    var path = thankYouPage.split('/');
                                    var stripped = "";
                                    for (i = 0; i < 5; i++) {
                                        if (i > 0) stripped += "/";
                                        stripped += path[i];
                                    }
                                    if (currentdomain.indexOf('author') === -1) {
                                        thankYouPage = '//' + currentdomain + '/' + thankYouPage.replace(stripped, path[4].replace('_', '-').toLowerCase());
                                    } else {
                                        thankYouPage = '//' + currentdomain + '/' + thankYouPage;
                                    }
                                } else {
                                    thankYouPage = thankYouPage;
                                }

                                if (typeof thankYouPage === "string") {
                                    //document.getElementById(":redirect").value = thankYouPage;
									NVIDIAGDC.AdaptiveForm.isFileUpload = true
									if(NVIDIAGDC.AdaptiveForm.isFileUpload) {
										thankYouPage = thankYouPage +'?form-submit-token='+Cookies.get('form-submit-token');
									}
                                    window.open(thankYouPage, "_self");
                                }
                            }
                        }
                        guideBridge.reset();
                    } else {
                    	
                        $('#form-submit-error').html(postSubmitErrMsg);
                        $('#form-submit-error').toggle();
                        
                         if ($('.modal-content').is(':visible') !== true) {
                             $('html,body').animate({ scrollTop: $("#form-submit-success").offset().top - 200 }, 'slow');
                         }
                         if ($('.modal-content').is(':visible')) {
                             $('.modal-content').parent().colorbox.resize();
                         }
                    }                    
                } else {
                    document.dispatchEvent(new CustomEvent("formSubmissionFailure", { detail: { 'formName': NVIDIAGDC.AdaptiveForm.formName, 'failureType': 'voltron-validation-error' } }));

                    if (guideResultObject.data.errorData !== undefined) {
                        var errorJson = null;
                        try {
                            errorJson = JSON.parse(guideResultObject.data.errorData);
                        } catch (exception) {
                            console.log('Exception during parsing of guideResultObject.data.errorData, ' + exception.message);
                            console.log(guideResultObject.data.errorData);
                        }

                        if (errorJson !== null) {
                            //Call post-submit success step scripts.	
                        	if (typeof aemFormPostSubmitFailureSteps !== 'undefined' && $.isArray(aemFormPostSubmitFailureSteps)) {
                        		new FormsSubmitPlugin().callPostSubmitScripts($, aemFormPostSubmitFailureSteps, errorJson, false);
                        	}
                        	
                        	//Handle ank-end field validations
                        	if (errorJson.errorFields && errorJson.errorFields.length > 0) {
                        		var errorMessageDetails = errorJson.errorFields;
                               if (errorMessageDetails && errorMessageDetails.length > 0) {
                                   for (i = 0; i < errorMessageDetails.length; i++) {
                                       if (errorMessageDetails[i].hasOwnProperty("fieldName")) {
                                           var fieldName = errorMessageDetails[i]["fieldName"];
                                           var fieldErrorMsg = errorMessageDetails[i]["errorDescription"];
                                           if ($('.guideFieldNode.' + fieldName).length > 0) {
                                               $('.guideFieldNode.' + fieldName).removeClass('validation-success').addClass('validation-failure');
                                               $('.guideFieldNode.' + fieldName).find('.guideFieldError').text(guideBridge.resolveNode(fieldName).validateExpMessage).show();
                                               $('.guideFieldNode.' + fieldName).find("input").focusout(function () {
                                                   guideBridge.resolveNode(fieldName).validate();
                                               });
                                               if ($('.' + fieldName).length && fieldName === 'nvCaptchaText') {
                                                   NVIDIAGDC.AdaptiveForm.loadCaptcha();
                                               }
                                           }
                                       }
                                   }
                               }
                        	} else if (errorJson.hasOwnProperty("messageDetails")) {
                        	   var errorMessageDetails = errorJson["messageDetails"];
                        	   console.log(errorMessageDetails);
                        	   $('#form-submit-error').html(guideResultObject.data.errorMessage);
                               $('#form-submit-error').toggle();
                        	}                  
                        }
                    } else if (guideResultObject.data.errorHtml !== undefined) {
                        //console.log(errorHtml);
                        // Analytics error event trigger
                        document.dispatchEvent(new CustomEvent("formSubmissionFailure", { detail: { 'formName': NVIDIAGDC.AdaptiveForm.formName, 'failureType': 'voltrom-server-error' } }));
                        $('#form-submit-error').html(guideResultObject.data.errorMessage);
                        $('#form-submit-error').toggle();
                    }
                }
            }
        },

        error: function (guideResultObject) {
            // Analytics error event trigger
            document.dispatchEvent(new CustomEvent("formSubmissionFailure", { detail: { 'formName': NVIDIAGDC.AdaptiveForm.formName, 'failureType': 'aem-internal-error' } }));
            console.error("API Failed");
            var msg = guideResultObject.getNextMessage();
            while (msg != null) {
                console.error(msg.message);
                msg = guideResultObject.getNextMessage();
            }
        }
    });
    //console.log("FormsSubmitPlugin : handleFormSubmit end...");

}

FormsSubmitPlugin.prototype.handleStarfleetToken = function () {
    var userProfile = this.getLoggedInUserData();
	if (userProfile !== undefined && userProfile !== null && userProfile !== "") {
	    Cookies.set('starfleet-id-token', userProfile.id_token, {expires: 0.00035});
	}
}

FormsSubmitPlugin.prototype.getLoggedInUserData = function () {
    var lastLogin = window.localStorage.getItem('lastLoginData');			
	if (lastLogin !== undefined && lastLogin !== null && lastLogin !== "") {
		var userProfile = window.localStorage.getItem(lastLogin);
		if (userProfile !== undefined && userProfile !== null && userProfile !== "") {	
			return JSON.parse(userProfile);
		}
	} 
	return null;
}

FormsSubmitPlugin.prototype.callPostSubmitScripts = function ($, aemFormPostSubmitSteps, responseData, isSuccess) {
    if (typeof aemFormPostSubmitSteps !== 'undefined' && $.isArray(aemFormPostSubmitSteps)) {
        var postSubmitResponse = new FormsSubmitPlugin().handlePostFormSubmit($, aemFormPostSubmitSteps, responseData, isSuccess);
        if (postSubmitResponse !== undefined) {
            if (postSubmitResponse.stepReturnValues !== undefined) {
                postSubmitResponse.stepReturnValues.forEach(function (stepResponse) {
                    if (stepResponse !== undefined) {

                        if (typeof stepResponse.stepCallback === 'function') {
                            try {
                                stepResponse.stepCallback.apply(this, [stepResponse]);
                            } catch (exception) {
                                var stepType = isSuccess ? "Success" : "Failure";
                                console.log("Exception during postsubmit " + stepType + " step callback function call, " + exception.message);
                                console.log(exception);
                            }
                        }
                    }
                });
            }
        }
    }
    return postSubmitResponse;
}


// formPostSubmitSteps should be passed as function array which will be called back by this post submit function.
FormsSubmitPlugin.prototype.handlePostFormSubmit = function ($, aemFormPostSubmitSteps, responseData, isSuccess) {
    //console.log("handlePostFormSubmit start..");
    var postSubmitResponse = {};
    var postSubmitSuccess = true;
    var showErrorMessage = false;

    if (typeof aemFormPostSubmitSteps !== 'undefined' && $.isArray(aemFormPostSubmitSteps)) {
        
        var stepReturnValues = [];
        aemFormPostSubmitSteps.forEach(function (postSubmitStep) {
            if (typeof postSubmitStep === 'function') {
                var postSubmitStepReturnValue;
                try {

                    postSubmitStepReturnValue = postSubmitStep.apply(this, [responseData]);
                    if (postSubmitStepReturnValue.goForward !== undefined && postSubmitStepReturnValue.goForward === false) {
                        console.log("postSubmitStepReturnValue.goForward is set to false, exiting the loop.");
                        return false;
                    }
                } catch (exception) {
                    console.log("Exception during postsubmit step function, " + exception.message);
                    console.log(exception);
                    postSubmitStepReturnValue = { "success": false, "message": "Exception during postsubmit step function, " + exception.message, "exception": exception };
                }

                if (postSubmitStepReturnValue !== undefined) {
                    if (postSubmitStepReturnValue.success === undefined) {
                        postSubmitStepReturnValue.success = false;
                    }

                    if (postSubmitStepReturnValue.showErrorMessage === undefined) {
                        postSubmitStepReturnValue.showErrorMessage = false;
                    }

                    if (postSubmitSuccess) {
                        postSubmitSuccess = postSubmitStepReturnValue.success;
                    }

                    if (!showErrorMessage) {
                        showErrorMessage = postSubmitStepReturnValue.showErrorMessage;
                    }
                }
                stepReturnValues.push(postSubmitStepReturnValue);
            }
        });
        postSubmitResponse.stepReturnValues = stepReturnValues;
    }
    //console.log("handlePostFormSubmit end..");    
    postSubmitResponse.postSubmitSuccess = postSubmitSuccess;
    postSubmitResponse.showErrorMessage = showErrorMessage;
    return postSubmitResponse;
}
let formCountryToIsoMap = JSON.parse('{"Afghanistan":"AF","Albania":"AL","Aland Islands":"AX","Algeria":"DZ","American Samoa":"AS","Andorra":"AD","Angola":"AO","Anguilla":"AI","Antarctica":"AQ","Antigua &amp; Barbuda":"AG","Argentina":"AR","Armenia":"AM","Aruba   ":"AW","Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Bahamas":"BS","Bahrain":"BH","Bangladesh":"BD","Barbados":"BB","Belarus":"BY","Belgium":"BE","Belize":"BZ","Benin":"BJ","Bermuda":"BM","Bhutan":"BT","Bolivia":"BO","Bosnia":"BA","Botswana":"BW","Bouvet Island":"BV","Brazil":"BR","British Indian Ocean Territory":"IO","British Virgin Islands":"VG","Brunei":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Cape Verde":"CV","Cayman Islands":"KY","Central African Republic":"CF","Chad":"TD","Chile":"CL","China":"CN","Christmas Island":"CX","Cocos (Keeling) Islands":"CC","Colombia":"CO","Comoros":"KM","Congo (DRC)":"CD","Congo (Republic)":"CG","Cook Islands":"CK","Costa Rica":"CR","Croatia":"HR","Cuba":"CU","Curaçao":"CW","Cyprus":"CY","Czech Republic":"CZ","Denmark":"DK","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO","Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Equatorial Guinea":"GQ","Eritrea":"ER","Estonia":"EE","Ethiopia":"ET","European Union":"EU","Falkland Islands (Islas Malvinas)":"FK","Faroe Islands":"FO","Fiji":"FJ","Finland":"FI","France":"FR","French Guiana":"GF","French Polynesia":"PF","French Southern Territories":"TF","Gabon":"GA","Gambia":"GM","Georgia":"GE","Germany":"DE","Ghana":"GH","Gibraltar":"GI","Greece":"GR","Greenland":"GL","Grenada":"GD","Guadeloupe":"GP","Guam":"GU","Guatemala":"GT","Guernsey":"GG","Guinea":"GN","Guinea-Bissau":"GW","Guyana":"GY","Haiti":"HT","Heard &amp; McDonald Islands":"HM","Honduras":"HN","Hong Kong":"HK","Hungary":"HU","Iceland":"IS","India":"IN","Indonesia":"ID","Iran":"IR","Iraq":"IQ","Ireland":"IE","Isle of Man":"IM","Israel":"IL","Italy":"IT","Jamaica":"JM","Japan":"JP","Jersey":"JE","Jordan":"JO","Kazakhstan":"KZ","Kenya":"KE","Kiribati":"KI","Kuwait":"KW","Kyrgyzstan":"KG","Laos":"LA","Latvia":"LV","Lebanon":"LB","Lesotho":"LS","Liberia":"LR","Libya":"LY","Liechtenstein":"LI","Lithuania":"LT","Luxembourg":"LU","Macau":"MO","Macedonia (FYROM)":"MK","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Maldives":"MV","Mali":"ML","Malta":"MT","Marshall Islands":"MH","Martinique":"MQ","Mauritania":"MR","Mauritius":"MU","Mayotte":"YT","Mexico":"MX","Micronesia":"FM","Moldova":"MD","Monaco":"MC","Mongolia":"MN","Montenegro":"ME","Montserrat":"MS","Morocco":"MA","Mozambique":"MZ","Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nepal":"NP","Netherlands":"NL","Netherlands Antilles":"AN","New Caledonia":"NC","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG","Niue":"NU","Norfolk Island":"NF","North Korea":"KP","Northern Mariana Islands":"MP","Norway":"NO","Oman ":"OM","Pakistan":"PK","Palau":"PW","Palestine":"PS","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Philippines":"PH","Pitcairn Islands":"PN","Poland":"PL","Portugal":"PT","Puerto Rico":"PR","Qatar":"QA","Romania":"RO","Russia":"RU","Rwanda":"RW","Réunion":"RE","Samoa":"WS","San Marino":"SM","Saudi Arabia":"SA","Senegal":"SN","Serbia":"RS","Seychelles":"SC","Sierra Leone":"SL","Singapore":"SG","Sint Maarten":"SX","Slovakia":"SK","Slovenia":"SI","Solomon Islands":"SB","Somalia":"SO","South Africa":"ZA","South Georgia &amp; South Sandwich Islands":"GS","South Korea":"KR","South Sudan":"SS","Spain":"ES","Sri Lanka":"LK","St. Barthélemy":"BL","St. Helena":"SH","St. Kitts &amp; Nevis":"KN","St. Lucia":"LC","St. Martin":"MF","St. Pierre &amp; Miquelon":"PM","St. Vincent &amp; Grenadines":"VC","Sudan":"SD","Suriname":"SR","Svalbard &amp; Jan Mayen":"SJ","Sweden":"SE","Switzerland":"CH","Syria":"SY","São Tomé &amp; Príncipe":"ST","Taiwan":"TW","Tajikistan":"TJ","Tanzania":"TZ","Thailand":"TH","Togo":"TG","Tokelau":"TK","Tonga":"TO","Trinidad &amp; Tobago":"TT","Tunisia":"TN","Turkey":"TR","Turkmenistan":"TM","Turks &amp; Caicos Islands":"TC","Tuvalu":"TV","U.S. Outlying Islands":"UM","U.S. Virgin Islands":"VI","Uganda":"UG","Ukraine":"UA","United Arab Emirates":"AE","United Kingdom":"GB","United States":"US","Uruguay":"UY","Uzbekistan":"UZ","Vanuatu":"VU","Vatican City":"VA","Venezuela":"VE","Vietnam":"VN","Wallis &amp; Futuna":"WF","Western Sahara":"EH","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW"}');
let formIsoToCountryMap = JSON.parse('{"AF":"Afghanistan","AL":"Albania","AX":"Aland Islands","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua &amp; Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","VG":"British Virgin Islands","BN":"Brunei","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CD":"Congo (DRC)","CG":"Congo (Republic)","CK":"Cook Islands","CR":"Costa Rica","HR":"Croatia","CU":"Cuba","CW":"Curaçao","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","EU":"European Union","FK":"Falkland Islands (Islas Malvinas)","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard &amp; McDonald Islands","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Laos","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macau","MK":"Macedonia (FYROM)","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","AN":"Netherlands Antilles","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","KP":"North Korea","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestine","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn Islands","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RO":"Romania","RU":"Russia","RW":"Rwanda","RE":"Réunion","WS":"Samoa","SM":"San Marino","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia &amp; South Sandwich Islands","KR":"South Korea","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","BL":"St. Barthélemy","SH":"St. Helena","KN":"St. Kitts &amp; Nevis","LC":"St. Lucia","MF":"St. Martin","PM":"St. Pierre &amp; Miquelon","VC":"St. Vincent &amp; Grenadines","SD":"Sudan","SR":"Suriname","SJ":"Svalbard &amp; Jan Mayen","SE":"Sweden","CH":"Switzerland","SY":"Syria","ST":"São Tomé &amp; Príncipe","TW":"Taiwan","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad &amp; Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks &amp; Caicos Islands","TV":"Tuvalu","UM":"U.S. Outlying Islands","VI":"U.S. Virgin Islands","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VA":"Vatican City","VE":"Venezuela","VN":"Vietnam","WF":"Wallis &amp; Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}');
let optinTopicsMap = JSON.parse('{"TX Topic - Virtual Reality":"virtual_reality","TX Topic - Computer Vision":"computer_vision","TX Topic - Cybersecurity":"cybersecurity","TX Topic - Data Science":"data_science","TX Topic - Graphics":"graphics","TX Topic - Game Engines":"game_engines","TX Topic - Generative AI":"generative_ai","TX Topic - Networking":"networking","TX Topic - Conversational AI":"conversational_ai","TX Topic - Recommenders":"recommenders","TX Topic - Robotics":"robotics","TX Topic - Simulation":"simulation","TX Topic - Video Streaming":"video_streaming","TX Topic - Virtualization":"virtualization","TX Topic - Other":"other","TX Topic - Data Center":"data_center","TX Topic - Edge Computing":"edge_computing"}');
