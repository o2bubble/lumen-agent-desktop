var la = Object.defineProperty, aa = Object.defineProperties;
var ca = Object.getOwnPropertyDescriptors;
var qt = Object.getOwnPropertySymbols;
var gs = Object.prototype.hasOwnProperty, ms = Object.prototype.propertyIsEnumerable;
var zn = (o, e, t) => e in o ? la(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, R = (o, e) => {
  for (var t in e || (e = {}))
    gs.call(e, t) && zn(o, t, e[t]);
  if (qt)
    for (var t of qt(e))
      ms.call(e, t) && zn(o, t, e[t]);
  return o;
}, z = (o, e) => aa(o, ca(e));
var bs = (o, e) => {
  var t = {};
  for (var n in o)
    gs.call(o, n) && e.indexOf(n) < 0 && (t[n] = o[n]);
  if (o != null && qt)
    for (var n of qt(o))
      e.indexOf(n) < 0 && ms.call(o, n) && (t[n] = o[n]);
  return t;
};
var C = (o, e, t) => zn(o, typeof e != "symbol" ? e + "" : e, t);
var te = Uint8Array, be = Uint16Array, Jo = Int32Array, Mn = new te([
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
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), In = new te([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), No = new te([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), zr = function(o, e) {
  for (var t = new be(31), n = 0; n < 31; ++n)
    t[n] = e += 1 << o[n - 1];
  for (var s = new Jo(t[30]), n = 1; n < 30; ++n)
    for (var i = t[n]; i < t[n + 1]; ++i)
      s[i] = i - t[n] << 5 | n;
  return { b: t, r: s };
}, Br = zr(Mn, 2), Wr = Br.b, Po = Br.r;
Wr[28] = 258, Po[258] = 28;
var Ur = zr(In, 0), da = Ur.b, ys = Ur.r, Oo = new be(32768);
for (var J = 0; J < 32768; ++J) {
  var De = (J & 43690) >> 1 | (J & 21845) << 1;
  De = (De & 52428) >> 2 | (De & 13107) << 2, De = (De & 61680) >> 4 | (De & 3855) << 4, Oo[J] = ((De & 65280) >> 8 | (De & 255) << 8) >> 1;
}
var Me = (function(o, e, t) {
  for (var n = o.length, s = 0, i = new be(e); s < n; ++s)
    o[s] && ++i[o[s] - 1];
  var r = new be(e);
  for (s = 1; s < e; ++s)
    r[s] = r[s - 1] + i[s - 1] << 1;
  var l;
  if (t) {
    l = new be(1 << e);
    var a = 15 - e;
    for (s = 0; s < n; ++s)
      if (o[s])
        for (var c = s << 4 | o[s], d = e - o[s], h = r[o[s] - 1]++ << d, f = h | (1 << d) - 1; h <= f; ++h)
          l[Oo[h] >> a] = c;
  } else
    for (l = new be(n), s = 0; s < n; ++s)
      o[s] && (l[s] = Oo[r[o[s] - 1]++] >> 15 - o[s]);
  return l;
}), Ve = new te(288);
for (var J = 0; J < 144; ++J)
  Ve[J] = 8;
for (var J = 144; J < 256; ++J)
  Ve[J] = 9;
for (var J = 256; J < 280; ++J)
  Ve[J] = 7;
for (var J = 280; J < 288; ++J)
  Ve[J] = 8;
var Nt = new te(32);
for (var J = 0; J < 32; ++J)
  Nt[J] = 5;
var ha = /* @__PURE__ */ Me(Ve, 9, 0), fa = /* @__PURE__ */ Me(Ve, 9, 1), ua = /* @__PURE__ */ Me(Nt, 5, 0), pa = /* @__PURE__ */ Me(Nt, 5, 1), Bn = function(o) {
  for (var e = o[0], t = 1; t < o.length; ++t)
    o[t] > e && (e = o[t]);
  return e;
}, we = function(o, e, t) {
  var n = e / 8 | 0;
  return (o[n] | o[n + 1] << 8) >> (e & 7) & t;
}, Wn = function(o, e) {
  var t = e / 8 | 0;
  return (o[t] | o[t + 1] << 8 | o[t + 2] << 16) >> (e & 7);
}, Zo = function(o) {
  return (o + 7) / 8 | 0;
}, Dt = function(o, e, t) {
  return (e == null || e < 0) && (e = 0), (t == null || t > o.length) && (t = o.length), new te(o.subarray(e, t));
}, ga = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], ce = function(o, e, t) {
  var n = new Error(e || ga[o]);
  if (n.code = o, Error.captureStackTrace && Error.captureStackTrace(n, ce), !t)
    throw n;
  return n;
}, ma = function(o, e, t, n) {
  var s = o.length, i = n ? n.length : 0;
  if (!s || e.f && !e.l)
    return t || new te(0);
  var r = !t, l = r || e.i != 2, a = e.i;
  r && (t = new te(s * 3));
  var c = function(Ae) {
    var gt = t.length;
    if (Ae > gt) {
      var Ze = new te(Math.max(gt * 2, Ae));
      Ze.set(t), t = Ze;
    }
  }, d = e.f || 0, h = e.p || 0, f = e.b || 0, u = e.l, p = e.d, g = e.m, b = e.n, m = s * 8;
  do {
    if (!u) {
      d = we(o, h, 1);
      var y = we(o, h + 1, 3);
      if (h += 3, y)
        if (y == 1)
          u = fa, p = pa, g = 9, b = 5;
        else if (y == 2) {
          var S = we(o, h, 31) + 257, k = we(o, h + 10, 15) + 4, M = S + we(o, h + 5, 31) + 1;
          h += 14;
          for (var E = new te(M), $ = new te(19), T = 0; T < k; ++T)
            $[No[T]] = we(o, h + T * 3, 7);
          h += k * 3;
          for (var I = Bn($), A = (1 << I) - 1, L = Me($, I, 1), T = 0; T < M; ) {
            var N = L[we(o, h, A)];
            h += N & 15;
            var w = N >> 4;
            if (w < 16)
              E[T++] = w;
            else {
              var F = 0, H = 0;
              for (w == 16 ? (H = 3 + we(o, h, 3), h += 2, F = E[T - 1]) : w == 17 ? (H = 3 + we(o, h, 7), h += 3) : w == 18 && (H = 11 + we(o, h, 127), h += 7); H--; )
                E[T++] = F;
            }
          }
          var D = E.subarray(0, S), B = E.subarray(S);
          g = Bn(D), b = Bn(B), u = Me(D, g, 1), p = Me(B, b, 1);
        } else
          ce(1);
      else {
        var w = Zo(h) + 4, v = o[w - 4] | o[w - 3] << 8, x = w + v;
        if (x > s) {
          a && ce(0);
          break;
        }
        l && c(f + v), t.set(o.subarray(w, x), f), e.b = f += v, e.p = h = x * 8, e.f = d;
        continue;
      }
      if (h > m) {
        a && ce(0);
        break;
      }
    }
    l && c(f + 131072);
    for (var X = (1 << g) - 1, j = (1 << b) - 1, ne = h; ; ne = h) {
      var F = u[Wn(o, h) & X], U = F >> 4;
      if (h += F & 15, h > m) {
        a && ce(0);
        break;
      }
      if (F || ce(2), U < 256)
        t[f++] = U;
      else if (U == 256) {
        ne = h, u = null;
        break;
      } else {
        var Q = U - 254;
        if (U > 264) {
          var T = U - 257, V = Mn[T];
          Q = we(o, h, (1 << V) - 1) + Wr[T], h += V;
        }
        var ue = p[Wn(o, h) & j], Ie = ue >> 4;
        ue || ce(3), h += ue & 15;
        var B = da[Ie];
        if (Ie > 3) {
          var V = In[Ie];
          B += Wn(o, h) & (1 << V) - 1, h += V;
        }
        if (h > m) {
          a && ce(0);
          break;
        }
        l && c(f + 131072);
        var q = f + Q;
        if (f < B) {
          var K = i - B, pe = Math.min(B, q);
          for (K + f < 0 && ce(3); f < pe; ++f)
            t[f] = n[K + f];
        }
        for (; f < q; ++f)
          t[f] = t[f - B];
      }
    }
    e.l = u, e.p = ne, e.b = f, e.f = d, u && (d = 1, e.m = g, e.d = p, e.n = b);
  } while (!d);
  return f != t.length && r ? Dt(t, 0, f) : t.subarray(0, f);
}, Re = function(o, e, t) {
  t <<= e & 7;
  var n = e / 8 | 0;
  o[n] |= t, o[n + 1] |= t >> 8;
}, mt = function(o, e, t) {
  t <<= e & 7;
  var n = e / 8 | 0;
  o[n] |= t, o[n + 1] |= t >> 8, o[n + 2] |= t >> 16;
}, Un = function(o, e) {
  for (var t = [], n = 0; n < o.length; ++n)
    o[n] && t.push({ s: n, f: o[n] });
  var s = t.length, i = t.slice();
  if (!s)
    return { t: _r, l: 0 };
  if (s == 1) {
    var r = new te(t[0].s + 1);
    return r[t[0].s] = 1, { t: r, l: 1 };
  }
  t.sort(function(x, S) {
    return x.f - S.f;
  }), t.push({ s: -1, f: 25001 });
  var l = t[0], a = t[1], c = 0, d = 1, h = 2;
  for (t[0] = { s: -1, f: l.f + a.f, l, r: a }; d != s - 1; )
    l = t[t[c].f < t[h].f ? c++ : h++], a = t[c != d && t[c].f < t[h].f ? c++ : h++], t[d++] = { s: -1, f: l.f + a.f, l, r: a };
  for (var f = i[0].s, n = 1; n < s; ++n)
    i[n].s > f && (f = i[n].s);
  var u = new be(f + 1), p = Ho(t[d - 1], u, 0);
  if (p > e) {
    var n = 0, g = 0, b = p - e, m = 1 << b;
    for (i.sort(function(S, k) {
      return u[k.s] - u[S.s] || S.f - k.f;
    }); n < s; ++n) {
      var y = i[n].s;
      if (u[y] > e)
        g += m - (1 << p - u[y]), u[y] = e;
      else
        break;
    }
    for (g >>= b; g > 0; ) {
      var w = i[n].s;
      u[w] < e ? g -= 1 << e - u[w]++ - 1 : ++n;
    }
    for (; n >= 0 && g; --n) {
      var v = i[n].s;
      u[v] == e && (--u[v], ++g);
    }
    p = e;
  }
  return { t: new te(u), l: p };
}, Ho = function(o, e, t) {
  return o.s == -1 ? Math.max(Ho(o.l, e, t + 1), Ho(o.r, e, t + 1)) : e[o.s] = t;
}, xs = function(o) {
  for (var e = o.length; e && !o[--e]; )
    ;
  for (var t = new be(++e), n = 0, s = o[0], i = 1, r = function(a) {
    t[n++] = a;
  }, l = 1; l <= e; ++l)
    if (o[l] == s && l != e)
      ++i;
    else {
      if (!s && i > 2) {
        for (; i > 138; i -= 138)
          r(32754);
        i > 2 && (r(i > 10 ? i - 11 << 5 | 28690 : i - 3 << 5 | 12305), i = 0);
      } else if (i > 3) {
        for (r(s), --i; i > 6; i -= 6)
          r(8304);
        i > 2 && (r(i - 3 << 5 | 8208), i = 0);
      }
      for (; i--; )
        r(s);
      i = 1, s = o[l];
    }
  return { c: t.subarray(0, n), n: e };
}, bt = function(o, e) {
  for (var t = 0, n = 0; n < e.length; ++n)
    t += o[n] * e[n];
  return t;
}, qr = function(o, e, t) {
  var n = t.length, s = Zo(e + 2);
  o[s] = n & 255, o[s + 1] = n >> 8, o[s + 2] = o[s] ^ 255, o[s + 3] = o[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    o[s + i + 4] = t[i];
  return (s + 4 + n) * 8;
}, ws = function(o, e, t, n, s, i, r, l, a, c, d) {
  Re(e, d++, t), ++s[256];
  for (var h = Un(s, 15), f = h.t, u = h.l, p = Un(i, 15), g = p.t, b = p.l, m = xs(f), y = m.c, w = m.n, v = xs(g), x = v.c, S = v.n, k = new be(19), M = 0; M < y.length; ++M)
    ++k[y[M] & 31];
  for (var M = 0; M < x.length; ++M)
    ++k[x[M] & 31];
  for (var E = Un(k, 7), $ = E.t, T = E.l, I = 19; I > 4 && !$[No[I - 1]]; --I)
    ;
  var A = c + 5 << 3, L = bt(s, Ve) + bt(i, Nt) + r, N = bt(s, f) + bt(i, g) + r + 14 + 3 * I + bt(k, $) + 2 * k[16] + 3 * k[17] + 7 * k[18];
  if (a >= 0 && A <= L && A <= N)
    return qr(e, d, o.subarray(a, a + c));
  var F, H, D, B;
  if (Re(e, d, 1 + (N < L)), d += 2, N < L) {
    F = Me(f, u, 0), H = f, D = Me(g, b, 0), B = g;
    var X = Me($, T, 0);
    Re(e, d, w - 257), Re(e, d + 5, S - 1), Re(e, d + 10, I - 4), d += 14;
    for (var M = 0; M < I; ++M)
      Re(e, d + 3 * M, $[No[M]]);
    d += 3 * I;
    for (var j = [y, x], ne = 0; ne < 2; ++ne)
      for (var U = j[ne], M = 0; M < U.length; ++M) {
        var Q = U[M] & 31;
        Re(e, d, X[Q]), d += $[Q], Q > 15 && (Re(e, d, U[M] >> 5 & 127), d += U[M] >> 12);
      }
  } else
    F = ha, H = Ve, D = ua, B = Nt;
  for (var M = 0; M < l; ++M) {
    var V = n[M];
    if (V > 255) {
      var Q = V >> 18 & 31;
      mt(e, d, F[Q + 257]), d += H[Q + 257], Q > 7 && (Re(e, d, V >> 23 & 31), d += Mn[Q]);
      var ue = V & 31;
      mt(e, d, D[ue]), d += B[ue], ue > 3 && (mt(e, d, V >> 5 & 8191), d += In[ue]);
    } else
      mt(e, d, F[V]), d += H[V];
  }
  return mt(e, d, F[256]), d + H[256];
}, ba = /* @__PURE__ */ new Jo([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), _r = /* @__PURE__ */ new te(0), ya = function(o, e, t, n, s, i) {
  var r = i.z || o.length, l = new te(n + r + 5 * (1 + Math.ceil(r / 7e3)) + s), a = l.subarray(n, l.length - s), c = i.l, d = (i.r || 0) & 7;
  if (e) {
    d && (a[0] = i.r >> 3);
    for (var h = ba[e - 1], f = h >> 13, u = h & 8191, p = (1 << t) - 1, g = i.p || new be(32768), b = i.h || new be(p + 1), m = Math.ceil(t / 3), y = 2 * m, w = function(Dn) {
      return (o[Dn] ^ o[Dn + 1] << m ^ o[Dn + 2] << y) & p;
    }, v = new Jo(25e3), x = new be(288), S = new be(32), k = 0, M = 0, E = i.i || 0, $ = 0, T = i.w || 0, I = 0; E + 2 < r; ++E) {
      var A = w(E), L = E & 32767, N = b[A];
      if (g[L] = N, b[A] = L, T <= E) {
        var F = r - E;
        if ((k > 7e3 || $ > 24576) && (F > 423 || !c)) {
          d = ws(o, a, 0, v, x, S, M, $, I, E - I, d), $ = k = M = 0, I = E;
          for (var H = 0; H < 286; ++H)
            x[H] = 0;
          for (var H = 0; H < 30; ++H)
            S[H] = 0;
        }
        var D = 2, B = 0, X = u, j = L - N & 32767;
        if (F > 2 && A == w(E - j))
          for (var ne = Math.min(f, F) - 1, U = Math.min(32767, E), Q = Math.min(258, F); j <= U && --X && L != N; ) {
            if (o[E + D] == o[E + D - j]) {
              for (var V = 0; V < Q && o[E + V] == o[E + V - j]; ++V)
                ;
              if (V > D) {
                if (D = V, B = j, V > ne)
                  break;
                for (var ue = Math.min(j, V - 2), Ie = 0, H = 0; H < ue; ++H) {
                  var q = E - j + H & 32767, K = g[q], pe = q - K & 32767;
                  pe > Ie && (Ie = pe, N = q);
                }
              }
            }
            L = N, N = g[L], j += L - N & 32767;
          }
        if (B) {
          v[$++] = 268435456 | Po[D] << 18 | ys[B];
          var Ae = Po[D] & 31, gt = ys[B] & 31;
          M += Mn[Ae] + In[gt], ++x[257 + Ae], ++S[gt], T = E + D, ++k;
        } else
          v[$++] = o[E], ++x[o[E]];
      }
    }
    for (E = Math.max(E, T); E < r; ++E)
      v[$++] = o[E], ++x[o[E]];
    d = ws(o, a, c, v, x, S, M, $, I, E - I, d), c || (i.r = d & 7 | a[d / 8 | 0] << 3, d -= 7, i.h = b, i.p = g, i.i = E, i.w = T);
  } else {
    for (var E = i.w || 0; E < r + c; E += 65535) {
      var Ze = E + 65535;
      Ze >= r && (a[d / 8 | 0] = c, Ze = r), d = qr(a, d + 1, o.subarray(E, Ze));
    }
    i.i = r;
  }
  return Dt(l, 0, n + Zo(d) + s);
}, xa = /* @__PURE__ */ (function() {
  for (var o = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var t = e, n = 9; --n; )
      t = (t & 1 && -306674912) ^ t >>> 1;
    o[e] = t;
  }
  return o;
})(), wa = function() {
  var o = -1;
  return {
    p: function(e) {
      for (var t = o, n = 0; n < e.length; ++n)
        t = xa[t & 255 ^ e[n]] ^ t >>> 8;
      o = t;
    },
    d: function() {
      return ~o;
    }
  };
}, jr = function() {
  var o = 1, e = 0;
  return {
    p: function(t) {
      for (var n = o, s = e, i = t.length | 0, r = 0; r != i; ) {
        for (var l = Math.min(r + 2655, i); r < l; ++r)
          s += n += t[r];
        n = (n & 65535) + 15 * (n >> 16), s = (s & 65535) + 15 * (s >> 16);
      }
      o = n, e = s;
    },
    d: function() {
      return o %= 65521, e %= 65521, (o & 255) << 24 | (o & 65280) << 8 | (e & 255) << 8 | e >> 8;
    }
  };
}, Vr = function(o, e, t, n, s) {
  if (!s && (s = { l: 1 }, e.dictionary)) {
    var i = e.dictionary.subarray(-32768), r = new te(i.length + o.length);
    r.set(i), r.set(o, i.length), o = r, s.w = i.length;
  }
  return ya(o, e.level == null ? 6 : e.level, e.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(o.length))) * 1.5) : 20 : 12 + e.mem, t, n, s);
}, Yr = function(o, e) {
  var t = {};
  for (var n in o)
    t[n] = o[n];
  for (var n in e)
    t[n] = e[n];
  return t;
}, Te = function(o, e) {
  return o[e] | o[e + 1] << 8;
}, xe = function(o, e) {
  return (o[e] | o[e + 1] << 8 | o[e + 2] << 16 | o[e + 3] << 24) >>> 0;
}, qn = function(o, e) {
  return xe(o, e) + xe(o, e + 4) * 4294967296;
}, oe = function(o, e, t) {
  for (; t; ++e)
    o[e] = t, t >>>= 8;
}, va = function(o, e) {
  var t = e.level, n = t == 0 ? 0 : t < 6 ? 1 : t == 9 ? 3 : 2;
  if (o[0] = 120, o[1] = n << 6 | (e.dictionary && 32), o[1] |= 31 - (o[0] << 8 | o[1]) % 31, e.dictionary) {
    var s = jr();
    s.p(e.dictionary), oe(o, 2, s.d());
  }
};
function ka(o, e) {
  return Vr(o, e || {}, 0, 0);
}
function Ca(o, e) {
  return ma(o, { i: 2 }, e && e.out, e && e.dictionary);
}
function Zm(o, e) {
  e || (e = {});
  var t = jr();
  t.p(o);
  var n = Vr(o, e, e.dictionary ? 6 : 2, 4);
  return va(n, e), oe(n, n.length - 4, t.d()), n;
}
var Xr = function(o, e, t, n) {
  for (var s in o) {
    var i = o[s], r = e + s, l = n;
    Array.isArray(i) && (l = Yr(n, i[1]), i = i[0]), ArrayBuffer.isView(i) ? t[r] = [i, l] : (t[r += "/"] = [new te(0), l], Xr(i, r, t, n));
  }
}, vs = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder(), Do = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder(), Sa = 0;
try {
  Do.decode(_r, { stream: !0 }), Sa = 1;
} catch (o) {
}
var Ea = function(o) {
  for (var e = "", t = 0; ; ) {
    var n = o[t++], s = (n > 127) + (n > 223) + (n > 239);
    if (t + s > o.length)
      return { s: e, r: Dt(o, t - 1) };
    s ? s == 3 ? (n = ((n & 15) << 18 | (o[t++] & 63) << 12 | (o[t++] & 63) << 6 | o[t++] & 63) - 65536, e += String.fromCharCode(55296 | n >> 10, 56320 | n & 1023)) : s & 1 ? e += String.fromCharCode((n & 31) << 6 | o[t++] & 63) : e += String.fromCharCode((n & 15) << 12 | (o[t++] & 63) << 6 | o[t++] & 63) : e += String.fromCharCode(n);
  }
};
function Ce(o, e) {
  var t;
  if (vs)
    return vs.encode(o);
  for (var n = o.length, s = new te(o.length + (o.length >> 1)), i = 0, r = function(c) {
    s[i++] = c;
  }, t = 0; t < n; ++t) {
    if (i + 5 > s.length) {
      var l = new te(i + 8 + (n - t << 1));
      l.set(s), s = l;
    }
    var a = o.charCodeAt(t);
    a < 128 || e ? r(a) : a < 2048 ? (r(192 | a >> 6), r(128 | a & 63)) : a > 55295 && a < 57344 ? (a = 65536 + (a & 1047552) | o.charCodeAt(++t) & 1023, r(240 | a >> 18), r(128 | a >> 12 & 63), r(128 | a >> 6 & 63), r(128 | a & 63)) : (r(224 | a >> 12), r(128 | a >> 6 & 63), r(128 | a & 63));
  }
  return Dt(s, 0, i);
}
function Z(o, e) {
  if (e) {
    for (var t = "", n = 0; n < o.length; n += 16384)
      t += String.fromCharCode.apply(null, o.subarray(n, n + 16384));
    return t;
  } else {
    if (Do)
      return Do.decode(o);
    var s = Ea(o), i = s.s, t = s.r;
    return t.length && ce(8), i;
  }
}
var Ta = function(o, e) {
  return e + 30 + Te(o, e + 26) + Te(o, e + 28);
}, $a = function(o, e, t) {
  var n = Te(o, e + 28), s = Te(o, e + 30), i = Z(o.subarray(e + 46, e + 46 + n), !(Te(o, e + 8) & 2048)), r = e + 46 + n, l = Ma(o, r, s, t, xe(o, e + 20), xe(o, e + 24), xe(o, e + 42)), a = l[0], c = l[1], d = l[2];
  return [Te(o, e + 10), a, c, i, r + s + Te(o, e + 32), d];
}, Ma = function(o, e, t, n, s, i, r) {
  var l = s == 4294967295, a = i == 4294967295, c = r == 4294967295, d = e + t, h = l + a + c;
  if (n && h) {
    for (; e + 4 < d; e += 4 + Te(o, e + 2))
      if (Te(o, e) == 1)
        return [
          l ? qn(o, e + 4 + 8 * a) : s,
          a ? qn(o, e + 4) : i,
          c ? qn(o, e + 4 + 8 * (a + l)) : r,
          1
        ];
    n < 2 && ce(13);
  }
  return [s, i, r, 0];
}, zo = function(o) {
  var e = 0;
  if (o)
    for (var t in o) {
      var n = o[t].length;
      n > 65535 && ce(9), e += n + 4;
    }
  return e;
}, ks = function(o, e, t, n, s, i, r, l) {
  var a = n.length, c = t.extra, d = l && l.length, h = zo(c);
  oe(o, e, r != null ? 33639248 : 67324752), e += 4, r != null && (o[e++] = 20, o[e++] = t.os), o[e] = 20, e += 2, o[e++] = t.flag << 1 | (i < 0 && 8), o[e++] = s && 8, o[e++] = t.compression & 255, o[e++] = t.compression >> 8;
  var f = new Date(t.mtime == null ? Date.now() : t.mtime), u = f.getFullYear() - 1980;
  if ((u < 0 || u > 119) && ce(10), oe(o, e, u << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), e += 4, i != -1 && (oe(o, e, t.crc), oe(o, e + 4, i < 0 ? -i - 2 : i), oe(o, e + 8, t.size)), oe(o, e + 12, a), oe(o, e + 14, h), e += 16, r != null && (oe(o, e, d), oe(o, e + 6, t.attrs), oe(o, e + 10, r), e += 14), o.set(n, e), e += a, h)
    for (var p in c) {
      var g = c[p], b = g.length;
      oe(o, e, +p), oe(o, e + 2, b), o.set(g, e + 4), e += 4 + b;
    }
  return d && (o.set(l, e), e += d), e;
}, Ia = function(o, e, t, n, s) {
  oe(o, e, 101010256), oe(o, e + 8, t), oe(o, e + 10, t), oe(o, e + 12, n), oe(o, e + 16, s);
};
function zt(o, e) {
  e || (e = {});
  var t = {}, n = [];
  Xr(o, "", t, e);
  var s = 0, i = 0;
  for (var r in t) {
    var l = t[r], a = l[0], c = l[1], d = c.level == 0 ? 0 : 8, h = Ce(r), f = h.length, u = c.comment, p = u && Ce(u), g = p && p.length, b = zo(c.extra);
    f > 65535 && ce(11);
    var m = d ? ka(a, c) : a, y = m.length, w = wa();
    w.p(a), n.push(Yr(c, {
      size: a.length,
      crc: w.d(),
      c: m,
      f: h,
      m: p,
      u: f != r.length || p && u.length != g,
      o: s,
      compression: d
    })), s += 30 + f + b + y, i += 76 + 2 * (f + b) + (g || 0) + y;
  }
  for (var v = new te(i + 22), x = s, S = i - s, k = 0; k < n.length; ++k) {
    var h = n[k];
    ks(v, h.o, h, h.f, h.u, h.c.length);
    var M = 30 + h.f.length + zo(h.extra);
    v.set(h.c, h.o + M), ks(v, s, h, h.f, h.u, h.c.length, h.o, h.m), s += 16 + M + (h.m ? h.m.length : 0);
  }
  return Ia(v, s, n.length, S, x), v;
}
function Ye(o, e) {
  for (var t = {}, n = o.length - 22; xe(o, n) != 101010256; --n)
    (!n || o.length - n > 65558) && ce(13);
  var s = Te(o, n + 8);
  if (!s)
    return {};
  var i = xe(o, n + 16), r = xe(o, n - 20) == 117853008;
  if (r) {
    var l = xe(o, n - 12);
    r = xe(o, l) == 101075792, r && (s = xe(o, l + 32), i = xe(o, l + 48));
  }
  for (var a = 0; a < s; ++a) {
    var c = $a(o, i, r), d = c[0], h = c[1], f = c[2], u = c[3], p = c[4], g = c[5], b = Ta(o, g);
    i = p, d ? d == 8 ? t[u] = Ca(o.subarray(b, b + h), { out: new te(f) }) : ce(14, "unknown compression type " + d) : t[u] = Dt(o, b, b + h);
  }
  return t;
}
var _n = {}, jn = {}, Cs;
function An() {
  return Cs || (Cs = 1, (function(o) {
    const e = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", t = e + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040", n = "[" + e + "][" + t + "]*", s = new RegExp("^" + n + "$"), i = function(c, d) {
      const h = [];
      let f = d.exec(c);
      for (; f; ) {
        const u = [];
        u.startIndex = d.lastIndex - f[0].length;
        const p = f.length;
        for (let g = 0; g < p; g++)
          u.push(f[g]);
        h.push(u), f = d.exec(c);
      }
      return h;
    }, r = function(c) {
      const d = s.exec(c);
      return !(d === null || typeof d == "undefined");
    };
    o.isExist = function(c) {
      return typeof c != "undefined";
    }, o.isEmptyObject = function(c) {
      return Object.keys(c).length === 0;
    }, o.merge = function(c, d, h) {
      if (d) {
        const f = Object.keys(d), u = f.length;
        for (let p = 0; p < u; p++)
          h === "strict" ? c[f[p]] = [d[f[p]]] : c[f[p]] = d[f[p]];
      }
    }, o.getValue = function(c) {
      return o.isExist(c) ? c : "";
    };
    const l = [
      // '__proto__',
      // 'constructor',
      // 'prototype',
      "hasOwnProperty",
      "toString",
      "valueOf",
      "__defineGetter__",
      "__defineSetter__",
      "__lookupGetter__",
      "__lookupSetter__"
    ], a = ["__proto__", "constructor", "prototype"];
    o.isName = r, o.getAllMatches = i, o.nameRegexp = n, o.DANGEROUS_PROPERTY_NAMES = l, o.criticalProperties = a;
  })(jn)), jn;
}
var Ss;
function Gr() {
  if (Ss) return _n;
  Ss = 1;
  const o = An(), e = {
    allowBooleanAttributes: !1,
    //A tag can have attributes without any value
    unpairedTags: []
  };
  _n.validate = function(m, y) {
    y = Object.assign({}, e, y);
    const w = [];
    let v = !1, x = !1;
    m[0] === "\uFEFF" && (m = m.substr(1));
    for (let S = 0; S < m.length; S++)
      if (m[S] === "<" && m[S + 1] === "?") {
        if (S += 2, S = n(m, S), S.err) return S;
      } else if (m[S] === "<") {
        let k = S;
        if (S++, m[S] === "!") {
          S = s(m, S);
          continue;
        } else {
          let M = !1;
          m[S] === "/" && (M = !0, S++);
          let E = "";
          for (; S < m.length && m[S] !== ">" && m[S] !== " " && m[S] !== "	" && m[S] !== `
` && m[S] !== "\r"; S++)
            E += m[S];
          if (E = E.trim(), E[E.length - 1] === "/" && (E = E.substring(0, E.length - 1), S--), !p(E)) {
            let I;
            return E.trim().length === 0 ? I = "Invalid space after '<'." : I = "Tag '" + E + "' is an invalid name.", f("InvalidTag", I, g(m, S));
          }
          const $ = l(m, S);
          if ($ === !1)
            return f("InvalidAttr", "Attributes for '" + E + "' have open quote.", g(m, S));
          let T = $.value;
          if (S = $.index, T[T.length - 1] === "/") {
            const I = S - T.length;
            T = T.substring(0, T.length - 1);
            const A = c(T, y);
            if (A === !0)
              v = !0;
            else
              return f(A.err.code, A.err.msg, g(m, I + A.err.line));
          } else if (M)
            if ($.tagClosed) {
              if (T.trim().length > 0)
                return f("InvalidTag", "Closing tag '" + E + "' can't have attributes or invalid starting.", g(m, k));
              if (w.length === 0)
                return f("InvalidTag", "Closing tag '" + E + "' has not been opened.", g(m, k));
              {
                const I = w.pop();
                if (E !== I.tagName) {
                  let A = g(m, I.tagStartPos);
                  return f(
                    "InvalidTag",
                    "Expected closing tag '" + I.tagName + "' (opened in line " + A.line + ", col " + A.col + ") instead of closing tag '" + E + "'.",
                    g(m, k)
                  );
                }
                w.length == 0 && (x = !0);
              }
            } else return f("InvalidTag", "Closing tag '" + E + "' doesn't have proper closing.", g(m, S));
          else {
            const I = c(T, y);
            if (I !== !0)
              return f(I.err.code, I.err.msg, g(m, S - T.length + I.err.line));
            if (x === !0)
              return f("InvalidXml", "Multiple possible root nodes found.", g(m, S));
            y.unpairedTags.indexOf(E) !== -1 || w.push({ tagName: E, tagStartPos: k }), v = !0;
          }
          for (S++; S < m.length; S++)
            if (m[S] === "<")
              if (m[S + 1] === "!") {
                S++, S = s(m, S);
                continue;
              } else if (m[S + 1] === "?") {
                if (S = n(m, ++S), S.err) return S;
              } else
                break;
            else if (m[S] === "&") {
              const I = h(m, S);
              if (I == -1)
                return f("InvalidChar", "char '&' is not expected.", g(m, S));
              S = I;
            } else if (x === !0 && !t(m[S]))
              return f("InvalidXml", "Extra text at the end", g(m, S));
          m[S] === "<" && S--;
        }
      } else {
        if (t(m[S]))
          continue;
        return f("InvalidChar", "char '" + m[S] + "' is not expected.", g(m, S));
      }
    if (v) {
      if (w.length == 1)
        return f("InvalidTag", "Unclosed tag '" + w[0].tagName + "'.", g(m, w[0].tagStartPos));
      if (w.length > 0)
        return f("InvalidXml", "Invalid '" + JSON.stringify(w.map((S) => S.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
    } else return f("InvalidXml", "Start tag expected.", 1);
    return !0;
  };
  function t(m) {
    return m === " " || m === "	" || m === `
` || m === "\r";
  }
  function n(m, y) {
    const w = y;
    for (; y < m.length; y++)
      if (m[y] == "?" || m[y] == " ") {
        const v = m.substr(w, y - w);
        if (y > 5 && v === "xml")
          return f("InvalidXml", "XML declaration allowed only at the start of the document.", g(m, y));
        if (m[y] == "?" && m[y + 1] == ">") {
          y++;
          break;
        } else
          continue;
      }
    return y;
  }
  function s(m, y) {
    if (m.length > y + 5 && m[y + 1] === "-" && m[y + 2] === "-") {
      for (y += 3; y < m.length; y++)
        if (m[y] === "-" && m[y + 1] === "-" && m[y + 2] === ">") {
          y += 2;
          break;
        }
    } else if (m.length > y + 8 && m[y + 1] === "D" && m[y + 2] === "O" && m[y + 3] === "C" && m[y + 4] === "T" && m[y + 5] === "Y" && m[y + 6] === "P" && m[y + 7] === "E") {
      let w = 1;
      for (y += 8; y < m.length; y++)
        if (m[y] === "<")
          w++;
        else if (m[y] === ">" && (w--, w === 0))
          break;
    } else if (m.length > y + 9 && m[y + 1] === "[" && m[y + 2] === "C" && m[y + 3] === "D" && m[y + 4] === "A" && m[y + 5] === "T" && m[y + 6] === "A" && m[y + 7] === "[") {
      for (y += 8; y < m.length; y++)
        if (m[y] === "]" && m[y + 1] === "]" && m[y + 2] === ">") {
          y += 2;
          break;
        }
    }
    return y;
  }
  const i = '"', r = "'";
  function l(m, y) {
    let w = "", v = "", x = !1;
    for (; y < m.length; y++) {
      if (m[y] === i || m[y] === r)
        v === "" ? v = m[y] : v !== m[y] || (v = "");
      else if (m[y] === ">" && v === "") {
        x = !0;
        break;
      }
      w += m[y];
    }
    return v !== "" ? !1 : {
      value: w,
      index: y,
      tagClosed: x
    };
  }
  const a = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
  function c(m, y) {
    const w = o.getAllMatches(m, a), v = {};
    for (let x = 0; x < w.length; x++) {
      if (w[x][1].length === 0)
        return f("InvalidAttr", "Attribute '" + w[x][2] + "' has no space in starting.", b(w[x]));
      if (w[x][3] !== void 0 && w[x][4] === void 0)
        return f("InvalidAttr", "Attribute '" + w[x][2] + "' is without value.", b(w[x]));
      if (w[x][3] === void 0 && !y.allowBooleanAttributes)
        return f("InvalidAttr", "boolean attribute '" + w[x][2] + "' is not allowed.", b(w[x]));
      const S = w[x][2];
      if (!u(S))
        return f("InvalidAttr", "Attribute '" + S + "' is an invalid name.", b(w[x]));
      if (!v.hasOwnProperty(S))
        v[S] = 1;
      else
        return f("InvalidAttr", "Attribute '" + S + "' is repeated.", b(w[x]));
    }
    return !0;
  }
  function d(m, y) {
    let w = /\d/;
    for (m[y] === "x" && (y++, w = /[\da-fA-F]/); y < m.length; y++) {
      if (m[y] === ";")
        return y;
      if (!m[y].match(w))
        break;
    }
    return -1;
  }
  function h(m, y) {
    if (y++, m[y] === ";")
      return -1;
    if (m[y] === "#")
      return y++, d(m, y);
    let w = 0;
    for (; y < m.length; y++, w++)
      if (!(m[y].match(/\w/) && w < 20)) {
        if (m[y] === ";")
          break;
        return -1;
      }
    return y;
  }
  function f(m, y, w) {
    return {
      err: {
        code: m,
        msg: y,
        line: w.line || w,
        col: w.col
      }
    };
  }
  function u(m) {
    return o.isName(m);
  }
  function p(m) {
    return o.isName(m);
  }
  function g(m, y) {
    const w = m.substring(0, y).split(/\r?\n/);
    return {
      line: w.length,
      // column number is last line's length + 1, because column numbering starts at 1:
      col: w[w.length - 1].length + 1
    };
  }
  function b(m) {
    return m.startIndex + m[1].length;
  }
  return _n;
}
var _t = {}, Es;
function Aa() {
  if (Es) return _t;
  Es = 1;
  const { DANGEROUS_PROPERTY_NAMES: o, criticalProperties: e } = An(), t = (l) => o.includes(l) ? "__" + l : l, n = {
    preserveOrder: !1,
    attributeNamePrefix: "@_",
    attributesGroupName: !1,
    textNodeName: "#text",
    ignoreAttributes: !0,
    removeNSPrefix: !1,
    // remove NS from tag name or attribute name if true
    allowBooleanAttributes: !1,
    //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseTagValue: !0,
    parseAttributeValue: !1,
    trimValues: !0,
    //Trim string values of tag and attributes
    cdataPropName: !1,
    numberParseOptions: {
      hex: !0,
      leadingZeros: !0,
      eNotation: !0
    },
    tagValueProcessor: function(l, a) {
      return a;
    },
    attributeValueProcessor: function(l, a) {
      return a;
    },
    stopNodes: [],
    //nested tags will not be parsed even for errors
    alwaysCreateTextNode: !1,
    isArray: () => !1,
    commentPropName: !1,
    unpairedTags: [],
    processEntities: !0,
    htmlEntities: !1,
    ignoreDeclaration: !1,
    ignorePiTags: !1,
    transformTagName: !1,
    transformAttributeName: !1,
    updateTag: function(l, a, c) {
      return l;
    },
    // skipEmptyListItem: false
    captureMetaData: !1,
    maxNestedTags: 100,
    strictReservedNames: !0,
    onDangerousProperty: t
  };
  function s(l, a) {
    if (typeof l != "string")
      return;
    const c = l.toLowerCase();
    if (o.some((d) => c === d.toLowerCase()))
      throw new Error(
        `[SECURITY] Invalid ${a}: "${l}" is a reserved JavaScript keyword that could cause prototype pollution`
      );
    if (e.some((d) => c === d.toLowerCase()))
      throw new Error(
        `[SECURITY] Invalid ${a}: "${l}" is a reserved JavaScript keyword that could cause prototype pollution`
      );
  }
  function i(l) {
    var a, c, d, h, f, u, p;
    return typeof l == "boolean" ? {
      enabled: l,
      // true or false
      maxEntitySize: 1e4,
      maxExpansionDepth: 10,
      maxTotalExpansions: 1e3,
      maxExpandedLength: 1e5,
      allowedTags: null,
      tagFilter: null
    } : typeof l == "object" && l !== null ? {
      enabled: l.enabled !== !1,
      maxEntitySize: Math.max(1, (a = l.maxEntitySize) != null ? a : 1e4),
      maxExpansionDepth: Math.max(1, (c = l.maxExpansionDepth) != null ? c : 1e4),
      maxTotalExpansions: Math.max(1, (d = l.maxTotalExpansions) != null ? d : 1 / 0),
      maxExpandedLength: Math.max(1, (h = l.maxExpandedLength) != null ? h : 1e5),
      maxEntityCount: Math.max(1, (f = l.maxEntityCount) != null ? f : 1e3),
      allowedTags: (u = l.allowedTags) != null ? u : null,
      tagFilter: (p = l.tagFilter) != null ? p : null
    } : i(!0);
  }
  const r = function(l) {
    const a = Object.assign({}, n, l), c = [
      { value: a.attributeNamePrefix, name: "attributeNamePrefix" },
      { value: a.attributesGroupName, name: "attributesGroupName" },
      { value: a.textNodeName, name: "textNodeName" },
      { value: a.cdataPropName, name: "cdataPropName" },
      { value: a.commentPropName, name: "commentPropName" }
    ];
    for (const { value: d, name: h } of c)
      d && s(d, h);
    return a.onDangerousProperty === null && (a.onDangerousProperty = t), a.processEntities = i(a.processEntities), a;
  };
  return _t.buildOptions = r, _t.defaultOptions = n, _t;
}
var Vn, Ts;
function Ra() {
  if (Ts) return Vn;
  Ts = 1;
  class o {
    constructor(t) {
      this.tagname = t, this.child = [], this[":@"] = {};
    }
    add(t, n) {
      t === "__proto__" && (t = "#__proto__"), this.child.push({ [t]: n });
    }
    addChild(t) {
      t.tagname === "__proto__" && (t.tagname = "#__proto__"), t[":@"] && Object.keys(t[":@"]).length > 0 ? this.child.push({ [t.tagname]: t.child, ":@": t[":@"] }) : this.child.push({ [t.tagname]: t.child });
    }
  }
  return Vn = o, Vn;
}
var Yn, $s;
function Fa() {
  if ($s) return Yn;
  $s = 1;
  const o = An();
  class e {
    constructor(r) {
      this.suppressValidationErr = !r, this.options = r || {};
    }
    readDocType(r, l) {
      const a = /* @__PURE__ */ Object.create(null);
      let c = 0;
      if (r[l + 3] === "O" && r[l + 4] === "C" && r[l + 5] === "T" && r[l + 6] === "Y" && r[l + 7] === "P" && r[l + 8] === "E") {
        l = l + 9;
        let d = 1, h = !1, f = !1, u = "";
        for (; l < r.length; l++)
          if (r[l] === "<" && !f) {
            if (h && n(r, "!ENTITY", l)) {
              l += 7;
              let p, g;
              if ([p, g, l] = this.readEntityExp(r, l + 1, this.suppressValidationErr), g.indexOf("&") === -1) {
                if (this.options.enabled !== !1 && this.options.maxEntityCount != null && c >= this.options.maxEntityCount)
                  throw new Error(
                    `Entity count (${c + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`
                  );
                const b = p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                a[p] = {
                  regx: RegExp(`&${b};`, "g"),
                  val: g
                }, c++;
              }
            } else if (h && n(r, "!ELEMENT", l)) {
              l += 8;
              const { index: p } = this.readElementExp(r, l + 1);
              l = p;
            } else if (h && n(r, "!ATTLIST", l))
              l += 8;
            else if (h && n(r, "!NOTATION", l)) {
              l += 9;
              const { index: p } = this.readNotationExp(r, l + 1, this.suppressValidationErr);
              l = p;
            } else if (n(r, "!--", l))
              f = !0;
            else
              throw new Error("Invalid DOCTYPE");
            d++, u = "";
          } else if (r[l] === ">") {
            if (f ? r[l - 1] === "-" && r[l - 2] === "-" && (f = !1, d--) : d--, d === 0)
              break;
          } else r[l] === "[" ? h = !0 : u += r[l];
        if (d !== 0)
          throw new Error("Unclosed DOCTYPE");
      } else
        throw new Error("Invalid Tag instead of DOCTYPE");
      return { entities: a, i: l };
    }
    readEntityExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]) && r[l] !== '"' && r[l] !== "'"; )
        a += r[l], l++;
      if (s(a), l = t(r, l), !this.suppressValidationErr) {
        if (r.substring(l, l + 6).toUpperCase() === "SYSTEM")
          throw new Error("External entities are not supported");
        if (r[l] === "%")
          throw new Error("Parameter entities are not supported");
      }
      let c = "";
      if ([l, c] = this.readIdentifierVal(r, l, "entity"), this.options.enabled !== !1 && this.options.maxEntitySize != null && c.length > this.options.maxEntitySize)
        throw new Error(
          `Entity "${a}" size (${c.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`
        );
      return l--, [a, c, l];
    }
    readNotationExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        a += r[l], l++;
      !this.suppressValidationErr && s(a), l = t(r, l);
      const c = r.substring(l, l + 6).toUpperCase();
      if (!this.suppressValidationErr && c !== "SYSTEM" && c !== "PUBLIC")
        throw new Error(`Expected SYSTEM or PUBLIC, found "${c}"`);
      l += c.length, l = t(r, l);
      let d = null, h = null;
      if (c === "PUBLIC")
        [l, d] = this.readIdentifierVal(r, l, "publicIdentifier"), l = t(r, l), (r[l] === '"' || r[l] === "'") && ([l, h] = this.readIdentifierVal(r, l, "systemIdentifier"));
      else if (c === "SYSTEM" && ([l, h] = this.readIdentifierVal(r, l, "systemIdentifier"), !this.suppressValidationErr && !h))
        throw new Error("Missing mandatory system identifier for SYSTEM notation");
      return { notationName: a, publicIdentifier: d, systemIdentifier: h, index: --l };
    }
    readIdentifierVal(r, l, a) {
      let c = "";
      const d = r[l];
      if (d !== '"' && d !== "'")
        throw new Error(`Expected quoted string, found "${d}"`);
      for (l++; l < r.length && r[l] !== d; )
        c += r[l], l++;
      if (r[l] !== d)
        throw new Error(`Unterminated ${a} value`);
      return l++, [l, c];
    }
    readElementExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        a += r[l], l++;
      if (!this.suppressValidationErr && !o.isName(a))
        throw new Error(`Invalid element name: "${a}"`);
      l = t(r, l);
      let c = "";
      if (r[l] === "E" && n(r, "MPTY", l))
        l += 4;
      else if (r[l] === "A" && n(r, "NY", l))
        l += 2;
      else if (r[l] === "(") {
        for (l++; l < r.length && r[l] !== ")"; )
          c += r[l], l++;
        if (r[l] !== ")")
          throw new Error("Unterminated content model");
      } else if (!this.suppressValidationErr)
        throw new Error(`Invalid Element Expression, found "${r[l]}"`);
      return {
        elementName: a,
        contentModel: c.trim(),
        index: l
      };
    }
    readAttlistExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        a += r[l], l++;
      s(a), l = t(r, l);
      let c = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        c += r[l], l++;
      if (!s(c))
        throw new Error(`Invalid attribute name: "${c}"`);
      l = t(r, l);
      let d = "";
      if (r.substring(l, l + 8).toUpperCase() === "NOTATION") {
        if (d = "NOTATION", l += 8, l = t(r, l), r[l] !== "(")
          throw new Error(`Expected '(', found "${r[l]}"`);
        l++;
        let f = [];
        for (; l < r.length && r[l] !== ")"; ) {
          let u = "";
          for (; l < r.length && r[l] !== "|" && r[l] !== ")"; )
            u += r[l], l++;
          if (u = u.trim(), !s(u))
            throw new Error(`Invalid notation name: "${u}"`);
          f.push(u), r[l] === "|" && (l++, l = t(r, l));
        }
        if (r[l] !== ")")
          throw new Error("Unterminated list of notations");
        l++, d += " (" + f.join("|") + ")";
      } else {
        for (; l < r.length && !/\s/.test(r[l]); )
          d += r[l], l++;
        const f = ["CDATA", "ID", "IDREF", "IDREFS", "ENTITY", "ENTITIES", "NMTOKEN", "NMTOKENS"];
        if (!this.suppressValidationErr && !f.includes(d.toUpperCase()))
          throw new Error(`Invalid attribute type: "${d}"`);
      }
      l = t(r, l);
      let h = "";
      return r.substring(l, l + 8).toUpperCase() === "#REQUIRED" ? (h = "#REQUIRED", l += 8) : r.substring(l, l + 7).toUpperCase() === "#IMPLIED" ? (h = "#IMPLIED", l += 7) : [l, h] = this.readIdentifierVal(r, l, "ATTLIST"), {
        elementName: a,
        attributeName: c,
        attributeType: d,
        defaultValue: h,
        index: l
      };
    }
  }
  const t = (i, r) => {
    for (; r < i.length && /\s/.test(i[r]); )
      r++;
    return r;
  };
  function n(i, r, l) {
    for (let a = 0; a < r.length; a++)
      if (r[a] !== i[l + a + 1]) return !1;
    return !0;
  }
  function s(i) {
    if (o.isName(i))
      return i;
    throw new Error(`Invalid entity name ${i}`);
  }
  return Yn = e, Yn;
}
var Xn, Ms;
function La() {
  if (Ms) return Xn;
  Ms = 1;
  const o = /^[-+]?0x[a-fA-F0-9]+$/, e = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, t = {
    hex: !0,
    // oct: false,
    leadingZeros: !0,
    decimalPoint: ".",
    eNotation: !0
    //skipLike: /regex/
  };
  function n(r, l = {}) {
    if (l = Object.assign({}, t, l), !r || typeof r != "string") return r;
    let a = r.trim();
    if (l.skipLike !== void 0 && l.skipLike.test(a)) return r;
    if (r === "0") return 0;
    if (l.hex && o.test(a))
      return i(a, 16);
    if (a.search(/[eE]/) !== -1) {
      const c = a.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);
      if (c) {
        if (l.leadingZeros)
          a = (c[1] || "") + c[3];
        else if (!(c[2] === "0" && c[3][0] === ".")) return r;
        return l.eNotation ? Number(a) : r;
      } else
        return r;
    } else {
      const c = e.exec(a);
      if (c) {
        const d = c[1], h = c[2];
        let f = s(c[3]);
        if (!l.leadingZeros && h.length > 0 && d && a[2] !== ".") return r;
        if (!l.leadingZeros && h.length > 0 && !d && a[1] !== ".") return r;
        if (l.leadingZeros && h === r) return 0;
        {
          const u = Number(a), p = "" + u;
          return p.search(/[eE]/) !== -1 ? l.eNotation ? u : r : a.indexOf(".") !== -1 ? p === "0" && f === "" || p === f || d && p === "-" + f ? u : r : h ? f === p || d + f === p ? u : r : a === p || a === d + p ? u : r;
        }
      } else
        return r;
    }
  }
  function s(r) {
    return r && r.indexOf(".") !== -1 && (r = r.replace(/0+$/, ""), r === "." ? r = "0" : r[0] === "." ? r = "0" + r : r[r.length - 1] === "." && (r = r.substr(0, r.length - 1))), r;
  }
  function i(r, l) {
    if (parseInt) return parseInt(r, l);
    if (Number.parseInt) return Number.parseInt(r, l);
    if (window && window.parseInt) return window.parseInt(r, l);
    throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
  }
  return Xn = n, Xn;
}
var Gn, Is;
function Kr() {
  if (Is) return Gn;
  Is = 1;
  function o(e) {
    return typeof e == "function" ? e : Array.isArray(e) ? (t) => {
      for (const n of e)
        if (typeof n == "string" && t === n || n instanceof RegExp && n.test(t))
          return !0;
    } : () => !1;
  }
  return Gn = o, Gn;
}
var Kn, As;
function Na() {
  if (As) return Kn;
  As = 1;
  const o = An(), e = Ra(), t = Fa(), n = La(), s = Kr();
  class i {
    constructor(M) {
      if (this.options = M, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = {
        apos: { regex: /&(apos|#39|#x27);/g, val: "'" },
        gt: { regex: /&(gt|#62|#x3E);/g, val: ">" },
        lt: { regex: /&(lt|#60|#x3C);/g, val: "<" },
        quot: { regex: /&(quot|#34|#x22);/g, val: '"' }
      }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = {
        space: { regex: /&(nbsp|#160);/g, val: " " },
        // "lt" : { regex: /&(lt|#60);/g, val: "<" },
        // "gt" : { regex: /&(gt|#62);/g, val: ">" },
        // "amp" : { regex: /&(amp|#38);/g, val: "&" },
        // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
        // "apos" : { regex: /&(apos|#39);/g, val: "'" },
        cent: { regex: /&(cent|#162);/g, val: "¢" },
        pound: { regex: /&(pound|#163);/g, val: "£" },
        yen: { regex: /&(yen|#165);/g, val: "¥" },
        euro: { regex: /&(euro|#8364);/g, val: "€" },
        copyright: { regex: /&(copy|#169);/g, val: "©" },
        reg: { regex: /&(reg|#174);/g, val: "®" },
        inr: { regex: /&(inr|#8377);/g, val: "₹" },
        num_dec: { regex: /&#([0-9]{1,7});/g, val: (E, $) => x($, 10, "&#") },
        num_hex: { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (E, $) => x($, 16, "&#x") }
      }, this.addExternalEntities = r, this.parseXml = h, this.parseTextData = l, this.resolveNameSpace = a, this.buildAttributesMap = d, this.isItStopNode = g, this.replaceEntitiesValue = u, this.readStopNodeData = w, this.saveTextToParentTag = p, this.addChild = f, this.ignoreAttributesFn = s(this.options.ignoreAttributes), this.entityExpansionCount = 0, this.currentExpandedLength = 0, this.options.stopNodes && this.options.stopNodes.length > 0) {
        this.stopNodesExact = /* @__PURE__ */ new Set(), this.stopNodesWildcard = /* @__PURE__ */ new Set();
        for (let E = 0; E < this.options.stopNodes.length; E++) {
          const $ = this.options.stopNodes[E];
          typeof $ == "string" && ($.startsWith("*.") ? this.stopNodesWildcard.add($.substring(2)) : this.stopNodesExact.add($));
        }
      }
    }
  }
  function r(k) {
    const M = Object.keys(k);
    for (let E = 0; E < M.length; E++) {
      const $ = M[E], T = $.replace(/[.\-+*:]/g, "\\.");
      this.lastEntities[$] = {
        regex: new RegExp("&" + T + ";", "g"),
        val: k[$]
      };
    }
  }
  function l(k, M, E, $, T, I, A) {
    if (k !== void 0 && (this.options.trimValues && !$ && (k = k.trim()), k.length > 0)) {
      A || (k = this.replaceEntitiesValue(k, M, E));
      const L = this.options.tagValueProcessor(M, k, E, T, I);
      return L == null ? k : typeof L != typeof k || L !== k ? L : this.options.trimValues ? v(k, this.options.parseTagValue, this.options.numberParseOptions) : k.trim() === k ? v(k, this.options.parseTagValue, this.options.numberParseOptions) : k;
    }
  }
  function a(k) {
    if (this.options.removeNSPrefix) {
      const M = k.split(":"), E = k.charAt(0) === "/" ? "/" : "";
      if (M[0] === "xmlns")
        return "";
      M.length === 2 && (k = E + M[1]);
    }
    return k;
  }
  const c = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
  function d(k, M, E) {
    if (this.options.ignoreAttributes !== !0 && typeof k == "string") {
      const $ = o.getAllMatches(k, c), T = $.length, I = {};
      for (let A = 0; A < T; A++) {
        const L = this.resolveNameSpace($[A][1]);
        if (this.ignoreAttributesFn(L, M))
          continue;
        let N = $[A][4], F = this.options.attributeNamePrefix + L;
        if (L.length)
          if (this.options.transformAttributeName && (F = this.options.transformAttributeName(F)), F = S(F, this.options), N !== void 0) {
            this.options.trimValues && (N = N.trim()), N = this.replaceEntitiesValue(N, E, M);
            const H = this.options.attributeValueProcessor(L, N, M);
            H == null ? I[F] = N : typeof H != typeof N || H !== N ? I[F] = H : I[F] = v(
              N,
              this.options.parseAttributeValue,
              this.options.numberParseOptions
            );
          } else this.options.allowBooleanAttributes && (I[F] = !0);
      }
      if (!Object.keys(I).length)
        return;
      if (this.options.attributesGroupName) {
        const A = {};
        return A[this.options.attributesGroupName] = I, A;
      }
      return I;
    }
  }
  const h = function(k) {
    k = k.replace(/\r\n?/g, `
`);
    const M = new e("!xml");
    let E = M, $ = "", T = "";
    this.entityExpansionCount = 0, this.currentExpandedLength = 0;
    const I = new t(this.options.processEntities);
    for (let A = 0; A < k.length; A++)
      if (k[A] === "<")
        if (k[A + 1] === "/") {
          const N = m(k, ">", A, "Closing Tag is not closed.");
          let F = k.substring(A + 2, N).trim();
          if (this.options.removeNSPrefix) {
            const B = F.indexOf(":");
            B !== -1 && (F = F.substr(B + 1));
          }
          this.options.transformTagName && (F = this.options.transformTagName(F)), E && ($ = this.saveTextToParentTag($, E, T));
          const H = T.substring(T.lastIndexOf(".") + 1);
          if (F && this.options.unpairedTags.indexOf(F) !== -1)
            throw new Error(`Unpaired tag can not be used as closing tag: </${F}>`);
          let D = 0;
          H && this.options.unpairedTags.indexOf(H) !== -1 ? (D = T.lastIndexOf(".", T.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : D = T.lastIndexOf("."), T = T.substring(0, D), E = this.tagsNodeStack.pop(), $ = "", A = N;
        } else if (k[A + 1] === "?") {
          let N = y(k, A, !1, "?>");
          if (!N) throw new Error("Pi Tag is not closed.");
          if ($ = this.saveTextToParentTag($, E, T), !(this.options.ignoreDeclaration && N.tagName === "?xml" || this.options.ignorePiTags)) {
            const F = new e(N.tagName);
            F.add(this.options.textNodeName, ""), N.tagName !== N.tagExp && N.attrExpPresent && (F[":@"] = this.buildAttributesMap(N.tagExp, T, N.tagName)), this.addChild(E, F, T, A);
          }
          A = N.closeIndex + 1;
        } else if (k.substr(A + 1, 3) === "!--") {
          const N = m(k, "-->", A + 4, "Comment is not closed.");
          if (this.options.commentPropName) {
            const F = k.substring(A + 4, N - 2);
            $ = this.saveTextToParentTag($, E, T), E.add(this.options.commentPropName, [{ [this.options.textNodeName]: F }]);
          }
          A = N;
        } else if (k.substr(A + 1, 2) === "!D") {
          const N = I.readDocType(k, A);
          this.docTypeEntities = N.entities, A = N.i;
        } else if (k.substr(A + 1, 2) === "![") {
          const N = m(k, "]]>", A, "CDATA is not closed.") - 2, F = k.substring(A + 9, N);
          $ = this.saveTextToParentTag($, E, T);
          let H = this.parseTextData(F, E.tagname, T, !0, !1, !0, !0);
          H == null && (H = ""), this.options.cdataPropName ? E.add(this.options.cdataPropName, [{ [this.options.textNodeName]: F }]) : E.add(this.options.textNodeName, H), A = N + 2;
        } else {
          let N = y(k, A, this.options.removeNSPrefix), F = N.tagName;
          const H = N.rawTagName;
          let D = N.tagExp, B = N.attrExpPresent, X = N.closeIndex;
          if (this.options.transformTagName) {
            const U = this.options.transformTagName(F);
            D === F && (D = U), F = U;
          }
          if (this.options.strictReservedNames && (F === this.options.commentPropName || F === this.options.cdataPropName || F === this.options.textNodeName || F === this.options.attributesGroupName))
            throw new Error(`Invalid tag name: ${F}`);
          E && $ && E.tagname !== "!xml" && ($ = this.saveTextToParentTag($, E, T, !1));
          const j = E;
          j && this.options.unpairedTags.indexOf(j.tagname) !== -1 && (E = this.tagsNodeStack.pop(), T = T.substring(0, T.lastIndexOf("."))), F !== M.tagname && (T += T ? "." + F : F);
          const ne = A;
          if (this.isItStopNode(this.stopNodesExact, this.stopNodesWildcard, T, F)) {
            let U = "";
            if (D.length > 0 && D.lastIndexOf("/") === D.length - 1)
              F[F.length - 1] === "/" ? (F = F.substr(0, F.length - 1), T = T.substr(0, T.length - 1), D = F) : D = D.substr(0, D.length - 1), A = N.closeIndex;
            else if (this.options.unpairedTags.indexOf(F) !== -1)
              A = N.closeIndex;
            else {
              const V = this.readStopNodeData(k, H, X + 1);
              if (!V) throw new Error(`Unexpected end of ${H}`);
              A = V.i, U = V.tagContent;
            }
            const Q = new e(F);
            F !== D && B && (Q[":@"] = this.buildAttributesMap(D, T, F)), U && (U = this.parseTextData(U, F, T, !0, B, !0, !0)), T = T.substr(0, T.lastIndexOf(".")), Q.add(this.options.textNodeName, U), this.addChild(E, Q, T, ne);
          } else {
            if (D.length > 0 && D.lastIndexOf("/") === D.length - 1) {
              if (F[F.length - 1] === "/" ? (F = F.substr(0, F.length - 1), T = T.substr(0, T.length - 1), D = F) : D = D.substr(0, D.length - 1), this.options.transformTagName) {
                const Q = this.options.transformTagName(F);
                D === F && (D = Q), F = Q;
              }
              const U = new e(F);
              F !== D && B && (U[":@"] = this.buildAttributesMap(D, T, F)), this.addChild(E, U, T, ne), T = T.substr(0, T.lastIndexOf("."));
            } else if (this.options.unpairedTags.indexOf(F) !== -1) {
              const U = new e(F);
              F !== D && B && (U[":@"] = this.buildAttributesMap(D, T)), this.addChild(E, U, T, ne), T = T.substr(0, T.lastIndexOf(".")), A = N.closeIndex;
              continue;
            } else {
              const U = new e(F);
              if (this.tagsNodeStack.length > this.options.maxNestedTags)
                throw new Error("Maximum nested tags exceeded");
              this.tagsNodeStack.push(E), F !== D && B && (U[":@"] = this.buildAttributesMap(D, T, F)), this.addChild(E, U, T), E = U;
            }
            $ = "", A = X;
          }
        }
      else
        $ += k[A];
    return M.child;
  };
  function f(k, M, E, $) {
    this.options.captureMetaData || ($ = void 0);
    const T = this.options.updateTag(M.tagname, E, M[":@"]);
    T === !1 || (typeof T == "string" && (M.tagname = T), k.addChild(M, $));
  }
  const u = function(k, M, E) {
    if (k.indexOf("&") === -1)
      return k;
    const $ = this.options.processEntities;
    if (!$.enabled || $.allowedTags && !$.allowedTags.includes(M) || $.tagFilter && !$.tagFilter(M, E))
      return k;
    for (let T in this.docTypeEntities) {
      const I = this.docTypeEntities[T], A = k.match(I.regx);
      if (A) {
        if (this.entityExpansionCount += A.length, $.maxTotalExpansions && this.entityExpansionCount > $.maxTotalExpansions)
          throw new Error(
            `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${$.maxTotalExpansions}`
          );
        const L = k.length;
        if (k = k.replace(I.regx, I.val), $.maxExpandedLength && (this.currentExpandedLength += k.length - L, this.currentExpandedLength > $.maxExpandedLength))
          throw new Error(
            `Total expanded content size exceeded: ${this.currentExpandedLength} > ${$.maxExpandedLength}`
          );
      }
    }
    if (k.indexOf("&") === -1) return k;
    for (const T of Object.keys(this.lastEntities)) {
      const I = this.lastEntities[T], A = k.match(I.regex);
      if (A && (this.entityExpansionCount += A.length, $.maxTotalExpansions && this.entityExpansionCount > $.maxTotalExpansions))
        throw new Error(
          `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${$.maxTotalExpansions}`
        );
      k = k.replace(I.regex, I.val);
    }
    if (k.indexOf("&") === -1) return k;
    if (this.options.htmlEntities)
      for (const T of Object.keys(this.htmlEntities)) {
        const I = this.htmlEntities[T], A = k.match(I.regex);
        if (A && (this.entityExpansionCount += A.length, $.maxTotalExpansions && this.entityExpansionCount > $.maxTotalExpansions))
          throw new Error(
            `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${$.maxTotalExpansions}`
          );
        k = k.replace(I.regex, I.val);
      }
    return k = k.replace(this.ampEntity.regex, this.ampEntity.val), k;
  };
  function p(k, M, E, $) {
    return k && ($ === void 0 && ($ = M.child.length === 0), k = this.parseTextData(
      k,
      M.tagname,
      E,
      !1,
      M[":@"] ? Object.keys(M[":@"]).length !== 0 : !1,
      $
    ), k !== void 0 && k !== "" && M.add(this.options.textNodeName, k), k = ""), k;
  }
  function g(k, M, E, $) {
    return !!(M && M.has($) || k && k.has(E));
  }
  function b(k, M, E = ">") {
    let $, T = "";
    for (let I = M; I < k.length; I++) {
      let A = k[I];
      if ($)
        A === $ && ($ = "");
      else if (A === '"' || A === "'")
        $ = A;
      else if (A === E[0])
        if (E[1]) {
          if (k[I + 1] === E[1])
            return {
              data: T,
              index: I
            };
        } else
          return {
            data: T,
            index: I
          };
      else A === "	" && (A = " ");
      T += A;
    }
  }
  function m(k, M, E, $) {
    const T = k.indexOf(M, E);
    if (T === -1)
      throw new Error($);
    return T + M.length - 1;
  }
  function y(k, M, E, $ = ">") {
    const T = b(k, M + 1, $);
    if (!T) return;
    let I = T.data;
    const A = T.index, L = I.search(/\s/);
    let N = I, F = !0;
    L !== -1 && (N = I.substring(0, L), I = I.substring(L + 1).trimStart());
    const H = N;
    if (E) {
      const D = N.indexOf(":");
      D !== -1 && (N = N.substr(D + 1), F = N !== T.data.substr(D + 1));
    }
    return {
      tagName: N,
      tagExp: I,
      closeIndex: A,
      attrExpPresent: F,
      rawTagName: H
    };
  }
  function w(k, M, E) {
    const $ = E;
    let T = 1;
    for (; E < k.length; E++)
      if (k[E] === "<")
        if (k[E + 1] === "/") {
          const I = m(k, ">", E, `${M} is not closed`);
          if (k.substring(E + 2, I).trim() === M && (T--, T === 0))
            return {
              tagContent: k.substring($, E),
              i: I
            };
          E = I;
        } else if (k[E + 1] === "?")
          E = m(k, "?>", E + 1, "StopNode is not closed.");
        else if (k.substr(E + 1, 3) === "!--")
          E = m(k, "-->", E + 3, "StopNode is not closed.");
        else if (k.substr(E + 1, 2) === "![")
          E = m(k, "]]>", E, "StopNode is not closed.") - 2;
        else {
          const I = y(k, E, ">");
          I && ((I && I.tagName) === M && I.tagExp[I.tagExp.length - 1] !== "/" && T++, E = I.closeIndex);
        }
  }
  function v(k, M, E) {
    if (M && typeof k == "string") {
      const $ = k.trim();
      return $ === "true" ? !0 : $ === "false" ? !1 : n(k, E);
    } else
      return o.isExist(k) ? k : "";
  }
  function x(k, M, E) {
    const $ = Number.parseInt(k, M);
    return $ >= 0 && $ <= 1114111 ? String.fromCodePoint($) : E + k + ";";
  }
  function S(k, M) {
    if (o.criticalProperties.includes(k))
      throw new Error(`[SECURITY] Invalid name: "${k}" is a reserved JavaScript keyword that could cause prototype pollution`);
    return o.DANGEROUS_PROPERTY_NAMES.includes(k) ? M.onDangerousProperty(k) : k;
  }
  return Kn = i, Kn;
}
var Jn = {}, Rs;
function Pa() {
  if (Rs) return Jn;
  Rs = 1;
  function o(i, r) {
    return e(i, r);
  }
  function e(i, r, l) {
    let a;
    const c = {};
    for (let d = 0; d < i.length; d++) {
      const h = i[d], f = t(h);
      let u = "";
      if (l === void 0 ? u = f : u = l + "." + f, f === r.textNodeName)
        a === void 0 ? a = h[f] : a += "" + h[f];
      else {
        if (f === void 0)
          continue;
        if (h[f]) {
          let p = e(h[f], r, u);
          const g = s(p, r);
          h[":@"] ? n(p, h[":@"], u, r) : Object.keys(p).length === 1 && p[r.textNodeName] !== void 0 && !r.alwaysCreateTextNode ? p = p[r.textNodeName] : Object.keys(p).length === 0 && (r.alwaysCreateTextNode ? p[r.textNodeName] = "" : p = ""), c[f] !== void 0 && c.hasOwnProperty(f) ? (Array.isArray(c[f]) || (c[f] = [c[f]]), c[f].push(p)) : r.isArray(f, u, g) ? c[f] = [p] : c[f] = p;
        }
      }
    }
    return typeof a == "string" ? a.length > 0 && (c[r.textNodeName] = a) : a !== void 0 && (c[r.textNodeName] = a), c;
  }
  function t(i) {
    const r = Object.keys(i);
    for (let l = 0; l < r.length; l++) {
      const a = r[l];
      if (a !== ":@") return a;
    }
  }
  function n(i, r, l, a) {
    if (r) {
      const c = Object.keys(r), d = c.length;
      for (let h = 0; h < d; h++) {
        const f = c[h];
        a.isArray(f, l + "." + f, !0, !0) ? i[f] = [r[f]] : i[f] = r[f];
      }
    }
  }
  function s(i, r) {
    const { textNodeName: l } = r, a = Object.keys(i).length;
    return !!(a === 0 || a === 1 && (i[l] || typeof i[l] == "boolean" || i[l] === 0));
  }
  return Jn.prettify = o, Jn;
}
var Zn, Fs;
function Oa() {
  if (Fs) return Zn;
  Fs = 1;
  const { buildOptions: o } = Aa(), e = Na(), { prettify: t } = Pa(), n = Gr();
  class s {
    constructor(r) {
      this.externalEntities = {}, this.options = o(r);
    }
    /**
     * Parse XML dats to JS object 
     * @param {string|Buffer} xmlData 
     * @param {boolean|Object} validationOption 
     */
    parse(r, l) {
      if (typeof r != "string") if (r.toString)
        r = r.toString();
      else
        throw new Error("XML data is accepted in String or Bytes[] form.");
      if (l) {
        l === !0 && (l = {});
        const d = n.validate(r, l);
        if (d !== !0)
          throw Error(`${d.err.msg}:${d.err.line}:${d.err.col}`);
      }
      const a = new e(this.options);
      a.addExternalEntities(this.externalEntities);
      const c = a.parseXml(r);
      return this.options.preserveOrder || c === void 0 ? c : t(c, this.options);
    }
    /**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */
    addEntity(r, l) {
      if (l.indexOf("&") !== -1)
        throw new Error("Entity value can't have '&'");
      if (r.indexOf("&") !== -1 || r.indexOf(";") !== -1)
        throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
      if (l === "&")
        throw new Error("An entity with value '&' is not permitted");
      this.externalEntities[r] = l;
    }
  }
  return Zn = s, Zn;
}
var Qn, Ls;
function Ha() {
  if (Ls) return Qn;
  Ls = 1;
  const o = `
`;
  function e(l, a) {
    let c = "";
    return a.format && a.indentBy.length > 0 && (c = o), t(l, a, "", c);
  }
  function t(l, a, c, d) {
    let h = "", f = !1;
    if (!Array.isArray(l)) {
      if (l != null) {
        let u = l.toString();
        return u = r(u, a), u;
      }
      return "";
    }
    for (let u = 0; u < l.length; u++) {
      const p = l[u], g = n(p);
      if (g === void 0) continue;
      let b = "";
      if (c.length === 0 ? b = g : b = `${c}.${g}`, g === a.textNodeName) {
        let x = p[g];
        i(b, a) || (x = a.tagValueProcessor(g, x), x = r(x, a)), f && (h += d), h += x, f = !1;
        continue;
      } else if (g === a.cdataPropName) {
        f && (h += d), h += `<![CDATA[${p[g][0][a.textNodeName]}]]>`, f = !1;
        continue;
      } else if (g === a.commentPropName) {
        h += d + `<!--${p[g][0][a.textNodeName]}-->`, f = !0;
        continue;
      } else if (g[0] === "?") {
        const x = s(p[":@"], a), S = g === "?xml" ? "" : d;
        let k = p[g][0][a.textNodeName];
        k = k.length !== 0 ? " " + k : "", h += S + `<${g}${k}${x}?>`, f = !0;
        continue;
      }
      let m = d;
      m !== "" && (m += a.indentBy);
      const y = s(p[":@"], a), w = d + `<${g}${y}`, v = t(p[g], a, b, m);
      a.unpairedTags.indexOf(g) !== -1 ? a.suppressUnpairedNode ? h += w + ">" : h += w + "/>" : (!v || v.length === 0) && a.suppressEmptyNode ? h += w + "/>" : v && v.endsWith(">") ? h += w + `>${v}${d}</${g}>` : (h += w + ">", v && d !== "" && (v.includes("/>") || v.includes("</")) ? h += d + a.indentBy + v + d : h += v, h += `</${g}>`), f = !0;
    }
    return h;
  }
  function n(l) {
    const a = Object.keys(l);
    for (let c = 0; c < a.length; c++) {
      const d = a[c];
      if (Object.prototype.hasOwnProperty.call(l, d) && d !== ":@")
        return d;
    }
  }
  function s(l, a) {
    let c = "";
    if (l && !a.ignoreAttributes)
      for (let d in l) {
        if (!Object.prototype.hasOwnProperty.call(l, d)) continue;
        let h = a.attributeValueProcessor(d, l[d]);
        h = r(h, a), h === !0 && a.suppressBooleanAttributes ? c += ` ${d.substr(a.attributeNamePrefix.length)}` : c += ` ${d.substr(a.attributeNamePrefix.length)}="${h}"`;
      }
    return c;
  }
  function i(l, a) {
    l = l.substr(0, l.length - a.textNodeName.length - 1);
    let c = l.substr(l.lastIndexOf(".") + 1);
    for (let d in a.stopNodes)
      if (a.stopNodes[d] === l || a.stopNodes[d] === "*." + c) return !0;
    return !1;
  }
  function r(l, a) {
    if (l && l.length > 0 && a.processEntities)
      for (let c = 0; c < a.entities.length; c++) {
        const d = a.entities[c];
        l = l.replace(d.regex, d.val);
      }
    return l;
  }
  return Qn = e, Qn;
}
var eo, Ns;
function Da() {
  if (Ns) return eo;
  Ns = 1;
  const o = Ha(), e = Kr(), t = {
    attributeNamePrefix: "@_",
    attributesGroupName: !1,
    textNodeName: "#text",
    ignoreAttributes: !0,
    cdataPropName: !1,
    format: !1,
    indentBy: "  ",
    suppressEmptyNode: !1,
    suppressUnpairedNode: !0,
    suppressBooleanAttributes: !0,
    tagValueProcessor: function(l, a) {
      return a;
    },
    attributeValueProcessor: function(l, a) {
      return a;
    },
    preserveOrder: !1,
    commentPropName: !1,
    unpairedTags: [],
    entities: [
      { regex: new RegExp("&", "g"), val: "&amp;" },
      //it must be on top
      { regex: new RegExp(">", "g"), val: "&gt;" },
      { regex: new RegExp("<", "g"), val: "&lt;" },
      { regex: new RegExp("'", "g"), val: "&apos;" },
      { regex: new RegExp('"', "g"), val: "&quot;" }
    ],
    processEntities: !0,
    stopNodes: [],
    // transformTagName: false,
    // transformAttributeName: false,
    oneListGroup: !1
  };
  function n(l) {
    this.options = Object.assign({}, t, l), this.options.ignoreAttributes === !0 || this.options.attributesGroupName ? this.isAttribute = function() {
      return !1;
    } : (this.ignoreAttributesFn = e(this.options.ignoreAttributes), this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = r), this.processTextOrObjNode = s, this.options.format ? (this.indentate = i, this.tagEndChar = `>
`, this.newLine = `
`) : (this.indentate = function() {
      return "";
    }, this.tagEndChar = ">", this.newLine = "");
  }
  n.prototype.build = function(l) {
    return this.options.preserveOrder ? o(l, this.options) : (Array.isArray(l) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (l = {
      [this.options.arrayNodeName]: l
    }), this.j2x(l, 0, []).val);
  }, n.prototype.j2x = function(l, a, c) {
    let d = "", h = "";
    const f = c.join(".");
    for (let u in l)
      if (Object.prototype.hasOwnProperty.call(l, u))
        if (typeof l[u] == "undefined")
          this.isAttribute(u) && (h += "");
        else if (l[u] === null)
          this.isAttribute(u) || u === this.options.cdataPropName ? h += "" : u[0] === "?" ? h += this.indentate(a) + "<" + u + "?" + this.tagEndChar : h += this.indentate(a) + "<" + u + "/" + this.tagEndChar;
        else if (l[u] instanceof Date)
          h += this.buildTextValNode(l[u], u, "", a);
        else if (typeof l[u] != "object") {
          const p = this.isAttribute(u);
          if (p && !this.ignoreAttributesFn(p, f))
            d += this.buildAttrPairStr(p, "" + l[u]);
          else if (!p)
            if (u === this.options.textNodeName) {
              let g = this.options.tagValueProcessor(u, "" + l[u]);
              h += this.replaceEntitiesValue(g);
            } else
              h += this.buildTextValNode(l[u], u, "", a);
        } else if (Array.isArray(l[u])) {
          const p = l[u].length;
          let g = "", b = "";
          for (let m = 0; m < p; m++) {
            const y = l[u][m];
            if (typeof y != "undefined") if (y === null)
              u[0] === "?" ? h += this.indentate(a) + "<" + u + "?" + this.tagEndChar : h += this.indentate(a) + "<" + u + "/" + this.tagEndChar;
            else if (typeof y == "object")
              if (this.options.oneListGroup) {
                const w = this.j2x(y, a + 1, c.concat(u));
                g += w.val, this.options.attributesGroupName && y.hasOwnProperty(this.options.attributesGroupName) && (b += w.attrStr);
              } else
                g += this.processTextOrObjNode(y, u, a, c);
            else if (this.options.oneListGroup) {
              let w = this.options.tagValueProcessor(u, y);
              w = this.replaceEntitiesValue(w), g += w;
            } else
              g += this.buildTextValNode(y, u, "", a);
          }
          this.options.oneListGroup && (g = this.buildObjectNode(g, u, b, a)), h += g;
        } else if (this.options.attributesGroupName && u === this.options.attributesGroupName) {
          const p = Object.keys(l[u]), g = p.length;
          for (let b = 0; b < g; b++)
            d += this.buildAttrPairStr(p[b], "" + l[u][p[b]]);
        } else
          h += this.processTextOrObjNode(l[u], u, a, c);
    return { attrStr: d, val: h };
  }, n.prototype.buildAttrPairStr = function(l, a) {
    return a = this.options.attributeValueProcessor(l, "" + a), a = this.replaceEntitiesValue(a), this.options.suppressBooleanAttributes && a === "true" ? " " + l : " " + l + '="' + a + '"';
  };
  function s(l, a, c, d) {
    const h = this.j2x(l, c + 1, d.concat(a));
    return l[this.options.textNodeName] !== void 0 && Object.keys(l).length === 1 ? this.buildTextValNode(l[this.options.textNodeName], a, h.attrStr, c) : this.buildObjectNode(h.val, a, h.attrStr, c);
  }
  n.prototype.buildObjectNode = function(l, a, c, d) {
    if (l === "")
      return a[0] === "?" ? this.indentate(d) + "<" + a + c + "?" + this.tagEndChar : this.indentate(d) + "<" + a + c + this.closeTag(a) + this.tagEndChar;
    {
      let h = "</" + a + this.tagEndChar, f = "";
      return a[0] === "?" && (f = "?", h = ""), (c || c === "") && l.indexOf("<") === -1 ? this.indentate(d) + "<" + a + c + f + ">" + l + h : this.options.commentPropName !== !1 && a === this.options.commentPropName && f.length === 0 ? this.indentate(d) + `<!--${l}-->` + this.newLine : this.indentate(d) + "<" + a + c + f + this.tagEndChar + l + this.indentate(d) + h;
    }
  }, n.prototype.closeTag = function(l) {
    let a = "";
    return this.options.unpairedTags.indexOf(l) !== -1 ? this.options.suppressUnpairedNode || (a = "/") : this.options.suppressEmptyNode ? a = "/" : a = `></${l}`, a;
  }, n.prototype.buildTextValNode = function(l, a, c, d) {
    if (this.options.cdataPropName !== !1 && a === this.options.cdataPropName)
      return this.indentate(d) + `<![CDATA[${l}]]>` + this.newLine;
    if (this.options.commentPropName !== !1 && a === this.options.commentPropName)
      return this.indentate(d) + `<!--${l}-->` + this.newLine;
    if (a[0] === "?")
      return this.indentate(d) + "<" + a + c + "?" + this.tagEndChar;
    {
      let h = this.options.tagValueProcessor(a, l);
      return h = this.replaceEntitiesValue(h), h === "" ? this.indentate(d) + "<" + a + c + this.closeTag(a) + this.tagEndChar : this.indentate(d) + "<" + a + c + ">" + h + "</" + a + this.tagEndChar;
    }
  }, n.prototype.replaceEntitiesValue = function(l) {
    if (l && l.length > 0 && this.options.processEntities)
      for (let a = 0; a < this.options.entities.length; a++) {
        const c = this.options.entities[a];
        l = l.replace(c.regex, c.val);
      }
    return l;
  };
  function i(l) {
    return this.options.indentBy.repeat(l);
  }
  function r(l) {
    return l.startsWith(this.options.attributeNamePrefix) && l !== this.options.textNodeName ? l.substr(this.attrPrefixLen) : !1;
  }
  return eo = n, eo;
}
var to, Ps;
function za() {
  if (Ps) return to;
  Ps = 1;
  const o = Gr(), e = Oa(), t = Da();
  return to = {
    XMLParser: e,
    XMLValidator: o,
    XMLBuilder: t
  }, to;
}
var Ba = za();
const Wa = new Ba.XMLParser({
  ignoreAttributes: !1,
  attributeNamePrefix: "@_",
  removeNSPrefix: !0,
  // 去掉命名空间前缀(a: / c: / xdr:)，统一节点名
  allowBooleanAttributes: !0,
  parseAttributeValue: !0,
  trimValues: !0,
  // 放宽实体展开上限:大表(几百个 DISPIMG 格,每个含 &quot;)会超 fxp 默认 1000 上限而抛错,
  // 导致 drawing-parser / row-meta 在大表上静默失败。本地解析可信 xlsx,放宽到足够大。
  processEntities: {
    enabled: !0,
    maxEntitySize: 1e7,
    maxTotalExpansions: 1e8,
    maxExpandedLength: 1e8,
    maxEntityCount: 1e7
  }
});
function Ua(o) {
  const e = Ye(new Uint8Array(o)), t = /* @__PURE__ */ new Map(), n = (s) => s.replace(/^\//, "");
  return {
    files: e,
    bytes(s) {
      return e[n(s)];
    },
    text(s) {
      const i = e[n(s)];
      return i ? Z(i) : void 0;
    },
    parse(s) {
      const i = n(s);
      if (t.has(i)) return t.get(i);
      const r = e[i];
      if (!r) return;
      const l = Wa.parse(Z(r));
      return t.set(i, l), l;
    },
    list(s) {
      const i = n(s);
      return Object.keys(e).filter((r) => r.startsWith(i));
    }
  };
}
function Se(o, e) {
  var l;
  const t = e.includes("/") ? e.slice(0, e.lastIndexOf("/")) : "", n = t ? `${t}/_rels/${mn(e)}.rels` : `_rels/${mn(e)}.rels`, s = o.parse(n), i = {};
  if (!((l = s == null ? void 0 : s.Relationships) != null && l.Relationship)) return i;
  const r = G(s.Relationships.Relationship);
  for (const a of r) {
    const c = a["@_Id"];
    let d = a["@_Target"];
    !c || !d || (a["@_TargetMode"] === "External" ? i[c] = d : i[c] = qa(t, d));
  }
  return i;
}
function mn(o) {
  return o.slice(o.lastIndexOf("/") + 1);
}
function qa(o, e) {
  if (e.startsWith("/")) return e.slice(1);
  const t = o ? o.split("/") : [];
  for (const n of e.split("/"))
    if (n === "..") t.pop();
    else {
      if (n === "." || n === "") continue;
      t.push(n);
    }
  return t.join("/");
}
function G(o) {
  return o == null ? [] : Array.isArray(o) ? o : [o];
}
const no = [
  "#FFFFFF",
  // 0 lt1 (bg1)
  "#000000",
  // 1 dk1 (tx1)
  "#E7E6E6",
  // 2 lt2 (bg2)
  "#44546A",
  // 3 dk2 (tx2)
  "#4472C4",
  // 4 accent1
  "#ED7D31",
  // 5 accent2
  "#A5A5A5",
  // 6 accent3
  "#FFC000",
  // 7 accent4
  "#5B9BD5",
  // 8 accent5
  "#70AD47",
  // 9 accent6
  "#0563C1",
  // 10 hlink
  "#954F72"
  // 11 folHlink
];
function _a(o) {
  var e, t;
  try {
    const n = o.parse("xl/theme/theme1.xml"), s = (t = (e = n == null ? void 0 : n.theme) == null ? void 0 : e.themeElements) == null ? void 0 : t.clrScheme;
    if (!s) return [...no];
    const i = (p) => {
      if (p) {
        if (p.srgbClr) return "#" + String(p.srgbClr["@_val"]).toUpperCase();
        if (p.sysClr) {
          const g = p.sysClr["@_lastClr"];
          if (g) return "#" + String(g).toUpperCase();
        }
      }
    }, r = i(s.dk1), l = i(s.lt1), a = i(s.dk2), c = i(s.lt2), d = ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"].map(
      (p) => i(s[p])
    ), h = i(s.hlink), f = i(s.folHlink);
    return [l, r, c, a, ...d, h, f].map((p, g) => {
      var b;
      return (b = p != null ? p : no[g]) != null ? b : "#000000";
    });
  } catch (n) {
    return [...no];
  }
}
const O = (o, e) => `${o}:${e}`;
function Qo() {
  return {
    font: { name: "Calibri", size: 11, bold: !1, italic: !1, underline: !1, strike: !1, color: "#000000" },
    fill: { type: "none" },
    borders: {},
    hAlign: "general",
    vAlign: "bottom",
    wrapText: !1,
    shrinkToFit: !1,
    textRotation: 0,
    indent: 0,
    numFmt: "General"
  };
}
const Os = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#800080",
  "#008080",
  "#C0C0C0",
  "#808080",
  "#9999FF",
  "#993366",
  "#FFFFCC",
  "#CCFFFF",
  "#660066",
  "#FF8080",
  "#0066CC",
  "#CCCCFF",
  "#000080",
  "#FF00FF",
  "#FFFF00",
  "#00FFFF",
  "#800080",
  "#800000",
  "#008080",
  "#0000FF",
  "#00CCFF",
  "#CCFFFF",
  "#CCFFCC",
  "#FFFF99",
  "#99CCFF",
  "#FF99CC",
  "#CC99FF",
  "#FFCC99",
  "#3366FF",
  "#33CCCC",
  "#99CC00",
  "#FFCC00",
  "#FF9900",
  "#FF6600",
  "#666699",
  "#969696",
  "#003366",
  "#339966",
  "#003300",
  "#333300",
  "#993300",
  "#993366",
  "#333399",
  "#333333"
];
function Hs(o) {
  if (!o) return;
  let e = o.replace(/^#/, "");
  if (e.length === 8) {
    const t = parseInt(e.slice(0, 2), 16) / 255, n = parseInt(e.slice(2, 4), 16), s = parseInt(e.slice(4, 6), 16), i = parseInt(e.slice(6, 8), 16);
    return t >= 1 ? `#${e.slice(2)}` : `rgba(${n},${s},${i},${+t.toFixed(3)})`;
  }
  if (e.length === 6) return `#${e}`;
}
function Pt(o) {
  if (!o) return "";
  const e = o.trim();
  let t = /^#([0-9a-f]{3})$/i.exec(e);
  if (t) return ("#" + t[1].split("").map((s) => s + s).join("")).toUpperCase();
  if (t = /^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/i.exec(e), t) return "#" + t[1].toUpperCase();
  const n = /rgba?\(([^)]+)\)/i.exec(e);
  if (n) {
    const s = n[1].split(",").map((i) => parseInt(i.trim(), 10));
    if (s.length >= 3 && s.slice(0, 3).every((i) => Number.isFinite(i))) {
      const i = (r) => Math.max(0, Math.min(255, r)).toString(16).padStart(2, "0");
      return ("#" + i(s[0]) + i(s[1]) + i(s[2])).toUpperCase();
    }
  }
  return "";
}
function ja(o) {
  if (o >= 0 && o < Os.length) return Os[o];
}
function Va(o, e, t = 0) {
  const n = o[e];
  if (n)
    return t ? Ya(n, t) : n;
}
function Ya(o, e) {
  const t = Ga(o);
  if (!t) return o;
  const n = Ja(t.r, t.g, t.b);
  let s = n.l;
  e < 0 ? s = s * (1 + e) : s = s * (1 - e) + e;
  const i = Za(n.h, n.s, Xa(s));
  return Ka(i.r, i.g, i.b);
}
function Le(o, e) {
  var t;
  if (o) {
    if (typeof o == "string") return Hs(o);
    if (typeof o.argb == "string") return Hs(o.argb);
    if (typeof o.theme == "number") return Va(e, o.theme, (t = o.tint) != null ? t : 0);
    if (typeof o.indexed == "number") return ja(o.indexed);
  }
}
function Xa(o) {
  return Math.min(1, Math.max(0, o));
}
function Ga(o) {
  const e = /^#?([0-9a-f]{6})$/i.exec(o);
  if (!e) return null;
  const t = parseInt(e[1], 16);
  return { r: t >> 16 & 255, g: t >> 8 & 255, b: t & 255 };
}
function Ka(o, e, t) {
  const n = (s) => Math.round(s).toString(16).padStart(2, "0");
  return `#${n(o)}${n(e)}${n(t)}`;
}
function Ja(o, e, t) {
  o /= 255, e /= 255, t /= 255;
  const n = Math.max(o, e, t), s = Math.min(o, e, t);
  let i = 0, r = 0;
  const l = (n + s) / 2;
  if (n !== s) {
    const a = n - s;
    switch (r = l > 0.5 ? a / (2 - n - s) : a / (n + s), n) {
      case o:
        i = (e - t) / a + (e < t ? 6 : 0);
        break;
      case e:
        i = (t - o) / a + 2;
        break;
      default:
        i = (o - e) / a + 4;
    }
    i /= 6;
  }
  return { h: i, s: r, l };
}
function Za(o, e, t) {
  let n, s, i;
  if (e === 0)
    n = s = i = t;
  else {
    const r = (c, d, h) => (h < 0 && (h += 1), h > 1 && (h -= 1), h < 0.16666666666666666 ? c + (d - c) * 6 * h : h < 0.5 ? d : h < 0.6666666666666666 ? c + (d - c) * (0.6666666666666666 - h) * 6 : c), l = t < 0.5 ? t * (1 + e) : t + e - t * e, a = 2 * t - l;
    n = r(a, l, o + 1 / 3), s = r(a, l, o), i = r(a, l, o - 1 / 3);
  }
  return { r: n * 255, g: s * 255, b: i * 255 };
}
const es = 7, Rn = 96 / 72, Jr = 9525, Zr = 8.43, Qr = 15;
function Ds(o, e = es) {
  return o == null && (o = Zr), o <= 0 ? 0 : Math.floor(o * e + 0.5) + 5;
}
function zs(o) {
  return Math.round((o != null ? o : Qr) * Rn);
}
function Ot(o) {
  return o / Jr;
}
function Pe(o) {
  return Math.round(o * Jr);
}
const oo = {
  name: "Calibri",
  size: 11,
  bold: !1,
  italic: !1,
  underline: !1,
  strike: !1,
  color: "#000000"
};
function Qa(o, e, t) {
  const n = o.worksheets.reduce((l, a) => l + (a.rowCount || 0), 0) || 1;
  let s = 0;
  const i = t ? () => {
    s++, s % 1e3 === 0 && t({ stage: "build", ratio: Math.min(1, s / n) });
  } : void 0, r = [];
  return o.worksheets.forEach((l, a) => {
    r.push(ec(l, a, e, i));
  }), t == null || t({ stage: "build", ratio: 1 }), r;
}
function ec(o, e, t, n) {
  var I, A, L, N;
  const s = [Qo()], i = /* @__PURE__ */ new Map([[JSON.stringify(s[0]), 0]]), r = /* @__PURE__ */ new Map(), l = (F) => {
    const H = JSON.stringify(F), D = i.get(H);
    if (D !== void 0) return D;
    const B = s.length;
    return s.push(F), i.set(H, B), B;
  };
  let a = 0, c = 0;
  o.eachRow({ includeEmpty: !0 }, (F, H) => {
    F.eachCell({ includeEmpty: !0 }, (D, B) => {
      const X = H - 1, j = B - 1, ne = hc(D, X, j, t, l);
      ne && (r.set(O(X, j), ne), X > a && (a = X), j > c && (c = j));
    }), n == null || n();
  });
  const d = pc(o);
  for (const F of d)
    a = Math.max(a, F.bottom), c = Math.max(c, F.right);
  const h = /* @__PURE__ */ new Map(), f = o.properties || {}, u = Ds((I = f.defaultColWidth) != null ? I : Zr), p = zs((A = f.defaultRowHeight) != null ? A : Qr);
  for (let F = 1; F <= o.columnCount; F++) {
    const H = o.getColumn(F);
    H && (H.width != null || H.hidden) && h.set(F - 1, {
      width: H.width != null ? Ds(H.width) : u,
      hidden: !!H.hidden
    });
  }
  const g = /* @__PURE__ */ new Map();
  o.eachRow({ includeEmpty: !0 }, (F, H) => {
    (F.height != null || F.hidden) && g.set(H - 1, {
      height: F.height != null ? zs(F.height) : p,
      hidden: !!F.hidden
    });
  });
  const b = o.views && o.views[0], m = {
    frozenRows: (b == null ? void 0 : b.state) === "frozen" && (L = b.ySplit) != null ? L : 0,
    frozenCols: (b == null ? void 0 : b.state) === "frozen" && (N = b.xSplit) != null ? N : 0
  }, y = (b == null ? void 0 : b.showGridLines) !== !1, w = gc(o, t), v = mc(o), { ranges: x, lists: S, rules: k } = ac(o), M = sc(o), E = tc(o), $ = nc(o), T = o.state === "hidden" ? "hidden" : o.state === "veryHidden" ? "veryHidden" : "visible";
  return z(R(R({
    name: o.name,
    index: e,
    state: T,
    dimension: { rows: a + 1, cols: c + 1 },
    cells: r,
    styles: s,
    merges: d,
    columns: h,
    rows: g,
    defaultColWidth: u,
    defaultRowHeight: p,
    freeze: m,
    conditional: w,
    autoFilterRange: v,
    dataValidations: x,
    dataValidationLists: S,
    dataValidationRules: k,
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    pageSetup: M
  }, E ? { sheetProtection: E } : {}), $.length ? { protectedRanges: $ } : {}), {
    showGridLines: y
  });
}
function tc(o) {
  const e = o.sheetProtection;
  if (!e || !e.sheet) return;
  const t = ["selectLockedCells", "selectUnlockedCells", "formatCells", "formatColumns", "formatRows", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"], n = {};
  for (const s of t) e[s] === !0 && (n[s] = !0);
  return R({ protected: !0, raw: R({}, e) }, Object.keys(n).length ? { allow: n } : {});
}
function nc(o) {
  var n;
  const e = o.protectedRanges || ((n = o.model) == null ? void 0 : n.protectedRanges) || [], t = [];
  for (const s of e) {
    const i = s.ref || s.sqref, r = i ? oc(i) : void 0;
    r && t.push({ name: s.name || "区域", range: r });
  }
  return t;
}
function oc(o) {
  const e = o.split(/\s+/)[0], t = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(e.toUpperCase());
  if (!t) return;
  const n = (a) => {
    let c = 0;
    for (const d of a) c = c * 26 + (d.charCodeAt(0) - 64);
    return c - 1;
  }, s = n(t[1]), i = parseInt(t[2], 10) - 1, r = t[3] ? n(t[3]) : s, l = t[4] ? parseInt(t[4], 10) - 1 : i;
  return { top: Math.min(i, l), left: Math.min(s, r), bottom: Math.max(i, l), right: Math.max(s, r) };
}
const Bs = {
  1: "letter",
  // Letter 8.5x11
  8: "a3",
  // A3 297x420
  9: "a4",
  // A4 210x297
  70: "a4"
  // ISO A4 (部分写法)
}, Qe = 25.4;
function sc(o) {
  var r, l, a, c, d, h;
  const e = o.pageSetup;
  if (!e) return;
  const t = {};
  (e.orientation === "portrait" || e.orientation === "landscape") && (t.orientation = e.orientation), typeof e.paperSize == "number" && Bs[e.paperSize] && (t.paperFormat = Bs[e.paperSize]), typeof e.scale == "number" && e.scale > 0 && (t.scale = e.scale), e.fitToPage && (t.fitToPage = !0), typeof e.fitToWidth == "number" && (t.fitToWidth = e.fitToWidth), typeof e.fitToHeight == "number" && (t.fitToHeight = e.fitToHeight);
  const n = e.margins;
  if (n && typeof n == "object" && (t.margins = {
    top: ((r = n.top) != null ? r : 0.75) * Qe,
    bottom: ((l = n.bottom) != null ? l : 0.75) * Qe,
    left: ((a = n.left) != null ? a : 0.7) * Qe,
    right: ((c = n.right) != null ? c : 0.7) * Qe,
    header: ((d = n.header) != null ? d : 0.3) * Qe,
    footer: ((h = n.footer) != null ? h : 0.3) * Qe
  }), typeof e.printArea == "string" && e.printArea.trim()) {
    const f = e.printArea.split(",")[0], u = He(ts(f));
    u && (t.printArea = u);
  }
  const s = ic(e.printTitlesRow);
  s && (t.printTitleRows = s);
  const i = rc(e.printTitlesColumn);
  return i && (t.printTitleCols = i), e.showGridLines === !0 && (t.printGridLines = !0), e.showRowColHeaders === !0 && (t.printHeadings = !0), Object.keys(t).length ? t : void 0;
}
function ts(o) {
  const e = o.lastIndexOf("!");
  return (e >= 0 ? o.slice(e + 1) : o).trim();
}
function ic(o) {
  if (typeof o != "string" || !o.trim()) return;
  const e = ts(o).replace(/\$/g, ""), t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const n = parseInt(t[1], 10) - 1, s = parseInt(t[2], 10) - 1;
  if (!(!Number.isFinite(n) || !Number.isFinite(s)))
    return [Math.min(n, s), Math.max(n, s)];
}
function rc(o) {
  if (typeof o != "string" || !o.trim()) return;
  const e = ts(o).replace(/\$/g, ""), t = /^([A-Z]+):([A-Z]+)$/i.exec(e);
  if (!t) return;
  const n = Bo(t[1].toUpperCase()), s = Bo(t[2].toUpperCase());
  return [Math.min(n, s), Math.max(n, s)];
}
const lc = /* @__PURE__ */ new Set(["list", "whole", "decimal", "date", "time", "textLength", "custom"]);
function ac(o) {
  var i, r;
  const e = (i = o.dataValidations) == null ? void 0 : i.model, t = [], n = [], s = [];
  if (!e) return { ranges: t, lists: n, rules: s };
  for (const [l, a] of Object.entries(e)) {
    const c = a == null ? void 0 : a.type;
    if (!lc.has(c)) continue;
    const d = c === "list" ? dc(a.formulae, o) : [], h = ((r = a.formulae) != null ? r : []).map(cc);
    for (const f of l.split(/\s+/)) {
      const u = He(f);
      u && (c === "list" && (t.push(u), d.length && n.push({ range: u, options: d })), s.push({
        range: u,
        type: c,
        operator: a.operator,
        formulae: h,
        allowBlank: !!a.allowBlank,
        // OOXML 默认 false;ExcelJS writer 仅 truthy 时写 allowBlank="1"
        options: d.length ? d : void 0,
        showErrorMessage: a.showErrorMessage,
        errorStyle: a.errorStyle,
        errorTitle: a.errorTitle,
        error: a.error,
        showInputMessage: a.showInputMessage,
        promptTitle: a.promptTitle,
        prompt: a.prompt
      }));
    }
  }
  return { ranges: t, lists: n, rules: s };
}
function cc(o) {
  return o instanceof Date ? o.toISOString() : typeof o == "number" ? o : String(o != null ? o : "");
}
function dc(o, e) {
  var l, a;
  const t = Array.isArray(o) ? o[0] : o;
  if (typeof t != "string" || !t) return [];
  const n = t.match(new RegExp('^\\s*"(.*)"\\s*$', "s"));
  if (n) return n[1].split(",").map((c) => c.trim()).filter((c) => c !== "");
  const s = t.replace(/^=/, "").replace(/^[^!]+!/, ""), i = He(s);
  if (!i) return [];
  const r = [];
  for (let c = i.top; c <= i.bottom; c++)
    for (let d = i.left; d <= i.right; d++) {
      const h = e.getCell(c + 1, d + 1).value;
      if (h == null) continue;
      const f = typeof h == "object" ? (a = (l = h.text) != null ? l : h.result) != null ? a : "" : h, u = String(f).trim();
      u !== "" && r.push(u);
    }
  return r;
}
function hc(o, e, t, n, s) {
  var u, p;
  const i = o.value;
  if (i == null) {
    const g = Us(o, n), b = !!(g.borders.top || g.borders.bottom || g.borders.left || g.borders.right || g.borders.diagonal), m = g.fill.type !== "none", y = Ws(o.note);
    return !b && !m && !y ? null : { row: e, col: t, type: "empty", raw: null, comment: y, styleId: s(g) };
  }
  let r = "string", l = null, a, c, d;
  if (typeof i == "number")
    r = "number", l = i;
  else if (typeof i == "boolean")
    r = "boolean", l = i;
  else if (i instanceof Date)
    r = "date", l = i;
  else if (typeof i == "string")
    r = "string", l = i;
  else if (typeof i == "object") {
    const g = i;
    if (g.richText)
      r = "richtext", a = g.richText.map((b) => {
        var m;
        return {
          text: (m = b.text) != null ? m : "",
          font: b.font ? ns(b.font, n) : void 0
        };
      }), l = a.map((b) => b.text).join("");
    else if (g.formula !== void 0 || g.sharedFormula !== void 0) {
      r = "formula", c = (u = g.formula) != null ? u : g.sharedFormula;
      const b = g.result;
      b instanceof Date ? l = b : b && typeof b == "object" && "error" in b ? l = b.error : l = b != null ? b : null;
    } else g.hyperlink !== void 0 ? (r = "hyperlink", d = g.hyperlink, l = (p = g.text) != null ? p : g.hyperlink) : g.error !== void 0 ? (r = "error", l = g.error) : l = String(g);
  }
  const h = Us(o, n), f = Ws(o.note);
  return { row: e, col: t, type: r, raw: l, rich: a, formula: c, hyperlink: d, comment: f, styleId: s(h) };
}
function Ws(o) {
  if (o) {
    if (typeof o == "string") return o;
    if (Array.isArray(o.texts))
      return o.texts.map((t) => {
        var n;
        return (n = t == null ? void 0 : t.text) != null ? n : "";
      }).join("") || void 0;
    if (typeof o.text == "string") return o.text;
  }
}
const fc = {
  "mm-dd-yy": "yyyy/m/d",
  // 内置 14 短日期
  "m/d/yy h:mm": "yyyy/m/d h:mm"
  // 内置 22 日期+时间
};
function Us(o, e) {
  var l;
  const t = o.style || {}, n = t.alignment || {}, s = t.numFmt || "General", i = {
    font: ns(t.font, e),
    fill: el(t.fill, e),
    borders: tl(t.border, e),
    hAlign: n.horizontal || "general",
    vAlign: uc(n.vertical),
    wrapText: !!n.wrapText,
    shrinkToFit: !!n.shrinkToFit,
    // ExcelJS: 竖排返回 'vertical' → 255(渲染器据此走竖排堆叠);其余是 -90..90
    textRotation: n.textRotation === "vertical" ? 255 : typeof n.textRotation == "number" ? n.textRotation : 0,
    indent: n.indent || 0,
    numFmt: (l = fc[s]) != null ? l : s
    // 内置短日期 locale 重映射(见上)
  }, r = t.protection;
  return r && (r.locked === !1 || r.hidden === !0) && (i.protection = { locked: r.locked !== !1, hidden: !!r.hidden }), i;
}
function ns(o, e) {
  return o ? {
    name: o.name || oo.name,
    size: o.size || oo.size,
    bold: !!o.bold,
    italic: !!o.italic,
    underline: !!o.underline,
    underlineStyle: o.underline === "double" || o.underline === "doubleAccounting" ? "double" : void 0,
    strike: !!o.strike,
    color: Le(o.color, e) || "#000000"
  } : R({}, oo);
}
function el(o, e) {
  var t;
  if (!o || o.type === "none") return { type: "none" };
  if (o.type === "pattern") {
    const n = o.pattern;
    return n === "none" ? { type: "none" } : n === "solid" ? {
      type: "solid",
      fgColor: Le(o.fgColor, e) || Le(o.bgColor, e)
    } : {
      type: "pattern",
      pattern: n,
      fgColor: Le(o.fgColor, e),
      bgColor: Le(o.bgColor, e)
    };
  }
  if (o.type === "gradient") {
    const n = (o.stops || []).map((i) => {
      var r;
      return {
        position: (r = i.position) != null ? r : 0,
        color: Le(i.color, e) || "#FFFFFF"
      };
    }), s = typeof o.degree == "number" ? o.degree : void 0;
    return { type: "gradient", gradientStops: n, gradientAngle: s, fgColor: (t = n[0]) == null ? void 0 : t.color };
  }
  return { type: "none" };
}
function tl(o, e) {
  if (!o) return {};
  const t = (s) => s && s.style ? { style: s.style, color: Le(s.color, e) || "#000000" } : void 0, n = o.diagonal;
  return {
    top: t(o.top),
    bottom: t(o.bottom),
    left: t(o.left),
    right: t(o.right),
    diagonal: t(n),
    diagonalUp: !!(n != null && n.up),
    diagonalDown: !!(n != null && n.down)
  };
}
function uc(o) {
  return o === "top" ? "top" : o === "middle" ? "middle" : "bottom";
}
function pc(o) {
  const e = o.model, t = (e == null ? void 0 : e.merges) || [], n = [];
  for (const s of t) {
    const i = He(s);
    i && n.push(i);
  }
  return n;
}
function gc(o, e) {
  var i, r;
  const t = o.conditionalFormattings || [], n = [];
  let s = 0;
  for (const l of t) {
    const a = bc(l.ref);
    for (const c of l.rules || []) {
      const d = {
        id: `cf-p${s++}`,
        origin: "parsed",
        raw: c,
        // 原始 ExcelJS rule:overlay 未编辑时原样回写保真(含 cfvo 阈值)
        ranges: a,
        priority: (i = c.priority) != null ? i : 0,
        type: "unsupported"
      };
      switch (c.type) {
        case "cellIs":
          d.type = "cellIs", d.operator = c.operator, d.formulae = c.formulae, d.style = c.style ? so(c.style, e) : void 0;
          break;
        case "expression":
          d.type = "expression", d.formulae = c.formulae, d.style = c.style ? so(c.style, e) : void 0;
          break;
        case "colorScale": {
          d.type = "colorScale";
          const h = (c.color || []).map((f) => Le(f, e) || "#FFFFFF");
          h.length === 3 ? d.colorScale = { min: h[0], mid: h[1], max: h[2] } : h.length === 2 && (d.colorScale = { min: h[0], max: h[1] });
          break;
        }
        case "dataBar":
          d.type = "dataBar", d.dataBar = {
            color: Le(c.color, e) || "#638EC6",
            gradient: c.gradient !== !1
          };
          break;
        case "iconSet":
          d.type = "iconSet", d.iconSet = { name: c.iconSet || "3TrafficLights1", reverse: !!c.reverse };
          break;
        case "top10":
          d.type = "top10", d.top10 = { rank: (r = c.rank) != null ? r : 10, percent: !!c.percent, bottom: !!c.bottom }, d.style = c.style ? so(c.style, e) : void 0;
          break;
      }
      n.push(d);
    }
  }
  return n.sort((l, a) => l.priority - a.priority);
}
function so(o, e) {
  const t = {};
  return o.font && (t.font = ns(o.font, e)), o.fill && (t.fill = el(o.fill, e)), o.border && (t.borders = tl(o.border, e)), t;
}
function mc(o) {
  const e = o.autoFilter;
  if (e) {
    if (typeof e == "string") return He(e) || void 0;
    if (e.from && e.to) {
      const t = typeof e.from == "string" ? bn(e.from) : { row: e.from.row - 1, col: e.from.column - 1 }, n = typeof e.to == "string" ? bn(e.to) : { row: e.to.row - 1, col: e.to.column - 1 };
      if (t && n) return { top: t.row, left: t.col, bottom: n.row, right: n.col };
    }
  }
}
function Bo(o) {
  let e = 0;
  for (let t = 0; t < o.length; t++)
    e = e * 26 + (o.charCodeAt(t) - 64);
  return e - 1;
}
function bn(o) {
  const e = /^\$?([A-Z]+)\$?(\d+)$/.exec(o.trim());
  return e ? { col: Bo(e[1]), row: parseInt(e[2], 10) - 1 } : null;
}
function He(o) {
  const e = o.split(":"), t = bn(e[0]), n = e[1] ? bn(e[1]) : t;
  return !t || !n ? null : {
    top: Math.min(t.row, n.row),
    left: Math.min(t.col, n.col),
    bottom: Math.max(t.row, n.row),
    right: Math.max(t.col, n.col)
  };
}
function bc(o) {
  return o ? o.split(/\s+/).map((e) => He(e)).filter((e) => !!e) : [];
}
function yc(o, e) {
  var a, c;
  const t = o.parse(e), n = (a = t == null ? void 0 : t.chartSpace) == null ? void 0 : a.chart;
  if (!n) return;
  const s = n.plotArea;
  if (!s) return;
  const i = xc(n), r = !!n.legend, l = [
    { key: "barChart", type: "bar" },
    { key: "bar3DChart", type: "bar" },
    { key: "lineChart", type: "line" },
    { key: "line3DChart", type: "line" },
    { key: "pieChart", type: "pie" },
    { key: "pie3DChart", type: "pie" },
    { key: "doughnutChart", type: "doughnut" },
    { key: "areaChart", type: "area" },
    { key: "area3DChart", type: "area" },
    { key: "scatterChart", type: "scatter" },
    { key: "radarChart", type: "radar" }
  ];
  for (const d of l) {
    const h = s[d.key];
    if (!h) continue;
    const f = Array.isArray(h) ? h[0] : h;
    let u = d.type, p;
    d.key.startsWith("bar") && (p = ((c = f.barDir) == null ? void 0 : c["@_val"]) === "bar" ? "bar" : "col");
    const { categories: g, series: b } = wc(f, u);
    return { type: u, title: i, showLegend: r, barDirection: p, categories: g, series: b };
  }
  return { type: "unsupported", title: i, showLegend: r, categories: [], series: [] };
}
function xc(o) {
  var s, i, r;
  const e = (i = (s = o.title) == null ? void 0 : s.tx) == null ? void 0 : i.rich;
  if (!e) return;
  const t = G(e.p), n = [];
  for (const l of t)
    for (const a of G(l.r))
      a.t != null && n.push(typeof a.t == "object" ? (r = a.t["#text"]) != null ? r : "" : String(a.t));
  return n.join("") || void 0;
}
function wc(o, e) {
  const t = G(o.ser), n = [];
  let s = [];
  return t.forEach((i, r) => {
    var h, f, u, p, g, b, m, y, w, v, x, S;
    let l;
    const a = (p = (f = (h = i.tx) == null ? void 0 : h.strRef) == null ? void 0 : f.strCache) != null ? p : (u = i.tx) == null ? void 0 : u.v;
    if ((b = (g = i.tx) == null ? void 0 : g.strRef) != null && b.strCache ? l = qs(i.tx.strRef.strCache)[0] : typeof a == "string" && (l = a), r === 0) {
      const k = i.cat;
      if (k) {
        const M = (m = k.strRef) != null && m.strCache ? qs(k.strRef.strCache) : null, E = (y = k.numRef) != null && y.numCache ? io(k.numRef.numCache) : null;
        s = M != null ? M : (E != null ? E : []).map(($) => $ != null ? $ : "");
      }
    }
    let c = [];
    if (e === "scatter") {
      const k = (v = (w = i.yVal) == null ? void 0 : w.numRef) == null ? void 0 : v.numCache;
      c = k ? io(k) : [];
    } else {
      const k = (S = (x = i.val) == null ? void 0 : x.numRef) == null ? void 0 : S.numCache;
      c = k ? io(k) : [];
    }
    const d = vc(i);
    n.push({ name: l, values: c, color: d });
  }), { categories: s, series: n };
}
function qs(o) {
  var n, s;
  const e = G(o.pt), t = [];
  for (const i of e) {
    const r = Number((n = i["@_idx"]) != null ? n : t.length);
    t[r] = i.v != null ? typeof i.v == "object" ? (s = i.v["#text"]) != null ? s : "" : String(i.v) : "";
  }
  return Array.from(t, (i) => i != null ? i : "");
}
function io(o) {
  var s, i;
  const e = G(o.pt), t = Number((s = o["@_count"]) != null ? s : e.length), n = new Array(t).fill(null);
  for (const r of e) {
    const l = Number((i = r["@_idx"]) != null ? i : 0), a = r.v;
    n[l] = a == null || a === "" ? null : Number(a);
  }
  return n;
}
function vc(o) {
  var t, n;
  const e = (t = o.spPr) == null ? void 0 : t.solidFill;
  if ((n = e == null ? void 0 : e.srgbClr) != null && n["@_val"]) return "#" + String(e.srgbClr["@_val"]).toUpperCase();
}
const kc = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Cc(o, e) {
  var r, l, a, c;
  const t = o.parse("xl/workbook.xml"), n = G((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), s = Se(o, "xl/workbook.xml"), i = /* @__PURE__ */ new Map();
  for (const d of n) {
    const h = d["@_name"], f = d["@_id"];
    h && f && s[f] && i.set(String(h), s[f]);
  }
  for (const d of e) {
    const h = i.get(d.name);
    if (!h) continue;
    const f = Se(o, h), u = o.parse(h), p = (a = u == null ? void 0 : u.worksheet) == null ? void 0 : a.drawing, g = Array.isArray(p) ? (c = p[0]) == null ? void 0 : c["@_id"] : p == null ? void 0 : p["@_id"];
    if (!g || !f[g]) continue;
    const b = f[g];
    Sc(o, b, d);
  }
}
function Sc(o, e, t) {
  var l, a, c, d, h, f, u, p;
  const n = o.parse(e), s = n == null ? void 0 : n.wsDr;
  if (!s) return;
  const i = Se(o, e), r = [
    ...G(s.twoCellAnchor).map((g) => ({ a: g, kind: "two" })),
    ...G(s.oneCellAnchor).map((g) => ({ a: g, kind: "one" }))
  ];
  for (const { a: g, kind: b } of r) {
    const m = _s(g.from), y = b === "two" && (l = _s(g.to)) != null ? l : void 0;
    let w, v;
    if (b === "one" && g.ext && (w = Number(g.ext["@_cx"]), v = Number(g.ext["@_cy"])), !m) continue;
    const x = { src: "", from: m, to: y, extWidthEmu: w, extHeightEmu: v }, S = g.pic;
    if (S) {
      const E = (f = (c = (a = S.blipFill) == null ? void 0 : a.blip) == null ? void 0 : c["@_embed"]) != null ? f : (h = (d = S.blipFill) == null ? void 0 : d.blip) == null ? void 0 : h["@_link"], $ = E ? i[E] : void 0;
      if ($) {
        const T = Tc(o, $);
        T && t.images.push(z(R({}, x), { src: "", bytes: T.bytes, mime: T.mime }));
      }
      continue;
    }
    const k = g.graphicFrame;
    if (k) {
      const E = (p = (u = k.graphic) == null ? void 0 : u.graphicData) == null ? void 0 : p.chart, $ = E == null ? void 0 : E["@_id"], T = $ ? i[$] : void 0;
      if (T) {
        const I = yc(o, T);
        if (I && I.type !== "unsupported") {
          const A = z(R({}, I), { anchor: x });
          t.charts.push(A);
        }
      }
      continue;
    }
    const M = g.sp;
    M && t.shapes.push(Ec(M, x));
  }
}
function Ec(o, e) {
  var u, p, g, b, m, y, w, v, x, S, k, M, E, $, T, I;
  const t = o.spPr || {}, n = String((p = (u = t.prstGeom) == null ? void 0 : u["@_prst"]) != null ? p : "rect"), s = n === "roundRect" ? "roundRect" : n === "ellipse" || n === "circle" ? "ellipse" : n === "rect" ? "rect" : "other", i = ro((b = (g = t.solidFill) == null ? void 0 : g.srgbClr) == null ? void 0 : b["@_val"]), r = ro((w = (y = (m = t.ln) == null ? void 0 : m.solidFill) == null ? void 0 : y.srgbClr) == null ? void 0 : w["@_val"]);
  let l = "", a, c = !1;
  const d = G((v = o.txBody) == null ? void 0 : v.p);
  for (const A of d) {
    for (const L of G(A.r)) {
      const N = L.t;
      l += N == null ? "" : typeof N == "object" ? (x = N["#text"]) != null ? x : "" : String(N), a || (a = ro((M = (k = (S = L.rPr) == null ? void 0 : S.solidFill) == null ? void 0 : k.srgbClr) == null ? void 0 : M["@_val"])), (((E = L.rPr) == null ? void 0 : E["@_b"]) === 1 || (($ = L.rPr) == null ? void 0 : $["@_b"]) === "1") && (c = !0);
    }
    l += `
`;
  }
  l = l.trim();
  const h = (I = (T = d[0]) == null ? void 0 : T.pPr) == null ? void 0 : I["@_algn"];
  return { anchor: e, geom: s, text: l || void 0, fillColor: i, lineColor: r, textColor: a, bold: c, align: h === "ctr" ? "center" : h === "r" ? "right" : "left" };
}
function ro(o) {
  if (o)
    return "#" + String(o).toUpperCase();
}
function _s(o) {
  var e, t, n, s;
  return o ? {
    col: Number((e = o.col) != null ? e : 0),
    colOffEmu: Number((t = o.colOff) != null ? t : 0),
    row: Number((n = o.row) != null ? n : 0),
    rowOffEmu: Number((s = o.rowOff) != null ? s : 0)
  } : null;
}
function Tc(o, e) {
  var i;
  const t = o.bytes(e);
  if (!t) return;
  const n = ((i = mn(e).split(".").pop()) == null ? void 0 : i.toLowerCase()) || "png", s = kc[n];
  if (s)
    return { bytes: t, mime: s };
}
function nl(o) {
  if (!o || o.indexOf("DISPIMG") < 0) return;
  const e = /DISPIMG\s*\(\s*"([^"]+)"/i.exec(o);
  return e ? e[1] : void 0;
}
const $c = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Mc(o, e) {
  const t = Ic(o);
  let n = !1;
  for (const s of e)
    for (const i of s.cells.values()) {
      if (i.type !== "formula") continue;
      const r = nl(i.formula);
      r && (i.dispImgId = r, n = !0);
    }
  if (!(!t && !n))
    return t != null ? t : /* @__PURE__ */ new Map();
}
function Ic(o) {
  var i, r, l, a, c, d, h;
  const e = o.parse("xl/cellimages.xml"), t = e == null ? void 0 : e.cellImages;
  if (!t) return;
  const n = Se(o, "xl/cellimages.xml"), s = /* @__PURE__ */ new Map();
  for (const f of G(t.cellImage)) {
    const u = f == null ? void 0 : f.pic;
    if (!u) continue;
    const p = (r = (i = u.nvPicPr) == null ? void 0 : i.cNvPr) == null ? void 0 : r["@_name"], g = (h = (a = (l = u.blipFill) == null ? void 0 : l.blip) == null ? void 0 : a["@_embed"]) != null ? h : (d = (c = u.blipFill) == null ? void 0 : c.blip) == null ? void 0 : d["@_link"];
    if (!p || !g) continue;
    const b = n[g];
    if (!b) continue;
    const m = Ac(o, b);
    m && s.set(String(p), { id: String(p), bytes: m.bytes, mime: m.mime, src: "" });
  }
  return s.size ? s : void 0;
}
function Ac(o, e) {
  var i;
  const t = o.bytes(e);
  if (!t) return;
  const n = ((i = mn(e).split(".").pop()) == null ? void 0 : i.toLowerCase()) || "png", s = $c[n];
  if (s)
    return { bytes: t, mime: s };
}
function Rc(o, e) {
  var r, l, a, c;
  const t = o.parse("xl/workbook.xml"), n = G((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), s = Se(o, "xl/workbook.xml"), i = /* @__PURE__ */ new Map();
  for (const d of n) {
    const h = d["@_name"], f = d["@_id"];
    h && f && s[f] && i.set(String(h), s[f]);
  }
  for (const d of e) {
    const h = i.get(d.name);
    if (!h) continue;
    const f = o.parse(h), u = G((c = (a = f == null ? void 0 : f.worksheet) == null ? void 0 : a.sheetData) == null ? void 0 : c.row);
    for (const p of u) {
      const g = p["@_customHeight"];
      if (g === 1 || g === "1" || g === !0) {
        const b = Number(p["@_r"]) - 1;
        if (!Number.isFinite(b) || b < 0) continue;
        const m = d.rows.get(b);
        m && (m.customHeight = !0);
      }
    }
  }
}
function Fc(o, e) {
  var r, l;
  const t = o.parse("xl/workbook.xml"), n = G((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), s = Se(o, "xl/workbook.xml"), i = /* @__PURE__ */ new Map();
  for (const a of n) {
    const c = a["@_name"], d = a["@_id"];
    c && d && s[d] && i.set(String(c), s[d]);
  }
  for (const a of e) {
    const c = i.get(a.name);
    if (c)
      try {
        Lc(o, c, a);
      } catch (d) {
      }
  }
}
function Lc(o, e, t) {
  var i, r, l, a, c;
  const n = o.parse(e), s = G((r = (i = n == null ? void 0 : n.worksheet) == null ? void 0 : i.extLst) == null ? void 0 : r.ext);
  for (const d of s) {
    const h = G((l = d.sparklineGroups) == null ? void 0 : l.sparklineGroup);
    for (const f of h) {
      const u = String((a = f["@_type"]) != null ? a : "line"), p = u === "column" ? "column" : u === "stacked" ? "winloss" : "line", g = Vs(f.colorSeries), b = Vs(f.colorNegative);
      for (const m of G((c = f.sparklines) == null ? void 0 : c.sparkline)) {
        const y = js(m.f), w = js(m.sqref);
        if (!y || !w) continue;
        const v = Pc(w);
        if (!v) continue;
        const x = Nc(t, y);
        x.length && t.sparklines.push({ row: v.row, col: v.col, type: p, values: x, color: g, negativeColor: b });
      }
    }
  }
}
function Nc(o, e) {
  const t = e.includes("!") ? e.slice(e.indexOf("!") + 1) : e, n = He(t.replace(/\$/g, ""));
  if (!n) return [];
  const s = [];
  for (let i = n.top; i <= n.bottom; i++)
    for (let r = n.left; r <= n.right; r++) {
      const l = o.cells.get(O(i, r));
      s.push(l && typeof l.raw == "number" ? l.raw : null);
    }
  return s;
}
function Pc(o) {
  const e = o.trim().split(/\s+/)[0], t = He(e);
  return t ? { row: t.top, col: t.left } : null;
}
function js(o) {
  if (o != null) {
    if (typeof o == "string" || typeof o == "number") return String(o);
    if (typeof o == "object" && o["#text"] != null) return String(o["#text"]);
  }
}
function Vs(o) {
  const e = o == null ? void 0 : o["@_rgb"];
  if (!e) return;
  const t = String(e);
  return "#" + (t.length === 8 ? t.slice(2) : t).toUpperCase();
}
function Oc(o, e) {
  var r, l, a, c, d;
  const t = o.parse("xl/workbook.xml"), n = G((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), s = Se(o, "xl/workbook.xml"), i = /* @__PURE__ */ new Map();
  for (const h of n) {
    const f = h["@_name"], u = h["@_id"];
    f && u && s[u] && i.set(String(f), s[u]);
  }
  for (const h of e) {
    const f = i.get(h.name);
    if (f)
      try {
        const u = (a = o.parse(f)) == null ? void 0 : a.worksheet, p = G((c = u == null ? void 0 : u.rowBreaks) == null ? void 0 : c.brk).map((b) => Number(b["@_id"])).filter((b) => Number.isFinite(b) && b > 0), g = G((d = u == null ? void 0 : u.colBreaks) == null ? void 0 : d.brk).map((b) => Number(b["@_id"])).filter((b) => Number.isFinite(b) && b > 0);
        (p.length || g.length) && (h.pageBreaks = { rows: p, cols: g });
      } catch (u) {
      }
  }
}
function Hc(o, e) {
  var r, l;
  const t = o.parse("xl/workbook.xml"), n = G((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), s = Se(o, "xl/workbook.xml"), i = /* @__PURE__ */ new Map();
  for (const a of n) {
    const c = a["@_name"], d = a["@_id"];
    c && d && s[d] && i.set(String(c), s[d]);
  }
  for (const a of e) {
    const c = i.get(a.name);
    if (c)
      try {
        Dc(o, c, a);
      } catch (d) {
      }
  }
}
function Dc(o, e, t) {
  var r;
  const n = Se(o, e), s = /* @__PURE__ */ new Set();
  for (const l of Object.values(n))
    /pivotTables\/pivotTable\d*\.xml$/i.test(l) && s.add(l);
  const i = (r = o.parse(e)) == null ? void 0 : r.worksheet;
  for (const l of G(i == null ? void 0 : i.pivotTableDefinition)) {
    const a = l["@_id"];
    a && n[a] && s.add(n[a]);
  }
  for (const l of s) {
    const a = zc(o, l, t);
    a && t.pivotTables.push(a);
  }
}
function zc(o, e, t) {
  var d, h, f, u;
  const n = (d = o.parse(e)) == null ? void 0 : d.pivotTableDefinition;
  if (!n) return null;
  const s = Bc(n.location);
  if (!s) return null;
  const i = Se(o, e), r = n["@_cacheId"] != null ? Uc(o, String(n["@_cacheId"])) : void 0, l = Object.values(i).find((p) => /pivotCache\/pivotCacheDefinition\d+\.xml$/i.test(p)), a = Wc(o, l != null ? l : r), c = qc(n, s, a, t);
  return {
    name: String((u = (f = n["@_name"]) != null ? f : (h = n["@_pivotTableStyleInfo"]) == null ? void 0 : h["@_name"]) != null ? u : "PivotTable"),
    range: s,
    fields: a,
    buttons: c
  };
}
function Bc(o) {
  const e = o == null ? void 0 : o["@_ref"];
  return e ? He(String(e).replace(/\$/g, "")) : null;
}
function Wc(o, e) {
  var n, s, i;
  return e ? G((i = (s = (n = o.parse(e)) == null ? void 0 : n.pivotCacheDefinition) == null ? void 0 : s.cacheFields) == null ? void 0 : i.cacheField).map((r, l) => {
    var a;
    return String((a = r == null ? void 0 : r["@_name"]) != null ? a : `字段${l + 1}`);
  }) : [];
}
function Uc(o, e) {
  var r, l;
  const t = (r = o.parse("xl/workbook.xml")) == null ? void 0 : r.workbook, s = G((l = t == null ? void 0 : t.pivotCaches) == null ? void 0 : l.pivotCache).find((a) => String(a == null ? void 0 : a["@_cacheId"]) === e), i = s == null ? void 0 : s["@_id"];
  if (i)
    return Se(o, "xl/workbook.xml")[i];
}
function qc(o, e, t, n) {
  var g, b, m, y, w, v, x, S, k, M;
  const s = [], i = /* @__PURE__ */ new Set(), r = (E, $, T, I) => {
    if (E < 0 || $ < 0 || E < e.top || E > e.bottom || $ < e.left || $ > e.right) return;
    const A = `${E}:${$}:${T}:${I}`;
    i.has(A) || (i.add(A), s.push({ row: E, col: $, label: T, kind: I }));
  };
  lo((g = o.pageFields) == null ? void 0 : g.pageField, t, "@_fld").forEach((E, $) => r(e.top + $, e.left, E, "page"));
  const a = lo((b = o.colFields) == null ? void 0 : b.field, t, "@_x"), c = lo((m = o.rowFields) == null ? void 0 : m.field, t, "@_x"), d = G((y = o.dataFields) == null ? void 0 : y.dataField).map((E, $) => {
    var T, I;
    return String((I = (T = E == null ? void 0 : E["@_name"]) != null ? T : t[Number(E == null ? void 0 : E["@_fld"])]) != null ? I : `值${$ + 1}`);
  }), h = jt(e.top + Number((v = (w = o.location) == null ? void 0 : w["@_firstHeaderRow"]) != null ? v : 0), e.top, e.bottom), f = jt(e.left + Number((S = (x = o.location) == null ? void 0 : x["@_firstDataCol"]) != null ? S : c.length), e.left, e.right), u = jt(e.top + Number((M = (k = o.location) == null ? void 0 : k["@_firstDataRow"]) != null ? M : a.length + 1), e.top, e.bottom), p = jt(u - 1, e.top, e.bottom);
  if (a.forEach((E, $) => r(h + $, f, E, "col")), c.forEach((E, $) => r(p, e.left + $, E, "row")), d.forEach((E, $) => r(p, Math.min(e.right, f + $), E, "data")), !s.length)
    for (let E = e.left; E <= e.right; E++) {
      const $ = _c(n, e.top, E);
      $ && r(e.top, E, $, "field");
    }
  return s;
}
function lo(o, e, t) {
  return G(o).map((n) => Number(n == null ? void 0 : n[t])).filter((n) => Number.isFinite(n) && n >= 0).map((n) => {
    var s;
    return (s = e[n]) != null ? s : `字段${n + 1}`;
  });
}
function _c(o, e, t) {
  var s;
  const n = (s = o.cells.get(`${e}:${t}`)) == null ? void 0 : s.raw;
  return n == null ? "" : String(n);
}
function jt(o, e, t) {
  return Number.isFinite(o) ? Math.max(e, Math.min(t, o)) : e;
}
async function jc(o, e) {
  var d;
  const t = o instanceof Uint8Array ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength) : o, n = Ua(t.slice(0)), s = _a(n);
  e == null || e({ stage: "parse" });
  const i = (await import("./exceljs.min-Bo1tFAdV.js").then((h) => h.e)).default, r = new i.Workbook();
  await r.xlsx.load(t);
  const l = Qa(r, s, e);
  try {
    Cc(n, l);
  } catch (h) {
    console.warn("[ooxml-preview] drawings 解析失败，跳过图片/图表:", h);
  }
  let a;
  try {
    a = Mc(n, l);
  } catch (h) {
    console.warn("[ooxml-preview] WPS 单元格内嵌图(DISPIMG)解析失败，跳过:", h);
  }
  try {
    Fc(n, l);
  } catch (h) {
    console.warn("[ooxml-preview] sparklines 解析失败，跳过迷你图:", h);
  }
  try {
    Hc(n, l);
  } catch (h) {
    console.warn("[ooxml-preview] 透视表 UI 元数据解析失败，跳过:", h);
  }
  try {
    Oc(n, l);
  } catch (h) {
    console.warn("[ooxml-preview] 分页符解析失败，跳过:", h);
  }
  try {
    Rc(n, l);
  } catch (h) {
    console.warn("[ooxml-preview] 行高标记解析失败，跳过:", h);
  }
  const c = !!((d = r.properties) != null && d.date1904);
  return {
    sheets: l,
    activeSheet: 0,
    themeColors: s,
    date1904: c,
    cellImages: a
  };
}
async function Vc(o, e) {
  if (o instanceof ArrayBuffer)
    return e == null || e(o.byteLength, o.byteLength), o;
  if (o instanceof Uint8Array)
    return e == null || e(o.byteLength, o.byteLength), o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength);
  if (typeof Blob != "undefined" && o instanceof Blob)
    return await Yc(o, e);
  if (typeof o == "string")
    return await Xc(o, e);
  throw new Error("不支持的输入类型，期望 File/Blob/ArrayBuffer/Uint8Array/URL 字符串");
}
function Yc(o, e) {
  return !e || typeof FileReader == "undefined" ? o.arrayBuffer() : new Promise((t, n) => {
    const s = new FileReader();
    s.onprogress = (i) => {
      i.lengthComputable && e(i.loaded, i.total);
    }, s.onload = () => {
      e(o.size, o.size), t(s.result);
    }, s.onerror = () => {
      var i;
      return n((i = s.error) != null ? i : new Error("文件读取失败"));
    }, s.readAsArrayBuffer(o);
  });
}
async function Xc(o, e) {
  const t = await fetch(o);
  if (!t.ok) throw new Error(`加载文件失败: ${t.status} ${t.statusText}`);
  const n = Number(t.headers.get("content-length") || 0);
  if (!e || !t.body) return await t.arrayBuffer();
  const s = t.body.getReader(), i = [];
  let r = 0;
  for (; ; ) {
    const { done: c, value: d } = await s.read();
    if (c) break;
    i.push(d), r += d.byteLength, e(r, n);
  }
  const l = new Uint8Array(r);
  let a = 0;
  for (const c of i)
    l.set(c, a), a += c.byteLength;
  return e(r, n || r), l.buffer;
}
async function Qm(o, e) {
  const t = await Vc(o);
  return jc(t, e);
}
function eb(o) {
  if (!(typeof URL == "undefined" || !URL.createObjectURL)) {
    for (const e of o.sheets)
      for (const t of e.images)
        t.bytes && t.mime && !t.src && (t.src = URL.createObjectURL(new Blob([t.bytes], { type: t.mime })));
    if (o.cellImages)
      for (const e of o.cellImages.values())
        e.bytes && e.mime && !e.src && (e.src = URL.createObjectURL(new Blob([e.bytes], { type: e.mime })));
  }
}
function tb(o) {
  var e, t;
  if (!(typeof URL == "undefined" || !URL.revokeObjectURL)) {
    for (const n of o.sheets)
      for (const s of n.images)
        (e = s.src) != null && e.startsWith("blob:") && URL.revokeObjectURL(s.src);
    if (o.cellImages)
      for (const n of o.cellImages.values())
        (t = n.src) != null && t.startsWith("blob:") && URL.revokeObjectURL(n.src);
  }
}
function nb(o) {
  const e = new Uint8Array(o);
  return e.length < 4 ? "empty" : e[0] === 208 && e[1] === 207 && e[2] === 17 && e[3] === 224 ? "xls" : e[0] === 80 && e[1] === 75 ? "xlsx" : "not-zip";
}
function ob(o) {
  const e = (o == null ? void 0 : o.message) || String(o);
  return /encrypt|password|protected/i.test(e) ? "文件已加密或受密码保护，暂不支持预览。" : /zip|signature|central directory|invalid|corrupt|unexpected end/i.test(e) ? "文件无法解析：可能不是有效的 .xlsx，或文件已损坏。" : "解析失败：" + e;
}
const Gc = Array(17).fill("#000000");
function Ys(o, e) {
  return {
    name: o,
    index: e,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: [Qo()],
    merges: [],
    columns: /* @__PURE__ */ new Map(),
    rows: /* @__PURE__ */ new Map(),
    defaultColWidth: 64,
    defaultRowHeight: 20,
    freeze: { frozenRows: 0, frozenCols: 0 },
    conditional: [],
    dataValidations: [],
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: !0
  };
}
function Kc(o, e) {
  if (o == null || o === "") return { raw: null, type: "empty" };
  if (typeof o == "number") return { raw: o, type: "number" };
  if (typeof o == "boolean") return { raw: o, type: "boolean" };
  if (o instanceof Date) return { raw: o, type: "date" };
  if (typeof o != "string") return { raw: String(o), type: "string" };
  if (!e) return { raw: o, type: "string" };
  const t = o.trim();
  if (/^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(t)) {
    const n = Number(t);
    if (Number.isFinite(n)) return { raw: n, type: "number" };
  }
  if (/^(TRUE|FALSE)$/i.test(t)) return { raw: /^TRUE$/i.test(t), type: "boolean" };
  if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/.test(t)) {
    const n = new Date(t);
    if (!isNaN(n.getTime())) return { raw: n, type: "date" };
  }
  return { raw: o, type: "string" };
}
function Jc(o, e) {
  return e.map((t) => o[t]);
}
function Xs(o, e, t = {}) {
  var u, p, g, b, m, y;
  const n = (u = t.startRow) != null ? u : 0, s = (p = t.startCol) != null ? p : 0, i = (g = t.autoInfer) != null ? g : !0;
  let r = 0, l = 0, a = !1;
  if (!e.length) return { lastRow: 0, lastCol: 0, wrote: !1 };
  const c = e[0], d = c !== null && typeof c == "object" && !Array.isArray(c), h = d ? (b = t.columns) != null ? b : Object.keys(c) : [];
  let f = n;
  if (d && ((m = t.headerRow) == null || m)) {
    for (let w = 0; w < h.length; w++) {
      const v = f, x = s + w;
      o.cells.set(O(v, x), { row: v, col: x, type: "string", raw: h[w], styleId: 0 }), r = Math.max(r, v), l = Math.max(l, x), a = !0;
    }
    f++;
  }
  for (let w = 0; w < e.length; w++) {
    const v = e[w], x = Array.isArray(v) ? v : Jc(v, h);
    for (let S = 0; S < x.length; S++) {
      const k = f + w - (d && ((y = t.headerRow) == null || y), 0), M = s + S, E = Kc(x[S], i);
      E.type !== "empty" && (o.cells.set(O(k, M), { row: k, col: M, type: E.type, raw: E.raw, styleId: 0 }), r = Math.max(r, k), l = Math.max(l, M), a = !0);
    }
  }
  return { lastRow: r, lastCol: l, wrote: a };
}
function sb(o, e = {}) {
  var d, h;
  const t = e.themeColors && e.themeColors.length === 17 ? e.themeColors : Gc, n = (d = e.autoInfer) != null ? d : !0, s = (h = e.headerRow) != null ? h : !0;
  if (o && typeof o == "object" && !Array.isArray(o) && Array.isArray(o.sheets))
    return { sheets: o.sheets.map((p, g) => {
      var v;
      const b = Ys(p.name || `Sheet${g + 1}`, g), { lastRow: m, lastCol: y, wrote: w } = Xs(b, (v = p.rows) != null ? v : [], { headerRow: s, autoInfer: n });
      return b.dimension = w ? { rows: m + 1, cols: y + 1 } : { rows: 0, cols: 0 }, b;
    }), activeSheet: 0, themeColors: t, date1904: !1 };
  const i = Ys(e.sheetName || "Sheet1", 0), r = o != null ? o : [], { lastRow: l, lastCol: a, wrote: c } = Xs(i, r, { headerRow: s, autoInfer: n });
  return i.dimension = c ? { rows: l + 1, cols: a + 1 } : { rows: 0, cols: 0 }, { sheets: [i], activeSheet: 0, themeColors: t, date1904: !1 };
}
function ib(o) {
  return !!o && typeof o == "object" && Array.isArray(o.sheets) && typeof o.activeSheet == "number" && Array.isArray(o.themeColors);
}
const Gs = 86400 * 1e3, Zc = Date.UTC(1899, 11, 31), Qc = Date.UTC(1904, 0, 1);
function ed(o, e = !1) {
  if (e)
    return new Date(Qc + o * Gs);
  let t = o;
  return t >= 60 && (t -= 1), new Date(Zc + t * Gs);
}
const ao = {
  black: "#000000",
  blue: "#0000FF",
  cyan: "#00FFFF",
  green: "#008000",
  magenta: "#FF00FF",
  red: "#FF0000",
  white: "#FFFFFF",
  yellow: "#FFFF00"
}, td = {
  1: "#000000",
  2: "#FFFFFF",
  3: "#FF0000",
  4: "#00FF00",
  5: "#0000FF",
  6: "#FFFF00",
  7: "#FF00FF",
  8: "#00FFFF",
  10: "#008000",
  12: "#000080"
}, Ks = /* @__PURE__ */ new Map();
function ht(o, e, t = !1) {
  if (o == null) return { text: "" };
  if (!e || e === "General" || e === "@" && typeof o != "string")
    return e === "@" ? { text: String(o) } : { text: Qs(o) };
  if (typeof o == "string") {
    const a = Js(e), c = a[3] && /@/.test(a[3].raw) ? a[3] : a.find((d) => /@/.test(d.raw));
    return c ? bd(c, o) : { text: o };
  }
  if (typeof o == "boolean") return { text: o ? "TRUE" : "FALSE" };
  let n;
  o instanceof Date ? n = Sd(o, t) : n = o;
  const s = Js(e), i = rd(s, n);
  if (!i) return { text: Qs(n) };
  if (i.hasDateTime) {
    const a = o instanceof Date ? o : ed(n, t);
    return { text: pd(i.raw, a, n), color: i.color };
  }
  const r = n < 0, l = ad(i.raw, Math.abs(n));
  return r && !nd(i.raw) ? { text: "-" + l, color: i.color } : { text: l, color: i.color };
}
function nd(o) {
  return /[()-]/.test(yd(o));
}
function Js(o) {
  const e = Ks.get(o);
  if (e) return e;
  const n = od(o, ";").map(sd);
  return Ks.set(o, n), n;
}
function od(o, e) {
  var r;
  const t = [];
  let n = "", s = !1, i = !1;
  for (let l = 0; l < o.length; l++) {
    const a = o[l];
    if (a === "\\") {
      n += a + ((r = o[l + 1]) != null ? r : ""), l++;
      continue;
    }
    if (a === '"') {
      s = !s, n += a;
      continue;
    }
    if (!s && a === "[" && (i = !0), !s && a === "]" && (i = !1), a === e && !s && !i) {
      t.push(n), n = "";
      continue;
    }
    n += a;
  }
  return t.push(n), t;
}
function sd(o) {
  let e, t;
  const n = o.replace(/\[([^\]]+)\]/g, (s, i) => {
    var c;
    const r = i.toLowerCase().trim();
    if (/^(h+|m+|s+)$/.test(r)) return s;
    if (ao[r])
      return e = ao[r], "";
    const l = /^color(\d+)$/.exec(r);
    if (l)
      return e = (c = td[+l[1]]) != null ? c : "#000000", "";
    const a = /^(<=|>=|<>|<|>|=)\s*(-?\d+(?:\.\d+)?)$/.exec(r);
    return a ? (t = { op: a[1], value: parseFloat(a[2]) }, "") : ((r === "red" || r === "blue") && (e = ao[r]), "");
  });
  return {
    raw: n,
    color: e,
    condition: t,
    hasDateTime: id(n)
  };
}
function id(o) {
  const e = ft(o);
  return /(\[?[hms]+\]?|y+|d+|am\/pm|a\/p)/i.test(e) && !/E[+-]/.test(e);
}
function rd(o, e) {
  var n, s;
  if (o.filter((i) => i.condition).length) {
    for (const i of o)
      if (i.condition && ld(i.condition, e) || !i.condition)
        return i;
  }
  return e > 0 ? o[0] : e < 0 ? (n = o[1]) != null ? n : o[0] : (s = o[2]) != null ? s : o[0];
}
function ld(o, e) {
  switch (o.op) {
    case "<":
      return e < o.value;
    case ">":
      return e > o.value;
    case "<=":
      return e <= o.value;
    case ">=":
      return e >= o.value;
    case "=":
      return e === o.value;
    case "<>":
      return e !== o.value;
    default:
      return !1;
  }
}
function ad(o, e) {
  let t = e;
  const n = xd(o, "%");
  n > 0 && (t *= Math.pow(100, n));
  const s = wd(o);
  return s > 0 && (t /= Math.pow(1e3, s)), /[eE][+-]?0+/.test(ft(o)) ? hd(o, t) : /[#0]*\s*[?#]+\/[?#0]+/.test(ft(o)) ? fd(o, t) : cd(o, t);
}
function cd(o, e) {
  var g;
  const t = os(o), n = t.indexOf("."), s = n >= 0 ? t.slice(0, n) : t, i = n >= 0 ? t.slice(n + 1) : "", r = s.includes(","), l = (i.match(/[0#?]/g) || []).length, a = vd(e, l), c = a < 0, d = Math.abs(a);
  let h = Math.floor(d).toString(), f = "";
  l > 0 && (f = (g = d.toFixed(l).split(".")[1]) != null ? g : "", f = kd(f, i));
  const u = (s.match(/0/g) || []).length;
  return h.length < u && (h = h.padStart(u, "0")), h === "0" && (s.match(/[0#]/g) || []).length === 0 && (h = ""), r && (h = Cd(h)), dd(o, (c ? "-" : "") + h + (f ? "." + f : ""));
}
function dd(o, e) {
  var r;
  const t = /[0#?]/.test(os(o));
  let n = "", s = !t, i = 0;
  for (; i < o.length; ) {
    const l = o[i];
    if (l === "\\") {
      n += (r = o[i + 1]) != null ? r : "", i += 2;
      continue;
    }
    if (l === '"') {
      const a = o.indexOf('"', i + 1);
      n += o.slice(i + 1, a < 0 ? o.length : a), i = a < 0 ? o.length : a + 1;
      continue;
    }
    if (l === "_") {
      n += " ", i += 2;
      continue;
    }
    if (l === "*") {
      i += 2;
      continue;
    }
    if (l === "[") {
      const a = o.indexOf("]", i);
      i = a < 0 ? o.length : a + 1;
      continue;
    }
    if (l === "%" || l === ",") {
      l === "%" && (n += "%"), i++;
      continue;
    }
    if (l === "0" || l === "#" || l === "?" || l === ".") {
      for (s || (n += e, s = !0); i < o.length && "0#?.,".includes(o[i]); ) i++;
      continue;
    }
    n += l, i++;
  }
  return s || (n += e), n;
}
function hd(o, e) {
  const t = /([0#.,]+)[eE]([+-]?)(0+)/.exec(ft(o)), n = t ? ((t[1].split(".")[1] || "").match(/[0#]/g) || []).length : 2, s = t ? t[2] : "+";
  let i = e.toExponential(n);
  return i = i.replace("e", "E"), s === "+" && (i = i.replace("E", "E+").replace("E+-", "E-").replace("E++", "E+")), i.replace(/E([+-])(\d+)/, (r, l, a) => `E${l}${a.padStart(t ? t[3].length : 2, "0")}`);
}
function fd(o, e) {
  const t = e < 0, n = Math.abs(e), s = Math.floor(n), i = n - s;
  if (i < 1e-9) return (t ? "-" : "") + s.toString();
  const [r, l] = ud(i, 99), a = t ? "-" : "";
  return s > 0 ? `${a}${s} ${r}/${l}` : `${a}${r}/${l}`;
}
function ud(o, e) {
  let t = 0, n = 1, s = Math.abs(o);
  for (let i = 1; i <= e; i++) {
    const r = Math.round(o * i), l = Math.abs(o - r / i);
    if (l < s && (s = l, t = r, n = i, l < 1e-9))
      break;
  }
  return [t, n];
}
const co = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Zs = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function pd(o, e, t) {
  const n = md(o), s = e.getUTCFullYear(), i = e.getUTCMonth() + 1, r = e.getUTCDate(), l = e.getUTCHours(), a = e.getUTCMinutes(), c = e.getUTCSeconds(), d = e.getUTCDay(), h = n.some((g) => /am\/pm|a\/p/i.test(g)), f = l % 12 || 12;
  let u = "", p = !1;
  for (let g = 0; g < n.length; g++) {
    const b = n[g], m = b.toLowerCase(), y = gd(n, g), w = /^[a-z[]/.test(m);
    switch (!0) {
      case m === "yyyy":
        u += String(s).padStart(4, "0");
        break;
      case m === "yy":
        u += String(s % 100).padStart(2, "0");
        break;
      case m === "mmmm":
        u += co[i - 1];
        break;
      case m === "mmm":
        u += co[i - 1].slice(0, 3);
        break;
      case m === "mmmmm":
        u += co[i - 1][0];
        break;
      case (m === "mm" && !p && !y):
        u += String(i).padStart(2, "0");
        break;
      case (m === "m" && !p && !y):
        u += String(i);
        break;
      case m === "mm":
        u += String(a).padStart(2, "0");
        break;
      // 跟在小时/秒前 → 分钟
      case m === "m":
        u += String(a);
        break;
      case m === "dddd":
        u += Zs[d];
        break;
      case m === "ddd":
        u += Zs[d].slice(0, 3);
        break;
      case m === "dd":
        u += String(r).padStart(2, "0");
        break;
      case m === "d":
        u += String(r);
        break;
      case m === "hh":
        u += String(h ? f : l).padStart(2, "0");
        break;
      case m === "h":
        u += String(h ? f : l);
        break;
      case /^\[h+\]$/.test(m):
        u += String(Math.floor(t * 24));
        break;
      case /^\[m+\]$/.test(m):
        u += String(Math.floor(t * 24 * 60));
        break;
      case /^\[s+\]$/.test(m):
        u += String(Math.floor(t * 86400));
        break;
      case m === "ss":
        u += String(c).padStart(2, "0");
        break;
      case m === "s":
        u += String(c);
        break;
      case /am\/pm/i.test(m):
        u += l < 12 ? "AM" : "PM";
        break;
      case /a\/p/i.test(m):
        u += l < 12 ? "A" : "P";
        break;
      default:
        u += b;
    }
    w && (p = /^h+$/.test(m) || /^\[h+\]$/.test(m));
  }
  return u;
}
function gd(o, e) {
  for (let t = e + 1; t < o.length; t++) {
    const n = o[t].toLowerCase();
    if (/^[a-z[]/.test(n)) return /^s+$/.test(n) || /^\[s+\]$/.test(n);
  }
  return !1;
}
function md(o) {
  var n;
  const e = [];
  let t = 0;
  for (; t < o.length; ) {
    const s = o[t];
    if (s === "\\") {
      e.push((n = o[t + 1]) != null ? n : ""), t += 2;
      continue;
    }
    if (s === '"') {
      const i = o.indexOf('"', t + 1);
      e.push(o.slice(t + 1, i < 0 ? o.length : i)), t = i < 0 ? o.length : i + 1;
      continue;
    }
    if (s === "[") {
      const i = o.indexOf("]", t);
      e.push(o.slice(t, i < 0 ? o.length : i + 1)), t = i < 0 ? o.length : i + 1;
      continue;
    }
    if (/[a-z]/i.test(s)) {
      if (o.slice(t, t + 5).toLowerCase() === "am/pm") {
        e.push(o.slice(t, t + 5)), t += 5;
        continue;
      }
      if (o.slice(t, t + 3).toLowerCase() === "a/p") {
        e.push(o.slice(t, t + 3)), t += 3;
        continue;
      }
      let i = t;
      for (; i < o.length && o[i].toLowerCase() === s.toLowerCase(); ) i++;
      e.push(o.slice(t, i)), t = i;
      continue;
    }
    e.push(s), t++;
  }
  return e;
}
function bd(o, e) {
  var s;
  let t = "";
  const n = o.raw;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (r === "@")
      t += e;
    else if (r === '"') {
      const l = n.indexOf('"', i + 1);
      t += n.slice(i + 1, l < 0 ? n.length : l), i = l < 0 ? n.length : l;
    } else r === "\\" ? (t += (s = n[i + 1]) != null ? s : "", i++) : t += r;
  }
  return { text: t, color: o.color };
}
function Qs(o) {
  if (typeof o == "number") {
    if (Number.isInteger(o)) return String(o);
    let e = o.toPrecision(11);
    return e.includes(".") && (e = e.replace(/0+$/, "").replace(/\.$/, "")), (Math.abs(o) >= 1e11 || Math.abs(o) < 1e-4 && o !== 0) && (e = o.toExponential()), e;
  }
  return o instanceof Date ? o.toISOString() : String(o);
}
function ft(o) {
  return o.replace(/"[^"]*"/g, "").replace(/\\./g, "");
}
function yd(o) {
  return ft(o).replace(/\[[^\]]*\]/g, "");
}
function os(o) {
  let e = "";
  for (let t = 0; t < o.length; t++) {
    const n = o[t];
    if (n === "\\") {
      t++;
      continue;
    }
    if (n === '"') {
      const s = o.indexOf('"', t + 1);
      t = s < 0 ? o.length : s;
      continue;
    }
    if (n === "[") {
      const s = o.indexOf("]", t);
      t = s < 0 ? o.length : s;
      continue;
    }
    if (n === "_" || n === "*") {
      t++;
      continue;
    }
    "0#?.,".includes(n) && (e += n);
  }
  return e;
}
function xd(o, e) {
  return (ft(o).match(new RegExp("\\" + e, "g")) || []).length;
}
function wd(o) {
  const e = os(o), t = /[0#?](,+)$/.exec(e);
  return t ? t[1].length : 0;
}
function vd(o, e) {
  const t = Math.pow(10, e);
  return Math.round((o + Number.EPSILON) * t) / t;
}
function kd(o, e) {
  const t = e.match(/[0#?]/g) || [];
  let n = o.split("");
  for (let s = n.length - 1; s >= 0 && (t[s] === "#" && n[s] === "0"); s--)
    n.pop();
  return n.join("");
}
function Cd(o) {
  const e = o.startsWith("-"), n = (e ? o.slice(1) : o).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (e ? "-" : "") + n;
}
function Sd(o, e) {
  const n = e ? Date.UTC(1904, 0, 1) : Date.UTC(1899, 11, 31);
  let s = (o.getTime() - n) / 864e5;
  return !e && s >= 60 && (s += 1), s;
}
const Ft = 1048576, at = 16384;
class qe {
  constructor(e, t = 1, n = 0, s = 0, i = !0) {
    C(this, "cols");
    C(this, "rows");
    /**
     * 虚拟行/列上限(≥ dimension,≤ Excel 上限)。**仅**用于"滚动出空行"的 spacer 尺寸 /
     * 可视区范围 / 命中夹取 / 表头;**不**改 totalWidth/Height(导出与 data-access 仍按 dimension)。
     */
    C(this, "vRows");
    C(this, "vCols");
    /** 行表头(显示行号)宽度 px */
    C(this, "rowHeaderWidth");
    /** 列表头(显示列字母)高度 px */
    C(this, "colHeaderHeight");
    C(this, "colLefts");
    // 长度 cols+1，colLefts[c] = 第 c 列左边缘(相对网格原点)
    C(this, "rowTops");
    // 长度 rows+1
    C(this, "colWidths");
    C(this, "rowHeights");
    /** 当前缩放比例(几何与字体同步按它缩放，保证缩放后排版一致) */
    C(this, "zoom");
    var r, l;
    this.sheet = e, this.zoom = t, this.cols = Math.max(e.dimension.cols, 1), this.rows = Math.max(e.dimension.rows, 1), this.vRows = Math.min(Math.max(this.rows, n), Ft), this.vCols = Math.min(Math.max(this.cols, s), at), this.colHeaderHeight = i ? Math.round(22 * t) : 0, this.rowHeaderWidth = i ? Math.round(Math.max(40, String(this.vRows).length * 8 + 16) * t) : 0, this.colWidths = new Array(this.cols), this.colLefts = new Array(this.cols + 1), this.colLefts[0] = 0;
    for (let a = 0; a < this.cols; a++) {
      const c = e.columns.get(a), d = (c != null && c.hidden ? 0 : (r = c == null ? void 0 : c.width) != null ? r : e.defaultColWidth) * t;
      this.colWidths[a] = d, this.colLefts[a + 1] = this.colLefts[a] + d;
    }
    this.rowHeights = new Array(this.rows), this.rowTops = new Array(this.rows + 1), this.rowTops[0] = 0;
    for (let a = 0; a < this.rows; a++) {
      const c = e.rows.get(a), d = (c != null && c.hidden ? 0 : (l = c == null ? void 0 : c.height) != null ? l : e.defaultRowHeight) * t;
      this.rowHeights[a] = d, this.rowTops[a + 1] = this.rowTops[a] + d;
    }
  }
  colWidth(e) {
    return e >= 0 && e < this.cols ? this.colWidths[e] : this.sheet.defaultColWidth * this.zoom;
  }
  rowHeight(e) {
    return e >= 0 && e < this.rows ? this.rowHeights[e] : this.sheet.defaultRowHeight * this.zoom;
  }
  get dcw() {
    return this.sheet.defaultColWidth * this.zoom;
  }
  get drh() {
    return this.sheet.defaultRowHeight * this.zoom;
  }
  /** 第 c 列左边缘(网格坐标，不含表头)。超出数据范围按默认列宽外推(模拟 Excel 无限网格)。 */
  colLeft(e) {
    return e <= 0 ? 0 : e >= this.cols ? this.colLefts[this.cols] + (e - this.cols) * this.dcw : this.colLefts[e];
  }
  rowTop(e) {
    return e <= 0 ? 0 : e >= this.rows ? this.rowTops[this.rows] + (e - this.rows) * this.drh : this.rowTops[e];
  }
  get totalWidth() {
    return this.colLefts[this.cols];
  }
  get totalHeight() {
    return this.rowTops[this.rows];
  }
  /** 含虚拟外推的总宽/高(spacer 尺寸用;= totalWidth + 虚拟列外推) */
  get virtualWidth() {
    return this.colLeft(this.vCols);
  }
  get virtualHeight() {
    return this.rowTop(this.vRows);
  }
  /** 给定网格 x 坐标，返回所在列。超出数据范围按默认列宽外推。 */
  colAt(e) {
    return e >= this.totalWidth ? this.cols + Math.floor((e - this.totalWidth) / this.dcw) : ei(this.colLefts, e, this.cols);
  }
  rowAt(e) {
    return e >= this.totalHeight ? this.rows + Math.floor((e - this.totalHeight) / this.drh) : ei(this.rowTops, e, this.rows);
  }
  /** 数据单元格的可视区列区间(end 夹到虚拟范围 vCols-1,允许滚动出空列;空格 paint 为 no-op) */
  visibleColRange(e, t) {
    const n = this.colAt(e), s = this.colAt(e + t);
    return [Math.min(n, this.vCols - 1), Math.min(s + 1, this.vCols - 1)];
  }
  visibleRowRange(e, t) {
    const n = this.rowAt(e), s = this.rowAt(e + t);
    return [Math.min(n, this.vRows - 1), Math.min(s + 1, this.vRows - 1)];
  }
  /** 网格线/表头的可视区列区间(可超出数据范围，铺满视口，模拟 Excel) */
  gridColRange(e, t) {
    return [Math.max(0, this.colAt(e)), this.colAt(e + t) + 1];
  }
  gridRowRange(e, t) {
    return [Math.max(0, this.rowAt(e)), this.rowAt(e + t) + 1];
  }
}
function ei(o, e, t) {
  if (e <= 0) return 0;
  if (e >= o[t]) return t - 1;
  let n = 0, s = t;
  for (; n < s; ) {
    const i = n + s >> 1;
    o[i] <= e ? n = i + 1 : s = i;
  }
  return Math.max(0, n - 1);
}
function Xe(o) {
  let e = o + 1, t = "";
  for (; e > 0; ) {
    const n = (e - 1) % 26;
    t = String.fromCharCode(65 + n) + t, e = Math.floor((e - 1) / 26);
  }
  return t;
}
function ss(o, e, t) {
  return !o || o.type === "empty" ? "" : o.type === "richtext" && o.rich ? o.rich.map((n) => n.text).join("") : ht(o.raw, e == null ? void 0 : e.numFmt, t).text;
}
function is(o, e, t) {
  return o.cells.get(O(e, t));
}
function We(o, e, t) {
  const n = is(o, e, t);
  return !n || n.type === "empty" ? null : n.raw;
}
function Ed(o, e, t) {
  const n = is(o, e, t);
  if (n)
    return o.styles[n.styleId];
}
function me(o, e, t, n = !1) {
  const s = is(o, e, t);
  return ss(s, s ? o.styles[s.styleId] : void 0, n);
}
function rs(o) {
  const e = /* @__PURE__ */ new Set();
  for (const t of o)
    for (let n = t.top; n <= t.bottom; n++)
      for (let s = t.left; s <= t.right; s++)
        n === t.top && s === t.left || e.add(O(n, s));
  return e;
}
function yn(o, e, t, n, s, i) {
  return i && i.has(O(e, t)) ? n ? "" : null : n ? me(o, e, t, s) : We(o, e, t);
}
function Td(o, e = {}) {
  var r, l;
  const t = (r = e.format) != null ? r : !0, n = (l = e.date1904) != null ? l : !1, s = rs(o.merges), i = [];
  for (let a = 0; a < o.dimension.rows; a++) {
    const c = [];
    for (let d = 0; d < o.dimension.cols; d++) c.push(yn(o, a, d, t, n, s));
    i.push(c);
  }
  return i;
}
function rb(o, e, t = {}) {
  var l, a;
  const n = (l = t.format) != null ? l : !0, s = (a = t.date1904) != null ? a : !1, i = rs(o.merges), r = [];
  for (let c = e.top; c <= e.bottom; c++) {
    const d = [];
    for (let h = e.left; h <= e.right; h++) d.push(yn(o, c, h, n, s, i));
    r.push(d);
  }
  return r;
}
function $d(o, e = {}) {
  var c, d, h;
  const t = (c = e.format) != null ? c : !0, n = (d = e.date1904) != null ? d : !1, s = (h = e.headerRow) != null ? h : 0, i = o.dimension.cols, r = rs(o.merges), l = [];
  for (let f = 0; f < i; f++) {
    const u = yn(o, s, f, !0, n, r);
    l.push(u || Xe(f));
  }
  const a = [];
  for (let f = s + 1; f < o.dimension.rows; f++) {
    let u = !0;
    const p = {};
    for (let g = 0; g < i; g++) {
      const b = yn(o, f, g, t, n, r);
      b !== null && b !== "" && (u = !1), p[l[g]] = b;
    }
    u || a.push(p);
  }
  return a;
}
function Md(o, e = {}) {
  const t = {};
  for (const n of o.sheets)
    n.state === "visible" && (t[n.name] = $d(n, z(R({}, e), { date1904: o.date1904 })));
  return t;
}
const Id = 56, Ad = 200, et = (o) => o ? o.length * 2 : 0;
function lb(o) {
  var t, n, s, i, r;
  let e = 0;
  for (const l of o.sheets) {
    for (const a of l.cells.values()) {
      e += Id;
      const c = a.raw;
      if (typeof c == "string" ? e += et(c) : typeof c == "number" ? e += 8 : typeof c == "boolean" ? e += 4 : c instanceof Date && (e += 8), a.formula && (e += et(a.formula)), a.hyperlink && (e += et(a.hyperlink)), a.comment && (e += et(a.comment)), a.dispImgId && (e += et(a.dispImgId)), a.rich) for (const d of a.rich) e += et(d.text) + 40;
    }
    e += l.styles.length * Ad, e += l.merges.length * 40, e += l.columns.size * 40, e += l.rows.size * 40;
    for (const a of l.images) e += (n = (t = a.bytes) == null ? void 0 : t.length) != null ? n : 0;
    (s = l.background) != null && s.bytes && (e += l.background.bytes.length);
  }
  if (o.cellImages) for (const l of o.cellImages.values()) e += (r = (i = l.bytes) == null ? void 0 : i.length) != null ? r : 0;
  return e;
}
function ab(o) {
  return o == null || !isFinite(o) || o < 0 ? "—" : o < 1024 ? `${o} B` : o < 1024 * 1024 ? `${(o / 1024).toFixed(o < 10 * 1024 ? 1 : 0)} KB` : `${(o / 1024 / 1024).toFixed(1)} MB`;
}
function cb() {
  if (typeof performance == "undefined") return null;
  const o = performance.memory;
  return typeof (o == null ? void 0 : o.usedJSHeapSize) == "number" ? o.usedJSHeapSize : null;
}
function Rd(o, e, t, n) {
  if (t == null || t === "") return null;
  if (typeof t == "number") return { row: o, col: e, type: "number", raw: t, styleId: n };
  if (typeof t == "boolean") return { row: o, col: e, type: "boolean", raw: t, styleId: n };
  if (t instanceof Date) return { row: o, col: e, type: "date", raw: t, styleId: n };
  const s = t;
  if (s[0] === "=") {
    const i = nl(s);
    return R({ row: o, col: e, type: "formula", raw: null, formula: s, styleId: n }, i ? { dispImgId: i } : {});
  }
  return s.trim() !== "" && !isNaN(Number(s)) ? { row: o, col: e, type: "number", raw: Number(s), styleId: n } : { row: o, col: e, type: "string", raw: s, styleId: n };
}
function pt(o, e, t) {
  e + 1 > o.dimension.rows && (o.dimension.rows = e + 1), t + 1 > o.dimension.cols && (o.dimension.cols = t + 1);
}
function _e(o, e, t, n) {
  var a;
  const s = O(e, t), i = o.cells.get(s), r = (a = i == null ? void 0 : i.styleId) != null ? a : 0, l = Rd(e, t, n, r);
  l ? (o.cells.set(s, l), pt(o, e, t)) : o.cells.delete(s);
}
function db(o, e, t) {
  o.cells.delete(O(e, t));
}
function Fd(o, e, t, n) {
  const s = O(e, t), i = o.cells.get(s), r = n.trim();
  i ? r ? i.comment = r : (delete i.comment, i.type === "empty" && !i.comment && o.cells.delete(s)) : r && (o.cells.set(s, { row: e, col: t, type: "empty", raw: null, comment: r, styleId: 0 }), pt(o, e, t));
}
function hb(o, e, t) {
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (let i = 0; i < s.length; i++)
      _e(o, e.top + n, e.left + i, s[i]);
  }
}
function Ld(o, e, t, n) {
  const s = o.cells.get(O(e, t));
  s && (s.raw = n);
}
function ti(o, e, t, n) {
  const s = O(e, t);
  n ? (o.cells.set(s, n), pt(o, e, t)) : o.cells.delete(s);
}
function Nd(o, e, t) {
  var s;
  const n = o.columns.get(e);
  o.columns.set(e, { width: Math.max(8, t), hidden: (s = n == null ? void 0 : n.hidden) != null ? s : !1 });
}
function Pd(o, e, t) {
  var s;
  const n = o.rows.get(e);
  o.rows.set(e, { height: Math.max(6, t), hidden: (s = n == null ? void 0 : n.hidden) != null ? s : !1 });
}
function se(o) {
  return z(R({}, o), { from: R({}, o.from), to: o.to ? R({}, o.to) : void 0, crop: o.crop ? R({}, o.crop) : void 0 });
}
function Wo(o, e, t) {
  const n = t != null ? t : o.images.length;
  return o.images.splice(n, 0, e), n;
}
function Od(o, e) {
  o.images.splice(e, 1);
}
function ni(o, e) {
  o.cells.set(O(e.row, e.col), e), pt(o, e.row, e.col);
}
function Hd(o) {
  let e = o.size, t = `ID_cell_${e}`;
  for (; o.has(t); ) t = `ID_cell_${++e}`;
  return t;
}
function Dd(o, e) {
  for (const t of o.sheets) for (const n of t.cells.values()) if (n.dispImgId === e) return !0;
  return !1;
}
function ho(o, e, t, n, s) {
  var a;
  const i = e.images[t];
  if (!i || !i.bytes || !i.mime) return null;
  o.cellImages || (o.cellImages = /* @__PURE__ */ new Map());
  const r = Hd(o.cellImages);
  o.cellImages.set(r, { id: r, bytes: i.bytes, mime: i.mime, src: i.src || "" });
  const l = e.cells.get(O(n, s));
  return e.cells.set(O(n, s), {
    row: n,
    col: s,
    type: "formula",
    raw: null,
    formula: `_xlfn.DISPIMG("${r}",1)`,
    dispImgId: r,
    styleId: (a = l == null ? void 0 : l.styleId) != null ? a : 0
  }), pt(e, n, s), e.images.splice(t, 1), l || xn(e, n, s, { fill: { type: "none" } }), r;
}
function oi(o, e, t, n, s = { width: 96, height: 96 }) {
  var h, f, u;
  const i = O(t, n), r = e.cells.get(i), l = r == null ? void 0 : r.dispImgId;
  if (!l) return -1;
  const a = (h = o.cellImages) == null ? void 0 : h.get(l), c = {
    src: (f = a == null ? void 0 : a.src) != null ? f : "",
    bytes: a == null ? void 0 : a.bytes,
    mime: a == null ? void 0 : a.mime,
    from: { col: n, row: t, colOffEmu: 0, rowOffEmu: 0 },
    extWidthEmu: Pe(s.width),
    extHeightEmu: Pe(s.height),
    editAs: "oneCell"
  };
  e.cells.delete(i);
  const d = e.images.length;
  return e.images.push(c), Dd(o, l) || (u = o.cellImages) == null || u.delete(l), d;
}
function fo(o, e, t, n) {
  const s = o.images[e];
  if (!s) return;
  const i = (r) => Pe(r / n);
  s.from = { col: 0, row: 0, colOffEmu: i(t.left), rowOffEmu: i(t.top) }, s.to = void 0, s.extWidthEmu = i(t.width), s.extHeightEmu = i(t.height);
}
function At(o, e, t, n) {
  const s = e === "col" ? o.columns : o.rows;
  n ? s.set(t, n) : s.delete(t);
}
function Uo(o, e) {
  const t = JSON.stringify(e);
  for (let n = 0; n < o.styles.length; n++) if (JSON.stringify(o.styles[n]) === t) return n;
  return o.styles.push(e), o.styles.length - 1;
}
function qo(o, e) {
  return z(R(R({}, o), e), {
    font: e.font ? R(R({}, o.font), e.font) : o.font,
    fill: e.fill ? R(R({}, o.fill), e.fill) : o.fill,
    borders: e.borders ? R(R({}, o.borders), e.borders) : o.borders,
    protection: e.protection ? R(R({}, o.protection), e.protection) : o.protection
  });
}
function xn(o, e, t, n) {
  var a;
  const s = O(e, t), i = o.cells.get(s), r = (a = i ? o.styles[i.styleId] : o.styles[0]) != null ? a : o.styles[0];
  if (!r) return;
  const l = Uo(o, qo(r, n));
  i ? i.styleId = l : (o.cells.set(s, { row: e, col: t, type: "empty", raw: null, styleId: l }), pt(o, e, t));
}
const zd = {
  headerBg: "#F5F6F7",
  headerActiveBg: "#E1E6EB",
  headerText: "#4B4B4B",
  headerLine: "#C6CCD2",
  gridLine: "#E0E2E5",
  selBorder: "#1A73E8",
  selFill: "rgba(26,115,232,0.10)"
};
function Bd(o) {
  return R(R({}, zd), o || {});
}
class si {
  constructor(e) {
    /** key `${row}:${col}` → 该 cell 所属的合并区(任意成员都能查到) */
    C(this, "map", /* @__PURE__ */ new Map());
    /** 锚点(左上角) key 集合 */
    C(this, "anchors", /* @__PURE__ */ new Set());
    for (const t of e.merges) {
      this.anchors.add(`${t.top}:${t.left}`);
      for (let n = t.top; n <= t.bottom; n++)
        for (let s = t.left; s <= t.right; s++)
          this.map.set(`${n}:${s}`, t);
    }
  }
  /** 该 cell 所在的合并区(没有返回 undefined) */
  rangeOf(e, t) {
    return this.map.get(`${e}:${t}`);
  }
  /** 是否合并区锚点(左上角，渲染内容的那个) */
  isAnchor(e, t) {
    return this.anchors.has(`${e}:${t}`);
  }
  /** 是否被合并覆盖但不是锚点(渲染时跳过内容) */
  isCovered(e, t) {
    const n = this.map.get(`${e}:${t}`);
    return !!n && !(n.top === e && n.left === t);
  }
}
function yt(o, e) {
  const t = Math.min(o.freeze.frozenRows, e.rows), n = Math.min(o.freeze.frozenCols, e.cols);
  return {
    frozenRows: t,
    frozenCols: n,
    frozenWidth: e.colLeft(n),
    frozenHeight: e.rowTop(t)
  };
}
function Wd(o, e, t, n, s, i) {
  const r = o.rowHeaderWidth, l = o.colHeaderHeight, a = e.frozenWidth, c = e.frozenHeight, d = r + a, h = l + c, f = Math.max(0, s - d), u = Math.max(0, i - h), [p, g] = o.visibleColRange(t + a, f), [b, m] = o.visibleRowRange(n + c, u), y = [];
  return y.push({
    clipX: d,
    clipY: h,
    clipW: f,
    clipH: u,
    offsetX: t,
    offsetY: n,
    colStart: Math.max(p, e.frozenCols),
    colEnd: g,
    rowStart: Math.max(b, e.frozenRows),
    rowEnd: m
  }), e.frozenCols > 0 && y.push({
    clipX: r,
    clipY: h,
    clipW: a,
    clipH: u,
    offsetX: 0,
    offsetY: n,
    colStart: 0,
    colEnd: e.frozenCols - 1,
    rowStart: Math.max(b, e.frozenRows),
    rowEnd: m
  }), e.frozenRows > 0 && y.push({
    clipX: d,
    clipY: l,
    clipW: f,
    clipH: c,
    offsetX: t,
    offsetY: 0,
    colStart: Math.max(p, e.frozenCols),
    colEnd: g,
    rowStart: 0,
    rowEnd: e.frozenRows - 1
  }), e.frozenRows > 0 && e.frozenCols > 0 && y.push({
    clipX: r,
    clipY: l,
    clipW: a,
    clipH: c,
    offsetX: 0,
    offsetY: 0,
    colStart: 0,
    colEnd: e.frozenCols - 1,
    rowStart: 0,
    rowEnd: e.frozenRows - 1
  }), { panes: y, rowHeaderWidth: r, colHeaderHeight: l };
}
class ol {
  constructor(e) {
    C(this, "prepared", []);
    this.sheet = e;
    for (const t of e.conditional)
      this.prepared.push(this.prepare(t));
  }
  hasRules() {
    return this.prepared.length > 0;
  }
  numericValuesIn(e) {
    const t = [];
    for (const n of e)
      for (let s = n.top; s <= n.bottom; s++)
        for (let i = n.left; i <= n.right; i++) {
          const r = this.sheet.cells.get(O(s, i));
          r && typeof r.raw == "number" && t.push(r.raw);
        }
    return t;
  }
  prepare(e) {
    var l, a;
    const t = (c, d) => e.ranges.some((h) => c >= h.top && c <= h.bottom && d >= h.left && d <= h.right);
    let n = 0, s = 0, i = 0, r;
    if (e.type === "colorScale" || e.type === "dataBar" || e.type === "iconSet" || e.type === "top10") {
      const c = this.numericValuesIn(e.ranges);
      if (c.length && (n = Math.min(...c), s = Math.max(...c), i = n + (s - n) / 2, e.type === "top10")) {
        const d = Math.max(1, Math.round(Number((a = (l = e.formulae) == null ? void 0 : l[0]) != null ? a : 10))), h = [...c].sort((f, u) => u - f);
        r = h[Math.min(d, h.length) - 1];
      }
    }
    return { rule: e, min: n, max: s, mid: i, threshold: r, inRange: t };
  }
  /** 返回所有命中该格的规则索引 + 各自计算出的 effect(供 Cell Inspector 查询;不做"第一条赢"短路) */
  inspectHits(e, t, n) {
    const s = [];
    for (let i = 0; i < this.prepared.length; i++) {
      const r = this.prepared[i];
      if (!r.inRange(e, t)) continue;
      const l = this.evalRule(r, n);
      l && s.push({ ruleIndex: i, effect: l });
    }
    return s;
  }
  /** 单条规则在某格上的 effect(命中返 patch,不命中返 null);effectsFor 与 inspectHits 共用 */
  evalRule(e, t) {
    var i, r, l;
    const n = e.rule, s = typeof t == "number" ? t : null;
    switch (n.type) {
      case "cellIs":
      case "expression":
      case "top10": {
        if (!(n.type === "top10" ? s != null && e.threshold != null && s >= e.threshold : ii(n, s)) || !n.style) return null;
        const c = {};
        return (i = n.style.fill) != null && i.fgColor && (c.fillColor = n.style.fill.fgColor), (r = n.style.font) != null && r.color && (c.fontColor = n.style.font.color), (l = n.style.font) != null && l.bold && (c.bold = !0), Object.keys(c).length ? c : null;
      }
      case "colorScale":
        return s == null || !n.colorScale || e.max === e.min ? null : { fillColor: ri(n.colorScale, s, e.min, e.mid, e.max) };
      case "dataBar":
        return s == null || !n.dataBar ? null : { dataBar: { ratio: e.max === e.min ? 1 : Math.max(0, Math.min(1, (s - Math.min(0, e.min)) / (e.max - Math.min(0, e.min)))), color: n.dataBar.color, gradient: n.dataBar.gradient } };
      case "iconSet": {
        if (s == null || !n.iconSet) return null;
        const a = ai(n.iconSet.name), c = e.max === e.min ? 1 : (s - e.min) / (e.max - e.min), d = Math.min(a - 1, Math.floor(c * a));
        return { icon: { setName: n.iconSet.name, level: d, count: a } };
      }
    }
    return null;
  }
  effectsFor(e, t, n) {
    var r, l, a;
    let s = null;
    const i = (c) => {
      s = s ? R(R({}, c), s) : c;
    };
    for (const c of this.prepared) {
      if (!c.inRange(e, t)) continue;
      const d = c.rule, h = typeof n == "number" ? n : null;
      switch (d.type) {
        case "cellIs":
        case "expression":
        case "top10": {
          if ((d.type === "top10" ? h != null && c.threshold != null && h >= c.threshold : ii(d, h)) && d.style) {
            const u = {};
            (r = d.style.fill) != null && r.fgColor && (u.fillColor = d.style.fill.fgColor), (l = d.style.font) != null && l.color && (u.fontColor = d.style.font.color), (a = d.style.font) != null && a.bold && (u.bold = !0), i(u);
          }
          break;
        }
        case "colorScale": {
          if (h == null || !d.colorScale || c.max === c.min) break;
          i({ fillColor: ri(d.colorScale, h, c.min, c.mid, c.max) });
          break;
        }
        case "dataBar": {
          if (h == null || !d.dataBar) break;
          const f = c.max === c.min ? 1 : Math.max(0, Math.min(1, (h - Math.min(0, c.min)) / (c.max - Math.min(0, c.min))));
          i({ dataBar: { ratio: f, color: d.dataBar.color, gradient: d.dataBar.gradient } });
          break;
        }
        case "iconSet": {
          if (h == null || !d.iconSet) break;
          const f = ai(d.iconSet.name), u = c.max === c.min ? 1 : (h - c.min) / (c.max - c.min), p = Math.min(f - 1, Math.floor(u * f));
          i({ icon: { setName: d.iconSet.name, level: p, count: f } });
          break;
        }
      }
    }
    return s;
  }
}
function ii(o, e) {
  if (e == null || !o.formulae) return !1;
  const t = Number(o.formulae[0]), n = o.formulae[1] != null ? Number(o.formulae[1]) : void 0;
  switch (o.operator) {
    case "greaterThan":
      return e > t;
    case "greaterThanOrEqual":
      return e >= t;
    case "lessThan":
      return e < t;
    case "lessThanOrEqual":
      return e <= t;
    case "equal":
      return e === t;
    case "notEqual":
      return e !== t;
    case "between":
      return n != null && e >= t && e <= n;
    case "notBetween":
      return n != null && (e < t || e > n);
    default:
      return !1;
  }
}
function ri(o, e, t, n, s) {
  return o.mid ? e <= n ? uo(o.min, o.mid, (e - t) / (n - t || 1)) : uo(o.mid, o.max, (e - n) / (s - n || 1)) : uo(o.min, o.max, (e - t) / (s - t || 1));
}
function uo(o, e, t) {
  t = Math.max(0, Math.min(1, t));
  const n = li(o), s = li(e), i = Math.round(n.r + (s.r - n.r) * t), r = Math.round(n.g + (s.g - n.g) * t), l = Math.round(n.b + (s.b - n.b) * t);
  return `rgb(${i},${r},${l})`;
}
function li(o) {
  const e = /^#?([0-9a-f]{6})$/i.exec(o);
  if (!e) return { r: 255, g: 255, b: 255 };
  const t = parseInt(e[1], 16);
  return { r: t >> 16 & 255, g: t >> 8 & 255, b: t & 255 };
}
function ai(o) {
  return o.startsWith("5") ? 5 : o.startsWith("4") ? 4 : 3;
}
function Ud(o, e, t, n, s, i) {
  var r;
  if (!(!e || e.type === "none")) {
    if (e.type === "solid") {
      if (!e.fgColor) return;
      o.fillStyle = e.fgColor, o.fillRect(t, n, s, i);
      return;
    }
    if (e.type === "gradient") {
      const l = e.gradientStops || [];
      if (!l.length) return;
      const a = ((r = e.gradientAngle) != null ? r : 90) * Math.PI / 180, c = t + s / 2, d = n + i / 2, h = (Math.abs(s * Math.cos(a)) + Math.abs(i * Math.sin(a))) / 2, f = Math.cos(a) * h, u = Math.sin(a) * h, p = o.createLinearGradient(c - f, d - u, c + f, d + u);
      for (const g of l) p.addColorStop(Math.min(1, Math.max(0, g.position)), g.color);
      o.fillStyle = p, o.fillRect(t, n, s, i);
      return;
    }
    e.type === "pattern" && (e.bgColor && (o.fillStyle = e.bgColor, o.fillRect(t, n, s, i)), e.fgColor && qd(o, e.pattern || "gray125", e.fgColor, t, n, s, i));
  }
}
function qd(o, e, t, n, s, i, r) {
  o.save(), o.beginPath(), o.rect(n, s, i, r), o.clip(), o.fillStyle = t, o.strokeStyle = t;
  const l = {
    gray0625: 0.0625,
    gray125: 0.125,
    lightGray: 0.25,
    mediumGray: 0.5,
    gray: 0.5,
    darkGray: 0.75
  };
  if (e in l) {
    o.globalAlpha = l[e], o.fillRect(n, s, i, r), o.restore();
    return;
  }
  const a = e.toLowerCase(), c = a.startsWith("dark"), d = c ? 3 : 5;
  o.lineWidth = c ? 1.4 : 1;
  const h = () => {
    for (let g = s + 0.5; g < s + r; g += d) Vt(o, n, g, n + i, g);
  }, f = () => {
    for (let g = n + 0.5; g < n + i; g += d) Vt(o, g, s, g, s + r);
  }, u = () => {
    for (let g = -r; g < i; g += d) Vt(o, n + g, s, n + g + r, s + r);
  }, p = () => {
    for (let g = -r; g < i; g += d) Vt(o, n + g, s + r, n + g + r, s);
  };
  a.includes("horizontal") ? h() : a.includes("vertical") ? f() : a.includes("grid") ? (h(), f()) : a.includes("trellis") ? (u(), p()) : a.includes("down") ? u() : a.includes("up") ? p() : u(), o.restore();
}
function Vt(o, e, t, n, s) {
  o.beginPath(), o.moveTo(e, t), o.lineTo(n, s), o.stroke();
}
const ci = {
  none: 0,
  hair: 1,
  dotted: 2,
  dashDotDot: 3,
  dashDot: 4,
  dashed: 5,
  thin: 6,
  mediumDashDotDot: 7,
  slantDashDot: 8,
  mediumDashDot: 9,
  mediumDashed: 10,
  medium: 11,
  thick: 12,
  double: 13
};
function Yt(o, e) {
  const t = o ? ci[o.style] : 0;
  return (e ? ci[e.style] : 0) > t ? e : o;
}
function sl(o) {
  switch (o) {
    case "hair":
      return { width: 0.5, dash: [], double: !1 };
    case "thin":
      return { width: 1, dash: [], double: !1 };
    case "medium":
      return { width: 2, dash: [], double: !1 };
    case "thick":
      return { width: 3, dash: [], double: !1 };
    case "double":
      return { width: 1, dash: [], double: !0 };
    case "dotted":
      return { width: 1, dash: [1, 1], double: !1 };
    case "dashed":
      return { width: 1, dash: [3, 2], double: !1 };
    case "mediumDashed":
      return { width: 2, dash: [4, 2], double: !1 };
    case "dashDot":
      return { width: 1, dash: [3, 2, 1, 2], double: !1 };
    case "mediumDashDot":
      return { width: 2, dash: [4, 2, 1, 2], double: !1 };
    case "dashDotDot":
      return { width: 1, dash: [3, 2, 1, 2, 1, 2], double: !1 };
    case "mediumDashDotDot":
      return { width: 2, dash: [4, 2, 1, 2, 1, 2], double: !1 };
    case "slantDashDot":
      return { width: 1, dash: [4, 2], double: !1 };
    default:
      return { width: 1, dash: [], double: !1 };
  }
}
function ze(o, e, t, n, s, i) {
  if (!e || e.style === "none") return;
  const r = sl(e.style);
  o.save(), o.strokeStyle = e.color, o.lineWidth = r.width, o.setLineDash(r.dash);
  const l = n === i, a = (c) => Math.round(c) + (r.width % 2 === 1 ? 0.5 : 0);
  r.double ? l ? (Ke(o, t, a(n - 1), s, a(n - 1)), Ke(o, t, a(n + 1), s, a(n + 1))) : (Ke(o, a(t - 1), n, a(t - 1), i), Ke(o, a(t + 1), n, a(t + 1), i)) : l ? Ke(o, t, a(n), s, a(i)) : Ke(o, a(t), n, a(s), i), o.restore();
}
function Ke(o, e, t, n, s) {
  o.beginPath(), o.moveTo(e, t), o.lineTo(n, s), o.stroke();
}
function di(o, e, t, n, s, i) {
  if (!e || e.style === "none") return;
  const r = sl(e.style);
  o.save(), o.strokeStyle = e.color, o.lineWidth = r.width, o.setLineDash(r.dash), Ke(o, t, n, s, i), o.restore();
}
const dt = 1.18, Fe = 3;
function ve(o, e = 1) {
  const t = o.italic ? "italic " : "", n = o.bold ? "bold " : "", s = Math.max(1, o.size * e * (96 / 72));
  return `${t}${n}${s.toFixed(1)}px ${_d(o.name)}, sans-serif`;
}
function _d(o) {
  return /\s/.test(o) ? `"${o}"` : o;
}
const po = /* @__PURE__ */ new Map();
function wn(o, e, t) {
  const n = t + "\0" + e, s = po.get(n);
  if (s !== void 0) return s;
  o.font = t;
  const i = o.measureText(e).width;
  return po.size < 2e4 && po.set(n, i), i;
}
function go(o, e) {
  return o === "general" ? e ? "right" : "left" : o;
}
function vn(o, e, t, n) {
  const s = e.split(`
`);
  if (n <= 0) return s;
  const i = [];
  for (const r of s) {
    let l = "";
    for (const a of r) {
      const c = l + a;
      wn(o, c, t) > n && l ? (i.push(l), l = a) : l = c;
    }
    i.push(l);
  }
  return i;
}
function jd(o, e, t, n) {
  const s = wn(o, e, t);
  return s <= n || s === 0 ? 1 : Math.max(0.3, n / s);
}
const _o = /* @__PURE__ */ new WeakSet();
function Vd(o) {
  _o.delete(o);
}
function Yd(o, e, t) {
  var l, a;
  if (_o.has(o)) return;
  const n = t != null ? t : Gd();
  if (!n) return;
  _o.add(o), n.save();
  const s = /* @__PURE__ */ new Set();
  for (const c of o.merges)
    for (let d = c.top; d <= c.bottom; d++)
      for (let h = c.left; h <= c.right; h++) s.add(O(d, h));
  const i = (c) => {
    var h;
    const d = o.columns.get(c);
    return d != null && d.hidden ? 0 : (h = d == null ? void 0 : d.width) != null ? h : o.defaultColWidth;
  }, r = /* @__PURE__ */ new Map();
  for (const [c, d] of o.cells) {
    if (d.type === "empty" || s.has(c)) continue;
    const h = o.styles[d.styleId], f = Xd(n, d, h, i(d.col), e);
    f > ((l = r.get(d.row)) != null ? l : 0) && r.set(d.row, f);
  }
  n.restore();
  for (const [c, d] of r) {
    if (d <= 0) continue;
    const h = o.rows.get(c);
    if (h != null && h.hidden || h != null && h.customHeight) continue;
    const f = (a = h == null ? void 0 : h.height) != null ? a : o.defaultRowHeight, u = Math.ceil(o.defaultRowHeight + d + Fe);
    u > f && o.rows.set(c, { height: u, hidden: !1 });
  }
}
function Xd(o, e, t, n, s) {
  if (!t.wrapText && e.type !== "string" && e.type !== "richtext") return 0;
  const i = e.type === "richtext" && e.rich ? e.rich.map((a) => a.text).join("") : ht(e.raw, t.numFmt, s.date1904).text;
  if (!i) return 0;
  let r;
  if (t.wrapText) {
    const a = ve(t.font, 1), c = n - Fe * 2;
    r = vn(o, i, a, c).length;
  } else {
    if (!i.includes(`
`)) return 0;
    r = i.split(`
`).length;
  }
  if (r < 2) return 0;
  const l = t.font.size * Rn * dt;
  return (r - 1) * l;
}
function Gd() {
  return typeof document == "undefined" ? null : document.createElement("canvas").getContext("2d");
}
const Kd = 16;
function Jd(o, e, t) {
  return o ? e === o.top && t >= o.left && t <= o.right : !1;
}
function jo(o, e, t, n) {
  const s = Math.min(Kd, t - 2, n - 2);
  return s < 8 ? null : { x: o + t - s - 1, y: e + (n - s) / 2, size: s };
}
function hi(o, e, t, n, s, i = !1) {
  const r = jo(e, t, n, s);
  if (!r) return 0;
  const { x: l, y: a, size: c } = r;
  o.save(), o.fillStyle = i ? "#E3F0FF" : "#FFFFFF", o.strokeStyle = i ? "#1A73E8" : "#A0A0A0", o.lineWidth = 1, o.beginPath(), o.rect(Math.round(l) + 0.5, Math.round(a) + 0.5, c, c), o.fill(), o.stroke();
  const d = l + c / 2, h = a + c / 2;
  return i ? (o.fillStyle = "#1A73E8", o.beginPath(), o.moveTo(d - 3.5, h - 3), o.lineTo(d + 3.5, h - 3), o.lineTo(d + 1, h + 0.5), o.lineTo(d + 1, h + 3.5), o.lineTo(d - 1, h + 2.5), o.lineTo(d - 1, h + 0.5), o.closePath(), o.fill()) : (o.fillStyle = "#5B5B5B", o.beginPath(), o.moveTo(d - 3, h - 1.5), o.lineTo(d + 3, h - 1.5), o.lineTo(d, h + 2.5), o.closePath(), o.fill()), o.restore(), c + 2;
}
function fi(o, e, t, n) {
  const s = Math.min(13, t - 2, n - 2);
  return s < 8 ? null : { x: o + 1, y: e + (n - s) / 2, size: s };
}
function Zd(o, e, t, n, s) {
  o.save(), o.fillStyle = "#ffffff", o.strokeStyle = "#7a8694", o.lineWidth = 1, o.fillRect(e + 0.5, t + 0.5, n - 1, n - 1), o.strokeRect(e + 0.5, t + 0.5, n - 1, n - 1), o.strokeStyle = "#1f2329", o.beginPath();
  const i = e + n / 2, r = t + n / 2, l = n / 2 - 3;
  o.moveTo(i - l, r), o.lineTo(i + l, r), s && (o.moveTo(i, r - l), o.lineTo(i, r + l)), o.stroke(), o.restore();
}
class il {
  constructor(e, t, n, s = 1, i) {
    C(this, "metrics");
    C(this, "merges");
    C(this, "freeze");
    /** 冻结预览(WPS 冻结 ▾ 悬停某项时高亮将冻结的区域:灰底 + 分割线加重);null=不画。 */
    C(this, "freezePreview", null);
    /** 「显示批注」(审阅选项卡):true=常驻画所有批注小黄框。 */
    C(this, "showAllComments", !1);
    /** 行号列标(视图选项卡):false=隐藏行/列表头(metrics 表头尺寸归 0)。 */
    C(this, "showHeaders", !0);
    C(this, "cond");
    C(this, "ctx");
    C(this, "dpr", 1);
    C(this, "sparklineIndex", /* @__PURE__ */ new Map());
    C(this, "theme");
    C(this, "cellStyleHook");
    C(this, "onNeedsRedraw");
    C(this, "cellImageFit");
    /** Phase C 2026-06-08: 只读视觉钩子, 渲染时按格套用 */
    C(this, "readOnlyStyleHook");
    /** Phase C 2026-06-08: 查询该格是否可编辑 (controller 注入). 默认全可编辑 (老行为) */
    C(this, "isEditableFn", () => !0);
    /** 虚拟外推行/列数(滚动出空行用;0 = 仅按 dimension)。透传给 GridMetrics,不影响导出。 */
    C(this, "virtualRows", 0);
    C(this, "virtualCols", 0);
    /** WPS 单元格内嵌图解码缓存: blob src → 已加载的 HTMLImageElement(complete 才画) */
    C(this, "cellImageCache", /* @__PURE__ */ new Map());
    // ---------------- 交互查询 ----------------
    C(this, "selection", null);
    /** 自动填充柄可见(= editable;1.10.0)。控制器创建后设置。 */
    C(this, "showFillHandle", !1);
    /** 自动填充拖拽预览区(目标范围;拖拽中由控制器设)。 */
    C(this, "fillPreview", null);
    /** 不连续多选的附加区域(1.13.0;不含 active 区,active 区仍走 setSelection)。 */
    C(this, "extraSelection", []);
    // ---------------- 查找 ----------------
    C(this, "findHits", []);
    C(this, "findCurrent", -1);
    // ---------------- 筛选 ----------------
    C(this, "filteredCols", /* @__PURE__ */ new Set());
    var l;
    this.canvas = e, this.sheet = t, this.workbook = n, this.theme = Bd(i == null ? void 0 : i.theme), this.cellStyleHook = i == null ? void 0 : i.cellStyle, this.onNeedsRedraw = i == null ? void 0 : i.onNeedsRedraw, this.cellImageFit = (l = i == null ? void 0 : i.cellImageFit) != null ? l : "contain", this.readOnlyStyleHook = i == null ? void 0 : i.readOnlyCellStyle, i != null && i.isEditable && (this.isEditableFn = i.isEditable);
    const r = e.getContext("2d");
    if (!r) throw new Error("无法获取 canvas 2d context");
    this.ctx = r, Yd(t, n, r), this.metrics = new qe(t, s, this.virtualRows, this.virtualCols, this.showHeaders), this.merges = new si(t), this.freeze = yt(t, this.metrics), this.cond = new ol(t);
    for (const a of t.sparklines) this.sparklineIndex.set(O(a.row, a.col), a);
  }
  /** 改 WPS 单元格内嵌图贴合方式(fill/contain/cover);返回是否有变化(变了需重绘)。 */
  setCellImageFit(e) {
    return e === this.cellImageFit ? !1 : (this.cellImageFit = e, !0);
  }
  /** 改变缩放: 重建几何(列宽行高表头按 zoom 缩放)。合并/条件格式无需重建。 */
  setZoom(e) {
    e !== this.metrics.zoom && (this.metrics = new qe(this.sheet, e, this.virtualRows, this.virtualCols, this.showHeaders), this.freeze = yt(this.sheet, this.metrics));
  }
  /** 行号列标显隐(视图选项卡);变了重建几何。返回是否变化。 */
  setShowHeaders(e) {
    return e === this.showHeaders ? !1 : (this.showHeaders = e, this.metrics = new qe(this.sheet, this.metrics.zoom, this.virtualRows, this.virtualCols, this.showHeaders), this.freeze = yt(this.sheet, this.metrics), !0);
  }
  areHeadersVisible() {
    return this.showHeaders;
  }
  /**
   * 设虚拟外推行/列数(滚动出空行/空列);仅当变化时重建 GridMetrics,返回是否变了(变了需重绘 + 刷 spacer)。
   * 不影响 dimension / 导出 / data-access。
   */
  setVirtualExtent(e, t) {
    return e === this.virtualRows && t === this.virtualCols ? !1 : (this.virtualRows = e, this.virtualCols = t, this.metrics = new qe(this.sheet, this.metrics.zoom, e, t, this.showHeaders), this.freeze = yt(this.sheet, this.metrics), !0);
  }
  /** 内容总尺寸(含表头)，给外层滚动容器用(用虚拟范围 → 可滚动出空行/列) */
  get contentWidth() {
    return this.metrics.rowHeaderWidth + this.metrics.virtualWidth;
  }
  get contentHeight() {
    return this.metrics.colHeaderHeight + this.metrics.virtualHeight;
  }
  get freezeGeometry() {
    return this.freeze;
  }
  /** 默认行高(已含缩放),供翻页步长估算 */
  get defaultRowPx() {
    return this.sheet.defaultRowHeight * this.metrics.zoom;
  }
  /** 把行列号映射到当前视图的屏幕矩形(供叠加层定位) */
  screenRectOfCell(e, t, n) {
    const s = this.metrics.rowHeaderWidth + this.metrics.colLeft(n) - e.scrollX, i = this.metrics.colHeaderHeight + this.metrics.rowTop(t) - e.scrollY;
    return { x: s, y: i, w: this.metrics.colWidth(n), h: this.metrics.rowHeight(t) };
  }
  setSelection(e) {
    this.selection = e;
  }
  setFillPreview(e) {
    this.fillPreview = e;
  }
  setExtraSelection(e) {
    this.extraSelection = e;
  }
  // 查找匹配逻辑 1.16.1 起移到框架无关 find-engine.ts(支持范围/方向/查找范围/通配符);
  // 渲染器只保留高亮绘制(setFind + drawFind),控制器把当前表命中喂进来。
  /** 设置高亮命中集 + 当前项(供 drawFind 绘制) */
  setFind(e, t) {
    this.findHits = e, this.findCurrent = t;
  }
  /** 标记哪些列处于筛选态(下拉按钮画成蓝色漏斗) */
  setFilteredCols(e) {
    this.filteredCols = e;
  }
  /** 单元格的当前屏幕矩形(冻结感知: 冻结行/列不随滚动) */
  cellScreenRect(e, t, n) {
    const s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, r = s + this.metrics.colLeft(n) - (n < this.freeze.frozenCols ? 0 : e.scrollX), l = i + this.metrics.rowTop(t) - (t < this.freeze.frozenRows ? 0 : e.scrollY);
    return { x: r, y: l, w: this.metrics.colWidth(n), h: this.metrics.rowHeight(t) };
  }
  /** 屏幕坐标是否落在某个自动筛选表头的下拉按钮上;是则返回列号 */
  filterButtonAt(e, t, n) {
    const s = this.sheet.autoFilterRange;
    if (!s) return null;
    const i = this.cellAtScreen(e, t, n);
    if (!i || i.row !== s.top || i.col < s.left || i.col > s.right) return null;
    const r = this.cellScreenRect(e, s.top, i.col), l = jo(r.x, r.y, r.w, r.h);
    return l && t >= l.x && t <= l.x + l.size && n >= l.y && n <= l.y + l.size ? i.col : null;
  }
  /** 点击是否落在"活动格的数据验证下拉箭头"上(箭头只画在选区左上的列表验证格);是则返回该格。 */
  dataValidationButtonAt(e, t, n) {
    const s = this.selection;
    if (!s) return null;
    const i = s.top, r = s.left;
    if (!this.inDataValidation(i, r)) return null;
    const l = this.cellAtScreen(e, t, n);
    if (!l || l.row !== i || l.col !== r) return null;
    const a = this.cellScreenRect(e, i, r), c = jo(a.x, a.y, a.w, a.h);
    return c && t >= c.x && t <= c.x + c.size && n >= c.y && n <= c.y + c.size ? { row: i, col: r } : null;
  }
  /** 屏幕坐标 → 单元格(0-based)。落在表头或越界返回 null。 */
  cellAtScreen(e, t, n) {
    const s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight;
    if (t < s || n < i) return null;
    const r = this.freeze.frozenWidth, l = this.freeze.frozenHeight, a = t < s + r ? t - s : t - s + e.scrollX, c = n < i + l ? n - i : n - i + e.scrollY, d = Math.min(Math.max(this.metrics.colAt(a), 0), this.metrics.vCols - 1);
    return { row: Math.min(Math.max(this.metrics.rowAt(c), 0), this.metrics.vRows - 1), col: d };
  }
  /** 屏幕 y → 行(用于点行号选整行);落在列表头返回 -1 */
  rowAtScreen(e, t) {
    const n = this.metrics.colHeaderHeight;
    if (t < n) return -1;
    const s = this.freeze.frozenHeight, i = t < n + s ? t - n : t - n + e.scrollY;
    return Math.min(Math.max(this.metrics.rowAt(i), 0), this.metrics.vRows - 1);
  }
  /** 屏幕 x → 列(用于点列标选整列);落在行表头返回 -1 */
  colAtScreen(e, t) {
    const n = this.metrics.rowHeaderWidth;
    if (t < n) return -1;
    const s = this.freeze.frozenWidth, i = t < n + s ? t - n : t - n + e.scrollX;
    return Math.min(Math.max(this.metrics.colAt(i), 0), this.metrics.vCols - 1);
  }
  /** 该 cell 所属的合并区(用于选区/复制时按整块处理) */
  mergeAt(e, t) {
    var n;
    return (n = this.merges.rangeOf(e, t)) != null ? n : null;
  }
  /** 双击列边界: 把列宽自适应到该列内容最宽处 */
  autoFitColumn(e) {
    var l;
    const t = this.ctx, n = this.metrics.zoom;
    let s = 0;
    for (const a of this.sheet.cells.values()) {
      if (a.col !== e || a.type === "empty" || this.merges.rangeOf(a.row, e)) continue;
      const c = this.cellText(a.row, e);
      if (!c) continue;
      t.font = ve(this.styleOf(a).font, n);
      const d = t.measureText(c).width;
      d > s && (s = d);
    }
    const i = s === 0 ? this.sheet.defaultColWidth : Math.max(16, Math.ceil(s / n) + Fe * 2 + 3), r = this.sheet.columns.get(e);
    this.sheet.columns.set(e, { width: i, hidden: (l = r == null ? void 0 : r.hidden) != null ? l : !1 }), this.rebuildMetrics();
  }
  /** 双击行边界: 行高自适应到该行内容最高处 */
  autoFitRow(e) {
    var i;
    const t = this.ctx;
    let n = this.sheet.defaultRowHeight;
    for (const r of this.sheet.cells.values()) {
      if (r.row !== e || r.type === "empty" || this.merges.rangeOf(e, r.col)) continue;
      const l = this.styleOf(r), a = this.cellText(e, r.col);
      if (!a) continue;
      const c = l.font.size * (96 / 72) * dt;
      let d = 1;
      if (l.wrapText) {
        const f = this.metrics.zoom, u = this.metrics.colWidth(r.col) / f - Fe * 2;
        t.font = ve(l.font, 1), d = vn(t, a, ve(l.font, 1), u).length;
      } else
        d = a.split(`
`).length;
      const h = d * c + Fe * 2;
      h > n && (n = h);
    }
    const s = this.sheet.rows.get(e);
    this.sheet.rows.set(e, { height: Math.ceil(n), hidden: (i = s == null ? void 0 : s.hidden) != null ? i : !1 }), this.rebuildMetrics();
  }
  /** 拖拽改列宽(传入屏幕像素,内部换算为非缩放存储) */
  setColWidthPx(e, t) {
    var s;
    const n = this.sheet.columns.get(e);
    this.sheet.columns.set(e, { width: Math.max(8, t / this.metrics.zoom), hidden: (s = n == null ? void 0 : n.hidden) != null ? s : !1 }), this.rebuildMetrics();
  }
  /** 拖拽改行高 */
  setRowHeightPx(e, t) {
    var s;
    const n = this.sheet.rows.get(e);
    this.sheet.rows.set(e, { height: Math.max(6, t / this.metrics.zoom), hidden: (s = n == null ? void 0 : n.hidden) != null ? s : !1 }), this.rebuildMetrics();
  }
  /** 复制带格式用: 单元格的内联 CSS(粗体/斜体/色/底色/对齐) */
  cellInlineStyle(e, t) {
    const n = this.sheet.cells.get(O(e, t));
    if (!n) return "";
    const s = this.styleOf(n), i = [];
    return s.font.bold && i.push("font-weight:bold"), s.font.italic && i.push("font-style:italic"), s.font.color && s.font.color !== "#000000" && i.push("color:" + s.font.color), s.fill.type === "solid" && s.fill.fgColor && i.push("background:" + s.fill.fgColor), (s.hAlign === "center" || s.hAlign === "right") && i.push("text-align:" + s.hAlign), i.join(";");
  }
  /** 列宽/行高变化后重建几何 */
  rebuildMetrics() {
    this.metrics = new qe(this.sheet, this.metrics.zoom, this.virtualRows, this.virtualCols, this.showHeaders), this.freeze = yt(this.sheet, this.metrics), this.merges = new si(this.sheet);
  }
  /** 选区统计: 遍历非空 cell(O(非空数),不随选区大小爆炸) */
  selectionStats(e) {
    var a;
    let t = 0, n = 0, s = 0, i = 1 / 0, r = -1 / 0;
    const l = this.filteredCols.size > 0;
    for (const c of this.sheet.cells.values())
      c.row < e.top || c.row > e.bottom || c.col < e.left || c.col > e.right || c.type !== "empty" && (l && ((a = this.sheet.rows.get(c.row)) != null && a.hidden) || (this.cellText(c.row, c.col) !== "" && t++, typeof c.raw == "number" && (n++, s += c.raw, c.raw < i && (i = c.raw), c.raw > r && (r = c.raw))));
    return { count: t, numCount: n, sum: s, avg: n ? s / n : 0, min: i, max: r };
  }
  /**
   * 矢量导出用: 解析一个单元格的绘制信息(样式 + 显示文本 + 有效字色/粗体 + 是否"复杂")。
   * complex = 含条件格式背景/数据条/图标、迷你图、旋转、富文本 —— 矢量层画不动,调用方应栅格兜底。
   * 返回 null 表示该格无任何可绘制内容(无填充/边框/文本)。
   */
  exportCellDraw(e, t) {
    var p;
    const n = this.sheet.cells.get(O(e, t));
    if (!n) return null;
    const s = this.styleOf(n), i = this.cellText(e, t), r = s.fill.type !== "none" || s.borders.top || s.borders.bottom || s.borders.left || s.borders.right;
    if (!i && !r) return null;
    const l = n.type === "richtext", a = s.textRotation, c = this.sparklineIndex.has(O(e, t)), d = this.cond.hasRules() ? this.cond.effectsFor(e, t, (p = n.raw) != null ? p : null) : null, h = l || !!a && a !== 0 || c;
    let f = s.font.color;
    if (!l) {
      const g = ht(n.raw, s.numFmt, this.workbook.date1904);
      f = (d == null ? void 0 : d.fontColor) || g.color || (n.type === "hyperlink" ? this.workbook.themeColors[10] || "#0563C1" : s.font.color);
    }
    const u = d && (d.fillColor || d.dataBar || d.icon) ? { fillColor: d.fillColor, dataBar: d.dataBar, icon: d.icon } : void 0;
    return { style: s, text: i, color: f, bold: s.font.bold || !!(d != null && d.bold), effect: u, complex: h };
  }
  /** 单元格的显示文本(套数字格式后);空返回 '' */
  cellText(e, t) {
    const n = this.sheet.cells.get(O(e, t));
    return ss(n, n ? this.styleOf(n) : void 0, this.workbook.date1904);
  }
  /** 单元格的公式文本(无则 null),供公式栏显示 */
  cellFormula(e, t) {
    const n = this.sheet.cells.get(O(e, t));
    return n != null && n.formula ? "=" + n.formula : null;
  }
  /** 单元格原始数值(供状态栏统计);非数字返回 null */
  cellNumber(e, t) {
    const n = this.sheet.cells.get(O(e, t));
    return n && typeof n.raw == "number" ? n.raw : null;
  }
  cellHyperlink(e, t) {
    var s;
    const n = this.sheet.cells.get(O(e, t));
    return (s = n == null ? void 0 : n.hyperlink) != null ? s : null;
  }
  /** 单元格批注(无则 null) */
  commentAt(e, t) {
    var s;
    const n = this.sheet.cells.get(O(e, t));
    return (s = n == null ? void 0 : n.comment) != null ? s : null;
  }
  inDataValidation(e, t) {
    return this.sheet.dataValidations.some(
      (n) => e >= n.top && e <= n.bottom && t >= n.left && t <= n.right
    );
  }
  /** 若该 cell 文本被裁切(非换行、宽度不足、且溢出也放不下),返回完整文本供 tooltip;否则 null */
  overflowTextAt(e, t) {
    if (this.merges.rangeOf(e, t)) return null;
    const n = this.sheet.cells.get(O(e, t));
    if (!n || n.type === "empty") return null;
    const s = this.styleOf(n);
    if (s.wrapText) return null;
    const i = this.cellText(e, t);
    if (!i) return null;
    this.ctx.font = ve(s.font, this.metrics.zoom);
    const r = this.ctx.measureText(i).width, l = Fe * 2 * this.metrics.zoom, a = this.metrics.colWidth(t);
    if (r <= a - l) return null;
    const c = n.type === "number" || n.type === "formula" && typeof n.raw == "number", d = this.spillClip(e, t, 0, a, r - (a - l), go(s.hAlign, c));
    return r > d.w - l + 1 ? i : null;
  }
  render(e) {
    this.dpr = window.devicePixelRatio || 1;
    const t = e.width + "px", n = e.height + "px";
    this.canvas.style.width !== t && (this.canvas.style.width = t), this.canvas.style.height !== n && (this.canvas.style.height = n), this.paint(e, { headers: this.showHeaders, pageBreaks: !0, selection: !0 });
  }
  /**
   * 绘制核心: 被实时 render() 与导出 exportToCanvas() 共用。
   * 用 this.{canvas,ctx,metrics,freeze,selection,dpr} 当前值,flags 控制 UI 装饰是否绘制。
   */
  paint(e, t, n = "#FFFFFF") {
    const { width: s, height: i, zoom: r } = e, l = Math.round(s * this.dpr), a = Math.round(i * this.dpr);
    (this.canvas.width !== l || this.canvas.height !== a) && (this.canvas.width = l, this.canvas.height = a);
    const c = this.ctx;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), c.clearRect(0, 0, s, i), c.fillStyle = n, c.fillRect(0, 0, s, i), this.drawBackgroundImage(e);
    const d = Wd(this.metrics, this.freeze, e.scrollX, e.scrollY, s, i);
    for (const h of d.panes)
      this.drawPane(h, r);
    this.drawWatermark(e), t.headers && this.drawHeaders(d.panes, e), this.drawFreezeLines(d), t.pageBreaks && this.drawPageBreaks(e), t.selection && this.drawPivotToggles(e), t.selection && this.findHits.length && this.drawFind(e), t.selection && this.drawSelection(e), t.selection && this.drawFillPreview(e), t.selection && this.freezePreview && this.drawFreezePreview(e), t.selection && this.showAllComments && this.drawAllComments(e);
  }
  /** 「显示批注」(审阅选项卡):常驻批注小黄框开关。调用方随后 render()。 */
  setShowAllComments(e) {
    this.showAllComments = e;
  }
  /** 常驻画出所有可见格的批注小黄框(锚在格右上,连一条引线到批注标记)。 */
  drawAllComments(e) {
    const t = this.ctx, n = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight;
    t.save(), t.beginPath(), t.rect(n, s, e.width - n, e.height - s), t.clip(), t.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif', t.textBaseline = "top";
    for (const i of this.sheet.cells.values()) {
      const r = i.comment;
      if (!r) continue;
      const l = this.cellScreenRect(e, i.row, i.col);
      if (l.x + l.w < n || l.y + l.h < s || l.x > e.width || l.y > e.height) continue;
      const a = l.x + l.w + 8, c = l.y, d = String(r).split(/\r?\n/);
      let h = 0;
      for (const g of d) h = Math.max(h, t.measureText(g).width);
      const f = Math.min(220, Math.max(60, h + 12)), u = 16, p = d.length * u + 8;
      t.strokeStyle = "rgba(120,120,120,0.7)", t.lineWidth = 1, t.beginPath(), t.moveTo(l.x + l.w, l.y), t.lineTo(a, c + 4), t.stroke(), t.fillStyle = "#FFFFE1", t.strokeStyle = "#C9C9A6", t.fillRect(a, c, f, p), t.strokeRect(a + 0.5, c + 0.5, f, p), t.fillStyle = "#333333", d.forEach((g, b) => {
        let m = g;
        for (; m.length && t.measureText(m).width > f - 12; ) m = m.slice(0, -1);
        t.fillText(m + (m.length < g.length ? "…" : ""), a + 6, c + 5 + b * u);
      });
    }
    t.restore();
  }
  /** 设/清冻结预览区(悬停冻结菜单项时高亮将冻结的行/列区域)。调用方随后 render()。 */
  setFreezePreview(e) {
    this.freezePreview = e;
  }
  /** 画冻结预览:将冻结的顶部 rows 行 + 左侧 cols 列铺灰底,分割线加重(对齐 WPS 悬停高亮)。 */
  drawFreezePreview(e) {
    const t = this.freezePreview;
    if (!t || t.rows <= 0 && t.cols <= 0) return;
    const n = this.ctx, s = this.metrics, i = s.rowHeaderWidth, r = s.colHeaderHeight, l = e.width, a = e.height, c = t.cols > 0 ? i + s.colLeft(t.cols) - e.scrollX : i, d = t.rows > 0 ? r + s.rowTop(t.rows) - e.scrollY : r;
    n.save(), n.fillStyle = "rgba(96,105,115,0.16)", t.rows > 0 && d > r && n.fillRect(i, r, l - i, Math.min(d, a) - r), t.cols > 0 && c > i && n.fillRect(i, r, Math.min(c, l) - i, a - r), n.strokeStyle = "#3c4149", n.lineWidth = 2, t.rows > 0 && d > r && d < a && (n.beginPath(), n.moveTo(i, Math.round(d) + 0.5), n.lineTo(l, Math.round(d) + 0.5), n.stroke()), t.cols > 0 && c > i && c < l && (n.beginPath(), n.moveTo(Math.round(c) + 0.5, r), n.lineTo(Math.round(c) + 0.5, a), n.stroke()), n.restore();
  }
  /** 画各透视表的行分组折叠/展开按钮(贴在分组表头格最左)。 */
  drawPivotToggles(e) {
    var r;
    const t = this.sheet.pivotTables;
    if (!(t != null && t.length)) return;
    const n = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, i = this.ctx;
    i.save(), i.beginPath(), i.rect(n, s, e.width - n, e.height - s), i.clip();
    for (const l of t) {
      const a = l.rowGroups;
      if (!(a != null && a.length)) continue;
      const c = new Set((r = l.collapsed) != null ? r : []), d = l.range.left;
      for (const h of a) {
        const f = this.cellScreenRect(e, h.row, d);
        if (f.x + f.w < n || f.y + f.h < s || f.x > e.width || f.y > e.height) continue;
        const u = fi(f.x, f.y, f.w, f.h);
        u && Zd(i, u.x, u.y, u.size, c.has(h.key));
      }
    }
    i.restore();
  }
  /** 屏幕坐标是否落在某透视表的折叠按钮上;是则返回 { tableIdx, key }。 */
  pivotToggleAt(e, t, n) {
    const s = this.sheet.pivotTables;
    if (!(s != null && s.length)) return null;
    const i = this.cellAtScreen(e, t, n);
    if (!i) return null;
    for (let r = 0; r < s.length; r++) {
      const l = s[r], a = l.rowGroups;
      if (!(!(a != null && a.length) || i.col !== l.range.left))
        for (const c of a) {
          if (c.row !== i.row) continue;
          const d = this.cellScreenRect(e, c.row, l.range.left), h = fi(d.x, d.y, d.w, d.h);
          if (h && t >= h.x && t <= h.x + h.size && n >= h.y && n <= h.y + h.size) return { tableIdx: r, key: c.key };
        }
    }
    return null;
  }
  /** 查找高亮: 所有命中淡黄,当前项橙色描边 */
  drawFind(e) {
    const t = this.ctx, n = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight;
    t.save(), t.beginPath(), t.rect(n, s, e.width - n, e.height - s), t.clip();
    for (let i = 0; i < this.findHits.length; i++) {
      const r = this.findHits[i], l = this.merges.rangeOf(r.row, r.col), a = l ? l.top : r.row, c = l ? l.left : r.col, d = this.screenRectOfCell(e, a, c), h = l ? this.metrics.colLeft(l.right + 1) - this.metrics.colLeft(l.left) : d.w, f = l ? this.metrics.rowTop(l.bottom + 1) - this.metrics.rowTop(l.top) : d.h;
      d.x + h < n || d.y + f < s || d.x > e.width || d.y > e.height || (t.fillStyle = i === this.findCurrent ? "rgba(255,145,0,0.40)" : "rgba(255,231,76,0.50)", t.fillRect(d.x, d.y, h, f), i === this.findCurrent && (t.strokeStyle = "#F57C00", t.lineWidth = 2, t.strokeRect(Math.round(d.x) + 1, Math.round(d.y) + 1, Math.round(h) - 2, Math.round(f) - 2)));
    }
    t.restore();
  }
  /**
   * 把整表(或指定区域)渲染到一张离屏 canvas: 无选区高亮/分页线/冻结分区,scale 可控。
   * 复用全部单元格绘制逻辑(填充/边框/条件格式/迷你图/文本)。图片/图表/形状是 DOM 叠加层,
   * 不在此绘制 —— 由调用方拿到 result.metrics/scale/origin 后合成到底图上。
   */
  exportToCanvas(e = {}) {
    var x, S, k, M, E;
    const t = this.sheet.dimension, n = (x = e.range) != null ? x : {
      top: 0,
      left: 0,
      bottom: Math.max(0, t.rows - 1),
      right: Math.max(0, t.cols - 1)
    }, s = (S = e.includeHeaders) != null ? S : !1, i = (k = e.background) != null ? k : "#FFFFFF", r = new qe(this.sheet, 1), l = r.rowHeaderWidth, a = r.colHeaderHeight, c = r.colLeft(n.left), d = r.rowTop(n.top), h = r.colLeft(n.right + 1) - c, f = r.rowTop(n.bottom + 1) - d, u = l + h, p = a + f, g = (M = e.maxPixels) != null ? M : 16384;
    let b = (E = e.scale) != null ? E : 2;
    b = Math.min(b, g / Math.max(1, u), g / Math.max(1, p)), b > 0 || (b = 1);
    const m = document.createElement("canvas"), y = {
      canvas: this.canvas,
      ctx: this.ctx,
      metrics: this.metrics,
      freeze: this.freeze,
      selection: this.selection,
      dpr: this.dpr,
      showGridLines: this.sheet.showGridLines
    };
    this.canvas = m, this.ctx = m.getContext("2d"), this.metrics = r, this.freeze = { frozenRows: 0, frozenCols: 0, frozenWidth: 0, frozenHeight: 0 }, this.selection = null, this.dpr = b, e.gridlines !== void 0 && (this.sheet.showGridLines = e.gridlines);
    try {
      this.paint(
        { scrollX: c, scrollY: d, width: u, height: p, zoom: 1 },
        { headers: s, pageBreaks: !1, selection: !1 },
        i
      );
    } finally {
      this.canvas = y.canvas, this.ctx = y.ctx, this.metrics = y.metrics, this.freeze = y.freeze, this.selection = y.selection, this.dpr = y.dpr, this.sheet.showGridLines = y.showGridLines;
    }
    if (s)
      return { canvas: m, scale: b, range: n, bodyW: h, bodyH: f, metrics: r, originX: l, originY: a, gridOriginX: c, gridOriginY: d };
    const w = document.createElement("canvas");
    w.width = Math.max(1, Math.round(h * b)), w.height = Math.max(1, Math.round(f * b));
    const v = w.getContext("2d");
    return v.fillStyle = i, v.fillRect(0, 0, w.width, w.height), v.drawImage(m, Math.round(l * b), Math.round(a * b), w.width, w.height, 0, 0, w.width, w.height), { canvas: w, scale: b, range: n, bodyW: h, bodyH: f, metrics: r, originX: 0, originY: 0, gridOriginX: c, gridOriginY: d };
  }
  /** 手动分页符: 蓝色虚线(在正文区内,随内容滚动) */
  drawPageBreaks(e) {
    const t = this.sheet.pageBreaks;
    if (!t || !t.rows.length && !t.cols.length) return;
    const n = this.ctx, s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight;
    n.save(), n.beginPath(), n.rect(s, i, e.width - s, e.height - i), n.clip(), n.strokeStyle = "#4472C4", n.lineWidth = 1, n.setLineDash([4, 3]);
    for (const r of t.cols) {
      const l = Math.round(s + this.metrics.colLeft(r) - e.scrollX) + 0.5;
      l <= s || (n.beginPath(), n.moveTo(l, i), n.lineTo(l, e.height), n.stroke());
    }
    for (const r of t.rows) {
      const l = Math.round(i + this.metrics.rowTop(r) - e.scrollY) + 0.5;
      l <= i || (n.beginPath(), n.moveTo(s, l), n.lineTo(e.width, l), n.stroke());
    }
    n.restore();
  }
  /** 选区高亮: 半透明填充 + 蓝色边框，裁到表头以下的正文区。 */
  drawSelection(e) {
    const t = this.selection;
    if (!t) return;
    const n = this.ctx, s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, r = this.screenRectOfCell(e, t.top, t.left), l = this.screenRectOfCell(e, t.bottom, t.right), a = r.x, c = r.y, d = l.x + l.w - r.x, h = l.y + l.h - r.y;
    n.save(), n.beginPath(), n.rect(s, i, e.width - s, e.height - i), n.clip();
    for (const u of this.extraSelection) {
      const p = this.screenRectOfCell(e, u.top, u.left), g = this.screenRectOfCell(e, u.bottom, u.right);
      n.fillStyle = this.theme.selFill, n.fillRect(p.x, p.y, g.x + g.w - p.x, g.y + g.h - p.y), n.strokeStyle = this.theme.selBorder, n.lineWidth = 2, n.strokeRect(Math.round(p.x) + 1, Math.round(p.y) + 1, Math.round(g.x + g.w - p.x) - 2, Math.round(g.y + g.h - p.y) - 2);
    }
    if (t.top === t.bottom && t.left === t.right && this.extraSelection.length === 0 || (n.fillStyle = this.theme.selFill, n.fillRect(a, c, d, h)), n.strokeStyle = this.theme.selBorder, n.lineWidth = 2, n.strokeRect(Math.round(a) + 1, Math.round(c) + 1, Math.round(d) - 2, Math.round(h) - 2), this.showFillHandle && this.extraSelection.length === 0) {
      const u = this.fillHandleRect(e);
      u && (n.fillStyle = this.theme.selBorder, n.strokeStyle = "#fff", n.lineWidth = 1, n.fillRect(u.x, u.y, u.w, u.h), n.strokeRect(u.x + 0.5, u.y + 0.5, u.w - 1, u.h - 1));
    }
    n.restore();
  }
  /** 自动填充柄的屏幕矩形(选区右下角的小方块);选区不可见/无选区返 null。 */
  fillHandleRect(e) {
    const t = this.selection;
    if (!t) return null;
    const n = this.screenRectOfCell(e, t.bottom, t.right), s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, r = n.x + n.w, l = n.y + n.h;
    if (r < s || l < i || r > e.width || l > e.height) return null;
    const a = 7;
    return { x: Math.round(r - a / 2 - 1), y: Math.round(l - a / 2 - 1), w: a, h: a };
  }
  /** 点 (px,py) 是否落在填充柄上(命中区比绘制略大,好点中)。 */
  fillHandleAt(e, t, n) {
    if (!this.showFillHandle) return !1;
    const s = this.fillHandleRect(e);
    if (!s) return !1;
    const i = 3;
    return t >= s.x - i && t <= s.x + s.w + i && n >= s.y - i && n <= s.y + s.h + i;
  }
  /** 拖拽预览:目标范围的虚线框(超出源选区的部分)。 */
  drawFillPreview(e) {
    const t = this.fillPreview;
    if (!t) return;
    const n = this.ctx, s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, r = this.screenRectOfCell(e, t.top, t.left), l = this.screenRectOfCell(e, t.bottom, t.right);
    n.save(), n.beginPath(), n.rect(s, i, e.width - s, e.height - i), n.clip(), n.strokeStyle = this.theme.selBorder, n.lineWidth = 1, n.setLineDash([4, 3]), n.strokeRect(Math.round(r.x) + 0.5, Math.round(r.y) + 0.5, Math.round(l.x + l.w - r.x) - 1, Math.round(l.y + l.h - r.y) - 1), n.restore();
  }
  // ---------------- pane 绘制 ----------------
  drawPane(e, t) {
    const n = this.ctx;
    if (e.clipW <= 0 || e.clipH <= 0) return;
    n.save(), n.beginPath(), n.rect(e.clipX, e.clipY, e.clipW, e.clipH), n.clip();
    const s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, r = (p) => s + this.metrics.colLeft(p) - e.offsetX, l = (p) => i + this.metrics.rowTop(p) - e.offsetY, a = this.metrics.colAt(e.clipX - s + e.offsetX), c = this.metrics.colAt(e.clipX + e.clipW - s + e.offsetX) + 1, d = this.metrics.rowAt(e.clipY - i + e.offsetY), h = this.metrics.rowAt(e.clipY + e.clipH - i + e.offsetY) + 1, f = this.sheet.merges.filter(
      (p) => !(p.bottom < e.rowStart || p.top > e.rowEnd || p.right < e.colStart || p.left > e.colEnd)
    );
    if (this.sheet.showGridLines) {
      n.strokeStyle = this.theme.gridLine, n.lineWidth = 1, n.beginPath();
      const p = e.clipY, g = e.clipY + e.clipH;
      for (let y = Math.max(0, a); y <= c; y++) {
        const w = Math.round(r(y)) + 0.5, v = [];
        for (const x of f) x.left < y && y <= x.right && v.push([l(x.top), l(x.bottom + 1)]);
        ui(n, w, p, g, v, !0);
      }
      const b = e.clipX, m = e.clipX + e.clipW;
      for (let y = Math.max(0, d); y <= h; y++) {
        const w = Math.round(l(y)) + 0.5, v = [];
        for (const x of f) x.top < y && y <= x.bottom && v.push([r(x.left), r(x.right + 1)]);
        ui(n, w, b, m, v, !1);
      }
      n.stroke();
    }
    const u = /* @__PURE__ */ new Set();
    for (const p of f) {
      const g = r(p.left), b = l(p.top), m = this.metrics.colLeft(p.right + 1) - this.metrics.colLeft(p.left), y = this.metrics.rowTop(p.bottom + 1) - this.metrics.rowTop(p.top), w = this.sheet.cells.get(O(p.top, p.left));
      this.paintCellBox(w, p.top, p.left, g, b, m, y, t, !0), u.add(O(p.top, p.left));
    }
    for (let p = e.rowStart; p <= e.rowEnd; p++)
      for (let g = e.colStart; g <= e.colEnd; g++) {
        if (this.merges.rangeOf(p, g)) continue;
        const b = this.sheet.cells.get(O(p, g)), m = r(g), y = l(p), w = this.metrics.colWidth(g), v = this.metrics.rowHeight(p);
        this.paintCellBox(b, p, g, m, y, w, v, t);
      }
    n.restore();
  }
  /** 取某格指定边的边框样式(供相邻共享边取较重者);越界/无格返回 undefined */
  borderEdgeOf(e, t, n) {
    if (e < 0 || t < 0 || e >= this.metrics.rows || t >= this.metrics.cols) return;
    const s = this.sheet.cells.get(O(e, t));
    if (s)
      return this.styleOf(s).borders[n];
  }
  /** 画单个 cell(或合并区)的: 填充 → 条件背景 → 数据条 → 边框 → 内容 → 图标 → 筛选按钮 */
  paintCellBox(e, t, n, s, i, r, l, a, c = !1) {
    var b;
    const d = this.ctx, h = e ? this.styleOf(e) : void 0;
    h && h.fill.type !== "none" && Ud(d, h.fill, s, i, r, l);
    let f = null;
    if (this.cond.hasRules() && (f = this.cond.effectsFor(t, n, (b = e == null ? void 0 : e.raw) != null ? b : null), f != null && f.fillColor && (d.fillStyle = f.fillColor, d.fillRect(s, i, r, l)), f != null && f.dataBar)) {
      const m = Math.max(0, (r - 4) * f.dataBar.ratio);
      if (d.save(), f.dataBar.gradient) {
        const y = d.createLinearGradient(s, i, s + m, i);
        y.addColorStop(0, f.dataBar.color), y.addColorStop(1, eh(f.dataBar.color, 0.3)), d.fillStyle = y;
      } else
        d.fillStyle = f.dataBar.color;
      d.fillRect(s + 2, i + 2, m, l - 4), d.restore();
    }
    if (h) {
      const m = h.borders;
      c ? (ze(d, m.top, s, i, s + r, i), ze(d, m.bottom, s, i + l, s + r, i + l), ze(d, m.left, s, i, s, i + l), ze(d, m.right, s + r, i, s + r, i + l)) : (ze(d, Yt(m.top, this.borderEdgeOf(t - 1, n, "bottom")), s, i, s + r, i), ze(d, Yt(m.bottom, this.borderEdgeOf(t + 1, n, "top")), s, i + l, s + r, i + l), ze(d, Yt(m.left, this.borderEdgeOf(t, n - 1, "right")), s, i, s, i + l), ze(d, Yt(m.right, this.borderEdgeOf(t, n + 1, "left")), s + r, i, s + r, i + l)), m.diagonal && (m.diagonalDown || m.diagonalUp) && (m.diagonalDown && di(d, m.diagonal, s, i, s + r, i + l), m.diagonalUp && di(d, m.diagonal, s, i + l, s + r, i));
    }
    let u = s, p = r;
    f != null && f.icon && (oh(d, f.icon, s + 2, i, l), u += 18, p -= 18);
    const g = this.sparklineIndex.get(O(t, n));
    g && nh(d, g, s, i, r, l), e != null && e.dispImgId ? this.drawCellImage(e.dispImgId, s, i, r, l, a) : e && e.type !== "empty" && h && this.drawCellContent(e, h, t, n, u, i, p, l, a, f), Jd(this.sheet.autoFilterRange, t, n) && hi(d, s, i, r, l, this.filteredCols.has(n)), this.selection && t === this.selection.top && n === this.selection.left && this.inDataValidation(t, n) && hi(d, s, i, r, l), e != null && e.comment && (d.fillStyle = "#E8453C", d.beginPath(), d.moveTo(s + r - 7, i), d.lineTo(s + r, i), d.lineTo(s + r, i + 7), d.closePath(), d.fill());
  }
  /**
   * 把 WPS 单元格内嵌图(DISPIMG)画进格内,贴合方式由 `cellImageFit` 决定(fill/contain/cover);
   * 始终裁剪到格内、随行高列宽变化。未解码完成/缺图时画淡占位。
   */
  drawCellImage(e, t, n, s, i, r) {
    var w;
    const l = this.ctx, a = s > 6 && i > 6 ? Math.min(1 * r, 1.5) : 0, c = t + a, d = n + a, h = Math.max(1, s - a * 2), f = Math.max(1, i - a * 2), u = (w = this.workbook.cellImages) == null ? void 0 : w.get(e), p = u != null && u.src ? this.getCellImageEl(u.src) : null;
    if (!p || !p.complete || p.naturalWidth === 0) {
      u != null && u.src || this.drawImagePlaceholder(c, d, h, f, r);
      return;
    }
    let g = c, b = d, m = h, y = f;
    if (this.cellImageFit !== "fill") {
      const v = p.naturalWidth, x = p.naturalHeight, S = this.cellImageFit === "cover" ? Math.max(h / v, f / x) : Math.min(h / v, f / x);
      m = v * S, y = x * S, g = c + (h - m) / 2, b = d + (f - y) / 2;
    }
    l.save(), l.beginPath(), l.rect(c, d, h, f), l.clip();
    try {
      l.drawImage(p, g, b, m, y);
    } catch (v) {
    }
    l.restore();
  }
  /** 工作表背景图(WPS 背景):在数据区(表头之后)平铺,固定不随滚动。1.16.0 */
  drawBackgroundImage(e) {
    const t = this.sheet.background;
    if (!(t != null && t.src)) return;
    const n = this.getCellImageEl(t.src);
    if (!n || !n.complete || !n.naturalWidth) return;
    const s = this.ctx, i = this.metrics.rowHeaderWidth, r = this.metrics.colHeaderHeight, l = n.naturalWidth, a = n.naturalHeight;
    s.save(), s.beginPath(), s.rect(i, r, e.width - i, e.height - r), s.clip();
    for (let c = r; c < e.height; c += a)
      for (let d = i; d < e.width; d += l) s.drawImage(n, d, c, l, a);
    s.restore();
  }
  /** 文字水印(WPS 水印,仅屏幕):数据区半透明旋转平铺。1.16.0 */
  drawWatermark(e) {
    var d, h, f, u;
    const t = this.sheet.watermark;
    if (!(t != null && t.text)) return;
    const n = this.ctx, s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, r = (d = t.fontSize) != null ? d : 48;
    n.save(), n.beginPath(), n.rect(s, i, e.width - s, e.height - i), n.clip(), n.globalAlpha = (h = t.opacity) != null ? h : 0.12, n.fillStyle = (f = t.color) != null ? f : "#888888", n.font = `bold ${r}px -apple-system,'Segoe UI','Microsoft YaHei',sans-serif`, n.textAlign = "center", n.textBaseline = "middle";
    const l = ((u = t.angle) != null ? u : -30) * Math.PI / 180, a = Math.max(240, n.measureText(t.text).width + 120), c = r * 4;
    for (let p = i + c / 2; p < e.height + c; p += c)
      for (let g = s + a / 2; g < e.width + a; g += a)
        n.save(), n.translate(g, p), n.rotate(l), n.fillText(t.text, 0, 0), n.restore();
    n.restore();
  }
  /** 取/起一张内嵌图的解码;未缓存则起加载,onload 请求重绘(无 DOM 环境返 null) */
  getCellImageEl(e) {
    const t = this.cellImageCache.get(e);
    if (t) return t;
    if (typeof Image == "undefined") return null;
    const n = new Image();
    return this.cellImageCache.set(e, n), n.onload = () => {
      var s;
      return (s = this.onNeedsRedraw) == null ? void 0 : s.call(this);
    }, n.src = e, n;
  }
  /** 缺图提示(仅画淡图标,**不盖底色** — 让单元格自身填充色透出来) */
  drawImagePlaceholder(e, t, n, s, i) {
    const r = this.ctx, l = Math.min(s * 0.5, 14 * i);
    l < 6 || (r.save(), r.fillStyle = "#c0c6cf", r.font = `${l}px sans-serif`, r.textAlign = "center", r.textBaseline = "middle", r.fillText("🖼", e + n / 2, t + s / 2), r.restore());
  }
  drawCellContent(e, t, n, s, i, r, l, a, c, d) {
    var N;
    const h = this.ctx, f = Fe * c, u = e.type === "number" || e.type === "formula" && typeof e.raw == "number";
    if (e.type === "richtext" && e.rich) {
      this.drawRichText(e, t, i, r, l, a, c);
      return;
    }
    const p = ht(e.raw, t.numFmt, this.workbook.date1904);
    let g = p.text;
    if (e.type === "hyperlink" && !g && (g = String((N = e.hyperlink) != null ? N : "")), !g) return;
    const b = (d == null ? void 0 : d.fontColor) || p.color || (e.type === "hyperlink" ? this.workbook.themeColors[10] || "#0563C1" : t.font.color);
    let m = ve(t.font, c);
    d != null && d.bold && !t.font.bold && (m = ve(z(R({}, t.font), { bold: !0 }), c)), h.font = m, h.fillStyle = b;
    const y = go(t.hAlign, u), w = t.textRotation, v = l - f * 2;
    if (w && w !== 0 && w !== 255) {
      this.drawRotatedText(g, t, b, m, i, r, l, a, c);
      return;
    }
    if (w === 255) {
      this.drawVerticalText(g, b, m, i, r, l, a, t);
      return;
    }
    let x = i, S = l;
    if (!t.wrapText && !t.shrinkToFit) {
      const F = wn(h, g, m);
      if (F > v) {
        const H = this.spillClip(n, s, i, l, F - v, y);
        x = H.x, S = H.w;
      }
    }
    h.save(), h.beginPath(), h.rect(x, r, S, a), h.clip();
    let k, M = m;
    if (t.wrapText)
      k = vn(h, g, m, v);
    else if (t.shrinkToFit) {
      const F = jd(h, g, m, v);
      F < 1 && (M = ve(z(R({}, t.font), { size: t.font.size * F }), c)), k = [g];
    } else
      k = [g];
    h.font = M;
    const E = t.font.size * c * (96 / 72) * dt, $ = E * k.length, T = a - 2 * f, I = $ > T;
    let A;
    t.vAlign === "top" || I ? A = r + f + E * 0.78 : t.vAlign === "middle" ? A = r + (a - $) / 2 + E * 0.78 : A = r + a - f - $ + E * 0.78, h.textAlign = "left", h.textBaseline = "alphabetic";
    const L = t.indent * 8 * c;
    for (let F = 0; F < k.length; F++) {
      const H = k[F], D = wn(h, H, M);
      let B = i + f + L;
      y === "center" ? B = i + (l - D) / 2 : y === "right" && (B = i + l - f - D);
      const X = A + F * E;
      h.fillText(H, B, X), this.drawTextDecoration(t, b, B, X, D);
    }
    h.restore();
  }
  /**
   * 文本溢出可用的裁剪范围: 从本格向对齐方向延伸，吞掉相邻"空白"格(无值且无填充)。
   * 返回扩展后的 clip x/w(对齐锚点仍用原格，只是裁剪放宽)。
   */
  spillClip(e, t, n, s, i, r) {
    if (this.merges.rangeOf(e, t)) return { x: n, w: s };
    const l = (d, h) => {
      if (h < 0 || h >= this.metrics.cols || this.merges.rangeOf(d, h)) return !1;
      const f = this.sheet.cells.get(O(d, h));
      if (!f) return !0;
      if (f.type !== "empty" && f.raw !== null && f.raw !== "") return !1;
      const u = this.sheet.styles[f.styleId];
      return !u || u.fill.type === "none";
    };
    let a = 0, c = 0;
    if (r === "right") {
      let d = t - 1;
      for (; a < i && l(e, d); )
        a += this.metrics.colWidth(d), d--;
    } else if (r === "center") {
      let d = t - 1, h = t + 1;
      for (; a + c < i; )
        if (c <= a && l(e, h)) c += this.metrics.colWidth(h++);
        else if (c > a && l(e, d)) a += this.metrics.colWidth(d--);
        else if (l(e, h)) c += this.metrics.colWidth(h++);
        else if (l(e, d)) a += this.metrics.colWidth(d--);
        else break;
    } else {
      let d = t + 1;
      for (; c < i && l(e, d); )
        c += this.metrics.colWidth(d), d++;
    }
    return { x: n - a, w: s + a + c };
  }
  drawRichText(e, t, n, s, i, r, l) {
    var T, I;
    const a = this.ctx, c = Fe * l, d = e.rich || [], h = t.font, f = go(t.hAlign, !1), u = (t.indent || 0) * 8 * l, p = i - 2 * c - (f === "left" ? u : 0);
    let g = 1;
    if (t.shrinkToFit && !t.wrapText && p > 0) {
      let A = 0;
      for (let L = 0; L < d.length; L++)
        a.font = ve(R(R({}, h), d[L].font), l), A += a.measureText(d[L].text).width;
      A > p && A > 0 && (g = Math.max(0.3, p / A));
    }
    const b = [], m = [], y = [], w = [], v = [];
    for (let A = 0; A < d.length; A++) {
      const L = R(R({}, h), d[A].font), N = ((T = L.size) != null ? T : h.size) * g;
      b[A] = ve(z(R({}, L), { size: N }), l), m[A] = ((I = d[A].font) == null ? void 0 : I.color) || h.color, y[A] = !!L.underline, w[A] = !!L.strike, v[A] = N * l * (96 / 72);
    }
    const x = (A, L) => ({ text: A, fontCss: b[L], color: m[L], ul: y[L], st: w[L], szPx: v[L] }), S = [];
    if (t.wrapText && p > 0) {
      let A = [], L = 0;
      const N = () => {
        S.push(A), A = [], L = 0;
      };
      for (let F = 0; F < d.length; F++) {
        a.font = b[F];
        for (const H of d[F].text) {
          if (H === `
`) {
            N();
            continue;
          }
          const D = a.measureText(H).width;
          L + D > p && L > 0 && N();
          const B = A[A.length - 1];
          B && B.fontCss === b[F] && B.color === m[F] && B.ul === y[F] && B.st === w[F] ? B.text += H : A.push(x(H, F)), L += D;
        }
      }
      N();
    } else
      S.push(d.map((A, L) => R({}, x(d[L].text, L))));
    const k = h.size * g * l * (96 / 72) * dt, M = k * S.length, E = M > r - 2 * c;
    let $;
    t.vAlign === "top" || E ? $ = s + c + k * 0.78 : t.vAlign === "middle" ? $ = s + (r - M) / 2 + k * 0.78 : $ = s + r - c - M + k * 0.78, a.save(), a.beginPath(), a.rect(n, s, i, r), a.clip(), a.textBaseline = "alphabetic", a.textAlign = "left";
    for (let A = 0; A < S.length; A++) {
      const L = S[A];
      let N = 0;
      for (const D of L)
        a.font = D.fontCss, N += a.measureText(D.text).width;
      let F = n + c + u;
      f === "center" ? F = n + (i - N) / 2 : f === "right" && (F = n + i - c - N);
      const H = $ + A * k;
      for (const D of L) {
        a.font = D.fontCss, a.fillStyle = D.color, a.fillText(D.text, F, H);
        const B = a.measureText(D.text).width;
        if ((D.ul || D.st) && (a.strokeStyle = D.color, a.lineWidth = Math.max(1, D.szPx / 14), D.ul && (a.beginPath(), a.moveTo(F, H + 2), a.lineTo(F + B, H + 2), a.stroke()), D.st)) {
          const X = H - D.szPx * 0.3;
          a.beginPath(), a.moveTo(F, X), a.lineTo(F + B, X), a.stroke();
        }
        if (F += B, F > n + i + 50) break;
      }
    }
    a.restore();
  }
  drawRotatedText(e, t, n, s, i, r, l, a, c) {
    const d = this.ctx;
    d.save(), d.beginPath(), d.rect(i, r, l, a), d.clip(), d.translate(i + l / 2, r + a / 2), d.rotate(-t.textRotation * Math.PI / 180), d.font = s, d.fillStyle = n, d.textAlign = "center", d.textBaseline = "middle", d.fillText(e, 0, 0), d.restore();
  }
  drawVerticalText(e, t, n, s, i, r, l, a) {
    const c = this.ctx;
    c.save(), c.beginPath(), c.rect(s, i, r, l), c.clip(), c.font = n, c.fillStyle = t, c.textAlign = "center", c.textBaseline = "top";
    const d = [...e], h = parseFloat(n) * 1.05, f = d.length * h;
    let u = i + 3;
    f <= l - 6 && (a.vAlign === "middle" ? u = i + (l - f) / 2 : a.vAlign === "bottom" && (u = i + l - f - 3));
    for (const p of d)
      if (c.fillText(p, s + r / 2, u), u += h, u > i + l) break;
    c.restore();
  }
  drawTextDecoration(e, t, n, s, i) {
    const r = this.ctx;
    if (!(!e.font.underline && !e.font.strike)) {
      if (r.save(), r.strokeStyle = t, r.lineWidth = 1, e.font.underline) {
        const l = Math.round(s + 2) + 0.5;
        r.beginPath(), r.moveTo(n, l), r.lineTo(n + i, l), r.stroke(), e.font.underlineStyle === "double" && (r.beginPath(), r.moveTo(n, l + 2), r.lineTo(n + i, l + 2), r.stroke());
      }
      if (e.font.strike) {
        const l = Math.round(s - e.font.size * 0.35) + 0.5;
        r.beginPath(), r.moveTo(n, l), r.lineTo(n + i, l), r.stroke();
      }
      r.restore();
    }
  }
  // ---------------- 表头 ----------------
  drawHeaders(e, t) {
    const n = this.ctx, s = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, r = this.freeze.frozenCols, l = this.freeze.frozenRows, a = this.freeze.frozenWidth, c = this.freeze.frozenHeight, d = Math.max(r, this.metrics.colAt(a + t.scrollX)), h = this.metrics.colAt(t.width - s + t.scrollX) + 1, f = Math.max(l, this.metrics.rowAt(c + t.scrollY)), u = this.metrics.rowAt(t.height - i + t.scrollY) + 1;
    n.save(), n.beginPath(), n.rect(s, 0, t.width - s, i), n.clip(), this.drawColHeaderRange(d, h, t.scrollX, s, i), n.restore(), r > 0 && (n.save(), n.beginPath(), n.rect(s, 0, this.freeze.frozenWidth, i), n.clip(), this.drawColHeaderRange(0, r - 1, 0, s, i), n.restore()), n.save(), n.beginPath(), n.rect(0, i, s, t.height - i), n.clip(), this.drawRowHeaderRange(f, u, t.scrollY, s, i), n.restore(), l > 0 && (n.save(), n.beginPath(), n.rect(0, i, s, this.freeze.frozenHeight), n.clip(), this.drawRowHeaderRange(0, l - 1, 0, s, i), n.restore()), n.fillStyle = this.theme.headerBg, n.fillRect(0, 0, s, i), n.strokeStyle = this.theme.headerLine, n.lineWidth = 1, n.strokeRect(0.5, 0.5, s, i);
  }
  drawColHeaderRange(e, t, n, s, i) {
    const r = this.ctx;
    r.textAlign = "center", r.textBaseline = "middle", r.font = "11px Calibri, sans-serif";
    for (let l = e; l <= t; l++) {
      const a = s + this.metrics.colLeft(l) - n, c = this.metrics.colWidth(l);
      c <= 0 || (r.fillStyle = this.theme.headerBg, r.fillRect(a, 0, c, i), r.strokeStyle = this.theme.headerLine, r.lineWidth = 1, r.beginPath(), r.moveTo(Math.round(a) + 0.5, 0), r.lineTo(Math.round(a) + 0.5, i), r.moveTo(a, i - 0.5), r.lineTo(a + c, i - 0.5), r.stroke(), r.fillStyle = this.theme.headerText, r.fillText(Xe(l), a + c / 2, i / 2 + 1));
    }
  }
  drawRowHeaderRange(e, t, n, s, i) {
    const r = this.ctx;
    r.textAlign = "center", r.textBaseline = "middle", r.font = "11px Calibri, sans-serif";
    for (let l = e; l <= t; l++) {
      const a = i + this.metrics.rowTop(l) - n, c = this.metrics.rowHeight(l);
      c <= 0 || (r.fillStyle = this.theme.headerBg, r.fillRect(0, a, s, c), r.strokeStyle = this.theme.headerLine, r.lineWidth = 1, r.beginPath(), r.moveTo(0, Math.round(a) + 0.5), r.lineTo(s, Math.round(a) + 0.5), r.moveTo(s - 0.5, a), r.lineTo(s - 0.5, a + c), r.stroke(), r.fillStyle = this.theme.headerText, r.fillText(String(l + 1), s / 2, a + c / 2 + 1));
    }
  }
  drawFreezeLines(e) {
    const t = this.ctx;
    if (!(this.freeze.frozenCols === 0 && this.freeze.frozenRows === 0)) {
      if (t.save(), t.strokeStyle = "#9AA4AE", t.lineWidth = 1, this.freeze.frozenCols > 0) {
        const n = e.rowHeaderWidth + this.freeze.frozenWidth + 0.5;
        t.beginPath(), t.moveTo(n, 0), t.lineTo(n, t.canvas.height), t.stroke();
      }
      if (this.freeze.frozenRows > 0) {
        const n = e.colHeaderHeight + this.freeze.frozenHeight + 0.5;
        t.beginPath(), t.moveTo(0, n), t.lineTo(t.canvas.width, n), t.stroke();
      }
      t.restore();
    }
  }
  styleOf(e) {
    var i;
    const t = (i = this.sheet.styles[e.styleId]) != null ? i : Qd(), n = this.isEditableFn(e.row, e.col);
    let s = t;
    if (this.cellStyleHook) {
      const r = this.cellStyleHook(e, { row: e.row, col: e.col }, { editable: n });
      r && (s = qo(s, r));
    }
    if (!n && this.readOnlyStyleHook) {
      const r = this.readOnlyStyleHook;
      let l;
      r === !0 ? l = { fill: { type: "solid", fgColor: "#f5f7fa" } } : typeof r == "function" ? l = r(e, { row: e.row, col: e.col }, { editable: n }) : r && typeof r == "object" && (l = r), l && (s = qo(s, l));
    }
    return s;
  }
}
function Qd() {
  return {
    font: { name: "Calibri", size: 11, bold: !1, italic: !1, underline: !1, strike: !1, color: "#000000" },
    fill: { type: "none" },
    borders: {},
    hAlign: "general",
    vAlign: "bottom",
    wrapText: !1,
    shrinkToFit: !1,
    textRotation: 0,
    indent: 0,
    numFmt: "General"
  };
}
function eh(o, e) {
  const t = /^#?([0-9a-f]{6})$/i.exec(o);
  if (!t) return o;
  const n = parseInt(t[1], 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${e})`;
}
function th(o, e, t) {
  if (!t.length) return o < e ? [[o, e]] : [];
  const n = [...t].sort((r, l) => r[0] - l[0]), s = [];
  let i = o;
  for (const [r, l] of n) {
    const a = Math.max(r, o), c = Math.min(l, e);
    a > i && s.push([i, a]), c > i && (i = c);
  }
  return i < e && s.push([i, e]), s;
}
function ui(o, e, t, n, s, i) {
  for (const [r, l] of th(t, n, s))
    l - r <= 1e-4 || (i ? (o.moveTo(e, r), o.lineTo(e, l)) : (o.moveTo(r, e), o.lineTo(l, e)));
}
function nh(o, e, t, n, s, i) {
  const l = t + 2, a = n + 2, c = s - 4, d = i - 4;
  if (c < 4 || d < 3) return;
  const h = e.values, f = h.filter((y) => y !== null);
  if (!f.length) return;
  const u = Math.min(...f), p = Math.max(...f), g = e.color || "#376092", b = e.negativeColor || "#D00000", m = h.length;
  if (o.save(), e.type === "winloss") {
    const y = c / m, w = a + d / 2, v = d * 0.4;
    for (let x = 0; x < m; x++) {
      const S = h[x];
      S == null || S === 0 || (o.fillStyle = S > 0 ? g : b, o.fillRect(l + x * y + y * 0.15, S > 0 ? w - v : w, y * 0.7, v));
    }
  } else if (e.type === "column") {
    const y = Math.max(p, 0), w = Math.min(u, 0), v = y - w || 1, x = a + d * (y / v), S = c / m;
    for (let k = 0; k < m; k++) {
      const M = h[k];
      if (M == null) continue;
      o.fillStyle = M < 0 ? b : g;
      const E = a + d * ((y - M) / v);
      o.fillRect(l + k * S + S * 0.15, Math.min(E, x), S * 0.7, Math.max(1, Math.abs(E - x)));
    }
  } else {
    const y = p - u || 1;
    o.strokeStyle = g, o.lineWidth = 1, o.beginPath();
    let w = !1;
    for (let v = 0; v < m; v++) {
      const x = h[v];
      if (x == null) {
        w = !1;
        continue;
      }
      const S = l + (m === 1 ? c / 2 : v / (m - 1) * c), k = a + d - (x - u) / y * d;
      w ? o.lineTo(S, k) : (o.moveTo(S, k), w = !0);
    }
    o.stroke();
  }
  o.restore();
}
function oh(o, e, t, n, s) {
  const i = n + s / 2, r = t + 7, l = 5;
  if (o.save(), e.setName.includes("TrafficLights") || e.setName.includes("Signs") || e.count === 3 && e.setName.includes("Symbols")) {
    const a = ["#D63B3B", "#E8B53A", "#5B9F4E"];
    o.fillStyle = a[Math.min(e.level, 2)], o.beginPath(), o.arc(r, i, l, 0, Math.PI * 2), o.fill();
  } else if (e.setName.includes("Arrows")) {
    const a = ["#D63B3B", "#E8B53A", "#5B9F4E", "#5B9F4E", "#5B9F4E"];
    o.strokeStyle = a[Math.min(e.level, a.length - 1)], o.fillStyle = o.strokeStyle, o.lineWidth = 2;
    const c = e.level === 0 ? Math.PI / 2 : e.level >= e.count - 1 ? -Math.PI / 2 : 0;
    o.translate(r, i), o.rotate(c), o.beginPath(), o.moveTo(-4, 0), o.lineTo(4, 0), o.moveTo(1, -3), o.lineTo(4, 0), o.lineTo(1, 3), o.stroke();
  } else {
    const a = e.count > 1 ? e.level / (e.count - 1) : 1;
    o.fillStyle = `rgb(${Math.round(214 - 120 * a)},${Math.round(59 + 100 * a)},59)`, o.beginPath(), o.arc(r, i, l, 0, Math.PI * 2), o.fill();
  }
  o.restore();
}
function Bt(o) {
  return z(R({}, o), {
    raw: o.raw instanceof Date ? new Date(o.raw.getTime()) : o.raw,
    rich: o.rich ? o.rich.map((e) => z(R({}, e), { font: e.font ? R({}, e.font) : void 0 })) : void 0
  });
}
function he(o, e, t, n) {
  const s = o.cells.get(O(e, t)), i = Ed(o, e, t), r = s && s.type !== "empty" ? s.raw : null, l = ss(s, i, n), a = s != null && s.formula ? s.formula[0] === "=" ? s.formula : "=" + s.formula : typeof r == "number" ? String(r) : typeof r == "boolean" ? r ? "TRUE" : "FALSE" : l;
  return {
    row: e,
    col: t,
    cell: s ? Bt(s) : null,
    style: i,
    raw: r,
    computed: r,
    // 当前 = raw;E4 引擎结果也写回 raw,语义不变
    text: l,
    editText: a
  };
}
function fb(o) {
  return {
    cells: new Map([...o.cells].map(([e, t]) => [e, Bt(t)])),
    merges: o.merges.map((e) => R({}, e)),
    rows: new Map([...o.rows].map(([e, t]) => [e, R({}, t)])),
    columns: new Map([...o.columns].map(([e, t]) => [e, R({}, t)])),
    images: o.images.map(se),
    dimension: R({}, o.dimension)
  };
}
function ub(o, e) {
  o.cells = new Map([...e.cells].map(([t, n]) => [t, Bt(n)])), o.merges = e.merges.map((t) => R({}, t)), o.rows = new Map([...e.rows].map(([t, n]) => [t, R({}, n)])), o.columns = new Map([...e.columns].map(([t, n]) => [t, R({}, n)])), o.images = e.images.map(se), o.dimension = R({}, e.dimension);
}
function Fn(o, e, t, n) {
  const s = /* @__PURE__ */ new Map();
  for (const [i, r] of o)
    if (n === "insert")
      s.set(i >= e ? i + t : i, r);
    else {
      if (i >= e && i < e + t) continue;
      s.set(i >= e + t ? i - t : i, r);
    }
  return s;
}
function sh(o, e, t) {
  if (t <= 0) return;
  const n = /* @__PURE__ */ new Map();
  for (const s of o.cells.values())
    s.row >= e && (s.row += t), n.set(O(s.row, s.col), s);
  o.cells = n;
  for (const s of o.merges)
    s.top >= e ? (s.top += t, s.bottom += t) : s.bottom >= e && (s.bottom += t);
  o.rows = Fn(o.rows, e, t, "insert");
  for (const s of o.images)
    s.from.row >= e && (s.from.row += t), s.to && s.to.row >= e && (s.to.row += t);
  o.dimension.rows += t;
}
function rl(o, e, t) {
  if (t <= 0) return;
  const n = e + t, s = /* @__PURE__ */ new Map();
  for (const i of o.cells.values())
    i.row >= e && i.row < n || (i.row >= n && (i.row -= t), s.set(O(i.row, i.col), i));
  o.cells = s, o.merges = o.merges.filter((i) => i.bottom < e ? !0 : i.top >= n ? (i.top -= t, i.bottom -= t, !0) : !1), o.rows = Fn(o.rows, e, t, "delete");
  for (const i of o.images)
    i.from.row >= n ? i.from.row -= t : i.from.row >= e && (i.from.row = e), i.to && (i.to.row >= n ? i.to.row -= t : i.to.row >= e && (i.to.row = e));
  o.dimension.rows = Math.max(0, o.dimension.rows - t);
}
function ih(o, e, t) {
  if (t <= 0) return;
  const n = /* @__PURE__ */ new Map();
  for (const s of o.cells.values())
    s.col >= e && (s.col += t), n.set(O(s.row, s.col), s);
  o.cells = n;
  for (const s of o.merges)
    s.left >= e ? (s.left += t, s.right += t) : s.right >= e && (s.right += t);
  o.columns = Fn(o.columns, e, t, "insert");
  for (const s of o.images)
    s.from.col >= e && (s.from.col += t), s.to && s.to.col >= e && (s.to.col += t);
  o.dimension.cols += t;
}
function rh(o, e, t) {
  if (t <= 0) return;
  const n = e + t, s = /* @__PURE__ */ new Map();
  for (const i of o.cells.values())
    i.col >= e && i.col < n || (i.col >= n && (i.col -= t), s.set(O(i.row, i.col), i));
  o.cells = s, o.merges = o.merges.filter((i) => i.right < e ? !0 : i.left >= n ? (i.left -= t, i.right -= t, !0) : !1), o.columns = Fn(o.columns, e, t, "delete");
  for (const i of o.images)
    i.from.col >= n ? i.from.col -= t : i.from.col >= e && (i.from.col = e), i.to && (i.to.col >= n ? i.to.col -= t : i.to.col >= e && (i.to.col = e));
  o.dimension.cols = Math.max(0, o.dimension.cols - t);
}
function lh(o, e, t, n) {
  e === "insert-rows" ? sh(o, t, n) : e === "delete-rows" ? rl(o, t, n) : e === "insert-cols" ? ih(o, t, n) : rh(o, t, n);
}
function pi(o, e, t, n) {
  const s = t + n;
  return o.merges.some(
    (i) => e === "delete-rows" ? i.top < s && i.bottom >= t && (i.top < t || i.bottom >= s) : i.left < s && i.right >= t && (i.left < t || i.right >= s)
  );
}
const ah = 50, ch = 100;
function dh(o) {
  var r;
  const e = Math.min(o.dimension.rows, ah), t = Math.min(o.dimension.cols, ch);
  if (e <= 0 || t <= 0) return 1;
  const n = /* @__PURE__ */ new Set();
  for (const l of (r = o.merges) != null ? r : [])
    for (let a = l.top; a <= l.bottom; a++)
      for (let c = l.left; c <= l.right; c++)
        (a !== l.top || c !== l.left) && n.add(O(a, c));
  const s = new Array(e).fill(0);
  let i = 0;
  for (let l = 0; l < e; l++) {
    let a = 0;
    for (let c = 0; c < t; c++) {
      if (n.has(O(l, c))) continue;
      const d = o.cells.get(O(l, c));
      d && d.type !== "empty" && a++;
    }
    s[l] = a, a > i && (i = a);
  }
  if (i === 0) return 1;
  for (let l = 0; l < e; l++)
    if (s[l] >= i) return l + 1;
  return 1;
}
function re(o, e) {
  var a, c;
  const t = o.zoom, n = (d) => Ot(d) * t, s = o.colLeft(e.from.col) + n(e.from.colOffEmu), i = o.rowTop(e.from.row) + n(e.from.rowOffEmu);
  let r, l;
  if (e.to) {
    const d = o.colLeft(e.to.col) + n(e.to.colOffEmu), h = o.rowTop(e.to.row) + n(e.to.rowOffEmu);
    r = Math.max(1, d - s), l = Math.max(1, h - i);
  } else
    r = n((a = e.extWidthEmu) != null ? a : 0) || 120 * t, l = n((c = e.extHeightEmu) != null ? c : 0) || 90 * t;
  return { left: s, top: i, width: r, height: l };
}
function tt(o) {
  if (typeof o == "number") return [o];
  if (Array.isArray(o)) return o.slice();
  const e = Math.min(o.from, o.to), t = Math.max(o.from, o.to), n = [];
  for (let s = e; s <= t; s++) n.push(s);
  return n;
}
function Be(o, e, t, n) {
  if (!n.editable) return !1;
  if (!n.strictDimensions || n.editableTargets === void 0) return !0;
  const s = o.dimension;
  if (e === "col") {
    for (let i = 0; i < s.rows; i++)
      if (Vo(o, i, t, n)) return !0;
    return !1;
  } else {
    for (let i = 0; i < s.cols; i++)
      if (Vo(o, t, i, n)) return !0;
    return !1;
  }
}
function ls(o, e, t) {
  return o >= t.top && o <= t.bottom && e >= t.left && e <= t.right;
}
function ll(o, e, t) {
  var i;
  const n = o.cells.get(O(e, t)), s = n ? o.styles[n.styleId] : o.styles[0];
  return ((i = s == null ? void 0 : s.protection) == null ? void 0 : i.locked) !== !1;
}
function hh(o, e, t) {
  var s;
  if (!((s = o.sheetProtection) != null && s.protected)) return !1;
  const n = o.protectedRanges;
  if (n) {
    for (const i of n) if (ls(e, t, i.range)) return !1;
  }
  return ll(o, e, t);
}
function fh(o, e, t) {
  if ("top" in t && "left" in t && "bottom" in t && "right" in t)
    return ls(o, e, t);
  const n = "row" in t && typeof t.row == "number", s = "col" in t && typeof t.col == "number";
  if (n && s) {
    const i = t;
    return o === i.row && e === i.col;
  }
  return n ? o === t.row : s ? e === t.col : !1;
}
function Vo(o, e, t, n) {
  var s;
  if (!n.editable) return !1;
  if (n.editableTargets !== void 0) {
    const i = Array.isArray(n.editableTargets) ? n.editableTargets : [n.editableTargets];
    let r = !1;
    for (const l of i)
      if (fh(e, t, l)) {
        r = !0;
        break;
      }
    if (!r) return !1;
  }
  if (n.readOnlyRanges) {
    for (const i of n.readOnlyRanges) if (ls(e, t, i)) return !1;
  }
  if (n.cellReadOnly) {
    const i = (s = o.cells.get(O(e, t))) != null ? s : null;
    if (n.cellReadOnly(i, { row: e, col: t })) return !1;
  }
  return !hh(o, e, t);
}
function uh(o) {
  var e;
  return z(R({}, o), {
    // 共享不可变重负载:charts/shapes/sparklines/conditional/dataValidations/pageSetup/name…
    cells: new Map(Array.from(o.cells, ([t, n]) => [t, Bt(n)])),
    merges: o.merges.map((t) => R({}, t)),
    rows: new Map(Array.from(o.rows, ([t, n]) => [t, R({}, n)])),
    columns: new Map(Array.from(o.columns, ([t, n]) => [t, R({}, n)])),
    images: o.images.map(se),
    // 新锚点对象、共享 bytes(不可变)
    dimension: R({}, o.dimension),
    freeze: R({}, o.freeze),
    // 保护(审阅选项卡):显式列出这两键(即便 undefined),让 restoreWorkbookInto 的 Object.assign
    // 能在 undo「已保护 → 未保护」时清掉 live 上的键(缺键 spread 不产生键 → 无法清除)
    sheetProtection: o.sheetProtection ? z(R({}, o.sheetProtection), { allow: o.sheetProtection.allow ? R({}, o.sheetProtection.allow) : void 0, raw: o.sheetProtection.raw }) : void 0,
    protectedRanges: o.protectedRanges ? o.protectedRanges.map((t) => z(R({}, t), { range: R({}, t.range) })) : void 0,
    styles: o.styles.slice(),
    // 新数组(防 internStyle 追加污染快照);style 对象共享(编辑不原地改)
    pivotTables: ((e = o.pivotTables) != null ? e : []).map((t) => {
      var n, s;
      return z(R({}, t), {
        range: R({}, t.range),
        fields: t.fields.slice(),
        buttons: t.buttons.map((i) => R({}, i)),
        source: t.source ? { sheetIndex: t.source.sheetIndex, range: R({}, t.source.range) } : void 0,
        layout: t.layout ? {
          filters: t.layout.filters.map((i) => {
            var r;
            return z(R({}, i), { values: (r = i.values) == null ? void 0 : r.slice() });
          }),
          columns: t.layout.columns.slice(),
          rows: t.layout.rows.slice(),
          values: t.layout.values.map((i) => R({}, i))
        } : void 0,
        collapsed: (n = t.collapsed) == null ? void 0 : n.slice(),
        rowGroups: (s = t.rowGroups) == null ? void 0 : s.map((i) => R({}, i))
      });
    })
  });
}
function ee(o) {
  return z(R({}, o), {
    sheets: o.sheets.map(uh),
    themeColors: o.themeColors.slice(),
    // WPS 内嵌图登记表:新 Map(防转换增删污染快照),CellImage 不可变 → 按引用共享
    cellImages: o.cellImages ? new Map(o.cellImages) : void 0,
    // 工作簿保护(审阅选项卡):新对象供 undo 独立还原(缺省 undefined)
    protection: o.protection ? R({}, o.protection) : void 0
  });
}
function gi(o, e) {
  const t = ee(e);
  for (let n = 0; n < o.sheets.length && n < t.sheets.length; n++)
    Object.assign(o.sheets[n], t.sheets[n]);
  o.sheets.splice(t.sheets.length);
  for (let n = o.sheets.length; n < t.sheets.length; n++) o.sheets.push(t.sheets[n]);
  o.activeSheet = t.activeSheet, o.date1904 = t.date1904, o.themeColors = t.themeColors, o.cellImages = t.cellImages, o.protection = t.protection;
}
const Ht = {
  cellStyle: "overwrite",
  fill: "overwrite",
  rowHeight: "source",
  colWidth: "firstRowOnly",
  sourceMerges: "apply",
  targetMerges: "clear",
  images: "apply"
}, al = {
  cellStyle: "skip",
  fill: "skip",
  rowHeight: "keep",
  colWidth: "keep",
  sourceMerges: "skip",
  targetMerges: "keep",
  images: "skip"
};
function Lt(o) {
  return R(R({}, Ht), o != null ? o : {});
}
function mi(o, e) {
  return o.colWidth === "source" || o.colWidth === "firstRowOnly" && e === 0;
}
function bi(o, e, t, n, s) {
  if (n === "skip" && s === "skip") return null;
  const c = t, { fill: i } = c, r = bs(c, ["fill"]), l = n === "overwrite" ? e : o, a = R({}, l);
  return n !== "skip" ? (Object.assign(a, r), r.font && (a.font = R(R({}, l.font), r.font)), r.borders && (a.borders = R(R({}, l.borders), r.borders))) : (a.font = R({}, l.font), a.borders = R({}, l.borders)), s === "skip" ? a.fill = o.fill : i ? a.fill = R({}, i) : a.fill = s === "overwrite" ? { type: "none" } : o.fill, a;
}
const ph = 6 * 1024 * 1024;
function gh(o, e, t, n = {}) {
  var b, m, y, w;
  const s = n.withImageBytes !== !1, i = t.right - t.left + 1, r = [], l = /* @__PURE__ */ new Map();
  for (let v = t.top; v <= t.bottom; v++)
    n.rowVisible && !n.rowVisible(v) || (l.set(v, r.length), r.push(v));
  const a = r.length, c = [], d = /* @__PURE__ */ new Set();
  for (const v of r) {
    const x = l.get(v);
    for (let S = 0; S < i; S++) {
      const k = o.cells.get(O(v, t.left + S));
      if (!k) continue;
      const M = (m = (b = o.styles[k.styleId]) != null ? b : o.styles[0]) != null ? m : Qo(), E = {
        r: x,
        c: S,
        type: k.type,
        raw: k.raw instanceof Date ? { __d: k.raw.getTime() } : k.raw,
        style: M
      };
      k.formula && (E.formula = k.formula), k.hyperlink && (E.hyperlink = k.hyperlink), k.comment && (E.comment = k.comment), k.rich && (E.rich = k.rich), k.dispImgId && (E.dispImgId = k.dispImgId, d.add(k.dispImgId)), c.push(E);
    }
  }
  const h = [];
  for (const v of o.merges) {
    if (v.top < t.top || v.left < t.left || v.bottom > t.bottom || v.right > t.right) continue;
    let x = !0;
    for (let S = v.top; S <= v.bottom; S++) if (!l.has(S)) {
      x = !1;
      break;
    }
    x && h.push({ top: l.get(v.top), left: v.left - t.left, bottom: l.get(v.bottom), right: v.right - t.left });
  }
  const f = [];
  for (const v of o.images)
    v.from.row < t.top || v.from.row > t.bottom || v.from.col < t.left || v.from.col > t.right || l.has(v.from.row) && (!v.bytes || !v.mime || f.push({
      from: { col: v.from.col - t.left, row: l.get(v.from.row), colOffEmu: v.from.colOffEmu, rowOffEmu: v.from.rowOffEmu },
      to: v.to ? { col: v.to.col - t.left, row: (y = l.get(v.to.row)) != null ? y : v.to.row - t.top, colOffEmu: v.to.colOffEmu, rowOffEmu: v.to.rowOffEmu } : void 0,
      extWidthEmu: v.extWidthEmu,
      extHeightEmu: v.extHeightEmu,
      editAs: v.editAs,
      mime: v.mime,
      b64: s ? ut(v.bytes) : ""
    }));
  const u = [];
  for (const v of d) {
    const x = (w = e.cellImages) == null ? void 0 : w.get(v);
    x != null && x.bytes && x.mime && u.push({ id: v, mime: x.mime, b64: s ? ut(x.bytes) : "" });
  }
  const p = [];
  for (const v of r) {
    const x = o.rows.get(v);
    x && p.push({ i: l.get(v), height: x.height, hidden: x.hidden || void 0, custom: x.customHeight || void 0 });
  }
  const g = [];
  for (let v = 0; v < i; v++) {
    const x = o.columns.get(t.left + v);
    x && g.push({ i: v, width: x.width, hidden: x.hidden || void 0 });
  }
  return { v: 1, rows: a, cols: i, cells: c, merges: h, images: f, cellImages: u, rowHeights: p, colWidths: g };
}
function mh(o) {
  return o && typeof o == "object" && "__d" in o ? new Date(o.__d) : o;
}
function bh(o) {
  return kh(JSON.stringify(o));
}
function yh(o) {
  if (!o) return null;
  try {
    const e = JSON.parse(Ch(o));
    return e && e.v === 1 && Array.isArray(e.cells) ? e : null;
  } catch (e) {
    return null;
  }
}
function xh(o, e) {
  return o ? z(R({}, o), {
    cellImages: o.cellImages.map((t) => z(R({}, t), { b64: t.b64 || e.get(`c:${t.id}`) || "" })),
    images: o.images.map((t, n) => z(R({}, t), { b64: t.b64 || e.get(`f:${n}`) || "" }))
  }) : null;
}
function wh(o) {
  return z(R({}, o), {
    cells: o.cells.map((e) => e.dispImgId ? z(R({}, e), { type: "empty", raw: null, formula: void 0, dispImgId: void 0 }) : e),
    images: [],
    cellImages: []
  });
}
function vh(o) {
  var e;
  if (typeof DOMParser == "undefined" || !o) return null;
  try {
    const t = new DOMParser().parseFromString(o, "text/html"), n = yh((e = t.querySelector("table")) == null ? void 0 : e.getAttribute("data-ooxml-clip"));
    if (!n) return null;
    const s = /* @__PURE__ */ new Map();
    return t.querySelectorAll("img[data-clip-img]").forEach((i) => {
      const r = i.getAttribute("data-clip-img"), l = i.getAttribute("src") || "", a = l.indexOf(",");
      r && l.startsWith("data:") && a > 0 && s.set(r, l.slice(a + 1));
    }), xh(n, s);
  } catch (t) {
    return null;
  }
}
function ut(o) {
  let e = "";
  for (let n = 0; n < o.length; n += 32768) e += String.fromCharCode(...o.subarray(n, n + 32768));
  return btoa(e);
}
function kn(o) {
  const e = atob(o), t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
  return t;
}
function kh(o) {
  return ut(new TextEncoder().encode(o));
}
function Ch(o) {
  return new TextDecoder().decode(kn(o));
}
function Sh(o) {
  return o.kind === "set-dim" || o.kind === "restore-dim";
}
function Eh(o) {
  return o.kind === "image-set" || o.kind === "image-add" || o.kind === "image-remove";
}
function Th(o) {
  return o.kind === "struct-edit" || o.kind === "restore-wb";
}
function cl(o) {
  switch (o.kind) {
    case "set-value":
      return [{ row: o.row, col: o.col }];
    case "set-cells":
      return o.cells.map((e) => ({ row: e.row, col: e.col }));
    case "restore-cells":
      return o.cells.map((e) => ({ row: e.row, col: e.col }));
    case "set-style":
      return o.cells.map((e) => ({ row: e.row, col: e.col }));
    case "set-comment":
      return [{ row: o.row, col: o.col }];
    case "merge-cells":
      return dl(o.range);
    // 合并清空的被覆盖格 → 发 cell-change
    case "restore-merges":
      return o.cells.map((e) => ({ row: e.row, col: e.col }));
    case "set-dim":
    case "restore-dim":
    case "image-set":
    case "image-add":
    case "image-remove":
    case "struct-edit":
    case "restore-wb":
    case "unmerge-cells":
    case "set-conditional":
    case "set-page-config":
    case "convert-to-cell":
    case "convert-to-cells":
    case "convert-to-float":
    case "convert-to-floats":
      return [];
  }
}
function dl(o) {
  const e = [];
  for (let t = o.top; t <= o.bottom; t++)
    for (let n = o.left; n <= o.right; n++) t === o.top && n === o.left || e.push({ row: t, col: n });
  return e;
}
function yi(o, e) {
  return !(o.bottom < e.top || o.top > e.bottom || o.right < e.left || o.left > e.right);
}
function $h(o, e, t) {
  const n = (e === "col" ? o.columns : o.rows).get(t);
  return n ? R({}, n) : null;
}
function Xt(o, e) {
  return e.map((t) => {
    const n = o.cells.get(O(t.row, t.col));
    return { row: t.row, col: t.col, cell: n ? Bt(n) : null };
  });
}
function xt(o, e) {
  const t = cl(e);
  if (e.kind === "set-dim" || e.kind === "restore-dim") {
    const s = $h(o, e.axis, e.index);
    return e.kind === "set-dim" ? e.axis === "col" ? Nd(o, e.index, e.size) : Pd(o, e.index, e.size) : At(o, e.axis, e.index, e.info), { inverse: { kind: "restore-dim", axis: e.axis, index: e.index, info: s }, affected: t };
  }
  if (e.kind === "image-set") {
    const s = se(o.images[e.index]);
    return o.images[e.index] = se(e.anchor), { inverse: { kind: "image-set", index: e.index, anchor: s }, affected: t };
  }
  if (e.kind === "image-add")
    return { inverse: { kind: "image-remove", index: Wo(o, se(e.anchor), e.index) }, affected: t };
  if (e.kind === "image-remove") {
    const s = se(o.images[e.index]);
    return Od(o, e.index), { inverse: { kind: "image-add", anchor: s, index: e.index }, affected: t };
  }
  if (e.kind === "merge-cells") {
    const s = o.merges.map((l) => R({}, l)), i = dl(e.range), r = Xt(o, i);
    o.merges = o.merges.filter((l) => !yi(l, e.range));
    for (const l of i) o.cells.delete(O(l.row, l.col));
    return o.merges.push(R({}, e.range)), { inverse: { kind: "restore-merges", merges: s, cells: r }, affected: t };
  }
  if (e.kind === "unmerge-cells") {
    const s = o.merges.map((i) => R({}, i));
    return o.merges = o.merges.filter((i) => !yi(i, e.range)), { inverse: { kind: "restore-merges", merges: s, cells: [] }, affected: t };
  }
  if (e.kind === "restore-merges") {
    const s = o.merges.map((r) => R({}, r)), i = Xt(o, e.cells.map((r) => ({ row: r.row, col: r.col })));
    o.merges = e.merges.map((r) => R({}, r));
    for (const { row: r, col: l, cell: a } of e.cells) ti(o, r, l, a);
    return { inverse: { kind: "restore-merges", merges: s, cells: i }, affected: t };
  }
  if (e.kind === "set-conditional") {
    const s = o.conditional;
    return o.conditional = e.rules, { inverse: { kind: "set-conditional", rules: s }, affected: t };
  }
  if (e.kind === "set-page-config") {
    const s = { kind: "set-page-config" };
    return "pageSetup" in e && (s.pageSetup = o.pageSetup, o.pageSetup = e.pageSetup), "pageBreaks" in e && (s.pageBreaks = o.pageBreaks, o.pageBreaks = e.pageBreaks), "background" in e && (s.background = o.background, o.background = e.background), "watermark" in e && (s.watermark = o.watermark, o.watermark = e.watermark), { inverse: s, affected: t };
  }
  if (e.kind === "set-comment") {
    const s = Xt(o, [{ row: e.row, col: e.col }]);
    return Fd(o, e.row, e.col, e.comment), { inverse: { kind: "restore-cells", cells: s }, affected: t };
  }
  const n = Xt(o, t);
  switch (e.kind) {
    case "set-value":
      _e(o, e.row, e.col, e.value);
      break;
    case "set-cells":
      for (const { row: s, col: i, value: r } of e.cells) _e(o, s, i, r);
      break;
    case "restore-cells":
      for (const { row: s, col: i, cell: r } of e.cells) ti(o, s, i, r);
      break;
    case "set-style":
      for (const { row: s, col: i } of e.cells) xn(o, s, i, e.patch);
      break;
  }
  return { inverse: { kind: "restore-cells", cells: n }, affected: t };
}
const Mh = Number.NaN;
function hl(o) {
  let e = 0;
  const t = o.toUpperCase();
  for (let n = 0; n < t.length; n++) e = e * 26 + (t.charCodeAt(n) - 64);
  return e - 1;
}
function xi(o, e) {
  return e.mode === "insert" ? o >= e.at ? o + e.count : o : o >= e.at + e.count ? o - e.count : o >= e.at ? Mh : o;
}
function wt(o, e, t) {
  let n = hl(o.col), s = parseInt(o.row, 10) - 1;
  if (e.axis === "row") {
    const i = xi(s, e);
    if (Number.isNaN(i)) {
      if (!t) return null;
      s = e.at;
    } else s = i;
  } else {
    const i = xi(n, e);
    if (Number.isNaN(i)) {
      if (!t) return null;
      n = e.at;
    } else n = i;
  }
  return s < 0 || n < 0 ? null : { colAbs: o.colAbs, col: Xe(n), rowAbs: o.rowAbs, row: String(s + 1) };
}
const mo = (o) => `${o.colAbs}${o.col}${o.rowAbs}${o.row}`, wi = "(\\$?)([A-Za-z]{1,3})(\\$?)(\\d+)", fl = new RegExp(`(?:('[^']+'|[A-Za-z_\\u4e00-\\u9fff][\\w.\\u4e00-\\u9fff]*)!)?${wi}(?::${wi})?`, "g");
function Ih(o) {
  return o.startsWith("'") ? o.slice(1, -1).replace(/''/g, "'") : o;
}
function Ah(o, e) {
  const t = o.split(/("(?:[^"]|"")*")/);
  for (let n = 0; n < t.length; n += 2) {
    const s = t[n];
    t[n] = s.replace(fl, (i, r, l, a, c, d, h, f, u, p, g) => {
      const b = s[g + i.length];
      if (!f && b === "(") return i;
      const m = s[g - 1];
      if (!r && m && /[A-Za-z0-9_$.]/.test(m) || (r ? Ih(r) : e.formulaSheet).toLowerCase() !== e.targetSheet.toLowerCase()) return i;
      const w = r ? r + "!" : "";
      if (!f) {
        const M = wt({ colAbs: l, col: a, rowAbs: c, row: d }, e, !1);
        return M ? w + mo(M) : "#REF!";
      }
      const v = wt({ colAbs: l, col: a, rowAbs: c, row: d }, e, !0), x = wt({ colAbs: h, col: f, rowAbs: u, row: p }, e, !0), S = !wt({ colAbs: l, col: a, rowAbs: c, row: d }, e, !1), k = !wt({ colAbs: h, col: f, rowAbs: u, row: p }, e, !1);
      return S && k ? w + "#REF!" : w + mo(v) + ":" + mo(x);
    });
  }
  return t.join("");
}
function vi(o, e, t, n, s, i) {
  let r = hl(e), l = parseInt(n, 10) - 1;
  return o !== "$" && (r += i), t !== "$" && (l += s), r < 0 || l < 0 ? null : `${o}${Xe(r)}${t}${l + 1}`;
}
function Rh(o, e, t) {
  if (!e && !t) return o;
  const n = o.split(/("(?:[^"]|"")*")/);
  for (let s = 0; s < n.length; s += 2) {
    const i = n[s];
    n[s] = i.replace(fl, (r, l, a, c, d, h, f, u, p, g, b) => {
      const m = i[b + r.length];
      if (!u && m === "(") return r;
      const y = i[b - 1];
      if (!l && y && /[A-Za-z0-9_$.]/.test(y)) return r;
      const w = l ? l + "!" : "", v = vi(a, c, d, h, e, t);
      if (!u) return v ? w + v : "#REF!";
      const x = vi(f, u, p, g, e, t);
      return v && x ? w + v + ":" + x : w + "#REF!";
    });
  }
  return n.join("");
}
function Fh(o, e, t, n, s) {
  const i = o.sheets[e];
  if (!i) return;
  const r = t === "insert-rows" || t === "delete-rows" ? "row" : "col", l = t.startsWith("insert") ? "insert" : "delete";
  for (const a of o.sheets)
    for (const c of a.cells.values())
      c.type === "formula" && c.formula && (c.formula = Ah(c.formula, { axis: r, at: n, count: s, mode: l, targetSheet: i.name, formulaSheet: a.name }));
}
function ul(o) {
  if (!o || o.type === "empty") return null;
  if (o.type === "formula") {
    const t = o.formula;
    return t == null || t === "" ? null : t[0] === "=" ? t : "=" + t;
  }
  const e = o.raw;
  return typeof e == "number" || typeof e == "boolean" || typeof e == "string" ? e : null;
}
function Lh(o, e, t, n) {
  var r;
  const s = e.sheets[t], i = /* @__PURE__ */ new Map();
  for (const l of n) {
    const a = (r = s == null ? void 0 : s.cells.get(O(l.row, l.col))) != null ? r : null;
    for (const c of o.setCell(t, l.row, l.col, ul(a)))
      i.set(`${c.sheet}:${c.row}:${c.col}`, c);
  }
  return [...i.values()];
}
function Nh(o, e) {
  for (const t of e) {
    const n = o.sheets[t.sheet];
    n && Ld(n, t.row, t.col, t.value);
  }
}
function Ph(o, e, t) {
  const n = new Set(t.map((s) => O(s.row, s.col)));
  return o.filter((s) => s.sheet === e && !n.has(O(s.row, s.col))).map((s) => ({ row: s.row, col: s.col }));
}
function ki(o, e) {
  for (let t = e.top; t <= e.bottom; t++)
    for (let n = e.left; n <= e.right; n++)
      if (!o.isEditable(t, n)) return !1;
  return !0;
}
function Gt(o, e) {
  const t = [];
  for (let n = e.top; n <= e.bottom; n++)
    for (let s = e.left; s <= e.right; s++)
      o.isEditable(n, s) || t.push({ row: n, col: s });
  return t;
}
function Kt(o, e, t) {
  var n, s, i, r;
  return e === "col" ? (s = (n = o.columns.get(t)) == null ? void 0 : n.width) != null ? s : o.defaultColWidth : (r = (i = o.rows.get(t)) == null ? void 0 : i.height) != null ? r : o.defaultRowHeight;
}
function Oh(o) {
  const e = new RegExp("^data:([^;,]+)(;base64)?,(.*)$", "s").exec(o);
  if (!e || typeof atob == "undefined") return null;
  try {
    const t = atob(e[3]), n = new Uint8Array(t.length);
    for (let s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
    return { bytes: n, mime: e[1] || "image/png" };
  } catch (t) {
    return null;
  }
}
class Hh {
  constructor(e) {
    C(this, "undoStack", []);
    C(this, "redoStack", []);
    C(this, "editing", null);
    C(this, "limit", 200);
    // 脏状态 + 原件 baseline(均 workbook 级;editable 时懒捕获,读层零成本)
    // dirty = 最近一次发出的脏态(emit 去重缓存);真值恒由 isDirty() 现算(见其定义)。
    C(this, "dirty", !1);
    // 跨会话脏:undo 栈按"会话"(切表/换簿)清空,故切表前累积的未保存编辑单独记,保证换表后仍显示 *。
    C(this, "priorSessionDirty", !1);
    C(this, "baseline", null);
    C(this, "baselineFor", null);
    // 公式引擎(E4;可选,异步懒初始化;未就绪时编辑不重算)
    C(this, "engine", null);
    C(this, "engineFor", null);
    // 引擎对应哪个 workbook
    C(this, "warming", !1);
    /** 计算模式(公式选项卡「计算选项」):auto=编辑即级联重算;manual=编辑不重算,待「重算工作簿/工作表」。 */
    C(this, "calcMode", "auto");
    // 粘贴行为(默认覆盖式 1:1;经 setPasteBehavior / :paste-behavior prop 改;右键选择性粘贴逐次覆盖)
    C(this, "pasteBehavior", Ht);
    this.host = e;
  }
  /** 读当前粘贴行为(完整配置)。 */
  getPasteBehavior() {
    return this.pasteBehavior;
  }
  /** 设粘贴行为默认(缺项回落默认);影响 Ctrl+V / 右键「粘贴」。 */
  setPasteBehavior(e) {
    this.pasteBehavior = Lt(e);
  }
  // ---- 公式引擎生命周期(E4) ----
  /** 异步懒初始化引擎(开重算 + 有工厂 + 尚未为当前簿建好)。返回的 Promise 供测试 await;生产 fire-and-forget。 */
  warmEngine() {
    if (this.warming || !this.host.isRecalcEnabled()) return Promise.resolve();
    const e = this.host.getEngineFactory(), t = this.host.getWorkbook();
    return !e || !t || this.engineFor === t ? Promise.resolve() : (this.warming = !0, (async () => {
      var n;
      try {
        const s = await e();
        if (this.host.getWorkbook() !== t) {
          s.destroy();
          return;
        }
        s.setSheets(t), (n = this.engine) == null || n.destroy(), this.engine = s, this.engineFor = t;
      } catch (s) {
        console.warn("[ooxml-preview] 公式引擎初始化失败(重算已跳过):", s);
      } finally {
        this.warming = !1;
      }
    })());
  }
  /** 释放引擎(切簿/关重算/dispose)。 */
  disposeEngine() {
    var e;
    (e = this.engine) == null || e.destroy(), this.engine = null, this.engineFor = null;
  }
  /** 配置变化(recalc/factory)或换新簿:重置引擎并按需重新点火。 */
  refreshEngine() {
    this.disposeEngine(), this.warmEngine();
  }
  engineReady() {
    return !!this.engine && this.host.isRecalcEnabled() && this.engineFor === this.host.getWorkbook();
  }
  /** 公式引擎是否已就绪(异步 warm 完成且对应当前簿);未开重算恒 false。 */
  isRecalcReady() {
    return this.engineReady();
  }
  /** 计算模式:auto / manual(公式选项卡「计算选项」)。 */
  getCalcMode() {
    return this.calcMode;
  }
  setCalcMode(e) {
    this.calcMode = e;
  }
  /**
   * 全量重算(公式选项卡「重算工作簿」)：引擎重灌整簿 → 把每个公式格算出的值写回模型。
   * `onlySheet` 给定则只写回该表(仍全簿求值以保跨表引用)。未开重算/引擎未就绪 → 返 false。
   */
  recalcAll(e) {
    if (!this.engineReady()) return !1;
    const t = this.host.getWorkbook(), n = this.host.getDate1904();
    this.engine.setSheets(t);
    for (let s = 0; s < t.sheets.length; s++) {
      if (e != null && s !== e) continue;
      const i = t.sheets[s];
      for (const r of i.cells.values()) {
        if (r.type !== "formula") continue;
        const l = this.engine.getValue(s, r.row, r.col);
        if (r.raw === l) continue;
        const a = s === this.host.getActiveSheetIndex() ? he(i, r.row, r.col, n) : null;
        r.raw = l, a && this.host.emit("cell-change", { before: a, after: he(i, r.row, r.col, n), source: "api" });
      }
    }
    return this.host.onModelChange(), !0;
  }
  /** 只重算当前活动表(「计算工作表」)。 */
  recalcActiveSheet() {
    return this.recalcAll(this.host.getActiveSheetIndex());
  }
  // ---- 状态查询 ----
  getEditingCell() {
    return this.editing;
  }
  setEditing(e) {
    this.editing = e;
  }
  canUndo() {
    return this.undoStack.length > 0;
  }
  canRedo() {
    return this.redoStack.length > 0;
  }
  /** 查询任意格的完整快照(要求 5:事件之外也有查询 API) */
  getCellSnapshot(e, t) {
    const n = this.host.getSheet();
    return n ? he(n, e, t, this.host.getDate1904()) : null;
  }
  /** 切表/换簿时清空(交互态 + 命令栈作废)。切表前若有可撤销编辑,并入跨会话脏(换表后仍显示 *)。 */
  reset() {
    this.undoStack.length && (this.priorSessionDirty = !0), this.undoStack = [], this.redoStack = [], this.editing = null;
  }
  // ---- 命令式编辑 API(要求 3:直接编辑哪行哪列) ----
  /** 编辑单格;只读则不动,返回是否生效 */
  editCell(e, t, n) {
    if (!this.host.isEditable(e, t)) return !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "set-value", row: e, col: t, value: n }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  /** 区域批量设值(2D,左上对齐 range.top/left);跳过只读格,返回是否有改动 */
  editRange(e, t) {
    const n = this.collectEditable(e, t);
    if (!n.length) return !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "set-cells", cells: n }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  /** 设/清单元格批注(1.11.0,单次撤销)。 */
  setCellComment(e, t, n) {
    if (!this.host.isEditable(e, t)) return !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "set-comment", row: e, col: t, comment: n }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  /** 批量设一组散列格(自动填充用,1.10.0):跳过只读格,整体单次撤销。 */
  setCellsBatch(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = e.filter((s) => this.host.isEditable(s.row, s.col));
    if (!t.length) return !1;
    this.ensureBaseline();
    const n = this.exec({ kind: "set-cells", cells: t }, "api");
    return n && (this.pushUndo(n), this.markDirty()), !!n;
  }
  /** 替换整张表的条件格式规则集(1.9.0,整体单次撤销)。规则对象不可变 → 直接换数组。 */
  setConditionalRules(e) {
    if (!this.host.isEditingEnabled() || !this.host.getSheet()) return !1;
    this.ensureBaseline();
    const t = this.exec({ kind: "set-conditional", rules: e }, "api");
    return t && (this.pushUndo(t), this.markDirty()), !!t;
  }
  /** 改页面设置 / 分页符 / 背景 / 水印(替换式,单次撤销);cfg 里给了哪个键就改哪个。1.16.0 页面选项卡 */
  setPageConfig(e) {
    if (!this.host.isEditingEnabled() || !this.host.getSheet()) return !1;
    this.ensureBaseline();
    const t = this.exec(R({ kind: "set-page-config" }, e), "api");
    return t && (this.pushUndo(t), this.markDirty(), this.host.onModelChange()), !!t;
  }
  /** 合并区 m 是否与矩形 [top,left]-[bottom,right] 有交叠(用于清粘贴区内的目标原有合并)。 */
  _mergeOverlaps(e, t, n, s, i) {
    return !(e.bottom < t || e.top > s || e.right < n || e.left > i);
  }
  /**
   * 富粘贴(Excel/WPS 复制的 HTML 解析后):值 + 样式 + 合并 + 图片,**整体单次撤销**。
   * start = 落点左上角。跳过只读格。一次 cloneWorkbook 快照 → 应用全部 → 压一条 restore-wb 逆。
   * behaviorOverride = 右键「选择性粘贴」逐次预设(覆盖 this.pasteBehavior;缺省走默认配置)。
   */
  pasteRich(e, t, n) {
    var v;
    if (!this.host.isEditingEnabled()) return !1;
    const s = this.host.getSheet(), i = this.host.getWorkbook();
    if (!s || !i) return !1;
    const { values: r, styles: l, merges: a, images: c } = t;
    if (!r.length && !l.length && !a.length && !c.length) return !1;
    const d = n ? Lt(R(R({}, this.pasteBehavior), n)) : this.pasteBehavior;
    this.ensureBaseline();
    const h = this.host.getDate1904(), f = ee(i), u = /* @__PURE__ */ new Set(), p = [], g = (x, S) => {
      const k = `${x}:${S}`;
      u.has(k) || (u.add(k), p.push({ row: x, col: S }));
    };
    for (let x = 0; x < r.length; x++)
      for (let S = 0; S < r[x].length; S++) {
        const k = e.row + x, M = e.col + S;
        this.host.isEditable(k, M) && g(k, M);
      }
    for (const x of l) {
      const S = e.row + x.row, k = e.col + x.col;
      this.host.isEditable(S, k) && g(S, k);
    }
    const b = p.map((x) => he(s, x.row, x.col, h)), m = e.row + Math.max(0, r.length - 1), y = e.col + Math.max(0, r.reduce((x, S) => Math.max(x, S.length), 0) - 1), w = [];
    d.targetMerges === "clear" && (s.merges = s.merges.filter((x) => !this._mergeOverlaps(x, e.row, e.col, m, y)));
    for (let x = 0; x < r.length; x++)
      for (let S = 0; S < r[x].length; S++) {
        const k = e.row + x, M = e.col + S;
        this.host.isEditable(k, M) ? _e(s, k, M, r[x][S]) : r[x][S] != null && w.push({ row: k, col: M });
      }
    if (d.cellStyle !== "skip" || d.fill !== "skip") {
      const x = s.styles[0];
      for (const S of l) {
        const k = e.row + S.row, M = e.col + S.col;
        if (!this.host.isEditable(k, M)) continue;
        const E = s.cells.get(O(k, M)), $ = (v = E ? s.styles[E.styleId] : x) != null ? v : x, T = bi($, x, S.patch, d.cellStyle, d.fill);
        if (!T) continue;
        const I = Uo(s, T);
        E ? E.styleId = I : ni(s, { row: k, col: M, type: "empty", raw: null, styleId: I });
      }
    }
    if (d.sourceMerges === "apply")
      for (const x of a) {
        const S = { top: e.row + x.top, left: e.col + x.left, bottom: e.row + x.bottom, right: e.col + x.right };
        if (!(S.top === S.bottom && S.left === S.right)) {
          if (!ki(this.host, S)) {
            w.push(...Gt(this.host, S));
            continue;
          }
          xt(s, { kind: "merge-cells", range: S });
        }
      }
    if (d.images === "apply")
      for (const x of c) {
        const S = e.row + x.row, k = e.col + x.col;
        if (!this.host.isEditable(S, k)) {
          w.push({ row: S, col: k });
          continue;
        }
        const M = Oh(x.dataUrl);
        if (!M) continue;
        const E = Wo(s, { src: x.dataUrl, bytes: M.bytes, mime: M.mime, from: { col: k, row: S, colOffEmu: 0, rowOffEmu: 0 }, extWidthEmu: Pe(96), extHeightEmu: Pe(96) });
        ho(i, s, E, S, k);
      }
    return d.rowHeight === "source" && t.rowHeights.forEach((x, S) => {
      x > 0 && At(s, "row", e.row + S, { height: x, hidden: !1 });
    }), mi(d, e.row) && t.colWidths.forEach((x, S) => {
      x > 0 && At(s, "col", e.col + S, { width: x, hidden: !1 });
    }), this.pushUndo({ kind: "restore-wb", snapshot: f }), this.markDirty(), this.host.onModelChange(), this.host.rebuildOverlays(), this.host.isRecalcEnabled() && this.refreshEngine(), p.forEach(
      (x, S) => this.host.emit("cell-change", { before: b[S], after: he(s, x.row, x.col, h), source: "api" })
    ), this._emitPasteDenied(w), !0;
  }
  /** 去重后发一次 paste 的 permission-denied(没只读格则不发)。 */
  _emitPasteDenied(e) {
    if (!e.length) return;
    const t = /* @__PURE__ */ new Set(), n = e.filter((s) => {
      const i = `${s.row}:${s.col}`;
      return t.has(i) ? !1 : (t.add(i), !0);
    });
    this.host.emit("permission-denied", { reason: "paste", cells: n, message: `粘贴撞 ${n.length} 个只读格,已跳过(只读区不会被覆盖)` });
  }
  /**
   * 1:1 保真粘贴:用复制时序列化进剪贴板的完整模型快照(本组件自己复制的,跨实例 Vue3/Vue2/React 通用)
   * 覆盖式落到目标区 —— 完整还原 值/原始类型/数字格式/全部样式(含边框)/合并/图片(浮动 + DISPIMG)/行高列宽。
   * 跟 pasteRich(外部 HTML 近似)同走命令栈(整体单次撤销)+ 前后快照 cell-change + 只读 permission-denied。
   */
  pasteSnapshot(e, t, n) {
    var b, m, y, w, v;
    if (!this.host.isEditingEnabled()) return !1;
    const s = this.host.getSheet(), i = this.host.getWorkbook();
    if (!s || !i || !t.cells.length && !t.merges.length && !t.images.length && !t.rowHeights.length && !t.colWidths.length) return !1;
    const r = n ? Lt(R(R({}, this.pasteBehavior), n)) : this.pasteBehavior;
    this.ensureBaseline();
    const l = this.host.getDate1904(), a = ee(i), c = [];
    for (let x = 0; x < t.rows; x++)
      for (let S = 0; S < t.cols; S++) {
        const k = e.row + x, M = e.col + S;
        this.host.isEditable(k, M) && c.push({ row: k, col: M });
      }
    const d = c.map((x) => he(s, x.row, x.col, l)), h = [], f = /* @__PURE__ */ new Map();
    for (const x of c) {
      const S = s.cells.get(O(x.row, x.col));
      S && f.set(O(x.row, x.col), { id: S.styleId, style: (b = s.styles[S.styleId]) != null ? b : s.styles[0] });
    }
    if (r.cellStyle === "overwrite" && r.fill === "overwrite") for (const x of c) s.cells.delete(O(x.row, x.col));
    if (r.images === "apply" && t.cellImages.length) {
      i.cellImages || (i.cellImages = /* @__PURE__ */ new Map());
      for (const x of t.cellImages)
        i.cellImages.has(x.id) || i.cellImages.set(x.id, { id: x.id, bytes: kn(x.b64), mime: x.mime, src: `data:${x.mime};base64,${x.b64}` });
    }
    const p = s.styles[0];
    for (const x of t.cells) {
      const S = e.row + x.r, k = e.col + x.c;
      if (!this.host.isEditable(S, k)) {
        h.push({ row: S, col: k });
        continue;
      }
      const M = f.get(O(S, k)), E = bi((m = M == null ? void 0 : M.style) != null ? m : p, p, x.style, r.cellStyle, r.fill), $ = E ? Uo(s, E) : (y = M == null ? void 0 : M.id) != null ? y : 0, T = { row: S, col: k, type: x.type, raw: mh(x.raw), styleId: $ };
      x.formula && (T.formula = x.formula), x.hyperlink && (T.hyperlink = x.hyperlink), x.comment && (T.comment = x.comment), x.rich && (T.rich = x.rich), x.dispImgId && r.images === "apply" && (T.dispImgId = x.dispImgId), ni(s, T);
    }
    const g = { top: e.row, left: e.col, bottom: e.row + t.rows - 1, right: e.col + t.cols - 1 };
    if (r.targetMerges === "clear" && (s.merges = s.merges.filter((x) => !this._mergeOverlaps(x, g.top, g.left, g.bottom, g.right))), r.sourceMerges === "apply") for (const x of t.merges) {
      const S = { top: e.row + x.top, left: e.col + x.left, bottom: e.row + x.bottom, right: e.col + x.right };
      if (!(S.top === S.bottom && S.left === S.right)) {
        if (!ki(this.host, S)) {
          h.push(...Gt(this.host, S));
          continue;
        }
        xt(s, { kind: "merge-cells", range: S });
      }
    }
    if (r.images === "apply") for (const x of t.images) {
      const S = e.row + x.from.row, k = e.col + x.from.col;
      if (!this.host.isEditable(S, k)) {
        h.push({ row: S, col: k });
        continue;
      }
      Wo(s, {
        src: `data:${x.mime};base64,${x.b64}`,
        bytes: kn(x.b64),
        mime: x.mime,
        from: { col: k, row: S, colOffEmu: x.from.colOffEmu, rowOffEmu: x.from.rowOffEmu },
        to: x.to ? { col: e.col + x.to.col, row: e.row + x.to.row, colOffEmu: x.to.colOffEmu, rowOffEmu: x.to.rowOffEmu } : void 0,
        extWidthEmu: x.extWidthEmu,
        extHeightEmu: x.extHeightEmu,
        editAs: x.editAs
      });
    }
    if (r.rowHeight === "source") for (const x of t.rowHeights) At(s, "row", e.row + x.i, { height: (w = x.height) != null ? w : s.defaultRowHeight, hidden: !!x.hidden, customHeight: !!x.custom });
    if (mi(r, e.row)) for (const x of t.colWidths) At(s, "col", e.col + x.i, { width: (v = x.width) != null ? v : s.defaultColWidth, hidden: !!x.hidden });
    return this.pushUndo({ kind: "restore-wb", snapshot: a }), this.markDirty(), this.host.onModelChange(), this.host.rebuildOverlays(), this.host.isRecalcEnabled() && this.refreshEngine(), c.forEach(
      (x, S) => this.host.emit("cell-change", { before: d[S], after: he(s, x.row, x.col, l), source: "api" })
    ), this._emitPasteDenied(h), !0;
  }
  /** 清空区域(跳过只读) */
  clearRange(e) {
    const t = [];
    for (let s = e.top; s <= e.bottom; s++)
      for (let i = e.left; i <= e.right; i++) this.host.isEditable(s, i) && t.push({ row: s, col: i, value: null });
    if (!t.length) return !1;
    this.ensureBaseline();
    const n = this.exec({ kind: "set-cells", cells: t }, "api");
    return n && (this.pushUndo(n), this.markDirty()), !!n;
  }
  // ---- 数据选项卡:数据有效性 authoring / 删除重复项 / 文本分列(均 cloneWorkbook 单次撤销)----
  /** 从 dataValidationRules 派生渲染用的 dataValidations(list 型 range)+ dataValidationLists。 */
  syncValidationDerived(e) {
    var n;
    const t = (n = e.dataValidationRules) != null ? n : [];
    e.dataValidations = t.filter((s) => s.type === "list").map((s) => R({}, s.range)), e.dataValidationLists = t.filter((s) => {
      var i;
      return s.type === "list" && (((i = s.options) == null ? void 0 : i.length) || 0) > 0;
    }).map((s) => {
      var i;
      return { range: R({}, s.range), options: [...(i = s.options) != null ? i : []] };
    });
  }
  /** 设/清区域数据有效性(rule=null 清除)。移除与 range 完全相同的旧规则,加新规则。单次撤销。 */
  setDataValidation(e, t) {
    var a;
    if (!this.host.isEditingEnabled()) return !1;
    const n = this.host.getWorkbook(), s = this.host.getSheet();
    if (!n || !s) return !1;
    this.ensureBaseline();
    const i = ee(n), r = (c, d) => c.top === d.top && c.left === d.left && c.bottom === d.bottom && c.right === d.right, l = ((a = s.dataValidationRules) != null ? a : []).filter((c) => !r(c.range, t));
    return e && l.push(z(R({}, e), { range: R({}, t) })), s.dataValidationRules = l, this.syncValidationDerived(s), this.pushUndo({ kind: "restore-wb", snapshot: i }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 删除重复行:按 keyCols 组合判重,保留首次,删重复行(降序 deleteRows)。返回删除行数;单次撤销。 */
  removeDuplicates(e, t, n) {
    if (!this.host.isEditingEnabled()) return 0;
    const s = this.host.getWorkbook(), i = this.host.getSheet();
    if (!s || !i) return 0;
    const r = this.host.getDate1904(), l = t.length ? t : Array.from({ length: e.right - e.left + 1 }, (f, u) => e.left + u), a = n ? e.top + 1 : e.top, c = /* @__PURE__ */ new Set(), d = [];
    for (let f = a; f <= e.bottom; f++) {
      const u = l.map((p) => me(i, f, p, r)).join("");
      c.has(u) ? d.push(f) : c.add(u);
    }
    if (!d.length) return 0;
    this.ensureBaseline();
    const h = ee(s);
    for (let f = d.length - 1; f >= 0; f--) rl(i, d[f], 1);
    return this.pushUndo({ kind: "restore-wb", snapshot: h }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), d.length;
  }
  /** 文本分列:把 range 单列每格按 delimiter 拆分,写入本行 col、col+1…(向右覆盖)。单次撤销。 */
  textToColumns(e, t) {
    if (!this.host.isEditingEnabled() || !t) return !1;
    const n = this.host.getWorkbook(), s = this.host.getSheet();
    if (!n || !s) return !1;
    const i = e.left, r = this.host.getDate1904();
    let l = !1;
    this.ensureBaseline();
    const a = ee(n);
    for (let c = e.top; c <= e.bottom; c++) {
      const d = me(s, c, i, r);
      if (d === "") continue;
      const h = d.split(t);
      h.length <= 1 || (h.forEach((f, u) => _e(s, c, i + u, f)), l = !0);
    }
    return l ? (this.pushUndo({ kind: "restore-wb", snapshot: a }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  // ---- 审阅选项卡:单元格锁定 / 工作表保护 / 工作簿保护(均 cloneWorkbook 单次撤销)----
  /**
   * 设区域单元格「锁定」态(审阅选项卡「锁定单元格」;locked 缺省 true,仅保护工作表时生效)。
   * 属保护授权动作 —— **不走 isEditable 闸门**(否则表已保护时锁定格自身是只读、永远解不开),
   * 只要求 editing 开启。单次撤销。
   */
  setCellsLocked(e, t) {
    if (!this.host.isEditingEnabled()) return !1;
    const n = this.host.getWorkbook(), s = this.host.getSheet();
    if (!n || !s) return !1;
    this.ensureBaseline();
    const i = ee(n);
    for (let r = e.top; r <= e.bottom; r++)
      for (let l = e.left; l <= e.right; l++)
        xn(s, r, l, { protection: { locked: t } });
    return this.pushUndo({ kind: "restore-wb", snapshot: i }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 设/清工作表保护(审阅选项卡「保护工作表」;null=解除)。改可编辑闸门 → onModelChange 重绘。单次撤销。 */
  setSheetProtection(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), n = this.host.getSheet();
    if (!t || !n) return !1;
    this.ensureBaseline();
    const s = ee(t);
    return e ? n.sheetProtection = R({}, e) : delete n.sheetProtection, this.pushUndo({ kind: "restore-wb", snapshot: s }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 设允许编辑区域(审阅选项卡「允许编辑区域」;替换整表列表)。单次撤销。 */
  setProtectedRanges(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), n = this.host.getSheet();
    if (!t || !n) return !1;
    this.ensureBaseline();
    const s = ee(t);
    return n.protectedRanges = e.map((i) => z(R({}, i), { range: R({}, i.range) })), this.pushUndo({ kind: "restore-wb", snapshot: s }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 设/清工作簿保护(审阅选项卡「保护工作簿」;null=解除)。单次撤销。 */
  setWorkbookProtection(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook();
    if (!t) return !1;
    this.ensureBaseline();
    const n = ee(t);
    return e ? t.protection = R({}, e) : delete t.protection, this.pushUndo({ kind: "restore-wb", snapshot: n }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 给区域套样式覆盖(E5;跳过只读格)。返回是否有改动。前后 style 不同 → 发 cell-change。 */
  setStyle(e, t) {
    if (!this.host.isEditingEnabled()) return !1;
    const n = [];
    for (let i = e.top; i <= e.bottom; i++)
      for (let r = e.left; r <= e.right; r++) this.host.isEditable(i, r) && n.push({ row: i, col: r });
    if (!n.length) return !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "set-style", cells: n, patch: t }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  /** 批量套多段样式(每段 cells+patch,按序 merge),一次工作簿快照 → 单次撤销。用于表格样式(表头/隔行/边框)。 */
  setStyleRegions(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), n = this.host.getSheet();
    if (!t || !n) return !1;
    this.ensureBaseline();
    const s = ee(t);
    let i = !1;
    for (const r of e)
      for (const l of r.cells)
        this.host.isEditable(l.row, l.col) && (xn(n, l.row, l.col, r.patch), i = !0);
    return i ? (this.pushUndo({ kind: "restore-wb", snapshot: s }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  /** 填充:一批格设值(可为公式串)+ 可选从某格复制样式(共享 styleId),一次快照单次撤销。1.16.0 */
  fillCells(e) {
    var r, l;
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), n = this.host.getSheet();
    if (!t || !n) return !1;
    this.ensureBaseline();
    const s = ee(t);
    let i = !1;
    for (const a of e)
      if (this.host.isEditable(a.row, a.col)) {
        if (a.value !== void 0 && _e(n, a.row, a.col, a.value), a.styleFrom) {
          const c = (l = (r = n.cells.get(O(a.styleFrom.row, a.styleFrom.col))) == null ? void 0 : r.styleId) != null ? l : 0, d = O(a.row, a.col), h = n.cells.get(d);
          h ? h.styleId = c : n.cells.set(d, { row: a.row, col: a.col, type: "empty", raw: null, styleId: c });
        }
        i = !0;
      }
    return i ? (this.pushUndo({ kind: "restore-wb", snapshot: s }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  /** 清除格(all=删格 / comments=清批注),一次快照单次撤销。1.16.0 */
  clearCellsSnapshot(e, t) {
    if (!this.host.isEditingEnabled()) return !1;
    const n = this.host.getWorkbook(), s = this.host.getSheet();
    if (!n || !s) return !1;
    this.ensureBaseline();
    const i = ee(n);
    let r = !1;
    for (let l = e.top; l <= e.bottom; l++)
      for (let a = e.left; a <= e.right; a++) {
        if (!this.host.isEditable(l, a)) continue;
        const c = O(l, a), d = s.cells.get(c);
        d && (t === "all" ? (s.cells.delete(c), r = !0) : d.comment && (d.comment = void 0, r = !0));
      }
    return r ? (this.pushUndo({ kind: "restore-wb", snapshot: i }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  // ---- 行列结构编辑(E7;增删行列,快照逆) ----
  insertRows(e, t = 1) {
    return this.structEdit("insert-rows", e, t);
  }
  deleteRows(e, t = 1) {
    return this.structEdit("delete-rows", e, t);
  }
  insertCols(e, t = 1) {
    return this.structEdit("insert-cols", e, t);
  }
  deleteCols(e, t = 1) {
    return this.structEdit("delete-cols", e, t);
  }
  structEdit(e, t, n) {
    if (!this.host.isEditingEnabled() || t < 0 || n <= 0) return !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "struct-edit", op: e, at: t, count: n }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  // ---- 合并单元格(G1) ----
  /** 合并区域(吸收相交旧合并,清空被覆盖格只留左上锚点)。单格不合并。
   *  Phase A 补漏 (2026-06-08): 区域内任一格只读 → 拒绝整次合并 + emit permission-denied. */
  mergeCells(e) {
    if (!this.host.isEditingEnabled() || e.top === e.bottom && e.left === e.right) return !1;
    const t = Gt(this.host, e);
    if (t.length)
      return this.host.emit("permission-denied", { reason: "merge", cells: t, message: `合并区域内有 ${t.length} 个只读格,已拒绝` }), !1;
    this.ensureBaseline();
    const n = this.exec({ kind: "merge-cells", range: e }, "api");
    return n && (this.pushUndo(n), this.markDirty()), !!n;
  }
  /** 拆分:移除与区域相交的所有合并。
   *  Phase A 补漏 (2026-06-08): 区域内任一格只读 → 拒绝整次拆分 + emit permission-denied. */
  unmergeCells(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = Gt(this.host, e);
    if (t.length)
      return this.host.emit("permission-denied", { reason: "unmerge", cells: t, message: `拆分区域内有 ${t.length} 个只读格,已拒绝` }), !1;
    this.ensureBaseline();
    const n = this.exec({ kind: "unmerge-cells", range: e }, "api");
    return n && (this.pushUndo(n), this.markDirty()), !!n;
  }
  // ---- 图片编辑(浮动/嵌入;E6) ----
  /** 读当前表全部图片锚点(克隆,防外部改)。 */
  getImages() {
    const e = this.host.getSheet();
    return e ? e.images.map(se) : [];
  }
  /** 加一张图,返回插入索引(失败 -1)。 */
  addImage(e) {
    if (!this.host.isEditingEnabled()) return -1;
    this.ensureBaseline();
    const t = this.exec({ kind: "image-add", anchor: e }, "api");
    return t && t.kind === "image-remove" ? (this.pushUndo(t), this.markDirty(), t.index) : -1;
  }
  /** 删一张图。 */
  removeImage(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getSheet();
    if (!t || !t.images[e]) return !1;
    this.ensureBaseline();
    const n = this.exec({ kind: "image-remove", index: e }, "api");
    return n && (this.pushUndo(n), this.markDirty()), !!n;
  }
  /**
   * 补登一次图片移动/缩放(拖拽/programmatic:模型已被 setImageRect 改完,这里只补 undo + 发 image-change)。
   * baseline 须在变更前由调用方 ensureBaseline() 捕获。
   */
  recordImageEdit(e, t, n) {
    this.pushUndo({ kind: "image-set", index: e, anchor: t }), this.markDirty(), this.host.emit("image-change", { index: e, before: t, after: n, source: "ui" });
  }
  // ---- WPS 内嵌图 ⇄ 浮动图互转(第二期) ----
  /**
   * 浮动图 → 单元格内嵌图(DISPIMG):把第 imageIndex 张浮动图塞进 (row,col) 格。
   * 图缺字节不可转 → 返 false。入命令栈(undo 走整簿快照还原)。
   */
  convertImageToCell(e, t, n) {
    if (!this.host.isEditingEnabled()) return !1;
    if (!this.host.isEditable(t, n))
      return this.host.emit("permission-denied", { reason: "image-convert", cells: [{ row: t, col: n }], message: "目标格只读,无法嵌入图片" }), !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "convert-to-cell", imageIndex: e, row: t, col: n }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  /**
   * 批量把多张浮动图嵌入各自的目标格(整表/整列);一次进撤销栈。返回成功嵌入的张数。
   * targets 的 imageIndex 是调用前的浮动图索引(内部按降序 splice,索引互不干扰)。
   * Phase A 补漏: 过滤掉目标格只读的 targets, denied 一次性 emit.
   */
  convertImagesToCells(e) {
    var a, c, d;
    if (!this.host.isEditingEnabled() || !e.length) return 0;
    const t = [], n = [];
    for (const h of e)
      this.host.isEditable(h.row, h.col) ? n.push(h) : t.push({ row: h.row, col: h.col });
    if (t.length && this.host.emit("permission-denied", { reason: "image-convert", cells: t, message: `${t.length} 个目标格只读,已跳过` }), !n.length) return 0;
    const s = this.host.getSheet(), i = (a = s == null ? void 0 : s.images.length) != null ? a : 0;
    this.ensureBaseline();
    const r = this.exec({ kind: "convert-to-cells", targets: n }, "api");
    r && (this.pushUndo(r), this.markDirty());
    const l = (d = (c = this.host.getSheet()) == null ? void 0 : c.images.length) != null ? d : i;
    return Math.max(0, i - l);
  }
  /**
   * 单元格内嵌图 → 浮动图:把 (row,col) 的 DISPIMG 拎出来变成浮动图(默认 96×96px)。
   * 非内嵌图格 → 返 false。入命令栈。
   * Phase A 补漏: 源格只读 → 拒绝 (拎出来意味着该格内容变了,属于修改).
   */
  convertCellImageToFloat(e, t, n) {
    if (!this.host.isEditingEnabled()) return !1;
    if (!this.host.isEditable(e, t))
      return this.host.emit("permission-denied", { reason: "image-convert", cells: [{ row: e, col: t }], message: "源格只读,无法转浮动图" }), !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "convert-to-float", row: e, col: t, size: n }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  /**
   * 批量把多格 DISPIMG 拎成浮动图(选区批量反向);非内嵌图格自动跳过;一次进撤销栈。
   * 返回成功转换的张数。
   * Phase A 补漏: 过滤掉源格只读的, denied 一次性 emit.
   */
  convertCellImagesToFloats(e) {
    var a, c, d;
    if (!this.host.isEditingEnabled() || !e.length) return 0;
    const t = [], n = [];
    for (const h of e)
      this.host.isEditable(h.row, h.col) ? n.push(h) : t.push({ row: h.row, col: h.col });
    if (t.length && this.host.emit("permission-denied", { reason: "image-convert", cells: t, message: `${t.length} 个源格只读,已跳过` }), !n.length) return 0;
    const s = this.host.getSheet(), i = (a = s == null ? void 0 : s.images.length) != null ? a : 0;
    this.ensureBaseline();
    const r = this.exec({ kind: "convert-to-floats", cells: n }, "api");
    r && (this.pushUndo(r), this.markDirty());
    const l = (d = (c = this.host.getSheet()) == null ? void 0 : c.images.length) != null ? d : i;
    return Math.max(0, l - i);
  }
  // ---- 维度编辑(列宽/行高;E3.5:resize 入命令栈) ----
  /** 程序化设列宽/行高(API 路径:apply-via-command)。返回是否生效。 */
  setDimension(e, t, n) {
    if (!this.host.isEditingEnabled()) return !1;
    this.ensureBaseline();
    const s = this.exec({ kind: "set-dim", axis: e, index: t, size: n }, "api");
    return s && (this.pushUndo(s), this.markDirty()), !!s;
  }
  /**
   * 批量设维度尺寸 (Phase B, 2026-06-08). target 接 number | number[] | {from,to}.
   * 多 index 时聚合成单次 restore-wb undo (跟 convertImagesToCells 范式一致).
   * strictDimensions=true + 白名单未覆盖某 index → skip 那个 + 累计 deniedDims; 整次结束 emit 一次 permission-denied.
   * 返回成功条数 (0 = 全 skip / editable=false).
   */
  setDimensions(e, t, n, s) {
    var h, f;
    if (!this.host.isEditingEnabled() || !t.length) return 0;
    const i = this.host.getSheet(), r = this.host.getWorkbook();
    if (!i || !r) return 0;
    const l = [], a = [];
    for (const u of t)
      u < 0 || (s(u) ? l.push(u) : a.push(u));
    if (a.length && this.host.emit("permission-denied", { reason: "dimension", cells: [], dims: { axis: e, indices: a }, message: `${a.length} 个 ${e} 未覆盖白名单,已跳过` }), !l.length) return 0;
    if (l.length === 1)
      return this.setDimension(e, l[0], n) ? 1 : 0;
    this.ensureBaseline();
    const c = ee(r);
    let d = 0;
    for (const u of l) {
      const p = Kt(i, e, u);
      if (e === "col") {
        const g = i.columns.get(u);
        i.columns.set(u, { width: n, hidden: (h = g == null ? void 0 : g.hidden) != null ? h : !1 });
      } else {
        const g = i.rows.get(u);
        i.rows.set(u, { height: n, hidden: (f = g == null ? void 0 : g.hidden) != null ? f : !1 });
      }
      d++, this.host.emit("dim-change", { axis: e, index: u, before: p, after: n, source: "api" });
    }
    return this.pushUndo({ kind: "restore-wb", snapshot: c }), this.markDirty(), this.host.onModelChange(), d;
  }
  /**
   * 重置某些列宽/行高到默认 (Phase B, 2026-06-08) — 移除 columns/rows Map 条目, 渲染回落 defaultColWidth/Height.
   * 多 index 时单次 restore-wb undo.
   */
  resetDimensions(e, t, n) {
    if (!this.host.isEditingEnabled() || !t.length) return 0;
    const s = this.host.getSheet(), i = this.host.getWorkbook();
    if (!s || !i) return 0;
    const r = [], l = [];
    for (const h of t)
      h < 0 || (n(h) ? r.push(h) : l.push(h));
    if (l.length && this.host.emit("permission-denied", { reason: "dimension", cells: [], dims: { axis: e, indices: l }, message: `${l.length} 个 ${e} 未覆盖白名单,已跳过 reset` }), !r.length) return 0;
    this.ensureBaseline();
    const a = ee(i);
    let c = 0;
    const d = e === "col" ? s.defaultColWidth : s.defaultRowHeight;
    for (const h of r) {
      const f = Kt(s, e, h);
      e === "col" ? s.columns.delete(h) : s.rows.delete(h), c++, f !== d && this.host.emit("dim-change", { axis: e, index: h, before: f, after: d, source: "api" });
    }
    return this.pushUndo({ kind: "restore-wb", snapshot: a }), this.markDirty(), this.host.onModelChange(), c;
  }
  /**
   * 补登一次维度变更(拖拽/autofit 路径:模型已被 renderer 改完,这里只补 undo 项 + 发事件)。
   * baseline 须在变更前(拖拽起始/autofit 前)由调用方 ensureBaseline() 捕获。
   */
  recordDimEdit(e, t, n, s, i) {
    s !== i && (this.pushUndo({ kind: "restore-dim", axis: e, index: t, info: n }), this.markDirty(), this.host.emit("dim-change", { axis: e, index: t, before: s, after: i, source: "ui" }));
  }
  // ---- 脏状态 + 原件还原(E3.5) ----
  /** editable 时懒捕获 baseline(首次编辑/resize 前调,模型仍原始);幂等。 */
  ensureBaseline() {
    if (!this.host.isEditingEnabled()) return;
    const e = this.host.getWorkbook();
    !e || this.baselineFor === e || (this.baseline = ee(e), this.baselineFor = e);
  }
  /**
   * 是否有未保存修改(WPS `*`):当前会话有可撤销编辑,**或**切表前已累积编辑。
   * **彻底撤回(undo 栈清空且无跨会话脏)→ 视为未改动**(同 WPS)。
   */
  isDirty() {
    return this.undoStack.length > 0 || this.priorSessionDirty;
  }
  /** 按真值现算脏态,仅在翻转时发 dirty-change(去重)。 */
  syncDirty() {
    const e = this.isDirty();
    e !== this.dirty && (this.dirty = e, this.host.emit("dirty-change", { dirty: e }));
  }
  markDirty() {
    this.syncDirty();
  }
  /** 换新工作簿(非切表)时:作废 baseline + 命令栈 + 清脏(新簿旧历史无意义;切表保留见 controller 判定)。 */
  resetDirtyBaseline() {
    this.baseline = null, this.baselineFor = null, this.priorSessionDirty = !1, this.undoStack = [], this.redoStack = [], this.syncDirty();
  }
  /** 放弃全部修改,还原到刚加载的原件。返回是否还原(无 baseline → false)。 */
  resetToOriginal() {
    const e = this.host.getWorkbook();
    return !e || !this.baseline ? !1 : (gi(e, this.baseline), this.undoStack = [], this.redoStack = [], this.priorSessionDirty = !1, this.editing = null, this.host.onModelChange(), this.syncDirty(), !0);
  }
  undo() {
    const e = this.undoStack.pop();
    if (!e) return;
    const t = this.exec(e, "undo");
    t && this.redoStack.push(t), this.syncDirty();
  }
  redo() {
    const e = this.redoStack.pop();
    if (!e) return;
    const t = this.exec(e, "redo");
    t && this.undoStack.push(t), this.syncDirty();
  }
  // ---- 内部 ----
  collectEditable(e, t) {
    const n = [];
    for (let s = 0; s < t.length; s++)
      for (let i = 0; i < t[s].length; i++) {
        const r = e.top + s, l = e.left + i;
        this.host.isEditable(r, l) && n.push({ row: r, col: l, value: t[s][i] });
      }
    return n;
  }
  pushUndo(e) {
    this.undoStack.push(e), this.undoStack.length > this.limit && this.undoStack.shift(), this.redoStack = [];
  }
  /** 公开版 pushUndo (Phase B 2026-06-08): 给 controller 的批量 autoFit 用. 一般业务不要直调. */
  pushUndoExternal(e) {
    this.pushUndo(e);
  }
  /** 公开版 markDirty: 给 controller 的批量 autoFit 用. 一般业务不要直调. */
  markDirtyExternal() {
    this.markDirty();
  }
  /** 应用一条命令:建前快照 → apply → 重绘 → 发事件(cell 族 cell-change / dim 族 dim-change)。返回逆命令。 */
  exec(e, t) {
    var d;
    const n = this.host.getSheet();
    if (!n) return null;
    if (Sh(e)) {
      const h = Kt(n, e.axis, e.index), { inverse: f } = xt(n, e);
      this.host.onModelChange();
      const u = Kt(n, e.axis, e.index);
      return this.host.emit("dim-change", { axis: e.axis, index: e.index, before: h, after: u, source: t }), f;
    }
    if (Eh(e)) {
      const h = e.kind === "image-add" ? (d = e.index) != null ? d : n.images.length : e.index, f = e.kind === "image-add" ? null : n.images[e.index] ? se(n.images[e.index]) : null, { inverse: u } = xt(n, e), p = e.kind === "image-remove" ? null : n.images[h] ? se(n.images[h]) : null;
      return e.kind === "image-set" ? this.host.onModelChange() : this.host.rebuildOverlays(), this.host.emit("image-change", { index: h, before: f, after: p, source: t }), u;
    }
    if (e.kind === "convert-to-cell" || e.kind === "convert-to-cells" || e.kind === "convert-to-float" || e.kind === "convert-to-floats") {
      const h = this.host.getWorkbook();
      if (!h) return null;
      const f = this.host.getDate1904(), u = e.kind === "convert-to-cells" ? e.targets.map((m) => ({ row: m.row, col: m.col })) : e.kind === "convert-to-floats" ? e.cells.map((m) => ({ row: m.row, col: m.col })) : [{ row: e.row, col: e.col }], p = u.map((m) => he(n, m.row, m.col, f)), g = ee(h);
      let b = !1;
      if (e.kind === "convert-to-cell")
        b = ho(h, n, e.imageIndex, e.row, e.col) !== null;
      else if (e.kind === "convert-to-float")
        b = oi(h, n, e.row, e.col, e.size) !== -1;
      else if (e.kind === "convert-to-floats")
        for (const m of e.cells) oi(h, n, m.row, m.col, m.size) !== -1 && (b = !0);
      else {
        const m = [...e.targets].sort((y, w) => w.imageIndex - y.imageIndex);
        for (const y of m) ho(h, n, y.imageIndex, y.row, y.col) !== null && (b = !0);
      }
      return b ? (this.host.rebuildOverlays(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), u.forEach(
        (m, y) => this.host.emit("cell-change", { before: p[y], after: he(n, m.row, m.col, f), source: t })
      ), this.host.emit("image-change", { index: -1, before: null, after: null, source: t }), { kind: "restore-wb", snapshot: g }) : null;
    }
    if (Th(e)) {
      const h = this.host.getWorkbook();
      if (!h) return null;
      const f = this.host.getActiveSheetIndex();
      let u;
      if (e.kind === "struct-edit") {
        const g = ee(h);
        lh(h.sheets[f], e.op, e.at, e.count), Fh(h, f, e.op, e.at, e.count), u = { kind: "restore-wb", snapshot: g };
      } else {
        const g = ee(h);
        gi(h, e.snapshot), u = { kind: "restore-wb", snapshot: g };
      }
      this.host.onModelChange(), this.host.rebuildOverlays(), this.host.isRecalcEnabled() && this.refreshEngine();
      const p = e.kind === "struct-edit" ? { op: e.op, at: e.at, count: e.count, source: t } : { op: "restore", source: t };
      return this.host.emit("struct-change", p), u;
    }
    const s = this.host.getDate1904(), i = cl(e), r = i.map((h) => he(n, h.row, h.col, s)), { inverse: l } = xt(n, e);
    let a = [], c = [];
    if (e.kind !== "set-style" && this.engineReady() && this.calcMode === "auto") {
      const h = this.host.getWorkbook(), f = this.host.getActiveSheetIndex(), u = Lh(this.engine, h, f, i);
      a = Ph(u, f, i), c = a.map((p) => he(n, p.row, p.col, s)), Nh(h, u);
    }
    return this.host.onModelChange(), i.forEach((h, f) => {
      const u = he(n, h.row, h.col, s);
      this.host.emit("cell-change", { before: r[f], after: u, source: t });
    }), a.forEach((h, f) => {
      const u = he(n, h.row, h.col, s);
      this.host.emit("cell-change", { before: c[f], after: u, source: t });
    }), l;
  }
}
const Dh = ["#DIV/0!", "#N/A", "#NAME?", "#NULL!", "#NUM!", "#REF!", "#VALUE!", "#SPILL!"], pl = /^(\$?)([A-Za-z]{1,3})(\$?)(\d+)/, gl = /^(?:'((?:[^']|'')*)'|([A-Za-z_一-龥][A-Za-z0-9_.一-龥]*))!/;
function zh(o) {
  const e = [];
  let t = 0;
  const n = o, s = n.length;
  for (; t < s; ) {
    const i = n[t];
    if (i === " " || i === "	" || i === `
` || i === "\r") {
      t++;
      continue;
    }
    if (i === '"') {
      let f = t + 1, u = "";
      for (; f < s; ) {
        if (n[f] === '"') {
          if (n[f + 1] === '"') {
            u += '"', f += 2;
            continue;
          }
          break;
        }
        u += n[f], f++;
      }
      e.push({ k: "str", v: u }), t = f + 1;
      continue;
    }
    if (i === "#") {
      const f = Dh.find((u) => n.startsWith(u, t));
      if (f) {
        e.push({ k: "err", v: f }), t += f.length;
        continue;
      }
    }
    if (i === "(") {
      e.push({ k: "lparen" }), t++;
      continue;
    }
    if (i === ")") {
      e.push({ k: "rparen" }), t++;
      continue;
    }
    if (i === ",") {
      e.push({ k: "comma" }), t++;
      continue;
    }
    if (i === "<" && n[t + 1] === ">") {
      e.push({ k: "op", v: "<>" }), t += 2;
      continue;
    }
    if (i === "<" && n[t + 1] === "=") {
      e.push({ k: "op", v: "<=" }), t += 2;
      continue;
    }
    if (i === ">" && n[t + 1] === "=") {
      e.push({ k: "op", v: ">=" }), t += 2;
      continue;
    }
    if ("+-*/^&=<>%:".includes(i)) {
      e.push({ k: "op", v: i }), t++;
      continue;
    }
    if (/[0-9]/.test(i) || i === "." && /[0-9]/.test(n[t + 1] || "")) {
      const f = /^[0-9]*\.?[0-9]+(?:[eE][+-]?[0-9]+)?/.exec(n.slice(t));
      e.push({ k: "num", v: parseFloat(f[0]) }), t += f[0].length;
      continue;
    }
    const r = n.slice(t), l = gl.exec(r);
    let a = "", c = 0;
    l && (a = r.slice(0, l[0].length), c = l[0].length);
    const d = pl.exec(r.slice(c));
    if (d && !/[A-Za-z0-9_]/.test(r[c + d[0].length] || "")) {
      e.push({ k: "ref", v: a + d[0] }), t += c + d[0].length;
      continue;
    }
    const h = /^[A-Za-z_一-龥][A-Za-z0-9_.一-龥]*/.exec(r);
    if (h) {
      e.push({ k: "name", v: h[0] }), t += h[0].length;
      continue;
    }
    throw new Error("formula: unexpected char " + i);
  }
  return e;
}
function Ci(o) {
  let e = null, t = o;
  const n = gl.exec(o);
  n && (e = n[1] != null ? n[1].replace(/''/g, "'") : n[2], t = o.slice(n[0].length));
  const s = pl.exec(t), i = s[1] === "$", r = Bh(s[2].toUpperCase()), l = s[3] === "$", a = parseInt(s[4], 10) - 1;
  return { t: "ref", sheet: e, row: a, col: r, absRow: l, absCol: i };
}
function Bh(o) {
  let e = 0;
  for (let t = 0; t < o.length; t++) e = e * 26 + (o.charCodeAt(t) - 64);
  return e - 1;
}
class Wh {
  constructor(e) {
    C(this, "p", 0);
    this.toks = e;
  }
  peek() {
    return this.toks[this.p];
  }
  next() {
    return this.toks[this.p++];
  }
  eat(e) {
    const t = this.next();
    if (!t || t.k !== e) throw new Error("formula: expected " + e);
    return t;
  }
  parse() {
    const e = this.parseCompare();
    if (this.p < this.toks.length) throw new Error("formula: trailing tokens");
    return e;
  }
  isOp(...e) {
    const t = this.peek();
    return !!t && t.k === "op" && e.includes(t.v);
  }
  parseCompare() {
    let e = this.parseConcat();
    for (; this.isOp("=", "<>", "<", ">", "<=", ">="); )
      e = { t: "bin", op: this.next().v, l: e, r: this.parseConcat() };
    return e;
  }
  parseConcat() {
    let e = this.parseAdd();
    for (; this.isOp("&"); )
      this.next(), e = { t: "bin", op: "&", l: e, r: this.parseAdd() };
    return e;
  }
  parseAdd() {
    let e = this.parseMul();
    for (; this.isOp("+", "-"); )
      e = { t: "bin", op: this.next().v, l: e, r: this.parseMul() };
    return e;
  }
  parseMul() {
    let e = this.parsePow();
    for (; this.isOp("*", "/"); )
      e = { t: "bin", op: this.next().v, l: e, r: this.parsePow() };
    return e;
  }
  parsePow() {
    const e = this.parseUnary();
    return this.isOp("^") ? (this.next(), { t: "bin", op: "^", l: e, r: this.parsePow() }) : e;
  }
  parseUnary() {
    return this.isOp("-", "+") ? { t: "unary", op: this.next().v, x: this.parseUnary() } : this.parsePostfix();
  }
  parsePostfix() {
    let e = this.parsePrimary();
    for (; this.isOp("%"); )
      this.next(), e = { t: "unary", op: "%", x: e };
    return e;
  }
  parsePrimary() {
    var t;
    const e = this.next();
    if (!e) throw new Error("formula: unexpected end");
    if (e.k === "num") return { t: "num", v: e.v };
    if (e.k === "str") return { t: "str", v: e.v };
    if (e.k === "err") return { t: "err", v: e.v };
    if (e.k === "lparen") {
      const n = this.parseCompare();
      return this.eat("rparen"), n;
    }
    if (e.k === "ref") {
      const n = Ci(e.v);
      if (this.isOp(":")) {
        this.next();
        const s = this.eat("ref");
        return { t: "range", a: n, b: Ci(s.v) };
      }
      return n;
    }
    if (e.k === "name") {
      const n = e.v.toUpperCase();
      if (((t = this.peek()) == null ? void 0 : t.k) === "lparen") {
        this.next();
        const s = this.parseArgs();
        return this.eat("rparen"), { t: "func", name: n, args: s };
      }
      return n === "TRUE" ? { t: "bool", v: !0 } : n === "FALSE" ? { t: "bool", v: !1 } : { t: "err", v: "#NAME?" };
    }
    throw new Error("formula: unexpected token");
  }
  parseArgs() {
    var t, n;
    const e = [];
    if (((t = this.peek()) == null ? void 0 : t.k) === "rparen") return e;
    for (e.push(this.parseCompare()); ((n = this.peek()) == null ? void 0 : n.k) === "comma"; )
      this.next(), e.push(this.parseCompare());
    return e;
  }
}
function ml(o) {
  const e = o[0] === "=" ? o.slice(1) : o;
  return new Wh(zh(e)).parse();
}
class ke {
  constructor(e) {
    this.code = e;
  }
}
const _ = {
  div0: () => new ke("#DIV/0!"),
  na: () => new ke("#N/A"),
  name: () => new ke("#NAME?"),
  num: () => new ke("#NUM!"),
  ref: () => new ke("#REF!"),
  value: () => new ke("#VALUE!")
};
function P(o) {
  return o instanceof ke;
}
function as(o) {
  return !!o && typeof o == "object" && o.__m === !0;
}
function Y(o) {
  if (as(o)) {
    const e = o.rows;
    return e.length && e[0].length ? e[0][0] : _.value();
  }
  return o;
}
function Ee(o) {
  if (as(o)) {
    const e = [];
    for (const t of o.rows) for (const n of t) e.push(n);
    return e;
  }
  return [o];
}
function Cn(o) {
  if (P(o) || typeof o == "number") return o;
  if (typeof o == "boolean") return o ? 1 : 0;
  if (o == null) return 0;
  const e = o.trim();
  if (e === "") return 0;
  const t = Number(e);
  return isNaN(t) ? _.value() : t;
}
function Sn(o) {
  return P(o) ? o : o == null ? "" : typeof o == "boolean" ? o ? "TRUE" : "FALSE" : typeof o == "number" ? Uh(o) : o;
}
function Je(o) {
  if (P(o) || typeof o == "boolean") return o;
  if (typeof o == "number") return o !== 0;
  if (o == null) return !1;
  const e = o.trim().toUpperCase();
  return e === "TRUE" ? !0 : e === "FALSE" || e === "" ? !1 : _.value();
}
function Uh(o) {
  return isFinite(o) ? Number.isInteger(o) ? String(o) : String(Number(o.toPrecision(15))) : "#NUM!";
}
function je(o) {
  const e = [];
  for (const t of o) for (const n of Ee(t)) {
    if (P(n)) return n;
    typeof n == "number" && e.push(n);
  }
  return e;
}
function W(o) {
  return Cn(Y(o));
}
function ie(o) {
  return Sn(Y(o));
}
function bl(o) {
  const e = W(o);
  return P(e) ? e : Math.trunc(e);
}
const qh = (o) => {
  const e = je(o);
  return P(e) ? e : e.reduce((t, n) => t + n, 0);
}, _h = (o) => {
  const e = je(o);
  return P(e) ? e : e.reduce((t, n) => t * n, 1);
}, jh = (o) => {
  const e = je(o);
  return P(e) ? e : e.length ? e.reduce((t, n) => t + n, 0) / e.length : _.div0();
}, Vh = (o) => {
  const e = je(o);
  return P(e) ? e : e.length ? Math.max(...e) : 0;
}, Yh = (o) => {
  const e = je(o);
  return P(e) ? e : e.length ? Math.min(...e) : 0;
}, Xh = (o) => je(o) instanceof ke ? je(o) : je(o).length, Gh = (o) => {
  let e = 0;
  for (const t of o) for (const n of Ee(t)) n !== null && n !== "" && e++;
  return e;
}, Kh = (o) => {
  let e = 0;
  for (const t of o) for (const n of Ee(t)) (n === null || n === "") && e++;
  return e;
}, Jt = (o) => (e) => {
  const t = W(e[0]);
  if (P(t)) return t;
  const n = e[1] != null ? W(e[1]) : 0;
  if (P(n)) return n;
  const s = Math.pow(10, n);
  return o(t * s) / s;
}, Jh = (o) => {
  const e = W(o[0]);
  return P(e) ? e : Math.abs(e);
}, Zh = (o) => {
  const e = W(o[0]);
  return P(e) ? e : Math.floor(e);
}, Qh = (o) => {
  const e = W(o[0]), t = W(o[1]);
  return P(e) ? e : P(t) ? t : t === 0 ? _.div0() : e - Math.floor(e / t) * t;
}, ef = (o) => {
  const e = W(o[0]);
  return P(e) ? e : e < 0 ? _.num() : Math.sqrt(e);
}, tf = (o) => {
  const e = W(o[0]), t = W(o[1]);
  return P(e) ? e : P(t) ? t : Math.pow(e, t);
}, nf = (o) => {
  const e = W(o[0]);
  return P(e) ? e : Math.sign(e);
}, of = (o) => {
  const e = W(o[0]);
  if (P(e)) return e;
  const t = o[1] != null ? W(o[1]) : 1;
  return P(t) ? t : t === 0 ? 0 : Math.ceil(e / t) * t;
}, sf = (o) => {
  const e = W(o[0]);
  if (P(e)) return e;
  const t = o[1] != null ? W(o[1]) : 1;
  return P(t) ? t : t === 0 ? _.div0() : Math.floor(e / t) * t;
}, rf = (o) => {
  var s, i;
  const e = o.map((r) => Ee(r).map((l) => typeof l == "number" || P(l) ? l : 0)), t = (i = (s = e[0]) == null ? void 0 : s.length) != null ? i : 0;
  let n = 0;
  for (let r = 0; r < t; r++) {
    let l = 1;
    for (const a of e) {
      const c = a[r];
      if (P(c)) return c;
      l *= c;
    }
    n += l;
  }
  return n;
}, lf = (o) => {
  var t, n;
  const e = Je(Y(o[0]));
  return P(e) ? e : Y(e ? (t = o[1]) != null ? t : !1 : (n = o[2]) != null ? n : !1);
}, af = (o) => {
  var t;
  const e = Y(o[0]);
  return P(e) ? Y((t = o[1]) != null ? t : "") : e;
}, cf = (o) => {
  var t;
  const e = Y(o[0]);
  return P(e) && e.code === "#N/A" ? Y((t = o[1]) != null ? t : "") : e;
}, df = (o) => {
  let e = !0;
  for (const t of o) for (const n of Ee(t)) {
    if (P(n)) return n;
    if (n == null) continue;
    const s = Je(n);
    if (P(s)) return s;
    e = e && s;
  }
  return e;
}, hf = (o) => {
  let e = !1;
  for (const t of o) for (const n of Ee(t)) {
    if (P(n)) return n;
    if (n == null) continue;
    const s = Je(n);
    if (P(s)) return s;
    e = e || s;
  }
  return e;
}, ff = (o) => {
  const e = Je(Y(o[0]));
  return P(e) ? e : !e;
}, uf = (o) => {
  let e = 0;
  for (const t of o) for (const n of Ee(t)) {
    if (P(n)) return n;
    if (n == null) continue;
    const s = Je(n);
    if (P(s)) return s;
    s && e++;
  }
  return e % 2 === 1;
}, pf = (o) => {
  for (let e = 0; e + 1 < o.length; e += 2) {
    const t = Je(Y(o[e]));
    if (P(t)) return t;
    if (t) return Y(o[e + 1]);
  }
  return _.na();
}, Si = (o) => {
  let e = "";
  for (const t of o) for (const n of Ee(t)) {
    const s = Sn(n);
    if (P(s)) return s;
    e += s;
  }
  return e;
}, gf = (o) => {
  const e = ie(o[0]);
  return P(e) ? e : e.length;
}, mf = (o) => {
  const e = ie(o[0]);
  if (P(e)) return e;
  const t = o[1] != null ? W(o[1]) : 1;
  return P(t) ? t : e.slice(0, Math.max(0, t));
}, bf = (o) => {
  const e = ie(o[0]);
  if (P(e)) return e;
  const t = o[1] != null ? W(o[1]) : 1;
  return P(t) ? t : t <= 0 ? "" : e.slice(-t);
}, yf = (o) => {
  const e = ie(o[0]);
  if (P(e)) return e;
  const t = W(o[1]), n = W(o[2]);
  return P(t) ? t : P(n) ? n : e.substr(Math.max(0, t - 1), Math.max(0, n));
}, xf = (o) => {
  const e = ie(o[0]);
  return P(e) ? e : e.toLowerCase();
}, wf = (o) => {
  const e = ie(o[0]);
  return P(e) ? e : e.toUpperCase();
}, vf = (o) => {
  const e = ie(o[0]);
  return P(e) ? e : e.replace(/\s+/g, " ").trim();
}, kf = (o) => {
  const e = ie(o[0]);
  return P(e) ? e : e.replace(/\b\w/g, (t) => t.toUpperCase()).replace(/\B\w/g, (t) => t.toLowerCase());
}, Cf = (o) => {
  const e = ie(o[0]);
  if (P(e)) return e;
  const t = W(o[1]);
  return P(t) ? t : t <= 0 ? "" : e.repeat(Math.floor(t));
}, Sf = (o) => {
  const e = ie(o[0]), t = ie(o[1]);
  return P(e) ? e : P(t) ? t : e === t;
}, Ef = (o) => {
  const e = ie(o[0]), t = ie(o[1]), n = ie(o[2]);
  return P(e) ? e : P(t) ? t : P(n) ? n : t === "" ? e : e.split(t).join(n);
}, Tf = (o) => {
  const e = ie(o[0]), t = ie(o[1]);
  if (P(e)) return e;
  if (P(t)) return t;
  const n = o[2] != null ? W(o[2]) : 1;
  if (P(n)) return n;
  const s = t.indexOf(e, n - 1);
  return s < 0 ? _.value() : s + 1;
}, $f = (o) => {
  const e = ie(o[0]), t = ie(o[1]);
  if (P(e)) return e;
  if (P(t)) return t;
  const n = o[2] != null ? W(o[2]) : 1;
  if (P(n)) return n;
  const s = t.toLowerCase().indexOf(e.toLowerCase(), n - 1);
  return s < 0 ? _.value() : s + 1;
}, Mf = (o) => W(o[0]), If = (o) => {
  const e = ie(o[0]);
  return P(e), e;
}, Af = (o) => typeof Y(o[0]) == "number", Rf = (o) => typeof Y(o[0]) == "string", Ff = (o) => Y(o[0]) === null, Lf = (o) => typeof Y(o[0]) == "boolean", Nf = (o) => P(Y(o[0])), Pf = (o) => {
  const e = Y(o[0]);
  return P(e) && e.code === "#N/A";
}, Of = (o) => {
  const e = bl(o[0]);
  return P(e) ? e : e % 2 === 0;
}, Hf = (o) => {
  const e = bl(o[0]);
  return P(e) ? e : Math.abs(e % 2) === 1;
}, Df = () => _.na();
function Wt(o) {
  return as(o) ? o.rows : [[o]];
}
const Ln = (o, e) => typeof o == "number" && typeof e == "number" ? o === e : String(o != null ? o : "").toLowerCase() === String(e != null ? e : "").toLowerCase(), zf = (o) => {
  const e = Y(o[0]);
  if (P(e)) return e;
  const t = Wt(o[1]), n = W(o[2]);
  if (P(n)) return n;
  const s = o[3] != null ? Je(Y(o[3])) : !0;
  if (P(s)) return s;
  if (!s) {
    for (const l of t) if (Ln(e, l[0])) {
      const a = l[n - 1];
      return a === void 0 ? _.ref() : a;
    }
    return _.na();
  }
  let i = null;
  for (const l of t) {
    const a = l[0];
    (typeof e == "number" && typeof a == "number" && a <= e || typeof e != "number" && String(a != null ? a : "") <= String(e != null ? e : "")) && (i = l);
  }
  if (!i) return _.na();
  const r = i[n - 1];
  return r === void 0 ? _.ref() : r;
}, Bf = (o) => {
  var i, r;
  const e = Y(o[0]);
  if (P(e)) return e;
  const t = Wt(o[1]), n = W(o[2]);
  if (P(n)) return n;
  const s = (i = t[0]) != null ? i : [];
  for (let l = 0; l < s.length; l++) if (Ln(e, s[l])) {
    const a = (r = t[n - 1]) == null ? void 0 : r[l];
    return a === void 0 ? _.ref() : a;
  }
  return _.na();
}, Wf = (o) => {
  var i, r, l, a;
  const e = Wt(o[0]), t = o[1] != null ? W(o[1]) : 0;
  if (P(t)) return t;
  const n = o[2] != null ? W(o[2]) : 0;
  if (P(n)) return n;
  if (t === 0 && e.length === 1) {
    const c = e[0][n - 1];
    return c === void 0 ? _.ref() : c;
  }
  if (n === 0 && ((r = (i = e[0]) == null ? void 0 : i.length) != null ? r : 0) === 1) {
    const c = (l = e[t - 1]) == null ? void 0 : l[0];
    return c === void 0 ? _.ref() : c;
  }
  const s = (a = e[t - 1]) == null ? void 0 : a[n - 1];
  return s === void 0 ? _.ref() : s;
}, Uf = (o) => {
  const e = Y(o[0]);
  if (P(e)) return e;
  const t = Ee(o[1]), n = o[2] != null ? W(o[2]) : 1;
  if (P(n)) return n;
  if (n === 0) {
    for (let i = 0; i < t.length; i++) if (Ln(e, t[i])) return i + 1;
    return _.na();
  }
  let s = -1;
  for (let i = 0; i < t.length; i++) {
    const r = t[i];
    typeof r != "number" || typeof e != "number" || (n === 1 ? r <= e : r >= e) && (s = i);
  }
  return s < 0 ? _.na() : s + 1;
}, qf = (o) => {
  const e = W(o[0]);
  if (P(e)) return e;
  const t = o[e];
  return t === void 0 ? _.value() : Y(t);
}, _f = (o) => Wt(o[0]).length, jf = (o) => {
  var e, t;
  return (t = (e = Wt(o[0])[0]) == null ? void 0 : e.length) != null ? t : 0;
};
function Vf(o) {
  if (typeof o == "string") {
    const e = /^(<=|>=|<>|<|>|=)(.*)$/.exec(o);
    if (e) {
      const t = e[1], n = e[2], s = Number(n), i = n.trim() !== "" && !isNaN(s);
      return (r) => {
        if (i && typeof r == "number")
          switch (t) {
            case "<":
              return r < s;
            case ">":
              return r > s;
            case "<=":
              return r <= s;
            case ">=":
              return r >= s;
            case "<>":
              return r !== s;
            default:
              return r === s;
          }
        const l = String(r != null ? r : "").toLowerCase(), a = n.toLowerCase();
        return t === "<>" ? l !== a : t === "=" ? l === a : !1;
      };
    }
  }
  return (e) => Ln(o, e);
}
function cs(o, e) {
  const t = Ee(o[0]), n = Vf(Y(o[1])), s = o[2] != null ? Ee(o[2]) : t;
  let i = 0, r = 0;
  for (let l = 0; l < t.length; l++) {
    if (P(t[l])) return t[l];
    if (!n(t[l])) continue;
    r++;
    const a = s[l];
    typeof a == "number" && (i += a);
  }
  return e === "count" ? r : e === "avg" ? r ? i / r : _.div0() : i;
}
const Yf = (o) => cs(o, "sum"), Xf = (o) => cs([o[0], o[1], o[0]], "count"), Gf = (o) => cs(o, "avg"), yl = Date.UTC(1899, 11, 30), xl = 864e5;
function wl(o, e, t) {
  return Math.round((Date.UTC(o, e - 1, t) - yl) / xl);
}
function Nn(o) {
  return new Date(yl + Math.round(o) * xl);
}
function vl() {
  const o = /* @__PURE__ */ new Date();
  return wl(o.getFullYear(), o.getMonth() + 1, o.getDate());
}
const Kf = () => vl(), Jf = () => {
  const o = /* @__PURE__ */ new Date();
  return vl() + (o.getHours() * 3600 + o.getMinutes() * 60 + o.getSeconds()) / 86400;
}, Zf = (o) => {
  const e = W(o[0]), t = W(o[1]), n = W(o[2]);
  return P(e) ? e : P(t) ? t : P(n) ? n : wl(e, t, n);
}, Qf = (o) => {
  const e = W(o[0]);
  return P(e) ? e : Nn(e).getUTCFullYear();
}, eu = (o) => {
  const e = W(o[0]);
  return P(e) ? e : Nn(e).getUTCMonth() + 1;
}, tu = (o) => {
  const e = W(o[0]);
  return P(e) ? e : Nn(e).getUTCDate();
}, nu = (o) => {
  const e = W(o[0]);
  return P(e) ? e : Nn(e).getUTCDay() + 1;
}, ou = (o) => {
  const e = W(o[0]), t = W(o[1]);
  return P(e) ? e : P(t) ? t : Math.round(e - t);
}, kl = {
  SUM: qh,
  PRODUCT: _h,
  AVERAGE: jh,
  MAX: Vh,
  MIN: Yh,
  COUNT: Xh,
  COUNTA: Gh,
  COUNTBLANK: Kh,
  ROUND: Jt(Math.round),
  ROUNDUP: Jt((o) => o >= 0 ? Math.ceil(o) : Math.floor(o)),
  ROUNDDOWN: Jt(Math.trunc),
  TRUNC: Jt(Math.trunc),
  ABS: Jh,
  INT: Zh,
  MOD: Qh,
  SQRT: ef,
  POWER: tf,
  SIGN: nf,
  CEILING: of,
  FLOOR: sf,
  SUMPRODUCT: rf,
  IF: lf,
  IFERROR: af,
  IFNA: cf,
  AND: df,
  OR: hf,
  NOT: ff,
  XOR: uf,
  IFS: pf,
  CONCAT: Si,
  CONCATENATE: Si,
  LEN: gf,
  LEFT: mf,
  RIGHT: bf,
  MID: yf,
  LOWER: xf,
  UPPER: wf,
  TRIM: vf,
  PROPER: kf,
  REPT: Cf,
  EXACT: Sf,
  SUBSTITUTE: Ef,
  FIND: Tf,
  SEARCH: $f,
  VALUE: Mf,
  TEXT: If,
  ISNUMBER: Af,
  ISTEXT: Rf,
  ISBLANK: Ff,
  ISLOGICAL: Lf,
  ISERROR: Nf,
  ISNA: Pf,
  ISEVEN: Of,
  ISODD: Hf,
  NA: Df,
  TRUE: () => !0,
  FALSE: () => !1,
  VLOOKUP: zf,
  HLOOKUP: Bf,
  INDEX: Wf,
  MATCH: Uf,
  CHOOSE: qf,
  ROWS: _f,
  COLUMNS: jf,
  SUMIF: Yf,
  COUNTIF: Xf,
  AVERAGEIF: Gf,
  TODAY: Kf,
  NOW: Jf,
  DATE: Zf,
  YEAR: Qf,
  MONTH: eu,
  DAY: tu,
  WEEKDAY: nu,
  DAYS: ou
}, Yo = Object.keys(kl).sort(), ds = {
  SUM: "SUM(数值1, 数值2, …)",
  AVERAGE: "AVERAGE(数值1, …)",
  COUNT: "COUNT(值1, …)",
  COUNTA: "COUNTA(值1, …)",
  MAX: "MAX(数值1, …)",
  MIN: "MIN(数值1, …)",
  PRODUCT: "PRODUCT(数值1, …)",
  SUMPRODUCT: "SUMPRODUCT(数组1, 数组2, …)",
  IF: "IF(条件, 真值, 假值)",
  IFERROR: "IFERROR(值, 出错时值)",
  IFNA: "IFNA(值, NA时值)",
  IFS: "IFS(条件1, 值1, …)",
  AND: "AND(逻辑1, …)",
  OR: "OR(逻辑1, …)",
  NOT: "NOT(逻辑)",
  ROUND: "ROUND(数值, 位数)",
  ROUNDUP: "ROUNDUP(数值, 位数)",
  ROUNDDOWN: "ROUNDDOWN(数值, 位数)",
  ABS: "ABS(数值)",
  INT: "INT(数值)",
  MOD: "MOD(数值, 除数)",
  SQRT: "SQRT(数值)",
  POWER: "POWER(底, 指数)",
  CEILING: "CEILING(数值, [基数])",
  FLOOR: "FLOOR(数值, [基数])",
  VLOOKUP: "VLOOKUP(查找值, 表区域, 列号, [精确])",
  HLOOKUP: "HLOOKUP(查找值, 表区域, 行号)",
  INDEX: "INDEX(区域, 行号, [列号])",
  MATCH: "MATCH(查找值, 区域, [类型])",
  CHOOSE: "CHOOSE(序号, 值1, …)",
  SUMIF: "SUMIF(区域, 条件, [求和区域])",
  COUNTIF: "COUNTIF(区域, 条件)",
  AVERAGEIF: "AVERAGEIF(区域, 条件, [平均区域])",
  LEFT: "LEFT(文本, [字数])",
  RIGHT: "RIGHT(文本, [字数])",
  MID: "MID(文本, 起始, 字数)",
  LEN: "LEN(文本)",
  CONCAT: "CONCAT(文本1, …)",
  CONCATENATE: "CONCATENATE(文本1, …)",
  UPPER: "UPPER(文本)",
  LOWER: "LOWER(文本)",
  TRIM: "TRIM(文本)",
  SUBSTITUTE: "SUBSTITUTE(文本, 旧, 新)",
  FIND: "FIND(子串, 文本, [起始])",
  SEARCH: "SEARCH(子串, 文本, [起始])",
  DATE: "DATE(年, 月, 日)",
  YEAR: "YEAR(序列值)",
  MONTH: "MONTH(序列值)",
  DAY: "DAY(序列值)",
  TODAY: "TODAY()",
  NOW: "NOW()",
  WEEKDAY: "WEEKDAY(序列值)",
  DAYS: "DAYS(结束, 开始)",
  ISNUMBER: "ISNUMBER(值)",
  ISTEXT: "ISTEXT(值)",
  ISBLANK: "ISBLANK(值)",
  ISERROR: "ISERROR(值)",
  ISNA: "ISNA(值)",
  // 补全其余(插入函数对话框逐参渲染用):
  SIGN: "SIGN(数值)",
  XOR: "XOR(逻辑1, …)",
  VALUE: "VALUE(文本)",
  PROPER: "PROPER(文本)",
  REPT: "REPT(文本, 次数)",
  EXACT: "EXACT(文本1, 文本2)",
  TEXT: "TEXT(值, 格式)",
  ISLOGICAL: "ISLOGICAL(值)",
  ISEVEN: "ISEVEN(数值)",
  ISODD: "ISODD(数值)",
  NA: "NA()",
  TRUE: "TRUE()",
  FALSE: "FALSE()",
  ROWS: "ROWS(数组)",
  COLUMNS: "COLUMNS(数组)",
  COUNTBLANK: "COUNTBLANK(区域)"
};
function ct(o, e) {
  switch (o.t) {
    case "num":
      return o.v;
    case "str":
      return o.v;
    case "bool":
      return o.v;
    case "err":
      return new ke(o.v);
    case "ref":
      return e.getCell(o.sheet, o.row, o.col);
    case "range": {
      const t = Math.min(o.a.row, o.b.row), n = Math.max(o.a.row, o.b.row), s = Math.min(o.a.col, o.b.col), i = Math.max(o.a.col, o.b.col), r = [];
      for (let l = t; l <= n; l++) {
        const a = [];
        for (let c = s; c <= i; c++) a.push(e.getCell(o.a.sheet, l, c));
        r.push(a);
      }
      return { __m: !0, rows: r };
    }
    case "unary": {
      const t = Cn(Y(ct(o.x, e)));
      return P(t) ? t : o.op === "%" ? t / 100 : o.op === "-" ? -t : t;
    }
    case "bin":
      return su(o.op, ct(o.l, e), ct(o.r, e));
    case "func": {
      const t = kl[o.name];
      if (!t) return _.name();
      const n = o.args.map((s) => ct(s, e));
      try {
        return t(n);
      } catch (s) {
        return _.value();
      }
    }
  }
}
function su(o, e, t) {
  const n = Y(e), s = Y(t);
  if (P(n)) return n;
  if (P(s)) return s;
  if (o === "&") {
    const l = Sn(n), a = Sn(s);
    return P(l) ? l : P(a) ? a : l + a;
  }
  if (o === "=" || o === "<>" || o === "<" || o === ">" || o === "<=" || o === ">=") return iu(o, n, s);
  const i = Cn(n), r = Cn(s);
  if (P(i)) return i;
  if (P(r)) return r;
  switch (o) {
    case "+":
      return i + r;
    case "-":
      return i - r;
    case "*":
      return i * r;
    case "/":
      return r === 0 ? _.div0() : i / r;
    case "^": {
      const l = Math.pow(i, r);
      return isNaN(l) ? _.num() : l;
    }
  }
}
function iu(o, e, t) {
  let n;
  if (typeof e == "number" && typeof t == "number") n = e === t ? 0 : e < t ? -1 : 1;
  else if (typeof e == "boolean" || typeof t == "boolean")
    n = (e === !0 ? 1 : 0) - (t === !0 ? 1 : 0);
  else {
    const s = String(e != null ? e : "").toLowerCase(), i = String(t != null ? t : "").toLowerCase();
    n = s === i ? 0 : s < i ? -1 : 1;
  }
  switch (o) {
    case "=":
      return n === 0;
    case "<>":
      return n !== 0;
    case "<":
      return n < 0;
    case ">":
      return n > 0;
    case "<=":
      return n <= 0;
    case ">=":
      return n >= 0;
    default:
      return !1;
  }
}
const ru = async () => new au(), vt = (o, e, t) => `${o}:${e}:${t}`, lu = 1e5;
class au {
  constructor() {
    C(this, "sheets", []);
    C(this, "nameToIndex", /* @__PURE__ */ new Map());
    C(this, "dependents", /* @__PURE__ */ new Map());
  }
  // 前驱格 key → 依赖它的公式格 key 集合
  setSheets(e) {
    this.sheets = [], this.nameToIndex.clear(), this.dependents.clear();
    for (let n = 0; n < e.sheets.length; n++) this.nameToIndex.set(e.sheets[n].name || `Sheet${n + 1}`, n);
    for (let n = 0; n < e.sheets.length; n++) {
      const s = e.sheets[n], i = /* @__PURE__ */ new Map();
      for (const r of s.cells.values()) {
        const l = cu(r);
        l != null && i.set(vt(n, r.row, r.col), this.makeCell(n, r.row, r.col, l, !1));
      }
      this.sheets.push({ name: e.sheets[n].name || `Sheet${n + 1}`, cells: i, rows: Math.max(s.dimension.rows, 1), cols: Math.max(s.dimension.cols, 1) });
    }
    const t = [];
    for (let n = 0; n < this.sheets.length; n++) for (const [s, i] of this.sheets[n].cells) i.ast !== void 0 && (this.addDeps(s, i.prec), t.push(s));
    this.recompute(t);
  }
  setCell(e, t, n, s) {
    var h, f, u, p, g, b, m;
    const i = this.sheets[e];
    if (!i) return [];
    const r = vt(e, t, n), l = i.cells.get(r);
    if (l != null && l.prec && this.removeDeps(r, l.prec), s == null || s === "")
      i.cells.delete(r);
    else {
      const y = this.makeCell(e, t, n, s, !0);
      i.cells.set(r, y), y.ast !== void 0 && this.addDeps(r, y.prec);
    }
    const a = this.closure(r), c = /* @__PURE__ */ new Map();
    for (const y of a) c.set(y, (f = (h = this.cellAt(y)) == null ? void 0 : h.value) != null ? f : null);
    this.recompute([...a]);
    const d = [];
    for (const y of a) {
      const w = (p = (u = this.cellAt(y)) == null ? void 0 : u.value) != null ? p : null;
      if (!fu((g = c.get(y)) != null ? g : null, w)) {
        const [v, x, S] = y.split(":").map(Number);
        d.push({ sheet: v, row: x, col: S, value: bo(w) });
      }
    }
    if (!a.has(r)) {
      const y = (m = (b = this.cellAt(r)) == null ? void 0 : b.value) != null ? m : null;
      d.push({ sheet: e, row: t, col: n, value: bo(y) });
    }
    return d;
  }
  getValue(e, t, n) {
    var s, i, r;
    return bo((r = (i = (s = this.sheets[e]) == null ? void 0 : s.cells.get(vt(e, t, n))) == null ? void 0 : i.value) != null ? r : null);
  }
  destroy() {
    this.sheets = [], this.nameToIndex.clear(), this.dependents.clear();
  }
  // ---------------- 内部 ----------------
  makeCell(e, t, n, s, i) {
    if (typeof s == "string" && s[0] === "=")
      try {
        const r = ml(s);
        return { formula: s, ast: r, value: null, prec: du(r, e, this.nameToIndex) };
      } catch (r) {
        return { formula: s, ast: null, value: _.name(), prec: [] };
      }
    return { value: s };
  }
  cellAt(e) {
    var n;
    const t = e.indexOf(":");
    return (n = this.sheets[Number(e.slice(0, t))]) == null ? void 0 : n.cells.get(e);
  }
  addDeps(e, t) {
    for (const n of t != null ? t : []) this.eachPrecCell(n, (s) => {
      let i = this.dependents.get(s);
      i || this.dependents.set(s, i = /* @__PURE__ */ new Set()), i.add(e);
    });
  }
  removeDeps(e, t) {
    for (const n of t) this.eachPrecCell(n, (s) => {
      var i;
      (i = this.dependents.get(s)) == null || i.delete(e);
    });
  }
  eachPrecCell(e, t) {
    let n = e.r1, s = e.c1;
    for (; (n - e.r0 + 1) * (s - e.c0 + 1) > lu && (n - e.r0 > s - e.c0 ? n-- : s--, !(n < e.r0 || s < e.c0)); )
      ;
    for (let i = e.r0; i <= n; i++) for (let r = e.c0; r <= s; r++) t(vt(e.sheet, i, r));
  }
  /** 传递闭包:start + 所有(直接/间接)依赖它的公式格。 */
  closure(e) {
    const t = /* @__PURE__ */ new Set([e]), n = [e];
    for (; n.length; ) {
      const s = n.pop(), i = this.dependents.get(s);
      if (i)
        for (const r of i) t.has(r) || (t.add(r), n.push(r));
    }
    return t;
  }
  /** 递归求值一组格(memo 保证拓扑序;computing 栈检测循环 → #REF!)。 */
  recompute(e) {
    const t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), s = (i) => {
      const r = this.cellAt(i);
      if (!r) return null;
      if (r.ast === void 0 || t.has(i)) return r.value;
      if (n.has(i)) return _.ref();
      if (r.ast === null)
        return t.add(i), r.value;
      n.add(i);
      const l = Number(i.slice(0, i.indexOf(":"))), a = {
        getCell: (d, h, f) => {
          var b;
          const u = d == null ? l : this.nameToIndex.get(d);
          if (u == null) return _.ref();
          const p = vt(u, h, f), g = (b = this.sheets[u]) == null ? void 0 : b.cells.get(p);
          return g ? g.ast !== void 0 && !t.has(p) ? s(p) : g.value : null;
        }
      }, c = hu(ct(r.ast, a));
      return n.delete(i), t.add(i), r.value = c, c;
    };
    for (const i of e) s(i);
  }
}
function cu(o) {
  if (o.type === "formula") {
    const t = o.formula;
    return t ? t[0] === "=" ? t : "=" + t : null;
  }
  const e = o.raw;
  return typeof e == "number" || typeof e == "boolean" || typeof e == "string" ? e : null;
}
function du(o, e, t) {
  const n = [], s = (i) => {
    switch (i.t) {
      case "ref": {
        const r = i.sheet == null ? e : t.get(i.sheet);
        r != null && n.push({ sheet: r, r0: i.row, c0: i.col, r1: i.row, c1: i.col });
        break;
      }
      case "range": {
        const r = i.a.sheet == null ? e : t.get(i.a.sheet);
        r != null && n.push({ sheet: r, r0: Math.min(i.a.row, i.b.row), c0: Math.min(i.a.col, i.b.col), r1: Math.max(i.a.row, i.b.row), c1: Math.max(i.a.col, i.b.col) });
        break;
      }
      case "unary":
        s(i.x);
        break;
      case "bin":
        s(i.l), s(i.r);
        break;
      case "func":
        i.args.forEach(s);
        break;
    }
  };
  return s(o), n;
}
function hu(o) {
  if (o && typeof o == "object" && "__m" in o) {
    const e = o.rows;
    return e.length && e[0].length ? e[0][0] : _.value();
  }
  return o;
}
function bo(o) {
  return P(o) ? o.code : o;
}
function fu(o, e) {
  return o instanceof ke && e instanceof ke ? o.code === e.code : o === e;
}
const uu = 864e5, pu = [
  ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
];
function Ei(o, e, t = !1) {
  if (e <= 0) return [];
  const n = o.length ? o : [null], s = () => Array.from({ length: e }, (l, a) => n[a % n.length]);
  if (n.every((l) => typeof l == "number")) {
    const l = n;
    if (!(l.length >= 2 !== t)) return s();
    const c = l.length >= 2 ? En(l) : 1, d = l[l.length - 1];
    return Array.from({ length: e }, (h, f) => d + c * (f + 1));
  }
  if (n.every((l) => l instanceof Date)) {
    if (t) return s();
    const l = n.map((d) => d.getTime()), a = l.length >= 2 ? En(l) : uu, c = l[l.length - 1];
    return Array.from({ length: e }, (d, h) => new Date(c + a * (h + 1)));
  }
  const i = mu(n);
  if (i) {
    if (t) return s();
    const { list: l, lastIdx: a, step: c } = i;
    return Array.from({ length: e }, (d, h) => l[gu(a + c * (h + 1), l.length)]);
  }
  const r = yu(n);
  if (r) {
    if (t) return s();
    const { prefix: l, suffix: a, lastNum: c, step: d, pad: h } = r;
    return Array.from({ length: e }, (f, u) => `${l}${xu(c + d * (u + 1), h)}${a}`);
  }
  return s();
}
function En(o) {
  let e = 0;
  for (let t = 1; t < o.length; t++) e += o[t] - o[t - 1];
  return e / (o.length - 1);
}
function gu(o, e) {
  return (o % e + e) % e;
}
function mu(o) {
  if (!o.every((t) => typeof t == "string")) return null;
  const e = o;
  for (const t of pu) {
    const n = e.map((i) => t.indexOf(i));
    if (n.some((i) => i < 0)) continue;
    const s = n.length >= 2 && Math.round(En(n.map((i) => bu(i, n[0], t.length)))) || 1;
    return { list: t, lastIdx: n[n.length - 1], step: s };
  }
  return null;
}
function bu(o, e, t) {
  return o < e ? o + t : o;
}
function yu(o) {
  if (!o.every((h) => typeof h == "string")) return null;
  const e = o, t = /^(.*?)(\d+)(\D*)$/, n = e.map((h) => t.exec(h));
  if (n.some((h) => !h)) return null;
  const s = n, i = s[s.length - 1][1], r = s[s.length - 1][3];
  if (!s.every((h) => h[1] === i && h[3] === r)) return null;
  const l = s.map((h) => parseInt(h[2], 10)), a = l.length >= 2 && Math.round(En(l)) || 1, c = s[s.length - 1][2], d = c.length > 1 && c[0] === "0" ? c.length : 0;
  return { prefix: i, suffix: r, lastNum: l[l.length - 1], step: a, pad: d };
}
function xu(o, e) {
  const t = String(Math.abs(o)), n = e > 0 ? t.padStart(e, "0") : t;
  return o < 0 ? "-" + n : n;
}
function wu(o, e, t) {
  const n = new Date(o.getTime());
  if (e === "day") n.setDate(n.getDate() + t);
  else if (e === "month") n.setMonth(n.getMonth() + t);
  else if (e === "year") n.setFullYear(n.getFullYear() + t);
  else {
    let s = Math.abs(t);
    const i = t < 0 ? -1 : 1;
    for (; s > 0; ) {
      n.setDate(n.getDate() + i);
      const r = n.getDay();
      r !== 0 && r !== 6 && s--;
    }
  }
  return n;
}
function Ti(o, e, t) {
  const n = [];
  if (t.type === "date") {
    let i = o instanceof Date ? new Date(o.getTime()) : /* @__PURE__ */ new Date();
    for (let r = 0; r < e; r++)
      i = wu(i, t.dateUnit || "day", t.step), n.push(new Date(i.getTime()));
    return n;
  }
  let s = typeof o == "number" ? o : 0;
  for (let i = 0; i < e && (s = t.type === "growth" ? s * t.step : s + t.step, !(t.stop != null && (t.step >= 0 && s > t.stop || t.step < 0 && s < t.stop))); i++)
    n.push(s);
  return n;
}
const vu = [" ", ",", "@", "/", "	", "-", "_", ".", ":", "|"], ku = 2;
function Cl(o, e) {
  return o.split(e).filter((t) => t.length > 0);
}
function Cu(o, e, t) {
  const n = [];
  for (let i = 0; i < o.length; i++) {
    const r = o[i];
    if (r) {
      e.startsWith(r, t) && n.push({ part: { kind: "full", col: i }, len: r.length, generality: 3 });
      for (const l of vu) {
        if (r.indexOf(l) < 0) continue;
        const a = Cl(r, l);
        for (let c = 0; c < a.length; c++)
          if (e.startsWith(a[c], t)) {
            const d = c === a.length - 1;
            n.push({ part: { kind: "token", col: i, index: d ? 0 : c, fromEnd: d, delim: l }, len: a[c].length, generality: 2 });
          }
      }
      for (let l = 0; l < r.length; l++) {
        let a = 0;
        for (; l + a < r.length && t + a < e.length && r[l + a] === e[t + a]; ) a++;
        a >= ku && n.push({ part: { kind: "substr", col: i, start: l, len: a }, len: a, generality: 1 });
      }
    }
  }
  let s;
  for (const i of n) (!s || i.len > s.len || i.len === s.len && i.generality > s.generality) && (s = i);
  return s ? { part: s.part, len: s.len } : null;
}
function $i(o, e) {
  if (!e) return null;
  const t = [], n = (i) => {
    const r = t[t.length - 1];
    r && r.kind === "lit" ? r.text += i : t.push({ kind: "lit", text: i });
  };
  let s = 0;
  for (; s < e.length; ) {
    const i = Cu(o, e, s);
    i ? (t.push(i.part), s += i.len) : (n(e[s]), s += 1);
  }
  return { parts: t };
}
function Mi(o, e) {
  let t = "";
  for (const n of o.parts) {
    if (n.kind === "lit") {
      t += n.text;
      continue;
    }
    const s = e[n.col];
    if (s == null) return null;
    if (n.kind === "full") {
      t += s;
      continue;
    }
    if (n.kind === "token") {
      const i = Cl(s, n.delim), r = n.fromEnd ? i.length - 1 - n.index : n.index;
      if (r < 0 || r >= i.length) return null;
      t += i[r];
      continue;
    }
    if (n.start >= s.length) return null;
    t += s.slice(n.start, n.start + n.len);
  }
  return t;
}
function Su(o, e) {
  if (!e.length) return null;
  const t = (r) => e.every((l) => Mi(r, o[l.row]) === l.output);
  let n = null;
  for (const r of e) {
    const l = $i(o[r.row], r.output);
    if (l && t(l)) {
      n = l;
      break;
    }
  }
  if (n || (n = $i(o[e[0].row], e[0].output)), !n || !n.parts.length) return null;
  const s = new Set(e.map((r) => r.row)), i = [];
  for (let r = 0; r < o.length; r++) {
    if (s.has(r) || o[r].every((a) => !a || !a.trim())) continue;
    const l = Mi(n, o[r]);
    l != null && l !== "" && i.push({ row: r, value: l });
  }
  return i.length ? { program: n, outputs: i } : null;
}
function Eu(o) {
  if (o.length < 8) return null;
  const e = new DataView(o.buffer, o.byteOffset, o.byteLength);
  let t = 8;
  for (; t + 12 <= o.length; ) {
    const n = e.getUint32(t), s = String.fromCharCode(o[t + 4], o[t + 5], o[t + 6], o[t + 7]);
    if (s === "pHYs") {
      if (t + 8 + 9 > o.length) return null;
      const i = e.getUint32(t + 8);
      return o[t + 8 + 8] === 1 && i > 0 ? Math.round(i * 0.0254) : null;
    }
    if (s === "IDAT" || s === "IEND") return null;
    t += 12 + n;
  }
  return null;
}
function Tu(o) {
  if (o.length < 4) return null;
  const e = new DataView(o.buffer, o.byteOffset, o.byteLength);
  if (e.getUint16(0) !== 65496) return null;
  let t = 2;
  for (; t + 4 <= o.length; ) {
    if (o[t] !== 255) return null;
    const n = o[t + 1];
    if (n === 218 || n === 217) return null;
    const s = e.getUint16(t + 2);
    if (n === 224 && t + 4 + 12 <= o.length) {
      if (o[t + 4] === 74 && o[t + 5] === 70 && o[t + 6] === 73 && o[t + 7] === 70 && o[t + 8] === 0) {
        const i = o[t + 11], r = e.getUint16(t + 12);
        if (i === 1 && r > 0) return r;
        if (i === 2 && r > 0) return Math.round(r * 2.54);
      }
      return null;
    }
    t += 2 + s;
  }
  return null;
}
function Ii(o, e) {
  try {
    const t = (e || "").toLowerCase();
    if (t.includes("png")) return Eu(o);
    if (t.includes("jpeg") || t.includes("jpg")) return Tu(o);
  } catch (t) {
  }
  return null;
}
function Ai(o, e, t = 600) {
  const s = 96 / (e && e > 0 ? e : 96);
  let i = Math.max(1, o.width) * s, r = Math.max(1, o.height) * s;
  const l = Math.min(1, t / Math.max(i, r));
  return i *= l, r *= l, { width: Math.max(1, Math.round(i)), height: Math.max(1, Math.round(r)) };
}
const Ri = 1024 * 1024;
function $u(o) {
  return new Promise((e) => {
    if (typeof Image == "undefined") {
      e(null);
      return;
    }
    const t = new Image();
    t.onload = () => e(t), t.onerror = () => e(null), t.src = o;
  });
}
function Mu(o) {
  return new Promise((e, t) => {
    const n = new FileReader();
    n.onload = () => e(String(n.result)), n.onerror = () => t(n.error), n.readAsDataURL(o);
  });
}
async function Iu(o, e = 1600, t = 0.82) {
  try {
    if (typeof document == "undefined") return o;
    const n = await Mu(o), s = await $u(n);
    if (!s || !s.naturalWidth) return o;
    const i = Math.min(1, e / Math.max(s.naturalWidth, s.naturalHeight)), r = Math.max(1, Math.round(s.naturalWidth * i)), l = Math.max(1, Math.round(s.naturalHeight * i)), a = document.createElement("canvas");
    a.width = r, a.height = l;
    const c = a.getContext("2d");
    if (!c) return o;
    c.drawImage(s, 0, 0, r, l);
    const d = await new Promise((h) => a.toBlob((f) => h(f), "image/jpeg", t));
    return d && d.size < o.size ? d : o;
  } catch (n) {
    return o;
  }
}
const Sl = "height:32px;padding:0 16px;border-radius:6px;cursor:pointer;font:inherit", Au = `${Sl};border:1px solid #1b7f4d;background:#21a366;color:#fff`, Fi = `${Sl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
function Ru(o) {
  return o >= 1024 * 1024 ? `${(o / 1024 / 1024).toFixed(1)} MB` : `${Math.round(o / 1024)} KB`;
}
class Fu {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  show(e) {
    var a, c, d;
    if (typeof document == "undefined") {
      e.onKeep();
      return;
    }
    this.close();
    let t = !1;
    const n = (h) => {
      t || (t = !0, this.close(), h());
    }, s = document.createElement("div");
    s.className = "ooxml-image-oversize-mask", s.style.cssText = "position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center";
    const i = document.createElement("div");
    i.className = "ooxml-image-oversize-card", i.style.cssText = "width:400px;max-width:94vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden";
    const r = e.count > 1 ? `${e.count} 张图片共 ` : "图片";
    i.innerHTML = [
      '<div style="padding:16px 18px 8px;font-weight:600;font-size:15px">图片较大</div>',
      `<div style="padding:0 18px 16px;color:#475467">${r}<b>${Ru(e.totalBytes)}</b>,是否压缩以减小体积?<div style="color:#98a2b3;font-size:12px;margin-top:6px">压缩:等比缩到最长边 ≤ 1600px、重编码;保持原图:按原始文件插入。</div></div>`,
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 18px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${Fi}">取消</button>`,
      `<button data-keep style="${Fi}">保持原图</button>`,
      `<button data-compress style="${Au}">压缩</button>`,
      "</div>"
    ].join(""), s.appendChild(i), document.body.appendChild(s), this.el = s, (a = i.querySelector("[data-compress]")) == null || a.addEventListener("click", () => n(e.onCompress)), (c = i.querySelector("[data-keep]")) == null || c.addEventListener("click", () => n(e.onKeep)), (d = i.querySelector("[data-cancel]")) == null || d.addEventListener("click", () => n(e.onCancel)), s.addEventListener("mousedown", (h) => {
      h.target === s && n(e.onCancel);
    });
    const l = (h) => {
      h.key === "Escape" && n(e.onCancel);
    };
    document.addEventListener("keydown", l, !0), this.cleanup = () => document.removeEventListener("keydown", l, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const El = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Lu = `${El};border:1px solid #1b7f4d;background:#21a366;color:#fff`, Nu = `${El};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, yo = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit;width:96px";
class Pu {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "o");
    C(this, "spec", { type: "linear", step: 1, dateUnit: "day" });
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.spec = { type: "linear", step: 1, dateUnit: "day" };
    const t = document.createElement("div");
    t.className = "ooxml-series-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-series-card", n.style.cssText = "width:380px;max-width:94vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (i) => {
      i.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (i) => {
      i.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), this.render(n);
  }
  render(e) {
    var r, l, a, c, d;
    const t = this.spec, n = (h, f) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="flex:0 0 64px;color:#475467">${h}</span>${f}</div>`, s = (h, f) => `<label style="margin-right:14px;cursor:pointer"><input type="radio" name="stype" data-type="${h}"${t.type === h ? " checked" : ""}> ${f}</label>`, i = (h, f) => `<option value="${h}"${t.dateUnit === h ? " selected" : ""}>${f}</option>`;
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>序列</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      n("类型", s("linear", "等差序列") + s("growth", "等比序列") + s("date", "日期")),
      t.type === "date" ? n("日期单位", `<select data-unit style="${yo};width:110px">${i("day", "日")}${i("weekday", "工作日")}${i("month", "月")}${i("year", "年")}</select>`) : "",
      n("步长值", `<input data-step type="number" value="${t.step}" style="${yo}">`),
      n("终止值", `<input data-stop type="number" placeholder="可选" style="${yo}">`),
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${Nu}">取消</button><button data-ok style="${Lu}">确定</button>`,
      "</div>"
    ].join(""), (r = e.querySelector("[data-close]")) == null || r.addEventListener("click", () => this.close()), (l = e.querySelector("[data-cancel]")) == null || l.addEventListener("click", () => this.close()), e.querySelectorAll("[data-type]").forEach((h) => h.addEventListener("change", () => {
      this.spec.type = h.dataset.type, this.render(e);
    })), (a = e.querySelector("[data-unit]")) == null || a.addEventListener("change", (h) => {
      this.spec.dateUnit = h.target.value;
    }), (c = e.querySelector("[data-step]")) == null || c.addEventListener("change", (h) => {
      this.spec.step = Number(h.target.value) || 1;
    }), (d = e.querySelector("[data-ok]")) == null || d.addEventListener("click", () => {
      const h = e.querySelector("[data-stop]").value.trim(), f = e.querySelector("[data-step]").value;
      this.spec.step = Number(f) || 1, this.spec.stop = h === "" ? void 0 : Number(h), this.o.onApply(this.spec), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Ou(o, e, t) {
  for (const n of o.merges)
    if (e >= n.top && e <= n.bottom && t >= n.left && t <= n.right) return n;
  return null;
}
function Hu(o, e, t) {
  const n = o.from;
  if (!n) return !1;
  if (o.to) {
    const s = o.to;
    return e >= n.row && e <= s.row && t >= n.col && t <= s.col;
  }
  return e === n.row && t === n.col;
}
function Du(o, e, t, n, s) {
  var m, y, w, v;
  const i = he(o, t, n, s), r = o.cells.get(O(t, n)), l = Ou(o, t, n), a = !!l && l.top === t && l.left === n, c = [];
  for (let x = 0; x < o.images.length; x++) {
    const S = o.images[x];
    Hu(S, t, n) && c.push({ index: x, anchor: R({}, S) });
  }
  const d = r == null ? void 0 : r.dispImgId, h = d ? (m = e.cellImages) == null ? void 0 : m.get(d) : void 0, f = h ? { id: d, src: h.src, mime: h.mime } : null, u = (y = o.dataValidations.find(
    (x) => t >= x.top && t <= x.bottom && n >= x.left && n <= x.right
  )) != null ? y : null, p = new ol(o), b = (p.hasRules() ? p.inspectHits(t, n, i.raw) : []).map((x) => ({
    ruleIndex: x.ruleIndex,
    style: zu(x.effect)
  }));
  return z(R({}, i), {
    merge: l ? R({}, l) : null,
    isMergeAnchor: a,
    floatingImages: c,
    cellImage: f,
    dataValidation: u ? R({}, u) : null,
    conditional: b,
    hyperlink: (w = r == null ? void 0 : r.hyperlink) != null ? w : null,
    comment: (v = r == null ? void 0 : r.comment) != null ? v : null
  });
}
function zu(o) {
  const e = {};
  return o.fillColor && (e.fill = { type: "solid", fgColor: o.fillColor }), (o.fontColor || o.bold) && (e.font = R(R({}, o.fontColor ? { color: o.fontColor } : {}), o.bold ? { bold: !0 } : {})), e;
}
class Bu {
  constructor(e, t) {
    C(this, "active", null);
    this.container = e, this.rectOf = t;
  }
  isActive() {
    return this.active !== null;
  }
  activeCell() {
    return this.active ? { row: this.active.row, col: this.active.col } : null;
  }
  /**
   * 挂载一个编辑器(先卸旧)。返回是否成功(工厂产出有效 DOM)。
   * rectOverride 给定时用它定位(合并单元格 → 整片合并区),否则按单格 rectOf。
   */
  mount(e, t, n, s, i) {
    this.unmount();
    let r, l, a;
    try {
      s.reposition = () => this.position();
      const c = n(s);
      c instanceof HTMLElement ? r = c : (r = c.el, l = c.destroy, a = c.getDesiredHeight);
    } catch (c) {
      return console.warn("[ooxml-preview] 单元格编辑器工厂出错:", c), !1;
    }
    return r.style.position = "absolute", r.style.boxSizing = "border-box", this.container.appendChild(r), this.active = { el: r, destroy: l, row: e, col: t, rectOverride: i, getDesiredHeight: a }, this.position(), !0;
  }
  /**
   * 按当前 rectOf 重定位活动编辑器(滚动/缩放后跟随).
   * Phase 1 长文本撑高 (2026-06-08): 若编辑器实现了 `getDesiredHeight`,
   * 最终高度 = max(单元格原高, 期望高度), 上限 viewport 一半防撑爆.
   * 宽度仍 = 列宽 (跟 WPS 一致, 仅向下溢出).
   */
  position() {
    var s;
    const e = this.active;
    if (!e) return;
    const t = e.rectOverride ? e.rectOverride() : this.rectOf(e.row, e.col);
    if (!t) return;
    e.el.style.left = t.x + "px", e.el.style.top = t.y + "px", e.el.style.width = t.w + "px";
    let n = t.h;
    if (e.getDesiredHeight)
      try {
        const i = e.getDesiredHeight(t.w);
        if (i > n) {
          const r = this.container.ownerDocument.defaultView, l = Math.max(120, ((s = r == null ? void 0 : r.innerHeight) != null ? s : 600) * 0.5);
          n = Math.min(i, l);
        }
      } catch (i) {
        console.warn("[ooxml-preview] 编辑器 getDesiredHeight 出错:", i);
      }
    e.el.style.height = n + "px";
  }
  /** 卸载活动编辑器 */
  unmount() {
    var t;
    const e = this.active;
    if (e) {
      this.active = null;
      try {
        (t = e.destroy) == null || t.call(e);
      } catch (n) {
        console.warn("[ooxml-preview] 编辑器 destroy 出错:", n);
      }
      e.el.remove();
    }
  }
  dispose() {
    this.unmount();
  }
}
const Wu = "position:fixed;z-index:9999;background:#fff;border:1px solid #d0d3d7;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.16);padding:4px 0;min-width:168px;font:13px/1.6 -apple-system,'Segoe UI',sans-serif;user-select:none;color:#1f2329;";
class Uu {
  constructor() {
    C(this, "el", null);
    C(this, "submenus", []);
    // 当前打开的子菜单(flyout),关闭时一并清掉
    C(this, "openSubRow", null);
    // 当前 flyout 所属的父行(避免重复打开)
    C(this, "subCloseTimer", null);
    // 延时关闭(给鼠标从父行移到 flyout 的缓冲)
    C(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e, t, n) {
    this.close();
    const s = this.buildMenu(n);
    document.body.appendChild(s), this.el = s;
    const i = s.offsetWidth, r = s.offsetHeight, l = e + i > window.innerWidth ? Math.max(0, e - i) : e, a = t + r > window.innerHeight ? Math.max(0, t - r) : t;
    s.style.left = l + "px", s.style.top = a + "px";
    const c = (f) => {
      const u = f.target;
      this.el && !this.el.contains(u) && !this.submenus.some((p) => p.contains(u)) && this.close();
    }, d = (f) => {
      f.key === "Escape" && this.close();
    }, h = () => this.close();
    setTimeout(() => {
      document.addEventListener("mousedown", c, !0), document.addEventListener("keydown", d, !0), window.addEventListener("scroll", h, !0), this.cleanup = () => {
        document.removeEventListener("mousedown", c, !0), document.removeEventListener("keydown", d, !0), window.removeEventListener("scroll", h, !0);
      };
    }, 0);
  }
  /** 建一级菜单 DOM(不挂载、不定位);子菜单悬停时再建 flyout。 */
  buildMenu(e) {
    var n, s;
    const t = document.createElement("div");
    t.className = "ooxml-context-menu", t.style.cssText = Wu;
    for (const i of e) {
      if (i.separator) {
        const c = document.createElement("div");
        c.style.cssText = "height:1px;background:#eceef1;margin:4px 0;", t.appendChild(c);
        continue;
      }
      const r = document.createElement("div"), l = !!((n = i.children) != null && n.length);
      r.textContent = ((s = i.label) != null ? s : "") + (l ? "  ▸" : "");
      const a = !!i.disabled;
      r.style.cssText = `padding:5px 16px;cursor:${a ? "default" : "pointer"};color:${a ? "#b7bcc2" : "inherit"};white-space:nowrap;${l ? "display:flex;justify-content:space-between;gap:18px;" : ""}`, a || (r.addEventListener("mouseenter", () => {
        r.style.background = "#eef3fe", this.cancelSubClose(), l ? this.openSubRow !== r && (this.closeAllSubmenus(), this.openSubmenu(r, i.children)) : this.openSubRow && this.scheduleSubClose();
      }), r.addEventListener("mouseleave", () => {
        r.style.background = "", l && this.openSubRow === r && this.scheduleSubClose();
      }), l || r.addEventListener("mousedown", (c) => {
        var d;
        c.preventDefault(), c.stopPropagation(), this.close(), (d = i.action) == null || d.call(i);
      })), t.appendChild(r);
    }
    return t;
  }
  /** 在 row 右侧展开子菜单 flyout(贴边翻转到左侧);悬停 flyout 取消关闭,离开 flyout 延时关。 */
  openSubmenu(e, t) {
    const n = this.buildMenu(t);
    n.style.visibility = "hidden", document.body.appendChild(n);
    const s = e.getBoundingClientRect(), i = n.offsetWidth, r = n.offsetHeight, l = s.right + i > window.innerWidth ? Math.max(0, s.left - i + 2) : s.right - 2, a = s.top + r > window.innerHeight ? Math.max(0, window.innerHeight - r) : s.top;
    n.style.left = l + "px", n.style.top = a + "px", n.style.visibility = "visible", n.addEventListener("mouseenter", () => this.cancelSubClose()), n.addEventListener("mouseleave", () => this.scheduleSubClose()), this.submenus.push(n), this.openSubRow = e;
  }
  scheduleSubClose() {
    this.cancelSubClose(), this.subCloseTimer = setTimeout(() => this.closeAllSubmenus(), 260);
  }
  cancelSubClose() {
    this.subCloseTimer && (clearTimeout(this.subCloseTimer), this.subCloseTimer = null);
  }
  closeAllSubmenus() {
    this.cancelSubClose();
    for (const e of this.submenus) e.remove();
    this.submenus = [], this.openSubRow = null;
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, this.closeAllSubmenus(), (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const qu = {
  filters: "筛选器:决定整张透视表只统计哪些数据。把字段拖进来后,点字段上的小按钮选「非空」或「多选某几个值」,表里就只算选中的部分;放进来默认是「全部」=不过滤(所以看不出变化,要点开选值才生效)。",
  columns: "列:把这个字段的每个不同值拆成一列(横向展开),和「行」交叉成二维汇总表。例:行放「物流商」、列放「账单月份」→ 行是每个物流商,每个月一列,格子里是该物流商该月的合计。",
  rows: "行:把这个字段的每个不同值列成一行(纵向分组),格子里是对应的汇总值。放 2 个及以上行字段时,外层分组可点行首的 − / + 折叠或展开下面的明细。",
  values: "值:要汇总的数字字段(放进来才会出数据)。点字段上的下拉可切换 求和 / 计数 / 平均 / 最大 / 最小;可以同时放多个值字段,各占一列。"
}, _u = {
  filters: "放字段并选值 → 只统计选中的数据",
  columns: "放字段 → 按它的值横向拆成多列"
};
class ju {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  show(e) {
    var c, d, h;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.style.cssText = "width:420px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden;", n.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>创建透视表</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px 8px">',
      `<div style="margin-bottom:10px;color:#667085">数据区域: <b style="color:#1f2329">${fe(e.rangeLabel)}</b></div>`,
      '<div style="margin-bottom:8px;color:#667085">请选择透视表生成位置。字段布局将在右侧“数据透视表”面板中配置。</div>',
      '<label style="display:block;margin:12px 0 4px;color:#667085">生成位置</label>',
      '<label style="display:flex;align-items:center;gap:6px;margin:4px 0"><input data-output-current type="radio" name="pivot-output" checked> 现有工作表</label>',
      `<input data-cell value="${fe(e.defaultOutputCell)}" style="width:100%;height:30px;border:1px solid #d0d5dd;border-radius:5px;padding:0 8px;box-sizing:border-box" />`,
      '<label style="display:flex;align-items:center;gap:6px;margin:8px 0 0"><input data-output-new type="radio" name="pivot-output"> 新建工作表</label>',
      '<div style="margin-top:10px;color:#98a2b3;font-size:12px">字段、筛选、折叠可在右侧面板调整;源数据改动后透视结果自动刷新。</div>',
      "</div>",
      '<div style="display:flex;gap:8px;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      '<button data-cancel style="height:30px;padding:0 14px;border:1px solid #d0d5dd;border-radius:5px;background:#fff;cursor:pointer">取消</button>',
      '<button data-ok style="height:30px;padding:0 14px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">创建</button>',
      "</div>"
    ].join(""), t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = n.querySelector("[data-cell]"), i = n.querySelector("[data-output-current]"), r = n.querySelector("[data-output-new]"), l = () => {
      const f = r.checked ? { kind: "new-sheet" } : { kind: "current-sheet", cell: s.value.trim() };
      this.close(), e.onSubmit(f);
    };
    s.addEventListener("focus", () => {
      i.checked = !0;
    }), i.addEventListener("change", () => {
      i.checked && s.focus();
    }), r.addEventListener("change", () => {
      r.checked && s.blur();
    });
    const a = (f) => {
      f.key === "Escape" && this.close(), f.key === "Enter" && l();
    };
    (c = n.querySelector("[data-close]")) == null || c.addEventListener("click", () => this.close()), (d = n.querySelector("[data-cancel]")) == null || d.addEventListener("click", () => this.close()), (h = n.querySelector("[data-ok]")) == null || h.addEventListener("click", l), t.addEventListener("mousedown", (f) => {
      f.target === t && this.close();
    }), document.addEventListener("keydown", a, !0), this.cleanup = () => document.removeEventListener("keydown", a, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
class Vu {
  constructor() {
    C(this, "el", null);
    C(this, "opts", null);
    /** 当前正在编辑筛选值的字段 index(null = 未展开筛选明细面板) */
    C(this, "activeFilterField", null);
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.opts = e, this.activeFilterField = null;
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;right:0;top:0;bottom:0;width:360px;z-index:9999;background:#e9eef4;border-left:1px solid #cfd6df;box-shadow:-4px 0 16px rgba(15,23,42,.12);font:13px/1.45 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#111827;padding:18px 16px;box-sizing:border-box;overflow:auto;", document.body.appendChild(t), this.el = t, this.render();
  }
  close() {
    var e;
    (e = this.el) == null || e.remove(), this.el = null, this.opts = null, this.activeFilterField = null;
  }
  dispose() {
    this.close();
  }
  render(e = "") {
    var l, a, c, d;
    const t = this.el, n = this.opts;
    if (!t || !n) return;
    const s = e.trim().toLowerCase(), i = s ? n.fields.filter((h) => h.label.toLowerCase().includes(s)) : n.fields;
    t.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">',
      '<div style="font-weight:600">数据透视表⌄</div><div style="display:flex;gap:12px;color:#374151"><span>⚙</span><span>⌖</span><button data-close style="border:0;background:none;font-size:18px;cursor:pointer;color:#374151">×</button></div></div>',
      '<details open><summary style="font-weight:600;cursor:pointer">字段列表</summary>',
      '<div style="margin:10px 0 6px">将字段添加至数据透视表区域</div>',
      `<input data-search value="${fe(e)}" placeholder="  搜索字段" style="width:100%;height:32px;border:1px solid #c9d1db;border-radius:4px;background:#fff;box-sizing:border-box;margin-bottom:6px" />`,
      '<div style="height:270px;background:#fff;border:1px solid #c9d1db;border-radius:4px;overflow:auto;padding:8px 8px;box-sizing:border-box">',
      ...i.map((h) => this.fieldRow(h, n.layout)),
      "</div></details>",
      '<details open style="margin-top:18px"><summary style="font-weight:600;cursor:pointer">数据透视表区域</summary>',
      '<div style="margin:10px 0 8px">在下面区域中拖动字段</div>',
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">',
      this.area("筛选器", "filters", n),
      this.area("列", "columns", n),
      this.area("行", "rows", n),
      this.area("值", "values", n),
      "</div>",
      this.filterDetail(n),
      '<div data-drop-remove style="margin-top:10px;height:30px;border:1px dashed #9aa4b2;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#667085;background:#f7f9fb">拖到这里移出字段</div></details>'
    ].join(""), (l = t.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close());
    const r = t.querySelector("[data-search]");
    r == null || r.addEventListener("input", () => this.render(r.value)), r == null || r.focus(), r == null || r.setSelectionRange(r.value.length, r.value.length), t.querySelectorAll("[data-add]").forEach((h) => {
      h.addEventListener("click", () => {
        const f = Number(h.dataset.field), u = h.dataset.add;
        this.updateLayout((p) => xo(p, u, f), e);
      });
    }), t.querySelectorAll("[data-toggle-field]").forEach((h) => {
      h.addEventListener("change", () => {
        var p, g, b;
        const f = Number(h.dataset.toggleField), u = (b = (g = (p = this.opts) == null ? void 0 : p.fields.find((m) => m.index === f)) == null ? void 0 : g.numeric) != null ? b : !1;
        this.updateLayout((m) => h.checked ? xo(m, u ? "values" : "rows", f) : Xo(m, f), e);
      });
    }), t.querySelectorAll("[data-remove]").forEach((h) => {
      h.addEventListener("click", () => {
        const f = Number(h.dataset.field), u = h.dataset.remove;
        this.updateLayout((p) => u === "filters" ? z(R({}, p), { filters: p.filters.filter((g) => g.field !== f) }) : z(R({}, p), { [u]: p[u].filter((g) => g !== f) }), e);
      });
    }), t.querySelectorAll("[data-filter-edit]").forEach((h) => {
      h.addEventListener("click", () => {
        const f = Number(h.dataset.filterEdit);
        this.activeFilterField = this.activeFilterField === f ? null : f, this.render(e);
      });
    }), (a = t.querySelector("[data-filter-close]")) == null || a.addEventListener("click", () => {
      this.activeFilterField = null, this.render(e);
    }), t.querySelectorAll("[data-filter-mode]").forEach((h) => {
      h.addEventListener("change", () => {
        var g, b;
        const f = this.activeFilterField;
        if (f == null) return;
        const u = h.dataset.filterMode, p = (b = (g = this.opts) == null ? void 0 : g.filterValues[f]) != null ? b : [];
        this.updateLayout((m) => z(R({}, m), {
          filters: m.filters.map((y) => y.field === f ? Yu(f, u, p, y) : y)
        }), e);
      });
    }), t.querySelectorAll("[data-filter-check]").forEach((h) => {
      h.addEventListener("change", () => {
        var g, b, m;
        const f = this.activeFilterField;
        if (f == null) return;
        const u = (g = h.dataset.filterCheck) != null ? g : "", p = (m = (b = this.opts) == null ? void 0 : b.filterValues[f]) != null ? m : [];
        this.updateLayout((y) => z(R({}, y), {
          filters: y.filters.map((w) => {
            var x;
            if (w.field !== f) return w;
            const v = new Set(w.mode === "include" && (x = w.values) != null ? x : p);
            return h.checked ? v.add(u) : v.delete(u), { field: f, mode: "include", values: [...v] };
          })
        }), e);
      });
    }), (c = t.querySelector("[data-filter-all]")) == null || c.addEventListener("click", () => {
      var u, p;
      const h = this.activeFilterField;
      if (h == null) return;
      const f = (p = (u = this.opts) == null ? void 0 : u.filterValues[h]) != null ? p : [];
      this.updateLayout((g) => z(R({}, g), { filters: g.filters.map((b) => b.field === h ? { field: h, mode: "include", values: f.slice() } : b) }), e);
    }), (d = t.querySelector("[data-filter-none]")) == null || d.addEventListener("click", () => {
      const h = this.activeFilterField;
      h != null && this.updateLayout((f) => z(R({}, f), { filters: f.filters.map((u) => u.field === h ? { field: h, mode: "include", values: [] } : u) }), e);
    }), t.querySelectorAll("[data-summary-value]").forEach((h) => {
      h.addEventListener("change", () => {
        const f = Number(h.dataset.summaryValue);
        this.updateLayout((u) => z(R({}, u), {
          values: u.values.map((p) => p.field === f ? z(R({}, p), { summary: h.value }) : p)
        }), e);
      });
    }), t.querySelectorAll("[data-drag-field]").forEach((h) => {
      h.addEventListener("dragstart", (f) => {
        var u;
        (u = f.dataTransfer) == null || u.setData("application/x-ooxml-pivot-field", JSON.stringify({ field: Number(h.dataset.dragField), from: h.dataset.dragFrom || "" })), f.dataTransfer && (f.dataTransfer.effectAllowed = "move");
      });
    }), t.querySelectorAll("[data-drop-area]").forEach((h) => {
      h.addEventListener("dragover", (f) => {
        f.preventDefault(), h.style.outline = "2px solid #21a366";
      }), h.addEventListener("dragleave", () => {
        h.style.outline = "";
      }), h.addEventListener("drop", (f) => {
        var b;
        f.preventDefault(), h.style.outline = "";
        const u = (b = f.dataTransfer) == null ? void 0 : b.getData("application/x-ooxml-pivot-field");
        if (!u) return;
        const p = JSON.parse(u), g = h.dataset.dropArea;
        this.updateLayout((m) => xo(m, g, p.field), e);
      });
    }), t.querySelectorAll("[data-drop-remove]").forEach((h) => {
      h.addEventListener("dragover", (f) => {
        f.preventDefault(), h.style.outline = "2px solid #ef4444";
      }), h.addEventListener("dragleave", () => {
        h.style.outline = "";
      }), h.addEventListener("drop", (f) => {
        var g;
        f.preventDefault(), h.style.outline = "";
        const u = (g = f.dataTransfer) == null ? void 0 : g.getData("application/x-ooxml-pivot-field");
        if (!u) return;
        const p = JSON.parse(u);
        this.updateLayout((b) => Xo(b, p.field), e);
      });
    });
  }
  fieldRow(e, t) {
    const n = t.filters.some((i) => i.field === e.index) || t.columns.includes(e.index) || t.rows.includes(e.index) || t.values.some((i) => i.field === e.index), s = e.numeric ? `<button data-add="values" data-field="${e.index}" title="加入值" style="border:0;background:none;cursor:pointer">Σ</button>` : "";
    return `<div data-drag-field="${e.index}" draggable="true" style="display:flex;align-items:center;gap:7px;min-height:30px;cursor:grab"><span style="color:#667085">⋮⋮</span><input type="checkbox" data-toggle-field="${e.index}" ${n ? "checked" : ""} title="勾选 = 加入透视表(数值→值,其它→行);取消 = 移出"> <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fe(e.label)}</span><button data-add="filters" data-field="${e.index}" title="加入筛选器" style="border:0;background:none;cursor:pointer">筛</button><button data-add="columns" data-field="${e.index}" title="加入列" style="border:0;background:none;cursor:pointer">列</button><button data-add="rows" data-field="${e.index}" title="加入行" style="border:0;background:none;cursor:pointer">行</button>${s}</div>`;
  }
  area(e, t, n) {
    const s = n.layout[t].map((l) => {
      var u;
      const a = typeof l == "number" ? l : ("summary" in l, l.field), c = n.fields.find((p) => p.index === a);
      if (!c) return "";
      const d = t === "values" ? `${Li(l.summary)}: ${c.label}` : c.label, h = t === "filters" ? this.filterSummaryBtn(l, (u = n.filterValues[c.index]) != null ? u : []) : "", f = t === "values" ? this.summarySelect(l) : "";
      return `<span data-drag-field="${c.index}" data-drag-from="${t}" draggable="true" style="display:inline-flex;align-items:center;gap:4px;max-width:100%;padding:3px 6px;margin:0 4px 4px 0;border:1px solid #b8c2cc;border-radius:3px;background:#f7f9fb;cursor:grab"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fe(d)}</span>${h}${f}<button data-remove="${t}" data-field="${c.index}" style="border:0;background:none;cursor:pointer;color:#667085">×</button></span>`;
    }).join(""), i = qu[t], r = t === "filters" || t === "columns" ? `<div style="color:#9aa4ae;font-size:11px;padding:2px 0">${fe(_u[t])}</div>` : "";
    return `<div title="${fe(i)}"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px"><span title="${fe(i)}" style="cursor:help">${fe(e)} <span style="color:#9aa4ae;font-size:11px">ⓘ</span></span><span>＋</span></div><div data-drop-area="${t}" title="${fe(i)}" style="height:88px;background:#fff;border:1px solid #c9d1db;border-radius:4px;padding:6px;box-sizing:border-box;overflow:auto">${s || r}</div></div>`;
  }
  updateLayout(e, t) {
    if (!this.opts) return;
    const n = e(this.opts.layout);
    this.opts.layout = n, this.opts.onChange(n), this.render(t);
  }
  /** 筛选 chip 上的小按钮:显示当前筛选状态(全部/非空/N 项),点开底部明细面板编辑。 */
  filterSummaryBtn(e, t) {
    var i, r, l;
    const n = e.mode === "all" ? "全部" : e.mode === "non-empty" ? "非空" : e.mode === "equals" ? (i = e.value) != null ? i : "" : `${(l = (r = e.values) == null ? void 0 : r.length) != null ? l : t.length}/${t.length} 项`, s = this.activeFilterField === e.field;
    return `<button data-filter-edit="${e.field}" title="设置筛选值" style="border:1px solid ${s ? "#21a366" : "#c9d1db"};background:#fff;border-radius:3px;height:22px;max-width:84px;padding:0 6px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fe(n)} ▾</button>`;
  }
  /** 底部筛选明细面板:全部/非空/多选 三模式 + 多选时的值复选框列表(WPS 风格勾选筛选)。 */
  filterDetail(e) {
    var d, h, f, u;
    const t = this.activeFilterField;
    if (t == null) return "";
    const n = e.layout.filters.find((p) => p.field === t);
    if (!n) return "";
    const s = (h = (d = e.fields.find((p) => p.index === t)) == null ? void 0 : d.label) != null ? h : `字段${t + 1}`, i = (f = e.filterValues[t]) != null ? f : [], r = n.mode === "include", l = new Set(r && (u = n.values) != null ? u : i), a = (p, g) => `<label style="display:inline-flex;align-items:center;gap:4px;margin-right:12px"><input type="radio" name="pivot-filter-mode" data-filter-mode="${p}" ${n.mode === p ? "checked" : ""}> ${g}</label>`, c = i.map((p) => `<label style="display:flex;align-items:center;gap:6px;min-height:24px"><input type="checkbox" data-filter-check="${fe(p)}" ${l.has(p) ? "checked" : ""} ${r ? "" : "disabled"}> <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fe(p)}</span></label>`).join("");
    return [
      '<div style="margin-top:12px;border:1px solid #c9d1db;border-radius:4px;background:#fff;padding:8px">',
      `<div style="font-weight:600;margin-bottom:6px">筛选「${fe(s)}」<button data-filter-close style="float:right;border:0;background:none;cursor:pointer;color:#667085">×</button></div>`,
      `<div style="margin-bottom:6px">${a("all", "全部")}${a("non-empty", "非空")}${a("include", "多选")}</div>`,
      r ? '<div style="margin-bottom:4px"><button data-filter-all style="border:0;background:none;color:#21a366;cursor:pointer;padding:0">全选</button> · <button data-filter-none style="border:0;background:none;color:#21a366;cursor:pointer;padding:0">清空</button></div>' : "",
      `<div style="max-height:140px;overflow:auto">${c}</div>`,
      "</div>"
    ].join("");
  }
  summarySelect(e) {
    const t = ["sum", "count", "avg", "max", "min"];
    return `<select data-summary-value="${e.field}" style="max-width:78px;height:22px;border:1px solid #c9d1db;border-radius:3px;background:#fff">${t.map((n) => `<option value="${n}" ${n === e.summary ? "selected" : ""}>${Li(n)}</option>`).join("")}</select>`;
  }
}
function xo(o, e, t) {
  const n = Xo(o, t);
  return e === "filters" ? n.filters = [...n.filters, { field: t, mode: "all" }] : e === "values" ? n.values = [...n.values, { field: t, summary: "sum" }] : n[e] = [...n[e], t], n;
}
function Xo(o, e) {
  return {
    filters: o.filters.filter((t) => t.field !== e),
    columns: o.columns.filter((t) => t !== e),
    rows: o.rows.filter((t) => t !== e),
    values: o.values.filter((t) => t.field !== e)
  };
}
function Li(o) {
  return { sum: "求和项", count: "计数项", avg: "平均值", max: "最大值", min: "最小值" }[o];
}
function Yu(o, e, t, n) {
  var s;
  return e === "include" ? { field: o, mode: "include", values: n.mode === "include" && (s = n.values) != null ? s : t.slice() } : e === "non-empty" ? { field: o, mode: "non-empty" } : { field: o, mode: "all" };
}
function fe(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
const Xu = [
  { key: "cellStyle", label: "字体/对齐/换行/边框/数字格式", hint: "覆盖=只留源;合并=源没写的留目标;不粘=保留目标", opts: [["overwrite", "覆盖"], ["merge", "合并"], ["skip", "不粘(留目标)"]] },
  { key: "fill", label: "填充底色", hint: "覆盖=源没写则无填充;合并=源没写则留目标底色;不粘=保留目标", opts: [["overwrite", "覆盖"], ["merge", "合并"], ["skip", "不粘(留目标)"]] },
  { key: "rowHeight", label: "行高", hint: "逐行,只影响被粘的行", opts: [["source", "搬源"], ["keep", "不动"]] },
  { key: "colWidth", label: "列宽", hint: "整列共享,搬到中间会动上方表头", opts: [["firstRowOnly", "仅首行搬源"], ["source", "总搬源"], ["keep", "不动"]] },
  { key: "targetMerges", label: "目标原有合并(粘贴区内)", hint: "不清的话旧合并会吞列致数据错位", opts: [["clear", "清掉"], ["keep", "保留"]] },
  { key: "sourceMerges", label: "源自带的合并", hint: "应用源里的合并区", opts: [["apply", "应用"], ["skip", "不应用"]] },
  { key: "images", label: "图片(内嵌/浮动)", hint: "把源的图落到目标格", opts: [["apply", "落格"], ["skip", "不粘"]] }
];
function wo(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class Gu {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  show(e) {
    var h, f, u, p, g, b;
    if (typeof document == "undefined") return;
    this.close();
    const t = Lt(e.current), n = document.createElement("div");
    n.className = "ooxml-paste-config-mask", n.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const s = document.createElement("div");
    s.style.cssText = "width:460px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;";
    const i = (m) => {
      const y = String(t[m.key]), w = m.opts.map(([v, x]) => `<option value="${v}"${v === y ? " selected" : ""}>${wo(x)}</option>`).join("");
      return [
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed #eef0f2">',
        `<div style="min-width:0"><div style="font-weight:500">${wo(m.label)}</div><div style="color:#98a2b3;font-size:12px">${wo(m.hint)}</div></div>`,
        `<select data-key="${m.key}" style="flex:0 0 132px;height:30px;border:1px solid #d0d5dd;border-radius:5px;padding:0 6px;background:#fff;cursor:pointer">${w}</select>`,
        "</div>"
      ].join("");
    };
    s.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      '<span>粘贴行为配置</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:10px 16px">',
      '<div style="display:flex;gap:8px;margin-bottom:8px">',
      '<button data-preset-overwrite style="flex:1;height:30px;border:1px solid #d0d5dd;border-radius:5px;background:#f5f7fa;cursor:pointer">覆盖式 1:1(默认)</button>',
      '<button data-preset-values style="flex:1;height:30px;border:1px solid #d0d5dd;border-radius:5px;background:#f5f7fa;cursor:pointer">仅值(保留目标)</button>',
      "</div>",
      '<div style="color:#98a2b3;font-size:12px;margin-bottom:4px">逐项自由定制(列宽默认「仅首行搬源」:粘到首行=新表头取源宽,粘到中间=不动上方表头)。</div>',
      Xu.map(i).join(""),
      "</div>",
      '<div style="display:flex;gap:8px;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      '<button data-reset style="height:30px;padding:0 12px;border:1px solid #d0d5dd;border-radius:5px;background:#fff;cursor:pointer">恢复默认</button>',
      '<button data-cancel style="height:30px;padding:0 14px;border:1px solid #d0d5dd;border-radius:5px;background:#fff;cursor:pointer">取消</button>',
      '<button data-ok style="height:30px;padding:0 14px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">应用</button>',
      "</div>"
    ].join(""), n.appendChild(s), document.body.appendChild(n), this.el = n;
    const r = () => Array.from(s.querySelectorAll("select[data-key]")), l = (m) => {
      for (const y of r()) y.value = String(m[y.dataset.key]);
    }, a = () => {
      const m = {};
      for (const y of r()) m[y.dataset.key] = y.value;
      return Lt(m);
    }, c = () => {
      const m = a();
      this.close(), e.onSubmit(m);
    };
    (h = s.querySelector("[data-preset-overwrite]")) == null || h.addEventListener("click", () => l(Ht)), (f = s.querySelector("[data-preset-values]")) == null || f.addEventListener("click", () => l(al)), (u = s.querySelector("[data-reset]")) == null || u.addEventListener("click", () => l(Ht)), (p = s.querySelector("[data-close]")) == null || p.addEventListener("click", () => this.close()), (g = s.querySelector("[data-cancel]")) == null || g.addEventListener("click", () => this.close()), (b = s.querySelector("[data-ok]")) == null || b.addEventListener("click", c), n.addEventListener("mousedown", (m) => {
      m.target === n && this.close();
    });
    const d = (m) => {
      m.key === "Escape" && this.close();
    };
    document.addEventListener("keydown", d, !0), this.cleanup = () => document.removeEventListener("keydown", d, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Ku(o) {
  let e = "", t = o;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
const Ju = (o) => `${Ku(o.col)}${o.row + 1}`;
class Zu {
  constructor() {
    C(this, "el", null);
    C(this, "toastEl", null);
    C(this, "toastTimer", null);
    C(this, "cleanup", null);
  }
  show(e, t, n) {
    typeof document == "undefined" || e === "none" || (e === "toast" ? this.showToast(t) : this.showDialog(t, n));
  }
  showToast(e) {
    this.closeToast();
    const t = document.createElement("div");
    t.className = "ooxml-readonly-toast", t.style.cssText = "position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:10001;background:#fff7e6;border:1px solid #ffd591;color:#874d00;border-radius:8px;padding:9px 16px;box-shadow:0 6px 24px rgba(0,0,0,.16);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;max-width:80vw", t.textContent = "🔒 " + e, document.body.appendChild(t), this.toastEl = t, this.toastTimer = setTimeout(() => this.closeToast(), 3600);
  }
  closeToast() {
    var e;
    this.toastTimer && (clearTimeout(this.toastTimer), this.toastTimer = null), (e = this.toastEl) == null || e.remove(), this.toastEl = null;
  }
  showDialog(e, t) {
    var c;
    this.close();
    const n = t.map(Ju), s = n.slice(0, 60), i = n.length - s.length, r = document.createElement("div");
    r.className = "ooxml-readonly-mask", r.style.cssText = "position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const l = document.createElement("div");
    l.style.cssText = "width:420px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", l.innerHTML = [
      '<div style="display:flex;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">🔒 只读,操作已跳过</div>',
      '<div style="padding:14px 16px 6px">',
      `<div style="margin-bottom:10px;color:#475467">${Qu(e)}</div>`,
      n.length ? `<div style="color:#667085;margin-bottom:4px">只读格(${n.length} 个):</div><div style="max-height:180px;overflow:auto;background:#f7f8fa;border:1px solid #eef0f2;border-radius:6px;padding:8px;line-height:1.9">${s.map((d) => `<span style="display:inline-block;background:#fff;border:1px solid #e4e7ec;border-radius:4px;padding:0 6px;margin:0 4px 4px 0">${d}</span>`).join("")}${i > 0 ? `<span style="color:#98a2b3">…另 ${i} 个</span>` : ""}</div>` : "",
      "</div>",
      '<div style="display:flex;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      '<button data-ok style="height:30px;padding:0 16px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">知道了</button>',
      "</div>"
    ].join(""), r.appendChild(l), document.body.appendChild(r), this.el = r;
    const a = (d) => {
      (d.key === "Escape" || d.key === "Enter") && this.close();
    };
    (c = l.querySelector("[data-ok]")) == null || c.addEventListener("click", () => this.close()), r.addEventListener("mousedown", (d) => {
      d.target === r && this.close();
    }), document.addEventListener("keydown", a, !0), this.cleanup = () => document.removeEventListener("keydown", a, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close(), this.closeToast();
  }
}
function Qu(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
const ep = { stop: "⛔", warning: "⚠️", information: "ℹ️" };
class tp {
  constructor() {
    C(this, "el", null);
    C(this, "toastEl", null);
    C(this, "toastTimer", null);
    C(this, "bubbleEl", null);
    C(this, "cleanup", null);
    C(this, "prevFocus", null);
  }
  /** 非法输入提示。stop → 模态;warning/information → toast。 */
  showError(e, t, n) {
    typeof document != "undefined" && (e === "stop" ? this.showDialog(t, n) : this.showToast(e, t, n));
  }
  showToast(e, t, n) {
    this.closeToast();
    const s = document.createElement("div");
    s.className = "ooxml-validation-toast", s.style.cssText = "position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:10001;background:#fff7e6;border:1px solid #ffd591;color:#874d00;border-radius:8px;padding:9px 16px;box-shadow:0 6px 24px rgba(0,0,0,.16);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;max-width:80vw", s.textContent = `${ep[e]} ${n ? n + ":" : ""}${t}`, document.body.appendChild(s), this.toastEl = s, this.toastTimer = setTimeout(() => this.closeToast(), 3600);
  }
  closeToast() {
    var e;
    this.toastTimer && (clearTimeout(this.toastTimer), this.toastTimer = null), (e = this.toastEl) == null || e.remove(), this.toastEl = null;
  }
  showDialog(e, t) {
    var r, l;
    this.close(), this.prevFocus = (r = document.activeElement) != null ? r : null;
    const n = document.createElement("div");
    n.className = "ooxml-validation-mask", n.style.cssText = "position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const s = document.createElement("div");
    s.style.cssText = "width:380px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", s.innerHTML = [
      `<div style="display:flex;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">⛔ ${Zt(t || "输入不符合限制条件")}</div>`,
      `<div style="padding:16px;color:#475467">${Zt(e)}</div>`,
      '<div style="display:flex;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      '<button data-ok style="height:30px;padding:0 16px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">知道了</button>',
      "</div>"
    ].join(""), n.appendChild(s), document.body.appendChild(n), this.el = n;
    const i = (a) => {
      (a.key === "Escape" || a.key === "Enter") && (a.preventDefault(), a.stopPropagation(), this.close());
    };
    (l = s.querySelector("[data-ok]")) == null || l.addEventListener("click", () => this.close()), n.addEventListener("mousedown", (a) => {
      a.target === n && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0);
  }
  close() {
    var t, n;
    (t = this.cleanup) == null || t.call(this), this.cleanup = null, (n = this.el) == null || n.remove(), this.el = null;
    const e = this.prevFocus;
    this.prevFocus = null, e && typeof e.focus == "function" && setTimeout(() => e.focus(), 0);
  }
  /** 选中带输入提示的格时,在视口坐标 (x,y) 处弹黄色气泡(x,y = 该格右下角附近)。 */
  showInputBubble(e, t, n, s) {
    if (typeof document == "undefined") return;
    this.hideInputBubble();
    const i = document.createElement("div");
    i.className = "ooxml-validation-bubble", i.style.cssText = "position:fixed;z-index:9999;max-width:240px;background:#fffbe6;border:1px solid #ffe58f;color:#614700;border-radius:6px;padding:7px 10px;box-shadow:0 4px 16px rgba(0,0,0,.14);font:12px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;pointer-events:none;white-space:pre-wrap;word-break:break-word", i.innerHTML = (s ? `<div style="font-weight:600;margin-bottom:2px">${Zt(s)}</div>` : "") + Zt(n), document.body.appendChild(i);
    const r = window.innerWidth, l = window.innerHeight, a = i.getBoundingClientRect(), c = Math.min(Math.max(4, e), r - a.width - 4), d = Math.min(Math.max(4, t), l - a.height - 4);
    i.style.left = `${c}px`, i.style.top = `${d}px`, this.bubbleEl = i;
  }
  hideInputBubble() {
    var e;
    (e = this.bubbleEl) == null || e.remove(), this.bubbleEl = null;
  }
  dispose() {
    this.close(), this.closeToast(), this.hideInputBubble();
  }
}
function Zt(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function vo(o, e, t) {
  const n = o.dataValidationRules;
  if (n)
    return n.find((s) => e >= s.range.top && e <= s.range.bottom && t >= s.range.left && t <= s.range.right);
}
function np(o, e) {
  var r, l, a;
  if (op(e) || o.type === "custom") return null;
  let t = !0, n = "";
  switch (o.type) {
    case "list": {
      const c = Ni(e);
      t = ((r = o.options) != null ? r : []).includes(c), n = `只能从下拉列表中选择:${((l = o.options) != null ? l : []).join("、")}`;
      break;
    }
    case "whole": {
      const c = Pi(e);
      c == null || !Number.isInteger(c) ? (t = !1, n = "请输入整数") : (t = Qt(c, o), n = `请输入整数(${en(o)})`);
      break;
    }
    case "decimal": {
      const c = Pi(e);
      c == null ? (t = !1, n = "请输入数值") : (t = Qt(c, o), n = `请输入数值(${en(o)})`);
      break;
    }
    case "textLength": {
      const c = Ni(e).length;
      t = Qt(c, o), n = `文本长度需${en(o)}`;
      break;
    }
    case "date":
    case "time": {
      const c = hs(e);
      c == null ? (t = !1, n = o.type === "date" ? "请输入日期" : "请输入时间") : (t = Qt(c, o, !0), n = `请输入合法的${o.type === "date" ? "日期" : "时间"}(${en(o, !0)})`);
      break;
    }
  }
  if (t) return null;
  const s = (a = o.errorStyle) != null ? a : "stop", i = o.showErrorMessage && o.error ? o.error : n;
  return { rule: o, errorStyle: s, title: o.errorTitle, message: i };
}
function op(o) {
  return o == null || typeof o == "string" && o === "";
}
function Ni(o) {
  return o instanceof Date ? o.toISOString() : String(o != null ? o : "");
}
function Pi(o) {
  return typeof o == "number" ? Number.isFinite(o) ? o : null : typeof o == "string" && o.trim() !== "" && !isNaN(Number(o)) ? Number(o) : null;
}
const sp = Date.UTC(1899, 11, 30);
function hs(o) {
  if (o instanceof Date) return o.getTime();
  if (typeof o == "number") return Number.isFinite(o) ? sp + o * 864e5 : null;
  if (typeof o == "string" && o.trim() !== "") {
    const e = Date.parse(o);
    return isNaN(e) ? null : e;
  }
  return null;
}
function Oi(o, e) {
  if (o === void 0 || typeof o == "string" && o.trim() === "") return null;
  if (e) return hs(o);
  const t = typeof o == "number" ? o : Number(o);
  return Number.isFinite(t) ? t : null;
}
function Qt(o, e, t = !1) {
  var r;
  const n = Oi(e.formulae[0], t), s = Oi(e.formulae[1], t), i = (r = e.operator) != null ? r : "between";
  if (n == null) return !0;
  switch (i) {
    case "between":
      return s == null ? !0 : o >= n && o <= s;
    case "notBetween":
      return s == null ? !0 : o < n || o > s;
    case "equal":
      return o === n;
    case "notEqual":
      return o !== n;
    case "greaterThan":
      return o > n;
    case "lessThan":
      return o < n;
    case "greaterThanOrEqual":
      return o >= n;
    case "lessThanOrEqual":
      return o <= n;
    default:
      return !0;
  }
}
function en(o, e = !1) {
  var i;
  const t = (r) => {
    if (r === void 0) return "";
    if (e) {
      const l = hs(r);
      return l == null ? String(r) : new Date(l).toISOString().slice(0, 10);
    }
    return String(r);
  }, n = t(o.formulae[0]), s = t(o.formulae[1]);
  switch ((i = o.operator) != null ? i : "between") {
    case "between":
      return `介于 ${n} 和 ${s} 之间`;
    case "notBetween":
      return `不介于 ${n} 和 ${s} 之间`;
    case "equal":
      return `等于 ${n}`;
    case "notEqual":
      return `不等于 ${n}`;
    case "greaterThan":
      return `大于 ${n}`;
    case "lessThan":
      return `小于 ${n}`;
    case "greaterThanOrEqual":
      return `大于等于 ${n}`;
    case "lessThanOrEqual":
      return `小于等于 ${n}`;
    default:
      return "";
  }
}
const ko = {
  cellIs: "突出显示单元格",
  expression: "公式",
  colorScale: "色阶",
  dataBar: "数据条",
  iconSet: "图标集",
  top10: "项目选取(前/后 N)",
  unsupported: "未支持"
}, Tl = [
  ["greaterThan", "大于"],
  ["lessThan", "小于"],
  ["between", "介于"],
  ["notBetween", "不介于"],
  ["equal", "等于"],
  ["notEqual", "不等于"],
  ["greaterThanOrEqual", "大于等于"],
  ["lessThanOrEqual", "小于等于"]
], $l = [
  ["3TrafficLights1", "三色交通灯"],
  ["3Arrows", "三向箭头"],
  ["3Symbols", "三符号(圈)"],
  ["3Flags", "三色旗"],
  ["4Rating", "四等评级"],
  ["5Rating", "五等评级"],
  ["5Quarters", "五象限"]
];
function le(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function Hi(o) {
  let e = "", t = o;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
const Ml = (o) => `${Hi(o.left)}${o.top + 1}:${Hi(o.right)}${o.bottom + 1}`, Di = (o) => (o || []).map(Ml).join(", ") || "—";
function ip(o) {
  var e, t, n, s;
  switch (o.type) {
    case "cellIs":
      return `${((e = Tl.find((i) => i[0] === o.operator)) == null ? void 0 : e[1]) || o.operator || ""} ${(o.formulae || []).join(" , ")}`;
    case "expression":
      return (o.formulae || [])[0] || "";
    case "colorScale":
      return o.colorScale ? o.colorScale.mid ? "三色" : "双色" : "";
    case "dataBar":
      return ((t = o.dataBar) == null ? void 0 : t.color) || "";
    case "iconSet":
      return ((n = $l.find((i) => {
        var r;
        return i[0] === ((r = o.iconSet) == null ? void 0 : r.name);
      })) == null ? void 0 : n[1]) || ((s = o.iconSet) == null ? void 0 : s.name) || "";
    case "top10":
      return o.top10 ? `${o.top10.bottom ? "后" : "前"} ${o.top10.rank}${o.top10.percent ? "%" : " 项"}` : "";
    default:
      return "";
  }
}
const Il = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", zi = `${Il};border:1px solid #1b7f4d;background:#21a366;color:#fff`, ye = `${Il};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
class rp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "rules", []);
    C(this, "selection", null);
    C(this, "genId", () => "cf-u0");
    C(this, "onApply", () => {
    });
    C(this, "editing", null);
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.rules = e.rules.map((i) => R({}, i)), this.selection = e.selection, this.genId = e.genId, this.onApply = e.onApply, this.editing = null;
    const t = document.createElement("div");
    t.className = "ooxml-cf-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-cf-card", n.style.cssText = "width:520px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;", t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (i) => {
      i.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (i) => {
      i.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), this.renderList(n);
  }
  // ---------------- 列表视图 ----------------
  renderList(e) {
    var n, s, i, r;
    const t = this.rules.map((l, a) => [
      '<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px dashed #eef0f2">',
      `<span style="flex:0 0 96px;font-weight:500">${le(ko[l.type] || l.type)}</span>`,
      `<span style="flex:1;min-width:0;color:#667085;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${le(ip(l))} · <span style="color:#98a2b3">${le(Di(l.ranges))}</span></span>`,
      l.type === "unsupported" ? "" : `<button data-edit="${a}" style="${ye};height:26px;padding:0 10px">编辑</button>`,
      `<button data-del="${a}" style="${ye};height:26px;padding:0 10px;color:#d92d20;border-color:#fda29b">删除</button>`,
      "</div>"
    ].join("")).join("");
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      '<span>条件格式</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:10px 16px">',
      `<div style="color:#98a2b3;font-size:12px;margin-bottom:6px">当前选区:${le(this.selection ? Ml(this.selection) : "无(新建规则将套到全表 A1)")}</div>`,
      this.rules.length ? t : '<div style="color:#98a2b3;padding:16px 0;text-align:center">暂无条件格式规则</div>',
      '<div style="margin-top:12px"><button data-add style="' + ye + '">+ 新建规则</button></div>',
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      `<button data-cancel style="${ye}">取消</button><button data-done style="${zi}">完成</button>`,
      "</div>"
    ].join(""), (n = e.querySelector("[data-close]")) == null || n.addEventListener("click", () => this.close()), (s = e.querySelector("[data-cancel]")) == null || s.addEventListener("click", () => this.close()), (i = e.querySelector("[data-done]")) == null || i.addEventListener("click", () => {
      this.onApply(this.rules), this.close();
    }), (r = e.querySelector("[data-add]")) == null || r.addEventListener("click", () => this.startEdit(e, -1)), e.querySelectorAll("[data-edit]").forEach((l) => l.addEventListener("click", () => this.startEdit(e, Number(l.dataset.edit)))), e.querySelectorAll("[data-del]").forEach((l) => l.addEventListener("click", () => {
      this.rules.splice(Number(l.dataset.del), 1), this.renderList(e);
    }));
  }
  // ---------------- 编辑视图 ----------------
  startEdit(e, t) {
    const n = t >= 0 ? this.rules[t] : null, s = n ? n.ranges : this.selection ? [this.selection] : [{ top: 0, left: 0, bottom: 0, right: 0 }], i = n ? R({}, n) : { id: this.genId(), origin: "user", ranges: s, priority: 0, type: "cellIs", operator: "greaterThan", formulae: [""], style: { fill: { type: "solid", fgColor: "#FFEB9C" }, font: { color: "#9C5700" } } };
    this.editing = { index: t, draft: i }, this.renderEditor(e);
  }
  renderEditor(e) {
    var r, l, a, c;
    const t = this.editing.draft, n = this.editing.index < 0, s = n ? `<select data-type style="${ye};height:30px;width:180px">${["cellIs", "colorScale", "dataBar", "iconSet", "top10", "expression"].map((d) => `<option value="${d}"${d === t.type ? " selected" : ""}>${le(ko[d])}</option>`).join("")}</select>` : `<b>${le(ko[t.type] || t.type)}</b>`;
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      `<span>${n ? "新建规则" : "编辑规则"}</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>`,
      '<div style="padding:14px 16px">',
      `<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><span style="flex:0 0 70px;color:#475467">规则类型</span>${s}</div>`,
      "<div data-fields></div>",
      `<div style="color:#98a2b3;font-size:12px;margin-top:12px">应用范围:${le(Di(t.ranges))}</div>`,
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      `<button data-back style="${ye}">返回</button><button data-save style="${zi}">保存</button>`,
      "</div>"
    ].join("");
    const i = e.querySelector("[data-fields]");
    this.renderFields(i, t), (r = e.querySelector("[data-type]")) == null || r.addEventListener("change", (d) => {
      var h;
      this.editing.draft = this.defaultForType(d.target.value, t.ranges, (h = t.id) != null ? h : this.genId()), this.renderEditor(e);
    }), (l = e.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-back]")) == null || a.addEventListener("click", () => this.renderList(e)), (c = e.querySelector("[data-save]")) == null || c.addEventListener("click", () => {
      this.collectFields(i, this.editing.draft);
      const { index: d, draft: h } = this.editing;
      d >= 0 ? this.rules[d] = z(R({}, h), { dirty: !0 }) : this.rules.push(h), this.editing = null, this.renderList(e);
    });
  }
  defaultForType(e, t, n) {
    const s = { id: n, origin: "user", ranges: t, priority: 0 };
    switch (e) {
      case "colorScale":
        return z(R({}, s), { type: "colorScale", colorScale: { min: "#F8696B", mid: "#FFEB84", max: "#63BE7B" } });
      case "dataBar":
        return z(R({}, s), { type: "dataBar", dataBar: { color: "#638EC6", gradient: !0 } });
      case "iconSet":
        return z(R({}, s), { type: "iconSet", iconSet: { name: "3TrafficLights1", reverse: !1 } });
      case "top10":
        return z(R({}, s), { type: "top10", top10: { rank: 10, percent: !1, bottom: !1 }, style: { fill: { type: "solid", fgColor: "#FFC7CE" }, font: { color: "#9C0006" } } });
      case "expression":
        return z(R({}, s), { type: "expression", formulae: [""], style: { fill: { type: "solid", fgColor: "#FFEB9C" } } });
      default:
        return z(R({}, s), { type: "cellIs", operator: "greaterThan", formulae: [""], style: { fill: { type: "solid", fgColor: "#FFEB9C" }, font: { color: "#9C5700" } } });
    }
  }
  /** 类型专属字段。 */
  renderFields(e, t) {
    var r, l, a, c, d, h, f;
    const n = (u, p) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="flex:0 0 70px;color:#475467">${le(u)}</span>${p}</div>`, s = (u, p) => `<input type="color" data-f="${u}" value="${le(p || "#FFFFFF")}" style="width:42px;height:28px;padding:0;border:1px solid #d0d5dd;border-radius:4px;cursor:pointer">`, i = [];
    if (t.type === "cellIs") {
      const u = t.operator || "greaterThan", p = u === "between" || u === "notBetween";
      i.push(n("条件", `<select data-f="operator" style="${ye};height:30px;width:140px">${Tl.map(([g, b]) => `<option value="${g}"${g === u ? " selected" : ""}>${le(b)}</option>`).join("")}</select>`)), i.push(n("值", `<input data-f="v0" value="${le((r = (t.formulae || [])[0]) != null ? r : "")}" placeholder="数值/文本" style="${ye};height:30px;width:110px"> ${p ? `<input data-f="v1" value="${le((l = (t.formulae || [])[1]) != null ? l : "")}" placeholder="到" style="${ye};height:30px;width:110px">` : ""}`)), i.push(this.formatFields(t));
    } else if (t.type === "expression")
      i.push(n("公式", `<input data-f="v0" value="${le((a = (t.formulae || [])[0]) != null ? a : "")}" placeholder="=$A1>100" style="${ye};height:30px;flex:1">`)), i.push(this.formatFields(t));
    else if (t.type === "colorScale") {
      const u = t.colorScale || { min: "#F8696B", max: "#63BE7B" }, p = !!u.mid;
      i.push(n("色标数", `<label style="cursor:pointer"><input type="radio" name="csn" data-f="csn" value="2"${p ? "" : " checked"}> 双色</label> <label style="cursor:pointer;margin-left:12px"><input type="radio" name="csn" data-f="csn" value="3"${p ? " checked" : ""}> 三色</label>`)), i.push(n("最小", s("csmin", u.min))), p && i.push(n("中间", s("csmid", u.mid || "#FFEB84"))), i.push(n("最大", s("csmax", u.max)));
    } else if (t.type === "dataBar")
      i.push(n("条颜色", s("dbcolor", ((c = t.dataBar) == null ? void 0 : c.color) || "#638EC6"))), i.push(n("渐变", `<label style="cursor:pointer"><input type="checkbox" data-f="dbgrad"${((d = t.dataBar) == null ? void 0 : d.gradient) !== !1 ? " checked" : ""}> 渐变填充</label>`));
    else if (t.type === "iconSet") {
      const u = ((h = t.iconSet) == null ? void 0 : h.name) || "3TrafficLights1";
      i.push(n("图标集", `<select data-f="iconset" style="${ye};height:30px;width:160px">${$l.map(([p, g]) => `<option value="${p}"${p === u ? " selected" : ""}>${le(g)}</option>`).join("")}</select>`)), i.push(n("反向", `<label style="cursor:pointer"><input type="checkbox" data-f="iconrev"${(f = t.iconSet) != null && f.reverse ? " checked" : ""}> 反转图标顺序</label>`));
    } else if (t.type === "top10") {
      const u = t.top10 || { rank: 10, percent: !1, bottom: !1 };
      i.push(n("选取", `<label style="cursor:pointer"><input type="radio" name="t10b" data-f="t10top" value="top"${u.bottom ? "" : " checked"}> 前</label> <label style="cursor:pointer;margin-left:12px"><input type="radio" name="t10b" data-f="t10top" value="bottom"${u.bottom ? " checked" : ""}> 后</label> <input data-f="t10rank" type="number" min="1" value="${u.rank}" style="${ye};height:30px;width:70px;margin-left:10px"> <label style="cursor:pointer;margin-left:8px"><input type="checkbox" data-f="t10pct"${u.percent ? " checked" : ""}> 百分比</label>`)), i.push(this.formatFields(t));
    }
    e.innerHTML = i.join(""), e.querySelectorAll('[data-f="csn"]').forEach((u) => u.addEventListener("change", () => {
      var b;
      this.collectFields(e, this.editing.draft);
      const p = (b = e.querySelector('[data-f="csn"]:checked')) == null ? void 0 : b.value, g = this.editing.draft.colorScale || { min: "#F8696B", max: "#63BE7B" };
      this.editing.draft.colorScale = p === "3" ? { min: g.min, mid: g.mid || "#FFEB84", max: g.max } : { min: g.min, max: g.max }, this.renderFields(e, this.editing.draft);
    }));
  }
  /** 通用「格式」字段(填充色 + 字体色 + 加粗),cellIs/expression/top10 用。 */
  formatFields(e) {
    var i, r, l, a, c;
    const t = (i = e.style) != null && i.fill && e.style.fill.type !== "none" ? e.style.fill.fgColor || "#FFEB9C" : "", n = ((l = (r = e.style) == null ? void 0 : r.font) == null ? void 0 : l.color) || "", s = !!((c = (a = e.style) == null ? void 0 : a.font) != null && c.bold);
    return [
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">',
      '<span style="flex:0 0 70px;color:#475467">命中格式</span>',
      `<label style="cursor:pointer"><input type="checkbox" data-f="hasfill"${t ? " checked" : ""}> 填充</label> <input type="color" data-f="fillcolor" value="${le(t || "#FFEB9C")}" style="width:36px;height:26px;padding:0;border:1px solid #d0d5dd;border-radius:4px;cursor:pointer">`,
      `<label style="cursor:pointer;margin-left:8px"><input type="checkbox" data-f="hasfont"${n ? " checked" : ""}> 字体色</label> <input type="color" data-f="fontcolor" value="${le(n || "#9C0006")}" style="width:36px;height:26px;padding:0;border:1px solid #d0d5dd;border-radius:4px;cursor:pointer">`,
      `<label style="cursor:pointer;margin-left:8px"><input type="checkbox" data-f="bold"${s ? " checked" : ""}> 加粗</label>`,
      "</div>"
    ].join("");
  }
  /** 从 DOM 收集字段写回 draft。 */
  collectFields(e, t) {
    var i, r, l, a, c, d, h;
    const n = (f) => {
      var u;
      return (u = e.querySelector(`[data-f="${f}"]`)) == null ? void 0 : u.value;
    }, s = (f) => {
      var u;
      return (u = e.querySelector(`[data-f="${f}"]`)) == null ? void 0 : u.checked;
    };
    if (t.type === "cellIs") {
      t.operator = n("operator") || "greaterThan";
      const f = t.operator === "between" || t.operator === "notBetween";
      t.formulae = f ? [(i = n("v0")) != null ? i : "", (r = n("v1")) != null ? r : ""] : [(l = n("v0")) != null ? l : ""], this.collectFormat(e, t);
    } else if (t.type === "expression")
      t.formulae = [(a = n("v0")) != null ? a : ""], this.collectFormat(e, t);
    else if (t.type === "colorScale") {
      const f = ((c = e.querySelector('[data-f="csn"]:checked')) == null ? void 0 : c.value) || ((d = t.colorScale) != null && d.mid ? "3" : "2"), u = n("csmin") || "#F8696B", p = n("csmax") || "#63BE7B";
      t.colorScale = f === "3" ? { min: u, mid: n("csmid") || "#FFEB84", max: p } : { min: u, max: p };
    } else t.type === "dataBar" ? t.dataBar = { color: n("dbcolor") || "#638EC6", gradient: !!s("dbgrad") } : t.type === "iconSet" ? t.iconSet = { name: n("iconset") || "3TrafficLights1", reverse: !!s("iconrev") } : t.type === "top10" && (t.top10 = { rank: Math.max(1, Number(n("t10rank")) || 10), percent: !!s("t10pct"), bottom: ((h = e.querySelector('[data-f="t10top"]:checked')) == null ? void 0 : h.value) === "bottom" }, this.collectFormat(e, t));
  }
  collectFormat(e, t) {
    const n = (l) => {
      var a;
      return (a = e.querySelector(`[data-f="${l}"]`)) == null ? void 0 : a.value;
    }, s = (l) => {
      var a;
      return (a = e.querySelector(`[data-f="${l}"]`)) == null ? void 0 : a.checked;
    }, i = {};
    s("hasfill") ? i.fill = { type: "solid", fgColor: n("fillcolor") || "#FFEB9C" } : i.fill = { type: "none" };
    const r = {};
    s("hasfont") && (r.color = n("fontcolor") || "#9C0006"), s("bold") && (r.bold = !0), Object.keys(r).length && (i.font = r), t.style = i;
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.editing = null;
  }
  dispose() {
    this.close();
  }
}
const Bi = { general: "常规", number: "数值", currency: "货币", percent: "百分比", date: "日期", time: "时间", text: "文本", custom: "自定义" }, Wi = [
  ["yyyy/m/d", "2026/4/1"],
  ["yyyy-mm-dd", "2026-04-01"],
  ["m月d日", "4月1日"],
  ["yyyy年m月d日", "2026年4月1日"],
  ["mm/dd/yy", "04/01/26"],
  ["yyyy/m/d h:mm", "2026/4/1 13:05"]
], Ui = [["h:mm", "13:05"], ["h:mm:ss", "13:05:09"], ["h:mm AM/PM", "1:05 PM"], ["[h]:mm:ss", "总时长"]], lp = [["¥", "¥ 人民币"], ["$", "$ 美元"], ["€", "€ 欧元"], ["£", "£ 英镑"], ["", "无符号"]];
function nt(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function ap(o, e) {
  const t = e.decimals > 0 ? "." + "0".repeat(e.decimals) : "";
  switch (o) {
    case "general":
      return "General";
    case "text":
      return "@";
    case "number": {
      const n = (e.thousands ? "#,##0" : "0") + t;
      return e.negRed ? `${n};[Red]-${n}` : n;
    }
    case "currency": {
      const n = `${e.symbol}#,##0${t}`;
      return e.negRed ? `${n};[Red]-${n}` : n;
    }
    case "percent":
      return "0" + t + "%";
    case "date":
    case "time":
      return e.preset;
    case "custom":
      return e.preset || "General";
  }
}
function cp(o) {
  return !o || o === "General" ? "general" : o === "@" ? "text" : /%/.test(o) ? "percent" : /[¥$€£]/.test(o) ? "currency" : /[yhsm]|AM\/PM|\[h\]/i.test(o) && /[ymdhs:]/.test(o) && !/#|0\.0/.test(o.replace(/\[.*?\]/g, "")) ? /[hs]|AM\/PM|\[h\]/i.test(o) && !/[ymd]/.test(o) ? "time" : "date" : /^[#0,.]+$/.test(o.split(";")[0]) ? "number" : "custom";
}
const Al = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", qi = `${Al};border:1px solid #1b7f4d;background:#21a366;color:#fff`, kt = `${Al};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
class dp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "cat", "general");
    C(this, "opt", { decimals: 2, thousands: !0, negRed: !1, symbol: "¥", preset: "yyyy/m/d" });
    C(this, "sample", 1234.567);
    C(this, "date1904", !1);
    C(this, "onApply", () => {
    });
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.sample = e.sampleValue, this.date1904 = e.date1904, this.onApply = e.onApply, this.cat = cp(e.currentCode);
    const t = /\.0+/.exec(e.currentCode);
    this.opt.decimals = t ? t[0].length - 1 : this.cat === "general" ? 2 : 0, this.opt.thousands = /#,##0/.test(e.currentCode), this.opt.negRed = /\[Red\]/i.test(e.currentCode);
    const n = /[¥$€£]/.exec(e.currentCode);
    n && (this.opt.symbol = n[0]), (this.cat === "date" || this.cat === "time" || this.cat === "custom") && (this.opt.preset = e.currentCode);
    const s = document.createElement("div");
    s.className = "ooxml-numfmt-mask", s.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const i = document.createElement("div");
    i.className = "ooxml-numfmt-card", i.style.cssText = "width:460px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", s.appendChild(i), document.body.appendChild(s), this.el = s;
    const r = (l) => {
      l.key === "Escape" && this.close();
    };
    s.addEventListener("mousedown", (l) => {
      l.target === s && this.close();
    }), document.addEventListener("keydown", r, !0), this.cleanup = () => document.removeEventListener("keydown", r, !0), this.render(i);
  }
  currentCode() {
    return ap(this.cat, this.opt);
  }
  render(e) {
    var r, l, a;
    const t = this.currentCode(), n = ht(this.previewValue(), t, this.date1904).text, s = Object.keys(Bi).map((c) => `<button data-cat="${c}" style="${this.cat === c ? qi : kt};height:28px;padding:0 10px;margin:0 6px 6px 0">${Bi[c]}</button>`).join("");
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      '<span>设置单元格格式</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      `<div style="margin-bottom:10px">${s}</div>`,
      '<div data-opts style="min-height:40px"></div>',
      `<div style="margin-top:12px;display:flex;align-items:center;gap:8px"><span style="flex:0 0 64px;color:#475467">格式代码</span><input data-code value="${nt(t)}" style="${kt};height:30px;flex:1;font-family:Consolas,monospace"></div>`,
      `<div style="margin-top:10px;padding:10px 12px;background:#f7f8fa;border:1px solid #eef0f2;border-radius:6px"><span style="color:#98a2b3">预览:</span> <b data-preview style="font-size:15px">${nt(n)}</b></div>`,
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      `<button data-cancel style="${kt}">取消</button><button data-ok style="${qi}">确定</button>`,
      "</div>"
    ].join(""), this.renderOpts(e.querySelector("[data-opts]")), e.querySelectorAll("[data-cat]").forEach((c) => c.addEventListener("click", () => {
      this.cat = c.dataset.cat, this.cat === "date" && (this.opt.preset = Wi[0][0]), this.cat === "time" && (this.opt.preset = Ui[0][0]), this.render(e);
    })), (r = e.querySelector("[data-close]")) == null || r.addEventListener("click", () => this.close()), (l = e.querySelector("[data-cancel]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-ok]")) == null || a.addEventListener("click", () => {
      const c = e.querySelector("[data-code]").value.trim();
      this.onApply(c || "General"), this.close();
    });
    const i = e.querySelector("[data-code]");
    i.addEventListener("input", () => {
      e.querySelector("[data-preview]").textContent = ht(this.previewValue(), i.value, this.date1904).text;
    });
  }
  renderOpts(e) {
    const t = (s, i) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><span style="flex:0 0 64px;color:#475467">${s}</span>${i}</div>`, n = [];
    if ((this.cat === "number" || this.cat === "currency" || this.cat === "percent") && n.push(t("小数位数", `<input data-o="decimals" type="number" min="0" max="10" value="${this.opt.decimals}" style="${kt};height:28px;width:70px">`)), (this.cat === "number" || this.cat === "currency") && n.push(t("选项", `<label style="cursor:pointer"><input type="checkbox" data-o="thousands"${this.opt.thousands ? " checked" : ""}> 千分位</label> <label style="cursor:pointer;margin-left:14px"><input type="checkbox" data-o="negRed"${this.opt.negRed ? " checked" : ""}> 负数红色</label>`)), this.cat === "currency" && n.push(t("货币符号", `<select data-o="symbol" style="${kt};height:30px">${lp.map(([s, i]) => `<option value="${s}"${s === this.opt.symbol ? " selected" : ""}>${nt(i)}</option>`).join("")}</select>`)), this.cat === "date" || this.cat === "time") {
      const s = this.cat === "date" ? Wi : Ui;
      n.push(`<div style="display:flex;flex-direction:column;gap:4px">${s.map(([i, r]) => `<label style="cursor:pointer;padding:5px 8px;border:1px solid ${i === this.opt.preset ? "#21a366" : "#eef0f2"};border-radius:5px;display:flex;justify-content:space-between"><span><input type="radio" name="nfp" data-o="preset" value="${nt(i)}"${i === this.opt.preset ? " checked" : ""}> ${nt(i)}</span><span style="color:#98a2b3">${nt(r)}</span></label>`).join("")}</div>`);
    }
    this.cat === "general" && n.push('<div style="color:#98a2b3">不设特定格式,按内容自动显示。</div>'), this.cat === "text" && n.push('<div style="color:#98a2b3">按文本显示,数字也不参与计算格式。</div>'), this.cat === "custom" && n.push('<div style="color:#98a2b3">在下方「格式代码」里直接输入自定义格式(如 <code>0.00"元"</code>、<code>#,##0;[Red]-#,##0</code>)。</div>'), e.innerHTML = n.join(""), e.querySelectorAll("[data-o]").forEach((s) => s.addEventListener("change", () => {
      const i = s, r = i.dataset.o;
      r === "thousands" || r === "negRed" ? this.opt[r] = i.checked : r === "decimals" ? this.opt.decimals = Math.max(0, Math.min(10, Number(i.value) || 0)) : this.opt[r] = i.value;
      const l = e.closest(".ooxml-numfmt-card");
      l && this.render(l);
    }));
  }
  /** 预览取值:活动格有数值/日期就用它,否则按分类给个内置示例。 */
  previewValue() {
    const e = this.sample;
    return this.cat === "date" || this.cat === "time" ? e instanceof Date ? e : new Date(Date.UTC(2026, 3, 1, 13, 5, 9)) : this.cat === "text" ? typeof e == "string" ? e : String(e != null ? e : "示例文本") : typeof e == "number" ? e : 1234.567;
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function _i(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
const Co = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit";
class hp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  show(e) {
    var l, a, c, d;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-comment-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-comment-card", n.style.cssText = "width:380px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", n.innerHTML = [
      `<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">${e.current ? "编辑" : "插入"}批注 · ${_i(e.cellRef)}<button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>`,
      '<div style="padding:14px 16px">',
      `<textarea data-text rows="5" placeholder="输入批注…" style="width:100%;box-sizing:border-box;border:1px solid #d0d5dd;border-radius:6px;padding:8px;font:inherit;resize:vertical">${_i(e.current)}</textarea>`,
      "</div>",
      '<div style="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-del style="${Co};border:1px solid #fda29b;background:#fff;color:#d92d20"${e.current ? "" : ' disabled style="display:none"'}>删除批注</button>`,
      `<div style="display:flex;gap:8px;margin-left:auto"><button data-cancel style="${Co};border:1px solid #d0d5dd;background:#fff;color:#1f2329">取消</button><button data-ok style="${Co};border:1px solid #1b7f4d;background:#21a366;color:#fff">确定</button></div>`,
      "</div>"
    ].join(""), t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = n.querySelector("[data-text]"), i = (h) => {
      e.onApply(h), this.close();
    }, r = (h) => {
      h.key === "Escape" ? (h.preventDefault(), this.close()) : h.key === "Enter" && (h.ctrlKey || h.metaKey) && (h.preventDefault(), i(s.value));
    };
    (l = n.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = n.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.close()), (c = n.querySelector("[data-ok]")) == null || c.addEventListener("click", () => i(s.value)), (d = n.querySelector("[data-del]")) == null || d.addEventListener("click", () => i("")), t.addEventListener("mousedown", (h) => {
      h.target === t && this.close();
    }), document.addEventListener("keydown", r, !0), this.cleanup = () => document.removeEventListener("keydown", r, !0), setTimeout(() => {
      s.focus(), s.setSelectionRange(s.value.length, s.value.length);
    }, 0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function ji(o) {
  let e = 0;
  for (const t of o) e = e * 26 + (t.charCodeAt(0) - 64);
  return e - 1;
}
const Rl = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", fp = `${Rl};border:1px solid #1b7f4d;background:#21a366;color:#fff`, So = `${Rl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Ct = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit;width:70px";
function up(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function pp(o) {
  return `${Xe(o.left)}${o.top + 1}:${Xe(o.right)}${o.bottom + 1}`;
}
function gp(o) {
  const e = /^\s*(\d+)\s*[:\-]?\s*(\d+)?\s*$/.exec(o);
  if (!e) return;
  const t = Number(e[1]) - 1, n = e[2] ? Number(e[2]) - 1 : t;
  return t >= 0 && n >= t ? [t, n] : void 0;
}
function mp(o) {
  const e = /^\s*([A-Za-z]+)\s*[:\-]?\s*([A-Za-z]+)?\s*$/.exec(o);
  if (!e) return;
  const t = ji(e[1].toUpperCase()), n = e[2] ? ji(e[2].toUpperCase()) : t;
  return t >= 0 && n >= t ? [t, n] : void 0;
}
class bp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "ps", {});
    C(this, "o");
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.ps = JSON.parse(JSON.stringify(e.current || {}));
    const t = document.createElement("div");
    t.className = "ooxml-pagesetup-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-pagesetup-card", n.style.cssText = "width:480px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (i) => {
      i.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (i) => {
      i.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), this.render(n);
  }
  render(e) {
    var r, l, a, c, d, h, f, u, p;
    const t = this.ps, n = t.margins || { top: 19, right: 18, bottom: 19, left: 18, header: 8, footer: 8 }, s = (g, b) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:9px"><span style="flex:0 0 74px;color:#475467">${g}</span>${b}</div>`, i = (g, b) => `<label style="display:inline-flex;align-items:center;gap:4px">${b}<input data-m="${g}" type="number" min="0" step="1" value="${n[g]}" style="${Ct};width:56px"></label>`;
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>页面设置</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      s("方向", `<label style="margin-right:14px;cursor:pointer"><input type="radio" name="ori" data-ori="portrait"${t.orientation !== "landscape" ? " checked" : ""}> 纵向</label><label style="cursor:pointer"><input type="radio" name="ori" data-ori="landscape"${t.orientation === "landscape" ? " checked" : ""}> 横向</label>`),
      s("纸张", `<select data-paper style="${Ct};width:120px">${["a4", "a3", "letter"].map((g) => `<option value="${g}"${(Array.isArray(t.paperFormat) ? "a4" : t.paperFormat || "a4") === g ? " selected" : ""}>${g.toUpperCase()}</option>`).join("")}</select>`),
      s("缩放", `<label style="display:inline-flex;align-items:center;gap:4px"><input data-scale type="number" min="10" max="400" value="${(r = t.scale) != null ? r : 100}" style="${Ct};width:64px"${t.fitToPage ? " disabled" : ""}> %</label><label style="margin-left:14px;cursor:pointer"><input data-fit type="checkbox"${t.fitToPage ? " checked" : ""}> 适应一页宽</label>`),
      s("页边距", `<div style="display:flex;flex-wrap:wrap;gap:6px 10px">${i("top", "上")}${i("bottom", "下")}${i("left", "左")}${i("right", "右")}${i("header", "页眉")}${i("footer", "页脚")}<span style="color:#98a2b3;align-self:center">mm</span></div>`),
      s("打印区域", `<span data-pa style="flex:1;color:${t.printArea ? "#1f2329" : "#98a2b3"}">${t.printArea ? up(pp(t.printArea)) : "(整表)"}</span><button data-pa-sel style="${So};height:26px;padding:0 10px"${this.o.hasSelection ? "" : " disabled"}>设为当前选区</button>${t.printArea ? '<button data-pa-clr style="' + So + ';height:26px;padding:0 8px">清除</button>' : ""}`),
      s("打印标题", `<label style="display:inline-flex;align-items:center;gap:4px">顶端行<input data-tr value="${t.printTitleRows ? t.printTitleRows[0] + 1 + ":" + (t.printTitleRows[1] + 1) : ""}" placeholder="如 1:1" style="${Ct};width:64px"></label><label style="display:inline-flex;align-items:center;gap:4px;margin-left:10px">左侧列<input data-tc value="${t.printTitleCols ? Xe(t.printTitleCols[0]) + ":" + Xe(t.printTitleCols[1]) : ""}" placeholder="如 A:A" style="${Ct};width:64px"></label>`),
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${So}">取消</button><button data-ok style="${fp}">确定</button>`,
      "</div>"
    ].join(""), (l = e.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.close()), e.querySelectorAll("[data-ori]").forEach((g) => g.addEventListener("change", () => {
      this.ps.orientation = g.dataset.ori;
    })), (c = e.querySelector("[data-paper]")) == null || c.addEventListener("change", (g) => {
      this.ps.paperFormat = g.target.value;
    }), (d = e.querySelector("[data-scale]")) == null || d.addEventListener("change", (g) => {
      this.ps.scale = Math.max(10, Math.min(400, Number(g.target.value) || 100));
    }), (h = e.querySelector("[data-fit]")) == null || h.addEventListener("change", (g) => {
      this.ps.fitToPage = g.target.checked, this.render(e);
    }), e.querySelectorAll("[data-m]").forEach((g) => g.addEventListener("change", () => {
      const b = g, m = this.ps.margins || { top: 19, right: 18, bottom: 19, left: 18, header: 8, footer: 8 };
      this.ps.margins = z(R({}, m), { [b.dataset.m]: Math.max(0, Number(b.value) || 0) });
    })), (f = e.querySelector("[data-pa-sel]")) == null || f.addEventListener("click", () => {
      this.o.onPrintAreaFromSelection(), this.close();
    }), (u = e.querySelector("[data-pa-clr]")) == null || u.addEventListener("click", () => {
      delete this.ps.printArea, this.render(e);
    }), (p = e.querySelector("[data-ok]")) == null || p.addEventListener("click", () => {
      const g = e.querySelector("[data-tr]").value, b = e.querySelector("[data-tc]").value, m = gp(g), y = mp(b);
      m ? this.ps.printTitleRows = m : delete this.ps.printTitleRows, y ? this.ps.printTitleCols = y : delete this.ps.printTitleCols, this.o.onApply(this.ps), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Fl = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", yp = `${Fl};border:1px solid #1b7f4d;background:#21a366;color:#fff`, tn = `${Fl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Eo = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit";
function Vi(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class xp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "o");
    C(this, "bg");
    C(this, "wm", { text: "", fontSize: 48, opacity: 0.12, color: "#888888", angle: -30 });
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.bg = e.background ? R({}, e.background) : void 0, this.wm = R({ text: "", fontSize: 48, opacity: 0.12, color: "#888888", angle: -30 }, e.watermark || {});
    const t = document.createElement("div");
    t.className = "ooxml-background-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-background-card", n.style.cssText = "width:440px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (i) => {
      i.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (i) => {
      i.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), this.render(n);
  }
  render(e) {
    var s, i, r, l, a, c, d, h, f, u, p, g, b;
    const t = this.wm, n = (s = this.bg) != null && s.src ? `<img src="${Vi(this.bg.src)}" style="max-width:80px;max-height:44px;border:1px solid #eef0f2;border-radius:4px;vertical-align:middle">` : '<span style="color:#98a2b3">未设置</span>';
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>背景 / 水印</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      // 背景图片
      '<div style="font-weight:600;margin-bottom:6px">工作表背景图片</div>',
      `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">${n}<button data-bg-pick style="${tn};height:28px;padding:0 12px">选择图片…</button>${this.bg ? '<button data-bg-clr style="' + tn + ';height:28px;padding:0 10px">清除</button>' : ""}</div>`,
      '<div style="height:1px;background:#eef0f2;margin:6px 0 12px"></div>',
      // 水印
      '<div style="font-weight:600;margin-bottom:6px">文字水印 <span style="font-weight:400;color:#98a2b3;font-size:12px">(仅屏幕显示,不导出)</span></div>',
      `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="flex:0 0 48px;color:#475467">文字</span><input data-wm-text value="${Vi(t.text || "")}" placeholder="如 机密 / DRAFT" style="${Eo};flex:1"></div>`,
      '<div style="display:flex;flex-wrap:wrap;gap:8px 14px;margin-bottom:6px">',
      `<label style="display:inline-flex;align-items:center;gap:4px">字号<input data-wm-size type="number" min="12" max="200" value="${t.fontSize}" style="${Eo};width:60px"></label>`,
      `<label style="display:inline-flex;align-items:center;gap:4px">角度<input data-wm-angle type="number" min="-90" max="90" value="${t.angle}" style="${Eo};width:56px"></label>`,
      `<label style="display:inline-flex;align-items:center;gap:4px">透明<input data-wm-op type="range" min="3" max="60" value="${Math.round(((i = t.opacity) != null ? i : 0.12) * 100)}"></label>`,
      `<label style="display:inline-flex;align-items:center;gap:4px">颜色<input data-wm-color type="color" value="${t.color || "#888888"}"></label>`,
      "</div>",
      "</div>",
      '<div style="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-wm-clr style="${tn}">清除水印</button><div style="display:flex;gap:8px"><button data-cancel style="${tn}">取消</button><button data-ok style="${yp}">确定</button></div>`,
      "</div>"
    ].join(""), (r = e.querySelector("[data-close]")) == null || r.addEventListener("click", () => this.close()), (l = e.querySelector("[data-cancel]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-bg-pick]")) == null || a.addEventListener("click", () => {
      const m = document.createElement("input");
      m.type = "file", m.accept = "image/*", m.onchange = () => {
        var v;
        const y = (v = m.files) == null ? void 0 : v[0];
        if (!y) return;
        const w = new FileReader();
        w.onload = () => {
          this.bg = { src: String(w.result), mime: y.type }, this.render(e);
        }, w.readAsDataURL(y);
      }, m.click();
    }), (c = e.querySelector("[data-bg-clr]")) == null || c.addEventListener("click", () => {
      this.bg = void 0, this.render(e);
    }), (d = e.querySelector("[data-wm-text]")) == null || d.addEventListener("input", (m) => {
      this.wm.text = m.target.value;
    }), (h = e.querySelector("[data-wm-size]")) == null || h.addEventListener("change", (m) => {
      this.wm.fontSize = Math.max(12, Math.min(200, Number(m.target.value) || 48));
    }), (f = e.querySelector("[data-wm-angle]")) == null || f.addEventListener("change", (m) => {
      this.wm.angle = Math.max(-90, Math.min(90, Number(m.target.value) || 0));
    }), (u = e.querySelector("[data-wm-op]")) == null || u.addEventListener("input", (m) => {
      this.wm.opacity = Number(m.target.value) / 100;
    }), (p = e.querySelector("[data-wm-color]")) == null || p.addEventListener("input", (m) => {
      this.wm.color = m.target.value;
    }), (g = e.querySelector("[data-wm-clr]")) == null || g.addEventListener("click", () => {
      this.o.onApplyWatermark(void 0), this.wm.text = "", this.render(e);
    }), (b = e.querySelector("[data-ok]")) == null || b.addEventListener("click", () => {
      this.o.onApplyBackground(this.bg), this.o.onApplyWatermark(this.wm.text.trim() ? this.wm : void 0), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Ll = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", wp = `${Ll};border:1px solid #1b7f4d;background:#21a366;color:#fff`, Yi = `${Ll};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Xi = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit", vp = "width:26px;height:26px;border:1px solid #d0d5dd;background:#fff;border-radius:4px;cursor:pointer;font:inherit;color:#475467";
function kp(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class Cp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "o");
    C(this, "keys", []);
  }
  show(e) {
    if (typeof document == "undefined" || !e.columns.length) return;
    this.close(), this.o = e, this.keys = [{ col: e.columns[0].index, dir: "asc" }];
    const t = document.createElement("div");
    t.className = "ooxml-sort-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-sort-card", n.style.cssText = "width:460px;max-width:94vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (i) => {
      i.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (i) => {
      i.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), this.render(n);
  }
  render(e) {
    var s, i, r, l;
    const t = (a) => this.o.columns.map((c) => `<option value="${c.index}"${c.index === a ? " selected" : ""}>${kp(c.label)}</option>`).join(""), n = this.keys.map((a, c) => [
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">',
      `<span style="flex:0 0 52px;color:#475467">${c === 0 ? "主要" : "次要"}</span>`,
      `<select data-col="${c}" style="${Xi};flex:1">${t(a.col)}</select>`,
      `<select data-dir="${c}" style="${Xi};width:88px"><option value="asc"${a.dir === "asc" ? " selected" : ""}>升序</option><option value="desc"${a.dir === "desc" ? " selected" : ""}>降序</option></select>`,
      `<button data-del="${c}" style="${vp};color:#d92d20"${this.keys.length === 1 ? " disabled" : ""}>✕</button>`,
      "</div>"
    ].join("")).join("");
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>排序</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      n,
      `<button data-add style="${Yi};height:28px;padding:0 12px;margin-top:2px">＋ 添加条件</button>`,
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${Yi}">取消</button><button data-ok style="${wp}">确定</button>`,
      "</div>"
    ].join(""), (s = e.querySelector("[data-close]")) == null || s.addEventListener("click", () => this.close()), (i = e.querySelector("[data-cancel]")) == null || i.addEventListener("click", () => this.close()), e.querySelectorAll("[data-col]").forEach((a) => a.addEventListener("change", (c) => {
      this.keys[Number(a.dataset.col)].col = Number(c.target.value);
    })), e.querySelectorAll("[data-dir]").forEach((a) => a.addEventListener("change", (c) => {
      this.keys[Number(a.dataset.dir)].dir = c.target.value;
    })), e.querySelectorAll("[data-del]").forEach((a) => a.addEventListener("click", () => {
      this.keys.splice(Number(a.dataset.del), 1), this.render(e);
    })), (r = e.querySelector("[data-add]")) == null || r.addEventListener("click", () => {
      var d;
      const a = new Set(this.keys.map((h) => h.col)), c = (d = this.o.columns.find((h) => !a.has(h.index))) != null ? d : this.o.columns[0];
      this.keys.push({ col: c.index, dir: "asc" }), this.render(e);
    }), (l = e.querySelector("[data-ok]")) == null || l.addEventListener("click", () => {
      this.o.onApply(this.keys.slice()), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Sp(o) {
  switch (o) {
    case "solid":
      return "thin";
    case "dotted":
      return "dotted";
    case "dashed":
      return "dashed";
    case "double":
      return "double";
    case "none":
    case "hidden":
      return null;
    default:
      return "thin";
  }
}
function Gi(o) {
  if (!o) return;
  const e = /\b(solid|dotted|dashed|double|none|hidden)\b/i.exec(o), t = e ? Sp(e[1].toLowerCase()) : null;
  if (!t) return;
  const n = /#[0-9a-f]{3,8}\b|rgba?\([^)]+\)/i.exec(o);
  return { style: t, color: n && Pt(n[0]) || "#000000" };
}
function Ep(o) {
  const e = /* @__PURE__ */ new Map();
  let t = "";
  return o.querySelectorAll("style").forEach((n) => {
    var l;
    const s = (n.textContent || "").replace(/<!--|-->/g, "").replace(/\/\*[\s\S]*?\*\//g, ""), i = /([^{}]+)\{([^{}]*)\}/g;
    let r;
    for (; r = i.exec(s); ) {
      const a = r[2].trim();
      if (a)
        for (const c of r[1].split(",")) {
          const d = c.trim(), h = (l = /\.([A-Za-z0-9_-]+)\s*$/.exec(d)) == null ? void 0 : l[1];
          h ? e.set(h, e.has(h) ? `${e.get(h)};${a}` : a) : /(^|\s)td$/i.test(d) && (t = t ? `${t};${a}` : a);
        }
    }
  }), { classes: e, tdDefault: t };
}
function Tp(o, e, t) {
  const n = (o.getAttribute("class") || "").split(/\s+/).filter(Boolean), s = e.size ? n.map((l) => e.get(l)).filter(Boolean).join(";") : "", i = o.getAttribute("style") || "", r = [t, s, i].filter(Boolean).join(";");
  return (t || s) && (o.style.cssText = r), r;
}
function $p(o) {
  return o.trim().replace(/^"|"$/g, "").replace(/\\([0-9a-fA-F]{4})/g, (e, t) => String.fromCharCode(parseInt(t, 16))).replace(/\\(.)/g, "$1");
}
function Mp(o) {
  const e = /mso-number-format:\s*("(?:\\.|[^"\\])*"|[^;]+)/gi;
  let t, n;
  for (; n = e.exec(o); ) t = n[1];
  if (t === void 0) return;
  const s = $p(t);
  return s && !/^general$/i.test(s) ? s : void 0;
}
function Ip(o) {
  var e, t;
  for (const n of Array.from(o.childNodes)) {
    if (n.nodeType !== 8) continue;
    const s = n.data, i = /o:gfxdata="([^"]+)"/.exec(s);
    if (i)
      try {
        const r = Ye(kn(i[1].replace(/\s+/g, "")));
        for (const [l, a] of Object.entries(r)) {
          const c = (t = (e = /\.(png|jpe?g|gif|bmp)$/i.exec(l)) == null ? void 0 : e[1]) == null ? void 0 : t.toLowerCase();
          if (c && a.length)
            return `data:${c === "jpg" || c === "jpeg" ? "image/jpeg" : `image/${c}`};base64,${ut(a)}`;
        }
      } catch (r) {
      }
  }
  return null;
}
function Ap(o) {
  var p;
  const e = o.style, t = {}, n = {}, s = e.fontWeight;
  (s === "bold" || s === "bolder" || s && Number(s) >= 600) && (n.bold = !0), o.querySelector("b,strong") && (n.bold = !0), (e.fontStyle === "italic" || o.querySelector("i,em")) && (n.italic = !0);
  const i = (e.textDecorationLine || e.textDecoration || "") + (o.querySelector("u") ? " underline" : "");
  /underline/.test(i) && (n.underline = !0), /line-through/.test(i) && (n.strike = !0);
  const r = Pt(e.color);
  if (r && (n.color = r), e.fontFamily && (n.name = e.fontFamily.split(",")[0].trim().replace(/['"]/g, "")), e.fontSize) {
    const g = parseFloat(e.fontSize);
    g > 0 && (n.size = /pt\b/i.test(e.fontSize) ? Math.round(g) : Math.round(g * 72 / 96));
  }
  Object.keys(n).length && (t.font = n);
  const l = Pt(e.backgroundColor);
  l && (t.fill = { type: "solid", fgColor: l }), (e.textAlign === "left" || e.textAlign === "center" || e.textAlign === "right") && (t.hAlign = e.textAlign);
  const a = e.verticalAlign;
  a === "top" ? t.vAlign = "top" : a === "middle" ? t.vAlign = "middle" : a === "bottom" && (t.vAlign = "bottom");
  const c = e.whiteSpace;
  (c === "normal" || c === "pre-wrap" || c === "pre-line") && (t.wrapText = !0);
  const d = {}, h = [
    ["top", e.borderTop],
    ["right", e.borderRight],
    ["bottom", e.borderBottom],
    ["left", e.borderLeft]
  ];
  let f = !1;
  const u = e.border ? Gi(e.border) : void 0;
  for (const [g, b] of h) {
    const m = (p = Gi(b)) != null ? p : u;
    m && (d[g] = m, f = !0);
  }
  return f && (t.borders = d), Object.keys(t).length ? t : null;
}
function Rp(o) {
  var s;
  const e = o.getAttribute("x:num");
  if (e != null && e !== "" && !isNaN(Number(e))) return Number(e);
  const t = o.getAttribute("x:fmla");
  if (t) return t[0] === "=" ? t : "=" + t;
  const n = ((s = o.textContent) != null ? s : "").replace(/ /g, " ").trim();
  return n === "" ? null : n;
}
function Fp(o) {
  var g, b, m, y;
  if (typeof DOMParser == "undefined" || !o) return null;
  let e;
  try {
    e = new DOMParser().parseFromString(o, "text/html");
  } catch (w) {
    return null;
  }
  const t = e.querySelector("table");
  if (!t) return null;
  const { classes: n, tdDefault: s } = Ep(e), i = [], r = [], l = [], a = [], c = [], d = [], h = /* @__PURE__ */ new Set();
  for (const w of Array.from(t.querySelectorAll("col"))) {
    const v = parseInt(w.getAttribute("width") || "", 10), x = Math.max(1, parseInt(w.getAttribute("span") || "1", 10) || 1);
    for (let S = 0; S < x; S++) c.push(Number.isFinite(v) && v > 0 ? v : 0);
  }
  const f = Array.from(t.querySelectorAll("tr"));
  let u = 0;
  for (const w of f) {
    const v = Array.from(w.children).filter((M) => M.tagName === "TD" || M.tagName === "TH");
    if (!v.length) continue;
    const x = parseInt(w.getAttribute("height") || v[0].getAttribute("height") || "", 10);
    Number.isFinite(x) && x > 0 && (d[u] = x);
    const S = (g = i[u]) != null ? g : i[u] = [];
    let k = 0;
    for (const M of v) {
      for (; h.has(`${u}:${k}`); )
        S[k] = (b = S[k]) != null ? b : null, k++;
      S[k] = Rp(M);
      const E = Tp(M, n, s), $ = (m = Ap(M)) != null ? m : {}, T = Mp(E);
      T && ($.numFmt = T), Object.keys($).length && r.push({ row: u, col: k, patch: $ });
      const I = (y = M.querySelector("img")) == null ? void 0 : y.getAttribute("src"), A = I && I.startsWith("data:") ? I : Ip(M);
      A && a.push({ row: u, col: k, dataUrl: A });
      const L = Math.max(1, parseInt(M.getAttribute("rowspan") || "1", 10) || 1), N = Math.max(1, parseInt(M.getAttribute("colspan") || "1", 10) || 1);
      if (L > 1 || N > 1) {
        l.push({ top: u, left: k, bottom: u + L - 1, right: k + N - 1 });
        for (let F = 0; F < L; F++)
          for (let H = 0; H < N; H++) (F || H) && h.add(`${u + F}:${k + H}`);
      }
      k += N;
    }
    u++;
  }
  if (!i.length) return null;
  const p = i.reduce((w, v) => Math.max(w, v.length), 0);
  for (const w of i) for (let v = 0; v < p; v++) w[v] === void 0 && (w[v] = null);
  return { values: i, styles: r, merges: l, images: a, colWidths: c, rowHeights: d };
}
async function Lp(o, e) {
  var s;
  const t = (s = globalThis.navigator) == null ? void 0 : s.clipboard;
  if (!t) return !1;
  const n = globalThis.ClipboardItem;
  return n && t.write && e != null ? (await t.write([
    new n({
      "text/plain": new Blob([o], { type: "text/plain" }),
      "text/html": new Blob([e], { type: "text/html" })
    })
  ]), !0) : t.writeText ? (await t.writeText(o), !0) : !1;
}
function Np(o, e) {
  var l;
  if (typeof document == "undefined") return !1;
  const t = (a) => {
    const c = a.clipboardData;
    c && (c.setData("text/plain", o), e != null && c.setData("text/html", e), a.preventDefault());
  }, n = typeof window != "undefined" ? (l = window.getSelection) == null ? void 0 : l.call(window) : null, s = [];
  if (n) for (let a = 0; a < n.rangeCount; a++) s.push(n.getRangeAt(a));
  const i = document.createElement("textarea");
  i.value = o, i.setAttribute("readonly", ""), i.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;pointer-events:none;", document.body.appendChild(i);
  let r = !1;
  try {
    document.addEventListener("copy", t), i.focus(), i.select(), i.setSelectionRange(0, i.value.length), r = document.execCommand("copy");
  } catch (a) {
    r = !1;
  } finally {
    if (document.removeEventListener("copy", t), i.remove(), n && s.length) {
      n.removeAllRanges();
      for (const a of s) n.addRange(a);
    }
  }
  return r;
}
async function Ki(o, e) {
  try {
    if (await Lp(o, e)) return !0;
  } catch (t) {
  }
  return Np(o, e);
}
const Nl = { png: "image/png", jpeg: "image/jpeg", webp: "image/webp" };
function Pp(o, e = "png", t = 0.92) {
  var s;
  const n = (s = Nl[e]) != null ? s : "image/png";
  return new Promise((i, r) => {
    o.toBlob(
      (l) => l ? i(l) : r(new Error("canvas.toBlob 返回空")),
      n,
      n === "image/png" ? void 0 : t
    );
  });
}
function pb(o, e = "png", t = 0.92) {
  var s;
  const n = (s = Nl[e]) != null ? s : "image/png";
  return o.toDataURL(n, n === "image/png" ? void 0 : t);
}
function lt(o, e) {
  const t = URL.createObjectURL(o), n = document.createElement("a");
  n.href = t, n.download = e, document.body.appendChild(n), n.click(), n.remove(), setTimeout(() => URL.revokeObjectURL(t), 4e3);
}
function Ji(o) {
  return new Promise((e, t) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.onload = () => e(n), n.onerror = () => t(new Error("图片加载失败: " + o)), n.src = o;
  });
}
const Zi = {
  a4: [210, 297],
  a3: [297, 420],
  letter: [215.9, 279.4]
};
function Pn(o = "a4", e = "portrait") {
  var i;
  const t = Array.isArray(o) ? o : (i = Zi[o]) != null ? i : Zi.a4, [n, s] = t;
  return e === "landscape" ? [Math.max(n, s), Math.min(n, s)] : [Math.min(n, s), Math.max(n, s)];
}
function On(o) {
  var e, t, n, s;
  return typeof o == "number" ? { top: o, right: o, bottom: o, left: o } : { top: (e = o == null ? void 0 : o.top) != null ? e : 10, right: (t = o == null ? void 0 : o.right) != null ? t : 10, bottom: (n = o == null ? void 0 : o.bottom) != null ? n : 10, left: (s = o == null ? void 0 : o.left) != null ? s : 10 };
}
const Oe = 25.4 / 96;
class Op {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-lightbox", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("img");
    n.src = e.src, n.draggable = !1, n.style.cssText = "max-width:88vw;max-height:82vh;object-fit:contain;background:#fff;box-shadow:0 8px 40px rgba(0,0,0,.5);", t.appendChild(n);
    const s = document.createElement("div");
    s.style.cssText = "position:fixed;top:16px;right:20px;display:flex;gap:10px;";
    const i = Qi("⬇ 下载原图");
    i.addEventListener("mousedown", (a) => {
      a.preventDefault(), a.stopPropagation(), this.download(e);
    });
    const r = Qi("✕ 关闭");
    r.addEventListener("mousedown", (a) => {
      a.preventDefault(), a.stopPropagation(), this.close();
    }), s.append(i, r), t.appendChild(s), t.addEventListener("mousedown", (a) => {
      a.target === t && this.close();
    }), document.body.appendChild(t), this.el = t;
    const l = (a) => {
      a.key === "Escape" && this.close();
    };
    document.addEventListener("keydown", l, !0), this.cleanup = () => document.removeEventListener("keydown", l, !0);
  }
  async download(e) {
    var t;
    try {
      const n = await (await fetch(e.src)).blob(), s = (((t = e.mime) == null ? void 0 : t.split("/")[1]) || "png").replace("jpeg", "jpg").replace("svg+xml", "svg");
      lt(n, e.fileName || `image.${s}`);
    } catch (n) {
    }
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Qi(o) {
  const e = document.createElement("button");
  return e.textContent = o, e.style.cssText = "padding:6px 12px;border:none;border-radius:6px;background:rgba(255,255,255,.92);color:#1f2329;font:13px/1.4 -apple-system,'Segoe UI',sans-serif;cursor:pointer;", e;
}
class Hp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "stage", null);
    C(this, "label", null);
    /** 拍平成「表名 + 页 canvas」序列,跨表连续翻页 */
    C(this, "flat", []);
    C(this, "idx", 0);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    if (typeof document == "undefined" || (this.close(), this.flat = e.sheets.flatMap((f) => f.pages.map((u) => ({ sheetName: f.sheetName, canvas: u }))), !this.flat.length)) return;
    this.idx = 0;
    const t = document.createElement("div");
    t.className = "ooxml-print-preview", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.62);display:flex;flex-direction:column;";
    const n = document.createElement("div");
    n.style.cssText = "flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:9px 16px;background:#2b2f33;color:#fff;";
    const s = nn("🖨 打印");
    s.setAttribute("data-print", ""), s.addEventListener("click", () => e.onPrint());
    const i = nn("‹ 上一页"), r = nn("下一页 ›"), l = document.createElement("span");
    l.style.cssText = "font:13px/1.4 -apple-system,'Segoe UI',sans-serif;min-width:130px;text-align:center;opacity:.92", this.label = l, i.addEventListener("click", () => this.go(-1)), r.addEventListener("click", () => this.go(1));
    const a = document.createElement("div");
    a.style.flex = "1";
    const c = nn("✕ 关闭");
    c.setAttribute("data-close", ""), c.addEventListener("click", () => this.close()), n.append(s, i, l, r, a, c);
    const d = document.createElement("div");
    d.className = "ooxml-print-preview-stage", d.style.cssText = "flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:22px;", this.stage = d, t.append(n, d), document.body.appendChild(t), this.el = t, this.render();
    const h = (f) => {
      f.key === "Escape" ? this.close() : f.key === "ArrowRight" || f.key === "PageDown" ? (f.preventDefault(), this.go(1)) : (f.key === "ArrowLeft" || f.key === "PageUp") && (f.preventDefault(), this.go(-1));
    };
    document.addEventListener("keydown", h, !0), this.cleanup = () => document.removeEventListener("keydown", h, !0);
  }
  go(e) {
    this.idx = Math.max(0, Math.min(this.flat.length - 1, this.idx + e)), this.render();
  }
  render() {
    if (!this.stage) return;
    const e = this.flat[this.idx];
    this.stage.innerHTML = "", e.canvas.style.cssText = "max-width:100%;height:auto;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.4);", this.stage.appendChild(e.canvas), this.label && (this.label.textContent = `${e.sheetName} · 第 ${this.idx + 1} / ${this.flat.length} 页`);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.stage = null, this.label = null, this.flat = [];
  }
  dispose() {
    this.close();
  }
}
function nn(o) {
  const e = document.createElement("button");
  return e.type = "button", e.textContent = o, e.style.cssText = "padding:6px 12px;border:none;border-radius:6px;background:rgba(255,255,255,.92);color:#1f2329;font:13px/1.4 -apple-system,'Segoe UI',sans-serif;cursor:pointer;", e;
}
const un = [
  { key: "common", name: "常用", fns: ["SUM", "AVERAGE", "COUNT", "IF", "MAX", "MIN", "VLOOKUP", "ROUND", "CONCAT", "TODAY", "LEN", "IFERROR"] },
  { key: "logical", name: "逻辑", fns: ["IF", "IFS", "IFERROR", "IFNA", "AND", "OR", "NOT", "XOR", "TRUE", "FALSE"] },
  { key: "text", name: "文本", fns: ["CONCAT", "CONCATENATE", "TEXT", "LEN", "LEFT", "RIGHT", "MID", "UPPER", "LOWER", "PROPER", "TRIM", "REPT", "EXACT", "SUBSTITUTE", "FIND", "SEARCH", "VALUE"] },
  { key: "datetime", name: "日期与时间", fns: ["TODAY", "NOW", "DATE", "YEAR", "MONTH", "DAY", "WEEKDAY", "DAYS"] },
  { key: "lookup", name: "查找与引用", fns: ["VLOOKUP", "HLOOKUP", "INDEX", "MATCH", "CHOOSE", "ROWS", "COLUMNS"] },
  { key: "math", name: "数学和三角", fns: ["SUM", "PRODUCT", "SUMPRODUCT", "SUMIF", "ROUND", "ROUNDUP", "ROUNDDOWN", "TRUNC", "ABS", "INT", "MOD", "SQRT", "POWER", "SIGN", "CEILING", "FLOOR"] },
  { key: "stat", name: "统计", fns: ["AVERAGE", "AVERAGEIF", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "MAX", "MIN"] },
  { key: "info", name: "信息", fns: ["ISNUMBER", "ISTEXT", "ISBLANK", "ISLOGICAL", "ISERROR", "ISNA", "ISEVEN", "ISODD", "NA"] }
];
Array.from(
  new Set(un.filter((o) => o.key !== "common").flatMap((o) => o.fns))
).sort();
function Dp(o) {
  const e = ds[o];
  if (!e) return { args: [{ label: "参数1", optional: !1 }], variadic: !0 };
  const t = e.indexOf("("), n = e.lastIndexOf(")"), s = t >= 0 && n > t ? e.slice(t + 1, n).trim() : "";
  if (!s) return { args: [], variadic: !1 };
  const i = s.split(",").map((a) => a.trim()).filter(Boolean), r = [];
  let l = !1;
  for (const a of i) {
    if (a === "…" || a === "...") {
      l = !0;
      continue;
    }
    const c = a.startsWith("[") && a.endsWith("]");
    r.push({ label: c ? a.slice(1, -1) : a, optional: c });
  }
  return { args: r, variadic: l };
}
function er(o) {
  var n;
  const { args: e, variadic: t } = Dp(o);
  return { name: o, signature: (n = ds[o]) != null ? n : `${o}(…)`, args: e, variadic: t };
}
const tr = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:5px;font:inherit;outline:none;box-sizing:border-box", fs = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", zp = `${fs};border:none;background:#217346;color:#fff`, Bp = `${fs};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
function St(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class Wp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "o", null);
    C(this, "search", "");
    C(this, "activeCat", "common");
    C(this, "selected", "");
    C(this, "argVals", []);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var i, r;
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.search = "", this.selected = e.presetName && Yo.includes(e.presetName) ? e.presetName : "", this.activeCat = this.selected && (r = (i = un.find((l) => l.key !== "common" && l.fns.includes(this.selected))) == null ? void 0 : i.key) != null ? r : "common", this.argVals = [];
    const t = document.createElement("div");
    t.className = "ooxml-insertfn-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-insertfn-card", n.style.cssText = "width:640px;max-width:95vw;max-height:90vh;overflow:hidden;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;display:flex;flex-direction:column", n.innerHTML = this.template(), t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (l) => {
      l.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (l) => {
      l.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), this.wire(n), this.renderList(n), this.renderArgs(n);
  }
  template() {
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">插入函数</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="display:flex;flex:1;min-height:340px"><div style="flex:0 0 230px;border-right:1px solid #eef0f2;display:flex;flex-direction:column;padding:10px"><input data-search placeholder="搜索函数…" style="${tr};margin-bottom:8px"><div data-cats style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px"></div><div data-fnlist style="flex:1;overflow:auto;border:1px solid #eef0f2;border-radius:6px"></div></div><div data-argpanel style="flex:1;overflow:auto;padding:14px 16px"></div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Bp}">取消</button><button data-ok style="${zp}">确定</button></div>`;
  }
  wire(e) {
    var n, s, i;
    (n = e.querySelector("[data-close]")) == null || n.addEventListener("click", () => this.close()), (s = e.querySelector("[data-cancel]")) == null || s.addEventListener("click", () => this.close()), (i = e.querySelector("[data-ok]")) == null || i.addEventListener("click", () => {
      var r;
      this.selected && ((r = this.o) == null || r.onInsert(this.assembled()), this.close());
    });
    const t = e.querySelector("[data-search]");
    t == null || t.addEventListener("input", () => {
      this.search = t.value.trim(), this.renderCats(e), this.renderList(e);
    }), this.renderCats(e);
  }
  renderCats(e) {
    const t = e.querySelector("[data-cats]");
    if (t) {
      if (this.search) {
        t.style.display = "none";
        return;
      }
      t.style.display = "flex", t.innerHTML = un.map(
        (n) => `<button data-cat="${n.key}" style="${fs};height:24px;padding:0 8px;font-size:12px;border:1px solid ${n.key === this.activeCat ? "#217346" : "#e2e4e7"};background:${n.key === this.activeCat ? "#e2efe6" : "#fff"};color:${n.key === this.activeCat ? "#217346" : "#475467"}">${n.name}</button>`
      ).join(""), t.querySelectorAll("[data-cat]").forEach((n) => n.addEventListener("click", () => {
        this.activeCat = n.dataset.cat, this.renderCats(e), this.renderList(e);
      }));
    }
  }
  currentFns() {
    var e, t;
    return this.search ? Yo.filter((n) => n.includes(this.search.toUpperCase())) : (t = (e = un.find((n) => n.key === this.activeCat)) == null ? void 0 : e.fns) != null ? t : [];
  }
  renderList(e) {
    const t = e.querySelector("[data-fnlist]");
    if (!t) return;
    const n = this.currentFns();
    t.innerHTML = n.length ? n.map((s) => {
      const i = er(s), r = s === this.selected;
      return `<button data-fn="${s}" title="${St(i.signature)}" style="display:block;width:100%;text-align:left;border:none;border-bottom:1px solid #f4f5f6;background:${r ? "#e2efe6" : "#fff"};cursor:pointer;padding:6px 10px;font:inherit"><b style="color:${r ? "#217346" : "#1f2329"}">${s}</b> <span style="color:#98a2b3;font-size:11px">${St(i.signature.replace(s, "").replace(/^\(|\)$/g, ""))}</span></button>`;
    }).join("") : '<div style="padding:14px;color:#98a2b3">无匹配函数</div>', t.querySelectorAll("[data-fn]").forEach((s) => s.addEventListener("click", () => {
      this.selected = s.dataset.fn, this.argVals = [], this.renderList(e), this.renderArgs(e);
    }));
  }
  renderArgs(e) {
    const t = e.querySelector("[data-argpanel]");
    if (!t) return;
    if (!this.selected) {
      t.innerHTML = '<div style="color:#98a2b3;padding-top:40px;text-align:center">← 从左侧选择一个函数</div>';
      return;
    }
    const n = er(this.selected), s = [...n.args.map((i) => ({ label: i.label, optional: i.optional }))];
    n.variadic && (s.push({ label: "值", optional: !0 }), s.push({ label: "值", optional: !0 })), t.innerHTML = `<div style="font-size:15px;font-weight:600">${this.selected}</div><div style="color:#667085;font-size:12px;margin:2px 0 12px">${St(n.signature)}</div>` + (s.length ? s.map(
      (i, r) => {
        var l;
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="flex:0 0 92px;color:${i.optional ? "#98a2b3" : "#475467"};text-align:right">${St(i.label)}${i.optional ? "(可选)" : ""}</span><input data-arg="${r}" value="${St((l = this.argVals[r]) != null ? l : "")}" placeholder="值 / 单元格 / 区域(如 A1:A9)" style="${tr};flex:1"></div>`;
      }
    ).join("") : '<div style="color:#98a2b3;margin-bottom:12px">此函数无参数</div>') + '<div style="margin-top:14px;padding-top:12px;border-top:1px solid #eef0f2"><div style="display:flex;gap:8px"><span style="flex:0 0 92px;text-align:right;color:#475467">计算结果 =</span><span data-preview style="font-weight:600;color:#217346"></span></div><div style="display:flex;gap:8px;margin-top:6px"><span style="flex:0 0 92px;text-align:right;color:#98a2b3">公式</span><code data-formula style="color:#1f2329;word-break:break-all"></code></div></div>', t.querySelectorAll("[data-arg]").forEach((i) => i.addEventListener("input", () => {
      const r = Number(i.dataset.arg);
      this.argVals[r] = i.value, this.updatePreview(e);
    })), this.updatePreview(e);
  }
  /** 拼出的公式:非空参数按序用逗号连接。 */
  assembled() {
    const e = this.argVals.map((t) => (t != null ? t : "").trim()).filter((t) => t !== "");
    return `=${this.selected}(${e.join(",")})`;
  }
  updatePreview(e) {
    var i, r;
    const t = this.assembled(), n = e.querySelector("[data-formula]"), s = e.querySelector("[data-preview]");
    if (n && (n.textContent = t), s) {
      let l = "";
      try {
        l = (r = (i = this.o) == null ? void 0 : i.preview(t)) != null ? r : "";
      } catch (a) {
        l = "#ERROR";
      }
      s.textContent = l || "(填入参数后预览)";
    }
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.o = null, this.selected = "", this.argVals = [];
  }
  dispose() {
    this.close();
  }
}
const Ge = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:5px;font:inherit;outline:none;box-sizing:border-box", Pl = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Up = `${Pl};border:none;background:#217346;color:#fff`, nr = `${Pl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, qp = [["list", "列表"], ["whole", "整数"], ["decimal", "小数"], ["date", "日期"], ["time", "时间"], ["textLength", "文本长度"], ["custom", "自定义"]], _p = [["between", "介于"], ["notBetween", "未介于"], ["equal", "等于"], ["notEqual", "不等于"], ["greaterThan", "大于"], ["lessThan", "小于"], ["greaterThanOrEqual", "大于或等于"], ["lessThanOrEqual", "小于或等于"]], or = (o) => o === "between" || o === "notBetween";
function ot(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class jp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "o", null);
    C(this, "type", "list");
    C(this, "op", "between");
    C(this, "f1", "");
    C(this, "f2", "");
    C(this, "listSrc", "");
    C(this, "custom", "");
    C(this, "allowBlank", !0);
    C(this, "showErr", !0);
    C(this, "errStyle", "stop");
    C(this, "errMsg", "");
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var r, l, a, c, d, h, f, u, p, g, b, m, y, w;
    if (typeof document == "undefined") return;
    this.close(), this.o = e;
    const t = e.current;
    this.type = (l = (r = e.presetType) != null ? r : t == null ? void 0 : t.type) != null ? l : "list", this.op = (a = t == null ? void 0 : t.operator) != null ? a : "between", this.f1 = t ? String((d = (c = t.formulae) == null ? void 0 : c[0]) != null ? d : "") : "", this.f2 = t ? String((f = (h = t.formulae) == null ? void 0 : h[1]) != null ? f : "") : "", this.listSrc = (t == null ? void 0 : t.type) === "list" ? ((u = t.options) != null ? u : []).join(",") : "", this.custom = (t == null ? void 0 : t.type) === "custom" ? String((g = (p = t.formulae) == null ? void 0 : p[0]) != null ? g : "") : "", this.allowBlank = (b = t == null ? void 0 : t.allowBlank) != null ? b : !0, this.showErr = (m = t == null ? void 0 : t.showErrorMessage) != null ? m : !0, this.errStyle = (y = t == null ? void 0 : t.errorStyle) != null ? y : "stop", this.errMsg = (w = t == null ? void 0 : t.error) != null ? w : "";
    const n = document.createElement("div");
    n.className = "ooxml-datavalid-mask", n.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const s = document.createElement("div");
    s.className = "ooxml-datavalid-card", s.style.cssText = "width:460px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", n.appendChild(s), document.body.appendChild(n), this.el = n;
    const i = (v) => {
      v.key === "Escape" && this.close();
    };
    n.addEventListener("mousedown", (v) => {
      v.target === n && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.render(s);
  }
  render(e) {
    var r, l, a, c, d, h, f, u, p, g, b, m, y, w;
    const t = (v, x) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="flex:0 0 72px;color:#475467">${v}</span><div style="flex:1">${x}</div></div>`, n = (v, x, S) => `<select ${S} style="${Ge};width:100%">${x.map(([k, M]) => `<option value="${k}"${k === v ? " selected" : ""}>${M}</option>`).join("")}</select>`;
    let s = "";
    this.type === "list" ? s = t("来源", `<input data-list value="${ot(this.listSrc)}" placeholder="逗号分隔:苹果,香蕉,橙子" style="${Ge};width:100%">`) : this.type === "custom" ? s = t("公式", `<input data-custom value="${ot(this.custom)}" placeholder="=A1>0" style="${Ge};width:100%">`) : s = t("数据", n(this.op, _p, "data-op")) + (or(this.op) ? t("最小值", `<input data-f1 value="${ot(this.f1)}" style="${Ge};width:100%">`) + t("最大值", `<input data-f2 value="${ot(this.f2)}" style="${Ge};width:100%">`) : t("值", `<input data-f1 value="${ot(this.f1)}" style="${Ge};width:100%">`)), e.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">数据有效性</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:14px 16px">' + t("允许", n(this.type, qp, "data-type")) + s + `<label style="display:flex;align-items:center;gap:6px;margin:4px 0 12px;cursor:pointer"><input type="checkbox" data-blank${this.allowBlank ? " checked" : ""}> 允许空值</label><div style="border-top:1px solid #eef0f2;padding-top:10px"><label style="display:flex;align-items:center;gap:6px;margin-bottom:8px;cursor:pointer"><input type="checkbox" data-showerr${this.showErr ? " checked" : ""}> 输入无效数据时显示出错警告</label>` + t("样式", n(this.errStyle, [["stop", "停止"], ["warning", "警告"], ["information", "信息"]], "data-errstyle")) + t("错误信息", `<input data-errmsg value="${ot(this.errMsg)}" placeholder="(可选)" style="${Ge};width:100%">`) + `</div></div><div style="display:flex;justify-content:space-between;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-clear style="${nr}">全部清除</button><div style="display:flex;gap:10px"><button data-cancel style="${nr}">取消</button><button data-ok style="${Up}">确定</button></div></div>`;
    const i = (v) => e.querySelector(v);
    (r = i("[data-type]")) == null || r.addEventListener("change", (v) => {
      this.type = v.target.value, this.render(e);
    }), (l = i("[data-op]")) == null || l.addEventListener("change", (v) => {
      this.op = v.target.value, this.render(e);
    }), (a = i("[data-f1]")) == null || a.addEventListener("input", (v) => {
      this.f1 = v.target.value;
    }), (c = i("[data-f2]")) == null || c.addEventListener("input", (v) => {
      this.f2 = v.target.value;
    }), (d = i("[data-list]")) == null || d.addEventListener("input", (v) => {
      this.listSrc = v.target.value;
    }), (h = i("[data-custom]")) == null || h.addEventListener("input", (v) => {
      this.custom = v.target.value;
    }), (f = i("[data-blank]")) == null || f.addEventListener("change", (v) => {
      this.allowBlank = v.target.checked;
    }), (u = i("[data-showerr]")) == null || u.addEventListener("change", (v) => {
      this.showErr = v.target.checked;
    }), (p = i("[data-errstyle]")) == null || p.addEventListener("change", (v) => {
      this.errStyle = v.target.value;
    }), (g = i("[data-errmsg]")) == null || g.addEventListener("input", (v) => {
      this.errMsg = v.target.value;
    }), (b = e.querySelector("[data-close]")) == null || b.addEventListener("click", () => this.close()), (m = e.querySelector("[data-cancel]")) == null || m.addEventListener("click", () => this.close()), (y = e.querySelector("[data-clear]")) == null || y.addEventListener("click", () => {
      var v;
      (v = this.o) == null || v.onApply(null), this.close();
    }), (w = e.querySelector("[data-ok]")) == null || w.addEventListener("click", () => {
      var v;
      (v = this.o) == null || v.onApply(this.buildRule()), this.close();
    });
  }
  buildRule() {
    const e = this.type === "list" ? this.listSrc.split(/[,，]/).map((n) => n.trim()).filter(Boolean) : void 0, t = this.type === "list" ? [] : this.type === "custom" ? [this.custom] : or(this.op) ? [this.f1, this.f2] : [this.f1];
    return {
      type: this.type,
      operator: this.type === "list" || this.type === "custom" ? void 0 : this.op,
      formulae: t,
      options: e,
      allowBlank: this.allowBlank,
      showErrorMessage: this.showErr,
      errorStyle: this.showErr ? this.errStyle : void 0,
      error: this.showErr && this.errMsg ? this.errMsg : void 0
    };
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.o = null;
  }
  dispose() {
    this.close();
  }
}
const Ol = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Vp = `${Ol};border:none;background:#217346;color:#fff`, Yp = `${Ol};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
function Xp(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class Gp {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var i, r, l;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-removedup-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-removedup-card", n.style.cssText = "width:360px;max-width:92vw;max-height:88vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", n.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">删除重复项</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><label style="display:flex;align-items:center;gap:6px;margin-bottom:10px;cursor:pointer"><input type="checkbox" data-header checked> 数据包含标题</label><div style="color:#475467;margin-bottom:6px">按下列列判断重复:</div><div style="border:1px solid #eef0f2;border-radius:6px;max-height:220px;overflow:auto;padding:4px">' + e.columns.map((a) => `<label style="display:flex;align-items:center;gap:6px;padding:5px 8px;cursor:pointer"><input type="checkbox" data-col="${a.index}" checked> ${Xp(a.label)}</label>`).join("") + `</div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Yp}">取消</button><button data-ok style="${Vp}">确定</button></div>`, t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (a) => {
      a.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (a) => {
      a.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), (i = n.querySelector("[data-close]")) == null || i.addEventListener("click", () => this.close()), (r = n.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = n.querySelector("[data-ok]")) == null || l.addEventListener("click", () => {
      const a = n.querySelector("[data-header]").checked, c = Array.from(n.querySelectorAll("[data-col]")).filter((d) => d.checked).map((d) => Number(d.dataset.col));
      e.onApply(c, a), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Kp = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:5px;font:inherit;outline:none;box-sizing:border-box", Hl = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Jp = `${Hl};border:none;background:#217346;color:#fff`, Zp = `${Hl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Qp = [["	", "制表符 Tab"], [",", "逗号"], [";", "分号"], [" ", "空格"]];
class eg {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var i, r, l;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-t2c-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-t2c-card", n.style.cssText = "width:340px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.7 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", n.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">文本分列(按分隔符)</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><div style="color:#475467;margin-bottom:8px">分隔符:</div>' + Qp.map(([a, c], d) => `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-bottom:4px"><input type="radio" name="dv-delim" data-delim="${a === "	" ? "TAB" : a === " " ? "SPACE" : a}"${d === 1 ? " checked" : ""}> ${c}</label>`).join("") + `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:2px"><input type="radio" name="dv-delim" data-delim="CUSTOM"> 其他 <input data-custom placeholder="自定义" maxlength="4" style="${Kp};width:70px"></label></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Zp}">取消</button><button data-ok style="${Jp}">确定</button></div>`, t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (a) => {
      a.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (a) => {
      a.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), (i = n.querySelector("[data-close]")) == null || i.addEventListener("click", () => this.close()), (r = n.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = n.querySelector("[data-ok]")) == null || l.addEventListener("click", () => {
      var h;
      const a = n.querySelector('[name="dv-delim"]:checked'), c = (h = a == null ? void 0 : a.dataset.delim) != null ? h : ",", d = c === "TAB" ? "	" : c === "SPACE" ? " " : c === "CUSTOM" ? n.querySelector("[data-custom]").value || "" : c;
      d && e.onApply(d), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Dl = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", sr = `${Dl};border:none;background:#217346;color:#fff`, ir = `${Dl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, To = "width:100%;box-sizing:border-box;height:30px;padding:0 10px;border:1px solid #d0d5dd;border-radius:5px;font:inherit", rr = [
  { key: "selectLockedCells", label: "选定锁定单元格", def: !0 },
  { key: "selectUnlockedCells", label: "选定未锁定的单元格", def: !0 },
  { key: "formatCells", label: "设置单元格格式", def: !1 },
  { key: "formatColumns", label: "设置列格式", def: !1 },
  { key: "formatRows", label: "设置行格式", def: !1 },
  { key: "insertColumns", label: "插入列", def: !1 },
  { key: "insertRows", label: "插入行", def: !1 },
  { key: "deleteColumns", label: "删除列", def: !1 },
  { key: "deleteRows", label: "删除行", def: !1 },
  { key: "sort", label: "排序", def: !1 },
  { key: "autoFilter", label: "使用自动筛选", def: !1 }
];
class tg {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var i, r, l, a;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-protectsheet-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.className = "ooxml-protectsheet-card", n.style.cssText = "width:360px;max-width:92vw;max-height:88vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", e.mode === "unprotect" ? n.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">撤销工作表保护</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:14px 16px">' + (e.hasPassword ? `<div style="margin-bottom:6px;color:#475467">密码:</div><input type="password" data-pwd style="${To}" autofocus>` : '<div style="color:#475467">确定要撤销对该工作表的保护吗?</div>') + `</div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${ir}">取消</button><button data-ok style="${sr}">确定</button></div>` : n.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">保护工作表</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><div style="margin-bottom:6px;color:#475467">取消工作表保护时使用的密码(可选):</div><input type="password" data-pwd style="${To};margin-bottom:8px" placeholder="密码" autofocus><input type="password" data-pwd2 style="${To}" placeholder="再次输入密码"><div data-err style="color:#d92d20;min-height:16px;margin-top:4px;font-size:12px"></div><div style="margin:6px 0;color:#475467">允许此工作表的所有用户进行:</div><div style="border:1px solid #eef0f2;border-radius:6px;max-height:200px;overflow:auto;padding:4px">` + rr.map((c) => `<label style="display:flex;align-items:center;gap:6px;padding:4px 8px;cursor:pointer"><input type="checkbox" data-allow="${c.key}"${c.def ? " checked" : ""}> ${c.label}</label>`).join("") + `</div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${ir}">取消</button><button data-ok style="${sr}">确定</button></div>`, t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (c) => {
      c.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (c) => {
      c.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), (i = n.querySelector("[data-close]")) == null || i.addEventListener("click", () => this.close()), (r = n.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = n.querySelector("[data-pwd]")) == null || l.focus(), (a = n.querySelector("[data-ok]")) == null || a.addEventListener("click", () => {
      var f, u, p, g;
      if (e.mode === "unprotect") {
        const b = (u = (f = n.querySelector("[data-pwd]")) == null ? void 0 : f.value) != null ? u : "";
        (p = e.onUnprotect) == null || p.call(e, b), this.close();
        return;
      }
      const c = n.querySelector("[data-pwd]").value, d = n.querySelector("[data-pwd2]").value;
      if (c !== d) {
        const b = n.querySelector("[data-err]");
        b && (b.textContent = "两次输入的密码不一致。");
        return;
      }
      const h = {};
      for (const b of rr) {
        const m = n.querySelector(`[data-allow="${b.key}"]`);
        m != null && m.checked && (h[b.key] = !0);
      }
      (g = e.onApply) == null || g.call(e, { password: c, allow: h }), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const zl = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", lr = `${zl};border:none;background:#217346;color:#fff`, ar = `${zl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, cr = "width:100%;box-sizing:border-box;height:30px;padding:0 10px;border:1px solid #d0d5dd;border-radius:5px;font:inherit";
class ng {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var i, r, l, a;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.style.cssText = "width:340px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", e.mode === "unprotect" ? n.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">撤销工作簿保护</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:14px 16px">' + (e.hasPassword ? `<div style="margin-bottom:6px;color:#475467">密码:</div><input type="password" data-pwd style="${cr}" autofocus>` : '<div style="color:#475467">确定要撤销对该工作簿的保护吗?</div>') + `</div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${ar}">取消</button><button data-ok style="${lr}">确定</button></div>` : n.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">保护工作簿结构</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><label style="display:flex;align-items:center;gap:6px;margin-bottom:10px;cursor:pointer"><input type="checkbox" data-struct checked> 结构(禁止增删、移动、重命名工作表)</label><div style="margin-bottom:6px;color:#475467">密码(可选):</div><input type="password" data-pwd style="${cr}" placeholder="密码" autofocus></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${ar}">取消</button><button data-ok style="${lr}">确定</button></div>`, t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = (c) => {
      c.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (c) => {
      c.target === t && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), (i = n.querySelector("[data-close]")) == null || i.addEventListener("click", () => this.close()), (r = n.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = n.querySelector("[data-pwd]")) == null || l.focus(), (a = n.querySelector("[data-ok]")) == null || a.addEventListener("click", () => {
      var h, f, u, p;
      if (e.mode === "unprotect") {
        const g = (f = (h = n.querySelector("[data-pwd]")) == null ? void 0 : h.value) != null ? f : "";
        (u = e.onUnprotect) == null || u.call(e, g), this.close();
        return;
      }
      const c = n.querySelector("[data-struct]").checked, d = n.querySelector("[data-pwd]").value;
      (p = e.onApply) == null || p.call(e, { lockStructure: c, password: d }), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Bl = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", og = `${Bl};border:none;background:#217346;color:#fff`, dr = `${Bl};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, $o = "height:26px;padding:0 8px;border:1px solid #d0d5dd;border-radius:4px;font:inherit;box-sizing:border-box";
function Mo(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class sg {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "rows", []);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var l, a, c, d;
    if (typeof document == "undefined") return;
    this.close(), this.rows = e.ranges.map((h) => R({}, h));
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const n = document.createElement("div");
    n.style.cssText = "width:440px;max-width:94vw;max-height:88vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", n.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">允许用户编辑区域</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><div style="color:#475467;margin-bottom:6px">工作表受保护时,可编辑的区域:</div><div data-list style="border:1px solid #eef0f2;border-radius:6px;min-height:80px;max-height:220px;overflow:auto"></div><div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap"><input data-name style="${$o};flex:1;min-width:80px" placeholder="标题"><input data-ref style="${$o};width:110px" placeholder="引用 A1:C3" value="${Mo(e.defaultRef)}"><input data-pwd type="password" style="${$o};width:90px" placeholder="密码(可选)"><button data-add style="${dr};height:26px">添加</button></div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${dr}">取消</button><button data-ok style="${og}">确定</button></div>`, t.appendChild(n), document.body.appendChild(t), this.el = t;
    const s = n.querySelector("[data-list]"), i = () => {
      s.innerHTML = this.rows.length ? this.rows.map((h, f) => `<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid #f2f4f7"><span style="flex:1;font-weight:500">${Mo(h.name || "区域")}</span><span style="color:#475467">${Mo(h.ref)}</span>${h.password ? '<span title="有密码" style="color:#98a2b3">🔒</span>' : ""}<button data-del="${f}" style="border:none;background:none;color:#d92d20;cursor:pointer">删除</button></div>`).join("") : '<div style="padding:16px;text-align:center;color:#98a2b3">暂无区域</div>', s.querySelectorAll("[data-del]").forEach((h) => h.addEventListener("click", () => {
        this.rows.splice(Number(h.dataset.del), 1), i();
      }));
    };
    i();
    const r = (h) => {
      h.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (h) => {
      h.target === t && this.close();
    }), document.addEventListener("keydown", r, !0), this.cleanup = () => document.removeEventListener("keydown", r, !0), (l = n.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = n.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.close()), (c = n.querySelector("[data-add]")) == null || c.addEventListener("click", () => {
      const h = n.querySelector("[data-ref]").value.trim();
      if (!h) return;
      const f = n.querySelector("[data-name]").value.trim() || `区域${this.rows.length + 1}`, u = n.querySelector("[data-pwd]").value;
      this.rows.push(R({ name: f, ref: h }, u ? { password: u } : {})), n.querySelector("[data-name]").value = "", n.querySelector("[data-pwd]").value = "", i();
    }), (d = n.querySelector("[data-ok]")) == null || d.addEventListener("click", () => {
      e.onApply(this.rows.map((h) => R({}, h))), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function hr(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function fr(o) {
  return Number.isInteger(o) ? String(o) : o.toFixed(2);
}
class ig {
  constructor() {
    C(this, "el", null);
    C(this, "opts", null);
    C(this, "sig", "");
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(!1), this.opts = e;
    const t = document.createElement("div");
    t.className = "ooxml-taskpane", t.style.cssText = "position:fixed;right:0;top:0;bottom:0;width:280px;z-index:9998;background:#f5f7fa;border-left:1px solid #cfd6df;box-shadow:-4px 0 16px rgba(15,23,42,.10);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;box-sizing:border-box;overflow:auto;", document.body.appendChild(t), this.el = t, this.sig = "", this.renderInto();
  }
  /** 重拉数据重渲(签名相同则跳过,避免每帧重排)。 */
  refresh() {
    this.el && this.renderInto();
  }
  renderInto() {
    var a;
    const e = this.el, t = this.opts;
    if (!e || !t) return;
    const n = t.getData(), s = JSON.stringify(n);
    if (s === this.sig) return;
    this.sig = s;
    const i = n.sheets.map((c, d) => `<div style="padding:5px 10px;border-radius:5px;${d === n.activeSheet ? "background:#217346;color:#fff;font-weight:600" : "color:#1f2329"}">${hr(c)}</div>`).join(""), r = (c, d, h) => `<label style="display:flex;align-items:center;gap:8px;padding:5px 0;cursor:pointer"><input type="checkbox" data-toggle="${c}"${h ? " checked" : ""}> ${d}</label>`, l = (c, d) => `<div style="display:flex;justify-content:space-between;padding:3px 0"><span style="color:#667085">${c}</span><span>${hr(d)}</span></div>`;
    e.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #e4e9f0;background:#fff"><strong style="font-size:14px">任务窗格</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 14px"><div style="font-weight:600;margin-bottom:6px;color:#344054">工作表</div><div style="display:flex;flex-direction:column;gap:2px;margin-bottom:14px">${i}</div><div style="font-weight:600;margin-bottom:6px;color:#344054">当前选区</div>` + l("区域", n.selectionRef) + l("计数", String(n.count)) + (n.numCount > 0 ? l("求和", fr(n.sum)) + l("平均值", fr(n.average)) : "") + '<div style="font-weight:600;margin:14px 0 4px;color:#344054">显示</div>' + r("formulaBar", "编辑栏", n.formulaBar) + r("headers", "行号列标", n.headers) + r("gridlines", "网格线", n.gridlines) + "</div>", (a = e.querySelector("[data-close]")) == null || a.addEventListener("click", () => this.close(!0)), e.querySelectorAll("[data-toggle]").forEach((c) => c.addEventListener("change", () => {
      t.onToggle(c.dataset.toggle);
    }));
  }
  close(e = !0) {
    var n, s;
    const t = this.el;
    (n = this.el) == null || n.remove(), this.el = null, t && e && ((s = this.opts) == null || s.onClose());
  }
  dispose() {
    this.close(!1), this.opts = null;
  }
}
const rg = {
  eq: "等于",
  ne: "不等于",
  gt: "大于",
  ge: "大于或等于",
  lt: "小于",
  le: "小于或等于",
  between: "介于",
  notBetween: "不介于"
}, lg = {
  eq: "等于",
  ne: "不等于",
  contains: "包含",
  notContains: "不包含",
  startsWith: "开头是",
  endsWith: "结尾是"
}, ag = {
  eq: "等于",
  before: "早于",
  after: "晚于",
  between: "介于"
}, cg = /^-?\d+(\.\d+)?$/;
function dg(o) {
  let e = 0, t = 0, n = 0;
  for (const s of o) {
    const i = s.trim();
    !i || i === "(空白)" || (n++, cg.test(i.replace(/,/g, "")) ? e++ : isNaN(Date.parse(i)) || t++);
  }
  return n ? e / n >= 0.6 ? "number" : t / n >= 0.6 ? "date" : "text" : "text";
}
function hg(o, e) {
  if (o.type === "aboveAvg" || o.type === "belowAvg") {
    if (!e.length) return { type: "number", op: o.type === "aboveAvg" ? "gt" : "lt", a: 0 };
    const t = e.reduce((n, s) => n + s, 0) / e.length;
    return { type: "number", op: o.type === "aboveAvg" ? "gt" : "lt", a: t };
  }
  if (o.type === "top10") {
    if (!e.length) return { type: "number", op: "ge", a: 0 };
    const t = [...e].sort((i, r) => r - i), n = o.percent ? Math.max(1, Math.ceil(o.n / 100 * t.length)) : Math.min(o.n, t.length);
    return o.bottom ? { type: "number", op: "le", a: t[t.length - n] } : { type: "number", op: "ge", a: t[n - 1] };
  }
  return o;
}
function fg(o, e) {
  switch (o.type) {
    case "number": {
      const t = e.num;
      if (t === null) return !1;
      const { op: n, a: s, b: i } = o;
      switch (n) {
        case "eq":
          return t === s;
        case "ne":
          return t !== s;
        case "gt":
          return t > s;
        case "ge":
          return t >= s;
        case "lt":
          return t < s;
        case "le":
          return t <= s;
        case "between":
          return i !== void 0 && t >= Math.min(s, i) && t <= Math.max(s, i);
        case "notBetween":
          return i !== void 0 && (t < Math.min(s, i) || t > Math.max(s, i));
      }
      return !0;
    }
    case "text": {
      const t = e.text.toLowerCase(), n = o.s.toLowerCase();
      switch (o.op) {
        case "eq":
          return t === n;
        case "ne":
          return t !== n;
        case "contains":
          return t.includes(n);
        case "notContains":
          return !t.includes(n);
        case "startsWith":
          return t.startsWith(n);
        case "endsWith":
          return t.endsWith(n);
      }
      return !0;
    }
    case "date": {
      const t = e.dateMs;
      if (t === null) return !1;
      const { op: n, a: s, b: i } = o;
      switch (n) {
        case "eq":
          return ug(t, s);
        case "before":
          return t < s;
        case "after":
          return t > s;
        case "between":
          return i !== void 0 && t >= Math.min(s, i) && t <= Math.max(s, i);
      }
      return !0;
    }
    // 动态类型理论上已被 resolveDynamicCondition 折算掉;兜底放行
    default:
      return !0;
  }
}
function ug(o, e) {
  const t = new Date(o), n = new Date(e);
  return t.getFullYear() === n.getFullYear() && t.getMonth() === n.getMonth() && t.getDate() === n.getDate();
}
const on = "height:27px;padding:0 12px;border:1px solid #d0d3d6;border-radius:5px;background:#fff;cursor:pointer;font:inherit;font-size:12px;color:#444", ur = "height:27px;padding:0 12px;border:1px solid #21a366;border-radius:5px;background:#21a366;color:#fff;cursor:pointer;font:inherit;font-size:12px", Ue = "height:26px;padding:0 8px;border:1px solid #d0d5dd;border-radius:4px;font:inherit;box-sizing:border-box", st = `${Ue};background:#fff;cursor:pointer`;
function it(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function Io(o, e) {
  return Object.entries(o).map(([t, n]) => `<option value="${t}"${t === e ? " selected" : ""}>${n}</option>`).join("");
}
function pr(o) {
  const e = new Date(o), t = (n) => String(n).padStart(2, "0");
  return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`;
}
class pg {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "checked", /* @__PURE__ */ new Set());
    C(this, "search", "");
    C(this, "tab", "values");
    C(this, "o");
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var i;
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.checked = new Set(e.selected.length ? e.selected : e.values), this.search = "", this.tab = (i = e.initialTab) != null ? i : e.condActive ? "condition" : "values";
    const t = document.createElement("div");
    t.className = "ooxml-filterpop", t.style.cssText = `position:fixed;left:${e.x}px;top:${e.y}px;z-index:10000;width:270px;max-width:92vw;background:#fff;border:1px solid #cfd3d7;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.22);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;display:flex;flex-direction:column`, document.body.appendChild(t), this.el = t, this.render();
    const n = (r) => {
      r.key === "Escape" && this.emitClose();
    }, s = (r) => {
      this.el && !this.el.contains(r.target) && this.emitClose();
    };
    setTimeout(() => document.addEventListener("mousedown", s), 0), document.addEventListener("keydown", n, !0), this.cleanup = () => {
      document.removeEventListener("mousedown", s), document.removeEventListener("keydown", n, !0);
    };
  }
  condLabel() {
    return this.o.colType === "number" ? "数字筛选" : this.o.colType === "date" ? "日期筛选" : "文本筛选";
  }
  render() {
    var i;
    const e = this.el;
    if (!e) return;
    const t = this.o, n = (r, l) => `<button data-tab="${r}" style="border:none;background:none;padding:8px 10px;cursor:pointer;font:inherit;border-bottom:2px solid ${this.tab === r ? "#21a366" : "transparent"};color:${this.tab === r ? "#1b7a4d" : "#475467"};font-weight:${this.tab === r ? 600 : 400}">${l}</button>`;
    e.innerHTML = `<div style="display:flex;align-items:center;border-bottom:1px solid #eef0f2;padding:0 4px">${n("values", "按内容")}${n("condition", this.condLabel())}<span style="flex:1"></span><button data-clear style="border:none;background:none;color:#1a73e8;cursor:pointer;font:inherit;padding:8px 8px">清除筛选</button></div><div style="display:flex;gap:6px;padding:8px 8px 0"><button data-sort="asc" style="${on};flex:1${t.sortDir === "asc" ? ";background:#d6e9d9;border-color:#21a366;color:#1b7a4d;font-weight:600" : ""}">↑ 升序</button><button data-sort="desc" style="${on};flex:1${t.sortDir === "desc" ? ";background:#d6e9d9;border-color:#21a366;color:#1b7a4d;font-weight:600" : ""}">↓ 降序</button></div><div data-body style="padding:8px"></div>`;
    const s = e.querySelector("[data-body]");
    this.tab === "values" ? this.renderValues(s) : this.renderCondition(s), e.querySelectorAll("[data-tab]").forEach((r) => r.addEventListener("click", () => {
      this.tab = r.dataset.tab, this.render();
    })), e.querySelectorAll("[data-sort]").forEach((r) => r.addEventListener("click", () => {
      t.onSort(r.dataset.sort), this.close();
    })), (i = e.querySelector("[data-clear]")) == null || i.addEventListener("click", () => {
      t.onClear(), this.close();
    });
  }
  // ---- 按内容(值复选)----
  renderValues(e) {
    var a, c;
    e.innerHTML = `<input data-search style="${Ue};width:100%;margin-bottom:6px" placeholder="搜索…" value="${it(this.search)}"><label style="display:flex;align-items:center;gap:6px;font-weight:600;padding:2px"><input type="checkbox" data-all> <span data-all-label>(全选)</span></label><div data-list style="max-height:220px;overflow:auto;border:1px solid #eceef0;border-radius:4px;padding:2px;margin:4px 0"></div><div style="display:flex;justify-content:flex-end;gap:8px"><button data-cancel style="${on}">取消</button><button data-ok style="${ur}">确定</button></div>`;
    const t = e.querySelector("[data-search]"), n = e.querySelector("[data-all]"), s = e.querySelector("[data-all-label]"), i = e.querySelector("[data-list]");
    let r = [];
    const l = () => {
      const d = this.search.trim().toLowerCase(), h = d.length > 0;
      r = h ? this.o.values.filter((f) => f.toLowerCase().includes(d)) : this.o.values, n.checked = r.length > 0 && r.every((f) => this.checked.has(f)), s.textContent = h ? "(全选搜索结果)" : "(全选)", i.innerHTML = r.length ? r.map((f) => `<label style="display:flex;align-items:center;gap:6px;padding:3px 4px;border-radius:3px;cursor:pointer;min-width:max-content;white-space:nowrap"><input type="checkbox" data-v="${it(f)}" ${this.checked.has(f) ? "checked" : ""}><span>${it(f)}</span></label>`).join("") : '<div style="color:#aaa;text-align:center;padding:10px">无匹配值</div>', i.querySelectorAll("[data-v]").forEach((f) => f.addEventListener("change", (u) => {
        const p = f.dataset.v;
        u.target.checked ? this.checked.add(p) : this.checked.delete(p), n.checked = r.length > 0 && r.every((g) => this.checked.has(g));
      }));
    };
    t.addEventListener("input", () => {
      this.search = t.value, l();
    }), n.addEventListener("change", (d) => {
      const h = d.target.checked;
      for (const f of r) h ? this.checked.add(f) : this.checked.delete(f);
      l();
    }), l(), (a = e.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.emitClose()), (c = e.querySelector("[data-ok]")) == null || c.addEventListener("click", () => {
      const d = r.filter((h) => this.checked.has(h));
      this.o.onApplyValues(d), this.close();
    });
  }
  // ---- 条件筛选(数字/文本/日期)----
  renderCondition(e) {
    var s, i;
    const t = this.o.currentCond, n = `<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px"><button data-cancel style="${on}">取消</button><button data-ok style="${ur}">确定</button></div>`;
    if (this.o.colType === "text") {
      const r = (t == null ? void 0 : t.type) === "text" ? t.op : "contains", l = (t == null ? void 0 : t.type) === "text" ? t.s : "";
      e.innerHTML = `<div style="display:flex;gap:8px;align-items:center"><select data-op style="${st};flex:0 0 110px">${Io(lg, r)}</select><input data-s style="${Ue};flex:1" value="${it(l)}" placeholder="值"></div>` + n;
    } else if (this.o.colType === "date") {
      const r = (t == null ? void 0 : t.type) === "date" ? t.op : "before", l = (t == null ? void 0 : t.type) === "date" ? pr(t.a) : "", a = (t == null ? void 0 : t.type) === "date" && t.b !== void 0 ? pr(t.b) : "";
      e.innerHTML = `<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><select data-op style="${st};flex:0 0 90px">${Io(ag, r)}</select><input type="date" data-a style="${Ue};flex:1" value="${l}"></div><div data-brow style="display:${r === "between" ? "flex" : "none"};gap:8px;align-items:center"><span style="flex:0 0 90px;text-align:center;color:#667085">到</span><input type="date" data-b style="${Ue};flex:1" value="${a}"></div>` + n;
      const c = e.querySelector("[data-op]");
      c.addEventListener("change", () => {
        e.querySelector("[data-brow]").style.display = c.value === "between" ? "flex" : "none";
      });
    } else {
      const r = (t == null ? void 0 : t.type) === "top10" ? "top10" : (t == null ? void 0 : t.type) === "aboveAvg" ? "aboveAvg" : (t == null ? void 0 : t.type) === "belowAvg" ? "belowAvg" : "op", l = (t == null ? void 0 : t.type) === "number" ? t.op : "gt", a = (t == null ? void 0 : t.type) === "number" ? String(t.a) : "", c = (t == null ? void 0 : t.type) === "number" && t.b !== void 0 ? String(t.b) : "", d = (t == null ? void 0 : t.type) === "top10" ? t : { bottom: !1, percent: !1, n: 10 };
      e.innerHTML = `<select data-mode style="${st};width:100%;margin-bottom:8px"><option value="op"${r === "op" ? " selected" : ""}>按运算符</option><option value="top10"${r === "top10" ? " selected" : ""}>前十项</option><option value="aboveAvg"${r === "aboveAvg" ? " selected" : ""}>高于平均值</option><option value="belowAvg"${r === "belowAvg" ? " selected" : ""}>低于平均值</option></select><div data-op-form style="display:${r === "op" ? "block" : "none"}"><div style="display:flex;gap:8px;align-items:center"><select data-op style="${st};flex:0 0 110px">${Io(rg, l)}</select><input data-a type="number" style="${Ue};flex:1" value="${it(a)}"></div><div data-brow style="display:${l === "between" || l === "notBetween" ? "flex" : "none"};gap:8px;align-items:center;margin-top:8px"><span style="flex:0 0 110px;text-align:center;color:#667085">与</span><input data-b type="number" style="${Ue};flex:1" value="${it(c)}"></div></div><div data-top-form style="display:${r === "top10" ? "flex" : "none"};gap:8px;align-items:center"><select data-bottom style="${st};flex:0 0 70px"><option value="0"${d.bottom ? "" : " selected"}>最大</option><option value="1"${d.bottom ? " selected" : ""}>最小</option></select><input data-n type="number" min="1" style="${Ue};flex:1" value="${d.n}"><select data-percent style="${st};flex:0 0 76px"><option value="0"${d.percent ? "" : " selected"}>项</option><option value="1"${d.percent ? " selected" : ""}>百分比</option></select></div>` + n;
      const h = e.querySelector("[data-mode]");
      h.addEventListener("change", () => {
        e.querySelector("[data-op-form]").style.display = h.value === "op" ? "block" : "none", e.querySelector("[data-top-form]").style.display = h.value === "top10" ? "flex" : "none";
      });
      const f = e.querySelector("[data-op]");
      f.addEventListener("change", () => {
        e.querySelector("[data-brow]").style.display = f.value === "between" || f.value === "notBetween" ? "flex" : "none";
      });
    }
    (s = e.querySelector("[data-cancel]")) == null || s.addEventListener("click", () => this.emitClose()), (i = e.querySelector("[data-ok]")) == null || i.addEventListener("click", () => {
      const r = this.collectCondition(e);
      r && (this.o.onApplyCondition(r), this.close());
    });
  }
  collectCondition(e) {
    const t = (r) => {
      var l, a;
      return (a = (l = e.querySelector(r)) == null ? void 0 : l.value) != null ? a : "";
    };
    if (this.o.colType === "text") {
      const r = t("[data-s]");
      return r ? { type: "text", op: t("[data-op]"), s: r } : null;
    }
    if (this.o.colType === "date") {
      const r = t("[data-op]"), l = Date.parse(t("[data-a]"));
      if (isNaN(l)) return null;
      if (r === "between") {
        const a = Date.parse(t("[data-b]"));
        return isNaN(a) ? null : { type: "date", op: r, a: l, b: a };
      }
      return { type: "date", op: r, a: l };
    }
    const n = t("[data-mode]");
    if (n === "aboveAvg") return { type: "aboveAvg" };
    if (n === "belowAvg") return { type: "belowAvg" };
    if (n === "top10") {
      const r = Number(t("[data-n]"));
      return !Number.isFinite(r) || r <= 0 ? null : { type: "top10", bottom: t("[data-bottom]") === "1", percent: t("[data-percent]") === "1", n: r };
    }
    const s = t("[data-op]"), i = Number(t("[data-a]"));
    if (!Number.isFinite(i)) return null;
    if (s === "between" || s === "notBetween") {
      const r = Number(t("[data-b]"));
      return Number.isFinite(r) ? { type: "number", op: s, a: i, b: r } : null;
    }
    return { type: "number", op: s, a: i };
  }
  emitClose() {
    var t;
    const e = (t = this.o) == null ? void 0 : t.onClose;
    this.close(), e == null || e();
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function gr(o) {
  return /[.*+?^${}()|[\]\\]/.test(o) ? "\\" + o : o;
}
function gg(o) {
  let e = "";
  for (let t = 0; t < o.length; t++) {
    const n = o[t];
    if (n === "~" && t + 1 < o.length && (o[t + 1] === "*" || o[t + 1] === "?" || o[t + 1] === "~")) {
      e += gr(o[++t]);
      continue;
    }
    if (n === "*") {
      e += ".*";
      continue;
    }
    if (n === "?") {
      e += ".";
      continue;
    }
    e += gr(n);
  }
  return e;
}
function Wl(o) {
  if (!o.query) return null;
  const e = o.matchCase ? "" : "i";
  if (o.wildcard) {
    const n = gg(o.query), s = new RegExp(o.wholeCell ? `^${n}$` : n, e);
    return (i) => s.test(i);
  }
  const t = o.matchCase ? o.query : o.query.toLowerCase();
  return o.wholeCell ? (n) => (o.matchCase ? n : n.toLowerCase()) === t : (n) => (o.matchCase ? n : n.toLowerCase()).includes(t);
}
function mg(o, e, t, n) {
  var s;
  return t === "comment" ? (s = e.comment) != null ? s : "" : t === "formula" && e.type === "formula" && e.formula ? "=" + e.formula : me(o, e.row, e.col, n);
}
function bg(o, e) {
  o.sort(
    (t, n) => t.sheet - n.sheet || (e === "col" ? t.col - n.col || t.row - n.row : t.row - n.row || t.col - n.col)
  );
}
function mr(o, e, t) {
  var l;
  const n = Wl(t);
  if (!n) return [];
  const s = (l = o.date1904) != null ? l : !1, i = t.scope === "workbook" ? o.sheets.map((a, c) => c) : [e], r = [];
  for (const a of i) {
    const c = o.sheets[a];
    if (c)
      for (const d of c.cells.values()) {
        if (d.type === "empty") continue;
        const h = mg(c, d, t.lookIn, s);
        h && n(h) && r.push({ sheet: a, row: d.row, col: d.col, value: me(c, d.row, d.col, s) });
      }
  }
  return bg(r, t.direction), r;
}
const sn = "height:28px;padding:0 12px;border:1px solid #d0d3d6;border-radius:5px;background:#fff;cursor:pointer;font:inherit;font-size:12px;color:#444", yg = "height:28px;padding:0 12px;border:1px solid #21a366;border-radius:5px;background:#21a366;color:#fff;cursor:pointer;font:inherit;font-size:12px", Go = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:4px;font:inherit;box-sizing:border-box", Ao = `${Go};background:#fff;cursor:pointer`;
function xg(o) {
  let e = "", t = o;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
function Et(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class wg {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "o");
    C(this, "tab", "find");
    // 持久 DOM 引用(避免整体重渲丢焦点)
    C(this, "qInput");
    C(this, "rInput");
    C(this, "replaceRow");
    C(this, "replaceBtns");
    C(this, "countEl");
    C(this, "tabFindBtn");
    C(this, "tabRepBtn");
    C(this, "resultsWrap");
  }
  isOpen() {
    return this.el !== null;
  }
  open(e) {
    var i;
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.tab = (i = e.initialTab) != null ? i : "find";
    const t = e.getState(), n = document.createElement("div");
    n.className = "ooxml-finddlg", n.style.cssText = "position:fixed;left:50%;top:76px;transform:translateX(-50%);z-index:10000;width:396px;max-width:96vw;background:#fff;border:1px solid #cfd3d7;border-radius:8px;box-shadow:0 10px 34px rgba(0,0,0,.24);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", n.innerHTML = this.template(t), document.body.appendChild(n), this.el = n, this.bind();
    const s = (r) => {
      var l;
      r.key === "Escape" && ((l = this.el) != null && l.contains(document.activeElement)) && this.emitClose();
    };
    document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0);
  }
  template(e) {
    const t = this.o.editable, n = (i, r, l) => `<button data-tab="${i}" style="border:none;background:none;padding:7px 14px;cursor:pointer;font:inherit;border-bottom:2px solid ${l ? "#21a366" : "transparent"};color:${l ? "#1b7a4d" : "#475467"};font-weight:${l ? 600 : 400}">${r}</button>`, s = (i, r, l) => `<option value="${i}"${i === l ? " selected" : ""}>${r}</option>`;
    return (
      // 标题栏(可拖动)
      `<div data-drag style="display:flex;align-items:center;padding:8px 10px;cursor:move;border-bottom:1px solid #eef0f2"><span style="font-weight:600">查找和替换</span><span style="flex:1"></span><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#667085;line-height:1">×</button></div><div style="display:flex;border-bottom:1px solid #eef0f2;padding:0 6px">${n("find", "查找", this.tab === "find")}${t ? n("replace", "替换", this.tab === "replace") : ""}</div><div style="padding:10px 12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><label style="flex:0 0 64px;color:#475467">查找内容</label><input data-q style="${Go};flex:1" value="${Et(e.query)}" placeholder="输入查找内容"></div><div data-rep-row style="display:${this.tab === "replace" ? "flex" : "none"};align-items:center;gap:8px;margin-bottom:8px"><label style="flex:0 0 64px;color:#475467">替换为</label><input data-r style="${Go};flex:1" value="${Et(e.replace)}" placeholder="输入替换内容"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:6px 0"><label style="display:flex;align-items:center;gap:6px;color:#475467">范围<select data-scope style="${Ao};flex:1">${s("sheet", "工作表", e.scope)}${s("workbook", "工作簿", e.scope)}</select></label><label style="display:flex;align-items:center;gap:6px;color:#475467">搜索<select data-dir style="${Ao};flex:1">${s("row", "按行", e.direction)}${s("col", "按列", e.direction)}</select></label><label style="display:flex;align-items:center;gap:6px;color:#475467">查找范围<select data-lookin style="${Ao};flex:1">${s("value", "值", e.lookIn)}${s("formula", "公式", e.lookIn)}${s("comment", "批注", e.lookIn)}</select></label><span></span></div><div style="display:flex;gap:14px;flex-wrap:wrap;margin:4px 0 8px"><label style="display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox" data-case ${e.matchCase ? "checked" : ""}>区分大小写</label><label style="display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox" data-whole ${e.wholeCell ? "checked" : ""}>单元格匹配</label><label style="display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox" data-wild ${e.wildcard ? "checked" : ""}>通配符</label></div><div data-count style="min-height:18px;color:#667085;font-size:12px;margin-bottom:6px">${this.countText(e)}</div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end"><button data-findall style="${sn}">全部查找</button><button data-prev style="${sn}">查找上一个</button><button data-next style="${yg}">查找下一个</button><span data-rep-btns style="display:${this.tab === "replace" ? "contents" : "none"}"><button data-repone style="${sn}">替换</button><button data-repall style="${sn}">全部替换</button></span></div><div data-results style="display:none;margin-top:10px;border:1px solid #eceef0;border-radius:5px;overflow:hidden"></div></div>`
    );
  }
  countText(e) {
    return e.query ? e.count === 0 ? "无结果" : `第 ${e.index + 1} 个,共 ${e.count} 个` : "";
  }
  bind() {
    var n, s, i, r;
    const e = this.el, t = (l) => e.querySelector(l);
    this.qInput = t("[data-q]"), this.rInput = t("[data-r]"), this.replaceRow = t("[data-rep-row]"), this.replaceBtns = t("[data-rep-btns]"), this.countEl = t("[data-count]"), this.resultsWrap = t("[data-results]"), this.tabFindBtn = t('[data-tab="find"]'), this.tabRepBtn = e.querySelector('[data-tab="replace"]'), this.qInput.addEventListener("input", () => this.o.onQuery(this.qInput.value)), this.qInput.addEventListener("keydown", (l) => {
      l.key === "Enter" && (l.preventDefault(), l.shiftKey ? this.o.onFindPrev() : this.o.onFindNext());
    }), (n = this.rInput) == null || n.addEventListener("input", () => this.o.onReplace(this.rInput.value)), (s = this.rInput) == null || s.addEventListener("keydown", (l) => {
      l.key === "Enter" && (l.preventDefault(), this.o.onReplaceOne());
    }), t("[data-scope]").addEventListener("change", (l) => this.o.onScope(l.target.value)), t("[data-dir]").addEventListener("change", (l) => this.o.onDirection(l.target.value)), t("[data-lookin]").addEventListener("change", (l) => {
      this.o.onLookIn(l.target.value), this.syncReplaceEnabled();
    }), t("[data-case]").addEventListener("change", (l) => this.o.onMatchCase(l.target.checked)), t("[data-whole]").addEventListener("change", (l) => this.o.onWholeCell(l.target.checked)), t("[data-wild]").addEventListener("change", (l) => this.o.onWildcard(l.target.checked)), t("[data-findall]").addEventListener("click", () => this.renderResults(this.o.onFindAll())), t("[data-prev]").addEventListener("click", () => this.o.onFindPrev()), t("[data-next]").addEventListener("click", () => this.o.onFindNext()), (i = e.querySelector("[data-repone]")) == null || i.addEventListener("click", () => this.o.onReplaceOne()), (r = e.querySelector("[data-repall]")) == null || r.addEventListener("click", () => {
      this.o.onReplaceAll(), this.refresh();
    }), t("[data-close]").addEventListener("click", () => this.emitClose()), e.querySelectorAll("[data-tab]").forEach((l) => l.addEventListener("click", () => this.switchTab(l.dataset.tab))), this.enableDrag(t("[data-drag]")), this.syncReplaceEnabled(), setTimeout(() => {
      var l;
      return (l = this.qInput) == null ? void 0 : l.focus();
    }, 0);
  }
  switchTab(e) {
    if (!this.o.editable && e === "replace") return;
    this.tab = e;
    const t = (n, s) => {
      n && (n.style.borderBottom = `2px solid ${s ? "#21a366" : "transparent"}`, n.style.color = s ? "#1b7a4d" : "#475467", n.style.fontWeight = s ? "600" : "400");
    };
    t(this.tabFindBtn, e === "find"), t(this.tabRepBtn, e === "replace"), this.replaceRow && (this.replaceRow.style.display = e === "replace" ? "flex" : "none"), this.replaceBtns && (this.replaceBtns.style.display = e === "replace" ? "contents" : "none");
  }
  /** 批注 lookIn 只查不替:禁用替换按钮。 */
  syncReplaceEnabled() {
    var n;
    const t = this.o.getState().lookIn === "comment";
    (n = this.replaceBtns) == null || n.querySelectorAll("button").forEach((s) => {
      s.disabled = t, s.style.opacity = t ? "0.5" : "1", s.title = t ? "批注仅支持查找,不支持替换" : "";
    });
  }
  /** 计数/状态刷新(控制器 onFindChange 时调)。不重建 DOM,不丢焦点。 */
  refresh() {
    if (!this.el) return;
    const e = this.o.getState();
    this.countEl && (this.countEl.textContent = this.countText(e)), this.resultsWrap && this.resultsWrap.style.display !== "none" && this.renderResults(this.o.onFindAll());
  }
  renderResults(e) {
    const t = this.resultsWrap;
    if (!t) return;
    if (t.style.display = "block", !e.length) {
      t.innerHTML = '<div style="padding:10px;text-align:center;color:#98a2b3;font-size:12px">无匹配结果</div>';
      return;
    }
    const n = '<div style="display:grid;grid-template-columns:1fr 78px 1.4fr;background:#f6f7f9;font-size:12px;color:#667085;font-weight:600;border-bottom:1px solid #eceef0"><span style="padding:5px 8px">工作表</span><span style="padding:5px 8px">单元格</span><span style="padding:5px 8px">值</span></div>', s = e.map(
      (i, r) => `<div data-gi="${r}" style="display:grid;grid-template-columns:1fr 78px 1.4fr;font-size:12px;cursor:pointer;border-bottom:1px solid #f2f3f5"><span style="padding:5px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${Et(i.sheetName)}</span><span style="padding:5px 8px;color:#475467">${xg(i.col)}${i.row + 1}</span><span style="padding:5px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${Et(i.value)}">${Et(i.value)}</span></div>`
    ).join("");
    t.innerHTML = n + `<div style="max-height:180px;overflow:auto">${s}</div>`, t.querySelectorAll("[data-gi]").forEach((i) => {
      i.addEventListener("mouseenter", () => i.style.background = "#eef7f1"), i.addEventListener("mouseleave", () => i.style.background = ""), i.addEventListener("click", () => this.o.onGotoResult(Number(i.dataset.gi)));
    });
  }
  enableDrag(e) {
    let t = 0, n = 0, s = 0, i = 0, r = !1;
    const l = (c) => {
      !r || !this.el || (this.el.style.left = s + (c.clientX - t) + "px", this.el.style.top = i + (c.clientY - n) + "px", this.el.style.transform = "none");
    }, a = () => {
      r = !1, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", a);
    };
    e.addEventListener("mousedown", (c) => {
      if (c.target.dataset.close !== void 0) return;
      const d = this.el.getBoundingClientRect();
      s = d.left, i = d.top, t = c.clientX, n = c.clientY, r = !0, this.el.style.transform = "none", this.el.style.left = d.left + "px", this.el.style.top = d.top + "px", document.addEventListener("mousemove", l), document.addEventListener("mouseup", a);
    });
  }
  emitClose() {
    var t;
    const e = (t = this.o) == null ? void 0 : t.onClose;
    this.close(), e == null || e();
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
class vg {
  // 当前 token 在 value 中的起始下标
  constructor(e, t = Yo) {
    C(this, "box", null);
    C(this, "items", []);
    C(this, "active", 0);
    C(this, "tokenStart", 0);
    this.ta = e, this.names = t;
  }
  /** 输入变化后调用:重算建议并显示/隐藏。 */
  update() {
    const e = this.currentToken();
    if (!e) return this.close();
    const t = e.text.toUpperCase(), n = this.names.filter((s) => s.startsWith(t));
    if (!n.length || n.length === 1 && n[0] === t) return this.close();
    this.tokenStart = e.start, this.items = n.slice(0, 8), this.active = 0, this.render();
  }
  isOpen() {
    return !!this.box;
  }
  /** 列表打开时拦截导航键;返回 true = 已处理(编辑器应跳过自己的处理)。 */
  onKeyDown(e) {
    return this.box ? e.key === "ArrowDown" ? (this.active = (this.active + 1) % this.items.length, this.render(), !0) : e.key === "ArrowUp" ? (this.active = (this.active - 1 + this.items.length) % this.items.length, this.render(), !0) : e.key === "Enter" || e.key === "Tab" ? (this.accept(this.items[this.active]), !0) : e.key === "Escape" ? (this.close(), !0) : !1 : !1;
  }
  close() {
    var e;
    (e = this.box) == null || e.remove(), this.box = null;
  }
  dispose() {
    this.close();
  }
  // ---------------- 内部 ----------------
  /** 光标前的"函数名 token":公式串里,光标紧邻一段字母,且其前是可起函数的位置(= ( , 运算符 空白 起始)。 */
  currentToken() {
    var i;
    const e = this.ta.value;
    if (e[0] !== "=") return null;
    const t = (i = this.ta.selectionStart) != null ? i : e.length;
    let n = t;
    for (; n > 0 && /[A-Za-z]/.test(e[n - 1]); ) n--;
    if (n === t) return null;
    const s = n > 0 ? e[n - 1] : "=";
    return !"=(,+-*/^&<>% ".includes(s) && n !== 1 ? null : { text: e.slice(n, t), start: n };
  }
  accept(e) {
    var r;
    const t = this.ta.value, n = (r = this.ta.selectionStart) != null ? r : t.length, s = t.slice(0, this.tokenStart) + e + "(" + t.slice(n), i = this.tokenStart + e.length + 1;
    this.ta.value = s, this.ta.setSelectionRange(i, i), this.close(), this.ta.dispatchEvent(new Event("input", { bubbles: !0 })), this.ta.focus();
  }
  render() {
    if (typeof document == "undefined") return;
    this.box || (this.box = document.createElement("div"), this.box.className = "ooxml-formula-ac", this.box.style.cssText = "position:fixed;z-index:10002;min-width:200px;max-width:360px;background:#fff;border:1px solid #d0d5dd;border-radius:6px;box-shadow:0 6px 24px rgba(0,0,0,.16);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',monospace;overflow:hidden;max-height:240px;overflow-y:auto", document.body.appendChild(this.box)), this.box.innerHTML = this.items.map((s, i) => {
      const r = ds[s] || `${s}(…)`, l = i === this.active ? "background:#eef4ff;" : "";
      return `<div data-i="${i}" style="padding:5px 10px;cursor:pointer;${l}"><b style="color:#1a56db">${br(s)}</b> <span style="color:#98a2b3;font-size:12px">${br(r)}</span></div>`;
    }).join(""), this.box.querySelectorAll("[data-i]").forEach((s) => {
      s.addEventListener("mousedown", (i) => {
        i.preventDefault(), this.accept(this.items[Number(s.dataset.i)]);
      });
    });
    const e = this.ta.getBoundingClientRect(), t = window.innerHeight, n = t - e.bottom > 250 || e.top < 250;
    this.box.style.left = `${Math.min(e.left, window.innerWidth - 364)}px`, n ? (this.box.style.top = `${e.bottom + 2}px`, this.box.style.bottom = "") : (this.box.style.bottom = `${t - e.top + 2}px`, this.box.style.top = "");
  }
}
function br(o) {
  return o.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
const kg = 96 / 72;
let rn = null;
function Cg() {
  if (rn) return rn;
  if (typeof document == "undefined") return null;
  const o = document.createElement("canvas");
  return o.width = 100, o.height = 100, rn = o.getContext("2d"), rn;
}
const Sg = (o) => {
  var f, u, p, g, b, m, y, w;
  const e = o.snapshot.style, t = e == null ? void 0 : e.fill, n = t && t.type !== "none" && (u = (f = t.fgColor) != null ? f : t.bgColor) != null ? u : "#fff", s = document.createElement("textarea");
  s.className = "ooxml-cell-editor", s.value = (g = (p = o.initialText) != null ? p : o.snapshot.editText) != null ? g : o.snapshot.text, s.rows = 1, s.style.cssText = "box-sizing:border-box;border:2px solid #21a366;outline:none;padding:0 3px;margin:0;font-family:sans-serif;resize:none;overflow:auto;white-space:pre-wrap;word-break:break-word;", s.style.background = n;
  const i = (b = e == null ? void 0 : e.font) != null && b.size ? e.font.size * kg : 14;
  s.style.fontSize = i + "px", s.style.lineHeight = dt.toString(), (m = e == null ? void 0 : e.font) != null && m.bold && (s.style.fontWeight = "bold"), (y = e == null ? void 0 : e.font) != null && y.italic && (s.style.fontStyle = "italic"), (w = e == null ? void 0 : e.font) != null && w.color && (s.style.color = e.font.color), s.style.textAlign = (e == null ? void 0 : e.hAlign) === "center" ? "center" : (e == null ? void 0 : e.hAlign) === "right" ? "right" : "left";
  const r = new vg(s);
  let l = !1, a = null;
  const c = (v) => {
    l || s.value !== a && (l = !0, r.dispose(), o.commit(s.value, v) === !1 && (l = !1, a = s.value));
  }, d = () => {
    l || (l = !0, r.dispose(), o.cancel());
  };
  s.addEventListener("keydown", (v) => {
    if (r.onKeyDown(v)) {
      v.preventDefault(), v.stopPropagation();
      return;
    }
    v.key === "Enter" && !v.shiftKey ? (v.preventDefault(), c("down")) : v.key === "Tab" ? (v.preventDefault(), c("right")) : v.key === "Escape" && (v.preventDefault(), d()), v.stopPropagation();
  }), s.addEventListener("blur", () => c()), s.addEventListener("input", () => {
    var v;
    a = null, r.update(), (v = o.reposition) == null || v.call(o);
  });
  function h(v) {
    const x = Cg();
    if (!x || v <= 0) return 0;
    const S = e != null && e.font ? ve(e.font, 1) : `${i.toFixed(1)}px sans-serif`, k = Math.max(10, v - 2 * Fe - 4), M = vn(x, s.value || " ", S, k), E = i * dt;
    return Math.ceil(M.length * E + 4 + 2);
  }
  return setTimeout(() => {
    var v;
    s.focus(), o.initialText != null ? s.setSelectionRange(s.value.length, s.value.length) : s.select(), (v = o.reposition) == null || v.call(o);
  }, 0), { el: s, getDesiredHeight: h };
};
function Ul(o) {
  var r;
  const e = {
    animation: !1,
    title: o.title ? { text: o.title, left: "center", textStyle: { fontSize: 13 } } : void 0,
    legend: o.showLegend ? { bottom: 0, type: "scroll" } : void 0,
    grid: { left: 40, right: 16, top: o.title ? 36 : 16, bottom: o.showLegend ? 32 : 24, containLabel: !0 },
    tooltip: { trigger: o.type === "pie" || o.type === "doughnut" ? "item" : "axis" }
  }, t = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47", "#264478", "#9E480E"];
  if (o.type === "pie" || o.type === "doughnut") {
    const l = o.series[0], a = ((r = l == null ? void 0 : l.values) != null ? r : []).map((c, d) => {
      var h;
      return { name: String((h = o.categories[d]) != null ? h : d + 1), value: c != null ? c : 0 };
    });
    return z(R({}, e), {
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: o.type === "doughnut" ? ["40%", "70%"] : "70%",
          data: a,
          label: { fontSize: 10 }
        }
      ],
      color: t
    });
  }
  if (o.type === "scatter")
    return z(R({}, e), {
      xAxis: { type: "value", scale: !0 },
      yAxis: { type: "value", scale: !0 },
      series: o.series.map((l, a) => ({
        name: l.name,
        type: "scatter",
        data: l.values.map((c, d) => {
          var h;
          return [Number((h = o.categories[d]) != null ? h : d), c];
        }),
        itemStyle: { color: l.color || t[a % t.length] }
      }))
    });
  if (o.type === "radar") {
    const l = o.categories.map((a) => ({ name: String(a) }));
    return z(R({}, e), {
      radar: { indicator: l.length ? l : [{ name: "" }] },
      series: [
        {
          type: "radar",
          data: o.series.map((a, c) => ({
            name: a.name,
            value: a.values.map((d) => d != null ? d : 0),
            itemStyle: { color: a.color || t[c % t.length] }
          }))
        }
      ]
    });
  }
  const n = { type: "category", data: o.categories.map(String), axisLabel: { fontSize: 10 } }, s = { type: "value", axisLabel: { fontSize: 10 } }, i = o.type === "bar" && o.barDirection === "bar";
  return z(R({}, e), {
    xAxis: i ? s : n,
    yAxis: i ? n : s,
    series: o.series.map((l, a) => ({
      name: l.name,
      type: o.type === "line" || o.type === "area" ? "line" : "bar",
      areaStyle: o.type === "area" ? {} : void 0,
      data: l.values.map((c) => c != null ? c : null),
      itemStyle: { color: l.color || t[a % t.length] },
      smooth: !1
    })),
    color: t
  });
}
let Ro = null;
async function ql() {
  return Ro || (Ro = await import("echarts")), Ro;
}
const yr = "position:absolute;background:rgba(255,255,255,0.96);border:1px solid #e2e4e7;box-shadow:0 1px 4px rgba(0,0,0,0.08);", Eg = "display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#6b7785;border-style:dashed;box-sizing:border-box;padding:8px;overflow:hidden;", _l = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
class Tg {
  constructor(e) {
    C(this, "chartInstances", []);
    C(this, "imageEls", []);
    C(this, "chartPlaceholders", []);
    C(this, "shapeEls", []);
    C(this, "pivotButtonEls", []);
    /** 防止异步加载 echarts 期间已切表/重建: build 自增,await 后 token 变了就放弃 */
    C(this, "buildToken", 0);
    /** 当前选中的浮动图 index(-1 无);画选框 + 8 控制点 + 旋转柄(整组随图旋转)。 */
    C(this, "selectedImageIdx", -1);
    C(this, "selWrap", null);
    // 旋转容器 = 选框(rotate 施于此,box+控制点整体转)
    C(this, "selHandles", []);
    C(this, "selRotateHandle", null);
    this.quads = e;
  }
  /** 设选中浮动图(-1 清);实际画/隐藏在下一次 position() 里做。 */
  setSelectedImage(e) {
    this.selectedImageIdx = e;
  }
  container(e) {
    return this.quads[e];
  }
  /** 锚点落在哪个象限(冻结行/列内的钉住,其余随滚动) */
  quadrantOf(e, t) {
    const n = t.freezeGeometry;
    if (!n.frozenRows && !n.frozenCols) return "main";
    const s = re(t.metrics, e), i = n.frozenRows > 0 && s.top + s.height <= n.frozenHeight + 0.5, r = n.frozenCols > 0 && s.left + s.width <= n.frozenWidth + 0.5;
    return i && r ? "corner" : i ? "frow" : r ? "fcol" : "main";
  }
  dispose() {
    var e;
    for (const t of this.chartInstances)
      t.inst.dispose(), t.el.remove();
    this.chartInstances = [];
    for (const t of this.chartPlaceholders) t.el.remove();
    this.chartPlaceholders = [];
    for (const t of this.shapeEls) t.el.remove();
    this.shapeEls = [];
    for (const t of this.pivotButtonEls) t.el.remove();
    this.pivotButtonEls = [];
    for (const t of this.imageEls) t.el.remove();
    this.imageEls = [], (e = this.selWrap) == null || e.remove(), this.selWrap = null, this.selHandles = [], this.selRotateHandle = null;
  }
  /** 重建该表全部叠加层(先销毁再挂载),末尾定位一次 */
  async build(e, t, n) {
    var i, r;
    this.dispose();
    const s = ++this.buildToken;
    for (let l = 0; l < e.images.length; l++) {
      const a = e.images[l], c = this.quadrantOf(a, t), d = document.createElement("div");
      d.className = "ov-img-wrap", d.style.cssText = "position:absolute;overflow:hidden;transform-origin:center;pointer-events:none";
      const h = document.createElement("img");
      h.src = a.src, h.draggable = !1, h.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:fill;pointer-events:none", d.appendChild(h), this.container(c).appendChild(d), this.imageEls.push({ el: d, img: h, anchorIdx: l, quad: c });
    }
    for (let l = 0; l < e.shapes.length; l++) {
      const a = e.shapes[l], c = this.quadrantOf(a.anchor, t), d = document.createElement("div");
      d.style.position = "absolute", d.style.boxSizing = "border-box", d.style.pointerEvents = "none", d.style.overflow = "hidden", d.style.display = "flex", d.style.padding = "3px 5px", d.style.alignItems = "center", d.style.justifyContent = a.align === "center" ? "center" : a.align === "right" ? "flex-end" : "flex-start", d.style.whiteSpace = "pre-wrap", d.style.wordBreak = "break-word", d.style.lineHeight = "1.2", a.fillColor && (d.style.background = a.fillColor), a.lineColor && (d.style.border = `1px solid ${a.lineColor}`), a.geom === "roundRect" ? d.style.borderRadius = "8px" : a.geom === "ellipse" && (d.style.borderRadius = "50%"), a.textColor && (d.style.color = a.textColor), a.bold && (d.style.fontWeight = "bold"), d.style.textAlign = (i = a.align) != null ? i : "left", d.textContent = (r = a.text) != null ? r : "", this.container(c).appendChild(d), this.shapeEls.push({ el: d, shapeIdx: l, quad: c });
    }
    if (e.charts.length) {
      let l = null;
      try {
        l = await ql();
      } catch (a) {
        console.warn("[ooxml-preview] 未能加载 echarts,图表降级为占位提示。请安装依赖: npm i echarts", a);
      }
      if (s !== this.buildToken) return;
      for (const a of e.charts) {
        const c = this.quadrantOf(a.anchor, t);
        if (l) {
          const d = document.createElement("div");
          d.style.cssText = yr, this.container(c).appendChild(d);
          const h = l.init(d);
          try {
            h.setOption(Ul(a));
          } catch (f) {
            console.warn("[ooxml-preview] 图表渲染失败:", f);
          }
          this.chartInstances.push({ el: d, inst: h, spec: a, quad: c, lastW: 0, lastH: 0 });
        } else {
          const d = document.createElement("div");
          d.style.cssText = yr + Eg, d.innerHTML = '<div style="font-size:22px;line-height:1">📊</div><div style="margin-top:6px;font-weight:600">图表</div><div style="margin-top:2px;font-size:11px;color:#9aa4ae">渲染需安装 echarts 依赖</div>', this.container(c).appendChild(d), this.chartPlaceholders.push({ el: d, spec: a, quad: c });
        }
      }
    }
    for (let l = 0; l < e.pivotTables.length; l++) {
      const a = e.pivotTables[l];
      for (let c = 0; c < a.buttons.length; c++) {
        const d = a.buttons[c], h = {
          src: "",
          from: { row: d.row, col: d.col, rowOffEmu: 0, colOffEmu: 0 },
          to: { row: d.row + 1, col: d.col + 1, rowOffEmu: 0, colOffEmu: 0 }
        }, f = this.quadrantOf(h, t), u = document.createElement("button");
        u.type = "button", u.className = `ooxml-pivot-button ${d.kind}`, u.title = `${a.name}: ${d.label}`, u.setAttribute("aria-label", `透视表字段 ${d.label}`);
        const p = document.createElement("span");
        p.className = "ooxml-pivot-label", p.textContent = d.label;
        const g = document.createElement("span");
        g.className = "ooxml-pivot-caret", g.textContent = "▾", u.append(p, g), this.container(f).appendChild(u), this.pivotButtonEls.push({ el: u, tableIdx: l, buttonIdx: c, quad: f });
      }
    }
    this.position(e, t, n);
  }
  /** 按当前视图(滚动/缩放)重新定位四象限容器与各叠加层 */
  position(e, t, n) {
    var f;
    const s = t.metrics.rowHeaderWidth, i = t.metrics.colHeaderHeight, r = t.freezeGeometry, l = r.frozenWidth, a = r.frozenHeight, c = Math.max(0, n.width - s - l), d = Math.max(0, n.height - i - a);
    ln(this.quads.corner, s, i, l, a), ln(this.quads.frow, s + l, i, c, a), ln(this.quads.fcol, s, i + a, l, d), ln(this.quads.main, s + l, i + a, c, d);
    for (const u of this.imageEls) {
      const p = e.images[u.anchorIdx];
      if (!p) continue;
      const g = this.quadrantOf(p, t);
      g !== u.quad && (this.container(g).appendChild(u.el), u.quad = g), Tt(u.el, re(t.metrics, p), g, l, a, n), u.el.style.transform = p.rotation ? `rotate(${p.rotation}deg)` : "";
      const b = p.crop;
      if (b && (b.l || b.t || b.r || b.b)) {
        const m = Math.max(0.01, 1 - b.l - b.r), y = Math.max(0.01, 1 - b.t - b.b);
        u.img.style.width = `${100 / m}%`, u.img.style.height = `${100 / y}%`, u.img.style.left = `${-b.l / m * 100}%`, u.img.style.top = `${-b.t / y * 100}%`;
      } else
        u.img.style.width = "100%", u.img.style.height = "100%", u.img.style.left = "0", u.img.style.top = "0";
    }
    this.positionSelection(e, t, l, a, n);
    const h = Math.round(11 * (96 / 72) * t.metrics.zoom);
    for (const u of this.shapeEls)
      u.el.style.fontSize = h + "px", Tt(u.el, re(t.metrics, e.shapes[u.shapeIdx].anchor), u.quad, l, a, n);
    for (const u of this.chartInstances) {
      const p = re(t.metrics, u.spec.anchor);
      Tt(u.el, p, u.quad, l, a, n), (u.lastW !== p.width || u.lastH !== p.height) && (u.inst.resize(), u.lastW = p.width, u.lastH = p.height);
    }
    for (const u of this.chartPlaceholders)
      Tt(u.el, re(t.metrics, u.spec.anchor), u.quad, l, a, n);
    for (const u of this.pivotButtonEls) {
      const p = (f = e.pivotTables[u.tableIdx]) == null ? void 0 : f.buttons[u.buttonIdx];
      if (!p) continue;
      const g = $g(t, p.row, p.col);
      Tt(u.el, g, u.quad, l, a, n);
    }
  }
  /** 选中浮动图的选框 + 8 控制点 + 旋转柄定位(整组放旋转容器里,随图旋转;坐标全 CSS 像素,DPR 无关)。 */
  positionSelection(e, t, n, s, i) {
    const r = this.selectedImageIdx >= 0 ? e.images[this.selectedImageIdx] : null;
    if (!r) {
      this.hideSelection();
      return;
    }
    this.ensureSelEls();
    const l = this.quadrantOf(r, t), a = this.container(l), c = re(t.metrics, r), d = l === "main" || l === "frow" ? c.left - n - i.scrollX : c.left, h = l === "main" || l === "fcol" ? c.top - s - i.scrollY : c.top, f = c.width, u = c.height, p = this.selWrap;
    p.parentElement !== a && a.appendChild(p), p.style.left = `${d}px`, p.style.top = `${h}px`, p.style.width = `${f}px`, p.style.height = `${u}px`, p.style.transform = r.rotation ? `rotate(${r.rotation}deg)` : "", p.style.display = "";
    const g = {
      nw: [0, 0],
      n: [f / 2, 0],
      ne: [f, 0],
      e: [f, u / 2],
      se: [f, u],
      s: [f / 2, u],
      sw: [0, u],
      w: [0, u / 2]
    };
    for (const { el: b, dir: m } of this.selHandles) {
      const [y, w] = g[m];
      b.style.left = `${y - 5}px`, b.style.top = `${w - 5}px`;
    }
    this.selRotateHandle.style.left = `${f / 2 - 6}px`, this.selRotateHandle.style.top = "-26px";
  }
  ensureSelEls() {
    if (this.selWrap) return;
    const e = document.createElement("div");
    e.className = "ov-img-selbox", e.style.cssText = "position:absolute;box-sizing:border-box;border:1.5px solid #217346;pointer-events:none;transform-origin:center;z-index:2;", this.selWrap = e;
    for (const n of _l) {
      const s = document.createElement("div");
      s.className = "ov-img-handle ov-img-handle-" + n, s.style.cssText = "position:absolute;width:8px;height:8px;background:#fff;border:1.5px solid #217346;border-radius:1px;pointer-events:none;", e.appendChild(s), this.selHandles.push({ el: s, dir: n });
    }
    const t = document.createElement("div");
    t.className = "ov-img-rotate", t.style.cssText = "position:absolute;width:11px;height:11px;background:#fff;border:1.5px solid #217346;border-radius:50%;pointer-events:none;", e.appendChild(t), this.selRotateHandle = t;
  }
  hideSelection() {
    this.selWrap && (this.selWrap.style.display = "none");
  }
}
function $g(o, e, t) {
  return {
    left: o.metrics.colLeft(t),
    top: o.metrics.rowTop(e),
    width: o.metrics.colWidth(t),
    height: o.metrics.rowHeight(e)
  };
}
function ln(o, e, t, n, s) {
  o.style.left = e + "px", o.style.top = t + "px", o.style.width = Math.max(0, n) + "px", o.style.height = Math.max(0, s) + "px";
}
function Tt(o, e, t, n, s, i) {
  const r = t === "main" || t === "frow" ? e.left - n - i.scrollX : e.left, l = t === "main" || t === "fcol" ? e.top - s - i.scrollY : e.top;
  o.style.left = r + "px", o.style.top = l + "px", o.style.width = e.width + "px", o.style.height = e.height + "px";
}
function Mg(o, e) {
  var i, r, l, a, c, d;
  if (!e || !((i = e.images) != null && i.length) && !((r = e.charts) != null && r.length) && !((l = e.shapes) != null && l.length)) return;
  const t = o.canvas.getContext("2d");
  if (!t) return;
  const n = o.scale, s = (h) => ({
    x: (o.originX + h.left - o.gridOriginX) * n,
    y: (o.originY + h.top - o.gridOriginY) * n,
    w: h.width * n,
    h: h.height * n
  });
  t.save();
  for (const h of (a = e.images) != null ? a : []) {
    const f = s(re(o.metrics, h.anchor));
    try {
      t.drawImage(h.source, f.x, f.y, f.w, f.h);
    } catch (u) {
    }
  }
  for (const h of (c = e.charts) != null ? c : []) {
    const f = s(re(o.metrics, h.anchor));
    try {
      t.drawImage(h.source, f.x, f.y, f.w, f.h);
    } catch (u) {
    }
  }
  for (const h of (d = e.shapes) != null ? d : [])
    Ig(t, h, s(re(o.metrics, h.anchor)), n);
  t.restore();
}
function Ig(o, e, t, n) {
  const { x: s, y: i, w: r, h: l } = t;
  if (o.save(), o.beginPath(), e.geom === "ellipse" ? o.ellipse(s + r / 2, i + l / 2, r / 2, l / 2, 0, 0, Math.PI * 2) : e.geom === "roundRect" ? Ag(o, s, i, r, l, 8 * n) : o.rect(s, i, r, l), e.fillColor && (o.fillStyle = e.fillColor, o.fill()), e.lineColor && (o.strokeStyle = e.lineColor, o.lineWidth = Math.max(1, n), o.stroke()), e.text) {
    o.clip(), o.fillStyle = e.textColor || "#000000";
    const a = 11 * (96 / 72) * n;
    o.font = `${e.bold ? "bold " : ""}${a}px Calibri, sans-serif`, o.textBaseline = "middle", o.textAlign = e.align === "center" ? "center" : e.align === "right" ? "right" : "left";
    const c = e.align === "center" ? s + r / 2 : e.align === "right" ? s + r - 5 * n : s + 5 * n, d = e.text.split(`
`), h = a * 1.2;
    let f = i + l / 2 - (d.length - 1) * h / 2;
    for (const u of d)
      o.fillText(u, c, f), f += h;
  }
  o.restore();
}
function Ag(o, e, t, n, s, i) {
  const r = Math.min(i, n / 2, s / 2);
  o.moveTo(e + r, t), o.arcTo(e + n, t, e + n, t + s, r), o.arcTo(e + n, t + s, e, t + s, r), o.arcTo(e, t + s, e, t, r), o.arcTo(e, t, e + n, t, r), o.closePath();
}
function xr(o, e) {
  const t = [];
  if (e >= o) return [{ s: 0, len: o }];
  for (let n = 0; n < o - 0.5; n += e) {
    const s = Math.round(n), i = Math.min(Math.round(e), o - s);
    if (i < 1 || (t.push({ s, len: i }), t.length > 5e3)) break;
  }
  return t;
}
function us(o, e, t, n) {
  const s = o.width, i = o.height;
  if (s < 1 || i < 1 || e < 1 || t < 1) return [];
  const r = n.zoom && n.zoom > 0 ? n.zoom : 1, l = e * Oe, a = t * Oe, c = n.repeatLeft ? n.repeatLeft.canvas.width : 0, d = n.repeatTop ? n.repeatTop.canvas.height : 0, h = n.repeatLeft ? n.repeatLeft.widthCss : 0, f = n.repeatTop ? n.repeatTop.heightCss : 0;
  let u;
  if (n.fitToWidth) {
    const $ = e + h;
    u = $ > 0 ? n.contentWmm / ($ * Oe) : 1;
  } else
    u = r;
  const p = Oe * u, g = h * p, b = f * p, m = Math.max(1, n.contentWmm - g), y = Math.max(1, n.contentHmm - b), w = l * u, v = a * u;
  if (w < 0.01 || v < 0.01) return [];
  const x = n.fitToWidth ? s : Math.max(1, m / w * s), S = Math.max(1, y / v * i), k = xr(s, x), M = xr(i, S), E = [];
  for (const $ of k)
    for (const T of M) {
      const I = document.createElement("canvas");
      I.width = c + $.len, I.height = d + T.len;
      const A = I.getContext("2d");
      A && (n.corner && c && d && A.drawImage(n.corner.canvas, 0, 0, c, d, 0, 0, c, d), n.repeatTop && d && A.drawImage(n.repeatTop.canvas, $.s, 0, $.len, d, c, 0, $.len, d), n.repeatLeft && c && A.drawImage(n.repeatLeft.canvas, 0, T.s, c, T.len, 0, d, c, T.len), A.drawImage(o, $.s, T.s, $.len, T.len, c, d, $.len, T.len), E.push({
        canvas: I,
        widthMm: g + $.len / s * w,
        heightMm: b + T.len / i * v
      }));
    }
  return E;
}
async function Rg() {
  var o;
  try {
    const e = await import(
      /* @vite-ignore */
      "./jspdf.es.min-P_bGBJFk.js"
    ).then((t) => t.j);
    return e.jsPDF || ((o = e.default) == null ? void 0 : o.jsPDF) || e.default || e;
  } catch (e) {
    throw new Error("PDF 导出需要可选依赖 jspdf,请先安装: npm i jspdf (" + e.message + ")");
  }
}
async function Fg(o, e = {}) {
  var p;
  if (!o.length) throw new Error("没有可导出的工作表");
  const t = await Rg(), [n, s] = Pn(e.format, e.orientation), i = On(e.margin), r = Math.max(1, n - i.left - i.right), l = Math.max(1, s - i.top - i.bottom), a = (p = e.fitToWidth) != null ? p : !0, c = o.map((g) => ({
    sheet: g,
    pages: us(g.canvas, g.bodyWcss, g.bodyHcss, {
      contentWmm: r,
      contentHmm: l,
      fitToWidth: a,
      zoom: g.zoom,
      repeatTop: g.repeatTop,
      repeatLeft: g.repeatLeft,
      corner: g.corner
    })
  })), d = c.reduce((g, b) => g + Math.max(b.pages.length, 0), 0) || 1, h = new t({ unit: "mm", format: [n, s], orientation: "portrait" });
  let f = 0, u = !0;
  for (let g = 0; g < c.length; g++) {
    const { sheet: b, pages: m } = c[g];
    if (m.length)
      for (const y of m) {
        u || h.addPage([n, s], "portrait"), u = !1;
        const w = y.canvas.toDataURL("image/png");
        if (h.addImage(w, "PNG", i.left, i.top, y.widthMm, y.heightMm, void 0, "FAST"), e.beforeRenderPage) {
          const v = {
            doc: h,
            pageIndex: f,
            pageCount: d,
            sheetName: b.sheetName,
            sheetIndex: g,
            pageWidth: n,
            pageHeight: s,
            margin: i
          };
          try {
            e.beforeRenderPage(v);
          } catch (x) {
            console.warn("[ooxml-preview] beforeRenderPage 抛错:", x);
          }
        }
        f++;
      }
  }
  return h.output("blob");
}
async function Lg() {
  var o;
  try {
    const e = await import(
      /* @vite-ignore */
      "./jspdf.es.min-P_bGBJFk.js"
    ).then((t) => t.j);
    return e.jsPDF || ((o = e.default) == null ? void 0 : o.jsPDF) || e.default || e;
  } catch (e) {
    throw new Error("矢量 PDF 导出需要可选依赖 jspdf,请先安装: npm i jspdf (" + e.message + ")");
  }
}
const Ng = /* @__PURE__ */ new Set(["helvetica", "times", "courier", "symbol", "zapfdingbats"]);
function Pg(o) {
  for (let e = 0; e < o.length; e++) if (o.charCodeAt(e) > 592) return !0;
  return !1;
}
function Rt(o) {
  const e = /^#?([0-9a-f]{6})$/i.exec(o);
  if (!e) return [0, 0, 0];
  const t = parseInt(e[1], 16);
  return [t >> 16 & 255, t >> 8 & 255, t & 255];
}
const Og = { thin: 0.2, hair: 0.1, medium: 0.45, thick: 0.7, double: 0.45 };
async function Hg(o, e = {}) {
  var m, y;
  if (!o.length) throw new Error("没有可导出的工作表");
  const t = await Lg(), [n, s] = Pn(e.format, e.orientation), i = On(e.margin), r = Math.max(1, n - i.left - i.right), l = Math.max(1, s - i.top - i.bottom), a = (m = e.fitToWidth) != null ? m : !0, c = new t({ unit: "mm", format: [n, s], orientation: "portrait" });
  if (e.configureDoc)
    try {
      e.configureDoc(c);
    } catch (w) {
      console.warn("[ooxml-preview] configureDoc 抛错:", w);
    }
  const d = (((y = c.getFont) == null ? void 0 : y.call(c)) || {}).fontName || "helvetica", h = !Ng.has(String(d).toLowerCase()), f = h ? d : "helvetica", u = o.map((w) => zg(w, { contentWmm: r, contentHmm: l, fitToWidth: a })), p = u.reduce((w, v) => w + v.pages.length, 0) || 1;
  let g = 0, b = !0;
  for (let w = 0; w < o.length; w++) {
    const v = o[w], x = u[w];
    for (const S of x.pages)
      b || c.addPage([n, s], "portrait"), b = !1, Bg(c, v, x, S, i, f, h), Dg(e.beforeRenderPage, {
        doc: c,
        pageIndex: g,
        pageCount: p,
        sheetName: v.sheetName,
        sheetIndex: w,
        pageWidth: n,
        pageHeight: s,
        margin: i
      }), g++;
  }
  return c.output("blob");
}
function Dg(o, e) {
  if (o)
    try {
      o(e);
    } catch (t) {
      console.warn("[ooxml-preview] beforeRenderPage 抛错:", t);
    }
}
function wr(o, e, t) {
  const n = [];
  let s = [], i = 0;
  for (const r of o) {
    const l = e(r);
    s.length && i + l > t && (n.push(s), s = [], i = 0), s.push(r), i += l;
  }
  return s.length && n.push(s), n.length || n.push([]), n;
}
function zg(o, e) {
  const t = o.metrics, n = t.colLeft(o.bodyRight + 1) - t.colLeft(o.bodyLeft), s = o.titleCols ? cn(o.titleCols[0], o.titleCols[1]) : [], i = o.titleRows ? cn(o.titleRows[0], o.titleRows[1]) : [], r = s.reduce((w, v) => w + t.colWidth(v), 0), l = o.zoom && o.zoom > 0 ? o.zoom : 1, a = e.fitToWidth ? (n + r) * Oe > 0 ? e.contentWmm / ((n + r) * Oe) : 1 : l, c = Oe * a, d = r * c, h = i.reduce((w, v) => w + t.rowHeight(v) * c, 0), f = Math.max(1, e.contentWmm - d), u = Math.max(1, e.contentHmm - h), p = cn(o.bodyLeft, o.bodyRight), g = cn(o.bodyTop, o.bodyBottom), b = e.fitToWidth ? [p] : wr(p, (w) => t.colWidth(w) * c, f), m = wr(g, (w) => t.rowHeight(w) * c, u), y = [];
  for (const w of b) for (const v of m) y.push({ cols: w, rows: v });
  return { mmPerCss: c, titleColCols: s, titleRowRows: i, titleColWmm: d, titleRowHmm: h, pages: y };
}
function Bg(o, e, t, n, s, i, r) {
  var x, S;
  const l = e.metrics, { mmPerCss: a, titleColCols: c, titleRowRows: d, titleColWmm: h, titleRowHmm: f } = t, u = s.left + h, p = s.top + f, g = (k) => {
    var M;
    return u + (l.colLeft(k) - l.colLeft((M = n.cols[0]) != null ? M : e.bodyLeft)) * a;
  }, b = (k) => {
    var M;
    return p + (l.rowTop(k) - l.rowTop((M = n.rows[0]) != null ? M : e.bodyTop)) * a;
  }, m = (k) => {
    var M;
    return s.left + (l.colLeft(k) - l.colLeft((M = c[0]) != null ? M : 0)) * a;
  }, y = (k) => {
    var M;
    return s.top + (l.rowTop(k) - l.rowTop((M = d[0]) != null ? M : 0)) * a;
  }, w = { doc: o, vs: e, baseFont: i, customFont: r, mmPerCss: a };
  an(w, n.rows, n.cols, g, b), d.length && an(w, d, n.cols, g, y), c.length && an(w, n.rows, c, m, b), d.length && c.length && an(w, d, c, m, y);
  const v = new Set(n.rows);
  for (const k of e.images) {
    const M = k.anchor.from.row, E = k.anchor.from.col;
    if (!v.has(M) || E < ((x = n.cols[0]) != null ? x : 0) || E > ((S = n.cols[n.cols.length - 1]) != null ? S : -1)) continue;
    const $ = re(l, k.anchor), T = u + ($.left - l.colLeft(n.cols[0])) * a, I = p + ($.top - l.rowTop(n.rows[0])) * a;
    try {
      const A = jg(k.source);
      A && o.addImage(A, "PNG", T, I, $.width * a, $.height * a, void 0, "FAST");
    } catch (A) {
    }
  }
}
function an(o, e, t, n, s) {
  const { doc: i, vs: r, baseFont: l, customFont: a, mmPerCss: c } = o;
  if (!e.length || !t.length) return;
  const d = r.metrics, h = Vg(r.merges), f = Yg(r.merges);
  t[0];
  const u = t[t.length - 1];
  r.gridlines && qg(i, d, e, t, n, s, c);
  for (const p of e) {
    const g = s(p);
    for (let b = 0; b < t.length; b++) {
      const m = t[b], y = p + ":" + m;
      if (h.has(y) && !f.has(y)) continue;
      const w = f.get(y), v = w ? Math.min(w.right, u) : m, x = w ? w.bottom : p, S = n(m), k = (d.colLeft(v + 1) - d.colLeft(m)) * c, M = (d.rowTop(x + 1) - d.rowTop(p)) * c, E = r.getCell(p, m);
      if (E && (E.complex || !a && Pg(E.text) ? _g(i, r, p, m, v, x, S, g, k, M) : Wg(i, E, S, g, k, M, c, l, a)), w && w.right > m)
        for (; b < t.length - 1 && t[b + 1] <= w.right; ) b++;
    }
  }
}
function cn(o, e) {
  const t = [];
  for (let n = o; n <= e; n++) t.push(n);
  return t;
}
function Wg(o, e, t, n, s, i, r, l, a) {
  const c = e.style;
  if (c.fill.type === "solid" && c.fill.fgColor) {
    const [E, $, T] = Rt(c.fill.fgColor);
    o.setFillColor(E, $, T), o.rect(t, n, s, i, "F");
  }
  const d = e.effect;
  if (d != null && d.fillColor) {
    const [E, $, T] = Rt(d.fillColor);
    o.setFillColor(E, $, T), o.rect(t, n, s, i, "F");
  }
  if (d != null && d.dataBar) {
    const E = Math.max(0, (s - 2 * r) * d.dataBar.ratio);
    if (E > 0) {
      const [$, T, I] = Rt(d.dataBar.color);
      o.setFillColor($, T, I), o.rect(t + r, n + r, E, i - 2 * r, "F");
    }
  }
  rt(o, c.borders.top, t, n, t + s, n), rt(o, c.borders.bottom, t, n + i, t + s, n + i), rt(o, c.borders.left, t, n, t, n + i), rt(o, c.borders.right, t + s, n, t + s, n + i), c.borders.diagonal && (c.borders.diagonalDown || c.borders.diagonalUp) && (c.borders.diagonalDown && rt(o, c.borders.diagonal, t, n, t + s, n + i), c.borders.diagonalUp && rt(o, c.borders.diagonal, t, n + i, t + s, n));
  let h = 0;
  d != null && d.icon && (Ug(o, d.icon, t + 1.5 * r, n + i / 2, Math.min(i * 0.32, 2.2 * r)), h = 5 * r);
  const f = e.text;
  if (!f) return;
  const u = 2 * r;
  try {
    o.setFont(l, !a && e.bold ? "bold" : "normal");
  } catch (E) {
    o.setFont(l, "normal");
  }
  o.setFontSize(c.font.size * (r / Oe));
  const [p, g, b] = Rt(e.color);
  o.setTextColor(p, g, b);
  const m = /^[\s\d.,%$()+\-eE/]+$/.test(f), y = c.hAlign === "general" ? m ? "right" : "left" : c.hAlign;
  let w, v = "left";
  y === "center" ? (w = t + s / 2, v = "center") : y === "right" ? (w = t + s - u, v = "right") : w = t + u + h + (c.indent || 0) * 8 * r;
  let x, S, k = !1;
  if (c.wrapText) {
    const E = c.font.size * (r / Oe);
    try {
      o.splitTextToSize(f, Math.max(1, s - 2 * u)).length * E * 1.15 > i - 2 * u && (k = !0);
    } catch ($) {
    }
  }
  c.vAlign === "top" || k ? (x = n + u, S = "top") : c.vAlign === "middle" ? (x = n + i / 2, S = "middle") : (x = n + i - u, S = "bottom");
  const M = { align: v, baseline: S };
  c.wrapText && (M.maxWidth = Math.max(1, s - 2 * u));
  try {
    o.text(f, w, x, M);
  } catch (E) {
  }
}
function Ug(o, e, t, n, s) {
  const i = e.setName || "";
  if (i.includes("Arrows")) {
    const c = [
      [214, 59, 59],
      [232, 181, 58],
      [91, 159, 78]
    ], d = e.level === 0 ? 0 : e.level >= e.count - 1 ? 2 : 1, [h, f, u] = c[d];
    if (o.setDrawColor(h, f, u), o.setLineWidth(s * 0.35), d === 1)
      o.line(t - s, n, t + s, n);
    else {
      const p = d === 0 ? s : -s;
      o.line(t, n - p, t, n + p), o.line(t, n + p, t - s * 0.6, n + p - Math.sign(p) * s * 0.6), o.line(t, n + p, t + s * 0.6, n + p - Math.sign(p) * s * 0.6);
    }
    return;
  }
  const r = [
    [214, 59, 59],
    [232, 181, 58],
    [91, 159, 78]
  ], l = e.count > 1 ? e.level / (e.count - 1) : 1;
  let a;
  i.includes("TrafficLights") || i.includes("Signs") || i.includes("Symbols") ? a = r[Math.min(e.level, 2)] : a = [Math.round(214 - 123 * l), Math.round(59 + 100 * l), 59], o.setFillColor(a[0], a[1], a[2]), o.circle(t, n, s, "F");
}
function rt(o, e, t, n, s, i) {
  var d;
  if (!e || !e.style || e.style === "none") return;
  const [r, l, a] = Rt(e.color || "#000000");
  o.setDrawColor(r, l, a);
  const c = (d = Og[e.style]) != null ? d : 0.2;
  if (e.style === "double") {
    o.setLineWidth(Math.max(0.1, c * 0.5));
    const h = s - t, f = i - n, u = Math.hypot(h, f) || 1, p = Math.max(0.18, c * 0.6), g = -f / u * p, b = h / u * p;
    o.line(t + g, n + b, s + g, i + b), o.line(t - g, n - b, s - g, i - b);
    return;
  }
  o.setLineWidth(c), o.line(t, n, s, i);
}
function qg(o, e, t, n, s, i, r) {
  o.setDrawColor(224, 226, 229), o.setLineWidth(0.1);
  const l = n[0], a = n[n.length - 1], c = t[0], d = t[t.length - 1], h = s(l), f = s(a) + e.colWidth(a) * r, u = i(c), p = i(d) + e.rowHeight(d) * r;
  for (const g of t) o.line(h, i(g), f, i(g));
  o.line(h, p, f, p);
  for (const g of n) o.line(s(g), u, s(g), p);
  o.line(f, u, f, p);
}
function _g(o, e, t, n, s, i, r, l, a, c) {
  const d = e.metrics, h = (d.colLeft(n) - d.colLeft(e.rasterLeft)) * e.rasterScale, f = (d.rowTop(t) - d.rowTop(e.rasterTop)) * e.rasterScale, u = (d.colLeft(s + 1) - d.colLeft(n)) * e.rasterScale, p = (d.rowTop(i + 1) - d.rowTop(t)) * e.rasterScale;
  if (u < 1 || p < 1) return;
  const g = document.createElement("canvas");
  g.width = Math.round(u), g.height = Math.round(p);
  const b = g.getContext("2d");
  if (b)
    try {
      b.drawImage(e.rasterCanvas, Math.round(h), Math.round(f), g.width, g.height, 0, 0, g.width, g.height), o.addImage(g.toDataURL("image/png"), "PNG", r, l, a, c, void 0, "FAST");
    } catch (m) {
    }
}
function jg(o) {
  if (typeof HTMLCanvasElement != "undefined" && o instanceof HTMLCanvasElement) return o.toDataURL("image/png");
  if (typeof HTMLImageElement != "undefined" && o instanceof HTMLImageElement) {
    const e = document.createElement("canvas");
    e.width = o.naturalWidth || o.width, e.height = o.naturalHeight || o.height;
    const t = e.getContext("2d");
    if (!t) return null;
    try {
      return t.drawImage(o, 0, 0), e.toDataURL("image/png");
    } catch (n) {
      return null;
    }
  }
  return null;
}
function Vg(o) {
  const e = /* @__PURE__ */ new Set();
  for (const t of o)
    for (let n = t.top; n <= t.bottom; n++) for (let s = t.left; s <= t.right; s++) e.add(n + ":" + s);
  return e;
}
function Yg(o) {
  const e = /* @__PURE__ */ new Map();
  for (const t of o) e.set(t.top + ":" + t.left, t);
  return e;
}
function Xg(o, e = {}) {
  var u;
  if (!o.length) return;
  const [t, n] = Pn(e.format, e.orientation), s = On(e.margin), i = Math.max(1, t - s.left - s.right), r = Math.max(1, n - s.top - s.bottom), l = (u = e.fitToWidth) != null ? u : !0, a = e.title || "打印", c = [];
  for (const p of o) {
    const g = us(p.canvas, p.bodyWcss, p.bodyHcss, {
      contentWmm: i,
      contentHmm: r,
      fitToWidth: l,
      zoom: p.zoom,
      repeatTop: p.repeatTop,
      repeatLeft: p.repeatLeft,
      corner: p.corner
    });
    for (const b of g)
      c.push(
        '<div class="page">' + (e.headerHtml ? `<div class="hdr">${e.headerHtml}</div>` : "") + `<img src="${b.canvas.toDataURL("image/png")}" style="width:${b.widthMm}mm;height:${b.heightMm}mm" />` + (e.footerHtml ? `<div class="ftr">${e.footerHtml}</div>` : "") + "</div>"
      );
  }
  if (!c.length) return;
  const d = `<!doctype html><html><head><meta charset="utf-8"><title>${Gg(a)}</title><style>@page{size:${t}mm ${n}mm;margin:${s.top}mm ${s.right}mm ${s.bottom}mm ${s.left}mm}*{box-sizing:border-box}body{margin:0;font-family:Calibri,Arial,sans-serif}.page{page-break-after:always;break-after:page;overflow:hidden}.page:last-child{page-break-after:auto;break-after:auto}img{display:block}.hdr{font-size:11px;color:#555;margin-bottom:4px}.ftr{font-size:11px;color:#555;margin-top:4px}</style></head><body>${c.join("")}</body></html>`, h = window.open("", "_blank");
  if (!h) {
    console.warn("[ooxml-preview] 打印窗口被浏览器拦截,请允许弹窗");
    return;
  }
  h.document.open(), h.document.write(d), h.document.close();
  const f = () => {
    h.focus(), h.print();
  };
  h.document.readyState === "complete" ? setTimeout(f, 200) : h.onload = () => setTimeout(f, 200);
}
function Gg(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Kg(o) {
  if (o == null) return "";
  const e = o instanceof Date ? o.toISOString() : String(o);
  return /[",\n\r]/.test(e) ? '"' + e.replace(/"/g, '""') + '"' : e;
}
function Jg(o, e = {}) {
  var n, s;
  return Td(o, { format: (n = e.format) != null ? n : !0, date1904: (s = e.date1904) != null ? s : !1 }).map((i) => i.map(Kg).join(",")).join(`\r
`);
}
function Zg(o, e = {}) {
  return JSON.stringify(Md(o, R({ format: !1, date1904: o.date1904 }, e)), null, 2);
}
const Qg = "application/vnd.wps-officedocument.cellimage+xml", em = "http://www.wps.cn/officeDocument/2020/cellImage", tm = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
function nm(o, e) {
  const t = { cx: 990600, cy: 990600 };
  if (e !== "image/png" || !o || o.length < 24) return t;
  const n = new DataView(o.buffer, o.byteOffset, o.byteLength);
  if (n.getUint32(0) !== 2303741511) return t;
  const s = n.getUint32(16), i = n.getUint32(20);
  return !s || !i ? t : { cx: s * 9525, cy: i * 9525 };
}
const Fo = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/svg+xml": "svg",
  "image/webp": "webp"
};
function om(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function $t(o, e, t) {
  const n = new Uint8Array(t.byteLength);
  n.set(t), o[e] = n;
}
function sm(o, e) {
  const t = e.cellImages;
  if (!t || t.size === 0) return o;
  const n = Array.from(t.values()).filter((c) => c.bytes && c.bytes.length && c.mime && Fo[c.mime]);
  if (n.length === 0) return o;
  const s = Ye(o), i = [], r = [];
  n.forEach((c, d) => {
    const h = d + 1, f = Fo[c.mime], u = `cellimage${h}.${f}`;
    $t(s, `xl/media/${u}`, c.bytes);
    const p = `rId${h}`;
    i.push(`<Relationship Id="${p}" Type="${tm}" Target="media/${u}"/>`);
    const { cx: g, cy: b } = nm(c.bytes, c.mime);
    r.push(
      `<etc:cellImage><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="${h}" name="${om(c.id)}" descr="img"/><xdr:cNvPicPr/></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="${p}"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${g}" cy="${b}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic></etc:cellImage>`
    );
  }), $t(
    s,
    "xl/cellimages.xml",
    Ce(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<etc:cellImages xmlns:etc="http://www.wps.cn/officeDocument/2017/etCustomData" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">` + r.join("") + "</etc:cellImages>"
    )
  ), $t(
    s,
    "xl/_rels/cellimages.xml.rels",
    Ce(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` + i.join("") + "</Relationships>"
    )
  );
  const l = "[Content_Types].xml";
  if (s[l]) {
    let c = Z(s[l]);
    const d = /* @__PURE__ */ new Map();
    for (const f of n) d.set(Fo[f.mime], f.mime);
    let h = "";
    for (const [f, u] of d)
      new RegExp(`Extension="${f}"`, "i").test(c) || (h += `<Default Extension="${f}" ContentType="${u}"/>`);
    c.includes("/xl/cellimages.xml") || (h += `<Override PartName="/xl/cellimages.xml" ContentType="${Qg}"/>`), h && (c = c.replace("</Types>", h + "</Types>")), $t(s, l, Ce(c));
  }
  const a = "xl/_rels/workbook.xml.rels";
  if (s[a]) {
    let c = Z(s[a]);
    if (!c.includes("cellimages.xml")) {
      let d = 0;
      for (const f of c.matchAll(/Id="rId(\d+)"/g)) d = Math.max(d, Number(f[1]));
      const h = `rId${d + 1}`;
      c = c.replace(
        "</Relationships>",
        `<Relationship Id="${h}" Type="${em}" Target="cellimages.xml"/></Relationships>`
      ), $t(s, a, Ce(c));
    }
  }
  return zt(s);
}
const im = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", rm = { "image/png": "png", "image/jpeg": "jpg", "image/jpg": "jpg", "image/gif": "gif", "image/bmp": "bmp" };
function lm(o, e, t) {
  const n = new Uint8Array(t.byteLength);
  n.set(t), o[e] = n;
}
function am(o) {
  const e = new RegExp("^data:([^;,]+)(?:;base64)?,(.*)$", "s").exec(o);
  if (!e) return null;
  try {
    const t = atob(e[2]), n = new Uint8Array(t.length);
    for (let s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
    return { bytes: n, mime: e[1] };
  } catch (t) {
    return null;
  }
}
function cm(o) {
  let e = 0;
  for (const t of o.matchAll(/Id="rId(\d+)"/g)) e = Math.max(e, Number(t[1]));
  return "rId" + (e + 1);
}
function vr(o) {
  const e = /sheet(\d+)\.xml$/.exec(o);
  return e ? Number(e[1]) : 0;
}
function dm(o) {
  var l, a, c;
  const e = "xl/workbook.xml", t = "xl/_rels/workbook.xml.rels";
  if (!o[e] || !o[t]) return null;
  const n = Z(o[e]), s = Z(o[t]), i = {};
  for (const d of s.matchAll(/<Relationship\b[^>]*\bId="([^"]+)"[^>]*\bTarget="([^"]+)"[^>]*\/?>/g)) {
    let h = d[2].replace(/^\//, "");
    h.startsWith("xl/") || (h = "xl/" + h), i[d[1]] = h;
  }
  const r = [];
  for (const d of n.matchAll(/<sheet\b[^>]*\/?>/g)) {
    const h = (c = (l = /\br:id="([^"]+)"/.exec(d[0])) == null ? void 0 : l[1]) != null ? c : (a = /\br:embed="([^"]+)"/.exec(d[0])) == null ? void 0 : a[1], f = h ? i[h] : void 0;
    if (!f || !o[f]) return null;
    r.push(f);
  }
  return r.length ? r : null;
}
function hm(o, e) {
  var a, c;
  const t = e.sheets.map((d, h) => ({ s: d, i: h })).filter(({ s: d }) => {
    var h;
    return d.background && (d.background.bytes || ((h = d.background.src) == null ? void 0 : h.startsWith("data:")));
  });
  if (!t.length) return o;
  const n = Ye(o), s = (a = dm(n)) != null ? a : Object.keys(n).filter((d) => /^xl\/worksheets\/sheet\d+\.xml$/.test(d)).sort((d, h) => vr(d) - vr(h)), i = /* @__PURE__ */ new Set();
  let r = Object.keys(n).filter((d) => /^xl\/media\//.test(d)).length;
  for (const { s: d, i: h } of t) {
    const f = s[h];
    if (!f) continue;
    const u = d.background;
    let p = u.bytes, g = u.mime;
    if (!p && ((c = u.src) != null && c.startsWith("data:"))) {
      const S = am(u.src);
      S && (p = S.bytes, g = g || S.mime);
    }
    if (!p) continue;
    const b = rm[(g || "image/png").toLowerCase()] || "png";
    i.add(b), r++;
    const m = `wsbg${r}.${b}`;
    lm(n, `xl/media/${m}`, p);
    const y = f.replace("xl/worksheets/", "xl/worksheets/_rels/") + ".rels";
    let w = n[y] ? Z(n[y]) : `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`;
    const v = cm(w);
    w = w.replace("</Relationships>", `<Relationship Id="${v}" Type="${im}" Target="../media/${m}"/></Relationships>`), n[y] = Ce(w);
    let x = Z(n[f]);
    x = x.replace(/<picture[^>]*\/>/g, ""), x = x.replace("</worksheet>", `<picture r:id="${v}"/></worksheet>`), n[f] = Ce(x);
  }
  const l = "[Content_Types].xml";
  if (n[l]) {
    let d = Z(n[l]);
    for (const h of i)
      if (!new RegExp(`Extension="${h}"`, "i").test(d)) {
        const f = h === "jpg" ? "image/jpeg" : `image/${h}`;
        d = d.replace("</Types>", `<Default Extension="${h}" ContentType="${f}"/></Types>`);
      }
    n[l] = Ce(d);
  }
  return zt(n);
}
const Lo = "xl/workbook.xml";
function fm(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function um(o, e) {
  const t = e.protection;
  if (!t || !t.lockStructure && !t.lockWindows) return o;
  let n;
  try {
    n = Ye(o);
  } catch (d) {
    return o;
  }
  if (!n[Lo]) return o;
  let s = Z(n[Lo]);
  if (/<workbookProtection\b/.test(s)) return o;
  const i = [];
  if (t.lockStructure && i.push('lockStructure="1"'), t.lockWindows && i.push('lockWindows="1"'), t.raw)
    for (const d of ["workbookAlgorithmName", "workbookHashValue", "workbookSaltValue", "workbookSpinCount"]) {
      const h = t.raw[d];
      h != null && i.push(`${d}="${fm(String(h))}"`);
    }
  const r = `<workbookProtection ${i.join(" ")}/>`, l = s.search(/<bookViews\b/) >= 0 ? "<bookViews" : "<sheets", a = s.indexOf(l);
  if (a < 0) return o;
  s = s.slice(0, a) + r + s.slice(a);
  const c = Ce(s);
  return n[Lo] = c, zt(n);
}
const ps = "http://schemas.openxmlformats.org/spreadsheetml/2006/main", Ut = "http://schemas.openxmlformats.org/officeDocument/2006/relationships", Ko = `${Ut}/pivotCacheDefinition`, pm = `${Ut}/pivotCacheRecords`, jl = `${Ut}/pivotTable`, Vl = "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml", Yl = "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml", Xl = "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml";
function Ne(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function kr(o) {
  let e = o + 1, t = "";
  for (; e > 0; ) {
    const n = (e - 1) % 26;
    t = String.fromCharCode(65 + n) + t, e = Math.floor((e - 1) / 26);
  }
  return t;
}
function Gl(o) {
  return `${kr(o.left)}${o.top + 1}:${kr(o.right)}${o.bottom + 1}`;
}
function ge(o, e, t) {
  const n = Ce(t), s = new Uint8Array(n.byteLength);
  s.set(n), o[e] = s;
}
function Kl(o, e, t) {
  var s;
  const n = (s = o.cells.get(O(e, t))) == null ? void 0 : s.raw;
  return n == null ? null : n;
}
function Jl(o) {
  return o == null ? "" : o instanceof Date ? o.toISOString() : String(o);
}
function Zl(o) {
  if (typeof o == "number" && Number.isFinite(o)) return o;
  if (typeof o == "string") {
    const e = Number(o.replace(/,/g, "").trim());
    if (o.trim() !== "" && Number.isFinite(e)) return e;
  }
  return null;
}
const gm = {
  sum: void 0,
  // sum 是 dataField@subtotal 缺省值,省略保持文件精简
  count: "count",
  avg: "average",
  max: "max",
  min: "min"
}, mm = { sum: "求和项", count: "计数项", avg: "平均值", max: "最大值", min: "最小值" };
function bm(o) {
  var t;
  const e = [];
  for (const n of o.sheets)
    for (const s of (t = n.pivotTables) != null ? t : []) {
      const i = s.source, r = s.layout;
      if (!i || !r || !r.values.length) continue;
      const l = o.sheets[i.sheetIndex];
      l && (i.range.bottom <= i.range.top || e.push({ pivot: s, source: i, layout: r, hostSheet: n, sourceSheet: l }));
    }
  return e;
}
function ym(o) {
  const { source: e, layout: t, sourceSheet: n, pivot: s } = o, i = /* @__PURE__ */ new Set([...t.rows, ...t.columns, ...t.filters.map((l) => l.field)]), r = [];
  for (let l = e.range.left; l <= e.range.right; l++) {
    const a = l - e.range.left, c = {
      name: s.fields[a] || `字段${a + 1}`,
      onAxis: i.has(l),
      numeric: !0,
      hasBlank: !1,
      items: [],
      itemIndex: /* @__PURE__ */ new Map(),
      min: 1 / 0,
      max: -1 / 0
    }, d = /* @__PURE__ */ new Set();
    let h = !1;
    for (let f = e.range.top + 1; f <= e.range.bottom; f++) {
      const u = Kl(n, f, l), p = Jl(u).trim();
      if (!p) {
        c.hasBlank = !0;
        continue;
      }
      h = !0;
      const g = Zl(u);
      g == null ? c.numeric = !1 : (c.min = Math.min(c.min, g), c.max = Math.max(c.max, g)), c.onAxis && !d.has(p) && (d.add(p), c.itemIndex.set(p, c.items.length), c.items.push(p));
    }
    h || (c.numeric = !1), r.push(c);
  }
  return r;
}
function xm(o, e, t) {
  const n = o.sourceSheet.name, s = e.map((i) => {
    if (i.onAxis) {
      const r = i.items.map((c) => `<s v="${Ne(c)}"/>`).join("") + (i.hasBlank ? "<m/>" : ""), l = i.items.length + (i.hasBlank ? 1 : 0), a = i.hasBlank ? ' containsBlank="1"' : "";
      return `<cacheField name="${Ne(i.name)}" numFmtId="0"><sharedItems${a} count="${l}">${r}</sharedItems></cacheField>`;
    }
    if (i.numeric) {
      const r = i.hasBlank ? ' containsBlank="1"' : "";
      return `<cacheField name="${Ne(i.name)}" numFmtId="0"><sharedItems${r} containsSemiMixedTypes="0" containsString="0" containsNumber="1" minValue="${i.min}" maxValue="${i.max}"/></cacheField>`;
    }
    return `<cacheField name="${Ne(i.name)}" numFmtId="0"><sharedItems/></cacheField>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<pivotCacheDefinition xmlns="${ps}" xmlns:r="${Ut}" r:id="rId1" refreshedBy="ooxml-excel-editor" refreshOnLoad="1" createdVersion="3" refreshedVersion="3" minRefreshableVersion="3" recordCount="${t}"><cacheSource type="worksheet"><worksheetSource ref="${Gl(o.source.range)}" sheet="${Ne(n)}"/></cacheSource><cacheFields count="${e.length}">${s}</cacheFields></pivotCacheDefinition>`;
}
function wm(o, e) {
  const { source: t, sourceSheet: n } = o, s = [];
  for (let r = t.range.top + 1; r <= t.range.bottom; r++) {
    const l = e.map((a, c) => {
      var u;
      const d = Kl(n, r, t.range.left + c), h = Jl(d).trim();
      if (!h) return "<m/>";
      if (a.onAxis) return `<x v="${(u = a.itemIndex.get(h)) != null ? u : 0}"/>`;
      const f = Zl(d);
      return a.numeric && f != null ? `<n v="${f}"/>` : `<s v="${Ne(h)}"/>`;
    });
    s.push(`<r>${l.join("")}</r>`);
  }
  return { xml: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<pivotCacheRecords xmlns="${ps}" xmlns:r="${Ut}" count="${s.length}">` + s.join("") + "</pivotCacheRecords>", count: s.length };
}
function vm(o, e, t) {
  const { pivot: n, source: s, layout: i } = o, r = (b) => b - s.range.left, l = (b) => {
    const m = s.range.left + b;
    return i.rows.includes(m) ? "axisRow" : i.columns.includes(m) ? "axisCol" : i.filters.some((y) => y.field === m) ? "axisPage" : null;
  }, a = new Set(i.values.map((b) => r(b.field))), c = (b) => i.filters.find((m) => r(m.field) === b), d = e.map((b, m) => {
    const y = l(m);
    if (y) {
      const w = b.items.length + (b.hasBlank ? 1 : 0), v = y === "axisPage" ? c(m) : void 0, x = b.items.length, S = /* @__PURE__ */ new Set();
      let k = !1;
      if ((v == null ? void 0 : v.mode) === "non-empty" && b.hasBlank && (k = !0, S.add(x)), (v == null ? void 0 : v.mode) === "include" && v.values) {
        k = !0;
        const $ = new Set(v.values);
        b.items.forEach((T, I) => {
          $.has(T) || S.add(I);
        }), b.hasBlank && S.add(x);
      }
      const M = Array.from({ length: w }, ($, T) => S.has(T) ? `<item x="${T}" h="1"/>` : `<item x="${T}"/>`).join("") + '<item t="default"/>';
      return `<pivotField axis="${y}"${k ? ' multipleItemSelectionAllowed="1"' : ""} showAll="0"><items count="${w + 1}">${M}</items></pivotField>`;
    }
    return a.has(m) ? '<pivotField dataField="1" showAll="0"/>' : '<pivotField showAll="0"/>';
  }).join(""), h = i.rows.length ? `<rowFields count="${i.rows.length}">${i.rows.map((b) => `<field x="${r(b)}"/>`).join("")}</rowFields>` : "", f = i.columns.length ? `<colFields count="${i.columns.length}">${i.columns.map((b) => `<field x="${r(b)}"/>`).join("")}</colFields>` : "", u = i.filters.length ? `<pageFields count="${i.filters.length}">${i.filters.map((b) => {
    const m = e[r(b.field)], y = b.mode === "equals" && b.value != null ? m == null ? void 0 : m.itemIndex.get(b.value) : void 0;
    return `<pageField fld="${r(b.field)}"${y != null ? ` item="${y}"` : ""} hier="-1"/>`;
  }).join("")}</pageFields>` : "", p = `<dataFields count="${i.values.length}">${i.values.map((b) => {
    var v;
    const m = e[r(b.field)], y = gm[b.summary], w = `${mm[b.summary]}:${(v = m == null ? void 0 : m.name) != null ? v : `字段${r(b.field) + 1}`}`;
    return `<dataField name="${Ne(w)}" fld="${r(b.field)}" baseField="0" baseItem="0"${y ? ` subtotal="${y}"` : ""}/>`;
  }).join("")}</dataFields>`, g = i.columns.length ? 2 : 1;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<pivotTableDefinition xmlns="${ps}" name="${Ne(n.name)}" cacheId="${t}" applyNumberFormats="0" applyBorderFormats="0" applyFontFormats="0" applyPatternFormats="0" applyAlignmentFormats="0" applyWidthHeightFormats="1" dataCaption="值" updatedVersion="3" minRefreshableVersion="3" createdVersion="3" useAutoFormatting="1" itemPrintTitles="1" indent="0" outline="1" outlineData="1" multipleFieldFilters="0"><location ref="${Gl(n.range)}" firstHeaderRow="1" firstDataRow="${g}" firstDataCol="1"/><pivotFields count="${e.length}">${d}</pivotFields>` + h + f + u + p + '<pivotTableStyleInfo name="PivotStyleLight16" showRowHeaders="1" showColHeaders="1" showRowStripes="0" showColStripes="0" showLastColumn="1"/></pivotTableDefinition>';
}
const pn = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`;
function Tn(o, e, t) {
  let n = 0;
  for (const i of o.matchAll(/Id="rId(\d+)"/g)) n = Math.max(n, Number(i[1]));
  const s = `rId${n + 1}`;
  return {
    rels: o.replace("</Relationships>", `<Relationship Id="${s}" Type="${e}" Target="${t}"/></Relationships>`),
    rid: s
  };
}
function Ql(o, e) {
  var i, r;
  const t = o["xl/workbook.xml"] ? Z(o["xl/workbook.xml"]) : "", n = o["xl/_rels/workbook.xml.rels"] ? Z(o["xl/_rels/workbook.xml.rels"]) : "", s = Ne(e);
  for (const l of t.matchAll(/<sheet\b[^>]*>/g)) {
    const a = l[0], c = (i = /name="([^"]*)"/.exec(a)) == null ? void 0 : i[1];
    if (c !== s && c !== e) continue;
    const d = (r = /r:id="([^"]+)"/.exec(a)) == null ? void 0 : r[1];
    if (!d) return null;
    const h = new RegExp(`<Relationship[^>]*Id="${d}"[^>]*Target="([^"]+)"`).exec(n);
    if (!h) return null;
    const f = h[1];
    return f.startsWith("/") ? f.slice(1) : `xl/${f.replace(/^\.\//, "")}`;
  }
  return null;
}
function km(o, e) {
  const t = bm(e);
  if (!t.length) return o;
  const n = Ye(o);
  if (!n["xl/workbook.xml"] || !n["xl/_rels/workbook.xml.rels"]) return o;
  let s = 1;
  for (const d of Object.keys(n)) {
    const h = /^xl\/pivotTables\/pivotTable(\d+)\.xml$/.exec(d);
    h && (s = Math.max(s, Number(h[1]) + 1));
  }
  let i = Z(n["xl/workbook.xml"]), r = 1;
  for (const d of i.matchAll(/cacheId="(\d+)"/g)) r = Math.max(r, Number(d[1]) + 1);
  let l = Z(n["xl/_rels/workbook.xml.rels"]), a = n["[Content_Types].xml"] ? Z(n["[Content_Types].xml"]) : "";
  const c = [];
  for (const d of t) {
    const h = Ql(n, d.hostSheet.name);
    if (!h || !n[h]) continue;
    const f = s++, u = r++, p = ym(d), g = wm(d, p);
    ge(n, `xl/pivotCache/pivotCacheDefinition${f}.xml`, xm(d, p, g.count)), ge(n, `xl/pivotCache/pivotCacheRecords${f}.xml`, g.xml), ge(
      n,
      `xl/pivotCache/_rels/pivotCacheDefinition${f}.xml.rels`,
      pn.replace("</Relationships>", `<Relationship Id="rId1" Type="${pm}" Target="pivotCacheRecords${f}.xml"/></Relationships>`)
    ), ge(n, `xl/pivotTables/pivotTable${f}.xml`, vm(d, p, u)), ge(
      n,
      `xl/pivotTables/_rels/pivotTable${f}.xml.rels`,
      pn.replace("</Relationships>", `<Relationship Id="rId1" Type="${Ko}" Target="../pivotCache/pivotCacheDefinition${f}.xml"/></Relationships>`)
    );
    const b = Tn(l, Ko, `pivotCache/pivotCacheDefinition${f}.xml`);
    l = b.rels, c.push(`<pivotCache cacheId="${u}" r:id="${b.rid}"/>`);
    const m = h.slice(0, h.lastIndexOf("/")), y = h.slice(h.lastIndexOf("/") + 1), w = `${m}/_rels/${y}.rels`, v = n[w] ? Z(n[w]) : pn;
    ge(n, w, Tn(v, jl, `../pivotTables/pivotTable${f}.xml`).rels);
    let x = "";
    x += `<Override PartName="/xl/pivotCache/pivotCacheDefinition${f}.xml" ContentType="${Vl}"/>`, x += `<Override PartName="/xl/pivotCache/pivotCacheRecords${f}.xml" ContentType="${Yl}"/>`, x += `<Override PartName="/xl/pivotTables/pivotTable${f}.xml" ContentType="${Xl}"/>`, a = a.replace("</Types>", x + "</Types>");
  }
  return c.length ? (ge(n, "xl/workbook.xml", ea(i, c)), ge(n, "xl/_rels/workbook.xml.rels", l), a && ge(n, "[Content_Types].xml", a), zt(n)) : o;
}
function ea(o, e) {
  if (o.includes("<pivotCaches>")) return o.replace("<pivotCaches>", `<pivotCaches>${e.join("")}`);
  const t = `<pivotCaches>${e.join("")}</pivotCaches>`;
  return o.includes("<extLst") ? o.replace("<extLst", `${t}<extLst`) : o.replace("</workbook>", `${t}</workbook>`);
}
const Cm = [
  [/pivotCacheDefinition\d*\.xml$/, Vl],
  [/pivotCacheRecords\d*\.xml$/, Yl],
  [/pivotTables\/pivotTable\d*\.xml$/, Xl]
];
function Sm(o, e) {
  var h, f, u, p, g;
  let t;
  try {
    t = Ye(e);
  } catch (b) {
    return o;
  }
  if (!t["xl/workbook.xml"]) return o;
  const n = Z(t["xl/workbook.xml"]), s = t["xl/_rels/workbook.xml.rels"] ? Z(t["xl/_rels/workbook.xml.rels"]) : "", i = [...n.matchAll(/<pivotCache\b[^>]*cacheId="(\d+)"[^>]*r:id="([^"]+)"[^>]*\/>/g)], r = Object.keys(t).filter((b) => b.startsWith("xl/pivotCache/") || b.startsWith("xl/pivotTables/"));
  if (!i.length || !r.length) return o;
  const l = Ye(o);
  if (!l["xl/workbook.xml"] || !l["xl/_rels/workbook.xml.rels"]) return o;
  for (const b of r) {
    if (l[b]) continue;
    const m = new Uint8Array(t[b].byteLength);
    m.set(t[b]), l[b] = m;
  }
  let a = Z(l["xl/_rels/workbook.xml.rels"]);
  const c = [];
  for (const [, b, m] of i) {
    const y = (h = new RegExp(`<Relationship[^>]*Id="${m}"[^>]*Target="([^"]+)"`).exec(s)) == null ? void 0 : h[1];
    if (!y) continue;
    const w = y.startsWith("/") ? y.slice(1).replace(/^xl\//, "") : y.replace(/^\.\//, "");
    if (!l[`xl/${w}`]) continue;
    const v = Tn(a, Ko, w);
    a = v.rels, c.push(`<pivotCache cacheId="${b}" r:id="${v.rid}"/>`);
  }
  if (!c.length) return o;
  ge(l, "xl/workbook.xml", ea(Z(l["xl/workbook.xml"]), c)), ge(l, "xl/_rels/workbook.xml.rels", a);
  const d = /* @__PURE__ */ new Map();
  for (const b of n.matchAll(/<sheet\b[^>]*>/g)) {
    const m = (f = /name="([^"]*)"/.exec(b[0])) == null ? void 0 : f[1], y = (u = /r:id="([^"]+)"/.exec(b[0])) == null ? void 0 : u[1];
    if (!m || !y) continue;
    const w = (p = new RegExp(`<Relationship[^>]*Id="${y}"[^>]*Target="([^"]+)"`).exec(s)) == null ? void 0 : p[1];
    w && d.set(w.startsWith("/") ? w.slice(1) : `xl/${w.replace(/^\.\//, "")}`, m);
  }
  for (const [b, m] of d) {
    const y = b.slice(0, b.lastIndexOf("/")), w = b.slice(b.lastIndexOf("/") + 1), v = t[`${y}/_rels/${w}.rels`];
    if (!v) continue;
    const x = [...Z(v).matchAll(/<Relationship[^>]*Type="[^"]*\/pivotTable"[^>]*Target="([^"]+)"/g)].map((T) => T[1]);
    if (!x.length) continue;
    const S = Ql(l, m);
    if (!S) continue;
    const k = S.slice(0, S.lastIndexOf("/")), M = S.slice(S.lastIndexOf("/") + 1), E = `${k}/_rels/${M}.rels`;
    let $ = l[E] ? Z(l[E]) : pn;
    for (const T of x)
      $.includes(`Target="${T}"`) || ($ = Tn($, jl, T).rels);
    ge(l, E, $);
  }
  if (l["[Content_Types].xml"]) {
    let b = Z(l["[Content_Types].xml"]), m = "";
    for (const y of r) {
      if (y.includes("/_rels/")) continue;
      const w = (g = Cm.find(([v]) => v.test(y))) == null ? void 0 : g[1];
      w && !b.includes(`/${y}`) && (m += `<Override PartName="/${y}" ContentType="${w}"/>`);
    }
    m && (b = b.replace("</Types>", m + "</Types>")), ge(l, "[Content_Types].xml", b);
  }
  return zt(l);
}
function dn() {
  return typeof requestAnimationFrame == "function" ? new Promise((o) => requestAnimationFrame((e) => o(e))) : new Promise((o) => setTimeout(() => o(0), 0));
}
function ae(o) {
  if (!(o != null && o.aborted)) return;
  if (typeof DOMException != "undefined")
    throw new DOMException("Aborted", "AbortError");
  const e = new Error("Aborted");
  throw e.name = "AbortError", e;
}
function $e(o) {
  if (!o) return;
  let e = /^#([0-9a-f]{6})$/i.exec(o);
  if (e) return ("FF" + e[1]).toUpperCase();
  if (e = /^#([0-9a-f]{8})$/i.exec(o), e) return (e[1].slice(6) + e[1].slice(0, 6)).toUpperCase();
  const t = /rgba?\(([^)]+)\)/i.exec(o);
  if (t) {
    const n = t[1].split(",").map((r) => r.trim()), s = (r) => Math.max(0, Math.min(255, Math.round(r))).toString(16).padStart(2, "0");
    return (s((n[3] != null ? +n[3] : 1) * 255) + s(+n[0]) + s(+n[1]) + s(+n[2])).toUpperCase();
  }
}
function Em(o) {
  const e = o.color ? $e(o.color) : void 0, t = {};
  return o.name && (t.name = o.name), o.size && (t.size = o.size), o.bold && (t.bold = !0), o.italic && (t.italic = !0), o.underline && (t.underline = o.underlineStyle === "double" ? "double" : !0), o.strike && (t.strike = !0), e && (t.color = { argb: e }), t;
}
function ta(o, e) {
  const t = e.font, n = $e(t.color);
  if (o.font = {
    name: t.name || void 0,
    size: t.size || void 0,
    bold: t.bold || void 0,
    italic: t.italic || void 0,
    underline: t.underline ? t.underlineStyle === "double" ? "double" : !0 : void 0,
    strike: t.strike || void 0,
    color: n ? { argb: n } : void 0
  }, e.fill && e.fill.type !== "none") {
    const r = $e(e.fill.fgColor), l = $e(e.fill.bgColor);
    o.fill = {
      type: "pattern",
      pattern: e.fill.type === "solid" ? "solid" : e.fill.pattern || "solid",
      fgColor: r ? { argb: r } : void 0,
      bgColor: l ? { argb: l } : void 0
    };
  }
  const s = e.borders;
  if (s && (s.top || s.bottom || s.left || s.right || s.diagonal)) {
    const r = (l) => l && l.style !== "none" ? { style: l.style, color: $e(l.color) ? { argb: $e(l.color) } : void 0 } : void 0;
    o.border = {
      top: r(s.top),
      bottom: r(s.bottom),
      left: r(s.left),
      right: r(s.right),
      diagonal: s.diagonal ? R({ up: !!s.diagonalUp, down: !!s.diagonalDown }, r(s.diagonal)) : void 0
    };
  }
  const i = {};
  e.hAlign && e.hAlign !== "general" && (i.horizontal = e.hAlign), e.vAlign && e.vAlign !== "bottom" && (i.vertical = e.vAlign), e.wrapText && (i.wrapText = !0), e.textRotation && (i.textRotation = e.textRotation), e.indent && (i.indent = e.indent), Object.keys(i).length && (o.alignment = i), e.numFmt && e.numFmt !== "General" && (o.numFmt = e.numFmt), e.protection && (e.protection.locked === !1 || e.protection.hidden) && (o.protection = { locked: e.protection.locked !== !1, hidden: !!e.protection.hidden });
}
function $n(o) {
  let e = "", t = o;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
function Hn(o) {
  return `${$n(o.left)}${o.top + 1}:${$n(o.right)}${o.bottom + 1}`;
}
function Tm(o) {
  return (o || []).map(Hn).join(" ");
}
function $m(o) {
  if (!o) return;
  const e = {}, t = o.font;
  if (t) {
    const n = {};
    t.bold && (n.bold = !0), t.italic && (n.italic = !0), t.underline && (n.underline = !0), t.strike && (n.strike = !0);
    const s = $e(t.color);
    s && (n.color = { argb: s }), Object.keys(n).length && (e.font = n);
  }
  if (o.fill && o.fill.type !== "none") {
    const n = $e(o.fill.fgColor);
    n && (e.fill = { type: "pattern", pattern: "solid", fgColor: { argb: n } });
  }
  return Object.keys(e).length ? e : void 0;
}
function Mm(o) {
  const e = o.priority || 1, t = $m(o.style);
  switch (o.type) {
    case "cellIs":
      return { type: "cellIs", operator: o.operator || "greaterThan", formulae: o.formulae || [], priority: e, style: t };
    case "expression":
      return { type: "expression", formulae: o.formulae || [], priority: e, style: t };
    case "colorScale": {
      const n = o.colorScale;
      if (!n) return null;
      const s = n.mid ? [{ type: "min" }, { type: "percentile", value: 50 }, { type: "max" }] : [{ type: "min" }, { type: "max" }], i = (n.mid ? [n.min, n.mid, n.max] : [n.min, n.max]).map((r) => ({ argb: $e(r) || "FF000000" }));
      return { type: "colorScale", cfvo: s, color: i, priority: e };
    }
    case "dataBar": {
      const n = o.dataBar;
      return n ? { type: "dataBar", cfvo: [{ type: "min" }, { type: "max" }], color: { argb: $e(n.color) || "FF638EC6" }, priority: e } : null;
    }
    case "iconSet": {
      const n = o.iconSet;
      return n ? { type: "iconSet", iconSet: n.name, reverse: !!n.reverse, cfvo: [{ type: "percent", value: 0 }, { type: "percent", value: 33 }, { type: "percent", value: 67 }], priority: e } : null;
    }
    case "top10": {
      const n = o.top10 || { rank: 10, percent: !1, bottom: !1 };
      return { type: "top10", rank: n.rank, percent: n.percent, bottom: n.bottom, priority: e, style: t };
    }
    default:
      return null;
  }
}
function na(o, e) {
  const t = e.conditional;
  if (Array.isArray(o.conditionalFormattings) && (o.conditionalFormattings = []), !(!t || !t.length))
    for (const n of t) {
      if (n.type === "unsupported") continue;
      const s = Tm(n.ranges);
      if (!s) continue;
      const r = n.origin !== "user" && !n.dirty && n.raw ? n.raw : Mm(n);
      if (r)
        try {
          o.addConditionalFormatting({ ref: s, rules: [r] });
        } catch (l) {
        }
    }
}
function oa(o) {
  var e, t, n, s, i, r;
  switch (o.type) {
    case "number":
    case "boolean":
    case "date":
    case "string":
      return o.raw;
    case "error":
      return { error: o.raw };
    case "formula": {
      const l = (e = o.formula) != null ? e : "", a = l[0] === "=" ? l.slice(1) : l;
      return o.dispImgId ? { formula: a, result: `=DISPIMG("${o.dispImgId}",1)` } : { formula: a, result: (t = o.raw) != null ? t : void 0 };
    }
    case "hyperlink":
      return { text: String((n = o.raw) != null ? n : ""), hyperlink: (s = o.hyperlink) != null ? s : "" };
    case "richtext":
      return o.rich ? { richText: o.rich.map((l) => l.font ? { text: l.text, font: Em(l.font) } : { text: l.text }) } : (i = o.raw) != null ? i : "";
    default:
      return (r = o.raw) != null ? r : null;
  }
}
function Cr(o) {
  return o != null && o.includes("jpeg") || o != null && o.includes("jpg") ? "jpeg" : o != null && o.includes("gif") ? "gif" : "png";
}
function Im(o, e, t, n) {
  var d;
  let s;
  if (t.bytes) s = { buffer: t.bytes, extension: Cr(t.mime) };
  else if ((d = t.src) != null && d.startsWith("data:")) {
    const h = t.src.indexOf(","), f = t.src.slice(5, h);
    s = { base64: t.src.slice(h + 1), extension: Cr(f) };
  } else return;
  const i = o.addImage(s), r = (h, f) => Sr((u) => n.colWidth(u), h, Ot(f)), l = (h, f) => Sr((u) => n.rowHeight(u), h, Ot(f)), a = { col: r(t.from.col, t.from.colOffEmu), row: l(t.from.row, t.from.rowOffEmu) }, c = t.editAs === "oneCell" || t.editAs === "absolute" || t.editAs === "twoCell" ? t.editAs : t.to ? "twoCell" : "oneCell";
  if (t.to)
    e.addImage(i, { tl: a, br: { col: r(t.to.col, t.to.colOffEmu), row: l(t.to.row, t.to.rowOffEmu) }, editAs: c });
  else {
    const h = re(n, t);
    e.addImage(i, { tl: a, ext: { width: h.width, height: h.height }, editAs: c });
  }
}
function Sr(o, e, t) {
  let n = e, s = t;
  for (; s > 0; ) {
    const r = o(n);
    if (r <= 0 || s < r) break;
    s -= r, n++;
  }
  const i = o(n);
  return n + (i > 0 ? s / i : 0);
}
function sa(o, e) {
  var i, r, l;
  const t = e.pageSetup, n = e.pageBreaks;
  if (!t && !n) return;
  const s = o.pageSetup || (o.pageSetup = {});
  if (t) {
    if (t.orientation && (s.orientation = t.orientation), t.paperFormat && !Array.isArray(t.paperFormat) && (s.paperSize = { a4: 9, a3: 8, letter: 1 }[t.paperFormat]), t.fitToPage ? (s.fitToPage = !0, t.fitToWidth != null && (s.fitToWidth = t.fitToWidth), t.fitToHeight != null && (s.fitToHeight = t.fitToHeight)) : t.scale != null && (s.scale = t.scale), t.margins) {
      const a = (c) => Math.round(c / 25.4 * 1e3) / 1e3;
      s.margins = {
        top: a(t.margins.top),
        bottom: a(t.margins.bottom),
        left: a(t.margins.left),
        right: a(t.margins.right),
        header: a(t.margins.header),
        footer: a(t.margins.footer)
      };
    }
    t.printArea && (s.printArea = Hn(t.printArea)), t.printTitleRows && (s.printTitlesRow = `${t.printTitleRows[0] + 1}:${t.printTitleRows[1] + 1}`), t.printTitleCols && (s.printTitlesColumn = `${$n(t.printTitleCols[0])}:${$n(t.printTitleCols[1])}`), t.printGridLines != null && (s.showGridLines = t.printGridLines), t.printHeadings != null && (s.showRowColHeaders = t.printHeadings);
  }
  if (n)
    for (const a of (i = n.rows) != null ? i : [])
      try {
        (l = (r = o.getRow(a + 1)).addPageBreak) == null || l.call(r);
      } catch (c) {
      }
}
function Am(o, e, t) {
  for (const [s, i] of e.columns) {
    const r = o.getColumn(s + 1);
    r.width = Math.max(0, (i.width - 5) / es), i.hidden && (r.hidden = !0);
  }
  for (const [s, i] of e.rows) {
    const r = o.getRow(s + 1);
    r.height = i.height / Rn, i.hidden && (r.hidden = !0);
  }
  for (const s of e.cells.values()) {
    const i = o.getCell(s.row + 1, s.col + 1);
    s.type !== "empty" && (i.value = oa(s));
    const r = e.styles[s.styleId];
    r && ta(i, r), s.comment && (i.note = s.comment);
  }
  for (const s of e.merges)
    try {
      o.mergeCells(s.top + 1, s.left + 1, s.bottom + 1, s.right + 1);
    } catch (i) {
    }
  e.freeze && (e.freeze.frozenRows || e.freeze.frozenCols) && (o.views = [{ state: "frozen", xSplit: e.freeze.frozenCols, ySplit: e.freeze.frozenRows }]), na(o, e), sa(o, e), ra(o, e), ia(o, e);
  const n = new qe(e, 1);
  for (const s of e.images)
    try {
      Im(t, o, s, n);
    } catch (i) {
    }
}
const Rm = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
function Fm(o, e) {
  var n, s;
  const t = new Set(e.cells.keys());
  o.eachRow({ includeEmpty: !1 }, (i, r) => {
    i.eachCell({ includeEmpty: !1 }, (l, a) => {
      t.has(O(r - 1, a - 1)) || (l.value = null);
    });
  });
  for (const i of e.cells.values()) {
    const r = o.getCell(i.row + 1, i.col + 1);
    r.value = i.type !== "empty" ? oa(i) : null;
    const l = e.styles[i.styleId];
    l && ta(r, l), i.comment && (r.note = i.comment);
  }
  for (const i of [...(s = (n = o.model) == null ? void 0 : n.merges) != null ? s : []])
    try {
      o.unMergeCells(i);
    } catch (r) {
    }
  for (const i of e.merges)
    try {
      o.mergeCells(i.top + 1, i.left + 1, i.bottom + 1, i.right + 1);
    } catch (r) {
    }
  for (const [i, r] of e.columns) {
    const l = o.getColumn(i + 1);
    l.width = Math.max(0, (r.width - 5) / es), r.hidden && (l.hidden = !0);
  }
  for (const [i, r] of e.rows) {
    const l = o.getRow(i + 1);
    l.height = r.height / Rn, r.hidden && (l.hidden = !0);
  }
  e.freeze && (e.freeze.frozenRows || e.freeze.frozenCols) && (o.views = [{ state: "frozen", xSplit: e.freeze.frozenCols, ySplit: e.freeze.frozenRows }]), na(o, e), sa(o, e), ra(o, e), ia(o, e);
}
function ia(o, e) {
  var s, i;
  const t = e.sheetProtection;
  if (t != null && t.protected)
    if (t.raw)
      o.sheetProtection = z(R({}, t.raw), { sheet: !0 });
    else {
      const r = R({ sheet: !0 }, (s = t.allow) != null ? s : {});
      if (t.password)
        try {
          o.protect(t.password, (i = t.allow) != null ? i : {});
        } catch (l) {
          o.sheetProtection = r;
        }
      else
        o.sheetProtection = r;
    }
  else
    o.sheetProtection && (o.sheetProtection = null);
  const n = e.protectedRanges;
  n && n.length && (o.protectedRanges = n.map((r) => ({ name: r.name, ref: Hn(r.range) })));
}
function ra(o, e) {
  var n, s, i;
  const t = e.dataValidationRules;
  if (!(!(t != null && t.length) || !((n = o.dataValidations) != null && n.add)))
    for (const r of t) {
      const l = { type: r.type, allowBlank: !!r.allowBlank };
      r.operator && (l.operator = r.operator), l.formulae = r.type === "list" ? [`"${((s = r.options) != null ? s : []).join(",")}"`] : ((i = r.formulae) != null ? i : []).map((a) => String(a)), r.showErrorMessage && (l.showErrorMessage = !0, r.errorStyle && (l.errorStyle = r.errorStyle), r.errorTitle && (l.errorTitle = r.errorTitle), r.error && (l.error = r.error)), r.showInputMessage && (l.showInputMessage = !0, r.promptTitle && (l.promptTitle = r.promptTitle), r.prompt && (l.prompt = r.prompt));
      try {
        o.dataValidations.add(Hn(r.range), l);
      } catch (a) {
      }
    }
}
async function Lm(o, e = {}) {
  var r, l, a, c, d, h, f, u, p;
  ae(e.signal);
  const t = await import("./exceljs.min-Bo1tFAdV.js").then((g) => g.e), n = (r = t.default) != null ? r : t;
  if (e.fidelity === "overlay" && e.sourceBuffer) {
    ae(e.signal);
    const g = new n.Workbook();
    await g.xlsx.load(e.sourceBuffer);
    for (let m = 0; m < o.sheets.length; m++) {
      ae(e.signal);
      const y = o.sheets[m], w = (a = (l = g.worksheets[m]) != null ? l : g.getWorksheet(y.name)) != null ? a : g.addWorksheet(y.name || `Sheet${m + 1}`);
      Fm(w, y), (c = e.onProgress) == null || c.call(e, { stage: "write", sheetIndex: m, ratio: (m + 1) / o.sheets.length, label: `写入 ${y.name}` });
    }
    (d = e.onProgress) == null || d.call(e, { stage: "zip", ratio: void 0, label: "zip 压缩 .xlsx…" });
    const b = await g.xlsx.writeBuffer();
    return ae(e.signal), (h = e.onProgress) == null || h.call(e, { stage: "zip", ratio: 1 }), Er(b, o, e);
  }
  const s = new n.Workbook();
  s.properties.date1904 = o.date1904;
  for (let g = 0; g < o.sheets.length; g++) {
    ae(e.signal);
    const b = o.sheets[g], m = s.addWorksheet(b.name || `Sheet${b.index + 1}`, {
      state: b.state === "visible" ? "visible" : b.state
    });
    Am(m, b, s), (f = e.onProgress) == null || f.call(e, { stage: "write", sheetIndex: g, ratio: (g + 1) / o.sheets.length, label: `写入 ${b.name}` });
  }
  (u = e.onProgress) == null || u.call(e, { stage: "zip", ratio: 0, label: "zip 压缩…" });
  const i = await s.xlsx.writeBuffer();
  return ae(e.signal), (p = e.onProgress) == null || p.call(e, { stage: "zip", ratio: 1 }), Er(i, o, e);
}
async function Nm(o, e = {}) {
  const t = await Lm(o, e);
  return new Blob([t], { type: Rm });
}
function Er(o, e, t) {
  let n = new Uint8Array(o);
  if (e.cellImages && e.cellImages.size && (n = sm(n, e)), e.sheets.some((s) => s.background))
    try {
      n = hm(n, e);
    } catch (s) {
    }
  if (e.protection && (e.protection.lockStructure || e.protection.lockWindows))
    try {
      n = um(n, e);
    } catch (s) {
    }
  if (t.pivotTables)
    try {
      t.fidelity === "overlay" && t.sourceBuffer && (n = Sm(n, new Uint8Array(t.sourceBuffer))), n = km(n, e);
    } catch (s) {
    }
  return n;
}
class Pm {
  constructor(e) {
    this.host = e;
  }
  /** target → 工作表索引列表 */
  resolveTargets(e = "active") {
    const t = this.host.getWorkbook();
    return t ? e === "all" ? t.sheets.map((n, s) => s).filter((n) => t.sheets[n].state === "visible") : e === "active" ? [this.host.getActiveIndex()] : typeof e == "number" ? [e] : e.filter((n) => t.sheets[n]) : [];
  }
  /** 取某表的 renderer: 活动表复用 live,其它表离屏新建 */
  rendererFor(e, t, n) {
    const s = this.host.getLiveRenderer();
    return e === this.host.getActiveIndex() && s ? s : new il(document.createElement("canvas"), t, n, 1, this.host.getRendererOpts());
  }
  baseName() {
    var n;
    const e = this.host.getWorkbook(), t = ((n = e == null ? void 0 : e.sheets[this.host.getActiveIndex()]) == null ? void 0 : n.name) || "workbook";
    return (this.host.getFileName() || t).replace(/\.[^.]+$/, "");
  }
  /** 离屏渲染一个图表为 dataURL(供非当前表 / 统一合成);echarts 不可用返回 null */
  async chartDataUrl(e, t) {
    let n;
    try {
      n = await ql();
    } catch (l) {
      return null;
    }
    const s = re(t, e.anchor), i = document.createElement("div");
    i.style.cssText = `position:fixed;left:-10000px;top:0;width:${Math.max(80, Math.round(s.width))}px;height:${Math.max(60, Math.round(s.height))}px`, document.body.appendChild(i);
    const r = n.init(i);
    try {
      return r.setOption(Ul(e)), r.getDataURL({ pixelRatio: 2, backgroundColor: "#fff" });
    } catch (l) {
      return null;
    } finally {
      r.dispose(), i.remove();
    }
  }
  /** 收集一个工作表的叠加层装饰(图片/图表/形状),供合成到导出底图 */
  async collectDecorations(e, t) {
    const n = [];
    for (const i of e.images)
      if (i.src)
        try {
          n.push({ source: await Ji(i.src), anchor: i });
        } catch (r) {
        }
    const s = [];
    for (const i of e.charts) {
      const r = await this.chartDataUrl(i, t);
      if (r)
        try {
          s.push({ source: await Ji(r), anchor: i.anchor });
        } catch (l) {
        }
    }
    return { images: n, charts: s, shapes: e.shapes };
  }
  /**
   * 为一个工作表生成合成底图(格子 + 图片/图表/形状)。
   * withTitles(PDF/打印): 应用 pageSetup 打印标题行(抽出标题条 + 正文剔除标题行)与缩放。
   */
  async buildSheetImage(e, t, n = !1) {
    var k, M;
    const s = this.host.getWorkbook(), i = s == null ? void 0 : s.sheets[e];
    if (!s || !i) return null;
    const r = this.rendererFor(e, i, s), l = i.pageSetup, a = i.dimension, c = { top: 0, left: 0, bottom: Math.max(0, a.rows - 1), right: Math.max(0, a.cols - 1) }, d = (M = (k = t.range) != null ? k : l == null ? void 0 : l.printArea) != null ? M : c;
    let h = null, f = null, u = d.top, p = d.left;
    if (n && (l != null && l.printTitleRows)) {
      const [E, $] = l.printTitleRows;
      $ >= E && E <= d.top && $ < d.bottom && (h = [E, $], u = Math.max(d.top, $ + 1));
    }
    if (n && (l != null && l.printTitleCols)) {
      const [E, $] = l.printTitleCols;
      $ >= E && E <= d.left && $ < d.right && (f = [E, $], p = Math.max(d.left, $ + 1));
    }
    const g = (E, $) => r.exportToCanvas({
      range: E,
      scale: $ != null ? $ : t.scale,
      includeHeaders: t.includeHeaders,
      gridlines: t.gridlines,
      background: t.background
    }), b = g({ top: u, left: p, bottom: d.bottom, right: d.right }), m = await this.collectDecorations(i, b.metrics);
    Mg(b, m);
    const y = b.scale;
    let w, v, x;
    if (h) {
      const E = g({ top: h[0], bottom: h[1], left: p, right: d.right }, y);
      w = { canvas: E.canvas, heightCss: E.bodyH };
    }
    if (f) {
      const E = g({ top: u, bottom: d.bottom, left: f[0], right: f[1] }, y);
      v = { canvas: E.canvas, widthCss: E.bodyW };
    }
    h && f && (x = { canvas: g({ top: h[0], bottom: h[1], left: f[0], right: f[1] }, y).canvas });
    const S = t.fitToWidth === !1 && (l != null && l.scale) ? l.scale / 100 : void 0;
    return {
      canvas: b.canvas,
      bodyWcss: b.bodyW,
      bodyHcss: b.bodyH,
      sheetName: i.name,
      repeatTop: w,
      repeatLeft: v,
      corner: x,
      zoom: S
    };
  }
  /** 为一个工作表生成矢量导出输入(逐格信息 + 兜底底图 + 图片图表 + 标题行) */
  async buildVectorSheet(e, t) {
    var x, S, k, M, E;
    const n = this.host.getWorkbook(), s = n == null ? void 0 : n.sheets[e];
    if (!n || !s) return null;
    const i = this.rendererFor(e, s, n), r = new qe(s, 1), l = s.pageSetup, a = s.dimension, c = { top: 0, left: 0, bottom: Math.max(0, a.rows - 1), right: Math.max(0, a.cols - 1) }, d = (S = (x = t.range) != null ? x : l == null ? void 0 : l.printArea) != null ? S : c;
    let h, f, u = d.top, p = d.left;
    if (l != null && l.printTitleRows) {
      const [$, T] = l.printTitleRows;
      T >= $ && $ <= d.top && T < d.bottom && (h = [$, T], u = Math.max(d.top, T + 1));
    }
    if (l != null && l.printTitleCols) {
      const [$, T] = l.printTitleCols;
      T >= $ && $ <= d.left && T < d.right && (f = [$, T], p = Math.max(d.left, T + 1));
    }
    const g = h ? Math.min(d.top, h[0]) : d.top, b = f ? Math.min(d.left, f[0]) : d.left, m = i.exportToCanvas({
      range: { top: g, left: b, bottom: d.bottom, right: d.right },
      scale: t.scale,
      includeHeaders: !1,
      gridlines: t.gridlines,
      background: t.background
    }), y = await this.collectDecorations(s, m.metrics), w = [...(k = y.images) != null ? k : [], ...(M = y.charts) != null ? M : []], v = t.fitToWidth === !1 && (l != null && l.scale) ? l.scale / 100 : void 0;
    return {
      sheetName: s.name,
      metrics: r,
      bodyLeft: p,
      bodyRight: d.right,
      bodyTop: u,
      bodyBottom: d.bottom,
      titleRows: h,
      titleCols: f,
      merges: s.merges,
      gridlines: (E = t.gridlines) != null ? E : s.showGridLines,
      zoom: v,
      getCell: ($, T) => i.exportCellDraw($, T),
      rasterCanvas: m.canvas,
      rasterScale: m.scale,
      rasterTop: g,
      rasterLeft: b,
      images: w
    };
  }
  /** 从工作表原生 pageSetup 推导导出默认值(纸张/方向/边距/是否适应页宽) */
  pageSetupDefaults(e) {
    var s, i;
    const t = (i = (s = this.host.getWorkbook()) == null ? void 0 : s.sheets[e]) == null ? void 0 : i.pageSetup;
    if (!t) return {};
    const n = {};
    return t.paperFormat && (n.format = t.paperFormat), t.orientation && (n.orientation = t.orientation), t.margins && (n.margin = { top: t.margins.top, right: t.margins.right, bottom: t.margins.bottom, left: t.margins.left }), n.fitToWidth = !!t.fitToPage, t.printGridLines != null && (n.gridlines = t.printGridLines), t.printHeadings != null && (n.includeHeaders = t.printHeadings), n;
  }
  // ====================== 对外导出 API ======================
  /** 导出当前/指定表为图片 Blob(图片为单表;多表请用 PDF) */
  async exportImage(e = {}) {
    var i, r, l, a, c;
    ae(e.signal);
    const t = this.resolveTargets(e.target);
    if (!t.length) throw new Error("无可导出的工作表");
    (i = e.onProgress) == null || i.call(e, { stage: "render", sheetIndex: t[0], ratio: void 0, label: "渲染表格…" });
    const n = await this.buildSheetImage(t[0], e);
    if (!n) throw new Error("导出失败: 无法生成底图");
    ae(e.signal), (r = e.onProgress) == null || r.call(e, { stage: "write", sheetIndex: t[0], ratio: void 0, label: "编码图片…" });
    const s = await Pp(n.canvas, (l = e.type) != null ? l : "png", (a = e.quality) != null ? a : 0.92);
    return (c = e.onProgress) == null || c.call(e, { stage: "write", ratio: 1 }), s;
  }
  async downloadImage(e = {}) {
    var s;
    const t = await this.exportImage(e), n = e.type === "jpeg" ? "jpg" : e.type === "webp" ? "webp" : "png";
    lt(t, (s = e.fileName) != null ? s : `${this.baseName()}.${n}`);
  }
  /** 导出为 PDF Blob(每个目标表分页;需可选依赖 jspdf)。未显式指定的页面参数取自工作表 pageSetup。
   *  支持 `onProgress` 分阶段(render/compose/paginate/write)报进度 + `signal` 取消(标准 AbortSignal)。 */
  async exportPdf(e = {}) {
    var c, d, h, f, u, p, g, b;
    ae(e.signal);
    const t = this.resolveTargets(e.target);
    if (!t.length) throw new Error("无可导出的工作表");
    const n = R(R({}, this.pageSetupDefaults(t[0])), e), s = t.length, i = (m) => s > 1 ? m / s : void 0, r = (m) => s > 1 ? `已渲染 ${m}/${s}` : "渲染表格…";
    if (n.vector) {
      const m = [];
      for (let w = 0; w < s; w++) {
        ae(e.signal), (c = e.onProgress) == null || c.call(e, { stage: "render", sheetIndex: t[w], ratio: i(w), label: s > 1 ? `渲染 ${w + 1}/${s}` : "渲染表格…" });
        const v = await this.buildVectorSheet(t[w], n);
        v && m.push(v), (d = e.onProgress) == null || d.call(e, { stage: "render", sheetIndex: t[w], ratio: i(w + 1), label: r(w + 1) }), await dn();
      }
      ae(e.signal), (h = e.onProgress) == null || h.call(e, { stage: "write", ratio: void 0, label: "生成矢量 PDF…" });
      const y = await Hg(m, n);
      return (f = e.onProgress) == null || f.call(e, { stage: "write", ratio: 1 }), y;
    }
    const l = [];
    for (let m = 0; m < s; m++) {
      ae(e.signal), (u = e.onProgress) == null || u.call(e, { stage: "render", sheetIndex: t[m], ratio: i(m), label: s > 1 ? `渲染 ${m + 1}/${s}` : "渲染表格…" });
      const y = await this.buildSheetImage(t[m], n, !0);
      y && l.push(y), (p = e.onProgress) == null || p.call(e, { stage: "render", sheetIndex: t[m], ratio: i(m + 1), label: r(m + 1) }), await dn();
    }
    ae(e.signal), (g = e.onProgress) == null || g.call(e, { stage: "write", ratio: void 0, label: "生成 PDF 文件…" });
    const a = await Fg(l, n);
    return (b = e.onProgress) == null || b.call(e, { stage: "write", ratio: 1 }), a;
  }
  async downloadPdf(e = {}) {
    var n;
    const t = await this.exportPdf(e);
    lt(t, (n = e.fileName) != null ? n : `${this.baseName()}.pdf`);
  }
  /** 打开系统打印(可在对话框另存为 PDF)。页面参数同样默认取自 pageSetup。 */
  async print(e = {}) {
    var l, a, c;
    ae(e.signal);
    const t = this.resolveTargets(e.target);
    if (!t.length) return;
    const n = R(R({}, this.pageSetupDefaults(t[0])), e), s = t.length, i = (d) => s > 1 ? d / s : void 0, r = [];
    for (let d = 0; d < s; d++) {
      ae(e.signal), (l = e.onProgress) == null || l.call(e, { stage: "render", sheetIndex: t[d], ratio: i(d), label: s > 1 ? `渲染 ${d + 1}/${s}` : "渲染表格…" });
      const h = await this.buildSheetImage(t[d], n, !0);
      h && r.push(h), (a = e.onProgress) == null || a.call(e, { stage: "render", sheetIndex: t[d], ratio: i(d + 1), label: s > 1 ? `已渲染 ${d + 1}/${s}` : "准备打印…" }), await dn();
    }
    Xg(r, z(R({}, n), { title: (c = n.title) != null ? c : this.baseName() }));
  }
  /**
   * 打印预览:同 print() 的合成 + 分页管线,但**返回每页 canvas**(不开打印窗口),供预览对话框展示。
   * 复用 pageSetupDefaults(纸张/方向/边距/网格线)+ buildSheetImage + sliceToPages,与实际打印所见一致。
   */
  async buildPrintPages(e = {}) {
    var h;
    const t = this.resolveTargets(e.target);
    if (!t.length) return [];
    const n = R(R({}, this.pageSetupDefaults(t[0])), e), [s, i] = Pn(n.format, n.orientation), r = On(n.margin), l = Math.max(1, s - r.left - r.right), a = Math.max(1, i - r.top - r.bottom), c = (h = n.fitToWidth) != null ? h : !0, d = [];
    for (const f of t) {
      ae(e.signal);
      const u = await this.buildSheetImage(f, n, !0);
      if (!u) continue;
      const p = us(u.canvas, u.bodyWcss, u.bodyHcss, {
        contentWmm: l,
        contentHmm: a,
        fitToWidth: c,
        zoom: u.zoom,
        repeatTop: u.repeatTop,
        repeatLeft: u.repeatLeft,
        corner: u.corner
      });
      d.push({ sheetName: u.sheetName, pages: p.map((g) => g.canvas) }), await dn();
    }
    return d;
  }
  // ====================== 数据导出(E8;复用读层 + 从模型重建 xlsx) ======================
  /** 整簿 → JSON 文本(各表首行作 key 的对象数组)。 */
  exportJson(e) {
    const t = this.host.getWorkbook();
    if (!t) throw new Error("无工作簿可导出");
    return Zg(t, e);
  }
  downloadJson(e) {
    lt(new Blob([this.exportJson(e)], { type: "application/json" }), `${this.baseName()}.json`);
  }
  /** 一张表 → CSV 文本(默认活动表、格式化显示值)。 */
  exportCsv(e = {}) {
    const t = this.host.getWorkbook();
    if (!t) throw new Error("无工作簿可导出");
    const n = t.sheets[typeof e.target == "number" ? e.target : this.host.getActiveIndex()];
    if (!n) throw new Error("无工作表可导出");
    return Jg(n, { format: e.format, date1904: t.date1904 });
  }
  downloadCsv(e = {}) {
    lt(new Blob(["\uFEFF" + this.exportCsv(e)], { type: "text/csv;charset=utf-8" }), `${this.baseName()}.csv`);
  }
  /** 整簿 → .xlsx Blob(默认从模型重建;`fidelity:'overlay'` 重载原件叠加编辑,保真更高)。 */
  exportXlsx(e) {
    var s, i, r, l, a, c, d;
    const t = this.host.getWorkbook();
    if (!t) throw new Error("无工作簿可导出");
    const n = R({}, e);
    if (n.fidelity === "overlay" && !n.sourceBuffer) {
      const h = (r = (i = (s = this.host).getSourceBuffer) == null ? void 0 : i.call(s)) != null ? r : null;
      h && (n.sourceBuffer = h);
    }
    return (d = n.pivotTables) != null || (n.pivotTables = (c = (a = (l = this.host).isPivotEnabled) == null ? void 0 : a.call(l)) != null ? c : !1), Nm(t, n);
  }
  async downloadXlsx(e) {
    lt(await this.exportXlsx(e), `${this.baseName()}.xlsx`);
  }
}
const Tr = "(空白)", $r = {
  green: "#217346",
  blue: "#2b6cb0",
  orange: "#c05621",
  red: "#b42318",
  purple: "#7030a0",
  teal: "#0e7c86",
  gray: "#6b7280"
};
function Mt(o, e) {
  const t = o.replace("#", ""), n = (i) => parseInt(t.slice(i, i + 2), 16), s = (i) => Math.round(i + (255 - i) * e).toString(16).padStart(2, "0");
  return "#" + s(n(0)) + s(n(2)) + s(n(4));
}
function Mr(o, e) {
  const t = o.replace("#", ""), n = (i) => parseInt(t.slice(i, i + 2), 16), s = (i) => Math.round(i * (1 - e)).toString(16).padStart(2, "0");
  return "#" + s(n(0)) + s(n(2)) + s(n(4));
}
function Om(o) {
  return new Promise((e, t) => {
    const n = new FileReader();
    n.onload = () => e(String(n.result)), n.onerror = () => t(n.error), n.readAsDataURL(o);
  });
}
function Ir(o) {
  return new Promise((e) => {
    if (typeof Image == "undefined") {
      e({ width: 120, height: 90 });
      return;
    }
    const t = new Image();
    t.onload = () => e({ width: t.naturalWidth || 120, height: t.naturalHeight || 90 }), t.onerror = () => e({ width: 120, height: 90 }), t.src = o;
  });
}
function Hm(o) {
  var s;
  if (o === "plain") return { h: "#6b7280", ht: "#ffffff", b: "#f3f4f6", border: "#c8ccd0" };
  const [e, t = "medium"] = o.split("-"), n = (s = $r[e]) != null ? s : $r.green;
  return t === "light" ? { h: Mt(n, 0.82), ht: Mr(n, 0.15), b: Mt(n, 0.93), border: Mt(n, 0.55) } : t === "dark" ? { h: Mr(n, 0.25), ht: "#ffffff", b: Mt(n, 0.78), border: n } : { h: n, ht: "#ffffff", b: Mt(n, 0.88), border: "#c8ccd0" };
}
class gb {
  constructor(e, t) {
    /** 当前渲染器(壳通过 onRenderer 镜像) */
    C(this, "renderer", null);
    /** 视图状态(滚动/缩放/尺寸);壳与控制器共享同一对象 */
    C(this, "view", { scrollX: 0, scrollY: 0, width: 0, height: 0, zoom: 1 });
    C(this, "overlays");
    C(this, "sheet", null);
    C(this, "rafId", 0);
    C(this, "contentW", 0);
    C(this, "contentH", 0);
    /** 虚拟外推行/列数(滚动出空行/空列;只增不减,封顶 Excel 上限)。不动 dimension/文件。 */
    C(this, "virtualRows", 0);
    C(this, "virtualCols", 0);
    // ---- 导出上下文(供 WorkbookExporter 取数) ----
    C(this, "workbook", null);
    C(this, "activeIndex", 0);
    C(this, "rendererOpts", {});
    /** 下载默认文件名(壳可随 props 更新) */
    C(this, "fileName");
    /** 右键上下文菜单宿主(G3;body 级 DOM,框架无关) */
    C(this, "menuHost", new Uu());
    C(this, "lightbox", new Op());
    C(this, "printPreview", new Hp());
    C(this, "insertFnDialog", new Wp());
    C(this, "dvDialog", new jp());
    C(this, "removeDupDialog", new Gp());
    C(this, "t2cDialog", new eg());
    C(this, "protectSheetDialog", new tg());
    C(this, "protectWbDialog", new ng());
    C(this, "allowRangesDialog", new sg());
    C(this, "taskPane", new ig());
    C(this, "pivotDialog", new ju());
    C(this, "pivotPanel", new Vu());
    C(this, "pasteConfigDialog", new Gu());
    C(this, "readonlyPrompt", new Zu());
    C(this, "validationPrompt", new tp());
    C(this, "cfDialog", new rp());
    C(this, "numFmtDialog", new dp());
    C(this, "commentDialog", new hp());
    C(this, "pageSetupDialog", new bp());
    C(this, "backgroundDialog", new xp());
    C(this, "seriesDialog", new Pu());
    C(this, "sortDialog", new Cp());
    C(this, "imageOversizeDialog", new Fu());
    /** 当前输入提示气泡的签名(格+位置),变了才重建,避免每帧 render 抖动 */
    C(this, "bubbleSig", "");
    /** 用户新建条件格式规则的自增序号(派 id `cf-u<n>`,只增不减,session 内唯一) */
    C(this, "cfSeq", 0);
    /** 格式刷(1.12.0):采样到的样式(armed 时非空)+ 是否连续刷 */
    C(this, "painterStyle", null);
    C(this, "painterSticky", !1);
    /** 透视表"活刷新"重入兜底:recompute 内部 setCellValue 不再触发 onModelChange,此旗保险。 */
    C(this, "pivotRefreshing", !1);
    C(this, "lightboxEnabled", !0);
    /** 用户的右键菜单 transform 回调(Plan C):`(ctx, items) => MenuItem[] | undefined` */
    C(this, "ctxMenuTransform", null);
    /** 原始 .xlsx 字节(壳加载时注入;供高保真 overlay 导出重载原件) */
    C(this, "sourceBuffer", null);
    C(this, "exporter");
    // ---- 选区模型 ----
    C(this, "selAnchor", null);
    // 固定角(扩选时不动)
    C(this, "selActive", null);
    // 活动角(移动/扩选时变)
    C(this, "selMode", "range");
    /** 不连续多区域(1.13.0):Ctrl+点击已提交的"附加选区";当前(anchor/active)是活动区,总选区 = 这些 + 当前。 */
    C(this, "selRanges", []);
    // ---- 拖拽态 ----
    C(this, "dragMode", "none");
    /** 自动填充(1.10.0):拖拽起点的源选区 + 当前目标范围 + 方向 */
    C(this, "fillBase", null);
    C(this, "fillRange", null);
    C(this, "fillDir", "down");
    C(this, "resizeTarget", -1);
    // 正在拖拽改宽高的列/行索引
    // 图片拖拽态(E6)
    C(this, "imageDragIdx", -1);
    C(this, "imageDragStartRect", null);
    C(this, "imageDragStartMouse", { x: 0, y: 0 });
    C(this, "imageDragBefore", null);
    /** 当前选中的浮动图 index(-1 无);画选框+8 控制点、resize 用。 */
    C(this, "selectedImageIdx", -1);
    /** image-resize 拖拽:抓的是哪个控制点方向。 */
    C(this, "imageResizeDir", null);
    /** 裁剪模式:正在裁剪的浮动图 index(-1 非裁剪);此时拖控制点=裁剪而非缩放。 */
    C(this, "cropModeIdx", -1);
    C(this, "imageCropStart", null);
    C(this, "resizeStartPos", 0);
    // 起始鼠标坐标(px)
    C(this, "resizeStartSize", 0);
    // 起始宽/高(px,zoom 后)
    C(this, "resizeStartInfo", null);
    // 拖拽起始的列/行维度信息(克隆,供 undo)
    C(this, "resizeStartModelSize", 0);
    // 拖拽起始的模型 px 尺寸(非缩放,dim-change 事件用)
    C(this, "dragMoved", !1);
    C(this, "dragStartXY", null);
    // mousedown 起点(死区判定:超 3px 才算拖动)
    // ---- 查找态 ----
    C(this, "findQuery", "");
    C(this, "findReplace", "");
    C(this, "findMatchCase", !1);
    C(this, "findWholeCell", !1);
    C(this, "findScope", "sheet");
    C(this, "findDirection", "row");
    C(this, "findLookIn", "value");
    C(this, "findWildcard", !1);
    C(this, "findHits", []);
    // 跨表命中(工作簿范围含多表)
    C(this, "findIndex", -1);
    // 全局命中下标(跨表)
    /** 跨表跳转:切表后待定位的命中(rebuild 重跑查找后应用) */
    C(this, "pendingFindFocus", null);
    /** WPS 查找和替换对话框(框架无关 DOM,三壳共用)。1.16.1 */
    C(this, "findDialog", new wg());
    // ---- 自动筛选态(仅作用于当前表) ----
    C(this, "filterState", /* @__PURE__ */ new Map());
    // 列 → 按值/按条件筛选(缺省=未筛选)
    C(this, "filterPopupHost", new pg());
    C(this, "filterOrigHidden", /* @__PURE__ */ new Map());
    // 行 → 原始 hidden(首次筛选前快照)
    // ---- 排序态(仅作用于当前表;rebuild 时重置) ----
    C(this, "sortCol", -1);
    C(this, "sortDir", null);
    // ---- 编辑配置(默认只读;E0 只做闸门,后续阶段在此扩展) ----
    C(this, "editCfg", {});
    /** 编辑底座(命令栈/快照/事件;E1) */
    C(this, "edit");
    /** 单元格编辑器宿主(E2) */
    C(this, "editorHost");
    /** 按格解析编辑器(壳合并 plugin.editor + prop.editor 后注入;E2) */
    C(this, "editorResolver");
    /** paste 事件处理器(绑在 scroller 上;Ctrl+V 走它拿**原始**剪贴板 HTML,避开 clipboard.read() 的净化) */
    C(this, "onPasteHandler", (e) => this.onPaste(e));
    // ---- 触屏手势(1.16.2:手机端只读高保真查看)----
    // 单指平移交给原生 scroller(touch-action: pan-x pan-y),双指走 pinch 缩放,双击切缩放。
    // 坐标/缩放全走既有 setZoom(保持视口中心),不碰 DPR/命中数学,零回归。
    C(this, "pinching", !1);
    C(this, "pinchStartDist", 0);
    C(this, "pinchStartZoom", 1);
    C(this, "lastTapTime", 0);
    C(this, "lastTapX", 0);
    C(this, "lastTapY", 0);
    C(this, "onTouchStartHandler", (e) => {
      e.touches.length === 2 && (this.pinching = !0, this.pinchStartDist = this.touchDist(e), this.pinchStartZoom = this.view.zoom, e.preventDefault());
    });
    C(this, "onTouchMoveHandler", (e) => {
      if (this.pinching && e.touches.length === 2) {
        e.preventDefault();
        const t = this.touchDist(e);
        this.pinchStartDist > 0 && this.requestZoom(this.pinchStartZoom * (t / this.pinchStartDist));
      }
    });
    C(this, "onTouchEndHandler", (e) => {
      if (this.pinching) {
        e.touches.length < 2 && (this.pinching = !1);
        return;
      }
      if (e.touches.length === 0 && e.changedTouches.length === 1) {
        const t = e.changedTouches[0], n = typeof performance != "undefined" ? performance.now() : 0;
        n - this.lastTapTime < 300 && Math.abs(t.clientX - this.lastTapX) < 30 && Math.abs(t.clientY - this.lastTapY) < 30 ? (this.requestZoom(this.view.zoom < 1.5 ? 2 : 1), this.lastTapTime = 0, e.preventDefault()) : (this.lastTapTime = n, this.lastTapX = t.clientX, this.lastTapY = t.clientY);
      }
    });
    // ===== WPS「插入 → 图片」(浮动式 / 嵌入到单元格)=====
    /** 图片插入模式(WPS 图片下拉顶部单选):'float' 浮动式 / 'cell' 嵌入到单元格。默认 float。 */
    C(this, "imageInsertMode", "float");
    C(this, "showAllCommentsOn", !1);
    C(this, "formulaBarVisible", !0);
    C(this, "freezePreviewOn", !1);
    this.els = e, this.hooks = t, this.overlays = new Tg(e.overlays);
    const n = {
      getWorkbook: () => this.workbook,
      getActiveIndex: () => this.activeIndex,
      getLiveRenderer: () => this.renderer,
      getRendererOpts: () => this.rendererOpts,
      getFileName: () => this.fileName,
      getSourceBuffer: () => this.sourceBuffer,
      isPivotEnabled: () => !!this.editCfg.pivotTable
    };
    this.exporter = new Pm(n);
    const s = {
      getSheet: () => this.sheet,
      getWorkbook: () => this.workbook,
      getDate1904: () => {
        var i, r;
        return (r = (i = this.workbook) == null ? void 0 : i.date1904) != null ? r : !1;
      },
      isEditable: (i, r) => this.isCellEditable(i, r),
      isEditingEnabled: () => !!this.editCfg.editable,
      getActiveSheetIndex: () => this.activeIndex,
      isRecalcEnabled: () => !!this.editCfg.editable && !!this.editCfg.recalc,
      getEngineFactory: () => {
        var i;
        return this.editCfg.editable && this.editCfg.recalc ? (i = this.editCfg.formulaEngine) != null ? i : ru : null;
      },
      onModelChange: () => {
        var i;
        this.refreshPivotsAfterEdit(), (i = this.renderer) == null || i.rebuildMetrics(), this.refreshContentSize(), this.render();
      },
      rebuildOverlays: () => {
        this.sheet && this.renderer && this.overlays.build(this.sheet, this.renderer, this.view);
      },
      emit: (i, r) => this.emitEditEvent(i, r)
    };
    this.edit = new Hh(s), this.editorHost = new Bu(e.editorSlot, (i, r) => this.rectOf(i, r)), e.scroller.addEventListener("paste", this.onPasteHandler), e.scroller.addEventListener("touchstart", this.onTouchStartHandler, { passive: !1 }), e.scroller.addEventListener("touchmove", this.onTouchMoveHandler, { passive: !1 }), e.scroller.addEventListener("touchend", this.onTouchEndHandler, { passive: !1 });
  }
  /** 壳在加载后注入原始字节(供 exportXlsx({fidelity:'overlay'}) 重载原件叠加编辑) */
  setSourceBuffer(e) {
    this.sourceBuffer = e;
  }
  touchDist(e) {
    const t = e.touches[0], n = e.touches[1];
    return Math.hypot(t.clientX - n.clientX, t.clientY - n.clientY);
  }
  /** 手势请求缩放:立即 setZoom(即时顺滑重绘)+ 通知壳同步显示。clamp 0.3–3(比下拉 0.5–2 宽,方便手机看清)。 */
  requestZoom(e) {
    var t, n;
    e = Math.min(3, Math.max(0.3, e)), this.setZoom(e), (n = (t = this.hooks).onZoomChange) == null || n.call(t, e);
  }
  /** 切表/换簿/主题变化: 清状态,重建渲染器,重置滚动,量尺寸,建叠加层,绘制,按需重跑查找 */
  rebuild(e, t, n, s) {
    this.selAnchor = null, this.selActive = null, this.selMode = "range", this.selectImage(-1), this.hooks.onSelectionChange(), this.findHits = [], this.findIndex = -1, this.hooks.onTooltip(null), this.sortCol = -1, this.sortDir = null, this.editorHost.unmount(), this.edit.reset();
    const i = this.workbook !== t;
    this.sheet = e, this.workbook = t, i && (this.edit.resetDirtyBaseline(), this.edit.refreshEngine()), this.activeIndex = Math.max(0, t.sheets.indexOf(e)), this.rendererOpts = s, this.renderer = new il(this.els.canvas, e, t, n, z(R({}, s), {
      onNeedsRedraw: () => this.scheduleRender(),
      // WPS 内嵌图异步解码完触发重绘
      isEditable: (r, l) => this.isCellEditable(r, l)
      // Phase C 2026-06-08: 让渲染层感知 editable
    })), this.renderer.showFillHandle = !!this.editCfg.editable, this.renderer.setShowAllComments(this.showAllCommentsOn), this.hooks.onRenderer(this.renderer), this.view.zoom = n, this.view.scrollX = 0, this.view.scrollY = 0, this.virtualRows = 0, this.virtualCols = 0, this.els.scroller.scrollLeft = 0, this.els.scroller.scrollTop = 0, this.refreshContentSize(), this.measure(), this.overlays.build(e, this.renderer, this.view), this.render(), this.findQuery && (this.recomputeFind(), this.resolvePendingFindFocus());
  }
  /** 立即绘制(取消挂起的 rAF)。绘制 + 定位叠加层 + 通知 tick。 */
  render() {
    this.rafId && (cancelAnimationFrame(this.rafId), this.rafId = 0);
    const e = this.renderer;
    e && (e.setSelection(this.getSelection()), e.setExtraSelection(this.selRanges), e.render(this.view), this.sheet && this.overlays.position(this.sheet, e, this.view), this.editorHost.position(), this.updateValidationBubble(), this.taskPane.isOpen() && this.taskPane.refresh(), this.hooks.onRenderTick());
  }
  /** 合并到下一帧绘制(滚动/拖选高频时,每帧最多一次) */
  scheduleRender() {
    this.rafId || (this.rafId = requestAnimationFrame(() => {
      this.rafId = 0, this.render();
    }));
  }
  /** 量可视区尺寸 */
  measure() {
    this.view.width = this.els.renderArea.clientWidth, this.view.height = this.els.renderArea.clientHeight, this.recomputeVirtualExtent();
  }
  /** 同步滚动量(壳的 scroll 事件里调) */
  setScroll(e, t) {
    this.view.scrollX = e, this.view.scrollY = t, this.recomputeVirtualExtent(), this.scheduleRender();
  }
  /** 当前缩放(壳 watch 用它去重,避免 pinch 已改 core 后 watch 再回调一次 setZoom 双重渲染)。 */
  getZoom() {
    return this.view.zoom;
  }
  /** 缩放: 保持视口中心相对内容的比例,避免跳到左上角 */
  setZoom(e) {
    const t = this.renderer, n = this.els.scroller;
    if (!t) return;
    const s = this.contentW ? (n.scrollLeft + n.clientWidth / 2) / this.contentW : 0, i = this.contentH ? (n.scrollTop + n.clientHeight / 2) / this.contentH : 0;
    t.setZoom(e), this.view.zoom = e, this.recomputeVirtualExtent(), this.refreshContentSize(), n.scrollLeft = Math.max(0, s * this.contentW - n.clientWidth / 2), n.scrollTop = Math.max(0, i * this.contentH - n.clientHeight / 2), this.view.scrollX = n.scrollLeft, this.view.scrollY = n.scrollTop, this.render();
  }
  /** 拖拽改列宽(px) */
  setColWidthPx(e, t) {
    var n;
    (n = this.renderer) == null || n.setColWidthPx(e, t), this.refreshContentSize(), this.scheduleRender();
  }
  /** 拖拽改行高(px) */
  setRowHeightPx(e, t) {
    var n;
    (n = this.renderer) == null || n.setRowHeightPx(e, t), this.refreshContentSize(), this.scheduleRender();
  }
  /** 双击列边界: 自适应列宽(editable 时入命令栈/发事件/记脏) */
  autoFitColumn(e) {
    var t;
    this.editCfg.editable && this.beginResizeRecord("col", e), (t = this.renderer) == null || t.autoFitColumn(e), this.refreshContentSize(), this.render(), this.editCfg.editable && this.endResizeRecord("col", e);
  }
  /** 双击行边界: 自适应行高(editable 时入命令栈/发事件/记脏) */
  autoFitRow(e) {
    var t;
    this.editCfg.editable && this.beginResizeRecord("row", e), (t = this.renderer) == null || t.autoFitRow(e), this.refreshContentSize(), this.render(), this.editCfg.editable && this.endResizeRecord("row", e);
  }
  // ---- 维度 / 脏状态 命令式 API(E3.5;Phase B 多形态 2026-06-08) ----
  /**
   * 程序化设列宽 (px, 模型单位/非缩放). Phase B 2026-06-08:
   * target 接 `number | number[] | {from,to}` (DimTarget). 多 index 时聚合成单次 undo.
   * editable 时走命令栈;strictDimensions=true 时该列至少 1 格在白名单内才生效.
   * 返回**成功条数** (0 = 全部 skip / editable=false).
   */
  setColumnWidth(e, t) {
    const n = this.sheet;
    if (!n) return 0;
    const s = tt(e);
    return this.edit.setDimensions("col", s, t, (i) => Be(n, "col", i, this.editCfg));
  }
  /** 程序化设行高 (px, 模型单位/非缩放). 同 setColumnWidth, 维度 = 'row'. */
  setRowHeight(e, t) {
    const n = this.sheet;
    if (!n) return 0;
    const s = tt(e);
    return this.edit.setDimensions("row", s, t, (i) => Be(n, "row", i, this.editCfg));
  }
  /**
   * 批量 autoFit 列宽 (Phase B 2026-06-08). target 不传 = 整表; 传 DimTarget = 选定列.
   * 单 index 走 autoFitColumn (含 resize-record); 多 index 单次 restore-wb undo + 循环 autofit.
   * 返回成功条数.
   */
  autoFitColumns(e) {
    const t = this.sheet, n = this.renderer;
    if (!t || !n) return 0;
    const s = e === void 0 ? Array.from({ length: t.dimension.cols }, (d, h) => h) : tt(e), i = s.filter((d) => d >= 0 && Be(t, "col", d, this.editCfg)), r = s.filter((d) => d >= 0 && !Be(t, "col", d, this.editCfg));
    if (r.length && this.hooks.onEditEvent("permission-denied", { reason: "dimension", cells: [], dims: { axis: "col", indices: r }, message: `${r.length} 列未覆盖白名单,autoFit 跳过` }), !i.length) return 0;
    if (i.length === 1)
      return this.autoFitColumn(i[0]), 1;
    const l = this.workbook;
    if (!l) return 0;
    this.edit.ensureBaseline();
    const a = ee(l);
    let c = 0;
    for (const d of i)
      n.autoFitColumn(d), c++;
    return this.edit.pushUndoExternal({ kind: "restore-wb", snapshot: a }), this.edit.markDirtyExternal(), this.refreshContentSize(), this.render(), c;
  }
  /** 批量 autoFit 行高 (Phase B 2026-06-08). 同 autoFitColumns, 维度 = 'row'. */
  autoFitRows(e) {
    const t = this.sheet, n = this.renderer;
    if (!t || !n) return 0;
    const s = e === void 0 ? Array.from({ length: t.dimension.rows }, (d, h) => h) : tt(e), i = s.filter((d) => d >= 0 && Be(t, "row", d, this.editCfg)), r = s.filter((d) => d >= 0 && !Be(t, "row", d, this.editCfg));
    if (r.length && this.hooks.onEditEvent("permission-denied", { reason: "dimension", cells: [], dims: { axis: "row", indices: r }, message: `${r.length} 行未覆盖白名单,autoFit 跳过` }), !i.length) return 0;
    if (i.length === 1)
      return this.autoFitRow(i[0]), 1;
    const l = this.workbook;
    if (!l) return 0;
    this.edit.ensureBaseline();
    const a = ee(l);
    let c = 0;
    for (const d of i)
      n.autoFitRow(d), c++;
    return this.edit.pushUndoExternal({ kind: "restore-wb", snapshot: a }), this.edit.markDirtyExternal(), this.refreshContentSize(), this.render(), c;
  }
  /**
   * 重置列宽到默认 (Phase B 2026-06-08) — 移除 sheet.columns Map 条目, 回落到 defaultColWidth.
   * 多 index 单次 undo. 返回成功条数.
   */
  resetColumnWidth(e) {
    const t = this.sheet;
    if (!t) return 0;
    const n = tt(e);
    return this.edit.resetDimensions("col", n, (s) => Be(t, "col", s, this.editCfg));
  }
  /** 重置行高到默认. 同 resetColumnWidth, 维度 = 'row'. */
  resetRowHeight(e) {
    const t = this.sheet;
    if (!t) return 0;
    const n = tt(e);
    return this.edit.resetDimensions("row", n, (s) => Be(t, "row", s, this.editCfg));
  }
  /** 公式引擎是否已就绪(recalc 开启 + 异步 warm 完成);未开重算恒 false。 */
  isRecalcReady() {
    return this.edit.isRecalcReady();
  }
  /** 当前是否有未保存修改(自加载/还原以来发生过编辑或 resize)。 */
  isDirty() {
    return this.edit.isDirty();
  }
  /** 放弃全部修改,还原到刚加载的原件;返回是否还原(无 baseline → false)。 */
  resetToOriginal() {
    return this.edit.resetToOriginal();
  }
  /** 单元格当前屏幕矩形(render-area 相对) */
  rectOf(e, t) {
    const n = this.renderer;
    return n ? n.screenRectOfCell(this.view, e, t) : null;
  }
  /** 区域当前屏幕矩形(左上到右下并集) */
  rectOfRange(e) {
    const t = this.renderer;
    if (!t) return null;
    const n = t.screenRectOfCell(this.view, e.top, e.left), s = t.screenRectOfCell(this.view, e.bottom, e.right);
    return { x: n.x, y: n.y, w: s.x + s.w - n.x, h: s.y + s.h - n.y };
  }
  dispose() {
    this.rafId && cancelAnimationFrame(this.rafId), this.rafId = 0, this.els.scroller.removeEventListener("paste", this.onPasteHandler), this.els.scroller.removeEventListener("touchstart", this.onTouchStartHandler), this.els.scroller.removeEventListener("touchmove", this.onTouchMoveHandler), this.els.scroller.removeEventListener("touchend", this.onTouchEndHandler), this.overlays.dispose(), this.editorHost.dispose(), this.menuHost.dispose(), this.lightbox.dispose(), this.printPreview.dispose(), this.insertFnDialog.dispose(), this.dvDialog.dispose(), this.removeDupDialog.dispose(), this.t2cDialog.dispose(), this.protectSheetDialog.dispose(), this.protectWbDialog.dispose(), this.allowRangesDialog.dispose(), this.taskPane.dispose(), this.filterPopupHost.dispose(), this.findDialog.dispose(), this.pivotDialog.dispose(), this.pivotPanel.dispose(), this.pasteConfigDialog.dispose(), this.readonlyPrompt.dispose(), this.validationPrompt.dispose(), this.cfDialog.dispose(), this.numFmtDialog.dispose(), this.commentDialog.dispose(), this.pageSetupDialog.dispose(), this.backgroundDialog.dispose(), this.seriesDialog.dispose(), this.sortDialog.dispose(), this.imageOversizeDialog.dispose(), this.edit.disposeEngine();
  }
  /** 内容总尺寸变化 → 量 + 直接撑 spacer(滚动范围由它决定) */
  refreshContentSize() {
    const e = this.renderer;
    e && (this.contentW = e.contentWidth, this.contentH = e.contentHeight, this.els.spacer.style.width = this.contentW + "px", this.els.spacer.style.height = this.contentH + "px");
  }
  /**
   * 据当前滚动+视口算"虚拟范围"(滚到数据下方仍有空行/空列可滚动/选中/编辑)。
   * 只增不减(防 spacer 抖动)、封顶 Excel 上限。**不动 dimension/文件**;编辑虚拟格才靠 growDimension 变实。
   * 仅当范围真变化时重建 GridMetrics + 刷 spacer。
   */
  recomputeVirtualExtent() {
    const e = this.renderer;
    if (!e) return;
    const t = e.metrics, n = t.rowAt(this.view.scrollY + this.view.height - t.colHeaderHeight) + 30, s = t.colAt(this.view.scrollX + this.view.width - t.rowHeaderWidth) + 10, i = Math.min(Ft, Math.max(this.virtualRows, n)), r = Math.min(at, Math.max(this.virtualCols, s));
    i === this.virtualRows && r === this.virtualCols || (this.virtualRows = i, this.virtualCols = r, e.setVirtualExtent(i, r) && this.refreshContentSize());
  }
  /** 当前虚拟范围(含 dimension 兜底);供调试/e2e。 */
  getVirtualExtent() {
    var t, n, s;
    const e = (t = this.renderer) == null ? void 0 : t.metrics;
    return { rows: (n = e == null ? void 0 : e.vRows) != null ? n : 0, cols: (s = e == null ? void 0 : e.vCols) != null ? s : 0 };
  }
  // ====================== 选区模型 ======================
  /** 当前选区(随 mode 解析为单元格/整行/整列范围,含合并单元格扩展) */
  getSelection() {
    var r, l;
    const e = this.renderer, t = this.selAnchor, n = this.selActive;
    if (!e || !t || !n) return null;
    if (this.selMode === "rows")
      return { top: Math.min(t.row, n.row), bottom: Math.max(t.row, n.row), left: 0, right: e.metrics.cols - 1 };
    if (this.selMode === "cols")
      return { left: Math.min(t.col, n.col), right: Math.max(t.col, n.col), top: 0, bottom: e.metrics.rows - 1 };
    const s = (r = e.mergeAt(t.row, t.col)) != null ? r : Ar(t), i = (l = e.mergeAt(n.row, n.col)) != null ? l : Ar(n);
    return {
      top: Math.min(s.top, i.top),
      left: Math.min(s.left, i.left),
      bottom: Math.max(s.bottom, i.bottom),
      right: Math.max(s.right, i.right)
    };
  }
  /** 活动单元格(选区的"焦点"角) */
  getActiveCell() {
    return this.selActive;
  }
  /** 全部选区(不连续多选时含多个矩形;末个为当前活动区)。空选返 []。1.13.0 */
  getSelectionRanges() {
    const e = this.getSelection();
    return e ? [...this.selRanges, e] : [...this.selRanges];
  }
  /** 是否处于不连续多区域选择(>1 个矩形)。 */
  hasMultiSelection() {
    return this.selRanges.length > 0;
  }
  /** 选区统计(状态栏用):多选时跨所有区域聚合(count/sum/min/max/avg)。空返 null。1.13.0 */
  getSelectionStats() {
    const e = this.renderer, t = this.getSelectionRanges();
    if (!e || !t.length) return null;
    if (t.length === 1) return e.selectionStats(t[0]);
    let n = 0, s = 0, i = 0, r = 1 / 0, l = -1 / 0;
    for (const a of t) {
      const c = e.selectionStats(a);
      n += c.count, s += c.numCount, i += c.sum, c.numCount && (r = Math.min(r, c.min), l = Math.max(l, c.max));
    }
    return { count: n, numCount: s, sum: i, avg: s ? i / s : 0, min: s ? r : 0, max: s ? l : 0 };
  }
  /**
   * 活动格(或指定格)在公式栏里**可编辑的字符串**:
   * 公式 → `=...`;数值 → 原始数字串(非格式化,避免编辑货币/千分位被当文本);布尔 → TRUE/FALSE;
   * 日期/字符串/富文本 → 显示文本。空格返 ''。供公式栏 / 命令式取活动格编辑值。
   */
  getCellEditString(e, t) {
    var s, i;
    const n = e != null && t != null ? { row: e, col: t } : this.selActive;
    return n && (i = (s = this.edit.getCellSnapshot(n.row, n.col)) == null ? void 0 : s.editText) != null ? i : "";
  }
  /** 活动格此刻是否可经公式栏/命令式编辑(editable 开 + 该格非只读) */
  canEditActiveCell() {
    const e = this.selActive;
    return !!(e && this.editCfg.editable && this.isCellEditable(e.row, e.col));
  }
  /**
   * 经公式栏提交活动格的值(value 同 editCell 的输入语义:`=`→公式、数字串→数字…)。
   * 仅在 editable + 该格可编辑时生效;move='down' 时提交后活动格下移(像 Excel 回车)。返回是否提交。
   */
  commitActiveCellValue(e, t) {
    const n = this.selActive;
    if (!n || !this.editCfg.editable || !this.isCellEditable(n.row, n.col)) return !1;
    if (this.editorHost.isActive() && this.cancelEdit(), e !== this.getCellEditString(n.row, n.col)) {
      if (!this.passValidation(n.row, n.col, e)) return !1;
      this.edit.editCell(n.row, n.col, e);
    }
    if (t === "down" && this.renderer) {
      const s = Math.min(n.row + 1, this.renderer.metrics.rows - 1);
      this.selectCell(s, n.col);
    }
    return !0;
  }
  /** 清空选区 */
  clearSelection() {
    this.selAnchor = null, this.selActive = null, this.selMode = "range", this.selRanges = [], this.hooks.onSelectionChange();
  }
  /** 全选 */
  selectAll() {
    const e = this.renderer;
    e && (this.selMode = "range", this.selRanges = [], this.selAnchor = { row: 0, col: 0 }, this.selActive = { row: e.metrics.rows - 1, col: e.metrics.cols - 1 }, this.hooks.onSelectionChange());
  }
  /** 选中单个单元格并滚动到视图(查找定位用);range 模式,anchor=active */
  selectCell(e, t) {
    this.selMode = "range", this.selRanges = [], this.selAnchor = { row: e, col: t }, this.selActive = { row: e, col: t }, this.scrollActiveIntoView(), this.hooks.onSelectionChange(), this.render();
  }
  /** 滚动到指定单元格;select=true 时同步选中目标格。 */
  scrollToCell(e, t, n) {
    const s = this.renderer;
    if (!s) return !1;
    const i = Math.max(0, Math.min(e, Ft - 1)), r = Math.max(0, Math.min(t, at - 1));
    (i >= s.metrics.vRows || r >= s.metrics.vCols) && (this.virtualRows = Math.max(this.virtualRows, i + 1), this.virtualCols = Math.max(this.virtualCols, r + 1), s.setVirtualExtent(this.virtualRows, this.virtualCols) && this.refreshContentSize());
    const l = s.mergeAt(i, r), a = l ? { row: l.top, col: l.left } : { row: i, col: r };
    return n != null && n.select ? (this.selectCell(a.row, a.col), !0) : (this.scrollCellIntoView(a), this.render(), !0);
  }
  /** 命令式设选区(anchor=左上, active=右下) */
  setSelectionRange(e) {
    this.selMode = "range", this.selRanges = [], this.selAnchor = { row: e.top, col: e.left }, this.selActive = { row: e.bottom, col: e.right }, this.hooks.onSelectionChange(), this.render();
  }
  setCell(e, t) {
    this.selMode = "range", t && this.selAnchor ? this.selActive = e : (this.selAnchor = e, this.selActive = e), this.hooks.onSelectionChange();
  }
  setRows(e, t) {
    this.selMode = "rows";
    const n = { row: e, col: 0 };
    t && this.selAnchor ? this.selActive = n : (this.selAnchor = n, this.selActive = n), this.hooks.onSelectionChange();
  }
  setCols(e, t) {
    this.selMode = "cols";
    const n = { row: 0, col: e };
    t && this.selAnchor ? this.selActive = n : (this.selAnchor = n, this.selActive = n), this.hooks.onSelectionChange();
  }
  // ====================== 命中检测 ======================
  localXY(e) {
    const t = this.els.renderArea.getBoundingClientRect();
    return { x: e.clientX - t.left, y: e.clientY - t.top };
  }
  hitRegion(e) {
    const t = this.renderer, n = this.localXY(e);
    if (!t || !n) return { region: "none" };
    const s = t.metrics.rowHeaderWidth, i = t.metrics.colHeaderHeight;
    if (n.x < s && n.y < i) return { region: "corner" };
    if (n.x < s) return { region: "row", row: t.rowAtScreen(this.view, n.y) };
    if (n.y < i) return { region: "col", col: t.colAtScreen(this.view, n.x) };
    const r = t.cellAtScreen(this.view, n.x, n.y);
    return r ? { region: "cell", row: r.row, col: r.col } : { region: "none" };
  }
  nearColBorder(e, t) {
    const n = this.renderer;
    if (!n || t >= n.metrics.colHeaderHeight) return null;
    const s = n.colAtScreen(this.view, e);
    if (s < 0) return null;
    const i = n.screenRectOfCell(this.view, 0, s);
    return Math.abs(e - (i.x + i.w)) <= 4 ? { col: s } : Math.abs(e - i.x) <= 4 && s > 0 ? { col: s - 1 } : null;
  }
  nearRowBorder(e, t) {
    const n = this.renderer;
    if (!n || e >= n.metrics.rowHeaderWidth) return null;
    const s = n.rowAtScreen(this.view, t);
    if (s < 0) return null;
    const i = n.screenRectOfCell(this.view, s, 0);
    return Math.abs(t - (i.y + i.h)) <= 4 ? { row: s } : Math.abs(t - i.y) <= 4 && s > 0 ? { row: s - 1 } : null;
  }
  // ====================== 鼠标交互 ======================
  onMouseDown(e) {
    if (e.button !== 0) return;
    this.clearFreezePreview(), this.els.scroller.focus();
    const t = this.renderer, n = this.localXY(e);
    if (t && n) {
      const r = t.filterButtonAt(this.view, n.x, n.y);
      if (r != null) {
        this.openFilterPopup(r);
        return;
      }
      const l = t.dataValidationButtonAt(this.view, n.x, n.y);
      if (l && this.editCfg.editable && this.isCellEditable(l.row, l.col)) {
        this.openDataValidationPicker(l, e);
        return;
      }
    }
    if (t && n && this.editCfg.pivotTable) {
      const r = t.pivotToggleAt(this.view, n.x, n.y);
      if (r) {
        this.togglePivotGroup(r.tableIdx, r.key);
        return;
      }
    }
    if (t && n && this.editCfg.editable && this.sheet) {
      const r = this.imageHandleAt(n);
      if (r && this.selectedImageIdx >= 0) {
        const a = this.cropModeIdx === this.selectedImageIdx && r !== "rotate";
        this.dragMode = a ? "image-crop" : r === "rotate" ? "image-rotate" : "image-resize", this.imageResizeDir = r === "rotate" ? null : r, this.imageDragIdx = this.selectedImageIdx, this.imageDragStartRect = re(t.metrics, this.sheet.images[this.selectedImageIdx]), this.imageDragStartMouse = { x: n.x, y: n.y }, this.imageDragBefore = se(this.sheet.images[this.selectedImageIdx]);
        const c = this.sheet.images[this.selectedImageIdx].crop;
        this.imageCropStart = c ? R({}, c) : { l: 0, t: 0, r: 0, b: 0 }, this.edit.ensureBaseline();
        return;
      }
      this.cropModeIdx >= 0 && this.exitImageCrop();
      const l = this.imageHitAt(n);
      if (l >= 0) {
        this.dragMode = "image", this.imageDragIdx = l, this.imageDragStartRect = re(t.metrics, this.sheet.images[l]), this.imageDragStartMouse = { x: n.x, y: n.y }, this.imageDragBefore = se(this.sheet.images[l]), this.selectImage(l), this.render(), this.edit.ensureBaseline();
        return;
      }
      this.selectedImageIdx >= 0 && (this.selectImage(-1), this.render());
    }
    if (t && n && this.editCfg.editable && this.selActive && t.fillHandleAt(this.view, n.x, n.y)) {
      this.dragMode = "fill", this.fillBase = this.getSelection(), this.fillRange = this.fillBase, this.dragMoved = !1, this.dragStartXY = n;
      return;
    }
    if (t && n) {
      if (n.y < t.metrics.colHeaderHeight) {
        const r = this.nearColBorder(n.x, n.y);
        if (r) {
          this.dragMode = "resize-col", this.resizeTarget = r.col, this.resizeStartPos = n.x, this.resizeStartSize = t.metrics.colWidth(r.col), this.beginResizeRecord("col", r.col);
          return;
        }
      } else if (n.x < t.metrics.rowHeaderWidth) {
        const r = this.nearRowBorder(n.x, n.y);
        if (r) {
          this.dragMode = "resize-row", this.resizeTarget = r.row, this.resizeStartPos = n.y, this.resizeStartSize = t.metrics.rowHeight(r.row), this.beginResizeRecord("row", r.row);
          return;
        }
      }
    }
    const s = this.hitRegion(e);
    this.dragMoved = !1, this.dragStartXY = this.localXY(e);
    const i = (e.ctrlKey || e.metaKey) && !e.shiftKey;
    if (s.region === "row" || s.region === "col" || s.region === "cell")
      if (i) {
        const r = this.getSelection();
        r && this.selRanges.push(r);
      } else
        this.selRanges = [];
    else
      this.selRanges = [];
    s.region === "corner" ? (this.selectAll(), this.dragMode = "none") : s.region === "row" ? (this.dragMode = "row", this.setRows(s.row, e.shiftKey)) : s.region === "col" ? (this.dragMode = "col", this.setCols(s.col, e.shiftKey)) : s.region === "cell" ? (this.dragMode = "cell", this.setCell({ row: s.row, col: s.col }, e.shiftKey)) : this.dragMode = "none", this.render();
  }
  onMouseMove(e) {
    if (this.dragMode !== "none") {
      const t = this.renderer, n = this.localXY(e);
      if (!t || !n) return;
      if ((!this.dragStartXY || Math.abs(n.x - this.dragStartXY.x) > 3 || Math.abs(n.y - this.dragStartXY.y) > 3) && (this.dragMoved = !0), this.dragMode === "image" && this.imageDragStartRect && this.sheet) {
        const s = n.x - this.imageDragStartMouse.x, i = n.y - this.imageDragStartMouse.y;
        fo(
          this.sheet,
          this.imageDragIdx,
          {
            left: this.imageDragStartRect.left + s,
            top: this.imageDragStartRect.top + i,
            width: this.imageDragStartRect.width,
            height: this.imageDragStartRect.height
          },
          this.view.zoom
        ), this.render();
        return;
      }
      if (this.dragMode === "image-rotate" && this.imageDragStartRect && this.sheet) {
        const s = this.imageDragStartRect, i = t.metrics.rowHeaderWidth + s.left + s.width / 2 - this.view.scrollX, r = t.metrics.colHeaderHeight + s.top + s.height / 2 - this.view.scrollY;
        let l = Math.round(Math.atan2(n.y - r, n.x - i) * 180 / Math.PI + 90);
        l = (l % 360 + 360) % 360, this.sheet.images[this.imageDragIdx].rotation = l, this.render();
        return;
      }
      if (this.dragMode === "image-crop" && this.imageDragStartRect && this.imageResizeDir && this.imageCropStart && this.sheet) {
        const s = this.imageDragStartRect, i = this.imageResizeDir, r = this.imageCropStart, l = n.x - this.imageDragStartMouse.x, a = n.y - this.imageDragStartMouse.y, c = (h, f) => Math.max(0, Math.min(f, h)), d = R({}, r);
        i.includes("e") && (d.r = c(r.r - l / s.width, 0.9 - r.l)), i.includes("w") && (d.l = c(r.l + l / s.width, 0.9 - r.r)), i.includes("s") && (d.b = c(r.b - a / s.height, 0.9 - r.t)), i.includes("n") && (d.t = c(r.t + a / s.height, 0.9 - r.b)), this.sheet.images[this.imageDragIdx].crop = d.l || d.t || d.r || d.b ? d : void 0, this.render();
        return;
      }
      if (this.dragMode === "image-resize" && this.imageDragStartRect && this.imageResizeDir && this.sheet) {
        const s = this.imageDragStartRect, i = this.imageResizeDir, r = (this.sheet.images[this.imageDragIdx].rotation || 0) * Math.PI / 180, l = n.x - this.imageDragStartMouse.x, a = n.y - this.imageDragStartMouse.y, c = Math.cos(-r), d = Math.sin(-r), h = l * c - a * d, f = l * d + a * c, u = 12;
        let p = s.left, g = s.top, b = s.width, m = s.height;
        i.includes("e") && (b = s.width + h), i.includes("s") && (m = s.height + f), i.includes("w") && (b = s.width - h, p = s.left + h), i.includes("n") && (m = s.height - f, g = s.top + f), b < u && (i.includes("w") && (p = s.left + s.width - u), b = u), m < u && (i.includes("n") && (g = s.top + s.height - u), m = u), fo(this.sheet, this.imageDragIdx, { left: p, top: g, width: b, height: m }, this.view.zoom), this.render();
        return;
      }
      if (this.dragMode === "resize-col") {
        this.setColWidthPx(this.resizeTarget, this.resizeStartSize + (n.x - this.resizeStartPos));
        return;
      }
      if (this.dragMode === "resize-row") {
        this.setRowHeightPx(this.resizeTarget, this.resizeStartSize + (n.y - this.resizeStartPos));
        return;
      }
      if (this.dragMode === "fill") {
        this.updateFillPreview(n);
        return;
      }
      if (this.dragMode === "cell") {
        const s = t.cellAtScreen(this.view, n.x, n.y);
        s && (this.selActive = s, this.hooks.onSelectionChange(), this.scheduleRender());
      } else if (this.dragMode === "row") {
        const s = t.rowAtScreen(this.view, n.y);
        s >= 0 && (this.selActive = { row: s, col: 0 }, this.hooks.onSelectionChange(), this.scheduleRender());
      } else {
        const s = t.colAtScreen(this.view, n.x);
        s >= 0 && (this.selActive = { row: 0, col: s }, this.hooks.onSelectionChange(), this.scheduleRender());
      }
      return;
    }
    this.updateHover(e);
  }
  onMouseUp(e) {
    var t;
    if (this.dragMode === "cell" && !this.dragMoved) {
      const n = this.hitRegion(e), s = this.renderer;
      if (n.region === "cell" && s) {
        this.hooks.onCellClick(n.row, n.col, s.cellText(n.row, n.col));
        const i = s.cellHyperlink(n.row, n.col);
        i && this.hooks.onHyperlink(i, { row: n.row, col: n.col });
      }
    } else if (this.dragMode === "resize-col")
      this.endResizeRecord("col", this.resizeTarget);
    else if (this.dragMode === "resize-row")
      this.endResizeRecord("row", this.resizeTarget);
    else if (this.dragMode === "image" || this.dragMode === "image-resize" || this.dragMode === "image-rotate" || this.dragMode === "image-crop") {
      if (this.dragMoved && this.imageDragBefore && this.sheet) {
        const n = se(this.sheet.images[this.imageDragIdx]);
        this.edit.recordImageEdit(this.imageDragIdx, this.imageDragBefore, n);
      }
      this.imageDragBefore = null, this.imageDragStartRect = null, this.imageDragIdx = -1, this.imageResizeDir = null, this.imageCropStart = null;
    } else this.dragMode === "fill" && (this.applyFill(e.ctrlKey || e.metaKey), (t = this.renderer) == null || t.setFillPreview(null), this.fillBase = null, this.fillRange = null, this.render());
    this.painterStyle && (this.dragMode === "cell" || this.dragMode === "row" || this.dragMode === "col") && this.applyFormatPainterIfArmed(), this.dragMode = "none";
  }
  // ===== 自动填充(1.10.0)=====
  /** 拖拽填充柄时:按鼠标位置算目标范围(主轴 = 偏移更大的方向),设预览。 */
  updateFillPreview(e) {
    const t = this.renderer, n = this.fillBase;
    if (!t || !n) return;
    const s = t.cellAtScreen(this.view, e.x, e.y);
    if (!s) return;
    const i = s.row - n.bottom, r = n.top - s.row, l = s.col - n.right, a = n.left - s.col, c = Math.max(i, r, 0), d = Math.max(l, a, 0);
    if (c === 0 && d === 0) {
      this.fillRange = n, this.fillDir = "down", t.setFillPreview(null), this.scheduleRender();
      return;
    }
    c >= d ? i >= r ? (this.fillDir = "down", this.fillRange = { top: n.top, left: n.left, bottom: s.row, right: n.right }) : (this.fillDir = "up", this.fillRange = { top: s.row, left: n.left, bottom: n.bottom, right: n.right }) : l >= a ? (this.fillDir = "right", this.fillRange = { top: n.top, left: n.left, bottom: n.bottom, right: s.col }) : (this.fillDir = "left", this.fillRange = { top: n.top, left: s.col, bottom: n.bottom, right: n.right }), t.setFillPreview(this.fillRange), this.scheduleRender();
  }
  /** 松手:用源选区接续序列填进新增格(整体单次撤销),并把选区扩到合并范围。ctrl 翻转复制↔序列。 */
  applyFill(e = !1) {
    const t = this.fillBase, n = this.fillRange, s = this.sheet;
    if (!t || !n || !s) return;
    const i = (d, h) => We(s, d, h), r = this.fillDir === "down" || this.fillDir === "up", l = this.fillDir === "down", a = this.fillDir === "right", c = [];
    if (r) {
      const d = l ? n.bottom - t.bottom : t.top - n.top;
      if (d <= 0) return;
      for (let h = t.left; h <= t.right; h++) {
        const f = [];
        for (let g = t.top; g <= t.bottom; g++) f.push(g);
        const u = (l ? f : f.slice().reverse()).map((g) => i(g, h)), p = Ei(u, d, e);
        for (let g = 0; g < d; g++) {
          const b = l ? t.bottom + 1 + g : t.top - 1 - g;
          c.push({ row: b, col: h, value: p[g] });
        }
      }
    } else {
      const d = a ? n.right - t.right : t.left - n.left;
      if (d <= 0) return;
      for (let h = t.top; h <= t.bottom; h++) {
        const f = [];
        for (let g = t.left; g <= t.right; g++) f.push(g);
        const u = (a ? f : f.slice().reverse()).map((g) => i(h, g)), p = Ei(u, d, e);
        for (let g = 0; g < d; g++) {
          const b = a ? t.right + 1 + g : t.left - 1 - g;
          c.push({ row: h, col: b, value: p[g] });
        }
      }
    }
    c.length && this.edit.setCellsBatch(c) && this.setSelectionRange(n);
  }
  /** 命中最上层浮动图(editable;p 为 render-area 坐标含表头);返回 index 或 -1。 */
  imageHitAt(e) {
    const t = this.renderer, n = this.sheet;
    if (!t || !n) return -1;
    const s = t.metrics.rowHeaderWidth, i = t.metrics.colHeaderHeight;
    if (e.x < s || e.y < i) return -1;
    for (let r = n.images.length - 1; r >= 0; r--) {
      const l = re(t.metrics, n.images[r]), a = s + l.left - this.view.scrollX, c = i + l.top - this.view.scrollY;
      if (e.x >= a && e.x <= a + l.width && e.y >= c && e.y <= c + l.height) return r;
    }
    return -1;
  }
  /**
   * 命中选中浮动图的 8 控制点 / 旋转柄;无则 null。坐标全 CSS 像素(localXY + metrics),DPR 安全。
   * 图旋转时:把鼠标点绕图中心**反旋转**回图局部坐标系再按基础矩形命中(控制点跟图一起转)。
   */
  imageHandleAt(e) {
    var v;
    const t = this.renderer, n = this.selectedImageIdx >= 0 ? (v = this.sheet) == null ? void 0 : v.images[this.selectedImageIdx] : null;
    if (!t || !n) return null;
    const s = re(t.metrics, n), i = t.metrics.rowHeaderWidth + s.left - this.view.scrollX, r = t.metrics.colHeaderHeight + s.top - this.view.scrollY, l = s.width, a = s.height, c = i + l / 2, d = r + a / 2, h = (n.rotation || 0) * Math.PI / 180, f = e.x - c, u = e.y - d, p = Math.cos(-h), g = Math.sin(-h), b = c + f * p - u * g, m = d + f * g + u * p, y = 7;
    if (Math.abs(b - c) <= 8 && Math.abs(m - (r - 26)) <= 8) return "rotate";
    const w = {
      nw: [i, r],
      n: [i + l / 2, r],
      ne: [i + l, r],
      e: [i + l, r + a / 2],
      se: [i + l, r + a],
      s: [i + l / 2, r + a],
      sw: [i, r + a],
      w: [i, r + a / 2]
    };
    for (const x of _l) {
      const [S, k] = w[x];
      if (Math.abs(b - S) <= y && Math.abs(m - k) <= y) return x;
    }
    return null;
  }
  /** 设选中浮动图并刷新选框(-1 清)。 */
  selectImage(e) {
    this.selectedImageIdx !== e && (this.cropModeIdx >= 0 && this.cropModeIdx !== e && (this.cropModeIdx = -1), this.selectedImageIdx = e, this.overlays.setSelectedImage(e));
  }
  // ---- resize → 命令栈记账(仅 editable;E3.5) ----
  /** 拖拽起始:editable 时捕获 baseline + 起始维度信息(供 undo / dim-change)。 */
  beginResizeRecord(e, t) {
    var n, s;
    if (!(!this.editCfg.editable || !this.sheet))
      if (this.edit.ensureBaseline(), e === "col") {
        const i = this.sheet.columns.get(t);
        this.resizeStartInfo = i ? R({}, i) : null, this.resizeStartModelSize = (n = i == null ? void 0 : i.width) != null ? n : this.sheet.defaultColWidth;
      } else {
        const i = this.sheet.rows.get(t);
        this.resizeStartInfo = i ? R({}, i) : null, this.resizeStartModelSize = (s = i == null ? void 0 : i.height) != null ? s : this.sheet.defaultRowHeight;
      }
  }
  /** 拖拽结束:模型已被 renderer 改完,补登一条 undo 项 + 发 dim-change。 */
  endResizeRecord(e, t) {
    var s, i, r, l;
    if (!this.editCfg.editable || !this.sheet) return;
    const n = e === "col" ? (i = (s = this.sheet.columns.get(t)) == null ? void 0 : s.width) != null ? i : this.sheet.defaultColWidth : (l = (r = this.sheet.rows.get(t)) == null ? void 0 : r.height) != null ? l : this.sheet.defaultRowHeight;
    this.edit.recordDimEdit(e, t, this.resizeStartInfo, this.resizeStartModelSize, n), this.resizeStartInfo = null;
  }
  onMouseLeave() {
    this.hooks.onTooltip(null);
  }
  /** 右键上下文菜单(G3;仅 editable;只读用浏览器默认菜单)。壳把 contextmenu 事件转给它。 */
  /**
   * 右键事件入口(Plan C 全面开放):
   *  1. 算 ctx(选区 + 单/多格 + 活动格);右键不在当前选区 → 先选中(仿 Excel)
   *  2. 算内置 items(`buildBuiltinContextMenuItems`,editable 时才有,否则空)
   *  3. 跑用户 `setContextMenuTransform` 回调(可加/减/重排)
   *  4. 触发 `onContextMenuBefore` 钩子(可 preventDefault)
   *  5. 没被 prevent + items 非空 → 弹内置浮层;无论是否弹,都触发 `onContextMenuShow`(让用户也能自渲染)
   */
  onContextMenu(e) {
    var a, c, d, h, f, u;
    const t = this.editCfg.editable ? this.localXY(e) : null, n = t ? this.imageHitAt(t) : -1;
    if (n >= 0) {
      const p = this.buildImageContextMenuItems(n);
      p.length && (e.preventDefault(), this.menuHost.show(e.clientX, e.clientY, p));
      return;
    }
    const s = this.buildContextMenuCtx(e);
    if (!s) return;
    let i = this.buildBuiltinContextMenuItems(s);
    if (this.ctxMenuTransform) {
      const p = this.ctxMenuTransform(s, i);
      Array.isArray(p) && (i = p);
    }
    let r = !1;
    const l = () => {
      r = !0;
    };
    if ((c = (a = this.hooks).onContextMenuBefore) == null || c.call(a, { event: e, ctx: s, items: i, preventDefault: l }), r) {
      e.preventDefault(), (h = (d = this.hooks).onContextMenuShow) == null || h.call(d, { x: e.clientX, y: e.clientY, ctx: s, items: i });
      return;
    }
    i.length && (e.preventDefault(), this.menuHost.show(e.clientX, e.clientY, i)), (u = (f = this.hooks).onContextMenuShow) == null || u.call(f, { x: e.clientX, y: e.clientY, ctx: s, items: i });
  }
  /** 算右键 ctx:命中格 + 选区调整;非内容区 / 无 renderer 返 null */
  buildContextMenuCtx(e) {
    const t = this.renderer, n = this.localXY(e);
    if (!t || !n) return null;
    const s = t.cellAtScreen(this.view, n.x, n.y);
    let i = this.getSelection();
    if (s && (!i || s.row < i.top || s.row > i.bottom || s.col < i.left || s.col > i.right) && (this.selectCell(s.row, s.col), this.render(), i = this.getSelection()), !i || !this.sheet || !this.workbook) return null;
    const r = R({}, i), l = r.top === r.bottom && r.left === r.right;
    return {
      range: r,
      single: l,
      activeCell: { row: r.top, col: r.left },
      sheet: this.sheet,
      workbook: this.workbook,
      editable: !!this.editCfg.editable
    };
  }
  /** 内置右键菜单项(独立提取,便于 transform 回调拿到再二次加工)。
   *  只读模式:只返回**不改数据**的项(复制) —— 复制不修改数据源,只读也该能用;编辑模式给全套。 */
  buildBuiltinContextMenuItems(e) {
    var d, h, f;
    const t = e.range, n = { label: "复制", action: () => void this.copySelection() };
    if (!e.editable) return [n];
    const s = t.bottom - t.top + 1, i = t.right - t.left + 1, r = e.single;
    let l = !1, a = !0;
    for (let u = t.top; u <= t.bottom; u++)
      for (let p = t.left; p <= t.right; p++)
        this.isCellEditable(u, p) ? l = !0 : a = !1;
    const c = [
      n,
      { label: "粘贴", disabled: !l, action: () => void this.pasteFromClipboard() },
      {
        label: "选择性粘贴",
        disabled: !l,
        children: [
          { label: "覆盖格式(贴近源)", action: () => void this.pasteFromClipboard(Ht) },
          { label: "保留原样式(仅值)", action: () => void this.pasteFromClipboard(al) }
        ]
      },
      { separator: !0 },
      { label: `在上方插入 ${s} 行`, action: () => this.insertRows(t.top, s) },
      { label: `在左侧插入 ${i} 列`, action: () => this.insertCols(t.left, i) },
      { label: `删除 ${s} 行`, disabled: !a, action: () => this.deleteRows(t.top, s) },
      { label: `删除 ${i} 列`, disabled: !a, action: () => this.deleteCols(t.left, i) },
      { separator: !0 },
      { label: "合并单元格", disabled: r || !a, action: () => this.mergeCells(t) },
      { label: "拆分单元格", disabled: !a, action: () => this.unmergeCells(t) },
      {
        label: (this.getSelectionWrapState() === "all" ? "✓ " : "") + "自动换行",
        disabled: !l,
        action: () => this.toggleWrapTextOnSelection()
      },
      { separator: !0 },
      { label: "清除内容", disabled: !l, action: () => this.clearRange(t) }
    ];
    if (r) {
      const u = !!this.getCellComment(t.top, t.left);
      c.push({ separator: !0 }), c.push({ label: u ? "编辑批注" : "插入批注", disabled: !l, action: () => this.openCommentEditor(t.top, t.left) }), u && c.push({ label: "删除批注", action: () => this.setCellComment(t.top, t.left, "") });
    }
    if (!r) {
      const p = ((d = e.sheet.images) != null ? d : []).reduce((b, m, y) => {
        const w = this.imageCellOf(y);
        return b + (w && w.row >= t.top && w.row <= t.bottom && w.col >= t.left && w.col <= t.right ? 1 : 0);
      }, 0);
      let g = 0;
      for (let b = t.top; b <= t.bottom; b++)
        for (let m = t.left; m <= t.right; m++)
          (h = e.sheet.cells.get(O(b, m))) != null && h.dispImgId && g++;
      if (p > 0 || g > 0) {
        const b = [];
        p > 0 && b.push({ label: `选区浮动图全部嵌入(${p} 张)`, action: () => this.convertImagesInRangeToCell(t) }), g > 0 && b.push({ label: `选区内嵌图全部浮动化(${g} 张)`, action: () => this.convertCellImagesInRangeToFloat(t) }), c.push({ separator: !0 }, ...b);
      }
    }
    if (r) {
      const u = t.top, p = t.left, g = e.sheet.cells.get(O(u, p)), b = (f = e.sheet.images) != null ? f : [], m = [];
      if (g != null && g.dispImgId) {
        const y = this.getCellImageAt(u, p);
        this.lightboxEnabled && (y != null && y.src) && m.push({
          label: "查看大图 / 下载原图",
          action: () => {
            var w;
            return this.openImageLightbox(y.src, `${y.id}.${((w = y.mime) == null ? void 0 : w.split("/")[1]) || "png"}`, y.mime);
          }
        }), m.push({ label: "内嵌图转为浮动图", action: () => this.convertCellImageToFloat(u, p) });
      }
      if (b.length) {
        const y = b.findIndex((v, x) => {
          const S = this.imageCellOf(x);
          return !!S && S.row === u && S.col === p;
        });
        y >= 0 && m.push({ label: "将此处浮动图嵌入单元格", action: () => this.convertImageToCellAuto(y) });
        const w = b.reduce((v, x, S) => {
          var k;
          return v + (((k = this.imageCellOf(S)) == null ? void 0 : k.col) === p ? 1 : 0);
        }, 0);
        w > 0 && m.push({ label: `整列浮动图嵌入单元格(${w} 张)`, action: () => this.convertAllImagesToCells(p) }), m.push({ label: `整表浮动图嵌入单元格(${b.length} 张)`, action: () => this.convertAllImagesToCells() });
      }
      m.length && c.push({ separator: !0 }, ...m);
    }
    return c;
  }
  /** 设置用户 transform 回调(`(ctx, items) => MenuItem[] | undefined`);壳侧调用 */
  setContextMenuTransform(e) {
    this.ctxMenuTransform = e != null ? e : null;
  }
  /** 程序化打开菜单(键盘 Shift+F10 / 自定义触发);items 不给则按当前选区算内置 */
  openContextMenu(e, t, n) {
    if (n && n.length) {
      this.menuHost.show(e, t, n);
      return;
    }
    const s = this.getSelection();
    if (!s || !this.sheet || !this.workbook) return;
    const i = {
      range: R({}, s),
      single: s.top === s.bottom && s.left === s.right,
      activeCell: { row: s.top, col: s.left },
      sheet: this.sheet,
      workbook: this.workbook,
      editable: !!this.editCfg.editable
    };
    let r = this.editCfg.editable ? this.buildBuiltinContextMenuItems(i) : [];
    if (this.ctxMenuTransform) {
      const l = this.ctxMenuTransform(i, r);
      Array.isArray(l) && (r = l);
    }
    r.length && this.menuHost.show(e, t, r);
  }
  /** 关闭当前菜单(无打开则 no-op) */
  closeContextMenu() {
    this.menuHost.close();
  }
  updateHover(e) {
    const t = this.renderer, n = this.els.scroller, s = this.localXY(e);
    if (!t || !s) {
      this.hooks.onTooltip(null);
      return;
    }
    if (this.painterStyle) {
      n.style.cursor = "copy", this.hooks.onTooltip(null);
      return;
    }
    if (this.editCfg.editable && this.selActive && t.fillHandleAt(this.view, s.x, s.y)) {
      n.style.cursor = "crosshair", this.hooks.onTooltip(null);
      return;
    }
    if (s.y < t.metrics.colHeaderHeight && this.nearColBorder(s.x, s.y)) {
      n.style.cursor = "col-resize", this.hooks.onTooltip(null);
      return;
    }
    if (s.x < t.metrics.rowHeaderWidth && this.nearRowBorder(s.x, s.y)) {
      n.style.cursor = "row-resize", this.hooks.onTooltip(null);
      return;
    }
    const i = t.cellAtScreen(this.view, s.x, s.y);
    if (!i) {
      this.hooks.onTooltip(null), n.style.cursor = "";
      return;
    }
    this.editCfg.editable && !this.isCellEditable(i.row, i.col) ? n.style.cursor = t.cellHyperlink(i.row, i.col) ? "pointer" : "not-allowed" : n.style.cursor = t.cellHyperlink(i.row, i.col) ? "pointer" : "cell";
    const r = s.x + 14, l = s.y + 18, a = t.commentAt(i.row, i.col);
    if (a) {
      this.hooks.onTooltip({ text: a, x: r, y: l, kind: "comment" });
      return;
    }
    const c = t.overflowTextAt(i.row, i.col);
    this.hooks.onTooltip(c ? { text: c, x: r, y: l, kind: "overflow" } : null);
  }
  onDblClick(e) {
    var r, l, a;
    const t = this.renderer, n = this.localXY(e);
    if (!t || !n) return;
    const s = this.nearColBorder(n.x, n.y), i = s ? null : this.nearRowBorder(n.x, n.y);
    if (s)
      this.autoFitColumn(s.col);
    else if (i)
      this.autoFitRow(i.row);
    else {
      const c = t.cellAtScreen(this.view, n.x, n.y);
      if (!c) return;
      if (this.lightboxEnabled) {
        const d = this.imageHitAt(n);
        if (d >= 0) {
          const f = (r = this.sheet) == null ? void 0 : r.images[d];
          if (f != null && f.src) {
            this.openImageLightbox(f.src, `image-${d + 1}.${((l = f.mime) == null ? void 0 : l.split("/")[1]) || "png"}`, f.mime);
            return;
          }
        }
        const h = this.getCellImageAt(c.row, c.col);
        if (h != null && h.src) {
          this.openImageLightbox(h.src, `${h.id}.${((a = h.mime) == null ? void 0 : a.split("/")[1]) || "png"}`, h.mime);
          return;
        }
      }
      this.editCfg.editable && this.isCellEditable(c.row, c.col) ? this.beginEdit(c.row, c.col) : this.hooks.onCellDblClick(c.row, c.col, t.cellText(c.row, c.col));
    }
  }
  // ====================== 键盘交互 ======================
  pageRows() {
    const e = this.renderer;
    return e ? Math.max(1, Math.floor((this.view.height - e.metrics.colHeaderHeight) / e.defaultRowPx) - 1) : 10;
  }
  onKeyDown(e) {
    if (e.key === "Escape" && this.painterStyle) {
      this.cancelFormatPainter(), e.preventDefault();
      return;
    }
    if (this.selectedImageIdx >= 0 && this.editCfg.editable && !this.isEditing()) {
      if (e.key === "Escape") {
        this.cropModeIdx >= 0 ? this.exitImageCrop() : (this.selectImage(-1), this.render()), e.preventDefault();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        const h = this.selectedImageIdx;
        this.selectImage(-1), this.removeImage(h), this.render(), e.preventDefault();
        return;
      }
    }
    if (this.editCfg.editable && (e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
      e.shiftKey ? this.edit.redo() : this.edit.undo(), e.preventDefault();
      return;
    }
    if (this.editCfg.editable && (e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
      this.edit.redo(), e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
      this.copySelection(), e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A")) {
      this.selectAll(), this.render(), e.preventDefault();
      return;
    }
    if (this.editCfg.editable && (e.ctrlKey || e.metaKey) && (e.key === "e" || e.key === "E")) {
      this.flashFill(), e.preventDefault();
      return;
    }
    if (this.editCfg.editable && this.selActive && !this.isEditing()) {
      const { row: h, col: f } = this.selActive;
      if (e.key === "F2") {
        this.beginEdit(h, f), e.preventDefault();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        this.isCellEditable(h, f) && this.edit.clearRange({ top: h, left: f, bottom: h, right: f }), e.preventDefault();
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && this.beginEdit(h, f, e.key)) {
        e.preventDefault();
        return;
      }
    }
    const t = this.renderer;
    if (!t || !this.selActive) return;
    const n = t.metrics.rows - 1, s = t.metrics.cols - 1, i = e.ctrlKey || e.metaKey;
    let { row: r, col: l } = this.selActive, a = !0;
    switch (e.key) {
      case "ArrowUp":
        if (i) {
          const h = fn(t, r, l, -1, 0);
          r = h.row, l = h.col;
        } else r = Math.max(0, r - 1);
        break;
      case "ArrowDown":
        if (i) {
          const h = fn(t, r, l, 1, 0);
          r = h.row, l = h.col;
        } else r = Math.min(n, r + 1);
        break;
      case "ArrowLeft":
        if (i) {
          const h = fn(t, r, l, 0, -1);
          r = h.row, l = h.col;
        } else l = Math.max(0, l - 1);
        break;
      case "ArrowRight":
        if (i) {
          const h = fn(t, r, l, 0, 1);
          r = h.row, l = h.col;
        } else l = Math.min(s, l + 1);
        break;
      case "Home":
        l = 0, i && (r = 0);
        break;
      case "End":
        l = s, e.ctrlKey && (r = n);
        break;
      case "PageUp":
        r = Math.max(0, r - this.pageRows());
        break;
      case "PageDown":
        r = Math.min(n, r + this.pageRows());
        break;
      case "Enter":
        r = Math.min(n, r + 1);
        break;
      case "Tab":
        l = e.shiftKey ? Math.max(0, l - 1) : Math.min(s, l + 1);
        break;
      default:
        a = !1;
    }
    if (!a) return;
    e.preventDefault();
    const c = t.mergeAt(r, l);
    c && (r = c.top, l = c.left), this.selMode = "range", this.selRanges = [], this.selActive = { row: r, col: l }, e.shiftKey && e.key !== "Tab" || (this.selAnchor = { row: r, col: l }), this.scrollActiveIntoView(), this.hooks.onSelectionChange(), this.render();
  }
  scrollActiveIntoView() {
    this.selActive && this.scrollCellIntoView(this.selActive);
  }
  scrollCellIntoView(e) {
    const t = this.renderer, n = this.els.scroller;
    if (!t || !e) return;
    const s = t.metrics.rowHeaderWidth, i = t.metrics.colHeaderHeight, r = t.freezeGeometry;
    let l = n.scrollLeft, a = n.scrollTop;
    if (e.col >= r.frozenCols) {
      const c = t.metrics.colLeft(e.col), d = c + t.metrics.colWidth(e.col), h = this.view.width - s;
      d > l + h && (l = d - h), c < l + r.frozenWidth && (l = c - r.frozenWidth);
    }
    if (e.row >= r.frozenRows) {
      const c = t.metrics.rowTop(e.row), d = c + t.metrics.rowHeight(e.row), h = this.view.height - i;
      d > a + h && (a = d - h), c < a + r.frozenHeight && (a = c - r.frozenHeight);
    }
    l = Math.max(0, l), a = Math.max(0, a), (l !== n.scrollLeft || a !== n.scrollTop) && (n.scrollLeft = l, n.scrollTop = a, this.view.scrollX = l, this.view.scrollY = a);
  }
  // ====================== 复制 ======================
  async copySelection() {
    var k, M, E, $, T;
    if (this.selRanges.length > 0) return this.copyMultiSelection();
    const e = this.renderer, t = this.getSelection(), n = this.sheet, s = this.workbook;
    if (!e || !t || !n || !s) return;
    const i = Math.min(t.bottom, t.top + 4999), r = Math.min(t.right, t.left + 255), l = { top: t.top, left: t.left, bottom: i, right: r }, a = this.hasFilters(), c = (I) => {
      var A;
      return !(a && ((A = n.rows.get(I)) != null && A.hidden));
    }, d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map();
    for (const I of n.merges)
      if (!(I.top < l.top || I.left < l.left || I.bottom > l.bottom || I.right > l.right)) {
        h.set(O(I.top, I.left), { rs: I.bottom - I.top + 1, cs: I.right - I.left + 1 });
        for (let A = I.top; A <= I.bottom; A++) for (let L = I.left; L <= I.right; L++) (A !== I.top || L !== I.left) && d.add(O(A, L));
      }
    let f = 0;
    for (let I = l.top; I <= l.bottom; I++)
      if (c(I))
        for (let A = l.left; A <= l.right; A++) {
          const L = (k = n.cells.get(O(I, A))) == null ? void 0 : k.dispImgId, N = L ? (M = s.cellImages) == null ? void 0 : M.get(L) : void 0;
          N != null && N.bytes && (f += N.bytes.length);
        }
    for (const I of n.images)
      I.from.row >= l.top && I.from.row <= l.bottom && c(I.from.row) && I.from.col >= l.left && I.from.col <= l.right && I.bytes && (f += I.bytes.length);
    const u = f > ph;
    u && this.hooks.onEditEvent("permission-denied", {
      reason: "copy",
      cells: [],
      message: `复制内容含图过多(约 ${Math.round(f / 1024 / 1024)} MB),已按无图复制以避免剪贴板超限`
    });
    const p = (I) => {
      var A, L;
      return Math.round((L = (A = n.columns.get(I)) == null ? void 0 : A.width) != null ? L : n.defaultColWidth);
    }, g = (I) => {
      var A, L;
      return Math.round((L = (A = n.rows.get(I)) == null ? void 0 : A.height) != null ? L : n.defaultRowHeight);
    }, b = /* @__PURE__ */ new Map();
    if (!u) {
      const I = (L, N, F, H, D) => {
        var X;
        const B = (X = b.get(L)) != null ? X : [];
        B.push({ key: N, url: F, w: H, h: D }), b.set(L, B);
      };
      for (let L = l.top; L <= l.bottom; L++)
        if (c(L))
          for (let N = l.left; N <= l.right; N++) {
            const F = (E = n.cells.get(O(L, N))) == null ? void 0 : E.dispImgId, H = F ? ($ = s.cellImages) == null ? void 0 : $.get(F) : void 0;
            F && (H != null && H.bytes) && H.mime && I(O(L, N), `c:${F}`, `data:${H.mime};base64,${ut(H.bytes)}`, p(N), g(L));
          }
      let A = 0;
      for (const L of n.images) {
        if (L.from.row < l.top || L.from.row > l.bottom || !c(L.from.row) || L.from.col < l.left || L.from.col > l.right || !L.bytes || !L.mime) continue;
        const N = L.extWidthEmu ? Math.round(Ot(L.extWidthEmu)) : p(L.from.col), F = L.extHeightEmu ? Math.round(Ot(L.extHeightEmu)) : g(L.from.row);
        I(O(L.from.row, L.from.col), `f:${A}`, `data:${L.mime};base64,${ut(L.bytes)}`, N, F), A++;
      }
    }
    const m = [], y = [];
    for (let I = l.top; I <= l.bottom; I++) {
      if (!c(I)) continue;
      const A = [], L = [];
      for (let N = l.left; N <= l.right; N++) {
        const F = e.cellText(I, N);
        if (A.push(F), d.has(O(I, N))) continue;
        const H = e.cellInlineStyle(I, N), D = h.get(O(I, N)), B = D ? `${D.rs > 1 ? ` rowspan="${D.rs}"` : ""}${D.cs > 1 ? ` colspan="${D.cs}"` : ""}` : "", X = ((T = b.get(O(I, N))) != null ? T : []).map((j) => `<img data-clip-img="${j.key}" width="${j.w}" height="${j.h}" src="${j.url}" style="width:${j.w}px;height:${j.h}px" />`).join("");
        L.push(`<td${B}${H ? ` style="${H}"` : ""}>${Lr(F)}${X}</td>`);
      }
      m.push(A.join("	")), y.push(`<tr>${L.join("")}</tr>`);
    }
    const w = m.join(`
`), v = gh(n, s, l, { withImageBytes: !1, rowVisible: c }), S = `<table data-ooxml-clip="${bh(u ? wh(v) : v)}" border="1" style="border-collapse:collapse">${y.join("")}</table>`;
    await Ki(w, S);
  }
  /**
   * 不连续多选复制(1.13.0):把各区域按出现顺序**逐行堆叠**成一个块 → TSV + HTML 表写剪贴板。
   * 覆盖最常见场景(Ctrl 点多个行头复制非相邻行);列对齐以各区自身宽度。粘到 Excel/WPS / app 内都成堆叠块。
   * 注:不带 ooxml-clip 快照(多区无单一矩形快照),app 内粘贴走 HTML 解析(值 + 基本样式)。
   */
  async copyMultiSelection() {
    var a, c;
    const e = this.renderer, t = this.sheet;
    if (!e || !t) return;
    const n = this.hasFilters(), s = [], i = [];
    for (const d of this.getSelectionRanges()) {
      const h = Math.min(d.bottom, d.top + 4999), f = Math.min(d.right, d.left + 255);
      for (let u = d.top; u <= h; u++) {
        if (n && ((a = t.rows.get(u)) != null && a.hidden)) continue;
        const p = [], g = [];
        for (let b = d.left; b <= f; b++) {
          const m = (c = e.cellText(u, b)) != null ? c : "";
          p.push(m.replace(/[\t\n]/g, " "));
          const y = e.cellInlineStyle(u, b);
          g.push(`<td${y ? ` style="${y}"` : ""}>${Lr(m)}</td>`);
        }
        s.push(p.join("	")), i.push(`<tr>${g.join("")}</tr>`);
      }
    }
    const r = s.join(`
`), l = `<table border="1" style="border-collapse:collapse">${i.join("")}</table>`;
    await Ki(r, l);
  }
  /**
   * paste 事件粘贴(Ctrl+V 主路径,绑在 scroller 上)。`e.clipboardData` 给的是**原始未净化** HTML/图片/文本 ——
   * 关键:`navigator.clipboard.read()`(pasteFromClipboard 用)会净化 HTML、删掉 `<style>` 块和注释,而 WPS/Excel
   * 的格式(CSS 类)、数字格式(mso-number-format)、内嵌图(VML o:gfxdata)全在那里面 → 走 read 必丢。paste 事件不净化。
   * 我们自己复制的快照(data-ooxml-clip)也一并原样拿到,1:1 不受影响。
   */
  /**
   * 统一出口(核心层唯一只读反馈点):**任何**改数据的操作撞只读 → EditController/控制器都经 `host.emit` 走到这里,
   * 按 `readOnlyPrompt` 配置(dialog/toast/none)弹一次内置提醒,再转壳事件。新增输入方式只要照常走 EditController
   * 的 API(其内 `isEditable` 中央闸门已逐格拦截 + emit permission-denied),无需各自重写只读检查/提醒。
   */
  emitEditEvent(e, t) {
    var n, s, i;
    if (e === "permission-denied") {
      const r = t;
      r != null && r.reason && r.reason !== "dimension" && this.readonlyPrompt.show((n = this.editCfg.readOnlyPrompt) != null ? n : "dialog", (s = r.message) != null ? s : "目标只读,操作已跳过", (i = r.cells) != null ? i : []);
    }
    this.hooks.onEditEvent(e, t);
  }
  onPaste(e) {
    var l, a;
    const t = e.clipboardData;
    if (!t) return;
    const n = t.getData("text/html"), s = t.getData("text/plain"), i = (a = Array.from((l = t.items) != null ? l : []).find((c) => c.kind === "file" && c.type.startsWith("image/"))) == null ? void 0 : a.getAsFile(), r = !!n || !!s || !!i;
    if (!this.editCfg.editable) {
      r && (e.preventDefault(), this.emitEditEvent("permission-denied", { reason: "paste", cells: [], message: "当前为只读模式,无法粘贴(开启编辑后再试)" }));
      return;
    }
    if (n && this.pasteRichHtml(n)) {
      e.preventDefault();
      return;
    }
    if (i) {
      this.pasteImageBlob(i), e.preventDefault();
      return;
    }
    s && this.pasteText(s) && e.preventDefault();
  }
  /**
   * 从系统剪贴板粘贴(右键菜单"粘贴"等无 paste 事件的入口用)。`clipboard.read()` 拿 text/html —— 注意它会**净化**
   * HTML(删 `<style>`/注释),所以从 WPS/Excel 粘的格式不如 Ctrl+V(走 onPaste 的原始 HTML)全。否则单图 / TSV 兜底。
   */
  async pasteFromClipboard(e) {
    var n;
    if (!this.editCfg.editable)
      return this.emitEditEvent("permission-denied", { reason: "paste", cells: [], message: "当前为只读模式,无法粘贴(开启编辑后再试)" }), !1;
    const t = navigator.clipboard;
    try {
      if (t != null && t.read) {
        const s = await t.read();
        for (const i of s)
          if (i.types.includes("text/html")) {
            const r = await (await i.getType("text/html")).text();
            if (this.pasteRichHtml(r, void 0, e)) return !0;
          }
        for (const i of s) {
          const r = i.types.find((l) => l.startsWith("image/"));
          if (r && await this.pasteImageBlob(await i.getType(r))) return !0;
        }
      }
    } catch (s) {
    }
    try {
      const s = await ((n = t == null ? void 0 : t.readText) == null ? void 0 : n.call(t));
      return s ? this.pasteText(s) : !1;
    } catch (s) {
      return !1;
    }
  }
  /**
   * 解析 Excel/WPS 复制的剪贴板 HTML(text/html)→ 富粘贴:值 + 字体/颜色/填充/边框/对齐 + 合并 + data-uri 图,
   * **整体单次撤销**。无 `<table>` 返 false(调用方回退 TSV)。at 缺省用活动格。
   */
  pasteRichHtml(e, t, n) {
    var a;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const s = this.getSelection(), i = (a = t != null ? t : this.selActive) != null ? a : s ? { row: s.top, col: s.left } : null;
    if (!i) return !1;
    const r = vh(e);
    if (r) return this.edit.pasteSnapshot(i, r, n);
    const l = Fp(e);
    return l ? this.edit.pasteRich(i, l, n) : !1;
  }
  /** 读当前粘贴行为配置(完整)。 */
  getPasteBehavior() {
    return this.edit.getPasteBehavior();
  }
  /** 设粘贴行为默认(缺项回落默认);影响 Ctrl+V / 右键「粘贴」。右键「选择性粘贴」逐次预设走 pasteRichHtml 的第 3 参。 */
  setPasteBehavior(e) {
    this.edit.setPasteBehavior(e);
  }
  /** 打开「粘贴行为配置」面板(框架无关 DOM,三壳共用);应用即 setPasteBehavior。需 editable。 */
  openPasteConfigDialog() {
    return this.editCfg.editable ? (this.pasteConfigDialog.show({ current: this.edit.getPasteBehavior(), onSubmit: (e) => this.edit.setPasteBehavior(e) }), !0) : !1;
  }
  getImageInsertMode() {
    return this.imageInsertMode;
  }
  setImageInsertMode(e) {
    this.imageInsertMode = e, this.hooks.onRenderTick();
  }
  /**
   * 插入一张图片 blob:mode='cell' 嵌入到单元格(DISPIMG 式,复用 pasteImageBlob);
   * 'float' 浮动图(锚在活动格 / at,默认 120×90px)。需 editable。单次撤销。
   */
  async insertImageBlob(e, t = "float", n) {
    var f;
    if (!this.editCfg.editable || !this.sheet) return !1;
    if (t === "cell") return this.pasteImageBlob(e, n);
    const s = this.getSelection(), i = (f = n != null ? n : this.selActive) != null ? f : s ? { row: s.top, col: s.left } : { row: 0, col: 0 }, r = new Uint8Array(await e.arrayBuffer()), l = e.type || "image/png", a = await Om(e), c = await Ir(a), d = Ai(c, Ii(r, l));
    return this.addImage({ src: a, bytes: r, mime: l, from: { col: i.col, row: i.row, colOffEmu: 0, rowOffEmu: 0 }, extWidthEmu: Pe(d.width), extHeightEmu: Pe(d.height) }) < 0 ? !1 : (this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.render(), this.selectCell(i.row, i.col), !0);
  }
  /**
   * WPS「图片 → 本地图片 / 批量插图」:弹系统文件选择器,选中的图片按 mode 插入。
   * 批量(multiple)时依次向下错开一行/一格避免叠一起。需 editable(且浏览器环境)。
   */
  openImagePicker(e = this.imageInsertMode, t) {
    if (!this.editCfg.editable || !this.sheet || typeof document == "undefined") return !1;
    const n = document.createElement("input");
    return n.type = "file", n.accept = "image/*", t != null && t.multiple && (n.multiple = !0), n.style.position = "fixed", n.style.left = "-9999px", n.addEventListener("change", () => {
      var r, l;
      const s = Array.from((r = n.files) != null ? r : []), i = (l = this.selActive) != null ? l : this.getSelection() ? { row: this.getSelection().top, col: this.getSelection().left } : { row: 0, col: 0 };
      (async () => {
        const a = s.filter((d) => d.size > Ri);
        let c = !1;
        if (a.length) {
          const d = await this.promptImageOversize(a.length, a.reduce((h, f) => h + f.size, 0));
          if (d === null) {
            n.remove();
            return;
          }
          c = d;
        }
        for (let d = 0; d < s.length; d++) {
          const h = c && s[d].size > Ri ? await Iu(s[d]) : s[d];
          await this.insertImageBlob(h, e, { row: i.row + d, col: i.col });
        }
        n.remove();
      })();
    }, { once: !0 }), document.body.appendChild(n), n.click(), !0;
  }
  /** 弹"图片较大是否压缩"框;resolve true=压缩 / false=保持原图 / null=取消整批。 */
  promptImageOversize(e, t) {
    return new Promise((n) => {
      this.imageOversizeDialog.show({
        count: e,
        totalBytes: t,
        onCompress: () => n(!0),
        onKeep: () => n(!1),
        onCancel: () => n(null)
      });
    });
  }
  /** 把一张图片 blob 落到活动格(转内嵌图);剪贴板单图粘贴 / 拖文件进网格用。 */
  async pasteImageBlob(e, t) {
    var c;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const n = this.getSelection(), s = (c = t != null ? t : this.selActive) != null ? c : n ? { row: n.top, col: n.left } : { row: 0, col: 0 }, i = new Uint8Array(await e.arrayBuffer()), r = e.type || "image/png", l = this.addImage({ src: "", bytes: i, mime: r, from: { col: s.col, row: s.row, colOffEmu: 0, rowOffEmu: 0 }, extWidthEmu: Pe(96), extHeightEmu: Pe(96) });
    if (l < 0) return !1;
    const a = this.convertImageToCell(l, s.row, s.col);
    return a && (this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.selectCell(s.row, s.col), this.render()), a;
  }
  /**
   * 把 TSV(Excel/表格复制的制表符分隔文本)粘到选区左上角(无 at 时用活动格)。
   * 值类型自动推断(纯数字串→数字、`=`→公式)、跳过只读格;入命令栈可撤销。返回是否有改动。
   */
  pasteText(e, t) {
    var d;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const n = jm(e);
    if (!n.length) return !1;
    const s = this.getSelection(), i = (d = t != null ? t : this.selActive) != null ? d : s ? { row: s.top, col: s.left } : null;
    if (!i) return !1;
    const r = i.row, l = i.col, a = r + n.length - 1, c = l + Math.max(1, ...n.map((h) => h.length)) - 1;
    return this.edit.editRange({ top: r, left: l, bottom: a, right: c }, n);
  }
  // ====================== 查找 ======================
  /** 查找状态快照(壳渲染查找和替换对话框) */
  getFindState() {
    return {
      query: this.findQuery,
      matchCase: this.findMatchCase,
      wholeCell: this.findWholeCell,
      count: this.findHits.length,
      index: this.findIndex,
      replace: this.findReplace,
      scope: this.findScope,
      direction: this.findDirection,
      lookIn: this.findLookIn,
      wildcard: this.findWildcard
    };
  }
  /** 「全部查找」结果列表(跨表命中:sheet 下标 + 表名 + 行列 + 显示值)。 */
  getFindResults() {
    const e = this.workbook;
    return this.findHits.map((t) => {
      var n, s;
      return z(R({}, t), { sheetName: (s = (n = e == null ? void 0 : e.sheets[t.sheet]) == null ? void 0 : n.name) != null ? s : "" });
    });
  }
  setFindQuery(e) {
    this.findQuery = e, this.recomputeFind();
  }
  setFindMatchCase(e) {
    this.findMatchCase = e, this.recomputeFind();
  }
  setFindWholeCell(e) {
    this.findWholeCell = e, this.recomputeFind();
  }
  setFindScope(e) {
    this.findScope = e, this.recomputeFind();
  }
  setFindDirection(e) {
    this.findDirection = e, this.recomputeFind();
  }
  setFindLookIn(e) {
    this.findLookIn = e, this.recomputeFind();
  }
  setFindWildcard(e) {
    this.findWildcard = e, this.recomputeFind();
  }
  findOptions() {
    return {
      query: this.findQuery,
      matchCase: this.findMatchCase,
      wholeCell: this.findWholeCell,
      wildcard: this.findWildcard,
      scope: this.findScope,
      direction: this.findDirection,
      lookIn: this.findLookIn
    };
  }
  /** 重算命中并应用(query/选项变化时)。跨表命中,索引重置到第一处。 */
  recomputeFind() {
    var e;
    if (!this.workbook || !this.renderer || !this.findQuery) {
      this.findHits = [], this.findIndex = -1, (e = this.renderer) == null || e.setFind([], -1), this.notifyFindChange(), this.render();
      return;
    }
    this.findHits = mr(this.workbook, this.activeIndex, this.findOptions()), this.findIndex = this.findHits.length ? 0 : -1, this.applyFind();
  }
  /** 查找态变化通知(壳 + 对话框计数刷新)。 */
  notifyFindChange() {
    this.hooks.onFindChange(), this.findDialog.refresh();
  }
  /** 把当前活动表的命中应用到渲染器(高亮),并定位当前命中(必要时跨表跳转)。 */
  applyFind() {
    const e = this.renderer;
    if (!e) return;
    const t = this.findHits.filter((i) => i.sheet === this.activeIndex).map((i) => ({ row: i.row, col: i.col })), n = this.findHits[this.findIndex], s = n && n.sheet === this.activeIndex ? t.findIndex((i) => i.row === n.row && i.col === n.col) : -1;
    e.setFind(t, s), this.notifyFindChange(), n && n.sheet === this.activeIndex ? this.selectCell(n.row, n.col) : this.render();
  }
  /** 打开 WPS 查找和替换对话框(框架无关;三壳只转发)。tab 缺省 'find'。 */
  openFindReplaceDialog(e = "find") {
    if (this.findDialog.isOpen()) {
      this.findDialog.refresh();
      return;
    }
    this.findDialog.open({
      editable: !!this.editCfg.editable,
      initialTab: e,
      getState: () => this.getFindState(),
      onQuery: (t) => this.setFindQuery(t),
      onReplace: (t) => this.setFindReplace(t),
      onMatchCase: (t) => this.setFindMatchCase(t),
      onWholeCell: (t) => this.setFindWholeCell(t),
      onWildcard: (t) => this.setFindWildcard(t),
      onScope: (t) => this.setFindScope(t),
      onDirection: (t) => this.setFindDirection(t),
      onLookIn: (t) => this.setFindLookIn(t),
      onFindNext: () => this.findNext(),
      onFindPrev: () => this.findPrev(),
      onFindAll: () => this.getFindResults(),
      onGotoResult: (t) => this.gotoFindHit(t),
      onReplaceOne: () => this.replaceCurrent(),
      onReplaceAll: () => this.replaceAll(),
      onClose: () => this.clearFind()
    }), this.hooks.onFindChange();
  }
  isFindDialogOpen() {
    return this.findDialog.isOpen();
  }
  /** 关闭对话框 + 清查找态。 */
  closeFindReplaceDialog() {
    this.findDialog.close(), this.clearFind();
  }
  /** 定位到第 gi 个全局命中;若在别的表 → 请求壳切表,rebuild 后由 pendingFindFocus 落位。 */
  focusHit(e) {
    var n, s;
    const t = this.findHits[e];
    t && (this.findIndex = e, t.sheet !== this.activeIndex ? (this.pendingFindFocus = { sheet: t.sheet, row: t.row, col: t.col }, (s = (n = this.hooks).onActiveSheetChange) == null || s.call(n, t.sheet)) : this.applyFind());
  }
  /** rebuild 重跑查找后调用:若有待定位命中且落在当前表,选中它。 */
  resolvePendingFindFocus() {
    const e = this.pendingFindFocus;
    if (!e || e.sheet !== this.activeIndex) return;
    this.pendingFindFocus = null;
    const t = this.findHits.findIndex((n) => n.sheet === this.activeIndex && n.row === e.row && n.col === e.col);
    t >= 0 && (this.findIndex = t, this.applyFind());
  }
  findNext() {
    this.findHits.length && this.focusHit((this.findIndex + 1) % this.findHits.length);
  }
  findPrev() {
    this.findHits.length && this.focusHit((this.findIndex - 1 + this.findHits.length) % this.findHits.length);
  }
  /** 「全部查找」结果表点某行 → 跳到该命中。 */
  gotoFindHit(e) {
    e >= 0 && e < this.findHits.length && this.focusHit(e);
  }
  /** 关闭查找: 清 query + 命中(保留选项),清除高亮 */
  clearFind() {
    var e;
    this.findQuery = "", this.findHits = [], this.findIndex = -1, this.pendingFindFocus = null, (e = this.renderer) == null || e.setFind([], -1), this.notifyFindChange(), this.render();
  }
  // ====================== 替换(1.11.0,需 editable)======================
  // 替换作用于**活动表**(跨表命令栈批处理不支持,工作簿范围下也只替当前表);批注 lookIn 仅查不替。
  setFindReplace(e) {
    this.findReplace = e;
  }
  /** 按当前查找选项把字符串里的命中换掉;无命中返 null。 */
  replaceInString(e) {
    if (this.findWholeCell || this.findWildcard) {
      const n = Wl(this.findOptions());
      return n && n(e) ? this.findReplace : null;
    }
    const t = new RegExp(_m(this.findQuery), this.findMatchCase ? "g" : "gi");
    return t.test(e) ? e.replace(t, this.findReplace) : null;
  }
  /** 替换当前命中格(替换后重算命中并定位下一个);返回是否替换了。 */
  replaceCurrent() {
    if (!this.editCfg.editable || !this.findQuery || this.findLookIn === "comment") return !1;
    const e = this.findHits[this.findIndex];
    if (!e) return !1;
    if (e.sheet !== this.activeIndex)
      return this.findNext(), !1;
    if (!this.isCellEditable(e.row, e.col))
      return this.findNext(), !1;
    const t = this.replaceInString(this.getCellEditString(e.row, e.col));
    return t == null ? (this.findNext(), !1) : (this.editCell(e.row, e.col, t), this.recomputeFind(), !0);
  }
  /** 全部替换(活动表);返回替换的格数(整体单次撤销)。 */
  replaceAll() {
    const e = this.workbook;
    if (!this.editCfg.editable || !this.findQuery || !e || this.findLookIn === "comment") return 0;
    const t = mr(e, this.activeIndex, z(R({}, this.findOptions()), { scope: "sheet" })), n = [];
    for (const s of t) {
      if (!this.isCellEditable(s.row, s.col)) continue;
      const i = this.replaceInString(this.getCellEditString(s.row, s.col));
      i != null && n.push({ row: s.row, col: s.col, value: i });
    }
    return n.length ? (this.edit.setCellsBatch(n), this.recomputeFind(), n.length) : 0;
  }
  // ====================== 自动筛选 ======================
  /** 当前是否有列处于筛选中(工具栏「清除筛选」启用判断) */
  hasFilters() {
    return this.filterState.size > 0;
  }
  /** 筛选数据区底行: 正常用 af.bottom;若 af 只含表头(bottom===top)则延伸到数据末行 */
  filterDataBottom() {
    const e = this.sheet, t = e.autoFilterRange;
    return t.bottom > t.top ? t.bottom : e.dimension.rows - 1;
  }
  /** 某列(自动筛选数据区)的去重值,数值/中文自然排序 */
  distinctColumnValues(e) {
    const t = this.renderer, n = this.sheet;
    if (!t || !(n != null && n.autoFilterRange)) return [];
    const s = n.autoFilterRange, i = /* @__PURE__ */ new Set();
    for (let r = s.top + 1; r <= this.filterDataBottom(); r++) i.add(t.cellText(r, e) || Tr);
    return [...i].sort((r, l) => r.localeCompare(l, void 0, { numeric: !0 }));
  }
  /** 取一格喂给条件引擎的三元(显示文本 + 数值 + 日期 ms)。 */
  filterCellValue(e, t) {
    var l;
    const n = ((l = this.renderer) == null ? void 0 : l.cellText(e, t)) || "", s = this.sheet ? We(this.sheet, e, t) : null;
    let i = null, r = null;
    if (typeof s == "number" ? i = s : s instanceof Date && (r = s.getTime()), i === null) {
      const a = n.replace(/,/g, "").trim();
      a && /^-?\d+(\.\d+)?$/.test(a) && (i = Number(a));
    }
    if (r === null && n) {
      const a = Date.parse(n);
      isNaN(a) || (r = a);
    }
    return { text: n, num: i, dateMs: r };
  }
  /** 重算筛选导致的隐藏行并应用到模型(行隐藏机制 → 几何归零) */
  applyFilters() {
    var r, l, a;
    const e = this.renderer, t = this.sheet;
    if (!e || !(t != null && t.autoFilterRange)) return;
    const n = t.autoFilterRange, s = this.filterDataBottom();
    if (!this.filterOrigHidden.size)
      for (let c = n.top + 1; c <= s; c++) this.filterOrigHidden.set(c, (l = (r = t.rows.get(c)) == null ? void 0 : r.hidden) != null ? l : !1);
    const i = /* @__PURE__ */ new Map();
    for (const [c, d] of this.filterState)
      if ("cond" in d) {
        let h = d.cond;
        if (h.type === "top10" || h.type === "aboveAvg" || h.type === "belowAvg") {
          const f = [];
          for (let u = n.top + 1; u <= s; u++) {
            const p = this.filterCellValue(u, c).num;
            p !== null && f.push(p);
          }
          h = hg(h, f);
        }
        i.set(c, h);
      }
    for (let c = n.top + 1; c <= s; c++) {
      const d = (a = this.filterOrigHidden.get(c)) != null ? a : !1;
      let h = !1;
      for (const [p, g] of this.filterState)
        if ("values" in g) {
          if (!g.values.has(e.cellText(c, p) || Tr)) {
            h = !0;
            break;
          }
        } else if (!fg(i.get(p), this.filterCellValue(c, p))) {
          h = !0;
          break;
        }
      const f = d || h, u = t.rows.get(c);
      u ? u.hidden = f : f && t.rows.set(c, { height: t.defaultRowHeight, hidden: !0 });
    }
    e.setFilteredCols(new Set(this.filterState.keys())), e.rebuildMetrics(), this.refreshContentSize(), this.clearSelection(), this.hooks.onFilterChange(), this.render();
  }
  /** 点中下拉按钮 / 命令式: 打开某列筛选浮层(算去重值 + 已选 + 屏幕位置) */
  /** 列表型数据验证下拉:在箭头处弹可选值菜单(复用右键菜单宿主),点选 → editCell(undo 可回退)。 */
  openDataValidationPicker(e, t) {
    var i, r;
    const n = (r = (i = this.sheet) == null ? void 0 : i.dataValidationLists) == null ? void 0 : r.find(
      (l) => e.row >= l.range.top && e.row <= l.range.bottom && e.col >= l.range.left && e.col <= l.range.right
    );
    if (!n || !n.options.length) return;
    const s = n.options.map((l) => ({ label: l, action: () => this.editCell(e.row, e.col, l) }));
    this.menuHost.show(t.clientX, t.clientY, s);
  }
  /**
   * 数据验证拦截:提交某值前校验。返回 true=放行(可写入),false=拦截(stop,不写入)。
   * stop → 弹模态拒绝;warning/information → 弹 toast 但放行;公式串(=开头)不拦(结果未知,交引擎)。
   */
  passValidation(e, t, n) {
    if (!this.sheet || typeof n == "string" && n[0] === "=") return !0;
    const s = vo(this.sheet, e, t);
    if (!s) return !0;
    const i = np(s, n);
    return i ? (this.validationPrompt.showError(i.errorStyle, i.message, i.title), i.errorStyle !== "stop") : !0;
  }
  /** 选中带"输入提示"的数据验证格时,在格旁弹黄色气泡;否则隐藏。render() 末尾调用(随滚动跟手)。 */
  updateValidationBubble() {
    var c;
    const e = this.selActive, t = this.sheet;
    if (!e || !t) return this.hideValidationBubble();
    const n = vo(t, e.row, e.col);
    if (!n || !n.showInputMessage || !n.prompt && !n.promptTitle) return this.hideValidationBubble();
    const s = this.rectOf(e.row, e.col), i = this.els.renderArea.getBoundingClientRect();
    if (!s) return this.hideValidationBubble();
    if (s.x + s.w < 0 || s.y + s.h < 0 || s.x > this.view.width || s.y > this.view.height) return this.hideValidationBubble();
    const r = i.left + s.x + s.w, l = i.top + s.y + s.h, a = `${e.row}:${e.col}:${Math.round(r)}:${Math.round(l)}`;
    a !== this.bubbleSig && (this.bubbleSig = a, this.validationPrompt.showInputBubble(r, l, (c = n.prompt) != null ? c : "", n.promptTitle));
  }
  hideValidationBubble() {
    this.bubbleSig && (this.bubbleSig = "", this.validationPrompt.hideInputBubble());
  }
  /** 点表头筛选下拉 / 命令式:打开某列筛选浮层(WPS 式分页签:按内容 + 条件筛选;core DOM 三壳共用)。 */
  openFilterPopup(e, t = "values") {
    const n = this.renderer, s = this.sheet;
    if (!n || !(s != null && s.autoFilterRange)) return;
    const i = n.cellScreenRect(this.view, s.autoFilterRange.top, e), r = this.els.renderArea.getBoundingClientRect();
    let l = r.left + i.x, a = r.top + i.y + i.h;
    typeof window != "undefined" && (l + 274 > window.innerWidth && (l = Math.max(4, window.innerWidth - 278)), a + 360 > window.innerHeight && (a = Math.max(4, r.top + i.y - 360)));
    const c = this.distinctColumnValues(e), d = this.filterState.get(e);
    this.filterPopupHost.show({
      values: c,
      selected: d && "values" in d ? [...d.values] : [],
      sortDir: this.sortCol === e ? this.sortDir : null,
      colType: dg(c),
      currentCond: d && "cond" in d ? d.cond : null,
      condActive: !!(d && "cond" in d),
      x: l,
      y: a,
      initialTab: t,
      onSort: (h) => this.sortColumn(e, h),
      onApplyValues: (h) => this.applyFilterValues(e, h),
      onApplyCondition: (h) => this.applyFilterCondition(e, h),
      onClear: () => {
        this.filterState.delete(e), this.applyFilters();
      },
      onClose: () => this.hooks.onFilterChange()
    }), this.hooks.onFilterChange();
  }
  closeFilterPopup() {
    this.filterPopupHost.close(), this.hooks.onFilterChange();
  }
  /** 「按内容」确定:勾选值落筛选态(全选=取消该列;子集=保留;空集=全隐藏)。 */
  applyFilterValues(e, t) {
    var s;
    if (!((s = this.sheet) != null && s.autoFilterRange)) return;
    const n = this.distinctColumnValues(e);
    t.length >= n.length ? this.filterState.delete(e) : this.filterState.set(e, { values: new Set(t) }), this.applyFilters();
  }
  /** 打开某列筛选浮层并直达「条件筛选」页(程序化 / 数据 tab 入口)。1.16.0 */
  openFilterConditionDialog(e) {
    this.openFilterPopup(e, "condition");
  }
  /** 设/清某列条件筛选(cond=null 清除该列筛选)。 */
  applyFilterCondition(e, t) {
    var n;
    return (n = this.sheet) != null && n.autoFilterRange ? (t ? this.filterState.set(e, { cond: t }) : this.filterState.delete(e), this.applyFilters(), !0) : !1;
  }
  /** 清除当前表全部筛选 */
  clearAllFilters() {
    this.filterState.size && (this.filterState.clear(), this.applyFilters());
  }
  /**
   * 离开某表 / 取消自动筛选: 恢复被筛选隐藏的行,清空筛选态。
   * 传入要恢复的 sheet(切表时是"旧表",取消筛选时是当前表)。
   */
  resetFilter(e) {
    if (e && this.filterOrigHidden.size)
      for (const [t, n] of this.filterOrigHidden) {
        const s = e.rows.get(t);
        s && (s.hidden = n);
      }
    this.filterOrigHidden.clear(), this.filterState.clear(), this.filterPopupHost.close(), this.hooks.onFilterChange();
  }
  /** 换工作簿: 仅清筛选态(旧 sheet 已废,不需恢复行) */
  clearFilterState() {
    this.filterOrigHidden.clear(), this.filterState.clear(), this.filterPopupHost.close(), this.hooks.onFilterChange();
  }
  /** 工具栏「筛选」: 切换自动筛选。无则按选区(或整张已用区)新建,使下拉按钮出现。 */
  toggleAutoFilter() {
    const e = this.sheet, t = this.renderer;
    if (!(!e || !t)) {
      if (e.autoFilterRange)
        this.resetFilter(e), e.autoFilterRange = void 0;
      else {
        const n = this.getSelection(), s = n && !(n.top === n.bottom && n.left === n.right);
        e.autoFilterRange = s ? R({}, n) : { top: 0, left: 0, bottom: Math.max(0, e.dimension.rows - 1), right: Math.max(0, e.dimension.cols - 1) };
      }
      t.setFilteredCols(/* @__PURE__ */ new Set()), t.rebuildMetrics(), this.refreshContentSize(), this.hooks.onFilterChange(), this.render();
    }
  }
  // ====================== 排序 ======================
  /** 当前排序状态(壳可读以显示指示) */
  getSortState() {
    return { col: this.sortCol, dir: this.sortDir };
  }
  /** 按活动单元格所在列排序;若当前表未开启自动筛选,先按选区/已用区建立筛选范围。 */
  sortActiveColumn(e) {
    const t = this.sheet, n = this.getActiveCell();
    return !t || !n || (t.autoFilterRange || this.toggleAutoFilter(), !t.autoFilterRange || n.col < t.autoFilterRange.left || n.col > t.autoFilterRange.right) ? !1 : (this.sortColumn(n.col, e), this.sortCol === n.col && this.sortDir === e);
  }
  // ===== 条件格式编辑(1.9.0)需 `conditionalFormat` + `editable` 配置 =====
  /** 当前表的条件格式规则集(只读副本)。 */
  getConditionalRules() {
    return this.sheet ? this.sheet.conditional.slice() : [];
  }
  /** 新增一条规则;未给 id 自动派 `cf-u<n>`、origin 默认 'user'。返回新 id 或 false。 */
  addConditionalRule(e) {
    var i, r;
    if (!this.editCfg.conditionalFormat || !this.sheet) return !1;
    const t = (i = e.id) != null ? i : `cf-u${this.cfSeq++}`, n = this.sheet.conditional.reduce((l, a) => Math.max(l, a.priority || 0), 0), s = z(R({ priority: n + 1 }, e), { id: t, origin: (r = e.origin) != null ? r : "user" });
    return this.edit.setConditionalRules([...this.sheet.conditional, s]) ? (this.render(), t) : !1;
  }
  /** 按 id 改一条规则(浅合并 patch);编辑 parsed 规则会改其 raw 中的可视字段(色/名)以留住阈值。 */
  updateConditionalRule(e, t) {
    if (!this.editCfg.conditionalFormat || !this.sheet) return !1;
    const n = this.sheet.conditional.findIndex((i) => i.id === e);
    if (n < 0) return !1;
    const s = this.sheet.conditional.slice();
    return s[n] = z(R(R({}, s[n]), t), { dirty: !0 }), this.edit.setConditionalRules(s) ? (this.render(), !0) : !1;
  }
  /** 按 id 删一条规则。 */
  removeConditionalRule(e) {
    if (!this.editCfg.conditionalFormat || !this.sheet) return !1;
    const t = this.sheet.conditional.filter((n) => n.id !== e);
    return t.length === this.sheet.conditional.length || !this.edit.setConditionalRules(t) ? !1 : (this.render(), !0);
  }
  /** 整表替换规则集(对话框"应用"用)。 */
  setConditionalRules(e) {
    return !this.editCfg.conditionalFormat || !this.sheet || !this.edit.setConditionalRules(e) ? !1 : (this.render(), !0);
  }
  /** 打开条件格式管理对话框(框架无关 DOM,三壳共用)。需 `conditionalFormat` + `editable`。 */
  openConditionalFormatDialog() {
    return !this.editCfg.conditionalFormat || !this.editCfg.editable || !this.sheet ? !1 : (this.cfDialog.show({
      rules: this.sheet.conditional,
      selection: this.getSelection(),
      genId: () => `cf-u${this.cfSeq++}`,
      onApply: (e) => {
        this.setConditionalRules(e);
      }
    }), !0);
  }
  /** 打开 WPS 式透视表入口:确认选区字段后生成静态透视汇总表。需 `pivotTable` + `editable` 配置。 */
  openPivotTableDialog() {
    const e = this.getSelection();
    return !this.editCfg.pivotTable || !e || !this.renderer || !this.sheet || !this.editCfg.editable || this.pivotFieldOptions(e).length < 2 ? !1 : (this.pivotDialog.show({
      rangeLabel: `${de(e.left)}${e.top + 1}:${de(e.right)}${e.bottom + 1}`,
      defaultOutputCell: `${de(Math.min(e.right + 2, at - 2))}${e.top + 1}`,
      onSubmit: (n) => this.createPivotTableFromSelection({ output: n })
    }), !0);
  }
  /** 兼容旧 API:基于当前选区创建静态透视汇总表。 */
  createPivotTableFromSelection(e = {}) {
    const t = this.getSelection();
    if (!t) return this.failPivot("透视表创建失败:请先选择包含表头且至少两列两行的数据区域。");
    const n = {};
    return e.rowFieldIndex != null && (n.rows = [e.rowFieldIndex]), e.valueFieldIndex != null && (n.values = [{ field: e.valueFieldIndex, summary: "sum" }]), this.createPivotTable({ sourceRange: t, output: e.output, layout: n, showPanel: !0 });
  }
  /** 通过 API 直接创建静态透视表,不依赖页面选区或对话框。需 `pivotTable` + `editable` 配置。 */
  createPivotTable(e) {
    var x, S, k, M, E, $, T, I, A, L, N, F, H, D, B, X, j, ne, U, Q, V, ue, Ie;
    const t = this.renderer, n = this.workbook;
    if (!this.editCfg.pivotTable) return this.failPivot("透视表创建失败:未开启透视表功能(pivotTable 配置,默认关闭)。");
    if (!t || !n) return this.failPivot("透视表创建失败:工作簿尚未加载完成。");
    if (!this.editCfg.editable) return this.failPivot("透视表创建失败:请先开启编辑模式。");
    const s = (x = e.sourceSheetIndex) != null ? x : this.activeIndex, i = n.sheets[s];
    if (!i) return this.failPivot("透视表创建失败:源工作表不存在。");
    const r = (S = e.sourceRange) != null ? S : this.getSelection();
    if (!r || r.bottom <= r.top || r.right <= r.left) return this.failPivot("透视表创建失败:请先选择包含表头且至少两列两行的数据区域。");
    const l = [];
    for (let q = r.left; q <= r.right; q++) l.push(this.pivotCellText(i, r.top, q) || `字段${q - r.left + 1}`);
    const a = this.pivotFieldOptionsForSheet(i, r), c = !!((M = (k = e.layout) == null ? void 0 : k.rows) != null && M.length || ($ = (E = e.layout) == null ? void 0 : E.values) != null && $.length);
    let d;
    if (c) {
      const q = l.length;
      let K = ((A = (I = (T = e.layout) == null ? void 0 : T.rows) == null ? void 0 : I[0]) != null ? A : -1) - r.left, pe = ((H = (F = (N = (L = e.layout) == null ? void 0 : L.values) == null ? void 0 : N[0]) == null ? void 0 : F.field) != null ? H : -1) - r.left;
      if (pe < 0 && (pe = ((B = (D = a.find((Ae) => Ae.numeric)) == null ? void 0 : D.index) != null ? B : -1) - r.left), K < 0 && (K = ((j = (X = a.find((Ae) => Ae.index !== r.left + pe)) == null ? void 0 : X.index) != null ? j : -1) - r.left), pe < 0 || pe >= q) return this.failPivot("透视表创建失败:请选择有效的值字段。");
      if ((K < 0 || K === pe) && (K = pe === 0 ? 1 : 0), K < 0 || K >= q) return this.failPivot("透视表创建失败:请选择有效的行字段。");
      d = Bm(e.layout, r.left + K, r.left + pe);
    } else
      d = { filters: (Q = (U = (ne = e.layout) == null ? void 0 : ne.filters) == null ? void 0 : U.map((q) => {
        var K;
        return z(R({}, q), { values: (K = q.values) == null ? void 0 : K.slice() });
      })) != null ? Q : [], columns: [], rows: [], values: [] };
    const h = this.buildPivotRows(i, r, a, d, []);
    if (!h) return this.failPivot("透视表创建失败:值字段没有可汇总的数据。");
    const f = (V = e.output) != null ? V : { kind: "current-sheet", cell: `${de(r.right + 2)}${r.top + 1}` }, u = f.kind === "new-sheet" ? { row: 0, col: 0 } : Dm(f.cell);
    if (!u) return this.failPivot("透视表创建失败:请输入有效的生成位置,例如 H1。");
    const p = u.row, g = u.col, b = Math.max(1, ...h.rows.map((q) => q.length));
    if (g + b - 1 >= at) return this.failPivot("透视表创建失败:生成位置超出最大列数。");
    const m = { top: p, left: g, bottom: p + h.rows.length - 1, right: g + b - 1 };
    if (m.bottom >= Ft) return this.failPivot("透视表创建失败:生成位置超出最大行数。");
    if (f.kind === "current-sheet") {
      for (let q = m.top; q <= m.bottom; q++)
        for (let K = m.left; K <= m.right; K++)
          if (!this.isCellEditable(q, K)) return this.failPivot("透视表创建失败:生成区域包含只读单元格,请换一个位置或选择新建工作表。");
    }
    this.edit.ensureBaseline();
    const y = ee(n), w = f.kind === "new-sheet" ? Um(n) : i;
    for (let q = 0; q < h.rows.length; q++)
      for (let K = 0; K < h.rows[q].length; K++) _e(w, p + q, g + K, h.rows[q][K]);
    const v = {
      name: `PivotTable${w.pivotTables.length + 1}`,
      range: m,
      fields: l,
      source: { sheetIndex: s, range: R({}, r) },
      layout: Fr(d),
      collapsed: [],
      rowGroups: h.groups.map((q) => ({ row: p + q.rowOffset, key: q.key })),
      buttons: [
        { row: p, col: g, label: h.rowLabel, kind: "row" },
        { row: p, col: g + 1, label: h.valueLabel, kind: "data" }
      ]
    };
    return w.pivotTables.push(v), this.edit.pushUndoExternal({ kind: "restore-wb", snapshot: y }), this.edit.markDirtyExternal(), f.kind === "new-sheet" ? (n.activeSheet = n.sheets.indexOf(w), (Ie = (ue = this.hooks).onActiveSheetChange) == null || Ie.call(ue, n.activeSheet), this.rebuild(w, n, this.view.zoom, this.rendererOpts)) : (t.rebuildMetrics(), this.refreshContentSize(), this.overlays.build(i, t, this.view)), this.selectCell(p, g), e.showPanel && this.showPivotPanel({ sourceSheet: i, outSheet: w, sourceRange: R({}, r), outRange: m, fields: a, layout: d }), !0;
  }
  showPivotPanel(e) {
    this.pivotPanel.show({
      fields: e.fields,
      filterValues: zm(e.sourceSheet, e.sourceRange, e.fields),
      layout: e.layout,
      onChange: (t) => {
        var s;
        const n = e.outSheet.pivotTables.find((i) => i.range.top === e.outRange.top && i.range.left === e.outRange.left);
        n && (n.layout = Fr(t), this.recomputePivot(e.outSheet, n) && (e.outRange.bottom = n.range.bottom, e.outRange.right = n.range.right, (s = this.renderer) == null || s.rebuildMetrics(), this.refreshContentSize(), this.sheet && this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.render()));
      }
    });
  }
  /**
   * 透视表的唯一重算入口:读 pivot.source/layout/collapsed → 重建静态结果 → 清旧区写新区 →
   * 刷新 range/buttons/rowGroups。被面板改布局、源数据"活刷新"、折叠/展开三处共用,避免逻辑分叉。
   */
  recomputePivot(e, t) {
    var p;
    const n = this.workbook;
    if (!n || !t.source || !t.layout) return !1;
    const s = n.sheets[t.source.sheetIndex];
    if (!s) return !1;
    const i = this.pivotFieldOptionsForSheet(s, t.source.range), r = this.buildPivotRows(s, t.source.range, i, t.layout, (p = t.collapsed) != null ? p : []);
    if (!r) return !1;
    const l = t.range.top, a = t.range.left, c = Math.max(1, ...r.rows.map((g) => g.length)), d = l + r.rows.length - 1, h = a + c - 1, f = Math.max(t.range.bottom, d), u = Math.max(t.range.right, h);
    for (let g = l; g <= f; g++)
      for (let b = a; b <= u; b++) e.cells.delete(O(g, b));
    for (let g = 0; g < r.rows.length; g++)
      for (let b = 0; b < r.rows[g].length; b++) _e(e, l + g, a + b, r.rows[g][b]);
    return t.range = { top: l, left: a, bottom: d, right: h }, t.buttons = [
      { row: l, col: a, label: r.rowLabel, kind: "row" },
      { row: l, col: a + 1, label: r.valueLabel, kind: "data" }
    ], t.rowGroups = r.groups.map((g) => ({ row: l + g.rowOffset, key: g.key })), !0;
  }
  /**
   * 源数据"活刷新":任何模型变更(编辑/粘贴/撤销/重做都经 onModelChange)后,把所有透视表按其源区域重算,
   * 让结果跟着源数据走(WPS 透视表的"活"语义)。重算用 setCellValue 直接改模型(不经命令栈,不再触发
   * onModelChange),pivotRefreshing 兜底防重入。功能开关关闭或无透视表时零开销。
   */
  refreshPivotsAfterEdit() {
    var n, s, i;
    if (this.pivotRefreshing || !this.editCfg.pivotTable) return;
    const e = this.workbook;
    if (!e) return;
    let t = !1;
    for (const r of e.sheets) if (((s = (n = r.pivotTables) == null ? void 0 : n.length) != null ? s : 0) > 0) {
      t = !0;
      break;
    }
    if (t) {
      this.pivotRefreshing = !0;
      try {
        for (const r of e.sheets)
          for (const l of (i = r.pivotTables) != null ? i : [])
            l.source && l.layout && this.recomputePivot(r, l);
      } finally {
        this.pivotRefreshing = !1;
      }
    }
  }
  /** 折叠/展开某个外层行分组(行字段 ≥2 时由折叠按钮触发),重算并重绘。 */
  togglePivotGroup(e, t) {
    var r, l;
    const n = this.sheet;
    if (!n) return;
    const s = n.pivotTables[e];
    if (!s) return;
    const i = new Set((r = s.collapsed) != null ? r : []);
    i.has(t) ? i.delete(t) : i.add(t), s.collapsed = [...i], this.recomputePivot(n, s) && ((l = this.renderer) == null || l.rebuildMetrics(), this.refreshContentSize(), this.renderer && this.overlays.build(n, this.renderer, this.view), this.render());
  }
  /**
   * 重建透视结果为二维单元格数组(框架无关纯计算)。
   * 行字段第 1 个为外层分组,其余为内层明细 → 多行字段时产出可折叠的"大纲"(外层分组行带小计 +
   * 内层缩进明细);单行字段退化为扁平(每个值一行,无折叠)。列字段横向展开,值字段可多个。
   * groups 列出可折叠的分组表头行(相对 top 的偏移 + 外层 key),供渲染折叠按钮 + 命中测试。
   */
  buildPivotRows(e, t, n, s, i = []) {
    const r = s.rows, l = s.values;
    if (!r.length && !l.length)
      return { rows: [["数据透视表"]], rowLabel: "数据透视表", valueLabel: "", groups: [] };
    const a = l.length ? s.columns : [], c = new Set(i), d = l.map((T) => {
      var I, A;
      return (A = (I = n.find((L) => L.index === T.field)) == null ? void 0 : I.numeric) != null ? A : !1;
    }), h = (T) => {
      var I, A;
      return (A = (I = n.find((L) => L.index === T)) == null ? void 0 : I.label) != null ? A : `字段${T + 1}`;
    }, f = [];
    for (let T = t.top + 1; T <= t.bottom; T++)
      Wm(e, T, s.filters) && f.push(T);
    const u = gn(f.map((T) => It(e, T, a))), p = u.length ? u : [""], g = l.map((T) => `${Xm(T.summary)}: ${h(T.field)}`), b = [r.length ? r.map(h).join("/") || "行标签" : "总计"];
    for (const T of p)
      for (const I of g) b.push(T ? `${T} ${I}` : I);
    const m = (T, I, A) => {
      var N;
      let L = T.get(I);
      L || T.set(I, L = l.map(() => Pr()));
      for (let F = 0; F < l.length; F++) {
        const H = (N = e.cells.get(O(A, l[F].field))) == null ? void 0 : N.raw, D = Rr(H);
        Vm(L[F], d[F] && D != null ? D : null, H);
      }
    }, y = (T, I) => {
      const A = [T];
      return p.forEach((L) => {
        const N = I.get(L);
        for (let F = 0; F < l.length; F++) A.push(N ? Or(N[F], l[F].summary) : 0);
      }), A;
    };
    if (!r.length) {
      const T = /* @__PURE__ */ new Map();
      for (const I of f) m(T, a.length ? It(e, I, a) : "", I);
      return { rows: [b, y("总计", T)], rowLabel: b[0], valueLabel: g.join("/"), groups: [] };
    }
    const w = r[0], v = r.slice(1), x = v.length > 0, S = /* @__PURE__ */ new Map();
    for (const T of f) {
      const I = It(e, T, [w]), A = a.length ? It(e, T, a) : "";
      let L = S.get(I);
      if (L || S.set(I, L = { subtotal: /* @__PURE__ */ new Map(), inner: /* @__PURE__ */ new Map() }), m(L.subtotal, A, T), x) {
        const N = It(e, T, v);
        let F = L.inner.get(N);
        F || L.inner.set(N, F = /* @__PURE__ */ new Map()), m(F, A, T);
      }
    }
    if (!S.size) return null;
    const k = p.map(() => l.map(() => Pr())), M = [b], E = [];
    for (const T of gn([...S.keys()])) {
      const I = S.get(T);
      if (p.forEach((A, L) => {
        const N = I.subtotal.get(A);
        if (N) for (let F = 0; F < l.length; F++) Ym(k[L][F], N[F]);
      }), x) {
        if (E.push({ rowOffset: M.length, key: T }), M.push(y(`  ${T}`, I.subtotal)), !c.has(T))
          for (const A of gn([...I.inner.keys()])) M.push(y(`　　${A}`, I.inner.get(A)));
      } else
        M.push(y(T, I.subtotal));
    }
    const $ = ["总计"];
    for (let T = 0; T < p.length; T++) for (let I = 0; I < l.length; I++) $.push(Or(k[T][I], l[I].summary));
    return M.push($), { rows: M, rowLabel: b[0], valueLabel: g.join("/"), groups: E };
  }
  failPivot(e) {
    return console.warn(`[ooxml-preview] ${e}`), typeof window != "undefined" && window.alert(e), !1;
  }
  pivotFieldOptions(e) {
    const t = this.sheet;
    return t ? this.pivotFieldOptionsForSheet(t, e) : [];
  }
  pivotFieldOptionsForSheet(e, t) {
    var s;
    if (t.bottom <= t.top) return [];
    const n = [];
    for (let i = t.left; i <= t.right; i++) {
      let r = 0;
      for (let l = t.top + 1; l <= t.bottom; l++)
        Rr((s = e.cells.get(O(l, i))) == null ? void 0 : s.raw) != null && r++;
      n.push({ index: i, label: this.pivotCellText(e, t.top, i) || `字段${i - t.left + 1}`, numeric: r > 0 });
    }
    return n;
  }
  pivotCellText(e, t, n) {
    var i;
    if (e === this.sheet && this.renderer) return this.renderer.cellText(t, n).trim();
    const s = (i = e.cells.get(O(t, n))) == null ? void 0 : i.raw;
    return s == null ? "" : String(s).trim();
  }
  /**
   * 按某列对自动筛选数据区排序(只读视图重排:移动行内容 + 行高,不改文件)。
   * 合并区与数据区相交则拒绝(与 Excel 一致)。排序前会清除该表筛选,避免行索引快照错位。
   */
  sortColumn(e, t) {
    const n = this.renderer, s = this.sheet;
    if (!n || !(s != null && s.autoFilterRange)) return;
    const i = s.autoFilterRange, r = i.top + 1, l = this.filterDataBottom(), a = i.left, c = i.right;
    if (l <= r || e < a || e > c) return;
    for (const u of s.merges)
      if (!(u.bottom < r || u.top > l || u.right < a || u.left > c)) {
        console.warn("[ooxml-preview] 排序区域含合并单元格,已跳过(与 Excel 一致)");
        return;
      }
    this.resetFilter(s);
    const d = [];
    for (let u = r; u <= l; u++) {
      const p = [];
      for (let b = a; b <= c; b++) {
        const m = s.cells.get(O(u, b));
        m && p.push(m);
      }
      const g = s.cells.get(O(u, e));
      d.push({ key: g ? g.raw : null, cells: p, rowInfo: s.rows.get(u) });
    }
    const h = t === "asc" ? 1 : -1, f = d.map((u, p) => p);
    f.sort((u, p) => {
      const g = d[u].key, b = d[p].key, m = hn(g), y = hn(b);
      if (m && y) return u - p;
      if (m) return 1;
      if (y) return -1;
      const w = Nr(g, b);
      return w !== 0 ? h * w : u - p;
    });
    for (let u = r; u <= l; u++) {
      for (let p = a; p <= c; p++) s.cells.delete(O(u, p));
      s.rows.delete(u);
    }
    for (let u = 0; u < f.length; u++) {
      const p = r + u, g = d[f[u]];
      for (const b of g.cells)
        b.row = p, s.cells.set(O(p, b.col), b);
      g.rowInfo && s.rows.set(p, g.rowInfo);
    }
    this.sortCol = e, this.sortDir = t, n.rebuildMetrics(), this.refreshContentSize(), this.clearSelection(), this.hooks.onFilterChange(), this.render();
  }
  /** 多关键字排序(WPS 自定义排序);在自动筛选数据区内按 keys 依次比较,稳定,空值恒末尾。需 autoFilter。 */
  sortByKeys(e) {
    const t = this.renderer, n = this.sheet;
    if (!t || !(n != null && n.autoFilterRange) || !e.length) return !1;
    const s = n.autoFilterRange, i = s.top + 1, r = this.filterDataBottom(), l = s.left, a = s.right;
    if (r <= i) return !1;
    for (const h of n.merges) if (!(h.bottom < i || h.top > r || h.right < l || h.left > a)) return !1;
    this.resetFilter(n);
    const c = [];
    for (let h = i; h <= r; h++) {
      const f = [];
      for (let u = l; u <= a; u++) {
        const p = n.cells.get(O(h, u));
        p && f.push(p);
      }
      c.push({ keys: e.map((u) => {
        var p, g;
        return (g = (p = n.cells.get(O(h, u.col))) == null ? void 0 : p.raw) != null ? g : null;
      }), cells: f, rowInfo: n.rows.get(h) });
    }
    const d = c.map((h, f) => f);
    d.sort((h, f) => {
      for (let u = 0; u < e.length; u++) {
        const p = e[u].dir === "asc" ? 1 : -1, g = c[h].keys[u], b = c[f].keys[u], m = hn(g), y = hn(b);
        if (m && y) continue;
        if (m) return 1;
        if (y) return -1;
        const w = Nr(g, b);
        if (w !== 0) return p * w;
      }
      return h - f;
    });
    for (let h = i; h <= r; h++) {
      for (let f = l; f <= a; f++) n.cells.delete(O(h, f));
      n.rows.delete(h);
    }
    for (let h = 0; h < d.length; h++) {
      const f = i + h, u = c[d[h]];
      for (const p of u.cells)
        p.row = f, n.cells.set(O(f, p.col), p);
      u.rowInfo && n.rows.set(f, u.rowInfo);
    }
    return t.rebuildMetrics(), this.refreshContentSize(), this.clearSelection(), this.hooks.onFilterChange(), this.render(), !0;
  }
  /** 打开自定义排序对话框(多关键字)。需 autoFilter(否则不弹)。 */
  openSortDialog() {
    const e = this.sheet;
    if (!(e != null && e.autoFilterRange)) return !1;
    const t = e.autoFilterRange, n = [];
    for (let s = t.left; s <= t.right; s++) {
      const i = me(e, t.top, s);
      n.push({ index: s, label: i ? `${i}(${de(s)})` : de(s) });
    }
    return this.sortDialog.show({ columns: n, onApply: (s) => {
      this.sortByKeys(s);
    } }), !0;
  }
  // ====================== 编辑配置(E0:闸门) ======================
  /** 设置编辑配置(默认只读;壳在挂载 + props 变化时调) */
  setEditConfig(e) {
    var t;
    this.editCfg = e != null ? e : {}, this.edit.setPasteBehavior((t = this.editCfg.pasteBehavior) != null ? t : null), this.edit.refreshEngine(), this.renderer && (this.renderer.showFillHandle = !!this.editCfg.editable, this.render());
  }
  /** 该格当前是否可编辑(综合 editable + editableTargets 白名单 + readOnlyRanges + cellReadOnly) */
  isCellEditable(e, t) {
    return this.sheet ? Vo(this.sheet, e, t, this.editCfg) : !1;
  }
  /**
   * **运行时**改可编辑白名单(2026-06-08 新增) —— 不动 `:editableTargets` prop,
   * 直接覆盖 `editCfg.editableTargets`. 立即重绘以反映只读光标变化.
   * 传 `undefined` = 关闭白名单(默认全可编辑);`[]` = 全只读;单值或数组 = 白名单.
   */
  setEditableTargets(e) {
    this.editCfg = z(R({}, this.editCfg), { editableTargets: e }), this.render();
  }
  /** 当前生效的可编辑白名单(运行时 setEditableTargets 或初始 prop). 用 `undefined` 表示未启用白名单 */
  getEditableTargets() {
    return this.editCfg.editableTargets;
  }
  // ---- 命令式编辑 API(委托 EditController;E1) ----
  editCell(e, t, n) {
    return this.edit.editCell(e, t, n);
  }
  editRange(e, t) {
    return this.edit.editRange(e, t);
  }
  clearRange(e) {
    return this.edit.clearRange(e);
  }
  /** 给区域套样式覆盖(E5;粗体/对齐/填充等);editable 时走命令栈(可撤销 + 发 cell-change + 记脏) */
  setStyle(e, t) {
    return this.edit.setStyle(e, t);
  }
  // ---- 背景色 / 字体色 回显 + 修改(WPS 风格工具栏用) ----
  /** 活动格当前背景填充色(#RRGGBB);无填充/非纯色 → 默认白 #FFFFFF。 */
  getActiveFillColor() {
    var s;
    const e = this.selActive, t = e ? this.edit.getCellSnapshot(e.row, e.col) : null, n = (s = t == null ? void 0 : t.style) == null ? void 0 : s.fill;
    return n && n.type === "solid" && Pt(n.fgColor) || "#FFFFFF";
  }
  /** 活动格当前字体色(#RRGGBB);缺省黑 #000000。 */
  getActiveFontColor() {
    var n, s;
    const e = this.selActive, t = e ? this.edit.getCellSnapshot(e.row, e.col) : null;
    return Pt((s = (n = t == null ? void 0 : t.style) == null ? void 0 : n.font) == null ? void 0 : s.color) || "#000000";
  }
  /** 给当前选区设背景填充色(null = 清除填充);editable 时入命令栈。 */
  setSelectionFill(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { fill: e ? { type: "solid", fgColor: e } : { type: "none" } }) : !1;
  }
  /** 给当前选区设字体色;editable 时入命令栈。 */
  setSelectionFontColor(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { font: { color: e } }) : !1;
  }
  // ===== 格式刷(1.12.0,需 editable)=====
  /** 启动格式刷:采样活动格的样式 → 进入"刷"状态;下次选区完成即刷上。sticky=连续刷。 */
  startFormatPainter(e = !1) {
    var s;
    const t = this.selActive;
    if (!this.editCfg.editable || !t) return !1;
    const n = (s = this.edit.getCellSnapshot(t.row, t.col)) == null ? void 0 : s.style;
    return n ? (this.painterStyle = {
      font: R({}, n.font),
      fill: R({}, n.fill),
      borders: R({}, n.borders),
      hAlign: n.hAlign,
      vAlign: n.vAlign,
      wrapText: n.wrapText,
      shrinkToFit: n.shrinkToFit,
      textRotation: n.textRotation,
      indent: n.indent,
      numFmt: n.numFmt
    }, this.painterSticky = e, this.hooks.onSelectionChange(), !0) : !1;
  }
  /** 格式刷是否处于待刷状态(工具栏 active / 光标用)。 */
  isFormatPainterArmed() {
    return !!this.painterStyle;
  }
  /** 退出格式刷。 */
  cancelFormatPainter() {
    this.painterStyle && (this.painterStyle = null, this.painterSticky = !1, this.els.scroller.style.cursor = "", this.hooks.onSelectionChange());
  }
  /** 选区完成后(onMouseUp)若 armed → 把采样样式刷到当前选区;非连续则退出。 */
  applyFormatPainterIfArmed() {
    if (!this.painterStyle) return;
    const e = this.getSelection();
    e && this.setStyle(e, this.painterStyle), this.painterSticky || (this.painterStyle = null, this.hooks.onSelectionChange());
  }
  /** 给当前选区设数字格式代码(numFmt);editable 时入命令栈。1.11.0 */
  setSelectionNumberFormat(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { numFmt: e }) : !1;
  }
  /** 打开数字格式编辑对话框(框架无关 DOM,三壳共用)。需 editable + 选区。1.11.0 */
  openNumberFormatDialog() {
    var s, i, r;
    const e = this.getSelection(), t = this.selActive;
    if (!this.editCfg.editable || !e || !t || !this.sheet) return !1;
    const n = this.edit.getCellSnapshot(t.row, t.col);
    return this.numFmtDialog.show({
      sampleValue: We(this.sheet, t.row, t.col),
      currentCode: (i = (s = n == null ? void 0 : n.style) == null ? void 0 : s.numFmt) != null ? i : "General",
      date1904: !!((r = this.workbook) != null && r.date1904),
      onApply: (l) => {
        this.setSelectionNumberFormat(l);
      }
    }), !0;
  }
  // ===== 批注编辑(1.11.0,需 editable)=====
  /** 读某格批注(无则 ''). */
  getCellComment(e, t) {
    var n, s, i;
    return (i = (s = (n = this.sheet) == null ? void 0 : n.cells.get(O(e, t))) == null ? void 0 : s.comment) != null ? i : "";
  }
  /** 设/清某格批注(空串 = 删除);单次撤销。 */
  setCellComment(e, t, n) {
    if (!this.editCfg.editable) return !1;
    const s = this.edit.setCellComment(e, t, n);
    return s && this.render(), s;
  }
  /** 打开批注编辑对话框(默认活动格);需 editable。 */
  openCommentEditor(e, t) {
    const n = this.selActive, s = e != null ? e : n == null ? void 0 : n.row, i = t != null ? t : n == null ? void 0 : n.col;
    return !this.editCfg.editable || s == null || i == null || !this.isCellEditable(s, i) ? !1 : (this.commentDialog.show({
      cellRef: `${de(i)}${s + 1}`,
      current: this.getCellComment(s, i),
      onApply: (r) => {
        this.setCellComment(s, i, r);
      }
    }), !0);
  }
  // ---- 自动换行(WPS 风格 toggle) ----
  /** 当前选区里 wrapText 的整体态:'all' 全开 / 'none' 全关 / 'mixed' 混合。空选区→'none'。 */
  getSelectionWrapState() {
    var s;
    const e = this.getSelection();
    if (!e || !this.sheet) return "none";
    let t = 0, n = 0;
    for (let i = e.top; i <= e.bottom; i++)
      for (let r = e.left; r <= e.right; r++) {
        const l = this.edit.getCellSnapshot(i, r);
        if ((s = l == null ? void 0 : l.style) != null && s.wrapText ? t++ : n++, t && n) return "mixed";
      }
    return t ? "all" : "none";
  }
  /** 切换当前选区的"自动换行"(WPS 风格):全 wrap → 全关;否则 → 全开。
   *  失效行高缓存让 autofit 按新 wrap 重撑(只扩不缩);editable 时入命令栈(单次撤销 style)。
   *  注:undo 回滚 style 但不回滚行高,与现有 setStyle/autofit "只扩不缩"语义一致。 */
  toggleWrapTextOnSelection() {
    if (!this.editCfg.editable) return !1;
    const e = this.getSelection();
    if (!e || !this.sheet) return !1;
    const t = this.getSelectionWrapState() !== "all";
    return Vd(this.sheet), this.setStyle(e, { wrapText: t });
  }
  /** 合并区域(G1;清空被覆盖格,只留左上锚点);editable 时入命令栈 */
  mergeCells(e) {
    return this.edit.mergeCells(e);
  }
  /** 拆分区域内的合并(G1);editable 时入命令栈 */
  unmergeCells(e) {
    return this.edit.unmergeCells(e);
  }
  // ===== WPS 工具栏样式便利(1.16.0;把已有 setStyle 能力接成"开始"板块工具)=====
  /** 活动格字体态回显(工具栏 toggle 高亮用)。 */
  getSelectionFontState() {
    var n, s;
    const e = this.selActive, t = e ? (s = (n = this.edit.getCellSnapshot(e.row, e.col)) == null ? void 0 : n.style) == null ? void 0 : s.font : null;
    return { bold: !!(t != null && t.bold), italic: !!(t != null && t.italic), underline: !!(t != null && t.underline), underlineStyle: t == null ? void 0 : t.underlineStyle, name: t == null ? void 0 : t.name, size: t == null ? void 0 : t.size };
  }
  /** 活动格对齐态回显(工具栏 active 用)。 */
  getSelectionAlignState() {
    var n;
    const e = this.selActive, t = e ? (n = this.edit.getCellSnapshot(e.row, e.col)) == null ? void 0 : n.style : null;
    return { hAlign: t == null ? void 0 : t.hAlign, vAlign: t == null ? void 0 : t.vAlign, indent: t == null ? void 0 : t.indent };
  }
  /** 切换选区字体粗体/斜体/下划线/删除线(读活动格当前值取反,套整个选区)。 */
  toggleSelectionFont(e) {
    var r, l;
    const t = this.getSelection();
    if (!t) return !1;
    const n = this.selActive, s = n ? (l = (r = this.edit.getCellSnapshot(n.row, n.col)) == null ? void 0 : r.style) == null ? void 0 : l.font : null, i = e === "strike" ? !!(s != null && s.strike) : this.getSelectionFontState()[e];
    return this.setStyle(t, { font: { [e]: !i } });
  }
  /** 设选区下划线样式:none=无 / single=单下划线 / double=双下划线(WPS 下划线 ▾)。 */
  setSelectionUnderline(e) {
    const t = this.getSelection();
    return t ? e === "none" ? this.setStyle(t, { font: { underline: !1, underlineStyle: void 0 } }) : this.setStyle(t, { font: { underline: !0, underlineStyle: e } }) : !1;
  }
  /** 设选区字体名。 */
  setSelectionFontName(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { font: { name: e } }) : !1;
  }
  /** 设选区字号(pt)。 */
  setSelectionFontSize(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { font: { size: e } }) : !1;
  }
  /** 增/减选区字号(读活动格当前值 ± delta,范围 5~409 同 Excel)。 */
  adjustSelectionFontSize(e) {
    var n;
    const t = (n = this.getSelectionFontState().size) != null ? n : 11;
    return this.setSelectionFontSize(Math.max(5, Math.min(409, t + e)));
  }
  /** 剪切(复制 + 清内容);需 editable。 */
  async cutSelection() {
    const e = this.getSelection();
    return !this.editCfg.editable || !e ? !1 : (await this.copySelection(), this.clearRange(e));
  }
  /** 清除选区格式(字体/填充/边框/对齐/数字格式回默认;不动值);需 editable。 */
  clearSelectionFormat() {
    const e = this.getSelection();
    if (!this.editCfg.editable || !e) return !1;
    const t = { style: "none", color: "#000000" };
    return this.setStyle(e, {
      font: { bold: !1, italic: !1, underline: !1, strike: !1 },
      fill: { type: "none" },
      borders: { top: t, bottom: t, left: t, right: t },
      hAlign: "general",
      vAlign: "bottom",
      wrapText: !1,
      indent: 0,
      numFmt: "General"
    });
  }
  /** 增/减选区小数位(读活动格数字格式,加/减一位 0);常见单段格式;需 editable。 */
  adjustSelectionDecimals(e) {
    var h, f;
    const t = this.getSelection(), n = this.selActive;
    if (!this.editCfg.editable || !t || !n) return !1;
    let s = ((f = (h = this.edit.getCellSnapshot(n.row, n.col)) == null ? void 0 : h.style) == null ? void 0 : f.numFmt) || "General";
    (s === "General" || s === "@") && (s = "0");
    const i = /\.(0+)/.exec(s), r = i ? i[1].length : 0, l = Math.max(0, Math.min(20, r + e)), a = s.replace(/\.0+/g, ""), c = a.includes("%"), d = a.replace("%", "") + (l > 0 ? "." + "0".repeat(l) : "");
    return this.setSelectionNumberFormat(c ? d + "%" : d);
  }
  /** 给当前选区套样式覆盖(单元格样式预设等用);editable 时入命令栈。 */
  applySelectionStyle(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, e) : !1;
  }
  /**
   * 填充(WPS/Excel 向下/右/上/左):以选区首(尾)行/列为源,复制到其余格。需 editable。
   *  - 源是**公式** → 按偏移重写相对引用(=A1 向下 → =A2);否则复制值。
   *  - `mode`:all=值+格式(默认,同 Ctrl+D)/ values=仅值 / formats=仅格式。单次撤销。
   */
  fillSelection(e, t = "all") {
    const n = this.getSelection(), s = this.sheet;
    if (!this.editCfg.editable || !n || !s) return !1;
    const i = (d, h, f, u) => {
      if (t === "formats") return;
      const p = s.cells.get(O(d, h));
      return (p == null ? void 0 : p.type) === "formula" && p.formula ? Rh(p.formula, f - d, u - h) : We(s, d, h);
    }, r = (d, h) => t !== "values" ? { row: d, col: h } : void 0, l = [];
    if (e === "down" || e === "up") {
      const d = e === "down" ? n.top : n.bottom;
      if (n.bottom === n.top) return !1;
      for (let h = n.left; h <= n.right; h++)
        for (let f = n.top; f <= n.bottom; f++)
          f !== d && l.push({ row: f, col: h, value: i(d, h, f, h), styleFrom: r(d, h) });
    } else {
      const d = e === "right" ? n.left : n.right;
      if (n.right === n.left) return !1;
      for (let h = n.top; h <= n.bottom; h++)
        for (let f = n.left; f <= n.right; f++)
          f !== d && l.push({ row: h, col: f, value: i(h, d, h, f), styleFrom: r(h, d) });
    }
    const c = l.length ? this.edit.fillCells(l) : !1;
    return c && this.render(), c;
  }
  /** 序列填充(WPS「序列」对话框):方向按选区形状(高≥宽→向下,否则向右),首格为起点,按 spec 生成后续。 */
  fillSeries(e) {
    const t = this.getSelection(), n = this.sheet;
    if (!this.editCfg.editable || !t || !n) return !1;
    const s = [];
    if (t.bottom - t.top >= t.right - t.left) {
      const l = t.bottom - t.top;
      if (l <= 0) return !1;
      for (let a = t.left; a <= t.right; a++) {
        const c = Ti(We(n, t.top, a), l, e);
        for (let d = 0; d < c.length; d++) s.push({ row: t.top + 1 + d, col: a, value: c[d], styleFrom: { row: t.top, col: a } });
      }
    } else {
      const l = t.right - t.left;
      if (l <= 0) return !1;
      for (let a = t.top; a <= t.bottom; a++) {
        const c = Ti(We(n, a, t.left), l, e);
        for (let d = 0; d < c.length; d++) s.push({ row: a, col: t.left + 1 + d, value: c[d], styleFrom: { row: a, col: t.left } });
      }
    }
    const r = s.length ? this.edit.fillCells(s) : !1;
    return r && this.render(), r;
  }
  /** 打开序列对话框。 */
  openFillSeriesDialog() {
    return !this.editCfg.editable || !this.getSelection() ? !1 : (this.seriesDialog.show({ onApply: (e) => {
      this.fillSeries(e);
    } }), !0);
  }
  /**
   * 快速填充(Flash Fill,Ctrl+E):从活动格所在**目标列**已手打的样例,推断左侧源列的变换,
   * 填其余空行。需 editable + 目标列左侧有源列 + 目标列至少 1 个样例。单次撤销。返回是否填了值。
   */
  flashFill() {
    var g, b;
    const e = this.sheet, t = this.selActive;
    if (!this.editCfg.editable || !e || !t || t.col === 0) return !1;
    const n = t.col, s = this.getSelection();
    let i, r;
    if (s && s.bottom > s.top)
      i = s.top, r = s.bottom;
    else {
      const m = n - 1, y = ((b = (g = e.dimension) == null ? void 0 : g.rows) != null ? b : t.row + 1) - 1;
      for (i = t.row; i > 0 && me(e, i - 1, m).trim() !== ""; ) i--;
      for (r = t.row; r < y && me(e, r + 1, m).trim() !== ""; ) r++;
    }
    let l = n;
    for (let m = n - 1; m >= 0; m--) {
      let y = !1;
      for (let w = i; w <= r && !y; w++) me(e, w, m).trim() !== "" && (y = !0);
      if (!y) break;
      l = m;
    }
    if (l === n) return !1;
    const a = [];
    for (let m = l; m < n; m++) a.push(m);
    const c = [], d = [], h = [];
    for (let m = i; m <= r; m++) {
      c.push(a.map((w) => me(e, m, w))), d.push(m);
      const y = me(e, m, n);
      y.trim() !== "" && h.push({ row: c.length - 1, output: y });
    }
    if (!h.length) return !1;
    const f = Su(c, h);
    if (!f) return !1;
    const u = f.outputs.filter((m) => me(e, d[m.row], n).trim() === "").map((m) => ({ row: d[m.row], col: n, value: m.value }));
    if (!u.length) return !1;
    const p = this.edit.setCellsBatch(u);
    return p && this.render(), p;
  }
  /** 文本↔数值转换(WPS「转换」):text→数值把可解析的文本串改成数字(单次撤销);数值→文本设文本格式。需 editable。 */
  convertSelection(e) {
    const t = this.getSelection(), n = this.sheet;
    if (!this.editCfg.editable || !t || !n) return !1;
    if (e === "number-to-text") return this.setSelectionNumberFormat("@");
    const s = [];
    for (let i = t.top; i <= t.bottom; i++)
      for (let r = t.left; r <= t.right; r++) {
        const l = We(n, i, r);
        typeof l == "string" && l.trim() !== "" && !isNaN(Number(l.trim())) && s.push({ row: i, col: r, value: Number(l.trim()) });
      }
    return s.length ? this.edit.setCellsBatch(s) : !1;
  }
  /**
   * 套用表格样式(表头强调 + 隔行底纹 + 边框),一次单次撤销。需 editable + 选区。
   * preset:`<颜色>-<深浅>`(如 `blue-medium`;颜色 green/blue/orange/red/purple/teal/gray,深浅 light/medium/dark);
   * 兼容旧值 `green`/`blue`/`plain`。
   */
  applyTableStyle(e = "green") {
    const t = this.getSelection();
    if (!this.editCfg.editable || !t) return !1;
    const n = Hm(e), s = { style: "thin", color: n.border }, i = [], r = [], l = [];
    for (let a = t.top; a <= t.bottom; a++)
      for (let c = t.left; c <= t.right; c++)
        i.push({ row: a, col: c }), a === t.top ? r.push({ row: a, col: c }) : (a - t.top) % 2 === 0 && l.push({ row: a, col: c });
    return this.edit.setStyleRegions([
      { cells: i, patch: { borders: { top: s, bottom: s, left: s, right: s } } },
      { cells: r, patch: { font: { bold: !0, color: n.ht }, fill: { type: "solid", fgColor: n.h }, hAlign: "center" } },
      { cells: l, patch: { fill: { type: "solid", fgColor: n.b } } }
    ]);
  }
  // ===== 页面设置(1.16.0 页面选项卡,需 editable)=====
  /** 读当前表页面设置(缺省空对象)。 */
  getPageSetup() {
    var e, t;
    return (t = (e = this.sheet) == null ? void 0 : e.pageSetup) != null ? t : {};
  }
  /** 改页面设置(整体替换,单次撤销)。 */
  setPageSetup(e) {
    if (!this.editCfg.editable) return !1;
    const t = this.edit.setPageConfig({ pageSetup: e });
    return t && this.render(), t;
  }
  /** 改分页符(整体替换,单次撤销)。 */
  setPageBreaks(e, t) {
    if (!this.editCfg.editable) return !1;
    const n = this.edit.setPageConfig({ pageBreaks: { rows: e, cols: t } });
    return n && this.render(), n;
  }
  /** 把当前选区设为打印区域。 */
  setPrintAreaFromSelection() {
    var n, s;
    const e = this.getSelection();
    if (!this.editCfg.editable || !e) return !1;
    const t = z(R({}, (s = (n = this.sheet) == null ? void 0 : n.pageSetup) != null ? s : {}), { printArea: R({}, e) });
    return this.setPageSetup(t);
  }
  /** 在活动行/列切换分页符(有则删,无则加)。 */
  togglePageBreakAt(e) {
    var r, l, a, c;
    const t = this.selActive;
    if (!this.editCfg.editable || !t) return !1;
    const n = (l = (r = this.sheet) == null ? void 0 : r.pageBreaks) != null ? l : { rows: [], cols: [] }, s = [...(a = n.rows) != null ? a : []], i = [...(c = n.cols) != null ? c : []];
    if (e === "row") {
      const d = s.indexOf(t.row);
      d >= 0 ? s.splice(d, 1) : s.push(t.row);
    } else {
      const d = i.indexOf(t.col);
      d >= 0 ? i.splice(d, 1) : i.push(t.col);
    }
    return this.setPageBreaks(s, i);
  }
  /** 清所有分页符。 */
  clearPageBreaks() {
    return this.editCfg.editable ? this.setPageBreaks([], []) : !1;
  }
  /** 打开页面设置对话框。 */
  openPageSetupDialog() {
    var e;
    return !this.editCfg.editable || !this.sheet ? !1 : (this.pageSetupDialog.show({
      current: (e = this.sheet.pageSetup) != null ? e : {},
      hasSelection: !!this.getSelection(),
      onApply: (t) => {
        this.setPageSetup(t);
      },
      onPrintAreaFromSelection: () => this.setPrintAreaFromSelection()
    }), !0);
  }
  // ===== 背景 / 水印(1.16.0)=====
  getBackground() {
    var e;
    return (e = this.sheet) == null ? void 0 : e.background;
  }
  getWatermark() {
    var e;
    return (e = this.sheet) == null ? void 0 : e.watermark;
  }
  /** 设/清工作表背景图(undefined=清);需 editable。导出经 zip 注入 sheet <picture>。 */
  setBackground(e) {
    if (!this.editCfg.editable) return !1;
    const t = this.edit.setPageConfig({ background: e });
    return t && this.render(), t;
  }
  /** 设/清文字水印(undefined=清);需 editable。仅屏幕显示。 */
  setWatermark(e) {
    if (!this.editCfg.editable) return !1;
    const t = this.edit.setPageConfig({ watermark: e });
    return t && this.render(), t;
  }
  /** 打开背景/水印对话框。 */
  openBackgroundDialog() {
    return !this.editCfg.editable || !this.sheet ? !1 : (this.backgroundDialog.show({
      background: this.sheet.background,
      watermark: this.sheet.watermark,
      onApplyBackground: (e) => this.setBackground(e),
      onApplyWatermark: (e) => this.setWatermark(e)
    }), !0);
  }
  /** 求和/统计(WPS 求和 ▾):把 =FN(选区) 写到选区正下方(单行时右侧)的格。需 editable。 */
  autoSumSelection(e = "sum") {
    const t = this.getSelection();
    if (!this.editCfg.editable || !t) return !1;
    const n = (a, c) => `${de(c)}${a + 1}`, s = `${n(t.top, t.left)}:${n(t.bottom, t.right)}`, i = { sum: "SUM", average: "AVERAGE", count: "COUNT", max: "MAX", min: "MIN" }[e], r = t.bottom > t.top ? t.bottom + 1 : t.top, l = t.bottom > t.top ? t.left : t.right + 1;
    return this.editCell(r, l, `=${i}(${s})`);
  }
  // ---- 公式选项卡:插入函数对话框 + 计算 ----
  /** 预览一条公式串的结果(读模型已提交值,内置引擎无副作用求值;供插入函数对话框实时预览)。 */
  previewFormula(e) {
    try {
      const t = ml(e), n = this.workbook, s = this.sheet, r = Y(ct(t, {
        getCell: (l, a, c) => {
          var u;
          const d = l == null ? s : (u = n == null ? void 0 : n.sheets.find((p) => (p.name || "") === l)) != null ? u : null, h = d == null ? void 0 : d.cells.get(O(a, c));
          if (!h || h.type === "empty") return null;
          const f = h.raw;
          return typeof f == "number" || typeof f == "string" || typeof f == "boolean" ? f : null;
        }
      }));
      return P(r) ? r.code : r === null ? "" : typeof r == "boolean" ? r ? "TRUE" : "FALSE" : String(r);
    } catch (t) {
      return "#ERROR";
    }
  }
  /** 打开「插入函数」对话框(presetName 直接定位某函数);确定 → 插入活动格。需 editable。 */
  openInsertFunctionDialog(e) {
    var n;
    if (!this.editCfg.editable) return !1;
    const t = (n = this.selActive) != null ? n : { row: 0, col: 0 };
    return this.insertFnDialog.show({
      presetName: e,
      preview: (s) => this.previewFormula(s),
      onInsert: (s) => {
        this.editCell(t.row, t.col, s), this.selectCell(t.row, t.col);
      }
    }), !0;
  }
  /** 全量重算(公式选项卡「重算工作簿」)。未开重算/引擎未就绪 → false。 */
  recalcAll() {
    const e = this.edit.recalcAll();
    return e && this.render(), e;
  }
  /** 只重算当前工作表(「计算工作表」)。 */
  recalcActiveSheet() {
    const e = this.edit.recalcActiveSheet();
    return e && this.render(), e;
  }
  /** 计算模式(「计算选项」自动/手动)。 */
  getCalcMode() {
    return this.edit.getCalcMode();
  }
  setCalcMode(e) {
    this.edit.setCalcMode(e);
  }
  // ---- 数据选项卡:重新应用筛选 / 数据有效性 / 删除重复 / 文本分列 ----
  /** 当前选区;无选区则退化为活动格 1×1。 */
  selectionOrActive() {
    const e = this.getSelection();
    if (e) return e;
    const t = this.selActive;
    return t ? { top: t.row, left: t.col, bottom: t.row, right: t.col } : null;
  }
  /** 重新应用当前筛选(数据变更后手动重跑)。 */
  reapplyFilters() {
    var e;
    return (e = this.sheet) != null && e.autoFilterRange ? (this.applyFilters(), this.render(), !0) : !1;
  }
  /** 打开数据有效性对话框(取选区当 range;presetType='list' 供「下拉列表」直达)。需 editable。 */
  openDataValidationDialog(e) {
    var i, r;
    const t = this.selectionOrActive();
    if (!this.editCfg.editable || !t || !this.sheet) return !1;
    const n = (i = this.selActive) != null ? i : { row: t.top, col: t.left }, s = (r = vo(this.sheet, n.row, n.col)) != null ? r : null;
    return this.dvDialog.show({
      presetType: e,
      current: s,
      onApply: (l) => this.setDataValidation(l, t)
    }), !0;
  }
  /** 设/清区域数据有效性(rule=null 清除;range 缺省用当前选区)。 */
  setDataValidation(e, t) {
    const n = t != null ? t : this.getSelection();
    if (!n) return !1;
    const s = e ? z(R({}, e), { range: R({}, n) }) : null, i = this.edit.setDataValidation(s, n);
    return i && this.render(), i;
  }
  /** 打开删除重复项对话框(选区各列 + 表头标签)。需 editable。 */
  openRemoveDuplicatesDialog() {
    var s, i;
    const e = this.selectionOrActive();
    if (!this.editCfg.editable || !e || !this.sheet) return !1;
    const t = this.sheet, n = [];
    for (let r = e.left; r <= e.right; r++) {
      const l = me(t, e.top, r, (i = (s = this.workbook) == null ? void 0 : s.date1904) != null ? i : !1).trim();
      n.push({ index: r, label: l || `列 ${de(r)}` });
    }
    return this.removeDupDialog.show({
      columns: n,
      onApply: (r, l) => {
        this.edit.removeDuplicates(e, r, l), this.refreshContentSize(), this.render();
      }
    }), !0;
  }
  /** 打开文本分列对话框(按分隔符拆当前选区单列)。需 editable。 */
  openTextToColumnsDialog() {
    const e = this.selectionOrActive();
    return !this.editCfg.editable || !e ? !1 : (this.t2cDialog.show({
      onApply: (t) => {
        this.edit.textToColumns(e, t), this.render();
      }
    }), !0);
  }
  // ===== 审阅选项卡:批注导航/显示 + 单元格锁定 + 工作表/工作簿保护(1.16.0)=====
  /** 全表是否有任意批注(工具禁用态用)。 */
  hasAnyComment() {
    if (!this.sheet) return !1;
    for (const e of this.sheet.cells.values()) if (e.comment) return !0;
    return !1;
  }
  /** 活动格是否有批注(「删除批注」禁用态)。 */
  activeHasComment() {
    const e = this.selActive;
    return !!(e && this.getCellComment(e.row, e.col));
  }
  /** 删除活动格批注(审阅「删除批注」)。 */
  deleteActiveComment() {
    const e = this.selActive;
    return e ? this.setCellComment(e.row, e.col, "") : !1;
  }
  /** 跳到上一条/下一条批注(审阅「上一条/下一条」);按行列顺序循环,移动选区并滚动可见。 */
  gotoComment(e) {
    if (!this.sheet) return !1;
    const t = [];
    for (const r of this.sheet.cells.values()) r.comment && t.push({ row: r.row, col: r.col });
    if (!t.length) return !1;
    t.sort((r, l) => r.row - l.row || r.col - l.col);
    const n = this.selActive;
    let s = -1;
    n && (s = t.findIndex((r) => r.row === n.row && r.col === n.col));
    let i;
    return s < 0 ? i = e > 0 ? t[0] : t[t.length - 1] : i = t[(s + e + t.length) % t.length], this.selectCell(i.row, i.col), !0;
  }
  /** 切换「显示批注」常驻小黄框(审阅「显示」)。 */
  toggleShowAllComments() {
    var e;
    return this.showAllCommentsOn = !this.showAllCommentsOn, (e = this.renderer) == null || e.setShowAllComments(this.showAllCommentsOn), this.render(), this.hooks.onSelectionChange(), this.showAllCommentsOn;
  }
  isShowAllComments() {
    return this.showAllCommentsOn;
  }
  // ---- 单元格锁定(审阅「锁定单元格」)----
  /** 选区(或活动格)是否全部锁定(工具 active 态:缺省锁定 → 未显式解锁即锁定)。 */
  isSelectionLocked() {
    const e = this.selectionOrActive(), t = this.sheet;
    if (!e || !t) return !0;
    for (let n = e.top; n <= e.bottom; n++)
      for (let s = e.left; s <= e.right; s++)
        if (ll(t, n, s) === !1) return !1;
    return !0;
  }
  /** 切换选区锁定态(全锁 → 解锁;否则 → 全锁)。需 editable。单次撤销。 */
  toggleCellLock() {
    const e = this.selectionOrActive();
    if (!this.editCfg.editable || !e) return !1;
    const t = !this.isSelectionLocked(), n = this.edit.setCellsLocked(e, t);
    return n && (this.render(), this.hooks.onSelectionChange()), n;
  }
  // ---- 工作表保护(审阅「保护工作表」)----
  isSheetProtected() {
    var e, t;
    return !!((t = (e = this.sheet) == null ? void 0 : e.sheetProtection) != null && t.protected);
  }
  /** 打开保护/撤销工作表对话框(已保护 → 撤销流程;否则 → 保护对话框)。需 editable。 */
  openProtectSheetDialog() {
    if (!this.editCfg.editable || !this.sheet) return !1;
    const e = this.sheet.sheetProtection;
    return e != null && e.protected ? this.protectSheetDialog.show({
      mode: "unprotect",
      hasPassword: !!e.password,
      onUnprotect: (t) => {
        if (e.password && t !== e.password) {
          this.validationPrompt.showError("warning", "密码不正确,无法撤销保护。");
          return;
        }
        this.edit.setSheetProtection(null), this.render();
      }
    }) : this.protectSheetDialog.show({
      mode: "protect",
      onApply: ({ password: t, allow: n }) => {
        this.edit.setSheetProtection(z(R({ protected: !0 }, t ? { password: t } : {}), { allow: n })), this.render();
      }
    }), !0;
  }
  // ---- 允许编辑区域(审阅「允许编辑区域」)----
  /** 打开允许编辑区域对话框。需 editable。 */
  openAllowEditRangesDialog() {
    var n, s;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const e = ((n = this.sheet.protectedRanges) != null ? n : []).map((i) => R({ name: i.name, ref: this.rangeToRef(i.range) }, i.password ? { password: i.password } : {})), t = (s = this.selectionOrActive()) != null ? s : { top: 0, left: 0, bottom: 0, right: 0 };
    return this.allowRangesDialog.show({
      ranges: e,
      defaultRef: this.rangeToRef(t),
      onApply: (i) => {
        const r = [];
        for (const l of i) {
          const a = this.refToRange(l.ref);
          a && r.push(R({ name: l.name, range: a }, l.password ? { password: l.password } : {}));
        }
        this.edit.setProtectedRanges(r), this.render();
      }
    }), !0;
  }
  /** MergeRange → "A1:C3"。 */
  rangeToRef(e) {
    return e.top === e.bottom && e.left === e.right ? `${de(e.left)}${e.top + 1}` : `${de(e.left)}${e.top + 1}:${de(e.right)}${e.bottom + 1}`;
  }
  /** "A1:C3"/"A1" → MergeRange(0-based);非法返 null。 */
  refToRange(e) {
    const t = e.trim().split(/\s+/)[0], n = /^([A-Za-z]+)(\d+)(?::([A-Za-z]+)(\d+))?$/.exec(t);
    if (!n) return null;
    const s = (c) => {
      let d = 0;
      for (const h of c.toUpperCase()) d = d * 26 + (h.charCodeAt(0) - 64);
      return d - 1;
    }, i = s(n[1]), r = parseInt(n[2], 10) - 1, l = n[3] ? s(n[3]) : i, a = n[4] ? parseInt(n[4], 10) - 1 : r;
    return { top: Math.min(r, a), left: Math.min(i, l), bottom: Math.max(r, a), right: Math.max(i, l) };
  }
  // ---- 工作簿保护(审阅「保护工作簿」)----
  isWorkbookProtected() {
    var e, t;
    return !!((t = (e = this.workbook) == null ? void 0 : e.protection) != null && t.lockStructure);
  }
  /** 打开保护/撤销工作簿对话框。需 editable。 */
  openProtectWorkbookDialog() {
    if (!this.editCfg.editable || !this.workbook) return !1;
    const e = this.workbook.protection;
    return e != null && e.lockStructure || e != null && e.lockWindows ? this.protectWbDialog.show({
      mode: "unprotect",
      hasPassword: !!e.password,
      onUnprotect: (t) => {
        if (e.password && t !== e.password) {
          this.validationPrompt.showError("warning", "密码不正确,无法撤销保护。");
          return;
        }
        this.edit.setWorkbookProtection(null), this.render();
      }
    }) : this.protectWbDialog.show({
      mode: "protect",
      onApply: ({ lockStructure: t, password: n }) => {
        this.edit.setWorkbookProtection(R({ lockStructure: t }, n ? { password: n } : {})), this.render();
      }
    }), !0;
  }
  /** 共享工作簿(审阅「共享工作簿」)—— 该特性已被 Excel/WPS 官方弃用,占位提示不实现。 */
  shareWorkbookNotice() {
    this.validationPrompt.showError("information", "「共享工作簿」是已被官方弃用的旧特性,本组件不提供该能力。");
  }
  // ===== 视图选项卡:编辑栏 / 行号列标 / 网格线 / 任务窗格(1.16.0)=====
  /** 网格线是否显示(视图「网格线」;跟随当前表 showGridLines)。 */
  isGridLinesVisible() {
    var e;
    return ((e = this.sheet) == null ? void 0 : e.showGridLines) !== !1;
  }
  /** 切换网格线显示(直接改当前表 showGridLines;非撤销,同 WPS 视图开关)。 */
  toggleGridLines() {
    return this.sheet ? (this.sheet.showGridLines = !this.isGridLinesVisible(), this.render(), this.hooks.onSelectionChange(), this.sheet.showGridLines) : !1;
  }
  /** 行号列标是否显示(视图「行号列标」)。 */
  areHeadersVisible() {
    var e, t;
    return (t = (e = this.renderer) == null ? void 0 : e.areHeadersVisible()) != null ? t : !0;
  }
  /** 切换行号列标显示(渲染器表头尺寸归 0 / 恢复;重建几何 + 刷内容尺寸;非撤销)。 */
  toggleHeaders() {
    const e = this.renderer;
    if (!e) return !1;
    const t = !e.areHeadersVisible();
    return e.setShowHeaders(t), this.refreshContentSize(), this.sheet && this.overlays.build(this.sheet, e, this.view), this.render(), this.hooks.onSelectionChange(), t;
  }
  /** 编辑栏是否显示(视图「编辑栏」;壳读此决定是否渲染公式栏)。 */
  isFormulaBarVisible() {
    return this.formulaBarVisible;
  }
  /** 切换编辑栏显示(壳级 UI:改布尔 + 通知壳重渲)。 */
  toggleFormulaBar() {
    return this.formulaBarVisible = !this.formulaBarVisible, this.hooks.onSelectionChange(), this.formulaBarVisible;
  }
  /** 任务窗格是否打开(视图「任务窗格」)。 */
  isTaskPaneOpen() {
    return this.taskPane.isOpen();
  }
  /** 切换任务窗格(右停靠面板:工作表导航 + 选区统计 + 视图开关)。 */
  toggleTaskPane() {
    return this.taskPane.isOpen() ? (this.taskPane.close(), this.hooks.onSelectionChange(), !1) : (this.openTaskPane(), !0);
  }
  openTaskPane() {
    this.taskPane.show({
      getData: () => this.buildTaskPaneData(),
      onToggle: (e) => {
        e === "formulaBar" ? this.toggleFormulaBar() : e === "headers" ? this.toggleHeaders() : e === "gridlines" && this.toggleGridLines(), this.taskPane.refresh();
      },
      onClose: () => this.hooks.onSelectionChange()
    }), this.hooks.onSelectionChange();
  }
  /** 组装任务窗格数据(工作簿/表/选区/视图开关)。 */
  buildTaskPaneData() {
    var s, i, r, l, a, c;
    const e = (i = (s = this.workbook) == null ? void 0 : s.sheets.map((d) => d.name)) != null ? i : [], t = this.getSelection(), n = this.getSelectionStats();
    return {
      sheets: e,
      activeSheet: this.activeIndex,
      selectionRef: t ? t.top === t.bottom && t.left === t.right ? `${de(t.left)}${t.top + 1}` : `${de(t.left)}${t.top + 1}:${de(t.right)}${t.bottom + 1}` : "—",
      count: (r = n == null ? void 0 : n.count) != null ? r : 0,
      sum: (l = n == null ? void 0 : n.sum) != null ? l : 0,
      average: (a = n == null ? void 0 : n.avg) != null ? a : 0,
      numCount: (c = n == null ? void 0 : n.numCount) != null ? c : 0,
      formulaBar: this.isFormulaBarVisible(),
      headers: this.areHeadersVisible(),
      gridlines: this.isGridLinesVisible()
    };
  }
  /** 隐藏/显示选区所在行(WPS 行和列 ▾)。非撤销(可再"显示"还原)。 */
  setSelectionRowsHidden(e) {
    var s;
    const t = this.getSelection(), n = this.sheet;
    if (!this.editCfg.editable || !t || !n) return !1;
    for (let i = t.top; i <= t.bottom; i++) {
      const r = n.rows.get(i);
      r ? r.hidden = e : e && n.rows.set(i, { height: n.defaultRowHeight, hidden: !0 });
    }
    return (s = this.renderer) == null || s.rebuildMetrics(), this.refreshContentSize(), this.render(), !0;
  }
  /** 隐藏/显示选区所在列。 */
  setSelectionColsHidden(e) {
    var s;
    const t = this.getSelection(), n = this.sheet;
    if (!this.editCfg.editable || !t || !n) return !1;
    for (let i = t.left; i <= t.right; i++) {
      const r = n.columns.get(i);
      r ? r.hidden = e : e && n.columns.set(i, { width: n.defaultColWidth, hidden: !0 });
    }
    return (s = this.renderer) == null || s.rebuildMetrics(), this.refreshContentSize(), this.render(), !0;
  }
  /** 最适合选区行高/列宽(WPS 行和列 ▾)。 */
  autoFitSelection(e) {
    const t = this.getSelection();
    return !this.editCfg.editable || !t ? !1 : e === "col" ? this.autoFitColumns({ from: t.left, to: t.right }) > 0 : this.autoFitRows({ from: t.top, to: t.bottom }) > 0;
  }
  /** 当前冻结态(工具栏 active 用)。 */
  getFreezeState() {
    var e, t;
    return (t = (e = this.sheet) == null ? void 0 : e.freeze) != null ? t : { frozenRows: 0, frozenCols: 0 };
  }
  /**
   * 冻结(WPS 冻结 ▾):active=活动格(行+列)/ activeRow=只冻行到活动格 / activeCol=只冻列到活动格 /
   * header=智能识别表头 / firstRow=首行 / firstCol=首列 / none=取消。非撤销(同旧 toggle 行为)。
   */
  freezePanes(e) {
    var i, r;
    const t = this.sheet;
    if (!t) return !1;
    const { fr: n, fc: s } = this.freezeCountsForMode(e);
    return (i = this.renderer) == null || i.setFreezePreview(null), this.freezePreviewOn = !1, t.freeze = { frozenRows: n, frozenCols: s }, (r = this.renderer) == null || r.rebuildMetrics(), this.refreshContentSize(), this.render(), !0;
  }
  /** 各冻结模式 → {冻结行数 fr, 冻结列数 fc}(freezePanes 应用 / previewFreezeMode 预览共用)。 */
  freezeCountsForMode(e) {
    const t = this.selActive;
    let n = 0, s = 0;
    return e === "firstRow" ? n = 1 : e === "firstCol" ? s = 1 : e === "active" ? (n = t ? t.row : 1, s = t ? t.col : 0) : e === "activeRow" ? n = t ? t.row : 1 : e === "activeCol" ? s = t ? t.col : 0 : e === "header" && this.sheet && (n = dh(this.sheet)), { fr: n, fc: s };
  }
  /** 悬停冻结菜单项时高亮"将冻结的区域"(灰底 + 分割线加重,对齐 WPS)。不改模型。 */
  previewFreezeMode(e) {
    if (!this.sheet || !this.renderer) return;
    const { fr: t, fc: n } = this.freezeCountsForMode(e), s = t > 0 || n > 0;
    this.renderer.setFreezePreview(s ? { rows: t, cols: n } : null), this.freezePreviewOn = s, this.render();
  }
  /** 清除冻结预览(菜单项移出 / 菜单关闭 / 网格交互时调);无预览时空操作不重渲。 */
  clearFreezePreview() {
    !this.renderer || !this.freezePreviewOn || (this.renderer.setFreezePreview(null), this.freezePreviewOn = !1, this.render());
  }
  /** 设选区水平对齐。 */
  setSelectionHAlign(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { hAlign: e }) : !1;
  }
  /** 设选区垂直对齐。 */
  setSelectionVAlign(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { vAlign: e }) : !1;
  }
  /** 增减选区缩进(下限 0)。 */
  adjustSelectionIndent(e) {
    var s;
    const t = this.getSelection();
    if (!t) return !1;
    const n = (s = this.getSelectionAlignState().indent) != null ? s : 0;
    return this.setStyle(t, { indent: Math.max(0, n + e) });
  }
  /** 给选区加/清框线(WPS 全项):所有/无/外侧/上/下/左/右。单/外侧边用 setStyleRegions 精确到边界格,单次撤销。 */
  setSelectionBorders(e, t = "#000000") {
    const n = this.getSelection();
    if (!this.editCfg.editable || !n) return !1;
    const s = { style: "thin", color: t }, i = { style: "none", color: "#000000" };
    if (e === "all") return this.setStyle(n, { borders: { top: s, bottom: s, left: s, right: s } });
    if (e === "none") return this.setStyle(n, { borders: { top: i, bottom: i, left: i, right: i } });
    const r = (a, c, d, h) => {
      const f = [];
      for (let u = a; u <= d; u++) for (let p = c; p <= h; p++) f.push({ row: u, col: p });
      return f;
    }, l = [];
    return (e === "outer" || e === "top") && l.push({ cells: r(n.top, n.left, n.top, n.right), patch: { borders: { top: s } } }), (e === "outer" || e === "bottom") && l.push({ cells: r(n.bottom, n.left, n.bottom, n.right), patch: { borders: { bottom: s } } }), (e === "outer" || e === "left") && l.push({ cells: r(n.top, n.left, n.bottom, n.left), patch: { borders: { left: s } } }), (e === "outer" || e === "right") && l.push({ cells: r(n.top, n.right, n.bottom, n.right), patch: { borders: { right: s } } }), l.length ? this.edit.setStyleRegions(l) : !1;
  }
  /** 合并居中(WPS 合并居中):合并选区 + 锚点水平居中/垂直居中。 */
  mergeCenterSelection() {
    const e = this.getSelection();
    if (!this.editCfg.editable || !e) return !1;
    const t = this.mergeCells(e);
    return t && this.setStyle({ top: e.top, left: e.left, bottom: e.top, right: e.left }, { hAlign: "center", vAlign: "middle" }), t;
  }
  /** 清除(WPS 清除菜单):all=全部(删格)/ content=内容 / formats=格式 / comments=批注。单次撤销。 */
  clearSelectionCells(e) {
    const t = this.getSelection();
    if (!this.editCfg.editable || !t) return !1;
    if (e === "content") return this.clearRange(t);
    if (e === "formats") return this.clearSelectionFormat();
    const n = this.edit.clearCellsSnapshot(t, e);
    return n && this.render(), n;
  }
  // ---- 图片编辑(E6;浮动/嵌入 增删移改) ----
  /** 读当前表全部图片锚点(克隆)。 */
  getImages() {
    return this.edit.getImages();
  }
  /** 加一张图(无 src 但有 bytes+mime 时自动生成 blob url);返回插入索引(失败 -1)。 */
  addImage(e) {
    let t = e;
    return !t.src && t.bytes && t.mime && (t = z(R({}, t), { src: URL.createObjectURL(new Blob([t.bytes], { type: t.mime })) })), this.edit.addImage(t);
  }
  /** 删一张图。 */
  removeImage(e) {
    const t = this.edit.removeImage(e);
    return t && this.afterImageStructChange(), t;
  }
  /** 图片增删/互转后:清选中态 + 重建 overlay(<img> el 随 sheet.images 增删)+ 重绘。 */
  afterImageStructChange() {
    this.selectImage(-1), this.sheet && this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.render();
  }
  /** 移动图片(屏幕像素增量);editable 时入命令栈 + 发 image-change。 */
  moveImage(e, t, n) {
    return this.editImageRect(e, (s) => z(R({}, s), { left: s.left + t, top: s.top + n }));
  }
  /** 缩放图片(目标屏幕像素宽高);editable 时入命令栈 + 发 image-change。 */
  resizeImage(e, t, n) {
    return this.editImageRect(e, (s) => z(R({}, s), { width: Math.max(8, t), height: Math.max(8, n) }));
  }
  /** 设浮动图旋转角(顺时针度,自动归一 0~359);editable 时入命令栈 + 重绘。 */
  setImageRotation(e, t) {
    var i;
    const n = (i = this.sheet) == null ? void 0 : i.images[e];
    if (!this.editCfg.editable || !n) return !1;
    this.edit.ensureBaseline();
    const s = se(n);
    return n.rotation = (Math.round(t) % 360 + 360) % 360 || void 0, this.edit.recordImageEdit(e, s, se(n)), this.render(), !0;
  }
  /** 在当前角度上增量旋转(+90 右转 / -90 左转);editable。 */
  rotateImage(e, t) {
    var s;
    const n = (s = this.sheet) == null ? void 0 : s.images[e];
    return n ? this.setImageRotation(e, (n.rotation || 0) + t) : !1;
  }
  /** 设浮动图裁剪(各边 0~1 比例,undefined=清);editable 入命令栈。 */
  setImageCrop(e, t) {
    var i;
    const n = (i = this.sheet) == null ? void 0 : i.images[e];
    if (!this.editCfg.editable || !n) return !1;
    this.edit.ensureBaseline();
    const s = se(n);
    return n.crop = t && (t.l || t.t || t.r || t.b) ? R({}, t) : void 0, this.edit.recordImageEdit(e, s, se(n)), this.render(), !0;
  }
  /** 进入裁剪模式(拖控制点=裁剪);选中该图。需 editable。 */
  enterImageCrop(e) {
    var t;
    return !this.editCfg.editable || !((t = this.sheet) != null && t.images[e]) ? !1 : (this.selectImage(e), this.cropModeIdx = e, this.render(), !0);
  }
  /** 退出裁剪模式(保留已裁结果)。 */
  exitImageCrop() {
    this.cropModeIdx < 0 || (this.cropModeIdx = -1, this.render());
  }
  /** 把浮动图恢复为**初始物理尺寸**(像素÷DPI×96 + 上限,同插入时;锚点/位置不变);需 editable。 */
  async resetImageSize(e) {
    var i, r;
    const t = (i = this.sheet) == null ? void 0 : i.images[e];
    if (!this.editCfg.editable || !(t != null && t.src)) return !1;
    const n = await Ir(t.src), s = Ai(n, t.bytes ? Ii(t.bytes, (r = t.mime) != null ? r : "") : null);
    return this.resizeImage(e, s.width, s.height);
  }
  /** 浮动图右键菜单项(WPS 式:嵌入到单元格 / 预览 / 重置原图大小 / 删除)。 */
  buildImageContextMenuItems(e) {
    var s, i;
    const t = (s = this.sheet) == null ? void 0 : s.images[e];
    if (!t) return [];
    const n = ((i = t.mime) == null ? void 0 : i.split("/")[1]) || "png";
    return [
      { label: "图片嵌入到单元格", action: () => {
        this.convertImageToCellAuto(e);
      } },
      { label: "图片预览", action: () => {
        t.src && this.openImageLightbox(t.src, `image-${e + 1}.${n}`, t.mime);
      } },
      {
        label: "图片旋转",
        children: [
          { label: "向右旋转 90°", action: () => {
            this.selectImage(e), this.rotateImage(e, 90);
          } },
          { label: "向左旋转 90°", action: () => {
            this.selectImage(e), this.rotateImage(e, -90);
          } },
          { label: "重置旋转", action: () => {
            this.selectImage(e), this.setImageRotation(e, 0);
          } }
        ]
      },
      {
        label: "图片裁剪",
        children: [
          { label: "进入裁剪(拖控制点裁剪,点空白/Esc 确认)", action: () => {
            this.enterImageCrop(e);
          } },
          { label: "重置裁剪", action: () => {
            this.selectImage(e), this.setImageCrop(e, void 0);
          } }
        ]
      },
      { label: "重置为原图大小", action: () => {
        this.resetImageSize(e);
      } },
      { separator: !0 },
      { label: "删除图片", action: () => {
        this.removeImage(e);
      } }
    ];
  }
  // ---- WPS 单元格内嵌图(DISPIMG)⇄ 浮动图互转(第二期) ----
  /** 改 WPS 单元格内嵌图贴合方式(fill/contain/cover);即时重绘。 */
  setCellImageFit(e) {
    var t;
    this.rendererOpts = z(R({}, this.rendererOpts), { cellImageFit: e }), (t = this.renderer) != null && t.setCellImageFit(e) && this.render();
  }
  /** 读 WPS 单元格内嵌图登记表(克隆,id→{id,src,mime});无则空数组。 */
  getCellImages() {
    var t;
    const e = (t = this.workbook) == null ? void 0 : t.cellImages;
    return e ? Array.from(e.values(), (n) => ({ id: n.id, src: n.src, mime: n.mime })) : [];
  }
  /** 某格是否内嵌图(DISPIMG)→ 返 {id,src,mime},否则 null(供点击放大判定)。 */
  getCellImageAt(e, t) {
    var i, r, l, a;
    const n = (r = (i = this.sheet) == null ? void 0 : i.cells.get(O(e, t))) == null ? void 0 : r.dispImgId, s = n ? (a = (l = this.workbook) == null ? void 0 : l.cellImages) == null ? void 0 : a.get(n) : void 0;
    return s ? { id: s.id, src: s.src, mime: s.mime } : null;
  }
  /** 开/关图片点击放大灯箱(默认开;只读模式单击图、编辑模式右键菜单触发)。 */
  setLightboxEnabled(e) {
    this.lightboxEnabled = e;
  }
  /** 打开图片放大灯箱(命令式;src = blob/data/http url)。 */
  openImageLightbox(e, t, n) {
    this.lightbox.show({ src: e, fileName: t, mime: n });
  }
  /** 一张浮动图视觉中心落在哪个单元格(用几何反推;无渲染器时回落锚点 from 格)。 */
  imageCellOf(e) {
    var s;
    const t = (s = this.sheet) == null ? void 0 : s.images[e];
    if (!t) return null;
    if (!this.renderer) return { row: t.from.row, col: t.from.col };
    const n = re(this.renderer.metrics, t);
    return {
      row: this.renderer.metrics.rowAt(n.top),
      col: this.renderer.metrics.colAt(n.left)
    };
  }
  /** 浮动图 → 单元格内嵌图(显式指定目标格);失败返 false。 */
  convertImageToCell(e, t, n) {
    const s = this.edit.convertImageToCell(e, t, n);
    return s && this.afterImageStructChange(), s;
  }
  /** 选区批量:把"中心格落在 range 内"的所有浮动图就近嵌入,聚合成单次 undo;返回成功嵌入张数。 */
  convertImagesInRangeToCell(e) {
    const t = this.sheet;
    if (!t) return 0;
    const n = [];
    for (let s = 0; s < t.images.length; s++) {
      const i = this.imageCellOf(s);
      i && i.row >= e.top && i.row <= e.bottom && i.col >= e.left && i.col <= e.right && n.push({ imageIndex: s, row: i.row, col: i.col });
    }
    return n.length ? this.edit.convertImagesToCells(n) : 0;
  }
  // applyTemplate(P3 旧版 placeholder + anchor 模型,2026-06-08 已删除)
  // 新语义"模板=样式捐赠者"由 core/template/style-overlay.ts 提供,壳层 (Vue/React) 用
  // applyStyleTemplate(dataWb, templateWb) 合成后再 loadModel 喂进来,不再走 controller 内 in-place 改造.
  /** 选区批量:把 range 内所有 DISPIMG 格拎成浮动图;聚合成单次 undo;返回成功转换张数。 */
  convertCellImagesInRangeToFloat(e, t) {
    const n = this.sheet;
    if (!n) return 0;
    const s = [];
    for (let i = e.top; i <= e.bottom; i++)
      for (let r = e.left; r <= e.right; r++) {
        const l = n.cells.get(O(i, r));
        l != null && l.dispImgId && s.push({ row: i, col: r, size: t });
      }
    return s.length ? this.edit.convertCellImagesToFloats(s) : 0;
  }
  /** 浮动图 → 内嵌图(**就近**:图在哪格就嵌哪格,目标由几何反推);失败返 false。 */
  convertImageToCellAuto(e) {
    const t = this.imageCellOf(e);
    if (!t) return !1;
    const n = this.edit.convertImageToCell(e, t.row, t.col);
    return n && this.afterImageStructChange(), n;
  }
  /**
   * 批量把浮动图按"所在单元格"就近嵌入(整表 / 整列)。`col` 给定则只嵌中心落在该列的图。
   * 一次进撤销栈(单次 Ctrl+Z 全撤)。返回成功嵌入的张数。
   */
  convertAllImagesToCells(e) {
    var s;
    const t = (s = this.sheet) == null ? void 0 : s.images;
    if (!t || !t.length) return 0;
    const n = [];
    for (let i = 0; i < t.length; i++) {
      const r = this.imageCellOf(i);
      r && (e != null && r.col !== e || n.push({ imageIndex: i, row: r.row, col: r.col }));
    }
    return this.edit.convertImagesToCells(n);
  }
  /** 单元格内嵌图 → 浮动图(把 row,col 的 DISPIMG 拎成浮动图);非内嵌图格返 false。 */
  convertCellImageToFloat(e, t, n) {
    return this.edit.convertCellImageToFloat(e, t, n);
  }
  // ---- 行列结构编辑(E7;增删行列) ----
  /** 在 at 处插入 count 行(原 at 行及之后下移)。 */
  insertRows(e, t = 1) {
    return this.edit.insertRows(e, t);
  }
  /** 删除 [at, at+count) 行(与合并相交则警告,相交合并被移除)。 */
  deleteRows(e, t = 1) {
    return this.sheet && pi(this.sheet, "delete-rows", e, t) && console.warn("[ooxml-preview] 删除行与合并单元格相交,相交的合并将被移除"), this.edit.deleteRows(e, t);
  }
  /** 在 at 处插入 count 列。 */
  insertCols(e, t = 1) {
    return this.edit.insertCols(e, t);
  }
  /** 删除 [at, at+count) 列(与合并相交则警告)。 */
  deleteCols(e, t = 1) {
    return this.sheet && pi(this.sheet, "delete-cols", e, t) && console.warn("[ooxml-preview] 删除列与合并单元格相交,相交的合并将被移除"), this.edit.deleteCols(e, t);
  }
  /** 移动/缩放公共路径:算当前矩形 → 变换 → setImageRect → 重定位 → 补登命令。 */
  editImageRect(e, t) {
    if (!this.editCfg.editable || !this.sheet || !this.renderer) return !1;
    const n = this.sheet.images[e];
    if (!n) return !1;
    this.edit.ensureBaseline();
    const s = se(n);
    return fo(this.sheet, e, t(re(this.renderer.metrics, n)), this.view.zoom), this.render(), this.edit.recordImageEdit(e, s, se(this.sheet.images[e])), !0;
  }
  undo() {
    this.edit.undo();
  }
  redo() {
    this.edit.redo();
  }
  canUndo() {
    return this.edit.canUndo();
  }
  canRedo() {
    return this.edit.canRedo();
  }
  getEditingCell() {
    return this.edit.getEditingCell();
  }
  getCellSnapshot(e, t) {
    return this.edit.getCellSnapshot(e, t);
  }
  /** 单元格"全息体检":snapshot + 合并区 + 浮动图覆盖 + WPS 内嵌图 + 数据验证 + 条件格式命中 + 链接/批注。
   *  无 workbook / sheet / 越界返 null。详见 [src/core/model/inspect.ts](src/core/model/inspect.ts)。 */
  inspectCell(e, t) {
    const n = this.sheet, s = this.workbook;
    return !n || !s || e < 0 || t < 0 ? null : Du(n, s, e, t, s.date1904);
  }
  // ---- 编辑器宿主(E2) ----
  /** 壳注入合并后的编辑器解析器(plugin.editor + prop.editor) */
  setEditorResolver(e) {
    this.editorResolver = e;
  }
  /**
   * 进入编辑:解析编辑器工厂(无自定义则用内置文本编辑器)→ 挂载。只读则不进入。
   * initialText 为打字进入时的起始字符。返回是否进入。
   */
  beginEdit(e, t, n) {
    var u, p, g, b, m;
    if (!this.sheet || !this.workbook) return !1;
    const s = (p = (u = this.renderer) == null ? void 0 : u.mergeAt(e, t)) != null ? p : null, i = s ? s.top : e, r = s ? s.left : t;
    if (!this.isCellEditable(i, r)) return !1;
    const l = (g = this.sheet.cells.get(O(i, r))) != null ? g : null;
    if (l != null && l.dispImgId) return !1;
    const a = (m = (b = this.editorResolver) == null ? void 0 : b.call(this, l, { row: i, col: r })) != null ? m : Sg, c = s ? this.rectOfRange(s) : this.rectOf(i, r), d = this.edit.getCellSnapshot(i, r);
    if (!c || !d) return !1;
    const h = {
      snapshot: d,
      rect: c,
      sheet: this.sheet,
      workbook: this.workbook,
      permission: "editable",
      initialText: n,
      commit: (y, w) => this.commitEdit(y, w),
      cancel: () => this.cancelEdit()
    }, f = s ? () => this.rectOfRange(s) : void 0;
    return this.editorHost.mount(i, r, a, h, f) ? (this.edit.setEditing({ row: i, col: r }), this.hooks.onEditEvent("edit-start", { cell: { row: i, col: r }, snapshot: d }), !0) : !1;
  }
  /**
   * 提交当前编辑(取值 → 命令栈 → 卸编辑器)。value 可为裸值或 {value,style}(样式 E5 起生效)。
   * move 指示提交后活动格移动(Enter→down / Tab→right)。
   */
  commitEdit(e, t) {
    const n = this.edit.getEditingCell();
    if (!n) return !1;
    const s = e !== null && typeof e == "object" && !(e instanceof Date) && "value" in e, i = s ? e.value : e, r = s ? e.style : void 0;
    if (!this.passValidation(n.row, n.col, i)) return !1;
    !r && typeof i == "string" && i === this.getCellEditString(n.row, n.col) || this.edit.editCell(n.row, n.col, i), r && this.edit.setStyle({ top: n.row, left: n.col, bottom: n.row, right: n.col }, r), this.hooks.onEditEvent("edit-commit", { cell: n, value: i }), this.editorHost.unmount(), this.edit.setEditing(null);
    const a = this.renderer;
    if (t && a) {
      const c = t === "down" ? Math.min(n.row + 1, a.metrics.rows - 1) : n.row, d = t === "right" ? Math.min(n.col + 1, a.metrics.cols - 1) : n.col;
      this.selectCell(c, d);
    }
    return this.els.scroller.focus(), !0;
  }
  /** 取消当前编辑(不改模型) */
  cancelEdit() {
    this.editorHost.isActive() && (this.editorHost.unmount(), this.edit.setEditing(null));
  }
  /** 当前是否有活动编辑器 */
  isEditing() {
    return this.editorHost.isActive();
  }
  // ====================== 导出 / 打印(委托 WorkbookExporter) ======================
  exportImage(e) {
    return this.exporter.exportImage(e);
  }
  downloadImage(e) {
    return this.exporter.downloadImage(e);
  }
  exportPdf(e) {
    return this.exporter.exportPdf(e);
  }
  downloadPdf(e) {
    return this.exporter.downloadPdf(e);
  }
  print(e) {
    return this.exporter.print(e);
  }
  /** 打印预览:生成分页页图 → 弹全屏预览浮层(内含「打印」= 走 print(同 opts));无可导出表返 false。只读也可用。 */
  async openPrintPreview(e) {
    const t = await this.exporter.buildPrintPages(e != null ? e : {});
    return t.length ? (this.printPreview.show({ sheets: t, onPrint: () => void this.exporter.print(e) }), !0) : !1;
  }
  // ---- 数据导出(E8;委托 WorkbookExporter,一份数据层 → xlsx/json/csv) ----
  exportXlsx(e) {
    return this.exporter.exportXlsx(e);
  }
  downloadXlsx(e) {
    return this.exporter.downloadXlsx(e);
  }
  exportJson(e) {
    return this.exporter.exportJson(e);
  }
  downloadJson(e) {
    this.exporter.downloadJson(e);
  }
  exportCsv(e) {
    return this.exporter.exportCsv(e);
  }
  downloadCsv(e) {
    this.exporter.downloadCsv(e);
  }
}
function Ar(o) {
  return { top: o.row, left: o.col, bottom: o.row, right: o.col };
}
function de(o) {
  let e = o + 1, t = "";
  for (; e > 0; ) {
    const n = (e - 1) % 26;
    t = String.fromCharCode(65 + n) + t, e = Math.floor((e - 1) / 26);
  }
  return t;
}
function Dm(o) {
  const e = /^\s*([A-Za-z]+)([1-9]\d*)\s*$/.exec(o);
  if (!e) return null;
  let t = 0;
  for (const s of e[1].toUpperCase()) t = t * 26 + s.charCodeAt(0) - 64;
  const n = Number(e[2]) - 1;
  return t -= 1, n >= 0 && n < Ft && t >= 0 && t < at ? { row: n, col: t } : null;
}
function Rr(o) {
  if (typeof o == "number" && Number.isFinite(o)) return o;
  if (typeof o == "string") {
    const e = Number(o.replace(/,/g, "").trim());
    if (Number.isFinite(e)) return e;
  }
  return null;
}
function It(o, e, t) {
  return t.length ? t.map((n) => {
    var i;
    const s = (i = o.cells.get(O(e, n))) == null ? void 0 : i.raw;
    return s == null || String(s).trim() === "" ? "(空白)" : String(s);
  }).join(" / ") : "";
}
function gn(o) {
  return [...new Set(o)].sort((e, t) => e.localeCompare(t, void 0, { numeric: !0 }));
}
function zm(o, e, t) {
  var s;
  const n = {};
  for (const i of t) {
    const r = [];
    for (let l = e.top + 1; l <= e.bottom; l++) {
      const a = (s = o.cells.get(O(l, i.index))) == null ? void 0 : s.raw;
      a != null && String(a).trim() !== "" && r.push(String(a));
    }
    n[i.index] = gn(r);
  }
  return n;
}
function Bm(o, e, t) {
  var n, s, i, r, l, a;
  return {
    filters: (s = (n = o == null ? void 0 : o.filters) == null ? void 0 : n.map((c) => {
      var d;
      return z(R({}, c), { values: (d = c.values) == null ? void 0 : d.slice() });
    })) != null ? s : [],
    columns: (r = (i = o == null ? void 0 : o.columns) == null ? void 0 : i.slice()) != null ? r : [],
    rows: (l = o == null ? void 0 : o.rows) != null && l.length ? o.rows.slice() : [e],
    values: (a = o == null ? void 0 : o.values) != null && a.length ? o.values.map((c) => R({}, c)) : [{ field: t, summary: "sum" }]
  };
}
function Fr(o) {
  return {
    filters: o.filters.map((e) => {
      var t;
      return z(R({}, e), { values: (t = e.values) == null ? void 0 : t.slice() });
    }),
    columns: o.columns.slice(),
    rows: o.rows.slice(),
    values: o.values.map((e) => R({}, e))
  };
}
function Wm(o, e, t) {
  var n, s;
  for (const i of t) {
    const r = (n = o.cells.get(O(e, i.field))) == null ? void 0 : n.raw, l = r == null || String(r).trim() === "" ? "" : String(r);
    if (i.mode === "non-empty" && !l || i.mode === "equals" && l !== ((s = i.value) != null ? s : "") || i.mode === "include" && i.values && i.values.length && !i.values.includes(l)) return !1;
  }
  return !0;
}
function Um(o) {
  const e = "PivotTable", t = new Set(o.sheets.map((r) => r.name));
  let n = e, s = 1;
  for (; t.has(n); ) n = `${e}${++s}`;
  const i = {
    name: n,
    index: o.sheets.length,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: [qm()],
    merges: [],
    columns: /* @__PURE__ */ new Map(),
    rows: /* @__PURE__ */ new Map(),
    defaultColWidth: 80,
    defaultRowHeight: 24,
    freeze: { frozenRows: 0, frozenCols: 0 },
    conditional: [],
    dataValidations: [],
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: !0
  };
  return o.sheets.push(i), i;
}
function qm() {
  return {
    font: { name: "Calibri", size: 11, bold: !1, italic: !1, underline: !1, strike: !1, color: "#000000" },
    fill: { type: "none" },
    borders: {},
    hAlign: "general",
    vAlign: "bottom",
    wrapText: !1,
    shrinkToFit: !1,
    textRotation: 0,
    indent: 0,
    numFmt: "General"
  };
}
function Lr(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function _m(o) {
  return o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function jm(o) {
  if (!o) return [];
  let e = o.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
  return e.endsWith(`
`) && (e = e.slice(0, -1)), e === "" ? [] : e.split(`
`).map((t) => t.split("	"));
}
function hn(o) {
  return o == null || o === "";
}
function Nr(o, e) {
  const t = Hr(o), n = Hr(e);
  if (t !== n) return t - n;
  if (t === 0) {
    const s = Dr(o), i = Dr(e);
    return s < i ? -1 : s > i ? 1 : 0;
  }
  return t === 2 ? (o ? 1 : 0) - (e ? 1 : 0) : String(o).localeCompare(String(e), void 0, { numeric: !0 });
}
function Pr() {
  return { sum: 0, count: 0, max: null, min: null };
}
function Vm(o, e, t) {
  e != null ? (o.sum += e, o.count++, o.max = o.max == null ? e : Math.max(o.max, e), o.min = o.min == null ? e : Math.min(o.min, e)) : t != null && String(t).trim() && o.count++;
}
function Ym(o, e) {
  o.sum += e.sum, o.count += e.count, e.max != null && (o.max = o.max == null ? e.max : Math.max(o.max, e.max)), e.min != null && (o.min = o.min == null ? e.min : Math.min(o.min, e.min));
}
function Or(o, e) {
  var t, n;
  return e === "count" ? o.count : e === "avg" ? o.count ? o.sum / o.count : 0 : e === "max" ? (t = o.max) != null ? t : 0 : e === "min" ? (n = o.min) != null ? n : 0 : o.sum;
}
function Xm(o) {
  return { sum: "求和项", count: "计数项", avg: "平均值", max: "最大值", min: "最小值" }[o];
}
function Hr(o) {
  return typeof o == "number" || o instanceof Date ? 0 : typeof o == "boolean" ? 2 : 1;
}
function Dr(o) {
  return o instanceof Date ? o.getTime() : typeof o == "number" ? o : Number(o);
}
function fn(o, e, t, n, s) {
  const i = o.metrics.rows - 1, r = o.metrics.cols - 1, l = (h, f) => h >= 0 && h <= i && f >= 0 && f <= r, a = (h, f) => o.cellText(h, f) !== "";
  let c = e + n, d = t + s;
  if (!l(c, d)) return { row: e, col: t };
  if (a(e, t) && a(c, d))
    for (; l(c + n, d + s) && a(c + n, d + s); )
      c += n, d += s;
  else
    for (; l(c, d) && !a(c, d) && l(c + n, d + s); )
      c += n, d += s;
  return { row: c, col: d };
}
function Gm(o) {
  return o ? Array.isArray(o) ? o.filter(Boolean) : [o] : [];
}
class mb {
  constructor(e) {
    this.container = e;
  }
  /** 重渲所有插件的 overlay:依次调 overlay(ctx),把返回的 DOM 节点替换进容器。 */
  render(e, t) {
    const n = [];
    for (const s of e)
      if (s.overlay)
        try {
          n.push(...Gm(s.overlay(t)));
        } catch (i) {
          console.warn("[ooxml-preview] 插件 overlay 渲染失败:", s.name, i);
        }
    this.container.replaceChildren(...n);
  }
  dispose() {
    this.container.replaceChildren();
  }
}
const bb = [
  {
    title: "导航",
    items: [
      { keys: "↑ ↓ ← →", desc: "移动活动单元格" },
      { keys: "Ctrl + 方向键", desc: "跳到数据区边界" },
      { keys: "Shift + 方向键", desc: "扩展选区" },
      { keys: "Home", desc: "移到本行首列" },
      { keys: "Ctrl + Home", desc: "移到 A1" },
      { keys: "End", desc: "移到本行末列" },
      { keys: "Ctrl + End", desc: "移到数据右下角" },
      { keys: "PageUp / PageDown", desc: "上 / 下翻一屏" },
      { keys: "Enter", desc: "下移一格" },
      { keys: "Tab / Shift + Tab", desc: "右 / 左移一格" }
    ]
  },
  {
    title: "选择",
    items: [
      { keys: "Ctrl + A", desc: "全选" },
      { keys: "Ctrl + 单击", desc: "多区域加选(不连续选区)" }
    ]
  },
  {
    title: "编辑",
    items: [
      { keys: "F2", desc: "进入单元格编辑", requiresEdit: !0 },
      { keys: "任意字符", desc: "直接输入覆盖当前格", requiresEdit: !0 },
      { keys: "Delete / Backspace", desc: "清除内容", requiresEdit: !0 },
      { keys: "Ctrl + Z", desc: "撤销", requiresEdit: !0 },
      { keys: "Ctrl + Y / Ctrl + Shift + Z", desc: "重做", requiresEdit: !0 },
      { keys: "Ctrl + E", desc: "快速填充(Flash Fill)", requiresEdit: !0 },
      { keys: "Esc", desc: "取消编辑 / 退出格式刷 / 取消选中图片" }
    ]
  },
  {
    title: "剪贴板",
    items: [
      { keys: "Ctrl + C", desc: "复制选区" },
      { keys: "Ctrl + V", desc: "粘贴(保留格式)", requiresEdit: !0 }
    ]
  },
  {
    title: "图片(选中浮动图,编辑模式)",
    items: [
      { keys: "Delete / Backspace", desc: "删除选中图片", requiresEdit: !0 },
      { keys: "Esc", desc: "取消选中 / 退出裁剪", requiresEdit: !0 }
    ]
  }
];
class Km {
  // modelIndex → hf sheetId(按名解析,避免数字名重排坑)
  constructor(e, t) {
    C(this, "hf", null);
    C(this, "sheetIds", []);
    this.HF = e, this.DCE = t;
  }
  setSheets(e) {
    const t = {}, n = [];
    for (let s = 0; s < e.sheets.length; s++) {
      const i = e.sheets[s];
      let r = i.name || `Sheet${s + 1}`;
      for (; n.includes(r); ) r += "_";
      n.push(r);
      const l = Math.max(i.dimension.rows, 1), a = Math.max(i.dimension.cols, 1), c = [];
      for (let d = 0; d < l; d++) c.push(new Array(a).fill(null));
      for (const d of i.cells.values())
        d.row < l && d.col < a && (c[d.row][d.col] = ul(d));
      t[r] = c;
    }
    this.hf = this.HF.buildFromSheets(t, { licenseKey: "gpl-v3" }), this.sheetIds = n.map((s) => {
      var i;
      return (i = this.hf.getSheetId(s)) != null ? i : 0;
    });
  }
  setCell(e, t, n, s) {
    var c;
    if (!this.hf) return [];
    const i = (c = this.sheetIds[e]) != null ? c : e, r = this.hf.setCellContents({ sheet: i, row: t, col: n }, s), l = (d) => {
      const h = this.sheetIds.indexOf(d);
      return h >= 0 ? h : d;
    }, a = [];
    for (const d of r)
      "address" in d && a.push({
        sheet: l(d.address.sheet),
        row: d.address.row,
        col: d.address.col,
        value: this.mapValue(d.newValue)
      });
    return a;
  }
  getValue(e, t, n) {
    var i;
    if (!this.hf) return null;
    const s = (i = this.sheetIds[e]) != null ? i : e;
    return this.mapValue(this.hf.getCellValue({ sheet: s, row: t, col: n }));
  }
  destroy() {
    var e;
    (e = this.hf) == null || e.destroy(), this.hf = null;
  }
  /** HF 值 → 模型 CellValue:错误对象 → 错误串(如 #DIV/0!);空 → null。 */
  mapValue(e) {
    return e instanceof this.DCE ? e.value : typeof e == "number" || typeof e == "string" || typeof e == "boolean" ? e : null;
  }
}
const yb = async () => {
  var n;
  const o = await import("./index-gsLKcr47.js"), e = (n = o.HyperFormula) != null ? n : o.default, t = o.DetailedCellError;
  return new Km(e, t);
};
function xb(o) {
  return o;
}
export {
  er as $,
  pb as A,
  au as B,
  il as C,
  Ht as D,
  Hh as E,
  un as F,
  qe as G,
  fb as H,
  ul as I,
  ss as J,
  bb as K,
  O as L,
  db as M,
  Bt as N,
  Tg as O,
  mb as P,
  se as Q,
  ee as R,
  yb as S,
  xb as T,
  rh as U,
  gb as V,
  Pm as W,
  pi as X,
  rl as Y,
  lt as Z,
  ht as _,
  ob as a,
  is as a0,
  Ed as a1,
  Md as a2,
  Su as a3,
  ih as a4,
  sh as a5,
  Uo as a6,
  Sh as a7,
  Eh as a8,
  Th as a9,
  Zm as aA,
  Qo as aa,
  qo as ab,
  Bd as ac,
  Qm as ad,
  Dp as ae,
  jc as af,
  Od as ag,
  Vo as ah,
  Lt as ai,
  ti as aj,
  At as ak,
  ub as al,
  gi as am,
  Fh as an,
  _e as ao,
  Nd as ap,
  fo as aq,
  hb as ar,
  Pd as as,
  Ah as at,
  $i as au,
  Jg as av,
  Zg as aw,
  Nm as ax,
  Lm as ay,
  Xu as az,
  cb as b,
  Td as c,
  nb as d,
  lb as e,
  eb as f,
  rb as g,
  me as h,
  We as i,
  Xe as j,
  ab as k,
  Vc as l,
  ib as m,
  sb as n,
  Bu as o,
  zd as p,
  Yo as q,
  tb as r,
  $d as s,
  al as t,
  Wo as u,
  Mi as v,
  xn as w,
  he as x,
  ru as y,
  Pp as z
};
