import { c as v, a as y, g as k, u as P, b as g, d as n, h as E, e as d, f as r } from "./config-90b4683c.js";
import { PinpadStatic as w } from "./pinpad-static-ebf8f744.js";
import { A as x } from "./animate-presence-9f6dd55f.js";
import "./number-pad-c4c77f76.js";
import "./use-config-a62abe38.js";
import "./index-52367e53.js";
function i({ resettable: u, disabled: f, open: e = !1 }) {
  const t = k(), s = P(!1), [c, l] = g(!1), p = n("Pressed"), m = n("Confirm"), h = n("Delete"), b = n("Close"), a = E((o) => {
    if (!t.current)
      return;
    if (o.target !== t.current && !o.composedPath().includes(t.current) && s.current) {
      b(), s.current = !1;
      return;
    }
    s.current = !0;
  }, [t, c]), C = () => {
    m(), s.current = !1;
  };
  return d(() => {
    e && l(!0);
  }, [e]), d(() => {
    if (e)
      return document.addEventListener("click", a), () => {
        document.removeEventListener("click", a);
      };
  }, [e, a]), /* @__PURE__ */ r("host", { shadowDom: !0, style: { display: c ? "block" : "none" }, children: /* @__PURE__ */ r(x, { open: e, from: { opacity: 0 }, to: { opacity: 1 }, onLeave: () => {
    l(!1);
  }, children: /* @__PURE__ */ r("div", { class: "container", children: /* @__PURE__ */ r(
    w,
    {
      open: !0,
      resettable: u,
      disabled: f,
      onPressed: (o) => p({ value: o.detail.value }),
      onConfirm: C,
      onDelete: h
    }
  ) }) }) });
}
i.props = {
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
i.styles = v`:host{display:block;position:relative}*,*:before,*:after{box-sizing:border-box}.container{position:absolute;width:15rem;z-index:50}`;
const D = y(i), j = () => {
  customElements.get("ptp-pinpad-float") || customElements.define("ptp-pinpad-float", D);
};
export {
  D as PinpadFloat,
  j as define
};
