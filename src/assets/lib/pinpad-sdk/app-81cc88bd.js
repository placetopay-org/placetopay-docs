import { c as f, a as h, k as r, L as g, C as b, f as l } from "./config-90b4683c.js";
const C = {
  placeholder: "Ingresa el Pin"
}, P = {
  modal: {
    title: "Ingresa tu Pin",
    close: "Cerrar"
  },
  number: {
    buttons: {
      confirm: "Confirmar",
      delete: "Borrar"
    }
  }
}, E = {
  input: C,
  panel: P
}, I = {
  placeholder: "Enter the Pin"
}, x = {
  modal: {
    title: "Enter your Pin",
    close: "Close"
  },
  number: {
    buttons: {
      confirm: "Confirm",
      delete: "Delete"
    }
  }
}, $ = {
  input: I,
  panel: x
}, L = {
  placeholder: "Insira o Pin"
}, N = {
  modal: {
    title: "Insira seu Pin",
    close: "Fechar"
  },
  number: {
    buttons: {
      confirm: "Confirmar",
      delete: "Apagar"
    }
  }
}, S = {
  input: L,
  panel: N
}, v = {
  placeholder: "Inserisci il Pin"
}, A = {
  modal: {
    title: "Inserisci il tuo Pin",
    close: "Chiudi"
  },
  number: {
    buttons: {
      confirm: "Conferma",
      delete: "Cancella"
    }
  }
}, j = {
  input: v,
  panel: A
}, a = {
  es: E,
  en: $,
  pt: S,
  it: j
};
function t({ locale: o = "es", positions: c, length: p, mask: u, theming: m = {} }) {
  return r(g, {
    locale: o,
    trans: (e) => {
      const d = a[o.slice(0, 2)] ?? a.en, s = e.split(".");
      let n = d[s[0]];
      return n === void 0 ? e : (s.slice(1).forEach((i) => {
        if (n[i] === void 0)
          return n = e;
        n = n[i];
      }), n);
    }
  }), r(b, {
    positions: c.split(",").map(Number),
    length: p,
    mask: u,
    theming: m
  }), /* @__PURE__ */ l("host", { shadowDom: !0, children: /* @__PURE__ */ l("slot", {}) });
}
t.props = {
  locale: String,
  positions: String,
  length: Number,
  mask: String,
  theming: Object
};
t.styles = f`:host{display:block}`;
const y = h(t), T = () => {
  customElements.get("ptp-pinpad-context") || customElements.define("ptp-pinpad-context", y);
};
export {
  y as App,
  T as define
};
