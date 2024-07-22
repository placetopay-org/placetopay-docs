import { c as l, a as p, d as t, f as e } from "./config-90b4683c.js";
import { NumberPad as m } from "./number-pad-c4c77f76.js";
import { c as f } from "./use-config-a62abe38.js";
function r({ resettable: i, disabled: o, open: n = !0 }) {
  const s = t("Pressed"), a = t("Confirm"), d = t("Delete");
  return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ e("div", { class: f("grid-animation", n ? "open" : "close"), children: /* @__PURE__ */ e("div", { style: "overflow-y: hidden;", children: /* @__PURE__ */ e("div", { class: "container", children: /* @__PURE__ */ e(
    m,
    {
      resettable: i,
      disabled: o,
      hideHelpText: !0,
      onPressed: (c) => s({ value: c.detail.value }),
      onConfirm: a,
      onDelete: d
    }
  ) }) }) }) });
}
r.props = {
  open: Boolean,
  resettable: {
    type: Boolean,
    reflect: !0
  },
  disabled: {
    type: Boolean,
    reflect: !0
  }
};
r.styles = l`:host{display:block;--margin-top: .5rem}*,*:before,*:after{box-sizing:border-box}.grid-animation{display:grid;transition-property:grid-template-rows;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.3s}.grid-animation.open{grid-template-rows:1fr}.grid-animation.close{grid-template-rows:0fr}.container{background-color:#fff;padding:.5rem;border-radius:.75rem;border:1px;border-style:solid;border-color:#0000000d;margin-top:var(--margin-top)}`;
const u = p(r), y = () => {
  customElements.get("ptp-pinpad-static") || customElements.define("ptp-pinpad-static", u);
};
export {
  u as PinpadStatic,
  y as define
};
