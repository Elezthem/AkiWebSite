import {l as f, m as i, o as s, b as n, F as m, r as g, f as w, h as u, e, t as k, j as o, w as a, i as c, k as v, p as x} from "./entry.b6683473.js";
const $ = ()=>f("color-mode").value
  , b = {
    data() {
        return {
            colorMode: $(),
            themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]
        }
    }
}
  , y = {
    title: "Change Theme",
    class: "dropdown dropdown-bottom dropdown-end"
}
  , M = u('<div tabindex="0" class="btn normal-case btn-ghost"><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current md:h-5 md:w-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg><span class="hidden md:inline">Theme</span><svg width="12px" height="12px" class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>', 1)
  , N = {
    key: 0,
    class: "dropdown_content_change_theme dropdown-content"
}
  , B = ["onClick"]
  , C = ["data-theme"]
  , V = {
    class: "change_theme_accent_container"
}
  , L = {
    class: "change_theme_accents"
}
  , S = {
    class: "change_theme_name"
}
  , T = u('<div class="change_theme_colors"><div class="change_theme_primary_color"></div><div class="change_theme_secondary_color"></div><div class="change_theme_accent_color"></div><div class="change_theme_neutral_color"></div></div>', 1);
function j(_, l, t, r, h, te) {
    return s(),
    n("div", y, [M, h.themes ? (s(),
    n("div", N, [(s(!0),
    n(m, null, g(h.themes, d=>(s(),
    n("div", {
        class: "change_theme_grid",
        tabindex: "0",
        key: d
    }, [e("div", {
        class: "change_theme_item",
        onClick: oe=>h.colorMode.preference = d
    }, [e("div", {
        "data-theme": d,
        class: "change_theme_item_content"
    }, [e("div", V, [e("div", L, [e("div", S, k(d), 1), T])])], 8, C)], 8, B)]))), 128))])) : w("", !0)])
}
const A = i(b, [["render", j]])
  , p = "" + new URL("avatar.9bf2b7b3.jpg",import.meta.url).href
  , F = {}
  , z = {
    class: "centered_container"
}
  , D = {
    class: "navbar"
}
  , I = {
    class: "navbar-start"
}
  , q = e("div", {
    class: "avatar mx-5"
}, [e("div", {
    class: "w-10 rounded-md"
}, [e("img", {
    alt: "logo",
    src: p
})])], -1)
  , E = {
    class: "navbar-end"
};
function H(_, l) {
    const t = v
      , r = A;
    return s(),
    n("header", z, [e("div", D, [e("div", I, [o(t, {
        class: "logo",
        to: "/"
    }, {
        default: a(()=>[q, c(" AkiBot ")]),
        _: 1
    })]), e("div", E, [o(r)])])])
}
const P = i(F, [["render", H]])
  , R = {}
  , U = {
    class: "footer_container"
}
  , G = {
    class: "footer_content"
}
  , J = {
    class: "footer_logo"
}
  , K = e("div", {
    class: "avatar mx-5"
}, [e("div", {
    class: "w-8 rounded-md"
}, [e("img", {
    alt: "logo",
    src: p
})])], -1)
  , O = e("p", null, [c("\u041C\u044B\xA0\u043D\u0435\xA0\u044F\u0432\u043B\u044F\u0435\u043C\u0441\u044F \u0430\u0444\u0444\u0438\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u043C"), e("br"), c("\u043B\u0438\u0446\u043E\u043C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 Discord Inc."), e("br"), e("strong", null, "Aki \xA9 2022")], -1)
  , Q = {
    class: "footer_links"
}
  , W = e("a", {
    href: "/api/redoc",
    class: "footer_link"
}, " API ", -1);
function X(_, l) {
    const t = v;
    return s(),
    n("footer", U, [e("div", G, [e("div", J, [o(t, {
        to: "/"
    }, {
        default: a(()=>[K]),
        _: 1
    }), O]), e("div", Q, [o(t, {
        to: "/terms",
        class: "footer_link"
    }, {
        default: a(()=>[c(" \u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F ")]),
        _: 1
    }), o(t, {
        to: "/privacy",
        class: "footer_link"
    }, {
        default: a(()=>[c(" \u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C ")]),
        _: 1
    }), o(t, {
        to: "/votes",
        class: "footer_link"
    }, {
        default: a(()=>[c(" \u0413\u043E\u043B\u043E\u0441\u043E\u0432\u0430\u0442\u044C ")]),
        _: 1
    }), W])])])
}
const Y = i(R, [["render", X]])
  , Z = {};
function ee(_, l) {
    const t = P
      , r = Y;
    return s(),
    n(m, null, [o(t), x(_.$slots, "default"), o(r)], 64)
}
const ne = i(Z, [["render", ee]]);
export {ne as default};
