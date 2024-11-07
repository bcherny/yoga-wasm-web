// @bun
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

// yoga/javascript/src_js/generated/YGEnums.js
var require_YGEnums = __commonJS((exports) => {
  exports.ALIGN_AUTO = 0;
  exports.ALIGN_FLEX_START = 1;
  exports.ALIGN_CENTER = 2;
  exports.ALIGN_FLEX_END = 3;
  exports.ALIGN_STRETCH = 4;
  exports.ALIGN_BASELINE = 5;
  exports.ALIGN_SPACE_BETWEEN = 6;
  exports.ALIGN_SPACE_AROUND = 7;
  exports.DIMENSION_WIDTH = 0;
  exports.DIMENSION_HEIGHT = 1;
  exports.DIRECTION_INHERIT = 0;
  exports.DIRECTION_LTR = 1;
  exports.DIRECTION_RTL = 2;
  exports.DISPLAY_FLEX = 0;
  exports.DISPLAY_NONE = 1;
  exports.EDGE_LEFT = 0;
  exports.EDGE_TOP = 1;
  exports.EDGE_RIGHT = 2;
  exports.EDGE_BOTTOM = 3;
  exports.EDGE_START = 4;
  exports.EDGE_END = 5;
  exports.EDGE_HORIZONTAL = 6;
  exports.EDGE_VERTICAL = 7;
  exports.EDGE_ALL = 8;
  exports.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS = 0;
  exports.EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE = 1;
  exports.EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN = 2;
  exports.FLEX_DIRECTION_COLUMN = 0;
  exports.FLEX_DIRECTION_COLUMN_REVERSE = 1;
  exports.FLEX_DIRECTION_ROW = 2;
  exports.FLEX_DIRECTION_ROW_REVERSE = 3;
  exports.GUTTER_COLUMN = 0;
  exports.GUTTER_ROW = 1;
  exports.GUTTER_ALL = 2;
  exports.JUSTIFY_FLEX_START = 0;
  exports.JUSTIFY_CENTER = 1;
  exports.JUSTIFY_FLEX_END = 2;
  exports.JUSTIFY_SPACE_BETWEEN = 3;
  exports.JUSTIFY_SPACE_AROUND = 4;
  exports.JUSTIFY_SPACE_EVENLY = 5;
  exports.LOG_LEVEL_ERROR = 0;
  exports.LOG_LEVEL_WARN = 1;
  exports.LOG_LEVEL_INFO = 2;
  exports.LOG_LEVEL_DEBUG = 3;
  exports.LOG_LEVEL_VERBOSE = 4;
  exports.LOG_LEVEL_FATAL = 5;
  exports.MEASURE_MODE_UNDEFINED = 0;
  exports.MEASURE_MODE_EXACTLY = 1;
  exports.MEASURE_MODE_AT_MOST = 2;
  exports.NODE_TYPE_DEFAULT = 0;
  exports.NODE_TYPE_TEXT = 1;
  exports.OVERFLOW_VISIBLE = 0;
  exports.OVERFLOW_HIDDEN = 1;
  exports.OVERFLOW_SCROLL = 2;
  exports.POSITION_TYPE_STATIC = 0;
  exports.POSITION_TYPE_RELATIVE = 1;
  exports.POSITION_TYPE_ABSOLUTE = 2;
  exports.PRINT_OPTIONS_LAYOUT = 1;
  exports.PRINT_OPTIONS_STYLE = 2;
  exports.PRINT_OPTIONS_CHILDREN = 4;
  exports.UNIT_UNDEFINED = 0;
  exports.UNIT_POINT = 1;
  exports.UNIT_PERCENT = 2;
  exports.UNIT_AUTO = 3;
  exports.WRAP_NO_WRAP = 0;
  exports.WRAP_WRAP = 1;
  exports.WRAP_WRAP_REVERSE = 2;
});

// yoga/javascript/src_js/wrapAsm.js
var require_wrapAsm = __commonJS((exports, module) => {
  var CONSTANTS = require_YGEnums();
  module.exports = (lib) => {
    function patch(prototype, name, fn) {
      const original = prototype[name];
      prototype[name] = function(...args) {
        return fn.call(this, original, ...args);
      };
    }
    for (const fnName of [
      "setPosition",
      "setMargin",
      "setFlexBasis",
      "setWidth",
      "setHeight",
      "setMinWidth",
      "setMinHeight",
      "setMaxWidth",
      "setMaxHeight",
      "setPadding"
    ]) {
      const methods = {
        [CONSTANTS.UNIT_POINT]: lib.Node.prototype[fnName],
        [CONSTANTS.UNIT_PERCENT]: lib.Node.prototype[`${fnName}Percent`],
        [CONSTANTS.UNIT_AUTO]: lib.Node.prototype[`${fnName}Auto`]
      };
      patch(lib.Node.prototype, fnName, function(original, ...args) {
        const value = args.pop();
        let unit, asNumber;
        if (value === "auto") {
          unit = CONSTANTS.UNIT_AUTO;
          asNumber = undefined;
        } else if (typeof value === "object") {
          unit = value.unit;
          asNumber = value.valueOf();
        } else {
          unit = typeof value === "string" && value.endsWith("%") ? CONSTANTS.UNIT_PERCENT : CONSTANTS.UNIT_POINT;
          asNumber = parseFloat(value);
          if (!Number.isNaN(value) && Number.isNaN(asNumber)) {
            throw new Error(`Invalid value ${value} for ${fnName}`);
          }
        }
        if (!methods[unit])
          throw new Error(`Failed to execute "${fnName}": Unsupported unit '${value}'`);
        if (asNumber !== undefined) {
          return methods[unit].call(this, ...args, asNumber);
        } else {
          return methods[unit].call(this, ...args);
        }
      });
    }
    function wrapMeasureFunction(measureFunction) {
      return lib.MeasureCallback.implement({
        measure: (...args) => {
          const { width, height } = measureFunction(...args);
          return {
            width: width ?? NaN,
            height: height ?? NaN
          };
        }
      });
    }
    patch(lib.Node.prototype, "setMeasureFunc", function(original, measureFunc) {
      if (measureFunc) {
        return original.call(this, wrapMeasureFunction(measureFunc));
      } else {
        return this.unsetMeasureFunc();
      }
    });
    function wrapDirtiedFunc(dirtiedFunction) {
      return lib.DirtiedCallback.implement({ dirtied: dirtiedFunction });
    }
    patch(lib.Node.prototype, "setDirtiedFunc", function(original, dirtiedFunc) {
      original.call(this, wrapDirtiedFunc(dirtiedFunc));
    });
    patch(lib.Config.prototype, "free", function() {
      lib.Config.destroy(this);
    });
    patch(lib.Node, "create", (_, config) => {
      return config ? lib.Node.createWithConfig(config) : lib.Node.createDefault();
    });
    patch(lib.Node.prototype, "free", function() {
      lib.Node.destroy(this);
    });
    patch(lib.Node.prototype, "freeRecursive", function() {
      for (let t = 0, T = this.getChildCount();t < T; ++t) {
        this.getChild(0).freeRecursive();
      }
      this.free();
    });
    patch(lib.Node.prototype, "calculateLayout", function(original, width = NaN, height = NaN, direction = CONSTANTS.DIRECTION_LTR) {
      return original.call(this, width, height, direction);
    });
    return {
      Config: lib.Config,
      Node: lib.Node,
      ...CONSTANTS
    };
  };
});

// node.js
var exports_node = {};
__export(exports_node, {
  default: () => node_default
});

// index.js
var exports_yoga_wasm_web = {};
__export(exports_yoga_wasm_web, {
  initStreaming: () => initStreaming,
  default: () => yoga_wasm_web_default
});
var import_wrapAsm = __toESM(require_wrapAsm(), 1);

// tmp/yoga.mjs
var exports_yoga = {};
__export(exports_yoga, {
  default: () => yoga_default
});
var yoga = (() => {
  var _scriptName = typeof document != "undefined" ? document.currentScript?.src : undefined;
  return function(moduleArg = {}) {
    var moduleRtn;
    var p = moduleArg, aa, q, ba = new Promise((b, a) => {
      aa = b;
      q = a;
    }), ca = Object.assign({}, p), v = "", da;
    typeof document != "undefined" && document.currentScript && (v = document.currentScript.src);
    _scriptName && (v = _scriptName);
    v.startsWith("blob:") ? v = "" : v = v.substr(0, v.replace(/[?#].*/, "").lastIndexOf("/") + 1);
    da = (b) => fetch(b, { credentials: "same-origin" }).then((a) => a.ok ? a.arrayBuffer() : Promise.reject(Error(a.status + " : " + a.url)));
    var ea = console.log.bind(console), w = console.error.bind(console);
    Object.assign(p, ca);
    ca = null;
    var y, fa = false, ha, A, C, ia, D, E, ja, ka;
    function la() {
      var b = y.buffer;
      p.HEAP8 = ha = new Int8Array(b);
      p.HEAP16 = C = new Int16Array(b);
      p.HEAPU8 = A = new Uint8Array(b);
      p.HEAPU16 = ia = new Uint16Array(b);
      p.HEAP32 = D = new Int32Array(b);
      p.HEAPU32 = E = new Uint32Array(b);
      p.HEAPF32 = ja = new Float32Array(b);
      p.HEAPF64 = ka = new Float64Array(b);
    }
    var ma = [], na = [], oa = [], F = 0, pa = null, G = null;
    function qa(b) {
      b = "Aborted(" + b + ")";
      w(b);
      fa = true;
      b = new WebAssembly.RuntimeError(b + ". Build with -sASSERTIONS for more info.");
      q(b);
      throw b;
    }
    var ra = (b) => b.startsWith("data:application/octet-stream;base64,"), sa;
    function ta(b) {
      return da(b).then((a) => new Uint8Array(a), () => {
        throw "both async and sync fetching of the wasm failed";
      });
    }
    function ua(b, a, c) {
      return ta(b).then((d) => WebAssembly.instantiate(d, a)).then(c, (d) => {
        w(`failed to asynchronously prepare wasm: ${d}`);
        qa(d);
      });
    }
    function va(b, a) {
      var c = sa;
      return typeof WebAssembly.instantiateStreaming != "function" || ra(c) || typeof fetch != "function" ? ua(c, b, a) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, b).then(a, function(e) {
        w(`wasm streaming compile failed: ${e}`);
        w("falling back to ArrayBuffer instantiation");
        return ua(c, b, a);
      }));
    }

    class wa {
      name = "ExitStatus";
      constructor(b) {
        this.message = `Program terminated with exit(${b})`;
        this.status = b;
      }
    }
    var H = (b, a) => Object.defineProperty(a, "name", { value: b }), xa = [], I = [], J, K = (b) => {
      if (!b)
        throw new J("Cannot use deleted val. handle = " + b);
      return I[b];
    }, ya = (b) => {
      switch (b) {
        case undefined:
          return 2;
        case null:
          return 4;
        case true:
          return 6;
        case false:
          return 8;
        default:
          const a = xa.pop() || I.length;
          I[a] = b;
          I[a + 1] = 1;
          return a;
      }
    }, za = (b) => {
      var a = Error, c = H(b, function(d) {
        this.name = b;
        this.message = d;
        d = Error(d).stack;
        d !== undefined && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      c.prototype = Object.create(a.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function() {
        return this.message === undefined ? this.name : `${this.name}: ${this.message}`;
      };
      return c;
    }, Aa, Ba, L = (b) => {
      for (var a = "";A[b]; )
        a += Ba[A[b++]];
      return a;
    }, M = {}, Da = (b, a) => {
      if (a === undefined)
        throw new J("ptr should not be undefined");
      for (;b.R; )
        a = b.ca(a), b = b.R;
      return a;
    }, N = {}, Fa = (b) => {
      b = Ea(b);
      var a = L(b);
      O(b);
      return a;
    }, Ga = (b, a) => {
      var c = N[b];
      if (c === undefined)
        throw b = `${a} has unknown type ${Fa(b)}`, new J(b);
      return c;
    }, Ha = () => {
    }, Ia = false, Ja = (b, a, c) => {
      if (a === c)
        return b;
      if (c.R === undefined)
        return null;
      b = Ja(b, a, c.R);
      return b === null ? null : c.na(b);
    }, Ka = {}, La = (b, a) => {
      a = Da(b, a);
      return M[a];
    }, P, Ma = (b, a) => {
      if (!a.P || !a.O)
        throw new P("makeClassHandle requires ptr and ptrType");
      if (!!a.U !== !!a.S)
        throw new P("Both smartPtrType and smartPtr must be specified");
      a.count = { value: 1 };
      return Q(Object.create(b, { M: { value: a, writable: true } }));
    }, Q = (b) => {
      if (typeof FinalizationRegistry === "undefined")
        return Q = (a) => a, b;
      Ia = new FinalizationRegistry((a) => {
        a = a.M;
        --a.count.value;
        a.count.value === 0 && (a.S ? a.U.X(a.S) : a.P.N.X(a.O));
      });
      Q = (a) => {
        var c = a.M;
        c.S && Ia.register(a, { M: c }, a);
        return a;
      };
      Ha = (a) => {
        Ia.unregister(a);
      };
      return Q(b);
    }, Na = {}, Oa = (b) => {
      for (;b.length; ) {
        var a = b.pop();
        b.pop()(a);
      }
    };
    function R(b) {
      return this.fromWireType(E[b >> 2]);
    }
    var S = {}, Pa = {}, U = (b, a, c) => {
      function d(f) {
        f = c(f);
        if (f.length !== b.length)
          throw new P("Mismatched type converter count");
        for (var k = 0;k < b.length; ++k)
          T(b[k], f[k]);
      }
      b.forEach((f) => Pa[f] = a);
      var e = Array(a.length), g = [], h = 0;
      a.forEach((f, k) => {
        N.hasOwnProperty(f) ? e[k] = N[f] : (g.push(f), S.hasOwnProperty(f) || (S[f] = []), S[f].push(() => {
          e[k] = N[f];
          ++h;
          h === g.length && d(e);
        }));
      });
      g.length === 0 && d(e);
    };
    function Qa(b, a, c = {}) {
      var d = a.name;
      if (!b)
        throw new J(`type "${d}" must have a positive integer typeid pointer`);
      if (N.hasOwnProperty(b)) {
        if (c.ua)
          return;
        throw new J(`Cannot register type '${d}' twice`);
      }
      N[b] = a;
      delete Pa[b];
      S.hasOwnProperty(b) && (a = S[b], delete S[b], a.forEach((e) => e()));
    }
    function T(b, a, c = {}) {
      return Qa(b, a, c);
    }
    var Ra = (b) => {
      throw new J(b.M.P.N.name + " instance already deleted");
    }, Sa = [];
    function Ta() {
    }
    var Ua = (b, a, c) => {
      if (b[a].T === undefined) {
        var d = b[a];
        b[a] = function(...e) {
          if (!b[a].T.hasOwnProperty(e.length))
            throw new J(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${b[a].T})!`);
          return b[a].T[e.length].apply(this, e);
        };
        b[a].T = [];
        b[a].T[d.Z] = d;
      }
    }, Va = (b, a) => {
      if (p.hasOwnProperty(b))
        throw new J(`Cannot register public name '${b}' twice`);
      p[b] = a;
      p[b].Z = undefined;
    }, Wa = (b) => {
      b = b.replace(/[^a-zA-Z0-9_]/g, "$");
      var a = b.charCodeAt(0);
      return 48 <= a && 57 >= a ? `_${b}` : b;
    };
    function Xa(b, a, c, d, e, g, h, f) {
      this.name = b;
      this.constructor = a;
      this.Y = c;
      this.X = d;
      this.R = e;
      this.pa = g;
      this.ca = h;
      this.na = f;
      this.ka = [];
    }
    var Ya = (b, a, c) => {
      for (;a !== c; ) {
        if (!a.ca)
          throw new J(`Expected null or instance of ${c.name}, got an instance of ${a.name}`);
        b = a.ca(b);
        a = a.R;
      }
      return b;
    };
    function Za(b, a) {
      if (a === null) {
        if (this.ga)
          throw new J(`null is not a valid ${this.name}`);
        return 0;
      }
      if (!a.M)
        throw new J(`Cannot pass "${$a(a)}" as a ${this.name}`);
      if (!a.M.O)
        throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);
      return Ya(a.M.O, a.M.P.N, this.N);
    }
    function ab(b, a) {
      if (a === null) {
        if (this.ga)
          throw new J(`null is not a valid ${this.name}`);
        if (this.fa) {
          var c = this.ha();
          b !== null && b.push(this.X, c);
          return c;
        }
        return 0;
      }
      if (!a || !a.M)
        throw new J(`Cannot pass "${$a(a)}" as a ${this.name}`);
      if (!a.M.O)
        throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);
      if (!this.ea && a.M.P.ea)
        throw new J(`Cannot convert argument of type ${a.M.U ? a.M.U.name : a.M.P.name} to parameter type ${this.name}`);
      c = Ya(a.M.O, a.M.P.N, this.N);
      if (this.fa) {
        if (a.M.S === undefined)
          throw new J("Passing raw pointer to smart pointer is illegal");
        switch (this.Aa) {
          case 0:
            if (a.M.U === this)
              c = a.M.S;
            else
              throw new J(`Cannot convert argument of type ${a.M.U ? a.M.U.name : a.M.P.name} to parameter type ${this.name}`);
            break;
          case 1:
            c = a.M.S;
            break;
          case 2:
            if (a.M.U === this)
              c = a.M.S;
            else {
              var d = a.clone();
              c = this.wa(c, ya(() => d["delete"]()));
              b !== null && b.push(this.X, c);
            }
            break;
          default:
            throw new J("Unsupporting sharing policy");
        }
      }
      return c;
    }
    function bb(b, a) {
      if (a === null) {
        if (this.ga)
          throw new J(`null is not a valid ${this.name}`);
        return 0;
      }
      if (!a.M)
        throw new J(`Cannot pass "${$a(a)}" as a ${this.name}`);
      if (!a.M.O)
        throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);
      if (a.M.P.ea)
        throw new J(`Cannot convert argument of type ${a.M.P.name} to parameter type ${this.name}`);
      return Ya(a.M.O, a.M.P.N, this.N);
    }
    function cb(b, a, c, d, e, g, h, f, k, m, l) {
      this.name = b;
      this.N = a;
      this.ga = c;
      this.ea = d;
      this.fa = e;
      this.va = g;
      this.Aa = h;
      this.la = f;
      this.ha = k;
      this.wa = m;
      this.X = l;
      e || a.R !== undefined ? this.toWireType = ab : (this.toWireType = d ? Za : bb, this.W = null);
    }
    var db = (b, a) => {
      if (!p.hasOwnProperty(b))
        throw new P("Replacing nonexistent public symbol");
      p[b] = a;
      p[b].Z = undefined;
    }, eb = [], gb, hb = (b) => {
      var a = eb[b];
      a || (b >= eb.length && (eb.length = b + 1), eb[b] = a = gb.get(b));
      return a;
    }, ib = (b, a, c = []) => {
      b.includes("j") ? (b = b.replace(/p/g, "i"), a = (0, p["dynCall_" + b])(a, ...c)) : a = hb(a)(...c);
      return a;
    }, jb = (b, a) => (...c) => ib(b, a, c), X = (b, a) => {
      b = L(b);
      var c = b.includes("j") ? jb(b, a) : hb(a);
      if (typeof c != "function")
        throw new J(`unknown function pointer with signature ${b}: ${a}`);
      return c;
    }, kb, lb = (b, a) => {
      function c(g) {
        e[g] || N[g] || (Pa[g] ? Pa[g].forEach(c) : (d.push(g), e[g] = true));
      }
      var d = [], e = {};
      a.forEach(c);
      throw new kb(`${b}: ` + d.map(Fa).join([", "]));
    };
    function mb(b) {
      for (var a = 1;a < b.length; ++a)
        if (b[a] !== null && b[a].W === undefined)
          return true;
      return false;
    }
    function nb(b, a, c, d, e) {
      var g = a.length;
      if (2 > g)
        throw new J("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var h = a[1] !== null && c !== null, f = mb(a), k = a[0].name !== "void", m = g - 2, l = Array(m), n = [], r = [];
      return H(b, function(...x) {
        r.length = 0;
        n.length = h ? 2 : 1;
        n[0] = e;
        if (h) {
          var t = a[1].toWireType(r, this);
          n[1] = t;
        }
        for (var u = 0;u < m; ++u)
          l[u] = a[u + 2].toWireType(r, x[u]), n.push(l[u]);
        x = d(...n);
        if (f)
          Oa(r);
        else
          for (u = h ? 1 : 2;u < a.length; u++) {
            var B = u === 1 ? t : l[u - 2];
            a[u].W !== null && a[u].W(B);
          }
        t = k ? a[0].fromWireType(x) : undefined;
        return t;
      });
    }
    var ob = (b, a) => {
      for (var c = [], d = 0;d < b; d++)
        c.push(E[a + 4 * d >> 2]);
      return c;
    }, pb = (b) => {
      b = b.trim();
      const a = b.indexOf("(");
      return a !== -1 ? b.substr(0, a) : b;
    }, qb = (b) => {
      9 < b && --I[b + 1] === 0 && (I[b] = undefined, xa.push(b));
    }, rb = { name: "emscripten::val", fromWireType: (b) => {
      var a = K(b);
      qb(b);
      return a;
    }, toWireType: (b, a) => ya(a), V: 8, readValueFromPointer: R, W: null }, $a = (b) => {
      if (b === null)
        return "null";
      var a = typeof b;
      return a === "object" || a === "array" || a === "function" ? b.toString() : "" + b;
    }, sb = (b, a) => {
      switch (a) {
        case 4:
          return function(c) {
            return this.fromWireType(ja[c >> 2]);
          };
        case 8:
          return function(c) {
            return this.fromWireType(ka[c >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${a}): ${b}`);
      }
    }, tb = (b, a, c) => {
      switch (a) {
        case 1:
          return c ? (d) => ha[d] : (d) => A[d];
        case 2:
          return c ? (d) => C[d >> 1] : (d) => ia[d >> 1];
        case 4:
          return c ? (d) => D[d >> 2] : (d) => E[d >> 2];
        default:
          throw new TypeError(`invalid integer width (${a}): ${b}`);
      }
    }, ub = (b, a = 0, c = NaN) => {
      c = a + c;
      for (var d = "";!(a >= c); ) {
        var e = b[a++];
        if (!e)
          break;
        if (e & 128) {
          var g = b[a++] & 63;
          if ((e & 224) == 192)
            d += String.fromCharCode((e & 31) << 6 | g);
          else {
            var h = b[a++] & 63;
            e = (e & 240) == 224 ? (e & 15) << 12 | g << 6 | h : (e & 7) << 18 | g << 12 | h << 6 | b[a++] & 63;
            65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
          }
        } else
          d += String.fromCharCode(e);
      }
      return d;
    }, vb = (b, a) => {
      for (var c = "", d = 0;!(d >= a / 2); ++d) {
        var e = C[b + 2 * d >> 1];
        if (e == 0)
          break;
        c += String.fromCharCode(e);
      }
      return c;
    }, wb = (b, a, c) => {
      c ??= 2147483647;
      if (2 > c)
        return 0;
      c -= 2;
      var d = a;
      c = c < 2 * b.length ? c / 2 : b.length;
      for (var e = 0;e < c; ++e)
        C[a >> 1] = b.charCodeAt(e), a += 2;
      C[a >> 1] = 0;
      return a - d;
    }, xb = (b) => 2 * b.length, yb = (b, a) => {
      for (var c = 0, d = "";!(c >= a / 4); ) {
        var e = D[b + 4 * c >> 2];
        if (e == 0)
          break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }
      return d;
    }, zb = (b, a, c) => {
      c ??= 2147483647;
      if (4 > c)
        return 0;
      var d = a;
      c = d + c - 4;
      for (var e = 0;e < b.length; ++e) {
        var g = b.charCodeAt(e);
        if (55296 <= g && 57343 >= g) {
          var h = b.charCodeAt(++e);
          g = 65536 + ((g & 1023) << 10) | h & 1023;
        }
        D[a >> 2] = g;
        a += 4;
        if (a + 4 > c)
          break;
      }
      D[a >> 2] = 0;
      return a - d;
    }, Ab = (b) => {
      for (var a = 0, c = 0;c < b.length; ++c) {
        var d = b.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        a += 4;
      }
      return a;
    }, Bb = {}, Cb = [], Db = (b) => {
      var a = Cb.length;
      Cb.push(b);
      return a;
    }, Eb = (b, a) => {
      for (var c = Array(b), d = 0;d < b; ++d)
        c[d] = Ga(E[a + 4 * d >> 2], "parameter " + d);
      return c;
    }, Fb = Reflect.construct, Y = {}, Gb = (b) => {
      if (!fa)
        try {
          b();
        } catch (a) {
          if (!(a instanceof wa || a == "unwind"))
            throw a;
        }
    }, Hb = [null, [], []];
    J = p.BindingError = class extends Error {
      constructor(b) {
        super(b);
        this.name = "BindingError";
      }
    };
    I.push(0, 1, undefined, 1, null, 1, true, 1, false, 1);
    p.count_emval_handles = () => I.length / 2 - 5 - xa.length;
    Aa = p.PureVirtualError = za("PureVirtualError");
    for (var Ib = Array(256), Jb = 0;256 > Jb; ++Jb)
      Ib[Jb] = String.fromCharCode(Jb);
    Ba = Ib;
    P = p.InternalError = class extends Error {
      constructor(b) {
        super(b);
        this.name = "InternalError";
      }
    };
    Object.assign(Ta.prototype, {
      isAliasOf: function(b) {
        if (!(this instanceof Ta && b instanceof Ta))
          return false;
        var a = this.M.P.N, c = this.M.O;
        b.M = b.M;
        var d = b.M.P.N;
        for (b = b.M.O;a.R; )
          c = a.ca(c), a = a.R;
        for (;d.R; )
          b = d.ca(b), d = d.R;
        return a === d && c === b;
      },
      clone: function() {
        this.M.O || Ra(this);
        if (this.M.aa)
          return this.M.count.value += 1, this;
        var b = Q, a = Object, c = a.create, d = Object.getPrototypeOf(this), e = this.M;
        b = b(c.call(a, d, { M: { value: { count: e.count, ba: e.ba, aa: e.aa, O: e.O, P: e.P, S: e.S, U: e.U } } }));
        b.M.count.value += 1;
        b.M.ba = false;
        return b;
      },
      ["delete"]() {
        this.M.O || Ra(this);
        if (this.M.ba && !this.M.aa)
          throw new J("Object already scheduled for deletion");
        Ha(this);
        var b = this.M;
        --b.count.value;
        b.count.value === 0 && (b.S ? b.U.X(b.S) : b.P.N.X(b.O));
        this.M.aa || (this.M.S = undefined, this.M.O = undefined);
      },
      isDeleted: function() {
        return !this.M.O;
      },
      deleteLater: function() {
        this.M.O || Ra(this);
        if (this.M.ba && !this.M.aa)
          throw new J("Object already scheduled for deletion");
        Sa.push(this);
        this.M.ba = true;
        return this;
      }
    });
    Object.assign(cb.prototype, { qa(b) {
      this.la && (b = this.la(b));
      return b;
    }, ia(b) {
      this.X?.(b);
    }, V: 8, readValueFromPointer: R, fromWireType: function(b) {
      function a() {
        return this.fa ? Ma(this.N.Y, { P: this.va, O: c, U: this, S: b }) : Ma(this.N.Y, { P: this, O: b });
      }
      var c = this.qa(b);
      if (!c)
        return this.ia(b), null;
      var d = La(this.N, c);
      if (d !== undefined) {
        if (d.M.count.value === 0)
          return d.M.O = c, d.M.S = b, d.clone();
        d = d.clone();
        this.ia(b);
        return d;
      }
      d = this.N.pa(c);
      d = Ka[d];
      if (!d)
        return a.call(this);
      d = this.ea ? d.ma : d.pointerType;
      var e = Ja(c, this.N, d.N);
      return e === null ? a.call(this) : this.fa ? Ma(d.N.Y, { P: d, O: e, U: this, S: b }) : Ma(d.N.Y, { P: d, O: e });
    } });
    kb = p.UnboundTypeError = za("UnboundTypeError");
    var Mb = {
      A: () => {
        qa("");
      },
      o: (b, a, c) => {
        b = L(b);
        a = Ga(a, "wrapper");
        c = K(c);
        var d = a.N, e = d.Y, g = d.R.Y, h = d.R.constructor;
        b = H(b, function(...f) {
          d.R.ka.forEach(function(k) {
            if (this[k] === g[k])
              throw new Aa(`Pure virtual function ${k} must be implemented in JavaScript`);
          }.bind(this));
          Object.defineProperty(this, "__parent", { value: e });
          this.__construct(...f);
        });
        e.__construct = function(...f) {
          if (this === e)
            throw new J("Pass correct 'this' to __construct");
          f = h.implement(this, ...f);
          Ha(f);
          var k = f.M;
          f.notifyOnDestruction();
          k.aa = true;
          Object.defineProperties(this, { M: { value: k } });
          Q(this);
          f = k.O;
          f = Da(d, f);
          if (M.hasOwnProperty(f))
            throw new J(`Tried to register registered instance: ${f}`);
          M[f] = this;
        };
        e.__destruct = function() {
          if (this === e)
            throw new J("Pass correct 'this' to __destruct");
          Ha(this);
          var f = this.M.O;
          f = Da(d, f);
          if (M.hasOwnProperty(f))
            delete M[f];
          else
            throw new J(`Tried to unregister unregistered instance: ${f}`);
        };
        b.prototype = Object.create(e);
        Object.assign(b.prototype, c);
        return ya(b);
      },
      m: (b) => {
        var a = Na[b];
        delete Na[b];
        var { ha: c, X: d, ja: e } = a, g = e.map((h) => h.ta).concat(e.map((h) => h.ya));
        U([b], g, (h) => {
          var f = {};
          e.forEach((k, m) => {
            var l = h[m], n = k.ra, r = k.sa, x = h[m + e.length], t = k.xa, u = k.za;
            f[k.oa] = { read: (B) => l.fromWireType(n(r, B)), write: (B, V) => {
              var z = [];
              t(u, B, x.toWireType(z, V));
              Oa(z);
            } };
          });
          return [{
            name: a.name,
            fromWireType: (k) => {
              var m = {}, l;
              for (l in f)
                m[l] = f[l].read(k);
              d(k);
              return m;
            },
            toWireType: (k, m) => {
              for (var l in f)
                if (!(l in m))
                  throw new TypeError(`Missing field: "${l}"`);
              var n = c();
              for (l in f)
                f[l].write(n, m[l]);
              k !== null && k.push(d, n);
              return n;
            },
            V: 8,
            readValueFromPointer: R,
            W: d
          }];
        });
      },
      s: () => {
      },
      C: (b, a, c, d) => {
        a = L(a);
        T(b, { name: a, fromWireType: function(e) {
          return !!e;
        }, toWireType: function(e, g) {
          return g ? c : d;
        }, V: 8, readValueFromPointer: function(e) {
          return this.fromWireType(A[e]);
        }, W: null });
      },
      j: (b, a, c, d, e, g, h, f, k, m, l, n, r) => {
        l = L(l);
        g = X(e, g);
        f &&= X(h, f);
        m &&= X(k, m);
        r = X(n, r);
        var x = Wa(l);
        Va(x, function() {
          lb(`Cannot construct ${l} due to unbound types`, [d]);
        });
        U([b, a, c], d ? [d] : [], (t) => {
          t = t[0];
          if (d) {
            var u = t.N;
            var B = u.Y;
          } else
            B = Ta.prototype;
          t = H(l, function(...Ca) {
            if (Object.getPrototypeOf(this) !== V)
              throw new J("Use 'new' to construct " + l);
            if (z.$ === undefined)
              throw new J(l + " has no accessible constructor");
            var fb = z.$[Ca.length];
            if (fb === undefined)
              throw new J(`Tried to invoke ctor of ${l} with invalid number of parameters (${Ca.length}) - expected (${Object.keys(z.$).toString()}) parameters instead!`);
            return fb.apply(this, Ca);
          });
          var V = Object.create(B, { constructor: { value: t } });
          t.prototype = V;
          var z = new Xa(l, t, V, r, u, g, f, m);
          if (z.R) {
            var W;
            (W = z.R).da ?? (W.da = []);
            z.R.da.push(z);
          }
          u = new cb(l, z, true, false, false);
          W = new cb(l + "*", z, false, false, false);
          B = new cb(l + " const*", z, false, true, false);
          Ka[b] = { pointerType: W, ma: B };
          db(x, t);
          return [u, W, B];
        });
      },
      d: (b, a, c, d, e, g, h) => {
        var f = ob(c, d);
        a = L(a);
        a = pb(a);
        g = X(e, g);
        U([], [b], (k) => {
          function m() {
            lb(`Cannot call ${l} due to unbound types`, f);
          }
          k = k[0];
          var l = `${k.name}.${a}`;
          a.startsWith("@@") && (a = Symbol[a.substring(2)]);
          var n = k.N.constructor;
          n[a] === undefined ? (m.Z = c - 1, n[a] = m) : (Ua(n, a, l), n[a].T[c - 1] = m);
          U([], f, (r) => {
            r = nb(l, [r[0], null].concat(r.slice(1)), null, g, h);
            n[a].T === undefined ? (r.Z = c - 1, n[a] = r) : n[a].T[c - 1] = r;
            if (k.N.da)
              for (const x of k.N.da)
                x.constructor.hasOwnProperty(a) || (x.constructor[a] = r);
            return [];
          });
          return [];
        });
      },
      n: (b, a, c, d, e, g) => {
        var h = ob(a, c);
        e = X(d, e);
        U([], [b], (f) => {
          f = f[0];
          var k = `constructor ${f.name}`;
          f.N.$ === undefined && (f.N.$ = []);
          if (f.N.$[a - 1] !== undefined)
            throw new J(`Cannot register multiple constructors with identical number of parameters (${a - 1}) for class '${f.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
          f.N.$[a - 1] = () => {
            lb(`Cannot construct ${f.name} due to unbound types`, h);
          };
          U([], h, (m) => {
            m.splice(1, 0, null);
            f.N.$[a - 1] = nb(k, m, null, e, g);
            return [];
          });
          return [];
        });
      },
      a: (b, a, c, d, e, g, h, f) => {
        var k = ob(c, d);
        a = L(a);
        a = pb(a);
        g = X(e, g);
        U([], [b], (m) => {
          function l() {
            lb(`Cannot call ${n} due to unbound types`, k);
          }
          m = m[0];
          var n = `${m.name}.${a}`;
          a.startsWith("@@") && (a = Symbol[a.substring(2)]);
          f && m.N.ka.push(a);
          var r = m.N.Y, x = r[a];
          x === undefined || x.T === undefined && x.className !== m.name && x.Z === c - 2 ? (l.Z = c - 2, l.className = m.name, r[a] = l) : (Ua(r, a, n), r[a].T[c - 2] = l);
          U([], k, (t) => {
            t = nb(n, t, m, g, h);
            r[a].T === undefined ? (t.Z = c - 2, r[a] = t) : r[a].T[c - 2] = t;
            return [];
          });
          return [];
        });
      },
      B: (b) => T(b, rb),
      p: (b, a, c) => {
        a = L(a);
        T(b, { name: a, fromWireType: (d) => d, toWireType: (d, e) => e, V: 8, readValueFromPointer: sb(a, c), W: null });
      },
      e: (b, a, c, d, e) => {
        a = L(a);
        e === -1 && (e = 4294967295);
        e = (f) => f;
        if (d === 0) {
          var g = 32 - 8 * c;
          e = (f) => f << g >>> g;
        }
        var h = a.includes("unsigned") ? function(f, k) {
          return k >>> 0;
        } : function(f, k) {
          return k;
        };
        T(b, { name: a, fromWireType: e, toWireType: h, V: 8, readValueFromPointer: tb(a, c, d !== 0), W: null });
      },
      b: (b, a, c) => {
        function d(g) {
          return new e(ha.buffer, E[g + 4 >> 2], E[g >> 2]);
        }
        var e = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array
        ][a];
        c = L(c);
        T(b, { name: c, fromWireType: d, V: 8, readValueFromPointer: d }, { ua: true });
      },
      q: (b, a) => {
        a = L(a);
        var c = a === "std::string";
        T(b, { name: a, fromWireType: function(d) {
          var e = E[d >> 2], g = d + 4;
          if (c)
            for (var h = g, f = 0;f <= e; ++f) {
              var k = g + f;
              if (f == e || A[k] == 0) {
                h = h ? ub(A, h, k - h) : "";
                if (m === undefined)
                  var m = h;
                else
                  m += String.fromCharCode(0), m += h;
                h = k + 1;
              }
            }
          else {
            m = Array(e);
            for (f = 0;f < e; ++f)
              m[f] = String.fromCharCode(A[g + f]);
            m = m.join("");
          }
          O(d);
          return m;
        }, toWireType: function(d, e) {
          e instanceof ArrayBuffer && (e = new Uint8Array(e));
          var g, h = typeof e == "string";
          if (!(h || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array))
            throw new J("Cannot pass non-string to std::string");
          var f;
          if (c && h)
            for (g = f = 0;g < e.length; ++g) {
              var k = e.charCodeAt(g);
              127 >= k ? f++ : 2047 >= k ? f += 2 : 55296 <= k && 57343 >= k ? (f += 4, ++g) : f += 3;
            }
          else
            f = e.length;
          g = f;
          f = Kb(4 + g + 1);
          k = f + 4;
          E[f >> 2] = g;
          if (c && h) {
            if (h = k, k = g + 1, g = A, 0 < k) {
              k = h + k - 1;
              for (var m = 0;m < e.length; ++m) {
                var l = e.charCodeAt(m);
                if (55296 <= l && 57343 >= l) {
                  var n = e.charCodeAt(++m);
                  l = 65536 + ((l & 1023) << 10) | n & 1023;
                }
                if (127 >= l) {
                  if (h >= k)
                    break;
                  g[h++] = l;
                } else {
                  if (2047 >= l) {
                    if (h + 1 >= k)
                      break;
                    g[h++] = 192 | l >> 6;
                  } else {
                    if (65535 >= l) {
                      if (h + 2 >= k)
                        break;
                      g[h++] = 224 | l >> 12;
                    } else {
                      if (h + 3 >= k)
                        break;
                      g[h++] = 240 | l >> 18;
                      g[h++] = 128 | l >> 12 & 63;
                    }
                    g[h++] = 128 | l >> 6 & 63;
                  }
                  g[h++] = 128 | l & 63;
                }
              }
              g[h] = 0;
            }
          } else if (h)
            for (h = 0;h < g; ++h) {
              m = e.charCodeAt(h);
              if (255 < m)
                throw O(k), new J("String has UTF-16 code units that do not fit in 8 bits");
              A[k + h] = m;
            }
          else
            for (h = 0;h < g; ++h)
              A[k + h] = e[h];
          d !== null && d.push(O, f);
          return f;
        }, V: 8, readValueFromPointer: R, W(d) {
          O(d);
        } });
      },
      l: (b, a, c) => {
        c = L(c);
        if (a === 2) {
          var d = vb;
          var e = wb;
          var g = xb;
          var h = (f) => ia[f >> 1];
        } else
          a === 4 && (d = yb, e = zb, g = Ab, h = (f) => E[f >> 2]);
        T(b, {
          name: c,
          fromWireType: (f) => {
            for (var k = E[f >> 2], m, l = f + 4, n = 0;n <= k; ++n) {
              var r = f + 4 + n * a;
              if (n == k || h(r) == 0)
                l = d(l, r - l), m === undefined ? m = l : (m += String.fromCharCode(0), m += l), l = r + a;
            }
            O(f);
            return m;
          },
          toWireType: (f, k) => {
            if (typeof k != "string")
              throw new J(`Cannot pass non-string to C++ string type ${c}`);
            var m = g(k), l = Kb(4 + m + a);
            E[l >> 2] = m / a;
            e(k, l + 4, m + a);
            f !== null && f.push(O, l);
            return l;
          },
          V: 8,
          readValueFromPointer: R,
          W(f) {
            O(f);
          }
        });
      },
      k: (b, a, c, d, e, g) => {
        Na[b] = { name: L(a), ha: X(c, d), X: X(e, g), ja: [] };
      },
      c: (b, a, c, d, e, g, h, f, k, m) => {
        Na[b].ja.push({ oa: L(a), ta: c, ra: X(d, e), sa: g, ya: h, xa: X(f, k), za: m });
      },
      D: (b, a) => {
        a = L(a);
        T(b, { Ba: true, name: a, V: 0, fromWireType: () => {
        }, toWireType: () => {
        } });
      },
      x: (b, a, c) => A.copyWithin(b, a, a + c),
      u: () => {
      },
      h: (b, a, c, d, e) => {
        b = Cb[b];
        a = K(a);
        var g = Bb[c];
        c = g === undefined ? L(c) : g;
        return b(a, a[c], d, e);
      },
      i: qb,
      g: (b, a, c) => {
        var d = Eb(b, a), e = d.shift();
        b--;
        var g = Array(b);
        a = `methodCaller<(${d.map((h) => h.name).join(", ")}) => ${e.name}>`;
        return Db(H(a, (h, f, k, m) => {
          for (var l = 0, n = 0;n < b; ++n)
            g[n] = d[n].readValueFromPointer(m + l), l += d[n].V;
          f = c === 1 ? Fb(f, g) : f.apply(h, g);
          h = [];
          f = e.toWireType(h, f);
          h.length && (E[k >> 2] = ya(h));
          return f;
        }));
      },
      f: (b) => {
        var a = K(b);
        Oa(a);
        qb(b);
      },
      v: (b, a) => {
        Y[b] && (clearTimeout(Y[b].id), delete Y[b]);
        if (!a)
          return 0;
        var c = setTimeout(() => {
          delete Y[b];
          Gb(() => Lb(b, performance.now()));
        }, a);
        Y[b] = { id: c, Ca: a };
        return 0;
      },
      w: (b) => {
        var a = A.length;
        b >>>= 0;
        if (2147483648 < b)
          return false;
        for (var c = 1;4 >= c; c *= 2) {
          var d = a * (1 + 0.2 / c);
          d = Math.min(d, b + 100663296);
          a: {
            d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(b, d) / 65536)) - y.buffer.byteLength + 65535) / 65536 | 0;
            try {
              y.grow(d);
              la();
              var e = 1;
              break a;
            } catch (g) {
            }
            e = undefined;
          }
          if (e)
            return true;
        }
        return false;
      },
      z: () => 52,
      r: function() {
        return 70;
      },
      y: (b, a, c, d) => {
        for (var e = 0, g = 0;g < c; g++) {
          var h = E[a >> 2], f = E[a + 4 >> 2];
          a += 8;
          for (var k = 0;k < f; k++) {
            var m = b, l = A[h + k], n = Hb[m];
            l === 0 || l === 10 ? ((m === 1 ? ea : w)(ub(n)), n.length = 0) : n.push(l);
          }
          e += f;
        }
        E[d >> 2] = e;
        return 0;
      },
      t: (b) => {
        throw new wa(b);
      }
    }, Z = function() {
      function b(c) {
        Z = c.exports;
        y = Z.E;
        la();
        gb = Z.J;
        na.unshift(Z.F);
        F--;
        F == 0 && (pa !== null && (clearInterval(pa), pa = null), G && (c = G, G = null, c()));
        return Z;
      }
      var a = { a: Mb };
      F++;
      if (p.instantiateWasm)
        try {
          return p.instantiateWasm(a, b);
        } catch (c) {
          w(`Module.instantiateWasm callback failed with error: ${c}`), q(c);
        }
      sa ??= ra("yoga.wasm") ? "yoga.wasm" : v + "yoga.wasm";
      va(a, function(c) {
        b(c.instance);
      }).catch(q);
      return {};
    }(), Ea = (b) => (Ea = Z.G)(b), Lb = (b, a) => (Lb = Z.H)(b, a), Kb = (b) => (Kb = Z.I)(b), O = (b) => (O = Z.K)(b);
    p.dynCall_jiji = (b, a, c, d, e) => (p.dynCall_jiji = Z.L)(b, a, c, d, e);
    var Nb;
    G = function Ob() {
      Nb || Pb();
      Nb || (G = Ob);
    };
    function Pb() {
      if (!(0 < F)) {
        for (;0 < ma.length; )
          ma.shift()(p);
        if (!(0 < F || Nb || (Nb = true, p.calledRun = true, fa))) {
          for (;0 < na.length; )
            na.shift()(p);
          for (aa(p);0 < oa.length; )
            oa.shift()(p);
        }
      }
    }
    Pb();
    moduleRtn = ba;
    return moduleRtn;
  };
})();
var yoga_default = yoga;

// index.js
__reExport(exports_yoga_wasm_web, __toESM(require_YGEnums(), 1));
async function yoga_wasm_web_default(wasm) {
  const mod = await yoga_default({
    instantiateWasm(info, receive) {
      WebAssembly.instantiate(wasm, info).then((instance) => {
        if (instance instanceof WebAssembly.Instance) {
          receive(instance);
        } else {
          receive(instance.instance);
        }
      });
    }
  });
  return import_wrapAsm.default(mod);
}
async function initStreaming(response) {
  const mod = await yoga_default({
    instantiateWasm(info, receive) {
      WebAssembly.instantiateStreaming(response, info).then(({ instance }) => {
        receive(instance);
      });
    }
  });
  return import_wrapAsm.default(mod);
}

// dist/yoga.wasm
var exports_yoga2 = {};
__export(exports_yoga2, {
  default: () => yoga_default2
});
var yoga_default2 = "./yoga-h8s72xnb.wasm";

// node.js
__reExport(exports_node, __toESM(require_YGEnums(), 1));
var {file } = globalThis.Bun;
var Yoga = await yoga_wasm_web_default(file(yoga_default2));
var node_default = Yoga;
export {
  node_default as default
};
