import { c, a as p, u as f, b as u, d as r, e as b, j as h, f as o } from "./config-90b4683c.js";
import { PanelPad as y } from "./panel-pad-0a96c0d1.js";
import { A as n } from "./animate-presence-9f6dd55f.js";
import { u as x } from "./index-8865ab9c.js";
import "./number-pad-c4c77f76.js";
import "./use-config-a62abe38.js";
import "./index-52367e53.js";
function s({ open: e = !1 }) {
  const d = f(document.documentElement), [l, a] = u(!1), m = r("Confirm"), t = r("Close");
  return b(() => {
    e && a(!0);
  }, [e]), x(d, ["Escape"], (i) => {
    i.type === "keydown" || !e || t();
  }), /* @__PURE__ */ h("host", { shadowDom: !0, style: { display: l ? "block" : "none" }, children: [
    /* @__PURE__ */ o(n, { from: { opacity: 0 }, to: { opacity: 0.75 }, open: e, endDelay: 300, onLeave: () => {
      a(!1);
    }, children: /* @__PURE__ */ o("div", { class: "backdrop", onclick: t }) }),
    /* @__PURE__ */ o(n, { from: { opacity: 0 }, to: { opacity: 1 }, open: e, children: /* @__PURE__ */ o("div", { class: "container", children: /* @__PURE__ */ o("div", { class: "modal", children: /* @__PURE__ */ o(
      y,
      {
        onCancel: t,
        onConfirm: (i) => m({ pin: i.detail.pin })
      }
    ) }) }) })
  ] });
}
s.props = {
  open: Boolean
};
s.styles = c`:host{display:block;position:fixed}*,*:before,*:after{box-sizing:border-box}.backdrop{position:fixed;inset:0;z-index:999;height:100vh;background-color:#6b7280;opacity:.75}.container{overflow-y:auto;position:fixed;inset:0;z-index:999}.modal{overflow:hidden;position:absolute;z-index:999;border-top-left-radius:.75rem;border-top-right-radius:.75rem;width:100%;bottom:0}@media (min-width: 768px){.modal{border-bottom-right-radius:.75rem;border-bottom-left-radius:.75rem;max-width:20rem;bottom:auto;top:50%;left:50%;transform:translateY(-50%) translate(-50%)}}`;
const w = p(s), j = () => {
  customElements.get("ptp-pinpad-modal") || customElements.define("ptp-pinpad-modal", w);
};
export {
  w as PinpadModal,
  j as define
};
