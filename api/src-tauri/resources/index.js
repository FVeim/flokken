var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __reExport = (target, mod, secondTarget) => {
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(target, key) && key !== "default")
      __defProp(target, key, {
        get: () => mod[key],
        enumerable: true
      });
  if (secondTarget) {
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(secondTarget, key) && key !== "default")
        __defProp(secondTarget, key, {
          get: () => mod[key],
          enumerable: true
        });
    return secondTarget;
  }
};
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  function Events() {}
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events;
    else
      delete emitter._events[evt];
  }
  function EventEmitter() {
    this._events = new Events;
    this._eventsCount = 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// node_modules/@sinclair/typebox/value/guard.js
var require_guard = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.IsValueType = exports.IsSymbol = exports.IsFunction = exports.IsString = exports.IsBigInt = exports.IsInteger = exports.IsNumber = exports.IsBoolean = exports.IsNull = exports.IsUndefined = exports.IsArray = exports.IsObject = exports.IsPlainObject = exports.HasPropertyKey = exports.IsDate = exports.IsUint8Array = exports.IsPromise = exports.IsTypedArray = exports.IsIterator = exports.IsAsyncIterator = undefined;
  function IsAsyncIterator(value) {
    return IsObject(value) && Symbol.asyncIterator in value;
  }
  exports.IsAsyncIterator = IsAsyncIterator;
  function IsIterator(value) {
    return IsObject(value) && Symbol.iterator in value;
  }
  exports.IsIterator = IsIterator;
  function IsTypedArray(value) {
    return ArrayBuffer.isView(value);
  }
  exports.IsTypedArray = IsTypedArray;
  function IsPromise(value) {
    return value instanceof Promise;
  }
  exports.IsPromise = IsPromise;
  function IsUint8Array(value) {
    return value instanceof Uint8Array;
  }
  exports.IsUint8Array = IsUint8Array;
  function IsDate(value) {
    return value instanceof Date && Number.isFinite(value.getTime());
  }
  exports.IsDate = IsDate;
  function HasPropertyKey(value, key) {
    return key in value;
  }
  exports.HasPropertyKey = HasPropertyKey;
  function IsPlainObject(value) {
    return IsObject(value) && IsFunction(value.constructor) && value.constructor.name === "Object";
  }
  exports.IsPlainObject = IsPlainObject;
  function IsObject(value) {
    return value !== null && typeof value === "object";
  }
  exports.IsObject = IsObject;
  function IsArray(value) {
    return Array.isArray(value) && !ArrayBuffer.isView(value);
  }
  exports.IsArray = IsArray;
  function IsUndefined(value) {
    return value === undefined;
  }
  exports.IsUndefined = IsUndefined;
  function IsNull(value) {
    return value === null;
  }
  exports.IsNull = IsNull;
  function IsBoolean(value) {
    return typeof value === "boolean";
  }
  exports.IsBoolean = IsBoolean;
  function IsNumber(value) {
    return typeof value === "number";
  }
  exports.IsNumber = IsNumber;
  function IsInteger(value) {
    return IsNumber(value) && Number.isInteger(value);
  }
  exports.IsInteger = IsInteger;
  function IsBigInt(value) {
    return typeof value === "bigint";
  }
  exports.IsBigInt = IsBigInt;
  function IsString(value) {
    return typeof value === "string";
  }
  exports.IsString = IsString;
  function IsFunction(value) {
    return typeof value === "function";
  }
  exports.IsFunction = IsFunction;
  function IsSymbol(value) {
    return typeof value === "symbol";
  }
  exports.IsSymbol = IsSymbol;
  function IsValueType(value) {
    return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
  }
  exports.IsValueType = IsValueType;
});

// node_modules/@sinclair/typebox/typebox.js
var require_typebox = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Type = exports.JsonType = exports.JavaScriptTypeBuilder = exports.JsonTypeBuilder = exports.TypeBuilder = exports.TypeBuilderError = exports.TransformEncodeBuilder = exports.TransformDecodeBuilder = exports.TemplateLiteralDslParser = exports.TemplateLiteralGenerator = exports.TemplateLiteralGeneratorError = exports.TemplateLiteralFinite = exports.TemplateLiteralFiniteError = exports.TemplateLiteralParser = exports.TemplateLiteralParserError = exports.TemplateLiteralResolver = exports.TemplateLiteralPattern = exports.TemplateLiteralPatternError = exports.UnionResolver = exports.KeyArrayResolver = exports.KeyArrayResolverError = exports.KeyResolver = exports.ObjectMap = exports.Intrinsic = exports.IndexedAccessor = exports.TypeClone = exports.TypeExtends = exports.TypeExtendsResult = exports.TypeExtendsError = exports.ExtendsUndefined = exports.TypeGuard = exports.TypeGuardUnknownTypeError = exports.ValueGuard = exports.FormatRegistry = exports.TypeBoxError = exports.TypeRegistry = exports.PatternStringExact = exports.PatternNumberExact = exports.PatternBooleanExact = exports.PatternString = exports.PatternNumber = exports.PatternBoolean = exports.Kind = exports.Hint = exports.Optional = exports.Readonly = exports.Transform = undefined;
  exports.Transform = Symbol.for("TypeBox.Transform");
  exports.Readonly = Symbol.for("TypeBox.Readonly");
  exports.Optional = Symbol.for("TypeBox.Optional");
  exports.Hint = Symbol.for("TypeBox.Hint");
  exports.Kind = Symbol.for("TypeBox.Kind");
  exports.PatternBoolean = "(true|false)";
  exports.PatternNumber = "(0|[1-9][0-9]*)";
  exports.PatternString = "(.*)";
  exports.PatternBooleanExact = `^${exports.PatternBoolean}$`;
  exports.PatternNumberExact = `^${exports.PatternNumber}$`;
  exports.PatternStringExact = `^${exports.PatternString}$`;
  var TypeRegistry;
  (function(TypeRegistry2) {
    const map = new Map;
    function Entries() {
      return new Map(map);
    }
    TypeRegistry2.Entries = Entries;
    function Clear() {
      return map.clear();
    }
    TypeRegistry2.Clear = Clear;
    function Delete(kind) {
      return map.delete(kind);
    }
    TypeRegistry2.Delete = Delete;
    function Has(kind) {
      return map.has(kind);
    }
    TypeRegistry2.Has = Has;
    function Set2(kind, func) {
      map.set(kind, func);
    }
    TypeRegistry2.Set = Set2;
    function Get(kind) {
      return map.get(kind);
    }
    TypeRegistry2.Get = Get;
  })(TypeRegistry || (exports.TypeRegistry = TypeRegistry = {}));

  class TypeBoxError extends Error {
    constructor(message) {
      super(message);
    }
  }
  exports.TypeBoxError = TypeBoxError;
  var FormatRegistry;
  (function(FormatRegistry2) {
    const map = new Map;
    function Entries() {
      return new Map(map);
    }
    FormatRegistry2.Entries = Entries;
    function Clear() {
      return map.clear();
    }
    FormatRegistry2.Clear = Clear;
    function Delete(format) {
      return map.delete(format);
    }
    FormatRegistry2.Delete = Delete;
    function Has(format) {
      return map.has(format);
    }
    FormatRegistry2.Has = Has;
    function Set2(format, func) {
      map.set(format, func);
    }
    FormatRegistry2.Set = Set2;
    function Get(format) {
      return map.get(format);
    }
    FormatRegistry2.Get = Get;
  })(FormatRegistry || (exports.FormatRegistry = FormatRegistry = {}));
  var ValueGuard;
  (function(ValueGuard2) {
    function IsArray(value) {
      return Array.isArray(value);
    }
    ValueGuard2.IsArray = IsArray;
    function IsBigInt(value) {
      return typeof value === "bigint";
    }
    ValueGuard2.IsBigInt = IsBigInt;
    function IsBoolean(value) {
      return typeof value === "boolean";
    }
    ValueGuard2.IsBoolean = IsBoolean;
    function IsDate(value) {
      return value instanceof globalThis.Date;
    }
    ValueGuard2.IsDate = IsDate;
    function IsNull(value) {
      return value === null;
    }
    ValueGuard2.IsNull = IsNull;
    function IsNumber(value) {
      return typeof value === "number";
    }
    ValueGuard2.IsNumber = IsNumber;
    function IsObject(value) {
      return typeof value === "object" && value !== null;
    }
    ValueGuard2.IsObject = IsObject;
    function IsString(value) {
      return typeof value === "string";
    }
    ValueGuard2.IsString = IsString;
    function IsUint8Array(value) {
      return value instanceof globalThis.Uint8Array;
    }
    ValueGuard2.IsUint8Array = IsUint8Array;
    function IsUndefined(value) {
      return value === undefined;
    }
    ValueGuard2.IsUndefined = IsUndefined;
  })(ValueGuard || (exports.ValueGuard = ValueGuard = {}));

  class TypeGuardUnknownTypeError extends TypeBoxError {
  }
  exports.TypeGuardUnknownTypeError = TypeGuardUnknownTypeError;
  var TypeGuard;
  (function(TypeGuard2) {
    function IsPattern(value) {
      try {
        new RegExp(value);
        return true;
      } catch {
        return false;
      }
    }
    function IsControlCharacterFree(value) {
      if (!ValueGuard.IsString(value))
        return false;
      for (let i = 0;i < value.length; i++) {
        const code = value.charCodeAt(i);
        if (code >= 7 && code <= 13 || code === 27 || code === 127) {
          return false;
        }
      }
      return true;
    }
    function IsAdditionalProperties(value) {
      return IsOptionalBoolean(value) || TSchema(value);
    }
    function IsOptionalBigInt(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsBigInt(value);
    }
    function IsOptionalNumber(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsNumber(value);
    }
    function IsOptionalBoolean(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsBoolean(value);
    }
    function IsOptionalString(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value);
    }
    function IsOptionalPattern(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value) && IsControlCharacterFree(value) && IsPattern(value);
    }
    function IsOptionalFormat(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value) && IsControlCharacterFree(value);
    }
    function IsOptionalSchema(value) {
      return ValueGuard.IsUndefined(value) || TSchema(value);
    }
    function TAny(schema) {
      return TKindOf(schema, "Any") && IsOptionalString(schema.$id);
    }
    TypeGuard2.TAny = TAny;
    function TArray(schema) {
      return TKindOf(schema, "Array") && schema.type === "array" && IsOptionalString(schema.$id) && TSchema(schema.items) && IsOptionalNumber(schema.minItems) && IsOptionalNumber(schema.maxItems) && IsOptionalBoolean(schema.uniqueItems) && IsOptionalSchema(schema.contains) && IsOptionalNumber(schema.minContains) && IsOptionalNumber(schema.maxContains);
    }
    TypeGuard2.TArray = TArray;
    function TAsyncIterator(schema) {
      return TKindOf(schema, "AsyncIterator") && schema.type === "AsyncIterator" && IsOptionalString(schema.$id) && TSchema(schema.items);
    }
    TypeGuard2.TAsyncIterator = TAsyncIterator;
    function TBigInt(schema) {
      return TKindOf(schema, "BigInt") && schema.type === "bigint" && IsOptionalString(schema.$id) && IsOptionalBigInt(schema.exclusiveMaximum) && IsOptionalBigInt(schema.exclusiveMinimum) && IsOptionalBigInt(schema.maximum) && IsOptionalBigInt(schema.minimum) && IsOptionalBigInt(schema.multipleOf);
    }
    TypeGuard2.TBigInt = TBigInt;
    function TBoolean(schema) {
      return TKindOf(schema, "Boolean") && schema.type === "boolean" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TBoolean = TBoolean;
    function TConstructor(schema) {
      return TKindOf(schema, "Constructor") && schema.type === "Constructor" && IsOptionalString(schema.$id) && ValueGuard.IsArray(schema.parameters) && schema.parameters.every((schema2) => TSchema(schema2)) && TSchema(schema.returns);
    }
    TypeGuard2.TConstructor = TConstructor;
    function TDate(schema) {
      return TKindOf(schema, "Date") && schema.type === "Date" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.exclusiveMaximumTimestamp) && IsOptionalNumber(schema.exclusiveMinimumTimestamp) && IsOptionalNumber(schema.maximumTimestamp) && IsOptionalNumber(schema.minimumTimestamp) && IsOptionalNumber(schema.multipleOfTimestamp);
    }
    TypeGuard2.TDate = TDate;
    function TFunction(schema) {
      return TKindOf(schema, "Function") && schema.type === "Function" && IsOptionalString(schema.$id) && ValueGuard.IsArray(schema.parameters) && schema.parameters.every((schema2) => TSchema(schema2)) && TSchema(schema.returns);
    }
    TypeGuard2.TFunction = TFunction;
    function TInteger(schema) {
      return TKindOf(schema, "Integer") && schema.type === "integer" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.exclusiveMaximum) && IsOptionalNumber(schema.exclusiveMinimum) && IsOptionalNumber(schema.maximum) && IsOptionalNumber(schema.minimum) && IsOptionalNumber(schema.multipleOf);
    }
    TypeGuard2.TInteger = TInteger;
    function TIntersect(schema) {
      return TKindOf(schema, "Intersect") && (ValueGuard.IsString(schema.type) && schema.type !== "object" ? false : true) && ValueGuard.IsArray(schema.allOf) && schema.allOf.every((schema2) => TSchema(schema2) && !TTransform(schema2)) && IsOptionalString(schema.type) && (IsOptionalBoolean(schema.unevaluatedProperties) || IsOptionalSchema(schema.unevaluatedProperties)) && IsOptionalString(schema.$id);
    }
    TypeGuard2.TIntersect = TIntersect;
    function TIterator(schema) {
      return TKindOf(schema, "Iterator") && schema.type === "Iterator" && IsOptionalString(schema.$id) && TSchema(schema.items);
    }
    TypeGuard2.TIterator = TIterator;
    function TKindOf(schema, kind) {
      return TKind(schema) && schema[exports.Kind] === kind;
    }
    TypeGuard2.TKindOf = TKindOf;
    function TKind(schema) {
      return ValueGuard.IsObject(schema) && exports.Kind in schema && ValueGuard.IsString(schema[exports.Kind]);
    }
    TypeGuard2.TKind = TKind;
    function TLiteralString(schema) {
      return TLiteral(schema) && ValueGuard.IsString(schema.const);
    }
    TypeGuard2.TLiteralString = TLiteralString;
    function TLiteralNumber(schema) {
      return TLiteral(schema) && ValueGuard.IsNumber(schema.const);
    }
    TypeGuard2.TLiteralNumber = TLiteralNumber;
    function TLiteralBoolean(schema) {
      return TLiteral(schema) && ValueGuard.IsBoolean(schema.const);
    }
    TypeGuard2.TLiteralBoolean = TLiteralBoolean;
    function TLiteral(schema) {
      return TKindOf(schema, "Literal") && IsOptionalString(schema.$id) && (ValueGuard.IsBoolean(schema.const) || ValueGuard.IsNumber(schema.const) || ValueGuard.IsString(schema.const));
    }
    TypeGuard2.TLiteral = TLiteral;
    function TNever(schema) {
      return TKindOf(schema, "Never") && ValueGuard.IsObject(schema.not) && Object.getOwnPropertyNames(schema.not).length === 0;
    }
    TypeGuard2.TNever = TNever;
    function TNot(schema) {
      return TKindOf(schema, "Not") && TSchema(schema.not);
    }
    TypeGuard2.TNot = TNot;
    function TNull(schema) {
      return TKindOf(schema, "Null") && schema.type === "null" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TNull = TNull;
    function TNumber(schema) {
      return TKindOf(schema, "Number") && schema.type === "number" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.exclusiveMaximum) && IsOptionalNumber(schema.exclusiveMinimum) && IsOptionalNumber(schema.maximum) && IsOptionalNumber(schema.minimum) && IsOptionalNumber(schema.multipleOf);
    }
    TypeGuard2.TNumber = TNumber;
    function TObject(schema) {
      return TKindOf(schema, "Object") && schema.type === "object" && IsOptionalString(schema.$id) && ValueGuard.IsObject(schema.properties) && IsAdditionalProperties(schema.additionalProperties) && IsOptionalNumber(schema.minProperties) && IsOptionalNumber(schema.maxProperties) && Object.entries(schema.properties).every(([key, schema2]) => IsControlCharacterFree(key) && TSchema(schema2));
    }
    TypeGuard2.TObject = TObject;
    function TPromise(schema) {
      return TKindOf(schema, "Promise") && schema.type === "Promise" && IsOptionalString(schema.$id) && TSchema(schema.item);
    }
    TypeGuard2.TPromise = TPromise;
    function TRecord(schema) {
      return TKindOf(schema, "Record") && schema.type === "object" && IsOptionalString(schema.$id) && IsAdditionalProperties(schema.additionalProperties) && ValueGuard.IsObject(schema.patternProperties) && ((schema2) => {
        const keys = Object.getOwnPropertyNames(schema2.patternProperties);
        return keys.length === 1 && IsPattern(keys[0]) && ValueGuard.IsObject(schema2.patternProperties) && TSchema(schema2.patternProperties[keys[0]]);
      })(schema);
    }
    TypeGuard2.TRecord = TRecord;
    function TRecursive(schema) {
      return ValueGuard.IsObject(schema) && exports.Hint in schema && schema[exports.Hint] === "Recursive";
    }
    TypeGuard2.TRecursive = TRecursive;
    function TRef(schema) {
      return TKindOf(schema, "Ref") && IsOptionalString(schema.$id) && ValueGuard.IsString(schema.$ref);
    }
    TypeGuard2.TRef = TRef;
    function TString(schema) {
      return TKindOf(schema, "String") && schema.type === "string" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.minLength) && IsOptionalNumber(schema.maxLength) && IsOptionalPattern(schema.pattern) && IsOptionalFormat(schema.format);
    }
    TypeGuard2.TString = TString;
    function TSymbol(schema) {
      return TKindOf(schema, "Symbol") && schema.type === "symbol" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TSymbol = TSymbol;
    function TTemplateLiteral(schema) {
      return TKindOf(schema, "TemplateLiteral") && schema.type === "string" && ValueGuard.IsString(schema.pattern) && schema.pattern[0] === "^" && schema.pattern[schema.pattern.length - 1] === "$";
    }
    TypeGuard2.TTemplateLiteral = TTemplateLiteral;
    function TThis(schema) {
      return TKindOf(schema, "This") && IsOptionalString(schema.$id) && ValueGuard.IsString(schema.$ref);
    }
    TypeGuard2.TThis = TThis;
    function TTransform(schema) {
      return ValueGuard.IsObject(schema) && exports.Transform in schema;
    }
    TypeGuard2.TTransform = TTransform;
    function TTuple(schema) {
      return TKindOf(schema, "Tuple") && schema.type === "array" && IsOptionalString(schema.$id) && ValueGuard.IsNumber(schema.minItems) && ValueGuard.IsNumber(schema.maxItems) && schema.minItems === schema.maxItems && (ValueGuard.IsUndefined(schema.items) && ValueGuard.IsUndefined(schema.additionalItems) && schema.minItems === 0 || ValueGuard.IsArray(schema.items) && schema.items.every((schema2) => TSchema(schema2)));
    }
    TypeGuard2.TTuple = TTuple;
    function TUndefined(schema) {
      return TKindOf(schema, "Undefined") && schema.type === "undefined" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TUndefined = TUndefined;
    function TUnionLiteral(schema) {
      return TUnion(schema) && schema.anyOf.every((schema2) => TLiteralString(schema2) || TLiteralNumber(schema2));
    }
    TypeGuard2.TUnionLiteral = TUnionLiteral;
    function TUnion(schema) {
      return TKindOf(schema, "Union") && IsOptionalString(schema.$id) && ValueGuard.IsObject(schema) && ValueGuard.IsArray(schema.anyOf) && schema.anyOf.every((schema2) => TSchema(schema2));
    }
    TypeGuard2.TUnion = TUnion;
    function TUint8Array(schema) {
      return TKindOf(schema, "Uint8Array") && schema.type === "Uint8Array" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.minByteLength) && IsOptionalNumber(schema.maxByteLength);
    }
    TypeGuard2.TUint8Array = TUint8Array;
    function TUnknown(schema) {
      return TKindOf(schema, "Unknown") && IsOptionalString(schema.$id);
    }
    TypeGuard2.TUnknown = TUnknown;
    function TUnsafe(schema) {
      return TKindOf(schema, "Unsafe");
    }
    TypeGuard2.TUnsafe = TUnsafe;
    function TVoid(schema) {
      return TKindOf(schema, "Void") && schema.type === "void" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TVoid = TVoid;
    function TReadonly(schema) {
      return ValueGuard.IsObject(schema) && schema[exports.Readonly] === "Readonly";
    }
    TypeGuard2.TReadonly = TReadonly;
    function TOptional(schema) {
      return ValueGuard.IsObject(schema) && schema[exports.Optional] === "Optional";
    }
    TypeGuard2.TOptional = TOptional;
    function TSchema(schema) {
      return ValueGuard.IsObject(schema) && (TAny(schema) || TArray(schema) || TBoolean(schema) || TBigInt(schema) || TAsyncIterator(schema) || TConstructor(schema) || TDate(schema) || TFunction(schema) || TInteger(schema) || TIntersect(schema) || TIterator(schema) || TLiteral(schema) || TNever(schema) || TNot(schema) || TNull(schema) || TNumber(schema) || TObject(schema) || TPromise(schema) || TRecord(schema) || TRef(schema) || TString(schema) || TSymbol(schema) || TTemplateLiteral(schema) || TThis(schema) || TTuple(schema) || TUndefined(schema) || TUnion(schema) || TUint8Array(schema) || TUnknown(schema) || TUnsafe(schema) || TVoid(schema) || TKind(schema) && TypeRegistry.Has(schema[exports.Kind]));
    }
    TypeGuard2.TSchema = TSchema;
  })(TypeGuard || (exports.TypeGuard = TypeGuard = {}));
  var ExtendsUndefined;
  (function(ExtendsUndefined2) {
    function Check(schema) {
      return schema[exports.Kind] === "Intersect" ? schema.allOf.every((schema2) => Check(schema2)) : schema[exports.Kind] === "Union" ? schema.anyOf.some((schema2) => Check(schema2)) : schema[exports.Kind] === "Undefined" ? true : schema[exports.Kind] === "Not" ? !Check(schema.not) : false;
    }
    ExtendsUndefined2.Check = Check;
  })(ExtendsUndefined || (exports.ExtendsUndefined = ExtendsUndefined = {}));

  class TypeExtendsError extends TypeBoxError {
  }
  exports.TypeExtendsError = TypeExtendsError;
  var TypeExtendsResult;
  (function(TypeExtendsResult2) {
    TypeExtendsResult2[TypeExtendsResult2["Union"] = 0] = "Union";
    TypeExtendsResult2[TypeExtendsResult2["True"] = 1] = "True";
    TypeExtendsResult2[TypeExtendsResult2["False"] = 2] = "False";
  })(TypeExtendsResult || (exports.TypeExtendsResult = TypeExtendsResult = {}));
  var TypeExtends;
  (function(TypeExtends2) {
    function IntoBooleanResult(result) {
      return result === TypeExtendsResult.False ? result : TypeExtendsResult.True;
    }
    function Throw(message) {
      throw new TypeExtendsError(message);
    }
    function IsStructuralRight(right) {
      return TypeGuard.TNever(right) || TypeGuard.TIntersect(right) || TypeGuard.TUnion(right) || TypeGuard.TUnknown(right) || TypeGuard.TAny(right);
    }
    function StructuralRight(left, right) {
      return TypeGuard.TNever(right) ? TNeverRight(left, right) : TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) ? TUnionRight(left, right) : TypeGuard.TUnknown(right) ? TUnknownRight(left, right) : TypeGuard.TAny(right) ? TAnyRight(left, right) : Throw("StructuralRight");
    }
    function TAnyRight(left, right) {
      return TypeExtendsResult.True;
    }
    function TAny(left, right) {
      return TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) && right.anyOf.some((schema) => TypeGuard.TAny(schema) || TypeGuard.TUnknown(schema)) ? TypeExtendsResult.True : TypeGuard.TUnion(right) ? TypeExtendsResult.Union : TypeGuard.TUnknown(right) ? TypeExtendsResult.True : TypeGuard.TAny(right) ? TypeExtendsResult.True : TypeExtendsResult.Union;
    }
    function TArrayRight(left, right) {
      return TypeGuard.TUnknown(left) ? TypeExtendsResult.False : TypeGuard.TAny(left) ? TypeExtendsResult.Union : TypeGuard.TNever(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TArray(left, right) {
      return TypeGuard.TObject(right) && IsObjectArrayLike(right) ? TypeExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !TypeGuard.TArray(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.items, right.items));
    }
    function TAsyncIterator(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : !TypeGuard.TAsyncIterator(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.items, right.items));
    }
    function TBigInt(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TBigInt(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TBooleanRight(left, right) {
      return TypeGuard.TLiteral(left) && ValueGuard.IsBoolean(left.const) ? TypeExtendsResult.True : TypeGuard.TBoolean(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TBoolean(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TBoolean(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TConstructor(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : !TypeGuard.TConstructor(right) ? TypeExtendsResult.False : left.parameters.length > right.parameters.length ? TypeExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit(right.parameters[index], schema)) === TypeExtendsResult.True) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.returns, right.returns));
    }
    function TDate(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TDate(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TFunction(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : !TypeGuard.TFunction(right) ? TypeExtendsResult.False : left.parameters.length > right.parameters.length ? TypeExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit(right.parameters[index], schema)) === TypeExtendsResult.True) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.returns, right.returns));
    }
    function TIntegerRight(left, right) {
      return TypeGuard.TLiteral(left) && ValueGuard.IsNumber(left.const) ? TypeExtendsResult.True : TypeGuard.TNumber(left) || TypeGuard.TInteger(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TInteger(left, right) {
      return TypeGuard.TInteger(right) || TypeGuard.TNumber(right) ? TypeExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeExtendsResult.False;
    }
    function TIntersectRight(left, right) {
      return right.allOf.every((schema) => Visit(left, schema) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TIntersect(left, right) {
      return left.allOf.some((schema) => Visit(schema, right) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TIterator(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : !TypeGuard.TIterator(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.items, right.items));
    }
    function TLiteral(left, right) {
      return TypeGuard.TLiteral(right) && right.const === left.const ? TypeExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TString(right) ? TStringRight(left, right) : TypeGuard.TNumber(right) ? TNumberRight(left, right) : TypeGuard.TInteger(right) ? TIntegerRight(left, right) : TypeGuard.TBoolean(right) ? TBooleanRight(left, right) : TypeExtendsResult.False;
    }
    function TNeverRight(left, right) {
      return TypeExtendsResult.False;
    }
    function TNever(left, right) {
      return TypeExtendsResult.True;
    }
    function UnwrapTNot(schema) {
      let [current, depth] = [schema, 0];
      while (true) {
        if (!TypeGuard.TNot(current))
          break;
        current = current.not;
        depth += 1;
      }
      return depth % 2 === 0 ? current : exports.Type.Unknown();
    }
    function TNot(left, right) {
      return TypeGuard.TNot(left) ? Visit(UnwrapTNot(left), right) : TypeGuard.TNot(right) ? Visit(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
    }
    function TNull(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TNull(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TNumberRight(left, right) {
      return TypeGuard.TLiteralNumber(left) ? TypeExtendsResult.True : TypeGuard.TNumber(left) || TypeGuard.TInteger(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TNumber(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TInteger(right) || TypeGuard.TNumber(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function IsObjectPropertyCount(schema, count) {
      return Object.getOwnPropertyNames(schema.properties).length === count;
    }
    function IsObjectStringLike(schema) {
      return IsObjectArrayLike(schema);
    }
    function IsObjectSymbolLike(schema) {
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && TypeGuard.TUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (TypeGuard.TString(schema.properties.description.anyOf[0]) && TypeGuard.TUndefined(schema.properties.description.anyOf[1]) || TypeGuard.TString(schema.properties.description.anyOf[1]) && TypeGuard.TUndefined(schema.properties.description.anyOf[0]));
    }
    function IsObjectNumberLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectBooleanLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectBigIntLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectDateLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectUint8ArrayLike(schema) {
      return IsObjectArrayLike(schema);
    }
    function IsObjectFunctionLike(schema) {
      const length = exports.Type.Number();
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit(schema.properties["length"], length)) === TypeExtendsResult.True;
    }
    function IsObjectConstructorLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectArrayLike(schema) {
      const length = exports.Type.Number();
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit(schema.properties["length"], length)) === TypeExtendsResult.True;
    }
    function IsObjectPromiseLike(schema) {
      const then = exports.Type.Function([exports.Type.Any()], exports.Type.Any());
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit(schema.properties["then"], then)) === TypeExtendsResult.True;
    }
    function Property(left, right) {
      return Visit(left, right) === TypeExtendsResult.False ? TypeExtendsResult.False : TypeGuard.TOptional(left) && !TypeGuard.TOptional(right) ? TypeExtendsResult.False : TypeExtendsResult.True;
    }
    function TObjectRight(left, right) {
      return TypeGuard.TUnknown(left) ? TypeExtendsResult.False : TypeGuard.TAny(left) ? TypeExtendsResult.Union : TypeGuard.TNever(left) || TypeGuard.TLiteralString(left) && IsObjectStringLike(right) || TypeGuard.TLiteralNumber(left) && IsObjectNumberLike(right) || TypeGuard.TLiteralBoolean(left) && IsObjectBooleanLike(right) || TypeGuard.TSymbol(left) && IsObjectSymbolLike(right) || TypeGuard.TBigInt(left) && IsObjectBigIntLike(right) || TypeGuard.TString(left) && IsObjectStringLike(right) || TypeGuard.TSymbol(left) && IsObjectSymbolLike(right) || TypeGuard.TNumber(left) && IsObjectNumberLike(right) || TypeGuard.TInteger(left) && IsObjectNumberLike(right) || TypeGuard.TBoolean(left) && IsObjectBooleanLike(right) || TypeGuard.TUint8Array(left) && IsObjectUint8ArrayLike(right) || TypeGuard.TDate(left) && IsObjectDateLike(right) || TypeGuard.TConstructor(left) && IsObjectConstructorLike(right) || TypeGuard.TFunction(left) && IsObjectFunctionLike(right) ? TypeExtendsResult.True : TypeGuard.TRecord(left) && TypeGuard.TString(RecordKey(left)) ? (() => {
        return right[exports.Hint] === "Record" ? TypeExtendsResult.True : TypeExtendsResult.False;
      })() : TypeGuard.TRecord(left) && TypeGuard.TNumber(RecordKey(left)) ? (() => {
        return IsObjectPropertyCount(right, 0) ? TypeExtendsResult.True : TypeExtendsResult.False;
      })() : TypeExtendsResult.False;
    }
    function TObject(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : !TypeGuard.TObject(right) ? TypeExtendsResult.False : (() => {
        for (const key of Object.getOwnPropertyNames(right.properties)) {
          if (!(key in left.properties) && !TypeGuard.TOptional(right.properties[key])) {
            return TypeExtendsResult.False;
          }
          if (TypeGuard.TOptional(right.properties[key])) {
            return TypeExtendsResult.True;
          }
          if (Property(left.properties[key], right.properties[key]) === TypeExtendsResult.False) {
            return TypeExtendsResult.False;
          }
        }
        return TypeExtendsResult.True;
      })();
    }
    function TPromise(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) && IsObjectPromiseLike(right) ? TypeExtendsResult.True : !TypeGuard.TPromise(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.item, right.item));
    }
    function RecordKey(schema) {
      return exports.PatternNumberExact in schema.patternProperties ? exports.Type.Number() : (exports.PatternStringExact in schema.patternProperties) ? exports.Type.String() : Throw("Unknown record key pattern");
    }
    function RecordValue(schema) {
      return exports.PatternNumberExact in schema.patternProperties ? schema.patternProperties[exports.PatternNumberExact] : (exports.PatternStringExact in schema.patternProperties) ? schema.patternProperties[exports.PatternStringExact] : Throw("Unable to get record value schema");
    }
    function TRecordRight(left, right) {
      const [Key, Value] = [RecordKey(right), RecordValue(right)];
      return TypeGuard.TLiteralString(left) && TypeGuard.TNumber(Key) && IntoBooleanResult(Visit(left, Value)) === TypeExtendsResult.True ? TypeExtendsResult.True : TypeGuard.TUint8Array(left) && TypeGuard.TNumber(Key) ? Visit(left, Value) : TypeGuard.TString(left) && TypeGuard.TNumber(Key) ? Visit(left, Value) : TypeGuard.TArray(left) && TypeGuard.TNumber(Key) ? Visit(left, Value) : TypeGuard.TObject(left) ? (() => {
        for (const key of Object.getOwnPropertyNames(left.properties)) {
          if (Property(Value, left.properties[key]) === TypeExtendsResult.False) {
            return TypeExtendsResult.False;
          }
        }
        return TypeExtendsResult.True;
      })() : TypeExtendsResult.False;
    }
    function TRecord(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : !TypeGuard.TRecord(right) ? TypeExtendsResult.False : Visit(RecordValue(left), RecordValue(right));
    }
    function TStringRight(left, right) {
      return TypeGuard.TLiteral(left) && ValueGuard.IsString(left.const) ? TypeExtendsResult.True : TypeGuard.TString(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TString(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TString(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TSymbol(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TSymbol(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TTemplateLiteral(left, right) {
      return TypeGuard.TTemplateLiteral(left) ? Visit(TemplateLiteralResolver.Resolve(left), right) : TypeGuard.TTemplateLiteral(right) ? Visit(left, TemplateLiteralResolver.Resolve(right)) : Throw("Invalid fallthrough for TemplateLiteral");
    }
    function IsArrayOfTuple(left, right) {
      return TypeGuard.TArray(right) && left.items !== undefined && left.items.every((schema) => Visit(schema, right.items) === TypeExtendsResult.True);
    }
    function TTupleRight(left, right) {
      return TypeGuard.TNever(left) ? TypeExtendsResult.True : TypeGuard.TUnknown(left) ? TypeExtendsResult.False : TypeGuard.TAny(left) ? TypeExtendsResult.Union : TypeExtendsResult.False;
    }
    function TTuple(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) && IsObjectArrayLike(right) ? TypeExtendsResult.True : TypeGuard.TArray(right) && IsArrayOfTuple(left, right) ? TypeExtendsResult.True : !TypeGuard.TTuple(right) ? TypeExtendsResult.False : ValueGuard.IsUndefined(left.items) && !ValueGuard.IsUndefined(right.items) || !ValueGuard.IsUndefined(left.items) && ValueGuard.IsUndefined(right.items) ? TypeExtendsResult.False : ValueGuard.IsUndefined(left.items) && !ValueGuard.IsUndefined(right.items) ? TypeExtendsResult.True : left.items.every((schema, index) => Visit(schema, right.items[index]) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUint8Array(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TUint8Array(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUndefined(left, right) {
      return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TVoid(right) ? VoidRight(left, right) : TypeGuard.TUndefined(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUnionRight(left, right) {
      return right.anyOf.some((schema) => Visit(left, schema) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUnion(left, right) {
      return left.anyOf.every((schema) => Visit(schema, right) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUnknownRight(left, right) {
      return TypeExtendsResult.True;
    }
    function TUnknown(left, right) {
      return TypeGuard.TNever(right) ? TNeverRight(left, right) : TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) ? TUnionRight(left, right) : TypeGuard.TAny(right) ? TAnyRight(left, right) : TypeGuard.TString(right) ? TStringRight(left, right) : TypeGuard.TNumber(right) ? TNumberRight(left, right) : TypeGuard.TInteger(right) ? TIntegerRight(left, right) : TypeGuard.TBoolean(right) ? TBooleanRight(left, right) : TypeGuard.TArray(right) ? TArrayRight(left, right) : TypeGuard.TTuple(right) ? TTupleRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TUnknown(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function VoidRight(left, right) {
      return TypeGuard.TUndefined(left) ? TypeExtendsResult.True : TypeGuard.TUndefined(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TVoid(left, right) {
      return TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) ? TUnionRight(left, right) : TypeGuard.TUnknown(right) ? TUnknownRight(left, right) : TypeGuard.TAny(right) ? TAnyRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TVoid(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function Visit(left, right) {
      return TypeGuard.TTemplateLiteral(left) || TypeGuard.TTemplateLiteral(right) ? TTemplateLiteral(left, right) : TypeGuard.TNot(left) || TypeGuard.TNot(right) ? TNot(left, right) : TypeGuard.TAny(left) ? TAny(left, right) : TypeGuard.TArray(left) ? TArray(left, right) : TypeGuard.TBigInt(left) ? TBigInt(left, right) : TypeGuard.TBoolean(left) ? TBoolean(left, right) : TypeGuard.TAsyncIterator(left) ? TAsyncIterator(left, right) : TypeGuard.TConstructor(left) ? TConstructor(left, right) : TypeGuard.TDate(left) ? TDate(left, right) : TypeGuard.TFunction(left) ? TFunction(left, right) : TypeGuard.TInteger(left) ? TInteger(left, right) : TypeGuard.TIntersect(left) ? TIntersect(left, right) : TypeGuard.TIterator(left) ? TIterator(left, right) : TypeGuard.TLiteral(left) ? TLiteral(left, right) : TypeGuard.TNever(left) ? TNever(left, right) : TypeGuard.TNull(left) ? TNull(left, right) : TypeGuard.TNumber(left) ? TNumber(left, right) : TypeGuard.TObject(left) ? TObject(left, right) : TypeGuard.TRecord(left) ? TRecord(left, right) : TypeGuard.TString(left) ? TString(left, right) : TypeGuard.TSymbol(left) ? TSymbol(left, right) : TypeGuard.TTuple(left) ? TTuple(left, right) : TypeGuard.TPromise(left) ? TPromise(left, right) : TypeGuard.TUint8Array(left) ? TUint8Array(left, right) : TypeGuard.TUndefined(left) ? TUndefined(left, right) : TypeGuard.TUnion(left) ? TUnion(left, right) : TypeGuard.TUnknown(left) ? TUnknown(left, right) : TypeGuard.TVoid(left) ? TVoid(left, right) : Throw(`Unknown left type operand '${left[exports.Kind]}'`);
    }
    function Extends(left, right) {
      return Visit(left, right);
    }
    TypeExtends2.Extends = Extends;
  })(TypeExtends || (exports.TypeExtends = TypeExtends = {}));
  var TypeClone;
  (function(TypeClone2) {
    function ArrayType(value) {
      return value.map((value2) => Visit(value2));
    }
    function DateType(value) {
      return new Date(value.getTime());
    }
    function Uint8ArrayType(value) {
      return new Uint8Array(value);
    }
    function ObjectType(value) {
      const clonedProperties = Object.getOwnPropertyNames(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
      const clonedSymbols = Object.getOwnPropertySymbols(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
      return { ...clonedProperties, ...clonedSymbols };
    }
    function Visit(value) {
      return ValueGuard.IsArray(value) ? ArrayType(value) : ValueGuard.IsDate(value) ? DateType(value) : ValueGuard.IsUint8Array(value) ? Uint8ArrayType(value) : ValueGuard.IsObject(value) ? ObjectType(value) : value;
    }
    function Rest(schemas) {
      return schemas.map((schema) => Type(schema));
    }
    TypeClone2.Rest = Rest;
    function Type(schema, options = {}) {
      return { ...Visit(schema), ...options };
    }
    TypeClone2.Type = Type;
  })(TypeClone || (exports.TypeClone = TypeClone = {}));
  var IndexedAccessor;
  (function(IndexedAccessor2) {
    function OptionalUnwrap(schema) {
      return schema.map((schema2) => {
        const { [exports.Optional]: _, ...clone } = TypeClone.Type(schema2);
        return clone;
      });
    }
    function IsIntersectOptional(schema) {
      return schema.every((schema2) => TypeGuard.TOptional(schema2));
    }
    function IsUnionOptional(schema) {
      return schema.some((schema2) => TypeGuard.TOptional(schema2));
    }
    function ResolveIntersect(schema) {
      return IsIntersectOptional(schema.allOf) ? exports.Type.Optional(exports.Type.Intersect(OptionalUnwrap(schema.allOf))) : schema;
    }
    function ResolveUnion(schema) {
      return IsUnionOptional(schema.anyOf) ? exports.Type.Optional(exports.Type.Union(OptionalUnwrap(schema.anyOf))) : schema;
    }
    function ResolveOptional(schema) {
      return schema[exports.Kind] === "Intersect" ? ResolveIntersect(schema) : schema[exports.Kind] === "Union" ? ResolveUnion(schema) : schema;
    }
    function TIntersect(schema, key) {
      const resolved = schema.allOf.reduce((acc, schema2) => {
        const indexed = Visit(schema2, key);
        return indexed[exports.Kind] === "Never" ? acc : [...acc, indexed];
      }, []);
      return ResolveOptional(exports.Type.Intersect(resolved));
    }
    function TUnion(schema, key) {
      const resolved = schema.anyOf.map((schema2) => Visit(schema2, key));
      return ResolveOptional(exports.Type.Union(resolved));
    }
    function TObject(schema, key) {
      const property = schema.properties[key];
      return ValueGuard.IsUndefined(property) ? exports.Type.Never() : exports.Type.Union([property]);
    }
    function TTuple(schema, key) {
      const items = schema.items;
      if (ValueGuard.IsUndefined(items))
        return exports.Type.Never();
      const element = items[key];
      if (ValueGuard.IsUndefined(element))
        return exports.Type.Never();
      return element;
    }
    function Visit(schema, key) {
      return schema[exports.Kind] === "Intersect" ? TIntersect(schema, key) : schema[exports.Kind] === "Union" ? TUnion(schema, key) : schema[exports.Kind] === "Object" ? TObject(schema, key) : schema[exports.Kind] === "Tuple" ? TTuple(schema, key) : exports.Type.Never();
    }
    function Resolve(schema, keys, options = {}) {
      const resolved = keys.map((key) => Visit(schema, key.toString()));
      return ResolveOptional(exports.Type.Union(resolved, options));
    }
    IndexedAccessor2.Resolve = Resolve;
  })(IndexedAccessor || (exports.IndexedAccessor = IndexedAccessor = {}));
  var Intrinsic;
  (function(Intrinsic2) {
    function Uncapitalize(value) {
      const [first, rest] = [value.slice(0, 1), value.slice(1)];
      return `${first.toLowerCase()}${rest}`;
    }
    function Capitalize(value) {
      const [first, rest] = [value.slice(0, 1), value.slice(1)];
      return `${first.toUpperCase()}${rest}`;
    }
    function Uppercase(value) {
      return value.toUpperCase();
    }
    function Lowercase(value) {
      return value.toLowerCase();
    }
    function IntrinsicTemplateLiteral(schema, mode) {
      const expression = TemplateLiteralParser.ParseExact(schema.pattern);
      const finite = TemplateLiteralFinite.Check(expression);
      if (!finite)
        return { ...schema, pattern: IntrinsicLiteral(schema.pattern, mode) };
      const strings = [...TemplateLiteralGenerator.Generate(expression)];
      const literals = strings.map((value) => exports.Type.Literal(value));
      const mapped = IntrinsicRest(literals, mode);
      const union = exports.Type.Union(mapped);
      return exports.Type.TemplateLiteral([union]);
    }
    function IntrinsicLiteral(value, mode) {
      return typeof value === "string" ? mode === "Uncapitalize" ? Uncapitalize(value) : mode === "Capitalize" ? Capitalize(value) : mode === "Uppercase" ? Uppercase(value) : mode === "Lowercase" ? Lowercase(value) : value : value.toString();
    }
    function IntrinsicRest(schema, mode) {
      if (schema.length === 0)
        return [];
      const [L, ...R] = schema;
      return [Map2(L, mode), ...IntrinsicRest(R, mode)];
    }
    function Visit(schema, mode) {
      return TypeGuard.TTemplateLiteral(schema) ? IntrinsicTemplateLiteral(schema, mode) : TypeGuard.TUnion(schema) ? exports.Type.Union(IntrinsicRest(schema.anyOf, mode)) : TypeGuard.TLiteral(schema) ? exports.Type.Literal(IntrinsicLiteral(schema.const, mode)) : schema;
    }
    function Map2(schema, mode) {
      return Visit(schema, mode);
    }
    Intrinsic2.Map = Map2;
  })(Intrinsic || (exports.Intrinsic = Intrinsic = {}));
  var ObjectMap;
  (function(ObjectMap2) {
    function TIntersect(schema, callback) {
      return exports.Type.Intersect(schema.allOf.map((inner) => Visit(inner, callback)), { ...schema });
    }
    function TUnion(schema, callback) {
      return exports.Type.Union(schema.anyOf.map((inner) => Visit(inner, callback)), { ...schema });
    }
    function TObject(schema, callback) {
      return callback(schema);
    }
    function Visit(schema, callback) {
      return schema[exports.Kind] === "Intersect" ? TIntersect(schema, callback) : schema[exports.Kind] === "Union" ? TUnion(schema, callback) : schema[exports.Kind] === "Object" ? TObject(schema, callback) : schema;
    }
    function Map2(schema, callback, options) {
      return { ...Visit(TypeClone.Type(schema), callback), ...options };
    }
    ObjectMap2.Map = Map2;
  })(ObjectMap || (exports.ObjectMap = ObjectMap = {}));
  var KeyResolver;
  (function(KeyResolver2) {
    function UnwrapPattern(key) {
      return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
    }
    function TIntersect(schema, options) {
      return schema.allOf.reduce((acc, schema2) => [...acc, ...Visit(schema2, options)], []);
    }
    function TUnion(schema, options) {
      const sets = schema.anyOf.map((inner) => Visit(inner, options));
      return [...sets.reduce((set, outer) => outer.map((key) => sets.every((inner) => inner.includes(key)) ? set.add(key) : set)[0], new Set)];
    }
    function TObject(schema, options) {
      return Object.getOwnPropertyNames(schema.properties);
    }
    function TRecord(schema, options) {
      return options.includePatterns ? Object.getOwnPropertyNames(schema.patternProperties) : [];
    }
    function Visit(schema, options) {
      return TypeGuard.TIntersect(schema) ? TIntersect(schema, options) : TypeGuard.TUnion(schema) ? TUnion(schema, options) : TypeGuard.TObject(schema) ? TObject(schema, options) : TypeGuard.TRecord(schema) ? TRecord(schema, options) : [];
    }
    function ResolveKeys(schema, options) {
      return [...new Set(Visit(schema, options))];
    }
    KeyResolver2.ResolveKeys = ResolveKeys;
    function ResolvePattern(schema) {
      const keys = ResolveKeys(schema, { includePatterns: true });
      const pattern = keys.map((key) => `(${UnwrapPattern(key)})`);
      return `^(${pattern.join("|")})$`;
    }
    KeyResolver2.ResolvePattern = ResolvePattern;
  })(KeyResolver || (exports.KeyResolver = KeyResolver = {}));

  class KeyArrayResolverError extends TypeBoxError {
  }
  exports.KeyArrayResolverError = KeyArrayResolverError;
  var KeyArrayResolver;
  (function(KeyArrayResolver2) {
    function Resolve(schema) {
      return Array.isArray(schema) ? schema : TypeGuard.TUnionLiteral(schema) ? schema.anyOf.map((schema2) => schema2.const.toString()) : TypeGuard.TLiteral(schema) ? [schema.const] : TypeGuard.TTemplateLiteral(schema) ? (() => {
        const expression = TemplateLiteralParser.ParseExact(schema.pattern);
        if (!TemplateLiteralFinite.Check(expression))
          throw new KeyArrayResolverError("Cannot resolve keys from infinite template expression");
        return [...TemplateLiteralGenerator.Generate(expression)];
      })() : [];
    }
    KeyArrayResolver2.Resolve = Resolve;
  })(KeyArrayResolver || (exports.KeyArrayResolver = KeyArrayResolver = {}));
  var UnionResolver;
  (function(UnionResolver2) {
    function* TUnion(union) {
      for (const schema of union.anyOf) {
        if (schema[exports.Kind] === "Union") {
          yield* TUnion(schema);
        } else {
          yield schema;
        }
      }
    }
    function Resolve(union) {
      return exports.Type.Union([...TUnion(union)], { ...union });
    }
    UnionResolver2.Resolve = Resolve;
  })(UnionResolver || (exports.UnionResolver = UnionResolver = {}));

  class TemplateLiteralPatternError extends TypeBoxError {
  }
  exports.TemplateLiteralPatternError = TemplateLiteralPatternError;
  var TemplateLiteralPattern;
  (function(TemplateLiteralPattern2) {
    function Throw(message) {
      throw new TemplateLiteralPatternError(message);
    }
    function Escape(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function Visit(schema, acc) {
      return TypeGuard.TTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : TypeGuard.TUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit(schema2, acc)).join("|")})` : TypeGuard.TNumber(schema) ? `${acc}${exports.PatternNumber}` : TypeGuard.TInteger(schema) ? `${acc}${exports.PatternNumber}` : TypeGuard.TBigInt(schema) ? `${acc}${exports.PatternNumber}` : TypeGuard.TString(schema) ? `${acc}${exports.PatternString}` : TypeGuard.TLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : TypeGuard.TBoolean(schema) ? `${acc}${exports.PatternBoolean}` : Throw(`Unexpected Kind '${schema[exports.Kind]}'`);
    }
    function Create(kinds) {
      return `^${kinds.map((schema) => Visit(schema, "")).join("")}$`;
    }
    TemplateLiteralPattern2.Create = Create;
  })(TemplateLiteralPattern || (exports.TemplateLiteralPattern = TemplateLiteralPattern = {}));
  var TemplateLiteralResolver;
  (function(TemplateLiteralResolver2) {
    function Resolve(template) {
      const expression = TemplateLiteralParser.ParseExact(template.pattern);
      if (!TemplateLiteralFinite.Check(expression))
        return exports.Type.String();
      const literals = [...TemplateLiteralGenerator.Generate(expression)].map((value) => exports.Type.Literal(value));
      return exports.Type.Union(literals);
    }
    TemplateLiteralResolver2.Resolve = Resolve;
  })(TemplateLiteralResolver || (exports.TemplateLiteralResolver = TemplateLiteralResolver = {}));

  class TemplateLiteralParserError extends TypeBoxError {
  }
  exports.TemplateLiteralParserError = TemplateLiteralParserError;
  var TemplateLiteralParser;
  (function(TemplateLiteralParser2) {
    function IsNonEscaped(pattern, index, char) {
      return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
    }
    function IsOpenParen(pattern, index) {
      return IsNonEscaped(pattern, index, "(");
    }
    function IsCloseParen(pattern, index) {
      return IsNonEscaped(pattern, index, ")");
    }
    function IsSeparator(pattern, index) {
      return IsNonEscaped(pattern, index, "|");
    }
    function IsGroup(pattern) {
      if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
        return false;
      let count = 0;
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          count += 1;
        if (IsCloseParen(pattern, index))
          count -= 1;
        if (count === 0 && index !== pattern.length - 1)
          return false;
      }
      return true;
    }
    function InGroup(pattern) {
      return pattern.slice(1, pattern.length - 1);
    }
    function IsPrecedenceOr(pattern) {
      let count = 0;
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          count += 1;
        if (IsCloseParen(pattern, index))
          count -= 1;
        if (IsSeparator(pattern, index) && count === 0)
          return true;
      }
      return false;
    }
    function IsPrecedenceAnd(pattern) {
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          return true;
      }
      return false;
    }
    function Or(pattern) {
      let [count, start] = [0, 0];
      const expressions = [];
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          count += 1;
        if (IsCloseParen(pattern, index))
          count -= 1;
        if (IsSeparator(pattern, index) && count === 0) {
          const range2 = pattern.slice(start, index);
          if (range2.length > 0)
            expressions.push(Parse(range2));
          start = index + 1;
        }
      }
      const range = pattern.slice(start);
      if (range.length > 0)
        expressions.push(Parse(range));
      if (expressions.length === 0)
        return { type: "const", const: "" };
      if (expressions.length === 1)
        return expressions[0];
      return { type: "or", expr: expressions };
    }
    function And(pattern) {
      function Group(value, index) {
        if (!IsOpenParen(value, index))
          throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
        let count = 0;
        for (let scan = index;scan < value.length; scan++) {
          if (IsOpenParen(value, scan))
            count += 1;
          if (IsCloseParen(value, scan))
            count -= 1;
          if (count === 0)
            return [index, scan];
        }
        throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
      }
      function Range(pattern2, index) {
        for (let scan = index;scan < pattern2.length; scan++) {
          if (IsOpenParen(pattern2, scan))
            return [index, scan];
        }
        return [index, pattern2.length];
      }
      const expressions = [];
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index)) {
          const [start, end] = Group(pattern, index);
          const range = pattern.slice(start, end + 1);
          expressions.push(Parse(range));
          index = end;
        } else {
          const [start, end] = Range(pattern, index);
          const range = pattern.slice(start, end);
          if (range.length > 0)
            expressions.push(Parse(range));
          index = end - 1;
        }
      }
      return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
    }
    function Parse(pattern) {
      return IsGroup(pattern) ? Parse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: pattern };
    }
    TemplateLiteralParser2.Parse = Parse;
    function ParseExact(pattern) {
      return Parse(pattern.slice(1, pattern.length - 1));
    }
    TemplateLiteralParser2.ParseExact = ParseExact;
  })(TemplateLiteralParser || (exports.TemplateLiteralParser = TemplateLiteralParser = {}));

  class TemplateLiteralFiniteError extends TypeBoxError {
  }
  exports.TemplateLiteralFiniteError = TemplateLiteralFiniteError;
  var TemplateLiteralFinite;
  (function(TemplateLiteralFinite2) {
    function Throw(message) {
      throw new TemplateLiteralFiniteError(message);
    }
    function IsNumber(expression) {
      return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
    }
    function IsBoolean(expression) {
      return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
    }
    function IsString(expression) {
      return expression.type === "const" && expression.const === ".*";
    }
    function Check(expression) {
      return IsBoolean(expression) ? true : IsNumber(expression) || IsString(expression) ? false : expression.type === "and" ? expression.expr.every((expr) => Check(expr)) : expression.type === "or" ? expression.expr.every((expr) => Check(expr)) : expression.type === "const" ? true : Throw(`Unknown expression type`);
    }
    TemplateLiteralFinite2.Check = Check;
  })(TemplateLiteralFinite || (exports.TemplateLiteralFinite = TemplateLiteralFinite = {}));

  class TemplateLiteralGeneratorError extends TypeBoxError {
  }
  exports.TemplateLiteralGeneratorError = TemplateLiteralGeneratorError;
  var TemplateLiteralGenerator;
  (function(TemplateLiteralGenerator2) {
    function* Reduce(buffer) {
      if (buffer.length === 1)
        return yield* buffer[0];
      for (const left of buffer[0]) {
        for (const right of Reduce(buffer.slice(1))) {
          yield `${left}${right}`;
        }
      }
    }
    function* And(expression) {
      return yield* Reduce(expression.expr.map((expr) => [...Generate(expr)]));
    }
    function* Or(expression) {
      for (const expr of expression.expr)
        yield* Generate(expr);
    }
    function* Const(expression) {
      return yield expression.const;
    }
    function* Generate(expression) {
      return expression.type === "and" ? yield* And(expression) : expression.type === "or" ? yield* Or(expression) : expression.type === "const" ? yield* Const(expression) : (() => {
        throw new TemplateLiteralGeneratorError("Unknown expression");
      })();
    }
    TemplateLiteralGenerator2.Generate = Generate;
  })(TemplateLiteralGenerator || (exports.TemplateLiteralGenerator = TemplateLiteralGenerator = {}));
  var TemplateLiteralDslParser;
  (function(TemplateLiteralDslParser2) {
    function* ParseUnion(template) {
      const trim = template.trim().replace(/"|'/g, "");
      return trim === "boolean" ? yield exports.Type.Boolean() : trim === "number" ? yield exports.Type.Number() : trim === "bigint" ? yield exports.Type.BigInt() : trim === "string" ? yield exports.Type.String() : yield (() => {
        const literals = trim.split("|").map((literal) => exports.Type.Literal(literal.trim()));
        return literals.length === 0 ? exports.Type.Never() : literals.length === 1 ? literals[0] : exports.Type.Union(literals);
      })();
    }
    function* ParseTerminal(template) {
      if (template[1] !== "{") {
        const L = exports.Type.Literal("$");
        const R = ParseLiteral(template.slice(1));
        return yield* [L, ...R];
      }
      for (let i = 2;i < template.length; i++) {
        if (template[i] === "}") {
          const L = ParseUnion(template.slice(2, i));
          const R = ParseLiteral(template.slice(i + 1));
          return yield* [...L, ...R];
        }
      }
      yield exports.Type.Literal(template);
    }
    function* ParseLiteral(template) {
      for (let i = 0;i < template.length; i++) {
        if (template[i] === "$") {
          const L = exports.Type.Literal(template.slice(0, i));
          const R = ParseTerminal(template.slice(i));
          return yield* [L, ...R];
        }
      }
      yield exports.Type.Literal(template);
    }
    function Parse(template_dsl) {
      return [...ParseLiteral(template_dsl)];
    }
    TemplateLiteralDslParser2.Parse = Parse;
  })(TemplateLiteralDslParser || (exports.TemplateLiteralDslParser = TemplateLiteralDslParser = {}));

  class TransformDecodeBuilder {
    constructor(schema) {
      this.schema = schema;
    }
    Decode(decode) {
      return new TransformEncodeBuilder(this.schema, decode);
    }
  }
  exports.TransformDecodeBuilder = TransformDecodeBuilder;

  class TransformEncodeBuilder {
    constructor(schema, decode) {
      this.schema = schema;
      this.decode = decode;
    }
    Encode(encode) {
      const schema = TypeClone.Type(this.schema);
      return TypeGuard.TTransform(schema) ? (() => {
        const Encode = (value) => schema[exports.Transform].Encode(encode(value));
        const Decode = (value) => this.decode(schema[exports.Transform].Decode(value));
        const Codec = { Encode, Decode };
        return { ...schema, [exports.Transform]: Codec };
      })() : (() => {
        const Codec = { Decode: this.decode, Encode: encode };
        return { ...schema, [exports.Transform]: Codec };
      })();
    }
  }
  exports.TransformEncodeBuilder = TransformEncodeBuilder;
  var TypeOrdinal = 0;

  class TypeBuilderError extends TypeBoxError {
  }
  exports.TypeBuilderError = TypeBuilderError;

  class TypeBuilder {
    Create(schema) {
      return schema;
    }
    Throw(message) {
      throw new TypeBuilderError(message);
    }
    Discard(record, keys) {
      return keys.reduce((acc, key) => {
        const { [key]: _, ...rest } = acc;
        return rest;
      }, record);
    }
    Strict(schema) {
      return JSON.parse(JSON.stringify(schema));
    }
  }
  exports.TypeBuilder = TypeBuilder;

  class JsonTypeBuilder extends TypeBuilder {
    ReadonlyOptional(schema) {
      return this.Readonly(this.Optional(schema));
    }
    Readonly(schema) {
      return { ...TypeClone.Type(schema), [exports.Readonly]: "Readonly" };
    }
    Optional(schema) {
      return { ...TypeClone.Type(schema), [exports.Optional]: "Optional" };
    }
    Any(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Any" });
    }
    Array(schema, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Array", type: "array", items: TypeClone.Type(schema) });
    }
    Boolean(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Boolean", type: "boolean" });
    }
    Capitalize(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Type(schema), "Capitalize"), ...options };
    }
    Composite(objects, options) {
      const intersect = exports.Type.Intersect(objects, {});
      const keys = KeyResolver.ResolveKeys(intersect, { includePatterns: false });
      const properties = keys.reduce((acc, key) => ({ ...acc, [key]: exports.Type.Index(intersect, [key]) }), {});
      return exports.Type.Object(properties, options);
    }
    Enum(item, options = {}) {
      if (ValueGuard.IsUndefined(item))
        return this.Throw("Enum undefined or empty");
      const values1 = Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
      const values2 = [...new Set(values1)];
      const anyOf = values2.map((value) => exports.Type.Literal(value));
      return this.Union(anyOf, { ...options, [exports.Hint]: "Enum" });
    }
    Extends(left, right, trueType, falseType, options = {}) {
      switch (TypeExtends.Extends(left, right)) {
        case TypeExtendsResult.Union:
          return this.Union([TypeClone.Type(trueType, options), TypeClone.Type(falseType, options)]);
        case TypeExtendsResult.True:
          return TypeClone.Type(trueType, options);
        case TypeExtendsResult.False:
          return TypeClone.Type(falseType, options);
      }
    }
    Exclude(unionType, excludedMembers, options = {}) {
      return TypeGuard.TTemplateLiteral(unionType) ? this.Exclude(TemplateLiteralResolver.Resolve(unionType), excludedMembers, options) : TypeGuard.TTemplateLiteral(excludedMembers) ? this.Exclude(unionType, TemplateLiteralResolver.Resolve(excludedMembers), options) : TypeGuard.TUnion(unionType) ? (() => {
        const narrowed = unionType.anyOf.filter((inner) => TypeExtends.Extends(inner, excludedMembers) === TypeExtendsResult.False);
        return narrowed.length === 1 ? TypeClone.Type(narrowed[0], options) : this.Union(narrowed, options);
      })() : TypeExtends.Extends(unionType, excludedMembers) !== TypeExtendsResult.False ? this.Never(options) : TypeClone.Type(unionType, options);
    }
    Extract(type, union, options = {}) {
      return TypeGuard.TTemplateLiteral(type) ? this.Extract(TemplateLiteralResolver.Resolve(type), union, options) : TypeGuard.TTemplateLiteral(union) ? this.Extract(type, TemplateLiteralResolver.Resolve(union), options) : TypeGuard.TUnion(type) ? (() => {
        const narrowed = type.anyOf.filter((inner) => TypeExtends.Extends(inner, union) !== TypeExtendsResult.False);
        return narrowed.length === 1 ? TypeClone.Type(narrowed[0], options) : this.Union(narrowed, options);
      })() : TypeExtends.Extends(type, union) !== TypeExtendsResult.False ? TypeClone.Type(type, options) : this.Never(options);
    }
    Index(schema, unresolved, options = {}) {
      return TypeGuard.TArray(schema) && TypeGuard.TNumber(unresolved) ? (() => {
        return TypeClone.Type(schema.items, options);
      })() : TypeGuard.TTuple(schema) && TypeGuard.TNumber(unresolved) ? (() => {
        const items = ValueGuard.IsUndefined(schema.items) ? [] : schema.items;
        const cloned = items.map((schema2) => TypeClone.Type(schema2));
        return this.Union(cloned, options);
      })() : (() => {
        const keys = KeyArrayResolver.Resolve(unresolved);
        const clone = TypeClone.Type(schema);
        return IndexedAccessor.Resolve(clone, keys, options);
      })();
    }
    Integer(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Integer", type: "integer" });
    }
    Intersect(allOf, options = {}) {
      if (allOf.length === 0)
        return exports.Type.Never();
      if (allOf.length === 1)
        return TypeClone.Type(allOf[0], options);
      if (allOf.some((schema) => TypeGuard.TTransform(schema)))
        this.Throw("Cannot intersect transform types");
      const objects = allOf.every((schema) => TypeGuard.TObject(schema));
      const cloned = TypeClone.Rest(allOf);
      const clonedUnevaluatedProperties = TypeGuard.TSchema(options.unevaluatedProperties) ? { unevaluatedProperties: TypeClone.Type(options.unevaluatedProperties) } : {};
      return options.unevaluatedProperties === false || TypeGuard.TSchema(options.unevaluatedProperties) || objects ? this.Create({ ...options, ...clonedUnevaluatedProperties, [exports.Kind]: "Intersect", type: "object", allOf: cloned }) : this.Create({ ...options, ...clonedUnevaluatedProperties, [exports.Kind]: "Intersect", allOf: cloned });
    }
    KeyOf(schema, options = {}) {
      return TypeGuard.TRecord(schema) ? (() => {
        const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
        return pattern === exports.PatternNumberExact ? this.Number(options) : pattern === exports.PatternStringExact ? this.String(options) : this.Throw("Unable to resolve key type from Record key pattern");
      })() : TypeGuard.TTuple(schema) ? (() => {
        const items = ValueGuard.IsUndefined(schema.items) ? [] : schema.items;
        const literals = items.map((_, index) => exports.Type.Literal(index.toString()));
        return this.Union(literals, options);
      })() : TypeGuard.TArray(schema) ? (() => {
        return this.Number(options);
      })() : (() => {
        const keys = KeyResolver.ResolveKeys(schema, { includePatterns: false });
        if (keys.length === 0)
          return this.Never(options);
        const literals = keys.map((key) => this.Literal(key));
        return this.Union(literals, options);
      })();
    }
    Literal(value, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Literal", const: value, type: typeof value });
    }
    Lowercase(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Type(schema), "Lowercase"), ...options };
    }
    Never(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Never", not: {} });
    }
    Not(schema, options) {
      return this.Create({ ...options, [exports.Kind]: "Not", not: TypeClone.Type(schema) });
    }
    Null(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Null", type: "null" });
    }
    Number(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Number", type: "number" });
    }
    Object(properties, options = {}) {
      const propertyKeys = Object.getOwnPropertyNames(properties);
      const optionalKeys = propertyKeys.filter((key) => TypeGuard.TOptional(properties[key]));
      const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
      const clonedAdditionalProperties = TypeGuard.TSchema(options.additionalProperties) ? { additionalProperties: TypeClone.Type(options.additionalProperties) } : {};
      const clonedProperties = propertyKeys.reduce((acc, key) => ({ ...acc, [key]: TypeClone.Type(properties[key]) }), {});
      return requiredKeys.length > 0 ? this.Create({ ...options, ...clonedAdditionalProperties, [exports.Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys }) : this.Create({ ...options, ...clonedAdditionalProperties, [exports.Kind]: "Object", type: "object", properties: clonedProperties });
    }
    Omit(schema, unresolved, options = {}) {
      const keys = KeyArrayResolver.Resolve(unresolved);
      return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
        if (ValueGuard.IsArray(object.required)) {
          object.required = object.required.filter((key) => !keys.includes(key));
          if (object.required.length === 0)
            delete object.required;
        }
        for (const key of Object.getOwnPropertyNames(object.properties)) {
          if (keys.includes(key))
            delete object.properties[key];
        }
        return this.Create(object);
      }, options);
    }
    Partial(schema, options = {}) {
      return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
        const properties = Object.getOwnPropertyNames(object.properties).reduce((acc, key) => {
          return { ...acc, [key]: this.Optional(object.properties[key]) };
        }, {});
        return this.Object(properties, this.Discard(object, ["required"]));
      }, options);
    }
    Pick(schema, unresolved, options = {}) {
      const keys = KeyArrayResolver.Resolve(unresolved);
      return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
        if (ValueGuard.IsArray(object.required)) {
          object.required = object.required.filter((key) => keys.includes(key));
          if (object.required.length === 0)
            delete object.required;
        }
        for (const key of Object.getOwnPropertyNames(object.properties)) {
          if (!keys.includes(key))
            delete object.properties[key];
        }
        return this.Create(object);
      }, options);
    }
    Record(key, schema, options = {}) {
      return TypeGuard.TTemplateLiteral(key) ? (() => {
        const expression = TemplateLiteralParser.ParseExact(key.pattern);
        return TemplateLiteralFinite.Check(expression) ? this.Object([...TemplateLiteralGenerator.Generate(expression)].reduce((acc, key2) => ({ ...acc, [key2]: TypeClone.Type(schema) }), {}), options) : this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [key.pattern]: TypeClone.Type(schema) } });
      })() : TypeGuard.TUnion(key) ? (() => {
        const union = UnionResolver.Resolve(key);
        if (TypeGuard.TUnionLiteral(union)) {
          const properties = union.anyOf.reduce((acc, literal) => ({ ...acc, [literal.const]: TypeClone.Type(schema) }), {});
          return this.Object(properties, { ...options, [exports.Hint]: "Record" });
        } else
          this.Throw("Record key of type union contains non-literal types");
      })() : TypeGuard.TLiteral(key) ? (() => {
        return ValueGuard.IsString(key.const) || ValueGuard.IsNumber(key.const) ? this.Object({ [key.const]: TypeClone.Type(schema) }, options) : this.Throw("Record key of type literal is not of type string or number");
      })() : TypeGuard.TInteger(key) || TypeGuard.TNumber(key) ? (() => {
        return this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [exports.PatternNumberExact]: TypeClone.Type(schema) } });
      })() : TypeGuard.TString(key) ? (() => {
        const pattern = ValueGuard.IsUndefined(key.pattern) ? exports.PatternStringExact : key.pattern;
        return this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [pattern]: TypeClone.Type(schema) } });
      })() : this.Never();
    }
    Recursive(callback, options = {}) {
      if (ValueGuard.IsUndefined(options.$id))
        options.$id = `T${TypeOrdinal++}`;
      const thisType = callback({ [exports.Kind]: "This", $ref: `${options.$id}` });
      thisType.$id = options.$id;
      return this.Create({ ...options, [exports.Hint]: "Recursive", ...thisType });
    }
    Ref(unresolved, options = {}) {
      if (ValueGuard.IsString(unresolved))
        return this.Create({ ...options, [exports.Kind]: "Ref", $ref: unresolved });
      if (ValueGuard.IsUndefined(unresolved.$id))
        this.Throw("Reference target type must specify an $id");
      return this.Create({ ...options, [exports.Kind]: "Ref", $ref: unresolved.$id });
    }
    Required(schema, options = {}) {
      return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
        const properties = Object.getOwnPropertyNames(object.properties).reduce((acc, key) => {
          return { ...acc, [key]: this.Discard(object.properties[key], [exports.Optional]) };
        }, {});
        return this.Object(properties, object);
      }, options);
    }
    Rest(schema) {
      return TypeGuard.TTuple(schema) && !ValueGuard.IsUndefined(schema.items) ? TypeClone.Rest(schema.items) : TypeGuard.TIntersect(schema) ? TypeClone.Rest(schema.allOf) : TypeGuard.TUnion(schema) ? TypeClone.Rest(schema.anyOf) : [];
    }
    String(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "String", type: "string" });
    }
    TemplateLiteral(unresolved, options = {}) {
      const pattern = ValueGuard.IsString(unresolved) ? TemplateLiteralPattern.Create(TemplateLiteralDslParser.Parse(unresolved)) : TemplateLiteralPattern.Create(unresolved);
      return this.Create({ ...options, [exports.Kind]: "TemplateLiteral", type: "string", pattern });
    }
    Transform(schema) {
      return new TransformDecodeBuilder(schema);
    }
    Tuple(items, options = {}) {
      const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
      const clonedItems = TypeClone.Rest(items);
      const schema = items.length > 0 ? { ...options, [exports.Kind]: "Tuple", type: "array", items: clonedItems, additionalItems, minItems, maxItems } : { ...options, [exports.Kind]: "Tuple", type: "array", minItems, maxItems };
      return this.Create(schema);
    }
    Uncapitalize(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Type(schema), "Uncapitalize"), ...options };
    }
    Union(union, options = {}) {
      return TypeGuard.TTemplateLiteral(union) ? TemplateLiteralResolver.Resolve(union) : (() => {
        const anyOf = union;
        if (anyOf.length === 0)
          return this.Never(options);
        if (anyOf.length === 1)
          return this.Create(TypeClone.Type(anyOf[0], options));
        const clonedAnyOf = TypeClone.Rest(anyOf);
        return this.Create({ ...options, [exports.Kind]: "Union", anyOf: clonedAnyOf });
      })();
    }
    Unknown(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Unknown" });
    }
    Unsafe(options = {}) {
      return this.Create({ ...options, [exports.Kind]: options[exports.Kind] || "Unsafe" });
    }
    Uppercase(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Type(schema), "Uppercase"), ...options };
    }
  }
  exports.JsonTypeBuilder = JsonTypeBuilder;

  class JavaScriptTypeBuilder extends JsonTypeBuilder {
    AsyncIterator(items, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "AsyncIterator", type: "AsyncIterator", items: TypeClone.Type(items) });
    }
    Awaited(schema, options = {}) {
      const Unwrap = (rest) => rest.length > 0 ? (() => {
        const [L, ...R] = rest;
        return [this.Awaited(L), ...Unwrap(R)];
      })() : rest;
      return TypeGuard.TIntersect(schema) ? exports.Type.Intersect(Unwrap(schema.allOf)) : TypeGuard.TUnion(schema) ? exports.Type.Union(Unwrap(schema.anyOf)) : TypeGuard.TPromise(schema) ? this.Awaited(schema.item) : TypeClone.Type(schema, options);
    }
    BigInt(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "BigInt", type: "bigint" });
    }
    ConstructorParameters(schema, options = {}) {
      return this.Tuple([...schema.parameters], { ...options });
    }
    Constructor(parameters, returns, options) {
      const [clonedParameters, clonedReturns] = [TypeClone.Rest(parameters), TypeClone.Type(returns)];
      return this.Create({ ...options, [exports.Kind]: "Constructor", type: "Constructor", parameters: clonedParameters, returns: clonedReturns });
    }
    Date(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Date", type: "Date" });
    }
    Function(parameters, returns, options) {
      const [clonedParameters, clonedReturns] = [TypeClone.Rest(parameters), TypeClone.Type(returns)];
      return this.Create({ ...options, [exports.Kind]: "Function", type: "Function", parameters: clonedParameters, returns: clonedReturns });
    }
    InstanceType(schema, options = {}) {
      return TypeClone.Type(schema.returns, options);
    }
    Iterator(items, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Iterator", type: "Iterator", items: TypeClone.Type(items) });
    }
    Parameters(schema, options = {}) {
      return this.Tuple(schema.parameters, { ...options });
    }
    Promise(item, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Promise", type: "Promise", item: TypeClone.Type(item) });
    }
    RegExp(unresolved, options = {}) {
      const pattern = ValueGuard.IsString(unresolved) ? unresolved : unresolved.source;
      return this.Create({ ...options, [exports.Kind]: "String", type: "string", pattern });
    }
    RegEx(regex, options = {}) {
      return this.RegExp(regex, options);
    }
    ReturnType(schema, options = {}) {
      return TypeClone.Type(schema.returns, options);
    }
    Symbol(options) {
      return this.Create({ ...options, [exports.Kind]: "Symbol", type: "symbol" });
    }
    Undefined(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Undefined", type: "undefined" });
    }
    Uint8Array(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Uint8Array", type: "Uint8Array" });
    }
    Void(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Void", type: "void" });
    }
  }
  exports.JavaScriptTypeBuilder = JavaScriptTypeBuilder;
  exports.JsonType = new JsonTypeBuilder;
  exports.Type = new JavaScriptTypeBuilder;
});

// node_modules/@sinclair/typebox/system/system.js
var require_system = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DefaultErrorFunction = exports.TypeSystemPolicy = exports.TypeSystemErrorFunction = exports.TypeSystem = exports.TypeSystemDuplicateFormat = exports.TypeSystemDuplicateTypeKind = undefined;
  var guard_1 = require_guard();
  var errors_1 = require_errors();
  var Types = require_typebox();

  class TypeSystemDuplicateTypeKind extends Types.TypeBoxError {
    constructor(kind) {
      super(`Duplicate type kind '${kind}' detected`);
    }
  }
  exports.TypeSystemDuplicateTypeKind = TypeSystemDuplicateTypeKind;

  class TypeSystemDuplicateFormat extends Types.TypeBoxError {
    constructor(kind) {
      super(`Duplicate string format '${kind}' detected`);
    }
  }
  exports.TypeSystemDuplicateFormat = TypeSystemDuplicateFormat;
  var TypeSystem;
  (function(TypeSystem2) {
    function Type(kind, check) {
      if (Types.TypeRegistry.Has(kind))
        throw new TypeSystemDuplicateTypeKind(kind);
      Types.TypeRegistry.Set(kind, check);
      return (options = {}) => Types.Type.Unsafe({ ...options, [Types.Kind]: kind });
    }
    TypeSystem2.Type = Type;
    function Format(format, check) {
      if (Types.FormatRegistry.Has(format))
        throw new TypeSystemDuplicateFormat(format);
      Types.FormatRegistry.Set(format, check);
      return format;
    }
    TypeSystem2.Format = Format;
  })(TypeSystem || (exports.TypeSystem = TypeSystem = {}));
  var TypeSystemErrorFunction;
  (function(TypeSystemErrorFunction2) {
    let errorMessageFunction = DefaultErrorFunction;
    function Reset() {
      errorMessageFunction = DefaultErrorFunction;
    }
    TypeSystemErrorFunction2.Reset = Reset;
    function Set2(callback) {
      errorMessageFunction = callback;
    }
    TypeSystemErrorFunction2.Set = Set2;
    function Get() {
      return errorMessageFunction;
    }
    TypeSystemErrorFunction2.Get = Get;
  })(TypeSystemErrorFunction || (exports.TypeSystemErrorFunction = TypeSystemErrorFunction = {}));
  var TypeSystemPolicy;
  (function(TypeSystemPolicy2) {
    TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
    TypeSystemPolicy2.AllowArrayObject = false;
    TypeSystemPolicy2.AllowNaN = false;
    TypeSystemPolicy2.AllowNullVoid = false;
    function IsExactOptionalProperty(value, key) {
      return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
    }
    TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
    function IsObjectLike(value) {
      const isObject = (0, guard_1.IsObject)(value);
      return TypeSystemPolicy2.AllowArrayObject ? isObject : isObject && !(0, guard_1.IsArray)(value);
    }
    TypeSystemPolicy2.IsObjectLike = IsObjectLike;
    function IsRecordLike(value) {
      return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
    }
    TypeSystemPolicy2.IsRecordLike = IsRecordLike;
    function IsNumberLike(value) {
      const isNumber = (0, guard_1.IsNumber)(value);
      return TypeSystemPolicy2.AllowNaN ? isNumber : isNumber && Number.isFinite(value);
    }
    TypeSystemPolicy2.IsNumberLike = IsNumberLike;
    function IsVoidLike(value) {
      const isUndefined = (0, guard_1.IsUndefined)(value);
      return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
    }
    TypeSystemPolicy2.IsVoidLike = IsVoidLike;
  })(TypeSystemPolicy || (exports.TypeSystemPolicy = TypeSystemPolicy = {}));
  function DefaultErrorFunction(schema, errorType) {
    switch (errorType) {
      case errors_1.ValueErrorType.ArrayContains:
        return "Expected array to contain at least one matching value";
      case errors_1.ValueErrorType.ArrayMaxContains:
        return `Expected array to contain no more than ${schema.maxContains} matching values`;
      case errors_1.ValueErrorType.ArrayMinContains:
        return `Expected array to contain at least ${schema.minContains} matching values`;
      case errors_1.ValueErrorType.ArrayMaxItems:
        return `Expected array length to be less or equal to ${schema.maxItems}`;
      case errors_1.ValueErrorType.ArrayMinItems:
        return `Expected array length to be greater or equal to ${schema.minItems}`;
      case errors_1.ValueErrorType.ArrayUniqueItems:
        return "Expected array elements to be unique";
      case errors_1.ValueErrorType.Array:
        return "Expected array";
      case errors_1.ValueErrorType.AsyncIterator:
        return "Expected AsyncIterator";
      case errors_1.ValueErrorType.BigIntExclusiveMaximum:
        return `Expected bigint to be less than ${schema.exclusiveMaximum}`;
      case errors_1.ValueErrorType.BigIntExclusiveMinimum:
        return `Expected bigint to be greater than ${schema.exclusiveMinimum}`;
      case errors_1.ValueErrorType.BigIntMaximum:
        return `Expected bigint to be less or equal to ${schema.maximum}`;
      case errors_1.ValueErrorType.BigIntMinimum:
        return `Expected bigint to be greater or equal to ${schema.minimum}`;
      case errors_1.ValueErrorType.BigIntMultipleOf:
        return `Expected bigint to be a multiple of ${schema.multipleOf}`;
      case errors_1.ValueErrorType.BigInt:
        return "Expected bigint";
      case errors_1.ValueErrorType.Boolean:
        return "Expected boolean";
      case errors_1.ValueErrorType.DateExclusiveMinimumTimestamp:
        return `Expected Date timestamp to be greater than ${schema.exclusiveMinimumTimestamp}`;
      case errors_1.ValueErrorType.DateExclusiveMaximumTimestamp:
        return `Expected Date timestamp to be less than ${schema.exclusiveMaximumTimestamp}`;
      case errors_1.ValueErrorType.DateMinimumTimestamp:
        return `Expected Date timestamp to be greater or equal to ${schema.minimumTimestamp}`;
      case errors_1.ValueErrorType.DateMaximumTimestamp:
        return `Expected Date timestamp to be less or equal to ${schema.maximumTimestamp}`;
      case errors_1.ValueErrorType.DateMultipleOfTimestamp:
        return `Expected Date timestamp to be a multiple of ${schema.multipleOfTimestamp}`;
      case errors_1.ValueErrorType.Date:
        return "Expected Date";
      case errors_1.ValueErrorType.Function:
        return "Expected function";
      case errors_1.ValueErrorType.IntegerExclusiveMaximum:
        return `Expected integer to be less than ${schema.exclusiveMaximum}`;
      case errors_1.ValueErrorType.IntegerExclusiveMinimum:
        return `Expected integer to be greater than ${schema.exclusiveMinimum}`;
      case errors_1.ValueErrorType.IntegerMaximum:
        return `Expected integer to be less or equal to ${schema.maximum}`;
      case errors_1.ValueErrorType.IntegerMinimum:
        return `Expected integer to be greater or equal to ${schema.minimum}`;
      case errors_1.ValueErrorType.IntegerMultipleOf:
        return `Expected integer to be a multiple of ${schema.multipleOf}`;
      case errors_1.ValueErrorType.Integer:
        return "Expected integer";
      case errors_1.ValueErrorType.IntersectUnevaluatedProperties:
        return "Unexpected property";
      case errors_1.ValueErrorType.Intersect:
        return "Expected all values to match";
      case errors_1.ValueErrorType.Iterator:
        return "Expected Iterator";
      case errors_1.ValueErrorType.Literal:
        return `Expected ${typeof schema.const === "string" ? `'${schema.const}'` : schema.const}`;
      case errors_1.ValueErrorType.Never:
        return "Never";
      case errors_1.ValueErrorType.Not:
        return "Value should not match";
      case errors_1.ValueErrorType.Null:
        return "Expected null";
      case errors_1.ValueErrorType.NumberExclusiveMaximum:
        return `Expected number to be less than ${schema.exclusiveMaximum}`;
      case errors_1.ValueErrorType.NumberExclusiveMinimum:
        return `Expected number to be greater than ${schema.exclusiveMinimum}`;
      case errors_1.ValueErrorType.NumberMaximum:
        return `Expected number to be less or equal to ${schema.maximum}`;
      case errors_1.ValueErrorType.NumberMinimum:
        return `Expected number to be greater or equal to ${schema.minimum}`;
      case errors_1.ValueErrorType.NumberMultipleOf:
        return `Expected number to be a multiple of ${schema.multipleOf}`;
      case errors_1.ValueErrorType.Number:
        return "Expected number";
      case errors_1.ValueErrorType.Object:
        return "Expected object";
      case errors_1.ValueErrorType.ObjectAdditionalProperties:
        return "Unexpected property";
      case errors_1.ValueErrorType.ObjectMaxProperties:
        return `Expected object to have no more than ${schema.maxProperties} properties`;
      case errors_1.ValueErrorType.ObjectMinProperties:
        return `Expected object to have at least ${schema.minProperties} properties`;
      case errors_1.ValueErrorType.ObjectRequiredProperty:
        return "Required property";
      case errors_1.ValueErrorType.Promise:
        return "Expected Promise";
      case errors_1.ValueErrorType.StringFormatUnknown:
        return `Unknown format '${schema.format}'`;
      case errors_1.ValueErrorType.StringFormat:
        return `Expected string to match '${schema.format}' format`;
      case errors_1.ValueErrorType.StringMaxLength:
        return `Expected string length less or equal to ${schema.maxLength}`;
      case errors_1.ValueErrorType.StringMinLength:
        return `Expected string length greater or equal to ${schema.minLength}`;
      case errors_1.ValueErrorType.StringPattern:
        return `Expected string to match '${schema.pattern}'`;
      case errors_1.ValueErrorType.String:
        return "Expected string";
      case errors_1.ValueErrorType.Symbol:
        return "Expected symbol";
      case errors_1.ValueErrorType.TupleLength:
        return `Expected tuple to have ${schema.maxItems || 0} elements`;
      case errors_1.ValueErrorType.Tuple:
        return "Expected tuple";
      case errors_1.ValueErrorType.Uint8ArrayMaxByteLength:
        return `Expected byte length less or equal to ${schema.maxByteLength}`;
      case errors_1.ValueErrorType.Uint8ArrayMinByteLength:
        return `Expected byte length greater or equal to ${schema.minByteLength}`;
      case errors_1.ValueErrorType.Uint8Array:
        return "Expected Uint8Array";
      case errors_1.ValueErrorType.Undefined:
        return "Expected undefined";
      case errors_1.ValueErrorType.Union:
        return "Expected union value";
      case errors_1.ValueErrorType.Void:
        return "Expected void";
      case errors_1.ValueErrorType.Kind:
        return `Expected kind '${schema[Types.Kind]}'`;
      default:
        return "Unknown error type";
    }
  }
  exports.DefaultErrorFunction = DefaultErrorFunction;
});

// node_modules/@sinclair/typebox/value/deref.js
var require_deref = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Deref = exports.TypeDereferenceError = undefined;
  var typebox_1 = require_typebox();

  class TypeDereferenceError extends typebox_1.TypeBoxError {
    constructor(schema) {
      super(`Unable to dereference schema with $id '${schema.$id}'`);
      this.schema = schema;
    }
  }
  exports.TypeDereferenceError = TypeDereferenceError;
  function Deref(schema, references) {
    const index = references.findIndex((target) => target.$id === schema.$ref);
    if (index === -1)
      throw new TypeDereferenceError(schema);
    return references[index];
  }
  exports.Deref = Deref;
});

// node_modules/@sinclair/typebox/value/hash.js
var require_hash = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Hash = exports.ByteMarker = exports.ValueHashError = undefined;
  var guard_1 = require_guard();

  class ValueHashError extends Error {
    constructor(value) {
      super(`Unable to hash value`);
      this.value = value;
    }
  }
  exports.ValueHashError = ValueHashError;
  var ByteMarker;
  (function(ByteMarker2) {
    ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
    ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
    ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
    ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
    ByteMarker2[ByteMarker2["String"] = 4] = "String";
    ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
    ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
    ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
    ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
    ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
    ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
  })(ByteMarker || (exports.ByteMarker = ByteMarker = {}));
  var Accumulator = BigInt("14695981039346656037");
  var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
  var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
  var F64 = new Float64Array(1);
  var F64In = new DataView(F64.buffer);
  var F64Out = new Uint8Array(F64.buffer);
  function* NumberToBytes(value) {
    const byteCount = value === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value) + 1) / 8);
    for (let i = 0;i < byteCount; i++) {
      yield value >> 8 * (byteCount - 1 - i) & 255;
    }
  }
  function ArrayType(value) {
    FNV1A64(ByteMarker.Array);
    for (const item of value) {
      Visit(item);
    }
  }
  function BooleanType(value) {
    FNV1A64(ByteMarker.Boolean);
    FNV1A64(value ? 1 : 0);
  }
  function BigIntType(value) {
    FNV1A64(ByteMarker.BigInt);
    F64In.setBigInt64(0, value);
    for (const byte of F64Out) {
      FNV1A64(byte);
    }
  }
  function DateType(value) {
    FNV1A64(ByteMarker.Date);
    Visit(value.getTime());
  }
  function NullType(value) {
    FNV1A64(ByteMarker.Null);
  }
  function NumberType(value) {
    FNV1A64(ByteMarker.Number);
    F64In.setFloat64(0, value);
    for (const byte of F64Out) {
      FNV1A64(byte);
    }
  }
  function ObjectType(value) {
    FNV1A64(ByteMarker.Object);
    for (const key of globalThis.Object.keys(value).sort()) {
      Visit(key);
      Visit(value[key]);
    }
  }
  function StringType(value) {
    FNV1A64(ByteMarker.String);
    for (let i = 0;i < value.length; i++) {
      for (const byte of NumberToBytes(value.charCodeAt(i))) {
        FNV1A64(byte);
      }
    }
  }
  function SymbolType(value) {
    FNV1A64(ByteMarker.Symbol);
    Visit(value.description);
  }
  function Uint8ArrayType(value) {
    FNV1A64(ByteMarker.Uint8Array);
    for (let i = 0;i < value.length; i++) {
      FNV1A64(value[i]);
    }
  }
  function UndefinedType(value) {
    return FNV1A64(ByteMarker.Undefined);
  }
  function Visit(value) {
    if ((0, guard_1.IsArray)(value))
      return ArrayType(value);
    if ((0, guard_1.IsBoolean)(value))
      return BooleanType(value);
    if ((0, guard_1.IsBigInt)(value))
      return BigIntType(value);
    if ((0, guard_1.IsDate)(value))
      return DateType(value);
    if ((0, guard_1.IsNull)(value))
      return NullType(value);
    if ((0, guard_1.IsNumber)(value))
      return NumberType(value);
    if ((0, guard_1.IsPlainObject)(value))
      return ObjectType(value);
    if ((0, guard_1.IsString)(value))
      return StringType(value);
    if ((0, guard_1.IsSymbol)(value))
      return SymbolType(value);
    if ((0, guard_1.IsUint8Array)(value))
      return Uint8ArrayType(value);
    if ((0, guard_1.IsUndefined)(value))
      return UndefinedType(value);
    throw new ValueHashError(value);
  }
  function FNV1A64(byte) {
    Accumulator = Accumulator ^ Bytes[byte];
    Accumulator = Accumulator * Prime % Size;
  }
  function Hash(value) {
    Accumulator = BigInt("14695981039346656037");
    Visit(value);
    return Accumulator;
  }
  exports.Hash = Hash;
});

// node_modules/@sinclair/typebox/errors/errors.js
var require_errors = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Errors = exports.ValueErrorIterator = exports.EscapeKey = exports.ValueErrorsUnknownTypeError = exports.ValueErrorType = undefined;
  var guard_1 = require_guard();
  var system_1 = require_system();
  var deref_1 = require_deref();
  var hash_1 = require_hash();
  var Types = require_typebox();
  var ValueErrorType;
  (function(ValueErrorType2) {
    ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
    ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
    ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
    ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
    ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
    ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
    ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
    ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
    ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
    ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
    ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
    ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
    ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
    ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
    ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
    ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
    ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
    ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
    ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
    ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
    ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
    ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
    ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
    ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
    ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
    ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
    ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
    ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
    ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
    ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
    ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
    ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
    ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
    ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
    ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
    ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
    ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
    ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
    ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
    ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
    ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
    ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
    ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
    ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
    ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
    ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
    ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
    ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
    ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 48] = "StringFormatUnknown";
    ValueErrorType2[ValueErrorType2["StringFormat"] = 49] = "StringFormat";
    ValueErrorType2[ValueErrorType2["StringMaxLength"] = 50] = "StringMaxLength";
    ValueErrorType2[ValueErrorType2["StringMinLength"] = 51] = "StringMinLength";
    ValueErrorType2[ValueErrorType2["StringPattern"] = 52] = "StringPattern";
    ValueErrorType2[ValueErrorType2["String"] = 53] = "String";
    ValueErrorType2[ValueErrorType2["Symbol"] = 54] = "Symbol";
    ValueErrorType2[ValueErrorType2["TupleLength"] = 55] = "TupleLength";
    ValueErrorType2[ValueErrorType2["Tuple"] = 56] = "Tuple";
    ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 57] = "Uint8ArrayMaxByteLength";
    ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 58] = "Uint8ArrayMinByteLength";
    ValueErrorType2[ValueErrorType2["Uint8Array"] = 59] = "Uint8Array";
    ValueErrorType2[ValueErrorType2["Undefined"] = 60] = "Undefined";
    ValueErrorType2[ValueErrorType2["Union"] = 61] = "Union";
    ValueErrorType2[ValueErrorType2["Void"] = 62] = "Void";
  })(ValueErrorType || (exports.ValueErrorType = ValueErrorType = {}));

  class ValueErrorsUnknownTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueErrorsUnknownTypeError = ValueErrorsUnknownTypeError;
  function EscapeKey(key) {
    return key.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  exports.EscapeKey = EscapeKey;
  function IsDefined(value) {
    return value !== undefined;
  }

  class ValueErrorIterator {
    constructor(iterator) {
      this.iterator = iterator;
    }
    [Symbol.iterator]() {
      return this.iterator;
    }
    First() {
      const next = this.iterator.next();
      return next.done ? undefined : next.value;
    }
  }
  exports.ValueErrorIterator = ValueErrorIterator;
  function Create(type, schema, path, value) {
    return { type, schema, path, value, message: system_1.TypeSystemErrorFunction.Get()(schema, type) };
  }
  function* TAny(schema, references, path, value) {}
  function* TArray(schema, references, path, value) {
    if (!(0, guard_1.IsArray)(value)) {
      return yield Create(ValueErrorType.Array, schema, path, value);
    }
    if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
      yield Create(ValueErrorType.ArrayMinItems, schema, path, value);
    }
    if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
      yield Create(ValueErrorType.ArrayMaxItems, schema, path, value);
    }
    for (let i = 0;i < value.length; i++) {
      yield* Visit(schema.items, references, `${path}/${i}`, value[i]);
    }
    if (schema.uniqueItems === true && !function() {
      const set = new Set;
      for (const element of value) {
        const hashed = (0, hash_1.Hash)(element);
        if (set.has(hashed)) {
          return false;
        } else {
          set.add(hashed);
        }
      }
      return true;
    }()) {
      yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value);
    }
    if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
      return;
    }
    const containsSchema = IsDefined(schema.contains) ? schema.contains : Types.Type.Never();
    const containsCount = value.reduce((acc, value2, index) => Visit(containsSchema, references, `${path}${index}`, value2).next().done === true ? acc + 1 : acc, 0);
    if (containsCount === 0) {
      yield Create(ValueErrorType.ArrayContains, schema, path, value);
    }
    if ((0, guard_1.IsNumber)(schema.minContains) && containsCount < schema.minContains) {
      yield Create(ValueErrorType.ArrayMinContains, schema, path, value);
    }
    if ((0, guard_1.IsNumber)(schema.maxContains) && containsCount > schema.maxContains) {
      yield Create(ValueErrorType.ArrayMaxContains, schema, path, value);
    }
  }
  function* TAsyncIterator(schema, references, path, value) {
    if (!(0, guard_1.IsAsyncIterator)(value))
      yield Create(ValueErrorType.AsyncIterator, schema, path, value);
  }
  function* TBigInt(schema, references, path, value) {
    if (!(0, guard_1.IsBigInt)(value))
      return yield Create(ValueErrorType.BigInt, schema, path, value);
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value);
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value);
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      yield Create(ValueErrorType.BigIntMaximum, schema, path, value);
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      yield Create(ValueErrorType.BigIntMinimum, schema, path, value);
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
      yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value);
    }
  }
  function* TBoolean(schema, references, path, value) {
    if (!(0, guard_1.IsBoolean)(value))
      yield Create(ValueErrorType.Boolean, schema, path, value);
  }
  function* TConstructor(schema, references, path, value) {
    yield* Visit(schema.returns, references, path, value.prototype);
  }
  function* TDate(schema, references, path, value) {
    if (!(0, guard_1.IsDate)(value))
      return yield Create(ValueErrorType.Date, schema, path, value);
    if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
      yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value);
    }
    if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
      yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value);
    }
    if (IsDefined(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
      yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value);
    }
    if (IsDefined(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
      yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value);
    }
    if (IsDefined(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
      yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value);
    }
  }
  function* TFunction(schema, references, path, value) {
    if (!(0, guard_1.IsFunction)(value))
      yield Create(ValueErrorType.Function, schema, path, value);
  }
  function* TInteger(schema, references, path, value) {
    if (!(0, guard_1.IsInteger)(value))
      return yield Create(ValueErrorType.Integer, schema, path, value);
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value);
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value);
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      yield Create(ValueErrorType.IntegerMaximum, schema, path, value);
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      yield Create(ValueErrorType.IntegerMinimum, schema, path, value);
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value);
    }
  }
  function* TIntersect(schema, references, path, value) {
    for (const inner of schema.allOf) {
      const next = Visit(inner, references, path, value).next();
      if (!next.done) {
        yield Create(ValueErrorType.Intersect, schema, path, value);
        yield next.value;
      }
    }
    if (schema.unevaluatedProperties === false) {
      const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      for (const valueKey of Object.getOwnPropertyNames(value)) {
        if (!keyCheck.test(valueKey)) {
          yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path}/${valueKey}`, value);
        }
      }
    }
    if (typeof schema.unevaluatedProperties === "object") {
      const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      for (const valueKey of Object.getOwnPropertyNames(value)) {
        if (!keyCheck.test(valueKey)) {
          const next = Visit(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value[valueKey]).next();
          if (!next.done)
            yield next.value;
        }
      }
    }
  }
  function* TIterator(schema, references, path, value) {
    if (!(0, guard_1.IsIterator)(value))
      yield Create(ValueErrorType.Iterator, schema, path, value);
  }
  function* TLiteral(schema, references, path, value) {
    if (!(value === schema.const))
      yield Create(ValueErrorType.Literal, schema, path, value);
  }
  function* TNever(schema, references, path, value) {
    yield Create(ValueErrorType.Never, schema, path, value);
  }
  function* TNot(schema, references, path, value) {
    if (Visit(schema.not, references, path, value).next().done === true)
      yield Create(ValueErrorType.Not, schema, path, value);
  }
  function* TNull(schema, references, path, value) {
    if (!(0, guard_1.IsNull)(value))
      yield Create(ValueErrorType.Null, schema, path, value);
  }
  function* TNumber(schema, references, path, value) {
    if (!system_1.TypeSystemPolicy.IsNumberLike(value))
      return yield Create(ValueErrorType.Number, schema, path, value);
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value);
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value);
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      yield Create(ValueErrorType.NumberMaximum, schema, path, value);
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      yield Create(ValueErrorType.NumberMinimum, schema, path, value);
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      yield Create(ValueErrorType.NumberMultipleOf, schema, path, value);
    }
  }
  function* TObject(schema, references, path, value) {
    if (!system_1.TypeSystemPolicy.IsObjectLike(value))
      return yield Create(ValueErrorType.Object, schema, path, value);
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
    }
    const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
    const knownKeys = Object.getOwnPropertyNames(schema.properties);
    const unknownKeys = Object.getOwnPropertyNames(value);
    for (const requiredKey of requiredKeys) {
      if (unknownKeys.includes(requiredKey))
        continue;
      yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path}/${EscapeKey(requiredKey)}`, undefined);
    }
    if (schema.additionalProperties === false) {
      for (const valueKey of unknownKeys) {
        if (!knownKeys.includes(valueKey)) {
          yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(valueKey)}`, value[valueKey]);
        }
      }
    }
    if (typeof schema.additionalProperties === "object") {
      for (const valueKey of unknownKeys) {
        if (knownKeys.includes(valueKey))
          continue;
        yield* Visit(schema.additionalProperties, references, `${path}/${EscapeKey(valueKey)}`, value[valueKey]);
      }
    }
    for (const knownKey of knownKeys) {
      const property = schema.properties[knownKey];
      if (schema.required && schema.required.includes(knownKey)) {
        yield* Visit(property, references, `${path}/${EscapeKey(knownKey)}`, value[knownKey]);
        if (Types.ExtendsUndefined.Check(schema) && !(knownKey in value)) {
          yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path}/${EscapeKey(knownKey)}`, undefined);
        }
      } else {
        if (system_1.TypeSystemPolicy.IsExactOptionalProperty(value, knownKey)) {
          yield* Visit(property, references, `${path}/${EscapeKey(knownKey)}`, value[knownKey]);
        }
      }
    }
  }
  function* TPromise(schema, references, path, value) {
    if (!(0, guard_1.IsPromise)(value))
      yield Create(ValueErrorType.Promise, schema, path, value);
  }
  function* TRecord(schema, references, path, value) {
    if (!system_1.TypeSystemPolicy.IsRecordLike(value))
      return yield Create(ValueErrorType.Object, schema, path, value);
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
    }
    const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
    const regex = new RegExp(patternKey);
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (regex.test(propertyKey))
        yield* Visit(patternSchema, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
    if (typeof schema.additionalProperties === "object") {
      for (const [propertyKey, propertyValue] of Object.entries(value)) {
        if (!regex.test(propertyKey))
          yield* Visit(schema.additionalProperties, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
      }
    }
    if (schema.additionalProperties === false) {
      for (const [propertyKey, propertyValue] of Object.entries(value)) {
        if (regex.test(propertyKey))
          continue;
        return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
      }
    }
  }
  function* TRef(schema, references, path, value) {
    yield* Visit((0, deref_1.Deref)(schema, references), references, path, value);
  }
  function* TString(schema, references, path, value) {
    if (!(0, guard_1.IsString)(value))
      return yield Create(ValueErrorType.String, schema, path, value);
    if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
      yield Create(ValueErrorType.StringMinLength, schema, path, value);
    }
    if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
      yield Create(ValueErrorType.StringMaxLength, schema, path, value);
    }
    if ((0, guard_1.IsString)(schema.pattern)) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        yield Create(ValueErrorType.StringPattern, schema, path, value);
      }
    }
    if ((0, guard_1.IsString)(schema.format)) {
      if (!Types.FormatRegistry.Has(schema.format)) {
        yield Create(ValueErrorType.StringFormatUnknown, schema, path, value);
      } else {
        const format = Types.FormatRegistry.Get(schema.format);
        if (!format(value)) {
          yield Create(ValueErrorType.StringFormat, schema, path, value);
        }
      }
    }
  }
  function* TSymbol(schema, references, path, value) {
    if (!(0, guard_1.IsSymbol)(value))
      yield Create(ValueErrorType.Symbol, schema, path, value);
  }
  function* TTemplateLiteral(schema, references, path, value) {
    if (!(0, guard_1.IsString)(value))
      return yield Create(ValueErrorType.String, schema, path, value);
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value);
    }
  }
  function* TThis(schema, references, path, value) {
    yield* Visit((0, deref_1.Deref)(schema, references), references, path, value);
  }
  function* TTuple(schema, references, path, value) {
    if (!(0, guard_1.IsArray)(value))
      return yield Create(ValueErrorType.Tuple, schema, path, value);
    if (schema.items === undefined && !(value.length === 0)) {
      return yield Create(ValueErrorType.TupleLength, schema, path, value);
    }
    if (!(value.length === schema.maxItems)) {
      return yield Create(ValueErrorType.TupleLength, schema, path, value);
    }
    if (!schema.items) {
      return;
    }
    for (let i = 0;i < schema.items.length; i++) {
      yield* Visit(schema.items[i], references, `${path}/${i}`, value[i]);
    }
  }
  function* TUndefined(schema, references, path, value) {
    if (!(0, guard_1.IsUndefined)(value))
      yield Create(ValueErrorType.Undefined, schema, path, value);
  }
  function* TUnion(schema, references, path, value) {
    let count = 0;
    for (const subschema of schema.anyOf) {
      const errors = [...Visit(subschema, references, path, value)];
      if (errors.length === 0)
        return;
      count += errors.length;
    }
    if (count > 0) {
      yield Create(ValueErrorType.Union, schema, path, value);
    }
  }
  function* TUint8Array(schema, references, path, value) {
    if (!(0, guard_1.IsUint8Array)(value))
      return yield Create(ValueErrorType.Uint8Array, schema, path, value);
    if (IsDefined(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
      yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value);
    }
    if (IsDefined(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
      yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value);
    }
  }
  function* TUnknown(schema, references, path, value) {}
  function* TVoid(schema, references, path, value) {
    if (!system_1.TypeSystemPolicy.IsVoidLike(value))
      yield Create(ValueErrorType.Void, schema, path, value);
  }
  function* TKind(schema, references, path, value) {
    const check = Types.TypeRegistry.Get(schema[Types.Kind]);
    if (!check(schema, value))
      yield Create(ValueErrorType.Kind, schema, path, value);
  }
  function* Visit(schema, references, path, value) {
    const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema_[Types.Kind]) {
      case "Any":
        return yield* TAny(schema_, references_, path, value);
      case "Array":
        return yield* TArray(schema_, references_, path, value);
      case "AsyncIterator":
        return yield* TAsyncIterator(schema_, references_, path, value);
      case "BigInt":
        return yield* TBigInt(schema_, references_, path, value);
      case "Boolean":
        return yield* TBoolean(schema_, references_, path, value);
      case "Constructor":
        return yield* TConstructor(schema_, references_, path, value);
      case "Date":
        return yield* TDate(schema_, references_, path, value);
      case "Function":
        return yield* TFunction(schema_, references_, path, value);
      case "Integer":
        return yield* TInteger(schema_, references_, path, value);
      case "Intersect":
        return yield* TIntersect(schema_, references_, path, value);
      case "Iterator":
        return yield* TIterator(schema_, references_, path, value);
      case "Literal":
        return yield* TLiteral(schema_, references_, path, value);
      case "Never":
        return yield* TNever(schema_, references_, path, value);
      case "Not":
        return yield* TNot(schema_, references_, path, value);
      case "Null":
        return yield* TNull(schema_, references_, path, value);
      case "Number":
        return yield* TNumber(schema_, references_, path, value);
      case "Object":
        return yield* TObject(schema_, references_, path, value);
      case "Promise":
        return yield* TPromise(schema_, references_, path, value);
      case "Record":
        return yield* TRecord(schema_, references_, path, value);
      case "Ref":
        return yield* TRef(schema_, references_, path, value);
      case "String":
        return yield* TString(schema_, references_, path, value);
      case "Symbol":
        return yield* TSymbol(schema_, references_, path, value);
      case "TemplateLiteral":
        return yield* TTemplateLiteral(schema_, references_, path, value);
      case "This":
        return yield* TThis(schema_, references_, path, value);
      case "Tuple":
        return yield* TTuple(schema_, references_, path, value);
      case "Undefined":
        return yield* TUndefined(schema_, references_, path, value);
      case "Union":
        return yield* TUnion(schema_, references_, path, value);
      case "Uint8Array":
        return yield* TUint8Array(schema_, references_, path, value);
      case "Unknown":
        return yield* TUnknown(schema_, references_, path, value);
      case "Void":
        return yield* TVoid(schema_, references_, path, value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueErrorsUnknownTypeError(schema);
        return yield* TKind(schema_, references_, path, value);
    }
  }
  function Errors(...args) {
    const iterator = args.length === 3 ? Visit(args[0], args[1], "", args[2]) : Visit(args[0], [], "", args[1]);
    return new ValueErrorIterator(iterator);
  }
  exports.Errors = Errors;
});

// node_modules/@sinclair/typebox/errors/index.js
var require_errors2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(require_errors(), exports);
});

// node_modules/@sinclair/typebox/value/pointer.js
var require_pointer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ValuePointer = exports.ValuePointerRootDeleteError = exports.ValuePointerRootSetError = undefined;

  class ValuePointerRootSetError extends Error {
    constructor(value, path, update) {
      super("Cannot set root value");
      this.value = value;
      this.path = path;
      this.update = update;
    }
  }
  exports.ValuePointerRootSetError = ValuePointerRootSetError;

  class ValuePointerRootDeleteError extends Error {
    constructor(value, path) {
      super("Cannot delete root value");
      this.value = value;
      this.path = path;
    }
  }
  exports.ValuePointerRootDeleteError = ValuePointerRootDeleteError;
  var ValuePointer;
  (function(ValuePointer2) {
    function Escape(component) {
      return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    function* Format(pointer) {
      if (pointer === "")
        return;
      let [start, end] = [0, 0];
      for (let i = 0;i < pointer.length; i++) {
        const char = pointer.charAt(i);
        if (char === "/") {
          if (i === 0) {
            start = i + 1;
          } else {
            end = i;
            yield Escape(pointer.slice(start, end));
            start = i + 1;
          }
        } else {
          end = i;
        }
      }
      yield Escape(pointer.slice(start));
    }
    ValuePointer2.Format = Format;
    function Set2(value, pointer, update) {
      if (pointer === "")
        throw new ValuePointerRootSetError(value, pointer, update);
      let [owner, next, key] = [null, value, ""];
      for (const component of Format(pointer)) {
        if (next[component] === undefined)
          next[component] = {};
        owner = next;
        next = next[component];
        key = component;
      }
      owner[key] = update;
    }
    ValuePointer2.Set = Set2;
    function Delete(value, pointer) {
      if (pointer === "")
        throw new ValuePointerRootDeleteError(value, pointer);
      let [owner, next, key] = [null, value, ""];
      for (const component of Format(pointer)) {
        if (next[component] === undefined || next[component] === null)
          return;
        owner = next;
        next = next[component];
        key = component;
      }
      if (Array.isArray(owner)) {
        const index = parseInt(key);
        owner.splice(index, 1);
      } else {
        delete owner[key];
      }
    }
    ValuePointer2.Delete = Delete;
    function Has(value, pointer) {
      if (pointer === "")
        return true;
      let [owner, next, key] = [null, value, ""];
      for (const component of Format(pointer)) {
        if (next[component] === undefined)
          return false;
        owner = next;
        next = next[component];
        key = component;
      }
      return Object.getOwnPropertyNames(owner).includes(key);
    }
    ValuePointer2.Has = Has;
    function Get(value, pointer) {
      if (pointer === "")
        return value;
      let current = value;
      for (const component of Format(pointer)) {
        if (current[component] === undefined)
          return;
        current = current[component];
      }
      return current;
    }
    ValuePointer2.Get = Get;
  })(ValuePointer || (exports.ValuePointer = ValuePointer = {}));
});

// node_modules/@sinclair/typebox/value/clone.js
var require_clone = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Clone = undefined;
  var guard_1 = require_guard();
  function ObjectType(value) {
    const keys = [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
    return keys.reduce((acc, key) => ({ ...acc, [key]: Clone(value[key]) }), {});
  }
  function ArrayType(value) {
    return value.map((element) => Clone(element));
  }
  function TypedArrayType(value) {
    return value.slice();
  }
  function DateType(value) {
    return new Date(value.toISOString());
  }
  function ValueType(value) {
    return value;
  }
  function Clone(value) {
    if ((0, guard_1.IsArray)(value))
      return ArrayType(value);
    if ((0, guard_1.IsDate)(value))
      return DateType(value);
    if ((0, guard_1.IsPlainObject)(value))
      return ObjectType(value);
    if ((0, guard_1.IsTypedArray)(value))
      return TypedArrayType(value);
    if ((0, guard_1.IsValueType)(value))
      return ValueType(value);
    throw new Error("ValueClone: Unable to clone value");
  }
  exports.Clone = Clone;
});

// node_modules/@sinclair/typebox/value/delta.js
var require_delta = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Patch = exports.Diff = exports.ValueDeltaUnableToDiffUnknownValue = exports.ValueDeltaObjectWithSymbolKeyError = exports.Edit = exports.Delete = exports.Update = exports.Insert = undefined;
  var guard_1 = require_guard();
  var typebox_1 = require_typebox();
  var pointer_1 = require_pointer();
  var clone_1 = require_clone();
  exports.Insert = typebox_1.Type.Object({
    type: typebox_1.Type.Literal("insert"),
    path: typebox_1.Type.String(),
    value: typebox_1.Type.Unknown()
  });
  exports.Update = typebox_1.Type.Object({
    type: typebox_1.Type.Literal("update"),
    path: typebox_1.Type.String(),
    value: typebox_1.Type.Unknown()
  });
  exports.Delete = typebox_1.Type.Object({
    type: typebox_1.Type.Literal("delete"),
    path: typebox_1.Type.String()
  });
  exports.Edit = typebox_1.Type.Union([exports.Insert, exports.Update, exports.Delete]);

  class ValueDeltaObjectWithSymbolKeyError extends Error {
    constructor(key) {
      super("Cannot diff objects with symbol keys");
      this.key = key;
    }
  }
  exports.ValueDeltaObjectWithSymbolKeyError = ValueDeltaObjectWithSymbolKeyError;

  class ValueDeltaUnableToDiffUnknownValue extends Error {
    constructor(value) {
      super("Unable to create diff edits for unknown value");
      this.value = value;
    }
  }
  exports.ValueDeltaUnableToDiffUnknownValue = ValueDeltaUnableToDiffUnknownValue;
  function CreateUpdate(path, value) {
    return { type: "update", path, value };
  }
  function CreateInsert(path, value) {
    return { type: "insert", path, value };
  }
  function CreateDelete(path) {
    return { type: "delete", path };
  }
  function* ObjectType(path, current, next) {
    if (!(0, guard_1.IsPlainObject)(next))
      return yield CreateUpdate(path, next);
    const currentKeys = [...Object.keys(current), ...Object.getOwnPropertySymbols(current)];
    const nextKeys = [...Object.keys(next), ...Object.getOwnPropertySymbols(next)];
    for (const key of currentKeys) {
      if ((0, guard_1.IsSymbol)(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      if ((0, guard_1.IsUndefined)(next[key]) && nextKeys.includes(key))
        yield CreateUpdate(`${path}/${String(key)}`, undefined);
    }
    for (const key of nextKeys) {
      if ((0, guard_1.IsUndefined)(current[key]) || (0, guard_1.IsUndefined)(next[key]))
        continue;
      if ((0, guard_1.IsSymbol)(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      yield* Visit(`${path}/${String(key)}`, current[key], next[key]);
    }
    for (const key of nextKeys) {
      if ((0, guard_1.IsSymbol)(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      if ((0, guard_1.IsUndefined)(current[key]))
        yield CreateInsert(`${path}/${String(key)}`, next[key]);
    }
    for (const key of currentKeys.reverse()) {
      if ((0, guard_1.IsSymbol)(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      if ((0, guard_1.IsUndefined)(next[key]) && !nextKeys.includes(key))
        yield CreateDelete(`${path}/${String(key)}`);
    }
  }
  function* ArrayType(path, current, next) {
    if (!(0, guard_1.IsArray)(next))
      return yield CreateUpdate(path, next);
    for (let i = 0;i < Math.min(current.length, next.length); i++) {
      yield* Visit(`${path}/${i}`, current[i], next[i]);
    }
    for (let i = 0;i < next.length; i++) {
      if (i < current.length)
        continue;
      yield CreateInsert(`${path}/${i}`, next[i]);
    }
    for (let i = current.length - 1;i >= 0; i--) {
      if (i < next.length)
        continue;
      yield CreateDelete(`${path}/${i}`);
    }
  }
  function* TypedArrayType(path, current, next) {
    if (!(0, guard_1.IsTypedArray)(next) || current.length !== next.length || Object.getPrototypeOf(current).constructor.name !== Object.getPrototypeOf(next).constructor.name)
      return yield CreateUpdate(path, next);
    for (let i = 0;i < Math.min(current.length, next.length); i++) {
      yield* Visit(`${path}/${i}`, current[i], next[i]);
    }
  }
  function* ValueType(path, current, next) {
    if (current === next)
      return;
    yield CreateUpdate(path, next);
  }
  function* Visit(path, current, next) {
    if ((0, guard_1.IsPlainObject)(current))
      return yield* ObjectType(path, current, next);
    if ((0, guard_1.IsArray)(current))
      return yield* ArrayType(path, current, next);
    if ((0, guard_1.IsTypedArray)(current))
      return yield* TypedArrayType(path, current, next);
    if ((0, guard_1.IsValueType)(current))
      return yield* ValueType(path, current, next);
    throw new ValueDeltaUnableToDiffUnknownValue(current);
  }
  function Diff(current, next) {
    return [...Visit("", current, next)];
  }
  exports.Diff = Diff;
  function IsRootUpdate(edits) {
    return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
  }
  function IsIdentity(edits) {
    return edits.length === 0;
  }
  function Patch(current, edits) {
    if (IsRootUpdate(edits)) {
      return (0, clone_1.Clone)(edits[0].value);
    }
    if (IsIdentity(edits)) {
      return (0, clone_1.Clone)(current);
    }
    const clone = (0, clone_1.Clone)(current);
    for (const edit of edits) {
      switch (edit.type) {
        case "insert": {
          pointer_1.ValuePointer.Set(clone, edit.path, edit.value);
          break;
        }
        case "update": {
          pointer_1.ValuePointer.Set(clone, edit.path, edit.value);
          break;
        }
        case "delete": {
          pointer_1.ValuePointer.Delete(clone, edit.path);
          break;
        }
      }
    }
    return clone;
  }
  exports.Patch = Patch;
});

// node_modules/@sinclair/typebox/value/mutate.js
var require_mutate = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Mutate = exports.ValueMutateInvalidRootMutationError = exports.ValueMutateTypeMismatchError = undefined;
  var guard_1 = require_guard();
  var pointer_1 = require_pointer();
  var clone_1 = require_clone();

  class ValueMutateTypeMismatchError extends Error {
    constructor() {
      super("Cannot assign due type mismatch of assignable values");
    }
  }
  exports.ValueMutateTypeMismatchError = ValueMutateTypeMismatchError;

  class ValueMutateInvalidRootMutationError extends Error {
    constructor() {
      super("Only object and array types can be mutated at the root level");
    }
  }
  exports.ValueMutateInvalidRootMutationError = ValueMutateInvalidRootMutationError;
  function ObjectType(root, path, current, next) {
    if (!(0, guard_1.IsPlainObject)(current)) {
      pointer_1.ValuePointer.Set(root, path, (0, clone_1.Clone)(next));
    } else {
      const currentKeys = Object.keys(current);
      const nextKeys = Object.keys(next);
      for (const currentKey of currentKeys) {
        if (!nextKeys.includes(currentKey)) {
          delete current[currentKey];
        }
      }
      for (const nextKey of nextKeys) {
        if (!currentKeys.includes(nextKey)) {
          current[nextKey] = null;
        }
      }
      for (const nextKey of nextKeys) {
        Visit(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
      }
    }
  }
  function ArrayType(root, path, current, next) {
    if (!(0, guard_1.IsArray)(current)) {
      pointer_1.ValuePointer.Set(root, path, (0, clone_1.Clone)(next));
    } else {
      for (let index = 0;index < next.length; index++) {
        Visit(root, `${path}/${index}`, current[index], next[index]);
      }
      current.splice(next.length);
    }
  }
  function TypedArrayType(root, path, current, next) {
    if ((0, guard_1.IsTypedArray)(current) && current.length === next.length) {
      for (let i = 0;i < current.length; i++) {
        current[i] = next[i];
      }
    } else {
      pointer_1.ValuePointer.Set(root, path, (0, clone_1.Clone)(next));
    }
  }
  function ValueType(root, path, current, next) {
    if (current === next)
      return;
    pointer_1.ValuePointer.Set(root, path, next);
  }
  function Visit(root, path, current, next) {
    if ((0, guard_1.IsArray)(next))
      return ArrayType(root, path, current, next);
    if ((0, guard_1.IsTypedArray)(next))
      return TypedArrayType(root, path, current, next);
    if ((0, guard_1.IsPlainObject)(next))
      return ObjectType(root, path, current, next);
    if ((0, guard_1.IsValueType)(next))
      return ValueType(root, path, current, next);
  }
  function IsNonMutableValue(value) {
    return (0, guard_1.IsTypedArray)(value) || (0, guard_1.IsValueType)(value);
  }
  function IsMismatchedValue(current, next) {
    return (0, guard_1.IsPlainObject)(current) && (0, guard_1.IsArray)(next) || (0, guard_1.IsArray)(current) && (0, guard_1.IsPlainObject)(next);
  }
  function Mutate(current, next) {
    if (IsNonMutableValue(current) || IsNonMutableValue(next))
      throw new ValueMutateInvalidRootMutationError;
    if (IsMismatchedValue(current, next))
      throw new ValueMutateTypeMismatchError;
    Visit(current, "", current, next);
  }
  exports.Mutate = Mutate;
});

// node_modules/@sinclair/typebox/value/equal.js
var require_equal = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Equal = undefined;
  var guard_1 = require_guard();
  function ObjectType(left, right) {
    if (!(0, guard_1.IsPlainObject)(right))
      return false;
    const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
    const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
    if (leftKeys.length !== rightKeys.length)
      return false;
    return leftKeys.every((key) => Equal(left[key], right[key]));
  }
  function DateType(left, right) {
    return (0, guard_1.IsDate)(right) && left.getTime() === right.getTime();
  }
  function ArrayType(left, right) {
    if (!(0, guard_1.IsArray)(right) || left.length !== right.length)
      return false;
    return left.every((value, index) => Equal(value, right[index]));
  }
  function TypedArrayType(left, right) {
    if (!(0, guard_1.IsTypedArray)(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
      return false;
    return left.every((value, index) => Equal(value, right[index]));
  }
  function ValueType(left, right) {
    return left === right;
  }
  function Equal(left, right) {
    if ((0, guard_1.IsPlainObject)(left))
      return ObjectType(left, right);
    if ((0, guard_1.IsDate)(left))
      return DateType(left, right);
    if ((0, guard_1.IsTypedArray)(left))
      return TypedArrayType(left, right);
    if ((0, guard_1.IsArray)(left))
      return ArrayType(left, right);
    if ((0, guard_1.IsValueType)(left))
      return ValueType(left, right);
    throw new Error("ValueEquals: Unable to compare value");
  }
  exports.Equal = Equal;
});

// node_modules/@sinclair/typebox/system/index.js
var require_system2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ValueErrorType = undefined;
  var errors_1 = require_errors();
  Object.defineProperty(exports, "ValueErrorType", { enumerable: true, get: function() {
    return errors_1.ValueErrorType;
  } });
  __exportStar(require_system(), exports);
});

// node_modules/@sinclair/typebox/value/check.js
var require_check = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Check = exports.ValueCheckUnknownTypeError = undefined;
  var guard_1 = require_guard();
  var index_1 = require_system2();
  var deref_1 = require_deref();
  var hash_1 = require_hash();
  var Types = require_typebox();

  class ValueCheckUnknownTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super(`Unknown type`);
      this.schema = schema;
    }
  }
  exports.ValueCheckUnknownTypeError = ValueCheckUnknownTypeError;
  function IsAnyOrUnknown(schema) {
    return schema[Types.Kind] === "Any" || schema[Types.Kind] === "Unknown";
  }
  function IsDefined(value) {
    return value !== undefined;
  }
  function TAny(schema, references, value) {
    return true;
  }
  function TArray(schema, references, value) {
    if (!(0, guard_1.IsArray)(value))
      return false;
    if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
      return false;
    }
    if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
      return false;
    }
    if (!value.every((value2) => Visit(schema.items, references, value2))) {
      return false;
    }
    if (schema.uniqueItems === true && !function() {
      const set = new Set;
      for (const element of value) {
        const hashed = (0, hash_1.Hash)(element);
        if (set.has(hashed)) {
          return false;
        } else {
          set.add(hashed);
        }
      }
      return true;
    }()) {
      return false;
    }
    if (!(IsDefined(schema.contains) || (0, guard_1.IsNumber)(schema.minContains) || (0, guard_1.IsNumber)(schema.maxContains))) {
      return true;
    }
    const containsSchema = IsDefined(schema.contains) ? schema.contains : Types.Type.Never();
    const containsCount = value.reduce((acc, value2) => Visit(containsSchema, references, value2) ? acc + 1 : acc, 0);
    if (containsCount === 0) {
      return false;
    }
    if ((0, guard_1.IsNumber)(schema.minContains) && containsCount < schema.minContains) {
      return false;
    }
    if ((0, guard_1.IsNumber)(schema.maxContains) && containsCount > schema.maxContains) {
      return false;
    }
    return true;
  }
  function TAsyncIterator(schema, references, value) {
    return (0, guard_1.IsAsyncIterator)(value);
  }
  function TBigInt(schema, references, value) {
    if (!(0, guard_1.IsBigInt)(value))
      return false;
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      return false;
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      return false;
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      return false;
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
      return false;
    }
    return true;
  }
  function TBoolean(schema, references, value) {
    return (0, guard_1.IsBoolean)(value);
  }
  function TConstructor(schema, references, value) {
    return Visit(schema.returns, references, value.prototype);
  }
  function TDate(schema, references, value) {
    if (!(0, guard_1.IsDate)(value))
      return false;
    if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
      return false;
    }
    if (IsDefined(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
      return false;
    }
    if (IsDefined(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
      return false;
    }
    if (IsDefined(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
      return false;
    }
    return true;
  }
  function TFunction(schema, references, value) {
    return (0, guard_1.IsFunction)(value);
  }
  function TInteger(schema, references, value) {
    if (!(0, guard_1.IsInteger)(value)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      return false;
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      return false;
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      return false;
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      return false;
    }
    return true;
  }
  function TIntersect(schema, references, value) {
    const check1 = schema.allOf.every((schema2) => Visit(schema2, references, value));
    if (schema.unevaluatedProperties === false) {
      const keyPattern = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      const check2 = Object.getOwnPropertyNames(value).every((key) => keyPattern.test(key));
      return check1 && check2;
    } else if (Types.TypeGuard.TSchema(schema.unevaluatedProperties)) {
      const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      const check2 = Object.getOwnPropertyNames(value).every((key) => keyCheck.test(key) || Visit(schema.unevaluatedProperties, references, value[key]));
      return check1 && check2;
    } else {
      return check1;
    }
  }
  function TIterator(schema, references, value) {
    return (0, guard_1.IsIterator)(value);
  }
  function TLiteral(schema, references, value) {
    return value === schema.const;
  }
  function TNever(schema, references, value) {
    return false;
  }
  function TNot(schema, references, value) {
    return !Visit(schema.not, references, value);
  }
  function TNull(schema, references, value) {
    return (0, guard_1.IsNull)(value);
  }
  function TNumber(schema, references, value) {
    if (!index_1.TypeSystemPolicy.IsNumberLike(value))
      return false;
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      return false;
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      return false;
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      return false;
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      return false;
    }
    return true;
  }
  function TObject(schema, references, value) {
    if (!index_1.TypeSystemPolicy.IsObjectLike(value))
      return false;
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      return false;
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      return false;
    }
    const knownKeys = Object.getOwnPropertyNames(schema.properties);
    for (const knownKey of knownKeys) {
      const property = schema.properties[knownKey];
      if (schema.required && schema.required.includes(knownKey)) {
        if (!Visit(property, references, value[knownKey])) {
          return false;
        }
        if ((Types.ExtendsUndefined.Check(property) || IsAnyOrUnknown(property)) && !(knownKey in value)) {
          return false;
        }
      } else {
        if (index_1.TypeSystemPolicy.IsExactOptionalProperty(value, knownKey) && !Visit(property, references, value[knownKey])) {
          return false;
        }
      }
    }
    if (schema.additionalProperties === false) {
      const valueKeys = Object.getOwnPropertyNames(value);
      if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
        return true;
      } else {
        return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
      }
    } else if (typeof schema.additionalProperties === "object") {
      const valueKeys = Object.getOwnPropertyNames(value);
      return valueKeys.every((key) => knownKeys.includes(key) || Visit(schema.additionalProperties, references, value[key]));
    } else {
      return true;
    }
  }
  function TPromise(schema, references, value) {
    return (0, guard_1.IsPromise)(value);
  }
  function TRecord(schema, references, value) {
    if (!index_1.TypeSystemPolicy.IsRecordLike(value)) {
      return false;
    }
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      return false;
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      return false;
    }
    const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
    const regex = new RegExp(patternKey);
    const check1 = Object.entries(value).every(([key, value2]) => {
      return regex.test(key) ? Visit(patternSchema, references, value2) : true;
    });
    const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value).every(([key, value2]) => {
      return !regex.test(key) ? Visit(schema.additionalProperties, references, value2) : true;
    }) : true;
    const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value).every((key) => {
      return regex.test(key);
    }) : true;
    return check1 && check2 && check3;
  }
  function TRef(schema, references, value) {
    return Visit((0, deref_1.Deref)(schema, references), references, value);
  }
  function TString(schema, references, value) {
    if (!(0, guard_1.IsString)(value)) {
      return false;
    }
    if (IsDefined(schema.minLength)) {
      if (!(value.length >= schema.minLength))
        return false;
    }
    if (IsDefined(schema.maxLength)) {
      if (!(value.length <= schema.maxLength))
        return false;
    }
    if (IsDefined(schema.pattern)) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value))
        return false;
    }
    if (IsDefined(schema.format)) {
      if (!Types.FormatRegistry.Has(schema.format))
        return false;
      const func = Types.FormatRegistry.Get(schema.format);
      return func(value);
    }
    return true;
  }
  function TSymbol(schema, references, value) {
    return (0, guard_1.IsSymbol)(value);
  }
  function TTemplateLiteral(schema, references, value) {
    return (0, guard_1.IsString)(value) && new RegExp(schema.pattern).test(value);
  }
  function TThis(schema, references, value) {
    return Visit((0, deref_1.Deref)(schema, references), references, value);
  }
  function TTuple(schema, references, value) {
    if (!(0, guard_1.IsArray)(value)) {
      return false;
    }
    if (schema.items === undefined && !(value.length === 0)) {
      return false;
    }
    if (!(value.length === schema.maxItems)) {
      return false;
    }
    if (!schema.items) {
      return true;
    }
    for (let i = 0;i < schema.items.length; i++) {
      if (!Visit(schema.items[i], references, value[i]))
        return false;
    }
    return true;
  }
  function TUndefined(schema, references, value) {
    return (0, guard_1.IsUndefined)(value);
  }
  function TUnion(schema, references, value) {
    return schema.anyOf.some((inner) => Visit(inner, references, value));
  }
  function TUint8Array(schema, references, value) {
    if (!(0, guard_1.IsUint8Array)(value)) {
      return false;
    }
    if (IsDefined(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
      return false;
    }
    if (IsDefined(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
      return false;
    }
    return true;
  }
  function TUnknown(schema, references, value) {
    return true;
  }
  function TVoid(schema, references, value) {
    return index_1.TypeSystemPolicy.IsVoidLike(value);
  }
  function TKind(schema, references, value) {
    if (!Types.TypeRegistry.Has(schema[Types.Kind]))
      return false;
    const func = Types.TypeRegistry.Get(schema[Types.Kind]);
    return func(schema, value);
  }
  function Visit(schema, references, value) {
    const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema_[Types.Kind]) {
      case "Any":
        return TAny(schema_, references_, value);
      case "Array":
        return TArray(schema_, references_, value);
      case "AsyncIterator":
        return TAsyncIterator(schema_, references_, value);
      case "BigInt":
        return TBigInt(schema_, references_, value);
      case "Boolean":
        return TBoolean(schema_, references_, value);
      case "Constructor":
        return TConstructor(schema_, references_, value);
      case "Date":
        return TDate(schema_, references_, value);
      case "Function":
        return TFunction(schema_, references_, value);
      case "Integer":
        return TInteger(schema_, references_, value);
      case "Intersect":
        return TIntersect(schema_, references_, value);
      case "Iterator":
        return TIterator(schema_, references_, value);
      case "Literal":
        return TLiteral(schema_, references_, value);
      case "Never":
        return TNever(schema_, references_, value);
      case "Not":
        return TNot(schema_, references_, value);
      case "Null":
        return TNull(schema_, references_, value);
      case "Number":
        return TNumber(schema_, references_, value);
      case "Object":
        return TObject(schema_, references_, value);
      case "Promise":
        return TPromise(schema_, references_, value);
      case "Record":
        return TRecord(schema_, references_, value);
      case "Ref":
        return TRef(schema_, references_, value);
      case "String":
        return TString(schema_, references_, value);
      case "Symbol":
        return TSymbol(schema_, references_, value);
      case "TemplateLiteral":
        return TTemplateLiteral(schema_, references_, value);
      case "This":
        return TThis(schema_, references_, value);
      case "Tuple":
        return TTuple(schema_, references_, value);
      case "Undefined":
        return TUndefined(schema_, references_, value);
      case "Union":
        return TUnion(schema_, references_, value);
      case "Uint8Array":
        return TUint8Array(schema_, references_, value);
      case "Unknown":
        return TUnknown(schema_, references_, value);
      case "Void":
        return TVoid(schema_, references_, value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueCheckUnknownTypeError(schema_);
        return TKind(schema_, references_, value);
    }
  }
  function Check(...args) {
    return args.length === 3 ? Visit(args[0], args[1], args[2]) : Visit(args[0], [], args[1]);
  }
  exports.Check = Check;
});

// node_modules/@sinclair/typebox/value/create.js
var require_create = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Create = exports.ValueCreateRecursiveInstantiationError = exports.ValueCreateTempateLiteralTypeError = exports.ValueCreateIntersectTypeError = exports.ValueCreateNotTypeError = exports.ValueCreateNeverTypeError = exports.ValueCreateUnknownTypeError = undefined;
  var guard_1 = require_guard();
  var check_1 = require_check();
  var deref_1 = require_deref();
  var Types = require_typebox();

  class ValueCreateUnknownTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueCreateUnknownTypeError = ValueCreateUnknownTypeError;

  class ValueCreateNeverTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Never types cannot be created");
      this.schema = schema;
    }
  }
  exports.ValueCreateNeverTypeError = ValueCreateNeverTypeError;

  class ValueCreateNotTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Not types must have a default value");
      this.schema = schema;
    }
  }
  exports.ValueCreateNotTypeError = ValueCreateNotTypeError;

  class ValueCreateIntersectTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Intersect produced invalid value. Consider using a default value.");
      this.schema = schema;
    }
  }
  exports.ValueCreateIntersectTypeError = ValueCreateIntersectTypeError;

  class ValueCreateTempateLiteralTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Can only create template literal values from patterns that produce finite sequences. Consider using a default value.");
      this.schema = schema;
    }
  }
  exports.ValueCreateTempateLiteralTypeError = ValueCreateTempateLiteralTypeError;

  class ValueCreateRecursiveInstantiationError extends Types.TypeBoxError {
    constructor(schema, recursiveMaxDepth2) {
      super("Value cannot be created as recursive type may produce value of infinite size. Consider using a default.");
      this.schema = schema;
      this.recursiveMaxDepth = recursiveMaxDepth2;
    }
  }
  exports.ValueCreateRecursiveInstantiationError = ValueCreateRecursiveInstantiationError;
  function TAny(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return {};
    }
  }
  function TArray(schema, references) {
    if (schema.uniqueItems === true && !(0, guard_1.HasPropertyKey)(schema, "default")) {
      throw new Error("ValueCreate.Array: Array with the uniqueItems constraint requires a default value");
    } else if ("contains" in schema && !(0, guard_1.HasPropertyKey)(schema, "default")) {
      throw new Error("ValueCreate.Array: Array with the contains constraint requires a default value");
    } else if ("default" in schema) {
      return schema.default;
    } else if (schema.minItems !== undefined) {
      return Array.from({ length: schema.minItems }).map((item) => {
        return Visit(schema.items, references);
      });
    } else {
      return [];
    }
  }
  function TAsyncIterator(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return async function* () {}();
    }
  }
  function TBigInt(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return BigInt(0);
    }
  }
  function TBoolean(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return false;
    }
  }
  function TConstructor(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      const value = Visit(schema.returns, references);
      if (typeof value === "object" && !Array.isArray(value)) {
        return class {
          constructor() {
            for (const [key, val] of Object.entries(value)) {
              const self = this;
              self[key] = val;
            }
          }
        };
      } else {
        return class {
        };
      }
    }
  }
  function TDate(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else if (schema.minimumTimestamp !== undefined) {
      return new Date(schema.minimumTimestamp);
    } else {
      return new Date;
    }
  }
  function TFunction(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return () => Visit(schema.returns, references);
    }
  }
  function TInteger(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else if (schema.minimum !== undefined) {
      return schema.minimum;
    } else {
      return 0;
    }
  }
  function TIntersect(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      const value = schema.allOf.reduce((acc, schema2) => {
        const next = Visit(schema2, references);
        return typeof next === "object" ? { ...acc, ...next } : next;
      }, {});
      if (!(0, check_1.Check)(schema, references, value))
        throw new ValueCreateIntersectTypeError(schema);
      return value;
    }
  }
  function TIterator(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return function* () {}();
    }
  }
  function TLiteral(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return schema.const;
    }
  }
  function TNever(schema, references) {
    throw new ValueCreateNeverTypeError(schema);
  }
  function TNot(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      throw new ValueCreateNotTypeError(schema);
    }
  }
  function TNull(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return null;
    }
  }
  function TNumber(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else if (schema.minimum !== undefined) {
      return schema.minimum;
    } else {
      return 0;
    }
  }
  function TObject(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      const required = new Set(schema.required);
      return schema.default || Object.entries(schema.properties).reduce((acc, [key, schema2]) => {
        return required.has(key) ? { ...acc, [key]: Visit(schema2, references) } : { ...acc };
      }, {});
    }
  }
  function TPromise(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return Promise.resolve(Visit(schema.item, references));
    }
  }
  function TRecord(schema, references) {
    const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else if (!(keyPattern === Types.PatternStringExact || keyPattern === Types.PatternNumberExact)) {
      const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
      return propertyKeys.reduce((acc, key) => {
        return { ...acc, [key]: Visit(valueSchema, references) };
      }, {});
    } else {
      return {};
    }
  }
  function TRef(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return Visit((0, deref_1.Deref)(schema, references), references);
    }
  }
  function TString(schema, references) {
    if (schema.pattern !== undefined) {
      if (!(0, guard_1.HasPropertyKey)(schema, "default")) {
        throw new Error("ValueCreate.String: String types with patterns must specify a default value");
      } else {
        return schema.default;
      }
    } else if (schema.format !== undefined) {
      if (!(0, guard_1.HasPropertyKey)(schema, "default")) {
        throw new Error("ValueCreate.String: String types with formats must specify a default value");
      } else {
        return schema.default;
      }
    } else {
      if ((0, guard_1.HasPropertyKey)(schema, "default")) {
        return schema.default;
      } else if (schema.minLength !== undefined) {
        return Array.from({ length: schema.minLength }).map(() => ".").join("");
      } else {
        return "";
      }
    }
  }
  function TSymbol(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else if ("value" in schema) {
      return Symbol.for(schema.value);
    } else {
      return Symbol();
    }
  }
  function TTemplateLiteral(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    }
    const expression = Types.TemplateLiteralParser.ParseExact(schema.pattern);
    if (!Types.TemplateLiteralFinite.Check(expression))
      throw new ValueCreateTempateLiteralTypeError(schema);
    const sequence = Types.TemplateLiteralGenerator.Generate(expression);
    return sequence.next().value;
  }
  function TThis(schema, references) {
    if (recursiveDepth++ > recursiveMaxDepth)
      throw new ValueCreateRecursiveInstantiationError(schema, recursiveMaxDepth);
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return Visit((0, deref_1.Deref)(schema, references), references);
    }
  }
  function TTuple(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    }
    if (schema.items === undefined) {
      return [];
    } else {
      return Array.from({ length: schema.minItems }).map((_, index) => Visit(schema.items[index], references));
    }
  }
  function TUndefined(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return;
    }
  }
  function TUnion(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else if (schema.anyOf.length === 0) {
      throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
    } else {
      return Visit(schema.anyOf[0], references);
    }
  }
  function TUint8Array(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else if (schema.minByteLength !== undefined) {
      return new Uint8Array(schema.minByteLength);
    } else {
      return new Uint8Array(0);
    }
  }
  function TUnknown(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return {};
    }
  }
  function TVoid(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      return;
    }
  }
  function TKind(schema, references) {
    if ((0, guard_1.HasPropertyKey)(schema, "default")) {
      return schema.default;
    } else {
      throw new Error("User defined types must specify a default value");
    }
  }
  function Visit(schema, references) {
    const references_ = (0, guard_1.IsString)(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema_[Types.Kind]) {
      case "Any":
        return TAny(schema_, references_);
      case "Array":
        return TArray(schema_, references_);
      case "AsyncIterator":
        return TAsyncIterator(schema_, references_);
      case "BigInt":
        return TBigInt(schema_, references_);
      case "Boolean":
        return TBoolean(schema_, references_);
      case "Constructor":
        return TConstructor(schema_, references_);
      case "Date":
        return TDate(schema_, references_);
      case "Function":
        return TFunction(schema_, references_);
      case "Integer":
        return TInteger(schema_, references_);
      case "Intersect":
        return TIntersect(schema_, references_);
      case "Iterator":
        return TIterator(schema_, references_);
      case "Literal":
        return TLiteral(schema_, references_);
      case "Never":
        return TNever(schema_, references_);
      case "Not":
        return TNot(schema_, references_);
      case "Null":
        return TNull(schema_, references_);
      case "Number":
        return TNumber(schema_, references_);
      case "Object":
        return TObject(schema_, references_);
      case "Promise":
        return TPromise(schema_, references_);
      case "Record":
        return TRecord(schema_, references_);
      case "Ref":
        return TRef(schema_, references_);
      case "String":
        return TString(schema_, references_);
      case "Symbol":
        return TSymbol(schema_, references_);
      case "TemplateLiteral":
        return TTemplateLiteral(schema_, references_);
      case "This":
        return TThis(schema_, references_);
      case "Tuple":
        return TTuple(schema_, references_);
      case "Undefined":
        return TUndefined(schema_, references_);
      case "Union":
        return TUnion(schema_, references_);
      case "Uint8Array":
        return TUint8Array(schema_, references_);
      case "Unknown":
        return TUnknown(schema_, references_);
      case "Void":
        return TVoid(schema_, references_);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueCreateUnknownTypeError(schema_);
        return TKind(schema_, references_);
    }
  }
  var recursiveMaxDepth = 512;
  var recursiveDepth = 0;
  function Create(...args) {
    recursiveDepth = 0;
    return args.length === 2 ? Visit(args[0], args[1]) : Visit(args[0], []);
  }
  exports.Create = Create;
});

// node_modules/@sinclair/typebox/value/cast.js
var require_cast = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Cast = exports.Default = exports.DefaultClone = exports.ValueCastUnknownTypeError = exports.ValueCastRecursiveTypeError = exports.ValueCastNeverTypeError = exports.ValueCastArrayUniqueItemsTypeError = undefined;
  var guard_1 = require_guard();
  var create_1 = require_create();
  var check_1 = require_check();
  var clone_1 = require_clone();
  var deref_1 = require_deref();
  var Types = require_typebox();

  class ValueCastArrayUniqueItemsTypeError extends Types.TypeBoxError {
    constructor(schema, value) {
      super("Array cast produced invalid data due to uniqueItems constraint");
      this.schema = schema;
      this.value = value;
    }
  }
  exports.ValueCastArrayUniqueItemsTypeError = ValueCastArrayUniqueItemsTypeError;

  class ValueCastNeverTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Never types cannot be cast");
      this.schema = schema;
    }
  }
  exports.ValueCastNeverTypeError = ValueCastNeverTypeError;

  class ValueCastRecursiveTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Cannot cast recursive schemas");
      this.schema = schema;
    }
  }
  exports.ValueCastRecursiveTypeError = ValueCastRecursiveTypeError;

  class ValueCastUnknownTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueCastUnknownTypeError = ValueCastUnknownTypeError;
  var UnionCastCreate;
  (function(UnionCastCreate2) {
    function Score(schema, references, value) {
      if (schema[Types.Kind] === "Object" && typeof value === "object" && !(0, guard_1.IsNull)(value)) {
        const object = schema;
        const keys = Object.getOwnPropertyNames(value);
        const entries = Object.entries(object.properties);
        const [point, max] = [1 / entries.length, entries.length];
        return entries.reduce((acc, [key, schema2]) => {
          const literal = schema2[Types.Kind] === "Literal" && schema2.const === value[key] ? max : 0;
          const checks = (0, check_1.Check)(schema2, references, value[key]) ? point : 0;
          const exists = keys.includes(key) ? point : 0;
          return acc + (literal + checks + exists);
        }, 0);
      } else {
        return (0, check_1.Check)(schema, references, value) ? 1 : 0;
      }
    }
    function Select(union, references, value) {
      let [select, best] = [union.anyOf[0], 0];
      for (const schema of union.anyOf) {
        const score = Score(schema, references, value);
        if (score > best) {
          select = schema;
          best = score;
        }
      }
      return select;
    }
    function Create(union, references, value) {
      if ("default" in union) {
        return union.default;
      } else {
        const schema = Select(union, references, value);
        return Cast(schema, references, value);
      }
    }
    UnionCastCreate2.Create = Create;
  })(UnionCastCreate || (UnionCastCreate = {}));
  function DefaultClone(schema, references, value) {
    return (0, check_1.Check)(schema, references, value) ? (0, clone_1.Clone)(value) : (0, create_1.Create)(schema, references);
  }
  exports.DefaultClone = DefaultClone;
  function Default(schema, references, value) {
    return (0, check_1.Check)(schema, references, value) ? value : (0, create_1.Create)(schema, references);
  }
  exports.Default = Default;
  function TArray(schema, references, value) {
    if ((0, check_1.Check)(schema, references, value))
      return (0, clone_1.Clone)(value);
    const created = (0, guard_1.IsArray)(value) ? (0, clone_1.Clone)(value) : (0, create_1.Create)(schema, references);
    const minimum = (0, guard_1.IsNumber)(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
    const maximum = (0, guard_1.IsNumber)(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
    const casted = maximum.map((value2) => Visit(schema.items, references, value2));
    if (schema.uniqueItems !== true)
      return casted;
    const unique = [...new Set(casted)];
    if (!(0, check_1.Check)(schema, references, unique))
      throw new ValueCastArrayUniqueItemsTypeError(schema, unique);
    return unique;
  }
  function TConstructor(schema, references, value) {
    if ((0, check_1.Check)(schema, references, value))
      return (0, create_1.Create)(schema, references);
    const required = new Set(schema.returns.required || []);
    const result = function() {};
    for (const [key, property] of Object.entries(schema.returns.properties)) {
      if (!required.has(key) && value.prototype[key] === undefined)
        continue;
      result.prototype[key] = Visit(property, references, value.prototype[key]);
    }
    return result;
  }
  function TIntersect(schema, references, value) {
    const created = (0, create_1.Create)(schema, references);
    const mapped = (0, guard_1.IsPlainObject)(created) && (0, guard_1.IsPlainObject)(value) ? { ...created, ...value } : value;
    return (0, check_1.Check)(schema, references, mapped) ? mapped : (0, create_1.Create)(schema, references);
  }
  function TNever(schema, references, value) {
    throw new ValueCastNeverTypeError(schema);
  }
  function TObject(schema, references, value) {
    if ((0, check_1.Check)(schema, references, value))
      return value;
    if (value === null || typeof value !== "object")
      return (0, create_1.Create)(schema, references);
    const required = new Set(schema.required || []);
    const result = {};
    for (const [key, property] of Object.entries(schema.properties)) {
      if (!required.has(key) && value[key] === undefined)
        continue;
      result[key] = Visit(property, references, value[key]);
    }
    if (typeof schema.additionalProperties === "object") {
      const propertyNames = Object.getOwnPropertyNames(schema.properties);
      for (const propertyName of Object.getOwnPropertyNames(value)) {
        if (propertyNames.includes(propertyName))
          continue;
        result[propertyName] = Visit(schema.additionalProperties, references, value[propertyName]);
      }
    }
    return result;
  }
  function TRecord(schema, references, value) {
    if ((0, check_1.Check)(schema, references, value))
      return (0, clone_1.Clone)(value);
    if (value === null || typeof value !== "object" || Array.isArray(value) || value instanceof Date)
      return (0, create_1.Create)(schema, references);
    const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
    const subschema = schema.patternProperties[subschemaPropertyName];
    const result = {};
    for (const [propKey, propValue] of Object.entries(value)) {
      result[propKey] = Visit(subschema, references, propValue);
    }
    return result;
  }
  function TRef(schema, references, value) {
    return Visit((0, deref_1.Deref)(schema, references), references, value);
  }
  function TThis(schema, references, value) {
    return Visit((0, deref_1.Deref)(schema, references), references, value);
  }
  function TTuple(schema, references, value) {
    if ((0, check_1.Check)(schema, references, value))
      return (0, clone_1.Clone)(value);
    if (!(0, guard_1.IsArray)(value))
      return (0, create_1.Create)(schema, references);
    if (schema.items === undefined)
      return [];
    return schema.items.map((schema2, index) => Visit(schema2, references, value[index]));
  }
  function TUnion(schema, references, value) {
    return (0, check_1.Check)(schema, references, value) ? (0, clone_1.Clone)(value) : UnionCastCreate.Create(schema, references, value);
  }
  function Visit(schema, references, value) {
    const references_ = (0, guard_1.IsString)(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema[Types.Kind]) {
      case "Array":
        return TArray(schema_, references_, value);
      case "Constructor":
        return TConstructor(schema_, references_, value);
      case "Intersect":
        return TIntersect(schema_, references_, value);
      case "Never":
        return TNever(schema_, references_, value);
      case "Object":
        return TObject(schema_, references_, value);
      case "Record":
        return TRecord(schema_, references_, value);
      case "Ref":
        return TRef(schema_, references_, value);
      case "This":
        return TThis(schema_, references_, value);
      case "Tuple":
        return TTuple(schema_, references_, value);
      case "Union":
        return TUnion(schema_, references_, value);
      case "Date":
      case "Symbol":
      case "Uint8Array":
        return DefaultClone(schema, references, value);
      case "Any":
      case "AsyncIterator":
      case "BigInt":
      case "Boolean":
      case "Function":
      case "Integer":
      case "Iterator":
      case "Literal":
      case "Not":
      case "Null":
      case "Number":
      case "Promise":
      case "String":
      case "TemplateLiteral":
      case "Undefined":
      case "Unknown":
      case "Void":
        return Default(schema_, references_, value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueCastUnknownTypeError(schema_);
        return Default(schema_, references_, value);
    }
  }
  function Cast(...args) {
    return args.length === 3 ? Visit(args[0], args[1], args[2]) : Visit(args[0], [], args[1]);
  }
  exports.Cast = Cast;
});

// node_modules/@sinclair/typebox/value/convert.js
var require_convert = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Convert = exports.Default = exports.ValueConvertUnknownTypeError = undefined;
  var guard_1 = require_guard();
  var clone_1 = require_clone();
  var check_1 = require_check();
  var deref_1 = require_deref();
  var Types = require_typebox();

  class ValueConvertUnknownTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueConvertUnknownTypeError = ValueConvertUnknownTypeError;
  function IsStringNumeric(value) {
    return (0, guard_1.IsString)(value) && !isNaN(value) && !isNaN(parseFloat(value));
  }
  function IsValueToString(value) {
    return (0, guard_1.IsBigInt)(value) || (0, guard_1.IsBoolean)(value) || (0, guard_1.IsNumber)(value);
  }
  function IsValueTrue(value) {
    return value === true || (0, guard_1.IsNumber)(value) && value === 1 || (0, guard_1.IsBigInt)(value) && value === BigInt("1") || (0, guard_1.IsString)(value) && (value.toLowerCase() === "true" || value === "1");
  }
  function IsValueFalse(value) {
    return value === false || (0, guard_1.IsNumber)(value) && (value === 0 || Object.is(value, -0)) || (0, guard_1.IsBigInt)(value) && value === BigInt("0") || (0, guard_1.IsString)(value) && (value.toLowerCase() === "false" || value === "0" || value === "-0");
  }
  function IsTimeStringWithTimeZone(value) {
    return (0, guard_1.IsString)(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
  }
  function IsTimeStringWithoutTimeZone(value) {
    return (0, guard_1.IsString)(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
  }
  function IsDateTimeStringWithTimeZone(value) {
    return (0, guard_1.IsString)(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
  }
  function IsDateTimeStringWithoutTimeZone(value) {
    return (0, guard_1.IsString)(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
  }
  function IsDateString(value) {
    return (0, guard_1.IsString)(value) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value);
  }
  function TryConvertLiteralString(value, target) {
    const conversion = TryConvertString(value);
    return conversion === target ? conversion : value;
  }
  function TryConvertLiteralNumber(value, target) {
    const conversion = TryConvertNumber(value);
    return conversion === target ? conversion : value;
  }
  function TryConvertLiteralBoolean(value, target) {
    const conversion = TryConvertBoolean(value);
    return conversion === target ? conversion : value;
  }
  function TryConvertLiteral(schema, value) {
    if (typeof schema.const === "string") {
      return TryConvertLiteralString(value, schema.const);
    } else if (typeof schema.const === "number") {
      return TryConvertLiteralNumber(value, schema.const);
    } else if (typeof schema.const === "boolean") {
      return TryConvertLiteralBoolean(value, schema.const);
    } else {
      return (0, clone_1.Clone)(value);
    }
  }
  function TryConvertBoolean(value) {
    return IsValueTrue(value) ? true : IsValueFalse(value) ? false : value;
  }
  function TryConvertBigInt(value) {
    return IsStringNumeric(value) ? BigInt(parseInt(value)) : (0, guard_1.IsNumber)(value) ? BigInt(value | 0) : IsValueFalse(value) ? BigInt(0) : IsValueTrue(value) ? BigInt(1) : value;
  }
  function TryConvertString(value) {
    return IsValueToString(value) ? value.toString() : (0, guard_1.IsSymbol)(value) && value.description !== undefined ? value.description.toString() : value;
  }
  function TryConvertNumber(value) {
    return IsStringNumeric(value) ? parseFloat(value) : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
  }
  function TryConvertInteger(value) {
    return IsStringNumeric(value) ? parseInt(value) : (0, guard_1.IsNumber)(value) ? value | 0 : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
  }
  function TryConvertNull(value) {
    return (0, guard_1.IsString)(value) && value.toLowerCase() === "null" ? null : value;
  }
  function TryConvertUndefined(value) {
    return (0, guard_1.IsString)(value) && value === "undefined" ? undefined : value;
  }
  function TryConvertDate(value) {
    return (0, guard_1.IsDate)(value) ? value : (0, guard_1.IsNumber)(value) ? new Date(value) : IsValueTrue(value) ? new Date(1) : IsValueFalse(value) ? new Date(0) : IsStringNumeric(value) ? new Date(parseInt(value)) : IsTimeStringWithoutTimeZone(value) ? new Date(`1970-01-01T${value}.000Z`) : IsTimeStringWithTimeZone(value) ? new Date(`1970-01-01T${value}`) : IsDateTimeStringWithoutTimeZone(value) ? new Date(`${value}.000Z`) : IsDateTimeStringWithTimeZone(value) ? new Date(value) : IsDateString(value) ? new Date(`${value}T00:00:00.000Z`) : value;
  }
  function Default(value) {
    return value;
  }
  exports.Default = Default;
  function TArray(schema, references, value) {
    if ((0, guard_1.IsArray)(value)) {
      return value.map((value2) => Visit(schema.items, references, value2));
    }
    return value;
  }
  function TBigInt(schema, references, value) {
    return TryConvertBigInt(value);
  }
  function TBoolean(schema, references, value) {
    return TryConvertBoolean(value);
  }
  function TDate(schema, references, value) {
    return TryConvertDate(value);
  }
  function TInteger(schema, references, value) {
    return TryConvertInteger(value);
  }
  function TIntersect(schema, references, value) {
    return schema.allOf.every((schema2) => Types.TypeGuard.TObject(schema2)) ? Visit(Types.Type.Composite(schema.allOf), references, value) : Visit(schema.allOf[0], references, value);
  }
  function TLiteral(schema, references, value) {
    return TryConvertLiteral(schema, value);
  }
  function TNull(schema, references, value) {
    return TryConvertNull(value);
  }
  function TNumber(schema, references, value) {
    return TryConvertNumber(value);
  }
  function TObject(schema, references, value) {
    if ((0, guard_1.IsObject)(value))
      return Object.getOwnPropertyNames(schema.properties).reduce((acc, key) => {
        return value[key] !== undefined ? { ...acc, [key]: Visit(schema.properties[key], references, value[key]) } : { ...acc };
      }, value);
    return value;
  }
  function TRecord(schema, references, value) {
    const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
    const property = schema.patternProperties[propertyKey];
    const result = {};
    for (const [propKey, propValue] of Object.entries(value)) {
      result[propKey] = Visit(property, references, propValue);
    }
    return result;
  }
  function TRef(schema, references, value) {
    return Visit((0, deref_1.Deref)(schema, references), references, value);
  }
  function TString(schema, references, value) {
    return TryConvertString(value);
  }
  function TSymbol(schema, references, value) {
    return (0, guard_1.IsString)(value) || (0, guard_1.IsNumber)(value) ? Symbol(value) : value;
  }
  function TThis(schema, references, value) {
    return Visit((0, deref_1.Deref)(schema, references), references, value);
  }
  function TTuple(schema, references, value) {
    if ((0, guard_1.IsArray)(value) && !(0, guard_1.IsUndefined)(schema.items)) {
      return value.map((value2, index) => {
        return index < schema.items.length ? Visit(schema.items[index], references, value2) : value2;
      });
    }
    return value;
  }
  function TUndefined(schema, references, value) {
    return TryConvertUndefined(value);
  }
  function TUnion(schema, references, value) {
    for (const subschema of schema.anyOf) {
      const converted = Visit(subschema, references, value);
      if ((0, check_1.Check)(subschema, references, converted)) {
        return converted;
      }
    }
    return value;
  }
  function Visit(schema, references, value) {
    const references_ = (0, guard_1.IsString)(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema[Types.Kind]) {
      case "Array":
        return TArray(schema_, references_, value);
      case "BigInt":
        return TBigInt(schema_, references_, value);
      case "Boolean":
        return TBoolean(schema_, references_, value);
      case "Date":
        return TDate(schema_, references_, value);
      case "Integer":
        return TInteger(schema_, references_, value);
      case "Intersect":
        return TIntersect(schema_, references_, value);
      case "Literal":
        return TLiteral(schema_, references_, value);
      case "Null":
        return TNull(schema_, references_, value);
      case "Number":
        return TNumber(schema_, references_, value);
      case "Object":
        return TObject(schema_, references_, value);
      case "Record":
        return TRecord(schema_, references_, value);
      case "Ref":
        return TRef(schema_, references_, value);
      case "String":
        return TString(schema_, references_, value);
      case "Symbol":
        return TSymbol(schema_, references_, value);
      case "This":
        return TThis(schema_, references_, value);
      case "Tuple":
        return TTuple(schema_, references_, value);
      case "Undefined":
        return TUndefined(schema_, references_, value);
      case "Union":
        return TUnion(schema_, references_, value);
      case "Any":
      case "AsyncIterator":
      case "Constructor":
      case "Function":
      case "Iterator":
      case "Never":
      case "Promise":
      case "TemplateLiteral":
      case "Uint8Array":
      case "Unknown":
      case "Void":
        return Default(value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueConvertUnknownTypeError(schema_);
        return Default(value);
    }
  }
  function Convert(...args) {
    return args.length === 3 ? Visit(args[0], args[1], args[2]) : Visit(args[0], [], args[1]);
  }
  exports.Convert = Convert;
});

// node_modules/@sinclair/typebox/value/transform.js
var require_transform = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.EncodeTransform = exports.DecodeTransform = exports.HasTransform = exports.TransformEncodeError = exports.TransformDecodeError = exports.TransformEncodeCheckError = exports.TransformDecodeCheckError = undefined;
  var guard_1 = require_guard();
  var deref_1 = require_deref();
  var check_1 = require_check();
  var Types = require_typebox();

  class TransformDecodeCheckError extends Types.TypeBoxError {
    constructor(schema, value, error) {
      super(`Unable to decode due to invalid value`);
      this.schema = schema;
      this.value = value;
      this.error = error;
    }
  }
  exports.TransformDecodeCheckError = TransformDecodeCheckError;

  class TransformEncodeCheckError extends Types.TypeBoxError {
    constructor(schema, value, error) {
      super(`Unable to encode due to invalid value`);
      this.schema = schema;
      this.value = value;
      this.error = error;
    }
  }
  exports.TransformEncodeCheckError = TransformEncodeCheckError;

  class TransformDecodeError extends Types.TypeBoxError {
    constructor(schema, value, error) {
      super(`${error instanceof Error ? error.message : "Unknown error"}`);
      this.schema = schema;
      this.value = value;
    }
  }
  exports.TransformDecodeError = TransformDecodeError;

  class TransformEncodeError extends Types.TypeBoxError {
    constructor(schema, value, error) {
      super(`${error instanceof Error ? error.message : "Unknown error"}`);
      this.schema = schema;
      this.value = value;
    }
  }
  exports.TransformEncodeError = TransformEncodeError;
  var HasTransform;
  (function(HasTransform2) {
    function TArray(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Visit(schema.items, references);
    }
    function TAsyncIterator(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Visit(schema.items, references);
    }
    function TConstructor(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Visit(schema.returns, references) || schema.parameters.some((schema2) => Visit(schema2, references));
    }
    function TFunction(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Visit(schema.returns, references) || schema.parameters.some((schema2) => Visit(schema2, references));
    }
    function TIntersect(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Types.TypeGuard.TTransform(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit(schema2, references));
    }
    function TIterator(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Visit(schema.items, references);
    }
    function TNot(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Visit(schema.not, references);
    }
    function TObject(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Object.values(schema.properties).some((schema2) => Visit(schema2, references)) || Types.TypeGuard.TSchema(schema.additionalProperties) && Visit(schema.additionalProperties, references);
    }
    function TPromise(schema, references) {
      return Types.TypeGuard.TTransform(schema) || Visit(schema.item, references);
    }
    function TRecord(schema, references) {
      const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
      const property = schema.patternProperties[pattern];
      return Types.TypeGuard.TTransform(schema) || Visit(property, references) || Types.TypeGuard.TSchema(schema.additionalProperties) && Types.TypeGuard.TTransform(schema.additionalProperties);
    }
    function TRef(schema, references) {
      if (Types.TypeGuard.TTransform(schema))
        return true;
      return Visit((0, deref_1.Deref)(schema, references), references);
    }
    function TThis(schema, references) {
      if (Types.TypeGuard.TTransform(schema))
        return true;
      return Visit((0, deref_1.Deref)(schema, references), references);
    }
    function TTuple(schema, references) {
      return Types.TypeGuard.TTransform(schema) || !(0, guard_1.IsUndefined)(schema.items) && schema.items.some((schema2) => Visit(schema2, references));
    }
    function TUnion(schema, references) {
      return Types.TypeGuard.TTransform(schema) || schema.anyOf.some((schema2) => Visit(schema2, references));
    }
    function Visit(schema, references) {
      const references_ = (0, guard_1.IsString)(schema.$id) ? [...references, schema] : references;
      const schema_ = schema;
      if (schema.$id && visited.has(schema.$id))
        return false;
      if (schema.$id)
        visited.add(schema.$id);
      switch (schema[Types.Kind]) {
        case "Array":
          return TArray(schema_, references_);
        case "AsyncIterator":
          return TAsyncIterator(schema_, references_);
        case "Constructor":
          return TConstructor(schema_, references_);
        case "Function":
          return TFunction(schema_, references_);
        case "Intersect":
          return TIntersect(schema_, references_);
        case "Iterator":
          return TIterator(schema_, references_);
        case "Not":
          return TNot(schema_, references_);
        case "Object":
          return TObject(schema_, references_);
        case "Promise":
          return TPromise(schema_, references_);
        case "Record":
          return TRecord(schema_, references_);
        case "Ref":
          return TRef(schema_, references_);
        case "This":
          return TThis(schema_, references_);
        case "Tuple":
          return TTuple(schema_, references_);
        case "Union":
          return TUnion(schema_, references_);
        default:
          return Types.TypeGuard.TTransform(schema);
      }
    }
    const visited = new Set;
    function Has(schema, references) {
      visited.clear();
      return Visit(schema, references);
    }
    HasTransform2.Has = Has;
  })(HasTransform || (exports.HasTransform = HasTransform = {}));
  var DecodeTransform;
  (function(DecodeTransform2) {
    function Default(schema, value) {
      try {
        return Types.TypeGuard.TTransform(schema) ? schema[Types.Transform].Decode(value) : value;
      } catch (error) {
        throw new TransformDecodeError(schema, value, error);
      }
    }
    function TArray(schema, references, value) {
      return (0, guard_1.IsArray)(value) ? Default(schema, value.map((value2) => Visit(schema.items, references, value2))) : Default(schema, value);
    }
    function TIntersect(schema, references, value) {
      if (!(0, guard_1.IsPlainObject)(value) || (0, guard_1.IsValueType)(value))
        return Default(schema, value);
      const knownKeys = Types.KeyResolver.ResolveKeys(schema, { includePatterns: false });
      const knownProperties = knownKeys.reduce((value2, key) => {
        return key in value2 ? { ...value2, [key]: Visit(Types.IndexedAccessor.Resolve(schema, [key]), references, value2[key]) } : value2;
      }, value);
      if (!Types.TypeGuard.TTransform(schema.unevaluatedProperties)) {
        return Default(schema, knownProperties);
      }
      const unknownKeys = Object.getOwnPropertyNames(knownProperties);
      const unevaluatedProperties = schema.unevaluatedProperties;
      const unknownProperties = unknownKeys.reduce((value2, key) => {
        return !knownKeys.includes(key) ? { ...value2, [key]: Default(unevaluatedProperties, value2[key]) } : value2;
      }, knownProperties);
      return Default(schema, unknownProperties);
    }
    function TNot(schema, references, value) {
      return Default(schema, Visit(schema.not, references, value));
    }
    function TObject(schema, references, value) {
      if (!(0, guard_1.IsPlainObject)(value))
        return Default(schema, value);
      const knownKeys = Types.KeyResolver.ResolveKeys(schema, { includePatterns: false });
      const knownProperties = knownKeys.reduce((value2, key) => {
        return key in value2 ? { ...value2, [key]: Visit(schema.properties[key], references, value2[key]) } : value2;
      }, value);
      if (!Types.TypeGuard.TSchema(schema.additionalProperties)) {
        return Default(schema, knownProperties);
      }
      const unknownKeys = Object.getOwnPropertyNames(knownProperties);
      const additionalProperties = schema.additionalProperties;
      const unknownProperties = unknownKeys.reduce((value2, key) => {
        return !knownKeys.includes(key) ? { ...value2, [key]: Default(additionalProperties, value2[key]) } : value2;
      }, knownProperties);
      return Default(schema, unknownProperties);
    }
    function TRecord(schema, references, value) {
      if (!(0, guard_1.IsPlainObject)(value))
        return Default(schema, value);
      const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
      const knownKeys = new RegExp(pattern);
      const knownProperties = Object.getOwnPropertyNames(value).reduce((value2, key) => {
        return knownKeys.test(key) ? { ...value2, [key]: Visit(schema.patternProperties[pattern], references, value2[key]) } : value2;
      }, value);
      if (!Types.TypeGuard.TSchema(schema.additionalProperties)) {
        return Default(schema, knownProperties);
      }
      const unknownKeys = Object.getOwnPropertyNames(knownProperties);
      const additionalProperties = schema.additionalProperties;
      const unknownProperties = unknownKeys.reduce((value2, key) => {
        return !knownKeys.test(key) ? { ...value2, [key]: Default(additionalProperties, value2[key]) } : value2;
      }, knownProperties);
      return Default(schema, unknownProperties);
    }
    function TRef(schema, references, value) {
      const target = (0, deref_1.Deref)(schema, references);
      return Default(schema, Visit(target, references, value));
    }
    function TThis(schema, references, value) {
      const target = (0, deref_1.Deref)(schema, references);
      return Default(schema, Visit(target, references, value));
    }
    function TTuple(schema, references, value) {
      return (0, guard_1.IsArray)(value) && (0, guard_1.IsArray)(schema.items) ? Default(schema, schema.items.map((schema2, index) => Visit(schema2, references, value[index]))) : Default(schema, value);
    }
    function TUnion(schema, references, value) {
      const defaulted = Default(schema, value);
      for (const subschema of schema.anyOf) {
        if (!(0, check_1.Check)(subschema, references, defaulted))
          continue;
        return Visit(subschema, references, defaulted);
      }
      return defaulted;
    }
    function Visit(schema, references, value) {
      const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
      const schema_ = schema;
      switch (schema[Types.Kind]) {
        case "Array":
          return TArray(schema_, references_, value);
        case "Intersect":
          return TIntersect(schema_, references_, value);
        case "Not":
          return TNot(schema_, references_, value);
        case "Object":
          return TObject(schema_, references_, value);
        case "Record":
          return TRecord(schema_, references_, value);
        case "Ref":
          return TRef(schema_, references_, value);
        case "Symbol":
          return Default(schema_, value);
        case "This":
          return TThis(schema_, references_, value);
        case "Tuple":
          return TTuple(schema_, references_, value);
        case "Union":
          return TUnion(schema_, references_, value);
        default:
          return Default(schema_, value);
      }
    }
    function Decode(schema, references, value) {
      return Visit(schema, references, value);
    }
    DecodeTransform2.Decode = Decode;
  })(DecodeTransform || (exports.DecodeTransform = DecodeTransform = {}));
  var EncodeTransform;
  (function(EncodeTransform2) {
    function Default(schema, value) {
      try {
        return Types.TypeGuard.TTransform(schema) ? schema[Types.Transform].Encode(value) : value;
      } catch (error) {
        throw new TransformEncodeError(schema, value, error);
      }
    }
    function TArray(schema, references, value) {
      const defaulted = Default(schema, value);
      return (0, guard_1.IsArray)(defaulted) ? defaulted.map((value2) => Visit(schema.items, references, value2)) : defaulted;
    }
    function TIntersect(schema, references, value) {
      const defaulted = Default(schema, value);
      if (!(0, guard_1.IsPlainObject)(value) || (0, guard_1.IsValueType)(value))
        return defaulted;
      const knownKeys = Types.KeyResolver.ResolveKeys(schema, { includePatterns: false });
      const knownProperties = knownKeys.reduce((value2, key) => {
        return key in defaulted ? { ...value2, [key]: Visit(Types.IndexedAccessor.Resolve(schema, [key]), references, value2[key]) } : value2;
      }, defaulted);
      if (!Types.TypeGuard.TTransform(schema.unevaluatedProperties)) {
        return Default(schema, knownProperties);
      }
      const unknownKeys = Object.getOwnPropertyNames(knownProperties);
      const unevaluatedProperties = schema.unevaluatedProperties;
      return unknownKeys.reduce((value2, key) => {
        return !knownKeys.includes(key) ? { ...value2, [key]: Default(unevaluatedProperties, value2[key]) } : value2;
      }, knownProperties);
    }
    function TNot(schema, references, value) {
      return Default(schema.not, Default(schema, value));
    }
    function TObject(schema, references, value) {
      const defaulted = Default(schema, value);
      if (!(0, guard_1.IsPlainObject)(value))
        return defaulted;
      const knownKeys = Types.KeyResolver.ResolveKeys(schema, { includePatterns: false });
      const knownProperties = knownKeys.reduce((value2, key) => {
        return key in value2 ? { ...value2, [key]: Visit(schema.properties[key], references, value2[key]) } : value2;
      }, defaulted);
      if (!Types.TypeGuard.TSchema(schema.additionalProperties)) {
        return knownProperties;
      }
      const unknownKeys = Object.getOwnPropertyNames(knownProperties);
      const additionalProperties = schema.additionalProperties;
      return unknownKeys.reduce((value2, key) => {
        return !knownKeys.includes(key) ? { ...value2, [key]: Default(additionalProperties, value2[key]) } : value2;
      }, knownProperties);
    }
    function TRecord(schema, references, value) {
      const defaulted = Default(schema, value);
      if (!(0, guard_1.IsPlainObject)(value))
        return defaulted;
      const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
      const knownKeys = new RegExp(pattern);
      const knownProperties = Object.getOwnPropertyNames(value).reduce((value2, key) => {
        return knownKeys.test(key) ? { ...value2, [key]: Visit(schema.patternProperties[pattern], references, value2[key]) } : value2;
      }, defaulted);
      if (!Types.TypeGuard.TSchema(schema.additionalProperties)) {
        return Default(schema, knownProperties);
      }
      const unknownKeys = Object.getOwnPropertyNames(knownProperties);
      const additionalProperties = schema.additionalProperties;
      return unknownKeys.reduce((value2, key) => {
        return !knownKeys.test(key) ? { ...value2, [key]: Default(additionalProperties, value2[key]) } : value2;
      }, knownProperties);
    }
    function TRef(schema, references, value) {
      const target = (0, deref_1.Deref)(schema, references);
      const resolved = Visit(target, references, value);
      return Default(schema, resolved);
    }
    function TThis(schema, references, value) {
      const target = (0, deref_1.Deref)(schema, references);
      const resolved = Visit(target, references, value);
      return Default(schema, resolved);
    }
    function TTuple(schema, references, value) {
      const value1 = Default(schema, value);
      return (0, guard_1.IsArray)(schema.items) ? schema.items.map((schema2, index) => Visit(schema2, references, value1[index])) : [];
    }
    function TUnion(schema, references, value) {
      for (const subschema of schema.anyOf) {
        if (!(0, check_1.Check)(subschema, references, value))
          continue;
        const value1 = Visit(subschema, references, value);
        return Default(schema, value1);
      }
      for (const subschema of schema.anyOf) {
        const value1 = Visit(subschema, references, value);
        if (!(0, check_1.Check)(schema, references, value1))
          continue;
        return Default(schema, value1);
      }
      return Default(schema, value);
    }
    function Visit(schema, references, value) {
      const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
      const schema_ = schema;
      switch (schema[Types.Kind]) {
        case "Array":
          return TArray(schema_, references_, value);
        case "Intersect":
          return TIntersect(schema_, references_, value);
        case "Not":
          return TNot(schema_, references_, value);
        case "Object":
          return TObject(schema_, references_, value);
        case "Record":
          return TRecord(schema_, references_, value);
        case "Ref":
          return TRef(schema_, references_, value);
        case "This":
          return TThis(schema_, references_, value);
        case "Tuple":
          return TTuple(schema_, references_, value);
        case "Union":
          return TUnion(schema_, references_, value);
        default:
          return Default(schema_, value);
      }
    }
    function Encode(schema, references, value) {
      return Visit(schema, references, value);
    }
    EncodeTransform2.Encode = Encode;
  })(EncodeTransform || (exports.EncodeTransform = EncodeTransform = {}));
});

// node_modules/@sinclair/typebox/value/value.js
var require_value = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Value = undefined;
  var ValueErrors = require_errors2();
  var ValueMutate = require_mutate();
  var ValueHash = require_hash();
  var ValueEqual = require_equal();
  var ValueCast = require_cast();
  var ValueClone = require_clone();
  var ValueConvert = require_convert();
  var ValueCreate = require_create();
  var ValueCheck = require_check();
  var ValueDelta = require_delta();
  var ValueTransform = require_transform();
  var Value;
  (function(Value2) {
    function Cast(...args) {
      return ValueCast.Cast.apply(ValueCast, args);
    }
    Value2.Cast = Cast;
    function Create(...args) {
      return ValueCreate.Create.apply(ValueCreate, args);
    }
    Value2.Create = Create;
    function Check(...args) {
      return ValueCheck.Check.apply(ValueCheck, args);
    }
    Value2.Check = Check;
    function Convert(...args) {
      return ValueConvert.Convert.apply(ValueConvert, args);
    }
    Value2.Convert = Convert;
    function Clone(value) {
      return ValueClone.Clone(value);
    }
    Value2.Clone = Clone;
    function Decode(...args) {
      const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
      if (!Check(schema, references, value))
        throw new ValueTransform.TransformDecodeCheckError(schema, value, Errors(schema, references, value).First());
      return ValueTransform.DecodeTransform.Decode(schema, references, value);
    }
    Value2.Decode = Decode;
    function Encode(...args) {
      const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
      const encoded = ValueTransform.EncodeTransform.Encode(schema, references, value);
      if (!Check(schema, references, encoded))
        throw new ValueTransform.TransformEncodeCheckError(schema, value, Errors(schema, references, value).First());
      return encoded;
    }
    Value2.Encode = Encode;
    function Errors(...args) {
      return ValueErrors.Errors.apply(ValueErrors, args);
    }
    Value2.Errors = Errors;
    function Equal(left, right) {
      return ValueEqual.Equal(left, right);
    }
    Value2.Equal = Equal;
    function Diff(current, next) {
      return ValueDelta.Diff(current, next);
    }
    Value2.Diff = Diff;
    function Hash(value) {
      return ValueHash.Hash(value);
    }
    Value2.Hash = Hash;
    function Patch(current, edits) {
      return ValueDelta.Patch(current, edits);
    }
    Value2.Patch = Patch;
    function Mutate(current, next) {
      ValueMutate.Mutate(current, next);
    }
    Value2.Mutate = Mutate;
  })(Value || (exports.Value = Value = {}));
});

// node_modules/@sinclair/typebox/value/index.js
var require_value2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Value = exports.ValuePointer = exports.Delete = exports.Update = exports.Insert = exports.Edit = exports.ValueErrorIterator = exports.ValueErrorType = undefined;
  var index_1 = require_errors2();
  Object.defineProperty(exports, "ValueErrorType", { enumerable: true, get: function() {
    return index_1.ValueErrorType;
  } });
  Object.defineProperty(exports, "ValueErrorIterator", { enumerable: true, get: function() {
    return index_1.ValueErrorIterator;
  } });
  var delta_1 = require_delta();
  Object.defineProperty(exports, "Edit", { enumerable: true, get: function() {
    return delta_1.Edit;
  } });
  Object.defineProperty(exports, "Insert", { enumerable: true, get: function() {
    return delta_1.Insert;
  } });
  Object.defineProperty(exports, "Update", { enumerable: true, get: function() {
    return delta_1.Update;
  } });
  Object.defineProperty(exports, "Delete", { enumerable: true, get: function() {
    return delta_1.Delete;
  } });
  var pointer_1 = require_pointer();
  Object.defineProperty(exports, "ValuePointer", { enumerable: true, get: function() {
    return pointer_1.ValuePointer;
  } });
  var value_1 = require_value();
  Object.defineProperty(exports, "Value", { enumerable: true, get: function() {
    return value_1.Value;
  } });
});

// node_modules/@sinclair/typebox/compiler/compiler.js
var require_compiler = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TypeCompiler = exports.Policy = exports.TypeCompilerTypeGuardError = exports.TypeCompilerUnknownTypeError = exports.TypeCheck = undefined;
  var transform_1 = require_transform();
  var guard_1 = require_guard();
  var errors_1 = require_errors();
  var index_1 = require_system2();
  var deref_1 = require_deref();
  var hash_1 = require_hash();
  var Types = require_typebox();

  class TypeCheck {
    constructor(schema, references, checkFunc, code) {
      this.schema = schema;
      this.references = references;
      this.checkFunc = checkFunc;
      this.code = code;
      this.hasTransform = transform_1.HasTransform.Has(schema, references);
    }
    Code() {
      return this.code;
    }
    Errors(value) {
      return (0, errors_1.Errors)(this.schema, this.references, value);
    }
    Check(value) {
      return this.checkFunc(value);
    }
    Decode(value) {
      if (!this.checkFunc(value))
        throw new transform_1.TransformDecodeCheckError(this.schema, value, this.Errors(value).First());
      return this.hasTransform ? transform_1.DecodeTransform.Decode(this.schema, this.references, value) : value;
    }
    Encode(value) {
      const encoded = this.hasTransform ? transform_1.EncodeTransform.Encode(this.schema, this.references, value) : value;
      if (!this.checkFunc(encoded))
        throw new transform_1.TransformEncodeCheckError(this.schema, value, this.Errors(value).First());
      return encoded;
    }
  }
  exports.TypeCheck = TypeCheck;
  var Character;
  (function(Character2) {
    function DollarSign(code) {
      return code === 36;
    }
    Character2.DollarSign = DollarSign;
    function IsUnderscore(code) {
      return code === 95;
    }
    Character2.IsUnderscore = IsUnderscore;
    function IsAlpha(code) {
      return code >= 65 && code <= 90 || code >= 97 && code <= 122;
    }
    Character2.IsAlpha = IsAlpha;
    function IsNumeric(code) {
      return code >= 48 && code <= 57;
    }
    Character2.IsNumeric = IsNumeric;
  })(Character || (Character = {}));
  var MemberExpression;
  (function(MemberExpression2) {
    function IsFirstCharacterNumeric(value) {
      if (value.length === 0)
        return false;
      return Character.IsNumeric(value.charCodeAt(0));
    }
    function IsAccessor(value) {
      if (IsFirstCharacterNumeric(value))
        return false;
      for (let i = 0;i < value.length; i++) {
        const code = value.charCodeAt(i);
        const check = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
        if (!check)
          return false;
      }
      return true;
    }
    function EscapeHyphen(key) {
      return key.replace(/'/g, "\\'");
    }
    function Encode(object, key) {
      return IsAccessor(key) ? `${object}.${key}` : `${object}['${EscapeHyphen(key)}']`;
    }
    MemberExpression2.Encode = Encode;
  })(MemberExpression || (MemberExpression = {}));
  var Identifier;
  (function(Identifier2) {
    function Encode($id) {
      const buffer = [];
      for (let i = 0;i < $id.length; i++) {
        const code = $id.charCodeAt(i);
        if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
          buffer.push($id.charAt(i));
        } else {
          buffer.push(`_${code}_`);
        }
      }
      return buffer.join("").replace(/__/g, "_");
    }
    Identifier2.Encode = Encode;
  })(Identifier || (Identifier = {}));
  var LiteralString;
  (function(LiteralString2) {
    function Escape(content) {
      return content.replace(/'/g, "\\'");
    }
    LiteralString2.Escape = Escape;
  })(LiteralString || (LiteralString = {}));

  class TypeCompilerUnknownTypeError extends Types.TypeBoxError {
    constructor(schema) {
      super("Unknown type");
      this.schema = schema;
    }
  }
  exports.TypeCompilerUnknownTypeError = TypeCompilerUnknownTypeError;

  class TypeCompilerTypeGuardError extends Types.TypeBoxError {
    constructor(schema) {
      super("Preflight validation check failed to guard for the given schema");
      this.schema = schema;
    }
  }
  exports.TypeCompilerTypeGuardError = TypeCompilerTypeGuardError;
  var Policy;
  (function(Policy2) {
    function IsExactOptionalProperty(value, key, expression) {
      return index_1.TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value} ? ${expression} : true)` : `(${MemberExpression.Encode(value, key)} !== undefined ? ${expression} : true)`;
    }
    Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
    function IsObjectLike(value) {
      return !index_1.TypeSystemPolicy.AllowArrayObject ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}))` : `(typeof ${value} === 'object' && ${value} !== null)`;
    }
    Policy2.IsObjectLike = IsObjectLike;
    function IsRecordLike(value) {
      return !index_1.TypeSystemPolicy.AllowArrayObject ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}) && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))` : `(typeof ${value} === 'object' && ${value} !== null && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))`;
    }
    Policy2.IsRecordLike = IsRecordLike;
    function IsNumberLike(value) {
      return !index_1.TypeSystemPolicy.AllowNaN ? `(typeof ${value} === 'number' && Number.isFinite(${value}))` : `typeof ${value} === 'number'`;
    }
    Policy2.IsNumberLike = IsNumberLike;
    function IsVoidLike(value) {
      return index_1.TypeSystemPolicy.AllowNullVoid ? `(${value} === undefined || ${value} === null)` : `${value} === undefined`;
    }
    Policy2.IsVoidLike = IsVoidLike;
  })(Policy || (exports.Policy = Policy = {}));
  var TypeCompiler;
  (function(TypeCompiler2) {
    function IsAnyOrUnknown(schema) {
      return schema[Types.Kind] === "Any" || schema[Types.Kind] === "Unknown";
    }
    function* TAny(schema, references, value) {
      yield "true";
    }
    function* TArray(schema, references, value) {
      yield `Array.isArray(${value})`;
      const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
      if ((0, guard_1.IsNumber)(schema.maxItems))
        yield `${value}.length <= ${schema.maxItems}`;
      if ((0, guard_1.IsNumber)(schema.minItems))
        yield `${value}.length >= ${schema.minItems}`;
      const elementExpression = CreateExpression(schema.items, references, "value");
      yield `${value}.every((${parameter}) => ${elementExpression})`;
      if (Types.TypeGuard.TSchema(schema.contains) || (0, guard_1.IsNumber)(schema.minContains) || (0, guard_1.IsNumber)(schema.maxContains)) {
        const containsSchema = Types.TypeGuard.TSchema(schema.contains) ? schema.contains : Types.Type.Never();
        const checkExpression = CreateExpression(containsSchema, references, "value");
        const checkMinContains = (0, guard_1.IsNumber)(schema.minContains) ? [`(count >= ${schema.minContains})`] : [];
        const checkMaxContains = (0, guard_1.IsNumber)(schema.maxContains) ? [`(count <= ${schema.maxContains})`] : [];
        const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
        const check = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
        yield `((${parameter}) => { ${checkCount}; return ${check}})(${value})`;
      }
      if (schema.uniqueItems === true) {
        const check = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
        const block = `const set = new Set(); for(const element of value) { ${check} }`;
        yield `((${parameter}) => { ${block} )(${value})`;
      }
    }
    function* TAsyncIterator(schema, references, value) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${value})`;
    }
    function* TBigInt(schema, references, value) {
      yield `(typeof ${value} === 'bigint')`;
      if ((0, guard_1.IsBigInt)(schema.exclusiveMaximum))
        yield `${value} < BigInt(${schema.exclusiveMaximum})`;
      if ((0, guard_1.IsBigInt)(schema.exclusiveMinimum))
        yield `${value} > BigInt(${schema.exclusiveMinimum})`;
      if ((0, guard_1.IsBigInt)(schema.maximum))
        yield `${value} <= BigInt(${schema.maximum})`;
      if ((0, guard_1.IsBigInt)(schema.minimum))
        yield `${value} >= BigInt(${schema.minimum})`;
      if ((0, guard_1.IsBigInt)(schema.multipleOf))
        yield `(${value} % BigInt(${schema.multipleOf})) === 0`;
    }
    function* TBoolean(schema, references, value) {
      yield `(typeof ${value} === 'boolean')`;
    }
    function* TConstructor(schema, references, value) {
      yield* Visit(schema.returns, references, `${value}.prototype`);
    }
    function* TDate(schema, references, value) {
      yield `(${value} instanceof Date) && Number.isFinite(${value}.getTime())`;
      if ((0, guard_1.IsNumber)(schema.exclusiveMaximumTimestamp))
        yield `${value}.getTime() < ${schema.exclusiveMaximumTimestamp}`;
      if ((0, guard_1.IsNumber)(schema.exclusiveMinimumTimestamp))
        yield `${value}.getTime() > ${schema.exclusiveMinimumTimestamp}`;
      if ((0, guard_1.IsNumber)(schema.maximumTimestamp))
        yield `${value}.getTime() <= ${schema.maximumTimestamp}`;
      if ((0, guard_1.IsNumber)(schema.minimumTimestamp))
        yield `${value}.getTime() >= ${schema.minimumTimestamp}`;
      if ((0, guard_1.IsNumber)(schema.multipleOfTimestamp))
        yield `(${value}.getTime() % ${schema.multipleOfTimestamp}) === 0`;
    }
    function* TFunction(schema, references, value) {
      yield `(typeof ${value} === 'function')`;
    }
    function* TInteger(schema, references, value) {
      yield `(typeof ${value} === 'number' && Number.isInteger(${value}))`;
      if ((0, guard_1.IsNumber)(schema.exclusiveMaximum))
        yield `${value} < ${schema.exclusiveMaximum}`;
      if ((0, guard_1.IsNumber)(schema.exclusiveMinimum))
        yield `${value} > ${schema.exclusiveMinimum}`;
      if ((0, guard_1.IsNumber)(schema.maximum))
        yield `${value} <= ${schema.maximum}`;
      if ((0, guard_1.IsNumber)(schema.minimum))
        yield `${value} >= ${schema.minimum}`;
      if ((0, guard_1.IsNumber)(schema.multipleOf))
        yield `(${value} % ${schema.multipleOf}) === 0`;
    }
    function* TIntersect(schema, references, value) {
      const check1 = schema.allOf.map((schema2) => CreateExpression(schema2, references, value)).join(" && ");
      if (schema.unevaluatedProperties === false) {
        const keyCheck = CreateVariable(`${new RegExp(Types.KeyResolver.ResolvePattern(schema))};`);
        const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key))`;
        yield `(${check1} && ${check2})`;
      } else if (Types.TypeGuard.TSchema(schema.unevaluatedProperties)) {
        const keyCheck = CreateVariable(`${new RegExp(Types.KeyResolver.ResolvePattern(schema))};`);
        const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema.unevaluatedProperties, references, `${value}[key]`)})`;
        yield `(${check1} && ${check2})`;
      } else {
        yield `(${check1})`;
      }
    }
    function* TIterator(schema, references, value) {
      yield `(typeof value === 'object' && Symbol.iterator in ${value})`;
    }
    function* TLiteral(schema, references, value) {
      if (typeof schema.const === "number" || typeof schema.const === "boolean") {
        yield `(${value} === ${schema.const})`;
      } else {
        yield `(${value} === '${LiteralString.Escape(schema.const)}')`;
      }
    }
    function* TNever(schema, references, value) {
      yield `false`;
    }
    function* TNot(schema, references, value) {
      const expression = CreateExpression(schema.not, references, value);
      yield `(!${expression})`;
    }
    function* TNull(schema, references, value) {
      yield `(${value} === null)`;
    }
    function* TNumber(schema, references, value) {
      yield Policy.IsNumberLike(value);
      if ((0, guard_1.IsNumber)(schema.exclusiveMaximum))
        yield `${value} < ${schema.exclusiveMaximum}`;
      if ((0, guard_1.IsNumber)(schema.exclusiveMinimum))
        yield `${value} > ${schema.exclusiveMinimum}`;
      if ((0, guard_1.IsNumber)(schema.maximum))
        yield `${value} <= ${schema.maximum}`;
      if ((0, guard_1.IsNumber)(schema.minimum))
        yield `${value} >= ${schema.minimum}`;
      if ((0, guard_1.IsNumber)(schema.multipleOf))
        yield `(${value} % ${schema.multipleOf}) === 0`;
    }
    function* TObject(schema, references, value) {
      yield Policy.IsObjectLike(value);
      if ((0, guard_1.IsNumber)(schema.minProperties))
        yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
      if ((0, guard_1.IsNumber)(schema.maxProperties))
        yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
      const knownKeys = Object.getOwnPropertyNames(schema.properties);
      for (const knownKey of knownKeys) {
        const memberExpression = MemberExpression.Encode(value, knownKey);
        const property = schema.properties[knownKey];
        if (schema.required && schema.required.includes(knownKey)) {
          yield* Visit(property, references, memberExpression);
          if (Types.ExtendsUndefined.Check(property) || IsAnyOrUnknown(property))
            yield `('${knownKey}' in ${value})`;
        } else {
          const expression = CreateExpression(property, references, memberExpression);
          yield Policy.IsExactOptionalProperty(value, knownKey, expression);
        }
      }
      if (schema.additionalProperties === false) {
        if (schema.required && schema.required.length === knownKeys.length) {
          yield `Object.getOwnPropertyNames(${value}).length === ${knownKeys.length}`;
        } else {
          const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${value}).every(key => ${keys}.includes(key))`;
        }
      }
      if (typeof schema.additionalProperties === "object") {
        const expression = CreateExpression(schema.additionalProperties, references, `${value}[key]`);
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${value}).every(key => ${keys}.includes(key) || ${expression}))`;
      }
    }
    function* TPromise(schema, references, value) {
      yield `(typeof value === 'object' && typeof ${value}.then === 'function')`;
    }
    function* TRecord(schema, references, value) {
      yield Policy.IsRecordLike(value);
      if ((0, guard_1.IsNumber)(schema.minProperties))
        yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
      if ((0, guard_1.IsNumber)(schema.maxProperties))
        yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
      const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
      const variable = CreateVariable(`${new RegExp(patternKey)}`);
      const check1 = CreateExpression(patternSchema, references, "value");
      const check2 = Types.TypeGuard.TSchema(schema.additionalProperties) ? CreateExpression(schema.additionalProperties, references, value) : schema.additionalProperties === false ? "false" : "true";
      const expression = `(${variable}.test(key) ? ${check1} : ${check2})`;
      yield `(Object.entries(${value}).every(([key, value]) => ${expression}))`;
    }
    function* TRef(schema, references, value) {
      const target = (0, deref_1.Deref)(schema, references);
      if (state.functions.has(schema.$ref))
        return yield `${CreateFunctionName(schema.$ref)}(${value})`;
      yield* Visit(target, references, value);
    }
    function* TString(schema, references, value) {
      yield `(typeof ${value} === 'string')`;
      if ((0, guard_1.IsNumber)(schema.maxLength))
        yield `${value}.length <= ${schema.maxLength}`;
      if ((0, guard_1.IsNumber)(schema.minLength))
        yield `${value}.length >= ${schema.minLength}`;
      if (schema.pattern !== undefined) {
        const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
        yield `${variable}.test(${value})`;
      }
      if (schema.format !== undefined) {
        yield `format('${schema.format}', ${value})`;
      }
    }
    function* TSymbol(schema, references, value) {
      yield `(typeof ${value} === 'symbol')`;
    }
    function* TTemplateLiteral(schema, references, value) {
      yield `(typeof ${value} === 'string')`;
      const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
      yield `${variable}.test(${value})`;
    }
    function* TThis(schema, references, value) {
      yield `${CreateFunctionName(schema.$ref)}(${value})`;
    }
    function* TTuple(schema, references, value) {
      yield `Array.isArray(${value})`;
      if (schema.items === undefined)
        return yield `${value}.length === 0`;
      yield `(${value}.length === ${schema.maxItems})`;
      for (let i = 0;i < schema.items.length; i++) {
        const expression = CreateExpression(schema.items[i], references, `${value}[${i}]`);
        yield `${expression}`;
      }
    }
    function* TUndefined(schema, references, value) {
      yield `${value} === undefined`;
    }
    function* TUnion(schema, references, value) {
      const expressions = schema.anyOf.map((schema2) => CreateExpression(schema2, references, value));
      yield `(${expressions.join(" || ")})`;
    }
    function* TUint8Array(schema, references, value) {
      yield `${value} instanceof Uint8Array`;
      if ((0, guard_1.IsNumber)(schema.maxByteLength))
        yield `(${value}.length <= ${schema.maxByteLength})`;
      if ((0, guard_1.IsNumber)(schema.minByteLength))
        yield `(${value}.length >= ${schema.minByteLength})`;
    }
    function* TUnknown(schema, references, value) {
      yield "true";
    }
    function* TVoid(schema, references, value) {
      yield Policy.IsVoidLike(value);
    }
    function* TKind(schema, references, value) {
      const instance = state.instances.size;
      state.instances.set(instance, schema);
      yield `kind('${schema[Types.Kind]}', ${instance}, ${value})`;
    }
    function* Visit(schema, references, value, useHoisting = true) {
      const references_ = (0, guard_1.IsString)(schema.$id) ? [...references, schema] : references;
      const schema_ = schema;
      if (useHoisting && (0, guard_1.IsString)(schema.$id)) {
        const functionName = CreateFunctionName(schema.$id);
        if (state.functions.has(functionName)) {
          return yield `${functionName}(${value})`;
        } else {
          const functionCode = CreateFunction(functionName, schema, references, "value", false);
          state.functions.set(functionName, functionCode);
          return yield `${functionName}(${value})`;
        }
      }
      switch (schema_[Types.Kind]) {
        case "Any":
          return yield* TAny(schema_, references_, value);
        case "Array":
          return yield* TArray(schema_, references_, value);
        case "AsyncIterator":
          return yield* TAsyncIterator(schema_, references_, value);
        case "BigInt":
          return yield* TBigInt(schema_, references_, value);
        case "Boolean":
          return yield* TBoolean(schema_, references_, value);
        case "Constructor":
          return yield* TConstructor(schema_, references_, value);
        case "Date":
          return yield* TDate(schema_, references_, value);
        case "Function":
          return yield* TFunction(schema_, references_, value);
        case "Integer":
          return yield* TInteger(schema_, references_, value);
        case "Intersect":
          return yield* TIntersect(schema_, references_, value);
        case "Iterator":
          return yield* TIterator(schema_, references_, value);
        case "Literal":
          return yield* TLiteral(schema_, references_, value);
        case "Never":
          return yield* TNever(schema_, references_, value);
        case "Not":
          return yield* TNot(schema_, references_, value);
        case "Null":
          return yield* TNull(schema_, references_, value);
        case "Number":
          return yield* TNumber(schema_, references_, value);
        case "Object":
          return yield* TObject(schema_, references_, value);
        case "Promise":
          return yield* TPromise(schema_, references_, value);
        case "Record":
          return yield* TRecord(schema_, references_, value);
        case "Ref":
          return yield* TRef(schema_, references_, value);
        case "String":
          return yield* TString(schema_, references_, value);
        case "Symbol":
          return yield* TSymbol(schema_, references_, value);
        case "TemplateLiteral":
          return yield* TTemplateLiteral(schema_, references_, value);
        case "This":
          return yield* TThis(schema_, references_, value);
        case "Tuple":
          return yield* TTuple(schema_, references_, value);
        case "Undefined":
          return yield* TUndefined(schema_, references_, value);
        case "Union":
          return yield* TUnion(schema_, references_, value);
        case "Uint8Array":
          return yield* TUint8Array(schema_, references_, value);
        case "Unknown":
          return yield* TUnknown(schema_, references_, value);
        case "Void":
          return yield* TVoid(schema_, references_, value);
        default:
          if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
            throw new TypeCompilerUnknownTypeError(schema);
          return yield* TKind(schema_, references_, value);
      }
    }
    const state = {
      language: "javascript",
      functions: new Map,
      variables: new Map,
      instances: new Map
    };
    function CreateExpression(schema, references, value, useHoisting = true) {
      return `(${[...Visit(schema, references, value, useHoisting)].join(" && ")})`;
    }
    function CreateFunctionName($id) {
      return `check_${Identifier.Encode($id)}`;
    }
    function CreateVariable(expression) {
      const variableName = `local_${state.variables.size}`;
      state.variables.set(variableName, `const ${variableName} = ${expression}`);
      return variableName;
    }
    function CreateFunction(name, schema, references, value, useHoisting = true) {
      const [newline, pad] = [`
`, (length) => "".padStart(length, " ")];
      const parameter = CreateParameter("value", "any");
      const returns = CreateReturns("boolean");
      const expression = [...Visit(schema, references, value, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
      return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})
}`;
    }
    function CreateParameter(name, type) {
      const annotation = state.language === "typescript" ? `: ${type}` : "";
      return `${name}${annotation}`;
    }
    function CreateReturns(type) {
      return state.language === "typescript" ? `: ${type}` : "";
    }
    function Build(schema, references, options) {
      const functionCode = CreateFunction("check", schema, references, "value");
      const parameter = CreateParameter("value", "any");
      const returns = CreateReturns("boolean");
      const functions = [...state.functions.values()];
      const variables = [...state.variables.values()];
      const checkFunction = (0, guard_1.IsString)(schema.$id) ? `return function check(${parameter})${returns} {
  return ${CreateFunctionName(schema.$id)}(value)
}` : `return ${functionCode}`;
      return [...variables, ...functions, checkFunction].join(`
`);
    }
    function Code(...args) {
      const defaults = { language: "javascript" };
      const [schema, references, options] = args.length === 2 && (0, guard_1.IsArray)(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !(0, guard_1.IsArray)(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
      state.language = options.language;
      state.variables.clear();
      state.functions.clear();
      state.instances.clear();
      if (!Types.TypeGuard.TSchema(schema))
        throw new TypeCompilerTypeGuardError(schema);
      for (const schema2 of references)
        if (!Types.TypeGuard.TSchema(schema2))
          throw new TypeCompilerTypeGuardError(schema2);
      return Build(schema, references, options);
    }
    TypeCompiler2.Code = Code;
    function Compile(schema, references = []) {
      const generatedCode = Code(schema, references, { language: "javascript" });
      const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
      const instances = new Map(state.instances);
      function typeRegistryFunction(kind, instance, value) {
        if (!Types.TypeRegistry.Has(kind) || !instances.has(instance))
          return false;
        const checkFunc = Types.TypeRegistry.Get(kind);
        const schema2 = instances.get(instance);
        return checkFunc(schema2, value);
      }
      function formatRegistryFunction(format, value) {
        if (!Types.FormatRegistry.Has(format))
          return false;
        const checkFunc = Types.FormatRegistry.Get(format);
        return checkFunc(value);
      }
      function hashFunction(value) {
        return (0, hash_1.Hash)(value);
      }
      const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
      return new TypeCheck(schema, references, checkFunction, generatedCode);
    }
    TypeCompiler2.Compile = Compile;
  })(TypeCompiler || (exports.TypeCompiler = TypeCompiler = {}));
});

// node_modules/@sinclair/typebox/compiler/index.js
var require_compiler2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ValueErrorIterator = exports.ValueErrorType = undefined;
  var index_1 = require_errors2();
  Object.defineProperty(exports, "ValueErrorType", { enumerable: true, get: function() {
    return index_1.ValueErrorType;
  } });
  Object.defineProperty(exports, "ValueErrorIterator", { enumerable: true, get: function() {
    return index_1.ValueErrorIterator;
  } });
  __exportStar(require_compiler(), exports);
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS((exports, module) => {
  var UTF8_ACCEPT = 12;
  var UTF8_REJECT = 0;
  var UTF8_DATA = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  function decodeURIComponent2(uri) {
    var percentPosition = uri.indexOf("%");
    if (percentPosition === -1)
      return uri;
    var length = uri.length;
    var decoded = "";
    var last = 0;
    var codepoint = 0;
    var startOfOctets = percentPosition;
    var state = UTF8_ACCEPT;
    while (percentPosition > -1 && percentPosition < length) {
      var high = hexCodeToInt(uri[percentPosition + 1], 4);
      var low = hexCodeToInt(uri[percentPosition + 2], 0);
      var byte = high | low;
      var type = UTF8_DATA[byte];
      state = UTF8_DATA[256 + state + type];
      codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type];
      if (state === UTF8_ACCEPT) {
        decoded += uri.slice(last, startOfOctets);
        decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023));
        codepoint = 0;
        last = percentPosition + 3;
        percentPosition = startOfOctets = uri.indexOf("%", last);
      } else if (state === UTF8_REJECT) {
        return null;
      } else {
        percentPosition += 3;
        if (percentPosition < length && uri.charCodeAt(percentPosition) === 37)
          continue;
        return null;
      }
    }
    return decoded + uri.slice(last);
  }
  var HEX = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  function hexCodeToInt(c, shift) {
    var i = HEX[c];
    return i === undefined ? 255 : i << shift;
  }
  module.exports = decodeURIComponent2;
});

// node_modules/fast-querystring/lib/parse.js
var require_parse = __commonJS((exports, module) => {
  var fastDecode = require_fast_decode_uri_component();
  var plusRegex = /\+/g;
  var Empty = function() {};
  Empty.prototype = Object.create(null);
  function parse2(input) {
    const result = new Empty;
    if (typeof input !== "string") {
      return result;
    }
    let inputLength = input.length;
    let key = "";
    let value = "";
    let startingIndex = -1;
    let equalityIndex = -1;
    let shouldDecodeKey = false;
    let shouldDecodeValue = false;
    let keyHasPlus = false;
    let valueHasPlus = false;
    let hasBothKeyValuePair = false;
    let c = 0;
    for (let i = 0;i < inputLength + 1; i++) {
      c = i !== inputLength ? input.charCodeAt(i) : 38;
      if (c === 38) {
        hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair) {
          equalityIndex = i;
        }
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus) {
            key = key.replace(plusRegex, " ");
          }
          if (shouldDecodeKey) {
            key = fastDecode(key) || key;
          }
          if (hasBothKeyValuePair) {
            value = input.slice(equalityIndex + 1, i);
            if (valueHasPlus) {
              value = value.replace(plusRegex, " ");
            }
            if (shouldDecodeValue) {
              value = fastDecode(value) || value;
            }
          }
          const currentValue = result[key];
          if (currentValue === undefined) {
            result[key] = value;
          } else {
            if (currentValue.pop) {
              currentValue.push(value);
            } else {
              result[key] = [currentValue, value];
            }
          }
        }
        value = "";
        startingIndex = i;
        equalityIndex = i;
        shouldDecodeKey = false;
        shouldDecodeValue = false;
        keyHasPlus = false;
        valueHasPlus = false;
      } else if (c === 61) {
        if (equalityIndex <= startingIndex) {
          equalityIndex = i;
        } else {
          shouldDecodeValue = true;
        }
      } else if (c === 43) {
        if (equalityIndex > startingIndex) {
          valueHasPlus = true;
        } else {
          keyHasPlus = true;
        }
      } else if (c === 37) {
        if (equalityIndex > startingIndex) {
          shouldDecodeValue = true;
        } else {
          shouldDecodeKey = true;
        }
      }
    }
    return result;
  }
  module.exports = parse2;
});

// node_modules/fast-querystring/lib/internals/querystring.js
var require_querystring = __commonJS((exports, module) => {
  var hexTable = Array.from({ length: 256 }, (_, i) => "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  var noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  function encodeString(str) {
    const len = str.length;
    if (len === 0)
      return "";
    let out = "";
    let lastPos = 0;
    let i = 0;
    outer:
      for (;i < len; i++) {
        let c = str.charCodeAt(i);
        while (c < 128) {
          if (noEscape[c] !== 1) {
            if (lastPos < i)
              out += str.slice(lastPos, i);
            lastPos = i + 1;
            out += hexTable[c];
          }
          if (++i === len)
            break outer;
          c = str.charCodeAt(i);
        }
        if (lastPos < i)
          out += str.slice(lastPos, i);
        if (c < 2048) {
          lastPos = i + 1;
          out += hexTable[192 | c >> 6] + hexTable[128 | c & 63];
          continue;
        }
        if (c < 55296 || c >= 57344) {
          lastPos = i + 1;
          out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          continue;
        }
        ++i;
        if (i >= len) {
          throw new Error("URI malformed");
        }
        const c2 = str.charCodeAt(i) & 1023;
        lastPos = i + 1;
        c = 65536 + ((c & 1023) << 10 | c2);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
    if (lastPos === 0)
      return str;
    if (lastPos < len)
      return out + str.slice(lastPos);
    return out;
  }
  module.exports = { encodeString };
});

// node_modules/fast-querystring/lib/stringify.js
var require_stringify = __commonJS((exports, module) => {
  var { encodeString } = require_querystring();
  function getAsPrimitive(value) {
    const type = typeof value;
    if (type === "string") {
      return encodeString(value);
    } else if (type === "bigint") {
      return value.toString();
    } else if (type === "boolean") {
      return value ? "true" : "false";
    } else if (type === "number" && Number.isFinite(value)) {
      return value < 1000000000000000000000 ? "" + value : encodeString("" + value);
    }
    return "";
  }
  function stringify(input) {
    let result = "";
    if (input === null || typeof input !== "object") {
      return result;
    }
    const separator = "&";
    const keys = Object.keys(input);
    const keyLength = keys.length;
    let valueLength = 0;
    for (let i = 0;i < keyLength; i++) {
      const key = keys[i];
      const value = input[key];
      const encodedKey = encodeString(key) + "=";
      if (i) {
        result += separator;
      }
      if (Array.isArray(value)) {
        valueLength = value.length;
        for (let j = 0;j < valueLength; j++) {
          if (j) {
            result += separator;
          }
          result += encodedKey;
          result += getAsPrimitive(value[j]);
        }
      } else {
        result += encodedKey;
        result += getAsPrimitive(value);
      }
    }
    return result;
  }
  module.exports = stringify;
});

// node_modules/fast-querystring/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var parse2 = require_parse();
  var stringify = require_stringify();
  var fastQuerystring = {
    parse: parse2,
    stringify
  };
  module.exports = fastQuerystring;
  module.exports.default = fastQuerystring;
  module.exports.parse = parse2;
  module.exports.stringify = stringify;
});

// node_modules/memoirist/dist/index.js
var e = (e2, t) => ({ part: e2, store: null, inert: t !== undefined ? new Map(t.map((e3) => [e3.part.charCodeAt(0), e3])) : null, params: null, wildcardStore: null });
var t = (e2, t2) => ({ ...e2, part: t2 });
var r = (e2) => ({ paramName: e2, store: null, inert: null });

class Memoirist {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g };
  add(a, l, i) {
    let s;
    if (typeof l != "string")
      throw TypeError("Route path must be a string");
    l === "" ? l = "/" : l[0] !== "/" && (l = `/${l}`), this.history.push([a, l, i]);
    let n = l[l.length - 1] === "*";
    n && (l = l.slice(0, -1));
    let o = l.split(Memoirist.regex.static), u = l.match(Memoirist.regex.params) || [];
    o[o.length - 1] === "" && o.pop(), s = this.root[a] ? this.root[a] : this.root[a] = e("/");
    let p = 0;
    for (let a2 = 0;a2 < o.length; ++a2) {
      let i2 = o[a2];
      if (a2 > 0) {
        let t2 = u[p++].slice(1);
        if (s.params === null)
          s.params = r(t2);
        else if (s.params.paramName !== t2)
          throw Error(`Cannot create route "${l}" with parameter "${t2}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
        let a3 = s.params;
        if (a3.inert === null) {
          s = a3.inert = e(i2);
          continue;
        }
        s = a3.inert;
      }
      for (let r2 = 0;; ) {
        if (r2 === i2.length) {
          if (r2 < s.part.length) {
            let a3 = t(s, s.part.slice(r2));
            Object.assign(s, e(i2, [a3]));
          }
          break;
        }
        if (r2 === s.part.length) {
          if (s.inert === null)
            s.inert = new Map;
          else if (s.inert.has(i2.charCodeAt(r2))) {
            s = s.inert.get(i2.charCodeAt(r2)), i2 = i2.slice(r2), r2 = 0;
            continue;
          }
          let t2 = e(i2.slice(r2));
          s.inert.set(i2.charCodeAt(r2), t2), s = t2;
          break;
        }
        if (i2[r2] !== s.part[r2]) {
          let a3 = t(s, s.part.slice(r2)), l2 = e(i2.slice(r2));
          Object.assign(s, e(s.part.slice(0, r2), [a3, l2])), s = l2;
          break;
        }
        ++r2;
      }
    }
    if (p < u.length) {
      let e2 = u[p], t2 = e2.slice(1);
      if (s.params === null)
        s.params = r(t2);
      else if (s.params.paramName !== t2)
        throw Error(`Cannot create route "${l}" with parameter "${t2}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
      return s.params.store === null && (s.params.store = i), s.params.store;
    }
    return n ? (s.wildcardStore === null && (s.wildcardStore = i), s.wildcardStore) : (s.store === null && (s.store = i), s.store);
  }
  find(e2, t2) {
    let r2 = this.root[e2];
    return r2 ? a(t2, t2.length, r2, 0) : null;
  }
}
var a = (e2, t2, r2, l) => {
  let i = r2?.part, s = l + i.length;
  if (i.length > 1) {
    if (s > t2)
      return null;
    if (i.length < 15) {
      for (let t3 = 1, r3 = l + 1;t3 < i.length; ++t3, ++r3)
        if (i.charCodeAt(t3) !== e2.charCodeAt(r3))
          return null;
    } else if (e2.substring(l, s) !== i)
      return null;
  }
  if (s === t2)
    return r2.store !== null ? { store: r2.store, params: {} } : r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": "" } } : null;
  if (r2.inert !== null) {
    let l2 = r2.inert.get(e2.charCodeAt(s));
    if (l2 !== undefined) {
      let r3 = a(e2, t2, l2, s);
      if (r3 !== null)
        return r3;
    }
  }
  if (r2.params !== null) {
    let l2 = r2.params, i2 = e2.indexOf("/", s);
    if (i2 !== s) {
      if (i2 === -1 || i2 >= t2) {
        if (l2.store !== null) {
          let r3 = {};
          return r3[l2.paramName] = e2.substring(s, t2), { store: l2.store, params: r3 };
        }
      } else if (l2.inert !== null) {
        let r3 = a(e2, t2, l2.inert, i2);
        if (r3 !== null)
          return r3.params[l2.paramName] = e2.substring(s, i2), r3;
      }
    }
  }
  return r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": e2.substring(s, t2) } } : null;
};

// node_modules/eventemitter3/index.mjs
var import__ = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import__.default;

// node_modules/elysia/dist/trace.js
var e2 = () => {
  let e3;
  let s = new Promise((s2) => {
    e3 = s2;
  });
  return [s, e3];
};
var s = () => {
  let [s2, n] = e2(), [r2, t2] = e2(), a2 = [], i = [];
  return { signal: s2, consume: (s3) => {
    switch (s3.type) {
      case "begin":
        if (s3.unit && a2.length === 0)
          for (let n2 = 0;n2 < s3.unit; n2++) {
            let [s4, n3] = e2(), [r3, t3] = e2();
            a2.push(s4), i.push([(e3) => {
              n3({ children: [], end: r3, name: e3.name ?? "", skip: false, time: e3.time });
            }, (e3) => {
              t3(e3);
            }]);
          }
        n({ children: a2, end: r2, name: s3.name ?? "", skip: false, time: s3.time });
        break;
      case "end":
        t2(s3.time);
    }
  }, consumeChild(e3) {
    switch (e3.type) {
      case "begin":
        if (!i[0])
          return;
        let [s3] = i[0];
        s3({ children: [], end: r2, name: e3.name ?? "", skip: false, time: e3.time });
        break;
      case "end":
        let n2 = i.shift();
        if (!n2)
          return;
        n2[1](e3.time);
    }
  }, resolve() {
    for (let [e3, s3] of (n({ children: [], end: new Promise((e4) => e4(0)), name: "", skip: true, time: 0 }), i))
      e3({ children: [], end: new Promise((e4) => e4(0)), name: "", skip: true, time: 0 }), s3(0);
    t2(0);
  } };
};
var createTraceListener = (e3, n, r2) => async function(t2) {
  if (t2.event !== "request" || t2.type !== "begin")
    return;
  let a2 = t2.id, i = e3(), o = s(), l = s(), c = s(), m = s(), u = s(), d = s(), b = s(), k = s();
  o.consume(t2);
  let f = (e4) => {
    if (e4.id === a2)
      switch (e4.event) {
        case "request":
          o.consume(e4);
          break;
        case "request.unit":
          o.consumeChild(e4);
          break;
        case "parse":
          l.consume(e4);
          break;
        case "parse.unit":
          l.consumeChild(e4);
          break;
        case "transform":
          c.consume(e4);
          break;
        case "transform.unit":
          c.consumeChild(e4);
          break;
        case "beforeHandle":
          m.consume(e4);
          break;
        case "beforeHandle.unit":
          m.consumeChild(e4);
          break;
        case "handle":
          u.consume(e4);
          break;
        case "afterHandle":
          d.consume(e4);
          break;
        case "afterHandle.unit":
          d.consumeChild(e4);
          break;
        case "error":
          b.consume(e4);
          break;
        case "error.unit":
          b.consumeChild(e4);
          break;
        case "response":
          e4.type === "begin" ? (o.resolve(), l.resolve(), c.resolve(), m.resolve(), u.resolve(), d.resolve(), b.resolve()) : i.off("event", f), k.consume(e4);
          break;
        case "response.unit":
          k.consumeChild(e4);
          break;
        case "exit":
          o.resolve(), l.resolve(), c.resolve(), m.resolve(), u.resolve(), d.resolve(), b.resolve();
      }
  };
  i.on("event", f), await r2({
    id: a2,
    context: t2.ctx,
    set: t2.ctx?.set,
    store: t2.ctx?.store,
    time: t2.time,
    request: o.signal,
    parse: l.signal,
    transform: c.signal,
    beforeHandle: m.signal,
    handle: u.signal,
    afterHandle: d.signal,
    error: b.signal,
    response: k.signal
  }), i.emit(`res${a2}.${n}`, undefined);
};

// node_modules/elysia/dist/error.js
var exports_error = {};
__export(exports_error, {
  isProduction: () => isProduction,
  ValidationError: () => ValidationError,
  ParseError: () => ParseError,
  NotFoundError: () => NotFoundError,
  InvalidCookieSignature: () => InvalidCookieSignature,
  InternalServerError: () => InternalServerError,
  ERROR_CODE: () => ERROR_CODE
});
var import_value = __toESM(require_value2(), 1);
var t2 = typeof Bun != "undefined" ? Bun.env : typeof process != "undefined" ? process?.env : undefined;
var ERROR_CODE = Symbol("ErrorCode");
var isProduction = (t2?.NODE_ENV ?? t2?.ENV) === "production";

class InternalServerError extends Error {
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(r3) {
    super(r3 ?? "INTERNAL_SERVER_ERROR");
  }
}

class NotFoundError extends Error {
  code = "NOT_FOUND";
  status = 404;
  constructor(r3) {
    super(r3 ?? "NOT_FOUND");
  }
}

class ParseError extends Error {
  code = "PARSE";
  status = 400;
  constructor(r3) {
    super(r3 ?? "PARSE");
  }
}

class InvalidCookieSignature extends Error {
  key;
  code;
  status;
  constructor(r3, t3) {
    super(t3 ?? `"${r3}" has invalid cookie signature`), this.key = r3, this.code = "INVALID_COOKIE_SIGNATURE", this.status = 400;
  }
}

class ValidationError extends Error {
  type;
  validator;
  value;
  code;
  status;
  constructor(t3, e3, s2) {
    let o = isProduction ? undefined : ("Errors" in e3) ? e3.Errors(s2).First() : import_value.Value.Errors(e3, s2).First(), i = o?.schema.error ? typeof o.schema.error == "function" ? o.schema.error(t3, e3, s2) : o.schema.error : undefined, a2 = isProduction ? i ?? `Invalid ${t3 ?? o?.schema.error ?? o?.message}` : i ?? `Invalid ${t3}, '${o?.path?.slice(1) || "type"}': ${o?.message}

Expected: ` + JSON.stringify(ValidationError.simplifyModel(e3), null, 2) + `

Found: ` + JSON.stringify(s2, null, 2);
    super(a2), this.type = t3, this.validator = e3, this.value = s2, this.code = "VALIDATION", this.status = 400, Object.setPrototypeOf(this, ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  static simplifyModel(t3) {
    let e3 = "schema" in t3 ? t3.schema : t3;
    try {
      return import_value.Value.Create(e3);
    } catch {
      return e3;
    }
  }
  get model() {
    return ValidationError.simplifyModel(this.validator);
  }
  toResponse(r3) {
    return new Response(this.message, { status: 400, headers: r3 });
  }
}

// node_modules/elysia/dist/ws/index.js
var websocket = { open(t3) {
  t3.data.open?.(t3);
}, message(t3, r3) {
  t3.data.message?.(t3, r3);
}, drain(t3) {
  t3.data.drain?.(t3);
}, close(t3, r3, e3) {
  t3.data.close?.(t3, r3, e3);
} };

class ElysiaWS {
  raw;
  data;
  id;
  validator;
  constructor(t3, r3) {
    this.raw = t3, this.data = r3, this.validator = t3.data.validator, this.id = Date.now();
  }
  get publish() {
    return (r3, e3, s2) => {
      if (this.validator?.Check(e3) === false)
        throw new ValidationError("message", this.validator, e3);
      return typeof e3 == "object" && (e3 = JSON.stringify(e3)), this.raw.publish(r3, e3, s2), this;
    };
  }
  get send() {
    return (r3) => {
      if (this.validator?.Check(r3) === false)
        throw new ValidationError("message", this.validator, r3);
      return Buffer.isBuffer(r3) || typeof r3 == "object" && (r3 = JSON.stringify(r3)), this.raw.send(r3), this;
    };
  }
  get subscribe() {
    return (t3) => (this.raw.subscribe(t3), this);
  }
  get unsubscribe() {
    return (t3) => (this.raw.unsubscribe(t3), this);
  }
  get cork() {
    return (t3) => (this.raw.cork(t3), this);
  }
  get close() {
    return () => (this.raw.close(), this);
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}

// node_modules/cookie/index.js
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var $parse = parse;
var $serialize = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (obj[key] === undefined) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e3) {
    return str;
  }
}

// node_modules/elysia/dist/utils.js
var import_typebox = __toESM(require_typebox(), 1);
var import_value2 = __toESM(require_value2(), 1);
var import_compiler = __toESM(require_compiler2(), 1);
var a2 = (e4) => e4 && typeof e4 == "object" && !Array.isArray(e4);
var replaceUrlPath = (e4, r4) => {
  let t4 = new URL(e4);
  return t4.pathname = r4, t4.toString();
};
var n = (e4) => typeof e4 == "function" && /^\s*class\s+/.test(e4.toString()) || e4.toString().startsWith("[object ") || isNotEmpty(Object.getPrototypeOf(e4));
var mergeDeep = (e4, r4, { skipKeys: t4 } = {}) => {
  if (a2(e4) && a2(r4)) {
    for (let [o, s2] of Object.entries(r4))
      if (!t4?.includes(o)) {
        if (!a2(s2) || !(o in e4) || n(s2)) {
          e4[o] = s2;
          continue;
        }
        e4[o] = mergeDeep(e4[o], s2);
      }
  }
  return e4;
};
var mergeCookie = (e4, r4) => mergeDeep(e4, r4, { skipKeys: ["properties"] });
var mergeObjectArray = (e4, r4) => {
  let t4 = [...Array.isArray(e4) ? e4 : [e4]], o = [];
  for (let e5 of t4)
    e5.$elysiaChecksum && o.push(e5.$elysiaChecksum);
  for (let e5 of Array.isArray(r4) ? r4 : [r4])
    o.includes(e5?.$elysiaChecksum) || t4.push(e5);
  return t4;
};
var mergeHook = (e4, r4) => ({
  body: r4?.body ?? e4?.body,
  headers: r4?.headers ?? e4?.headers,
  params: r4?.params ?? e4?.params,
  query: r4?.query ?? e4?.query,
  response: r4?.response ?? e4?.response,
  type: e4?.type || r4?.type,
  detail: mergeDeep(r4?.detail ?? {}, e4?.detail ?? {}),
  parse: mergeObjectArray(e4?.parse ?? [], r4?.parse ?? []),
  transform: mergeObjectArray(e4?.transform ?? [], r4?.transform ?? []),
  beforeHandle: mergeObjectArray(e4?.beforeHandle ?? [], r4?.beforeHandle ?? []),
  afterHandle: mergeObjectArray(e4?.afterHandle ?? [], r4?.afterHandle ?? []),
  onResponse: mergeObjectArray(e4?.onResponse ?? [], r4?.onResponse ?? []),
  trace: mergeObjectArray(e4?.trace ?? [], r4?.trace ?? []),
  error: mergeObjectArray(e4?.error ?? [], r4?.error ?? [])
});
var getSchemaValidator = (e4, { models: o = {}, additionalProperties: a3 = false, dynamic: n2 = false }) => {
  if (!e4 || typeof e4 == "string" && !(e4 in o))
    return;
  let s2 = typeof e4 == "string" ? o[e4] : e4;
  return (s2.type === "object" && ("additionalProperties" in s2) == false && (s2.additionalProperties = a3), n2) ? { schema: s2, references: "", checkFunc: () => {}, code: "", Check: (e5) => import_value2.Value.Check(s2, e5), Errors: (e5) => import_value2.Value.Errors(s2, e5), Code: () => "" } : import_compiler.TypeCompiler.Compile(s2, Object.values(o));
};
var getResponseSchemaValidator = (o, { models: a3 = {}, additionalProperties: n2 = false, dynamic: s2 = false }) => {
  if (!o || typeof o == "string" && !(o in a3))
    return;
  let i = typeof o == "string" ? a3[o] : o, l = (e4, o2) => s2 ? { schema: e4, references: "", checkFunc: () => {}, code: "", Check: (t4) => import_value2.Value.Check(e4, t4), Errors: (t4) => import_value2.Value.Errors(e4, t4), Code: () => "" } : import_compiler.TypeCompiler.Compile(e4, o2);
  if (import_typebox.Kind in i)
    return "additionalProperties" in i == false && (i.additionalProperties = n2), { 200: l(i, Object.values(a3)) };
  let p = {};
  return Object.keys(i).forEach((r4) => {
    let t4 = i[+r4];
    if (typeof t4 == "string") {
      if (t4 in a3) {
        let o2 = a3[t4];
        o2.type, p[+r4] = import_typebox.Kind in o2 ? l(o2, Object.values(a3)) : o2;
      }
      return;
    }
    t4.type === "object" && "additionalProperties" in t4 == false && (t4.additionalProperties = n2), p[+r4] = import_typebox.Kind in t4 ? l(t4, Object.values(a3)) : t4;
  }), p;
};
var checksum = (e4) => {
  let r4 = 9;
  for (let t4 = 0;t4 < e4.length; )
    r4 = Math.imul(r4 ^ e4.charCodeAt(t4++), 387420489);
  return r4 ^ r4 >>> 9;
};
var mergeLifeCycle = (e4, r4, t4) => {
  let o = (e5) => (t4 && !e5.$elysiaChecksum && (e5.$elysiaChecksum = t4), e5);
  return {
    start: mergeObjectArray(e4.start, ("start" in r4 ? r4.start ?? [] : []).map(o)),
    request: mergeObjectArray(e4.request, ("request" in r4 ? r4.request ?? [] : []).map(o)),
    parse: mergeObjectArray(e4.parse, "parse" in r4 ? r4?.parse ?? [] : []).map(o),
    transform: mergeObjectArray(e4.transform, (r4?.transform ?? []).map(o)),
    beforeHandle: mergeObjectArray(e4.beforeHandle, (r4?.beforeHandle ?? []).map(o)),
    afterHandle: mergeObjectArray(e4.afterHandle, (r4?.afterHandle ?? []).map(o)),
    onResponse: mergeObjectArray(e4.onResponse, (r4?.onResponse ?? []).map(o)),
    trace: e4.trace,
    error: mergeObjectArray(e4.error, (r4?.error ?? []).map(o)),
    stop: mergeObjectArray(e4.stop, ("stop" in r4 ? r4.stop ?? [] : []).map(o))
  };
};
var asGlobal = (e4, r4 = true) => e4 ? typeof e4 == "function" ? (r4 ? e4.$elysiaHookType = "global" : e4.$elysiaHookType = undefined, e4) : e4.map((e5) => (r4 ? e5.$elysiaHookType = "global" : e5.$elysiaHookType = undefined, e5)) : e4;
var s2 = (e4) => e4 ? typeof e4 == "function" ? e4.$elysiaHookType === "global" ? e4 : undefined : e4.filter((e5) => e5.$elysiaHookType === "global") : e4;
var filterGlobalHook = (e4) => ({
  ...e4,
  type: e4?.type,
  detail: e4?.detail,
  parse: s2(e4?.parse),
  transform: s2(e4?.transform),
  beforeHandle: s2(e4?.beforeHandle),
  afterHandle: s2(e4?.afterHandle),
  onResponse: s2(e4?.onResponse),
  error: s2(e4?.error)
});
var StatusMap = { Continue: 100, "Switching Protocols": 101, Processing: 102, "Early Hints": 103, OK: 200, Created: 201, Accepted: 202, "Non-Authoritative Information": 203, "No Content": 204, "Reset Content": 205, "Partial Content": 206, "Multi-Status": 207, "Already Reported": 208, "Multiple Choices": 300, "Moved Permanently": 301, Found: 302, "See Other": 303, "Not Modified": 304, "Temporary Redirect": 307, "Permanent Redirect": 308, "Bad Request": 400, Unauthorized: 401, "Payment Required": 402, Forbidden: 403, "Not Found": 404, "Method Not Allowed": 405, "Not Acceptable": 406, "Proxy Authentication Required": 407, "Request Timeout": 408, Conflict: 409, Gone: 410, "Length Required": 411, "Precondition Failed": 412, "Payload Too Large": 413, "URI Too Long": 414, "Unsupported Media Type": 415, "Range Not Satisfiable": 416, "Expectation Failed": 417, "I'm a teapot": 418, "Misdirected Request": 421, "Unprocessable Content": 422, Locked: 423, "Failed Dependency": 424, "Too Early": 425, "Upgrade Required": 426, "Precondition Required": 428, "Too Many Requests": 429, "Request Header Fields Too Large": 431, "Unavailable For Legal Reasons": 451, "Internal Server Error": 500, "Not Implemented": 501, "Bad Gateway": 502, "Service Unavailable": 503, "Gateway Timeout": 504, "HTTP Version Not Supported": 505, "Variant Also Negotiates": 506, "Insufficient Storage": 507, "Loop Detected": 508, "Not Extended": 510, "Network Authentication Required": 511 };
var signCookie = async (e4, r4) => {
  if (typeof e4 != "string")
    throw TypeError("Cookie value must be provided as a string.");
  if (r4 === null)
    throw TypeError("Secret key must be provided.");
  let t4 = new TextEncoder, o = await crypto.subtle.importKey("raw", t4.encode(r4), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), a3 = await crypto.subtle.sign("HMAC", o, t4.encode(e4)), n2 = Array.from(new Uint8Array(a3)), s3 = btoa(String.fromCharCode(...n2));
  return `${e4}.${s3.replace(/=+$/, "")}`;
};
var unsignCookie = async (e4, r4) => {
  if (typeof e4 != "string")
    throw TypeError("Signed cookie string must be provided.");
  if (r4 === null)
    throw TypeError("Secret key must be provided.");
  let t4 = e4.slice(0, e4.lastIndexOf(".")), o = await signCookie(t4, r4);
  return o === e4 && t4;
};

// node_modules/elysia/dist/cookie.js
class Cookie {
  _value;
  property;
  name;
  setter;
  constructor(e4, t4 = {}) {
    this._value = e4, this.property = t4;
  }
  get() {
    return this._value;
  }
  get value() {
    return this._value;
  }
  set value(e4) {
    if (typeof e4 == "object") {
      if (JSON.stringify(this.value) === JSON.stringify(e4))
        return;
    } else if (this.value === e4)
      return;
    this._value = e4, this.sync();
  }
  add(e4) {
    let t4 = Object.assign(this.property, typeof e4 == "function" ? e4(Object.assign(this.property, this.value)) : e4);
    return "value" in t4 && (this._value = t4.value, delete t4.value), this.property = t4, this.sync();
  }
  set(e4) {
    let t4 = typeof e4 == "function" ? e4(Object.assign(this.property, this.value)) : e4;
    return "value" in t4 && (this._value = t4.value, delete t4.value), this.property = t4, this.sync();
  }
  remove(e4) {
    this.value !== undefined && this.set({ domain: e4?.domain, expires: new Date(0), maxAge: 0, path: e4?.path, sameSite: e4?.sameSite, secure: e4?.secure, value: "" });
  }
  get domain() {
    return this.property.domain;
  }
  set domain(e4) {
    this.property.domain !== e4 && (this.property.domain = e4, this.sync());
  }
  get expires() {
    return this.property.expires;
  }
  set expires(e4) {
    this.property.expires?.getTime() !== e4?.getTime() && (this.property.expires = e4, this.sync());
  }
  get httpOnly() {
    return this.property.httpOnly;
  }
  set httpOnly(e4) {
    this.property.domain !== e4 && (this.property.httpOnly = e4, this.sync());
  }
  get maxAge() {
    return this.property.maxAge;
  }
  set maxAge(e4) {
    this.property.maxAge !== e4 && (this.property.maxAge = e4, this.sync());
  }
  get path() {
    return this.property.path;
  }
  set path(e4) {
    this.property.path !== e4 && (this.property.path = e4, this.sync());
  }
  get priority() {
    return this.property.priority;
  }
  set priority(e4) {
    this.property.priority !== e4 && (this.property.priority = e4, this.sync());
  }
  get sameSite() {
    return this.property.sameSite;
  }
  set sameSite(e4) {
    this.property.sameSite !== e4 && (this.property.sameSite = e4, this.sync());
  }
  get secure() {
    return this.property.secure;
  }
  set secure(e4) {
    this.property.secure !== e4 && (this.property.secure = e4, this.sync());
  }
  toString() {
    return typeof this.value == "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
  sync() {
    return this.name && this.setter && (this.setter.cookie ? this.setter.cookie[this.name] = Object.assign(this.property, { value: this.toString() }) : this.setter.cookie = { [this.name]: Object.assign(this.property, { value: this.toString() }) }), this;
  }
}
var createCookieJar = (e4, t4, r4) => new Proxy(e4, { get(e5, i) {
  if (i in e5)
    return e5[i];
  let s3 = new Cookie(undefined, r4 ? { ...r4 } : undefined);
  return s3.setter = t4, s3.name = i, s3;
}, set: (e5, r5, i) => i instanceof Cookie && (t4.cookie || (t4.cookie = {}), i.setter = t4, i.name = r5, i.sync(), e5[r5] = i, true) });
var parseCookie = async (i, s3, { secret: o, sign: p, ...n2 } = {}) => {
  if (!s3)
    return createCookieJar({}, i, n2);
  let a3 = {}, h = typeof o == "string";
  p && p !== true && !Array.isArray(p) && (p = [p]);
  let y = Object.keys($parse(s3));
  for (let u = 0;u < y.length; u++) {
    let c = y[u], l = $parse(s3)[c];
    if (p === true || p?.includes(c)) {
      if (!o)
        throw Error("No secret is provided to cookie plugin");
      if (h) {
        if ((l = await unsignCookie(l, o)) === false)
          throw new InvalidCookieSignature(c);
      } else {
        let e4 = true;
        for (let r4 = 0;r4 < o.length; r4++) {
          let i2 = await unsignCookie(l, o[r4]);
          if (i2 !== false) {
            l = i2, e4 = false;
            break;
          }
        }
        if (e4)
          throw new InvalidCookieSignature(c);
      }
    }
    if (l === undefined)
      continue;
    let m = l.charCodeAt(0);
    if (m === 123 || m === 91)
      try {
        let e4 = new Cookie(JSON.parse(l));
        e4.setter = i, e4.name = c, a3[c] = e4;
        continue;
      } catch {}
    Number.isNaN(+l) ? l === "true" ? l = true : l === "false" && (l = false) : l = +l;
    let g = new Cookie(l, n2);
    g.setter = i, g.name = c, a3[c] = g;
  }
  return createCookieJar(a3, i);
};

// node_modules/elysia/dist/handler.js
var r4 = "toJSON" in new Headers;
var isNotEmpty = (e4) => {
  for (let s3 in e4)
    return true;
  return false;
};
var parseSetCookies = (e4, s3) => {
  if (!e4 || !Array.isArray(s3))
    return e4;
  e4.delete("Set-Cookie");
  for (let t4 = 0;t4 < s3.length; t4++) {
    let r5 = s3[t4].indexOf("=");
    e4.append("Set-Cookie", `${s3[t4].slice(0, r5)}=${s3[t4].slice(r5 + 1)}`);
  }
  return e4;
};
var cookieToHeader = (s3) => {
  if (!s3 || typeof s3 != "object" || !isNotEmpty(s3))
    return;
  let t4 = [];
  for (let [r5, n2] of Object.entries(s3))
    if (r5 && n2) {
      if (Array.isArray(n2.value))
        for (let s4 = 0;s4 < n2.value.length; s4++) {
          let o = n2.value[s4];
          o != null && (typeof o == "object" && (o = JSON.stringify(o)), t4.push($serialize(r5, o, n2)));
        }
      else {
        let s4 = n2.value;
        if (s4 == null)
          continue;
        typeof s4 == "object" && (s4 = JSON.stringify(s4)), t4.push($serialize(r5, n2.value, n2));
      }
    }
  if (t4.length !== 0)
    return t4.length === 1 ? t4[0] : t4;
};
var mapResponse = (e4, n2) => {
  if (e4?.$passthrough && (e4 = e4[e4.$passthrough]), isNotEmpty(n2.headers) || n2.status !== 200 || n2.redirect || n2.cookie)
    switch (typeof n2.status == "string" && (n2.status = StatusMap[n2.status]), n2.redirect && (n2.headers.Location = n2.redirect, (!n2.status || n2.status < 300 || n2.status >= 400) && (n2.status = 302)), n2.cookie && isNotEmpty(n2.cookie) && (n2.headers["Set-Cookie"] = cookieToHeader(n2.cookie)), n2.headers["Set-Cookie"] && Array.isArray(n2.headers["Set-Cookie"]) && (n2.headers = parseSetCookies(new Headers(n2.headers), n2.headers["Set-Cookie"])), e4?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response(e4, { status: n2.status, headers: n2.headers });
      case "Object":
      case "Array":
        return Response.json(e4, n2);
      case "ReadableStream":
        return n2.headers["content-type"]?.startsWith("text/event-stream") || (n2.headers["content-type"] = "text/event-stream; charset=utf-8"), new Response(e4, n2);
      case undefined:
        if (!e4)
          return new Response("", n2);
        return Response.json(e4, n2);
      case "Response":
        let o = { ...n2.headers };
        if (r4)
          n2.headers = e4.headers.toJSON();
        else
          for (let [s3, t4] of e4.headers.entries())
            s3 in n2.headers && (n2.headers[s3] = t4);
        for (let s3 in o)
          e4.headers.append(s3, o[s3]);
        return e4;
      case "Error":
        return errorToResponse(e4, n2);
      case "Promise":
        return e4.then((e5) => mapResponse(e5, n2));
      case "Function":
        return mapResponse(e4(), n2);
      case "Number":
      case "Boolean":
        return new Response(e4.toString(), n2);
      case "Cookie":
        if (e4 instanceof Cookie)
          return new Response(e4.value, n2);
        return new Response(e4?.toString(), n2);
      default:
        let a3 = JSON.stringify(e4);
        if (a3.charCodeAt(0) === 123)
          return n2.headers["Content-Type"] || (n2.headers["Content-Type"] = "application/json"), new Response(JSON.stringify(e4), n2);
        return new Response(a3, n2);
    }
  else
    switch (e4?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response(e4);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
      case "ReadableStream":
        return new Response(e4, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!e4)
          return new Response("");
        return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
      case "Response":
        return e4;
      case "Error":
        return errorToResponse(e4, n2);
      case "Promise":
        return e4.then((e5) => {
          let s3 = mapCompactResponse(e5);
          return s3 !== undefined ? s3 : new Response("");
        });
      case "Function":
        return mapCompactResponse(e4());
      case "Number":
      case "Boolean":
        return new Response(e4.toString());
      case "Cookie":
        if (e4 instanceof Cookie)
          return new Response(e4.value, n2);
        return new Response(e4?.toString(), n2);
      default:
        let i = JSON.stringify(e4);
        if (i.charCodeAt(0) === 123)
          return new Response(JSON.stringify(e4), { headers: { "Content-Type": "application/json" } });
        return new Response(i);
    }
};
var mapEarlyResponse = (e4, n2) => {
  if (e4 != null) {
    if (e4?.$passthrough && (e4 = e4[e4.$passthrough]), isNotEmpty(n2.headers) || n2.status !== 200 || n2.redirect || n2.cookie)
      switch (typeof n2.status == "string" && (n2.status = StatusMap[n2.status]), n2.redirect && (n2.headers.Location = n2.redirect, (!n2.status || n2.status < 300 || n2.status >= 400) && (n2.status = 302)), n2.cookie && isNotEmpty(n2.cookie) && (n2.headers["Set-Cookie"] = cookieToHeader(n2.cookie)), n2.headers["Set-Cookie"] && Array.isArray(n2.headers["Set-Cookie"]) && (n2.headers = parseSetCookies(new Headers(n2.headers), n2.headers["Set-Cookie"])), e4?.constructor?.name) {
        case "String":
        case "Blob":
          return new Response(e4, n2);
        case "Object":
        case "Array":
          return Response.json(e4, n2);
        case "ReadableStream":
          return n2.headers["content-type"]?.startsWith("text/event-stream") || (n2.headers["content-type"] = "text/event-stream; charset=utf-8"), new Response(e4, n2);
        case undefined:
          if (!e4)
            return;
          return Response.json(e4, n2);
        case "Response":
          let o = Object.assign({}, n2.headers);
          if (r4)
            n2.headers = e4.headers.toJSON();
          else
            for (let [s3, t4] of e4.headers.entries())
              s3 in n2.headers || (n2.headers[s3] = t4);
          for (let s3 in o)
            e4.headers.append(s3, o[s3]);
          return e4.status !== n2.status && (n2.status = e4.status), e4;
        case "Promise":
          return e4.then((e5) => {
            let s3 = mapEarlyResponse(e5, n2);
            if (s3 !== undefined)
              return s3;
          });
        case "Error":
          return errorToResponse(e4, n2);
        case "Function":
          return mapEarlyResponse(e4(), n2);
        case "Number":
        case "Boolean":
          return new Response(e4.toString(), n2);
        case "Cookie":
          if (e4 instanceof Cookie)
            return new Response(e4.value, n2);
          return new Response(e4?.toString(), n2);
        default:
          let a3 = JSON.stringify(e4);
          if (a3.charCodeAt(0) === 123)
            return n2.headers["Content-Type"] || (n2.headers["Content-Type"] = "application/json"), new Response(JSON.stringify(e4), n2);
          return new Response(a3, n2);
      }
    else
      switch (e4?.constructor?.name) {
        case "String":
        case "Blob":
          return new Response(e4);
        case "Object":
        case "Array":
          return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
        case "ReadableStream":
          return new Response(e4, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
        case undefined:
          if (!e4)
            return new Response("");
          return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
        case "Response":
          return e4;
        case "Promise":
          return e4.then((e5) => {
            let s3 = mapEarlyResponse(e5, n2);
            if (s3 !== undefined)
              return s3;
          });
        case "Error":
          return errorToResponse(e4, n2);
        case "Function":
          return mapCompactResponse(e4());
        case "Number":
        case "Boolean":
          return new Response(e4.toString());
        case "Cookie":
          if (e4 instanceof Cookie)
            return new Response(e4.value, n2);
          return new Response(e4?.toString(), n2);
        default:
          let i = JSON.stringify(e4);
          if (i.charCodeAt(0) === 123)
            return new Response(JSON.stringify(e4), { headers: { "Content-Type": "application/json" } });
          return new Response(i);
      }
  }
};
var mapCompactResponse = (e4) => {
  switch (e4?.$passthrough && (e4 = e4[e4.$passthrough]), e4?.constructor?.name) {
    case "String":
    case "Blob":
      return new Response(e4);
    case "Object":
    case "Array":
      return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
    case "ReadableStream":
      return new Response(e4, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
    case undefined:
      if (!e4)
        return new Response("");
      return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
    case "Response":
      return e4;
    case "Error":
      return errorToResponse(e4);
    case "Promise":
      return e4.then((e5) => {
        let s4 = mapCompactResponse(e5);
        return s4 !== undefined ? s4 : new Response("");
      });
    case "Function":
      return mapCompactResponse(e4());
    case "Number":
    case "Boolean":
      return new Response(e4.toString());
    default:
      let s3 = JSON.stringify(e4);
      if (s3.charCodeAt(0) === 123)
        return new Response(JSON.stringify(e4), { headers: { "Content-Type": "application/json" } });
      return new Response(s3);
  }
};
var errorToResponse = (e4, s3) => new Response(JSON.stringify({ name: e4?.name, message: e4?.message, cause: e4?.cause }), { status: s3?.status !== 200 ? s3?.status ?? 500 : 500, headers: s3?.headers });

// node_modules/elysia/dist/compose.js
var import_fast_querystring = __toESM(require_lib(), 1);
var u = new Headers().toJSON;
var d = RegExp(" (\\w+) = context", "g");
var p = { value: 0 };
var m = ({ hasTrace: e5, hasTraceSet: t4 = false, addFn: r5, condition: s3 = {} }) => (r5(`
const reporter = getReporter()
`), e5) ? (e6, { name: n2, attribute: o = "", unit: a3 = 0 } = {}) => {
  let i = e6.indexOf("."), c = i === -1;
  if (e6 !== "request" && e6 !== "response" && !s3[c ? e6 : e6.slice(0, i)])
    return () => {
      t4 && e6 === "afterHandle" && (r5("reporter.emit('event',{id,event:'exit',type:'begin',time:0})"), r5(`
await traceDone
`));
    };
  c ? n2 ||= e6 : n2 ||= "anonymous", r5(`
` + `reporter.emit('event', { 
					id,
					event: '${e6}',
					type: 'begin',
					name: '${n2}',
					time: performance.now(),
					${c ? `unit: ${a3},` : ""}
					${o}
				})`.replace(/(\t| |\n)/g, "") + `
`);
  let l = false;
  return () => {
    !l && (l = true, r5(`
` + `reporter.emit('event', {
							id,
							event: '${e6}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") + `
`), t4 && e6 === "afterHandle" && (r5(`
reporter.emit('event',{id,event:'exit',type:'begin',time:0})
`), r5(`
await traceDone
`)));
  };
} : () => () => {};
var hasReturn = (e5) => {
  let t4 = e5.indexOf(")");
  return e5.charCodeAt(t4 + 2) === 61 && e5.charCodeAt(t4 + 5) !== 123 || e5.includes("return");
};
var h = (e5, { injectResponse: t4 = "" } = {}) => ({ composeValidation: (t5, r5 = `c.${t5}`) => e5 ? `c.set.status = 400; throw new ValidationError(
'${t5}',
${t5},
${r5}
)` : `c.set.status = 400; return new ValidationError(
	'${t5}',
	${t5},
	${r5}
).toResponse(c.set.headers)`, composeResponseValidation: (r5 = "r") => {
  let s3 = e5 ? `throw new ValidationError(
'response',
response[c.set.status],
${r5}
)` : `return new ValidationError(
'response',
response[c.set.status],
${r5}
).toResponse(c.set.headers)`;
  return `
${t4}
		if(response[c.set.status]?.Check(${r5}) === false) { 
	if(!(response instanceof Error))
		${s3}
}
`;
} });
var isFnUse = (e5, t4) => {
  t4 = (t4 = t4.trimStart()).replaceAll(/^async /g, ""), /^(\w+)\(/g.test(t4) && (t4 = t4.slice(t4.indexOf("(")));
  let r5 = t4.charCodeAt(0) === 40 || t4.startsWith("function") ? t4.slice(t4.indexOf("(") + 1, t4.indexOf(")")) : t4.slice(0, t4.indexOf("=") - 1);
  if (r5 === "")
    return false;
  let s3 = r5.charCodeAt(0) === 123 ? r5.indexOf("...") : -1;
  if (r5.charCodeAt(0) === 123) {
    if (r5.includes(e5))
      return true;
    if (s3 === -1)
      return false;
  }
  if (t4.match(RegExp(`${r5}(.${e5}|\\["${e5}"\\])`)))
    return true;
  let n2 = s3 !== -1 ? r5.slice(s3 + 3, r5.indexOf(" ", s3 + 3)) : undefined;
  if (t4.match(RegExp(`${n2}(.${e5}|\\["${e5}"\\])`)))
    return true;
  let o = [r5];
  for (let e6 of (n2 && o.push(n2), t4.matchAll(d)))
    o.push(e6[1]);
  let a3 = RegExp(`{.*?} = (${o.join("|")})`, "g");
  for (let [r6] of t4.matchAll(a3))
    if (r6.includes(`{ ${e5}`) || r6.includes(`, ${e5}`))
      return true;
  return false;
};
var y = (e5) => {
  e5 = (e5 = e5.trimStart()).replaceAll(/^async /g, ""), /^(\w+)\(/g.test(e5) && (e5 = e5.slice(e5.indexOf("(")));
  let t4 = e5.charCodeAt(0) === 40 || e5.startsWith("function") ? e5.slice(e5.indexOf("(") + 1, e5.indexOf(")")) : e5.slice(0, e5.indexOf("=") - 1);
  if (t4 === "")
    return false;
  let r5 = t4.charCodeAt(0) === 123 ? t4.indexOf("...") : -1, s3 = r5 !== -1 ? t4.slice(r5 + 3, t4.indexOf(" ", r5 + 3)) : undefined, n2 = [t4];
  for (let t5 of (s3 && n2.push(s3), e5.matchAll(d)))
    n2.push(t5[1]);
  for (let t5 of n2)
    if (RegExp(`\\b\\w+\\([^)]*\\b${t5}\\b[^)]*\\)`).test(e5))
      return true;
  let o = RegExp(`{.*?} = (${n2.join("|")})`, "g");
  for (let [t5] of e5.matchAll(o))
    if (RegExp(`\\b\\w+\\([^)]*\\b${t5}\\b[^)]*\\)`).test(e5))
      return true;
  return false;
};
var $ = Symbol.for("TypeBox.Kind");
var hasType = (e5, t4) => {
  if (t4) {
    if ($ in t4 && t4[$] === e5)
      return true;
    if (t4.type === "object") {
      let r5 = t4.properties;
      for (let t5 of Object.keys(r5)) {
        let s3 = r5[t5];
        if (s3.type === "object") {
          if (hasType(e5, s3))
            return true;
        } else if (s3.anyOf) {
          for (let t6 = 0;t6 < s3.anyOf.length; t6++)
            if (hasType(e5, s3.anyOf[t6]))
              return true;
        }
        if ($ in s3 && s3[$] === e5)
          return true;
      }
      return false;
    }
    return t4.properties && $ in t4.properties && t4.properties[$] === e5;
  }
};
var g = Symbol.for("TypeBox.Transform");
var hasTransform = (e5) => {
  if (e5) {
    if (e5.type === "object" && e5.properties) {
      let t4 = e5.properties;
      for (let e6 of Object.keys(t4)) {
        let r5 = t4[e6];
        if (r5.type === "object") {
          if (hasTransform(r5))
            return true;
        } else if (r5.anyOf) {
          for (let e7 = 0;e7 < r5.anyOf.length; e7++)
            if (hasTransform(r5.anyOf[e7]))
              return true;
        }
        let s3 = g in r5;
        if (s3)
          return true;
      }
      return false;
    }
    return g in e5 || e5.properties && g in e5.properties;
  }
};
var b = (e5) => {
  if (!e5)
    return;
  let t4 = e5?.schema;
  if (t4 && "anyOf" in t4) {
    let e6 = false, r5 = t4.anyOf[0].type;
    for (let s3 of t4.anyOf)
      if (s3.type !== r5) {
        e6 = true;
        break;
      }
    if (!e6)
      return r5;
  }
  return e5.schema?.type;
};
var k = /(?:return|=>) \S*\(/g;
var isAsync = (e5) => e5.constructor.name === "AsyncFunction" || e5.toString().match(k);
var composeHandler = ({ path: d2, method: $2, hooks: g2, validator: k2, handler: w, handleError: x, definitions: q, schema: R, onRequest: H, config: v, getReporter: E }) => {
  let A = v.forceErrorEncapsulation || g2.error.length > 0 || typeof Bun == "undefined" || g2.onResponse.length > 0 || !!g2.trace.length, O = g2.onResponse.length ? `
;(async () => {${g2.onResponse.map((e5, t4) => `await res${t4}(c)`).join(";")}})();
` : "", F = g2.trace.map((e5) => e5.toString()), C = false;
  if (y(w.toString()) && (C = true), !C) {
    for (let [e5, t4] of Object.entries(g2))
      if (Array.isArray(t4) && t4.length && ["parse", "transform", "beforeHandle", "afterHandle", "onResponse"].includes(e5)) {
        for (let e6 of t4)
          if (typeof e6 == "function" && y(e6.toString())) {
            C = true;
            break;
          }
        if (C)
          break;
      }
  }
  let T = { parse: F.some((e5) => isFnUse("parse", e5)), transform: F.some((e5) => isFnUse("transform", e5)), handle: F.some((e5) => isFnUse("handle", e5)), beforeHandle: F.some((e5) => isFnUse("beforeHandle", e5)), afterHandle: F.some((e5) => isFnUse("afterHandle", e5)), error: A || F.some((e5) => isFnUse("error", e5)) }, j = g2.trace.length > 0, S = "", U = k2 || $2 !== "GET" && $2 !== "HEAD" ? [w, ...g2.transform, ...g2.beforeHandle, ...g2.afterHandle].map((e5) => e5.toString()) : [], D = $2 !== "GET" && $2 !== "HEAD" && (C || g2.type !== "none" && (!!k2.body || !!g2.type || U.some((e5) => isFnUse("body", e5)))), V = C || k2.headers || U.some((e5) => isFnUse("headers", e5)), I = C || k2.cookie || U.some((e5) => isFnUse("cookie", e5)), N = k2?.cookie?.schema, _ = "";
  if (N?.sign) {
    if (!N.secrets)
      throw Error(`t.Cookie required secret which is not set in (${$2}) ${d2}.`);
    let e5 = N.secrets ? typeof N.secrets == "string" ? N.secrets : N.secrets[0] : undefined;
    if (_ += `const _setCookie = c.set.cookie
		if(_setCookie) {`, N.sign === true)
      _ += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${e5}')
			}`;
    else
      for (let t4 of N.sign)
        _ += `if(_setCookie['${t4}']?.value) { c.set.cookie['${t4}'].value = await signCookie(_setCookie['${t4}'].value, '${e5}') }
`;
    _ += `}
`;
  }
  let { composeValidation: B, composeResponseValidation: P } = h(A);
  if (V && (S += u ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`), I) {
    let e5 = (e6, t5) => {
      let r5 = N?.[e6] ?? t5;
      return r5 ? typeof r5 == "string" ? `${e6}: '${r5}',` : r5 instanceof Date ? `${e6}: new Date(${r5.getTime()}),` : `${e6}: ${r5},` : typeof t5 == "string" ? `${e6}: "${t5}",` : `${e6}: ${t5},`;
    }, t4 = N ? `{
			secret: ${N.secrets !== undefined ? typeof N.secrets == "string" ? `'${N.secrets}'` : "[" + N.secrets.reduce((e6, t5) => e6 + `'${t5}',`, "") + "]" : "undefined"},
			sign: ${N.sign === true || (N.sign !== undefined ? "[" + N.sign.reduce((e6, t5) => e6 + `'${t5}',`, "") + "]" : "undefined")},
			${e5("domain")}
			${e5("expires")}
			${e5("httpOnly")}
			${e5("maxAge")}
			${e5("path", "/")}
			${e5("priority")}
			${e5("sameSite")}
			${e5("secure")}
		}` : "undefined";
    V ? S += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${t4})
` : S += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${t4})
`;
  }
  let W = C || k2.query || U.some((e5) => isFnUse("query", e5));
  W && (S += `const url = c.request.url

		if(c.qi !== -1) {
			c.query ??= parseQuery(url.substring(c.qi + 1))
		} else {
			c.query ??= {}
		}
		`);
  let G = g2.trace.map((e5) => e5.toString()), L = G.some((e5) => isFnUse("set", e5) || y(e5));
  C || g2.trace.some((e5) => isFnUse("set", e5.toString()));
  let Q = L || I || U.some((e5) => isFnUse("set", e5)) || H.some((e5) => isFnUse("set", e5.toString()));
  j && (S += `
const id = c.$$requestId
`);
  let J = m({ hasTrace: j, hasTraceSet: L, condition: T, addFn: (e5) => {
    S += e5;
  } });
  if (S += A ? `try {
` : "", j) {
    S += `
const traceDone = Promise.all([`;
    for (let e5 = 0;e5 < g2.trace.length; e5++)
      S += `new Promise(r => { reporter.once(\`res\${id}.${e5}\`, r) }),`;
    S += `])
`;
  }
  let K = I || D || L || isAsync(w) || g2.parse.length > 0 || g2.afterHandle.some(isAsync) || g2.beforeHandle.some(isAsync) || g2.transform.some(isAsync), z = J("parse", { unit: g2.parse.length });
  if (D) {
    let e5 = b(k2?.body);
    if (g2.type && !Array.isArray(g2.type)) {
      if (g2.type)
        switch (g2.type) {
          case "json":
          case "application/json":
            S += `c.body = await c.request.json()
`;
            break;
          case "text":
          case "text/plain":
            S += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            S += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            S += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            S += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
`;
        }
      g2.parse.length && (S += "}}");
    } else {
      let t4 = (() => {
        if (g2.parse.length && e5 && !Array.isArray(g2.type)) {
          let t5 = k2?.body?.schema;
          if (e5 === "object" && (hasType("File", t5) || hasType("Files", t5)))
            return `c.body = {}
		
								const form = await c.request.formData()
								for (const key of form.keys()) {
									if (c.body[key])
										continue
			
									const value = form.getAll(key)
									if (value.length === 1)
										c.body[key] = value[0]
									else c.body[key] = value
								}`;
        }
      })();
      if (t4)
        S += t4;
      else {
        if (S += `
` + (V ? "let contentType = c.headers['content-type']" : "let contentType = c.request.headers.get('content-type')") + `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)
`, g2.parse.length) {
          S += `let used = false
`;
          let e6 = J("parse", { unit: g2.parse.length });
          for (let e7 = 0;e7 < g2.parse.length; e7++) {
            let t5 = J("parse.unit", { name: g2.parse[e7].name }), r5 = `bo${e7}`;
            e7 !== 0 && (S += `if(!used) {
`), S += `let ${r5} = parse[${e7}](c, contentType)
if(${r5} instanceof Promise) ${r5} = await ${r5}
if(${r5} !== undefined) { c.body = ${r5}; used = true }
`, t5(), e7 !== 0 && (S += "}");
          }
          e6();
        }
        g2.parse.length && (S += "if (!used)"), S += `
				switch (contentType) {
					case 'application/json':
						c.body = await c.request.json()
						break
				
					case 'text/plain':
						c.body = await c.request.text()
						break
				
					case 'application/x-www-form-urlencoded':
						c.body = parseQuery(await c.request.text())
						break
				
					case 'application/octet-stream':
						c.body = await c.request.arrayBuffer();
						break
				
					case 'multipart/form-data':
						c.body = {}
				
						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue
				
							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
				
						break
					}
}
`;
      }
    }
    S += `
`;
  }
  if (z(), g2?.transform) {
    let e5 = J("transform", { unit: g2.transform.length });
    for (let e6 = 0;e6 < g2.transform.length; e6++) {
      let t4 = g2.transform[e6], r5 = J("transform.unit", { name: t4.name });
      t4.$elysia === "derive" ? S += isAsync(g2.transform[e6]) ? `Object.assign(c, await transform[${e6}](c));` : `Object.assign(c, transform[${e6}](c));` : S += isAsync(g2.transform[e6]) ? `await transform[${e6}](c);` : `transform[${e6}](c);`, r5();
    }
    e5();
  }
  if (k2 && (S += `
`, k2.headers && (S += `if(headers.Check(c.headers) === false) {
				${B("headers")}
			}`, hasTransform(k2.headers.schema) && (S += `
c.headers = headers.Decode(c.headers)
`)), k2.params && (S += `if(params.Check(c.params) === false) {
				${B("params")}
			}`, hasTransform(k2.params.schema) && (S += `
c.params = params.Decode(c.params)
`)), k2.query && (S += `if(query.Check(c.query) === false) {
				${B("query")} 
			}`, hasTransform(k2.query.schema) && (S += `
c.query = query.Decode(Object.assign({}, c.query))
`)), k2.body && (S += `if(body.Check(c.body) === false) { 
				${B("body")}
			}`, hasTransform(k2.body.schema) && (S += `
c.body = body.Decode(c.body)
`)), isNotEmpty(k2.cookie?.schema.properties ?? {}) && (S += `const cookieValue = {}
			for(const [key, value] of Object.entries(c.cookie))
				cookieValue[key] = value.value

			if(cookie.Check(cookieValue) === false) {
				${B("cookie", "cookieValue")}
			}`, hasTransform(k2.cookie.schema) && (S += `
c.cookie = params.Decode(c.cookie)
`))), g2?.beforeHandle) {
    let e5 = J("beforeHandle", { unit: g2.beforeHandle.length });
    for (let e6 = 0;e6 < g2.beforeHandle.length; e6++) {
      let t4 = J("beforeHandle.unit", { name: g2.beforeHandle[e6].name }), r5 = `be${e6}`, s3 = hasReturn(g2.beforeHandle[e6].toString());
      if (s3) {
        S += isAsync(g2.beforeHandle[e6]) ? `let ${r5} = await beforeHandle[${e6}](c);
` : `let ${r5} = beforeHandle[${e6}](c);
`, t4(), S += `if(${r5} !== undefined) {
`;
        let s4 = J("afterHandle", { unit: g2.transform.length });
        if (g2.afterHandle)
          for (let e7 = 0;e7 < g2.afterHandle.length; e7++) {
            let t5 = hasReturn(g2.afterHandle[e7].toString()), s5 = J("afterHandle.unit", { name: g2.afterHandle[e7].name });
            if (S += `c.response = ${r5}
`, t5) {
              let t6 = `af${e7}`;
              S += (isAsync(g2.afterHandle[e7]) ? `const ${t6} = await afterHandle[${e7}](c);
` : `const ${t6} = afterHandle[${e7}](c);
`) + `if(${t6} !== undefined) { c.response = ${r5} = ${t6} }
`;
            } else
              S += isAsync(g2.afterHandle[e7]) ? `await afterHandle[${e7}](c, ${r5});
` : `afterHandle[${e7}](c, ${r5});
`;
            s5();
          }
        s4(), k2.response && (S += P(r5)), S += _ + `return mapEarlyResponse(${r5}, c.set)}
`;
      } else
        S += isAsync(g2.beforeHandle[e6]) ? `await beforeHandle[${e6}](c);
` : `beforeHandle[${e6}](c);
`, t4();
    }
    e5();
  }
  if (g2?.afterHandle.length) {
    let e5 = J("handle", { name: w.name });
    g2.afterHandle.length ? S += isAsync(w) ? `let r = c.response = await handler(c);
` : `let r = c.response = handler(c);
` : S += isAsync(w) ? `let r = await handler(c);
` : `let r = handler(c);
`, e5();
    let t4 = J("afterHandle", { unit: g2.afterHandle.length });
    for (let e6 = 0;e6 < g2.afterHandle.length; e6++) {
      let r5 = `af${e6}`, s3 = hasReturn(g2.afterHandle[e6].toString()), n2 = J("afterHandle.unit", { name: g2.afterHandle[e6].name });
      s3 ? (k2.response ? S += isAsync(g2.afterHandle[e6]) ? `let ${r5} = await afterHandle[${e6}](c)
` : `let ${r5} = afterHandle[${e6}](c)
` : S += isAsync(g2.afterHandle[e6]) ? `let ${r5} = mapEarlyResponse(await afterHandle[${e6}](c), c.set)
` : `let ${r5} = mapEarlyResponse(afterHandle[${e6}](c), c.set)
`, n2(), k2.response ? (S += `if(${r5} !== undefined) {` + P(r5) + `${r5} = mapEarlyResponse(${r5}, c.set)
` + `if(${r5}) {`, t4(), L && (S += `${r5} = mapEarlyResponse(${r5}, c.set)
`), S += `return ${r5} } }`) : (S += `if(${r5}) {`, t4(), S += `return ${r5}}
`)) : (S += isAsync(g2.afterHandle[e6]) ? `await afterHandle[${e6}](c)
` : `afterHandle[${e6}](c)
`, n2());
    }
    t4(), S += `r = c.response
`, k2.response && (S += P()), S += _, Q ? S += `return mapResponse(r, c.set)
` : S += `return mapCompactResponse(r)
`;
  } else {
    let e5 = J("handle", { name: w.name });
    if (k2.response)
      S += isAsync(w) ? `const r = await handler(c);
` : `const r = handler(c);
`, e5(), S += P(), J("afterHandle")(), S += _, Q ? S += `return mapResponse(r, c.set)
` : S += `return mapCompactResponse(r)
`;
    else if (T.handle || I)
      S += isAsync(w) ? `let r = await handler(c);
` : `let r = handler(c);
`, e5(), J("afterHandle")(), S += _, Q ? S += `return mapResponse(r, c.set)
` : S += `return mapCompactResponse(r)
`;
    else {
      e5();
      let t4 = isAsync(w) ? "await handler(c) " : "handler(c)";
      J("afterHandle")(), Q ? S += `return mapResponse(${t4}, c.set)
` : S += `return mapCompactResponse(${t4})
`;
    }
  }
  if (A || O) {
    S += `
} catch(error) {`, K || (S += "return (async () => {"), S += `const set = c.set

		if (!set.status || set.status < 300) set.status = error?.status || 500
	`;
    let e5 = J("error", { unit: g2.error.length });
    if (g2.error.length) {
      S += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
			`;
      for (let e6 = 0;e6 < g2.error.length; e6++) {
        let t4 = `er${e6}`, r5 = J("error.unit", { name: g2.error[e6].name });
        S += `
let ${t4} = handleErrors[${e6}](c)
`, isAsync(g2.error[e6]) && (S += `if (${t4} instanceof Promise) ${t4} = await ${t4}
`), r5(), S += `${t4} = mapEarlyResponse(${t4}, set)
if (${t4}) {return ${t4} }
`;
      }
    }
    if (e5(), S += `return handleError(c, error)

`, K || (S += "})()"), S += "}", O || j) {
      S += " finally { ";
      let e6 = J("response", { unit: g2.onResponse.length });
      S += O, e6(), S += "}";
    }
  }
  S = `const { 
		handler,
		handleError,
		hooks: {
			transform,
			beforeHandle,
			afterHandle,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie
	} = hooks

	${g2.onResponse.length ? `const ${g2.onResponse.map((e5, t4) => `res${t4} = onResponse[${t4}]`).join(",")}` : ""}

	return ${K ? "async" : ""} function(c) {
		${R && q ? "c.schema = schema; c.defs = definitions;" : ""}
		${S}
	}`;
  let M = Function("hooks", S);
  return M({ handler: w, hooks: g2, validator: k2, handleError: x, utils: { mapResponse, mapCompactResponse, mapEarlyResponse, parseQuery: import_fast_querystring.parse }, error: { NotFoundError, ValidationError, InternalServerError }, schema: R, definitions: q, ERROR_CODE, getReporter: E, requestId: p, parseCookie, signCookie });
};
var composeGeneralHandler = (e5) => {
  let t4 = "", s3 = "";
  for (let r5 of Object.keys(e5.decorators))
    t4 += `,${r5}: app.decorators.${r5}`;
  let { router: n2, staticRouter: o } = e5, i = e5.event.trace.length > 0, c = `
	const route = find(request.method, path) ${n2.root.ALL ? '?? find("ALL", path)' : ""}
	if (route === null)
		return ${e5.event.error.length ? "app.handleError(ctx, notFound)" : `new Response(error404, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})`}

	ctx.params = route.params

	return route.store(ctx)`, l = "";
  for (let [e6, { code: t5, all: r5 }] of Object.entries(o.map))
    l += `case '${e6}':
switch(request.method) {
${t5}
${r5 ?? "default: break map"}}

`;
  let f = e5.event.request.some(isAsync);
  s3 += `const {
		app,
		app: { store, router, staticRouter, wsRouter },
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter
	} = data

	const notFound = new NotFoundError()

	${e5.event.request.length ? "const onRequest = app.event.request" : ""}

	${o.variables}

	const find = router.find.bind(router)
	const findWs = wsRouter.find.bind(wsRouter)
	const handleError = app.handleError.bind(this)

	${e5.event.error.length ? "" : "const error404 = notFound.message.toString()"}

	return ${f ? "async" : ""} function map(request) {
	`;
  let u2 = e5.event.trace.map((e6) => e6.toString()), d2 = m({ hasTrace: i, hasTraceSet: e5.event.trace.some((e6) => {
    let t5 = e6.toString();
    return isFnUse("set", t5) || y(t5);
  }), condition: { request: u2.some((e6) => isFnUse("request", e6) || y(e6)) }, addFn: (e6) => {
    s3 += e6;
  } });
  if (e5.event.request.length) {
    s3 += `
			${i ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				set: {
					cookie: {},
					headers: {},
					status: 200
				}
				${i ? ",$$requestId: +id" : ""}
				${t4}
			}
		`;
    let r5 = d2("request", { attribute: "ctx", unit: e5.event.request.length });
    s3 += `try {
`;
    for (let t5 = 0;t5 < e5.event.request.length; t5++) {
      let r6 = e5.event.request[t5], n3 = hasReturn(r6.toString()), o2 = isAsync(r6), a3 = d2("request.unit", { name: e5.event.request[t5].name }), i2 = `re${t5}`;
      n3 ? (s3 += `const ${i2} = mapEarlyResponse(
					${o2 ? "await" : ""} onRequest[${t5}](ctx),
					ctx.set
				)
`, a3(), s3 += `if(${i2}) return ${i2}
`) : (s3 += `${o2 ? "await" : ""} onRequest[${t5}](ctx)
`, a3());
    }
    s3 += `} catch (error) {
			return app.handleError(ctx, error)
		}`, r5(), s3 += `
		const url = request.url,
		s = url.indexOf('/', 11),
		i = ctx.qi = url.indexOf('?', s + 1),
		path = ctx.path = i === -1 ? url.substring(s) : url.substring(s, i);`;
  } else
    s3 += `
		const url = request.url,
			s = url.indexOf('/', 11),
			qi = url.indexOf('?', s + 1),
			path = qi === -1
				? url.substring(s)
				: url.substring(s, qi)

		${i ? "const id = +requestId.value++" : ""}

		const ctx = {
			request,
			store,
			qi,
			path,
			set: {
				headers: {},
				status: 200
			}
			${i ? ",$$requestId: id" : ""}
			${t4}
		}`, d2("request", { unit: e5.event.request.length, attribute: u2.some((e6) => isFnUse("context", e6)) || u2.some((e6) => isFnUse("store", e6)) || u2.some((e6) => isFnUse("set", e6)) ? "ctx" : "" })();
  let { wsPaths: h2, wsRouter: $2 } = e5;
  if (Object.keys(h2).length || $2.history.length) {
    for (let [e6, t5] of (s3 += `
			if(request.method === 'GET') {
				switch(path) {`, Object.entries(h2)))
      s3 += `
					case '${e6}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${t5}(ctx)
							
						break`;
    s3 += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = findWs('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}
`;
  }
  return s3 += `
		map: switch(path) {
			${l}

			default:
				break
		}

		${c}
	}`, e5.handleError = composeErrorHandler(e5), Function("data", s3)({
    app: e5,
    mapEarlyResponse,
    NotFoundError,
    getReporter: () => e5.reporter,
    requestId: p
  });
};
var composeErrorHandler = (e5) => {
  let t4 = `const {
		app: { event: { error: onError, onResponse: res } },
		mapResponse,
		ERROR_CODE
	} = inject

	return ${e5.event.error.find(isAsync) ? "async" : ""} function(context, error) {
		const { set } = context

		context.code = error.code
		context.error = error
		`;
  for (let r5 = 0;r5 < e5.event.error.length; r5++) {
    let s3 = e5.event.error[r5], n2 = `${isAsync(s3) ? "await " : ""}onError[${r5}](context)`;
    hasReturn(s3.toString()) ? t4 += `const r${r5} = ${n2}; if(r${r5} !== undefined) {
				if(set.status === 200) set.status = error.status
				return mapResponse(r${r5}, set)
			}
` : t4 += n2 + `
`;
  }
  return Function("inject", t4 += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 400
		return new Response(
			error.message, 
			{ headers: set.headers, status: set.status }
		)
	} else {
		return new Response(error.message, { headers: set.headers, status: error.status ?? 500 })
	}
}`)({ app: e5, mapResponse, ERROR_CODE });
};

// node_modules/elysia/dist/dynamic-handle.js
var import_fast_querystring2 = __toESM(require_lib(), 1);
var createDynamicHandler = (n2) => async (l) => {
  let f;
  let c = { cookie: {}, status: 200, headers: {} };
  n2.decorators ? ((f = n2.decorators).request = l, f.set = c, f.store = n2.store) : f = { set: c, store: n2.store, request: l };
  let d2 = l.url, u2 = d2.indexOf("/", 11), h2 = d2.indexOf("?", u2 + 1), m2 = h2 === -1 ? d2.substring(u2) : d2.substring(u2, h2);
  try {
    let u3;
    for (let t4 = 0;t4 < n2.event.request.length; t4++) {
      let r5 = n2.event.request[t4], a3 = r5(f);
      if (a3 instanceof Promise && (a3 = await a3), a3 = mapEarlyResponse(a3, c))
        return a3;
    }
    let p2 = n2.dynamicRouter.find(l.method, m2) ?? n2.dynamicRouter.find("ALL", m2);
    if (!p2)
      throw new NotFoundError;
    let { handle: w, hooks: g2, validator: k2, content: y2 } = p2.store;
    if (l.method !== "GET" && l.method !== "HEAD") {
      if (y2)
        switch (y2) {
          case "application/json":
            u3 = await l.json();
            break;
          case "text/plain":
            u3 = await l.text();
            break;
          case "application/x-www-form-urlencoded":
            u3 = import_fast_querystring2.parse(await l.text());
            break;
          case "application/octet-stream":
            u3 = await l.arrayBuffer();
            break;
          case "multipart/form-data":
            u3 = {};
            let e5 = await l.formData();
            for (let t4 of e5.keys()) {
              if (u3[t4])
                continue;
              let r5 = e5.getAll(t4);
              r5.length === 1 ? u3[t4] = r5[0] : u3[t4] = r5;
            }
        }
      else {
        let e5 = l.headers.get("content-type");
        if (e5) {
          let t4 = e5.indexOf(";");
          t4 !== -1 && (e5 = e5.slice(0, t4));
          for (let t5 = 0;t5 < n2.event.parse.length; t5++) {
            let r5 = n2.event.parse[t5](f, e5);
            if (r5 instanceof Promise && (r5 = await r5), r5) {
              u3 = r5;
              break;
            }
          }
          if (u3 === undefined)
            switch (e5) {
              case "application/json":
                u3 = await l.json();
                break;
              case "text/plain":
                u3 = await l.text();
                break;
              case "application/x-www-form-urlencoded":
                u3 = import_fast_querystring2.parse(await l.text());
                break;
              case "application/octet-stream":
                u3 = await l.arrayBuffer();
                break;
              case "multipart/form-data":
                u3 = {};
                let r5 = await l.formData();
                for (let e6 of r5.keys()) {
                  if (u3[e6])
                    continue;
                  let t5 = r5.getAll(e6);
                  t5.length === 1 ? u3[e6] = t5[0] : u3[e6] = t5;
                }
            }
        }
      }
    }
    for (let [e5, t4] of (f.body = u3, f.params = p2?.params || undefined, f.query = h2 === -1 ? {} : import_fast_querystring2.parse(d2.substring(h2 + 1)), f.headers = {}, l.headers.entries()))
      f.headers[e5] = t4;
    let v = k2?.cookie?.schema;
    f.cookie = await parseCookie(f.set, f.headers.cookie, v ? { secret: v.secrets !== undefined ? typeof v.secrets == "string" ? v.secrets : v.secrets.join(",") : undefined, sign: v.sign === true || (v.sign !== undefined ? typeof v.sign == "string" ? v.sign : v.sign.join(",") : undefined) } : undefined);
    for (let e5 = 0;e5 < g2.transform.length; e5++) {
      let t4 = g2.transform[e5](f);
      g2.transform[e5].$elysia === "derive" ? t4 instanceof Promise ? Object.assign(f, await t4) : Object.assign(f, t4) : t4 instanceof Promise && await t4;
    }
    if (k2) {
      if (k2.headers) {
        let e5 = {};
        for (let t4 in l.headers)
          e5[t4] = l.headers.get(t4);
        if (k2.headers.Check(e5) === false)
          throw new ValidationError("header", k2.headers, e5);
      }
      if (k2.params?.Check(f.params) === false)
        throw new ValidationError("params", k2.params, f.params);
      if (k2.query?.Check(f.query) === false)
        throw new ValidationError("query", k2.query, f.query);
      if (k2.cookie) {
        let e5 = {};
        for (let [t4, r5] of Object.entries(f.cookie))
          e5[t4] = r5.value;
        if (k2.cookie?.Check(e5) === false)
          throw new ValidationError("cookie", k2.cookie, e5);
      }
      if (k2.body?.Check(u3) === false)
        throw new ValidationError("body", k2.body, u3);
    }
    for (let t4 = 0;t4 < g2.beforeHandle.length; t4++) {
      let r5 = g2.beforeHandle[t4](f);
      if (r5 instanceof Promise && (r5 = await r5), r5 !== undefined) {
        f.response = r5;
        for (let e5 = 0;e5 < g2.afterHandle.length; e5++) {
          let t6 = g2.afterHandle[e5](f);
          t6 instanceof Promise && (t6 = await t6), t6 && (r5 = t6);
        }
        let t5 = mapEarlyResponse(r5, f.set);
        if (t5)
          return t5;
      }
    }
    let b2 = w(f);
    if (b2 instanceof Promise && (b2 = await b2), g2.afterHandle.length) {
      f.response = b2;
      for (let t4 = 0;t4 < g2.afterHandle.length; t4++) {
        let r5 = g2.afterHandle[t4](f);
        r5 instanceof Promise && (r5 = await r5);
        let s4 = mapEarlyResponse(r5, f.set);
        if (s4 !== undefined) {
          let e5 = k2?.response?.[b2.status];
          if (e5?.Check(s4) === false)
            throw new ValidationError("response", e5, s4);
          return s4;
        }
      }
    } else {
      let e5 = k2?.response?.[b2.status];
      if (e5?.Check(b2) === false)
        throw new ValidationError("response", e5, b2);
    }
    if (f.set.cookie && v?.sign) {
      let e5 = v.secrets ? typeof v.secrets == "string" ? v.secrets : v.secrets[0] : undefined;
      if (v.sign === true)
        for (let [e6, t4] of Object.entries(f.set.cookie))
          f.set.cookie[e6].value = await signCookie(t4.value, "${secret}");
      else
        for (let t4 of v.sign)
          t4 in v.properties && f.set.cookie[t4]?.value && (f.set.cookie[t4].value = await signCookie(f.set.cookie[t4].value, e5));
    }
    return mapResponse(b2, f.set);
  } catch (e5) {
    return e5.status && (c.status = e5.status), n2.handleError(f, e5);
  } finally {
    for (let e5 of n2.event.onResponse)
      await e5(f);
  }
};
var createDynamicErrorHandler = (e5) => async (r5, a3) => {
  let s4 = Object.assign(r5, { error: a3, code: a3.code });
  s4.set = r5.set;
  for (let a4 = 0;a4 < e5.event.error.length; a4++) {
    let o = e5.event.error[a4](s4);
    if (o instanceof Promise && (o = await o), o != null)
      return mapResponse(o, r5.set);
  }
  return new Response(typeof a3.cause == "string" ? a3.cause : a3.message, { headers: r5.set.headers, status: a3.status ?? 500 });
};

// node_modules/elysia/dist/type-system.js
var exports_type_system = {};
__export(exports_type_system, {
  t: () => import_typebox2.Type,
  ElysiaType: () => ElysiaType
});
var import_system = __toESM(require_system2(), 1);
var import_typebox2 = __toESM(require_typebox(), 1);
var import_value3 = __toESM(require_value2(), 1);
__reExport(exports_type_system, __toESM(require_system2(), 1));
__reExport(exports_type_system, __toESM(require_compiler2(), 1));
try {
  import_system.TypeSystem.Format("email", (e6) => /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(e6)), import_system.TypeSystem.Format("uuid", (e6) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e6)), import_system.TypeSystem.Format("date", (e6) => !Number.isNaN(new Date(e6).getTime())), import_system.TypeSystem.Format("date-time", (e6) => !Number.isNaN(new Date(e6).getTime()));
} catch (e6) {}
var a3 = (e6) => {
  if (typeof e6 == "string")
    switch (e6.slice(-1)) {
      case "k":
        return 1024 * +e6.slice(0, e6.length - 1);
      case "m":
        return 1048576 * +e6.slice(0, e6.length - 1);
      default:
        return +e6;
    }
  return e6;
};
var s4 = (e6, t5) => {
  if (!(t5 instanceof Blob) || e6.minSize && t5.size < a3(e6.minSize) || e6.maxSize && t5.size > a3(e6.maxSize))
    return false;
  if (e6.extension) {
    if (typeof e6.extension == "string") {
      if (!t5.type.startsWith(e6.extension))
        return false;
    } else {
      for (let r6 = 0;r6 < e6.extension.length; r6++)
        if (t5.type.startsWith(e6.extension[r6]))
          return true;
      return false;
    }
  }
  return true;
};
var o = import_system.TypeSystem.Type("Files", (e6, t5) => {
  if (!Array.isArray(t5))
    return s4(e6, t5);
  if (e6.minItems && t5.length < e6.minItems || e6.maxItems && t5.length > e6.maxItems)
    return false;
  for (let r6 = 0;r6 < t5.length; r6++)
    if (!s4(e6, t5[r6]))
      return false;
  return true;
});
import_typebox2.FormatRegistry.Set("numeric", (e6) => !!e6 && !isNaN(+e6)), import_typebox2.FormatRegistry.Set("ObjectString", (e6) => {
  let t5 = e6.charCodeAt(0);
  if ((t5 === 9 || t5 === 10 || t5 === 32) && (t5 = e6.trimStart().charCodeAt(0)), t5 !== 123 && t5 !== 91)
    return false;
  try {
    return JSON.parse(e6), true;
  } catch {
    return false;
  }
});
var ElysiaType = {
  Numeric: (e6) => {
    let r6 = import_typebox2.Type.Number(e6);
    return import_typebox2.Type.Transform(import_typebox2.Type.Union([import_typebox2.Type.String({ format: "numeric", default: 0 }), r6])).Decode((t5) => {
      let a4 = +t5;
      if (isNaN(a4))
        return t5;
      if (e6 && !import_value3.Value.Check(r6, a4))
        throw new ValidationError("property", r6, a4);
      return a4;
    }).Encode((e7) => e7);
  },
  ObjectString: (e6, r6) => import_typebox2.Type.Transform(import_typebox2.Type.Union([import_typebox2.Type.String({ format: "ObjectString", default: "" }), import_typebox2.Type.Object(e6, r6)])).Decode((e7) => {
    if (typeof e7 == "string")
      try {
        return JSON.parse(e7);
      } catch {}
    return e7;
  }).Encode((e7) => JSON.stringify(e7)),
  File: import_system.TypeSystem.Type("File", s4),
  Files: (e6 = {}) => import_typebox2.Type.Transform(o(e6)).Decode((e7) => Array.isArray(e7) ? e7 : [e7]).Encode((e7) => e7),
  Nullable: (e6) => import_typebox2.Type.Union([import_typebox2.Type.Null(), e6]),
  MaybeEmpty: (e6) => import_typebox2.Type.Union([import_typebox2.Type.Null(), import_typebox2.Type.Undefined(), e6]),
  Cookie: (e6, r6) => import_typebox2.Type.Object(e6, r6)
};
import_typebox2.Type.ObjectString = ElysiaType.ObjectString, import_typebox2.Type.Numeric = ElysiaType.Numeric, import_typebox2.Type.File = (e6 = {}) => ElysiaType.File({ default: "File", ...e6, extension: e6?.type, type: "string", format: "binary" }), import_typebox2.Type.Files = (e6 = {}) => ElysiaType.Files({ ...e6, elysiaMeta: "Files", default: "Files", extension: e6?.type, type: "array", items: { ...e6, default: "Files", type: "string", format: "binary" } }), import_typebox2.Type.Nullable = (e6) => ElysiaType.Nullable(e6), import_typebox2.Type.MaybeEmpty = ElysiaType.MaybeEmpty, import_typebox2.Type.Cookie = ElysiaType.Cookie;

// node_modules/elysia/dist/index.js
class q {
  config;
  dependencies = {};
  store = {};
  decorators = {};
  definitions = { type: {}, error: {} };
  schema = {};
  event = { start: [], request: [], parse: [], transform: [], beforeHandle: [], afterHandle: [], onResponse: [], trace: [], error: [], stop: [] };
  reporter = new eventemitter3_default;
  server = null;
  getServer() {
    return this.server;
  }
  validator = null;
  router = new Memoirist;
  wsRouter = new Memoirist;
  routes = [];
  staticRouter = { handlers: [], variables: "", map: {}, all: "" };
  wsPaths = {};
  dynamicRouter = new Memoirist;
  lazyLoadModules = [];
  path = "";
  constructor(e6) {
    this.config = { forceErrorEncapsulation: true, prefix: "", aot: true, strictPath: false, scoped: false, cookie: {}, ...e6, seed: e6?.seed === undefined ? "" : e6?.seed };
  }
  add(e6, t5, r6, s5, { allowMeta: i2 = false, skipPrefix: a4 = false } = { allowMeta: false, skipPrefix: false }) {
    for (let h2 of (typeof t5 == "string" && (t5 = [t5]), t5)) {
      if (h2 = h2 === "" ? h2 : h2.charCodeAt(0) === 47 ? h2 : `/${h2}`, this.config.prefix && !a4 && (h2 = this.config.prefix + h2), s5?.type)
        switch (s5.type) {
          case "text":
            s5.type = "text/plain";
            break;
          case "json":
            s5.type = "application/json";
            break;
          case "formdata":
            s5.type = "multipart/form-data";
            break;
          case "urlencoded":
            s5.type = "application/x-www-form-urlencoded";
            break;
          case "arrayBuffer":
            s5.type = "application/octet-stream";
        }
      let t6 = this.definitions.type, l = getSchemaValidator(s5?.cookie ?? this.validator?.cookie, { dynamic: !this.config.aot, models: t6, additionalProperties: true });
      isNotEmpty(this.config.cookie ?? {}) && (l ? l.schema = mergeCookie(l.schema, this.config.cookie ?? {}) : l = getSchemaValidator(import_typebox2.Type.Cookie({}, this.config.cookie), { dynamic: !this.config.aot, models: t6, additionalProperties: true }));
      let p2 = { body: getSchemaValidator(s5?.body ?? this.validator?.body, { dynamic: !this.config.aot, models: t6 }), headers: getSchemaValidator(s5?.headers ?? this.validator?.headers, { dynamic: !this.config.aot, models: t6, additionalProperties: true }), params: getSchemaValidator(s5?.params ?? this.validator?.params, { dynamic: !this.config.aot, models: t6 }), query: getSchemaValidator(s5?.query ?? this.validator?.query, { dynamic: !this.config.aot, models: t6 }), cookie: l, response: getResponseSchemaValidator(s5?.response ?? this.validator?.response, { dynamic: !this.config.aot, models: t6 }) }, m2 = mergeHook(this.event, s5), v = h2.endsWith("/") ? h2.slice(0, h2.length - 1) : h2 + "/";
      if (this.config.aot === false) {
        this.dynamicRouter.add(e6, h2, { validator: p2, hooks: m2, content: s5?.type, handle: r6 }), this.config.strictPath === false && this.dynamicRouter.add(e6, v, { validator: p2, hooks: m2, content: s5?.type, handle: r6 }), this.routes.push({ method: e6, path: h2, composed: null, handler: r6, hooks: m2 });
        return;
      }
      let y2 = composeHandler({ path: h2, method: e6, hooks: m2, validator: p2, handler: r6, handleError: this.handleError, onRequest: this.event.request, config: this.config, definitions: i2 ? this.definitions.type : undefined, schema: i2 ? this.schema : undefined, getReporter: () => this.reporter }), g2 = this.routes.findIndex((t7) => t7.path === h2 && t7.method === e6);
      if (g2 !== -1 && this.routes.splice(g2, 1), this.routes.push({ method: e6, path: h2, composed: y2, handler: r6, hooks: m2 }), e6 === "$INTERNALWS") {
        let e7 = this.config.strictPath ? undefined : h2.endsWith("/") ? h2.slice(0, h2.length - 1) : h2 + "/";
        if (h2.indexOf(":") === -1 && h2.indexOf("*") === -1) {
          let t7 = this.staticRouter.handlers.length;
          this.staticRouter.handlers.push(y2), this.staticRouter.variables += `const st${t7} = staticRouter.handlers[${t7}]
`, this.wsPaths[h2] = t7, e7 && (this.wsPaths[e7] = t7);
        } else
          this.wsRouter.add("ws", h2, y2), e7 && this.wsRouter.add("ws", e7, y2);
        return;
      }
      if (h2.indexOf(":") === -1 && h2.indexOf("*") === -1) {
        let t7 = this.staticRouter.handlers.length;
        this.staticRouter.handlers.push(y2), this.staticRouter.variables += `const st${t7} = staticRouter.handlers[${t7}]
`, this.staticRouter.map[h2] || (this.staticRouter.map[h2] = { code: "" }), e6 === "ALL" ? this.staticRouter.map[h2].all = `default: return st${t7}(ctx)
` : this.staticRouter.map[h2].code = `case '${e6}': return st${t7}(ctx)
${this.staticRouter.map[h2].code}`, this.config.strictPath || (this.staticRouter.map[v] || (this.staticRouter.map[v] = { code: "" }), e6 === "ALL" ? this.staticRouter.map[v].all = `default: return st${t7}(ctx)
` : this.staticRouter.map[v].code = `case '${e6}': return st${t7}(ctx)
${this.staticRouter.map[v].code}`);
      } else
        this.router.add(e6, h2, y2), this.config.strictPath || this.router.add(e6, h2.endsWith("/") ? h2.slice(0, h2.length - 1) : h2 + "/", y2);
    }
  }
  onStart(e6) {
    return this.on("start", e6), this;
  }
  onRequest(e6) {
    return this.on("request", e6), this;
  }
  onParse(e6) {
    return this.on("parse", e6), this;
  }
  onTransform(e6) {
    return this.on("transform", e6), this;
  }
  onBeforeHandle(e6) {
    return this.on("beforeHandle", e6), this;
  }
  onAfterHandle(e6) {
    return this.on("afterHandle", e6), this;
  }
  onResponse(e6) {
    return this.on("response", e6), this;
  }
  trace(e6) {
    return this.reporter.on("event", createTraceListener(() => this.reporter, this.event.trace.length, e6)), this.on("trace", e6), this;
  }
  addError(e6, t5) {
    return this.error(e6, t5);
  }
  error(e6, t5) {
    switch (typeof e6) {
      case "string":
        return t5.prototype[ERROR_CODE] = e6, this.definitions.error[e6] = t5, this;
      case "function":
        return this.definitions.error = e6(this.definitions.error), this;
    }
    for (let [t6, r6] of Object.entries(e6))
      r6.prototype[ERROR_CODE] = t6, this.definitions.error[t6] = r6;
    return this;
  }
  onError(e6) {
    return this.on("error", e6), this;
  }
  onStop(e6) {
    return this.on("stop", e6), this;
  }
  on(e6, t5) {
    for (let r6 of Array.isArray(t5) ? t5 : [t5])
      switch (r6 = asGlobal(r6), e6) {
        case "start":
          this.event.start.push(r6);
          break;
        case "request":
          this.event.request.push(r6);
          break;
        case "response":
          this.event.onResponse.push(r6);
          break;
        case "parse":
          this.event.parse.splice(this.event.parse.length - 1, 0, r6);
          break;
        case "transform":
          this.event.transform.push(r6);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(r6);
          break;
        case "afterHandle":
          this.event.afterHandle.push(r6);
          break;
        case "trace":
          this.event.trace.push(r6);
          break;
        case "error":
          this.event.error.push(r6);
          break;
        case "stop":
          this.event.stop.push(r6);
      }
    return this;
  }
  group(e6, t5, r6) {
    let s5 = new q({ ...this.config, prefix: "" });
    s5.store = this.store, s5.definitions = this.definitions, s5.getServer = () => this.server;
    let i2 = typeof t5 == "object", o2 = (i2 ? r6 : t5)(s5);
    return this.decorators = mergeDeep(this.decorators, s5.decorators), o2.event.request.length && (this.event.request = [...this.event.request, ...o2.event.request]), o2.event.onResponse.length && (this.event.onResponse = [...this.event.onResponse, ...o2.event.onResponse]), this.model(o2.definitions.type), Object.values(s5.routes).forEach(({ method: r7, path: s6, handler: n2, hooks: a4 }) => {
      s6 = (i2 ? "" : this.config.prefix) + e6 + s6, i2 ? this.add(r7, s6, n2, mergeHook(t5, { ...a4, error: a4.error ? Array.isArray(a4.error) ? [...a4.error, ...o2.event.error] : [a4.error, ...o2.event.error] : o2.event.error })) : this.add(r7, s6, n2, mergeHook(a4, { error: o2.event.error }), { skipPrefix: true });
    }), this;
  }
  guard(e6, t5) {
    if (!t5)
      return this.event = mergeLifeCycle(this.event, e6), this.validator = { body: e6.body, headers: e6.headers, params: e6.params, query: e6.query, response: e6.response }, this;
    let r6 = new q({ ...this.config, prefix: "" });
    r6.store = this.store, r6.definitions = this.definitions;
    let s5 = t5(r6);
    return this.decorators = mergeDeep(this.decorators, r6.decorators), s5.event.request.length && (this.event.request = [...this.event.request, ...s5.event.request]), s5.event.onResponse.length && (this.event.onResponse = [...this.event.onResponse, ...s5.event.onResponse]), this.model(s5.definitions.type), Object.values(r6.routes).forEach(({ method: t6, path: r7, handler: i2, hooks: o2 }) => {
      this.add(t6, r7, i2, mergeHook(e6, { ...o2, error: o2.error ? Array.isArray(o2.error) ? [...o2.error, ...s5.event.error] : [o2.error, ...s5.event.error] : s5.event.error }));
    }), this;
  }
  use(e6) {
    return e6 instanceof Promise ? (this.lazyLoadModules.push(e6.then((e7) => typeof e7 == "function" ? e7(this) : typeof e7.default == "function" ? e7.default(this) : this._use(e7)).then((e7) => e7.compile())), this) : this._use(e6);
  }
  _use(e6) {
    if (typeof e6 == "function") {
      let t6 = e6(this);
      return t6 instanceof Promise ? (this.lazyLoadModules.push(t6.then((e7) => {
        if (e7 instanceof q) {
          for (let { method: t7, path: r7, handler: s6, hooks: i2 } of (this.compile(), Object.values(e7.routes)))
            this.add(t7, r7, s6, mergeHook(i2, { error: e7.event.error }));
          return e7;
        }
        return typeof e7 == "function" ? e7(this) : typeof e7.default == "function" ? e7.default(this) : this._use(e7);
      }).then((e7) => e7.compile())), this) : t6;
    }
    let { name: t5, seed: r6 } = e6.config;
    e6.getServer = () => this.getServer();
    let s5 = e6.config.scoped;
    if (s5) {
      if (t5) {
        t5 in this.dependencies || (this.dependencies[t5] = []);
        let e7 = r6 !== undefined ? checksum(t5 + JSON.stringify(r6)) : 0;
        if (this.dependencies[t5].some((t6) => e7 === t6))
          return this;
        this.dependencies[t5].push(e7);
      }
      e6.model(this.definitions.type), e6.error(this.definitions.error), e6.onRequest((e7) => {
        Object.assign(e7, this.decorators), Object.assign(e7.store, this.store);
      }), e6.event.trace = [...this.event.trace, ...e6.event.trace], e6.config.aot && e6.compile();
      let s6 = this.mount(e6.fetch);
      return this.routes = this.routes.concat(s6.routes), this;
    }
    for (let t6 of (e6.reporter = this.reporter, e6.event.trace))
      this.trace(t6);
    for (let { method: t6, path: r7, handler: s6, hooks: i2 } of (this.decorate(e6.decorators), this.state(e6.store), this.model(e6.definitions.type), this.error(e6.definitions.error), Object.values(e6.routes)))
      this.add(t6, r7, s6, mergeHook(i2, { error: e6.event.error }));
    if (!s5) {
      if (t5) {
        t5 in this.dependencies || (this.dependencies[t5] = []);
        let s6 = r6 !== undefined ? checksum(t5 + JSON.stringify(r6)) : 0;
        if (this.dependencies[t5].some((e7) => s6 === e7))
          return this;
        this.dependencies[t5].push(s6), this.event = mergeLifeCycle(this.event, filterGlobalHook(e6.event), s6);
      } else
        this.event = mergeLifeCycle(this.event, filterGlobalHook(e6.event));
    }
    return this;
  }
  mount(e6, t5) {
    if (typeof e6 == "function" || e6.length === 0 || e6 === "/") {
      let r7 = typeof e6 == "function" ? e6 : t5, s6 = async ({ request: e7, path: t6 }) => r7(new Request(replaceUrlPath(e7.url, t6 || "/"), e7));
      return this.all("/", s6, { type: "none" }), this.all("/*", s6, { type: "none" }), this;
    }
    let r6 = e6.length, s5 = async ({ request: e7, path: s6 }) => t5(new Request(replaceUrlPath(e7.url, s6.slice(r6) || "/"), e7));
    return this.all(e6, s5, { type: "none" }), this.all(e6 + (e6.endsWith("/") ? "*" : "/*"), s5, { type: "none" }), this;
  }
  get(e6, t5, r6) {
    return this.add("GET", e6, t5, r6), this;
  }
  post(e6, t5, r6) {
    return this.add("POST", e6, t5, r6), this;
  }
  put(e6, t5, r6) {
    return this.add("PUT", e6, t5, r6), this;
  }
  patch(e6, t5, r6) {
    return this.add("PATCH", e6, t5, r6), this;
  }
  delete(e6, t5, r6) {
    return this.add("DELETE", e6, t5, r6), this;
  }
  options(e6, t5, r6) {
    return this.add("OPTIONS", e6, t5, r6), this;
  }
  all(e6, t5, r6) {
    return this.add("ALL", e6, t5, r6), this;
  }
  head(e6, t5, r6) {
    return this.add("HEAD", e6, t5, r6), this;
  }
  connect(e6, t5, r6) {
    return this.add("CONNECT", e6, t5, r6), this;
  }
  ws(e6, t5) {
    let r6 = t5.transformMessage ? Array.isArray(t5.transformMessage) ? t5.transformMessage : [t5.transformMessage] : undefined, i2 = null, o2 = getSchemaValidator(t5?.body, { models: this.definitions.type }), n2 = getSchemaValidator(t5?.response, { models: this.definitions.type }), a4 = (e7) => {
      if (typeof e7 == "string") {
        let t6 = e7?.charCodeAt(0);
        if (t6 === 47 || t6 === 123)
          try {
            e7 = JSON.parse(e7);
          } catch {}
        else
          Number.isNaN(+e7) || (e7 = +e7);
      }
      if (r6?.length)
        for (let t6 = 0;t6 < r6.length; t6++) {
          let s5 = r6[t6](e7);
          s5 !== undefined && (e7 = s5);
        }
      return e7;
    };
    return this.route("$INTERNALWS", e6, (e7) => {
      let { set: r7, path: h2, qi: d2, headers: c, query: f, params: l } = e7;
      if (i2 === null && (i2 = this.getServer()), !i2?.upgrade(e7.request, { headers: typeof t5.upgrade == "function" ? t5.upgrade(e7) : t5.upgrade, data: { validator: n2, open(r8) {
        t5.open?.(new ElysiaWS(r8, e7));
      }, message: (r8, i3) => {
        let n3 = a4(i3);
        if (o2?.Check(n3) === false)
          return void r8.send(new ValidationError("message", o2, n3).message);
        t5.message?.(new ElysiaWS(r8, e7), n3);
      }, drain(r8) {
        t5.drain?.(new ElysiaWS(r8, e7));
      }, close(r8, i3, o3) {
        t5.close?.(new ElysiaWS(r8, e7), i3, o3);
      } } }))
        return r7.status = 400, "Expected a websocket connection";
    }, { beforeHandle: t5.beforeHandle, transform: t5.transform, headers: t5.headers, params: t5.params, query: t5.query }), this;
  }
  route(e6, t5, r6, { config: s5, ...i2 } = { config: { allowMeta: false } }) {
    return this.add(e6, t5, r6, i2, s5), this;
  }
  state(e6, t5) {
    switch (typeof e6) {
      case "object":
        return this.store = mergeDeep(this.store, e6), this;
      case "function":
        return this.store = e6(this.store), this;
    }
    return e6 in this.store || (this.store[e6] = t5), this;
  }
  decorate(e6, t5) {
    switch (typeof e6) {
      case "object":
        return this.decorators = mergeDeep(this.decorators, e6), this;
      case "function":
        return this.decorators = e6(this.decorators), this;
    }
    return e6 in this.decorators || (this.decorators[e6] = t5), this;
  }
  derive(e6) {
    return e6.$elysia = "derive", this.onTransform(e6);
  }
  model(e6, t5) {
    switch (typeof e6) {
      case "object":
        return Object.entries(e6).forEach(([e7, t6]) => {
          e7 in this.definitions.type || (this.definitions.type[e7] = t6);
        }), this;
      case "function":
        return this.definitions.type = e6(this.definitions.type), this;
    }
    return this.definitions.type[e6] = t5, this;
  }
  mapDerive(e6) {
    return e6.$elysia = "derive", this.onTransform(e6);
  }
  affix(e6, t5, r6) {
    if (r6 === "")
      return this;
    let s5 = ["_", "-", " "], i2 = (e7) => e7[0].toUpperCase() + e7.slice(1), o2 = e6 === "prefix" ? (e7, t6) => s5.includes(e7.at(-1) ?? "") ? e7 + t6 : e7 + i2(t6) : s5.includes(r6.at(-1) ?? "") ? (e7, t6) => t6 + e7 : (e7, t6) => t6 + i2(e7), n2 = (e7) => {
      let t6 = {};
      switch (e7) {
        case "decorator":
          for (let e8 in this.decorators)
            t6[o2(r6, e8)] = this.decorators[e8];
          this.decorators = t6;
          break;
        case "state":
          for (let e8 in this.store)
            t6[o2(r6, e8)] = this.store[e8];
          this.store = t6;
          break;
        case "model":
          for (let e8 in this.definitions.type)
            t6[o2(r6, e8)] = this.definitions.type[e8];
          this.definitions.type = t6;
          break;
        case "error":
          for (let e8 in this.definitions.error)
            t6[o2(r6, e8)] = this.definitions.error[e8];
          this.definitions.error = t6;
      }
    }, a4 = Array.isArray(t5) ? t5 : [t5];
    for (let e7 of a4.some((e8) => e8 === "all") ? ["decorator", "state", "model", "error"] : a4)
      n2(e7);
    return this;
  }
  prefix(e6, t5) {
    return this.affix("prefix", e6, t5);
  }
  suffix(e6, t5) {
    return this.affix("suffix", e6, t5);
  }
  compile() {
    return this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this), typeof this.server?.reload == "function" && this.server.reload({ ...this.server, fetch: this.fetch }), this;
  }
  handle = async (e6) => this.fetch(e6);
  fetch = (e6) => (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(e6);
  handleError = async (e6, t5) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(e6, t5);
  outerErrorHandler = (e6) => new Response(e6.message || e6.name || "Error", {
    status: e6?.status ?? 500
  });
  listen = (e6, t5) => {
    if (!Bun)
      throw Error("Bun to run");
    if (this.compile(), typeof e6 == "string" && Number.isNaN(e6 = +e6.trim()))
      throw Error("Port must be a numeric value");
    let r6 = this.fetch, s5 = typeof e6 == "object" ? { development: !isProduction, ...this.config.serve, ...e6, websocket: { ...this.config.websocket, ...websocket }, fetch: r6, error: this.outerErrorHandler } : { development: !isProduction, ...this.config.serve, websocket: { ...this.config.websocket, ...websocket }, port: e6, fetch: r6, error: this.outerErrorHandler };
    if (typeof Bun == "undefined")
      throw Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
    return this.server = Bun?.serve(s5), this.event.start.length && (async () => {
      let e7 = Object.assign(this.decorators, { store: this.store, app: this });
      for (let t6 = 0;t6 < this.event.transform.length; t6++) {
        let r7 = this.event.transform[t6](e7);
        this.event.transform[t6].$elysia === "derive" && (r7 instanceof Promise ? Object.assign(e7, await r7) : Object.assign(e7, r7));
      }
      for (let t6 = 0;t6 < this.event.start.length; t6++)
        this.event.start[t6](e7);
    })(), t5 && t5(this.server), Promise.all(this.lazyLoadModules).then(() => {
      Bun?.gc(false);
    }), this;
  };
  stop = async () => {
    if (!this.server)
      throw Error("Elysia isn't running. Call `app.listen` to start the server.");
    this.server.stop(), this.event.stop.length && (async () => {
      let e6 = Object.assign(this.decorators, { store: this.store, app: this });
      for (let t5 = 0;t5 < this.event.transform.length; t5++) {
        let r6 = this.event.transform[t5](e6);
        this.event.transform[t5].$elysia === "derive" && (r6 instanceof Promise ? Object.assign(e6, await r6) : Object.assign(e6, r6));
      }
      for (let t5 = 0;t5 < this.event.stop.length; t5++)
        this.event.stop[t5](e6);
    })();
  };
  get modules() {
    return Promise.all(this.lazyLoadModules);
  }
}

// src/index.js
var app = new q;
app.get("/greet", () => ({ greeting: "Hello from Elysia (bun)!" }));
var port = 3421;
var argv = process.argv.slice(2);
for (let i2 = 0;i2 < argv.length; i2++) {
  if ((argv[i2] === "--port" || argv[i2] === "-p") && argv[i2 + 1]) {
    const p2 = Number(argv[i2 + 1]);
    if (!Number.isNaN(p2)) {
      port = p2;
    }
  }
}
if (process.env.PORT) {
  const p2 = Number(process.env.PORT);
  if (!Number.isNaN(p2))
    port = p2;
}
app.listen(port);
console.log(`Elysia listening on ${port}`);
