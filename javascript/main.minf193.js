! function(a, b) {
    var c = 0,
        d = Array.prototype.slice,
        e = a.cleanData;
    a.cleanData = function(b) {
        for (var c, d = 0; null != (c = b[d]); d++) try {
            a(c).triggerHandler("remove")
        } catch (f) {}
        e(b)
    }, a.widget = function(c, d, e) {
        var f, g, h, i, j = {},
            k = c.split(".")[0];
        c = c.split(".")[1], f = k + "-" + c, e || (e = d, d = a.Widget), a.expr[":"][f.toLowerCase()] = function(b) {
            return !!a.data(b, f)
        }, a[k] = a[k] || {}, g = a[k][c], h = a[k][c] = function(a, c) {
            return this._createWidget ? (arguments.length && this._createWidget(a, c), b) : new h(a, c)
        }, a.extend(h, g, {
            version: e.version,
            _proto: a.extend({}, e),
            _childConstructors: []
        }), i = new d, i.options = a.widget.extend({}, i.options), a.each(e, function(c, e) {
            return a.isFunction(e) ? (j[c] = function() {
                var a = function() {
                        return d.prototype[c].apply(this, arguments)
                    },
                    b = function(a) {
                        return d.prototype[c].apply(this, a)
                    };
                return function() {
                    var c, d = this._super,
                        f = this._superApply;
                    return this._super = a, this._superApply = b, c = e.apply(this, arguments), this._super = d, this._superApply = f, c
                }
            }(), b) : (j[c] = e, b)
        }), h.prototype = a.widget.extend(i, {
            widgetEventPrefix: g ? i.widgetEventPrefix : c
        }, j, {
            constructor: h,
            namespace: k,
            widgetName: c,
            widgetFullName: f
        }), g ? (a.each(g._childConstructors, function(b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, h, c._proto)
        }), delete g._childConstructors) : d._childConstructors.push(h), a.widget.bridge(c, h)
    }, a.widget.extend = function(c) {
        for (var e, f, g = d.call(arguments, 1), h = 0, i = g.length; i > h; h++)
            for (e in g[h]) f = g[h][e], g[h].hasOwnProperty(e) && f !== b && (c[e] = a.isPlainObject(f) ? a.isPlainObject(c[e]) ? a.widget.extend({}, c[e], f) : a.widget.extend({}, f) : f);
        return c
    }, a.widget.bridge = function(c, e) {
        var f = e.prototype.widgetFullName || c;
        a.fn[c] = function(g) {
            var h = "string" == typeof g,
                i = d.call(arguments, 1),
                j = this;
            return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, this.each(h ? function() {
                var d, e = a.data(this, f);
                return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, i), d !== e && d !== b ? (j = d && d.jquery ? j.pushStack(d.get()) : d, !1) : b) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; attempted to call method '" + g + "'")
            } : function() {
                var b = a.data(this, f);
                b ? b.option(g || {})._init() : a.data(this, f, new e(g, this))
            }), j
        }
    }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(b, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(a) {
                    a.target === d && this.destroy()
                }
            }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function() {
            return this.element
        },
        option: function(c, d) {
            var e, f, g, h = c;
            if (0 === arguments.length) return a.widget.extend({}, this.options);
            if ("string" == typeof c)
                if (h = {}, e = c.split("."), c = e.shift(), e.length) {
                    for (f = h[c] = a.widget.extend({}, this.options[c]), g = 0; e.length - 1 > g; g++) f[e[g]] = f[e[g]] || {}, f = f[e[g]];
                    if (c = e.pop(), d === b) return f[c] === b ? null : f[c];
                    f[c] = d
                } else {
                    if (d === b) return this.options[c] === b ? null : this.options[c];
                    h[c] = d
                } return this._setOptions(h), this
        },
        _setOptions: function(a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this
        },
        _setOption: function(a, b) {
            return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(c, d, e) {
            var f, g = this;
            "boolean" != typeof c && (e = d, d = c, c = !1), e ? (d = f = a(d), this.bindings = this.bindings.add(d)) : (e = d, d = this.element, f = this.widget()), a.each(e, function(e, h) {
                function i() {
                    return c || g.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof h ? g[h] : h).apply(g, arguments) : b
                }
                "string" != typeof h && (i.guid = h.guid = h.guid || i.guid || a.guid++);
                var j = e.match(/^(\w+)\s*(.*)$/),
                    k = j[1] + g.eventNamespace,
                    l = j[2];
                l ? f.delegate(l, k, i) : d.bind(k, i)
            })
        },
        _off: function(a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
        },
        _delay: function(a, b) {
            function c() {
                return ("string" == typeof a ? d[a] : a).apply(d, arguments)
            }
            var d = this;
            return setTimeout(c, b || 0)
        },
        _hoverable: function(b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {
                mouseenter: function(b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(b) {
            this.focusable = this.focusable.add(b), this._on(b, {
                focusin: function(b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
                for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }
    }, a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(b, c) {
        a.Widget.prototype["_" + b] = function(d, e, f) {
            "string" == typeof e && (e = {
                effect: e
            });
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {}, "number" == typeof e && (e = {
                duration: e
            }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                a(this)[b](), f && f.call(d[0]), c()
            })
        }
    })
}(jQuery),
function(a, b) {
    var c = "ui-effects-";
    a.effects = {
            effect: {}
        },
        function(a, b) {
            function c(a, b, c) {
                var d = l[b.type] || {};
                return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : a > d.max ? d.max : a)
            }

            function d(c) {
                var d = j(),
                    e = d._rgba = [];
                return c = c.toLowerCase(), o(i, function(a, f) {
                    var g, h = f.re.exec(c),
                        i = h && f.parse(h),
                        j = f.space || "rgba";
                    return i ? (g = d[j](i), d[k[j].cache] = g[k[j].cache], e = d._rgba = g._rgba, !1) : b
                }), e.length ? ("0,0,0,0" === e.join() && a.extend(e, f.transparent), d) : f[c]
            }

            function e(a, b, c) {
                return c = (c + 1) % 1, 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a
            }
            var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                h = /^([\-+])=\s*(\d+\.?\d*)/,
                i = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [a[1], a[2], a[3], a[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(a) {
                        return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(a) {
                        return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(a) {
                        return [a[1], a[2] / 100, a[3] / 100, a[4]]
                    }
                }],
                j = a.Color = function(b, c, d, e) {
                    return new a.Color.fn.parse(b, c, d, e)
                },
                k = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
                l = {
                    "byte": {
                        floor: !0,
                        max: 255
                    },
                    percent: {
                        max: 1
                    },
                    degrees: {
                        mod: 360,
                        floor: !0
                    }
                },
                m = j.support = {},
                n = a("<p>")[0],
                o = a.each;
            n.style.cssText = "background-color:rgba(1,1,1,.5)", m.rgba = n.style.backgroundColor.indexOf("rgba") > -1, o(k, function(a, b) {
                b.cache = "_" + a, b.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            }), j.fn = a.extend(j.prototype, {
                parse: function(e, g, h, i) {
                    if (e === b) return this._rgba = [null, null, null, null], this;
                    (e.jquery || e.nodeType) && (e = a(e).css(g), g = b);
                    var l = this,
                        m = a.type(e),
                        n = this._rgba = [];
                    return g !== b && (e = [e, g, h, i], m = "array"), "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props, function(a, b) {
                        n[b.idx] = c(e[b.idx], b)
                    }), this) : "object" === m ? (e instanceof j ? o(k, function(a, b) {
                        e[b.cache] && (l[b.cache] = e[b.cache].slice())
                    }) : o(k, function(b, d) {
                        var f = d.cache;
                        o(d.props, function(a, b) {
                            if (!l[f] && d.to) {
                                if ("alpha" === a || null == e[a]) return;
                                l[f] = d.to(l._rgba)
                            }
                            l[f][b.idx] = c(e[a], b, !0)
                        }), l[f] && 0 > a.inArray(null, l[f].slice(0, 3)) && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f])))
                    }), this) : b
                },
                is: function(a) {
                    var c = j(a),
                        d = !0,
                        e = this;
                    return o(k, function(a, f) {
                        var g, h = c[f.cache];
                        return h && (g = e[f.cache] || f.to && f.to(e._rgba) || [], o(f.props, function(a, c) {
                            return null != h[c.idx] ? d = h[c.idx] === g[c.idx] : b
                        })), d
                    }), d
                },
                _space: function() {
                    var a = [],
                        b = this;
                    return o(k, function(c, d) {
                        b[d.cache] && a.push(c)
                    }), a.pop()
                },
                transition: function(a, b) {
                    var d = j(a),
                        e = d._space(),
                        f = k[e],
                        g = 0 === this.alpha() ? j("transparent") : this,
                        h = g[f.cache] || f.to(g._rgba),
                        i = h.slice();
                    return d = d[f.cache], o(f.props, function(a, e) {
                        var f = e.idx,
                            g = h[f],
                            j = d[f],
                            k = l[e.type] || {};
                        null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), i[f] = c((j - g) * b + g, e)))
                    }), this[e](i)
                },
                blend: function(b) {
                    if (1 === this._rgba[3]) return this;
                    var c = this._rgba.slice(),
                        d = c.pop(),
                        e = j(b)._rgba;
                    return j(a.map(c, function(a, b) {
                        return (1 - d) * e[b] + d * a
                    }))
                },
                toRgbaString: function() {
                    var b = "rgba(",
                        c = a.map(this._rgba, function(a, b) {
                            return null == a ? b > 2 ? 1 : 0 : a
                        });
                    return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")"
                },
                toHslaString: function() {
                    var b = "hsla(",
                        c = a.map(this.hsla(), function(a, b) {
                            return null == a && (a = b > 2 ? 1 : 0), b && 3 > b && (a = Math.round(100 * a) + "%"), a
                        });
                    return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")"
                },
                toHexString: function(b) {
                    var c = this._rgba.slice(),
                        d = c.pop();
                    return b && c.push(~~(255 * d)), "#" + a.map(c, function(a) {
                        return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
                    }).join("")
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            }), j.fn.parse.prototype = j.fn, k.hsla.to = function(a) {
                if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                var b, c, d = a[0] / 255,
                    e = a[1] / 255,
                    f = a[2] / 255,
                    g = a[3],
                    h = Math.max(d, e, f),
                    i = Math.min(d, e, f),
                    j = h - i,
                    k = h + i,
                    l = .5 * k;
                return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, c = 0 === j ? 0 : .5 >= l ? j / k : j / (2 - k), [Math.round(b) % 360, c, l, null == g ? 1 : g]
            }, k.hsla.from = function(a) {
                if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                var b = a[0] / 360,
                    c = a[1],
                    d = a[2],
                    f = a[3],
                    g = .5 >= d ? d * (1 + c) : d + c - d * c,
                    h = 2 * d - g;
                return [Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f]
            }, o(k, function(d, e) {
                var f = e.props,
                    g = e.cache,
                    i = e.to,
                    k = e.from;
                j.fn[d] = function(d) {
                    if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice();
                    var e, h = a.type(d),
                        l = "array" === h || "object" === h ? d : arguments,
                        m = this[g].slice();
                    return o(f, function(a, b) {
                        var d = l["object" === h ? a : b.idx];
                        null == d && (d = m[b.idx]), m[b.idx] = c(d, b)
                    }), k ? (e = j(k(m)), e[g] = m, e) : j(m)
                }, o(f, function(b, c) {
                    j.fn[b] || (j.fn[b] = function(e) {
                        var f, g = a.type(e),
                            i = "alpha" === b ? this._hsla ? "hsla" : "rgba" : d,
                            j = this[i](),
                            k = j[c.idx];
                        return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = a.type(e)), null == e && c.empty ? this : ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[c.idx] = e, this[i](j)))
                    })
                })
            }), j.hook = function(b) {
                var c = b.split(" ");
                o(c, function(b, c) {
                    a.cssHooks[c] = {
                        set: function(b, e) {
                            var f, g, h = "";
                            if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) {
                                if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) {
                                    for (g = "backgroundColor" === c ? b.parentNode : b;
                                        ("" === h || "transparent" === h) && g && g.style;) try {
                                        h = a.css(g, "backgroundColor"), g = g.parentNode
                                    } catch (i) {}
                                    e = e.blend(h && "transparent" !== h ? h : "_default")
                                }
                                e = e.toRgbaString()
                            }
                            try {
                                b.style[c] = e
                            } catch (i) {}
                        }
                    }, a.fx.step[c] = function(b) {
                        b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
                    }
                })
            }, j.hook(g), a.cssHooks.borderColor = {
                expand: function(a) {
                    var b = {};
                    return o(["Top", "Right", "Bottom", "Left"], function(c, d) {
                        b["border" + d + "Color"] = a
                    }), b
                }
            }, f = a.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(jQuery),
        function() {
            function c(b) {
                var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
                    f = {};
                if (e && e.length && e[0] && e[e[0]])
                    for (d = e.length; d--;) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]);
                else
                    for (c in e) "string" == typeof e[c] && (f[c] = e[c]);
                return f
            }

            function d(b, c) {
                var d, e, g = {};
                for (d in c) e = c[d], b[d] !== e && (f[d] || (a.fx.step[d] || !isNaN(parseFloat(e))) && (g[d] = e));
                return g
            }
            var e = ["add", "remove", "toggle"],
                f = {
                    border: 1,
                    borderBottom: 1,
                    borderColor: 1,
                    borderLeft: 1,
                    borderRight: 1,
                    borderTop: 1,
                    borderWidth: 1,
                    margin: 1,
                    padding: 1
                };
            a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(b, c) {
                a.fx.step[c] = function(a) {
                    ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (jQuery.style(a.elem, c, a.end), a.setAttr = !0)
                }
            }), a.fn.addBack || (a.fn.addBack = function(a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }), a.effects.animateClass = function(b, f, g, h) {
                var i = a.speed(f, g, h);
                return this.queue(function() {
                    var f, g = a(this),
                        h = g.attr("class") || "",
                        j = i.children ? g.find("*").addBack() : g;
                    j = j.map(function() {
                        var b = a(this);
                        return {
                            el: b,
                            start: c(this)
                        }
                    }), f = function() {
                        a.each(e, function(a, c) {
                            b[c] && g[c + "Class"](b[c])
                        })
                    }, f(), j = j.map(function() {
                        return this.end = c(this.el[0]), this.diff = d(this.start, this.end), this
                    }), g.attr("class", h), j = j.map(function() {
                        var b = this,
                            c = a.Deferred(),
                            d = a.extend({}, i, {
                                queue: !1,
                                complete: function() {
                                    c.resolve(b)
                                }
                            });
                        return this.el.animate(this.diff, d), c.promise()
                    }), a.when.apply(a, j.get()).done(function() {
                        f(), a.each(arguments, function() {
                            var b = this.el;
                            a.each(this.diff, function(a) {
                                b.css(a, "")
                            })
                        }), i.complete.call(g[0])
                    })
                })
            }, a.fn.extend({
                addClass: function(b) {
                    return function(c, d, e, f) {
                        return d ? a.effects.animateClass.call(this, {
                            add: c
                        }, d, e, f) : b.apply(this, arguments)
                    }
                }(a.fn.addClass),
                removeClass: function(b) {
                    return function(c, d, e, f) {
                        return arguments.length > 1 ? a.effects.animateClass.call(this, {
                            remove: c
                        }, d, e, f) : b.apply(this, arguments)
                    }
                }(a.fn.removeClass),
                toggleClass: function(c) {
                    return function(d, e, f, g, h) {
                        return "boolean" == typeof e || e === b ? f ? a.effects.animateClass.call(this, e ? {
                            add: d
                        } : {
                            remove: d
                        }, f, g, h) : c.apply(this, arguments) : a.effects.animateClass.call(this, {
                            toggle: d
                        }, e, f, g)
                    }
                }(a.fn.toggleClass),
                switchClass: function(b, c, d, e, f) {
                    return a.effects.animateClass.call(this, {
                        add: c,
                        remove: b
                    }, d, e, f)
                }
            })
        }(),
        function() {
            function d(b, c, d, e) {
                return a.isPlainObject(b) && (c = b, b = b.effect), b = {
                    effect: b
                }, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b
            }

            function e(b) {
                return !b || "number" == typeof b || a.fx.speeds[b] ? !0 : "string" != typeof b || a.effects.effect[b] ? a.isFunction(b) ? !0 : "object" != typeof b || b.effect ? !1 : !0 : !0
            }
            a.extend(a.effects, {
                version: "1.10.3",
                save: function(a, b) {
                    for (var d = 0; b.length > d; d++) null !== b[d] && a.data(c + b[d], a[0].style[b[d]])
                },
                restore: function(a, d) {
                    var e, f;
                    for (f = 0; d.length > f; f++) null !== d[f] && (e = a.data(c + d[f]), e === b && (e = ""), a.css(d[f], e))
                },
                setMode: function(a, b) {
                    return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
                },
                getBaseline: function(a, b) {
                    var c, d;
                    switch (a[0]) {
                        case "top":
                            c = 0;
                            break;
                        case "middle":
                            c = .5;
                            break;
                        case "bottom":
                            c = 1;
                            break;
                        default:
                            c = a[0] / b.height
                    }
                    switch (a[1]) {
                        case "left":
                            d = 0;
                            break;
                        case "center":
                            d = .5;
                            break;
                        case "right":
                            d = 1;
                            break;
                        default:
                            d = a[1] / b.width
                    }
                    return {
                        x: d,
                        y: c
                    }
                },
                createWrapper: function(b) {
                    if (b.parent().is(".ui-effects-wrapper")) return b.parent();
                    var c = {
                            width: b.outerWidth(!0),
                            height: b.outerHeight(!0),
                            "float": b.css("float")
                        },
                        d = a("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        e = {
                            width: b.width(),
                            height: b.height()
                        },
                        f = document.activeElement;
                    try {
                        f.id
                    } catch (g) {
                        f = document.body
                    }
                    return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), "static" === b.css("position") ? (d.css({
                        position: "relative"
                    }), b.css({
                        position: "relative"
                    })) : (a.extend(c, {
                        position: b.css("position"),
                        zIndex: b.css("z-index")
                    }), a.each(["top", "left", "bottom", "right"], function(a, d) {
                        c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
                    }), b.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), b.css(e), d.css(c).show()
                },
                removeWrapper: function(b) {
                    var c = document.activeElement;
                    return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b
                },
                setTransition: function(b, c, d, e) {
                    return e = e || {}, a.each(c, function(a, c) {
                        var f = b.cssUnit(c);
                        f[0] > 0 && (e[c] = f[0] * d + f[1])
                    }), e
                }
            }), a.fn.extend({
                effect: function() {
                    function b(b) {
                        function d() {
                            a.isFunction(f) && f.call(e[0]), a.isFunction(b) && b()
                        }
                        var e = a(this),
                            f = c.complete,
                            h = c.mode;
                        (e.is(":hidden") ? "hide" === h : "show" === h) ? (e[h](), d()) : g.call(e[0], c, d)
                    }
                    var c = d.apply(this, arguments),
                        e = c.mode,
                        f = c.queue,
                        g = a.effects.effect[c.effect];
                    return a.fx.off || !g ? e ? this[e](c.duration, c.complete) : this.each(function() {
                        c.complete && c.complete.call(this)
                    }) : f === !1 ? this.each(b) : this.queue(f || "fx", b)
                },
                show: function(a) {
                    return function(b) {
                        if (e(b)) return a.apply(this, arguments);
                        var c = d.apply(this, arguments);
                        return c.mode = "show", this.effect.call(this, c)
                    }
                }(a.fn.show),
                hide: function(a) {
                    return function(b) {
                        if (e(b)) return a.apply(this, arguments);
                        var c = d.apply(this, arguments);
                        return c.mode = "hide", this.effect.call(this, c)
                    }
                }(a.fn.hide),
                toggle: function(a) {
                    return function(b) {
                        if (e(b) || "boolean" == typeof b) return a.apply(this, arguments);
                        var c = d.apply(this, arguments);
                        return c.mode = "toggle", this.effect.call(this, c)
                    }
                }(a.fn.toggle),
                cssUnit: function(b) {
                    var c = this.css(b),
                        d = [];
                    return a.each(["em", "px", "%", "pt"], function(a, b) {
                        c.indexOf(b) > 0 && (d = [parseFloat(c), b])
                    }), d
                }
            })
        }(),
        function() {
            var b = {};
            a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, c) {
                b[c] = function(b) {
                    return Math.pow(b, a + 2)
                }
            }), a.extend(b, {
                Sine: function(a) {
                    return 1 - Math.cos(a * Math.PI / 2)
                },
                Circ: function(a) {
                    return 1 - Math.sqrt(1 - a * a)
                },
                Elastic: function(a) {
                    return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
                },
                Back: function(a) {
                    return a * a * (3 * a - 2)
                },
                Bounce: function(a) {
                    for (var b, c = 4;
                        ((b = Math.pow(2, --c)) - 1) / 11 > a;);
                    return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
                }
            }), a.each(b, function(b, c) {
                a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) {
                    return 1 - c(1 - a)
                }, a.easing["easeInOut" + b] = function(a) {
                    return .5 > a ? c(2 * a) / 2 : 1 - c(-2 * a + 2) / 2
                }
            })
        }()
}(jQuery),
function(a) {
    "use strict";
    var b = "kinetic-active";
    window.requestAnimationFrame || (window.requestAnimationFrame = function() {
        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            window.setTimeout(a, 1e3 / 60)
        }
    }()), a.support = a.support || {}, a.extend(a.support, {
        touch: "ontouchend" in document
    });
    var c = function() {
            return !1
        },
        d = function(b, c) {
            return this.settings = c, this.el = b, this.$el = a(b), this._initElements(), this
        };
    d.DATA_KEY = "kinetic", d.DEFAULTS = {
        cursor: "move",
        decelerate: !0,
        triggerHardware: !1,
        y: !0,
        x: !0,
        slowdown: .9,
        maxvelocity: 40,
        throttleFPS: 60,
        movingClass: {
            up: "kinetic-moving-up",
            down: "kinetic-moving-down",
            left: "kinetic-moving-left",
            right: "kinetic-moving-right"
        },
        deceleratingClass: {
            up: "kinetic-decelerating-up",
            down: "kinetic-decelerating-down",
            left: "kinetic-decelerating-left",
            right: "kinetic-decelerating-right"
        }
    }, d.prototype.start = function(b) {
        this.settings = a.extend(this.settings, b), this.velocity = b.velocity || this.velocity, this.velocityY = b.velocityY || this.velocityY, this.settings.decelerate = !1, this._move()
    }, d.prototype.end = function() {
        this.settings.decelerate = !0
    }, d.prototype.stop = function() {
        this.velocity = 0, this.velocityY = 0, this.settings.decelerate = !0, a.isFunction(this.settings.stopped) && this.settings.stopped.call(this)
    }, d.prototype.detach = function() {
        this._detachListeners(), this.$el.removeClass(b).css("cursor", "")
    }, d.prototype.attach = function() {
        this.$el.hasClass(b) || (this._attachListeners(this.$el), this.$el.addClass(b).css("cursor", this.settings.cursor))
    }, d.prototype._initElements = function() {
        this.$el.addClass(b), a.extend(this, {
            xpos: null,
            prevXPos: !1,
            ypos: null,
            prevYPos: !1,
            mouseDown: !1,
            throttleTimeout: 1e3 / this.settings.throttleFPS,
            lastMove: null,
            elementFocused: null
        }), this.velocity = 0, this.velocityY = 0, a(document).mouseup(a.proxy(this._resetMouse, this)).click(a.proxy(this._resetMouse, this)), this._initEvents(), this.$el.css("cursor", this.settings.cursor), this.settings.triggerHardware && this.$el.css({
            "-webkit-transform": "translate3d(0,0,0)",
            "-webkit-perspective": "1000",
            "-webkit-backface-visibility": "hidden"
        })
    }, d.prototype._initEvents = function() {
        var b = this;
        this.settings.events = {
            touchStart: function(a) {
                var c;
                b._useTarget(a.target) && (c = a.originalEvent.touches[0], b._start(c.clientX, c.clientY), a.stopPropagation())
            },
            touchMove: function(a) {
                var c;
                b.mouseDown && (c = a.originalEvent.touches[0], b._inputmove(c.clientX, c.clientY), a.preventDefault && a.preventDefault())
            },
            inputDown: function(a) {
                b._useTarget(a.target) && (b._start(a.clientX, a.clientY), b.elementFocused = a.target, "IMG" === a.target.nodeName && a.preventDefault(), a.stopPropagation())
            },
            inputEnd: function(a) {
                b._useTarget(a.target) && (b._end(), b.elementFocused = null, a.preventDefault && a.preventDefault())
            },
            inputMove: function(a) {
                b.mouseDown && (b._inputmove(a.clientX, a.clientY), a.preventDefault && a.preventDefault())
            },
            scroll: function(c) {
                a.isFunction(b.settings.moved) && b.settings.moved.call(b, b.settings), c.preventDefault && c.preventDefault()
            },
            inputClick: function(a) {
                return Math.abs(b.velocity) > 0 ? (a.preventDefault(), !1) : void 0
            },
            dragStart: function() {
                return b.elementFocused ? !1 : void 0
            }
        }, this._attachListeners(this.$el, this.settings)
    }, d.prototype._inputmove = function(b, c) {
        {
            var d = this.$el;
            this.el
        }
        if ((!this.lastMove || new Date > new Date(this.lastMove.getTime() + this.throttleTimeout)) && (this.lastMove = new Date, this.mouseDown && (this.xpos || this.ypos))) {
            this.elementFocused && (a(this.elementFocused).blur(), this.elementFocused = null, d.focus()), this.settings.decelerate = !1, this.velocity = this.velocityY = 0;
            var e = this.scrollLeft(),
                f = this.scrollTop(),
                g = b - this.xpos,
                h = c - this.ypos;
            this.scrollLeft(this.settings.x ? e - g : e), this.scrollTop(this.settings.y ? f - h : f), this.prevXPos = this.xpos, this.prevYPos = this.ypos, this.xpos = b, this.ypos = c, this._calculateVelocities(), this._setMoveClasses(this.settings.movingClass), a.isFunction(this.settings.moved) && this.settings.moved.call(d, this.settings)
        }
    }, d.prototype._calculateVelocities = function() {
        this.velocity = this._capVelocity(this.prevXPos - this.xpos, this.settings.maxvelocity), this.velocityY = this._capVelocity(this.prevYPos - this.ypos, this.settings.maxvelocity)
    }, d.prototype._end = function() {
        this.xpos && this.prevXPos && this.settings.decelerate === !1 && (this.settings.decelerate = !0, this._calculateVelocities(), this.xpos = this.prevXPos = this.mouseDown = !1, this._move())
    }, d.prototype._useTarget = function(b) {
        return a.isFunction(this.settings.filterTarget) ? this.settings.filterTarget.call(this, b) !== !1 : !0
    }, d.prototype._start = function(a, b) {
        this.mouseDown = !0, this.velocity = this.prevXPos = 0, this.velocityY = this.prevYPos = 0, this.xpos = a, this.ypos = b
    }, d.prototype._resetMouse = function() {
        this.xpos = !1, this.ypos = !1, this.mouseDown = !1
    }, d.prototype._decelerateVelocity = function(a, b) {
        return 0 === Math.floor(Math.abs(a)) ? 0 : a * b
    }, d.prototype._capVelocity = function(a, b) {
        var c = a;
        return a > 0 ? a > b && (c = b) : 0 - b > a && (c = 0 - b), c
    }, d.prototype._setMoveClasses = function(a) {
        var b = this.settings,
            c = this.$el;
        c.removeClass(b.movingClass.up).removeClass(b.movingClass.down).removeClass(b.movingClass.left).removeClass(b.movingClass.right).removeClass(b.deceleratingClass.up).removeClass(b.deceleratingClass.down).removeClass(b.deceleratingClass.left).removeClass(b.deceleratingClass.right), this.velocity > 0 && c.addClass(a.right), this.velocity < 0 && c.addClass(a.left), this.velocityY > 0 && c.addClass(a.down), this.velocityY < 0 && c.addClass(a.up)
    }, d.prototype._move = function() {
        var b = (this.$el, this.el),
            c = this,
            d = c.settings;
        d.x && b.scrollWidth > 0 ? (this.scrollLeft(this.scrollLeft() + this.velocity), Math.abs(this.velocity) > 0 && (this.velocity = d.decelerate ? c._decelerateVelocity(this.velocity, d.slowdown) : this.velocity)) : this.velocity = 0, d.y && b.scrollHeight > 0 ? (this.scrollTop(this.scrollTop() + this.velocityY), Math.abs(this.velocityY) > 0 && (this.velocityY = d.decelerate ? c._decelerateVelocity(this.velocityY, d.slowdown) : this.velocityY)) : this.velocityY = 0, c._setMoveClasses(d.deceleratingClass), a.isFunction(d.moved) && d.moved.call(this, d), Math.abs(this.velocity) > 0 || Math.abs(this.velocityY) > 0 ? this.moving || (this.moving = !0, window.requestAnimationFrame(function() {
            c.moving = !1, c._move()
        })) : c.stop()
    }, d.prototype._getScroller = function() {
        var b = this.$el;
        return (this.$el.is("body") || this.$el.is("html")) && (b = a(window)), b
    }, d.prototype.scrollLeft = function(a) {
        var b = this._getScroller();
        return "number" != typeof a ? b.scrollLeft() : (b.scrollLeft(a), void(this.settings.scrollLeft = a))
    }, d.prototype.scrollTop = function(a) {
        var b = this._getScroller();
        return "number" != typeof a ? b.scrollTop() : (b.scrollTop(a), void(this.settings.scrollTop = a))
    }, d.prototype._attachListeners = function() {
        var b = this.$el,
            d = this.settings;
        a.support.touch ? b.bind("touchstart", d.events.touchStart).bind("touchend", d.events.inputEnd).bind("touchmove", d.events.touchMove) : b.mousedown(d.events.inputDown).mouseup(d.events.inputEnd).mousemove(d.events.inputMove), b.click(d.events.inputClick).scroll(d.events.scroll).bind("selectstart", c).bind("dragstart", d.events.dragStart)
    }, d.prototype._detachListeners = function() {
        var b = this.$el,
            d = this.settings;
        a.support.touch ? b.unbind("touchstart", d.events.touchStart).unbind("touchend", d.events.inputEnd).unbind("touchmove", d.events.touchMove) : b.unbind("mousedown", d.events.inputDown).unbind("mouseup", d.events.inputEnd).unbind("mousemove", d.events.inputMove).unbind("scroll", d.events.scroll), b.unbind("click", d.events.inputClick).unbind("selectstart", c).unbind("dragstart", d.events.dragStart)
    }, a.Kinetic = d, a.fn.kinetic = function(b, c) {
        return this.each(function() {
            var e = a(this),
                f = e.data(d.DATA_KEY),
                g = a.extend({}, d.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data(d.DATA_KEY, f = new d(this, g)), "string" == typeof b && f[b](c)
        })
    }
}(window.jQuery || window.Zepto),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var e, f = b || window.event,
            g = [].slice.call(arguments, 1),
            h = 0,
            i = 0,
            j = 0,
            k = 0,
            l = 0;
        return b = a.event.fix(f), b.type = "mousewheel", f.wheelDelta && (h = f.wheelDelta), f.detail && (h = -1 * f.detail), j = h, void 0 !== f.axis && f.axis === f.HORIZONTAL_AXIS && (j = 0, i = -1 * h), f.deltaY && (j = -1 * f.deltaY, h = j), f.deltaX && (i = f.deltaX, h = -1 * i), void 0 !== f.wheelDeltaY && (j = f.wheelDeltaY), void 0 !== f.wheelDeltaX && (i = -1 * f.wheelDeltaX), k = Math.abs(h), (!c || c > k) && (c = k), l = Math.max(Math.abs(j), Math.abs(i)), (!d || d > l) && (d = l), e = h > 0 ? "floor" : "ceil", h = Math[e](h / c), i = Math[e](i / d), j = Math[e](j / d), g.unshift(b, h, i, j), (a.event.dispatch || a.event.handle).apply(this, g)
    }
    var c, d, e = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        f = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
    if (a.event.fixHooks)
        for (var g = e.length; g;) a.event.fixHooks[e[--g]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var a = f.length; a;) this.addEventListener(f[--a], b, !1);
            else this.onmousewheel = b
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var a = f.length; a;) this.removeEventListener(f[--a], b, !1);
            else this.onmousewheel = null
        }
    }, a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
}),
function(a) {
    a.widget("thomaskahn.smoothDivScroll", {
        options: {
            scrollingHotSpotLeftClass: "scrollingHotSpotLeft",
            scrollingHotSpotRightClass: "scrollingHotSpotRight",
            scrollingHotSpotLeftVisibleClass: "scrollingHotSpotLeftVisible",
            scrollingHotSpotRightVisibleClass: "scrollingHotSpotRightVisible",
            scrollableAreaClass: "scrollableArea",
            scrollWrapperClass: "scrollWrapper",
            hiddenOnStart: !1,
            getContentOnLoad: {},
            countOnlyClass: "",
            startAtElementId: "",
            hotSpotScrolling: !0,
            hotSpotScrollingStep: 15,
            hotSpotScrollingInterval: 10,
            hotSpotMouseDownSpeedBooster: 3,
            visibleHotSpotBackgrounds: "hover",
            hotSpotsVisibleTime: 5e3,
            easingAfterHotSpotScrolling: !0,
            easingAfterHotSpotScrollingDistance: 10,
            easingAfterHotSpotScrollingDuration: 300,
            easingAfterHotSpotScrollingFunction: "easeOutQuart",
            mousewheelScrolling: "",
            mousewheelScrollingStep: 70,
            easingAfterMouseWheelScrolling: !0,
            easingAfterMouseWheelScrollingDuration: 300,
            easingAfterMouseWheelScrollingFunction: "easeOutQuart",
            manualContinuousScrolling: !1,
            autoScrollingMode: "",
            autoScrollingDirection: "endlessLoopRight",
            autoScrollingStep: 1,
            autoScrollingInterval: 10,
            touchScrolling: !1,
            scrollToAnimationDuration: 1e3,
            scrollToEasingFunction: "easeOutQuart"
        },
        _create: function() {
            var b = this,
                c = this.options,
                d = this.element;
            d.data("scrollWrapper", d.find("." + c.scrollWrapperClass)), d.data("scrollingHotSpotRight", d.find("." + c.scrollingHotSpotRightClass)), d.data("scrollingHotSpotLeft", d.find("." + c.scrollingHotSpotLeftClass)), d.data("scrollableArea", d.find("." + c.scrollableAreaClass)), d.data("scrollingHotSpotRight").length > 0 && d.data("scrollingHotSpotRight").detach(), d.data("scrollingHotSpotLeft").length > 0 && d.data("scrollingHotSpotLeft").detach(), 0 === d.data("scrollableArea").length && 0 === d.data("scrollWrapper").length ? (d.wrapInner("<div class='" + c.scrollableAreaClass + "'>").wrapInner("<div class='" + c.scrollWrapperClass + "'>"), d.data("scrollWrapper", d.find("." + c.scrollWrapperClass)), d.data("scrollableArea", d.find("." + c.scrollableAreaClass))) : 0 === d.data("scrollWrapper").length ? (d.wrapInner("<div class='" + c.scrollWrapperClass + "'>"), d.data("scrollWrapper", d.find("." + c.scrollWrapperClass))) : 0 === d.data("scrollableArea").length && (d.data("scrollWrapper").wrapInner("<div class='" + c.scrollableAreaClass + "'>"), d.data("scrollableArea", d.find("." + c.scrollableAreaClass))), 0 === d.data("scrollingHotSpotRight").length ? (d.prepend("<div class='" + c.scrollingHotSpotRightClass + "'></div>"), d.data("scrollingHotSpotRight", d.find("." + c.scrollingHotSpotRightClass))) : d.prepend(d.data("scrollingHotSpotRight")), 0 === d.data("scrollingHotSpotLeft").length ? (d.prepend("<div class='" + c.scrollingHotSpotLeftClass + "'></div>"), d.data("scrollingHotSpotLeft", d.find("." + c.scrollingHotSpotLeftClass))) : d.prepend(d.data("scrollingHotSpotLeft")), d.data("speedBooster", 1), d.data("scrollXPos", 0), d.data("hotSpotWidth", d.data("scrollingHotSpotLeft").innerWidth()), d.data("scrollableAreaWidth", 0), d.data("startingPosition", 0), d.data("rightScrollingInterval", null), d.data("leftScrollingInterval", null), d.data("autoScrollingInterval", null), d.data("hideHotSpotBackgroundsInterval", null), d.data("previousScrollLeft", 0), d.data("pingPongDirection", "right"), d.data("getNextElementWidth", !0), d.data("swapAt", null), d.data("startAtElementHasNotPassed", !0), d.data("swappedElement", null), d.data("originalElements", d.data("scrollableArea").children(c.countOnlyClass)), d.data("visible", !0), d.data("enabled", !0), d.data("scrollableAreaHeight", d.data("scrollableArea").height()), d.data("scrollerOffset", d.offset()), c.touchScrolling && d.data("enabled") && d.data("scrollWrapper").kinetic({
                y: !1,
                moved: function() {
                    c.manualContinuousScrolling && (d.data("scrollWrapper").scrollLeft() <= 0 ? b._checkContinuousSwapLeft() : b._checkContinuousSwapRight()), b._trigger("touchMoved")
                },
                stopped: function() {
                    d.data("scrollWrapper").stop(!0, !1), b.stopAutoScrolling(), b._trigger("touchStopped")
                }
            }), d.data("scrollingHotSpotRight").bind("mousemove", function(b) {
                if (c.hotSpotScrolling) {
                    var e = b.pageX - a(this).offset().left;
                    d.data("scrollXPos", Math.round(e / d.data("hotSpotWidth") * c.hotSpotScrollingStep)), (1 / 0 === d.data("scrollXPos") || d.data("scrollXPos") < 1) && d.data("scrollXPos", 1)
                }
            }), d.data("scrollingHotSpotRight").bind("mouseover", function() {
                c.hotSpotScrolling && (d.data("scrollWrapper").stop(!0, !1), b.stopAutoScrolling(), d.data("rightScrollingInterval", setInterval(function() {
                    d.data("scrollXPos") > 0 && d.data("enabled") && (d.data("scrollWrapper").scrollLeft(d.data("scrollWrapper").scrollLeft() + d.data("scrollXPos") * d.data("speedBooster")), c.manualContinuousScrolling && b._checkContinuousSwapRight(), b._showHideHotSpots())
                }, c.hotSpotScrollingInterval)), b._trigger("mouseOverRightHotSpot"))
            }), d.data("scrollingHotSpotRight").bind("mouseout", function() {
                c.hotSpotScrolling && (clearInterval(d.data("rightScrollingInterval")), d.data("scrollXPos", 0), c.easingAfterHotSpotScrolling && d.data("enabled") && d.data("scrollWrapper").animate({
                    scrollLeft: d.data("scrollWrapper").scrollLeft() + c.easingAfterHotSpotScrollingDistance
                }, {
                    duration: c.easingAfterHotSpotScrollingDuration,
                    easing: c.easingAfterHotSpotScrollingFunction
                }))
            }), d.data("scrollingHotSpotRight").bind("mousedown", function() {
                d.data("speedBooster", c.hotSpotMouseDownSpeedBooster)
            }), a("body").bind("mouseup", function() {
                d.data("speedBooster", 1)
            }), d.data("scrollingHotSpotLeft").bind("mousemove", function(b) {
                if (c.hotSpotScrolling) {
                    var e = d.data("hotSpotWidth") - (b.pageX - a(this).offset().left);
                    d.data("scrollXPos", Math.round(e / d.data("hotSpotWidth") * c.hotSpotScrollingStep)), (1 / 0 === d.data("scrollXPos") || d.data("scrollXPos") < 1) && d.data("scrollXPos", 1)
                }
            }), d.data("scrollingHotSpotLeft").bind("mouseover", function() {
                c.hotSpotScrolling && (d.data("scrollWrapper").stop(!0, !1), b.stopAutoScrolling(), d.data("leftScrollingInterval", setInterval(function() {
                    d.data("scrollXPos") > 0 && d.data("enabled") && (d.data("scrollWrapper").scrollLeft(d.data("scrollWrapper").scrollLeft() - d.data("scrollXPos") * d.data("speedBooster")), c.manualContinuousScrolling && b._checkContinuousSwapLeft(), b._showHideHotSpots())
                }, c.hotSpotScrollingInterval)), b._trigger("mouseOverLeftHotSpot"))
            }), d.data("scrollingHotSpotLeft").bind("mouseout", function() {
                c.hotSpotScrolling && (clearInterval(d.data("leftScrollingInterval")), d.data("scrollXPos", 0), c.easingAfterHotSpotScrolling && d.data("enabled") && d.data("scrollWrapper").animate({
                    scrollLeft: d.data("scrollWrapper").scrollLeft() - c.easingAfterHotSpotScrollingDistance
                }, {
                    duration: c.easingAfterHotSpotScrollingDuration,
                    easing: c.easingAfterHotSpotScrollingFunction
                }))
            }), d.data("scrollingHotSpotLeft").bind("mousedown", function() {
                d.data("speedBooster", c.hotSpotMouseDownSpeedBooster)
            }), d.data("scrollableArea").mousewheel(function(a, e, f, g) {
                if (d.data("enabled") && c.mousewheelScrolling.length > 0) {
                    var h;
                    "vertical" === c.mousewheelScrolling && 0 !== g ? (b.stopAutoScrolling(), a.preventDefault(), h = Math.round(c.mousewheelScrollingStep * g * -1), b.move(h)) : "horizontal" === c.mousewheelScrolling && 0 !== f ? (b.stopAutoScrolling(), a.preventDefault(), h = Math.round(c.mousewheelScrollingStep * f * -1), b.move(h)) : "allDirections" === c.mousewheelScrolling && (b.stopAutoScrolling(), a.preventDefault(), h = Math.round(c.mousewheelScrollingStep * e * -1), b.move(h))
                }
            }), c.mousewheelScrolling && d.data("scrollingHotSpotLeft").add(d.data("scrollingHotSpotRight")).mousewheel(function(a) {
                a.preventDefault()
            }), a(window).bind("resize", function() {
                b._showHideHotSpots(), b._trigger("windowResized")
            }), jQuery.isEmptyObject(c.getContentOnLoad) || b[c.getContentOnLoad.method](c.getContentOnLoad.content, c.getContentOnLoad.manipulationMethod, c.getContentOnLoad.addWhere, c.getContentOnLoad.filterTag), c.hiddenOnStart && b.hide(), a(window).load(function() {
                if (c.hiddenOnStart || b.recalculateScrollableArea(), c.autoScrollingMode.length > 0 && !c.hiddenOnStart && b.startAutoScrolling(), "always" !== c.autoScrollingMode) switch (c.visibleHotSpotBackgrounds) {
                    case "always":
                        b.showHotSpotBackgrounds();
                        break;
                    case "onStart":
                        b.showHotSpotBackgrounds(), d.data("hideHotSpotBackgroundsInterval", setTimeout(function() {
                            b.hideHotSpotBackgrounds(250)
                        }, c.hotSpotsVisibleTime));
                        break;
                    case "hover":
                        d.mouseenter(function(a) {
                            c.hotSpotScrolling && (a.stopPropagation(), b.showHotSpotBackgrounds(250))
                        }).mouseleave(function(a) {
                            c.hotSpotScrolling && (a.stopPropagation(), b.hideHotSpotBackgrounds(250))
                        })
                }
                b._showHideHotSpots(), b._trigger("setupComplete")
            })
        },
        _init: function() {
            {
                var a = this;
                this.element
            }
            a.recalculateScrollableArea(), a._showHideHotSpots(), a._trigger("initializationComplete")
        },
        _setOption: function(a, b) {
            var c = this,
                d = this.options,
                e = this.element;
            d[a] = b, "hotSpotScrolling" === a ? b === !0 ? c._showHideHotSpots() : (e.data("scrollingHotSpotLeft").hide(), e.data("scrollingHotSpotRight").hide()) : "autoScrollingStep" === a || "easingAfterHotSpotScrollingDistance" === a || "easingAfterHotSpotScrollingDuration" === a || "easingAfterMouseWheelScrollingDuration" === a ? d[a] = parseInt(b, 10) : "autoScrollingInterval" === a && (d[a] = parseInt(b, 10), c.startAutoScrolling())
        },
        showHotSpotBackgrounds: function(a) {
            var b = this,
                c = this.element,
                d = this.options;
            void 0 !== a ? (c.data("scrollingHotSpotLeft").addClass(d.scrollingHotSpotLeftVisibleClass), c.data("scrollingHotSpotRight").addClass(d.scrollingHotSpotRightVisibleClass), c.data("scrollingHotSpotLeft").add(c.data("scrollingHotSpotRight")).fadeTo(a, .35)) : (c.data("scrollingHotSpotLeft").addClass(d.scrollingHotSpotLeftVisibleClass), c.data("scrollingHotSpotLeft").removeAttr("style"), c.data("scrollingHotSpotRight").addClass(d.scrollingHotSpotRightVisibleClass), c.data("scrollingHotSpotRight").removeAttr("style")), b._showHideHotSpots()
        },
        hideHotSpotBackgrounds: function(a) {
            var b = this.element,
                c = this.options;
            void 0 !== a ? (b.data("scrollingHotSpotLeft").fadeTo(a, 0, function() {
                b.data("scrollingHotSpotLeft").removeClass(c.scrollingHotSpotLeftVisibleClass)
            }), b.data("scrollingHotSpotRight").fadeTo(a, 0, function() {
                b.data("scrollingHotSpotRight").removeClass(c.scrollingHotSpotRightVisibleClass)
            })) : (b.data("scrollingHotSpotLeft").removeClass(c.scrollingHotSpotLeftVisibleClass).removeAttr("style"), b.data("scrollingHotSpotRight").removeClass(c.scrollingHotSpotRightVisibleClass).removeAttr("style"))
        },
        _showHideHotSpots: function() {
            var a = this,
                b = this.element,
                c = this.options;
            c.hotSpotScrolling ? c.hotSpotScrolling && "always" !== c.autoScrollingMode && null !== b.data("autoScrollingInterval") ? (b.data("scrollingHotSpotLeft").show(), b.data("scrollingHotSpotRight").show()) : "always" !== c.autoScrollingMode && c.hotSpotScrolling ? b.data("scrollableAreaWidth") <= b.data("scrollWrapper").innerWidth() ? (b.data("scrollingHotSpotLeft").hide(), b.data("scrollingHotSpotRight").hide()) : 0 === b.data("scrollWrapper").scrollLeft() ? (b.data("scrollingHotSpotLeft").hide(), b.data("scrollingHotSpotRight").show(), a._trigger("scrollerLeftLimitReached"), clearInterval(b.data("leftScrollingInterval")), b.data("leftScrollingInterval", null)) : b.data("scrollableAreaWidth") <= b.data("scrollWrapper").innerWidth() + b.data("scrollWrapper").scrollLeft() ? (b.data("scrollingHotSpotLeft").show(), b.data("scrollingHotSpotRight").hide(), a._trigger("scrollerRightLimitReached"), clearInterval(b.data("rightScrollingInterval")), b.data("rightScrollingInterval", null)) : (b.data("scrollingHotSpotLeft").show(), b.data("scrollingHotSpotRight").show()) : (b.data("scrollingHotSpotLeft").hide(), b.data("scrollingHotSpotRight").hide()) : (b.data("scrollingHotSpotLeft").hide(), b.data("scrollingHotSpotRight").hide())
        },
        _setElementScrollPosition: function(b, c) {
            var d = this.element,
                e = this.options,
                f = 0;
            switch (b) {
                case "first":
                    return d.data("scrollXPos", 0), !0;
                case "start":
                    return "" !== e.startAtElementId && d.data("scrollableArea").has("#" + e.startAtElementId) ? (f = a("#" + e.startAtElementId).position().left, d.data("scrollXPos", f), !0) : !1;
                case "last":
                    return d.data("scrollXPos", d.data("scrollableAreaWidth") - d.data("scrollWrapper").innerWidth()), !0;
                case "number":
                    return isNaN(c) ? !1 : (f = d.data("scrollableArea").children(e.countOnlyClass).eq(c - 1).position().left, d.data("scrollXPos", f), !0);
                case "id":
                    return c.length > 0 && d.data("scrollableArea").has("#" + c) ? (f = a("#" + c).position().left, d.data("scrollXPos", f), !0) : !1;
                default:
                    return !1
            }
        },
        jumpToElement: function(a, b) {
            var c = this,
                d = this.element;
            if (d.data("enabled") && c._setElementScrollPosition(a, b)) switch (d.data("scrollWrapper").scrollLeft(d.data("scrollXPos")), c._showHideHotSpots(), a) {
                case "first":
                    c._trigger("jumpedToFirstElement");
                    break;
                case "start":
                    c._trigger("jumpedToStartElement");
                    break;
                case "last":
                    c._trigger("jumpedToLastElement");
                    break;
                case "number":
                    c._trigger("jumpedToElementNumber", null, {
                        elementNumber: b
                    });
                    break;
                case "id":
                    c._trigger("jumpedToElementId", null, {
                        elementId: b
                    })
            }
        },
        scrollToElement: function(a, b) {
            var c = this,
                d = this.element,
                e = this.options,
                f = !1;
            d.data("enabled") && c._setElementScrollPosition(a, b) && (null !== d.data("autoScrollingInterval") && (c.stopAutoScrolling(), f = !0), d.data("scrollWrapper").stop(!0, !1), d.data("scrollWrapper").animate({
                scrollLeft: d.data("scrollXPos")
            }, {
                duration: e.scrollToAnimationDuration,
                easing: e.scrollToEasingFunction,
                complete: function() {
                    switch (f && c.startAutoScrolling(), c._showHideHotSpots(), a) {
                        case "first":
                            c._trigger("scrolledToFirstElement");
                            break;
                        case "start":
                            c._trigger("scrolledToStartElement");
                            break;
                        case "last":
                            c._trigger("scrolledToLastElement");
                            break;
                        case "number":
                            c._trigger("scrolledToElementNumber", null, {
                                elementNumber: b
                            });
                            break;
                        case "id":
                            c._trigger("scrolledToElementId", null, {
                                elementId: b
                            })
                    }
                }
            }))
        },
        move: function(a) {
            var b = this,
                c = this.element,
                d = this.options;
            if (c.data("scrollWrapper").stop(!0, !0), 0 > a && c.data("scrollWrapper").scrollLeft() > 0 || a > 0 && c.data("scrollableAreaWidth") > c.data("scrollWrapper").innerWidth() + c.data("scrollWrapper").scrollLeft() || d.manualContinuousScrolling) {
                var e = c.data("scrollableArea").width() - c.data("scrollWrapper").width(),
                    f = c.data("scrollWrapper").scrollLeft() + a;
                if (0 > f)
                    for (var g = function() {
                            c.data("swappedElement", c.data("scrollableArea").children(":last").detach()), c.data("scrollableArea").prepend(c.data("swappedElement")), c.data("scrollWrapper").scrollLeft(c.data("scrollWrapper").scrollLeft() + c.data("swappedElement").outerWidth(!0))
                        }; 0 > f;) g(), f = c.data("scrollableArea").children(":first").outerWidth(!0) + f;
                else if (f - e > 0)
                    for (var h = function() {
                            c.data("swappedElement", c.data("scrollableArea").children(":first").detach()), c.data("scrollableArea").append(c.data("swappedElement"));
                            var a = c.data("scrollWrapper").scrollLeft();
                            c.data("scrollWrapper").scrollLeft(a - c.data("swappedElement").outerWidth(!0))
                        }; f - e > 0;) h(), f -= c.data("scrollableArea").children(":last").outerWidth(!0);
                d.easingAfterMouseWheelScrolling ? c.data("scrollWrapper").animate({
                    scrollLeft: c.data("scrollWrapper").scrollLeft() + a
                }, {
                    duration: d.easingAfterMouseWheelScrollingDuration,
                    easing: d.easingAfterMouseWheelFunction,
                    complete: function() {
                        b._showHideHotSpots(), d.manualContinuousScrolling && (a > 0 ? b._checkContinuousSwapRight() : b._checkContinuousSwapLeft())
                    }
                }) : (c.data("scrollWrapper").scrollLeft(c.data("scrollWrapper").scrollLeft() + a), b._showHideHotSpots(), d.manualContinuousScrolling && (a > 0 ? b._checkContinuousSwapRight() : b._checkContinuousSwapLeft()))
            }
        },
        getFlickrContent: function(b, c) {
            var d = this,
                e = this.element;
            a.getJSON(b, function(b) {
                function f(b, h) {
                    var n = b.media.m,
                        o = n.replace("_m", i[h].letter),
                        p = a("<img />").attr("src", o);
                    p.load(function() {
                        if (this.height < e.data("scrollableAreaHeight") && h + 1 < i.length ? f(b, h + 1) : g(this), m === l) {
                            switch (c) {
                                case "addFirst":
                                    e.data("scrollableArea").children(":first").before(j);
                                    break;
                                case "addLast":
                                    e.data("scrollableArea").children(":last").after(j);
                                    break;
                                default:
                                    e.data("scrollableArea").html(j)
                            }
                            d.recalculateScrollableArea(), d._showHideHotSpots(), d._trigger("addedFlickrContent", null, {
                                addedElementIds: k
                            })
                        }
                    })
                }

                function g(b) {
                    var c = e.data("scrollableAreaHeight") / b.height,
                        d = Math.round(b.width * c),
                        f = a(b).attr("src").split("/"),
                        g = f.length - 1;
                    f = f[g].split("."), a(b).attr("id", f[0]), a(b).css({
                        height: e.data("scrollableAreaHeight"),
                        width: d
                    }), k.push(f[0]), j.push(b), m++
                }
                var h, i = [{
                        size: "small square",
                        pixels: 75,
                        letter: "_s"
                    }, {
                        size: "thumbnail",
                        pixels: 100,
                        letter: "_t"
                    }, {
                        size: "small",
                        pixels: 240,
                        letter: "_m"
                    }, {
                        size: "medium",
                        pixels: 500,
                        letter: ""
                    }, {
                        size: "medium 640",
                        pixels: 640,
                        letter: "_z"
                    }, {
                        size: "large",
                        pixels: 1024,
                        letter: "_b"
                    }],
                    j = [],
                    k = [],
                    l = b.items.length,
                    m = 0;
                h = e.data("scrollableAreaHeight") <= 75 ? 0 : e.data("scrollableAreaHeight") <= 100 ? 1 : e.data("scrollableAreaHeight") <= 240 ? 2 : e.data("scrollableAreaHeight") <= 500 ? 3 : e.data("scrollableAreaHeight") <= 640 ? 4 : 5, a.each(b.items, function(a, b) {
                    f(b, h)
                })
            })
        },
        getAjaxContent: function(b, c, d) {
            var e = this,
                f = this.element;
            a.ajaxSetup({
                cache: !1
            }), a.get(b, function(g) {
                var h;
                switch (h = void 0 !== d ? d.length > 0 ? a("<div>").html(g).find(d) : b : g, c) {
                    case "addFirst":
                        f.data("scrollableArea").children(":first").before(h);
                        break;
                    case "addLast":
                        f.data("scrollableArea").children(":last").after(h);
                        break;
                    default:
                        f.data("scrollableArea").html(h)
                }
                e.recalculateScrollableArea(), e._showHideHotSpots(), e._trigger("addedAjaxContent")
            })
        },
        getHtmlContent: function(b, c, d) {
            var e, f = this,
                g = this.element;
            switch (e = void 0 !== d && d.length > 0 ? a("<div>").html(b).find(d) : b, c) {
                case "addFirst":
                    g.data("scrollableArea").children(":first").before(e);
                    break;
                case "addLast":
                    g.data("scrollableArea").children(":last").after(e);
                    break;
                default:
                    g.data("scrollableArea").html(e)
            }
            f.recalculateScrollableArea(), f._showHideHotSpots(), f._trigger("addedHtmlContent")
        },
        recalculateScrollableArea: function() {
            var b = 0,
                c = !1,
                d = this.options,
                e = this.element;
            e.data("scrollableArea").children(d.countOnlyClass).each(function() {
                d.startAtElementId.length > 0 && a(this).attr("id") === d.startAtElementId && (e.data("startingPosition", b), c = !0), b += a(this).outerWidth(!0)
            }), c || e.data("startAtElementId", ""), e.data("scrollableAreaWidth", b), e.data("scrollableArea").width(e.data("scrollableAreaWidth")), e.data("scrollWrapper").scrollLeft(e.data("startingPosition")), e.data("scrollXPos", e.data("startingPosition"))
        },
        getScrollerOffset: function() {
            var a = this.element;
            return a.data("scrollWrapper").scrollLeft()
        },
        stopAutoScrolling: function() {
            var a = this,
                b = this.element;
            null !== b.data("autoScrollingInterval") && (clearInterval(b.data("autoScrollingInterval")), b.data("autoScrollingInterval", null), a._showHideHotSpots(), a._trigger("autoScrollingStopped"))
        },
        startAutoScrolling: function() {
            var a = this,
                b = this.element,
                c = this.options;
            b.data("enabled") && (a._showHideHotSpots(), clearInterval(b.data("autoScrollingInterval")), b.data("autoScrollingInterval", null), a._trigger("autoScrollingStarted"), b.data("autoScrollingInterval", setInterval(function() {
                if (!b.data("visible") || b.data("scrollableAreaWidth") <= b.data("scrollWrapper").innerWidth()) clearInterval(b.data("autoScrollingInterval")), b.data("autoScrollingInterval", null);
                else switch (b.data("previousScrollLeft", b.data("scrollWrapper").scrollLeft()), c.autoScrollingDirection) {
                    case "right":
                        b.data("scrollWrapper").scrollLeft(b.data("scrollWrapper").scrollLeft() + c.autoScrollingStep), b.data("previousScrollLeft") === b.data("scrollWrapper").scrollLeft() && (a._trigger("autoScrollingRightLimitReached"), a.stopAutoScrolling());
                        break;
                    case "left":
                        b.data("scrollWrapper").scrollLeft(b.data("scrollWrapper").scrollLeft() - c.autoScrollingStep), b.data("previousScrollLeft") === b.data("scrollWrapper").scrollLeft() && (a._trigger("autoScrollingLeftLimitReached"), a.stopAutoScrolling());
                        break;
                    case "backAndForth":
                        b.data("scrollWrapper").scrollLeft("right" === b.data("pingPongDirection") ? b.data("scrollWrapper").scrollLeft() + c.autoScrollingStep : b.data("scrollWrapper").scrollLeft() - c.autoScrollingStep), b.data("previousScrollLeft") === b.data("scrollWrapper").scrollLeft() && ("right" === b.data("pingPongDirection") ? (b.data("pingPongDirection", "left"), a._trigger("autoScrollingRightLimitReached")) : (b.data("pingPongDirection", "right"), a._trigger("autoScrollingLeftLimitReached")));
                        break;
                    case "endlessLoopRight":
                        b.data("scrollWrapper").scrollLeft(b.data("scrollWrapper").scrollLeft() + c.autoScrollingStep), a._checkContinuousSwapRight();
                        break;
                    case "endlessLoopLeft":
                        b.data("scrollWrapper").scrollLeft(b.data("scrollWrapper").scrollLeft() - c.autoScrollingStep), a._checkContinuousSwapLeft()
                }
            }, c.autoScrollingInterval)))
        },
        _checkContinuousSwapRight: function() {
            var b = this.element,
                c = this.options;
            if (b.data("getNextElementWidth") && (c.startAtElementId.length > 0 && b.data("startAtElementHasNotPassed") ? (b.data("swapAt", a("#" + c.startAtElementId).outerWidth(!0)), b.data("startAtElementHasNotPassed", !1)) : b.data("swapAt", b.data("scrollableArea").children(":first").outerWidth(!0)), b.data("getNextElementWidth", !1)), b.data("swapAt") <= b.data("scrollWrapper").scrollLeft()) {
                b.data("swappedElement", b.data("scrollableArea").children(":first").detach()), b.data("scrollableArea").append(b.data("swappedElement"));
                var d = b.data("scrollWrapper").scrollLeft();
                b.data("scrollWrapper").scrollLeft(d - b.data("swappedElement").outerWidth(!0)), b.data("getNextElementWidth", !0)
            }
        },
        _checkContinuousSwapLeft: function() {
            var b = this.element,
                c = this.options;
            b.data("getNextElementWidth") && (c.startAtElementId.length > 0 && b.data("startAtElementHasNotPassed") ? (b.data("swapAt", a("#" + c.startAtElementId).outerWidth(!0)), b.data("startAtElementHasNotPassed", !1)) : b.data("swapAt", b.data("scrollableArea").children(":first").outerWidth(!0)), b.data("getNextElementWidth", !1)), 0 === b.data("scrollWrapper").scrollLeft() && (b.data("swappedElement", b.data("scrollableArea").children(":last").detach()), b.data("scrollableArea").prepend(b.data("swappedElement")), b.data("scrollWrapper").scrollLeft(b.data("scrollWrapper").scrollLeft() + b.data("swappedElement").outerWidth(!0)), b.data("getNextElementWidth", !0))
        },
        restoreOriginalElements: function() {
            var a = this,
                b = this.element;
            b.data("scrollableArea").html(b.data("originalElements")), a.recalculateScrollableArea(), a.jumpToElement("first")
        },
        show: function() {
            var a = this.element;
            a.data("visible", !0), a.show()
        },
        hide: function() {
            var a = this.element;
            a.data("visible", !1), a.hide()
        },
        enable: function() {
            var a = this.element;
            this.options.touchScrolling && a.data("scrollWrapper").kinetic("attach"), a.data("enabled", !0)
        },
        disable: function() {
            var a = this,
                b = this.element;
            a.stopAutoScrolling(), clearInterval(b.data("rightScrollingInterval")), clearInterval(b.data("leftScrollingInterval")), clearInterval(b.data("hideHotSpotBackgroundsInterval")), this.options.touchScrolling && b.data("scrollWrapper").kinetic("detach"), b.data("enabled", !1)
        },
        destroy: function() {
            var b = this,
                c = this.element;
            b.stopAutoScrolling(), clearInterval(c.data("rightScrollingInterval")), clearInterval(c.data("leftScrollingInterval")), clearInterval(c.data("hideHotSpotBackgroundsInterval")), c.data("scrollingHotSpotRight").unbind("mouseover"), c.data("scrollingHotSpotRight").unbind("mouseout"), c.data("scrollingHotSpotRight").unbind("mousedown"), c.data("scrollingHotSpotLeft").unbind("mouseover"), c.data("scrollingHotSpotLeft").unbind("mouseout"), c.data("scrollingHotSpotLeft").unbind("mousedown"), c.unbind("mousenter"), c.unbind("mouseleave"), c.data("scrollingHotSpotRight").remove(), c.data("scrollingHotSpotLeft").remove(), c.data("scrollableArea").remove(), c.data("scrollWrapper").remove(), c.html(c.data("originalElements")), a.Widget.prototype.destroy.apply(this, arguments)
        }
    })
}(jQuery),
function(a, b) {
    function c(b, c, d, e) {
        var f, g = b.text().split(c),
            h = "";
        g.length && (a(g).each(function(a, b) {
            f = "", " " === b && (f = " empty", b = "&nbsp;"), h += '<span class="' + d + (a + 1) + f + '">' + b + "</span>" + e
        }), b.empty().append(h))
    }
    var d = {
        init: function() {
            return this.each(function() {
                c(a(this), "", "char", "")
            })
        },
        words: function() {
            return this.each(function() {
                c(a(this), " ", "word", " ")
            })
        },
        lines: function() {
            return this.each(function() {
                var b = "eefec303079ad17405c889e092e105b0";
                c(a(this).children("br").replaceWith(b).end(), b, "line", "")
            })
        }
    };
    a.fn.lettering = function(b) {
        return b && d[b] ? d[b].apply(this, [].slice.call(arguments, 1)) : "letters" !== b && b ? (a.error("Method " + b + " does not exist on jQuery.lettering"), this) : d.init.apply(this, [].slice.call(arguments, 0))
    }, a.Arctext = function(b, c) {
        this.$el = a(c), this._init(b)
    }, a.Arctext.defaults = {
        radius: 0,
        dir: 1,
        rotate: !0,
        fitText: !1
    }, a.Arctext.prototype = {
        _init: function(b) {
            this.options = a.extend(!0, {}, a.Arctext.defaults, b), this._applyLettering(), this.$el.data("arctext", !0), this._calc(), this._rotateWord(), this._loadEvents()
        },
        _applyLettering: function() {
            this.$el.lettering(), this.options.fitText && this.$el.fitText(), this.$letters = this.$el.find("span").css("display", "inline-block")
        },
        _calc: function() {
            return -1 === this.options.radius ? !1 : (this._calcBase(), void this._calcLetters())
        },
        _calcBase: function() {
            this.dtWord = 0;
            var b = this;
            this.$letters.each(function() {
                var c = a(this),
                    d = c.outerWidth(!0);
                b.dtWord += d, c.data("center", b.dtWord - d / 2)
            });
            var c = this.dtWord / 2;
            this.options.radius < c && (this.options.radius = c), this.dtArcBase = this.dtWord;
            var d = 2 * Math.asin(this.dtArcBase / (2 * this.options.radius));
            this.dtArc = this.options.radius * d
        },
        _calcLetters: function() {
            var b = this,
                c = 0;
            this.$letters.each(function() {
                var d = a(this),
                    e = d.outerWidth(!0) / b.dtWord * b.dtArc,
                    f = e / b.options.radius,
                    g = b.options.radius * Math.cos(f / 2),
                    h = Math.acos((b.dtWord / 2 - c) / b.options.radius),
                    i = h + f / 2,
                    j = Math.cos(i) * g,
                    k = Math.sin(i) * g,
                    l = c + Math.abs(b.dtWord / 2 - j - c),
                    m = 0 | l - d.data("center"),
                    n = 0 | b.options.radius - k,
                    o = b.options.rotate ? 0 | -Math.asin(j / b.options.radius) * (180 / Math.PI) : 0;
                c = 2 * l - c, d.data({
                    x: m,
                    y: 1 === b.options.dir ? n : -n,
                    a: 1 === b.options.dir ? o : -o
                })
            })
        },
        _rotateWord: function(b) {
            if (!this.$el.data("arctext")) return !1;
            var c = this;
            this.$letters.each(function() {
                var d = a(this),
                    e = -1 === c.options.radius ? "none" : "translateX(" + d.data("x") + "px) translateY(" + d.data("y") + "px) rotate(" + d.data("a") + "deg)",
                    f = b ? "all " + (b.speed || 0) + "ms " + (b.easing || "linear") : "none";
                d.css({
                    "-webkit-transition": f,
                    "-moz-transition": f,
                    "-o-transition": f,
                    "-ms-transition": f,
                    transition: f
                }).css({
                    "-webkit-transform": e,
                    "-moz-transform": e,
                    "-o-transform": e,
                    "-ms-transform": e,
                    transform: e
                })
            })
        },
        _loadEvents: function() {
            if (this.options.fitText) {
                var b = this;
                a(window).on("resize.arctext", function() {
                    b._calc(), b._rotateWord()
                })
            }
        },
        set: function(a) {
            return a.radius || a.dir || "undefined" !== a.rotate ? (this.options.radius = a.radius || this.options.radius, this.options.dir = a.dir || this.options.dir, a.rotate !== b && (this.options.rotate = a.rotate), this._calc(), void this._rotateWord(a.animation)) : !1
        },
        destroy: function() {
            this.options.radius = -1, this._rotateWord(), this.$letters.removeData("x y a center"), this.$el.removeData("arctext"), a(window).off(".arctext")
        }
    };
    var e = function(a) {
        this.console && console.error(a)
    };
    a.fn.arctext = function(b) {
        if ("string" == typeof b) {
            var c = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var d = a.data(this, "arctext");
                return d ? a.isFunction(d[b]) && "_" !== b.charAt(0) ? void d[b].apply(d, c) : void e("no such method '" + b + "' for arctext instance") : void e("cannot call methods on arctext prior to initialization; attempted to call method '" + b + "'")
            })
        } else this.each(function() {
            var c = a.data(this, "arctext");
            c || a.data(this, "arctext", new a.Arctext(b, this))
        });
        return this
    }
}(jQuery),
function(a, b, c) {
    "function" == typeof define && define.amd ? define(["jquery"], function(d) {
        return c(d, a, b), d.mobile
    }) : c(a.jQuery, a, b)
}(this, document, function(a, b, c) {
    ! function(a) {
        a.extend(a.support, {
            orientation: "orientation" in b && "onorientationchange" in b
        })
    }(a),
    function(a) {
        a.event.special.throttledresize = {
            setup: function() {
                a(this).bind("resize", f)
            },
            teardown: function() {
                a(this).unbind("resize", f)
            }
        };
        var b, c, d, e = 250,
            f = function() {
                c = (new Date).getTime(), d = c - g, d >= e ? (g = c, a(this).trigger("throttledresize")) : (b && clearTimeout(b), b = setTimeout(f, e - d))
            },
            g = 0
    }(a),
    function(a, b) {
        function d() {
            var a = e();
            a !== f && (f = a, l.trigger(m))
        }
        var e, f, g, h, i, j, k, l = a(b),
            m = "orientationchange",
            n = {
                0: !0,
                180: !0
            };
        a.support.orientation && (i = b.innerWidth || l.width(), j = b.innerHeight || l.height(), k = 50, g = i > j && i - j > k, h = n[b.orientation], (g && h || !g && !h) && (n = {
            "-90": !0,
            90: !0
        })), a.event.special.orientationchange = a.extend({}, a.event.special.orientationchange, {
            setup: function() {
                return a.support.orientation && !a.event.special.orientationchange.disabled ? !1 : (f = e(), void l.bind("throttledresize", d))
            },
            teardown: function() {
                return a.support.orientation && !a.event.special.orientationchange.disabled ? !1 : void l.unbind("throttledresize", d)
            },
            add: function(a) {
                var b = a.handler;
                a.handler = function(a) {
                    return a.orientation = e(), b.apply(this, arguments)
                }
            }
        }), a.event.special.orientationchange.orientation = e = function() {
            var d = !0,
                e = c.documentElement;
            return d = a.support.orientation ? n[b.orientation] : e && e.clientWidth / e.clientHeight < 1.1, d ? "portrait" : "landscape"
        }, a.fn[m] = function(a) {
            return a ? this.bind(m, a) : this.trigger(m)
        }, a.attrFn && (a.attrFn[m] = !0)
    }(a, this),
    function(a, b, c, d) {
        function e(a) {
            for (; a && "undefined" != typeof a.originalEvent;) a = a.originalEvent;
            return a
        }

        function f(b, c) {
            var f, g, h, i, j, k, l, m, n, o = b.type;
            if (b = a.Event(b), b.type = c, f = b.originalEvent, g = a.event.props, o.search(/^(mouse|click)/) > -1 && (g = E), f)
                for (l = g.length, i; l;) i = g[--l], b[i] = f[i];
            if (o.search(/mouse(down|up)|click/) > -1 && !b.which && (b.which = 1), -1 !== o.search(/^touch/) && (h = e(f), o = h.touches, j = h.changedTouches, k = o && o.length ? o[0] : j && j.length ? j[0] : d, k))
                for (m = 0, n = C.length; n > m; m++) i = C[m], b[i] = k[i];
            return b
        }

        function g(b) {
            for (var c, d, e = {}; b;) {
                c = a.data(b, z);
                for (d in c) c[d] && (e[d] = e.hasVirtualBinding = !0);
                b = b.parentNode
            }
            return e
        }

        function h(b, c) {
            for (var d; b;) {
                if (d = a.data(b, z), d && (!c || d[c])) return b;
                b = b.parentNode
            }
            return null
        }

        function i() {
            M = !1
        }

        function j() {
            M = !0
        }

        function k() {
            Q = 0, K.length = 0, L = !1, j()
        }

        function l() {
            i()
        }

        function m() {
            n(), G = setTimeout(function() {
                G = 0, k()
            }, a.vmouse.resetTimerDuration)
        }

        function n() {
            G && (clearTimeout(G), G = 0)
        }

        function o(b, c, d) {
            var e;
            return (d && d[b] || !d && h(c.target, b)) && (e = f(c, b), a(c.target).trigger(e)), e
        }

        function p(b) {
            var c, d = a.data(b.target, A);
            !L && (!Q || Q !== d) && (c = o("v" + b.type, b), c && (c.isDefaultPrevented() && b.preventDefault(), c.isPropagationStopped() && b.stopPropagation(), c.isImmediatePropagationStopped() && b.stopImmediatePropagation()))
        }

        function q(b) {
            var c, d, f, h = e(b).touches;
            h && 1 === h.length && (c = b.target, d = g(c), d.hasVirtualBinding && (Q = P++, a.data(c, A, Q), n(), l(), J = !1, f = e(b).touches[0], H = f.pageX, I = f.pageY, o("vmouseover", b, d), o("vmousedown", b, d)))
        }

        function r(a) {
            M || (J || o("vmousecancel", a, g(a.target)), J = !0, m())
        }

        function s(b) {
            if (!M) {
                var c = e(b).touches[0],
                    d = J,
                    f = a.vmouse.moveDistanceThreshold,
                    h = g(b.target);
                J = J || Math.abs(c.pageX - H) > f || Math.abs(c.pageY - I) > f, J && !d && o("vmousecancel", b, h), o("vmousemove", b, h), m()
            }
        }

        function t(a) {
            if (!M) {
                j();
                var b, c, d = g(a.target);
                o("vmouseup", a, d), J || (b = o("vclick", a, d), b && b.isDefaultPrevented() && (c = e(a).changedTouches[0], K.push({
                    touchID: Q,
                    x: c.clientX,
                    y: c.clientY
                }), L = !0)), o("vmouseout", a, d), J = !1, m()
            }
        }

        function u(b) {
            var c, d = a.data(b, z);
            if (d)
                for (c in d)
                    if (d[c]) return !0;
            return !1
        }

        function v() {}

        function w(b) {
            var c = b.substr(1);
            return {
                setup: function() {
                    u(this) || a.data(this, z, {});
                    var d = a.data(this, z);
                    d[b] = !0, F[b] = (F[b] || 0) + 1, 1 === F[b] && O.bind(c, p), a(this).bind(c, v), N && (F.touchstart = (F.touchstart || 0) + 1, 1 === F.touchstart && O.bind("touchstart", q).bind("touchend", t).bind("touchmove", s).bind("scroll", r))
                },
                teardown: function() {
                    --F[b], F[b] || O.unbind(c, p), N && (--F.touchstart, F.touchstart || O.unbind("touchstart", q).unbind("touchmove", s).unbind("touchend", t).unbind("scroll", r));
                    var d = a(this),
                        e = a.data(this, z);
                    e && (e[b] = !1), d.unbind(c, v), u(this) || d.removeData(z)
                }
            }
        }
        var x, y, z = "virtualMouseBindings",
            A = "virtualTouchID",
            B = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            C = "clientX clientY pageX pageY screenX screenY".split(" "),
            D = a.event.mouseHooks ? a.event.mouseHooks.props : [],
            E = a.event.props.concat(D),
            F = {},
            G = 0,
            H = 0,
            I = 0,
            J = !1,
            K = [],
            L = !1,
            M = !1,
            N = "addEventListener" in c,
            O = a(c),
            P = 1,
            Q = 0;
        for (a.vmouse = {
                moveDistanceThreshold: 10,
                clickDistanceThreshold: 10,
                resetTimerDuration: 1500
            }, y = 0; y < B.length; y++) a.event.special[B[y]] = w(B[y]);
        N && c.addEventListener("click", function(b) {
            var c, d, e, f, g, h, i = K.length,
                j = b.target;
            if (i)
                for (c = b.clientX, d = b.clientY, x = a.vmouse.clickDistanceThreshold, e = j; e;) {
                    for (f = 0; i > f; f++)
                        if (g = K[f], h = 0, e === j && Math.abs(g.x - c) < x && Math.abs(g.y - d) < x || a.data(e, A) === g.touchID) return b.preventDefault(), void b.stopPropagation();
                    e = e.parentNode
                }
        }, !0)
    }(a, b, c),
    function(a) {
        a.mobile = {}
    }(a),
    function(a) {
        var b = {
            touch: "ontouchend" in c
        };
        a.mobile.support = a.mobile.support || {}, a.extend(a.support, b), a.extend(a.mobile.support, b)
    }(a),
    function(a, b, d) {
        function e(b, c, e, f) {
            var g = e.type;
            e.type = c, f ? a.event.trigger(e, d, b) : a.event.dispatch.call(b, e), e.type = g
        }
        var f = a(c),
            g = a.mobile.support.touch,
            h = "touchmove scroll",
            i = g ? "touchstart" : "mousedown",
            j = g ? "touchend" : "mouseup",
            k = g ? "touchmove" : "mousemove";
        a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(b, c) {
            a.fn[c] = function(a) {
                return a ? this.bind(c, a) : this.trigger(c)
            }, a.attrFn && (a.attrFn[c] = !0)
        }), a.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function b(a, b) {
                    c = b, e(f, c ? "scrollstart" : "scrollstop", a)
                }
                var c, d, f = this,
                    g = a(f);
                g.bind(h, function(e) {
                    a.event.special.scrollstart.enabled && (c || b(e, !0), clearTimeout(d), d = setTimeout(function() {
                        b(e, !1)
                    }, 50))
                })
            },
            teardown: function() {
                a(this).unbind(h)
            }
        }, a.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
                var b = this,
                    c = a(b),
                    d = !1;
                c.bind("vmousedown", function(g) {
                    function h() {
                        clearTimeout(k)
                    }

                    function i() {
                        h(), c.unbind("vclick", j).unbind("vmouseup", h), f.unbind("vmousecancel", i)
                    }

                    function j(a) {
                        i(), d || l !== a.target ? d && a.stopPropagation() : e(b, "tap", a)
                    }
                    if (d = !1, g.which && 1 !== g.which) return !1;
                    var k, l = g.target;
                    c.bind("vmouseup", h).bind("vclick", j), f.bind("vmousecancel", i), k = setTimeout(function() {
                        a.event.special.tap.emitTapOnTaphold || (d = !0), e(b, "taphold", a.Event("taphold", {
                            target: l
                        }))
                    }, a.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function() {
                a(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), f.unbind("vmousecancel")
            }
        }, a.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function(a) {
                var c = b.pageXOffset,
                    d = b.pageYOffset,
                    e = a.clientX,
                    f = a.clientY;
                return 0 === a.pageY && Math.floor(f) > Math.floor(a.pageY) || 0 === a.pageX && Math.floor(e) > Math.floor(a.pageX) ? (e -= c, f -= d) : (f < a.pageY - d || e < a.pageX - c) && (e = a.pageX - c, f = a.pageY - d), {
                    x: e,
                    y: f
                }
            },
            start: function(b) {
                var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                    d = a.event.special.swipe.getLocation(c);
                return {
                    time: (new Date).getTime(),
                    coords: [d.x, d.y],
                    origin: a(b.target)
                }
            },
            stop: function(b) {
                var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                    d = a.event.special.swipe.getLocation(c);
                return {
                    time: (new Date).getTime(),
                    coords: [d.x, d.y]
                }
            },
            handleSwipe: function(b, c, d, f) {
                if (c.time - b.time < a.event.special.swipe.durationThreshold && Math.abs(b.coords[0] - c.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(b.coords[1] - c.coords[1]) < a.event.special.swipe.verticalDistanceThreshold) {
                    var g = b.coords[0] > c.coords[0] ? "swipeleft" : "swiperight";
                    return e(d, "swipe", a.Event("swipe", {
                        target: f,
                        swipestart: b,
                        swipestop: c
                    }), !0), e(d, g, a.Event(g, {
                        target: f,
                        swipestart: b,
                        swipestop: c
                    }), !0), !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function() {
                var b, c = this,
                    d = a(c),
                    e = {};
                b = a.data(this, "mobile-events"), b || (b = {
                    length: 0
                }, a.data(this, "mobile-events", b)), b.length++, b.swipe = e, e.start = function(b) {
                    if (!a.event.special.swipe.eventInProgress) {
                        a.event.special.swipe.eventInProgress = !0;
                        var d, g = a.event.special.swipe.start(b),
                            h = b.target,
                            i = !1;
                        e.move = function(b) {
                            g && (d = a.event.special.swipe.stop(b), i || (i = a.event.special.swipe.handleSwipe(g, d, c, h), i && (a.event.special.swipe.eventInProgress = !1)), Math.abs(g.coords[0] - d.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && b.preventDefault())
                        }, e.stop = function() {
                            i = !0, a.event.special.swipe.eventInProgress = !1, f.off(k, e.move), e.move = null
                        }, f.on(k, e.move).one(j, e.stop)
                    }
                }, d.on(i, e.start)
            },
            teardown: function() {
                var b, c;
                b = a.data(this, "mobile-events"), b && (c = b.swipe, delete b.swipe, b.length--, 0 === b.length && a.removeData(this, "mobile-events")), c && (c.start && a(this).off(i, c.start), c.move && f.off(k, c.move), c.stop && f.off(j, c.stop))
            }
        }, a.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe",
            swiperight: "swipe"
        }, function(b, c) {
            a.event.special[b] = {
                setup: function() {
                    a(this).bind(c, a.noop)
                },
                teardown: function() {
                    a(this).unbind(c)
                }
            }
        })
    }(a, this)
}),




function(a, b, c, d) {
    function e(b, c) {
        this.element = b, this.options = a.extend({}, g, c), this._defaults = g, this._name = f, this.init()
    }
    var f = "stellar",
        g = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: !0,
            verticalScrolling: !0,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: !1,
            parallaxBackgrounds: !0,
            parallaxElements: !0,
            hideDistantElements: !0,
            hideElement: function(a) {
                a.hide()
            },
            showElement: function(a) {
                a.show()
            }
        },
        h = {
            scroll: {
                getLeft: function(a) {
                    return a.scrollLeft()
                },
                setLeft: function(a, b) {
                    a.scrollLeft(b)
                },
                getTop: function(a) {
                    return a.scrollTop()
                },
                setTop: function(a, b) {
                    a.scrollTop(b)
                }
            },
            position: {
                getLeft: function(a) {
                    return -1 * parseInt(a.css("left"), 10)
                },
                getTop: function(a) {
                    return -1 * parseInt(a.css("top"), 10)
                }
            },
            margin: {
                getLeft: function(a) {
                    return -1 * parseInt(a.css("margin-left"), 10)
                },
                getTop: function(a) {
                    return -1 * parseInt(a.css("margin-top"), 10)
                }
            },
            transform: {
                getLeft: function(a) {
                    var b = getComputedStyle(a[0])[k];
                    return "none" !== b ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[4], 10) : 0
                },
                getTop: function(a) {
                    var b = getComputedStyle(a[0])[k];
                    return "none" !== b ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[5], 10) : 0
                }
            }
        },
        i = {
            position: {
                setLeft: function(a, b) {
                    a.css("left", b)
                },
                setTop: function(a, b) {
                    a.css("top", b)
                }
            },
            transform: {
                setPosition: function(a, b, c, d, e) {
                    a[0].style[k] = "translate3d(" + (b - c) + "px, " + (d - e) + "px, 0)"
                }
            }
        },
        j = function() {
            var b, c = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                d = a("script")[0].style,
                e = "";
            for (b in d)
                if (c.test(b)) {
                    e = b.match(c)[0];
                    break
                } return "WebkitOpacity" in d && (e = "Webkit"), "KhtmlOpacity" in d && (e = "Khtml"),
                function(a) {
                    return e + (e.length > 0 ? a.charAt(0).toUpperCase() + a.slice(1) : a)
                }
        }(),
        k = j("transform"),
        l = a("<div />", {
            style: "background:#fff"
        }).css("background-position-x") !== d,
        m = l ? function(a, b, c) {
            a.css({
                "background-position-x": b,
                "background-position-y": c
            })
        } : function(a, b, c) {
            a.css("background-position", b + " " + c)
        },
        n = l ? function(a) {
            return [a.css("background-position-x"), a.css("background-position-y")]
        } : function(a) {
            return a.css("background-position").split(" ")
        },
        o = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function(a) {
            setTimeout(a, 1e3 / 60)
        };
    e.prototype = {
        init: function() {
            this.options.name = f + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({
                firstLoad: !0
            }), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
        },
        _defineElements: function() {
            this.element === c.body && (this.element = b), this.$scrollElement = a(this.element), this.$element = this.element === b ? a("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== d ? a(this.options.viewportElement) : this.$scrollElement[0] === b || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent()
        },
        _defineGetters: function() {
            var a = this,
                b = h[a.options.scrollProperty];
            this._getScrollLeft = function() {
                return b.getLeft(a.$scrollElement)
            }, this._getScrollTop = function() {
                return b.getTop(a.$scrollElement)
            }
        },
        _defineSetters: function() {
            var b = this,
                c = h[b.options.scrollProperty],
                d = i[b.options.positionProperty],
                e = c.setLeft,
                f = c.setTop;
            this._setScrollLeft = "function" == typeof e ? function(a) {
                e(b.$scrollElement, a)
            } : a.noop, this._setScrollTop = "function" == typeof f ? function(a) {
                f(b.$scrollElement, a)
            } : a.noop, this._setPosition = d.setPosition || function(a, c, e, f, g) {
                b.options.horizontalScrolling && d.setLeft(a, c, e), b.options.verticalScrolling && d.setTop(a, f, g)
            }
        },
        _handleWindowLoadAndResize: function() {
            var c = this,
                d = a(b);
            c.options.responsive && d.bind("load." + this.name, function() {
                c.refresh()
            }), d.bind("resize." + this.name, function() {
                c._detectViewport(), c.options.responsive && c.refresh()
            })
        },
        refresh: function(c) {
            var d = this,
                e = d._getScrollLeft(),
                f = d._getScrollTop();
            c && c.firstLoad || this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), c && c.firstLoad && /WebKit/.test(navigator.userAgent) && a(b).load(function() {
                var a = d._getScrollLeft(),
                    b = d._getScrollTop();
                d._setScrollLeft(a + 1), d._setScrollTop(b + 1), d._setScrollLeft(a), d._setScrollTop(b)
            }), this._setScrollLeft(e), this._setScrollTop(f)
        },
        _detectViewport: function() {
            var a = this.$viewportElement.offset(),
                b = null !== a && a !== d;
            this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = b ? a.top : 0, this.viewportOffsetLeft = b ? a.left : 0
        },
        _findParticles: function() {
            {
                var b = this;
                this._getScrollLeft(), this._getScrollTop()
            }
            if (this.particles !== d)
                for (var c = this.particles.length - 1; c >= 0; c--) this.particles[c].$element.data("stellar-elementIsActive", d);
            this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function() {
                var c, e, f, g, h, i, j, k, l, m = a(this),
                    n = 0,
                    o = 0,
                    p = 0,
                    q = 0;
                if (m.data("stellar-elementIsActive")) {
                    if (m.data("stellar-elementIsActive") !== this) return
                } else m.data("stellar-elementIsActive", this);
                b.options.showElement(m), m.data("stellar-startingLeft") ? (m.css("left", m.data("stellar-startingLeft")), m.css("top", m.data("stellar-startingTop"))) : (m.data("stellar-startingLeft", m.css("left")), m.data("stellar-startingTop", m.css("top"))), f = m.position().left, g = m.position().top, h = "auto" === m.css("margin-left") ? 0 : parseInt(m.css("margin-left"), 10), i = "auto" === m.css("margin-top") ? 0 : parseInt(m.css("margin-top"), 10), k = m.offset().left - h, l = m.offset().top - i, m.parents().each(function() {
                    var b = a(this);
                    return b.data("stellar-offset-parent") === !0 ? (n = p, o = q, j = b, !1) : (p += b.position().left, void(q += b.position().top))
                }), c = m.data("stellar-horizontal-offset") !== d ? m.data("stellar-horizontal-offset") : j !== d && j.data("stellar-horizontal-offset") !== d ? j.data("stellar-horizontal-offset") : b.horizontalOffset, e = m.data("stellar-vertical-offset") !== d ? m.data("stellar-vertical-offset") : j !== d && j.data("stellar-vertical-offset") !== d ? j.data("stellar-vertical-offset") : b.verticalOffset, b.particles.push({
                    $element: m,
                    $offsetParent: j,
                    isFixed: "fixed" === m.css("position"),
                    horizontalOffset: c,
                    verticalOffset: e,
                    startingPositionLeft: f,
                    startingPositionTop: g,
                    startingOffsetLeft: k,
                    startingOffsetTop: l,
                    parentOffsetLeft: n,
                    parentOffsetTop: o,
                    stellarRatio: m.data("stellar-ratio") !== d ? m.data("stellar-ratio") : 1,
                    width: m.outerWidth(!0),
                    height: m.outerHeight(!0),
                    isHidden: !1
                })
            })
        },
        _findBackgrounds: function() {
            var b, c = this,
                e = this._getScrollLeft(),
                f = this._getScrollTop();
            this.backgrounds = [], this.options.parallaxBackgrounds && (b = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (b = b.add(this.$element)), b.each(function() {
                var b, g, h, i, j, k, l, o = a(this),
                    p = n(o),
                    q = 0,
                    r = 0,
                    s = 0,
                    t = 0;
                if (o.data("stellar-backgroundIsActive")) {
                    if (o.data("stellar-backgroundIsActive") !== this) return
                } else o.data("stellar-backgroundIsActive", this);
                o.data("stellar-backgroundStartingLeft") ? m(o, o.data("stellar-backgroundStartingLeft"), o.data("stellar-backgroundStartingTop")) : (o.data("stellar-backgroundStartingLeft", p[0]), o.data("stellar-backgroundStartingTop", p[1])), h = "auto" === o.css("margin-left") ? 0 : parseInt(o.css("margin-left"), 10), i = "auto" === o.css("margin-top") ? 0 : parseInt(o.css("margin-top"), 10), j = o.offset().left - h - e, k = o.offset().top - i - f, o.parents().each(function() {
                    var b = a(this);
                    return b.data("stellar-offset-parent") === !0 ? (q = s, r = t, l = b, !1) : (s += b.position().left, void(t += b.position().top))
                }), b = o.data("stellar-horizontal-offset") !== d ? o.data("stellar-horizontal-offset") : l !== d && l.data("stellar-horizontal-offset") !== d ? l.data("stellar-horizontal-offset") : c.horizontalOffset, g = o.data("stellar-vertical-offset") !== d ? o.data("stellar-vertical-offset") : l !== d && l.data("stellar-vertical-offset") !== d ? l.data("stellar-vertical-offset") : c.verticalOffset, c.backgrounds.push({
                    $element: o,
                    $offsetParent: l,
                    isFixed: "fixed" === o.css("background-attachment"),
                    horizontalOffset: b,
                    verticalOffset: g,
                    startingValueLeft: p[0],
                    startingValueTop: p[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(p[0], 10)) ? 0 : parseInt(p[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(p[1], 10)) ? 0 : parseInt(p[1], 10),
                    startingPositionLeft: o.position().left,
                    startingPositionTop: o.position().top,
                    startingOffsetLeft: j,
                    startingOffsetTop: k,
                    parentOffsetLeft: q,
                    parentOffsetTop: r,
                    stellarRatio: o.data("stellar-background-ratio") === d ? 1 : o.data("stellar-background-ratio")
                })
            }))
        },
        _reset: function() {
            var a, b, c, d, e;
            for (e = this.particles.length - 1; e >= 0; e--) a = this.particles[e], b = a.$element.data("stellar-startingLeft"), c = a.$element.data("stellar-startingTop"), this._setPosition(a.$element, b, b, c, c), this.options.showElement(a.$element), a.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
            for (e = this.backgrounds.length - 1; e >= 0; e--) d = this.backgrounds[e], d.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), m(d.$element, d.startingValueLeft, d.startingValueTop)
        },
        destroy: function() {
            this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = a.noop, a(b).unbind("load." + this.name).unbind("resize." + this.name)
        },
        _setOffsets: function() {
            var c = this,
                d = a(b);
            d.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), d.bind("resize.horizontal-" + this.name, function() {
                c.horizontalOffset = c.options.horizontalOffset()
            })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), d.bind("resize.vertical-" + this.name, function() {
                c.verticalOffset = c.options.verticalOffset()
            })) : this.verticalOffset = this.options.verticalOffset
        },
        _repositionElements: function() {
            var a, b, c, d, e, f, g, h, i, j, k = this._getScrollLeft(),
                l = this._getScrollTop(),
                n = !0,
                o = !0;
            if (this.currentScrollLeft !== k || this.currentScrollTop !== l || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
                for (this.currentScrollLeft = k, this.currentScrollTop = l, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, j = this.particles.length - 1; j >= 0; j--) a = this.particles[j], b = a.isFixed ? 1 : 0, this.options.horizontalScrolling ? (f = (k + a.horizontalOffset + this.viewportOffsetLeft + a.startingPositionLeft - a.startingOffsetLeft + a.parentOffsetLeft) * -(a.stellarRatio + b - 1) + a.startingPositionLeft, h = f - a.startingPositionLeft + a.startingOffsetLeft) : (f = a.startingPositionLeft, h = a.startingOffsetLeft), this.options.verticalScrolling ? (g = (l + a.verticalOffset + this.viewportOffsetTop + a.startingPositionTop - a.startingOffsetTop + a.parentOffsetTop) * -(a.stellarRatio + b - 1) + a.startingPositionTop, i = g - a.startingPositionTop + a.startingOffsetTop) : (g = a.startingPositionTop, i = a.startingOffsetTop), this.options.hideDistantElements && (o = !this.options.horizontalScrolling || h + a.width > (a.isFixed ? 0 : k) && h < (a.isFixed ? 0 : k) + this.viewportWidth + this.viewportOffsetLeft, n = !this.options.verticalScrolling || i + a.height > (a.isFixed ? 0 : l) && i < (a.isFixed ? 0 : l) + this.viewportHeight + this.viewportOffsetTop), o && n ? (a.isHidden && (this.options.showElement(a.$element), a.isHidden = !1), this._setPosition(a.$element, f, a.startingPositionLeft, g, a.startingPositionTop)) : a.isHidden || (this.options.hideElement(a.$element), a.isHidden = !0);
                for (j = this.backgrounds.length - 1; j >= 0; j--) c = this.backgrounds[j], b = c.isFixed ? 0 : 1, d = this.options.horizontalScrolling ? (k + c.horizontalOffset - this.viewportOffsetLeft - c.startingOffsetLeft + c.parentOffsetLeft - c.startingBackgroundPositionLeft) * (b - c.stellarRatio) + "px" : c.startingValueLeft, e = this.options.verticalScrolling ? (l + c.verticalOffset - this.viewportOffsetTop - c.startingOffsetTop + c.parentOffsetTop - c.startingBackgroundPositionTop) * (b - c.stellarRatio) + "px" : c.startingValueTop, m(c.$element, d, e)
            }
        },
        _handleScrollEvent: function() {
            var a = this,
                b = !1,
                c = function() {
                    a._repositionElements(), b = !1
                },
                d = function() {
                    b || (o(c), b = !0)
                };
            this.$scrollElement.bind("scroll." + this.name, d), d()
        },
        _startAnimationLoop: function() {
            var a = this;
            this._animationLoop = function() {
                o(a._animationLoop), a._repositionElements()
            }, this._animationLoop()
        }
    }, a.fn[f] = function(b) {
        var c = arguments;
        return b === d || "object" == typeof b ? this.each(function() {
            a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b))
        }) : "string" == typeof b && "_" !== b[0] && "init" !== b ? this.each(function() {
            var d = a.data(this, "plugin_" + f);
            d instanceof e && "function" == typeof d[b] && d[b].apply(d, Array.prototype.slice.call(c, 1)), "destroy" === b && a.data(this, "plugin_" + f, null)
        }) : void 0
    }, a[f] = function() {
        var c = a(b);
        return c.stellar.apply(c, Array.prototype.slice.call(arguments, 0))
    }, a[f].scrollProperty = h, a[f].positionProperty = i, b.Stellar = e
}










(jQuery, this, document), window.Modernizr = function(a, b, c) {
        function d(a) {
            s.cssText = a
        }

        function e(a, b) {
            return typeof a === b
        }

        function f(a, b) {
            return !!~("" + a).indexOf(b)
        }

        function g(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!f(e, "-") && s[e] !== c) return "pfx" == b ? e : !0
            }
            return !1
        }

        function h(a, b, d) {
            for (var f in a) {
                var g = b[a[f]];
                if (g !== c) return d === !1 ? a[f] : e(g, "function") ? g.bind(d || b) : g
            }
            return !1
        }

        function i(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                f = (a + " " + v.join(d + " ") + d).split(" ");
            return e(b, "string") || e(b, "undefined") ? g(f, b) : (f = (a + " " + w.join(d + " ") + d).split(" "), h(f, b, c))
        }
        var j, k, l, m = "2.8.2",
            n = {},
            o = !0,
            p = b.documentElement,
            q = "modernizr",
            r = b.createElement(q),
            s = r.style,
            t = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            u = "Webkit Moz O ms",
            v = u.split(" "),
            w = u.toLowerCase().split(" "),
            x = {
                svg: "http://www.w3.org/2000/svg"
            },
            y = {},
            z = [],
            A = z.slice,
            B = function(a, c, d, e) {
                var f, g, h, i, j = b.createElement("div"),
                    k = b.body,
                    l = k || b.createElement("body");
                if (parseInt(d, 10))
                    for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : q + (d + 1), j.appendChild(h);
                return f = ["&#173;", '<style id="s', q, '">', a, "</style>"].join(""), j.id = q, (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", i = p.style.overflow, p.style.overflow = "hidden", p.appendChild(l)), g = c(j, a), k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), p.style.overflow = i), !!g
            },
            C = {}.hasOwnProperty;
        l = e(C, "undefined") || e(C.call, "undefined") ? function(a, b) {
            return b in a && e(a.constructor.prototype[b], "undefined")
        } : function(a, b) {
            return C.call(a, b)
        }, Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError;
            var c = A.call(arguments, 1),
                d = function() {
                    if (this instanceof d) {
                        var e = function() {};
                        e.prototype = b.prototype;
                        var f = new e,
                            g = b.apply(f, c.concat(A.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return b.apply(a, c.concat(A.call(arguments)))
                };
            return d
        }), y.flexbox = function() {
            return i("flexWrap")
        }, y.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : B(["@media (", t.join("touch-enabled),("), q, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = 9 === a.offsetTop
            }), c
        }, y.svg = function() {
            return !!b.createElementNS && !!b.createElementNS(x.svg, "svg").createSVGRect
        };
        for (var D in y) l(y, D) && (k = D.toLowerCase(), n[k] = y[D](), z.push((n[k] ? "" : "no-") + k));
        return n.addTest = function(a, b) {
            if ("object" == typeof a)
                for (var d in a) l(a, d) && n.addTest(d, a[d]);
            else {
                if (a = a.toLowerCase(), n[a] !== c) return n;
                b = "function" == typeof b ? b() : b, "undefined" != typeof o && o && (p.className += " " + (b ? "" : "no-") + a), n[a] = b
            }
            return n
        }, d(""), r = j = null, n._version = m, n._prefixes = t, n._domPrefixes = w, n._cssomPrefixes = v, n.testProp = function(a) {
            return g([a])
        }, n.testAllProps = i, n.testStyles = B, p.className = p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (o ? " js " + z.join(" ") : ""), n
    }(this, this.document),
    function(a) {
        "use strict";

        function b(a, b, c) {
            return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0
        }

        function c(a, b) {
            var c, d;
            for (c = 0, d = a.length; d > c; c++)
                if (a[c] === b) return !0;
            return !1
        }

        function d(a, b) {
            var c;
            a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), a.setSelectionRange(b, b))
        }

        function e(a, b) {
            try {
                return a.type = b, !0
            } catch (c) {
                return !1
            }
        }
        a.Placeholders = {
            Utils: {
                addEventListener: b,
                inArray: c,
                moveCaret: d,
                changeType: e
            }
        }
    }(this),
    function(a) {
        "use strict";

        function b() {}

        function c() {
            try {
                return document.activeElement
            } catch (a) {}
        }

        function d(a, b) {
            var c, d, e = !!b && a.value !== b,
                f = a.value === a.getAttribute(H);
            return (e || f) && "true" === a.getAttribute(I) ? (a.removeAttribute(I), a.value = a.value.replace(a.getAttribute(H), ""), a.className = a.className.replace(G, ""), d = a.getAttribute(O), parseInt(d, 10) >= 0 && (a.setAttribute("maxLength", d), a.removeAttribute(O)), c = a.getAttribute(J), c && (a.type = c), !0) : !1
        }

        function e(a) {
            var b, c, d = a.getAttribute(H);
            return "" === a.value && d ? (a.setAttribute(I, "true"), a.value = d, a.className += " " + F, c = a.getAttribute(O), c || (a.setAttribute(O, a.maxLength), a.removeAttribute("maxLength")), b = a.getAttribute(J), b ? a.type = "text" : "password" === a.type && T.changeType(a, "text") && a.setAttribute(J, "password"), !0) : !1
        }

        function f(a, b) {
            var c, d, e, f, g, h, i;
            if (a && a.getAttribute(H)) b(a);
            else
                for (e = a ? a.getElementsByTagName("input") : p, f = a ? a.getElementsByTagName("textarea") : q, c = e ? e.length : 0, d = f ? f.length : 0, i = 0, h = c + d; h > i; i++) g = c > i ? e[i] : f[i - c], b(g)
        }

        function g(a) {
            f(a, d)
        }

        function h(a) {
            f(a, e)
        }

        function i(a) {
            return function() {
                r && a.value === a.getAttribute(H) && "true" === a.getAttribute(I) ? T.moveCaret(a, 0) : d(a)
            }
        }

        function j(a) {
            return function() {
                e(a)
            }
        }

        function k(a) {
            return function(b) {
                return t = a.value, "true" === a.getAttribute(I) && t === a.getAttribute(H) && T.inArray(D, b.keyCode) ? (b.preventDefault && b.preventDefault(), !1) : void 0
            }
        }

        function l(a) {
            return function() {
                d(a, t), "" === a.value && (a.blur(), T.moveCaret(a, 0))
            }
        }

        function m(a) {
            return function() {
                a === c() && a.value === a.getAttribute(H) && "true" === a.getAttribute(I) && T.moveCaret(a, 0)
            }
        }

        function n(a) {
            return function() {
                g(a)
            }
        }

        function o(a) {
            a.form && (y = a.form, "string" == typeof y && (y = document.getElementById(y)), y.getAttribute(K) || (T.addEventListener(y, "submit", n(y)), y.setAttribute(K, "true"))), T.addEventListener(a, "focus", i(a)), T.addEventListener(a, "blur", j(a)), r && (T.addEventListener(a, "keydown", k(a)), T.addEventListener(a, "keyup", l(a)), T.addEventListener(a, "click", m(a))), a.setAttribute(L, "true"), a.setAttribute(H, w), (r || a !== c()) && e(a)
        }
        var p, q, r, s, t, u, v, w, x, y, z, A, B, C = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
            D = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
            E = "#ccc",
            F = "placeholdersjs",
            G = RegExp("(?:^|\\s)" + F + "(?!\\S)"),
            H = "data-placeholder-value",
            I = "data-placeholder-active",
            J = "data-placeholder-type",
            K = "data-placeholder-submit",
            L = "data-placeholder-bound",
            M = "data-placeholder-focus",
            N = "data-placeholder-live",
            O = "data-placeholder-maxlength",
            P = document.createElement("input"),
            Q = document.getElementsByTagName("head")[0],
            R = document.documentElement,
            S = a.Placeholders,
            T = S.Utils;
        if (S.nativeSupport = void 0 !== P.placeholder, !S.nativeSupport) {
            for (p = document.getElementsByTagName("input"), q = document.getElementsByTagName("textarea"), r = "false" === R.getAttribute(M), s = "false" !== R.getAttribute(N), u = document.createElement("style"), u.type = "text/css", v = document.createTextNode("." + F + " { color:" + E + "; }"), u.styleSheet ? u.styleSheet.cssText = v.nodeValue : u.appendChild(v), Q.insertBefore(u, Q.firstChild), B = 0, A = p.length + q.length; A > B; B++) z = p.length > B ? p[B] : q[B - p.length], w = z.attributes.placeholder, w && (w = w.nodeValue, w && T.inArray(C, z.type) && o(z));
            x = setInterval(function() {
                for (B = 0, A = p.length + q.length; A > B; B++) z = p.length > B ? p[B] : q[B - p.length], w = z.attributes.placeholder, w ? (w = w.nodeValue, w && T.inArray(C, z.type) && (z.getAttribute(L) || o(z), (w !== z.getAttribute(H) || "password" === z.type && !z.getAttribute(J)) && ("password" === z.type && !z.getAttribute(J) && T.changeType(z, "text") && z.setAttribute(J, "password"), z.value === z.getAttribute(H) && (z.value = w), z.setAttribute(H, w)))) : z.getAttribute(I) && (d(z), z.removeAttribute(H));
                s || clearInterval(x)
            }, 100)
        }
        T.addEventListener(a, "beforeunload", function() {
            S.disable()
        }), S.disable = S.nativeSupport ? b : g, S.enable = S.nativeSupport ? b : h
    }(this), ! function(a, b, c) {
        var d = a.jQuery || a.Zepto || a.ender || a.elo;
        "undefined" != typeof module && module.exports ? module.exports = c(d) : a[b] = c(d)
    }(this, "Response", function(a) {
        function b(a) {
            return a === +a
        }

        function c(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }

        function d(a, b) {
            var c = this.call();
            return c >= (a || 0) && (!b || b >= c)
        }

        function e(a, b, c) {
            for (var d = [], e = a.length, f = 0; e > f;) d[f] = b.call(c, a[f], f++, a);
            return d
        }

        function f(a) {
            return a ? i("string" == typeof a ? a.split(" ") : a) : []
        }

        function g(a, b, c) {
            if (null == a) return a;
            for (var d = a.length, e = 0; d > e;) b.call(c || a[e], a[e], e++, a);
            return a
        }

        function h(a, b, c) {
            null == b && (b = ""), null == c && (c = "");
            for (var d = [], e = a.length, f = 0; e > f; f++) null == a[f] || d.push(b + a[f] + c);
            return d
        }

        function i(a, b, c) {
            var d, e, f, g = [],
                h = 0,
                i = 0,
                j = "function" == typeof b,
                k = !0 === c;
            for (e = a && a.length, c = k ? null : c; e > i; i++) f = a[i], d = j ? !b.call(c, f, i, a) : b ? typeof f !== b : !f, d === k && (g[h++] = f);
            return g
        }

        function j(a, c) {
            if (null == a || null == c) return a;
            if ("object" == typeof c && b(c.length)) _.apply(a, i(c, "undefined", !0));
            else
                for (var d in c) cb.call(c, d) && void 0 !== c[d] && (a[d] = c[d]);
            return a
        }

        function k(a, c, d) {
            return null == a ? a : ("object" == typeof a && !a.nodeType && b(a.length) ? g(a, c, d) : c.call(d || a, a), a)
        }

        function l(a) {
            var b = T.devicePixelRatio;
            return null == a ? b || (l(2) ? 2 : l(1.5) ? 1.5 : l(1) ? 1 : 0) : isFinite(a) ? b && b > 0 ? b >= a : (a = "only all and (min--moz-device-pixel-ratio:" + a + ")", zb(a) ? !0 : zb(a.replace("-moz-", ""))) : !1
        }

        function m(a) {
            return a.replace(tb, "$1").replace(sb, function(a, b) {
                return b.toUpperCase()
            })
        }

        function n(a) {
            return "data-" + (a ? a.replace(tb, "$1").replace(rb, "$1-$2").toLowerCase() : a)
        }

        function o(a) {
            var b;
            return "string" == typeof a && a ? "false" === a ? !1 : "true" === a ? !0 : "null" === a ? null : "undefined" === a || (b = +a) || 0 === b || "NaN" === a ? b : a : a
        }

        function p(a) {
            return !a || a.nodeType ? a : a[0]
        }

        function q(a, b, c) {
            var d, e, f, g, h;
            if (a.attributes)
                for (d = "boolean" == typeof c ? /^data-/ : d, g = 0, h = a.attributes.length; h > g;)(f = a.attributes[g++]) && (e = "" + f.name, d && d.test(e) !== c || null == f.value || b.call(a, f.value, e, f))
        }

        function r(a) {
            var b;
            return a && 1 === a.nodeType ? (b = Y && a.dataset) ? b : (b = {}, q(a, function(a, c) {
                b[m(c)] = "" + a
            }, !0), b) : void 0
        }

        function s(a, b, c) {
            for (var d in b) cb.call(b, d) && c(a, d, b[d])
        }

        function t(a, b, c) {
            if (a = p(a), a && a.setAttribute) {
                if (void 0 === b && c === b) return r(a);
                var d = db(b) && n(b[0]);
                if ("object" != typeof b || d) {
                    if (b = d || n(b), !b) return;
                    return void 0 === c ? (b = a.getAttribute(b), null == b ? c : d ? o(b) : "" + b) : (a.setAttribute(b, c = "" + c), c)
                }
                b && s(a, b, t)
            }
        }

        function u(a, b) {
            b = f(b), k(a, function(a) {
                g(b, function(b) {
                    a.removeAttribute(n(b))
                })
            })
        }

        function v(a) {
            for (var b, c = [], d = 0, e = a.length; e > d;)(b = a[d++]) && c.push("[" + n(b.replace(qb, "").replace(".", "\\.")) + "]");
            return c.join()
        }

        function w(b) {
            return a(v(f(b)))
        }

        function x() {
            return window.pageXOffset || V.scrollLeft
        }

        function y() {
            return window.pageYOffset || V.scrollTop
        }

        function z(a, b) {
            var c = a.getBoundingClientRect ? a.getBoundingClientRect() : {};
            return b = "number" == typeof b ? b || 0 : 0, {
                top: (c.top || 0) - b,
                left: (c.left || 0) - b,
                bottom: (c.bottom || 0) + b,
                right: (c.right || 0) + b
            }
        }

        function A(a, b) {
            var c = z(p(a), b);
            return !!c && c.right >= 0 && c.left <= Ab()
        }

        function B(a, b) {
            var c = z(p(a), b);
            return !!c && c.bottom >= 0 && c.top <= Bb()
        }

        function C(a, b) {
            var c = z(p(a), b);
            return !!c && c.bottom >= 0 && c.top <= Bb() && c.right >= 0 && c.left <= Ab()
        }

        function D(a) {
            var b = {
                    img: 1,
                    input: 1,
                    source: 3,
                    embed: 3,
                    track: 3,
                    iframe: 5,
                    audio: 5,
                    video: 5,
                    script: 5
                },
                c = b[a.nodeName.toLowerCase()] || -1;
            return 4 > c ? c : null != a.getAttribute("src") ? 5 : -5
        }

        function E(a, b, c) {
            var d;
            if (!a || null == b) throw new TypeError("@store");
            return c = "string" == typeof c && c, k(a, function(a) {
                d = c ? a.getAttribute(c) : 0 < D(a) ? a.getAttribute("src") : a.innerHTML, null == d ? u(a, b) : t(a, b, d)
            }), N
        }

        function F(a, b) {
            var c = [];
            return a && b && g(f(b), function(b) {
                c.push(t(a, b))
            }, a), c
        }

        function G(a, b) {
            return "string" == typeof a && "function" == typeof b && (fb[a] = b, gb[a] = 1), N
        }

        function H(a) {
            return X.on("resize", a), N
        }

        function I(a, b) {
            var c, d, e = wb.crossover;
            return "function" == typeof a && (c = b, b = a, a = c), d = a ? "" + a + e : e, X.on(d, b), N
        }

        function J(a) {
            return k(a, function(a) {
                W(a), H(a)
            }), N
        }

        function K(a) {
            return k(a, function(a) {
                if ("object" != typeof a) throw new TypeError("@create");
                var b, c = ub(O).configure(a),
                    d = c.verge,
                    e = c.breakpoints,
                    f = vb("scroll"),
                    h = vb("resize");
                e.length && (b = e[0] || e[1] || !1, W(function() {
                    function a() {
                        c.reset(), g(c.$e, function(a, b) {
                            c[b].decideValue().updateDOM()
                        }).trigger(i)
                    }

                    function e() {
                        g(c.$e, function(a, b) {
                            C(c[b].$e, d) && c[b].updateDOM()
                        })
                    }
                    var i = wb.allLoaded,
                        j = !!c.lazy;
                    g(c.target().$e, function(a, b) {
                        c[b] = ub(c).prepareData(a), (!j || C(c[b].$e, d)) && c[b].updateDOM()
                    }), c.dynamic && (c.custom || lb > b) && H(a, h), j && (X.on(f, e), c.$e.one(i, function() {
                        X.off(f, e)
                    }))
                }))
            }), N
        }

        function L(a) {
            return P[Q] === N && (P[Q] = R), "function" == typeof a && a.call(P, N), N
        }
        if ("function" != typeof a) try {
            return void console.warn("response.js aborted due to missing dependency")
        } catch (M) {}
        var N, O, P = this,
            Q = "Response",
            R = P[Q],
            S = "init" + Q,
            T = window,
            U = document,
            V = U.documentElement,
            W = a.domReady || a,
            X = a(T),
            Y = "undefined" != typeof DOMStringMap,
            Z = Array.prototype,
            $ = Object.prototype,
            _ = Z.push,
            ab = Z.concat,
            bb = $.toString,
            cb = $.hasOwnProperty,
            db = Array.isArray || function(a) {
                return "[object Array]" === bb.call(a)
            },
            eb = {
                width: [0, 320, 481, 641, 961, 1025, 1281],
                height: [0, 481],
                ratio: [1, 1.5, 2]
            },
            fb = {},
            gb = {},
            hb = {
                all: []
            },
            ib = 1,
            jb = screen.width,
            kb = screen.height,
            lb = jb > kb ? jb : kb,
            mb = jb + kb - lb,
            nb = function() {
                return jb
            },
            ob = function() {
                return kb
            },
            pb = /[^a-z0-9_\-\.]/gi,
            qb = /^[\W\s]+|[\W\s]+$|/g,
            rb = /([a-z])([A-Z])/g,
            sb = /-(.)/g,
            tb = /^data-(.+)$/,
            ub = Object.create || function(a) {
                function b() {}
                return b.prototype = a, new b
            },
            vb = function(a, b) {
                return b = b || Q, a.replace(qb, "") + "." + b.replace(qb, "")
            },
            wb = {
                allLoaded: vb("allLoaded"),
                crossover: vb("crossover")
            },
            xb = T.matchMedia || T.msMatchMedia,
            yb = xb ? c(xb, T) : function() {
                return {}
            },
            zb = xb ? function(a) {
                return !!xb.call(T, a)
            } : function() {
                return !1
            },
            Ab = function() {
                var a = V.clientWidth,
                    b = T.innerWidth;
                return b > a ? b : a
            },
            Bb = function() {
                var a = V.clientHeight,
                    b = T.innerHeight;
                return b > a ? b : a
            },
            Cb = c(d, Ab),
            Db = c(d, Bb),
            Eb = {
                band: c(d, nb),
                wave: c(d, ob)
            };
        return O = function() {
            function b(a) {
                return "string" == typeof a ? a.toLowerCase().replace(pb, "") : ""
            }

            function c(a, b) {
                return a - b
            }
            var d = wb.crossover,
                k = Math.min;
            return {
                $e: 0,
                mode: 0,
                breakpoints: null,
                prefix: null,
                prop: "width",
                keys: [],
                dynamic: null,
                custom: 0,
                values: [],
                fn: 0,
                verge: null,
                newValue: 0,
                currValue: 1,
                aka: null,
                lazy: null,
                i: 0,
                uid: null,
                reset: function() {
                    for (var a = this.breakpoints, b = a.length, c = 0; !c && b--;) this.fn(a[b]) && (c = b);
                    return c !== this.i && (X.trigger(d).trigger(this.prop + d), this.i = c || 0), this
                },
                configure: function(a) {
                    j(this, a);
                    var d, l, m, n, o, p = !0,
                        q = this.prop;
                    if (this.uid = ib++, null == this.verge && (this.verge = k(lb, 500)), !(this.fn = fb[q])) throw new TypeError("@create");
                    if (null == this.dynamic && (this.dynamic = "device" !== q.slice(0, 6)), this.custom = gb[q], m = this.prefix ? i(e(f(this.prefix), b)) : ["min-" + q + "-"], n = 1 < m.length ? m.slice(1) : 0, this.prefix = m[0], l = this.breakpoints, db(l)) {
                        if (g(l, function(a) {
                                if (!a && 0 !== a) throw "invalid breakpoint";
                                p = p && isFinite(a)
                            }), p && l.sort(c), !l.length) throw new TypeError(".breakpoints")
                    } else if (l = eb[q] || eb[q.split("-").pop()], !l) throw new TypeError(".prop");
                    if (this.breakpoints = l, this.keys = h(this.breakpoints, this.prefix), this.aka = null, n) {
                        for (o = [], d = n.length; d--;) o.push(h(this.breakpoints, n[d]));
                        this.aka = o, this.keys = ab.apply(this.keys, o)
                    }
                    return hb.all = hb.all.concat(hb[this.uid] = this.keys), this
                },
                target: function() {
                    return this.$e = a(v(hb[this.uid])), E(this.$e, S), this.keys.push(S), this
                },
                decideValue: function() {
                    for (var a = null, b = this.breakpoints, c = b.length, d = c; null == a && d--;) this.fn(b[d]) && (a = this.values[d]);
                    return this.newValue = "string" == typeof a ? a : this.values[c], this
                },
                prepareData: function(b) {
                    if (this.$e = a(b), this.mode = D(b), this.values = F(this.$e, this.keys), this.aka)
                        for (var c = this.aka.length; c--;) this.values = j(this.values, F(this.$e, this.aka[c]));
                    return this.decideValue()
                },
                updateDOM: function() {
                    return this.currValue === this.newValue ? this : (this.currValue = this.newValue, 0 < this.mode ? this.$e[0].setAttribute("src", this.newValue) : null == this.newValue ? this.$e.empty && this.$e.empty() : this.$e.html ? this.$e.html(this.newValue) : (this.$e.empty && this.$e.empty(), this.$e[0].innerHTML = this.newValue), this)
                }
            }
        }(), fb.width = Cb, fb.height = Db, fb["device-width"] = Eb.band, fb["device-height"] = Eb.wave, fb["device-pixel-ratio"] = l, N = {
            deviceMin: function() {
                return mb
            },
            deviceMax: function() {
                return lb
            },
            noConflict: L,
            create: K,
            addTest: G,
            datatize: n,
            camelize: m,
            render: o,
            store: E,
            access: F,
            target: w,
            object: ub,
            crossover: I,
            action: J,
            resize: H,
            ready: W,
            affix: h,
            sift: i,
            dpr: l,
            deletes: u,
            scrollX: x,
            scrollY: y,
            deviceW: nb,
            deviceH: ob,
            device: Eb,
            inX: A,
            inY: B,
            route: k,
            merge: j,
            media: yb,
            mq: zb,
            wave: Db,
            band: Cb,
            map: e,
            each: g,
            inViewport: C,
            dataset: t,
            viewportH: Bb,
            viewportW: Ab
        }, W(function() {
            var b = t(U.body, "responsejs"),
                c = T.JSON && JSON.parse || a.parseJSON;
            b = b && c ? c(b) : b, b && b.create && K(b.create), V.className = V.className.replace(/(^|\s)(no-)?responsejs(\s|$)/, "$1$3") + " responsejs "
        }), N
    });
var twitterFetcher = function() {
    function a(a) {
        return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, b) {
            return b
        }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
    }

    function b(a, b) {
        for (var c = [], d = RegExp("(^| )" + b + "( |$)"), e = a.getElementsByTagName("*"), f = 0, g = e.length; g > f; f++) d.test(e[f].className) && c.push(e[f]);
        return c
    }
    var c = "",
        d = 20,
        e = !0,
        f = [],
        g = !1,
        h = !0,
        i = !0,
        j = null,
        k = !0,
        l = !0,
        m = null,
        n = !0;
    return {
        fetch: function(a, b, k, o, p, q, r, s, t, u) {
            void 0 === k && (k = 20), void 0 === o && (e = !0), void 0 === p && (p = !0), void 0 === q && (q = !0), void 0 === r && (r = "default"), void 0 === s && (s = !0), void 0 === t && (t = null), void 0 === u && (u = !0), g ? f.push({
                id: a,
                domId: b,
                maxTweets: k,
                enableLinks: o,
                showUser: p,
                showTime: q,
                dateFunction: r,
                showRt: s,
                customCallback: t,
                showInteraction: u
            }) : (g = !0, c = b, d = k, e = o, i = p, h = q, l = s, j = r, m = t, n = u, b = document.createElement("script"), b.type = "text/javascript", b.src = "//cdn.syndication.twimg.com/widgets/timelines/" + a + "?&lang=en&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random(), document.getElementsByTagName("head")[0].appendChild(b))
        },
        callback: function(o) {
            var p = document.createElement("div");
            p.innerHTML = o.body, "undefined" == typeof p.getElementsByClassName && (k = !1), o = [];
            var q = [],
                r = [],
                s = [],
                t = [],
                u = 0;
            if (k)
                for (p = p.getElementsByClassName("tweet"); u < p.length;) s.push(0 < p[u].getElementsByClassName("retweet-credit").length ? !0 : !1), (!s[u] || s[u] && l) && (o.push(p[u].getElementsByClassName("e-entry-title")[0]), t.push(p[u].getAttribute("data-tweet-id")), q.push(p[u].getElementsByClassName("p-author")[0]), r.push(p[u].getElementsByClassName("dt-updated")[0])), u++;
            else
                for (p = b(p, "tweet"); u < p.length;) o.push(b(p[u], "e-entry-title")[0]), t.push(p[u].getAttribute("data-tweet-id")), q.push(b(p[u], "p-author")[0]), r.push(b(p[u], "dt-updated")[0]), s.push(0 < b(p[u], "retweet-credit").length ? !0 : !1), u++;
            for (o.length > d && (o.splice(d, o.length - d), q.splice(d, q.length - d), r.splice(d, r.length - d), s.splice(d, s.length - d)), p = [], u = o.length, s = 0; u > s;) {
                if ("string" != typeof j) {
                    var v = new Date(r[s].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                        v = j(v);
                    if (r[s].setAttribute("aria-label", v), o[s].innerText)
                        if (k) r[s].innerText = v;
                        else {
                            var w = document.createElement("p"),
                                x = document.createTextNode(v);
                            w.appendChild(x), w.setAttribute("aria-label", v), r[s] = w
                        }
                    else r[s].textContent = v
                }
                v = "", e ? (i && (v += '<div class="user">' + a(q[s].innerHTML) + "</div>"), v += '<p class="tweet">' + a(o[s].innerHTML) + "</p>", h && (v += '<p class="timePosted">' + r[s].getAttribute("aria-label") + "</p>")) : o[s].innerText ? (i && (v += '<p class="user">' + q[s].innerText + "</p>"), v += '<p class="tweet">' + o[s].innerText + "</p>", h && (v += '<p class="timePosted">' + r[s].innerText + "</p>")) : (i && (v += '<p class="user">' + q[s].textContent + "</p>"), v += '<p class="tweet">' + o[s].textContent + "</p>", h && (v += '<p class="timePosted">' + r[s].textContent + "</p>")), n && (v += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + t[s] + '" class="twitter_reply_icon">Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + t[s] + '" class="twitter_retweet_icon">Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + t[s] + '" class="twitter_fav_icon">Favorite</a></p>'), p.push(v), s++
            }
            if (null == m) {
                for (o = p.length, q = 0, r = document.getElementById(c), t = "<ul>"; o > q;) t += "<li>" + p[q] + "</li>", q++;
                r.innerHTML = t + "</ul>"
            } else m(p);
            g = !1, 0 < f.length && (twitterFetcher.fetch(f[0].id, f[0].domId, f[0].maxTweets, f[0].enableLinks, f[0].showUser, f[0].showTime, f[0].dateFunction, f[0].showRt, f[0].customCallback, f[0].showInteraction), f.splice(0, 1))
        }
    }
}();

///////////////////////////////////Study area////////////////////////////



(function() {
    var a = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        },
        b = [].slice;
    ! function(a, b) {
        return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(c) {
            return b(c, a)
        }) : b(a.jQuery, a)
    }(window, function(c, d) {
        var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;
        return e = c(d), l = a.call(d, "ontouchstart") >= 0, h = {
            horizontal: {},
            vertical: {}
        }, i = 1, k = {}, j = "waypoints-context-id", o = "resize.waypoints", p = "scroll.waypoints", q = 1, r = "waypoints-waypoint-ids", s = "waypoint", t = "waypoints", f = function() {
            function a(a) {
                var b = this;
                this.$element = a, this.element = a[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + i++, this.oldScroll = {
                    x: a.scrollLeft(),
                    y: a.scrollTop()
                }, this.waypoints = {
                    horizontal: {},
                    vertical: {}
                }, this.element[j] = this.id, k[this.id] = this, a.bind(p, function() {
                    var a;
                    return b.didScroll || l ? void 0 : (b.didScroll = !0, a = function() {
                        return b.doScroll(), b.didScroll = !1
                    }, d.setTimeout(a, c[t].settings.scrollThrottle))
                }), a.bind(o, function() {
                    var a;
                    return b.didResize ? void 0 : (b.didResize = !0, a = function() {
                        return c[t]("refresh"), b.didResize = !1
                    }, d.setTimeout(a, c[t].settings.resizeThrottle))
                })
            }
            return a.prototype.doScroll = function() {
                var a, b = this;
                return a = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                }, !l || a.vertical.oldScroll && a.vertical.newScroll || c[t]("refresh"), c.each(a, function(a, d) {
                    var e, f, g;
                    return g = [], f = d.newScroll > d.oldScroll, e = f ? d.forward : d.backward, c.each(b.waypoints[a], function(a, b) {
                        var c, e;
                        return d.oldScroll < (c = b.offset) && c <= d.newScroll ? g.push(b) : d.newScroll < (e = b.offset) && e <= d.oldScroll ? g.push(b) : void 0
                    }), g.sort(function(a, b) {
                        return a.offset - b.offset
                    }), f || g.reverse(), c.each(g, function(a, b) {
                        return b.options.continuous || a === g.length - 1 ? b.trigger([e]) : void 0
                    })
                }), this.oldScroll = {
                    x: a.horizontal.newScroll,
                    y: a.vertical.newScroll
                }
            }, a.prototype.refresh = function() {
                var a, b, d, e = this;
                return d = c.isWindow(this.element), b = this.$element.offset(), this.doScroll(), a = {
                    horizontal: {
                        contextOffset: d ? 0 : b.left,
                        contextScroll: d ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: d ? 0 : b.top,
                        contextScroll: d ? 0 : this.oldScroll.y,
                        contextDimension: d ? c[t]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }, c.each(a, function(a, b) {
                    return c.each(e.waypoints[a], function(a, d) {
                        var e, f, g, h, i;
                        return e = d.options.offset, g = d.offset, f = c.isWindow(d.element) ? 0 : d.$element.offset()[b.offsetProp], c.isFunction(e) ? e = e.apply(d.element) : "string" == typeof e && (e = parseFloat(e), d.options.offset.indexOf("%") > -1 && (e = Math.ceil(b.contextDimension * e / 100))), d.offset = f - b.contextOffset + b.contextScroll - e, d.options.onlyOnScroll && null != g || !d.enabled ? void 0 : null !== g && g < (h = b.oldScroll) && h <= d.offset ? d.trigger([b.backward]) : null !== g && g > (i = b.oldScroll) && i >= d.offset ? d.trigger([b.forward]) : null === g && b.oldScroll >= d.offset ? d.trigger([b.forward]) : void 0
                    })
                })
            }, a.prototype.checkEmpty = function() {
                return c.isEmptyObject(this.waypoints.horizontal) && c.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([o, p].join(" ")), delete k[this.id]) : void 0
            }, a
        }(), g = function() {
            function a(a, b, d) {
                var e, f;
                "bottom-in-view" === d.offset && (d.offset = function() {
                    var a;
                    return a = c[t]("viewportHeight"), c.isWindow(b.element) || (a = b.$element.height()), a - c(this).outerHeight()
                }), this.$element = a, this.element = a[0], this.axis = d.horizontal ? "horizontal" : "vertical", this.callback = d.handler, this.context = b, this.enabled = d.enabled, this.id = "waypoints" + q++, this.offset = null, this.options = d, b.waypoints[this.axis][this.id] = this, h[this.axis][this.id] = this, e = null != (f = this.element[r]) ? f : [], e.push(this.id), this.element[r] = e
            }
            return a.prototype.trigger = function(a) {
                return this.enabled ? (null != this.callback && this.callback.apply(this.element, a), this.options.triggerOnce ? this.destroy() : void 0) : void 0
            }, a.prototype.disable = function() {
                return this.enabled = !1
            }, a.prototype.enable = function() {
                return this.context.refresh(), this.enabled = !0
            }, a.prototype.destroy = function() {
                return delete h[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
            }, a.getWaypointsByElement = function(a) {
                var b, d;
                return (d = a[r]) ? (b = c.extend({}, h.horizontal, h.vertical), c.map(d, function(a) {
                    return b[a]
                })) : []
            }, a
        }(), n = {
            init: function(a, b) {
                var d;
                return b = c.extend({}, c.fn[s].defaults, b), null == (d = b.handler) && (b.handler = a), this.each(function() {
                    var a, d, e, h;
                    return a = c(this), e = null != (h = b.context) ? h : c.fn[s].defaults.context, c.isWindow(e) || (e = a.closest(e)), e = c(e), d = k[e[0][j]], d || (d = new f(e)), new g(a, d, b)
                }), c[t]("refresh"), this
            },
            disable: function() {
                return n._invoke.call(this, "disable")
            },
            enable: function() {
                return n._invoke.call(this, "enable")
            },
            destroy: function() {
                return n._invoke.call(this, "destroy")
            },
            prev: function(a, b) {
                return n._traverse.call(this, a, b, function(a, b, c) {
                    return b > 0 ? a.push(c[b - 1]) : void 0
                })
            },
            next: function(a, b) {
                return n._traverse.call(this, a, b, function(a, b, c) {
                    return b < c.length - 1 ? a.push(c[b + 1]) : void 0
                })
            },
            _traverse: function(a, b, e) {
                var f, g;
                return null == a && (a = "vertical"), null == b && (b = d), g = m.aggregate(b), f = [], this.each(function() {
                    var b;
                    return b = c.inArray(this, g[a]), e(f, b, g[a])
                }), this.pushStack(f)
            },
            _invoke: function(a) {
                return this.each(function() {
                    var b;
                    return b = g.getWaypointsByElement(this), c.each(b, function(b, c) {
                        return c[a](), !0
                    })
                }), this
            }
        }, c.fn[s] = function() {
            var a, d;
            return d = arguments[0], a = 2 <= arguments.length ? b.call(arguments, 1) : [], n[d] ? n[d].apply(this, a) : c.isFunction(d) ? n.init.apply(this, arguments) : c.isPlainObject(d) ? n.init.apply(this, [null, d]) : c.error(d ? "The " + d + " method does not exist in jQuery Waypoints." : "jQuery Waypoints needs a callback function or handler option.")
        }, c.fn[s].defaults = {
            context: d,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        }, m = {
            refresh: function() {
                return c.each(k, function(a, b) {
                    return b.refresh()
                })
            },
            viewportHeight: function() {
                var a;
                return null != (a = d.innerHeight) ? a : e.height()
            },
            aggregate: function(a) {
                var b, d, e;
                return b = h, a && (b = null != (e = k[c(a)[0][j]]) ? e.waypoints : void 0), b ? (d = {
                    horizontal: [],
                    vertical: []
                }, c.each(d, function(a, e) {
                    return c.each(b[a], function(a, b) {
                        return e.push(b)
                    }), e.sort(function(a, b) {
                        return a.offset - b.offset
                    }), d[a] = c.map(e, function(a) {
                        return a.element
                    }), d[a] = c.unique(d[a])
                }), d) : []
            },
            above: function(a) {
                return null == a && (a = d), m._filter(a, "vertical", function(a, b) {
                    return b.offset <= a.oldScroll.y
                })
            },
            below: function(a) {
                return null == a && (a = d), m._filter(a, "vertical", function(a, b) {
                    return b.offset > a.oldScroll.y
                })
            },
            left: function(a) {
                return null == a && (a = d), m._filter(a, "horizontal", function(a, b) {
                    return b.offset <= a.oldScroll.x
                })
            },
            right: function(a) {
                return null == a && (a = d), m._filter(a, "horizontal", function(a, b) {
                    return b.offset > a.oldScroll.x
                })
            },
            enable: function() {
                return m._invoke("enable")
            },
            disable: function() {
                return m._invoke("disable")
            },
            destroy: function() {
                return m._invoke("destroy")
            },
            extendFn: function(a, b) {
                return n[a] = b
            },
            _invoke: function(a) {
                var b;
                return b = c.extend({}, h.vertical, h.horizontal), c.each(b, function(b, c) {
                    return c[a](), !0
                })
            },
            _filter: function(a, b, d) {
                var e, f;
                return (e = k[c(a)[0][j]]) ? (f = [], c.each(e.waypoints[b], function(a, b) {
                    return d(e, b) ? f.push(b) : void 0
                }), f.sort(function(a, b) {
                    return a.offset - b.offset
                }), c.map(f, function(a) {
                    return a.element
                })) : []
            }
        }, c[t] = function() {
            var a, c;
            return c = arguments[0], a = 2 <= arguments.length ? b.call(arguments, 1) : [], m[c] ? m[c].apply(null, a) : m.aggregate.call(null, c)
        }, c[t].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        }, e.on("load.waypoints", function() {
            return c[t]("refresh")
        })
    })
}).call(this),
    function() {
        ! function(a, b) {
            return "function" == typeof define && define.amd ? define(["jquery", "waypoints"], b) : b(a.jQuery)
        }(window, function(a) {
            var b, c;
            return b = {
                wrapper: '<div class="sticky-wrapper" />',
                stuckClass: "stuck",
                direction: "down right"
            }, c = function(a, b) {
                var c;
                return a.wrap(b.wrapper), c = a.parent(), c.data("isWaypointStickyWrapper", !0)
            }, a.waypoints("extendFn", "sticky", function(d) {
                var e, f, g;
                return f = a.extend({}, a.fn.waypoint.defaults, b, d), e = c(this, f), g = f.handler, f.handler = function(b) {
                    var c, d;
                    return c = a(this).children(":first"), d = -1 !== f.direction.indexOf(b), c.toggleClass(f.stuckClass, d), e.height(d ? c.outerHeight() : ""), null != g ? g.call(this, b) : void 0
                }, e.waypoint(f), this.data("stuckClass", f.stuckClass)
            }), a.waypoints("extendFn", "unsticky", function() {
                var a;
                return a = this.parent(), a.data("isWaypointStickyWrapper") ? (a.waypoint("destroy"), this.unwrap(), this.removeClass(this.data("stuckClass"))) : this
            })
        })
    }.call(this),
    function($) {
        function isIE11() {
            return !!navigator.userAgent.match(/Trident.*rv[ :]*11\./)
        }

        function disableScrolling() {
            $(document).on("touchmove.scrolling", function(a) {
                a.preventDefault()
            });
            var a = !1;
            $(document).on("touchstart.scrolling", ".gc-modal .content-container", function(b) {
                a || (a = !0, 0 === b.currentTarget.scrollTop ? b.currentTarget.scrollTop = 1 : b.currentTarget.scrollHeight === b.currentTarget.scrollTop + b.currentTarget.offsetHeight && (b.currentTarget.scrollTop -= 1), a = !1)
            }), $(document).on("touchmove.scrolling", ".gc-modal .content-container", function(a) {
                a.stopPropagation()
            })
        }

        function enableScrolling() {
            $(document).off(".scrolling")
        }

        function initLocationMap() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var f = b[c],
                        g = new google.maps.MarkerImage(imgPath + "wp-content/themes/kingsarms/images/mapMarkers/pointer.svg", null, null, new google.maps.Point(22, 60), new google.maps.Size(44, 60)),
                        h = new google.maps.Size(0, -70);
                    (isIE11() || !Modernizr.svg) && (g = new google.maps.MarkerImage(imgPath + "wp-content/themes/kingsarms/images/mapMarkers/pointer_large.png", null, null, new google.maps.Point(22, 60), new google.maps.Size(44, 60)));
                    var i = new google.maps.LatLng(f[1], f[2]),
                        j = "<h3>" + f[0] + "<br />" + f[3] + "</h3>";
                    e[c] = new google.maps.Marker({
                        position: i,
                        map: a,
                        icon: g,
                        title: f[0]
                    });
                    var k = {
                        content: j,
                        pixelOffset: h,
                        closeBoxURL: "",
                        boxClass: "map-tooltip"
                    };
                    d.push(e[c]), d[c].infobox = new InfoBox(k), google.maps.event.addListener(e[c], "click", function(c, e) {
                        return function() {
                            for (var c = 0; c < b.length; c++) d[c].infobox.close(a, this);
                            d[e].infobox.open(a, this)
                        }
                    }(e[c], c)), google.maps.event.addListener(a, "click", function(a) {
                        for (var c = 0; c < b.length; c++) d[c].infobox.close(a, this)
                    })
                }
            }
            var b = new google.maps.LatLng(36.3890442, 126.5451298),
                c = [
                    ["The King's Arms", 36.3890442, 126.5451298, "SE1 8TB", "kings"]
                ],
                d = [],
                e = [],
                f = [{
                    stylers: [{
                        saturation: -100
                    }]
                }, {
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "transit.station",
                    stylers: [{
                        saturation: 30
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "road",
                    stylers: [{
                        visibility: "on"
                    }]
                }, {
                    featureType: "poi",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "landscape",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "water",
                    stylers: [{
                        lightness: -14
                    }]
                }, {
                    featureType: "landscape.man_made",
                    stylers: [{
                        lightness: 50
                    }]
                }, {
                    featureType: "poi.park",
                    stylers: [{
                        lightness: 38
                    }]
                }],
                g = {
                    center: b,
                    streetViewControl: !1,
                    mapTypeControl: !1,
                    panControl: !1,
                    zoomControl: !1,
                    styles: f
                };
            Response.band(0, 1199) ? $.extend(g, {
                zoom: 15,
                scrollwheel: !1,
                draggable: !1
            }) : $.extend(g, {
                zoom: 16
            });
            var h = new google.maps.Map(document.getElementById("map"), g);
            a(h, c), d[0].infobox.open(h, e[0])
        }

        function ajaxLoadPosts() {
            $(document).off(".AJAXposts");
            var a = $(".news-feed").attr("data-numberposts"),
                b = [];
            if ($(".news-feed-item").each(function() {
                    var a = $(this).data("postid");
                    b.push(a)
                }), b.length < a) {
                $.ajax({
                    url: ajaxurl,
                    data: {
                        action: "getMoreNews",
                        html: "",
                        excluded_ids: b
                    },
                    success: function(c) {
                        var d = $(".ajax-content");
                        d.append(c).fadeToggle(function() {
                            var c = d.children();
                            c.unwrap().insertBefore(".load-more"), d.insertBefore(".load-more"), initAJAXPosts(), a += c.length, b.length < a && $(".load-more").fadeTo("200", .001)
                        })
                    },
                    error: function(a) {
                        console.log(a)
                    }
                })
            }
        }
        $(document).ready(function() {
            $("body").addClass("loaded"), initSVGLinkFix(), initResponse(), initModals(), initSmoothScroll(), initMainMenu(), initTimeline(), initLocationMap(), initGallery(), initTwitter(), initAJAXPosts(), initParallax(), $(window).trigger("throttledresize")
        });
        var initSVGLinkFix = function() {
                var a, b, c = "/?" + Math.floor(100 * Math.random() + 1);
                $(".svg-link-fix").each(function() {
                    a = $(this).attr("href"), b = a + c, $(this).data("original_href", a).data("temp_href", b), b = $(this).data("temp_href"), $(this).attr("href", b), $(".svg-link-fix").on("mousedown", function() {
                        a = $(this).data("original_href"), $(this).attr("href", a)
                    }), $(".svg-link-fix").on("mouseleave", function() {
                        b = $(this).data("temp_href"), $(this).attr("href", b)
                    })
                })
            },
            initResponse = function() {
                Response.create({
                    mode: "markup",
                    prop: "width",
                    prefix: "r",
                    breakpoints: [0, 350, 750, 1e3, 1200, 1400, 1600]
                }), Response.create({
                    mode: "src",
                    prop: "width",
                    prefix: "src",
                    breakpoints: [0, 350, 750, 1e3, 1200, 1400, 1600]
                })
            },
            initModals = function() {
                function loadContent(target) {
                    $(".gc-modal-container").empty(), $("body").addClass("gc-modal-loading"), target.indexOf(".jpg") >= 0 ? ($("body").addClass("gc-modal-image"), title = $(this).attr("title"), target = $("<img />").attr({
                        src: target,
                        title: title,
                        alt: title
                    }), target.load(function() {
                        $(".gc-modal-container").append(target), $("body").removeClass("gc-modal-loading")
                    })) : $(".gc-modal-container").load(target, function() {
                        $("body").hasClass("gc-modal-contact") && $.get("/wp-content/plugins/contact-form-7/includes/js/scripts.js", function(data) {
                            eval(data)
                        }), $("body").removeClass("gc-modal-loading");
                        var modalID = $(".menu-modal").data("modalid");
                        $(".gc-modal").removeClass(function(a, b) {
                            return (b.match(/\bmenu-modal-\S+/g) || []).join(" ")
                        }).addClass(modalID)
                    })
                }
                var target, title, slideshowID, currentSlideIndex, numberSlides;
                // $(document).on("tap.modal", ".gc-modal-trigger", function(a) {
                //     $("body").addClass("gc-modal-open").removeClass("gc-modal-news gc-modal-slideshow gc-modal-menu gc-modal-contact"), $(this).closest(".gc-modal-slide").length && ($("body").addClass("gc-modal-slideshow"), slideshowID = $(this).parents(".gc-modal-slides").attr("id"), currentSlideIndex = $(this).closest(".gc-modal-slide").index(), numberSlides = $(this).parents(".gc-modal-slides").find(".gc-modal-slide").length), $(a.target).closest(".section-menus").length && $("body").addClass("gc-modal-menu"), $(this).is("[href*=contact-form]") && $("body").addClass("gc-modal-contact"), $(a.target).closest(".news-feed-item").length && $("body").addClass("gc-modal-news"), $(a.target).closest(".events-feed-item").length && $("body").addClass("gc-modal-news"), target = $(this).attr("href"), loadContent(target), disableScrolling(), a.preventDefault()
                // }), $(document).on("tap.modal", ".next, .prev", function(a) {
                //     $(this).hasClass("next") ? $("#" + slideshowID + " .gc-modal-slide:eq(" + currentSlideIndex + ")").is(":last-child") ? currentSlideIndex = 0 : currentSlideIndex++ : $("#" + slideshowID + " .gc-modal-slide:eq(" + currentSlideIndex + ")").is(":first-child") ? currentSlideIndex = numberSlides - 1 : currentSlideIndex--, target = $("#" + slideshowID + " .gc-modal-slide:eq(" + currentSlideIndex + ")").attr("href") ? $("#" + slideshowID + " .gc-modal-slide:eq(" + currentSlideIndex + ")").attr("href") : $("#" + slideshowID + " .gc-modal-slide:eq(" + currentSlideIndex + ")").find("a").attr("href"), loadContent(target), a.preventDefault()
                // }), $(document).on("tap.modal", ".gc-modal-open", function(a) {
                //     $(a.target).closest(".gc-modal-container").length || $(a.target).closest(".next").length || $(a.target).closest(".prev").length || ($("body").removeClass("gc-modal-open gc-modal-loading gc-modal-image gc-modal-slideshow gc-modal-menu gc-modal-news gc-modal-contact"), $(".gc-modal-container").empty(), enableScrolling())
                // })
            },
            initSmoothScroll = function() {
                var a = 0;
                $(window).on("throttledresize.smoothScroll", function() {
                    a = Response.band(1200) ? $(".main-menu").height() : 0
                }), $(document).on("tap.smoothScroll", ".smooth-scroll", function(b) {
                    var c = $(this).attr("href");
                    $("html, body").animate({
                        scrollTop: $(c).offset().top - a
                    }, 500), b.preventDefault()
                })
            },
            initParallax = function() {
                $.stellar({
                    horizontalOffset: 50,
                    responsive: !0
                }), $(window).on("throttledresize.parallax", function() {
                    Response.band(1200) ? $(".parallax").removeClass("dont-scroll") : $(".parallax").addClass("dont-scroll")
                })
            },
            initMainMenu = function() {
                $(document).on("tap.mainMenu", ".main-menu-trigger", function(a) {
                    $("body").toggleClass("gc-menu-open"), $("body").hasClass("gc-menu-open") ? disableScrolling() : enableScrolling(), a.preventDefault()
                }), $(document).on("tap.mainMenu", ".main-menu li a", function() {
                    $(this).addClass("selected").parent().siblings().find("a").removeClass("selected"), $("body").removeClass("gc-menu-open"), enableScrolling()
                }), $(document).on("tap.mainMenu", ".gc-menu-open", function(a) {
                    $(a.target).closest(".main-menu ul").length || ($("body").removeClass("gc-menu-open"), enableScrolling())
                }), $(window).on("throttledresize.mainMmenu", function() {
                    Response.band(1200) ? $(".main-menu:not(.sticky-applied)").addClass("sticky-applied").waypoint("sticky", {
                        offset: 54
                    }) : $(".main-menu").removeClass("sticky-applied").waypoint("unsticky")
                }), $("section").waypoint(function(a) {
                    sectionName = $(this).attr("id"), $('.main-menu a[href="#' + sectionName + '"]').toggleClass("selected", "down" === a)
                }, {
                    offset: "70%"
                }).waypoint(function(a) {
                    sectionName = $(this).attr("id"), $('.main-menu a[href="#' + sectionName + '"]').toggleClass("selected", "up" === a)
                }, {
                    offset: function() {
                        return .8 * -$(this).height()
                    }
                })
            },
            initTimeline = function() {
                $(document).on("mouseover.timeline", ".timeline-trigger", function() {
                    $(this).addClass("selected").parent().siblings().find(".timeline-trigger").removeClass("selected")
                })
            },
            initGallery = function() {
                var a = {
                    manualContinuousScrolling: !0,
                    autoScrollingMode: "onStart"
                };
                Response.band(1200) ? $.extend(a, {
                    hotSpotScrolling: !0,
                    touchScrolling: !1
                }) : $.extend(a, {
                    hotSpotScrolling: !1,
                    touchScrolling: !0
                }), $(".section-gallery").smoothDivScroll(a)
            },
            initTwitter = function() {
                twitterFetcher.fetch("485054312876224512", "tweets", 1, !0, !0, !0)
            },
            initAJAXPosts = function() {
                $(document).on("click.AJAXposts", ".load-more", function() {
                    ajaxLoadPosts()
                })
            }
    }(jQuery);