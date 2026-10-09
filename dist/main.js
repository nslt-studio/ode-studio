//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
};
//#endregion
//#region node_modules/gsap/gsap-core.js
function n(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function r(e, t) {
	e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
var i = {
	autoSleep: 120,
	force3D: "auto",
	nullTargetWarn: 1,
	units: { lineHeight: "" }
}, a = {
	duration: .5,
	overwrite: !1,
	delay: 0
}, o, s, c, l = 1e8, u = 1 / l, d = Math.PI * 2, f = d / 4, p = 0, m = Math.sqrt, h = Math.cos, g = Math.sin, _ = function(e) {
	return typeof e == "string";
}, v = function(e) {
	return typeof e == "function";
}, y = function(e) {
	return typeof e == "number";
}, b = function(e) {
	return e === void 0;
}, x = function(e) {
	return typeof e == "object";
}, S = function(e) {
	return e !== !1;
}, C = function() {
	return typeof window < "u";
}, w = function(e) {
	return v(e) || _(e);
}, T = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {}, E = Array.isArray, D = /random\([^)]+\)/g, O = /,\s*/g, k = /(?:-?\.?\d|\.)+/gi, A = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, j = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, M = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, N = /[+-]=-?[.\d]+/, P = /[^,'"\[\]\s]+/gi, ee = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, F, I, L, R, z = {}, B = {}, te, ne = function(e) {
	return (B = De(e, z)) && Gn;
}, V = function(e, t) {
	return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, re = function(e, t) {
	return !t && console.warn(e);
}, H = function(e, t) {
	return e && (z[e] = t) && B && (B[e] = t) || z;
}, ie = function() {
	return 0;
}, ae = {
	suppressEvents: !0,
	isStart: !0,
	kill: !1
}, oe = {
	suppressEvents: !0,
	kill: !1
}, se = { suppressEvents: !0 }, U = {}, ce = [], le = {}, ue, de = {}, fe = {}, pe = 30, me = [], he = "", ge = function(e) {
	var t = e[0], n, r;
	if (x(t) || v(t) || (e = [e]), !(n = (t._gsap || {}).harness)) {
		for (r = me.length; r-- && !me[r].targetTest(t););
		n = me[r];
	}
	for (r = e.length; r--;) e[r] && (e[r]._gsap || (e[r]._gsap = new en(e[r], n))) || e.splice(r, 1);
	return e;
}, _e = function(e) {
	return e._gsap || ge(ut(e))[0]._gsap;
}, W = function(e, t, n) {
	return (n = e[t]) && v(n) ? e[t]() : b(n) && e.getAttribute && e.getAttribute(t) || n;
}, G = function(e, t) {
	return (e = e.split(",")).forEach(t) || e;
}, K = function(e) {
	return Math.round(e * 1e5) / 1e5 || 0;
}, q = function(e) {
	return Math.round(e * 1e7) / 1e7 || 0;
}, ve = function(e, t) {
	var n = t.charAt(0), r = parseFloat(t.substr(2));
	return e = parseFloat(e), n === "+" ? e + r : n === "-" ? e - r : n === "*" ? e * r : e / r;
}, ye = function(e, t) {
	for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n;);
	return r < n;
}, be = function() {
	var e = ce.length, t = ce.slice(0), n, r;
	for (le = {}, ce.length = 0, n = 0; n < e; n++) r = t[n], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, xe = function(e) {
	return !!(e._initted || e._startAt || e.add);
}, Se = function(e, t, n, r) {
	ce.length && !s && be(), e.render(t, n, r || !!(s && t < 0 && xe(e))), ce.length && !s && be();
}, Ce = function(e) {
	var t = parseFloat(e);
	return (t || t === 0) && (e + "").match(P).length < 2 ? t : _(e) ? e.trim() : e;
}, we = function(e) {
	return e;
}, Te = function(e, t) {
	for (var n in t) n in e || (e[n] = t[n]);
	return e;
}, Ee = function(e) {
	return function(t, n) {
		for (var r in n) r in t || r === "duration" && e || r === "ease" || (t[r] = n[r]);
	};
}, De = function(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}, Oe = function e(t, n) {
	for (var r in n) r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = x(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]);
	return t;
}, ke = function(e, t) {
	var n = {}, r;
	for (r in e) r in t || (n[r] = e[r]);
	return n;
}, Ae = function(e) {
	var t = e.parent || F, n = e.keyframes ? Ee(E(e.keyframes)) : Te;
	if (S(e.inherit)) for (; t;) n(e, t.vars.defaults), t = t.parent || t._dp;
	return e;
}, je = function(e, t) {
	for (var n = e.length, r = n === t.length; r && n-- && e[n] === t[n];);
	return n < 0;
}, Me = function(e, t, n, r, i) {
	n === void 0 && (n = "_first"), r === void 0 && (r = "_last");
	var a = e[r], o;
	if (i) for (o = t[i]; a && a[i] > o;) a = a._prev;
	return a ? (t._next = a._next, a._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[r] = t, t._prev = a, t.parent = t._dp = e, t;
}, Ne = function(e, t, n, r) {
	n === void 0 && (n = "_first"), r === void 0 && (r = "_last");
	var i = t._prev, a = t._next;
	i ? i._next = a : e[n] === t && (e[n] = a), a ? a._prev = i : e[r] === t && (e[r] = i), t._next = t._prev = t.parent = null;
}, Pe = function(e, t) {
	e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Fe = function(e, t) {
	if (e && (!t || t._end > e._dur || t._start < 0)) for (var n = e; n;) n._dirty = 1, n = n.parent;
	return e;
}, Ie = function(e) {
	for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
	return e;
}, Le = function(e, t, n, r) {
	return e._startAt && (s ? e._startAt.revert(oe) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r));
}, Re = function e(t) {
	return !t || t._ts && e(t.parent);
}, ze = function(e) {
	return e._repeat ? Be(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Be = function(e, t) {
	var n = Math.floor(e = q(e / t));
	return e && n === e ? n - 1 : n;
}, Ve = function(e, t) {
	return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, He = function(e) {
	return e._end = q(e._start + (e._tDur / Math.abs(e._ts || e._rts || u) || 0));
}, Ue = function(e, t) {
	var n = e._dp;
	return n && n.smoothChildTiming && e._ts && (e._start = q(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), He(e), n._dirty || Fe(n, e)), e;
}, We = function(e, t) {
	var n;
	if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = Ve(e.rawTime(), t), (!t._dur || it(0, t.totalDuration(), n) - t._tTime > u) && t.render(n, !0)), Fe(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
		if (e._dur < e.duration()) for (n = e; n._dp;) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
		e._zTime = -u;
	}
}, Ge = function(e, t, n, r) {
	return t.parent && Pe(t), t._start = q((y(n) ? n : n || e !== F ? tt(e, n, t) : e._time) + t._delay), t._end = q(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Me(e, t, "_first", "_last", e._sort ? "_start" : 0), Ye(t) || (e._recent = t), r || We(e, t), e._ts < 0 && Ue(e, e._tTime), e;
}, Ke = function(e, t) {
	return (z.ScrollTrigger || V("scrollTrigger", t)) && z.ScrollTrigger.create(t, e);
}, qe = function(e, t, n, r, i) {
	if (un(e, t, i), !e._initted) return 1;
	if (!n && e._pt && !s && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && ue !== Vt.frame) return ce.push(e), e._lazy = [i, r], 1;
}, Je = function e(t) {
	var n = t.parent;
	return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n));
}, Ye = function(e) {
	var t = e.data;
	return t === "isFromStart" || t === "isStart";
}, Xe = function(e, t, n, r) {
	var i = e.ratio, a = t < 0 || !t && (!e._start && Je(e) && (e._initted || !Ye(e)) || (e._ts < 0 || e._dp._ts < 0) && !Ye(e)) ? 0 : 1, o = e._rDelay, c = 0, l, d, f;
	if (o && e._repeat && (c = it(0, e._tDur, t), d = Be(c, o), e._yoyo && d & 1 && (a = 1 - a), d !== Be(e._tTime, o) && (i = 1 - a, e.vars.repeatRefresh && e._initted && e.invalidate())), a !== i || s || r || e._zTime === u || !t && e._zTime) {
		if (!e._initted && qe(e, t, r, n, c)) return;
		for (f = e._zTime, e._zTime = t || (n ? u : 0), n ||= t && !f, e.ratio = a, e._from && (a = 1 - a), e._time = 0, e._tTime = c, l = e._pt; l;) l.r(a, l.d), l = l._next;
		t < 0 && Le(e, t, n, !0), e._onUpdate && !n && Dt(e, "onUpdate"), c && e._repeat && !n && e.parent && Dt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === a && (a && Pe(e, 1), !n && !s && (Dt(e, a ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
	} else e._zTime ||= t;
}, Ze = function(e, t, n) {
	var r;
	if (n > t) for (r = e._first; r && r._start <= n;) {
		if (r.data === "isPause" && r._start > t) return r;
		r = r._next;
	}
	else for (r = e._last; r && r._start >= n;) {
		if (r.data === "isPause" && r._start < t) return r;
		r = r._prev;
	}
}, Qe = function(e, t, n, r) {
	var i = e._repeat, a = q(t) || 0, o = e._tTime / e._tDur;
	return o && !r && (e._time *= a / e._dur), e._dur = a, e._tDur = i ? i < 0 ? 1e10 : q(a * (i + 1) + e._rDelay * i) : a, o > 0 && !r && Ue(e, e._tTime = e._tDur * o), e.parent && He(e), n || Fe(e.parent, e), e;
}, $e = function(e) {
	return e instanceof nn ? Fe(e) : Qe(e, e._dur);
}, et = {
	_start: 0,
	endTime: ie,
	totalDuration: ie
}, tt = function e(t, n, r) {
	var i = t.labels, a = t._recent || et, o = t.duration() >= l ? a.endTime(!1) : t._dur, s, c, u;
	return _(n) && (isNaN(n) || n in i) ? (c = n.charAt(0), u = n.substr(-1) === "%", s = n.indexOf("="), c === "<" || c === ">" ? (s >= 0 && (n = n.replace(/=/, "")), (c === "<" ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (u ? (s < 0 ? a : r).totalDuration() / 100 : 1)) : s < 0 ? (n in i || (i[n] = o), i[n]) : (c = parseFloat(n.charAt(s - 1) + n.substr(s + 1)), u && r && (c = c / 100 * (E(r) ? r[0] : r).totalDuration()), s > 1 ? e(t, n.substr(0, s - 1), r) + c : o + c)) : n == null ? o : +n;
}, nt = function(e, t, n) {
	var r = y(t[1]), i = (r ? 2 : 1) + (e < 2 ? 0 : 1), a = t[i], o, s;
	if (r && (a.duration = t[1]), a.parent = n, e) {
		for (o = a, s = n; s && !("immediateRender" in o);) o = s.vars.defaults || {}, s = S(s.vars.inherit) && s.parent;
		a.immediateRender = S(o.immediateRender), e < 2 ? a.runBackwards = 1 : a.startAt = t[i - 1];
	}
	return new _n(t[0], a, t[i + 1]);
}, rt = function(e, t) {
	return e || e === 0 ? t(e) : t;
}, it = function(e, t, n) {
	return n < e ? e : n > t ? t : n;
}, at = function(e, t) {
	return !_(e) || !(t = ee.exec(e)) ? "" : t[1];
}, ot = function(e, t, n) {
	return rt(n, function(n) {
		return it(e, t, n);
	});
}, st = [].slice, ct = function(e, t) {
	return e && x(e) && "length" in e && (!t && !e.length || e.length - 1 in e && x(e[0])) && !e.nodeType && e !== I;
}, lt = function(e, t, n) {
	return n === void 0 && (n = []), e.forEach(function(e) {
		var r;
		return _(e) && !t || ct(e, 1) ? (r = n).push.apply(r, ut(e)) : n.push(e);
	}) || n;
}, ut = function(e, t, n) {
	return c && !t && c.selector ? c.selector(e) : _(e) && !n && (L || !Ht()) ? st.call((t || R).querySelectorAll(e), 0) : E(e) ? lt(e, n) : ct(e) ? st.call(e, 0) : e ? [e] : [];
}, dt = function(e) {
	return e = ut(e)[0] || re("Invalid scope") || {}, function(t) {
		var n = e.current || e.nativeElement || e;
		return ut(t, n.querySelectorAll ? n : n === e ? re("Invalid scope") || R.createElement("div") : e);
	};
}, ft = function(e) {
	return e.sort(function() {
		return .5 - Math.random();
	});
}, pt = function(e) {
	if (v(e)) return e;
	var t = x(e) ? e : { each: e }, n = Yt(t.ease), r = t.from || 0, i = parseFloat(t.base) || 0, a = {}, o = r > 0 && r < 1, s = isNaN(r) || o, c = t.axis, u = r, d = r;
	return _(r) ? u = d = {
		center: .5,
		edges: .5,
		end: 1
	}[r] || 0 : !o && s && (u = r[0], d = r[1]), function(e, o, f) {
		var p = (f || t).length, h = a[p], g, _, v, y, b, x, S, C, w;
		if (!h) {
			if (w = t.grid === "auto" ? 0 : (t.grid || [1, l])[1], !w) {
				for (S = -l; S < (S = f[w++].getBoundingClientRect().left) && w < p;);
				w < p && w--;
			}
			for (h = a[p] = [], g = s ? Math.min(w, p) * u - .5 : r % w, _ = w === l ? 0 : s ? p * d / w - .5 : r / w | 0, S = 0, C = l, x = 0; x < p; x++) v = x % w - g, y = _ - (x / w | 0), h[x] = b = c ? Math.abs(c === "y" ? y : v) : m(v * v + y * y), b > S && (S = b), b < C && (C = b);
			r === "random" && ft(h), h.max = S - C, h.min = C, h.v = p = (parseFloat(t.amount) || parseFloat(t.each) * (w > p ? p - 1 : c ? c === "y" ? p / w : w : Math.max(w, p / w)) || 0) * (r === "edges" ? -1 : 1), h.b = p < 0 ? i - p : i, h.u = at(t.amount || t.each) || 0, n = n && p < 0 ? Jt(n) : n;
		}
		return p = (h[e] - h.min) / h.max || 0, q(h.b + (n ? n(p) : p) * h.v) + h.u;
	};
}, mt = function(e) {
	var t = 10 ** ((e + "").split(".")[1] || "").length;
	return function(n) {
		var r = q(Math.round(parseFloat(n) / e) * e * t);
		return (r - r % 1) / t + (y(n) ? 0 : at(n));
	};
}, ht = function(e, t) {
	var n = E(e), r, i;
	return !n && x(e) && (r = n = e.radius || l, e.values ? (e = ut(e.values), (i = !y(e[0])) && (r *= r)) : e = mt(e.increment)), rt(t, n ? v(e) ? function(t) {
		return i = e(t), Math.abs(i - t) <= r ? i : t;
	} : function(t) {
		for (var n = parseFloat(i ? t.x : t), a = parseFloat(i ? t.y : 0), o = l, s = 0, c = e.length, u, d; c--;) i ? (u = e[c].x - n, d = e[c].y - a, u = u * u + d * d) : u = Math.abs(e[c] - n), u < o && (o = u, s = c);
		return s = !r || o <= r ? e[s] : t, i || s === t || y(t) ? s : s + at(t);
	} : mt(e));
}, gt = function(e, t, n, r) {
	return rt(E(e) ? !t : n === !0 ? !!(n = 0) : !r, function() {
		return E(e) ? e[~~(Math.random() * e.length)] : (n ||= 1e-5) && (r = n < 1 ? 10 ** ((n + "").length - 2) : 1) && Math.floor(Math.round((e - n / 2 + Math.random() * (t - e + n * .99)) / n) * n * r) / r;
	});
}, _t = function() {
	var e = [...arguments];
	return function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}, vt = function(e, t) {
	return function(n) {
		return e(parseFloat(n)) + (t || at(n));
	};
}, yt = function(e, t, n) {
	return wt(e, t, 0, 1, n);
}, bt = function(e, t, n) {
	return rt(n, function(n) {
		return e[~~t(n)];
	});
}, xt = function e(t, n, r) {
	var i = n - t;
	return E(t) ? bt(t, e(0, t.length), n) : rt(r, function(e) {
		return (i + (e - t) % i) % i + t;
	});
}, St = function e(t, n, r) {
	var i = n - t, a = i * 2;
	return E(t) ? bt(t, e(0, t.length - 1), n) : rt(r, function(e) {
		return e = (a + (e - t) % a) % a || 0, t + (e > i ? a - e : e);
	});
}, Ct = function(e) {
	return e.replace(D, function(e) {
		var t = e.indexOf("[") + 1, n = e.substring(t || 7, t ? e.indexOf("]") : e.length - 1).split(O);
		return gt(t ? n : +n[0], t ? 0 : +n[1], +n[2] || 1e-5);
	});
}, wt = function(e, t, n, r, i) {
	var a = t - e, o = r - n;
	return rt(i, function(t) {
		return n + ((t - e) / a * o || 0);
	});
}, Tt = function e(t, n, r, i) {
	var a = isNaN(t + n) ? 0 : function(e) {
		return (1 - e) * t + e * n;
	};
	if (!a) {
		var o = _(t), s = {}, c, l, u, d, f;
		if (r === !0 && (i = 1) && (r = null), o) t = { p: t }, n = { p: n };
		else if (E(t) && !E(n)) {
			for (u = [], d = t.length, f = d - 2, l = 1; l < d; l++) u.push(e(t[l - 1], t[l]));
			d--, a = function(e) {
				e *= d;
				var t = Math.min(f, ~~e);
				return u[t](e - t);
			}, r = n;
		} else i || (t = De(E(t) ? [] : {}, t));
		if (!u) {
			for (c in n) an.call(s, t, c, "get", n[c]);
			a = function(e) {
				return En(e, s) || (o ? t.p : t);
			};
		}
	}
	return rt(r, a);
}, Et = function(e, t, n) {
	var r = e.labels, i = l, a, o, s;
	for (a in r) o = r[a] - t, o < 0 == !!n && o && i > (o = Math.abs(o)) && (s = a, i = o);
	return s;
}, Dt = function(e, t, n) {
	var r = e.vars, i = r[t], a = c, o = e._ctx, s, l, u;
	if (i) return s = r[t + "Params"], l = r.callbackScope || e, n && ce.length && be(), o && (c = o), u = s ? i.apply(l, s) : i.call(l), c = a, u;
}, Ot = function(e) {
	return Pe(e), e.scrollTrigger && e.scrollTrigger.kill(!!s), e.progress() < 1 && Dt(e, "onInterrupt"), e;
}, kt, At = [], jt = function(e) {
	if (e) {
		if (e = !e.name && e.default || e, C() || e.headless) {
			var t = e.name, n = v(e), r = t && !n && e.init ? function() {
				this._props = [];
			} : e, i = {
				init: ie,
				render: En,
				add: an,
				kill: On,
				modifier: Dn,
				rawVars: 0
			}, a = {
				targetTest: 0,
				get: 0,
				getSetter: Sn,
				aliases: {},
				register: 0
			};
			if (Ht(), e !== r) {
				if (de[t]) return;
				Te(r, Te(ke(e, i), a)), De(r.prototype, De(i, ke(e, a))), de[r.prop = t] = r, e.targetTest && (me.push(r), U[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
			}
			H(t, r), e.register && e.register(Gn, r, jn);
		} else At.push(e);
	}
}, J = 255, Mt = {
	aqua: [
		0,
		J,
		J
	],
	lime: [
		0,
		J,
		0
	],
	silver: [
		192,
		192,
		192
	],
	black: [
		0,
		0,
		0
	],
	maroon: [
		128,
		0,
		0
	],
	teal: [
		0,
		128,
		128
	],
	blue: [
		0,
		0,
		J
	],
	navy: [
		0,
		0,
		128
	],
	white: [
		J,
		J,
		J
	],
	olive: [
		128,
		128,
		0
	],
	yellow: [
		J,
		J,
		0
	],
	orange: [
		J,
		165,
		0
	],
	gray: [
		128,
		128,
		128
	],
	purple: [
		128,
		0,
		128
	],
	green: [
		0,
		128,
		0
	],
	red: [
		J,
		0,
		0
	],
	pink: [
		J,
		192,
		203
	],
	cyan: [
		0,
		J,
		J
	],
	transparent: [
		J,
		J,
		J,
		0
	]
}, Nt = function(e, t, n) {
	return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * J + .5 | 0;
}, Pt = function(e, t, n) {
	var r = e ? y(e) ? [
		e >> 16,
		e >> 8 & J,
		e & J
	] : 0 : Mt.black, i, a, o, s, c, l, u, d, f, p;
	if (!r) {
		if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Mt[e]) r = Mt[e];
		else if (e.charAt(0) === "#") {
			if (e.length < 6 && (i = e.charAt(1), a = e.charAt(2), o = e.charAt(3), e = "#" + i + i + a + a + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9) return r = parseInt(e.substr(1, 6), 16), [
				r >> 16,
				r >> 8 & J,
				r & J,
				parseInt(e.substr(7), 16) / 255
			];
			e = parseInt(e.substr(1), 16), r = [
				e >> 16,
				e >> 8 & J,
				e & J
			];
		} else if (e.substr(0, 3) === "hsl") {
			if (r = p = e.match(k), !t) s = r[0] % 360 / 360, c = r[1] / 100, l = r[2] / 100, a = l <= .5 ? l * (c + 1) : l + c - l * c, i = l * 2 - a, r.length > 3 && (r[3] *= 1), r[0] = Nt(s + 1 / 3, i, a), r[1] = Nt(s, i, a), r[2] = Nt(s - 1 / 3, i, a);
			else if (~e.indexOf("=")) return r = e.match(A), n && r.length < 4 && (r[3] = 1), r;
		} else r = e.match(k) || Mt.transparent;
		r = r.map(Number);
	}
	return t && !p && (i = r[0] / J, a = r[1] / J, o = r[2] / J, u = Math.max(i, a, o), d = Math.min(i, a, o), l = (u + d) / 2, u === d ? s = c = 0 : (f = u - d, c = l > .5 ? f / (2 - u - d) : f / (u + d), s = u === i ? (a - o) / f + (a < o ? 6 : 0) : u === a ? (o - i) / f + 2 : (i - a) / f + 4, s *= 60), r[0] = ~~(s + .5), r[1] = ~~(c * 100 + .5), r[2] = ~~(l * 100 + .5)), n && r.length < 4 && (r[3] = 1), r;
}, Ft = function(e) {
	var t = [], n = [], r = -1;
	return e.split(Lt).forEach(function(e) {
		var i = e.match(j) || [];
		t.push.apply(t, i), n.push(r += i.length + 1);
	}), t.c = n, t;
}, It = function(e, t, n) {
	var r = "", i = (e + r).match(Lt), a = t ? "hsla(" : "rgba(", o = 0, s, c, l, u;
	if (!i) return e;
	if (i = i.map(function(e) {
		return (e = Pt(e, t, 1)) && a + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")";
	}), n && (l = Ft(e), s = n.c, s.join(r) !== l.c.join(r))) for (c = e.replace(Lt, "1").split(j), u = c.length - 1; o < u; o++) r += c[o] + (~s.indexOf(o) ? i.shift() || a + "0,0,0,0)" : (l.length ? l : i.length ? i : n).shift());
	if (!c) for (c = e.split(Lt), u = c.length - 1; o < u; o++) r += c[o] + i[o];
	return r + c[u];
}, Lt = function() {
	var e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
	for (t in Mt) e += "|" + t + "\\b";
	return RegExp(e + ")", "gi");
}(), Rt = /hsl[a]?\(/, zt = function(e) {
	var t = e.join(" "), n;
	if (Lt.lastIndex = 0, Lt.test(t)) return n = Rt.test(t), e[1] = It(e[1], n), e[0] = It(e[0], n, Ft(e[1])), !0;
}, Bt, Vt = function() {
	var e = Date.now, t = 500, n = 33, r = e(), i = r, a = 1e3 / 240, o = a, s = [], c, l, u, d, f, p, m = function u(m) {
		var h = e() - i, g = m === !0, _, v, y, b;
		if ((h > t || h < 0) && (r += h - n), i += h, y = i - r, _ = y - o, (_ > 0 || g) && (b = ++d.frame, f = y - d.time * 1e3, d.time = y /= 1e3, o += _ + (_ >= a ? 4 : a - _), v = 1), g || (c = l(u)), v) for (p = 0; p < s.length; p++) s[p](y, f, b, m);
	};
	return d = {
		time: 0,
		frame: 0,
		tick: function() {
			m(!0);
		},
		deltaRatio: function(e) {
			return f / (1e3 / (e || 60));
		},
		wake: function() {
			te && (!L && C() && (I = L = window, R = I.document || {}, z.gsap = Gn, (I.gsapVersions || (I.gsapVersions = [])).push(Gn.version), ne(B || I.GreenSockGlobals || !I.gsap && I || {}), At.forEach(jt)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && d.sleep(), l = u || function(e) {
				return setTimeout(e, o - d.time * 1e3 + 1 | 0);
			}, Bt = 1, m(2));
		},
		sleep: function() {
			(u ? cancelAnimationFrame : clearTimeout)(c), Bt = 0, l = ie;
		},
		lagSmoothing: function(e, r) {
			t = e || Infinity, n = Math.min(r || 33, t);
		},
		fps: function(e) {
			a = 1e3 / (e || 240), o = d.time * 1e3 + a;
		},
		add: function(e, t, n) {
			var r = t ? function(t, n, i, a) {
				e(t, n, i, a), d.remove(r);
			} : e;
			return d.remove(e), s[n ? "unshift" : "push"](r), Ht(), r;
		},
		remove: function(e, t) {
			~(t = s.indexOf(e)) && s.splice(t, 1) && p >= t && p--;
		},
		_listeners: s
	}, d;
}(), Ht = function() {
	return !Bt && Vt.wake();
}, Y = {}, Ut = /^[\d.\-M][\d.\-,\s]/, Wt = /["']/g, Gt = function(e) {
	for (var t = {}, n = e.substr(1, e.length - 3).split(":"), r = n[0], i = 1, a = n.length, o, s, c; i < a; i++) s = n[i], o = i === a - 1 ? s.length : s.lastIndexOf(","), c = s.substr(0, o), t[r] = isNaN(c) ? c.replace(Wt, "").trim() : +c, r = s.substr(o + 1).trim();
	return t;
}, Kt = function(e) {
	var t = e.indexOf("(") + 1, n = e.indexOf(")"), r = e.indexOf("(", t);
	return e.substring(t, ~r && r < n ? e.indexOf(")", n + 1) : n);
}, qt = function(e) {
	var t = (e + "").split("("), n = Y[t[0]];
	return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf("{") ? [Gt(t[1])] : Kt(e).split(",").map(Ce)) : Y._CE && Ut.test(e) ? Y._CE("", e) : n;
}, Jt = function(e) {
	return function(t) {
		return 1 - e(1 - t);
	};
}, Yt = function(e, t) {
	return e && (v(e) ? e : Y[e] || qt(e)) || t;
}, Xt = function(e, t, n, r) {
	n === void 0 && (n = function(e) {
		return 1 - t(1 - e);
	}), r === void 0 && (r = function(e) {
		return e < .5 ? t(e * 2) / 2 : 1 - t((1 - e) * 2) / 2;
	});
	var i = {
		easeIn: t,
		easeOut: n,
		easeInOut: r
	}, a;
	return G(e, function(e) {
		for (var t in Y[e] = z[e] = i, Y[a = e.toLowerCase()] = n, i) Y[a + (t === "easeIn" ? ".in" : t === "easeOut" ? ".out" : ".inOut")] = Y[e + "." + t] = i[t];
	}), i;
}, Zt = function(e) {
	return function(t) {
		return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2;
	};
}, Qt = function e(t, n, r) {
	var i = n >= 1 ? n : 1, a = (r || (t ? .3 : .45)) / (n < 1 ? n : 1), o = a / d * (Math.asin(1 / i) || 0), s = function(e) {
		return e === 1 ? 1 : i * 2 ** (-10 * e) * g((e - o) * a) + 1;
	}, c = t === "out" ? s : t === "in" ? function(e) {
		return 1 - s(1 - e);
	} : Zt(s);
	return a = d / a, c.config = function(n, r) {
		return e(t, n, r);
	}, c;
}, $t = function e(t, n) {
	n === void 0 && (n = 1.70158);
	var r = function(e) {
		return e ? --e * e * ((n + 1) * e + n) + 1 : 0;
	}, i = t === "out" ? r : t === "in" ? function(e) {
		return 1 - r(1 - e);
	} : Zt(r);
	return i.config = function(n) {
		return e(t, n);
	}, i;
};
G("Linear,Quad,Cubic,Quart,Quint,Strong", function(e, t) {
	var n = t < 5 ? t + 1 : t;
	Xt(e + ",Power" + (n - 1), t ? function(e) {
		return e ** +n;
	} : function(e) {
		return e;
	}, function(e) {
		return 1 - (1 - e) ** n;
	}, function(e) {
		return e < .5 ? (e * 2) ** n / 2 : 1 - ((1 - e) * 2) ** n / 2;
	});
}), Y.Linear.easeNone = Y.none = Y.Linear.easeIn, Xt("Elastic", Qt("in"), Qt("out"), Qt()), (function(e, t) {
	var n = 1 / t, r = 2 * n, i = 2.5 * n, a = function(a) {
		return a < n ? e * a * a : a < r ? e * (a - 1.5 / t) ** 2 + .75 : a < i ? e * (a -= 2.25 / t) * a + .9375 : e * (a - 2.625 / t) ** 2 + .984375;
	};
	Xt("Bounce", function(e) {
		return 1 - a(1 - e);
	}, a);
})(7.5625, 2.75), Xt("Expo", function(e) {
	return 2 ** (10 * (e - 1)) * e + e * e * e * e * e * e * (1 - e);
}), Xt("Circ", function(e) {
	return -(m(1 - e * e) - 1);
}), Xt("Sine", function(e) {
	return e === 1 ? 1 : -h(e * f) + 1;
}), Xt("Back", $t("in"), $t("out"), $t()), Y.SteppedEase = Y.steps = z.SteppedEase = { config: function(e, t) {
	e === void 0 && (e = 1);
	var n = 1 / e, r = e + +!t, i = +!!t, a = 1 - u;
	return function(e) {
		return ((r * it(0, a, e) | 0) + i) * n;
	};
} }, a.ease = Y["quad.out"], G("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(e) {
	return he += e + "," + e + "Params,";
});
var en = function(e, t) {
	this.id = p++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : W, this.set = t ? t.getSetter : Sn;
}, tn = /*#__PURE__*/ function() {
	function e(e) {
		this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === Infinity ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Qe(this, +e.duration, 1, 1), this.data = e.data, c && (this._ctx = c, c.data.push(this)), Bt || Vt.wake();
	}
	var t = e.prototype;
	return t.delay = function(e) {
		return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
	}, t.duration = function(e) {
		return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
	}, t.totalDuration = function(e) {
		return arguments.length ? (this._dirty = 0, Qe(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
	}, t.totalTime = function(e, t) {
		if (Ht(), !arguments.length) return this._tTime;
		var n = this._dp;
		if (n && n.smoothChildTiming && this._ts) {
			for (Ue(this, e), !n._dp || n.parent || We(n, this); n && n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
			!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Ge(this._dp, this, this._start - this._delay);
		}
		return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === u || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), Se(this, e, t)), this;
	}, t.time = function(e, t) {
		return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + ze(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time;
	}, t.totalProgress = function(e, t) {
		return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
	}, t.progress = function(e, t) {
		return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + ze(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : +(this.rawTime() > 0);
	}, t.iteration = function(e, t) {
		var n = this.duration() + this._rDelay;
		return arguments.length ? this.totalTime(this._time + (e - 1) * n, t) : this._repeat ? Be(this._tTime, n) + 1 : 1;
	}, t.timeScale = function(e, t) {
		if (!arguments.length) return this._rts === -u ? 0 : this._rts;
		if (this._rts === e) return this;
		var n = this.parent && this._ts ? Ve(this.parent._time, this) : this._tTime;
		return this._rts = +e || 0, this._ts = this._ps || e === -u ? 0 : this._rts, this.totalTime(it(-Math.abs(this._delay), this.totalDuration(), n), t !== !1), He(this), Ie(this);
	}, t.paused = function(e) {
		return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ht(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== u && (this._tTime -= u)))), this) : this._ps;
	}, t.startTime = function(e) {
		if (arguments.length) {
			this._start = q(e);
			var t = this.parent || this._dp;
			return t && (t._sort || !this.parent) && Ge(t, this, this._start - this._delay), this;
		}
		return this._start;
	}, t.endTime = function(e) {
		return this._start + (S(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
	}, t.rawTime = function(e) {
		var t = this.parent || this._dp;
		return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ve(t.rawTime(e), this) : this._tTime : this._tTime;
	}, t.revert = function(e) {
		e === void 0 && (e = se);
		var t = s;
		return s = e, xe(this) && (this.timeline && this.timeline.revert(e), this.totalTime(-.01, e.suppressEvents)), this.data !== "nested" && e.kill !== !1 && this.kill(), s = t, this;
	}, t.globalTime = function(e) {
		for (var t = this, n = arguments.length ? e : t.rawTime(); t;) n = t._start + n / (Math.abs(t._ts) || 1), t = t._dp;
		return !this.parent && this._sat ? this._sat.globalTime(e) : n;
	}, t.repeat = function(e) {
		return arguments.length ? (this._repeat = e === Infinity ? -2 : e, $e(this)) : this._repeat === -2 ? Infinity : this._repeat;
	}, t.repeatDelay = function(e) {
		if (arguments.length) {
			var t = this._time;
			return this._rDelay = e, $e(this), t ? this.time(t) : this;
		}
		return this._rDelay;
	}, t.yoyo = function(e) {
		return arguments.length ? (this._yoyo = e, this) : this._yoyo;
	}, t.seek = function(e, t) {
		return this.totalTime(tt(this, e), S(t));
	}, t.restart = function(e, t) {
		return this.play().totalTime(e ? -this._delay : 0, S(t)), this._dur || (this._zTime = -u), this;
	}, t.play = function(e, t) {
		return e != null && this.seek(e, t), this.reversed(!1).paused(!1);
	}, t.reverse = function(e, t) {
		return e != null && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1);
	}, t.pause = function(e, t) {
		return e != null && this.seek(e, t), this.paused(!0);
	}, t.resume = function() {
		return this.paused(!1);
	}, t.reversed = function(e) {
		return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -u : 0)), this) : this._rts < 0;
	}, t.invalidate = function() {
		return this._initted = this._act = 0, this._zTime = -u, this;
	}, t.isActive = function() {
		var e = this.parent || this._dp, t = this._start, n;
		return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= t && n < this.endTime(!0) - u);
	}, t.eventCallback = function(e, t, n) {
		var r = this.vars;
		return arguments.length > 1 ? (t ? (r[e] = t, n && (r[e + "Params"] = n), e === "onUpdate" && (this._onUpdate = t)) : delete r[e], this) : r[e];
	}, t.then = function(e) {
		var t = this, n = t._prom;
		return new Promise(function(r) {
			var i = v(e) ? e : we, a = function() {
				var e = t.then;
				t.then = null, n && n(), v(i) && (i = i(t)) && (i.then || i === t) && (t.then = e), r(i), t.then = e;
			};
			t._initted && t.totalProgress() === 1 && t._ts >= 0 || !t._tTime && t._ts < 0 ? a() : t._prom = a;
		});
	}, t.kill = function() {
		Ot(this);
	}, e;
}();
Te(tn.prototype, {
	_time: 0,
	_start: 0,
	_end: 0,
	_tTime: 0,
	_tDur: 0,
	_dirty: 0,
	_repeat: 0,
	_yoyo: !1,
	parent: null,
	_initted: !1,
	_rDelay: 0,
	_ts: 1,
	_dp: 0,
	ratio: 0,
	_zTime: -u,
	_prom: 0,
	_ps: !1,
	_rts: 1
});
var nn = /*#__PURE__*/ function(e) {
	r(t, e);
	function t(t, r) {
		var i;
		return t === void 0 && (t = {}), i = e.call(this, t) || this, i.labels = {}, i.smoothChildTiming = !!t.smoothChildTiming, i.autoRemoveChildren = !!t.autoRemoveChildren, i._sort = S(t.sortChildren), F && Ge(t.parent || F, n(i), r), t.reversed && i.reverse(), t.paused && i.paused(!0), t.scrollTrigger && Ke(n(i), t.scrollTrigger), i;
	}
	var a = t.prototype;
	return a.to = function(e, t, n) {
		return nt(0, arguments, this), this;
	}, a.from = function(e, t, n) {
		return nt(1, arguments, this), this;
	}, a.fromTo = function(e, t, n, r) {
		return nt(2, arguments, this), this;
	}, a.set = function(e, t, n) {
		return t.duration = 0, t.parent = this, Ae(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new _n(e, t, tt(this, n), 1), this;
	}, a.call = function(e, t, n) {
		return Ge(this, _n.delayedCall(0, e, t), n);
	}, a.staggerTo = function(e, t, n, r, i, a, o) {
		return n.duration = t, n.stagger = n.stagger || r, n.onComplete = a, n.onCompleteParams = o, n.parent = this, new _n(e, n, tt(this, i)), this;
	}, a.staggerFrom = function(e, t, n, r, i, a, o) {
		return n.runBackwards = 1, Ae(n).immediateRender = S(n.immediateRender), this.staggerTo(e, t, n, r, i, a, o);
	}, a.staggerFromTo = function(e, t, n, r, i, a, o, s) {
		return r.startAt = n, Ae(r).immediateRender = S(r.immediateRender), this.staggerTo(e, t, r, i, a, o, s);
	}, a.render = function(e, t, n) {
		var r = this._time, i = this._dirty ? this.totalDuration() : this._tDur, a = this._dur, o = e <= 0 ? 0 : q(e), c = this._zTime < 0 != e < 0 && (this._initted || !a), l, d, f, p, m, h, g, _, v, y, b, x;
		if (this !== F && o > i && e >= 0 && (o = i), o !== this._tTime || n || c) {
			if (r !== this._time && a && (o += this._time - r, e += this._time - r), l = o, v = this._start, _ = this._ts, h = !_, c && (a || (r = this._zTime), (e || !t) && (this._zTime = e)), this._repeat) {
				if (b = this._yoyo, m = a + this._rDelay, this._repeat < -1 && e < 0) return this.totalTime(m * 100 + e, t, n);
				if (l = q(o % m), o === i ? (p = this._repeat, l = a) : (y = q(o / m), p = ~~y, p && p === y && (l = a, p--), l > a && (l = a)), y = Be(this._tTime, m), !r && this._tTime && y !== p && this._tTime - y * m - this._dur <= 0 && (y = p), b && p & 1 && (l = a - l, x = 1), p !== y && !this._lock) {
					var S = b && y & 1, C = S === (b && p & 1);
					if (p < y && (S = !S), r = S ? 0 : o % a ? a : o, this._lock = 1, this.render(r || (x ? 0 : q(p * m)), t, !a)._lock = 0, this._tTime = o, !t && this.parent && Dt(this, "onRepeat"), this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1, y = p), r && r !== this._time || h !== !this._ts || this.vars.onRepeat && !this.parent && !this._act || (a = this._dur, i = this._tDur, C && (this._lock = 2, r = S ? a : -1e-4, this.render(r, !0), this.vars.repeatRefresh && !x && this.invalidate()), this._lock = 0, !this._ts && !h)) return this;
				}
			}
			if (this._hasPause && !this._forcing && this._lock < 2 && (g = Ze(this, q(r), q(l)), g && (o -= l - (l = g._start))), this._tTime = o, this._time = l, this._act = !!_, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e, r = 0), !r && o && a && !t && !y && (Dt(this, "onStart"), this._tTime !== o)) return this;
			if (l >= r && e >= 0) for (d = this._first; d;) {
				if (f = d._next, (d._act || l >= d._start) && d._ts && g !== d) {
					if (d.parent !== this) return this.render(e, t, n);
					if (d.render(d._ts > 0 ? (l - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (l - d._start) * d._ts, t, n), l !== this._time || !this._ts && !h) {
						g = 0, f && (o += this._zTime = -u);
						break;
					}
				}
				d = f;
			}
			else {
				d = this._last;
				for (var w = e < 0 ? e : l; d;) {
					if (f = d._prev, (d._act || w <= d._end) && d._ts && g !== d) {
						if (d.parent !== this) return this.render(e, t, n);
						if (d.render(d._ts > 0 ? (w - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (w - d._start) * d._ts, t, n || s && xe(d)), l !== this._time || !this._ts && !h) {
							g = 0, f && (o += this._zTime = w ? -u : u);
							break;
						}
					}
					d = f;
				}
			}
			if (g && !t && (this.pause(), g.render(l >= r ? 0 : -u)._zTime = l >= r ? 1 : -1, this._ts)) return this._start = v, He(this), this.render(e, t, n);
			this._onUpdate && !t && Dt(this, "onUpdate", !0), (o === i && this._tTime >= this.totalDuration() || !o && r) && (v === this._start || Math.abs(_) !== Math.abs(this._ts)) && (this._lock || ((e || !a) && (o === i && this._ts > 0 || !o && this._ts < 0) && Pe(this, 1), !t && !(e < 0 && !r) && (o || r || !i) && (Dt(this, o === i && e >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(o < i && this.timeScale() > 0) && this._prom())));
		}
		return this;
	}, a.add = function(e, t) {
		var n = this;
		if (y(t) || (t = tt(this, t, e)), !(e instanceof tn)) {
			if (E(e)) return e.forEach(function(e) {
				return n.add(e, t);
			}), this;
			if (_(e)) return this.addLabel(e, t);
			if (v(e)) e = _n.delayedCall(0, e);
			else return this;
		}
		return this === e ? this : Ge(this, e, t);
	}, a.getChildren = function(e, t, n, r) {
		e === void 0 && (e = !0), t === void 0 && (t = !0), n === void 0 && (n = !0), r === void 0 && (r = -l);
		for (var i = [], a = this._first; a;) a._start >= r && (a instanceof _n ? t && i.push(a) : (n && i.push(a), e && i.push.apply(i, a.getChildren(!0, t, n)))), a = a._next;
		return i;
	}, a.getById = function(e) {
		for (var t = this.getChildren(1, 1, 1), n = t.length; n--;) if (t[n].vars.id === e) return t[n];
	}, a.remove = function(e) {
		return _(e) ? this.removeLabel(e) : v(e) ? this.killTweensOf(e) : (e.parent === this && Ne(this, e), e === this._recent && (this._recent = this._last), Fe(this));
	}, a.totalTime = function(t, n) {
		return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = q(Vt.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), e.prototype.totalTime.call(this, t, n), this._forcing = 0, this) : this._tTime;
	}, a.addLabel = function(e, t) {
		return this.labels[e] = tt(this, t), this;
	}, a.removeLabel = function(e) {
		return delete this.labels[e], this;
	}, a.addPause = function(e, t, n) {
		var r = _n.delayedCall(0, t || ie, n);
		return r.data = "isPause", this._hasPause = 1, Ge(this, r, tt(this, e));
	}, a.removePause = function(e) {
		var t = this._first;
		for (e = tt(this, e); t;) t._start === e && t.data === "isPause" && Pe(t), t = t._next;
	}, a.killTweensOf = function(e, t, n) {
		for (var r = this.getTweensOf(e, n), i = r.length; i--;) cn !== r[i] && r[i].kill(e, t);
		return this;
	}, a.getTweensOf = function(e, t) {
		for (var n = [], r = ut(e), i = this._first, a = y(t), o; i;) i instanceof _n ? ye(i._targets, r) && (a ? (!cn || i._initted && i._ts) && i.globalTime(0) <= t && i.globalTime(i.totalDuration()) > t : !t || i.isActive()) && n.push(i) : (o = i.getTweensOf(r, t)).length && n.push.apply(n, o), i = i._next;
		return n;
	}, a.tweenTo = function(e, t) {
		t ||= {};
		var n = this, r = tt(n, e), i = t, a = i.startAt, o = i.onStart, s = i.onStartParams, c = i.immediateRender, l, d = _n.to(n, Te({
			ease: t.ease || "none",
			lazy: !1,
			immediateRender: !1,
			time: r,
			overwrite: "auto",
			duration: t.duration || Math.abs((r - (a && "time" in a ? a.time : n._time)) / n.timeScale()) || u,
			onStart: function() {
				if (n.pause(), !l) {
					var e = t.duration || Math.abs((r - (a && "time" in a ? a.time : n._time)) / n.timeScale());
					d._dur !== e && Qe(d, e, 0, 1).render(d._time, !0, !0), l = 1;
				}
				o && o.apply(d, s || []);
			}
		}, t));
		return c ? d.render(0) : d;
	}, a.tweenFromTo = function(e, t, n) {
		return this.tweenTo(t, Te({ startAt: { time: tt(this, e) } }, n));
	}, a.recent = function() {
		return this._recent;
	}, a.nextLabel = function(e) {
		return e === void 0 && (e = this._time), Et(this, tt(this, e));
	}, a.previousLabel = function(e) {
		return e === void 0 && (e = this._time), Et(this, tt(this, e), 1);
	}, a.currentLabel = function(e) {
		return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + u);
	}, a.shiftChildren = function(e, t, n) {
		n === void 0 && (n = 0);
		var r = this._first, i = this.labels, a;
		for (e = q(e); r;) r._start >= n && (r._start += e, r._end += e), r = r._next;
		if (t) for (a in i) i[a] >= n && (i[a] += e);
		return Fe(this);
	}, a.invalidate = function(t) {
		var n = this._first;
		for (this._lock = 0; n;) n.invalidate(t), n = n._next;
		return e.prototype.invalidate.call(this, t);
	}, a.clear = function(e) {
		e === void 0 && (e = !0);
		for (var t = this._first, n; t;) n = t._next, this.remove(t), t = n;
		return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), Fe(this);
	}, a.totalDuration = function(e) {
		var t = 0, n = this, r = n._last, i = l, a, o, s;
		if (arguments.length) return n.timeScale((n._repeat < 0 ? n.duration() : n.totalDuration()) / (n.reversed() ? -e : e));
		if (n._dirty) {
			for (s = n.parent; r;) a = r._prev, r._dirty && r.totalDuration(), o = r._start, o > i && n._sort && r._ts && !n._lock ? (n._lock = 1, Ge(n, r, o - r._delay, 1)._lock = 0) : i = o, o < 0 && r._ts && (t -= o, (!s && !n._dp || s && s.smoothChildTiming) && (n._start += q(o / n._ts), n._time -= o, n._tTime -= o), n.shiftChildren(-o, !1, -Infinity), i = 0), r._end > t && r._ts && (t = r._end), r = a;
			Qe(n, n === F && n._time > t ? n._time : t, 1, 1), n._dirty = 0;
		}
		return n._tDur;
	}, t.updateRoot = function(e) {
		if (F._ts && (Se(F, Ve(e, F)), ue = Vt.frame), Vt.frame >= pe) {
			pe += i.autoSleep || 120;
			var t = F._first;
			if ((!t || !t._ts) && i.autoSleep && Vt._listeners.length < 2) {
				for (; t && !t._ts;) t = t._next;
				t || Vt.sleep();
			}
		}
	}, t;
}(tn);
Te(nn.prototype, {
	_lock: 0,
	_hasPause: 0,
	_forcing: 0
});
var rn = function(e, t, n, r, i, a, o) {
	var s = new jn(this._pt, e, t, 0, 1, Tn, null, i), c = 0, l = 0, u, d, f, p, m, h, g, _;
	for (s.b = n, s.e = r, n += "", r += "", (g = ~r.indexOf("random(")) && (r = Ct(r)), a && (_ = [n, r], a(_, e, t), n = _[0], r = _[1]), d = n.match(M) || []; u = M.exec(r);) p = u[0], m = r.substring(c, u.index), f ? f = (f + 1) % 5 : m.substr(-5) === "rgba(" && (f = 1), p !== d[l++] && (h = parseFloat(d[l - 1]) || 0, s._pt = {
		_next: s._pt,
		p: m || l === 1 ? m : ",",
		s: h,
		c: p.charAt(1) === "=" ? ve(h, p) - h : parseFloat(p) - h,
		m: f && f < 4 ? Math.round : 0
	}, c = M.lastIndex);
	return s.c = c < r.length ? r.substring(c, r.length) : "", s.fp = o, (N.test(r) || g) && (s.e = 0), this._pt = s, s;
}, an = function(e, t, n, r, a, o, s, c, l, u) {
	v(r) && (r = r(a || 0, e, o));
	var d = e[t], f = n === "get" ? v(d) ? l ? e[t.indexOf("set") || !v(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : d : n, p = v(d) ? l ? bn : yn : vn, m;
	if (_(r) && (~r.indexOf("random(") && (r = Ct(r)), r.charAt(1) === "=" && (m = ve(f, r) + (at(f) || 0), (m || m === 0) && (r = m))), !u || f !== r || ln) return !isNaN(f * r) && r !== "" ? (m = new jn(this._pt, e, t, +f || 0, r - (f || 0), typeof d == "boolean" ? wn : Cn, 0, p), l && (m.fp = l), s && m.modifier(s, this, e), this._pt = m) : (!d && !(t in e) && V(t, r), rn.call(this, e, t, f, r, p, c || i.stringFilter, l));
}, on = function(e, t, n, r, i) {
	if (v(e) && (e = mn(e, i, t, n, r)), !x(e) || e.style && e.nodeType || E(e) || T(e)) return _(e) ? mn(e, i, t, n, r) : e;
	var a = {}, o;
	for (o in e) a[o] = mn(e[o], i, t, n, r);
	return a;
}, sn = function(e, t, n, r, i, a) {
	var o, s, c, l;
	if (de[e] && (o = new de[e]()).init(i, o.rawVars ? t[e] : on(t[e], r, i, a, n), n, r, a) !== !1 && (n._pt = s = new jn(n._pt, i, e, 0, 1, o.render, o, 0, o.priority), n !== kt)) for (c = n._ptLookup[n._targets.indexOf(i)], l = o._props.length; l--;) c[o._props[l]] = s;
	return o;
}, cn, ln, un = function e(t, n, r) {
	var i = t.vars, c = i.ease, d = i.startAt, f = i.immediateRender, p = i.lazy, m = i.onUpdate, h = i.runBackwards, g = i.yoyoEase, _ = i.keyframes, v = i.autoRevert, y = t._dur, b = t._startAt, x = t._targets, C = t.parent, w = C && C.data === "nested" ? C.vars.targets : x, T = t._overwrite === "auto" && !o, E = t.timeline, D = i.easeReverse || g, O, k, A, j, M, N, P, ee, I, L, R, z, B;
	if (E && (!_ || !c) && (c = "none"), t._ease = Yt(c, a.ease), t._rEase = D && (Yt(D) || t._ease), t._from = !E && !!i.runBackwards, t._from && (t.ratio = 1), !E || _ && !i.stagger) {
		if (ee = x[0] ? _e(x[0]).harness : 0, z = ee && i[ee.prop], O = ke(i, U), b && (b._zTime < 0 && b.progress(1), n < 0 && h && f && !v ? b.render(-1, !0) : b.revert(h && y ? oe : ae), b._lazy = 0), d) {
			if (Pe(t._startAt = _n.set(x, Te({
				data: "isStart",
				overwrite: !1,
				parent: C,
				immediateRender: !0,
				lazy: !b && S(p),
				startAt: null,
				delay: 0,
				onUpdate: m && function() {
					return Dt(t, "onUpdate");
				},
				stagger: 0
			}, d))), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (s || !f && !v) && t._startAt.revert(oe), f && y && n <= 0 && r <= 0) {
				n && (t._zTime = n);
				return;
			}
		} else if (h && y && !b) {
			if (n && (f = !1), A = Te({
				overwrite: !1,
				data: "isFromStart",
				lazy: f && !b && S(p),
				immediateRender: f,
				stagger: 0,
				parent: C
			}, O), z && (A[ee.prop] = z), Pe(t._startAt = _n.set(x, A)), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (s ? t._startAt.revert(oe) : t._startAt.render(-1, !0)), t._zTime = n, !f) e(t._startAt, u, u);
			else if (!n) return;
		}
		for (t._pt = t._ptCache = 0, p = y && S(p) || p && !y, k = 0; k < x.length; k++) {
			if (M = x[k], P = M._gsap || ge(x)[k]._gsap, t._ptLookup[k] = L = {}, le[P.id] && ce.length && be(), R = w === x ? k : w.indexOf(M), ee && (I = new ee()).init(M, z || O, t, R, w) !== !1 && (t._pt = j = new jn(t._pt, M, I.name, 0, 1, I.render, I, 0, I.priority), I._props.forEach(function(e) {
				L[e] = j;
			}), I.priority && (N = 1)), !ee || z) for (A in O) de[A] && (I = sn(A, O, t, R, M, w)) ? I.priority && (N = 1) : L[A] = j = an.call(t, M, A, "get", O[A], R, w, 0, i.stringFilter);
			t._op && t._op[k] && t.kill(M, t._op[k]), T && t._pt && (cn = t, F.killTweensOf(M, L, t.globalTime(n)), B = !t.parent, cn = 0), t._pt && p && (le[P.id] = 1);
		}
		N && An(t), t._onInit && t._onInit(t);
	}
	t._onUpdate = m, t._initted = (!t._op || t._pt) && !B, _ && n <= 0 && E.render(l, !0, !0);
}, dn = function(e, t, n, r, i, a, o, s) {
	var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], l, u, d, f;
	if (!c) for (c = e._ptCache[t] = [], d = e._ptLookup, f = e._targets.length; f--;) {
		if (l = d[f][t], l && l.d && l.d._pt) for (l = l.d._pt; l && l.p !== t && l.fp !== t;) l = l._next;
		if (!l) return ln = 1, e.vars[t] = "+=0", un(e, o), ln = 0, s ? re(t + " not eligible for reset. Try splitting into individual properties") : 1;
		c.push(l);
	}
	for (f = c.length; f--;) u = c[f], l = u._pt || u, l.s = (r || r === 0) && !i ? r : l.s + (r || 0) + a * l.c, l.c = n - l.s, u.e && (u.e = K(n) + at(u.e)), u.b && (u.b = l.s + at(u.b));
}, fn = function(e, t) {
	var n = e[0] ? _e(e[0]).harness : 0, r = n && n.aliases, i, a, o, s;
	if (!r) return t;
	for (a in i = De({}, t), r) if (a in i) for (s = r[a].split(","), o = s.length; o--;) i[s[o]] = i[a];
	return i;
}, pn = function(e, t, n, r) {
	var i = t.ease || r || "power1.inOut", a, o;
	if (E(t)) o = n[e] || (n[e] = []), t.forEach(function(e, n) {
		return o.push({
			t: n / (t.length - 1) * 100,
			v: e,
			e: i
		});
	});
	else for (a in t) o = n[a] || (n[a] = []), a === "ease" || o.push({
		t: parseFloat(e),
		v: t[a],
		e: i
	});
}, mn = function(e, t, n, r, i) {
	return v(e) ? e.call(t, n, r, i) : _(e) && ~e.indexOf("random(") ? Ct(e) : e;
}, hn = he + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", gn = {};
G(hn + ",id,stagger,delay,duration,paused,scrollTrigger", function(e) {
	return gn[e] = 1;
});
var _n = /*#__PURE__*/ function(e) {
	r(t, e);
	function t(t, r, a, s) {
		var c;
		typeof r == "number" && (a.duration = r, r = a, a = null), c = e.call(this, s ? r : Ae(r)) || this;
		var l = c.vars, d = l.duration, f = l.delay, p = l.immediateRender, m = l.stagger, h = l.overwrite, g = l.keyframes, _ = l.defaults, v = l.scrollTrigger, b = r.parent || F, C = (E(t) || T(t) ? y(t[0]) : "length" in r) ? [t] : ut(t), D, O, k, A, j, M, N, P;
		if (c._targets = C.length ? ge(C) : re("GSAP target " + t + " not found. https://gsap.com", !i.nullTargetWarn) || [], c._ptLookup = [], c._overwrite = h, g || m || w(d) || w(f)) {
			r = c.vars;
			var ee = r.easeReverse || r.yoyoEase;
			if (D = c.timeline = new nn({
				data: "nested",
				defaults: _ || {},
				targets: b && b.data === "nested" ? b.vars.targets : C
			}), D.kill(), D.parent = D._dp = n(c), D._start = 0, m || w(d) || w(f)) {
				if (A = C.length, N = m && pt(m), x(m)) for (j in m) ~hn.indexOf(j) && (P ||= {}, P[j] = m[j]);
				for (O = 0; O < A; O++) k = ke(r, gn), k.stagger = 0, ee && (k.easeReverse = ee), P && De(k, P), M = C[O], k.duration = +mn(d, n(c), O, M, C), k.delay = (+mn(f, n(c), O, M, C) || 0) - c._delay, !m && A === 1 && k.delay && (c._delay = f = k.delay, c._start += f, k.delay = 0), D.to(M, k, N ? N(O, M, C) : 0), D._ease = Y.none;
				D.duration() ? d = f = 0 : c.timeline = 0;
			} else if (g) {
				Ae(Te(D.vars.defaults, { ease: "none" })), D._ease = Yt(g.ease || r.ease || "none");
				var I = 0, L, R, z;
				if (E(g)) g.forEach(function(e) {
					return D.to(C, e, ">");
				}), D.duration();
				else {
					for (j in k = {}, g) j === "ease" || j === "easeEach" || pn(j, g[j], k, g.easeEach);
					for (j in k) for (L = k[j].sort(function(e, t) {
						return e.t - t.t;
					}), I = 0, O = 0; O < L.length; O++) R = L[O], z = {
						ease: R.e,
						duration: (R.t - (O ? L[O - 1].t : 0)) / 100 * d
					}, z[j] = R.v, D.to(C, z, I), I += z.duration;
					D.duration() < d && D.to({}, { duration: d - D.duration() });
				}
			}
			d || c.duration(d = D.duration());
		} else c.timeline = 0;
		return h === !0 && !o && (cn = n(c), F.killTweensOf(C), cn = 0), Ge(b, n(c), a), r.reversed && c.reverse(), r.paused && c.paused(!0), (p || !d && !g && c._start === q(b._time) && S(p) && Re(n(c)) && b.data !== "nested") && (c._tTime = -u, c.render(Math.max(0, -f) || 0)), v && Ke(n(c), v), c;
	}
	var a = t.prototype;
	return a.render = function(e, t, n) {
		var r = this._time, i = this._tDur, a = this._dur, o = e < 0, s = e > i - u && !o ? i : e < u ? 0 : e, c, l, d, f, p, m, h, g;
		if (!a) Xe(this, e, t, n);
		else if (s !== this._tTime || !e || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== o || this._lazy) {
			if (c = s, g = this.timeline, this._repeat) {
				if (f = a + this._rDelay, this._repeat < -1 && o) return this.totalTime(f * 100 + e, t, n);
				if (c = q(s % f), s === i ? (d = this._repeat, c = a) : (p = q(s / f), d = ~~p, d && d === p ? (c = a, d--) : c > a && (c = a)), m = this._yoyo && d & 1, m && (c = a - c), p = Be(this._tTime, f), c === r && !n && this._initted && d === p) return this._tTime = s, this;
				d !== p && this.vars.repeatRefresh && !m && !this._lock && c !== f && this._initted && (this._lock = n = 1, this.render(q(f * d), !0).invalidate()._lock = 0);
			}
			if (!this._initted) {
				if (qe(this, o ? e : c, n, t, s)) return this._tTime = 0, this;
				if (r !== this._time && !(n && this.vars.repeatRefresh && d !== p)) return this;
				if (a !== this._dur) return this.render(e, t, n);
			}
			if (this._rEase) {
				var _ = c < r;
				if (_ !== this._inv) {
					var v = _ ? r : a - r;
					this._inv = _, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = r, this._invRecip = v ? (_ ? -1 : 1) / v : 0, this._invScale = _ ? -this.ratio : 1 - this.ratio, this._invEase = _ ? this._rEase : this._ease;
				}
				this.ratio = h = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip);
			} else this.ratio = h = this._ease(c / a);
			if (this._from && (this.ratio = h = 1 - h), this._tTime = s, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), !r && s && !t && !p && (Dt(this, "onStart"), this._tTime !== s)) return this;
			for (l = this._pt; l;) l.r(h, l.d), l = l._next;
			g && g.render(e < 0 ? e : g._dur * g._ease(c / this._dur), t, n) || this._startAt && (this._zTime = e), this._onUpdate && !t && (o && Le(this, e, t, n), Dt(this, "onUpdate")), this._repeat && d !== p && this.vars.onRepeat && !t && this.parent && Dt(this, "onRepeat"), (s === this._tDur || !s) && this._tTime === s && (o && !this._onUpdate && Le(this, e, !0, !0), (e || !a) && (s === this._tDur && this._ts > 0 || !s && this._ts < 0) && Pe(this, 1), !t && (!o || r) && (s || r || m) && (Dt(this, s === i ? "onComplete" : "onReverseComplete", !0), this._prom && !(s < i && this.timeScale() > 0) && this._prom()));
		}
		return this;
	}, a.targets = function() {
		return this._targets;
	}, a.invalidate = function(t) {
		return (!t || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(t), e.prototype.invalidate.call(this, t);
	}, a.resetTo = function(e, t, n, r, i) {
		Bt || Vt.wake(), this._ts || this.play();
		var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts), o;
		return this._initted || un(this, a), o = this._ease(a / this._dur), dn(this, e, t, n, r, o, a, i) ? this.resetTo(e, t, n, r, 1) : (Ue(this, 0), this.parent || Me(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
	}, a.kill = function(e, t) {
		if (t === void 0 && (t = "all"), !e && (!t || t === "all")) return this._lazy = this._pt = 0, this.parent ? Ot(this) : this.scrollTrigger && this.scrollTrigger.kill(!!s), this;
		if (this.timeline) {
			var n = this.timeline.totalDuration();
			return this.timeline.killTweensOf(e, t, cn && cn.vars.overwrite !== !0)._first || Ot(this), this.parent && n !== this.timeline.totalDuration() && Qe(this, this._dur * this.timeline._tDur / n, 0, 1), this;
		}
		var r = this._targets, i = e ? ut(e) : r, a = this._ptLookup, o = this._pt, c, l, u, d, f, p, m;
		if ((!t || t === "all") && je(r, i)) return t === "all" && (this._pt = 0), Ot(this);
		for (c = this._op = this._op || [], t !== "all" && (_(t) && (f = {}, G(t, function(e) {
			return f[e] = 1;
		}), t = f), t = fn(r, t)), m = r.length; m--;) if (~i.indexOf(r[m])) for (f in l = a[m], t === "all" ? (c[m] = t, d = l, u = {}) : (u = c[m] = c[m] || {}, d = t), d) p = l && l[f], p && ((!("kill" in p.d) || p.d.kill(f) === !0) && Ne(this, p, "_pt"), delete l[f]), u !== "all" && (u[f] = 1);
		return this._initted && !this._pt && o && Ot(this), this;
	}, t.to = function(e, n) {
		return new t(e, n, arguments[2]);
	}, t.from = function(e, t) {
		return nt(1, arguments);
	}, t.delayedCall = function(e, n, r, i) {
		return new t(n, 0, {
			immediateRender: !1,
			lazy: !1,
			overwrite: !1,
			delay: e,
			onComplete: n,
			onReverseComplete: n,
			onCompleteParams: r,
			onReverseCompleteParams: r,
			callbackScope: i
		});
	}, t.fromTo = function(e, t, n) {
		return nt(2, arguments);
	}, t.set = function(e, n) {
		return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(e, n);
	}, t.killTweensOf = function(e, t, n) {
		return F.killTweensOf(e, t, n);
	}, t;
}(tn);
Te(_n.prototype, {
	_targets: [],
	_lazy: 0,
	_startAt: 0,
	_op: 0,
	_onInit: 0
}), G("staggerTo,staggerFrom,staggerFromTo", function(e) {
	_n[e] = function() {
		var t = new nn(), n = st.call(arguments, 0);
		return n.splice(e === "staggerFromTo" ? 5 : 4, 0, 0), t[e].apply(t, n);
	};
});
var vn = function(e, t, n) {
	return e[t] = n;
}, yn = function(e, t, n) {
	return e[t](n);
}, bn = function(e, t, n, r) {
	return e[t](r.fp, n);
}, xn = function(e, t, n) {
	return e.setAttribute(t, n);
}, Sn = function(e, t) {
	return v(e[t]) ? yn : b(e[t]) && e.setAttribute ? xn : vn;
}, Cn = function(e, t) {
	return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, wn = function(e, t) {
	return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Tn = function(e, t) {
	var n = t._pt, r = "";
	if (!e && t.b) r = t.b;
	else if (e === 1 && t.e) r = t.e;
	else {
		for (; n;) r = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) + r, n = n._next;
		r += t.c;
	}
	t.set(t.t, t.p, r, t);
}, En = function(e, t) {
	for (var n = t._pt; n;) n.r(e, n.d), n = n._next;
}, Dn = function(e, t, n, r) {
	for (var i = this._pt, a; i;) a = i._next, i.p === r && i.modifier(e, t, n), i = a;
}, On = function(e) {
	for (var t = this._pt, n, r; t;) r = t._next, t.p === e && !t.op || t.op === e ? Ne(this, t, "_pt") : t.dep || (n = 1), t = r;
	return !n;
}, kn = function(e, t, n, r) {
	r.mSet(e, t, r.m.call(r.tween, n, r.mt), r);
}, An = function(e) {
	for (var t = e._pt, n, r, i, a; t;) {
		for (n = t._next, r = i; r && r.pr > t.pr;) r = r._next;
		(t._prev = r ? r._prev : a) ? t._prev._next = t : i = t, (t._next = r) ? r._prev = t : a = t, t = n;
	}
	e._pt = i;
}, jn = /*#__PURE__*/ function() {
	function e(e, t, n, r, i, a, o, s, c) {
		this.t = t, this.s = r, this.c = i, this.p = n, this.r = a || Cn, this.d = o || this, this.set = s || vn, this.pr = c || 0, this._next = e, e && (e._prev = this);
	}
	var t = e.prototype;
	return t.modifier = function(e, t, n) {
		this.mSet = this.mSet || this.set, this.set = kn, this.m = e, this.mt = n, this.tween = t;
	}, e;
}();
G(he + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(e) {
	return U[e] = 1;
}), z.TweenMax = z.TweenLite = _n, z.TimelineLite = z.TimelineMax = nn, F = new nn({
	sortChildren: !1,
	defaults: a,
	autoRemoveChildren: !0,
	id: "root",
	smoothChildTiming: !0
}), i.stringFilter = zt;
var Mn = [], Nn = {}, Pn = [], Fn = 0, In = 0, Ln = function(e) {
	return (Nn[e] || Pn).map(function(e) {
		return e();
	});
}, Rn = function() {
	var e = Date.now(), t = [];
	e - Fn > 2 && (Ln("matchMediaInit"), Mn.forEach(function(e) {
		var n = e.queries, r = e.conditions, i, a, o, s;
		for (a in n) i = I.matchMedia(n[a]).matches, i && (o = 1), i !== r[a] && (r[a] = i, s = 1);
		s && (e.revert(), o && t.push(e));
	}), Ln("matchMediaRevert"), t.forEach(function(e) {
		return e.onMatch(e, function(t) {
			return e.add(null, t);
		});
	}), Fn = e, Ln("matchMedia"));
}, zn = /*#__PURE__*/ function() {
	function e(e, t) {
		this.selector = t && dt(t), this.data = [], this._r = [], this.isReverted = !1, this.id = In++, e && this.add(e);
	}
	var t = e.prototype;
	return t.add = function(e, t, n) {
		v(e) && (n = t, t = e, e = v);
		var r = this, i = function() {
			var e = c, i = r.selector, a;
			return e && e !== r && e.data.push(r), n && (r.selector = dt(n)), c = r, a = t.apply(r, arguments), v(a) && r._r.push(a), c = e, r.selector = i, r.isReverted = !1, a;
		};
		return r.last = i, e === v ? i(r, function(e) {
			return r.add(null, e);
		}) : e ? r[e] = i : i;
	}, t.ignore = function(e) {
		var t = c;
		c = null, e(this), c = t;
	}, t.getTweens = function() {
		var t = [];
		return this.data.forEach(function(n) {
			return n instanceof e ? t.push.apply(t, n.getTweens()) : n instanceof _n && !(n.parent && n.parent.data === "nested") && t.push(n);
		}), t;
	}, t.clear = function() {
		this._r.length = this.data.length = 0;
	}, t.kill = function(e, t) {
		var n = this;
		if (e ? (function() {
			for (var t = n.getTweens(), r = n.data.length, i; r--;) i = n.data[r], i.data === "isFlip" && (i.revert(), i.getChildren(!0, !0, !1).forEach(function(e) {
				return t.splice(t.indexOf(e), 1);
			}));
			for (t.map(function(e) {
				return {
					g: e._dur || e._delay || e._sat && !e._sat.vars.immediateRender ? e.globalTime(0) : -Infinity,
					t: e
				};
			}).sort(function(e, t) {
				return t.g - e.g || -Infinity;
			}).forEach(function(t) {
				return t.t.revert(e);
			}), r = n.data.length; r--;) i = n.data[r], i instanceof nn ? i.data !== "nested" && (i.scrollTrigger && i.scrollTrigger.revert(), i.kill()) : !(i instanceof _n) && i.revert && i.revert(e);
			n._r.forEach(function(t) {
				return t(e, n);
			}), n.isReverted = !0;
		})() : this.data.forEach(function(e) {
			return e.kill && e.kill();
		}), this.clear(), t) for (var r = Mn.length; r--;) Mn[r].id === this.id && Mn.splice(r, 1);
	}, t.revert = function(e) {
		this.kill(e || {});
	}, e;
}(), Bn = /*#__PURE__*/ function() {
	function e(e) {
		this.contexts = [], this.scope = e, c && c.data.push(this);
	}
	var t = e.prototype;
	return t.add = function(e, t, n) {
		x(e) || (e = { matches: e });
		var r = new zn(0, n || this.scope), i = r.conditions = {}, a, o, s;
		for (o in c && !r.selector && (r.selector = c.selector), this.contexts.push(r), t = r.add("onMatch", t), r.queries = e, e) o === "all" ? s = 1 : (a = I.matchMedia(e[o]), a && (Mn.indexOf(r) < 0 && Mn.push(r), (i[o] = a.matches) && (s = 1), a.addListener ? a.addListener(Rn) : a.addEventListener("change", Rn)));
		return s && t(r, function(e) {
			return r.add(null, e);
		}), this;
	}, t.revert = function(e) {
		this.kill(e || {});
	}, t.kill = function(e) {
		this.contexts.forEach(function(t) {
			return t.kill(e, !0);
		});
	}, e;
}(), Vn = {
	registerPlugin: function() {
		[...arguments].forEach(function(e) {
			return jt(e);
		});
	},
	timeline: function(e) {
		return new nn(e);
	},
	getTweensOf: function(e, t) {
		return F.getTweensOf(e, t);
	},
	getProperty: function(e, t, n, r) {
		_(e) && (e = ut(e)[0]);
		var i = _e(e || {}).get, a = n ? we : Ce;
		return n === "native" && (n = ""), e && (t ? a((de[t] && de[t].get || i)(e, t, n, r)) : function(t, n, r) {
			return a((de[t] && de[t].get || i)(e, t, n, r));
		});
	},
	quickSetter: function(e, t, n) {
		if (e = ut(e), e.length > 1) {
			var r = e.map(function(e) {
				return Gn.quickSetter(e, t, n);
			}), i = r.length;
			return function(e) {
				for (var t = i; t--;) r[t](e);
			};
		}
		e = e[0] || {};
		var a = de[t], o = _e(e), s = o.harness && (o.harness.aliases || {})[t] || t, c = a ? function(t) {
			var r = new a();
			kt._pt = 0, r.init(e, n ? t + n : t, kt, 0, [e]), r.render(1, r), kt._pt && En(1, kt);
		} : o.set(e, s);
		return a ? c : function(t) {
			return c(e, s, n ? t + n : t, o, 1);
		};
	},
	quickTo: function(e, t, n) {
		var r, i = Gn.to(e, Te((r = {}, r[t] = "+=0.1", r.paused = !0, r.stagger = 0, r), n || {})), a = function(e, n, r) {
			return i.resetTo(t, e, n, r);
		};
		return a.tween = i, a;
	},
	isTweening: function(e) {
		return F.getTweensOf(e, !0).length > 0;
	},
	defaults: function(e) {
		return e && e.ease && (e.ease = Yt(e.ease, a.ease)), Oe(a, e || {});
	},
	config: function(e) {
		return Oe(i, e || {});
	},
	registerEffect: function(e) {
		var t = e.name, n = e.effect, r = e.plugins, i = e.defaults, a = e.extendTimeline;
		(r || "").split(",").forEach(function(e) {
			return e && !de[e] && !z[e] && re(t + " effect requires " + e + " plugin.");
		}), fe[t] = function(e, t, r) {
			return n(ut(e), Te(t || {}, i), r);
		}, a && (nn.prototype[t] = function(e, n, r) {
			return this.add(fe[t](e, x(n) ? n : (r = n) && {}, this), r);
		});
	},
	registerEase: function(e, t) {
		Y[e] = Yt(t);
	},
	parseEase: function(e, t) {
		return arguments.length ? Yt(e, t) : Y;
	},
	getById: function(e) {
		return F.getById(e);
	},
	exportRoot: function(e, t) {
		e === void 0 && (e = {});
		var n = new nn(e), r, i;
		for (n.smoothChildTiming = S(e.smoothChildTiming), F.remove(n), n._dp = 0, n._time = n._tTime = F._time, r = F._first; r;) i = r._next, (t || !(!r._dur && r instanceof _n && r.vars.onComplete === r._targets[0])) && Ge(n, r, r._start - r._delay), r = i;
		return Ge(F, n, 0), n;
	},
	context: function(e, t) {
		return e ? new zn(e, t) : c;
	},
	matchMedia: function(e) {
		return new Bn(e);
	},
	matchMediaRefresh: function() {
		return Mn.forEach(function(e) {
			var t = e.conditions, n, r;
			for (r in t) t[r] && (t[r] = !1, n = 1);
			n && e.revert();
		}) || Rn();
	},
	addEventListener: function(e, t) {
		var n = Nn[e] || (Nn[e] = []);
		~n.indexOf(t) || n.push(t);
	},
	removeEventListener: function(e, t) {
		var n = Nn[e], r = n && n.indexOf(t);
		r >= 0 && n.splice(r, 1);
	},
	utils: {
		wrap: xt,
		wrapYoyo: St,
		distribute: pt,
		random: gt,
		snap: ht,
		normalize: yt,
		getUnit: at,
		clamp: ot,
		splitColor: Pt,
		toArray: ut,
		selector: dt,
		mapRange: wt,
		pipe: _t,
		unitize: vt,
		interpolate: Tt,
		shuffle: ft
	},
	install: ne,
	effects: fe,
	ticker: Vt,
	updateRoot: nn.updateRoot,
	plugins: de,
	globalTimeline: F,
	core: {
		PropTween: jn,
		globals: H,
		Tween: _n,
		Timeline: nn,
		Animation: tn,
		getCache: _e,
		_removeLinkedListItem: Ne,
		reverting: function() {
			return s;
		},
		context: function(e) {
			return e && c && (c.data.push(e), e._ctx = c), c;
		},
		suppressOverwrites: function(e) {
			return o = e;
		}
	}
};
G("to,from,fromTo,delayedCall,set,killTweensOf", function(e) {
	return Vn[e] = _n[e];
}), Vt.add(nn.updateRoot), kt = Vn.to({}, { duration: 0 });
var Hn = function(e, t) {
	for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t;) n = n._next;
	return n;
}, Un = function(e, t) {
	var n = e._targets, r, i, a;
	for (r in t) for (i = n.length; i--;) a = e._ptLookup[i][r], (a &&= a.d) && (a._pt && (a = Hn(a, r)), a && a.modifier && a.modifier(t[r], e, n[i], r));
}, Wn = function(e, t) {
	return {
		name: e,
		headless: 1,
		rawVars: 1,
		init: function(e, n, r) {
			r._onInit = function(e) {
				var r, i;
				if (_(n) && (r = {}, G(n, function(e) {
					return r[e] = 1;
				}), n = r), t) {
					for (i in r = {}, n) r[i] = t(n[i]);
					n = r;
				}
				Un(e, n);
			};
		}
	};
}, Gn = Vn.registerPlugin({
	name: "attr",
	init: function(e, t, n, r, i) {
		var a, o, s;
		for (a in this.tween = n, t) s = e.getAttribute(a) || "", o = this.add(e, "setAttribute", (s || 0) + "", t[a], r, i, 0, 0, a), o.op = a, o.b = s, this._props.push(a);
	},
	render: function(e, t) {
		for (var n = t._pt; n;) s ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), n = n._next;
	}
}, {
	name: "endArray",
	headless: 1,
	init: function(e, t) {
		for (var n = t.length; n--;) this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
	}
}, Wn("roundProps", mt), Wn("modifiers"), Wn("snap", ht)) || Vn;
_n.version = nn.version = Gn.version = "3.15.0", te = 1, C() && Ht(), Y.Power0, Y.Power1, Y.Power2, Y.Power3, Y.Power4, Y.Linear, Y.Quad, Y.Cubic, Y.Quart, Y.Quint, Y.Strong, Y.Elastic, Y.Back, Y.SteppedEase, Y.Bounce, Y.Sine, Y.Expo, Y.Circ;
//#endregion
//#region node_modules/gsap/CSSPlugin.js
var Kn, qn, Jn, Yn, Xn, Zn, Qn, $n = function() {
	return typeof window < "u";
}, er = {}, tr = 180 / Math.PI, nr = Math.PI / 180, rr = Math.atan2, ir = 1e8, ar = /([A-Z])/g, or = /(left|right|width|margin|padding|x)/i, sr = /[\s,\(]\S/, cr = {
	autoAlpha: "opacity,visibility",
	scale: "scaleX,scaleY",
	alpha: "opacity"
}, lr = function(e, t) {
	return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, ur = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, dr = function(e, t) {
	return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, fr = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, pr = function(e, t) {
	var n = t.s + t.c * e;
	t.set(t.t, t.p, ~~(n + (n < 0 ? -.5 : .5)) + t.u, t);
}, mr = function(e, t) {
	return t.set(t.t, t.p, e ? t.e : t.b, t);
}, hr = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : t.b, t);
}, gr = function(e, t, n) {
	return e.style[t] = n;
}, _r = function(e, t, n) {
	return e.style.setProperty(t, n);
}, vr = function(e, t, n) {
	return e._gsap[t] = n;
}, yr = function(e, t, n) {
	return e._gsap.scaleX = e._gsap.scaleY = n;
}, br = function(e, t, n, r, i) {
	var a = e._gsap;
	a.scaleX = a.scaleY = n, a.renderTransform(i, a);
}, xr = function(e, t, n, r, i) {
	var a = e._gsap;
	a[t] = n, a.renderTransform(i, a);
}, X = "transform", Sr = X + "Origin", Cr = function e(t, n) {
	var r = this, i = this.target, a = i.style, o = i._gsap;
	if (t in er && a) {
		if (this.tfm = this.tfm || {}, t !== "transform") t = cr[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(e) {
			return r.tfm[e] = Hr(i, e);
		}) : this.tfm[t] = o.x ? o[t] : Hr(i, t), t === Sr && (this.tfm.zOrigin = o.zOrigin);
		else return cr.transform.split(",").forEach(function(t) {
			return e.call(r, t, n);
		});
		if (this.props.indexOf(X) >= 0) return;
		o.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(Sr, n, "")), t = X;
	}
	(a || n) && this.props.push(t, n, a[t]);
}, wr = function(e) {
	e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, Tr = function() {
	for (var e = this.props, t = this.target, n = t.style, r = t._gsap, i = 0, a; i < e.length; i += 3) e[i + 1] ? e[i + 1] === 2 ? t[e[i]](e[i + 2]) : t[e[i]] = e[i + 2] : e[i + 2] ? n[e[i]] = e[i + 2] : n.removeProperty(e[i].substr(0, 2) === "--" ? e[i] : e[i].replace(ar, "-$1").toLowerCase());
	if (this.tfm) {
		for (a in this.tfm) r[a] = this.tfm[a];
		r.svg && (r.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), i = Qn(), (!i || !i.isStart) && !n[X] && (wr(n), r.zOrigin && n[Sr] && (n[Sr] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
	}
}, Er = function(e, t) {
	var n = {
		target: e,
		props: [],
		revert: Tr,
		save: Cr
	};
	return e._gsap || Gn.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(e) {
		return n.save(e);
	}), n;
}, Dr, Or = function(e, t) {
	var n = qn.createElementNS ? qn.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : qn.createElement(e);
	return n && n.style ? n : qn.createElement(e);
}, kr = function e(t, n, r) {
	var i = getComputedStyle(t);
	return i[n] || i.getPropertyValue(n.replace(ar, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && e(t, jr(n) || n, 1) || "";
}, Ar = "O,Moz,ms,Ms,Webkit".split(","), jr = function(e, t, n) {
	var r = (t || Xn).style, i = 5;
	if (e in r && !n) return e;
	for (e = e.charAt(0).toUpperCase() + e.substr(1); i-- && !(Ar[i] + e in r););
	return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? Ar[i] : "") + e;
}, Mr = function() {
	$n() && window.document && (Kn = window, qn = Kn.document, Jn = qn.documentElement, Xn = Or("div") || { style: {} }, Or("div"), X = jr(X), Sr = X + "Origin", Xn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Dr = !!jr("perspective"), Qn = Gn.core.reverting, Yn = 1);
}, Nr = function(e) {
	var t = e.ownerSVGElement, n = Or("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = e.cloneNode(!0), i;
	r.style.display = "block", n.appendChild(r), Jn.appendChild(n);
	try {
		i = r.getBBox();
	} catch {}
	return n.removeChild(r), Jn.removeChild(n), i;
}, Pr = function(e, t) {
	for (var n = t.length; n--;) if (e.hasAttribute(t[n])) return e.getAttribute(t[n]);
}, Fr = function(e) {
	var t, n;
	try {
		t = e.getBBox();
	} catch {
		t = Nr(e), n = 1;
	}
	return t && (t.width || t.height) || n || (t = Nr(e)), t && !t.width && !t.x && !t.y ? {
		x: +Pr(e, [
			"x",
			"cx",
			"x1"
		]) || 0,
		y: +Pr(e, [
			"y",
			"cy",
			"y1"
		]) || 0,
		width: 0,
		height: 0
	} : t;
}, Ir = function(e) {
	return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !Fr(e));
}, Lr = function(e, t) {
	if (t) {
		var n = e.style, r;
		t in er && t !== Sr && (t = X), n.removeProperty ? (r = t.substr(0, 2), (r === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), n.removeProperty(r === "--" ? t : t.replace(ar, "-$1").toLowerCase())) : n.removeAttribute(t);
	}
}, Rr = function(e, t, n, r, i, a) {
	var o = new jn(e._pt, t, n, 0, 1, a ? hr : mr);
	return e._pt = o, o.b = r, o.e = i, e._props.push(n), o;
}, zr = {
	deg: 1,
	rad: 1,
	turn: 1
}, Br = {
	grid: 1,
	flex: 1
}, Vr = function e(t, n, r, i) {
	var a = parseFloat(r) || 0, o = (r + "").trim().substr((a + "").length) || "px", s = Xn.style, c = or.test(n), l = t.tagName.toLowerCase() === "svg", u = (l ? "client" : "offset") + (c ? "Width" : "Height"), d = 100, f = i === "px", p = i === "%", m, h, g, _;
	if (i === o || !a || zr[i] || zr[o]) return a;
	if (o !== "px" && !f && (a = e(t, n, r, "px")), _ = t.getCTM && Ir(t), (p || o === "%") && (er[n] || ~n.indexOf("adius"))) return m = _ ? t.getBBox()[c ? "width" : "height"] : t[u], K(p ? a / m * d : a / 100 * m);
	if (s[c ? "width" : "height"] = d + (f ? o : i), h = i !== "rem" && ~n.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, _ && (h = (t.ownerSVGElement || {}).parentNode), (!h || h === qn || !h.appendChild) && (h = qn.body), g = h._gsap, g && p && g.width && c && g.time === Vt.time && !g.uncache) return K(a / g.width * d);
	if (p && (n === "height" || n === "width")) {
		var v = t.style[n];
		t.style[n] = d + i, m = t[u], v ? t.style[n] = v : Lr(t, n);
	} else (p || o === "%") && !Br[kr(h, "display")] && (s.position = kr(t, "position")), h === t && (s.position = "static"), h.appendChild(Xn), m = Xn[u], h.removeChild(Xn), s.position = "absolute";
	return c && p && (g = _e(h), g.time = Vt.time, g.width = h[u]), K(f ? m * a / d : m && a ? d / m * a : 0);
}, Hr = function(e, t, n, r) {
	var i;
	return Yn || Mr(), t in cr && t !== "transform" && (t = cr[t], ~t.indexOf(",") && (t = t.split(",")[0])), er[t] && t !== "transform" ? (i = ei(e, r), i = t === "transformOrigin" ? i.svg ? i.origin : ti(kr(e, Sr)) + " " + i.zOrigin + "px" : i[t]) : (i = e.style[t], (!i || i === "auto" || r || ~(i + "").indexOf("calc(")) && (i = qr[t] && qr[t](e, t, n) || kr(e, t) || W(e, t) || +(t === "opacity"))), n && !~(i + "").trim().indexOf(" ") ? Vr(e, t, i, n) + n : i;
}, Ur = function(e, t, n, r) {
	if (!n || n === "none") {
		var a = jr(t, e, 1), o = a && kr(e, a, 1);
		o && o !== n ? (t = a, n = o) : t === "borderColor" && (n = kr(e, "borderTopColor"));
	}
	var s = new jn(this._pt, e.style, t, 0, 1, Tn), c = 0, l = 0, u, d, f, p, m, h, g, _, v, y, b, x;
	if (s.b = n, s.e = r, n += "", r += "", r.substring(0, 6) === "var(--" && (r = kr(e, r.substring(4, r.indexOf(")")))), r === "auto" && (h = e.style[t], e.style[t] = r, r = kr(e, t) || r, h ? e.style[t] = h : Lr(e, t)), u = [n, r], zt(u), n = u[0], r = u[1], f = n.match(j) || [], x = r.match(j) || [], x.length) {
		for (; d = j.exec(r);) g = d[0], v = r.substring(c, d.index), m ? m = (m + 1) % 5 : (v.substr(-5) === "rgba(" || v.substr(-5) === "hsla(") && (m = 1), g !== (h = f[l++] || "") && (p = parseFloat(h) || 0, b = h.substr((p + "").length), g.charAt(1) === "=" && (g = ve(p, g) + b), _ = parseFloat(g), y = g.substr((_ + "").length), c = j.lastIndex - y.length, y || (y = y || i.units[t] || b, c === r.length && (r += y, s.e += y)), b !== y && (p = Vr(e, t, h, y) || 0), s._pt = {
			_next: s._pt,
			p: v || l === 1 ? v : ",",
			s: p,
			c: _ - p,
			m: m && m < 4 || t === "zIndex" ? Math.round : 0
		});
		s.c = c < r.length ? r.substring(c, r.length) : "";
	} else s.r = t === "display" && r === "none" ? hr : mr;
	return N.test(r) && (s.e = 0), this._pt = s, s;
}, Wr = {
	top: "0%",
	bottom: "100%",
	left: "0%",
	right: "100%",
	center: "50%"
}, Gr = function(e) {
	var t = e.split(" "), n = t[0], r = t[1] || "50%";
	return (n === "top" || n === "bottom" || r === "left" || r === "right") && (e = n, n = r, r = e), t[0] = Wr[n] || n, t[1] = Wr[r] || r, t.join(" ");
}, Kr = function(e, t) {
	if (t.tween && t.tween._time === t.tween._dur) {
		var n = t.t, r = n.style, i = t.u, a = n._gsap, o, s, c;
		if (i === "all" || i === !0) r.cssText = "", s = 1;
		else for (i = i.split(","), c = i.length; --c > -1;) o = i[c], er[o] && (s = 1, o = o === "transformOrigin" ? Sr : X), Lr(n, o);
		s && (Lr(n, X), a && (a.svg && n.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", ei(n, 1), a.uncache = 1, wr(r)));
	}
}, qr = { clearProps: function(e, t, n, r, i) {
	if (i.data !== "isFromStart") {
		var a = e._pt = new jn(e._pt, t, n, 0, 0, Kr);
		return a.u = r, a.pr = -10, a.tween = i, e._props.push(n), 1;
	}
} }, Jr = [
	1,
	0,
	0,
	1,
	0,
	0
], Yr = {}, Xr = function(e) {
	return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Zr = function(e) {
	var t = kr(e, X);
	return Xr(t) ? Jr : t.substr(7).match(A).map(K);
}, Qr = function(e, t) {
	var n = e._gsap || _e(e), r = e.style, i = Zr(e), a, o, s, c;
	return n.svg && e.getAttribute("transform") ? (s = e.transform.baseVal.consolidate().matrix, i = [
		s.a,
		s.b,
		s.c,
		s.d,
		s.e,
		s.f
	], i.join(",") === "1,0,0,1,0,0" ? Jr : i) : (i === Jr && !e.offsetParent && e !== Jn && !n.svg && (s = r.display, r.display = "block", a = e.parentNode, (!a || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, o = e.nextElementSibling, Jn.appendChild(e)), i = Zr(e), s ? r.display = s : Lr(e, "display"), c && (o ? a.insertBefore(e, o) : a ? a.appendChild(e) : Jn.removeChild(e))), t && i.length > 6 ? [
		i[0],
		i[1],
		i[4],
		i[5],
		i[12],
		i[13]
	] : i);
}, $r = function(e, t, n, r, i, a) {
	var o = e._gsap, s = i || Qr(e, !0), c = o.xOrigin || 0, l = o.yOrigin || 0, u = o.xOffset || 0, d = o.yOffset || 0, f = s[0], p = s[1], m = s[2], h = s[3], g = s[4], _ = s[5], v = t.split(" "), y = parseFloat(v[0]) || 0, b = parseFloat(v[1]) || 0, x, S, C, w;
	n ? s !== Jr && (S = f * h - p * m) && (C = h / S * y + b * (-m / S) + (m * _ - h * g) / S, w = y * (-p / S) + f / S * b - (f * _ - p * g) / S, y = C, b = w) : (x = Fr(e), y = x.x + (~v[0].indexOf("%") ? y / 100 * x.width : y), b = x.y + (~(v[1] || v[0]).indexOf("%") ? b / 100 * x.height : b)), r || r !== !1 && o.smooth ? (g = y - c, _ = b - l, o.xOffset = u + (g * f + _ * m) - g, o.yOffset = d + (g * p + _ * h) - _) : o.xOffset = o.yOffset = 0, o.xOrigin = y, o.yOrigin = b, o.smooth = !!r, o.origin = t, o.originIsAbsolute = !!n, e.style[Sr] = "0px 0px", a && (Rr(a, o, "xOrigin", c, y), Rr(a, o, "yOrigin", l, b), Rr(a, o, "xOffset", u, o.xOffset), Rr(a, o, "yOffset", d, o.yOffset)), e.setAttribute("data-svg-origin", y + " " + b);
}, ei = function(e, t) {
	var n = e._gsap || new en(e);
	if ("x" in n && !t && !n.uncache) return n;
	var r = e.style, a = n.scaleX < 0, o = "px", s = "deg", c = getComputedStyle(e), l = kr(e, Sr) || "0", u = d = f = h = g = _ = v = y = b = 0, d, f, p = m = 1, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, ee, F, I, L, R, z, B;
	return n.svg = !!(e.getCTM && Ir(e)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (r[X] = (c.translate === "none" ? "" : "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") ") + (c.rotate === "none" ? "" : "rotate(" + c.rotate + ") ") + (c.scale === "none" ? "" : "scale(" + c.scale.split(" ").join(",") + ") ") + (c[X] === "none" ? "" : c[X])), r.scale = r.rotate = r.translate = "none"), C = Qr(e, n.svg), n.svg && (n.uncache ? (P = e.getBBox(), l = n.xOrigin - P.x + "px " + (n.yOrigin - P.y) + "px", N = "") : N = !t && e.getAttribute("data-svg-origin"), $r(e, N || l, !!N || n.originIsAbsolute, n.smooth !== !1, C)), x = n.xOrigin || 0, S = n.yOrigin || 0, C !== Jr && (D = C[0], O = C[1], k = C[2], A = C[3], u = j = C[4], d = M = C[5], C.length === 6 ? (p = Math.sqrt(D * D + O * O), m = Math.sqrt(A * A + k * k), h = D || O ? rr(O, D) * tr : 0, v = k || A ? rr(k, A) * tr + h : 0, v && (m *= Math.abs(Math.cos(v * nr))), n.svg && (u -= x - (x * D + S * k), d -= S - (x * O + S * A))) : (B = C[6], R = C[7], F = C[8], I = C[9], L = C[10], z = C[11], u = C[12], d = C[13], f = C[14], w = rr(B, L), g = w * tr, w && (T = Math.cos(-w), E = Math.sin(-w), N = j * T + F * E, P = M * T + I * E, ee = B * T + L * E, F = j * -E + F * T, I = M * -E + I * T, L = B * -E + L * T, z = R * -E + z * T, j = N, M = P, B = ee), w = rr(-k, L), _ = w * tr, w && (T = Math.cos(-w), E = Math.sin(-w), N = D * T - F * E, P = O * T - I * E, ee = k * T - L * E, z = A * E + z * T, D = N, O = P, k = ee), w = rr(O, D), h = w * tr, w && (T = Math.cos(w), E = Math.sin(w), N = D * T + O * E, P = j * T + M * E, O = O * T - D * E, M = M * T - j * E, D = N, j = P), g && Math.abs(g) + Math.abs(h) > 359.9 && (g = h = 0, _ = 180 - _), p = K(Math.sqrt(D * D + O * O + k * k)), m = K(Math.sqrt(M * M + B * B)), w = rr(j, M), v = Math.abs(w) > 2e-4 ? w * tr : 0, b = z ? 1 / (z < 0 ? -z : z) : 0), n.svg && (N = e.getAttribute("transform"), n.forceCSS = e.setAttribute("transform", "") || !Xr(kr(e, X)), N && e.setAttribute("transform", N))), Math.abs(v) > 90 && Math.abs(v) < 270 && (a ? (p *= -1, v += h <= 0 ? 180 : -180, h += h <= 0 ? 180 : -180) : (m *= -1, v += v <= 0 ? 180 : -180)), t ||= n.uncache, n.x = u - ((n.xPercent = u && (!t && n.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetWidth * n.xPercent / 100 : 0) + o, n.y = d - ((n.yPercent = d && (!t && n.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetHeight * n.yPercent / 100 : 0) + o, n.z = f + o, n.scaleX = K(p), n.scaleY = K(m), n.rotation = K(h) + s, n.rotationX = K(g) + s, n.rotationY = K(_) + s, n.skewX = v + s, n.skewY = y + s, n.transformPerspective = b + o, (n.zOrigin = parseFloat(l.split(" ")[2]) || !t && n.zOrigin || 0) && (r[Sr] = ti(l)), n.xOffset = n.yOffset = 0, n.force3D = i.force3D, n.renderTransform = n.svg ? ci : Dr ? si : ri, n.uncache = 0, n;
}, ti = function(e) {
	return (e = e.split(" "))[0] + " " + e[1];
}, ni = function(e, t, n) {
	var r = at(t);
	return K(parseFloat(t) + parseFloat(Vr(e, "x", n + "px", r))) + r;
}, ri = function(e, t) {
	t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, si(e, t);
}, ii = "0deg", ai = "0px", oi = ") ", si = function(e, t) {
	var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.z, c = n.rotation, l = n.rotationY, u = n.rotationX, d = n.skewX, f = n.skewY, p = n.scaleX, m = n.scaleY, h = n.transformPerspective, g = n.force3D, _ = n.target, v = n.zOrigin, y = "", b = g === "auto" && e && e !== 1 || g === !0;
	if (v && (u !== ii || l !== ii)) {
		var x = parseFloat(l) * nr, S = Math.sin(x), C = Math.cos(x), w;
		x = parseFloat(u) * nr, w = Math.cos(x), a = ni(_, a, S * w * -v), o = ni(_, o, -Math.sin(x) * -v), s = ni(_, s, C * w * -v + v);
	}
	h !== ai && (y += "perspective(" + h + oi), (r || i) && (y += "translate(" + r + "%, " + i + "%) "), (b || a !== ai || o !== ai || s !== ai) && (y += s !== ai || b ? "translate3d(" + a + ", " + o + ", " + s + ") " : "translate(" + a + ", " + o + oi), c !== ii && (y += "rotate(" + c + oi), l !== ii && (y += "rotateY(" + l + oi), u !== ii && (y += "rotateX(" + u + oi), (d !== ii || f !== ii) && (y += "skew(" + d + ", " + f + oi), (p !== 1 || m !== 1) && (y += "scale(" + p + ", " + m + oi), _.style[X] = y || "translate(0, 0)";
}, ci = function(e, t) {
	var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.rotation, c = n.skewX, l = n.skewY, u = n.scaleX, d = n.scaleY, f = n.target, p = n.xOrigin, m = n.yOrigin, h = n.xOffset, g = n.yOffset, _ = n.forceCSS, v = parseFloat(a), y = parseFloat(o), b, x, S, C, w;
	s = parseFloat(s), c = parseFloat(c), l = parseFloat(l), l && (l = parseFloat(l), c += l, s += l), s || c ? (s *= nr, c *= nr, b = Math.cos(s) * u, x = Math.sin(s) * u, S = Math.sin(s - c) * -d, C = Math.cos(s - c) * d, c && (l *= nr, w = Math.tan(c - l), w = Math.sqrt(1 + w * w), S *= w, C *= w, l && (w = Math.tan(l), w = Math.sqrt(1 + w * w), b *= w, x *= w)), b = K(b), x = K(x), S = K(S), C = K(C)) : (b = u, C = d, x = S = 0), (v && !~(a + "").indexOf("px") || y && !~(o + "").indexOf("px")) && (v = Vr(f, "x", a, "px"), y = Vr(f, "y", o, "px")), (p || m || h || g) && (v = K(v + p - (p * b + m * S) + h), y = K(y + m - (p * x + m * C) + g)), (r || i) && (w = f.getBBox(), v = K(v + r / 100 * w.width), y = K(y + i / 100 * w.height)), w = "matrix(" + b + "," + x + "," + S + "," + C + "," + v + "," + y + ")", f.setAttribute("transform", w), _ && (f.style[X] = w);
}, li = function(e, t, n, r, i) {
	var a = 360, o = _(i), s = parseFloat(i) * (o && ~i.indexOf("rad") ? tr : 1) - r, c = r + s + "deg", l, u;
	return o && (l = i.split("_")[1], l === "short" && (s %= a, s !== s % (a / 2) && (s += s < 0 ? a : -a)), l === "cw" && s < 0 ? s = (s + a * ir) % a - ~~(s / a) * a : l === "ccw" && s > 0 && (s = (s - a * ir) % a - ~~(s / a) * a)), e._pt = u = new jn(e._pt, t, n, r, s, ur), u.e = c, u.u = "deg", e._props.push(n), u;
}, ui = function(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}, di = function(e, t, n) {
	var r = ui({}, n._gsap), i = "perspective,force3D,transformOrigin,svgOrigin", a = n.style, o, s, c, l, u, d, f, p;
	for (s in r.svg ? (c = n.getAttribute("transform"), n.setAttribute("transform", ""), a[X] = t, o = ei(n, 1), Lr(n, X), n.setAttribute("transform", c)) : (c = getComputedStyle(n)[X], a[X] = t, o = ei(n, 1), a[X] = c), er) c = r[s], l = o[s], c !== l && i.indexOf(s) < 0 && (f = at(c), p = at(l), u = f === p ? parseFloat(c) : Vr(n, s, c, p), d = parseFloat(l), e._pt = new jn(e._pt, o, s, u, d - u, lr), e._pt.u = p || 0, e._props.push(s));
	ui(o, r);
};
G("padding,margin,Width,Radius", function(e, t) {
	var n = "Top", r = "Right", i = "Bottom", a = "Left", o = (t < 3 ? [
		n,
		r,
		i,
		a
	] : [
		n + a,
		n + r,
		i + r,
		i + a
	]).map(function(n) {
		return t < 2 ? e + n : "border" + n + e;
	});
	qr[t > 1 ? "border" + e : e] = function(e, t, n, r, i) {
		var a, s;
		if (arguments.length < 4) return a = o.map(function(t) {
			return Hr(e, t, n);
		}), s = a.join(" "), s.split(a[0]).length === 5 ? a[0] : s;
		a = (r + "").split(" "), s = {}, o.forEach(function(e, t) {
			return s[e] = a[t] = a[t] || a[(t - 1) / 2 | 0];
		}), e.init(t, s, i);
	};
});
var fi = {
	name: "css",
	register: Mr,
	targetTest: function(e) {
		return e.style && e.nodeType;
	},
	init: function(e, t, n, r, a) {
		var o = this._props, s = e.style, c = n.vars.startAt, l, u, d, f, p, m, h, g, v, y, b, x, S, C, w, T, E;
		for (h in Yn || Mr(), this.styles = this.styles || Er(e), T = this.styles.props, this.tween = n, t) if (h !== "autoRound" && (u = t[h], !(de[h] && sn(h, t, n, r, e, a)))) {
			if (p = typeof u, m = qr[h], p === "function" && (u = u.call(n, r, e, a), p = typeof u), p === "string" && ~u.indexOf("random(") && (u = Ct(u)), m) m(this, e, h, u, n) && (w = 1);
			else if (h.substr(0, 2) === "--") l = (getComputedStyle(e).getPropertyValue(h) + "").trim(), u += "", Lt.lastIndex = 0, Lt.test(l) || (g = at(l), v = at(u), v ? g !== v && (l = Vr(e, h, l, v) + v) : g && (u += g)), this.add(s, "setProperty", l, u, r, a, 0, 0, h), o.push(h), T.push(h, 0, s[h]);
			else if (p !== "undefined") {
				if (c && h in c ? (l = typeof c[h] == "function" ? c[h].call(n, r, e, a) : c[h], _(l) && ~l.indexOf("random(") && (l = Ct(l)), at(l + "") || l === "auto" || (l += i.units[h] || at(Hr(e, h)) || ""), (l + "").charAt(1) === "=" && (l = Hr(e, h))) : l = Hr(e, h), f = parseFloat(l), y = p === "string" && u.charAt(1) === "=" && u.substr(0, 2), y && (u = u.substr(2)), d = parseFloat(u), h in cr && (h === "autoAlpha" && (f === 1 && Hr(e, "visibility") === "hidden" && d && (f = 0), T.push("visibility", 0, s.visibility), Rr(this, s, "visibility", f ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), h !== "scale" && h !== "transform" && (h = cr[h], ~h.indexOf(",") && (h = h.split(",")[0]))), b = h in er, b) {
					if (this.styles.save(h), E = u, p === "string" && u.substring(0, 6) === "var(--") {
						if (u = kr(e, u.substring(4, u.indexOf(")"))), u.substring(0, 5) === "calc(") {
							var D = e.style.perspective;
							e.style.perspective = u, u = kr(e, "perspective"), D ? e.style.perspective = D : Lr(e, "perspective");
						}
						d = parseFloat(u);
					}
					if (x || (S = e._gsap, S.renderTransform && !t.parseTransform || ei(e, t.parseTransform), C = t.smoothOrigin !== !1 && S.smooth, x = this._pt = new jn(this._pt, s, X, 0, 1, S.renderTransform, S, 0, -1), x.dep = 1), h === "scale") this._pt = new jn(this._pt, S, "scaleY", S.scaleY, (y ? ve(S.scaleY, y + d) : d) - S.scaleY || 0, lr), this._pt.u = 0, o.push("scaleY", h), h += "X";
					else if (h === "transformOrigin") {
						T.push(Sr, 0, s[Sr]), u = Gr(u), S.svg ? $r(e, u, 0, C, 0, this) : (v = parseFloat(u.split(" ")[2]) || 0, v !== S.zOrigin && Rr(this, S, "zOrigin", S.zOrigin, v), Rr(this, s, h, ti(l), ti(u)));
						continue;
					} else if (h === "svgOrigin") {
						$r(e, u, 1, C, 0, this);
						continue;
					} else if (h in Yr) {
						li(this, S, h, f, y ? ve(f, y + u) : u);
						continue;
					} else if (h === "smoothOrigin") {
						Rr(this, S, "smooth", S.smooth, u);
						continue;
					} else if (h === "force3D") {
						S[h] = u;
						continue;
					} else if (h === "transform") {
						di(this, u, e);
						continue;
					}
				} else h in s || (h = jr(h) || h);
				if (b || (d || d === 0) && (f || f === 0) && !sr.test(u) && h in s) g = (l + "").substr((f + "").length), d ||= 0, v = at(u) || (h in i.units ? i.units[h] : g), g !== v && (f = Vr(e, h, l, v)), this._pt = new jn(this._pt, b ? S : s, h, f, (y ? ve(f, y + d) : d) - f, !b && (v === "px" || h === "zIndex") && t.autoRound !== !1 ? pr : lr), this._pt.u = v || 0, b && E !== u ? (this._pt.b = l, this._pt.e = E, this._pt.r = fr) : g !== v && v !== "%" && (this._pt.b = l, this._pt.r = dr);
				else if (h in s) Ur.call(this, e, h, l, y ? y + u : u);
				else if (h in e) this.add(e, h, l || e[h], y ? y + u : u, r, a);
				else if (h !== "parseTransform") {
					V(h, u);
					continue;
				}
				b || (h in s ? T.push(h, 0, s[h]) : typeof e[h] == "function" ? T.push(h, 2, e[h]()) : T.push(h, 1, l || e[h])), o.push(h);
			}
		}
		w && An(this);
	},
	render: function(e, t) {
		if (t.tween._time || !Qn()) for (var n = t._pt; n;) n.r(e, n.d), n = n._next;
		else t.styles.revert();
	},
	get: Hr,
	aliases: cr,
	getSetter: function(e, t, n) {
		var r = cr[t];
		return r && r.indexOf(",") < 0 && (t = r), t in er && t !== Sr && (e._gsap.x || Hr(e, "x")) ? n && Zn === n ? t === "scale" ? yr : vr : (Zn = n || {}) && (t === "scale" ? br : xr) : e.style && !b(e.style[t]) ? gr : ~t.indexOf("-") ? _r : Sn(e, t);
	},
	core: {
		_removeProperty: Lr,
		_getMatrix: Qr
	}
};
Gn.utils.checkPrefix = jr, Gn.core.getStyleSaver = Er, (function(e, t, n, r) {
	var a = G(e + "," + t + "," + n, function(e) {
		er[e] = 1;
	});
	G(t, function(e) {
		i.units[e] = "deg", Yr[e] = 1;
	}), cr[a[13]] = e + "," + t, G(r, function(e) {
		var t = e.split(":");
		cr[t[1]] = a[t[0]];
	});
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"), G("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(e) {
	i.units[e] = "px";
}), Gn.registerPlugin(fi);
//#endregion
//#region node_modules/gsap/index.js
var Z = Gn.registerPlugin(fi) || Gn;
Z.core.Tween;
//#endregion
//#region node_modules/gsap/utils/matrix.js
var pi, mi, hi, gi, _i, vi, yi, bi, xi = "transform", Si = xi + "Origin", Ci, wi = function(e) {
	var t = e.ownerDocument || e;
	for (!(xi in e.style) && ("msTransform" in e.style) && (xi = "msTransform", Si = xi + "Origin"); t.parentNode && (t = t.parentNode););
	if (mi = window, yi = new Li(), t) {
		pi = t, hi = t.documentElement, gi = t.body, bi = pi.createElementNS("http://www.w3.org/2000/svg", "g"), bi.style.transform = "none";
		var n = t.createElement("div"), r = t.createElement("div"), i = t && (t.body || t.firstElementChild);
		i && i.appendChild && (i.appendChild(n), n.appendChild(r), n.style.position = "static", n.style.transform = "translate3d(0,0,1px)", Ci = r.offsetParent !== n, i.removeChild(n));
	}
	return t;
}, Ti = function(e) {
	for (var t, n; e && e !== gi;) n = e._gsap, n && n.uncache && n.get(e, "x"), n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4, n.renderTransform(1, n), t ? t.push(n) : t = [n]), e = e.parentNode;
	return t;
}, Ei = [], Di = [], Oi = function() {
	return mi.pageYOffset || pi.scrollTop || hi.scrollTop || gi.scrollTop || 0;
}, ki = function() {
	return mi.pageXOffset || pi.scrollLeft || hi.scrollLeft || gi.scrollLeft || 0;
}, Ai = function(e) {
	return e.ownerSVGElement || ((e.tagName + "").toLowerCase() === "svg" ? e : null);
}, ji = function e(t) {
	if (mi.getComputedStyle(t).position === "fixed") return !0;
	if (t = t.parentNode, t && t.nodeType === 1) return e(t);
}, Mi = function e(t, n) {
	if (t.parentNode && (pi || wi(t))) {
		var r = Ai(t), i = r ? r.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", a = r ? n ? "rect" : "g" : "div", o = n === 2 ? 100 : 0, s = n === 3 ? 100 : 0, c = {
			position: "absolute",
			display: "block",
			pointerEvents: "none",
			margin: "0",
			padding: "0"
		}, l = pi.createElementNS ? pi.createElementNS(i.replace(/^https/, "http"), a) : pi.createElement(a);
		return n && (r ? (vi ||= e(t), l.setAttribute("width", .01), l.setAttribute("height", .01), l.setAttribute("transform", "translate(" + o + "," + s + ")"), l.setAttribute("fill", "transparent"), vi.appendChild(l)) : (_i || (_i = e(t), Object.assign(_i.style, c)), Object.assign(l.style, c, {
			width: "0.1px",
			height: "0.1px",
			top: s + "px",
			left: o + "px"
		}), _i.appendChild(l))), l;
	}
	throw "Need document and parent.";
}, Ni = function(e) {
	for (var t = new Li(), n = 0; n < e.numberOfItems; n++) t.multiply(e.getItem(n).matrix);
	return t;
}, Pi = function(e) {
	var t = e.getCTM(), n;
	return t || (n = e.style[xi], e.style[xi] = "none", e.appendChild(bi), t = bi.getCTM(), e.removeChild(bi), n ? e.style[xi] = n : e.style.removeProperty(xi.replace(/([A-Z])/g, "-$1").toLowerCase())), t || yi.clone();
}, Fi = function(e, t) {
	var n = Ai(e), r = e === n, i = n ? Ei : Di, a = e.parentNode, o = a && !n && a.shadowRoot && a.shadowRoot.appendChild ? a.shadowRoot : a, s, c, l, u, d, f;
	if (e === mi) return e;
	if (i.length || i.push(Mi(e, 1), Mi(e, 2), Mi(e, 3)), s = n ? vi : _i, n) r ? (l = Pi(e), u = -l.e / l.a, d = -l.f / l.d, c = yi) : e.getBBox ? (l = e.getBBox(), c = e.transform ? e.transform.baseVal : {}, c = c.numberOfItems ? c.numberOfItems > 1 ? Ni(c) : c.getItem(0).matrix : yi, u = c.a * l.x + c.c * l.y, d = c.b * l.x + c.d * l.y) : (c = new Li(), u = d = 0), t && e.tagName.toLowerCase() === "g" && (u = d = 0), (r || !e.getBoundingClientRect().width ? n : a).appendChild(s), s.setAttribute("transform", "matrix(" + c.a + "," + c.b + "," + c.c + "," + c.d + "," + (c.e + u) + "," + (c.f + d) + ")");
	else {
		if (u = d = 0, Ci) for (c = e.offsetParent, l = e; (l &&= l.parentNode) && l !== c && l.parentNode;) (mi.getComputedStyle(l)[xi] + "").length > 4 && (u = l.offsetLeft, d = l.offsetTop, l = 0);
		if (f = mi.getComputedStyle(e), f.position !== "absolute" && f.position !== "fixed") for (c = e.offsetParent; a && a !== c;) u += a.scrollLeft || 0, d += a.scrollTop || 0, a = a.parentNode;
		l = s.style, l.top = e.offsetTop - d + "px", l.left = e.offsetLeft - u + "px", l[xi] = f[xi], l[Si] = f[Si], l.position = f.position === "fixed" ? "fixed" : "absolute", o.appendChild(s);
	}
	return s;
}, Ii = function(e, t, n, r, i, a, o) {
	return e.a = t, e.b = n, e.c = r, e.d = i, e.e = a, e.f = o, e;
}, Li = /*#__PURE__*/ function() {
	function e(e, t, n, r, i, a) {
		e === void 0 && (e = 1), t === void 0 && (t = 0), n === void 0 && (n = 0), r === void 0 && (r = 1), i === void 0 && (i = 0), a === void 0 && (a = 0), Ii(this, e, t, n, r, i, a);
	}
	var t = e.prototype;
	return t.inverse = function() {
		var e = this.a, t = this.b, n = this.c, r = this.d, i = this.e, a = this.f, o = e * r - t * n || 1e-10;
		return Ii(this, r / o, -t / o, -n / o, e / o, (n * a - r * i) / o, -(e * a - t * i) / o);
	}, t.multiply = function(e) {
		var t = this.a, n = this.b, r = this.c, i = this.d, a = this.e, o = this.f, s = e.a, c = e.c, l = e.b, u = e.d, d = e.e, f = e.f;
		return Ii(this, s * t + l * r, s * n + l * i, c * t + u * r, c * n + u * i, a + d * t + f * r, o + d * n + f * i);
	}, t.clone = function() {
		return new e(this.a, this.b, this.c, this.d, this.e, this.f);
	}, t.equals = function(e) {
		var t = this.a, n = this.b, r = this.c, i = this.d, a = this.e, o = this.f;
		return t === e.a && n === e.b && r === e.c && i === e.d && a === e.e && o === e.f;
	}, t.apply = function(e, t) {
		t === void 0 && (t = {});
		var n = e.x, r = e.y, i = this.a, a = this.b, o = this.c, s = this.d, c = this.e, l = this.f;
		return t.x = n * i + r * o + c || 0, t.y = n * a + r * s + l || 0, t;
	}, e;
}();
function Ri(e, t, n, r) {
	if (!e || !e.parentNode || (pi || wi(e)).documentElement === e) return new Li();
	var i = Ti(e), a = Ai(e) ? Ei : Di, o = Fi(e, n), s = a[0].getBoundingClientRect(), c = a[1].getBoundingClientRect(), l = a[2].getBoundingClientRect(), u = o.parentNode, d = !r && ji(e), f = new Li((c.left - s.left) / 100, (c.top - s.top) / 100, (l.left - s.left) / 100, (l.top - s.top) / 100, s.left + (d ? 0 : ki()), s.top + (d ? 0 : Oi()));
	if (u.removeChild(o), i) for (s = i.length; s--;) c = i[s], c.scaleX = c.scaleY = 0, c.renderTransform(1, c);
	return t ? f.inverse() : f;
}
//#endregion
//#region node_modules/gsap/Draggable.js
function zi(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Bi(e, t) {
	e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
var Q, $, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa = 0, oa = function() {
	return typeof window < "u";
}, sa = function() {
	return Q || oa() && (Q = window.gsap) && Q.registerPlugin && Q;
}, ca = function(e) {
	return typeof e == "function";
}, la = function(e) {
	return typeof e == "object";
}, ua = function(e) {
	return e === void 0;
}, da = function() {
	return !1;
}, fa = "transform", pa = "transformOrigin", ma = function(e) {
	return Math.round(e * 1e4) / 1e4;
}, ha = Array.isArray, ga = function(e, t) {
	var n = Vi.createElementNS ? Vi.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Vi.createElement(e);
	return n.style ? n : Vi.createElement(e);
}, _a = 180 / Math.PI, va = 0x56bc75e2d63100000, ya = new Li(), ba = Date.now || function() {
	return (/* @__PURE__ */ new Date()).getTime();
}, xa = [], Sa = {}, Ca = 0, wa = /^(?:a|input|textarea|button|select)$/i, Ta = 0, Ea = {}, Da = {}, Oa = function(e, t) {
	var n = {}, r;
	for (r in e) n[r] = t ? e[r] * t : e[r];
	return n;
}, ka = function(e, t) {
	for (var n in t) n in e || (e[n] = t[n]);
	return e;
}, Aa = function e(t, n) {
	for (var r = t.length, i; r--;) n ? t[r].style.touchAction = n : t[r].style.removeProperty("touch-action"), i = t[r].children, i && i.length && e(i, n);
}, ja = function() {
	return xa.forEach(function(e) {
		return e();
	});
}, Ma = function(e) {
	xa.push(e), xa.length === 1 && Q.ticker.add(ja);
}, Na = function() {
	return !xa.length && Q.ticker.remove(ja);
}, Pa = function(e) {
	for (var t = xa.length; t--;) xa[t] === e && xa.splice(t, 1);
	Q.to(Na, {
		overwrite: !0,
		delay: 15,
		duration: 0,
		onComplete: Na,
		data: "_draggable"
	});
}, Fa = function(e, t) {
	for (var n in t) n in e || (e[n] = t[n]);
	return e;
}, Ia = function(e, t, n, r) {
	if (e.addEventListener) {
		var i = Zi[t];
		r ||= Yi ? { passive: !1 } : null, e.addEventListener(i || t, n, r), i && t !== i && e.addEventListener(t, n, r);
	}
}, La = function(e, t, n, r) {
	if (e.removeEventListener) {
		var i = Zi[t];
		e.removeEventListener(i || t, n, r), i && t !== i && e.removeEventListener(t, n, r);
	}
}, Ra = function(e) {
	e.preventDefault && e.preventDefault(), e.preventManipulation && e.preventManipulation();
}, za = function(e, t) {
	for (var n = e.length; n--;) if (e[n].identifier === t) return !0;
}, Ba = function e(t) {
	Qi = t.touches && aa < t.touches.length, La(t.target, "touchend", e);
}, Va = function(e) {
	Qi = e.touches && aa < e.touches.length, Ia(e.target, "touchend", Ba);
}, Ha = function(e) {
	return $.pageYOffset || e.scrollTop || e.documentElement.scrollTop || e.body.scrollTop || 0;
}, Ua = function(e) {
	return $.pageXOffset || e.scrollLeft || e.documentElement.scrollLeft || e.body.scrollLeft || 0;
}, Wa = function e(t, n) {
	Ia(t, "scroll", n), Ka(t.parentNode) || e(t.parentNode, n);
}, Ga = function e(t, n) {
	La(t, "scroll", n), Ka(t.parentNode) || e(t.parentNode, n);
}, Ka = function(e) {
	return !(e && e !== Hi && e.nodeType !== 9 && e !== Vi.body && e !== $ && e.nodeType && e.parentNode);
}, qa = function(e, t) {
	var n = t === "x" ? "Width" : "Height", r = "scroll" + n, i = "client" + n;
	return Math.max(0, Ka(e) ? Math.max(Hi[r], Ui[r]) - ($["inner" + n] || Hi[i] || Ui[i]) : e[r] - e[i]);
}, Ja = function e(t, n) {
	var r = qa(t, "x"), i = qa(t, "y");
	Ka(t) ? t = Da : e(t.parentNode, n), t._gsMaxScrollX = r, t._gsMaxScrollY = i, n || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, Ya = function(e, t, n) {
	var r = e.style;
	r && (ua(r[t]) && (t = qi(t, e) || t), n == null ? r.removeProperty && r.removeProperty(t.replace(/([A-Z])/g, "-$1").toLowerCase()) : r[t] = n);
}, Xa = function(e) {
	return $.getComputedStyle(e instanceof Element ? e : e.host || (e.parentNode || {}).host || e);
}, Za = {}, Qa = function(e) {
	if (e === $) return Za.left = Za.top = 0, Za.width = Za.right = Hi.clientWidth || e.innerWidth || Ui.clientWidth || 0, Za.height = Za.bottom = (e.innerHeight || 0) - 20 < Hi.clientHeight ? Hi.clientHeight : e.innerHeight || Ui.clientHeight || 0, Za;
	var t = e.ownerDocument || Vi, n = ua(e.pageX) ? !e.nodeType && !ua(e.left) && !ua(e.top) ? e : Ji(e)[0].getBoundingClientRect() : {
		left: e.pageX - Ua(t),
		top: e.pageY - Ha(t),
		right: e.pageX - Ua(t) + 1,
		bottom: e.pageY - Ha(t) + 1
	};
	return ua(n.right) && !ua(n.width) ? (n.right = n.left + n.width, n.bottom = n.top + n.height) : ua(n.width) && (n = {
		width: n.right - n.left,
		height: n.bottom - n.top,
		right: n.right,
		left: n.left,
		bottom: n.bottom,
		top: n.top
	}), n;
}, $a = function(e, t, n) {
	var r = e.vars, i = r[n], a = e._listeners[t], o;
	return ca(i) && (o = i.apply(r.callbackScope || e, r[n + "Params"] || [e.pointerEvent])), a && e.dispatchEvent(t) === !1 && (o = !1), o;
}, eo = function(e, t) {
	var n = Ji(e)[0], r, i, a;
	return !n.nodeType && n !== $ ? ua(e.left) ? (i = e.min || e.minX || e.minRotation || 0, r = e.min || e.minY || 0, {
		left: i,
		top: r,
		width: (e.max || e.maxX || e.maxRotation || 0) - i,
		height: (e.max || e.maxY || 0) - r
	}) : (a = {
		x: 0,
		y: 0
	}, {
		left: e.left - a.x,
		top: e.top - a.y,
		width: e.width,
		height: e.height
	}) : no(n, t);
}, to = {}, no = function(e, t) {
	t = Ji(t)[0];
	var n = e.getBBox && e.ownerSVGElement, r = e.ownerDocument || Vi, i, a, o, s, c, l, u, d, f, p, m, h, g;
	if (e === $) o = Ha(r), i = Ua(r), a = i + (r.documentElement.clientWidth || e.innerWidth || r.body.clientWidth || 0), s = o + ((e.innerHeight || 0) - 20 < r.documentElement.clientHeight ? r.documentElement.clientHeight : e.innerHeight || r.body.clientHeight || 0);
	else if (t === $ || ua(t)) return e.getBoundingClientRect();
	else i = o = 0, n ? (p = e.getBBox(), m = p.width, h = p.height) : (e.viewBox && (p = e.viewBox.baseVal) && (i = p.x || 0, o = p.y || 0, m = p.width, h = p.height), m || (g = Xa(e), p = g.boxSizing === "border-box", m = (parseFloat(g.width) || e.clientWidth || 0) + (p ? 0 : parseFloat(g.borderLeftWidth) + parseFloat(g.borderRightWidth)), h = (parseFloat(g.height) || e.clientHeight || 0) + (p ? 0 : parseFloat(g.borderTopWidth) + parseFloat(g.borderBottomWidth)))), a = m, s = h;
	return e === t ? {
		left: i,
		top: o,
		width: a - i,
		height: s - o
	} : (c = Ri(t, !0).multiply(Ri(e)), l = c.apply({
		x: i,
		y: o
	}), u = c.apply({
		x: a,
		y: o
	}), d = c.apply({
		x: a,
		y: s
	}), f = c.apply({
		x: i,
		y: s
	}), i = Math.min(l.x, u.x, d.x, f.x), o = Math.min(l.y, u.y, d.y, f.y), {
		left: i,
		top: o,
		width: Math.max(l.x, u.x, d.x, f.x) - i,
		height: Math.max(l.y, u.y, d.y, f.y) - o
	});
}, ro = function(e, t, n, r, i, a) {
	var o = {}, s, c, l;
	if (t) {
		if (i !== 1 && t instanceof Array) {
			if (o.end = s = [], l = t.length, la(t[0])) for (c = 0; c < l; c++) s[c] = Oa(t[c], i);
			else for (c = 0; c < l; c++) s[c] = t[c] * i;
			n += 1.1, r -= 1.1;
		} else o.end = ca(t) ? function(n) {
			var r = t.call(e, n), a, o;
			if (i !== 1) {
				if (la(r)) {
					for (o in a = {}, r) a[o] = r[o] * i;
					r = a;
				} else r *= i;
			}
			return r;
		} : t;
	}
	return (n || n === 0) && (o.max = n), (r || r === 0) && (o.min = r), a && (o.velocity = 0), o;
}, io = function e(t) {
	var n;
	return !t || !t.getAttribute || t === Ui ? !1 : (n = t.getAttribute("data-clickable")) === "true" || n !== "false" && (wa.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : e(t.parentNode);
}, ao = function(e, t) {
	for (var n = e.length, r; n--;) r = e[n], r.ondragstart = r.onselectstart = t ? null : da, Q.set(r, {
		lazy: !0,
		userSelect: t ? "text" : "none"
	});
}, oo = function e(t) {
	if (Xa(t).position === "fixed") return !0;
	if (t = t.parentNode, t && t.nodeType === 1) return e(t);
}, so, co, lo = function(e, t) {
	e = Q.utils.toArray(e)[0], t ||= {};
	var n = document.createElement("div"), r = n.style, i = e.firstChild, a = 0, o = 0, s = e.scrollTop, c = e.scrollLeft, l = e.scrollWidth, u = e.scrollHeight, d = 0, f = 0, p = 0, m, h, g, _, v, y;
	so && t.force3D !== !1 ? (v = "translate3d(", y = "px,0px)") : fa && (v = "translate(", y = "px)"), this.scrollTop = function(e, t) {
		if (!arguments.length) return -this.top();
		this.top(-e, t);
	}, this.scrollLeft = function(e, t) {
		if (!arguments.length) return -this.left();
		this.left(-e, t);
	}, this.left = function(n, i) {
		if (!arguments.length) return -(e.scrollLeft + o);
		var s = e.scrollLeft - c, l = o;
		(s > 2 || s < -2) && !i ? (c = e.scrollLeft, Q.killTweensOf(this, {
			left: 1,
			scrollLeft: 1
		}), this.left(-c), t.onKill && t.onKill()) : (n = -n, n < 0 ? (o = n - .5 | 0, n = 0) : n > f ? (o = n - f | 0, n = f) : o = 0, (o || l) && (this._skip || (r[fa] = v + -o + "px," + -a + y), o + d >= 0 && (r.paddingRight = o + d + "px")), e.scrollLeft = n | 0, c = e.scrollLeft);
	}, this.top = function(n, i) {
		if (!arguments.length) return -(e.scrollTop + a);
		var c = e.scrollTop - s, l = a;
		(c > 2 || c < -2) && !i ? (s = e.scrollTop, Q.killTweensOf(this, {
			top: 1,
			scrollTop: 1
		}), this.top(-s), t.onKill && t.onKill()) : (n = -n, n < 0 ? (a = n - .5 | 0, n = 0) : n > p ? (a = n - p | 0, n = p) : a = 0, (a || l) && (this._skip || (r[fa] = v + -o + "px," + -a + y)), e.scrollTop = n | 0, s = e.scrollTop);
	}, this.maxScrollTop = function() {
		return p;
	}, this.maxScrollLeft = function() {
		return f;
	}, this.disable = function() {
		for (i = n.firstChild; i;) _ = i.nextSibling, e.appendChild(i), i = _;
		e === n.parentNode && e.removeChild(n);
	}, this.enable = function() {
		if (i = e.firstChild, i !== n) {
			for (; i;) _ = i.nextSibling, n.appendChild(i), i = _;
			e.appendChild(n), this.calibrate();
		}
	}, this.calibrate = function(t) {
		var i = e.clientWidth === m, _, v, y;
		s = e.scrollTop, c = e.scrollLeft, (!i || e.clientHeight !== h || n.offsetHeight !== g || l !== e.scrollWidth || u !== e.scrollHeight || t) && ((a || o) && (v = this.left(), y = this.top(), this.left(-e.scrollLeft), this.top(-e.scrollTop)), _ = Xa(e), (!i || t) && (r.display = "block", r.width = "auto", r.paddingRight = "0px", d = Math.max(0, e.scrollWidth - e.clientWidth), d && (d += parseFloat(_.paddingLeft) + (co ? parseFloat(_.paddingRight) : 0))), r.display = "inline-block", r.position = "relative", r.overflow = "visible", r.verticalAlign = "top", r.boxSizing = "content-box", r.width = "100%", r.paddingRight = d + "px", co && (r.paddingBottom = _.paddingBottom), m = e.clientWidth, h = e.clientHeight, l = e.scrollWidth, u = e.scrollHeight, f = e.scrollWidth - m, p = e.scrollHeight - h, g = n.offsetHeight, r.display = "block", (v || y) && (this.left(v), this.top(y)));
	}, this.content = n, this.element = e, this._skip = !1, this.enable();
}, uo = function(e) {
	if (oa() && document.body) {
		var t = window && window.navigator;
		$ = window, Vi = document, Hi = Vi.documentElement, Ui = Vi.body, Wi = ga("div"), na = !!window.PointerEvent, Gi = ga("div"), Gi.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", ta = Gi.style.cursor === "grab" ? "grab" : "move", $i = t && t.userAgent.toLowerCase().indexOf("android") !== -1, Xi = "ontouchstart" in Hi && "orientation" in $ || t && (t.MaxTouchPoints > 0 || t.msMaxTouchPoints > 0), co = function() {
			var e = ga("div"), t = ga("div"), n = t.style, r = Ui, i;
			return n.display = "inline-block", n.position = "relative", e.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", e.appendChild(t), r.appendChild(e), i = t.offsetHeight + 18 > e.scrollHeight, r.removeChild(e), i;
		}(), Zi = function(e) {
			for (var t = e.split(","), n = ("onpointerdown" in Wi ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in Wi ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : e).split(","), r = {}, i = 4; --i > -1;) r[t[i]] = n[i], r[n[i]] = t[i];
			try {
				Hi.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() {
					Yi = 1;
				} }));
			} catch {}
			return r;
		}("touchstart,touchmove,touchend,touchcancel"), Ia(Vi, "touchcancel", da), Ia($, "touchmove", da), Ui && Ui.addEventListener("touchstart", da), Ia(Vi, "contextmenu", function() {
			for (var e in Sa) Sa[e].isPressed && Sa[e].endDrag();
		}), Q = Ki = sa();
	}
	Q ? (ea = Q.plugins.inertia, ra = Q.core.context || function() {}, qi = Q.utils.checkPrefix, fa = qi(fa), pa = qi(pa), Ji = Q.utils.toArray, ia = Q.core.getStyleSaver, so = !!qi("perspective")) : e && console.warn("Please gsap.registerPlugin(Draggable)");
}, fo = /*#__PURE__*/ function(e) {
	Bi(t, e);
	function t(n, r) {
		var i = e.call(this) || this;
		Ki || uo(1), n = Ji(n)[0], i.styles = ia && ia(n, "transform,left,top"), ea ||= Q.plugins.inertia, i.vars = r = Oa(r || {}), i.target = n, i.x = i.y = i.rotation = 0, i.dragResistance = parseFloat(r.dragResistance) || 0, i.edgeResistance = isNaN(r.edgeResistance) ? 1 : parseFloat(r.edgeResistance) || 0, i.lockAxis = r.lockAxis, i.autoScroll = r.autoScroll || 0, i.lockedAxis = null, i.allowEventDefault = !!r.allowEventDefault, Q.getProperty(n, "x");
		var a = (r.type || "x,y").toLowerCase(), o = ~a.indexOf("x") || ~a.indexOf("y"), s = a.indexOf("rotation") !== -1, c = s ? "rotation" : o ? "x" : "left", l = o ? "y" : "top", u = !!(~a.indexOf("x") || ~a.indexOf("left") || a === "scroll"), d = !!(~a.indexOf("y") || ~a.indexOf("top") || a === "scroll"), f = r.minimumMovement || 2, p = zi(i), m = Ji(r.trigger || r.handle || n), h = {}, g = 0, _ = !1, v = r.autoScrollMarginTop || 40, y = r.autoScrollMarginRight || 40, b = r.autoScrollMarginBottom || 40, x = r.autoScrollMarginLeft || 40, S = r.clickableTest || io, C = 0, w = n._gsap || Q.core.getCache(n), T = oo(n), E = function(e, t) {
			return parseFloat(w.get(n, e, t));
		}, D = n.ownerDocument || Vi, O, k, A, j, M, N, P, ee, F, I, L, R, z, B, te, ne, V, re, H, ie, ae, oe, se, U, ce, le, ue, de, fe, pe, me, he, ge, _e = function(e) {
			return Ra(e), e.stopImmediatePropagation && e.stopImmediatePropagation(), !1;
		}, W = function e(t) {
			if (p.autoScroll && p.isDragging && (_ || V)) {
				var r = n, i = p.autoScroll * 15, a, c, l, f, m, h, g, S;
				for (_ = !1, Da.scrollTop = $.pageYOffset == null ? D.documentElement.scrollTop == null ? D.body.scrollTop : D.documentElement.scrollTop : $.pageYOffset, Da.scrollLeft = $.pageXOffset == null ? D.documentElement.scrollLeft == null ? D.body.scrollLeft : D.documentElement.scrollLeft : $.pageXOffset, f = p.pointerX - Da.scrollLeft, m = p.pointerY - Da.scrollTop; r && !c;) c = Ka(r.parentNode), a = c ? Da : r.parentNode, l = c ? {
					bottom: Math.max(Hi.clientHeight, $.innerHeight || 0),
					right: Math.max(Hi.clientWidth, $.innerWidth || 0),
					left: 0,
					top: 0
				} : a.getBoundingClientRect(), h = g = 0, d && (S = a._gsMaxScrollY - a.scrollTop, S < 0 ? g = S : m > l.bottom - b && S ? (_ = !0, g = Math.min(S, i * (1 - Math.max(0, l.bottom - m) / b) | 0)) : m < l.top + v && a.scrollTop && (_ = !0, g = -Math.min(a.scrollTop, i * (1 - Math.max(0, m - l.top) / v) | 0)), g && (a.scrollTop += g)), u && (S = a._gsMaxScrollX - a.scrollLeft, S < 0 ? h = S : f > l.right - y && S ? (_ = !0, h = Math.min(S, i * (1 - Math.max(0, l.right - f) / y) | 0)) : f < l.left + x && a.scrollLeft && (_ = !0, h = -Math.min(a.scrollLeft, i * (1 - Math.max(0, f - l.left) / x) | 0)), h && (a.scrollLeft += h)), c && (h || g) && ($.scrollTo(a.scrollLeft, a.scrollTop), Oe(p.pointerX + h, p.pointerY + g)), r = a;
			}
			if (V) {
				var C = p.x, T = p.y;
				s ? (p.deltaX = C - parseFloat(w.rotation), p.rotation = C, w.rotation = C + "deg", w.renderTransform(1, w)) : k ? (d && (p.deltaY = T - k.top(), k.top(T)), u && (p.deltaX = C - k.left(), k.left(C))) : o ? (d && (p.deltaY = T - parseFloat(w.y), w.y = T + "px"), u && (p.deltaX = C - parseFloat(w.x), w.x = C + "px"), w.renderTransform(1, w)) : (d && (p.deltaY = T - parseFloat(n.style.top || 0), n.style.top = T + "px"), u && (p.deltaX = C - parseFloat(n.style.left || 0), n.style.left = C + "px")), ee && !t && !de && (de = !0, $a(p, "drag", "onDrag") === !1 && (u && (p.x -= p.deltaX), d && (p.y -= p.deltaY), e(!0)), de = !1);
			}
			V = !1;
		}, G = function(e, t) {
			var r = p.x, i = p.y, a, c;
			n._gsap || (w = Q.core.getCache(n)), w.uncache && Q.getProperty(n, "x"), o ? (p.x = parseFloat(w.x), p.y = parseFloat(w.y)) : s ? p.x = p.rotation = ma(parseFloat(w.rotation)) : k ? (p.y = k.top(), p.x = k.left()) : (p.y = parseFloat(n.style.top || (c = Xa(n)) && c.top) || 0, p.x = parseFloat(n.style.left || (c || {}).left) || 0), (H || ie || ae) && !t && (p.isDragging || p.isThrowing) && (ae && (Ea.x = p.x, Ea.y = p.y, a = ae(Ea), a.x !== p.x && (p.x = a.x, V = !0), a.y !== p.y && (p.y = a.y, V = !0)), H && (a = H(p.x), a !== p.x && (p.x = a, s && (p.rotation = a), V = !0)), ie && (a = ie(p.y), a !== p.y && (p.y = a), V = !0)), V && W(!0), e || (p.deltaX = p.x - r, p.deltaY = p.y - i, $a(p, "throwupdate", "onThrowUpdate"));
		}, K = function(e, t, n, r) {
			return t ??= -va, n ??= va, ca(e) ? function(i) {
				var a = p.isPressed ? 1 - p.edgeResistance : 1;
				return e.call(p, (i > n ? n + (i - n) * a : i < t ? t + (i - t) * a : i) * r) * r;
			} : ha(e) ? function(r) {
				for (var i = e.length, a = 0, o = va, s, c; --i > -1;) s = e[i], c = s - r, c < 0 && (c = -c), c < o && s >= t && s <= n && (a = i, o = c);
				return e[a];
			} : isNaN(e) ? function(e) {
				return e;
			} : function() {
				return e * r;
			};
		}, q = function(e, t, n, r, i, a, o) {
			return a = a && a < va ? a * a : va, ca(e) ? function(s) {
				var c = p.isPressed ? 1 - p.edgeResistance : 1, l = s.x, u = s.y, d, f, m;
				return s.x = l = l > n ? n + (l - n) * c : l < t ? t + (l - t) * c : l, s.y = u = u > i ? i + (u - i) * c : u < r ? r + (u - r) * c : u, d = e.call(p, s), d !== s && (s.x = d.x, s.y = d.y), o !== 1 && (s.x *= o, s.y *= o), a < va && (f = s.x - l, m = s.y - u, f * f + m * m > a && (s.x = l, s.y = u)), s;
			} : ha(e) ? function(t) {
				for (var n = e.length, r = 0, i = va, o, s, c, l; --n > -1;) c = e[n], o = c.x - t.x, s = c.y - t.y, l = o * o + s * s, l < i && (r = n, i = l);
				return i <= a ? e[r] : t;
			} : function(e) {
				return e;
			};
		}, ve = function() {
			var e, t, i, a;
			P = !1, k ? (k.calibrate(), p.minX = L = -k.maxScrollLeft(), p.minY = z = -k.maxScrollTop(), p.maxX = I = p.maxY = R = 0, P = !0) : r.bounds && (e = eo(r.bounds, n.parentNode), s ? (p.minX = L = e.left, p.maxX = I = e.left + e.width, p.minY = z = p.maxY = R = 0) : !ua(r.bounds.maxX) || !ua(r.bounds.maxY) ? (e = r.bounds, p.minX = L = e.minX, p.minY = z = e.minY, p.maxX = I = e.maxX, p.maxY = R = e.maxY) : (t = eo(n, n.parentNode), p.minX = L = Math.round(E(c, "px") + e.left - t.left), p.minY = z = Math.round(E(l, "px") + e.top - t.top), p.maxX = I = Math.round(L + (e.width - t.width)), p.maxY = R = Math.round(z + (e.height - t.height))), L > I && (p.minX = I, p.maxX = I = L, L = p.minX), z > R && (p.minY = R, p.maxY = R = z, z = p.minY), s && (p.minRotation = L, p.maxRotation = I), P = !0), r.liveSnap && (i = r.liveSnap === !0 ? r.snap || {} : r.liveSnap, a = ha(i) || ca(i), s ? (H = K(a ? i : i.rotation, L, I, 1), ie = null) : i.points ? ae = q(a ? i : i.points, L, I, z, R, i.radius, k ? -1 : 1) : (u && (H = K(a ? i : i.x || i.left || i.scrollLeft, L, I, k ? -1 : 1)), d && (ie = K(a ? i : i.y || i.top || i.scrollTop, z, R, k ? -1 : 1))));
		}, ye = function() {
			p.isThrowing = !1, $a(p, "throwcomplete", "onThrowComplete");
		}, be = function() {
			p.isThrowing = !1;
		}, xe = function(e, t) {
			var i, a, o, f;
			e && ea ? (e === !0 && (i = r.snap || r.liveSnap || {}, a = ha(i) || ca(i), e = { resistance: (r.throwResistance || r.resistance || 1e3) / (s ? 10 : 1) }, s ? e.rotation = ro(p, a ? i : i.rotation, I, L, 1, t) : (u && (e[c] = ro(p, a ? i : i.points || i.x || i.left, I, L, k ? -1 : 1, t || p.lockedAxis === "x")), d && (e[l] = ro(p, a ? i : i.points || i.y || i.top, R, z, k ? -1 : 1, t || p.lockedAxis === "y")), (i.points || ha(i) && la(i[0])) && (e.linkedProps = c + "," + l, e.radius = i.radius))), p.isThrowing = !0, f = isNaN(r.overshootTolerance) ? r.edgeResistance === 1 ? 0 : 1 - p.edgeResistance + .2 : r.overshootTolerance, e.duration || (e.duration = {
				max: Math.max(r.minDuration || 0, "maxDuration" in r ? r.maxDuration : 2),
				min: isNaN(r.minDuration) ? f === 0 || la(e) && e.resistance > 1e3 ? 0 : .5 : r.minDuration,
				overshoot: f
			}), p.tween = o = Q.to(k || n, {
				inertia: e,
				data: "_draggable",
				inherit: !1,
				onComplete: ye,
				onInterrupt: be,
				onUpdate: r.fastMode ? $a : G,
				onUpdateParams: r.fastMode ? [
					p,
					"onthrowupdate",
					"onThrowUpdate"
				] : i && i.radius ? [!1, !0] : []
			}), r.fastMode || (k && (k._skip = !0), o.render(1e9, !0, !0), G(!0, !0), p.endX = p.x, p.endY = p.y, s && (p.endRotation = p.x), o.play(0), G(!0, !0), k && (k._skip = !1))) : P && p.applyBounds();
		}, Se = function(e) {
			var t = U, r;
			U = Ri(n.parentNode, !0), e && p.isPressed && !U.equals(t || new Li()) && (r = t.inverse().apply({
				x: A,
				y: j
			}), U.apply(r, r), A = r.x, j = r.y), U.equals(ya) && (U = null);
		}, Ce = function() {
			var e = 1 - p.edgeResistance, t = T ? Ua(D) : 0, r = T ? Ha(D) : 0, i, a, u;
			o && (w.x = E(c, "px") + "px", w.y = E(l, "px") + "px", w.renderTransform()), Se(!1), to.x = p.pointerX - t, to.y = p.pointerY - r, U && U.apply(to, to), A = to.x, j = to.y, V && (Oe(p.pointerX, p.pointerY), W(!0)), he = Ri(n), k ? (ve(), N = k.top(), M = k.left()) : (we() ? (G(!0, !0), ve()) : p.applyBounds(), s ? (i = n.ownerSVGElement ? [w.xOrigin - n.getBBox().x, w.yOrigin - n.getBBox().y] : (Xa(n)[pa] || "0 0").split(" "), ne = p.rotationOrigin = Ri(n).apply({
				x: parseFloat(i[0]) || 0,
				y: parseFloat(i[1]) || 0
			}), G(!0, !0), a = p.pointerX - ne.x - t, u = ne.y - p.pointerY + r, M = p.x, N = p.y = Math.atan2(u, a) * _a) : (N = E(l, "px"), M = E(c, "px"))), P && e && (M > I ? M = I + (M - I) / e : M < L && (M = L - (L - M) / e), s || (N > R ? N = R + (N - R) / e : N < z && (N = z - (z - N) / e))), p.startX = M = ma(M), p.startY = N = ma(N);
		}, we = function() {
			return p.tween && p.tween.isActive();
		}, Te = function() {
			Gi.parentNode && !we() && !p.isDragging && Gi.parentNode.removeChild(Gi);
		}, Ee = function(e, i) {
			var a;
			if (!O || p.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !i && ba() - C < 30 && Zi[p.pointerEvent.type]) me && e && O && Ra(e);
			else if (ce = we(), ge = !1, p.pointerEvent = e, Zi[e.type] ? (se = ~e.type.indexOf("touch") ? e.currentTarget || e.target : D, Ia(se, "touchend", ke), Ia(se, "touchmove", De), Ia(se, "touchcancel", ke), Ia(D, "touchstart", Va)) : (se = null, Ia(D, "mousemove", De)), ue = null, (!na || !se) && (Ia(D, "mouseup", ke), e && e.target && Ia(e.target, "mouseup", ke)), oe = S.call(p, e.target) && r.dragClickables === !1 && !i, oe) Ia(e.target, "change", ke), $a(p, "pressInit", "onPressInit"), $a(p, "press", "onPress"), ao(m, !0), me = !1;
			else {
				if (le = !se || u === d || p.vars.allowNativeTouchScrolling === !1 || p.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? !1 : u ? "y" : "x", me = !le && !p.allowEventDefault, me && (Ra(e), Ia($, "touchforcechange", Ra)), e.changedTouches ? (e = B = e.changedTouches[0], te = e.identifier) : e.pointerId ? te = e.pointerId : B = te = null, aa++, Ma(W), j = p.pointerY = e.pageY, A = p.pointerX = e.pageX, $a(p, "pressInit", "onPressInit"), (le || p.autoScroll) && Ja(n.parentNode), n.parentNode && p.autoScroll && !k && !s && n.parentNode._gsMaxScrollX && !Gi.parentNode && !n.getBBox && (Gi.style.width = n.parentNode.scrollWidth + "px", n.parentNode.appendChild(Gi)), Ce(), p.tween && p.tween.kill(), p.isThrowing = !1, Q.killTweensOf(k || n, h, !0), k && Q.killTweensOf(n, { scrollTo: 1 }, !0), p.tween = p.lockedAxis = null, (r.zIndexBoost || !s && !k && r.zIndexBoost !== !1) && (n.style.zIndex = t.zIndex++), p.isPressed = !0, ee = !!(r.onDrag || p._listeners.drag), F = !!(r.onMove || p._listeners.move), r.cursor !== !1 || r.activeCursor) for (a = m.length; --a > -1;) Q.set(m[a], { cursor: r.activeCursor || r.cursor || (ta === "grab" ? "grabbing" : ta) });
				$a(p, "press", "onPress"), ea && ea.track(k || n, o ? "x,y" : s ? "rotation" : "top,left");
			}
		}, De = function(e) {
			var t = e, r, i, a, o, s, c;
			if (!O || Qi || !p.isPressed || !e) me && e && O && Ra(e);
			else {
				if (p.pointerEvent = e, r = e.changedTouches, r) {
					if (e = r[0], e !== B && e.identifier !== te) {
						for (o = r.length; --o > -1 && (e = r[o]).identifier !== te && e.target !== n;);
						if (o < 0) return;
					}
				} else if (e.pointerId && te && e.pointerId !== te) return;
				se && le && !ue && (to.x = e.pageX - (T ? Ua(D) : 0), to.y = e.pageY - (T ? Ha(D) : 0), U && U.apply(to, to), i = to.x, a = to.y, s = Math.abs(i - A), c = Math.abs(a - j), (s !== c && (s > f || c > f) || $i && le === ue) && (ue = s > c && u ? "x" : "y", le && ue !== le && Ia($, "touchforcechange", Ra), p.vars.lockAxisOnTouchScroll !== !1 && u && d && (p.lockedAxis = ue === "x" ? "y" : "x", ca(p.vars.onLockAxis) && p.vars.onLockAxis.call(p, t)), $i && le === ue)) ? ke(t) : (!p.allowEventDefault && (!le || ue && le !== ue) && t.cancelable !== !1 ? (Ra(t), me = !0) : me &&= !1, p.autoScroll && (_ = !0), Oe(e.pageX, e.pageY, F));
			}
		}, Oe = function(e, t, n) {
			var r = 1 - p.dragResistance, i = 1 - p.edgeResistance, a = p.pointerX, o = p.pointerY, c = N, l = p.x, m = p.y, h = p.endX, g = p.endY, _ = p.endRotation, v = V, y, b, x, S, C, w;
			p.pointerX = e, p.pointerY = t, T && (e -= Ua(D), t -= Ha(D)), s ? (S = ma(Math.atan2(ne.y - t, e - ne.x) * _a), C = p.y - S, C > 180 ? (N -= 360, p.y = S) : C < -180 && (N += 360, p.y = S), U && (w = e * U.a + t * U.c + U.e, t = e * U.b + t * U.d + U.f, e = w), p.x !== M || Math.max(Math.abs(A - e), Math.abs(j - t)) > f ? (p.y = S, x = ma(M + (N - S) * r)) : x = M) : (U && (w = e * U.a + t * U.c + U.e, t = e * U.b + t * U.d + U.f, e = w), b = t - j, y = e - A, b < f && b > -f && (b = 0), y < f && y > -f && (y = 0), (p.lockAxis || p.lockedAxis) && (y || b) && (w = p.lockedAxis, w || (p.lockedAxis = w = u && Math.abs(y) > Math.abs(b) ? "y" : d ? "x" : null, w && ca(p.vars.onLockAxis) && p.vars.onLockAxis.call(p, p.pointerEvent)), w === "y" ? b = 0 : w === "x" && (y = 0)), x = ma(M + y * r), S = ma(N + b * r)), (H || ie || ae) && (p.x !== x || p.y !== S && !s) && (ae && (Ea.x = x, Ea.y = S, w = ae(Ea), x = ma(w.x), S = ma(w.y)), H && (x = ma(H(x))), ie && (S = ma(ie(S)))), P && (x > I ? x = I + Math.round((x - I) * i) : x < L && (x = L + Math.round((x - L) * i)), s || (S > R ? S = Math.round(R + (S - R) * i) : S < z && (S = Math.round(z + (S - z) * i)))), (p.x !== x || p.y !== S && !s) && (s ? (p.endRotation = p.x = p.endX = ma(x), V = !0) : (d && (p.y = p.endY = S, V = !0), u && (p.x = p.endX = x, V = !0)), !n || $a(p, "move", "onMove") !== !1 ? !p.isDragging && p.isPressed && (p.isDragging = ge = !0, $a(p, "dragstart", "onDragStart")) : (p.pointerX = a, p.pointerY = o, N = c, p.x = l, p.y = m, p.endX = h, p.endY = g, p.endRotation = _, V = v));
		}, ke = function e(t, i) {
			if (!O || !p.isPressed || t && te != null && !i && (t.pointerId && t.pointerId !== te && t.target !== n || t.changedTouches && !za(t.changedTouches, te))) me && t && O && Ra(t);
			else {
				p.isPressed = !1;
				var a = t, o = p.isDragging, s = p.vars.allowContextMenu && t && (t.ctrlKey || t.which > 2), c = Q.delayedCall(.001, Te), l, u, d, f, h;
				if (se ? (La(se, "touchend", e), La(se, "touchmove", De), La(se, "touchcancel", e), La(D, "touchstart", Va)) : La(D, "mousemove", De), La($, "touchforcechange", Ra), (!na || !se) && (La(D, "mouseup", e), t && t.target && La(t.target, "mouseup", e)), V = !1, o && (g = Ta = ba(), p.isDragging = !1), Pa(W), oe && !s) t && (La(t.target, "change", e), p.pointerEvent = a), ao(m, !1), $a(p, "release", "onRelease"), $a(p, "click", "onClick"), oe = !1;
				else {
					for (u = m.length; --u > -1;) Ya(m[u], "cursor", r.cursor || (r.cursor === !1 ? null : ta));
					if (aa--, t) {
						if (l = t.changedTouches, l && (t = l[0], t !== B && t.identifier !== te)) {
							for (u = l.length; --u > -1 && (t = l[u]).identifier !== te && t.target !== n;);
							if (u < 0 && !i) return;
						}
						p.pointerEvent = a, p.pointerX = t.pageX, p.pointerY = t.pageY;
					}
					return s && a ? (Ra(a), me = !0, $a(p, "release", "onRelease")) : a && !o ? (me = !1, ce && (r.snap || r.bounds) && xe(r.inertia || r.throwProps), $a(p, "release", "onRelease"), (!$i || a.type !== "touchmove") && a.type.indexOf("cancel") === -1 && ($a(p, "click", "onClick"), ba() - C < 300 && $a(p, "doubleclick", "onDoubleClick"), f = a.target || n, C = ba(), h = function() {
						C !== fe && p.enabled() && !p.isPressed && !a.defaultPrevented && (f.click ? f.click() : D.createEvent && (d = D.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, $, 1, p.pointerEvent.screenX, p.pointerEvent.screenY, p.pointerX, p.pointerY, !1, !1, !1, !1, 0, null), f.dispatchEvent(d)));
					}, !$i && !a.defaultPrevented && Q.delayedCall(.05, h))) : (xe(r.inertia || r.throwProps), !p.allowEventDefault && a && (r.dragClickables !== !1 || !S.call(p, a.target)) && o && (!le || ue && le === ue) && a.cancelable !== !1 ? (me = !0, Ra(a)) : me = !1, $a(p, "release", "onRelease")), we() && c.duration(p.tween.duration()), o && $a(p, "dragend", "onDragEnd"), !0;
				}
			}
		}, Ae = function(e) {
			if (e && p.isDragging && !k) {
				var t = e.target || n.parentNode, r = t.scrollLeft - t._gsScrollX, i = t.scrollTop - t._gsScrollY;
				(r || i) && (U ? (A -= r * U.a + i * U.c, j -= i * U.d + r * U.b) : (A -= r, j -= i), t._gsScrollX += r, t._gsScrollY += i, Oe(p.pointerX, p.pointerY));
			}
		}, je = function(e) {
			var t = ba(), n = t - C < 100, r = t - g < 50, i = n && fe === C, a = p.pointerEvent && p.pointerEvent.defaultPrevented, o = n && pe === C, s = e.isTrusted || e.isTrusted == null && n && i;
			(i || r && p.vars.suppressClickOnDrag !== !1) && e.stopImmediatePropagation && e.stopImmediatePropagation(), n && !(p.pointerEvent && p.pointerEvent.defaultPrevented) && (!i || s && !o) ? (s && i && (pe = C), fe = C) : ((p.isPressed || r || n) && (!s || !e.detail || !n || a) && Ra(e), !n && !r && !ge && (e && e.target && (p.pointerEvent = e), $a(p, "click", "onClick")));
		}, Me = function(e) {
			return U ? {
				x: e.x * U.a + e.y * U.c + U.e,
				y: e.x * U.b + e.y * U.d + U.f
			} : {
				x: e.x,
				y: e.y
			};
		};
		return re = t.get(n), re && re.kill(), i.startDrag = function(e, t) {
			var r, i, a, o;
			Ee(e || p.pointerEvent, !0), t && !p.hitTest(e || p.pointerEvent) && (r = Qa(e || p.pointerEvent), i = Qa(n), a = Me({
				x: r.left + r.width / 2,
				y: r.top + r.height / 2
			}), o = Me({
				x: i.left + i.width / 2,
				y: i.top + i.height / 2
			}), A -= a.x - o.x, j -= a.y - o.y), p.isDragging || (p.isDragging = ge = !0, $a(p, "dragstart", "onDragStart"));
		}, i.drag = De, i.endDrag = function(e) {
			return ke(e || p.pointerEvent, !0);
		}, i.timeSinceDrag = function() {
			return p.isDragging ? 0 : (ba() - g) / 1e3;
		}, i.timeSinceClick = function() {
			return (ba() - C) / 1e3;
		}, i.hitTest = function(e, n) {
			return t.hitTest(p.target, e, n);
		}, i.getDirection = function(e, t) {
			var r = e === "velocity" && ea ? e : la(e) && !s ? "element" : "start", i, a, o, u, d, f;
			return r === "element" && (d = Qa(p.target), f = Qa(e)), i = r === "start" ? p.x - M : r === "velocity" ? ea.getVelocity(n, c) : d.left + d.width / 2 - (f.left + f.width / 2), s ? i < 0 ? "counter-clockwise" : "clockwise" : (t ||= 2, a = r === "start" ? p.y - N : r === "velocity" ? ea.getVelocity(n, l) : d.top + d.height / 2 - (f.top + f.height / 2), o = Math.abs(i / a), u = o < 1 / t ? "" : i < 0 ? "left" : "right", o < t && (u !== "" && (u += "-"), u += a < 0 ? "up" : "down"), u);
		}, i.applyBounds = function(e, t) {
			var i, a, o, c, l, f;
			if (e && r.bounds !== e) return r.bounds = e, p.update(!0, t);
			if (G(!0), ve(), P && !we()) {
				if (i = p.x, a = p.y, i > I ? i = I : i < L && (i = L), a > R ? a = R : a < z && (a = z), (p.x !== i || p.y !== a) && (o = !0, p.x = p.endX = i, s ? p.endRotation = i : p.y = p.endY = a, V = !0, W(!0), p.autoScroll && !p.isDragging)) for (Ja(n.parentNode), c = n, Da.scrollTop = $.pageYOffset == null ? D.documentElement.scrollTop == null ? D.body.scrollTop : D.documentElement.scrollTop : $.pageYOffset, Da.scrollLeft = $.pageXOffset == null ? D.documentElement.scrollLeft == null ? D.body.scrollLeft : D.documentElement.scrollLeft : $.pageXOffset; c && !f;) f = Ka(c.parentNode), l = f ? Da : c.parentNode, d && l.scrollTop > l._gsMaxScrollY && (l.scrollTop = l._gsMaxScrollY), u && l.scrollLeft > l._gsMaxScrollX && (l.scrollLeft = l._gsMaxScrollX), c = l;
				p.isThrowing && (o || p.endX > I || p.endX < L || p.endY > R || p.endY < z) && xe(r.inertia || r.throwProps, o);
			}
			return p;
		}, i.update = function(e, t, r) {
			if (t && p.isPressed) {
				if (s) p.x = p.y = ma(parseFloat(w.rotation));
				else {
					var i = Ri(n), a = he.apply({
						x: p.x - M,
						y: p.y - N
					}), o = Ri(n.parentNode, !0);
					o.apply({
						x: i.e - a.x,
						y: i.f - a.y
					}, a), p.x = ma(p.x - (a.x - o.e)), p.y = ma(p.y - (a.y - o.f));
				}
				W(!0), Ce();
			}
			var c = p.x, l = p.y;
			return Se(!t), e ? p.applyBounds() : (V && r && W(!0), G(!0)), t && (Oe(p.pointerX, p.pointerY), V && W(!0)), p.isPressed && !t && (u && Math.abs(c - p.x) > .01 || d && Math.abs(l - p.y) > .01 && !s) && Ce(), p.autoScroll && (Ja(n.parentNode, p.isDragging), _ = p.isDragging, W(!0), Ga(n, Ae), Wa(n, Ae)), p;
		}, i.enable = function(e) {
			var t = { lazy: !0 }, i, a, c;
			if (r.cursor !== !1 && (t.cursor = r.cursor || ta), Q.utils.checkPrefix("touchCallout") && (t.touchCallout = "none"), e !== "soft") {
				for (Aa(m, u === d ? "none" : r.allowNativeTouchScrolling && n.scrollHeight === n.clientHeight == (n.scrollWidth === n.clientHeight) || r.allowEventDefault ? "manipulation" : u ? "pan-y" : "pan-x"), a = m.length; --a > -1;) c = m[a], na || Ia(c, "mousedown", Ee), Ia(c, "touchstart", Ee), Ia(c, "click", je, !0), Q.set(c, t), c.getBBox && c.ownerSVGElement && u !== d && Q.set(c.ownerSVGElement, { touchAction: r.allowNativeTouchScrolling || r.allowEventDefault ? "manipulation" : u ? "pan-y" : "pan-x" }), r.allowContextMenu || Ia(c, "contextmenu", _e);
				ao(m, !1);
			}
			return Wa(n, Ae), O = !0, ea && e !== "soft" && ea.track(k || n, o ? "x,y" : s ? "rotation" : "top,left"), n._gsDragID = i = n._gsDragID || "d" + Ca++, Sa[i] = p, k && (k.enable(), k.element._gsDragID = i), (r.bounds || s) && Ce(), r.bounds && p.applyBounds(), p;
		}, i.disable = function(e) {
			for (var t = p.isDragging, r = m.length, i; --r > -1;) Ya(m[r], "cursor", null);
			if (e !== "soft") {
				for (Aa(m, null), r = m.length; --r > -1;) i = m[r], Ya(i, "touchCallout", null), La(i, "mousedown", Ee), La(i, "touchstart", Ee), La(i, "click", je, !0), La(i, "contextmenu", _e);
				ao(m, !0), se && (La(se, "touchcancel", ke), La(se, "touchend", ke), La(se, "touchmove", De)), La(D, "mouseup", ke), La(D, "mousemove", De);
			}
			return Ga(n, Ae), O = !1, ea && e !== "soft" && (ea.untrack(k || n, o ? "x,y" : s ? "rotation" : "top,left"), p.tween && p.tween.kill()), k && k.disable(), Pa(W), p.isDragging = p.isPressed = oe = !1, t && $a(p, "dragend", "onDragEnd"), p;
		}, i.enabled = function(e, t) {
			return arguments.length ? e ? p.enable(t) : p.disable(t) : O;
		}, i.kill = function() {
			return p.isThrowing = !1, p.tween && p.tween.kill(), p.disable(), Q.set(m, { clearProps: "userSelect" }), delete Sa[n._gsDragID], p;
		}, i.revert = function() {
			this.kill(), this.styles && this.styles.revert();
		}, ~a.indexOf("scroll") && (k = i.scrollProxy = new lo(n, ka({ onKill: function() {
			p.isPressed && ke(null);
		} }, r)), n.style.overflowY = d && !Xi ? "auto" : "hidden", n.style.overflowX = u && !Xi ? "auto" : "hidden", n = k.content), s ? h.rotation = 1 : (u && (h[c] = 1), d && (h[l] = 1)), w.force3D = "force3D" in r ? r.force3D : !0, ra(zi(i)), i.enable(), i;
	}
	return t.register = function(e) {
		Q = e, uo();
	}, t.create = function(e, n) {
		return Ki || uo(!0), Ji(e).map(function(e) {
			return new t(e, n);
		});
	}, t.get = function(e) {
		return Sa[(Ji(e)[0] || {})._gsDragID];
	}, t.timeSinceDrag = function() {
		return (ba() - Ta) / 1e3;
	}, t.hitTest = function(e, t, n) {
		if (e === t) return !1;
		var r = Qa(e), i = Qa(t), a = r.top, o = r.left, s = r.right, c = r.bottom, l = r.width, u = r.height, d = i.left > s || i.right < o || i.top > c || i.bottom < a, f, p, m;
		return d || !n ? !d : (m = (n + "").indexOf("%") !== -1, n = parseFloat(n) || 0, f = {
			left: Math.max(o, i.left),
			top: Math.max(a, i.top)
		}, f.width = Math.min(s, i.right) - f.left, f.height = Math.min(c, i.bottom) - f.top, f.width < 0 || f.height < 0 ? !1 : m ? (n *= .01, p = f.width * f.height, p >= l * u * n || p >= i.width * i.height * n) : f.width > n && f.height > n);
	}, t;
}(/* @__PURE__ */ function() {
	function e(e) {
		this._listeners = {}, this.target = e || this;
	}
	var t = e.prototype;
	return t.addEventListener = function(e, t) {
		var n = this._listeners[e] || (this._listeners[e] = []);
		~n.indexOf(t) || n.push(t);
	}, t.removeEventListener = function(e, t) {
		var n = this._listeners[e], r = n && n.indexOf(t);
		r >= 0 && n.splice(r, 1);
	}, t.dispatchEvent = function(e) {
		var t = this, n;
		return (this._listeners[e] || []).forEach(function(r) {
			return r.call(t, {
				type: e,
				target: t.target
			}) === !1 && (n = !1);
		}), n;
	}, e;
}());
Fa(fo.prototype, {
	pointerX: 0,
	pointerY: 0,
	startX: 0,
	startY: 0,
	deltaX: 0,
	deltaY: 0,
	isDragging: !1,
	isPressed: !1
}), fo.zIndex = 1e3, fo.version = "3.15.0", sa() && Q.registerPlugin(fo);
//#endregion
//#region node_modules/gsap/utils/VelocityTracker.js
var po, mo, ho, go, _o, vo, yo, bo, xo = function() {
	return po || typeof window < "u" && (po = window.gsap);
}, So = {}, Co = function(e) {
	return Math.round(e * 1e4) / 1e4;
}, wo = function(e) {
	return bo(e).id;
}, To = function(e) {
	return So[wo(typeof e == "string" ? ho(e)[0] : e)];
}, Eo = function(e) {
	var t = _o, n;
	if (e - yo >= .05) for (yo = e; t;) n = t.g(t.t, t.p), (n !== t.v1 || e - t.t1 > .2) && (t.v2 = t.v1, t.v1 = n, t.t2 = t.t1, t.t1 = e), t = t._next;
}, Do = {
	deg: 360,
	rad: Math.PI * 2
}, Oo = function() {
	po = xo(), po && (ho = po.utils.toArray, go = po.utils.getUnit, bo = po.core.getCache, vo = po.ticker, mo = 1);
}, ko = function(e, t, n, r) {
	this.t = e, this.p = t, this.g = e._gsap.get, this.rCap = Do[n || go(this.g(e, t))], this.v1 = this.v2 = this.g(e, t), this.t1 = this.t2 = vo.time, r && (this._next = r, r._prev = this);
}, Ao = /*#__PURE__*/ function() {
	function e(e, t) {
		mo || Oo(), this.target = ho(e)[0], So[wo(this.target)] = this, this._props = {}, t && this.add(t);
	}
	e.register = function(e) {
		po = e, Oo();
	};
	var t = e.prototype;
	return t.get = function(e, t) {
		var n = this._props[e] || console.warn("Not tracking " + e + " velocity."), r = parseFloat(t ? n.v1 : n.g(n.t, n.p)) - parseFloat(n.v2), i = n.rCap;
		return i && (r %= i, r !== r % (i / 2) && (r = r < 0 ? r + i : r - i)), Co(r / ((t ? n.t1 : vo.time) - n.t2));
	}, t.getAll = function() {
		var e = {}, t = this._props, n;
		for (n in t) e[n] = this.get(n);
		return e;
	}, t.isTracking = function(e) {
		return e in this._props;
	}, t.add = function(e, t) {
		var n = this._props[e];
		n ? (n.v1 = n.v2 = n.g(n.t, n.p), n.t1 = n.t2 = vo.time) : (_o || (vo.add(Eo), yo = vo.time), _o = this._props[e] = new ko(this.target, e, t, _o));
	}, t.remove = function(e) {
		var t = this._props[e], n, r;
		t && (n = t._prev, r = t._next, n && (n._next = r), r ? r._prev = n : _o === t && (vo.remove(Eo), _o = 0), delete this._props[e]);
	}, t.kill = function(e) {
		for (var t in this._props) this.remove(t);
		e || delete So[wo(this.target)];
	}, e.track = function(t, n, r) {
		mo || Oo();
		for (var i = [], a = ho(t), o = n.split(","), s = (r || "").split(","), c = a.length, l, u; c--;) {
			for (l = To(a[c]) || new e(a[c]), u = o.length; u--;) l.add(o[u], s[u] || s[0]);
			i.push(l);
		}
		return i;
	}, e.untrack = function(e, t) {
		var n = t && t.split(",");
		ho(e).forEach(function(e) {
			var t = To(e);
			t && (n ? n.forEach(function(e) {
				return t.remove(e);
			}) : t.kill(1));
		});
	}, e.isTracking = function(e, t) {
		var n = To(e);
		return n && n.isTracking(t);
	}, e.getVelocity = function(e, t) {
		var n = To(e);
		return !n || !n.isTracking(t) ? console.warn("Not tracking velocity of " + t) : n.get(t);
	}, e;
}();
Ao.getByTarget = To, xo() && po.registerPlugin(Ao);
//#endregion
//#region node_modules/gsap/InertiaPlugin.js
var jo, Mo, No, Po, Fo, Io, Lo, Ro, zo, Bo, Vo, Ho, Uo, Wo, Go = Ao.getByTarget, Ko = function() {
	return jo || typeof window < "u" && (jo = window.gsap) && jo.registerPlugin && jo;
}, qo = function(e) {
	return typeof e == "string";
}, Jo = function(e) {
	return typeof e == "number";
}, Yo = function(e) {
	return typeof e == "object";
}, Xo = function(e) {
	return typeof e == "function";
}, Zo = 1, Qo = Array.isArray, $o = function(e) {
	return e;
}, es = 1e10, ts = 1 / es, ns = .05, rs = function(e) {
	return Math.round(e * 1e4) / 1e4;
}, is = function(e, t, n) {
	for (var r in t) !(r in e) && r !== n && (e[r] = t[r]);
	return e;
}, as = function e(t) {
	var n = {}, r, i;
	for (r in t) n[r] = Yo(i = t[r]) && !Qo(i) ? e(i) : i;
	return n;
}, os = function(e, t, n, r, i) {
	var a = t.length, o = 0, s = es, c, l, u, d;
	if (Yo(e)) {
		for (; a--;) {
			for (u in c = t[a], l = 0, e) d = c[u] - e[u], l += d * d;
			l < s && (o = a, s = l);
		}
		if ((i || es) < es && i < Math.sqrt(s)) return e;
	} else for (; a--;) c = t[a], l = c - e, l < 0 && (l = -l), l < s && c >= r && c <= n && (o = a, s = l);
	return t[o];
}, ss = function(e, t, n, r, i, a, o) {
	if (e.end === "auto") return e;
	var s = e.end, c, l;
	if (n = isNaN(n) ? es : n, r = isNaN(r) ? -es : r, Yo(t)) {
		if (c = t.calculated ? t : (Xo(s) ? s(t, o) : os(t, s, n, r, a)) || t, !t.calculated) {
			for (l in c) t[l] = c[l];
			t.calculated = !0;
		}
		c = c[i];
	} else c = Xo(s) ? s(t, o) : Qo(s) ? os(t, s, n, r, a) : parseFloat(s);
	return c > n ? c = n : c < r && (c = r), {
		max: c,
		min: c,
		unitFactor: e.unitFactor
	};
}, cs = function(e, t, n) {
	return isNaN(e[t]) ? n : +e[t];
}, ls = function(e, t) {
	return t * ns * e / Bo;
}, us = function(e, t, n) {
	return Math.abs((t - e) * Bo / n / ns);
}, ds = {
	resistance: 1,
	checkpoint: 1,
	preventOvershoot: 1,
	linkedProps: 1,
	radius: 1,
	duration: 1
}, fs = function(e, t, n, r) {
	if (t.linkedProps) {
		for (var i = t.linkedProps.split(","), a = {}, o = 0, s, c, l, u, d; o < i.length; o++) s = i[o], c = t[s], c && (Jo(c.velocity) ? l = c.velocity : (u ||= Go(e), l = u && u.isTracking(s) ? u.get(s) : 0), d = Math.abs(l / cs(c, "resistance", r)), a[s] = parseFloat(n(e, s)) + ls(l, d));
		return a;
	}
}, ps = function(e, t, n, r, i, a) {
	if (n === void 0 && (n = 10), r === void 0 && (r = .2), i === void 0 && (i = 1), a === void 0 && (a = 0), qo(e) && (e = Po(e)[0]), !e) return 0;
	var o = 0, s = es, c = t.inertia || t, l = zo(e).get, u = cs(c, "resistance", Io.resistance), d, f, p, m, h, g, _, v, y, b = fs(e, c, l, u);
	for (d in c) ds[d] || (f = c[d], Yo(f) || (v ||= Go(e), v && v.isTracking(d) ? f = Jo(f) ? { velocity: f } : { velocity: v.get(d) } : (m = +f || 0, p = Math.abs(m / u))), Yo(f) && (Jo(f.velocity) ? m = f.velocity : (v ||= Go(e), m = v && v.isTracking(d) ? v.get(d) : 0), p = Vo(r, n, Math.abs(m / cs(f, "resistance", u))), h = parseFloat(l(e, d)) || 0, g = h + ls(m, p), "end" in f && (f = ss(f, b && d in b ? b : g, f.max, f.min, d, c.radius, m), a && (Ho === t && (Ho = c = as(t)), c[d] = is(f, c[d], "end"))), "max" in f && g > +f.max + ts ? (y = f.unitFactor || Io.unitFactors[d] || 1, _ = h > f.max && f.min !== f.max || m * y > -15 && m * y < 45 ? r + (n - r) * .1 : us(h, f.max, m), _ + i < s && (s = _ + i)) : "min" in f && g < +f.min - ts && (y = f.unitFactor || Io.unitFactors[d] || 1, _ = h < f.min && f.min !== f.max || m * y > -45 && m * y < 15 ? r + (n - r) * .1 : us(h, f.min, m), _ + i < s && (s = _ + i)), _ > o && (o = _)), p > o && (o = p));
	return o > s && (o = s), o > n ? n : o < r ? r : o;
}, ms = function() {
	jo = Ko(), jo && (No = jo.parseEase, Po = jo.utils.toArray, Lo = jo.utils.getUnit, zo = jo.core.getCache, Vo = jo.utils.clamp, Uo = jo.core.getStyleSaver, Wo = jo.core.reverting || function() {}, Fo = No("power3"), Bo = Fo(.05), Ro = jo.core.PropTween, jo.config({
		resistance: 100,
		unitFactors: {
			time: 1e3,
			totalTime: 1e3,
			progress: 1e3,
			totalProgress: 1e3
		}
	}), Io = jo.config(), jo.registerPlugin(Ao), Mo = 1);
}, hs = {
	version: "3.15.0",
	name: "inertia",
	register: function(e) {
		jo = e, ms();
	},
	init: function(e, t, n, r, i) {
		Mo || ms();
		var a = Go(e);
		if (t === "auto") {
			if (!a) {
				console.warn("No inertia tracking on " + e + ". InertiaPlugin.track(target) first.");
				return;
			}
			t = a.getAll();
		}
		this.styles = Uo && typeof e.style == "object" && Uo(e), this.target = e, this.tween = n, Ho = t;
		var o = e._gsap, s = o.get, c = t.duration, l = Yo(c), u = t.preventOvershoot || l && c.overshoot === 0, d = cs(t, "resistance", Io.resistance), f = Jo(c) ? c : ps(e, t, l && c.max || 10, l && c.min || .2, l && "overshoot" in c ? +c.overshoot : +!u, !0), p, m, h, g, _, v, y, b, x;
		for (p in t = Ho, Ho = 0, x = fs(e, t, s, d), t) ds[p] || (m = t[p], Xo(m) && (m = m(r, e, i)), Jo(m) ? _ = m : Yo(m) && !isNaN(m.velocity) ? _ = +m.velocity : a && a.isTracking(p) ? _ = a.get(p) : console.warn("ERROR: No velocity was defined for " + e + " property: " + p), v = ls(_, f), b = 0, h = s(e, p), g = Lo(h), h = parseFloat(h), Yo(m) && (y = h + v, "end" in m && (m = ss(m, x && p in x ? x : y, m.max, m.min, p, t.radius, _)), "max" in m && +m.max < y ? u || m.preventOvershoot ? v = m.max - h : b = m.max - h - v : "min" in m && +m.min > y && (u || m.preventOvershoot ? v = m.min - h : b = m.min - h - v)), this._props.push(p), this.styles && this.styles.save(p), this._pt = new Ro(this._pt, e, p, h, 0, $o, 0, o.set(e, p, this)), this._pt.u = g || 0, this._pt.c1 = v, this._pt.c2 = b);
		return n.duration(f), Zo;
	},
	render: function(e, t) {
		var n = t._pt;
		if (e = Fo(t.tween._time / t.tween._dur), e || !Wo()) for (; n;) n.set(n.t, n.p, rs(n.s + n.c1 * e + n.c2 * e * e) + n.u, n.d, e), n = n._next;
		else t.styles.revert();
	}
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(e) {
	return hs[e] = Ao[e];
}), Ko() && jo.registerPlugin(hs);
//#endregion
//#region node_modules/gsap/utils/paths.js
var gs = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, _s = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi, vs = Math.PI / 180, ys = Math.sin, bs = Math.cos, xs = Math.abs, Ss = Math.sqrt, Cs = function(e) {
	return typeof e == "number";
}, ws = 1e5, Ts = function(e) {
	return Math.round(e * ws) / ws || 0;
}, Es = function(e) {
	return e.closed = Math.abs(e[0] - e[e.length - 2]) < .001 && Math.abs(e[1] - e[e.length - 1]) < .001;
};
function Ds(e, t, n, r, i, a, o) {
	for (var s = e.length, c, l, u, d, f; --s > -1;) for (c = e[s], l = c.length, u = 0; u < l; u += 2) d = c[u], f = c[u + 1], c[u] = d * t + f * r + a, c[u + 1] = d * n + f * i + o;
	return e._dirty = 1, e;
}
function Os(e, t, n, r, i, a, o, s, c) {
	if (e !== s || t !== c) {
		n = xs(n), r = xs(r);
		var l = i % 360 * vs, u = bs(l), d = ys(l), f = Math.PI, p = f * 2, m = (e - s) / 2, h = (t - c) / 2, g = u * m + d * h, _ = -d * m + u * h, v = g * g, y = _ * _, b = v / (n * n) + y / (r * r);
		b > 1 && (n = Ss(b) * n, r = Ss(b) * r);
		var x = n * n, S = r * r, C = (x * S - x * y - S * v) / (x * y + S * v);
		C < 0 && (C = 0);
		var w = (a === o ? -1 : 1) * Ss(C), T = w * (n * _ / r), E = w * -(r * g / n), D = (e + s) / 2, O = (t + c) / 2, k = D + (u * T - d * E), A = O + (d * T + u * E), j = (g - T) / n, M = (_ - E) / r, N = (-g - T) / n, P = (-_ - E) / r, ee = j * j + M * M, F = (M < 0 ? -1 : 1) * Math.acos(j / Ss(ee)), I = (j * P - M * N < 0 ? -1 : 1) * Math.acos((j * N + M * P) / Ss(ee * (N * N + P * P)));
		isNaN(I) && (I = f), !o && I > 0 ? I -= p : o && I < 0 && (I += p), F %= p, I %= p;
		for (var L = Math.ceil(xs(I) / (p / 4)), R = [], z = I / L, B = 4 / 3 * ys(z / 2) / (1 + bs(z / 2)), te = u * n, ne = d * n, V = d * -r, re = u * r, H = 0; H < L; H++) i = F + H * z, g = bs(i), _ = ys(i), j = bs(i += z), M = ys(i), R.push(g - B * _, _ + B * g, j + B * M, M - B * j, j, M);
		for (H = 0; H < R.length; H += 2) g = R[H], _ = R[H + 1], R[H] = g * te + _ * V + k, R[H + 1] = g * ne + _ * re + A;
		return R[H - 2] = s, R[H - 1] = c, R;
	}
}
function ks(e) {
	var t = (e + "").replace(_s, function(e) {
		var t = +e;
		return t < 1e-4 && t > -1e-4 ? 0 : t;
	}).match(gs) || [], n = [], r = 0, i = 0, a = 2 / 3, o = t.length, s = 0, c = "ERROR: malformed path: " + e, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w = function(e, t, n, r) {
		v = (n - e) / 3, y = (r - t) / 3, h.push(e + v, t + y, n - v, r - y, n, r);
	};
	if (!e || !isNaN(t[0]) || isNaN(t[1])) return console.log(c), n;
	for (l = 0; l < o; l++) if (x = p, isNaN(t[l]) ? (p = t[l].toUpperCase(), m = p !== t[l]) : l--, d = +t[l + 1], f = +t[l + 2], m && (d += r, f += i), l || (g = d, _ = f), p === "M") h && (h.length < 8 ? --n.length : s += h.length, Es(h)), r = g = d, i = _ = f, h = [d, f], n.push(h), l += 2, p = "L";
	else if (p === "C") h ||= [0, 0], m || (r = i = 0), h.push(d, f, r + t[l + 3] * 1, i + t[l + 4] * 1, r += t[l + 5] * 1, i += t[l + 6] * 1), l += 6;
	else if (p === "S") v = r, y = i, (x === "C" || x === "S") && (v += r - h[h.length - 4], y += i - h[h.length - 3]), m || (r = i = 0), h.push(v, y, d, f, r += t[l + 3] * 1, i += t[l + 4] * 1), l += 4;
	else if (p === "Q") v = r + (d - r) * a, y = i + (f - i) * a, m || (r = i = 0), r += t[l + 3] * 1, i += t[l + 4] * 1, h.push(v, y, r + (d - r) * a, i + (f - i) * a, r, i), l += 4;
	else if (p === "T") v = r - h[h.length - 4], y = i - h[h.length - 3], h.push(r + v, i + y, d + (r + v * 1.5 - d) * a, f + (i + y * 1.5 - f) * a, r = d, i = f), l += 2;
	else if (p === "H") w(r, i, r = d, i), l += 1;
	else if (p === "V") w(r, i, r, i = d + (m ? i - r : 0)), l += 1;
	else if (p === "L" || p === "Z") p === "Z" && (d = g, f = _, h.closed = !0), (p === "L" || xs(r - d) > .5 || xs(i - f) > .5) && (w(r, i, d, f), p === "L" && (l += 2)), r = d, i = f;
	else if (p === "A") {
		if (S = t[l + 4], C = t[l + 5], v = t[l + 6], y = t[l + 7], u = 7, S.length > 1 && (S.length < 3 ? (y = v, v = C, u--) : (y = C, v = S.substr(2), u -= 2), C = S.charAt(1), S = S.charAt(0)), b = Os(r, i, +t[l + 1], +t[l + 2], +t[l + 3], +S, +C, (m ? r : 0) + v * 1, (m ? i : 0) + y * 1), l += u, b) for (u = 0; u < b.length; u++) h.push(b[u]);
		r = h[h.length - 2], i = h[h.length - 1];
	} else console.log(c);
	return l = h.length, l < 6 ? (n.pop(), l = 0) : Es(h), n.totalPoints = s + l, n;
}
function As(e) {
	Cs(e[0]) && (e = [e]);
	for (var t = "", n = e.length, r, i = 0, a, o; i < n; i++) {
		for (o = e[i], t += "M" + Ts(o[0]) + "," + Ts(o[1]) + " C", r = o.length, a = 2; a < r; a++) t += Ts(o[a++]) + "," + Ts(o[a++]) + " " + Ts(o[a++]) + "," + Ts(o[a++]) + " " + Ts(o[a++]) + "," + Ts(o[a]) + " ";
		o.closed && (t += "z");
	}
	return t;
}
//#endregion
//#region node_modules/gsap/CustomEase.js
var js, Ms, Ns = function() {
	return js || typeof window < "u" && (js = window.gsap) && js.registerPlugin && js;
}, Ps = function() {
	js = Ns(), js ? (js.registerEase("_CE", Us.create), Ms = 1) : console.warn("Please gsap.registerPlugin(CustomEase)");
}, Fs = 0x56bc75e2d63100000, Is = function(e) {
	return ~~(e * 1e3 + (e < 0 ? -.5 : .5)) / 1e3;
}, Ls = 1, Rs = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi, zs = /[cLlsSaAhHvVtTqQ]/g, Bs = function(e) {
	for (var t = e.length, n = Fs, r = 1; r < t; r += 6) +e[r] < n && (n = +e[r]);
	return n;
}, Vs = function(e, t, n) {
	!n && n !== 0 && (n = Math.max(+e[e.length - 1], +e[1]));
	var r = e[0] * -1, i = -n, a = e.length, o = 1 / (+e[a - 2] + r), s = -t || (Math.abs(+e[a - 1] - e[1]) < .01 * (+e[a - 2] - e[0]) ? Bs(e) + i : +e[a - 1] + i), c;
	for (s = s ? 1 / s : -o, c = 0; c < a; c += 2) e[c] = (+e[c] + r) * o, e[c + 1] = (+e[c + 1] + i) * s;
}, Hs = function e(t, n, r, i, a, o, s, c, l, u, d) {
	var f = (t + r) / 2, p = (n + i) / 2, m = (r + a) / 2, h = (i + o) / 2, g = (a + s) / 2, _ = (o + c) / 2, v = (f + m) / 2, y = (p + h) / 2, b = (m + g) / 2, x = (h + _) / 2, S = (v + b) / 2, C = (y + x) / 2, w = s - t, T = c - n, E = Math.abs((r - s) * T - (i - c) * w), D = Math.abs((a - s) * T - (o - c) * w), O;
	return u || (u = [{
		x: t,
		y: n
	}, {
		x: s,
		y: c
	}], d = 1), u.splice(d || u.length - 1, 0, {
		x: S,
		y: C
	}), (E + D) * (E + D) > l * (w * w + T * T) && (O = u.length, e(t, n, f, p, v, y, S, C, l, u, d), e(S, C, b, x, g, _, s, c, l, u, d + 1 + (u.length - O))), u;
}, Us = /*#__PURE__*/ function() {
	function e(e, t, n) {
		Ms || Ps(), this.id = e, Ls && this.setData(t, n);
	}
	var t = e.prototype;
	return t.setData = function(e, t) {
		t ||= {}, e ||= "0,0,1,1";
		var n = e.match(Rs), r = 1, i = [], a = [], o = t.precision || 1, s = o <= 1, c, l, u, d, f, p, m, h, g;
		if (this.data = e, (zs.test(e) || ~e.indexOf("M") && e.indexOf("C") < 0) && (n = ks(e)[0]), c = n.length, c === 4) n.unshift(0, 0), n.push(1, 1), c = 8;
		else if ((c - 2) % 6) throw "Invalid CustomEase";
		for ((+n[0] != 0 || +n[c - 2] != 1) && Vs(n, t.height, t.originY), this.segment = n, d = 2; d < c; d += 6) l = {
			x: +n[d - 2],
			y: +n[d - 1]
		}, u = {
			x: +n[d + 4],
			y: +n[d + 5]
		}, i.push(l, u), Hs(l.x, l.y, +n[d], +n[d + 1], +n[d + 2], +n[d + 3], u.x, u.y, 1 / (o * 2e5), i, i.length - 1);
		for (c = i.length, d = 0; d < c; d++) m = i[d], h = i[d - 1] || m, (m.x > h.x || h.y !== m.y && h.x === m.x || m === h) && m.x <= 1 ? (h.cx = m.x - h.x, h.cy = m.y - h.y, h.n = m, h.nx = m.x, s && d > 1 && Math.abs(h.cy / h.cx - i[d - 2].cy / i[d - 2].cx) > 2 && (s = 0), h.cx < r && (h.cx ? r = h.cx : (h.cx = .001, d === c - 1 && (h.x -= .001, r = Math.min(r, .001), s = 0)))) : (i.splice(d--, 1), c--);
		if (c = 1 / r + 1 | 0, f = 1 / c, p = 0, m = i[0], s) {
			for (d = 0; d < c; d++) g = d * f, m.nx < g && (m = i[++p]), l = m.y + (g - m.x) / m.cx * m.cy, a[d] = {
				x: g,
				cx: f,
				y: l,
				cy: 0,
				nx: 9
			}, d && (a[d - 1].cy = l - a[d - 1].y);
			p = i[i.length - 1], a[c - 1].cy = p.y - l, a[c - 1].cx = p.x - a[a.length - 1].x;
		} else {
			for (d = 0; d < c; d++) m.nx < d * f && (m = i[++p]), a[d] = m;
			p < i.length - 1 && (a[d - 1] = i[i.length - 2]);
		}
		return this.ease = function(e) {
			var t = a[e * c | 0] || a[c - 1];
			return t.nx < e && (t = t.n), t.y + (e - t.x) / t.cx * t.cy;
		}, this.ease.custom = this, this.id && js && js.registerEase(this.id, this.ease), this;
	}, t.getSVGData = function(t) {
		return e.getSVGData(this, t);
	}, e.create = function(t, n, r) {
		return new e(t, n, r).ease;
	}, e.register = function(e) {
		js = e, Ps();
	}, e.get = function(e) {
		return js.parseEase(e);
	}, e.getSVGData = function(t, n) {
		n ||= {};
		var r = n.width || 100, i = n.height || 100, a = n.x || 0, o = (n.y || 0) + i, s = js.utils.toArray(n.path)[0], c, l, u, d, f, p, m, h, g, _;
		if (n.invert && (i = -i, o = 0), typeof t == "string" && (t = js.parseEase(t)), t.custom && (t = t.custom), t instanceof e) c = As(Ds([t.segment.slice(0)], r, 0, 0, -i, a, o));
		else {
			for (c = [a, o], m = Math.max(5, (n.precision || 1) * 200), d = 1 / m, m += 2, h = 5 / m, g = Is(a + d * r), _ = Is(o + t(d) * -i), l = (_ - o) / (g - a), u = 2; u < m; u++) f = Is(a + u * d * r), p = Is(o + t(u * d) * -i), (Math.abs((p - _) / (f - g) - l) > h || u === m - 1) && (c.push(g, _), l = (p - _) / (f - g)), g = f, _ = p;
			c = "M" + c.join(",");
		}
		return s && s.setAttribute("d", c), c;
	}, e;
}();
//#endregion
//#region src/easing.js
Us.version = "3.15.0", Us.headless = !0, Ns() && js.registerPlugin(Us), Z.registerPlugin(Us);
var Ws = {
	ease: [
		.25,
		.1,
		.25,
		1
	],
	linear: [
		0,
		0,
		1,
		1
	],
	"ease-in": [
		.42,
		0,
		1,
		1
	],
	"ease-out": [
		0,
		0,
		.58,
		1
	],
	"ease-in-out": [
		.42,
		0,
		.58,
		1
	]
}, Gs = null;
function Ks() {
	if (Gs) return Gs;
	let e = getComputedStyle(document.documentElement).getPropertyValue("--easing").trim(), t = e.match(/cubic-bezier\(([^)]+)\)/), n = t ? t[1].split(",").map(Number) : Ws[e];
	if (!n || n.length !== 4 || n.some(Number.isNaN)) return "power2.inOut";
	let [r, i, a, o] = n;
	return Us.create("site", `M0,0 C${r},${i} ${a},${o} 1,1`), Gs = "site", Gs;
}
//#endregion
//#region src/loader.js
var qs = 1 / 5.8, Js = .275, Ys = .7, Xs = .5, Zs = .5, Qs = 1.5, $s = .025, ec = .3, tc = .025, nc = .6, rc = .3, ic = .9, ac = 12, oc = .3, sc = .3, cc = .3, lc, uc = new Promise((e) => lc = e);
function dc(e) {
	uc.then(e);
}
function fc() {
	let e = document.querySelector(".loader");
	if (!e) return lc();
	let t = document.documentElement;
	t.classList.add("is-loading"), t.style.overflow = "hidden";
	let n = e.querySelector(".loader-logo"), r = e.querySelector("[data-loader-label=\"left\"]"), i = e.querySelector("[data-loader-label=\"right\"]"), a = e.querySelector(".loader-enter"), o = e.querySelector(".loader-square"), s = e.querySelector(".loader-dot"), c = "http://www.w3.org/2000/svg", l = document.createElementNS(c, "svg");
	Object.assign(l.style, {
		position: "absolute",
		inset: "0",
		width: "100%",
		height: "100%",
		overflow: "visible",
		pointerEvents: "none",
		opacity: String(Xs)
	});
	let u = [
		"circle",
		"circle",
		"ellipse",
		"ellipse"
	].map((e) => {
		let t = document.createElementNS(c, e);
		return t.setAttribute("fill", "none"), t.setAttribute("stroke", "var(--white)"), t.setAttribute("stroke-width", String(Zs)), t.setAttribute("vector-effect", "non-scaling-stroke"), t.setAttribute("pathLength", "1"), t.style.strokeDasharray = "1", t.style.strokeDashoffset = "1", l.append(t), t;
	});
	e.prepend(l);
	let d = { a: 0 }, f = null, p = (e, t, n, r = 0) => {
		e && (Object.assign(e.style, {
			position: "absolute",
			left: "0",
			top: "0",
			margin: "0"
		}), e.style.transform = `translate(${t}px, ${n}px) translate(-50%, -50%) rotate(${r}deg)`);
	};
	function m() {
		if (!f) return;
		let { cx: e, cy: t, r: n } = f, r = (e, r) => {
			let i = r * Math.PI / 180;
			return [e + n * Math.cos(i), t + n * Math.sin(i)];
		};
		p(o, ...r(e - n / 2, -60 + d.a)), p(s, ...r(e + n / 2, 120 + d.a));
	}
	function h() {
		let e = innerWidth / 2, t = innerHeight / 2, a = Math.min(innerWidth * qs, innerHeight * Js);
		f = {
			cx: e,
			cy: t,
			r: a
		}, [e - a / 2, e + a / 2].forEach((e, n) => {
			let r = u[n];
			r.setAttribute("cx", e), r.setAttribute("cy", t), r.setAttribute("r", a), r.setAttribute("transform", `rotate(-90 ${e} ${t})`);
			let i = u[n + 2];
			i.setAttribute("cx", e), i.setAttribute("cy", t), i.setAttribute("rx", a), i.setAttribute("ry", a * Ys);
		}), p(n, e, t), p(r, e - a, t, -90), p(i, e + a, t, -90), m();
	}
	h(), addEventListener("resize", h);
	let g = [
		n,
		r,
		i,
		a
	].filter(Boolean), _ = [o, s].filter(Boolean);
	Z.set([...g, ..._], { opacity: 0 });
	let v = Ks(), y = Z.timeline({ defaults: { ease: v } });
	y.to(u, {
		strokeDashoffset: 0,
		duration: Qs,
		stagger: $s
	}, 0).to(g, {
		opacity: 1,
		duration: ec,
		stagger: tc
	}, nc).to(_, {
		opacity: 1,
		duration: rc
	}, ic);
	let b = Z.to(d, {
		a: 360,
		duration: ac,
		ease: "none",
		repeat: -1,
		onUpdate: m
	});
	matchMedia("(prefers-reduced-motion: reduce)").matches && (y.progress(1), b.pause());
	let x = !1;
	function S(n) {
		x || (x = !0, n?.preventDefault(), y.kill(), Z.timeline({ defaults: { ease: v } }).to([
			l,
			...g,
			..._
		], {
			opacity: 0,
			duration: oc
		}).add(() => {
			t.classList.remove("is-loading"), t.style.overflow = "", lc();
		}, `+=${cc}`).to(e, {
			opacity: 0,
			duration: sc
		}).add(() => {
			b.kill(), removeEventListener("resize", h), removeEventListener("keydown", C), e.remove();
		}));
	}
	let C = (e) => e.key === "Enter" && S(e);
	a?.addEventListener("click", S), addEventListener("keydown", C);
}
//#endregion
//#region src/sound.js
var pc = .025, mc = null, hc = null;
function gc() {
	try {
		if (mc ??= new AudioContext(), mc.state === "suspended" && mc.resume(), !hc) {
			hc = mc.createBuffer(1, Math.round(mc.sampleRate * .03), mc.sampleRate);
			let e = hc.getChannelData(0);
			for (let t = 0; t < e.length; t++) e[t] = Math.random() * 2 - 1;
		}
	} catch {}
}
function _c(e = pc) {
	if (!e || !mc || mc.state !== "running") return;
	let t = mc.currentTime, n = mc.createBufferSource();
	n.buffer = hc;
	let r = mc.createBiquadFilter();
	r.type = "highpass", r.frequency.value = 2500;
	let i = mc.createGain();
	i.gain.setValueAtTime(e, t), i.gain.exponentialRampToValueAtTime(.001, t + .025), n.connect(r).connect(i).connect(mc.destination), n.start(t), n.stop(t + .03);
}
[
	"pointerdown",
	"keydown",
	"touchend"
].forEach((e) => addEventListener(e, gc, { passive: !0 }));
//#endregion
//#region src/pages/home.js
var vc = /* @__PURE__ */ t({
	destroy: () => Ac,
	init: () => kc
});
Z.registerPlugin(fo, hs);
var yc = 45, bc = .5, xc = .85, Sc = 400, Cc = 40, wc = 1.5, Tc = 6, Ec = 2, Dc = "expo.out", Oc = null;
function kc(e) {
	let t = e.querySelector(".selected-list"), n = [...t?.querySelectorAll(".selected-item") ?? []];
	if (!n.length) return;
	let r = n.length, i = n.map((e) => e.querySelector(".selected-media")), a = document.createElement("div"), o = 0, s = -1;
	function c() {
		let e = Math.max(...n.map((e) => e.offsetHeight));
		o = Math.max(innerHeight * xc, (e + Cc) / Math.sin(yc * Math.PI / 180));
	}
	let l = () => -Z.getProperty(a, "y") / Sc, u = Z.utils.wrap(-r / 2, r / 2);
	Object.assign(t.style, {
		position: "relative",
		overflow: "hidden"
	}), n.forEach((e) => {
		Object.assign(e.style, {
			position: "absolute",
			top: "50%",
			left: "50%",
			margin: "0",
			transition: "opacity 300ms var(--easing)"
		}), e.querySelectorAll("img").forEach((e) => e.draggable = !1), e.dataset.client = [...e.querySelectorAll("[data-client]")].map((e) => (e.dataset.client || e.textContent).trim()).filter(Boolean).join(", ");
	});
	let d = (t) => e.querySelector(`[${t}]`) || document.querySelector(`[${t}]`), f = {
		name: d("titles-name"),
		year: d("titles-year"),
		client: d("titles-clients")
	}, p = [...e.querySelectorAll(".triangle-left")];
	p.length || console.warn("[home] .triangle-left introuvable dans la page"), p.forEach((e) => e.style.transition = "rotate 300ms var(--easing)");
	let m = null;
	function h() {
		let e = m && document.elementsFromPoint(m.x, m.y).includes(n[s]);
		p.forEach((t) => t.style.rotate = e ? "180deg" : "");
	}
	function g() {
		let t = l();
		n.forEach((e, n) => {
			let a = r > 1 ? u(n - t) : 0;
			if (Math.abs(a) > wc) {
				e.style.visibility = "hidden";
				return;
			}
			let s = a * yc * Math.PI / 180, c = o - o * Math.cos(s), l = o * Math.sin(s);
			e.style.visibility = "", e.style.translate = `calc(-50% + ${c}px) calc(-50% + ${l}px)`, e.style.rotate = `${-a * yc}deg`;
			let d = Math.max(0, 1 - Math.abs(a)), f = i[n];
			f && (f.style.scale = 1 + .75 * d);
		});
		let a = (Math.round(t) % r + r) % r;
		if (a !== s) {
			s !== -1 && _c(), s = a, n.forEach((e, t) => {
				e.classList.toggle("active", t === a), e.style.opacity = t === a ? 1 : bc;
			});
			for (let e in f) f[e] && (f[e].textContent = n[a].dataset[e] ?? "");
			h(), e.dispatchEvent(new CustomEvent("selected:change", { detail: {
				index: a,
				item: n[a]
			} }));
		}
	}
	function _(e) {
		Z.to(a, {
			y: -(Math.round(l()) + e) * Sc,
			duration: .6,
			ease: "power3.out",
			overwrite: !0,
			onUpdate: g
		});
	}
	let [v] = fo.create(a, {
		trigger: t,
		type: "y",
		inertia: !0,
		dragClickables: !0,
		snap: { y: (e) => Math.round(e / Sc) * Sc },
		onPress: () => Z.killTweensOf(a),
		onDrag: g,
		onThrowUpdate: g
	}), y = 0, b = null, x = () => /\b(about-open|is-loading)\b/.test(document.documentElement.className);
	function S(e) {
		if (x()) return;
		e.preventDefault();
		let t = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
		b || (y = Z.getProperty(a, "y")), y -= t, Z.to(a, {
			y,
			duration: .4,
			ease: "power2.out",
			overwrite: !0,
			onUpdate: g
		}), clearTimeout(b), b = setTimeout(() => {
			b = null, _(0);
		}, 150);
	}
	function C(e) {
		x() || ((e.key === "ArrowDown" || e.key === "ArrowRight") && _(1), (e.key === "ArrowUp" || e.key === "ArrowLeft") && _(-1));
	}
	function w(e) {
		let t = e.target.closest(".selected-item"), r = n.indexOf(t);
		r !== -1 && r !== s && (e.preventDefault(), e.stopPropagation(), _(Math.round(u(r - l()))));
	}
	let T = null;
	function E() {
		cancelAnimationFrame(T), T = requestAnimationFrame(() => {
			c(), g();
		});
	}
	let D = null;
	function O(e) {
		m = {
			x: e.clientX,
			y: e.clientY
		}, cancelAnimationFrame(D), D = requestAnimationFrame(h);
	}
	function k() {
		m = null, h();
	}
	if (addEventListener("wheel", S, { passive: !1 }), addEventListener("keydown", C), addEventListener("resize", E), t.addEventListener("click", w, !0), addEventListener("pointermove", O), document.documentElement.addEventListener("pointerleave", k), c(), !matchMedia("(prefers-reduced-motion: reduce)").matches) {
		Z.set(a, { y: Tc * Sc });
		let e = Z.to(a, {
			y: 0,
			duration: Ec,
			ease: Dc,
			paused: !0,
			onUpdate: g
		});
		dc(() => e.play());
	}
	g(), Oc = () => {
		cancelAnimationFrame(T), v.kill(), Z.killTweensOf(a), clearTimeout(b), removeEventListener("wheel", S), removeEventListener("keydown", C), removeEventListener("resize", E), t.removeEventListener("click", w, !0), cancelAnimationFrame(D), removeEventListener("pointermove", O), document.documentElement.removeEventListener("pointerleave", k);
	};
}
function Ac() {
	Oc?.(), Oc = null;
}
//#endregion
//#region src/pages/journal-details.js
var jc = /* @__PURE__ */ t({
	destroy: () => Ic,
	init: () => Fc
}), Mc = .5, Nc = .08, Pc = null;
function Fc(e) {
	let t = [...e.querySelectorAll(".media-item")];
	if (!t.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	let n = Z.fromTo(t, { filter: "opacity(0)" }, {
		filter: "opacity(1)",
		duration: Mc,
		stagger: Nc,
		ease: "none",
		clearProps: "filter",
		paused: !0
	});
	dc(() => n.play()), Pc = () => n.kill();
}
function Ic() {
	Pc?.(), Pc = null;
}
//#endregion
//#region src/pages/journal.js
var Lc = /* @__PURE__ */ t({
	destroy: () => Wc,
	init: () => Uc
});
Z.registerPlugin(fo, hs);
var Rc = .5, zc = "opacity 300ms var(--easing)", Bc = .5, Vc = .08, Hc = null;
function Uc(e) {
	let t = e.querySelector(".journal-list"), n = [...t?.querySelectorAll(".journal-item") ?? []];
	if (!n.length) return;
	let r = [], i = -1;
	n.forEach((e) => {
		e.style.transition = zc, e.querySelectorAll("img").forEach((e) => e.draggable = !1);
	});
	function a() {
		let e = Z.getProperty(t, "x");
		r = n.map((t) => {
			let n = t.getBoundingClientRect();
			return innerWidth / 2 - (n.left - e + n.width / 2);
		});
	}
	let o = (e) => r.reduce((t, n, i) => Math.abs(n - e) < Math.abs(r[t] - e) ? i : t, 0), s = (e) => Math.min(Math.max(e, r[r.length - 1]), r[0]);
	function c() {
		let e = o(Z.getProperty(t, "x"));
		e !== i && (i !== -1 && _c(), i = e, n.forEach((t, n) => {
			t.classList.toggle("active", n === e), t.style.opacity = n === e ? "1" : String(Rc);
		}));
	}
	function l(e) {
		let i = Math.min(Math.max(e, 0), n.length - 1);
		Z.to(t, {
			x: r[i],
			duration: .6,
			ease: "power3.out",
			overwrite: !0,
			onUpdate: c
		});
	}
	let [u] = fo.create(t, {
		type: "x",
		inertia: !0,
		dragClickables: !0,
		edgeResistance: .85,
		bounds: {
			minX: 0,
			maxX: 0
		},
		snap: { x: (e) => r[o(e)] },
		onPress: () => Z.killTweensOf(t),
		onDrag: c,
		onThrowUpdate: c
	});
	function d() {
		u.applyBounds({
			minX: r[r.length - 1],
			maxX: r[0]
		});
	}
	let f = () => /\b(about-open|is-loading)\b/.test(document.documentElement.className), p = 0, m = null;
	function h(e) {
		if (f()) return;
		e.preventDefault();
		let n = e.deltaMode === 1 ? 16 : 1, r = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * n;
		m || (p = Z.getProperty(t, "x")), p = s(p - r), Z.to(t, {
			x: p,
			duration: .4,
			ease: "power2.out",
			overwrite: !0,
			onUpdate: c
		}), clearTimeout(m), m = setTimeout(() => {
			m = null, l(o(p));
		}, 150);
	}
	function g(e) {
		f() || ((e.key === "ArrowRight" || e.key === "ArrowDown") && l(i + 1), (e.key === "ArrowLeft" || e.key === "ArrowUp") && l(i - 1));
	}
	function _(e) {
		let t = n.indexOf(e.target.closest(".journal-item"));
		t !== -1 && t !== i && (e.preventDefault(), e.stopPropagation(), l(t));
	}
	let v = null;
	function y() {
		cancelAnimationFrame(v), v = requestAnimationFrame(() => {
			let e = Math.max(i, 0);
			a(), d(), Z.set(t, { x: r[e] });
		});
	}
	addEventListener("wheel", h, { passive: !1 }), addEventListener("keydown", g), addEventListener("resize", y), addEventListener("load", y), t.addEventListener("click", _, !0), a(), d(), Z.set(t, { x: r[0] }), c();
	let b = null;
	matchMedia("(prefers-reduced-motion: reduce)").matches || (b = Z.fromTo(n, { filter: "opacity(0)" }, {
		filter: "opacity(1)",
		duration: Bc,
		stagger: Vc,
		ease: "none",
		clearProps: "filter",
		paused: !0
	}), dc(() => b?.play())), Hc = () => {
		b?.kill(), u.kill(), Z.killTweensOf(t), clearTimeout(m), cancelAnimationFrame(v), removeEventListener("wheel", h), removeEventListener("keydown", g), removeEventListener("resize", y), removeEventListener("load", y), t.removeEventListener("click", _, !0);
	};
}
function Wc() {
	Hc?.(), Hc = null;
}
//#endregion
//#region src/pages/work-details.js
var Gc = /* @__PURE__ */ t({
	destroy: () => Xc,
	init: () => Yc
}), Kc = .5, qc = .08, Jc = null;
function Yc(e) {
	let t = [...e.querySelectorAll(".media-item")];
	if (!t.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	let n = Z.fromTo(t, { filter: "opacity(0)" }, {
		filter: "opacity(1)",
		duration: Kc,
		stagger: qc,
		ease: "none",
		clearProps: "filter",
		paused: !0
	});
	dc(() => n.play()), Jc = () => n.kill();
}
function Xc() {
	Jc?.(), Jc = null;
}
//#endregion
//#region src/pages/work.js
var Zc = /* @__PURE__ */ t({
	destroy: () => Cl,
	init: () => Sl
}), Qc = .5, $c = 16, el = -.1, tl = .6, nl = .5, rl = 1, il = .5, al = .5, ol = .5, sl = 12, cl = .1, ll = "left 300ms var(--easing), top 300ms var(--easing)", ul = 40, dl = 1.8, fl = "expo.out", pl = .4, ml = .03, hl = .6, gl = .1, _l = null, vl = (e) => [...e.querySelectorAll(".clients-item")].map((e) => (e.dataset.client || e.textContent).trim()).filter(Boolean), yl = (e = "") => e.toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function bl(e, t) {
	let n = [e, t].sort().join("|"), r = 2166136261;
	for (let e = 0; e < n.length; e++) r = Math.imul(r ^ n.charCodeAt(e), 16777619);
	return (r >>> 0) / 4294967295;
}
function xl(e) {
	let t = Math.ceil(e / 2), n = [];
	return [[
		t,
		hl,
		"inner"
	], [
		e - t,
		1,
		"outer"
	]].forEach(([e, t, r]) => {
		for (let i = 0; i < e; i++) {
			let a = -Math.PI / 2 + i / e * Math.PI * 2;
			n.push({
				x: t * Math.cos(a),
				y: t * Math.sin(a),
				ring: r
			});
		}
	}), n;
}
function Sl(e) {
	let t = e.querySelector(".dots-list"), n = [...t?.querySelectorAll(".dots-item") ?? []], r = e.querySelector(".index-list"), i = [...r?.querySelectorAll(".index-item") ?? []], a = [], o = (e, t, n) => {
		e.addEventListener(t, n), a.push(() => e.removeEventListener(t, n));
	}, s = /* @__PURE__ */ new Map();
	i.forEach((e) => {
		let t = e.querySelector(".index-link"), n = t?.getAttribute("href")?.trim();
		if (!n || /^([a-z]+:|#|\/\/)/i.test(n)) return;
		let r = n.replace(/^\/+/, "");
		s.set(e, r.split("/").filter(Boolean).pop()), r && !r.startsWith("work/") && t.setAttribute("href", `/work/${r}`);
	});
	let c = new Intl.Collator("fr", {
		numeric: !0,
		sensitivity: "base"
	});
	i.forEach((e) => {
		e.dataset.client = vl(e).join(", "), e.dataset.services = [...e.querySelectorAll(".services-item")].map((e) => e.textContent.trim()).filter(Boolean).join(", ");
	});
	let l = [
		"index",
		"type",
		"year",
		"services",
		"client"
	], u = new Map(n.map((e) => [yl(e.dataset.dots), e])), d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
	i.forEach((e) => {
		let t = [e.dataset.index, s.get(e)].map(yl).filter(Boolean).map((e) => u.get(e)).find(Boolean);
		t && (d.set(e, t.dataset.dots), f.set(t.dataset.dots, e), l.forEach((n) => {
			e.dataset[n] && !t.dataset[n] && (t.dataset[n] = e.dataset[n]);
		}));
	});
	let p = /* @__PURE__ */ new Map();
	n.forEach((e) => {
		let t = vl(e);
		t.length && (e.dataset.client = t.join(", "));
		let n = (e.dataset.client ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
		p.set(e.dataset.dots, new Set(n));
	});
	function m(e) {
		if (!e) return [];
		let t = p.get(e) ?? /* @__PURE__ */ new Set();
		return n.filter(W).map((e) => e.dataset.dots).filter((n) => n === e || [...p.get(n) ?? []].some((e) => t.has(e)));
	}
	let h = /* @__PURE__ */ new Map(), g = {
		inner: 0,
		outer: 0
	}, _ = null;
	function v({ animate: e = !0 } = {}) {
		_ && (_.kill(), _ = null, g.inner = g.outer = 0);
		let t = [...r?.querySelectorAll(".index-item") ?? []], i = (e) => {
			let n = t.indexOf(f.get(e.dataset.dots));
			return n === -1 ? Infinity : n;
		}, a = n.filter(W).sort((e, t) => i(e) - i(t)), o = xl(a.length);
		h = new Map(o.map((e, t) => [a[t], e])), S({ animate: e });
	}
	let y = /* @__PURE__ */ new Map(), b = (e) => e.querySelector(".dots-link") || e;
	n.forEach((e) => {
		b(e).style.transition = "none";
	});
	let x = 0;
	function S({ animate: e = !1 } = {}) {
		if (!t) return;
		let r = t.getBoundingClientRect();
		if (!r.width && !r.height) return;
		let i = {
			left: Math.max(r.left, 0) - r.left,
			top: Math.max(r.top, 0) - r.top,
			right: Math.min(r.right, innerWidth) - r.left,
			bottom: Math.min(r.bottom, innerHeight) - r.top
		};
		(i.right <= i.left || i.bottom <= i.top) && (i = {
			left: 0,
			top: 0,
			right: r.width,
			bottom: r.height
		});
		let a = r.width / 2, o = r.height / 2;
		x = Math.min(r.width, r.height) / 2 * Qc, E(a, o), n.filter(W).map((e) => {
			let t = e.getBoundingClientRect(), n = b(e).getBoundingClientRect(), r = n.left + n.width / 2 - t.left, i = n.top + n.height / 2 - t.top;
			return {
				dot: e,
				ax: r,
				ay: i,
				ext: {
					left: -r,
					top: -i,
					right: t.width - r,
					bottom: t.height - i
				}
			};
		}).forEach(({ dot: t, ax: n, ay: r, ext: s }) => {
			let c = (e, t, n) => t > n ? (t + n) / 2 : Math.min(Math.max(e, t), n), l = h.get(t), u = (g[l.ring] ?? 0) * Math.PI / 180, d = l.x * Math.cos(u) - l.y * Math.sin(u), f = l.x * Math.sin(u) + l.y * Math.cos(u), p = c(a + d * x, i.left + $c - s.left, i.right - $c - s.right), m = c(o + f * x, i.top + $c - s.top, i.bottom - $c - s.bottom);
			t.style.transition = e ? ll : "none", t.style.left = `${p - n}px`, t.style.top = `${m - r}px`, y.set(t, {
				x: p,
				y: m
			});
		});
	}
	let C = "http://www.w3.org/2000/svg", w = document.createElementNS(C, "svg");
	Object.assign(w.style, {
		position: "absolute",
		inset: "0",
		width: "100%",
		height: "100%",
		overflow: "visible",
		pointerEvents: "none",
		opacity: String(gl)
	});
	let T = [
		hl - .4 / 2,
		1.6 / 2,
		1.2
	].map((e) => {
		let t = document.createElementNS(C, "circle");
		return t.setAttribute("fill", "none"), t.setAttribute("stroke", "var(--white)"), t.setAttribute("stroke-width", String(al)), t.setAttribute("vector-effect", "non-scaling-stroke"), w.append(t), {
			circle: t,
			ratio: e
		};
	});
	t && gl && t.prepend(w);
	function E(e, t) {
		T.forEach(({ circle: n, ratio: r }) => {
			n.setAttribute("cx", e), n.setAttribute("cy", t), n.setAttribute("r", Math.max(x * r, 0));
		});
	}
	let D = document.createElementNS(C, "svg");
	Object.assign(D.style, {
		position: "absolute",
		inset: "0",
		width: "100%",
		height: "100%",
		overflow: "visible",
		pointerEvents: "none",
		opacity: "0",
		transition: "none"
	});
	let O = document.createElementNS(C, "path");
	O.setAttribute("fill", "none"), O.setAttribute("stroke", "var(--white)"), O.setAttribute("stroke-width", String(al)), O.setAttribute("vector-effect", "non-scaling-stroke"), D.append(O), t && (getComputedStyle(t).position === "static" && (t.style.position = "relative"), t.prepend(D));
	let k = null;
	function A(e) {
		let t = e.map((e) => n.find((t) => t.dataset.dots === e)).filter((e) => e && W(e) && y.has(e)).map((e) => ({
			...y.get(e),
			slug: e.dataset.dots
		}));
		if (t.length < 2) {
			D.style.opacity = "0";
			return;
		}
		let r = {
			x: t.reduce((e, t) => e + t.x, 0) / t.length,
			y: t.reduce((e, t) => e + t.y, 0) / t.length
		};
		t.sort((e, t) => Math.atan2(e.y - r.y, e.x - r.x) - Math.atan2(t.y - r.y, t.x - r.x));
		let i = t.length === 2 ? 1 : t.length, a = `M${t[0].x} ${t[0].y}`;
		for (let e = 0; e < i; e++) {
			let n = t[e], i = t[(e + 1) % t.length], o = (n.x + i.x) / 2, s = (n.y + i.y) / 2, c = (Math.hypot(i.x - n.x, i.y - n.y) / (x * nl || 1)) ** rl, l = 1 + tl * (bl(n.slug, i.slug) * 2 - 1), u = el * c * l, d = Math.sign(u) * Math.min(Math.abs(u), il), f = -(i.y - n.y), p = i.x - n.x;
			f * (o - r.x) + p * (s - r.y) < 0 && (f = -f, p = -p), f *= d, p *= d, a += `Q${o + f} ${s + p} ${i.x} ${i.y}`;
		}
		O.setAttribute("d", a), D.style.opacity = "1";
	}
	let j = /* @__PURE__ */ new Set();
	function M(e, t, n = null) {
		let r = W(e);
		if (e.style.pointerEvents = r ? "" : "none", !r) return void (e.style.opacity = String(cl));
		if (!t || !n || !e.contains(n)) return void (e.style.opacity = t ? String(ol) : "");
		e.style.opacity = "";
		for (let t = n; t !== e; t = t.parentElement) [...t.parentElement.children].forEach((e) => {
			e === t || e.classList.contains("index-media") || (e.style.transition = "none", e.style.opacity = String(ol), j.add(e));
		});
	}
	function N(e, t = null) {
		j.forEach((e) => e.style.opacity = ""), j.clear(), i.forEach((n) => M(n, e(n), t));
	}
	function P(e, { scroll: t = !1 } = {}) {
		let r = m(e);
		if (k = r, n.forEach((e) => {
			b(e).style.opacity = r.includes(e.dataset.dots) ? "1" : "";
		}), N((e) => !r.includes(d.get(e))), A(r), t) {
			let t = i.filter((e) => W(e) && r.includes(d.get(e))), n = t.some((e) => {
				let t = e.getBoundingClientRect();
				return t.bottom > 0 && t.top < innerHeight && t.right > 0 && t.left < innerWidth;
			}), a = f.get(e) ?? t[0];
			!n && a && a.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		}
	}
	function ee() {
		k = null, n.forEach((e) => {
			b(e).style.opacity = "";
		}), N(() => !1), D.style.opacity = "0";
	}
	let F = {
		client: (e) => e.dataset.client.split(", ")[0],
		project: (e) => e.dataset.index,
		type: (e) => e.dataset.type,
		year: (e) => e.dataset.year
	}, I = "client", L = !1;
	function R(t, n = !1, a = !0) {
		if (!F[t] || !r) return;
		L = n && t === I ? !L : !1, I = t, e.querySelectorAll(".index-caption [data-caption]").forEach((e) => {
			e.classList.toggle("active", e.dataset.caption === t), e.classList.toggle("reverse", e.dataset.caption === t && L);
		});
		let o = (e) => (F[t](e) ?? "").trim();
		i.slice().sort((e, t) => {
			let n = o(e), r = o(t);
			return !n || !r ? !n - !r : L ? c.compare(r, n) : c.compare(n, r);
		}).sort((e, t) => W(t) - W(e)).forEach((e) => r.append(e)), te(), v({ animate: a });
	}
	let z = (e) => {
		let t = e.querySelector(".clients-item");
		return t ? e.querySelector(".clients-list") || (t.parentElement === e ? t : t.parentElement) : null;
	}, B = /* @__PURE__ */ new Map();
	function te() {
		B = /* @__PURE__ */ new Map();
		let e = null, t = null;
		[...r.querySelectorAll(".index-item")].forEach((n) => {
			let r = z(n);
			r && (r.style.translate = "", r.style.pointerEvents = "none");
			let i = n.dataset.client.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean).sort().join("|"), a = i && `${W(n)}:${i}`;
			I !== "client" || !a ? (r && (r.style.visibility = ""), t = null) : (a !== t && (e = {
				label: r,
				items: []
			}), e.items.push(n), B.set(n, e), r && (r.style.visibility = a === t ? "hidden" : ""), t = a);
		});
	}
	function ne() {
		let e = H && B.get(H);
		if (B.forEach((t) => t !== e && t.label && (t.label.style.translate = "")), !e?.label) return;
		let t = e.label;
		t.style.translate = "";
		let n = t.getBoundingClientRect(), r = e.items[0].getBoundingClientRect().top, i = e.items[e.items.length - 1].getBoundingClientRect().bottom, a = Math.min(Math.max(V.y - n.height / 2, r), i - n.height);
		t.style.translate = `0 ${a - n.top}px`;
	}
	let V = {
		x: innerWidth / 2,
		y: innerHeight / 2
	}, re = /* @__PURE__ */ new Map();
	i.forEach((e) => {
		e.style.transition = "none";
		let t = e.querySelector(":scope > .index-media") || e.querySelector(".index-media");
		t && (Object.assign(t.style, {
			position: "fixed",
			top: "0",
			left: "0",
			pointerEvents: "none",
			opacity: "0",
			transition: "none"
		}), re.set(e, t));
	});
	let H = null;
	function ie(e) {
		let t = e.offsetWidth, n = V.x + sl, r = n + t + sl > innerWidth ? V.x - sl - t : n, i = Math.min(V.y + sl, innerHeight - e.offsetHeight - sl);
		e.style.transform = `translate(${Math.max(r, 0)}px, ${Math.max(i, 0)}px)`;
	}
	function ae(e) {
		H = e, P(d.get(e)), N((t) => t !== e, B.get(e)?.label), ne();
		let t = re.get(e);
		t && (ie(t), t.style.opacity = "1");
	}
	function oe(e) {
		H === e && (H = null);
		let t = re.get(e);
		t && (t.style.opacity = "0"), requestAnimationFrame(() => {
			H || (ee(), ne());
		});
	}
	function se(e) {
		V.x = e.clientX, V.y = e.clientY;
		let t = H && re.get(H);
		t && ie(t), ne();
	}
	let U = e.querySelector("#filterButton, .filterButton"), ce = e.querySelector("[data-accordion=\"filter\"]"), le = U?.querySelector(".triangle-bottom svg, svg.triangle-bottom, .triangle-bottom"), ue = !1;
	le && (le.style.transformOrigin = "50% 50%", le.style.transition = "rotate 300ms var(--easing)");
	function de(e) {
		if (ue = e, U?.classList.toggle("active", e), U?.setAttribute("aria-expanded", e), le && (le.style.rotate = e ? "180deg" : ""), ce) {
			let t = ce.querySelector(".accordion-inner");
			ce.style.maxHeight = e && t ? `${t.scrollHeight}px` : "0px";
		}
		ve();
	}
	let fe = [...e.querySelectorAll(".filters [data-service], .filters [data-type]")], pe = (e) => "service" in e.dataset ? "service" : "type", me = (e) => yl(e.dataset[pe(e)]), he = {
		service: /* @__PURE__ */ new Set(),
		type: /* @__PURE__ */ new Set()
	}, ge = U?.querySelector("p"), _e = ge?.textContent.trim() ?? "";
	function W(e) {
		let t = (e.dataset.services ?? "").split(",").map(yl).filter(Boolean), n = yl(e.dataset.type);
		return (!he.service.size || t.some((e) => he.service.has(e))) && (!he.type.size || he.type.has(n));
	}
	function G({ animate: e = !0 } = {}) {
		fe.forEach((e) => {
			let t = pe(e), n = me(e);
			e.classList.toggle("active", n === "all" ? !he[t].size : he[t].has(n));
		});
		let t = he.service.size + he.type.size;
		ge && (ge.textContent = t ? `${_e} (${t})` : _e), ee(), n.forEach((e) => e.style.display = W(e) ? "" : "none"), R(I, !1, e);
	}
	function K(e) {
		let t = pe(e), n = me(e);
		n === "all" ? he[t].clear() : he[t].has(n) ? he[t].delete(n) : he[t].add(n), G(), ve();
	}
	let q = {
		service: "service",
		type: "type"
	};
	function ve() {
		let e = new URL(location.href);
		ue ? e.searchParams.set("filters", "open") : e.searchParams.delete("filters");
		for (let t in q) he[t].size ? e.searchParams.set(q[t], [...he[t]].join(",")) : e.searchParams.delete(q[t]);
		e.href !== location.href && history.replaceState(history.state, "", e.href);
	}
	function ye() {
		let e = new URLSearchParams(location.search);
		for (let t in q) {
			let n = new Set(fe.filter((e) => pe(e) === t).map(me));
			(e.get(q[t]) ?? "").split(",").map(yl).filter((e) => e && e !== "all" && n.has(e)).forEach((e) => he[t].add(e));
		}
		return e.get("filters") === "open";
	}
	n.forEach((e) => {
		o(e, "pointerenter", () => P(e.dataset.dots, { scroll: !0 })), o(e, "pointerleave", ee);
	}), i.forEach((e) => {
		o(e, "pointerenter", () => ae(e)), o(e, "pointerleave", () => oe(e));
	}), o(window, "pointermove", se), o(window, "scroll", () => H && ne()), e.querySelectorAll(".index-caption [data-caption]").forEach((e) => {
		o(e, "click", () => R(e.dataset.caption, !0));
	}), U && o(U, "click", () => de(!ue)), fe.forEach((e) => o(e, "click", () => K(e))), o(document, "click", (e) => {
		ue && !U?.contains(e.target) && !ce?.contains(e.target) && de(!1);
	}), o(document, "keydown", (e) => {
		e.key === "Escape" && ue && de(!1);
	});
	let be = null;
	o(window, "resize", () => {
		cancelAnimationFrame(be), be = requestAnimationFrame(() => {
			S(), k && A(k);
		});
	});
	let xe = ye();
	G({ animate: !1 }), xe && de(!0);
	let Se = matchMedia("(prefers-reduced-motion: reduce)").matches, Ce = null;
	if (!Se) {
		g.inner = -40, g.outer = ul, S(), _ = Z.to(g, {
			inner: 0,
			outer: 0,
			duration: dl,
			ease: fl,
			onUpdate: () => {
				S(), k && A(k);
			},
			onComplete: () => _ = null,
			paused: !0
		});
		let e = [...r?.querySelectorAll(".index-item") ?? []];
		Ce = Z.fromTo(e, { filter: "opacity(0)" }, {
			filter: "opacity(1)",
			duration: pl,
			stagger: ml,
			ease: "none",
			clearProps: "filter",
			paused: !0
		}), dc(() => {
			_?.play(), Ce?.play();
		});
	}
	_l = () => {
		_?.kill(), Ce?.kill(), cancelAnimationFrame(be), a.forEach((e) => e()), D.remove(), w.remove();
	};
}
function Cl() {
	_l?.(), _l = null;
}
//#endregion
//#region src/clock.js
var wl = {
	la: "America/Los_Angeles",
	nyc: "America/New_York"
}, Tl = {
	hour: .6,
	minute: .7,
	second: 1
}, El = 8, Dl = 450, Ol = "la", kl = 0, Al = null, jl = !1, Ml = !1, Nl = null, Pl = null, Fl = null, Il = null, Ll = !1, Rl = {
	second: 0,
	minute: 0,
	hour: 0
}, zl = Object.fromEntries(Object.entries(wl).map(([e, t]) => [e, new Intl.DateTimeFormat("en-GB", {
	timeZone: t,
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hourCycle: "h23"
})]));
function Bl(e, t) {
	let n = Object.fromEntries(zl[e].formatToParts(t).map(({ type: e, value: t }) => [e, +t])), r = n.hour * 3600 + n.minute * 60 + n.second - t / 1e3 % 86400;
	return Math.round((((r + 43200) % 86400 + 86400) % 86400 - 43200) / 900) * 900;
}
function Vl(e) {
	let t = e.querySelector("[data-hand-icon], .icon, svg");
	if (t?.tagName.toLowerCase() !== "svg") return t;
	let n = t.closest(".w-embed");
	return n && e.contains(n) ? n : t;
}
function Hl(e, t, n) {
	let r = e.getBoundingClientRect()[t];
	if (r) return r;
	let i = e.tagName.toLowerCase() === "svg" ? e : e.querySelector("svg"), a = parseFloat(i?.getAttribute(t));
	if (a) return a;
	let o = getComputedStyle(e)[t];
	return o.endsWith("px") ? parseFloat(o) : (parseFloat(n?.fontSize) || 12) * .7;
}
function Ul(e) {
	let t = Vl(e), n = [...e.querySelectorAll("*")].reverse().find((e) => !t?.contains(e) && !e.contains(t) && e.textContent.trim()), r = document.createElement("canvas").getContext("2d"), i = n && getComputedStyle(n);
	i && (r.font = `${i.fontStyle} ${i.fontWeight} ${i.fontSize} ${i.fontFamily}`);
	let a = i && parseFloat(i.letterSpacing) || 0, o = i?.textTransform === "uppercase", s = n ? [...n.textContent] : [], c = s.map((e) => {
		let t = document.createElement("span");
		return t.textContent = e, t.style.whiteSpace = "pre", t;
	});
	n && (n.replaceChildren(...c), n.style.margin = "0");
	let l = t ? Hl(t, "width", i) : 0, u = null;
	if (t) {
		let n = Hl(t, "height", i);
		u = document.createElement("span"), Object.assign(u.style, {
			display: "block",
			width: `${l}px`,
			height: `${n}px`
		}), e.prepend(u), u.append(t), Object.assign(t.style, {
			position: "static",
			display: "block",
			width: `${l}px`,
			height: `${n}px`,
			margin: "0"
		});
	}
	Object.assign(e.style, {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: "0",
		height: "0",
		transformOrigin: "0 0"
	}), e._items = [u, ...c].filter(Boolean), e._widths = [...t ? [l] : [], ...s.map((e) => r.measureText(o ? e.toUpperCase() : e).width + a)];
}
function Wl() {
	let e = document.querySelector(".clock .clock-inner");
	if (!e) return;
	let t = e.getBoundingClientRect(), n = (Math.min(t.width, t.height) || Math.min(innerWidth, innerHeight) * .8) / 2;
	e.querySelectorAll(".hand").forEach((e) => {
		if (!e._items) return;
		let t = n * (+e.dataset.radius || Tl[e.id] || 1), { _items: r, _widths: i } = e, a = 0;
		r.forEach((e, n) => {
			n > 0 && (a += (i[n - 1] / 2 + i[n] / 2 + (n === 1 ? El : 0)) / t), Object.assign(e.style, {
				position: "absolute",
				top: "0",
				left: "0",
				margin: "0",
				transformOrigin: "0 0",
				transform: `rotate(${a}rad) translateY(${-t}px) translate(-50%, -50%)`
			});
		});
	});
}
var Gl = null;
function Kl() {
	cancelAnimationFrame(Gl), Gl = requestAnimationFrame(Wl);
}
function ql() {
	let e = Date.now();
	document.querySelectorAll(".clock [data-time]").forEach((t) => {
		let n = t.dataset.time.toLowerCase();
		zl[n] && (t.textContent = zl[n].format(e));
	}), kl = Bl(Ol, e);
}
function Jl(e) {
	let t = e / 1e3 + kl;
	Al ??= Math.floor(t / 43200) * 43200;
	let n = t - Al;
	return {
		second: n * 6 + Rl.second,
		minute: n / 10 + Rl.minute,
		hour: n / 120 + Rl.hour
	};
}
function Yl(e, t = "") {
	for (let n in e) {
		let r = document.querySelector(`.clock #${n}`);
		r && (r.style.transition = t, r.style.transform = `rotate(${e[n]}deg)`);
	}
}
function Xl() {
	let e = Jl(Date.now());
	Ll && delete e.hour, Yl(e), Nl = requestAnimationFrame(Xl);
}
function Zl(e, t = !1) {
	if (!wl[e]) return;
	let n = Date.now(), r = Jl(n);
	if (Ol = e, document.querySelectorAll(".clock [clock-button]").forEach((t) => {
		t.classList.toggle("active", t.getAttribute("clock-button").toLowerCase() === e);
	}), ql(), !t || !jl) return;
	let i = Jl(n);
	for (let e in i) {
		let t = i[e] - r[e], n = ((t + 180) % 360 + 360) % 360 - 180;
		Rl[e] += n - t;
	}
	Ll = !0, Yl({ hour: Jl(n + Dl).hour }, `transform ${Dl}ms var(--easing)`), clearTimeout(Il), Il = setTimeout(() => {
		Ll = !1, Yl(Jl(Date.now()));
	}, Dl);
}
function Ql() {
	Wl(), ql(), Yl(Jl(Date.now())), Nl = requestAnimationFrame(Xl), Fl = setTimeout(() => {
		ql(), Pl = setInterval(ql, 1e3);
	}, 1e3 - Date.now() % 1e3), addEventListener("resize", Kl);
}
function $l() {
	jl || (jl = !0, Ml && Ql());
}
function eu() {
	jl && (jl = !1, cancelAnimationFrame(Nl), clearTimeout(Fl), clearInterval(Pl), removeEventListener("resize", Kl));
}
async function tu() {
	await document.fonts.ready, document.querySelectorAll(".clock .hand").forEach(Ul), Ml = !0, document.addEventListener("click", (e) => {
		let t = e.target.closest(".clock [clock-button]");
		t && Zl(t.getAttribute("clock-button").toLowerCase(), !0);
	}), Zl("la"), jl && Ql();
}
//#endregion
//#region src/nav.js
function nu(e) {
	let t = new URL(e, location.origin).pathname;
	document.querySelectorAll("a.w--current").forEach((e) => {
		e.classList.remove("w--current"), e.removeAttribute("aria-current");
	}), document.querySelectorAll("a[href]").forEach((e) => {
		e.origin === location.origin && e.pathname === t && (e.classList.add("w--current"), e.setAttribute("aria-current", "page"));
	});
}
var ru = document.createElement("style");
ru.textContent = "\n  html.hide-headline:not(.about-open) #headline { opacity: 0 !important; pointer-events: none !important; }\n  html.about-open #headline { opacity: 1 !important; pointer-events: auto !important; }\n", document.head.append(ru);
function iu({ animate: e = !1 } = {}) {
	let t = document.querySelector("#headline");
	t && (t.style.transition = e ? "opacity 300ms var(--easing)" : "none"), document.documentElement.classList.toggle("hide-headline", t?.dataset.pageHidden === "true");
}
var au = !1;
function ou(e) {
	au = e, document.querySelectorAll("#aboutButton").forEach((t) => t.setAttribute("aria-expanded", e));
	let t = document.querySelector("[data-accordion=\"about\"]"), n = t?.querySelector(".accordion-inner");
	t && (t.style.maxHeight = e && n ? `${n.scrollHeight}px` : "0px"), document.querySelector(".nav .clock")?.classList.toggle("visible", e), e ? $l() : eu();
	let r = document.querySelector(".main-wrapper");
	r && (r.style.opacity = e ? "0.25" : "", r.style.filter = e ? "blur(var(--blur))" : "", r.style.pointerEvents = e ? "none" : ""), document.documentElement.classList.toggle("about-open", e), iu({ animate: !0 }), document.documentElement.style.overflow = e ? "hidden" : "", document.body.style.overflow = e ? "hidden" : "";
	let i = new URL(location.href);
	i.hash = e ? "about" : "", history.replaceState(history.state, "", i.href.replace(/#$/, ""));
}
function su() {
	document.addEventListener("click", (e) => {
		e.target.closest("#aboutButton") && ou(!au);
	}), document.addEventListener("keydown", (e) => {
		e.key === "Escape" && au && ou(!1);
	});
}
function cu() {
	su(), tu(), location.hash === "#about" && ou(!0);
}
//#endregion
//#region node_modules/delegate-it/delegate.js
var lu = /* @__PURE__ */ new WeakMap();
function uu(e, t, n, r) {
	if (!e && !lu.has(t)) return !1;
	let i = lu.get(t) ?? /* @__PURE__ */ new WeakMap();
	lu.set(t, i);
	let a = i.get(n) ?? /* @__PURE__ */ new Set();
	i.set(n, a);
	let o = a.has(r);
	return e ? a.add(r) : a.delete(r), o && e;
}
function du(e, t) {
	let n = e.target;
	if (n instanceof Text && (n = n.parentElement), n instanceof Element && e.currentTarget instanceof Node) {
		let r = n.closest(t);
		if (r && e.currentTarget.contains(r)) return r;
	}
}
function fu(e, t, n, r = {}) {
	if (Array.isArray(t)) {
		for (let i of t) fu(e, i, n, r);
		return;
	}
	let i = t, { signal: a, base: o = document } = r;
	if (a?.aborted) return;
	let { once: s, ...c } = r, l = o instanceof Document ? o.documentElement : o, u = !!(typeof r == "object" ? r.capture : r), d = (t) => {
		let r = du(t, String(e));
		if (r) {
			let e = Object.assign(t, { delegateTarget: r });
			n.call(l, e), s && (l.removeEventListener(i, d, c), uu(!1, l, n, f));
		}
	}, f = JSON.stringify({
		selector: e,
		type: i,
		capture: u
	});
	uu(!0, l, n, f) || l.addEventListener(i, d, c), a?.addEventListener("abort", () => {
		uu(!1, l, n, f);
	});
}
//#endregion
//#region node_modules/swup/dist/Swup.modern.js
function pu() {
	return pu = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, pu.apply(null, arguments);
}
var mu = (e, t) => String(e).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || t || "", hu = ({ hash: e } = {}) => window.location.pathname + window.location.search + (e ? window.location.hash : ""), gu = (e, t = {}) => {
	let n = pu({
		url: e ||= hu({ hash: !0 }),
		random: Math.random(),
		source: "swup"
	}, t);
	window.history.pushState(n, "", e);
}, _u = (e = null, t = {}) => {
	e ||= hu({ hash: !0 });
	let n = pu({}, window.history.state || {}, {
		url: e,
		random: Math.random(),
		source: "swup"
	}, t);
	window.history.replaceState(n, "", e);
}, vu = (e, t, n, r) => {
	let i = new AbortController();
	return r = pu({}, r, { signal: i.signal }), fu(e, t, n, r), { destroy: () => i.abort() };
}, yu = class e extends URL {
	constructor(t, n = document.baseURI) {
		super(t.toString(), n), Object.setPrototypeOf(this, e.prototype);
	}
	get url() {
		return this.pathname + this.search;
	}
	static fromElement(t) {
		let n = t.getAttribute("href") || t.getAttribute("xlink:href") || "";
		return new e(n);
	}
	static fromUrl(t) {
		return new e(t);
	}
}, bu = class extends Error {
	constructor(e, t) {
		super(e), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = t.url, this.status = t.status, this.aborted = t.aborted || !1, this.timedOut = t.timedOut || !1;
	}
};
async function xu(e, t = {}) {
	e = yu.fromUrl(e).url;
	let { visit: n = this.visit } = t, r = pu({}, this.options.requestHeaders, t.headers), i = t.timeout ?? this.options.timeout, a = new AbortController(), { signal: o } = a;
	t = pu({}, t, {
		headers: r,
		signal: o
	});
	let s, c = !1, l = null;
	i && i > 0 && (l = setTimeout(() => {
		c = !0, a.abort("timeout");
	}, i));
	try {
		s = await this.hooks.call("fetch:request", n, {
			url: e,
			options: t
		}, (e, { url: t, options: n }) => fetch(t, n)), l && clearTimeout(l);
	} catch (t) {
		throw c ? (this.hooks.call("fetch:timeout", n, { url: e }), new bu(`Request timed out: ${e}`, {
			url: e,
			timedOut: c
		})) : t?.name === "AbortError" || o.aborted ? new bu(`Request aborted: ${e}`, {
			url: e,
			aborted: !0
		}) : t;
	}
	let { status: u, url: d } = s, f = await s.text();
	if (u === 500) throw this.hooks.call("fetch:error", n, {
		status: u,
		response: s,
		url: d
	}), new bu(`Server error: ${d}`, {
		status: u,
		url: d
	});
	if (!f) throw new bu(`Empty response: ${d}`, {
		status: u,
		url: d
	});
	let { url: p } = yu.fromUrl(d), m = {
		url: p,
		html: f
	};
	return !n.cache.write || t.method && t.method !== "GET" || e !== p || this.cache.set(m.url, m), m;
}
var Su = class {
	constructor(e) {
		this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = e;
	}
	get size() {
		return this.pages.size;
	}
	get all() {
		let e = /* @__PURE__ */ new Map();
		return this.pages.forEach((t, n) => {
			e.set(n, pu({}, t));
		}), e;
	}
	has(e) {
		return this.pages.has(this.resolve(e));
	}
	get(e) {
		let t = this.pages.get(this.resolve(e));
		return t && pu({}, t);
	}
	set(e, t) {
		t = pu({}, t, { url: e = this.resolve(e) }), this.pages.set(e, t), this.swup.hooks.callSync("cache:set", void 0, { page: t });
	}
	update(e, t) {
		e = this.resolve(e);
		let n = pu({}, this.get(e), t, { url: e });
		this.pages.set(e, n);
	}
	delete(e) {
		this.pages.delete(this.resolve(e));
	}
	clear() {
		this.pages.clear(), this.swup.hooks.callSync("cache:clear", void 0, void 0);
	}
	prune(e) {
		this.pages.forEach((t, n) => {
			e(n, t) && this.delete(n);
		});
	}
	resolve(e) {
		let { url: t } = yu.fromUrl(e);
		return this.swup.resolveUrl(t);
	}
}, Cu = (e, t = document) => t.querySelector(e), wu = (e, t = document) => Array.from(t.querySelectorAll(e)), Tu = () => new Promise((e) => {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			e();
		});
	});
});
function Eu(e) {
	return !!e && (typeof e == "object" || typeof e == "function") && typeof e.then == "function";
}
function Du(e, t = []) {
	return new Promise((n, r) => {
		let i = e(...t);
		Eu(i) ? i.then(n, r) : n(i);
	});
}
function Ou(e, t) {
	let n = e?.closest(`[${t}]`);
	return n != null && n.hasAttribute(t) ? n?.getAttribute(t) || !0 : void 0;
}
var ku = class {
	constructor(e) {
		this.swup = void 0, this.swupClasses = [
			"to-",
			"is-changing",
			"is-rendering",
			"is-popstate",
			"is-animating",
			"is-leaving"
		], this.swup = e;
	}
	get selectors() {
		let { scope: e } = this.swup.visit.animation;
		return e === "containers" ? this.swup.visit.containers : e === "html" ? ["html"] : Array.isArray(e) ? e : [];
	}
	get selector() {
		return this.selectors.join(",");
	}
	get targets() {
		return this.selector.trim() ? wu(this.selector) : [];
	}
	add(...e) {
		this.targets.forEach((t) => t.classList.add(...e));
	}
	remove(...e) {
		this.targets.forEach((t) => t.classList.remove(...e));
	}
	clear() {
		this.targets.forEach((e) => {
			let t = e.className.split(" ").filter((e) => this.isSwupClass(e));
			e.classList.remove(...t);
		});
	}
	isSwupClass(e) {
		return this.swupClasses.some((t) => e.startsWith(t));
	}
}, Au = class {
	constructor(e, t) {
		this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
		let { to: n, from: r, hash: i, el: a, event: o } = t;
		this.id = Math.random(), this.state = 1, this.from = {
			url: r ?? e.location.url,
			hash: e.location.hash
		}, this.to = {
			url: n,
			hash: i
		}, this.containers = e.options.containers, this.animation = {
			animate: !0,
			wait: !1,
			name: void 0,
			native: e.options.native,
			scope: e.options.animationScope,
			selector: e.options.animationSelector
		}, this.trigger = {
			el: a,
			event: o
		}, this.cache = {
			read: e.options.cache,
			write: e.options.cache
		}, this.history = {
			action: "push",
			popstate: !1,
			direction: void 0
		}, this.scroll = {
			reset: !0,
			target: void 0
		}, this.meta = {};
	}
	advance(e) {
		this.state < e && (this.state = e);
	}
	abort() {
		this.state = 8;
	}
	ignore() {
		this.state = 10;
	}
	get done() {
		return this.state >= 7;
	}
	get ignored() {
		return this.state === 10;
	}
};
function ju(e) {
	return new Au(this, e);
}
var Mu = class {
	constructor(e) {
		this.swup = void 0, this.registry = /* @__PURE__ */ new Map(), this.hooks = /* @__PURE__ */ "animation:out:start.animation:out:await.animation:out:end.animation:in:start.animation:in:await.animation:in:end.animation:skip.cache:clear.cache:set.content:replace.content:scroll.enable.disable.fetch:request.fetch:error.fetch:timeout.history:popstate.link:click.link:self.link:anchor.link:newtab.page:load.page:view.scroll:top.scroll:anchor.visit:start.visit:transition.visit:abort.visit:end.visit:fail".split("."), this.nextHookId = 0, this.swup = e, this.init();
	}
	init() {
		this.hooks.forEach((e) => this.create(e));
	}
	create(e) {
		this.registry.has(e) || this.registry.set(e, /* @__PURE__ */ new Map());
	}
	exists(e) {
		return this.registry.has(e);
	}
	get(e) {
		let t = this.registry.get(e);
		if (t) return t;
		console.error(`Unknown hook '${e}'`);
	}
	clear() {
		this.registry.forEach((e) => e.clear());
	}
	on(e, t, n = {}) {
		let r = this.get(e);
		if (!r) return console.warn(`Hook '${e}' not found.`), () => {};
		let i = pu({}, n, {
			id: ++this.nextHookId,
			hook: e,
			handler: t
		});
		return r.set(t, i), () => this.off(e, t);
	}
	before(e, t, n = {}) {
		return this.on(e, t, pu({}, n, { before: !0 }));
	}
	replace(e, t, n = {}) {
		return this.on(e, t, pu({}, n, { replace: !0 }));
	}
	once(e, t, n = {}) {
		return this.on(e, t, pu({}, n, { once: !0 }));
	}
	off(e, t) {
		let n = this.get(e);
		n && t ? n.delete(t) || console.warn(`Handler for hook '${e}' not found.`) : n && n.clear();
	}
	async call(e, t, n, r) {
		let [i, a, o] = this.parseCallArgs(e, t, n, r), { before: s, handler: c, after: l } = this.getHandlers(e, o);
		await this.run(s, i, a);
		let [u] = await this.run(c, i, a, !0);
		return await this.run(l, i, a), this.dispatchDomEvent(e, i, a), u;
	}
	callSync(e, t, n, r) {
		let [i, a, o] = this.parseCallArgs(e, t, n, r), { before: s, handler: c, after: l } = this.getHandlers(e, o);
		this.runSync(s, i, a);
		let [u] = this.runSync(c, i, a, !0);
		return this.runSync(l, i, a), this.dispatchDomEvent(e, i, a), u;
	}
	parseCallArgs(e, t, n, r) {
		return t instanceof Au || typeof t != "object" && typeof n != "function" ? [
			t,
			n,
			r
		] : [
			void 0,
			t,
			n
		];
	}
	async run(e, t = this.swup.visit, n, r = !1) {
		let i = [];
		for (let { hook: a, handler: o, defaultHandler: s, once: c } of e) if (t == null || !t.done) {
			c && this.off(a, o);
			try {
				let e = await Du(o, [
					t,
					n,
					s
				]);
				i.push(e);
			} catch (e) {
				if (r) throw e;
				console.error(`Error in hook '${a}':`, e);
			}
		}
		return i;
	}
	runSync(e, t = this.swup.visit, n, r = !1) {
		let i = [];
		for (let { hook: a, handler: o, defaultHandler: s, once: c } of e) if (t == null || !t.done) {
			c && this.off(a, o);
			try {
				let e = o(t, n, s);
				i.push(e), Eu(e) && console.warn(`Swup will not await Promises in handler for synchronous hook '${a}'.`);
			} catch (e) {
				if (r) throw e;
				console.error(`Error in hook '${a}':`, e);
			}
		}
		return i;
	}
	getHandlers(e, t) {
		let n = this.get(e);
		if (!n) return {
			found: !1,
			before: [],
			handler: [],
			after: [],
			replaced: !1
		};
		let r = Array.from(n.values()), i = this.sortRegistrations, a = r.filter(({ before: e, replace: t }) => e && !t).sort(i), o = r.filter(({ replace: e }) => e).filter((e) => !0).sort(i), s = r.filter(({ before: e, replace: t }) => !e && !t).sort(i), c = o.length > 0, l = [];
		if (t && (l = [{
			id: 0,
			hook: e,
			handler: t
		}], c)) {
			let n = o.length - 1, { handler: r, once: i } = o[n], a = (e) => {
				let n = o[e - 1];
				return n ? (t, r) => n.handler(t, r, a(e - 1)) : t;
			};
			l = [{
				id: 0,
				hook: e,
				once: i,
				handler: r,
				defaultHandler: a(n)
			}];
		}
		return {
			found: !0,
			before: a,
			handler: l,
			after: s,
			replaced: c
		};
	}
	sortRegistrations(e, t) {
		return (e.priority ?? 0) - (t.priority ?? 0) || e.id - t.id || 0;
	}
	dispatchDomEvent(e, t, n) {
		if (t != null && t.done) return;
		let r = {
			hook: e,
			args: n,
			visit: t || this.swup.visit
		};
		document.dispatchEvent(new CustomEvent("swup:any", {
			detail: r,
			bubbles: !0
		})), document.dispatchEvent(new CustomEvent(`swup:${e}`, {
			detail: r,
			bubbles: !0
		}));
	}
	parseName(e) {
		let [t, ...n] = e.split(".");
		return [t, n.reduce((e, t) => pu({}, e, { [t]: !0 }), {})];
	}
}, Nu = (e) => {
	if (e && e.charAt(0) === "#" && (e = e.substring(1)), !e) return null;
	let t = decodeURIComponent(e), n = document.getElementById(e) || document.getElementById(t) || Cu(`a[name='${CSS.escape(e)}']`) || Cu(`a[name='${CSS.escape(t)}']`);
	return n || e !== "top" || (n = document.body), n;
}, Pu = "transition", Fu = "animation";
async function Iu({ selector: e, elements: t }) {
	if (!1 === e && !t) return;
	let n = [];
	if (t) n = Array.from(t);
	else if (e && (n = wu(e, document.body), !n.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${e}\``);
	let r = n.map((e) => function(e) {
		let { type: t, timeout: n, propCount: r } = function(e) {
			let t = window.getComputedStyle(e), n = Lu(t, `${Pu}Delay`), r = Lu(t, `${Pu}Duration`), i = Ru(n, r), a = Lu(t, `${Fu}Delay`), o = Lu(t, `${Fu}Duration`), s = Ru(a, o), c = Math.max(i, s), l = c > 0 ? i > s ? Pu : Fu : null;
			return {
				type: l,
				timeout: c,
				propCount: l ? l === Pu ? r.length : o.length : 0
			};
		}(e);
		return !(!t || !n) && new Promise((i) => {
			let a = `${t}end`, o = performance.now(), s = 0, c = () => {
				e.removeEventListener(a, l), i();
			}, l = (t) => {
				t.target === e && ((performance.now() - o) / 1e3 < t.elapsedTime || ++s >= r && c());
			};
			setTimeout(() => {
				s < r && c();
			}, n + 1), e.addEventListener(a, l);
		});
	}(e)).filter((e) => !1 !== e);
	r.length ? await Promise.all(r) : e && console.warn(`[swup] No CSS animation duration defined on elements matching \`${e}\``);
}
function Lu(e, t) {
	return (e[t] || "").split(", ");
}
function Ru(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => zu(t) + zu(e[n])));
}
function zu(e) {
	return 1e3 * parseFloat(e);
}
function Bu(e, t = {}, n = {}) {
	if (typeof e != "string") throw Error("swup.navigate() requires a URL parameter");
	if (this.shouldIgnoreVisit(e, {
		el: n.el,
		event: n.event
	})) return void window.location.assign(e);
	let { url: r, hash: i } = yu.fromUrl(e), a = this.createVisit(pu({}, n, {
		to: r,
		hash: i
	}));
	this.performNavigation(a, t);
}
async function Vu(e, t = {}) {
	if (this.navigating) {
		if (this.visit.state >= 6) return e.state = 2, void (this.onVisitEnd = () => this.performNavigation(e, t));
		await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
	}
	this.navigating = !0, this.visit = e;
	let { el: n } = e.trigger;
	t.referrer = t.referrer || this.location.url, !1 === t.animate && (e.animation.animate = !1), e.animation.animate || this.classes.clear();
	let r = t.history || Ou(n, "data-swup-history");
	typeof r == "string" && ["push", "replace"].includes(r) && (e.history.action = r);
	let i = t.animation || Ou(n, "data-swup-animation");
	typeof i == "string" && (e.animation.name = i), e.meta = t.meta || {}, typeof t.cache == "object" ? (e.cache.read = t.cache.read ?? e.cache.read, e.cache.write = t.cache.write ?? e.cache.write) : t.cache !== void 0 && (e.cache = {
		read: !!t.cache,
		write: !!t.cache
	}), delete t.cache;
	try {
		await this.hooks.call("visit:start", e, void 0), e.state = 3;
		let n = this.hooks.call("page:load", e, { options: t }, async (e, t) => {
			let n;
			return e.cache.read && (n = this.cache.get(e.to.url)), t.page = n || await this.fetchPage(e.to.url, t.options), t.cache = !!n, t.page;
		});
		n.then(({ html: t }) => {
			e.advance(5), e.to.html = t, e.to.document = new DOMParser().parseFromString(t, "text/html");
		});
		let r = e.to.url + e.to.hash;
		if (e.history.popstate || (e.history.action === "replace" || e.to.url === this.location.url ? _u(r) : (this.currentHistoryIndex++, gu(r, { index: this.currentHistoryIndex }))), this.location = yu.fromUrl(r), e.history.popstate && this.classes.add("is-popstate"), e.animation.name && this.classes.add(`to-${mu(e.animation.name)}`), e.animation.wait && await n, e.ignored) throw Error(`Visit to ${e.to.url} manually ignored`);
		if (e.done || (await this.hooks.call("visit:transition", e, void 0, async () => {
			if (!e.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(e, await n);
			e.advance(4), await this.animatePageOut(e), e.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(e, await n)).finished : await this.renderPage(e, await n), await this.animatePageIn(e);
		}), e.done)) return;
		await this.hooks.call("visit:end", e, void 0, () => this.classes.clear()), e.state = 7, this.navigating = !1, this.onVisitEnd &&= (this.onVisitEnd(), void 0);
	} catch (t) {
		if (!t || t != null && t.aborted) return void e.advance(8);
		if (e.ignored) return void Hu.call(this, e);
		await this.hooks.call("visit:fail", e, { error: t }, (e, { error: t }) => {
			console.error(t), Hu.call(this, e);
		}), e.advance(9);
	} finally {
		delete e.to.document, this.visit === e && (this.navigating = !1);
	}
}
function Hu(e) {
	let t = e.to.url + e.to.hash;
	hu() === e.to.url ? (window.removeEventListener("popstate", this.handlePopState), window.addEventListener("popstate", () => window.location.assign(t), { once: !0 }), window.history.back()) : window.location.assign(t);
}
var Uu = async function(e) {
	await this.hooks.call("animation:out:start", e, void 0, () => {
		this.classes.add("is-changing", "is-animating", "is-leaving");
	}), await this.hooks.call("animation:out:await", e, { skip: !1 }, (e, { skip: t }) => {
		if (!t) return this.awaitAnimations({ selector: e.animation.selector });
	}), await this.hooks.call("animation:out:end", e, void 0);
}, Wu = function(e) {
	let t = e.to.document;
	if (!t) return !1;
	let n = t.querySelector("title")?.innerText || "";
	document.title = n;
	let r = wu("[data-swup-persist]:not([data-swup-persist=\"\"])"), i = e.containers.map((e) => {
		let n = document.querySelector(e), r = t.querySelector(e);
		return n && r ? (n.replaceWith(r.cloneNode(!0)), !0) : (n || console.warn(`[swup] Container missing in current document: ${e}`), r || console.warn(`[swup] Container missing in incoming document: ${e}`), !1);
	}).filter(Boolean);
	return r.forEach((e) => {
		let t = Cu(`[data-swup-persist="${e.getAttribute("data-swup-persist")}"]`);
		t && t !== e && t.replaceWith(e);
	}), i.length === e.containers.length;
}, Gu = function(e) {
	let t = { behavior: "auto" }, { target: n, reset: r } = e.scroll, i = n ?? e.to.hash, a = !1;
	return i && (a = this.hooks.callSync("scroll:anchor", e, {
		hash: i,
		options: t
	}, (e, { hash: t, options: n }) => {
		let r = this.getAnchorElement(t);
		return r && r.scrollIntoView(n), !!r;
	})), r && !a && (a = this.hooks.callSync("scroll:top", e, { options: t }, (e, { options: t }) => (window.scrollTo(pu({
		top: 0,
		left: 0
	}, t)), !0))), a;
}, Ku = async function(e) {
	if (e.done) return;
	let t = this.hooks.call("animation:in:await", e, { skip: !1 }, (e, { skip: t }) => {
		if (!t) return this.awaitAnimations({ selector: e.animation.selector });
	});
	await Tu(), await this.hooks.call("animation:in:start", e, void 0, () => {
		this.classes.remove("is-animating");
	}), await t, await this.hooks.call("animation:in:end", e, void 0);
}, qu = async function(e, t) {
	if (e.done) return;
	e.advance(6);
	let { url: n } = t;
	this.isSameResolvedUrl(hu(), n) || (_u(n), this.location = yu.fromUrl(n), e.to.url = this.location.url, e.to.hash = this.location.hash), await this.hooks.call("content:replace", e, { page: t }, (e, {}) => {
		if (this.classes.remove("is-leaving"), e.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(e)) throw Error("[swup] Container mismatch, aborting");
		e.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), e.animation.name && this.classes.add(`to-${mu(e.animation.name)}`));
	}), await this.hooks.call("content:scroll", e, void 0, () => this.scrollToContent(e)), await this.hooks.call("page:view", e, {
		url: this.location.url,
		title: document.title
	});
}, Ju = function(e) {
	if (e?.isSwupPlugin) {
		if (e.swup = this, !e._checkRequirements || e._checkRequirements()) return e._beforeMount && e._beforeMount(), e.mount(), this.plugins.push(e), this.plugins;
	} else console.error("Not a swup plugin instance", e);
};
function Yu(e) {
	let t = this.findPlugin(e);
	if (t) return t.unmount(), t._afterUnmount && t._afterUnmount(), this.plugins = this.plugins.filter((e) => e !== t), this.plugins;
	console.error("No such plugin", t);
}
function Xu(e) {
	return this.plugins.find((t) => typeof e == "string" ? [`Swup${e}`, e].includes(t.name) : t === e);
}
function Zu(e) {
	if (typeof this.options.resolveUrl != "function") return console.warn("[swup] options.resolveUrl expects a callback function."), e;
	let t = this.options.resolveUrl(e);
	return t && typeof t == "string" ? t.startsWith("//") || t.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), e) : t : (console.warn("[swup] options.resolveUrl needs to return a url"), e);
}
function Qu(e, t) {
	return this.resolveUrl(e) === this.resolveUrl(t);
}
var $u = {
	animateHistoryBrowsing: !1,
	animationSelector: "[class*=\"transition-\"]",
	animationScope: "html",
	cache: !0,
	containers: ["#swup"],
	hooks: {},
	ignoreVisit: (e, { el: t } = {}) => !(t == null || !t.closest("[data-no-swup]")),
	linkSelector: "a[href]",
	linkToSelf: "scroll",
	native: !1,
	plugins: [],
	resolveUrl: (e) => e,
	requestHeaders: {
		"X-Requested-With": "swup",
		Accept: "text/html, application/xhtml+xml"
	},
	skipPopStateHandling: (e) => e.state?.source !== "swup",
	timeout: 0
}, ed = class {
	get currentPageUrl() {
		return this.location.url;
	}
	constructor(e = {}) {
		this.version = "4.10.0", this.options = void 0, this.defaults = $u, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = yu.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = !1, this.onVisitEnd = void 0, this.use = Ju, this.unuse = Yu, this.findPlugin = Xu, this.log = () => {}, this.navigate = Bu, this.performNavigation = Vu, this.createVisit = ju, this.delegateEvent = vu, this.fetchPage = xu, this.awaitAnimations = Iu, this.renderPage = qu, this.replaceContent = Wu, this.animatePageIn = Ku, this.animatePageOut = Uu, this.scrollToContent = Gu, this.getAnchorElement = Nu, this.getCurrentUrl = hu, this.resolveUrl = Zu, this.isSameResolvedUrl = Qu, this.options = pu({}, this.defaults, e), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new Su(this), this.classes = new ku(this), this.hooks = new Mu(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = window.history.state?.index ?? 1, this.enable();
	}
	async enable() {
		let { linkSelector: e } = this.options;
		this.clickDelegate = this.delegateEvent(e, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((e) => this.use(e));
		for (let [e, t] of Object.entries(this.options.hooks)) {
			let [n, r] = this.hooks.parseName(e);
			this.hooks.on(n, t, r);
		}
		window.history.state?.source !== "swup" && _u(null, { index: this.currentHistoryIndex }), await Tu(), await this.hooks.call("enable", void 0, void 0, () => {
			let e = document.documentElement;
			e.classList.add("swup-enabled"), e.classList.toggle("swup-native", this.options.native);
		});
	}
	async destroy() {
		this.clickDelegate.destroy(), window.removeEventListener("popstate", this.handlePopState), this.cache.clear(), this.plugins.forEach((e) => this.unuse(e)), await this.hooks.call("disable", void 0, void 0, () => {
			let e = document.documentElement;
			e.classList.remove("swup-enabled"), e.classList.remove("swup-native");
		}), this.hooks.clear();
	}
	shouldIgnoreVisit(e, { el: t, event: n } = {}) {
		let { origin: r, url: i, hash: a } = yu.fromUrl(e);
		return r !== window.location.origin || !(!t || !this.triggerWillOpenNewWindow(t)) || !!this.options.ignoreVisit(i + a, {
			el: t,
			event: n
		});
	}
	handleLinkClick(e) {
		let t = e.delegateTarget, { href: n, url: r, hash: i } = yu.fromElement(t);
		if (this.shouldIgnoreVisit(n, {
			el: t,
			event: e
		})) return;
		if (this.navigating && r === this.visit.to.url) return void e.preventDefault();
		let a = this.createVisit({
			to: r,
			hash: i,
			el: t,
			event: e
		});
		e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ? this.hooks.callSync("link:newtab", a, { href: n }) : e.button === 0 && this.hooks.callSync("link:click", a, {
			el: t,
			event: e
		}, () => {
			let t = a.from.url ?? "";
			e.preventDefault(), r && r !== t ? this.isSameResolvedUrl(r, t) || this.performNavigation(a) : i ? this.hooks.callSync("link:anchor", a, { hash: i }, () => {
				_u(r + i), this.scrollToContent(a);
			}) : this.hooks.callSync("link:self", a, void 0, () => {
				this.options.linkToSelf === "navigate" ? this.performNavigation(a) : (_u(r), this.scrollToContent(a));
			});
		});
	}
	handlePopState(e) {
		let t = e.state?.url ?? window.location.href;
		if (this.options.skipPopStateHandling(e) || this.isSameResolvedUrl(hu(), this.location.url)) return;
		let { url: n, hash: r } = yu.fromUrl(t), i = this.createVisit({
			to: n,
			hash: r,
			event: e
		});
		i.history.popstate = !0;
		let a = e.state?.index ?? 0;
		a && a !== this.currentHistoryIndex && (i.history.direction = a - this.currentHistoryIndex > 0 ? "forwards" : "backwards", this.currentHistoryIndex = a), i.animation.animate = !1, i.scroll.reset = !1, i.scroll.target = !1, this.options.animateHistoryBrowsing && !e.hasUAVisualTransition && (i.animation.animate = !0, i.scroll.reset = !0), this.hooks.callSync("history:popstate", i, { event: e }, () => {
			this.performNavigation(i);
		});
	}
	triggerWillOpenNewWindow(e) {
		return !!e.matches("[download], [target=\"_blank\"]");
	}
}, td = "ode-theme", nd = 300, rd = null;
function id() {
	try {
		return localStorage.getItem(td);
	} catch {
		return null;
	}
}
function ad() {
	let e = document.documentElement.dataset.theme || "dark";
	document.querySelectorAll("[data-mode]").forEach((t) => {
		t.classList.toggle("active", t.dataset.mode === e);
	});
}
function od(e, t = !1) {
	if (e !== "dark" && e !== "light") return;
	let n = document.documentElement;
	t && n.dataset.theme !== e && (n.classList.add("theme-transition"), clearTimeout(rd), rd = setTimeout(() => n.classList.remove("theme-transition"), nd)), n.dataset.theme = e;
	try {
		localStorage.setItem(td, e);
	} catch {}
	ad();
}
function sd() {
	od(id() || document.documentElement.dataset.theme || "dark"), document.addEventListener("click", (e) => {
		let t = e.target.closest("[data-mode]");
		t && od(t.dataset.mode, !0);
	});
}
//#endregion
//#region src/swup.js
function cd(e) {
	let t = e?.documentElement.getAttribute("data-wf-page");
	t && document.documentElement.setAttribute("data-wf-page", t);
	let n = window.Webflow;
	n && (n.destroy(), n.ready(), n.require("ix2")?.init());
}
function ld({ onStart: e, onLeave: t, onEnter: n }) {
	let r = new ed({ containers: ["#swup"] });
	return r.hooks.on("visit:start", (t) => {
		nu(t.to.url), e?.(t.to.url), ou(!1);
	}), r.hooks.before("content:replace", () => t()), r.hooks.on("content:replace", (e) => {
		cd(e.to.document), ad(), n();
	}), r;
}
//#endregion
//#region src/main.js
var ud = /* #__PURE__ */ Object.assign({
	"./pages/home.js": vc,
	"./pages/journal-details.js": jc,
	"./pages/journal.js": Lc,
	"./pages/work-details.js": Gc,
	"./pages/work.js": Zc
}), dd = null, fd = ["work-details", "journal-details"], pd = ["work"];
function md(e) {
	let t = new URL(e, location.origin).pathname;
	return /^\/work\/[^/]+\/?$/.test(t) ? "work-details" : /^\/work\/?$/.test(t) ? "work" : /^\/journal\/[^/]+\/?$/.test(t) ? "journal-details" : /^\/journal\/?$/.test(t) ? "journal" : t === "/" ? "home" : null;
}
function hd(e) {
	let t = fd.includes(e);
	document.querySelectorAll(".nav, .footer").forEach((e) => {
		e.style.transition = "opacity 300ms var(--easing)", e.style.opacity = t ? "0" : "", e.style.pointerEvents = t ? "none" : "";
	});
	let n = document.querySelector("#headline");
	n && (n.dataset.pageHidden = pd.includes(e)), iu();
}
function gd() {
	let e = document.querySelector("#swup"), t = e?.dataset.swup;
	hd(t);
	let n = ud[`./pages/${t}.js`];
	n && (dd = n, n.init?.(e));
}
function _d() {
	dd?.destroy?.(), dd = null;
}
window.__odeStudio ? console.warn("[ode-studio] main.js chargé plusieurs fois, instance ignorée") : (window.__odeStudio = !0, sd(), fc(), cu(), ld({
	onStart: (e) => hd(md(e)),
	onLeave: _d,
	onEnter: gd
}), gd());
//#endregion
