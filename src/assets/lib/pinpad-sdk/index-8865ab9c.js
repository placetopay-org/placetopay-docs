import { u as p } from "./config-90b4683c.js";
import { a as y, b as s } from "./index-52367e53.js";
function l(t) {
  const r = p();
  return r.current = t, r;
}
function K(t, r, f) {
  const u = l(f);
  y(() => {
    const { current: o } = t;
    if (!o)
      return;
    const n = /* @__PURE__ */ new Set(), c = () => {
      if (r.length == n.size && [...n].every((d, m) => d == r[m]))
        return !0;
    }, a = s(o, "keydown", (e) => {
      n.add(e.code), c() && u.current(e);
    }), i = s(o, "keyup", (e) => {
      c() && u.current(e), n.delete(e.code);
    });
    return () => {
      a(), i();
    };
  }, [t]);
}
export {
  K as u
};
