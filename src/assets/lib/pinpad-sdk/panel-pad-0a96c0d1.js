import { c as f, a as g, b as y, d as a, f as e, j as d } from "./config-90b4683c.js";
import { NumberPad as b } from "./number-pad-c4c77f76.js";
import { u as w, a as v } from "./use-config-a62abe38.js";
function r() {
  const [n, s] = y(""), { length: t } = w(), l = v(), c = a("Confirm"), p = a("Cancel"), m = (i) => {
    n.length >= t || s((o) => o + i);
  }, h = () => {
    n.length < t || c({ pin: n });
  }, u = () => {
    s((i) => i.slice(0, -1));
  };
  return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ d("div", { class: "container", children: [
    /* @__PURE__ */ e("h3", { class: "title", children: l("panel.modal.title") }),
    /* @__PURE__ */ d("div", { role: "button", type: "button", class: "icon-close", onclick: p, children: [
      /* @__PURE__ */ e("span", { class: "sr-only", children: l("panel.modal.close") }),
      /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", children: /* @__PURE__ */ e("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18 18 6M6 6l12 12" }) })
    ] }),
    /* @__PURE__ */ e("div", { class: "container-display", children: Array.from({ length: t }).map((i, o) => /* @__PURE__ */ e("div", { class: "display", children: /* @__PURE__ */ e("span", { class: o < n.length ? "filled" : "unfilled", children: "•" }) })) }),
    /* @__PURE__ */ e("div", { class: "container-pad", children: /* @__PURE__ */ e(
      b,
      {
        mode: "full",
        resettable: !!n.length,
        disabled: n.length === t,
        onPressed: (i) => m(i.detail.value),
        onConfirm: h,
        onDelete: u
      }
    ) })
  ] }) });
}
r.props = {};
r.styles = f`:host{display:block;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}ptpi-number-pad{width:100%}.container-pad{display:flex;padding:.75rem;justify-content:center;align-items:center}.icon-close{position:absolute;top:1rem;right:1rem;cursor:pointer}.icon-close svg{width:1.5rem;height:1.5rem;color:#6b7280}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}h3.title{padding:1.5rem;padding-bottom:0;font-size:1rem;line-height:1.5rem;font-weight:500;text-align:center;margin:0}.container{position:relative;width:100%;background-color:#fff}.container-display{display:flex;padding:.75rem;padding-bottom:0;gap:2.5rem;justify-content:center;align-items:center}.container-display>div{padding:10px}.container-display>div>span{font-size:1.875rem;line-height:2.25rem;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.3s}.container-display span.filled{color:#111827}.container-display span.unfilled{color:#e5e7eb}@media (min-width: 768px){.container-display{gap:1rem}}`;
const x = g(r), E = () => {
  customElements.get("ptpi-panel-pad") || customElements.define("ptpi-panel-pad", x);
};
export {
  x as PanelPad,
  E as define
};
