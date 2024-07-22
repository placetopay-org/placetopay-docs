const c = {
  modal: {
    "../components/number-pad/number-pad": () => import("./number-pad-c4c77f76.js"),
    "../components/panel-pad/panel-pad": () => import("./panel-pad-0a96c0d1.js"),
    "../components/pinpad-modal/pinpad-modal": () => import("./pinpad-modal-ebaa81b1.js")
  },
  static: {
    "../components/number-pad/number-pad": () => import("./number-pad-c4c77f76.js"),
    "../components/pinpad-static/pinpad-static": () => import("./pinpad-static-ebf8f744.js")
  },
  float: {
    "../components/number-pad/number-pad": () => import("./number-pad-c4c77f76.js"),
    "../components/pinpad-static/pinpad-static": () => import("./pinpad-static-ebf8f744.js"),
    "../components/pinpad-float/pinpad-float": () => import("./pinpad-float-0c39c0c2.js")
  }
};
class r {
  #t;
  constructor(t) {
    this.#t = t;
  }
  static make(t) {
    return new r(t);
  }
  define() {
    let t;
    const e = new Promise((n) => {
      t = n;
    }), i = c[this.#t], s = [
      import("./app-81cc88bd.js").then((n) => {
        n.define();
      }),
      import("./pinpad-f2b51611.js").then((n) => {
        n.define();
      })
    ];
    for (let n in i)
      s.push(
        i[n]().then((a) => {
          a.define();
        })
      );
    return Promise.all(s).then(() => {
      t();
    }), e;
  }
}
class d {
  #t;
  #e = /* @__PURE__ */ new Set();
  constructor(t) {
    this.#t = Object.assign({
      locale: document.documentElement.lang,
      mask: !0,
      mode: "modal",
      pinLength: 4,
      theming: null
    }, t ?? {});
  }
  get mask() {
    return typeof this.#t.mask == "string" ? this.#t.mask ?? "*" : this.#t.mask ? "*" : "";
  }
  destroy() {
    this.#e.forEach((t) => {
      document.querySelector(t).querySelector("ptp-pinpad-context").remove();
    }), this.#e.clear();
  }
  /**
   * Render the pinpad
   * 
   * @param element query selector to render the pinpad
   * @param positions positions to render number pad
   * @param onClean Deprecated: unused method
   * @param onBack callback to delete last character
   */
  render(t, e, i = () => {
  }, s = () => {
  }) {
    const n = document.querySelector(t);
    if (!n)
      return null;
    r.make(this.#t.mode).define().then(() => {
      this._render(n, e, s), this.#e.add(t);
    });
  }
  _setAttributes(t, e) {
    t.setAttribute("locale", this.#t.locale), t.setAttribute("mask", this.mask), t.setAttribute("length", this.#t.pinLength.toString()), t.setAttribute("positions", e), this.#t.theming && t.setAttribute("theming", JSON.stringify(this.#t.theming));
  }
  _renderModal() {
    return document.createElement("ptp-pinpad-modal");
  }
  _renderStatic(t) {
    const e = document.createElement("ptp-pinpad-static");
    return e.addEventListener("Delete", t), e;
  }
  _renderFloat(t) {
    const e = document.createElement("ptp-pinpad-float");
    return e.addEventListener("Delete", t), e;
  }
  _render(t, e, i = () => {
  }) {
    const s = document.createElement("ptp-pinpad-context");
    this._setAttributes(s, e);
    const n = document.createElement("ptp-pinpad");
    this.#t.pin && n.setAttribute("pin", this.#t.pin), n.setAttribute("mode", this.#t.mode), s.appendChild(n);
    let a;
    this.#t.mode === "modal" ? a = this._renderModal() : this.#t.mode === "static" ? a = this._renderStatic(i) : a = this._renderFloat(i), n.append(a), t.appendChild(s);
  }
}
class p {
  static async createTransaction(t, e) {
    const i = await fetch(`${t}/api/transaction`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + e
      }
    });
    if (!i.ok)
      throw new Error("Failed to create transaction");
    return {
      data: await i.json(),
      status: i.status,
      statusText: i.statusText,
      headers: i.headers
    };
  }
  static async encryptPin(t) {
    const e = await fetch(`${t.url}/api/pinblock-generator/${t.transactionId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + t.token,
        "Accept-Language": t.locale
      },
      body: JSON.stringify(t)
    });
    if (!e.ok)
      throw new Error("Failed to generate pinblock");
    return {
      data: await e.json(),
      status: e.status,
      statusText: e.statusText,
      headers: e.headers
    };
  }
}
class m {
  apiUrl;
  authToken;
  constructor(t, e) {
    this.apiUrl = t, this.authToken = e;
  }
  createTransaction() {
    return p.createTransaction(this.apiUrl, this.authToken);
  }
  generatePinBlock(t) {
    const e = {
      url: this.apiUrl,
      token: this.authToken,
      ...t
    };
    return p.encryptPin(e);
  }
}
export {
  d as PinPad,
  m as PinPadClient
};
