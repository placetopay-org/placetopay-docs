import { c as y, a as L, u as x, b as S, h as j, e as s, f as i, j as k } from "./config-90b4683c.js";
import { u as A } from "./index-52367e53.js";
import { u as D, a as P, c as E } from "./use-config-a62abe38.js";
import { u as R } from "./index-8865ab9c.js";
const C = (a, t) => t ? `${a}: ${t};` : !1;
function p({ pin: a = "", mode: t }) {
  const f = x(), b = x(), [e] = A(b), [r, l] = S(a), { length: n, theming: h } = D(), w = P(), m = (o) => {
    l((d) => d.length >= n ? d : d + o.detail.value);
  }, u = j((o) => {
    t !== "modal" && r.length < n || (t === "modal" && l(o.detail.pin), c());
  }, [e, r, n, t]), g = () => {
    l((o) => o.slice(0, -1));
  }, v = () => {
    e.setAttribute("open", !0);
  }, c = () => {
    e.setAttribute("open", !1);
  };
  return s(() => {
    if (e && t !== "modal")
      return e.addEventListener("Pressed", m), e.addEventListener("Delete", g), () => {
        e.removeEventListener("Pressed", m), e.removeEventListener("Delete", g);
      };
  }, [e, t]), s(() => {
    if (e && !(t !== "modal" && t !== "float"))
      return e.addEventListener("Close", c), () => {
        e.removeEventListener("Close", c);
      };
  }, [e, t]), s(() => {
    if (e)
      return e.addEventListener("Confirm", u), () => {
        e.removeEventListener("Confirm", u);
      };
  }, [e, u]), s(() => {
    !e || t === "modal" || (e.setAttribute("disabled", r.length === n), e.setAttribute("resettable", !!r.length));
  }, [r, t, e]), R(f, ["Space"], (o) => {
    o.type === "keyup" && v();
  }), /* @__PURE__ */ i("host", { shadowDom: !0, style: E(
    C("--input-border-color-focus", h?.inputBorderColorFocus),
    C("--input-border-color-focus-shadow", h?.inputOutlineColorFocus)
  ), children: /* @__PURE__ */ k("div", { class: "container", children: [
    /* @__PURE__ */ i(
      "div",
      {
        class: "input-container",
        onclick: v,
        children: /* @__PURE__ */ i(
          "input",
          {
            ref: f,
            id: "pin",
            name: "pin",
            type: "password",
            value: r,
            maxLength: n,
            minLength: n,
            class: E("input", t),
            readOnly: !0,
            placeholder: w("input.placeholder")
          }
        )
      }
    ),
    /* @__PURE__ */ i("slot", { ref: b })
  ] }) });
}
p.props = {
  pin: String,
  mode: String
};
p.styles = y`:host{font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";display:block;--input-border-color-focus: rgba(17, 24, 39, 1);--input-border-color-focus-shadow: rgba(209, 213, 219, 1)}*,*:before,*:after{box-sizing:border-box}.container{max-width:300px}.input-container{cursor:text}.input{width:100%;padding:.5rem .75rem;border-radius:8px;border:1px rgba(209,213,219,1) solid;font-size:1rem;line-height:1.5rem;font-weight:400;background-color:#fff}.input:focus,.input:focus-visible,.input:focus-within{outline:none;border-color:var(--input-border-color-focus);box-shadow:0 0 0 3px var(--input-border-color-focus-shadow)}.input:invalid{border-color:#ef4444;box-shadow:0 0 0 3px #ffd4d4}.input:disabled{color:#f9fafb;background-color:#d1d5db}.input.static{pointer-events:none}`;
const z = L(p), U = () => {
  customElements.get("ptp-pinpad") || customElements.define("ptp-pinpad", z);
};
export {
  z as Pinpad,
  U as define
};
