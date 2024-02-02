function us(e, t) {
    const n = Object.create(null)
      , r = e.split(",");
    for (let s = 0; s < r.length; s++)
        n[r[s]] = !0;
    return t ? s=>!!n[s.toLowerCase()] : s=>!!n[s]
}
function er(e) {
    if (z(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n]
              , s = de(r) ? Yl(r) : er(r);
            if (s)
                for (const o in s)
                    t[o] = s[o]
        }
        return t
    } else {
        if (de(e))
            return e;
        if (ce(e))
            return e
    }
}
const zl = /;(?![^(]*\))/g
  , Ql = /:([^]+)/
  , Jl = /\/\*.*?\*\//gs;
function Yl(e) {
    const t = {};
    return e.replace(Jl, "").split(zl).forEach(n=>{
        if (n) {
            const r = n.split(Ql);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }
    ),
    t
}
function tr(e) {
    let t = "";
    if (de(e))
        t = e;
    else if (z(e))
        for (let n = 0; n < e.length; n++) {
            const r = tr(e[n]);
            r && (t += r + " ")
        }
    else if (ce(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
function _p(e) {
    if (!e)
        return null;
    let {class: t, style: n} = e;
    return t && !de(t) && (e.class = tr(t)),
    n && (e.style = er(n)),
    e
}
const Xl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , Zl = us(Xl);
function si(e) {
    return !!e || e === ""
}
const bp = e=>de(e) ? e : e == null ? "" : z(e) || ce(e) && (e.toString === ci || !J(e.toString)) ? JSON.stringify(e, oi, 2) : String(e)
  , oi = (e,t)=>t && t.__v_isRef ? oi(e, t.value) : jt(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((n,[r,s])=>(n[`${r} =>`] = s,
    n), {})
} : ii(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : ce(t) && !z(t) && !ai(t) ? String(t) : t
  , ae = {}
  , Ft = []
  , We = ()=>{}
  , Gl = ()=>!1
  , ec = /^on[^a-z]/
  , kn = e=>ec.test(e)
  , fs = e=>e.startsWith("onUpdate:")
  , _e = Object.assign
  , ds = (e,t)=>{
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , tc = Object.prototype.hasOwnProperty
  , te = (e,t)=>tc.call(e, t)
  , z = Array.isArray
  , jt = e=>nr(e) === "[object Map]"
  , ii = e=>nr(e) === "[object Set]"
  , J = e=>typeof e == "function"
  , de = e=>typeof e == "string"
  , hs = e=>typeof e == "symbol"
  , ce = e=>e !== null && typeof e == "object"
  , li = e=>ce(e) && J(e.then) && J(e.catch)
  , ci = Object.prototype.toString
  , nr = e=>ci.call(e)
  , nc = e=>nr(e).slice(8, -1)
  , ai = e=>nr(e) === "[object Object]"
  , ps = e=>de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , dn = us(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , rr = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , rc = /-(\w)/g
  , Ge = rr(e=>e.replace(rc, (t,n)=>n ? n.toUpperCase() : ""))
  , sc = /\B([A-Z])/g
  , Gt = rr(e=>e.replace(sc, "-$1").toLowerCase())
  , sr = rr(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , br = rr(e=>e ? `on${sr(e)}` : "")
  , vn = (e,t)=>!Object.is(e, t)
  , hn = (e,t)=>{
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , Kn = (e,t,n)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , or = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let Us;
const oc = ()=>Us || (Us = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let Je;
class ic {
    constructor(t=!1) {
        this.detached = t,
        this.active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = Je,
        !t && Je && (this.index = (Je.scopes || (Je.scopes = [])).push(this) - 1)
    }
    run(t) {
        if (this.active) {
            const n = Je;
            try {
                return Je = this,
                t()
            } finally {
                Je = n
            }
        }
    }
    on() {
        Je = this
    }
    off() {
        Je = this.parent
    }
    stop(t) {
        if (this.active) {
            let n, r;
            for (n = 0,
            r = this.effects.length; n < r; n++)
                this.effects[n].stop();
            for (n = 0,
            r = this.cleanups.length; n < r; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                r = this.scopes.length; n < r; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s,
                s.index = this.index)
            }
            this.parent = void 0,
            this.active = !1
        }
    }
}
function lc(e, t=Je) {
    t && t.active && t.effects.push(e)
}
const gs = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , ui = e=>(e.w & bt) > 0
  , fi = e=>(e.n & bt) > 0
  , cc = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= bt
}
  , ac = e=>{
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const s = t[r];
            ui(s) && !fi(s) ? s.delete(e) : t[n++] = s,
            s.w &= ~bt,
            s.n &= ~bt
        }
        t.length = n
    }
}
  , Fr = new WeakMap;
let an = 0
  , bt = 1;
const jr = 30;
let qe;
const Pt = Symbol("")
  , Br = Symbol("");
class ms {
    constructor(t, n=null, r) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        lc(this, r)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = qe
          , n = mt;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = qe,
            qe = this,
            mt = !0,
            bt = 1 << ++an,
            an <= jr ? cc(this) : Ks(this),
            this.fn()
        } finally {
            an <= jr && ac(this),
            bt = 1 << --an,
            qe = this.parent,
            mt = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        qe === this ? this.deferStop = !0 : this.active && (Ks(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function Ks(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let mt = !0;
const di = [];
function en() {
    di.push(mt),
    mt = !1
}
function tn() {
    const e = di.pop();
    mt = e === void 0 ? !0 : e
}
function Le(e, t, n) {
    if (mt && qe) {
        let r = Fr.get(e);
        r || Fr.set(e, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = gs()),
        hi(s)
    }
}
function hi(e, t) {
    let n = !1;
    an <= jr ? fi(e) || (e.n |= bt,
    n = !ui(e)) : n = !e.has(qe),
    n && (e.add(qe),
    qe.deps.push(e))
}
function st(e, t, n, r, s, o) {
    const i = Fr.get(e);
    if (!i)
        return;
    let l = [];
    if (t === "clear")
        l = [...i.values()];
    else if (n === "length" && z(e)) {
        const c = or(r);
        i.forEach((a,u)=>{
            (u === "length" || u >= c) && l.push(a)
        }
        )
    } else
        switch (n !== void 0 && l.push(i.get(n)),
        t) {
        case "add":
            z(e) ? ps(n) && l.push(i.get("length")) : (l.push(i.get(Pt)),
            jt(e) && l.push(i.get(Br)));
            break;
        case "delete":
            z(e) || (l.push(i.get(Pt)),
            jt(e) && l.push(i.get(Br)));
            break;
        case "set":
            jt(e) && l.push(i.get(Pt));
            break
        }
    if (l.length === 1)
        l[0] && Dr(l[0]);
    else {
        const c = [];
        for (const a of l)
            a && c.push(...a);
        Dr(gs(c))
    }
}
function Dr(e, t) {
    const n = z(e) ? e : [...e];
    for (const r of n)
        r.computed && qs(r);
    for (const r of n)
        r.computed || qs(r)
}
function qs(e, t) {
    (e !== qe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const uc = us("__proto__,__v_isRef,__isVue")
  , pi = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(hs))
  , fc = ys()
  , dc = ys(!1, !0)
  , hc = ys(!0)
  , Ws = pc();
function pc() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...n) {
            const r = ne(this);
            for (let o = 0, i = this.length; o < i; o++)
                Le(r, "get", o + "");
            const s = r[t](...n);
            return s === -1 || s === !1 ? r[t](...n.map(ne)) : s
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...n) {
            en();
            const r = ne(this)[t].apply(this, n);
            return tn(),
            r
        }
    }
    ),
    e
}
function ys(e=!1, t=!1) {
    return function(r, s, o) {
        if (s === "__v_isReactive")
            return !e;
        if (s === "__v_isReadonly")
            return e;
        if (s === "__v_isShallow")
            return t;
        if (s === "__v_raw" && o === (e ? t ? xc : bi : t ? _i : yi).get(r))
            return r;
        const i = z(r);
        if (!e && i && te(Ws, s))
            return Reflect.get(Ws, s, o);
        const l = Reflect.get(r, s, o);
        return (hs(s) ? pi.has(s) : uc(s)) || (e || Le(r, "get", s),
        t) ? l : ge(l) ? i && ps(s) ? l : l.value : ce(l) ? e ? vi(l) : Ve(l) : l
    }
}
const gc = gi()
  , mc = gi(!0);
function gi(e=!1) {
    return function(n, r, s, o) {
        let i = n[r];
        if (Wt(i) && ge(i) && !ge(s))
            return !1;
        if (!e && (!qn(s) && !Wt(s) && (i = ne(i),
        s = ne(s)),
        !z(n) && ge(i) && !ge(s)))
            return i.value = s,
            !0;
        const l = z(n) && ps(r) ? Number(r) < n.length : te(n, r)
          , c = Reflect.set(n, r, s, o);
        return n === ne(o) && (l ? vn(s, i) && st(n, "set", r, s) : st(n, "add", r, s)),
        c
    }
}
function yc(e, t) {
    const n = te(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && st(e, "delete", t, void 0),
    r
}
function _c(e, t) {
    const n = Reflect.has(e, t);
    return (!hs(t) || !pi.has(t)) && Le(e, "has", t),
    n
}
function bc(e) {
    return Le(e, "iterate", z(e) ? "length" : Pt),
    Reflect.ownKeys(e)
}
const mi = {
    get: fc,
    set: gc,
    deleteProperty: yc,
    has: _c,
    ownKeys: bc
}
  , vc = {
    get: hc,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , Ec = _e({}, mi, {
    get: dc,
    set: mc
})
  , _s = e=>e
  , ir = e=>Reflect.getPrototypeOf(e);
function xn(e, t, n=!1, r=!1) {
    e = e.__v_raw;
    const s = ne(e)
      , o = ne(t);
    n || (t !== o && Le(s, "get", t),
    Le(s, "get", o));
    const {has: i} = ir(s)
      , l = r ? _s : n ? Es : En;
    if (i.call(s, t))
        return l(e.get(t));
    if (i.call(s, o))
        return l(e.get(o));
    e !== s && e.get(t)
}
function Sn(e, t=!1) {
    const n = this.__v_raw
      , r = ne(n)
      , s = ne(e);
    return t || (e !== s && Le(r, "has", e),
    Le(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
}
function $n(e, t=!1) {
    return e = e.__v_raw,
    !t && Le(ne(e), "iterate", Pt),
    Reflect.get(e, "size", e)
}
function Vs(e) {
    e = ne(e);
    const t = ne(this);
    return ir(t).has.call(t, e) || (t.add(e),
    st(t, "add", e, e)),
    this
}
function zs(e, t) {
    t = ne(t);
    const n = ne(this)
      , {has: r, get: s} = ir(n);
    let o = r.call(n, e);
    o || (e = ne(e),
    o = r.call(n, e));
    const i = s.call(n, e);
    return n.set(e, t),
    o ? vn(t, i) && st(n, "set", e, t) : st(n, "add", e, t),
    this
}
function Qs(e) {
    const t = ne(this)
      , {has: n, get: r} = ir(t);
    let s = n.call(t, e);
    s || (e = ne(e),
    s = n.call(t, e)),
    r && r.call(t, e);
    const o = t.delete(e);
    return s && st(t, "delete", e, void 0),
    o
}
function Js() {
    const e = ne(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && st(e, "clear", void 0, void 0),
    n
}
function Hn(e, t) {
    return function(r, s) {
        const o = this
          , i = o.__v_raw
          , l = ne(i)
          , c = t ? _s : e ? Es : En;
        return !e && Le(l, "iterate", Pt),
        i.forEach((a,u)=>r.call(s, c(a), c(u), o))
    }
}
function Mn(e, t, n) {
    return function(...r) {
        const s = this.__v_raw
          , o = ne(s)
          , i = jt(o)
          , l = e === "entries" || e === Symbol.iterator && i
          , c = e === "keys" && i
          , a = s[e](...r)
          , u = n ? _s : t ? Es : En;
        return !t && Le(o, "iterate", c ? Br : Pt),
        {
            next() {
                const {value: h, done: f} = a.next();
                return f ? {
                    value: h,
                    done: f
                } : {
                    value: l ? [u(h[0]), u(h[1])] : u(h),
                    done: f
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function ct(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function wc() {
    const e = {
        get(o) {
            return xn(this, o)
        },
        get size() {
            return $n(this)
        },
        has: Sn,
        add: Vs,
        set: zs,
        delete: Qs,
        clear: Js,
        forEach: Hn(!1, !1)
    }
      , t = {
        get(o) {
            return xn(this, o, !1, !0)
        },
        get size() {
            return $n(this)
        },
        has: Sn,
        add: Vs,
        set: zs,
        delete: Qs,
        clear: Js,
        forEach: Hn(!1, !0)
    }
      , n = {
        get(o) {
            return xn(this, o, !0)
        },
        get size() {
            return $n(this, !0)
        },
        has(o) {
            return Sn.call(this, o, !0)
        },
        add: ct("add"),
        set: ct("set"),
        delete: ct("delete"),
        clear: ct("clear"),
        forEach: Hn(!0, !1)
    }
      , r = {
        get(o) {
            return xn(this, o, !0, !0)
        },
        get size() {
            return $n(this, !0)
        },
        has(o) {
            return Sn.call(this, o, !0)
        },
        add: ct("add"),
        set: ct("set"),
        delete: ct("delete"),
        clear: ct("clear"),
        forEach: Hn(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o=>{
        e[o] = Mn(o, !1, !1),
        n[o] = Mn(o, !0, !1),
        t[o] = Mn(o, !1, !0),
        r[o] = Mn(o, !0, !0)
    }
    ),
    [e, n, t, r]
}
const [Cc,Rc,Tc,kc] = wc();
function bs(e, t) {
    const n = t ? e ? kc : Tc : e ? Rc : Cc;
    return (r,s,o)=>s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(te(n, s) && s in r ? n : r, s, o)
}
const Pc = {
    get: bs(!1, !1)
}
  , Ac = {
    get: bs(!1, !0)
}
  , Oc = {
    get: bs(!0, !1)
}
  , yi = new WeakMap
  , _i = new WeakMap
  , bi = new WeakMap
  , xc = new WeakMap;
function Sc(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function $c(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Sc(nc(e))
}
function Ve(e) {
    return Wt(e) ? e : vs(e, !1, mi, Pc, yi)
}
function Hc(e) {
    return vs(e, !1, Ec, Ac, _i)
}
function vi(e) {
    return vs(e, !0, vc, Oc, bi)
}
function vs(e, t, n, r, s) {
    if (!ce(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const o = s.get(e);
    if (o)
        return o;
    const i = $c(e);
    if (i === 0)
        return e;
    const l = new Proxy(e,i === 2 ? r : n);
    return s.set(e, l),
    l
}
function Bt(e) {
    return Wt(e) ? Bt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Wt(e) {
    return !!(e && e.__v_isReadonly)
}
function qn(e) {
    return !!(e && e.__v_isShallow)
}
function Ei(e) {
    return Bt(e) || Wt(e)
}
function ne(e) {
    const t = e && e.__v_raw;
    return t ? ne(t) : e
}
function wi(e) {
    return Kn(e, "__v_skip", !0),
    e
}
const En = e=>ce(e) ? Ve(e) : e
  , Es = e=>ce(e) ? vi(e) : e;
function Ci(e) {
    mt && qe && (e = ne(e),
    hi(e.dep || (e.dep = gs())))
}
function Ri(e, t) {
    e = ne(e),
    e.dep && Dr(e.dep)
}
function ge(e) {
    return !!(e && e.__v_isRef === !0)
}
function At(e) {
    return Ti(e, !1)
}
function Ur(e) {
    return Ti(e, !0)
}
function Ti(e, t) {
    return ge(e) ? e : new Mc(e,t)
}
class Mc {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : ne(t),
        this._value = n ? t : En(t)
    }
    get value() {
        return Ci(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || qn(t) || Wt(t);
        t = n ? t : ne(t),
        vn(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : En(t),
        Ri(this))
    }
}
function Ae(e) {
    return ge(e) ? e.value : e
}
const Ic = {
    get: (e,t,n)=>Ae(Reflect.get(e, t, n)),
    set: (e,t,n,r)=>{
        const s = e[t];
        return ge(s) && !ge(n) ? (s.value = n,
        !0) : Reflect.set(e, t, n, r)
    }
};
function ki(e) {
    return Bt(e) ? e : new Proxy(e,Ic)
}
class Lc {
    constructor(t, n, r) {
        this._object = t,
        this._key = n,
        this._defaultValue = r,
        this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
}
function Pi(e, t, n) {
    const r = e[t];
    return ge(r) ? r : new Lc(e,t,n)
}
var Ai;
class Nc {
    constructor(t, n, r, s) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this[Ai] = !1,
        this._dirty = !0,
        this.effect = new ms(t,()=>{
            this._dirty || (this._dirty = !0,
            Ri(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !s,
        this.__v_isReadonly = r
    }
    get value() {
        const t = ne(this);
        return Ci(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
Ai = "__v_isReadonly";
function Fc(e, t, n=!1) {
    let r, s;
    const o = J(e);
    return o ? (r = e,
    s = We) : (r = e.get,
    s = e.set),
    new Nc(r,s,o || !s,n)
}
function yt(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e()
    } catch (o) {
        nn(o, t, n)
    }
    return s
}
function Be(e, t, n, r) {
    if (J(e)) {
        const o = yt(e, t, n, r);
        return o && li(o) && o.catch(i=>{
            nn(i, t, n)
        }
        ),
        o
    }
    const s = [];
    for (let o = 0; o < e.length; o++)
        s.push(Be(e[o], t, n, r));
    return s
}
function nn(e, t, n, r=!0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy
          , l = n;
        for (; o; ) {
            const a = o.ec;
            if (a) {
                for (let u = 0; u < a.length; u++)
                    if (a[u](e, i, l) === !1)
                        return
            }
            o = o.parent
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            yt(c, null, 10, [e, i, l]);
            return
        }
    }
    jc(e, n, s, r)
}
function jc(e, t, n, r=!0) {
    console.error(e)
}
let wn = !1
  , Kr = !1;
const ve = [];
let Xe = 0;
const Dt = [];
let rt = null
  , Tt = 0;
const Oi = Promise.resolve();
let ws = null;
function rn(e) {
    const t = ws || Oi;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function Bc(e) {
    let t = Xe + 1
      , n = ve.length;
    for (; t < n; ) {
        const r = t + n >>> 1;
        Cn(ve[r]) < e ? t = r + 1 : n = r
    }
    return t
}
function lr(e) {
    (!ve.length || !ve.includes(e, wn && e.allowRecurse ? Xe + 1 : Xe)) && (e.id == null ? ve.push(e) : ve.splice(Bc(e.id), 0, e),
    xi())
}
function xi() {
    !wn && !Kr && (Kr = !0,
    ws = Oi.then($i))
}
function Dc(e) {
    const t = ve.indexOf(e);
    t > Xe && ve.splice(t, 1)
}
function Si(e) {
    z(e) ? Dt.push(...e) : (!rt || !rt.includes(e, e.allowRecurse ? Tt + 1 : Tt)) && Dt.push(e),
    xi()
}
function Ys(e, t=wn ? Xe + 1 : 0) {
    for (; t < ve.length; t++) {
        const n = ve[t];
        n && n.pre && (ve.splice(t, 1),
        t--,
        n())
    }
}
function Wn(e) {
    if (Dt.length) {
        const t = [...new Set(Dt)];
        if (Dt.length = 0,
        rt) {
            rt.push(...t);
            return
        }
        for (rt = t,
        rt.sort((n,r)=>Cn(n) - Cn(r)),
        Tt = 0; Tt < rt.length; Tt++)
            rt[Tt]();
        rt = null,
        Tt = 0
    }
}
const Cn = e=>e.id == null ? 1 / 0 : e.id
  , Uc = (e,t)=>{
    const n = Cn(e) - Cn(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function $i(e) {
    Kr = !1,
    wn = !0,
    ve.sort(Uc);
    const t = We;
    try {
        for (Xe = 0; Xe < ve.length; Xe++) {
            const n = ve[Xe];
            n && n.active !== !1 && yt(n, null, 14)
        }
    } finally {
        Xe = 0,
        ve.length = 0,
        Wn(),
        wn = !1,
        ws = null,
        (ve.length || Dt.length) && $i()
    }
}
function Kc(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const r = e.vnode.props || ae;
    let s = n;
    const o = t.startsWith("update:")
      , i = o && t.slice(7);
    if (i && i in r) {
        const u = `${i === "modelValue" ? "model" : i}Modifiers`
          , {number: h, trim: f} = r[u] || ae;
        f && (s = n.map(g=>de(g) ? g.trim() : g)),
        h && (s = n.map(or))
    }
    let l, c = r[l = br(t)] || r[l = br(Ge(t))];
    !c && o && (c = r[l = br(Gt(t))]),
    c && Be(c, e, 6, s);
    const a = r[l + "Once"];
    if (a) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[l])
            return;
        e.emitted[l] = !0,
        Be(a, e, 6, s)
    }
}
function Hi(e, t, n=!1) {
    const r = t.emitsCache
      , s = r.get(e);
    if (s !== void 0)
        return s;
    const o = e.emits;
    let i = {}
      , l = !1;
    if (!J(e)) {
        const c = a=>{
            const u = Hi(a, t, !0);
            u && (l = !0,
            _e(i, u))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(c),
        e.extends && c(e.extends),
        e.mixins && e.mixins.forEach(c)
    }
    return !o && !l ? (ce(e) && r.set(e, null),
    null) : (z(o) ? o.forEach(c=>i[c] = null) : _e(i, o),
    ce(e) && r.set(e, i),
    i)
}
function cr(e, t) {
    return !e || !kn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    te(e, t[0].toLowerCase() + t.slice(1)) || te(e, Gt(t)) || te(e, t))
}
let Ee = null
  , ar = null;
function Vn(e) {
    const t = Ee;
    return Ee = e,
    ar = e && e.type.__scopeId || null,
    t
}
function vp(e) {
    ar = e
}
function Ep() {
    ar = null
}
function Cs(e, t=Ee, n) {
    if (!t || e._n)
        return e;
    const r = (...s)=>{
        r._d && lo(-1);
        const o = Vn(t);
        let i;
        try {
            i = e(...s)
        } finally {
            Vn(o),
            r._d && lo(1)
        }
        return i
    }
    ;
    return r._n = !0,
    r._c = !0,
    r._d = !0,
    r
}
function vr(e) {
    const {type: t, vnode: n, proxy: r, withProxy: s, props: o, propsOptions: [i], slots: l, attrs: c, emit: a, render: u, renderCache: h, data: f, setupState: g, ctx: y, inheritAttrs: R} = e;
    let x, _;
    const p = Vn(e);
    try {
        if (n.shapeFlag & 4) {
            const w = s || r;
            x = Fe(u.call(w, w, h, o, g, f, y)),
            _ = c
        } else {
            const w = t;
            x = Fe(w.length > 1 ? w(o, {
                attrs: c,
                slots: l,
                emit: a
            }) : w(o, null)),
            _ = t.props ? c : Wc(c)
        }
    } catch (w) {
        mn.length = 0,
        nn(w, e, 1),
        x = fe(Ce)
    }
    let b = x;
    if (_ && R !== !1) {
        const w = Object.keys(_)
          , {shapeFlag: S} = b;
        w.length && S & 7 && (i && w.some(fs) && (_ = Vc(_, i)),
        b = ot(b, _))
    }
    return n.dirs && (b = ot(b),
    b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs),
    n.transition && (b.transition = n.transition),
    x = b,
    Vn(p),
    x
}
function qc(e) {
    let t;
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        if (Qt(r)) {
            if (r.type !== Ce || r.children === "v-if") {
                if (t)
                    return;
                t = r
            }
        } else
            return
    }
    return t
}
const Wc = e=>{
    let t;
    for (const n in e)
        (n === "class" || n === "style" || kn(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , Vc = (e,t)=>{
    const n = {};
    for (const r in e)
        (!fs(r) || !(r.slice(9)in t)) && (n[r] = e[r]);
    return n
}
;
function zc(e, t, n) {
    const {props: r, children: s, component: o} = e
      , {props: i, children: l, patchFlag: c} = t
      , a = o.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && c >= 0) {
        if (c & 1024)
            return !0;
        if (c & 16)
            return r ? Xs(r, i, a) : !!i;
        if (c & 8) {
            const u = t.dynamicProps;
            for (let h = 0; h < u.length; h++) {
                const f = u[h];
                if (i[f] !== r[f] && !cr(a, f))
                    return !0
            }
        }
    } else
        return (s || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Xs(r, i, a) : !0 : !!i;
    return !1
}
function Xs(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length)
        return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !cr(n, o))
            return !0
    }
    return !1
}
function Rs({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const Mi = e=>e.__isSuspense
  , Qc = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, n, r, s, o, i, l, c, a) {
        e == null ? Jc(t, n, r, s, o, i, l, c, a) : Yc(e, t, n, r, s, i, l, c, a)
    },
    hydrate: Xc,
    create: Ts,
    normalize: Zc
}
  , Ii = Qc;
function Rn(e, t) {
    const n = e.props && e.props[t];
    J(n) && n()
}
function Jc(e, t, n, r, s, o, i, l, c) {
    const {p: a, o: {createElement: u}} = c
      , h = u("div")
      , f = e.suspense = Ts(e, s, r, t, h, n, o, i, l, c);
    a(null, f.pendingBranch = e.ssContent, h, null, r, f, o, i),
    f.deps > 0 ? (Rn(e, "onPending"),
    Rn(e, "onFallback"),
    a(null, e.ssFallback, t, n, r, null, o, i),
    Ut(f, e.ssFallback)) : f.resolve()
}
function Yc(e, t, n, r, s, o, i, l, {p: c, um: a, o: {createElement: u}}) {
    const h = t.suspense = e.suspense;
    h.vnode = t,
    t.el = e.el;
    const f = t.ssContent
      , g = t.ssFallback
      , {activeBranch: y, pendingBranch: R, isInFallback: x, isHydrating: _} = h;
    if (R)
        h.pendingBranch = f,
        Ze(f, R) ? (c(R, f, h.hiddenContainer, null, s, h, o, i, l),
        h.deps <= 0 ? h.resolve() : x && (c(y, g, n, r, s, null, o, i, l),
        Ut(h, g))) : (h.pendingId++,
        _ ? (h.isHydrating = !1,
        h.activeBranch = R) : a(R, s, h),
        h.deps = 0,
        h.effects.length = 0,
        h.hiddenContainer = u("div"),
        x ? (c(null, f, h.hiddenContainer, null, s, h, o, i, l),
        h.deps <= 0 ? h.resolve() : (c(y, g, n, r, s, null, o, i, l),
        Ut(h, g))) : y && Ze(f, y) ? (c(y, f, n, r, s, h, o, i, l),
        h.resolve(!0)) : (c(null, f, h.hiddenContainer, null, s, h, o, i, l),
        h.deps <= 0 && h.resolve()));
    else if (y && Ze(f, y))
        c(y, f, n, r, s, h, o, i, l),
        Ut(h, f);
    else if (Rn(t, "onPending"),
    h.pendingBranch = f,
    h.pendingId++,
    c(null, f, h.hiddenContainer, null, s, h, o, i, l),
    h.deps <= 0)
        h.resolve();
    else {
        const {timeout: p, pendingId: b} = h;
        p > 0 ? setTimeout(()=>{
            h.pendingId === b && h.fallback(g)
        }
        , p) : p === 0 && h.fallback(g)
    }
}
function Ts(e, t, n, r, s, o, i, l, c, a, u=!1) {
    const {p: h, m: f, um: g, n: y, o: {parentNode: R, remove: x}} = a
      , _ = or(e.props && e.props.timeout)
      , p = {
        vnode: e,
        parent: t,
        parentComponent: n,
        isSVG: i,
        container: r,
        hiddenContainer: s,
        anchor: o,
        deps: 0,
        pendingId: 0,
        timeout: typeof _ == "number" ? _ : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: !0,
        isHydrating: u,
        isUnmounted: !1,
        effects: [],
        resolve(b=!1) {
            const {vnode: w, activeBranch: S, pendingBranch: L, pendingId: N, effects: k, parentComponent: D, container: B} = p;
            if (p.isHydrating)
                p.isHydrating = !1;
            else if (!b) {
                const Y = S && L.transition && L.transition.mode === "out-in";
                Y && (S.transition.afterLeave = ()=>{
                    N === p.pendingId && f(L, B, j, 0)
                }
                );
                let {anchor: j} = p;
                S && (j = y(S),
                g(S, D, p, !0)),
                Y || f(L, B, j, 0)
            }
            Ut(p, L),
            p.pendingBranch = null,
            p.isInFallback = !1;
            let V = p.parent
              , I = !1;
            for (; V; ) {
                if (V.pendingBranch) {
                    V.effects.push(...k),
                    I = !0;
                    break
                }
                V = V.parent
            }
            I || Si(k),
            p.effects = [],
            Rn(w, "onResolve")
        },
        fallback(b) {
            if (!p.pendingBranch)
                return;
            const {vnode: w, activeBranch: S, parentComponent: L, container: N, isSVG: k} = p;
            Rn(w, "onFallback");
            const D = y(S)
              , B = ()=>{
                !p.isInFallback || (h(null, b, N, D, L, null, k, l, c),
                Ut(p, b))
            }
              , V = b.transition && b.transition.mode === "out-in";
            V && (S.transition.afterLeave = B),
            p.isInFallback = !0,
            g(S, L, null, !0),
            V || B()
        },
        move(b, w, S) {
            p.activeBranch && f(p.activeBranch, b, w, S),
            p.container = b
        },
        next() {
            return p.activeBranch && y(p.activeBranch)
        },
        registerDep(b, w) {
            const S = !!p.pendingBranch;
            S && p.deps++;
            const L = b.vnode.el;
            b.asyncDep.catch(N=>{
                nn(N, b, 0)
            }
            ).then(N=>{
                if (b.isUnmounted || p.isUnmounted || p.pendingId !== b.suspenseId)
                    return;
                b.asyncResolved = !0;
                const {vnode: k} = b;
                Jr(b, N, !1),
                L && (k.el = L);
                const D = !L && b.subTree.el;
                w(b, k, R(L || b.subTree.el), L ? null : y(b.subTree), p, i, c),
                D && x(D),
                Rs(b, k.el),
                S && --p.deps === 0 && p.resolve()
            }
            )
        },
        unmount(b, w) {
            p.isUnmounted = !0,
            p.activeBranch && g(p.activeBranch, n, b, w),
            p.pendingBranch && g(p.pendingBranch, n, b, w)
        }
    };
    return p
}
function Xc(e, t, n, r, s, o, i, l, c) {
    const a = t.suspense = Ts(t, r, n, e.parentNode, document.createElement("div"), null, s, o, i, l, !0)
      , u = c(e, a.pendingBranch = t.ssContent, n, a, o, i);
    return a.deps === 0 && a.resolve(),
    u
}
function Zc(e) {
    const {shapeFlag: t, children: n} = e
      , r = t & 32;
    e.ssContent = Zs(r ? n.default : n),
    e.ssFallback = r ? Zs(n.fallback) : fe(Ce)
}
function Zs(e) {
    let t;
    if (J(e)) {
        const n = zt && e._c;
        n && (e._d = !1,
        xt()),
        e = e(),
        n && (e._d = !0,
        t = je,
        nl())
    }
    return z(e) && (e = qc(e)),
    e = Fe(e),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter(n=>n !== e)),
    e
}
function Li(e, t) {
    t && t.pendingBranch ? z(e) ? t.effects.push(...e) : t.effects.push(e) : Si(e)
}
function Ut(e, t) {
    e.activeBranch = t;
    const {vnode: n, parentComponent: r} = e
      , s = n.el = t.el;
    r && r.subTree === n && (r.vnode.el = s,
    Rs(r, s))
}
function Kt(e, t) {
    if (pe) {
        let n = pe.provides;
        const r = pe.parent && pe.parent.provides;
        r === n && (n = pe.provides = Object.create(r)),
        n[e] = t
    }
}
function Me(e, t, n=!1) {
    const r = pe || Ee;
    if (r) {
        const s = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (s && e in s)
            return s[e];
        if (arguments.length > 1)
            return n && J(t) ? t.call(r.proxy) : t
    }
}
function Gc(e, t) {
    return ks(e, null, t)
}
const In = {};
function _t(e, t, n) {
    return ks(e, t, n)
}
function ks(e, t, {immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i}=ae) {
    const l = pe;
    let c, a = !1, u = !1;
    if (ge(e) ? (c = ()=>e.value,
    a = qn(e)) : Bt(e) ? (c = ()=>e,
    r = !0) : z(e) ? (u = !0,
    a = e.some(b=>Bt(b) || qn(b)),
    c = ()=>e.map(b=>{
        if (ge(b))
            return b.value;
        if (Bt(b))
            return Lt(b);
        if (J(b))
            return yt(b, l, 2)
    }
    )) : J(e) ? t ? c = ()=>yt(e, l, 2) : c = ()=>{
        if (!(l && l.isUnmounted))
            return h && h(),
            Be(e, l, 3, [f])
    }
    : c = We,
    t && r) {
        const b = c;
        c = ()=>Lt(b())
    }
    let h, f = b=>{
        h = _.onStop = ()=>{
            yt(b, l, 4)
        }
    }
    , g;
    if (Yt)
        if (f = We,
        t ? n && Be(t, l, 3, [c(), u ? [] : void 0, f]) : c(),
        s === "sync") {
            const b = za();
            g = b.__watcherHandles || (b.__watcherHandles = [])
        } else
            return We;
    let y = u ? new Array(e.length).fill(In) : In;
    const R = ()=>{
        if (!!_.active)
            if (t) {
                const b = _.run();
                (r || a || (u ? b.some((w,S)=>vn(w, y[S])) : vn(b, y))) && (h && h(),
                Be(t, l, 3, [b, y === In ? void 0 : u && y[0] === In ? [] : y, f]),
                y = b)
            } else
                _.run()
    }
    ;
    R.allowRecurse = !!t;
    let x;
    s === "sync" ? x = R : s === "post" ? x = ()=>ye(R, l && l.suspense) : (R.pre = !0,
    l && (R.id = l.uid),
    x = ()=>lr(R));
    const _ = new ms(c,x);
    t ? n ? R() : y = _.run() : s === "post" ? ye(_.run.bind(_), l && l.suspense) : _.run();
    const p = ()=>{
        _.stop(),
        l && l.scope && ds(l.scope.effects, _)
    }
    ;
    return g && g.push(p),
    p
}
function ea(e, t, n) {
    const r = this.proxy
      , s = de(e) ? e.includes(".") ? Ni(r, e) : ()=>r[e] : e.bind(r, r);
    let o;
    J(t) ? o = t : (o = t.handler,
    n = t);
    const i = pe;
    Jt(this);
    const l = ks(s, o.bind(r), n);
    return i ? Jt(i) : St(),
    l
}
function Ni(e, t) {
    const n = t.split(".");
    return ()=>{
        let r = e;
        for (let s = 0; s < n.length && r; s++)
            r = r[n[s]];
        return r
    }
}
function Lt(e, t) {
    if (!ce(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    ge(e))
        Lt(e.value, t);
    else if (z(e))
        for (let n = 0; n < e.length; n++)
            Lt(e[n], t);
    else if (ii(e) || jt(e))
        e.forEach(n=>{
            Lt(n, t)
        }
        );
    else if (ai(e))
        for (const n in e)
            Lt(e[n], t);
    return e
}
function ta() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return fr(()=>{
        e.isMounted = !0
    }
    ),
    An(()=>{
        e.isUnmounting = !0
    }
    ),
    e
}
const Ne = [Function, Array]
  , na = {
    name: "BaseTransition",
    props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: Ne,
        onEnter: Ne,
        onAfterEnter: Ne,
        onEnterCancelled: Ne,
        onBeforeLeave: Ne,
        onLeave: Ne,
        onAfterLeave: Ne,
        onLeaveCancelled: Ne,
        onBeforeAppear: Ne,
        onAppear: Ne,
        onAfterAppear: Ne,
        onAppearCancelled: Ne
    },
    setup(e, {slots: t}) {
        const n = sn()
          , r = ta();
        let s;
        return ()=>{
            const o = t.default && Bi(t.default(), !0);
            if (!o || !o.length)
                return;
            let i = o[0];
            if (o.length > 1) {
                for (const R of o)
                    if (R.type !== Ce) {
                        i = R;
                        break
                    }
            }
            const l = ne(e)
              , {mode: c} = l;
            if (r.isLeaving)
                return Er(i);
            const a = Gs(i);
            if (!a)
                return Er(i);
            const u = qr(a, l, r, n);
            zn(a, u);
            const h = n.subTree
              , f = h && Gs(h);
            let g = !1;
            const {getTransitionKey: y} = a.type;
            if (y) {
                const R = y();
                s === void 0 ? s = R : R !== s && (s = R,
                g = !0)
            }
            if (f && f.type !== Ce && (!Ze(a, f) || g)) {
                const R = qr(f, l, r, n);
                if (zn(f, R),
                c === "out-in")
                    return r.isLeaving = !0,
                    R.afterLeave = ()=>{
                        r.isLeaving = !1,
                        n.update.active !== !1 && n.update()
                    }
                    ,
                    Er(i);
                c === "in-out" && a.type !== Ce && (R.delayLeave = (x,_,p)=>{
                    const b = ji(r, f);
                    b[String(f.key)] = f,
                    x._leaveCb = ()=>{
                        _(),
                        x._leaveCb = void 0,
                        delete u.delayedLeave
                    }
                    ,
                    u.delayedLeave = p
                }
                )
            }
            return i
        }
    }
}
  , Fi = na;
function ji(e, t) {
    const {leavingVNodes: n} = e;
    let r = n.get(t.type);
    return r || (r = Object.create(null),
    n.set(t.type, r)),
    r
}
function qr(e, t, n, r) {
    const {appear: s, mode: o, persisted: i=!1, onBeforeEnter: l, onEnter: c, onAfterEnter: a, onEnterCancelled: u, onBeforeLeave: h, onLeave: f, onAfterLeave: g, onLeaveCancelled: y, onBeforeAppear: R, onAppear: x, onAfterAppear: _, onAppearCancelled: p} = t
      , b = String(e.key)
      , w = ji(n, e)
      , S = (k,D)=>{
        k && Be(k, r, 9, D)
    }
      , L = (k,D)=>{
        const B = D[1];
        S(k, D),
        z(k) ? k.every(V=>V.length <= 1) && B() : k.length <= 1 && B()
    }
      , N = {
        mode: o,
        persisted: i,
        beforeEnter(k) {
            let D = l;
            if (!n.isMounted)
                if (s)
                    D = R || l;
                else
                    return;
            k._leaveCb && k._leaveCb(!0);
            const B = w[b];
            B && Ze(e, B) && B.el._leaveCb && B.el._leaveCb(),
            S(D, [k])
        },
        enter(k) {
            let D = c
              , B = a
              , V = u;
            if (!n.isMounted)
                if (s)
                    D = x || c,
                    B = _ || a,
                    V = p || u;
                else
                    return;
            let I = !1;
            const Y = k._enterCb = j=>{
                I || (I = !0,
                j ? S(V, [k]) : S(B, [k]),
                N.delayedLeave && N.delayedLeave(),
                k._enterCb = void 0)
            }
            ;
            D ? L(D, [k, Y]) : Y()
        },
        leave(k, D) {
            const B = String(e.key);
            if (k._enterCb && k._enterCb(!0),
            n.isUnmounting)
                return D();
            S(h, [k]);
            let V = !1;
            const I = k._leaveCb = Y=>{
                V || (V = !0,
                D(),
                Y ? S(y, [k]) : S(g, [k]),
                k._leaveCb = void 0,
                w[B] === e && delete w[B])
            }
            ;
            w[B] = e,
            f ? L(f, [k, I]) : I()
        },
        clone(k) {
            return qr(k, t, n, r)
        }
    };
    return N
}
function Er(e) {
    if (Pn(e))
        return e = ot(e),
        e.children = null,
        e
}
function Gs(e) {
    return Pn(e) ? e.children ? e.children[0] : void 0 : e
}
function zn(e, t) {
    e.shapeFlag & 6 && e.component ? zn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent),
    e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}
function Bi(e, t=!1, n) {
    let r = []
      , s = 0;
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
        i.type === Pe ? (i.patchFlag & 128 && s++,
        r = r.concat(Bi(i.children, t, l))) : (t || i.type !== Ce) && r.push(l != null ? ot(i, {
            key: l
        }) : i)
    }
    if (s > 1)
        for (let o = 0; o < r.length; o++)
            r[o].patchFlag = -2;
    return r
}
function it(e) {
    return J(e) ? {
        setup: e,
        name: e.name
    } : e
}
const Ot = e=>!!e.type.__asyncLoader;
function ra(e) {
    J(e) && (e = {
        loader: e
    });
    const {loader: t, loadingComponent: n, errorComponent: r, delay: s=200, timeout: o, suspensible: i=!0, onError: l} = e;
    let c = null, a, u = 0;
    const h = ()=>(u++,
    c = null,
    f())
      , f = ()=>{
        let g;
        return c || (g = c = t().catch(y=>{
            if (y = y instanceof Error ? y : new Error(String(y)),
            l)
                return new Promise((R,x)=>{
                    l(y, ()=>R(h()), ()=>x(y), u + 1)
                }
                );
            throw y
        }
        ).then(y=>g !== c && c ? c : (y && (y.__esModule || y[Symbol.toStringTag] === "Module") && (y = y.default),
        a = y,
        y)))
    }
    ;
    return it({
        name: "AsyncComponentWrapper",
        __asyncLoader: f,
        get __asyncResolved() {
            return a
        },
        setup() {
            const g = pe;
            if (a)
                return ()=>wr(a, g);
            const y = p=>{
                c = null,
                nn(p, g, 13, !r)
            }
            ;
            if (i && g.suspense || Yt)
                return f().then(p=>()=>wr(p, g)).catch(p=>(y(p),
                ()=>r ? fe(r, {
                    error: p
                }) : null));
            const R = At(!1)
              , x = At()
              , _ = At(!!s);
            return s && setTimeout(()=>{
                _.value = !1
            }
            , s),
            o != null && setTimeout(()=>{
                if (!R.value && !x.value) {
                    const p = new Error(`Async component timed out after ${o}ms.`);
                    y(p),
                    x.value = p
                }
            }
            , o),
            f().then(()=>{
                R.value = !0,
                g.parent && Pn(g.parent.vnode) && lr(g.parent.update)
            }
            ).catch(p=>{
                y(p),
                x.value = p
            }
            ),
            ()=>{
                if (R.value && a)
                    return wr(a, g);
                if (x.value && r)
                    return fe(r, {
                        error: x.value
                    });
                if (n && !_.value)
                    return fe(n)
            }
        }
    })
}
function wr(e, t) {
    const {ref: n, props: r, children: s, ce: o} = t.vnode
      , i = fe(e, r, s);
    return i.ref = n,
    i.ce = o,
    delete t.vnode.ce,
    i
}
const Pn = e=>e.type.__isKeepAlive
  , sa = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
    },
    setup(e, {slots: t}) {
        const n = sn()
          , r = n.ctx;
        if (!r.renderer)
            return ()=>{
                const p = t.default && t.default();
                return p && p.length === 1 ? p[0] : p
            }
            ;
        const s = new Map
          , o = new Set;
        let i = null;
        const l = n.suspense
          , {renderer: {p: c, m: a, um: u, o: {createElement: h}}} = r
          , f = h("div");
        r.activate = (p,b,w,S,L)=>{
            const N = p.component;
            a(p, b, w, 0, l),
            c(N.vnode, p, b, w, N, l, S, p.slotScopeIds, L),
            ye(()=>{
                N.isDeactivated = !1,
                N.a && hn(N.a);
                const k = p.props && p.props.onVnodeMounted;
                k && ke(k, N.parent, p)
            }
            , l)
        }
        ,
        r.deactivate = p=>{
            const b = p.component;
            a(p, f, null, 1, l),
            ye(()=>{
                b.da && hn(b.da);
                const w = p.props && p.props.onVnodeUnmounted;
                w && ke(w, b.parent, p),
                b.isDeactivated = !0
            }
            , l)
        }
        ;
        function g(p) {
            Cr(p),
            u(p, n, l, !0)
        }
        function y(p) {
            s.forEach((b,w)=>{
                const S = Yr(b.type);
                S && (!p || !p(S)) && R(w)
            }
            )
        }
        function R(p) {
            const b = s.get(p);
            !i || b.type !== i.type ? g(b) : i && Cr(i),
            s.delete(p),
            o.delete(p)
        }
        _t(()=>[e.include, e.exclude], ([p,b])=>{
            p && y(w=>un(p, w)),
            b && y(w=>!un(b, w))
        }
        , {
            flush: "post",
            deep: !0
        });
        let x = null;
        const _ = ()=>{
            x != null && s.set(x, Rr(n.subTree))
        }
        ;
        return fr(_),
        Ui(_),
        An(()=>{
            s.forEach(p=>{
                const {subTree: b, suspense: w} = n
                  , S = Rr(b);
                if (p.type === S.type) {
                    Cr(S);
                    const L = S.component.da;
                    L && ye(L, w);
                    return
                }
                g(p)
            }
            )
        }
        ),
        ()=>{
            if (x = null,
            !t.default)
                return null;
            const p = t.default()
              , b = p[0];
            if (p.length > 1)
                return i = null,
                p;
            if (!Qt(b) || !(b.shapeFlag & 4) && !(b.shapeFlag & 128))
                return i = null,
                b;
            let w = Rr(b);
            const S = w.type
              , L = Yr(Ot(w) ? w.type.__asyncResolved || {} : S)
              , {include: N, exclude: k, max: D} = e;
            if (N && (!L || !un(N, L)) || k && L && un(k, L))
                return i = w,
                b;
            const B = w.key == null ? S : w.key
              , V = s.get(B);
            return w.el && (w = ot(w),
            b.shapeFlag & 128 && (b.ssContent = w)),
            x = B,
            V ? (w.el = V.el,
            w.component = V.component,
            w.transition && zn(w, w.transition),
            w.shapeFlag |= 512,
            o.delete(B),
            o.add(B)) : (o.add(B),
            D && o.size > parseInt(D, 10) && R(o.values().next().value)),
            w.shapeFlag |= 256,
            i = w,
            Mi(b.type) ? b : w
        }
    }
}
  , oa = sa;
function un(e, t) {
    return z(e) ? e.some(n=>un(n, t)) : de(e) ? e.split(",").includes(t) : e.test ? e.test(t) : !1
}
function ia(e, t) {
    Di(e, "a", t)
}
function la(e, t) {
    Di(e, "da", t)
}
function Di(e, t, n=pe) {
    const r = e.__wdc || (e.__wdc = ()=>{
        let s = n;
        for (; s; ) {
            if (s.isDeactivated)
                return;
            s = s.parent
        }
        return e()
    }
    );
    if (ur(t, r, n),
    n) {
        let s = n.parent;
        for (; s && s.parent; )
            Pn(s.parent.vnode) && ca(r, t, n, s),
            s = s.parent
    }
}
function ca(e, t, n, r) {
    const s = ur(t, e, r, !0);
    Ki(()=>{
        ds(r[t], s)
    }
    , n)
}
function Cr(e) {
    e.shapeFlag &= -257,
    e.shapeFlag &= -513
}
function Rr(e) {
    return e.shapeFlag & 128 ? e.ssContent : e
}
function ur(e, t, n=pe, r=!1) {
    if (n) {
        const s = n[e] || (n[e] = [])
          , o = t.__weh || (t.__weh = (...i)=>{
            if (n.isUnmounted)
                return;
            en(),
            Jt(n);
            const l = Be(t, n, e, i);
            return St(),
            tn(),
            l
        }
        );
        return r ? s.unshift(o) : s.push(o),
        o
    }
}
const lt = e=>(t,n=pe)=>(!Yt || e === "sp") && ur(e, (...r)=>t(...r), n)
  , aa = lt("bm")
  , fr = lt("m")
  , ua = lt("bu")
  , Ui = lt("u")
  , An = lt("bum")
  , Ki = lt("um")
  , fa = lt("sp")
  , da = lt("rtg")
  , ha = lt("rtc");
function qi(e, t=pe) {
    ur("ec", e, t)
}
function Ye(e, t, n, r) {
    const s = e.dirs
      , o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const l = s[i];
        o && (l.oldValue = o[i].value);
        let c = l.dir[r];
        c && (en(),
        Be(c, n, 8, [e.el, l, e, t]),
        tn())
    }
}
const Wi = "components";
function pa(e, t) {
    return ma(Wi, e, !0, t) || e
}
const ga = Symbol();
function ma(e, t, n=!0, r=!1) {
    const s = Ee || pe;
    if (s) {
        const o = s.type;
        if (e === Wi) {
            const l = Yr(o, !1);
            if (l && (l === t || l === Ge(t) || l === sr(Ge(t))))
                return o
        }
        const i = eo(s[e] || o[e], t) || eo(s.appContext[e], t);
        return !i && r ? o : i
    }
}
function eo(e, t) {
    return e && (e[t] || e[Ge(t)] || e[sr(Ge(t))])
}
function wp(e, t, n, r) {
    let s;
    const o = n && n[r];
    if (z(e) || de(e)) {
        s = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++)
            s[i] = t(e[i], i, void 0, o && o[i])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let i = 0; i < e; i++)
            s[i] = t(i + 1, i, void 0, o && o[i])
    } else if (ce(e))
        if (e[Symbol.iterator])
            s = Array.from(e, (i,l)=>t(i, l, void 0, o && o[l]));
        else {
            const i = Object.keys(e);
            s = new Array(i.length);
            for (let l = 0, c = i.length; l < c; l++) {
                const a = i[l];
                s[l] = t(e[a], a, l, o && o[l])
            }
        }
    else
        s = [];
    return n && (n[r] = s),
    s
}
function Cp(e, t, n={}, r, s) {
    if (Ee.isCE || Ee.parent && Ot(Ee.parent) && Ee.parent.isCE)
        return t !== "default" && (n.name = t),
        fe("slot", n, r && r());
    let o = e[t];
    o && o._c && (o._d = !1),
    xt();
    const i = o && Vi(o(n))
      , l = qt(Pe, {
        key: n.key || i && i.key || `_${t}`
    }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
    return !s && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
}
function Vi(e) {
    return e.some(t=>Qt(t) ? !(t.type === Ce || t.type === Pe && !Vi(t.children)) : !0) ? e : null
}
const Wr = e=>e ? ll(e) ? xs(e) || e.proxy : Wr(e.parent) : null
  , pn = _e(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>Wr(e.parent),
    $root: e=>Wr(e.root),
    $emit: e=>e.emit,
    $options: e=>Ps(e),
    $forceUpdate: e=>e.f || (e.f = ()=>lr(e.update)),
    $nextTick: e=>e.n || (e.n = rn.bind(e.proxy)),
    $watch: e=>ea.bind(e)
})
  , Tr = (e,t)=>e !== ae && !e.__isScriptSetup && te(e, t)
  , ya = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: s, props: o, accessCache: i, type: l, appContext: c} = e;
        let a;
        if (t[0] !== "$") {
            const g = i[t];
            if (g !== void 0)
                switch (g) {
                case 1:
                    return r[t];
                case 2:
                    return s[t];
                case 4:
                    return n[t];
                case 3:
                    return o[t]
                }
            else {
                if (Tr(r, t))
                    return i[t] = 1,
                    r[t];
                if (s !== ae && te(s, t))
                    return i[t] = 2,
                    s[t];
                if ((a = e.propsOptions[0]) && te(a, t))
                    return i[t] = 3,
                    o[t];
                if (n !== ae && te(n, t))
                    return i[t] = 4,
                    n[t];
                Vr && (i[t] = 0)
            }
        }
        const u = pn[t];
        let h, f;
        if (u)
            return t === "$attrs" && Le(e, "get", t),
            u(e);
        if ((h = l.__cssModules) && (h = h[t]))
            return h;
        if (n !== ae && te(n, t))
            return i[t] = 4,
            n[t];
        if (f = c.config.globalProperties,
        te(f, t))
            return f[t]
    },
    set({_: e}, t, n) {
        const {data: r, setupState: s, ctx: o} = e;
        return Tr(s, t) ? (s[t] = n,
        !0) : r !== ae && te(r, t) ? (r[t] = n,
        !0) : te(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (o[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o}}, i) {
        let l;
        return !!n[i] || e !== ae && te(e, i) || Tr(t, i) || (l = o[0]) && te(l, i) || te(r, i) || te(pn, i) || te(s.config.globalProperties, i)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : te(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
let Vr = !0;
function _a(e) {
    const t = Ps(e)
      , n = e.proxy
      , r = e.ctx;
    Vr = !1,
    t.beforeCreate && to(t.beforeCreate, e, "bc");
    const {data: s, computed: o, methods: i, watch: l, provide: c, inject: a, created: u, beforeMount: h, mounted: f, beforeUpdate: g, updated: y, activated: R, deactivated: x, beforeDestroy: _, beforeUnmount: p, destroyed: b, unmounted: w, render: S, renderTracked: L, renderTriggered: N, errorCaptured: k, serverPrefetch: D, expose: B, inheritAttrs: V, components: I, directives: Y, filters: j} = t;
    if (a && ba(a, r, null, e.appContext.config.unwrapInjectedRef),
    i)
        for (const ie in i) {
            const se = i[ie];
            J(se) && (r[ie] = se.bind(n))
        }
    if (s) {
        const ie = s.call(n, n);
        ce(ie) && (e.data = Ve(ie))
    }
    if (Vr = !0,
    o)
        for (const ie in o) {
            const se = o[ie]
              , De = J(se) ? se.bind(n, n) : J(se.get) ? se.get.bind(n, n) : We
              , vt = !J(se) && J(se.set) ? se.set.bind(n) : We
              , Ue = me({
                get: De,
                set: vt
            });
            Object.defineProperty(r, ie, {
                enumerable: !0,
                configurable: !0,
                get: ()=>Ue.value,
                set: Te=>Ue.value = Te
            })
        }
    if (l)
        for (const ie in l)
            zi(l[ie], r, n, ie);
    if (c) {
        const ie = J(c) ? c.call(n) : c;
        Reflect.ownKeys(ie).forEach(se=>{
            Kt(se, ie[se])
        }
        )
    }
    u && to(u, e, "c");
    function G(ie, se) {
        z(se) ? se.forEach(De=>ie(De.bind(n))) : se && ie(se.bind(n))
    }
    if (G(aa, h),
    G(fr, f),
    G(ua, g),
    G(Ui, y),
    G(ia, R),
    G(la, x),
    G(qi, k),
    G(ha, L),
    G(da, N),
    G(An, p),
    G(Ki, w),
    G(fa, D),
    z(B))
        if (B.length) {
            const ie = e.exposed || (e.exposed = {});
            B.forEach(se=>{
                Object.defineProperty(ie, se, {
                    get: ()=>n[se],
                    set: De=>n[se] = De
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    S && e.render === We && (e.render = S),
    V != null && (e.inheritAttrs = V),
    I && (e.components = I),
    Y && (e.directives = Y)
}
function ba(e, t, n=We, r=!1) {
    z(e) && (e = zr(e));
    for (const s in e) {
        const o = e[s];
        let i;
        ce(o) ? "default"in o ? i = Me(o.from || s, o.default, !0) : i = Me(o.from || s) : i = Me(o),
        ge(i) && r ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: ()=>i.value,
            set: l=>i.value = l
        }) : t[s] = i
    }
}
function to(e, t, n) {
    Be(z(e) ? e.map(r=>r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function zi(e, t, n, r) {
    const s = r.includes(".") ? Ni(n, r) : ()=>n[r];
    if (de(e)) {
        const o = t[e];
        J(o) && _t(s, o)
    } else if (J(e))
        _t(s, e.bind(n));
    else if (ce(e))
        if (z(e))
            e.forEach(o=>zi(o, t, n, r));
        else {
            const o = J(e.handler) ? e.handler.bind(n) : t[e.handler];
            J(o) && _t(s, o, e)
        }
}
function Ps(e) {
    const t = e.type
      , {mixins: n, extends: r} = t
      , {mixins: s, optionsCache: o, config: {optionMergeStrategies: i}} = e.appContext
      , l = o.get(t);
    let c;
    return l ? c = l : !s.length && !n && !r ? c = t : (c = {},
    s.length && s.forEach(a=>Qn(c, a, i, !0)),
    Qn(c, t, i)),
    ce(t) && o.set(t, c),
    c
}
function Qn(e, t, n, r=!1) {
    const {mixins: s, extends: o} = t;
    o && Qn(e, o, n, !0),
    s && s.forEach(i=>Qn(e, i, n, !0));
    for (const i in t)
        if (!(r && i === "expose")) {
            const l = va[i] || n && n[i];
            e[i] = l ? l(e[i], t[i]) : t[i]
        }
    return e
}
const va = {
    data: no,
    props: Rt,
    emits: Rt,
    methods: Rt,
    computed: Rt,
    beforeCreate: we,
    created: we,
    beforeMount: we,
    mounted: we,
    beforeUpdate: we,
    updated: we,
    beforeDestroy: we,
    beforeUnmount: we,
    destroyed: we,
    unmounted: we,
    activated: we,
    deactivated: we,
    errorCaptured: we,
    serverPrefetch: we,
    components: Rt,
    directives: Rt,
    watch: wa,
    provide: no,
    inject: Ea
};
function no(e, t) {
    return t ? e ? function() {
        return _e(J(e) ? e.call(this, this) : e, J(t) ? t.call(this, this) : t)
    }
    : t : e
}
function Ea(e, t) {
    return Rt(zr(e), zr(t))
}
function zr(e) {
    if (z(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function we(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Rt(e, t) {
    return e ? _e(_e(Object.create(null), e), t) : t
}
function wa(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = _e(Object.create(null), e);
    for (const r in t)
        n[r] = we(e[r], t[r]);
    return n
}
function Ca(e, t, n, r=!1) {
    const s = {}
      , o = {};
    Kn(o, dr, 1),
    e.propsDefaults = Object.create(null),
    Qi(e, t, s, o);
    for (const i in e.propsOptions[0])
        i in s || (s[i] = void 0);
    n ? e.props = r ? s : Hc(s) : e.type.props ? e.props = s : e.props = o,
    e.attrs = o
}
function Ra(e, t, n, r) {
    const {props: s, attrs: o, vnode: {patchFlag: i}} = e
      , l = ne(s)
      , [c] = e.propsOptions;
    let a = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const u = e.vnode.dynamicProps;
            for (let h = 0; h < u.length; h++) {
                let f = u[h];
                if (cr(e.emitsOptions, f))
                    continue;
                const g = t[f];
                if (c)
                    if (te(o, f))
                        g !== o[f] && (o[f] = g,
                        a = !0);
                    else {
                        const y = Ge(f);
                        s[y] = Qr(c, l, y, g, e, !1)
                    }
                else
                    g !== o[f] && (o[f] = g,
                    a = !0)
            }
        }
    } else {
        Qi(e, t, s, o) && (a = !0);
        let u;
        for (const h in l)
            (!t || !te(t, h) && ((u = Gt(h)) === h || !te(t, u))) && (c ? n && (n[h] !== void 0 || n[u] !== void 0) && (s[h] = Qr(c, l, h, void 0, e, !0)) : delete s[h]);
        if (o !== l)
            for (const h in o)
                (!t || !te(t, h) && !0) && (delete o[h],
                a = !0)
    }
    a && st(e, "set", "$attrs")
}
function Qi(e, t, n, r) {
    const [s,o] = e.propsOptions;
    let i = !1, l;
    if (t)
        for (let c in t) {
            if (dn(c))
                continue;
            const a = t[c];
            let u;
            s && te(s, u = Ge(c)) ? !o || !o.includes(u) ? n[u] = a : (l || (l = {}))[u] = a : cr(e.emitsOptions, c) || (!(c in r) || a !== r[c]) && (r[c] = a,
            i = !0)
        }
    if (o) {
        const c = ne(n)
          , a = l || ae;
        for (let u = 0; u < o.length; u++) {
            const h = o[u];
            n[h] = Qr(s, c, h, a[h], e, !te(a, h))
        }
    }
    return i
}
function Qr(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const l = te(i, "default");
        if (l && r === void 0) {
            const c = i.default;
            if (i.type !== Function && J(c)) {
                const {propsDefaults: a} = s;
                n in a ? r = a[n] : (Jt(s),
                r = a[n] = c.call(null, t),
                St())
            } else
                r = c
        }
        i[0] && (o && !l ? r = !1 : i[1] && (r === "" || r === Gt(n)) && (r = !0))
    }
    return r
}
function Ji(e, t, n=!1) {
    const r = t.propsCache
      , s = r.get(e);
    if (s)
        return s;
    const o = e.props
      , i = {}
      , l = [];
    let c = !1;
    if (!J(e)) {
        const u = h=>{
            c = !0;
            const [f,g] = Ji(h, t, !0);
            _e(i, f),
            g && l.push(...g)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(u),
        e.extends && u(e.extends),
        e.mixins && e.mixins.forEach(u)
    }
    if (!o && !c)
        return ce(e) && r.set(e, Ft),
        Ft;
    if (z(o))
        for (let u = 0; u < o.length; u++) {
            const h = Ge(o[u]);
            ro(h) && (i[h] = ae)
        }
    else if (o)
        for (const u in o) {
            const h = Ge(u);
            if (ro(h)) {
                const f = o[u]
                  , g = i[h] = z(f) || J(f) ? {
                    type: f
                } : Object.assign({}, f);
                if (g) {
                    const y = io(Boolean, g.type)
                      , R = io(String, g.type);
                    g[0] = y > -1,
                    g[1] = R < 0 || y < R,
                    (y > -1 || te(g, "default")) && l.push(h)
                }
            }
        }
    const a = [i, l];
    return ce(e) && r.set(e, a),
    a
}
function ro(e) {
    return e[0] !== "$"
}
function so(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : ""
}
function oo(e, t) {
    return so(e) === so(t)
}
function io(e, t) {
    return z(t) ? t.findIndex(n=>oo(n, e)) : J(t) && oo(t, e) ? 0 : -1
}
const Yi = e=>e[0] === "_" || e === "$stable"
  , As = e=>z(e) ? e.map(Fe) : [Fe(e)]
  , Ta = (e,t,n)=>{
    if (t._n)
        return t;
    const r = Cs((...s)=>As(t(...s)), n);
    return r._c = !1,
    r
}
  , Xi = (e,t,n)=>{
    const r = e._ctx;
    for (const s in e) {
        if (Yi(s))
            continue;
        const o = e[s];
        if (J(o))
            t[s] = Ta(s, o, r);
        else if (o != null) {
            const i = As(o);
            t[s] = ()=>i
        }
    }
}
  , Zi = (e,t)=>{
    const n = As(t);
    e.slots.default = ()=>n
}
  , ka = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = ne(t),
        Kn(t, "_", n)) : Xi(t, e.slots = {})
    } else
        e.slots = {},
        t && Zi(e, t);
    Kn(e.slots, dr, 1)
}
  , Pa = (e,t,n)=>{
    const {vnode: r, slots: s} = e;
    let o = !0
      , i = ae;
    if (r.shapeFlag & 32) {
        const l = t._;
        l ? n && l === 1 ? o = !1 : (_e(s, t),
        !n && l === 1 && delete s._) : (o = !t.$stable,
        Xi(t, s)),
        i = t
    } else
        t && (Zi(e, t),
        i = {
            default: 1
        });
    if (o)
        for (const l in s)
            !Yi(l) && !(l in i) && delete s[l]
}
;
function Gi() {
    return {
        app: null,
        config: {
            isNativeTag: Gl,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Aa = 0;
function Oa(e, t) {
    return function(r, s=null) {
        J(r) || (r = Object.assign({}, r)),
        s != null && !ce(s) && (s = null);
        const o = Gi()
          , i = new Set;
        let l = !1;
        const c = o.app = {
            _uid: Aa++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: Ss,
            get config() {
                return o.config
            },
            set config(a) {},
            use(a, ...u) {
                return i.has(a) || (a && J(a.install) ? (i.add(a),
                a.install(c, ...u)) : J(a) && (i.add(a),
                a(c, ...u))),
                c
            },
            mixin(a) {
                return o.mixins.includes(a) || o.mixins.push(a),
                c
            },
            component(a, u) {
                return u ? (o.components[a] = u,
                c) : o.components[a]
            },
            directive(a, u) {
                return u ? (o.directives[a] = u,
                c) : o.directives[a]
            },
            mount(a, u, h) {
                if (!l) {
                    const f = fe(r, s);
                    return f.appContext = o,
                    u && t ? t(f, a) : e(f, a, h),
                    l = !0,
                    c._container = a,
                    a.__vue_app__ = c,
                    xs(f.component) || f.component.proxy
                }
            },
            unmount() {
                l && (e(null, c._container),
                delete c._container.__vue_app__)
            },
            provide(a, u) {
                return o.provides[a] = u,
                c
            }
        };
        return c
    }
}
function Jn(e, t, n, r, s=!1) {
    if (z(e)) {
        e.forEach((f,g)=>Jn(f, t && (z(t) ? t[g] : t), n, r, s));
        return
    }
    if (Ot(r) && !s)
        return;
    const o = r.shapeFlag & 4 ? xs(r.component) || r.component.proxy : r.el
      , i = s ? null : o
      , {i: l, r: c} = e
      , a = t && t.r
      , u = l.refs === ae ? l.refs = {} : l.refs
      , h = l.setupState;
    if (a != null && a !== c && (de(a) ? (u[a] = null,
    te(h, a) && (h[a] = null)) : ge(a) && (a.value = null)),
    J(c))
        yt(c, l, 12, [i, u]);
    else {
        const f = de(c)
          , g = ge(c);
        if (f || g) {
            const y = ()=>{
                if (e.f) {
                    const R = f ? te(h, c) ? h[c] : u[c] : c.value;
                    s ? z(R) && ds(R, o) : z(R) ? R.includes(o) || R.push(o) : f ? (u[c] = [o],
                    te(h, c) && (h[c] = u[c])) : (c.value = [o],
                    e.k && (u[e.k] = c.value))
                } else
                    f ? (u[c] = i,
                    te(h, c) && (h[c] = i)) : g && (c.value = i,
                    e.k && (u[e.k] = i))
            }
            ;
            i ? (y.id = -1,
            ye(y, n)) : y()
        }
    }
}
let at = !1;
const Ln = e=>/svg/.test(e.namespaceURI) && e.tagName !== "foreignObject"
  , Nn = e=>e.nodeType === 8;
function xa(e) {
    const {mt: t, p: n, o: {patchProp: r, createText: s, nextSibling: o, parentNode: i, remove: l, insert: c, createComment: a}} = e
      , u = (_,p)=>{
        if (!p.hasChildNodes()) {
            n(null, _, p),
            Wn(),
            p._vnode = _;
            return
        }
        at = !1,
        h(p.firstChild, _, null, null, null),
        Wn(),
        p._vnode = _,
        at && console.error("Hydration completed but contains mismatches.")
    }
      , h = (_,p,b,w,S,L=!1)=>{
        const N = Nn(_) && _.data === "["
          , k = ()=>R(_, p, b, w, S, N)
          , {type: D, ref: B, shapeFlag: V, patchFlag: I} = p;
        let Y = _.nodeType;
        p.el = _,
        I === -2 && (L = !1,
        p.dynamicChildren = null);
        let j = null;
        switch (D) {
        case Vt:
            Y !== 3 ? p.children === "" ? (c(p.el = s(""), i(_), _),
            j = _) : j = k() : (_.data !== p.children && (at = !0,
            _.data = p.children),
            j = o(_));
            break;
        case Ce:
            Y !== 8 || N ? j = k() : j = o(_);
            break;
        case gn:
            if (N && (_ = o(_),
            Y = _.nodeType),
            Y === 1 || Y === 3) {
                j = _;
                const be = !p.children.length;
                for (let G = 0; G < p.staticCount; G++)
                    be && (p.children += j.nodeType === 1 ? j.outerHTML : j.data),
                    G === p.staticCount - 1 && (p.anchor = j),
                    j = o(j);
                return N ? o(j) : j
            } else
                k();
            break;
        case Pe:
            N ? j = y(_, p, b, w, S, L) : j = k();
            break;
        default:
            if (V & 1)
                Y !== 1 || p.type.toLowerCase() !== _.tagName.toLowerCase() ? j = k() : j = f(_, p, b, w, S, L);
            else if (V & 6) {
                p.slotScopeIds = S;
                const be = i(_);
                if (t(p, be, null, b, w, Ln(be), L),
                j = N ? x(_) : o(_),
                j && Nn(j) && j.data === "teleport end" && (j = o(j)),
                Ot(p)) {
                    let G;
                    N ? (G = fe(Pe),
                    G.anchor = j ? j.previousSibling : be.lastChild) : G = _.nodeType === 3 ? il("") : fe("div"),
                    G.el = _,
                    p.component.subTree = G
                }
            } else
                V & 64 ? Y !== 8 ? j = k() : j = p.type.hydrate(_, p, b, w, S, L, e, g) : V & 128 && (j = p.type.hydrate(_, p, b, w, Ln(i(_)), S, L, e, h))
        }
        return B != null && Jn(B, null, w, p),
        j
    }
      , f = (_,p,b,w,S,L)=>{
        L = L || !!p.dynamicChildren;
        const {type: N, props: k, patchFlag: D, shapeFlag: B, dirs: V} = p
          , I = N === "input" && V || N === "option";
        if (I || D !== -1) {
            if (V && Ye(p, null, b, "created"),
            k)
                if (I || !L || D & 48)
                    for (const j in k)
                        (I && j.endsWith("value") || kn(j) && !dn(j)) && r(_, j, null, k[j], !1, void 0, b);
                else
                    k.onClick && r(_, "onClick", null, k.onClick, !1, void 0, b);
            let Y;
            if ((Y = k && k.onVnodeBeforeMount) && ke(Y, b, p),
            V && Ye(p, null, b, "beforeMount"),
            ((Y = k && k.onVnodeMounted) || V) && Li(()=>{
                Y && ke(Y, b, p),
                V && Ye(p, null, b, "mounted")
            }
            , w),
            B & 16 && !(k && (k.innerHTML || k.textContent))) {
                let j = g(_.firstChild, p, _, b, w, S, L);
                for (; j; ) {
                    at = !0;
                    const be = j;
                    j = j.nextSibling,
                    l(be)
                }
            } else
                B & 8 && _.textContent !== p.children && (at = !0,
                _.textContent = p.children)
        }
        return _.nextSibling
    }
      , g = (_,p,b,w,S,L,N)=>{
        N = N || !!p.dynamicChildren;
        const k = p.children
          , D = k.length;
        for (let B = 0; B < D; B++) {
            const V = N ? k[B] : k[B] = Fe(k[B]);
            if (_)
                _ = h(_, V, w, S, L, N);
            else {
                if (V.type === Vt && !V.children)
                    continue;
                at = !0,
                n(null, V, b, null, w, S, Ln(b), L)
            }
        }
        return _
    }
      , y = (_,p,b,w,S,L)=>{
        const {slotScopeIds: N} = p;
        N && (S = S ? S.concat(N) : N);
        const k = i(_)
          , D = g(o(_), p, k, b, w, S, L);
        return D && Nn(D) && D.data === "]" ? o(p.anchor = D) : (at = !0,
        c(p.anchor = a("]"), k, D),
        D)
    }
      , R = (_,p,b,w,S,L)=>{
        if (at = !0,
        p.el = null,
        L) {
            const D = x(_);
            for (; ; ) {
                const B = o(_);
                if (B && B !== D)
                    l(B);
                else
                    break
            }
        }
        const N = o(_)
          , k = i(_);
        return l(_),
        n(null, p, k, N, b, w, Ln(k), S),
        N
    }
      , x = _=>{
        let p = 0;
        for (; _; )
            if (_ = o(_),
            _ && Nn(_) && (_.data === "[" && p++,
            _.data === "]")) {
                if (p === 0)
                    return o(_);
                p--
            }
        return _
    }
    ;
    return [u, h]
}
const ye = Li;
function Sa(e) {
    return el(e)
}
function $a(e) {
    return el(e, xa)
}
function el(e, t) {
    const n = oc();
    n.__VUE__ = !0;
    const {insert: r, remove: s, patchProp: o, createElement: i, createText: l, createComment: c, setText: a, setElementText: u, parentNode: h, nextSibling: f, setScopeId: g=We, insertStaticContent: y} = e
      , R = (d,m,v,E=null,T=null,O=null,M=!1,A=null,$=!!m.dynamicChildren)=>{
        if (d === m)
            return;
        d && !Ze(d, m) && (E = H(d),
        Te(d, T, O, !0),
        d = null),
        m.patchFlag === -2 && ($ = !1,
        m.dynamicChildren = null);
        const {type: P, ref: q, shapeFlag: U} = m;
        switch (P) {
        case Vt:
            x(d, m, v, E);
            break;
        case Ce:
            _(d, m, v, E);
            break;
        case gn:
            d == null && p(m, v, E, M);
            break;
        case Pe:
            I(d, m, v, E, T, O, M, A, $);
            break;
        default:
            U & 1 ? S(d, m, v, E, T, O, M, A, $) : U & 6 ? Y(d, m, v, E, T, O, M, A, $) : (U & 64 || U & 128) && P.process(d, m, v, E, T, O, M, A, $, ee)
        }
        q != null && T && Jn(q, d && d.ref, O, m || d, !m)
    }
      , x = (d,m,v,E)=>{
        if (d == null)
            r(m.el = l(m.children), v, E);
        else {
            const T = m.el = d.el;
            m.children !== d.children && a(T, m.children)
        }
    }
      , _ = (d,m,v,E)=>{
        d == null ? r(m.el = c(m.children || ""), v, E) : m.el = d.el
    }
      , p = (d,m,v,E)=>{
        [d.el,d.anchor] = y(d.children, m, v, E, d.el, d.anchor)
    }
      , b = ({el: d, anchor: m},v,E)=>{
        let T;
        for (; d && d !== m; )
            T = f(d),
            r(d, v, E),
            d = T;
        r(m, v, E)
    }
      , w = ({el: d, anchor: m})=>{
        let v;
        for (; d && d !== m; )
            v = f(d),
            s(d),
            d = v;
        s(m)
    }
      , S = (d,m,v,E,T,O,M,A,$)=>{
        M = M || m.type === "svg",
        d == null ? L(m, v, E, T, O, M, A, $) : D(d, m, T, O, M, A, $)
    }
      , L = (d,m,v,E,T,O,M,A)=>{
        let $, P;
        const {type: q, props: U, shapeFlag: W, transition: Q, dirs: Z} = d;
        if ($ = d.el = i(d.type, O, U && U.is, U),
        W & 8 ? u($, d.children) : W & 16 && k(d.children, $, null, E, T, O && q !== "foreignObject", M, A),
        Z && Ye(d, null, E, "created"),
        U) {
            for (const oe in U)
                oe !== "value" && !dn(oe) && o($, oe, null, U[oe], O, d.children, E, T, F);
            "value"in U && o($, "value", null, U.value),
            (P = U.onVnodeBeforeMount) && ke(P, E, d)
        }
        N($, d, d.scopeId, M, E),
        Z && Ye(d, null, E, "beforeMount");
        const le = (!T || T && !T.pendingBranch) && Q && !Q.persisted;
        le && Q.beforeEnter($),
        r($, m, v),
        ((P = U && U.onVnodeMounted) || le || Z) && ye(()=>{
            P && ke(P, E, d),
            le && Q.enter($),
            Z && Ye(d, null, E, "mounted")
        }
        , T)
    }
      , N = (d,m,v,E,T)=>{
        if (v && g(d, v),
        E)
            for (let O = 0; O < E.length; O++)
                g(d, E[O]);
        if (T) {
            let O = T.subTree;
            if (m === O) {
                const M = T.vnode;
                N(d, M, M.scopeId, M.slotScopeIds, T.parent)
            }
        }
    }
      , k = (d,m,v,E,T,O,M,A,$=0)=>{
        for (let P = $; P < d.length; P++) {
            const q = d[P] = A ? ht(d[P]) : Fe(d[P]);
            R(null, q, m, v, E, T, O, M, A)
        }
    }
      , D = (d,m,v,E,T,O,M)=>{
        const A = m.el = d.el;
        let {patchFlag: $, dynamicChildren: P, dirs: q} = m;
        $ |= d.patchFlag & 16;
        const U = d.props || ae
          , W = m.props || ae;
        let Q;
        v && Et(v, !1),
        (Q = W.onVnodeBeforeUpdate) && ke(Q, v, m, d),
        q && Ye(m, d, v, "beforeUpdate"),
        v && Et(v, !0);
        const Z = T && m.type !== "foreignObject";
        if (P ? B(d.dynamicChildren, P, A, v, E, Z, O) : M || se(d, m, A, null, v, E, Z, O, !1),
        $ > 0) {
            if ($ & 16)
                V(A, m, U, W, v, E, T);
            else if ($ & 2 && U.class !== W.class && o(A, "class", null, W.class, T),
            $ & 4 && o(A, "style", U.style, W.style, T),
            $ & 8) {
                const le = m.dynamicProps;
                for (let oe = 0; oe < le.length; oe++) {
                    const he = le[oe]
                      , Ke = U[he]
                      , Ht = W[he];
                    (Ht !== Ke || he === "value") && o(A, he, Ke, Ht, T, d.children, v, E, F)
                }
            }
            $ & 1 && d.children !== m.children && u(A, m.children)
        } else
            !M && P == null && V(A, m, U, W, v, E, T);
        ((Q = W.onVnodeUpdated) || q) && ye(()=>{
            Q && ke(Q, v, m, d),
            q && Ye(m, d, v, "updated")
        }
        , E)
    }
      , B = (d,m,v,E,T,O,M)=>{
        for (let A = 0; A < m.length; A++) {
            const $ = d[A]
              , P = m[A]
              , q = $.el && ($.type === Pe || !Ze($, P) || $.shapeFlag & 70) ? h($.el) : v;
            R($, P, q, null, E, T, O, M, !0)
        }
    }
      , V = (d,m,v,E,T,O,M)=>{
        if (v !== E) {
            if (v !== ae)
                for (const A in v)
                    !dn(A) && !(A in E) && o(d, A, v[A], null, M, m.children, T, O, F);
            for (const A in E) {
                if (dn(A))
                    continue;
                const $ = E[A]
                  , P = v[A];
                $ !== P && A !== "value" && o(d, A, P, $, M, m.children, T, O, F)
            }
            "value"in E && o(d, "value", v.value, E.value)
        }
    }
      , I = (d,m,v,E,T,O,M,A,$)=>{
        const P = m.el = d ? d.el : l("")
          , q = m.anchor = d ? d.anchor : l("");
        let {patchFlag: U, dynamicChildren: W, slotScopeIds: Q} = m;
        Q && (A = A ? A.concat(Q) : Q),
        d == null ? (r(P, v, E),
        r(q, v, E),
        k(m.children, v, q, T, O, M, A, $)) : U > 0 && U & 64 && W && d.dynamicChildren ? (B(d.dynamicChildren, W, v, T, O, M, A),
        (m.key != null || T && m === T.subTree) && tl(d, m, !0)) : se(d, m, v, q, T, O, M, A, $)
    }
      , Y = (d,m,v,E,T,O,M,A,$)=>{
        m.slotScopeIds = A,
        d == null ? m.shapeFlag & 512 ? T.ctx.activate(m, v, E, M, $) : j(m, v, E, T, O, M, $) : be(d, m, $)
    }
      , j = (d,m,v,E,T,O,M)=>{
        const A = d.component = Ba(d, E, T);
        if (Pn(d) && (A.ctx.renderer = ee),
        Da(A),
        A.asyncDep) {
            if (T && T.registerDep(A, G),
            !d.el) {
                const $ = A.subTree = fe(Ce);
                _(null, $, m, v)
            }
            return
        }
        G(A, d, m, v, T, O, M)
    }
      , be = (d,m,v)=>{
        const E = m.component = d.component;
        if (zc(d, m, v))
            if (E.asyncDep && !E.asyncResolved) {
                ie(E, m, v);
                return
            } else
                E.next = m,
                Dc(E.update),
                E.update();
        else
            m.el = d.el,
            E.vnode = m
    }
      , G = (d,m,v,E,T,O,M)=>{
        const A = ()=>{
            if (d.isMounted) {
                let {next: q, bu: U, u: W, parent: Q, vnode: Z} = d, le = q, oe;
                Et(d, !1),
                q ? (q.el = Z.el,
                ie(d, q, M)) : q = Z,
                U && hn(U),
                (oe = q.props && q.props.onVnodeBeforeUpdate) && ke(oe, Q, q, Z),
                Et(d, !0);
                const he = vr(d)
                  , Ke = d.subTree;
                d.subTree = he,
                R(Ke, he, h(Ke.el), H(Ke), d, T, O),
                q.el = he.el,
                le === null && Rs(d, he.el),
                W && ye(W, T),
                (oe = q.props && q.props.onVnodeUpdated) && ye(()=>ke(oe, Q, q, Z), T)
            } else {
                let q;
                const {el: U, props: W} = m
                  , {bm: Q, m: Z, parent: le} = d
                  , oe = Ot(m);
                if (Et(d, !1),
                Q && hn(Q),
                !oe && (q = W && W.onVnodeBeforeMount) && ke(q, le, m),
                Et(d, !0),
                U && X) {
                    const he = ()=>{
                        d.subTree = vr(d),
                        X(U, d.subTree, d, T, null)
                    }
                    ;
                    oe ? m.type.__asyncLoader().then(()=>!d.isUnmounted && he()) : he()
                } else {
                    const he = d.subTree = vr(d);
                    R(null, he, v, E, d, T, O),
                    m.el = he.el
                }
                if (Z && ye(Z, T),
                !oe && (q = W && W.onVnodeMounted)) {
                    const he = m;
                    ye(()=>ke(q, le, he), T)
                }
                (m.shapeFlag & 256 || le && Ot(le.vnode) && le.vnode.shapeFlag & 256) && d.a && ye(d.a, T),
                d.isMounted = !0,
                m = v = E = null
            }
        }
          , $ = d.effect = new ms(A,()=>lr(P),d.scope)
          , P = d.update = ()=>$.run();
        P.id = d.uid,
        Et(d, !0),
        P()
    }
      , ie = (d,m,v)=>{
        m.component = d;
        const E = d.vnode.props;
        d.vnode = m,
        d.next = null,
        Ra(d, m.props, E, v),
        Pa(d, m.children, v),
        en(),
        Ys(),
        tn()
    }
      , se = (d,m,v,E,T,O,M,A,$=!1)=>{
        const P = d && d.children
          , q = d ? d.shapeFlag : 0
          , U = m.children
          , {patchFlag: W, shapeFlag: Q} = m;
        if (W > 0) {
            if (W & 128) {
                vt(P, U, v, E, T, O, M, A, $);
                return
            } else if (W & 256) {
                De(P, U, v, E, T, O, M, A, $);
                return
            }
        }
        Q & 8 ? (q & 16 && F(P, T, O),
        U !== P && u(v, U)) : q & 16 ? Q & 16 ? vt(P, U, v, E, T, O, M, A, $) : F(P, T, O, !0) : (q & 8 && u(v, ""),
        Q & 16 && k(U, v, E, T, O, M, A, $))
    }
      , De = (d,m,v,E,T,O,M,A,$)=>{
        d = d || Ft,
        m = m || Ft;
        const P = d.length
          , q = m.length
          , U = Math.min(P, q);
        let W;
        for (W = 0; W < U; W++) {
            const Q = m[W] = $ ? ht(m[W]) : Fe(m[W]);
            R(d[W], Q, v, null, T, O, M, A, $)
        }
        P > q ? F(d, T, O, !0, !1, U) : k(m, v, E, T, O, M, A, $, U)
    }
      , vt = (d,m,v,E,T,O,M,A,$)=>{
        let P = 0;
        const q = m.length;
        let U = d.length - 1
          , W = q - 1;
        for (; P <= U && P <= W; ) {
            const Q = d[P]
              , Z = m[P] = $ ? ht(m[P]) : Fe(m[P]);
            if (Ze(Q, Z))
                R(Q, Z, v, null, T, O, M, A, $);
            else
                break;
            P++
        }
        for (; P <= U && P <= W; ) {
            const Q = d[U]
              , Z = m[W] = $ ? ht(m[W]) : Fe(m[W]);
            if (Ze(Q, Z))
                R(Q, Z, v, null, T, O, M, A, $);
            else
                break;
            U--,
            W--
        }
        if (P > U) {
            if (P <= W) {
                const Q = W + 1
                  , Z = Q < q ? m[Q].el : E;
                for (; P <= W; )
                    R(null, m[P] = $ ? ht(m[P]) : Fe(m[P]), v, Z, T, O, M, A, $),
                    P++
            }
        } else if (P > W)
            for (; P <= U; )
                Te(d[P], T, O, !0),
                P++;
        else {
            const Q = P
              , Z = P
              , le = new Map;
            for (P = Z; P <= W; P++) {
                const Oe = m[P] = $ ? ht(m[P]) : Fe(m[P]);
                Oe.key != null && le.set(Oe.key, P)
            }
            let oe, he = 0;
            const Ke = W - Z + 1;
            let Ht = !1
              , js = 0;
            const on = new Array(Ke);
            for (P = 0; P < Ke; P++)
                on[P] = 0;
            for (P = Q; P <= U; P++) {
                const Oe = d[P];
                if (he >= Ke) {
                    Te(Oe, T, O, !0);
                    continue
                }
                let Qe;
                if (Oe.key != null)
                    Qe = le.get(Oe.key);
                else
                    for (oe = Z; oe <= W; oe++)
                        if (on[oe - Z] === 0 && Ze(Oe, m[oe])) {
                            Qe = oe;
                            break
                        }
                Qe === void 0 ? Te(Oe, T, O, !0) : (on[Qe - Z] = P + 1,
                Qe >= js ? js = Qe : Ht = !0,
                R(Oe, m[Qe], v, null, T, O, M, A, $),
                he++)
            }
            const Bs = Ht ? Ha(on) : Ft;
            for (oe = Bs.length - 1,
            P = Ke - 1; P >= 0; P--) {
                const Oe = Z + P
                  , Qe = m[Oe]
                  , Ds = Oe + 1 < q ? m[Oe + 1].el : E;
                on[P] === 0 ? R(null, Qe, v, Ds, T, O, M, A, $) : Ht && (oe < 0 || P !== Bs[oe] ? Ue(Qe, v, Ds, 2) : oe--)
            }
        }
    }
      , Ue = (d,m,v,E,T=null)=>{
        const {el: O, type: M, transition: A, children: $, shapeFlag: P} = d;
        if (P & 6) {
            Ue(d.component.subTree, m, v, E);
            return
        }
        if (P & 128) {
            d.suspense.move(m, v, E);
            return
        }
        if (P & 64) {
            M.move(d, m, v, ee);
            return
        }
        if (M === Pe) {
            r(O, m, v);
            for (let U = 0; U < $.length; U++)
                Ue($[U], m, v, E);
            r(d.anchor, m, v);
            return
        }
        if (M === gn) {
            b(d, m, v);
            return
        }
        if (E !== 2 && P & 1 && A)
            if (E === 0)
                A.beforeEnter(O),
                r(O, m, v),
                ye(()=>A.enter(O), T);
            else {
                const {leave: U, delayLeave: W, afterLeave: Q} = A
                  , Z = ()=>r(O, m, v)
                  , le = ()=>{
                    U(O, ()=>{
                        Z(),
                        Q && Q()
                    }
                    )
                }
                ;
                W ? W(O, Z, le) : le()
            }
        else
            r(O, m, v)
    }
      , Te = (d,m,v,E=!1,T=!1)=>{
        const {type: O, props: M, ref: A, children: $, dynamicChildren: P, shapeFlag: q, patchFlag: U, dirs: W} = d;
        if (A != null && Jn(A, null, v, d, !0),
        q & 256) {
            m.ctx.deactivate(d);
            return
        }
        const Q = q & 1 && W
          , Z = !Ot(d);
        let le;
        if (Z && (le = M && M.onVnodeBeforeUnmount) && ke(le, m, d),
        q & 6)
            C(d.component, v, E);
        else {
            if (q & 128) {
                d.suspense.unmount(v, E);
                return
            }
            Q && Ye(d, null, m, "beforeUnmount"),
            q & 64 ? d.type.remove(d, m, v, T, ee, E) : P && (O !== Pe || U > 0 && U & 64) ? F(P, m, v, !1, !0) : (O === Pe && U & 384 || !T && q & 16) && F($, m, v),
            E && $t(d)
        }
        (Z && (le = M && M.onVnodeUnmounted) || Q) && ye(()=>{
            le && ke(le, m, d),
            Q && Ye(d, null, m, "unmounted")
        }
        , v)
    }
      , $t = d=>{
        const {type: m, el: v, anchor: E, transition: T} = d;
        if (m === Pe) {
            On(v, E);
            return
        }
        if (m === gn) {
            w(d);
            return
        }
        const O = ()=>{
            s(v),
            T && !T.persisted && T.afterLeave && T.afterLeave()
        }
        ;
        if (d.shapeFlag & 1 && T && !T.persisted) {
            const {leave: M, delayLeave: A} = T
              , $ = ()=>M(v, O);
            A ? A(d.el, O, $) : $()
        } else
            O()
    }
      , On = (d,m)=>{
        let v;
        for (; d !== m; )
            v = f(d),
            s(d),
            d = v;
        s(m)
    }
      , C = (d,m,v)=>{
        const {bum: E, scope: T, update: O, subTree: M, um: A} = d;
        E && hn(E),
        T.stop(),
        O && (O.active = !1,
        Te(M, d, m, v)),
        A && ye(A, m),
        ye(()=>{
            d.isUnmounted = !0
        }
        , m),
        m && m.pendingBranch && !m.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === m.pendingId && (m.deps--,
        m.deps === 0 && m.resolve())
    }
      , F = (d,m,v,E=!1,T=!1,O=0)=>{
        for (let M = O; M < d.length; M++)
            Te(d[M], m, v, E, T)
    }
      , H = d=>d.shapeFlag & 6 ? H(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : f(d.anchor || d.el)
      , K = (d,m,v)=>{
        d == null ? m._vnode && Te(m._vnode, null, null, !0) : R(m._vnode || null, d, m, null, null, null, v),
        Ys(),
        Wn(),
        m._vnode = d
    }
      , ee = {
        p: R,
        um: Te,
        m: Ue,
        r: $t,
        mt: j,
        mc: k,
        pc: se,
        pbc: B,
        n: H,
        o: e
    };
    let ue, X;
    return t && ([ue,X] = t(ee)),
    {
        render: K,
        hydrate: ue,
        createApp: Oa(K, ue)
    }
}
function Et({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function tl(e, t, n=!1) {
    const r = e.children
      , s = t.children;
    if (z(r) && z(s))
        for (let o = 0; o < r.length; o++) {
            const i = r[o];
            let l = s[o];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[o] = ht(s[o]),
            l.el = i.el),
            n || tl(i, l)),
            l.type === Vt && (l.el = i.el)
        }
}
function Ha(e) {
    const t = e.slice()
      , n = [0];
    let r, s, o, i, l;
    const c = e.length;
    for (r = 0; r < c; r++) {
        const a = e[r];
        if (a !== 0) {
            if (s = n[n.length - 1],
            e[s] < a) {
                t[r] = s,
                n.push(r);
                continue
            }
            for (o = 0,
            i = n.length - 1; o < i; )
                l = o + i >> 1,
                e[n[l]] < a ? o = l + 1 : i = l;
            a < e[n[o]] && (o > 0 && (t[r] = n[o - 1]),
            n[o] = r)
        }
    }
    for (o = n.length,
    i = n[o - 1]; o-- > 0; )
        n[o] = i,
        i = t[i];
    return n
}
const Ma = e=>e.__isTeleport
  , Pe = Symbol(void 0)
  , Vt = Symbol(void 0)
  , Ce = Symbol(void 0)
  , gn = Symbol(void 0)
  , mn = [];
let je = null;
function xt(e=!1) {
    mn.push(je = e ? null : [])
}
function nl() {
    mn.pop(),
    je = mn[mn.length - 1] || null
}
let zt = 1;
function lo(e) {
    zt += e
}
function rl(e) {
    return e.dynamicChildren = zt > 0 ? je || Ft : null,
    nl(),
    zt > 0 && je && je.push(e),
    e
}
function Rp(e, t, n, r, s, o) {
    return rl(ol(e, t, n, r, s, o, !0))
}
function qt(e, t, n, r, s) {
    return rl(fe(e, t, n, r, s, !0))
}
function Qt(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function Ze(e, t) {
    return e.type === t.type && e.key === t.key
}
const dr = "__vInternal"
  , sl = ({key: e})=>e != null ? e : null
  , Dn = ({ref: e, ref_key: t, ref_for: n})=>e != null ? de(e) || ge(e) || J(e) ? {
    i: Ee,
    r: e,
    k: t,
    f: !!n
} : e : null;
function ol(e, t=null, n=null, r=0, s=null, o=e === Pe ? 0 : 1, i=!1, l=!1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && sl(t),
        ref: t && Dn(t),
        scopeId: ar,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: Ee
    };
    return l ? (Os(c, n),
    o & 128 && e.normalize(c)) : n && (c.shapeFlag |= de(n) ? 8 : 16),
    zt > 0 && !i && je && (c.patchFlag > 0 || o & 6) && c.patchFlag !== 32 && je.push(c),
    c
}
const fe = Ia;
function Ia(e, t=null, n=null, r=0, s=null, o=!1) {
    if ((!e || e === ga) && (e = Ce),
    Qt(e)) {
        const l = ot(e, t, !0);
        return n && Os(l, n),
        zt > 0 && !o && je && (l.shapeFlag & 6 ? je[je.indexOf(e)] = l : je.push(l)),
        l.patchFlag |= -2,
        l
    }
    if (Wa(e) && (e = e.__vccOpts),
    t) {
        t = La(t);
        let {class: l, style: c} = t;
        l && !de(l) && (t.class = tr(l)),
        ce(c) && (Ei(c) && !z(c) && (c = _e({}, c)),
        t.style = er(c))
    }
    const i = de(e) ? 1 : Mi(e) ? 128 : Ma(e) ? 64 : ce(e) ? 4 : J(e) ? 2 : 0;
    return ol(e, t, n, r, s, i, o, !0)
}
function La(e) {
    return e ? Ei(e) || dr in e ? _e({}, e) : e : null
}
function ot(e, t, n=!1) {
    const {props: r, ref: s, patchFlag: o, children: i} = e
      , l = t ? Na(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && sl(l),
        ref: t && t.ref ? n && s ? z(s) ? s.concat(Dn(t)) : [s, Dn(t)] : Dn(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Pe ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && ot(e.ssContent),
        ssFallback: e.ssFallback && ot(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx
    }
}
function il(e=" ", t=0) {
    return fe(Vt, null, e, t)
}
function Tp(e, t) {
    const n = fe(gn, null, e);
    return n.staticCount = t,
    n
}
function kp(e="", t=!1) {
    return t ? (xt(),
    qt(Ce, null, e)) : fe(Ce, null, e)
}
function Fe(e) {
    return e == null || typeof e == "boolean" ? fe(Ce) : z(e) ? fe(Pe, null, e.slice()) : typeof e == "object" ? ht(e) : fe(Vt, null, String(e))
}
function ht(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : ot(e)
}
function Os(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null)
        t = null;
    else if (z(t))
        n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1),
            Os(e, s()),
            s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !(dr in t) ? t._ctx = Ee : s === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        J(t) ? (t = {
            default: t,
            _ctx: Ee
        },
        n = 32) : (t = String(t),
        r & 64 ? (n = 16,
        t = [il(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function Na(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class")
                t.class !== r.class && (t.class = tr([t.class, r.class]));
            else if (s === "style")
                t.style = er([t.style, r.style]);
            else if (kn(s)) {
                const o = t[s]
                  , i = r[s];
                i && o !== i && !(z(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i)
            } else
                s !== "" && (t[s] = r[s])
    }
    return t
}
function ke(e, t, n, r=null) {
    Be(e, t, 7, [n, r])
}
const Fa = Gi();
let ja = 0;
function Ba(e, t, n) {
    const r = e.type
      , s = (t ? t.appContext : e.appContext) || Fa
      , o = {
        uid: ja++,
        vnode: e,
        type: r,
        parent: t,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new ic(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(s.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Ji(r, s),
        emitsOptions: Hi(r, s),
        emit: null,
        emitted: null,
        propsDefaults: ae,
        inheritAttrs: r.inheritAttrs,
        ctx: ae,
        data: ae,
        props: ae,
        attrs: ae,
        slots: ae,
        refs: ae,
        setupState: ae,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return o.ctx = {
        _: o
    },
    o.root = t ? t.root : o,
    o.emit = Kc.bind(null, o),
    e.ce && e.ce(o),
    o
}
let pe = null;
const sn = ()=>pe || Ee
  , Jt = e=>{
    pe = e,
    e.scope.on()
}
  , St = ()=>{
    pe && pe.scope.off(),
    pe = null
}
;
function ll(e) {
    return e.vnode.shapeFlag & 4
}
let Yt = !1;
function Da(e, t=!1) {
    Yt = t;
    const {props: n, children: r} = e.vnode
      , s = ll(e);
    Ca(e, n, s, t),
    ka(e, r);
    const o = s ? Ua(e, t) : void 0;
    return Yt = !1,
    o
}
function Ua(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = wi(new Proxy(e.ctx,ya));
    const {setup: r} = n;
    if (r) {
        const s = e.setupContext = r.length > 1 ? qa(e) : null;
        Jt(e),
        en();
        const o = yt(r, e, 0, [e.props, s]);
        if (tn(),
        St(),
        li(o)) {
            if (o.then(St, St),
            t)
                return o.then(i=>{
                    Jr(e, i, t)
                }
                ).catch(i=>{
                    nn(i, e, 0)
                }
                );
            e.asyncDep = o
        } else
            Jr(e, o, t)
    } else
        cl(e, t)
}
function Jr(e, t, n) {
    J(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ce(t) && (e.setupState = ki(t)),
    cl(e, n)
}
let co;
function cl(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && co && !r.render) {
            const s = r.template || Ps(e).template;
            if (s) {
                const {isCustomElement: o, compilerOptions: i} = e.appContext.config
                  , {delimiters: l, compilerOptions: c} = r
                  , a = _e(_e({
                    isCustomElement: o,
                    delimiters: l
                }, i), c);
                r.render = co(s, a)
            }
        }
        e.render = r.render || We
    }
    Jt(e),
    en(),
    _a(e),
    tn(),
    St()
}
function Ka(e) {
    return new Proxy(e.attrs,{
        get(t, n) {
            return Le(e, "get", "$attrs"),
            t[n]
        }
    })
}
function qa(e) {
    const t = r=>{
        e.exposed = r || {}
    }
    ;
    let n;
    return {
        get attrs() {
            return n || (n = Ka(e))
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function xs(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(ki(wi(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in pn)
                    return pn[n](e)
            },
            has(t, n) {
                return n in t || n in pn
            }
        }))
}
function Yr(e, t=!0) {
    return J(e) ? e.displayName || e.name : e.name || t && e.__name
}
function Wa(e) {
    return J(e) && "__vccOpts"in e
}
const me = (e,t)=>Fc(e, t, Yt);
function Ie(e, t, n) {
    const r = arguments.length;
    return r === 2 ? ce(t) && !z(t) ? Qt(t) ? fe(e, null, [t]) : fe(e, t) : fe(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Qt(n) && (n = [n]),
    fe(e, t, n))
}
const Va = Symbol("")
  , za = ()=>Me(Va)
  , Ss = "3.2.45"
  , Qa = "http://www.w3.org/2000/svg"
  , kt = typeof document < "u" ? document : null
  , ao = kt && kt.createElement("template")
  , Ja = {
    insert: (e,t,n)=>{
        t.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,n,r)=>{
        const s = t ? kt.createElementNS(Qa, e) : kt.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple),
        s
    }
    ,
    createText: e=>kt.createTextNode(e),
    createComment: e=>kt.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>kt.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, s, o) {
        const i = n ? n.previousSibling : t.lastChild;
        if (s && (s === o || s.nextSibling))
            for (; t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling)); )
                ;
        else {
            ao.innerHTML = r ? `<svg>${e}</svg>` : e;
            const l = ao.content;
            if (r) {
                const c = l.firstChild;
                for (; c.firstChild; )
                    l.appendChild(c.firstChild);
                l.removeChild(c)
            }
            t.insertBefore(l, n)
        }
        return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
function Ya(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function Xa(e, t, n) {
    const r = e.style
      , s = de(n);
    if (n && !s) {
        for (const o in n)
            Xr(r, o, n[o]);
        if (t && !de(t))
            for (const o in t)
                n[o] == null && Xr(r, o, "")
    } else {
        const o = r.display;
        s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
        "_vod"in e && (r.display = o)
    }
}
const uo = /\s*!important$/;
function Xr(e, t, n) {
    if (z(n))
        n.forEach(r=>Xr(e, t, r));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const r = Za(e, t);
        uo.test(n) ? e.setProperty(Gt(r), n.replace(uo, ""), "important") : e[r] = n
    }
}
const fo = ["Webkit", "Moz", "ms"]
  , kr = {};
function Za(e, t) {
    const n = kr[t];
    if (n)
        return n;
    let r = Ge(t);
    if (r !== "filter" && r in e)
        return kr[t] = r;
    r = sr(r);
    for (let s = 0; s < fo.length; s++) {
        const o = fo[s] + r;
        if (o in e)
            return kr[t] = o
    }
    return t
}
const ho = "http://www.w3.org/1999/xlink";
function Ga(e, t, n, r, s) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(ho, t.slice(6, t.length)) : e.setAttributeNS(ho, t, n);
    else {
        const o = Zl(t);
        n == null || o && !si(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}
function eu(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o),
        e[t] = n == null ? "" : n;
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const c = n == null ? "" : n;
        (e.value !== c || e.tagName === "OPTION") && (e.value = c),
        n == null && e.removeAttribute(t);
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const c = typeof e[t];
        c === "boolean" ? n = si(n) : n == null && c === "string" ? (n = "",
        l = !0) : c === "number" && (n = 0,
        l = !0)
    }
    try {
        e[t] = n
    } catch {}
    l && e.removeAttribute(t)
}
function tu(e, t, n, r) {
    e.addEventListener(t, n, r)
}
function nu(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
function ru(e, t, n, r, s=null) {
    const o = e._vei || (e._vei = {})
      , i = o[t];
    if (r && i)
        i.value = r;
    else {
        const [l,c] = su(t);
        if (r) {
            const a = o[t] = lu(r, s);
            tu(e, l, a, c)
        } else
            i && (nu(e, l, i, c),
            o[t] = void 0)
    }
}
const po = /(?:Once|Passive|Capture)$/;
function su(e) {
    let t;
    if (po.test(e)) {
        t = {};
        let r;
        for (; r = e.match(po); )
            e = e.slice(0, e.length - r[0].length),
            t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Gt(e.slice(2)), t]
}
let Pr = 0;
const ou = Promise.resolve()
  , iu = ()=>Pr || (ou.then(()=>Pr = 0),
Pr = Date.now());
function lu(e, t) {
    const n = r=>{
        if (!r._vts)
            r._vts = Date.now();
        else if (r._vts <= n.attached)
            return;
        Be(cu(r, n.value), t, 5, [r])
    }
    ;
    return n.value = e,
    n.attached = iu(),
    n
}
function cu(e, t) {
    if (z(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(r=>s=>!s._stopped && r && r(s))
    } else
        return t
}
const go = /^on[a-z]/
  , au = (e,t,n,r,s=!1,o,i,l,c)=>{
    t === "class" ? Ya(e, r, s) : t === "style" ? Xa(e, n, r) : kn(t) ? fs(t) || ru(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : uu(e, t, r, s)) ? eu(e, t, r, o, i, l, c) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r),
    Ga(e, t, r, s))
}
;
function uu(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && go.test(t) && J(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || go.test(t) && de(n) ? !1 : t in e
}
const ut = "transition"
  , ln = "animation"
  , hr = (e,{slots: t})=>Ie(Fi, fu(e), t);
hr.displayName = "Transition";
const al = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
hr.props = _e({}, Fi.props, al);
const wt = (e,t=[])=>{
    z(e) ? e.forEach(n=>n(...t)) : e && e(...t)
}
  , mo = e=>e ? z(e) ? e.some(t=>t.length > 1) : e.length > 1 : !1;
function fu(e) {
    const t = {};
    for (const I in e)
        I in al || (t[I] = e[I]);
    if (e.css === !1)
        return t;
    const {name: n="v", type: r, duration: s, enterFromClass: o=`${n}-enter-from`, enterActiveClass: i=`${n}-enter-active`, enterToClass: l=`${n}-enter-to`, appearFromClass: c=o, appearActiveClass: a=i, appearToClass: u=l, leaveFromClass: h=`${n}-leave-from`, leaveActiveClass: f=`${n}-leave-active`, leaveToClass: g=`${n}-leave-to`} = e
      , y = du(s)
      , R = y && y[0]
      , x = y && y[1]
      , {onBeforeEnter: _, onEnter: p, onEnterCancelled: b, onLeave: w, onLeaveCancelled: S, onBeforeAppear: L=_, onAppear: N=p, onAppearCancelled: k=b} = t
      , D = (I,Y,j)=>{
        Ct(I, Y ? u : l),
        Ct(I, Y ? a : i),
        j && j()
    }
      , B = (I,Y)=>{
        I._isLeaving = !1,
        Ct(I, h),
        Ct(I, g),
        Ct(I, f),
        Y && Y()
    }
      , V = I=>(Y,j)=>{
        const be = I ? N : p
          , G = ()=>D(Y, I, j);
        wt(be, [Y, G]),
        yo(()=>{
            Ct(Y, I ? c : o),
            ft(Y, I ? u : l),
            mo(be) || _o(Y, r, R, G)
        }
        )
    }
    ;
    return _e(t, {
        onBeforeEnter(I) {
            wt(_, [I]),
            ft(I, o),
            ft(I, i)
        },
        onBeforeAppear(I) {
            wt(L, [I]),
            ft(I, c),
            ft(I, a)
        },
        onEnter: V(!1),
        onAppear: V(!0),
        onLeave(I, Y) {
            I._isLeaving = !0;
            const j = ()=>B(I, Y);
            ft(I, h),
            gu(),
            ft(I, f),
            yo(()=>{
                !I._isLeaving || (Ct(I, h),
                ft(I, g),
                mo(w) || _o(I, r, x, j))
            }
            ),
            wt(w, [I, j])
        },
        onEnterCancelled(I) {
            D(I, !1),
            wt(b, [I])
        },
        onAppearCancelled(I) {
            D(I, !0),
            wt(k, [I])
        },
        onLeaveCancelled(I) {
            B(I),
            wt(S, [I])
        }
    })
}
function du(e) {
    if (e == null)
        return null;
    if (ce(e))
        return [Ar(e.enter), Ar(e.leave)];
    {
        const t = Ar(e);
        return [t, t]
    }
}
function Ar(e) {
    return or(e)
}
function ft(e, t) {
    t.split(/\s+/).forEach(n=>n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set)).add(t)
}
function Ct(e, t) {
    t.split(/\s+/).forEach(r=>r && e.classList.remove(r));
    const {_vtc: n} = e;
    n && (n.delete(t),
    n.size || (e._vtc = void 0))
}
function yo(e) {
    requestAnimationFrame(()=>{
        requestAnimationFrame(e)
    }
    )
}
let hu = 0;
function _o(e, t, n, r) {
    const s = e._endId = ++hu
      , o = ()=>{
        s === e._endId && r()
    }
    ;
    if (n)
        return setTimeout(o, n);
    const {type: i, timeout: l, propCount: c} = pu(e, t);
    if (!i)
        return r();
    const a = i + "end";
    let u = 0;
    const h = ()=>{
        e.removeEventListener(a, f),
        o()
    }
      , f = g=>{
        g.target === e && ++u >= c && h()
    }
    ;
    setTimeout(()=>{
        u < c && h()
    }
    , l + 1),
    e.addEventListener(a, f)
}
function pu(e, t) {
    const n = window.getComputedStyle(e)
      , r = y=>(n[y] || "").split(", ")
      , s = r(`${ut}Delay`)
      , o = r(`${ut}Duration`)
      , i = bo(s, o)
      , l = r(`${ln}Delay`)
      , c = r(`${ln}Duration`)
      , a = bo(l, c);
    let u = null
      , h = 0
      , f = 0;
    t === ut ? i > 0 && (u = ut,
    h = i,
    f = o.length) : t === ln ? a > 0 && (u = ln,
    h = a,
    f = c.length) : (h = Math.max(i, a),
    u = h > 0 ? i > a ? ut : ln : null,
    f = u ? u === ut ? o.length : c.length : 0);
    const g = u === ut && /\b(transform|all)(,|$)/.test(r(`${ut}Property`).toString());
    return {
        type: u,
        timeout: h,
        propCount: f,
        hasTransform: g
    }
}
function bo(e, t) {
    for (; e.length < t.length; )
        e = e.concat(e);
    return Math.max(...t.map((n,r)=>vo(n) + vo(e[r])))
}
function vo(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3
}
function gu() {
    return document.body.offsetHeight
}
const ul = _e({
    patchProp: au
}, Ja);
let yn, Eo = !1;
function mu() {
    return yn || (yn = Sa(ul))
}
function yu() {
    return yn = Eo ? yn : $a(ul),
    Eo = !0,
    yn
}
const _u = (...e)=>{
    const t = mu().createApp(...e)
      , {mount: n} = t;
    return t.mount = r=>{
        const s = fl(r);
        if (!s)
            return;
        const o = t._component;
        !J(o) && !o.render && !o.template && (o.template = s.innerHTML),
        s.innerHTML = "";
        const i = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"),
        s.setAttribute("data-v-app", "")),
        i
    }
    ,
    t
}
  , bu = (...e)=>{
    const t = yu().createApp(...e)
      , {mount: n} = t;
    return t.mount = r=>{
        const s = fl(r);
        if (s)
            return n(s, !0, s instanceof SVGElement)
    }
    ,
    t
}
;
function fl(e) {
    return de(e) ? document.querySelector(e) : e
}
const vu = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/
  , Eu = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
  , wu = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function Cu(e, t) {
    if (e !== "__proto__" && !(e === "constructor" && t && typeof t == "object" && "prototype"in t))
        return t
}
function Ru(e, t={}) {
    if (typeof e != "string")
        return e;
    const n = e.toLowerCase().trim();
    if (n === "true")
        return !0;
    if (n === "false")
        return !1;
    if (n === "null")
        return null;
    if (n === "nan")
        return Number.NaN;
    if (n === "infinity")
        return Number.POSITIVE_INFINITY;
    if (n !== "undefined") {
        if (!wu.test(e)) {
            if (t.strict)
                throw new SyntaxError("Invalid JSON");
            return e
        }
        try {
            return vu.test(e) || Eu.test(e) ? JSON.parse(e, Cu) : JSON.parse(e)
        } catch (r) {
            if (t.strict)
                throw r;
            return e
        }
    }
}
const Tu = /#/g
  , ku = /&/g
  , Pu = /=/g
  , dl = /\+/g
  , Au = /%5b/gi
  , Ou = /%5d/gi
  , xu = /%5e/gi
  , Su = /%60/gi
  , $u = /%7b/gi
  , Hu = /%7c/gi
  , Mu = /%7d/gi
  , Iu = /%20/gi;
function Lu(e) {
    return encodeURI("" + e).replace(Hu, "|").replace(Au, "[").replace(Ou, "]")
}
function Zr(e) {
    return Lu(e).replace(dl, "%2B").replace(Iu, "+").replace(Tu, "%23").replace(ku, "%26").replace(Su, "`").replace($u, "{").replace(Mu, "}").replace(xu, "^")
}
function Or(e) {
    return Zr(e).replace(Pu, "%3D")
}
function hl(e="") {
    try {
        return decodeURIComponent("" + e)
    } catch {
        return "" + e
    }
}
function Nu(e) {
    return hl(e.replace(dl, " "))
}
function Fu(e="") {
    const t = {};
    e[0] === "?" && (e = e.slice(1));
    for (const n of e.split("&")) {
        const r = n.match(/([^=]+)=?(.*)/) || [];
        if (r.length < 2)
            continue;
        const s = hl(r[1]);
        if (s === "__proto__" || s === "constructor")
            continue;
        const o = Nu(r[2] || "");
        typeof t[s] < "u" ? Array.isArray(t[s]) ? t[s].push(o) : t[s] = [t[s], o] : t[s] = o
    }
    return t
}
function ju(e, t) {
    return (typeof t == "number" || typeof t == "boolean") && (t = String(t)),
    t ? Array.isArray(t) ? t.map(n=>`${Or(e)}=${Zr(n)}`).join("&") : `${Or(e)}=${Zr(t)}` : Or(e)
}
function Bu(e) {
    return Object.keys(e).filter(t=>e[t] !== void 0).map(t=>ju(t, e[t])).join("&")
}
const Du = /^\w{2,}:(\/\/)?/
  , Uu = /^\/\/[^/]+/;
function pr(e, t=!1) {
    return Du.test(e) || t && Uu.test(e)
}
const Ku = /\/$|\/\?/;
function Gr(e="", t=!1) {
    return t ? Ku.test(e) : e.endsWith("/")
}
function pl(e="", t=!1) {
    if (!t)
        return (Gr(e) ? e.slice(0, -1) : e) || "/";
    if (!Gr(e, !0))
        return e || "/";
    const [n,...r] = e.split("?");
    return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "")
}
function qu(e="", t=!1) {
    if (!t)
        return e.endsWith("/") ? e : e + "/";
    if (Gr(e, !0))
        return e || "/";
    const [n,...r] = e.split("?");
    return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "")
}
function Wu(e="") {
    return e.startsWith("/")
}
function Vu(e="") {
    return (Wu(e) ? e.slice(1) : e) || "/"
}
function zu(e, t) {
    if (gl(t) || pr(e))
        return e;
    const n = pl(t);
    return e.startsWith(n) ? e : $s(n, e)
}
function wo(e, t) {
    if (gl(t))
        return e;
    const n = pl(t);
    if (!e.startsWith(n))
        return e;
    const r = e.slice(n.length);
    return r[0] === "/" ? r : "/" + r
}
function Qu(e, t) {
    const n = Hs(e)
      , r = {
        ...Fu(n.search),
        ...t
    };
    return n.search = Bu(r),
    Yu(n)
}
function gl(e) {
    return !e || e === "/"
}
function Ju(e) {
    return e && e !== "/"
}
function $s(e, ...t) {
    let n = e || "";
    for (const r of t.filter(s=>Ju(s)))
        n = n ? qu(n) + Vu(r) : r;
    return n
}
function Hs(e="", t) {
    if (!pr(e, !0))
        return t ? Hs(t + e) : Co(e);
    const [n="",r,s=""] = (e.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1)
      , [o="",i=""] = (s.match(/([^#/?]*)(.*)?/) || []).splice(1)
      , {pathname: l, search: c, hash: a} = Co(i.replace(/\/(?=[A-Za-z]:)/, ""));
    return {
        protocol: n,
        auth: r ? r.slice(0, Math.max(0, r.length - 1)) : "",
        host: o,
        pathname: l,
        search: c,
        hash: a
    }
}
function Co(e="") {
    const [t="",n="",r=""] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
    return {
        pathname: t,
        search: n,
        hash: r
    }
}
function Yu(e) {
    const t = e.pathname + (e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "") + e.hash;
    return e.protocol ? e.protocol + "//" + (e.auth ? e.auth + "@" : "") + e.host + t : t
}
class Xu extends Error {
    constructor() {
        super(...arguments),
        this.name = "FetchError"
    }
}
function Zu(e, t, n) {
    let r = "";
    e && n && (r = `${n.status} ${n.statusText} (${e.toString()})`),
    t && (r = `${t.message} (${r})`);
    const s = new Xu(r);
    return Object.defineProperty(s, "request", {
        get() {
            return e
        }
    }),
    Object.defineProperty(s, "response", {
        get() {
            return n
        }
    }),
    Object.defineProperty(s, "data", {
        get() {
            return n && n._data
        }
    }),
    Object.defineProperty(s, "status", {
        get() {
            return n && n.status
        }
    }),
    Object.defineProperty(s, "statusText", {
        get() {
            return n && n.statusText
        }
    }),
    Object.defineProperty(s, "statusCode", {
        get() {
            return n && n.status
        }
    }),
    Object.defineProperty(s, "statusMessage", {
        get() {
            return n && n.statusText
        }
    }),
    s
}
const Gu = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function Ro(e="GET") {
    return Gu.has(e.toUpperCase())
}
function ef(e) {
    if (e === void 0)
        return !1;
    const t = typeof e;
    return t === "string" || t === "number" || t === "boolean" || t === null ? !0 : t !== "object" ? !1 : Array.isArray(e) ? !0 : e.constructor && e.constructor.name === "Object" || typeof e.toJSON == "function"
}
const tf = new Set(["image/svg", "application/xml", "application/xhtml", "application/html"])
  , nf = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function rf(e="") {
    if (!e)
        return "json";
    const t = e.split(";").shift();
    return nf.test(t) ? "json" : tf.has(t) || t.startsWith("text/") ? "text" : "blob"
}
const sf = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function ml(e) {
    const {fetch: t, Headers: n} = e;
    function r(i) {
        const l = i.error && i.error.name === "AbortError" || !1;
        if (i.options.retry !== !1 && !l) {
            const a = typeof i.options.retry == "number" ? i.options.retry : Ro(i.options.method) ? 0 : 1
              , u = i.response && i.response.status || 500;
            if (a > 0 && sf.has(u))
                return s(i.request, {
                    ...i.options,
                    retry: a - 1
                })
        }
        const c = Zu(i.request, i.error, i.response);
        throw Error.captureStackTrace && Error.captureStackTrace(c, s),
        c
    }
    const s = async function(l, c={}) {
        const a = {
            request: l,
            options: {
                ...e.defaults,
                ...c
            },
            response: void 0,
            error: void 0
        };
        a.options.onRequest && await a.options.onRequest(a),
        typeof a.request == "string" && (a.options.baseURL && (a.request = zu(a.request, a.options.baseURL)),
        (a.options.query || a.options.params) && (a.request = Qu(a.request, {
            ...a.options.params,
            ...a.options.query
        })),
        a.options.body && Ro(a.options.method) && ef(a.options.body) && (a.options.body = typeof a.options.body == "string" ? a.options.body : JSON.stringify(a.options.body),
        a.options.headers = new n(a.options.headers),
        a.options.headers.has("content-type") || a.options.headers.set("content-type", "application/json"),
        a.options.headers.has("accept") || a.options.headers.set("accept", "application/json"))),
        a.response = await t(a.request, a.options).catch(async h=>(a.error = h,
        a.options.onRequestError && await a.options.onRequestError(a),
        r(a)));
        const u = (a.options.parseResponse ? "json" : a.options.responseType) || rf(a.response.headers.get("content-type") || "");
        if (u === "json") {
            const h = await a.response.text()
              , f = a.options.parseResponse || Ru;
            a.response._data = f(h)
        } else
            u === "stream" ? a.response._data = a.response.body : a.response._data = await a.response[u]();
        return a.options.onResponse && await a.options.onResponse(a),
        a.response.status >= 400 && a.response.status < 600 ? (a.options.onResponseError && await a.options.onResponseError(a),
        r(a)) : a.response
    }
      , o = function(l, c) {
        return s(l, c).then(a=>a._data)
    };
    return o.raw = s,
    o.native = t,
    o.create = (i={})=>ml({
        ...e,
        defaults: {
            ...e.defaults,
            ...i
        }
    }),
    o
}
const yl = function() {
    if (typeof globalThis < "u")
        return globalThis;
    if (typeof self < "u")
        return self;
    if (typeof window < "u")
        return window;
    if (typeof global < "u")
        return global;
    throw new Error("unable to locate global object")
}()
  , of = yl.fetch || (()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!")))
  , lf = yl.Headers
  , cf = ml({
    fetch: of,
    Headers: lf
})
  , af = cf
  , uf = ()=>{
    var e;
    return ((e = window == null ? void 0 : window.__NUXT__) == null ? void 0 : e.config) || {}
}
  , Yn = uf().app
  , ff = ()=>Yn.baseURL
  , df = ()=>Yn.buildAssetsDir
  , hf = (...e)=>$s(_l(), df(), ...e)
  , _l = (...e)=>{
    const t = Yn.cdnURL || Yn.baseURL;
    return e.length ? $s(t, ...e) : t
}
;
globalThis.__buildAssetsURL = hf,
globalThis.__publicAssetsURL = _l;
function es(e, t={}, n) {
    for (const r in e) {
        const s = e[r]
          , o = n ? `${n}:${r}` : r;
        typeof s == "object" && s !== null ? es(s, t, o) : typeof s == "function" && (t[o] = s)
    }
    return t
}
function pf(e, t) {
    return e.reduce((n,r)=>n.then(()=>r.apply(void 0, t)), Promise.resolve())
}
function gf(e, t) {
    return Promise.all(e.map(n=>n.apply(void 0, t)))
}
function xr(e, t) {
    for (const n of e)
        n(t)
}
class mf {
    constructor() {
        this._hooks = {},
        this._before = void 0,
        this._after = void 0,
        this._deprecatedMessages = void 0,
        this._deprecatedHooks = {},
        this.hook = this.hook.bind(this),
        this.callHook = this.callHook.bind(this),
        this.callHookWith = this.callHookWith.bind(this)
    }
    hook(t, n, r={}) {
        if (!t || typeof n != "function")
            return ()=>{}
            ;
        const s = t;
        let o;
        for (; this._deprecatedHooks[t]; )
            o = this._deprecatedHooks[t],
            t = o.to;
        if (o && !r.allowDeprecated) {
            let i = o.message;
            i || (i = `${s} hook has been deprecated` + (o.to ? `, please use ${o.to}` : "")),
            this._deprecatedMessages || (this._deprecatedMessages = new Set),
            this._deprecatedMessages.has(i) || (console.warn(i),
            this._deprecatedMessages.add(i))
        }
        return this._hooks[t] = this._hooks[t] || [],
        this._hooks[t].push(n),
        ()=>{
            n && (this.removeHook(t, n),
            n = void 0)
        }
    }
    hookOnce(t, n) {
        let r, s = (...o)=>(typeof r == "function" && r(),
        r = void 0,
        s = void 0,
        n(...o));
        return r = this.hook(t, s),
        r
    }
    removeHook(t, n) {
        if (this._hooks[t]) {
            const r = this._hooks[t].indexOf(n);
            r !== -1 && this._hooks[t].splice(r, 1),
            this._hooks[t].length === 0 && delete this._hooks[t]
        }
    }
    deprecateHook(t, n) {
        this._deprecatedHooks[t] = typeof n == "string" ? {
            to: n
        } : n;
        const r = this._hooks[t] || [];
        this._hooks[t] = void 0;
        for (const s of r)
            this.hook(t, s)
    }
    deprecateHooks(t) {
        Object.assign(this._deprecatedHooks, t);
        for (const n in t)
            this.deprecateHook(n, t[n])
    }
    addHooks(t) {
        const n = es(t)
          , r = Object.keys(n).map(s=>this.hook(s, n[s]));
        return ()=>{
            for (const s of r.splice(0, r.length))
                s()
        }
    }
    removeHooks(t) {
        const n = es(t);
        for (const r in n)
            this.removeHook(r, n[r])
    }
    callHook(t, ...n) {
        return this.callHookWith(pf, t, ...n)
    }
    callHookParallel(t, ...n) {
        return this.callHookWith(gf, t, ...n)
    }
    callHookWith(t, n, ...r) {
        const s = this._before || this._after ? {
            name: n,
            args: r,
            context: {}
        } : void 0;
        this._before && xr(this._before, s);
        const o = t(this._hooks[n] || [], r);
        return o instanceof Promise ? o.finally(()=>{
            this._after && s && xr(this._after, s)
        }
        ) : (this._after && s && xr(this._after, s),
        o)
    }
    beforeEach(t) {
        return this._before = this._before || [],
        this._before.push(t),
        ()=>{
            const n = this._before.indexOf(t);
            n !== -1 && this._before.splice(n, 1)
        }
    }
    afterEach(t) {
        return this._after = this._after || [],
        this._after.push(t),
        ()=>{
            const n = this._after.indexOf(t);
            n !== -1 && this._after.splice(n, 1)
        }
    }
}
function bl() {
    return new mf
}
function yf() {
    let e, t = !1;
    const n = r=>{
        if (e && e !== r)
            throw new Error("Context conflict")
    }
    ;
    return {
        use: ()=>{
            if (e === void 0)
                throw new Error("Context is not available");
            return e
        }
        ,
        tryUse: ()=>e,
        set: (r,s)=>{
            s || n(r),
            e = r,
            t = !0
        }
        ,
        unset: ()=>{
            e = void 0,
            t = !1
        }
        ,
        call: (r,s)=>{
            n(r),
            e = r;
            try {
                return s()
            } finally {
                t || (e = void 0)
            }
        }
        ,
        async callAsync(r, s) {
            e = r;
            const o = ()=>{
                e = r
            }
              , i = ()=>e === r ? o : void 0;
            ts.add(i);
            try {
                const l = s();
                return t || (e = void 0),
                await l
            } finally {
                ts.delete(i)
            }
        }
    }
}
function _f() {
    const e = {};
    return {
        get(t) {
            return e[t] || (e[t] = yf()),
            e[t],
            e[t]
        }
    }
}
const Xn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : typeof window < "u" ? window : {}
  , To = "__unctx__"
  , bf = Xn[To] || (Xn[To] = _f())
  , vf = e=>bf.get(e)
  , ko = "__unctx_async_handlers__"
  , ts = Xn[ko] || (Xn[ko] = new Set);
function vl(e) {
    const t = [];
    for (const s of ts) {
        const o = s();
        o && t.push(o)
    }
    const n = ()=>{
        for (const s of t)
            s()
    }
    ;
    let r = e();
    return r && typeof r == "object" && "catch"in r && (r = r.catch(s=>{
        throw n(),
        s
    }
    )),
    [r, n]
}
const El = vf("nuxt-app")
  , Ef = "__nuxt_plugin";
function wf(e) {
    let t = 0;
    const n = {
        provide: void 0,
        globalName: "nuxt",
        payload: Ve({
            data: {},
            state: {},
            _errors: {},
            ...window.__NUXT__
        }),
        static: {
            data: {}
        },
        isHydrating: !0,
        deferHydration() {
            if (!n.isHydrating)
                return ()=>{}
                ;
            t++;
            let o = !1;
            return ()=>{
                if (!o && (o = !0,
                t--,
                t === 0))
                    return n.isHydrating = !1,
                    n.callHook("app:suspense:resolve")
            }
        },
        _asyncDataPromises: {},
        _asyncData: {},
        ...e
    };
    n.hooks = bl(),
    n.hook = n.hooks.hook,
    n.callHook = n.hooks.callHook,
    n.provide = (o,i)=>{
        const l = "$" + o;
        Fn(n, l, i),
        Fn(n.vueApp.config.globalProperties, l, i)
    }
    ,
    Fn(n.vueApp, "$nuxt", n),
    Fn(n.vueApp.config.globalProperties, "$nuxt", n);
    const r = Ve(n.payload.config)
      , s = new Proxy(r,{
        get(o, i) {
            var l;
            return i === "public" ? o.public : (l = o[i]) != null ? l : o.public[i]
        },
        set(o, i, l) {
            return i === "public" || i === "app" ? !1 : (o[i] = l,
            o.public[i] = l,
            !0)
        }
    });
    return n.provide("config", s),
    n
}
async function Cf(e, t) {
    if (typeof t != "function")
        return;
    const {provide: n} = await pt(e, t, [e]) || {};
    if (n && typeof n == "object")
        for (const r in n)
            e.provide(r, n[r])
}
async function Rf(e, t) {
    for (const n of t)
        await Cf(e, n)
}
function Tf(e) {
    return e.map(n=>typeof n != "function" ? null : n.length > 1 ? r=>n(r, r.provide) : n).filter(Boolean)
}
function gr(e) {
    return e[Ef] = !0,
    e
}
function pt(e, t, n) {
    const r = ()=>n ? t(...n) : t();
    return El.set(e),
    r()
}
function Re() {
    const e = El.tryUse();
    if (!e) {
        const t = sn();
        if (!t)
            throw new Error("nuxt instance unavailable");
        return t.appContext.app.$nuxt
    }
    return e
}
function kf() {
    return Re().$config
}
function Fn(e, t, n) {
    Object.defineProperty(e, t, {
        get: ()=>n
    })
}
class ns extends Error {
    constructor() {
        super(...arguments),
        this.statusCode = 500,
        this.fatal = !1,
        this.unhandled = !1,
        this.statusMessage = void 0
    }
    toJSON() {
        const t = {
            message: this.message,
            statusCode: this.statusCode
        };
        return this.statusMessage && (t.statusMessage = this.statusMessage),
        this.data !== void 0 && (t.data = this.data),
        t
    }
}
ns.__h3_error__ = !0;
function rs(e) {
    var n;
    if (typeof e == "string")
        return new ns(e);
    if (Pf(e))
        return e;
    const t = new ns((n = e.message) != null ? n : e.statusMessage,e.cause ? {
        cause: e.cause
    } : void 0);
    if ("stack"in e)
        try {
            Object.defineProperty(t, "stack", {
                get() {
                    return e.stack
                }
            })
        } catch {
            try {
                t.stack = e.stack
            } catch {}
        }
    return e.data && (t.data = e.data),
    e.statusCode ? t.statusCode = e.statusCode : e.status && (t.statusCode = e.status),
    e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText),
    e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
}
function Pf(e) {
    var t;
    return ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.__h3_error__) === !0
}
const mr = ()=>Pi(Re().payload, "error")
  , fn = e=>{
    const t = wl(e);
    try {
        Re().callHook("app:error", t);
        const r = mr();
        r.value = r.value || t
    } catch {
        throw t
    }
    return t
}
  , Af = async(e={})=>{
    const t = Re()
      , n = mr();
    t.callHook("app:error:cleared", e),
    e.redirect && await t.$router.replace(e.redirect),
    n.value = null
}
  , Of = e=>!!(e && typeof e == "object" && "__nuxt_error"in e)
  , wl = e=>{
    const t = rs(e);
    return t.__nuxt_error = !0,
    t
}
;
function Cl(...e) {
    const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
    typeof e[0] != "string" && e.unshift(t);
    const [n,r] = e;
    if (!n || typeof n != "string")
        throw new TypeError("[nuxt] [useState] key must be a string: " + n);
    if (r !== void 0 && typeof r != "function")
        throw new Error("[nuxt] [useState] init must be a function: " + r);
    const s = "$s" + n
      , o = Re()
      , i = Pi(o.payload.state, s);
    if (i.value === void 0 && r) {
        const l = r();
        if (ge(l))
            return o.payload.state[s] = l,
            l;
        i.value = l
    }
    return i
}
const yr = ()=>{
    var e;
    return (e = Re()) == null ? void 0 : e.$router
}
  , Rl = ()=>sn() ? Me("_route", Re()._route) : Re()._route
  , xf = e=>e
  , Sf = ()=>{
    try {
        if (Re()._processingMiddleware)
            return !0
    } catch {
        return !0
    }
    return !1
}
  , $f = (e,t)=>{
    e || (e = "/");
    const n = typeof e == "string" ? e : e.path || "/"
      , r = pr(n, !0);
    if (r && !(t != null && t.external))
        throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
    if (r && Hs(n).protocol === "script:")
        throw new Error("Cannot navigate to an URL with script protocol.");
    if (!r && Sf())
        return e;
    const s = yr();
    return r ? (t != null && t.replace ? location.replace(n) : location.href = n,
    Promise.resolve()) : t != null && t.replace ? s.replace(e) : s.push(e)
}
;
function Hf(e, t) {
    return Re()._useHead(e, t)
}
async function Tl(e, t=yr()) {
    if (t._routePreloaded || (t._routePreloaded = new Set),
    t._routePreloaded.has(e))
        return;
    t._routePreloaded.add(e);
    const n = t._preloadPromises = t._preloadPromises || [];
    if (n.length > 4)
        return Promise.all(n).then(()=>Tl(e, t));
    const r = t.resolve(e).matched.map(s=>{
        var o;
        return (o = s.components) == null ? void 0 : o.default
    }
    ).filter(s=>typeof s == "function");
    for (const s of r) {
        const o = Promise.resolve(s()).catch(()=>{}
        ).finally(()=>n.splice(n.indexOf(o)));
        n.push(o)
    }
    await Promise.all(n)
}
const Mf = "modulepreload"
  , If = function(e, t) {
    return e.startsWith(".") ? new URL(e,t).href : e
}
  , Po = {}
  , Nt = function(t, n, r) {
    if (!n || n.length === 0)
        return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(n.map(o=>{
        if (o = If(o, r),
        o in Po)
            return;
        Po[o] = !0;
        const i = o.endsWith(".css")
          , l = i ? '[rel="stylesheet"]' : "";
        if (!!r)
            for (let u = s.length - 1; u >= 0; u--) {
                const h = s[u];
                if (h.href === o && (!i || h.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector(`link[href="${o}"]${l}`))
            return;
        const a = document.createElement("link");
        if (a.rel = i ? "stylesheet" : Mf,
        i || (a.as = "script",
        a.crossOrigin = ""),
        a.href = o,
        document.head.appendChild(a),
        i)
            return new Promise((u,h)=>{
                a.addEventListener("load", u),
                a.addEventListener("error", ()=>h(new Error(`Unable to preload CSS for ${o}`)))
            }
            )
    }
    )).then(()=>t())
}
  , Lf = (...e)=>e.find(t=>t !== void 0)
  , Nf = "noopener noreferrer"
  , Ff = globalThis.requestIdleCallback || (e=>{
    const t = Date.now()
      , n = {
        didTimeout: !1,
        timeRemaining: ()=>Math.max(0, 50 - (Date.now() - t))
    };
    return setTimeout(()=>{
        e(n)
    }
    , 1)
}
)
  , jf = globalThis.cancelIdleCallback || (e=>{
    clearTimeout(e)
}
);
function Bf(e) {
    const t = e.componentName || "NuxtLink";
    return it({
        name: t,
        props: {
            to: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            href: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            target: {
                type: String,
                default: void 0,
                required: !1
            },
            rel: {
                type: String,
                default: void 0,
                required: !1
            },
            noRel: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            prefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            noPrefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            activeClass: {
                type: String,
                default: void 0,
                required: !1
            },
            exactActiveClass: {
                type: String,
                default: void 0,
                required: !1
            },
            prefetchedClass: {
                type: String,
                default: void 0,
                required: !1
            },
            replace: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            ariaCurrentValue: {
                type: String,
                default: void 0,
                required: !1
            },
            external: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            custom: {
                type: Boolean,
                default: void 0,
                required: !1
            }
        },
        setup(n, {slots: r}) {
            const s = yr()
              , o = me(()=>n.to || n.href || "")
              , i = me(()=>n.external || n.target && n.target !== "_self" ? !0 : typeof o.value == "object" ? !1 : o.value === "" || pr(o.value, !0))
              , l = At(!1)
              , c = At(null);
            if (n.prefetch !== !1 && n.noPrefetch !== !0 && typeof o.value == "string" && n.target !== "_blank" && !Uf()) {
                const u = Re()
                  , h = Df();
                let f, g = null;
                fr(()=>{
                    f = Ff(()=>{
                        var y;
                        (y = c == null ? void 0 : c.value) != null && y.tagName && (g = h.observe(c.value, async()=>{
                            g == null || g(),
                            g = null,
                            await Promise.all([u.hooks.callHook("link:prefetch", o.value).catch(()=>{}
                            ), !i.value && Tl(o.value, s).catch(()=>{}
                            )]),
                            l.value = !0
                        }
                        ))
                    }
                    )
                }
                ),
                An(()=>{
                    f && jf(f),
                    g == null || g(),
                    g = null
                }
                )
            }
            return ()=>{
                var g, y, R;
                if (!i.value)
                    return Ie(pa("RouterLink"), {
                        ref: x=>{
                            c.value = x == null ? void 0 : x.$el
                        }
                        ,
                        to: o.value,
                        ...l.value && !n.custom ? {
                            class: n.prefetchedClass || e.prefetchedClass
                        } : {},
                        activeClass: n.activeClass || e.activeClass,
                        exactActiveClass: n.exactActiveClass || e.exactActiveClass,
                        replace: n.replace,
                        ariaCurrentValue: n.ariaCurrentValue,
                        custom: n.custom
                    }, r.default);
                const a = typeof o.value == "object" ? (y = (g = s.resolve(o.value)) == null ? void 0 : g.href) != null ? y : null : o.value || null
                  , u = n.target || null
                  , h = n.noRel ? null : Lf(n.rel, e.externalRelAttribute, a ? Nf : "") || null
                  , f = ()=>$f(a, {
                    replace: n.replace
                });
                return n.custom ? r.default ? r.default({
                    href: a,
                    navigate: f,
                    route: s.resolve(a),
                    rel: h,
                    target: u,
                    isExternal: i.value,
                    isActive: !1,
                    isExactActive: !1
                }) : null : Ie("a", {
                    ref: c,
                    href: a,
                    rel: h,
                    target: u
                }, (R = r.default) == null ? void 0 : R.call(r))
            }
        }
    })
}
const Pp = Bf({
    componentName: "NuxtLink"
});
function Df() {
    const e = Re();
    if (e._observer)
        return e._observer;
    let t = null;
    const n = new Map
      , r = (o,i)=>(t || (t = new IntersectionObserver(l=>{
        for (const c of l) {
            const a = n.get(c.target);
            (c.isIntersecting || c.intersectionRatio > 0) && a && a()
        }
    }
    )),
    n.set(o, i),
    t.observe(o),
    ()=>{
        n.delete(o),
        t.unobserve(o),
        n.size === 0 && (t.disconnect(),
        t = null)
    }
    );
    return e._observer = {
        observe: r
    }
}
function Uf() {
    const e = navigator.connection;
    return !!(e && (e.saveData || /2g/.test(e.effectiveType)))
}
function Sr(e) {
    return e !== null && typeof e == "object"
}
function ss(e, t, n=".", r) {
    if (!Sr(t))
        return ss(e, {}, n, r);
    const s = Object.assign({}, t);
    for (const o in e) {
        if (o === "__proto__" || o === "constructor")
            continue;
        const i = e[o];
        i != null && (r && r(s, o, i, n) || (Array.isArray(i) && Array.isArray(s[o]) ? s[o] = [...i, ...s[o]] : Sr(i) && Sr(s[o]) ? s[o] = ss(i, s[o], (n ? `${n}.` : "") + o.toString(), r) : s[o] = i))
    }
    return s
}
function kl(e) {
    return (...t)=>t.reduce((n,r)=>ss(n, r, "", e), {})
}
const Kf = kl()
  , qf = kl((e,t,n,r)=>{
    if (typeof e[t] < "u" && typeof n == "function")
        return e[t] = n(e[t]),
        !0
}
)
  , Wf = {};
qf(Wf);
const $r = {}
  , Vf = gr(e=>{
    for (const t in $r)
        e.vueApp.component(t, $r[t]),
        e.vueApp.component("Lazy" + t, $r[t])
}
)
  , zf = ["script", "style", "noscript"]
  , Qf = ["base", "meta", "link", "style", "script", "noscript"]
  , Jf = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function Yf(e, t) {
    const {props: n, tag: r} = e;
    if (Jf.includes(r))
        return r;
    if (r === "link" && n.rel === "canonical")
        return "canonical";
    if (n.charset)
        return "charset";
    const s = ["id"];
    r === "meta" && s.push("name", "property", "http-equiv");
    for (const o of s)
        if (typeof n[o] < "u") {
            const i = String(n[o]);
            return t && !t(i) ? !1 : `${r}:${o}:${i}`
        }
    return !1
}
const jn = (e,t)=>{
    const {tag: n, $el: r} = e;
    !r || (Object.entries(n.props).forEach(([s,o])=>{
        o = String(o);
        const i = `attr:${s}`;
        if (s === "class") {
            if (!o)
                return;
            for (const l of o.split(" ")) {
                const c = `${i}:${l}`;
                t && t(e, c, ()=>r.classList.remove(l)),
                r.classList.contains(l) || r.classList.add(l)
            }
            return
        }
        t && !s.startsWith("data-h-") && t(e, i, ()=>r.removeAttribute(s)),
        r.getAttribute(s) !== o && r.setAttribute(s, o)
    }
    ),
    zf.includes(n.tag) && r.innerHTML !== (n.children || "") && (r.innerHTML = n.children || ""))
}
;
function Ms(e) {
    let t = 9;
    for (let n = 0; n < e.length; )
        t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
    return ((t ^ t >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase()
}
async function Pl(e, t={}) {
    var u, h;
    const n = {
        shouldRender: !0
    };
    if (await e.hooks.callHook("dom:beforeRender", n),
    !n.shouldRender)
        return;
    const r = t.document || window.document
      , s = e._popSideEffectQueue();
    e.headEntries().map(f=>f._sde).forEach(f=>{
        Object.entries(f).forEach(([g,y])=>{
            s[g] = y
        }
        )
    }
    );
    const o = async f=>{
        const g = e.headEntries().find(R=>R._i === f._e)
          , y = {
            renderId: f._d || Ms(JSON.stringify({
                ...f,
                _e: void 0,
                _p: void 0
            })),
            $el: null,
            shouldRender: !0,
            tag: f,
            entry: g,
            staleSideEffects: s
        };
        return await e.hooks.callHook("dom:beforeRenderTag", y),
        y
    }
      , i = []
      , l = {
        body: [],
        head: []
    }
      , c = (f,g,y)=>{
        g = `${f.renderId}:${g}`,
        f.entry && (f.entry._sde[g] = y),
        delete s[g]
    }
      , a = f=>{
        e._elMap[f.renderId] = f.$el,
        i.push(f),
        c(f, "el", ()=>{
            var g;
            (g = f.$el) == null || g.remove(),
            delete e._elMap[f.renderId]
        }
        )
    }
    ;
    for (const f of await e.resolveTags()) {
        const g = await o(f);
        if (!g.shouldRender)
            continue;
        const {tag: y} = g;
        if (y.tag === "title") {
            r.title = y.children || "",
            i.push(g);
            continue
        }
        if (y.tag === "htmlAttrs" || y.tag === "bodyAttrs") {
            g.$el = r[y.tag === "htmlAttrs" ? "documentElement" : "body"],
            jn(g, c),
            i.push(g);
            continue
        }
        if (g.$el = e._elMap[g.renderId],
        !g.$el && y._hash && (g.$el = r.querySelector(`${(u = y.tagPosition) != null && u.startsWith("body") ? "body" : "head"} > ${y.tag}[data-h-${y._hash}]`)),
        g.$el) {
            g.tag._d && jn(g),
            a(g);
            continue
        }
        g.$el = r.createElement(y.tag),
        jn(g),
        l[(h = y.tagPosition) != null && h.startsWith("body") ? "body" : "head"].push(g)
    }
    Object.entries(l).forEach(([f,g])=>{
        if (!!g.length) {
            for (const y of [...r[f].children].reverse()) {
                const R = y.tagName.toLowerCase();
                if (!Qf.includes(R))
                    continue;
                const x = Yf({
                    tag: R,
                    props: y.getAttributeNames().reduce((p,b)=>({
                        ...p,
                        [b]: y.getAttribute(b)
                    }), {})
                })
                  , _ = g.findIndex(p=>p && (p.tag._d === x || y.isEqualNode(p.$el)));
                if (_ !== -1) {
                    const p = g[_];
                    p.$el = y,
                    jn(p),
                    a(p),
                    delete g[_]
                }
            }
            g.forEach(y=>{
                if (!!y.$el) {
                    switch (y.tag.tagPosition) {
                    case "bodyClose":
                        r.body.appendChild(y.$el);
                        break;
                    case "bodyOpen":
                        r.body.insertBefore(y.$el, r.body.firstChild);
                        break;
                    case "head":
                    default:
                        r.head.appendChild(y.$el);
                        break
                    }
                    a(y)
                }
            }
            )
        }
    }
    );
    for (const f of i)
        await e.hooks.callHook("dom:renderTag", f);
    Object.values(s).forEach(f=>f())
}
let Un = null;
async function Xf(e, t={}) {
    function n() {
        return Un = null,
        Pl(e, t)
    }
    const r = t.delayFn || (s=>setTimeout(s, 10));
    return Un = Un || new Promise(s=>r(()=>s(n())))
}
const Zf = {
    __proto__: null,
    debouncedRenderDOMHead: Xf,
    get domUpdatePromise() {
        return Un
    },
    hashCode: Ms,
    renderDOMHead: Pl
}
  , Gf = ["title", "titleTemplate", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"]
  , ed = ["tagPosition", "tagPriority", "tagDuplicateStrategy"];
async function td(e, t) {
    const n = {
        tag: e,
        props: {}
    };
    return e === "title" || e === "titleTemplate" ? (n.children = t instanceof Promise ? await t : t,
    n) : (n.props = await nd({
        ...t
    }),
    ["children", "innerHtml", "innerHTML"].forEach(r=>{
        typeof n.props[r] < "u" && (n.children = n.props[r],
        typeof n.children == "object" && (n.children = JSON.stringify(n.children)),
        delete n.props[r])
    }
    ),
    Object.keys(n.props).filter(r=>ed.includes(r)).forEach(r=>{
        n[r] = n.props[r],
        delete n.props[r]
    }
    ),
    typeof n.props.class == "object" && !Array.isArray(n.props.class) && (n.props.class = Object.keys(n.props.class).filter(r=>n.props.class[r])),
    Array.isArray(n.props.class) && (n.props.class = n.props.class.join(" ")),
    n.props.content && Array.isArray(n.props.content) ? n.props.content.map((r,s)=>{
        const o = {
            ...n,
            props: {
                ...n.props
            }
        };
        return o.props.content = r,
        o.key = `${n.props.name || n.props.property}:${s}`,
        o
    }
    ) : n)
}
async function nd(e) {
    for (const t of Object.keys(e))
        e[t]instanceof Promise && (e[t] = await e[t]),
        String(e[t]) === "true" ? e[t] = "" : String(e[t]) === "false" && delete e[t];
    return e
}
const Ao = e=>{
    if (typeof e.tagPriority == "number")
        return e.tagPriority;
    switch (e.tagPriority) {
    case "critical":
        return 2;
    case "high":
        return 9;
    case "low":
        return 12
    }
    switch (e.tag) {
    case "base":
        return -1;
    case "title":
        return 1;
    case "meta":
        return e.props.charset ? -2 : e.props["http-equiv"] === "content-security-policy" ? 0 : 10;
    default:
        return 10
    }
}
  , rd = (e,t)=>Ao(e) - Ao(t)
  , sd = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function od(e, t) {
    const {props: n, tag: r} = e;
    if (sd.includes(r))
        return r;
    if (r === "link" && n.rel === "canonical")
        return "canonical";
    if (n.charset)
        return "charset";
    const s = ["id"];
    r === "meta" && s.push("name", "property", "http-equiv");
    for (const o of s)
        if (typeof n[o] < "u") {
            const i = String(n[o]);
            return t && !t(i) ? !1 : `${r}:${o}:${i}`
        }
    return !1
}
const Oo = (e,t)=>e == null ? t || null : typeof e == "function" ? e(t) : e.replace("%s", t != null ? t : "");
function id(e) {
    let t = e.findIndex(r=>r.tag === "titleTemplate");
    const n = e.findIndex(r=>r.tag === "title");
    if (n !== -1 && t !== -1) {
        const r = Oo(e[t].children, e[n].children);
        r !== null ? e[n].children = r || e[n].children : delete e[n]
    } else if (t !== -1) {
        const r = Oo(e[t].children);
        r !== null && (e[t].children = r,
        e[t].tag = "title",
        t = -1)
    }
    return t !== -1 && delete e[t],
    e.filter(Boolean)
}
const ld = e=>{
    e = e || {};
    const t = e.dedupeKeys || ["hid", "vmid", "key"];
    return {
        hooks: {
            "tag:normalise": function({tag: n}) {
                t.forEach(s=>{
                    n.props[s] && (n.key = n.props[s],
                    delete n.props[s])
                }
                );
                const r = n.key ? `${n.tag}:${n.key}` : od(n);
                r && (n._d = r)
            },
            "tags:resolve": function(n) {
                const r = {};
                n.tags.forEach(s=>{
                    let o = s._d || s._p;
                    const i = r[o];
                    if (i) {
                        let l = s == null ? void 0 : s.tagDuplicateStrategy;
                        if (!l && (s.tag === "htmlAttrs" || s.tag === "bodyAttrs") && (l = "merge"),
                        l === "merge") {
                            const a = i.props;
                            ["class", "style"].forEach(u=>{
                                s.props[u] && a[u] && (u === "style" && !a[u].endsWith(";") && (a[u] += ";"),
                                s.props[u] = `${a[u]} ${s.props[u]}`)
                            }
                            ),
                            r[o].props = {
                                ...a,
                                ...s.props
                            };
                            return
                        } else
                            s._e === i._e && (o = s._d = `${o}:${s._p}`);
                        const c = Object.keys(s.props).length;
                        if ((c === 0 || c === 1 && typeof s.props["data-h-key"] < "u") && !s.children) {
                            delete r[o];
                            return
                        }
                    }
                    r[o] = s
                }
                ),
                n.tags = Object.values(r)
            }
        }
    }
}
  , cd = ()=>({
    hooks: {
        "tags:resolve": e=>{
            const t = n=>{
                var r;
                return (r = e.tags.find(s=>s._d === n)) == null ? void 0 : r._p
            }
            ;
            for (const n of e.tags) {
                if (!n.tagPriority || typeof n.tagPriority == "number")
                    continue;
                const r = [{
                    prefix: "before:",
                    offset: -1
                }, {
                    prefix: "after:",
                    offset: 1
                }];
                for (const {prefix: s, offset: o} of r)
                    if (n.tagPriority.startsWith(s)) {
                        const i = n.tagPriority.replace(s, "")
                          , l = t(i);
                        typeof l < "u" && (n._p = l + o)
                    }
            }
            e.tags.sort((n,r)=>n._p - r._p).sort(rd)
        }
    }
})
  , ad = ()=>({
    hooks: {
        "tags:resolve": e=>{
            e.tags = id(e.tags)
        }
    }
})
  , ud = ()=>({
    hooks: {
        "tag:normalise": function({tag: e}) {
            typeof e.props.body < "u" && (e.tagPosition = "bodyClose",
            delete e.props.body)
        }
    }
})
  , fd = typeof window < "u"
  , dd = ()=>({
    hooks: {
        "tag:normalise": e=>{
            var s, o;
            const {tag: t, entry: n} = e
              , r = typeof t.props._dynamic < "u";
            !Al.includes(t.tag) || !t.key || (t._hash = Ms(JSON.stringify({
                tag: t.tag,
                key: t.key
            })),
            !(fd || ((o = (s = xl()) == null ? void 0 : s.resolvedOptions) == null ? void 0 : o.document)) && (n._m === "server" || r) && (t.props[`data-h-${t._hash}`] = ""))
        }
        ,
        "tags:resolve": e=>{
            e.tags = e.tags.map(t=>(delete t.props._dynamic,
            t))
        }
    }
})
  , hd = e=>({
    hooks: {
        "entries:updated": function(t) {
            if (typeof (e == null ? void 0 : e.document) > "u" && typeof window > "u")
                return;
            let n = e == null ? void 0 : e.delayFn;
            !n && typeof requestAnimationFrame < "u" && (n = requestAnimationFrame),
            Promise.resolve().then(function() {
                return Zf
            }).then(({debouncedRenderDOMHead: r})=>{
                r(t, {
                    document: (e == null ? void 0 : e.document) || window.document,
                    delayFn: n
                })
            }
            )
        }
    }
})
  , pd = ()=>{
    const e = (t,n)=>{
        const r = {}
          , s = {};
        Object.entries(n.props).forEach(([i,l])=>{
            i.startsWith("on") && typeof l == "function" ? s[i] = l : r[i] = l
        }
        );
        let o;
        return t === "dom" && n.tag === "script" && typeof r.src == "string" && typeof s.onload < "u" && (o = r.src,
        delete r.src),
        {
            props: r,
            eventHandlers: s,
            delayedSrc: o
        }
    }
    ;
    return {
        hooks: {
            "ssr:render": function(t) {
                t.tags = t.tags.map(n=>(n.props = e("ssr", n).props,
                n))
            },
            "dom:beforeRenderTag": function(t) {
                const {props: n, eventHandlers: r, delayedSrc: s} = e("dom", t.tag);
                !Object.keys(r).length || (t.tag.props = n,
                t.tag._eventHandlers = r,
                t.tag._delayedSrc = s)
            },
            "dom:renderTag": function(t) {
                const n = t.$el;
                if (!t.tag._eventHandlers || !n)
                    return;
                const r = t.tag.tag === "bodyAttrs" && typeof window < "u" ? window : n;
                Object.entries(t.tag._eventHandlers).forEach(([s,o])=>{
                    const i = `${t.tag._d || t.tag._p}:${s}`
                      , l = s.slice(2).toLowerCase()
                      , c = `data-h-${l}`;
                    if (delete t.staleSideEffects[i],
                    n.hasAttribute(c))
                        return;
                    const a = o;
                    n.setAttribute(c, ""),
                    r.addEventListener(l, a),
                    t.entry && (t.entry._sde[i] = ()=>{
                        r.removeEventListener(l, a),
                        n.removeAttribute(c)
                    }
                    )
                }
                ),
                t.tag._delayedSrc && n.setAttribute("src", t.tag._delayedSrc)
            }
        }
    }
}
;
function gd(e) {
    return Array.isArray(e) ? e : [e]
}
const Al = ["base", "meta", "link", "style", "script", "noscript"];
let Ol;
const md = e=>Ol = e
  , xl = ()=>Ol
  , yd = 10;
async function _d(e) {
    const t = [];
    return Object.entries(e.resolvedInput || e.input).filter(([n,r])=>typeof r < "u" && Gf.includes(n)).forEach(([n,r])=>{
        const s = gd(r);
        t.push(...s.map(o=>td(n, o)).flat())
    }
    ),
    (await Promise.all(t)).flat().map((n,r)=>(n._e = e._i,
    n._p = (e._i << yd) + r,
    n))
}
const bd = ()=>[ld(), cd(), ad(), dd(), pd(), ud()]
  , vd = (e={})=>[hd({
    document: e == null ? void 0 : e.document,
    delayFn: e == null ? void 0 : e.domDelayFn
})];
function Ed(e={}) {
    const t = wd({
        ...e,
        plugins: [...vd(e), ...(e == null ? void 0 : e.plugins) || []]
    });
    return md(t),
    t
}
function wd(e={}) {
    let t = []
      , n = {}
      , r = 0;
    const s = bl();
    e != null && e.hooks && s.addHooks(e.hooks),
    e.plugins = [...bd(), ...(e == null ? void 0 : e.plugins) || []],
    e.plugins.forEach(l=>l.hooks && s.addHooks(l.hooks));
    const o = ()=>s.callHook("entries:updated", i)
      , i = {
        resolvedOptions: e,
        headEntries() {
            return t
        },
        get hooks() {
            return s
        },
        use(l) {
            l.hooks && s.addHooks(l.hooks)
        },
        push(l, c) {
            const a = {
                _i: r++,
                input: l,
                _sde: {}
            };
            return c != null && c.mode && (a._m = c == null ? void 0 : c.mode),
            t.push(a),
            o(),
            {
                dispose() {
                    t = t.filter(u=>u._i !== a._i ? !0 : (n = {
                        ...n,
                        ...u._sde || {}
                    },
                    u._sde = {},
                    o(),
                    !1))
                },
                patch(u) {
                    t = t.map(h=>(h._i === a._i && (a.input = h.input = u,
                    o()),
                    h))
                }
            }
        },
        async resolveTags() {
            const l = {
                tags: [],
                entries: [...t]
            };
            await s.callHook("entries:resolve", l);
            for (const c of l.entries)
                for (const a of await _d(c)) {
                    const u = {
                        tag: a,
                        entry: c
                    };
                    await s.callHook("tag:normalise", u),
                    l.tags.push(u.tag)
                }
            return await s.callHook("tags:resolve", l),
            l.tags
        },
        _elMap: {},
        _popSideEffectQueue() {
            const l = {
                ...n
            };
            return n = {},
            l
        }
    };
    return i.hooks.callHook("init", i),
    i
}
function Cd(e) {
    return typeof e == "function" ? e() : Ae(e)
}
function Zn(e, t="") {
    if (e instanceof Promise)
        return e;
    const n = Cd(e);
    if (!e || !n)
        return n;
    if (Array.isArray(n))
        return n.map(r=>Zn(r, t));
    if (typeof n == "object") {
        let r = !1;
        const s = Object.fromEntries(Object.entries(n).map(([o,i])=>o === "titleTemplate" || o.startsWith("on") ? [o, Ae(i)] : ((typeof i == "function" || ge(i)) && (r = !0),
        [o, Zn(i, o)])));
        return r && Al.includes(String(t)) && (s._dynamic = !0),
        s
    }
    return n
}
const Rd = Ss.startsWith("3")
  , Td = typeof window < "u"
  , Sl = "usehead";
function Is() {
    return sn() && Me(Sl) || xl()
}
function kd(e={}) {
    const t = Ed({
        ...e,
        domDelayFn: r=>setTimeout(()=>rn(()=>r()), 10),
        plugins: [Pd(), ...(e == null ? void 0 : e.plugins) || []]
    })
      , n = {
        install(r) {
            Rd && (r.config.globalProperties.$unhead = t,
            r.provide(Sl, t))
        }
    };
    return t.install = n.install,
    t
}
const Pd = ()=>({
    hooks: {
        "entries:resolve": function(e) {
            for (const t of e.entries)
                t.resolvedInput = Zn(t.input)
        }
    }
});
function Ad(e, t={}) {
    const n = Is()
      , r = At({});
    Gc(()=>{
        r.value = Zn(e)
    }
    );
    const s = n.push(r.value, t);
    return _t(r, i=>s.patch(i)),
    sn() && An(()=>{
        s.dispose()
    }
    ),
    s
}
function Od(e, t={}) {
    return Is().push(e, t)
}
function $l(e, t={}) {
    var r;
    const n = Is();
    if (n) {
        const s = Td || !!((r = n.resolvedOptions) != null && r.document);
        return t.mode === "server" && s || t.mode === "client" && !s ? void 0 : s ? Ad(e, t) : Od(e, t)
    }
}
const xd = ["script", "style", "noscript"]
  , Sd = ["base", "meta", "link", "style", "script", "noscript"]
  , $d = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function Hd(e, t) {
    const {props: n, tag: r} = e;
    if ($d.includes(r))
        return r;
    if (r === "link" && n.rel === "canonical")
        return "canonical";
    if (n.charset)
        return "charset";
    const s = ["id"];
    r === "meta" && s.push("name", "property", "http-equiv");
    for (const o of s)
        if (typeof n[o] < "u") {
            const i = String(n[o]);
            return t && !t(i) ? !1 : `${r}:${o}:${i}`
        }
    return !1
}
const Bn = (e,t)=>{
    const {tag: n, $el: r} = e;
    !r || (Object.entries(n.props).forEach(([s,o])=>{
        o = String(o);
        const i = `attr:${s}`;
        if (s === "class") {
            if (!o)
                return;
            for (const l of o.split(" ")) {
                const c = `${i}:${l}`;
                t && t(e, c, ()=>r.classList.remove(l)),
                r.classList.contains(l) || r.classList.add(l)
            }
            return
        }
        t && !s.startsWith("data-h-") && t(e, i, ()=>r.removeAttribute(s)),
        r.getAttribute(s) !== o && r.setAttribute(s, o)
    }
    ),
    xd.includes(n.tag) && r.innerHTML !== (n.children || "") && (r.innerHTML = n.children || ""))
}
;
function Md(e) {
    let t = 9;
    for (let n = 0; n < e.length; )
        t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
    return ((t ^ t >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase()
}
async function Hl(e, t={}) {
    var u, h;
    const n = {
        shouldRender: !0
    };
    if (await e.hooks.callHook("dom:beforeRender", n),
    !n.shouldRender)
        return;
    const r = t.document || window.document
      , s = e._popSideEffectQueue();
    e.headEntries().map(f=>f._sde).forEach(f=>{
        Object.entries(f).forEach(([g,y])=>{
            s[g] = y
        }
        )
    }
    );
    const o = async f=>{
        const g = e.headEntries().find(R=>R._i === f._e)
          , y = {
            renderId: f._d || Md(JSON.stringify({
                ...f,
                _e: void 0,
                _p: void 0
            })),
            $el: null,
            shouldRender: !0,
            tag: f,
            entry: g,
            staleSideEffects: s
        };
        return await e.hooks.callHook("dom:beforeRenderTag", y),
        y
    }
      , i = []
      , l = {
        body: [],
        head: []
    }
      , c = (f,g,y)=>{
        g = `${f.renderId}:${g}`,
        f.entry && (f.entry._sde[g] = y),
        delete s[g]
    }
      , a = f=>{
        e._elMap[f.renderId] = f.$el,
        i.push(f),
        c(f, "el", ()=>{
            var g;
            (g = f.$el) == null || g.remove(),
            delete e._elMap[f.renderId]
        }
        )
    }
    ;
    for (const f of await e.resolveTags()) {
        const g = await o(f);
        if (!g.shouldRender)
            continue;
        const {tag: y} = g;
        if (y.tag === "title") {
            r.title = y.children || "",
            i.push(g);
            continue
        }
        if (y.tag === "htmlAttrs" || y.tag === "bodyAttrs") {
            g.$el = r[y.tag === "htmlAttrs" ? "documentElement" : "body"],
            Bn(g, c),
            i.push(g);
            continue
        }
        if (g.$el = e._elMap[g.renderId],
        !g.$el && y._hash && (g.$el = r.querySelector(`${(u = y.tagPosition) != null && u.startsWith("body") ? "body" : "head"} > ${y.tag}[data-h-${y._hash}]`)),
        g.$el) {
            g.tag._d && Bn(g),
            a(g);
            continue
        }
        g.$el = r.createElement(y.tag),
        Bn(g),
        l[(h = y.tagPosition) != null && h.startsWith("body") ? "body" : "head"].push(g)
    }
    Object.entries(l).forEach(([f,g])=>{
        if (!!g.length) {
            for (const y of [...r[f].children].reverse()) {
                const R = y.tagName.toLowerCase();
                if (!Sd.includes(R))
                    continue;
                const x = Hd({
                    tag: R,
                    props: y.getAttributeNames().reduce((p,b)=>({
                        ...p,
                        [b]: y.getAttribute(b)
                    }), {})
                })
                  , _ = g.findIndex(p=>p && (p.tag._d === x || y.isEqualNode(p.$el)));
                if (_ !== -1) {
                    const p = g[_];
                    p.$el = y,
                    Bn(p),
                    a(p),
                    delete g[_]
                }
            }
            g.forEach(y=>{
                if (!!y.$el) {
                    switch (y.tag.tagPosition) {
                    case "bodyClose":
                        r.body.appendChild(y.$el);
                        break;
                    case "bodyOpen":
                        r.body.insertBefore(y.$el, r.body.firstChild);
                        break;
                    case "head":
                    default:
                        r.head.appendChild(y.$el);
                        break
                    }
                    a(y)
                }
            }
            )
        }
    }
    );
    for (const f of i)
        await e.hooks.callHook("dom:renderTag", f);
    Object.values(s).forEach(f=>f())
}
let Hr = null;
async function Id(e, t={}) {
    function n() {
        return Hr = null,
        Hl(e, t)
    }
    const r = t.delayFn || (s=>setTimeout(s, 10));
    return Hr = Hr || new Promise(s=>r(()=>s(n())))
}
function Ld(e) {
    const t = kd()
      , n = {
        unhead: t,
        install(r) {
            Ss.startsWith("3") && (r.config.globalProperties.$head = t,
            r.provide("usehead", t))
        },
        use(r) {
            t.use(r)
        },
        resolveTags() {
            return t.resolveTags()
        },
        headEntries() {
            return t.headEntries()
        },
        headTags() {
            return t.resolveTags()
        },
        push(r, s) {
            return t.push(r, s)
        },
        addEntry(r, s) {
            return t.push(r, s)
        },
        addHeadObjs(r, s) {
            return t.push(r, s)
        },
        addReactiveEntry(r, s) {
            const o = $l(r, s);
            return typeof o < "u" ? o.dispose : ()=>{}
        },
        removeHeadObjs() {},
        updateDOM(r, s) {
            s ? Hl(t, {
                document: r
            }) : Id(t, {
                delayFn: o=>setTimeout(()=>o(), 50),
                document: r
            })
        },
        internalHooks: t.hooks,
        hooks: {
            "before:dom": [],
            "resolved:tags": [],
            "resolved:entries": []
        }
    };
    return t.addHeadObjs = n.addHeadObjs,
    t.updateDOM = n.updateDOM,
    t.hooks.hook("dom:beforeRender", r=>{
        for (const s of n.hooks["before:dom"])
            s() === !1 && (r.shouldRender = !1)
    }
    ),
    e && n.addHeadObjs(e),
    n
}
const Nd = {
    meta: [{
        charset: "utf-8"
    }, {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
    }, {
        name: "description",
        content: "Aki - Discord \u0431\u043E\u0442 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041E\u043D \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043C\u043E\u0447\u044C \u0432\u0430\u043C \u0441 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0435\u0439, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0432\u0430\u0448 \u0441\u0435\u0440\u0432\u0435\u0440 \u0431\u043E\u043B\u0435\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u043C \u0438 \u0443\u0432\u043B\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C. "
    }, {
        name: "og:description",
        content: "Aki - Discord \u0431\u043E\u0442 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041E\u043D \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043C\u043E\u0447\u044C \u0432\u0430\u043C \u0441 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0435\u0439, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0432\u0430\u0448 \u0441\u0435\u0440\u0432\u0435\u0440 \u0431\u043E\u043B\u0435\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u043C \u0438 \u0443\u0432\u043B\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C. "
    }, {
        name: "keywords",
        content: "Discord, bot, \u0434\u0438\u0441\u043A\u043E\u0440\u0434, \u0431\u043E\u0442, Aki, \u0430\u043A\u0438, \u0434\u0438\u0441\u043A\u043E\u0440\u0434 \u0431\u043E\u0442, discord bot, aki bot, \u0431\u043E\u0442 \u0434\u043B\u044F \u0434\u0438\u0441\u043A\u043E\u0440\u0434\u0430, bot for discord, akibot, aki-discordbot, aki-bot, aki discord, best bost, \u0431\u043E\u0442 \u0434\u043B\u044F \u043B\u043E\u0433\u043E\u0432, \u043B\u043E\u0433\u0438, \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F, \u043A\u043E\u043C\u0431\u0430\u0439\u043D, \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, gsm, game server monitor"
    }, {
        name: "og:locale",
        content: "ru_RU"
    }, {
        name: "og:type",
        content: "website"
    }, {
        name: "og:title",
        content: "Aki - Discord \u0431\u043E\u0442"
    }, {
        name: "og:site_name"
    }, {
        name: "og:image",
        content: "/favicon.png"
    }],
    link: [{
        rel: "icon",
        type: "image/png",
        href: "/favicon.png"
    }],
    style: [],
    script: [],
    noscript: [],
    title: "Aki \xB7 Discord \u0431\u043E\u0442"
}
  , Fd = !1
  , os = !1
  , jd = !1
  , Bd = "__nuxt"
  , Dd = gr(e=>{
    const t = Ld();
    t.push(Nd),
    e.vueApp.use(t);
    {
        let n = !0;
        const r = ()=>{
            n = !1,
            t.internalHooks.callHook("entries:updated", t.unhead)
        }
        ;
        t.internalHooks.hook("dom:beforeRender", s=>{
            s.shouldRender = !n
        }
        ),
        e.hooks.hook("page:start", ()=>{
            n = !0
        }
        ),
        e.hooks.hook("page:finish", r),
        e.hooks.hook("app:mounted", r)
    }
    e._useHead = $l
}
);
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const It = typeof window < "u";
function Ud(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const re = Object.assign;
function Mr(e, t) {
    const n = {};
    for (const r in t) {
        const s = t[r];
        n[r] = ze(s) ? s.map(e) : e(s)
    }
    return n
}
const _n = ()=>{}
  , ze = Array.isArray
  , Kd = /\/$/
  , qd = e=>e.replace(Kd, "");
function Ir(e, t, n="/") {
    let r, s = {}, o = "", i = "";
    const l = t.indexOf("#");
    let c = t.indexOf("?");
    return l < c && l >= 0 && (c = -1),
    c > -1 && (r = t.slice(0, c),
    o = t.slice(c + 1, l > -1 ? l : t.length),
    s = e(o)),
    l > -1 && (r = r || t.slice(0, l),
    i = t.slice(l, t.length)),
    r = Qd(r != null ? r : t, n),
    {
        fullPath: r + (o && "?") + o + i,
        path: r,
        query: s,
        hash: i
    }
}
function Wd(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}
function xo(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}
function Vd(e, t, n) {
    const r = t.matched.length - 1
      , s = n.matched.length - 1;
    return r > -1 && r === s && Xt(t.matched[r], n.matched[s]) && Ml(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}
function Xt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function Ml(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (!zd(e[n], t[n]))
            return !1;
    return !0
}
function zd(e, t) {
    return ze(e) ? So(e, t) : ze(t) ? So(t, e) : e === t
}
function So(e, t) {
    return ze(t) ? e.length === t.length && e.every((n,r)=>n === t[r]) : e.length === 1 && e[0] === t
}
function Qd(e, t) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return t;
    const n = t.split("/")
      , r = e.split("/");
    let s = n.length - 1, o, i;
    for (o = 0; o < r.length; o++)
        if (i = r[o],
        i !== ".")
            if (i === "..")
                s > 1 && s--;
            else
                break;
    return n.slice(0, s).join("/") + "/" + r.slice(o - (o === r.length ? 1 : 0)).join("/")
}
var Tn;
(function(e) {
    e.pop = "pop",
    e.push = "push"
}
)(Tn || (Tn = {}));
var bn;
(function(e) {
    e.back = "back",
    e.forward = "forward",
    e.unknown = ""
}
)(bn || (bn = {}));
function Jd(e) {
    if (!e)
        if (It) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/",
            e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e),
    qd(e)
}
const Yd = /^[^#]+#/;
function Xd(e, t) {
    return e.replace(Yd, "#") + t
}
function Zd(e, t) {
    const n = document.documentElement.getBoundingClientRect()
      , r = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: r.left - n.left - (t.left || 0),
        top: r.top - n.top - (t.top || 0)
    }
}
const _r = ()=>({
    left: window.pageXOffset,
    top: window.pageYOffset
});
function Gd(e) {
    let t;
    if ("el"in e) {
        const n = e.el
          , r = typeof n == "string" && n.startsWith("#")
          , s = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!s)
            return;
        t = Zd(s, e)
    } else
        t = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}
function $o(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const is = new Map;
function eh(e, t) {
    is.set(e, t)
}
function th(e) {
    const t = is.get(e);
    return is.delete(e),
    t
}
let nh = ()=>location.protocol + "//" + location.host;
function Il(e, t) {
    const {pathname: n, search: r, hash: s} = t
      , o = e.indexOf("#");
    if (o > -1) {
        let l = s.includes(e.slice(o)) ? e.slice(o).length : 1
          , c = s.slice(l);
        return c[0] !== "/" && (c = "/" + c),
        xo(c, "")
    }
    return xo(n, e) + r + s
}
function rh(e, t, n, r) {
    let s = []
      , o = []
      , i = null;
    const l = ({state: f})=>{
        const g = Il(e, location)
          , y = n.value
          , R = t.value;
        let x = 0;
        if (f) {
            if (n.value = g,
            t.value = f,
            i && i === y) {
                i = null;
                return
            }
            x = R ? f.position - R.position : 0
        } else
            r(g);
        s.forEach(_=>{
            _(n.value, y, {
                delta: x,
                type: Tn.pop,
                direction: x ? x > 0 ? bn.forward : bn.back : bn.unknown
            })
        }
        )
    }
    ;
    function c() {
        i = n.value
    }
    function a(f) {
        s.push(f);
        const g = ()=>{
            const y = s.indexOf(f);
            y > -1 && s.splice(y, 1)
        }
        ;
        return o.push(g),
        g
    }
    function u() {
        const {history: f} = window;
        !f.state || f.replaceState(re({}, f.state, {
            scroll: _r()
        }), "")
    }
    function h() {
        for (const f of o)
            f();
        o = [],
        window.removeEventListener("popstate", l),
        window.removeEventListener("beforeunload", u)
    }
    return window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", u),
    {
        pauseListeners: c,
        listen: a,
        destroy: h
    }
}
function Ho(e, t, n, r=!1, s=!1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: s ? _r() : null
    }
}
function sh(e) {
    const {history: t, location: n} = window
      , r = {
        value: Il(e, n)
    }
      , s = {
        value: t.state
    };
    s.value || o(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function o(c, a, u) {
        const h = e.indexOf("#")
          , f = h > -1 ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c : nh() + e + c;
        try {
            t[u ? "replaceState" : "pushState"](a, "", f),
            s.value = a
        } catch (g) {
            console.error(g),
            n[u ? "replace" : "assign"](f)
        }
    }
    function i(c, a) {
        const u = re({}, t.state, Ho(s.value.back, c, s.value.forward, !0), a, {
            position: s.value.position
        });
        o(c, u, !0),
        r.value = c
    }
    function l(c, a) {
        const u = re({}, s.value, t.state, {
            forward: c,
            scroll: _r()
        });
        o(u.current, u, !0);
        const h = re({}, Ho(r.value, c, null), {
            position: u.position + 1
        }, a);
        o(c, h, !1),
        r.value = c
    }
    return {
        location: r,
        state: s,
        push: l,
        replace: i
    }
}
function Ll(e) {
    e = Jd(e);
    const t = sh(e)
      , n = rh(e, t.state, t.location, t.replace);
    function r(o, i=!0) {
        i || n.pauseListeners(),
        history.go(o)
    }
    const s = re({
        location: "",
        base: e,
        go: r,
        createHref: Xd.bind(null, e)
    }, t, n);
    return Object.defineProperty(s, "location", {
        enumerable: !0,
        get: ()=>t.location.value
    }),
    Object.defineProperty(s, "state", {
        enumerable: !0,
        get: ()=>t.state.value
    }),
    s
}
function oh(e) {
    return e = location.host ? e || location.pathname + location.search : "",
    e.includes("#") || (e += "#"),
    Ll(e)
}
function ih(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function Nl(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const dt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}
  , Fl = Symbol("");
var Mo;
(function(e) {
    e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated"
}
)(Mo || (Mo = {}));
function Zt(e, t) {
    return re(new Error, {
        type: e,
        [Fl]: !0
    }, t)
}
function et(e, t) {
    return e instanceof Error && Fl in e && (t == null || !!(e.type & t))
}
const Io = "[^/]+?"
  , lh = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
  , ch = /[.+*?^${}()[\]/\\]/g;
function ah(e, t) {
    const n = re({}, lh, t)
      , r = [];
    let s = n.start ? "^" : "";
    const o = [];
    for (const a of e) {
        const u = a.length ? [] : [90];
        n.strict && !a.length && (s += "/");
        for (let h = 0; h < a.length; h++) {
            const f = a[h];
            let g = 40 + (n.sensitive ? .25 : 0);
            if (f.type === 0)
                h || (s += "/"),
                s += f.value.replace(ch, "\\$&"),
                g += 40;
            else if (f.type === 1) {
                const {value: y, repeatable: R, optional: x, regexp: _} = f;
                o.push({
                    name: y,
                    repeatable: R,
                    optional: x
                });
                const p = _ || Io;
                if (p !== Io) {
                    g += 10;
                    try {
                        new RegExp(`(${p})`)
                    } catch (w) {
                        throw new Error(`Invalid custom RegExp for param "${y}" (${p}): ` + w.message)
                    }
                }
                let b = R ? `((?:${p})(?:/(?:${p}))*)` : `(${p})`;
                h || (b = x && a.length < 2 ? `(?:/${b})` : "/" + b),
                x && (b += "?"),
                s += b,
                g += 20,
                x && (g += -8),
                R && (g += -20),
                p === ".*" && (g += -50)
            }
            u.push(g)
        }
        r.push(u)
    }
    if (n.strict && n.end) {
        const a = r.length - 1;
        r[a][r[a].length - 1] += .7000000000000001
    }
    n.strict || (s += "/?"),
    n.end ? s += "$" : n.strict && (s += "(?:/|$)");
    const i = new RegExp(s,n.sensitive ? "" : "i");
    function l(a) {
        const u = a.match(i)
          , h = {};
        if (!u)
            return null;
        for (let f = 1; f < u.length; f++) {
            const g = u[f] || ""
              , y = o[f - 1];
            h[y.name] = g && y.repeatable ? g.split("/") : g
        }
        return h
    }
    function c(a) {
        let u = ""
          , h = !1;
        for (const f of e) {
            (!h || !u.endsWith("/")) && (u += "/"),
            h = !1;
            for (const g of f)
                if (g.type === 0)
                    u += g.value;
                else if (g.type === 1) {
                    const {value: y, repeatable: R, optional: x} = g
                      , _ = y in a ? a[y] : "";
                    if (ze(_) && !R)
                        throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
                    const p = ze(_) ? _.join("/") : _;
                    if (!p)
                        if (x)
                            f.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : h = !0);
                        else
                            throw new Error(`Missing required param "${y}"`);
                    u += p
                }
        }
        return u || "/"
    }
    return {
        re: i,
        score: r,
        keys: o,
        parse: l,
        stringify: c
    }
}
function uh(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const r = t[n] - e[n];
        if (r)
            return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}
function fh(e, t) {
    let n = 0;
    const r = e.score
      , s = t.score;
    for (; n < r.length && n < s.length; ) {
        const o = uh(r[n], s[n]);
        if (o)
            return o;
        n++
    }
    if (Math.abs(s.length - r.length) === 1) {
        if (Lo(r))
            return 1;
        if (Lo(s))
            return -1
    }
    return s.length - r.length
}
function Lo(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const dh = {
    type: 0,
    value: ""
}
  , hh = /[a-zA-Z0-9_]/;
function ph(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[dh]];
    if (!e.startsWith("/"))
        throw new Error(`Invalid path "${e}"`);
    function t(g) {
        throw new Error(`ERR (${n})/"${a}": ${g}`)
    }
    let n = 0
      , r = n;
    const s = [];
    let o;
    function i() {
        o && s.push(o),
        o = []
    }
    let l = 0, c, a = "", u = "";
    function h() {
        !a || (n === 0 ? o.push({
            type: 0,
            value: a
        }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`),
        o.push({
            type: 1,
            value: a,
            regexp: u,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?"
        })) : t("Invalid state to consume buffer"),
        a = "")
    }
    function f() {
        a += c
    }
    for (; l < e.length; ) {
        if (c = e[l++],
        c === "\\" && n !== 2) {
            r = n,
            n = 4;
            continue
        }
        switch (n) {
        case 0:
            c === "/" ? (a && h(),
            i()) : c === ":" ? (h(),
            n = 1) : f();
            break;
        case 4:
            f(),
            n = r;
            break;
        case 1:
            c === "(" ? n = 2 : hh.test(c) ? f() : (h(),
            n = 0,
            c !== "*" && c !== "?" && c !== "+" && l--);
            break;
        case 2:
            c === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + c : n = 3 : u += c;
            break;
        case 3:
            h(),
            n = 0,
            c !== "*" && c !== "?" && c !== "+" && l--,
            u = "";
            break;
        default:
            t("Unknown state");
            break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${a}"`),
    h(),
    i(),
    s
}
function gh(e, t, n) {
    const r = ah(ph(e.path), n)
      , s = re(r, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s),
    s
}
function mh(e, t) {
    const n = []
      , r = new Map;
    t = jo({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);
    function s(u) {
        return r.get(u)
    }
    function o(u, h, f) {
        const g = !f
          , y = yh(u);
        y.aliasOf = f && f.record;
        const R = jo(t, u)
          , x = [y];
        if ("alias"in u) {
            const b = typeof u.alias == "string" ? [u.alias] : u.alias;
            for (const w of b)
                x.push(re({}, y, {
                    components: f ? f.record.components : y.components,
                    path: w,
                    aliasOf: f ? f.record : y
                }))
        }
        let _, p;
        for (const b of x) {
            const {path: w} = b;
            if (h && w[0] !== "/") {
                const S = h.record.path
                  , L = S[S.length - 1] === "/" ? "" : "/";
                b.path = h.record.path + (w && L + w)
            }
            if (_ = gh(b, h, R),
            f ? f.alias.push(_) : (p = p || _,
            p !== _ && p.alias.push(_),
            g && u.name && !Fo(_) && i(u.name)),
            y.children) {
                const S = y.children;
                for (let L = 0; L < S.length; L++)
                    o(S[L], _, f && f.children[L])
            }
            f = f || _,
            (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && c(_)
        }
        return p ? ()=>{
            i(p)
        }
        : _n
    }
    function i(u) {
        if (Nl(u)) {
            const h = r.get(u);
            h && (r.delete(u),
            n.splice(n.indexOf(h), 1),
            h.children.forEach(i),
            h.alias.forEach(i))
        } else {
            const h = n.indexOf(u);
            h > -1 && (n.splice(h, 1),
            u.record.name && r.delete(u.record.name),
            u.children.forEach(i),
            u.alias.forEach(i))
        }
    }
    function l() {
        return n
    }
    function c(u) {
        let h = 0;
        for (; h < n.length && fh(u, n[h]) >= 0 && (u.record.path !== n[h].record.path || !jl(u, n[h])); )
            h++;
        n.splice(h, 0, u),
        u.record.name && !Fo(u) && r.set(u.record.name, u)
    }
    function a(u, h) {
        let f, g = {}, y, R;
        if ("name"in u && u.name) {
            if (f = r.get(u.name),
            !f)
                throw Zt(1, {
                    location: u
                });
            R = f.record.name,
            g = re(No(h.params, f.keys.filter(p=>!p.optional).map(p=>p.name)), u.params && No(u.params, f.keys.map(p=>p.name))),
            y = f.stringify(g)
        } else if ("path"in u)
            y = u.path,
            f = n.find(p=>p.re.test(y)),
            f && (g = f.parse(y),
            R = f.record.name);
        else {
            if (f = h.name ? r.get(h.name) : n.find(p=>p.re.test(h.path)),
            !f)
                throw Zt(1, {
                    location: u,
                    currentLocation: h
                });
            R = f.record.name,
            g = re({}, h.params, u.params),
            y = f.stringify(g)
        }
        const x = [];
        let _ = f;
        for (; _; )
            x.unshift(_.record),
            _ = _.parent;
        return {
            name: R,
            path: y,
            params: g,
            matched: x,
            meta: bh(x)
        }
    }
    return e.forEach(u=>o(u)),
    {
        addRoute: o,
        resolve: a,
        removeRoute: i,
        getRoutes: l,
        getRecordMatcher: s
    }
}
function No(e, t) {
    const n = {};
    for (const r of t)
        r in e && (n[r] = e[r]);
    return n
}
function yh(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: _h(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}
function _h(e) {
    const t = {}
      , n = e.props || !1;
    if ("component"in e)
        t.default = n;
    else
        for (const r in e.components)
            t[r] = typeof n == "boolean" ? n : n[r];
    return t
}
function Fo(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function bh(e) {
    return e.reduce((t,n)=>re(t, n.meta), {})
}
function jo(e, t) {
    const n = {};
    for (const r in e)
        n[r] = r in t ? t[r] : e[r];
    return n
}
function jl(e, t) {
    return t.children.some(n=>n === e || jl(e, n))
}
const Bl = /#/g
  , vh = /&/g
  , Eh = /\//g
  , wh = /=/g
  , Ch = /\?/g
  , Dl = /\+/g
  , Rh = /%5B/g
  , Th = /%5D/g
  , Ul = /%5E/g
  , kh = /%60/g
  , Kl = /%7B/g
  , Ph = /%7C/g
  , ql = /%7D/g
  , Ah = /%20/g;
function Ls(e) {
    return encodeURI("" + e).replace(Ph, "|").replace(Rh, "[").replace(Th, "]")
}
function Oh(e) {
    return Ls(e).replace(Kl, "{").replace(ql, "}").replace(Ul, "^")
}
function ls(e) {
    return Ls(e).replace(Dl, "%2B").replace(Ah, "+").replace(Bl, "%23").replace(vh, "%26").replace(kh, "`").replace(Kl, "{").replace(ql, "}").replace(Ul, "^")
}
function xh(e) {
    return ls(e).replace(wh, "%3D")
}
function Sh(e) {
    return Ls(e).replace(Bl, "%23").replace(Ch, "%3F")
}
function $h(e) {
    return e == null ? "" : Sh(e).replace(Eh, "%2F")
}
function Gn(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}
function Hh(e) {
    const t = {};
    if (e === "" || e === "?")
        return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let s = 0; s < r.length; ++s) {
        const o = r[s].replace(Dl, " ")
          , i = o.indexOf("=")
          , l = Gn(i < 0 ? o : o.slice(0, i))
          , c = i < 0 ? null : Gn(o.slice(i + 1));
        if (l in t) {
            let a = t[l];
            ze(a) || (a = t[l] = [a]),
            a.push(c)
        } else
            t[l] = c
    }
    return t
}
function Bo(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = xh(n),
        r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        (ze(r) ? r.map(o=>o && ls(o)) : [r && ls(r)]).forEach(o=>{
            o !== void 0 && (t += (t.length ? "&" : "") + n,
            o != null && (t += "=" + o))
        }
        )
    }
    return t
}
function Mh(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = ze(r) ? r.map(s=>s == null ? null : "" + s) : r == null ? r : "" + r)
    }
    return t
}
const Ih = Symbol("")
  , Do = Symbol("")
  , Ns = Symbol("")
  , Fs = Symbol("")
  , cs = Symbol("");
function cn() {
    let e = [];
    function t(r) {
        return e.push(r),
        ()=>{
            const s = e.indexOf(r);
            s > -1 && e.splice(s, 1)
        }
    }
    function n() {
        e = []
    }
    return {
        add: t,
        list: ()=>e,
        reset: n
    }
}
function gt(e, t, n, r, s) {
    const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
    return ()=>new Promise((i,l)=>{
        const c = h=>{
            h === !1 ? l(Zt(4, {
                from: n,
                to: t
            })) : h instanceof Error ? l(h) : ih(h) ? l(Zt(2, {
                from: t,
                to: h
            })) : (o && r.enterCallbacks[s] === o && typeof h == "function" && o.push(h),
            i())
        }
          , a = e.call(r && r.instances[s], t, n, c);
        let u = Promise.resolve(a);
        e.length < 3 && (u = u.then(c)),
        u.catch(h=>l(h))
    }
    )
}
function Lr(e, t, n, r) {
    const s = [];
    for (const o of e)
        for (const i in o.components) {
            let l = o.components[i];
            if (!(t !== "beforeRouteEnter" && !o.instances[i]))
                if (Lh(l)) {
                    const a = (l.__vccOpts || l)[t];
                    a && s.push(gt(a, n, r, o, i))
                } else {
                    let c = l();
                    s.push(()=>c.then(a=>{
                        if (!a)
                            return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));
                        const u = Ud(a) ? a.default : a;
                        o.components[i] = u;
                        const f = (u.__vccOpts || u)[t];
                        return f && gt(f, n, r, o, i)()
                    }
                    ))
                }
        }
    return s
}
function Lh(e) {
    return typeof e == "object" || "displayName"in e || "props"in e || "__vccOpts"in e
}
function Uo(e) {
    const t = Me(Ns)
      , n = Me(Fs)
      , r = me(()=>t.resolve(Ae(e.to)))
      , s = me(()=>{
        const {matched: c} = r.value
          , {length: a} = c
          , u = c[a - 1]
          , h = n.matched;
        if (!u || !h.length)
            return -1;
        const f = h.findIndex(Xt.bind(null, u));
        if (f > -1)
            return f;
        const g = Ko(c[a - 2]);
        return a > 1 && Ko(u) === g && h[h.length - 1].path !== g ? h.findIndex(Xt.bind(null, c[a - 2])) : f
    }
    )
      , o = me(()=>s.value > -1 && Bh(n.params, r.value.params))
      , i = me(()=>s.value > -1 && s.value === n.matched.length - 1 && Ml(n.params, r.value.params));
    function l(c={}) {
        return jh(c) ? t[Ae(e.replace) ? "replace" : "push"](Ae(e.to)).catch(_n) : Promise.resolve()
    }
    return {
        route: r,
        href: me(()=>r.value.href),
        isActive: o,
        isExactActive: i,
        navigate: l
    }
}
const Nh = it({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: Uo,
    setup(e, {slots: t}) {
        const n = Ve(Uo(e))
          , {options: r} = Me(Ns)
          , s = me(()=>({
            [qo(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
            [qo(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return ()=>{
            const o = t.default && t.default(n);
            return e.custom ? o : Ie("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
            }, o)
        }
    }
})
  , Fh = Nh;
function jh(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t))
                return
        }
        return e.preventDefault && e.preventDefault(),
        !0
    }
}
function Bh(e, t) {
    for (const n in t) {
        const r = t[n]
          , s = e[n];
        if (typeof r == "string") {
            if (r !== s)
                return !1
        } else if (!ze(s) || s.length !== r.length || r.some((o,i)=>o !== s[i]))
            return !1
    }
    return !0
}
function Ko(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const qo = (e,t,n)=>e != null ? e : t != null ? t : n
  , Dh = it({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: t, slots: n}) {
        const r = Me(cs)
          , s = me(()=>e.route || r.value)
          , o = Me(Do, 0)
          , i = me(()=>{
            let a = Ae(o);
            const {matched: u} = s.value;
            let h;
            for (; (h = u[a]) && !h.components; )
                a++;
            return a
        }
        )
          , l = me(()=>s.value.matched[i.value]);
        Kt(Do, me(()=>i.value + 1)),
        Kt(Ih, l),
        Kt(cs, s);
        const c = At();
        return _t(()=>[c.value, l.value, e.name], ([a,u,h],[f,g,y])=>{
            u && (u.instances[h] = a,
            g && g !== u && a && a === f && (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards),
            u.updateGuards.size || (u.updateGuards = g.updateGuards))),
            a && u && (!g || !Xt(u, g) || !f) && (u.enterCallbacks[h] || []).forEach(R=>R(a))
        }
        , {
            flush: "post"
        }),
        ()=>{
            const a = s.value
              , u = e.name
              , h = l.value
              , f = h && h.components[u];
            if (!f)
                return Wo(n.default, {
                    Component: f,
                    route: a
                });
            const g = h.props[u]
              , y = g ? g === !0 ? a.params : typeof g == "function" ? g(a) : g : null
              , x = Ie(f, re({}, y, t, {
                onVnodeUnmounted: _=>{
                    _.component.isUnmounted && (h.instances[u] = null)
                }
                ,
                ref: c
            }));
            return Wo(n.default, {
                Component: x,
                route: a
            }) || x
        }
    }
});
function Wo(e, t) {
    if (!e)
        return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const Wl = Dh;
function Uh(e) {
    const t = mh(e.routes, e)
      , n = e.parseQuery || Hh
      , r = e.stringifyQuery || Bo
      , s = e.history
      , o = cn()
      , i = cn()
      , l = cn()
      , c = Ur(dt);
    let a = dt;
    It && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const u = Mr.bind(null, C=>"" + C)
      , h = Mr.bind(null, $h)
      , f = Mr.bind(null, Gn);
    function g(C, F) {
        let H, K;
        return Nl(C) ? (H = t.getRecordMatcher(C),
        K = F) : K = C,
        t.addRoute(K, H)
    }
    function y(C) {
        const F = t.getRecordMatcher(C);
        F && t.removeRoute(F)
    }
    function R() {
        return t.getRoutes().map(C=>C.record)
    }
    function x(C) {
        return !!t.getRecordMatcher(C)
    }
    function _(C, F) {
        if (F = re({}, F || c.value),
        typeof C == "string") {
            const d = Ir(n, C, F.path)
              , m = t.resolve({
                path: d.path
            }, F)
              , v = s.createHref(d.fullPath);
            return re(d, m, {
                params: f(m.params),
                hash: Gn(d.hash),
                redirectedFrom: void 0,
                href: v
            })
        }
        let H;
        if ("path"in C)
            H = re({}, C, {
                path: Ir(n, C.path, F.path).path
            });
        else {
            const d = re({}, C.params);
            for (const m in d)
                d[m] == null && delete d[m];
            H = re({}, C, {
                params: h(C.params)
            }),
            F.params = h(F.params)
        }
        const K = t.resolve(H, F)
          , ee = C.hash || "";
        K.params = u(f(K.params));
        const ue = Wd(r, re({}, C, {
            hash: Oh(ee),
            path: K.path
        }))
          , X = s.createHref(ue);
        return re({
            fullPath: ue,
            hash: ee,
            query: r === Bo ? Mh(C.query) : C.query || {}
        }, K, {
            redirectedFrom: void 0,
            href: X
        })
    }
    function p(C) {
        return typeof C == "string" ? Ir(n, C, c.value.path) : re({}, C)
    }
    function b(C, F) {
        if (a !== C)
            return Zt(8, {
                from: F,
                to: C
            })
    }
    function w(C) {
        return N(C)
    }
    function S(C) {
        return w(re(p(C), {
            replace: !0
        }))
    }
    function L(C) {
        const F = C.matched[C.matched.length - 1];
        if (F && F.redirect) {
            const {redirect: H} = F;
            let K = typeof H == "function" ? H(C) : H;
            return typeof K == "string" && (K = K.includes("?") || K.includes("#") ? K = p(K) : {
                path: K
            },
            K.params = {}),
            re({
                query: C.query,
                hash: C.hash,
                params: "path"in K ? {} : C.params
            }, K)
        }
    }
    function N(C, F) {
        const H = a = _(C)
          , K = c.value
          , ee = C.state
          , ue = C.force
          , X = C.replace === !0
          , d = L(H);
        if (d)
            return N(re(p(d), {
                state: typeof d == "object" ? re({}, ee, d.state) : ee,
                force: ue,
                replace: X
            }), F || H);
        const m = H;
        m.redirectedFrom = F;
        let v;
        return !ue && Vd(r, K, H) && (v = Zt(16, {
            to: m,
            from: K
        }),
        vt(K, K, !0, !1)),
        (v ? Promise.resolve(v) : D(m, K)).catch(E=>et(E) ? et(E, 2) ? E : De(E) : ie(E, m, K)).then(E=>{
            if (E) {
                if (et(E, 2))
                    return N(re({
                        replace: X
                    }, p(E.to), {
                        state: typeof E.to == "object" ? re({}, ee, E.to.state) : ee,
                        force: ue
                    }), F || m)
            } else
                E = V(m, K, !0, X, ee);
            return B(m, K, E),
            E
        }
        )
    }
    function k(C, F) {
        const H = b(C, F);
        return H ? Promise.reject(H) : Promise.resolve()
    }
    function D(C, F) {
        let H;
        const [K,ee,ue] = Kh(C, F);
        H = Lr(K.reverse(), "beforeRouteLeave", C, F);
        for (const d of K)
            d.leaveGuards.forEach(m=>{
                H.push(gt(m, C, F))
            }
            );
        const X = k.bind(null, C, F);
        return H.push(X),
        Mt(H).then(()=>{
            H = [];
            for (const d of o.list())
                H.push(gt(d, C, F));
            return H.push(X),
            Mt(H)
        }
        ).then(()=>{
            H = Lr(ee, "beforeRouteUpdate", C, F);
            for (const d of ee)
                d.updateGuards.forEach(m=>{
                    H.push(gt(m, C, F))
                }
                );
            return H.push(X),
            Mt(H)
        }
        ).then(()=>{
            H = [];
            for (const d of C.matched)
                if (d.beforeEnter && !F.matched.includes(d))
                    if (ze(d.beforeEnter))
                        for (const m of d.beforeEnter)
                            H.push(gt(m, C, F));
                    else
                        H.push(gt(d.beforeEnter, C, F));
            return H.push(X),
            Mt(H)
        }
        ).then(()=>(C.matched.forEach(d=>d.enterCallbacks = {}),
        H = Lr(ue, "beforeRouteEnter", C, F),
        H.push(X),
        Mt(H))).then(()=>{
            H = [];
            for (const d of i.list())
                H.push(gt(d, C, F));
            return H.push(X),
            Mt(H)
        }
        ).catch(d=>et(d, 8) ? d : Promise.reject(d))
    }
    function B(C, F, H) {
        for (const K of l.list())
            K(C, F, H)
    }
    function V(C, F, H, K, ee) {
        const ue = b(C, F);
        if (ue)
            return ue;
        const X = F === dt
          , d = It ? history.state : {};
        H && (K || X ? s.replace(C.fullPath, re({
            scroll: X && d && d.scroll
        }, ee)) : s.push(C.fullPath, ee)),
        c.value = C,
        vt(C, F, H, X),
        De()
    }
    let I;
    function Y() {
        I || (I = s.listen((C,F,H)=>{
            if (!On.listening)
                return;
            const K = _(C)
              , ee = L(K);
            if (ee) {
                N(re(ee, {
                    replace: !0
                }), K).catch(_n);
                return
            }
            a = K;
            const ue = c.value;
            It && eh($o(ue.fullPath, H.delta), _r()),
            D(K, ue).catch(X=>et(X, 12) ? X : et(X, 2) ? (N(X.to, K).then(d=>{
                et(d, 20) && !H.delta && H.type === Tn.pop && s.go(-1, !1)
            }
            ).catch(_n),
            Promise.reject()) : (H.delta && s.go(-H.delta, !1),
            ie(X, K, ue))).then(X=>{
                X = X || V(K, ue, !1),
                X && (H.delta && !et(X, 8) ? s.go(-H.delta, !1) : H.type === Tn.pop && et(X, 20) && s.go(-1, !1)),
                B(K, ue, X)
            }
            ).catch(_n)
        }
        ))
    }
    let j = cn(), be = cn(), G;
    function ie(C, F, H) {
        De(C);
        const K = be.list();
        return K.length ? K.forEach(ee=>ee(C, F, H)) : console.error(C),
        Promise.reject(C)
    }
    function se() {
        return G && c.value !== dt ? Promise.resolve() : new Promise((C,F)=>{
            j.add([C, F])
        }
        )
    }
    function De(C) {
        return G || (G = !C,
        Y(),
        j.list().forEach(([F,H])=>C ? H(C) : F()),
        j.reset()),
        C
    }
    function vt(C, F, H, K) {
        const {scrollBehavior: ee} = e;
        if (!It || !ee)
            return Promise.resolve();
        const ue = !H && th($o(C.fullPath, 0)) || (K || !H) && history.state && history.state.scroll || null;
        return rn().then(()=>ee(C, F, ue)).then(X=>X && Gd(X)).catch(X=>ie(X, C, F))
    }
    const Ue = C=>s.go(C);
    let Te;
    const $t = new Set
      , On = {
        currentRoute: c,
        listening: !0,
        addRoute: g,
        removeRoute: y,
        hasRoute: x,
        getRoutes: R,
        resolve: _,
        options: e,
        push: w,
        replace: S,
        go: Ue,
        back: ()=>Ue(-1),
        forward: ()=>Ue(1),
        beforeEach: o.add,
        beforeResolve: i.add,
        afterEach: l.add,
        onError: be.add,
        isReady: se,
        install(C) {
            const F = this;
            C.component("RouterLink", Fh),
            C.component("RouterView", Wl),
            C.config.globalProperties.$router = F,
            Object.defineProperty(C.config.globalProperties, "$route", {
                enumerable: !0,
                get: ()=>Ae(c)
            }),
            It && !Te && c.value === dt && (Te = !0,
            w(s.location).catch(ee=>{}
            ));
            const H = {};
            for (const ee in dt)
                H[ee] = me(()=>c.value[ee]);
            C.provide(Ns, F),
            C.provide(Fs, Ve(H)),
            C.provide(cs, c);
            const K = C.unmount;
            $t.add(C),
            C.unmount = function() {
                $t.delete(C),
                $t.size < 1 && (a = dt,
                I && I(),
                I = null,
                c.value = dt,
                Te = !1,
                G = !1),
                K()
            }
        }
    };
    return On
}
function Mt(e) {
    return e.reduce((t,n)=>t.then(()=>n()), Promise.resolve())
}
function Kh(e, t) {
    const n = []
      , r = []
      , s = []
      , o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const l = t.matched[i];
        l && (e.matched.find(a=>Xt(a, l)) ? r.push(l) : n.push(l));
        const c = e.matched[i];
        c && (t.matched.find(a=>Xt(a, c)) || s.push(c))
    }
    return [n, r, s]
}
function qh() {
    return Me(Fs)
}
const xe = {}
  , Se = {}
  , $e = {}
  , He = {};
var Yo, Xo, Zo, Go, ei, ti, ni, ri;
const Vo = [{
    name: (Yo = xe == null ? void 0 : xe.name) != null ? Yo : "index",
    path: (Xo = xe == null ? void 0 : xe.path) != null ? Xo : "/",
    file: "/var/www/akibot/aki-frontend/pages/index.vue",
    children: [],
    meta: xe,
    alias: (xe == null ? void 0 : xe.alias) || [],
    redirect: (xe == null ? void 0 : xe.redirect) || void 0,
    component: ()=>Nt(()=>import("./index.a401cb8e.js"), [], import.meta.url).then(e=>e.default || e)
}, {
    name: (Zo = Se == null ? void 0 : Se.name) != null ? Zo : "privacy",
    path: (Go = Se == null ? void 0 : Se.path) != null ? Go : "/privacy",
    file: "/var/www/akibot/aki-frontend/pages/privacy.vue",
    children: [],
    meta: Se,
    alias: (Se == null ? void 0 : Se.alias) || [],
    redirect: (Se == null ? void 0 : Se.redirect) || void 0,
    component: ()=>Nt(()=>import("./privacy.99b2a97d.js"), [], import.meta.url).then(e=>e.default || e)
}, {
    name: (ei = $e == null ? void 0 : $e.name) != null ? ei : "terms",
    path: (ti = $e == null ? void 0 : $e.path) != null ? ti : "/terms",
    file: "/var/www/akibot/aki-frontend/pages/terms.vue",
    children: [],
    meta: $e,
    alias: ($e == null ? void 0 : $e.alias) || [],
    redirect: ($e == null ? void 0 : $e.redirect) || void 0,
    component: ()=>Nt(()=>import("./terms.5dc3f71a.js"), [], import.meta.url).then(e=>e.default || e)
}, {
    name: (ni = He == null ? void 0 : He.name) != null ? ni : "votes",
    path: (ri = He == null ? void 0 : He.path) != null ? ri : "/votes",
    file: "/var/www/akibot/aki-frontend/pages/votes.vue",
    children: [],
    meta: He,
    alias: (He == null ? void 0 : He.alias) || [],
    redirect: (He == null ? void 0 : He.redirect) || void 0,
    component: ()=>Nt(()=>import("./votes.5fa00882.js"), [], import.meta.url).then(e=>e.default || e)
}]
  , Wh = {
    scrollBehavior(e, t, n) {
        const r = Re();
        let s = n || void 0;
        if (!s && t && e && e.meta.scrollToTop !== !1 && Vh(t, e) && (s = {
            left: 0,
            top: 0
        }),
        e.path === t.path) {
            if (t.hash && !e.hash)
                return {
                    left: 0,
                    top: 0
                };
            if (e.hash)
                return {
                    el: e.hash,
                    top: zo(e.hash)
                }
        }
        const o = l=>{
            var c;
            return !!((c = l.meta.pageTransition) != null ? c : os)
        }
          , i = o(t) && o(e) ? "page:transition:finish" : "page:finish";
        return new Promise(l=>{
            r.hooks.hookOnce(i, async()=>{
                await rn(),
                e.hash && (s = {
                    el: e.hash,
                    top: zo(e.hash)
                }),
                l(s)
            }
            )
        }
        )
    }
};
function zo(e) {
    try {
        const t = document.querySelector(e);
        if (t)
            return parseFloat(getComputedStyle(t).scrollMarginTop)
    } catch {}
    return 0
}
function Vh(e, t) {
    const n = e.matched[0] === t.matched[0];
    return !!(!n || n && JSON.stringify(e.params) !== JSON.stringify(t.params))
}
const zh = {}
  , tt = {
    ...zh,
    ...Wh
}
  , Qh = xf(async e=>{
    var s;
    let t, n;
    if (!((s = e.meta) != null && s.validate))
        return;
    const r = ([t,n] = vl(()=>Promise.resolve(e.meta.validate(e))),
    t = await t,
    n(),
    t);
    return typeof r == "boolean" ? r : wl(r)
}
)
  , Jh = [Qh]
  , Nr = {};
function Yh(e, t) {
    const {pathname: n, search: r, hash: s} = t
      , o = e.indexOf("#");
    if (o > -1) {
        const l = s.includes(e.slice(o)) ? e.slice(o).length : 1;
        let c = s.slice(l);
        return c[0] !== "/" && (c = "/" + c),
        wo(c, "")
    }
    return wo(n, e) + r + s
}
const Xh = gr(async e=>{
    var y, R, x, _;
    let t, n, r = kf().app.baseURL;
    tt.hashMode && !r.includes("#") && (r += "#");
    const s = (R = (y = tt.history) == null ? void 0 : y.call(tt, r)) != null ? R : tt.hashMode ? oh(r) : Ll(r)
      , o = (_ = (x = tt.routes) == null ? void 0 : x.call(tt, Vo)) != null ? _ : Vo
      , i = Yh(r, window.location)
      , l = Uh({
        ...tt,
        history: s,
        routes: o
    });
    e.vueApp.use(l);
    const c = Ur(l.currentRoute.value);
    l.afterEach((p,b)=>{
        c.value = b
    }
    ),
    Object.defineProperty(e.vueApp.config.globalProperties, "previousRoute", {
        get: ()=>c.value
    });
    const a = Ur(l.resolve(i))
      , u = ()=>{
        a.value = l.currentRoute.value
    }
    ;
    e.hook("page:finish", u),
    l.afterEach((p,b)=>{
        var w, S, L, N;
        ((S = (w = p.matched[0]) == null ? void 0 : w.components) == null ? void 0 : S.default) === ((N = (L = b.matched[0]) == null ? void 0 : L.components) == null ? void 0 : N.default) && u()
    }
    );
    const h = {};
    for (const p in a.value)
        h[p] = me(()=>a.value[p]);
    e._route = Ve(h),
    e._middleware = e._middleware || {
        global: [],
        named: {}
    };
    const f = mr();
    try {
        [t,n] = vl(()=>l.isReady()),
        await t,
        n()
    } catch (p) {
        pt(e, fn, [p])
    }
    const g = Cl("_layout");
    return l.beforeEach(async(p,b)=>{
        var S, L;
        p.meta = Ve(p.meta),
        e.isHydrating && (p.meta.layout = (S = g.value) != null ? S : p.meta.layout),
        e._processingMiddleware = !0;
        const w = new Set([...Jh, ...e._middleware.global]);
        for (const N of p.matched) {
            const k = N.meta.middleware;
            if (!!k)
                if (Array.isArray(k))
                    for (const D of k)
                        w.add(D);
                else
                    w.add(k)
        }
        for (const N of w) {
            const k = typeof N == "string" ? e._middleware.named[N] || await ((L = Nr[N]) == null ? void 0 : L.call(Nr).then(B=>B.default || B)) : N;
            if (!k)
                throw new Error(`Unknown route middleware: '${N}'.`);
            const D = await pt(e, k, [p, b]);
            if (!e.payload.serverRendered && e.isHydrating && (D === !1 || D instanceof Error)) {
                const B = D || rs({
                    statusCode: 404,
                    statusMessage: `Page Not Found: ${i}`
                });
                return await pt(e, fn, [B]),
                !1
            }
            if (D || D === !1)
                return D
        }
    }
    ),
    l.afterEach(async p=>{
        delete e._processingMiddleware,
        !e.isHydrating && f.value && await pt(e, Af),
        p.matched.length === 0 && pt(e, fn, [rs({
            statusCode: 404,
            fatal: !1,
            statusMessage: `Page not found: ${p.fullPath}`
        })])
    }
    ),
    e.hooks.hookOnce("app:created", async()=>{
        try {
            await l.replace({
                ...l.resolve(i),
                name: void 0,
                force: !0
            })
        } catch (p) {
            pt(e, fn, [p])
        }
    }
    ),
    {
        provide: {
            router: l
        }
    }
}
)
  , Zh = "__NUXT_COLOR_MODE__"
  , Gh = "theme"
  , ep = "nuxt-color-mode"
  , nt = window[Zh]
  , tp = gr(e=>{
    const t = Cl("color-mode", ()=>Ve({
        preference: nt.preference,
        value: nt.value,
        unknown: !1,
        forced: !1
    })).value;
    Hf({
        htmlAttrs: {
            [`data-${Gh}`]: me(()=>t.value)
        }
    }),
    yr().afterEach(s=>{
        const o = s.meta.colorMode;
        o && o !== "system" ? (t.value = o,
        t.forced = !0) : (o === "system" && console.warn("You cannot force the colorMode to system at the page level."),
        t.forced = !1,
        t.value = t.preference === "system" ? nt.getColorScheme() : t.preference)
    }
    );
    let n;
    function r() {
        n || !window.matchMedia || (n = window.matchMedia("(prefers-color-scheme: dark)"),
        n.addEventListener("change", ()=>{
            !t.forced && t.preference === "system" && (t.value = nt.getColorScheme())
        }
        ))
    }
    _t(()=>t.preference, s=>{
        var o;
        t.forced || (s === "system" ? (t.value = nt.getColorScheme(),
        r()) : t.value = s,
        (o = window.localStorage) == null || o.setItem(ep, s))
    }
    , {
        immediate: !0
    }),
    _t(()=>t.value, (s,o)=>{
        nt.removeColorScheme(o),
        nt.addColorScheme(s)
    }
    ),
    t.preference === "system" && r(),
    e.hook("app:mounted", ()=>{
        t.unknown && (t.preference = nt.preference,
        t.value = nt.value,
        t.unknown = !1)
    }
    ),
    e.provide("colorMode", t)
}
)
  , np = [Vf, Dd, Xh, tp]
  , rp = (e,t)=>t.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, n=>{
    var r;
    return ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ""
}
)
  , sp = (e,t)=>{
    var s;
    const n = t.route.matched.find(o=>{
        var i;
        return ((i = o.components) == null ? void 0 : i.default) === t.Component.type
    }
    )
      , r = (s = e != null ? e : n == null ? void 0 : n.meta.key) != null ? s : n && rp(t.route, n);
    return typeof r == "function" ? r(t.route) : r
}
  , op = (e,t)=>({
    default: ()=>e ? Ie(oa, e === !0 ? {} : e, t) : t
})
  , ip = it({
    setup(e, {slots: t}) {
        return ()=>{
            var n;
            return (n = t.default) == null ? void 0 : n.call(t)
        }
    }
})
  , as = (e,t,n)=>({
    default: ()=>t ? Ie(e, t === !0 ? {} : t, n) : Ie(ip, {}, n)
})
  , lp = it({
    name: "NuxtPage",
    inheritAttrs: !1,
    props: {
        name: {
            type: String
        },
        transition: {
            type: [Boolean, Object],
            default: void 0
        },
        keepalive: {
            type: [Boolean, Object],
            default: void 0
        },
        route: {
            type: Object
        },
        pageKey: {
            type: [Function, String],
            default: null
        }
    },
    setup(e, {attrs: t}) {
        const n = Re();
        return ()=>Ie(Wl, {
            name: e.name,
            route: e.route,
            ...t
        }, {
            default: r=>{
                var c, a, u, h;
                if (!r.Component)
                    return;
                const s = sp(e.pageKey, r)
                  , o = n.deferHydration()
                  , i = !!((a = (c = e.transition) != null ? c : r.route.meta.pageTransition) != null ? a : os)
                  , l = i && ap([e.transition, r.route.meta.pageTransition, os, {
                    onAfterLeave: ()=>{
                        n.callHook("page:transition:finish", r.Component)
                    }
                }].filter(Boolean));
                return as(hr, i && l, op((h = (u = e.keepalive) != null ? u : r.route.meta.keepalive) != null ? h : jd, Ie(Ii, {
                    onPending: ()=>n.callHook("page:start", r.Component),
                    onResolve: ()=>{
                        rn(()=>n.callHook("page:finish", r.Component).finally(o))
                    }
                }, {
                    default: ()=>Ie(up, {
                        key: s,
                        routeProps: r,
                        pageKey: s,
                        hasTransition: i
                    })
                }))).default()
            }
        })
    }
});
function cp(e) {
    return Array.isArray(e) ? e : e ? [e] : []
}
function ap(e) {
    const t = e.map(n=>({
        ...n,
        onAfterLeave: cp(n.onAfterLeave)
    }));
    return Kf(...t)
}
const up = it({
    props: ["routeProps", "pageKey", "hasTransition"],
    setup(e) {
        const t = e.pageKey
          , n = e.routeProps.route
          , r = {};
        for (const s in e.routeProps.route)
            r[s] = me(()=>t === e.pageKey ? e.routeProps.route[s] : n[s]);
        return Kt("_route", Ve(r)),
        ()=>Ie(e.routeProps.Component)
    }
})
  , Vl = {
    default: ()=>Nt(()=>import("./default.ce96bf1d.js"), [], import.meta.url).then(e=>e.default || e)
}
  , fp = it({
    props: {
        name: String
    },
    async setup(e, t) {
        const n = await Vl[e.name]().then(r=>r.default || r);
        return ()=>Ie(n, {}, t.slots)
    }
})
  , dp = it({
    props: {
        name: {
            type: [String, Boolean, Object],
            default: null
        }
    },
    setup(e, t) {
        const n = Me("_route")
          , r = n === Rl() ? qh() : n
          , s = me(()=>{
            var o, i;
            return (i = (o = Ae(e.name)) != null ? o : r.meta.layout) != null ? i : "default"
        }
        );
        return ()=>{
            var l;
            const o = s.value && s.value in Vl
              , i = (l = r.meta.layoutTransition) != null ? l : Fd;
            return as(hr, o && i, {
                default: ()=>as(fp, o && {
                    key: s.value,
                    name: s.value,
                    hasTransition: void 0
                }, t.slots).default()
            }).default()
        }
    }
})
  , hp = (e,t)=>{
    const n = e.__vccOpts || e;
    for (const [r,s] of t)
        n[r] = s;
    return n
}
  , pp = {};
function gp(e, t) {
    const n = lp
      , r = dp;
    return xt(),
    qt(r, null, {
        default: Cs(()=>[fe(n)]),
        _: 1
    })
}
const mp = hp(pp, [["render", gp]])
  , Qo = {
    __name: "nuxt-root",
    setup(e) {
        const t = ra(()=>Nt(()=>import("./error-component.88c59d21.js"), [], import.meta.url).then(o=>o.default || o))
          , n = Re()
          , r = n.deferHydration();
        Kt("_route", Rl()),
        n.hooks.callHookWith(o=>o.map(i=>i()), "vue:setup");
        const s = mr();
        return qi((o,i,l)=>{
            n.hooks.callHook("vue:error", o, i, l).catch(c=>console.error("[nuxt] Error in `vue:error` hook", c)),
            Of(o) && (o.fatal || o.unhandled) && pt(n, fn, [o])
        }
        ),
        (o,i)=>(xt(),
        qt(Ii, {
            onResolve: Ae(r)
        }, {
            default: Cs(()=>[Ae(s) ? (xt(),
            qt(Ae(t), {
                key: 0,
                error: Ae(s)
            }, null, 8, ["error"])) : (xt(),
            qt(Ae(mp), {
                key: 1
            }))]),
            _: 1
        }, 8, ["onResolve"]))
    }
};
globalThis.$fetch || (globalThis.$fetch = af.create({
    baseURL: ff()
}));
let Jo;
const yp = Tf(np);
Jo = async function() {
    var s;
    const n = Boolean((s = window.__NUXT__) == null ? void 0 : s.serverRendered) ? bu(Qo) : _u(Qo)
      , r = wf({
        vueApp: n
    });
    try {
        await Rf(r, yp)
    } catch (o) {
        await r.callHook("app:error", o),
        r.payload.error = r.payload.error || o
    }
    try {
        await r.hooks.callHook("app:created", n),
        await r.hooks.callHook("app:beforeMount", n),
        n.mount("#" + Bd),
        await r.hooks.callHook("app:mounted", n),
        await rn()
    } catch (o) {
        await r.callHook("app:error", o),
        r.payload.error = r.payload.error || o
    }
}
,
Jo().catch(e=>{
    console.error("Error while mounting app:", e)
}
);
export {Pe as F, Nt as _, Hf as a, Rp as b, qt as c, ra as d, ol as e, kp as f, La as g, Tp as h, il as i, fe as j, Pp as k, Cl as l, hp as m, _p as n, xt as o, Cp as p, vp as q, wp as r, Ep as s, bp as t, Ae as u, Cs as w};
