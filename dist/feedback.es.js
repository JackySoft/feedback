function N() {
}
function oe(e) {
  return e();
}
function ee() {
  return /* @__PURE__ */ Object.create(null);
}
function X(e) {
  e.forEach(oe);
}
function ue(e) {
  return typeof e == "function";
}
function Ae(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
let G;
function U(e, t) {
  return G || (G = document.createElement("a")), G.href = t, e === G.href;
}
function de(e) {
  return Object.keys(e).length === 0;
}
function s(e, t) {
  e.appendChild(t);
}
function V(e, t, n) {
  e.insertBefore(t, n || null);
}
function Q(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function he(e, t) {
  for (let n = 0; n < e.length; n += 1)
    e[n] && e[n].d(t);
}
function f(e) {
  return document.createElement(e);
}
function z(e) {
  return document.createTextNode(e);
}
function S() {
  return z(" ");
}
function x(e, t, n, l) {
  return e.addEventListener(t, n, l), () => e.removeEventListener(t, n, l);
}
function c(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function ge(e) {
  return Array.from(e.childNodes);
}
function te(e, t) {
  t = "" + t, e.data !== t && (e.data = t);
}
function ne(e, t) {
  e.value = t ?? "";
}
function P(e, t, n, l) {
  n == null ? e.style.removeProperty(t) : e.style.setProperty(t, n, l ? "important" : "");
}
function le(e, t, n) {
  e.classList[n ? "add" : "remove"](t);
}
let J;
function T(e) {
  J = e;
}
function me() {
  if (!J)
    throw new Error("Function called outside component initialization");
  return J;
}
function pe(e) {
  me().$$.on_mount.push(e);
}
const Y = [], ce = [];
let R = [];
const ie = [], be = /* @__PURE__ */ Promise.resolve();
let Z = !1;
function Ce() {
  Z || (Z = !0, be.then(ae));
}
function W(e) {
  R.push(e);
}
const K = /* @__PURE__ */ new Set();
let O = 0;
function ae() {
  if (O !== 0)
    return;
  const e = J;
  do {
    try {
      for (; O < Y.length; ) {
        const t = Y[O];
        O++, T(t), _e(t.$$);
      }
    } catch (t) {
      throw Y.length = 0, O = 0, t;
    }
    for (T(null), Y.length = 0, O = 0; ce.length; )
      ce.pop()();
    for (let t = 0; t < R.length; t += 1) {
      const n = R[t];
      K.has(n) || (K.add(n), n());
    }
    R.length = 0;
  } while (Y.length);
  for (; ie.length; )
    ie.pop()();
  Z = !1, K.clear(), T(e);
}
function _e(e) {
  if (e.fragment !== null) {
    e.update(), X(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(W);
  }
}
function ve(e) {
  const t = [], n = [];
  R.forEach((l) => e.indexOf(l) === -1 ? t.push(l) : n.push(l)), n.forEach((l) => l()), R = t;
}
const we = /* @__PURE__ */ new Set();
function ke(e, t) {
  e && e.i && (we.delete(e), e.i(t));
}
function ye(e, t, n, l) {
  const { fragment: i, after_update: A } = e.$$;
  i && i.m(t, n), l || W(() => {
    const r = e.$$.on_mount.map(oe).filter(ue);
    e.$$.on_destroy ? e.$$.on_destroy.push(...r) : X(r), e.$$.on_mount = [];
  }), A.forEach(W);
}
function je(e, t) {
  const n = e.$$;
  n.fragment !== null && (ve(n.after_update), X(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Ee(e, t) {
  e.$$.dirty[0] === -1 && (Y.push(e), Ce(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function Fe(e, t, n, l, i, A, r, h = [-1]) {
  const a = J;
  T(e);
  const o = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: A,
    update: N,
    not_equal: i,
    bound: ee(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (a ? a.$$.context : [])),
    // everything else
    callbacks: ee(),
    dirty: h,
    skip_bound: !1,
    root: t.target || a.$$.root
  };
  r && r(o.root);
  let _ = !1;
  if (o.ctx = n ? n(e, t.props || {}, (g, j, ...E) => {
    const b = E.length ? E[0] : j;
    return o.ctx && i(o.ctx[g], o.ctx[g] = b) && (!o.skip_bound && o.bound[g] && o.bound[g](b), _ && Ee(e, g)), j;
  }) : [], o.update(), _ = !0, X(o.before_update), o.fragment = l ? l(o.ctx) : !1, t.target) {
    if (t.hydrate) {
      const g = ge(t.target);
      o.fragment && o.fragment.l(g), g.forEach(Q);
    } else
      o.fragment && o.fragment.c();
    t.intro && ke(e.$$.fragment), ye(e, t.target, t.anchor, t.customElement), ae();
  }
  T(a);
}
class Se {
  $destroy() {
    je(this, 1), this.$destroy = N;
  }
  $on(t, n) {
    if (!ue(n))
      return N;
    const l = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return l.push(n), () => {
      const i = l.indexOf(n);
      i !== -1 && l.splice(i, 1);
    };
  }
  $set(t) {
    this.$$set && !de(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
function fe(e = {}) {
  let t = "";
  for (const n in e)
    t += `&${n}=${e[n]}`;
  return t ? t.slice(1) : "";
}
function Be(e = "", t = {}, n = {}) {
  let l = fe(t);
  l && (e += "?" + l);
  const i = {
    method: "GET",
    mode: "cors",
    credentials: "omit",
    ...n
  };
  return fetch(e, i).then((A) => A.json());
}
function Me(e = "", t = {}, n = {}) {
  const l = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    //请求的头信息
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/x-www-form-urlencoded"
    },
    body: fe(t),
    ...n
  };
  return fetch(e, l).then((i) => i.json());
}
function De(e = "", t, n = {}) {
  const l = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    body: t,
    ...n
  };
  return fetch(e, l).then((i) => i.json());
}
function se(e, t, n) {
  const l = e.slice();
  return l[22] = t[n], l;
}
function Le(e) {
  let t, n, l, i, A, r, h, a, o, _, g, j, E, b, B, y, m, C, v, H, M, L, q, I, u, F, w = (
    /*fileList*/
    e[8]
  ), p = [];
  for (let d = 0; d < w.length; d += 1)
    p[d] = re(se(e, w, d));
  return {
    c() {
      t = f("div"), n = f("div"), l = f("textarea"), i = S(), A = f("div"), r = z(
        /*inputErrorMsg*/
        e[5]
      ), h = S(), a = f("div"), o = f("div");
      for (let d = 0; d < p.length; d += 1)
        p[d].c();
      _ = S(), g = f("div"), j = f("div"), j.innerHTML = `<span style="font-size:18px">+</span> 
                <span>上传</span>`, E = S(), b = f("input"), B = S(), y = f("div"), m = z(
        /*uploadErrorMsg*/
        e[7]
      ), C = S(), v = f("div"), v.textContent = "非必填，支持格式：.jpg .png .gif .jpeg", H = S(), M = f("div"), L = f("button"), L.textContent = "关闭", q = S(), I = f("button"), I.textContent = "提交", c(l, "class", "input svelte-1ja09hp"), c(l, "rows", "5"), c(l, "placeholder", "请描述业务、制度、流程、产品等问题或建议，我们不断改进~"), c(A, "class", "error-tip svelte-1ja09hp"), c(n, "class", "form-item svelte-1ja09hp"), c(j, "class", "upload-wrap svelte-1ja09hp"), c(b, "type", "file"), c(b, "class", "file svelte-1ja09hp"), c(b, "accept", ".jpg,.jpeg,.png,.gif,.webp,.bmp"), c(g, "class", "upload svelte-1ja09hp"), c(o, "class", "upload-wraper svelte-1ja09hp"), c(y, "class", "error-tip svelte-1ja09hp"), c(v, "class", "tips svelte-1ja09hp"), c(a, "class", "form-item svelte-1ja09hp"), c(t, "class", "content svelte-1ja09hp"), c(L, "class", "feedback-btn cancel svelte-1ja09hp"), c(I, "class", "feedback-btn submit svelte-1ja09hp"), c(M, "class", "footer svelte-1ja09hp");
    },
    m(d, D) {
      V(d, t, D), s(t, n), s(n, l), ne(
        l,
        /*content*/
        e[4]
      ), s(n, i), s(n, A), s(A, r), s(t, h), s(t, a), s(a, o);
      for (let k = 0; k < p.length; k += 1)
        p[k] && p[k].m(o, null);
      s(o, _), s(o, g), s(g, j), s(g, E), s(g, b), s(a, B), s(a, y), s(y, m), s(a, C), s(a, v), V(d, H, D), V(d, M, D), s(M, L), s(M, q), s(M, I), u || (F = [
        x(
          l,
          "input",
          /*textarea_input_handler*/
          e[19]
        ),
        x(
          b,
          "change",
          /*input_change_handler*/
          e[20]
        ),
        x(
          b,
          "change",
          /*beforeUpload*/
          e[11]
        ),
        x(
          L,
          "click",
          /*close*/
          e[10]
        ),
        x(
          I,
          "click",
          /*submit*/
          e[12]
        )
      ], u = !0);
    },
    p(d, D) {
      if (D & /*content*/
      16 && ne(
        l,
        /*content*/
        d[4]
      ), D & /*inputErrorMsg*/
      32 && te(
        r,
        /*inputErrorMsg*/
        d[5]
      ), D & /*fileList*/
      256) {
        w = /*fileList*/
        d[8];
        let k;
        for (k = 0; k < w.length; k += 1) {
          const $ = se(d, w, k);
          p[k] ? p[k].p($, D) : (p[k] = re($), p[k].c(), p[k].m(o, _));
        }
        for (; k < p.length; k += 1)
          p[k].d(1);
        p.length = w.length;
      }
      D & /*uploadErrorMsg*/
      128 && te(
        m,
        /*uploadErrorMsg*/
        d[7]
      );
    },
    d(d) {
      d && Q(t), he(p, d), d && Q(H), d && Q(M), u = !1, X(F);
    }
  };
}
function Ie(e) {
  let t;
  return {
    c() {
      t = f("div"), t.innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAAHoD/pV5AcwAAAAJ0Uk5TAP9bkSK1AAABF0lEQVR4nGXSsUrEQBAG4H+iYDq1sxBPSeFLyF1A4V7qMFGvFCzueQ43h68hJthYJl0Crus/u2EjXqqvmPk3O7MCoCgSQICDbzSXilmNIVUUJVxCyA/LHkrRErBIcNwS3YloLVgtWBjCHoo2gW0CB/1EfDf7xXcD1YSj3qMRn8fECT6Y0RP8CTxjRL6VcNTVe4DNPv5hWL6K/4vupQxoZgjYzUesVyPSPsCdtoR9Km1WK27NsDSKrGYMwQLGaHHaM0axXjFGsZszRtFcMAb8je5508IRw91n7WHPrw2xMC7RAet19GB/r8d7Ba/8djPe/etMsT+fOLr9qcaBxxVMS4lriouLq/SJVf5n3fEBTE+CRVWuCM/mF6g+nHEWKW8lAAAAAElFTkSuQmCC" alt="成功" class="svelte-1ja09hp"/> 
        <p>提交成功、我们会认真思考和处理您反馈的内容。</p>`, P(t, "text-align", "center");
    },
    m(n, l) {
      V(n, t, l);
    },
    p: N,
    d(n) {
      n && Q(t);
    }
  };
}
function re(e) {
  let t, n, l, i, A, r;
  return {
    c() {
      t = f("div"), n = f("div"), l = f("a"), i = f("img"), U(i.src, A = /*item*/
      e[22].url) || c(i, "src", A), c(i, "alt", "反馈图片"), c(i, "class", "svelte-1ja09hp"), c(l, "href", r = /*item*/
      e[22].url), c(l, "target", "_blank"), c(n, "class", "upload-wrap svelte-1ja09hp"), c(t, "class", "upload svelte-1ja09hp");
    },
    m(h, a) {
      V(h, t, a), s(t, n), s(n, l), s(l, i);
    },
    p(h, a) {
      a & /*fileList*/
      256 && !U(i.src, A = /*item*/
      h[22].url) && c(i, "src", A), a & /*fileList*/
      256 && r !== (r = /*item*/
      h[22].url) && c(l, "href", r);
    },
    d(h) {
      h && Q(t);
    }
  };
}
function xe(e) {
  let t, n, l, i, A, r, h, a, o, _, g, j, E, b;
  function B(C, v) {
    return (
      /*showSuccess*/
      C[3] ? Ie : Le
    );
  }
  let y = B(e), m = y(e);
  return {
    c() {
      t = f("main"), n = f("div"), l = f("img"), A = S(), r = f("div"), h = f("div"), a = f("div"), a.textContent = "提交反馈", o = S(), _ = f("img"), j = S(), m.c(), U(l.src, i = /*icon*/
      e[1].url) || c(l, "src", i), P(
        l,
        "width",
        /*icon*/
        e[1].width + "px"
      ), P(
        l,
        "height",
        /*icon*/
        e[1].height + "px"
      ), c(n, "class", "feedback-icon svelte-1ja09hp"), c(
        n,
        "style",
        /*style*/
        e[0]
      ), c(a, "class", "title svelte-1ja09hp"), c(_, "class", "icon-close svelte-1ja09hp"), U(_.src, g = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAaxJREFUeF7tmWtuwzAMg9WTrTvZ1pNtu9mgoQGMrE0Vm1QCiwH6q7ItfqYfgi9W/LsU128CIAcUJ6AlUNwA2gS1BLQEihPQEihuAJ0CWgJaAhgCX2b2Y2afmO42e1nG+DYz/w19iCXgCX3cs7iRIbRjufj3IfVmkE2wTcrzYUGgjINwgIumJNfMLq1/FAAmBJp4TxoJgAGBKp4BAAmBLp4FAAEhRTwTwAiENPFsAD0QUsVnANgDIV18FoAIhEPEZwLYgnCY+GwAjyD4ff7a3PhY1+inJQP6IhSpTdYzvrRJF3+EAxaxXj63Mw+p7CL01zFyQA+1gTZr+5faA57t9iVOgVciX/0/YLrtphl7QFRcNA4Kgw1gr6i98cMwmAB6xfS264LBAjAqYrR9GAYDACp5VD+bMNAA0Emj+/sHAwmAlSyr3z8YKADUJJnvDggAbPGLbSnjIAC0lR27pG0hQCpIBAAva/1xNPN1+O3+BnmK1+HwmXvGQIQDzqgrnJMAhFFNGigHTDqxYVlyQBjVpIFywKQTG5YlB4RRTRooB0w6sWFZckAY1aSB5R3wC0zjdEHRE4J5AAAAAElFTkSuQmCC") || c(_, "src", g), c(_, "alt", "关闭"), c(h, "class", "header svelte-1ja09hp"), c(r, "class", "feedback-modal svelte-1ja09hp"), le(
        r,
        "fadeIn",
        /*visible*/
        e[2]
      );
    },
    m(C, v) {
      V(C, t, v), s(t, n), s(n, l), s(t, A), s(t, r), s(r, h), s(h, a), s(h, o), s(h, _), s(r, j), m.m(r, null), E || (b = [
        x(
          n,
          "click",
          /*show*/
          e[9]
        ),
        x(
          _,
          "click",
          /*close*/
          e[10]
        )
      ], E = !0);
    },
    p(C, [v]) {
      v & /*icon*/
      2 && !U(l.src, i = /*icon*/
      C[1].url) && c(l, "src", i), v & /*icon*/
      2 && P(
        l,
        "width",
        /*icon*/
        C[1].width + "px"
      ), v & /*icon*/
      2 && P(
        l,
        "height",
        /*icon*/
        C[1].height + "px"
      ), v & /*style*/
      1 && c(
        n,
        "style",
        /*style*/
        C[0]
      ), y === (y = B(C)) && m ? m.p(C, v) : (m.d(1), m = y(C), m && (m.c(), m.m(r, null))), v & /*visible*/
      4 && le(
        r,
        "fadeIn",
        /*visible*/
        C[2]
      );
    },
    i: N,
    o: N,
    d(C) {
      C && Q(t), m.d(), E = !1, X(b);
    }
  };
}
function Qe(e, t, n) {
  let { style: l } = t, { icon: i } = t, { uploadOption: A } = t, { submitOption: r } = t, { onMountFn: h } = t, { onClickIcon: a } = t, { onClickClose: o } = t, { onClickSubmit: _ } = t, g = !1, j = !1, E = "", b = "", B, y = "", m = [];
  const C = () => {
    n(2, g = !0), n(3, j = !1), a();
  }, v = () => {
    n(2, g = !1), n(5, b = ""), n(7, y = ""), n(8, m = []), o();
  };
  pe(() => {
    h();
  });
  const H = async (u) => {
    var p;
    console.log(u.target);
    const F = (p = u.target) == null ? void 0 : p.files[0];
    if (!(F.size / 1024 / 1024 < A.fileSize))
      return n(7, y = "图片大小超过限制"), !1;
    try {
      M(F);
    } catch {
      n(7, y = "服务异常，请稍候重试");
    }
    return !1;
  }, M = async (u) => {
    const F = new FormData();
    F.append("file", u);
    for (let w in A.data || {})
      F.append(w, A.data[w]);
    try {
      const w = await De(A.api, F);
      w.ret === 0 ? n(8, m = [
        ...m,
        {
          uid: "",
          name: u.name,
          status: "done",
          url: w.data.fileLink
        }
      ]) : n(7, y = w.msg);
    } catch {
      n(7, y = "服务异常，请稍候重试");
    }
  }, L = async () => {
    const u = {
      content: E,
      files: m.map((F) => F.url).join(","),
      ...r.data || {}
    };
    _();
    try {
      const F = r.method == "get" ? Be(r.api, u) : Me(r.api, u), { ret: w, msg: p } = await F;
      w === 0 ? (n(3, j = !0), n(5, b = ""), setTimeout(
        () => {
          v();
        },
        3e3
      )) : n(5, b = p);
    } catch {
      n(5, b = "服务异常，请稍候重试");
    }
  };
  function q() {
    E = this.value, n(4, E);
  }
  function I() {
    B = this.value, n(6, B);
  }
  return e.$$set = (u) => {
    "style" in u && n(0, l = u.style), "icon" in u && n(1, i = u.icon), "uploadOption" in u && n(13, A = u.uploadOption), "submitOption" in u && n(14, r = u.submitOption), "onMountFn" in u && n(15, h = u.onMountFn), "onClickIcon" in u && n(16, a = u.onClickIcon), "onClickClose" in u && n(17, o = u.onClickClose), "onClickSubmit" in u && n(18, _ = u.onClickSubmit);
  }, [
    l,
    i,
    g,
    j,
    E,
    b,
    B,
    y,
    m,
    C,
    v,
    H,
    L,
    A,
    r,
    h,
    a,
    o,
    _,
    q,
    I
  ];
}
class Oe extends Se {
  constructor(t) {
    super(), Fe(this, t, Qe, xe, Ae, {
      style: 0,
      icon: 1,
      uploadOption: 13,
      submitOption: 14,
      onMountFn: 15,
      onClickIcon: 16,
      onClickClose: 17,
      onClickSubmit: 18
    });
  }
}
const Ye = () => {
  document.body.querySelectorAll("[data-type=tool-feedback]").forEach((n) => {
    var l;
    (l = n.parentElement) == null || l.removeChild(n);
  });
  const e = document.createElement("div"), t = Number(Math.random().toString().slice(3, 3) + Date.now()).toString(36);
  return e.setAttribute("id", "tool-feedback-" + t), e.setAttribute("data-type", "tool-feedback"), document.body.appendChild(e), e;
}, Ve = (e) => {
  var t, n, l;
  if (!e)
    throw Error("缺少 [option] 配置参数");
  (t = e.icon) != null && t.url && (!((n = e.icon) != null && n.width) || !((l = e.icon) != null && l.height)) && console.warn("FeedBack：", "如果您要自定义图片地址，建议传对应的图片宽高.");
}, Re = {
  init(e) {
    if (Ve(e), typeof e.visible == "boolean" && e.visible === !1)
      return;
    const t = Ye();
    new Oe({
      target: t,
      props: {
        style: "right:15px;bottom:60px",
        icon: {
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAs5JREFUeF7tmtFxwjAMhu0wSykLlOtbYbLCZNC3Hl0A6Czgnk3MOcZJpBBZusY8co6t/4ukyJa1mvhPT1y/KgCKB0ycQAmBiTtASYKoEFgs3lfmcvl0XqP1itJ7tFLb4/mw6Vrjbo+1xZi91vqr75l4PjCAxXy5MUrdxGf6nc6HVvva7IGAC80HAXhYzJg9NQM9m22Px+/kOkl7Qo80Zn/6/VlDbAQBeJ0vjZ8MSxhiBGZMLF5X1dqCcuFwve6wdvYCCBeUKt6LfoBQw+kCjALQFZOYtzhkbDLmE64eQvDe8RSA15e3ncv4iLgaIrAz28cJ2OYgH/ORXViP7fUAbgBtMX+3y5KrIZCEACeANvHeW2IIYW0CzVdiPaBPfBKC/xMRriIBQMVbvbHbY3OVOAA5xbuKvi9j58wBucWLAsAhXgwALvEiAHCKZwdAKd5+Hdp2k6jtMFUSJBVfl86QYojlK0Ap3r7d+/YdUBBlB0AtXjSAHOLFAsglXiSAnOLFAcgtXhQADvGiAISnyXXVlWx2PLuljTd0Ij6D0MbF2OLFeEDjcLKq1qkzewrxYgDEbphqXDRabYCqre/s4n5M5hs5gDlJKsHG2XzQ5Hx44wPO8CAQ2HNA6mzeincn2La7PLCPBxEvIgQaCdA3UlPtdICLQkWH49g9IP78PYiooUA7uFgI/AB8Oy2IcVcHdLS8sSK7xrMDsMbZMFBV5fr7kJOZfwdgTEHYuUR4ANboMccXANyF0Jhvc8hcxQOKB9SXugCFFsleYIjbjvkMTQgopTgvSUEBtW3E2p7v9QDshFBDqcaNfknK7a6C0hbSbqIS1zVv497w7eJD711jV55DjO3ax0OeJx+T2GlCwxUEwNX20VVUclFDF7C3xhGbLjAAb4/b5LireeZjqI1Uz2GEexvQAKiM55q3AOAiL2Xd4gFS3gSXHcUDuMhLWXfyHvAHZgEYfZwmZ84AAAAASUVORK5CYII=",
          width: 35,
          height: 35
        },
        uploadOption: {
          api: "",
          fileSize: 5,
          data: {}
        },
        submitOption: {
          api: "",
          data: {}
        },
        onMountFn: () => {
          var n;
          (n = e.onMount) == null || n.call(e);
        },
        onClickIcon: () => {
          var n;
          (n = e.onClickIcon) == null || n.call(e);
        },
        onClickClose: () => {
          var n;
          (n = e.onClickClose) == null || n.call(e);
        },
        onClickSubmit: () => {
          var n;
          (n = e.onClickSubmit) == null || n.call(e);
        },
        ...e
      }
    });
  },
  destroyed() {
    document.body.querySelectorAll("[data-type=tool-feedback]").forEach((e) => {
      var t;
      (t = e.parentElement) == null || t.removeChild(e);
    });
  }
};
export {
  Re as default
};
