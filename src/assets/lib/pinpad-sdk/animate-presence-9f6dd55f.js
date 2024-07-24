import { c as y, a as h, u as c, d as b, e as j, f as i } from "./config-90b4683c.js";
import { u as v } from "./index-52367e53.js";
function t({ open: n, from: a, to: o, startDelay: l, endDelay: f }) {
  const s = c(!1), r = c(), [e] = v(r), u = b("Leave"), d = () => {
    e.animate([
      a,
      o
    ], {
      duration: 300,
      fill: "forwards",
      delay: l
    }), s.current = !0;
  }, m = async () => {
    if (!s.current)
      return;
    const p = e.animate([
      o,
      a
    ], {
      duration: 300,
      fill: "forwards",
      delay: f
    });
    p.onfinish = () => {
      s.current = !1, u();
    };
  };
  return j(() => {
    e && (n ? d() : m());
  }, [e, n]), /* @__PURE__ */ i("host", { shadowDom: !0, children: /* @__PURE__ */ i("slot", { ref: r }) });
}
t.props = {
  open: Boolean,
  from: Object,
  to: Object,
  startDelay: Number,
  endDelay: Number
};
t.styles = y`:host{display:block}`;
const w = h(t);
customElements.define("animate-presence", w);
export {
  w as A
};
