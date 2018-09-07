(function () {
    var t, e, n, r, a, i, o, c, l, s, u, h, f, d, p, b, y, g = [].slice, m = function (t, e) {
        function n() {
            this.constructor = t
        }

        for (var r in e) v.call(e, r) && (t[r] = e[r]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
    }, v = {}.hasOwnProperty;
    if (y = this, f = y.document, r = {
            api: "https://api.github.com",
            anchorClass: "github-button",
            iconClass: "octicon",
            icon: "octicon-mark-github",
            scriptId: "github-bjs"
        }, (r.script = f.getElementById(r.scriptId)) && (r.url = r.script.src.replace(/[^\/]*([?#].*)?$/, "")), o = function () {
            function t() {
            }

            var e;
            return t.flatten = function (t) {
                var e, n;
                return e = function (t, r) {
                    var a, i, o, c, l, s;
                    switch (Object.prototype.toString.call(t)) {
                        case"[object Object]":
                            for (c in t) s = t[c], e(s, r ? r + "." + c : c);
                            break;
                        case"[object Array]":
                            for (a = o = 0, l = t.length; l > o; a = ++o) i = t[a], e(i, r + "[" + a + "]");
                            break;
                        default:
                            n[r] = t
                    }
                }, n = {}, e(t, ""), n
            }, t.expand = function (t) {
                var n, r, a, i, o, c;
                i = [];
                for (n in t) {
                    for (c = t[n], a = n.match(/((?!\[\d+\])[^.])+|\[\d+\]/g), o = i, r = 0; a.length;) null == o[r] && (o[r] = a[0] === e(a[0]) ? {} : []), o = o[r], r = e(a.shift());
                    o[r] = c
                }
                return i[0]
            }, e = function (t) {
                var e;
                return (e = t.match(/^\[(\d+)\]$/)) ? Number(e[1]) : t
            }, t
        }(), s = function () {
            function t() {
            }

            return t.stringify = function (t) {
                var e, n, r;
                n = [];
                for (e in t) r = t[e], n.push(e + "=" + (null != r ? r : ""));
                return n.join("&")
            }, t.parse = function (t) {
                var e, n, r, a, i, o, c, l;
                for (a = {}, o = t.split("&"), e = 0, r = o.length; r > e; e++) i = o[e], "" !== i && (c = i.split("="), n = c[0], l = 2 <= c.length ? g.call(c, 1) : [], "" !== n && (a[n] = l.join("=")));
                return a
            }, t
        }(), l = function () {
            function t() {
            }

            return t.encode = function (t) {
                return "#" + encodeURIComponent(s.stringify(o.flatten(t)))
            }, t.decode = function (t) {
                return null == t && (t = f.location.hash), o.expand(s.parse(decodeURIComponent(t.replace(/^#/, "")))) || {}
            }, t
        }(), i = function () {
            function t(t) {
                this.$ = t
            }

            var e, n;
            return t.prototype.on = function () {
                var t, n, r, a, i, o, c;
                for (r = 2 <= arguments.length ? g.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), a = arguments[i++], t = function (t) {
                    return function (e) {
                        return a.call(t, e || y.event)
                    }
                }(this), o = 0, c = r.length; c > o; o++) n = r[o], e(this.$, n, t)
            }, t.prototype.once = function () {
                var t, r, a, i, o, c, l;
                for (a = 2 <= arguments.length ? g.call(arguments, 0, o = arguments.length - 1) : (o = 0, []), i = arguments[o++], t = function (e) {
                    return function (r) {
                        var o, c, l;
                        for (c = 0, l = a.length; l > c; c++) o = a[c], n(e.$, o, t);
                        return i.call(e, r || y.event)
                    }
                }(this), c = 0, l = a.length; l > c; c++) r = a[c], e(this.$, r, t)
            }, e = function (t, e, n) {
                t.addEventListener ? t.addEventListener("" + e, n) : t.attachEvent("on" + e, n)
            }, n = function (t, e, n) {
                t.removeEventListener ? t.removeEventListener("" + e, n) : t.detachEvent("on" + e, n)
            }, t
        }(), a = function (t) {
            function e(t, e) {
                this.$ = t && 1 === t.nodeType ? t : f.createElement(t), e && e.call(this, this.$)
            }

            var n, r, a, i;
            return m(e, t), e.prototype.addClass = function (t) {
                r(this.$, t) || n(this.$, t)
            }, e.prototype.removeClass = function (t) {
                r(this.$, t) && i(this.$, t)
            }, e.prototype.hasClass = function (t) {
                return r(this.$, t)
            }, n = function (t, e) {
                t.className += " " + e
            }, i = function (t, e) {
                t.className = (" " + t.className + " ").replace(a, " ").replace(" " + e + " ", "").replace(/^ | $/, "")
            }, r = function (t, e) {
                return (" " + t.className + " ").replace(a, " ").indexOf(" " + e + " ") >= 0
            }, a = /[ \t\n\f\r]+/g, e
        }(i), c = function (t) {
            function e(t) {
                e.__super__.constructor.call(this, "iframe", function (e) {
                    var n, r, a;
                    r = {allowtransparency: !0, scrolling: "no", frameBorder: 0};
                    for (n in r) a = r[n], e.setAttribute(n, a);
                    e.style.cssText = "width: 1px; height: 0; border: none", e.src = "javascript:0", t && t.call(this, e)
                })
            }

            var n, r;
            return m(e, t), e.prototype.html = function (t) {
                var e;
                try {
                    e = this.$.contentWindow.document, e.open().write(t), e.close()
                } catch (n) {
                }
            }, e.prototype.load = function (t) {
                this.$.src = t
            }, e.prototype.size = function () {
                var t, e, n, a, i, o;
                try {
                    return n = this.$.contentWindow.document, i = n.documentElement, t = n.body, o = Math.max(i.scrollWidth, t.scrollWidth), a = Math.max(i.scrollHeight, t.scrollHeight), t.getBoundingClientRect && (t.style.display = "inline-block", e = t.getBoundingClientRect(), o = Math.max(o, r(e.width || e.right - e.left)), a = Math.max(a, r(e.height || e.bottom - e.top)), t.style.display = ""), {
                        width: o + "px",
                        height: a + "px"
                    }
                } catch (c) {
                }
            }, e.prototype.resize = function (t) {
                var e, n, r;
                n = null != t ? t : this.size() || {}, r = n.width, e = n.height, r && (this.$.style.width = r), e && (this.$.style.height = e)
            }, n = y.devicePixelRatio || 1, r = function (t) {
                return n > 1 ? Math.ceil(Math.round(t * n) / n * 2) / 2 || 0 : Math.ceil(t) || 0
            }, e
        }(a), t = function () {
            function t() {
            }

            return t.parse = function (t) {
                return {
                    href: t.href,
                    text: t.getAttribute("data-text") || t.textContent || t.innerText || "",
                    data: {
                        count: {
                            api: t.getAttribute("data-count-api") || "",
                            href: t.getAttribute("data-count-href") || t.href,
                            aria: {label: t.getAttribute("data-count-aria-label") || ""}
                        }, style: t.getAttribute("data-style") || "", icon: t.getAttribute("data-icon") || ""
                    },
                    aria: {label: t.getAttribute("aria-label") || ""}
                }
            }, t
        }(), e = function (t) {
            function e(t, n, i) {
                var o;
                e.__super__.constructor.call(this, n), o = function (e) {
                    return function () {
                        var n;
                        o = null, n = e.size(), e.$.parentNode.removeChild(e.$), e.once("load", function () {
                            this.resize(n)
                        }), e.load(r.url + "buttons.html" + t), i && i.call(e, e.$)
                    }
                }(this), this.once("load", function () {
                    var t;
                    (t = this.$.contentWindow.callback) ? new a(t.script, function (t) {
                        this.on("load", "error", function () {
                            o && o()
                        }), t.readyState && this.on("readystatechange", function () {
                            !/i/.test(t.readyState) && o && o()
                        })
                    }) : o()
                }), this.html('<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title></title>\n<link rel="stylesheet" href="' + r.url + 'assets/css/buttons.css">\n<script>document.location.hash = "' + t + '";</script>\n</head>\n<body>\n<script src="' + r.script.src + '"></script>\n</body>\n</html>')
            }

            return m(e, t), e
        }(c), n = function () {
            function t(t) {
                t && t.data && (f.body.className = t.data.style || "", new e(t.href, null, function (e) {
                    e.className = "button", t.aria.label && e.setAttribute("aria-label", t.aria.label), new a("i", function (n) {
                        n.className = (t.data.icon || r.icon) + (r.iconClass ? " " + r.iconClass : ""), n.setAttribute("aria-hidden", "true"), e.appendChild(n)
                    }), e.appendChild(f.createTextNode(" ")), new a("span", function (n) {
                        t.text && n.appendChild(f.createTextNode(t.text)), e.appendChild(n)
                    }), f.body.appendChild(e)
                }), function (t, n) {
                    t && t.api && new e(t.href, n, function (e) {
                        e.className = "count", new a("b", function (t) {
                            e.appendChild(t)
                        }), new a("i", function (t) {
                            e.appendChild(t)
                        }), new a("span", function (n) {
                            var c;
                            e.appendChild(n), c = function () {
                                var e, n;
                                return n = t.api.replace(/^(?!\/)/, "/").split("#")[0], e = s.parse(n.split("?").slice(1).join("?")), e.callback = "callback", n.split("?")[0] + "?" + s.stringify(e)
                            }(), new a("script", function (a) {
                                var l;
                                a.async = !0, a.src = "" + r.api + c, y.callback = function (r) {
                                    var a;
                                    y.callback = null, 200 === r.meta.status && (a = o.flatten(r.data)[t.api.split("#").slice(1).join("#")], "[object Number]" === Object.prototype.toString.call(a) && (a = ("" + a).replace(/\B(?=(\d{3})+(?!\d))/g, ",")), n.appendChild(f.createTextNode(a)), t.aria.label && e.setAttribute("aria-label", t.aria.label.replace("#", a)), f.body.appendChild(e))
                                }, y.callback.script = a, this.on("error", function () {
                                    y.callback = null
                                }), a.readyState && this.on("readystatechange", function () {
                                    "loaded" === a.readyState && a.children && "loading" === a.readyState && (y.callback = null)
                                }), l = f.getElementsByTagName("head")[0], y.opera ? new i(f).on("DOMContentLoaded", function () {
                                    l.appendChild(a)
                                }) : l.appendChild(a)
                            })
                        })
                    })
                }(t.data.count, t.href))
            }

            var e;
            return e = function (t) {
                function e(t, i, o) {
                    e.__super__.constructor.call(this, "a", function (e) {
                        if (n) {
                            if ((e.href = i) && !r.test(e.href)) try {
                                e.href = new URL(t, i).href
                            } catch (c) {
                                n.href = i, e.href = t, new a("div", function (t) {
                                    t.innerHTML = e.outerHTML, e.href = t.lastChild.href, t = null
                                }), n.href = f.location.href, n.removeAttribute("href")
                            } else e.href = t;
                            r.test(e.href) && (e.href = "#", e.target = "_self")
                        }
                        o(e)
                    })
                }

                var n, r;
                return m(e, t), n = f.getElementsByTagName("base")[0], r = /^javascript:/i, e
            }(a), t
        }(), r.script) for (h = f.querySelectorAll ? f.querySelectorAll("a." + r.anchorClass) : function () {
        var t, e, n, i;
        for (n = f.getElementsByTagName("a"), i = [], t = 0, e = n.length; e > t; t++) u = n[t], new a(u).hasClass(r.anchorClass) && i.push(u);
        return i
    }(), d = function (n) {
        new e(l.encode(t.parse(n)), function (t) {
            f.body.appendChild(t)
        }, function (t) {
            n.parentNode.replaceChild(t, n)
        })
    }, p = 0, b = h.length; b > p; p++) u = h[p], d(u); else new n(l.decode())
}).call(this);
//# sourceMappingURL=buttons.js.map