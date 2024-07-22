import { g as l, l as i, b as f, M as d } from "./config-90b4683c.js";
const p = (n, e) => {
  const t = l();
  i(() => {
    let o = !1, s, r = () => {
      s && s(), s = null;
    };
    const a = async () => {
      o || (o = !0, await t.current.updated, r(), o = !1, s = n());
    }, u = e.map((c) => c?.on(a));
    return t.once || (t.once = !0, a()), () => {
      u.map((c) => c && c()), r();
    };
  }, e);
};
function h(n, e, t, o) {
  return n.addEventListener(e, t, o), () => n.removeEventListener(e, t);
}
function v(n, e) {
  const [t, o] = f([]);
  return p(() => {
    const { current: s } = n;
    if (!s)
      return;
    const r = () => o(s.assignedNodes().filter((a) => !(a instanceof d) && (e ? e(a) : !0)));
    return r(), h(s, "slotchange", r);
  }, [n]), t;
}
export {
  p as a,
  h as b,
  v as u
};
