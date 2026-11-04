var mi = (s, e) => (e = Symbol[s]) ? e : Symbol.for("Symbol." + s), Oc = (s) => {
  throw TypeError(s);
};
var Mc = function(s, e) {
  this[0] = s, this[1] = e;
};
var rt = (s) => {
  var e = s[mi("asyncIterator")], t = !1, r, n = {};
  return e == null ? (e = s[mi("iterator")](), r = (i) => n[i] = (a) => e[i](a)) : (e = e.call(s), r = (i) => n[i] = (a) => {
    if (t) {
      if (t = !1, i === "throw") throw a;
      return a;
    }
    return t = !0, {
      done: !1,
      value: new Mc(new Promise((o) => {
        var u = e[i](a);
        u instanceof Object || Oc("Object expected"), o(u);
      }), 1)
    };
  }), n[mi("iterator")] = () => n, r("next"), "throw" in e ? r("throw") : n.throw = (i) => {
    throw i;
  }, "return" in e && r("return"), n;
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var oe;
(function(s) {
  s.RELATIVE = "RELATIVE", s.ABSOLUTE = "ABSOLUTE";
})(oe || (oe = {}));
class xe {
  constructor(e, t, r) {
    this.type = e, this.col = t, this.sheet = r;
  }
  static absolute(e, t) {
    return new xe(oe.ABSOLUTE, e, t);
  }
  static relative(e, t) {
    return new xe(oe.RELATIVE, e, t);
  }
  static compareByAbsoluteAddress(e) {
    return (t, r) => t.toSimpleColumnAddress(e).col - r.toSimpleColumnAddress(e).col;
  }
  isColumnAbsolute() {
    return this.type === oe.ABSOLUTE;
  }
  isColumnRelative() {
    return this.type === oe.RELATIVE;
  }
  isAbsolute() {
    return this.type === oe.ABSOLUTE && this.sheet !== void 0;
  }
  moved(e, t, r) {
    const n = this.sheet === void 0 ? void 0 : e;
    return new xe(this.type, this.col + t, n);
  }
  shiftedByColumns(e) {
    return new xe(this.type, this.col + e, this.sheet);
  }
  toSimpleColumnAddress(e) {
    const t = Tt(this, e);
    let r = this.col;
    return this.isColumnRelative() && (r = e.col + this.col), Jh(t, r);
  }
  shiftRelativeDimensions(e, t) {
    const r = this.isColumnRelative() ? this.col + e : this.col;
    return new xe(this.type, r, this.sheet);
  }
  shiftAbsoluteDimensions(e, t) {
    const r = this.isColumnAbsolute() ? this.col + e : this.col;
    return new xe(this.type, r, this.sheet);
  }
  withSheet(e) {
    return new xe(this.type, this.col, e);
  }
  isInvalid(e) {
    return this.toSimpleColumnAddress(e).col < 0;
  }
  hash(e) {
    const t = e && this.sheet !== void 0 ? `#${this.sheet}` : "";
    switch (this.type) {
      case oe.RELATIVE:
        return `${t}#COLR${this.col}`;
      case oe.ABSOLUTE:
        return `${t}#COLA${this.col}`;
    }
  }
  unparse(e) {
    const t = this.toSimpleColumnAddress(e);
    if (om(t))
      return;
    const r = Xs(t.col);
    return `${this.type === oe.ABSOLUTE ? "$" : ""}${r}`;
  }
  exceedsSheetSizeLimits(e) {
    return this.col >= e;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Le {
  constructor(e, t, r) {
    this.type = e, this.row = t, this.sheet = r;
  }
  static absolute(e, t) {
    return new Le(oe.ABSOLUTE, e, t);
  }
  static relative(e, t) {
    return new Le(oe.RELATIVE, e, t);
  }
  static compareByAbsoluteAddress(e) {
    return (t, r) => t.toSimpleRowAddress(e).row - r.toSimpleRowAddress(e).row;
  }
  isRowAbsolute() {
    return this.type === oe.ABSOLUTE;
  }
  isRowRelative() {
    return this.type === oe.RELATIVE;
  }
  isAbsolute() {
    return this.type === oe.ABSOLUTE && this.sheet !== void 0;
  }
  moved(e, t, r) {
    const n = this.sheet === void 0 ? void 0 : e;
    return new Le(this.type, this.row + r, n);
  }
  shiftedByRows(e) {
    return new Le(this.type, this.row + e, this.sheet);
  }
  toSimpleRowAddress(e) {
    const t = Tt(this, e);
    let r = this.row;
    return this.isRowRelative() && (r = e.row + this.row), Zh(t, r);
  }
  shiftRelativeDimensions(e, t) {
    const r = this.isRowRelative() ? this.row + t : this.row;
    return new Le(this.type, r, this.sheet);
  }
  shiftAbsoluteDimensions(e, t) {
    const r = this.isRowAbsolute() ? this.row + t : this.row;
    return new Le(this.type, r, this.sheet);
  }
  withSheet(e) {
    return new Le(this.type, this.row, e);
  }
  isInvalid(e) {
    return this.toSimpleRowAddress(e).row < 0;
  }
  hash(e) {
    const t = e && this.sheet !== void 0 ? `#${this.sheet}` : "";
    switch (this.type) {
      case oe.RELATIVE:
        return `${t}#ROWR${this.row}`;
      case oe.ABSOLUTE:
        return `${t}#ROWA${this.row}`;
    }
  }
  unparse(e) {
    const t = this.toSimpleRowAddress(e);
    return am(t) ? void 0 : `${this.type === oe.ABSOLUTE ? "$" : ""}${t.row + 1}`;
  }
  exceedsSheetSizeLimits(e) {
    return this.row >= e;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var X;
(function(s) {
  s.CELL_REFERENCE_RELATIVE = "CELL_REFERENCE", s.CELL_REFERENCE_ABSOLUTE = "CELL_REFERENCE_ABSOLUTE", s.CELL_REFERENCE_ABSOLUTE_COL = "CELL_REFERENCE_ABSOLUTE_COL", s.CELL_REFERENCE_ABSOLUTE_ROW = "CELL_REFERENCE_ABSOLUTE_ROW";
})(X || (X = {}));
class j {
  constructor(e, t, r, n) {
    this.col = e, this.row = t, this.type = r, this.sheet = n;
  }
  static fromColAndRow(e, t, r) {
    return (e.isColumnAbsolute() && t.isRowAbsolute() ? j.absolute.bind(this) : e.isColumnAbsolute() ? j.absoluteCol.bind(this) : t.isRowAbsolute() ? j.absoluteRow.bind(this) : j.relative.bind(this))(e.col, t.row, r);
  }
  static relative(e, t, r) {
    return new j(e, t, X.CELL_REFERENCE_RELATIVE, r);
  }
  static absolute(e, t, r) {
    return new j(e, t, X.CELL_REFERENCE_ABSOLUTE, r);
  }
  static absoluteCol(e, t, r) {
    return new j(e, t, X.CELL_REFERENCE_ABSOLUTE_COL, r);
  }
  static absoluteRow(e, t, r) {
    return new j(e, t, X.CELL_REFERENCE_ABSOLUTE_ROW, r);
  }
  /**
   * Converts R0C0 representation of cell address to simple object representation.
   *
   * @param baseAddress - base address for R0C0 shifts
   */
  toSimpleCellAddress(e) {
    const t = Tt(this, e);
    return this.type === X.CELL_REFERENCE_ABSOLUTE ? O(t, this.col, this.row) : this.type === X.CELL_REFERENCE_ABSOLUTE_ROW ? O(t, e.col + this.col, this.row) : this.type === X.CELL_REFERENCE_ABSOLUTE_COL ? O(t, this.col, e.row + this.row) : O(t, e.col + this.col, e.row + this.row);
  }
  toColumnAddress() {
    const e = this.isColumnRelative() ? oe.RELATIVE : oe.ABSOLUTE;
    return new xe(e, this.col, this.sheet);
  }
  toRowAddress() {
    const e = this.isRowRelative() ? oe.RELATIVE : oe.ABSOLUTE;
    return new Le(e, this.row, this.sheet);
  }
  toSimpleColumnAddress(e) {
    const t = Tt(this, e);
    let r = this.col;
    return this.isColumnRelative() && (r += e.col), Jh(t, r);
  }
  toSimpleRowAddress(e) {
    const t = Tt(this, e);
    let r = this.row;
    return this.isRowRelative() && (r += e.row), Zh(t, r);
  }
  isRowAbsolute() {
    return this.type === X.CELL_REFERENCE_ABSOLUTE || this.type === X.CELL_REFERENCE_ABSOLUTE_ROW;
  }
  isColumnAbsolute() {
    return this.type === X.CELL_REFERENCE_ABSOLUTE || this.type === X.CELL_REFERENCE_ABSOLUTE_COL;
  }
  isColumnRelative() {
    return this.type === X.CELL_REFERENCE_RELATIVE || this.type === X.CELL_REFERENCE_ABSOLUTE_ROW;
  }
  isRowRelative() {
    return this.type === X.CELL_REFERENCE_RELATIVE || this.type === X.CELL_REFERENCE_ABSOLUTE_COL;
  }
  isAbsolute() {
    return this.type === X.CELL_REFERENCE_ABSOLUTE && this.sheet !== void 0;
  }
  shiftedByRows(e) {
    return new j(this.col, this.row + e, this.type, this.sheet);
  }
  shiftedByColumns(e) {
    return new j(this.col + e, this.row, this.type, this.sheet);
  }
  moved(e, t, r) {
    const n = this.sheet === void 0 ? void 0 : e;
    return new j(this.col + t, this.row + r, this.type, n);
  }
  withSheet(e) {
    return new j(this.col, this.row, this.type, e);
  }
  isInvalid(e) {
    return ke(this.toSimpleCellAddress(e));
  }
  shiftRelativeDimensions(e, t) {
    const r = this.isColumnAbsolute() ? this.col : this.col + e, n = this.isRowAbsolute() ? this.row : this.row + t;
    return new j(r, n, this.type, this.sheet);
  }
  shiftAbsoluteDimensions(e, t) {
    const r = this.isColumnRelative() ? this.col : this.col + e, n = this.isRowRelative() ? this.row : this.row + t;
    return new j(r, n, this.type, this.sheet);
  }
  hash(e) {
    const t = e && this.sheet !== void 0 ? `#${this.sheet}` : "";
    switch (this.type) {
      case X.CELL_REFERENCE_RELATIVE:
        return `${t}#${this.row}R${this.col}`;
      case X.CELL_REFERENCE_ABSOLUTE:
        return `${t}#${this.row}A${this.col}`;
      case X.CELL_REFERENCE_ABSOLUTE_COL:
        return `${t}#${this.row}AC${this.col}`;
      case X.CELL_REFERENCE_ABSOLUTE_ROW:
        return `${t}#${this.row}AR${this.col}`;
    }
  }
  unparse(e) {
    const t = this.toSimpleCellAddress(e);
    if (ke(t))
      return;
    const r = Xs(t.col), n = this.type === X.CELL_REFERENCE_ABSOLUTE || this.type === X.CELL_REFERENCE_ABSOLUTE_ROW ? "$" : "";
    return `${this.type === X.CELL_REFERENCE_ABSOLUTE || this.type === X.CELL_REFERENCE_ABSOLUTE_COL ? "$" : ""}${r}${n}${t.row + 1}`;
  }
  exceedsSheetSizeLimits(e, t) {
    return this.row >= t || this.col >= e;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const _n = ":", Pe = "$", wc = "\\s+", _c = "[ \\t\\n\\r]+", zs = "A-Za-zÀ-ʯ", la = `${zs}0-9_.`, vu = `[${zs}0-9_]+`, Lc = "'(((?!').|'')*)'", Jr = `(${vu}|${Lc})!`, Cu = `(${Jr})?\\${Pe}?[A-Za-z]+\\${Pe}?[0-9]+`, ja = `(${Jr})?\\${Pe}?[A-Za-z]+`, qa = `(${Jr})?\\${Pe}?[0-9]+`, Iu = "[rR][0-9]*[cC][0-9]*", Fc = `(${Cu})[^${la}]`, Ou = `[${zs}_][${la}]*`, Uc = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], Mu = [...Array.from(Array(26)).map((s, e) => e + 65), ...Array.from(Array(26)).map((s, e) => e + 97), ...Array.from(Array(496)).map((s, e) => e + 192)].map((s) => String.fromCharCode(s));
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const wu = new RegExp(`^(${Jr})?(\\${Pe}?)([A-Za-z]+)(\\${Pe}?)([0-9]+)$`), xc = new RegExp(`^(${Jr})?(\\${Pe}?)([A-Za-z]+)$`), bc = new RegExp(`^(${Jr})?(\\${Pe}?)([0-9]+)$`), Pc = new RegExp(`^${vu}$`), br = (s, e, t) => {
  const r = wu.exec(s);
  if (!r)
    return;
  const n = ca(r[6]), i = Number(r[8]) - 1, a = $s(r), o = Ks(a, t);
  if (o !== null)
    return r[5] === Pe && r[7] === Pe ? j.absolute(n, i, o) : r[5] === Pe ? j.absoluteCol(n, i - e.row, o) : r[7] === Pe ? j.absoluteRow(n - e.col, i, o) : j.relative(n - e.col, i - e.row, o);
}, Rs = (s, e, t) => {
  const r = xc.exec(s);
  if (!r)
    return;
  const n = ca(r[6]), i = $s(r), a = Ks(i, t);
  if (a !== null)
    return r[5] === Pe ? xe.absolute(n, a) : xe.relative(n - e.col, a);
}, Ns = (s, e, t) => {
  const r = bc.exec(s);
  if (!r)
    return;
  const n = Number(r[6]) - 1, i = $s(r), a = Ks(i, t);
  if (a !== null)
    return r[5] === Pe ? Le.absolute(n, a) : Le.relative(n - e.row, a);
}, Li = (s, e, t) => {
  const r = wu.exec(e);
  if (!r)
    return;
  const n = ca(r[6]), i = Number(r[8]) - 1, a = $s(r), o = Ks(a, s);
  return o === null ? void 0 : O(o === void 0 ? t : o, n, i);
}, Vc = (s, e, t) => {
  const r = e.split(_n);
  if (r.length !== 2)
    return;
  const [n, i] = r, a = Li(s, n, t);
  if (a === void 0)
    return;
  const o = Li(s, i, a.sheet);
  if (o !== void 0 && a.sheet === o.sheet)
    return $i(a, o);
}, Ts = (s, e, t) => {
  const r = Xs(e.col), n = _u(e.sheet, s);
  if (n !== void 0)
    return t !== e.sheet ? `${n}!${r}${e.row + 1}` : `${r}${e.row + 1}`;
}, Dc = (s, e, t) => {
  const r = Ts(s, e.start, t), n = Ts(s, e.end, e.start.sheet);
  if (!(r === void 0 || n === void 0))
    return `${r}${_n}${n}`;
};
function ca(s) {
  return s.length === 1 ? s.toUpperCase().charCodeAt(0) - 65 : s.split("").reduce((e, t) => e * 26 + (t.toUpperCase().charCodeAt(0) - 64), 0) - 1;
}
function Xs(s) {
  let e = "";
  for (; s >= 0; )
    e = String.fromCharCode(s % 26 + 97) + e, s = Math.floor(s / 26) - 1;
  return e.toUpperCase();
}
function _u(s, e) {
  let t = e(s);
  if (t !== void 0)
    return Pc.test(t) ? t : (t = t.replace(/'/g, "''"), `'${t}'`);
}
function $s(s) {
  var e;
  const t = (e = s[3]) !== null && e !== void 0 ? e : s[2];
  return t ? t.replace(/''/g, "'") : null;
}
function Ks(s, e) {
  if (!s)
    return;
  const t = e(s);
  return t === void 0 ? null : t;
}
function q(s) {
  return s && s.length === 0;
}
function $t(s) {
  return s == null ? [] : Object.keys(s);
}
function Fe(s) {
  for (var e = [], t = Object.keys(s), r = 0; r < t.length; r++)
    e.push(s[t[r]]);
  return e;
}
function Bc(s, e) {
  for (var t = [], r = $t(s), n = 0; n < r.length; n++) {
    var i = r[n];
    t.push(e.call(null, s[i], i));
  }
  return t;
}
function L(s, e) {
  for (var t = [], r = 0; r < s.length; r++)
    t.push(e.call(null, s[r], r));
  return t;
}
function We(s) {
  for (var e = [], t = 0; t < s.length; t++) {
    var r = s[t];
    Array.isArray(r) ? e = e.concat(We(r)) : e.push(r);
  }
  return e;
}
function ut(s) {
  return q(s) ? void 0 : s[0];
}
function Lu(s) {
  var e = s && s.length;
  return e ? s[e - 1] : void 0;
}
function x(s, e) {
  if (Array.isArray(s))
    for (var t = 0; t < s.length; t++)
      e.call(null, s[t], t);
  else if (fa(s))
    for (var r = $t(s), t = 0; t < r.length; t++) {
      var n = r[t], i = s[n];
      e.call(null, i, n);
    }
  else
    throw Error("non exhaustive match");
}
function xt(s) {
  return typeof s == "string";
}
function ht(s) {
  return s === void 0;
}
function or(s) {
  return s instanceof Function;
}
function Ce(s, e) {
  return e === void 0 && (e = 1), s.slice(e, s.length);
}
function Sn(s, e) {
  return e === void 0 && (e = 1), s.slice(0, s.length - e);
}
function St(s, e) {
  var t = [];
  if (Array.isArray(s))
    for (var r = 0; r < s.length; r++) {
      var n = s[r];
      e.call(null, n) && t.push(n);
    }
  return t;
}
function Cr(s, e) {
  return St(s, function(t) {
    return !e(t);
  });
}
function dt(s, e) {
  for (var t = Object.keys(s), r = {}, n = 0; n < t.length; n++) {
    var i = t[n], a = s[i];
    e(a) && (r[i] = a);
  }
  return r;
}
function U(s, e) {
  return fa(s) ? s.hasOwnProperty(e) : !1;
}
function Ee(s, e) {
  return qr(s, function(t) {
    return t === e;
  }) !== void 0;
}
function Ye(s) {
  for (var e = [], t = 0; t < s.length; t++)
    e.push(s[t]);
  return e;
}
function Ln(s) {
  var e = {};
  for (var t in s)
    Object.prototype.hasOwnProperty.call(s, t) && (e[t] = s[t]);
  return e;
}
function qr(s, e) {
  for (var t = 0; t < s.length; t++) {
    var r = s[t];
    if (e.call(null, r))
      return r;
  }
}
function kc(s, e) {
  for (var t = [], r = 0; r < s.length; r++) {
    var n = s[r];
    e.call(null, n) && t.push(n);
  }
  return t;
}
function Oe(s, e, t) {
  for (var r = Array.isArray(s), n = r ? s : Fe(s), i = r ? [] : $t(s), a = t, o = 0; o < n.length; o++)
    a = e.call(null, a, n[o], r ? o : i[o]);
  return a;
}
function Fn(s) {
  return Cr(s, function(e) {
    return e == null;
  });
}
function da(s, e) {
  e === void 0 && (e = function(r) {
    return r;
  });
  var t = [];
  return Oe(s, function(r, n) {
    var i = e(n);
    return Ee(t, i) ? r : (t.push(i), r.concat(n));
  }, []);
}
function Nt(s) {
  return Array.isArray(s);
}
function zt(s) {
  return s instanceof RegExp;
}
function fa(s) {
  return s instanceof Object;
}
function ot(s, e) {
  for (var t = 0; t < s.length; t++)
    if (!e(s[t], t))
      return !1;
  return !0;
}
function js(s, e) {
  return Cr(s, function(t) {
    return Ee(e, t);
  });
}
function Fu(s, e) {
  for (var t = 0; t < s.length; t++)
    if (e(s[t]))
      return !0;
  return !1;
}
function Gc(s, e) {
  for (var t = 0; t < s.length; t++)
    if (s[t] === e)
      return t;
  return -1;
}
function At(s) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  for (var r = 0; r < e.length; r++)
    for (var n = e[r], i = $t(n), a = 0; a < i.length; a++) {
      var o = i[a];
      s[o] = n[o];
    }
  return s;
}
function Hc(s) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    if (!ht(n))
      for (var i = $t(n), a = 0; a < i.length; a++) {
        var o = i[a];
        U(s, o) || (s[o] = n[o]);
      }
  }
  return s;
}
function qs() {
  for (var s = [], e = 0; e < arguments.length; e++)
    s[e] = arguments[e];
  return Hc.apply(null, [{}].concat(s));
}
function Uu(s, e) {
  var t = {};
  return x(s, function(r) {
    var n = e(r), i = t[n];
    i ? i.push(r) : t[n] = [r];
  }), t;
}
function Qa(s, e) {
  for (var t = Ln(s), r = $t(e), n = 0; n < r.length; n++) {
    var i = r[n], a = e[i];
    t[i] = a;
  }
  return t;
}
function Re() {
}
function Za(s) {
  return s;
}
function Wc(s) {
  for (var e = [], t = 0; t < s.length; t++) {
    var r = s[t];
    e.push(r !== void 0 ? r : void 0);
  }
  return e;
}
function Fi(s) {
  console && console.error && console.error("Error: " + s);
}
function pa(s) {
  console && console.warn && console.warn("Warning: " + s);
}
function Ja() {
  return typeof Map == "function";
}
function Yc(s, e) {
  e.forEach(function(t) {
    var r = t.prototype;
    Object.getOwnPropertyNames(r).forEach(function(n) {
      if (n !== "constructor") {
        var i = Object.getOwnPropertyDescriptor(r, n);
        i && (i.get || i.set) ? Object.defineProperty(s.prototype, n, i) : s.prototype[n] = t.prototype[n];
      }
    });
  });
}
function xu(s) {
  function e() {
  }
  e.prototype = s;
  var t = new e();
  function r() {
    return typeof t.bar;
  }
  return r(), r(), s;
}
function Ss(s) {
  return s[s.length - 1];
}
function bu(s) {
  var e = (/* @__PURE__ */ new Date()).getTime(), t = s(), r = (/* @__PURE__ */ new Date()).getTime(), n = r - e;
  return { time: n, value: t };
}
var as = { exports: {} }, zc = as.exports, eo;
function Xc() {
  return eo || (eo = 1, (function(s) {
    (function(e, t) {
      s.exports ? s.exports = t() : e.regexpToAst = t();
    })(
      typeof self != "undefined" ? (
        // istanbul ignore next
        self
      ) : zc,
      function() {
        function e() {
        }
        e.prototype.saveState = function() {
          return {
            idx: this.idx,
            input: this.input,
            groupIdx: this.groupIdx
          };
        }, e.prototype.restoreState = function(R) {
          this.idx = R.idx, this.input = R.input, this.groupIdx = R.groupIdx;
        }, e.prototype.pattern = function(R) {
          this.idx = 0, this.input = R, this.groupIdx = 0, this.consumeChar("/");
          var S = this.disjunction();
          this.consumeChar("/");
          for (var A = {
            type: "Flags",
            global: !1,
            ignoreCase: !1,
            multiLine: !1,
            unicode: !1,
            sticky: !1
          }; this.isRegExpFlag(); )
            switch (this.popChar()) {
              case "g":
                o(A, "global");
                break;
              case "i":
                o(A, "ignoreCase");
                break;
              case "m":
                o(A, "multiLine");
                break;
              case "u":
                o(A, "unicode");
                break;
              case "y":
                o(A, "sticky");
                break;
            }
          if (this.idx !== this.input.length)
            throw Error(
              "Redundant input: " + this.input.substring(this.idx)
            );
          return { type: "Pattern", flags: A, value: S };
        }, e.prototype.disjunction = function() {
          var R = [];
          for (R.push(this.alternative()); this.peekChar() === "|"; )
            this.consumeChar("|"), R.push(this.alternative());
          return { type: "Disjunction", value: R };
        }, e.prototype.alternative = function() {
          for (var R = []; this.isTerm(); )
            R.push(this.term());
          return { type: "Alternative", value: R };
        }, e.prototype.term = function() {
          return this.isAssertion() ? this.assertion() : this.atom();
        }, e.prototype.assertion = function() {
          switch (this.popChar()) {
            case "^":
              return { type: "StartAnchor" };
            case "$":
              return { type: "EndAnchor" };
            // '\b' or '\B'
            case "\\":
              switch (this.popChar()) {
                case "b":
                  return { type: "WordBoundary" };
                case "B":
                  return { type: "NonWordBoundary" };
              }
              throw Error("Invalid Assertion Escape");
            // '(?=' or '(?!'
            case "(":
              this.consumeChar("?");
              var R;
              switch (this.popChar()) {
                case "=":
                  R = "Lookahead";
                  break;
                case "!":
                  R = "NegativeLookahead";
                  break;
              }
              u(R);
              var S = this.disjunction();
              return this.consumeChar(")"), { type: R, value: S };
          }
          l();
        }, e.prototype.quantifier = function(R) {
          var S;
          switch (this.popChar()) {
            case "*":
              S = {
                atLeast: 0,
                atMost: 1 / 0
              };
              break;
            case "+":
              S = {
                atLeast: 1,
                atMost: 1 / 0
              };
              break;
            case "?":
              S = {
                atLeast: 0,
                atMost: 1
              };
              break;
            case "{":
              var A = this.integerIncludingZero();
              switch (this.popChar()) {
                case "}":
                  S = {
                    atLeast: A,
                    atMost: A
                  };
                  break;
                case ",":
                  var y;
                  this.isDigit() ? (y = this.integerIncludingZero(), S = {
                    atLeast: A,
                    atMost: y
                  }) : S = {
                    atLeast: A,
                    atMost: 1 / 0
                  }, this.consumeChar("}");
                  break;
              }
              if (R === !0 && S === void 0)
                return;
              u(S);
              break;
          }
          if (!(R === !0 && S === void 0))
            return u(S), this.peekChar(0) === "?" ? (this.consumeChar("?"), S.greedy = !1) : S.greedy = !0, S.type = "Quantifier", S;
        }, e.prototype.atom = function() {
          var R;
          switch (this.peekChar()) {
            case ".":
              R = this.dotAll();
              break;
            case "\\":
              R = this.atomEscape();
              break;
            case "[":
              R = this.characterClass();
              break;
            case "(":
              R = this.group();
              break;
          }
          return R === void 0 && this.isPatternCharacter() && (R = this.patternCharacter()), u(R), this.isQuantifier() && (R.quantifier = this.quantifier()), R;
        }, e.prototype.dotAll = function() {
          return this.consumeChar("."), {
            type: "Set",
            complement: !0,
            value: [i(`
`), i("\r"), i("\u2028"), i("\u2029")]
          };
        }, e.prototype.atomEscape = function() {
          switch (this.consumeChar("\\"), this.peekChar()) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              return this.decimalEscapeAtom();
            case "d":
            case "D":
            case "s":
            case "S":
            case "w":
            case "W":
              return this.characterClassEscape();
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              return this.controlEscapeAtom();
            case "c":
              return this.controlLetterEscapeAtom();
            case "0":
              return this.nulCharacterAtom();
            case "x":
              return this.hexEscapeSequenceAtom();
            case "u":
              return this.regExpUnicodeEscapeSequenceAtom();
            default:
              return this.identityEscapeAtom();
          }
        }, e.prototype.decimalEscapeAtom = function() {
          var R = this.positiveInteger();
          return { type: "GroupBackReference", value: R };
        }, e.prototype.characterClassEscape = function() {
          var R, S = !1;
          switch (this.popChar()) {
            case "d":
              R = d;
              break;
            case "D":
              R = d, S = !0;
              break;
            case "s":
              R = N;
              break;
            case "S":
              R = N, S = !0;
              break;
            case "w":
              R = p;
              break;
            case "W":
              R = p, S = !0;
              break;
          }
          return u(R), { type: "Set", value: R, complement: S };
        }, e.prototype.controlEscapeAtom = function() {
          var R;
          switch (this.popChar()) {
            case "f":
              R = i("\f");
              break;
            case "n":
              R = i(`
`);
              break;
            case "r":
              R = i("\r");
              break;
            case "t":
              R = i("	");
              break;
            case "v":
              R = i("\v");
              break;
          }
          return u(R), { type: "Character", value: R };
        }, e.prototype.controlLetterEscapeAtom = function() {
          this.consumeChar("c");
          var R = this.popChar();
          if (/[a-zA-Z]/.test(R) === !1)
            throw Error("Invalid ");
          var S = R.toUpperCase().charCodeAt(0) - 64;
          return { type: "Character", value: S };
        }, e.prototype.nulCharacterAtom = function() {
          return this.consumeChar("0"), { type: "Character", value: i("\0") };
        }, e.prototype.hexEscapeSequenceAtom = function() {
          return this.consumeChar("x"), this.parseHexDigits(2);
        }, e.prototype.regExpUnicodeEscapeSequenceAtom = function() {
          return this.consumeChar("u"), this.parseHexDigits(4);
        }, e.prototype.identityEscapeAtom = function() {
          var R = this.popChar();
          return { type: "Character", value: i(R) };
        }, e.prototype.classPatternCharacterAtom = function() {
          switch (this.peekChar()) {
            // istanbul ignore next
            case `
`:
            // istanbul ignore next
            case "\r":
            // istanbul ignore next
            case "\u2028":
            // istanbul ignore next
            case "\u2029":
            // istanbul ignore next
            case "\\":
            // istanbul ignore next
            case "]":
              throw Error("TBD");
            default:
              var R = this.popChar();
              return { type: "Character", value: i(R) };
          }
        }, e.prototype.characterClass = function() {
          var R = [], S = !1;
          for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), S = !0); this.isClassAtom(); ) {
            var A = this.classAtom(), y = A.type === "Character";
            if (y && this.isRangeDash()) {
              this.consumeChar("-");
              var v = this.classAtom(), w = v.type === "Character";
              if (w) {
                if (v.value < A.value)
                  throw Error("Range out of order in character class");
                R.push({ from: A.value, to: v.value });
              } else
                a(A.value, R), R.push(i("-")), a(v.value, R);
            } else
              a(A.value, R);
          }
          return this.consumeChar("]"), { type: "Set", complement: S, value: R };
        }, e.prototype.classAtom = function() {
          switch (this.peekChar()) {
            // istanbul ignore next
            case "]":
            // istanbul ignore next
            case `
`:
            // istanbul ignore next
            case "\r":
            // istanbul ignore next
            case "\u2028":
            // istanbul ignore next
            case "\u2029":
              throw Error("TBD");
            case "\\":
              return this.classEscape();
            default:
              return this.classPatternCharacterAtom();
          }
        }, e.prototype.classEscape = function() {
          switch (this.consumeChar("\\"), this.peekChar()) {
            // Matches a backspace.
            // (Not to be confused with \b word boundary outside characterClass)
            case "b":
              return this.consumeChar("b"), { type: "Character", value: i("\b") };
            case "d":
            case "D":
            case "s":
            case "S":
            case "w":
            case "W":
              return this.characterClassEscape();
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              return this.controlEscapeAtom();
            case "c":
              return this.controlLetterEscapeAtom();
            case "0":
              return this.nulCharacterAtom();
            case "x":
              return this.hexEscapeSequenceAtom();
            case "u":
              return this.regExpUnicodeEscapeSequenceAtom();
            default:
              return this.identityEscapeAtom();
          }
        }, e.prototype.group = function() {
          var R = !0;
          switch (this.consumeChar("("), this.peekChar(0)) {
            case "?":
              this.consumeChar("?"), this.consumeChar(":"), R = !1;
              break;
            default:
              this.groupIdx++;
              break;
          }
          var S = this.disjunction();
          this.consumeChar(")");
          var A = {
            type: "Group",
            capturing: R,
            value: S
          };
          return R && (A.idx = this.groupIdx), A;
        }, e.prototype.positiveInteger = function() {
          var R = this.popChar();
          if (n.test(R) === !1)
            throw Error("Expecting a positive integer");
          for (; r.test(this.peekChar(0)); )
            R += this.popChar();
          return parseInt(R, 10);
        }, e.prototype.integerIncludingZero = function() {
          var R = this.popChar();
          if (r.test(R) === !1)
            throw Error("Expecting an integer");
          for (; r.test(this.peekChar(0)); )
            R += this.popChar();
          return parseInt(R, 10);
        }, e.prototype.patternCharacter = function() {
          var R = this.popChar();
          switch (R) {
            // istanbul ignore next
            case `
`:
            // istanbul ignore next
            case "\r":
            // istanbul ignore next
            case "\u2028":
            // istanbul ignore next
            case "\u2029":
            // istanbul ignore next
            case "^":
            // istanbul ignore next
            case "$":
            // istanbul ignore next
            case "\\":
            // istanbul ignore next
            case ".":
            // istanbul ignore next
            case "*":
            // istanbul ignore next
            case "+":
            // istanbul ignore next
            case "?":
            // istanbul ignore next
            case "(":
            // istanbul ignore next
            case ")":
            // istanbul ignore next
            case "[":
            // istanbul ignore next
            case "|":
              throw Error("TBD");
            default:
              return { type: "Character", value: i(R) };
          }
        }, e.prototype.isRegExpFlag = function() {
          switch (this.peekChar(0)) {
            case "g":
            case "i":
            case "m":
            case "u":
            case "y":
              return !0;
            default:
              return !1;
          }
        }, e.prototype.isRangeDash = function() {
          return this.peekChar() === "-" && this.isClassAtom(1);
        }, e.prototype.isDigit = function() {
          return r.test(this.peekChar(0));
        }, e.prototype.isClassAtom = function(R) {
          switch (R === void 0 && (R = 0), this.peekChar(R)) {
            case "]":
            case `
`:
            case "\r":
            case "\u2028":
            case "\u2029":
              return !1;
            default:
              return !0;
          }
        }, e.prototype.isTerm = function() {
          return this.isAtom() || this.isAssertion();
        }, e.prototype.isAtom = function() {
          if (this.isPatternCharacter())
            return !0;
          switch (this.peekChar(0)) {
            case ".":
            case "\\":
            // atomEscape
            case "[":
            // characterClass
            // TODO: isAtom must be called before isAssertion - disambiguate
            case "(":
              return !0;
            default:
              return !1;
          }
        }, e.prototype.isAssertion = function() {
          switch (this.peekChar(0)) {
            case "^":
            case "$":
              return !0;
            // '\b' or '\B'
            case "\\":
              switch (this.peekChar(1)) {
                case "b":
                case "B":
                  return !0;
                default:
                  return !1;
              }
            // '(?=' or '(?!'
            case "(":
              return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
            default:
              return !1;
          }
        }, e.prototype.isQuantifier = function() {
          var R = this.saveState();
          try {
            return this.quantifier(!0) !== void 0;
          } catch (S) {
            return !1;
          } finally {
            this.restoreState(R);
          }
        }, e.prototype.isPatternCharacter = function() {
          switch (this.peekChar()) {
            case "^":
            case "$":
            case "\\":
            case ".":
            case "*":
            case "+":
            case "?":
            case "(":
            case ")":
            case "[":
            case "|":
            case "/":
            case `
`:
            case "\r":
            case "\u2028":
            case "\u2029":
              return !1;
            default:
              return !0;
          }
        }, e.prototype.parseHexDigits = function(R) {
          for (var S = "", A = 0; A < R; A++) {
            var y = this.popChar();
            if (t.test(y) === !1)
              throw Error("Expecting a HexDecimal digits");
            S += y;
          }
          var v = parseInt(S, 16);
          return { type: "Character", value: v };
        }, e.prototype.peekChar = function(R) {
          return R === void 0 && (R = 0), this.input[this.idx + R];
        }, e.prototype.popChar = function() {
          var R = this.peekChar(0);
          return this.consumeChar(), R;
        }, e.prototype.consumeChar = function(R) {
          if (R !== void 0 && this.input[this.idx] !== R)
            throw Error(
              "Expected: '" + R + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx
            );
          if (this.idx >= this.input.length)
            throw Error("Unexpected end of input");
          this.idx++;
        };
        var t = /[0-9a-fA-F]/, r = /[0-9]/, n = /[1-9]/;
        function i(R) {
          return R.charCodeAt(0);
        }
        function a(R, S) {
          R.length !== void 0 ? R.forEach(function(A) {
            S.push(A);
          }) : S.push(R);
        }
        function o(R, S) {
          if (R[S] === !0)
            throw "duplicate flag " + S;
          R[S] = !0;
        }
        function u(R) {
          if (R === void 0)
            throw Error("Internal Error - Should never get here!");
        }
        function l() {
          throw Error("Internal Error - Should never get here!");
        }
        var c, d = [];
        for (c = i("0"); c <= i("9"); c++)
          d.push(c);
        var p = [i("_")].concat(d);
        for (c = i("a"); c <= i("z"); c++)
          p.push(c);
        for (c = i("A"); c <= i("Z"); c++)
          p.push(c);
        var N = [
          i(" "),
          i("\f"),
          i(`
`),
          i("\r"),
          i("	"),
          i("\v"),
          i("	"),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i(" "),
          i("\u2028"),
          i("\u2029"),
          i(" "),
          i(" "),
          i("　"),
          i("\uFEFF")
        ];
        function T() {
        }
        return T.prototype.visitChildren = function(R) {
          for (var S in R) {
            var A = R[S];
            R.hasOwnProperty(S) && (A.type !== void 0 ? this.visit(A) : Array.isArray(A) && A.forEach(function(y) {
              this.visit(y);
            }, this));
          }
        }, T.prototype.visit = function(R) {
          switch (R.type) {
            case "Pattern":
              this.visitPattern(R);
              break;
            case "Flags":
              this.visitFlags(R);
              break;
            case "Disjunction":
              this.visitDisjunction(R);
              break;
            case "Alternative":
              this.visitAlternative(R);
              break;
            case "StartAnchor":
              this.visitStartAnchor(R);
              break;
            case "EndAnchor":
              this.visitEndAnchor(R);
              break;
            case "WordBoundary":
              this.visitWordBoundary(R);
              break;
            case "NonWordBoundary":
              this.visitNonWordBoundary(R);
              break;
            case "Lookahead":
              this.visitLookahead(R);
              break;
            case "NegativeLookahead":
              this.visitNegativeLookahead(R);
              break;
            case "Character":
              this.visitCharacter(R);
              break;
            case "Set":
              this.visitSet(R);
              break;
            case "Group":
              this.visitGroup(R);
              break;
            case "GroupBackReference":
              this.visitGroupBackReference(R);
              break;
            case "Quantifier":
              this.visitQuantifier(R);
              break;
          }
          this.visitChildren(R);
        }, T.prototype.visitPattern = function(R) {
        }, T.prototype.visitFlags = function(R) {
        }, T.prototype.visitDisjunction = function(R) {
        }, T.prototype.visitAlternative = function(R) {
        }, T.prototype.visitStartAnchor = function(R) {
        }, T.prototype.visitEndAnchor = function(R) {
        }, T.prototype.visitWordBoundary = function(R) {
        }, T.prototype.visitNonWordBoundary = function(R) {
        }, T.prototype.visitLookahead = function(R) {
        }, T.prototype.visitNegativeLookahead = function(R) {
        }, T.prototype.visitCharacter = function(R) {
        }, T.prototype.visitSet = function(R) {
        }, T.prototype.visitGroup = function(R) {
        }, T.prototype.visitGroupBackReference = function(R) {
        }, T.prototype.visitQuantifier = function(R) {
        }, {
          RegExpParser: e,
          BaseRegExpVisitor: T,
          VERSION: "0.4.0"
        };
      }
    );
  })(as)), as.exports;
}
var Un = Xc(), os = {}, $c = new Un.RegExpParser();
function Qs(s) {
  var e = s.toString();
  if (os.hasOwnProperty(e))
    return os[e];
  var t = $c.pattern(e);
  return os[e] = t, t;
}
function Kc() {
  os = {};
}
var jc = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})(), Pu = "Complement Sets are not supported for first char optimization", As = `Unable to use "first char" lexer optimizations:
`;
function qc(s, e) {
  e === void 0 && (e = !1);
  try {
    var t = Qs(s), r = Ui(t.value, {}, t.flags.ignoreCase);
    return r;
  } catch (i) {
    if (i.message === Pu)
      e && pa("" + As + ("	Unable to optimize: < " + s.toString() + ` >
`) + `	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      var n = "";
      e && (n = `
	This will disable the lexer's first char optimizations.
	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), Fi(As + `
` + ("	Failed parsing: < " + s.toString() + ` >
`) + ("	Using the regexp-to-ast library version: " + Un.VERSION + `
`) + "	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" + n);
    }
  }
  return [];
}
function Ui(s, e, t) {
  switch (s.type) {
    case "Disjunction":
      for (var r = 0; r < s.value.length; r++)
        Ui(s.value[r], e, t);
      break;
    case "Alternative":
      for (var n = s.value, r = 0; r < n.length; r++) {
        var i = n[r];
        switch (i.type) {
          case "EndAnchor":
          // A group back reference cannot affect potential starting char.
          // because if a back reference is the first production than automatically
          // the group being referenced has had to come BEFORE so its codes have already been added
          case "GroupBackReference":
          // assertions do not affect potential starting codes
          case "Lookahead":
          case "NegativeLookahead":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        var a = i;
        switch (a.type) {
          case "Character":
            Hn(a.value, e, t);
            break;
          case "Set":
            if (a.complement === !0)
              throw Error(Pu);
            x(a.value, function(l) {
              if (typeof l == "number")
                Hn(l, e, t);
              else {
                var c = l;
                if (t === !0)
                  for (var d = c.from; d <= c.to; d++)
                    Hn(d, e, t);
                else {
                  for (var d = c.from; d <= c.to && d < an; d++)
                    Hn(d, e, t);
                  if (c.to >= an)
                    for (var p = c.from >= an ? c.from : an, N = c.to, T = ar(p), R = ar(N), S = T; S <= R; S++)
                      e[S] = S;
                }
              }
            });
            break;
          case "Group":
            Ui(a.value, e, t);
            break;
          /* istanbul ignore next */
          default:
            throw Error("Non Exhaustive Match");
        }
        var o = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          a.type === "Group" && xi(a) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
          a.type !== "Group" && o === !1
        )
          break;
      }
      break;
    /* istanbul ignore next */
    default:
      throw Error("non exhaustive match!");
  }
  return Fe(e);
}
function Hn(s, e, t) {
  var r = ar(s);
  e[r] = r, t === !0 && Qc(s, e);
}
function Qc(s, e) {
  var t = String.fromCharCode(s), r = t.toUpperCase();
  if (r !== t) {
    var n = ar(r.charCodeAt(0));
    e[n] = n;
  } else {
    var i = t.toLowerCase();
    if (i !== t) {
      var n = ar(i.charCodeAt(0));
      e[n] = n;
    }
  }
}
function to(s, e) {
  return qr(s.value, function(t) {
    if (typeof t == "number")
      return Ee(e, t);
    var r = t;
    return qr(e, function(n) {
      return r.from <= n && n <= r.to;
    }) !== void 0;
  });
}
function xi(s) {
  return s.quantifier && s.quantifier.atLeast === 0 ? !0 : s.value ? Nt(s.value) ? ot(s.value, xi) : xi(s.value) : !1;
}
var Zc = (
  /** @class */
  (function(s) {
    jc(e, s);
    function e(t) {
      var r = s.call(this) || this;
      return r.targetCharCodes = t, r.found = !1, r;
    }
    return e.prototype.visitChildren = function(t) {
      if (this.found !== !0) {
        switch (t.type) {
          case "Lookahead":
            this.visitLookahead(t);
            return;
          case "NegativeLookahead":
            this.visitNegativeLookahead(t);
            return;
        }
        s.prototype.visitChildren.call(this, t);
      }
    }, e.prototype.visitCharacter = function(t) {
      Ee(this.targetCharCodes, t.value) && (this.found = !0);
    }, e.prototype.visitSet = function(t) {
      t.complement ? to(t, this.targetCharCodes) === void 0 && (this.found = !0) : to(t, this.targetCharCodes) !== void 0 && (this.found = !0);
    }, e;
  })(Un.BaseRegExpVisitor)
);
function ma(s, e) {
  if (e instanceof RegExp) {
    var t = Qs(e), r = new Zc(s);
    return r.visit(t), r.found;
  } else
    return qr(e, function(n) {
      return Ee(s, n.charCodeAt(0));
    }) !== void 0;
}
var Vu = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})(), bt = "PATTERN", Ar = "defaultMode", Wn = "modes", Du = typeof new RegExp("(?:)").sticky == "boolean";
function Jc(s, e) {
  e = qs(e, {
    useSticky: Du,
    debug: !1,
    safeMode: !1,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: function(y, v) {
      return v();
    }
  });
  var t = e.tracer;
  t("initCharCodeToOptimizedIndexMap", function() {
    Ad();
  });
  var r;
  t("Reject Lexer.NA", function() {
    r = Cr(s, function(y) {
      return y[bt] === He.NA;
    });
  });
  var n = !1, i;
  t("Transform Patterns", function() {
    n = !1, i = L(r, function(y) {
      var v = y[bt];
      if (zt(v)) {
        var w = v.source;
        return w.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        w !== "^" && w !== "$" && w !== "." ? w : w.length === 2 && w[0] === "\\" && // not a meta character
        !Ee([
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ], w[1]) ? w[1] : e.useSticky ? no(v) : ro(v);
      } else {
        if (or(v))
          return n = !0, { exec: v };
        if (U(v, "exec"))
          return n = !0, v;
        if (typeof v == "string") {
          if (v.length === 1)
            return v;
          var ee = v.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), Z = new RegExp(ee);
          return e.useSticky ? no(Z) : ro(Z);
        } else
          throw Error("non exhaustive match");
      }
    });
  });
  var a, o, u, l, c;
  t("misc mapping", function() {
    a = L(r, function(y) {
      return y.tokenTypeIdx;
    }), o = L(r, function(y) {
      var v = y.GROUP;
      if (v !== He.SKIPPED) {
        if (xt(v))
          return v;
        if (ht(v))
          return !1;
        throw Error("non exhaustive match");
      }
    }), u = L(r, function(y) {
      var v = y.LONGER_ALT;
      if (v) {
        var w = Gc(r, v);
        return w;
      }
    }), l = L(r, function(y) {
      return y.PUSH_MODE;
    }), c = L(r, function(y) {
      return U(y, "POP_MODE");
    });
  });
  var d;
  t("Line Terminator Handling", function() {
    var y = Gu(e.lineTerminatorCharacters);
    d = L(r, function(v) {
      return !1;
    }), e.positionTracking !== "onlyOffset" && (d = L(r, function(v) {
      if (U(v, "LINE_BREAKS"))
        return v.LINE_BREAKS;
      if (ku(v, y) === !1)
        return ma(y, v.PATTERN);
    }));
  });
  var p, N, T, R;
  t("Misc Mapping #2", function() {
    p = L(r, Bu), N = L(i, Nd), T = Oe(r, function(y, v) {
      var w = v.GROUP;
      return xt(w) && w !== He.SKIPPED && (y[w] = []), y;
    }, {}), R = L(i, function(y, v) {
      return {
        pattern: i[v],
        longerAlt: u[v],
        canLineTerminator: d[v],
        isCustom: p[v],
        short: N[v],
        group: o[v],
        push: l[v],
        pop: c[v],
        tokenTypeIdx: a[v],
        tokenType: r[v]
      };
    });
  });
  var S = !0, A = [];
  return e.safeMode || t("First Char Optimization", function() {
    A = Oe(r, function(y, v, w) {
      if (typeof v.PATTERN == "string") {
        var ee = v.PATTERN.charCodeAt(0), Z = ar(ee);
        gi(y, Z, R[w]);
      } else if (Nt(v.START_CHARS_HINT)) {
        var J;
        x(v.START_CHARS_HINT, function(me) {
          var ue = typeof me == "string" ? me.charCodeAt(0) : me, K = ar(ue);
          J !== K && (J = K, gi(y, K, R[w]));
        });
      } else if (zt(v.PATTERN))
        if (v.PATTERN.unicode)
          S = !1, e.ensureOptimizations && Fi("" + As + ("	Unable to analyze < " + v.PATTERN.toString() + ` > pattern.
`) + `	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          var ye = qc(v.PATTERN, e.ensureOptimizations);
          q(ye) && (S = !1), x(ye, function(me) {
            gi(y, me, R[w]);
          });
        }
      else
        e.ensureOptimizations && Fi("" + As + ("	TokenType: <" + v.name + `> is using a custom token pattern without providing <start_chars_hint> parameter.
`) + `	This will disable the lexer's first char optimizations.
	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), S = !1;
      return y;
    }, []);
  }), t("ArrayPacking", function() {
    A = Wc(A);
  }), {
    emptyGroups: T,
    patternIdxToConfig: R,
    charCodeToPatternIdxToConfig: A,
    hasCustom: n,
    canBeOptimized: S
  };
}
function ed(s, e) {
  var t = [], r = rd(s);
  t = t.concat(r.errors);
  var n = nd(r.valid), i = n.valid;
  return t = t.concat(n.errors), t = t.concat(td(i)), t = t.concat(cd(i)), t = t.concat(dd(i, e)), t = t.concat(fd(i)), t;
}
function td(s) {
  var e = [], t = St(s, function(r) {
    return zt(r[bt]);
  });
  return e = e.concat(id(t)), e = e.concat(ud(t)), e = e.concat(hd(t)), e = e.concat(ld(t)), e = e.concat(ad(t)), e;
}
function rd(s) {
  var e = St(s, function(n) {
    return !U(n, bt);
  }), t = L(e, function(n) {
    return {
      message: "Token Type: ->" + n.name + "<- missing static 'PATTERN' property",
      type: de.MISSING_PATTERN,
      tokenTypes: [n]
    };
  }), r = js(s, e);
  return { errors: t, valid: r };
}
function nd(s) {
  var e = St(s, function(n) {
    var i = n[bt];
    return !zt(i) && !or(i) && !U(i, "exec") && !xt(i);
  }), t = L(e, function(n) {
    return {
      message: "Token Type: ->" + n.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
      type: de.INVALID_PATTERN,
      tokenTypes: [n]
    };
  }), r = js(s, e);
  return { errors: t, valid: r };
}
var sd = /[^\\][\$]/;
function id(s) {
  var e = (
    /** @class */
    (function(n) {
      Vu(i, n);
      function i() {
        var a = n !== null && n.apply(this, arguments) || this;
        return a.found = !1, a;
      }
      return i.prototype.visitEndAnchor = function(a) {
        this.found = !0;
      }, i;
    })(Un.BaseRegExpVisitor)
  ), t = St(s, function(n) {
    var i = n[bt];
    try {
      var a = Qs(i), o = new e();
      return o.visit(a), o.found;
    } catch (u) {
      return sd.test(i.source);
    }
  }), r = L(t, function(n) {
    return {
      message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + n.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
      type: de.EOI_ANCHOR_FOUND,
      tokenTypes: [n]
    };
  });
  return r;
}
function ad(s) {
  var e = St(s, function(r) {
    var n = r[bt];
    return n.test("");
  }), t = L(e, function(r) {
    return {
      message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string",
      type: de.EMPTY_MATCH_PATTERN,
      tokenTypes: [r]
    };
  });
  return t;
}
var od = /[^\\[][\^]|^\^/;
function ud(s) {
  var e = (
    /** @class */
    (function(n) {
      Vu(i, n);
      function i() {
        var a = n !== null && n.apply(this, arguments) || this;
        return a.found = !1, a;
      }
      return i.prototype.visitStartAnchor = function(a) {
        this.found = !0;
      }, i;
    })(Un.BaseRegExpVisitor)
  ), t = St(s, function(n) {
    var i = n[bt];
    try {
      var a = Qs(i), o = new e();
      return o.visit(a), o.found;
    } catch (u) {
      return od.test(i.source);
    }
  }), r = L(t, function(n) {
    return {
      message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + n.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
      type: de.SOI_ANCHOR_FOUND,
      tokenTypes: [n]
    };
  });
  return r;
}
function hd(s) {
  var e = St(s, function(r) {
    var n = r[bt];
    return n instanceof RegExp && (n.multiline || n.global);
  }), t = L(e, function(r) {
    return {
      message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
      type: de.UNSUPPORTED_FLAGS_FOUND,
      tokenTypes: [r]
    };
  });
  return t;
}
function ld(s) {
  var e = [], t = L(s, function(i) {
    return Oe(s, function(a, o) {
      return i.PATTERN.source === o.PATTERN.source && !Ee(e, o) && o.PATTERN !== He.NA && (e.push(o), a.push(o)), a;
    }, []);
  });
  t = Fn(t);
  var r = St(t, function(i) {
    return i.length > 1;
  }), n = L(r, function(i) {
    var a = L(i, function(u) {
      return u.name;
    }), o = ut(i).PATTERN;
    return {
      message: "The same RegExp pattern ->" + o + "<-" + ("has been used in all of the following Token Types: " + a.join(", ") + " <-"),
      type: de.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: i
    };
  });
  return n;
}
function cd(s) {
  var e = St(s, function(r) {
    if (!U(r, "GROUP"))
      return !1;
    var n = r.GROUP;
    return n !== He.SKIPPED && n !== He.NA && !xt(n);
  }), t = L(e, function(r) {
    return {
      message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
      type: de.INVALID_GROUP_TYPE_FOUND,
      tokenTypes: [r]
    };
  });
  return t;
}
function dd(s, e) {
  var t = St(s, function(n) {
    return n.PUSH_MODE !== void 0 && !Ee(e, n.PUSH_MODE);
  }), r = L(t, function(n) {
    var i = "Token Type: ->" + n.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + n.PUSH_MODE + "<-which does not exist";
    return {
      message: i,
      type: de.PUSH_MODE_DOES_NOT_EXIST,
      tokenTypes: [n]
    };
  });
  return r;
}
function fd(s) {
  var e = [], t = Oe(s, function(r, n, i) {
    var a = n.PATTERN;
    return a === He.NA || (xt(a) ? r.push({ str: a, idx: i, tokenType: n }) : zt(a) && md(a) && r.push({ str: a.source, idx: i, tokenType: n })), r;
  }, []);
  return x(s, function(r, n) {
    x(t, function(i) {
      var a = i.str, o = i.idx, u = i.tokenType;
      if (n < o && pd(a, r.PATTERN)) {
        var l = "Token: ->" + u.name + `<- can never be matched.
` + ("Because it appears AFTER the Token Type ->" + r.name + "<-") + `in the lexer's definition.
See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({
          message: l,
          type: de.UNREACHABLE_PATTERN,
          tokenTypes: [r, u]
        });
      }
    });
  }), e;
}
function pd(s, e) {
  if (zt(e)) {
    var t = e.exec(s);
    return t !== null && t.index === 0;
  } else {
    if (or(e))
      return e(s, 0, [], {});
    if (U(e, "exec"))
      return e.exec(s, 0, [], {});
    if (typeof e == "string")
      return e === s;
    throw Error("non exhaustive match");
  }
}
function md(s) {
  var e = [
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ];
  return qr(e, function(t) {
    return s.source.indexOf(t) !== -1;
  }) === void 0;
}
function ro(s) {
  var e = s.ignoreCase ? "i" : "";
  return new RegExp("^(?:" + s.source + ")", e);
}
function no(s) {
  var e = s.ignoreCase ? "iy" : "y";
  return new RegExp("" + s.source, e);
}
function gd(s, e, t) {
  var r = [];
  return U(s, Ar) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Ar + `> property in its definition
`,
    type: de.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), U(s, Wn) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Wn + `> property in its definition
`,
    type: de.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), U(s, Wn) && U(s, Ar) && !U(s.modes, s.defaultMode) && r.push({
    message: "A MultiMode Lexer cannot be initialized with a " + Ar + ": <" + s.defaultMode + `>which does not exist
`,
    type: de.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), U(s, Wn) && x(s.modes, function(n, i) {
    x(n, function(a, o) {
      ht(a) && r.push({
        message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + ("<" + i + "> at index: <" + o + `>
`),
        type: de.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
      });
    });
  }), r;
}
function Ed(s, e, t) {
  var r = [], n = !1, i = Fn(We(Bc(s.modes, function(u) {
    return u;
  }))), a = Cr(i, function(u) {
    return u[bt] === He.NA;
  }), o = Gu(t);
  return e && x(a, function(u) {
    var l = ku(u, o);
    if (l !== !1) {
      var c = Sd(u, l), d = {
        message: c,
        type: l.issue,
        tokenType: u
      };
      r.push(d);
    } else
      U(u, "LINE_BREAKS") ? u.LINE_BREAKS === !0 && (n = !0) : ma(o, u.PATTERN) && (n = !0);
  }), e && !n && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: de.NO_LINE_BREAKS_FLAGS
  }), r;
}
function Rd(s) {
  var e = {}, t = $t(s);
  return x(t, function(r) {
    var n = s[r];
    if (Nt(n))
      e[r] = [];
    else
      throw Error("non exhaustive match");
  }), e;
}
function Bu(s) {
  var e = s.PATTERN;
  if (zt(e))
    return !1;
  if (or(e))
    return !0;
  if (U(e, "exec"))
    return !0;
  if (xt(e))
    return !1;
  throw Error("non exhaustive match");
}
function Nd(s) {
  return xt(s) && s.length === 1 ? s.charCodeAt(0) : !1;
}
var Td = {
  // implements /\n|\r\n?/g.test
  test: function(s) {
    for (var e = s.length, t = this.lastIndex; t < e; t++) {
      var r = s.charCodeAt(t);
      if (r === 10)
        return this.lastIndex = t + 1, !0;
      if (r === 13)
        return s.charCodeAt(t + 1) === 10 ? this.lastIndex = t + 2 : this.lastIndex = t + 1, !0;
    }
    return !1;
  },
  lastIndex: 0
};
function ku(s, e) {
  if (U(s, "LINE_BREAKS"))
    return !1;
  if (zt(s.PATTERN)) {
    try {
      ma(e, s.PATTERN);
    } catch (t) {
      return {
        issue: de.IDENTIFY_TERMINATOR,
        errMsg: t.message
      };
    }
    return !1;
  } else {
    if (xt(s.PATTERN))
      return !1;
    if (Bu(s))
      return { issue: de.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function Sd(s, e) {
  if (e.issue === de.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
` + ("	The problem is in the <" + s.name + `> Token Type
`) + ("	 Root cause: " + e.errMsg + `.
`) + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
  if (e.issue === de.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
` + ("	The problem is in the <" + s.name + `> Token Type
`) + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
  throw Error("non exhaustive match");
}
function Gu(s) {
  var e = L(s, function(t) {
    return xt(t) && t.length > 0 ? t.charCodeAt(0) : t;
  });
  return e;
}
function gi(s, e, t) {
  s[e] === void 0 ? s[e] = [t] : s[e].push(t);
}
var an = 256;
function ar(s) {
  return s < an ? s : us[s];
}
var us = [];
function Ad() {
  if (q(us)) {
    us = new Array(65536);
    for (var s = 0; s < 65536; s++)
      us[s] = s > 255 ? 255 + ~~(s / 255) : s;
  }
}
function Zs(s, e) {
  var t = s.tokenTypeIdx;
  return t === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[t] === !0;
}
function ys(s, e) {
  return s.tokenTypeIdx === e.tokenTypeIdx;
}
var so = 1, Hu = {};
function xn(s) {
  var e = yd(s);
  vd(e), Id(e), Cd(e), x(e, function(t) {
    t.isParent = t.categoryMatches.length > 0;
  });
}
function yd(s) {
  for (var e = Ye(s), t = s, r = !0; r; ) {
    t = Fn(We(L(t, function(i) {
      return i.CATEGORIES;
    })));
    var n = js(t, e);
    e = e.concat(n), q(n) ? r = !1 : t = n;
  }
  return e;
}
function vd(s) {
  x(s, function(e) {
    Yu(e) || (Hu[so] = e, e.tokenTypeIdx = so++), io(e) && !Nt(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), io(e) || (e.CATEGORIES = []), Od(e) || (e.categoryMatches = []), Md(e) || (e.categoryMatchesMap = {});
  });
}
function Cd(s) {
  x(s, function(e) {
    e.categoryMatches = [], x(e.categoryMatchesMap, function(t, r) {
      e.categoryMatches.push(Hu[r].tokenTypeIdx);
    });
  });
}
function Id(s) {
  x(s, function(e) {
    Wu([], e);
  });
}
function Wu(s, e) {
  x(s, function(t) {
    e.categoryMatchesMap[t.tokenTypeIdx] = !0;
  }), x(e.CATEGORIES, function(t) {
    var r = s.concat(e);
    Ee(r, t) || Wu(r, t);
  });
}
function Yu(s) {
  return U(s, "tokenTypeIdx");
}
function io(s) {
  return U(s, "CATEGORIES");
}
function Od(s) {
  return U(s, "categoryMatches");
}
function Md(s) {
  return U(s, "categoryMatchesMap");
}
function wd(s) {
  return U(s, "tokenTypeIdx");
}
var _d = {
  buildUnableToPopLexerModeMessage: function(s) {
    return "Unable to pop Lexer Mode after encountering Token ->" + s.image + "<- The Mode Stack is empty";
  },
  buildUnexpectedCharactersMessage: function(s, e, t, r, n) {
    return "unexpected character: ->" + s.charAt(e) + "<- at offset: " + e + "," + (" skipped " + t + " characters.");
  }
}, de;
(function(s) {
  s[s.MISSING_PATTERN = 0] = "MISSING_PATTERN", s[s.INVALID_PATTERN = 1] = "INVALID_PATTERN", s[s.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", s[s.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", s[s.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", s[s.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", s[s.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", s[s.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", s[s.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", s[s.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", s[s.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", s[s.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", s[s.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", s[s.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", s[s.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", s[s.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", s[s.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK";
})(de || (de = {}));
var on = {
  deferDefinitionErrorsHandling: !1,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: !1,
  safeMode: !1,
  errorMessageProvider: _d,
  traceInitPerf: !1,
  skipValidations: !1
};
Object.freeze(on);
var He = (
  /** @class */
  (function() {
    function s(e, t) {
      var r = this;
      if (t === void 0 && (t = on), this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.config = void 0, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, typeof t == "boolean")
        throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
      this.config = Qa(on, t);
      var n = this.config.traceInitPerf;
      n === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof n == "number" && (this.traceInitMaxIdent = n, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", function() {
        var i, a = !0;
        r.TRACE_INIT("Lexer Config handling", function() {
          if (r.config.lineTerminatorsPattern === on.lineTerminatorsPattern)
            r.config.lineTerminatorsPattern = Td;
          else if (r.config.lineTerminatorCharacters === on.lineTerminatorCharacters)
            throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
          if (t.safeMode && t.ensureOptimizations)
            throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
          r.trackStartLines = /full|onlyStart/i.test(r.config.positionTracking), r.trackEndLines = /full/i.test(r.config.positionTracking), Nt(e) ? (i = { modes: {} }, i.modes[Ar] = Ye(e), i[Ar] = Ar) : (a = !1, i = Ln(e));
        }), r.config.skipValidations === !1 && (r.TRACE_INIT("performRuntimeChecks", function() {
          r.lexerDefinitionErrors = r.lexerDefinitionErrors.concat(gd(i, r.trackStartLines, r.config.lineTerminatorCharacters));
        }), r.TRACE_INIT("performWarningRuntimeChecks", function() {
          r.lexerDefinitionWarning = r.lexerDefinitionWarning.concat(Ed(i, r.trackStartLines, r.config.lineTerminatorCharacters));
        })), i.modes = i.modes ? i.modes : {}, x(i.modes, function(c, d) {
          i.modes[d] = Cr(c, function(p) {
            return ht(p);
          });
        });
        var o = $t(i.modes);
        if (x(i.modes, function(c, d) {
          r.TRACE_INIT("Mode: <" + d + "> processing", function() {
            if (r.modes.push(d), r.config.skipValidations === !1 && r.TRACE_INIT("validatePatterns", function() {
              r.lexerDefinitionErrors = r.lexerDefinitionErrors.concat(ed(c, o));
            }), q(r.lexerDefinitionErrors)) {
              xn(c);
              var p;
              r.TRACE_INIT("analyzeTokenTypes", function() {
                p = Jc(c, {
                  lineTerminatorCharacters: r.config.lineTerminatorCharacters,
                  positionTracking: t.positionTracking,
                  ensureOptimizations: t.ensureOptimizations,
                  safeMode: t.safeMode,
                  tracer: r.TRACE_INIT.bind(r)
                });
              }), r.patternIdxToConfig[d] = p.patternIdxToConfig, r.charCodeToPatternIdxToConfig[d] = p.charCodeToPatternIdxToConfig, r.emptyGroups = Qa(r.emptyGroups, p.emptyGroups), r.hasCustom = p.hasCustom || r.hasCustom, r.canModeBeOptimized[d] = p.canBeOptimized;
            }
          });
        }), r.defaultMode = i.defaultMode, !q(r.lexerDefinitionErrors) && !r.config.deferDefinitionErrorsHandling) {
          var u = L(r.lexerDefinitionErrors, function(c) {
            return c.message;
          }), l = u.join(`-----------------------
`);
          throw new Error(`Errors detected in definition of Lexer:
` + l);
        }
        x(r.lexerDefinitionWarning, function(c) {
          pa(c.message);
        }), r.TRACE_INIT("Choosing sub-methods implementations", function() {
          if (Du ? (r.chopInput = Za, r.match = r.matchWithTest) : (r.updateLastIndex = Re, r.match = r.matchWithExec), a && (r.handleModes = Re), r.trackStartLines === !1 && (r.computeNewColumn = Za), r.trackEndLines === !1 && (r.updateTokenEndLineColumnLocation = Re), /full/i.test(r.config.positionTracking))
            r.createTokenInstance = r.createFullToken;
          else if (/onlyStart/i.test(r.config.positionTracking))
            r.createTokenInstance = r.createStartOnlyToken;
          else if (/onlyOffset/i.test(r.config.positionTracking))
            r.createTokenInstance = r.createOffsetOnlyToken;
          else
            throw Error('Invalid <positionTracking> config option: "' + r.config.positionTracking + '"');
          r.hasCustom ? (r.addToken = r.addTokenUsingPush, r.handlePayload = r.handlePayloadWithCustom) : (r.addToken = r.addTokenUsingMemberAccess, r.handlePayload = r.handlePayloadNoCustom);
        }), r.TRACE_INIT("Failed Optimization Warnings", function() {
          var c = Oe(r.canModeBeOptimized, function(d, p, N) {
            return p === !1 && d.push(N), d;
          }, []);
          if (t.ensureOptimizations && !q(c))
            throw Error("Lexer Modes: < " + c.join(", ") + ` > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
        }), r.TRACE_INIT("clearRegExpParserCache", function() {
          Kc();
        }), r.TRACE_INIT("toFastProperties", function() {
          xu(r);
        });
      });
    }
    return s.prototype.tokenize = function(e, t) {
      if (t === void 0 && (t = this.defaultMode), !q(this.lexerDefinitionErrors)) {
        var r = L(this.lexerDefinitionErrors, function(a) {
          return a.message;
        }), n = r.join(`-----------------------
`);
        throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + n);
      }
      var i = this.tokenizeInternal(e, t);
      return i;
    }, s.prototype.tokenizeInternal = function(e, t) {
      var r = this, n, i, a, o, u, l, c, d, p, N, T, R, S, A, y = e, v = y.length, w = 0, ee = 0, Z = this.hasCustom ? 0 : Math.floor(e.length / 10), J = new Array(Z), ye = [], me = this.trackStartLines ? 1 : void 0, ue = this.trackStartLines ? 1 : void 0, K = Rd(this.emptyGroups), yt = this.trackStartLines, Xe = this.config.lineTerminatorsPattern, vt = 0, tt = [], cr = [], _r = [], Pn = [];
      Object.freeze(Pn);
      var dr = void 0;
      function Vn() {
        return tt;
      }
      function Dn(Ue) {
        var nn = ar(Ue), Lr = cr[nn];
        return Lr === void 0 ? Pn : Lr;
      }
      var ui = function(Ue) {
        if (_r.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
        // So no error should occur.
        Ue.tokenType.PUSH_MODE === void 0) {
          var nn = r.config.errorMessageProvider.buildUnableToPopLexerModeMessage(Ue);
          ye.push({
            offset: Ue.startOffset,
            line: Ue.startLine !== void 0 ? Ue.startLine : void 0,
            column: Ue.startColumn !== void 0 ? Ue.startColumn : void 0,
            length: Ue.image.length,
            message: nn
          });
        } else {
          _r.pop();
          var Lr = Lu(_r);
          tt = r.patternIdxToConfig[Lr], cr = r.charCodeToPatternIdxToConfig[Lr], vt = tt.length;
          var Ic = r.canModeBeOptimized[Lr] && r.config.safeMode === !1;
          cr && Ic ? dr = Dn : dr = Vn;
        }
      };
      function Bn(Ue) {
        _r.push(Ue), cr = this.charCodeToPatternIdxToConfig[Ue], tt = this.patternIdxToConfig[Ue], vt = tt.length, vt = tt.length;
        var nn = this.canModeBeOptimized[Ue] && this.config.safeMode === !1;
        cr && nn ? dr = Dn : dr = Vn;
      }
      Bn.call(this, t);
      for (var $e; w < v; ) {
        u = null;
        var kn = y.charCodeAt(w), Xa = dr(kn), Cc = Xa.length;
        for (n = 0; n < Cc; n++) {
          $e = Xa[n];
          var jt = $e.pattern;
          l = null;
          var tn = $e.short;
          if (tn !== !1 ? kn === tn && (u = jt) : $e.isCustom === !0 ? (A = jt.exec(y, w, J, K), A !== null ? (u = A[0], A.payload !== void 0 && (l = A.payload)) : u = null) : (this.updateLastIndex(jt, w), u = this.match(jt, e, w)), u !== null) {
            if (o = $e.longerAlt, o !== void 0) {
              var hi = tt[o], li = hi.pattern;
              c = null, hi.isCustom === !0 ? (A = li.exec(y, w, J, K), A !== null ? (a = A[0], A.payload !== void 0 && (c = A.payload)) : a = null) : (this.updateLastIndex(li, w), a = this.match(li, e, w)), a && a.length > u.length && (u = a, l = c, $e = hi);
            }
            break;
          }
        }
        if (u !== null) {
          if (d = u.length, p = $e.group, p !== void 0 && (N = $e.tokenTypeIdx, T = this.createTokenInstance(u, w, N, $e.tokenType, me, ue, d), this.handlePayload(T, l), p === !1 ? ee = this.addToken(J, ee, T) : K[p].push(T)), e = this.chopInput(e, d), w = w + d, ue = this.computeNewColumn(ue, d), yt === !0 && $e.canLineTerminator === !0) {
            var Gn = 0, ci = void 0, di = void 0;
            Xe.lastIndex = 0;
            do
              ci = Xe.test(u), ci === !0 && (di = Xe.lastIndex - 1, Gn++);
            while (ci === !0);
            Gn !== 0 && (me = me + Gn, ue = d - di, this.updateTokenEndLineColumnLocation(T, p, di, Gn, me, ue, d));
          }
          this.handleModes($e, ui, Bn, T);
        } else {
          for (var fi = w, $a = me, Ka = ue, rn = !1; !rn && w < v; )
            for (y.charCodeAt(w), e = this.chopInput(e, 1), w++, i = 0; i < vt; i++) {
              var pi = tt[i], jt = pi.pattern, tn = pi.short;
              if (tn !== !1 ? y.charCodeAt(w) === tn && (rn = !0) : pi.isCustom === !0 ? rn = jt.exec(y, w, J, K) !== null : (this.updateLastIndex(jt, w), rn = jt.exec(e) !== null), rn === !0)
                break;
            }
          R = w - fi, S = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y, fi, R, $a, Ka), ye.push({
            offset: fi,
            line: $a,
            column: Ka,
            length: R,
            message: S
          });
        }
      }
      return this.hasCustom || (J.length = ee), {
        tokens: J,
        groups: K,
        errors: ye
      };
    }, s.prototype.handleModes = function(e, t, r, n) {
      if (e.pop === !0) {
        var i = e.push;
        t(n), i !== void 0 && r.call(this, i);
      } else e.push !== void 0 && r.call(this, e.push);
    }, s.prototype.chopInput = function(e, t) {
      return e.substring(t);
    }, s.prototype.updateLastIndex = function(e, t) {
      e.lastIndex = t;
    }, s.prototype.updateTokenEndLineColumnLocation = function(e, t, r, n, i, a, o) {
      var u, l;
      t !== void 0 && (u = r === o - 1, l = u ? -1 : 0, n === 1 && u === !0 || (e.endLine = i + l, e.endColumn = a - 1 + -l));
    }, s.prototype.computeNewColumn = function(e, t) {
      return e + t;
    }, s.prototype.createTokenInstance = function() {
      return null;
    }, s.prototype.createOffsetOnlyToken = function(e, t, r, n) {
      return {
        image: e,
        startOffset: t,
        tokenTypeIdx: r,
        tokenType: n
      };
    }, s.prototype.createStartOnlyToken = function(e, t, r, n, i, a) {
      return {
        image: e,
        startOffset: t,
        startLine: i,
        startColumn: a,
        tokenTypeIdx: r,
        tokenType: n
      };
    }, s.prototype.createFullToken = function(e, t, r, n, i, a, o) {
      return {
        image: e,
        startOffset: t,
        endOffset: t + o - 1,
        startLine: i,
        endLine: i,
        startColumn: a,
        endColumn: a + o - 1,
        tokenTypeIdx: r,
        tokenType: n
      };
    }, s.prototype.addToken = function(e, t, r) {
      return 666;
    }, s.prototype.addTokenUsingPush = function(e, t, r) {
      return e.push(r), t;
    }, s.prototype.addTokenUsingMemberAccess = function(e, t, r) {
      return e[t] = r, t++, t;
    }, s.prototype.handlePayload = function(e, t) {
    }, s.prototype.handlePayloadNoCustom = function(e, t) {
    }, s.prototype.handlePayloadWithCustom = function(e, t) {
      t !== null && (e.payload = t);
    }, s.prototype.match = function(e, t, r) {
      return null;
    }, s.prototype.matchWithTest = function(e, t, r) {
      var n = e.test(t);
      return n === !0 ? t.substring(r, e.lastIndex) : null;
    }, s.prototype.matchWithExec = function(e, t) {
      var r = e.exec(t);
      return r !== null ? r[0] : r;
    }, s.prototype.TRACE_INIT = function(e, t) {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        var r = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(r + "--> <" + e + ">");
        var n = bu(t), i = n.time, a = n.value, o = i > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && o(r + "<-- <" + e + "> time: " + i + "ms"), this.traceInitIndent--, a;
      } else
        return t();
    }, s.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.", s.NA = /NOT_APPLICABLE/, s;
  })()
);
function Yr(s) {
  return zu(s) ? s.LABEL : s.name;
}
function zu(s) {
  return xt(s.LABEL) && s.LABEL !== "";
}
var Ld = "parent", ao = "categories", oo = "label", uo = "group", ho = "push_mode", lo = "pop_mode", co = "longer_alt", fo = "line_breaks", po = "start_chars_hint";
function H(s) {
  return Fd(s);
}
function Fd(s) {
  var e = s.pattern, t = {};
  if (t.name = s.name, ht(e) || (t.PATTERN = e), U(s, Ld))
    throw `The parent property is no longer supported.
See: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return U(s, ao) && (t.CATEGORIES = s[ao]), xn([t]), U(s, oo) && (t.LABEL = s[oo]), U(s, uo) && (t.GROUP = s[uo]), U(s, lo) && (t.POP_MODE = s[lo]), U(s, ho) && (t.PUSH_MODE = s[ho]), U(s, co) && (t.LONGER_ALT = s[co]), U(s, fo) && (t.LINE_BREAKS = s[fo]), U(s, po) && (t.START_CHARS_HINT = s[po]), t;
}
var Ir = H({ name: "EOF", pattern: He.NA });
xn([Ir]);
function ga(s, e, t, r, n, i, a, o) {
  return {
    image: e,
    startOffset: t,
    endOffset: r,
    startLine: n,
    endLine: i,
    startColumn: a,
    endColumn: o,
    tokenTypeIdx: s.tokenTypeIdx,
    tokenType: s
  };
}
function $(s, e) {
  return Zs(s, e);
}
var Kt = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})(), Pt = (
  /** @class */
  (function() {
    function s(e) {
      this.definition = e;
    }
    return s.prototype.accept = function(e) {
      e.visit(this), x(this.definition, function(t) {
        t.accept(e);
      });
    }, s;
  })()
), Ze = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, []) || this;
      return r.idx = 1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return Object.defineProperty(e.prototype, "definition", {
      get: function() {
        return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
      },
      set: function(t) {
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.accept = function(t) {
      t.visit(this);
    }, e;
  })(Pt)
), en = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.orgText = "", At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), ze = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.ignoreAmbiguities = !1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), Ie = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.idx = 1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), lt = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.idx = 1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), ct = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.idx = 1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), ce = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.idx = 1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), Je = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.idx = 1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), et = (
  /** @class */
  (function(s) {
    Kt(e, s);
    function e(t) {
      var r = s.call(this, t.definition) || this;
      return r.idx = 1, r.ignoreAmbiguities = !1, r.hasPredicates = !1, At(r, dt(t, function(n) {
        return n !== void 0;
      })), r;
    }
    return e;
  })(Pt)
), se = (
  /** @class */
  (function() {
    function s(e) {
      this.idx = 1, At(this, dt(e, function(t) {
        return t !== void 0;
      }));
    }
    return s.prototype.accept = function(e) {
      e.visit(this);
    }, s;
  })()
);
function Ud(s) {
  return L(s, hs);
}
function hs(s) {
  function e(n) {
    return L(n, hs);
  }
  if (s instanceof Ze)
    return {
      type: "NonTerminal",
      name: s.nonTerminalName,
      idx: s.idx
    };
  if (s instanceof ze)
    return {
      type: "Flat",
      definition: e(s.definition)
    };
  if (s instanceof Ie)
    return {
      type: "Option",
      idx: s.idx,
      definition: e(s.definition)
    };
  if (s instanceof lt)
    return {
      type: "RepetitionMandatory",
      name: s.name,
      idx: s.idx,
      definition: e(s.definition)
    };
  if (s instanceof ct)
    return {
      type: "RepetitionMandatoryWithSeparator",
      name: s.name,
      idx: s.idx,
      separator: hs(new se({ terminalType: s.separator })),
      definition: e(s.definition)
    };
  if (s instanceof Je)
    return {
      type: "RepetitionWithSeparator",
      name: s.name,
      idx: s.idx,
      separator: hs(new se({ terminalType: s.separator })),
      definition: e(s.definition)
    };
  if (s instanceof ce)
    return {
      type: "Repetition",
      name: s.name,
      idx: s.idx,
      definition: e(s.definition)
    };
  if (s instanceof et)
    return {
      type: "Alternation",
      name: s.name,
      idx: s.idx,
      definition: e(s.definition)
    };
  if (s instanceof se) {
    var t = {
      type: "Terminal",
      name: s.terminalType.name,
      label: Yr(s.terminalType),
      idx: s.idx
    }, r = s.terminalType.PATTERN;
    return s.terminalType.PATTERN && (t.pattern = zt(r) ? r.source : r), t;
  } else {
    if (s instanceof en)
      return {
        type: "Rule",
        name: s.name,
        orgText: s.orgText,
        definition: e(s.definition)
      };
    throw Error("non exhaustive match");
  }
}
var Js = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.walk = function(e, t) {
      var r = this;
      t === void 0 && (t = []), x(e.definition, function(n, i) {
        var a = Ce(e.definition, i + 1);
        if (n instanceof Ze)
          r.walkProdRef(n, a, t);
        else if (n instanceof se)
          r.walkTerminal(n, a, t);
        else if (n instanceof ze)
          r.walkFlat(n, a, t);
        else if (n instanceof Ie)
          r.walkOption(n, a, t);
        else if (n instanceof lt)
          r.walkAtLeastOne(n, a, t);
        else if (n instanceof ct)
          r.walkAtLeastOneSep(n, a, t);
        else if (n instanceof Je)
          r.walkManySep(n, a, t);
        else if (n instanceof ce)
          r.walkMany(n, a, t);
        else if (n instanceof et)
          r.walkOr(n, a, t);
        else
          throw Error("non exhaustive match");
      });
    }, s.prototype.walkTerminal = function(e, t, r) {
    }, s.prototype.walkProdRef = function(e, t, r) {
    }, s.prototype.walkFlat = function(e, t, r) {
      var n = t.concat(r);
      this.walk(e, n);
    }, s.prototype.walkOption = function(e, t, r) {
      var n = t.concat(r);
      this.walk(e, n);
    }, s.prototype.walkAtLeastOne = function(e, t, r) {
      var n = [
        new Ie({ definition: e.definition })
      ].concat(t, r);
      this.walk(e, n);
    }, s.prototype.walkAtLeastOneSep = function(e, t, r) {
      var n = mo(e, t, r);
      this.walk(e, n);
    }, s.prototype.walkMany = function(e, t, r) {
      var n = [
        new Ie({ definition: e.definition })
      ].concat(t, r);
      this.walk(e, n);
    }, s.prototype.walkManySep = function(e, t, r) {
      var n = mo(e, t, r);
      this.walk(e, n);
    }, s.prototype.walkOr = function(e, t, r) {
      var n = this, i = t.concat(r);
      x(e.definition, function(a) {
        var o = new ze({ definition: [a] });
        n.walk(o, i);
      });
    }, s;
  })()
);
function mo(s, e, t) {
  var r = [
    new Ie({
      definition: [
        new se({ terminalType: s.separator })
      ].concat(s.definition)
    })
  ], n = r.concat(e, t);
  return n;
}
var Mr = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.visit = function(e) {
      var t = e;
      switch (t.constructor) {
        case Ze:
          return this.visitNonTerminal(t);
        case ze:
          return this.visitFlat(t);
        case Ie:
          return this.visitOption(t);
        case lt:
          return this.visitRepetitionMandatory(t);
        case ct:
          return this.visitRepetitionMandatoryWithSeparator(t);
        case Je:
          return this.visitRepetitionWithSeparator(t);
        case ce:
          return this.visitRepetition(t);
        case et:
          return this.visitAlternation(t);
        case se:
          return this.visitTerminal(t);
        case en:
          return this.visitRule(t);
        /* istanbul ignore next */
        default:
          throw Error("non exhaustive match");
      }
    }, s.prototype.visitNonTerminal = function(e) {
    }, s.prototype.visitFlat = function(e) {
    }, s.prototype.visitOption = function(e) {
    }, s.prototype.visitRepetition = function(e) {
    }, s.prototype.visitRepetitionMandatory = function(e) {
    }, s.prototype.visitRepetitionMandatoryWithSeparator = function(e) {
    }, s.prototype.visitRepetitionWithSeparator = function(e) {
    }, s.prototype.visitAlternation = function(e) {
    }, s.prototype.visitTerminal = function(e) {
    }, s.prototype.visitRule = function(e) {
    }, s;
  })()
), xd = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})();
function bd(s) {
  return s instanceof ze || s instanceof Ie || s instanceof ce || s instanceof lt || s instanceof ct || s instanceof Je || s instanceof se || s instanceof en;
}
function vs(s, e) {
  e === void 0 && (e = []);
  var t = s instanceof Ie || s instanceof ce || s instanceof Je;
  return t ? !0 : s instanceof et ? Fu(s.definition, function(r) {
    return vs(r, e);
  }) : s instanceof Ze && Ee(e, s) ? !1 : s instanceof Pt ? (s instanceof Ze && e.push(s), ot(s.definition, function(r) {
    return vs(r, e);
  })) : !1;
}
function Pd(s) {
  return s instanceof et;
}
function gt(s) {
  if (s instanceof Ze)
    return "SUBRULE";
  if (s instanceof Ie)
    return "OPTION";
  if (s instanceof et)
    return "OR";
  if (s instanceof lt)
    return "AT_LEAST_ONE";
  if (s instanceof ct)
    return "AT_LEAST_ONE_SEP";
  if (s instanceof Je)
    return "MANY_SEP";
  if (s instanceof ce)
    return "MANY";
  if (s instanceof se)
    return "CONSUME";
  throw Error("non exhaustive match");
}
var Vd = (
  /** @class */
  (function(s) {
    xd(e, s);
    function e() {
      var t = s !== null && s.apply(this, arguments) || this;
      return t.separator = "-", t.dslMethods = {
        option: [],
        alternation: [],
        repetition: [],
        repetitionWithSeparator: [],
        repetitionMandatory: [],
        repetitionMandatoryWithSeparator: []
      }, t;
    }
    return e.prototype.reset = function() {
      this.dslMethods = {
        option: [],
        alternation: [],
        repetition: [],
        repetitionWithSeparator: [],
        repetitionMandatory: [],
        repetitionMandatoryWithSeparator: []
      };
    }, e.prototype.visitTerminal = function(t) {
      var r = t.terminalType.name + this.separator + "Terminal";
      U(this.dslMethods, r) || (this.dslMethods[r] = []), this.dslMethods[r].push(t);
    }, e.prototype.visitNonTerminal = function(t) {
      var r = t.nonTerminalName + this.separator + "Terminal";
      U(this.dslMethods, r) || (this.dslMethods[r] = []), this.dslMethods[r].push(t);
    }, e.prototype.visitOption = function(t) {
      this.dslMethods.option.push(t);
    }, e.prototype.visitRepetitionWithSeparator = function(t) {
      this.dslMethods.repetitionWithSeparator.push(t);
    }, e.prototype.visitRepetitionMandatory = function(t) {
      this.dslMethods.repetitionMandatory.push(t);
    }, e.prototype.visitRepetitionMandatoryWithSeparator = function(t) {
      this.dslMethods.repetitionMandatoryWithSeparator.push(t);
    }, e.prototype.visitRepetition = function(t) {
      this.dslMethods.repetition.push(t);
    }, e.prototype.visitAlternation = function(t) {
      this.dslMethods.alternation.push(t);
    }, e;
  })(Mr)
), Yn = new Vd();
function Dd(s) {
  Yn.reset(), s.accept(Yn);
  var e = Yn.dslMethods;
  return Yn.reset(), e;
}
function bn(s) {
  if (s instanceof Ze)
    return bn(s.referencedRule);
  if (s instanceof se)
    return Gd(s);
  if (bd(s))
    return Bd(s);
  if (Pd(s))
    return kd(s);
  throw Error("non exhaustive match");
}
function Bd(s) {
  for (var e = [], t = s.definition, r = 0, n = t.length > r, i, a = !0; n && a; )
    i = t[r], a = vs(i), e = e.concat(bn(i)), r = r + 1, n = t.length > r;
  return da(e);
}
function kd(s) {
  var e = L(s.definition, function(t) {
    return bn(t);
  });
  return da(We(e));
}
function Gd(s) {
  return [s.terminalType];
}
var Xu = "_~IN~_", Hd = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})(), Wd = (
  /** @class */
  (function(s) {
    Hd(e, s);
    function e(t) {
      var r = s.call(this) || this;
      return r.topProd = t, r.follows = {}, r;
    }
    return e.prototype.startWalking = function() {
      return this.walk(this.topProd), this.follows;
    }, e.prototype.walkTerminal = function(t, r, n) {
    }, e.prototype.walkProdRef = function(t, r, n) {
      var i = zd(t.referencedRule, t.idx) + this.topProd.name, a = r.concat(n), o = new ze({ definition: a }), u = bn(o);
      this.follows[i] = u;
    }, e;
  })(Js)
);
function Yd(s) {
  var e = {};
  return x(s, function(t) {
    var r = new Wd(t).startWalking();
    At(e, r);
  }), e;
}
function zd(s, e) {
  return s.name + e + Xu;
}
var Xd = 4, ur = 8, $d = 8, zr = 1 << ur, Cs = 2 << ur, cn = 3 << ur, dn = 4 << ur, fn = 5 << ur, kr = 6 << ur;
function pn(s, e, t) {
  return t | e | s;
}
var Kd = 32 - $d;
function $u(s, e, t, r) {
  var n = r + 1 << Kd;
  return pn(s, e, t) | n;
}
var jd = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})();
function go(s, e) {
  isNaN(s.startOffset) === !0 ? (s.startOffset = e.startOffset, s.endOffset = e.endOffset) : s.endOffset < e.endOffset && (s.endOffset = e.endOffset);
}
function Eo(s, e) {
  isNaN(s.startOffset) === !0 ? (s.startOffset = e.startOffset, s.startColumn = e.startColumn, s.startLine = e.startLine, s.endOffset = e.endOffset, s.endColumn = e.endColumn, s.endLine = e.endLine) : s.endOffset < e.endOffset && (s.endOffset = e.endOffset, s.endColumn = e.endColumn, s.endLine = e.endLine);
}
function qd(s, e, t) {
  s.children[t] === void 0 ? s.children[t] = [e] : s.children[t].push(e);
}
function Ro(s, e, t) {
  s.children[e] === void 0 ? s.children[e] = [t] : s.children[e].push(t);
}
var Ea = (
  /** @class */
  (function(s) {
    jd(e, s);
    function e(t) {
      var r = s.call(this) || this;
      return r.result = [], r.ruleIdx = t, r;
    }
    return e.prototype.collectNamedDSLMethod = function(t, r, n) {
      if (!ht(t.name)) {
        var i = void 0;
        if (t instanceof Ie || t instanceof ce || t instanceof lt || t instanceof et)
          i = new r({
            definition: t.definition,
            idx: t.idx
          });
        else if (t instanceof ct || t instanceof Je)
          i = new r({
            definition: t.definition,
            idx: t.idx,
            separator: t.separator
          });
        else
          throw Error("non exhaustive match");
        var a = [i], o = pn(this.ruleIdx, n, t.idx);
        this.result.push({ def: a, key: o, name: t.name, orgProd: t });
      }
    }, e.prototype.visitOption = function(t) {
      this.collectNamedDSLMethod(t, Ie, Cs);
    }, e.prototype.visitRepetition = function(t) {
      this.collectNamedDSLMethod(t, ce, cn);
    }, e.prototype.visitRepetitionMandatory = function(t) {
      this.collectNamedDSLMethod(t, lt, dn);
    }, e.prototype.visitRepetitionMandatoryWithSeparator = function(t) {
      this.collectNamedDSLMethod(t, ct, kr);
    }, e.prototype.visitRepetitionWithSeparator = function(t) {
      this.collectNamedDSLMethod(t, Je, fn);
    }, e.prototype.visitAlternation = function(t) {
      var r = this;
      this.collectNamedDSLMethod(t, et, zr);
      var n = t.definition.length > 1;
      x(t.definition, function(i, a) {
        if (!ht(i.name)) {
          var o = i.definition;
          n ? o = [new Ie({ definition: i.definition })] : o = i.definition;
          var u = $u(r.ruleIdx, zr, t.idx, a);
          r.result.push({
            def: o,
            key: u,
            name: i.name,
            orgProd: i
          });
        }
      });
    }, e;
  })(Mr)
);
function Qd(s, e) {
  var t = {
    allRuleNames: []
  };
  return x(s, function(r) {
    var n = e[r.name];
    t.allRuleNames.push(r.name);
    var i = new Ea(n);
    r.accept(i), x(i.result, function(a) {
      a.def, a.key;
      var o = a.name;
      t.allRuleNames.push(r.name + o);
    });
  }), t;
}
var wr = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})(), Zd = (
  /** @class */
  (function(s) {
    wr(e, s);
    function e(t, r) {
      var n = s.call(this) || this;
      return n.topProd = t, n.path = r, n.possibleTokTypes = [], n.nextProductionName = "", n.nextProductionOccurrence = 0, n.found = !1, n.isAtEndOfPath = !1, n;
    }
    return e.prototype.startWalking = function() {
      if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name)
        throw Error("The path does not start with the walker's top Rule!");
      return this.ruleStack = Ye(this.path.ruleStack).reverse(), this.occurrenceStack = Ye(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
    }, e.prototype.walk = function(t, r) {
      r === void 0 && (r = []), this.found || s.prototype.walk.call(this, t, r);
    }, e.prototype.walkProdRef = function(t, r, n) {
      if (t.referencedRule.name === this.nextProductionName && t.idx === this.nextProductionOccurrence) {
        var i = r.concat(n);
        this.updateExpectedNext(), this.walk(t.referencedRule, i);
      }
    }, e.prototype.updateExpectedNext = function() {
      q(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
    }, e;
  })(Js)
), Jd = (
  /** @class */
  (function(s) {
    wr(e, s);
    function e(t, r) {
      var n = s.call(this, t, r) || this;
      return n.path = r, n.nextTerminalName = "", n.nextTerminalOccurrence = 0, n.nextTerminalName = n.path.lastTok.name, n.nextTerminalOccurrence = n.path.lastTokOccurrence, n;
    }
    return e.prototype.walkTerminal = function(t, r, n) {
      if (this.isAtEndOfPath && t.terminalType.name === this.nextTerminalName && t.idx === this.nextTerminalOccurrence && !this.found) {
        var i = r.concat(n), a = new ze({ definition: i });
        this.possibleTokTypes = bn(a), this.found = !0;
      }
    }, e;
  })(Zd)
), ei = (
  /** @class */
  (function(s) {
    wr(e, s);
    function e(t, r) {
      var n = s.call(this) || this;
      return n.topRule = t, n.occurrence = r, n.result = {
        token: void 0,
        occurrence: void 0,
        isEndOfRule: void 0
      }, n;
    }
    return e.prototype.startWalking = function() {
      return this.walk(this.topRule), this.result;
    }, e;
  })(Js)
), ef = (
  /** @class */
  (function(s) {
    wr(e, s);
    function e() {
      return s !== null && s.apply(this, arguments) || this;
    }
    return e.prototype.walkMany = function(t, r, n) {
      if (t.idx === this.occurrence) {
        var i = ut(r.concat(n));
        this.result.isEndOfRule = i === void 0, i instanceof se && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
      } else
        s.prototype.walkMany.call(this, t, r, n);
    }, e;
  })(ei)
), No = (
  /** @class */
  (function(s) {
    wr(e, s);
    function e() {
      return s !== null && s.apply(this, arguments) || this;
    }
    return e.prototype.walkManySep = function(t, r, n) {
      if (t.idx === this.occurrence) {
        var i = ut(r.concat(n));
        this.result.isEndOfRule = i === void 0, i instanceof se && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
      } else
        s.prototype.walkManySep.call(this, t, r, n);
    }, e;
  })(ei)
), tf = (
  /** @class */
  (function(s) {
    wr(e, s);
    function e() {
      return s !== null && s.apply(this, arguments) || this;
    }
    return e.prototype.walkAtLeastOne = function(t, r, n) {
      if (t.idx === this.occurrence) {
        var i = ut(r.concat(n));
        this.result.isEndOfRule = i === void 0, i instanceof se && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
      } else
        s.prototype.walkAtLeastOne.call(this, t, r, n);
    }, e;
  })(ei)
), To = (
  /** @class */
  (function(s) {
    wr(e, s);
    function e() {
      return s !== null && s.apply(this, arguments) || this;
    }
    return e.prototype.walkAtLeastOneSep = function(t, r, n) {
      if (t.idx === this.occurrence) {
        var i = ut(r.concat(n));
        this.result.isEndOfRule = i === void 0, i instanceof se && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
      } else
        s.prototype.walkAtLeastOneSep.call(this, t, r, n);
    }, e;
  })(ei)
);
function bi(s, e, t) {
  t === void 0 && (t = []), t = Ye(t);
  var r = [], n = 0;
  function i(l) {
    return l.concat(Ce(s, n + 1));
  }
  function a(l) {
    var c = bi(i(l), e, t);
    return r.concat(c);
  }
  for (; t.length < e && n < s.length; ) {
    var o = s[n];
    if (o instanceof ze)
      return a(o.definition);
    if (o instanceof Ze)
      return a(o.definition);
    if (o instanceof Ie)
      r = a(o.definition);
    else if (o instanceof lt) {
      var u = o.definition.concat([
        new ce({
          definition: o.definition
        })
      ]);
      return a(u);
    } else if (o instanceof ct) {
      var u = [
        new ze({ definition: o.definition }),
        new ce({
          definition: [
            new se({ terminalType: o.separator })
          ].concat(o.definition)
        })
      ];
      return a(u);
    } else if (o instanceof Je) {
      var u = o.definition.concat([
        new ce({
          definition: [
            new se({ terminalType: o.separator })
          ].concat(o.definition)
        })
      ]);
      r = a(u);
    } else if (o instanceof ce) {
      var u = o.definition.concat([
        new ce({
          definition: o.definition
        })
      ]);
      r = a(u);
    } else {
      if (o instanceof et)
        return x(o.definition, function(l) {
          r = a(l.definition);
        }), r;
      if (o instanceof se)
        t.push(o.terminalType);
      else
        throw Error("non exhaustive match");
    }
    n++;
  }
  return r.push({
    partialPath: t,
    suffixDef: Ce(s, n)
  }), r;
}
function Ku(s, e, t, r) {
  var n = "EXIT_NONE_TERMINAL", i = [n], a = "EXIT_ALTERNATIVE", o = !1, u = e.length, l = u - r - 1, c = [], d = [];
  for (d.push({
    idx: -1,
    def: s,
    ruleStack: [],
    occurrenceStack: []
  }); !q(d); ) {
    var p = d.pop();
    if (p === a) {
      o && Lu(d).idx <= l && d.pop();
      continue;
    }
    var N = p.def, T = p.idx, R = p.ruleStack, S = p.occurrenceStack;
    if (!q(N)) {
      var A = N[0];
      if (A === n) {
        var y = {
          idx: T,
          def: Ce(N),
          ruleStack: Sn(R),
          occurrenceStack: Sn(S)
        };
        d.push(y);
      } else if (A instanceof se)
        if (T < u - 1) {
          var v = T + 1, w = e[v];
          if (t(w, A.terminalType)) {
            var y = {
              idx: v,
              def: Ce(N),
              ruleStack: R,
              occurrenceStack: S
            };
            d.push(y);
          }
        } else if (T === u - 1)
          c.push({
            nextTokenType: A.terminalType,
            nextTokenOccurrence: A.idx,
            ruleStack: R,
            occurrenceStack: S
          }), o = !0;
        else
          throw Error("non exhaustive match");
      else if (A instanceof Ze) {
        var ee = Ye(R);
        ee.push(A.nonTerminalName);
        var Z = Ye(S);
        Z.push(A.idx);
        var y = {
          idx: T,
          def: A.definition.concat(i, Ce(N)),
          ruleStack: ee,
          occurrenceStack: Z
        };
        d.push(y);
      } else if (A instanceof Ie) {
        var J = {
          idx: T,
          def: Ce(N),
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(J), d.push(a);
        var ye = {
          idx: T,
          def: A.definition.concat(Ce(N)),
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(ye);
      } else if (A instanceof lt) {
        var me = new ce({
          definition: A.definition,
          idx: A.idx
        }), ue = A.definition.concat([me], Ce(N)), y = {
          idx: T,
          def: ue,
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(y);
      } else if (A instanceof ct) {
        var K = new se({
          terminalType: A.separator
        }), me = new ce({
          definition: [K].concat(A.definition),
          idx: A.idx
        }), ue = A.definition.concat([me], Ce(N)), y = {
          idx: T,
          def: ue,
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(y);
      } else if (A instanceof Je) {
        var J = {
          idx: T,
          def: Ce(N),
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(J), d.push(a);
        var K = new se({
          terminalType: A.separator
        }), yt = new ce({
          definition: [K].concat(A.definition),
          idx: A.idx
        }), ue = A.definition.concat([yt], Ce(N)), ye = {
          idx: T,
          def: ue,
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(ye);
      } else if (A instanceof ce) {
        var J = {
          idx: T,
          def: Ce(N),
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(J), d.push(a);
        var yt = new ce({
          definition: A.definition,
          idx: A.idx
        }), ue = A.definition.concat([yt], Ce(N)), ye = {
          idx: T,
          def: ue,
          ruleStack: R,
          occurrenceStack: S
        };
        d.push(ye);
      } else if (A instanceof et)
        for (var Xe = A.definition.length - 1; Xe >= 0; Xe--) {
          var vt = A.definition[Xe], tt = {
            idx: T,
            def: vt.definition.concat(Ce(N)),
            ruleStack: R,
            occurrenceStack: S
          };
          d.push(tt), d.push(a);
        }
      else if (A instanceof ze)
        d.push({
          idx: T,
          def: A.definition.concat(Ce(N)),
          ruleStack: R,
          occurrenceStack: S
        });
      else if (A instanceof en)
        d.push(rf(A, T, R, S));
      else
        throw Error("non exhaustive match");
    }
  }
  return c;
}
function rf(s, e, t, r) {
  var n = Ye(t);
  n.push(s.name);
  var i = Ye(r);
  return i.push(1), {
    idx: e,
    def: s.definition,
    ruleStack: n,
    occurrenceStack: i
  };
}
var ju = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})(), Q;
(function(s) {
  s[s.OPTION = 0] = "OPTION", s[s.REPETITION = 1] = "REPETITION", s[s.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", s[s.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", s[s.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", s[s.ALTERNATION = 5] = "ALTERNATION";
})(Q || (Q = {}));
function nf(s) {
  if (s instanceof Ie)
    return Q.OPTION;
  if (s instanceof ce)
    return Q.REPETITION;
  if (s instanceof lt)
    return Q.REPETITION_MANDATORY;
  if (s instanceof ct)
    return Q.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (s instanceof Je)
    return Q.REPETITION_WITH_SEPARATOR;
  if (s instanceof et)
    return Q.ALTERNATION;
  throw Error("non exhaustive match");
}
function sf(s, e, t, r, n, i) {
  var a = Ra(s, e, t), o = Zu(a) ? ys : Zs;
  return i(a, r, o, n);
}
function af(s, e, t, r, n, i) {
  var a = Na(s, e, n, t), o = Zu(a) ? ys : Zs;
  return i(a[0], o, r);
}
function of(s, e, t, r) {
  var n = s.length, i = ot(s, function(u) {
    return ot(u, function(l) {
      return l.length === 1;
    });
  });
  if (e)
    return function(u) {
      for (var l = L(u, function(v) {
        return v.GATE;
      }), c = 0; c < n; c++) {
        var d = s[c], p = d.length, N = l[c];
        if (!(N !== void 0 && N.call(this) === !1))
          e: for (var T = 0; T < p; T++) {
            for (var R = d[T], S = R.length, A = 0; A < S; A++) {
              var y = this.LA(A + 1);
              if (t(y, R[A]) === !1)
                continue e;
            }
            return c;
          }
      }
    };
  if (i && !r) {
    var a = L(s, function(u) {
      return We(u);
    }), o = Oe(a, function(u, l, c) {
      return x(l, function(d) {
        U(u, d.tokenTypeIdx) || (u[d.tokenTypeIdx] = c), x(d.categoryMatches, function(p) {
          U(u, p) || (u[p] = c);
        });
      }), u;
    }, []);
    return function() {
      var u = this.LA(1);
      return o[u.tokenTypeIdx];
    };
  } else
    return function() {
      for (var u = 0; u < n; u++) {
        var l = s[u], c = l.length;
        e: for (var d = 0; d < c; d++) {
          for (var p = l[d], N = p.length, T = 0; T < N; T++) {
            var R = this.LA(T + 1);
            if (t(R, p[T]) === !1)
              continue e;
          }
          return u;
        }
      }
    };
}
function uf(s, e, t) {
  var r = ot(s, function(l) {
    return l.length === 1;
  }), n = s.length;
  if (r && !t) {
    var i = We(s);
    if (i.length === 1 && q(i[0].categoryMatches)) {
      var a = i[0], o = a.tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === o;
      };
    } else {
      var u = Oe(i, function(l, c, d) {
        return l[c.tokenTypeIdx] = !0, x(c.categoryMatches, function(p) {
          l[p] = !0;
        }), l;
      }, []);
      return function() {
        var l = this.LA(1);
        return u[l.tokenTypeIdx] === !0;
      };
    }
  } else
    return function() {
      e: for (var l = 0; l < n; l++) {
        for (var c = s[l], d = c.length, p = 0; p < d; p++) {
          var N = this.LA(p + 1);
          if (e(N, c[p]) === !1)
            continue e;
        }
        return !0;
      }
      return !1;
    };
}
var hf = (
  /** @class */
  (function(s) {
    ju(e, s);
    function e(t, r, n) {
      var i = s.call(this) || this;
      return i.topProd = t, i.targetOccurrence = r, i.targetProdType = n, i;
    }
    return e.prototype.startWalking = function() {
      return this.walk(this.topProd), this.restDef;
    }, e.prototype.checkIsTarget = function(t, r, n, i) {
      return t.idx === this.targetOccurrence && this.targetProdType === r ? (this.restDef = n.concat(i), !0) : !1;
    }, e.prototype.walkOption = function(t, r, n) {
      this.checkIsTarget(t, Q.OPTION, r, n) || s.prototype.walkOption.call(this, t, r, n);
    }, e.prototype.walkAtLeastOne = function(t, r, n) {
      this.checkIsTarget(t, Q.REPETITION_MANDATORY, r, n) || s.prototype.walkOption.call(this, t, r, n);
    }, e.prototype.walkAtLeastOneSep = function(t, r, n) {
      this.checkIsTarget(t, Q.REPETITION_MANDATORY_WITH_SEPARATOR, r, n) || s.prototype.walkOption.call(this, t, r, n);
    }, e.prototype.walkMany = function(t, r, n) {
      this.checkIsTarget(t, Q.REPETITION, r, n) || s.prototype.walkOption.call(this, t, r, n);
    }, e.prototype.walkManySep = function(t, r, n) {
      this.checkIsTarget(t, Q.REPETITION_WITH_SEPARATOR, r, n) || s.prototype.walkOption.call(this, t, r, n);
    }, e;
  })(Js)
), qu = (
  /** @class */
  (function(s) {
    ju(e, s);
    function e(t, r, n) {
      var i = s.call(this) || this;
      return i.targetOccurrence = t, i.targetProdType = r, i.targetRef = n, i.result = [], i;
    }
    return e.prototype.checkIsTarget = function(t, r) {
      t.idx === this.targetOccurrence && this.targetProdType === r && (this.targetRef === void 0 || t === this.targetRef) && (this.result = t.definition);
    }, e.prototype.visitOption = function(t) {
      this.checkIsTarget(t, Q.OPTION);
    }, e.prototype.visitRepetition = function(t) {
      this.checkIsTarget(t, Q.REPETITION);
    }, e.prototype.visitRepetitionMandatory = function(t) {
      this.checkIsTarget(t, Q.REPETITION_MANDATORY);
    }, e.prototype.visitRepetitionMandatoryWithSeparator = function(t) {
      this.checkIsTarget(t, Q.REPETITION_MANDATORY_WITH_SEPARATOR);
    }, e.prototype.visitRepetitionWithSeparator = function(t) {
      this.checkIsTarget(t, Q.REPETITION_WITH_SEPARATOR);
    }, e.prototype.visitAlternation = function(t) {
      this.checkIsTarget(t, Q.ALTERNATION);
    }, e;
  })(Mr)
);
function So(s) {
  for (var e = new Array(s), t = 0; t < s; t++)
    e[t] = [];
  return e;
}
function Ei(s) {
  for (var e = [""], t = 0; t < s.length; t++) {
    for (var r = s[t], n = [], i = 0; i < e.length; i++) {
      var a = e[i];
      n.push(a + "_" + r.tokenTypeIdx);
      for (var o = 0; o < r.categoryMatches.length; o++) {
        var u = "_" + r.categoryMatches[o];
        n.push(a + u);
      }
    }
    e = n;
  }
  return e;
}
function lf(s, e, t) {
  for (var r = 0; r < s.length; r++)
    if (r !== t)
      for (var n = s[r], i = 0; i < e.length; i++) {
        var a = e[i];
        if (n[a] === !0)
          return !1;
      }
  return !0;
}
function Qu(s, e) {
  for (var t = L(s, function(c) {
    return bi([c], 1);
  }), r = So(t.length), n = L(t, function(c) {
    var d = {};
    return x(c, function(p) {
      var N = Ei(p.partialPath);
      x(N, function(T) {
        d[T] = !0;
      });
    }), d;
  }), i = t, a = 1; a <= e; a++) {
    var o = i;
    i = So(o.length);
    for (var u = function(c) {
      for (var d = o[c], p = 0; p < d.length; p++) {
        var N = d[p].partialPath, T = d[p].suffixDef, R = Ei(N), S = lf(n, R, c);
        if (S || q(T) || N.length === e) {
          var A = r[c];
          if (Pi(A, N) === !1) {
            A.push(N);
            for (var y = 0; y < R.length; y++) {
              var v = R[y];
              n[c][v] = !0;
            }
          }
        } else {
          var w = bi(T, a + 1, N);
          i[c] = i[c].concat(w), x(w, function(ee) {
            var Z = Ei(ee.partialPath);
            x(Z, function(J) {
              n[c][J] = !0;
            });
          });
        }
      }
    }, l = 0; l < o.length; l++)
      u(l);
  }
  return r;
}
function Ra(s, e, t, r) {
  var n = new qu(s, Q.ALTERNATION, r);
  return e.accept(n), Qu(n.result, t);
}
function Na(s, e, t, r) {
  var n = new qu(s, t);
  e.accept(n);
  var i = n.result, a = new hf(e, s, t), o = a.startWalking(), u = new ze({ definition: i }), l = new ze({ definition: o });
  return Qu([u, l], r);
}
function Pi(s, e) {
  e: for (var t = 0; t < s.length; t++) {
    var r = s[t];
    if (r.length === e.length) {
      for (var n = 0; n < r.length; n++) {
        var i = e[n], a = r[n], o = i === a || a.categoryMatchesMap[i.tokenTypeIdx] !== void 0;
        if (o === !1)
          continue e;
      }
      return !0;
    }
  }
  return !1;
}
function cf(s, e) {
  return s.length < e.length && ot(s, function(t, r) {
    var n = e[r];
    return t === n || n.categoryMatchesMap[t.tokenTypeIdx];
  });
}
function Zu(s) {
  return ot(s, function(e) {
    return ot(e, function(t) {
      return ot(t, function(r) {
        return q(r.categoryMatches);
      });
    });
  });
}
var Ta = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})();
function df(s, e, t, r, n, i) {
  var a = L(s, function(y) {
    return pf(y, n);
  }), o = L(s, function(y) {
    return th(y, y, n);
  }), u = [], l = [], c = [];
  ot(o, q) && (u = L(s, function(y) {
    return Af(y, n);
  }), l = L(s, function(y) {
    return yf(y, e, r, n);
  }), c = If(s, e, n));
  var d = wf(s, t, n), p = L(t, function(y) {
    return Nf(y, n);
  }), N = ff(s, n), T = _f(s, n), R = L(s, function(y) {
    return Cf(y, n);
  }), S = L(s, function(y) {
    return Ef(y, n);
  }), A = L(s, function(y) {
    return Tf(y, s, i, n);
  });
  return We(a.concat(p, N, T, c, o, u, l, d, R, S, A));
}
function ff(s, e) {
  var t = [];
  return x(s, function(r) {
    var n = new Ea("");
    r.accept(n);
    var i = L(n.result, function(a) {
      return a.orgProd;
    });
    t.push(L(i, function(a) {
      return Rf(r, a, e);
    }));
  }), We(t);
}
function pf(s, e) {
  var t = new gf();
  s.accept(t);
  var r = t.allProductions, n = Uu(r, mf), i = dt(n, function(o) {
    return o.length > 1;
  }), a = L(Fe(i), function(o) {
    var u = ut(o), l = e.buildDuplicateFoundError(s, o), c = gt(u), d = {
      message: l,
      type: Ae.DUPLICATE_PRODUCTIONS,
      ruleName: s.name,
      dslName: c,
      occurrence: u.idx
    }, p = Ju(u);
    return p && (d.parameter = p), d;
  });
  return a;
}
function mf(s) {
  return gt(s) + "_#_" + s.idx + "_#_" + Ju(s);
}
function Ju(s) {
  return s instanceof se ? s.terminalType.name : s instanceof Ze ? s.nonTerminalName : "";
}
var gf = (
  /** @class */
  (function(s) {
    Ta(e, s);
    function e() {
      var t = s !== null && s.apply(this, arguments) || this;
      return t.allProductions = [], t;
    }
    return e.prototype.visitNonTerminal = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitOption = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitRepetitionWithSeparator = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitRepetitionMandatory = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitRepetitionMandatoryWithSeparator = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitRepetition = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitAlternation = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitTerminal = function(t) {
      this.allProductions.push(t);
    }, e;
  })(Mr)
), Or = /^[a-zA-Z_]\w*$/, eh = new RegExp(Or.source.replace("^", "^\\$"));
function Ef(s, e) {
  var t = [], r = s.name;
  return r.match(Or) || t.push({
    message: e.buildInvalidRuleNameError({
      topLevelRule: s,
      expectedPattern: Or
    }),
    type: Ae.INVALID_RULE_NAME,
    ruleName: r
  }), t;
}
function Rf(s, e, t) {
  var r = [], n;
  return e.name.match(eh) || (n = t.buildInvalidNestedRuleNameError(s, e), r.push({
    message: n,
    type: Ae.INVALID_NESTED_RULE_NAME,
    ruleName: s.name
  })), r;
}
function Nf(s, e) {
  var t = [], r = s.name;
  return r.match(Or) || t.push({
    message: e.buildTokenNameError({
      tokenType: s,
      expectedPattern: Or
    }),
    type: Ae.INVALID_TOKEN_NAME
  }), t;
}
function Tf(s, e, t, r) {
  var n = [], i = Oe(e, function(o, u) {
    return u.name === s.name ? o + 1 : o;
  }, 0);
  if (i > 1) {
    var a = r.buildDuplicateRuleNameError({
      topLevelRule: s,
      grammarName: t
    });
    n.push({
      message: a,
      type: Ae.DUPLICATE_RULE_NAME,
      ruleName: s.name
    });
  }
  return n;
}
function Sf(s, e, t) {
  var r = [], n;
  return Ee(e, s) || (n = "Invalid rule override, rule: ->" + s + "<- cannot be overridden in the grammar: ->" + t + "<-as it is not defined in any of the super grammars ", r.push({
    message: n,
    type: Ae.INVALID_RULE_OVERRIDE,
    ruleName: s
  })), r;
}
function th(s, e, t, r) {
  r === void 0 && (r = []);
  var n = [], i = ls(e.definition);
  if (q(i))
    return [];
  var a = s.name, o = Ee(i, s);
  o && n.push({
    message: t.buildLeftRecursionError({
      topLevelRule: s,
      leftRecursionPath: r
    }),
    type: Ae.LEFT_RECURSION,
    ruleName: a
  });
  var u = js(i, r.concat([s])), l = L(u, function(c) {
    var d = Ye(r);
    return d.push(c), th(s, c, t, d);
  });
  return n.concat(We(l));
}
function ls(s) {
  var e = [];
  if (q(s))
    return e;
  var t = ut(s);
  if (t instanceof Ze)
    e.push(t.referencedRule);
  else if (t instanceof ze || t instanceof Ie || t instanceof lt || t instanceof ct || t instanceof Je || t instanceof ce)
    e = e.concat(ls(t.definition));
  else if (t instanceof et)
    e = We(L(t.definition, function(a) {
      return ls(a.definition);
    }));
  else if (!(t instanceof se)) throw Error("non exhaustive match");
  var r = vs(t), n = s.length > 1;
  if (r && n) {
    var i = Ce(s);
    return e.concat(ls(i));
  } else
    return e;
}
var Sa = (
  /** @class */
  (function(s) {
    Ta(e, s);
    function e() {
      var t = s !== null && s.apply(this, arguments) || this;
      return t.alternations = [], t;
    }
    return e.prototype.visitAlternation = function(t) {
      this.alternations.push(t);
    }, e;
  })(Mr)
);
function Af(s, e) {
  var t = new Sa();
  s.accept(t);
  var r = t.alternations, n = Oe(r, function(i, a) {
    var o = Sn(a.definition), u = L(o, function(l, c) {
      var d = Ku([l], [], null, 1);
      return q(d) ? {
        message: e.buildEmptyAlternationError({
          topLevelRule: s,
          alternation: a,
          emptyChoiceIdx: c
        }),
        type: Ae.NONE_LAST_EMPTY_ALT,
        ruleName: s.name,
        occurrence: a.idx,
        alternative: c + 1
      } : null;
    });
    return i.concat(Fn(u));
  }, []);
  return n;
}
function yf(s, e, t, r) {
  var n = new Sa();
  s.accept(n);
  var i = n.alternations, a = t[s.name];
  a && (i = Cr(i, function(u) {
    return a[gt(u) + (u.idx === 0 ? "" : u.idx)];
  })), i = Cr(i, function(u) {
    return u.ignoreAmbiguities === !0;
  });
  var o = Oe(i, function(u, l) {
    var c = l.idx, d = l.maxLookahead || e, p = Ra(c, s, d, l), N = Of(p, l, s, r), T = Mf(p, l, s, r);
    return u.concat(N, T);
  }, []);
  return o;
}
var vf = (
  /** @class */
  (function(s) {
    Ta(e, s);
    function e() {
      var t = s !== null && s.apply(this, arguments) || this;
      return t.allProductions = [], t;
    }
    return e.prototype.visitRepetitionWithSeparator = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitRepetitionMandatory = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitRepetitionMandatoryWithSeparator = function(t) {
      this.allProductions.push(t);
    }, e.prototype.visitRepetition = function(t) {
      this.allProductions.push(t);
    }, e;
  })(Mr)
);
function Cf(s, e) {
  var t = new Sa();
  s.accept(t);
  var r = t.alternations, n = Oe(r, function(i, a) {
    return a.definition.length > 255 && i.push({
      message: e.buildTooManyAlternativesError({
        topLevelRule: s,
        alternation: a
      }),
      type: Ae.TOO_MANY_ALTS,
      ruleName: s.name,
      occurrence: a.idx
    }), i;
  }, []);
  return n;
}
function If(s, e, t) {
  var r = [];
  return x(s, function(n) {
    var i = new vf();
    n.accept(i);
    var a = i.allProductions;
    x(a, function(o) {
      var u = nf(o), l = o.maxLookahead || e, c = o.idx, d = Na(c, n, u, l), p = d[0];
      if (q(We(p))) {
        var N = t.buildEmptyRepetitionError({
          topLevelRule: n,
          repetition: o
        });
        r.push({
          message: N,
          type: Ae.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: n.name
        });
      }
    });
  }), r;
}
function Of(s, e, t, r) {
  var n = [], i = Oe(s, function(o, u, l) {
    return e.definition[l].ignoreAmbiguities === !0 || x(u, function(c) {
      var d = [l];
      x(s, function(p, N) {
        l !== N && Pi(p, c) && // ignore (skip) ambiguities with this "other" alternative
        e.definition[N].ignoreAmbiguities !== !0 && d.push(N);
      }), d.length > 1 && !Pi(n, c) && (n.push(c), o.push({
        alts: d,
        path: c
      }));
    }), o;
  }, []), a = L(i, function(o) {
    var u = L(o.alts, function(c) {
      return c + 1;
    }), l = r.buildAlternationAmbiguityError({
      topLevelRule: t,
      alternation: e,
      ambiguityIndices: u,
      prefixPath: o.path
    });
    return {
      message: l,
      type: Ae.AMBIGUOUS_ALTS,
      ruleName: t.name,
      occurrence: e.idx,
      alternatives: [o.alts]
    };
  });
  return a;
}
function Mf(s, e, t, r) {
  var n = [], i = Oe(s, function(a, o, u) {
    var l = L(o, function(c) {
      return { idx: u, path: c };
    });
    return a.concat(l);
  }, []);
  return x(i, function(a) {
    var o = e.definition[a.idx];
    if (o.ignoreAmbiguities !== !0) {
      var u = a.idx, l = a.path, c = kc(i, function(p) {
        return (
          // ignore (skip) ambiguities with this "other" alternative
          e.definition[p.idx].ignoreAmbiguities !== !0 && p.idx < u && // checking for strict prefix because identical lookaheads
          // will be be detected using a different validation.
          cf(p.path, l)
        );
      }), d = L(c, function(p) {
        var N = [p.idx + 1, u + 1], T = e.idx === 0 ? "" : e.idx, R = r.buildAlternationPrefixAmbiguityError({
          topLevelRule: t,
          alternation: e,
          ambiguityIndices: N,
          prefixPath: p.path
        });
        return {
          message: R,
          type: Ae.AMBIGUOUS_PREFIX_ALTS,
          ruleName: t.name,
          occurrence: T,
          alternatives: N
        };
      });
      n = n.concat(d);
    }
  }), n;
}
function wf(s, e, t) {
  var r = [], n = L(e, function(i) {
    return i.name;
  });
  return x(s, function(i) {
    var a = i.name;
    if (Ee(n, a)) {
      var o = t.buildNamespaceConflictError(i);
      r.push({
        message: o,
        type: Ae.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: a
      });
    }
  }), r;
}
function _f(s, e) {
  var t = [];
  return x(s, function(r) {
    var n = new Ea("");
    r.accept(n);
    var i = Uu(n.result, function(o) {
      return o.name;
    }), a = dt(i, function(o) {
      return o.length > 1;
    });
    x(Fe(a), function(o) {
      var u = L(o, function(c) {
        return c.orgProd;
      }), l = e.buildDuplicateNestedRuleNameError(r, u);
      t.push({
        message: l,
        type: Ae.DUPLICATE_NESTED_NAME,
        ruleName: r.name
      });
    });
  }), t;
}
var rh = {
  buildMismatchTokenMessage: function(s) {
    var e = s.expected, t = s.actual;
    s.previous, s.ruleName;
    var r = zu(e), n = r ? "--> " + Yr(e) + " <--" : "token of type --> " + e.name + " <--", i = "Expecting " + n + " but found --> '" + t.image + "' <--";
    return i;
  },
  buildNotAllInputParsedMessage: function(s) {
    var e = s.firstRedundant;
    return s.ruleName, "Redundant input, expecting EOF but found: " + e.image;
  },
  buildNoViableAltMessage: function(s) {
    var e = s.expectedPathsPerAlt, t = s.actual;
    s.previous;
    var r = s.customUserDescription;
    s.ruleName;
    var n = "Expecting: ", i = ut(t).image, a = `
but found: '` + i + "'";
    if (r)
      return n + r + a;
    var o = Oe(e, function(d, p) {
      return d.concat(p);
    }, []), u = L(o, function(d) {
      return "[" + L(d, function(p) {
        return Yr(p);
      }).join(", ") + "]";
    }), l = L(u, function(d, p) {
      return "  " + (p + 1) + ". " + d;
    }), c = `one of these possible Token sequences:
` + l.join(`
`);
    return n + c + a;
  },
  buildEarlyExitMessage: function(s) {
    var e = s.expectedIterationPaths, t = s.actual, r = s.customUserDescription;
    s.ruleName;
    var n = "Expecting: ", i = ut(t).image, a = `
but found: '` + i + "'";
    if (r)
      return n + r + a;
    var o = L(e, function(l) {
      return "[" + L(l, function(c) {
        return Yr(c);
      }).join(",") + "]";
    }), u = `expecting at least one iteration which starts with one of these possible Token sequences::
  ` + ("<" + o.join(" ,") + ">");
    return n + u + a;
  }
};
Object.freeze(rh);
var Lf = {
  buildRuleNotFoundError: function(s, e) {
    var t = "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + s.name + "<-";
    return t;
  }
}, Aa = {
  buildDuplicateFoundError: function(s, e) {
    function t(c) {
      return c instanceof se ? c.terminalType.name : c instanceof Ze ? c.nonTerminalName : "";
    }
    var r = s.name, n = ut(e), i = n.idx, a = gt(n), o = t(n), u = i > 0, l = "->" + a + (u ? i : "") + "<- " + (o ? "with argument: ->" + o + "<-" : "") + `
                  appears more than once (` + e.length + " times) in the top level rule: ->" + r + `<-.                  
                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    return l = l.replace(/[ \t]+/g, " "), l = l.replace(/\s\s+/g, `
`), l;
  },
  buildInvalidNestedRuleNameError: function(s, e) {
    var t = "Invalid nested rule name: ->" + e.name + "<- inside rule: ->" + s.name + `<-
` + ("it must match the pattern: ->" + eh.toString() + `<-.
`) + "Note that this means a nested rule name must start with the '$'(dollar) sign.";
    return t;
  },
  buildDuplicateNestedRuleNameError: function(s, e) {
    var t = ut(e).name, r = "Duplicate nested rule name: ->" + t + "<- inside rule: ->" + s.name + `<-
A nested name must be unique in the scope of a top level grammar rule.`;
    return r;
  },
  buildNamespaceConflictError: function(s) {
    var e = `Namespace conflict found in grammar.
` + ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + s.name + `>.
`) + `To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
    return e;
  },
  buildAlternationPrefixAmbiguityError: function(s) {
    var e = L(s.prefixPath, function(n) {
      return Yr(n);
    }).join(", "), t = s.alternation.idx === 0 ? "" : s.alternation.idx, r = "Ambiguous alternatives: <" + s.ambiguityIndices.join(" ,") + `> due to common lookahead prefix
` + ("in <OR" + t + "> inside <" + s.topLevelRule.name + `> Rule,
`) + ("<" + e + `> may appears as a prefix path in all these alternatives.
`) + `See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
    return r;
  },
  buildAlternationAmbiguityError: function(s) {
    var e = L(s.prefixPath, function(n) {
      return Yr(n);
    }).join(", "), t = s.alternation.idx === 0 ? "" : s.alternation.idx, r = "Ambiguous Alternatives Detected: <" + s.ambiguityIndices.join(" ,") + "> in <OR" + t + ">" + (" inside <" + s.topLevelRule.name + `> Rule,
`) + ("<" + e + `> may appears as a prefix path in all these alternatives.
`);
    return r = r + `See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
  },
  buildEmptyRepetitionError: function(s) {
    var e = gt(s.repetition);
    s.repetition.idx !== 0 && (e += s.repetition.idx);
    var t = "The repetition <" + e + "> within Rule <" + s.topLevelRule.name + `> can never consume any tokens.
This could lead to an infinite loop.`;
    return t;
  },
  buildTokenNameError: function(s) {
    var e = s.tokenType.name, t = "Invalid Grammar Token name: ->" + e + "<- it must match the pattern: ->" + s.expectedPattern.toString() + "<-";
    return t;
  },
  buildEmptyAlternationError: function(s) {
    var e = "Ambiguous empty alternative: <" + (s.emptyChoiceIdx + 1) + ">" + (" in <OR" + s.alternation.idx + "> inside <" + s.topLevelRule.name + `> Rule.
`) + "Only the last alternative may be an empty alternative.";
    return e;
  },
  buildTooManyAlternativesError: function(s) {
    var e = `An Alternation cannot have more than 256 alternatives:
` + ("<OR" + s.alternation.idx + "> inside <" + s.topLevelRule.name + `> Rule.
 has ` + (s.alternation.definition.length + 1) + " alternatives.");
    return e;
  },
  buildLeftRecursionError: function(s) {
    var e = s.topLevelRule.name, t = L(s.leftRecursionPath, function(i) {
      return i.name;
    }), r = e + " --> " + t.concat([e]).join(" --> "), n = `Left Recursion found in grammar.
` + ("rule: <" + e + `> can be invoked from itself (directly or indirectly)
`) + (`without consuming any Tokens. The grammar path that causes this is: 
 ` + r + `
`) + ` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.`;
    return n;
  },
  buildInvalidRuleNameError: function(s) {
    var e = s.topLevelRule.name, t = s.expectedPattern.toString(), r = "Invalid grammar rule name: ->" + e + "<- it must match the pattern: ->" + t + "<-";
    return r;
  },
  buildDuplicateRuleNameError: function(s) {
    var e;
    s.topLevelRule instanceof en ? e = s.topLevelRule.name : e = s.topLevelRule;
    var t = "Duplicate definition, rule: ->" + e + "<- is already defined in the grammar: ->" + s.grammarName + "<-";
    return t;
  }
}, Ff = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})();
function Uf(s, e) {
  var t = new xf(s, e);
  return t.resolveRefs(), t.errors;
}
var xf = (
  /** @class */
  (function(s) {
    Ff(e, s);
    function e(t, r) {
      var n = s.call(this) || this;
      return n.nameToTopRule = t, n.errMsgProvider = r, n.errors = [], n;
    }
    return e.prototype.resolveRefs = function() {
      var t = this;
      x(Fe(this.nameToTopRule), function(r) {
        t.currTopLevel = r, r.accept(t);
      });
    }, e.prototype.visitNonTerminal = function(t) {
      var r = this.nameToTopRule[t.nonTerminalName];
      if (r)
        t.referencedRule = r;
      else {
        var n = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, t);
        this.errors.push({
          message: n,
          type: Ae.UNRESOLVED_SUBRULE_REF,
          ruleName: this.currTopLevel.name,
          unresolvedRefName: t.nonTerminalName
        });
      }
    }, e;
  })(Mr)
);
function bf(s) {
  s = qs(s, {
    errMsgProvider: Lf
  });
  var e = {};
  return x(s.rules, function(t) {
    e[t.name] = t;
  }), Uf(e, s.errMsgProvider);
}
function Pf(s) {
  return s = qs(s, {
    errMsgProvider: Aa,
    ignoredIssues: {}
  }), df(s.rules, s.maxLookahead, s.tokenTypes, s.ignoredIssues, s.errMsgProvider, s.grammarName);
}
var nh = "MismatchedTokenException", sh = "NoViableAltException", ih = "EarlyExitException", ah = "NotAllInputParsedException", oh = [
  nh,
  sh,
  ih,
  ah
];
Object.freeze(oh);
function Is(s) {
  return Ee(oh, s.name);
}
function ya(s, e, t) {
  this.name = nh, this.message = s, this.token = e, this.previousToken = t, this.resyncedTokens = [];
}
ya.prototype = Error.prototype;
function uh(s, e, t) {
  this.name = sh, this.message = s, this.token = e, this.previousToken = t, this.resyncedTokens = [];
}
uh.prototype = Error.prototype;
function hh(s, e) {
  this.name = ah, this.message = s, this.token = e, this.resyncedTokens = [];
}
hh.prototype = Error.prototype;
function lh(s, e, t) {
  this.name = ih, this.message = s, this.token = e, this.previousToken = t, this.resyncedTokens = [];
}
lh.prototype = Error.prototype;
var Ri = {}, ch = "InRuleRecoveryException";
function dh(s) {
  this.name = ch, this.message = s;
}
dh.prototype = Error.prototype;
var Vf = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initRecoverable = function(e) {
      this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = U(e, "recoveryEnabled") ? e.recoveryEnabled : Be.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = Df);
    }, s.prototype.getTokenToInsert = function(e) {
      var t = ga(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
      return t.isInsertedInRecovery = !0, t;
    }, s.prototype.canTokenTypeBeInsertedInRecovery = function(e) {
      return !0;
    }, s.prototype.tryInRepetitionRecovery = function(e, t, r, n) {
      for (var i = this, a = this.findReSyncTokenType(), o = this.exportLexerState(), u = [], l = !1, c = this.LA(1), d = this.LA(1), p = function() {
        var N = i.LA(0), T = i.errorMessageProvider.buildMismatchTokenMessage({
          expected: n,
          actual: c,
          previous: N,
          ruleName: i.getCurrRuleFullName()
        }), R = new ya(T, c, i.LA(0));
        R.resyncedTokens = Sn(u), i.SAVE_ERROR(R);
      }; !l; )
        if (this.tokenMatcher(d, n)) {
          p();
          return;
        } else if (r.call(this)) {
          p(), e.apply(this, t);
          return;
        } else this.tokenMatcher(d, a) ? l = !0 : (d = this.SKIP_TOKEN(), this.addToResyncTokens(d, u));
      this.importLexerState(o);
    }, s.prototype.shouldInRepetitionRecoveryBeTried = function(e, t, r) {
      return !(r === !1 || e === void 0 || t === void 0 || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, t)));
    }, s.prototype.getFollowsForInRuleRecovery = function(e, t) {
      var r = this.getCurrentGrammarPath(e, t), n = this.getNextPossibleTokenTypes(r);
      return n;
    }, s.prototype.tryInRuleRecovery = function(e, t) {
      if (this.canRecoverWithSingleTokenInsertion(e, t)) {
        var r = this.getTokenToInsert(e);
        return r;
      }
      if (this.canRecoverWithSingleTokenDeletion(e)) {
        var n = this.SKIP_TOKEN();
        return this.consumeToken(), n;
      }
      throw new dh("sad sad panda");
    }, s.prototype.canPerformInRuleRecovery = function(e, t) {
      return this.canRecoverWithSingleTokenInsertion(e, t) || this.canRecoverWithSingleTokenDeletion(e);
    }, s.prototype.canRecoverWithSingleTokenInsertion = function(e, t) {
      var r = this;
      if (!this.canTokenTypeBeInsertedInRecovery(e) || q(t))
        return !1;
      var n = this.LA(1), i = qr(t, function(a) {
        return r.tokenMatcher(n, a);
      }) !== void 0;
      return i;
    }, s.prototype.canRecoverWithSingleTokenDeletion = function(e) {
      var t = this.tokenMatcher(this.LA(2), e);
      return t;
    }, s.prototype.isInCurrentRuleReSyncSet = function(e) {
      var t = this.getCurrFollowKey(), r = this.getFollowSetFromFollowKey(t);
      return Ee(r, e);
    }, s.prototype.findReSyncTokenType = function() {
      for (var e = this.flattenFollowSet(), t = this.LA(1), r = 2; ; ) {
        var n = t.tokenType;
        if (Ee(e, n))
          return n;
        t = this.LA(r), r++;
      }
    }, s.prototype.getCurrFollowKey = function() {
      if (this.RULE_STACK.length === 1)
        return Ri;
      var e = this.getLastExplicitRuleShortName(), t = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
      return {
        ruleName: this.shortRuleNameToFullName(e),
        idxInCallingRule: t,
        inRule: this.shortRuleNameToFullName(r)
      };
    }, s.prototype.buildFullFollowKeyStack = function() {
      var e = this, t = this.RULE_STACK, r = this.RULE_OCCURRENCE_STACK;
      return q(this.LAST_EXPLICIT_RULE_STACK) || (t = L(this.LAST_EXPLICIT_RULE_STACK, function(n) {
        return e.RULE_STACK[n];
      }), r = L(this.LAST_EXPLICIT_RULE_STACK, function(n) {
        return e.RULE_OCCURRENCE_STACK[n];
      })), L(t, function(n, i) {
        return i === 0 ? Ri : {
          ruleName: e.shortRuleNameToFullName(n),
          idxInCallingRule: r[i],
          inRule: e.shortRuleNameToFullName(t[i - 1])
        };
      });
    }, s.prototype.flattenFollowSet = function() {
      var e = this, t = L(this.buildFullFollowKeyStack(), function(r) {
        return e.getFollowSetFromFollowKey(r);
      });
      return We(t);
    }, s.prototype.getFollowSetFromFollowKey = function(e) {
      if (e === Ri)
        return [Ir];
      var t = e.ruleName + e.idxInCallingRule + Xu + e.inRule;
      return this.resyncFollows[t];
    }, s.prototype.addToResyncTokens = function(e, t) {
      return this.tokenMatcher(e, Ir) || t.push(e), t;
    }, s.prototype.reSyncTo = function(e) {
      for (var t = [], r = this.LA(1); this.tokenMatcher(r, e) === !1; )
        r = this.SKIP_TOKEN(), this.addToResyncTokens(r, t);
      return Sn(t);
    }, s.prototype.attemptInRepetitionRecovery = function(e, t, r, n, i, a, o) {
    }, s.prototype.getCurrentGrammarPath = function(e, t) {
      var r = this.getHumanReadableRuleStack(), n = Ye(this.RULE_OCCURRENCE_STACK), i = {
        ruleStack: r,
        occurrenceStack: n,
        lastTok: e,
        lastTokOccurrence: t
      };
      return i;
    }, s.prototype.getHumanReadableRuleStack = function() {
      var e = this;
      return q(this.LAST_EXPLICIT_RULE_STACK) ? L(this.RULE_STACK, function(t) {
        return e.shortRuleNameToFullName(t);
      }) : L(this.LAST_EXPLICIT_RULE_STACK, function(t) {
        return e.shortRuleNameToFullName(e.RULE_STACK[t]);
      });
    }, s;
  })()
);
function Df(s, e, t, r, n, i, a) {
  var o = this.getKeyForAutomaticLookahead(r, n), u = this.firstAfterRepMap[o];
  if (u === void 0) {
    var l = this.getCurrRuleFullName(), c = this.getGAstProductions()[l], d = new i(c, n);
    u = d.startWalking(), this.firstAfterRepMap[o] = u;
  }
  var p = u.token, N = u.occurrence, T = u.isEndOfRule;
  this.RULE_STACK.length === 1 && T && p === void 0 && (p = Ir, N = 1), this.shouldInRepetitionRecoveryBeTried(p, N, a) && this.tryInRepetitionRecovery(s, e, t, p);
}
var Bf = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initLooksAhead = function(e) {
      this.dynamicTokensEnabled = U(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Be.dynamicTokensEnabled, this.maxLookahead = U(e, "maxLookahead") ? e.maxLookahead : Be.maxLookahead, this.lookAheadFuncsCache = Ja() ? /* @__PURE__ */ new Map() : [], Ja() ? (this.getLaFuncFromCache = this.getLaFuncFromMap, this.setLaFuncCache = this.setLaFuncCacheUsingMap) : (this.getLaFuncFromCache = this.getLaFuncFromObj, this.setLaFuncCache = this.setLaFuncUsingObj);
    }, s.prototype.preComputeLookaheadFunctions = function(e) {
      var t = this;
      x(e, function(r) {
        t.TRACE_INIT(r.name + " Rule Lookahead", function() {
          var n = Dd(r), i = n.alternation, a = n.repetition, o = n.option, u = n.repetitionMandatory, l = n.repetitionMandatoryWithSeparator, c = n.repetitionWithSeparator;
          x(i, function(d) {
            var p = d.idx === 0 ? "" : d.idx;
            t.TRACE_INIT("" + gt(d) + p, function() {
              var N = sf(d.idx, r, d.maxLookahead || t.maxLookahead, d.hasPredicates, t.dynamicTokensEnabled, t.lookAheadBuilderForAlternatives), T = pn(t.fullRuleNameToShort[r.name], zr, d.idx);
              t.setLaFuncCache(T, N);
            });
          }), x(a, function(d) {
            t.computeLookaheadFunc(r, d.idx, cn, Q.REPETITION, d.maxLookahead, gt(d));
          }), x(o, function(d) {
            t.computeLookaheadFunc(r, d.idx, Cs, Q.OPTION, d.maxLookahead, gt(d));
          }), x(u, function(d) {
            t.computeLookaheadFunc(r, d.idx, dn, Q.REPETITION_MANDATORY, d.maxLookahead, gt(d));
          }), x(l, function(d) {
            t.computeLookaheadFunc(r, d.idx, kr, Q.REPETITION_MANDATORY_WITH_SEPARATOR, d.maxLookahead, gt(d));
          }), x(c, function(d) {
            t.computeLookaheadFunc(r, d.idx, fn, Q.REPETITION_WITH_SEPARATOR, d.maxLookahead, gt(d));
          });
        });
      });
    }, s.prototype.computeLookaheadFunc = function(e, t, r, n, i, a) {
      var o = this;
      this.TRACE_INIT("" + a + (t === 0 ? "" : t), function() {
        var u = af(t, e, i || o.maxLookahead, o.dynamicTokensEnabled, n, o.lookAheadBuilderForOptional), l = pn(o.fullRuleNameToShort[e.name], r, t);
        o.setLaFuncCache(l, u);
      });
    }, s.prototype.lookAheadBuilderForOptional = function(e, t, r) {
      return uf(e, t, r);
    }, s.prototype.lookAheadBuilderForAlternatives = function(e, t, r, n) {
      return of(e, t, r, n);
    }, s.prototype.getKeyForAutomaticLookahead = function(e, t) {
      var r = this.getLastExplicitRuleShortName();
      return pn(r, e, t);
    }, s.prototype.getLaFuncFromCache = function(e) {
    }, s.prototype.getLaFuncFromMap = function(e) {
      return this.lookAheadFuncsCache.get(e);
    }, s.prototype.getLaFuncFromObj = function(e) {
      return this.lookAheadFuncsCache[e];
    }, s.prototype.setLaFuncCache = function(e, t) {
    }, s.prototype.setLaFuncCacheUsingMap = function(e, t) {
      this.lookAheadFuncsCache.set(e, t);
    }, s.prototype.setLaFuncUsingObj = function(e, t) {
      this.lookAheadFuncsCache[e] = t;
    }, s;
  })()
);
function kf(s) {
  return ti(s.constructor);
}
var Gf = /^\s*function\s*(\S*)\s*\(/, Ao = "name";
function ti(s) {
  var e = s.name;
  if (e)
    return e;
  var t = s.toString().match(Gf)[1];
  return t;
}
function fh(s, e) {
  var t = Object.getOwnPropertyDescriptor(s, Ao);
  return ht(t) || t.configurable ? (Object.defineProperty(s, Ao, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e
  }), !0) : !1;
}
function Hf(s, e) {
  for (var t = $t(s), r = t.length, n = 0; n < r; n++)
    for (var i = t[n], a = s[i], o = a.length, u = 0; u < o; u++) {
      var l = a[u];
      l.tokenTypeIdx === void 0 && (l.fullName !== void 0 ? this[l.fullName](l.children, e) : this[l.name](l.children, e));
    }
}
function Wf(s, e) {
  var t = function() {
  };
  fh(t, s + "BaseSemantics");
  var r = {
    visit: function(n, i) {
      if (Nt(n) && (n = n[0]), !ht(n))
        return n.fullName !== void 0 ? this[n.fullName](n.children, i) : this[n.name](n.children, i);
    },
    validateVisitor: function() {
      var n = zf(this, e);
      if (!q(n)) {
        var i = L(n, function(a) {
          return a.msg;
        });
        throw Error("Errors Detected in CST Visitor <" + ti(this.constructor) + `>:
	` + ("" + i.join(`

`).replace(/\n/g, `
	`)));
      }
    }
  };
  return t.prototype = r, t.prototype.constructor = t, t._RULE_NAMES = e, t;
}
function Yf(s, e, t) {
  var r = function() {
  };
  fh(r, s + "BaseSemanticsWithDefaults");
  var n = Object.create(t.prototype);
  return x(e, function(i) {
    n[i] = Hf;
  }), r.prototype = n, r.prototype.constructor = r, r;
}
var Os;
(function(s) {
  s[s.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", s[s.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Os || (Os = {}));
function zf(s, e) {
  var t = Xf(s, e), r = Kf(s, e);
  return t.concat(r);
}
function Xf(s, e) {
  var t = L(e, function(r) {
    if (!or(s[r]))
      return {
        msg: "Missing visitor method: <" + r + "> on " + ti(s.constructor) + " CST Visitor.",
        type: Os.MISSING_METHOD,
        methodName: r
      };
  });
  return Fn(t);
}
var $f = ["constructor", "visit", "validateVisitor"];
function Kf(s, e) {
  var t = [];
  for (var r in s)
    Or.test(r) && or(s[r]) && !Ee($f, r) && !Ee(e, r) && t.push({
      msg: "Redundant visitor method: <" + r + "> on " + ti(s.constructor) + ` CST Visitor
There is no Grammar Rule corresponding to this method's name.
` + ("For utility methods on visitor classes use methods names that do not match /" + Or.source + "/."),
      type: Os.REDUNDANT_METHOD,
      methodName: r
    });
  return t;
}
var jf = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initTreeBuilder = function(e) {
      if (this.LAST_EXPLICIT_RULE_STACK = [], this.CST_STACK = [], this.outputCst = U(e, "outputCst") ? e.outputCst : Be.outputCst, this.nodeLocationTracking = U(e, "nodeLocationTracking") ? e.nodeLocationTracking : Be.nodeLocationTracking, !this.outputCst)
        this.cstInvocationStateUpdate = Re, this.cstFinallyStateUpdate = Re, this.cstPostTerminal = Re, this.cstPostNonTerminal = Re, this.cstPostRule = Re, this.getLastExplicitRuleShortName = this.getLastExplicitRuleShortNameNoCst, this.getPreviousExplicitRuleShortName = this.getPreviousExplicitRuleShortNameNoCst, this.getLastExplicitRuleOccurrenceIndex = this.getLastExplicitRuleOccurrenceIndexNoCst, this.manyInternal = this.manyInternalNoCst, this.orInternal = this.orInternalNoCst, this.optionInternal = this.optionInternalNoCst, this.atLeastOneInternal = this.atLeastOneInternalNoCst, this.manySepFirstInternal = this.manySepFirstInternalNoCst, this.atLeastOneSepFirstInternal = this.atLeastOneSepFirstInternalNoCst;
      else if (/full/i.test(this.nodeLocationTracking))
        this.recoveryEnabled ? (this.setNodeLocationFromToken = Eo, this.setNodeLocationFromNode = Eo, this.cstPostRule = Re, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = Re, this.setNodeLocationFromNode = Re, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
      else if (/onlyOffset/i.test(this.nodeLocationTracking))
        this.recoveryEnabled ? (this.setNodeLocationFromToken = go, this.setNodeLocationFromNode = go, this.cstPostRule = Re, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = Re, this.setNodeLocationFromNode = Re, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
      else if (/none/i.test(this.nodeLocationTracking))
        this.setNodeLocationFromToken = Re, this.setNodeLocationFromNode = Re, this.cstPostRule = Re, this.setInitialNodeLocation = Re;
      else
        throw Error('Invalid <nodeLocationTracking> config option: "' + e.nodeLocationTracking + '"');
    }, s.prototype.setInitialNodeLocationOnlyOffsetRecovery = function(e) {
      e.location = {
        startOffset: NaN,
        endOffset: NaN
      };
    }, s.prototype.setInitialNodeLocationOnlyOffsetRegular = function(e) {
      e.location = {
        // without error recovery the starting Location of a new CstNode is guaranteed
        // To be the next Token's startOffset (for valid inputs).
        // For invalid inputs there won't be any CSTOutput so this potential
        // inaccuracy does not matter
        startOffset: this.LA(1).startOffset,
        endOffset: NaN
      };
    }, s.prototype.setInitialNodeLocationFullRecovery = function(e) {
      e.location = {
        startOffset: NaN,
        startLine: NaN,
        startColumn: NaN,
        endOffset: NaN,
        endLine: NaN,
        endColumn: NaN
      };
    }, s.prototype.setInitialNodeLocationFullRegular = function(e) {
      var t = this.LA(1);
      e.location = {
        startOffset: t.startOffset,
        startLine: t.startLine,
        startColumn: t.startColumn,
        endOffset: NaN,
        endLine: NaN,
        endColumn: NaN
      };
    }, s.prototype.cstNestedInvocationStateUpdate = function(e, t) {
      var r = {
        name: e,
        fullName: this.shortRuleNameToFull[this.getLastExplicitRuleShortName()] + e,
        children: {}
      };
      this.setInitialNodeLocation(r), this.CST_STACK.push(r);
    }, s.prototype.cstInvocationStateUpdate = function(e, t) {
      this.LAST_EXPLICIT_RULE_STACK.push(this.RULE_STACK.length - 1);
      var r = {
        name: e,
        children: {}
      };
      this.setInitialNodeLocation(r), this.CST_STACK.push(r);
    }, s.prototype.cstFinallyStateUpdate = function() {
      this.LAST_EXPLICIT_RULE_STACK.pop(), this.CST_STACK.pop();
    }, s.prototype.cstNestedFinallyStateUpdate = function() {
      var e = this.CST_STACK.pop();
      this.cstPostRule(e);
    }, s.prototype.cstPostRuleFull = function(e) {
      var t = this.LA(0), r = e.location;
      r.startOffset <= t.startOffset ? (r.endOffset = t.endOffset, r.endLine = t.endLine, r.endColumn = t.endColumn) : (r.startOffset = NaN, r.startLine = NaN, r.startColumn = NaN);
    }, s.prototype.cstPostRuleOnlyOffset = function(e) {
      var t = this.LA(0), r = e.location;
      r.startOffset <= t.startOffset ? r.endOffset = t.endOffset : r.startOffset = NaN;
    }, s.prototype.cstPostTerminal = function(e, t) {
      var r = this.CST_STACK[this.CST_STACK.length - 1];
      qd(r, t, e), this.setNodeLocationFromToken(r.location, t);
    }, s.prototype.cstPostNonTerminal = function(e, t) {
      if (this.isBackTracking() !== !0) {
        var r = this.CST_STACK[this.CST_STACK.length - 1];
        Ro(r, t, e), this.setNodeLocationFromNode(r.location, e.location);
      }
    }, s.prototype.getBaseCstVisitorConstructor = function() {
      if (ht(this.baseCstVisitorConstructor)) {
        var e = Wf(this.className, this.allRuleNames);
        return this.baseCstVisitorConstructor = e, e;
      }
      return this.baseCstVisitorConstructor;
    }, s.prototype.getBaseCstVisitorConstructorWithDefaults = function() {
      if (ht(this.baseCstVisitorWithDefaultsConstructor)) {
        var e = Yf(this.className, this.allRuleNames, this.getBaseCstVisitorConstructor());
        return this.baseCstVisitorWithDefaultsConstructor = e, e;
      }
      return this.baseCstVisitorWithDefaultsConstructor;
    }, s.prototype.nestedRuleBeforeClause = function(e, t) {
      var r;
      if (e.NAME !== void 0)
        return r = e.NAME, this.nestedRuleInvocationStateUpdate(r, t), r;
    }, s.prototype.nestedAltBeforeClause = function(e, t, r, n) {
      var i = this.getLastExplicitRuleShortName(), a = $u(i, r, t, n), o;
      if (e.NAME !== void 0)
        return o = e.NAME, this.nestedRuleInvocationStateUpdate(o, a), {
          shortName: a,
          nestedName: o
        };
    }, s.prototype.nestedRuleFinallyClause = function(e, t) {
      var r = this.CST_STACK, n = r[r.length - 1];
      this.nestedRuleFinallyStateUpdate();
      var i = r[r.length - 1];
      Ro(i, t, n), this.setNodeLocationFromNode(i.location, n.location);
    }, s.prototype.getLastExplicitRuleShortName = function() {
      var e = this.LAST_EXPLICIT_RULE_STACK[this.LAST_EXPLICIT_RULE_STACK.length - 1];
      return this.RULE_STACK[e];
    }, s.prototype.getLastExplicitRuleShortNameNoCst = function() {
      var e = this.RULE_STACK;
      return e[e.length - 1];
    }, s.prototype.getPreviousExplicitRuleShortName = function() {
      var e = this.LAST_EXPLICIT_RULE_STACK[this.LAST_EXPLICIT_RULE_STACK.length - 2];
      return this.RULE_STACK[e];
    }, s.prototype.getPreviousExplicitRuleShortNameNoCst = function() {
      var e = this.RULE_STACK;
      return e[e.length - 2];
    }, s.prototype.getLastExplicitRuleOccurrenceIndex = function() {
      var e = this.LAST_EXPLICIT_RULE_STACK[this.LAST_EXPLICIT_RULE_STACK.length - 1];
      return this.RULE_OCCURRENCE_STACK[e];
    }, s.prototype.getLastExplicitRuleOccurrenceIndexNoCst = function() {
      var e = this.RULE_OCCURRENCE_STACK;
      return e[e.length - 1];
    }, s.prototype.nestedRuleInvocationStateUpdate = function(e, t) {
      this.RULE_OCCURRENCE_STACK.push(1), this.RULE_STACK.push(t), this.cstNestedInvocationStateUpdate(e, t);
    }, s.prototype.nestedRuleFinallyStateUpdate = function() {
      this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstNestedFinallyStateUpdate();
    }, s;
  })()
), qf = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initLexerAdapter = function() {
      this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
    }, Object.defineProperty(s.prototype, "input", {
      get: function() {
        return this.tokVector;
      },
      set: function(e) {
        if (this.selfAnalysisDone !== !0)
          throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
        this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
      },
      enumerable: !0,
      configurable: !0
    }), s.prototype.SKIP_TOKEN = function() {
      return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : ws;
    }, s.prototype.LA = function(e) {
      var t = this.currIdx + e;
      return t < 0 || this.tokVectorLength <= t ? ws : this.tokVector[t];
    }, s.prototype.consumeToken = function() {
      this.currIdx++;
    }, s.prototype.exportLexerState = function() {
      return this.currIdx;
    }, s.prototype.importLexerState = function(e) {
      this.currIdx = e;
    }, s.prototype.resetLexerState = function() {
      this.currIdx = -1;
    }, s.prototype.moveToTerminatedState = function() {
      this.currIdx = this.tokVector.length - 1;
    }, s.prototype.getLexerPosition = function() {
      return this.exportLexerState();
    }, s;
  })()
), Qf = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.ACTION = function(e) {
      return e.call(this);
    }, s.prototype.consume = function(e, t, r) {
      return this.consumeInternal(t, e, r);
    }, s.prototype.subrule = function(e, t, r) {
      return this.subruleInternal(t, e, r);
    }, s.prototype.option = function(e, t) {
      return this.optionInternal(t, e);
    }, s.prototype.or = function(e, t) {
      return this.orInternal(t, e);
    }, s.prototype.many = function(e, t) {
      return this.manyInternal(e, t);
    }, s.prototype.atLeastOne = function(e, t) {
      return this.atLeastOneInternal(e, t);
    }, s.prototype.CONSUME = function(e, t) {
      return this.consumeInternal(e, 0, t);
    }, s.prototype.CONSUME1 = function(e, t) {
      return this.consumeInternal(e, 1, t);
    }, s.prototype.CONSUME2 = function(e, t) {
      return this.consumeInternal(e, 2, t);
    }, s.prototype.CONSUME3 = function(e, t) {
      return this.consumeInternal(e, 3, t);
    }, s.prototype.CONSUME4 = function(e, t) {
      return this.consumeInternal(e, 4, t);
    }, s.prototype.CONSUME5 = function(e, t) {
      return this.consumeInternal(e, 5, t);
    }, s.prototype.CONSUME6 = function(e, t) {
      return this.consumeInternal(e, 6, t);
    }, s.prototype.CONSUME7 = function(e, t) {
      return this.consumeInternal(e, 7, t);
    }, s.prototype.CONSUME8 = function(e, t) {
      return this.consumeInternal(e, 8, t);
    }, s.prototype.CONSUME9 = function(e, t) {
      return this.consumeInternal(e, 9, t);
    }, s.prototype.SUBRULE = function(e, t) {
      return this.subruleInternal(e, 0, t);
    }, s.prototype.SUBRULE1 = function(e, t) {
      return this.subruleInternal(e, 1, t);
    }, s.prototype.SUBRULE2 = function(e, t) {
      return this.subruleInternal(e, 2, t);
    }, s.prototype.SUBRULE3 = function(e, t) {
      return this.subruleInternal(e, 3, t);
    }, s.prototype.SUBRULE4 = function(e, t) {
      return this.subruleInternal(e, 4, t);
    }, s.prototype.SUBRULE5 = function(e, t) {
      return this.subruleInternal(e, 5, t);
    }, s.prototype.SUBRULE6 = function(e, t) {
      return this.subruleInternal(e, 6, t);
    }, s.prototype.SUBRULE7 = function(e, t) {
      return this.subruleInternal(e, 7, t);
    }, s.prototype.SUBRULE8 = function(e, t) {
      return this.subruleInternal(e, 8, t);
    }, s.prototype.SUBRULE9 = function(e, t) {
      return this.subruleInternal(e, 9, t);
    }, s.prototype.OPTION = function(e) {
      return this.optionInternal(e, 0);
    }, s.prototype.OPTION1 = function(e) {
      return this.optionInternal(e, 1);
    }, s.prototype.OPTION2 = function(e) {
      return this.optionInternal(e, 2);
    }, s.prototype.OPTION3 = function(e) {
      return this.optionInternal(e, 3);
    }, s.prototype.OPTION4 = function(e) {
      return this.optionInternal(e, 4);
    }, s.prototype.OPTION5 = function(e) {
      return this.optionInternal(e, 5);
    }, s.prototype.OPTION6 = function(e) {
      return this.optionInternal(e, 6);
    }, s.prototype.OPTION7 = function(e) {
      return this.optionInternal(e, 7);
    }, s.prototype.OPTION8 = function(e) {
      return this.optionInternal(e, 8);
    }, s.prototype.OPTION9 = function(e) {
      return this.optionInternal(e, 9);
    }, s.prototype.OR = function(e) {
      return this.orInternal(e, 0);
    }, s.prototype.OR1 = function(e) {
      return this.orInternal(e, 1);
    }, s.prototype.OR2 = function(e) {
      return this.orInternal(e, 2);
    }, s.prototype.OR3 = function(e) {
      return this.orInternal(e, 3);
    }, s.prototype.OR4 = function(e) {
      return this.orInternal(e, 4);
    }, s.prototype.OR5 = function(e) {
      return this.orInternal(e, 5);
    }, s.prototype.OR6 = function(e) {
      return this.orInternal(e, 6);
    }, s.prototype.OR7 = function(e) {
      return this.orInternal(e, 7);
    }, s.prototype.OR8 = function(e) {
      return this.orInternal(e, 8);
    }, s.prototype.OR9 = function(e) {
      return this.orInternal(e, 9);
    }, s.prototype.MANY = function(e) {
      this.manyInternal(0, e);
    }, s.prototype.MANY1 = function(e) {
      this.manyInternal(1, e);
    }, s.prototype.MANY2 = function(e) {
      this.manyInternal(2, e);
    }, s.prototype.MANY3 = function(e) {
      this.manyInternal(3, e);
    }, s.prototype.MANY4 = function(e) {
      this.manyInternal(4, e);
    }, s.prototype.MANY5 = function(e) {
      this.manyInternal(5, e);
    }, s.prototype.MANY6 = function(e) {
      this.manyInternal(6, e);
    }, s.prototype.MANY7 = function(e) {
      this.manyInternal(7, e);
    }, s.prototype.MANY8 = function(e) {
      this.manyInternal(8, e);
    }, s.prototype.MANY9 = function(e) {
      this.manyInternal(9, e);
    }, s.prototype.MANY_SEP = function(e) {
      this.manySepFirstInternal(0, e);
    }, s.prototype.MANY_SEP1 = function(e) {
      this.manySepFirstInternal(1, e);
    }, s.prototype.MANY_SEP2 = function(e) {
      this.manySepFirstInternal(2, e);
    }, s.prototype.MANY_SEP3 = function(e) {
      this.manySepFirstInternal(3, e);
    }, s.prototype.MANY_SEP4 = function(e) {
      this.manySepFirstInternal(4, e);
    }, s.prototype.MANY_SEP5 = function(e) {
      this.manySepFirstInternal(5, e);
    }, s.prototype.MANY_SEP6 = function(e) {
      this.manySepFirstInternal(6, e);
    }, s.prototype.MANY_SEP7 = function(e) {
      this.manySepFirstInternal(7, e);
    }, s.prototype.MANY_SEP8 = function(e) {
      this.manySepFirstInternal(8, e);
    }, s.prototype.MANY_SEP9 = function(e) {
      this.manySepFirstInternal(9, e);
    }, s.prototype.AT_LEAST_ONE = function(e) {
      this.atLeastOneInternal(0, e);
    }, s.prototype.AT_LEAST_ONE1 = function(e) {
      return this.atLeastOneInternal(1, e);
    }, s.prototype.AT_LEAST_ONE2 = function(e) {
      this.atLeastOneInternal(2, e);
    }, s.prototype.AT_LEAST_ONE3 = function(e) {
      this.atLeastOneInternal(3, e);
    }, s.prototype.AT_LEAST_ONE4 = function(e) {
      this.atLeastOneInternal(4, e);
    }, s.prototype.AT_LEAST_ONE5 = function(e) {
      this.atLeastOneInternal(5, e);
    }, s.prototype.AT_LEAST_ONE6 = function(e) {
      this.atLeastOneInternal(6, e);
    }, s.prototype.AT_LEAST_ONE7 = function(e) {
      this.atLeastOneInternal(7, e);
    }, s.prototype.AT_LEAST_ONE8 = function(e) {
      this.atLeastOneInternal(8, e);
    }, s.prototype.AT_LEAST_ONE9 = function(e) {
      this.atLeastOneInternal(9, e);
    }, s.prototype.AT_LEAST_ONE_SEP = function(e) {
      this.atLeastOneSepFirstInternal(0, e);
    }, s.prototype.AT_LEAST_ONE_SEP1 = function(e) {
      this.atLeastOneSepFirstInternal(1, e);
    }, s.prototype.AT_LEAST_ONE_SEP2 = function(e) {
      this.atLeastOneSepFirstInternal(2, e);
    }, s.prototype.AT_LEAST_ONE_SEP3 = function(e) {
      this.atLeastOneSepFirstInternal(3, e);
    }, s.prototype.AT_LEAST_ONE_SEP4 = function(e) {
      this.atLeastOneSepFirstInternal(4, e);
    }, s.prototype.AT_LEAST_ONE_SEP5 = function(e) {
      this.atLeastOneSepFirstInternal(5, e);
    }, s.prototype.AT_LEAST_ONE_SEP6 = function(e) {
      this.atLeastOneSepFirstInternal(6, e);
    }, s.prototype.AT_LEAST_ONE_SEP7 = function(e) {
      this.atLeastOneSepFirstInternal(7, e);
    }, s.prototype.AT_LEAST_ONE_SEP8 = function(e) {
      this.atLeastOneSepFirstInternal(8, e);
    }, s.prototype.AT_LEAST_ONE_SEP9 = function(e) {
      this.atLeastOneSepFirstInternal(9, e);
    }, s.prototype.RULE = function(e, t, r) {
      if (r === void 0 && (r = _s), Ee(this.definedRulesNames, e)) {
        var n = Aa.buildDuplicateRuleNameError({
          topLevelRule: e,
          grammarName: this.className
        }), i = {
          message: n,
          type: Ae.DUPLICATE_RULE_NAME,
          ruleName: e
        };
        this.definitionErrors.push(i);
      }
      this.definedRulesNames.push(e);
      var a = this.defineRule(e, t, r);
      return this[e] = a, a;
    }, s.prototype.OVERRIDE_RULE = function(e, t, r) {
      r === void 0 && (r = _s);
      var n = [];
      n = n.concat(Sf(e, this.definedRulesNames, this.className)), this.definitionErrors.push.apply(this.definitionErrors, n);
      var i = this.defineRule(e, t, r);
      return this[e] = i, i;
    }, s.prototype.BACKTRACK = function(e, t) {
      return function() {
        this.isBackTrackingStack.push(1);
        var r = this.saveRecogState();
        try {
          return e.apply(this, t), !0;
        } catch (n) {
          if (Is(n))
            return !1;
          throw n;
        } finally {
          this.reloadRecogState(r), this.isBackTrackingStack.pop();
        }
      };
    }, s.prototype.getGAstProductions = function() {
      return this.gastProductionsCache;
    }, s.prototype.getSerializedGastProductions = function() {
      return Ud(Fe(this.gastProductionsCache));
    }, s;
  })()
), Zf = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initRecognizerEngine = function(e, t) {
      if (this.className = kf(this), this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = ys, this.definedRulesNames = [], this.tokensMap = {}, this.allRuleNames = [], this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, U(t, "serializedGrammar"))
        throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
      if (Nt(e)) {
        if (q(e))
          throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
        if (typeof e[0].startOffset == "number")
          throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
      }
      if (Nt(e))
        this.tokensMap = Oe(e, function(a, o) {
          return a[o.name] = o, a;
        }, {});
      else if (U(e, "modes") && ot(We(Fe(e.modes)), wd)) {
        var r = We(Fe(e.modes)), n = da(r);
        this.tokensMap = Oe(n, function(a, o) {
          return a[o.name] = o, a;
        }, {});
      } else if (fa(e))
        this.tokensMap = Ln(e);
      else
        throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
      this.tokensMap.EOF = Ir;
      var i = ot(Fe(e), function(a) {
        return q(a.categoryMatches);
      });
      this.tokenMatcher = i ? ys : Zs, xn(Fe(this.tokensMap));
    }, s.prototype.defineRule = function(e, t, r) {
      if (this.selfAnalysisDone)
        throw Error("Grammar rule <" + e + `> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
      var n = U(r, "resyncEnabled") ? r.resyncEnabled : _s.resyncEnabled, i = U(r, "recoveryValueFunc") ? r.recoveryValueFunc : _s.recoveryValueFunc, a = this.ruleShortNameIdx << Xd + ur;
      this.ruleShortNameIdx++, this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a;
      function o(c) {
        try {
          if (this.outputCst === !0) {
            t.apply(this, c);
            var d = this.CST_STACK[this.CST_STACK.length - 1];
            return this.cstPostRule(d), d;
          } else
            return t.apply(this, c);
        } catch (p) {
          return this.invokeRuleCatch(p, n, i);
        } finally {
          this.ruleFinallyStateUpdate();
        }
      }
      var u;
      u = function(c, d) {
        return c === void 0 && (c = 0), this.ruleInvocationStateUpdate(a, e, c), o.call(this, d);
      };
      var l = "ruleName";
      return u[l] = e, u.originalGrammarAction = t, u;
    }, s.prototype.invokeRuleCatch = function(e, t, r) {
      var n = this.RULE_STACK.length === 1, i = t && !this.isBackTracking() && this.recoveryEnabled;
      if (Is(e)) {
        var a = e;
        if (i) {
          var o = this.findReSyncTokenType();
          if (this.isInCurrentRuleReSyncSet(o))
            if (a.resyncedTokens = this.reSyncTo(o), this.outputCst) {
              var u = this.CST_STACK[this.CST_STACK.length - 1];
              return u.recoveredNode = !0, u;
            } else
              return r();
          else {
            if (this.outputCst) {
              var u = this.CST_STACK[this.CST_STACK.length - 1];
              u.recoveredNode = !0, a.partialCstResult = u;
            }
            throw a;
          }
        } else {
          if (n)
            return this.moveToTerminatedState(), r();
          throw a;
        }
      } else
        throw e;
    }, s.prototype.optionInternal = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(Cs, t), n = this.nestedRuleBeforeClause(e, r);
      try {
        return this.optionInternalLogic(e, t, r);
      } finally {
        n !== void 0 && this.nestedRuleFinallyClause(r, n);
      }
    }, s.prototype.optionInternalNoCst = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(Cs, t);
      return this.optionInternalLogic(e, t, r);
    }, s.prototype.optionInternalLogic = function(e, t, r) {
      var n = this, i = this.getLaFuncFromCache(r), a, o;
      if (e.DEF !== void 0) {
        if (a = e.DEF, o = e.GATE, o !== void 0) {
          var u = i;
          i = function() {
            return o.call(n) && u.call(n);
          };
        }
      } else
        a = e;
      if (i.call(this) === !0)
        return a.call(this);
    }, s.prototype.atLeastOneInternal = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(dn, e), n = this.nestedRuleBeforeClause(t, r);
      try {
        return this.atLeastOneInternalLogic(e, t, r);
      } finally {
        n !== void 0 && this.nestedRuleFinallyClause(r, n);
      }
    }, s.prototype.atLeastOneInternalNoCst = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(dn, e);
      this.atLeastOneInternalLogic(e, t, r);
    }, s.prototype.atLeastOneInternalLogic = function(e, t, r) {
      var n = this, i = this.getLaFuncFromCache(r), a, o;
      if (t.DEF !== void 0) {
        if (a = t.DEF, o = t.GATE, o !== void 0) {
          var u = i;
          i = function() {
            return o.call(n) && u.call(n);
          };
        }
      } else
        a = t;
      if (i.call(this) === !0)
        for (var l = this.doSingleRepetition(a); i.call(this) === !0 && l === !0; )
          l = this.doSingleRepetition(a);
      else
        throw this.raiseEarlyExitException(e, Q.REPETITION_MANDATORY, t.ERR_MSG);
      this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, t], i, dn, e, tf);
    }, s.prototype.atLeastOneSepFirstInternal = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(kr, e), n = this.nestedRuleBeforeClause(t, r);
      try {
        this.atLeastOneSepFirstInternalLogic(e, t, r);
      } finally {
        n !== void 0 && this.nestedRuleFinallyClause(r, n);
      }
    }, s.prototype.atLeastOneSepFirstInternalNoCst = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(kr, e);
      this.atLeastOneSepFirstInternalLogic(e, t, r);
    }, s.prototype.atLeastOneSepFirstInternalLogic = function(e, t, r) {
      var n = this, i = t.DEF, a = t.SEP, o = this.getLaFuncFromCache(r);
      if (o.call(this) === !0) {
        i.call(this);
        for (var u = function() {
          return n.tokenMatcher(n.LA(1), a);
        }; this.tokenMatcher(this.LA(1), a) === !0; )
          this.CONSUME(a), i.call(this);
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
          e,
          a,
          u,
          i,
          To
        ], u, kr, e, To);
      } else
        throw this.raiseEarlyExitException(e, Q.REPETITION_MANDATORY_WITH_SEPARATOR, t.ERR_MSG);
    }, s.prototype.manyInternal = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(cn, e), n = this.nestedRuleBeforeClause(t, r);
      try {
        return this.manyInternalLogic(e, t, r);
      } finally {
        n !== void 0 && this.nestedRuleFinallyClause(r, n);
      }
    }, s.prototype.manyInternalNoCst = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(cn, e);
      return this.manyInternalLogic(e, t, r);
    }, s.prototype.manyInternalLogic = function(e, t, r) {
      var n = this, i = this.getLaFuncFromCache(r), a, o;
      if (t.DEF !== void 0) {
        if (a = t.DEF, o = t.GATE, o !== void 0) {
          var u = i;
          i = function() {
            return o.call(n) && u.call(n);
          };
        }
      } else
        a = t;
      for (var l = !0; i.call(this) === !0 && l === !0; )
        l = this.doSingleRepetition(a);
      this.attemptInRepetitionRecovery(
        this.manyInternal,
        [e, t],
        i,
        cn,
        e,
        ef,
        // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
        // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
        // An infinite loop cannot occur as:
        // - Either the lookahead is guaranteed to consume something (Single Token Separator)
        // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
        l
      );
    }, s.prototype.manySepFirstInternal = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(fn, e), n = this.nestedRuleBeforeClause(t, r);
      try {
        this.manySepFirstInternalLogic(e, t, r);
      } finally {
        n !== void 0 && this.nestedRuleFinallyClause(r, n);
      }
    }, s.prototype.manySepFirstInternalNoCst = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(fn, e);
      this.manySepFirstInternalLogic(e, t, r);
    }, s.prototype.manySepFirstInternalLogic = function(e, t, r) {
      var n = this, i = t.DEF, a = t.SEP, o = this.getLaFuncFromCache(r);
      if (o.call(this) === !0) {
        i.call(this);
        for (var u = function() {
          return n.tokenMatcher(n.LA(1), a);
        }; this.tokenMatcher(this.LA(1), a) === !0; )
          this.CONSUME(a), i.call(this);
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
          e,
          a,
          u,
          i,
          No
        ], u, fn, e, No);
      }
    }, s.prototype.repetitionSepSecondInternal = function(e, t, r, n, i) {
      for (; r(); )
        this.CONSUME(t), n.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        t,
        r,
        n,
        i
      ], r, kr, e, i);
    }, s.prototype.doSingleRepetition = function(e) {
      var t = this.getLexerPosition();
      e.call(this);
      var r = this.getLexerPosition();
      return r > t;
    }, s.prototype.orInternalNoCst = function(e, t) {
      var r = Nt(e) ? e : e.DEF, n = this.getKeyForAutomaticLookahead(zr, t), i = this.getLaFuncFromCache(n), a = i.call(this, r);
      if (a !== void 0) {
        var o = r[a];
        return o.ALT.call(this);
      }
      this.raiseNoAltException(t, e.ERR_MSG);
    }, s.prototype.orInternal = function(e, t) {
      var r = this.getKeyForAutomaticLookahead(zr, t), n = this.nestedRuleBeforeClause(e, r);
      try {
        var i = Nt(e) ? e : e.DEF, a = this.getLaFuncFromCache(r), o = a.call(this, i);
        if (o !== void 0) {
          var u = i[o], l = this.nestedAltBeforeClause(u, t, zr, o);
          try {
            return u.ALT.call(this);
          } finally {
            l !== void 0 && this.nestedRuleFinallyClause(l.shortName, l.nestedName);
          }
        }
        this.raiseNoAltException(t, e.ERR_MSG);
      } finally {
        n !== void 0 && this.nestedRuleFinallyClause(r, n);
      }
    }, s.prototype.ruleFinallyStateUpdate = function() {
      if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === !1) {
        var e = this.LA(1), t = this.errorMessageProvider.buildNotAllInputParsedMessage({
          firstRedundant: e,
          ruleName: this.getCurrRuleFullName()
        });
        this.SAVE_ERROR(new hh(t, e));
      }
    }, s.prototype.subruleInternal = function(e, t, r) {
      var n;
      try {
        var i = r !== void 0 ? r.ARGS : void 0;
        return n = e.call(this, t, i), this.cstPostNonTerminal(n, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), n;
      } catch (a) {
        this.subruleInternalError(a, r, e.ruleName);
      }
    }, s.prototype.subruleInternalError = function(e, t, r) {
      throw Is(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, t !== void 0 && t.LABEL !== void 0 ? t.LABEL : r), delete e.partialCstResult), e;
    }, s.prototype.consumeInternal = function(e, t, r) {
      var n;
      try {
        var i = this.LA(1);
        this.tokenMatcher(i, e) === !0 ? (this.consumeToken(), n = i) : this.consumeInternalError(e, i, r);
      } catch (a) {
        n = this.consumeInternalRecovery(e, t, a);
      }
      return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, n), n;
    }, s.prototype.consumeInternalError = function(e, t, r) {
      var n, i = this.LA(0);
      throw r !== void 0 && r.ERR_MSG ? n = r.ERR_MSG : n = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: e,
        actual: t,
        previous: i,
        ruleName: this.getCurrRuleFullName()
      }), this.SAVE_ERROR(new ya(n, t, i));
    }, s.prototype.consumeInternalRecovery = function(e, t, r) {
      if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
      r.name === "MismatchedTokenException" && !this.isBackTracking()) {
        var n = this.getFollowsForInRuleRecovery(e, t);
        try {
          return this.tryInRuleRecovery(e, n);
        } catch (i) {
          throw i.name === ch ? r : i;
        }
      } else
        throw r;
    }, s.prototype.saveRecogState = function() {
      var e = this.errors, t = Ye(this.RULE_STACK);
      return {
        errors: e,
        lexerState: this.exportLexerState(),
        RULE_STACK: t,
        CST_STACK: this.CST_STACK,
        LAST_EXPLICIT_RULE_STACK: this.LAST_EXPLICIT_RULE_STACK
      };
    }, s.prototype.reloadRecogState = function(e) {
      this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
    }, s.prototype.ruleInvocationStateUpdate = function(e, t, r) {
      this.RULE_OCCURRENCE_STACK.push(r), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(t, e);
    }, s.prototype.isBackTracking = function() {
      return this.isBackTrackingStack.length !== 0;
    }, s.prototype.getCurrRuleFullName = function() {
      var e = this.getLastExplicitRuleShortName();
      return this.shortRuleNameToFull[e];
    }, s.prototype.shortRuleNameToFullName = function(e) {
      return this.shortRuleNameToFull[e];
    }, s.prototype.isAtEndOfInput = function() {
      return this.tokenMatcher(this.LA(1), Ir);
    }, s.prototype.reset = function() {
      this.resetLexerState(), this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.LAST_EXPLICIT_RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
    }, s;
  })()
), Jf = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initErrorHandler = function(e) {
      this._errors = [], this.errorMessageProvider = qs(e.errorMessageProvider, Be.errorMessageProvider);
    }, s.prototype.SAVE_ERROR = function(e) {
      if (Is(e))
        return e.context = {
          ruleStack: this.getHumanReadableRuleStack(),
          ruleOccurrenceStack: Ye(this.RULE_OCCURRENCE_STACK)
        }, this._errors.push(e), e;
      throw Error("Trying to save an Error which is not a RecognitionException");
    }, Object.defineProperty(s.prototype, "errors", {
      // TODO: extract these methods to ErrorHandler Trait?
      get: function() {
        return Ye(this._errors);
      },
      set: function(e) {
        this._errors = e;
      },
      enumerable: !0,
      configurable: !0
    }), s.prototype.raiseEarlyExitException = function(e, t, r) {
      for (var n = this.getCurrRuleFullName(), i = this.getGAstProductions()[n], a = Na(e, i, t, this.maxLookahead), o = a[0], u = [], l = 1; l <= this.maxLookahead; l++)
        u.push(this.LA(l));
      var c = this.errorMessageProvider.buildEarlyExitMessage({
        expectedIterationPaths: o,
        actual: u,
        previous: this.LA(0),
        customUserDescription: r,
        ruleName: n
      });
      throw this.SAVE_ERROR(new lh(c, this.LA(1), this.LA(0)));
    }, s.prototype.raiseNoAltException = function(e, t) {
      for (var r = this.getCurrRuleFullName(), n = this.getGAstProductions()[r], i = Ra(e, n, this.maxLookahead), a = [], o = 1; o <= this.maxLookahead; o++)
        a.push(this.LA(o));
      var u = this.LA(0), l = this.errorMessageProvider.buildNoViableAltMessage({
        expectedPathsPerAlt: i,
        actual: a,
        previous: u,
        customUserDescription: t,
        ruleName: this.getCurrRuleFullName()
      });
      throw this.SAVE_ERROR(new uh(l, this.LA(1), u));
    }, s;
  })()
), ep = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initContentAssist = function() {
    }, s.prototype.computeContentAssist = function(e, t) {
      var r = this.gastProductionsCache[e];
      if (ht(r))
        throw Error("Rule ->" + e + "<- does not exist in this grammar.");
      return Ku([r], t, this.tokenMatcher, this.maxLookahead);
    }, s.prototype.getNextPossibleTokenTypes = function(e) {
      var t = ut(e.ruleStack), r = this.getGAstProductions(), n = r[t], i = new Jd(n, e).startWalking();
      return i;
    }, s;
  })()
), ri = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(ri);
var yo = !0, vo = Math.pow(2, ur) - 1, ph = H({ name: "RECORDING_PHASE_TOKEN", pattern: He.NA });
xn([ph]);
var mh = ga(
  ph,
  `This IToken indicates the Parser is in Recording Phase
	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details`,
  // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
  // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
);
Object.freeze(mh);
var tp = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details`,
  children: {}
}, rp = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initGastRecorder = function(e) {
      this.recordingProdStack = [], this.RECORDING_PHASE = !1;
    }, s.prototype.enableRecording = function() {
      var e = this;
      this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", function() {
        for (var t = function(n) {
          var i = n > 0 ? n : "";
          e["CONSUME" + i] = function(a, o) {
            return this.consumeInternalRecord(a, n, o);
          }, e["SUBRULE" + i] = function(a, o) {
            return this.subruleInternalRecord(a, n, o);
          }, e["OPTION" + i] = function(a) {
            return this.optionInternalRecord(a, n);
          }, e["OR" + i] = function(a) {
            return this.orInternalRecord(a, n);
          }, e["MANY" + i] = function(a) {
            this.manyInternalRecord(n, a);
          }, e["MANY_SEP" + i] = function(a) {
            this.manySepFirstInternalRecord(n, a);
          }, e["AT_LEAST_ONE" + i] = function(a) {
            this.atLeastOneInternalRecord(n, a);
          }, e["AT_LEAST_ONE_SEP" + i] = function(a) {
            this.atLeastOneSepFirstInternalRecord(n, a);
          };
        }, r = 0; r < 10; r++)
          t(r);
        e.consume = function(n, i, a) {
          return this.consumeInternalRecord(i, n, a);
        }, e.subrule = function(n, i, a) {
          return this.subruleInternalRecord(i, n, a);
        }, e.option = function(n, i) {
          return this.optionInternalRecord(i, n);
        }, e.or = function(n, i) {
          return this.orInternalRecord(i, n);
        }, e.many = function(n, i) {
          this.manyInternalRecord(n, i);
        }, e.atLeastOne = function(n, i) {
          this.atLeastOneInternalRecord(n, i);
        }, e.ACTION = e.ACTION_RECORD, e.BACKTRACK = e.BACKTRACK_RECORD, e.LA = e.LA_RECORD;
      });
    }, s.prototype.disableRecording = function() {
      var e = this;
      this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", function() {
        for (var t = 0; t < 10; t++) {
          var r = t > 0 ? t : "";
          delete e["CONSUME" + r], delete e["SUBRULE" + r], delete e["OPTION" + r], delete e["OR" + r], delete e["MANY" + r], delete e["MANY_SEP" + r], delete e["AT_LEAST_ONE" + r], delete e["AT_LEAST_ONE_SEP" + r];
        }
        delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
      });
    }, s.prototype.ACTION_RECORD = function(e) {
    }, s.prototype.BACKTRACK_RECORD = function(e, t) {
      return function() {
        return !0;
      };
    }, s.prototype.LA_RECORD = function(e) {
      return ws;
    }, s.prototype.topLevelRuleRecord = function(e, t) {
      try {
        var r = new en({ definition: [], name: e });
        return r.name = e, this.recordingProdStack.push(r), t.call(this), this.recordingProdStack.pop(), r;
      } catch (n) {
        if (n.KNOWN_RECORDER_ERROR !== !0)
          try {
            n.message = n.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording`;
          } catch (i) {
            throw n;
          }
        throw n;
      }
    }, s.prototype.optionInternalRecord = function(e, t) {
      return sn.call(this, Ie, e, t);
    }, s.prototype.atLeastOneInternalRecord = function(e, t) {
      sn.call(this, lt, t, e);
    }, s.prototype.atLeastOneSepFirstInternalRecord = function(e, t) {
      sn.call(this, ct, t, e, yo);
    }, s.prototype.manyInternalRecord = function(e, t) {
      sn.call(this, ce, t, e);
    }, s.prototype.manySepFirstInternalRecord = function(e, t) {
      sn.call(this, Je, t, e, yo);
    }, s.prototype.orInternalRecord = function(e, t) {
      return np.call(this, e, t);
    }, s.prototype.subruleInternalRecord = function(e, t, r) {
      if (Ms(t), !e || U(e, "ruleName") === !1) {
        var n = new Error("<SUBRULE" + Co(t) + "> argument is invalid" + (" expecting a Parser method reference but got: <" + JSON.stringify(e) + ">") + (`
 inside top level rule: <` + this.recordingProdStack[0].name + ">"));
        throw n.KNOWN_RECORDER_ERROR = !0, n;
      }
      var i = Ss(this.recordingProdStack), a = e.ruleName, o = new Ze({
        idx: t,
        nonTerminalName: a,
        // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
        referencedRule: void 0
      });
      return i.definition.push(o), this.outputCst ? tp : ri;
    }, s.prototype.consumeInternalRecord = function(e, t, r) {
      if (Ms(t), !Yu(e)) {
        var n = new Error("<CONSUME" + Co(t) + "> argument is invalid" + (" expecting a TokenType reference but got: <" + JSON.stringify(e) + ">") + (`
 inside top level rule: <` + this.recordingProdStack[0].name + ">"));
        throw n.KNOWN_RECORDER_ERROR = !0, n;
      }
      var i = Ss(this.recordingProdStack), a = new se({
        idx: t,
        terminalType: e
      });
      return i.definition.push(a), mh;
    }, s;
  })()
);
function sn(s, e, t, r) {
  r === void 0 && (r = !1), Ms(t);
  var n = Ss(this.recordingProdStack), i = or(e) ? e : e.DEF, a = new s({ definition: [], idx: t });
  return U(e, "NAME") && (a.name = e.NAME), r && (a.separator = e.SEP), U(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), i.call(this), n.definition.push(a), this.recordingProdStack.pop(), ri;
}
function np(s, e) {
  var t = this;
  Ms(e);
  var r = Ss(this.recordingProdStack), n = Nt(s) === !1, i = n === !1 ? s : s.DEF, a = new et({
    definition: [],
    idx: e,
    ignoreAmbiguities: n && s.IGNORE_AMBIGUITIES === !0
  });
  U(s, "NAME") && (a.name = s.NAME), U(s, "MAX_LOOKAHEAD") && (a.maxLookahead = s.MAX_LOOKAHEAD);
  var o = Fu(i, function(u) {
    return or(u.GATE);
  });
  return a.hasPredicates = o, r.definition.push(a), x(i, function(u) {
    var l = new ze({ definition: [] });
    a.definition.push(l), U(u, "NAME") && (l.name = u.NAME), U(u, "IGNORE_AMBIGUITIES") ? l.ignoreAmbiguities = u.IGNORE_AMBIGUITIES : U(u, "GATE") && (l.ignoreAmbiguities = !0), t.recordingProdStack.push(l), u.ALT.call(t), t.recordingProdStack.pop();
  }), ri;
}
function Co(s) {
  return s === 0 ? "" : "" + s;
}
function Ms(s) {
  if (s < 0 || s > vo) {
    var e = new Error(
      // The stack trace will contain all the needed details
      "Invalid DSL Method idx value: <" + s + `>
	` + ("Idx value must be a none negative value smaller than " + (vo + 1))
    );
    throw e.KNOWN_RECORDER_ERROR = !0, e;
  }
}
var sp = (
  /** @class */
  (function() {
    function s() {
    }
    return s.prototype.initPerformanceTracer = function(e) {
      if (U(e, "traceInitPerf")) {
        var t = e.traceInitPerf, r = typeof t == "number";
        this.traceInitMaxIdent = r ? t : 1 / 0, this.traceInitPerf = r ? t > 0 : t;
      } else
        this.traceInitMaxIdent = 0, this.traceInitPerf = Be.traceInitPerf;
      this.traceInitIndent = -1;
    }, s.prototype.TRACE_INIT = function(e, t) {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        var r = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(r + "--> <" + e + ">");
        var n = bu(t), i = n.time, a = n.value, o = i > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && o(r + "<-- <" + e + "> time: " + i + "ms"), this.traceInitIndent--, a;
      } else
        return t();
    }, s;
  })()
), gh = /* @__PURE__ */ (function() {
  var s = function(e, t) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
    }, s(e, t);
  };
  return function(e, t) {
    s(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
})(), ws = ga(Ir, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(ws);
var Be = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 4,
  ignoredIssues: {},
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: rh,
  nodeLocationTracking: "none",
  traceInitPerf: !1,
  skipValidations: !1
}), _s = Object.freeze({
  recoveryValueFunc: function() {
  },
  resyncEnabled: !0
}), Ae;
(function(s) {
  s[s.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", s[s.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", s[s.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", s[s.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", s[s.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", s[s.LEFT_RECURSION = 5] = "LEFT_RECURSION", s[s.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", s[s.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", s[s.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", s[s.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", s[s.INVALID_NESTED_RULE_NAME = 10] = "INVALID_NESTED_RULE_NAME", s[s.DUPLICATE_NESTED_NAME = 11] = "DUPLICATE_NESTED_NAME", s[s.NO_NON_EMPTY_LOOKAHEAD = 12] = "NO_NON_EMPTY_LOOKAHEAD", s[s.AMBIGUOUS_PREFIX_ALTS = 13] = "AMBIGUOUS_PREFIX_ALTS", s[s.TOO_MANY_ALTS = 14] = "TOO_MANY_ALTS";
})(Ae || (Ae = {}));
function ip(s) {
  return s === void 0 && (s = void 0), function() {
    return s;
  };
}
var va = (
  /** @class */
  (function() {
    function s(e, t) {
      t === void 0 && (t = Be), this.ignoredIssues = Be.ignoredIssues, this.definitionErrors = [], this.selfAnalysisDone = !1;
      var r = this;
      r.initErrorHandler(t), r.initLexerAdapter(), r.initLooksAhead(t), r.initRecognizerEngine(e, t), r.initRecoverable(t), r.initTreeBuilder(t), r.initContentAssist(), r.initGastRecorder(t), r.initPerformanceTracer(t), U(t, "ignoredIssues") && t.ignoredIssues !== Be.ignoredIssues && pa(`The <ignoredIssues> IParserConfig property is soft-deprecated and will be removed in future versions.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.`), this.ignoredIssues = U(t, "ignoredIssues") ? t.ignoredIssues : Be.ignoredIssues, this.skipValidations = U(t, "skipValidations") ? t.skipValidations : Be.skipValidations;
    }
    return s.performSelfAnalysis = function(e) {
      e.performSelfAnalysis();
    }, s.prototype.performSelfAnalysis = function() {
      var e = this;
      this.TRACE_INIT("performSelfAnalysis", function() {
        var t;
        e.selfAnalysisDone = !0;
        var r = e.className;
        e.TRACE_INIT("toFastProps", function() {
          xu(e);
        }), e.TRACE_INIT("Grammar Recording", function() {
          try {
            e.enableRecording(), x(e.definedRulesNames, function(i) {
              var a = e[i], o = a.originalGrammarAction, u = void 0;
              e.TRACE_INIT(i + " Rule", function() {
                u = e.topLevelRuleRecord(i, o);
              }), e.gastProductionsCache[i] = u;
            });
          } finally {
            e.disableRecording();
          }
        });
        var n = [];
        if (e.TRACE_INIT("Grammar Resolving", function() {
          n = bf({
            rules: Fe(e.gastProductionsCache)
          }), e.definitionErrors.push.apply(e.definitionErrors, n);
        }), e.TRACE_INIT("Grammar Validations", function() {
          if (q(n) && e.skipValidations === !1) {
            var i = Pf({
              rules: Fe(e.gastProductionsCache),
              maxLookahead: e.maxLookahead,
              tokenTypes: Fe(e.tokensMap),
              ignoredIssues: e.ignoredIssues,
              errMsgProvider: Aa,
              grammarName: r
            });
            e.definitionErrors.push.apply(e.definitionErrors, i);
          }
        }), q(e.definitionErrors) && (e.recoveryEnabled && e.TRACE_INIT("computeAllProdsFollows", function() {
          var i = Yd(Fe(e.gastProductionsCache));
          e.resyncFollows = i;
        }), e.TRACE_INIT("ComputeLookaheadFunctions", function() {
          e.preComputeLookaheadFunctions(Fe(e.gastProductionsCache));
        })), e.TRACE_INIT("expandAllNestedRuleNames", function() {
          var i = Qd(Fe(e.gastProductionsCache), e.fullRuleNameToShort);
          e.allRuleNames = i.allRuleNames;
        }), !s.DEFER_DEFINITION_ERRORS_HANDLING && !q(e.definitionErrors))
          throw t = L(e.definitionErrors, function(i) {
            return i.message;
          }), new Error(`Parser Definition Errors detected:
 ` + t.join(`
-------------------------------
`));
      });
    }, s.DEFER_DEFINITION_ERRORS_HANDLING = !1, s;
  })()
);
Yc(va, [
  Vf,
  Bf,
  jf,
  qf,
  Zf,
  Qf,
  Jf,
  ep,
  rp,
  sp
]);
(function(s) {
  gh(e, s);
  function e(t, r) {
    r === void 0 && (r = Be);
    var n = this, i = Ln(r);
    return i.outputCst = !0, n = s.call(this, t, i) || this, n;
  }
  return e;
})(va);
var ap = (
  /** @class */
  (function(s) {
    gh(e, s);
    function e(t, r) {
      r === void 0 && (r = Be);
      var n = this, i = Ln(r);
      return i.outputCst = !1, n = s.call(this, t, i) || this, n;
    }
    return e;
  })(va)
);
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Io = (s, e) => ({
  type: s,
  message: e
});
var ae;
(function(s) {
  s.LexingError = "LexingError", s.ParserError = "ParsingError", s.StaticOffsetError = "StaticOffsetError", s.StaticOffsetOutOfRangeError = "StaticOffsetOutOfRangeError", s.RangeOffsetNotAllowed = "RangeOffsetNotAllowed", s.InvalidRangeSize = "InvalidRangeSize";
})(ae || (ae = {}));
var g;
(function(s) {
  s.EMPTY = "EMPTY", s.NUMBER = "NUMBER", s.STRING = "STRING", s.MINUS_UNARY_OP = "MINUS_UNARY_OP", s.PLUS_UNARY_OP = "PLUS_UNARY_OP", s.PERCENT_OP = "PERCENT_OP", s.CONCATENATE_OP = "CONCATENATE_OP", s.EQUALS_OP = "EQUALS_OP", s.NOT_EQUAL_OP = "NOT_EQUAL_OP", s.GREATER_THAN_OP = "GREATER_THAN_OP", s.LESS_THAN_OP = "LESS_THAN_OP", s.GREATER_THAN_OR_EQUAL_OP = "GREATER_THAN_OR_EQUAL_OP", s.LESS_THAN_OR_EQUAL_OP = "LESS_THAN_OR_EQUAL_OP", s.PLUS_OP = "PLUS_OP", s.MINUS_OP = "MINUS_OP", s.TIMES_OP = "TIMES_OP", s.DIV_OP = "DIV_OP", s.POWER_OP = "POWER_OP", s.FUNCTION_CALL = "FUNCTION_CALL", s.NAMED_EXPRESSION = "NAMED_EXPRESSION", s.PARENTHESIS = "PARENTHESES", s.CELL_REFERENCE = "CELL_REFERENCE", s.CELL_RANGE = "CELL_RANGE", s.COLUMN_RANGE = "COLUMN_RANGE", s.ROW_RANGE = "ROW_RANGE", s.ERROR = "ERROR", s.ERROR_WITH_RAW_INPUT = "ERROR_WITH_RAW_INPUT", s.ARRAY = "ARRAY";
})(g || (g = {}));
var je;
(function(s) {
  s[s.RELATIVE = 0] = "RELATIVE", s[s.START_ABSOLUTE = 1] = "START_ABSOLUTE", s[s.BOTH_ABSOLUTE = 2] = "BOTH_ABSOLUTE";
})(je || (je = {}));
const op = (s) => ({
  type: g.EMPTY,
  leadingWhitespace: s == null ? void 0 : s.image
}), up = (s, e) => ({
  type: g.NUMBER,
  value: s,
  leadingWhitespace: e == null ? void 0 : e.image
}), hp = (s) => {
  var e;
  return {
    type: g.STRING,
    value: s.image.slice(1, -1),
    leadingWhitespace: (e = s.leadingWhitespace) === null || e === void 0 ? void 0 : e.image
  };
}, Oo = (s, e) => ({
  type: g.CELL_REFERENCE,
  reference: s,
  leadingWhitespace: e == null ? void 0 : e.image
}), Mo = (s, e, t, r) => (Ca(s, e, t), {
  type: g.CELL_RANGE,
  start: s,
  end: e,
  sheetReferenceType: t,
  leadingWhitespace: r
}), lp = (s, e, t, r) => (Ca(s, e, t), {
  type: g.COLUMN_RANGE,
  start: s,
  end: e,
  sheetReferenceType: t,
  leadingWhitespace: r == null ? void 0 : r.image
}), cp = (s, e, t, r) => (Ca(s, e, t), {
  type: g.ROW_RANGE,
  start: s,
  end: e,
  sheetReferenceType: t,
  leadingWhitespace: r == null ? void 0 : r.image
}), dp = (s, e, t) => ({
  type: g.CONCATENATE_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), fp = (s, e, t) => ({
  type: g.EQUALS_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), pp = (s, e, t) => ({
  type: g.NOT_EQUAL_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), mp = (s, e, t) => ({
  type: g.GREATER_THAN_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), gp = (s, e, t) => ({
  type: g.LESS_THAN_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), Ep = (s, e, t) => ({
  type: g.GREATER_THAN_OR_EQUAL_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), Rp = (s, e, t) => ({
  type: g.LESS_THAN_OR_EQUAL_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), Np = (s, e, t) => ({
  type: g.PLUS_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), Tp = (s, e, t) => ({
  type: g.MINUS_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), Sp = (s, e, t) => ({
  type: g.TIMES_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), Ap = (s, e, t) => ({
  type: g.DIV_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), yp = (s, e, t) => ({
  type: g.POWER_OP,
  left: s,
  right: e,
  leadingWhitespace: t == null ? void 0 : t.image
}), vp = (s, e) => ({
  type: g.MINUS_UNARY_OP,
  value: s,
  leadingWhitespace: e == null ? void 0 : e.image
}), Cp = (s, e) => ({
  type: g.PLUS_UNARY_OP,
  value: s,
  leadingWhitespace: e == null ? void 0 : e.image
}), Ip = (s, e) => ({
  type: g.PERCENT_OP,
  value: s,
  leadingWhitespace: e == null ? void 0 : e.image
}), Op = (s, e, t, r, n) => ({
  type: g.FUNCTION_CALL,
  procedureName: s,
  args: e,
  leadingWhitespace: t == null ? void 0 : t.image,
  internalWhitespace: r == null ? void 0 : r.image,
  hyperlink: n
}), wo = (s, e, t) => ({
  type: g.ARRAY,
  args: s,
  leadingWhitespace: e == null ? void 0 : e.image,
  internalWhitespace: t == null ? void 0 : t.image
}), Mp = (s, e) => ({
  type: g.NAMED_EXPRESSION,
  expressionName: s,
  leadingWhitespace: e == null ? void 0 : e.image
}), wp = (s, e, t) => ({
  type: g.PARENTHESIS,
  expression: s,
  leadingWhitespace: e == null ? void 0 : e.image,
  internalWhitespace: t == null ? void 0 : t.image
}), wt = (s, e) => ({
  type: g.ERROR,
  error: s,
  leadingWhitespace: e == null ? void 0 : e.image
}), Fr = (s, e, t) => ({
  type: g.ERROR_WITH_RAW_INPUT,
  error: e,
  rawInput: s,
  leadingWhitespace: t == null ? void 0 : t.image
}), Vi = () => ({
  type: g.ERROR,
  error: f.parsingError()
});
function Ca(s, e, t) {
  if (s.sheet !== void 0 && e.sheet === void 0 || s.sheet === void 0 && e.sheet !== void 0)
    throw new Error("Start address inconsistent with end address");
  if (s.sheet === void 0 && t !== je.RELATIVE || s.sheet !== void 0 && t === je.RELATIVE)
    throw new Error("Sheet address inconsistent with sheet reference type");
}
function W(s, e) {
  return (e != null ? e : "") + s;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Eh = {
  [g.PLUS_OP]: "+",
  [g.MINUS_OP]: "-",
  [g.TIMES_OP]: "*",
  [g.DIV_OP]: "/",
  [g.CONCATENATE_OP]: "&",
  [g.POWER_OP]: "^",
  [g.EQUALS_OP]: "=",
  [g.NOT_EQUAL_OP]: "<>",
  [g.GREATER_THAN_OP]: ">",
  [g.GREATER_THAN_OR_EQUAL_OP]: ">=",
  [g.LESS_THAN_OP]: "<",
  [g.LESS_THAN_OR_EQUAL_OP]: "<="
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const _p = (s, e, t, r) => ({
  ast: s,
  relativeDependencies: e,
  hasVolatileFunction: t,
  hasStructuralChangeFunction: r
});
class Lp {
  constructor(e) {
    this.functionRegistry = e, this.cache = /* @__PURE__ */ new Map();
  }
  set(e, t) {
    const r = si(t, this.functionRegistry), n = _p(t, r, qt(t, this.functionRegistry.isFunctionVolatile), qt(t, this.functionRegistry.isFunctionDependentOnSheetStructureChange));
    return this.cache.set(e, n), n;
  }
  get(e) {
    return this.cache.get(e);
  }
  maybeSetAndThenGet(e, t) {
    const r = this.cache.get(e);
    return r !== void 0 ? r.ast : (this.set(e, t), t);
  }
}
const qt = (s, e) => {
  switch (s.type) {
    case g.EMPTY:
    case g.NUMBER:
    case g.STRING:
    case g.ERROR:
    case g.ERROR_WITH_RAW_INPUT:
    case g.CELL_REFERENCE:
    case g.CELL_RANGE:
    case g.COLUMN_RANGE:
    case g.ROW_RANGE:
    case g.NAMED_EXPRESSION:
      return !1;
    case g.PERCENT_OP:
    case g.PLUS_UNARY_OP:
    case g.MINUS_UNARY_OP:
      return qt(s.value, e);
    case g.CONCATENATE_OP:
    case g.EQUALS_OP:
    case g.NOT_EQUAL_OP:
    case g.LESS_THAN_OP:
    case g.GREATER_THAN_OP:
    case g.LESS_THAN_OR_EQUAL_OP:
    case g.GREATER_THAN_OR_EQUAL_OP:
    case g.MINUS_OP:
    case g.PLUS_OP:
    case g.TIMES_OP:
    case g.DIV_OP:
    case g.POWER_OP:
      return qt(s.left, e) || qt(s.right, e);
    case g.PARENTHESIS:
      return qt(s.expression, e);
    case g.FUNCTION_CALL:
      return e(s.procedureName) ? !0 : s.args.some((t) => qt(t, e));
    case g.ARRAY:
      return s.args.some((t) => t.some((r) => qt(r, e)));
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class E {
}
E.DistinctSigns = "Distinct signs.";
E.WrongArgNumber = "Wrong number of arguments.";
E.EmptyArg = "Empty function argument.";
E.EmptyArray = "Empty array not allowed.";
E.ArrayDimensions = "Array dimensions are not compatible.";
E.NoSpaceForArrayResult = "No space for array result.";
E.ValueSmall = "Value too small.";
E.ValueLarge = "Value too large.";
E.BadCriterion = "Incorrect criterion.";
E.RangeManySheets = "Range spans more than one sheet.";
E.CellRangeExpected = "Cell range expected.";
E.WrongDimension = "Wrong range dimension.";
E.ScalarExpected = "Cell range not allowed.";
E.NumberCoercion = "Value cannot be coerced to number.";
E.NumberExpected = "Number argument expected.";
E.IntegerExpected = "Value needs to be an integer.";
E.BadMode = "Mode not recognized.";
E.DateBounds = "Date outside of bounds.";
E.OutOfSheet = "Resulting reference is out of the sheet.";
E.WrongType = "Wrong type of argument.";
E.NaN = "NaN or infinite value encountered.";
E.EqualLength = "Ranges need to be of equal length.";
E.Negative = "Value cannot be negative.";
E.NotBinary = "String does not represent a binary number.";
E.NotOctal = "String does not represent an octal number.";
E.NotHex = "String does not represent a hexadecimal number.";
E.EndStartPeriod = "End period needs to be at least start period.";
E.CellRefExpected = "Cell reference expected.";
E.EmptyRange = "Empty range not allowed.";
E.BadRef = "Address is not correct.";
E.NumberRange = "Number-only range expected.";
E.ValueNotFound = "Value not found.";
E.ValueBaseLarge = "Value in base too large.";
E.ValueBaseSmall = "Value in base too small.";
E.ValueBaseLong = "Value in base too long.";
E.NegativeLength = "Length cannot be negative.";
E.PatternNotFound = "Pattern not found.";
E.OneValue = "Needs at least one value.";
E.TwoValues = "Range needs to contain at least two elements.";
E.ThreeValues = "Range needs to contain at least three elements.";
E.IndexBounds = "Index out of bounds.";
E.IndexLarge = "Index too large.";
E.Formula = "Expected formula.";
E.NegativeCount = "Count cannot be negative.";
E.ParseError = "Parsing error.";
E.SheetRef = "Sheet does not exist.";
E.PeriodLong = "Period number cannot exceed life length.";
E.InvalidDate = "Invalid date.";
E.BitshiftLong = "Result of bitshift is too long.";
E.EmptyString = "Empty-string argument not allowed.";
E.LengthBounds = "Length out of bounds.";
E.NegativeTime = "Time cannot be negative.";
E.NoDefault = "No default option.";
E.NoConditionMet = "None of the conditions were met.";
E.Selector = "Selector cannot exceed the number of arguments.";
E.StartEndDate = "Start date needs to be earlier than end date.";
E.IncorrectDateTime = "String does not represent correct DateTime.";
E.CharacterCodeBounds = "Character code out of bounds.";
E.NonZero = "Argument cannot be 0.";
E.LessThanOne = "Argument cannot be less than 1.";
E.WeekendString = "Incorrect weekend bitmask string.";
E.InvalidRoman = "Invalid roman numeral.";
E.WrongOrder = "Wrong order of values.";
E.ComplexNumberExpected = "Complex number expected.";
E.ShouldBeIorJ = "Should be 'i' or 'j'.";
E.SizeMismatch = "Array dimensions mismatched.";
E.ResultTooLong = "Result exceeds the maximum allowed length.";
E.FunctionName = (s) => `Function name ${s} not recognized.`;
E.NamedExpressionName = (s) => `Named expression ${s} not recognized.`;
E.LicenseKey = (s) => `License key is ${s}.`;
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Fp {
  constructor() {
    this.POSSIBLE_START_CHARACTERS = [...Mu, ...Uc, Pe, "'", "_"], this.cellReferenceRegexp = new RegExp(Fc, "y");
  }
  /**
   * Method used by the lexer to recognize CellReference token in text
   *
   * Note: using 'y' sticky flag for a named expression which is not supported on IE11...
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky
   */
  match(e, t) {
    this.cellReferenceRegexp.lastIndex = t;
    const r = this.cellReferenceRegexp.exec(e + "@");
    return r == null || r[1] == null ? null : (r[0] = r[1], r);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Up {
  constructor() {
    this.POSSIBLE_START_CHARACTERS = [...Mu, "_"], this.namedExpressionRegexp = new RegExp(Ou, "y"), this.r1c1CellRefRegexp = new RegExp(`^${Iu}$`);
  }
  /**
   * Method used by the lexer to recognize NamedExpression token in text
   *
   * Note: using 'y' sticky flag for a named expression which is not supported on IE11...
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky
   */
  match(e, t) {
    this.namedExpressionRegexp.lastIndex = t;
    const r = this.namedExpressionRegexp.exec(e);
    return r == null || r[0] == null || this.r1c1CellRefRegexp.test(r[0]) ? null : r;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const An = H({
  name: "AdditionOp",
  pattern: He.NA
}), Di = H({
  name: "PlusOp",
  pattern: /\+/,
  categories: An
}), Bi = H({
  name: "MinusOp",
  pattern: /-/,
  categories: An
}), ni = H({
  name: "MultiplicationOp",
  pattern: He.NA
}), Rh = H({
  name: "TimesOp",
  pattern: /\*/,
  categories: ni
}), Nh = H({
  name: "DivOp",
  pattern: /\//,
  categories: ni
}), ki = H({
  name: "PowerOp",
  pattern: /\^/
}), Th = H({
  name: "PercentOp",
  pattern: /%/
}), hr = H({
  name: "BooleanOp",
  pattern: He.NA
}), Gi = H({
  name: "EqualsOp",
  pattern: /=/,
  categories: hr
}), Sh = H({
  name: "NotEqualOp",
  pattern: /<>/,
  categories: hr
}), Ah = H({
  name: "GreaterThanOp",
  pattern: />/,
  categories: hr
}), yh = H({
  name: "LessThanOp",
  pattern: /</,
  categories: hr
}), vh = H({
  name: "GreaterThanOrEqualOp",
  pattern: />=/,
  categories: hr
}), Ch = H({
  name: "LessThanOrEqualOp",
  pattern: /<=/,
  categories: hr
}), Ih = H({
  name: "ConcatenateOp",
  pattern: /&/
}), Hi = H({
  name: "LParen",
  pattern: /\(/
}), cs = H({
  name: "RParen",
  pattern: /\)/
}), Oh = H({
  name: "ArrayLParen",
  pattern: /{/
}), Mh = H({
  name: "ArrayRParen",
  pattern: /}/
}), wh = H({
  name: "StringLiteral",
  pattern: /"([^"\\]*(\\.[^"\\]*)*)"/
}), _h = H({
  name: "ErrorLiteral",
  pattern: /#[A-Za-z0-9\/]+[?!]?/
}), yn = H({
  name: "RangeSeparator",
  pattern: new RegExp(_n)
}), Ia = H({
  name: "ColumnRange",
  pattern: new RegExp(`${ja}${_n}${ja}`)
}), Oa = H({
  name: "RowRange",
  pattern: new RegExp(`${qa}${_n}${qa}`)
}), Ma = H({
  name: "ProcedureName",
  pattern: new RegExp(`([${zs}][${la}]*)\\(`)
}), Ni = new Fp(), tr = H({
  name: "CellReference",
  pattern: Ni.match.bind(Ni),
  start_chars_hint: Ni.POSSIBLE_START_CHARACTERS,
  line_breaks: !1
}), Ti = new Up(), Lh = H({
  name: "NamedExpression",
  pattern: Ti.match.bind(Ti),
  start_chars_hint: Ti.POSSIBLE_START_CHARACTERS,
  line_breaks: !1
}), xp = (s) => {
  const e = s.translationPackage.getFunctionTranslation("OFFSET"), t = s.errorMapping, r = s.translationPackage.buildFunctionMapping(), n = new RegExp(s.ignoreWhiteSpace === "standard" ? _c : wc), i = H({
    name: "WhiteSpace",
    pattern: n
  }), a = H({
    name: "ArrayRowSep",
    pattern: s.arrayRowSeparator
  }), o = H({
    name: "ArrayColSep",
    pattern: s.arrayColumnSeparator
  }), u = H({
    name: "NumberLiteral",
    pattern: new RegExp(`(([${s.decimalSeparator}]\\d+)|(\\d+([${s.decimalSeparator}]\\d*)?))(e[+-]?\\d+)?`)
  }), l = H({
    name: "OffsetProcedureName",
    pattern: new RegExp(e, "i")
  });
  let c, d;
  s.functionArgSeparator === s.arrayColumnSeparator ? (c = o, d = []) : s.functionArgSeparator === s.arrayRowSeparator ? (c = a, d = []) : (c = H({
    name: "ArgSeparator",
    pattern: s.functionArgSeparator
  }), d = [c]);
  const p = [i, Di, Bi, Rh, Nh, ki, Gi, Sh, Th, vh, Ch, Ah, yh, Hi, cs, Oh, Mh, l, Ma, yn, ...d, Ia, Oa, u, wh, _h, Ih, hr, An, ni, tr, Lh, a, o];
  return {
    ArgSeparator: c,
    NumberLiteral: u,
    OffsetProcedureName: l,
    ArrayRowSeparator: a,
    ArrayColSeparator: o,
    WhiteSpace: i,
    allTokens: p,
    errorMapping: t,
    functionMapping: r,
    decimalSeparator: s.decimalSeparator,
    maxColumns: s.maxColumns,
    maxRows: s.maxRows
  };
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Gr extends ap {
  constructor(e, t) {
    super(e.allTokens, {
      outputCst: !1,
      maxLookahead: 7
    }), this.resolveSheetReference = t, this.booleanExpressionOrEmpty = this.RULE("booleanExpressionOrEmpty", () => this.OR([{
      ALT: () => this.SUBRULE(this.booleanExpression)
    }, {
      ALT: ip(op())
    }])), this.procedureExpression = this.RULE("procedureExpression", () => {
      var r;
      const n = this.CONSUME(Ma), i = n.image.toUpperCase().slice(0, -1), a = (r = this.lexerConfig.functionMapping[i]) !== null && r !== void 0 ? r : i, o = [];
      let u = this.SUBRULE(this.booleanExpressionOrEmpty);
      this.MANY(() => {
        var c;
        const d = this.CONSUME(this.lexerConfig.ArgSeparator);
        u.type === g.EMPTY && (u.leadingWhitespace = (c = d.leadingWhitespace) === null || c === void 0 ? void 0 : c.image), o.push(u), u = this.SUBRULE2(this.booleanExpressionOrEmpty);
      }), o.push(u), o.length === 1 && o[0].type === g.EMPTY && (o.length = 0);
      const l = this.CONSUME(cs);
      return Op(a, o, n.leadingWhitespace, l.leadingWhitespace);
    }), this.namedExpressionExpression = this.RULE("namedExpressionExpression", () => {
      const r = this.CONSUME(Lh);
      return Mp(r.image, r.leadingWhitespace);
    }), this.offsetProcedureExpression = this.RULE("offsetProcedureExpression", () => {
      const r = [];
      return this.CONSUME(this.lexerConfig.OffsetProcedureName), this.CONSUME(Hi), this.MANY_SEP({
        SEP: this.lexerConfig.ArgSeparator,
        DEF: () => {
          r.push(this.SUBRULE(this.booleanExpression));
        }
      }), this.CONSUME(cs), this.handleOffsetHeuristic(r);
    }), this.columnRangeExpression = this.RULE("columnRangeExpression", () => {
      const r = this.CONSUME(Ia), [n, i] = r.image.split(":"), a = this.ACTION(() => Rs(n, this.formulaAddress, this.resolveSheetReference)), o = this.ACTION(() => Rs(i, this.formulaAddress, this.resolveSheetReference));
      if (a === void 0 || o === void 0)
        return wt(new f(m.REF));
      if (a.exceedsSheetSizeLimits(this.lexerConfig.maxColumns) || o.exceedsSheetSizeLimits(this.lexerConfig.maxColumns))
        return Fr(r.image, new f(m.NAME), r.leadingWhitespace);
      if (a.sheet === void 0 && o.sheet !== void 0)
        return this.parsingError(ae.ParserError, "Malformed range expression");
      const {
        firstEnd: u,
        secondEnd: l,
        sheetRefType: c
      } = Gr.fixSheetIdsForRangeEnds(a, o);
      return lp(u, l, c, r.leadingWhitespace);
    }), this.rowRangeExpression = this.RULE("rowRangeExpression", () => {
      const r = this.CONSUME(Oa), [n, i] = r.image.split(":"), a = this.ACTION(() => Ns(n, this.formulaAddress, this.resolveSheetReference)), o = this.ACTION(() => Ns(i, this.formulaAddress, this.resolveSheetReference));
      if (a === void 0 || o === void 0)
        return wt(new f(m.REF));
      if (a.exceedsSheetSizeLimits(this.lexerConfig.maxRows) || o.exceedsSheetSizeLimits(this.lexerConfig.maxRows))
        return Fr(r.image, new f(m.NAME), r.leadingWhitespace);
      if (a.sheet === void 0 && o.sheet !== void 0)
        return this.parsingError(ae.ParserError, "Malformed range expression");
      const {
        firstEnd: u,
        secondEnd: l,
        sheetRefType: c
      } = Gr.fixSheetIdsForRangeEnds(a, o);
      return cp(u, l, c, r.leadingWhitespace);
    }), this.cellReference = this.RULE("cellReference", () => {
      const r = this.CONSUME(tr), n = this.ACTION(() => br(r.image, this.formulaAddress, this.resolveSheetReference));
      return n === void 0 ? Fr(r.image, new f(m.REF), r.leadingWhitespace) : n.exceedsSheetSizeLimits(this.lexerConfig.maxColumns, this.lexerConfig.maxRows) ? Fr(r.image, new f(m.NAME), r.leadingWhitespace) : Oo(n, r.leadingWhitespace);
    }), this.endRangeReference = this.RULE("endRangeReference", (r) => {
      var n;
      const i = this.CONSUME(tr), a = this.ACTION(() => br(r.image, this.formulaAddress, this.resolveSheetReference)), o = this.ACTION(() => br(i.image, this.formulaAddress, this.resolveSheetReference));
      return a === void 0 || o === void 0 ? this.ACTION(() => Fr(`${r.image}:${i.image}`, new f(m.REF), r.leadingWhitespace)) : a.exceedsSheetSizeLimits(this.lexerConfig.maxColumns, this.lexerConfig.maxRows) || o.exceedsSheetSizeLimits(this.lexerConfig.maxColumns, this.lexerConfig.maxRows) ? this.ACTION(() => Fr(`${r.image}:${i.image}`, new f(m.NAME), r.leadingWhitespace)) : this.buildCellRange(a, o, (n = r.leadingWhitespace) === null || n === void 0 ? void 0 : n.image);
    }), this.endOfRangeExpression = this.RULE("endOfRangeExpression", (r) => this.OR([{
      ALT: () => this.SUBRULE(this.endRangeReference, {
        ARGS: [r]
      })
    }, {
      ALT: () => {
        var n;
        const i = this.SUBRULE(this.offsetProcedureExpression), a = this.ACTION(() => br(r.image, this.formulaAddress, this.resolveSheetReference));
        return a === void 0 ? wt(new f(m.REF)) : i.type === g.CELL_REFERENCE ? this.buildCellRange(a, i.reference, (n = r.leadingWhitespace) === null || n === void 0 ? void 0 : n.image) : this.parsingError(ae.RangeOffsetNotAllowed, "Range offset not allowed here");
      }
    }])), this.cellRangeExpression = this.RULE("cellRangeExpression", () => {
      const r = this.CONSUME(tr);
      return this.CONSUME2(yn), this.SUBRULE(this.endOfRangeExpression, {
        ARGS: [r]
      });
    }), this.endRangeWithOffsetStartReference = this.RULE("endRangeWithOffsetStartReference", (r) => {
      const n = this.CONSUME(tr), i = this.ACTION(() => br(n.image, this.formulaAddress, this.resolveSheetReference));
      return i === void 0 ? this.ACTION(() => wt(new f(m.REF))) : this.buildCellRange(r.reference, i, r.leadingWhitespace);
    }), this.endOfRangeWithOffsetStartExpression = this.RULE("endOfRangeWithOffsetStartExpression", (r) => this.OR([{
      ALT: () => this.SUBRULE(this.endRangeWithOffsetStartReference, {
        ARGS: [r]
      })
    }, {
      ALT: () => {
        const n = this.SUBRULE(this.offsetProcedureExpression);
        return n.type === g.CELL_REFERENCE ? this.buildCellRange(r.reference, n.reference, r.leadingWhitespace) : this.parsingError(ae.RangeOffsetNotAllowed, "Range offset not allowed here");
      }
    }])), this.offsetExpression = this.RULE("offsetExpression", () => {
      const r = this.SUBRULE(this.offsetProcedureExpression);
      let n;
      return this.OPTION(() => {
        this.CONSUME(yn), r.type === g.CELL_RANGE ? n = this.parsingError(ae.RangeOffsetNotAllowed, "Range offset not allowed here") : n = this.SUBRULE(this.endOfRangeWithOffsetStartExpression, {
          ARGS: [r]
        });
      }), n !== void 0 ? n : r;
    }), this.insideArrayExpression = this.RULE("insideArrayExpression", () => {
      const r = [[]];
      return r[r.length - 1].push(this.SUBRULE(this.booleanExpression)), this.MANY(() => {
        this.OR([{
          ALT: () => {
            this.CONSUME(this.lexerConfig.ArrayColSeparator), r[r.length - 1].push(this.SUBRULE2(this.booleanExpression));
          }
        }, {
          ALT: () => {
            this.CONSUME(this.lexerConfig.ArrayRowSeparator), r.push([]), r[r.length - 1].push(this.SUBRULE3(this.booleanExpression));
          }
        }]);
      }), wo(r);
    }), this.parenthesisExpression = this.RULE("parenthesisExpression", () => {
      const r = this.CONSUME(Hi), n = this.SUBRULE(this.booleanExpression), i = this.CONSUME(cs);
      return wp(n, r.leadingWhitespace, i.leadingWhitespace);
    }), this.arrayExpression = this.RULE("arrayExpression", () => this.OR([{
      ALT: () => {
        const r = this.CONSUME(Oh), n = this.SUBRULE(this.insideArrayExpression), i = this.CONSUME(Mh);
        return wo(n.args, r.leadingWhitespace, i.leadingWhitespace);
      }
    }, {
      ALT: () => this.SUBRULE(this.parenthesisExpression)
    }])), this.numericStringToNumber = (r) => {
      const n = r.replace(this.lexerConfig.decimalSeparator, ".");
      return Number(n);
    }, this.positiveAtomicExpression = this.RULE("positiveAtomicExpression", () => {
      var r;
      return this.OR((r = this.atomicExpCache) !== null && r !== void 0 ? r : this.atomicExpCache = [{
        ALT: () => this.SUBRULE(this.arrayExpression)
      }, {
        ALT: () => this.SUBRULE(this.cellRangeExpression)
      }, {
        ALT: () => this.SUBRULE(this.columnRangeExpression)
      }, {
        ALT: () => this.SUBRULE(this.rowRangeExpression)
      }, {
        ALT: () => this.SUBRULE(this.offsetExpression)
      }, {
        ALT: () => this.SUBRULE(this.cellReference)
      }, {
        ALT: () => this.SUBRULE(this.procedureExpression)
      }, {
        ALT: () => this.SUBRULE(this.namedExpressionExpression)
      }, {
        ALT: () => {
          const n = this.CONSUME(this.lexerConfig.NumberLiteral);
          return up(this.numericStringToNumber(n.image), n.leadingWhitespace);
        }
      }, {
        ALT: () => {
          const n = this.CONSUME(wh);
          return hp(n);
        }
      }, {
        ALT: () => {
          const n = this.CONSUME(_h), i = n.image.toUpperCase(), a = this.lexerConfig.errorMapping[i];
          return a ? wt(new f(a), n.leadingWhitespace) : this.parsingError(ae.ParserError, "Unknown error literal");
        }
      }]);
    }), this.rightUnaryOpAtomicExpression = this.RULE("rightUnaryOpAtomicExpression", () => {
      const r = this.SUBRULE(this.positiveAtomicExpression), n = this.OPTION(() => this.CONSUME(Th));
      return n ? Ip(r, n.leadingWhitespace) : r;
    }), this.atomicExpression = this.RULE("atomicExpression", () => this.OR([{
      ALT: () => {
        const r = this.CONSUME(An), n = this.SUBRULE(this.atomicExpression);
        return $(r, Di) ? Cp(n, r.leadingWhitespace) : $(r, Bi) ? vp(n, r.leadingWhitespace) : (this.customParsingError = Io(ae.ParserError, "Mismatched token type"), this.customParsingError);
      }
    }, {
      ALT: () => this.SUBRULE2(this.rightUnaryOpAtomicExpression)
    }])), this.powerExpression = this.RULE("powerExpression", () => {
      let r = this.SUBRULE(this.atomicExpression);
      return this.MANY(() => {
        const n = this.CONSUME(ki), i = this.SUBRULE2(this.atomicExpression);
        $(n, ki) ? r = yp(r, i, n.leadingWhitespace) : this.ACTION(() => {
          throw Error("Operator not supported");
        });
      }), r;
    }), this.multiplicationExpression = this.RULE("multiplicationExpression", () => {
      let r = this.SUBRULE(this.powerExpression);
      return this.MANY(() => {
        const n = this.CONSUME(ni), i = this.SUBRULE2(this.powerExpression);
        $(n, Rh) ? r = Sp(r, i, n.leadingWhitespace) : $(n, Nh) ? r = Ap(r, i, n.leadingWhitespace) : this.ACTION(() => {
          throw Error("Operator not supported");
        });
      }), r;
    }), this.additionExpression = this.RULE("additionExpression", () => {
      let r = this.SUBRULE(this.multiplicationExpression);
      return this.MANY(() => {
        const n = this.CONSUME(An), i = this.SUBRULE2(this.multiplicationExpression);
        $(n, Di) ? r = Np(r, i, n.leadingWhitespace) : $(n, Bi) ? r = Tp(r, i, n.leadingWhitespace) : this.ACTION(() => {
          throw Error("Operator not supported");
        });
      }), r;
    }), this.concatenateExpression = this.RULE("concatenateExpression", () => {
      let r = this.SUBRULE(this.additionExpression);
      return this.MANY(() => {
        const n = this.CONSUME(Ih), i = this.SUBRULE2(this.additionExpression);
        r = dp(r, i, n.leadingWhitespace);
      }), r;
    }), this.booleanExpression = this.RULE("booleanExpression", () => {
      let r = this.SUBRULE(this.concatenateExpression);
      return this.MANY(() => {
        const n = this.CONSUME(hr), i = this.SUBRULE2(this.concatenateExpression);
        $(n, Gi) ? r = fp(r, i, n.leadingWhitespace) : $(n, Sh) ? r = pp(r, i, n.leadingWhitespace) : $(n, Ah) ? r = mp(r, i, n.leadingWhitespace) : $(n, yh) ? r = gp(r, i, n.leadingWhitespace) : $(n, vh) ? r = Ep(r, i, n.leadingWhitespace) : $(n, Ch) ? r = Rp(r, i, n.leadingWhitespace) : this.ACTION(() => {
          throw Error("Operator not supported");
        });
      }), r;
    }), this.formula = this.RULE("formula", () => (this.CONSUME(Gi), this.SUBRULE(this.booleanExpression))), this.lexerConfig = e, this.formulaAddress = O(0, 0, 0), this.performSelfAnalysis();
  }
  /**
   * Parses tokenized formula and builds abstract syntax tree
   *
   * @param {ExtendedToken[]} tokens - tokenized formula
   * @param {SimpleCellAddress} formulaAddress - address of the cell in which formula is located
   */
  parseFromTokens(e, t) {
    this.input = e;
    let r = this.formulaWithContext(t), n = [];
    return this.customParsingError && n.push(this.customParsingError), n = n.concat(this.errors.map((i) => ({
      type: ae.ParserError,
      message: i.message
    }))), n.length > 0 && (r = Vi()), {
      ast: r,
      errors: n
    };
  }
  reset() {
    super.reset(), this.customParsingError = void 0;
  }
  /**
   * Entry rule wrapper that sets formula address
   *
   * @param {SimpleCellAddress} address - address of the cell in which formula is located
   */
  formulaWithContext(e) {
    return this.formulaAddress = e, this.formula();
  }
  buildCellRange(e, t, r) {
    if (e.sheet === void 0 && t.sheet !== void 0)
      return this.parsingError(ae.ParserError, "Malformed range expression");
    const {
      firstEnd: n,
      secondEnd: i,
      sheetRefType: a
    } = Gr.fixSheetIdsForRangeEnds(e, t);
    return Mo(n, i, a, r);
  }
  static fixSheetIdsForRangeEnds(e, t) {
    const r = Gr.rangeSheetReferenceType(e.sheet, t.sheet), n = e.sheet !== void 0 && t.sheet === void 0 ? t.withSheet(e.sheet) : t;
    return {
      firstEnd: e,
      secondEnd: n,
      sheetRefType: r
    };
  }
  /**
   * Returns {@link CellReferenceAst} or {@link CellRangeAst} based on OFFSET function arguments
   *
   * @param {Ast[]} args - OFFSET function arguments
   */
  handleOffsetHeuristic(e) {
    var t;
    const r = e[0];
    if (r.type !== g.CELL_REFERENCE)
      return this.parsingError(ae.StaticOffsetError, "First argument to OFFSET is not a reference");
    const n = e[1];
    let i;
    if (n.type === g.NUMBER && Number.isInteger(n.value))
      i = n.value;
    else if (n.type === g.PLUS_UNARY_OP && n.value.type === g.NUMBER && Number.isInteger(n.value.value))
      i = n.value.value;
    else if (n.type === g.MINUS_UNARY_OP && n.value.type === g.NUMBER && Number.isInteger(n.value.value))
      i = -n.value.value;
    else
      return this.parsingError(ae.StaticOffsetError, "Second argument to OFFSET is not a static number");
    const a = e[2];
    let o;
    if (a.type === g.NUMBER && Number.isInteger(a.value))
      o = a.value;
    else if (a.type === g.PLUS_UNARY_OP && a.value.type === g.NUMBER && Number.isInteger(a.value.value))
      o = a.value.value;
    else if (a.type === g.MINUS_UNARY_OP && a.value.type === g.NUMBER && Number.isInteger(a.value.value))
      o = -a.value.value;
    else
      return this.parsingError(ae.StaticOffsetError, "Third argument to OFFSET is not a static number");
    const u = e[3];
    let l;
    if (u === void 0)
      l = 1;
    else if (u.type === g.NUMBER) {
      if (l = u.value, l < 1)
        return this.parsingError(ae.StaticOffsetError, "Fourth argument to OFFSET is too small number");
      if (!Number.isInteger(l))
        return this.parsingError(ae.StaticOffsetError, "Fourth argument to OFFSET is not integer");
    } else
      return this.parsingError(ae.StaticOffsetError, "Fourth argument to OFFSET is not a static number");
    const c = e[4];
    let d;
    if (c === void 0)
      d = 1;
    else if (c.type === g.NUMBER) {
      if (d = c.value, d < 1)
        return this.parsingError(ae.StaticOffsetError, "Fifth argument to OFFSET is too small number");
      if (!Number.isInteger(d))
        return this.parsingError(ae.StaticOffsetError, "Fifth argument to OFFSET is not integer");
    } else
      return this.parsingError(ae.StaticOffsetError, "Fifth argument to OFFSET is not a static number");
    const p = new j(r.reference.col + o, r.reference.row + i, r.reference.type, (t = r.reference.sheet) !== null && t !== void 0 ? t : void 0);
    let N = p.col, T = p.row;
    if ((r.reference.type === X.CELL_REFERENCE_RELATIVE || r.reference.type === X.CELL_REFERENCE_ABSOLUTE_COL) && (T = T + this.formulaAddress.row), (r.reference.type === X.CELL_REFERENCE_RELATIVE || r.reference.type === X.CELL_REFERENCE_ABSOLUTE_ROW) && (N = N + this.formulaAddress.col), N < 0 || T < 0)
      return wt(new f(m.REF, E.OutOfSheet));
    if (d === 1 && l === 1)
      return Oo(p);
    {
      const R = new j(p.col + d - 1, p.row + l - 1, p.type, p.sheet), S = r.reference.sheet == null ? je.RELATIVE : je.BOTH_ABSOLUTE;
      return Mo(p, R, S);
    }
  }
  parsingError(e, t) {
    return this.customParsingError = Io(e, t), Vi();
  }
  static rangeSheetReferenceType(e, t) {
    return e === void 0 ? je.RELATIVE : t === void 0 ? je.START_ABSOLUTE : je.BOTH_ABSOLUTE;
  }
}
class Ls {
  constructor(e) {
    this.lexerConfig = e, this.lexer = new He(e.allTokens, {
      ensureOptimizations: !0
    });
  }
  /**
   * Returns Lexer tokens from formula string
   *
   * @param {string} text - string representation of a formula
   */
  tokenizeFormula(e) {
    const t = this.lexer.tokenize(e);
    let r = t.tokens;
    return r = this.trimTrailingWhitespaces(r), r = this.skipWhitespacesInsideRanges(r), r = this.skipWhitespacesBeforeArgSeparators(r), t.tokens = r, t;
  }
  skipWhitespacesInsideRanges(e) {
    return Ls.filterTokensByNeighbors(e, (t, r, n) => ($(t, tr) || $(t, yn)) && $(r, this.lexerConfig.WhiteSpace) && ($(n, tr) || $(n, yn)));
  }
  skipWhitespacesBeforeArgSeparators(e) {
    return Ls.filterTokensByNeighbors(e, (t, r, n) => !$(t, this.lexerConfig.ArgSeparator) && $(r, this.lexerConfig.WhiteSpace) && $(n, this.lexerConfig.ArgSeparator));
  }
  static filterTokensByNeighbors(e, t) {
    if (e.length < 3)
      return e;
    let r = 0;
    const n = [e[r++]];
    for (; r < e.length - 1; )
      t(e[r - 1], e[r], e[r + 1]) || n.push(e[r]), ++r;
    return n.push(e[r]), n;
  }
  trimTrailingWhitespaces(e) {
    return e.length > 0 && $(e[e.length - 1], this.lexerConfig.WhiteSpace) && e.pop(), e;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Fh {
  constructor(e, t, r) {
    this.config = e, this.sheetMapping = t, this.namedExpressions = r;
  }
  unparse(e, t) {
    return "=" + this.unparseAst(e, t);
  }
  unparseAst(e, t) {
    var r, n;
    switch (e.type) {
      case g.EMPTY:
        return W("", e.leadingWhitespace);
      case g.NUMBER:
        return W(Uh(e.value, this.config.decimalSeparator), e.leadingWhitespace);
      case g.STRING:
        return W('"' + e.value + '"', e.leadingWhitespace);
      case g.FUNCTION_CALL: {
        const i = e.args.map((u) => u !== void 0 ? this.unparseAst(u, t) : "").join(this.config.functionArgSeparator), o = (this.config.translationPackage.isFunctionTranslated(e.procedureName) ? this.config.translationPackage.getFunctionTranslation(e.procedureName) : e.procedureName) + "(" + i + W(")", e.internalWhitespace);
        return W(o, e.leadingWhitespace);
      }
      case g.NAMED_EXPRESSION: {
        const i = (r = this.namedExpressions.nearestNamedExpression(e.expressionName, t.sheet)) === null || r === void 0 ? void 0 : r.displayName;
        return W(i || e.expressionName, e.leadingWhitespace);
      }
      case g.CELL_REFERENCE: {
        let i;
        return e.reference.sheet !== void 0 ? i = this.unparseSheetName(e.reference.sheet) + "!" : i = "", i += (n = e.reference.unparse(t)) !== null && n !== void 0 ? n : this.config.translationPackage.getErrorTranslation(m.REF), W(i, e.leadingWhitespace);
      }
      case g.COLUMN_RANGE:
      case g.ROW_RANGE:
      case g.CELL_RANGE:
        return W(this.formatRange(e, t), e.leadingWhitespace);
      case g.PLUS_UNARY_OP: {
        const i = this.unparseAst(e.value, t);
        return W("+", e.leadingWhitespace) + i;
      }
      case g.MINUS_UNARY_OP: {
        const i = this.unparseAst(e.value, t);
        return W("-", e.leadingWhitespace) + i;
      }
      case g.PERCENT_OP:
        return this.unparseAst(e.value, t) + W("%", e.leadingWhitespace);
      case g.ERROR: {
        const i = this.config.translationPackage.getErrorTranslation(e.error ? e.error.type : m.ERROR);
        return W(i, e.leadingWhitespace);
      }
      case g.ERROR_WITH_RAW_INPUT:
        return W(e.rawInput, e.leadingWhitespace);
      case g.PARENTHESIS: {
        const a = "(" + this.unparseAst(e.expression, t) + W(")", e.internalWhitespace);
        return W(a, e.leadingWhitespace);
      }
      case g.ARRAY: {
        const i = "{" + e.args.map((a) => a.map((o) => this.unparseAst(o, t)).join(this.config.arrayColumnSeparator)).join(this.config.arrayRowSeparator) + W("}", e.internalWhitespace);
        return W(i, e.leadingWhitespace);
      }
      default: {
        const i = this.unparseAst(e.left, t), a = this.unparseAst(e.right, t);
        return i + W(Eh[e.type], e.leadingWhitespace) + a;
      }
    }
  }
  /**
   * Unparses a sheet name.
   * @param {number} sheetId - the ID of the sheet
   * @returns {string} the unparsed sheet name
   */
  unparseSheetName(e) {
    const t = _u(e, (r) => this.sheetMapping.getSheetNameOrThrowError(r, {
      includePlaceholders: !0
    }));
    if (t === void 0)
      throw new _e(e);
    return t;
  }
  formatRange(e, t) {
    let r = "", n = "";
    e.start.sheet !== void 0 && e.sheetReferenceType !== je.RELATIVE && (r = this.unparseSheetName(e.start.sheet) + "!"), e.end.sheet !== void 0 && e.sheetReferenceType === je.BOTH_ABSOLUTE && (n = this.unparseSheetName(e.end.sheet) + "!");
    const i = e.start.unparse(t), a = e.end.unparse(t);
    return i === void 0 || a === void 0 ? this.config.translationPackage.getErrorTranslation(m.REF) : `${r}${i}:${n}${a}`;
  }
}
function Uh(s, e) {
  return s.toString().replace(".", e);
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class mn {
  constructor(e, t, r) {
    this.config = e, this.functionRegistry = t, this.resolveSheetReference = r, this.statsCacheUsed = 0, this.lexerConfig = xp(e), this.lexer = new Ls(this.lexerConfig), this.formulaParser = new Gr(this.lexerConfig, this.resolveSheetReference), this.cache = new Lp(this.functionRegistry);
  }
  /**
   * Parses a formula.
   *
   * @param text - formula to parse
   * @param formulaAddress - address with regard to which formula should be parsed. Impacts computed addresses in R0C0 format.
   */
  parse(e, t) {
    this.formulaAddress = t;
    const r = this.tokenizeFormula(e);
    if (r.errors.length > 0) {
      const d = r.errors.map((p) => ({
        type: ae.LexingError,
        message: p.message
      }));
      return {
        ast: Vi(),
        errors: d,
        hasVolatileFunction: !1,
        hasStructuralChangeFunction: !1,
        dependencies: []
      };
    }
    const n = this.computeHashFromTokens(r.tokens, t);
    let i = this.cache.get(n);
    if (i !== void 0)
      ++this.statsCacheUsed;
    else {
      const d = this.bindWhitespacesToTokens(r.tokens), p = this.formulaParser.parseFromTokens(d, t);
      if (p.errors.length > 0)
        return Object.assign(Object.assign({}, p), {
          hasVolatileFunction: !1,
          hasStructuralChangeFunction: !1,
          dependencies: []
        });
      i = this.cache.set(n, p.ast);
    }
    const {
      ast: a,
      hasVolatileFunction: o,
      hasStructuralChangeFunction: u
    } = i, l = this.convertReversedRangesToRegularRanges(a), c = si(l, this.functionRegistry);
    return {
      ast: l,
      errors: [],
      hasVolatileFunction: o,
      hasStructuralChangeFunction: u,
      dependencies: c
    };
  }
  convertReversedRangesToRegularRanges(e) {
    switch (e.type) {
      case g.EMPTY:
      case g.NUMBER:
      case g.STRING:
      case g.ERROR:
      case g.ERROR_WITH_RAW_INPUT:
      case g.CELL_REFERENCE:
      case g.NAMED_EXPRESSION:
        return e;
      case g.CELL_RANGE: {
        const {
          start: t,
          end: r
        } = e, n = this.orderCellRangeEnds(t, r);
        return Object.assign(Object.assign({}, e), {
          start: n.start,
          end: n.end
        });
      }
      case g.COLUMN_RANGE: {
        const {
          start: t,
          end: r
        } = e, n = this.orderColumnRangeEnds(t, r);
        return Object.assign(Object.assign({}, e), {
          start: n.start,
          end: n.end
        });
      }
      case g.ROW_RANGE: {
        const {
          start: t,
          end: r
        } = e, n = this.orderRowRangeEnds(t, r);
        return Object.assign(Object.assign({}, e), {
          start: n.start,
          end: n.end
        });
      }
      case g.PERCENT_OP:
      case g.PLUS_UNARY_OP:
      case g.MINUS_UNARY_OP: {
        const t = this.convertReversedRangesToRegularRanges(e.value);
        return Object.assign(Object.assign({}, e), {
          value: t
        });
      }
      case g.CONCATENATE_OP:
      case g.EQUALS_OP:
      case g.NOT_EQUAL_OP:
      case g.LESS_THAN_OP:
      case g.GREATER_THAN_OP:
      case g.LESS_THAN_OR_EQUAL_OP:
      case g.GREATER_THAN_OR_EQUAL_OP:
      case g.MINUS_OP:
      case g.PLUS_OP:
      case g.TIMES_OP:
      case g.DIV_OP:
      case g.POWER_OP: {
        const t = this.convertReversedRangesToRegularRanges(e.left), r = this.convertReversedRangesToRegularRanges(e.right);
        return Object.assign(Object.assign({}, e), {
          left: t,
          right: r
        });
      }
      case g.PARENTHESIS: {
        const t = this.convertReversedRangesToRegularRanges(e.expression);
        return Object.assign(Object.assign({}, e), {
          expression: t
        });
      }
      case g.FUNCTION_CALL: {
        const t = e.args.map((r) => this.convertReversedRangesToRegularRanges(r));
        return Object.assign(Object.assign({}, e), {
          args: t
        });
      }
      case g.ARRAY: {
        const t = e.args.map((r) => r.map((n) => this.convertReversedRangesToRegularRanges(n)));
        return Object.assign(Object.assign({}, e), {
          args: t
        });
      }
    }
  }
  orderCellRangeEnds(e, t) {
    const r = [e, t], [n, i] = r.map((c) => c.toColumnAddress()).sort(xe.compareByAbsoluteAddress(this.formulaAddress)), [a, o] = r.map((c) => c.toRowAddress()).sort(Le.compareByAbsoluteAddress(this.formulaAddress)), [u, l] = r.map((c) => c.sheet).sort(mn.compareSheetIds.bind(this));
    return {
      start: j.fromColAndRow(n, a, u),
      end: j.fromColAndRow(i, o, l)
    };
  }
  orderColumnRangeEnds(e, t) {
    const r = [e, t], [n, i] = r.sort(xe.compareByAbsoluteAddress(this.formulaAddress)), [a, o] = r.map((u) => u.sheet).sort(mn.compareSheetIds.bind(this));
    return {
      start: new xe(n.type, n.col, a),
      end: new xe(i.type, i.col, o)
    };
  }
  orderRowRangeEnds(e, t) {
    const r = [e, t], [n, i] = r.sort(Le.compareByAbsoluteAddress(this.formulaAddress)), [a, o] = r.map((u) => u.sheet).sort(mn.compareSheetIds.bind(this));
    return {
      start: new Le(n.type, n.row, a),
      end: new Le(i.type, i.row, o)
    };
  }
  static compareSheetIds(e, t) {
    return e = e != null ? e : 1 / 0, t = t != null ? t : 1 / 0, e - t;
  }
  fetchCachedResultForAst(e) {
    const t = this.computeHashFromAst(e);
    return this.fetchCachedResult(t);
  }
  fetchCachedResult(e) {
    const t = this.cache.get(e);
    if (t === void 0)
      throw new Error("There is no AST with such key in the cache");
    {
      const {
        ast: r,
        hasVolatileFunction: n,
        hasStructuralChangeFunction: i,
        relativeDependencies: a
      } = t;
      return {
        ast: r,
        errors: [],
        hasVolatileFunction: n,
        hasStructuralChangeFunction: i,
        dependencies: a
      };
    }
  }
  computeHashFromTokens(e, t) {
    var r;
    let n = "", i = 0;
    for (; i < e.length; ) {
      const a = e[i];
      if ($(a, tr)) {
        const o = br(a.image, t, this.resolveSheetReference);
        o === void 0 ? n = n.concat(a.image) : n = n.concat(o.hash(!0));
      } else if ($(a, Ma)) {
        const o = a.image.toUpperCase().slice(0, -1), u = (r = this.lexerConfig.functionMapping[o]) !== null && r !== void 0 ? r : o;
        n = n.concat(u, "(");
      } else if ($(a, Ia)) {
        const [o, u] = a.image.split(":"), l = Rs(o, t, this.resolveSheetReference), c = Rs(u, t, this.resolveSheetReference);
        l === void 0 || c === void 0 ? n = n.concat("!REF") : n = n.concat(l.hash(!0), ":", c.hash(!0));
      } else if ($(a, Oa)) {
        const [o, u] = a.image.split(":"), l = Ns(o, t, this.resolveSheetReference), c = Ns(u, t, this.resolveSheetReference);
        l === void 0 || c === void 0 ? n = n.concat("!REF") : n = n.concat(l.hash(!0), ":", c.hash(!0));
      } else
        n = n.concat(a.image);
      i++;
    }
    return n;
  }
  rememberNewAst(e) {
    const t = this.computeHashFromAst(e);
    return this.cache.maybeSetAndThenGet(t, e);
  }
  computeHashFromAst(e) {
    return "=" + this.computeHashOfAstNode(e);
  }
  computeHashOfAstNode(e) {
    switch (e.type) {
      case g.EMPTY:
        return e.leadingWhitespace || "";
      case g.NUMBER:
        return W(Uh(e.value, this.config.decimalSeparator), e.leadingWhitespace);
      case g.STRING:
        return W('"' + e.value + '"', e.leadingWhitespace);
      case g.NAMED_EXPRESSION:
        return W(e.expressionName, e.leadingWhitespace);
      case g.FUNCTION_CALL: {
        const t = e.args.map((n) => this.computeHashOfAstNode(n)).join(this.config.functionArgSeparator), r = e.procedureName + "(" + t + W(")", e.internalWhitespace);
        return W(r, e.leadingWhitespace);
      }
      case g.CELL_REFERENCE:
        return W(e.reference.hash(!0), e.leadingWhitespace);
      case g.COLUMN_RANGE:
      case g.ROW_RANGE:
      case g.CELL_RANGE: {
        const t = e.start.hash(e.sheetReferenceType !== je.RELATIVE), r = e.end.hash(e.sheetReferenceType === je.BOTH_ABSOLUTE);
        return W(t + ":" + r, e.leadingWhitespace);
      }
      case g.MINUS_UNARY_OP:
        return W("-" + this.computeHashOfAstNode(e.value), e.leadingWhitespace);
      case g.PLUS_UNARY_OP:
        return W("+" + this.computeHashOfAstNode(e.value), e.leadingWhitespace);
      case g.PERCENT_OP:
        return this.computeHashOfAstNode(e.value) + W("%", e.leadingWhitespace);
      case g.ERROR: {
        const t = this.config.translationPackage.getErrorTranslation(e.error ? e.error.type : m.ERROR);
        return W(t, e.leadingWhitespace);
      }
      case g.ERROR_WITH_RAW_INPUT:
        return W(e.rawInput, e.leadingWhitespace);
      case g.ARRAY: {
        const t = e.args.map((r) => r.map((n) => this.computeHashOfAstNode(n)).join(",")).join(";");
        return W("{" + t + W("}", e.internalWhitespace), e.leadingWhitespace);
      }
      case g.PARENTHESIS: {
        const r = "(" + this.computeHashOfAstNode(e.expression) + W(")", e.internalWhitespace);
        return W(r, e.leadingWhitespace);
      }
      default:
        return this.computeHashOfAstNode(e.left) + W(Eh[e.type], e.leadingWhitespace) + this.computeHashOfAstNode(e.right);
    }
  }
  bindWhitespacesToTokens(e) {
    const t = [], r = e[0];
    $(r, this.lexerConfig.WhiteSpace) || t.push(r);
    for (let n = 1; n < e.length; ++n) {
      const i = e[n];
      if ($(i, this.lexerConfig.WhiteSpace))
        continue;
      const a = e[n - 1];
      $(a, this.lexerConfig.WhiteSpace) && (i.leadingWhitespace = a), t.push(i);
    }
    return t;
  }
  tokenizeFormula(e) {
    return this.lexer.tokenizeFormula(e);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Pr = (s, e, t, r) => {
  switch (s.type) {
    case g.EMPTY:
    case g.NUMBER:
    case g.STRING:
    case g.ERROR:
      return;
    case g.NAMED_EXPRESSION: {
      r && t.push(new Ht(s.expressionName));
      return;
    }
    case g.CELL_REFERENCE: {
      r && t.push(new xh(s.reference));
      return;
    }
    case g.CELL_RANGE: {
      r && s.start.sheet === s.end.sheet && t.push(new bp(s.start, s.end));
      return;
    }
    case g.COLUMN_RANGE: {
      r && s.start.sheet === s.end.sheet && t.push(new Pp(s.start, s.end));
      return;
    }
    case g.ROW_RANGE: {
      r && s.start.sheet === s.end.sheet && t.push(new Vp(s.start, s.end));
      return;
    }
    case g.PERCENT_OP:
    case g.PLUS_UNARY_OP:
    case g.MINUS_UNARY_OP: {
      Pr(s.value, e, t, !0);
      return;
    }
    case g.CONCATENATE_OP:
    case g.EQUALS_OP:
    case g.NOT_EQUAL_OP:
    case g.LESS_THAN_OP:
    case g.GREATER_THAN_OP:
    case g.LESS_THAN_OR_EQUAL_OP:
    case g.GREATER_THAN_OR_EQUAL_OP:
    case g.MINUS_OP:
    case g.PLUS_OP:
    case g.TIMES_OP:
    case g.DIV_OP:
    case g.POWER_OP:
      Pr(s.left, e, t, !0), Pr(s.right, e, t, !0);
      return;
    case g.PARENTHESIS:
      Pr(s.expression, e, t, r);
      return;
    case g.FUNCTION_CALL: {
      const n = !e.doesFunctionNeedArgumentToBeComputed(s.procedureName);
      s.args.forEach((i) => Pr(i, e, t, n));
      return;
    }
  }
}, si = (s, e) => {
  const t = new Array();
  return Pr(s, e, t, !0), t;
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class xh {
  constructor(e) {
    this.dependency = e;
  }
  absolutize(e) {
    return this.dependency.toSimpleCellAddress(e);
  }
}
class bp {
  constructor(e, t) {
    this.start = e, this.end = t;
  }
  absolutize(e) {
    return new F(this.start.toSimpleCellAddress(e), this.end.toSimpleCellAddress(e));
  }
}
class Pp {
  constructor(e, t) {
    this.start = e, this.end = t;
  }
  absolutize(e) {
    const t = this.start.toSimpleColumnAddress(e), r = this.end.toSimpleColumnAddress(e);
    return new Wt(t.sheet, t.col, r.col);
  }
}
class Vp {
  constructor(e, t) {
    this.start = e, this.end = t;
  }
  absolutize(e) {
    const t = this.start.toSimpleRowAddress(e), r = this.end.toSimpleRowAddress(e);
    return new Yt(t.sheet, t.row, r.row);
  }
}
class Ht {
  constructor(e) {
    this.name = e;
  }
  absolutize(e) {
    return this;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const _t = (s, e) => s.map((t) => t.absolutize(e)), Dp = (s) => s.filter((e) => e instanceof Ht ? !0 : e instanceof F ? !(ke(e.start) || ke(e.end)) : !ke(e));
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const B = Symbol("Empty value");
function I(s) {
  return s instanceof Vt ? s.val : s;
}
class Vt {
  constructor(e, t) {
    this.val = e, this.format = t;
  }
  fromNumber(e) {
    return new this.constructor(e);
  }
}
function wa(s, e) {
  if (typeof s == "number")
    return e;
  {
    const t = s.fromNumber(e);
    return t.format = s.format, t;
  }
}
class _a extends Vt {
  getDetailedType() {
    return _.NUMBER_DATE;
  }
}
class Wi extends Vt {
  getDetailedType() {
    return _.NUMBER_CURRENCY;
  }
}
class La extends Vt {
  getDetailedType() {
    return _.NUMBER_TIME;
  }
}
class Fa extends Vt {
  getDetailedType() {
    return _.NUMBER_DATETIME;
  }
}
class ds extends Vt {
  getDetailedType() {
    return _.NUMBER_PERCENT;
  }
}
function D(s) {
  return typeof s == "number" || s instanceof Vt;
}
var _;
(function(s) {
  s.NUMBER_RAW = "NUMBER_RAW", s.NUMBER_DATE = "NUMBER_DATE", s.NUMBER_TIME = "NUMBER_TIME", s.NUMBER_DATETIME = "NUMBER_DATETIME", s.NUMBER_CURRENCY = "NUMBER_CURRENCY", s.NUMBER_PERCENT = "NUMBER_PERCENT";
})(_ || (_ = {}));
function Bp(s) {
  return s instanceof Vt ? s.getDetailedType() : _.NUMBER_RAW;
}
function kp(s) {
  if (s instanceof Vt)
    return s.format;
}
function Fs(s) {
  return s instanceof Vt ? {
    type: s.getDetailedType(),
    format: s.format
  } : {
    type: _.NUMBER_RAW
  };
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class M {
  /**
   * In most cases, it's more convenient to create a `SimpleRangeValue` object
   * by calling one of the [static factory methods](#fromrange).
   */
  constructor(e, t, r, n) {
    this._data = e, this.range = t, this.dependencyGraph = r, this._hasOnlyNumbers = n, this.size = e === void 0 ? new b(t.effectiveWidth(r), t.effectiveHeight(r)) : new b(e[0].length, e.length);
  }
  /**
   * Returns the range data as a 2D array.
   */
  get data() {
    return this.ensureThatComputed(), this._data;
  }
  /**
   * A factory method. Returns a `SimpleRangeValue` object with the provided range address and the provided data.
   */
  static fromRange(e, t, r) {
    return new M(e, t, r, !0);
  }
  /**
   * A factory method. Returns a `SimpleRangeValue` object with the provided numeric data.
   */
  static onlyNumbers(e) {
    return new M(e, void 0, void 0, !0);
  }
  /**
   * A factory method. Returns a `SimpleRangeValue` object with the provided data.
   */
  static onlyValues(e) {
    return new M(e, void 0, void 0, void 0);
  }
  /**
   * A factory method. Returns a `SimpleRangeValue` object with the provided range address.
   */
  static onlyRange(e, t) {
    return new M(void 0, e, t, void 0);
  }
  /**
   * A factory method. Returns a `SimpleRangeValue` object that contains a single value.
   */
  static fromScalar(e) {
    return new M([[e]], void 0, void 0, void 0);
  }
  /**
   * Returns `true` if and only if the `SimpleRangeValue` has no address set.
   */
  isAdHoc() {
    return this.range === void 0;
  }
  /**
   * Returns the number of columns contained in the range.
   */
  width() {
    return this.size.width;
  }
  /**
   * Returns the number of rows contained in the range.
   */
  height() {
    return this.size.height;
  }
  /**
   * Returns the range data as a 1D array.
   */
  valuesFromTopLeftCorner() {
    this.ensureThatComputed();
    const e = [];
    for (let t = 0; t < this._data.length; t++)
      for (let r = 0; r < this._data[0].length; r++)
        e.push(this._data[t][r]);
    return e;
  }
  /**
   * Generates the addresses of the cells contained in the range assuming the provided address is the left corner of the range.
   */
  *effectiveAddressesFromData(e) {
    for (let t = 0; t < this.data.length; ++t) {
      const r = this.data[t];
      for (let n = 0; n < r.length; ++n)
        yield O(e.sheet, e.col + n, e.row + t);
    }
  }
  /**
   * Generates values and addresses of the cells contained in the range assuming the provided address is the left corner of the range.
   *
   * This method combines the functionalities of [`iterateValuesFromTopLeftCorner()`](#iteratevaluesfromtopleftcorner) and [`effectiveAddressesFromData()`](#effectiveaddressesfromdata).
   */
  *entriesFromTopLeftCorner(e) {
    this.ensureThatComputed();
    for (let t = 0; t < this.size.height; ++t)
      for (let r = 0; r < this.size.width; ++r)
        yield [this._data[t][r], O(e.sheet, e.col + r, e.row + t)];
  }
  /**
   * Generates the values of the cells contained in the range assuming the provided address is the left corner of the range.
   */
  *iterateValuesFromTopLeftCorner() {
    yield* rt(this.valuesFromTopLeftCorner());
  }
  /**
   * Returns the number of cells contained in the range.
   */
  numberOfElements() {
    return this.size.width * this.size.height;
  }
  /**
   * Returns `true` if and only if the range contains only numeric values.
   */
  hasOnlyNumbers() {
    if (this._hasOnlyNumbers === void 0) {
      this._hasOnlyNumbers = !0;
      for (const e of this.data)
        for (const t of e)
          if (typeof t != "number")
            return this._hasOnlyNumbers = !1, !1;
    }
    return this._hasOnlyNumbers;
  }
  /**
   * Returns the range data as a 2D array of numbers.
   *
   * Internal use only.
   */
  rawNumbers() {
    return this._data;
  }
  /**
   * Returns the range data as a 2D array.
   *
   * Internal use only.
   */
  rawData() {
    var e;
    return this.ensureThatComputed(), (e = this._data) !== null && e !== void 0 ? e : [];
  }
  /**
   * Returns `true` if and only if the range has the same width and height as the `other` range object.
   */
  sameDimensionsAs(e) {
    return this.width() === e.width() && this.height() === e.height();
  }
  /**
   * Computes the range data if it is not computed yet.
   */
  ensureThatComputed() {
    this._data === void 0 && (this._hasOnlyNumbers = !0, this._data = this.range.addressesArrayMap(this.dependencyGraph, (e) => {
      const t = this.dependencyGraph.getCellValue(e);
      return t instanceof M ? (this._hasOnlyNumbers = !1, new f(m.VALUE, E.ScalarExpected)) : (D(t) || (this._hasOnlyNumbers = !1), t);
    }));
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class nr {
  constructor() {
    this.changes = /* @__PURE__ */ new Map();
  }
  static empty() {
    return new nr();
  }
  addAll(e) {
    for (const t of e.changes.values())
      this.add(t.address, t);
    return this;
  }
  addChange(e, t, r) {
    this.addInterpreterValue(e, t, r);
  }
  exportChanges(e) {
    let t = [];
    return this.changes.forEach((r) => {
      const n = e.exportChange(r);
      Array.isArray(n) ? t = t.concat(n) : t.push(n);
    }), t;
  }
  getChanges() {
    return Array.from(this.changes.values());
  }
  isEmpty() {
    return this.changes.size === 0;
  }
  add(e, t) {
    const r = t.value;
    if (r instanceof M)
      for (const n of r.effectiveAddressesFromData(e))
        this.changes.delete(gn(n));
    this.changes.set(gn(e), t);
  }
  addInterpreterValue(e, t, r) {
    this.add(t, {
      address: t,
      value: e,
      oldValue: r
    });
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Us {
  constructor(e, t, r, n) {
    this.displayName = e, this.address = t, this.added = r, this.options = n;
  }
  normalizeExpressionName() {
    return this.displayName.toLowerCase();
  }
  copy() {
    return new Us(this.displayName, this.address, this.added, this.options);
  }
}
class Gp {
  constructor() {
    this.mapping = /* @__PURE__ */ new Map();
  }
  has(e) {
    return this.mapping.has(this.normalizeExpressionName(e));
  }
  isNameAvailable(e) {
    const t = this.normalizeExpressionName(e), r = this.mapping.get(t);
    return !(r && r.added);
  }
  add(e) {
    this.mapping.set(e.normalizeExpressionName(), e);
  }
  get(e) {
    return this.mapping.get(this.normalizeExpressionName(e));
  }
  getExisting(e) {
    const t = this.mapping.get(this.normalizeExpressionName(e));
    if (t && t.added)
      return t;
  }
  remove(e) {
    const t = this.normalizeExpressionName(e), r = this.mapping.get(t);
    r && (r.added = !1);
  }
  getAllNamedExpressions() {
    return Array.from(this.mapping.values()).filter((e) => e.added);
  }
  normalizeExpressionName(e) {
    return e.toLowerCase();
  }
}
class _o {
  constructor() {
    this.mapping = /* @__PURE__ */ new Map();
  }
  add(e) {
    this.mapping.set(this.normalizeExpressionName(e.displayName), e);
  }
  get(e) {
    return this.mapping.get(this.normalizeExpressionName(e));
  }
  has(e) {
    return this.mapping.has(this.normalizeExpressionName(e));
  }
  getAllNamedExpressions() {
    return Array.from(this.mapping.values()).filter((e) => e.added);
  }
  isNameAvailable(e) {
    const t = this.normalizeExpressionName(e);
    return !this.mapping.has(t);
  }
  remove(e) {
    const t = this.normalizeExpressionName(e);
    this.mapping.get(t) && this.mapping.delete(t);
  }
  normalizeExpressionName(e) {
    return e.toLowerCase();
  }
}
class Xt {
  constructor() {
    this.nextNamedExpressionRow = 0, this.workbookStore = new Gp(), this.worksheetStores = /* @__PURE__ */ new Map(), this.addressCache = /* @__PURE__ */ new Map();
  }
  isNameAvailable(e, t) {
    var r, n;
    return t === void 0 ? this.workbookStore.isNameAvailable(e) : (n = (r = this.worksheetStore(t)) === null || r === void 0 ? void 0 : r.isNameAvailable(e)) !== null && n !== void 0 ? n : !0;
  }
  namedExpressionInAddress(e) {
    const t = this.addressCache.get(e);
    if (t && t.added)
      return t;
  }
  namedExpressionForScope(e, t) {
    var r;
    return t === void 0 ? this.workbookStore.getExisting(e) : (r = this.worksheetStore(t)) === null || r === void 0 ? void 0 : r.get(e);
  }
  nearestNamedExpression(e, t) {
    var r, n;
    return (n = (r = this.worksheetStore(t)) === null || r === void 0 ? void 0 : r.get(e)) !== null && n !== void 0 ? n : this.workbookStore.getExisting(e);
  }
  isExpressionInScope(e, t) {
    var r, n;
    return (n = (r = this.worksheetStore(t)) === null || r === void 0 ? void 0 : r.has(e)) !== null && n !== void 0 ? n : !1;
  }
  /**
   * Checks the validity of a named-expression's name.
   *
   * The name:
   * - Must start with a Unicode letter or with an underscore (`_`).
   * - Can contain only Unicode letters, numbers, underscores, and periods (`.`).
   * - Can't be the same as any possible reference in the A1 notation (`[A-Za-z]+[0-9]+`).
   * - Can't be the same as any possible reference in the R1C1 notation (`[rR][0-9]*[cC][0-9]*`).
   *
   * The naming rules follow the [OpenDocument](https://docs.oasis-open.org/office/OpenDocument/v1.3/os/part4-formula/OpenDocument-v1.3-os-part4-formula.html#__RefHeading__1017964_715980110) standard.
   */
  isNameValid(e) {
    const t = new RegExp(`^${Cu}$`), r = new RegExp(`^${Iu}$`), n = new RegExp(`^${Ou}$`);
    return t.test(e) || r.test(e) ? !1 : n.test(e);
  }
  addNamedExpression(e, t, r) {
    const n = t === void 0 ? this.workbookStore : this.worksheetStoreOrCreate(t);
    let i = n.get(e);
    return i !== void 0 ? (i.added = !0, i.displayName = e, i.options = r) : (i = new Us(e, this.nextAddress(), !0, r), n.add(i)), this.addressCache.set(i.address.row, i), i;
  }
  restoreNamedExpression(e, t) {
    const r = t === void 0 ? this.workbookStore : this.worksheetStoreOrCreate(t);
    return e.added = !0, r.add(e), this.addressCache.set(e.address.row, e), e;
  }
  namedExpressionOrPlaceholder(e, t) {
    var r;
    return (r = this.worksheetStoreOrCreate(t).get(e)) !== null && r !== void 0 ? r : this.workbookNamedExpressionOrPlaceholder(e);
  }
  workbookNamedExpressionOrPlaceholder(e) {
    let t = this.workbookStore.get(e);
    return t === void 0 && (t = new Us(e, this.nextAddress(), !1), this.workbookStore.add(t)), t;
  }
  remove(e, t) {
    let r;
    t === void 0 ? r = this.workbookStore : r = this.worksheetStore(t);
    const n = r == null ? void 0 : r.get(e);
    if (r === void 0 || n === void 0 || !n.added)
      throw Error("Named expression does not exist");
    r.remove(e), r instanceof _o && r.mapping.size === 0 && this.worksheetStores.delete(t), this.addressCache.delete(n.address.row);
  }
  getAllNamedExpressionsNamesInScope(e) {
    return this.getAllNamedExpressions().filter(({
      scope: t
    }) => t === e).map((t) => t.expression.displayName);
  }
  getAllNamedExpressionsNames() {
    return this.getAllNamedExpressions().map((e) => e.expression.displayName);
  }
  getAllNamedExpressions() {
    const e = [];
    return this.workbookStore.getAllNamedExpressions().forEach((t) => {
      e.push({
        expression: t,
        scope: void 0
      });
    }), this.worksheetStores.forEach((t, r) => {
      t.getAllNamedExpressions().forEach((n) => {
        e.push({
          expression: n,
          scope: r
        });
      });
    }), e;
  }
  getAllNamedExpressionsForScope(e) {
    var t, r;
    return e === void 0 ? this.workbookStore.getAllNamedExpressions() : (r = (t = this.worksheetStores.get(e)) === null || t === void 0 ? void 0 : t.getAllNamedExpressions()) !== null && r !== void 0 ? r : [];
  }
  worksheetStoreOrCreate(e) {
    let t = this.worksheetStores.get(e);
    return t || (t = new _o(), this.worksheetStores.set(e, t)), t;
  }
  worksheetStore(e) {
    return this.worksheetStores.get(e);
  }
  nextAddress() {
    return O(Xt.SHEET_FOR_WORKBOOK_EXPRESSIONS, 0, this.nextNamedExpressionRow++);
  }
}
Xt.SHEET_FOR_WORKBOOK_EXPRESSIONS = -1;
const Qt = (s) => {
  switch (s.type) {
    case g.EMPTY:
    case g.NUMBER:
    case g.STRING:
    case g.ERROR:
    case g.ERROR_WITH_RAW_INPUT:
      return !1;
    case g.CELL_REFERENCE:
      return !s.reference.isAbsolute();
    case g.CELL_RANGE:
    case g.COLUMN_RANGE:
    case g.ROW_RANGE:
      return !s.start.isAbsolute();
    case g.NAMED_EXPRESSION:
      return !1;
    case g.PERCENT_OP:
    case g.PLUS_UNARY_OP:
    case g.MINUS_UNARY_OP:
      return Qt(s.value);
    case g.CONCATENATE_OP:
    case g.EQUALS_OP:
    case g.NOT_EQUAL_OP:
    case g.LESS_THAN_OP:
    case g.GREATER_THAN_OP:
    case g.LESS_THAN_OR_EQUAL_OP:
    case g.GREATER_THAN_OR_EQUAL_OP:
    case g.MINUS_OP:
    case g.PLUS_OP:
    case g.TIMES_OP:
    case g.DIV_OP:
    case g.POWER_OP:
      return Qt(s.left) || Qt(s.right);
    case g.PARENTHESIS:
      return Qt(s.expression);
    case g.FUNCTION_CALL:
      return s.args.some((e) => Qt(e));
    case g.ARRAY:
      return s.args.some((e) => e.some((t) => Qt(t)));
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ge {
  constructor(e, t, r) {
    if (this.sheet = e, this.rowStart = t, this.rowEnd = r, t < 0)
      throw Error("Starting row cant be less than 0");
    if (r < t)
      throw Error("Row span cant end before start");
  }
  get numberOfRows() {
    return this.rowEnd - this.rowStart + 1;
  }
  get start() {
    return this.rowStart;
  }
  get end() {
    return this.rowEnd;
  }
  static fromNumberOfRows(e, t, r) {
    return new Ge(e, t, t + r - 1);
  }
  static fromRowStartAndEnd(e, t, r) {
    return new Ge(e, t, r);
  }
  *rows() {
    for (let e = this.rowStart; e <= this.rowEnd; ++e)
      yield e;
  }
  intersect(e) {
    if (this.sheet !== e.sheet)
      throw Error("Can't intersect spans from different sheets");
    const t = Math.max(this.rowStart, e.rowStart), r = Math.min(this.rowEnd, e.rowEnd);
    return t > r ? null : new Ge(this.sheet, t, r);
  }
  firstRow() {
    return new Ge(this.sheet, this.rowStart, this.rowStart);
  }
}
class qe {
  constructor(e, t, r) {
    if (this.sheet = e, this.columnStart = t, this.columnEnd = r, t < 0)
      throw Error("Starting column cant be less than 0");
    if (r < t)
      throw Error("Column span cant end before start");
  }
  get numberOfColumns() {
    return this.columnEnd - this.columnStart + 1;
  }
  get start() {
    return this.columnStart;
  }
  get end() {
    return this.columnEnd;
  }
  static fromNumberOfColumns(e, t, r) {
    return new qe(e, t, t + r - 1);
  }
  static fromColumnStartAndEnd(e, t, r) {
    return new qe(e, t, r);
  }
  *columns() {
    for (let e = this.columnStart; e <= this.columnEnd; ++e)
      yield e;
  }
  intersect(e) {
    if (this.sheet !== e.sheet)
      throw Error("Can't intersect spans from different sheets");
    const t = Math.max(this.columnStart, e.columnStart), r = Math.min(this.columnEnd, e.columnEnd);
    return t > r ? null : new qe(this.sheet, t, r);
  }
  firstColumn() {
    return new qe(this.sheet, this.columnStart, this.columnStart);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var P;
(function(s) {
  s.BUILD_ENGINE_TOTAL = "BUILD_ENGINE_TOTAL", s.PARSER = "PARSER", s.GRAPH_BUILD = "GRAPH_BUILD", s.COLLECT_DEPENDENCIES = "COLLECT_DEPENDENCIES", s.PROCESS_DEPENDENCIES = "PROCESS_DEPENDENCIES", s.TOP_SORT = "TOP_SORT", s.BUILD_COLUMN_INDEX = "BUILD_COLUMN_INDEX", s.EVALUATION = "EVALUATION", s.VLOOKUP = "VLOOKUP", s.TRANSFORM_ASTS = "TRANSFORM_ASTS", s.TRANSFORM_ASTS_POSTPONED = "TRANSFORM_ASTS_POSTPONED", s.ADJUSTING_ADDRESS_MAPPING = "ADJUSTING_ADDRESS_MAPPING", s.ADJUSTING_ARRAY_MAPPING = "ADJUSTING_ARRAY_MAPPING", s.ADJUSTING_RANGES = "ADJUSTING_RANGES", s.ADJUSTING_GRAPH = "ADJUSTING_GRAPH", s.CRITERION_FUNCTION_FULL_CACHE_USED = "CRITERION_FUNCTION_FULL_CACHE_USED", s.CRITERION_FUNCTION_PARTIAL_CACHE_USED = "CRITERION_FUNCTION_PARTIAL_CACHE_USED";
})(P || (P = {}));
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class bh {
  constructor() {
    this.stats = /* @__PURE__ */ new Map([[P.CRITERION_FUNCTION_FULL_CACHE_USED, 0], [P.CRITERION_FUNCTION_PARTIAL_CACHE_USED, 0]]), this.startTimes = /* @__PURE__ */ new Map();
  }
  incrementCriterionFunctionFullCacheUsed() {
    var e;
    const t = ((e = this.stats.get(P.CRITERION_FUNCTION_FULL_CACHE_USED)) !== null && e !== void 0 ? e : 0) + 1;
    this.stats.set(P.CRITERION_FUNCTION_FULL_CACHE_USED, t);
  }
  incrementCriterionFunctionPartialCacheUsed() {
    var e;
    const t = ((e = this.stats.get(P.CRITERION_FUNCTION_PARTIAL_CACHE_USED)) !== null && e !== void 0 ? e : 0) + 1;
    this.stats.set(P.CRITERION_FUNCTION_PARTIAL_CACHE_USED, t);
  }
  /**
   * Resets statistics
   */
  reset() {
    this.stats.clear(), this.startTimes.clear(), this.stats.set(P.CRITERION_FUNCTION_FULL_CACHE_USED, 0), this.stats.set(P.CRITERION_FUNCTION_PARTIAL_CACHE_USED, 0);
  }
  /**
   * Starts tracking particular statistic.
   *
   * @param name - statistic to start tracking
   */
  start(e) {
    if (this.startTimes.get(e))
      throw Error(`Statistics ${e} already started`);
    this.startTimes.set(e, Date.now());
  }
  /**
   * Stops tracking particular statistic.
   * Raise error if tracking statistic wasn't started.
   *
   * @param name - statistic to stop tracking
   */
  end(e) {
    var t;
    const r = Date.now(), n = this.startTimes.get(e);
    if (n) {
      let i = (t = this.stats.get(e)) !== null && t !== void 0 ? t : 0;
      i += r - n, this.stats.set(e, i), this.startTimes.delete(e);
    } else
      throw Error(`Statistics ${e} not started`);
  }
  /**
   * Measure given statistic as execution of given function.
   *
   * @param name - statistic to track
   * @param func - function to call
   * @returns result of the function call
   */
  measure(e, t) {
    this.start(e);
    const r = t();
    return this.end(e), r;
  }
  /**
   * Returns the snapshot of current results
   */
  snapshot() {
    return new Map(this.stats);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Hp extends bh {
  /** @inheritDoc */
  incrementCriterionFunctionFullCacheUsed() {
  }
  /** @inheritDoc */
  incrementCriterionFunctionPartialCacheUsed() {
  }
  /** @inheritDoc */
  start(e) {
  }
  /** @inheritDoc */
  end(e) {
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class _e extends Error {
  constructor(e) {
    super(`There's no sheet with id = ${e}`);
  }
}
class Ph extends Error {
  constructor(e) {
    super(`There's no sheet with name '${e}'`);
  }
}
class Jt extends Error {
  constructor(e) {
    super(`Sheet with name ${e} already exists`);
  }
}
class yr extends Error {
  constructor() {
    super("Sheet size limit exceeded");
  }
}
class fs extends Error {
  constructor() {
    super("This is not a formula");
  }
}
class Vh extends Error {
  constructor(e) {
    super(`Address (row = ${e.row}, col = ${e.col}) is invalid`);
  }
}
class fe extends Error {
  constructor(e) {
    super(`Invalid arguments, expected ${e}`);
  }
}
class vn extends Error {
  constructor(e, t) {
    super(`Sheets ${e} and ${t} are not equal.`);
  }
}
class Dh extends Error {
  constructor(e) {
    super(`Name of Named Expression '${e}' is already present`);
  }
}
class Bh extends Error {
  constructor(e) {
    super(`Name of Named Expression '${e}' is invalid`);
  }
}
class Cn extends Error {
  constructor(e) {
    super(`Named Expression '${e}' does not exist`);
  }
}
class kh extends Error {
  constructor() {
    super("There is no operation to undo");
  }
}
class Gh extends Error {
  constructor() {
    super("There is no operation to redo");
  }
}
class Hh extends Error {
  constructor() {
    super("There is nothing to paste");
  }
}
function Wp(s, e) {
  switch (typeof e) {
    case "function":
    case "symbol":
      return e.toString();
    case "bigint":
      return "BigInt(" + e.toString() + ")";
    default:
      return e instanceof RegExp ? "RegExp(" + e.toString() + ")" : e;
  }
}
class Wh extends Error {
  constructor(e) {
    super(`Unable to parse value: ${JSON.stringify(e, Wp, 4)}`);
  }
}
class Y extends Error {
  constructor(e, t) {
    super(`Expected value of type: ${e} for config parameter: ${t}`);
  }
}
class Yp extends Error {
  constructor(e) {
    super(`Config parameter ${e} cannot be empty.`);
  }
}
class Yh extends Error {
  constructor(e, t) {
    super(`Config parameter ${e} should be at least ${t}`);
  }
}
class zh extends Error {
  constructor(e, t) {
    super(`Config parameter ${e} should be at most ${t}`);
  }
}
class Xh extends Error {
  constructor(e, t) {
    super(`Expected one of ${e} for config parameter: ${t}`);
  }
}
class $h extends Error {
  constructor() {
    super("Computations are suspended");
  }
}
class Vr extends Error {
  constructor(e) {
    super(`Translation for ${e} is missing in the translation package you're using.`);
  }
}
class Kh extends Error {
  constructor(e) {
    super(`Cannot register translation for function with id: ${e}`);
  }
}
class Yi extends Error {
  constructor() {
    super("Language not registered.");
  }
}
class jh extends Error {
  constructor() {
    super("Language already registered.");
  }
}
class Qr extends Error {
  static functionNotDeclaredInPlugin(e, t) {
    return new Qr(`Function with id ${e} not declared in plugin ${t}`);
  }
  static functionMethodNotFound(e, t) {
    return new Qr(`Function method ${e} not found in plugin ${t}`);
  }
}
class vr extends Error {
  static cannotRegisterFunctionWithId(e) {
    return new vr(`Cannot register function with id ${e}`);
  }
  static cannotUnregisterFunctionWithId(e) {
    return new vr(`Cannot unregister function with id ${e}`);
  }
  static cannotUnregisterProtectedPlugin() {
    return new vr("Cannot unregister protected plugin");
  }
}
class Hr extends Error {
  constructor() {
    super("Cannot perform this operation, source location has an array inside.");
  }
}
class xs extends Error {
  constructor() {
    super("Cannot perform this operation, target location has an array inside.");
  }
}
class Ua extends Error {
  constructor() {
    super("Relative addresses not allowed in named expressions.");
  }
}
class zp extends Error {
  constructor(e, t) {
    super(`Alias id ${e} in plugin ${t} already defined as a function or alias.`);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Xp {
  constructor(e) {
    this.policy = e, this.mapping = /* @__PURE__ */ new Map();
  }
  /**
   * Gets the cell vertex at the specified address.
   */
  getCell(e, t = {}) {
    const r = this.mapping.get(e.sheet);
    if (!r) {
      if (t.throwIfSheetNotExists)
        throw new _e(e.sheet);
      return;
    }
    const n = r.getCell(e);
    if (!n && t.throwIfCellNotExists)
      throw Error("Vertex for address missing in AddressMapping");
    return n;
  }
  /**
   * Gets the cell vertex at the specified address or throws if it doesn't exist.
   * @throws {NoSheetWithIdError} if sheet doesn't exist
   * @throws {Error} if cell doesn't exist
   */
  getCellOrThrow(e) {
    const t = this.mapping.get(e.sheet);
    if (!t)
      throw new _e(e.sheet);
    const r = t.getCell(e);
    if (!r)
      throw Error("Vertex for address missing in AddressMapping");
    return r;
  }
  /**
   * Gets the address mapping strategy for the specified sheet.
   * @throws {NoSheetWithIdError} if sheet doesn't exist
   */
  getStrategyForSheetOrThrow(e) {
    const t = this.mapping.get(e);
    if (t === void 0)
      throw new _e(e);
    return t;
  }
  /**
   * Adds a new sheet with the specified strategy.
   * @throws {Error} if sheet is already added and throwIfSheetAlreadyExists is true
   */
  addSheetWithStrategy(e, t, r = {
    throwIfSheetAlreadyExists: !0
  }) {
    const n = this.mapping.get(e);
    if (n) {
      if (r.throwIfSheetAlreadyExists)
        throw Error("Sheet already added");
      return n;
    }
    return this.mapping.set(e, t), t;
  }
  /**
   * Adds a sheet or changes the strategy for an existing sheet.
   * Designed for the purpose of exchanging the placeholder strategy for a real strategy.
   */
  addSheetOrChangeStrategy(e, t) {
    const r = this.createStrategyBasedOnBoundaries(t), n = this.mapping.get(e);
    return n ? r instanceof zi ? n : (this.moveStrategyContent(n, r, e), this.mapping.set(e, r), r) : (this.mapping.set(e, r), r);
  }
  /**
   * Moves the content of the source strategy to the target strategy.
   */
  moveStrategyContent(e, t, r) {
    const n = e.getEntries(r);
    for (const [i, a] of n)
      t.setCell(i, a);
  }
  /**
   * Adds a sheet and sets the strategy based on the sheet boundaries.
   * @throws {Error} if sheet already exists and throwIfSheetAlreadyExists is true
   */
  addSheetAndSetStrategyBasedOnBoundaries(e, t, r = {
    throwIfSheetAlreadyExists: !0
  }) {
    this.addSheetWithStrategy(e, this.createStrategyBasedOnBoundaries(t), r);
  }
  /**
   * Creates a strategy based on the sheet boundaries.
   */
  createStrategyBasedOnBoundaries(e) {
    const {
      height: t,
      width: r,
      fill: n
    } = e, i = this.policy.call(n);
    return new i(r, t);
  }
  /**
   * Adds a placeholder strategy (DenseStrategy) for a sheet. If the sheet already exists, does nothing.
   */
  addSheetStrategyPlaceholderIfNotExists(e) {
    this.mapping.has(e) || this.mapping.set(e, new zi(0, 0));
  }
  /**
   * Removes a sheet from the address mapping.
   * If sheet does not exist, does nothing.
   * @returns {boolean} true if sheet was removed, false if it did not exist.
   */
  removeSheetIfExists(e) {
    return this.mapping.delete(e);
  }
  /**
   * Gets the interpreter value of a cell at the specified address.
   * @returns {InterpreterValue} The interpreter value (returns EmptyValue if cell doesn't exist)
   */
  getCellValue(e) {
    const t = this.getCell(e);
    return t === void 0 ? B : t instanceof le ? t.getArrayCellValue(e) : t.getCellValue();
  }
  /**
   * Gets the raw cell content at the specified address.
   * @returns {RawCellContent} The raw cell content or null if cell doesn't exist or is not a value cell
   */
  getRawValue(e) {
    const t = this.getCell(e);
    return t instanceof sr ? t.getValues().rawValue : t instanceof le ? t.getArrayCellRawValue(e) : null;
  }
  /**
   * Sets a cell vertex at the specified address.
   * @throws {Error} if sheet not initialized
   */
  setCell(e, t) {
    const r = this.mapping.get(e.sheet);
    if (!r)
      throw Error("Sheet not initialized");
    r.setCell(e, t);
  }
  /**
   * Moves a cell from source address to destination address.
   * Supports cross-sheet moves (used for placeholder sheet merging).
   * @throws {Error} if source sheet not initialized
   * @throws {Error} if destination occupied
   * @throws {Error} if source cell doesn't exist
   */
  moveCell(e, t) {
    const r = this.mapping.get(e.sheet);
    if (!r)
      throw Error("Sheet not initialized.");
    if (this.has(t))
      throw new Error("Cannot move cell. Destination already occupied.");
    const n = r.getCell(e);
    if (n === void 0)
      throw new Error("Cannot move cell. No cell with such address.");
    this.setCell(t, n), this.removeCell(e);
  }
  /**
   * Removes a cell at the specified address.
   * @throws Error if sheet not initialized
   */
  removeCell(e) {
    const t = this.mapping.get(e.sheet);
    if (!t)
      throw Error("Sheet not initialized");
    t.removeCell(e);
  }
  /**
   * Checks if a cell exists at the specified address.
   */
  has(e) {
    const t = this.mapping.get(e.sheet);
    return t === void 0 ? !1 : t.has(e);
  }
  /**
   * Gets the height of the specified sheet.
   */
  getSheetHeight(e) {
    return this.getStrategyForSheetOrThrow(e).getHeight();
  }
  /**
   * Gets the width of the specified sheet.
   */
  getSheetWidth(e) {
    return this.getStrategyForSheetOrThrow(e).getWidth();
  }
  /**
   * Adds rows to a sheet.
   */
  addRows(e, t, r) {
    this.getStrategyForSheetOrThrow(e).addRows(t, r);
  }
  /**
   * Removes rows from a sheet.
   */
  removeRows(e) {
    this.getStrategyForSheetOrThrow(e.sheet).removeRows(e);
  }
  /**
   * Adds columns to a sheet starting at the specified column index.
   */
  addColumns(e, t, r) {
    this.getStrategyForSheetOrThrow(e).addColumns(t, r);
  }
  /**
   * Removes columns from a sheet.
   */
  removeColumns(e) {
    this.getStrategyForSheetOrThrow(e.sheet).removeColumns(e);
  }
  /**
   * Returns an iterator of cell vertices within the specified rows span.
   */
  *verticesFromRowsSpan(e) {
    yield* rt(this.mapping.get(e.sheet).verticesFromRowsSpan(e));
  }
  /**
   * Returns an iterator of cell vertices within the specified columns span.
   */
  *verticesFromColumnsSpan(e) {
    yield* rt(this.mapping.get(e.sheet).verticesFromColumnsSpan(e));
  }
  /**
   * Returns an iterator of address-vertex pairs within the specified rows span.
   */
  *entriesFromRowsSpan(e) {
    const t = this.getStrategyForSheetOrThrow(e.sheet);
    yield* rt(t.entriesFromRowsSpan(e));
  }
  /**
   * Returns an iterator of address-vertex pairs within the specified columns span.
   */
  *entriesFromColumnsSpan(e) {
    const t = this.getStrategyForSheetOrThrow(e.sheet);
    yield* rt(t.entriesFromColumnsSpan(e));
  }
  /**
   * Returns an iterator of all address-vertex pairs across all sheets.
   * @returns {IterableIterator<[SimpleCellAddress, Maybe<CellVertex>]>} Iterator of [address, vertex] tuples
   */
  *entries() {
    for (const [e, t] of this.mapping.entries())
      yield* rt(t.getEntries(e));
  }
  /**
   * Returns an iterator of address-vertex pairs for a specific sheet.
   * @returns {IterableIterator<[SimpleCellAddress, CellVertex]>} Iterator of [address, vertex] tuples
   * @throws {NoSheetWithIdError} if sheet doesn't exist
   */
  *sheetEntries(e) {
    const t = this.getStrategyForSheetOrThrow(e);
    yield* rt(t.getEntries(e));
  }
  /**
   * Checks if a sheet has any entries.
   * @throws {NoSheetWithIdError} if sheet doesn't exist
   */
  hasAnyEntries(e) {
    return !this.sheetEntries(e).next().done;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class $p {
  constructor() {
    this.arrayMapping = /* @__PURE__ */ new Map();
  }
  getArray(e) {
    const t = this.getArrayByCorner(e.start);
    if (t != null && t.getRange().sameAs(e))
      return t;
  }
  getArrayByCorner(e) {
    return this.arrayMapping.get(gn(e));
  }
  setArray(e, t) {
    this.arrayMapping.set(gn(e.start), t);
  }
  removeArray(e) {
    typeof e == "string" ? this.arrayMapping.delete(e) : this.arrayMapping.delete(gn(e.start));
  }
  count() {
    return this.arrayMapping.size;
  }
  *arraysInRows(e) {
    for (const [t, r] of this.arrayMapping.entries())
      r.spansThroughSheetRows(e.sheet, e.rowStart, e.rowEnd) && (yield [t, r]);
  }
  *arraysInCols(e) {
    for (const [t, r] of this.arrayMapping.entries())
      r.spansThroughSheetColumn(e.sheet, e.columnStart, e.columnEnd) && (yield [t, r]);
  }
  isFormulaArrayInRow(e, t) {
    for (const r of this.arrayMapping.values())
      if (r.spansThroughSheetRows(e, t))
        return !0;
    return !1;
  }
  isFormulaArrayInAllRows(e) {
    let t = !0;
    for (const r of e.rows())
      this.isFormulaArrayInRow(e.sheet, r) || (t = !1);
    return t;
  }
  isFormulaArrayInColumn(e, t) {
    for (const r of this.arrayMapping.values())
      if (r.spansThroughSheetColumn(e, t))
        return !0;
    return !1;
  }
  isFormulaArrayInAllColumns(e) {
    let t = !0;
    for (const r of e.columns())
      this.isFormulaArrayInColumn(e.sheet, r) || (t = !1);
    return t;
  }
  isFormulaArrayInRange(e) {
    for (const t of this.arrayMapping.values())
      if (t.getRange().doesOverlap(e))
        return !0;
    return !1;
  }
  isFormulaArrayAtAddress(e) {
    for (const t of this.arrayMapping.values())
      if (t.getRange().addressInRange(e))
        return !0;
    return !1;
  }
  moveArrayVerticesAfterRowByRows(e, t, r) {
    this.updateArrayVerticesInSheet(e, (n, i) => {
      const a = i.getRange();
      return t <= a.start.row ? [a.shifted(0, r), i] : void 0;
    });
  }
  moveArrayVerticesAfterColumnByColumns(e, t, r) {
    this.updateArrayVerticesInSheet(e, (n, i) => {
      const a = i.getRange();
      return t <= a.start.col ? [a.shifted(r, 0), i] : void 0;
    });
  }
  updateArrayVerticesInSheet(e, t) {
    const r = Array();
    for (const [n, i] of this.arrayMapping.entries()) {
      if (i.sheet !== e)
        continue;
      const a = t(n, i);
      a !== void 0 && (this.removeArray(n), r.push(a));
    }
    r.forEach(([n, i]) => {
      this.setArray(n, i);
    });
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class un {
  constructor(e) {
    this.size = e;
  }
  width() {
    return this.size.width;
  }
  height() {
    return this.size.height;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(e, t) {
    throw Error("Array not computed yet.");
  }
  simpleRangeValue() {
    throw Error("Array not computed yet.");
  }
}
class Zr {
  constructor(e) {
    if (this.size = new b(e.length > 0 ? e[0].length : 0, e.length), this.array = e, this.size.width <= 0 || this.size.height <= 0)
      throw Error("Incorrect array size");
  }
  static fromInterpreterValue(e) {
    return e instanceof M ? new Zr(e.data) : new Zr([[e]]);
  }
  simpleRangeValue() {
    return M.onlyValues(this.array);
  }
  addRows(e, t) {
    this.array.splice(e, 0, ...this.nullArrays(t, this.width())), this.size.height += t;
  }
  addColumns(e, t) {
    for (let r = 0; r < this.height(); r++)
      this.array[r].splice(e, 0, ...new Array(t).fill(B));
    this.size.width += t;
  }
  removeRows(e, t) {
    if (this.outOfBound(0, e) || this.outOfBound(0, t))
      throw Error("Array index out of bound");
    const r = t - e + 1;
    this.array.splice(e, r), this.size.height -= r;
  }
  removeColumns(e, t) {
    if (this.outOfBound(e, 0) || this.outOfBound(t, 0))
      throw Error("Array index out of bound");
    const r = t - e + 1;
    for (const n of this.array)
      n.splice(e, r);
    this.size.width -= r;
  }
  nullArrays(e, t) {
    const r = [];
    for (let n = 0; n < e; ++n)
      r.push(new Array(t).fill(B));
    return r;
  }
  get(e, t) {
    if (this.outOfBound(e, t))
      throw Error("Array index out of bound");
    return this.array[t][e];
  }
  set(e, t, r) {
    if (this.outOfBound(e, t))
      throw Error("Array index out of bound");
    this.array[t][e] = r;
  }
  width() {
    return this.size.width;
  }
  height() {
    return this.size.height;
  }
  raw() {
    return this.array;
  }
  resize(e) {
    if (this.height() < e.height && isFinite(e.height) && this.addRows(this.height(), e.height - this.height()), this.height() > e.height || (this.width() < e.width && isFinite(e.width) && this.addColumns(this.width(), e.width - this.width()), this.width() > e.width))
      throw Error("Resizing to smaller array");
  }
  outOfBound(e, t) {
    return e < 0 || t < 0 || t > this.size.height - 1 || e > this.size.width - 1;
  }
}
class Si {
  constructor(e, t) {
    this.error = e, this.size = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(e, t) {
    return this.error;
  }
  width() {
    return this.size.width;
  }
  height() {
    return this.size.height;
  }
  simpleRangeValue() {
    return this.error;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class qh {
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ii extends qh {
  constructor() {
    super();
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class be extends ii {
  constructor(e, t, r) {
    super(), this.formula = e, this.cellAddress = t, this.version = r;
  }
  get width() {
    return 1;
  }
  get height() {
    return 1;
  }
  static fromAst(e, t, r, n) {
    return r.isScalar() ? new Lt(e, t, n) : new le(e, t, r, n);
  }
  /**
   * Returns formula stored in this vertex
   */
  getFormula(e) {
    return this.ensureRecentData(e), this.formula;
  }
  ensureRecentData(e) {
    if (this.version != e.version()) {
      const [t, r, n] = e.applyTransformations(this.formula, this.cellAddress, this.version);
      this.formula = t, this.cellAddress = r, this.version = n;
    }
  }
  /**
   * Returns address of the cell associated with vertex
   */
  getAddress(e) {
    return this.ensureRecentData(e), this.cellAddress;
  }
}
class le extends be {
  constructor(e, t, r, n = 0) {
    super(e, t, n), r.isRef ? this.array = new Si(new f(m.REF, E.NoSpaceForArrayResult), b.error()) : this.array = new un(r);
  }
  get width() {
    return this.array.width();
  }
  get height() {
    return this.array.height();
  }
  get sheet() {
    return this.cellAddress.sheet;
  }
  get leftCorner() {
    return this.cellAddress;
  }
  setCellValue(e) {
    if (e instanceof f)
      return this.setErrorValue(e), e;
    const t = Zr.fromInterpreterValue(e);
    return t.resize(this.array.size), this.array = t, e;
  }
  getCellValue() {
    if (this.array instanceof un)
      throw Error("Array not computed yet.");
    return this.array.simpleRangeValue();
  }
  valueOrUndef() {
    if (!(this.array instanceof un))
      return this.array.simpleRangeValue();
  }
  getArrayCellValue(e) {
    const t = e.col - this.cellAddress.col, r = e.row - this.cellAddress.row;
    try {
      return this.array.get(t, r);
    } catch (n) {
      return new f(m.REF);
    }
  }
  getArrayCellRawValue(e) {
    const t = this.getArrayCellValue(e);
    if (!(t instanceof f || t === B))
      return I(t);
  }
  setArrayCellValue(e, t) {
    const r = e.col - this.cellAddress.col, n = e.row - this.cellAddress.row;
    this.array instanceof Zr && this.array.set(r, n, t);
  }
  setNoSpace() {
    return this.array = new Si(new f(m.SPILL, E.NoSpaceForArrayResult), b.error()), this.getCellValue();
  }
  getRange() {
    return F.spanFrom(this.cellAddress, this.width, this.height);
  }
  getRangeOrUndef() {
    return F.spanFromOrUndef(this.cellAddress, this.width, this.height);
  }
  setAddress(e) {
    this.cellAddress = e;
  }
  setFormula(e) {
    this.formula = e;
  }
  spansThroughSheetRows(e, t, r = t) {
    return this.cellAddress.sheet === e && this.cellAddress.row <= r && t < this.cellAddress.row + this.height;
  }
  spansThroughSheetColumn(e, t, r = t) {
    return this.cellAddress.sheet === e && this.cellAddress.col <= r && t < this.cellAddress.col + this.width;
  }
  isComputed() {
    return !(this.array instanceof un);
  }
  columnsFromArray() {
    return qe.fromNumberOfColumns(this.cellAddress.sheet, this.cellAddress.col, this.width);
  }
  rowsFromArray() {
    return Ge.fromNumberOfRows(this.cellAddress.sheet, this.cellAddress.row, this.height);
  }
  /**
   * No-op as array vertices are transformed eagerly.
   */
  ensureRecentData(e) {
  }
  isLeftCorner(e) {
    return On(this.cellAddress, e);
  }
  setErrorValue(e) {
    this.array = new Si(e, this.array.size);
  }
}
class Lt extends be {
  constructor(e, t, r) {
    super(e, t, r);
  }
  valueOrUndef() {
    return this.cachedCellValue;
  }
  /**
   * Sets computed cell value stored in this vertex
   */
  setCellValue(e) {
    return this.cachedCellValue = e, this.cachedCellValue;
  }
  /**
   * Returns cell value stored in vertex
   */
  getCellValue() {
    if (this.cachedCellValue !== void 0)
      return this.cachedCellValue;
    throw Error("Value of the formula cell is not computed.");
  }
  isComputed() {
    return this.cachedCellValue !== void 0;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class we extends qh {
  constructor(e) {
    super(), this.range = e, this.functionCache = /* @__PURE__ */ new Map(), this.criterionFunctionCache = /* @__PURE__ */ new Map(), this.dependentCacheRanges = /* @__PURE__ */ new Set(), this.bruteForce = !1;
  }
  get start() {
    return this.range.start;
  }
  get end() {
    return this.range.end;
  }
  get sheet() {
    return this.range.start.sheet;
  }
  /**
   * Returns cached value stored for given function
   *
   * @param functionName - name of the function
   */
  getFunctionValue(e) {
    return this.functionCache.get(e);
  }
  /**
   * Stores cached value for given function
   *
   * @param functionName - name of the function
   * @param value - cached value
   */
  setFunctionValue(e, t) {
    this.functionCache.set(e, t);
  }
  /**
   * Returns cached value for given cache key and criterion text representation
   *
   * @param cacheKey - key to retrieve from the cache
   * @param criterionString - criterion text (ex. '<=5')
   */
  getCriterionFunctionValue(e, t) {
    var r;
    return (r = this.getCriterionFunctionValues(e).get(t)) === null || r === void 0 ? void 0 : r[0];
  }
  /**
   * Returns all cached values stored for given criterion function
   *
   * @param cacheKey - key to retrieve from the cache
   */
  getCriterionFunctionValues(e) {
    var t;
    return (t = this.criterionFunctionCache.get(e)) !== null && t !== void 0 ? t : /* @__PURE__ */ new Map();
  }
  /**
   * Stores all values for given criterion function
   *
   * @param cacheKey - key to store in the cache
   * @param values - map with values
   */
  setCriterionFunctionValues(e, t) {
    this.criterionFunctionCache.set(e, t);
  }
  addDependentCacheRange(e) {
    e !== this && this.dependentCacheRanges.add(e);
  }
  /**
   * Clears function cache
   */
  clearCache() {
    this.functionCache.clear(), this.criterionFunctionCache.clear(), this.dependentCacheRanges.forEach((e) => e.criterionFunctionCache.clear()), this.dependentCacheRanges.clear();
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Kp = (s, e, t, r, n) => {
  if (e instanceof we) {
    const o = e.range.intersectionWith(t);
    return o !== void 0 ? Array.from(o.addresses(n)) : [];
  }
  let i, a;
  if (e instanceof be)
    i = e.getFormula(r), a = e.getAddress(r);
  else
    return [];
  return si(i, s).filter((o) => o instanceof xh).map((o) => o.dependency.toSimpleCellAddress(a)).filter((o) => t.addressInRange(o));
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var kt;
(function(s) {
  s[s.ON_STACK = 0] = "ON_STACK", s[s.PROCESSED = 1] = "PROCESSED", s[s.POPPED = 2] = "POPPED";
})(kt || (kt = {}));
class jp {
  constructor(e = [], t = []) {
    this.nodesSparseArray = e, this.edgesSparseArray = t, this.entranceTime = [], this.low = [], this.parent = [], this.inSCC = [], this.nodeStatus = [], this.order = [], this.sccNonSingletons = [], this.timeCounter = 0;
  }
  /**
   * An iterative implementation of Tarjan's algorithm for finding strongly connected components.
   * Returns vertices in order of topological sort, but vertices that are on cycles are kept separate.
   *
   * @param modifiedNodes - seed for computation. During engine init run, all of the vertices of grap. In recomputation run, changed vertices.
   * @param operatingFunction - recomputes value of a node, and returns whether a change occurred
   * @param onCycle - action to be performed when node is on cycle
   */
  getTopSortedWithSccSubgraphFrom(e, t, r) {
    const n = e.reverse();
    return n.forEach((i) => this.runDFS(i)), this.postprocess(n, r, t);
  }
  /**
   * Returns adjacent nodes of a given node.
   */
  getAdjacentNodeIds(e) {
    return this.edgesSparseArray[e].filter((t) => t !== void 0 && this.nodesSparseArray[t]);
  }
  /**
   * Runs DFS starting from a given node.
   */
  runDFS(e) {
    if (this.nodeStatus[e] !== void 0)
      return;
    this.nodeStatus[e] = kt.ON_STACK;
    const t = [e], r = [];
    for (; t.length > 0; ) {
      const n = t[t.length - 1];
      switch (this.nodeStatus[n]) {
        case kt.ON_STACK: {
          this.handleOnStack(n, r, t);
          break;
        }
        case kt.PROCESSED: {
          this.handleProcessed(n, r, t);
          break;
        }
        case kt.POPPED: {
          t.pop();
          break;
        }
      }
    }
  }
  /**
   * Handles a node that is on stack.
   */
  handleOnStack(e, t, r) {
    this.entranceTime[e] = this.timeCounter, this.low[e] = this.timeCounter, this.timeCounter++, t.push(e), this.getAdjacentNodeIds(e).forEach((n) => {
      this.entranceTime[n] === void 0 && (r.push(n), this.parent[n] = e, this.nodeStatus[n] = kt.ON_STACK);
    }), this.nodeStatus[e] = kt.PROCESSED;
  }
  /**
   * Handles a node that is already processed.
   */
  handleProcessed(e, t, r) {
    let n = this.entranceTime[e];
    if (this.getAdjacentNodeIds(e).forEach((i) => {
      this.inSCC[i] || (n = this.parent[i] === e ? Math.min(n, this.low[i]) : Math.min(n, this.entranceTime[i]));
    }), this.low[e] = n, n === this.entranceTime[e]) {
      const i = [];
      do
        i.push(t[t.length - 1]), t.pop();
      while (i[i.length - 1] !== e);
      i.forEach((a) => {
        this.inSCC[a] = !0;
      }), this.order.push(...i), i.length > 1 && i.forEach((a) => {
        this.sccNonSingletons[a] = !0;
      });
    }
    r.pop(), this.nodeStatus[e] = kt.POPPED;
  }
  /**
   * Postprocesses the result of Tarjan's algorithm.
   */
  postprocess(e, t, r) {
    const n = [];
    e.forEach((o) => {
      n[o] = !0;
    });
    const i = [], a = [];
    return this.order.reverse(), this.order.forEach((o) => {
      const u = this.getAdjacentNodeIds(o);
      this.sccNonSingletons[o] || u.includes(o) ? (a.push(this.nodesSparseArray[o]), t(this.nodesSparseArray[o]), u.forEach((l) => n[l] = !0)) : (i.push(this.nodesSparseArray[o]), n[o] && r(this.nodesSparseArray[o]) && u.forEach((l) => n[l] = !0));
    }), {
      sorted: i,
      cycled: a
    };
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class qp {
  constructor(e, t) {
    this.rawValue = e, this.processFn = t, this.processedValue = null;
  }
  getProcessedValue() {
    return this.processedValue === null && (this.processedValue = this.processFn(this.rawValue)), this.processedValue;
  }
  markAsModified() {
    this.processedValue = null;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Qp {
  constructor(e) {
    this.dependencyQuery = e, this.nodesSparseArray = [], this.edgesSparseArray = [], this.dirtyAndVolatileNodeIds = new qp({
      dirty: [],
      volatile: []
    }, (t) => this.processDirtyAndVolatileNodeIds(t)), this.infiniteRangeIds = /* @__PURE__ */ new Set(), this.changingWithStructureNodeIds = [], this.nextId = 0;
  }
  /**
   * Iterate over all nodes the in graph
   */
  getNodes() {
    return this.nodesSparseArray.filter((e) => e !== void 0);
  }
  /**
   * Checks whether a node is present in graph
   *
   * @param {Node} node - node to check
   */
  hasNode(e) {
    return e.idInGraph != null;
  }
  /**
   * Checks whether exists edge between nodes. If one or both of nodes are not present in graph, returns false.
   *
   * @param {Node} fromNode - node from which edge is outcoming
   * @param {Node} toNode - node to which edge is incoming
   */
  existsEdge(e, t) {
    const r = e.idInGraph, n = t.idInGraph;
    return r === void 0 || n === void 0 ? !1 : this.edgesSparseArray[r].includes(n);
  }
  /**
   * Returns nodes adjacent to given node. May contain removed nodes.
   *
   * @param {Node} node - node to which adjacent nodes we want to retrieve
   *
   * Idea for performance improvement:
   * - return an array instead of set
   */
  adjacentNodes(e) {
    const t = e.idInGraph;
    if (t === void 0)
      throw this.missingNodeError(e);
    return new Set(this.edgesSparseArray[t].filter((r) => r !== void 0).map((r) => this.nodesSparseArray[r]).filter((r) => r !== void 0));
  }
  /**
   * Returns number of nodes adjacent to given node. Contrary to adjacentNodes(), this method returns only nodes that are present in graph.
   *
   * @param {Node} node - node to which adjacent nodes we want to retrieve
   */
  adjacentNodesCount(e) {
    const t = e.idInGraph;
    if (t === void 0)
      throw this.missingNodeError(e);
    return this.fixEdgesArrayForNode(t).length;
  }
  /**
   * Adds node to a graph if it does not exist yet.
   *
   * @param {Node} node - a node to be added
   * @returns {NodeId} - the id of the added node
   */
  addNodeIfNotExists(e) {
    const t = e.idInGraph;
    if (t !== void 0)
      return t;
    const r = this.nextId;
    return this.nextId++, this.nodesSparseArray[r] = e, this.edgesSparseArray[r] = [], e.idInGraph = r, r;
  }
  /**
   * Adds edge between nodes.
   *
   * The nodes had to be added to the graph before, or the error will be raised
   *
   * @param {Node | NodeId} fromNode - node from which edge is outcoming
   * @param {Node | NodeId} toNode - node to which edge is incoming
   */
  addEdge(e, t) {
    const r = this.getNodeIdIfNotNumber(e), n = this.getNodeIdIfNotNumber(t);
    if (r === void 0)
      throw this.missingNodeError(e);
    if (n === void 0)
      throw this.missingNodeError(t);
    this.edgesSparseArray[r].includes(n) || this.edgesSparseArray[r].push(n);
  }
  /**
   * Removes node from graph
   */
  removeNode(e) {
    const t = e.idInGraph;
    if (t === void 0)
      throw this.missingNodeError(e);
    this.edgesSparseArray[t].length > 0 && (this.edgesSparseArray[t].forEach((n) => this.dirtyAndVolatileNodeIds.rawValue.dirty.push(n)), this.dirtyAndVolatileNodeIds.markAsModified());
    const r = this.removeDependencies(e);
    return delete this.nodesSparseArray[t], delete this.edgesSparseArray[t], this.infiniteRangeIds.delete(t), e.idInGraph = void 0, r;
  }
  /**
   * Removes edge between nodes.
   */
  removeEdge(e, t) {
    const r = this.getNodeIdIfNotNumber(e), n = this.getNodeIdIfNotNumber(t);
    if (r === void 0)
      throw this.missingNodeError(e);
    if (n === void 0)
      throw this.missingNodeError(t);
    const i = this.edgesSparseArray[r].indexOf(n);
    if (i === -1)
      throw new Error("Edge does not exist");
    delete this.edgesSparseArray[r][i];
  }
  /**
   * Removes edge between nodes if it exists.
   */
  removeEdgeIfExists(e, t) {
    const r = this.getNodeIdIfNotNumber(e), n = this.getNodeIdIfNotNumber(t);
    if (r === void 0 || n === void 0)
      return;
    const i = this.edgesSparseArray[r].indexOf(n);
    i !== -1 && delete this.edgesSparseArray[r][i];
  }
  /**
   * Sorts the whole graph topologically. Nodes that are on cycles are kept separate.
   */
  topSortWithScc() {
    return this.getTopSortedWithSccSubgraphFrom(this.getNodes(), () => !0, () => {
    });
  }
  /**
   * Sorts the graph topologically. Nodes that are on cycles are kept separate.
   *
   * @param {Node[]} modifiedNodes - seed for computation. The algorithm assumes that only these nodes have changed since the last run.
   * @param {(node: Node) => boolean} operatingFunction - recomputes value of a node, and returns whether a change occurred
   * @param {(node: Node) => void} onCycle - action to be performed when node is on cycle
   */
  getTopSortedWithSccSubgraphFrom(e, t, r) {
    const n = new jp(this.nodesSparseArray, this.edgesSparseArray), i = e.map((a) => a.idInGraph).filter((a) => a !== void 0);
    return n.getTopSortedWithSccSubgraphFrom(i, t, r);
  }
  /**
   * Marks node as volatile.
   */
  markNodeAsVolatile(e) {
    const t = e.idInGraph;
    t !== void 0 && (this.dirtyAndVolatileNodeIds.rawValue.volatile.push(t), this.dirtyAndVolatileNodeIds.markAsModified());
  }
  /**
   * Marks node as dirty.
   */
  markNodeAsDirty(e) {
    const t = e.idInGraph;
    t !== void 0 && (this.dirtyAndVolatileNodeIds.rawValue.dirty.push(t), this.dirtyAndVolatileNodeIds.markAsModified());
  }
  /**
   * Returns an array of nodes that are marked as dirty and/or volatile.
   */
  getDirtyAndVolatileNodes() {
    return this.dirtyAndVolatileNodeIds.getProcessedValue();
  }
  /**
   * Clears dirty nodes.
   */
  clearDirtyNodes() {
    this.dirtyAndVolatileNodeIds.rawValue.dirty = [], this.dirtyAndVolatileNodeIds.markAsModified();
  }
  /**
   * Marks node as changingWithStructure.
   */
  markNodeAsChangingWithStructure(e) {
    const t = e.idInGraph;
    t !== void 0 && this.changingWithStructureNodeIds.push(t);
  }
  /**
   * Marks all nodes marked as changingWithStructure as dirty.
   */
  markChangingWithStructureNodesAsDirty() {
    this.changingWithStructureNodeIds.length <= 0 || (this.dirtyAndVolatileNodeIds.rawValue.dirty = [...this.dirtyAndVolatileNodeIds.rawValue.dirty, ...this.changingWithStructureNodeIds], this.dirtyAndVolatileNodeIds.markAsModified());
  }
  /**
   * Marks node as infinite range.
   */
  markNodeAsInfiniteRange(e) {
    const t = this.getNodeIdIfNotNumber(e);
    t !== void 0 && this.infiniteRangeIds.add(t);
  }
  /**
   * Returns an array of nodes marked as infinite ranges
   */
  getInfiniteRanges() {
    return [...this.infiniteRangeIds].map((e) => this.nodesSparseArray[e]);
  }
  /**
   *
   */
  getNodeIdIfNotNumber(e) {
    return typeof e == "number" ? e : e.idInGraph;
  }
  /**
   * Removes invalid neighbors of a given node from the edges array and returns adjacent nodes for the input node.
   */
  fixEdgesArrayForNode(e) {
    const t = this.edgesSparseArray[e];
    return this.edgesSparseArray[e] = t.filter((r) => r !== void 0 && this.nodesSparseArray[r]), this.edgesSparseArray[e];
  }
  /**
   * Removes edges from the given node to its dependencies based on the dependencyQuery function.
   */
  removeDependencies(e) {
    const t = this.dependencyQuery(e);
    return t.forEach(([r, n]) => {
      this.removeEdgeIfExists(n, e);
    }), t;
  }
  /**
   * processFn for dirtyAndVolatileNodeIds ProcessableValue instance
   * @private
   */
  processDirtyAndVolatileNodeIds({
    dirty: e,
    volatile: t
  }) {
    return [.../* @__PURE__ */ new Set([...e, ...t])].map((r) => this.nodesSparseArray[r]).filter((r) => r !== void 0);
  }
  /**
   * Returns error for missing node.
   */
  missingNodeError(e) {
    return new Error(`Unknown node ${JSON.stringify(e)}`);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Nr {
  constructor() {
    this.rangeMapping = /* @__PURE__ */ new Map();
  }
  /**
   * Returns number of ranges in the sheet or 0 if the sheet does not exist
   */
  getNumberOfRangesInSheet(e) {
    var t, r;
    return (r = (t = this.rangeMapping.get(e)) === null || t === void 0 ? void 0 : t.size) !== null && r !== void 0 ? r : 0;
  }
  /**
   * Adds or updates vertex in the mapping
   */
  addOrUpdateVertex(e) {
    let t = this.rangeMapping.get(e.sheet);
    t === void 0 && (t = /* @__PURE__ */ new Map(), this.rangeMapping.set(e.sheet, t));
    const r = Nr.calculateRangeKey(e.start, e.end);
    t.set(r, e);
  }
  /**
   * Removes vertex from the mapping if it exists
   */
  removeVertexIfExists(e) {
    const t = e.sheet, r = this.rangeMapping.get(t);
    if (r === void 0)
      return;
    const n = Nr.calculateRangeKey(e.start, e.end);
    r.delete(n), r.size === 0 && this.rangeMapping.delete(t);
  }
  /**
   * Returns associated vertex for given range
   */
  getRangeVertex(e, t) {
    const r = this.rangeMapping.get(e.sheet), n = Nr.calculateRangeKey(e, t);
    return r == null ? void 0 : r.get(n);
  }
  /**
   * Returns associated vertex for given range or throws an error if not found
   */
  getVertexOrThrow(e, t) {
    const r = this.getRangeVertex(e, t);
    if (!r)
      throw Error("Range does not exist");
    return r;
  }
  truncateRanges(e, t) {
    const r = Array(), n = Array(), i = Array(), a = e.sheet;
    for (const [u, l] of this.entriesFromSheet(e.sheet)) {
      const c = l.range;
      e.start <= t(l.range.end) && (c.removeSpan(e), c.shouldBeRemoved() ? (this.removeByKey(a, u), r.push(l)) : n.push([u, l]), i.push(l));
    }
    const o = [];
    n.sort((u, l) => Nr.compareBy(u[1], l[1], t));
    for (const [u, l] of n) {
      const c = Nr.calculateRangeKey(l.range.start, l.range.end);
      if (c === u)
        continue;
      const d = this.getByKey(a, c);
      this.removeByKey(a, u), d !== void 0 && l != d ? o.push([d, l]) : this.addOrUpdateVertex(l);
    }
    return {
      verticesToRemove: r,
      verticesToMerge: o,
      verticesWithChangedSize: i
    };
  }
  moveAllRangesInSheetAfterAddingRows(e, t, r) {
    return this.updateVerticesFromSheet(e, (n, i) => t <= i.start.row ? (i.range.shiftByRows(r), {
      changedSize: !1,
      vertex: i
    }) : t > i.start.row && t <= i.end.row ? (i.range.expandByRows(r), {
      changedSize: !0,
      vertex: i
    }) : void 0);
  }
  moveAllRangesInSheetAfterAddingColumns(e, t, r) {
    return this.updateVerticesFromSheet(e, (n, i) => t <= i.start.col ? (i.range.shiftByColumns(r), {
      changedSize: !1,
      vertex: i
    }) : t > i.start.col && t <= i.end.col ? (i.range.expandByColumns(r), {
      changedSize: !0,
      vertex: i
    }) : void 0);
  }
  moveRangesInsideSourceRange(e, t, r, n) {
    this.updateVerticesFromSheet(e.sheet, (i, a) => {
      if (e.containsRange(a.range))
        return a.range.shiftByColumns(t), a.range.shiftByRows(r), a.range.moveToSheet(n), {
          changedSize: !1,
          vertex: a
        };
    });
  }
  *rangesInSheet(e) {
    const t = this.rangeMapping.get(e);
    t && (yield* rt(t.values()));
  }
  *rangeVerticesContainedInRange(e) {
    for (const t of this.rangesInSheet(e.sheet))
      e.containsRange(t.range) && (yield t);
  }
  /**
   * Finds smaller range if exists.
   */
  findSmallerRange(e) {
    if (e.height() > 1 && Number.isFinite(e.height())) {
      const t = O(e.end.sheet, e.end.col, e.end.row - 1), r = this.getRangeVertex(e.start, t);
      if (r !== void 0) {
        const n = F.fromSimpleCellAddresses(O(e.start.sheet, e.start.col, e.end.row), e.end);
        return {
          smallerRangeVertex: r,
          restRange: n
        };
      }
    }
    return {
      restRange: e
    };
  }
  /**
   * Calculates a string key from start and end addresses
   */
  static calculateRangeKey(e, t) {
    return `${e.col},${e.row},${t.col},${t.row}`;
  }
  /**
   * Compares two range vertices by their start and end addresses using the provided coordinate function
   */
  static compareBy(e, t, r) {
    const n = r(e.range.start), i = r(t.range.start);
    if (n === i) {
      const a = r(e.range.end), o = r(t.range.end);
      return a - o;
    } else
      return n - i;
  }
  *entriesFromSheet(e) {
    const t = this.rangeMapping.get(e);
    t && (yield* rt(t.entries()));
  }
  removeByKey(e, t) {
    const r = this.rangeMapping.get(e);
    if (!r)
      throw new Error(`Sheet ${e} not found`);
    r.delete(t);
  }
  getByKey(e, t) {
    var r;
    return (r = this.rangeMapping.get(e)) === null || r === void 0 ? void 0 : r.get(t);
  }
  updateVerticesFromSheet(e, t) {
    const r = Array();
    for (const [n, i] of this.entriesFromSheet(e)) {
      const a = t(n, i);
      a !== void 0 && (this.removeByKey(e, n), r.push(a));
    }
    return r.forEach((n) => {
      this.addOrUpdateVertex(n.vertex);
    }), {
      verticesWithChangedSize: r.filter((n) => n.changedSize).map((n) => n.vertex)
    };
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Zp {
  constructor(e, t, r) {
    this.functions = e, this.errors = t, this.ui = r, this._protectedTranslations = {
      VERSION: "VERSION"
    }, this.checkUI(), this.checkErrors(), this.checkFunctionTranslations(this.functions), Object.assign(this.functions, this._protectedTranslations);
  }
  extendFunctions(e) {
    this.checkFunctionTranslations(e), Object.assign(this.functions, e);
  }
  buildFunctionMapping() {
    return Object.keys(this.functions).reduce((e, t) => (e[this.functions[t]] = t, e), {});
  }
  buildErrorMapping() {
    return Object.keys(this.errors).reduce((e, t) => (e[this.errors[t]] = t, e), {});
  }
  isFunctionTranslated(e) {
    return this.functions[e] !== void 0;
  }
  getFunctionTranslations(e) {
    const t = [];
    for (const r of e)
      this.isFunctionTranslated(r) && t.push(this.functions[r]);
    return t;
  }
  getFunctionTranslation(e) {
    const t = this.functions[e];
    if (t === void 0)
      throw new Vr(`functions.${e}`);
    return t;
  }
  getMaybeFunctionTranslation(e) {
    return this.functions[e];
  }
  getErrorTranslation(e) {
    if (e === m.LIC)
      return `#${m.LIC}!`;
    const t = this.errors[e];
    if (t === void 0)
      throw new Vr(`errors.${e}`);
    return t;
  }
  getUITranslation(e) {
    const t = this.ui[e];
    if (t === void 0)
      throw new Vr(`ui.${e}`);
    return t;
  }
  checkUI() {
    for (const e of Object.values(In))
      if (!(e in this.ui))
        throw new Vr(`ui.${e}`);
  }
  checkErrors() {
    for (const e of Object.values(m))
      if (!(e in this.errors) && e !== m.LIC)
        throw new Vr(`errors.${e}`);
  }
  checkFunctionTranslations(e) {
    const t = new Set(Object.getOwnPropertyNames(e));
    for (const r of Object.getOwnPropertyNames(this._protectedTranslations))
      if (t.has(r))
        throw new Kh(r);
  }
}
function Jp(s) {
  return new Zp(Object.assign({}, s.functions), Object.assign({}, s.errors), Object.assign({}, s.ui));
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var In;
(function(s) {
  s.NEW_SHEET_PREFIX = "NEW_SHEET_PREFIX";
})(In || (In = {}));
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class zn {
  constructor(e, t, r = !1) {
    this.id = e, this.displayName = t, this.isPlaceholder = r;
  }
  /**
   * Returns the canonical (normalized) name of the sheet.
   */
  get canonicalName() {
    return ai.canonicalizeSheetName(this.displayName);
  }
}
class ai {
  constructor(e) {
    this.lastSheetId = -1, this.mappingFromCanonicalNameToId = /* @__PURE__ */ new Map(), this.allSheets = /* @__PURE__ */ new Map(), this.sheetNamePrefix = e.getUITranslation(In.NEW_SHEET_PREFIX);
  }
  /**
   * Converts sheet name to canonical/normalized form.
   * @static
   */
  static canonicalizeSheetName(e) {
    return e.toLowerCase();
  }
  /**
   * Returns sheet ID for the given name. By default excludes placeholders.
   */
  getSheetId(e, t = {}) {
    var r;
    return (r = this._getSheetByName(e, t)) === null || r === void 0 ? void 0 : r.id;
  }
  /**
   * Returns sheet ID for the given name. Excludes placeholders.
   *
   * @throws {NoSheetWithNameError} if the sheet with the given name does not exist.
   */
  getSheetIdOrThrowError(e) {
    const t = this._getSheetByName(e, {});
    if (t === void 0)
      throw new Ph(e);
    return t.id;
  }
  /**
   * Returns display name for the given sheet ID. Excludes placeholders.
   *
   * @returns {Maybe<string>} the display name, or undefined if the sheet with the given ID does not exist.
   */
  getSheetName(e) {
    var t;
    return (t = this._getSheet(e, {})) === null || t === void 0 ? void 0 : t.displayName;
  }
  /**
   * Returns display name for the given sheet ID. Excludes placeholders.
   *
   * @throws {NoSheetWithIdError} if the sheet with the given ID does not exist.
   */
  getSheetNameOrThrowError(e, t = {}) {
    return this._getSheetOrThrowError(e, t).displayName;
  }
  /**
   * Iterates over all sheet display names. By default excludes placeholders.
   */
  *iterateSheetNames(e = {}) {
    for (const t of this.allSheets.values())
      (e.includePlaceholders || !t.isPlaceholder) && (yield t.displayName);
  }
  /**
   * Returns array of all sheet display names. By default excludes placeholders.
   */
  getSheetNames(e = {}) {
    return Array.from(this.iterateSheetNames(e));
  }
  /**
   * Returns total count of sheets. By default excludes placeholders.
   */
  numberOfSheets(e = {}) {
    return this.getSheetNames(e).length;
  }
  /**
   * Checks if sheet with given ID exists. By default excludes placeholders.
   */
  hasSheetWithId(e, t = {}) {
    return this._getSheet(e, t) !== void 0;
  }
  /**
   * Checks if sheet with given name exists (case-insensitive). Excludes placeholders.
   */
  hasSheetWithName(e) {
    return this._getSheetByName(e, {}) !== void 0;
  }
  /**
   * Adds new sheet with optional name and returns its ID.
   * If called with a name of an existing placeholder sheet, converts the placeholder sheet to a real sheet.
   *
   * @throws {SheetNameAlreadyTakenError} if the sheet with the given name already exists.
   */
  addSheet(e = `${this.sheetNamePrefix}${this.lastSheetId + 2}`) {
    const t = this._getSheetByName(e, {
      includePlaceholders: !0
    });
    if (t) {
      if (!t.isPlaceholder)
        throw new Jt(e);
      return t.isPlaceholder = !1, t.id;
    }
    this.lastSheetId++;
    const r = new zn(this.lastSheetId, e);
    return this._storeSheetInMappings(r), r.id;
  }
  /**
   * Adds a sheet with a specific ID and name. Used for redo operations.
   * If called with a name of an existing placeholder sheet, converts the placeholder sheet to a real sheet.
   *
   * @throws {SheetNameAlreadyTakenError} if the sheet with the given name already exists.
   */
  addSheetWithId(e, t) {
    const r = this._getSheetByName(t, {
      includePlaceholders: !0
    });
    if (r) {
      if (r.id !== e)
        throw new Jt(t);
      if (!r.isPlaceholder)
        throw new Jt(t);
      r.isPlaceholder = !1;
      return;
    }
    e > this.lastSheetId && (this.lastSheetId = e);
    const n = new zn(e, t);
    this._storeSheetInMappings(n);
  }
  /**
   * Adds a placeholder sheet with the given name if it does not exist yet
   */
  addPlaceholderIfNotExists(e) {
    const t = this._getSheetByName(e, {
      includePlaceholders: !0
    });
    if (t)
      return t.id;
    this.lastSheetId++;
    const r = new zn(this.lastSheetId, e, !0);
    return this._storeSheetInMappings(r), r.id;
  }
  /**
   * Adds a placeholder sheet with a specific ID and name.
   * Used for undo operations to restore previously merged placeholder sheets.
   *
   * @throws {SheetNameAlreadyTakenError} if the sheet with the given name already exists.
   */
  addPlaceholderWithId(e, t) {
    if (this._getSheetByName(t, {
      includePlaceholders: !0
    }))
      throw new Jt(t);
    if (this.hasSheetWithId(e, {
      includePlaceholders: !0
    }))
      throw new Error(`Sheet with id ${e} already exists`);
    e > this.lastSheetId && (this.lastSheetId = e);
    const n = new zn(e, t, !0);
    this._storeSheetInMappings(n);
  }
  /**
   *
   * Removes sheet with given ID.
   * If sheet does not exist, does nothing.
   * @returns {boolean} true if sheet was removed, false if it did not exist.
   */
  removeSheetIfExists(e, t = {}) {
    const r = this._getSheet(e, t);
    return r ? (this.allSheets.delete(e), this.mappingFromCanonicalNameToId.delete(r.canonicalName), e === this.lastSheetId && this.lastSheetId--, !0) : !1;
  }
  /**
   * Marks sheet with given ID as a placeholder.
   * @throws {NoSheetWithIdError} if the sheet with the given ID does not exist
   */
  markSheetAsPlaceholder(e) {
    const t = this._getSheetOrThrowError(e, {});
    t.isPlaceholder = !0;
  }
  /**
   * Renames sheet.
   * - If called with sheetId of a placeholder sheet, throws {NoSheetWithIdError}.
   * - If newDisplayName is conflicting with an existing sheet, throws {SheetNameAlreadyTakenError}.
   * - If newDisplayName is conflicting with a placeholder sheet name, deletes the placeholder sheet and returns its id as mergedWithPlaceholderSheet.
   *
   * @throws {SheetNameAlreadyTakenError} if the sheet with the given name already exists.
   * @throws {NoSheetWithIdError} if the sheet with the given ID does not exist.
   */
  renameSheet(e, t) {
    const r = this._getSheetOrThrowError(e, {}), n = r.displayName;
    if (n === t)
      return {
        previousDisplayName: void 0
      };
    const i = this._getSheetByName(t, {
      includePlaceholders: !0
    });
    let a;
    if (i !== void 0 && i.id !== r.id)
      if (i.isPlaceholder)
        this.mappingFromCanonicalNameToId.delete(i.canonicalName), this.allSheets.delete(i.id), i.id === this.lastSheetId && this.lastSheetId--, a = i.id;
      else
        throw new Jt(t);
    const o = r.canonicalName;
    return this.mappingFromCanonicalNameToId.delete(o), r.displayName = t, this._storeSheetInMappings(r), {
      previousDisplayName: n,
      mergedWithPlaceholderSheet: a
    };
  }
  /**
   * Stores sheet in both internal mappings.
   * - If ID exists, it is updated. If not, it is added.
   * - If canonical name exists, it is updated. If not, it is added.
   *
   * @internal
   */
  _storeSheetInMappings(e) {
    this.allSheets.set(e.id, e), this.mappingFromCanonicalNameToId.set(e.canonicalName, e.id);
  }
  /**
   * Returns sheet by ID
   *
   * @returns {Maybe<Sheet>} the sheet, or undefined if not found.
   * @internal
   */
  _getSheet(e, t) {
    const r = this.allSheets.get(e);
    if (r !== void 0)
      return t.includePlaceholders || !r.isPlaceholder ? r : void 0;
  }
  /**
   * Returns sheet by name
   *
   * @returns {Maybe<Sheet>} the sheet, or undefined if not found.
   * @internal
   */
  _getSheetByName(e, t) {
    const r = this.mappingFromCanonicalNameToId.get(ai.canonicalizeSheetName(e));
    if (r !== void 0)
      return this._getSheet(r, t);
  }
  /**
   * Returns sheet by ID
   *
   * @throws {NoSheetWithIdError} if the sheet with the given ID does not exist.
   * @internal
   */
  _getSheetOrThrowError(e, t) {
    const r = this._getSheet(e, t);
    if (r === void 0)
      throw new _e(e);
    return r;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class em {
  constructor(e, t) {
    this.sheetMapping = e, this.addressMapping = t;
  }
  /**
   * Adds placeholder sheet if it doesn't exist and adds placeholder strategy to address mapping.
   * @returns {number} sheet id
   */
  ensureSheetRegistered(e) {
    const t = this.sheetMapping.addPlaceholderIfNotExists(e);
    return this.addressMapping.addSheetStrategyPlaceholderIfNotExists(t), t;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function Qh(s) {
  if (!Array.isArray(s))
    throw new fe("an array of arrays.");
  for (let e = 0; e < s.length; e++)
    if (!Array.isArray(s[e]))
      throw new fe("an array of arrays.");
}
function bs(s) {
  let e = 0, t = 0, r = 0;
  for (let i = 0; i < s.length; i++) {
    let a = 0;
    for (let o = 0; o < s[i].length; o++) {
      const u = s[i][o];
      u != null && (a = o + 1, ++r);
    }
    e = Math.max(e, a), a > 0 && (t = i + 1);
  }
  const n = e * t;
  return {
    height: t,
    width: e,
    fill: n === 0 ? 0 : r / n
  };
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class xa {
  constructor(e, t, r, n, i, a, o, u) {
    this.addressMapping = e, this.rangeMapping = t, this.sheetMapping = r, this.arrayMapping = n, this.stats = i, this.lazilyTransformingAstService = a, this.functionRegistry = o, this.namedExpressions = u, this.changes = nr.empty(), this.dependencyQueryAddresses = (l) => {
      if (l instanceof we)
        return this.rangeDependencyQuery(l).map(([c, d]) => c);
      {
        const c = this.formulaDependencyQuery(l);
        if (c !== void 0) {
          const [d, p] = c;
          return p.map((N) => N instanceof Ht ? this.namedExpressions.namedExpressionOrPlaceholder(N.name, d.sheet).address : ne(N) ? N : $i(N.start, N.end));
        } else
          return [];
      }
    }, this.dependencyQueryVertices = (l) => {
      if (l instanceof we)
        return this.rangeDependencyQuery(l);
      {
        const c = this.formulaDependencyQuery(l);
        if (c !== void 0) {
          const [d, p] = c;
          return p.map((N) => {
            if (N instanceof F)
              return [N.start, this.rangeMapping.getVertexOrThrow(N.start, N.end)];
            if (N instanceof Ht) {
              const T = this.namedExpressions.namedExpressionOrPlaceholder(N.name, d.sheet);
              return [T.address, this.addressMapping.getCellOrThrow(T.address)];
            } else
              return [N, this.addressMapping.getCellOrThrow(N)];
          });
        } else
          return [];
      }
    }, this.rangeDependencyQuery = (l) => {
      const c = [], {
        smallerRangeVertex: d,
        restRange: p
      } = this.rangeMapping.findSmallerRange(l.range);
      let N;
      d !== void 0 && this.graph.adjacentNodes(d).has(l) ? (N = p, c.push([new F(d.start, d.end), d])) : N = l.range;
      for (const T of N.addresses(this)) {
        const R = this.addressMapping.getCell(T);
        R !== void 0 && c.push([T, R]);
      }
      return c;
    }, this.formulaDependencyQuery = (l) => {
      let c, d;
      if (l instanceof be)
        d = l.getAddress(this.lazilyTransformingAstService), c = l.getFormula(this.lazilyTransformingAstService);
      else
        return;
      const p = si(c, this.functionRegistry);
      return [d, _t(p, d)];
    }, this.graph = new Qp(this.dependencyQueryVertices), this.sheetReferenceRegistrar = new em(r, e);
  }
  /**
   * Invariants:
   * - empty cell has associated EmptyCellVertex if and only if it is a dependency (possibly indirect, through range) to some formula
   */
  static buildEmpty(e, t, r, n, i) {
    return new xa(new Xp(t.chooseAddressMappingPolicy), new Nr(), new ai(t.translationPackage), new $p(), i, e, r, n);
  }
  setFormulaToCell(e, t, r, n, i, a) {
    const o = be.fromAst(t, e, n, this.lazilyTransformingAstService.version());
    return this.exchangeOrAddFormulaVertex(o), this.processCellDependencies(r, o), this.graph.markNodeAsDirty(o), i && this.markAsVolatile(o), a && this.markAsDependentOnStructureChange(o), this.correctInfiniteRangesDependency(e), this.getAndClearContentChanges();
  }
  setParsingErrorToCell(e, t) {
    const r = this.shrinkPossibleArrayAndGetCell(e);
    return this.exchangeOrAddGraphNode(r, t), this.addressMapping.setCell(e, t), this.graph.markNodeAsDirty(t), this.correctInfiniteRangesDependency(e), this.getAndClearContentChanges();
  }
  setValueToCell(e, t) {
    const r = this.shrinkPossibleArrayAndGetCell(e);
    if (r instanceof le && this.arrayMapping.removeArray(r.getRange()), r instanceof sr)
      r.getValues().rawValue !== t.rawValue && (r.setValues(t), this.graph.markNodeAsDirty(r));
    else {
      const n = new sr(t.parsedValue, t.rawValue);
      this.exchangeOrAddGraphNode(r, n), this.addressMapping.setCell(e, n), this.graph.markNodeAsDirty(n);
    }
    return this.correctInfiniteRangesDependency(e), this.getAndClearContentChanges();
  }
  /**
   * Sets a cell empty.
   * - if vertex has no dependents, removes it from graph, address mapping and range mapping and cleans up its dependencies
   * - if vertex has dependents, exchanges it for an EmptyCellVertex and marks it as dirty
   */
  setCellEmpty(e) {
    const t = this.shrinkPossibleArrayAndGetCell(e);
    if (t === void 0)
      return nr.empty();
    if (this.graph.adjacentNodes(t).size > 0) {
      const r = new er();
      this.exchangeGraphNode(t, r), this.graph.adjacentNodesCount(r) === 0 ? (this.removeVertex(r), this.addressMapping.removeCell(e)) : (this.graph.markNodeAsDirty(r), this.addressMapping.setCell(e, r));
    } else
      this.removeVertex(t), this.addressMapping.removeCell(e);
    return this.getAndClearContentChanges();
  }
  clearDirtyVertices() {
    this.graph.clearDirtyNodes();
  }
  verticesToRecompute() {
    return this.graph.getDirtyAndVolatileNodes();
  }
  processCellDependencies(e, t) {
    const r = t.idInGraph;
    if (r === void 0)
      throw new Error("End vertex not found");
    e.forEach((n) => {
      if (n instanceof F) {
        const i = n;
        let a = this.getRange(i.start, i.end);
        a === void 0 && (a = new we(i), this.rangeMapping.addOrUpdateVertex(a)), this.graph.addNodeIfNotExists(a);
        const o = a.idInGraph;
        if (o === void 0)
          throw new Error("Range vertex not found");
        i.isFinite() || this.graph.markNodeAsInfiniteRange(o);
        const {
          smallerRangeVertex: u,
          restRange: l
        } = this.rangeMapping.findSmallerRange(i);
        if (u !== void 0) {
          if (this.graph.addEdge(u, o), a.bruteForce) {
            a.bruteForce = !1;
            for (const d of i.addresses(this))
              this.graph.removeEdge(this.fetchCell(d), o);
          }
        } else
          a.bruteForce = !0;
        const c = this.arrayMapping.getArray(l);
        if (c !== void 0)
          this.graph.addEdge(c, o);
        else
          for (const d of l.addresses(this)) {
            const {
              vertex: p,
              id: N
            } = this.fetchCellOrCreateEmpty(d);
            this.graph.addEdge(N != null ? N : p, o);
          }
        this.graph.addEdge(o, r), i.isFinite() && this.correctInfiniteRangesDependenciesByRangeVertex(a);
      } else if (n instanceof Ht) {
        const i = t.getAddress(this.lazilyTransformingAstService).sheet, {
          vertex: a,
          id: o
        } = this.fetchNamedExpressionVertex(n.name, i);
        this.graph.addEdge(o != null ? o : a, r);
      } else {
        const {
          vertex: i,
          id: a
        } = this.fetchCellOrCreateEmpty(n);
        this.graph.addEdge(a != null ? a : i, r);
      }
    });
  }
  fetchNamedExpressionVertex(e, t) {
    const r = this.namedExpressions.namedExpressionOrPlaceholder(e, t);
    return this.fetchCellOrCreateEmpty(r.address);
  }
  exchangeNode(e, t) {
    const r = this.fetchCellOrCreateEmpty(e).vertex, n = this.fetchCellOrCreateEmpty(t).vertex;
    this.addressMapping.removeCell(e), this.exchangeGraphNode(r, n);
  }
  fetchCellOrCreateEmpty(e) {
    const t = this.addressMapping.getCell(e);
    if (t !== void 0)
      return {
        vertex: t,
        id: void 0
      };
    const r = new er(), n = this.graph.addNodeIfNotExists(r);
    return this.addressMapping.setCell(e, r), {
      vertex: r,
      id: n
    };
  }
  removeRows(e) {
    this.stats.measure(P.ADJUSTING_GRAPH, () => {
      for (const [r, n] of this.addressMapping.entriesFromRowsSpan(e)) {
        for (const i of this.graph.adjacentNodes(n))
          this.graph.markNodeAsDirty(i);
        if (n instanceof le)
          if (n.isLeftCorner(r))
            this.shrinkArrayToCorner(n), this.arrayMapping.removeArray(n.getRange());
          else
            continue;
        this.removeVertex(n);
      }
    }), this.stats.measure(P.ADJUSTING_ADDRESS_MAPPING, () => {
      this.addressMapping.removeRows(e);
    });
    const t = this.stats.measure(P.ADJUSTING_RANGES, () => {
      const r = this.truncateRanges(e, (n) => n.row);
      return this.getArrayVerticesRelatedToRanges(r);
    });
    return this.stats.measure(P.ADJUSTING_ARRAY_MAPPING, () => {
      this.fixArraysAfterRemovingRows(e.sheet, e.rowStart, e.numberOfRows);
    }), this.addStructuralNodesToChangeSet(), {
      affectedArrays: t,
      contentChanges: this.getAndClearContentChanges()
    };
  }
  /**
   * Adds a new sheet to the graph.
   * If the sheetId was a placeholder sheet, marks its vertices as dirty.
   */
  addSheet(e) {
    this.addressMapping.addSheetOrChangeStrategy(e, bs([])), this.stats.measure(P.ADJUSTING_ADDRESS_MAPPING, () => {
      this.markAllCellsAsDirtyInSheet(e);
    }), this.stats.measure(P.ADJUSTING_RANGES, () => {
      this.markAllRangesAsDirtyInSheet(e);
    });
  }
  /**
   * Removes all vertices without dependents in other sheets from address mapping, range mapping and array mapping.
   * - If nothing is left, removes the sheet from sheet mapping and address mapping.
   * - Otherwise, marks it as placeholder.
   */
  removeSheet(e) {
    this.clearSheet(e);
    const t = !this.addressMapping.hasAnyEntries(e), r = this.rangeMapping.getNumberOfRangesInSheet(e) === 0;
    t && r ? (this.sheetMapping.removeSheetIfExists(e), this.addressMapping.removeSheetIfExists(e)) : this.sheetMapping.markSheetAsPlaceholder(e);
  }
  /**
   * Removes placeholderSheetToDelete and reroutes edges to the corresponding vertices in sheetToKeep
   *
   * Assumptions about placeholderSheetToDelete:
   * - is empty (contains only empty cell vertices and range vertices),
   * - empty cell vertices have no dependencies,
   * - range vertices have dependencies only in placeholderSheetToDelete,
   * - vertices may have dependents in placeholderSheetToDelete and other sheets,
   */
  mergeSheets(e, t) {
    if (!this.isPlaceholder(t))
      throw new Error(`Cannot merge sheets: sheet ${t} is not a placeholder`);
    this.mergeRangeVertices(e, t), this.mergeCellVertices(e, t), this.addressMapping.removeSheetIfExists(t), this.addStructuralNodesToChangeSet();
  }
  /**
   * Clears the sheet content.
   * - removes all cell vertices without dependents
   * - removes all array vertices
   * - for vertices with dependents, exchanges them for EmptyCellVertex and marks them as dirty
   */
  clearSheet(e) {
    const t = /* @__PURE__ */ new Set();
    for (const [r, n] of this.addressMapping.sheetEntries(e))
      n instanceof le ? t.add(n) : this.setCellEmpty(r);
    for (const r of t.values())
      this.setArrayEmpty(r);
    this.addStructuralNodesToChangeSet();
  }
  removeColumns(e) {
    this.stats.measure(P.ADJUSTING_GRAPH, () => {
      for (const [r, n] of this.addressMapping.entriesFromColumnsSpan(e)) {
        for (const i of this.graph.adjacentNodes(n))
          this.graph.markNodeAsDirty(i);
        if (n instanceof le)
          if (n.isLeftCorner(r))
            this.shrinkArrayToCorner(n), this.arrayMapping.removeArray(n.getRange());
          else
            continue;
        this.removeVertex(n);
      }
    }), this.stats.measure(P.ADJUSTING_ADDRESS_MAPPING, () => {
      this.addressMapping.removeColumns(e);
    });
    const t = this.stats.measure(P.ADJUSTING_RANGES, () => {
      const r = this.truncateRanges(e, (n) => n.col);
      return this.getArrayVerticesRelatedToRanges(r);
    });
    return this.stats.measure(P.ADJUSTING_ARRAY_MAPPING, () => this.fixArraysAfterRemovingColumns(e.sheet, e.columnStart, e.numberOfColumns)), this.addStructuralNodesToChangeSet(), {
      affectedArrays: t,
      contentChanges: this.getAndClearContentChanges()
    };
  }
  addRows(e) {
    this.stats.measure(P.ADJUSTING_ADDRESS_MAPPING, () => {
      this.addressMapping.addRows(e.sheet, e.rowStart, e.numberOfRows);
    });
    const t = this.stats.measure(P.ADJUSTING_RANGES, () => {
      const r = this.rangeMapping.moveAllRangesInSheetAfterAddingRows(e.sheet, e.rowStart, e.numberOfRows);
      return this.fixRangesWhenAddingRows(e.sheet, e.rowStart, e.numberOfRows), this.getArrayVerticesRelatedToRanges(r.verticesWithChangedSize);
    });
    this.stats.measure(P.ADJUSTING_ARRAY_MAPPING, () => {
      this.fixArraysAfterAddingRow(e.sheet, e.rowStart, e.numberOfRows);
    });
    for (const r of this.addressMapping.verticesFromRowsSpan(e))
      this.graph.markNodeAsDirty(r);
    return this.addStructuralNodesToChangeSet(), {
      affectedArrays: t
    };
  }
  addColumns(e) {
    this.stats.measure(P.ADJUSTING_ADDRESS_MAPPING, () => {
      this.addressMapping.addColumns(e.sheet, e.columnStart, e.numberOfColumns);
    });
    const t = this.stats.measure(P.ADJUSTING_RANGES, () => {
      const r = this.rangeMapping.moveAllRangesInSheetAfterAddingColumns(e.sheet, e.columnStart, e.numberOfColumns);
      return this.fixRangesWhenAddingColumns(e.sheet, e.columnStart, e.numberOfColumns), this.getArrayVerticesRelatedToRanges(r.verticesWithChangedSize);
    });
    this.stats.measure(P.ADJUSTING_ARRAY_MAPPING, () => this.fixArraysAfterAddingColumn(e.sheet, e.columnStart, e.numberOfColumns));
    for (const r of this.addressMapping.verticesFromColumnsSpan(e))
      this.graph.markNodeAsDirty(r);
    return this.addStructuralNodesToChangeSet(), {
      affectedArrays: t,
      contentChanges: this.getAndClearContentChanges()
    };
  }
  isThereSpaceForArray(e) {
    const t = e.getRangeOrUndef();
    if (t === void 0)
      return !1;
    for (const r of t.addresses(this)) {
      const n = this.addressMapping.getCell(r);
      if (n !== void 0 && !(n instanceof er) && n !== e)
        return !1;
    }
    return !0;
  }
  moveCells(e, t, r, n) {
    for (const i of e.addressesWithDirection(t, r, this)) {
      const a = O(n, i.col + t, i.row + r);
      let o = this.addressMapping.getCell(i);
      const u = this.addressMapping.getCell(a);
      if (this.addressMapping.removeCell(i), o !== void 0) {
        this.graph.markNodeAsDirty(o), this.addressMapping.setCell(a, o);
        let l;
        for (const c of this.graph.adjacentNodes(o))
          c instanceof we && !e.containsRange(c.range) && (l = l != null ? l : this.fetchCellOrCreateEmpty(i).vertex, this.graph.addEdge(l, c), this.graph.removeEdge(o, c));
        l && (this.graph.markNodeAsDirty(l), this.addressMapping.setCell(i, l));
      }
      if (u !== void 0) {
        o === void 0 && this.addressMapping.removeCell(a);
        for (const l of this.graph.adjacentNodes(u))
          o = o != null ? o : this.fetchCellOrCreateEmpty(a).vertex, this.graph.addEdge(o, l), this.graph.markNodeAsDirty(o);
        this.removeVertex(u);
      }
    }
    for (const i of this.rangeMapping.rangeVerticesContainedInRange(e))
      for (const a of this.graph.adjacentNodes(i))
        if (a instanceof we && !e.containsRange(a.range)) {
          this.graph.removeEdge(i, a);
          for (const o of i.range.addresses(this)) {
            const {
              vertex: u,
              id: l
            } = this.fetchCellOrCreateEmpty(o);
            this.graph.addEdge(l != null ? l : u, a), this.addressMapping.setCell(o, u), this.graph.markNodeAsDirty(u);
          }
        }
    this.rangeMapping.moveRangesInsideSourceRange(e, t, r, n);
  }
  /**
   * Sets an array empty.
   * - removes all corresponding entries from address mapping
   * - reroutes the edges
   * - removes vertex from graph and cleans up its dependencies
   * - removes vertex from range mapping and array mapping
   */
  setArrayEmpty(e) {
    const t = F.spanFrom(e.getAddress(this.lazilyTransformingAstService), e.width, e.height), r = this.graph.adjacentNodes(e);
    for (const n of t.addresses(this))
      this.addressMapping.removeCell(n);
    for (const n of r.values()) {
      const i = Kp(this.functionRegistry, n, e.getRange(), this.lazilyTransformingAstService, this);
      for (const a of i) {
        const {
          vertex: o,
          id: u
        } = this.fetchCellOrCreateEmpty(a);
        this.graph.addEdge(u != null ? u : o, n);
      }
      i.length > 0 && this.graph.markNodeAsDirty(n);
    }
    this.removeVertex(e), this.arrayMapping.removeArray(e.getRange());
  }
  addVertex(e, t) {
    this.graph.addNodeIfNotExists(t), this.addressMapping.setCell(e, t);
  }
  addArrayVertex(e, t) {
    this.graph.addNodeIfNotExists(t), this.setAddressMappingForArrayVertex(t, e);
  }
  /**
   * Iterator over all array formula nodes in the graph.
   */
  *arrayFormulaNodes() {
    for (const e of this.graph.getNodes())
      e instanceof le && (yield e);
  }
  *entriesFromRowsSpan(e) {
    yield* rt(this.addressMapping.entriesFromRowsSpan(e));
  }
  *entriesFromColumnsSpan(e) {
    yield* rt(this.addressMapping.entriesFromColumnsSpan(e));
  }
  fetchCell(e) {
    return this.addressMapping.getCellOrThrow(e);
  }
  /**
   * Gets the cell vertex at the specified address.
   * @throws {NoSheetWithIdError} if sheet doesn't exist
   */
  getCell(e) {
    return this.addressMapping.getCell(e, {
      throwIfSheetNotExists: !0
    });
  }
  getCellValue(e) {
    return this.isPlaceholder(e.sheet) ? new f(m.REF, E.SheetRef) : this.addressMapping.getCellValue(e);
  }
  getRawValue(e) {
    return this.isPlaceholder(e.sheet) ? null : this.addressMapping.getRawValue(e);
  }
  getScalarValue(e) {
    if (this.isPlaceholder(e.sheet))
      return new f(m.REF, E.SheetRef);
    const t = this.addressMapping.getCellValue(e);
    return t instanceof M ? new f(m.VALUE, E.ScalarExpected) : t;
  }
  existsEdge(e, t) {
    return this.graph.existsEdge(e, t);
  }
  getSheetId(e) {
    return this.sheetMapping.getSheetIdOrThrowError(e);
  }
  getSheetHeight(e) {
    return this.addressMapping.getSheetHeight(e);
  }
  getSheetWidth(e) {
    return this.addressMapping.getSheetWidth(e);
  }
  getArray(e) {
    return this.arrayMapping.getArray(e);
  }
  getRange(e, t) {
    return this.rangeMapping.getRangeVertex(e, t);
  }
  topSortWithScc() {
    return this.graph.topSortWithScc();
  }
  markAsVolatile(e) {
    this.graph.markNodeAsVolatile(e);
  }
  markAsDependentOnStructureChange(e) {
    this.graph.markNodeAsChangingWithStructure(e);
  }
  forceApplyPostponedTransformations() {
    for (const e of this.graph.getNodes())
      e instanceof Lt && e.ensureRecentData(this.lazilyTransformingAstService);
  }
  *rawValuesFromRange(e) {
    for (const t of e.addresses(this)) {
      const r = this.getScalarValue(t);
      r !== B && (yield [I(r), t]);
    }
  }
  computeListOfValuesInRange(e) {
    const t = [];
    for (const r of e.addresses(this)) {
      const n = this.getScalarValue(r);
      t.push(n);
    }
    return t;
  }
  shrinkArrayToCorner(e) {
    this.cleanAddressMappingUnderArray(e);
    for (const t of this.adjacentArrayVertices(e)) {
      let r;
      t instanceof be ? r = this.formulaDirectDependenciesToArray(t, e) : r = this.rangeDirectDependenciesToArray(t, e);
      let n = !1;
      for (const [i, a] of r)
        e.isLeftCorner(i) && (n = !0), this.graph.addEdge(a, t), this.graph.markNodeAsDirty(a);
      n || this.graph.removeEdge(e, t);
    }
    this.graph.markNodeAsDirty(e);
  }
  isArrayInternalCell(e) {
    const t = this.getCell(e);
    return t instanceof le && !t.isLeftCorner(e);
  }
  getAndClearContentChanges() {
    const e = this.changes;
    return this.changes = nr.empty(), e;
  }
  getAdjacentNodesAddresses(e) {
    const t = this.graph.adjacentNodes(e), r = [];
    return t.forEach((n) => {
      n instanceof we ? r.push($i(n.start, n.end)) : n instanceof be && r.push(n.getAddress(this.lazilyTransformingAstService));
    }), r;
  }
  /**
   * Marks all cell vertices in the sheet as dirty.
   */
  markAllCellsAsDirtyInSheet(e) {
    const t = this.addressMapping.sheetEntries(e);
    for (const [, r] of t)
      this.graph.markNodeAsDirty(r);
  }
  /**
   * Marks all range vertices in the sheet as dirty.
   */
  markAllRangesAsDirtyInSheet(e) {
    const t = this.rangeMapping.rangesInSheet(e);
    for (const r of t)
      this.graph.markNodeAsDirty(r);
  }
  /**
   * For each range vertex in placeholderSheetToDelete:
   * - reroutes dependencies and dependents of range vertex to the corresponding vertex in sheetToKeep
   * - removes range vertex from graph and range mapping
   * - cleans up dependencies of the removed vertex
   */
  mergeRangeVertices(e, t) {
    const r = Array.from(this.rangeMapping.rangesInSheet(t));
    for (const n of r) {
      if (!this.graph.hasNode(n))
        continue;
      const i = n.start, a = n.end;
      if (i.sheet !== t && a.sheet !== t)
        continue;
      const o = O(e, i.col, i.row), u = O(e, a.col, a.row), l = this.rangeMapping.getRangeVertex(o, u);
      l ? (this.rerouteDependents(n, l), this.removeVertexAndRerouteDependencies(n, l), this.rangeMapping.removeVertexIfExists(n), this.graph.markNodeAsDirty(l)) : (this.rangeMapping.removeVertexIfExists(n), n.range.moveToSheet(e), this.rangeMapping.addOrUpdateVertex(n), this.graph.markNodeAsDirty(n));
    }
  }
  /**
   * For each cell vertex in placeholderSheetToDelete:
   * - reroutes dependents of cell vertex to the corresponding vertex in sheetToKeep
   * - removes cell vertex from graph and address mapping
   * - cleans up dependencies of the removed vertex
   */
  mergeCellVertices(e, t) {
    const r = Array.from(this.addressMapping.sheetEntries(t));
    for (const [n, i] of r) {
      const a = O(e, n.col, n.row), o = this.getCell(a);
      o ? (this.rerouteDependents(i, o), this.removeVertexAndCleanupDependencies(i), this.addressMapping.removeCell(n), this.graph.markNodeAsDirty(o)) : (this.addressMapping.moveCell(n, a), this.graph.markNodeAsDirty(i));
    }
  }
  /**
   * Checks if the given sheet ID refers to a placeholder sheet (doesn't exist but is referenced by other sheets)
   */
  isPlaceholder(e) {
    return e !== Xt.SHEET_FOR_WORKBOOK_EXPRESSIONS && !this.sheetMapping.hasSheetWithId(e, {
      includePlaceholders: !1
    });
  }
  exchangeGraphNode(e, t) {
    this.graph.addNodeIfNotExists(t);
    const r = this.graph.adjacentNodes(e);
    this.removeVertex(e), r.forEach((n) => {
      this.graph.hasNode(n) && this.graph.addEdge(t, n);
    });
  }
  setArray(e, t) {
    this.arrayMapping.setArray(e, t);
  }
  correctInfiniteRangesDependency(e) {
    const t = this.graph.getInfiniteRanges().filter((a) => a.range.addressInRange(e));
    if (t.length <= 0)
      return;
    const {
      vertex: r,
      id: n
    } = this.fetchCellOrCreateEmpty(e), i = n != null ? n : r.idInGraph;
    if (i === void 0)
      throw new Error("Vertex not found");
    t.forEach((a) => {
      this.graph.addEdge(i, a);
    });
  }
  exchangeOrAddGraphNode(e, t) {
    e ? this.exchangeGraphNode(e, t) : this.graph.addNodeIfNotExists(t);
  }
  getArrayVerticesRelatedToRanges(e) {
    const t = /* @__PURE__ */ new Set();
    return e.forEach((r) => {
      this.graph.hasNode(r) && this.graph.adjacentNodes(r).forEach((n) => {
        n instanceof le && t.add(n);
      });
    }), t;
  }
  correctInfiniteRangesDependenciesByRangeVertex(e) {
    this.graph.getInfiniteRanges().forEach((t) => {
      const r = e.range.intersectionWith(t.range);
      r !== void 0 && r.addresses(this).forEach((n) => {
        const {
          vertex: i,
          id: a
        } = this.fetchCellOrCreateEmpty(n);
        this.graph.addEdge(a != null ? a : i, t);
      });
    });
  }
  cleanAddressMappingUnderArray(e) {
    const t = e.getRange();
    for (const r of t.addresses(this)) {
      const n = e.getArrayCellValue(r);
      this.getCell(r) === e ? e.isLeftCorner(r) ? this.changes.addChange(new f(m.REF), r, n) : (this.addressMapping.removeCell(r), this.changes.addChange(B, r, n)) : this.changes.addChange(B, r, n);
    }
  }
  *formulaDirectDependenciesToArray(e, t) {
    var r;
    const [, n] = (r = this.formulaDependencyQuery(e)) !== null && r !== void 0 ? r : [];
    if (n !== void 0) {
      for (const i of n)
        if (!(i instanceof Ht || i instanceof F) && t.getRange().addressInRange(i)) {
          const a = this.fetchCellOrCreateEmpty(i).vertex;
          yield [i, a];
        }
    }
  }
  *rangeDirectDependenciesToArray(e, t) {
    const {
      restRange: r
    } = this.rangeMapping.findSmallerRange(e.range);
    for (const n of r.addresses(this))
      if (t.getRange().addressInRange(n)) {
        const i = this.fetchCellOrCreateEmpty(n).vertex;
        yield [n, i];
      }
  }
  *adjacentArrayVertices(e) {
    const t = this.graph.adjacentNodes(e);
    for (const r of t)
      (r instanceof be || r instanceof we) && (yield r);
  }
  addStructuralNodesToChangeSet() {
    this.graph.markChangingWithStructureNodesAsDirty();
  }
  fixRangesWhenAddingRows(e, t, r) {
    const n = Array.from(this.rangeMapping.rangesInSheet(e));
    for (const i of n)
      if (i.range.includesRow(t + r))
        if (i.bruteForce) {
          const a = i.range.rangeWithSameWidth(t, r);
          for (const o of a.addresses(this)) {
            const {
              vertex: u,
              id: l
            } = this.fetchCellOrCreateEmpty(o);
            this.graph.addEdge(l != null ? l : u, i);
          }
        } else {
          let a = i, o = this.rangeMapping.findSmallerRange(a.range);
          if (o.smallerRangeVertex !== void 0)
            continue;
          for (; o.smallerRangeVertex === void 0; ) {
            const u = new we(F.spanFrom(a.range.start, a.range.width(), a.range.height() - 1));
            this.rangeMapping.addOrUpdateVertex(u), this.graph.addNodeIfNotExists(u);
            const l = new F(O(a.range.start.sheet, a.range.start.col, a.range.end.row), a.range.end);
            this.addAllFromRange(l, a), this.graph.addEdge(u, a), a = u, o = this.rangeMapping.findSmallerRange(a.range);
          }
          this.graph.addEdge(o.smallerRangeVertex, a), this.addAllFromRange(o.restRange, a), this.graph.removeEdge(o.smallerRangeVertex, i);
        }
  }
  addAllFromRange(e, t) {
    for (const r of e.addresses(this)) {
      const {
        vertex: n,
        id: i
      } = this.fetchCellOrCreateEmpty(r);
      this.graph.addEdge(i != null ? i : n, t);
    }
  }
  fixRangesWhenAddingColumns(e, t, r) {
    for (const n of this.rangeMapping.rangesInSheet(e))
      if (n.range.includesColumn(t + r)) {
        let i;
        n.bruteForce ? i = n.range.rangeWithSameHeight(t, r) : i = F.spanFrom(O(e, t, n.range.end.row), r, 1);
        for (const a of i.addresses(this)) {
          const {
            vertex: o,
            id: u
          } = this.fetchCellOrCreateEmpty(a);
          this.graph.addEdge(u != null ? u : o, n);
        }
      }
  }
  exchangeOrAddFormulaVertex(e) {
    const t = e.getAddress(this.lazilyTransformingAstService), r = F.spanFrom(t, e.width, e.height), n = this.shrinkPossibleArrayAndGetCell(t);
    if (e instanceof le && this.setArray(r, e), this.exchangeOrAddGraphNode(n, e), this.addressMapping.setCell(t, e), e instanceof le) {
      if (!this.isThereSpaceForArray(e))
        return;
      for (const i of r.addresses(this)) {
        if (e.isLeftCorner(i))
          continue;
        const a = this.getCell(i);
        this.exchangeOrAddGraphNode(a, e);
      }
    }
    for (const i of r.addresses(this))
      this.addressMapping.setCell(i, e);
  }
  setAddressMappingForArrayVertex(e, t) {
    if (this.addressMapping.setCell(t, e), !(e instanceof le))
      return;
    const r = F.spanFromOrUndef(t, e.width, e.height);
    if (r !== void 0 && (this.setArray(r, e), !!this.isThereSpaceForArray(e)))
      for (const n of r.addresses(this))
        this.addressMapping.setCell(n, e);
  }
  truncateRanges(e, t) {
    const {
      verticesToRemove: r,
      verticesToMerge: n,
      verticesWithChangedSize: i
    } = this.rangeMapping.truncateRanges(e, t);
    for (const [a, o] of n)
      this.rerouteDependents(o, a), this.removeVertexAndCleanupDependencies(o);
    for (const a of r)
      this.removeVertexAndCleanupDependencies(a);
    return i;
  }
  fixArraysAfterAddingRow(e, t, r) {
    if (this.arrayMapping.moveArrayVerticesAfterRowByRows(e, t, r), !(t <= 0))
      for (const [, n] of this.arrayMapping.arraysInRows(Ge.fromRowStartAndEnd(e, t - 1, t - 1))) {
        const i = n.getRange();
        for (let a = i.start.col; a <= i.end.col; ++a)
          for (let o = t; o <= i.end.row; ++o) {
            const u = O(e, a, o), l = O(e, a, o + r), c = n.getArrayCellValue(u);
            this.addressMapping.moveCell(l, u), this.changes.addChange(B, l, c);
          }
      }
  }
  fixArraysAfterRemovingRows(e, t, r) {
    if (this.arrayMapping.moveArrayVerticesAfterRowByRows(e, t, -r), !(t <= 0))
      for (const [, n] of this.arrayMapping.arraysInRows(Ge.fromRowStartAndEnd(e, t - 1, t - 1)))
        if (this.isThereSpaceForArray(n))
          for (const i of n.getRange().addresses(this))
            this.addressMapping.setCell(i, n);
        else
          this.setNoSpaceIfArray(n);
  }
  fixArraysAfterAddingColumn(e, t, r) {
    if (this.arrayMapping.moveArrayVerticesAfterColumnByColumns(e, t, r), !(t <= 0))
      for (const [, n] of this.arrayMapping.arraysInCols(qe.fromColumnStartAndEnd(e, t - 1, t - 1))) {
        const i = n.getRange();
        for (let a = i.start.row; a <= i.end.row; ++a)
          for (let o = t; o <= i.end.col; ++o) {
            const u = O(e, o, a), l = O(e, o + r, a), c = n.getArrayCellValue(u);
            this.addressMapping.moveCell(l, u), this.changes.addChange(B, l, c);
          }
      }
  }
  fixArraysAfterRemovingColumns(e, t, r) {
    if (this.arrayMapping.moveArrayVerticesAfterColumnByColumns(e, t, -r), !(t <= 0))
      for (const [, n] of this.arrayMapping.arraysInCols(qe.fromColumnStartAndEnd(e, t - 1, t - 1)))
        if (this.isThereSpaceForArray(n))
          for (const i of n.getRange().addresses(this))
            this.addressMapping.setCell(i, n);
        else
          this.setNoSpaceIfArray(n);
  }
  shrinkPossibleArrayAndGetCell(e) {
    const t = this.getCell(e);
    return t instanceof le ? (this.setNoSpaceIfArray(t), this.getCell(e)) : t;
  }
  setNoSpaceIfArray(e) {
    e instanceof le && (this.shrinkArrayToCorner(e), e.setNoSpace());
  }
  /**
   * Removes a vertex from the graph and range mapping and cleans up its dependencies.
   */
  removeVertex(e) {
    this.removeVertexAndCleanupDependencies(e), e instanceof we && this.rangeMapping.removeVertexIfExists(e);
  }
  /**
   * Reroutes dependent vertices of source to target. Also removes the edge target -> source if it exists.
   */
  rerouteDependents(e, t) {
    const r = this.graph.adjacentNodes(e);
    this.graph.removeEdgeIfExists(t, e), r.forEach((n) => {
      this.graph.hasNode(n) && this.graph.addEdge(t, n);
    });
  }
  /**
   * Removes a vertex from graph and reroutes its dependencies to other vertex. Also removes the edge vertexToKeep -> vertexToDelete if it exists.
   */
  removeVertexAndRerouteDependencies(e, t) {
    const r = this.graph.removeNode(e);
    this.graph.removeEdgeIfExists(t, e), r.forEach(([n, i]) => {
      this.graph.hasNode(i) && this.graph.addEdge(i, t);
    });
  }
  /**
   * Removes a vertex from graph and cleans up its dependencies.
   * Dependency clean up = remove all RangeVertex and EmptyCellVertex dependencies if no other vertex depends on them.
   * Also cleans up placeholder sheets that have no remaining vertices (not needed anymore)
   */
  removeVertexAndCleanupDependencies(e) {
    const t = new Set(this.graph.removeNode(e)), r = /* @__PURE__ */ new Set();
    for (; t.size > 0; ) {
      const n = t.values().next().value;
      t.delete(n);
      const [i, a] = n;
      this.graph.hasNode(a) && this.graph.adjacentNodesCount(a) === 0 && ((a instanceof we || a instanceof er) && this.graph.removeNode(a).forEach((o) => t.add(o)), a instanceof we ? (this.rangeMapping.removeVertexIfExists(a), r.add(a.sheet)) : a instanceof er && ne(i) && (this.addressMapping.removeCell(i), r.add(i.sheet)));
    }
    this.cleanupPlaceholderSheets(r);
  }
  /**
   * Removes placeholder sheets that have no remaining vertices.
   */
  cleanupPlaceholderSheets(e) {
    for (const t of e)
      this.isPlaceholder(t) && !this.addressMapping.hasAnyEntries(t) && this.rangeMapping.getNumberOfRangesInSheet(t) === 0 && (this.sheetMapping.removeSheetIfExists(t, {
        includePlaceholders: !0
      }), this.addressMapping.removeSheetIfExists(t));
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class er extends ii {
  constructor() {
    super();
  }
  /**
   * Retrieves cell value bound to that singleton
   */
  getCellValue() {
    return B;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class sr extends ii {
  /** Static cell value. */
  constructor(e, t) {
    super(), this.parsedValue = e, this.rawValue = t;
  }
  getValues() {
    return {
      parsedValue: this.parsedValue,
      rawValue: this.rawValue
    };
  }
  setValues(e) {
    this.parsedValue = e.parsedValue, this.rawValue = e.rawValue;
  }
  /**
   * Returns cell value stored in vertex
   */
  getCellValue() {
    return this.parsedValue;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Xr extends ii {
  /**
   * Constructor
   */
  constructor(e, t) {
    super(), this.errors = e, this.rawInput = t;
  }
  /**
   * Returns the value of the cell.
   */
  getCellValue() {
    const e = this.errors.map((t) => t.message).find((t) => t);
    return f.parsingError(e);
  }
  /**
   * Returns the formula of the cell.
   */
  getFormula() {
    return this.rawInput;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class tm {
  constructor(e, t) {
    this.width = e, this.height = t, this.mapping = /* @__PURE__ */ new Map();
  }
  /** @inheritDoc */
  getCell(e) {
    var t;
    return (t = this.mapping.get(e.col)) === null || t === void 0 ? void 0 : t.get(e.row);
  }
  /** @inheritDoc */
  setCell(e, t) {
    this.width = Math.max(this.width, e.col + 1), this.height = Math.max(this.height, e.row + 1);
    let r = this.mapping.get(e.col);
    r || (r = /* @__PURE__ */ new Map(), this.mapping.set(e.col, r)), r.set(e.row, t);
  }
  /** @inheritDoc */
  has(e) {
    var t;
    return !!(!((t = this.mapping.get(e.col)) === null || t === void 0) && t.get(e.row));
  }
  /** @inheritDoc */
  getHeight() {
    return this.height;
  }
  /** @inheritDoc */
  getWidth() {
    return this.width;
  }
  removeCell(e) {
    var t;
    (t = this.mapping.get(e.col)) === null || t === void 0 || t.delete(e.row);
  }
  addRows(e, t) {
    this.mapping.forEach((r) => {
      const n = /* @__PURE__ */ new Map();
      r.forEach((i, a) => {
        a >= e && (n.set(a + t, i), r.delete(a));
      }), n.forEach((i, a) => {
        r.set(a, i);
      });
    }), this.height += t;
  }
  addColumns(e, t) {
    const r = /* @__PURE__ */ new Map();
    this.mapping.forEach((n, i) => {
      i >= e && (r.set(i + t, n), this.mapping.delete(i));
    }), r.forEach((n, i) => {
      this.mapping.set(i, n);
    }), this.width += t;
  }
  removeRows(e) {
    this.mapping.forEach((n) => {
      const i = /* @__PURE__ */ new Map();
      n.forEach((a, o) => {
        o >= e.rowStart && (n.delete(o), o > e.rowEnd && i.set(o - e.numberOfRows, a));
      }), i.forEach((a, o) => {
        n.set(o, a);
      });
    });
    const t = Math.min(this.height - 1, e.rowEnd), r = Math.max(0, t - e.rowStart + 1);
    this.height = Math.max(0, this.height - r);
  }
  removeColumns(e) {
    const t = /* @__PURE__ */ new Map();
    this.mapping.forEach((i, a) => {
      a >= e.columnStart && (this.mapping.delete(a), a > e.columnEnd && t.set(a - e.numberOfColumns, i));
    }), t.forEach((i, a) => {
      this.mapping.set(a, i);
    });
    const r = Math.min(this.width - 1, e.columnEnd), n = Math.max(0, r - e.columnStart + 1);
    this.width = Math.max(0, this.width - n);
  }
  *getEntries(e) {
    for (const [t, r] of this.mapping)
      for (const [n, i] of r)
        yield [O(e, t, n), i];
  }
  *verticesFromColumn(e) {
    const t = this.mapping.get(e);
    if (t !== void 0)
      for (const [r, n] of t)
        yield n;
  }
  *verticesFromRow(e) {
    for (const t of this.mapping.values()) {
      const r = t.get(e);
      r !== void 0 && (yield r);
    }
  }
  *verticesFromColumnsSpan(e) {
    for (const t of e.columns()) {
      const r = this.mapping.get(t);
      if (r !== void 0)
        for (const [n, i] of r)
          yield i;
    }
  }
  *verticesFromRowsSpan(e) {
    for (const t of this.mapping.values())
      for (const r of e.rows()) {
        const n = t.get(r);
        n !== void 0 && (yield n);
      }
  }
  *entriesFromRowsSpan(e) {
    for (const [t, r] of this.mapping.entries())
      for (const n of e.rows()) {
        const i = r.get(n);
        i !== void 0 && (yield [O(e.sheet, t, n), i]);
      }
  }
  *entriesFromColumnsSpan(e) {
    for (const t of e.columns()) {
      const r = this.mapping.get(t);
      if (r !== void 0)
        for (const [n, i] of r.entries())
          yield [O(e.sheet, t, n), i];
    }
  }
  *vertices() {
    for (const [e, t] of this.mapping)
      for (const [r, n] of t)
        n !== void 0 && (yield n);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class zi {
  /**
   * @param width - width of the stored sheet
   * @param height - height of the stored sheet
   */
  constructor(e, t) {
    this.width = e, this.height = t, this.mapping = new Array(t);
    for (let r = 0; r < t; r++)
      this.mapping[r] = new Array(e);
  }
  /** @inheritDoc */
  getCell(e) {
    return this.getCellVertex(e.col, e.row);
  }
  /** @inheritDoc */
  setCell(e, t) {
    this.width = Math.max(this.width, e.col + 1), this.height = Math.max(this.height, e.row + 1), this.mapping[e.row] || (this.mapping[e.row] = new Array(this.width)), this.mapping[e.row][e.col] = t;
  }
  /** @inheritDoc */
  has(e) {
    const t = this.mapping[e.row];
    return t ? !!t[e.col] : !1;
  }
  /** @inheritDoc */
  getHeight() {
    return this.height;
  }
  /** @inheritDoc */
  getWidth() {
    return this.width;
  }
  removeCell(e) {
    this.mapping[e.row] !== void 0 && delete this.mapping[e.row][e.col];
  }
  addRows(e, t) {
    const r = [];
    for (let n = 0; n < t; n++)
      r.push(new Array(this.width));
    this.mapping.splice(e, 0, ...r), this.height += t;
  }
  addColumns(e, t) {
    for (let r = 0; r < this.height; r++)
      this.mapping[r] !== void 0 && this.mapping[r].splice(e, 0, ...new Array(t));
    this.width += t;
  }
  removeRows(e) {
    this.mapping.splice(e.rowStart, e.numberOfRows);
    const t = Math.min(this.height - 1, e.rowEnd), r = Math.max(0, t - e.rowStart + 1);
    this.height = Math.max(0, this.height - r);
  }
  removeColumns(e) {
    for (let n = 0; n < this.height; n++)
      this.mapping[n] !== void 0 && this.mapping[n].splice(e.columnStart, e.numberOfColumns);
    const t = Math.min(this.width - 1, e.columnEnd), r = Math.max(0, t - e.columnStart + 1);
    this.width = Math.max(0, this.width - r);
  }
  *getEntries(e) {
    for (let t = 0; t < this.height; ++t)
      for (let r = 0; r < this.width; ++r) {
        const n = this.getCellVertex(r, t);
        n && (yield [O(e, r, t), n]);
      }
  }
  *verticesFromColumn(e) {
    for (let t = 0; t < this.height; ++t) {
      const r = this.getCellVertex(e, t);
      r && (yield r);
    }
  }
  *verticesFromRow(e) {
    for (let t = 0; t < this.width; ++t) {
      const r = this.getCellVertex(t, e);
      r && (yield r);
    }
  }
  *verticesFromColumnsSpan(e) {
    for (let t = e.columnStart; t <= e.columnEnd; ++t)
      for (let r = 0; r < this.height; ++r) {
        const n = this.getCellVertex(t, r);
        n && (yield n);
      }
  }
  *verticesFromRowsSpan(e) {
    for (let t = 0; t < this.width; ++t)
      for (let r = e.rowStart; r <= e.rowEnd; ++r) {
        const n = this.getCellVertex(t, r);
        n && (yield n);
      }
  }
  *entriesFromRowsSpan(e) {
    for (let t = 0; t < this.width; ++t)
      for (let r = e.rowStart; r <= e.rowEnd; ++r) {
        const n = this.getCellVertex(t, r);
        n && (yield [O(e.sheet, t, r), n]);
      }
  }
  *entriesFromColumnsSpan(e) {
    for (let t = e.columnStart; t <= e.columnEnd; ++t)
      for (let r = 0; r < this.height; ++r) {
        const n = this.getCellVertex(t, r);
        n && (yield [O(e.sheet, t, r), n]);
      }
  }
  *vertices() {
    for (let e = 0; e < this.height; ++e)
      for (let t = 0; t < this.width; ++t) {
        const r = this.getCellVertex(t, e);
        r && (yield r);
      }
  }
  getCellVertex(e, t) {
    var r;
    return (r = this.mapping[t]) === null || r === void 0 ? void 0 : r[e];
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var m;
(function(s) {
  s.DIV_BY_ZERO = "DIV_BY_ZERO", s.NAME = "NAME", s.VALUE = "VALUE", s.NUM = "NUM", s.NA = "NA", s.CYCLE = "CYCLE", s.REF = "REF", s.SPILL = "SPILL", s.LIC = "LIC", s.ERROR = "ERROR";
})(m || (m = {}));
var Ve;
(function(s) {
  s.FORMULA = "FORMULA", s.VALUE = "VALUE", s.ARRAY = "ARRAY", s.EMPTY = "EMPTY", s.ARRAYFORMULA = "ARRAYFORMULA";
})(Ve || (Ve = {}));
const rm = (s, e) => s instanceof le ? s.isLeftCorner(e) ? Ve.ARRAYFORMULA : Ve.ARRAY : s instanceof Lt || s instanceof Xr ? Ve.FORMULA : s instanceof sr ? Ve.VALUE : Ve.EMPTY;
var Ps;
(function(s) {
  s.EMPTY = "EMPTY", s.NUMBER = "NUMBER", s.STRING = "STRING", s.BOOLEAN = "BOOLEAN", s.ERROR = "ERROR";
})(Ps || (Ps = {}));
var Xi;
(function(s) {
  s.NUMBER = "NUMBER";
})(Xi || (Xi = {}));
const Rt = Object.assign(Object.assign({}, Ps), Xi), nm = Object.assign(Object.assign({}, Ps), _), Lo = (s) => {
  switch (s) {
    case Rt.EMPTY:
      return 0;
    case Rt.NUMBER:
      return 1;
    case Rt.STRING:
      return 2;
    case Rt.BOOLEAN:
      return 3;
    case Rt.ERROR:
      return 4;
  }
  throw new Error("Cell value not computed");
}, Vs = (s) => {
  if (s === B)
    return Rt.EMPTY;
  if (s instanceof f || s instanceof M)
    return Rt.ERROR;
  if (typeof s == "string")
    return Rt.STRING;
  if (D(s))
    return Rt.NUMBER;
  if (typeof s == "boolean")
    return Rt.BOOLEAN;
  throw new Error("Cell value not computed");
}, sm = (s) => D(s) ? Bp(s) : Vs(s), im = (s) => {
  if (D(s))
    return kp(s);
};
class f {
  constructor(e, t, r) {
    this.type = e, this.message = t, this.root = r;
  }
  /**
   * Returns a CellError with a given message.
   * @param {string} detailedMessage - message to be displayed
   */
  static parsingError(e) {
    return new f(m.ERROR, `${E.ParseError}${e ? " " + e : ""}`);
  }
  attachRootVertex(e) {
    return this.root === void 0 ? new f(this.type, this.message, e) : this;
  }
}
const Zh = (s, e) => ({
  sheet: s,
  row: e
}), am = (s) => s.row < 0, Jh = (s, e) => ({
  sheet: s,
  col: e
}), om = (s) => s.col < 0, O = (s, e, t) => ({
  sheet: s,
  col: e,
  row: t
}), ke = (s) => s.col < 0 || s.row < 0, um = (s, e, t, r) => O(e, s.col + t, s.row + r), gn = (s) => `${s.sheet},${s.row},${s.col}`;
function ne(s) {
  var e, t, r;
  return s && (typeof s == "object" || typeof s == "function") && typeof ((e = s) === null || e === void 0 ? void 0 : e.sheet) == "number" && typeof ((t = s) === null || t === void 0 ? void 0 : t.col) == "number" && typeof ((r = s) === null || r === void 0 ? void 0 : r.row) == "number";
}
const Tt = (s, e) => {
  var t;
  return (t = s.sheet) !== null && t !== void 0 ? t : e.sheet;
}, On = (s, e) => s.sheet === e.sheet && s.col === e.col && s.row === e.row;
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const hm = "AbsoluteCellRange: Wrong range size";
function Ke(s) {
  if (s && (typeof s == "object" || typeof s == "function")) {
    const e = s;
    return "start" in e && ne(e.start) && "end" in e && ne(e.end);
  } else
    return !1;
}
const $i = (s, e) => ({
  start: s,
  end: e
});
class F {
  constructor(e, t) {
    if (e.sheet !== t.sheet)
      throw new vn(e.sheet, t.sheet);
    this.start = O(e.sheet, e.col, e.row), this.end = O(t.sheet, t.col, t.row);
  }
  get sheet() {
    return this.start.sheet;
  }
  static fromSimpleCellAddresses(e, t) {
    if (e.sheet !== t.sheet)
      throw new vn(e.sheet, t.sheet);
    const r = t.col - e.col, n = t.row - e.row;
    return Number.isFinite(n) && Number.isFinite(r) ? new F(e, t) : Number.isFinite(n) ? new Yt(e.sheet, e.row, t.row) : new Wt(e.sheet, e.col, t.col);
  }
  static fromAst(e, t) {
    return e.type === g.CELL_RANGE ? F.fromCellRange(e, t) : e.type === g.COLUMN_RANGE ? Wt.fromColumnRange(e, t) : Yt.fromRowRangeAst(e, t);
  }
  static fromAstOrUndef(e, t) {
    try {
      return F.fromAst(e, t);
    } catch (r) {
      return;
    }
  }
  static fromCellRange(e, t) {
    return new F(e.start.toSimpleCellAddress(t), e.end.toSimpleCellAddress(t));
  }
  static spanFrom(e, t, r) {
    const n = F.spanFromOrUndef(e, t, r);
    if (n === void 0)
      throw new Error(hm);
    return n;
  }
  static spanFromOrUndef(e, t, r) {
    if (!Number.isFinite(t) && Number.isFinite(r))
      return e.col !== 0 ? void 0 : new Yt(e.sheet, e.row, e.row + r - 1);
    if (!Number.isFinite(r) && Number.isFinite(t))
      return e.row !== 0 ? void 0 : new Wt(e.sheet, e.col, e.col + t - 1);
    if (Number.isFinite(r) && Number.isFinite(t))
      return new F(e, O(e.sheet, e.col + t - 1, e.row + r - 1));
  }
  static fromCoordinates(e, t, r, n, i) {
    return new F(O(e, t, r), O(e, n, i));
  }
  isFinite() {
    return Number.isFinite(this.size());
  }
  doesOverlap(e) {
    return !(this.start.sheet != e.start.sheet || this.end.row < e.start.row || this.start.row > e.end.row || this.end.col < e.start.col || this.start.col > e.end.col);
  }
  addressInRange(e) {
    return this.sheet !== e.sheet ? !1 : this.start.row <= e.row && this.end.row >= e.row && this.start.col <= e.col && this.end.col >= e.col;
  }
  columnInRange(e) {
    return this.sheet !== e.sheet ? !1 : this.start.col <= e.col && this.end.col >= e.col;
  }
  rowInRange(e) {
    return this.sheet !== e.sheet ? !1 : this.start.row <= e.row && this.end.row >= e.row;
  }
  containsRange(e) {
    return this.addressInRange(e.start) && this.addressInRange(e.end);
  }
  intersectionWith(e) {
    if (this.sheet !== e.start.sheet)
      return;
    const t = Math.max(this.start.row, e.start.row), r = Math.min(this.end.row, e.end.row), n = Math.max(this.start.col, e.start.col), i = Math.min(this.end.col, e.end.col);
    if (!(t > r || n > i))
      return new F(O(this.sheet, n, t), O(this.sheet, i, r));
  }
  includesRow(e) {
    return this.start.row < e && this.end.row >= e;
  }
  includesColumn(e) {
    return this.start.col < e && this.end.col >= e;
  }
  shiftByRows(e) {
    this.start.row += e, this.end.row += e;
  }
  expandByRows(e) {
    this.end.row += e;
  }
  shiftByColumns(e) {
    this.start.col += e, this.end.col += e;
  }
  shifted(e, t) {
    return F.spanFrom(O(this.sheet, this.start.col + e, this.start.row + t), this.width(), this.height());
  }
  expandByColumns(e) {
    this.end.col += e;
  }
  moveToSheet(e) {
    this.start.sheet = e, this.end.sheet = e;
  }
  removeSpan(e) {
    e instanceof Ge ? this.removeRows(e.start, e.end) : this.removeColumns(e.start, e.end);
  }
  shouldBeRemoved() {
    return this.width() <= 0 || this.height() <= 0;
  }
  rangeWithSameWidth(e, t) {
    return F.spanFrom(O(this.sheet, this.start.col, e), this.width(), t);
  }
  rangeWithSameHeight(e, t) {
    return F.spanFrom(O(this.sheet, e, this.start.row), t, this.height());
  }
  toString() {
    return `${this.start.sheet},${this.start.col},${this.start.row},${this.end.col},${this.end.row}`;
  }
  width() {
    return this.end.col - this.start.col + 1;
  }
  height() {
    return this.end.row - this.start.row + 1;
  }
  size() {
    return this.height() * this.width();
  }
  arrayOfAddressesInRange() {
    const e = [];
    for (let t = 0; t < this.height(); ++t) {
      e[t] = [];
      for (let r = 0; r < this.width(); ++r) {
        const n = O(this.sheet, this.start.col + r, this.start.row + t);
        e[t].push(n);
      }
    }
    return e;
  }
  withStart(e) {
    return new F(e, this.end);
  }
  sameDimensionsAs(e) {
    return this.width() === e.width() && this.height() === e.height();
  }
  sameAs(e) {
    return On(this.start, e.start) && On(this.end, e.end);
  }
  addressesArrayMap(e, t) {
    const r = [];
    let n = this.start.row;
    for (; n <= this.effectiveEndRow(e); ) {
      let i = this.start.col;
      const a = [];
      for (; i <= this.effectiveEndColumn(e); )
        a.push(t(O(this.start.sheet, i, n))), i++;
      r.push(a), n++;
    }
    return r;
  }
  addresses(e) {
    const t = [];
    let r = this.start.row;
    const n = this.effectiveEndRow(e), i = this.effectiveEndColumn(e);
    for (; r <= n; ) {
      let a = this.start.col;
      for (; a <= i; )
        t.push(O(this.start.sheet, a, r)), a++;
      r++;
    }
    return t;
  }
  *addressesWithDirection(e, t, r) {
    if (e > 0)
      if (t > 0) {
        let n = this.effectiveEndRow(r);
        for (; n >= this.start.row; ) {
          let i = this.effectiveEndColumn(r);
          for (; i >= this.start.col; )
            yield O(this.start.sheet, i, n), i -= 1;
          n -= 1;
        }
      } else {
        let n = this.start.row;
        for (; n <= this.effectiveEndRow(r); ) {
          let i = this.effectiveEndColumn(r);
          for (; i >= this.start.col; )
            yield O(this.start.sheet, i, n), i -= 1;
          n += 1;
        }
      }
    else if (t > 0) {
      let n = this.effectiveEndRow(r);
      for (; n >= this.start.row; ) {
        let i = this.start.col;
        for (; i <= this.effectiveEndColumn(r); )
          yield O(this.start.sheet, i, n), i += 1;
        n -= 1;
      }
    } else {
      let n = this.start.row;
      for (; n <= this.effectiveEndRow(r); ) {
        let i = this.start.col;
        for (; i <= this.effectiveEndColumn(r); )
          yield O(this.start.sheet, i, n), i += 1;
        n += 1;
      }
    }
  }
  getAddress(e, t) {
    if (e < 0 || t < 0 || t > this.height() - 1 || e > this.width() - 1)
      throw Error("Index out of bound");
    return O(this.start.sheet, this.start.col + e, this.start.row + t);
  }
  exceedsSheetSizeLimits(e, t) {
    return this.end.col >= e || this.end.row >= t;
  }
  effectiveEndColumn(e) {
    return this.end.col;
  }
  effectiveEndRow(e) {
    return this.end.row;
  }
  effectiveWidth(e) {
    return this.width();
  }
  effectiveHeight(e) {
    return this.height();
  }
  removeRows(e, t) {
    if (!(e > this.end.row)) {
      if (t < this.start.row) {
        const r = t - e + 1;
        return this.shiftByRows(-r);
      }
      e <= this.start.row && (this.start.row = e), this.end.row -= Math.min(t, this.end.row) - e + 1;
    }
  }
  removeColumns(e, t) {
    if (!(e > this.end.col)) {
      if (t < this.start.col) {
        const r = t - e + 1;
        return this.shiftByColumns(-r);
      }
      e <= this.start.col && (this.start.col = e), this.end.col -= Math.min(t, this.end.col) - e + 1;
    }
  }
}
class Wt extends F {
  constructor(e, t, r) {
    super(O(e, t, 0), O(e, r, Number.POSITIVE_INFINITY));
  }
  static fromColumnRange(e, t) {
    const r = e.start.toSimpleColumnAddress(t), n = e.end.toSimpleColumnAddress(t);
    if (r.sheet !== n.sheet)
      throw new vn(r.sheet, n.sheet);
    return new Wt(r.sheet, r.col, n.col);
  }
  shouldBeRemoved() {
    return this.width() <= 0;
  }
  shiftByRows(e) {
  }
  expandByRows(e) {
  }
  shifted(e, t) {
    return new Wt(this.sheet, this.start.col + e, this.end.col + e);
  }
  rangeWithSameHeight(e, t) {
    return new Wt(this.sheet, e, e + t - 1);
  }
  exceedsSheetSizeLimits(e, t) {
    return this.end.col >= e;
  }
  effectiveEndRow(e) {
    return this.effectiveHeight(e) - 1;
  }
  effectiveHeight(e) {
    return e.getSheetHeight(this.sheet);
  }
  removeRows(e, t) {
  }
}
class Yt extends F {
  constructor(e, t, r) {
    super(O(e, 0, t), O(e, Number.POSITIVE_INFINITY, r));
  }
  static fromRowRangeAst(e, t) {
    const r = e.start.toSimpleRowAddress(t), n = e.end.toSimpleRowAddress(t);
    if (r.sheet !== n.sheet)
      throw new vn(r.sheet, n.sheet);
    return new Yt(r.sheet, r.row, n.row);
  }
  shouldBeRemoved() {
    return this.height() <= 0;
  }
  shiftByColumns(e) {
  }
  expandByColumns(e) {
  }
  shifted(e, t) {
    return new Yt(this.sheet, this.start.row + t, this.end.row + t);
  }
  rangeWithSameWidth(e, t) {
    return new Yt(this.sheet, e, e + t - 1);
  }
  exceedsSheetSizeLimits(e, t) {
    return this.end.row >= t;
  }
  effectiveEndColumn(e) {
    return this.effectiveWidth(e) - 1;
  }
  effectiveWidth(e) {
    return e.getSheetWidth(this.sheet);
  }
  removeColumns(e, t) {
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ut {
  constructor(e, t, r) {
    this.formulaAddress = e, this.arraysFlag = t, this.formulaVertex = r;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function lm(s) {
  const e = s.caseSensitive ? s.accentSensitive ? "variant" : "case" : s.accentSensitive ? "accent" : "base", t = s.caseFirst, r = s.ignorePunctuation;
  return new Intl.Collator(s.localeLang, {
    sensitivity: e,
    caseFirst: t,
    ignorePunctuation: r
  });
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const cm = "i", dm = /^\s*([+-]?)\s*(([\d\.,]+(e[+-]?\d+)?)\s*([ij]?)|([ij]))\s*(([+-])\s*([+-]?)\s*(([\d\.,]+(e[+-]?\d+)?)\s*([ij]?)|([ij])))?$/;
class fm {
  constructor(e, t, r) {
    this.config = e, this.dateTimeHelper = t, this.numberLiteralsHelper = r, this.lt = (n, i) => this.compare(n, i) < 0, this.leq = (n, i) => this.compare(n, i) <= 0, this.gt = (n, i) => this.compare(n, i) > 0, this.geq = (n, i) => this.compare(n, i) >= 0, this.eq = (n, i) => this.compare(n, i) === 0, this.neq = (n, i) => this.compare(n, i) !== 0, this.pow = (n, i) => Math.pow(I(n), I(i)), this.addWithEpsilonRaw = (n, i) => {
      const a = n + i;
      return Math.abs(a) < this.actualEps * Math.abs(n) ? 0 : a;
    }, this.addWithEpsilon = (n, i) => {
      const a = xo(n, i);
      return this.ExtendedNumberFactory(this.addWithEpsilonRaw(I(n), I(i)), a);
    }, this.unaryMinus = (n) => wa(n, -I(n)), this.unaryPlus = (n) => n, this.unaryPercent = (n) => new ds(I(n) / 100), this.concat = (n, i) => n.concat(i), this.nonstrictadd = (n, i) => n instanceof f ? n : i instanceof f ? i : typeof n == "number" ? typeof i == "number" ? this.addWithEpsilonRaw(n, i) : n : typeof i == "number" ? i : 0, this.subtract = (n, i) => {
      const a = xo(n, i), o = I(n), u = I(i);
      let l = o - u;
      return Math.abs(l) < this.actualEps * Math.abs(o) && (l = 0), this.ExtendedNumberFactory(l, a);
    }, this.divide = (n, i) => {
      const a = I(n), o = I(i);
      if (o === 0)
        return new f(m.DIV_BY_ZERO);
      {
        const u = bo(n, i);
        return this.ExtendedNumberFactory(a / o, u);
      }
    }, this.multiply = (n, i) => {
      const a = bo(n, i);
      return this.ExtendedNumberFactory(I(n) * I(i), a);
    }, this.manyToExactComplex = (n) => {
      const i = [];
      for (const a of n) {
        if (a instanceof f)
          return a;
        if (D(a) || typeof a == "string") {
          const o = this.coerceScalarToComplex(a);
          o instanceof f || i.push(o);
        }
      }
      return i;
    }, this.coerceNumbersExactRanges = (n) => this.manyToNumbers(n, this.manyToExactNumbers), this.coerceNumbersCoerceRangesDropNulls = (n) => this.manyToNumbers(n, this.manyToCoercedNumbersDropNulls), this.manyToExactNumbers = (n) => {
      const i = [];
      for (const a of n) {
        if (a instanceof f)
          return a;
        D(a) && i.push(I(a));
      }
      return i;
    }, this.manyToOnlyNumbersDropNulls = (n) => {
      const i = [];
      for (const a of n) {
        if (a instanceof f)
          return a;
        if (D(a))
          i.push(I(a));
        else if (a !== B)
          return new f(m.VALUE, E.NumberExpected);
      }
      return i;
    }, this.manyToCoercedNumbersDropNulls = (n) => {
      const i = [];
      for (const a of n) {
        if (a instanceof f)
          return a;
        if (a === B)
          continue;
        const o = this.coerceScalarToNumberOrError(a);
        D(o) && i.push(I(o));
      }
      return i;
    }, this.collator = lm(e), this.actualEps = e.smartRounding ? e.precisionEpsilon : 0;
  }
  eqMatcherFunction(e) {
    const t = this.buildRegex(e);
    return (r) => typeof r == "string" && t.test(this.normalizeString(r));
  }
  neqMatcherFunction(e) {
    const t = this.buildRegex(e);
    return (r) => typeof r != "string" || !t.test(this.normalizeString(r));
  }
  searchString(e, t) {
    var r;
    const i = this.buildRegex(e, !1).exec(t);
    return (r = i == null ? void 0 : i.index) !== null && r !== void 0 ? r : -1;
  }
  requiresRegex(e) {
    if (!this.config.useRegularExpressions && !this.config.useWildcards)
      return !this.config.matchWholeCell;
    for (let t = 0; t < e.length; t++) {
      const r = e.charAt(t);
      if (Mn(r) || this.config.useRegularExpressions && wn(r))
        return !0;
    }
    return !1;
  }
  floatCmp(e, t) {
    const r = I(e), n = I(t), i = 1 + this.actualEps;
    return n >= 0 && r * i >= n && r <= n * i || n <= 0 && r * i <= n && r >= n * i ? 0 : r > n ? 1 : -1;
  }
  coerceScalarToNumberOrError(e) {
    var t;
    return e instanceof f ? e : (t = this.coerceToMaybeNumber(e)) !== null && t !== void 0 ? t : new f(m.VALUE, E.NumberCoercion);
  }
  coerceToMaybeNumber(e) {
    var t;
    return (t = this.coerceNonDateScalarToMaybeNumber(e)) !== null && t !== void 0 ? t : typeof e == "string" ? this.dateTimeHelper.dateStringToDateNumber(e) : void 0;
  }
  coerceNonDateScalarToMaybeNumber(e) {
    if (e === B)
      return 0;
    if (typeof e == "string") {
      if (e === "")
        return 0;
      const t = this.coerceStringToMaybePercentNumber(e);
      if (t !== void 0)
        return t;
      const r = this.coerceStringToMaybeCurrencyNumber(e);
      return r !== void 0 ? r : this.numberLiteralsHelper.numericStringToMaybeNumber(e.trim());
    } else return D(e) ? e : typeof e == "boolean" ? Number(e) : void 0;
  }
  coerceStringToMaybePercentNumber(e) {
    const t = e.trim();
    if (t.endsWith("%")) {
      const r = t.slice(0, t.length - 1).trim(), n = this.numberLiteralsHelper.numericStringToMaybeNumber(r);
      if (n !== void 0)
        return new ds(n / 100);
    }
  }
  coerceStringToMaybeCurrencyNumber(e) {
    const t = this.currencyMatcher(e.trim());
    if (t !== void 0) {
      const [r, n] = t, i = this.numberLiteralsHelper.numericStringToMaybeNumber(n);
      if (i !== void 0)
        return new Wi(i, r);
    }
  }
  currencyMatcher(e) {
    for (const t of this.config.currencySymbol) {
      if (e.startsWith(t))
        return [t, e.slice(t.length).trim()];
      if (e.endsWith(t))
        return [t, e.slice(0, e.length - t.length).trim()];
    }
  }
  coerceComplexExactRanges(e) {
    const t = [];
    for (const n of e)
      if (n instanceof M)
        t.push(n);
      else if (n !== B) {
        const i = this.coerceScalarToComplex(n);
        if (i instanceof f)
          return i;
        t.push(i);
      }
    const r = [];
    for (const n of t)
      if (n instanceof M) {
        const i = this.manyToExactComplex(n.valuesFromTopLeftCorner());
        if (i instanceof f)
          return i;
        r.push(...i);
      } else
        r.push(n);
    return r;
  }
  coerceScalarToComplex(e) {
    return e instanceof f ? e : e === B ? [0, 0] : D(e) ? [I(e), 0] : typeof e == "string" ? this.coerceStringToComplex(e) : new f(m.NUM, E.ComplexNumberExpected);
  }
  ExtendedNumberFactory(e, t) {
    const {
      type: r,
      format: n
    } = t;
    switch (r) {
      case _.NUMBER_RAW:
        return e;
      case _.NUMBER_CURRENCY:
        return new Wi(e, n != null ? n : this.config.currencySymbol[0]);
      case _.NUMBER_DATE:
        return new _a(e, n);
      case _.NUMBER_DATETIME:
        return new Fa(e, n);
      case _.NUMBER_TIME:
        return new La(e, n);
      case _.NUMBER_PERCENT:
        return new ds(e, n);
    }
  }
  buildRegex(e, t = !0) {
    e = this.normalizeString(e);
    let r, n = this.config.useWildcards, i = this.config.useRegularExpressions;
    if (i)
      try {
        RegExp(e);
      } catch (a) {
        i = !1, n = !1;
      }
    return i ? r = Em(e, this.config.caseSensitive) : n ? r = mm(e, this.config.caseSensitive) : r = gm(e, this.config.caseSensitive), this.config.matchWholeCell && t ? RegExp("^(" + r + ")$") : RegExp(r);
  }
  normalizeString(e) {
    return this.config.caseSensitive || (e = e.toLowerCase()), this.config.accentSensitive || (e = sl(e, "nfd").replace(/[\u0300-\u036f]/g, "")), e;
  }
  compare(e, t) {
    if (typeof e == "string" || typeof t == "string") {
      const r = typeof e == "string" ? this.dateTimeHelper.dateStringToDateNumber(e) : e, n = typeof t == "string" ? this.dateTimeHelper.dateStringToDateNumber(t) : t;
      if (D(r) && D(n))
        return this.floatCmp(r, n);
    }
    return e === B ? e = Fo(t) : t === B && (t = Fo(e)), typeof e == "string" && typeof t == "string" ? this.stringCmp(e, t) : typeof e == "boolean" && typeof t == "boolean" ? Uo(Ki(e), Ki(t)) : D(e) && D(t) ? this.floatCmp(e, t) : e === B && t === B ? 0 : Uo(Lo(Vs(e)), Lo(Vs(t)));
  }
  stringCmp(e, t) {
    return this.collator.compare(e, t);
  }
  manyToNumbers(e, t) {
    const r = [];
    for (const i of e)
      if (i instanceof M)
        r.push(i);
      else {
        const a = I(this.coerceScalarToNumberOrError(i));
        if (a instanceof f)
          return a;
        r.push(a);
      }
    const n = [];
    for (const i of r)
      if (i instanceof M) {
        const a = t(i.valuesFromTopLeftCorner());
        if (a instanceof f)
          return a;
        n.push(...a);
      } else
        n.push(i);
    return n;
  }
  coerceStringToComplex(e) {
    const t = dm.exec(e);
    if (t === null)
      return new f(m.NUM, E.ComplexNumberExpected);
    let r;
    if (t[6] !== void 0 ? r = t[1] === "-" ? [0, -1] : [0, 1] : r = this.parseComplexToken(t[1] + t[3], t[5]), r instanceof f || t[8] === void 0)
      return r;
    let n;
    return t[14] !== void 0 ? n = t[9] === "-" ? [0, -1] : [0, 1] : n = this.parseComplexToken(t[9] + t[11], t[13]), n instanceof f ? n : t[5] !== "" || t[13] === "" ? new f(m.NUM, E.ComplexNumberExpected) : t[8] === "+" ? [r[0] + n[0], r[1] + n[1]] : [r[0] - n[0], r[1] - n[1]];
  }
  parseComplexToken(e, t) {
    const r = I(this.coerceNonDateScalarToMaybeNumber(e));
    return r === void 0 ? new f(m.NUM, E.ComplexNumberExpected) : t === "" ? [r, 0] : [0, r];
  }
}
function ie([s, e], t) {
  if (!isFinite(s) || !isFinite(e))
    return new f(m.NUM, E.NaN);
  if (t = t != null ? t : cm, e === 0)
    return `${s}`;
  const r = `${e === -1 || e === 1 ? "" : Math.abs(e)}${t}`;
  return s === 0 ? `${e < 0 ? "-" : ""}${r}` : `${s}${e < 0 ? "-" : "+"}${r}`;
}
function el(s) {
  return s instanceof M ? s : M.fromScalar(s);
}
function Ki(s) {
  return Number(s);
}
function Fo(s) {
  return typeof s == "string" ? "" : D(s) ? 0 : typeof s == "boolean" ? !1 : B;
}
function tl(s) {
  if (s instanceof f || typeof s == "boolean")
    return s;
  if (s === B)
    return !1;
  if (D(s))
    return I(s) !== 0;
  {
    const e = s.toUpperCase();
    return e === "TRUE" ? !0 : e === "FALSE" || e === "" ? !1 : void 0;
  }
}
function Ds(s) {
  return s instanceof f || typeof s == "string" ? s : s === B ? "" : D(s) ? I(s).toString() : s ? "TRUE" : "FALSE";
}
function Xn(s) {
  return s === B ? 0 : s;
}
function Uo(s, e) {
  const t = I(s), r = I(e);
  return t > r ? 1 : t < r ? -1 : 0;
}
function rl(s) {
  return isNaN(s) || s === 1 / 0 || s === -1 / 0;
}
function nl(s) {
  return s === 0 ? 0 : s;
}
function Mn(s) {
  return ["*", "?"].includes(s);
}
const pm = ["{", "}", "[", "]", "(", ")", "<", ">", "=", ".", "+", "-", ",", "\\", "$", "^", "!"];
function wn(s) {
  return pm.includes(s);
}
function mm(s, e) {
  let t = "";
  for (let r = 0; r < s.length; r++) {
    const n = s.charAt(r);
    if (n === "~") {
      if (r == s.length - 1) {
        t += "~";
        continue;
      }
      const i = s.charAt(r + 1);
      Mn(i) || wn(i) ? (t += "\\" + i, r++) : (t += i, r++);
    } else Mn(n) ? t += "." + n : wn(n) ? t += "\\" + n : e ? t += n : t += n.toLowerCase();
  }
  return t;
}
function gm(s, e) {
  let t = "";
  for (let r = 0; r < s.length; r++) {
    const n = s.charAt(r);
    Mn(n) || wn(n) ? t += "\\" + n : e ? t += n : t += n.toLowerCase();
  }
  return t;
}
function Em(s, e) {
  let t = "";
  for (let r = 0; r < s.length; r++) {
    const n = s.charAt(r);
    Mn(n) || wn(n) || e ? t += n : t += n.toLowerCase();
  }
  return t;
}
function xo(s, e) {
  const {
    type: t,
    format: r
  } = Fs(s), {
    type: n,
    format: i
  } = Fs(e);
  if (t === _.NUMBER_RAW)
    return {
      type: n,
      format: i
    };
  if (n === _.NUMBER_RAW)
    return {
      type: t,
      format: r
    };
  if ((t === _.NUMBER_DATETIME || t === _.NUMBER_DATE) && (n === _.NUMBER_DATETIME || n === _.NUMBER_DATE))
    return {
      type: _.NUMBER_RAW
    };
  if (t === _.NUMBER_TIME) {
    if (n === _.NUMBER_DATE)
      return {
        type: _.NUMBER_DATETIME,
        format: `${i} ${r}`
      };
    if (n === _.NUMBER_DATETIME)
      return {
        type: _.NUMBER_DATETIME,
        format: i
      };
  }
  if (n === _.NUMBER_TIME) {
    if (t === _.NUMBER_DATE)
      return {
        type: _.NUMBER_DATETIME,
        format: `${r} ${i}`
      };
    if (t === _.NUMBER_DATETIME)
      return {
        type: _.NUMBER_DATETIME,
        format: r
      };
  }
  return {
    type: t,
    format: r
  };
}
function bo(s, e) {
  let {
    type: t,
    format: r
  } = Fs(s), {
    type: n,
    format: i
  } = Fs(e);
  return t === _.NUMBER_PERCENT && (t = _.NUMBER_RAW, r = void 0), n === _.NUMBER_PERCENT && (n = _.NUMBER_RAW, i = void 0), t === _.NUMBER_RAW ? {
    type: n,
    format: i
  } : n === _.NUMBER_RAW ? {
    type: t,
    format: r
  } : {
    type: _.NUMBER_RAW
  };
}
function En(s) {
  return sl(s.toLowerCase(), "nfd").replace(/[\u0300-\u036f]/g, "");
}
function ps(s, e) {
  var t;
  if (s.isAdHoc())
    return (t = s.data[0]) === null || t === void 0 ? void 0 : t[0];
  const r = s.range;
  if (e.formulaAddress.sheet === r.sheet) {
    if (r.width() === 1) {
      const n = e.formulaAddress.row - r.start.row;
      if (n >= 0 && n < r.height())
        return s.data[n][0];
    } else if (r.height() === 1) {
      const n = e.formulaAddress.col - r.start.col;
      if (n >= 0 && n < r.width())
        return s.data[0][n];
    }
  }
}
function sl(s, e) {
  return s.normalize(e.toUpperCase());
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var h;
(function(s) {
  s.STRING = "STRING", s.NUMBER = "NUMBER", s.BOOLEAN = "BOOLEAN", s.SCALAR = "SCALAR", s.NOERROR = "NOERROR", s.RANGE = "RANGE", s.INTEGER = "INTEGER", s.COMPLEX = "COMPLEX", s.ANY = "ANY";
})(h || (h = {}));
class V {
  constructor(e) {
    this.coerceScalarToNumberOrError = (t) => this.arithmeticHelper.coerceScalarToNumberOrError(t), this.runFunction = (t, r, n, i) => {
      const a = this.evaluateArguments(t, r, n), o = a.map(([R]) => R), u = a.map(([, R]) => R), l = a.map(([, , R]) => R), c = this.buildMetadataForEachArgumentValue(o.length, n), d = r.arraysFlag && !n.vectorizationForbidden;
      if (!this.isNumberOfArgumentValuesValid(c, o.length))
        return new f(m.NA, E.WrongArgNumber);
      const [p, N] = d ? this.calculateSizeOfVectorizedResultArray(o, c) : [1, 1];
      if (p === 1 && N === 1) {
        const R = this.vectorizeAndBroadcastArgumentsIfNecessary(d, o, c, 0, 0);
        return this.calculateSingleCellOfResultArray(r, R, c, u, l, i, n.returnNumberType);
      }
      const T = [...Array(p).keys()].map((R) => [...Array(N).keys()].map((S) => {
        const A = this.vectorizeAndBroadcastArgumentsIfNecessary(d, o, c, R, S), y = this.calculateSingleCellOfResultArray(r, A, c, u, l, i, n.returnNumberType);
        if (y instanceof M)
          throw new Error("Function returning array cannot be vectorized.");
        return y;
      }));
      return M.onlyValues(T);
    }, this.runFunctionWithReferenceArgument = (t, r, n, i, a, o = () => new f(m.NA, E.CellRefExpected)) => {
      if (t.length === 0)
        return this.returnNumberWrapper(i(), n.returnNumberType);
      if (t.length > 1)
        return new f(m.NA, E.WrongArgNumber);
      let u = t[0];
      for (; u.type === g.PARENTHESIS; )
        u = u.expression;
      let l;
      if (u.type === g.CELL_REFERENCE)
        l = u.reference.toSimpleCellAddress(r.formulaAddress);
      else if (u.type === g.CELL_RANGE || u.type === g.COLUMN_RANGE || u.type === g.ROW_RANGE)
        try {
          l = F.fromAst(u, r.formulaAddress).start;
        } catch (c) {
          return new f(m.REF, E.CellRefExpected);
        }
      return l !== void 0 ? this.returnNumberWrapper(a(l), n.returnNumberType) : this.runFunction(t, r, n, o);
    }, this.interpreter = e, this.dependencyGraph = e.dependencyGraph, this.columnSearch = e.columnSearch, this.config = e.config, this.serialization = e.serialization, this.arraySizePredictor = e.arraySizePredictor, this.dateTimeHelper = e.dateTimeHelper, this.arithmeticHelper = e.arithmeticHelper;
  }
  evaluateAst(e, t) {
    return this.interpreter.evaluateAst(e, t);
  }
  arraySizeForAst(e, t) {
    return this.arraySizePredictor.checkArraySizeForAst(e, t);
  }
  listOfScalarValues(e, t) {
    const r = [];
    for (const n of e) {
      const i = n.type === g.EMPTY, a = this.evaluateAst(n, t);
      if (a instanceof M)
        for (const o of a.valuesFromTopLeftCorner())
          r.push([o, !0, i]);
      else
        r.push([a, !1, i]);
    }
    return r;
  }
  coerceToType(e, t, r) {
    let n;
    if (e instanceof M)
      switch (t.argumentType) {
        case h.RANGE:
        case h.ANY:
          n = e;
          break;
        default: {
          const i = ps(e, r);
          if (i === void 0)
            return;
          e = i;
        }
      }
    if (!(e instanceof M))
      switch (t.argumentType) {
        case h.INTEGER:
        case h.NUMBER:
          const i = this.coerceScalarToNumberOrError(e);
          if (!D(i)) {
            n = i;
            break;
          }
          const a = I(i);
          if (t.maxValue !== void 0 && a > t.maxValue)
            return new f(m.NUM, E.ValueLarge);
          if (t.minValue !== void 0 && a < t.minValue)
            return new f(m.NUM, E.ValueSmall);
          if (t.lessThan !== void 0 && a >= t.lessThan)
            return new f(m.NUM, E.ValueLarge);
          if (t.greaterThan !== void 0 && a <= t.greaterThan)
            return new f(m.NUM, E.ValueSmall);
          if (t.argumentType === h.INTEGER && !Number.isInteger(a))
            return new f(m.NUM, E.IntegerExpected);
          n = i;
          break;
        case h.STRING:
          n = Ds(e);
          break;
        case h.BOOLEAN:
          n = tl(e);
          break;
        case h.SCALAR:
        case h.NOERROR:
        case h.ANY:
          n = e;
          break;
        case h.RANGE:
          if (e instanceof f)
            return e;
          n = el(e);
          break;
        case h.COMPLEX:
          return this.arithmeticHelper.coerceScalarToComplex(I(e));
      }
    return t.passSubtype || n === void 0 ? n : I(n);
  }
  calculateSingleCellOfResultArray(e, t, r, n, i, a, o) {
    const u = this.coerceArgumentsToRequiredTypes(e, t, r, n, i);
    if (u instanceof f)
      return u;
    const l = a(...u);
    return this.returnNumberWrapper(l, o);
  }
  coerceArgumentsToRequiredTypes(e, t, r, n, i) {
    const a = [];
    for (let o = 0; o < r.length; o++) {
      const u = r[o], l = t[o], c = l === void 0 ? u == null ? void 0 : u.defaultValue : i[o] && (u != null && u.emptyAsDefault) && (u == null ? void 0 : u.defaultValue) !== void 0 ? u.defaultValue : l;
      if (c === void 0) {
        a.push(void 0);
        continue;
      }
      const d = this.coerceToType(c, u, e);
      if (d === void 0 && !n[o])
        return new f(m.VALUE, E.WrongType);
      if (d instanceof f && u.argumentType !== h.SCALAR)
        return d;
      a.push(d);
    }
    return a;
  }
  vectorizeAndBroadcastArgumentsIfNecessary(e, t, r, n, i) {
    return t.map((a, o) => e && this.isRangePassedAsAScalarArgument(a, r[o]) ? this.vectorizeAndBroadcastRangeArgument(a, n, i) : a);
  }
  vectorizeAndBroadcastRangeArgument(e, t, r) {
    var n;
    const i = e.height() === 1 ? 0 : t, a = e.width() === 1 ? 0 : r;
    return (n = e.data[i]) === null || n === void 0 ? void 0 : n[a];
  }
  evaluateArguments(e, t, r) {
    return r.expandRanges ? this.listOfScalarValues(e, t) : e.map((n) => [this.evaluateAst(n, t), !1, n.type === g.EMPTY]);
  }
  buildMetadataForEachArgumentValue(e, t) {
    const r = t.parameters ? [...t.parameters] : [];
    if (t.repeatLastArgs !== void 0 && Number.isInteger(t.repeatLastArgs) && t.repeatLastArgs > 0)
      for (; e > r.length; )
        r.push(...r.slice(r.length - t.repeatLastArgs));
    return r;
  }
  isNumberOfArgumentValuesValid(e, t) {
    return t > e.length ? !1 : t < e.length ? e.slice(t).every((i) => (i == null ? void 0 : i.optionalArg) || (i == null ? void 0 : i.defaultValue) !== void 0) : !0;
  }
  calculateSizeOfVectorizedResultArray(e, t) {
    const r = e.filter((a, o) => this.isRangePassedAsAScalarArgument(a, t[o])), n = Math.max(1, ...r.map((a) => a.height())), i = Math.max(1, ...r.map((a) => a.width()));
    return [n, i];
  }
  isRangePassedAsAScalarArgument(e, t) {
    return e == null || t == null ? !1 : e instanceof M && ![h.RANGE, h.ANY].includes(t.argumentType);
  }
  metadata(e) {
    const t = this.constructor.implementedFunctions[e];
    if (t !== void 0)
      return t;
    throw new Error(`No metadata for function ${e}.`);
  }
  returnNumberWrapper(e, t, r) {
    return t !== void 0 && D(e) ? this.arithmeticHelper.ExtendedNumberFactory(I(e), {
      type: t,
      format: r
    }) : e;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class b {
  constructor(e, t, r = !1) {
    this.width = e, this.height = t, this.isRef = r;
  }
  static error() {
    return new b(1, 1, !0);
  }
  static scalar() {
    return new b(1, 1, !1);
  }
  isScalar() {
    return this.width === 1 && this.height === 1 || this.isRef;
  }
}
function Rm(s, e) {
  return new b(Math.max(s.width, e.width), Math.max(s.height, e.height));
}
function Nm(s) {
  return new b(s.width, s.height);
}
class Tm {
  constructor(e, t) {
    this.config = e, this.functionRegistry = t;
  }
  checkArraySize(e, t) {
    return this.checkArraySizeForAst(e, {
      formulaAddress: t,
      arraysFlag: this.config.useArrayArithmetic
    });
  }
  checkArraySizeForAst(e, t) {
    switch (e.type) {
      case g.FUNCTION_CALL:
        return this.checkArraySizeForFunction(e, t);
      case g.COLUMN_RANGE:
      case g.ROW_RANGE:
      case g.CELL_RANGE: {
        const r = F.fromAstOrUndef(e, t.formulaAddress);
        return r === void 0 ? b.error() : new b(r.width(), r.height(), !0);
      }
      case g.ARRAY: {
        const r = [], n = [];
        for (const o of e.args) {
          const u = o.map((d) => this.checkArraySizeForAst(d, t)), l = Math.min(...u.map((d) => d.height)), c = u.reduce((d, p) => d + p.width, 0);
          r.push(l), n.push(c);
        }
        const i = r.reduce((o, u) => o + u, 0), a = Math.min(...n);
        return new b(a, i);
      }
      case g.STRING:
      case g.NUMBER:
        return b.scalar();
      case g.CELL_REFERENCE:
        return new b(1, 1, !0);
      case g.DIV_OP:
      case g.CONCATENATE_OP:
      case g.EQUALS_OP:
      case g.GREATER_THAN_OP:
      case g.GREATER_THAN_OR_EQUAL_OP:
      case g.LESS_THAN_OP:
      case g.LESS_THAN_OR_EQUAL_OP:
      case g.MINUS_OP:
      case g.NOT_EQUAL_OP:
      case g.PLUS_OP:
      case g.POWER_OP:
      case g.TIMES_OP: {
        const r = this.checkArraySizeForAst(e.left, t), n = this.checkArraySizeForAst(e.right, t);
        return !t.arraysFlag && (r.height > 1 || r.width > 1 || n.height > 1 || n.width > 1) ? b.error() : Rm(r, n);
      }
      case g.MINUS_UNARY_OP:
      case g.PLUS_UNARY_OP:
      case g.PERCENT_OP: {
        const r = this.checkArraySizeForAst(e.value, t);
        return !t.arraysFlag && (r.height > 1 || r.width > 1) ? b.error() : Nm(r);
      }
      case g.PARENTHESIS:
        return this.checkArraySizeForAst(e.expression, t);
      case g.EMPTY:
        return b.error();
      default:
        return b.error();
    }
  }
  checkArraySizeForFunction(e, t) {
    const r = this.functionRegistry.getArraySizeFunction(e.procedureName);
    if (r !== void 0)
      return r(e, t);
    const n = this.functionRegistry.getMetadata(e.procedureName);
    if (n === void 0 || n.expandRanges || !t.arraysFlag || n.vectorizationForbidden || n.parameters === void 0)
      return new b(1, 1);
    const i = e.args.map((l) => {
      var c;
      return this.checkArraySizeForAst(l, new Ut(t.formulaAddress, t.arraysFlag || ((c = n == null ? void 0 : n.enableArrayArithmeticForArguments) !== null && c !== void 0 ? c : !1)));
    }), a = [...n.parameters];
    if (n.repeatLastArgs !== void 0 && a.length < i.length && (i.length - a.length) % n.repeatLastArgs !== 0)
      return b.error();
    for (; a.length < i.length; ) {
      if (n.repeatLastArgs === void 0)
        return b.error();
      a.push(...a.slice(a.length - n.repeatLastArgs));
    }
    let o = 1, u = 1;
    for (let l = 0; l < i.length; l++)
      a[l].argumentType !== h.RANGE && a[l].argumentType !== h.ANY && (u = Math.max(u, i[l].height), o = Math.max(o, i[l].width));
    return new b(o, u);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class il {
  constructor(e, t, r) {
    var n;
    this.value = t, this.address = r, this.type = e.type, this.message = (n = e.message) !== null && n !== void 0 ? n : "";
  }
  toString() {
    return this.value;
  }
  valueOf() {
    return this.value;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function z(s, e, t) {
  if (typeof s == "undefined")
    return Qe.defaultConfig[t];
  if (typeof e == "string") {
    if (typeof s === e)
      return s;
    throw new Y(e, t);
  } else {
    if (e.includes(s))
      return s;
    throw new Xh(e.map((r) => `'${r}'`).join(" "), t);
  }
}
function fr(s, e, t) {
  if (s < t)
    throw new Yh(e, t);
}
function Sm(s, e, t) {
  if (s > t)
    throw new zh(e, t);
}
function $n(s, e, t, r) {
  if (e(s))
    return s;
  if (typeof s == "undefined")
    return Qe.defaultConfig[r];
  throw new Y(t, r);
}
function Po(...s) {
  const e = /* @__PURE__ */ new Map();
  s.forEach((r) => {
    const n = e.get(r.value) || [];
    n.push(r.name), e.set(r.value, n);
  });
  const t = [];
  for (const r of e.values())
    r.length > 1 && t.push(r);
  if (t.length > 0) {
    t.forEach((n) => n.sort());
    const r = t.map((n) => `[${n}]`).join("; ");
    throw new Error(`Config initialization failed. Parameters in conflict: ${r}`);
  }
}
function C(s, e, t) {
  if (typeof s !== e)
    throw new Y(e, t);
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const ba = new RegExp("^ss(\\.(s+|0+))?$"), Am = new RegExp("^[0-9/.\\-: ]+[ap]?m?$"), ym = new RegExp("\\s+"), al = new RegExp("[ /.-]"), ji = ":", Vo = 1e3, vm = ol(Om), Cm = ol(Mm);
function Im(s, e, t) {
  if (e === void 0 && t === void 0)
    return;
  let r = s.replace(ym, " ").trim().toLowerCase();
  if (!wm(r))
    return;
  let n = r.substring(r.length - 2);
  n === "am" || n === "pm" ? r = r.substring(0, r.length - 2).trim() : (n = r.substring(r.length - 1), n === "a" || n === "p" ? r = r.substring(0, r.length - 1).trim() : n = void 0);
  const i = r.split(al);
  i.length >= 2 && i[i.length - 2].includes(ji) && (i[i.length - 2] = i[i.length - 2] + "." + i[i.length - 1], i.pop());
  const a = i[i.length - 1].split(ji);
  if (n !== void 0 && a.push(n), i.length === 1)
    return Do(a, t);
  if (a.length === 1)
    return Bo(i, e);
  const o = Bo(i.slice(0, i.length - 1), e), u = Do(a, t);
  if (o !== void 0)
    return u === void 0 ? void 0 : Object.assign(Object.assign({}, o), u);
}
function Do(s, e) {
  var t, r, n;
  if (e === void 0)
    return;
  const {
    itemsCount: i,
    hourItem: a,
    minuteItem: o,
    secondItem: u
  } = vm(e);
  let l;
  if (s[s.length - 1] === "am" || s[s.length - 1] === "a" ? (l = !1, s.pop()) : (s[s.length - 1] === "pm" || s[s.length - 1] === "p") && (l = !0, s.pop()), s.length !== i)
    return;
  const c = Number((t = s[u]) !== null && t !== void 0 ? t : "0");
  if (!Number.isFinite(c))
    return;
  const d = Math.round(c * Vo) / Vo, p = Number((r = s[o]) !== null && r !== void 0 ? r : "0");
  if (!(Number.isFinite(p) && Number.isInteger(p)))
    return;
  const N = Number((n = s[a]) !== null && n !== void 0 ? n : "0");
  return !(Number.isFinite(N) && Number.isInteger(N)) || l !== void 0 && (N < 0 || N > 12) ? void 0 : {
    hours: l !== void 0 ? N % 12 + (l ? 12 : 0) : N,
    minutes: p,
    seconds: d
  };
}
function Bo(s, e) {
  var t;
  if (e === void 0)
    return;
  const {
    itemsCount: r,
    dayItem: n,
    monthItem: i,
    shortYearItem: a,
    longYearItem: o
  } = Cm(e);
  if (s.length !== r)
    return;
  const u = Number(s[n]);
  if (!(Number.isFinite(u) && Number.isInteger(u)))
    return;
  const l = Number(s[i]);
  if (!(Number.isFinite(l) && Number.isInteger(l)) || s[o] && s[a])
    return;
  const c = Number((t = s[o]) !== null && t !== void 0 ? t : s[a]);
  if (Number.isFinite(c) && Number.isInteger(c) && !(s[o] && (c < 1e3 || c > 9999)) && !(s[a] && (c < 0 || c > 99)))
    return {
      year: c,
      month: l,
      day: u
    };
}
function Om(s) {
  const e = s.toLowerCase().trim(), r = (e.endsWith("am/pm") ? e.substring(0, e.length - 5) : e.endsWith("a/p") ? e.substring(0, s.length - 3) : e).trim().split(ji);
  return {
    itemsCount: r.length,
    hourItem: r.indexOf("hh"),
    minuteItem: r.indexOf("mm"),
    secondItem: r.findIndex((n) => ba.test(n))
  };
}
function Mm(s) {
  const e = s.toLowerCase().trim().split(al);
  return {
    itemsCount: e.length,
    dayItem: e.indexOf("dd"),
    monthItem: e.indexOf("mm"),
    shortYearItem: e.indexOf("yy"),
    longYearItem: e.indexOf("yyyy")
  };
}
function wm(s) {
  return Am.test(s);
}
function ol(s) {
  const e = {};
  return (t) => {
    const r = e[t];
    if (r !== void 0)
      return r;
    const n = s(t);
    return e[t] = n, n;
  };
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const qi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Wr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Kn = 60, jn = 60, Qi = 24;
function Rn(s) {
  return s && (typeof s == "object" || typeof s == "function") ? "year" in s && typeof s.year == "number" && "month" in s && typeof s.month == "number" && "day" in s && typeof s.day == "number" : !1;
}
function ul(s) {
  return s && (typeof s == "object" || typeof s == "function") ? "hours" in s && typeof s.hours == "number" && "minutes" in s && typeof s.minutes == "number" && "seconds" in s && typeof s.seconds == "number" : !1;
}
const _m = {
  year: 9999,
  month: 12,
  day: 31
};
class Lm {
  constructor(e) {
    this.config = e, this.minDateAbsoluteValue = this.dateToNumberFromZero(e.nullDate), this.maxDateValue = this.dateToNumber(_m), this.leapYear1900 = e.leapYear1900, !this.leapYear1900 && 0 <= this.dateToNumber({
      year: 1900,
      month: 2,
      day: 28
    }) ? this.epochYearZero = this.numberToSimpleDate(2).year : this.epochYearZero = this.numberToSimpleDate(1).year, this.parseDateTime = e.parseDateTime;
  }
  getWithinBounds(e) {
    return e <= this.maxDateValue && e >= 0 ? e : void 0;
  }
  dateStringToDateNumber(e) {
    const {
      dateTime: t,
      dateFormat: r = "",
      timeFormat: n = ""
    } = this.parseDateTimeFromConfigFormats(e);
    if (t !== void 0)
      return ul(t) ? Rn(t) ? new Fa(Kr(t) + this.dateToNumber(t), r + " " + n) : new La(Kr(t), n) : Rn(t) ? new _a(this.dateToNumber(t), r) : 0;
  }
  parseDateTimeFromConfigFormats(e) {
    return this.parseDateTimeFromFormats(e, this.config.dateFormats, this.config.timeFormats);
  }
  getNullYear() {
    return this.config.nullYear;
  }
  getEpochYearZero() {
    return this.epochYearZero;
  }
  isValidDate(e) {
    return isNaN(e.year) || isNaN(e.month) || isNaN(e.day) || e.day !== Math.round(e.day) || e.month !== Math.round(e.month) || e.year !== Math.round(e.year) || e.year < 1582 || e.month < 1 || e.month > 12 || e.day < 1 ? !1 : this.isLeapYear(e.year) && e.month === 2 ? e.day <= 29 : e.day <= qi[e.month - 1];
  }
  dateToNumber(e) {
    return this.dateToNumberFromZero(e) - this.minDateAbsoluteValue;
  }
  relativeNumberToAbsoluteNumber(e) {
    return e + this.minDateAbsoluteValue - (this.leapYear1900 ? 1 : 0);
  }
  numberToSimpleDate(e) {
    const t = Math.floor(e) + this.minDateAbsoluteValue;
    let r = Math.floor(t / 365.2425);
    this.dateToNumberFromZero({
      year: r + 1,
      month: 1,
      day: 1
    }) <= t ? r++ : this.dateToNumberFromZero({
      year: r - 1,
      month: 1,
      day: 1
    }) > t && r--;
    const n = t - this.dateToNumberFromZero({
      year: r,
      month: 1,
      day: 1
    }), i = Fm(n - (this.isLeapYear(r) && n >= 59 ? 1 : 0)), a = n - Wr[i] - (this.isLeapYear(r) && i > 1 ? 1 : 0);
    return {
      year: r,
      month: i + 1,
      day: a + 1
    };
  }
  numberToSimpleDateTime(e) {
    const t = $r(e % 1), r = Math.floor(t.hours / Qi);
    t.hours = t.hours % Qi;
    const n = this.numberToSimpleDate(Math.floor(e) + r);
    return Object.assign(Object.assign({}, n), t);
  }
  leapYearsCount(e) {
    return Math.floor(e / 4) - Math.floor(e / 100) + Math.floor(e / 400) + (this.config.leapYear1900 && e >= 1900 ? 1 : 0);
  }
  daysInMonth(e, t) {
    return this.isLeapYear(e) && t === 2 ? 29 : qi[t - 1];
  }
  endOfMonth(e) {
    return {
      year: e.year,
      month: e.month,
      day: this.daysInMonth(e.year, e.month)
    };
  }
  toBasisUS(e, t) {
    return e.day === 31 && (e.day = 30), e.day === 30 && t.day === 31 && (t.day = 30), e.month === 2 && e.day === this.daysInMonth(e.year, e.month) && (e.day = 30, t.month === 2 && t.day === this.daysInMonth(t.year, t.month) && (t.day = 30)), [e, t];
  }
  yearLengthForBasis(e, t) {
    return e.year !== t.year ? e.year + 1 !== t.year || e.month < t.month || e.month === t.month && e.day < t.day ? (this.leapYearsCount(t.year) - this.leapYearsCount(e.year - 1)) / (t.year - e.year + 1) + 365 : this.countLeapDays(t) !== this.countLeapDays({
      year: e.year,
      month: e.month,
      day: e.day - 1
    }) ? 366 : 365 : this.isLeapYear(e.year) ? 366 : 365;
  }
  parseSingleFormat(e, t, r) {
    const n = this.parseDateTime(e, t, r);
    if (!(Rn(n) && (n.year >= 0 && n.year < 100 && (n.year < this.getNullYear() ? n.year += 2e3 : n.year += 1900), !this.isValidDate(n))))
      return n;
  }
  parseDateTimeFromFormats(e, t, r) {
    const n = t.length === 0 ? [void 0] : t, i = r.length === 0 ? [void 0] : r;
    for (const a of n)
      for (const o of i) {
        const u = this.parseSingleFormat(e, a, o);
        if (u !== void 0)
          return {
            dateTime: u,
            timeFormat: o,
            dateFormat: a
          };
      }
    return {};
  }
  countLeapDays(e) {
    return e.month > 2 || e.month === 2 && e.day >= 29 ? this.leapYearsCount(e.year) : this.leapYearsCount(e.year - 1);
  }
  dateToNumberFromZero(e) {
    return 365 * e.year + Wr[e.month - 1] + e.day - 1 + (e.month <= 2 ? this.leapYearsCount(e.year - 1) : this.leapYearsCount(e.year));
  }
  isLeapYear(e) {
    return e % 4 ? !1 : e % 100 ? !0 : e % 400 ? e === 1900 && this.config.leapYear1900 : !0;
  }
}
function Fm(s) {
  let e = 0;
  return Wr[e + 6] <= s && (e += 6), Wr[e + 3] <= s && (e += 3), Wr[e + 2] <= s ? e += 2 : Wr[e + 1] <= s && (e += 1), e;
}
function ko(s, e) {
  const t = 12 * s.year + s.month - 1 + e;
  return {
    year: Math.floor(t / 12),
    month: t % 12 + 1,
    day: s.day
  };
}
function Um(s) {
  return {
    year: s.year,
    month: s.month,
    day: Math.min(s.day, qi[s.month - 1])
  };
}
function Ai(s) {
  return Math.round(s * 3600 * 24) / (3600 * 24);
}
function xm(s, e = 1) {
  return Math.round(s * e) / e;
}
function $r(s) {
  const e = s * Qi * jn * Kn, t = xm(e % Kn, 1e5) % Kn, r = (e - t) / Kn, n = Math.round(r % jn) % jn, i = (r - n) / jn;
  return {
    hours: Math.round(i),
    minutes: n,
    seconds: t
  };
}
function Kr(s) {
  return ((s.seconds / 60 + s.minutes) / 60 + s.hours) / 24;
}
function Go(s) {
  return {
    year: s.year,
    month: s.month,
    day: Math.min(30, s.day)
  };
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class bm {
  call() {
    return zi;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Ho = /(\\.|dd|DD|d|D|mm|MM|m|M|YYYY|YY|yyyy|yy|HH|hh|H|h|ss(\.(0+|s+))?|s|AM\/PM|am\/pm|A\/P|a\/p|\[mm]|\[MM]|\[hh]|\[HH])/g, Wo = /(\\.|[#0]+(\.[#0]*)?)/g;
var Ft;
(function(s) {
  s.FORMAT = "FORMAT", s.FREE_TEXT = "FREE_TEXT";
})(Ft || (Ft = {}));
function qn(s, e) {
  return {
    type: s,
    value: e
  };
}
var Bs;
(function(s) {
  s.DATE = "DATE", s.NUMBER = "NUMBER", s.STRING = "STRING";
})(Bs || (Bs = {}));
function Pm(s) {
  Ho.lastIndex = 0;
  const e = [];
  let t;
  do
    t = Ho.exec(s), t !== null && e.push(t);
  while (t);
  return e;
}
function Vm(s) {
  Wo.lastIndex = 0;
  const e = Wo.exec(s);
  return e !== null ? [e] : [];
}
function hl(s, e) {
  const t = [];
  let r = 0;
  for (let i = 0; i < s.length; ++i) {
    const a = s[i];
    if (a.index !== r) {
      const o = e.substr(r, a.index - r);
      t.push(qn(Ft.FREE_TEXT, o));
    }
    a[0].startsWith("\\") ? t.push(qn(Ft.FREE_TEXT, a[0])) : t.push(qn(Ft.FORMAT, a[0])), r = a.index + a[0].length;
  }
  const n = s[s.length - 1];
  if (n.index + n[0].length < e.length) {
    const i = e.substr(n.index + n[0].length, e.length);
    t.push(qn(Ft.FREE_TEXT, i));
  }
  return t;
}
function ll(s) {
  const e = Pm(s);
  if (!e.every((t) => cl(t)))
    return {
      type: Bs.DATE,
      tokens: hl(e, s)
    };
}
function Dm(s) {
  const e = Vm(s);
  if (!e.every((t) => cl(t)))
    return {
      type: Bs.NUMBER,
      tokens: hl(e, s)
    };
}
function cl(s) {
  return s[0].startsWith("\\");
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function Bm(s, e, t, r) {
  const n = t.stringifyDateTime(r.numberToSimpleDateTime(s), e);
  if (n !== void 0)
    return n;
  const i = t.stringifyDuration($r(s), e);
  if (i !== void 0)
    return i;
  const a = Dm(e);
  return a !== void 0 ? Gm(a.tokens, s) : e;
}
function De(s, e) {
  let t = `${s}`;
  for (; t.length < e; )
    t = "0" + t;
  return t;
}
function km(s, e) {
  let t = `${s}`;
  for (; t.length < e; )
    t = t + "0";
  return t;
}
function Yo(s, e) {
  return s.split(e).length - 1;
}
function Gm(s, e) {
  let t = "";
  for (let r = 0; r < s.length; ++r) {
    const n = s[r];
    if (n.type === Ft.FREE_TEXT) {
      t += n.value;
      continue;
    }
    const i = n.value.split("."), a = i[0], o = i[1] || "", u = i[1] ? "." : "", l = Number(e.toFixed(o.length)).toString().split(".");
    let c = l[0] || "", d = l[1] || "";
    if (a.length > c.length) {
      const N = Yo(a.substr(0, a.length - c.length), "0");
      c = De(c, N + c.length);
    }
    const p = Yo(o.substr(d.length, o.length - d.length), "0");
    d = km(d, p + d.length), t += c + u + d;
  }
  return t;
}
function Hm(s, e) {
  const t = ll(e);
  if (t === void 0)
    return;
  const r = t.tokens;
  let n = "";
  for (const i of r) {
    if (i.type === Ft.FREE_TEXT) {
      n += i.value;
      continue;
    }
    switch (i.value.toLowerCase()) {
      case "h":
      case "hh": {
        n += De(s.hours, i.value.length), s.hours = 0;
        break;
      }
      case "[hh]": {
        n += De(s.hours, i.value.length - 2), s.hours = 0;
        break;
      }
      case "m":
      case "mm": {
        n += De(s.minutes, i.value.length), s.minutes = 0;
        break;
      }
      case "[mm]": {
        n += De(s.minutes + 60 * s.hours, i.value.length - 2), s.minutes = 0, s.hours = 0;
        break;
      }
      /* seconds */
      case "s":
      case "ss": {
        n += De(Math.floor(s.seconds), i.value.length);
        break;
      }
      default: {
        if (ba.test(i.value)) {
          const a = Math.max(i.value.length - 3, 0);
          n += `${s.seconds < 10 ? "0" : ""}${Math.floor(s.seconds * Math.pow(10, a)) / Math.pow(10, a)}`;
          continue;
        }
        return;
      }
    }
  }
  return n;
}
function Wm(s, e) {
  const t = ll(e);
  if (t === void 0)
    return;
  const r = t.tokens;
  let n = "", i = !1;
  const a = r.some((o) => o.type === Ft.FORMAT && (o.value === "a/p" || o.value === "A/P" || o.value === "am/pm" || o.value === "AM/PM"));
  for (let o = 0; o < r.length; o++) {
    const u = r[o];
    if (u.type === Ft.FREE_TEXT) {
      n += u.value;
      continue;
    }
    switch (u.value.toLowerCase()) {
      /* hours*/
      case "h":
      case "hh": {
        i = !0, n += De(a ? (s.hours + 11) % 12 + 1 : s.hours, u.value.length);
        break;
      }
      /* days */
      case "d":
      case "dd": {
        n += De(s.day, u.value.length);
        break;
      }
      /* seconds */
      case "s":
      case "ss": {
        n += De(Math.floor(s.seconds), u.value.length);
        break;
      }
      /* minutes / months */
      case "m":
      case "mm": {
        o + 1 < r.length && r[o + 1].value.startsWith(":") && (i = !0), i ? n += De(s.minutes, u.value.length) : n += De(s.month, u.value.length), i = !0;
        break;
      }
      /* years */
      case "yy": {
        n += De(s.year % 100, u.value.length);
        break;
      }
      case "yyyy": {
        n += s.year;
        break;
      }
      /* AM / PM */
      case "am/pm":
      case "a/p": {
        const [l, c] = u.value.split("/");
        n += s.hours < 12 ? l : c;
        break;
      }
      default: {
        if (ba.test(u.value)) {
          const l = u.value.length - 3;
          n += `${s.seconds < 10 ? "0" : ""}${Math.floor(s.seconds * Math.pow(10, l)) / Math.pow(10, l)}`;
          continue;
        }
        return;
      }
    }
  }
  return n;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Zi = "length", Nn = (s) => parseInt(s, 16), zo = (s) => parseInt(s, 10), yi = (s) => (s + "").replace(/\-/g, ""), ks = (s, e, t) => s.substr(e, t), ft = (s) => s.codePointAt(0) - 65;
function Ym(s) {
  return yi(s)[Zi] === 25 ? Nn(ks(yi(s), Nn("12"), ft("F"))) / (Nn(ks(yi(s), ft("C"), ft("Y") >> 4)) || (~~![][Zi] << 3) + 1) : 0;
}
function zm(s) {
  if (s = (s + "").replace(/\-/g, ""), s[Zi] !== ft("Z"))
    return !1;
  let e = 0;
  return [[0, ft("G") + 1], [ft("H"), ft("H") - 1], [ft("G") + ft("H"), ft("G")]].reduce((t, [r, n], i) => (t |= (zo(`${zo(Nn(ks(s, e + r - (i === 0 ? 0 : 2), n + (i ? 2 : 0))) + (Nn(ks(s, e + r + n, 2)) + []).padStart(2, "0"))}`) % 97 || 2) >> 1, e += 2, t), ft("A")) === "1" >> 1;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Xm = {
  invalid: () => "The license key for HyperFormula is invalid.",
  expired: ({
    keyValidityDate: s
  }) => `The license key for HyperFormula expired on ${s}, and is not valid for the installed version.`,
  missing: () => "The license key for HyperFormula is missing."
};
let Xo = !1;
function $m(s) {
  const e = {
    template: "missing",
    vars: {}
  };
  if (s === "gpl-v3" || s === "internal-use-in-handsontable" || s === "hftrial-0168e-1f2b7-47158-70b05-0842f")
    e.template = "valid";
  else if (typeof s == "string" && zm(s)) {
    const [t, r, n] = "20/05/2026".split("/"), i = Math.floor((/* @__PURE__ */ new Date(`${r}/${t}/${n}`)).getTime() / 864e5), a = Ym(s);
    e.vars.keyValidityDate = Km(new Date((a + 1) * 864e5)), i > a ? e.template = "expired" : e.template = "valid";
  } else s !== "" && (e.template = "invalid");
  return !Xo && e.template !== "valid" && (console.warn(Xm[e.template](e.vars)), Xo = !0), e.template;
}
function Km(s) {
  const t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][s.getMonth()], r = s.getDate(), n = s.getFullYear();
  return `${t} ${r}, ${n}`;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var te;
(function(s) {
  class e {
    constructor(u) {
      this.value = u, this.value = wa(this.value, nl(I(this.value)));
    }
  }
  s.Number = e;
  class t {
    constructor(u) {
      this.value = u;
    }
  }
  s.String = t;
  class r {
    constructor(u) {
      this.value = u;
    }
  }
  s.Boolean = r;
  class n {
    static getSingletonInstance() {
      return n.instance || (n.instance = new n()), n.instance;
    }
  }
  s.Empty = n;
  class i {
    constructor(u) {
      this.formula = u;
    }
  }
  s.Formula = i;
  class a {
    constructor(u, l) {
      this.value = new f(u, l);
    }
  }
  s.Error = a;
})(te || (te = {}));
function jm(s) {
  return s.startsWith("=");
}
function qm(s) {
  const e = s.toLowerCase();
  return e === "true" || e === "false";
}
function Qm(s, e) {
  const t = s.toUpperCase();
  return /#[A-Za-z0-9\/]+[?!]?/.test(t) && Object.prototype.hasOwnProperty.call(e, t);
}
class Zm {
  constructor(e, t, r) {
    this.config = e, this.dateHelper = t, this.numberLiteralsHelper = r;
  }
  parse(e) {
    if (e == null)
      return te.Empty.getSingletonInstance();
    if (typeof e == "number")
      return rl(e) ? new te.Error(m.NUM, E.ValueLarge) : new te.Number(e);
    if (typeof e == "boolean")
      return new te.Boolean(e);
    if (e instanceof Date) {
      const t = this.dateHelper.dateToNumber({
        day: e.getDate(),
        month: e.getMonth() + 1,
        year: e.getFullYear()
      }), r = Kr({
        hours: e.getHours(),
        minutes: e.getMinutes(),
        seconds: e.getSeconds() + e.getMilliseconds() / 1e3
      }), n = t + r;
      return n < 0 ? new te.Error(m.NUM, E.DateBounds) : n % 1 === 0 ? new te.Number(new _a(n, "Date()")) : n < 1 ? new te.Number(new La(n, "Date()")) : new te.Number(new Fa(n, "Date()"));
    } else if (typeof e == "string") {
      if (qm(e))
        return new te.Boolean(e.toLowerCase() === "true");
      if (jm(e))
        return new te.Formula(e);
      if (Qm(e, this.config.errorMapping))
        return new te.Error(this.config.errorMapping[e.toUpperCase()]);
      {
        let t = e.trim(), r = 0, n;
        if (t.endsWith("%"))
          r = 1, t = t.slice(0, t.length - 1);
        else {
          const o = this.currencyMatcher(t);
          o !== void 0 && (r = 2, [n, t] = o);
        }
        const i = this.numberLiteralsHelper.numericStringToMaybeNumber(t);
        if (i !== void 0) {
          let o;
          return r === 1 ? o = new ds(i / 100) : r === 2 ? o = new Wi(i, n) : o = i, new te.Number(o);
        }
        const a = this.dateHelper.dateStringToDateNumber(t);
        return a !== void 0 ? new te.Number(a) : new te.String(e.startsWith("'") ? e.slice(1) : e);
      }
    } else
      throw new Wh(e);
  }
  currencyMatcher(e) {
    for (const t of this.config.currencySymbol) {
      if (e.startsWith(t))
        return [t, e.slice(t.length)];
      if (e.endsWith(t))
        return [t, e.slice(0, e.length - t.length)];
    }
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var Tr;
(function(s) {
  s[s.COPY = 0] = "COPY", s[s.CUT = 1] = "CUT";
})(Tr || (Tr = {}));
var ve;
(function(s) {
  s[s.VALUE = 0] = "VALUE", s[s.EMPTY = 1] = "EMPTY", s[s.FORMULA = 2] = "FORMULA", s[s.PARSING_ERROR = 3] = "PARSING_ERROR";
})(ve || (ve = {}));
class $o {
  constructor(e, t, r, n, i) {
    this.sourceLeftCorner = e, this.width = t, this.height = r, this.type = n, this.content = i;
  }
  *getContent(e) {
    if (this.content !== void 0)
      for (let t = 0; t < this.height; ++t)
        for (let r = 0; r < this.width; ++r)
          yield [O(e.sheet, e.col + r, e.row + t), this.content[t][r]];
  }
}
class Jm {
  constructor(e, t, r) {
    this.dependencyGraph = t, this.operations = r, this.maxRows = e.maxRows, this.maxColumns = e.maxColumns;
  }
  cut(e, t, r) {
    this.clipboard = new $o(e, t, r, Tr.CUT);
  }
  copy(e, t, r) {
    const n = [];
    for (let i = 0; i < r; ++i) {
      n[i] = [];
      for (let a = 0; a < t; ++a) {
        const o = this.operations.getClipboardCell(O(e.sheet, e.col + a, e.row + i));
        n[i].push(o);
      }
    }
    this.clipboard = new $o(e, t, r, Tr.COPY, n);
  }
  abortCut() {
    this.clipboard && this.clipboard.type === Tr.CUT && this.clear();
  }
  clear() {
    this.clipboard = void 0;
  }
  ensureItIsPossibleToCopyPaste(e) {
    if (this.clipboard === void 0)
      return;
    if (ke(e) || !this.dependencyGraph.sheetMapping.hasSheetWithId(e.sheet))
      throw new fe("a valid target address.");
    const t = F.spanFrom(e, this.clipboard.width, this.clipboard.height);
    if (t.exceedsSheetSizeLimits(this.maxColumns, this.maxRows))
      throw new yr();
    if (this.dependencyGraph.arrayMapping.isFormulaArrayInRange(t))
      throw new Error("It is not possible to paste onto an array");
  }
  isCutClipboard() {
    return this.clipboard !== void 0 && this.clipboard.type === Tr.CUT;
  }
  isCopyClipboard() {
    return this.clipboard !== void 0 && this.clipboard.type === Tr.COPY;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class lr {
  performEagerTransformations(e, t) {
    for (const r of e.arrayFormulaNodes()) {
      const [n, i] = this.transformSingleAst(r.getFormula(e.lazilyTransformingAstService), r.getAddress(e.lazilyTransformingAstService)), a = t.rememberNewAst(n);
      r.setFormula(a), r.setAddress(i);
    }
  }
  transformSingleAst(e, t) {
    const r = this.transformAst(e, t), n = this.fixNodeAddress(t);
    return [r, n];
  }
  transformAst(e, t) {
    switch (e.type) {
      case g.CELL_REFERENCE:
        return this.transformCellReferenceAst(e, t);
      case g.CELL_RANGE:
        return this.transformCellRangeAst(e, t);
      case g.COLUMN_RANGE:
        return this.transformColumnRangeAst(e, t);
      case g.ROW_RANGE:
        return this.transformRowRangeAst(e, t);
      case g.EMPTY:
      case g.ERROR:
      case g.NUMBER:
      case g.NAMED_EXPRESSION:
      case g.ERROR_WITH_RAW_INPUT:
      case g.STRING:
        return e;
      case g.PERCENT_OP:
      case g.MINUS_UNARY_OP:
      case g.PLUS_UNARY_OP:
        return Object.assign(Object.assign({}, e), {
          value: this.transformAst(e.value, t)
        });
      case g.FUNCTION_CALL:
        return Object.assign(Object.assign({}, e), {
          procedureName: e.procedureName,
          args: e.args.map((r) => this.transformAst(r, t))
        });
      case g.PARENTHESIS:
        return Object.assign(Object.assign({}, e), {
          expression: this.transformAst(e.expression, t)
        });
      case g.ARRAY:
        return Object.assign(Object.assign({}, e), {
          args: e.args.map((r) => r.map((n) => this.transformAst(n, t)))
        });
      default:
        return Object.assign(Object.assign({}, e), {
          left: this.transformAst(e.left, t),
          right: this.transformAst(e.right, t)
        });
    }
  }
  transformCellReferenceAst(e, t) {
    const r = this.transformCellAddress(e.reference, t);
    return r instanceof j ? Object.assign(Object.assign({}, e), {
      reference: r
    }) : r === m.REF ? wt(new f(m.REF)) : e;
  }
  transformCellRangeAst(e, t) {
    const r = this.transformCellRange(e.start, e.end, t);
    return Array.isArray(r) ? Object.assign(Object.assign({}, e), {
      start: r[0],
      end: r[1]
    }) : r === m.REF ? wt(new f(m.REF)) : e;
  }
  transformColumnRangeAst(e, t) {
    const r = this.transformColumnRange(e.start, e.end, t);
    return Array.isArray(r) ? Object.assign(Object.assign({}, e), {
      start: r[0],
      end: r[1]
    }) : r === m.REF ? wt(new f(m.REF)) : e;
  }
  transformRowRangeAst(e, t) {
    const r = this.transformRowRange(e.start, e.end, t);
    return Array.isArray(r) ? Object.assign(Object.assign({}, e), {
      start: r[0],
      end: r[1]
    }) : r === m.REF ? wt(new f(m.REF)) : e;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class eg extends lr {
  constructor(e) {
    super(), this.columnsSpan = e;
  }
  get sheet() {
    return this.columnsSpan.sheet;
  }
  isIrreversible() {
    return !1;
  }
  transformRowRangeAst(e, t) {
    return e;
  }
  transformCellRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformRowRange(e, t, r) {
    throw Error("Not implemented");
  }
  transformColumnRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformCellAddress(e, t) {
    const r = Tt(e, t);
    if (r !== this.columnsSpan.sheet && t.sheet !== this.columnsSpan.sheet)
      return !1;
    const n = e.toSimpleColumnAddress(t);
    return r === this.columnsSpan.sheet && t.sheet !== this.columnsSpan.sheet ? this.columnsSpan.columnStart <= n.col ? e.shiftedByColumns(this.columnsSpan.numberOfColumns) : !1 : t.sheet === this.columnsSpan.sheet && r !== this.columnsSpan.sheet ? e.isColumnAbsolute() || t.col < this.columnsSpan.columnStart ? !1 : e.shiftedByColumns(-this.columnsSpan.numberOfColumns) : e.isColumnAbsolute() ? e.col < this.columnsSpan.columnStart ? !1 : e.shiftedByColumns(this.columnsSpan.numberOfColumns) : e.toSimpleColumnAddress(t).col < this.columnsSpan.columnStart ? t.col < this.columnsSpan.columnStart ? !1 : e.shiftedByColumns(-this.columnsSpan.numberOfColumns) : t.col < this.columnsSpan.columnStart ? e.shiftedByColumns(this.columnsSpan.numberOfColumns) : !1;
  }
  fixNodeAddress(e) {
    return this.columnsSpan.sheet === e.sheet && this.columnsSpan.columnStart <= e.col ? Object.assign(Object.assign({}, e), {
      col: e.col + this.columnsSpan.numberOfColumns
    }) : e;
  }
  transformRange(e, t, r) {
    const n = this.transformCellAddress(e, r), i = this.transformCellAddress(t, r);
    return n === m.REF || i === m.REF ? m.REF : n || i ? [n || e, i || t] : !1;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ji extends lr {
  constructor(e) {
    super(), this.rowsSpan = e;
  }
  get sheet() {
    return this.rowsSpan.sheet;
  }
  isIrreversible() {
    return !1;
  }
  transformColumnRangeAst(e, t) {
    return e;
  }
  transformCellRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformRowRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformColumnRange(e, t, r) {
    throw Error("Not implemented");
  }
  transformCellAddress(e, t) {
    const r = Tt(e, t);
    if (r !== this.rowsSpan.sheet && t.sheet !== this.rowsSpan.sheet)
      return !1;
    const n = e.toSimpleRowAddress(t);
    return r === this.rowsSpan.sheet && t.sheet !== this.rowsSpan.sheet ? this.rowsSpan.rowStart <= n.row ? e.shiftedByRows(this.rowsSpan.numberOfRows) : !1 : t.sheet === this.rowsSpan.sheet && r !== this.rowsSpan.sheet ? e.isRowAbsolute() || t.row < this.rowsSpan.rowStart ? !1 : e.shiftedByRows(-this.rowsSpan.numberOfRows) : e.isRowAbsolute() ? e.row < this.rowsSpan.rowStart ? !1 : e.shiftedByRows(this.rowsSpan.numberOfRows) : n.row < this.rowsSpan.rowStart ? t.row < this.rowsSpan.rowStart ? !1 : e.shiftedByRows(-this.rowsSpan.numberOfRows) : t.row < this.rowsSpan.rowStart ? e.shiftedByRows(this.rowsSpan.numberOfRows) : !1;
  }
  fixNodeAddress(e) {
    return this.rowsSpan.sheet === e.sheet && this.rowsSpan.rowStart <= e.row ? Object.assign(Object.assign({}, e), {
      row: e.row + this.rowsSpan.numberOfRows
    }) : e;
  }
  transformRange(e, t, r) {
    const n = this.transformCellAddress(e, r), i = this.transformCellAddress(t, r);
    return n === m.REF || i === m.REF ? m.REF : n || i ? [n || e, i || t] : !1;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class tg extends lr {
  constructor(e) {
    super(), this.sheet = e;
  }
  isIrreversible() {
    return !0;
  }
  fixNodeAddress(e) {
    return e;
  }
  transformCellAddress(e, t) {
    return e.isInvalid(t) ? m.REF : !1;
  }
  transformCellRange(e, t, r) {
    return e.isInvalid(r) || t.isInvalid(r) ? m.REF : !1;
  }
  transformColumnRange(e, t, r) {
    return e.isInvalid(r) || t.isInvalid(r) ? m.REF : !1;
  }
  transformRowRange(e, t, r) {
    return e.isInvalid(r) || t.isInvalid(r) ? m.REF : !1;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class rg extends lr {
  constructor(e, t, r, n) {
    super(), this.sourceRange = e, this.toRight = t, this.toBottom = r, this.toSheet = n, this.dependentFormulaTransformer = new ng(e, t, r, n);
  }
  get sheet() {
    return this.sourceRange.sheet;
  }
  isIrreversible() {
    return !0;
  }
  transformSingleAst(e, t) {
    return this.sourceRange.addressInRange(t) ? [this.transformAst(e, t), this.fixNodeAddress(t)] : this.dependentFormulaTransformer.transformSingleAst(e, t);
  }
  fixNodeAddress(e) {
    return O(this.toSheet, e.col + this.toRight, e.row + this.toBottom);
  }
  transformCellAddress(e, t) {
    return this.transformAddress(e, t);
  }
  transformCellRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformColumnRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformRowRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformAddress(e, t) {
    const r = this.sourceRange;
    if (e instanceof j) {
      const n = e.toSimpleCellAddress(t);
      if (r.addressInRange(n))
        return e.shiftAbsoluteDimensions(this.toRight, this.toBottom);
    }
    return e.shiftRelativeDimensions(-this.toRight, -this.toBottom);
  }
  transformRange(e, t, r) {
    const n = this.sourceRange;
    if (e instanceof j && t instanceof j) {
      const i = e.toSimpleCellAddress(r), a = t.toSimpleCellAddress(r);
      if (n.addressInRange(i) && n.addressInRange(a))
        return [e.shiftAbsoluteDimensions(this.toRight, this.toBottom), t.shiftAbsoluteDimensions(this.toRight, this.toBottom)];
    }
    return [e.shiftRelativeDimensions(-this.toRight, -this.toBottom), t.shiftRelativeDimensions(-this.toRight, -this.toBottom)];
  }
}
class ng extends lr {
  constructor(e, t, r, n) {
    super(), this.sourceRange = e, this.toRight = t, this.toBottom = r, this.toSheet = n;
  }
  get sheet() {
    return this.sourceRange.sheet;
  }
  isIrreversible() {
    return !0;
  }
  fixNodeAddress(e) {
    return e;
  }
  transformCellAddress(e, t) {
    return this.shouldMove(e, t) ? e.moved(this.toSheet, this.toRight, this.toBottom) : !1;
  }
  transformCellRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformColumnRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformRowRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  shouldMove(e, t) {
    return e instanceof j ? this.sourceRange.addressInRange(e.toSimpleCellAddress(t)) : e instanceof Le ? this.sourceRange.rowInRange(e.toSimpleRowAddress(t)) && !this.sourceRange.isFinite() : this.sourceRange.columnInRange(e.toSimpleColumnAddress(t)) && !this.sourceRange.isFinite();
  }
  transformRange(e, t, r) {
    const n = this.transformCellAddress(e, r), i = this.transformCellAddress(t, r);
    return n && i ? [n, i] : !1;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class sg extends lr {
  constructor(e) {
    super(), this.columnsSpan = e;
  }
  get sheet() {
    return this.columnsSpan.sheet;
  }
  isIrreversible() {
    return !0;
  }
  transformRowRangeAst(e, t) {
    return e;
  }
  transformCellRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformRowRange(e, t, r) {
    throw Error("Not implemented");
  }
  transformColumnRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformCellAddress(e, t) {
    const r = Tt(e, t);
    if (this.columnsSpan.sheet !== t.sheet && this.columnsSpan.sheet !== r)
      return !1;
    if (this.columnsSpan.sheet !== t.sheet && this.columnsSpan.sheet === r) {
      const n = e.toSimpleColumnAddress(t);
      if (n.col < this.columnsSpan.columnStart)
        return !1;
      if (n.col > this.columnsSpan.columnEnd)
        return e.shiftedByColumns(-this.columnsSpan.numberOfColumns);
    }
    if (this.columnsSpan.sheet === t.sheet && this.columnsSpan.sheet !== r) {
      if (e.isColumnAbsolute())
        return !1;
      if (t.col < this.columnsSpan.columnStart)
        return !1;
      if (t.col > this.columnsSpan.columnEnd)
        return e.shiftedByColumns(this.columnsSpan.numberOfColumns);
    }
    if (this.columnsSpan.sheet === t.sheet && this.columnsSpan.sheet === r)
      if (e.isColumnAbsolute()) {
        if (e.col < this.columnsSpan.columnStart)
          return !1;
        if (e.col > this.columnsSpan.columnEnd)
          return e.shiftedByColumns(-this.columnsSpan.numberOfColumns);
      } else {
        const n = e.toSimpleColumnAddress(t);
        if (n.col < this.columnsSpan.columnStart) {
          if (t.col < this.columnsSpan.columnStart)
            return !1;
          if (t.col > this.columnsSpan.columnEnd)
            return e.shiftedByColumns(this.columnsSpan.numberOfColumns);
        } else if (n.col > this.columnsSpan.columnEnd) {
          if (t.col < this.columnsSpan.columnStart)
            return e.shiftedByColumns(-this.columnsSpan.numberOfColumns);
          if (t.col > this.columnsSpan.columnEnd)
            return !1;
        }
      }
    return m.REF;
  }
  fixNodeAddress(e) {
    return this.columnsSpan.sheet === e.sheet && this.columnsSpan.columnStart <= e.col ? Object.assign(Object.assign({}, e), {
      col: e.col - this.columnsSpan.numberOfColumns
    }) : e;
  }
  transformRange(e, t, r) {
    const n = Tt(e, r);
    let i = e, a = t;
    if (this.columnsSpan.sheet === n) {
      const l = e.toSimpleColumnAddress(r), c = t.toSimpleColumnAddress(r);
      if (this.columnsSpan.columnStart <= l.col && this.columnsSpan.columnEnd >= c.col)
        return m.REF;
      l.col >= this.columnsSpan.columnStart && l.col <= this.columnsSpan.columnEnd && (i = e.shiftedByColumns(this.columnsSpan.columnEnd - l.col + 1)), c.col >= this.columnsSpan.columnStart && c.col <= this.columnsSpan.columnEnd && (a = t.shiftedByColumns(-(c.col - this.columnsSpan.columnStart + 1)));
    }
    const o = this.transformCellAddress(i, r), u = this.transformCellAddress(a, r);
    if (o === !1 && u === !1)
      return [i, a];
    if (o === m.REF || u === m.REF)
      throw Error("Cannot happen");
    return [o || i, u || a];
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ea extends lr {
  constructor(e) {
    super(), this.rowsSpan = e;
  }
  get sheet() {
    return this.rowsSpan.sheet;
  }
  isIrreversible() {
    return !0;
  }
  transformColumnRangeAst(e, t) {
    return e;
  }
  transformCellAddress(e, t) {
    const r = Tt(e, t);
    if (this.rowsSpan.sheet !== t.sheet && this.rowsSpan.sheet !== r)
      return !1;
    if (this.rowsSpan.sheet !== t.sheet && this.rowsSpan.sheet === r) {
      const n = e.toSimpleRowAddress(t);
      if (n.row < this.rowsSpan.rowStart)
        return !1;
      if (n.row > this.rowsSpan.rowEnd)
        return e.shiftedByRows(-this.rowsSpan.numberOfRows);
    }
    if (this.rowsSpan.sheet === t.sheet && this.rowsSpan.sheet !== r) {
      if (e.isRowAbsolute())
        return !1;
      if (t.row < this.rowsSpan.rowStart)
        return !1;
      if (t.row > this.rowsSpan.rowEnd)
        return e.shiftedByRows(this.rowsSpan.numberOfRows);
    }
    if (this.rowsSpan.sheet === t.sheet && this.rowsSpan.sheet === r)
      if (e.isRowAbsolute()) {
        if (e.row < this.rowsSpan.rowStart)
          return !1;
        if (e.row > this.rowsSpan.rowEnd)
          return e.shiftedByRows(-this.rowsSpan.numberOfRows);
      } else {
        const n = e.toSimpleRowAddress(t);
        if (n.row < this.rowsSpan.rowStart) {
          if (t.row < this.rowsSpan.rowStart)
            return !1;
          if (t.row > this.rowsSpan.rowEnd)
            return e.shiftedByRows(this.rowsSpan.numberOfRows);
        } else if (n.row > this.rowsSpan.rowEnd) {
          if (t.row < this.rowsSpan.rowStart)
            return e.shiftedByRows(-this.rowsSpan.numberOfRows);
          if (t.row > this.rowsSpan.rowEnd)
            return !1;
        }
      }
    return m.REF;
  }
  transformCellRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformRowRange(e, t, r) {
    return this.transformRange(e, t, r);
  }
  transformColumnRange(e, t, r) {
    throw Error("Not implemented");
  }
  fixNodeAddress(e) {
    return this.rowsSpan.sheet === e.sheet && this.rowsSpan.rowStart <= e.row ? Object.assign(Object.assign({}, e), {
      row: e.row - this.rowsSpan.numberOfRows
    }) : e;
  }
  transformRange(e, t, r) {
    const n = Tt(e, r);
    let i = e, a = t;
    if (this.rowsSpan.sheet === n) {
      const l = e.toSimpleRowAddress(r), c = t.toSimpleRowAddress(r);
      if (this.rowsSpan.rowStart <= l.row && this.rowsSpan.rowEnd >= c.row)
        return m.REF;
      l.row >= this.rowsSpan.rowStart && l.row <= this.rowsSpan.rowEnd && (i = e.shiftedByRows(this.rowsSpan.rowEnd - l.row + 1)), c.row >= this.rowsSpan.rowStart && c.row <= this.rowsSpan.rowEnd && (a = t.shiftedByRows(-(c.row - this.rowsSpan.rowStart + 1)));
    }
    const o = this.transformCellAddress(i, r), u = this.transformCellAddress(a, r);
    return o === !1 && u === !1 ? [i, a] : o === m.REF || u === m.REF ? m.REF : [o || i, u || a];
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ig extends lr {
  constructor(e, t) {
    super(), this.sheetIdToKeep = e, this.sheetBeingMerged = t;
  }
  /**
   * Returns id of sheet that survives merge operation.
   *
   * @returns {number} sheet identifier.
   */
  get sheet() {
    return this.sheetIdToKeep;
  }
  /**
   * Sheet merge cannot be undone because original sheet id is lost.
   *
   * @returns {boolean} always true to indicate transformation irreversibility.
   */
  isIrreversible() {
    return !0;
  }
  /**
   * Updates cell address sheet when it points to merged sheet.
   *
   * @param {T} dependencyAddress - dependency address needing sheet update.
   * @param {SimpleCellAddress} _formulaAddress - location of formula (unused but required by base class).
   * @returns {T | false} updated address or false when nothing changes.
   */
  transformCellAddress(e, t) {
    return this.updateSheetInAddress(e);
  }
  /**
   * Updates sheet for both ends of cell range.
   *
   * @param {CellAddress} start - start address of range.
   * @param {CellAddress} end - end address of range.
   * @param {SimpleCellAddress} _formulaAddress - formula location (unused).
   * @returns {[CellAddress, CellAddress] | false} updated range tuple or false when unchanged.
   */
  transformCellRange(e, t, r) {
    return this.transformRange(e, t);
  }
  /**
   * Updates sheet for both ends of column range.
   *
   * @param {ColumnAddress} start - beginning column of range.
   * @param {ColumnAddress} end - ending column of range.
   * @param {SimpleCellAddress} _formulaAddress - formula location (unused).
   * @returns {[ColumnAddress, ColumnAddress] | false} updated column range or false.
   */
  transformColumnRange(e, t, r) {
    return this.transformRange(e, t);
  }
  /**
   * Updates sheet for both ends of row range.
   *
   * @param {RowAddress} start - beginning row address.
   * @param {RowAddress} end - ending row address.
   * @param {SimpleCellAddress} _formulaAddress - formula location (unused).
   * @returns {[RowAddress, RowAddress] | false} updated row range or false.
   */
  transformRowRange(e, t, r) {
    return this.transformRange(e, t);
  }
  /**
   * Node addresses are already absolute, so no change is needed.
   *
   * @param {SimpleCellAddress} address - node address to inspect.
   * @returns {SimpleCellAddress} original address unchanged.
   */
  fixNodeAddress(e) {
    return e;
  }
  /**
   * Updates sheet identifier for both range ends if needed.
   *
   * @param {T} start - range start address.
   * @param {T} end - range end address.
   * @returns {[T, T] | false} tuple with updated addresses or false when no updates happen.
   */
  transformRange(e, t) {
    const r = this.updateSheetInAddress(e), n = this.updateSheetInAddress(t);
    return r || n ? [r || e, n || t] : !1;
  }
  /**
   * Replaces sheet id in address when it points to merged sheet.
   *
   * @param {T} address - address to update.
   * @returns {T | false} address with new sheet id or false when no change occurs.
   */
  updateSheetInAddress(e) {
    return e.sheet === this.sheetBeingMerged ? e.withSheet(this.sheetIdToKeep) : !1;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class dl {
  constructor(e, t) {
    this.sheet = e, this.indexes = t;
  }
  normalizedIndexes() {
    return Gs(this.indexes);
  }
  rowsSpans() {
    return this.normalizedIndexes().map((e) => Ge.fromNumberOfRows(this.sheet, e[0], e[1]));
  }
}
class fl {
  constructor(e, t) {
    this.sheet = e, this.indexes = t;
  }
  normalizedIndexes() {
    return Hs(this.indexes);
  }
  rowsSpans() {
    return this.normalizedIndexes().map((e) => Ge.fromNumberOfRows(this.sheet, e[0], e[1]));
  }
}
class pl {
  constructor(e, t) {
    this.sheet = e, this.indexes = t;
  }
  normalizedIndexes() {
    return Hs(this.indexes);
  }
  columnsSpans() {
    return this.normalizedIndexes().map((e) => qe.fromNumberOfColumns(this.sheet, e[0], e[1]));
  }
}
class ml {
  constructor(e, t) {
    this.sheet = e, this.indexes = t;
  }
  normalizedIndexes() {
    return Gs(this.indexes);
  }
  columnsSpans() {
    return this.normalizedIndexes().map((e) => qe.fromNumberOfColumns(this.sheet, e[0], e[1]));
  }
}
class ag {
  constructor(e, t, r, n, i, a, o, u, l) {
    this.dependencyGraph = t, this.columnSearch = r, this.cellContentParser = n, this.parser = i, this.stats = a, this.lazilyTransformingAstService = o, this.namedExpressions = u, this.arraySizePredictor = l, this.changes = nr.empty(), this.allocateNamedExpressionAddressSpace(), this.maxColumns = e.maxColumns, this.maxRows = e.maxRows;
  }
  get sheetMapping() {
    return this.dependencyGraph.sheetMapping;
  }
  get addressMapping() {
    return this.dependencyGraph.addressMapping;
  }
  removeRows(e) {
    const t = [];
    for (const r of e.rowsSpans()) {
      const n = this.doRemoveRows(r);
      n && t.push(n);
    }
    return t;
  }
  addRows(e) {
    for (const t of e.rowsSpans())
      this.doAddRows(t);
  }
  addColumns(e) {
    for (const t of e.columnsSpans())
      this.doAddColumns(t);
  }
  removeColumns(e) {
    const t = [];
    for (const r of e.columnsSpans()) {
      const n = this.doRemoveColumns(r);
      n && t.push(n);
    }
    return t;
  }
  /**
   * Clears the sheet content.
   */
  clearSheet(e) {
    this.dependencyGraph.clearSheet(e), this.columnSearch.removeSheet(e);
  }
  /**
   * Adds a new sheet to the workbook.
   */
  addSheet(e) {
    const t = this.sheetMapping.addSheet(e);
    return this.dependencyGraph.addSheet(t), {
      sheetName: this.sheetMapping.getSheetNameOrThrowError(t),
      sheetId: t
    };
  }
  /**
   * Adds a sheet with a specific ID for redo operations.
   */
  addSheetWithId(e, t) {
    this.sheetMapping.addSheetWithId(e, t), this.dependencyGraph.addSheet(e);
  }
  /**
   * Adds a placeholder sheet with a specific ID for undo operations.
   * Used to restore previously merged placeholder sheets.
   *
   * Note: Unlike `addSheetWithId`, this does NOT call `dependencyGraph.addSheet()`
   * because placeholders don't need dirty marking or strategy changes - they only
   * need to exist in the mappings so formulas can reference them again.
   */
  addPlaceholderSheetWithId(e, t) {
    this.sheetMapping.addPlaceholderWithId(e, t), this.addressMapping.addSheetStrategyPlaceholderIfNotExists(e);
  }
  /**
   * Removes a sheet from the workbook.
   */
  removeSheet(e) {
    return this.dependencyGraph.removeSheet(e), this.columnSearch.removeSheet(e), this.namedExpressions.getAllNamedExpressionsForScope(e).map((r) => this.removeNamedExpression(r.normalizeExpressionName(), e));
  }
  /**
   * Removes a sheet from the workbook by name.
   */
  removeSheetByName(e) {
    const t = this.sheetMapping.getSheetIdOrThrowError(e);
    return this.removeSheet(t);
  }
  /**
   * Renames a sheet in the workbook.
   */
  renameSheet(e, t) {
    const {
      previousDisplayName: r,
      mergedWithPlaceholderSheet: n
    } = this.sheetMapping.renameSheet(e, t);
    let i;
    return n !== void 0 && (this.dependencyGraph.mergeSheets(e, n), this.stats.measure(P.TRANSFORM_ASTS, () => {
      const a = new ig(e, n);
      a.performEagerTransformations(this.dependencyGraph, this.parser), i = this.lazilyTransformingAstService.addTransformation(a);
    })), {
      previousDisplayName: r,
      version: i,
      mergedPlaceholderSheetId: n
    };
  }
  moveRows(e, t, r, n) {
    const i = Ge.fromNumberOfRows(e, n, r);
    this.lazilyTransformingAstService.beginCombinedMode(e), this.doAddRows(i), n < t && (t += r);
    const a = O(e, 0, t), o = O(e, 0, n);
    this.moveCells(a, Number.POSITIVE_INFINITY, r, o);
    const u = Ge.fromNumberOfRows(e, t, r);
    return this.doRemoveRows(u), this.lazilyTransformingAstService.commitCombinedMode();
  }
  moveColumns(e, t, r, n) {
    const i = qe.fromNumberOfColumns(e, n, r);
    this.lazilyTransformingAstService.beginCombinedMode(e), this.doAddColumns(i), n < t && (t += r);
    const a = O(e, t, 0), o = O(e, n, 0);
    this.moveCells(a, r, Number.POSITIVE_INFINITY, o);
    const u = qe.fromNumberOfColumns(e, t, r);
    return this.doRemoveColumns(u), this.lazilyTransformingAstService.commitCombinedMode();
  }
  moveCells(e, t, r, n) {
    this.ensureItIsPossibleToMoveCells(e, t, r, n);
    const i = F.spanFrom(e, t, r), a = F.spanFrom(n, t, r), o = n.col - e.col, u = n.row - e.row, l = n.sheet, c = this.getRangeClipboardCells(a), d = this.dependencyGraph.rawValuesFromRange(a);
    this.columnSearch.removeValues(d);
    const p = this.dependencyGraph.rawValuesFromRange(i);
    this.columnSearch.moveValues(p, o, u, l);
    let N = 0;
    this.stats.measure(P.TRANSFORM_ASTS, () => {
      const R = new rg(i, o, u, l);
      R.performEagerTransformations(this.dependencyGraph, this.parser), N = this.lazilyTransformingAstService.addTransformation(R);
    }), this.dependencyGraph.moveCells(i, o, u, l);
    const T = this.updateNamedExpressionsForMovedCells(e, t, r, n);
    return {
      version: N,
      overwrittenCellsData: c,
      addedGlobalNamedExpressions: T
    };
  }
  setRowOrder(e, t) {
    const r = [];
    let n = [];
    for (const [i, a] of t)
      if (i !== a) {
        const o = F.spanFrom({
          sheet: e,
          col: 0,
          row: i
        }, 1 / 0, 1), u = this.getRangeClipboardCells(o);
        n = n.concat(u), r.push(u.map(([{
          sheet: l,
          col: c
        }, d]) => [{
          sheet: l,
          col: c,
          row: a
        }, d]));
      }
    return r.forEach((i) => this.restoreClipboardCells(e, i.values())), n;
  }
  setColumnOrder(e, t) {
    const r = [];
    let n = [];
    for (const [i, a] of t)
      if (i !== a) {
        const o = F.spanFrom({
          sheet: e,
          col: i,
          row: 0
        }, 1, 1 / 0), u = this.getRangeClipboardCells(o);
        n = n.concat(u), r.push(u.map(([{
          sheet: l,
          col: c,
          row: d
        }, p]) => [{
          sheet: l,
          col: a,
          row: d
        }, p]));
      }
    return r.forEach((i) => this.restoreClipboardCells(e, i.values())), n;
  }
  addNamedExpression(e, t, r, n) {
    const i = this.namedExpressions.addNamedExpression(e, r, n);
    this.storeNamedExpressionInCell(i.address, t), this.adjustNamedExpressionEdges(i, e, r);
  }
  restoreNamedExpression(e, t, r) {
    const n = e.displayName;
    this.restoreCell(e.address, t);
    const i = this.namedExpressions.restoreNamedExpression(e, r);
    this.adjustNamedExpressionEdges(i, n, r);
  }
  changeNamedExpressionExpression(e, t, r, n) {
    const i = this.namedExpressions.namedExpressionForScope(e, r);
    if (!i)
      throw new Cn(e);
    const a = i.copy();
    i.options = n;
    const o = this.getClipboardCell(i.address);
    return this.storeNamedExpressionInCell(i.address, t), [a, o];
  }
  removeNamedExpression(e, t) {
    const r = this.namedExpressions.namedExpressionForScope(e, t);
    if (!r)
      throw new Cn(e);
    this.namedExpressions.remove(r.displayName, t);
    const n = this.getClipboardCell(r.address);
    if (t !== void 0) {
      const i = this.namedExpressions.workbookNamedExpressionOrPlaceholder(e);
      this.dependencyGraph.exchangeNode(r.address, i.address);
    } else
      this.dependencyGraph.setCellEmpty(r.address);
    return [r, n];
  }
  ensureItIsPossibleToMoveCells(e, t, r, n) {
    if (ke(e) || !(Ws(t) && Ws(r) || og(e, t, r)) || ke(n) || !this.sheetMapping.hasSheetWithId(e.sheet) || !this.sheetMapping.hasSheetWithId(n.sheet))
      throw new fe("a valid range of cells to move.");
    const i = F.spanFrom(e, t, r), a = F.spanFrom(n, t, r);
    if (a.exceedsSheetSizeLimits(this.maxColumns, this.maxRows))
      throw new yr();
    if (this.dependencyGraph.arrayMapping.isFormulaArrayInRange(i))
      throw new Hr();
    if (this.dependencyGraph.arrayMapping.isFormulaArrayInRange(a))
      throw new xs();
  }
  restoreClipboardCells(e, t) {
    const r = [];
    for (const [n, i] of t)
      if (this.restoreCell(n, i), i.type === ve.FORMULA) {
        const {
          dependencies: a
        } = this.parser.fetchCachedResult(i.hash);
        r.push(...this.updateNamedExpressionsForTargetAddress(e, n, a));
      }
    return r;
  }
  /**
   * Restores a single cell.
   */
  restoreCell(e, t) {
    switch (t.type) {
      case ve.VALUE: {
        this.setValueToCell(t, e);
        break;
      }
      case ve.FORMULA: {
        this.setFormulaToCellFromCache(t.hash, e);
        break;
      }
      case ve.EMPTY: {
        this.setCellEmpty(e);
        break;
      }
      case ve.PARSING_ERROR: {
        this.setParsingErrorToCell(t.rawInput, t.errors, e);
        break;
      }
    }
  }
  getOldContent(e) {
    const t = this.dependencyGraph.getCell(e);
    if (t === void 0 || t instanceof er)
      return [e, {
        type: ve.EMPTY
      }];
    if (t instanceof sr)
      return [e, Object.assign({
        type: ve.VALUE
      }, t.getValues())];
    if (t instanceof be)
      return [t.getAddress(this.lazilyTransformingAstService), {
        type: ve.FORMULA,
        hash: this.parser.computeHashFromAst(t.getFormula(this.lazilyTransformingAstService))
      }];
    if (t instanceof Xr)
      return [e, {
        type: ve.PARSING_ERROR,
        rawInput: t.rawInput,
        errors: t.errors
      }];
    throw Error("Trying to copy unsupported type");
  }
  getClipboardCell(e) {
    const t = this.dependencyGraph.getCell(e);
    if (t === void 0 || t instanceof er)
      return {
        type: ve.EMPTY
      };
    if (t instanceof sr)
      return Object.assign({
        type: ve.VALUE
      }, t.getValues());
    if (t instanceof le) {
      const r = t.getArrayCellValue(e);
      return r === B ? {
        type: ve.EMPTY
      } : {
        type: ve.VALUE,
        parsedValue: r,
        rawValue: t.getArrayCellRawValue(e)
      };
    } else {
      if (t instanceof Lt)
        return {
          type: ve.FORMULA,
          hash: this.parser.computeHashFromAst(t.getFormula(this.lazilyTransformingAstService))
        };
      if (t instanceof Xr)
        return {
          type: ve.PARSING_ERROR,
          rawInput: t.rawInput,
          errors: t.errors
        };
    }
    throw Error("Trying to copy unsupported type");
  }
  getSheetClipboardCells(e) {
    const t = this.dependencyGraph.getSheetHeight(e), r = this.dependencyGraph.getSheetWidth(e), n = new Array(t);
    for (let i = 0; i < t; i++) {
      n[i] = new Array(r);
      for (let a = 0; a < r; a++) {
        const o = O(e, a, i);
        n[i][a] = this.getClipboardCell(o);
      }
    }
    return n;
  }
  getRangeClipboardCells(e) {
    const t = [];
    for (const r of e.addresses(this.dependencyGraph))
      t.push([r, this.getClipboardCell(r)]);
    return t;
  }
  setCellContent(e, t) {
    const r = this.cellContentParser.parse(t), n = this.getOldContent(e);
    if (r instanceof te.Formula) {
      const i = this.parser.parse(r.formula, e), {
        ast: a,
        errors: o
      } = i;
      if (o.length > 0)
        this.setParsingErrorToCell(r.formula, o, e);
      else
        try {
          const u = this.arraySizePredictor.checkArraySize(a, e);
          if (u.width <= 0 || u.height <= 0)
            throw Error("Incorrect array size");
          this.setFormulaToCell(e, u, i);
        } catch (u) {
          if (!u.message)
            throw u;
          const l = {
            type: ae.InvalidRangeSize,
            message: "Invalid range size."
          };
          this.setParsingErrorToCell(r.formula, [l], e);
        }
    } else r instanceof te.Empty ? this.setCellEmpty(e) : this.setValueToCell({
      parsedValue: r.value,
      rawValue: t
    }, e);
    return n;
  }
  setSheetContent(e, t) {
    this.clearSheet(e);
    for (let r = 0; r < t.length; r++)
      for (let n = 0; n < t[r].length; n++) {
        const i = O(e, n, r);
        this.setCellContent(i, t[r][n]);
      }
  }
  /**
   * Sets cell content to an instance of parsing error.
   * Creates a ParsingErrorVertex and updates the dependency graph and column search index.
   */
  setParsingErrorToCell(e, t, r) {
    this.removeCellValueFromColumnSearch(r);
    const n = new Xr(t, e), i = this.dependencyGraph.setParsingErrorToCell(r, n);
    this.columnSearch.applyChanges(i.getChanges()), this.changes.addAll(i), this.changes.addChange(n.getCellValue(), r);
  }
  /**
   * Sets cell content to a formula.
   * Creates a ScalarFormulaVertex and updates the dependency graph and column search index.
   */
  setFormulaToCell(e, t, {
    ast: r,
    hasVolatileFunction: n,
    hasStructuralChangeFunction: i,
    dependencies: a
  }) {
    this.removeCellValueFromColumnSearch(e);
    const o = this.dependencyGraph.setFormulaToCell(e, r, _t(a, e), t, n, i);
    this.columnSearch.applyChanges(o.getChanges()), this.changes.addAll(o);
  }
  /**
   * Sets cell content to a value.
   * Creates a ValueCellVertex and updates the dependency graph and column search index.
   */
  setValueToCell(e, t) {
    this.changeCellValueInColumnSearch(t, e.parsedValue);
    const r = this.dependencyGraph.setValueToCell(t, e);
    this.columnSearch.applyChanges(r.getChanges().filter((n) => !On(n.address, t))), this.changes.addAll(r), this.changes.addChange(e.parsedValue, t);
  }
  /**
   * Sets cell content to an empty value.
   * Creates an EmptyCellVertex and updates the dependency graph and column search index.
   */
  setCellEmpty(e) {
    if (this.dependencyGraph.isArrayInternalCell(e))
      return;
    this.removeCellValueFromColumnSearch(e);
    const t = this.dependencyGraph.setCellEmpty(e);
    this.columnSearch.applyChanges(t.getChanges()), this.changes.addAll(t), this.changes.addChange(B, e);
  }
  setFormulaToCellFromCache(e, t) {
    const {
      ast: r,
      hasVolatileFunction: n,
      hasStructuralChangeFunction: i,
      dependencies: a
    } = this.parser.fetchCachedResult(e), o = _t(a, t), [u] = new tg(t.sheet).transformSingleAst(r, t);
    this.parser.rememberNewAst(u);
    const l = Dp(o), c = this.arraySizePredictor.checkArraySize(r, t);
    this.dependencyGraph.setFormulaToCell(t, u, l, c, n, i);
  }
  /**
   * Returns true if row number is outside of given sheet.
   * @param {number} row - row number
   * @param {number} sheet - sheet ID number
   */
  rowEffectivelyNotInSheet(e, t) {
    const r = this.dependencyGraph.addressMapping.getSheetHeight(t);
    return e >= r;
  }
  getAndClearContentChanges() {
    const e = this.changes;
    return this.changes = nr.empty(), e;
  }
  /**
   * Forces all formula vertices and column index entries to apply pending lazy
   * transformations, bringing them up to the current LazilyTransformingAstService version.
   * Called before undo of move operations and before compaction.
   */
  forceApplyPostponedTransformations() {
    this.dependencyGraph.forceApplyPostponedTransformations(), this.columnSearch.forceApplyPostponedTransformations();
  }
  /**
   * Removes multiple rows from sheet. </br>
   * Does nothing if rows are outside of effective sheet size.
   * @param {RowsSpan} rowsToRemove - rows to remove
   */
  doRemoveRows(e) {
    if (this.rowEffectivelyNotInSheet(e.rowStart, e.sheet))
      return;
    const t = [];
    for (const [a] of this.dependencyGraph.entriesFromRowsSpan(e))
      t.push({
        address: a,
        cellType: this.getClipboardCell(a)
      });
    const {
      affectedArrays: r,
      contentChanges: n
    } = this.dependencyGraph.removeRows(e);
    this.columnSearch.applyChanges(n.getChanges());
    let i = 0;
    return this.stats.measure(P.TRANSFORM_ASTS, () => {
      const a = new ea(e);
      a.performEagerTransformations(this.dependencyGraph, this.parser), i = this.lazilyTransformingAstService.addTransformation(a);
    }), this.rewriteAffectedArrays(r), {
      version: i,
      removedCells: t,
      rowFrom: e.rowStart,
      rowCount: e.numberOfRows
    };
  }
  /**
   * Removes multiple columns from sheet. </br>
   * Does nothing if columns are outside of effective sheet size.
   * @param {ColumnsSpan} columnsToRemove - columns to remove
   */
  doRemoveColumns(e) {
    if (this.columnEffectivelyNotInSheet(e.columnStart, e.sheet))
      return;
    const t = [];
    for (const [a] of this.dependencyGraph.entriesFromColumnsSpan(e))
      t.push({
        address: a,
        cellType: this.getClipboardCell(a)
      });
    const {
      affectedArrays: r,
      contentChanges: n
    } = this.dependencyGraph.removeColumns(e);
    this.columnSearch.applyChanges(n.getChanges()), this.columnSearch.removeColumns(e);
    let i = 0;
    return this.stats.measure(P.TRANSFORM_ASTS, () => {
      const a = new sg(e);
      a.performEagerTransformations(this.dependencyGraph, this.parser), i = this.lazilyTransformingAstService.addTransformation(a);
    }), this.rewriteAffectedArrays(r), {
      version: i,
      removedCells: t,
      columnFrom: e.columnStart,
      columnCount: e.numberOfColumns
    };
  }
  /**
   * Add multiple rows to sheet. </br>
   * Does nothing if rows are outside of effective sheet size.
   * @param {RowsSpan} addedRows - rows to add
   */
  doAddRows(e) {
    if (this.rowEffectivelyNotInSheet(e.rowStart, e.sheet))
      return;
    const {
      affectedArrays: t
    } = this.dependencyGraph.addRows(e);
    this.stats.measure(P.TRANSFORM_ASTS, () => {
      const r = new Ji(e);
      r.performEagerTransformations(this.dependencyGraph, this.parser), this.lazilyTransformingAstService.addTransformation(r);
    }), this.rewriteAffectedArrays(t);
  }
  rewriteAffectedArrays(e) {
    for (const t of e.values()) {
      if (t.array.size.isRef)
        continue;
      const r = t.getFormula(this.lazilyTransformingAstService), n = t.getAddress(this.lazilyTransformingAstService), i = this.parser.computeHashFromAst(r);
      this.setFormulaToCellFromCache(i, n);
    }
  }
  /**
   * Add multiple columns to sheet </br>
   * Does nothing if columns are outside of effective sheet size
   * @param {ColumnsSpan} addedColumns - object containing information about columns to add
   */
  doAddColumns(e) {
    if (this.columnEffectivelyNotInSheet(e.columnStart, e.sheet))
      return;
    const {
      affectedArrays: t,
      contentChanges: r
    } = this.dependencyGraph.addColumns(e);
    this.columnSearch.addColumns(e), this.columnSearch.applyChanges(r.getChanges()), this.stats.measure(P.TRANSFORM_ASTS, () => {
      const n = new eg(e);
      n.performEagerTransformations(this.dependencyGraph, this.parser), this.lazilyTransformingAstService.addTransformation(n);
    }), this.rewriteAffectedArrays(t);
  }
  /**
   * Returns true if row number is outside of given sheet.
   * @param {number} column - row number
   * @param {number} sheet - sheet ID number
   */
  columnEffectivelyNotInSheet(e, t) {
    const r = this.dependencyGraph.addressMapping.getSheetWidth(t);
    return e >= r;
  }
  adjustNamedExpressionEdges(e, t, r) {
    if (r === void 0)
      return;
    const {
      vertex: n,
      id: i
    } = this.dependencyGraph.fetchCellOrCreateEmpty(e.address), a = i != null ? i : n.idInGraph, o = this.namedExpressions.workbookNamedExpressionOrPlaceholder(t), {
      vertex: u,
      id: l
    } = this.dependencyGraph.fetchCellOrCreateEmpty(o.address), c = l != null ? l : u.idInGraph;
    for (const d of this.dependencyGraph.graph.adjacentNodes(u))
      if (d instanceof Lt && d.getAddress(this.lazilyTransformingAstService).sheet === r) {
        const p = d.getFormula(this.lazilyTransformingAstService), N = d.getAddress(this.lazilyTransformingAstService), {
          dependencies: T
        } = this.parser.fetchCachedResultForAst(p);
        for (const R of _t(T, N))
          R instanceof Ht && R.name.toLowerCase() === e.displayName.toLowerCase() && (this.dependencyGraph.graph.removeEdgeIfExists(c, d), this.dependencyGraph.graph.addEdge(a, d));
      }
  }
  storeNamedExpressionInCell(e, t) {
    const r = this.cellContentParser.parse(t);
    if (r instanceof te.Formula) {
      const n = this.parser.parse(r.formula, O(-1, 0, 0));
      if (Qt(n.ast))
        throw new Ua();
      const {
        ast: i,
        hasVolatileFunction: a,
        hasStructuralChangeFunction: o,
        dependencies: u
      } = n;
      this.dependencyGraph.setFormulaToCell(e, i, _t(u, e), b.scalar(), a, o);
    } else r instanceof te.Empty ? this.setCellEmpty(e) : this.setValueToCell({
      parsedValue: r.value,
      rawValue: t
    }, e);
  }
  updateNamedExpressionsForMovedCells(e, t, r, n) {
    if (e.sheet === n.sheet)
      return [];
    const i = [], a = F.spanFrom(n, t, r);
    for (const o of a.addresses(this.dependencyGraph)) {
      const u = this.addressMapping.getCell(o, {
        throwIfCellNotExists: !0
      });
      if (u instanceof Lt && o.sheet !== e.sheet) {
        const l = u.getFormula(this.lazilyTransformingAstService), {
          dependencies: c
        } = this.parser.fetchCachedResultForAst(l);
        i.push(...this.updateNamedExpressionsForTargetAddress(e.sheet, o, c));
      }
    }
    return i;
  }
  updateNamedExpressionsForTargetAddress(e, t, r) {
    if (e === t.sheet)
      return [];
    const n = [], i = this.addressMapping.getCellOrThrow(t);
    for (const a of _t(r, t)) {
      if (!(a instanceof Ht))
        continue;
      const o = a.name, u = this.dependencyGraph.fetchNamedExpressionVertex(o, e).vertex, c = this.namedExpressions.isExpressionInScope(o, t.sheet) ? this.dependencyGraph.fetchNamedExpressionVertex(o, t.sheet).vertex : this.copyOrFetchGlobalNamedExpressionVertex(o, u, n);
      c !== u && (this.dependencyGraph.graph.removeEdgeIfExists(u, i), this.dependencyGraph.graph.addEdge(c, i));
    }
    return n;
  }
  allocateNamedExpressionAddressSpace() {
    this.dependencyGraph.addressMapping.addSheetWithStrategy(Xt.SHEET_FOR_WORKBOOK_EXPRESSIONS, new tm(0, 0));
  }
  copyOrFetchGlobalNamedExpressionVertex(e, t, r) {
    let n = this.namedExpressions.namedExpressionForScope(e);
    if (n === void 0)
      if (n = this.namedExpressions.addNamedExpression(e), r.push(n.normalizeExpressionName()), t instanceof Lt) {
        const i = this.parser.fetchCachedResultForAst(t.getFormula(this.lazilyTransformingAstService)), {
          ast: a,
          hasVolatileFunction: o,
          hasStructuralChangeFunction: u,
          dependencies: l
        } = i;
        this.dependencyGraph.setFormulaToCell(n.address, a, _t(l, n.address), b.scalar(), o, u);
      } else t instanceof er ? this.setCellEmpty(n.address) : t instanceof sr && this.setValueToCell(t.getValues(), n.address);
    return this.dependencyGraph.fetchCellOrCreateEmpty(n.address).vertex;
  }
  /**
   * Removes a cell value from the columnSearch index.
   * Ignores the non-computed formula vertices.
   */
  removeCellValueFromColumnSearch(e) {
    if (this.isNotComputed(e))
      return;
    const t = this.dependencyGraph.getCellValue(e);
    this.columnSearch.remove(I(t), e);
  }
  /**
   * Changes a cell value in the columnSearch index.
   * Ignores the non-computed formula vertices.
   */
  changeCellValueInColumnSearch(e, t) {
    if (this.isNotComputed(e))
      return;
    const r = this.dependencyGraph.getCellValue(e);
    this.columnSearch.change(I(r), I(t), e);
  }
  /**
   * Checks if the ScalarFormulaVertex or ArrayFormulaVertex at the given address is not computed.
   */
  isNotComputed(e) {
    const t = this.dependencyGraph.getCell(e);
    return t ? t instanceof be && !t.isComputed() : !1;
  }
}
function Gs(s) {
  if (s.length <= 1)
    return s;
  const e = [...s].sort(([n], [i]) => n - i), t = e.reduce((n, [i, a]) => {
    const o = n[n.length - 1], u = o[0] + o[1];
    return i <= u ? o[1] += Math.max(0, a - (u - i)) : n.push([i, a]), n;
  }, [e[0]]);
  let r = 0;
  for (let n = 0; n < t.length; ++n)
    t[n][0] -= r, r += t[n][1];
  return t;
}
function Hs(s) {
  if (s.length <= 1)
    return s;
  const e = [...s].sort(([n], [i]) => n - i), t = e.reduce((n, [i, a]) => {
    const o = n[n.length - 1];
    return i === o[0] ? o[1] = Math.max(o[1], a) : n.push([i, a]), n;
  }, [e[0]]);
  let r = 0;
  for (let n = 0; n < t.length; ++n)
    t[n][0] += r, r += t[n][1];
  return t;
}
function Ws(s) {
  return Number.isInteger(s) && s > 0;
}
function og(s, e, t) {
  return s.row === 0 && Ws(e) && t === Number.POSITIVE_INFINITY || s.col === 0 && Ws(t) && e === Number.POSITIVE_INFINITY;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class pe {
  /**
   * Returns LazilyTransformingAstService version keys referenced by this entry's oldData.
   * Default implementation returns empty — override in entries that store oldData.
   */
  getReferencedOldDataVersions() {
    return [];
  }
}
class ug extends pe {
  constructor(e, t) {
    super(), this.command = e, this.rowsRemovals = t;
  }
  doUndo(e) {
    e.undoRemoveRows(this);
  }
  doRedo(e) {
    e.redoRemoveRows(this);
  }
  getReferencedOldDataVersions() {
    return this.rowsRemovals.filter((e) => e.version > 0).map((e) => e.version - 1);
  }
}
class hg extends pe {
  constructor(e, t, r, n, i, a, o) {
    super(), this.sourceLeftCorner = e, this.width = t, this.height = r, this.destinationLeftCorner = n, this.overwrittenCellsData = i, this.addedGlobalNamedExpressions = a, this.version = o;
  }
  doUndo(e) {
    e.undoMoveCells(this);
  }
  doRedo(e) {
    e.redoMoveCells(this);
  }
  getReferencedOldDataVersions() {
    return this.version > 0 ? [this.version - 1] : [];
  }
}
class lg extends pe {
  constructor(e) {
    super(), this.command = e;
  }
  doUndo(e) {
    e.undoAddRows(this);
  }
  doRedo(e) {
    e.redoAddRows(this);
  }
}
class cg extends pe {
  constructor(e, t, r) {
    super(), this.sheetId = e, this.rowMapping = t, this.oldContent = r;
  }
  doUndo(e) {
    e.undoSetRowOrder(this);
  }
  doRedo(e) {
    e.redoSetRowOrder(this);
  }
}
class dg extends pe {
  constructor(e, t, r) {
    super(), this.sheetId = e, this.columnMapping = t, this.oldContent = r;
  }
  doUndo(e) {
    e.undoSetColumnOrder(this);
  }
  doRedo(e) {
    e.redoSetColumnOrder(this);
  }
}
class fg extends pe {
  constructor(e, t, r) {
    super(), this.sheetId = e, this.oldSheetContent = t, this.newSheetContent = r;
  }
  doUndo(e) {
    e.undoSetSheetContent(this);
  }
  doRedo(e) {
    e.redoSetSheetContent(this);
  }
}
class pg extends pe {
  constructor(e, t, r, n, i) {
    super(), this.sheet = e, this.startRow = t, this.numberOfRows = r, this.targetRow = n, this.version = i, this.undoStart = this.startRow < this.targetRow ? this.targetRow - this.numberOfRows : this.targetRow, this.undoEnd = this.startRow > this.targetRow ? this.startRow + this.numberOfRows : this.startRow;
  }
  doUndo(e) {
    e.undoMoveRows(this);
  }
  doRedo(e) {
    e.redoMoveRows(this);
  }
  getReferencedOldDataVersions() {
    return this.version > 0 ? [this.version - 1] : [];
  }
}
class mg extends pe {
  constructor(e, t, r, n, i) {
    super(), this.sheet = e, this.startColumn = t, this.numberOfColumns = r, this.targetColumn = n, this.version = i, this.undoStart = this.startColumn < this.targetColumn ? this.targetColumn - this.numberOfColumns : this.targetColumn, this.undoEnd = this.startColumn > this.targetColumn ? this.startColumn + this.numberOfColumns : this.startColumn;
  }
  doUndo(e) {
    e.undoMoveColumns(this);
  }
  doRedo(e) {
    e.redoMoveColumns(this);
  }
  getReferencedOldDataVersions() {
    return this.version > 0 ? [this.version - 1] : [];
  }
}
class gg extends pe {
  constructor(e) {
    super(), this.command = e;
  }
  doUndo(e) {
    e.undoAddColumns(this);
  }
  doRedo(e) {
    e.redoAddColumns(this);
  }
}
class Eg extends pe {
  constructor(e, t) {
    super(), this.command = e, this.columnsRemovals = t;
  }
  doUndo(e) {
    e.undoRemoveColumns(this);
  }
  doRedo(e) {
    e.redoRemoveColumns(this);
  }
  getReferencedOldDataVersions() {
    return this.columnsRemovals.filter((e) => e.version > 0).map((e) => e.version - 1);
  }
}
class Rg extends pe {
  constructor(e, t) {
    super(), this.sheetName = e, this.sheetId = t;
  }
  doUndo(e) {
    e.undoAddSheet(this);
  }
  doRedo(e) {
    e.redoAddSheet(this);
  }
}
class Ng extends pe {
  constructor(e, t, r, n) {
    super(), this.sheetName = e, this.sheetId = t, this.oldSheetContent = r, this.scopedNamedExpressions = n;
  }
  doUndo(e) {
    e.undoRemoveSheet(this);
  }
  doRedo(e) {
    e.redoRemoveSheet(this);
  }
}
class Tg extends pe {
  constructor(e, t, r, n, i) {
    super(), this.sheetId = e, this.oldName = t, this.newName = r, this.version = n, this.mergedPlaceholderSheetId = i;
  }
  doUndo(e) {
    e.undoRenameSheet(this);
  }
  doRedo(e) {
    e.redoRenameSheet(this);
  }
  getReferencedOldDataVersions() {
    return this.version !== void 0 && this.version > 0 ? [this.version - 1] : [];
  }
}
class Sg extends pe {
  constructor(e, t) {
    super(), this.sheetId = e, this.oldSheetContent = t;
  }
  doUndo(e) {
    e.undoClearSheet(this);
  }
  doRedo(e) {
    e.redoClearSheet(this);
  }
}
class Ag extends pe {
  constructor(e) {
    super(), this.cellContents = e;
  }
  doUndo(e) {
    e.undoSetCellContents(this);
  }
  doRedo(e) {
    e.redoSetCellContents(this);
  }
}
class yg extends pe {
  constructor(e, t, r, n) {
    super(), this.targetLeftCorner = e, this.oldContent = t, this.newContent = r, this.addedGlobalNamedExpressions = n;
  }
  doUndo(e) {
    e.undoPaste(this);
  }
  doRedo(e) {
    e.redoPaste(this);
  }
}
class vg extends pe {
  constructor(e, t, r, n) {
    super(), this.name = e, this.newContent = t, this.scope = r, this.options = n;
  }
  doUndo(e) {
    e.undoAddNamedExpression(this);
  }
  doRedo(e) {
    e.redoAddNamedExpression(this);
  }
}
class Cg extends pe {
  constructor(e, t, r) {
    super(), this.namedExpression = e, this.content = t, this.scope = r;
  }
  doUndo(e) {
    e.undoRemoveNamedExpression(this);
  }
  doRedo(e) {
    e.redoRemoveNamedExpression(this);
  }
}
class Ig extends pe {
  constructor(e, t, r, n, i) {
    super(), this.namedExpression = e, this.newContent = t, this.oldContent = r, this.scope = n, this.options = i;
  }
  doUndo(e) {
    e.undoChangeNamedExpression(this);
  }
  doRedo(e) {
    e.redoChangeNamedExpression(this);
  }
}
class Og extends pe {
  constructor() {
    super(...arguments), this.operations = [];
  }
  add(e) {
    this.operations.push(e);
  }
  *reversedOperations() {
    for (let e = this.operations.length - 1; e >= 0; e--)
      yield this.operations[e];
  }
  doUndo(e) {
    e.undoBatch(this);
  }
  doRedo(e) {
    e.redoBatch(this);
  }
  getReferencedOldDataVersions() {
    return this.operations.flatMap((e) => e.getReferencedOldDataVersions());
  }
}
class Mg {
  constructor(e, t) {
    this.operations = t, this.oldData = /* @__PURE__ */ new Map(), this.undoStack = [], this.redoStack = [], this.undoLimit = e.undoLimit;
  }
  saveOperation(e) {
    this.batchUndoEntry !== void 0 ? this.batchUndoEntry.add(e) : this.addUndoEntry(e);
  }
  beginBatchMode() {
    this.batchUndoEntry = new Og();
  }
  commitBatchMode() {
    if (this.batchUndoEntry === void 0)
      throw Error("Batch mode wasn't started");
    this.addUndoEntry(this.batchUndoEntry), this.batchUndoEntry = void 0;
  }
  /**
   * Stores a formula AST hash snapshot for the given LazilyTransformingAstService version.
   * Skipped when `undoLimit` is 0 (undo disabled) to avoid storing data that would never be used.
   */
  storeDataForVersion(e, t, r) {
    if (this.undoLimit === 0)
      return;
    this.oldData.has(e) || this.oldData.set(e, []), this.oldData.get(e).push([t, r]);
  }
  /** Clears the redo stack and removes oldData entries no longer referenced by any remaining entry. */
  clearRedoStack() {
    this.cleanupOldDataForEntries(this.redoStack, this.undoStack), this.redoStack = [];
  }
  /** Clears the undo stack and removes oldData entries no longer referenced by any remaining entry. */
  clearUndoStack() {
    this.cleanupOldDataForEntries(this.undoStack, this.redoStack), this.undoStack = [];
  }
  isUndoStackEmpty() {
    return this.undoStack.length === 0;
  }
  isRedoStackEmpty() {
    return this.redoStack.length === 0;
  }
  undo() {
    const e = this.undoStack.pop();
    if (!e)
      throw Error("Attempted to undo without operation on stack");
    this.undoEntry(e), this.redoStack.push(e);
  }
  undoBatch(e) {
    for (const t of e.reversedOperations())
      this.undoEntry(t);
  }
  undoRemoveRows(e) {
    this.operations.forceApplyPostponedTransformations();
    const {
      command: {
        sheet: t
      },
      rowsRemovals: r
    } = e;
    for (let n = r.length - 1; n >= 0; --n) {
      const i = r[n];
      this.operations.addRows(new fl(t, [[i.rowFrom, i.rowCount]]));
      for (const {
        address: a,
        cellType: o
      } of i.removedCells)
        this.operations.restoreCell(a, o);
      this.restoreOldDataFromVersion(i.version - 1);
    }
  }
  undoRemoveColumns(e) {
    this.operations.forceApplyPostponedTransformations();
    const {
      command: {
        sheet: t
      },
      columnsRemovals: r
    } = e;
    for (let n = r.length - 1; n >= 0; --n) {
      const i = r[n];
      this.operations.addColumns(new pl(t, [[i.columnFrom, i.columnCount]]));
      for (const {
        address: a,
        cellType: o
      } of i.removedCells)
        this.operations.restoreCell(a, o);
      this.restoreOldDataFromVersion(i.version - 1);
    }
  }
  undoAddRows(e) {
    const t = e.command.rowsSpans();
    for (let r = t.length - 1; r >= 0; --r) {
      const n = t[r];
      this.operations.removeRows(new dl(e.command.sheet, [[n.rowStart, n.numberOfRows]]));
    }
  }
  undoAddColumns(e) {
    const t = e.command.columnsSpans();
    for (let r = t.length - 1; r >= 0; --r) {
      const n = t[r];
      this.operations.removeColumns(new ml(e.command.sheet, [[n.columnStart, n.numberOfColumns]]));
    }
  }
  undoSetCellContents(e) {
    for (const t of e.cellContents) {
      const r = t.address, [n, i] = t.oldContent;
      On(r, n) || this.operations.setCellEmpty(r), this.operations.restoreCell(n, i);
    }
  }
  undoPaste(e) {
    this.restoreOperationOldContent(e.oldContent);
    for (const t of e.addedGlobalNamedExpressions)
      this.operations.removeNamedExpression(t);
  }
  undoMoveRows(e) {
    this.operations.forceApplyPostponedTransformations();
    const {
      sheet: t
    } = e;
    this.operations.moveRows(t, e.undoStart, e.numberOfRows, e.undoEnd), this.restoreOldDataFromVersion(e.version - 1);
  }
  undoMoveColumns(e) {
    this.operations.forceApplyPostponedTransformations();
    const {
      sheet: t
    } = e;
    this.operations.moveColumns(t, e.undoStart, e.numberOfColumns, e.undoEnd), this.restoreOldDataFromVersion(e.version - 1);
  }
  undoMoveCells(e) {
    this.operations.forceApplyPostponedTransformations(), this.operations.moveCells(e.destinationLeftCorner, e.width, e.height, e.sourceLeftCorner), this.restoreOperationOldContent(e.overwrittenCellsData), this.restoreOldDataFromVersion(e.version - 1);
    for (const t of e.addedGlobalNamedExpressions)
      this.operations.removeNamedExpression(t);
  }
  undoAddSheet(e) {
    const {
      sheetName: t
    } = e;
    this.operations.removeSheetByName(t);
  }
  undoRemoveSheet(e) {
    this.operations.forceApplyPostponedTransformations();
    const {
      oldSheetContent: t,
      sheetId: r,
      scopedNamedExpressions: n,
      sheetName: i
    } = e;
    this.operations.addSheetWithId(r, i);
    for (let a = 0; a < t.length; a++) {
      const o = t[a];
      for (let u = 0; u < o.length; u++) {
        const l = o[u], c = O(r, u, a);
        this.operations.restoreCell(c, l);
      }
    }
    for (const [a, o] of n)
      this.operations.restoreNamedExpression(a, o, r);
  }
  undoRenameSheet(e) {
    this.operations.forceApplyPostponedTransformations(), this.operations.renameSheet(e.sheetId, e.oldName), e.mergedPlaceholderSheetId !== void 0 && e.version !== void 0 && (this.operations.addPlaceholderSheetWithId(e.mergedPlaceholderSheetId, e.newName), this.restoreOldDataFromVersion(e.version - 1));
  }
  undoClearSheet(e) {
    const {
      oldSheetContent: t,
      sheetId: r
    } = e;
    for (let n = 0; n < t.length; n++) {
      const i = t[n];
      for (let a = 0; a < i.length; a++) {
        const o = i[a], u = O(r, a, n);
        this.operations.restoreCell(u, o);
      }
    }
  }
  undoSetSheetContent(e) {
    const {
      oldSheetContent: t,
      sheetId: r
    } = e;
    this.operations.clearSheet(r);
    for (let n = 0; n < t.length; n++) {
      const i = t[n];
      for (let a = 0; a < i.length; a++) {
        const o = i[a], u = O(r, a, n);
        this.operations.restoreCell(u, o);
      }
    }
  }
  undoAddNamedExpression(e) {
    this.operations.removeNamedExpression(e.name, e.scope);
  }
  undoRemoveNamedExpression(e) {
    this.operations.restoreNamedExpression(e.namedExpression, e.content, e.scope);
  }
  undoChangeNamedExpression(e) {
    this.operations.restoreNamedExpression(e.namedExpression, e.oldContent, e.scope);
  }
  undoSetRowOrder(e) {
    this.restoreOperationOldContent(e.oldContent);
  }
  undoSetColumnOrder(e) {
    this.restoreOperationOldContent(e.oldContent);
  }
  redo() {
    const e = this.redoStack.pop();
    if (!e)
      throw Error("Attempted to redo without operation on stack");
    this.redoEntry(e), this.undoStack.push(e);
  }
  redoBatch(e) {
    for (const t of e.operations)
      this.redoEntry(t);
  }
  redoRemoveRows(e) {
    this.operations.removeRows(e.command);
  }
  redoMoveCells(e) {
    this.operations.moveCells(e.sourceLeftCorner, e.width, e.height, e.destinationLeftCorner);
  }
  redoRemoveColumns(e) {
    this.operations.removeColumns(e.command);
  }
  redoPaste(e) {
    const {
      targetLeftCorner: t,
      newContent: r
    } = e, n = r.length, i = r[0].length;
    for (let a = 0; a < n; ++a)
      for (let o = 0; o < i; ++o) {
        const u = O(t.sheet, t.col + o, t.row + a);
        this.operations.restoreCell(u, r[a][o]);
      }
  }
  redoSetCellContents(e) {
    for (const t of e.cellContents)
      this.operations.setCellContent(t.address, t.newContent);
  }
  redoAddRows(e) {
    this.operations.addRows(e.command);
  }
  redoAddColumns(e) {
    this.operations.addColumns(e.command);
  }
  redoRemoveSheet(e) {
    this.operations.removeSheetByName(e.sheetName);
  }
  redoAddSheet(e) {
    this.operations.addSheetWithId(e.sheetId, e.sheetName);
  }
  redoRenameSheet(e) {
    this.operations.renameSheet(e.sheetId, e.newName);
  }
  redoMoveRows(e) {
    this.operations.moveRows(e.sheet, e.startRow, e.numberOfRows, e.targetRow);
  }
  redoMoveColumns(e) {
    this.operations.moveColumns(e.sheet, e.startColumn, e.numberOfColumns, e.targetColumn);
  }
  redoClearSheet(e) {
    this.operations.clearSheet(e.sheetId);
  }
  redoSetSheetContent(e) {
    const {
      sheetId: t,
      newSheetContent: r
    } = e;
    this.operations.setSheetContent(t, r);
  }
  redoAddNamedExpression(e) {
    this.operations.addNamedExpression(e.name, e.newContent, e.scope, e.options);
  }
  redoRemoveNamedExpression(e) {
    this.operations.removeNamedExpression(e.namedExpression.displayName, e.scope);
  }
  redoChangeNamedExpression(e) {
    this.operations.changeNamedExpressionExpression(e.namedExpression.displayName, e.newContent, e.scope, e.options);
  }
  redoSetRowOrder(e) {
    this.operations.setRowOrder(e.sheetId, e.rowMapping);
  }
  redoSetColumnOrder(e) {
    this.operations.setColumnOrder(e.sheetId, e.columnMapping);
  }
  /**
   * Adds an entry to the undo stack, evicting the oldest entries when undoLimit is exceeded.
   * Evicted entries have their oldData keys cleaned up to prevent memory leaks.
   */
  addUndoEntry(e) {
    this.undoStack.push(e);
    const t = Math.max(0, this.undoStack.length - this.undoLimit);
    if (t > 0) {
      const r = this.undoStack.splice(0, t);
      this.cleanupOldDataForEntries(r, [...this.undoStack, ...this.redoStack]);
    }
  }
  /**
   * Removes oldData entries whose version keys are not referenced by any
   * entry on the undo stack, redo stack, or in-progress batch. Called after
   * compaction forces lazy formula evaluation, which may insert oldData for
   * already-evicted entries.
   */
  cleanupOrphanedOldData() {
    const e = this.collectReferencedOldDataVersions(this.undoStack, this.redoStack);
    for (const t of this.oldData.keys())
      e.has(t) || this.oldData.delete(t);
  }
  /**
   * Removes oldData entries referenced by permanently discarded undo/redo entries,
   * but only if not still referenced by entries remaining on the other stack or
   * in-progress batch.
   */
  cleanupOldDataForEntries(e, t) {
    const r = this.collectReferencedOldDataVersions(t);
    for (const n of e)
      for (const i of n.getReferencedOldDataVersions())
        r.has(i) || this.oldData.delete(i);
  }
  /** Collects all oldData version keys referenced by the given entry lists and in-progress batch. */
  collectReferencedOldDataVersions(...e) {
    var t, r;
    return /* @__PURE__ */ new Set([...e.flatMap((n) => n.flatMap((i) => i.getReferencedOldDataVersions())), ...(r = (t = this.batchUndoEntry) === null || t === void 0 ? void 0 : t.getReferencedOldDataVersions()) !== null && r !== void 0 ? r : []]);
  }
  undoEntry(e) {
    e.doUndo(this);
  }
  restoreOperationOldContent(e) {
    for (const [t, r] of e)
      this.operations.restoreCell(t, r);
  }
  redoEntry(e) {
    e.doRedo(this);
  }
  restoreOldDataFromVersion(e) {
    const t = this.oldData.get(e) || [];
    for (const r of t) {
      const [n, i] = r;
      this.operations.setFormulaToCellFromCache(i, n);
    }
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class wg {
  constructor(e, t, r, n, i, a, o, u, l, c) {
    this.operations = t, this.undoRedo = r, this.clipboardOperations = n, this.dependencyGraph = i, this.columnSearch = a, this.parser = o, this.cellContentParser = u, this.lazilyTransformingAstService = l, this.namedExpressions = c, this.maxRows = e.maxRows, this.maxColumns = e.maxColumns;
  }
  get sheetMapping() {
    return this.dependencyGraph.sheetMapping;
  }
  addRows(e, ...t) {
    const r = new fl(e, t);
    this.ensureItIsPossibleToAddRows(e, ...t), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut(), this.operations.addRows(r), this.undoRedo.saveOperation(new lg(r));
  }
  removeRows(e, ...t) {
    const r = new dl(e, t);
    this.ensureItIsPossibleToRemoveRows(e, ...t), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const n = this.operations.removeRows(r);
    this.undoRedo.saveOperation(new ug(r, n));
  }
  addColumns(e, ...t) {
    const r = new pl(e, t);
    this.ensureItIsPossibleToAddColumns(e, ...t), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut(), this.operations.addColumns(r), this.undoRedo.saveOperation(new gg(r));
  }
  removeColumns(e, ...t) {
    const r = new ml(e, t);
    this.ensureItIsPossibleToRemoveColumns(e, ...t), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const n = this.operations.removeColumns(r);
    this.undoRedo.saveOperation(new Eg(r, n));
  }
  moveCells(e, t, r, n) {
    this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const {
      version: i,
      overwrittenCellsData: a,
      addedGlobalNamedExpressions: o
    } = this.operations.moveCells(e, t, r, n);
    this.undoRedo.saveOperation(new hg(e, t, r, n, a, o, i));
  }
  moveRows(e, t, r, n) {
    this.ensureItIsPossibleToMoveRows(e, t, r, n), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const i = this.operations.moveRows(e, t, r, n);
    this.undoRedo.saveOperation(new pg(e, t, r, n, i));
  }
  moveColumns(e, t, r, n) {
    this.ensureItIsPossibleToMoveColumns(e, t, r, n), this.undoRedo.clearRedoStack();
    const i = this.operations.moveColumns(e, t, r, n);
    this.undoRedo.saveOperation(new mg(e, t, r, n, i));
  }
  cut(e, t, r) {
    this.clipboardOperations.cut(e, t, r);
  }
  ensureItIsPossibleToCopy(e, t, r) {
    if (!Ur(t))
      throw new fe("width to be positive integer.");
    if (!Ur(r))
      throw new fe("height to be positive integer.");
  }
  copy(e, t, r) {
    this.ensureItIsPossibleToCopy(e, t, r), this.clipboardOperations.copy(e, t, r);
  }
  paste(e) {
    const t = this.clipboardOperations.clipboard;
    if (t === void 0)
      throw new Hh();
    if (this.clipboardOperations.isCutClipboard())
      this.moveCells(t.sourceLeftCorner, t.width, t.height, e);
    else if (this.clipboardOperations.isCopyClipboard()) {
      this.clipboardOperations.ensureItIsPossibleToCopyPaste(e);
      const r = F.spanFrom(e, t.width, t.height), n = this.operations.getRangeClipboardCells(r);
      this.undoRedo.clearRedoStack();
      const i = this.operations.restoreClipboardCells(t.sourceLeftCorner.sheet, t.getContent(e));
      this.undoRedo.saveOperation(new yg(e, n, t.content, i));
    }
  }
  beginUndoRedoBatchMode() {
    this.undoRedo.beginBatchMode();
  }
  commitUndoRedoBatchMode() {
    this.undoRedo.commitBatchMode();
  }
  isClipboardEmpty() {
    return this.clipboardOperations.clipboard === void 0;
  }
  clearClipboard() {
    this.clipboardOperations.clear();
  }
  addSheet(e) {
    e !== void 0 && this.ensureItIsPossibleToAddSheet(e), this.undoRedo.clearRedoStack();
    const {
      sheetName: t,
      sheetId: r
    } = this.operations.addSheet(e);
    return this.undoRedo.saveOperation(new Rg(t, r)), t;
  }
  removeSheet(e) {
    this.ensureScopeIdIsValid(e), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const t = this.sheetMapping.getSheetNameOrThrowError(e), r = this.operations.getSheetClipboardCells(e), n = this.operations.removeSheet(e);
    this.undoRedo.saveOperation(new Ng(t, e, r, n));
  }
  renameSheet(e, t) {
    this.ensureItIsPossibleToRenameSheet(e, t);
    const {
      previousDisplayName: r,
      version: n,
      mergedPlaceholderSheetId: i
    } = this.operations.renameSheet(e, t);
    return r !== void 0 && (this.undoRedo.clearRedoStack(), this.undoRedo.saveOperation(new Tg(e, r, t, n, i))), r;
  }
  clearSheet(e) {
    this.ensureScopeIdIsValid(e), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const t = this.operations.getSheetClipboardCells(e);
    this.operations.clearSheet(e), this.undoRedo.saveOperation(new Sg(e, t));
  }
  setCellContents(e, t) {
    if (!(t instanceof Array))
      t = [[t]];
    else
      for (let n = 0; n < t.length; n++)
        if (!(t[n] instanceof Array))
          throw new fe("an array of arrays or a raw cell value.");
    this.ensureItIsPossibleToChangeCellContents(e, t), this.undoRedo.clearRedoStack();
    const r = [];
    for (let n = 0; n < t.length; n++)
      for (let i = 0; i < t[n].length; i++) {
        const a = {
          sheet: e.sheet,
          row: e.row + n,
          col: e.col + i
        }, o = t[n][i];
        this.clipboardOperations.abortCut();
        const u = this.operations.setCellContent(a, o);
        r.push({
          address: a,
          newContent: o,
          oldContent: u
        });
      }
    this.undoRedo.saveOperation(new Ag(r));
  }
  setSheetContent(e, t) {
    this.ensureScopeIdIsValid(e), this.ensureItIsPossibleToChangeSheetContents(e, t), Qh(t), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const r = this.operations.getSheetClipboardCells(e);
    this.operations.setSheetContent(e, t), this.undoRedo.saveOperation(new fg(e, r, t));
  }
  setRowOrder(e, t) {
    this.validateSwapRowIndexes(e, t), this.testRowOrderForArrays(e, t), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const r = this.operations.setRowOrder(e, t);
    this.undoRedo.saveOperation(new cg(e, t, r));
  }
  validateSwapRowIndexes(e, t) {
    if (!this.sheetMapping.hasSheetWithId(e))
      throw new _e(e);
    this.validateRowOrColumnMapping(e, t, "row");
  }
  testColumnOrderForArrays(e, t) {
    for (const [r, n] of t)
      if (r !== n) {
        const i = F.spanFrom({
          sheet: e,
          col: r,
          row: 0
        }, 1, 1 / 0);
        if (this.dependencyGraph.arrayMapping.isFormulaArrayInRange(i))
          throw new Hr();
      }
  }
  setColumnOrder(e, t) {
    this.validateSwapColumnIndexes(e, t), this.testColumnOrderForArrays(e, t), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut();
    const r = this.operations.setColumnOrder(e, t);
    this.undoRedo.saveOperation(new dg(e, t, r));
  }
  validateSwapColumnIndexes(e, t) {
    if (!this.sheetMapping.hasSheetWithId(e))
      throw new _e(e);
    this.validateRowOrColumnMapping(e, t, "column");
  }
  testRowOrderForArrays(e, t) {
    for (const [r, n] of t)
      if (r !== n) {
        const i = F.spanFrom({
          sheet: e,
          col: 0,
          row: r
        }, 1 / 0, 1);
        if (this.dependencyGraph.arrayMapping.isFormulaArrayInRange(i))
          throw new Hr();
      }
  }
  mappingFromOrder(e, t, r) {
    if (!this.sheetMapping.hasSheetWithId(e))
      throw new _e(e);
    const n = r === "row" ? this.dependencyGraph.getSheetHeight(e) : this.dependencyGraph.getSheetWidth(e);
    if (t.length !== n)
      throw new fe(`number of ${r}s provided to be sheet ${r === "row" ? "height" : "width"}.`);
    const i = [];
    for (let a = 0; a < n; a++)
      t[a] !== a && i.push([a, t[a]]);
    return i;
  }
  undo() {
    if (this.undoRedo.isUndoStackEmpty())
      throw new kh();
    this.clipboardOperations.abortCut(), this.undoRedo.undo();
  }
  redo() {
    if (this.undoRedo.isRedoStackEmpty())
      throw new Gh();
    this.clipboardOperations.abortCut(), this.undoRedo.redo();
  }
  addNamedExpression(e, t, r, n) {
    this.ensureItIsPossibleToAddNamedExpression(e, t, r), this.operations.addNamedExpression(e, t, r, n), this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut(), this.undoRedo.saveOperation(new vg(e, t, r, n));
  }
  changeNamedExpressionExpression(e, t, r, n) {
    this.ensureItIsPossibleToChangeNamedExpression(e, r, t);
    const [i, a] = this.operations.changeNamedExpressionExpression(e, r, t, n);
    this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut(), this.undoRedo.saveOperation(new Ig(i, r, a, t, n));
  }
  removeNamedExpression(e, t) {
    this.ensureScopeIdIsValid(t);
    const [r, n] = this.operations.removeNamedExpression(e, t);
    return this.undoRedo.clearRedoStack(), this.clipboardOperations.abortCut(), this.undoRedo.saveOperation(new Cg(r, n, t)), r;
  }
  ensureItIsPossibleToAddNamedExpression(e, t, r) {
    this.ensureScopeIdIsValid(r), this.ensureNamedExpressionNameIsValid(e, r), this.ensureNamedExpressionIsValid(t);
  }
  ensureItIsPossibleToChangeNamedExpression(e, t, r) {
    if (this.ensureScopeIdIsValid(r), this.namedExpressions.namedExpressionForScope(e, r) === void 0)
      throw new Cn(e);
    this.ensureNamedExpressionIsValid(t);
  }
  isItPossibleToRemoveNamedExpression(e, t) {
    if (this.ensureScopeIdIsValid(t), this.namedExpressions.namedExpressionForScope(e, t) === void 0)
      throw new Cn(e);
  }
  ensureItIsPossibleToAddRows(e, ...t) {
    if (!this.sheetMapping.hasSheetWithId(e))
      throw new _e(e);
    const r = this.dependencyGraph.getSheetHeight(e), n = t.map((i) => i[1]).reduce((i, a) => i + a, 0);
    if (r + n > this.maxRows)
      throw new yr();
    for (const [i, a] of t)
      if (!pr(i) || !Ur(a))
        throw new fe("row number to be nonnegative and number of rows to add to be positive.");
  }
  ensureItIsPossibleToRemoveRows(e, ...t) {
    for (const [r, n] of t) {
      const i = r + n - 1;
      if (!pr(r) || !pr(i))
        throw new fe("starting and ending row to be nonnegative.");
      if (i < r)
        throw new fe("starting row to be smaller than the ending row.");
      if (!this.sheetMapping.hasSheetWithId(e))
        throw new _e(e);
    }
  }
  ensureItIsPossibleToAddColumns(e, ...t) {
    if (!this.sheetMapping.hasSheetWithId(e))
      throw new _e(e);
    const r = this.dependencyGraph.getSheetWidth(e), n = t.map((i) => i[1]).reduce((i, a) => i + a, 0);
    if (r + n > this.maxColumns)
      throw new yr();
    for (const [i, a] of t)
      if (!pr(i) || !Ur(a))
        throw new fe("column number to be nonnegative and number of columns to add to be positive.");
  }
  ensureItIsPossibleToRemoveColumns(e, ...t) {
    for (const [r, n] of t) {
      const i = r + n - 1;
      if (!pr(r) || !pr(i))
        throw new fe("starting and ending column to be nonnegative.");
      if (i < r)
        throw new fe("starting column to be smaller than the ending column.");
      if (!this.sheetMapping.hasSheetWithId(e))
        throw new _e(e);
    }
  }
  ensureItIsPossibleToMoveRows(e, t, r, n) {
    this.ensureItIsPossibleToAddRows(e, [n, r]);
    const i = O(e, 0, t), a = O(e, 0, n);
    if (!this.sheetMapping.hasSheetWithId(e) || ke(i) || ke(a) || !Ur(r) || n <= t + r && n >= t)
      throw new fe("a valid range of rows to move.");
    const o = this.dependencyGraph.getSheetWidth(e), u = F.spanFrom(i, o, r);
    if (this.dependencyGraph.arrayMapping.isFormulaArrayInRange(u))
      throw new Hr();
    if (n > 0 && this.dependencyGraph.arrayMapping.isFormulaArrayInAllRows(Ge.fromNumberOfRows(e, n - 1, 2)))
      throw new xs();
  }
  ensureItIsPossibleToMoveColumns(e, t, r, n) {
    this.ensureItIsPossibleToAddColumns(e, [n, r]);
    const i = O(e, t, 0), a = O(e, n, 0);
    if (!this.sheetMapping.hasSheetWithId(e) || ke(i) || ke(a) || !Ur(r) || n <= t + r && n >= t)
      throw new fe("a valid range of columns to move.");
    const o = this.dependencyGraph.getSheetHeight(e), u = F.spanFrom(i, r, o);
    if (this.dependencyGraph.arrayMapping.isFormulaArrayInRange(u))
      throw new Hr();
    if (n > 0 && this.dependencyGraph.arrayMapping.isFormulaArrayInAllColumns(qe.fromNumberOfColumns(e, n - 1, 2)))
      throw new xs();
  }
  ensureItIsPossibleToAddSheet(e) {
    if (this.sheetMapping.hasSheetWithName(e))
      throw new Jt(e);
  }
  ensureItIsPossibleToRenameSheet(e, t) {
    if (!this.sheetMapping.hasSheetWithId(e))
      throw new _e(e);
    const r = this.sheetMapping.getSheetId(t);
    if (r !== void 0 && r !== e)
      throw new Jt(t);
  }
  ensureItIsPossibleToChangeContent(e) {
    if (ke(e))
      throw new Vh(e);
    if (!this.sheetMapping.hasSheetWithId(e.sheet))
      throw new _e(e.sheet);
  }
  ensureItIsPossibleToChangeCellContents(e, t) {
    const r = bs(t), n = F.spanFrom(e, r.width, r.height);
    this.ensureRangeInSizeLimits(n);
    for (const i of n.addresses(this.dependencyGraph))
      this.ensureItIsPossibleToChangeContent(i);
  }
  ensureItIsPossibleToChangeSheetContents(e, t) {
    const r = bs(t), n = F.spanFrom(O(e, 0, 0), r.width, r.height);
    this.ensureRangeInSizeLimits(n);
  }
  ensureRangeInSizeLimits(e) {
    if (e.exceedsSheetSizeLimits(this.maxColumns, this.maxRows))
      throw new yr();
  }
  isThereSomethingToUndo() {
    return !this.undoRedo.isUndoStackEmpty();
  }
  isThereSomethingToRedo() {
    return !this.undoRedo.isRedoStackEmpty();
  }
  getAndClearContentChanges() {
    return this.operations.getAndClearContentChanges();
  }
  ensureScopeIdIsValid(e) {
    if (e !== void 0 && !this.sheetMapping.hasSheetWithId(e))
      throw new _e(e);
  }
  validateRowOrColumnMapping(e, t, r) {
    const n = r === "row" ? this.dependencyGraph.getSheetHeight(e) : this.dependencyGraph.getSheetWidth(e), i = t.map(([o, u]) => o).sort((o, u) => o - u), a = t.map(([o, u]) => u).sort((o, u) => o - u);
    for (let o = 0; o < i.length; o++) {
      if (!pr(i[o]) || i[o] >= n)
        throw new fe(`${r} numbers to be nonnegative integers and less than sheet ${r === "row" ? "height" : "width"}.`);
      if (i[o] === i[o + 1])
        throw new fe(`source ${r} numbers to be unique.`);
      if (i[o] !== a[o])
        throw new fe(`target ${r} numbers to be permutation of source ${r} numbers.`);
    }
  }
  ensureNamedExpressionNameIsValid(e, t) {
    if (!this.namedExpressions.isNameValid(e))
      throw new Bh(e);
    if (!this.namedExpressions.isNameAvailable(e, t))
      throw new Dh(e);
  }
  ensureNamedExpressionIsValid(e) {
    const t = this.cellContentParser.parse(e);
    if (t instanceof te.Formula) {
      const r = this.parser.parse(t.formula, O(-1, 0, 0));
      if (Qt(r.ast))
        throw new Ua();
    }
  }
}
function Ur(s) {
  return Number.isInteger(s) && s > 0;
}
function pr(s) {
  return Number.isInteger(s) && s >= 0;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class _g {
  constructor(e, t, r, n, i, a) {
    this.config = e, this.stats = t, this.interpreter = r, this.lazilyTransformingAstService = n, this.dependencyGraph = i, this.columnSearch = a;
  }
  run() {
    this.stats.start(P.TOP_SORT);
    const {
      sorted: e,
      cycled: t
    } = this.dependencyGraph.topSortWithScc();
    this.stats.end(P.TOP_SORT), this.stats.measure(P.EVALUATION, () => {
      this.recomputeFormulas(t, e);
    });
  }
  partialRun(e) {
    const t = nr.empty();
    return this.stats.measure(P.EVALUATION, () => {
      this.dependencyGraph.graph.getTopSortedWithSccSubgraphFrom(e, (r) => this.recomputeVertex(r, t), (r) => this.processVertexOnCycle(r, t));
    }), t;
  }
  runAndForget(e, t, r) {
    const n = [];
    for (const a of _t(r, t))
      if (a instanceof F) {
        const o = a;
        if (this.dependencyGraph.getRange(o.start, o.end) === void 0) {
          const u = new we(o);
          this.dependencyGraph.rangeMapping.addOrUpdateVertex(u), n.push(u);
        }
      }
    const i = this.evaluateAstToCellValue(e, new Ut(t, this.config.useArrayArithmetic));
    return n.forEach((a) => {
      this.dependencyGraph.rangeMapping.removeVertexIfExists(a);
    }), i;
  }
  /**
   * Recalculates the value of a single vertex assuming its dependencies have already been recalculated
   */
  recomputeVertex(e, t) {
    if (e instanceof be) {
      const r = e.isComputed() ? e.getCellValue() : void 0, n = this.recomputeFormulaVertexValue(e);
      if (n !== r) {
        const i = e.getAddress(this.lazilyTransformingAstService);
        return t.addChange(n, i), this.columnSearch.change(I(r), I(n), i), !0;
      }
      return !1;
    } else return e instanceof we && e.clearCache(), !0;
  }
  /**
   * Processes a vertex that is part of a cycle in dependency graph
   */
  processVertexOnCycle(e, t) {
    if (e instanceof we)
      e.clearCache();
    else if (e instanceof be) {
      const r = e.getAddress(this.lazilyTransformingAstService);
      this.columnSearch.remove(I(e.valueOrUndef()), r);
      const n = new f(m.CYCLE, void 0, e);
      e.setCellValue(n), t.addChange(n, r);
    }
  }
  /**
   * Recalculates formulas in the topological sort order
   */
  recomputeFormulas(e, t) {
    e.forEach((r) => {
      r instanceof be && r.setCellValue(new f(m.CYCLE, void 0, r));
    }), t.forEach((r) => {
      if (r instanceof be) {
        const n = this.recomputeFormulaVertexValue(r), i = r.getAddress(this.lazilyTransformingAstService);
        this.columnSearch.add(I(n), i);
      } else r instanceof we && r.clearCache();
    });
  }
  recomputeFormulaVertexValue(e) {
    const t = e.getAddress(this.lazilyTransformingAstService);
    if (e instanceof le && (e.array.size.isRef || !this.dependencyGraph.isThereSpaceForArray(e)))
      return e.setNoSpace();
    {
      const r = e.getFormula(this.lazilyTransformingAstService), n = this.evaluateAstToCellValue(r, new Ut(t, this.config.useArrayArithmetic, e));
      return e.setCellValue(n);
    }
  }
  evaluateAstToCellValue(e, t) {
    const r = this.interpreter.evaluateAst(e, t);
    return r instanceof M ? r : r === B && this.config.evaluateNullToZero ? 0 : r;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ta {
  constructor(e, t) {
    this.address = e, this.newValue = t;
  }
  get col() {
    return this.address.col;
  }
  get row() {
    return this.address.row;
  }
  get sheet() {
    return this.address.sheet;
  }
  get value() {
    return this.newValue;
  }
}
class gl {
  constructor(e, t) {
    this.name = e, this.newValue = t;
  }
}
class Lg {
  constructor(e, t, r, n) {
    this.config = e, this.namedExpressions = t, this.sheetMapping = r, this.lazilyTransformingService = n;
  }
  exportChange(e) {
    const t = e.value, r = e.address;
    if (r.sheet === Xt.SHEET_FOR_WORKBOOK_EXPRESSIONS) {
      const n = this.namedExpressions.namedExpressionInAddress(r.row);
      if (!n)
        throw new Error("Missing named expression");
      return new gl(n.displayName, this.exportScalarOrRange(t));
    } else if (t instanceof M) {
      const n = [];
      for (const [i, a] of t.entriesFromTopLeftCorner(r))
        n.push(new ta(a, this.exportValue(i)));
      return n;
    } else
      return new ta(r, this.exportValue(t));
  }
  exportValue(e) {
    return e instanceof M ? this.detailedError(new f(m.VALUE, E.ScalarExpected)) : this.config.smartRounding && D(e) ? this.cellValueRounding(I(e)) : e instanceof f ? this.detailedError(e) : e === B ? null : I(e);
  }
  exportScalarOrRange(e) {
    return e instanceof M ? e.rawData().map((t) => t.map((r) => this.exportValue(r))) : this.exportValue(e);
  }
  detailedError(e) {
    var t, r;
    let n;
    const i = (t = e.root) === null || t === void 0 ? void 0 : t.getAddress(this.lazilyTransformingService);
    return i !== void 0 && (i.sheet === Xt.SHEET_FOR_WORKBOOK_EXPRESSIONS ? n = (r = this.namedExpressions.namedExpressionInAddress(i.row)) === null || r === void 0 ? void 0 : r.displayName : n = Ts(this.sheetMapping.getSheetNameOrThrowError.bind(this.sheetMapping), i, -1)), new il(e, this.config.translationPackage.getErrorTranslation(e.type), n);
  }
  cellValueRounding(e) {
    if (e === 0)
      return e;
    const t = Math.floor(Math.log10(Math.abs(e))), r = Math.pow(10, this.config.precisionRounding - t);
    return e < 0 ? -Math.round(-e * r) / r : Math.round(e * r) / r;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Fg {
  /**
   * Configures the building service.
   */
  constructor(e, t, r, n, i, a) {
    this.dependencyGraph = e, this.columnSearch = t, this.parser = r, this.cellContentParser = n, this.stats = i, this.arraySizePredictor = a, this.buildStrategy = new Ug(e, t, r, i, n, a);
  }
  /**
   * Builds graph.
   */
  buildGraph(e, t) {
    const r = t.measure(P.COLLECT_DEPENDENCIES, () => this.buildStrategy.run(e));
    this.dependencyGraph.getAndClearContentChanges(), t.measure(P.PROCESS_DEPENDENCIES, () => this.processDependencies(r));
  }
  processDependencies(e) {
    e.forEach((t, r) => {
      this.dependencyGraph.processCellDependencies(t, r);
    });
  }
}
class Ug {
  constructor(e, t, r, n, i, a) {
    this.dependencyGraph = e, this.columnIndex = t, this.parser = r, this.stats = n, this.cellContentParser = i, this.arraySizePredictor = a;
  }
  run(e) {
    const t = /* @__PURE__ */ new Map();
    for (const r in e) {
      const n = this.dependencyGraph.getSheetId(r), i = e[r];
      for (let a = 0; a < i.length; ++a) {
        const o = i[a];
        for (let u = 0; u < o.length; ++u) {
          const l = o[u], c = O(n, u, a), d = this.cellContentParser.parse(l);
          if (d instanceof te.Formula) {
            const p = this.stats.measure(P.PARSER, () => this.parser.parse(d.formula, c));
            if (p.errors.length > 0) {
              this.shrinkArrayIfNeeded(c);
              const N = new Xr(p.errors, d.formula);
              this.dependencyGraph.addVertex(c, N);
            } else {
              this.shrinkArrayIfNeeded(c);
              const N = this.arraySizePredictor.checkArraySize(p.ast, c);
              if (N.isScalar()) {
                const T = new Lt(p.ast, c, 0);
                t.set(T, _t(p.dependencies, c)), this.dependencyGraph.addVertex(c, T), p.hasVolatileFunction && this.dependencyGraph.markAsVolatile(T), p.hasStructuralChangeFunction && this.dependencyGraph.markAsDependentOnStructureChange(T);
              } else {
                const T = new le(p.ast, c, new b(N.width, N.height));
                t.set(T, _t(p.dependencies, c)), this.dependencyGraph.addArrayVertex(c, T);
              }
            }
          } else if (!(d instanceof te.Empty)) {
            this.shrinkArrayIfNeeded(c);
            const p = new sr(d.value, l);
            this.columnIndex.add(I(d.value), c), this.dependencyGraph.addVertex(c, p);
          }
        }
      }
    }
    return t;
  }
  shrinkArrayIfNeeded(e) {
    const t = this.dependencyGraph.getCell(e);
    t instanceof le && this.dependencyGraph.shrinkArrayToCorner(t);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Qn = /* @__PURE__ */ new Map([["gpl-v3", 1], ["missing", 2], ["invalid", 3], ["expired", 4]]);
class El extends V {
  version(e, t) {
    return this.runFunction(e.args, t, this.metadata("VERSION"), () => {
      const {
        licenseKeyValidityState: r,
        licenseKey: n
      } = this.config;
      let i;
      return Qn.has(n) ? i = Qn.get(n) : Qn.has(r) ? i = Qn.get(r) : r === "valid" && (i = n.slice(-5)), `HyperFormula v${Me.version}, ${i}`;
    });
  }
}
El.implementedFunctions = {
  VERSION: {
    method: "version",
    parameters: []
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function vi(s, e) {
  var t;
  let r = e.implementedFunctions[s];
  const n = (t = e.aliases) === null || t === void 0 ? void 0 : t[s];
  if (n !== void 0) {
    if (r !== void 0)
      throw new zp(s, e.name);
    r = e.implementedFunctions[n];
  }
  if (r === void 0)
    throw Qr.functionNotDeclaredInPlugin(s, e.name);
  return r;
}
class ge {
  constructor(e) {
    if (this.config = e, this.functions = /* @__PURE__ */ new Map(), this.arraySizeFunctions = /* @__PURE__ */ new Map(), this.volatileFunctions = /* @__PURE__ */ new Set(), this.arrayFunctions = /* @__PURE__ */ new Set(), this.structuralChangeFunctions = /* @__PURE__ */ new Set(), this.functionsWhichDoesNotNeedArgumentsToBeComputed = /* @__PURE__ */ new Set(), this.functionsMetadata = /* @__PURE__ */ new Map(), this.doesFunctionNeedArgumentToBeComputed = (t) => this.functionsWhichDoesNotNeedArgumentsToBeComputed.has(t), this.isFunctionVolatile = (t) => this.volatileFunctions.has(t), this.isArrayFunction = (t) => this.arrayFunctions.has(t), this.isFunctionDependentOnSheetStructureChange = (t) => this.structuralChangeFunctions.has(t), e.functionPlugins.length > 0) {
      this.instancePlugins = /* @__PURE__ */ new Map();
      for (const t of e.functionPlugins)
        ge.loadPluginFunctions(t, this.instancePlugins);
    } else
      this.instancePlugins = new Map(ge.plugins);
    for (const [t, r] of ge.protectedFunctions())
      ge.loadFunctionUnprotected(r, t, this.instancePlugins);
    for (const [t, r] of this.instancePlugins.entries())
      this.categorizeFunction(t, vi(t, r));
  }
  static registerFunctionPlugin(e, t) {
    this.loadPluginFunctions(e, this.plugins), t !== void 0 && this.loadTranslations(t);
  }
  static registerFunction(e, t, r) {
    this.loadPluginFunction(t, e, this.plugins), r !== void 0 && this.loadTranslations(r);
  }
  static unregisterFunction(e) {
    if (this.functionIsProtected(e))
      throw vr.cannotUnregisterFunctionWithId(e);
    this.plugins.delete(e);
  }
  static unregisterFunctionPlugin(e) {
    for (const t of this.protectedPlugins())
      if (t === e)
        throw vr.cannotUnregisterProtectedPlugin();
    for (const [t, r] of this.plugins.entries())
      r === e && this.plugins.delete(t);
  }
  static unregisterAll() {
    this.plugins.clear();
  }
  static getRegisteredFunctionIds() {
    return [...Array.from(this.plugins.keys()), ...Array.from(this._protectedPlugins.keys())];
  }
  static getPlugins() {
    return Array.from(new Set(this.plugins.values()).values());
  }
  static getFunctionPlugin(e) {
    if (!this.functionIsProtected(e))
      return this.plugins.get(e);
  }
  static functionIsProtected(e) {
    return this._protectedPlugins.has(e);
  }
  static loadTranslations(e) {
    const t = new Set(Me.getRegisteredLanguagesCodes());
    Object.keys(e).forEach((r) => {
      t.has(r) && Me.getLanguage(r).extendFunctions(e[r]);
    });
  }
  static loadPluginFunctions(e, t) {
    Object.keys(e.implementedFunctions).forEach((r) => {
      this.loadPluginFunction(e, r, t);
    }), e.aliases !== void 0 && Object.keys(e.aliases).forEach((r) => {
      this.loadPluginFunction(e, r, t);
    });
  }
  static loadPluginFunction(e, t, r) {
    if (this.functionIsProtected(t))
      throw vr.cannotRegisterFunctionWithId(t);
    this.loadFunctionUnprotected(e, t, r);
  }
  /**
   * Handles deprecated metadata properties.
   */
  static handleDeprecatedMetadata(e, t) {
    t && t.arrayFunction !== void 0 && (console.warn(`${e}: 'arrayFunction' parameter is deprecated since 3.1.0; Use 'enableArrayArithmeticForArguments' instead.`), t.enableArrayArithmeticForArguments = t.arrayFunction), t && t.arraySizeMethod !== void 0 && (console.warn(`${e}: 'arraySizeMethod' parameter is deprecated since 3.1.0; Use 'sizeOfResultArrayMethod' instead.`), t.sizeOfResultArrayMethod = t.arraySizeMethod);
  }
  /**
   * Loads a function into the registry.
   */
  static loadFunctionUnprotected(e, t, r) {
    const n = vi(t, e), i = n.method;
    if (this.handleDeprecatedMetadata(t, n), Object.prototype.hasOwnProperty.call(e.prototype, i))
      r.set(t, e);
    else
      throw Qr.functionMethodNotFound(i, e.name);
  }
  static *protectedFunctions() {
    for (const [e, t] of this._protectedPlugins)
      t !== void 0 && (yield [e, t]);
  }
  static *protectedPlugins() {
    for (const [, e] of this._protectedPlugins)
      e !== void 0 && (yield e);
  }
  initializePlugins(e) {
    const t = [];
    for (const [r, n] of this.instancePlugins.entries()) {
      let i = t.find((l) => l instanceof n);
      i === void 0 && (i = new n(e), t.push(i));
      const a = vi(r, n), o = a.method;
      this.functions.set(r, [o, i]);
      const u = a.sizeOfResultArrayMethod;
      u !== void 0 && this.arraySizeFunctions.set(r, [u, i]);
    }
  }
  getFunctionPlugin(e) {
    if (!ge.functionIsProtected(e))
      return this.instancePlugins.get(e);
  }
  getFunction(e) {
    const t = this.functions.get(e);
    if (t !== void 0 && this.config.translationPackage.isFunctionTranslated(e)) {
      const [r, n] = t;
      return (i, a) => n[r](i, a);
    } else
      return;
  }
  getArraySizeFunction(e) {
    const t = this.arraySizeFunctions.get(e);
    if (t !== void 0 && this.config.translationPackage.isFunctionTranslated(e)) {
      const [r, n] = t;
      return (i, a) => n[r](i, a);
    } else
      return;
  }
  getMetadata(e) {
    return this.functionsMetadata.get(e);
  }
  getPlugins() {
    const e = /* @__PURE__ */ new Set();
    for (const [t, r] of this.instancePlugins)
      ge.functionIsProtected(t) || e.add(r);
    return Array.from(e);
  }
  getRegisteredFunctionIds() {
    return Array.from(this.functions.keys());
  }
  categorizeFunction(e, t) {
    t.isVolatile && this.volatileFunctions.add(e), t.enableArrayArithmeticForArguments && this.arrayFunctions.add(e), t.doesNotNeedArgumentsToBeComputed && this.functionsWhichDoesNotNeedArgumentsToBeComputed.add(e), t.isDependentOnSheetStructureChange && this.structuralChangeFunctions.add(e), this.functionsMetadata.set(e, t);
  }
}
ge.plugins = /* @__PURE__ */ new Map();
ge._protectedPlugins = /* @__PURE__ */ new Map([["VERSION", El], ["OFFSET", void 0]]);
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var Te;
(function(s) {
  s.GREATER_THAN = "GREATER_THAN", s.GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL", s.LESS_THAN = "LESS_THAN", s.LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL", s.NOT_EQUAL = "NOT_EQUAL", s.EQUAL = "EQUAL";
})(Te || (Te = {}));
const Zn = (s, e) => ({
  operator: s,
  value: e
});
class xg {
  constructor(e) {
    var t, r, n, i;
    this.trueString = (r = (t = e.translationPackage.getMaybeFunctionTranslation("TRUE")) === null || t === void 0 ? void 0 : t.toLowerCase()) !== null && r !== void 0 ? r : "true", this.falseString = (i = (n = e.translationPackage.getMaybeFunctionTranslation("FALSE")) === null || n === void 0 ? void 0 : n.toLowerCase()) !== null && i !== void 0 ? i : "false";
  }
  fromCellValue(e, t) {
    if (typeof e != "string" && typeof e != "boolean" && typeof e != "number")
      return;
    const r = this.parseCriterion(e, t);
    if (r !== void 0)
      return {
        raw: e,
        lambda: Vg(r, t)
      };
  }
  parseCriterion(e, t) {
    if (typeof e == "number" || typeof e == "boolean")
      return Zn(Te.EQUAL, e);
    if (typeof e == "string") {
      const r = bg.exec(e);
      let n, i;
      r ? (i = Pg(r[1]), n = r[2]) : (i = Te.EQUAL, n = e);
      const a = t.coerceToMaybeNumber(n), o = n.toLowerCase() === this.trueString ? !0 : n.toLowerCase() === this.falseString ? !1 : void 0;
      if (i === void 0)
        return;
      if (n === "")
        return Zn(i, null);
      if (a === void 0) {
        if (i === Te.EQUAL || i === Te.NOT_EQUAL)
          return Zn(i, o != null ? o : n);
      } else
        return Zn(i, I(a));
    }
  }
}
const bg = /([<>=]+)(.*)/;
function Pg(s) {
  switch (s) {
    case ">":
      return Te.GREATER_THAN;
    case ">=":
      return Te.GREATER_THAN_OR_EQUAL;
    case "<":
      return Te.LESS_THAN;
    case "<=":
      return Te.LESS_THAN_OR_EQUAL;
    case "<>":
      return Te.NOT_EQUAL;
    case "=":
      return Te.EQUAL;
    default:
      return;
  }
}
const Vg = (s, e) => {
  switch (s.operator) {
    case Te.GREATER_THAN:
      return typeof s.value == "number" ? (t) => typeof t == "number" && e.floatCmp(t, s.value) > 0 : (t) => !1;
    case Te.GREATER_THAN_OR_EQUAL:
      return typeof s.value == "number" ? (t) => typeof t == "number" && e.floatCmp(t, s.value) >= 0 : (t) => !1;
    case Te.LESS_THAN:
      return typeof s.value == "number" ? (t) => typeof t == "number" && e.floatCmp(t, s.value) < 0 : (t) => !1;
    case Te.LESS_THAN_OR_EQUAL:
      return typeof s.value == "number" ? (t) => typeof t == "number" && e.floatCmp(t, s.value) <= 0 : (t) => !1;
    case Te.EQUAL:
      return typeof s.value == "number" ? (t) => {
        if (typeof t == "number")
          return e.floatCmp(t, s.value) === 0;
        if (typeof t == "string") {
          if (t === "")
            return !1;
          const r = e.coerceToMaybeNumber(t);
          return r === void 0 ? !1 : e.floatCmp(r, s.value) === 0;
        } else
          return !1;
      } : typeof s.value == "string" ? e.eqMatcherFunction(s.value) : typeof s.value == "boolean" ? (t) => typeof t == "boolean" && t === s.value : (t) => t === B;
    case Te.NOT_EQUAL:
      return typeof s.value == "number" ? (t) => {
        if (typeof t == "number")
          return e.floatCmp(t, s.value) !== 0;
        if (typeof t == "string") {
          if (t === "")
            return !0;
          const r = e.coerceToMaybeNumber(t);
          return r === void 0 ? !0 : e.floatCmp(r, s.value) !== 0;
        } else
          return !0;
      } : typeof s.value == "string" ? e.neqMatcherFunction(s.value) : typeof s.value == "boolean" ? (t) => typeof t != "boolean" || t !== s.value : (t) => t !== B;
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Dg {
  constructor(e, t, r, n, i, a, o, u, l, c) {
    this.config = e, this.dependencyGraph = t, this.columnSearch = r, this.stats = n, this.arithmeticHelper = i, this.functionRegistry = a, this.namedExpressions = o, this.serialization = u, this.arraySizePredictor = l, this.dateTimeHelper = c, this.equalOp = (d, p) => nt(this.arithmeticHelper.eq, d, p), this.notEqualOp = (d, p) => nt(this.arithmeticHelper.neq, d, p), this.greaterThanOp = (d, p) => nt(this.arithmeticHelper.gt, d, p), this.lessThanOp = (d, p) => nt(this.arithmeticHelper.lt, d, p), this.greaterThanOrEqualOp = (d, p) => nt(this.arithmeticHelper.geq, d, p), this.lessThanOrEqualOp = (d, p) => nt(this.arithmeticHelper.leq, d, p), this.concatOp = (d, p) => nt(this.arithmeticHelper.concat, Ds(d), Ds(p)), this.plusOp = (d, p) => nt(this.arithmeticHelper.addWithEpsilon, this.arithmeticHelper.coerceScalarToNumberOrError(d), this.arithmeticHelper.coerceScalarToNumberOrError(p)), this.minusOp = (d, p) => nt(this.arithmeticHelper.subtract, this.arithmeticHelper.coerceScalarToNumberOrError(d), this.arithmeticHelper.coerceScalarToNumberOrError(p)), this.timesOp = (d, p) => nt(this.arithmeticHelper.multiply, this.arithmeticHelper.coerceScalarToNumberOrError(d), this.arithmeticHelper.coerceScalarToNumberOrError(p)), this.powerOp = (d, p) => nt(this.arithmeticHelper.pow, this.arithmeticHelper.coerceScalarToNumberOrError(d), this.arithmeticHelper.coerceScalarToNumberOrError(p)), this.divOp = (d, p) => nt(this.arithmeticHelper.divide, this.arithmeticHelper.coerceScalarToNumberOrError(d), this.arithmeticHelper.coerceScalarToNumberOrError(p)), this.unaryMinusOp = (d) => Ko(this.arithmeticHelper.unaryMinus, this.arithmeticHelper.coerceScalarToNumberOrError(d)), this.percentOp = (d) => Ko(this.arithmeticHelper.unaryPercent, this.arithmeticHelper.coerceScalarToNumberOrError(d)), this.unaryPlusOp = (d) => this.arithmeticHelper.unaryPlus(d), this.functionRegistry.initializePlugins(this), this.criterionBuilder = new xg(e);
  }
  evaluateAst(e, t) {
    let r = this.evaluateAstWithoutPostprocessing(e, t);
    if (D(r)) {
      if (rl(I(r)))
        return new f(m.NUM, E.NaN);
      r = wa(r, nl(I(r)));
    }
    return r instanceof M && r.height() === 1 && r.width() === 1 && ([[r]] = r.data), Bg(r, t.formulaVertex);
  }
  /**
   * Calculates cell value from formula abstract syntax tree
   *
   * @param {Ast} ast - abstract syntax tree of formula
   * @param {InterpreterState} state - interpreter state
   */
  evaluateAstWithoutPostprocessing(e, t) {
    switch (e.type) {
      case g.EMPTY:
        return B;
      case g.CELL_REFERENCE: {
        const r = e.reference.toSimpleCellAddress(t.formulaAddress);
        return ke(r) ? new f(m.REF, E.BadRef) : this.isSheetValid(e.reference) ? this.dependencyGraph.getCellValue(r) : new f(m.REF, E.SheetRef);
      }
      case g.NUMBER:
      case g.STRING:
        return e.value;
      case g.CONCATENATE_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.concatOp, r, n, t);
      }
      case g.EQUALS_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.equalOp, r, n, t);
      }
      case g.NOT_EQUAL_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.notEqualOp, r, n, t);
      }
      case g.GREATER_THAN_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.greaterThanOp, r, n, t);
      }
      case g.LESS_THAN_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.lessThanOp, r, n, t);
      }
      case g.GREATER_THAN_OR_EQUAL_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.greaterThanOrEqualOp, r, n, t);
      }
      case g.LESS_THAN_OR_EQUAL_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.lessThanOrEqualOp, r, n, t);
      }
      case g.PLUS_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.plusOp, r, n, t);
      }
      case g.MINUS_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.minusOp, r, n, t);
      }
      case g.TIMES_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.timesOp, r, n, t);
      }
      case g.POWER_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.powerOp, r, n, t);
      }
      case g.DIV_OP: {
        const r = this.evaluateAst(e.left, t), n = this.evaluateAst(e.right, t);
        return this.binaryRangeWrapper(this.divOp, r, n, t);
      }
      case g.PLUS_UNARY_OP: {
        const r = this.evaluateAst(e.value, t);
        return this.unaryRangeWrapper(this.unaryPlusOp, r, t);
      }
      case g.MINUS_UNARY_OP: {
        const r = this.evaluateAst(e.value, t);
        return this.unaryRangeWrapper(this.unaryMinusOp, r, t);
      }
      case g.PERCENT_OP: {
        const r = this.evaluateAst(e.value, t);
        return this.unaryRangeWrapper(this.percentOp, r, t);
      }
      case g.FUNCTION_CALL: {
        if (this.config.licenseKeyValidityState !== "valid" && !ge.functionIsProtected(e.procedureName))
          return new f(m.LIC, E.LicenseKey(this.config.licenseKeyValidityState));
        const r = this.functionRegistry.getFunction(e.procedureName);
        return r !== void 0 ? r(e, new Ut(t.formulaAddress, t.arraysFlag || this.functionRegistry.isArrayFunction(e.procedureName), t.formulaVertex)) : new f(m.NAME, E.FunctionName(e.procedureName));
      }
      case g.NAMED_EXPRESSION: {
        const r = this.namedExpressions.nearestNamedExpression(e.expressionName, t.formulaAddress.sheet);
        return r ? this.dependencyGraph.getCellValue(r.address) : new f(m.NAME, E.NamedExpressionName(e.expressionName));
      }
      case g.CELL_RANGE: {
        if (!this.isSheetValid(e.start) || !this.isSheetValid(e.end))
          return new f(m.REF, E.SheetRef);
        if (!this.rangeSpansOneSheet(e))
          return new f(m.REF, E.RangeManySheets);
        const r = F.fromCellRange(e, t.formulaAddress), n = this.dependencyGraph.getArray(r);
        if (n) {
          const i = n.array;
          if (i instanceof un)
            throw new Error("Array should be already computed");
          if (i instanceof f)
            return i;
          if (i instanceof Zr)
            return M.fromRange(i.raw(), r, this.dependencyGraph);
          throw new Error("Unknown array");
        }
        return M.onlyRange(r, this.dependencyGraph);
      }
      case g.COLUMN_RANGE: {
        if (!this.isSheetValid(e.start) || !this.isSheetValid(e.end))
          return new f(m.REF, E.SheetRef);
        if (!this.rangeSpansOneSheet(e))
          return new f(m.REF, E.RangeManySheets);
        const r = Wt.fromColumnRange(e, t.formulaAddress);
        return M.onlyRange(r, this.dependencyGraph);
      }
      case g.ROW_RANGE: {
        if (!this.isSheetValid(e.start) || !this.isSheetValid(e.end))
          return new f(m.REF, E.SheetRef);
        if (!this.rangeSpansOneSheet(e))
          return new f(m.REF, E.RangeManySheets);
        const r = Yt.fromRowRangeAst(e, t.formulaAddress);
        return M.onlyRange(r, this.dependencyGraph);
      }
      case g.PARENTHESIS:
        return this.evaluateAst(e.expression, t);
      case g.ARRAY: {
        let r;
        const n = [];
        for (const i of e.args) {
          let a;
          const o = [];
          for (const l of i) {
            const c = el(this.evaluateAst(l, t)), d = c.height();
            if (a === void 0)
              a = d, o.push(...c.data);
            else if (a === d)
              for (let p = 0; p < d; p++)
                o[p].push(...c.data[p]);
            else
              return new f(m.REF, E.SizeMismatch);
          }
          const u = o[0].length;
          if (r === void 0)
            r = u, n.push(...o);
          else if (r === u)
            n.push(...o);
          else
            return new f(m.REF, E.SizeMismatch);
        }
        return M.onlyValues(n);
      }
      case g.ERROR_WITH_RAW_INPUT:
      case g.ERROR:
        return e.error;
    }
  }
  /**
   * Sheet is valid if:
   * - sheet is undefined OR
   * - sheet is a named expressions store OR
   * - sheet exists in sheet mapping
   * - sheet is not a placeholder
   */
  isSheetValid(e) {
    return e.sheet === void 0 || e.sheet === Xt.SHEET_FOR_WORKBOOK_EXPRESSIONS || this.dependencyGraph.sheetMapping.hasSheetWithId(e.sheet, {
      includePlaceholders: !1
    });
  }
  rangeSpansOneSheet(e) {
    return e.start.sheet === e.end.sheet;
  }
  unaryRangeWrapper(e, t, r) {
    var n;
    if (t instanceof M && !r.arraysFlag && (t = (n = ps(t, r)) !== null && n !== void 0 ? n : new f(m.VALUE, E.ScalarExpected)), t instanceof f)
      return t;
    if (t instanceof M) {
      const i = t.data.map((a) => a.map(e));
      return M.onlyValues(i);
    }
    return e(t);
  }
  binaryRangeWrapper(e, t, r, n) {
    var i, a;
    if (t instanceof M && !n.arraysFlag && (t = (i = ps(t, n)) !== null && i !== void 0 ? i : new f(m.VALUE, E.ScalarExpected)), t instanceof f)
      return t;
    if (r instanceof M && !n.arraysFlag && (r = (a = ps(r, n)) !== null && a !== void 0 ? a : new f(m.VALUE, E.ScalarExpected)), r instanceof f)
      return r;
    if (t instanceof M || r instanceof M) {
      if (!(t instanceof M))
        if (r.isAdHoc()) {
          const c = r.data;
          for (let d = 0; d < c.length; d++)
            for (let p = 0; p < c[0].length; p++)
              c[d][p] = e(t, c[d][p]);
          return M.onlyValues(c);
        } else
          t = M.fromScalar(t);
      if (!(r instanceof M))
        if (t.isAdHoc()) {
          const c = t.data;
          for (let d = 0; d < c.length; d++)
            for (let p = 0; p < c[0].length; p++)
              c[d][p] = e(c[d][p], r);
          return M.onlyValues(c);
        } else
          r = M.fromScalar(r);
      if (t.width() === r.width() && t.height() === r.height()) {
        if (t.isAdHoc()) {
          const c = t.data, d = r.data;
          for (let p = 0; p < c.length; p++)
            for (let N = 0; N < c[0].length; N++)
              c[p][N] = e(c[p][N], d[p][N]);
          return M.onlyValues(c);
        }
        if (r.isAdHoc()) {
          const c = t.data, d = r.data;
          for (let p = 0; p < c.length; p++)
            for (let N = 0; N < c[0].length; N++)
              d[p][N] = e(c[p][N], d[p][N]);
          return M.onlyValues(d);
        }
      }
      const o = Math.max(t.width(), r.width()), u = Math.max(t.height(), r.height()), l = Array(u);
      for (let c = 0; c < u; c++)
        l[c] = Array(o);
      for (let c = 0; c < u; c++) {
        const d = t.height() !== 1 ? c : 0, p = r.height() !== 1 ? c : 0;
        for (let N = 0; N < o; N++) {
          const T = t.width() !== 1 ? N : 0, R = r.width() !== 1 ? N : 0;
          d < t.height() && p < r.height() && T < t.width() && R < r.width() ? l[c][N] = e(t.data[d][T], r.data[p][R]) : l[c][N] = new f(m.NA);
        }
      }
      return M.onlyValues(l);
    }
    return e(t, r);
  }
}
function Ko(s, e) {
  return e instanceof f ? e : s(e);
}
function nt(s, e, t) {
  return e instanceof f ? e : t instanceof f ? t : s(e, t);
}
function Bg(s, e) {
  return s instanceof f && e !== void 0 ? s.attachRootVertex(e) : s;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class kg {
  constructor(e) {
    this.sheet = e, this.transformations = [];
  }
  add(e) {
    this.transformations.push(e);
  }
  performEagerTransformations(e, t) {
    this.transformations.forEach((r) => r.performEagerTransformations(e, t));
  }
  transformSingleAst(e, t) {
    let [r, n] = [e, t];
    return this.transformations.forEach((i) => {
      [r, n] = i.transformSingleAst(r, n);
    }), [r, n];
  }
  isIrreversible() {
    return !0;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Gg {
  constructor(e, t) {
    this.stats = e, this.maxPendingLazyTransformations = t, this.transformations = [], this.versionOffset = 0;
  }
  version() {
    return this.versionOffset + this.transformations.length;
  }
  addTransformation(e) {
    return this.combinedTransformer !== void 0 ? this.combinedTransformer.add(e) : this.transformations.push(e), this.version();
  }
  beginCombinedMode(e) {
    this.combinedTransformer = new kg(e);
  }
  commitCombinedMode() {
    if (this.combinedTransformer === void 0)
      throw Error("Combined mode wasn't started");
    return this.transformations.push(this.combinedTransformer), this.combinedTransformer = void 0, this.version();
  }
  applyTransformations(e, t, r) {
    this.stats.start(P.TRANSFORM_ASTS_POSTPONED);
    const n = this.version();
    for (let a = Math.max(r, this.versionOffset); a < n; a++) {
      const o = this.transformations[a - this.versionOffset];
      o.isIrreversible() && (this.undoRedo.storeDataForVersion(a, t, this.parser.computeHashFromAst(e)), this.parser.rememberNewAst(e));
      const [u, l] = o.transformSingleAst(e, t);
      e = u, t = l;
    }
    const i = this.parser.rememberNewAst(e);
    return this.stats.end(P.TRANSFORM_ASTS_POSTPONED), [i, t, n];
  }
  *getTransformationsFrom(e, t) {
    const r = this.version();
    for (let n = Math.max(e, this.versionOffset); n < r; n++) {
      const i = this.transformations[n - this.versionOffset];
      (!t || t(i)) && (yield i);
    }
  }
  /**
   * Returns true when enough transformations have accumulated to justify the cost
   * of forcing all consumers (FormulaVertex, ColumnIndex) to apply pending changes.
   */
  needsCompaction() {
    return this.transformations.length >= this.maxPendingLazyTransformations;
  }
  /**
   * Compacts the transformations array by discarding all entries that have already
   * been applied by every consumer. Safe to call only after all FormulaVertex and
   * ColumnIndex consumers have been brought up to the current version.
   * After calling, UndoRedo.cleanupOrphanedOldData() must be invoked to remove
   * oldData entries written during forceApplyPostponedTransformations for
   * already-evicted undo entries.
   */
  compact() {
    this.versionOffset += this.transformations.length, this.transformations = [];
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Ot = -1;
function Hg(s, e, {
  searchCoordinate: t,
  orderingDirection: r,
  ifNoMatch: n
}, i) {
  const a = e.start[t], o = t === "col" ? e.effectiveEndColumn(i) : e.effectiveEndRow(i), u = t === "col" ? (p) => I(i.getCellValue(O(e.sheet, p, e.start.row))) : (p) => I(i.getCellValue(O(e.sheet, e.start.col, p))), l = r === "asc" ? (p, N) => Ys(p, N) : (p, N) => -Ys(p, N), c = Wg((p) => l(s, u(p)) >= 0, a, o), d = u(c);
  if (d === s)
    return c - a;
  if (n === "returnLowerBound") {
    if (c === Ot)
      return r === "asc" ? Ot : 0;
    if (typeof d != typeof s)
      return Ot;
    if (r === "asc")
      return c - a;
    const p = c + 1;
    return p <= o ? p - a : Ot;
  }
  if (n === "returnUpperBound") {
    if (c === Ot)
      return r === "asc" ? 0 : Ot;
    if (typeof d != typeof s)
      return Ot;
    if (r === "desc")
      return c - a;
    const p = c + 1;
    return p <= o ? p - a : Ot;
  }
  return Ot;
}
function Wg(s, e, t) {
  let r = e, n = t;
  for (; r < n; ) {
    const i = Math.ceil((r + n) / 2);
    s(i) ? r = i : n = i - 1;
  }
  return r === n && s(r) ? r : Ot;
}
function Ys(s, e) {
  return typeof s == typeof e ? s === B ? 0 : s < e ? -1 : s > e ? 1 : 0 : s === B ? -1 : e === B ? 1 : e instanceof f || typeof s == "number" && typeof e == "string" || typeof s == "number" && typeof e == "boolean" ? -1 : typeof s == "string" && typeof e == "number" ? 1 : typeof s == "string" && typeof e == "boolean" ? -1 : 1;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const jo = -1;
class Rl {
  constructor(e) {
    this.dependencyGraph = e;
  }
  advancedFind(e, t, {
    returnOccurrence: r
  } = {
    returnOccurrence: "first"
  }) {
    const n = t.range, i = n === void 0 ? t.valuesFromTopLeftCorner() : this.dependencyGraph.computeListOfValuesInRange(n), a = r === "first" ? 0 : i.length - 1, o = r === "first" ? (l) => l < i.length : (l) => l >= 0, u = r === "first" ? (l) => l + 1 : (l) => l - 1;
    for (let l = a; o(l); l = u(l))
      if (e(I(i[l])))
        return l;
    return jo;
  }
  basicFind(e, t, r, {
    ordering: n,
    ifNoMatch: i,
    returnOccurrence: a
  }) {
    const o = typeof e == "string" ? En(e) : e, u = t.range;
    return u === void 0 ? this.findNormalizedValue(o, t.valuesFromTopLeftCorner(), i, a) : n === "none" ? this.findNormalizedValue(o, this.dependencyGraph.computeListOfValuesInRange(u), i, a) : Hg(o, u, {
      searchCoordinate: r,
      orderingDirection: n,
      ifNoMatch: i
    }, this.dependencyGraph);
  }
  findNormalizedValue(e, t, r = "returnNotFound", n = "first") {
    const i = t.map(I).map((p) => typeof p == "string" ? En(p) : p);
    if (r === "returnNotFound")
      return n === "first" ? i.indexOf(e) : i.lastIndexOf(e);
    const a = r === "returnLowerBound" ? (p, N) => Ys(p, N) : (p, N) => -Ys(p, N);
    let o = r === "returnLowerBound" ? -1 / 0 : 1 / 0, u = jo;
    const l = n === "first" ? 0 : i.length - 1, c = n === "first" ? (p) => p < i.length : (p) => p >= 0, d = n === "first" ? (p) => p + 1 : (p) => p - 1;
    for (let p = l; c(p); p = d(p)) {
      const N = i[p];
      if (N === e)
        return p;
      a(N, e) > 0 || a(o, N) < 0 && (o = N, u = p);
    }
    return u;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Nl extends Rl {
  constructor(e) {
    super(e), this.dependencyGraph = e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  add(e, t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(e, t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change(e, t, r) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyChanges(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addColumns(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeColumns(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeSheet(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveValues(e, t, r, n) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeValues(e) {
  }
  /**
   * No-op: ColumnBinarySearch reads cell values directly from the dependency graph
   * on every lookup, so it has no cached data that could become stale.
   * Unlike ColumnIndex, which maintains a separate value-to-address index that
   * must be kept in sync with lazy transformations, binary search always operates
   * on the current graph state.
   */
  forceApplyPostponedTransformations() {
  }
  /*
   * WARNING: Finding lower/upper bounds in unordered ranges is not supported. When ordering === 'none', assumes matchExactly === true
   */
  find(e, t, r) {
    return this.basicFind(e, t, "row", r);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Sr {
  constructor(e, t, r) {
    this.dependencyGraph = e, this.config = t, this.stats = r, this.index = /* @__PURE__ */ new Map(), this.transformingService = this.dependencyGraph.lazilyTransformingAstService, this.binarySearchStrategy = new Nl(e);
  }
  add(e, t) {
    if (!(e === B || e instanceof f))
      if (e instanceof M)
        for (const [r, n] of e.entriesFromTopLeftCorner(t))
          this.addSingleCellValue(I(r), n);
      else
        this.addSingleCellValue(e, t);
  }
  remove(e, t) {
    if (e !== void 0)
      if (e instanceof M)
        for (const [r, n] of e.entriesFromTopLeftCorner(t))
          this.removeSingleValue(I(r), n);
      else
        this.removeSingleValue(e, t);
  }
  change(e, t, r) {
    e !== t && (this.remove(e, r), this.add(t, r));
  }
  applyChanges(e) {
    for (const t of e)
      t.oldValue !== void 0 && this.change(I(t.oldValue), I(t.value), t.address);
  }
  moveValues(e, t, r, n) {
    for (const [i, a] of e) {
      const o = um(a, n, t, r);
      this.remove(i, a), this.add(i, o);
    }
  }
  removeValues(e) {
    for (const [t, r] of e)
      this.remove(t, r);
  }
  find(e, t, {
    ordering: r,
    ifNoMatch: n,
    returnOccurrence: i
  }) {
    i == null && (i = r === "none" ? "first" : "last");
    const a = this.findUsingColumnIndex(e, t, i);
    return a !== void 0 ? a : this.binarySearchStrategy.find(e, t, {
      ordering: r,
      ifNoMatch: n,
      returnOccurrence: i
    });
  }
  findUsingColumnIndex(e, t, r) {
    const n = t.range;
    if (n === void 0)
      return;
    this.ensureRecentData(n.sheet, n.start.col, e);
    const i = this.getColumnMap(n.sheet, n.start.col);
    if (!i)
      return -1;
    const a = typeof e == "string" ? En(e) : e, o = i.get(a);
    if (!o || !o.index || o.index.length === 0)
      return;
    const u = Sr.findRowBelongingToRange(o, n, r);
    return u !== void 0 ? u - n.start.row : void 0;
  }
  static findRowBelongingToRange(e, t, r) {
    const n = t.start.row, i = t.end.row, a = r === "first" ? mr(n, e.index, "upperBound") : mr(i, e.index, "lowerBound");
    if (a === -1)
      return;
    const o = e.index[a];
    return o >= n && o <= i ? o : void 0;
  }
  advancedFind(e, t, r = {
    returnOccurrence: "first"
  }) {
    return this.binarySearchStrategy.advancedFind(e, t, r);
  }
  addColumns(e) {
    const t = this.index.get(e.sheet);
    t && t.splice(e.columnStart, 0, ...Array(e.numberOfColumns));
  }
  removeColumns(e) {
    const t = this.index.get(e.sheet);
    t && t.splice(e.columnStart, e.numberOfColumns);
  }
  removeSheet(e) {
    this.index.delete(e);
  }
  /**
   * Forces all ValueIndex entries to apply any pending lazy transformations,
   * bringing every entry up to the current LazilyTransformingAstService version.
   * Must be called before compacting LazilyTransformingAstService.
   */
  forceApplyPostponedTransformations() {
    for (const [e, t] of this.index)
      t.forEach((r, n) => {
        if (r)
          for (const i of r.keys())
            this.ensureRecentData(e, n, i);
      });
  }
  getColumnMap(e, t) {
    this.index.has(e) || this.index.set(e, []);
    const r = this.index.get(e);
    let n = r[t];
    return n || (n = /* @__PURE__ */ new Map(), r[t] = n), n;
  }
  getValueIndex(e, t, r) {
    const n = this.getColumnMap(e, t);
    let i = this.getColumnMap(e, t).get(r);
    return i || (i = {
      version: this.transformingService.version(),
      index: []
    }, n.set(r, i)), i;
  }
  ensureRecentData(e, t, r) {
    const n = this.getValueIndex(e, t, r), i = this.transformingService.version();
    if (n.version === i)
      return;
    const a = this.transformingService.getTransformationsFrom(n.version, (o) => o.sheet === e && (o instanceof Ji || o instanceof ea));
    for (const o of a)
      o instanceof Ji ? this.addRows(t, o.rowsSpan, r) : o instanceof ea && this.removeRows(t, o.rowsSpan, r);
    n.version = i;
  }
  addSingleCellValue(e, t) {
    this.stats.measure(P.BUILD_COLUMN_INDEX, () => {
      this.ensureRecentData(t.sheet, t.col, e), typeof e == "string" && (e = En(e));
      const r = this.getValueIndex(t.sheet, t.col, e);
      Sr.addValue(r, t.row);
    });
  }
  removeSingleValue(e, t) {
    this.stats.measure(P.BUILD_COLUMN_INDEX, () => {
      this.ensureRecentData(t.sheet, t.col, e);
      const r = this.getColumnMap(t.sheet, t.col);
      typeof e == "string" && (e = En(e));
      const n = r.get(e);
      if (!n)
        return;
      const i = mr(t.row, n.index);
      i > -1 && n.index.splice(i, 1), n.index.length === 0 && r.delete(e), r.size === 0 && delete this.index.get(t.sheet)[t.col];
    });
  }
  addRows(e, t, r) {
    const n = this.getValueIndex(t.sheet, e, r);
    Sr.shiftRows(n, t.rowStart, t.numberOfRows);
  }
  removeRows(e, t, r) {
    const n = this.getValueIndex(t.sheet, e, r);
    Sr.removeRowsFromValues(n, t), Sr.shiftRows(n, t.rowEnd + 1, -t.numberOfRows);
  }
  static addValue(e, t) {
    const r = mr(t, e.index, "lowerBound");
    e.index[r] === t || e.index.splice(r + 1, 0, t);
  }
  static removeRowsFromValues(e, t) {
    const r = mr(t.rowStart, e.index, "upperBound"), n = mr(t.rowEnd, e.index, "lowerBound");
    r > -1 && n > -1 && r <= n && e.index[r] <= t.rowEnd && e.index.splice(r, n - r + 1);
  }
  static shiftRows(e, t, r) {
    const n = mr(t, e.index, "upperBound");
    if (n !== -1)
      for (let i = n; i < e.index.length; ++i)
        e.index[i] += r;
  }
}
function mr(s, e, t = "upperBound") {
  let r = 0, n = e.length - 1;
  for (; r <= n; ) {
    const o = Math.floor((r + n) / 2);
    if (s > e[o])
      r = o + 1;
    else if (s < e[o])
      n = o - 1;
    else
      return o;
  }
  const i = t === "lowerBound" ? n : r;
  return i >= 0 && i <= e.length ? i : -1;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function Yg(s, e, t) {
  return e.useColumnIndex ? new Sr(s, e, t) : new Nl(s);
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class zg {
  constructor(e) {
    this.config = e;
    const t = this.config.thousandSeparator === "." ? `\\${this.config.thousandSeparator}` : this.config.thousandSeparator, r = this.config.decimalSeparator === "." ? `\\${this.config.decimalSeparator}` : this.config.decimalSeparator;
    this.numberPattern = new RegExp(`^([+-]?((${r}\\d+)|(\\d+(${t}\\d{3,})*(${r}\\d*)?)))([eE][+-]?\\d+)?$`), this.allThousandSeparatorsRegex = new RegExp(`${t}`, "g");
  }
  numericStringToMaybeNumber(e) {
    if (this.numberPattern.test(e)) {
      const t = this.numericStringToNumber(e);
      return isNaN(t) ? void 0 : t;
    }
  }
  numericStringToNumber(e) {
    const t = e.replace(this.allThousandSeparatorsRegex, "").replace(this.config.decimalSeparator, ".");
    return Number(t);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Pa {
  constructor(e, t, r) {
    this.dependencyGraph = e, this.unparser = t, this.exporter = r;
  }
  getCellHyperlink(e) {
    const t = this.dependencyGraph.getCell(e);
    if (t instanceof Lt) {
      const r = t.getFormula(this.dependencyGraph.lazilyTransformingAstService);
      if (r.procedureName === "HYPERLINK")
        return r.hyperlink;
    }
  }
  getCellFormula(e, t) {
    const r = this.dependencyGraph.getCell(e);
    if (r instanceof Lt) {
      const n = r.getFormula(this.dependencyGraph.lazilyTransformingAstService);
      return t = t != null ? t : e, this.unparser.unparse(n, t);
    } else if (r instanceof le) {
      const n = r.getAddress(this.dependencyGraph.lazilyTransformingAstService);
      if (n.row !== e.row || n.col !== e.col || n.sheet !== e.sheet)
        return;
      t = t != null ? t : e;
      const i = r.getFormula(this.dependencyGraph.lazilyTransformingAstService);
      if (i !== void 0)
        return this.unparser.unparse(i, t);
    } else if (r instanceof Xr)
      return r.getFormula();
  }
  getCellSerialized(e, t) {
    var r;
    return (r = this.getCellFormula(e, t)) !== null && r !== void 0 ? r : this.getRawValue(e);
  }
  getCellValue(e) {
    return this.exporter.exportValue(this.dependencyGraph.getScalarValue(e));
  }
  getRawValue(e) {
    return this.dependencyGraph.getRawValue(e);
  }
  getSheetValues(e) {
    return this.genericSheetGetter(e, (t) => this.getCellValue(t));
  }
  getSheetFormulas(e) {
    return this.genericSheetGetter(e, (t) => this.getCellFormula(t));
  }
  genericSheetGetter(e, t) {
    const r = this.dependencyGraph.getSheetHeight(e), n = this.dependencyGraph.getSheetWidth(e), i = new Array(r);
    for (let a = 0; a < r; a++) {
      i[a] = new Array(n);
      for (let o = 0; o < n; o++) {
        const u = O(e, o, a);
        i[a][o] = t(u);
      }
      for (let o = n - 1; o >= 0 && (i[a][o] === null || i[a][o] === void 0); o--)
        i[a].pop();
    }
    for (let a = r - 1; a >= 0 && i[a].length === 0; a--)
      i.pop();
    return i;
  }
  genericAllSheetsGetter(e) {
    const t = {};
    for (const r of this.dependencyGraph.sheetMapping.iterateSheetNames()) {
      const n = this.dependencyGraph.sheetMapping.getSheetIdOrThrowError(r);
      t[r] = e(n);
    }
    return t;
  }
  getSheetSerialized(e) {
    return this.genericSheetGetter(e, (t) => this.getCellSerialized(t));
  }
  getAllSheetsValues() {
    return this.genericAllSheetsGetter((e) => this.getSheetValues(e));
  }
  getAllSheetsFormulas() {
    return this.genericAllSheetsGetter((e) => this.getSheetFormulas(e));
  }
  getAllSheetsSerialized() {
    return this.genericAllSheetsGetter((e) => this.getSheetSerialized(e));
  }
  getAllNamedExpressionsSerialized() {
    const e = [];
    let t = 0;
    for (const r of this.dependencyGraph.sheetMapping.iterateSheetNames()) {
      const n = this.dependencyGraph.sheetMapping.getSheetIdOrThrowError(r);
      e[n] = t, t++;
    }
    return this.dependencyGraph.namedExpressions.getAllNamedExpressions().map((r) => ({
      name: r.expression.displayName,
      expression: this.getCellSerialized(r.expression.address),
      scope: r.scope !== void 0 ? e[r.scope] : void 0,
      options: r.expression.options
    }));
  }
  withNewConfig(e, t) {
    const r = new Fh(e, this.dependencyGraph.sheetMapping, t);
    return new Pa(this.dependencyGraph, r, this.exporter);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Jn {
  static buildFromSheets(e, t = {}, r = []) {
    const n = new Qe(t);
    return this.buildEngine(n, e, r);
  }
  static buildFromSheet(e, t = {}, r = []) {
    const n = new Qe(t), i = n.translationPackage.getUITranslation(In.NEW_SHEET_PREFIX) + "1";
    return this.buildEngine(n, {
      [i]: e
    }, r);
  }
  static buildEmpty(e = {}, t = []) {
    return this.buildEngine(new Qe(e), {}, t);
  }
  static rebuildWithConfig(e, t, r, n) {
    return this.buildEngine(e, t, r, n);
  }
  static buildEngine(e, t = {}, r = [], n = e.useStats ? new bh() : new Hp()) {
    n.start(P.BUILD_ENGINE_TOTAL);
    const i = new Xt(), a = new ge(e), o = new Gg(n, e.maxPendingLazyTransformations), u = xa.buildEmpty(o, e, a, i, n), l = Yg(u, e, n), c = u.sheetMapping, d = u.addressMapping;
    for (const K in t)
      if (Object.prototype.hasOwnProperty.call(t, K)) {
        const yt = t[K];
        Qh(yt);
        const Xe = bs(yt);
        if (Xe.height > e.maxRows || Xe.width > e.maxColumns)
          throw new yr();
        const vt = c.addSheet(K);
        d.addSheetAndSetStrategyBasedOnBoundaries(vt, Xe, {
          throwIfSheetAlreadyExists: !0
        });
      }
    const p = new mn(e, a, u.sheetReferenceRegistrar.ensureSheetRegistered.bind(u.sheetReferenceRegistrar));
    o.parser = p;
    const N = new Fh(e, c, i), T = new Lm(e), R = new zg(e), S = new fm(e, T, R), A = new Zm(e, T, R), y = new Tm(e, a), v = new ag(e, u, l, A, p, n, o, i, y), w = new Mg(e, v);
    o.undoRedo = w;
    const ee = new Jm(e, u, v), Z = new wg(e, v, w, ee, u, l, p, A, o, i), J = new Lg(e, i, c, o), ye = new Pa(u, N, J), me = new Dg(e, u, l, n, S, a, i, ye, y, T);
    n.measure(P.GRAPH_BUILD, () => {
      new Fg(u, l, p, A, n, y).buildGraph(t, n);
    }), r.forEach((K) => {
      Z.ensureItIsPossibleToAddNamedExpression(K.name, K.expression, K.scope), Z.operations.addNamedExpression(K.name, K.expression, K.scope, K.options);
    });
    const ue = new _g(e, n, me, o, u, l);
    return ue.run(), n.end(P.BUILD_ENGINE_TOTAL), {
      config: e,
      stats: n,
      dependencyGraph: u,
      columnSearch: l,
      parser: p,
      unparser: N,
      cellContentParser: A,
      evaluator: ue,
      lazilyTransformingAstService: o,
      crudOperations: Z,
      exporter: J,
      namedExpressions: i,
      serialization: ye,
      functionRegistry: a
    };
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function Xg(s) {
  for (const [e, t] of Object.entries(s))
    t instanceof Function ? s[e] = $g(t) : delete s[e];
}
function $g(s) {
  return () => {
    throw new Error(`The "${s}" method cannot be called because this HyperFormula instance has been destroyed`);
  };
}
var es = { exports: {} }, qo;
function Kg() {
  if (qo) return es.exports;
  qo = 1;
  function s() {
  }
  return s.prototype = {
    on: function(e, t, r) {
      var n = this.e || (this.e = {});
      return (n[e] || (n[e] = [])).push({
        fn: t,
        ctx: r
      }), this;
    },
    once: function(e, t, r) {
      var n = this;
      function i() {
        n.off(e, i), t.apply(r, arguments);
      }
      return i._ = t, this.on(e, i, r);
    },
    emit: function(e) {
      var t = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, i = r.length;
      for (n; n < i; n++)
        r[n].fn.apply(r[n].ctx, t);
      return this;
    },
    off: function(e, t) {
      var r = this.e || (this.e = {}), n = r[e], i = [];
      if (n && t)
        for (var a = 0, o = n.length; a < o; a++)
          n[a].fn !== t && n[a].fn._ !== t && i.push(n[a]);
      return i.length ? r[e] = i : delete r[e], this;
    }
  }, es.exports = s, es.exports.TinyEmitter = s, es.exports;
}
var jg = Kg();
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var Mt;
(function(s) {
  s.SheetAdded = "sheetAdded", s.SheetRemoved = "sheetRemoved", s.SheetRenamed = "sheetRenamed", s.NamedExpressionAdded = "namedExpressionAdded", s.NamedExpressionRemoved = "namedExpressionRemoved", s.ValuesUpdated = "valuesUpdated", s.EvaluationSuspended = "evaluationSuspended", s.EvaluationResumed = "evaluationResumed";
})(Mt || (Mt = {}));
class qg extends jg.TinyEmitter {
  emit(e, ...t) {
    return super.emit(e, ...t), this;
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Me {
  /**
   * Constructor
   *
   * @internal
   */
  constructor(e, t, r, n, i, a, o, u, l, c, d, p, N, T) {
    this._config = e, this._stats = t, this._dependencyGraph = r, this._columnSearch = n, this._parser = i, this._unparser = a, this._cellContentParser = o, this._evaluator = u, this._lazilyTransformingAstService = l, this._crudOperations = c, this._exporter = d, this._namedExpressions = p, this._serialization = N, this._functionRegistry = T, this._emitter = new qg(), this._evaluationSuspended = !1;
  }
  /**
   * Returns all of HyperFormula's default [configuration options](/guide/configuration-options.md).
   *
   * @example
   * ```js
   * // returns all default configuration options
   * const defaultConfig = HyperFormula.defaultConfig;
   * ```
   *
   * @category Static Accessors
   */
  static get defaultConfig() {
    return Qg();
  }
  /**
   * Calls the `graph` method on the dependency graph.
   * Allows for executing `graph` directly, without a need to refer to `dependencyGraph`.
   *
   * @internal
   */
  get graph() {
    return this.dependencyGraph.graph;
  }
  /**
   * Calls the `rangeMapping` method on the dependency graph.
   * Allows for executing `rangeMapping` directly, without a need to refer to `dependencyGraph`.
   *
   * @internal
   */
  get rangeMapping() {
    return this.dependencyGraph.rangeMapping;
  }
  /**
   * Calls the `arrayMapping` method on the dependency graph.
   * Allows for executing `arrayMapping` directly, without a need to refer to `dependencyGraph`.
   *
   * @internal
   */
  get arrayMapping() {
    return this.dependencyGraph.arrayMapping;
  }
  /**
   * Calls the `sheetMapping` method on the dependency graph.
   * Allows for executing `sheetMapping` directly, without a need to refer to `dependencyGraph`.
   *
   * @internal
   */
  get sheetMapping() {
    return this.dependencyGraph.sheetMapping;
  }
  /**
   * Calls the `addressMapping` method on the dependency graph.
   * Allows for executing `addressMapping` directly, without a need to refer to `dependencyGraph`.
   *
   * @internal
   */
  get addressMapping() {
    return this.dependencyGraph.addressMapping;
  }
  /** @internal */
  get dependencyGraph() {
    return this._dependencyGraph;
  }
  /** @internal */
  get evaluator() {
    return this._evaluator;
  }
  /** @internal */
  get columnSearch() {
    return this._columnSearch;
  }
  /** @internal */
  get lazilyTransformingAstService() {
    return this._lazilyTransformingAstService;
  }
  /**
   * Returns state of the validity of the license key.
   *
   * @internal
   */
  get licenseKeyValidityState() {
    return this._config.licenseKeyValidityState;
  }
  /**
   * Builds the engine for a sheet from a two-dimensional array representation.
   * The engine is created with a single sheet.
   * Can be configured with the optional second parameter that represents a [[ConfigParams]].
   * If not specified, the engine will be built with the default configuration.
   *
   * @param {Sheet} sheet - two-dimensional array representation of sheet
   * @param {Partial<ConfigParams>} configInput - engine configuration
   * @param {SerializedNamedExpression[]} namedExpressions - starting named expressions
   *
   * @throws [[SheetSizeLimitExceededError]] when sheet size exceeds the limits
   * @throws [[InvalidArgumentsError]] when sheet is not an array of arrays
   * @throws [[FunctionPluginValidationError]] when plugin class definition is not consistent with metadata
   *
   * @example
   * ```js
   * // data represented as an array
   * const sheetData = [
   *  ['0', '=SUM(1, 2, 3)', '52'],
   *  ['=SUM(A1:C1)', '', '=A1'],
   *  ['2', '=SUM(A1:C1)', '=theUltimateQuestionOfLife'],
   * ];
   *
   * const namedExpressions = [
   *  {
   *    name: 'theUltimateQuestionOfLife',
   *    expression: '=42',
   *  },
   * ];
   *
   * // method with optional config parameter maxColumns
   * const hfInstance = HyperFormula.buildFromArray(sheetData, { maxColumns: 1000 }, namedExpressions);
   * ```
   *
   * @category Factories
   */
  static buildFromArray(e, t = {}, r = []) {
    return this.buildFromEngineState(Jn.buildFromSheet(e, t, r));
  }
  /**
   * Builds the engine from an object containing multiple sheets with names.
   * The engine is created with one or more sheets.
   * Can be configured with the optional second parameter that represents a [[ConfigParams]].
   * If not specified the engine will be built with the default configuration.
   *
   * @param {Sheet} sheets - object with sheets definition
   * @param {Partial<ConfigParams>} configInput - engine configuration
   * @param {SerializedNamedExpression[]} namedExpressions - starting named expressions
   *
   * @throws [[SheetSizeLimitExceededError]] when sheet size exceeds the limits
   * @throws [[InvalidArgumentsError]] when any sheet is not an array of arrays
   * @throws [[FunctionPluginValidationError]] when plugin class definition is not consistent with metadata
   *
   * @example
   * ```js
   * // data represented as an object with sheets: Sheet1 and Sheet2
   * const sheetData = {
   *  'Sheet1': [
   *    ['1', '', '=Sheet2!$A1'],
   *    ['', '2', '=SUM(1, 2, 3)'],
   *    ['=Sheet2!$A2', '2', ''],
   *   ],
   *  'Sheet2': [
   *    ['', '4', '=Sheet1!$B1'],
   *    ['', '8', '=SUM(9, 3, 3)'],
   *    ['=Sheet1!$B1', '2', '=theUltimateQuestionOfLife'],
   *   ],
   * };
   *
   * const namedExpressions = [
   *  {
   *    name: 'theUltimateQuestionOfLife',
   *    expression: '=42',
   *  },
   * ];
   *
   * // method with optional config parameter useColumnIndex
   * const hfInstance = HyperFormula.buildFromSheets(sheetData, { useColumnIndex: true }, namedExpressions);
   * ```
   *
   * @category Factories
   */
  static buildFromSheets(e, t = {}, r = []) {
    return this.buildFromEngineState(Jn.buildFromSheets(e, t, r));
  }
  /**
   * Builds an empty engine instance.
   * Can be configured with the optional parameter that represents a [[ConfigParams]].
   * If not specified the engine will be built with the default configuration.
   *
   * @param {Partial<ConfigParams>} configInput - engine configuration
   * @param {SerializedNamedExpression[]} namedExpressions - starting named expressions
   *
   * @example
   * ```js
   * const namedExpressions = [
   *  {
   *    name: 'theUltimateQuestionOfLife',
   *    expression: '=42',
   *  },
   * ];
   *
   * // build with no initial data and with optional config parameter maxColumns
   * const hfInstance = HyperFormula.buildEmpty({ maxColumns: 1000 }, namedExpressions);
   * ```
   *
   * @category Factories
   */
  static buildEmpty(e = {}, t = []) {
    return this.buildFromEngineState(Jn.buildEmpty(e, t));
  }
  /**
   * Returns registered language from its code string.
   *
   * For more information, see the [Localizing functions guide](/guide/localizing-functions.md).
   *
   * @param {string} languageCode - code string of the translation package
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[LanguageNotRegisteredError]] when trying to retrieve not registered language
   *
   * @example
   * ```js
   * // return registered language
   * const language = HyperFormula.getLanguage('enGB');
   * ```
   *
   * @category Static Methods
   */
  static getLanguage(e) {
    C(e, "string", "languageCode");
    const t = this.registeredLanguages.get(e);
    if (t === void 0)
      throw new Yi();
    return t;
  }
  /**
   * Registers language under given code string.
   *
   * For more information, see the [Localizing functions guide](/guide/localizing-functions.md).
   *
   * @param {string} languageCode - code string of the translation package
   * @param {RawTranslationPackage} languagePackage - translation package to be registered
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[ProtectedFunctionTranslationError]] when trying to register translation for protected function
   * @throws [[LanguageAlreadyRegisteredError]] when given language is already registered
   *
   * @example
   * ```js
   * // return registered language
   * HyperFormula.registerLanguage('enUS', enUS);
   * const engine = HyperFormula.buildEmpty({language: 'enUS'});
   * ```
   *
   * @category Static Methods
   */
  static registerLanguage(e, t) {
    if (C(e, "string", "languageCode"), this.registeredLanguages.has(e))
      throw new jh();
    this.registeredLanguages.set(e, Jp(t));
  }
  /**
   * Unregisters language that is registered under given code string.
   *
   * For more information, see the [Localizing functions guide](/guide/localizing-functions.md).
   *
   * @param {string} languageCode - code string of the translation package
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[LanguageNotRegisteredError]] when given language is not registered
   *
   * @example
   * ```js
   * // register the language for the instance
   * HyperFormula.registerLanguage('plPL', plPL);
   *
   * // unregister plPL
   * HyperFormula.unregisterLanguage('plPL');
   * ```
   *
   * @category Static Methods
   */
  static unregisterLanguage(e) {
    if (C(e, "string", "languageCode"), this.registeredLanguages.has(e))
      this.registeredLanguages.delete(e);
    else
      throw new Yi();
  }
  /**
   * Returns all registered languages codes.
   *
   * @example
   * ```js
   * // should return all registered language codes: ['enGB', 'plPL']
   * const registeredLanguages = HyperFormula.getRegisteredLanguagesCodes();
   * ```
   *
   * @category Static Methods
   */
  static getRegisteredLanguagesCodes() {
    return Array.from(this.registeredLanguages.keys());
  }
  /**
   * Registers all functions in a given plugin with optional translations.
   *
   * For more information, see the [Custom functions guide](/guide/custom-functions.md).
   *
   * Note: FunctionPlugins must be registered prior to the creation of HyperFormula instances in which they are used.
   * HyperFormula instances created prior to the registration of a FunctionPlugin are unable to access the FunctionPlugin.
   * Registering a FunctionPlugin with [[custom-functions]] requires the translations parameter.
   *
   * @param {FunctionPluginDefinition} plugin - plugin class
   * @param {FunctionTranslationsPackage} translations - optional package of function names translations
   *
   * @throws [[FunctionPluginValidationError]] when plugin class definition is not consistent with metadata
   * @throws [[ProtectedFunctionTranslationError]] when trying to register translation for protected function
   *
   * @example
   * ```js
   * // import your own plugin
   * import { MyExamplePlugin } from './file_with_your_plugin';
   *
   * // register the plugin
   * HyperFormula.registerFunctionPlugin(MyExamplePlugin);
   * ```
   *
   * @category Static Methods
   */
  static registerFunctionPlugin(e, t) {
    ge.registerFunctionPlugin(e, t);
  }
  /**
   * Unregisters all functions defined in given plugin.
   *
   * For more information, see the [Custom functions guide](/guide/custom-functions.md).
   *
   * Note: This method does not affect the existing HyperFormula instances.
   *
   * @param {FunctionPluginDefinition} plugin - plugin class
   *
   * @example
   * ```js
   * // get the class of a plugin
   * const registeredPluginClass = HyperFormula.getFunctionPlugin('EXAMPLE');
   *
   * // unregister all functions defined in a plugin of ID 'EXAMPLE'
   * HyperFormula.unregisterFunctionPlugin(registeredPluginClass);
   * ```
   *
   * @category Static Methods
   */
  static unregisterFunctionPlugin(e) {
    ge.unregisterFunctionPlugin(e);
  }
  /**
   * Registers a function with a given id if such exists in a plugin.
   *
   * For more information, see the [Custom functions guide](/guide/custom-functions.md).
   *
   * Note: This method does not affect the existing HyperFormula instances.
   *
   * @param {string} functionId - function id, e.g., 'SUMIF'
   * @param {FunctionPluginDefinition} plugin - plugin class
   * @param {FunctionTranslationsPackage} translations - translations for the function name
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[FunctionPluginValidationError]] when function with a given id does not exist in plugin or plugin class definition is not consistent with metadata
   * @throws [[ProtectedFunctionTranslationError]] when trying to register translation for protected function
   *
   * @example
   * ```js
   * // import your own plugin
   * import { MyExamplePlugin } from './file_with_your_plugin';
   *
   * // register a function
   * HyperFormula.registerFunction('EXAMPLE', MyExamplePlugin);
   * ```
   *
   * @category Static Methods
   */
  static registerFunction(e, t, r) {
    C(e, "string", "functionId"), ge.registerFunction(e, t, r);
  }
  /**
   * Unregisters a function with a given id.
   *
   * For more information, see the [Custom functions guide](/guide/custom-functions.md).
   *
   * Note: This method does not affect the existing HyperFormula instances.
   *
   * @param {string} functionId - function id, e.g., 'SUMIF'
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * // import your own plugin
   * import { MyExamplePlugin } from './file_with_your_plugin';
   *
   * // register a function
   * HyperFormula.registerFunction('EXAMPLE', MyExamplePlugin);
   *
   * // unregister a function
   * HyperFormula.unregisterFunction('EXAMPLE');
   * ```
   *
   * @category Static Methods
   */
  static unregisterFunction(e) {
    C(e, "string", "functionId"), ge.unregisterFunction(e);
  }
  /**
   * Clears function registry.
   *
   * Note: This method does not affect the existing HyperFormula instances.
   *
   * @example
   * ```js
   * HyperFormula.unregisterAllFunctions();
   * ```
   *
   * @category Static Methods
   */
  static unregisterAllFunctions() {
    ge.unregisterAll();
  }
  /**
   * Returns translated names of all registered functions for a given language
   *
   * @param {string} code - language code
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * // return a list of function names registered for enGB
   * const allNames = HyperFormula.getRegisteredFunctionNames('enGB');
   * ```
   *
   * @category Static Methods
   */
  static getRegisteredFunctionNames(e) {
    C(e, "string", "code");
    const t = ge.getRegisteredFunctionIds();
    return this.getLanguage(e).getFunctionTranslations(t);
  }
  /**
   * Returns class of a plugin used by function with given id
   *
   * For more information, see the [Custom functions guide](/guide/custom-functions.md).
   *
   * @param {string} functionId - id of a function, e.g., 'SUMIF'
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * // import your own plugin
   * import { MyExamplePlugin } from './file_with_your_plugin';
   *
   * // register a plugin
   * HyperFormula.registerFunctionPlugin(MyExamplePlugin);
   *
   * // return the class of a given plugin
   * const myFunctionClass = HyperFormula.getFunctionPlugin('EXAMPLE');
   * ```
   *
   * @category Static Methods
   */
  static getFunctionPlugin(e) {
    return C(e, "string", "functionId"), ge.getFunctionPlugin(e);
  }
  /**
   * Returns classes of all plugins registered in HyperFormula.
   *
   * @example
   * ```js
   * // return classes of all plugins
   * const allClasses = HyperFormula.getAllFunctionPlugins();
   * ```
   *
   * @category Static Methods
   */
  static getAllFunctionPlugins() {
    return ge.getPlugins();
  }
  /**
   * @internal
   */
  static buildFromEngineState(e) {
    return new Me(e.config, e.stats, e.dependencyGraph, e.columnSearch, e.parser, e.unparser, e.cellContentParser, e.evaluator, e.lazilyTransformingAstService, e.crudOperations, e.exporter, e.namedExpressions, e.serialization, e.functionRegistry);
  }
  /**
   * Returns the cell value of a given address.
   * Applies rounding and post-processing.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[ExpectedValueOfTypeError]] when cellAddress is of incorrect type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(1, 2, 3)', '2'],
   * ]);
   *
   * // get value of A1 cell, should be '6'
   * const A1Value = hfInstance.getCellValue({ sheet: 0, col: 0, row: 0 });
   *
   * // get value of B1 cell, should be '2'
   * const B1Value = hfInstance.getCellValue({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellValue(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    return this.ensureEvaluationIsNotSuspended(), this._serialization.getCellValue(e);
  }
  /**
   * Returns a normalized formula string from the cell of a given address or `undefined` for an address that does not exist and empty values.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] when cellAddress is of incorrect type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(1, 2, 3)', '0'],
   * ]);
   *
   * // should return a normalized A1 cell formula: '=SUM(1, 2, 3)'
   * const A1Formula = hfInstance.getCellFormula({ sheet: 0, col: 0, row: 0 });
   *
   * // should return a normalized B1 cell formula: 'undefined'
   * const B1Formula = hfInstance.getCellFormula({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellFormula(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    return this._serialization.getCellFormula(e);
  }
  /**
   * Returns the `HYPERLINK` url for a cell of a given address or `undefined` for an address that does not exist or a cell that is not `HYPERLINK`
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] when cellAddress is of incorrect type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=HYPERLINK("https://hyperformula.handsontable.com/", "HyperFormula")', '0'],
   * ]);
   *
   * // should return url of 'HYPERLINK': https://hyperformula.handsontable.com/
   * const A1Hyperlink = hfInstance.getCellHyperlink({ sheet: 0, col: 0, row: 0 });
   *
   * // should return 'undefined' for a cell that is not 'HYPERLINK'
   * const B1Hyperlink = hfInstance.getCellHyperlink({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellHyperlink(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    return this.ensureEvaluationIsNotSuspended(), this._serialization.getCellHyperlink(e);
  }
  /**
   * Returns [[RawCellContent]] with a serialized content of the cell of a given address: either a cell formula, an explicit value, or an error.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   * @throws [[ExpectedValueOfTypeError]] when cellAddress is of incorrect type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(1, 2, 3)', '0'],
   * ]);
   *
   * // should return serialized content of A1 cell: '=SUM(1, 2, 3)'
   * const cellA1Serialized = hfInstance.getCellSerialized({ sheet: 0, col: 0, row: 0 });
   *
   * // should return serialized content of B1 cell: '0'
   * const cellB1Serialized = hfInstance.getCellSerialized({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellSerialized(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    return this.ensureEvaluationIsNotSuspended(), this._serialization.getCellSerialized(e);
  }
  /**
   * Returns an array of arrays of [[CellValue]] with values of all cells from [[Sheet]].
   * Applies rounding and post-processing.
   *
   * @param {number} sheetId - sheet ID number
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['0', '=SUM(1, 2, 3)', '=A1'],
   *  ['1', '=TEXT(A2, "0.0%")', '=C1'],
   *  ['2', '=SUM(A1:C1)', '=C1'],
   * ]);
   *
   * // should return all values of a sheet: [[0, 6, 0], [1, '1.0%', 0], [2, 6, 0]]
   * const sheetValues = hfInstance.getSheetValues(0);
   * ```
   *
   * @category Sheets
   */
  getSheetValues(e) {
    return C(e, "number", "sheetId"), this.ensureEvaluationIsNotSuspended(), this._serialization.getSheetValues(e);
  }
  /**
   * Returns an array with normalized formula strings from [[Sheet]] or `undefined` for a cells that have no value.
   *
   * @param {SimpleCellAddress} sheetId - sheet ID number
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['0', '=SUM(1, 2, 3)', '=A1'],
   *  ['1', '=TEXT(A2, "0.0%")', '=C1'],
   *  ['2', '=SUM(A1:C1)', '=C1'],
   * ]);
   *
   * // should return all formulas of a sheet:
   * // [
   * //  [undefined, '=SUM(1, 2, 3)', '=A1'],
   * //  [undefined, '=TEXT(A2, "0.0%")', '=C1'],
   * //  [undefined, '=SUM(A1:C1)', '=C1'],
   * // ];
   * const sheetFormulas = hfInstance.getSheetFormulas(0);
   * ```
   *
   * @category Sheets
   */
  getSheetFormulas(e) {
    return C(e, "number", "sheetId"), this._serialization.getSheetFormulas(e);
  }
  /**
   * Returns an array of arrays of [[RawCellContent]] with serialized content of cells from [[Sheet]], either a cell formula or an explicit value.
   *
   * @param {SimpleCellAddress} sheetId - sheet ID number
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['0', '=SUM(1, 2, 3)', '=A1'],
   *  ['1', '=TEXT(A2, "0.0%")', '=C1'],
   *  ['2', '=SUM(A1:C1)', '=C1'],
   * ]);
   *
   * // should return:
   * // [
   * //  ['0', '=SUM(1, 2, 3)', '=A1'],
   * //  ['1', '=TEXT(A2, "0.0%")', '=C1'],
   * //  ['2', '=SUM(A1:C1)', '=C1'],
   * // ];
   * const serializedContent = hfInstance.getSheetSerialized(0);
   * ```
   *
   * @category Sheets
   */
  getSheetSerialized(e) {
    return C(e, "number", "sheetId"), this.ensureEvaluationIsNotSuspended(), this._serialization.getSheetSerialized(e);
  }
  /**
   * Returns a map containing dimensions of all sheets for the engine instance represented as a key-value pairs where keys are sheet IDs and dimensions are returned as numbers, width and height respectively.
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *   Sheet1: [
   *    ['1', '2', '=Sheet2!$A1'],
   *   ],
   *   Sheet2: [
   *    ['3'],
   *    ['4'],
   *   ],
   * });
   *
   * // should return the dimensions of all sheets:
   * // { Sheet1: { width: 3, height: 1 }, Sheet2: { width: 1, height: 2 } }
   * const allSheetsDimensions = hfInstance.getAllSheetsDimensions();
   * ```
   *
   * @category Sheets
   */
  getAllSheetsDimensions() {
    return this._serialization.genericAllSheetsGetter((e) => this.getSheetDimensions(e));
  }
  /**
   * Returns dimensions of a specified sheet.
   * The sheet dimensions is represented with numbers: width and height.
   *
   * Note: Due to the memory optimizations, some of the empty bottom rows and rightmost columns are not counted to the dimensions.
   *
   * @param {number} sheetId - sheet ID number
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *    ['1', '2', '=Sheet2!$A1'],
   * ]);
   *
   * // should return provided sheet's dimensions: { width: 3, height: 1 }
   * const sheetDimensions = hfInstance.getSheetDimensions(0);
   * ```
   *
   * @category Sheets
   */
  getSheetDimensions(e) {
    return C(e, "number", "sheetId"), {
      width: this.dependencyGraph.getSheetWidth(e),
      height: this.dependencyGraph.getSheetHeight(e)
    };
  }
  /**
   * Returns values of all sheets in a form of an object which property keys are strings and values are 2D arrays of [[CellValue]].
   *
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '=A1+10', '3'],
   * ]);
   *
   * // should return all sheets values: { Sheet1: [ [ 1, 11, 3 ] ] }
   * const allSheetsValues = hfInstance.getAllSheetsValues();
   * ```
   *
   * @category Sheets
   */
  getAllSheetsValues() {
    return this.ensureEvaluationIsNotSuspended(), this._serialization.getAllSheetsValues();
  }
  /**
   * Returns formulas of all sheets in a form of an object which property keys are strings and values are 2D arrays of strings or possibly `undefined` when the call does not contain a formula.
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2', '=A1+10'],
   * ]);
   *
   * // should return only formulas: { Sheet1: [ [ undefined, undefined, '=A1+10' ] ] }
   * const allSheetsFormulas = hfInstance.getAllSheetsFormulas();
   * ```
   * @category Sheets
   */
  getAllSheetsFormulas() {
    return this._serialization.getAllSheetsFormulas();
  }
  /**
   * Returns formulas or values of all sheets in a form of an object which property keys are strings and values are 2D arrays of [[RawCellContent]].
   *
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2', '=A1+10'],
   * ]);
   *
   * // should return all sheets serialized content: { Sheet1: [ [ 1, 2, '=A1+10' ] ] }
   * const allSheetsSerialized = hfInstance.getAllSheetsSerialized();
   * ```
   *
   * @category Sheets
   */
  getAllSheetsSerialized() {
    return this.ensureEvaluationIsNotSuspended(), this._serialization.getAllSheetsSerialized();
  }
  /**
   * Updates the config with given new metadata. It is an expensive operation, as it might trigger rebuilding the engine and recalculation of all formulas.
   *
   * For more information, see the [Configuration options guide](/guide/configuration-options.md).
   *
   * @param {Partial<ConfigParams>} newParams configuration options to be updated or added
   *
   * @throws [[ExpectedValueOfTypeError]] when some parameters of config are of wrong type (e.g., currencySymbol)
   * @throws [[ConfigValueEmpty]] when some parameters of config are of invalid value (e.g., currencySymbol)
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // add a config param, for example maxColumns,
   * // you can check the configuration with getConfig method
   * hfInstance.updateConfig({ maxColumns: 1000 });
   * ```
   *
   * @category Instance
   */
  updateConfig(e) {
    Object.entries(e).every(([r, n]) => this._config[r] === n) || this.rebuildWithConfig(e);
  }
  /**
   * Returns current configuration of the engine instance.
   *
   * For more information, see the [Configuration options guide](/guide/configuration-options.md).
   *
   * @example
   * ```js
   * // should return all config metadata including default and those which were added
   * const hfConfig = hfInstance.getConfig();
   * ```
   *
   * @category Instance
   */
  getConfig() {
    return this._config.getConfig();
  }
  /**
   * Rebuilds the HyperFormula instance preserving the current sheets data.
   *
   * @example
   * ```js
   * hfInstance.rebuildAndRecalculate();
   * ```
   *
   * @category Instance
   */
  rebuildAndRecalculate() {
    this.rebuildWithConfig({});
  }
  /**
   * Returns a snapshot of computation time statistics.
   * It returns a map with key-value pairs where keys are enums for stat type and time (number).
   *
   * @internal
   *
   * @category Instance
   */
  getStats() {
    return this._stats.snapshot();
  }
  /**
   * Undo the previous operation.
   *
   * For more information, see the [Undo-Redo guide](/guide/undo-redo.md).
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[NoOperationToUndoError]] when there is no operation running that can be undone
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   *  ['3', ''],
   * ]);
   *
   * // perform CRUD operation, for example remove the second row
   * hfInstance.removeRows(0, [1, 1]);
   *
   * // undo the operation, it should return the changes
   * const changes = hfInstance.undo();
   * ```
   *
   * @category Undo and Redo
   */
  undo() {
    return this._crudOperations.undo(), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Re-do recently undone operation.
   *
   * For more information, see the [Undo-Redo guide](/guide/undo-redo.md).
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[NoOperationToRedoError]] when there is no operation running that can be re-done
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1'],
   *  ['2'],
   *  ['3'],
   * ]);
   *
   * // perform CRUD operation, for example remove the second row
   * hfInstance.removeRows(0, [1, 1]);
   *
   * // undo the operation, it should return previous values: [['1'], ['2'], ['3']]
   * hfInstance.undo();
   *
   * // do a redo, it should return the values after removing the second row: [['1'], ['3']]
   * const changes = hfInstance.redo();
   * ```
   *
   * @category Undo and Redo
   */
  redo() {
    return this._crudOperations.redo(), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Checks if there is at least one operation that can be undone.
   *
   * For more information, see the [Undo-Redo guide](/guide/undo-redo.md).
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1'],
   *  ['2'],
   *  ['3'],
   * ]);
   *
   * // perform CRUD operation, for example remove the second row
   * hfInstance.removeRows(0, [1, 1]);
   *
   * // should return 'true', it is possible to undo last operation
   * // which is removing rows in this example
   * const isSomethingToUndo = hfInstance.isThereSomethingToUndo();
   * ```
   *
   * @category Undo and Redo
   */
  isThereSomethingToUndo() {
    return this._crudOperations.isThereSomethingToUndo();
  }
  /**
   * Checks if there is at least one operation that can be re-done.
   *
   * For more information, see the [Undo-Redo guide](/guide/undo-redo.md).
   *
   * @example
   * ```js
   * hfInstance.undo();
   *
   * // when there is an action to redo, this returns 'true'
   * const isSomethingToRedo = hfInstance.isThereSomethingToRedo();
   * ```
   *
   * @category Undo and Redo
   */
  isThereSomethingToRedo() {
    return this._crudOperations.isThereSomethingToRedo();
  }
  /**
   * Returns information whether it is possible to change the content in a rectangular area bounded by the box.
   * If returns `true`, doing [[setCellContents]] operation won't throw any errors.
   * Returns `false` if the address is invalid or the sheet does not exist.
   *
   * @param {SimpleCellAddress | SimpleCellRange} address - single cell or block of cells to check
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // top left corner
   * const address1 = { col: 0, row: 0, sheet: 0 };
   * // bottom right corner
   * const address2 = { col: 1, row: 0, sheet: 0 };
   *
   * // should return 'true' for this example, it is possible to set content of
   * // width 2, height 1 in the first row and column of sheet 0
   * const isSettable = hfInstance.isItPossibleToSetCellContents({ start: address1, end: address2 });
   * ```
   *
   * @category Cells
   */
  isItPossibleToSetCellContents(e) {
    let t;
    if (ne(e))
      t = new F(e, e);
    else if (Ke(e))
      t = new F(e.start, e.end);
    else
      throw new Y("SimpleCellAddress | SimpleCellRange", "address");
    try {
      this._crudOperations.ensureRangeInSizeLimits(t);
      for (const r of t.addresses(this._dependencyGraph))
        this._crudOperations.ensureItIsPossibleToChangeContent(r);
    } catch (r) {
      return !1;
    }
    return !0;
  }
  /**
   * Sets the content for a block of cells of a given coordinates.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {SimpleCellAddress} topLeftCornerAddress - top left corner of block of cells
   * @param {(RawCellContent[][]|RawCellContent)} cellContents - array with content
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when the value is not an array of arrays or a raw cell value
   * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
   * @throws [[ExpectedValueOfTypeError]] if topLeftCornerAddress argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2', '=A1'],
   * ]);
   *
   * // should set the content, returns:
   * // [{
   * //   address: { sheet: 0, col: 3, row: 0 },
   * //   newValue: 2,
   * // }]
   * const changes = hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
   * ```
   *
   * @category Cells
   */
  setCellContents(e, t) {
    return this._crudOperations.setCellContents(e, t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Reorders rows of a sheet according to a source-target mapping.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - ID of a sheet to operate on
   * @param {[number, number][]} rowMapping - array mapping original positions to final positions of rows
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when rowMapping does not define correct row permutation for some subset of rows of the given sheet
   * @throws [[SourceLocationHasArrayError]] when the selected position has array inside
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  [1],
   *  [2],
   *  [4, 5],
   * ]);
   *
   * // should set swap rows 0 and 2 in place, returns:
   * // [{
   * //   address: { sheet: 0, col: 0, row: 2 },
   * //   newValue: 1,
   * // },
   * // {
   * //   address: { sheet: 0, col: 1, row: 2 },
   * //   newValue: null,
   * // },
   * // {
   * //   address: { sheet: 0, col: 0, row: 0 },
   * //   newValue: 4,
   * // },
   * // {
   * //   address: { sheet: 0, col: 1, row: 0 },
   * //   newValue: 5,
   * // }]
   * const changes = hfInstance.swapRowIndexes(0, [[0, 2], [2, 0]]);
   * ```
   *
   * @category Rows
   */
  swapRowIndexes(e, t) {
    return C(e, "number", "sheetId"), this._crudOperations.setRowOrder(e, t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Checks if it is possible to reorder rows of a sheet according to a source-target mapping.
   *
   * @param {number} sheetId - ID of a sheet to operate on
   * @param {[number, number][]} rowMapping - array mapping original positions to final positions of rows
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  [1],
   *  [2],
   *  [4, 5],
   * ]);
   *
   * // returns true
   * const isSwappable = hfInstance.isItPossibleToSwapRowIndexes(0, [[0, 2], [2, 0]]);
   *
   * // returns false
   * const isSwappable = hfInstance.isItPossibleToSwapRowIndexes(0, [[0, 1]]);
   * ```
   *
   * @category Rows
   */
  isItPossibleToSwapRowIndexes(e, t) {
    C(e, "number", "sheetId");
    try {
      return this._crudOperations.validateSwapRowIndexes(e, t), this._crudOperations.testRowOrderForArrays(e, t), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Reorders rows of a sheet according to a permutation of 0-based indexes.
   * Parameter `newRowOrder` should have a form `[ newPositionForRow0, newPositionForRow1, newPositionForRow2, ... ]`.
   * This method might be used to [sort the rows of a sheet](../../guide/sorting-data.md).
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note: This method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - ID of a sheet to operate on
   * @param {number[]} newRowOrder - permutation of rows; array length must match the number of rows returned by [getSheetDimensions()](#getsheetdimensions)
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when rowMapping does not define correct row permutation for some subset of rows of the given sheet
   * @throws [[SourceLocationHasArrayError]] when the selected position has array inside
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['A'],
   *  ['B'],
   *  ['C'],
   *  ['D']
   * ]);
   *
   * const newRowOrder = [0, 3, 2, 1]; // [ newPosForA, newPosForB, newPosForC, newPosForD ]
   *
   * const changes = hfInstance.setRowOrder(0, newRowOrder);
   *
   * // Sheet after this operation: [['A'], ['D'], ['C'], ['B']]
   * ```
   *
   * @category Rows
   */
  setRowOrder(e, t) {
    C(e, "number", "sheetId");
    const r = this._crudOperations.mappingFromOrder(e, t, "row");
    return this.swapRowIndexes(e, r);
  }
  /**
   * Checks if it is possible to reorder rows of a sheet according to a permutation.
   *
   * @param {number} sheetId - ID of a sheet to operate on
   * @param {number[]} newRowOrder - permutation of rows
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  [1],
   *  [2],
   *  [4, 5],
   * ]);
   *
   * // returns true
   * hfInstance.isItPossibleToSetRowOrder(0, [2, 1, 0]);
   *
   * // returns false
   * hfInstance.isItPossibleToSetRowOrder(0, [2]);
   * ```
   *
   * @category Rows
   */
  isItPossibleToSetRowOrder(e, t) {
    C(e, "number", "sheetId");
    try {
      const r = this._crudOperations.mappingFromOrder(e, t, "row");
      return this._crudOperations.validateSwapRowIndexes(e, r), this._crudOperations.testRowOrderForArrays(e, r), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Reorders columns of a sheet according to a source-target mapping.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - ID of a sheet to operate on
   * @param {[number, number][]} columnMapping - array mapping original positions to final positions of columns
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when columnMapping does not define correct column permutation for some subset of columns of the given sheet
   * @throws [[SourceLocationHasArrayError]] when the selected position has array inside
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  [1, 2, 4],
   *  [5]
   * ]);
   *
   * // should set swap columns 0 and 2 in place, returns:
   * // [{
   * //   address: { sheet: 0, col: 2, row: 0 },
   * //   newValue: 1,
   * // },
   * // {
   * //   address: { sheet: 0, col: 2, row: 1 },
   * //   newValue: 5,
   * // },
   * // {
   * //   address: { sheet: 0, col: 0, row: 0 },
   * //   newValue: 4,
   * // },
   * // {
   * //   address: { sheet: 0, col: 0, row: 1 },
   * //   newValue: null,
   * // }]
   * const changes = hfInstance.swapColumnIndexes(0, [[0, 2], [2, 0]]);
   * ```
   *
   * @category Columns
   */
  swapColumnIndexes(e, t) {
    return C(e, "number", "sheetId"), this._crudOperations.setColumnOrder(e, t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Checks if it is possible to reorder columns of a sheet according to a source-target mapping.
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  [1, 2, 4],
   *  [5]
   * ]);
   *
   * // returns true
   * hfInstance.isItPossibleToSwapColumnIndexes(0, [[0, 2], [2, 0]]);
   *
   * // returns false
   * hfInstance.isItPossibleToSwapColumnIndexes(0, [[0, 1]]);
   * ```
   *
   * @category Columns
   */
  isItPossibleToSwapColumnIndexes(e, t) {
    C(e, "number", "sheetId");
    try {
      return this._crudOperations.validateSwapColumnIndexes(e, t), this._crudOperations.testColumnOrderForArrays(e, t), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Reorders columns of a sheet according to a permutation of 0-based indexes.
   * Parameter `newColumnOrder` should have a form `[ newPositionForColumn0, newPositionForColumn1, newPositionForColumn2, ... ]`.
   * This method might be used to [sort the columns of a sheet](../../guide/sorting-data.md).
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note: This method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - ID of a sheet to operate on
   * @param {number[]} newColumnOrder - permutation of columns; array length must match the number of columns returned by [getSheetDimensions()](#getsheetdimensions)
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when columnMapping does not define correct column permutation for some subset of columns of the given sheet
   * @throws [[SourceLocationHasArrayError]] when the selected position has array inside
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *   ['A', 'B', 'C', 'D']
   * ]);
   *
   * const newColumnOrder = [0, 3, 2, 1]; // [ newPosForA, newPosForB, newPosForC, newPosForD ]
   *
   * const changes = hfInstance.setColumnOrder(0, newColumnOrder);
   *
   * // Sheet after this operation: [['A', 'D', 'C', 'B']]
   * ```
   *
   * @category Columns
   */
  setColumnOrder(e, t) {
    C(e, "number", "sheetId");
    const r = this._crudOperations.mappingFromOrder(e, t, "column");
    return this.swapColumnIndexes(e, r);
  }
  /**
   * Checks if it is possible to reorder columns of a sheet according to a permutation.
   *
   * @param {number} sheetId - ID of a sheet to operate on
   * @param {number[]} newColumnOrder - permutation of columns
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  [1, 2, 4],
   *  [5]
   * ]);
   *
   * // returns true
   * hfInstance.isItPossibleToSetColumnOrder(0, [2, 1, 0]);
   *
   * // returns false
   * hfInstance.isItPossibleToSetColumnOrder(0, [1]);
   * ```
   *
   * @category Columns
   */
  isItPossibleToSetColumnOrder(e, t) {
    C(e, "number", "sheetId");
    try {
      const r = this._crudOperations.mappingFromOrder(e, t, "column");
      return this._crudOperations.validateSwapColumnIndexes(e, r), this._crudOperations.testColumnOrderForArrays(e, r), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Returns information whether it is possible to add rows into a specified position in a given sheet.
   * Checks against particular rules to ascertain that addRows can be called.
   * If returns `true`, doing [[addRows]] operation won't throw any errors.
   * Returns `false` if adding rows would exceed the sheet size limit or given arguments are invalid.
   *
   * @param {number} sheetId - sheet ID in which rows will be added
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format [row, amount], where row is a row number above which the rows will be added
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2', '3'],
   * ]);
   *
   * // should return 'true' for this example,
   * // it is possible to add one row in the second row of sheet 0
   * const isAddable = hfInstance.isItPossibleToAddRows(0, [1, 1]);
   * ```
   *
   * @category Rows
   */
  isItPossibleToAddRows(e, ...t) {
    C(e, "number", "sheetId");
    const r = Hs(t);
    try {
      return this._crudOperations.ensureItIsPossibleToAddRows(e, ...r), !0;
    } catch (n) {
      return !1;
    }
  }
  /**
   * Adds multiple rows into a specified position in a given sheet.
   * Does nothing if rows are outside effective sheet size.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - sheet ID in which rows will be added
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format [row, amount], where row is a row number above which the rows will be added
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1'],
   *  ['2'],
   * ]);
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values
   * const changes = hfInstance.addRows(0, [0, 1]);
   * ```
   *
   * @category Rows
   */
  addRows(e, ...t) {
    return C(e, "number", "sheetId"), this._crudOperations.addRows(e, ...t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to remove rows from a specified position in a given sheet.
   * Checks against particular rules to ascertain that removeRows can be called.
   * If returns `true`, doing [[removeRows]] operation won't throw any errors.
   * Returns `false` if given arguments are invalid.
   *
   * @param {number} sheetId - sheet ID from which rows will be removed
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [row, amount]
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1'],
   *  ['2'],
   * ]);
   *
   * // should return 'true' for this example
   * // it is possible to remove one row from row 1 of sheet 0
   * const isRemovable = hfInstance.isItPossibleToRemoveRows(0, [1, 1]);
   * ```
   *
   * @category Rows
   */
  isItPossibleToRemoveRows(e, ...t) {
    C(e, "number", "sheetId");
    const r = Gs(t);
    try {
      return this._crudOperations.ensureItIsPossibleToRemoveRows(e, ...r), !0;
    } catch (n) {
      return !1;
    }
  }
  /**
   * Removes multiple rows from a specified position in a given sheet.
   * Does nothing if rows are outside the effective sheet size.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - sheet ID from which rows will be removed
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [row, amount]
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[InvalidArgumentsError]] when the given arguments are invalid
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1'],
   *  ['2'],
   * ]);
   *
   * // should return: [{ sheet: 0, col: 1, row: 2, value: null }] for this example
   * const changes = hfInstance.removeRows(0, [1, 1]);
   * ```
   *
   * @category Rows
   */
  removeRows(e, ...t) {
    return C(e, "number", "sheetId"), this._crudOperations.removeRows(e, ...t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to add columns into a specified position in a given sheet.
   * Checks against particular rules to ascertain that addColumns can be called.
   * If returns `true`, doing [[addColumns]] operation won't throw any errors.
   * Returns `false` if adding columns would exceed the sheet size limit or given arguments are invalid.
   *
   * @param {number} sheetId - sheet ID in which columns will be added
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [column, amount], where column is a column number from which new columns will be added
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // should return 'true' for this example,
   * // it is possible to add 1 column in sheet 0, at column 1
   * const isAddable = hfInstance.isItPossibleToAddColumns(0, [1, 1]);
   * ```
   *
   * @category Columns
   */
  isItPossibleToAddColumns(e, ...t) {
    C(e, "number", "sheetId");
    const r = Hs(t);
    try {
      return this._crudOperations.ensureItIsPossibleToAddColumns(e, ...r), !0;
    } catch (n) {
      return !1;
    }
  }
  /**
   * Adds multiple columns into a specified position in a given sheet.
   * Does nothing if the columns are outside the effective sheet size.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - sheet ID in which columns will be added
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [column, amount], where column is a column number from which new columns will be added
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when the given arguments are invalid
   * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=RAND()', '42'],
   * ]);
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values, for this example:
   * // [{
   * //   address: { sheet: 0, col: 1, row: 0 },
   * //   newValue: 0.92754862796338,
   * // }]
   * const changes = hfInstance.addColumns(0, [0, 1]);
   * ```
   *
   * @category Columns
   */
  addColumns(e, ...t) {
    return C(e, "number", "sheetId"), this._crudOperations.addColumns(e, ...t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to remove columns from a specified position in a given sheet.
   * Checks against particular rules to ascertain that removeColumns can be called.
   * If returns `true`, doing [[removeColumns]] operation won't throw any errors.
   * Returns `false` if given arguments are invalid.
   *
   * @param {number} sheetId - sheet ID from which columns will be removed
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format [column, amount]
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // should return 'true' for this example
   * // it is possible to remove one column, in place of the second column of sheet 0
   * const isRemovable = hfInstance.isItPossibleToRemoveColumns(0, [1, 1]);
   * ```
   *
   * @category Columns
   */
  isItPossibleToRemoveColumns(e, ...t) {
    C(e, "number", "sheetId");
    const r = Gs(t);
    try {
      return this._crudOperations.ensureItIsPossibleToRemoveColumns(e, ...r), !0;
    } catch (n) {
      return !1;
    }
  }
  /**
   * Removes multiple columns from a specified position in a given sheet.
   * Does nothing if columns are outside the effective sheet size.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - sheet ID from which columns will be removed
   * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [column, amount]
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when the given arguments are invalid
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['0', '=SUM(1, 2, 3)', '=A1'],
   * ]);
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values, in this example it will return:
   * // [{
   * //   address: { sheet: 0, col: 1, row: 0 },
   * //   newValue: { error: [CellError], value: '#REF!' },
   * // }]
   * const changes = hfInstance.removeColumns(0, [0, 1]);
   * ```
   *
   * @category Columns
   */
  removeColumns(e, ...t) {
    return C(e, "number", "sheetId"), this._crudOperations.removeColumns(e, ...t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to move cells to a specified position in a given sheet.
   * Checks against particular rules to ascertain that moveCells can be called.
   * If returns `true`, doing [[moveCells]] operation won't throw any errors.
   * Returns `false` if the operation might be disrupted and causes side effects by the fact that there is an array inside the selected columns, the target location includes an array or the provided address is invalid.
   *
   * @param {SimpleCellRange} source - range for a moved block
   * @param {SimpleCellAddress} destinationLeftCorner - upper left address of the target cell block
   *
   * @throws [[ExpectedValueOfTypeError]] if destinationLeftCorner, source, or any of basic type arguments are of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // choose the coordinates and assign them to variables
   * const source = { sheet: 0, col: 1, row: 0 };
   * const destination = { sheet: 0, col: 3, row: 0 };
   *
   * // should return 'true' for this example
   * // it is possible to move a block of width 1 and height 1
   * // from the corner: column 1 and row 0 of sheet 0
   * // into destination corner: column 3, row 0 of sheet 0
   * const isMovable = hfInstance.isItPossibleToMoveCells({ start: source, end: source }, destination);
   * ```
   * @category Cells
   */
  isItPossibleToMoveCells(e, t) {
    if (!ne(t))
      throw new Y("SimpleCellAddress", "destinationLeftCorner");
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    try {
      const r = new F(e.start, e.end);
      return this._crudOperations.operations.ensureItIsPossibleToMoveCells(r.start, r.width(), r.height(), t), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Moves the content of a cell block from source to the target location.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {SimpleCellRange} source - range for a moved block
   * @param {SimpleCellAddress} destinationLeftCorner - upper left address of the target cell block
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if destinationLeftCorner or source are of wrong type
   * @throws [[InvalidArgumentsError]] when the given arguments are invalid
   * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
   * @throws [[SourceLocationHasArrayError]] when the source location has array inside - array cannot be moved
   * @throws [[TargetLocationHasArrayError]] when the target location has array inside - cells cannot be replaced by the array
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=RAND()', '42'],
   * ]);
   *
   * // choose the coordinates and assign them to variables
   * const source = { sheet: 0, col: 1, row: 0 };
   * const destination = { sheet: 0, col: 3, row: 0 };
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values, for this example:
   * // [{
   * //   address: { sheet: 0, col: 0, row: 0 },
   * //   newValue: 0.93524248002062,
   * // }]
   * const changes = hfInstance.moveCells({ start: source, end: source }, destination);
   * ```
   *
   * @category Cells
   */
  moveCells(e, t) {
    if (!ne(t))
      throw new Y("SimpleCellAddress", "destinationLeftCorner");
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    const r = new F(e.start, e.end);
    return this._crudOperations.moveCells(r.start, r.width(), r.height(), t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to move a particular number of rows to a specified position in a given sheet.
   * Checks against particular rules to ascertain that moveRows can be called.
   * If returns `true`, doing [[moveRows]] operation won't throw any errors.
   * Returns `false` if the operation might be disrupted and causes side effects by the fact that there is an array inside the selected rows, the target location includes an array or the provided address is invalid.
   *
   * @param {number} sheetId - a sheet number in which the operation will be performed
   * @param {number} startRow - number of the first row to move
   * @param {number} numberOfRows - number of rows to move
   * @param {number} targetRow - row number before which rows will be moved
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1'],
   *  ['2'],
   * ]);
   *
   * // should return 'true' for this example
   * // it is possible to move one row from row 0 into row 2
   * const isMovable = hfInstance.isItPossibleToMoveRows(0, 0, 1, 2);
   * ```
   *
   * @category Rows
   */
  isItPossibleToMoveRows(e, t, r, n) {
    C(e, "number", "sheetId"), C(t, "number", "startRow"), C(r, "number", "numberOfRows"), C(n, "number", "targetRow");
    try {
      return this._crudOperations.ensureItIsPossibleToMoveRows(e, t, r, n), !0;
    } catch (i) {
      return !1;
    }
  }
  /**
   * Moves a particular number of rows to a specified position in a given sheet.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - a sheet number in which the operation will be performed
   * @param {number} startRow - number of the first row to move
   * @param {number} numberOfRows - number of rows to move
   * @param {number} targetRow - row number before which rows will be moved
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[InvalidArgumentsError]] when the given arguments are invalid
   * @throws [[SourceLocationHasArrayError]] when the source location has array inside - array cannot be moved
   * @throws [[TargetLocationHasArrayError]] when the target location has array inside - cells cannot be replaced by the array
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1'],
   *  ['2'],
   * ]);
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values
   * const changes = hfInstance.moveRows(0, 0, 1, 2);
   * ```
   *
   * @category Rows
   */
  moveRows(e, t, r, n) {
    return C(e, "number", "sheetId"), C(t, "number", "startRow"), C(r, "number", "numberOfRows"), C(n, "number", "targetRow"), this._crudOperations.moveRows(e, t, r, n), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to move a particular number of columns to a specified position in a given sheet.
   * Checks against particular rules to ascertain that moveColumns can be called.
   * If returns `true`, doing [[moveColumns]] operation won't throw any errors.
   * Returns `false` if the operation might be disrupted and causes side effects by the fact that there is an array inside the selected columns, the target location includes an array or the provided address is invalid.
   *
   * @param {number} sheetId - a sheet number in which the operation will be performed
   * @param {number} startColumn - number of the first column to move
   * @param {number} numberOfColumns - number of columns to move
   * @param {number} targetColumn - column number before which columns will be moved
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // should return 'true' for this example
   * // it is possible to move one column from column 1 into column 2 of sheet 0
   * const isMovable = hfInstance.isItPossibleToMoveColumns(0, 1, 1, 2);
   * ```
   *
   * @category Columns
   */
  isItPossibleToMoveColumns(e, t, r, n) {
    C(e, "number", "sheetId"), C(t, "number", "startColumn"), C(r, "number", "numberOfColumns"), C(n, "number", "targetColumn");
    try {
      return this._crudOperations.ensureItIsPossibleToMoveColumns(e, t, r, n), !0;
    } catch (i) {
      return !1;
    }
  }
  /**
   * Moves a particular number of columns to a specified position in a given sheet.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - a sheet number in which the operation will be performed
   * @param {number} startColumn - number of the first column to move
   * @param {number} numberOfColumns - number of columns to move
   * @param {number} targetColumn - column number before which columns will be moved
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[InvalidArgumentsError]] when the given arguments are invalid
   * @throws [[SourceLocationHasArrayError]] when the source location has array inside - array cannot be moved
   * @throws [[TargetLocationHasArrayError]] when the target location has array inside - cells cannot be replaced by the array
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2', '3', '=RAND()', '=SUM(A1:C1)'],
   * ]);
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values, for this example:
   * // [{
   * //   address: { sheet: 0, col: 1, row: 0 },
   * //   newValue: 0.16210054671639,
   * //  }, {
   * //   address: { sheet: 0, col: 4, row: 0 },
   * //   newValue: 6.16210054671639,
   * // }]
   * const changes = hfInstance.moveColumns(0, 1, 1, 2);
   * ```
   *
   * @category Columns
   */
  moveColumns(e, t, r, n) {
    return C(e, "number", "sheetId"), C(t, "number", "startColumn"), C(r, "number", "numberOfColumns"), C(n, "number", "targetColumn"), this._crudOperations.moveColumns(e, t, r, n), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Stores a copy of the cell block in internal clipboard for the further paste.
   * Returns the copied values for use in external clipboard.
   *
   * For more information, see the [Clipboard Operations guide](/guide/clipboard-operations.md).
   *
   * @param {SimpleCellRange} source - rectangle range to copy
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if source is of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *   ['1', '2'],
   * ]);
   *
   * // it copies [ [ 2 ] ]
   * const clipboardContent = hfInstance.copy({
   *   start: { sheet: 0, col: 1, row: 0 },
   *   end: { sheet: 0, col: 1, row: 0 },
   * });
   * ```
   *
   * The usage of the internal clipboard is described thoroughly in the [Clipboard Operations guide](../../guide/clipboard-operations.md).
   *
   * @category Clipboard
   */
  copy(e) {
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    const t = new F(e.start, e.end);
    return this._crudOperations.copy(t.start, t.width(), t.height()), this.getRangeValues(e);
  }
  /**
   * Stores information of the cell block in internal clipboard for further paste.
   * Calling [[paste]] right after this method is equivalent to call [[moveCells]].
   * Almost any CRUD operation called after this method will abort the cut operation.
   * Returns the cut values for use in external clipboard.
   *
   * For more information, see the [Clipboard Operations guide](/guide/clipboard-operations.md).
   *
   * @param {SimpleCellRange} source - rectangle range to cut
   *
   * @throws [[ExpectedValueOfTypeError]] if source is of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *   ['1', '2'],
   * ]);
   *
   * // returns the values that were cut: [ [ 1 ] ]
   * const clipboardContent = hfInstance.cut({
   *   start: { sheet: 0, col: 0, row: 0 },
   *   end: { sheet: 0, col: 0, row: 0 },
   * });
   * ```
   *
   * The usage of the internal clipboard is described thoroughly in the [Clipboard Operations guide](../../guide/clipboard-operations.md).
   *
   * @category Clipboard
   */
  cut(e) {
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    const t = new F(e.start, e.end);
    return this._crudOperations.cut(t.start, t.width(), t.height()), this.getRangeValues(e);
  }
  /**
   * When called after [[copy]] it pastes copied values and formulas into a cell block.
   * When called after [[cut]] it performs [[moveCells]] operation into the cell block.
   * Does nothing if the clipboard is empty.
   *
   * For more information, see the [Clipboard Operations guide](/guide/clipboard-operations.md).
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {SimpleCellAddress} targetLeftCorner - upper left address of the target cell block
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
   * @throws [[NothingToPasteError]] when clipboard is empty
   * @throws [[TargetLocationHasArrayError]] when the selected target area has array inside
   * @throws [[ExpectedValueOfTypeError]] if targetLeftCorner is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *   ['1', '2'],
   * ]);
   *
   * // [ [ 2 ] ] was copied
   * const clipboardContent = hfInstance.copy({
   *   start: { sheet: 0, col: 1, row: 0 },
   *   end: { sheet: 0, col: 1, row: 0 },
   * });
   *
   * // returns a list of modified cells: their absolute addresses and new values
   * const changes = hfInstance.paste({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * The usage of the internal clipboard is described thoroughly in the [Clipboard Operations guide](../../guide/clipboard-operations.md).
   *
   * @category Clipboard
   */
  paste(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "targetLeftCorner");
    return this.ensureEvaluationIsNotSuspended(), this._crudOperations.paste(e), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether there is something in the clipboard.
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // copy desired content
   * const clipboardContent = hfInstance.copy({
   *   start: { sheet: 0, col: 1, row: 0 },
   *   end: { sheet: 0, col: 1, row: 0 },
   * });
   *
   * // returns 'false', there is content in the clipboard
   * const isClipboardEmpty = hfInstance.isClipboardEmpty();
   * ```
   *
   * The usage of the internal clipboard is described thoroughly in the [Clipboard Operations guide](../../guide/clipboard-operations.md).
   *
   * @category Clipboard
   */
  isClipboardEmpty() {
    return this._crudOperations.isClipboardEmpty();
  }
  /**
   * Clears the clipboard content.
   *
   * @example
   * ```js
   * // clears the clipboard, isClipboardEmpty() should return true if called afterwards
   * hfInstance.clearClipboard();
   * ```
   *
   * The usage of the internal clipboard is described thoroughly in the [Clipboard Operations guide](../../guide/clipboard-operations.md).
   *
   * @category Clipboard
   */
  clearClipboard() {
    this._crudOperations.clearClipboard();
  }
  /**
   * Clears the redo stack in undoRedo history.
   *
   * For more information, see the [Undo-Redo guide](/guide/undo-redo.md).
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *   ['1', '2', '3'],
   * ]);
   *
   * // do an operation, for example remove columns
   * hfInstance.removeColumns(0, [0, 1]);
   *
   * // undo the operation
   * hfInstance.undo();
   *
   * // redo the operation
   * hfInstance.redo();
   *
   * // clear the redo stack
   * hfInstance.clearRedoStack();
   * ```
   *
   * @category Undo and Redo
   */
  clearRedoStack() {
    this._crudOperations.undoRedo.clearRedoStack();
  }
  /**
   * Clears the undo stack in undoRedo history.
   *
   * For more information, see the [Undo-Redo guide](/guide/undo-redo.md).
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *   ['1', '2', '3'],
   * ]);
   *
   * // do an operation, for example remove columns
   * hfInstance.removeColumns(0, [0, 1]);
   *
   * // undo the operation
   * hfInstance.undo();
   *
   * // clear the undo stack
   * hfInstance.clearUndoStack();
   * ```
   *
   * @category Undo and Redo
   */
  clearUndoStack() {
    this._crudOperations.undoRedo.clearUndoStack();
  }
  /**
   * Returns the cell content of a given range in a [[CellValue]][][] format.
   *
   * @param {SimpleCellRange} source - rectangular range
   *
   * @throws [[ExpectedValueOfTypeError]] if source is of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(1, 2)', '2', '10'],
   *  ['5', '6', '7'],
   *  ['40', '30', '20'],
   * ]);
   *
   *
   * // returns calculated cells content: [ [ 3, 2 ], [ 5, 6 ] ]
   * const rangeValues = hfInstance.getRangeValues({ start: { sheet: 0, col: 0, row: 0 }, end: { sheet: 0, col: 1, row: 1 } });
   * ```
   *
   * @category Ranges
   */
  getRangeValues(e) {
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    return new F(e.start, e.end).arrayOfAddressesInRange().map((r) => r.map((n) => this.getCellValue(n)));
  }
  /**
   * Returns cell formulas in given range.
   *
   * @param {SimpleCellRange} source - rectangular range
   *
   * @throws [[ExpectedValueOfTypeError]] if source is of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(1, 2)', '2', '10'],
   *  ['5', '6', '7'],
   *  ['40', '30', '20'],
   * ]);
   *
   * // returns cell formulas of a given range only:
   * // [ [ '=SUM(1, 2)', undefined ], [ undefined, undefined ] ]
   * const rangeFormulas = hfInstance.getRangeFormulas({ start: { sheet: 0, col: 0, row: 0 }, end: { sheet: 0, col: 1, row: 1 } });
   * ```
   *
   * @category Ranges
   */
  getRangeFormulas(e) {
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    return new F(e.start, e.end).arrayOfAddressesInRange().map((r) => r.map((n) => this.getCellFormula(n)));
  }
  /**
   * Returns serialized cells in given range.
   *
   * @param {SimpleCellRange} source - rectangular range
   *
   * @throws [[ExpectedValueOfTypeError]] if source is of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(1, 2)', '2', '10'],
   *  ['5', '6', '7'],
   *  ['40', '30', '20'],
   * ]);
   *
   * // should return serialized cell content for the given range:
   * // [ [ '=SUM(1, 2)', 2 ], [ 5, 6 ] ]
   * const rangeSerialized = hfInstance.getRangeSerialized({ start: { sheet: 0, col: 0, row: 0 }, end: { sheet: 0, col: 1, row: 1 } });
   * ```
   *
   * @category Ranges
   */
  getRangeSerialized(e) {
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    return new F(e.start, e.end).arrayOfAddressesInRange().map((r) => r.map((n) => this.getCellSerialized(n)));
  }
  /**
   * Returns values to fill target range using source range, with properly extending the range using wrap-around heuristic.
   *
   * @param {SimpleCellRange} source of data
   * @param {SimpleCellRange} target range where data is intended to be put
   * @param {boolean} offsetsFromTarget if true, offsets are computed from target corner, otherwise from source corner
   *
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   * @throws [[ExpectedValueOfTypeError]] if source or target are of wrong type
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([[1, '=A1'], ['=$A$1', '2']]);
   *
   * // should return [['2', '=$A$1', '2'], ['=A3', 1, '=C3'], ['2', '=$A$1', '2']]
   * hfInstance.getFillRangeData( {start: {sheet: 0, row: 0, col: 0}, end: {sheet: 0, row: 1, col: 1}},
   * {start: {sheet: 0, row: 1, col: 1}, end: {sheet: 0, row: 3, col: 3}});
   * ```
   *
   * @category Ranges
   */
  getFillRangeData(e, t, r = !1) {
    if (!Ke(e))
      throw new Y("SimpleCellRange", "source");
    if (!Ke(t))
      throw new Y("SimpleCellRange", "target");
    const n = new F(e.start, e.end), i = new F(t.start, t.end);
    return this.ensureEvaluationIsNotSuspended(), i.arrayOfAddressesInRange().map((a) => a.map((o) => {
      const u = ((o.row - (r ? t : e).start.row) % n.height() + n.height()) % n.height() + e.start.row, l = ((o.col - (r ? t : e).start.col) % n.width() + n.width()) % n.width() + e.start.col;
      return this._serialization.getCellSerialized({
        row: u,
        col: l,
        sheet: n.sheet
      }, o);
    }));
  }
  /**
   * Returns information whether it is possible to add a sheet to the engine.
   * Checks against particular rules to ascertain that addSheet can be called.
   * If returns `true`, doing [[addSheet]] operation won't throw any errors, and it is possible to add sheet with provided name.
   * Returns `false` if the chosen name is already used.
   *
   * @param {string} sheetName - sheet name, case-insensitive
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *   MySheet1: [ ['1'] ],
   *   MySheet2: [ ['10'] ],
   * });
   *
   * // should return 'false' because 'MySheet2' already exists
   * const isAddable = hfInstance.isItPossibleToAddSheet('MySheet2');
   * ```
   *
   * @category Sheets
   */
  isItPossibleToAddSheet(e) {
    C(e, "string", "sheetName");
    try {
      return this._crudOperations.ensureItIsPossibleToAddSheet(e), !0;
    } catch (t) {
      return !1;
    }
  }
  /**
   * Adds a new sheet to the HyperFormula instance. Returns given or autogenerated name of a new sheet.
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {string} [sheetName] - if not specified, name is autogenerated
   *
   * @fires [[sheetAdded]] after the sheet was added
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[SheetNameAlreadyTakenError]] when sheet with a given name already exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return 'MySheet3'
   * const nameProvided = hfInstance.addSheet('MySheet3');
   *
   * // should return autogenerated 'Sheet4'
   * // because no name was provided and 3 other ones already exist
   * const generatedName = hfInstance.addSheet();
   * ```
   *
   * @category Sheets
   */
  addSheet(e) {
    e !== void 0 && C(e, "string", "sheetName");
    const t = this._crudOperations.addSheet(e);
    return this.recomputeIfDependencyGraphNeedsIt(), this._emitter.emit(Mt.SheetAdded, t), t;
  }
  /**
   * Returns information whether it is possible to remove sheet for the engine.
   * Returns `true` if the provided sheet exists, and therefore it can be removed, doing [[removeSheet]] operation won't throw any errors.
   * Returns `false` otherwise
   *
   * @param {number} sheetId - sheet ID.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return 'true' because sheet with ID 1 exists and is removable
   * const isRemovable = hfInstance.isItPossibleToRemoveSheet(1);
   * ```
   *
   * @category Sheets
   */
  isItPossibleToRemoveSheet(e) {
    C(e, "number", "sheetId");
    try {
      return this._crudOperations.ensureScopeIdIsValid(e), !0;
    } catch (t) {
      return !1;
    }
  }
  /**
   * Removes a sheet
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - sheet ID.
   *
   * @fires [[sheetRemoved]] after the sheet was removed
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['=SUM(MySheet2!A1:A2)'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values, in this example it will return:
   * // [{
   * //   address: { sheet: 0, col: 0, row: 0 },
   * //   newValue: { error: [CellError], value: '#REF!' },
   * // }]
   * const changes = hfInstance.removeSheet(1);
   * ```
   *
   * @category Sheets
   */
  removeSheet(e) {
    C(e, "number", "sheetId");
    const t = this.sheetMapping.getSheetName(e);
    this._crudOperations.removeSheet(e);
    const r = this.recomputeIfDependencyGraphNeedsIt();
    return this._emitter.emit(Mt.SheetRemoved, t, r), r;
  }
  /**
   * Returns information whether it is possible to clear a specified sheet.
   * If returns `true`, doing [[clearSheet]] operation won't throw any errors, provided sheet exists and its content can be cleared.
   * Returns `false` otherwise
   *
   * @param {number} sheetId - sheet ID.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return 'true' because 'MySheet2' exists and can be cleared
   * const isClearable = hfInstance.isItPossibleToClearSheet(1);
   * ```
   *
   * @category Sheets
   */
  isItPossibleToClearSheet(e) {
    C(e, "number", "sheetId");
    try {
      return this._crudOperations.ensureScopeIdIsValid(e), !0;
    } catch (t) {
      return !1;
    }
  }
  /**
   * Clears the sheet content. Double-checks if the sheet exists.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - sheet ID.
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['=SUM(MySheet2!A1:A2)'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values, in this example it will return:
   * // [{
   * //   address: { sheet: 0, col: 0, row: 0 },
   * //   newValue: 0,
   * // }]
   * const changes = hfInstance.clearSheet(0);
   * ```
   *
   * @category Sheets
   */
  clearSheet(e) {
    return C(e, "number", "sheetId"), this._crudOperations.clearSheet(e), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to replace the sheet content.
   * If returns `true`, doing [[setSheetContent]] operation won't throw any errors, the provided sheet exists and then its content can be replaced.
   * Returns `false` otherwise
   *
   * @param {number} sheetId - sheet ID.
   * @param {RawCellContent[][]} values - array of new values
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return 'true' because sheet of ID 0 exists
   * // and the provided content can be placed in this sheet
   * const isReplaceable = hfInstance.isItPossibleToReplaceSheetContent(0, [['50'], ['60']]);
   * ```
   *
   * @category Sheets
   */
  isItPossibleToReplaceSheetContent(e, t) {
    C(e, "number", "sheetId");
    try {
      return this._crudOperations.ensureScopeIdIsValid(e), this._crudOperations.ensureItIsPossibleToChangeSheetContents(e, t), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Replaces the sheet content with new values.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * @param {number} sheetId - sheet ID.
   * @param {RawCellContent[][]} values - array of new values
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[InvalidArgumentsError]] when values argument is not an array of arrays
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return a list of cells which values changed after the operation,
   * // their absolute addresses and new values
   * const changes = hfInstance.setSheetContent(0, [['50'], ['60']]);
   * ```
   *
   * @category Sheets
   */
  setSheetContent(e, t) {
    return C(e, "number", "sheetId"), this._crudOperations.setSheetContent(e, t), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Computes the simple (absolute) address of a cell address, based on its string representation.
   * - If a sheet name is present in the string representation but is not present in the engine, returns `undefined`.
   * - If no sheet name is present in the string representation, uses `contextSheetId` as a sheet id in the returned address.
   *
   * For more information, see the [Cell references guide](/guide/cell-references.md).
   *
   * @param {string} cellAddress - string representation of cell address in A1 notation
   * @param {number} contextSheetId - sheet id used to construct the simple address in case of missing sheet name in `cellAddress` argument
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   * hfInstance.addSheet('Sheet0'); //sheetId = 0
   *
   * // returns { sheet: 42, col: 0, row: 0 }
   * const simpleCellAddress = hfInstance.simpleCellAddressFromString('A1', 42);
   *
   * // returns { sheet: 0, col: 0, row: 5 }
   * const simpleCellAddress = hfInstance.simpleCellAddressFromString('Sheet0!A6', 42);
   *
   * // returns { sheet: 0, col: 0, row: 5 }
   * const simpleCellAddress = hfInstance.simpleCellAddressFromString('Sheet0!$A$6', 42);
   *
   * // returns 'undefined', as there's no 'Sheet 2' in the HyperFormula instance
   * const simpleCellAddress = hfInstance.simpleCellAddressFromString('Sheet2!A6', 42);
   * ```
   *
   * @category Helpers
   */
  simpleCellAddressFromString(e, t) {
    return C(e, "string", "cellAddress"), C(t, "number", "sheetId"), Li(this.sheetMapping.getSheetId.bind(this.sheetMapping), e, t);
  }
  /**
   * Computes simple (absolute) address of a cell range based on its string representation.
   * If sheet name is present in string representation but not present in the engine, returns `undefined`.
   *
   * For more information, see the [Cell references guide](/guide/cell-references.md).
   *
   * @param {string} cellRange - string representation of cell range in A1 notation
   * @param {number} contextSheetId - sheet id used to construct the simple address in case of missing sheet name in `cellRange` argument
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   * hfInstance.addSheet('Sheet0'); //sheetId = 0
   *
   * // should return { start: { sheet: 0, col: 0, row: 0 }, end: { sheet: 0, col: 1, row: 0 } }
   * const simpleCellAddress = hfInstance.simpleCellRangeFromString('A1:A2', 0);
   * ```
   *
   * @category Helpers
   */
  simpleCellRangeFromString(e, t) {
    return C(e, "string", "cellRange"), C(t, "number", "sheetId"), Vc(this.sheetMapping.getSheetId.bind(this.sheetMapping), e, t);
  }
  /**
   * Computes string representation of an absolute address in A1 notation. If `cellAddress.sheet` is not present in the engine, returns `undefined`.
   *
   * For more information, see the [Cell references guide](/guide/cell-references.md).
   *
   * @param {SimpleCellAddress} cellAddress - object representation of an absolute address
   * @param {object | number} optionsOrContextSheetId - options object or number used as context sheet id to construct the string address (see examples)
   *
   * @throws [[ExpectedValueOfTypeError]] if its arguments are of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   * hfInstance.addSheet('Sheet0'); //sheetId = 0
   * const addr = { sheet: 0, col: 1, row: 1 };
   *
   * // should return 'B2'
   * const A1Notation = hfInstance.simpleCellAddressToString(addr);
   *
   * // should return 'B2'
   * const A1Notation = hfInstance.simpleCellAddressToString(addr, { includeSheetName: false });
   *
   * // should return 'Sheet0!B2'
   * const A1Notation = hfInstance.simpleCellAddressToString(addr, { includeSheetName: true });
   *
   * // should return 'B2' as context sheet id is the same as addr.sheet
   * const A1Notation = hfInstance.simpleCellAddressToString(addr, 0);
   *
   * // should return 'Sheet0!B2' as context sheet id is different from addr.sheet
   * const A1Notation = hfInstance.simpleCellAddressToString(addr, 42);
   * ```
   *
   * @category Helpers
   */
  simpleCellAddressToString(e, t = {}) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    const r = typeof t == "number" ? t : t.includeSheetName ? e.sheet + 1 : e.sheet;
    return Ts(this.sheetMapping.getSheetNameOrThrowError.bind(this.sheetMapping), e, r);
  }
  /**
   * Computes string representation of an absolute range in A1 notation.
   * Returns `undefined` if:
   * - `cellRange` is not a valid range,
   * - `cellRange.start.sheet` and `cellRange.start.end` are different,
   * - `cellRange.start.sheet` is not present in the engine,
   * - `cellRange.start.end` is not present in the engine.
   *
   * Note: This method is useful only for cell ranges; does not work with column ranges and row ranges.
   *
   * For more information, see the [Cell references guide](/guide/cell-references.md).
   *
   * @param {SimpleCellRange} cellRange - object representation of an absolute range
   * @param {object | number} optionsOrContextSheetId - options object or number used as context sheet id to construct the string address (see examples)
   *
   * @throws [[ExpectedValueOfTypeError]] if its arguments are of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   * hfInstance.addSheet('Sheet0'); //sheetId = 0
   * const range = { start: { sheet: 0, col: 1, row: 1 }, end: { sheet: 0, col: 2, row: 1 } };
   *
   * // should return 'B2:C2'
   * const A1Notation = hfInstance.simpleCellRangeToString(range);
   *
   * // should return 'B2:C2'
   * const A1Notation = hfInstance.simpleCellRangeToString(range, { includeSheetName: false });
   *
   * // should return 'Sheet0!B2:C2'
   * const A1Notation = hfInstance.simpleCellRangeToString(range, { includeSheetName: true });
   *
   * // should return 'B2:C2' as context sheet id is the same as range.start.sheet and range.end.sheet
   * const A1Notation = hfInstance.simpleCellRangeToString(range, 0);
   *
   * // should return 'Sheet0!B2:C2' as context sheet id is different from range.start.sheet and range.end.sheet
   * const A1Notation = hfInstance.simpleCellRangeToString(range, 42);
   * ```
   *
   * @category Helpers
   */
  simpleCellRangeToString(e, t = {}) {
    if (!Ke(e))
      throw new Y("SimpleCellRange", "cellRange");
    const r = typeof t == "number" ? t : t.includeSheetName ? e.start.sheet + e.end.sheet + 1 : e.start.sheet;
    return Dc(this.sheetMapping.getSheetNameOrThrowError.bind(this.sheetMapping), e, r);
  }
  /**
   * Returns all the out-neighbors in the [dependency graph](../../guide/dependency-graph.md) for a given cell address or range. Including:
   * - All cells with formulas that contain the given cell address or range
   * - Some of the ranges that contain the given cell address or range
   *
   * The exact result depends on the optimizations applied by the HyperFormula to the dependency graph, some of which are described in the section ["Optimizations for large ranges"](../../guide/dependency-graph.md#optimizations-for-large-ranges).
   *
   * The returned array includes also named expression dependents. They are represented as cell references with sheet ID `-1`.
   *
   * @param {SimpleCellAddress | SimpleCellRange} address - object representation of an absolute address or range of addresses
   *
   * @throws [[ExpectedValueOfTypeError]] if address is not [[SimpleCellAddress]] or [[SimpleCellRange]]
   * @throws [[SheetsNotEqual]] if range provided has distinct sheet numbers for start and end
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray( [ ['1', '=A1', '=A1+B1'] ] );
   *
   * hfInstance.getCellDependents({ sheet: 0, col: 0, row: 0});
   * // returns [{ sheet: 0, col: 1, row: 0}, { sheet: 0, col: 2, row: 0}]
   * ```
   *
   * @category Helpers
   */
  getCellDependents(e) {
    let t;
    if (ne(e))
      t = this._dependencyGraph.addressMapping.getCell(e);
    else if (Ke(e))
      t = this._dependencyGraph.rangeMapping.getRangeVertex(e.start, e.end);
    else
      throw new Y("SimpleCellAddress | SimpleCellRange", e);
    return t === void 0 ? [] : this._dependencyGraph.getAdjacentNodesAddresses(t);
  }
  /**
   * Returns all the in-neighbors in the [dependency graph](../../guide/dependency-graph.md) for a given cell address or range. In particular:
   * - If the argument is a single cell, `getCellPrecedents()` returns all cells and ranges contained in that cell's formula.
   * - If the argument is a range of cells, `getCellPrecedents()` returns some of the cell addresses and smaller ranges contained in that range (but not all of them). The exact result depends on the optimizations applied by the HyperFormula to the dependency graph, some of which are described in the section ["Optimizations for large ranges"](../../guide/dependency-graph.md#optimizations-for-large-ranges).
   *
   * The returned array includes also named expression precedents. They are represented as cell references with sheet ID `-1`.
   *
   * @param {SimpleCellAddress | SimpleCellRange} address - object representation of an absolute address or range of addresses
   *
   * @throws [[ExpectedValueOfTypeError]] if address is of wrong type
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray( [ ['1', '=A1', '=A1+B1'] ] );
   *
   * hfInstance.getCellPrecedents({ sheet: 0, col: 2, row: 0});
   * // returns [{ sheet: 0, col: 0, row: 0}, { sheet: 0, col: 1, row: 0}]
   * ```
   *
   * @category Helpers
   */
  getCellPrecedents(e) {
    let t;
    if (ne(e))
      t = this._dependencyGraph.addressMapping.getCell(e);
    else if (Ke(e))
      t = this._dependencyGraph.rangeMapping.getRangeVertex(e.start, e.end);
    else
      throw new Y("SimpleCellAddress | SimpleCellRange", e);
    return t === void 0 ? [] : this._dependencyGraph.dependencyQueryAddresses(t);
  }
  /**
   * Returns a unique sheet name assigned to the sheet of a given ID or `undefined` if the there is no sheet with a given ID.
   *
   * @param {number} sheetId - ID of the sheet, for which we want to retrieve name
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return 'MySheet2' as this sheet is the second one
   * const sheetName = hfInstance.getSheetName(1);
   * ```
   *
   * @category Sheets
   */
  getSheetName(e) {
    return C(e, "number", "sheetId"), this.sheetMapping.getSheetName(e);
  }
  /**
   * List all sheet names.
   * Returns an array of sheet names as strings.
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // should return all sheets names: ['MySheet1', 'MySheet2']
   * const sheetNames = hfInstance.getSheetNames();
   * ```
   *
   * @category Sheets
   */
  getSheetNames() {
    return this.sheetMapping.getSheetNames();
  }
  /**
   * Returns a unique sheet ID assigned to the sheet with a given name or `undefined` if the sheet does not exist.
   *
   * @param {string} sheetName - name of the sheet, for which we want to retrieve ID, case-insensitive.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *   MySheet1: [ ['1'] ],
   *   MySheet2: [ ['10'] ],
   * });
   *
   * // should return '0' because 'MySheet1' is of ID '0'
   * const sheetID = hfInstance.getSheetId('MySheet1');
   * ```
   *
   * @category Sheets
   */
  getSheetId(e) {
    return C(e, "string", "sheetName"), this.sheetMapping.getSheetId(e);
  }
  /**
   * Returns `true` whether sheet with a given name exists. The method accepts sheet name to be checked.
   *
   * @param {string} sheetName - name of the sheet, case-insensitive.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *   MySheet1: [ ['1'] ],
   *   MySheet2: [ ['10'] ],
   * });
   *
   * // should return 'true' since 'MySheet1' exists
   * const sheetExist = hfInstance.doesSheetExist('MySheet1');
   * ```
   *
   * @category Sheets
   */
  doesSheetExist(e) {
    return C(e, "string", "sheetName"), this.sheetMapping.hasSheetWithName(e);
  }
  /**
   * Returns the type of a cell at a given address.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(A2:A3)', '2'],
   * ]);
   *
   * // should return 'FORMULA', the cell of given coordinates is of this type
   * const cellA1Type = hfInstance.getCellType({ sheet: 0, col: 0, row: 0 });
   *
   * // should return 'VALUE', the cell of given coordinates is of this type
   * const cellB1Type = hfInstance.getCellType({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellType(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    const t = this.dependencyGraph.getCell(e);
    return rm(t, e);
  }
  /**
   * Returns `true` if the specified cell contains a simple value.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(A2:A3)', '2'],
   * ]);
   *
   * // should return 'true' since the selected cell contains a simple value
   * const isA1Simple = hfInstance.doesCellHaveSimpleValue({ sheet: 0, col: 0, row: 0 });
   *
   * // should return 'false' since the selected cell does not contain a simple value
   * const isB1Simple = hfInstance.doesCellHaveSimpleValue({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  doesCellHaveSimpleValue(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    return this.getCellType(e) === Ve.VALUE;
  }
  /**
   * Returns `true` if the specified cell contains a formula.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(A2:A3)', '2'],
   * ]);
   *
   * // should return 'true' since the A1 cell contains a formula
   * const A1Formula = hfInstance.doesCellHaveFormula({ sheet: 0, col: 0, row: 0 });
   *
   * // should return 'false' since the B1 cell does not contain a formula
   * const B1NoFormula = hfInstance.doesCellHaveFormula({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  doesCellHaveFormula(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    const t = this.getCellType(e);
    return t === Ve.FORMULA || t === Ve.ARRAYFORMULA;
  }
  /**
   * Returns`true` if the specified cell is empty.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *   [null, '1'],
   * ]);
   *
   * // should return 'true', cell of provided coordinates is empty
   * const isEmpty = hfInstance.isCellEmpty({ sheet: 0, col: 0, row: 0 });
   *
   * // should return 'false', cell of provided coordinates is not empty
   * const isNotEmpty = hfInstance.isCellEmpty({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  isCellEmpty(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    return this.getCellType(e) === Ve.EMPTY;
  }
  /**
   * Returns `true` if a given cell is a part of an array.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *    ['{=TRANSPOSE(B1:B1)}'],
   * ]);
   *
   * // should return 'true', cell of provided coordinates is a part of an array
   * const isPartOfArray = hfInstance.isCellPartOfArray({ sheet: 0, col: 0, row: 0 });
   * ```
   *
   * @category Cells
   */
  isCellPartOfArray(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    const t = this.getCellType(e);
    return t === Ve.ARRAY || t === Ve.ARRAYFORMULA;
  }
  /**
   * Returns type of the cell value of a given address.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * For more information, see the [Types of values guide](/guide/types-of-values.md).
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['=SUM(1, 2, 3)', '2'],
   * ]);
   *
   * // should return 'NUMBER', cell value type of provided coordinates is a number
   * const cellValue = hfInstance.getCellValueType({ sheet: 0, col: 1, row: 0 });
   *
   * // should return 'NUMBER', cell value type of provided coordinates is a number
   * const cellValue = hfInstance.getCellValueType({ sheet: 0, col: 0, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellValueType(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    this.ensureEvaluationIsNotSuspended();
    const t = this.dependencyGraph.getCellValue(e);
    return Vs(t);
  }
  /**
   * Returns detailed type of the cell value of a given address.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * For more information, see the [Types of values guide](/guide/types-of-values.md).
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1%', '1$'],
   * ]);
   *
   * // should return 'NUMBER_PERCENT', cell value type of provided coordinates is a number with a format inference percent.
   * const cellType = hfInstance.getCellValueDetailedType({ sheet: 0, col: 0, row: 0 });
   *
   * // should return 'NUMBER_CURRENCY', cell value type of provided coordinates is a number with a format inference currency.
   * const cellType = hfInstance.getCellValueDetailedType({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellValueDetailedType(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    this.ensureEvaluationIsNotSuspended();
    const t = this.dependencyGraph.getCellValue(e);
    return sm(t);
  }
  /**
   * Returns auxiliary format information of the cell value of a given address.
   * The method accepts cell coordinates as object with column, row and sheet numbers.
   *
   * @param {SimpleCellAddress} cellAddress - cell coordinates
   *
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
   * @throws [[ExpectedValueOfTypeError]] if cellAddress is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1$', '1'],
   * ]);
   *
   * // should return '$', cell value type of provided coordinates is a number with a format inference currency, parsed as using '$' as currency.
   * const cellFormat = hfInstance.getCellValueFormat({ sheet: 0, col: 0, row: 0 });
   *
   * // should return undefined, cell value type of provided coordinates is a number with no format information.
   * const cellFormat = hfInstance.getCellValueFormat({ sheet: 0, col: 1, row: 0 });
   * ```
   *
   * @category Cells
   */
  getCellValueFormat(e) {
    if (!ne(e))
      throw new Y("SimpleCellAddress", "cellAddress");
    this.ensureEvaluationIsNotSuspended();
    const t = this.dependencyGraph.getCellValue(e);
    return im(t);
  }
  /**
   * Returns the number of existing sheets.
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['1', '2'],
   * ]);
   *
   * // should return the number of sheets which is '1'
   * const sheetsCount = hfInstance.countSheets();
   * ```
   *
   * @category Sheets
   */
  countSheets() {
    return this.sheetMapping.numberOfSheets();
  }
  /**
   * Returns information whether it is possible to rename sheet.
   * Returns `true` if the sheet with provided id exists and new name is available
   * Returns `false` if sheet cannot be renamed
   *
   * @param {number} sheetId - a sheet number
   * @param {string} newName - a name of the sheet to be given
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *   MySheet1: [ ['1'] ],
   *   MySheet2: [ ['10'] ],
   * });
   *
   * // returns true
   * hfInstance.isItPossibleToRenameSheet(0, 'MySheet0');
   * ```
   *
   * @category Sheets
   */
  isItPossibleToRenameSheet(e, t) {
    C(e, "number", "sheetId"), C(t, "string", "newName");
    try {
      return this._crudOperations.ensureItIsPossibleToRenameSheet(e, t), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Renames a specified sheet.
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {number} sheetId - a sheet ID
   * @param {string} newName - a name of the sheet to be given, if is the same as the old one the method does nothing
   *
   * @fires [[sheetRenamed]] after the sheet was renamed
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
   * @throws [[SheetNameAlreadyTakenError]] when the provided sheet name already exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *   MySheet1: [ ['1'] ],
   *   MySheet2: [ ['10'] ],
   * });
   *
   * // renames the sheet 'MySheet1'
   * hfInstance.renameSheet(0, 'MySheet0');
   * ```
   *
   * @category Sheets
   */
  renameSheet(e, t) {
    C(e, "number", "sheetId"), C(t, "string", "newName");
    const r = this._crudOperations.renameSheet(e, t);
    this.recomputeIfDependencyGraphNeedsIt(), r !== void 0 && this._emitter.emit(Mt.SheetRenamed, r, t);
  }
  /**
   * Runs the provided callback as a single [batch operation](../../guide/batch-operations.md) and returns the changed cells.
   *
   * Returns [an array of cells whose values changed as a result of all batched operations](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {() => void} batchOperations - a function with operations to be performed
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   * @fires [[evaluationSuspended]] always
   * @fires [[evaluationResumed]] after the recomputation of necessary values
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // multiple operations in a single callback will trigger evaluation only once
   * // and only one set of changes is returned as a combined result of all
   * // the operations that were triggered within the callback
   * const changes = hfInstance.batch(() => {
   *  hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
   *  hfInstance.setCellContents({ col: 4, row: 0, sheet: 0 }, [['=A1']]);
   * });
   * ```
   *
   * @category Batch
   */
  batch(e) {
    this.suspendEvaluation(), this._crudOperations.beginUndoRedoBatchMode();
    try {
      e();
    } catch (t) {
      throw this._crudOperations.commitUndoRedoBatchMode(), this.resumeEvaluation(), t;
    }
    return this._crudOperations.commitUndoRedoBatchMode(), this.resumeEvaluation();
  }
  /**
   * Suspends the dependency graph recalculation to start a [batch operation](../../guide/batch-operations.md).
   * It allows optimizing the performance.
   * With this method, multiple CRUD operations can be done without triggering recalculation after every operation.
   * Suspending evaluation should result in an overall faster calculation compared to recalculating after each operation separately.
   * To resume the evaluation use [[resumeEvaluation]].
   *
   * @fires [[evaluationSuspended]] always
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // similar to batch() but operations are not within a callback,
   * // one method suspends the recalculation
   * // the second will resume calculations and return the changes
   *
   * // suspend the evaluation with this method
   * hfInstance.suspendEvaluation();
   *
   * // perform operations
   * hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
   * hfInstance.setSheetContent(1, [['50'], ['60']]);
   *
   * // use resumeEvaluation to resume
   * const changes = hfInstance.resumeEvaluation();
   * ```
   *
   * @category Batch
   */
  suspendEvaluation() {
    this._evaluationSuspended = !0, this._emitter.emit(Mt.EvaluationSuspended);
  }
  /**
   * Resumes the dependency graph recalculation that was [suspended](../../guide/batch-operations.md) with [[suspendEvaluation]].
   * It also triggers the recalculation and returns [an array of cells whose values changed as a result of all batched operations](/guide/basic-operations.md#changes-array).
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   * @fires [[evaluationResumed]] after the recomputation of necessary values
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  MySheet1: [ ['1'] ],
   *  MySheet2: [ ['10'] ],
   * });
   *
   * // similar to batch() but operations are not within a callback,
   * // one method suspends the recalculation
   * // the second will resume calculations and return the changes
   *
   * // first, suspend the evaluation
   * hfInstance.suspendEvaluation();
   *
   * // perform operations
   * hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
   * hfInstance.setSheetContent(1, [['50'], ['60']]);
   *
   * // resume the evaluation
   * const changes = hfInstance.resumeEvaluation();
   * ```
   *
   * @category Batch
   */
  resumeEvaluation() {
    this._evaluationSuspended = !1;
    const e = this.recomputeIfDependencyGraphNeedsIt();
    return this._emitter.emit(Mt.EvaluationResumed, e), e;
  }
  /**
   * Checks if the dependency graph recalculation process is [suspended](../../guide/batch-operations.md) or not.
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // suspend the evaluation
   * hfInstance.suspendEvaluation();
   *
   * // between suspendEvaluation() and resumeEvaluation()
   * // or inside batch() callback it will return 'true', otherwise 'false'
   * const isEvaluationSuspended = hfInstance.isEvaluationSuspended();
   *
   * const changes = hfInstance.resumeEvaluation();
   * ```
   *
   * @category Batch
   */
  isEvaluationSuspended() {
    return this._evaluationSuspended;
  }
  /**
   * Returns information whether it is possible to add named expression into a specific scope.
   * Checks against particular rules to ascertain that addNamedExpression can be called.
   * If returns `true`, doing [[addNamedExpression]] operation won't throw any errors.
   * Returns `false` if the operation might be disrupted.
   *
   * @param {string} expressionName - a name of the expression to be added
   * @param {RawCellContent} expression - the expression
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // should return 'true' for this example,
   * // it is possible to add named expression to global scope
   * const isAddable = hfInstance.isItPossibleToAddNamedExpression('prettyName', '=Sheet1!$A$1+100');
   * ```
   *
   * @category Named Expressions
   */
  isItPossibleToAddNamedExpression(e, t, r) {
    C(e, "string", "expressionName"), r !== void 0 && C(r, "number", "scope");
    try {
      return this._crudOperations.ensureItIsPossibleToAddNamedExpression(e, t, r), !0;
    } catch (n) {
      return !1;
    }
  }
  /**
   * Adds a specified named expression.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {string} expressionName - a name of the expression to be added
   * @param {RawCellContent} expression - the expression
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   * @param {NamedExpressionOptions?} options - additional metadata related to named expression
   *
   * @fires [[namedExpressionAdded]] always, unless [[batch]] mode is used
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NamedExpressionNameIsAlreadyTakenError]] when the named-expression name is not available.
   * @throws [[NamedExpressionNameIsInvalidError]] when the named-expression name is not valid
   * @throws [[NoRelativeAddressesAllowedError]] when the named-expression formula contains relative references
   * @throws [[NoSheetWithIdError]] if no sheet with given sheetId exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add own expression, scope limited to 'Sheet1' (sheetId=0), the method should return a list of cells which values
   * // changed after the operation, their absolute addresses and new values
   * // for this example:
   * // [{
   * //   name: 'prettyName',
   * //   newValue: 142,
   * // }]
   * const changes = hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 0);
   * ```
   *
   * @category Named Expressions
   */
  addNamedExpression(e, t, r, n) {
    C(e, "string", "expressionName"), r !== void 0 && C(r, "number", "scope"), this._crudOperations.addNamedExpression(e, t, r, n);
    const i = this.recomputeIfDependencyGraphNeedsIt();
    return this._emitter.emit(Mt.NamedExpressionAdded, e, i), i;
  }
  /**
   * Gets specified named expression value.
   * Returns a [[CellValue]] or undefined if the given named expression does not exist.
   *
   * For more information, see the [Named expressions guide](/guide/named-expressions.md).
   *
   * @param {string} expressionName - expression name, case-insensitive.
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] if no sheet with given sheetId exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add a named expression, only 'Sheet1' (sheetId=0) considered as it is the scope
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 'Sheet1');
   *
   * // returns the calculated value of a passed named expression, '142' for this example
   * const myFormula = hfInstance.getNamedExpressionValue('prettyName', 'Sheet1');
   * ```
   *
   * @category Named Expressions
   */
  getNamedExpressionValue(e, t) {
    C(e, "string", "expressionName"), t !== void 0 && C(t, "number", "scope"), this.ensureEvaluationIsNotSuspended(), this._crudOperations.ensureScopeIdIsValid(t);
    const r = this._namedExpressions.namedExpressionForScope(e, t);
    if (r)
      return this._serialization.getCellValue(r.address);
  }
  /**
   * Returns a normalized formula string for given named expression, or `undefined` for a named expression that does not exist or does not hold a formula.
   *
   * For more information, see the [Named expressions guide](/guide/named-expressions.md).
   *
   * @param {string} expressionName - expression name, case-insensitive.
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] if no sheet with given sheetId exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add a named expression in 'Sheet1' (sheetId=0)
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 0);
   *
   * // returns a normalized formula string corresponding to the passed name from 'Sheet1' (sheetId=0),
   * // '=Sheet1!A1+100' for this example
   * const myFormula = hfInstance.getNamedExpressionFormula('prettyName', 0);
   * ```
   *
   * @category Named Expressions
   */
  getNamedExpressionFormula(e, t) {
    C(e, "string", "expressionName"), t !== void 0 && C(t, "number", "scope"), this._crudOperations.ensureScopeIdIsValid(t);
    const r = this._namedExpressions.namedExpressionForScope(e, t);
    if (r !== void 0)
      return this._serialization.getCellFormula(r.address);
  }
  /**
   * Returns a named expression, or `undefined` for a named expression that does not exist or does not hold a formula.
   *
   * For more information, see the [Named expressions guide](/guide/named-expressions.md).
   *
   * @param {string} expressionName - expression name, case-insensitive.
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] if no sheet with given sheetId exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add a named expression in 'Sheet1' (sheetId=0)
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 0);
   *
   * // returns a named expression that corresponds to the passed name from 'Sheet1' (sheetId=0)
   * // for this example, returns:
   * // {name: 'prettyName', expression: '=Sheet1!$A$1+100', options: undefined, scope: 0}
   * const myFormula = hfInstance.getNamedExpression('prettyName', 0);
   *
   * // for a named expression that doesn't exist, returns 'undefined':
   * const myFormulaTwo = hfInstance.getNamedExpression('uglyName', 0);
   * ```
   *
   * @category Named Expressions
   */
  getNamedExpression(e, t) {
    C(e, "string", "expressionName"), t !== void 0 && C(t, "number", "scope");
    const r = this._namedExpressions.namedExpressionForScope(e, t);
    if (r === void 0)
      return;
    const n = this._serialization.getCellFormula(r.address);
    return {
      name: e,
      scope: t,
      expression: n,
      options: r.options
    };
  }
  /**
   * Returns information whether it is possible to change named expression in a specific scope.
   * Checks against particular rules to ascertain that changeNamedExpression can be called.
   * If returns `true`, doing [[changeNamedExpression]] operation won't throw any errors.
   * Returns `false` if the operation might be disrupted.
   *
   * @param {string} expressionName - an expression name, case-insensitive.
   * @param {RawCellContent} newExpression - a new expression
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add a named expression
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100');
   *
   * // should return 'true' for this example,
   * // it is possible to change named expression
   * const isAddable = hfInstance.isItPossibleToChangeNamedExpression('prettyName', '=Sheet1!$A$1+100');
   * ```
   *
   * @category Named Expressions
   */
  isItPossibleToChangeNamedExpression(e, t, r) {
    C(e, "string", "expressionName"), r !== void 0 && C(r, "number", "scope");
    try {
      return this._crudOperations.ensureItIsPossibleToChangeNamedExpression(e, t, r), !0;
    } catch (n) {
      return !1;
    }
  }
  /**
   * Changes a given named expression to a specified formula.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {string} expressionName - an expression name, case-insensitive.
   * @param {RawCellContent} newExpression - a new expression
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   * @param {NamedExpressionOptions?} options - additional metadata related to named expression
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NamedExpressionDoesNotExistError]] when the given expression does not exist.
   * @throws [[NoSheetWithIdError]] if no sheet with given sheetId exists
   * @throws [[ArrayFormulasNotSupportedError]] when the named expression formula is an array formula
   * @throws [[NoRelativeAddressesAllowedError]] when the named expression formula contains relative references
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add a named expression, scope limited to 'Sheet1' (sheetId=0)
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 0);
   *
   * // change the named expression
   * const changes = hfInstance.changeNamedExpression('prettyName', '=Sheet1!$A$1+200');
   * ```
   *
   * @category Named Expressions
   */
  changeNamedExpression(e, t, r, n) {
    return C(e, "string", "expressionName"), r !== void 0 && C(r, "number", "scope"), this._crudOperations.changeNamedExpressionExpression(e, r, t, n), this.recomputeIfDependencyGraphNeedsIt();
  }
  /**
   * Returns information whether it is possible to remove named expression from a specific scope.
   * Checks against particular rules to ascertain that removeNamedExpression can be called.
   * If returns `true`, doing [[removeNamedExpression]] operation won't throw any errors.
   * Returns `false` if the operation might be disrupted.
   *
   * @param {string} expressionName - an expression name, case-insensitive.
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add a named expression
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100');
   *
   * // should return 'true' for this example,
   * // it is possible to change named expression
   * const isAddable = hfInstance.isItPossibleToRemoveNamedExpression('prettyName');
   * ```
   *
   * @category Named Expressions
   */
  isItPossibleToRemoveNamedExpression(e, t) {
    C(e, "string", "expressionName"), t !== void 0 && C(t, "number", "scope");
    try {
      return this._crudOperations.isItPossibleToRemoveNamedExpression(e, t), !0;
    } catch (r) {
      return !1;
    }
  }
  /**
   * Removes a named expression.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @param {string} expressionName - expression name, case-insensitive.
   * @param {number?} scope - scope definition, `sheetId` for local scope or `undefined` for global scope
   *
   * @fires [[namedExpressionRemoved]] after the expression was removed
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NamedExpressionDoesNotExistError]] when the given expression does not exist.
   * @throws [[NoSheetWithIdError]] if no sheet with given sheetId exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   * ]);
   *
   * // add a named expression
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 0);
   *
   * // remove the named expression
   * const changes = hfInstance.removeNamedExpression('prettyName', 0);
   * ```
   *
   * @category Named Expressions
   */
  removeNamedExpression(e, t) {
    C(e, "string", "expressionName"), t !== void 0 && C(t, "number", "scope");
    const r = this._crudOperations.removeNamedExpression(e, t);
    if (r) {
      const n = this.recomputeIfDependencyGraphNeedsIt();
      return this._emitter.emit(Mt.NamedExpressionRemoved, r.displayName, n), n;
    } else
      return [];
  }
  /**
   * Lists named expressions.
   * - If scope parameter is provided, returns an array of expression names defined for this scope.
   * - If scope parameter is undefined, returns an array of global expression names.
   *
   * For more information, see the [Named expressions guide](/guide/named-expressions.md).
   *
   * @param {number?} scope - scope of the named expressions, `sheetId` for local scope or `undefined` for global scope
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NoSheetWithIdError]] if no sheet with given sheetId exists
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   *  ['50'],
   *  ['60'],
   * ]);
   *
   * // add two named expressions and one scoped
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100');
   * hfInstance.addNamedExpression('anotherPrettyName', '=Sheet1!$A$2+100');
   * hfInstance.addNamedExpression('alsoPrettyName', '=Sheet1!$A$3+100', 0);
   *
   * // list the expressions, should return: ['prettyName', 'anotherPrettyName'] for this example
   * const listOfExpressions = hfInstance.listNamedExpressions();
   *
   *  // list the expressions, should return: ['alsoPrettyName'] for this example
   * const listOfExpressions = hfInstance.listNamedExpressions(0);
   * ```
   *
   * @category Named Expressions
   */
  listNamedExpressions(e) {
    return e !== void 0 && C(e, "number", "scope"), this._crudOperations.ensureScopeIdIsValid(e), this._namedExpressions.getAllNamedExpressionsNamesInScope(e);
  }
  /**
   * Returns all named expressions serialized.
   *
   * For more information, see the [Named expressions guide](/guide/named-expressions.md).
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   *  ['50'],
   *  ['60'],
   * ]);
   *
   * // add two named expressions and one scoped
   * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100');
   * hfInstance.addNamedExpression('anotherPrettyName', '=Sheet1!$A$2+100');
   * hfInstance.addNamedExpression('prettyName3', '=Sheet1!$A$3+100', 0);
   *
   * // get all expressions serialized
   * // should return:
   * // [
   * // {name: 'prettyName', expression: '=Sheet1!$A$1+100', options: undefined, scope: undefined},
   * // {name: 'anotherPrettyName', expression: '=Sheet1!$A$2+100', options: undefined, scope: undefined},
   * // {name: 'alsoPrettyName', expression: '=Sheet1!$A$3+100', options: undefined, scope: 0}
   * // ]
   * const allExpressions = hfInstance.getAllNamedExpressionsSerialized();
   * ```
   *
   * @category Named Expressions
   */
  getAllNamedExpressionsSerialized() {
    return this._serialization.getAllNamedExpressionsSerialized();
  }
  /**
   * Parses and then unparses a formula.
   * Returns a normalized formula (e.g., restores the original capitalization of sheet names, function names, cell addresses, and named expressions).
   *
   * @param {string} formulaString - a formula in a proper format - it must start with "="
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   * @throws [[NotAFormulaError]] when the provided string is not a valid formula, i.e., does not start with "="
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromArray([
   *  ['42'],
   *  ['50'],
   * ]);
   *
   * // returns '=Sheet1!$A$1+10'
   * const normalizedFormula = hfInstance.normalizeFormula('=SHEET1!$A$1+10');
   *
   * // returns '=3*$A$1'
   * const normalizedFormula = hfInstance.normalizeFormula('=3*$a$1');
   * ```
   *
   * @category Helpers
   */
  normalizeFormula(e) {
    C(e, "string", "formulaString");
    const {
      ast: t,
      address: r
    } = this.extractTemporaryFormula(e);
    if (t === void 0)
      throw new fs();
    return this._unparser.unparse(t, r);
  }
  /**
   * Calculates fire-and-forget formula, returns the calculated value.
   *
   * @param {string} formulaString - A formula in a proper format, starting with `=`.
   * @param {number} sheetId - The ID of a sheet in context of which the formula gets evaluated.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type arguments is of wrong type.
   * @throws [[NotAFormulaError]] when the provided string is not a valid formula (i.e., doesn't start with `=`).
   * @throws [[NoSheetWithIdError]] when the provided `sheetID` doesn't exist.
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildFromSheets({
   *  Sheet1: [['58']],
   *  Sheet2: [['1', '2', '3'], ['4', '5', '6']]
   * });
   *
   * // returns the calculated formula's value
   * // for this example, returns `68`
   * const calculatedFormula = hfInstance.calculateFormula('=A1+10', 0);
   *
   * // for this example, returns [['11', '12', '13'], ['14', '15', '16']]
   * const calculatedFormula = hfInstance.calculateFormula('=A1:B3+10', 1);
   * ```
   *
   * @category Helpers
   */
  calculateFormula(e, t) {
    C(e, "string", "formulaString"), C(t, "number", "sheetId"), this._crudOperations.ensureScopeIdIsValid(t);
    const {
      ast: r,
      address: n,
      dependencies: i
    } = this.extractTemporaryFormula(e, t);
    if (r === void 0)
      throw new fs();
    const a = this.evaluator.runAndForget(r, n, i);
    return this._exporter.exportScalarOrRange(a);
  }
  /**
   * Return a list of named expressions used by a formula.
   *
   * @param {string} formulaString - A formula in a proper format, starting with `=`.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type arguments is of wrong type.
   * @throws [[NotAFormulaError]] when the provided string is not a valid formula (i.e., doesn't start with `=`).
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // returns a list of named expressions used by a formula
   * // for this example, returns ['foo', 'bar']
   * const namedExpressions = hfInstance.getNamedExpressionsFromFormula('=foo+bar*2');
   * ```
   *
   * @category Helpers
   */
  getNamedExpressionsFromFormula(e) {
    C(e, "string", "formulaString");
    const {
      ast: t,
      dependencies: r
    } = this.extractTemporaryFormula(e);
    if (t === void 0)
      throw new fs();
    const n = r.filter((a) => a instanceof Ht).map((a) => a.name);
    return [...new Set(n)];
  }
  /**
   * Validates the formula.
   * If the provided string starts with "=" and is a parsable formula, the method returns `true`.
   * The validation is purely grammatical: the method doesn't verify if the formula can be calculated or not.
   *
   * @param {string} formulaString -  a formula in a proper format - it must start with "="
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * // checks if the given string is a valid formula, should return 'true' for this example
   * const isFormula = hfInstance.validateFormula('=SUM(1, 2)');
   * ```
   *
   * @category Helpers
   */
  validateFormula(e) {
    C(e, "string", "formulaString");
    const {
      ast: t
    } = this.extractTemporaryFormula(e);
    return t !== void 0;
  }
  /**
   * Returns translated names of all functions registered in this instance of HyperFormula
   * according to the language set in the configuration
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // return translated names of all functions, assign to a variable
   * const allNames = hfInstance.getRegisteredFunctionNames();
   * ```
   *
   * @category Custom Functions
   */
  getRegisteredFunctionNames() {
    return Me.getLanguage(this._config.language).getFunctionTranslations(this._functionRegistry.getRegisteredFunctionIds());
  }
  /**
   * Returns class of a plugin used by function with given id
   *
   * For more information, see the [Custom functions guide](/guide/custom-functions.md).
   *
   * @param {string} functionId - id of a function, e.g., 'SUMIF'
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * // import your own plugin
   * import { MyExamplePlugin } from './file_with_your_plugin';
   *
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // register a plugin
   * HyperFormula.registerFunctionPlugin(MyExamplePlugin);
   *
   * // get the plugin
   * const myPlugin = hfInstance.getFunctionPlugin('EXAMPLE');
   * ```
   *
   * @category Custom Functions
   */
  getFunctionPlugin(e) {
    return C(e, "string", "functionId"), this._functionRegistry.getFunctionPlugin(e);
  }
  /**
   * Returns classes of all plugins registered in this instance of HyperFormula
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // return classes of all plugins registered, assign to a variable
   * const allNames = hfInstance.getAllFunctionPlugins();
   * ```
   *
   * @category Custom Functions
   */
  getAllFunctionPlugins() {
    return this._functionRegistry.getPlugins();
  }
  /**
   * Interprets number as a date + time.
   *
   * For more information, see the [Date and time handling guide](/guide/date-and-time-handling.md).
   *
   * @param {number} inputNumber - number of days since nullDate, should be non-negative, fractions are interpreted as hours/minutes/seconds.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // pass the number of days since nullDate
   * // the method should return formatted date and time, for this example:
   * // {year: 2020, month: 1, day: 15, hours: 2, minutes: 24, seconds: 0}
   * const dateTimeFromNumber = hfInstance.numberToDateTime(43845.1);
   *
   * ```
   *
   * @category Helpers
   */
  numberToDateTime(e) {
    return C(e, "number", "val"), this._evaluator.interpreter.dateTimeHelper.numberToSimpleDateTime(e);
  }
  /**
   * Interprets number as a date.
   *
   * For more information, see the [Date and time handling guide](/guide/date-and-time-handling.md).
   *
   * @param {number} inputNumber - number of days since nullDate, should be non-negative, fractions are ignored.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // pass the number of days since nullDate
   * // the method should return formatted date, for this example:
   * // {year: 2020, month: 1, day: 15}
   * const dateFromNumber = hfInstance.numberToDate(43845);
   * ```
   *
   * @category Helpers
   */
  numberToDate(e) {
    return C(e, "number", "val"), this._evaluator.interpreter.dateTimeHelper.numberToSimpleDate(e);
  }
  /**
   * Interprets number as a time (hours/minutes/seconds).
   *
   * For more information, see the [Date and time handling guide](/guide/date-and-time-handling.md).
   *
   * @param {number} inputNumber - time in 24h units.
   *
   * @throws [[ExpectedValueOfTypeError]] if any of its basic type argument is of wrong type
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // pass a number to be interpreted as a time
   * // should return {hours: 26, minutes: 24} for this example
   * const timeFromNumber = hfInstance.numberToTime(1.1);
   * ```
   *
   * @category Helpers
   */
  numberToTime(e) {
    return C(e, "number", "val"), $r(e);
  }
  /**
   * Subscribes to an event.
   * For the list of all available events, see [[Listeners]].
   *
   * @param {Event} event the name of the event to subscribe to
   * @param {Listener} listener to be called when event is emitted
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // subscribe to a 'sheetAdded', pass a simple handler
   * hfInstance.on('sheetAdded', ( ) => { console.log('foo') });
   *
   * // add a sheet to trigger an event,
   * // console should print 'foo' after each time sheet is added in this example
   * hfInstance.addSheet('FooBar');
   * ```
   *
   * @category Events
   */
  on(e, t) {
    this._emitter.on(e, t);
  }
  /**
   * Subscribes to an event once.
   * For the list of all available events, see [[Listeners]].
   *
   * @param {Event} event the name of the event to subscribe to
   * @param {Listener} listener to be called when event is emitted
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // subscribe to a 'sheetAdded', pass a simple handler
   * hfInstance.once('sheetAdded', ( ) => { console.log('foo') });
   *
   * // call addSheet twice,
   * // console should print 'foo' only once when the sheet is added in this example
   * hfInstance.addSheet('FooBar');
   * hfInstance.addSheet('FooBaz');
   * ```
   *
   * @category Events
   */
  once(e, t) {
    this._emitter.once(e, t);
  }
  /**
   * Unsubscribes from an event or from all events.
   * For the list of all available events, see [[Listeners]].
   *
   * @param {Event} event the name of the event to subscribe to
   * @param {Listener} listener to be called when event is emitted
   *
   * @example
   * ```js
   * const hfInstance = HyperFormula.buildEmpty();
   *
   * // define a simple function to be called upon emitting an event
   * const handler = ( ) => { console.log('baz') }
   *
   * // subscribe to a 'sheetAdded', pass the handler
   * hfInstance.on('sheetAdded', handler);
   *
   * // add a sheet to trigger an event,
   * // console should print 'baz' each time a sheet is added
   * hfInstance.addSheet('FooBar');
   *
   * // unsubscribe from a 'sheetAdded'
   * hfInstance.off('sheetAdded', handler);
   *
   * // add a sheet, the console should not print anything
   * hfInstance.addSheet('FooBaz');
   * ```
   *
   * @category Events
   */
  off(e, t) {
    this._emitter.off(e, t);
  }
  /**
   * Destroys instance of HyperFormula.
   *
   * @example
   * ```js
   * // destroys the instance
   * hfInstance.destroy();
   * ```
   *
   * @category Instance
   */
  destroy() {
    Xg(this);
  }
  /**
   * Throws an error if evaluation is suspended.
   *
   * @internal
   */
  ensureEvaluationIsNotSuspended() {
    if (this._evaluationSuspended)
      throw new $h();
  }
  /**
   * Parses a formula string and extracts its AST and dependencies.
   *
   * @internal
   */
  extractTemporaryFormula(e, t = 1) {
    const r = this._cellContentParser.parse(e), n = {
      sheet: t,
      col: 0,
      row: 0
    };
    if (!(r instanceof te.Formula))
      return {
        address: n,
        dependencies: []
      };
    const {
      ast: i,
      errors: a,
      dependencies: o
    } = this._parser.parse(r.formula, n);
    return a.length > 0 ? {
      address: n,
      dependencies: []
    } : {
      ast: i,
      address: n,
      dependencies: o
    };
  }
  /**
   * Rebuilds the engine with new configuration.
   */
  rebuildWithConfig(e) {
    const t = this._config.mergeConfig(e), r = this._config.mergeConfig({
      language: e.language
    }), n = this._serialization.withNewConfig(r, this._namedExpressions).getAllSheetsSerialized(), i = this._serialization.getAllNamedExpressionsSerialized(), a = Jn.rebuildWithConfig(t, n, i, this._stats);
    this._config = a.config, this._stats = a.stats, this._dependencyGraph = a.dependencyGraph, this._columnSearch = a.columnSearch, this._parser = a.parser, this._unparser = a.unparser, this._cellContentParser = a.cellContentParser, this._evaluator = a.evaluator, this._lazilyTransformingAstService = a.lazilyTransformingAstService, this._crudOperations = a.crudOperations, this._exporter = a.exporter, this._namedExpressions = a.namedExpressions, this._serialization = a.serialization, this._functionRegistry = a.functionRegistry;
  }
  /**
   * When enough transformations have accumulated, forces all formula vertices and
   * column index entries to apply pending lazy transformations, then compacts the
   * transformation history and cleans up orphaned undo oldData entries.
   */
  compactLazyTransformationsIfNeeded() {
    var e;
    this._lazilyTransformingAstService.needsCompaction() && (this._dependencyGraph.forceApplyPostponedTransformations(), this._columnSearch.forceApplyPostponedTransformations(), this._lazilyTransformingAstService.compact(), (e = this._lazilyTransformingAstService.undoRedo) === null || e === void 0 || e.cleanupOrphanedOldData());
  }
  /**
   * Runs a recomputation starting from recently changed vertices.
   *
   * Returns [an array of cells whose values changed as a result of this operation](/guide/basic-operations.md#changes-array).
   *
   * Note that this method may trigger dependency graph recalculation.
   *
   * @fires [[valuesUpdated]] if recalculation was triggered by this change
   */
  recomputeIfDependencyGraphNeedsIt() {
    if (this._evaluationSuspended)
      return [];
    {
      const e = this._crudOperations.getAndClearContentChanges(), t = this.dependencyGraph.verticesToRecompute();
      this.dependencyGraph.clearDirtyVertices(), this.compactLazyTransformationsIfNeeded(), t.length > 0 && e.addAll(this.evaluator.partialRun(t));
      const r = e.exportChanges(this._exporter);
      return e.isEmpty() || this._emitter.emit(Mt.ValuesUpdated, r), r;
    }
  }
}
Me.version = "3.3.0";
Me.buildDate = "20/05/2026 14:43:58";
Me.releaseDate = "20/05/2026";
Me.languages = {};
Me.registeredLanguages = /* @__PURE__ */ new Map();
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Qo = /* @__PURE__ */ new WeakMap();
class Qe {
  constructor(e = {}, t = !0) {
    const {
      accentSensitive: r,
      caseSensitive: n,
      caseFirst: i,
      chooseAddressMappingPolicy: a,
      context: o,
      currencySymbol: u,
      dateFormats: l,
      decimalSeparator: c,
      evaluateNullToZero: d,
      functionArgSeparator: p,
      functionPlugins: N,
      ignorePunctuation: T,
      leapYear1900: R,
      localeLang: S,
      language: A,
      ignoreWhiteSpace: y,
      licenseKey: v,
      matchWholeCell: w,
      arrayColumnSeparator: ee,
      arrayRowSeparator: Z,
      maxRows: J,
      maxColumns: ye,
      nullYear: me,
      nullDate: ue,
      parseDateTime: K,
      precisionEpsilon: yt,
      precisionRounding: Xe,
      stringifyDateTime: vt,
      stringifyDuration: tt,
      smartRounding: cr,
      timeFormats: _r,
      thousandSeparator: Pn,
      useArrayArithmetic: dr,
      useStats: Vn,
      undoLimit: Dn,
      maxPendingLazyTransformations: ui,
      useColumnIndex: Bn,
      useRegularExpressions: $e,
      useWildcards: kn
    } = e;
    this.useArrayArithmetic = z(dr, "boolean", "useArrayArithmetic"), this.accentSensitive = z(r, "boolean", "accentSensitive"), this.caseSensitive = z(n, "boolean", "caseSensitive"), this.caseFirst = z(i, ["upper", "lower", "false"], "caseFirst"), this.ignorePunctuation = z(T, "boolean", "ignorePunctuation"), this.chooseAddressMappingPolicy = a != null ? a : Qe.defaultConfig.chooseAddressMappingPolicy, this.dateFormats = [...$n(l, Array.isArray, "array", "dateFormats")], this.timeFormats = [...$n(_r, Array.isArray, "array", "timeFormats")], this.functionArgSeparator = z(p, "string", "functionArgSeparator"), this.decimalSeparator = z(c, [".", ","], "decimalSeparator"), this.language = z(A, "string", "language"), this.ignoreWhiteSpace = z(y, ["standard", "any"], "ignoreWhiteSpace"), this.licenseKey = z(v, "string", "licenseKey"), this.thousandSeparator = z(Pn, ["", ",", " ", "."], "thousandSeparator"), this.arrayColumnSeparator = z(ee, [",", ";"], "arrayColumnSeparator"), this.arrayRowSeparator = z(Z, [";", "|"], "arrayRowSeparator"), this.localeLang = z(S, "string", "localeLang"), this.functionPlugins = [...N != null ? N : Qe.defaultConfig.functionPlugins], this.smartRounding = z(cr, "boolean", "smartRounding"), this.evaluateNullToZero = z(d, "boolean", "evaluateNullToZero"), this.nullYear = z(me, "number", "nullYear"), fr(this.nullYear, "nullYear", 0), Sm(this.nullYear, "nullYear", 100), this.precisionRounding = z(Xe, "number", "precisionRounding"), fr(this.precisionRounding, "precisionRounding", 0), this.precisionEpsilon = z(yt, "number", "precisionEpsilon"), fr(this.precisionEpsilon, "precisionEpsilon", 0), this.useColumnIndex = z(Bn, "boolean", "useColumnIndex"), this.useStats = z(Vn, "boolean", "useStats"), this.parseDateTime = z(K, "function", "parseDateTime"), this.stringifyDateTime = z(vt, "function", "stringifyDateTime"), this.stringifyDuration = z(tt, "function", "stringifyDuration"), this.translationPackage = Me.getLanguage(this.language), this.errorMapping = this.translationPackage.buildErrorMapping(), this.nullDate = $n(ue, Rn, "IDate", "nullDate"), this.leapYear1900 = z(R, "boolean", "leapYear1900"), this.undoLimit = z(Dn, "number", "undoLimit"), this.maxPendingLazyTransformations = z(ui, "number", "maxPendingLazyTransformations"), this.useRegularExpressions = z($e, "boolean", "useRegularExpressions"), this.useWildcards = z(kn, "boolean", "useWildcards"), this.matchWholeCell = z(w, "boolean", "matchWholeCell"), fr(this.undoLimit, "undoLimit", 0), fr(this.maxPendingLazyTransformations, "maxPendingLazyTransformations", 1), this.maxRows = z(J, "number", "maxRows"), fr(this.maxRows, "maxRows", 1), this.maxColumns = z(ye, "number", "maxColumns"), this.currencySymbol = this.setupCurrencySymbol(u), fr(this.maxColumns, "maxColumns", 1), this.context = o, Qo.set(this, {
      licenseKeyValidityState: $m(this.licenseKey)
    }), Po({
      value: this.decimalSeparator,
      name: "decimalSeparator"
    }, {
      value: this.functionArgSeparator,
      name: "functionArgSeparator"
    }, {
      value: this.thousandSeparator,
      name: "thousandSeparator"
    }), Po({
      value: this.arrayRowSeparator,
      name: "arrayRowSeparator"
    }, {
      value: this.arrayColumnSeparator,
      name: "arrayColumnSeparator"
    });
  }
  setupCurrencySymbol(e) {
    const t = [...$n(e, Array.isArray, "array", "currencySymbol")];
    return t.forEach((r) => {
      if (typeof r != "string")
        throw new Y("string[]", "currencySymbol");
      if (r === "")
        throw new Yp("currencySymbol");
    }), t;
  }
  /**
   * Proxied property to its private counterpart. This makes the property
   * as accessible as the other Config options but without ability to change the value.
   *
   * @internal
   */
  get licenseKeyValidityState() {
    return Qo.get(this).licenseKeyValidityState;
  }
  getConfig() {
    return Tl(this);
  }
  mergeConfig(e) {
    const t = Object.assign({}, this.getConfig(), e);
    return new Qe(t, !1);
  }
  static warnDeprecatedOptions(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static warnDeprecatedIfUsed(e, t, r, n) {
    e !== void 0 && console.warn(n === void 0 ? `${t} option is deprecated since ${r}` : `${t} option is deprecated since ${r}, please use ${n}`);
  }
}
Qe.defaultConfig = {
  accentSensitive: !1,
  currencySymbol: ["$"],
  caseSensitive: !1,
  caseFirst: "lower",
  context: void 0,
  chooseAddressMappingPolicy: new bm(),
  dateFormats: ["DD/MM/YYYY", "DD/MM/YY"],
  decimalSeparator: ".",
  evaluateNullToZero: !1,
  functionArgSeparator: ",",
  functionPlugins: [],
  ignorePunctuation: !1,
  language: "enGB",
  ignoreWhiteSpace: "standard",
  licenseKey: "",
  leapYear1900: !1,
  localeLang: "en",
  matchWholeCell: !0,
  arrayColumnSeparator: ",",
  arrayRowSeparator: ";",
  maxRows: 4e4,
  maxColumns: 18278,
  nullYear: 30,
  nullDate: {
    year: 1899,
    month: 12,
    day: 30
  },
  parseDateTime: Im,
  precisionEpsilon: 1e-13,
  precisionRounding: 10,
  smartRounding: !0,
  stringifyDateTime: Wm,
  stringifyDuration: Hm,
  timeFormats: ["hh:mm", "hh:mm:ss.sss"],
  thousandSeparator: "",
  undoLimit: 20,
  maxPendingLazyTransformations: 50,
  useRegularExpressions: !1,
  useWildcards: !0,
  useColumnIndex: !1,
  useStats: !1,
  useArrayArithmetic: !1
};
function Tl(s) {
  var e;
  const t = {};
  for (const r in Qe.defaultConfig) {
    const n = (e = s[r]) !== null && e !== void 0 ? e : Qe.defaultConfig[r];
    Array.isArray(n) ? t[r] = [...n] : t[r] = n;
  }
  return t;
}
function Qg() {
  return Tl({});
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const ra = {
  errors: {
    CYCLE: "#CYCLE!",
    DIV_BY_ZERO: "#DIV/0!",
    ERROR: "#ERROR!",
    NA: "#N/A",
    NAME: "#NAME?",
    NUM: "#NUM!",
    REF: "#REF!",
    SPILL: "#SPILL!",
    VALUE: "#VALUE!"
  },
  functions: {
    FILTER: "FILTER",
    ADDRESS: "ADDRESS",
    ARRAY_CONSTRAIN: "ARRAY_CONSTRAIN",
    ARRAYFORMULA: "ARRAYFORMULA",
    ABS: "ABS",
    ACOS: "ACOS",
    ACOSH: "ACOSH",
    ACOT: "ACOT",
    ACOTH: "ACOTH",
    AND: "AND",
    ARABIC: "ARABIC",
    ASIN: "ASIN",
    ASINH: "ASINH",
    ATAN2: "ATAN2",
    ATAN: "ATAN",
    ATANH: "ATANH",
    AVERAGE: "AVERAGE",
    AVERAGEA: "AVERAGEA",
    AVERAGEIF: "AVERAGEIF",
    BASE: "BASE",
    BIN2DEC: "BIN2DEC",
    BIN2HEX: "BIN2HEX",
    BIN2OCT: "BIN2OCT",
    BITAND: "BITAND",
    BITLSHIFT: "BITLSHIFT",
    BITOR: "BITOR",
    BITRSHIFT: "BITRSHIFT",
    BITXOR: "BITXOR",
    CEILING: "CEILING",
    CHAR: "CHAR",
    CHOOSE: "CHOOSE",
    CLEAN: "CLEAN",
    CODE: "CODE",
    COLUMN: "COLUMN",
    COLUMNS: "COLUMNS",
    CONCATENATE: "CONCATENATE",
    CORREL: "CORREL",
    COS: "COS",
    COSH: "COSH",
    COT: "COT",
    COTH: "COTH",
    COUNT: "COUNT",
    COUNTA: "COUNTA",
    COUNTBLANK: "COUNTBLANK",
    COUNTIF: "COUNTIF",
    COUNTIFS: "COUNTIFS",
    COUNTUNIQUE: "COUNTUNIQUE",
    CSC: "CSC",
    CSCH: "CSCH",
    CUMIPMT: "CUMIPMT",
    CUMPRINC: "CUMPRINC",
    DATE: "DATE",
    DATEDIF: "DATEDIF",
    DATEVALUE: "DATEVALUE",
    DAY: "DAY",
    DAYS360: "DAYS360",
    DAYS: "DAYS",
    DB: "DB",
    DAVERAGE: "DAVERAGE",
    DCOUNT: "DCOUNT",
    DCOUNTA: "DCOUNTA",
    DGET: "DGET",
    DMAX: "DMAX",
    DMIN: "DMIN",
    DPRODUCT: "DPRODUCT",
    DSTDEV: "DSTDEV",
    DSTDEVP: "DSTDEVP",
    DSUM: "DSUM",
    DVAR: "DVAR",
    DVARP: "DVARP",
    DDB: "DDB",
    DEC2BIN: "DEC2BIN",
    DEC2HEX: "DEC2HEX",
    DEC2OCT: "DEC2OCT",
    DECIMAL: "DECIMAL",
    DEGREES: "DEGREES",
    DELTA: "DELTA",
    DOLLARDE: "DOLLARDE",
    DOLLARFR: "DOLLARFR",
    EDATE: "EDATE",
    EFFECT: "EFFECT",
    EOMONTH: "EOMONTH",
    ERF: "ERF",
    ERFC: "ERFC",
    EVEN: "EVEN",
    EXACT: "EXACT",
    EXP: "EXP",
    FALSE: "FALSE",
    FIND: "FIND",
    FORMULATEXT: "FORMULATEXT",
    FV: "FV",
    FVSCHEDULE: "FVSCHEDULE",
    HEX2BIN: "HEX2BIN",
    HEX2DEC: "HEX2DEC",
    HEX2OCT: "HEX2OCT",
    HLOOKUP: "HLOOKUP",
    HOUR: "HOUR",
    HYPERLINK: "HYPERLINK",
    IF: "IF",
    IFERROR: "IFERROR",
    IFNA: "IFNA",
    IFS: "IFS",
    INDEX: "INDEX",
    INT: "INT",
    INTERVAL: "INTERVAL",
    IPMT: "IPMT",
    IRR: "IRR",
    ISBINARY: "ISBINARY",
    ISBLANK: "ISBLANK",
    ISERR: "ISERR",
    ISERROR: "ISERROR",
    ISEVEN: "ISEVEN",
    ISFORMULA: "ISFORMULA",
    ISLOGICAL: "ISLOGICAL",
    ISNA: "ISNA",
    ISNONTEXT: "ISNONTEXT",
    ISNUMBER: "ISNUMBER",
    ISODD: "ISODD",
    ISOWEEKNUM: "ISOWEEKNUM",
    ISPMT: "ISPMT",
    ISREF: "ISREF",
    ISTEXT: "ISTEXT",
    LEFT: "LEFT",
    LEN: "LEN",
    LN: "LN",
    LOG10: "LOG10",
    LOG: "LOG",
    LOWER: "LOWER",
    MATCH: "MATCH",
    MAX: "MAX",
    MAXA: "MAXA",
    MAXIFS: "MAXIFS",
    MAXPOOL: "MAXPOOL",
    MEDIAN: "MEDIAN",
    MEDIANPOOL: "MEDIANPOOL",
    MID: "MID",
    MIN: "MIN",
    MINA: "MINA",
    MINIFS: "MINIFS",
    MINUTE: "MINUTE",
    MIRR: "MIRR",
    MMULT: "MMULT",
    MOD: "MOD",
    MONTH: "MONTH",
    N: "N",
    NA: "NA",
    NETWORKDAYS: "NETWORKDAYS",
    "NETWORKDAYS.INTL": "NETWORKDAYS.INTL",
    NOMINAL: "NOMINAL",
    NOT: "NOT",
    NOW: "NOW",
    NPER: "NPER",
    NPV: "NPV",
    OCT2BIN: "OCT2BIN",
    OCT2DEC: "OCT2DEC",
    OCT2HEX: "OCT2HEX",
    ODD: "ODD",
    OFFSET: "OFFSET",
    OR: "OR",
    PI: "PI",
    PMT: "PMT",
    PDURATION: "PDURATION",
    PRODUCT: "PRODUCT",
    POWER: "POWER",
    PPMT: "PPMT",
    PROPER: "PROPER",
    PV: "PV",
    RADIANS: "RADIANS",
    RAND: "RAND",
    RATE: "RATE",
    REPLACE: "REPLACE",
    REPT: "REPT",
    RIGHT: "RIGHT",
    ROMAN: "ROMAN",
    ROUND: "ROUND",
    ROUNDDOWN: "ROUNDDOWN",
    ROUNDUP: "ROUNDUP",
    ROW: "ROW",
    ROWS: "ROWS",
    RRI: "RRI",
    SEARCH: "SEARCH",
    SEC: "SEC",
    SECH: "SECH",
    SECOND: "SECOND",
    SEQUENCE: "SEQUENCE",
    SHEET: "SHEET",
    SHEETS: "SHEETS",
    SIN: "SIN",
    SINH: "SINH",
    SLN: "SLN",
    SPLIT: "SPLIT",
    SQRT: "SQRT",
    STDEVA: "STDEVA",
    "STDEV.P": "STDEV.P",
    STDEVPA: "STDEVPA",
    "STDEV.S": "STDEV.S",
    SUBSTITUTE: "SUBSTITUTE",
    SUBTOTAL: "SUBTOTAL",
    SUM: "SUM",
    SUMIF: "SUMIF",
    SUMIFS: "SUMIFS",
    SUMPRODUCT: "SUMPRODUCT",
    SUMSQ: "SUMSQ",
    SWITCH: "SWITCH",
    SYD: "SYD",
    T: "T",
    TAN: "TAN",
    TANH: "TANH",
    TBILLEQ: "TBILLEQ",
    TBILLPRICE: "TBILLPRICE",
    TBILLYIELD: "TBILLYIELD",
    TEXT: "TEXT",
    TEXTJOIN: "TEXTJOIN",
    TIME: "TIME",
    TIMEVALUE: "TIMEVALUE",
    TODAY: "TODAY",
    TRANSPOSE: "TRANSPOSE",
    TRIM: "TRIM",
    TRUE: "TRUE",
    TRUNC: "TRUNC",
    UNICHAR: "UNICHAR",
    UNICODE: "UNICODE",
    UPPER: "UPPER",
    VALUE: "VALUE",
    VARA: "VARA",
    "VAR.P": "VAR.P",
    VARPA: "VARPA",
    "VAR.S": "VAR.S",
    VLOOKUP: "VLOOKUP",
    WEEKDAY: "WEEKDAY",
    WEEKNUM: "WEEKNUM",
    WORKDAY: "WORKDAY",
    "WORKDAY.INTL": "WORKDAY.INTL",
    XNPV: "XNPV",
    XOR: "XOR",
    XLOOKUP: "XLOOKUP",
    YEAR: "YEAR",
    YEARFRAC: "YEARFRAC",
    "HF.ADD": "HF.ADD",
    "HF.CONCAT": "HF.CONCAT",
    "HF.DIVIDE": "HF.DIVIDE",
    "HF.EQ": "HF.EQ",
    "HF.GT": "HF.GT",
    "HF.GTE": "HF.GTE",
    "HF.LT": "HF.LT",
    "HF.LTE": "HF.LTE",
    "HF.MINUS": "HF.MINUS",
    "HF.MULTIPLY": "HF.MULTIPLY",
    "HF.NE": "HF.NE",
    "HF.POW": "HF.POW",
    "HF.UMINUS": "HF.UMINUS",
    "HF.UNARY_PERCENT": "HF.UNARY_PERCENT",
    "HF.UPLUS": "HF.UPLUS",
    VARP: "VARP",
    VAR: "VAR",
    STDEVP: "STDEVP",
    STDEV: "STDEV",
    "EXPON.DIST": "EXPON.DIST",
    FISHER: "FISHER",
    FISHERINV: "FISHERINV",
    GAMMA: "GAMMA",
    "GAMMA.DIST": "GAMMA.DIST",
    GAMMALN: "GAMMALN",
    "GAMMALN.PRECISE": "GAMMALN.PRECISE",
    "GAMMA.INV": "GAMMA.INV",
    GAUSS: "GAUSS",
    FACT: "FACT",
    FACTDOUBLE: "FACTDOUBLE",
    COMBIN: "COMBIN",
    COMBINA: "COMBINA",
    GCD: "GCD",
    LCM: "LCM",
    MROUND: "MROUND",
    MULTINOMIAL: "MULTINOMIAL",
    QUOTIENT: "QUOTIENT",
    RANDBETWEEN: "RANDBETWEEN",
    SERIESSUM: "SERIESSUM",
    SIGN: "SIGN",
    SQRTPI: "SQRTPI",
    SUMX2MY2: "SUMX2MY2",
    SUMX2PY2: "SUMX2PY2",
    SUMXMY2: "SUMXMY2",
    EXPONDIST: "EXPONDIST",
    GAMMADIST: "GAMMADIST",
    GAMMAINV: "GAMMAINV",
    "BETA.DIST": "BETA.DIST",
    BETADIST: "BETADIST",
    "BETA.INV": "BETA.INV",
    BETAINV: "BETAINV",
    "BINOM.DIST": "BINOM.DIST",
    BINOMDIST: "BINOMDIST",
    "BINOM.INV": "BINOM.INV",
    BESSELI: "BESSELI",
    BESSELJ: "BESSELJ",
    BESSELK: "BESSELK",
    BESSELY: "BESSELY",
    "CHISQ.DIST": "CHISQ.DIST",
    "CHISQ.DIST.RT": "CHISQ.DIST.RT",
    "CHISQ.INV": "CHISQ.INV",
    "CHISQ.INV.RT": "CHISQ.INV.RT",
    CHIDIST: "CHIDIST",
    CHIINV: "CHIINV",
    "F.DIST": "F.DIST",
    "F.DIST.RT": "F.DIST.RT",
    "F.INV": "F.INV",
    "F.INV.RT": "F.INV.RT",
    FDIST: "FDIST",
    FINV: "FINV",
    WEIBULL: "WEIBULL",
    "WEIBULL.DIST": "WEIBULL.DIST",
    POISSON: "POISSON",
    "POISSON.DIST": "POISSON.DIST",
    "HYPGEOM.DIST": "HYPGEOM.DIST",
    HYPGEOMDIST: "HYPGEOMDIST",
    "T.DIST": "T.DIST",
    "T.DIST.2T": "T.DIST.2T",
    "T.DIST.RT": "T.DIST.RT",
    "T.INV": "T.INV",
    "T.INV.2T": "T.INV.2T",
    TDIST: "TDIST",
    TINV: "TINV",
    LOGINV: "LOGINV",
    "LOGNORM.DIST": "LOGNORM.DIST",
    "LOGNORM.INV": "LOGNORM.INV",
    LOGNORMDIST: "LOGNORMDIST",
    "NORM.DIST": "NORM.DIST",
    "NORM.INV": "NORM.INV",
    "NORM.S.DIST": "NORM.S.DIST",
    "NORM.S.INV": "NORM.S.INV",
    NORMDIST: "NORMDIST",
    NORMINV: "NORMINV",
    NORMSDIST: "NORMSDIST",
    NORMSINV: "NORMSINV",
    PHI: "PHI",
    "NEGBINOM.DIST": "NEGBINOM.DIST",
    NEGBINOMDIST: "NEGBINOMDIST",
    COMPLEX: "COMPLEX",
    IMABS: "IMABS",
    IMAGINARY: "IMAGINARY",
    IMARGUMENT: "IMARGUMENT",
    IMCONJUGATE: "IMCONJUGATE",
    IMCOS: "IMCOS",
    IMCOSH: "IMCOSH",
    IMCOT: "IMCOT",
    IMCSC: "IMCSC",
    IMCSCH: "IMCSCH",
    IMDIV: "IMDIV",
    IMEXP: "IMEXP",
    IMLN: "IMLN",
    IMLOG10: "IMLOG10",
    IMLOG2: "IMLOG2",
    IMPOWER: "IMPOWER",
    IMPRODUCT: "IMPRODUCT",
    IMREAL: "IMREAL",
    IMSEC: "IMSEC",
    IMSECH: "IMSECH",
    IMSIN: "IMSIN",
    IMSINH: "IMSINH",
    IMSQRT: "IMSQRT",
    IMSUB: "IMSUB",
    IMSUM: "IMSUM",
    IMTAN: "IMTAN",
    LARGE: "LARGE",
    SMALL: "SMALL",
    PERCENTILE: "PERCENTILE",
    "PERCENTILE.INC": "PERCENTILE.INC",
    "PERCENTILE.EXC": "PERCENTILE.EXC",
    QUARTILE: "QUARTILE",
    "QUARTILE.INC": "QUARTILE.INC",
    "QUARTILE.EXC": "QUARTILE.EXC",
    AVEDEV: "AVEDEV",
    CONFIDENCE: "CONFIDENCE",
    "CONFIDENCE.NORM": "CONFIDENCE.NORM",
    "CONFIDENCE.T": "CONFIDENCE.T",
    DEVSQ: "DEVSQ",
    GEOMEAN: "GEOMEAN",
    HARMEAN: "HARMEAN",
    CRITBINOM: "CRITBINOM",
    "COVARIANCE.P": "COVARIANCE.P",
    "COVARIANCE.S": "COVARIANCE.S",
    COVAR: "COVAR",
    PEARSON: "PEARSON",
    RSQ: "RSQ",
    STANDARDIZE: "STANDARDIZE",
    "Z.TEST": "Z.TEST",
    ZTEST: "ZTEST",
    "F.TEST": "F.TEST",
    FTEST: "FTEST",
    STEYX: "STEYX",
    SLOPE: "SLOPE",
    "CHISQ.TEST": "CHISQ.TEST",
    CHITEST: "CHITEST",
    "T.TEST": "T.TEST",
    TTEST: "TTEST",
    SKEW: "SKEW",
    "SKEW.P": "SKEW.P",
    WEIBULLDIST: "WEIBULLDIST",
    VARS: "VARS",
    TINV2T: "TINV2T",
    TDISTRT: "TDISTRT",
    TDIST2T: "TDIST2T",
    STDEVS: "STDEVS",
    FINVRT: "FINVRT",
    FDISTRT: "FDISTRT",
    CHIDISTRT: "CHIDISTRT",
    CHIINVRT: "CHIINVRT",
    COVARIANCEP: "COVARIANCEP",
    COVARIANCES: "COVARIANCES",
    LOGNORMINV: "LOGNORMINV",
    POISSONDIST: "POISSONDIST",
    SKEWP: "SKEWP",
    "CEILING.MATH": "CEILING.MATH",
    FLOOR: "FLOOR",
    "FLOOR.MATH": "FLOOR.MATH",
    "CEILING.PRECISE": "CEILING.PRECISE",
    "FLOOR.PRECISE": "FLOOR.PRECISE",
    "ISO.CEILING": "ISO.CEILING"
  },
  langCode: "enGB",
  ui: {
    NEW_SHEET_PREFIX: "Sheet"
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
var Zt;
(function(s) {
  s[s.FullyAbsolute = 1] = "FullyAbsolute", s[s.RowAbsoluteColRelative = 2] = "RowAbsoluteColRelative", s[s.RowRelativeColAbsolute = 3] = "RowRelativeColAbsolute", s[s.FullyRelative = 4] = "FullyRelative";
})(Zt || (Zt = {}));
class Sl extends V {
  verifyAddressArguments(e, t, r, n) {
    if (n) {
      if (e < 1 || t < 1)
        return new f(m.VALUE, E.LessThanOne);
    } else if (Zt.FullyAbsolute == r) {
      if (e < 1 || t < 1)
        return new f(m.VALUE, E.LessThanOne);
    } else if (Zt.RowAbsoluteColRelative == r) {
      if (e < 1)
        return new f(m.VALUE, E.LessThanOne);
    } else if (Zt.RowRelativeColAbsolute == r && t < 1)
      return new f(m.VALUE, E.LessThanOne);
  }
  address(e, t) {
    return this.runFunction(e.args, t, this.metadata("ADDRESS"), (r, n, i, a, o) => {
      const u = this.verifyAddressArguments(r, n, i, a);
      if (u !== void 0)
        return u;
      const l = Xs(n - 1);
      let c = "";
      o != null && (c = `${o}!`);
      const d = n == 0 ? "C" : `C[${n}]`, p = r == 0 ? "R" : `R[${r}]`;
      return Zt.FullyRelative == i ? a ? `${c}${l}${r}` : `${c}${p}${d}` : Zt.RowRelativeColAbsolute == i ? a ? `${c}$${l}${r}` : `${c}${p}C${n}` : Zt.RowAbsoluteColRelative == i ? a ? `${c}${l}$${r}` : `${c}R${r}${d}` : a ? `${c}$${l}$${r}` : `${c}R${r}C${n}`;
    });
  }
}
Sl.implementedFunctions = {
  ADDRESS: {
    method: "address",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      defaultValue: 1,
      minValue: 1,
      maxValue: 4,
      emptyAsDefault: !0
    }, {
      argumentType: h.BOOLEAN,
      optionalArg: !0,
      defaultValue: !0,
      emptyAsDefault: !0
    }, {
      argumentType: h.STRING,
      optionalArg: !0
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Al extends V {
  arrayformula(e, t) {
    return this.runFunction(e.args, t, this.metadata("ARRAYFORMULA"), (r) => r);
  }
  arrayformulaArraySize(e, t) {
    if (e.args.length !== 1)
      return b.error();
    const r = this.metadata("ARRAYFORMULA");
    return e.args.map((i) => {
      var a;
      return this.arraySizeForAst(i, new Ut(t.formulaAddress, t.arraysFlag || ((a = r == null ? void 0 : r.enableArrayArithmeticForArguments) !== null && a !== void 0 ? a : !1)));
    })[0];
  }
  arrayconstrain(e, t) {
    return this.runFunction(e.args, t, this.metadata("ARRAY_CONSTRAIN"), (r, n, i) => {
      n = Math.min(n, r.height()), i = Math.min(i, r.width());
      const a = r.data, o = [];
      for (let u = 0; u < n; u++)
        o.push(a[u].slice(0, i));
      return M.onlyValues(o);
    });
  }
  arrayconstrainArraySize(e, t) {
    if (e.args.length !== 3)
      return b.error();
    const r = this.metadata("ARRAY_CONSTRAIN"), n = e.args.map((o) => {
      var u;
      return this.arraySizeForAst(o, new Ut(t.formulaAddress, t.arraysFlag || ((u = r == null ? void 0 : r.enableArrayArithmeticForArguments) !== null && u !== void 0 ? u : !1)));
    });
    let {
      height: i,
      width: a
    } = n[0];
    return e.args[1].type === g.NUMBER && (i = Math.min(i, e.args[1].value)), e.args[2].type === g.NUMBER && (a = Math.min(a, e.args[2].value)), i < 1 || a < 1 || !Number.isInteger(i) || !Number.isInteger(a) ? b.error() : new b(a, i);
  }
  filter(e, t) {
    return this.runFunction(e.args, t, this.metadata("FILTER"), (r, ...n) => {
      for (const o of n)
        if (r.width() !== o.width() || r.height() !== o.height())
          return new f(m.NA, E.EqualLength);
      if (r.width() > 1 && r.height() > 1)
        return new f(m.NA, E.WrongDimension);
      const i = r.data, a = [];
      for (let o = 0; o < r.height(); o++) {
        const u = [];
        for (let l = 0; l < r.width(); l++) {
          let c = !0;
          for (const d of n)
            if (tl(d.data[o][l]) !== !0) {
              c = !1;
              break;
            }
          c && u.push(i[o][l]);
        }
        u.length > 0 && a.push(u);
      }
      return a.length > 0 ? M.onlyValues(a) : new f(m.NA, E.EmptyRange);
    });
  }
  filterArraySize(e, t) {
    if (e.args.length <= 1)
      return b.error();
    const r = this.metadata("FILTER"), n = e.args.map((o) => {
      var u;
      return this.arraySizeForAst(o, new Ut(t.formulaAddress, t.arraysFlag || ((u = r == null ? void 0 : r.enableArrayArithmeticForArguments) !== null && u !== void 0 ? u : !1)));
    }), i = Math.max(...n.map((o) => o.width)), a = Math.max(...n.map((o) => o.height));
    return new b(i, a);
  }
}
Al.implementedFunctions = {
  ARRAYFORMULA: {
    method: "arrayformula",
    sizeOfResultArrayMethod: "arrayformulaArraySize",
    enableArrayArithmeticForArguments: !0,
    parameters: [{
      argumentType: h.ANY
    }]
  },
  ARRAY_CONSTRAIN: {
    method: "arrayconstrain",
    sizeOfResultArrayMethod: "arrayconstrainArraySize",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.INTEGER,
      minValue: 1
    }, {
      argumentType: h.INTEGER,
      minValue: 1
    }],
    vectorizationForbidden: !0
  },
  FILTER: {
    method: "filter",
    sizeOfResultArrayMethod: "filterArraySize",
    enableArrayArithmeticForArguments: !0,
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }],
    repeatLastArgs: 1
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class yl extends V {
  abs(e, t) {
    return this.runFunction(e.args, t, this.metadata("ABS"), Math.abs);
  }
}
yl.implementedFunctions = {
  ABS: {
    method: "abs",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Zg = 281474976710655, Zo = -53, Jo = 53;
class vl extends V {
  bitlshift(e, t) {
    return this.runFunction(e.args, t, this.metadata("BITLSHIFT"), Cl);
  }
  bitrshift(e, t) {
    return this.runFunction(e.args, t, this.metadata("BITRSHIFT"), Il);
  }
}
vl.implementedFunctions = {
  BITLSHIFT: {
    method: "bitlshift",
    parameters: [{
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: Zo,
      maxValue: Jo
    }]
  },
  BITRSHIFT: {
    method: "bitrshift",
    parameters: [{
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: Zo,
      maxValue: Jo
    }]
  }
};
function Cl(s, e) {
  return e < 0 ? Il(s, -e) : Ol(s * Math.pow(2, e));
}
function Il(s, e) {
  return e < 0 ? Cl(s, -e) : Ol(Math.floor(s / Math.pow(2, e)));
}
function Ol(s) {
  return s > Zg ? new f(m.NUM, E.BitshiftLong) : s;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ml extends V {
  bitand(e, t) {
    return this.runFunction(e.args, t, this.metadata("BITAND"), (r, n) => r & n);
  }
  bitor(e, t) {
    return this.runFunction(e.args, t, this.metadata("BITOR"), (r, n) => r | n);
  }
  bitxor(e, t) {
    return this.runFunction(e.args, t, this.metadata("BITXOR"), (r, n) => r ^ n);
  }
}
Ml.implementedFunctions = {
  BITAND: {
    method: "bitand",
    parameters: [{
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 0
    }]
  },
  BITOR: {
    method: "bitor",
    parameters: [{
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 0
    }]
  },
  BITXOR: {
    method: "bitxor",
    parameters: [{
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 0
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class wl extends V {
  /**
   * Corresponds to TRUE()
   *
   * Returns the logical true
   *
   * @param ast
   * @param state
   */
  literalTrue(e, t) {
    return this.runFunction(e.args, t, this.metadata("TRUE"), () => !0);
  }
  /**
   * Corresponds to FALSE()
   *
   * Returns the logical false
   *
   * @param ast
   * @param state
   */
  literalFalse(e, t) {
    return this.runFunction(e.args, t, this.metadata("FALSE"), () => !1);
  }
  /**
   * Corresponds to IF(expression, value_if_true, value_if_false)
   *
   * Returns value specified as second argument if expression is true and third argument if expression is false
   *
   * @param ast
   * @param state
   */
  conditionalIf(e, t) {
    return this.runFunction(e.args, t, this.metadata("IF"), (r, n, i) => r ? n : i);
  }
  /**
   * Implementation for the IFS function. Returns the value that corresponds to the first true condition.
   *
   * @param ast
   * @param state
   */
  ifs(e, t) {
    return this.runFunction(e.args, t, this.metadata("IFS"), (...r) => {
      for (let n = 0; n < r.length; n += 2)
        if (r[n])
          return r[n + 1];
      return new f(m.NA, E.NoConditionMet);
    });
  }
  /**
   * Corresponds to AND(expression1, [expression2, ...])
   *
   * Returns true if all of the provided arguments are logically true, and false if any of it is logically false
   *
   * @param ast
   * @param state
   */
  and(e, t) {
    return this.runFunction(e.args, t, this.metadata("AND"), (...r) => r.filter((n) => n !== void 0).every((n) => !!n));
  }
  /**
   * Corresponds to OR(expression1, [expression2, ...])
   *
   * Returns true if any of the provided arguments are logically true, and false otherwise
   *
   * @param ast
   * @param state
   */
  or(e, t) {
    return this.runFunction(e.args, t, this.metadata("OR"), (...r) => r.filter((n) => n !== void 0).some((n) => n));
  }
  not(e, t) {
    return this.runFunction(e.args, t, this.metadata("NOT"), (r) => !r);
  }
  xor(e, t) {
    return this.runFunction(e.args, t, this.metadata("XOR"), (...r) => {
      let n = 0;
      return r.filter((i) => i !== void 0).forEach((i) => {
        i && n++;
      }), n % 2 === 1;
    });
  }
  switch(e, t) {
    return this.runFunction(e.args, t, this.metadata("SWITCH"), (r, ...n) => {
      const i = n.length;
      let a = 0;
      for (; a + 1 < i; a += 2)
        if (!(n[a] instanceof f) && this.arithmeticHelper.eq(r, n[a]))
          return n[a + 1];
      return a < i ? n[a] : new f(m.NA, E.NoDefault);
    });
  }
  iferror(e, t) {
    return this.runFunction(e.args, t, this.metadata("IFERROR"), (r, n) => r instanceof f ? n : r);
  }
  ifna(e, t) {
    return this.runFunction(e.args, t, this.metadata("IFNA"), (r, n) => r instanceof f && r.type === m.NA ? n : r);
  }
  choose(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHOOSE"), (r, ...n) => r > n.length ? new f(m.NUM, E.Selector) : n[r - 1]);
  }
}
wl.implementedFunctions = {
  TRUE: {
    method: "literalTrue",
    parameters: []
  },
  FALSE: {
    method: "literalFalse",
    parameters: []
  },
  IF: {
    method: "conditionalIf",
    parameters: [{
      argumentType: h.BOOLEAN
    }, {
      argumentType: h.SCALAR,
      passSubtype: !0
    }, {
      argumentType: h.SCALAR,
      defaultValue: !1,
      passSubtype: !0
    }]
  },
  IFS: {
    method: "ifs",
    parameters: [{
      argumentType: h.BOOLEAN
    }, {
      argumentType: h.SCALAR,
      passSubtype: !0
    }],
    repeatLastArgs: 2
  },
  AND: {
    method: "and",
    parameters: [{
      argumentType: h.BOOLEAN
    }],
    repeatLastArgs: 1,
    expandRanges: !0
  },
  OR: {
    method: "or",
    parameters: [{
      argumentType: h.BOOLEAN
    }],
    repeatLastArgs: 1,
    expandRanges: !0
  },
  XOR: {
    method: "xor",
    parameters: [{
      argumentType: h.BOOLEAN
    }],
    repeatLastArgs: 1,
    expandRanges: !0
  },
  NOT: {
    method: "not",
    parameters: [{
      argumentType: h.BOOLEAN
    }]
  },
  SWITCH: {
    method: "switch",
    parameters: [{
      argumentType: h.NOERROR
    }, {
      argumentType: h.SCALAR,
      passSubtype: !0
    }, {
      argumentType: h.SCALAR,
      passSubtype: !0
    }],
    repeatLastArgs: 1
  },
  IFERROR: {
    method: "iferror",
    parameters: [{
      argumentType: h.SCALAR,
      passSubtype: !0
    }, {
      argumentType: h.SCALAR,
      passSubtype: !0
    }]
  },
  IFNA: {
    method: "ifna",
    parameters: [{
      argumentType: h.SCALAR,
      passSubtype: !0
    }, {
      argumentType: h.SCALAR,
      passSubtype: !0
    }]
  },
  CHOOSE: {
    method: "choose",
    parameters: [{
      argumentType: h.INTEGER,
      minValue: 1
    }, {
      argumentType: h.SCALAR,
      passSubtype: !0
    }],
    repeatLastArgs: 1
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class _l extends V {
  char(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHAR"), (r) => r < 1 || r >= 256 ? new f(m.VALUE, E.CharacterCodeBounds) : String.fromCharCode(Math.trunc(r)));
  }
  unichar(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHAR"), (r) => r < 1 || r >= 1114112 ? new f(m.VALUE, E.CharacterCodeBounds) : String.fromCodePoint(Math.trunc(r)));
  }
}
_l.implementedFunctions = {
  CHAR: {
    method: "char",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  UNICHAR: {
    method: "unichar",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ll extends V {
  code(e, t) {
    return this.runFunction(e.args, t, this.metadata("CODE"), (r) => r.length === 0 ? new f(m.VALUE, E.EmptyString) : r.charCodeAt(0));
  }
  unicode(e, t) {
    return this.runFunction(e.args, t, this.metadata("UNICODE"), (r) => {
      var n;
      return (n = r.codePointAt(0)) !== null && n !== void 0 ? n : new f(m.VALUE, E.EmptyString);
    });
  }
}
Ll.implementedFunctions = {
  CODE: {
    method: "code",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  UNICODE: {
    method: "unicode",
    parameters: [{
      argumentType: h.STRING
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Fl extends V {
  countblank(e, t) {
    return this.runFunction(e.args, t, this.metadata("COUNTBLANK"), (...r) => {
      let n = 0;
      return r.forEach((i) => {
        i === B && n++;
      }), n;
    });
  }
}
Fl.implementedFunctions = {
  COUNTBLANK: {
    method: "countblank",
    parameters: [{
      argumentType: h.SCALAR
    }],
    repeatLastArgs: 1,
    expandRanges: !0
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ul extends V {
  /**
   * Corresponds to COUNTUNIQUE(Number1, Number2, ...).
   *
   * Returns number of unique numbers from arguments
   *
   * @param ast
   * @param state
   */
  countunique(e, t) {
    return this.runFunction(e.args, t, this.metadata("COUNTUNIQUE"), (...r) => {
      const n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
      for (const a of r)
        a instanceof f ? i.add(a.type) : a !== "" && n.add(a);
      return n.size + i.size;
    });
  }
}
Ul.implementedFunctions = {
  COUNTUNIQUE: {
    method: "countunique",
    parameters: [{
      argumentType: h.SCALAR
    }],
    repeatLastArgs: 1,
    expandRanges: !0
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const st = [{
  argumentType: h.RANGE
}, {
  argumentType: h.SCALAR
}, {
  argumentType: h.RANGE
}];
class xl extends V {
  /**
   * Resolves field index and criteria, then delegates to the callback with the parsed database arguments.
   * Shared boilerplate for all 12 database functions.
   */
  withDatabaseArgs(e, t, r, n) {
    return this.runFunction(e.args, t, this.metadata(r), (i, a, o) => {
      const u = this.resolveFieldIndex(i, a);
      if (u instanceof f)
        return u;
      const l = this.buildDatabaseCriteria(i, o);
      return l instanceof f ? l : n(i.data, u, l);
    });
  }
  /**
   * Counts cells containing numbers in the specified field of a database range,
   * for rows that match all criteria.
   *
   * DCOUNT(database, field, criteria)
   */
  dcount(e, t) {
    return this.withDatabaseArgs(e, t, "DCOUNT", (r, n, i) => {
      let a = 0;
      for (let o = 1; o < r.length; o++)
        if (this.rowMatchesCriteria(r[o], i)) {
          const u = r[o][n];
          if (u instanceof f)
            return u;
          D(u) && a++;
        }
      return a;
    });
  }
  /**
   * Counts all non-blank cells in the specified field of a database range,
   * for rows that match all criteria.
   *
   * DCOUNTA(database, field, criteria)
   */
  dcounta(e, t) {
    return this.withDatabaseArgs(e, t, "DCOUNTA", (r, n, i) => {
      let a = 0;
      for (let o = 1; o < r.length; o++)
        if (this.rowMatchesCriteria(r[o], i)) {
          const u = r[o][n];
          if (u instanceof f)
            return u;
          u !== B && u !== void 0 && u !== null && a++;
        }
      return a;
    });
  }
  /**
   * Returns the product of numeric values in the specified field of a database range,
   * for rows that match all criteria.
   *
   * DPRODUCT(database, field, criteria)
   */
  dproduct(e, t) {
    return this.withDatabaseArgs(e, t, "DPRODUCT", (r, n, i) => {
      let a = 1, o = !1;
      for (let u = 1; u < r.length; u++)
        if (this.rowMatchesCriteria(r[u], i)) {
          const l = r[u][n];
          if (l instanceof f)
            return l;
          D(l) && (a *= I(l), o = !0);
        }
      return o ? a : 0;
    });
  }
  /**
   * Returns the sum of numeric values in the specified field of a database range,
   * for rows that match all criteria.
   *
   * DSUM(database, field, criteria)
   */
  dsum(e, t) {
    return this.withDatabaseArgs(e, t, "DSUM", (r, n, i) => {
      let a = 0;
      for (let o = 1; o < r.length; o++)
        if (this.rowMatchesCriteria(r[o], i)) {
          const u = r[o][n];
          if (u instanceof f)
            return u;
          D(u) && (a += I(u));
        }
      return a;
    });
  }
  /**
   * Returns the average of numeric values in the specified field of a database range,
   * for rows that match all criteria.
   * Returns #DIV/0! when no numeric values are found.
   *
   * DAVERAGE(database, field, criteria)
   */
  daverage(e, t) {
    return this.withDatabaseArgs(e, t, "DAVERAGE", (r, n, i) => {
      let a = 0, o = 0;
      for (let u = 1; u < r.length; u++)
        if (this.rowMatchesCriteria(r[u], i)) {
          const l = r[u][n];
          if (l instanceof f)
            return l;
          D(l) && (a += I(l), o++);
        }
      return o === 0 ? new f(m.DIV_BY_ZERO) : a / o;
    });
  }
  /**
   * Returns a single value from the specified field of a database range,
   * for the row that matches all criteria.
   * Returns #VALUE! if no rows match, #NUM! if more than one row matches.
   *
   * DGET(database, field, criteria)
   */
  dget(e, t) {
    return this.withDatabaseArgs(e, t, "DGET", (r, n, i) => {
      let a, o = 0;
      for (let u = 1; u < r.length; u++)
        if (this.rowMatchesCriteria(r[u], i)) {
          if (o++, o > 1)
            return new f(m.NUM, E.ValueLarge);
          a = r[u][n];
        }
      return o === 0 ? new f(m.VALUE, E.WrongType) : a instanceof f ? a : a === B || a === void 0 || a === null ? 0 : a;
    });
  }
  /**
   * Returns the maximum numeric value in the specified field of a database range,
   * for rows that match all criteria.
   * Returns 0 when no numeric values are found (Excel behavior).
   *
   * DMAX(database, field, criteria)
   */
  dmax(e, t) {
    return this.withDatabaseArgs(e, t, "DMAX", (r, n, i) => {
      let a = -1 / 0, o = !1;
      for (let u = 1; u < r.length; u++)
        if (this.rowMatchesCriteria(r[u], i)) {
          const l = r[u][n];
          if (l instanceof f)
            return l;
          if (D(l)) {
            const c = I(l);
            c > a && (a = c), o = !0;
          }
        }
      return o ? a : 0;
    });
  }
  /**
   * Returns the minimum numeric value in the specified field of a database range,
   * for rows that match all criteria.
   * Returns 0 when no numeric values are found (Excel behavior).
   *
   * DMIN(database, field, criteria)
   */
  dmin(e, t) {
    return this.withDatabaseArgs(e, t, "DMIN", (r, n, i) => {
      let a = 1 / 0, o = !1;
      for (let u = 1; u < r.length; u++)
        if (this.rowMatchesCriteria(r[u], i)) {
          const l = r[u][n];
          if (l instanceof f)
            return l;
          if (D(l)) {
            const c = I(l);
            c < a && (a = c), o = !0;
          }
        }
      return o ? a : 0;
    });
  }
  /**
   * Returns the sample standard deviation of numeric values in the specified field
   * of a database range, for rows that match all criteria.
   * Returns #DIV/0! when fewer than 2 numeric values are found.
   *
   * DSTDEV(database, field, criteria)
   */
  dstdev(e, t) {
    return this.withDatabaseArgs(e, t, "DSTDEV", (r, n, i) => {
      const a = this.collectNumericValues(r, n, i);
      if (a instanceof f)
        return a;
      if (a.length <= 1)
        return new f(m.DIV_BY_ZERO);
      const o = a.reduce((l, c) => l + c, 0) / a.length, u = a.reduce((l, c) => l + Math.pow(c - o, 2), 0) / (a.length - 1);
      return Math.sqrt(u);
    });
  }
  /**
   * Returns the population standard deviation of numeric values in the specified field
   * of a database range, for rows that match all criteria.
   * Returns #DIV/0! when no numeric values are found.
   * Returns 0 when exactly one numeric value is found.
   *
   * DSTDEVP(database, field, criteria)
   */
  dstdevp(e, t) {
    return this.withDatabaseArgs(e, t, "DSTDEVP", (r, n, i) => {
      const a = this.collectNumericValues(r, n, i);
      if (a instanceof f)
        return a;
      if (a.length === 0)
        return new f(m.DIV_BY_ZERO);
      const o = a.reduce((l, c) => l + c, 0) / a.length, u = a.reduce((l, c) => l + Math.pow(c - o, 2), 0) / a.length;
      return Math.sqrt(u);
    });
  }
  /**
   * Returns the sample variance of numeric values in the specified field
   * of a database range, for rows that match all criteria.
   * Returns #DIV/0! when fewer than 2 numeric values are found.
   *
   * DVAR(database, field, criteria)
   */
  dvar(e, t) {
    return this.withDatabaseArgs(e, t, "DVAR", (r, n, i) => {
      const a = this.collectNumericValues(r, n, i);
      if (a instanceof f)
        return a;
      if (a.length <= 1)
        return new f(m.DIV_BY_ZERO);
      const o = a.reduce((u, l) => u + l, 0) / a.length;
      return a.reduce((u, l) => u + Math.pow(l - o, 2), 0) / (a.length - 1);
    });
  }
  /**
   * Returns the population variance of numeric values in the specified field
   * of a database range, for rows that match all criteria.
   * Returns #DIV/0! when no numeric values are found.
   * Returns 0 when exactly one numeric value is found.
   *
   * DVARP(database, field, criteria)
   */
  dvarp(e, t) {
    return this.withDatabaseArgs(e, t, "DVARP", (r, n, i) => {
      const a = this.collectNumericValues(r, n, i);
      if (a instanceof f)
        return a;
      if (a.length === 0)
        return new f(m.DIV_BY_ZERO);
      const o = a.reduce((u, l) => u + l, 0) / a.length;
      return a.reduce((u, l) => u + Math.pow(l - o, 2), 0) / a.length;
    });
  }
  /**
   * Collects numeric values from the specified field column of matching database rows.
   *
   * @param dbData - Full database data including header row.
   * @param fieldIndex - 0-based column index of the target field.
   * @param criteriaRows - Parsed criteria rows.
   * @returns Array of numeric values from matching rows, or the first CellError
   *   encountered in a matching field cell (propagated per Excel semantics).
   */
  collectNumericValues(e, t, r) {
    const n = [];
    for (let i = 1; i < e.length; i++)
      if (this.rowMatchesCriteria(e[i], r)) {
        const a = e[i][t];
        if (a instanceof f)
          return a;
        D(a) && n.push(I(a));
      }
    return n;
  }
  /**
   * Resolves the field argument to a 0-based column index within the database range.
   *
   * @param database - The database range (first row = headers).
   * @param field - A string (header name, case-insensitive) or number (1-based column index).
   *   Booleans are coerced to numbers (TRUE → 1, FALSE → 0) per Excel convention.
   * @returns 0-based column index, or CellError if field is invalid.
   */
  resolveFieldIndex(e, t) {
    if (t instanceof f)
      return t;
    const r = e.data[0];
    if (typeof t == "string") {
      const i = t.toLowerCase();
      for (let a = 0; a < r.length; a++) {
        const o = r[a];
        if (typeof o == "string" && o.toLowerCase() === i)
          return a;
      }
      return new f(m.VALUE, E.WrongType);
    }
    const n = typeof t == "boolean" ? Number(t) : t;
    if (D(n)) {
      const i = Math.trunc(I(n));
      return !Number.isFinite(i) || i < 1 || i > r.length ? new f(m.VALUE, E.WrongType) : i - 1;
    }
    return new f(m.VALUE, E.WrongType);
  }
  /**
   * Parses the criteria range into an array of criteria rows.
   * Each row is a list of AND-ed conditions. Rows are OR-ed together.
   *
   * @param database - The database range (first row = headers).
   * @param criteria - The criteria range (first row = header labels, subsequent rows = conditions).
   * @returns Array of criteria rows, or CellError if a criterion cannot be parsed.
   */
  buildDatabaseCriteria(e, t) {
    var r;
    const n = e.data[0], i = t.data, a = i[0];
    for (const l of a)
      if (l instanceof f)
        return l;
    const o = a.map((l) => {
      if (typeof l != "string")
        return -1;
      const c = l.toLowerCase();
      return n.findIndex((d) => typeof d == "string" && d.toLowerCase() === c);
    }), u = [];
    for (let l = 1; l < i.length; l++) {
      const c = [];
      for (let d = 0; d < a.length; d++) {
        const p = o[d];
        if (p === -1)
          continue;
        const N = (r = i[l]) === null || r === void 0 ? void 0 : r[d];
        if (N === B || N === void 0 || N === null)
          continue;
        if (N instanceof f)
          return N;
        const T = D(N) ? I(N) : N, R = this.interpreter.criterionBuilder.fromCellValue(T, this.arithmeticHelper);
        if (R === void 0)
          return new f(m.VALUE, E.BadCriterion);
        c.push({
          columnIndex: p,
          lambda: R.lambda
        });
      }
      u.push(c);
    }
    return u;
  }
  /**
   * Tests whether a database data row matches any of the criteria rows (OR logic).
   * Within each criteria row, all conditions must match (AND logic).
   *
   * @param dataRow - A single row of data from the database (excluding the header row).
   * @param criteriaRows - Parsed criteria rows.
   * @returns true if the row qualifies, false otherwise.
   */
  rowMatchesCriteria(e, t) {
    return t.length === 0 ? !1 : t.some((r) => r.length === 0 ? !0 : r.every((n) => {
      const i = e[n.columnIndex], a = D(i) ? I(i) : i;
      return n.lambda(a);
    }));
  }
}
xl.implementedFunctions = {
  DCOUNT: {
    method: "dcount",
    parameters: st
  },
  DCOUNTA: {
    method: "dcounta",
    parameters: st
  },
  DPRODUCT: {
    method: "dproduct",
    parameters: st
  },
  DSTDEV: {
    method: "dstdev",
    parameters: st
  },
  DSTDEVP: {
    method: "dstdevp",
    parameters: st
  },
  DSUM: {
    method: "dsum",
    parameters: st
  },
  DVAR: {
    method: "dvar",
    parameters: st
  },
  DVARP: {
    method: "dvarp",
    parameters: st
  },
  DAVERAGE: {
    method: "daverage",
    parameters: st
  },
  DGET: {
    method: "dget",
    parameters: st
  },
  DMAX: {
    method: "dmax",
    parameters: st
  },
  DMIN: {
    method: "dmin",
    parameters: st
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class bl extends V {
  constructor() {
    super(...arguments), this.isoweeknumCore = (e) => {
      const t = Math.floor(this.dateTimeHelper.relativeNumberToAbsoluteNumber(e)), r = this.dateTimeHelper.numberToSimpleDate(e), n = this.dateTimeHelper.dateToNumber({
        year: r.year,
        month: 1,
        day: 1
      }), i = this.dateTimeHelper.relativeNumberToAbsoluteNumber(n), a = i + ((4 - i) % 7 + 7) % 7, o = Math.floor((t - 1) / 7) - Math.floor((a - 1) / 7) + 1;
      return o === 0 ? this.isoweeknumCore(e - 7) + 1 : o;
    }, this.days360Core = (e, t, r) => {
      const n = this.dateTimeHelper.numberToSimpleDate(e), i = this.dateTimeHelper.numberToSimpleDate(t);
      let a, o;
      return r ? (a = Go(n), o = Go(i)) : [a, o] = this.dateTimeHelper.toBasisUS(n, i), 360 * (o.year - a.year) + 30 * (o.month - a.month) + o.day - a.day;
    };
  }
  /**
   * Corresponds to DATE(year, month, day)
   *
   * Converts a provided year, month and day into date
   *
   * @param ast
   * @param state
   */
  date(e, t) {
    return this.runFunction(e.args, t, this.metadata("DATE"), (r, n, i) => {
      const a = Math.trunc(i);
      let o = Math.trunc(n), u = Math.trunc(r);
      u < this.dateTimeHelper.getEpochYearZero() && (u += this.dateTimeHelper.getEpochYearZero());
      const l = Math.floor((o - 1) / 12);
      u += l, o -= l * 12;
      const c = {
        year: u,
        month: o,
        day: 1
      };
      if (this.dateTimeHelper.isValidDate(c)) {
        let d = this.dateTimeHelper.dateToNumber(c) + (a - 1);
        return d = this.dateTimeHelper.getWithinBounds(d), d === void 0 ? new f(m.NUM, E.DateBounds) : d;
      }
      return new f(m.VALUE, E.InvalidDate);
    });
  }
  time(e, t) {
    return this.runFunction(e.args, t, this.metadata("TIME"), (r, n, i) => {
      const a = Kr({
        hours: Math.trunc(r),
        minutes: Math.trunc(n),
        seconds: Math.trunc(i)
      });
      return a < 0 ? new f(m.NUM, E.NegativeTime) : a % 1;
    });
  }
  /**
   * Implementation for the EOMONTH function
   */
  eomonth(e, t) {
    return this.runFunction(e.args, t, this.metadata("EOMONTH"), (r, n) => {
      const i = this.dateTimeHelper.numberToSimpleDate(r);
      let a = this.dateTimeHelper.dateToNumber(this.dateTimeHelper.endOfMonth(ko(i, n)));
      return a = this.dateTimeHelper.getWithinBounds(a), a === void 0 ? new f(m.NUM, E.DateBounds) : a;
    });
  }
  day(e, t) {
    return this.runFunction(e.args, t, this.metadata("DAY"), (r) => this.dateTimeHelper.numberToSimpleDate(r).day);
  }
  days(e, t) {
    return this.runFunction(e.args, t, this.metadata("DAYS"), (r, n) => Math.trunc(r) - Math.trunc(n));
  }
  /**
   * Corresponds to MONTH(date)
   *
   * Returns the month of the year specified by a given date
   *
   * @param ast
   * @param state
   */
  month(e, t) {
    return this.runFunction(e.args, t, this.metadata("MONTH"), (r) => this.dateTimeHelper.numberToSimpleDate(r).month);
  }
  /**
   * Corresponds to YEAR(date)
   *
   * Returns the year specified by a given date
   *
   * @param ast
   * @param state
   */
  year(e, t) {
    return this.runFunction(e.args, t, this.metadata("YEAR"), (r) => this.dateTimeHelper.numberToSimpleDate(r).year);
  }
  hour(e, t) {
    return this.runFunction(e.args, t, this.metadata("HOUR"), (r) => $r(Ai(r) % 1).hours);
  }
  minute(e, t) {
    return this.runFunction(e.args, t, this.metadata("MINUTE"), (r) => $r(Ai(r) % 1).minutes);
  }
  second(e, t) {
    return this.runFunction(e.args, t, this.metadata("SECOND"), (r) => $r(Ai(r) % 1).seconds);
  }
  /**
   * Corresponds to TEXT(number, format)
   *
   * Tries to convert number to specified date format.
   *
   * @param ast
   * @param state
   */
  text(e, t) {
    return this.runFunction(e.args, t, this.metadata("TEXT"), (r, n) => Bm(r, n, this.config, this.dateTimeHelper));
  }
  weekday(e, t) {
    return this.runFunction(e.args, t, this.metadata("WEEKDAY"), (r, n) => {
      const i = Math.floor(this.dateTimeHelper.relativeNumberToAbsoluteNumber(r));
      if (n === 3)
        return (i - 1) % 7;
      const a = ru.get(n);
      return a === void 0 ? new f(m.NUM, E.BadMode) : (i - a) % 7 + 1;
    });
  }
  weeknum(e, t) {
    return this.runFunction(e.args, t, this.metadata("WEEKNUM"), (r, n) => {
      const i = Math.floor(this.dateTimeHelper.relativeNumberToAbsoluteNumber(r)), a = this.dateTimeHelper.numberToSimpleDate(r), o = this.dateTimeHelper.dateToNumber({
        year: a.year,
        month: 1,
        day: 1
      }), u = this.dateTimeHelper.relativeNumberToAbsoluteNumber(o);
      if (n === 21)
        return this.isoweeknumCore(r);
      const l = ru.get(n);
      return l === void 0 ? new f(m.NUM, E.BadMode) : Math.floor((i - l) / 7) - Math.floor((u - l) / 7) + 1;
    });
  }
  isoweeknum(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISOWEEKNUM"), this.isoweeknumCore);
  }
  datevalue(e, t) {
    return this.runFunction(e.args, t, this.metadata("DATEVALUE"), (r) => {
      const {
        dateTime: n
      } = this.dateTimeHelper.parseDateTimeFromConfigFormats(r);
      return n === void 0 ? new f(m.VALUE, E.IncorrectDateTime) : Rn(n) ? (ul(n) ? Math.trunc(Kr(n)) : 0) + this.dateTimeHelper.dateToNumber(n) : 0;
    });
  }
  timevalue(e, t) {
    return this.runFunction(e.args, t, this.metadata("TIMEVALUE"), (r) => {
      const n = this.dateTimeHelper.dateStringToDateNumber(r);
      return n === void 0 ? new f(m.VALUE, E.IncorrectDateTime) : I(n) % 1;
    });
  }
  now(e, t) {
    return this.runFunction(e.args, t, this.metadata("NOW"), () => {
      const r = new Date(Date.now());
      return Kr({
        hours: r.getHours(),
        minutes: r.getMinutes(),
        seconds: r.getSeconds()
      }) + this.dateTimeHelper.dateToNumber({
        year: r.getFullYear(),
        month: r.getMonth() + 1,
        day: r.getDate()
      });
    });
  }
  today(e, t) {
    return this.runFunction(e.args, t, this.metadata("TODAY"), () => {
      const r = new Date(Date.now());
      return this.dateTimeHelper.dateToNumber({
        year: r.getFullYear(),
        month: r.getMonth() + 1,
        day: r.getDate()
      });
    });
  }
  edate(e, t) {
    return this.runFunction(e.args, t, this.metadata("EDATE"), (r, n) => {
      const i = this.dateTimeHelper.numberToSimpleDate(r), a = Um(ko(i, n));
      let o = this.dateTimeHelper.dateToNumber(a);
      return o = this.dateTimeHelper.getWithinBounds(o), o === void 0 ? new f(m.NUM, E.DateBounds) : o;
    });
  }
  datedif(e, t) {
    return this.runFunction(e.args, t, this.metadata("DATEDIF"), (r, n, i) => {
      if (r > n)
        return new f(m.NUM, E.StartEndDate);
      if (i === "D")
        return Math.floor(n) - Math.floor(r);
      const a = this.dateTimeHelper.numberToSimpleDate(r), o = this.dateTimeHelper.numberToSimpleDate(n);
      switch (i) {
        case "M":
          return (o.year - a.year) * 12 + (o.month - a.month) - (o.day < a.day ? 1 : 0);
        case "YM":
          return (12 + (o.month - a.month) - (o.day < a.day ? 1 : 0)) % 12;
        case "Y":
          return o.month > a.month || o.month === a.month && o.day >= a.day ? o.year - a.year : o.year - a.year - 1;
        case "MD":
          if (o.day >= a.day)
            return o.day - a.day;
          {
            const u = o.month === 1 ? 12 : o.month - 1, l = o.month === 1 ? o.year - 1 : o.year;
            return this.dateTimeHelper.daysInMonth(l, u) + o.day - a.day;
          }
        case "YD":
          return o.month > a.month || o.month === a.month && o.day >= a.day ? Math.floor(n) - this.dateTimeHelper.dateToNumber({
            year: o.year,
            month: a.month,
            day: a.day
          }) : Math.floor(n) - Math.floor(r) - 365 * (o.year - a.year - 1) - this.dateTimeHelper.leapYearsCount(o.year - 1) + this.dateTimeHelper.leapYearsCount(a.year);
        default:
          return new f(m.NUM, E.BadMode);
      }
    });
  }
  days360(e, t) {
    return this.runFunction(e.args, t, this.metadata("DAYS360"), this.days360Core);
  }
  yearfrac(e, t) {
    return this.runFunction(e.args, t, this.metadata("YEARFRAC"), (r, n, i) => {
      switch (r = Math.trunc(r), n = Math.trunc(n), r > n && ([r, n] = [n, r]), i) {
        case 0:
          return this.days360Core(r, n, !1) / 360;
        case 1:
          return (n - r) / this.dateTimeHelper.yearLengthForBasis(this.dateTimeHelper.numberToSimpleDate(r), this.dateTimeHelper.numberToSimpleDate(n));
        case 2:
          return (n - r) / 360;
        case 3:
          return (n - r) / 365;
        case 4:
          return this.days360Core(r, n, !0) / 360;
      }
      throw new Error("Should not be reachable.");
    });
  }
  interval(e, t) {
    return this.runFunction(e.args, t, this.metadata("INTERVAL"), (r) => {
      r = Math.trunc(r);
      const n = r % 60;
      r = Math.trunc(r / 60);
      const i = r % 60;
      r = Math.trunc(r / 60);
      const a = r % 24;
      r = Math.trunc(r / 24);
      const o = r % 30;
      r = Math.trunc(r / 30);
      const u = r % 12, l = Math.trunc(r / 12);
      return "P" + (l > 0 ? `${l}Y` : "") + (u > 0 ? `${u}M` : "") + (o > 0 ? `${o}D` : "") + "T" + (a > 0 ? `${a}H` : "") + (i > 0 ? `${i}M` : "") + (n > 0 ? `${n}S` : "");
    });
  }
  networkdays(e, t) {
    return this.runFunction(e.args, t, this.metadata("NETWORKDAYS"), (r, n, i) => this.networkdayscore(r, n, 1, i));
  }
  networkdaysintl(e, t) {
    return this.runFunction(e.args, t, this.metadata("NETWORKDAYS.INTL"), (r, n, i, a) => this.networkdayscore(r, n, i, a));
  }
  workday(e, t) {
    return this.runFunction(e.args, t, this.metadata("WORKDAY"), (r, n, i) => this.workdaycore(r, n, 1, i));
  }
  workdayintl(e, t) {
    return this.runFunction(e.args, t, this.metadata("WORKDAY.INTL"), (r, n, i, a) => this.workdaycore(r, n, i, a));
  }
  networkdayscore(e, t, r, n) {
    e = Math.trunc(e), t = Math.trunc(t);
    let i = 1;
    e > t && ([e, t] = [t, e], i = -1);
    const a = tu(r);
    if (a instanceof f)
      return a;
    const o = this.simpleRangeToFilteredHolidays(a, n);
    return o instanceof f ? o : i * this.countWorkdays(e, t, a, o);
  }
  workdaycore(e, t, r, n) {
    e = Math.trunc(e), t = Math.trunc(t);
    const i = tu(r);
    if (i instanceof f)
      return i;
    const a = this.simpleRangeToFilteredHolidays(i, n);
    if (a instanceof f)
      return a;
    if (t > 0) {
      let o = 1;
      for (; this.countWorkdays(e + 1, e + o, i, a) < t; )
        o *= 2;
      let u = 1;
      for (; u + 1 < o; ) {
        const l = Math.trunc((u + o) / 2);
        this.countWorkdays(e + 1, e + l, i, a) < t ? u = l : o = l;
      }
      return e + o;
    } else if (t < 0) {
      t *= -1;
      let o = 1;
      for (; this.countWorkdays(e - o, e - 1, i, a) < t; )
        o *= 2;
      let u = 1;
      for (; u + 1 < o; ) {
        const l = Math.trunc((u + o) / 2);
        this.countWorkdays(e - l, e - 1, i, a) < t ? u = l : o = l;
      }
      return e - o;
    } else
      return e;
  }
  countWorkdays(e, t, r, n) {
    const i = Math.floor(this.dateTimeHelper.relativeNumberToAbsoluteNumber(t)), a = Math.floor(this.dateTimeHelper.relativeNumberToAbsoluteNumber(e));
    let o = 0;
    for (let u = 0; u < 7; u++)
      r.charAt(u) === "0" && (o += Math.floor((i + 6 - u) / 7), o -= Math.floor((a - 1 + 6 - u) / 7));
    return o -= eu(t + 1, n) - eu(e, n), o;
  }
  simpleRangeToFilteredHolidays(e, t) {
    var r;
    const n = (r = t == null ? void 0 : t.valuesFromTopLeftCorner()) !== null && r !== void 0 ? r : [];
    for (const a of n)
      if (a instanceof f)
        return a;
    const i = [];
    for (const a of n)
      if (a !== B)
        if (D(a))
          i.push(Math.trunc(I(a)));
        else
          return new f(m.VALUE, E.WrongType);
    return [...new Set(i)].sort((a, o) => a - o).filter((a) => {
      const u = (this.dateTimeHelper.relativeNumberToAbsoluteNumber(a) - 1) % 7;
      return e.charAt(u) === "0";
    });
  }
}
bl.implementedFunctions = {
  DATE: {
    method: "date",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }],
    returnNumberType: _.NUMBER_DATE
  },
  TIME: {
    method: "time",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }],
    returnNumberType: _.NUMBER_TIME
  },
  MONTH: {
    method: "month",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  YEAR: {
    method: "year",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  HOUR: {
    method: "hour",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  MINUTE: {
    method: "minute",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  SECOND: {
    method: "second",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  TEXT: {
    method: "text",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.STRING
    }]
  },
  EOMONTH: {
    method: "eomonth",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER
    }],
    returnNumberType: _.NUMBER_DATE
  },
  DAY: {
    method: "day",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  DAYS: {
    method: "days",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  WEEKDAY: {
    method: "weekday",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  WEEKNUM: {
    method: "weeknum",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  ISOWEEKNUM: {
    method: "isoweeknum",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  DATEVALUE: {
    method: "datevalue",
    parameters: [{
      argumentType: h.STRING
    }],
    returnNumberType: _.NUMBER_DATE
  },
  TIMEVALUE: {
    method: "timevalue",
    parameters: [{
      argumentType: h.STRING
    }],
    returnNumberType: _.NUMBER_TIME
  },
  NOW: {
    method: "now",
    parameters: [],
    isVolatile: !0,
    returnNumberType: _.NUMBER_DATETIME
  },
  TODAY: {
    method: "today",
    parameters: [],
    isVolatile: !0,
    returnNumberType: _.NUMBER_DATE
  },
  EDATE: {
    method: "edate",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER
    }],
    returnNumberType: _.NUMBER_DATE
  },
  DAYS360: {
    method: "days360",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.BOOLEAN,
      defaultValue: !1
    }]
  },
  DATEDIF: {
    method: "datedif",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.STRING
    }]
  },
  YEARFRAC: {
    method: "yearfrac",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      defaultValue: 0,
      minValue: 0,
      maxValue: 4
    }]
  },
  INTERVAL: {
    method: "interval",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  NETWORKDAYS: {
    method: "networkdays",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.RANGE,
      optionalArg: !0
    }]
  },
  "NETWORKDAYS.INTL": {
    method: "networkdaysintl",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NOERROR,
      defaultValue: 1
    }, {
      argumentType: h.RANGE,
      optionalArg: !0
    }]
  },
  WORKDAY: {
    method: "workday",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.RANGE,
      optionalArg: !0
    }]
  },
  "WORKDAY.INTL": {
    method: "workdayintl",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NOERROR,
      defaultValue: 1
    }, {
      argumentType: h.RANGE,
      optionalArg: !0
    }]
  }
};
function eu(s, e) {
  if (e.length === 0 || s <= e[0])
    return 0;
  if (e[e.length - 1] < s)
    return e.length;
  let t = 0, r = e.length - 1;
  for (; t + 1 < r; ) {
    const n = Math.floor((r + t) / 2);
    e[n] >= s ? r = n : t = n;
  }
  return r;
}
function tu(s) {
  var e;
  return typeof s != "number" && typeof s != "string" ? new f(m.VALUE, E.WrongType) : typeof s == "string" ? s.length !== 7 || !/^(0|1)*$/.test(s) || s === "1111111" ? new f(m.NUM, E.WeekendString) : s : (e = Jg.get(s)) !== null && e !== void 0 ? e : new f(m.NUM, E.BadMode);
}
const ru = /* @__PURE__ */ new Map([[1, 0], [2, 1], [11, 1], [12, 2], [13, 3], [14, 4], [15, 5], [16, 6], [17, 0]]), Jg = /* @__PURE__ */ new Map([[1, "0000011"], [2, "1000001"], [3, "1100000"], [4, "0110000"], [5, "0011000"], [6, "0001100"], [7, "0000110"], [11, "0000001"], [12, "1000000"], [13, "0100000"], [14, "0010000"], [15, "0001000"], [16, "0000100"], [17, "0000010"]]);
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Pl extends V {
  degrees(e, t) {
    return this.runFunction(e.args, t, this.metadata("DEGREES"), (r) => r * (180 / Math.PI));
  }
}
Pl.implementedFunctions = {
  DEGREES: {
    method: "degrees",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Vl extends V {
  delta(e, t) {
    return this.runFunction(e.args, t, this.metadata("DELTA"), (r, n) => r === n ? 1 : 0);
  }
}
Vl.implementedFunctions = {
  DELTA: {
    method: "delta",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Dl extends V {
  /**
   * Corresponds to EXP(value)
   *
   * Calculates the exponent for basis e
   *
   * @param ast
   * @param state
   */
  exp(e, t) {
    return this.runFunction(e.args, t, this.metadata("EXP"), Math.exp);
  }
}
Dl.implementedFunctions = {
  EXP: {
    method: "exp",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Bl extends V {
  pmt(e, t) {
    return this.runFunction(e.args, t, this.metadata("PMT"), Va);
  }
  ipmt(e, t) {
    return this.runFunction(e.args, t, this.metadata("IPMT"), na);
  }
  ppmt(e, t) {
    return this.runFunction(e.args, t, this.metadata("PPMT"), nu);
  }
  fv(e, t) {
    return this.runFunction(e.args, t, this.metadata("FV"), sa);
  }
  cumipmt(e, t) {
    return this.runFunction(e.args, t, this.metadata("CUMIPMT"), (r, n, i, a, o, u) => {
      if (a > o)
        return new f(m.NUM, E.EndStartPeriod);
      let l = 0;
      for (let c = a; c <= o; c++)
        l += na(r, c, n, i, 0, u);
      return l;
    });
  }
  cumprinc(e, t) {
    return this.runFunction(e.args, t, this.metadata("CUMPRINC"), (r, n, i, a, o, u) => {
      if (a > o)
        return new f(m.NUM, E.EndStartPeriod);
      let l = 0;
      for (let c = a; c <= o; c++)
        l += nu(r, c, n, i, 0, u);
      return l;
    });
  }
  db(e, t) {
    return this.runFunction(e.args, t, this.metadata("DB"), (r, n, i, a, o) => {
      if (o === 12 && a > i || a > i + 1)
        return new f(m.NUM, E.PeriodLong);
      if (n >= r)
        return 0;
      const u = Math.round((1 - Math.pow(n / r, 1 / i)) * 1e3) / 1e3, l = r * u * o / 12;
      if (a === 1)
        return l;
      let c = l;
      for (let d = 0; d < a - 2; d++)
        c += (r - c) * u;
      return a === i + 1 ? (r - c) * u * (12 - o) / 12 : (r - c) * u;
    });
  }
  ddb(e, t) {
    return this.runFunction(e.args, t, this.metadata("DDB"), (r, n, i, a, o) => {
      if (a > i)
        return new f(m.NUM);
      let u = o / i, l;
      u >= 1 ? (u = 1, a === 1 ? l = r : l = 0) : l = r * Math.pow(1 - u, a - 1);
      const c = r * Math.pow(1 - u, a);
      return Math.max(l - Math.max(n, c), 0);
    });
  }
  dollarde(e, t) {
    return this.runFunction(e.args, t, this.metadata("DOLLARDE"), (r, n) => {
      if (n < 1)
        return new f(m.DIV_BY_ZERO);
      for (n = Math.trunc(n); n > 10; )
        n /= 10;
      return Math.trunc(r) + (r - Math.trunc(r)) * 10 / n;
    });
  }
  dollarfr(e, t) {
    return this.runFunction(e.args, t, this.metadata("DOLLARFR"), (r, n) => {
      if (n < 1)
        return new f(m.DIV_BY_ZERO);
      for (n = Math.trunc(n); n > 10; )
        n /= 10;
      return Math.trunc(r) + (r - Math.trunc(r)) * n / 10;
    });
  }
  effect(e, t) {
    return this.runFunction(e.args, t, this.metadata("EFFECT"), (r, n) => (n = Math.trunc(n), Math.pow(1 + r / n, n) - 1));
  }
  ispmt(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISPMT"), (r, n, i, a) => i === 0 ? new f(m.DIV_BY_ZERO) : a * r * (n / i - 1));
  }
  nominal(e, t) {
    return this.runFunction(e.args, t, this.metadata("NOMINAL"), (r, n) => (n = Math.trunc(n), (Math.pow(r + 1, 1 / n) - 1) * n));
  }
  nper(e, t) {
    return this.runFunction(e.args, t, this.metadata("NPER"), (r, n, i, a, o) => r === 0 ? n === 0 ? new f(m.DIV_BY_ZERO) : (-i - a) / n : (o && (n *= 1 + r), Math.log((n - a * r) / (i * r + n)) / Math.log(1 + r)));
  }
  rate(e, t) {
    return this.runFunction(e.args, t, this.metadata("RATE"), (r, n, i, a, o, u) => {
      if (u <= -1)
        return new f(m.VALUE);
      const l = 1e-7, c = 50;
      let d = u;
      o = o ? 1 : 0;
      for (let p = 0; p < c; p++) {
        if (d <= -1)
          return new f(m.NUM);
        let N;
        if (Math.abs(d) < l)
          N = i * (1 + r * d) + n * (1 + d * o) * r + a;
        else {
          const R = Math.pow(1 + d, r);
          N = i * R + n * (1 / d + o) * (R - 1) + a;
        }
        if (Math.abs(N) < l)
          return d;
        let T;
        if (Math.abs(d) < l)
          T = i * r + n * o * r;
        else {
          const R = Math.pow(1 + d, r), S = r * Math.pow(1 + d, r - 1);
          T = i * S + n * (1 / d + o) * S + n * (-1 / (d * d)) * (R - 1);
        }
        d -= N / T;
      }
      return new f(m.NUM);
    });
  }
  pv(e, t) {
    return this.runFunction(e.args, t, this.metadata("PV"), (r, n, i, a, o) => (o = o ? 1 : 0, r === -1 ? n === 0 ? new f(m.NUM) : new f(m.DIV_BY_ZERO) : r === 0 ? -i * n - a : ((1 - Math.pow(1 + r, n)) * i * (1 + r * o) / r - a) / Math.pow(1 + r, n)));
  }
  rri(e, t) {
    return this.runFunction(e.args, t, this.metadata("RRI"), (r, n, i) => n === 0 || i < 0 && n > 0 || i > 0 && n < 0 ? new f(m.NUM) : Math.pow(i / n, 1 / r) - 1);
  }
  sln(e, t) {
    return this.runFunction(e.args, t, this.metadata("SLN"), (r, n, i) => i === 0 ? new f(m.DIV_BY_ZERO) : (r - n) / i);
  }
  syd(e, t) {
    return this.runFunction(e.args, t, this.metadata("SYD"), (r, n, i, a) => a > i ? new f(m.NUM) : (r - n) * (i - a + 1) * 2 / (i * (i + 1)));
  }
  tbilleq(e, t) {
    return this.runFunction(e.args, t, this.metadata("TBILLEQ"), (r, n, i) => {
      if (r = Math.round(r), n = Math.round(n), r >= n)
        return new f(m.NUM);
      const a = this.dateTimeHelper.numberToSimpleDate(r), o = this.dateTimeHelper.numberToSimpleDate(n);
      if (o.year > a.year + 1 || o.year === a.year + 1 && (o.month > a.month || o.month === a.month && o.day > a.day))
        return new f(m.NUM);
      const u = 360 - i * (n - r);
      return u === 0 ? 0 : u < 0 ? new f(m.NUM) : 365 * i / u;
    });
  }
  tbillprice(e, t) {
    return this.runFunction(e.args, t, this.metadata("TBILLPRICE"), (r, n, i) => {
      if (r = Math.round(r), n = Math.round(n), r >= n)
        return new f(m.NUM);
      const a = this.dateTimeHelper.numberToSimpleDate(r), o = this.dateTimeHelper.numberToSimpleDate(n);
      if (o.year > a.year + 1 || o.year === a.year + 1 && (o.month > a.month || o.month === a.month && o.day > a.day))
        return new f(m.NUM);
      const u = 360 - i * (n - r);
      return u === 0 ? 0 : u < 0 ? new f(m.NUM) : 100 * (1 - i * (n - r) / 360);
    });
  }
  tbillyield(e, t) {
    return this.runFunction(e.args, t, this.metadata("TBILLYIELD"), (r, n, i) => {
      if (r = Math.round(r), n = Math.round(n), r >= n)
        return new f(m.NUM);
      const a = this.dateTimeHelper.numberToSimpleDate(r), o = this.dateTimeHelper.numberToSimpleDate(n);
      return o.year > a.year + 1 || o.year === a.year + 1 && (o.month > a.month || o.month === a.month && o.day > a.day) ? new f(m.NUM) : (100 - i) * 360 / (i * (n - r));
    });
  }
  fvschedule(e, t) {
    return this.runFunction(e.args, t, this.metadata("FVSCHEDULE"), (r, n) => {
      const i = n.valuesFromTopLeftCorner();
      for (const a of i)
        if (a instanceof f)
          return a;
      for (const a of i)
        if (D(a))
          r *= 1 + I(a);
        else if (a !== B)
          return new f(m.VALUE, E.NumberExpected);
      return r;
    });
  }
  npv(e, t) {
    return this.runFunction(e.args, t, this.metadata("NPV"), (r, ...n) => {
      const i = this.arithmeticHelper.coerceNumbersExactRanges(n);
      return i instanceof f ? i : Ci(r, i);
    });
  }
  mirr(e, t) {
    return this.runFunction(e.args, t, this.metadata("MIRR"), (r, n, i) => {
      const a = this.arithmeticHelper.manyToExactNumbers(r.valuesFromTopLeftCorner());
      if (a instanceof f)
        return a;
      let o = !1, u = !1;
      const l = [], c = [];
      for (const T of a)
        T > 0 ? (o = !0, l.push(T), c.push(0)) : T < 0 ? (u = !0, c.push(T), l.push(0)) : (c.push(0), l.push(0));
      if (!o || !u)
        return new f(m.DIV_BY_ZERO);
      const d = a.length, p = Ci(i, l);
      if (p instanceof f)
        return p;
      const N = Ci(n, c);
      return N instanceof f ? N : Math.pow(-p * Math.pow(1 + i, d) / N / (1 + n), 1 / (d - 1)) - 1;
    });
  }
  pduration(e, t) {
    return this.runFunction(e.args, t, this.metadata("PDURATION"), (r, n, i) => (Math.log(i) - Math.log(n)) / Math.log(1 + r));
  }
  xnpv(e, t) {
    return this.runFunction(e.args, t, this.metadata("XNPV"), (r, n, i) => {
      const a = n.valuesFromTopLeftCorner();
      for (const p of a)
        if (typeof p != "number")
          return new f(m.VALUE, E.NumberExpected);
      const o = a, u = i.valuesFromTopLeftCorner();
      for (const p of u)
        if (typeof p != "number")
          return new f(m.VALUE, E.NumberExpected);
      const l = u;
      if (l.length !== o.length)
        return new f(m.NUM, E.EqualLength);
      const c = l.length;
      let d = 0;
      if (l[0] < 0)
        return new f(m.NUM, E.ValueSmall);
      for (let p = 0; p < c; p++) {
        if (l[p] = Math.floor(l[p]), l[p] < l[0])
          return new f(m.NUM, E.ValueSmall);
        d += o[p] / Math.pow(1 + r, (l[p] - l[0]) / 365);
      }
      return d;
    });
  }
  /**
   * Calculates the internal rate of return for a series of cash flows.
   * @param {ProcedureAst} ast - The AST node representing the function call.
   * @param {InterpreterState} state - The interpreter state.
   * @returns {InterpreterValue} The internal rate of return.
   */
  irr(e, t) {
    return this.runFunction(e.args, t, this.metadata("IRR"), (r, n) => {
      if (n <= -1)
        return new f(m.VALUE);
      const i = this.arithmeticHelper.manyToExactNumbers(r.valuesFromTopLeftCorner());
      if (i instanceof f)
        return i;
      const a = i.some((u) => u > 0), o = i.some((u) => u < 0);
      return !a || !o ? new f(m.NUM) : eE(i, n);
    });
  }
}
Bl.implementedFunctions = {
  PMT: {
    method: "pmt",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  IPMT: {
    method: "ipmt",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  PPMT: {
    method: "ppmt",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  FV: {
    method: "fv",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  CUMIPMT: {
    method: "cumipmt",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 1
    }, {
      argumentType: h.INTEGER,
      minValue: 1
    }, {
      argumentType: h.INTEGER,
      minValue: 0,
      maxValue: 1
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  CUMPRINC: {
    method: "cumprinc",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 1
    }, {
      argumentType: h.INTEGER,
      minValue: 1
    }, {
      argumentType: h.INTEGER,
      minValue: 0,
      maxValue: 1
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  DB: {
    method: "db",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 1,
      maxValue: 12,
      defaultValue: 12
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  DDB: {
    method: "ddb",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.INTEGER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0,
      defaultValue: 2
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  DOLLARDE: {
    method: "dollarde",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  DOLLARFR: {
    method: "dollarfr",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  EFFECT: {
    method: "effect",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }],
    returnNumberType: _.NUMBER_PERCENT
  },
  ISPMT: {
    method: "ispmt",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  },
  NOMINAL: {
    method: "nominal",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }],
    returnNumberType: _.NUMBER_PERCENT
  },
  NPER: {
    method: "nper",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }]
  },
  PV: {
    method: "pv",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  RATE: {
    method: "rate",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0.1
    }],
    returnNumberType: _.NUMBER_PERCENT
  },
  RRI: {
    method: "rri",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }],
    returnNumberType: _.NUMBER_PERCENT
  },
  SLN: {
    method: "sln",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  SYD: {
    method: "syd",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  TBILLEQ: {
    method: "tbilleq",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }],
    returnNumberType: _.NUMBER_PERCENT
  },
  TBILLPRICE: {
    method: "tbillprice",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  TBILLYIELD: {
    method: "tbillyield",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }],
    returnNumberType: _.NUMBER_PERCENT
  },
  FVSCHEDULE: {
    method: "fvschedule",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.RANGE
    }],
    returnNumberType: _.NUMBER_CURRENCY
  },
  NPV: {
    method: "npv",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.ANY
    }],
    repeatLastArgs: 1,
    returnNumberType: _.NUMBER_CURRENCY
  },
  MIRR: {
    method: "mirr",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }],
    returnNumberType: _.NUMBER_PERCENT
  },
  PDURATION: {
    method: "pduration",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }]
  },
  XNPV: {
    method: "xnpv",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: -1
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  IRR: {
    method: "irr",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0.1
    }],
    returnNumberType: _.NUMBER_PERCENT
  }
};
function Va(s, e, t, r, n) {
  if (s === 0)
    return (-t - r) / e;
  {
    const i = Math.pow(1 + s, e);
    return (r * s + t * s * i) * (n ? 1 / (1 + s) : 1) / (1 - i);
  }
}
function na(s, e, t, r, n, i) {
  const a = Va(s, t, r, n, i);
  return e === 1 ? s * (i ? 0 : -r) : s * (i ? sa(s, e - 2, a, r, i) - a : sa(s, e - 1, a, r, i));
}
function sa(s, e, t, r, n) {
  if (s === 0)
    return -r - t * e;
  {
    const i = Math.pow(1 + s, e);
    return t * (n ? 1 + s : 1) * (1 - i) / s - r * i;
  }
}
function nu(s, e, t, r, n, i) {
  return Va(s, t, r, n, i) - na(s, e, t, r, n, i);
}
function Ci(s, e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    if (t += e[r], s === -1) {
      if (t === 0)
        continue;
      return new f(m.DIV_BY_ZERO);
    }
    t /= 1 + s;
  }
  return t;
}
function eE(s, e) {
  let n = e;
  for (let i = 0; i < 50; i++) {
    let a = 0, o = 0;
    for (let l = 0; l < s.length; l++) {
      const c = Math.pow(1 + n, l);
      if (!isFinite(c) || c === 0)
        return new f(m.NUM);
      a += s[l] / c, l > 0 && (o -= l * s[l] / (c * (1 + n)));
    }
    if (Math.abs(a) < 1e-10)
      return n;
    if (Math.abs(o) < 1e-10)
      return new f(m.NUM);
    let u = n - a / o;
    if (!isFinite(u))
      return new f(m.NUM);
    if (u <= -1 && (u = (n - 1) / 2), Math.abs(u - n) < 1e-10)
      return u;
    n = u;
  }
  return new f(m.NUM);
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class kl extends V {
  /**
   * Corresponds to FORMULATEXT(value)
   *
   * Returns a formula in a given cell as a string.
   *
   * @param ast
   * @param state
   */
  formulatext(e, t) {
    return this.runFunctionWithReferenceArgument(e.args, t, this.metadata("FORMULATEXT"), () => new f(m.NA, E.WrongArgNumber), (r) => {
      var n;
      return (n = this.serialization.getCellFormula(r)) !== null && n !== void 0 ? n : new f(m.NA, E.Formula);
    });
  }
}
kl.implementedFunctions = {
  FORMULATEXT: {
    method: "formulatext",
    parameters: [{
      argumentType: h.NOERROR
    }],
    doesNotNeedArgumentsToBeComputed: !0,
    isDependentOnSheetStructureChange: !0,
    vectorizationForbidden: !0
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Gl extends V {
  hyperlink(e, t) {
    return this.runFunction(e.args, t, this.metadata("HYPERLINK"), (r, n) => (e.hyperlink = r, n != null ? n : r));
  }
}
Gl.implementedFunctions = {
  HYPERLINK: {
    method: "hyperlink",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.STRING,
      optionalArg: !0
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Hl extends V {
  /**
   * Corresponds to ISBINARY(value)
   *
   * Returns true if provided value is a valid binary number
   *
   * @param ast
   * @param state
   */
  isbinary(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISBINARY"), (r) => /^[01]{1,10}$/.test(r));
  }
  /**
   * Corresponds to ISERR(value)
   *
   * Returns true if provided value is an error except #N/A!
   *
   * @param ast
   * @param state
   */
  iserr(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISERR"), (r) => r instanceof f && r.type !== m.NA);
  }
  /**
   * Corresponds to ISERROR(value)
   *
   * Checks whether provided value is an error
   *
   * @param ast
   * @param state
   */
  iserror(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISERROR"), (r) => r instanceof f);
  }
  /**
   * Corresponds to ISFORMULA(value)
   *
   * Checks whether referenced cell is a formula
   *
   * @param ast
   * @param state
   */
  isformula(e, t) {
    return this.runFunctionWithReferenceArgument(e.args, t, this.metadata("ISFORMULA"), () => new f(m.NA, E.WrongArgNumber), (r) => this.dependencyGraph.addressMapping.getCell(r) instanceof be);
  }
  /**
   * Corresponds to ISBLANK(value)
   *
   * Checks whether provided cell reference is empty
   *
   * @param ast
   * @param state
   */
  isblank(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISBLANK"), (r) => r === B);
  }
  /**
   * Corresponds to ISNA(value)
   *
   * Returns true if provided value is #N/A! error
   *
   * @param ast
   * @param state
   */
  isna(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISNA"), (r) => r instanceof f && r.type == m.NA);
  }
  /**
   * Corresponds to ISNUMBER(value)
   *
   * Checks whether provided cell reference is a number
   *
   * @param ast
   * @param state
   */
  isnumber(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISNUMBER"), D);
  }
  /**
   * Corresponds to ISLOGICAL(value)
   *
   * Checks whether provided cell reference is of logical type
   *
   * @param ast
   * @param state
   */
  islogical(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISLOGICAL"), (r) => typeof r == "boolean");
  }
  /**
   * Corresponds to ISREF(value)
   *
   * Returns true if provided value is #REF! error
   *
   * @param ast
   * @param state
   */
  isref(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISREF"), (r) => r instanceof f && (r.type == m.REF || r.type == m.CYCLE));
  }
  /**
   * Corresponds to ISTEXT(value)
   *
   * Checks whether provided cell reference is of logical type
   *
   * @param ast
   * @param state
   */
  istext(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISTEXT"), (r) => typeof r == "string");
  }
  /**
   * Corresponds to ISNONTEXT(value)
   *
   * Checks whether provided cell reference is of logical type
   *
   * @param ast
   * @param state
   */
  isnontext(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISNONTEXT"), (r) => typeof r != "string");
  }
  /**
   * Corresponds to COLUMN(reference)
   *
   * Returns column number of a reference or a formula cell if reference not provided
   *
   * @param ast
   * @param state
   */
  column(e, t) {
    return this.runFunctionWithReferenceArgument(e.args, t, this.metadata("COLUMN"), () => t.formulaAddress.col + 1, (r) => r.col + 1);
  }
  /**
   * Corresponds to COLUMNS(range)
   *
   * Returns number of columns in provided range of cells
   *
   * @param ast
   * @param state
   */
  columns(e, t) {
    if (e.args.length !== 1)
      return new f(m.NA, E.WrongArgNumber);
    if (e.args.some((n) => n.type === g.EMPTY))
      return new f(m.NUM, E.EmptyArg);
    let r = e.args[0];
    for (; r.type === g.PARENTHESIS; )
      r = r.expression;
    if (r.type === g.CELL_RANGE || r.type === g.COLUMN_RANGE)
      return r.end.col - r.start.col + 1;
    if (r.type === g.CELL_REFERENCE)
      return 1;
    if (r.type === g.ROW_RANGE)
      return this.config.maxColumns;
    {
      const n = this.evaluateAst(r, t);
      return n instanceof M ? n.width() : n instanceof f ? n : 1;
    }
  }
  /**
   * Corresponds to ROW(reference)
   *
   * Returns row number of a reference or a formula cell if reference not provided
   *
   * @param ast
   * @param state
   */
  row(e, t) {
    return this.runFunctionWithReferenceArgument(e.args, t, this.metadata("ROW"), () => t.formulaAddress.row + 1, (r) => r.row + 1);
  }
  /**
   * Corresponds to ROWS(range)
   *
   * Returns number of rows in provided range of cells
   *
   * @param ast
   * @param state
   */
  rows(e, t) {
    if (e.args.length !== 1)
      return new f(m.NA, E.WrongArgNumber);
    if (e.args.some((n) => n.type === g.EMPTY))
      return new f(m.NUM, E.EmptyArg);
    let r = e.args[0];
    for (; r.type === g.PARENTHESIS; )
      r = r.expression;
    if (r.type === g.CELL_RANGE || r.type === g.ROW_RANGE)
      return r.end.row - r.start.row + 1;
    if (r.type === g.CELL_REFERENCE)
      return 1;
    if (r.type === g.COLUMN_RANGE)
      return this.config.maxRows;
    {
      const n = this.evaluateAst(r, t);
      return n instanceof M ? n.height() : n instanceof f ? n : 1;
    }
  }
  /**
   * Corresponds to INDEX
   *
   * Returns specific position in 2d array.
   *
   * @param ast
   * @param state
   */
  index(e, t) {
    return this.runFunction(e.args, t, this.metadata("INDEX"), (r, n, i) => {
      var a, o, u, l, c, d;
      return i < 1 || n < 1 ? new f(m.VALUE, E.LessThanOne) : i > r.width() || n > r.height() ? new f(m.NUM, E.ValueLarge) : (d = (u = (o = (a = r == null ? void 0 : r.data) === null || a === void 0 ? void 0 : a[n - 1]) === null || o === void 0 ? void 0 : o[i - 1]) !== null && u !== void 0 ? u : (c = (l = r == null ? void 0 : r.data) === null || l === void 0 ? void 0 : l[0]) === null || c === void 0 ? void 0 : c[0]) !== null && d !== void 0 ? d : new f(m.VALUE, E.CellRangeExpected);
    });
  }
  /**
   * Corresponds to NA()
   *
   * Returns #N/A!
   *
   * @param _ast
   * @param _state
   */
  na(e, t) {
    return new f(m.NA);
  }
  /**
   * Corresponds to SHEET(value)
   *
   * Returns sheet number of a given value or a formula sheet number if no argument is provided
   *
   * @param ast
   * @param state
   */
  sheet(e, t) {
    return this.runFunctionWithReferenceArgument(e.args, t, this.metadata("SHEET"), () => t.formulaAddress.sheet + 1, (r) => r.sheet + 1, (r) => {
      const n = this.dependencyGraph.sheetMapping.getSheetId(r);
      return n !== void 0 ? n + 1 : new f(m.NA, E.SheetRef);
    });
  }
  /**
   * Corresponds to SHEETS(value)
   *
   * Returns number of sheet of a given reference or number of all sheets in workbook when no argument is provided.
   * It returns always 1 for a valid reference as 3D references are not supported.
   *
   * @param ast
   * @param state
   */
  sheets(e, t) {
    return this.runFunctionWithReferenceArgument(
      e.args,
      t,
      this.metadata("SHEETS"),
      () => this.dependencyGraph.sheetMapping.numberOfSheets(),
      // return number of sheets if no argument
      () => 1,
      // return 1 for valid reference
      () => new f(m.VALUE, E.CellRefExpected)
      // error otherwise
    );
  }
}
Hl.implementedFunctions = {
  COLUMN: {
    method: "column",
    parameters: [{
      argumentType: h.NOERROR,
      optionalArg: !0
    }],
    isDependentOnSheetStructureChange: !0,
    doesNotNeedArgumentsToBeComputed: !0,
    vectorizationForbidden: !0
  },
  COLUMNS: {
    method: "columns",
    parameters: [{
      argumentType: h.RANGE
    }],
    isDependentOnSheetStructureChange: !0,
    doesNotNeedArgumentsToBeComputed: !0,
    vectorizationForbidden: !0
  },
  ISBINARY: {
    method: "isbinary",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  ISERR: {
    method: "iserr",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  ISFORMULA: {
    method: "isformula",
    parameters: [{
      argumentType: h.NOERROR
    }],
    doesNotNeedArgumentsToBeComputed: !0,
    vectorizationForbidden: !0
  },
  ISNA: {
    method: "isna",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  ISREF: {
    method: "isref",
    parameters: [{
      argumentType: h.SCALAR
    }],
    vectorizationForbidden: !0
  },
  ISERROR: {
    method: "iserror",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  ISBLANK: {
    method: "isblank",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  ISNUMBER: {
    method: "isnumber",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  ISLOGICAL: {
    method: "islogical",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  ISTEXT: {
    method: "istext",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  ISNONTEXT: {
    method: "isnontext",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  INDEX: {
    method: "index",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  NA: {
    method: "na",
    parameters: []
  },
  ROW: {
    method: "row",
    parameters: [{
      argumentType: h.NOERROR,
      optionalArg: !0
    }],
    isDependentOnSheetStructureChange: !0,
    doesNotNeedArgumentsToBeComputed: !0,
    vectorizationForbidden: !0
  },
  ROWS: {
    method: "rows",
    parameters: [{
      argumentType: h.RANGE
    }],
    isDependentOnSheetStructureChange: !0,
    doesNotNeedArgumentsToBeComputed: !0,
    vectorizationForbidden: !0
  },
  SHEET: {
    method: "sheet",
    parameters: [{
      argumentType: h.STRING
    }],
    doesNotNeedArgumentsToBeComputed: !0,
    vectorizationForbidden: !0
  },
  SHEETS: {
    method: "sheets",
    parameters: [{
      argumentType: h.STRING
    }],
    doesNotNeedArgumentsToBeComputed: !0,
    vectorizationForbidden: !0
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Wl extends V {
  iseven(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISEVEN"), (r) => r % 2 === 0);
  }
}
Wl.implementedFunctions = {
  ISEVEN: {
    method: "iseven",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Yl extends V {
  isodd(e, t) {
    return this.runFunction(e.args, t, this.metadata("ISODD"), (r) => r % 2 === 1);
  }
}
Yl.implementedFunctions = {
  ISODD: {
    method: "isodd",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class zl extends V {
  log10(e, t) {
    return this.runFunction(e.args, t, this.metadata("LOG10"), Math.log10);
  }
  log(e, t) {
    return this.runFunction(e.args, t, this.metadata("LOG"), (r, n) => Math.log(r) / Math.log(n));
  }
  ln(e, t) {
    return this.runFunction(e.args, t, this.metadata("LN"), Math.log);
  }
}
zl.implementedFunctions = {
  LOG10: {
    method: "log10",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  LOG: {
    method: "log",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 10,
      greaterThan: 0
    }]
  },
  LN: {
    method: "ln",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const ia = parseFloat(Math.PI.toFixed(14));
class Xl extends V {
  pi(e, t) {
    return this.runFunction(e.args, t, this.metadata("PI"), () => ia);
  }
  sqrtpi(e, t) {
    return this.runFunction(e.args, t, this.metadata("SQRTPI"), (r) => Math.sqrt(ia * r));
  }
}
Xl.implementedFunctions = {
  PI: {
    method: "pi",
    parameters: []
  },
  SQRTPI: {
    method: "sqrtpi",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function su(s, e) {
  return new b(e.width, s.height);
}
function Ii(s, e, t) {
  return new b(1 + (s.width - e) / t, 1 + (s.height - e) / t);
}
class $l extends V {
  mmult(e, t) {
    return this.runFunction(e.args, t, this.metadata("MMULT"), (r, n) => {
      if (!r.hasOnlyNumbers() || !n.hasOnlyNumbers())
        return new f(m.VALUE, E.NumberRange);
      if (n.height() !== r.width())
        return new f(m.VALUE, E.ArrayDimensions);
      const i = su(r.size, n.size), a = this.createKernel(function(o, u, l) {
        let c = 0;
        for (let d = 0; d < l; ++d)
          c += o[this.thread.y][d] * u[d][this.thread.x];
        return c;
      }, i)(r.rawNumbers(), n.rawNumbers(), r.width());
      return M.onlyNumbers(a);
    });
  }
  mmultArraySize(e, t) {
    if (e.args.length !== 2)
      return b.error();
    const r = this.metadata("MMULT"), n = e.args.map((o) => {
      var u;
      return this.arraySizeForAst(o, new Ut(t.formulaAddress, t.arraysFlag || ((u = r == null ? void 0 : r.enableArrayArithmeticForArguments) !== null && u !== void 0 ? u : !1)));
    }), [i, a] = n;
    return su(i, a);
  }
  maxpool(e, t) {
    return this.runFunction(e.args, t, this.metadata("MAXPOOL"), (r, n, i = n) => {
      if (!r.hasOnlyNumbers())
        return new f(m.VALUE, E.NumberRange);
      const a = Ii(r.size, n, i), o = this.createKernel(function(u, l, c) {
        const d = this.thread.x * c, p = this.thread.y * c;
        let N = u[p][d];
        for (let T = 0; T < l; T++)
          for (let R = 0; R < l; R++)
            N = Math.max(N, u[p + T][d + R]);
        return N;
      }, a)(r.rawNumbers(), n, i);
      return M.onlyNumbers(o);
    });
  }
  medianpool(e, t) {
    return this.runFunction(e.args, t, this.metadata("MEDIANPOOL"), (r, n, i = n) => {
      if (!r.hasOnlyNumbers())
        return new f(m.VALUE, E.NumberRange);
      const a = Ii(r.size, n, i), o = this.createKernel(function(u, l, c) {
        const d = this.thread.x * c, p = this.thread.y * c;
        let N = u[p][d];
        for (let v = 0; v < l; v++)
          for (let w = 0; w < l; w++)
            N = Math.max(N, u[p + v][d + w]);
        let T = u[p][d];
        for (let v = 0; v < l; v++)
          for (let w = 0; w < l; w++)
            T = Math.min(T, u[p + v][d + w]);
        const R = l * l;
        let S = T, A = N, y = 42;
        for (let v = 0; v < 32; v++) {
          const w = (S + A) / 2;
          let ee = 0;
          for (let Z = 0; Z < l; Z++)
            for (let J = 0; J < l; J++)
              u[p + Z][d + J] > w && ee++;
          if (l % 2 === 0)
            if (ee === R / 2) {
              y = w;
              break;
            } else ee > R / 2 ? S = w : A = w;
          else if (ee === (R - 1) / 2) {
            y = w;
            break;
          } else ee > (R - 1) / 2 ? S = w : A = w;
        }
        return y;
      }, a)(r.rawNumbers(), n, i);
      return M.onlyNumbers(o);
    });
  }
  maxpoolArraySize(e, t) {
    if (e.args.length < 2 || e.args.length > 3)
      return b.error();
    const r = this.metadata("MAXPOOL"), i = e.args.map((l) => {
      var c;
      return this.arraySizeForAst(l, new Ut(t.formulaAddress, t.arraysFlag || ((c = r == null ? void 0 : r.enableArrayArithmeticForArguments) !== null && c !== void 0 ? c : !1)));
    })[0], a = e.args[1];
    let o;
    a.type === g.NUMBER ? o = a.value : o = 1;
    let u = o;
    if (e.args.length === 3) {
      const l = e.args[2];
      l.type === g.NUMBER ? u = l.value : u = 1;
    }
    return o > i.width || o > i.height || u > o || (i.width - o) % u !== 0 || (i.height - o) % u !== 0 ? b.error() : Ii(i, o, u);
  }
  medianpoolArraySize(e, t) {
    return this.maxpoolArraySize(e, t);
  }
  transpose(e, t) {
    return this.runFunction(e.args, t, this.metadata("TRANSPOSE"), (r) => {
      const n = r.rawData(), i = r.size, a = [];
      for (let o = 0; o < i.width; ++o) {
        a[o] = [];
        for (let u = 0; u < i.height; ++u)
          a[o][u] = n[u][o];
      }
      return M.onlyValues(a);
    });
  }
  transposeArraySize(e, t) {
    if (e.args.length !== 1)
      return b.error();
    const r = this.metadata("TRANSPOSE"), n = e.args.map((a) => {
      var o;
      return this.arraySizeForAst(a, new Ut(t.formulaAddress, t.arraysFlag || ((o = r == null ? void 0 : r.enableArrayArithmeticForArguments) !== null && o !== void 0 ? o : !1)));
    }), [i] = n;
    return new b(i.height, i.width);
  }
  createKernel(e, t) {
    return function(...r) {
      const n = [];
      for (let i = 0; i < t.height; ++i) {
        n.push([]);
        for (let a = 0; a < t.width; ++a)
          n[i][a] = e.apply({
            thread: {
              x: a,
              y: i
            }
          }, r);
      }
      return n;
    };
  }
}
$l.implementedFunctions = {
  MMULT: {
    method: "mmult",
    sizeOfResultArrayMethod: "mmultArraySize",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }],
    vectorizationForbidden: !0
  },
  TRANSPOSE: {
    method: "transpose",
    sizeOfResultArrayMethod: "transposeArraySize",
    parameters: [{
      argumentType: h.RANGE
    }],
    vectorizationForbidden: !0
  },
  MAXPOOL: {
    method: "maxpool",
    sizeOfResultArrayMethod: "maxpoolArraySize",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0
    }],
    vectorizationForbidden: !0
  },
  MEDIANPOOL: {
    method: "medianpool",
    sizeOfResultArrayMethod: "medianpoolArraySize",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0
    }],
    vectorizationForbidden: !0
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Kl extends V {
  /**
   * Corresponds to MEDIAN(Number1, Number2, ...).
   *
   * Returns a median of given numbers.
   *
   * @param ast
   * @param state
   */
  median(e, t) {
    return this.runFunction(e.args, t, this.metadata("MEDIAN"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersExactRanges(r);
      return n instanceof f ? n : n.length === 0 ? new f(m.NUM, E.OneValue) : (n.sort((i, a) => i - a), n.length % 2 === 0 ? (n[n.length / 2 - 1] + n[n.length / 2]) / 2 : n[Math.floor(n.length / 2)]);
    });
  }
  large(e, t) {
    return this.runFunction(e.args, t, this.metadata("LARGE"), (r, n) => {
      const i = this.arithmeticHelper.manyToExactNumbers(r.valuesFromTopLeftCorner());
      return i instanceof f ? i : (i.sort((a, o) => a - o), n = Math.trunc(n), n > i.length ? new f(m.NUM, E.ValueLarge) : i[i.length - n]);
    });
  }
  small(e, t) {
    return this.runFunction(e.args, t, this.metadata("SMALL"), (r, n) => {
      const i = this.arithmeticHelper.manyToExactNumbers(r.valuesFromTopLeftCorner());
      return i instanceof f ? i : (i.sort((a, o) => a - o), n = Math.trunc(n), n > i.length ? new f(m.NUM, E.ValueLarge) : i[n - 1]);
    });
  }
}
Kl.implementedFunctions = {
  MEDIAN: {
    method: "median",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  LARGE: {
    method: "large",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  SMALL: {
    method: "small",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class jl extends V {
  mod(e, t) {
    return this.runFunction(e.args, t, this.metadata("MOD"), (r, n) => n === 0 ? new f(m.DIV_BY_ZERO) : r % n);
  }
}
jl.implementedFunctions = {
  MOD: {
    method: "mod",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function iu(s, e) {
  const t = s.length, r = e * (t - 1), n = Math.floor(r), i = r - n;
  return n + 1 < t ? s[n] + i * (s[n + 1] - s[n]) : s[n];
}
function au(s, e) {
  const t = s.length, r = e * (t + 1);
  if (r < 1)
    return new f(m.NUM, E.ValueSmall);
  if (r > t)
    return new f(m.NUM, E.ValueLarge);
  const n = Math.floor(r), i = r - n;
  return n < t ? s[n - 1] + i * (s[n] - s[n - 1]) : s[n - 1];
}
class Da extends V {
  /**
   * Corresponds to PERCENTILE(array, k) and PERCENTILE.INC(array, k).
   *
   * Returns the k-th percentile of values in a range using inclusive interpolation.
   *
   * @param ast - procedure AST node
   * @param state - interpreter state
   * @returns interpolated percentile value, or CellError on invalid input
   */
  percentile(e, t) {
    return this.runFunction(e.args, t, this.metadata("PERCENTILE.INC"), (r, n) => {
      const i = this.getSortedValues(r);
      return i instanceof f ? i : iu(i, n);
    });
  }
  /**
   * Corresponds to PERCENTILE.EXC(array, k).
   *
   * Returns the k-th percentile of values in a range using exclusive interpolation.
   *
   * @param ast - procedure AST node
   * @param state - interpreter state
   * @returns interpolated percentile value, or CellError on invalid input
   */
  percentileExc(e, t) {
    return this.runFunction(e.args, t, this.metadata("PERCENTILE.EXC"), (r, n) => {
      const i = this.getSortedValues(r);
      return i instanceof f ? i : au(i, n);
    });
  }
  /**
   * Corresponds to QUARTILE(array, quart) and QUARTILE.INC(array, quart).
   *
   * Returns the quartile of a data set using inclusive interpolation.
   * quart is truncated to an integer and validated in [0, 4].
   *
   * @param ast - procedure AST node
   * @param state - interpreter state
   * @returns quartile value, or CellError on invalid input
   */
  quartile(e, t) {
    return this.runFunction(e.args, t, this.metadata("QUARTILE.INC"), (r, n) => {
      if (n = Math.trunc(n), n < 0)
        return new f(m.NUM, E.ValueSmall);
      if (n > 4)
        return new f(m.NUM, E.ValueLarge);
      const i = this.getSortedValues(r);
      return i instanceof f ? i : iu(i, n / 4);
    });
  }
  /**
   * Corresponds to QUARTILE.EXC(array, quart).
   *
   * Returns the quartile of a data set using exclusive interpolation.
   * quart is truncated to an integer and validated in [1, 3].
   *
   * @param ast - procedure AST node
   * @param state - interpreter state
   * @returns quartile value, or CellError on invalid input
   */
  quartileExc(e, t) {
    return this.runFunction(e.args, t, this.metadata("QUARTILE.EXC"), (r, n) => {
      if (n = Math.trunc(n), n < 1)
        return new f(m.NUM, E.ValueSmall);
      if (n > 3)
        return new f(m.NUM, E.ValueLarge);
      const i = this.getSortedValues(r);
      return i instanceof f ? i : au(i, n / 4);
    });
  }
  /**
   * Extracts numeric values from a range, filters non-numbers, and returns them sorted.
   * Returns CellError if the range contains an error, or if no numeric values exist.
   *
   * @param range - input range from the spreadsheet
   * @returns sorted numeric values (ascending), or CellError
   */
  getSortedValues(e) {
    const t = this.arithmeticHelper.manyToExactNumbers(e.valuesFromTopLeftCorner());
    return t instanceof f ? t : t.length === 0 ? new f(m.NUM, E.OneValue) : (t.sort((r, n) => r - n), t);
  }
}
Da.implementedFunctions = {
  "PERCENTILE.INC": {
    method: "percentile",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }]
  },
  "PERCENTILE.EXC": {
    method: "percentileExc",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }]
  },
  "QUARTILE.INC": {
    method: "quartile",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }]
  },
  "QUARTILE.EXC": {
    method: "quartileExc",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }]
  }
};
Da.aliases = {
  PERCENTILE: "PERCENTILE.INC",
  QUARTILE: "QUARTILE.INC"
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function ts(s) {
  return D(s) && !Number.isFinite(I(s)) ? 0 : s;
}
class Et {
  constructor(e, t, r) {
    this.sumsq = e, this.sum = t, this.count = r;
  }
  static single(e) {
    return new Et(e * e, e, 1);
  }
  compose(e) {
    return new Et(this.sumsq + e.sumsq, this.sum + e.sum, this.count + e.count);
  }
  averageValue() {
    if (this.count > 0)
      return this.sum / this.count;
  }
  varSValue() {
    if (this.count > 1)
      return (this.sumsq - this.sum * this.sum / this.count) / (this.count - 1);
  }
  varPValue() {
    if (this.count > 0)
      return (this.sumsq - this.sum * this.sum / this.count) / this.count;
  }
}
Et.empty = new Et(0, 0, 0);
class Ba extends V {
  constructor() {
    super(...arguments), this.addWithEpsilonRaw = (e, t) => this.arithmeticHelper.addWithEpsilonRaw(e, t);
  }
  /**
   * Corresponds to SUM(Number1, Number2, ...).
   *
   * Returns a sum of given numbers.
   *
   * @param ast
   * @param state
   */
  sum(e, t) {
    return this.doSum(e.args, t);
  }
  sumsq(e, t) {
    return this.reduce(e.args, t, 0, "SUMSQ", this.addWithEpsilonRaw, (r) => Math.pow(I(r), 2), xr);
  }
  /**
   * Corresponds to MAX(Number1, Number2, ...).
   *
   * Returns a max of given numbers.
   *
   * @param ast
   * @param state
   */
  max(e, t) {
    return this.doMax(e.args, t);
  }
  maxa(e, t) {
    const r = this.reduce(e.args, t, Number.NEGATIVE_INFINITY, "MAXA", (n, i) => Math.max(n, i), I, rs);
    return ts(r);
  }
  /**
   * Corresponds to MIN(Number1, Number2, ...).
   *
   * Returns a min of given numbers.
   *
   * @param ast
   * @param state
   */
  min(e, t) {
    return this.doMin(e.args, t);
  }
  mina(e, t) {
    const r = this.reduce(e.args, t, Number.POSITIVE_INFINITY, "MINA", (n, i) => Math.min(n, i), I, rs);
    return ts(r);
  }
  count(e, t) {
    return this.doCount(e.args, t);
  }
  counta(e, t) {
    return this.doCounta(e.args, t);
  }
  average(e, t) {
    return this.doAverage(e.args, t);
  }
  averagea(e, t) {
    var r;
    const n = this.reduce(e.args, t, Et.empty, "_AGGREGATE_A", (i, a) => i.compose(a), (i) => Et.single(I(i)), rs);
    return n instanceof f ? n : (r = n.averageValue()) !== null && r !== void 0 ? r : new f(m.DIV_BY_ZERO);
  }
  vars(e, t) {
    return this.doVarS(e.args, t);
  }
  varp(e, t) {
    return this.doVarP(e.args, t);
  }
  vara(e, t) {
    var r;
    const n = this.reduceAggregateA(e.args, t);
    return n instanceof f ? n : (r = n.varSValue()) !== null && r !== void 0 ? r : new f(m.DIV_BY_ZERO);
  }
  varpa(e, t) {
    var r;
    const n = this.reduceAggregateA(e.args, t);
    return n instanceof f ? n : (r = n.varPValue()) !== null && r !== void 0 ? r : new f(m.DIV_BY_ZERO);
  }
  stdevs(e, t) {
    return this.doStdevS(e.args, t);
  }
  stdevp(e, t) {
    return this.doStdevP(e.args, t);
  }
  stdeva(e, t) {
    const r = this.reduceAggregateA(e.args, t);
    if (r instanceof f)
      return r;
    {
      const n = r.varSValue();
      return n === void 0 ? new f(m.DIV_BY_ZERO) : Math.sqrt(n);
    }
  }
  stdevpa(e, t) {
    const r = this.reduceAggregateA(e.args, t);
    if (r instanceof f)
      return r;
    {
      const n = r.varPValue();
      return n === void 0 ? new f(m.DIV_BY_ZERO) : Math.sqrt(n);
    }
  }
  product(e, t) {
    return this.doProduct(e.args, t);
  }
  subtotal(e, t) {
    if (e.args.length < 2)
      return new f(m.NA, E.WrongArgNumber);
    const r = this.coerceToType(this.evaluateAst(e.args[0], t), {
      argumentType: h.NUMBER
    }, t), n = e.args.slice(1);
    switch (r) {
      case 1:
      case 101:
        return this.doAverage(n, t);
      case 2:
      case 102:
        return this.doCount(n, t);
      case 3:
      case 103:
        return this.doCounta(n, t);
      case 4:
      case 104:
        return this.doMax(n, t);
      case 5:
      case 105:
        return this.doMin(n, t);
      case 6:
      case 106:
        return this.doProduct(n, t);
      case 7:
      case 107:
        return this.doStdevS(n, t);
      case 8:
      case 108:
        return this.doStdevP(n, t);
      case 9:
      case 109:
        return this.doSum(n, t);
      case 10:
      case 110:
        return this.doVarS(n, t);
      case 11:
      case 111:
        return this.doVarP(n, t);
      default:
        return new f(m.VALUE, E.BadMode);
    }
  }
  reduceAggregate(e, t) {
    return this.reduce(e, t, Et.empty, "_AGGREGATE", (r, n) => r.compose(n), (r) => Et.single(I(r)), xr);
  }
  reduceAggregateA(e, t) {
    return this.reduce(e, t, Et.empty, "_AGGREGATE_A", (r, n) => r.compose(n), (r) => Et.single(I(r)), rs);
  }
  doAverage(e, t) {
    var r;
    const n = this.reduceAggregate(e, t);
    return n instanceof f ? n : (r = n.averageValue()) !== null && r !== void 0 ? r : new f(m.DIV_BY_ZERO);
  }
  doVarS(e, t) {
    var r;
    const n = this.reduceAggregate(e, t);
    return n instanceof f ? n : (r = n.varSValue()) !== null && r !== void 0 ? r : new f(m.DIV_BY_ZERO);
  }
  doVarP(e, t) {
    var r;
    const n = this.reduceAggregate(e, t);
    return n instanceof f ? n : (r = n.varPValue()) !== null && r !== void 0 ? r : new f(m.DIV_BY_ZERO);
  }
  doStdevS(e, t) {
    const r = this.reduceAggregate(e, t);
    if (r instanceof f)
      return r;
    {
      const n = r.varSValue();
      return n === void 0 ? new f(m.DIV_BY_ZERO) : Math.sqrt(n);
    }
  }
  doStdevP(e, t) {
    const r = this.reduceAggregate(e, t);
    if (r instanceof f)
      return r;
    {
      const n = r.varPValue();
      return n === void 0 ? new f(m.DIV_BY_ZERO) : Math.sqrt(n);
    }
  }
  doCount(e, t) {
    return this.reduce(e, t, 0, "COUNT", (r, n) => r + n, I, (r) => D(r) ? 1 : 0);
  }
  doCounta(e, t) {
    return this.reduce(e, t, 0, "COUNTA", (r, n) => r + n, I, (r) => r === B ? 0 : 1);
  }
  doMax(e, t) {
    const r = this.reduce(e, t, Number.NEGATIVE_INFINITY, "MAX", (n, i) => Math.max(n, i), I, xr);
    return ts(r);
  }
  doMin(e, t) {
    const r = this.reduce(e, t, Number.POSITIVE_INFINITY, "MIN", (n, i) => Math.min(n, i), I, xr);
    return ts(r);
  }
  doSum(e, t) {
    return this.reduce(e, t, 0, "SUM", this.addWithEpsilonRaw, I, xr);
  }
  doProduct(e, t) {
    return this.reduce(e, t, 1, "PRODUCT", (r, n) => r * n, I, xr);
  }
  /**
   * Reduces procedure arguments with given reducing function
   *
   * @param args
   * @param state
   * @param initialAccValue - "neutral" value (equivalent of 0)
   * @param functionName - function name to use as cache key
   * @param reducingFunction - reducing function
   * @param mapFunction
   * @param coercionFunction
   */
  reduce(e, t, r, n, i, a, o) {
    return e.length < 1 ? new f(m.NA, E.WrongArgNumber) : e.reduce((u, l) => {
      if (u instanceof f)
        return u;
      if (l.type === g.CELL_RANGE || l.type === g.COLUMN_RANGE || l.type === g.ROW_RANGE) {
        const d = this.evaluateRange(l, t, r, n, i, a, o);
        return d instanceof f ? d : i(d, u);
      }
      let c;
      if (c = this.evaluateAst(l, t), c instanceof M)
        return Array.from(c.valuesFromTopLeftCorner()).map(o).filter((p) => p !== void 0).map((p) => p instanceof f ? p : a(p)).reduce((p, N) => p instanceof f ? p : N instanceof f ? N : i(p, N), u);
      if (l.type === g.CELL_REFERENCE) {
        if (c = o(c), c === void 0)
          return u;
      } else if (c = this.coerceScalarToNumberOrError(c), c = o(c), c === void 0)
        return u;
      return c instanceof f ? c : i(u, a(c));
    }, r);
  }
  /**
   * Performs range operation on given range
   *
   * @param {CellRangeAst | ColumnRangeAst | RowRangeAst} ast - cell range ast
   * @param {InterpreterState} state - interpreter state
   * @param {T} initialAccValue - initial accumulator value for reducing function
   * @param {string} functionName - function name to use as cache key
   * @param {BinaryOperation<T>} reducingFunction - reducing function
   * @param {MapOperation<T>} mapFunction - mapper transforming coerced scalar
   * @param {coercionOperation} coercionFunction - scalar-to-number coercer
   */
  evaluateRange(e, t, r, n, i, a, o) {
    let u;
    try {
      u = F.fromAst(e, t.formulaAddress);
    } catch (d) {
      if (d instanceof vn)
        return new f(m.REF, E.RangeManySheets);
      throw d;
    }
    if (!this.isSheetValid(u))
      return new f(m.REF, E.SheetRef);
    const l = this.dependencyGraph.getRange(u.start, u.end);
    if (l === void 0)
      throw new Error("Range does not exists in graph");
    let c = l.getFunctionValue(n);
    return c === void 0 && (c = this.getRangeValues(n, u, l, a, o).reduce((p, N) => p instanceof f ? p : N instanceof f ? N : i(p, N), r), l.setFunctionValue(n, c)), c;
  }
  /**
   * Checks whether both ends of a range point to existing sheets (placeholders excluded).
   */
  isSheetValid(e) {
    return this.dependencyGraph.sheetMapping.hasSheetWithId(e.start.sheet, {
      includePlaceholders: !1
    }) && this.dependencyGraph.sheetMapping.hasSheetWithId(e.end.sheet, {
      includePlaceholders: !1
    });
  }
  /**
   * Returns list of values for given range and function name
   *
   * If range is dependent on smaller range, list will contain value of smaller range for this function
   * and values of cells that are not present in smaller range
   *
   * @param functionName - function name (e.g., SUM)
   * @param range - cell range
   * @param rangeVertex
   * @param mapFunction
   * @param coercionFunction
   */
  getRangeValues(e, t, r, n, i) {
    const a = [], {
      smallerRangeVertex: o,
      restRange: u
    } = this.dependencyGraph.rangeMapping.findSmallerRange(t);
    let l;
    if (o !== void 0 && this.dependencyGraph.existsEdge(o, r)) {
      const c = o.getFunctionValue(e);
      if (c !== void 0)
        a.push(c);
      else
        for (const d of o.range.addresses(this.dependencyGraph)) {
          const p = i(this.dependencyGraph.getScalarValue(d));
          p instanceof f ? a.push(p) : p !== void 0 && a.push(n(p));
        }
      l = u;
    } else
      l = t;
    for (const c of l.addresses(this.dependencyGraph)) {
      const d = i(this.dependencyGraph.getScalarValue(c));
      d instanceof f ? a.push(d) : d !== void 0 && a.push(n(d));
    }
    return a;
  }
}
Ba.implementedFunctions = {
  SUM: {
    method: "sum",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  SUMSQ: {
    method: "sumsq",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  MAX: {
    method: "max",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  MIN: {
    method: "min",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  MAXA: {
    method: "maxa",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  MINA: {
    method: "mina",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  COUNT: {
    method: "count",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  COUNTA: {
    method: "counta",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  AVERAGE: {
    method: "average",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  AVERAGEA: {
    method: "averagea",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  PRODUCT: {
    method: "product",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  "VAR.S": {
    method: "vars",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  "VAR.P": {
    method: "varp",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  VARA: {
    method: "vara",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  VARPA: {
    method: "varpa",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  "STDEV.S": {
    method: "stdevs",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  "STDEV.P": {
    method: "stdevp",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  STDEVA: {
    method: "stdeva",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  STDEVPA: {
    method: "stdevpa",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  SUBTOTAL: {
    method: "subtotal",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  }
};
Ba.aliases = {
  VAR: "VAR.S",
  VARP: "VAR.P",
  STDEV: "STDEV.S",
  STDEVP: "STDEV.P",
  VARS: "VAR.S",
  STDEVS: "STDEV.S"
};
function xr(s) {
  if (D(s) || s instanceof f)
    return s;
}
function rs(s) {
  return typeof s == "boolean" ? Ki(s) : D(s) || s instanceof f ? s : typeof s == "string" ? 0 : void 0;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ql extends V {
  power(e, t) {
    return this.runFunction(e.args, t, this.metadata("POWER"), Math.pow);
  }
}
ql.implementedFunctions = {
  POWER: {
    method: "power",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ql extends V {
  radians(e, t) {
    return this.runFunction(e.args, t, this.metadata("RADIANS"), (r) => r * (Math.PI / 180));
  }
}
Ql.implementedFunctions = {
  RADIANS: {
    method: "radians",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const Ne = 10, Zl = 255, ou = 2, uu = 36, tE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Jl extends V {
  dec2bin(e, t) {
    return this.runFunction(e.args, t, this.metadata("DEC2BIN"), (r, n) => Dt(r, 2, n));
  }
  dec2oct(e, t) {
    return this.runFunction(e.args, t, this.metadata("DEC2OCT"), (r, n) => Dt(r, 8, n));
  }
  dec2hex(e, t) {
    return this.runFunction(e.args, t, this.metadata("DEC2HEX"), (r, n) => Dt(r, 16, n));
  }
  bin2dec(e, t) {
    return this.runFunction(e.args, t, this.metadata("BIN2DEC"), (r) => {
      const n = Ct(r, 2, Ne);
      return n === void 0 ? new f(m.NUM, E.NotBinary) : Bt(n, 2);
    });
  }
  bin2oct(e, t) {
    return this.runFunction(e.args, t, this.metadata("BIN2OCT"), (r, n) => {
      const i = Ct(r, 2, Ne);
      return i === void 0 ? new f(m.NUM, E.NotBinary) : Dt(Bt(i, 2), 8, n);
    });
  }
  bin2hex(e, t) {
    return this.runFunction(e.args, t, this.metadata("BIN2HEX"), (r, n) => {
      const i = Ct(r, 2, Ne);
      return i === void 0 ? new f(m.NUM, E.NotBinary) : Dt(Bt(i, 2), 16, n);
    });
  }
  oct2dec(e, t) {
    return this.runFunction(e.args, t, this.metadata("OCT2DEC"), (r) => {
      const n = Ct(r, 8, Ne);
      return n === void 0 ? new f(m.NUM, E.NotOctal) : Bt(n, 8);
    });
  }
  oct2bin(e, t) {
    return this.runFunction(e.args, t, this.metadata("OCT2BIN"), (r, n) => {
      const i = Ct(r, 8, Ne);
      return i === void 0 ? new f(m.NUM, E.NotOctal) : Dt(Bt(i, 8), 2, n);
    });
  }
  oct2hex(e, t) {
    return this.runFunction(e.args, t, this.metadata("OCT2HEX"), (r, n) => {
      const i = Ct(r, 8, Ne);
      return i === void 0 ? new f(m.NUM, E.NotOctal) : Dt(Bt(i, 8), 16, n);
    });
  }
  hex2dec(e, t) {
    return this.runFunction(e.args, t, this.metadata("HEX2DEC"), (r) => {
      const n = Ct(r, 16, Ne);
      return n === void 0 ? new f(m.NUM, E.NotHex) : Bt(n, 16);
    });
  }
  hex2bin(e, t) {
    return this.runFunction(e.args, t, this.metadata("HEX2BIN"), (r, n) => {
      const i = Ct(r, 16, Ne);
      return i === void 0 ? new f(m.NUM, E.NotHex) : Dt(Bt(i, 16), 2, n);
    });
  }
  hex2oct(e, t) {
    return this.runFunction(e.args, t, this.metadata("HEX2OCT"), (r, n) => {
      const i = Ct(r, 16, Ne);
      return i === void 0 ? new f(m.NUM, E.NotHex) : Dt(Bt(i, 16), 8, n);
    });
  }
  base(e, t) {
    return this.runFunction(e.args, t, this.metadata("BASE"), nE);
  }
  decimal(e, t) {
    return this.runFunction(e.args, t, this.metadata("DECIMAL"), (r, n) => {
      const i = Ct(r, n, Zl);
      return i === void 0 ? new f(m.NUM, E.NotHex) : parseInt(i, n);
    });
  }
}
Jl.implementedFunctions = {
  DEC2BIN: {
    method: "dec2bin",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 1,
      maxValue: 10
    }]
  },
  DEC2OCT: {
    method: "dec2oct",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 1,
      maxValue: 10
    }]
  },
  DEC2HEX: {
    method: "dec2hex",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 1,
      maxValue: 10
    }]
  },
  BIN2DEC: {
    method: "bin2dec",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  BIN2OCT: {
    method: "bin2oct",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 0,
      maxValue: Ne
    }]
  },
  BIN2HEX: {
    method: "bin2hex",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 0,
      maxValue: Ne
    }]
  },
  OCT2DEC: {
    method: "oct2dec",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  OCT2BIN: {
    method: "oct2bin",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 0,
      maxValue: Ne
    }]
  },
  OCT2HEX: {
    method: "oct2hex",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 0,
      maxValue: Ne
    }]
  },
  HEX2DEC: {
    method: "hex2dec",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  HEX2BIN: {
    method: "hex2bin",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 0,
      maxValue: Ne
    }]
  },
  HEX2OCT: {
    method: "hex2oct",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 0,
      maxValue: Ne
    }]
  },
  DECIMAL: {
    method: "decimal",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      minValue: ou,
      maxValue: uu
    }]
  },
  BASE: {
    method: "base",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: ou,
      maxValue: uu
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0,
      minValue: 0,
      maxValue: Zl
    }]
  }
};
function Ct(s, e, t) {
  const r = tE.substr(0, e), n = new RegExp(`^[${r}]+$`);
  if (!(s.length > t || !n.test(s)))
    return s;
}
function Dt(s, e, t) {
  if (s > rE(e))
    return new f(m.NUM, E.ValueBaseLarge);
  if (s < ec(e))
    return new f(m.NUM, E.ValueBaseSmall);
  const r = tc(s, e);
  return t === void 0 || s < 0 ? r : r.length > t ? new f(m.NUM, E.ValueBaseLong) : De(r, t);
}
function ec(s) {
  return -Math.pow(s, Ne) / 2;
}
function rE(s) {
  return -ec(s) - 1;
}
function nE(s, e, t) {
  const r = tc(s, e);
  return t !== void 0 && t > r.length ? De(r, t) : r;
}
function tc(s, e) {
  const t = s < 0 ? Math.pow(e, Ne) : 0;
  return (s + t).toString(e).toUpperCase();
}
function Bt(s, e) {
  const t = parseInt(s, e), r = Math.pow(e, Ne);
  return t >= r / 2 ? t - r : t;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class rc extends V {
  /**
   * Corresponds to RAND()
   *
   * Returns a pseudo-random floating-point random number
   * in the range [0,1).
   *
   * @param ast
   * @param state
   */
  rand(e, t) {
    return this.runFunction(e.args, t, this.metadata("RAND"), Math.random);
  }
  randbetween(e, t) {
    return this.runFunction(e.args, t, this.metadata("RANDBETWEEN"), (r, n) => n < r ? new f(m.NUM, E.WrongOrder) : (r = Math.ceil(r), n = Math.floor(n) + 1, r === n && (n += 1), r + Math.floor(Math.random() * (n - r))));
  }
}
rc.implementedFunctions = {
  RAND: {
    method: "rand",
    parameters: [],
    isVolatile: !0
  },
  RANDBETWEEN: {
    method: "randbetween",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }],
    isVolatile: !0
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class mt extends V {
  /** Returns true when `n` is a finite number at least {@link MIN_DIMENSION}. */
  static isValidDimension(e) {
    return Number.isFinite(e) && e >= mt.MIN_DIMENSION;
  }
  /**
   * Parses a literal dimension from an AST node at parse time.
   * Handles NUMBER nodes directly, STRING nodes via numeric coercion,
   * PLUS/MINUS_UNARY_OP wrapping a NUMBER (e.g. `+3`, `-2`),
   * and TRUE()/FALSE() function calls (returning 1/0).
   * Returns undefined for non-literal nodes (cell refs, formulas, binary ops).
   */
  static parseLiteralDimension(e) {
    if (e.type === g.NUMBER)
      return Math.trunc(e.value);
    if (e.type === g.STRING) {
      const t = Number(e.value);
      return Number.isFinite(t) ? Math.trunc(t) : void 0;
    }
    if (e.type === g.PLUS_UNARY_OP && e.value.type === g.NUMBER)
      return Math.trunc(e.value.value);
    if (e.type === g.MINUS_UNARY_OP && e.value.type === g.NUMBER)
      return Math.trunc(-e.value.value);
    if (e.type === g.FUNCTION_CALL) {
      if (e.procedureName === "TRUE" && e.args.length === 0)
        return 1;
      if (e.procedureName === "FALSE" && e.args.length === 0)
        return 0;
    }
  }
  /**
   * Corresponds to SEQUENCE(rows, [cols], [start], [step])
   *
   * Returns a rows×cols array of sequential numbers starting at `start`
   * and incrementing by `step`, filled row-major.
   *
   * Note: dynamic arguments (cell references, formulas) for `rows` or `cols`
   * cause a size mismatch between parse-time prediction and runtime result,
   * which results in a #VALUE! error. Use literal numbers for rows and cols.
   *
   * @param {ProcedureAst} ast - The parsed function call AST node.
   * @param {InterpreterState} state - Current interpreter evaluation state.
   */
  sequence(e, t) {
    return this.runFunction(e.args, t, this.metadata("SEQUENCE"), (r, n, i, a) => {
      if (!Number.isFinite(r) || !Number.isFinite(n))
        return new f(m.VALUE, E.ValueLarge);
      if (r < 0 || n < 0)
        return new f(m.VALUE, E.LessThanOne);
      const o = Math.trunc(r), u = Math.trunc(n);
      if (!mt.isValidDimension(o) || !mt.isValidDimension(u))
        return new f(m.VALUE, E.LessThanOne);
      if (o > this.config.maxRows || u > this.config.maxColumns)
        return new f(m.VALUE, E.ValueLarge);
      const l = [];
      for (let c = 0; c < o; c++) {
        const d = [];
        for (let p = 0; p < u; p++)
          d.push(i + (c * u + p) * a);
        l.push(d);
      }
      return M.onlyNumbers(l);
    });
  }
  /**
   * Predicts the output array size for SEQUENCE at parse time.
   *
   * Handles NUMBER and STRING literals for rows/cols via `parseLiteralDimension`.
   * Non-literal args (cell refs, formulas, unary/binary ops) fall back to 1,
   * which will cause a size mismatch at eval time when the actual result is larger.
   *
   * @param {ProcedureAst} ast - The parsed function call AST node.
   * @param {InterpreterState} _state - Current interpreter evaluation state (unused).
   */
  sequenceArraySize(e, t) {
    if (e.args.length < 1 || e.args.length > 4)
      return b.error();
    const r = e.args[0], n = e.args.length > 1 ? e.args[1] : void 0;
    if (r.type === g.EMPTY)
      return b.error();
    const i = mt.parseLiteralDimension(r);
    if (i === void 0)
      return b.error();
    const a = n === void 0 || n.type === g.EMPTY ? 1 : mt.parseLiteralDimension(n);
    return a === void 0 || !mt.isValidDimension(i) || !mt.isValidDimension(a) || i > this.config.maxRows || a > this.config.maxColumns ? b.error() : new b(a, i);
  }
}
mt.MIN_DIMENSION = 1;
mt.implementedFunctions = {
  SEQUENCE: {
    method: "sequence",
    sizeOfResultArrayMethod: "sequenceArraySize",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1,
      emptyAsDefault: !0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1,
      emptyAsDefault: !0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1,
      emptyAsDefault: !0
    }],
    vectorizationForbidden: !0
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function hu(s) {
  const e = Math.ceil(s);
  return e % 2 === 1 ? e : e + 1;
}
function lu(s) {
  const e = Math.ceil(s);
  return e % 2 === 0 ? e : e + 1;
}
class ka extends V {
  roundup(e, t) {
    return this.runFunction(e.args, t, this.metadata("ROUNDDOWN"), (r, n) => {
      const i = Math.pow(10, n);
      return r < 0 ? -Math.ceil(-r * i) / i : Math.ceil(r * i) / i;
    });
  }
  rounddown(e, t) {
    return this.runFunction(e.args, t, this.metadata("ROUNDDOWN"), (r, n) => {
      const i = Math.pow(10, n);
      return r < 0 ? -Math.floor(-r * i) / i : Math.floor(r * i) / i;
    });
  }
  round(e, t) {
    return this.runFunction(e.args, t, this.metadata("ROUND"), (r, n) => {
      const i = Math.pow(10, n);
      return r < 0 ? -Math.round(-r * i) / i : Math.round(r * i) / i;
    });
  }
  intFunc(e, t) {
    return this.runFunction(e.args, t, this.metadata("INT"), (r) => r < 0 ? -Math.floor(-r) : Math.floor(r));
  }
  even(e, t) {
    return this.runFunction(e.args, t, this.metadata("EVEN"), (r) => r < 0 ? -lu(-r) : lu(r));
  }
  odd(e, t) {
    return this.runFunction(e.args, t, this.metadata("ODD"), (r) => r < 0 ? -hu(-r) : hu(r));
  }
  ceilingmath(e, t) {
    return this.runFunction(e.args, t, this.metadata("CEILING.MATH"), (r, n, i) => n === 0 || r === 0 ? 0 : (n = Math.abs(n), i === 1 && r < 0 && (n = -n), Math.ceil(r / n) * n));
  }
  ceiling(e, t) {
    return this.runFunction(e.args, t, this.metadata("CEILING"), (r, n) => r === 0 ? 0 : n === 0 ? new f(m.DIV_BY_ZERO) : r > 0 && n < 0 ? new f(m.NUM, E.DistinctSigns) : Math.ceil(r / n) * n);
  }
  ceilingprecise(e, t) {
    return this.runFunction(e.args, t, this.metadata("CEILING.PRECISE"), (r, n) => n === 0 || r === 0 ? 0 : (n = Math.abs(n), Math.ceil(r / n) * n));
  }
  floormath(e, t) {
    return this.runFunction(e.args, t, this.metadata("FLOOR.MATH"), (r, n, i) => n === 0 || r === 0 ? 0 : (n = Math.abs(n), i === 1 && r < 0 && (n *= -1), Math.floor(r / n) * n));
  }
  floor(e, t) {
    return this.runFunction(e.args, t, this.metadata("FLOOR"), (r, n) => r === 0 ? 0 : n === 0 ? new f(m.DIV_BY_ZERO) : r > 0 && n < 0 ? new f(m.NUM, E.DistinctSigns) : Math.floor(r / n) * n);
  }
  floorprecise(e, t) {
    return this.runFunction(e.args, t, this.metadata("FLOOR.PRECISE"), (r, n) => n === 0 || r === 0 ? 0 : (n = Math.abs(n), Math.floor(r / n) * n));
  }
}
ka.implementedFunctions = {
  ROUNDUP: {
    method: "roundup",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }]
  },
  ROUNDDOWN: {
    method: "rounddown",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }]
  },
  ROUND: {
    method: "round",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }]
  },
  INT: {
    method: "intFunc",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  EVEN: {
    method: "even",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ODD: {
    method: "odd",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  "CEILING.MATH": {
    method: "ceilingmath",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }]
  },
  CEILING: {
    method: "ceiling",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  },
  "CEILING.PRECISE": {
    method: "ceilingprecise",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  "FLOOR.MATH": {
    method: "floormath",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }]
  },
  FLOOR: {
    method: "floor",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  },
  "FLOOR.PRECISE": {
    method: "floorprecise",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  }
};
ka.aliases = {
  "ISO.CEILING": "CEILING.PRECISE",
  TRUNC: "ROUNDDOWN"
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class nc extends V {
  sqrt(e, t) {
    return this.runFunction(e.args, t, this.metadata("SQRT"), Math.sqrt);
  }
}
nc.implementedFunctions = {
  SQRT: {
    method: "sqrt",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
function* sE() {
}
function iE(s) {
  const e = s[Symbol.iterator](), {
    done: t,
    value: r
  } = e.next();
  return t ? {
    rest: sE()
  } : {
    value: r,
    rest: e
  };
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const aE = (s, e, t) => {
  if (t.end.row > t.start.row) {
    const r = O(t.end.sheet, t.end.col, t.end.row - 1), n = s.getRange(t.start, r);
    if (n !== void 0)
      return {
        smallerRangeVertex: n,
        restValuesRange: t.withStart(O(t.start.sheet, t.start.col, t.end.row)),
        restConditionRanges: e.map((i) => i.withStart(O(i.start.sheet, i.start.col, i.end.row)))
      };
  }
  return {
    restValuesRange: t,
    restConditionRanges: e
  };
};
class oE {
  constructor(e, t, r, n, i) {
    this.interpreter = e, this.cacheKey = t, this.reduceInitialValue = r, this.composeFunction = n, this.mapFunction = i, this.dependencyGraph = this.interpreter.dependencyGraph;
  }
  compute(e, t) {
    for (const i of t)
      if (!i.conditionRange.sameDimensionsAs(e))
        return new f(m.VALUE, E.EqualLength);
    const r = this.tryToGetRangeVertexForRangeValue(e), n = t.map((i) => this.tryToGetRangeVertexForRangeValue(i.conditionRange));
    if (r && n.every((i) => i !== void 0)) {
      const i = t.map((u) => u.criterionPackage.raw).join(","), a = this.findAlreadyComputedValueInCache(r, this.cacheKey(t), i);
      if (a !== void 0)
        return this.interpreter.stats.incrementCriterionFunctionFullCacheUsed(), a;
      const o = this.buildNewCriterionCache(this.cacheKey(t), t.map((u) => u.conditionRange.range), e.range);
      return o.has(i) || o.set(i, [this.evaluateRangeValue(e, t), t.map((u) => u.criterionPackage.lambda)]), r.setCriterionFunctionValues(this.cacheKey(t), o), n.forEach((u) => {
        u !== void 0 && u.addDependentCacheRange(r);
      }), o.get(i)[0];
    } else
      return this.evaluateRangeValue(e, t);
  }
  tryToGetRangeVertexForRangeValue(e) {
    const t = e.range;
    if (t !== void 0)
      return this.dependencyGraph.getRange(t.start, t.end);
  }
  reduceFunction(e) {
    let t = this.reduceInitialValue;
    for (const r of e)
      t = this.composeFunction(t, r);
    return t;
  }
  findAlreadyComputedValueInCache(e, t, r) {
    return e.getCriterionFunctionValue(t, r);
  }
  evaluateRangeValue(e, t) {
    const r = t.map((o) => o.criterionPackage.lambda), n = Array.from(e.valuesFromTopLeftCorner()).map(this.mapFunction)[Symbol.iterator](), i = t.map((o) => o.conditionRange.iterateValuesFromTopLeftCorner()), a = du(r, i, n);
    return this.reduceFunction(a);
  }
  buildNewCriterionCache(e, t, r) {
    const n = this.dependencyGraph.getRange(r.start, r.end), {
      smallerRangeVertex: i,
      restConditionRanges: a,
      restValuesRange: o
    } = aE(this.dependencyGraph, t, r);
    let u;
    i !== void 0 && this.dependencyGraph.existsEdge(i, n) ? u = i.getCriterionFunctionValues(e) : u = /* @__PURE__ */ new Map();
    const l = /* @__PURE__ */ new Map();
    return u.forEach(([c, d], p) => {
      const N = du(d, a.map((R) => cu(this.dependencyGraph, R)), Array.from(cu(this.dependencyGraph, o)).map(this.mapFunction)[Symbol.iterator]()), T = this.composeFunction(c, this.reduceFunction(N));
      this.interpreter.stats.incrementCriterionFunctionPartialCacheUsed(), l.set(p, [T, d]);
    }), l;
  }
}
class uE {
  constructor(e, t) {
    this.conditionRange = e, this.criterionPackage = t;
  }
}
function* cu(s, e) {
  for (const t of e.addresses(s))
    yield I(s.getScalarValue(t));
}
function* du(s, e, t) {
  for (const r of t) {
    const n = e.map((a) => iE(a));
    if (!n.every((a) => Object.prototype.hasOwnProperty.call(a, "value")))
      return;
    const i = n.map((a) => I(a.value));
    hE(i, s).every(([a, o]) => o(a)) && (yield r), e = n.map((a) => a.rest);
  }
}
function hE(s, e) {
  const t = [];
  for (let r = 0; r < Math.min(s.length, e.length); r++)
    t.push([s[r], e[r]]);
  return t;
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ir {
  constructor(e, t) {
    this.sum = e, this.count = t;
  }
  static single(e) {
    return new ir(e, 1);
  }
  compose(e) {
    return new ir(this.sum + e.sum, this.count + e.count);
  }
  averageValue() {
    if (this.count > 0)
      return this.sum / this.count;
  }
}
ir.empty = new ir(0, 0);
function lE(s) {
  return (e) => {
    const t = e.map((r) => `${r.conditionRange.range.sheet},${r.conditionRange.range.start.col},${r.conditionRange.range.start.row}`);
    return [s, ...t].join(",");
  };
}
function fu(s) {
  return D(s) && !Number.isFinite(I(s)) ? 0 : s;
}
function ns(s) {
  if (s instanceof f)
    return s;
  if (D(s))
    return I(s);
}
class sc extends V {
  /**
   * Corresponds to SUMIF(Range, Criterion, SumRange)
   *
   * Range is the range to which criterion is to be applied.
   * Criterion is the criteria used to choose which cells will be included in sum.
   * SumRange is the range on which adding will be performed.
   *
   * @param ast
   * @param state
   */
  sumif(e, t) {
    const r = "SUMIF", n = (i, a, o) => this.computeConditionalAggregationFunction(o != null ? o : i, [i, a], r, 0, (u, l) => this.arithmeticHelper.nonstrictadd(u, l), ns);
    return this.runFunction(e.args, t, this.metadata(r), n);
  }
  sumifs(e, t) {
    const r = "SUMIFS", n = (i, ...a) => this.computeConditionalAggregationFunction(i, a, r, 0, (o, u) => this.arithmeticHelper.nonstrictadd(o, u), ns);
    return this.runFunction(e.args, t, this.metadata(r), n);
  }
  averageif(e, t) {
    const r = "AVERAGEIF", n = (i, a, o) => {
      const u = this.computeConditionalAggregationFunction(o != null ? o : i, [i, a], r, ir.empty, (l, c) => l.compose(c), (l) => D(l) ? ir.single(I(l)) : ir.empty);
      return u instanceof f ? u : u.averageValue() || new f(m.DIV_BY_ZERO);
    };
    return this.runFunction(e.args, t, this.metadata(r), n);
  }
  /**
   * Corresponds to COUNTIF(Range, Criterion)
   *
   * Range is the range to which criterion is to be applied.
   * Criterion is the criteria used to choose which cells will be included in sum.
   *
   * Returns number of cells on which criteria evaluate to true.
   *
   * @param ast
   * @param state
   */
  countif(e, t) {
    const r = "COUNTIF", n = (i, a) => this.computeConditionalAggregationFunction(i, [i, a], r, 0, (o, u) => o + u, () => 1);
    return this.runFunction(e.args, t, this.metadata(r), n);
  }
  countifs(e, t) {
    const r = "COUNTIFS", n = (...i) => this.computeConditionalAggregationFunction(i[0], i, r, 0, (a, o) => a + o, () => 1);
    return this.runFunction(e.args, t, this.metadata(r), n);
  }
  minifs(e, t) {
    const r = "MINIFS", n = (a, o) => o === void 0 || a === void 0 ? o === void 0 ? a : o : Math.min(a, o), i = (a, ...o) => {
      const u = this.computeConditionalAggregationFunction(a, o, r, Number.POSITIVE_INFINITY, n, ns);
      return fu(u);
    };
    return this.runFunction(e.args, t, this.metadata(r), i);
  }
  maxifs(e, t) {
    const r = "MAXIFS", n = (a, o) => o === void 0 || a === void 0 ? o === void 0 ? a : o : Math.max(a, o), i = (a, ...o) => {
      const u = this.computeConditionalAggregationFunction(a, o, r, Number.NEGATIVE_INFINITY, n, ns);
      return fu(u);
    };
    return this.runFunction(e.args, t, this.metadata(r), i);
  }
  computeConditionalAggregationFunction(e, t, r, n, i, a) {
    const o = [];
    for (let u = 0; u < t.length; u += 2) {
      const l = t[u], c = this.interpreter.criterionBuilder.fromCellValue(t[u + 1], this.arithmeticHelper);
      if (c === void 0)
        return new f(m.VALUE, E.BadCriterion);
      o.push(new uE(l, c));
    }
    return new oE(this.interpreter, lE(r), n, i, a).compute(e, o);
  }
}
sc.implementedFunctions = {
  SUMIF: {
    method: "sumif",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NOERROR
    }, {
      argumentType: h.RANGE,
      optionalArg: !0
    }]
  },
  COUNTIF: {
    method: "countif",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NOERROR
    }]
  },
  AVERAGEIF: {
    method: "averageif",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NOERROR
    }, {
      argumentType: h.RANGE,
      optionalArg: !0
    }]
  },
  SUMIFS: {
    method: "sumifs",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.NOERROR
    }],
    repeatLastArgs: 2
  },
  COUNTIFS: {
    method: "countifs",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NOERROR
    }],
    repeatLastArgs: 2
  },
  MINIFS: {
    method: "minifs",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.NOERROR
    }],
    repeatLastArgs: 2
  },
  MAXIFS: {
    method: "maxifs",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.NOERROR
    }],
    repeatLastArgs: 2
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ic extends V {
  sumproduct(e, t) {
    return this.runFunction(e.args, t, this.metadata("SUMPRODUCT"), (...r) => {
      const n = r[0].width(), i = r[0].height();
      for (const u of r)
        if (u.width() !== n || u.height() !== i)
          return new f(m.VALUE, E.EqualLength);
      let a = 0;
      const o = r.map((u) => u.iterateValuesFromTopLeftCorner());
      for (let u = 0; u < n * i; u++) {
        let l = 1;
        for (const c of o) {
          const d = c.next().value;
          if (d instanceof f)
            return d;
          const p = this.coerceScalarToNumberOrError(d);
          D(p) ? l *= I(p) : l = 0;
        }
        a += l;
      }
      return a;
    });
  }
}
ic.implementedFunctions = {
  SUMPRODUCT: {
    method: "sumproduct",
    parameters: [{
      argumentType: h.RANGE
    }],
    repeatLastArgs: 1
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class ac extends V {
  /**
   * Corresponds to CONCATENATE(value1, [value2, ...])
   *
   * Concatenates provided arguments to one string.
   *
   * @param {ProcedureAst} ast - The procedure AST node
   * @param {InterpreterState} state - The interpreter state
   */
  concatenate(e, t) {
    return this.runFunction(e.args, t, this.metadata("CONCATENATE"), (...r) => "".concat(...r));
  }
  /**
   * Corresponds to SPLIT(string, index)
   *
   * Splits provided string using space separator and returns chunk at zero-based position specified by second argument
   *
   * @param {ProcedureAst} ast - The procedure AST node
   * @param {InterpreterState} state - The interpreter state
   */
  split(e, t) {
    return this.runFunction(e.args, t, this.metadata("SPLIT"), (r, n) => {
      const i = r.split(" ");
      return n >= i.length || n < 0 ? new f(m.VALUE, E.IndexBounds) : i[n];
    });
  }
  len(e, t) {
    return this.runFunction(e.args, t, this.metadata("LEN"), (r) => r.length);
  }
  lower(e, t) {
    return this.runFunction(e.args, t, this.metadata("LOWER"), (r) => r.toLowerCase());
  }
  trim(e, t) {
    return this.runFunction(e.args, t, this.metadata("TRIM"), (r) => r.replace(/^ +/g, "").replace(/ +$/g, "").replace(/ +/g, " "));
  }
  proper(e, t) {
    return this.runFunction(e.args, t, this.metadata("PROPER"), (r) => r.replace(new RegExp("\\p{L}+", "gu"), (n) => n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()));
  }
  clean(e, t) {
    return this.runFunction(e.args, t, this.metadata("CLEAN"), (r) => r.replace(/[\u0000-\u001F]/g, ""));
  }
  exact(e, t) {
    return this.runFunction(e.args, t, this.metadata("EXACT"), (r, n) => r === n);
  }
  rept(e, t) {
    return this.runFunction(e.args, t, this.metadata("REPT"), (r, n) => n < 0 ? new f(m.VALUE, E.NegativeCount) : r.repeat(n));
  }
  right(e, t) {
    return this.runFunction(e.args, t, this.metadata("RIGHT"), (r, n) => n < 0 ? new f(m.VALUE, E.NegativeLength) : n === 0 ? "" : r.slice(-n));
  }
  left(e, t) {
    return this.runFunction(e.args, t, this.metadata("LEFT"), (r, n) => n < 0 ? new f(m.VALUE, E.NegativeLength) : r.slice(0, n));
  }
  mid(e, t) {
    return this.runFunction(e.args, t, this.metadata("MID"), (r, n, i) => n < 1 ? new f(m.VALUE, E.LessThanOne) : i < 0 ? new f(m.VALUE, E.NegativeLength) : r.substring(n - 1, n + i - 1));
  }
  replace(e, t) {
    return this.runFunction(e.args, t, this.metadata("REPLACE"), (r, n, i, a) => n < 1 ? new f(m.VALUE, E.LessThanOne) : i < 0 ? new f(m.VALUE, E.NegativeLength) : r.substring(0, n - 1) + a + r.substring(n + i - 1));
  }
  search(e, t) {
    return this.runFunction(e.args, t, this.metadata("SEARCH"), (r, n, i) => {
      if (i < 1 || i > n.length)
        return new f(m.VALUE, E.LengthBounds);
      const a = r.toLowerCase(), o = n.substring(i - 1).toLowerCase(), u = this.arithmeticHelper.requiresRegex(a) ? this.arithmeticHelper.searchString(a, o) : o.indexOf(a);
      return u > -1 ? u + i : new f(m.VALUE, E.PatternNotFound);
    });
  }
  substitute(e, t) {
    return this.runFunction(e.args, t, this.metadata("SUBSTITUTE"), (r, n, i, a) => {
      const o = this.escapeRegExpSpecialCharacters(n), u = new RegExp(o, "g");
      if (a === void 0)
        return r.replace(u, i);
      if (a < 1)
        return new f(m.VALUE, E.LessThanOne);
      let l, c = 0;
      for (; (l = u.exec(r)) !== null; )
        if (a === ++c)
          return r.substring(0, l.index) + i + r.substring(u.lastIndex);
      return r;
    });
  }
  find(e, t) {
    return this.runFunction(e.args, t, this.metadata("FIND"), (r, n, i) => {
      if (i < 1 || i > n.length)
        return new f(m.VALUE, E.IndexBounds);
      const o = n.substring(i - 1).indexOf(r) + i;
      return o > 0 ? o : new f(m.VALUE, E.PatternNotFound);
    });
  }
  t(e, t) {
    return this.runFunction(e.args, t, this.metadata("T"), (r) => r instanceof f || typeof r == "string" ? r : "");
  }
  /**
   * Corresponds to N(value)
   *
   * Converts a value to a number according to Excel specification:
   * - Numbers return themselves
   * - Dates return their serial number (stored as numbers internally)
   * - TRUE returns 1, FALSE returns 0
   * - Error values propagate
   * - Anything else (text, empty) returns 0
   * - For ranges, uses the first cell value
   */
  n(e, t) {
    return this.runFunction(e.args, t, this.metadata("N"), (r) => {
      var n;
      const i = r instanceof M ? (n = r.data[0]) === null || n === void 0 ? void 0 : n[0] : r;
      return i instanceof f || typeof i == "number" ? i : typeof i == "boolean" && i ? 1 : 0;
    });
  }
  upper(e, t) {
    return this.runFunction(e.args, t, this.metadata("UPPER"), (r) => r.toUpperCase());
  }
  /**
   * Corresponds to VALUE(text)
   *
   * Converts a text string that represents a number to a number.
   *
   * @param {ProcedureAst} ast - The procedure AST node
   * @param {InterpreterState} state - The interpreter state
   */
  value(e, t) {
    return this.runFunction(e.args, t, this.metadata("VALUE"), (r) => {
      if (r instanceof f || D(r))
        return r;
      if (typeof r != "string")
        return new f(m.VALUE, E.NumberCoercion);
      const n = r.trim(), i = /^\(([^()]+)\)$/.exec(n);
      if (i) {
        const o = this.parseStringToNumber(i[1]);
        if (o !== void 0)
          return -o;
      }
      const a = this.parseStringToNumber(n);
      return a !== void 0 ? a : new f(m.VALUE, E.NumberCoercion);
    });
  }
  /**
   * Corresponds to TEXTJOIN(delimiter, ignore_empty, text1, [text2], …)
   *
   * Joins text from multiple strings/ranges with a configurable delimiter.
   * Supports array/range delimiters that cycle through gaps between text values.
   * When ignore_empty is TRUE, empty strings are skipped.
   * Returns #VALUE! if the result exceeds 32,767 characters (Excel cell content limit).
   *
   * @param {ProcedureAst} ast - The procedure AST node
   * @param {InterpreterState} state - The interpreter state
   */
  textjoin(e, t) {
    return this.runFunction(e.args, t, this.metadata("TEXTJOIN"), (r, n, ...i) => {
      const a = this.flattenArgToStrings(r);
      if (a instanceof f)
        return a;
      const o = [];
      for (const c of i) {
        const d = this.flattenArgToStrings(c);
        if (d instanceof f)
          return d;
        o.push(...d);
      }
      const u = n ? o.filter((c) => c !== "") : o;
      if (u.length === 0)
        return "";
      const l = u.reduce((c, d, p) => p === 0 ? d : c + a[(p - 1) % a.length] + d, "");
      return l.length > 32767 ? new f(m.VALUE, E.ResultTooLong) : l;
    });
  }
  /**
   * Flattens a scalar or range argument into an array of coerced strings.
   * Returns a CellError immediately if any value in the argument is an error or cannot be coerced.
   *
   * @param {InternalScalarValue | SimpleRangeValue} arg - Scalar or range to flatten
   * @returns {string[] | CellError} - Array of string values, or the first error encountered
   */
  flattenArgToStrings(e) {
    const t = e instanceof M ? e.valuesFromTopLeftCorner() : [e], r = [];
    for (const n of t) {
      if (n instanceof f)
        return n;
      const i = Ds(n);
      if (i instanceof f)
        return i;
      r.push(i);
    }
    return r;
  }
  /**
   * Parses a string to a numeric value, handling whitespace trimming and empty string validation.
   *
   * @param {string} input - The string to parse
   * @returns {Maybe<ExtendedNumber>} The parsed number or undefined if parsing fails or input is empty
   */
  parseStringToNumber(e) {
    const t = e.trim();
    if (t !== "")
      return this.arithmeticHelper.coerceToMaybeNumber(t);
  }
  escapeRegExpSpecialCharacters(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
ac.implementedFunctions = {
  CONCATENATE: {
    method: "concatenate",
    parameters: [{
      argumentType: h.STRING
    }],
    repeatLastArgs: 1,
    expandRanges: !0
  },
  EXACT: {
    method: "exact",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.STRING
    }]
  },
  SPLIT: {
    method: "split",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER
    }]
  },
  LEN: {
    method: "len",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  LOWER: {
    method: "lower",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  MID: {
    method: "mid",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  },
  TRIM: {
    method: "trim",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  T: {
    method: "t",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  N: {
    method: "n",
    parameters: [{
      argumentType: h.ANY
    }]
  },
  PROPER: {
    method: "proper",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  CLEAN: {
    method: "clean",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  REPT: {
    method: "rept",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER
    }]
  },
  RIGHT: {
    method: "right",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  LEFT: {
    method: "left",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  REPLACE: {
    method: "replace",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.STRING
    }]
  },
  SEARCH: {
    method: "search",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  SUBSTITUTE: {
    method: "substitute",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.STRING
    }, {
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0
    }]
  },
  FIND: {
    method: "find",
    parameters: [{
      argumentType: h.STRING
    }, {
      argumentType: h.STRING
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  UPPER: {
    method: "upper",
    parameters: [{
      argumentType: h.STRING
    }]
  },
  VALUE: {
    method: "value",
    parameters: [{
      argumentType: h.SCALAR
    }]
  },
  TEXTJOIN: {
    method: "textjoin",
    repeatLastArgs: 1,
    parameters: [{
      argumentType: h.ANY
    }, {
      argumentType: h.BOOLEAN
    }, {
      argumentType: h.ANY
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class oc extends V {
  /**
   * Corresponds to ACOS(value)
   *
   * Returns the arc cosine (or inverse cosine) of a number.
   *
   * @param ast
   * @param state
   */
  acos(e, t) {
    return this.runFunction(e.args, t, this.metadata("ACOS"), Math.acos);
  }
  asin(e, t) {
    return this.runFunction(e.args, t, this.metadata("ASIN"), Math.asin);
  }
  cos(e, t) {
    return this.runFunction(e.args, t, this.metadata("COS"), Math.cos);
  }
  sin(e, t) {
    return this.runFunction(e.args, t, this.metadata("SIN"), Math.sin);
  }
  tan(e, t) {
    return this.runFunction(e.args, t, this.metadata("TAN"), Math.tan);
  }
  atan(e, t) {
    return this.runFunction(e.args, t, this.metadata("ATAN"), Math.atan);
  }
  atan2(e, t) {
    return this.runFunction(e.args, t, this.metadata("ATAN2"), (r, n) => r === 0 && n === 0 ? new f(m.DIV_BY_ZERO) : Math.atan2(n, r));
  }
  cot(e, t) {
    return this.runFunction(e.args, t, this.metadata("COT"), (r) => r === 0 ? new f(m.DIV_BY_ZERO) : 1 / Math.tan(r));
  }
  acot(e, t) {
    return this.runFunction(e.args, t, this.metadata("ACOT"), (r) => r === 0 ? ia / 2 : Math.atan(1 / r));
  }
  sec(e, t) {
    return this.runFunction(e.args, t, this.metadata("SEC"), (r) => 1 / Math.cos(r));
  }
  csc(e, t) {
    return this.runFunction(e.args, t, this.metadata("CSC"), (r) => r === 0 ? new f(m.DIV_BY_ZERO) : 1 / Math.sin(r));
  }
  sinh(e, t) {
    return this.runFunction(e.args, t, this.metadata("SINH"), Math.sinh);
  }
  asinh(e, t) {
    return this.runFunction(e.args, t, this.metadata("ASINH"), Math.asinh);
  }
  cosh(e, t) {
    return this.runFunction(e.args, t, this.metadata("COSH"), Math.cosh);
  }
  acosh(e, t) {
    return this.runFunction(e.args, t, this.metadata("ACOSH"), Math.acosh);
  }
  tanh(e, t) {
    return this.runFunction(e.args, t, this.metadata("TANH"), Math.tanh);
  }
  atanh(e, t) {
    return this.runFunction(e.args, t, this.metadata("ATANH"), Math.atanh);
  }
  coth(e, t) {
    return this.runFunction(e.args, t, this.metadata("COTH"), (r) => r === 0 ? new f(m.DIV_BY_ZERO) : 1 / Math.tanh(r));
  }
  acoth(e, t) {
    return this.runFunction(e.args, t, this.metadata("ACOTH"), (r) => r === 0 ? new f(m.NUM, E.NonZero) : Math.atanh(1 / r));
  }
  sech(e, t) {
    return this.runFunction(e.args, t, this.metadata("SECH"), (r) => 1 / Math.cosh(r));
  }
  csch(e, t) {
    return this.runFunction(e.args, t, this.metadata("CSCH"), (r) => r === 0 ? new f(m.DIV_BY_ZERO) : 1 / Math.sinh(r));
  }
}
oc.implementedFunctions = {
  ACOS: {
    method: "acos",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ASIN: {
    method: "asin",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  COS: {
    method: "cos",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  SIN: {
    method: "sin",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  TAN: {
    method: "tan",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ATAN: {
    method: "atan",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ATAN2: {
    method: "atan2",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  },
  COT: {
    method: "cot",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  SEC: {
    method: "sec",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  CSC: {
    method: "csc",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  SINH: {
    method: "sinh",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  COSH: {
    method: "cosh",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  TANH: {
    method: "tanh",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  COTH: {
    method: "coth",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  SECH: {
    method: "sech",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  CSCH: {
    method: "csch",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ACOT: {
    method: "acot",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ASINH: {
    method: "asinh",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ACOSH: {
    method: "acosh",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ATANH: {
    method: "atanh",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  ACOTH: {
    method: "acoth",
    parameters: [{
      argumentType: h.NUMBER
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class cE extends Rl {
  constructor(e) {
    super(e), this.dependencyGraph = e;
  }
  /*
   * WARNING: Finding lower/upper bounds in unordered ranges is not supported. When ordering === 'none', assumes matchExactly === true
   */
  find(e, t, r) {
    return this.basicFind(e, t, "col", r);
  }
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class uc extends V {
  constructor() {
    super(...arguments), this.rowSearch = new cE(this.dependencyGraph);
  }
  /**
   * Corresponds to VLOOKUP(key, range, index, [sorted])
   *
   * @param ast
   * @param state
   */
  vlookup(e, t) {
    return this.runFunction(e.args, t, this.metadata("VLOOKUP"), (r, n, i, a) => {
      const o = n.range;
      if (o === void 0)
        return new f(m.VALUE, E.WrongType);
      if (i < 1)
        return new f(m.VALUE, E.LessThanOne);
      if (i > o.width())
        return new f(m.REF, E.IndexLarge);
      const u = {
        ordering: a ? "asc" : "none",
        ifNoMatch: a ? "returnLowerBound" : "returnNotFound"
      };
      return this.doVlookup(Xn(r), n, i - 1, u);
    });
  }
  /**
   * Corresponds to HLOOKUP(key, range, index, [sorted])
   *
   * @param ast
   * @param state
   */
  hlookup(e, t) {
    return this.runFunction(e.args, t, this.metadata("HLOOKUP"), (r, n, i, a) => {
      const o = n.range;
      if (o === void 0)
        return new f(m.VALUE, E.WrongType);
      if (i < 1)
        return new f(m.VALUE, E.LessThanOne);
      if (i > o.height())
        return new f(m.REF, E.IndexLarge);
      const u = {
        ordering: a ? "asc" : "none",
        ifNoMatch: a ? "returnLowerBound" : "returnNotFound"
      };
      return this.doHlookup(Xn(r), n, i - 1, u);
    });
  }
  /**
   * Corresponds to XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
   *
   * @param ast
   * @param state
   */
  xlookup(e, t) {
    return this.runFunction(e.args, t, this.metadata("XLOOKUP"), (r, n, i, a, o, u) => {
      if (![0, -1, 1, 2].includes(o))
        return new f(m.VALUE, E.BadMode);
      if (![1, -1, 2, -2].includes(u))
        return new f(m.VALUE, E.BadMode);
      const l = n instanceof M ? n : M.fromScalar(n), c = i instanceof M ? i : M.fromScalar(i), d = o === 2, p = {
        ordering: u === 2 ? "asc" : u === -2 ? "desc" : "none",
        returnOccurrence: u === -1 ? "last" : "first",
        ifNoMatch: o === -1 ? "returnLowerBound" : o === 1 ? "returnUpperBound" : "returnNotFound"
      };
      return this.doXlookup(Xn(r), l, c, a, d, p);
    });
  }
  xlookupArraySize(e) {
    var t, r;
    const n = (t = e == null ? void 0 : e.args) === null || t === void 0 ? void 0 : t[1], i = (r = e == null ? void 0 : e.args) === null || r === void 0 ? void 0 : r[2];
    if ((n == null ? void 0 : n.start) == null || (n == null ? void 0 : n.end) == null || (i == null ? void 0 : i.start) == null || (i == null ? void 0 : i.end) == null)
      return b.error();
    const a = n.end.row - n.start.row + 1, o = n.end.col - n.start.col + 1, u = i.end.row - i.start.row + 1, l = i.end.col - i.start.col + 1, c = o === 1 && u === a;
    return !c && !(a === 1 && l === o) ? b.error() : c ? new b(l, 1) : new b(1, u);
  }
  match(e, t) {
    return this.runFunction(e.args, t, this.metadata("MATCH"), (r, n, i) => this.doMatch(Xn(r), n, i));
  }
  searchInRange(e, t, r, n, i) {
    return r && typeof e == "string" && this.arithmeticHelper.requiresRegex(e) ? i.advancedFind(this.arithmeticHelper.eqMatcherFunction(e), t, {
      returnOccurrence: n.returnOccurrence
    }) : i.find(e, t, n);
  }
  doVlookup(e, t, r, n) {
    this.dependencyGraph.stats.start(P.VLOOKUP);
    const i = t.range;
    let a;
    i === void 0 ? a = M.onlyValues(t.data.map((l) => [l[0]])) : a = M.onlyRange(F.spanFrom(i.start, 1, i.height()), this.dependencyGraph);
    const o = this.searchInRange(e, a, n.ordering === "none", n, this.columnSearch);
    if (this.dependencyGraph.stats.end(P.VLOOKUP), o === -1)
      return new f(m.NA, E.ValueNotFound);
    let u;
    if (i === void 0)
      u = t.data[o][r];
    else {
      const l = O(i.sheet, i.start.col + r, i.start.row + o);
      u = this.dependencyGraph.getCellValue(l);
    }
    return u instanceof M ? new f(m.VALUE, E.WrongType) : u;
  }
  doHlookup(e, t, r, n) {
    const i = t.range;
    let a;
    i === void 0 ? a = M.onlyValues([t.data[0]]) : a = M.onlyRange(F.spanFrom(i.start, i.width(), 1), this.dependencyGraph);
    const o = this.searchInRange(e, a, n.ordering === "none", n, this.rowSearch);
    if (o === -1)
      return new f(m.NA, E.ValueNotFound);
    let u;
    if (i === void 0)
      u = t.data[r][o];
    else {
      const l = O(i.sheet, i.start.col + o, i.start.row + r);
      u = this.dependencyGraph.getCellValue(l);
    }
    return u instanceof M ? new f(m.VALUE, E.WrongType) : u;
  }
  doXlookup(e, t, r, n, i, a) {
    const o = t.width() === 1 && r.height() === t.height(), u = t.height() === 1 && r.width() === t.width();
    if (!o && !u)
      return new f(m.VALUE, E.WrongDimension);
    const l = o ? this.columnSearch : this.rowSearch, c = this.searchInRange(e, t, i, a, l);
    if (c === -1)
      return n == m.NA ? new f(m.NA, E.ValueNotFound) : n;
    const d = o ? [r.data[c]] : r.data.map((p) => [p[c]]);
    return M.onlyValues(d);
  }
  doMatch(e, t, r) {
    if (![-1, 0, 1].includes(r))
      return new f(m.VALUE, E.BadMode);
    if (t.width() > 1 && t.height() > 1)
      return new f(m.NA);
    const n = t.width() === 1 ? this.columnSearch : this.rowSearch, i = r === 0 ? {
      ordering: "none",
      ifNoMatch: "returnNotFound"
    } : {
      ordering: r === -1 ? "desc" : "asc",
      ifNoMatch: r === -1 ? "returnUpperBound" : "returnLowerBound"
    }, a = n.find(e, t, i);
    return a === -1 ? new f(m.NA, E.ValueNotFound) : a + 1;
  }
}
uc.implementedFunctions = {
  VLOOKUP: {
    method: "vlookup",
    parameters: [{
      argumentType: h.NOERROR
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.BOOLEAN,
      defaultValue: !0
    }]
  },
  HLOOKUP: {
    method: "hlookup",
    parameters: [{
      argumentType: h.NOERROR
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.BOOLEAN,
      defaultValue: !0
    }]
  },
  XLOOKUP: {
    method: "xlookup",
    sizeOfResultArrayMethod: "xlookupArraySize",
    parameters: [
      // lookup_value
      {
        argumentType: h.NOERROR
      },
      // lookup_array
      {
        argumentType: h.RANGE
      },
      // return_array
      {
        argumentType: h.RANGE
      },
      // [if_not_found]
      {
        argumentType: h.SCALAR,
        optionalArg: !0,
        defaultValue: m.NA
      },
      // [match_mode]
      {
        argumentType: h.NUMBER,
        optionalArg: !0,
        defaultValue: 0
      },
      // [search_mode]
      {
        argumentType: h.NUMBER,
        optionalArg: !0,
        defaultValue: 1
      }
    ]
  },
  MATCH: {
    method: "match",
    parameters: [{
      argumentType: h.NOERROR
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  }
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class hc extends V {
  roman(e, t) {
    return this.runFunction(e.args, t, this.metadata("ROMAN"), (r, n) => (r = Math.trunc(r), n === !1 ? n = 4 : n === !0 && (n = 0), n = I(this.coerceScalarToNumberOrError(n)), n instanceof f ? n : (n = Math.trunc(n), n < 0 ? new f(m.VALUE, E.ValueSmall) : n > 4 ? new f(m.VALUE, E.ValueLarge) : dE(r, n))));
  }
  arabic(e, t) {
    return this.runFunction(e.args, t, this.metadata("ARABIC"), (r) => {
      r = r.trim().toUpperCase();
      let n = !1;
      if (r.startsWith("-") && (r = r.slice(1), n = !0, r === ""))
        return new f(m.VALUE, E.InvalidRoman);
      const i = {
        input: r,
        acc: 0
      };
      return It(i, {
        token: "MMM",
        val: 3e3
      }, {
        token: "MM",
        val: 2e3
      }, {
        token: "M",
        val: 1e3
      }), It(i, {
        token: "IM",
        val: 999
      }, {
        token: "VM",
        val: 995
      }, {
        token: "XM",
        val: 990
      }, {
        token: "LM",
        val: 950
      }, {
        token: "CM",
        val: 900
      }), It(i, {
        token: "D",
        val: 500
      }, {
        token: "ID",
        val: 499
      }, {
        token: "VD",
        val: 495
      }, {
        token: "XD",
        val: 490
      }, {
        token: "LD",
        val: 450
      }, {
        token: "CD",
        val: 400
      }), It(i, {
        token: "CCC",
        val: 300
      }, {
        token: "CC",
        val: 200
      }, {
        token: "C",
        val: 100
      }), It(i, {
        token: "IC",
        val: 99
      }, {
        token: "VC",
        val: 95
      }, {
        token: "XC",
        val: 90
      }), It(i, {
        token: "L",
        val: 50
      }, {
        token: "IL",
        val: 49
      }, {
        token: "VL",
        val: 45
      }, {
        token: "XL",
        val: 40
      }), It(i, {
        token: "XXX",
        val: 30
      }, {
        token: "XX",
        val: 20
      }, {
        token: "X",
        val: 10
      }), It(i, {
        token: "IX",
        val: 9
      }), It(i, {
        token: "V",
        val: 5
      }, {
        token: "IV",
        val: 4
      }), It(i, {
        token: "III",
        val: 3
      }, {
        token: "II",
        val: 2
      }, {
        token: "I",
        val: 1
      }), i.input !== "" ? new f(m.VALUE, E.InvalidRoman) : n ? -i.acc : i.acc;
    });
  }
}
hc.implementedFunctions = {
  ROMAN: {
    method: "roman",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 1,
      lessThan: 4e3
    }, {
      argumentType: h.NOERROR,
      optionalArg: !0,
      defaultValue: 0
    }]
  },
  ARABIC: {
    method: "arabic",
    parameters: [{
      argumentType: h.STRING
    }]
  }
};
function It(s, ...e) {
  for (const t of e)
    if (s.input.startsWith(t.token)) {
      s.input = s.input.slice(t.token.length), s.acc += t.val;
      break;
    }
}
function dE(s, e) {
  const t = {
    val: s % 1e3,
    acc: "M".repeat(Math.floor(s / 1e3))
  };
  return e === 4 && (he(t, "IM", 999, 1e3), he(t, "ID", 499, 500)), e >= 3 && (he(t, "VM", 995, 1e3), he(t, "VD", 495, 500)), e >= 2 && (he(t, "XM", 990, 1e3), he(t, "XD", 490, 500)), e >= 1 && (he(t, "LM", 950, 1e3), he(t, "LD", 450, 500)), he(t, "CM", 900, 1e3), he(t, "CD", 400, 500), he(t, "D", 500, 900), t.acc += "C".repeat(Math.floor(t.val / 100)), t.val %= 100, e >= 2 && (he(t, "IC", 99, 100), he(t, "IL", 49, 50)), e >= 1 && (he(t, "VC", 95, 100), he(t, "VL", 45, 50)), he(t, "XC", 90, 100), he(t, "XL", 40, 50), he(t, "L", 50, 90), t.acc += "X".repeat(Math.floor(t.val / 10)), t.val %= 10, he(t, "IX", 9, 10), he(t, "IV", 4, 5), he(t, "V", 5, 9), t.acc += "I".repeat(t.val), t.acc;
}
function he(s, e, t, r) {
  s.val >= t && s.val < r && (s.val -= t, s.acc += e);
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class lc extends V {
  add(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.ADD"), this.arithmeticHelper.addWithEpsilon);
  }
  concat(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.CONCAT"), this.arithmeticHelper.concat);
  }
  divide(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.DIVIDE"), this.arithmeticHelper.divide);
  }
  eq(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.EQ"), this.arithmeticHelper.eq);
  }
  gt(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.GT"), this.arithmeticHelper.gt);
  }
  gte(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.GTE"), this.arithmeticHelper.geq);
  }
  lt(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.LT"), this.arithmeticHelper.lt);
  }
  lte(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.LTE"), this.arithmeticHelper.leq);
  }
  minus(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.MINUS"), this.arithmeticHelper.subtract);
  }
  multiply(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.MULTIPLY"), this.arithmeticHelper.multiply);
  }
  ne(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.NE"), this.arithmeticHelper.neq);
  }
  pow(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.POW"), this.arithmeticHelper.pow);
  }
  uminus(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.UMINUS"), this.arithmeticHelper.unaryMinus);
  }
  upercent(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.UNARY_PERCENT"), this.arithmeticHelper.unaryPercent);
  }
  uplus(e, t) {
    return this.runFunction(e.args, t, this.metadata("HF.UPLUS"), this.arithmeticHelper.unaryPlus);
  }
}
lc.implementedFunctions = {
  "HF.ADD": {
    method: "add",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }, {
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  },
  "HF.CONCAT": {
    method: "concat",
    parameters: [{
      argumentType: h.STRING,
      passSubtype: !0
    }, {
      argumentType: h.STRING,
      passSubtype: !0
    }]
  },
  "HF.DIVIDE": {
    method: "divide",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }, {
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  },
  "HF.EQ": {
    method: "eq",
    parameters: [{
      argumentType: h.NOERROR,
      passSubtype: !0
    }, {
      argumentType: h.NOERROR,
      passSubtype: !0
    }]
  },
  "HF.GT": {
    method: "gt",
    parameters: [{
      argumentType: h.NOERROR,
      passSubtype: !0
    }, {
      argumentType: h.NOERROR,
      passSubtype: !0
    }]
  },
  "HF.GTE": {
    method: "gte",
    parameters: [{
      argumentType: h.NOERROR,
      passSubtype: !0
    }, {
      argumentType: h.NOERROR,
      passSubtype: !0
    }]
  },
  "HF.LT": {
    method: "lt",
    parameters: [{
      argumentType: h.NOERROR,
      passSubtype: !0
    }, {
      argumentType: h.NOERROR,
      passSubtype: !0
    }]
  },
  "HF.LTE": {
    method: "lte",
    parameters: [{
      argumentType: h.NOERROR,
      passSubtype: !0
    }, {
      argumentType: h.NOERROR,
      passSubtype: !0
    }]
  },
  "HF.MINUS": {
    method: "minus",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }, {
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  },
  "HF.MULTIPLY": {
    method: "multiply",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }, {
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  },
  "HF.NE": {
    method: "ne",
    parameters: [{
      argumentType: h.NOERROR,
      passSubtype: !0
    }, {
      argumentType: h.NOERROR,
      passSubtype: !0
    }]
  },
  "HF.POW": {
    method: "pow",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }, {
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  },
  "HF.UMINUS": {
    method: "uminus",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  },
  "HF.UNARY_PERCENT": {
    method: "upercent",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  },
  "HF.UPLUS": {
    method: "uplus",
    parameters: [{
      argumentType: h.NUMBER,
      passSubtype: !0
    }]
  }
};
/**
 * @license
 bessel.js (C) 2013-present SheetJS -- http://sheetjs.com

 Apache License
 Version 2.0, January 2004
 http://www.apache.org/licenses/

 TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

 1. Definitions.

 "License" shall mean the terms and conditions for use, reproduction,
 and distribution as defined by Sections 1 through 9 of this document.

 "Licensor" shall mean the copyright owner or entity authorized by
 the copyright owner that is granting the License.

 "Legal Entity" shall mean the union of the acting entity and all
 other entities that control, are controlled by, or are under common
 control with that entity. For the purposes of this definition,
 "control" means (i) the power, direct or indirect, to cause the
 direction or management of such entity, whether by contract or
 otherwise, or (ii) ownership of fifty percent (50%) or more of the
 outstanding shares, or (iii) beneficial ownership of such entity.

 "You" (or "Your") shall mean an individual or Legal Entity
 exercising permissions granted by this License.

 "Source" form shall mean the preferred form for making modifications,
 including but not limited to software source code, documentation
 source, and configuration files.

 "Object" form shall mean any form resulting from mechanical
 transformation or translation of a Source form, including but
 not limited to compiled object code, generated documentation,
 and conversions to other media types.

 "Work" shall mean the work of authorship, whether in Source or
 Object form, made available under the License, as indicated by a
 copyright notice that is included in or attached to the work
 (an example is provided in the Appendix below).

 "Derivative Works" shall mean any work, whether in Source or Object
 form, that is based on (or derived from) the Work and for which the
 editorial revisions, annotations, elaborations, or other modifications
 represent, as a whole, an original work of authorship. For the purposes
 of this License, Derivative Works shall not include works that remain
 separable from, or merely link (or bind by name) to the interfaces of,
 the Work and Derivative Works thereof.

 "Contribution" shall mean any work of authorship, including
 the original version of the Work and any modifications or additions
 to that Work or Derivative Works thereof, that is intentionally
 submitted to Licensor for inclusion in the Work by the copyright owner
 or by an individual or Legal Entity authorized to submit on behalf of
 the copyright owner. For the purposes of this definition, "submitted"
 means any form of electronic, verbal, or written communication sent
 to the Licensor or its representatives, including but not limited to
 communication on electronic mailing lists, source code control systems,
 and issue tracking systems that are managed by, or on behalf of, the
 Licensor for the purpose of discussing and improving the Work, but
 excluding communication that is conspicuously marked or otherwise
 designated in writing by the copyright owner as "Not a Contribution."

 "Contributor" shall mean Licensor and any individual or Legal Entity
 on behalf of whom a Contribution has been received by Licensor and
 subsequently incorporated within the Work.

 2. Grant of Copyright License. Subject to the terms and conditions of
 this License, each Contributor hereby grants to You a perpetual,
 worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 copyright license to reproduce, prepare Derivative Works of,
 publicly display, publicly perform, sublicense, and distribute the
 Work and such Derivative Works in Source or Object form.

 3. Grant of Patent License. Subject to the terms and conditions of
 this License, each Contributor hereby grants to You a perpetual,
 worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 (except as stated in this section) patent license to make, have made,
 use, offer to sell, sell, import, and otherwise transfer the Work,
 where such license applies only to those patent claims licensable
 by such Contributor that are necessarily infringed by their
 Contribution(s) alone or by combination of their Contribution(s)
 with the Work to which such Contribution(s) was submitted. If You
 institute patent litigation against any entity (including a
 cross-claim or counterclaim in a lawsuit) alleging that the Work
 or a Contribution incorporated within the Work constitutes direct
 or contributory patent infringement, then any patent licenses
 granted to You under this License for that Work shall terminate
 as of the date such litigation is filed.

 4. Redistribution. You may reproduce and distribute copies of the
 Work or Derivative Works thereof in any medium, with or without
 modifications, and in Source or Object form, provided that You
 meet the following conditions:

 (a) You must give any other recipients of the Work or
 Derivative Works a copy of this License; and

 (b) You must cause any modified files to carry prominent notices
 stating that You changed the files; and

 (c) You must retain, in the Source form of any Derivative Works
 that You distribute, all copyright, patent, trademark, and
 attribution notices from the Source form of the Work,
 excluding those notices that do not pertain to any part of
 the Derivative Works; and

 (d) If the Work includes a "NOTICE" text file as part of its
 distribution, then any Derivative Works that You distribute must
 include a readable copy of the attribution notices contained
 within such NOTICE file, excluding those notices that do not
 pertain to any part of the Derivative Works, in at least one
 of the following places: within a NOTICE text file distributed
 as part of the Derivative Works; within the Source form or
 documentation, if provided along with the Derivative Works; or,
 within a display generated by the Derivative Works, if and
 wherever such third-party notices normally appear. The contents
 of the NOTICE file are for informational purposes only and
 do not modify the License. You may add Your own attribution
 notices within Derivative Works that You distribute, alongside
 or as an addendum to the NOTICE text from the Work, provided
 that such additional attribution notices cannot be construed
 as modifying the License.

 You may add Your own copyright statement to Your modifications and
 may provide additional or different license terms and conditions
 for use, reproduction, or distribution of Your modifications, or
 for any such Derivative Works as a whole, provided Your use,
 reproduction, and distribution of the Work otherwise complies with
 the conditions stated in this License.

 5. Submission of Contributions. Unless You explicitly state otherwise,
 any Contribution intentionally submitted for inclusion in the Work
 by You to the Licensor shall be under the terms and conditions of
 this License, without any additional terms or conditions.
 Notwithstanding the above, nothing herein shall supersede or modify
 the terms of any separate license agreement you may have executed
 with Licensor regarding such Contributions.

 6. Trademarks. This License does not grant permission to use the trade
 names, trademarks, service marks, or product names of the Licensor,
 except as required for reasonable and customary use in describing the
 origin of the Work and reproducing the content of the NOTICE file.

 7. Disclaimer of Warranty. Unless required by applicable law or
 agreed to in writing, Licensor provides the Work (and each
 Contributor provides its Contributions) on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 implied, including, without limitation, any warranties or conditions
 of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
 PARTICULAR PURPOSE. You are solely responsible for determining the
 appropriateness of using or redistributing the Work and assume any
 risks associated with Your exercise of permissions under this License.

 8. Limitation of Liability. In no event and under no legal theory,
 whether in tort (including negligence), contract, or otherwise,
 unless required by applicable law (such as deliberate and grossly
 negligent acts) or agreed to in writing, shall any Contributor be
 liable to You for damages, including any direct, indirect, special,
 incidental, or consequential damages of any character arising as a
 result of this License or out of the use or inability to use the
 Work (including but not limited to damages for loss of goodwill,
 work stoppage, computer failure or malfunction, or any and all
 other commercial damages or losses), even if such Contributor
 has been advised of the possibility of such damages.

 9. Accepting Warranty or Additional Liability. While redistributing
 the Work or Derivative Works thereof, You may choose to offer,
 and charge a fee for, acceptance of support, warranty, indemnity,
 or other liability obligations and/or rights consistent with this
 License. However, in accepting such obligations, You may act only
 on Your own behalf and on Your sole responsibility, not on behalf
 of any other Contributor, and only if You agree to indemnify,
 defend, and hold each Contributor harmless for any liability
 incurred by, or claims asserted against, such Contributor by reason
 of your accepting any such warranty or additional liability.

 END OF TERMS AND CONDITIONS

 APPENDIX: How to apply the Apache License to your work.

 To apply the Apache License to your work, attach the following
 boilerplate notice, with the fields enclosed by brackets "{}"
 replaced with your own identifying information. (Don't include
 the brackets!)  The text should be enclosed in the appropriate
 comment syntax for the file format. We also recommend that a
 file or class name and description of purpose be included on the
 same "printed page" as the copyright notice for easier
 identification within third-party archives.

 Copyright (C) 2013-present   SheetJS LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */
var k = Math;
function re(s, e) {
  for (var t = 0, r = 0; t < s.length; ++t)
    r = e * r + s[t];
  return r;
}
function cc(s, e, t, r, n) {
  if (e === 0)
    return t;
  if (e === 1)
    return r;
  for (var i = 2 / s, a = r, o = 1; o < e; ++o)
    a = r * o * i + n * t, t = r, r = a;
  return a;
}
function dc(s, e, t, r, n) {
  return function(a, o) {
    if (r) {
      if (a === 0)
        return r == 1 ? -1 / 0 : 1 / 0;
      if (a < 0)
        return NaN;
    }
    if (o === 0)
      return s(a);
    if (o === 1)
      return e(a);
    if (o < 0)
      return NaN;
    o |= 0;
    var u = s(a), l = e(a);
    return cc(a, o, u, l, n);
  };
}
var aa = (function() {
  var s = 0.636619772, e = [57568490574, -13362590354, 6516196407e-1, -1121442418e-2, 77392.33017, -184.9052456].reverse(), t = [57568490411, 1029532985, 9494680718e-3, 59272.64853, 267.8532712, 1].reverse(), r = [1, -0.001098628627, 2734510407e-14, -2073370639e-15, 2093887211e-16].reverse(), n = [-0.01562499995, 1430488765e-13, -6911147651e-15, 7621095161e-16, -934935152e-16].reverse();
  function i(d) {
    var p = 0, N = 0, T = 0, R = d * d;
    if (d < 8)
      N = re(e, R), T = re(t, R), p = N / T;
    else {
      var S = d - 0.785398164;
      R = 64 / R, N = re(r, R), T = re(n, R), p = k.sqrt(s / d) * (k.cos(S) * N - k.sin(S) * T * 8 / d);
    }
    return p;
  }
  var a = [72362614232, -7895059235, 2423968531e-1, -2972611439e-3, 15704.4826, -30.16036606].reverse(), o = [144725228442, 2300535178, 1858330474e-2, 99447.43394, 376.9991397, 1].reverse(), u = [1, 183105e-8, -3516396496e-14, 2457520174e-15, -240337019e-15].reverse(), l = [0.04687499995, -2002690873e-13, 8449199096e-15, -88228987e-14, 105787412e-15].reverse();
  function c(d) {
    var p = 0, N = 0, T = 0, R = d * d, S = k.abs(d) - 2.356194491;
    return Math.abs(d) < 8 ? (N = d * re(a, R), T = re(o, R), p = N / T) : (R = 64 / R, N = re(u, R), T = re(l, R), p = k.sqrt(s / k.abs(d)) * (k.cos(S) * N - k.sin(S) * T * 8 / k.abs(d)), d < 0 && (p = -p)), p;
  }
  return function d(p, N) {
    if (N = Math.round(N), !isFinite(p))
      return isNaN(p) ? p : 0;
    if (N < 0)
      return (N % 2 ? -1 : 1) * d(p, -N);
    if (p < 0)
      return (N % 2 ? -1 : 1) * d(-p, N);
    if (N === 0)
      return i(p);
    if (N === 1)
      return c(p);
    if (p === 0)
      return 0;
    var T = 0;
    if (p > N)
      T = cc(p, N, i(p), c(p), -1);
    else {
      for (var R = 2 * k.floor((N + k.floor(k.sqrt(40 * N))) / 2), S = !1, A = 0, y = 0, v = 1, w = 0, ee = 2 / p, Z = R; Z > 0; Z--)
        w = Z * ee * v - A, A = v, v = w, k.abs(v) > 1e10 && (v *= 1e-10, A *= 1e-10, T *= 1e-10, y *= 1e-10), S && (y += v), S = !S, Z == N && (T = A);
      y = 2 * y - v, T /= y;
    }
    return T;
  };
})(), fE = (function() {
  var s = 0.636619772, e = [-2957821389, 7062834065, -5123598036e-1, 1087988129e-2, -86327.92757, 228.4622733].reverse(), t = [40076544269, 7452499648e-1, 7189466438e-3, 47447.2647, 226.1030244, 1].reverse(), r = [1, -0.001098628627, 2734510407e-14, -2073370639e-15, 2093887211e-16].reverse(), n = [-0.01562499995, 1430488765e-13, -6911147651e-15, 7621095161e-16, -934945152e-16].reverse();
  function i(d) {
    var p = 0, N = 0, T = 0, R = d * d, S = d - 0.785398164;
    return d < 8 ? (N = re(e, R), T = re(t, R), p = N / T + s * aa(d, 0) * k.log(d)) : (R = 64 / R, N = re(r, R), T = re(n, R), p = k.sqrt(s / d) * (k.sin(S) * N + k.cos(S) * T * 8 / d)), p;
  }
  var a = [-4900604943e3, 127527439e4, -51534381390, 7349264551e-1, -4237922726e-3, 8511.937935].reverse(), o = [249958057e5, 424441966400, 3733650367, 2245904002e-2, 102042.605, 354.9632885, 1].reverse(), u = [1, 183105e-8, -3516396496e-14, 2457520174e-15, -240337019e-15].reverse(), l = [0.04687499995, -2002690873e-13, 8449199096e-15, -88228987e-14, 105787412e-15].reverse();
  function c(d) {
    var p = 0, N = 0, T = 0, R = d * d, S = d - 2.356194491;
    return d < 8 ? (N = d * re(a, R), T = re(o, R), p = N / T + s * (aa(d, 1) * k.log(d) - 1 / d)) : (R = 64 / R, N = re(u, R), T = re(l, R), p = k.sqrt(s / d) * (k.sin(S) * N + k.cos(S) * T * 8 / d)), p;
  }
  return dc(i, c, "BESSELY", 1, -1);
})(), oa = (function() {
  var s = [1, 3.5156229, 3.0899424, 1.2067492, 0.2659732, 0.0360768, 45813e-7].reverse(), e = [0.39894228, 0.01328592, 225319e-8, -157565e-8, 916281e-8, -0.02057706, 0.02635537, -0.01647633, 392377e-8].reverse();
  function t(a) {
    return a <= 3.75 ? re(s, a * a / (3.75 * 3.75)) : k.exp(k.abs(a)) / k.sqrt(k.abs(a)) * re(e, 3.75 / k.abs(a));
  }
  var r = [0.5, 0.87890594, 0.51498869, 0.15084934, 0.02658733, 301532e-8, 32411e-8].reverse(), n = [0.39894228, -0.03988024, -362018e-8, 163801e-8, -0.01031555, 0.02282967, -0.02895312, 0.01787654, -420059e-8].reverse();
  function i(a) {
    return a < 3.75 ? a * re(r, a * a / (3.75 * 3.75)) : (a < 0 ? -1 : 1) * k.exp(k.abs(a)) / k.sqrt(k.abs(a)) * re(n, 3.75 / k.abs(a));
  }
  return function a(o, u) {
    if (u = Math.round(u), u === 0)
      return t(o);
    if (u === 1)
      return i(o);
    if (u < 0)
      return NaN;
    if (k.abs(o) === 0)
      return 0;
    if (o == 1 / 0)
      return 1 / 0;
    var l = 0, c, d = 2 / k.abs(o), p = 0, N = 1, T = 0, R = 2 * k.round((u + k.round(k.sqrt(40 * u))) / 2);
    for (c = R; c > 0; c--)
      T = c * d * N + p, p = N, N = T, k.abs(N) > 1e10 && (N *= 1e-10, p *= 1e-10, l *= 1e-10), c == u && (l = p);
    return l *= a(o, 0) / N, o < 0 && u % 2 ? -l : l;
  };
})(), pE = (function() {
  var s = [-0.57721566, 0.4227842, 0.23069756, 0.0348859, 262698e-8, 1075e-7, 74e-7].reverse(), e = [1.25331414, -0.07832358, 0.02189568, -0.01062446, 587872e-8, -25154e-7, 53208e-8].reverse();
  function t(a) {
    return a <= 2 ? -k.log(a / 2) * oa(a, 0) + re(s, a * a / 4) : k.exp(-a) / k.sqrt(a) * re(e, 2 / a);
  }
  var r = [1, 0.15443144, -0.67278579, -0.18156897, -0.01919402, -110404e-8, -4686e-8].reverse(), n = [1.25331414, 0.23498619, -0.0365562, 0.01504268, -780353e-8, 325614e-8, -68245e-8].reverse();
  function i(a) {
    return a <= 2 ? k.log(a / 2) * oa(a, 1) + 1 / a * re(r, a * a / 4) : k.exp(-a) / k.sqrt(a) * re(n, 2 / a);
  }
  return dc(t, i, "BESSELK", 2, 1);
})();
/**
 * @license
 Copyright (c) 2013 jStat

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
function jr(s) {
  const e = [-1.3026537197817094, 0.6419697923564902, 0.019476473204185836, -0.00956151478680863, -946595344482036e-18, 366839497852761e-18, 42523324806907e-18, -20278578112534e-18, -1624290004647e-18, 130365583558e-17, 15626441722e-18, -85238095915e-18, 6529054439e-18, 5059343495e-18, -991364156e-18, -227365122e-18, 96467911e-18, 2394038e-18, -6886027e-18, 894487e-18, 313092e-18, -112708e-18, 381e-18, 7106e-18, -1523e-18, -94e-18, 121e-18, -28e-18];
  let t = e.length - 1, r = !1, n = 0, i = 0, a, o, u, l;
  if (s === 0)
    return 0;
  for (s < 0 && (s = -s, r = !0), a = 2 / (2 + s), o = 4 * a - 2; t > 0; t--)
    u = n, n = o * n - i + e[t], i = u;
  return l = a * Math.exp(-s * s + 0.5 * (e[0] + o * n) - i), r ? l - 1 : 1 - l;
}
function fc(s) {
  return 1 - jr(s);
}
function pc(s) {
  let e = 0, t, r, n, i;
  if (s >= 2)
    return -100;
  if (s <= 0)
    return 100;
  for (i = s < 1 ? s : 2 - s, n = Math.sqrt(-2 * Math.log(i / 2)), t = -0.70711 * ((2.30753 + n * 0.27061) / (1 + n * (0.99229 + n * 0.04481)) - n); e < 2; e++)
    r = fc(t) - i, t += r / (1.1283791670955126 * Math.exp(-t * t) - t * r);
  return s < 1 ? t : -t;
}
const pu = {
  pdf: (s, e) => s < 0 ? 0 : e * Math.exp(-e * s),
  cdf: (s, e) => s < 0 ? 0 : 1 - Math.exp(-e * s)
};
function Tn(s) {
  const e = [-1.716185138865495, 24.76565080557592, -379.80425647094563, 629.3311553128184, 866.9662027904133, -31451.272968848367, -36144.413418691176, 66456.14382024054], t = [-30.8402300119739, 315.35062697960416, -1015.1563674902192, -3107.771671572311, 22538.11842098015, 4755.846277527881, -134659.9598649693, -115132.2596755535];
  let r = !1, n = 0, i = 0, a = 0, o = s, u, l, c, d;
  if (s > 171.6243769536076)
    return 1 / 0;
  if (o <= 0)
    if (d = o % 1, d)
      r = (o & 1 ? -1 : 1) * Math.PI / Math.sin(Math.PI * d), o = 1 - o;
    else
      return 1 / 0;
  for (c = o, o < 1 ? l = o++ : l = (o -= n = (o | 0) - 1) - 1, u = 0; u < 8; ++u)
    a = (a + e[u]) * l, i = i * l + t[u];
  if (d = a / i + 1, c < o)
    d /= c;
  else if (c > o)
    for (u = 0; u < n; ++u)
      d *= o, o++;
  return r && (d = r / d), d;
}
const Oi = {
  pdf: function(e, t, r) {
    return e < 0 ? 0 : e === 0 && t === 1 ? 1 / r : Math.exp((t - 1) * Math.log(e) - e / r - Se(t) - t * Math.log(r));
  },
  cdf: function(e, t, r) {
    return e < 0 ? 0 : Ga(t, e / r);
  },
  inv: function(s, e, t) {
    return mc(s, e) * t;
  }
};
function Se(s) {
  let e = 0;
  const t = [76.18009172947146, -86.50532032941678, 24.01409824083091, -1.231739572450155, 0.001208650973866179, -5395239384953e-18];
  let r = 1.000000000190015, n, i, a;
  for (a = (i = n = s) + 5.5, a -= (n + 0.5) * Math.log(a); e < 6; e++)
    r += t[e] / ++i;
  return Math.log(2.5066282746310007 * r / n) - a;
}
function Ga(s, e) {
  const t = Se(s);
  let r = s, n = 1 / s, i = n, a = e + 1 - s, o = 1 / 1e-30, u = 1 / a, l = u, c = 1;
  const d = -~(Math.log(s >= 1 ? s : 1 / s) * 8.5 + s * 0.4 + 17);
  let p;
  if (e < 0 || s <= 0)
    return NaN;
  if (e < s + 1) {
    for (; c <= d; c++)
      n += i *= e / ++r;
    return n * Math.exp(-e + s * Math.log(e) - t);
  }
  for (; c <= d; c++)
    p = -c * (c - s), a += 2, u = p * u + a, o = a + p / o, u = 1 / u, l *= u * o;
  return 1 - l * Math.exp(-e + s * Math.log(e) - t);
}
function mc(s, e) {
  let t = 0;
  const r = e - 1, n = 1e-8, i = Se(e);
  let a, o, u, l, c, d, p;
  if (s >= 1)
    return Math.max(100, e + 100 * Math.sqrt(e));
  if (s <= 0)
    return 0;
  for (e > 1 ? (d = Math.log(r), p = Math.exp(r * (d - 1) - i), c = s < 0.5 ? s : 1 - s, u = Math.sqrt(-2 * Math.log(c)), a = (2.30753 + u * 0.27061) / (1 + u * (0.99229 + u * 0.04481)) - u, s < 0.5 && (a = -a), a = Math.max(1e-3, e * Math.pow(1 - 1 / (9 * e) - a / (3 * Math.sqrt(e)), 3))) : (u = 1 - e * (0.253 + e * 0.12), s < u ? a = Math.pow(s / u, 1 / e) : a = 1 - Math.log(1 - (s - u) / (1 - u))); t < 12; t++) {
    if (a <= 0)
      return 0;
    if (o = Ga(e, a) - s, e > 1 ? u = p * Math.exp(-(a - r) + r * (Math.log(a) - d)) : u = Math.exp(-a + r * Math.log(a) - i), l = o / u, a -= u = l / (1 - 0.5 * Math.min(1, l * ((e - 1) / a - 1))), a <= 0 && (a = 0.5 * (a + u)), Math.abs(u) < n * a)
      break;
  }
  return a;
}
const pt = {
  pdf: function(e, t, r) {
    return Math.exp(-0.5 * Math.log(2 * Math.PI) - Math.log(r) - Math.pow(e - t, 2) / (2 * r * r));
  },
  cdf: function(e, t, r) {
    return 0.5 * (1 + jr((e - t) / Math.sqrt(2 * r * r)));
  },
  inv: function(s, e, t) {
    return -1.4142135623730951 * t * pc(2 * s) + e;
  }
}, Mi = {
  pdf: function(e, t, r) {
    return e > 1 || e < 0 ? 0 : t == 1 && r == 1 ? 1 : t < 512 && r < 512 ? Math.pow(e, t - 1) * Math.pow(1 - e, r - 1) / Ha(t, r) : Math.exp((t - 1) * Math.log(e) + (r - 1) * Math.log(1 - e) - gc(t, r));
  },
  cdf: function(e, t, r) {
    return e > 1 || e < 0 ? +(e > 1) : oi(e, t, r);
  },
  inv: function(e, t, r) {
    return Wa(e, t, r);
  }
};
function Ha(s, e) {
  if (!(s <= 0 || e <= 0))
    return s + e > 170 ? Math.exp(gc(s, e)) : Tn(s) * Tn(e) / Tn(s + e);
}
function gc(s, e) {
  return Se(s) + Se(e) - Se(s + e);
}
function Wa(s, e, t) {
  var r = 1e-8, n = e - 1, i = t - 1, a = 0, o, u, l, c, d, p, N, T, R, S, A;
  if (s <= 0)
    return 0;
  if (s >= 1)
    return 1;
  for (e >= 1 && t >= 1 ? (l = s < 0.5 ? s : 1 - s, c = Math.sqrt(-2 * Math.log(l)), N = (2.30753 + c * 0.27061) / (1 + c * (0.99229 + c * 0.04481)) - c, s < 0.5 && (N = -N), T = (N * N - 3) / 6, R = 2 / (1 / (2 * e - 1) + 1 / (2 * t - 1)), S = N * Math.sqrt(T + R) / R - (1 / (2 * t - 1) - 1 / (2 * e - 1)) * (T + 5 / 6 - 2 / (3 * R)), N = e / (e + t * Math.exp(2 * S))) : (o = Math.log(e / (e + t)), u = Math.log(t / (e + t)), c = Math.exp(e * o) / e, d = Math.exp(t * u) / t, S = c + d, s < c / S ? N = Math.pow(e * S * s, 1 / e) : N = 1 - Math.pow(t * S * (1 - s), 1 / t)), A = -Se(e) - Se(t) + Se(e + t); a < 10; a++) {
    if (N === 0 || N === 1)
      return N;
    if (p = oi(N, e, t) - s, c = Math.exp(n * Math.log(N) + i * Math.log(1 - N) + A), d = p / c, N -= c = d / (1 - 0.5 * Math.min(1, d * (n / N - i / (1 - N)))), N <= 0 && (N = 0.5 * (N + c)), N >= 1 && (N = 0.5 * (N + c + 1)), Math.abs(c) < r * N && a > 0)
      break;
  }
  return N;
}
function oi(s, e, t) {
  var r = s === 0 || s === 1 ? 0 : Math.exp(Se(e + t) - Se(e) - Se(t) + e * Math.log(s) + t * Math.log(1 - s));
  return s < 0 || s > 1 ? !1 : s < (e + 1) / (e + t + 2) ? r * mu(s, e, t) / e : 1 - r * mu(1 - s, t, e) / t;
}
function mu(s, e, t) {
  var r = 1e-30, n = 1, i = e + t, a = e + 1, o = e - 1, u = 1, l = 1 - i * s / a, c, d, p, N;
  for (Math.abs(l) < r && (l = r), l = 1 / l, N = l; n <= 100 && (c = 2 * n, d = n * (t - n) * s / ((o + c) * (e + c)), l = 1 + d * l, Math.abs(l) < r && (l = r), u = 1 + d / u, Math.abs(u) < r && (u = r), l = 1 / l, N *= l * u, d = -(e + n) * (i + n) * s / ((e + c) * (a + c)), l = 1 + d * l, Math.abs(l) < r && (l = r), u = 1 + d / u, Math.abs(u) < r && (u = r), l = 1 / l, p = l * u, N *= p, !(Math.abs(p - 1) < 3e-7)); n++)
    ;
  return N;
}
const ms = {
  pdf: function(s, e, t) {
    return t === 0 || t === 1 ? e * t === s ? 1 : 0 : Ec(e, s) * Math.pow(t, s) * Math.pow(1 - t, e - s);
  },
  cdf: function(s, e, t) {
    var r, n = 1e-10;
    if (s < 0)
      return 0;
    if (s >= e)
      return 1;
    if (t < 0 || t > 1 || e <= 0)
      return NaN;
    s = Math.floor(s);
    var i = t, a = s + 1, o = e - s, u = a + o, l = Math.exp(Se(u) - Se(o) - Se(a) + a * Math.log(i) + o * Math.log(1 - i));
    return i < (a + 1) / (u + 2) ? r = l * gu(i, a, o, n) : r = 1 - l * gu(1 - i, o, a, n), Math.round((1 - r) * (1 / n)) / (1 / n);
  }
};
function gu(s, e, t, r) {
  for (var n = 0, i = 1, a = 1, o = 1, u = 0, l = 0, c; Math.abs((a - l) / a) > r; )
    l = a, c = -(e + u) * (e + t + u) * s / (e + 2 * u) / (e + 2 * u + 1), n = a + c * n, i = o + c * i, u = u + 1, c = u * (t - u) * s / (e + 2 * u - 1) / (e + 2 * u), a = n + c * a, o = i + c * o, n = n / o, i = i / o, a = a / o, o = 1;
  return a / e;
}
function Ec(s, e) {
  return s > 170 || e > 170 ? Math.exp(mE(s, e)) : gs(s) / gs(e) / gs(s - e);
}
function mE(s, e) {
  return wi(s) - wi(e) - wi(s - e);
}
function wi(s) {
  return s < 0 ? NaN : Se(s + 1);
}
function gs(s) {
  return s < 0 ? NaN : Tn(s + 1);
}
const Dr = {
  pdf: function(e, t) {
    return e < 0 ? 0 : e === 0 && t === 2 ? 0.5 : Math.exp((t / 2 - 1) * Math.log(e) - e / 2 - t / 2 * Math.log(2) - Se(t / 2));
  },
  cdf: function(e, t) {
    return e < 0 ? 0 : Ga(t / 2, e / 2);
  },
  inv: function(s, e) {
    return 2 * mc(s, 0.5 * e);
  }
}, Br = {
  // This implementation of the pdf function avoids float overflow
  // See the way that R calculates this value:
  // https://svn.r-project.org/R/trunk/src/nmath/df.c
  pdf: function(e, t, r) {
    var n, i, a;
    return e < 0 ? 0 : t <= 2 ? e === 0 && t < 2 ? 1 / 0 : e === 0 && t === 2 ? 1 : 1 / Ha(t / 2, r / 2) * Math.pow(t / r, t / 2) * Math.pow(e, t / 2 - 1) * Math.pow(1 + t / r * e, -(t + r) / 2) : (n = t * e / (r + e * t), i = r / (r + e * t), a = t * i / 2, a * ms.pdf((t - 2) / 2, (t + r - 2) / 2, n));
  },
  cdf: function(e, t, r) {
    return e < 0 ? 0 : oi(t * e / (t * e + r), t / 2, r / 2);
  },
  inv: function(e, t, r) {
    return r / (t * (1 / Wa(e, t / 2, r / 2) - 1));
  }
}, Eu = {
  pdf: function(e, t, r) {
    return e < 0 || t < 0 || r < 0 ? 0 : r / t * Math.pow(e / t, r - 1) * Math.exp(-Math.pow(e / t, r));
  },
  cdf: function(e, t, r) {
    return e < 0 ? 0 : 1 - Math.exp(-Math.pow(e / t, r));
  }
}, ua = {
  pdf: function(e, t) {
    return t < 0 || e % 1 !== 0 || e < 0 ? 0 : Math.pow(t, e) * Math.exp(-t) / gs(e);
  },
  cdf: function(e, t) {
    var r = 0;
    if (e < 0)
      return 0;
    for (var n = 0; r <= e; r++)
      n += ua.pdf(r, t);
    return n;
  }
}, Gt = {
  pdf: function(e, t, r, n) {
    if (e < 0 || e < r - (t - n))
      return 0;
    if (e > n || e > r)
      return 0;
    if (r * 2 > t)
      return n * 2 > t ? Gt.pdf(t - r - n + e, t, t - r, t - n) : Gt.pdf(n - e, t, t - r, n);
    if (n * 2 > t)
      return Gt.pdf(r - e, t, r, t - n);
    if (r < n)
      return Gt.pdf(e, t, n, r);
    for (var i = 1, a = 0, o = 0; o < e; o++) {
      for (; i > 1 && a < n; )
        i *= 1 - r / (t - a), a++;
      i *= (n - o) * (r - o) / ((o + 1) * (t - r - n + o + 1));
    }
    for (; a < n; a++)
      i *= 1 - r / (t - a);
    return Math.min(1, Math.max(0, i));
  },
  cdf: function s(e, t, r, n) {
    if (e < 0 || e < r - (t - n))
      return 0;
    if (e >= n || e >= r)
      return 1;
    if (r * 2 > t)
      return n * 2 > t ? s(t - r - n + e, t, t - r, t - n) : 1 - Gt.cdf(n - e - 1, t, t - r, n);
    if (n * 2 > t)
      return 1 - Gt.cdf(r - e - 1, t, r, t - n);
    if (r < n)
      return Gt.cdf(e, t, n, r);
    for (var i = 1, a = 1, o = 0, u = 0; u < e; u++) {
      for (; i > 1 && o < n; ) {
        var l = 1 - r / (t - o);
        a *= l, i *= l, o++;
      }
      a *= (n - u) * (r - u) / ((u + 1) * (t - r - n + u + 1)), i += a;
    }
    for (; o < n; o++)
      i *= 1 - r / (t - o);
    return Math.min(1, Math.max(0, i));
  }
}, at = {
  pdf: function(e, t) {
    return t = t > 1e100 ? 1e100 : t, 1 / (Math.sqrt(t) * Ha(0.5, t / 2)) * Math.pow(1 + e * e / t, -((t + 1) / 2));
  },
  cdf: function(e, t) {
    var r = t / 2;
    return oi((e + Math.sqrt(e * e + t)) / (2 * Math.sqrt(e * e + t)), r, r);
  },
  inv: function(s, e) {
    var t = Wa(2 * Math.min(s, 1 - s), 0.5 * e, 0.5);
    return t = Math.sqrt(e * (1 - t) / t), s > 0.5 ? t : -t;
  }
}, _i = {
  pdf: function(e, t, r) {
    return e <= 0 ? 0 : Math.exp(-Math.log(e) - 0.5 * Math.log(2 * Math.PI) - Math.log(r) - Math.pow(Math.log(e) - t, 2) / (2 * r * r));
  },
  cdf: function(e, t, r) {
    return e < 0 ? 0 : 0.5 + 0.5 * jr((Math.log(e) - t) / Math.sqrt(2 * r * r));
  },
  inv: function(s, e, t) {
    return Math.exp(-1.4142135623730951 * t * pc(2 * s) + e);
  }
}, ha = {
  pdf: function(e, t, r) {
    return e !== e >>> 0 ? !1 : e < 0 ? 0 : Ec(e + t - 1, t - 1) * Math.pow(1 - r, e) * Math.pow(r, t);
  },
  cdf: function(e, t, r) {
    var n = 0, i = 0;
    if (e < 0)
      return 0;
    for (; i <= e; i++)
      n += ha.pdf(i, t, r);
    return n;
  }
};
function Rc(s) {
  for (var e = 0, t = s.length; --t >= 0; )
    e += s[t];
  return e;
}
function it(s) {
  return Rc(s) / s.length;
}
function Rr(s) {
  for (var e = it(s), t = 0, r = s.length, n; --r >= 0; )
    n = s[r] - e, t += n * n;
  return t;
}
function hn(s, e) {
  return Rr(s) / (s.length - (e ? 1 : 0));
}
function rr(s, e) {
  return Math.sqrt(hn(s, e));
}
function gE() {
  var s = [].slice.call(arguments), e = new Array(2), t;
  return s.length === 4 ? t = Math.abs(pt.inv(s[1] / 2, 0, 1) * s[2] / Math.sqrt(s[3])) : t = Math.abs(pt.inv(s[1] / 2, 0, 1) * rr(s[2]) / Math.sqrt(s[2].length)), e[0] = s[0] - t, e[1] = s[0] + t, e;
}
function EE() {
  var s = [].slice.call(arguments), e = new Array(2), t;
  return s.length === 4 ? t = Math.abs(at.inv(s[1] / 2, s[3] - 1) * s[2] / Math.sqrt(s[3])) : t = Math.abs(at.inv(s[1] / 2, s[2].length - 1) * rr(s[2], !0) / Math.sqrt(s[2].length)), e[0] = s[0] - t, e[1] = s[0] + t, e;
}
function RE(s) {
  for (var e = 1, t = s.length; --t >= 0; )
    e *= s[t];
  return e;
}
function NE(s) {
  return Math.pow(RE(s), 1 / s.length);
}
function ln(s, e) {
  var t = it(s), r = it(e), n = s.length, i = new Array(n), a;
  for (a = 0; a < n; a++)
    i[a] = (s[a] - t) * (e[a] - r);
  return Rc(i) / (n - 1);
}
function Ru(s, e) {
  return ln(s, e) / rr(s, 1) / rr(e, 1);
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Ya extends V {
  erf(e, t) {
    return this.runFunction(e.args, t, this.metadata("ERF"), (r, n) => n === void 0 ? jr(r) : jr(n) - jr(r));
  }
  erfc(e, t) {
    return this.runFunction(e.args, t, this.metadata("ERFC"), fc);
  }
  expondist(e, t) {
    return this.runFunction(e.args, t, this.metadata("EXPON.DIST"), (r, n, i) => i ? pu.cdf(r, n) : pu.pdf(r, n));
  }
  fisher(e, t) {
    return this.runFunction(e.args, t, this.metadata("FISHER"), (r) => Math.log((1 + r) / (1 - r)) / 2);
  }
  fisherinv(e, t) {
    return this.runFunction(e.args, t, this.metadata("FISHERINV"), (r) => 1 - 2 / (Math.exp(2 * r) + 1));
  }
  gamma(e, t) {
    return this.runFunction(e.args, t, this.metadata("GAMMA"), Tn);
  }
  gammadist(e, t) {
    return this.runFunction(e.args, t, this.metadata("GAMMA.DIST"), (r, n, i, a) => a ? Oi.cdf(r, n, i) : Oi.pdf(r, n, i));
  }
  gammaln(e, t) {
    return this.runFunction(e.args, t, this.metadata("GAMMALN"), Se);
  }
  gammainv(e, t) {
    return this.runFunction(e.args, t, this.metadata("GAMMA.INV"), Oi.inv);
  }
  gauss(e, t) {
    return this.runFunction(e.args, t, this.metadata("GAUSS"), (r) => pt.cdf(r, 0, 1) - 0.5);
  }
  betadist(e, t) {
    return this.runFunction(e.args, t, this.metadata("BETA.DIST"), (r, n, i, a, o, u) => r <= o ? new f(m.NUM, E.ValueSmall) : r >= u ? new f(m.NUM, E.ValueLarge) : (r = (r - o) / (u - o), a ? Mi.cdf(r, n, i) : Mi.pdf(r, n, i)));
  }
  betainv(e, t) {
    return this.runFunction(e.args, t, this.metadata("BETA.INV"), (r, n, i, a, o) => a >= o ? new f(m.NUM, E.WrongOrder) : Mi.inv(r, n, i) * (o - a) + a);
  }
  binomialdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("BINOM.DIST"), (r, n, i, a) => r > n ? new f(m.NUM, E.WrongOrder) : (r = Math.trunc(r), n = Math.trunc(n), a ? ms.cdf(r, n, i) : ms.pdf(r, n, i)));
  }
  binomialinv(e, t) {
    return this.runFunction(e.args, t, this.metadata("BINOM.INV"), (r, n, i) => {
      r = Math.trunc(r);
      let a = -1, o = r;
      for (; o > a + 1; ) {
        const u = Math.trunc((a + o) / 2);
        ms.cdf(u, r, n) >= i ? o = u : a = u;
      }
      return o;
    });
  }
  besselifn(e, t) {
    return this.runFunction(e.args, t, this.metadata("BESSELI"), (r, n) => oa(r, Math.trunc(n)));
  }
  besseljfn(e, t) {
    return this.runFunction(e.args, t, this.metadata("BESSELJ"), (r, n) => aa(r, Math.trunc(n)));
  }
  besselkfn(e, t) {
    return this.runFunction(e.args, t, this.metadata("BESSELK"), (r, n) => pE(r, Math.trunc(n)));
  }
  besselyfn(e, t) {
    return this.runFunction(e.args, t, this.metadata("BESSELY"), (r, n) => fE(r, Math.trunc(n)));
  }
  chisqdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHISQ.DIST"), (r, n, i) => (n = Math.trunc(n), i ? Dr.cdf(r, n) : Dr.pdf(r, n)));
  }
  chisqdistrt(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHISQ.DIST.RT"), (r, n) => 1 - Dr.cdf(r, Math.trunc(n)));
  }
  chisqinv(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHISQ.INV"), (r, n) => Dr.inv(r, Math.trunc(n)));
  }
  chisqinvrt(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHISQ.INV.RT"), (r, n) => Dr.inv(1 - r, Math.trunc(n)));
  }
  fdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("F.DIST"), (r, n, i, a) => (n = Math.trunc(n), i = Math.trunc(i), a ? Br.cdf(r, n, i) : Br.pdf(r, n, i)));
  }
  fdistrt(e, t) {
    return this.runFunction(e.args, t, this.metadata("F.DIST.RT"), (r, n, i) => 1 - Br.cdf(r, Math.trunc(n), Math.trunc(i)));
  }
  finv(e, t) {
    return this.runFunction(e.args, t, this.metadata("F.INV"), (r, n, i) => Br.inv(r, Math.trunc(n), Math.trunc(i)));
  }
  finvrt(e, t) {
    return this.runFunction(e.args, t, this.metadata("F.INV.RT"), (r, n, i) => Br.inv(1 - r, Math.trunc(n), Math.trunc(i)));
  }
  weibulldist(e, t) {
    return this.runFunction(e.args, t, this.metadata("WEIBULL.DIST"), (r, n, i, a) => a ? Eu.cdf(r, i, n) : Eu.pdf(r, i, n));
  }
  poissondist(e, t) {
    return this.runFunction(e.args, t, this.metadata("POISSON.DIST"), (r, n, i) => (r = Math.trunc(r), i ? ua.cdf(r, n) : ua.pdf(r, n)));
  }
  hypgeomdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("HYPGEOM.DIST"), (r, n, i, a, o) => r > n || r > i || n > a || i > a ? new f(m.NUM, E.ValueLarge) : r + a < i + n ? new f(m.NUM, E.ValueLarge) : (r = Math.trunc(r), n = Math.trunc(n), i = Math.trunc(i), a = Math.trunc(a), o ? Gt.cdf(r, a, i, n) : Gt.pdf(r, a, i, n)));
  }
  tdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("T.DIST"), (r, n, i) => (n = Math.trunc(n), i ? at.cdf(r, n) : at.pdf(r, n)));
  }
  tdist2t(e, t) {
    return this.runFunction(e.args, t, this.metadata("T.DIST.2T"), (r, n) => (1 - at.cdf(r, Math.trunc(n))) * 2);
  }
  tdistrt(e, t) {
    return this.runFunction(e.args, t, this.metadata("T.DIST.RT"), (r, n) => 1 - at.cdf(r, Math.trunc(n)));
  }
  tdistold(e, t) {
    return this.runFunction(e.args, t, this.metadata("TDIST"), (r, n, i) => i * (1 - at.cdf(r, Math.trunc(n))));
  }
  tinv(e, t) {
    return this.runFunction(e.args, t, this.metadata("T.INV"), (r, n) => at.inv(r, Math.trunc(n)));
  }
  tinv2t(e, t) {
    return this.runFunction(e.args, t, this.metadata("T.INV.2T"), (r, n) => at.inv(1 - r / 2, Math.trunc(n)));
  }
  lognormdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("LOGNORM.DIST"), (r, n, i, a) => a ? _i.cdf(r, n, i) : _i.pdf(r, n, i));
  }
  lognorminv(e, t) {
    return this.runFunction(e.args, t, this.metadata("LOGNORM.INV"), (r, n, i) => _i.inv(r, n, i));
  }
  normdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("NORM.DIST"), (r, n, i, a) => a ? pt.cdf(r, n, i) : pt.pdf(r, n, i));
  }
  norminv(e, t) {
    return this.runFunction(e.args, t, this.metadata("NORM.INV"), (r, n, i) => pt.inv(r, n, i));
  }
  normsdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("NORM.S.DIST"), (r, n) => n ? pt.cdf(r, 0, 1) : pt.pdf(r, 0, 1));
  }
  normsinv(e, t) {
    return this.runFunction(e.args, t, this.metadata("NORM.S.INV"), (r) => pt.inv(r, 0, 1));
  }
  phi(e, t) {
    return this.runFunction(e.args, t, this.metadata("PHI"), (r) => pt.pdf(r, 0, 1));
  }
  negbinomdist(e, t) {
    return this.runFunction(e.args, t, this.metadata("NEGBINOM.DIST"), (r, n, i, a) => (r = Math.trunc(r), n = Math.trunc(n), a ? ha.cdf(r, n, i) : ha.pdf(r, n, i)));
  }
  confidencenorm(e, t) {
    return this.runFunction(
      e.args,
      t,
      this.metadata("CONFIDENCE.NORM"),
      // eslint-disable-next-line
      // @ts-ignore
      (r, n, i) => gE(1, r, n, Math.trunc(i))[1] - 1
    );
  }
  confidencet(e, t) {
    return this.runFunction(e.args, t, this.metadata("CONFIDENCE.T"), (r, n, i) => (i = Math.trunc(i), i === 1 ? new f(m.DIV_BY_ZERO) : EE(1, r, n, i)[1] - 1));
  }
  standardize(e, t) {
    return this.runFunction(e.args, t, this.metadata("STANDARDIZE"), (r, n, i) => (r - n) / i);
  }
}
Ya.implementedFunctions = {
  ERF: {
    method: "erf",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0
    }]
  },
  ERFC: {
    method: "erfc",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  "EXPON.DIST": {
    method: "expondist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  FISHER: {
    method: "fisher",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: -1,
      lessThan: 1
    }]
  },
  FISHERINV: {
    method: "fisherinv",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  GAMMA: {
    method: "gamma",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  "GAMMA.DIST": {
    method: "gammadist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  GAMMALN: {
    method: "gammaln",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }]
  },
  "GAMMA.INV": {
    method: "gammainv",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      lessThan: 1
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }]
  },
  GAUSS: {
    method: "gauss",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  "BETA.DIST": {
    method: "betadist",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.BOOLEAN
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  "BETA.INV": {
    method: "betainv",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      maxValue: 1
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 0
    }, {
      argumentType: h.NUMBER,
      defaultValue: 1
    }]
  },
  "BINOM.DIST": {
    method: "binomialdist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "BINOM.INV": {
    method: "binomialinv",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }]
  },
  BESSELI: {
    method: "besselifn",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  BESSELJ: {
    method: "besseljfn",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  BESSELK: {
    method: "besselkfn",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  BESSELY: {
    method: "besselyfn",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  "CHISQ.DIST": {
    method: "chisqdist",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 1,
      maxValue: 1e10
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "CHISQ.DIST.RT": {
    method: "chisqdistrt",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 1,
      maxValue: 1e10
    }]
  },
  "CHISQ.INV": {
    method: "chisqinv",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1,
      maxValue: 1e10
    }]
  },
  "CHISQ.INV.RT": {
    method: "chisqinvrt",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "F.DIST": {
    method: "fdist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "F.DIST.RT": {
    method: "fdistrt",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "F.INV": {
    method: "finv",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "F.INV.RT": {
    method: "finvrt",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "WEIBULL.DIST": {
    method: "weibulldist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "POISSON.DIST": {
    method: "poissondist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "HYPGEOM.DIST": {
    method: "hypgeomdist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "T.DIST": {
    method: "tdist",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "T.DIST.2T": {
    method: "tdist2t",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "T.DIST.RT": {
    method: "tdistrt",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  TDIST: {
    method: "tdistold",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.INTEGER,
      minValue: 1,
      maxValue: 2
    }]
  },
  "T.INV": {
    method: "tinv",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "T.INV.2T": {
    method: "tinv2t",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      maxValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "LOGNORM.DIST": {
    method: "lognormdist",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "LOGNORM.INV": {
    method: "lognorminv",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }]
  },
  "NORM.DIST": {
    method: "normdist",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "NORM.INV": {
    method: "norminv",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }]
  },
  "NORM.S.DIST": {
    method: "normsdist",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "NORM.S.INV": {
    method: "normsinv",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }]
  },
  PHI: {
    method: "phi",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  "NEGBINOM.DIST": {
    method: "negbinomdist",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }, {
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 1
    }, {
      argumentType: h.BOOLEAN
    }]
  },
  "CONFIDENCE.NORM": {
    method: "confidencenorm",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  "CONFIDENCE.T": {
    method: "confidencet",
    parameters: [{
      argumentType: h.NUMBER,
      greaterThan: 0,
      lessThan: 1
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 1
    }]
  },
  STANDARDIZE: {
    method: "standardize",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      greaterThan: 0
    }]
  }
};
Ya.aliases = {
  NEGBINOMDIST: "NEGBINOM.DIST",
  EXPONDIST: "EXPON.DIST",
  BETADIST: "BETA.DIST",
  NORMDIST: "NORM.DIST",
  NORMINV: "NORM.INV",
  NORMSDIST: "NORM.S.DIST",
  NORMSINV: "NORM.S.INV",
  LOGNORMDIST: "LOGNORM.DIST",
  LOGINV: "LOGNORM.INV",
  TINV: "T.INV.2T",
  HYPGEOMDIST: "HYPGEOM.DIST",
  POISSON: "POISSON.DIST",
  WEIBULL: "WEIBULL.DIST",
  FINV: "F.INV.RT",
  FDIST: "F.DIST.RT",
  CHIDIST: "CHISQ.DIST.RT",
  CHIINV: "CHISQ.INV.RT",
  GAMMADIST: "GAMMA.DIST",
  "GAMMALN.PRECISE": "GAMMALN",
  GAMMAINV: "GAMMA.INV",
  BETAINV: "BETA.INV",
  BINOMDIST: "BINOM.DIST",
  CONFIDENCE: "CONFIDENCE.NORM",
  CRITBINOM: "BINOM.INV",
  WEIBULLDIST: "WEIBULL.DIST",
  TINV2T: "T.INV.2T",
  TDISTRT: "T.DIST.RT",
  TDIST2T: "T.DIST.2T",
  FINVRT: "F.INV.RT",
  FDISTRT: "F.DIST.RT",
  CHIDISTRT: "CHISQ.DIST.RT",
  CHIINVRT: "CHISQ.INV.RT",
  LOGNORMINV: "LOGNORM.INV",
  POISSONDIST: "POISSON.DIST"
};
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Nc extends V {
  fact(e, t) {
    return this.runFunction(e.args, t, this.metadata("FACT"), (r) => {
      r = Math.trunc(r);
      let n = 1;
      for (let i = 1; i <= r; i++)
        n *= i;
      return n;
    });
  }
  factdouble(e, t) {
    return this.runFunction(e.args, t, this.metadata("FACTDOUBLE"), (r) => {
      r = Math.trunc(r);
      let n = 1;
      for (let i = r; i >= 1; i -= 2)
        n *= i;
      return n;
    });
  }
  combin(e, t) {
    return this.runFunction(e.args, t, this.metadata("COMBIN"), (r, n) => n > r ? new f(m.NUM, E.WrongOrder) : (r = Math.trunc(r), n = Math.trunc(n), Nu(r, n)));
  }
  combina(e, t) {
    return this.runFunction(e.args, t, this.metadata("COMBINA"), (r, n) => (r = Math.trunc(r), n = Math.trunc(n), r + n - 1 >= 1030 ? new f(m.NUM, E.ValueLarge) : r === 0 && n === 0 ? 1 : Nu(r + n - 1, n)));
  }
  gcd(e, t) {
    return this.runFunction(e.args, t, this.metadata("GCD"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersCoerceRangesDropNulls(r);
      if (n instanceof f)
        return n;
      let i = 0;
      for (const a of n) {
        if (a < 0)
          return new f(m.NUM, E.ValueSmall);
        i = Tc(i, Math.trunc(a));
      }
      return i > Number.MAX_SAFE_INTEGER ? new f(m.NUM, E.ValueLarge) : i;
    });
  }
  lcm(e, t) {
    return this.runFunction(e.args, t, this.metadata("LCM"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersCoerceRangesDropNulls(r);
      if (n instanceof f)
        return n;
      let i = 1;
      for (const a of n) {
        if (a < 0)
          return new f(m.NUM, E.ValueSmall);
        i = TE(i, Math.trunc(a));
      }
      return i > Number.MAX_SAFE_INTEGER ? new f(m.NUM, E.ValueLarge) : i;
    });
  }
  mround(e, t) {
    return this.runFunction(e.args, t, this.metadata("MROUND"), (r, n) => n === 0 ? 0 : r > 0 && n < 0 || r < 0 && n > 0 ? new f(m.NUM, E.DistinctSigns) : Math.round(r / n) * n);
  }
  multinomial(e, t) {
    return this.runFunction(e.args, t, this.metadata("MULTINOMIAL"), (...r) => {
      let n = 0, i = 1;
      for (let a of r) {
        if (a < 0)
          return new f(m.NUM, E.ValueSmall);
        a = Math.trunc(a);
        for (let o = 1; o <= a; o++)
          i *= (n + o) / o;
        n += a;
      }
      return Math.round(i);
    });
  }
  quotient(e, t) {
    return this.runFunction(e.args, t, this.metadata("QUOTIENT"), (r, n) => n === 0 ? new f(m.DIV_BY_ZERO) : Math.trunc(r / n));
  }
  seriessum(e, t) {
    return this.runFunction(e.args, t, this.metadata("SERIESSUM"), (r, n, i, a) => {
      const o = this.arithmeticHelper.manyToOnlyNumbersDropNulls(a.valuesFromTopLeftCorner());
      if (o instanceof f)
        return o;
      let u = 0;
      o.reverse();
      for (const l of o)
        u *= Math.pow(r, i), u += l;
      return u * Math.pow(r, n);
    });
  }
  sign(e, t) {
    return this.runFunction(e.args, t, this.metadata("SIGN"), (r) => r > 0 ? 1 : r < 0 ? -1 : 0);
  }
  sumx2my2(e, t) {
    return this.runFunction(e.args, t, this.metadata("SUMX2MY2"), (r, n) => {
      const i = r.valuesFromTopLeftCorner(), a = n.valuesFromTopLeftCorner();
      if (i.length !== a.length)
        return new f(m.NA, E.EqualLength);
      const o = i.length;
      let u = 0;
      for (let l = 0; l < o; l++) {
        const c = i[l], d = a[l];
        if (c instanceof f)
          return c;
        if (d instanceof f)
          return d;
        typeof c == "number" && typeof d == "number" && (u += Math.pow(c, 2) - Math.pow(d, 2));
      }
      return u;
    });
  }
  sumx2py2(e, t) {
    return this.runFunction(e.args, t, this.metadata("SUMX2PY2"), (r, n) => {
      const i = r.valuesFromTopLeftCorner(), a = n.valuesFromTopLeftCorner();
      if (i.length !== a.length)
        return new f(m.NA, E.EqualLength);
      const o = i.length;
      let u = 0;
      for (let l = 0; l < o; l++) {
        const c = i[l], d = a[l];
        if (c instanceof f)
          return c;
        if (d instanceof f)
          return d;
        typeof c == "number" && typeof d == "number" && (u += Math.pow(c, 2) + Math.pow(d, 2));
      }
      return u;
    });
  }
  sumxmy2(e, t) {
    return this.runFunction(e.args, t, this.metadata("SUMXMY2"), (r, n) => {
      const i = r.valuesFromTopLeftCorner(), a = n.valuesFromTopLeftCorner();
      if (i.length !== a.length)
        return new f(m.NA, E.EqualLength);
      const o = i.length;
      let u = 0;
      for (let l = 0; l < o; l++) {
        const c = i[l], d = a[l];
        if (c instanceof f)
          return c;
        if (d instanceof f)
          return d;
        typeof c == "number" && typeof d == "number" && (u += Math.pow(c - d, 2));
      }
      return u;
    });
  }
}
Nc.implementedFunctions = {
  FACT: {
    method: "fact",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 170
    }]
  },
  FACTDOUBLE: {
    method: "factdouble",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      maxValue: 288
    }]
  },
  COMBIN: {
    method: "combin",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0,
      lessThan: 1030
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  COMBINA: {
    method: "combina",
    parameters: [{
      argumentType: h.NUMBER,
      minValue: 0
    }, {
      argumentType: h.NUMBER,
      minValue: 0
    }]
  },
  GCD: {
    method: "gcd",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  LCM: {
    method: "lcm",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  MROUND: {
    method: "mround",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  },
  MULTINOMIAL: {
    method: "multinomial",
    parameters: [{
      argumentType: h.NUMBER
    }],
    repeatLastArgs: 1,
    expandRanges: !0
  },
  QUOTIENT: {
    method: "quotient",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }]
  },
  SERIESSUM: {
    method: "seriessum",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.RANGE
    }]
  },
  SIGN: {
    method: "sign",
    parameters: [{
      argumentType: h.NUMBER
    }]
  },
  SUMX2MY2: {
    method: "sumx2my2",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  SUMX2PY2: {
    method: "sumx2py2",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  SUMXMY2: {
    method: "sumxmy2",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  }
};
function Nu(s, e) {
  2 * e > s && (e = s - e);
  let t = 1;
  for (let r = 1; r <= e; r++)
    t *= (s - e + r) / r;
  return Math.round(t);
}
function Tc(s, e) {
  for (s < e && ([s, e] = [e, s]); e > 0; )
    [s, e] = [e, s % e];
  return s;
}
function TE(s, e) {
  return s === 0 || e === 0 ? 0 : s * (e / Tc(s, e));
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class Sc extends V {
  complex(e, t) {
    return this.runFunction(e.args, t, this.metadata("COMPLEX"), (r, n, i) => i !== "i" && i !== "j" ? new f(m.VALUE, E.ShouldBeIorJ) : ie([r, n], i));
  }
  imabs(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMABS"), vc);
  }
  imaginary(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMAGINARY"), ([r, n]) => n);
  }
  imreal(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMREAL"), ([r, n]) => r);
  }
  imargument(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMARGUMENT"), ([r, n]) => r === 0 && n === 0 ? new f(m.DIV_BY_ZERO) : Math.atan2(n, r));
  }
  imconjugate(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMCONJUGATE"), ([r, n]) => ie([r, -n]));
  }
  imcos(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMCOS"), (r) => ie(ss(r)));
  }
  imcosh(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMCOSH"), (r) => ie(Tu(r)));
  }
  imcot(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMCOT"), (r) => ie(gr(ss(r), is(r))));
  }
  imcsc(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMCSC"), (r) => ie(gr([1, 0], is(r))));
  }
  imcsch(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMCSCH"), (r) => ie(gr([1, 0], Su(r))));
  }
  imsec(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMSEC"), (r) => ie(gr([1, 0], ss(r))));
  }
  imsech(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMSECH"), (r) => ie(gr([1, 0], Tu(r))));
  }
  imsin(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMSIN"), (r) => ie(is(r)));
  }
  imsinh(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMSINH"), (r) => ie(Su(r)));
  }
  imtan(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMTAN"), (r) => ie(gr(is(r), ss(r))));
  }
  imdiv(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMDIV"), (r, n) => ie(gr(r, n)));
  }
  improduct(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMPRODUCT"), (...r) => {
      const n = this.arithmeticHelper.coerceComplexExactRanges(r);
      if (n instanceof f)
        return n;
      let i = [1, 0];
      for (const a of n)
        i = Ac(i, a);
      return ie(i);
    });
  }
  imsum(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMSUM"), (...r) => {
      const n = this.arithmeticHelper.coerceComplexExactRanges(r);
      if (n instanceof f)
        return n;
      let i = [0, 0];
      for (const a of n)
        i = SE(i, a);
      return ie(i);
    });
  }
  imsub(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMSUB"), (r, n) => ie(AE(r, n)));
  }
  imexp(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMEXP"), (r) => ie(yc(r)));
  }
  imln(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMLN"), (r) => ie(Es(r)));
  }
  imlog10(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMLOG10"), (r) => {
      const [n, i] = Es(r), a = Math.log(10);
      return ie([n / a, i / a]);
    });
  }
  imlog2(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMLOG2"), (r) => {
      const [n, i] = Es(r), a = Math.log(2);
      return ie([n / a, i / a]);
    });
  }
  impower(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMPOWER"), (r, n) => ie(Au(r, n)));
  }
  imsqrt(e, t) {
    return this.runFunction(e.args, t, this.metadata("IMSQRT"), (r) => ie(Au(r, 0.5)));
  }
}
Sc.implementedFunctions = {
  COMPLEX: {
    method: "complex",
    parameters: [{
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.STRING,
      defaultValue: "i"
    }]
  },
  IMABS: {
    method: "imabs",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMAGINARY: {
    method: "imaginary",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMREAL: {
    method: "imreal",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMARGUMENT: {
    method: "imargument",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMCONJUGATE: {
    method: "imconjugate",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMCOS: {
    method: "imcos",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMCOSH: {
    method: "imcosh",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMCOT: {
    method: "imcot",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMCSC: {
    method: "imcsc",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMCSCH: {
    method: "imcsch",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMSEC: {
    method: "imsec",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMSECH: {
    method: "imsech",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMSIN: {
    method: "imsin",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMSINH: {
    method: "imsinh",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMTAN: {
    method: "imtan",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMDIV: {
    method: "imdiv",
    parameters: [{
      argumentType: h.COMPLEX
    }, {
      argumentType: h.COMPLEX
    }]
  },
  IMPRODUCT: {
    method: "improduct",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  IMSUM: {
    method: "imsum",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  IMSUB: {
    method: "imsub",
    parameters: [{
      argumentType: h.COMPLEX
    }, {
      argumentType: h.COMPLEX
    }]
  },
  IMEXP: {
    method: "imexp",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMLN: {
    method: "imln",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMLOG10: {
    method: "imlog10",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMLOG2: {
    method: "imlog2",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  },
  IMPOWER: {
    method: "impower",
    parameters: [{
      argumentType: h.COMPLEX
    }, {
      argumentType: h.NUMBER
    }]
  },
  IMSQRT: {
    method: "imsqrt",
    parameters: [{
      argumentType: h.COMPLEX
    }]
  }
};
function SE([s, e], [t, r]) {
  return [s + t, e + r];
}
function AE([s, e], [t, r]) {
  return [s - t, e - r];
}
function Ac([s, e], [t, r]) {
  return [s * t - e * r, s * r + t * e];
}
function gr([s, e], [t, r]) {
  const n = Math.pow(t, 2) + Math.pow(r, 2), [i, a] = Ac([s, e], [t, -r]);
  return [i / n, a / n];
}
function ss([s, e]) {
  return [Math.cos(s) * Math.cosh(e), -Math.sin(s) * Math.sinh(e)];
}
function Tu([s, e]) {
  return [Math.cosh(s) * Math.cos(e), Math.sinh(s) * Math.sin(e)];
}
function is([s, e]) {
  return [Math.sin(s) * Math.cosh(e), Math.cos(s) * Math.sinh(e)];
}
function Su([s, e]) {
  return [Math.sinh(s) * Math.cos(e), Math.cosh(s) * Math.sin(e)];
}
function yc([s, e]) {
  return [Math.exp(s) * Math.cos(e), Math.exp(s) * Math.sin(e)];
}
function vc([s, e]) {
  return Math.sqrt(s * s + e * e);
}
function Es([s, e]) {
  return [Math.log(vc([s, e])), Math.atan2(e, s)];
}
function Au(s, e) {
  const [t, r] = Es(s);
  return yc([e * t, e * r]);
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class za extends V {
  avedev(e, t) {
    return this.runFunction(e.args, t, this.metadata("AVEDEV"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersExactRanges(r);
      if (n instanceof f)
        return n;
      if (n.length === 0)
        return new f(m.DIV_BY_ZERO);
      const i = it(n);
      return n.reduce((a, o) => a + Math.abs(o - i), 0) / n.length;
    });
  }
  devsq(e, t) {
    return this.runFunction(e.args, t, this.metadata("DEVSQ"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersExactRanges(r);
      return n instanceof f ? n : n.length === 0 ? 0 : Rr(n);
    });
  }
  geomean(e, t) {
    return this.runFunction(e.args, t, this.metadata("GEOMEAN"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersExactRanges(r);
      if (n instanceof f)
        return n;
      if (n.length === 0)
        return new f(m.NUM, E.OneValue);
      for (const i of n)
        if (i <= 0)
          return new f(m.NUM, E.ValueSmall);
      return NE(n);
    });
  }
  harmean(e, t) {
    return this.runFunction(e.args, t, this.metadata("HARMEAN"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersExactRanges(r);
      if (n instanceof f)
        return n;
      if (n.length === 0)
        return new f(m.NUM, E.OneValue);
      for (const i of n)
        if (i <= 0)
          return new f(m.NUM, E.ValueSmall);
      return n.length / n.reduce((i, a) => i + 1 / a, 0);
    });
  }
  correl(e, t) {
    return this.runFunction(e.args, t, this.metadata("CORREL"), (r, n) => {
      if (r.numberOfElements() !== n.numberOfElements())
        return new f(m.NA, E.EqualLength);
      const i = Er(r, n);
      return i instanceof f ? i : i[0].length <= 1 ? new f(m.DIV_BY_ZERO, E.TwoValues) : Ru(i[0], i[1]);
    });
  }
  rsq(e, t) {
    return this.runFunction(e.args, t, this.metadata("RSQ"), (r, n) => {
      if (r.numberOfElements() !== n.numberOfElements())
        return new f(m.NA, E.EqualLength);
      const i = Er(r, n);
      return i instanceof f ? i : i[0].length <= 1 ? new f(m.DIV_BY_ZERO, E.TwoValues) : Math.pow(Ru(i[0], i[1]), 2);
    });
  }
  covariancep(e, t) {
    return this.runFunction(e.args, t, this.metadata("COVARIANCE.P"), (r, n) => {
      if (r.numberOfElements() !== n.numberOfElements())
        return new f(m.NA, E.EqualLength);
      const i = Er(r, n);
      if (i instanceof f)
        return i;
      const a = i[0].length;
      return a < 1 ? new f(m.DIV_BY_ZERO, E.OneValue) : a === 1 ? 0 : ln(i[0], i[1]) * (a - 1) / a;
    });
  }
  covariances(e, t) {
    return this.runFunction(e.args, t, this.metadata("COVARIANCE.S"), (r, n) => {
      if (r.numberOfElements() !== n.numberOfElements())
        return new f(m.NA, E.EqualLength);
      const i = Er(r, n);
      return i instanceof f ? i : i[0].length <= 1 ? new f(m.DIV_BY_ZERO, E.TwoValues) : ln(i[0], i[1]);
    });
  }
  ztest(e, t) {
    return this.runFunction(e.args, t, this.metadata("Z.TEST"), (r, n, i) => {
      const a = this.arithmeticHelper.manyToExactNumbers(r.valuesFromTopLeftCorner());
      if (a instanceof f)
        return a;
      const o = a.length;
      if (i === void 0) {
        if (o < 2)
          return new f(m.DIV_BY_ZERO, E.TwoValues);
        i = rr(a, !0);
      }
      return o < 1 ? new f(m.NA, E.OneValue) : i === 0 ? new f(m.DIV_BY_ZERO) : 1 - pt.cdf((it(a) - n) / (i / Math.sqrt(o)), 0, 1);
    });
  }
  ftest(e, t) {
    return this.runFunction(e.args, t, this.metadata("F.TEST"), (r, n) => {
      const i = this.arithmeticHelper.manyToExactNumbers(r.valuesFromTopLeftCorner()), a = this.arithmeticHelper.manyToExactNumbers(n.valuesFromTopLeftCorner());
      if (i instanceof f)
        return i;
      if (a instanceof f)
        return a;
      if (i.length <= 1 || a.length <= 1)
        return new f(m.DIV_BY_ZERO);
      const o = hn(i, !0), u = hn(a, !0);
      if (o === 0 || u === 0)
        return new f(m.DIV_BY_ZERO);
      const l = o / u, c = Br.cdf(l, i.length - 1, a.length - 1);
      return 2 * Math.min(c, 1 - c);
    });
  }
  steyx(e, t) {
    return this.runFunction(e.args, t, this.metadata("STEYX"), (r, n) => {
      if (r.numberOfElements() !== n.numberOfElements())
        return new f(m.NA, E.EqualLength);
      const i = Er(r, n);
      if (i instanceof f)
        return i;
      const a = i[0].length;
      return a <= 2 ? new f(m.DIV_BY_ZERO, E.ThreeValues) : Math.sqrt((Rr(i[0]) - Math.pow(ln(i[0], i[1]) * (a - 1), 2) / Rr(i[1])) / (a - 2));
    });
  }
  slope(e, t) {
    return this.runFunction(e.args, t, this.metadata("SLOPE"), (r, n) => {
      if (r.numberOfElements() !== n.numberOfElements())
        return new f(m.NA, E.EqualLength);
      const i = Er(r, n);
      if (i instanceof f)
        return i;
      const a = i[0].length;
      return a <= 1 ? new f(m.DIV_BY_ZERO, E.TwoValues) : ln(i[0], i[1]) * (a - 1) / Rr(i[1]);
    });
  }
  chisqtest(e, t) {
    return this.runFunction(e.args, t, this.metadata("CHISQ.TEST"), (r, n) => {
      const i = r.height(), a = r.width();
      if (n.height() !== i || n.width() !== a)
        return new f(m.NA, E.EqualLength);
      const o = Er(r, n);
      if (o instanceof f)
        return o;
      if (o[0].length <= 1)
        return new f(m.DIV_BY_ZERO, E.TwoValues);
      let u = 0;
      for (let l = 0; l < o[0].length; l++) {
        if (o[1][l] === 0)
          return new f(m.DIV_BY_ZERO);
        u += Math.pow(o[0][l] - o[1][l], 2) / o[1][l];
      }
      return u < 0 ? new f(m.NUM, E.NaN) : 1 - Dr.cdf(u, i > 1 && a > 1 ? (i - 1) * (a - 1) : i * a - 1);
    });
  }
  ttest(e, t) {
    return this.runFunction(e.args, t, this.metadata("T.TEST"), (r, n, i, a) => {
      const o = this.arithmeticHelper.manyToExactNumbers(r.valuesFromTopLeftCorner()), u = this.arithmeticHelper.manyToExactNumbers(n.valuesFromTopLeftCorner());
      if (o instanceof f)
        return o;
      if (u instanceof f)
        return u;
      const l = o.length, c = u.length;
      if (a === 1) {
        if (c !== l)
          return new f(m.NA, E.EqualLength);
        if (l <= 1)
          return new f(m.DIV_BY_ZERO, E.TwoValues);
        const d = Array(l);
        for (let T = 0; T < l; T++)
          d[T] = o[T] - u[T];
        const p = rr(d, !0);
        if (p === 0)
          return new f(m.DIV_BY_ZERO);
        const N = Math.abs(Math.sqrt(l) * it(d) / p);
        return i * (1 - at.cdf(N, l - 1));
      } else if (a === 2) {
        if (l <= 1 || c <= 1)
          return new f(m.DIV_BY_ZERO, E.TwoValues);
        const d = (Rr(o) + Rr(u)) / (l + c - 2);
        if (d === 0)
          return new f(m.DIV_BY_ZERO);
        const p = Math.abs((it(o) - it(u)) / Math.sqrt(d * (1 / l + 1 / c)));
        return i * (1 - at.cdf(p, l + c - 2));
      } else {
        if (l <= 1 || c <= 1)
          return new f(m.DIV_BY_ZERO, E.TwoValues);
        const d = hn(o, !0), p = hn(u, !0);
        if (d === 0 && p === 0)
          return new f(m.DIV_BY_ZERO);
        const N = Math.abs((it(o) - it(u)) / Math.sqrt(d / l + p / c)), T = Math.pow(d / l + p / c, 2) / (Math.pow(d / l, 2) / (l - 1) + Math.pow(p / c, 2) / (c - 1));
        return i * (1 - at.cdf(N, T));
      }
    });
  }
  skew(e, t) {
    return this.runFunction(e.args, t, this.metadata("SKEW"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersExactRanges(r);
      if (n instanceof f)
        return n;
      const i = n.length;
      if (i < 3)
        return new f(m.DIV_BY_ZERO, E.ThreeValues);
      const a = it(n), o = rr(n, !0);
      return o === 0 ? new f(m.DIV_BY_ZERO) : n.reduce((u, l) => u + Math.pow((l - a) / o, 3), 0) * i / (i - 1) / (i - 2);
    });
  }
  skewp(e, t) {
    return this.runFunction(e.args, t, this.metadata("SKEW.P"), (...r) => {
      const n = this.arithmeticHelper.coerceNumbersExactRanges(r);
      if (n instanceof f)
        return n;
      const i = n.length;
      if (i < 3)
        return new f(m.DIV_BY_ZERO, E.ThreeValues);
      const a = it(n), o = rr(n, !1);
      return o === 0 ? new f(m.DIV_BY_ZERO) : n.reduce((u, l) => u + Math.pow((l - a) / o, 3), 0) / i;
    });
  }
}
za.implementedFunctions = {
  AVEDEV: {
    method: "avedev",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  DEVSQ: {
    method: "devsq",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  GEOMEAN: {
    method: "geomean",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  HARMEAN: {
    method: "harmean",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  CORREL: {
    method: "correl",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  RSQ: {
    method: "rsq",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  "COVARIANCE.P": {
    method: "covariancep",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  "COVARIANCE.S": {
    method: "covariances",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  "Z.TEST": {
    method: "ztest",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.NUMBER
    }, {
      argumentType: h.NUMBER,
      optionalArg: !0
    }]
  },
  "F.TEST": {
    method: "ftest",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  STEYX: {
    method: "steyx",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  SLOPE: {
    method: "slope",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  "CHISQ.TEST": {
    method: "chisqtest",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }]
  },
  "T.TEST": {
    method: "ttest",
    parameters: [{
      argumentType: h.RANGE
    }, {
      argumentType: h.RANGE
    }, {
      argumentType: h.INTEGER,
      minValue: 1,
      maxValue: 2
    }, {
      argumentType: h.INTEGER,
      minValue: 1,
      maxValue: 3
    }]
  },
  SKEW: {
    method: "skew",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  },
  "SKEW.P": {
    method: "skewp",
    parameters: [{
      argumentType: h.ANY
    }],
    repeatLastArgs: 1
  }
};
za.aliases = {
  COVAR: "COVARIANCE.P",
  FTEST: "F.TEST",
  PEARSON: "CORREL",
  ZTEST: "Z.TEST",
  CHITEST: "CHISQ.TEST",
  TTEST: "T.TEST",
  COVARIANCEP: "COVARIANCE.P",
  COVARIANCES: "COVARIANCE.S",
  SKEWP: "SKEW.P"
};
function Er(s, e) {
  const t = s.iterateValuesFromTopLeftCorner(), r = e.iterateValuesFromTopLeftCorner();
  let n, i;
  const a = [], o = [];
  for (; n = t.next(), i = r.next(), !n.done && !i.done; ) {
    const u = n.value, l = i.value;
    if (u instanceof f)
      return u;
    if (l instanceof f)
      return l;
    D(u) && D(l) && (a.push(I(u)), o.push(I(l)));
  }
  return [a, o];
}
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
const yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbsPlugin: yl,
  AddressPlugin: Sl,
  ArrayPlugin: Al,
  BitShiftPlugin: vl,
  BitwiseLogicOperationsPlugin: Ml,
  BooleanPlugin: wl,
  CharPlugin: _l,
  CodePlugin: Ll,
  ComplexPlugin: Sc,
  ConditionalAggregationPlugin: sc,
  CountBlankPlugin: Fl,
  CountUniquePlugin: Ul,
  DatabasePlugin: xl,
  DateTimePlugin: bl,
  DegreesPlugin: Pl,
  DeltaPlugin: Vl,
  ExpPlugin: Dl,
  FinancialPlugin: Bl,
  FormulaTextPlugin: kl,
  HyperlinkPlugin: Gl,
  InformationPlugin: Hl,
  IsEvenPlugin: Wl,
  IsOddPlugin: Yl,
  LogarithmPlugin: zl,
  LookupPlugin: uc,
  MathConstantsPlugin: Xl,
  MathPlugin: Nc,
  MatrixPlugin: $l,
  MedianPlugin: Kl,
  ModuloPlugin: jl,
  NumericAggregationPlugin: Ba,
  PercentilePlugin: Da,
  PowerPlugin: ql,
  RadiansPlugin: Ql,
  RadixConversionPlugin: Jl,
  RandomPlugin: rc,
  RomanPlugin: hc,
  RoundingPlugin: ka,
  SequencePlugin: mt,
  SimpleArithmerticPlugin: lc,
  SqrtPlugin: nc,
  StatisticalAggregationPlugin: za,
  StatisticalPlugin: Ya,
  SumprodPlugin: ic,
  TextPlugin: ac,
  TrigonometryPlugin: oc
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright (c) 2025 Handsoncode. All rights reserved.
 */
class G extends Me {
}
G.HyperFormula = Me;
G.ErrorType = m;
G.CellError = f;
G.CellType = Ve;
G.CellValueType = Rt;
G.CellValueDetailedType = nm;
G.DetailedCellError = il;
G.ExportedCellChange = ta;
G.ExportedNamedExpressionChange = gl;
G.ConfigValueTooBigError = zh;
G.ConfigValueTooSmallError = Yh;
G.EvaluationSuspendedError = $h;
G.ExpectedOneOfValuesError = Xh;
G.ExpectedValueOfTypeError = Y;
G.ArraySize = b;
G.SimpleRangeValue = M;
G.EmptyValue = B;
G.FunctionPlugin = V;
G.FunctionArgumentType = h;
G.FunctionPluginValidationError = Qr;
G.InvalidAddressError = Vh;
G.InvalidArgumentsError = fe;
G.LanguageNotRegisteredError = Yi;
G.LanguageAlreadyRegisteredError = jh;
G.MissingTranslationError = Vr;
G.NamedExpressionDoesNotExistError = Cn;
G.NamedExpressionNameIsAlreadyTakenError = Dh;
G.NamedExpressionNameIsInvalidError = Bh;
G.NoOperationToRedoError = Gh;
G.NoOperationToUndoError = kh;
G.NoRelativeAddressesAllowedError = Ua;
G.NoSheetWithIdError = _e;
G.NoSheetWithNameError = Ph;
G.NotAFormulaError = fs;
G.NothingToPasteError = Hh;
G.ProtectedFunctionTranslationError = Kh;
G.SheetNameAlreadyTakenError = Jt;
G.SheetSizeLimitExceededError = yr;
G.SourceLocationHasArrayError = Hr;
G.TargetLocationHasArrayError = xs;
G.UnableToParseError = Wh;
const yE = Qe.defaultConfig.language;
Me.registerLanguage(yE, ra);
Me.languages[ra.langCode] = ra;
for (const s of Object.getOwnPropertyNames(yu))
  s.startsWith("_") || Me.registerFunctionPlugin(yu[s]);
export {
  bm as AlwaysDense,
  b as ArraySize,
  f as CellError,
  Ve as CellType,
  nm as CellValueDetailedType,
  Rt as CellValueType,
  zh as ConfigValueTooBigError,
  Yh as ConfigValueTooSmallError,
  il as DetailedCellError,
  B as EmptyValue,
  m as ErrorType,
  $h as EvaluationSuspendedError,
  Xh as ExpectedOneOfValuesError,
  Y as ExpectedValueOfTypeError,
  ta as ExportedCellChange,
  gl as ExportedNamedExpressionChange,
  h as FunctionArgumentType,
  V as FunctionPlugin,
  Qr as FunctionPluginValidationError,
  Me as HyperFormula,
  Vh as InvalidAddressError,
  fe as InvalidArgumentsError,
  jh as LanguageAlreadyRegisteredError,
  Yi as LanguageNotRegisteredError,
  Vr as MissingTranslationError,
  Cn as NamedExpressionDoesNotExistError,
  Dh as NamedExpressionNameIsAlreadyTakenError,
  Bh as NamedExpressionNameIsInvalidError,
  Gh as NoOperationToRedoError,
  kh as NoOperationToUndoError,
  Ua as NoRelativeAddressesAllowedError,
  _e as NoSheetWithIdError,
  Ph as NoSheetWithNameError,
  fs as NotAFormulaError,
  Hh as NothingToPasteError,
  Kh as ProtectedFunctionTranslationError,
  Jt as SheetNameAlreadyTakenError,
  yr as SheetSizeLimitExceededError,
  M as SimpleRangeValue,
  Hr as SourceLocationHasArrayError,
  xs as TargetLocationHasArrayError,
  Wh as UnableToParseError,
  G as default
};
