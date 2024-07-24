import { c as C, a as E, b as w, d as c, i as L, e as j, f as t, j as o } from "./config-90b4683c.js";
import { u as S, a as z, c as a } from "./use-config-a62abe38.js";
function l({ mode: n, disabled: d, resettable: v, hideHelpText: p = !1 }) {
  const [m, u] = w(!1), [f, h] = w(!0), { mask: s, positions: b } = S(), g = z(), y = c("Pressed"), x = c("Confirm"), M = c("Delete"), k = L(
    () => !m && f && s ? s.repeat(10).split("") : b,
    [m, f, s, b]
  ), i = (e) => {
    u(!e.matches);
  };
  return j(() => {
    if (!("matchMedia" in window))
      return;
    const e = window.matchMedia("(min-width: 768px)");
    return "addEventListener" in e ? e.addEventListener("change", i) : e.addListener(i), u(!e.matches), () => {
      "removeEventListener" in e ? e.removeEventListener("change", i) : e.removeListener(i);
    };
  }, []), /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ o("div", { class: a("container", n), onmouseenter: () => h(!1), onmouseleave: () => h(!0), children: [
    k.map((e, r) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onclick: () => y({ value: r }),
        class: a(
          "number-pad",
          r === 0 && "top-left",
          r === 2 && "top-right",
          r === 9 ? "pad-9" : "-pad-9",
          r !== 2 && r !== 5 && r !== 8 && "pad-right",
          n
        ),
        disabled: d,
        children: e
      }
    )),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        disabled: !d,
        class: a("icon-pad confirm", n),
        onclick: x,
        children: [
          /* @__PURE__ */ o("svg", { class: "icon confirm", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ t(
              "path",
              {
                fill: "currentColor",
                d: "M11.68 15.37c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l2.03-2.03-2.03-2.03a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.56 2.56c.29.29.29.77 0 1.06l-2.56 2.56c-.14.15-.34.22-.53.22"
              }
            ),
            /* @__PURE__ */ t(
              "path",
              {
                fill: "currentColor",
                d: "M14.17 12.81H4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10.17c.41 0 .75.34.75.75s-.34.75-.75.75"
              }
            ),
            /* @__PURE__ */ t(
              "path",
              {
                fill: "currentColor",
                d: "M12 20.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75c4.27 0 7.25-2.98 7.25-7.25S16.27 4.75 12 4.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75c5.15 0 8.75 3.6 8.75 8.75s-3.6 8.75-8.75 8.75"
              }
            )
          ] }),
          /* @__PURE__ */ t("span", { class: p && "sr-only", children: g("panel.number.buttons.confirm") })
        ]
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        disabled: !v,
        class: a("icon-pad cancel", n),
        onclick: M,
        children: [
          /* @__PURE__ */ o("svg", { class: "icon cancel", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ t(
              "path",
              {
                fill: "currentColor",
                d: "M17 21h-6.72c-1.62 0-3.17-.69-4.25-1.88L2.5 15.24a4.783 4.783 0 0 1 0-6.47l3.53-3.88A5.73 5.73 0 0 1 10.28 3H17c3.17 0 5.75 2.58 5.75 5.75v6.5c0 3.17-2.58 5.75-5.75 5.75M10.28 4.5c-1.19 0-2.34.51-3.14 1.39L3.6 9.78a3.3 3.3 0 0 0 0 4.45l3.53 3.88c.8.88 1.95 1.39 3.14 1.39H17a4.26 4.26 0 0 0 4.25-4.25v-6.5A4.26 4.26 0 0 0 17 4.5z"
              }
            ),
            /* @__PURE__ */ t(
              "path",
              {
                fill: "currentColor",
                d: "M16 15.22c-.19 0-.38-.07-.53-.22l-4.94-4.95a.755.755 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l4.94 4.95c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
              }
            ),
            /* @__PURE__ */ t(
              "path",
              {
                fill: "currentColor",
                d: "M11.06 15.22c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06L15.47 9c.29-.29.77-.29 1.06 0s.29.77 0 1.06L11.59 15c-.15.15-.34.22-.53.22"
              }
            )
          ] }),
          /* @__PURE__ */ t("span", { class: p && "sr-only", children: g("panel.number.buttons.delete") })
        ]
      }
    )
  ] }) });
}
l.props = {
  mode: {
    type: String,
    value: "fit",
    reflect: !0
  },
  resettable: {
    type: Boolean,
    reflect: !0
  },
  disabled: {
    type: Boolean,
    reflect: !0
  },
  hideHelpText: {
    type: Boolean
  }
};
l.styles = C`:host{font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";display:block}.container{display:grid;overflow-x:auto;grid-template-columns:repeat(3,minmax(0,1fr));font-size:1.25rem;line-height:1.75rem;color:#111827;background-color:#fff}.container.full{width:100%}.container.fit{min-width:fit-content}button{cursor:pointer}button:disabled{cursor:not-allowed;pointer-events:none}.number-pad{font-size:1.25rem;line-height:1.75rem;vertical-align:middle;padding:1.5rem;border-width:0;border-color:#e5e7eb;border-style:inset;text-align:center;background-color:#fff;transition-property:color,background-color;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.45s}.number-pad:hover{background-color:#f3f4f6}.number-pad.fit{padding:1.1rem}.number-pad.top-left{border-top-left-radius:.25rem}.number-pad.top-right{border-top-right-radius:.25rem}.pad-right{border-right-width:1px}.-pad-9{border-bottom-width:1px}.pad-9{z-index:10;grid-column-start:2;border-left-width:1px;margin-left:-1px;border-left-style:outset}.icon-pad{display:flex;flex-direction:column;gap:.25rem;justify-content:center;align-items:center;border-style:none;background-color:#fff;transition-property:color,background-color;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.3s}.icon-pad:hover{background-color:#f3f4f6}.icon-pad.full{padding:.75rem}.icon-pad.fit{padding:.5rem 1.5rem}.icon-pad.confirm{color:#10b981;border-bottom-right-radius:.25rem}.icon-pad.confirm:hover{border-bottom-right-radius:.25rem}.icon-pad.cancel{color:#dc2626;grid-column-start:1;grid-row-start:4}.icon-pad.cancel:hover{border-right-width:1px;border-bottom-left-radius:.25rem}.icon-pad:disabled{color:#9ca3af;cursor:not-allowed;pointer-events:none}svg.icon{width:2rem;height:2rem}svg.icon.confirm{margin-right:-.125rem}svg.icon.cancel{margin-left:-.25rem}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}@media (min-width: 768px){.container{max-width:20rem}}`;
const B = E(l), D = () => {
  customElements.get("ptpi-number-pad") || customElements.define("ptpi-number-pad", B);
};
export {
  B as NumberPad,
  D as define
};
