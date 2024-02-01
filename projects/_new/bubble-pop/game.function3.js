(function(b) {
Number.prototype.map = function(b, c, d, e) {
    return d + (e - d) * ((this - b) / (c - b))
}
;
Number.prototype.limit = function(b, c) {
    return Math.min(c, Math.max(b, this))
}
;
Number.prototype.round = function(b) {
    b = Math.pow(10, b || 0);
    return Math.round(this * b) / b
}
;
Number.prototype.floor = function() {
    return Math.floor(this)
}
;
Number.prototype.ceil = function() {
    return Math.ceil(this)
}
;
Number.prototype.toInt = function() {
    return this | 0
}
;
Number.prototype.toRad = function() {
    return this / 180 * Math.PI
}
;
Number.prototype.toDeg = function() {
    return 180 * this / Math.PI
}
;
Array.prototype.erase = function(b) {
    for (var c = this.length; c--; )
        this[c] === b && this.splice(c, 1);
    return this
}
;
Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
}
;
Function.prototype.bind = Function.prototype.bind || function(b) {
    if ("function" !== typeof this)
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var c = Array.prototype.slice.call(arguments, 1)
      , d = this
      , e = function() {}
      , g = function() {
        return d.apply(this instanceof e && b ? this : b, c.concat(Array.prototype.slice.call(arguments)))
    };
    e.prototype = this.prototype;
    g.prototype = new e;
    return g
}
;
b.ig = {
    game: null,
    debug: null,
    version: "1.23",
    global: b,
    modules: {},
    resources: [],
    ready: !1,
    baked: !1,
    nocache: "",
    ua: {},
    prefix: b.ImpactPrefix || "",
    lib: "lib/",
    _current: null,
    _loadQueue: [],
    _waitForOnload: 0,
    $: function(b) {
        return "#" == b.charAt(0) ? document.getElementById(b.substr(1)) : document.getElementsByTagName(b)
    },
    $new: function(b) {
        return document.createElement(b)
    },
    copy: function(b) {
        if (!b || "object" != typeof b || b instanceof HTMLElement || b instanceof ig.Class)
            return b;
        if (b instanceof Array)
            for (var c = [], d = 0, e = b.length; d < e; d++)
                c[d] = ig.copy(b[d]);
        else
            for (d in c = {},
            b)
                c[d] = ig.copy(b[d]);
        return c
    },
    merge: function(b, c) {
        for (var d in c) {
            var e = c[d];
            if ("object" != typeof e || e instanceof HTMLElement || e instanceof ig.Class || null === e)
                b[d] = e;
            else {
                if (!b[d] || "object" != typeof b[d])
                    b[d] = e instanceof Array ? [] : {};
                ig.merge(b[d], e)
            }
        }
        return b
    },
    ksort: function(b) {
        if (!b || "object" != typeof b)
            return [];
        var c = [], d = [], e;
        for (e in b)
            c.push(e);
        c.sort();
        for (e = 0; e < c.length; e++)
            d.push(b[c[e]]);
        return d
    },
    setVendorAttribute: function(b, c, d) {
        var e = c.charAt(0).toUpperCase() + c.substr(1);
        b[c] = "undefined" !== typeof b.imageSmoothingEnabled ? b["ms" + e] = b["moz" + e] = b["o" + e] = d : b["ms" + e] = b["moz" + e] = b["webkit" + e] = b["o" + e] = d
    },
    getVendorAttribute: function(b, c) {
        var d = c.charAt(0).toUpperCase() + c.substr(1);
        return "undefined" !== typeof b.imageSmoothingEnabled ? b[c] || b["ms" + d] || b["moz" + d] || b["o" + d] : b[c] || b["ms" + d] || b["moz" + d] || b["webkit" + d] || b["o" + d]
    },
    normalizeVendorAttribute: function(b, c) {
        var d = ig.getVendorAttribute(b, c);
        !b[c] && d && (b[c] = d)
    },
    getImagePixels: function(b, c, d, e, g) {
        var n = ig.$new("canvas");
        n.width = b.width;
        n.height = b.height;
        var m = n.getContext("2d");
        ig.System.SCALE.CRISP(n, m);
        var x = ig.getVendorAttribute(m, "backingStorePixelRatio") || 1;
        ig.normalizeVendorAttribute(m, "getImageDataHD");
        var F = b.width / x
          , B = b.height / x;
        n.width = Math.ceil(F);
        n.height = Math.ceil(B);
        m.drawImage(b, 0, 0, F, B);
        return 1 === x ? m.getImageData(c, d, e, g) : m.getImageDataHD(c, d, e, g)
    },
    module: function(b) {
        if (ig._current)
            throw "Module '" + ig._current.name + "' defines nothing";
        if (ig.modules[b] && ig.modules[b].body)
            throw "Module '" + b + "' is already defined";
        ig._current = {
            name: b,
            requires: [],
            loaded: !1,
            body: null
        };
        ig.modules[b] = ig._current;
        ig._loadQueue.push(ig._current);
        return ig
    },
    requires: function() {
        ig._current.requires = Array.prototype.slice.call(arguments);
        return ig
    },
    defines: function(b) {
        ig._current.body = b;
        ig._current = null;
        ig._initDOMReady()
    },
    addResource: function(b) {
        ig.resources.push(b)
    },
    setNocache: function(b) {
        ig.nocache = b ? "?" + Date.now() : ""
    },
    log: function() {},
    assert: function() {},
    show: function() {},
    mark: function() {},
    _loadScript: function(b, c) {
        ig.modules[b] = {
            name: b,
            requires: [],
            loaded: !1,
            body: null
        };
        ig._waitForOnload++;
        var d = ig.prefix + ig.lib + b.replace(/\./g, "/") + ".js" + ig.nocache
          , e = ig.$new("script");
        e.type = "text/javascript";
        e.src = d;
        e.onload = function() {
            ig._waitForOnload--;
            ig._execModules()
        }
        ;
        e.onerror = function() {
            throw "Failed to load module " + b + " at " + d + " required from " + c;
        }
        ;
        ig.$("head")[0].appendChild(e)
    },
    _execModules: function() {
        for (var b = !1, c = 0; c < ig._loadQueue.length; c++) {
            for (var d = ig._loadQueue[c], e = !0, g = 0; g < d.requires.length; g++) {
                var m = d.requires[g];
                ig.modules[m] ? ig.modules[m].loaded || (e = !1) : (e = !1,
                ig._loadScript(m, d.name))
            }
            e && d.body && (ig._loadQueue.splice(c, 1),
            d.loaded = !0,
            d.body(),
            b = !0,
            c--)
        }
        if (b)
            ig._execModules();
        else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
            b = [];
            for (c = 0; c < ig._loadQueue.length; c++) {
                e = [];
                m = ig._loadQueue[c].requires;
                for (g = 0; g < m.length; g++)
                    d = ig.modules[m[g]],
                    (!d || !d.loaded) && e.push(m[g]);
                b.push(ig._loadQueue[c].name + " (requires: " + e.join(", ") + ")")
            }
            throw "Unresolved (or circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules or a previous syntax error prevents a module from loading:\n" + b.join("\n");
        }
    },
    _DOMReady: function() {
        if (!ig.modules["dom.ready"].loaded) {
            if (!document.body)
                return setTimeout(ig._DOMReady, 13);
            ig.modules["dom.ready"].loaded = !0;
            ig._waitForOnload--;
            ig._execModules()
        }
        return 0
    },
    _boot: function() {
        document.location.href.match(/\?nocache/) && ig.setNocache(!0);
        ig.ua.pixelRatio = b.devicePixelRatio || 1;
        ig.ua.viewport = {
            width: b.innerWidth,
            height: b.innerHeight
        };
        ig.ua.screen = {
            width: b.screen.availWidth * ig.ua.pixelRatio,
            height: b.screen.availHeight * ig.ua.pixelRatio
        };
        ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
        ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio;
        ig.ua.iPad = /iPad/i.test(navigator.userAgent);
        ig.ua.android = /android/i.test(navigator.userAgent);
        ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
        ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
        ig.ua.is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
        ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
        ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent);
        ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag;
        ig.ua.iOSgt5 = ig.ua.iOS && 5 < parseInt(navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]);
        ig.ua.HTCONE = /HTC_One/i.test(navigator.userAgent);
        ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
        ig.ua.Kindle = /Silk/i.test(navigator.userAgent);
        ig.ua.touchDevice = "ontouchstart"in b || b.navigator.msMaxTouchPoints;
        // ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.iOS6 || ig.ua.winPhone || ig.ua.Kindle || /mobile/i.test(navigator.userAgent);
        ig.ua.mobile= !1;
    },
    _initDOMReady: function() {
        ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(),
        ig.modules["dom.ready"] = {
            requires: [],
            loaded: !1,
            body: null
        },
        ig._waitForOnload++,
        "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1),
        b.addEventListener("load", ig._DOMReady, !1)))
    }
};
ig.normalizeVendorAttribute(b, "requestAnimationFrame");
if (b.requestAnimationFrame) {
    var c = 1
      , d = {};
    b.ig.setAnimation = function(e, g) {
        var m = c++;
        d[m] = !0;
        var q = function() {
            d[m] && (b.requestAnimationFrame(q, g),
            e())
        };
        b.requestAnimationFrame(q, g);
        return m
    }
    ;
    b.ig.clearAnimation = function(b) {
        delete d[b]
    }
} else
    b.ig.setAnimation = function(c) {
        return b.setInterval(c, 1E3 / 60)
    }
    ,
    b.ig.clearAnimation = function(c) {
        b.clearInterval(c)
    }
    ;
var e = !1
  , g = /xyz/.test(function() {
    xyz
}) ? /\bparent\b/ : /.*/
  , m = 0;
b.ig.Class = function() {}
;
var x = function(b) {
    var c = this.prototype, d = {}, e;
    for (e in b)
        "function" == typeof b[e] && "function" == typeof c[e] && g.test(b[e]) ? (d[e] = c[e],
        c[e] = function(b, c) {
            return function() {
                var e = this.parent;
                this.parent = d[b];
                var g = c.apply(this, arguments);
                this.parent = e;
                return g
            }
        }(e, b[e])) : c[e] = b[e]
};
b.ig.Class.extend = function(c) {
    function d() {
        if (!e) {
            if (this.staticInstantiate) {
                var b = this.staticInstantiate.apply(this, arguments);
                if (b)
                    return b
            }
            for (var c in this)
                "object" == typeof this[c] && (this[c] = ig.copy(this[c]));
            this.init && this.init.apply(this, arguments)
        }
        return this
    }
    var t = this.prototype;
    e = !0;
    var q = new this;
    e = !1;
    for (var l in c)
        q[l] = "function" == typeof c[l] && "function" == typeof t[l] && g.test(c[l]) ? function(b, c) {
            return function() {
                var d = this.parent;
                this.parent = t[b];
                var e = c.apply(this, arguments);
                this.parent = d;
                return e
            }
        }(l, c[l]) : c[l];
    d.prototype = q;
    d.prototype.constructor = d;
    d.extend = b.ig.Class.extend;
    d.inject = x;
    d.classId = q.classId = ++m;
    return d
}
;
b.ImpactMixin && ig.merge(ig, b.ImpactMixin)
}
)(window);