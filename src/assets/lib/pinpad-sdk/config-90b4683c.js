class tt {
  /**
   * @type {T}
   */
  #t;
  #e = /* @__PURE__ */ new Set();
  /**
   * @param {T} current
   */
  constructor(t) {
    this.#t = t;
  }
  /**
   * @return {T}
   */
  get current() {
    return this.#t;
  }
  /**
   * @param {T} value
   */
  set current(t) {
    this.#t != t && (this.#t = t, this.#e.forEach((n) => n(t)));
  }
  /**
   * @type {import("hooks").Ref["on"]}
   */
  on(t) {
    return this.#e.add(t), () => this.#e.delete(t);
  }
}
const H = (e) => new tt(e), R = Symbol.for("atomico.hooks");
globalThis[R] = globalThis[R] || {};
let g = globalThis[R];
const et = Symbol.for("Atomico.suspense"), Y = Symbol.for("Atomico.effect"), st = Symbol.for("Atomico.layoutEffect"), U = Symbol.for("Atomico.insertionEffect"), C = (e, t, n) => {
  const { i: s, hooks: o } = g.c, r = o[s] = o[s] || {};
  return r.value = e(r.value), r.effect = t, r.tag = n, g.c.i++, o[s].value;
}, nt = (e) => C((t = H(e)) => t), z = () => C((e = H(g.c.host)) => e), J = () => g.c.update, ot = (e, t, n = 0) => {
  let s = {}, o = !1;
  const r = () => o, l = (f, i) => {
    for (const u in s) {
      const c = s[u];
      c.effect && c.tag === f && (c.value = c.effect(c.value, i));
    }
  };
  return { load: (f) => {
    g.c = { host: t, hooks: s, update: e, i: 0, id: n };
    let i;
    try {
      o = !1, i = f();
    } catch (u) {
      if (u !== et)
        throw u;
      o = !0;
    } finally {
      g.c = null;
    }
    return i;
  }, cleanEffects: (f) => (l(U, f), () => (l(st, f), () => {
    l(Y, f);
  })), isSuspense: r };
}, T = Symbol.for;
function K(e, t) {
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let s = 0; s < n; s++) {
    let o = e[s], r = t[s];
    if (o !== r)
      return !1;
  }
  return !0;
}
const y = (e) => typeof e == "function", N = (e) => typeof e == "object", { isArray: rt } = Array, I = (e, t) => (t ? e instanceof HTMLStyleElement : !0) && "hydrate" in (e?.dataset || {});
function X(e, t) {
  let n;
  const s = (o) => {
    let { length: r } = o;
    for (let l = 0; l < r; l++) {
      const m = o[l];
      if (m && Array.isArray(m))
        s(m);
      else {
        const a = typeof m;
        if (m == null || a === "function" || a === "boolean")
          continue;
        a === "string" || a === "number" ? (n == null && (n = ""), n += m) : (n != null && (t(n), n = null), t(m));
      }
    }
  };
  s(e), n != null && t(n);
}
const q = (e, t, n) => (e.addEventListener(t, n), () => e.removeEventListener(t, n));
class Z {
  /**
   *
   * @param {HTMLElement} target
   * @param {string} message
   * @param {string} value
   */
  constructor(t, n, s) {
    this.message = n, this.target = t, this.value = s;
  }
}
class ct extends Z {
}
class it extends Z {
}
const A = "Custom", lt = null, ft = { true: 1, "": 1, 1: 1 };
function at(e, t, n, s, o) {
  const {
    type: r,
    reflect: l,
    event: m,
    value: a,
    attr: f = ut(t)
  } = n?.name != A && N(n) && n != lt ? n : { type: n }, i = r?.name === A && r.map, u = a != null ? r == Function || !y(a) ? () => a : a : null;
  Object.defineProperty(e, t, {
    configurable: !0,
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {any} newValue
     */
    set(c) {
      const h = this[t];
      u && r != Boolean && c == null && (c = u());
      const { error: p, value: E } = (i ? dt : bt)(
        r,
        c
      );
      if (p && E != null)
        throw new ct(
          this,
          `The value defined for prop '${t}' must be of type '${r.name}'`,
          E
        );
      h != E && (this._props[t] = E ?? void 0, this.update(), m && G(this, m), this.updated.then(() => {
        l && (this._ignoreAttr = f, ht(this, r, f, this[t]), this._ignoreAttr = null);
      }));
    },
    /**
     * @this {import("dom").AtomicoThisInternal}
     */
    get() {
      return this._props[t];
    }
  }), u && (o[t] = u()), s[f] = { prop: t, type: r };
}
const G = (e, { type: t, base: n = CustomEvent, ...s }) => e.dispatchEvent(new n(t, s)), ut = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase(), ht = (e, t, n, s) => s == null || t == Boolean && !s ? e.removeAttribute(n) : e.setAttribute(
  n,
  t?.name === A && t?.serialize ? t?.serialize(s) : N(s) ? JSON.stringify(s) : t == Boolean ? "" : s
), mt = (e, t) => e == Boolean ? !!ft[t] : e == Number ? Number(t) : e == String ? t : e == Array || e == Object ? JSON.parse(t) : e.name == A ? t : (
  // TODO: If when defining reflect the prop can also be of type string?
  new e(t)
), dt = ({ map: e }, t) => {
  try {
    return { value: e(t), error: !1 };
  } catch {
    return { value: t, error: !0 };
  }
}, bt = (e, t) => e == null || t == null ? { value: t, error: !1 } : e != String && t === "" ? { value: void 0, error: !1 } : e == Object || e == Array || e == Symbol ? {
  value: t,
  error: {}.toString.call(t) !== `[object ${e.name}]`
} : t instanceof e ? {
  value: t,
  error: e == Number && Number.isNaN(t.valueOf())
} : e == String || e == Number || e == Boolean ? {
  value: t,
  error: e == Number ? typeof t != "number" ? !0 : Number.isNaN(t) : e == String ? typeof t != "string" : typeof t != "boolean"
} : { value: t, error: !0 };
let pt = 0;
const Et = (e) => {
  const t = (e?.dataset || {})?.hydrate || "";
  return t || "c" + pt++;
}, yt = (e, t = HTMLElement) => {
  const n = {}, s = {}, o = "prototype" in t && t.prototype instanceof Element, r = o ? t : "base" in t ? t.base : HTMLElement, { props: l, styles: m } = o ? e : t;
  class a extends r {
    constructor() {
      super(), this._setup(), this._render = () => e({ ...this._props });
      for (const i in s)
        this[i] = s[i];
    }
    /**
     * @returns {import("core").Sheets[]}
     */
    static get styles() {
      return [super.styles, m];
    }
    async _setup() {
      if (this._props)
        return;
      this._props = {};
      let i, u;
      this.mounted = new Promise(
        (d) => this.mount = () => {
          d(), i != this.parentNode && (u != i ? this.unmounted.then(this.update) : this.update()), i = this.parentNode;
        }
      ), this.unmounted = new Promise(
        (d) => this.unmount = () => {
          d(), (i != this.parentNode || !this.isConnected) && (c.cleanEffects(!0)()(), u = this.parentNode, i = null);
        }
      ), this.symbolId = this.symbolId || Symbol(), this.symbolIdParent = Symbol();
      const c = ot(
        () => this.update(),
        this,
        Et(this)
      );
      let h, p = !0;
      const E = I(this);
      this.update = () => (h || (h = !0, this.updated = (this.updated || this.mounted).then(() => {
        try {
          const d = c.load(this._render), b = c.cleanEffects();
          return d && //@ts-ignore
          d.render(this, this.symbolId, E), h = !1, p && !c.isSuspense() && (p = !1, !E && gt(this)), b();
        } finally {
          h = !1;
        }
      }).then(
        /**
         * @param {import("internal/hooks.js").CleanUseEffects} [cleanUseEffect]
         */
        (d) => {
          d && d();
        }
      )), this.updated), this.update();
    }
    connectedCallback() {
      this.mount(), super.connectedCallback && super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback(), this.unmount();
    }
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {string} attr
     * @param {(string|null)} oldValue
     * @param {(string|null)} value
     */
    attributeChangedCallback(i, u, c) {
      if (n[i]) {
        if (i === this._ignoreAttr || u === c)
          return;
        const { prop: h, type: p } = n[i];
        try {
          this[h] = mt(p, c);
        } catch {
          throw new it(
            this,
            `The value defined as attr '${i}' cannot be parsed by type '${p.name}'`,
            c
          );
        }
      } else
        super.attributeChangedCallback(i, u, c);
    }
    static get props() {
      return { ...super.props, ...l };
    }
    static get observedAttributes() {
      const i = super.observedAttributes || [];
      for (const u in l)
        at(this.prototype, u, l[u], n, s);
      return Object.keys(n).concat(i);
    }
  }
  return a;
};
function gt(e) {
  const { styles: t } = e.constructor, { shadowRoot: n } = e;
  if (n && t.length) {
    const s = [];
    X(t, (o) => {
      o && (o instanceof Element ? n.appendChild(o.cloneNode(!0)) : s.push(o));
    }), s.length && (n.adoptedStyleSheets = s);
  }
}
const Q = (e) => (t, n) => {
  C(
    /**
     * Clean the effect hook
     * @type {import("internal/hooks.js").CollectorEffect}
     */
    ([s, o] = []) => ((o || !o) && (o && K(o, n) ? s = s || !0 : (y(s) && s(), s = null)), [s, n]),
    /**
     * @returns {any}
     */
    ([s, o], r) => r ? (y(s) && s(), []) : [s || t(), o],
    e
  );
}, D = Q(Y), Nt = Q(U);
class St extends Array {
  /**
   *
   * @param {any} initialState
   * @param {(nextState: any, state:any[], mount: boolean )=>void} mapState
   */
  constructor(t, n) {
    let s = !0;
    const o = (r) => {
      try {
        n(r, this, s);
      } finally {
        s = !1;
      }
    };
    super(void 0, o, n), o(t);
  }
  /**
   * The following code allows a mutable approach to useState
   * and useProp this with the idea of allowing an alternative
   * approach similar to Vue or Qwik of state management
   * @todo pending review with the community
   */
  // get value() {
  //     return this[0];
  // }
  // set value(nextState) {
  //     this[2](nextState, this);
  // }
}
const Ct = (e) => {
  const t = J();
  return C(
    (n = new St(e, (s, o, r) => {
      s = y(s) ? s(o[0]) : s, s !== o[0] && (o[0] = s, r || t());
    })) => n
  );
}, Tt = (e, t) => {
  const [n] = C(([s, o, r = 0] = []) => ((!o || o && !K(o, t)) && (s = e()), [s, t, r]));
  return n;
}, Ut = (e, t) => Tt(() => e, t), Pt = (e, t = {}) => {
  const n = z();
  return n[e] || (n[e] = (s = t.detail) => G(n.current, {
    type: e,
    ...t,
    detail: s
  })), n[e];
}, j = T("atomico/options");
globalThis[j] = globalThis[j] || {
  sheet: !!document.adoptedStyleSheets
};
const O = globalThis[j], At = new Promise((e) => {
  O.ssr || (document.readyState === "loading" ? q(document, "DOMContentLoaded", e) : e());
}), Ot = {
  checked: 1,
  value: 1,
  selected: 1
}, _t = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, Lt = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, P = {}, M = [];
class k extends Text {
}
const Rt = T("atomico/id"), S = T("atomico/type"), L = T("atomico/ref"), W = T("atomico/vnode"), It = () => {
};
function jt(e, t, n) {
  return v(this, e, t, n);
}
const x = (e, t, ...n) => {
  const s = t || P;
  let { children: o } = s;
  if (o = o ?? (n.length ? n : M), e === It)
    return o;
  const r = e ? e instanceof Node ? 1 : (
    //@ts-ignore
    e.prototype instanceof HTMLElement && 2
  ) : 0;
  if (r === !1 && e instanceof Function)
    return e(
      o != M ? { children: o, ...s } : s
    );
  const l = O.render || jt;
  return {
    [S]: W,
    type: e,
    props: s,
    children: o,
    key: s.key,
    // key for lists by keys
    // define if the node declares its shadowDom
    shadow: s.shadowDom,
    // allows renderings to run only once
    static: s.staticNode,
    // defines whether the type is a childNode `1` or a constructor `2`
    raw: r,
    // defines whether to use the second parameter for document.createElement
    is: s.is,
    // clone the node if it comes from a reference
    clone: s.cloneNode,
    render: l
  };
};
function v(e, t, n = Rt, s, o) {
  let r;
  if (t && t[n] && t[n].vnode == e || e[S] != W)
    return t;
  (e || !t) && (o = o || e.type == "svg", r = e.type != "host" && (e.raw == 1 ? (t && e.clone ? t[L] : t) != e.type : e.raw == 2 ? !(t instanceof e.type) : t ? t[L] || t.localName != e.type : !t), r && e.type != null && (e.raw == 1 && e.clone ? (s = !0, t = e.type.cloneNode(!0), t[L] = e.type) : t = e.raw == 1 ? e.type : e.raw == 2 ? new e.type() : o ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    e.type
  ) : document.createElement(
    e.type,
    e.is ? { is: e.is } : void 0
  )));
  const l = t[n] ? t[n] : P, { vnode: m = P, cycle: a = 0 } = l;
  let { fragment: f, handlers: i } = l;
  const { children: u = M, props: c = P } = m;
  if (i = r ? {} : i || {}, e.static && !r)
    return t;
  if (e.shadow && !t.shadowRoot && // @ts-ignore
  t.attachShadow({ mode: "open", ...e.shadow }), e.props != c && wt(t, c, e.props, i, o), e.children !== u) {
    const h = e.shadow ? t.shadowRoot : t;
    f = kt(
      e.children,
      /**
       * @todo for hydration use attribute and send childNodes
       */
      f,
      h,
      n,
      // add support to foreignObject, children will escape from svg
      !a && s,
      o && e.type == "foreignObject" ? !1 : o
    );
  }
  return t[n] = { vnode: e, handlers: i, fragment: f, cycle: a + 1 }, t;
}
function Mt(e, t) {
  const n = new k(""), s = new k("");
  let o;
  if (e[t ? "prepend" : "append"](n), t) {
    let { lastElementChild: r } = e;
    for (; r; ) {
      const { previousElementSibling: l } = r;
      if (I(r, !0) && !I(l, !0)) {
        o = r;
        break;
      }
      r = l;
    }
  }
  return o ? o.before(s) : e.append(s), {
    markStart: n,
    markEnd: s
  };
}
function kt(e, t, n, s, o, r) {
  e = e == null ? null : rt(e) ? e : [e];
  const l = t || Mt(n, o), { markStart: m, markEnd: a, keyes: f } = l;
  let i;
  const u = f && /* @__PURE__ */ new Set();
  let c = m;
  if (e && X(e, (h) => {
    if (typeof h == "object" && !h[S])
      return;
    const p = h[S] && h.key, E = f && p != null && f.get(p);
    c != a && c === E ? u.delete(c) : c = c == a ? a : c.nextSibling;
    const d = f ? E : c;
    let b = d;
    if (h[S])
      b = v(h, d, s, o, r);
    else {
      const _ = h + "";
      !(b instanceof Text) || b instanceof k ? b = new Text(_) : b.data != _ && (b.data = _);
    }
    b != c && (f && u.delete(b), !d || f ? (n.insertBefore(b, c), f && c != a && u.add(c)) : d == a ? n.insertBefore(b, a) : (n.replaceChild(b, d), c = b)), p != null && (i = i || /* @__PURE__ */ new Map(), i.set(p, b));
  }), c = c == a ? a : c.nextSibling, t && c != a)
    for (; c != a; ) {
      const h = c;
      c = c.nextSibling, h.remove();
    }
  return u && u.forEach((h) => h.remove()), l.keyes = i, l;
}
function wt(e, t, n, s, o) {
  for (const r in t)
    !(r in n) && $(e, r, t[r], null, o, s);
  for (const r in n)
    $(e, r, t[r], n[r], o, s);
}
function $(e, t, n, s, o, r) {
  if (t = t == "class" && !o ? "className" : t, n = n ?? null, s = s ?? null, t in e && Ot[t] && (n = e[t]), !(s === n || Lt[t] || t[0] == "_"))
    if (e.localName === "slot" && t === "assignNode" && "assign" in e)
      e.assign(s);
    else if (t[0] == "o" && t[1] == "n" && (y(s) || y(n)))
      Dt(e, t.slice(2), s, r);
    else if (t == "ref")
      s && (y(s) ? s(e) : s.current = e);
    else if (t == "style") {
      const { style: l } = e;
      n = n || "", s = s || "";
      const m = N(n), a = N(s);
      if (m)
        for (const f in n)
          if (a)
            !(f in s) && B(l, f, null);
          else
            break;
      if (a)
        for (const f in s) {
          const i = s[f];
          m && n[f] === i || B(l, f, i);
        }
      else
        l.cssText = s;
    } else {
      const l = t[0] == "$" ? t.slice(1) : t;
      l === t && (!o && !_t[t] && t in e || y(s) || y(n)) ? e[t] = s ?? "" : s == null ? e.removeAttribute(l) : e.setAttribute(
        l,
        N(s) ? JSON.stringify(s) : s
      );
    }
}
function Dt(e, t, n, s) {
  if (s.handleEvent || (s.handleEvent = (o) => s[o.type].call(e, o)), n) {
    if (!s[t]) {
      const o = n.capture || n.once || n.passive ? Object.assign({}, n) : null;
      e.addEventListener(t, s, o);
    }
    s[t] = n;
  } else
    s[t] && (e.removeEventListener(t, s), delete s[t]);
}
function B(e, t, n) {
  let s = "setProperty";
  n == null && (s = "removeProperty", n = null), ~t.indexOf("-") ? e[s](t, n) : e[t] = n;
}
const $t = x("host", { style: "display: contents" }), V = "value", Bt = (e, t) => {
  const n = z(), s = nt();
  Nt(
    () => q(
      n.current,
      "ConnectContext",
      /**
       * @param {CustomEvent<import("context").DetailConnectContext>} event
       */
      (o) => {
        o.composedPath().at(0) !== o.currentTarget && e === o.detail.id && (o.stopPropagation(), o.detail.connect(s));
      }
    ),
    [e]
  ), s.current = t;
}, zt = (e) => {
  const t = Pt("ConnectContext", {
    bubbles: !0,
    composed: !0
  }), [n, s] = Ct(() => {
    if (O.ssr)
      return;
    let r;
    return t({
      id: e,
      /**
       * @param {import("core").Ref} parentContext
       */
      connect(l) {
        r = l;
      }
    }), r;
  }), o = J();
  return D(() => {
    At.then(
      () => t({
        id: e,
        connect: s
      })
    );
  }, [e]), D(() => {
    if (n)
      return n.on(o);
  }, [n]), n?.current || e[V];
}, w = (e) => {
  const t = yt(
    ({ value: n }) => (Bt(t, n), $t),
    {
      props: {
        value: {
          type: Object,
          value: () => e
        }
      }
    }
  );
  return t[V] = e, t;
};
w({
  /**
   *
   * @param {string} type
   * @param {string} id
   */
  dispatch(e, t) {
  }
});
const F = {};
function Jt(e, ...t) {
  const n = (e.raw || e).reduce(
    (s, o, r) => s + o + (t[r] || ""),
    ""
  );
  return F[n] = F[n] || Ft(n);
}
function Ft(e) {
  if (O.sheet) {
    const t = new CSSStyleSheet();
    return t.replaceSync(e), t;
  } else {
    const t = document.createElement("style");
    return t.textContent = e, t;
  }
}
const Ht = (e, t, n) => (t == null ? t = { key: n } : t.key = n, x(e, t)), Kt = Ht, Yt = w({
  locale: "es",
  trans: (e) => e
});
customElements.define("ptp-lang-context", Yt);
const Xt = w({
  positions: [],
  mask: "*",
  length: 4,
  theming: null
});
export {
  Xt as C,
  Yt as L,
  k as M,
  yt as a,
  Ct as b,
  Jt as c,
  Pt as d,
  D as e,
  Ht as f,
  z as g,
  Ut as h,
  Tt as i,
  Kt as j,
  Bt as k,
  Nt as l,
  zt as m,
  nt as u
};
