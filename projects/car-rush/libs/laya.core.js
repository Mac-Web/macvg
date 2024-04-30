var Laya = window.Laya = function(t, e) {
    var i = {
        __internals: [],
        __packages: {},
        __classmap: {
            Object: Object,
            Function: Function,
            Array: Array,
            String: String
        },
        __sysClass: {
            object: "Object",
            array: "Array",
            string: "String",
            dictionary: "Dictionary"
        },
        __propun: {
            writable: !0,
            enumerable: !1,
            configurable: !0
        },
        __presubstr: String.prototype.substr,
        __substr: function(t, e) {
            return 1 == arguments.length ? i.__presubstr.call(this, t) : i.__presubstr.call(this, t, e > 0 ? e : this.length + e);
        },
        __init: function(t) {
            t.forEach(function(t) {
                t.__init$ && t.__init$();
            });
        },
        __isClass: function(t) {
            return t && (t.__isclass || t == Object || t == String || t == Array);
        },
        __newvec: function(t, e) {
            var i = [];
            i.length = t;
            for (var n = 0; t > n; n++) i[n] = e;
            return i;
        },
        __extend: function(t, e) {
            function n() {
                i.un(this, "constructor", t);
            }
            for (var r in e) if (e.hasOwnProperty(r)) {
                var s = Object.getOwnPropertyDescriptor(e, r), a = s.get, o = s.set;
                a || o ? a && o ? Object.defineProperty(t, r, s) : (a && Object.defineProperty(t, r, a), 
                o && Object.defineProperty(t, r, o)) : t[r] = e[r];
            }
            n.prototype = e.prototype, t.prototype = new n(), i.un(t.prototype, "__imps", i.__copy({}, e.prototype.__imps));
        },
        __copy: function(t, e) {
            if (!e) return null;
            t = t || {};
            for (var i in e) t[i] = e[i];
            return t;
        },
        __package: function(e, n) {
            if (!i.__packages[e]) {
                i.__packages[e] = !0;
                var r = t, s = e.split(".");
                if (s.length > 1) for (var a = 0, o = s.length - 1; o > a; a++) {
                    var h = r[s[a]];
                    r = h ? h : r[s[a]] = {};
                }
                r[s[s.length - 1]] || (r[s[s.length - 1]] = n || {});
            }
        },
        __hasOwnProperty: function(t, e) {
            function i(t, e) {
                if (Object.hasOwnProperty.call(e.prototype, t)) return !0;
                var n = e.prototype.__super;
                return null == n ? null : i(t, n);
            }
            return e = e || this, Object.hasOwnProperty.call(e, t) || i(t, e.__class);
        },
        __typeof: function(t, e) {
            if (!t || !e) return !1;
            if (e === String) return "string" == typeof t;
            if (e === Number) return "number" == typeof t;
            if (e.__interface__) e = e.__interface__; else if ("string" != typeof e) return t instanceof e;
            return t.__imps && t.__imps[e] || t.__class == e;
        },
        __as: function(t, e) {
            return this.__typeof(t, e) ? t : null;
        },
        __int: function(t) {
            return t ? parseInt(t) : 0;
        },
        interface: function(e, n) {
            i.__package(e, {});
            var r = i.__internals, s = r[e] = r[e] || {
                self: e
            };
            if (n) {
                var a = n.split(",");
                s.extend = [];
                for (var o = 0; o < a.length; o++) {
                    var h = a[o];
                    r[h] = r[h] || {
                        self: h
                    }, s.extend.push(r[h]);
                }
            }
            for (var l = t, u = e.split("."), o = 0; o < u.length - 1; o++) l = l[u[o]];
            l[u[u.length - 1]] = {
                __interface__: e
            };
        },
        class: function(e, n, r, s) {
            if (r && i.__extend(e, r), n) if (i.__package(n, e), i.__classmap[n] = e, n.indexOf(".") > 0) {
                if (0 == n.indexOf("laya.")) {
                    var a = n.split(".");
                    s = s || a[a.length - 1], i[s] && console.log("Warning!,this class[" + s + "] already exist:", i[s]), 
                    i[s] = e;
                }
            } else "Main" == n ? t.Main = e : (i[n] && console.log("Error!,this class[" + n + "] already exist:", i[n]), 
            i[n] = e);
            var o = i.un, h = e.prototype;
            o(h, "hasOwnProperty", i.__hasOwnProperty), o(h, "__class", e), o(h, "__super", r), 
            o(h, "__className", n), o(e, "__super", r), o(e, "__className", n), o(e, "__isclass", !0), 
            o(e, "super", function(t) {
                this.__super.call(t);
            });
        },
        imps: function(t, e) {
            function n(t) {
                var e, s;
                if ((e = i.__internals[t]) && (r[t] = !0, s = e.extend)) for (var a = 0; a < s.length; a++) n(s[a].self);
            }
            if (!e) return null;
            var r = t.__imps || i.un(t, "__imps", {});
            for (var s in e) n(s);
        },
        superSet: function(t, e, i, n) {
            var r = t.prototype["_$set_" + i];
            r && r.call(e, n);
        },
        superGet: function(t, e, i) {
            var n = t.prototype["_$get_" + i];
            return n ? n.call(e) : null;
        },
        getset: function(t, e, n, r, s) {
            t ? (r && (e["_$GET_" + n] = r), s && (e["_$SET_" + n] = s)) : (r && i.un(e, "_$get_" + n, r), 
            s && i.un(e, "_$set_" + n, s)), r && s ? Object.defineProperty(e, n, {
                get: r,
                set: s,
                enumerable: !1,
                configurable: !0
            }) : (r && Object.defineProperty(e, n, {
                get: r,
                enumerable: !1,
                configurable: !0
            }), s && Object.defineProperty(e, n, {
                set: s,
                enumerable: !1,
                configurable: !0
            }));
        },
        static: function(t, e) {
            function i() {
                var i = e[n], r = e[n + 1];
                Object.defineProperty(t, i, {
                    get: function() {
                        return delete this[i], this[i] = r.call(this);
                    },
                    set: function(t) {
                        delete this[i], this[i] = t;
                    },
                    enumerable: !0,
                    configurable: !0
                });
            }
            for (var n = 0, r = e.length; r > n; n += 2) "length" == e[n] ? t.length = e[n + 1].call(t) : i();
        },
        un: function(t, e, n) {
            return n || (n = t[e]), i.__propun.value = n, Object.defineProperty(t, e, i.__propun), 
            n;
        },
        uns: function(t, e) {
            e.forEach(function(e) {
                i.un(t, e);
            });
        }
    };
    return t.console = t.console || {
        log: function() {}
    }, t.trace = t.console.log, Error.prototype.throwError = function() {
        throw arguments;
    }, Object.defineProperty(Array.prototype, "fixed", {
        enumerable: !1
    }), i;
}(window, document);

!function(t, e, i) {
    i.un, i.uns, i["static"], i["class"], i.getset, i.__newvec;
}(window, document, Laya), function(t, e, i) {
    var n = (i.un, i.uns, i["static"]), r = i["class"], s = i.getset;
    i.__newvec;
    i["interface"]("laya.filters.IFilter"), i["interface"]("laya.resource.IDispose"), 
    i["interface"]("laya.resource.IDestroy"), i["interface"]("laya.webgl.submit.ISubmit"), 
    i["interface"]("laya.resource.ICreateResource"), i["interface"]("laya.webgl.canvas.save.ISaveData"), 
    i["interface"]("laya.resource.ISingletonElement");
    var a = (function() {
        return s(1, i, "alertGlobalError", null, function(t) {
            var e = 0;
            t ? Dt.window.onerror = function(t, i, n, r, s) {
                e++ < 5 && s && alert("出错啦，请把此信息截图给研发商\n" + t + "\n" + s.stack);
            } : Dt.window.onerror = null;
        }), i.init = function(e, n, r) {
            for (var s = [], a = 2, o = arguments.length; o > a; a++) s.push(arguments[a]);
            if (!i._isinit) {
                i._isinit = !0, ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = i._arrayBufferSlice), 
                Dt.__init__(), i.systemTimer = new J(!1), i.startTimer = new J(!1), i.physicsTimer = new J(!1), 
                i.updateTimer = new J(!1), i.lateTimer = new J(!1), i.timer = new J(!1), i.loader = new Ne(), 
                Ct.__init__(), wt.inner_enable();
                for (var a = 0, h = s.length; h > a; a++) s[a] && s[a].enable && s[a].enable();
                return Mt.isConchApp && ue.enableNative(), Q.beginCheck(), i._currentStage = i.stage = new ai(), 
                q.rootPath = q._basePath = i._getUrlPath(), i.render = new Mt(0, 0), i.stage.size(e, n), 
                t.stage = i.stage, I.__init__(), gt.__init__(), S.instance.__init__(i.stage, Mt.canvas), 
                li.__init__(), ye.autoStopMusic = !0, Mt.canvas;
            }
        }, i._getUrlPath = function() {
            var t = Dt.window.location, e = t.pathname;
            return e = ":" == e.charAt(2) ? e.substring(1) : e, q.getPath("file:" == t.protocol ? e : t.protocol + "//" + t.host + t.pathname);
        }, i._arrayBufferSlice = function(t, e) {
            var i = this, n = new Uint8Array(i, t, e - t), r = new Uint8Array(n.length);
            return r.set(n), r.buffer;
        }, i._runScript = function(t) {
            return Dt.window[i._evcode](t);
        }, i.enableDebugPanel = function(t) {
            if (void 0 === t && (t = "libs/laya.debugtool.js"), i.DebugPanel) i.DebugPanel.enable(); else {
                var e = Dt.createElement("script");
                e.onload = function() {
                    i.DebugPanel.enable();
                }, e.src = t, Dt.document.body.appendChild(e);
            }
        }, i.stage = null, i.systemTimer = null, i.startTimer = null, i.physicsTimer = null, 
        i.updateTimer = null, i.lateTimer = null, i.timer = null, i.loader = null, i.version = "2.1.0beta", 
        i.render = null, i._currentStage = null, i._isinit = !1, i.isWXOpenDataContext = !1, 
        i.isWXPosMsg = !1, n(i, [ "_evcode", function() {
            return this._evcode = "eval";
        } ]), i;
    }(), function() {
        function t() {}
        return r(t, "laya.renders.LayaGLQuickRunner"), t.__init__ = function() {
            t.map[515] = t.alpha_transform_drawLayaGL, t.map[513] = t.alpha_drawLayaGL, t.map[514] = t.transform_drawLayaGL, 
            t.map[8194] = t.transform_drawNodes, t.map[259] = t.alpha_transform_drawTexture, 
            t.map[257] = t.alpha_drawTexture, t.map[258] = t.transform_drawTexture, t.map[8704] = t.drawLayaGL_drawNodes;
        }, t.transform_drawTexture = function(e, i, n, r) {
            var s = (e._style, e.texture);
            i.saveTransform(t.curMat), i.transformByMatrix(e.transform, n, r), i.drawTexture(s, -e.pivotX, -e.pivotY, e._width || s.width, e._height || s.height), 
            i.restoreTransform(t.curMat);
        }, t.alpha_drawTexture = function(t, e, i, n) {
            var r = t._style, s = NaN, a = t.texture;
            if ((s = r.alpha) > .01 || t._needRepaint()) {
                var o = e.globalAlpha;
                e.globalAlpha *= s, e.drawTexture(a, i - r.pivotX + a.offsetX, n - r.pivotY + a.offsetY, t._width || a.width, t._height || a.height), 
                e.globalAlpha = o;
            }
        }, t.alpha_transform_drawTexture = function(e, i, n, r) {
            var s = e._style, a = NaN, o = e.texture;
            if ((a = s.alpha) > .01 || e._needRepaint()) {
                var h = i.globalAlpha;
                i.globalAlpha *= a, i.saveTransform(t.curMat), i.transformByMatrix(e.transform, n, r), 
                i.drawTexture(o, -s.pivotX + o.offsetX, -s.pivotY + o.offsetY, e._width || o.width, e._height || o.height), 
                i.restoreTransform(t.curMat), i.globalAlpha = h;
            }
        }, t.alpha_transform_drawLayaGL = function(e, i, n, r) {
            var s = e._style, a = NaN;
            if ((a = s.alpha) > .01 || e._needRepaint()) {
                var o = i.globalAlpha;
                i.globalAlpha *= a, i.saveTransform(t.curMat), i.transformByMatrix(e.transform, n, r), 
                e._graphics && e._graphics._render(e, i, -s.pivotX, -s.pivotY), i.restoreTransform(t.curMat), 
                i.globalAlpha = o;
            }
        }, t.alpha_drawLayaGL = function(t, e, i, n) {
            var r = t._style, s = NaN;
            if ((s = r.alpha) > .01 || t._needRepaint()) {
                var a = e.globalAlpha;
                e.globalAlpha *= s, t._graphics && t._graphics._render(t, e, i - r.pivotX, n - r.pivotY), 
                e.globalAlpha = a;
            }
        }, t.transform_drawLayaGL = function(e, i, n, r) {
            var s = e._style;
            i.saveTransform(t.curMat), i.transformByMatrix(e.transform, n, r), e._graphics && e._graphics._render(e, i, -s.pivotX, -s.pivotY), 
            i.restoreTransform(t.curMat);
        }, t.transform_drawNodes = function(e, i, n, r) {
            var s = e._getBit(256) && i.drawCallOptimize(!0), a = e._style;
            i.saveTransform(t.curMat), i.transformByMatrix(e.transform, n, r), n = -a.pivotX, 
            r = -a.pivotY;
            var o, h = e._children, l = h.length;
            if (a.viewport) {
                var u = a.viewport, c = u.x, _ = u.y, d = u.right, f = u.bottom, p = NaN, m = NaN;
                for (g = 0; l > g; ++g) (o = h[g])._visible && (p = o._x) < d && p + o.width > c && (m = o._y) < f && m + o.height > _ && o.render(i, n, r);
            } else for (var g = 0; l > g; ++g) (o = h[g])._visible && o.render(i, n, r);
            i.restoreTransform(t.curMat), s && i.drawCallOptimize(!1);
        }, t.drawLayaGL_drawNodes = function(t, e, i, n) {
            var r = t._getBit(256) && e.drawCallOptimize(!0), s = t._style;
            i -= s.pivotX, n -= s.pivotY, t._graphics && t._graphics._render(t, e, i, n);
            var a, o = t._children, h = o.length;
            if (s.viewport) {
                var l = s.viewport, u = l.x, c = l.y, _ = l.right, d = l.bottom, f = NaN, p = NaN;
                for (m = 0; h > m; ++m) (a = o[m])._visible && (f = a._x) < _ && f + a.width > u && (p = a._y) < d && p + a.height > c && a.render(e, i, n);
            } else for (var m = 0; h > m; ++m) (a = o[m])._visible && a.render(e, i, n);
            r && e.drawCallOptimize(!1);
        }, t.map = {}, n(t, [ "curMat", function() {
            return this.curMat = new st();
        } ]), t;
    }()), o = function() {
        function t(e) {
            if (this.arrColor = [], null == e) return this.strColor = "#00000000", this.numColor = 0, 
            void (this.arrColor = [ 0, 0, 0, 0 ]);
            var i = 0, n = 0, r = 0;
            if ("string" == typeof e) if (e.indexOf("rgba(") >= 0 || e.indexOf("rgb(") >= 0) {
                var s = e, a = 0, o = 0;
                for (a = s.indexOf("("), o = s.indexOf(")"), s = s.substring(a + 1, o), this.arrColor = s.split(","), 
                n = this.arrColor.length, i = 0; n > i; i++) this.arrColor[i] = parseFloat(this.arrColor[i]), 
                3 > i && (this.arrColor[i] = Math.round(this.arrColor[i]));
                r = 4 == this.arrColor.length ? 256 * (256 * (256 * this.arrColor[0] + this.arrColor[1]) + this.arrColor[2]) + Math.round(255 * this.arrColor[3]) : 256 * (256 * this.arrColor[0] + this.arrColor[1]) + this.arrColor[2], 
                this.strColor = e;
            } else {
                if (this.strColor = e, "#" === e.charAt(0) && (e = e.substr(1)), n = e.length, 3 === n || 4 === n) {
                    var h = "";
                    for (i = 0; n > i; i++) h += e[i] + e[i];
                    e = h;
                }
                r = parseInt(e, 16);
            } else r = e, this.strColor = ie.toHexColor(r);
            this.strColor.indexOf("rgba") >= 0 || 9 === this.strColor.length ? (this.arrColor = [ ((4278190080 & r) >>> 24) / 255, ((16711680 & r) >> 16) / 255, ((65280 & r) >> 8) / 255, (255 & r) / 255 ], 
            this.numColor = (4278190080 & r) >>> 24 | (16711680 & r) >> 8 | (65280 & r) << 8 | (255 & r) << 24) : (this.arrColor = [ ((16711680 & r) >> 16) / 255, ((65280 & r) >> 8) / 255, (255 & r) / 255, 1 ], 
            this.numColor = 4278190080 | (16711680 & r) >> 16 | 65280 & r | (255 & r) << 16), 
            this.arrColor.__id = ++t._COLODID;
        }
        return r(t, "laya.utils.ColorUtils"), t._initDefault = function() {
            t._DEFAULT = {};
            for (var e in t._COLOR_MAP) t._SAVE[e] = t._DEFAULT[e] = new t(t._COLOR_MAP[e]);
            return t._DEFAULT;
        }, t._initSaveMap = function() {
            t._SAVE_SIZE = 0, t._SAVE = {};
            for (var e in t._DEFAULT) t._SAVE[e] = t._DEFAULT[e];
        }, t.create = function(e) {
            var i = e + "", n = t._SAVE[i];
            return null != n ? n : (t._SAVE_SIZE < 1e3 && t._initSaveMap(), t._SAVE[i] = new t(e));
        }, t._SAVE = {}, t._SAVE_SIZE = 0, t._COLOR_MAP = {
            purple: "#800080",
            orange: "#ffa500",
            white: "#FFFFFF",
            red: "#FF0000",
            green: "#00FF00",
            blue: "#0000FF",
            black: "#000000",
            yellow: "#FFFF00",
            gray: "#808080"
        }, t._DEFAULT = t._initDefault(), t._COLODID = 1, t;
    }(), h = function() {
        function t() {}
        r(t, "laya.webgl.canvas.save.SaveBase");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            this._dataObj[this._valueName] = this._value, t.POOL[t.POOL._length++] = this, this._newSubmit && (e._curSubmit = l.RENDERBASE);
        }, t._createArray = function() {
            var t = [];
            return t._length = 0, t;
        }, t._init = function() {
            var e = t._namemap = {};
            return e[1] = "ALPHA", e[2] = "fillStyle", e[8] = "font", e[256] = "lineWidth", 
            e[512] = "strokeStyle", e[8192] = "_mergeID", e[1024] = e[2048] = e[4096] = [], 
            e[16384] = "textBaseline", e[32768] = "textAlign", e[65536] = "_nBlendType", e[1048576] = "shader", 
            e[2097152] = "filters", e[8388608] = "_colorFiler", e;
        }, t.save = function(e, i, n, r) {
            if ((e._saveMark._saveuse & i) !== i) {
                e._saveMark._saveuse |= i;
                var s = t.POOL, a = s._length > 0 ? s[--s._length] : new t();
                a._value = n[a._valueName = t._namemap[i]], a._dataObj = n, a._newSubmit = r;
                var o = e._save;
                o[o._length++] = a;
            }
        }, t.POOL = laya.webgl.canvas.save.SaveBase._createArray(), t._namemap = t._init(), 
        t;
    }(), l = function() {
        function t(e) {
            this.clipInfoID = -1, this._mesh = null, this._blendFn = null, this._id = 0, this._renderType = 0, 
            this._parent = null, this._startIdx = 0, this._numEle = 0, this._ref = 1, this.shaderValue = null, 
            this._key = new k(), void 0 === e && (e = 1e4), this._renderType = e, this._id = ++t.ID;
        }
        r(t, "laya.webgl.submit.Submit");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.getID = function() {
            return this._id;
        }, e.releaseRender = function() {
            t.RENDERBASE != this && --this._ref < 1 && (t.POOL[t._poolSize++] = this, this.shaderValue.release(), 
            this.shaderValue = null, this._mesh = null, this._parent && (this._parent.releaseRender(), 
            this._parent = null));
        }, e.getRenderType = function() {
            return this._renderType;
        }, e.renderSubmit = function() {
            if (0 === this._numEle || !this._mesh || 0 == this._numEle) return 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                var e = t._getSource();
                if (!e) return 1;
                this.shaderValue.texture = e;
            }
            var i = wt.mainContext;
            return this._mesh.useMesh(i), this.shaderValue.upload(), _e.activeBlendFunction !== this._blendFn && (nt.setBlend(i, !0), 
            this._blendFn(i), _e.activeBlendFunction = this._blendFn), i.drawElements(4, this._numEle, 5123, this._startIdx), 
            A.renderBatches++, A.trianglesFaces += this._numEle / 3, 1;
        }, e._cloneInit = function(t, e, i, n) {
            t._ref = 1, t._mesh = i, t._id = this._id, t._key.copyFrom(this._key), t._parent = this, 
            t._blendFn = this._blendFn, t._renderType = this._renderType, t._startIdx = n * _t.BYTES_PIDX, 
            t._numEle = this._numEle, t.shaderValue = this.shaderValue, this.shaderValue.ref++, 
            this._ref++;
        }, e.clone = function(t, e, i) {
            return null;
        }, e.reUse = function(t, e) {
            return 0;
        }, e.toString = function() {
            return "ibindex:" + this._startIdx + " num:" + this._numEle + " key=" + this._key;
        }, t.__init__ = function() {
            var e = t.RENDERBASE = new t(-1);
            e.shaderValue = new X(0, 0), e.shaderValue.ALPHA = 1, e._ref = 4294967295;
        }, t.create = function(e, i, n) {
            var r = t._poolSize ? t.POOL[--t._poolSize] : new t();
            r._ref = 1, r._mesh = i, r._key.clear(), r._startIdx = i.indexNum * _t.BYTES_PIDX, 
            r._numEle = 0;
            var s = e._nBlendType;
            r._blendFn = e._targets ? _e.targetFns[s] : _e.fns[s], r.shaderValue = n, r.shaderValue.setValue(e._shader2D);
            var a = e._shader2D.filters;
            return a && r.shaderValue.setFilters(a), r;
        }, t.createShape = function(e, i, n, r) {
            var s = t._poolSize ? t.POOL[--t._poolSize] : new t();
            s._mesh = i, s._numEle = n, s._startIdx = 2 * i.indexNum, s._ref = 1, s.shaderValue = r, 
            s.shaderValue.setValue(e._shader2D);
            var a = e._nBlendType;
            return s._key.blendShader = a, s._blendFn = e._targets ? _e.targetFns[a] : _e.fns[a], 
            s;
        }, t.TYPE_2D = 1e4, t.TYPE_CANVAS = 10003, t.TYPE_CMDSETRT = 10004, t.TYPE_CUSTOM = 10005, 
        t.TYPE_BLURRT = 10006, t.TYPE_CMDDESTORYPRERT = 10007, t.TYPE_DISABLESTENCIL = 10008, 
        t.TYPE_OTHERIBVB = 10009, t.TYPE_PRIMITIVE = 10010, t.TYPE_RT = 10011, t.TYPE_BLUR_RT = 10012, 
        t.TYPE_TARGET = 10013, t.TYPE_CHANGE_VALUE = 10014, t.TYPE_SHAPE = 10015, t.TYPE_TEXTURE = 10016, 
        t.TYPE_FILLTEXTURE = 10017, t.KEY_ONCE = -1, t.KEY_FILLRECT = 1, t.KEY_DRAWTEXTURE = 2, 
        t.KEY_VG = 3, t.KEY_TRIANGLES = 4, t.RENDERBASE = null, t.ID = 1, t.preRender = null, 
        t._poolSize = 0, t.POOL = [], t;
    }(), u = function() {
        function t() {}
        r(t, "laya.display.cmd.FillTextureCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.texture = null, this.offset = null, this.other = null, U.recover("FillTextureCmd", this);
        }, e.run = function(t, e, i) {
            t.fillTexture(this.texture, this.x + e, this.y + i, this.width, this.height, this.type, this.offset, this.other);
        }, s(0, e, "cmdID", function() {
            return "FillTexture";
        }), t.create = function(e, i, n, r, s, a, o, h) {
            var l = U.getItemByClass("FillTextureCmd", t);
            return l.texture = e, l.x = i, l.y = n, l.width = r, l.height = s, l.type = a, l.offset = o, 
            l.other = h, l;
        }, t.ID = "FillTexture", t;
    }(), c = function() {
        function t() {
            this._glRender = null;
        }
        r(t, "laya.filters.Filter");
        var e = t.prototype;
        return i.imps(e, {
            "laya.filters.IFilter": !0
        }), s(0, e, "type", function() {
            return -1;
        }), t.BLUR = 16, t.COLOR = 32, t.GLOW = 8, t._filter = function(t, e, i, n) {
            var r = e, s = this._next;
            if (s) {
                var a = t.filters, o = a.length;
                if (1 == o && 32 == a[0].type) return e.save(), e.setColorFilter(a[0]), s._fun.call(s, t, e, i, n), 
                void e.restore();
                var h, l = X.create(1, 0), u = Yt.TEMP, c = r._curMat, _ = st.create();
                c.copyTo(_);
                var d = 0, f = 0, p = !1, m = null, g = t._cacheStyle.filterCache || null;
                if (g && 0 == t.getRepaint()) {
                    if (p = t._cacheStyle.hasGlowFilter || !1, p && (d = 50, f = 25), h = t.getBounds(), 
                    h.width <= 0 || h.height <= 0) return;
                    h.width += d, h.height += d, u.x = h.x * _.a + h.y * _.c, u.y = h.y * _.d + h.x * _.b, 
                    h.x = u.x, h.y = u.y, u.x = h.width * _.a + h.height * _.c, u.y = h.height * _.d + h.width * _.b, 
                    h.width = u.x, h.height = u.y;
                } else {
                    p = t._isHaveGlowFilter(), p && (d = 50, f = 25), h = new mt(), h.copyFrom(t.getSelfBounds()), 
                    h.x += t.x, h.y += t.y, h.x -= t.pivotX + 4, h.y -= t.pivotY + 4;
                    var v = h.x, y = h.y;
                    if (h.width += d + 8, h.height += d + 8, u.x = h.x * _.a + h.y * _.c, u.y = h.y * _.d + h.x * _.b, 
                    h.x = u.x, h.y = u.y, u.x = h.width * _.a + h.height * _.c, u.y = h.height * _.d + h.width * _.b, 
                    h.width = u.x, h.height = u.y, h.width <= 0 || h.height <= 0) return;
                    g && ee.releaseRT(g), m = ee.getRT(h.width, h.height);
                    var x = g = ee.getRT(h.width, h.height);
                    t._getCacheStyle().filterCache = g, r.pushRT(), r.useRT(m);
                    var T = t.x - v + f, b = t.y - y + f;
                    s._fun.call(s, t, e, T, b), r.useRT(x);
                    for (var w = 0; o > w; w++) {
                        0 != w && (r.useRT(m), r.drawTarget(x, 0, 0, h.width, h.height, st.TEMP.identity(), l, null, _e.TOINT.overlay), 
                        r.useRT(x));
                        var C = a[w];
                        switch (C.type) {
                          case 16:
                            C._glRender && C._glRender.render(m, e, h.width, h.height, C);
                            break;

                          case 8:
                            C._glRender && C._glRender.render(m, e, h.width, h.height, C);
                            break;

                          case 32:
                            r.setColorFilter(C), r.drawTarget(m, 0, 0, h.width, h.height, st.EMPTY.identity(), X.create(1, 0)), 
                            r.setColorFilter(null);
                        }
                    }
                    r.popRT();
                }
                if (i = i - f - t.x, n = n - f - t.y, u.setTo(i, n), _.transformPoint(u), i = u.x + h.x, 
                n = u.y + h.y, r._drawRenderTexture(g, i, n, h.width, h.height, st.TEMP.identity(), 1, di.defuv), 
                m) {
                    var A = $.create([ m ], function(t) {
                        t.destroy();
                    }, this);
                    m = null, e.addRenderObject(A);
                }
                _.destroy();
            }
        }, t;
    }(), _ = (function() {
        function t() {}
        return r(t, "laya.utils.Log"), t.enable = function() {
            t._logdiv || (t._logdiv = Dt.createElement("div"), t._logdiv.style.cssText = "border:white;padding:4px;overflow-y:auto;z-index:1000000;background:rgba(100,100,100,0.6);color:white;position: absolute;left:0px;top:0px;width:50%;height:50%;", 
            Dt.document.body.appendChild(t._logdiv), t._btn = Dt.createElement("button"), t._btn.innerText = "Hide", 
            t._btn.style.cssText = "z-index:1000001;position: absolute;left:10px;top:10px;", 
            t._btn.onclick = t.toggle, Dt.document.body.appendChild(t._btn));
        }, t.toggle = function() {
            var e = t._logdiv.style;
            "" === e.display ? (t._btn.innerText = "Show", e.display = "none") : (t._btn.innerText = "Hide", 
            e.display = "");
        }, t.print = function(e) {
            t._logdiv && (t._count >= t.maxCount && t.clear(), t._count++, t._logdiv.innerText += e + "\n", 
            t.autoScrollToBottom && t._logdiv.scrollHeight - t._logdiv.scrollTop - t._logdiv.clientHeight < 50 && (t._logdiv.scrollTop = t._logdiv.scrollHeight));
        }, t.clear = function() {
            t._logdiv.innerText = "", t._count = 0;
        }, t._logdiv = null, t._btn = null, t._count = 0, t.maxCount = 50, t.autoScrollToBottom = !0, 
        t;
    }(), function() {
        function t() {
            this.preOvers = [], this.preDowns = [], this.preRightDowns = [], this.enable = !0, 
            this._lastClickTime = 0, this._event = new w();
        }
        r(t, "laya.events.TouchManager");
        var e = t.prototype;
        return e._clearTempArrs = function() {
            t._oldArr.length = 0, t._newArr.length = 0, t._tEleArr.length = 0;
        }, e.getTouchFromArr = function(t, e) {
            var i = 0, n = 0;
            n = e.length;
            var r;
            for (i = 0; n > i; i++) if (r = e[i], r.id == t) return r;
            return null;
        }, e.removeTouchFromArr = function(t, e) {
            var i = 0;
            for (i = e.length - 1; i >= 0; i--) e[i].id == t && e.splice(i, 1);
        }, e.createTouchO = function(t, e) {
            var i;
            return i = U.getItem("TouchData") || {}, i.id = e, i.tar = t, i;
        }, e.onMouseDown = function(e, i, n) {
            if (void 0 === n && (n = !1), this.enable) {
                var r, s, a;
                r = this.getTouchFromArr(i, this.preOvers), a = this.getEles(e, null, t._tEleArr), 
                r ? r.tar = e : (s = this.createTouchO(e, i), this.preOvers.push(s)), Dt.onMobile && this.sendEvents(a, "mouseover");
                var o;
                o = n ? this.preDowns : this.preRightDowns, r = this.getTouchFromArr(i, o), r ? r.tar = e : (s = this.createTouchO(e, i), 
                o.push(s)), this.sendEvents(a, n ? "mousedown" : "rightmousedown"), this._clearTempArrs();
            }
        }, e.sendEvents = function(t, e) {
            var i = 0, n = 0;
            n = t.length, this._event._stoped = !1;
            var r;
            r = t[0];
            var s;
            for (i = 0; n > i; i++) {
                if (s = t[i], s.destroyed) return;
                if (s.event(e, this._event.setTo(e, s, r)), this._event._stoped) break;
            }
        }, e.getEles = function(t, e, i) {
            for (i ? i.length = 0 : i = []; t && t != e; ) i.push(t), t = t.parent;
            return i;
        }, e.checkMouseOutAndOverOfMove = function(e, i, n) {
            if (void 0 === n && (n = 0), i != e) {
                var r, s, a = 0, o = 0;
                if (i.contains(e)) s = this.getEles(e, i, t._tEleArr), this.sendEvents(s, "mouseover"); else if (e.contains(i)) s = this.getEles(i, e, t._tEleArr), 
                this.sendEvents(s, "mouseout"); else {
                    s = t._tEleArr, s.length = 0;
                    var h;
                    h = this.getEles(i, null, t._oldArr);
                    var l;
                    l = this.getEles(e, null, t._newArr), o = h.length;
                    var u = 0;
                    for (a = 0; o > a; a++) {
                        if (r = h[a], u = l.indexOf(r), u >= 0) {
                            l.splice(u, l.length - u);
                            break;
                        }
                        s.push(r);
                    }
                    s.length > 0 && this.sendEvents(s, "mouseout"), l.length > 0 && this.sendEvents(l, "mouseover");
                }
            }
        }, e.onMouseMove = function(e, i) {
            if (this.enable) {
                var n;
                n = this.getTouchFromArr(i, this.preOvers);
                var r;
                n ? (this.checkMouseOutAndOverOfMove(e, n.tar), n.tar = e, r = this.getEles(e, null, t._tEleArr)) : (r = this.getEles(e, null, t._tEleArr), 
                this.sendEvents(r, "mouseover"), this.preOvers.push(this.createTouchO(e, i))), this.sendEvents(r, "mousemove"), 
                this._clearTempArrs();
            }
        }, e.getLastOvers = function() {
            return t._tEleArr.length = 0, this.preOvers.length > 0 && this.preOvers[0].tar ? this.getEles(this.preOvers[0].tar, null, t._tEleArr) : (t._tEleArr.push(i.stage), 
            t._tEleArr);
        }, e.stageMouseOut = function() {
            var t;
            t = this.getLastOvers(), this.preOvers.length = 0, this.sendEvents(t, "mouseout");
        }, e.onMouseUp = function(e, i, n) {
            if (void 0 === n && (n = !1), this.enable) {
                var r, s, a, o, h, l = 0, u = 0, c = Dt.onMobile;
                s = this.getEles(e, null, t._tEleArr), this.sendEvents(s, n ? "mouseup" : "rightmouseup");
                var _;
                if (_ = n ? this.preDowns : this.preRightDowns, r = this.getTouchFromArr(i, _)) {
                    var d = !1, f = Dt.now();
                    if (d = f - this._lastClickTime < 300, this._lastClickTime = f, e == r.tar) h = s; else for (a = this.getEles(r.tar, null, t._oldArr), 
                    h = t._newArr, h.length = 0, u = a.length, l = 0; u > l; l++) o = a[l], s.indexOf(o) >= 0 && h.push(o);
                    h.length > 0 && this.sendEvents(h, n ? "click" : "rightclick"), n && d && this.sendEvents(h, "doubleclick"), 
                    this.removeTouchFromArr(i, _), r.tar = null, U.recover("TouchData", r);
                } else ;
                r = this.getTouchFromArr(i, this.preOvers), r && c && (h = this.getEles(r.tar, null, h), 
                h && h.length > 0 && this.sendEvents(h, "mouseout"), this.removeTouchFromArr(i, this.preOvers), 
                r.tar = null, U.recover("TouchData", r)), this._clearTempArrs();
            }
        }, t._oldArr = [], t._newArr = [], t._tEleArr = [], n(t, [ "I", function() {
            return this.I = new t();
        } ]), t;
    }()), d = function() {
        function t() {
            this._mesh = null, this._startIdx = 0, this._numEle = 0, this.shaderValue = null, 
            this.blendType = 0, this._ref = 1, this.srcRT = null, this._key = new k();
        }
        r(t, "laya.webgl.submit.SubmitTarget");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.renderSubmit = function() {
            var t = wt.mainContext;
            this._mesh.useMesh(t);
            var e = this.srcRT;
            return e && (this.shaderValue.texture = e._getSource(), this.shaderValue.upload(), 
            this.blend(), A.renderBatches++, A.trianglesFaces += this._numEle / 3, wt.mainContext.drawElements(4, this._numEle, 5123, this._startIdx)), 
            1;
        }, e.blend = function() {
            if (_e.activeBlendFunction !== _e.fns[this.blendType]) {
                var t = wt.mainContext;
                t.enable(3042), _e.fns[this.blendType](t), _e.activeBlendFunction = _e.fns[this.blendType];
            }
        }, e.getRenderType = function() {
            return 0;
        }, e.releaseRender = function() {
            if (--this._ref < 1) {
                var e = t.POOL;
                e[e._length++] = this;
            }
        }, e.reUse = function(t, e) {
            return this._startIdx = e, this._ref++, e;
        }, t.create = function(e, i, n, r) {
            var s = t.POOL._length ? t.POOL[--t.POOL._length] : new t();
            if (s._mesh = i, s.srcRT = r, s._startIdx = i.indexNum * _t.BYTES_PIDX, s._ref = 1, 
            s._key.clear(), s._numEle = 0, s.blendType = e._nBlendType, s._key.blendShader = s.blendType, 
            s.shaderValue = n, s.shaderValue.setValue(e._shader2D), e._colorFiler) {
                var a = e._colorFiler;
                n.defines.add(a.type), n.colorMat = a._mat, n.colorAlpha = a._alpha;
            }
            return s;
        }, t.POOL = [], t.__init$ = function() {
            t.POOL._length = 0;
        }, t;
    }(), f = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawImageCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.texture._removeReference(), this.texture = null, U.recover("DrawImageCmd", this);
        }, e.run = function(t, e, i) {
            t.drawTexture(this.texture, this.x + e, this.y + i, this.width, this.height);
        }, s(0, e, "cmdID", function() {
            return "DrawImage";
        }), t.create = function(e, i, n, r, s) {
            var a = U.getItemByClass("DrawImageCmd", t);
            return a.texture = e, e._addReference(), a.x = i, a.y = n, a.width = r, a.height = s, 
            a;
        }, t.ID = "DrawImage", t;
    }(), p = function() {
        function t() {
            this._id = ie.getGID(), this._resetComp();
        }
        r(t, "laya.components.Component");
        var e = t.prototype;
        return i.imps(e, {
            "laya.resource.ISingletonElement": !0,
            "laya.resource.IDestroy": !0
        }), e._isScript = function() {
            return !1;
        }, e._resetComp = function() {
            this._indexInList = -1, this._enabled = !0, this._awaked = !1, this.owner = null;
        }, e._getIndexInList = function() {
            return this._indexInList;
        }, e._setIndexInList = function(t) {
            this._indexInList = t;
        }, e._onAdded = function() {}, e._onAwake = function() {}, e._onEnable = function() {}, 
        e._onDisable = function() {}, e._onEnableInScene = function() {}, e._onDisableInScene = function() {}, 
        e._onDestroy = function() {}, e.onReset = function() {}, e._parse = function(t) {}, 
        e._cloneTo = function(t) {}, e._setActive = function(t) {
            t ? (this._awaked || (this._awaked = !0, this._onAwake()), this._enabled && this._onEnable()) : this._enabled && this._onDisable();
        }, e._setActiveInScene = function(t) {
            t ? this._onEnableInScene() : this._onDisableInScene();
        }, e.destroy = function() {
            this.owner && this.owner._destroyComponent(this);
        }, e._destroy = function() {
            this.owner.activeInHierarchy && this._enabled && (this._setActive(!1), this._isScript() && this.onDisable()), 
            this.owner._scene && this._setActiveInScene(!1), this._onDestroy(), this._destroyed = !0, 
            this.onReset !== laya.components.Component.prototype.onReset ? (this.onReset(), 
            this._resetComp(), U.recoverByClass(this)) : this._resetComp();
        }, s(0, e, "id", function() {
            return this._id;
        }), s(0, e, "enabled", function() {
            return this._enabled;
        }, function(t) {
            this._enabled = t, this.owner && (t ? this.owner.activeInHierarchy && this._onEnable() : this.owner.activeInHierarchy && this._onDisable());
        }), s(0, e, "isSingleton", function() {
            return !0;
        }), s(0, e, "destroyed", function() {
            return this._destroyed;
        }), t;
    }(), m = function() {
        function t() {
            this._$0__events = null;
        }
        var e;
        r(t, "laya.events.EventDispatcher");
        var i = t.prototype;
        return i.hasListener = function(t) {
            var e = this._$0__events && this._$0__events[t];
            return !!e;
        }, i.event = function(t, e) {
            if (!this._$0__events || !this._$0__events[t]) return !1;
            var i = this._$0__events[t];
            if (i.run) i.once && delete this._$0__events[t], null != e ? i.runWith(e) : i.run(); else {
                for (var n = 0, r = i.length; r > n; n++) {
                    var s = i[n];
                    s && (null != e ? s.runWith(e) : s.run()), (!s || s.once) && (i.splice(n, 1), n--, 
                    r--);
                }
                0 === i.length && this._$0__events && delete this._$0__events[t];
            }
            return !0;
        }, i.on = function(t, e, i, n) {
            return this._createListener(t, e, i, n, !1);
        }, i.once = function(t, e, i, n) {
            return this._createListener(t, e, i, n, !0);
        }, i._createListener = function(t, i, n, r, s, a) {
            void 0 === a && (a = !0), a && this.off(t, i, n, s);
            var o = e.create(i || this, n, r, s);
            this._$0__events || (this._$0__events = {});
            var h = this._$0__events;
            return h[t] ? h[t].run ? h[t] = [ h[t], o ] : h[t].push(o) : h[t] = o, this;
        }, i.off = function(t, e, i, n) {
            if (void 0 === n && (n = !1), !this._$0__events || !this._$0__events[t]) return this;
            var r = this._$0__events[t];
            if (null != r) if (r.run) e && r.caller !== e || null != i && r.method !== i || n && !r.once || (delete this._$0__events[t], 
            r.recover()); else {
                for (var s = 0, a = 0, o = r.length; o > a; a++) {
                    var h = r[a];
                    h ? !h || e && h.caller !== e || null != i && h.method !== i || n && !h.once || (s++, 
                    r[a] = null, h.recover()) : s++;
                }
                s === o && delete this._$0__events[t];
            }
            return this;
        }, i.offAll = function(t) {
            var e = this._$0__events;
            if (!e) return this;
            if (t) this._recoverHandlers(e[t]), delete e[t]; else {
                for (var i in e) this._recoverHandlers(e[i]);
                this._$0__events = null;
            }
            return this;
        }, i.offAllCaller = function(t) {
            if (t && this._$0__events) for (var e in this._$0__events) this.off(e, t, null);
            return this;
        }, i._recoverHandlers = function(t) {
            if (t) if (t.run) t.recover(); else for (var e = t.length - 1; e > -1; e--) t[e] && (t[e].recover(), 
            t[e] = null);
        }, i.isMouseEvent = function(e) {
            return t.MOUSE_EVENTS[e] || !1;
        }, t.MOUSE_EVENTS = {
            rightmousedown: !0,
            rightmouseup: !0,
            rightclick: !0,
            mousedown: !0,
            mouseup: !0,
            mousemove: !0,
            mouseover: !0,
            mouseout: !0,
            click: !0,
            doubleclick: !0
        }, t.__init$ = function() {
            Object.defineProperty(laya.events.EventDispatcher.prototype, "_events", {
                enumerable: !1,
                writable: !0
            }), e = function(t) {
                function e(t, i, n, r) {
                    e.__super.call(this, t, i, n, r);
                }
                r(e, "", t);
                var i = e.prototype;
                return i.recover = function() {
                    this._id > 0 && (this._id = 0, e._pool.push(this.clear()));
                }, e.create = function(t, i, n, r) {
                    return void 0 === r && (r = !0), e._pool.length ? e._pool.pop().setTo(t, i, n, r) : new e(t, i, n, r);
                }, e._pool = [], e;
            }(g);
        }, t;
    }(), g = function() {
        function t(t, e, i, n) {
            this.once = !1, this._id = 0, void 0 === n && (n = !1), this.setTo(t, e, i, n);
        }
        r(t, "laya.utils.Handler");
        var e = t.prototype;
        return e.setTo = function(e, i, n, r) {
            return this._id = t._gid++, this.caller = e, this.method = i, this.args = n, this.once = r, 
            this;
        }, e.run = function() {
            if (null == this.method) return null;
            var t = this._id, e = this.method.apply(this.caller, this.args);
            return this._id === t && this.once && this.recover(), e;
        }, e.runWith = function(t) {
            if (null == this.method) return null;
            var e = this._id;
            if (null == t) var i = this.method.apply(this.caller, this.args); else i = this.args || t.unshift ? this.args ? this.method.apply(this.caller, this.args.concat(t)) : this.method.apply(this.caller, t) : this.method.call(this.caller, t);
            return this._id === e && this.once && this.recover(), i;
        }, e.clear = function() {
            return this.caller = null, this.method = null, this.args = null, this;
        }, e.recover = function() {
            this._id > 0 && (this._id = 0, t._pool.push(this.clear()));
        }, t.create = function(e, i, n, r) {
            return void 0 === r && (r = !0), t._pool.length ? t._pool.pop().setTo(e, i, n, r) : new t(e, i, n, r);
        }, t._pool = [], t._gid = 1, t;
    }(), v = function() {
        function t() {
            this.ib = null, this.vb = null;
            wt.mainContext;
            this.ib = Qe.create(35048), this.vb = ti.create(8);
        }
        r(t, "laya.webgl.shader.d2.skinAnishader.SkinMeshBuffer");
        var e = t.prototype;
        return e.addSkinMesh = function(t) {
            t.getData2(this.vb, this.ib, this.vb._byteLength / 32);
        }, e.reset = function() {
            this.vb.clear(), this.ib.clear();
        }, t.getInstance = function() {
            return t.instance = t.instance || new t();
        }, t.instance = null, t;
    }(), y = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawTrianglesCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.texture = null, this.vertices = null, this.uvs = null, this.indices = null, 
            this.matrix = null, U.recover("DrawTrianglesCmd", this);
        }, e.run = function(t, e, i) {
            t.drawTriangles(this.texture, this.x + e, this.y + i, this.vertices, this.uvs, this.indices, this.matrix, this.alpha, this.color, this.blendMode);
        }, s(0, e, "cmdID", function() {
            return "DrawTriangles";
        }), t.create = function(e, i, n, r, s, a, h, l, u, c) {
            var _ = U.getItemByClass("DrawTrianglesCmd", t);
            if (_.texture = e, _.x = i, _.y = n, _.vertices = r, _.uvs = s, _.indices = a, _.matrix = h, 
            _.alpha = l, u) {
                _.color = new Te();
                var d = o.create(u).arrColor;
                _.color.color(255 * d[0], 255 * d[1], 255 * d[2], 255 * d[3]);
            }
            return _.blendMode = c, _;
        }, t.ID = "DrawTriangles", t;
    }(), x = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawPieCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.fillColor = null, this.lineColor = null, U.recover("DrawPieCmd", this);
        }, e.run = function(t, e, i) {
            t._drawPie(this.x + e, this.y + i, this.radius, this._startAngle, this._endAngle, this.fillColor, this.lineColor, this.lineWidth, this.vid);
        }, s(0, e, "startAngle", function() {
            return 180 * this._startAngle / Math.PI;
        }, function(t) {
            this._startAngle = t * Math.PI / 180;
        }), s(0, e, "cmdID", function() {
            return "DrawPie";
        }), s(0, e, "endAngle", function() {
            return 180 * this._endAngle / Math.PI;
        }, function(t) {
            this._endAngle = t * Math.PI / 180;
        }), t.create = function(e, i, n, r, s, a, o, h, l) {
            var u = U.getItemByClass("DrawPieCmd", t);
            return u.x = e, u.y = i, u.radius = n, u._startAngle = r, u._endAngle = s, u.fillColor = a, 
            u.lineColor = o, u.lineWidth = h, u.vid = l, u;
        }, t.ID = "DrawPie", t;
    }(), T = function() {
        function t() {
            this.id = NaN, this.save = [], this.toUpperCase = null, this.changed = !1, this._text = null, 
            this.width = -1, this.pageChars = [], this.startID = 0, this.startIDStroke = 0, 
            this.lastGCCnt = 0, this.splitRender = !1;
        }
        r(t, "laya.utils.WordText");
        var e = t.prototype;
        return e.setText = function(t) {
            this.changed = !0, this._text = t, this.width = -1, this.cleanCache();
        }, e.toString = function() {
            return this._text;
        }, e.charCodeAt = function(t) {
            return this._text ? this._text.charCodeAt(t) : NaN;
        }, e.charAt = function(t) {
            return this._text ? this._text.charAt(t) : null;
        }, e.cleanCache = function() {
            this.pageChars.forEach(function(t) {
                var e = t.tex;
                t.words;
                1 == t.words.length && e && e.ri && e.destroy();
            }), this.pageChars = [], this.startID = 0;
        }, s(0, e, "length", function() {
            return this._text ? this._text.length : 0;
        }), t;
    }(), b = function() {
        function t(t, e, i) {
            this._stride = 0, this.vertNum = 0, this.indexNum = 0, this._applied = !1, this._vb = null, 
            this._ib = null, this._vao = null, this._attribInfo = null, this._quadNum = 0, this.canReuse = !1, 
            this._stride = t, this._vb = new ti(t, 35048), e ? this._vb._resizeBuffer(e, !1) : se.webGL2D_MeshAllocMaxMem && this._vb._resizeBuffer(65536 * t, !1), 
            this._ib = new Qe(), i && this._ib._resizeBuffer(i, !1);
        }
        r(t, "laya.webgl.utils.Mesh2D");
        var e = t.prototype;
        return e.cloneWithNewVB = function() {
            var e = new t(this._stride, 0, 0);
            return e._ib = this._ib, e._quadNum = this._quadNum, e._attribInfo = this._attribInfo, 
            e;
        }, e.cloneWithNewVBIB = function() {
            var e = new t(this._stride, 0, 0);
            return e._attribInfo = this._attribInfo, e;
        }, e.getVBW = function() {
            return this._vb.setNeedUpload(), this._vb;
        }, e.getVBR = function() {
            return this._vb;
        }, e.getIBR = function() {
            return this._ib;
        }, e.getIBW = function() {
            return this._ib.setNeedUpload(), this._ib;
        }, e.createQuadIB = function(t) {
            this._quadNum = t, this._ib._resizeBuffer(6 * t * 2, !1), this._ib.byteLength = this._ib.bufferLength;
            for (var e = this._ib.getUint16Array(), i = 0, n = 0, r = 0; t > r; r++) e[i++] = n, 
            e[i++] = n + 2, e[i++] = n + 1, e[i++] = n, e[i++] = n + 3, e[i++] = n + 2, n += 4;
            this._ib.setNeedUpload();
        }, e.setAttributes = function(t) {
            if (this._attribInfo = t, this._attribInfo.length % 3 != 0) throw "Mesh2D setAttributes error!";
        }, e.configVAO = function(t) {
            if (!this._applied) {
                this._applied = !0, this._vao || (this._vao = new Ge()), this._vao.bind(), this._vb._bindForVAO(), 
                this._ib.setNeedUpload(), this._ib._bind_uploadForVAO();
                for (var e = this._attribInfo.length / 3, i = 0, n = 0; e > n; n++) {
                    var r = this._attribInfo[i + 1], s = this._attribInfo[i], a = this._attribInfo[i + 2];
                    t.enableVertexAttribArray(n), t.vertexAttribPointer(n, r, s, !1, this._stride, a), 
                    i += 3;
                }
                this._vao.unBind();
            }
        }, e.useMesh = function(t) {
            this._applied || this.configVAO(t), this._vao.bind(), this._vb.bind(), this._ib._bind_upload() || this._ib.bind(), 
            this._vb._bind_upload() || this._vb.bind();
        }, e.getEleNum = function() {
            return this._ib.getBuffer().byteLength / 2;
        }, e.releaseMesh = function() {}, e.destroy = function() {}, e.clearVB = function() {
            this._vb.clear();
        }, t._gvaoid = 0, t;
    }(), w = function() {
        function t() {}
        r(t, "laya.events.Event");
        var e = t.prototype;
        return e.setTo = function(t, e, i) {
            return this.type = t, this.currentTarget = e, this.target = i, this;
        }, e.stopPropagation = function() {
            this._stoped = !0;
        }, s(0, e, "stageY", function() {
            return i.stage.mouseY;
        }), s(0, e, "charCode", function() {
            return this.nativeEvent.charCode;
        }), s(0, e, "touches", function() {
            if (!this.nativeEvent) return null;
            var t = this.nativeEvent.touches;
            if (t) for (var e = i.stage, n = 0, r = t.length; r > n; n++) {
                var s = t[n], a = Yt.TEMP;
                a.setTo(s.clientX, s.clientY), e._canvasTransform.invertTransformPoint(a), e.transform.invertTransformPoint(a), 
                s.stageX = a.x, s.stageY = a.y;
            }
            return t;
        }), s(0, e, "keyLocation", function() {
            return this.nativeEvent.location || this.nativeEvent.keyLocation;
        }), s(0, e, "ctrlKey", function() {
            return this.nativeEvent.ctrlKey;
        }), s(0, e, "altKey", function() {
            return this.nativeEvent.altKey;
        }), s(0, e, "shiftKey", function() {
            return this.nativeEvent.shiftKey;
        }), s(0, e, "stageX", function() {
            return i.stage.mouseX;
        }), t.EMPTY = new t(), t.MOUSE_DOWN = "mousedown", t.MOUSE_UP = "mouseup", t.CLICK = "click", 
        t.RIGHT_MOUSE_DOWN = "rightmousedown", t.RIGHT_MOUSE_UP = "rightmouseup", t.RIGHT_CLICK = "rightclick", 
        t.MOUSE_MOVE = "mousemove", t.MOUSE_OVER = "mouseover", t.MOUSE_OUT = "mouseout", 
        t.MOUSE_WHEEL = "mousewheel", t.ROLL_OVER = "mouseover", t.ROLL_OUT = "mouseout", 
        t.DOUBLE_CLICK = "doubleclick", t.CHANGE = "change", t.CHANGED = "changed", t.RESIZE = "resize", 
        t.ADDED = "added", t.REMOVED = "removed", t.DISPLAY = "display", t.UNDISPLAY = "undisplay", 
        t.ERROR = "error", t.COMPLETE = "complete", t.LOADED = "loaded", t.READY = "ready", 
        t.PROGRESS = "progress", t.INPUT = "input", t.RENDER = "render", t.OPEN = "open", 
        t.MESSAGE = "message", t.CLOSE = "close", t.KEY_DOWN = "keydown", t.KEY_PRESS = "keypress", 
        t.KEY_UP = "keyup", t.FRAME = "enterframe", t.DRAG_START = "dragstart", t.DRAG_MOVE = "dragmove", 
        t.DRAG_END = "dragend", t.ENTER = "enter", t.SELECT = "select", t.BLUR = "blur", 
        t.FOCUS = "focus", t.VISIBILITY_CHANGE = "visibilitychange", t.FOCUS_CHANGE = "focuschange", 
        t.PLAYED = "played", t.PAUSED = "paused", t.STOPPED = "stopped", t.START = "start", 
        t.END = "end", t.COMPONENT_ADDED = "componentadded", t.COMPONENT_REMOVED = "componentremoved", 
        t.RELEASED = "released", t.LINK = "link", t.LABEL = "label", t.FULL_SCREEN_CHANGE = "fullscreenchange", 
        t.DEVICE_LOST = "devicelost", t.TRANSFORM_CHANGED = "transformchanged", t.ANIMATION_CHANGED = "animationchanged", 
        t.TRAIL_FILTER_CHANGE = "trailfilterchange", t.TRIGGER_ENTER = "triggerenter", t.TRIGGER_STAY = "triggerstay", 
        t.TRIGGER_EXIT = "triggerexit", t;
    }(), C = function() {
        function t() {
            this.fontSizeInfo = {}, this.charRender = null, this.mapFont = {}, this.fontID = 0, 
            this.mapColor = [], this.colorID = 0, this.fontScaleX = 1, this.fontScaleY = 1, 
            this._curStrPos = 0, this.bmpData32 = null, this.lastFont = null, this.fontSizeW = 0, 
            this.fontSizeH = 0, this.fontSizeOffX = 0, this.fontSizeOffY = 0, this.renderPerChar = !0, 
            this.textureMem = 0, this.fontStr = null, this.textAtlases = [], this.isoTextures = [], 
            this.tmpAtlasPos = new Yt();
            var e = !1, n = i.MiniAdpter;
            n && n.systemInfo && n.systemInfo.system && (e = "ios 10.1.1" === n.systemInfo.system.toLowerCase()), 
            Dt.onMiniGame && !e && (t.isWan1Wan = !0), Dt.onLimixiu && (t.isWan1Wan = !0), this.charRender = Mt.isConchApp ? new ze() : new He(t.atlasWidth, t.atlasWidth, t.scaleFontWithCtx, !t.isWan1Wan, !1), 
            t.textRenderInst = this, i.textRender = this, t.atlasWidth2 = t.atlasWidth * t.atlasWidth;
        }
        r(t, "laya.webgl.text.TextRender");
        var e = t.prototype;
        return e.setFont = function(e) {
            if (this.lastFont != e) {
                this.lastFont = e;
                var i = this.getFontSizeInfo(e._family), n = i >> 24, r = i >> 16 & 255, s = i >> 8 & 255, a = 255 & i, o = e._size / t.standardFontSize;
                this.fontSizeOffX = Math.ceil(n * o), this.fontSizeOffY = Math.ceil(r * o), this.fontSizeW = Math.ceil(s * o), 
                this.fontSizeH = Math.ceil(a * o), e._font.indexOf("italic") >= 0 ? this.fontStr = e._font.replace("italic", "") : this.fontStr = e._font;
            }
        }, e.getNextChar = function(t) {
            var e = t.length, i = this._curStrPos;
            if (i >= e) return null;
            for (var n = i, r = 0; e > n; n++) {
                var s = t.charCodeAt(n);
                if (s >>> 11 == 27) {
                    if (1 == r) break;
                    r = 1, n++;
                } else if (65038 === s || 65039 === s) ; else if (8205 == s) r = 2; else if (0 == r) r = 1; else if (1 == r) break;
            }
            return this._curStrPos = n, t.substring(i, n);
        }, e.filltext = function(t, e, i, n, r, s, a, o, h, l) {
            if (void 0 === l && (l = 0), !(e.length <= 0)) {
                var u = fe.Parse(r), c = 0;
                switch (h) {
                  case "center":
                    c = ut.ENUM_TEXTALIGN_CENTER;
                    break;

                  case "right":
                    c = ut.ENUM_TEXTALIGN_RIGHT;
                }
                this._fast_filltext(t, e, null, i, n, u, s, a, o, c, l);
            }
        }, e.fillWords = function(t, e, i, n, r, s, a, o) {
            if (e && !(e.length <= 0)) {
                var h = fe.Parse(r);
                this._fast_filltext(t, null, e, i, n, h, s, a, o, 0, 0);
            }
        }, e._fast_filltext = function(e, i, n, r, s, a, o, h, l, u, c) {
            if (void 0 === c && (c = 0), !(i && i.length < 1 || n && n.length < 1)) {
                if (0 > l && (l = 0), this.setFont(a), this.fontScaleX = this.fontScaleY = 1, !Mt.isConchApp && t.scaleFontWithCtx) {
                    var _ = 1, d = 1;
                    if (Mt.isConchApp ? (_ = e._curMat.getScaleX(), d = e._curMat.getScaleY()) : (_ = e.getMatScaleX(), 
                    d = e.getMatScaleY()), 1e-4 > _ || .1 > d) return;
                    _ > 1 && (this.fontScaleX = _), d > 1 && (this.fontScaleY = d);
                }
                a._italic && (e._italicDeg = 13);
                var f = i, p = !n && i instanceof laya.utils.WordText, m = i, g = !!n, v = p ? f.pageChars : [], y = 0;
                switch (p ? (m = f._text, y = f.width, 0 > y && (y = f.width = this.charRender.getWidth(this.fontStr, m))) : y = m ? this.charRender.getWidth(this.fontStr, m) : 0, 
                u) {
                  case ut.ENUM_TEXTALIGN_CENTER:
                    r -= y / 2;
                    break;

                  case ut.ENUM_TEXTALIGN_RIGHT:
                    r -= y;
                }
                f && v && this.hasFreedText(v) && (v = f.pageChars = []);
                var x = null, T = (p || t.forceWholeRender, this.renderPerChar = !p || t.forceSplitRender || g || p && f.splitRender);
                if (!v || v.length < 1) if (T) {
                    var b = 0, w = 0;
                    this._curStrPos = 0;
                    for (var C; ;) {
                        if (g) {
                            var A = n[this._curStrPos++];
                            A ? (C = A["char"], b = A.x, w = A.y) : C = null;
                        } else C = this.getNextChar(m);
                        if (!C) break;
                        if (x = this.getCharRenderInfo(C, a, o, h, l, !1), !x) break;
                        if (x.isSpace) ; else {
                            var E = v[x.tex.id];
                            if (E) E = E.words; else {
                                var S = {
                                    texgen: x.tex.genID,
                                    tex: x.tex,
                                    words: []
                                };
                                v[x.tex.id] = S, E = S.words;
                            }
                            Mt.isConchApp ? E.push({
                                ri: x,
                                x: b,
                                y: w,
                                w: x.bmpWidth / this.fontScaleX,
                                h: x.bmpHeight / this.fontScaleY
                            }) : E.push({
                                ri: x,
                                x: b + 1 / this.fontScaleX,
                                y: w,
                                w: (x.bmpWidth - 2) / this.fontScaleX,
                                h: (x.bmpHeight - 1) / this.fontScaleY
                            }), b += x.width;
                        }
                    }
                } else {
                    var M = t.noAtlas || y * this.fontScaleX > t.atlasWidth;
                    x = this.getCharRenderInfo(m, a, o, h, l, M), Mt.isConchApp ? v[0] = {
                        texgen: x.tex.genID,
                        tex: x.tex,
                        words: [ {
                            ri: x,
                            x: 0,
                            y: 0,
                            w: x.bmpWidth / this.fontScaleX,
                            h: x.bmpHeight / this.fontScaleY
                        } ]
                    } : v[0] = {
                        texgen: x.tex.genID,
                        tex: x.tex,
                        words: [ {
                            ri: x,
                            x: 1 / this.fontScaleX,
                            y: 0 / this.fontScaleY,
                            w: (x.bmpWidth - 2) / this.fontScaleX,
                            h: (x.bmpHeight - 1) / this.fontScaleY
                        } ]
                    };
                }
                this._drawResortedWords(e, r, s, v), e._italicDeg = 0;
            }
        }, e._drawResortedWords = function(t, e, i, n) {
            for (var r = t._charSubmitCache && t._charSubmitCache._enbale, s = t._curMat, a = n.length, o = 0; a > o; o++) {
                var h = n[o];
                if (h) {
                    var l = h.words, u = l.length;
                    if (!(0 >= u)) for (var c = n[o].tex, _ = 0; u > _; _++) {
                        var d = l[_], f = d.ri;
                        f.isSpace || (f.touch(), t.drawTexAlign = !0, Mt.isConchApp ? t._drawTextureM(c.texture, e + d.x - f.orix, i + d.y - f.oriy, d.w, d.h, null, 1, f.uv) : t._inner_drawTexture(c.texture, c.texture.bitmap.id, e + d.x - f.orix, i + d.y - f.oriy, d.w, d.h, s, f.uv, 1, r), 
                        t.touches && t.touches.push(f));
                    }
                }
            }
        }, e.hasFreedText = function(t) {
            for (var e = t.length, i = 0; e > i; i++) {
                var n = t[i];
                if (n) {
                    var r = n.tex;
                    if (r.__destroyed || r.genID != n.texgen) return !0;
                }
            }
            return !1;
        }, e.getCharRenderInfo = function(e, i, n, r, s, a) {
            void 0 === a && (a = !1);
            var o = this.mapFont[i._family];
            void 0 == o && (this.mapFont[i._family] = o = this.fontID++);
            var h = e + "_" + o + "_" + i._size + "_" + n;
            s > 0 && (h += "_" + r + s), i._bold && (h += "P"), (1 != this.fontScaleX || 1 != this.fontScaleY) && (h += (20 * this.fontScaleX | 0) + "_" + (20 * this.fontScaleY | 0));
            var l = 0, u = this.textAtlases.length, c = null, _ = null;
            if (!a) for (l = 0; u > l; l++) if (_ = this.textAtlases[l], c = _.charMaps[h]) return c.touch(), 
            c;
            c = new dt(), this.charRender.scale(this.fontScaleX, this.fontScaleY), c["char"] = e, 
            c.height = i._size;
            var d = i._size / 3 | 0, f = null, p = Math.ceil(this.charRender.getWidth(this.fontStr, e) * this.fontScaleX);
            if (p > this.charRender.canvasWidth && (this.charRender.canvasWidth = Math.min(2048, p + 2 * d)), 
            a) {
                f = this.charRender.getCharBmp(e, this.fontStr, s, n, r, c, d, d, d, d, null);
                var m = qe.getTextTexture(f.width, f.height);
                m.addChar(f, 0, 0, c.uv), c.tex = m, c.orix = d, c.oriy = d, m.ri = c, this.isoTextures.push(m);
            } else {
                var g = e.length, v = 1 * s, y = Math.ceil((this.fontSizeW + 2 * v) * this.fontScaleX), x = Math.ceil((this.fontSizeH + 2 * v) * this.fontScaleY);
                t.imgdtRect[0] = (d - this.fontSizeOffX - v) * this.fontScaleX | 0, t.imgdtRect[1] = (d - this.fontSizeOffY - v) * this.fontScaleY | 0, 
                this.renderPerChar || 1 == g ? (t.imgdtRect[2] = Math.max(p, y), t.imgdtRect[3] = Math.max(p, x)) : (t.imgdtRect[2] = -1, 
                t.imgdtRect[3] = x), f = this.charRender.getCharBmp(e, this.fontStr, s, n, r, c, d, d, d, d, t.imgdtRect), 
                _ = this.addBmpData(f, c), t.isWan1Wan ? (c.orix = d, c.oriy = d) : (c.orix = this.fontSizeOffX + v, 
                c.oriy = this.fontSizeOffY + v), _.charMaps[h] = c;
            }
            return c;
        }, e.addBmpData = function(t, e) {
            for (var i = t.width, n = t.height, r = this.textAtlases.length, s = null, a = !1, o = 0; r > o && (s = this.textAtlases[o], 
            !(a = s.getAEmpty(i, n, this.tmpAtlasPos))); o++) ;
            if (!a) {
                if (s = new kt(), this.textAtlases.push(s), a = s.getAEmpty(i, n, this.tmpAtlasPos), 
                !a) throw "err1";
                this.cleanAtlases();
            }
            return a && (s.texture.addChar(t, this.tmpAtlasPos.x, this.tmpAtlasPos.y, e.uv), 
            e.tex = s.texture), s;
        }, e.GC = function() {
            for (var e = 0, i = this.textAtlases.length, n = 0, r = t.destroyAtlasDt, s = 0, a = 0, o = A.loopCount, h = -1, l = 0, u = null, c = null; i > e; e++) {
                if (c = this.textAtlases[e], u = c.texture) {
                    s += u.curUsedCovRate, a += u.curUsedCovRateAtlas;
                    var _ = c.usedRate - u.curUsedCovRateAtlas;
                    _ > l && (l = _, h = e);
                }
                n = o - c.texture.lastTouchTm, n > r && (t.showLog && console.log(c.texture.id), 
                c.destroy(), this.textAtlases[e] = this.textAtlases[i - 1], i--, e--, h = -1);
            }
            for (this.textAtlases.length = i, i = this.isoTextures.length, e = 0; i > e; e++) u = this.isoTextures[e], 
            n = o - u.lastTouchTm, n > t.destroyUnusedTextureDt && (u.ri.deleted = !0, u.ri.tex = null, 
            u.destroy(), this.isoTextures[e] = this.isoTextures[i - 1], i--, e--);
            this.isoTextures.length = i;
            var d = this.textAtlases.length > 1 && this.textAtlases.length - a >= 2;
            (t.atlasWidth * t.atlasWidth * 4 * this.textAtlases.length > t.cleanMem || d || t.simClean) && (t.simClean = !1, 
            t.showLog && console.log("清理使用率低的贴图。总使用率:", a, ":", this.textAtlases.length, "最差贴图:" + h), 
            h >= 0 && (c = this.textAtlases[h], c.destroy(), this.textAtlases[h] = this.textAtlases[this.textAtlases.length - 1], 
            this.textAtlases.length = this.textAtlases.length - 1)), qe.clean();
        }, e.cleanAtlases = function() {}, e.getCharBmp = function(t) {}, e.checkBmpLine = function(t, e, i, n) {
            this.bmpData32.buffer != t.data.buffer && (this.bmpData32 = new Uint32Array(t.data.buffer));
            for (var r = t.width * e + i, s = i; n > s; s++) if (0 != this.bmpData32[r++]) return !0;
            return !1;
        }, e.updateBbx = function(t, e, i) {
            void 0 === i && (i = !1);
            var n = t.width, r = t.height, s = 0, a = e[1], o = 0, h = a;
            if (this.checkBmpLine(t, a, 0, n)) for (;;) {
                if (h = (a + o) / 2 | 0, h + 1 >= a) {
                    e[1] = h;
                    break;
                }
                this.checkBmpLine(t, h, 0, n) ? a = h : o = h;
            }
            if (e[3] > r) e[3] = r; else if (h = a = e[3], o = r, this.checkBmpLine(t, a, 0, n)) for (;;) {
                if (h = (a + o) / 2 | 0, a >= h - 1) {
                    e[3] = h;
                    break;
                }
                this.checkBmpLine(t, h, 0, n) ? a = h : o = h;
            }
            if (!i) {
                var l = e[0], u = n * e[1];
                for (h = e[1]; h < e[3]; h++) {
                    for (s = 0; l > s; s++) if (0 != this.bmpData32[u + s]) {
                        l = s;
                        break;
                    }
                    u += n;
                }
                e[0] = l;
                var c = e[2];
                for (u = n * e[1], h = e[1]; h < e[3]; h++) {
                    for (s = c; n > s; s++) if (0 != this.bmpData32[u + s]) {
                        c = s;
                        break;
                    }
                    u += n;
                }
                e[2] = c;
            }
        }, e.getFontSizeInfo = function(e) {
            var i = this.fontSizeInfo[e];
            if (void 0 != i) return i;
            var n = "bold " + t.standardFontSize + "px " + e;
            if (t.isWan1Wan) {
                this.fontSizeW = 1.5 * this.charRender.getWidth(n, "有"), this.fontSizeH = 1.5 * t.standardFontSize;
                var r = this.fontSizeW << 8 | this.fontSizeH;
                return this.fontSizeInfo[e] = r, r;
            }
            t.pixelBBX[0] = t.standardFontSize / 2, t.pixelBBX[1] = t.standardFontSize / 2, 
            t.pixelBBX[2] = t.standardFontSize, t.pixelBBX[3] = t.standardFontSize;
            var s = 16, a = 16, o = 16, h = 16;
            this.charRender.scale(1, 1), t.tmpRI.height = t.standardFontSize;
            var l = this.charRender.getCharBmp("g", n, 0, "red", null, t.tmpRI, s, a, o, h);
            Mt.isConchApp && (l.data = new Uint8ClampedArray(l.data)), this.bmpData32 = new Uint32Array(l.data.buffer), 
            this.updateBbx(l, t.pixelBBX, !1), l = this.charRender.getCharBmp("有", n, 0, "red", null, t.tmpRI, a, a, o, h), 
            Mt.isConchApp && (l.data = new Uint8ClampedArray(l.data)), this.bmpData32 = new Uint32Array(l.data.buffer), 
            t.pixelBBX[2] < s + t.tmpRI.width && (t.pixelBBX[2] = s + t.tmpRI.width), this.updateBbx(l, t.pixelBBX, !1), 
            Mt.isConchApp && (s = 0, a = 0);
            var u = Math.max(s - t.pixelBBX[0], 0), c = Math.max(a - t.pixelBBX[1], 0), _ = t.pixelBBX[2] - t.pixelBBX[0], d = t.pixelBBX[3] - t.pixelBBX[1] + 1, f = u << 24 | c << 16 | _ << 8 | d;
            return this.fontSizeInfo[e] = f, f;
        }, e.printDbgInfo = function() {
            console.log("图集个数:" + this.textAtlases.length + ",每个图集大小:" + t.atlasWidth + "x" + t.atlasWidth, " 用canvas:", t.isWan1Wan), 
            console.log("图集占用空间:" + t.atlasWidth * t.atlasWidth * 4 / 1024 / 1024 * this.textAtlases.length + "M"), 
            console.log("缓存用到的字体:");
            for (var e in this.mapFont) {
                var i = this.getFontSizeInfo(e), n = i >> 24, r = i >> 16 & 255, s = i >> 8 & 255, a = 255 & i;
                console.log("    " + e, " off:", n, r, " size:", s, a);
            }
            var o = 0;
            console.log("缓存数据:");
            var h = 0, l = 0;
            this.textAtlases.forEach(function(e) {
                var i = e.texture.id, n = A.loopCount - e.texture.lastTouchTm, r = n > 0 ? "" + n + "帧以前" : "当前帧";
                h += e.texture.curUsedCovRate, l += e.texture.curUsedCovRateAtlas, console.log("--图集(id:" + i + ",当前使用率:" + (1e3 * e.texture.curUsedCovRate | 0) + "‰", "当前图集使用率:", (100 * e.texture.curUsedCovRateAtlas | 0) + "%", "图集使用率:", 100 * e.usedRate | 0, "%, 使用于:" + r + ")--:");
                for (var s in e.charMaps) {
                    var a = e.charMaps[s];
                    console.log("     off:", a.orix, a.oriy, " bmp宽高:", a.bmpWidth, a.bmpHeight, "无效:", a.deleted, "touchdt:", A.loopCount - a.touchTick, "位置:", a.uv[0] * t.atlasWidth | 0, a.uv[1] * t.atlasWidth | 0, "字符:", a["char"], "key:", s), 
                    o++;
                }
            }), console.log("独立贴图文字(" + this.isoTextures.length + "个):"), this.isoTextures.forEach(function(t) {
                console.log("    size:", t._texW, t._texH, "touch间隔:", A.loopCount - t.lastTouchTm, "char:", t.ri["char"]);
            }), console.log("总缓存:", o, "总使用率:", h, "总当前图集使用率:", l);
        }, e.showAtlas = function(e, n, r, s, a, o) {
            if (!this.textAtlases[e]) return console.log("没有这个图集"), null;
            var h = new je(), l = this.textAtlases[e].texture, u = {
                width: t.atlasWidth,
                height: t.atlasWidth,
                sourceWidth: t.atlasWidth,
                sourceHeight: t.atlasWidth,
                offsetX: 0,
                offsetY: 0,
                getIsReady: function() {
                    return !0;
                },
                _addReference: function() {},
                _removeReference: function() {},
                _getSource: function() {
                    return l._getSource();
                },
                bitmap: {
                    id: l.id
                },
                _uv: Ie.DEF_UV
            };
            return h.size = function(t, e) {
                return this.width = t, this.height = e, h.graphics.clear(), h.graphics.drawRect(0, 0, h.width, h.height, n), 
                h.graphics.drawTexture(u, 0, 0, h.width, h.height), this;
            }, h.graphics.drawRect(0, 0, a, o, n), h.graphics.drawTexture(u, 0, 0, a, o), h.pos(r, s), 
            i.stage.addChild(h), h;
        }, e.filltext_native = function(t, e, i, n, r, s, a, o, h, l, u) {
            if (void 0 === u && (u = 0), !(e && e.length <= 0 || i && i.length < 1)) {
                var c = fe.Parse(s), _ = 0;
                switch (l) {
                  case "center":
                    _ = ut.ENUM_TEXTALIGN_CENTER;
                    break;

                  case "right":
                    _ = ut.ENUM_TEXTALIGN_RIGHT;
                }
                return this._fast_filltext(t, e, i, n, r, c, a, o, h, _, u);
            }
        }, t.useOldCharBook = !1, t.atlasWidth = 2048, t.noAtlas = !1, t.forceSplitRender = !1, 
        t.forceWholeRender = !1, t.scaleFontWithCtx = !0, t.standardFontSize = 32, t.destroyAtlasDt = 10, 
        t.checkCleanTextureDt = 2e3, t.destroyUnusedTextureDt = 3e3, t.cleanMem = 104857600, 
        t.isWan1Wan = !1, t.showLog = !1, t.debugUV = !1, t.atlasWidth2 = 4194304, t.textRenderInst = null, 
        t.simClean = !1, n(t, [ "tmpRI", function() {
            return this.tmpRI = new dt();
        }, "pixelBBX", function() {
            return this.pixelBBX = [ 0, 0, 0, 0 ];
        }, "imgdtRect", function() {
            return this.imgdtRect = [ 0, 0, 0, 0 ];
        } ]), t;
    }(), A = function() {
        function t() {}
        return r(t, "laya.utils.Stat"), s(1, t, "onclick", null, function(e) {
            t._sp && t._sp.on("click", t._sp, e), t._canvas && (t._canvas.source.onclick = e, 
            t._canvas.source.style.pointerEvents = "");
        }), t.show = function(e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = 0), Dt.onMiniGame || Dt.onLimixiu || Mt.isConchApp || Dt.onBDMiniGame || Dt.onKGMiniGame || Dt.onQGMiniGame || (t._useCanvas = !0), 
            t._show = !0, t._fpsData.length = 60, t._view[0] = {
                title: "FPS(Canvas)",
                value: "_fpsStr",
                color: "yellow",
                units: "int"
            }, t._view[1] = {
                title: "Sprite",
                value: "_spriteStr",
                color: "white",
                units: "int"
            }, t._view[2] = {
                title: "RenderBatches",
                value: "renderBatches",
                color: "white",
                units: "int"
            }, t._view[3] = {
                title: "SavedRenderBatches",
                value: "savedRenderBatches",
                color: "white",
                units: "int"
            }, t._view[4] = {
                title: "CPUMemory",
                value: "cpuMemory",
                color: "yellow",
                units: "M"
            }, t._view[5] = {
                title: "GPUMemory",
                value: "gpuMemory",
                color: "yellow",
                units: "M"
            }, t._view[6] = {
                title: "Shader",
                value: "shaderCall",
                color: "white",
                units: "int"
            }, Mt.is3DMode ? (t._view[0].title = "FPS(3D)", t._view[7] = {
                title: "TriFaces",
                value: "trianglesFaces",
                color: "white",
                units: "int"
            }, t._view[8] = {
                title: "FrustumCulling",
                value: "frustumCulling",
                color: "white",
                units: "int"
            }, t._view[9] = {
                title: "OctreeNodeCulling",
                value: "octreeNodeCulling",
                color: "white",
                units: "int"
            }) : (t._view[0].title = "FPS(WebGL)", t._view[7] = {
                title: "Canvas",
                value: "_canvasStr",
                color: "white",
                units: "int"
            }), t._useCanvas ? t.createUIPre(e, i) : t.createUI(e, i), t.enable();
        }, t.createUIPre = function(e, i) {
            var n = Dt.pixelRatio;
            t._width = 180 * n, t._vx = 120 * n, t._height = n * (12 * t._view.length + 3 * n) + 4, 
            t._fontSize = 12 * n;
            for (var r = 0; r < t._view.length; r++) t._view[r].x = 4, t._view[r].y = r * t._fontSize + 2 * n;
            t._canvas || (t._canvas = new si(!0), t._canvas.size(t._width, t._height), t._ctx = t._canvas.getContext("2d"), 
            t._ctx.textBaseline = "top", t._ctx.font = t._fontSize + "px Arial", t._canvas.source.style.cssText = "pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;direction:ltr;left:" + e + "px;top:" + i + "px;width:" + t._width / n + "px;height:" + t._height / n + "px;"), 
            Dt.onKGMiniGame || Dt.container.appendChild(t._canvas.source), t._first = !0, t.loop(), 
            t._first = !1;
        }, t.createUI = function(e, i) {
            var n = t._sp, r = Dt.pixelRatio;
            n || (n = new je(), t._leftText = new ei(), t._leftText.pos(5, 5), t._leftText.color = "#ffffff", 
            n.addChild(t._leftText), t._txt = new ei(), t._txt.pos(80 * r, 5), t._txt.color = "#ffffff", 
            n.addChild(t._txt), t._sp = n), n.pos(e, i);
            for (var s = "", a = 0; a < t._view.length; a++) {
                var o = t._view[a];
                s += o.title + "\n";
            }
            t._leftText.text = s;
            var h = 138 * r, l = r * (12 * t._view.length + 3 * r) + 4;
            t._txt.fontSize = t._fontSize * r, t._leftText.fontSize = t._fontSize * r, n.size(h, l), 
            n.graphics.clear(), n.graphics.alpha(.5), n.graphics.drawRect(0, 0, h, l, "#999999"), 
            n.graphics.alpha(2), t.loop();
        }, t.enable = function() {
            i.systemTimer.frameLoop(1, t, t.loop);
        }, t.hide = function() {
            t._show = !1, i.systemTimer.clear(t, t.loop), t._canvas && Dt.removeElement(t._canvas.source);
        }, t.clear = function() {
            t.trianglesFaces = t.renderBatches = t.savedRenderBatches = t.shaderCall = t.spriteRenderUseCacheCount = t.frustumCulling = t.octreeNodeCulling = t.canvasNormal = t.canvasBitmap = t.canvasReCache = 0;
        }, t.loop = function() {
            t._count++;
            var e = Dt.now();
            if (!(e - t._timer < 1e3)) {
                var i = t._count;
                if (t.FPS = Math.round(1e3 * i / (e - t._timer)), t._show) {
                    t.trianglesFaces = Math.round(t.trianglesFaces / i), t._useCanvas ? t.renderBatches = Math.round(t.renderBatches / i) : t.renderBatches = Math.round(t.renderBatches / i) - 1, 
                    t.savedRenderBatches = Math.round(t.savedRenderBatches / i), t.shaderCall = Math.round(t.shaderCall / i), 
                    t.spriteRenderUseCacheCount = Math.round(t.spriteRenderUseCacheCount / i), t.canvasNormal = Math.round(t.canvasNormal / i), 
                    t.canvasBitmap = Math.round(t.canvasBitmap / i), t.canvasReCache = Math.ceil(t.canvasReCache / i), 
                    t.frustumCulling = Math.round(t.frustumCulling / i), t.octreeNodeCulling = Math.round(t.octreeNodeCulling / i);
                    var n = t.FPS > 0 ? Math.floor(1e3 / t.FPS).toString() : " ";
                    t._fpsStr = t.FPS + (t.renderSlow ? " slow" : "") + " " + n, t._useCanvas ? t._spriteStr = t.spriteCount - 1 + (t.spriteRenderUseCacheCount ? "/" + t.spriteRenderUseCacheCount : "") : t._spriteStr = t.spriteCount - 4 + (t.spriteRenderUseCacheCount ? "/" + t.spriteRenderUseCacheCount : ""), 
                    t._canvasStr = t.canvasReCache + "/" + t.canvasNormal + "/" + t.canvasBitmap, t.cpuMemory = Ee.cpuMemory, 
                    t.gpuMemory = Ee.gpuMemory, t._useCanvas ? t.renderInfoPre() : t.renderInfo(), t.clear();
                }
                t._count = 0, t._timer = e;
            }
        }, t.renderInfoPre = function() {
            var e, i, n = 0;
            if (t._canvas) {
                var r = t._ctx;
                for (r.clearRect(t._first ? 0 : t._vx, 0, t._width, t._height), n = 0; n < t._view.length; n++) e = t._view[n], 
                t._first && (r.fillStyle = "white", r.fillText(e.title, e.x, e.y)), r.fillStyle = e.color, 
                i = t[e.value], "M" == e.units && (i = Math.floor(i / 1048576 * 100) / 100 + " M"), 
                r.fillText(i + "", e.x + t._vx, e.y);
            }
        }, t.renderInfo = function() {
            for (var e = "", i = 0; i < t._view.length; i++) {
                var n = t._view[i], r = t[n.value];
                "M" == n.units && (r = Math.floor(r / 1048576 * 100) / 100 + " M"), "K" == n.units && (r = Math.floor(r / 1024 * 100) / 100 + " K"), 
                e += r + "\n";
            }
            t._txt.text = e;
        }, t.FPS = 0, t.loopCount = 0, t.shaderCall = 0, t.renderBatches = 0, t.savedRenderBatches = 0, 
        t.trianglesFaces = 0, t.spriteCount = 0, t.spriteRenderUseCacheCount = 0, t.frustumCulling = 0, 
        t.octreeNodeCulling = 0, t.canvasNormal = 0, t.canvasBitmap = 0, t.canvasReCache = 0, 
        t.renderSlow = !1, t.gpuMemory = 0, t.cpuMemory = 0, t._fpsStr = null, t._canvasStr = null, 
        t._spriteStr = null, t._fpsData = [], t._timer = 0, t._count = 0, t._view = [], 
        t._fontSize = 12, t._txt = null, t._leftText = null, t._sp = null, t._titleSp = null, 
        t._bgSp = null, t._show = !1, t._useCanvas = !1, t._canvas = null, t._ctx = null, 
        t._first = !1, t._vx = NaN, t._width = 0, t._height = 100, t;
    }(), E = function() {
        function t() {
            this._lastOriX = 0, this._lastOriY = 0, this.paths = [], this._curPath = null;
        }
        var e;
        r(t, "laya.webgl.canvas.Path");
        var i = t.prototype;
        return i.beginPath = function(t) {
            this.paths.length = 1, this._curPath = this.paths[0] = new e(), this._curPath.convex = t;
        }, i.closePath = function() {
            this._curPath.loop = !0;
        }, i.newPath = function() {
            this._curPath = new e(), this.paths.push(this._curPath);
        }, i.addPoint = function(t, e) {
            this._curPath.path.push(t, e);
        }, i.push = function(t, i) {
            this._curPath ? this._curPath.path.length > 0 && (this._curPath = new e(), this.paths.push(this._curPath)) : (this._curPath = new e(), 
            this.paths.push(this._curPath));
            var n = this._curPath;
            n.path = t.slice(), n.convex = i;
        }, i.reset = function() {
            this.paths.length = 0;
        }, t.__init$ = function() {
            e = function() {
                function t() {
                    this.path = [], this.loop = !1, this.convex = !1;
                }
                return r(t, ""), t;
            }();
        }, t;
    }(), S = function() {
        function t() {
            this.mouseX = 0, this.mouseY = 0, this.disableMouseEvent = !1, this.mouseDownTime = 0, 
            this.mouseMoveAccuracy = 2, this._stage = null, this._captureSp = null, this._captureExlusiveMode = !1, 
            this._hitCaputreSp = !1, this._target = null, this._lastMoveTimer = 0, this._isLeftMouse = !1, 
            this._touchIDs = {}, this._id = 1, this._tTouchID = 0, this._event = new w(), this._captureChain = [], 
            this._matrix = new st(), this._point = new Yt(), this._rect = new mt(), this._prePoint = new Yt(), 
            this._curTouchID = NaN;
        }
        r(t, "laya.events.MouseManager");
        var e = t.prototype;
        return e.__init__ = function(e, i) {
            var n = this;
            this._stage = e;
            var r = this;
            i.oncontextmenu = function(e) {
                return t.enabled ? !1 : void 0;
            }, i.addEventListener("mousedown", function(e) {
                t.enabled && (Dt.onIE || e.preventDefault(), r.mouseDownTime = Dt.now(), n.runEvent(e));
            }), i.addEventListener("mouseup", function(e) {
                t.enabled && (e.preventDefault(), r.mouseDownTime = -Dt.now(), n.runEvent(e));
            }, !0), i.addEventListener("mousemove", function(e) {
                if (t.enabled) {
                    e.preventDefault();
                    var i = Dt.now();
                    if (i - r._lastMoveTimer < 10) return;
                    r._lastMoveTimer = i, n.runEvent(e);
                }
            }, !0), i.addEventListener("mouseout", function(e) {
                t.enabled && n.runEvent(e);
            }), i.addEventListener("mouseover", function(e) {
                t.enabled && n.runEvent(e);
            }), i.addEventListener("touchstart", function(e) {
                t.enabled && (t._isFirstTouch || li.isInputting || e.preventDefault(), r.mouseDownTime = Dt.now(), 
                n.runEvent(e));
            }), i.addEventListener("touchend", function(e) {
                t.enabled ? (t._isFirstTouch || li.isInputting || e.preventDefault(), t._isFirstTouch = !1, 
                r.mouseDownTime = -Dt.now(), n.runEvent(e)) : n._curTouchID = NaN;
            }, !0), i.addEventListener("touchmove", function(e) {
                t.enabled && (e.preventDefault(), n.runEvent(e));
            }, !0), i.addEventListener("touchcancel", function(e) {
                t.enabled ? (e.preventDefault(), n.runEvent(e)) : n._curTouchID = NaN;
            }, !0), i.addEventListener("mousewheel", function(e) {
                t.enabled && n.runEvent(e);
            }), i.addEventListener("DOMMouseScroll", function(e) {
                t.enabled && n.runEvent(e);
            });
        }, e.initEvent = function(t, e) {
            var i = this;
            i._event._stoped = !1, i._event.nativeEvent = e || t, i._target = null, this._point.setTo(t.pageX || t.clientX, t.pageY || t.clientY), 
            this._stage._canvasTransform && (this._stage._canvasTransform.invertTransformPoint(this._point), 
            i.mouseX = this._point.x, i.mouseY = this._point.y), i._event.touchId = t.identifier || 0, 
            this._tTouchID = i._event.touchId;
            var n;
            n = _.I._event, n._stoped = !1, n.nativeEvent = i._event.nativeEvent, n.touchId = i._event.touchId;
        }, e.checkMouseWheel = function(t) {
            this._event.delta = t.wheelDelta ? .025 * t.wheelDelta : -t.detail;
            for (var e = _.I.getLastOvers(), i = 0, n = e.length; n > i; i++) {
                var r = e[i];
                r.event("mousewheel", this._event.setTo("mousewheel", r, this._target));
            }
        }, e.onMouseMove = function(t) {
            _.I.onMouseMove(t, this._tTouchID);
        }, e.onMouseDown = function(t) {
            if (li.isInputting && i.stage.focus && i.stage.focus.focus && !i.stage.focus.contains(this._target)) {
                var e = i.stage.focus._tf || i.stage.focus, n = t._tf || t;
                n instanceof laya.display.Input && n.multiline == e.multiline ? e._focusOut() : e.focus = !1;
            }
            _.I.onMouseDown(t, this._tTouchID, this._isLeftMouse);
        }, e.onMouseUp = function(t) {
            _.I.onMouseUp(t, this._tTouchID, this._isLeftMouse);
        }, e.check = function(t, e, i, n) {
            this._point.setTo(e, i), t.fromParentPoint(this._point), e = this._point.x, i = this._point.y;
            var r = t._style.scrollRect;
            if (r && (this._rect.setTo(r.x, r.y, r.width, r.height), !this._rect.contains(e, i))) return !1;
            if (!this.disableMouseEvent) {
                if (t.hitTestPrior && !t.mouseThrough && !this.hitTest(t, e, i)) return !1;
                for (var s = t._children.length - 1; s > -1; s--) {
                    var a = t._children[s];
                    if (!a.destroyed && a._mouseState > 1 && a._visible && this.check(a, e, i, n)) return !0;
                }
                for (s = t._extUIChild.length - 1; s >= 0; s--) {
                    var o = t._extUIChild[s];
                    if (!o.destroyed && o._mouseState > 1 && o._visible && this.check(o, e, i, n)) return !0;
                }
            }
            var h = !t.hitTestPrior || t.mouseThrough || this.disableMouseEvent ? this.hitTest(t, e, i) : !0;
            return h ? (this._target = t, n.call(this, t), this._target == this._hitCaputreSp && (this._hitCaputreSp = !0)) : n === this.onMouseUp && t === this._stage && (this._target = this._stage, 
            n.call(this, this._target)), h;
        }, e.hitTest = function(t, e, i) {
            var n = !1;
            t.scrollRect && (e -= t._style.scrollRect.x, i -= t._style.scrollRect.y);
            var r = t._style.hitArea;
            return r && r._hit ? r.contains(e, i) : ((t.width > 0 && t.height > 0 || t.mouseThrough || r) && (n = t.mouseThrough ? t.getGraphicBounds().contains(e, i) : (r ? r : this._rect.setTo(0, 0, t.width, t.height)).contains(e, i)), 
            n);
        }, e._checkAllBaseUI = function(t, e, i) {
            var n = this.handleExclusiveCapture(this.mouseX, this.mouseY, i);
            return n ? !0 : (n = this.check(this._stage, this.mouseX, this.mouseY, i), this.handleCapture(this.mouseX, this.mouseY, i) || n);
        }, e.check3DUI = function(t, e, i) {
            for (var n = this._stage._3dUI, r = 0, s = !1; r < n.length; r++) {
                var a = n[r];
                this._stage._curUIBase = a, !a.destroyed && a._mouseState > 1 && a._visible && (s = s || this.check(a, this.mouseX, this.mouseY, i));
            }
            return this._stage._curUIBase = this._stage, s;
        }, e.handleExclusiveCapture = function(t, e, i) {
            if (this._captureExlusiveMode && this._captureSp && this._captureChain.length > 0) {
                var n;
                this._point.setTo(t, e);
                for (var r = 0; r < this._captureChain.length; r++) n = this._captureChain[r], n.fromParentPoint(this._point);
                return this._target = n, i.call(this, n), !0;
            }
            return !1;
        }, e.handleCapture = function(t, e, i) {
            if (!this._hitCaputreSp && this._captureSp && this._captureChain.length > 0) {
                var n;
                this._point.setTo(t, e);
                for (var r = 0; r < this._captureChain.length; r++) n = this._captureChain[r], n.fromParentPoint(this._point);
                return this._target = n, i.call(this, n), !0;
            }
            return !1;
        }, e.runEvent = function(e) {
            var i, n = 0, r = 0;
            switch ("mousemove" !== e.type && (this._prePoint.x = this._prePoint.y = -1e6), 
            e.type) {
              case "mousedown":
                this._touchIDs[0] = this._id++, t._isTouchRespond ? t._isTouchRespond = !1 : (this._isLeftMouse = 0 === e.button, 
                this.initEvent(e), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseDown));
                break;

              case "mouseup":
                this._isLeftMouse = 0 === e.button, this.initEvent(e), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseUp);
                break;

              case "mousemove":
                Math.abs(this._prePoint.x - e.clientX) + Math.abs(this._prePoint.y - e.clientY) >= this.mouseMoveAccuracy && (this._prePoint.x = e.clientX, 
                this._prePoint.y = e.clientY, this.initEvent(e), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseMove));
                break;

              case "touchstart":
                t._isTouchRespond = !0, this._isLeftMouse = !0;
                var s = e.changedTouches;
                for (n = 0, r = s.length; r > n; n++) i = s[n], (t.multiTouchEnabled || isNaN(this._curTouchID)) && (this._curTouchID = i.identifier, 
                this._id % 200 === 0 && (this._touchIDs = {}), this._touchIDs[i.identifier] = this._id++, 
                this.initEvent(i, e), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseDown));
                break;

              case "touchend":
              case "touchcancel":
                t._isTouchRespond = !0, this._isLeftMouse = !0;
                var a = e.changedTouches;
                for (n = 0, r = a.length; r > n; n++) if (i = a[n], t.multiTouchEnabled || i.identifier == this._curTouchID) {
                    this._curTouchID = NaN, this.initEvent(i, e);
                    var o = !1;
                    o = this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseUp), o || this.onMouseUp(null);
                }
                break;

              case "touchmove":
                var h = e.changedTouches;
                for (n = 0, r = h.length; r > n; n++) i = h[n], (t.multiTouchEnabled || i.identifier == this._curTouchID) && (this.initEvent(i, e), 
                this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseMove));
                break;

              case "wheel":
              case "mousewheel":
              case "DOMMouseScroll":
                this.checkMouseWheel(e);
                break;

              case "mouseout":
                _.I.stageMouseOut();
                break;

              case "mouseover":
                this._stage.event("mouseover", this._event.setTo("mouseover", this._stage, this._stage));
            }
        }, e.setCapture = function(t, e) {
            void 0 === e && (e = !1), this._captureSp = t, this._captureExlusiveMode = e, this._captureChain.length = 0, 
            this._captureChain.push(t);
            for (var n = t; ;) {
                if (n == i.stage) break;
                if (n == i.stage._curUIBase) break;
                if (n = n.parent, !n) break;
                this._captureChain.splice(0, 0, n);
            }
        }, e.releaseCapture = function() {
            console.log("release capture"), this._captureSp = null;
        }, t.enabled = !0, t.multiTouchEnabled = !0, t._isTouchRespond = !1, t._isFirstTouch = !0, 
        n(t, [ "instance", function() {
            return this.instance = new t();
        } ]), t;
    }(), M = function() {
        function t() {
            this.useDic = {}, this.shapeDic = {}, this.shapeLineDic = {}, this._id = 0, this._checkKey = !1, 
            this._freeIdArray = [], Q.regCacheByFunction(ie.bind(this.startDispose, this), ie.bind(this.getCacheList, this));
        }
        r(t, "laya.utils.VectorGraphManager");
        var e = t.prototype;
        return e.getId = function() {
            return this._id++;
        }, e.addShape = function(t, e) {
            this.shapeDic[t] = e, this.useDic[t] || (this.useDic[t] = !0);
        }, e.addLine = function(t, e) {
            this.shapeLineDic[t] = e, this.shapeLineDic[t] || (this.shapeLineDic[t] = !0);
        }, e.getShape = function(t) {
            this._checkKey && null != this.useDic[t] && (this.useDic[t] = !0);
        }, e.deleteShape = function(t) {
            this.shapeDic[t] && (this.shapeDic[t] = null, delete this.shapeDic[t]), this.shapeLineDic[t] && (this.shapeLineDic[t] = null, 
            delete this.shapeLineDic[t]), null != this.useDic[t] && delete this.useDic[t];
        }, e.getCacheList = function() {
            var t, e = [];
            for (t in this.shapeDic) e.push(this.shapeDic[t]);
            for (t in this.shapeLineDic) e.push(this.shapeLineDic[t]);
            return e;
        }, e.startDispose = function(t) {
            var e;
            for (e in this.useDic) this.useDic[e] = !1;
            this._checkKey = !0;
        }, e.endDispose = function() {
            if (this._checkKey) {
                var t;
                for (t in this.useDic) this.useDic[t] || this.deleteShape(t);
                this._checkKey = !1;
            }
        }, t.getInstance = function() {
            return t.instance = t.instance || new t();
        }, t.instance = null, t;
    }(), R = function() {
        function t() {}
        return r(t, "laya.maths.MathUtil"), t.subtractVector3 = function(t, e, i) {
            i[0] = t[0] - e[0], i[1] = t[1] - e[1], i[2] = t[2] - e[2];
        }, t.lerp = function(t, e, i) {
            return t * (1 - i) + e * i;
        }, t.scaleVector3 = function(t, e, i) {
            i[0] = t[0] * e, i[1] = t[1] * e, i[2] = t[2] * e;
        }, t.lerpVector3 = function(t, e, i, n) {
            var r = t[0], s = t[1], a = t[2];
            n[0] = r + i * (e[0] - r), n[1] = s + i * (e[1] - s), n[2] = a + i * (e[2] - a);
        }, t.lerpVector4 = function(t, e, i, n) {
            var r = t[0], s = t[1], a = t[2], o = t[3];
            n[0] = r + i * (e[0] - r), n[1] = s + i * (e[1] - s), n[2] = a + i * (e[2] - a), 
            n[3] = o + i * (e[3] - o);
        }, t.slerpQuaternionArray = function(t, e, i, n, r, s, a) {
            var o, h, l, u, c, _ = t[e + 0], d = t[e + 1], f = t[e + 2], p = t[e + 3], m = i[n + 0], g = i[n + 1], v = i[n + 2], y = i[n + 3];
            return h = _ * m + d * g + f * v + p * y, 0 > h && (h = -h, m = -m, g = -g, v = -v, 
            y = -y), 1 - h > 1e-6 ? (o = Math.acos(h), l = Math.sin(o), u = Math.sin((1 - r) * o) / l, 
            c = Math.sin(r * o) / l) : (u = 1 - r, c = r), s[a + 0] = u * _ + c * m, s[a + 1] = u * d + c * g, 
            s[a + 2] = u * f + c * v, s[a + 3] = u * p + c * y, s;
        }, t.getRotation = function(t, e, i, n) {
            return Math.atan2(n - e, i - t) / Math.PI * 180;
        }, t.sortBigFirst = function(t, e) {
            return t == e ? 0 : e > t ? 1 : -1;
        }, t.sortSmallFirst = function(t, e) {
            return t == e ? 0 : e > t ? -1 : 1;
        }, t.sortNumBigFirst = function(t, e) {
            return parseFloat(e) - parseFloat(t);
        }, t.sortNumSmallFirst = function(t, e) {
            return parseFloat(t) - parseFloat(e);
        }, t.sortByKey = function(e, i, n) {
            void 0 === i && (i = !1), void 0 === n && (n = !0);
            var r;
            return r = i ? n ? t.sortNumBigFirst : t.sortBigFirst : n ? t.sortNumSmallFirst : t.sortSmallFirst, 
            function(t, i) {
                return r(t[e], i[e]);
            };
        }, t;
    }(), I = function() {
        function t(e, i) {
            if (a.map[e]) return this._fun = a.map[e], void (this._next = t.NORENDER);
            switch (this._next = i || t.NORENDER, e) {
              case 0:
                return void (this._fun = this._no);

              case 1:
                return void (this._fun = this._alpha);

              case 2:
                return void (this._fun = this._transform);

              case 4:
                return void (this._fun = this._blend);

              case 8:
                return void (this._fun = this._canvas);

              case 32:
                return void (this._fun = this._mask);

              case 64:
                return void (this._fun = this._clip);

              case 128:
                return void (this._fun = this._style);

              case 512:
                return void (this._fun = this._graphics);

              case 8192:
                return void (this._fun = this._children);

              case 2048:
                return void (this._fun = this._custom);

              case 256:
                return void (this._fun = this._texture);

              case 16:
                return void (this._fun = c._filter);

              case 69905:
                return void (this._fun = t._initRenderFun);
            }
            this.onCreate(e);
        }
        r(t, "laya.renders.RenderSprite");
        var e = t.prototype;
        return e.onCreate = function(t) {}, e._style = function(t, e, i, n) {
            var r = t._style;
            null != r.render && r.render(t, e, i, n);
            var s = this._next;
            s._fun.call(s, t, e, i, n);
        }, e._no = function(t, e, i, n) {}, e._custom = function(t, e, i, n) {
            t.customRender(e, i, n), this._next._fun.call(this._next, t, e, i - t.pivotX, n - t.pivotY);
        }, e._clip = function(e, i, n, r) {
            var s = this._next;
            if (s != t.NORENDER) {
                var a = e._style.scrollRect;
                i.save(), i.clipRect(n, r, a.width, a.height), s._fun.call(s, e, i, n - a.x, r - a.y), 
                i.restore();
            }
        }, e._texture = function(e, i, n, r) {
            var s = e.texture;
            s._getSource() && i.drawTexture(s, n - e.pivotX + s.offsetX, r - e.pivotY + s.offsetY, e._width || s.width, e._height || s.height);
            var a = this._next;
            a != t.NORENDER && a._fun.call(a, e, i, n, r);
        }, e._graphics = function(e, i, n, r) {
            var s = e._style, a = e._graphics;
            a && a._render(e, i, n - s.pivotX, r - s.pivotY);
            var o = this._next;
            o != t.NORENDER && o._fun.call(o, e, i, n, r);
        }, e._image = function(t, e, i, n) {
            var r = t._style;
            e.drawTexture2(i, n, r.pivotX, r.pivotY, t.transform, t._graphics._one);
        }, e._image2 = function(t, e, i, n) {
            var r = t._style;
            e.drawTexture2(i, n, r.pivotX, r.pivotY, t.transform, t._graphics._one);
        }, e._alpha = function(t, e, i, n) {
            var r, s = t._style;
            if ((r = s.alpha) > .01 || t._needRepaint()) {
                var a = e.globalAlpha;
                e.globalAlpha *= r;
                var o = this._next;
                o._fun.call(o, t, e, i, n), e.globalAlpha = a;
            }
        }, e._transform = function(e, i, n, r) {
            var s = e.transform, a = this._next;
            e._style;
            s && a != t.NORENDER ? (i.save(), i.transform(s.a, s.b, s.c, s.d, s.tx + n, s.ty + r), 
            a._fun.call(a, e, i, 0, 0), i.restore()) : a != t.NORENDER && a._fun.call(a, e, i, n, r);
        }, e._children = function(t, e, i, n) {
            var r, s = t._style, a = t._children, o = a.length;
            i -= t.pivotX, n -= t.pivotY;
            var h = t._getBit(256) && e.drawCallOptimize(!0);
            if (s.viewport) {
                var l = s.viewport, u = l.x, c = l.y, _ = l.right, d = l.bottom, f = NaN, p = NaN;
                for (m = 0; o > m; ++m) (r = a[m])._visible && (f = r._x) < _ && f + r.width > u && (p = r._y) < d && p + r.height > c && r.render(e, i, n);
            } else for (var m = 0; o > m; ++m) (r = a[m])._visible && r.render(e, i, n);
            h && e.drawCallOptimize(!1);
        }, e._canvas = function(t, e, n, r) {
            var s = t._cacheStyle, a = this._next;
            if (!s.enableCanvasRender) return void a._fun.call(a, t, e, n, r);
            "bitmap" === s.cacheAs ? A.canvasBitmap++ : A.canvasNormal++;
            var o = !1, h = !1;
            if (s.canvas) {
                var l = s.canvas, u = (l.context, l.touches);
                if (u) for (var c = 0; c < u.length; c++) if (u[c].deleted) {
                    h = !0;
                    break;
                }
                o = l.isCacheValid && !l.isCacheValid();
            }
            if (t._needRepaint() || !s.canvas || h || o || i.stage.isGlobalRepaint()) if ("normal" === s.cacheAs) {
                if (e._targets) return void a._fun.call(a, t, e, n, r);
                this._canvas_webgl_normal_repaint(t, e);
            } else this._canvas_repaint(t, e, n, r);
            var _ = s.cacheRect;
            e.drawCanvas(s.canvas, n + _.x, r + _.y, _.width, _.height);
        }, e._canvas_repaint = function(t, e, i, n) {
            var r, s, a, o, h, l, u, c, _, d = t._cacheStyle, f = this._next, p = d.canvas, m = d.cacheAs;
            if (_ = d._calculateCacheRect(t, m, i, n), u = _.x, c = _.y, o = d.cacheRect, h = o.width * u, 
            l = o.height * c, s = o.x, a = o.y, "bitmap" === m && (h > 2048 || l > 2048)) return console.warn("cache bitmap size larger than 2048,cache ignored"), 
            d.releaseContext(), void f._fun.call(f, t, e, i, n);
            if (p || (d.createContext(), p = d.canvas), r = p.context, r.sprite = t, (p.width != h || p.height != l) && p.size(h, l), 
            "bitmap" === m ? r.asBitmap = !0 : "normal" === m && (r.asBitmap = !1), r.clear(), 
            1 != u || 1 != c) {
                var g = r;
                g.save(), g.scale(u, c), f._fun.call(f, t, r, -s, -a), g.restore(), t._applyFilters();
            } else g = r, f._fun.call(f, t, r, -s, -a), t._applyFilters();
            d.staticCache && (d.reCache = !1), A.canvasReCache++;
        }, e._canvas_webgl_normal_repaint = function(t, e) {
            var n = t._cacheStyle, r = this._next, s = n.canvas, a = n.cacheAs;
            n._calculateCacheRect(t, a, 0, 0);
            s || (s = n.canvas = new i.WebGLCacheAsNormalCanvas(e, t));
            var o = s.context;
            s.startRec(), r._fun.call(r, t, o, t.pivotX, t.pivotY), t._applyFilters(), A.canvasReCache++, 
            s.endRec();
        }, e._blend = function(t, e, i, n) {
            var r = t._style, s = this._next;
            r.blendMode ? (e.save(), e.globalCompositeOperation = r.blendMode, s._fun.call(s, t, e, i, n), 
            e.restore()) : s._fun.call(s, t, e, i, n);
        }, e._mask = function(e, i, n, r) {
            var s = this._next, a = e.mask, o = i;
            if (a) {
                o.save();
                var h = o.globalCompositeOperation, l = new mt();
                if (l.copyFrom(a.getBounds()), l.width = Math.round(l.width), l.height = Math.round(l.height), 
                l.x = Math.round(l.x), l.y = Math.round(l.y), l.width > 0 && l.height > 0) {
                    var u = l.width, c = l.height, _ = ee.getRT(u, c);
                    o.breakNextMerge(), o.pushRT(), o.addRenderObject($.create([ o, _, u, c ], t.tmpTarget, this)), 
                    a.render(o, -l.x, -l.y), o.breakNextMerge(), o.popRT(), o.save(), o.clipRect(n + l.x - e.getStyle().pivotX, r + l.y - e.getStyle().pivotY, u, c), 
                    s._fun.call(s, e, o, n, r), o.restore(), h = o.globalCompositeOperation, o.addRenderObject($.create([ "mask" ], t.setBlendMode, this));
                    var d = X.create(1, 0), f = Ie.INV_UV;
                    o.drawTarget(_, n + l.x - e.getStyle().pivotX, r + l.y - e.getStyle().pivotY, u, c, st.TEMP.identity(), d, f, 6), 
                    o.addRenderObject($.create([ _ ], t.recycleTarget, this)), o.addRenderObject($.create([ h ], t.setBlendMode, this));
                }
                o.restore();
            } else s._fun.call(s, e, i, n, r);
        }, t.__init__ = function() {
            a.__init__();
            var e, i = 0, n = 0;
            for (e = new t(69905, null), n = t.renders.length = 16384, i = 0; n > i; i++) t.renders[i] = e;
            t.renders[0] = new t(0, null);
        }, t._initRenderFun = function(e, i, n, r) {
            var s = e._renderType, a = t.renders[s] = t._getTypeRender(s);
            a._fun(e, i, n, r);
        }, t._getTypeRender = function(e) {
            if (a.map[e]) return new t(e, null);
            for (var i = null, n = 8192; n > 0; ) n & e && (i = new t(n, i)), n >>= 1;
            return i;
        }, t.tmpTarget = function(t, e, i, n) {
            e.start(), e.clear(0, 0, 0, 0);
        }, t.recycleTarget = function(t) {
            ee.releaseRT(t);
        }, t.setBlendMode = function(t) {
            var e = wt.mainContext;
            _e.targetFns[_e.TOINT[t]](e);
        }, t.INIT = 69905, t.renders = [], t.NORENDER = new t(0, null), n(t, [ "tempUV", function() {
            return this.tempUV = new Array(8);
        } ]), t;
    }(), P = (function() {
        function t() {}
        return r(t, "laya.events.Keyboard"), t.NUMBER_0 = 48, t.NUMBER_1 = 49, t.NUMBER_2 = 50, 
        t.NUMBER_3 = 51, t.NUMBER_4 = 52, t.NUMBER_5 = 53, t.NUMBER_6 = 54, t.NUMBER_7 = 55, 
        t.NUMBER_8 = 56, t.NUMBER_9 = 57, t.A = 65, t.B = 66, t.C = 67, t.D = 68, t.E = 69, 
        t.F = 70, t.G = 71, t.H = 72, t.I = 73, t.J = 74, t.K = 75, t.L = 76, t.M = 77, 
        t.N = 78, t.O = 79, t.P = 80, t.Q = 81, t.R = 82, t.S = 83, t.T = 84, t.U = 85, 
        t.V = 86, t.W = 87, t.X = 88, t.Y = 89, t.Z = 90, t.F1 = 112, t.F2 = 113, t.F3 = 114, 
        t.F4 = 115, t.F5 = 116, t.F6 = 117, t.F7 = 118, t.F8 = 119, t.F9 = 120, t.F10 = 121, 
        t.F11 = 122, t.F12 = 123, t.F13 = 124, t.F14 = 125, t.F15 = 126, t.NUMPAD = 21, 
        t.NUMPAD_0 = 96, t.NUMPAD_1 = 97, t.NUMPAD_2 = 98, t.NUMPAD_3 = 99, t.NUMPAD_4 = 100, 
        t.NUMPAD_5 = 101, t.NUMPAD_6 = 102, t.NUMPAD_7 = 103, t.NUMPAD_8 = 104, t.NUMPAD_9 = 105, 
        t.NUMPAD_ADD = 107, t.NUMPAD_DECIMAL = 110, t.NUMPAD_DIVIDE = 111, t.NUMPAD_ENTER = 108, 
        t.NUMPAD_MULTIPLY = 106, t.NUMPAD_SUBTRACT = 109, t.SEMICOLON = 186, t.EQUAL = 187, 
        t.COMMA = 188, t.MINUS = 189, t.PERIOD = 190, t.SLASH = 191, t.BACKQUOTE = 192, 
        t.LEFTBRACKET = 219, t.BACKSLASH = 220, t.RIGHTBRACKET = 221, t.QUOTE = 222, t.ALTERNATE = 18, 
        t.BACKSPACE = 8, t.CAPS_LOCK = 20, t.COMMAND = 15, t.CONTROL = 17, t.DELETE = 46, 
        t.ENTER = 13, t.ESCAPE = 27, t.PAGE_UP = 33, t.PAGE_DOWN = 34, t.END = 35, t.HOME = 36, 
        t.LEFT = 37, t.UP = 38, t.RIGHT = 39, t.DOWN = 40, t.SHIFT = 16, t.SPACE = 32, t.TAB = 9, 
        t.INSERT = 45, t;
    }(), function() {
        function t() {}
        r(t, "laya.display.cmd.RestoreCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("RestoreCmd", this);
        }, e.run = function(t, e, i) {
            t.restore();
        }, s(0, e, "cmdID", function() {
            return "Restore";
        }), t.create = function() {
            var e = U.getItemByClass("RestoreCmd", t);
            return e;
        }, t.ID = "Restore", t;
    }()), D = function() {
        function t(t, e, i) {
            this._value = 0, this._name2int = t, this._int2name = e, this._int2nameMap = i;
        }
        r(t, "laya.webgl.shader.ShaderDefinesBase");
        var e = t.prototype;
        return e.add = function(t) {
            return "string" == typeof t && (t = this._name2int[t]), this._value |= t, this._value;
        }, e.addInt = function(t) {
            return this._value |= t, this._value;
        }, e.remove = function(t) {
            return "string" == typeof t && (t = this._name2int[t]), this._value &= ~t, this._value;
        }, e.isDefine = function(t) {
            return (this._value & t) === t;
        }, e.getValue = function() {
            return this._value;
        }, e.setValue = function(t) {
            this._value = t;
        }, e.toNameDic = function() {
            var e = this._int2nameMap[this._value];
            return e ? e : t._toText(this._value, this._int2name, this._int2nameMap);
        }, t._reg = function(t, e, i, n) {
            i[t] = e, n[e] = t;
        }, t._toText = function(t, e, i) {
            var n = i[t];
            if (n) return n;
            for (var r = {}, s = 1, a = 0; 32 > a && (s = 1 << a, !(s > t)); a++) if (t & s) {
                var o = e[s];
                o && (r[o] = "");
            }
            return i[t] = r, r;
        }, t._toInt = function(t, e) {
            for (var i = t.split("."), n = 0, r = 0, s = i.length; s > r; r++) {
                var a = e[i[r]];
                if (!a) throw new Error("Defines to int err:" + t + "/" + i[r]);
                n |= a;
            }
            return n;
        }, t;
    }(), L = function() {
        function t() {
            this._texture = null, this._fontCharDic = {}, this._fontWidthMap = {}, this._complete = null, 
            this._path = null, this._maxWidth = 0, this._spaceWidth = 10, this._padding = null, 
            this.fontSize = 12, this.autoScaleSize = !1, this.letterSpacing = 0;
        }
        r(t, "laya.display.BitmapFont");
        var e = t.prototype;
        return e.loadFont = function(t, e) {
            return this._path = t, this._complete = e, t && -1 !== t.indexOf(".fnt") ? void i.loader.load([ {
                url: t,
                type: "xml"
            }, {
                url: t.replace(".fnt", ".png"),
                type: "image"
            } ], g.create(this, this._onLoaded)) : void console.error('Bitmap font configuration information must be a ".fnt" file');
        }, e._onLoaded = function() {
            this.parseFont(De.getRes(this._path), De.getRes(this._path.replace(".fnt", ".png"))), 
            this._complete && this._complete.run();
        }, e.parseFont = function(t, e) {
            if (null != t && null != e) {
                this._texture = e;
                var i = 1, n = t.getElementsByTagName("info");
                if (!n[0].getAttributeNode) return this.parseFont2(t, e);
                this.fontSize = parseInt(n[0].getAttributeNode("size").nodeValue);
                var r = n[0].getAttributeNode("padding").nodeValue, s = r.split(",");
                this._padding = [ parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3]) ];
                var a;
                a = t.getElementsByTagName("char");
                var o = 0;
                for (o = 0; o < a.length; o++) {
                    var h = a[o], l = parseInt(h.getAttributeNode("id").nodeValue), u = parseInt(h.getAttributeNode("xoffset").nodeValue) / i, c = parseInt(h.getAttributeNode("yoffset").nodeValue) / i, _ = parseInt(h.getAttributeNode("xadvance").nodeValue) / i, d = new mt();
                    d.x = parseInt(h.getAttributeNode("x").nodeValue), d.y = parseInt(h.getAttributeNode("y").nodeValue), 
                    d.width = parseInt(h.getAttributeNode("width").nodeValue), d.height = parseInt(h.getAttributeNode("height").nodeValue);
                    var f = Ie.create(e, d.x, d.y, d.width, d.height, u, c);
                    this._maxWidth = Math.max(this._maxWidth, _ + this.letterSpacing), this._fontCharDic[l] = f, 
                    this._fontWidthMap[l] = _;
                }
            }
        }, e.parseFont2 = function(t, e) {
            if (null != t && null != e) {
                this._texture = e;
                var i = 1, n = t.getElementsByTagName("info");
                this.fontSize = parseInt(n[0].attributes.size.nodeValue);
                var r = n[0].attributes.padding.nodeValue, s = r.split(",");
                this._padding = [ parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3]) ];
                var a = t.getElementsByTagName("char"), o = 0;
                for (o = 0; o < a.length; o++) {
                    var h = a[o].attributes, l = parseInt(h.id.nodeValue), u = parseInt(h.xoffset.nodeValue) / i, c = parseInt(h.yoffset.nodeValue) / i, _ = parseInt(h.xadvance.nodeValue) / i, d = new mt();
                    d.x = parseInt(h.x.nodeValue), d.y = parseInt(h.y.nodeValue), d.width = parseInt(h.width.nodeValue), 
                    d.height = parseInt(h.height.nodeValue);
                    var f = Ie.create(e, d.x, d.y, d.width, d.height, u, c);
                    this._maxWidth = Math.max(this._maxWidth, _ + this.letterSpacing), this._fontCharDic[l] = f, 
                    this._fontWidthMap[l] = _;
                }
            }
        }, e.getCharTexture = function(t) {
            return this._fontCharDic[t.charCodeAt(0)];
        }, e.destroy = function() {
            if (this._texture) {
                for (var t in this._fontCharDic) {
                    var e = this._fontCharDic[t];
                    e && e.destroy();
                }
                this._texture.destroy(), this._fontCharDic = null, this._fontWidthMap = null, this._texture = null, 
                this._complete = null, this._padding = null;
            }
        }, e.setSpaceWidth = function(t) {
            this._spaceWidth = t;
        }, e.getCharWidth = function(t) {
            var e = t.charCodeAt(0);
            return this._fontWidthMap[e] ? this._fontWidthMap[e] + this.letterSpacing : " " === t ? this._spaceWidth + this.letterSpacing : 0;
        }, e.getTextWidth = function(t) {
            for (var e = 0, i = 0, n = t.length; n > i; i++) e += this.getCharWidth(t.charAt(i));
            return e;
        }, e.getMaxWidth = function() {
            return this._maxWidth;
        }, e.getMaxHeight = function() {
            return this.fontSize;
        }, e._drawText = function(t, e, i, n, r, s) {
            var a, o = this.getTextWidth(t), h = 0;
            "center" === r && (h = (s - o) / 2), "right" === r && (h = s - o);
            for (var l = 0, u = 0, c = t.length; c > u; u++) a = this.getCharTexture(t.charAt(u)), 
            a && (e.graphics.drawImage(a, i + l + h, n), l += this.getCharWidth(t.charAt(u)));
        }, t;
    }(), B = function() {
        function t() {}
        r(t, "laya.display.cmd.ClipRectCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("ClipRectCmd", this);
        }, e.run = function(t, e, i) {
            t.clipRect(this.x + e, this.y + i, this.width, this.height);
        }, s(0, e, "cmdID", function() {
            return "ClipRect";
        }), t.create = function(e, i, n, r) {
            var s = U.getItemByClass("ClipRectCmd", t);
            return s.x = e, s.y = i, s.width = n, s.height = r, s;
        }, t.ID = "ClipRect", t;
    }(), F = function() {
        function t() {
            this.ALPHA = 1, this.shaderType = 0, this.defines = new Re(), this.fillStyle = Et.DEFAULT, 
            this.strokeStyle = Et.DEFAULT;
        }
        r(t, "laya.webgl.shader.d2.Shader2D");
        var e = t.prototype;
        return e.destroy = function() {
            this.defines = null, this.filters = null;
        }, t.__init__ = function() {
            var t, e;
            t = "/*\n\ttexture和fillrect使用的。\n*/\nattribute vec4 posuv;\nattribute vec4 attribColor;\nattribute vec4 attribFlags;\n//attribute vec4 clipDir;\n//attribute vec2 clipRect;\nuniform vec4 clipMatDir;\nuniform vec2 clipMatPos;\t\t// 这个是全局的，不用再应用矩阵了。\nvarying vec2 cliped;\nuniform vec2 size;\nuniform vec2 clipOff;\t\t\t// 使用要把clip偏移。cacheas normal用. 只用了[0]\n#ifdef WORLDMAT\n\tuniform mat4 mmat;\n#endif\n#ifdef MVP3D\n\tuniform mat4 u_MvpMatrix;\n#endif\nvarying vec4 v_texcoordAlpha;\nvarying vec4 v_color;\nvarying float v_useTex;\n\nvoid main() {\n\n\tvec4 pos = vec4(posuv.xy,0.,1.);\n#ifdef WORLDMAT\n\tpos=mmat*pos;\n#endif\n\tvec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);\n#ifdef MVP3D\n\tgl_Position=u_MvpMatrix*pos1;\n#else\n\tgl_Position=pos1;\n#endif\n\tv_texcoordAlpha.xy = posuv.zw;\n\t//v_texcoordAlpha.z = attribColor.a/255.0;\n\tv_color = attribColor/255.0;\n\tv_color.xyz*=v_color.w;//反正后面也要预乘\n\t\n\tv_useTex = attribFlags.r/255.0;\n\tfloat clipw = length(clipMatDir.xy);\n\tfloat cliph = length(clipMatDir.zw);\n\t\n\tvec2 clpos = clipMatPos.xy;\n\t#ifdef WORLDMAT\n\t\t// 如果有mmat，需要修改clipMatPos,因为 这是cacheas normal （如果不是就错了）， clipMatPos被去掉了偏移\n\t\tif(clipOff[0]>0.0){\n\t\t\tclpos.x+=mmat[3].x;\t//tx\t最简单处理\n\t\t\tclpos.y+=mmat[3].y;\t//ty\n\t\t}\n\t#endif\n\tvec2 clippos = pos.xy - clpos;\t//pos已经应用矩阵了，为了减的有意义，clip的位置也要缩放\n\tif(clipw>20000. && cliph>20000.)\n\t\tcliped = vec2(0.5,0.5);\n\telse {\n\t\t//转成0到1之间。/clipw/clipw 表示clippos与normalize之后的clip朝向点积之后，再除以clipw\n\t\tcliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\n\t}\n\n}", 
            e = "/*\n\ttexture和fillrect使用的。\n*/\n#ifdef FSHIGHPRECISION\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n\nvarying vec4 v_texcoordAlpha;\nvarying vec4 v_color;\nvarying float v_useTex;\nuniform sampler2D texture;\nvarying vec2 cliped;\n\n#ifdef BLUR_FILTER\nuniform vec4 strength_sig2_2sig2_gauss1;\nuniform vec2 blurInfo;\n\n#define PI 3.141593\n\nfloat getGaussian(float x, float y){\n    return strength_sig2_2sig2_gauss1.w*exp(-(x*x+y*y)/strength_sig2_2sig2_gauss1.z);\n}\n\nvec4 blur(){\n    const float blurw = 9.0;\n    vec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\n    vec2 halfsz=vec2(blurw,blurw)/2.0/blurInfo;    \n    vec2 startpos=v_texcoordAlpha.xy-halfsz;\n    vec2 ctexcoord = startpos;\n    vec2 step = 1.0/blurInfo;  //每个像素      \n    \n    for(float y = 0.0;y<=blurw; ++y){\n        ctexcoord.x=startpos.x;\n        for(float x = 0.0;x<=blurw; ++x){\n            //TODO 纹理坐标的固定偏移应该在vs中处理\n            vec4Color += texture2D(texture, ctexcoord)*getGaussian(x-blurw/2.0,y-blurw/2.0);\n            ctexcoord.x+=step.x;\n        }\n        ctexcoord.y+=step.y;\n    }\n    return vec4Color;\n}\n#endif\n\n#ifdef COLOR_FILTER\nuniform vec4 colorAlpha;\nuniform mat4 colorMat;\n#endif\n\n#ifdef GLOW_FILTER\nuniform vec4 u_color;\nuniform vec4 u_blurInfo1;\nuniform vec4 u_blurInfo2;\n#endif\n\n#ifdef COLOR_ADD\nuniform vec4 colorAdd;\n#endif\n\n#ifdef FILLTEXTURE\t\nuniform vec4 u_TexRange;//startu,startv,urange, vrange\n#endif\nvoid main() {\n\tif(cliped.x<0.) discard;\n\tif(cliped.x>1.) discard;\n\tif(cliped.y<0.) discard;\n\tif(cliped.y>1.) discard;\n\t\n#ifdef FILLTEXTURE\t\n   vec4 color= texture2D(texture, fract(v_texcoordAlpha.xy)*u_TexRange.zw + u_TexRange.xy);\n#else\n   vec4 color= texture2D(texture, v_texcoordAlpha.xy);\n#endif\n\n   if(v_useTex<=0.)color = vec4(1.,1.,1.,1.);\n   color.a*=v_color.w;\n   //color.rgb*=v_color.w;\n   color.rgb*=v_color.rgb;\n   gl_FragColor=color;\n   \n   #ifdef COLOR_ADD\n\tgl_FragColor = vec4(colorAdd.rgb,colorAdd.a*gl_FragColor.a);\n\tgl_FragColor.xyz *= colorAdd.a;\n   #endif\n   \n   #ifdef BLUR_FILTER\n\tgl_FragColor =   blur();\n\tgl_FragColor.w*=v_color.w;   \n   #endif\n   \n   #ifdef COLOR_FILTER\n\tmat4 alphaMat =colorMat;\n\n\talphaMat[0][3] *= gl_FragColor.a;\n\talphaMat[1][3] *= gl_FragColor.a;\n\talphaMat[2][3] *= gl_FragColor.a;\n\n\tgl_FragColor = gl_FragColor * alphaMat;\n\tgl_FragColor += colorAlpha/255.0*gl_FragColor.a;\n   #endif\n   \n   #ifdef GLOW_FILTER\n\tconst float c_IterationTime = 10.0;\n\tfloat floatIterationTotalTime = c_IterationTime * c_IterationTime;\n\tvec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\n\tvec2 vec2FilterDir = vec2(-(u_blurInfo1.z)/u_blurInfo2.x,-(u_blurInfo1.w)/u_blurInfo2.y);\n\tvec2 vec2FilterOff = vec2(u_blurInfo1.x/u_blurInfo2.x/c_IterationTime * 2.0,u_blurInfo1.y/u_blurInfo2.y/c_IterationTime * 2.0);\n\tfloat maxNum = u_blurInfo1.x * u_blurInfo1.y;\n\tvec2 vec2Off = vec2(0.0,0.0);\n\tfloat floatOff = c_IterationTime/2.0;\n\tfor(float i = 0.0;i<=c_IterationTime; ++i){\n\t\tfor(float j = 0.0;j<=c_IterationTime; ++j){\n\t\t\tvec2Off = vec2(vec2FilterOff.x * (i - floatOff),vec2FilterOff.y * (j - floatOff));\n\t\t\tvec4Color += texture2D(texture, v_texcoordAlpha.xy + vec2FilterDir + vec2Off)/floatIterationTotalTime;\n\t\t}\n\t}\n\tgl_FragColor = vec4(u_color.rgb,vec4Color.a * u_blurInfo2.z);\n\tgl_FragColor.rgb *= gl_FragColor.a;   \n   #endif\n   \n}", 
            ni.preCompile2D(0, 1, t, e, null), t = "attribute vec4 position;\nattribute vec4 attribColor;\n//attribute vec4 clipDir;\n//attribute vec2 clipRect;\nuniform vec4 clipMatDir;\nuniform vec2 clipMatPos;\n#ifdef WORLDMAT\n\tuniform mat4 mmat;\n#endif\nuniform mat4 u_mmat2;\n//uniform vec2 u_pos;\nuniform vec2 size;\nvarying vec4 color;\n//vec4 dirxy=vec4(0.9,0.1, -0.1,0.9);\n//vec4 clip=vec4(100.,30.,300.,600.);\nvarying vec2 cliped;\nvoid main(){\n\t\n#ifdef WORLDMAT\n\tvec4 pos=mmat*vec4(position.xy,0.,1.);\n\tgl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n#else\n\tgl_Position =vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\n#endif\t\n\tfloat clipw = length(clipMatDir.xy);\n\tfloat cliph = length(clipMatDir.zw);\n\tvec2 clippos = position.xy - clipMatPos.xy;\t//pos已经应用矩阵了，为了减的有意义，clip的位置也要缩放\n\tif(clipw>20000. && cliph>20000.)\n\t\tcliped = vec2(0.5,0.5);\n\telse {\n\t\t//clipdir是带缩放的方向，由于上面clippos是在缩放后的空间计算的，所以需要把方向先normalize一下\n\t\tcliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\n\t}\n  //pos2d.x = dot(clippos,dirx);\n  color=attribColor/255.;\n}", 
            e = "precision mediump float;\n//precision mediump float;\nvarying vec4 color;\n//uniform float alpha;\nvarying vec2 cliped;\nvoid main(){\n\t//vec4 a=vec4(color.r, color.g, color.b, 1);\n\t//a.a*=alpha;\n    gl_FragColor= color;// vec4(color.r, color.g, color.b, alpha);\n\tgl_FragColor.rgb*=color.a;\n\tif(cliped.x<0.) discard;\n\tif(cliped.x>1.) discard;\n\tif(cliped.y<0.) discard;\n\tif(cliped.y>1.) discard;\n}", 
            ni.preCompile2D(0, 4, t, e, null), t = "attribute vec2 position;\nattribute vec2 texcoord;\nattribute vec4 color;\nuniform vec2 size;\nuniform float offsetX;\nuniform float offsetY;\nuniform mat4 mmat;\nuniform mat4 u_mmat2;\nvarying vec2 v_texcoord;\nvarying vec4 v_color;\nvoid main() {\n  vec4 pos=mmat*u_mmat2*vec4(offsetX+position.x,offsetY+position.y,0,1 );\n  gl_Position = vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  v_color = color;\n  v_color.rgb *= v_color.a;\n  v_texcoord = texcoord;  \n}", 
            e = "precision mediump float;\nvarying vec2 v_texcoord;\nvarying vec4 v_color;\nuniform sampler2D texture;\nuniform float alpha;\nvoid main() {\n\tvec4 t_color = texture2D(texture, v_texcoord);\n\tgl_FragColor = t_color.rgba * v_color;\n\tgl_FragColor *= alpha;\n}", 
            ni.preCompile2D(0, 512, t, e, null);
        }, t;
    }(), O = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawPolyCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.points = null, this.fillColor = null, this.lineColor = null, U.recover("DrawPolyCmd", this);
        }, e.run = function(t, e, i) {
            t._drawPoly(this.x + e, this.y + i, this.points, this.fillColor, this.lineColor, this.lineWidth, this.isConvexPolygon, this.vid);
        }, s(0, e, "cmdID", function() {
            return "DrawPoly";
        }), t.create = function(e, i, n, r, s, a, o, h) {
            var l = U.getItemByClass("DrawPolyCmd", t);
            return l.x = e, l.y = i, l.points = n, l.fillColor = r, l.lineColor = s, l.lineWidth = a, 
            l.isConvexPolygon = o, l.vid = h, l;
        }, t.ID = "DrawPoly", t;
    }(), N = function() {
        function t() {
            this.fontName = null, this.complete = null, this.err = null, this._fontTxt = null, 
            this._url = null, this._div = null, this._txtWidth = NaN, this._http = null;
        }
        r(t, "laya.net.TTFLoader");
        var e = t.prototype;
        return e.load = function(t) {
            this._url = t;
            var e = t.split(".ttf")[0].split("/");
            this.fontName = e[e.length - 1], Mt.isConchApp ? this._loadConch() : Dt.window.FontFace ? this._loadWithFontFace() : this._loadWithCSS();
        }, e._loadConch = function() {
            this._http = new Pe(), this._http.on("error", this, this._onErr), this._http.on("complete", this, this._onHttpLoaded), 
            this._http.send(this._url, null, "get", "arraybuffer");
        }, e._onHttpLoaded = function(t) {
            Dt.window.conchTextCanvas.setFontFaceFromBuffer(this.fontName, t), this._clearHttp(), 
            this._complete();
        }, e._clearHttp = function() {
            this._http && (this._http.off("error", this, this._onErr), this._http.off("complete", this, this._onHttpLoaded), 
            this._http = null);
        }, e._onErr = function() {
            this._clearHttp(), this.err && (this.err.runWith("fail:" + this._url), this.err = null);
        }, e._complete = function() {
            i.systemTimer.clear(this, this._complete), i.systemTimer.clear(this, this._checkComplete), 
            this._div && this._div.parentNode && (this._div.parentNode.removeChild(this._div), 
            this._div = null), this.complete && (this.complete.runWith(this), this.complete = null);
        }, e._checkComplete = function() {
            ue.measureText("LayaTTFFont", this._fontTxt).width != this._txtWidth && this._complete();
        }, e._loadWithFontFace = function() {
            var t = new Dt.window.FontFace(this.fontName, "url('" + this._url + "')");
            Dt.window.document.fonts.add(t);
            var e = this;
            t.loaded.then(function() {
                e._complete();
            }), t.load();
        }, e._createDiv = function() {
            this._div = Dt.createElement("div"), this._div.innerHTML = "laya";
            var t = this._div.style;
            t.fontFamily = this.fontName, t.position = "absolute", t.left = "-100px", t.top = "-100px", 
            Dt.document.body.appendChild(this._div);
        }, e._loadWithCSS = function() {
            var t = this, e = Dt.createElement("style");
            e.type = "text/css", Dt.document.body.appendChild(e), e.textContent = "@font-face { font-family:'" + this.fontName + "'; src:url('" + this._url + "');}", 
            this._fontTxt = "40px " + this.fontName, this._txtWidth = ue.measureText("LayaTTFFont", this._fontTxt).width;
            var n = this;
            e.onload = function() {
                i.systemTimer.once(1e4, n, t._complete);
            }, i.systemTimer.loop(20, this, this._checkComplete), this._createDiv();
        }, t._testString = "LayaTTFFont", t;
    }(), k = function() {
        function t() {
            this.blendShader = 0, this.submitType = 0, this.other = 0, this.clear();
        }
        r(t, "laya.webgl.submit.SubmitKey");
        var e = t.prototype;
        return e.clear = function() {
            this.submitType = -1, this.blendShader = this.other = 0;
        }, e.copyFrom = function(t) {
            this.other = t.other, this.blendShader = t.blendShader, this.submitType = t.submitType;
        }, e.copyFrom2 = function(t, e, i) {
            this.other = i, this.submitType = e;
        }, e.equal3_2 = function(t, e, i) {
            return this.submitType === e && this.other === i && this.blendShader === t.blendShader;
        }, e.equal4_2 = function(t, e, i) {
            return this.submitType === e && this.other === i && this.blendShader === t.blendShader;
        }, e.equal_3 = function(t) {
            return this.submitType === t.submitType && this.blendShader === t.blendShader;
        }, e.equal = function(t) {
            return this.other === t.other && this.submitType === t.submitType && this.blendShader === t.blendShader;
        }, t;
    }(), U = (function() {
        function t() {
            this._graphicsCmdEncoder = null, this._index = 0, this._paramData = null, this.texture = null, 
            this.x = NaN, this.y = NaN, this.width = NaN, this.height = NaN;
        }
        r(t, "laya.display.cmd.DrawCanvasCmd");
        var e = t.prototype;
        return e.recover = function() {
            this._graphicsCmdEncoder = null, U.recover("DrawCanvasCmd", this);
        }, s(0, e, "cmdID", function() {
            return "DrawCanvasCmd";
        }), t.create = function(t, e, i, n, r) {
            return null;
        }, t.ID = "DrawCanvasCmd", t._DRAW_IMAGE_CMD_ENCODER_ = null, t._PARAM_TEXTURE_POS_ = 2, 
        t._PARAM_VB_POS_ = 5, t;
    }(), function() {
        function t() {}
        return r(t, "laya.utils.Pool"), t.getPoolBySign = function(e) {
            return t._poolDic[e] || (t._poolDic[e] = []);
        }, t.clearBySign = function(e) {
            t._poolDic[e] && (t._poolDic[e].length = 0);
        }, t.recover = function(e, i) {
            i.__InPool || (i.__InPool = !0, t.getPoolBySign(e).push(i));
        }, t.recoverByClass = function(e) {
            if (e) {
                var i = e.__className || e.constructor._$gid;
                i && t.recover(i, e);
            }
        }, t._getClassSign = function(t) {
            var e = t.__className || t._$gid;
            return e || (t._$gid = e = ie.getGID() + ""), e;
        }, t.createByClass = function(e) {
            return t.getItemByClass(t._getClassSign(e), e);
        }, t.getItemByClass = function(e, i) {
            if (!t._poolDic[e]) return new i();
            var n = t.getPoolBySign(e);
            if (n.length) {
                var r = n.pop();
                r.__InPool = !1;
            } else r = new i();
            return r;
        }, t.getItemByCreateFun = function(e, i, n) {
            var r = t.getPoolBySign(e), s = r.length ? r.pop() : i.call(n);
            return s.__InPool = !1, s;
        }, t.getItem = function(e) {
            var i = t.getPoolBySign(e), n = i.length ? i.pop() : null;
            return n && (n.__InPool = !1), n;
        }, t.POOLSIGN = "__InPool", t._poolDic = {}, t;
    }()), W = function() {
        function t(t) {
            this.script = null, this.codes = {}, this.funs = {}, this.curUseID = -1, this.funnames = "", 
            this.script = t;
            for (var e = 0, i = 0, n = 0; ;) {
                if (e = t.indexOf("#begin", e), 0 > e) break;
                for (n = e + 5; ;) {
                    if (n = t.indexOf("#end", n), 0 > n) break;
                    if ("i" !== t.charAt(n + 4)) break;
                    n += 5;
                }
                if (0 > n) throw "add include err,no #end:" + t;
                i = t.indexOf("\n", e);
                var r = pe.splitToWords(t.substr(e, i - e), null);
                "code" == r[1] ? this.codes[r[2]] = t.substr(i + 1, n - i - 1) : "function" == r[1] && (i = t.indexOf("function", e), 
                i += "function".length, this.funs[r[3]] = t.substr(i + 1, n - i - 1), this.funnames += r[3] + ";"), 
                e = n + 1;
            }
        }
        r(t, "laya.webgl.utils.InlcudeFile");
        var e = t.prototype;
        return e.getWith = function(t) {
            var e = t ? this.codes[t] : this.script;
            if (!e) throw "get with error:" + t;
            return e;
        }, e.getFunsScript = function(t) {
            var e = "";
            for (var i in this.funs) t.indexOf(i + ";") >= 0 && (e += this.funs[i]);
            return e;
        }, t;
    }(), V = (function() {
        function t() {}
        return r(t, "laya.display.SpriteConst"), t.ALPHA = 1, t.TRANSFORM = 2, t.BLEND = 4, 
        t.CANVAS = 8, t.FILTERS = 16, t.MASK = 32, t.CLIP = 64, t.STYLE = 128, t.TEXTURE = 256, 
        t.GRAPHICS = 512, t.LAYAGL3D = 1024, t.CUSTOM = 2048, t.ONECHILD = 4096, t.CHILDS = 8192, 
        t.REPAINT_NONE = 0, t.REPAINT_NODE = 1, t.REPAINT_CACHE = 2, t.REPAINT_ALL = 3, 
        t;
    }(), function() {
        function t() {
            this._glBuffer = null, this._buffer = null, this._bufferType = 0, this._bufferUsage = 0, 
            this._byteLength = 0, this._glBuffer = Pt.instance.createBuffer();
        }
        r(t, "laya.webgl.utils.Buffer");
        var e = t.prototype;
        return e._bindForVAO = function() {}, e.bind = function() {
            return !1;
        }, e.destroy = function() {
            this._glBuffer && (Pt.instance.deleteBuffer(this._glBuffer), this._glBuffer = null);
        }, s(0, e, "bufferUsage", function() {
            return this._bufferUsage;
        }), t._bindedVertexBuffer = null, t._bindedIndexBuffer = null, t;
    }()), G = function() {
        function t() {
            this.colorFlt = null;
        }
        r(t, "laya.display.cmd.DrawTextureCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.texture._removeReference(), this.texture = null, this.matrix = null, U.recover("DrawTextureCmd", this);
        }, e.run = function(t, e, i) {
            t.drawTextureWithTransform(this.texture, this.x, this.y, this.width, this.height, this.matrix, e, i, this.alpha, this.blendMode, this.colorFlt);
        }, s(0, e, "cmdID", function() {
            return "DrawTexture";
        }), t.create = function(e, i, n, r, s, a, o, h, l) {
            var u = U.getItemByClass("DrawTextureCmd", t);
            return u.texture = e, e._addReference(), u.x = i, u.y = n, u.width = r, u.height = s, 
            u.matrix = a, u.alpha = o, u.color = h, u.blendMode = l, h && (u.colorFlt = new Te(), 
            u.colorFlt.setColor(h)), u;
        }, t.ID = "DrawTexture", t;
    }(), X = function() {
        function t(e, i) {
            this.size = [ 0, 0 ], this.alpha = 1, this.ALPHA = 1, this.subID = 0, this.ref = 1, 
            this._cacheID = 0, this.clipMatDir = [ 99999999, 0, 0, 99999999 ], this.clipMatPos = [ 0, 0 ], 
            this.clipOff = [ 0, 0 ], this.defines = new Re(), this.mainID = e, this.subID = i, 
            this.textureHost = null, this.texture = null, this.color = null, this.colorAdd = null, 
            this.u_mmat2 = null, this._cacheID = e | i, this._inClassCache = t._cache[this._cacheID], 
            e > 0 && !this._inClassCache && (this._inClassCache = t._cache[this._cacheID] = [], 
            this._inClassCache._length = 0), this.clear();
        }
        r(t, "laya.webgl.shader.d2.value.Value2D");
        var e = t.prototype;
        return e.setValue = function(t) {}, e._ShaderWithCompile = function() {
            var t = ni.withCompile2D(0, this.mainID, this.defines.toNameDic(), this.mainID | this.defines._value, ui.create, this._attribLocation);
            return t;
        }, e.upload = function() {
            var t = ft;
            ft.worldMatrix4 === ft.TEMPMAT4_ARRAY || this.defines.addInt(128), this.mmat = t.worldMatrix4, 
            ft.matWVP && (this.defines.addInt(2048), this.u_MvpMatrix = ft.matWVP.elements);
            var e = ni.sharders[this.mainID | this.defines._value] || this._ShaderWithCompile();
            e._shaderValueWidth !== t.width || e._shaderValueHeight !== t.height ? (this.size[0] = t.width, 
            this.size[1] = t.height, e._shaderValueWidth = t.width, e._shaderValueHeight = t.height, 
            e.upload(this, null)) : e.upload(this, e._params2dQuick2 || e._make2dQuick2());
        }, e.setFilters = function(t) {
            if (this.filters = t, t) for (var e, i = t.length, n = 0; i > n; n++) e = t[n], 
            e && (this.defines.add(e.type), e.action.setValue(this));
        }, e.clear = function() {
            this.defines._value = this.subID + (wt.shaderHighPrecision ? 1024 : 0), this.clipOff[0] = 0;
        }, e.release = function() {
            --this.ref < 1 && (this._inClassCache && (this._inClassCache[this._inClassCache._length++] = this), 
            this.clear(), this.filters = null, this.ref = 1, this.clipOff[0] = 0);
        }, t._initone = function(e, i) {
            t._typeClass[e] = i, t._cache[e] = [], t._cache[e]._length = 0;
        }, t.__init__ = function() {
            t._initone(4, Xe), t._initone(512, Ye), t._initone(1, Oe), t._initone(9, Oe);
        }, t.create = function(e, i) {
            var n = t._cache[e | i];
            return n._length ? n[--n._length] : new t._typeClass[e | i](i);
        }, t._cache = [], t._typeClass = [], t.TEMPMAT4_ARRAY = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        t;
    }(), Y = function() {
        function t() {}
        return r(t, "laya.maths.GrahamScan"), t.multiply = function(t, e, i) {
            return (t.x - i.x) * (e.y - i.y) - (e.x - i.x) * (t.y - i.y);
        }, t.dis = function(t, e) {
            return (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y);
        }, t._getPoints = function(e, i, n) {
            for (void 0 === i && (i = !1), t._mPointList || (t._mPointList = []); t._mPointList.length < e; ) t._mPointList.push(new Yt());
            return n || (n = []), n.length = 0, i ? t.getFrom(n, t._mPointList, e) : t.getFromR(n, t._mPointList, e), 
            n;
        }, t.getFrom = function(t, e, i) {
            var n = 0;
            for (n = 0; i > n; n++) t.push(e[n]);
            return t;
        }, t.getFromR = function(t, e, i) {
            var n = 0;
            for (n = 0; i > n; n++) t.push(e.pop());
            return t;
        }, t.pListToPointList = function(e, i) {
            void 0 === i && (i = !1);
            var n = 0, r = e.length / 2, s = t._getPoints(r, i, t._tempPointList);
            for (n = 0; r > n; n++) s[n].setTo(e[n + n], e[n + n + 1]);
            return s;
        }, t.pointListToPlist = function(e) {
            var i, n = 0, r = e.length, s = t._temPList;
            for (s.length = 0, n = 0; r > n; n++) i = e[n], s.push(i.x, i.y);
            return s;
        }, t.scanPList = function(e) {
            return ie.copyArray(e, t.pointListToPlist(t.scan(t.pListToPointList(e, !0))));
        }, t.scan = function(e) {
            var i, n, r, s = 0, a = 0, o = 0, h = e.length, l = {};
            for (n = t._temArr, n.length = 0, h = e.length, s = h - 1; s >= 0; s--) i = e[s], 
            r = i.x + "_" + i.y, l.hasOwnProperty(r) || (l[r] = !0, n.push(i));
            for (h = n.length, ie.copyArray(e, n), s = 1; h > s; s++) (e[s].y < e[o].y || e[s].y == e[o].y && e[s].x < e[o].x) && (o = s);
            for (i = e[0], e[0] = e[o], e[o] = i, s = 1; h - 1 > s; s++) {
                for (o = s, a = s + 1; h > a; a++) (t.multiply(e[a], e[o], e[0]) > 0 || 0 == t.multiply(e[a], e[o], e[0]) && t.dis(e[0], e[a]) < t.dis(e[0], e[o])) && (o = a);
                i = e[s], e[s] = e[o], e[o] = i;
            }
            if (n = t._temArr, n.length = 0, e.length < 3) return ie.copyArray(n, e);
            for (n.push(e[0], e[1], e[2]), s = 3; h > s; s++) {
                for (;n.length >= 2 && t.multiply(e[s], n[n.length - 1], n[n.length - 2]) >= 0; ) n.pop();
                e[s] && n.push(e[s]);
            }
            return n;
        }, t._mPointList = null, t._tempPointList = [], t._temPList = [], t._temArr = [], 
        t;
    }(), H = function() {
        function t() {
            this._saveuse = 0;
        }
        r(t, "laya.webgl.canvas.save.SaveMark");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !0;
        }, e.restore = function(e) {
            e._saveMark = this._preSaveMark, t.POOL[t.POOL._length++] = this;
        }, t.Create = function(e) {
            var i = t.POOL, n = i._length > 0 ? i[--i._length] : new t();
            return n._saveuse = 0, n._preSaveMark = e._saveMark, e._saveMark = n, n;
        }, t.POOL = h._createArray(), t;
    }(), z = function() {
        function t() {
            this.gid = 0, this.repeat = 1, this._count = 0;
        }
        r(t, "laya.utils.Tween");
        var e = t.prototype;
        return e.to = function(t, e, i, n, r, s, a) {
            return void 0 === s && (s = 0), void 0 === a && (a = !1), this._create(t, e, i, n, r, s, a, !0, !1, !0);
        }, e.from = function(t, e, i, n, r, s, a) {
            return void 0 === s && (s = 0), void 0 === a && (a = !1), this._create(t, e, i, n, r, s, a, !1, !1, !0);
        }, e._create = function(e, n, r, s, a, o, h, l, u, c) {
            if (!e) throw new Error("Tween:target is null");
            this._target = e, this._duration = r, this._ease = s || n.ease || t.easeNone, this._complete = a || n.complete, 
            this._delay = o, this._props = [], this._usedTimer = 0, this._startTimer = Dt.now(), 
            this._usedPool = u, this._delayParam = null, this.update = n.update;
            var _ = e.$_GID || (e.$_GID = ie.getGID());
            return t.tweenMap[_] ? (h && t.clearTween(e), t.tweenMap[_].push(this)) : t.tweenMap[_] = [ this ], 
            c ? 0 >= o ? this.firstStart(e, n, l) : (this._delayParam = [ e, n, l ], i.timer.once(o, this, this.firstStart, this._delayParam)) : this._initProps(e, n, l), 
            this;
        }, e.firstStart = function(t, e, i) {
            return this._delayParam = null, t.destroyed ? void this.clear() : (this._initProps(t, e, i), 
            void this._beginLoop());
        }, e._initProps = function(t, e, i) {
            for (var n in e) if ("number" == typeof t[n]) {
                var r = i ? t[n] : e[n], s = i ? e[n] : t[n];
                this._props.push([ n, r, s - r ]), i || (t[n] = r);
            }
        }, e._beginLoop = function() {
            i.timer.frameLoop(1, this, this._doEase);
        }, e._doEase = function() {
            this._updateEase(Dt.now());
        }, e._updateEase = function(e) {
            var i = this._target;
            if (i) {
                if (i.destroyed) return t.clearTween(i);
                var n = this._usedTimer = e - this._startTimer - this._delay;
                if (!(0 > n)) {
                    if (n >= this._duration) return this.complete();
                    for (var r = n > 0 ? this._ease(n, 0, 1, this._duration) : 0, s = this._props, a = 0, o = s.length; o > a; a++) {
                        var h = s[a];
                        i[h[0]] = h[1] + r * h[2];
                    }
                    this.update && this.update.run();
                }
            }
        }, e.complete = function() {
            if (this._target) {
                i.timer.runTimer(this, this.firstStart);
                for (var t = this._target, e = this._props, n = this._complete, r = 0, s = e.length; s > r; r++) {
                    var a = e[r];
                    t[a[0]] = a[1] + a[2];
                }
                this.update && this.update.run(), this._count++, 0 != this.repeat && this._count >= this.repeat ? (this.clear(), 
                n && n.run()) : this.restart();
            }
        }, e.pause = function() {
            i.timer.clear(this, this._beginLoop), i.timer.clear(this, this._doEase), i.timer.clear(this, this.firstStart);
            var t = Dt.now(), e = NaN;
            e = t - this._startTimer - this._delay, 0 > e && (this._usedTimer = e);
        }, e.setStartTime = function(t) {
            this._startTimer = t;
        }, e.clear = function() {
            this._target && (this._remove(), this._clear());
        }, e._clear = function() {
            this.pause(), i.timer.clear(this, this.firstStart), this._complete = null, this._target = null, 
            this._ease = null, this._props = null, this._delayParam = null, this._usedPool && (this.update = null, 
            U.recover("tween", this));
        }, e.recover = function() {
            this._usedPool = !0, this._clear();
        }, e._remove = function() {
            var e = t.tweenMap[this._target.$_GID];
            if (e) for (var i = 0, n = e.length; n > i; i++) if (e[i] === this) {
                e.splice(i, 1);
                break;
            }
        }, e.restart = function() {
            if (this.pause(), this._usedTimer = 0, this._startTimer = Dt.now(), this._delayParam) return void i.timer.once(this._delay, this, this.firstStart, this._delayParam);
            for (var t = this._props, e = 0, n = t.length; n > e; e++) {
                var r = t[e];
                this._target[r[0]] = r[1];
            }
            i.timer.once(this._delay, this, this._beginLoop);
        }, e.resume = function() {
            this._usedTimer >= this._duration || (this._startTimer = Dt.now() - this._usedTimer - this._delay, 
            this._delayParam ? this._usedTimer < 0 ? i.timer.once(-this._usedTimer, this, this.firstStart, this._delayParam) : this.firstStart.apply(this, this._delayParam) : this._beginLoop());
        }, s(0, e, "progress", null, function(t) {
            var e = t * this._duration;
            this._startTimer = Dt.now() - this._delay - e;
        }), t.to = function(e, i, n, r, s, a, o, h) {
            return void 0 === a && (a = 0), void 0 === o && (o = !1), void 0 === h && (h = !0), 
            U.getItemByClass("tween", t)._create(e, i, n, r, s, a, o, !0, h, !0);
        }, t.from = function(e, i, n, r, s, a, o, h) {
            return void 0 === a && (a = 0), void 0 === o && (o = !1), void 0 === h && (h = !0), 
            U.getItemByClass("tween", t)._create(e, i, n, r, s, a, o, !1, h, !0);
        }, t.clearAll = function(e) {
            if (e && e.$_GID) {
                var i = t.tweenMap[e.$_GID];
                if (i) {
                    for (var n = 0, r = i.length; r > n; n++) i[n]._clear();
                    i.length = 0;
                }
            }
        }, t.clear = function(t) {
            t.clear();
        }, t.clearTween = function(e) {
            t.clearAll(e);
        }, t.easeNone = function(t, e, i, n) {
            return i * t / n + e;
        }, t.tweenMap = [], t;
    }(), j = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawRectCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.fillColor = null, this.lineColor = null, U.recover("DrawRectCmd", this);
        }, e.run = function(t, e, i) {
            t.drawRect(this.x + e, this.y + i, this.width, this.height, this.fillColor, this.lineColor, this.lineWidth);
        }, s(0, e, "cmdID", function() {
            return "DrawRect";
        }), t.create = function(e, i, n, r, s, a, o) {
            var h = U.getItemByClass("DrawRectCmd", t);
            return h.x = e, h.y = i, h.width = n, h.height = r, h.fillColor = s, h.lineColor = a, 
            h.lineWidth = o, h;
        }, t.ID = "DrawRect", t;
    }(), K = function() {
        function t(t, e, i) {
            this.i = null, this.x = null, this.y = null, this.prev = null, this.next = null, 
            this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = null, this.i = t, 
            this.x = e, this.y = i, this.prev = null, this.next = null, this.z = null, this.prevZ = null, 
            this.nextZ = null, this.steiner = !1;
        }
        return r(t, "laya.webgl.shapes.EarcutNode"), t;
    }(), $ = function() {
        function t() {
            this.fun = null, this._this = null, this.args = null, this._ref = 1, this._key = new k();
        }
        r(t, "laya.webgl.submit.SubmitCMD");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.renderSubmit = function() {
            return this.fun.apply(this._this, this.args), 1;
        }, e.getRenderType = function() {
            return 0;
        }, e.reUse = function(t, e) {
            return this._ref++, e;
        }, e.releaseRender = function() {
            if (--this._ref < 1) {
                var e = t.POOL;
                e[e._length++] = this;
            }
        }, e.clone = function(t, e, i) {
            return null;
        }, t.create = function(e, i, n) {
            var r = t.POOL._length ? t.POOL[--t.POOL._length] : new t();
            return r.fun = i, r.args = e, r._this = n, r._ref = 1, r._key.clear(), r;
        }, t.POOL = [], t.__init$ = function() {
            t.POOL._length = 0;
        }, t;
    }(), q = function() {
        function t(e) {
            this._url = null, this._path = null, this._url = t.formatURL(e), this._path = t.getPath(e);
        }
        r(t, "laya.net.URL");
        var e = t.prototype;
        return s(0, e, "path", function() {
            return this._path;
        }), s(0, e, "url", function() {
            return this._url;
        }), s(1, t, "basePath", function() {
            return t._basePath;
        }, function(e) {
            t._basePath = i._getUrlPath(), t._basePath = t.formatURL(e);
        }), t.formatURL = function(e) {
            if (!e) return "null path";
            if (e.indexOf(":") > 0) return e;
            if (null != t.customFormat && (e = t.customFormat(e)), e.indexOf(":") > 0) return e;
            var i = e.charAt(0);
            if ("." === i) return t._formatRelativePath(t._basePath + e);
            if ("~" === i) return t.rootPath + e.substring(1);
            if ("d" === i) {
                if (0 === e.indexOf("data:image")) return e;
            } else if ("/" === i) return e;
            return t._basePath + e;
        }, t._formatRelativePath = function(t) {
            for (var e = t.split("/"), i = 0, n = e.length; n > i; i++) ".." == e[i] && (e.splice(i - 1, 2), 
            i -= 2);
            return e.join("/");
        }, t.getPath = function(t) {
            var e = t.lastIndexOf("/");
            return e > 0 ? t.substr(0, e + 1) : "";
        }, t.getFileName = function(t) {
            var e = t.lastIndexOf("/");
            return e > 0 ? t.substr(e + 1) : t;
        }, t.getAdptedFilePath = function(e) {
            if (!t.exportSceneToJson || !e) return e;
            var i = 0, n = 0;
            n = t._adpteTypeList.length;
            var r;
            for (i = 0; n > i; i++) r = t._adpteTypeList[i], e = e.replace(r[0], r[1]);
            return e;
        }, t.version = {}, t.exportSceneToJson = !1, t._basePath = "", t.rootPath = "", 
        t.customFormat = function(e) {
            var i = t.version[e];
            return !Mt.isConchApp && i && (e += "?v=" + i), e;
        }, n(t, [ "_adpteTypeList", function() {
            return this._adpteTypeList = [ [ ".scene3d", ".json" ], [ ".scene", ".json" ], [ ".taa", ".json" ], [ ".prefab", ".json" ] ];
        } ]), t;
    }(), Q = function() {
        function t() {}
        return r(t, "laya.utils.CacheManger"), t.regCacheByFunction = function(e, i) {
            t.unRegCacheByFunction(e, i);
            var n;
            n = {
                tryDispose: e,
                getCacheList: i
            }, t._cacheList.push(n);
        }, t.unRegCacheByFunction = function(e, i) {
            var n = 0, r = 0;
            for (r = t._cacheList.length, n = 0; r > n; n++) if (t._cacheList[n].tryDispose == e && t._cacheList[n].getCacheList == i) return void t._cacheList.splice(n, 1);
        }, t.forceDispose = function() {
            var e = 0, i = t._cacheList.length;
            for (e = 0; i > e; e++) t._cacheList[e].tryDispose(!0);
        }, t.beginCheck = function(e) {
            void 0 === e && (e = 15e3), i.systemTimer.loop(e, null, t._checkLoop);
        }, t.stopCheck = function() {
            i.systemTimer.clear(null, t._checkLoop);
        }, t._checkLoop = function() {
            var e = t._cacheList;
            if (!(e.length < 1)) {
                var i = Dt.now(), n = 0, r = 0;
                for (r = n = e.length; n > 0 && (t._index++, t._index = t._index % r, e[t._index].tryDispose(!1), 
                !(Dt.now() - i > t.loopTimeLimit)); ) n--;
            }
        }, t.loopTimeLimit = 2, t._cacheList = [], t._index = 0, t;
    }(), Z = function() {
        function t() {
            this.reset();
        }
        r(t, "laya.display.css.SpriteStyle");
        var e = t.prototype;
        return e.reset = function() {
            return this.scaleX = this.scaleY = 1, this.skewX = this.skewY = 0, this.pivotX = this.pivotY = this.rotation = 0, 
            this.alpha = 1, this.scrollRect && this.scrollRect.recover(), this.scrollRect = null, 
            this.viewport && this.viewport.recover(), this.viewport = null, this.hitArea = null, 
            this.dragging = null, this.blendMode = null, this;
        }, e.recover = function() {
            this !== t.EMPTY && U.recover("SpriteStyle", this.reset());
        }, t.create = function() {
            return U.getItemByClass("SpriteStyle", t);
        }, t.EMPTY = new t(), t;
    }(), J = (function() {
        function t(t, e) {
            this.submitStartPos = 0, this.submitEndPos = 0, this.context = null, this.touches = [], 
            this.submits = [], this.sprite = null, this._mesh = null, this._pathMesh = null, 
            this._triangleMesh = null, this.meshlist = [], this._oldMesh = null, this._oldPathMesh = null, 
            this._oldTriMesh = null, this._oldMeshList = null, this.oldTx = 0, this.oldTy = 0, 
            this.cachedClipInfo = new st(), this.invMat = new st(), this.context = t, this.sprite = e, 
            t._globalClipMatrix.copyTo(this.cachedClipInfo);
        }
        r(t, "laya.webgl.canvas.WebGLCacheAsNormalCanvas");
        var e = t.prototype;
        return e.startRec = function() {
            this.context._charSubmitCache._enbale && (this.context._charSubmitCache.enable(!1, this.context), 
            this.context._charSubmitCache.enable(!0, this.context)), this.context._incache = !0, 
            this.touches.length = 0, this.context.touches = this.touches, this.context._globalClipMatrix.copyTo(this.cachedClipInfo), 
            this.submits.length = 0, this.submitStartPos = this.context._submits._length;
            for (var t = 0, e = this.meshlist.length; e > t; t++) {
                var i = this.meshlist[t];
                i.canReuse ? i.releaseMesh() : i.destroy();
            }
            this.meshlist.length = 0, this._mesh = Be.getAMesh(!1), this._pathMesh = Se.getAMesh(!1), 
            this._triangleMesh = ke.getAMesh(!1), this.meshlist.push(this._mesh), this.meshlist.push(this._pathMesh), 
            this.meshlist.push(this._triangleMesh), this.context._curSubmit = l.RENDERBASE, 
            this._oldMesh = this.context._mesh, this._oldPathMesh = this.context._pathMesh, 
            this._oldTriMesh = this.context._triangleMesh, this._oldMeshList = this.context.meshlist, 
            this.context._mesh = this._mesh, this.context._pathMesh = this._pathMesh, this.context._triangleMesh = this._triangleMesh, 
            this.context.meshlist = this.meshlist, this.oldTx = this.context._curMat.tx, this.oldTy = this.context._curMat.ty, 
            this.context._curMat.tx = 0, this.context._curMat.ty = 0, this.context._curMat.copyTo(this.invMat), 
            this.invMat.invert();
        }, e.endRec = function() {
            this.context._charSubmitCache._enbale && (this.context._charSubmitCache.enable(!1, this.context), 
            this.context._charSubmitCache.enable(!0, this.context));
            var t = this.context._submits;
            this.submitEndPos = t._length;
            for (var e = this.submitEndPos - this.submitStartPos, i = 0; e > i; i++) this.submits.push(t[this.submitStartPos + i]);
            t._length -= e, this.context._mesh = this._oldMesh, this.context._pathMesh = this._oldPathMesh, 
            this.context._triangleMesh = this._oldTriMesh, this.context.meshlist = this._oldMeshList, 
            this.context._curSubmit = l.RENDERBASE, this.context._curMat.tx = this.oldTx, this.context._curMat.ty = this.oldTy, 
            this.context.touches = null, this.context._incache = !1;
        }, e.isCacheValid = function() {
            var t = this.context._globalClipMatrix;
            return t.a != this.cachedClipInfo.a || t.b != this.cachedClipInfo.b || t.c != this.cachedClipInfo.c || t.d != this.cachedClipInfo.d || t.tx != this.cachedClipInfo.tx || t.ty != this.cachedClipInfo.ty ? !1 : !0;
        }, e.flushsubmit = function() {
            var t = l.RENDERBASE;
            this.submits.forEach(function(e) {
                e != l.RENDERBASE && (l.preRender = t, t = e, e.renderSubmit());
            });
        }, e.releaseMem = function() {}, n(t, [ "matI", function() {
            return this.matI = new st();
        } ]), t;
    }(), function() {
        function t(t) {
            this.scale = 1, this.currFrame = 0, this._delta = 0, this._map = [], this._handlers = [], 
            this._temp = [], this._count = 0, this.currTimer = Dt.now(), this._lastTimer = Dt.now(), 
            void 0 === t && (t = !0), t && i.systemTimer && i.systemTimer.frameLoop(1, this, this._update);
        }
        var e;
        r(t, "laya.utils.Timer");
        var n = t.prototype;
        return n._update = function() {
            if (this.scale <= 0) return void (this._lastTimer = Dt.now());
            var t = this.currFrame = this.currFrame + this.scale, e = Dt.now();
            this._delta = (e - this._lastTimer) * this.scale;
            var i = this.currTimer = this.currTimer + this._delta;
            this._lastTimer = e;
            var n = this._handlers;
            this._count = 0;
            for (var r = 0, s = n.length; s > r; r++) {
                var a = n[r];
                if (null !== a.method) {
                    var o = a.userFrame ? t : i;
                    if (o >= a.exeTime) if (a.repeat) if (a.jumpFrame) for (;o >= a.exeTime; ) a.exeTime += a.delay, 
                    a.run(!1); else a.exeTime += a.delay, a.run(!1), o > a.exeTime && (a.exeTime += Math.ceil((o - a.exeTime) / a.delay) * a.delay); else a.run(!0);
                } else this._count++;
            }
            (this._count > 30 || t % 200 === 0) && this._clearHandlers();
        }, n._clearHandlers = function() {
            for (var t = this._handlers, e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                null !== n.method ? this._temp.push(n) : this._recoverHandler(n);
            }
            this._handlers = this._temp, t.length = 0, this._temp = t;
        }, n._recoverHandler = function(e) {
            this._map[e.key] == e && (this._map[e.key] = null), e.clear(), t._pool.push(e);
        }, n._create = function(i, n, r, s, a, o, h) {
            if (!r) return a.apply(s, o), null;
            if (h) {
                var l = this._getHandler(s, a);
                if (l) return l.repeat = n, l.userFrame = i, l.delay = r, l.caller = s, l.method = a, 
                l.args = o, l.exeTime = r + (i ? this.currFrame : this.currTimer + Dt.now() - this._lastTimer), 
                l;
            }
            return l = t._pool.length > 0 ? t._pool.pop() : new e(), l.repeat = n, l.userFrame = i, 
            l.delay = r, l.caller = s, l.method = a, l.args = o, l.exeTime = r + (i ? this.currFrame : this.currTimer + Dt.now() - this._lastTimer), 
            this._indexHandler(l), this._handlers.push(l), l;
        }, n._indexHandler = function(e) {
            var i = e.caller, n = e.method, r = i ? i.$_GID || (i.$_GID = ie.getGID()) : 0, s = n.$_TID || (n.$_TID = 1e5 * t._mid++);
            e.key = r + s, this._map[e.key] = e;
        }, n.once = function(t, e, i, n, r) {
            void 0 === r && (r = !0), this._create(!1, !1, t, e, i, n, r);
        }, n.loop = function(t, e, i, n, r, s) {
            void 0 === r && (r = !0), void 0 === s && (s = !1);
            var a = this._create(!1, !0, t, e, i, n, r);
            a && (a.jumpFrame = s);
        }, n.frameOnce = function(t, e, i, n, r) {
            void 0 === r && (r = !0), this._create(!0, !1, t, e, i, n, r);
        }, n.frameLoop = function(t, e, i, n, r) {
            void 0 === r && (r = !0), this._create(!0, !0, t, e, i, n, r);
        }, n.toString = function() {
            return " handlers:" + this._handlers.length + " pool:" + t._pool.length;
        }, n.clear = function(t, e) {
            var i = this._getHandler(t, e);
            i && (this._map[i.key] = null, i.key = 0, i.clear());
        }, n.clearAll = function(t) {
            if (t) for (var e = 0, i = this._handlers.length; i > e; e++) {
                var n = this._handlers[e];
                n.caller === t && (this._map[n.key] = null, n.key = 0, n.clear());
            }
        }, n._getHandler = function(e, i) {
            var n = e ? e.$_GID || (e.$_GID = ie.getGID()) : 0, r = i.$_TID || (i.$_TID = 1e5 * t._mid++);
            return this._map[n + r];
        }, n.callLater = function(t, e, i) {
            $t.I.callLater(t, e, i);
        }, n.runCallLater = function(t, e) {
            $t.I.runCallLater(t, e);
        }, n.runTimer = function(t, e) {
            var i = this._getHandler(t, e);
            i && null != i.method && (this._map[i.key] = null, i.run(!0));
        }, n.pause = function() {
            this.scale = 0;
        }, n.resume = function() {
            this.scale = 1;
        }, s(0, n, "delta", function() {
            return this._delta;
        }), t._pool = [], t._mid = 1, t.__init$ = function() {
            e = function() {
                function t() {
                    this.key = 0, this.repeat = !1, this.delay = 0, this.userFrame = !1, this.exeTime = 0, 
                    this.caller = null, this.method = null, this.args = null, this.jumpFrame = !1;
                }
                r(t, "");
                var e = t.prototype;
                return e.clear = function() {
                    this.caller = null, this.method = null, this.args = null;
                }, e.run = function(t) {
                    var e = this.caller;
                    if (e && e.destroyed) return this.clear();
                    var i = this.method, n = this.args;
                    t && this.clear(), null != i && (n ? i.apply(e, n) : i.call(e));
                }, t;
            }();
        }, t;
    }()), tt = function() {
        function t() {
            this.reset();
        }
        r(t, "laya.display.css.CacheStyle");
        var e = t.prototype;
        return e.needBitmapCache = function() {
            return this.cacheForFilters || !!this.mask;
        }, e.needEnableCanvasRender = function() {
            return "none" != this.userSetCache || this.cacheForFilters || !!this.mask;
        }, e.releaseContext = function() {
            this.canvas && this.canvas.size && (U.recover("CacheCanvas", this.canvas), this.canvas.size(0, 0), 
            this.canvas.width = 0, this.canvas.height = 0), this.canvas = null;
        }, e.createContext = function() {
            if (!this.canvas) {
                this.canvas = U.getItem("CacheCanvas") || new si(!1);
                var t = this.canvas.context;
                t || (t = this.canvas.getContext("2d"));
            }
        }, e.releaseFilterCache = function() {
            var t = this.filterCache;
            t && (t.destroy(), t.recycle(), this.filterCache = null);
        }, e.recover = function() {
            this !== t.EMPTY && U.recover("SpriteCache", this.reset());
        }, e.reset = function() {
            return this.releaseContext(), this.releaseFilterCache(), this.cacheAs = "none", 
            this.enableCanvasRender = !1, this.userSetCache = "none", this.cacheForFilters = !1, 
            this.staticCache = !1, this.reCache = !0, this.mask = null, this.maskParent = null, 
            this.filterCache = null, this.filters = null, this.hasGlowFilter = !1, this.cacheRect && this.cacheRect.recover(), 
            this.cacheRect = null, this;
        }, e._calculateCacheRect = function(e, i, n, r) {
            var s = e._cacheStyle;
            s.cacheRect || (s.cacheRect = mt.create());
            var a;
            if ("bitmap" === i ? (a = e.getSelfBounds(), a.width = a.width + 32, a.height = a.height + 32, 
            a.x = a.x - e.pivotX, a.y = a.y - e.pivotY, a.x = a.x - 16, a.y = a.y - 16, a.x = Math.floor(a.x + n) - n, 
            a.y = Math.floor(a.y + r) - r, a.width = Math.floor(a.width), a.height = Math.floor(a.height), 
            s.cacheRect.copyFrom(a)) : s.cacheRect.setTo(-e._style.pivotX, -e._style.pivotY, 1, 1), 
            a = s.cacheRect, e._style.scrollRect) {
                var o = e._style.scrollRect;
                a.x -= o.x, a.y -= o.y;
            }
            return t._scaleInfo.setTo(1, 1), t._scaleInfo;
        }, t.create = function() {
            return U.getItemByClass("SpriteCache", t);
        }, t.EMPTY = new t(), t.CANVAS_EXTEND_EDGE = 16, n(t, [ "_scaleInfo", function() {
            return this._scaleInfo = new Yt();
        } ]), t;
    }(), et = function() {
        function t() {
            this._mat = new st();
        }
        r(t, "laya.webgl.canvas.save.SaveTranslate");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            this._mat.copyTo(e._curMat), t.POOL[t.POOL._length++] = this;
        }, t.save = function(e) {
            var i = t.POOL, n = i._length > 0 ? i[--i._length] : new t();
            e._curMat.copyTo(n._mat);
            var r = e._save;
            r[r._length++] = n;
        }, t.POOL = h._createArray(), t;
    }(), it = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawLineCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("DrawLineCmd", this);
        }, e.run = function(t, e, i) {
            t._drawLine(e, i, this.fromX, this.fromY, this.toX, this.toY, this.lineColor, this.lineWidth, this.vid);
        }, s(0, e, "cmdID", function() {
            return "DrawLine";
        }), t.create = function(e, i, n, r, s, a, o) {
            var h = U.getItemByClass("DrawLineCmd", t);
            return h.fromX = e, h.fromY = i, h.toX = n, h.toY = r, h.lineColor = s, h.lineWidth = a, 
            h.vid = o, h;
        }, t.ID = "DrawLine", t;
    }(), nt = function() {
        function e() {}
        r(e, "laya.webgl.WebGLContext");
        var i = e.prototype;
        return i.getContextAttributes = function() {
            return null;
        }, i.isContextLost = function() {}, i.getSupportedExtensions = function() {
            return null;
        }, i.getExtension = function(t) {
            return null;
        }, i.activeTexture = function(t) {}, i.attachShader = function(t, e) {}, i.bindAttribLocation = function(t, e, i) {}, 
        i.bindBuffer = function(t, e) {}, i.bindFramebuffer = function(t, e) {}, i.bindRenderbuffer = function(t, e) {}, 
        i.bindTexture = function(t, e) {}, i.useTexture = function(t) {}, i.blendColor = function(t, e, i, n) {}, 
        i.blendEquation = function(t) {}, i.blendEquationSeparate = function(t, e) {}, i.blendFunc = function(t, e) {}, 
        i.blendFuncSeparate = function(t, e, i, n) {}, i.bufferData = function(t, e, i) {}, 
        i.bufferSubData = function(t, e, i) {}, i.checkFramebufferStatus = function(t) {
            return null;
        }, i.clear = function(t) {}, i.clearColor = function(t, e, i, n) {}, i.clearDepth = function(t) {}, 
        i.clearStencil = function(t) {}, i.colorMask = function(t, e, i, n) {}, i.compileShader = function(t) {}, 
        i.copyTexImage2D = function(t, e, i, n, r, s, a, o) {}, i.copyTexSubImage2D = function(t, e, i, n, r, s, a, o) {}, 
        i.createBuffer = function() {}, i.createFramebuffer = function() {}, i.createProgram = function() {}, 
        i.createRenderbuffer = function() {}, i.createShader = function(t) {}, i.createTexture = function() {
            return null;
        }, i.cullFace = function(t) {}, i.deleteBuffer = function(t) {}, i.deleteFramebuffer = function(t) {}, 
        i.deleteProgram = function(t) {}, i.deleteRenderbuffer = function(t) {}, i.deleteShader = function(t) {}, 
        i.deleteTexture = function(t) {}, i.depthFunc = function(t) {}, i.depthMask = function(t) {}, 
        i.depthRange = function(t, e) {}, i.detachShader = function(t, e) {}, i.disable = function(t) {}, 
        i.disableVertexAttribArray = function(t) {}, i.drawArrays = function(t, e, i) {}, 
        i.drawElements = function(t, e, i, n) {}, i.enable = function(t) {}, i.enableVertexAttribArray = function(t) {}, 
        i.finish = function() {}, i.flush = function() {}, i.framebufferRenderbuffer = function(t, e, i, n) {}, 
        i.framebufferTexture2D = function(t, e, i, n, r) {}, i.frontFace = function(t) {
            return null;
        }, i.generateMipmap = function(t) {
            return null;
        }, i.getActiveAttrib = function(t, e) {
            return null;
        }, i.getActiveUniform = function(t, e) {
            return null;
        }, i.getAttribLocation = function(t, e) {
            return 0;
        }, i.getParameter = function(t) {
            return null;
        }, i.getBufferParameter = function(t, e) {
            return null;
        }, i.getError = function() {
            return null;
        }, i.getFramebufferAttachmentParameter = function(t, e, i) {}, i.getProgramParameter = function(t, e) {
            return 0;
        }, i.getProgramInfoLog = function(t) {
            return null;
        }, i.getRenderbufferParameter = function(t, e) {
            return null;
        }, i.getShaderPrecisionFormat = function(t) {
            arguments;
            return null;
        }, i.getShaderParameter = function(t, e) {}, i.getShaderInfoLog = function(t) {
            return null;
        }, i.getShaderSource = function(t) {
            return null;
        }, i.getTexParameter = function(t, e) {}, i.getUniform = function(t, e) {}, i.getUniformLocation = function(t, e) {
            return null;
        }, i.getVertexAttrib = function(t, e) {
            return null;
        }, i.getVertexAttribOffset = function(t, e) {
            return null;
        }, i.hint = function(t, e) {}, i.isBuffer = function(t) {}, i.isEnabled = function(t) {}, 
        i.isFramebuffer = function(t) {}, i.isProgram = function(t) {}, i.isRenderbuffer = function(t) {}, 
        i.isShader = function(t) {}, i.isTexture = function(t) {}, i.lineWidth = function(t) {}, 
        i.linkProgram = function(t) {}, i.pixelStorei = function(t, e) {}, i.polygonOffset = function(t, e) {}, 
        i.readPixels = function(t, e, i, n, r, s, a) {}, i.renderbufferStorage = function(t, e, i, n) {}, 
        i.sampleCoverage = function(t, e) {}, i.scissor = function(t, e, i, n) {}, i.shaderSource = function(t, e) {}, 
        i.stencilFunc = function(t, e, i) {}, i.stencilFuncSeparate = function(t, e, i, n) {}, 
        i.stencilMask = function(t) {}, i.stencilMaskSeparate = function(t, e) {}, i.stencilOp = function(t, e, i) {}, 
        i.stencilOpSeparate = function(t, e, i, n) {}, i.texImage2D = function(t) {}, i.texParameterf = function(t, e, i) {}, 
        i.texParameteri = function(t, e, i) {}, i.texSubImage2D = function(t) {}, i.uniform1f = function(t, e) {}, 
        i.uniform1fv = function(t, e) {}, i.uniform1i = function(t, e) {}, i.uniform1iv = function(t, e) {}, 
        i.uniform2f = function(t, e, i) {}, i.uniform2fv = function(t, e) {}, i.uniform2i = function(t, e, i) {}, 
        i.uniform2iv = function(t, e) {}, i.uniform3f = function(t, e, i, n) {}, i.uniform3fv = function(t, e) {}, 
        i.uniform3i = function(t, e, i, n) {}, i.uniform3iv = function(t, e) {}, i.uniform4f = function(t, e, i, n, r) {}, 
        i.uniform4fv = function(t, e) {}, i.uniform4i = function(t, e, i, n, r) {}, i.uniform4iv = function(t, e) {}, 
        i.uniformMatrix2fv = function(t, e, i) {}, i.uniformMatrix3fv = function(t, e, i) {}, 
        i.uniformMatrix4fv = function(t, e, i) {}, i.useProgram = function(t) {}, i.validateProgram = function(t) {}, 
        i.vertexAttrib1f = function(t, e) {}, i.vertexAttrib1fv = function(t, e) {}, i.vertexAttrib2f = function(t, e, i) {}, 
        i.vertexAttrib2fv = function(t, e) {}, i.vertexAttrib3f = function(t, e, i, n) {}, 
        i.vertexAttrib3fv = function(t, e) {}, i.vertexAttrib4f = function(t, e, i, n, r) {}, 
        i.vertexAttrib4fv = function(t, e) {}, i.vertexAttribPointer = function(t, e, i, n, r, s) {}, 
        i.viewport = function(t, e, i, n) {}, i.configureBackBuffer = function(t, e, i, n, r) {
            void 0 === n && (n = !0), void 0 === r && (r = !1);
        }, i.compressedTexImage2D = function(t) {}, i.createVertexArray = function() {
            throw "not implemented";
        }, i.bindVertexArray = function(t) {
            throw "not implemented";
        }, i.deleteVertexArray = function(t) {
            throw "not implemented";
        }, i.isVertexArray = function(t) {
            throw "not implemented";
        }, e._forceSupportVAOPlatform = function() {
            return Dt.onMiniGame && Dt.onIOS || Dt.onBDMiniGame || Dt.onQGMiniGame;
        }, e.__init__ = function(i) {
            if (laya.webgl.WebGLContext._checkExtensions(i), !wt._isWebGL2 && !Mt.isConchApp) {
                t._setupVertexArrayObject && (e._forceSupportVAOPlatform() ? t._forceSetupVertexArrayObject(i) : t._setupVertexArrayObject(i));
                var n = (i.rawgl || i).getExtension("OES_vertex_array_object");
                if (n) {
                    var r = i;
                    r.createVertexArray = function() {
                        return n.createVertexArrayOES();
                    }, r.bindVertexArray = function(t) {
                        n.bindVertexArrayOES(t);
                    }, r.deleteVertexArray = function(t) {
                        n.deleteVertexArrayOES(t);
                    }, r.isVertexArray = function(t) {
                        n.isVertexArrayOES(t);
                    };
                }
            }
        }, e._getExtension = function(t, i) {
            var n = e._extentionVendorPrefixes;
            for (var r in n) {
                var s = t.getExtension(n[r] + i);
                if (s) return s;
            }
            return null;
        }, e._checkExtensions = function(t) {
            e._extTextureFilterAnisotropic = e._getExtension(t, "EXT_texture_filter_anisotropic"), 
            e._compressedTextureS3tc = e._getExtension(t, "WEBGL_compressed_texture_s3tc"), 
            e._compressedTexturePvrtc = e._getExtension(t, "WEBGL_compressed_texture_pvrtc"), 
            e._compressedTextureEtc1 = e._getExtension(t, "WEBGL_compressed_texture_etc1"), 
            e._forceSupportVAOPlatform() || (e._angleInstancedArrays = e._getExtension(t, "ANGLE_instanced_arrays"));
        }, e.__init_native = function() {
            if (Mt.supportWebGLPlusRendering) {
                var t = e;
                t.activeTexture = t.activeTextureForNative, t.bindTexture = t.bindTextureForNative;
            }
        }, e.useProgram = function(t, i) {
            return e._useProgram === i ? !1 : (t.useProgram(i), e._useProgram = i, !0);
        }, e.setDepthTest = function(t, i) {
            i !== e._depthTest && (e._depthTest = i, i ? t.enable(2929) : t.disable(2929));
        }, e.setDepthMask = function(t, i) {
            i !== e._depthMask && (e._depthMask = i, t.depthMask(i));
        }, e.setDepthFunc = function(t, i) {
            i !== e._depthFunc && (e._depthFunc = i, t.depthFunc(i));
        }, e.setBlend = function(t, i) {
            i !== e._blend && (e._blend = i, i ? t.enable(3042) : t.disable(3042));
        }, e.setBlendFunc = function(t, i, n) {
            (i !== e._sFactor || n !== e._dFactor) && (e._sFactor = e._srcAlpha = i, e._dFactor = e._dstAlpha = n, 
            t.blendFunc(i, n));
        }, e.setBlendFuncSeperate = function(t, i, n, r, s) {
            (i !== e._sFactor || n !== e._dFactor || r !== e._srcAlpha || s !== e._dstAlpha) && (e._sFactor = i, 
            e._dFactor = n, e._srcAlpha = r, e._dstAlpha = s, t.blendFuncSeparate(i, n, r, s));
        }, e.setCullFace = function(t, i) {
            i !== e._cullFace && (e._cullFace = i, i ? t.enable(2884) : t.disable(2884));
        }, e.setFrontFace = function(t, i) {
            i !== e._frontFace && (e._frontFace = i, t.frontFace(i));
        }, e.activeTexture = function(t, i) {
            e._activedTextureID !== i && (t.activeTexture(i), e._activedTextureID = i);
        }, e.bindTexture = function(t, i, n) {
            e._activeTextures[e._activedTextureID - 33984] !== n && (t.bindTexture(i, n), e._activeTextures[e._activedTextureID - 33984] = n);
        }, e.useProgramForNative = function(t, e) {
            return t.useProgram(e), !0;
        }, e.setDepthTestForNative = function(t, e) {
            e ? t.enable(2929) : t.disable(2929);
        }, e.setDepthMaskForNative = function(t, e) {
            t.depthMask(e);
        }, e.setDepthFuncForNative = function(t, e) {
            t.depthFunc(e);
        }, e.setBlendForNative = function(t, e) {
            e ? t.enable(3042) : t.disable(3042);
        }, e.setBlendFuncForNative = function(t, e, i) {
            t.blendFunc(e, i);
        }, e.setCullFaceForNative = function(t, e) {
            e ? t.enable(2884) : t.disable(2884);
        }, e.setFrontFaceForNative = function(t, e) {
            t.frontFace(e);
        }, e.activeTextureForNative = function(t, e) {
            t.activeTexture(e);
        }, e.bindTextureForNative = function(t, e, i) {
            t.bindTexture(e, i);
        }, e.bindVertexArrayForNative = function(t, e) {
            t.bindVertexArray(e);
        }, e.DEPTH_BUFFER_BIT = 256, e.STENCIL_BUFFER_BIT = 1024, e.COLOR_BUFFER_BIT = 16384, 
        e.POINTS = 0, e.LINES = 1, e.LINE_LOOP = 2, e.LINE_STRIP = 3, e.TRIANGLES = 4, e.TRIANGLE_STRIP = 5, 
        e.TRIANGLE_FAN = 6, e.ZERO = 0, e.ONE = 1, e.SRC_COLOR = 768, e.ONE_MINUS_SRC_COLOR = 769, 
        e.SRC_ALPHA = 770, e.ONE_MINUS_SRC_ALPHA = 771, e.DST_ALPHA = 772, e.ONE_MINUS_DST_ALPHA = 773, 
        e.DST_COLOR = 774, e.ONE_MINUS_DST_COLOR = 775, e.SRC_ALPHA_SATURATE = 776, e.FUNC_ADD = 32774, 
        e.BLEND_EQUATION = 32777, e.BLEND_EQUATION_RGB = 32777, e.BLEND_EQUATION_ALPHA = 34877, 
        e.FUNC_SUBTRACT = 32778, e.FUNC_REVERSE_SUBTRACT = 32779, e.BLEND_DST_RGB = 32968, 
        e.BLEND_SRC_RGB = 32969, e.BLEND_DST_ALPHA = 32970, e.BLEND_SRC_ALPHA = 32971, e.CONSTANT_COLOR = 32769, 
        e.ONE_MINUS_CONSTANT_COLOR = 32770, e.CONSTANT_ALPHA = 32771, e.ONE_MINUS_CONSTANT_ALPHA = 32772, 
        e.BLEND_COLOR = 32773, e.ARRAY_BUFFER = 34962, e.ELEMENT_ARRAY_BUFFER = 34963, e.ARRAY_BUFFER_BINDING = 34964, 
        e.ELEMENT_ARRAY_BUFFER_BINDING = 34965, e.STREAM_DRAW = 35040, e.STATIC_DRAW = 35044, 
        e.DYNAMIC_DRAW = 35048, e.BUFFER_SIZE = 34660, e.BUFFER_USAGE = 34661, e.CURRENT_VERTEX_ATTRIB = 34342, 
        e.FRONT = 1028, e.BACK = 1029, e.CULL_FACE = 2884, e.FRONT_AND_BACK = 1032, e.BLEND = 3042, 
        e.DITHER = 3024, e.STENCIL_TEST = 2960, e.DEPTH_TEST = 2929, e.SCISSOR_TEST = 3089, 
        e.POLYGON_OFFSET_FILL = 32823, e.SAMPLE_ALPHA_TO_COVERAGE = 32926, e.SAMPLE_COVERAGE = 32928, 
        e.NO_ERROR = 0, e.INVALID_ENUM = 1280, e.INVALID_VALUE = 1281, e.INVALID_OPERATION = 1282, 
        e.OUT_OF_MEMORY = 1285, e.CW = 2304, e.CCW = 2305, e.LINE_WIDTH = 2849, e.ALIASED_POINT_SIZE_RANGE = 33901, 
        e.ALIASED_LINE_WIDTH_RANGE = 33902, e.CULL_FACE_MODE = 2885, e.FRONT_FACE = 2886, 
        e.DEPTH_RANGE = 2928, e.DEPTH_WRITEMASK = 2930, e.DEPTH_CLEAR_VALUE = 2931, e.DEPTH_FUNC = 2932, 
        e.STENCIL_CLEAR_VALUE = 2961, e.STENCIL_FUNC = 2962, e.STENCIL_FAIL = 2964, e.STENCIL_PASS_DEPTH_FAIL = 2965, 
        e.STENCIL_PASS_DEPTH_PASS = 2966, e.STENCIL_REF = 2967, e.STENCIL_VALUE_MASK = 2963, 
        e.STENCIL_WRITEMASK = 2968, e.STENCIL_BACK_FUNC = 34816, e.STENCIL_BACK_FAIL = 34817, 
        e.STENCIL_BACK_PASS_DEPTH_FAIL = 34818, e.STENCIL_BACK_PASS_DEPTH_PASS = 34819, 
        e.STENCIL_BACK_REF = 36003, e.STENCIL_BACK_VALUE_MASK = 36004, e.STENCIL_BACK_WRITEMASK = 36005, 
        e.VIEWPORT = 2978, e.SCISSOR_BOX = 3088, e.COLOR_CLEAR_VALUE = 3106, e.COLOR_WRITEMASK = 3107, 
        e.UNPACK_ALIGNMENT = 3317, e.PACK_ALIGNMENT = 3333, e.MAX_TEXTURE_SIZE = 3379, e.MAX_VIEWPORT_DIMS = 3386, 
        e.SUBPIXEL_BITS = 3408, e.RED_BITS = 3410, e.GREEN_BITS = 3411, e.BLUE_BITS = 3412, 
        e.ALPHA_BITS = 3413, e.DEPTH_BITS = 3414, e.STENCIL_BITS = 3415, e.POLYGON_OFFSET_UNITS = 10752, 
        e.POLYGON_OFFSET_FACTOR = 32824, e.TEXTURE_BINDING_2D = 32873, e.SAMPLE_BUFFERS = 32936, 
        e.SAMPLES = 32937, e.SAMPLE_COVERAGE_VALUE = 32938, e.SAMPLE_COVERAGE_INVERT = 32939, 
        e.NUM_COMPRESSED_TEXTURE_FORMATS = 34466, e.COMPRESSED_TEXTURE_FORMATS = 34467, 
        e.DONT_CARE = 4352, e.FASTEST = 4353, e.NICEST = 4354, e.GENERATE_MIPMAP_HINT = 33170, 
        e.BYTE = 5120, e.UNSIGNED_BYTE = 5121, e.SHORT = 5122, e.UNSIGNED_SHORT = 5123, 
        e.INT = 5124, e.UNSIGNED_INT = 5125, e.FLOAT = 5126, e.DEPTH_COMPONENT = 6402, e.ALPHA = 6406, 
        e.RGB = 6407, e.RGBA = 6408, e.LUMINANCE = 6409, e.LUMINANCE_ALPHA = 6410, e.UNSIGNED_SHORT_4_4_4_4 = 32819, 
        e.UNSIGNED_SHORT_5_5_5_1 = 32820, e.UNSIGNED_SHORT_5_6_5 = 33635, e.FRAGMENT_SHADER = 35632, 
        e.VERTEX_SHADER = 35633, e.MAX_VERTEX_ATTRIBS = 34921, e.MAX_VERTEX_UNIFORM_VECTORS = 36347, 
        e.MAX_VARYING_VECTORS = 36348, e.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661, e.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660, 
        e.MAX_TEXTURE_IMAGE_UNITS = 34930, e.MAX_FRAGMENT_UNIFORM_VECTORS = 36349, e.SHADER_TYPE = 35663, 
        e.DELETE_STATUS = 35712, e.LINK_STATUS = 35714, e.VALIDATE_STATUS = 35715, e.ATTACHED_SHADERS = 35717, 
        e.ACTIVE_UNIFORMS = 35718, e.ACTIVE_ATTRIBUTES = 35721, e.SHADING_LANGUAGE_VERSION = 35724, 
        e.CURRENT_PROGRAM = 35725, e.NEVER = 512, e.LESS = 513, e.EQUAL = 514, e.LEQUAL = 515, 
        e.GREATER = 516, e.NOTEQUAL = 517, e.GEQUAL = 518, e.ALWAYS = 519, e.KEEP = 7680, 
        e.REPLACE = 7681, e.INCR = 7682, e.DECR = 7683, e.INVERT = 5386, e.INCR_WRAP = 34055, 
        e.DECR_WRAP = 34056, e.VENDOR = 7936, e.RENDERER = 7937, e.VERSION = 7938, e.NEAREST = 9728, 
        e.LINEAR = 9729, e.NEAREST_MIPMAP_NEAREST = 9984, e.LINEAR_MIPMAP_NEAREST = 9985, 
        e.NEAREST_MIPMAP_LINEAR = 9986, e.LINEAR_MIPMAP_LINEAR = 9987, e.TEXTURE_MAG_FILTER = 10240, 
        e.TEXTURE_MIN_FILTER = 10241, e.TEXTURE_WRAP_S = 10242, e.TEXTURE_WRAP_T = 10243, 
        e.TEXTURE_2D = 3553, e.TEXTURE_3D = 32879, e.TEXTURE = 5890, e.TEXTURE_CUBE_MAP = 34067, 
        e.TEXTURE_BINDING_CUBE_MAP = 34068, e.TEXTURE_CUBE_MAP_POSITIVE_X = 34069, e.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070, 
        e.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071, e.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072, e.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073, 
        e.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074, e.MAX_CUBE_MAP_TEXTURE_SIZE = 34076, e.TEXTURE0 = 33984, 
        e.TEXTURE1 = 33985, e.TEXTURE2 = 33986, e.TEXTURE3 = 33987, e.TEXTURE4 = 33988, 
        e.TEXTURE5 = 33989, e.TEXTURE6 = 33990, e.TEXTURE7 = 33991, e.TEXTURE8 = 33992, 
        e.TEXTURE9 = 33993, e.TEXTURE10 = 33994, e.TEXTURE11 = 33995, e.TEXTURE12 = 33996, 
        e.TEXTURE13 = 33997, e.TEXTURE14 = 33998, e.TEXTURE15 = 33999, e.TEXTURE16 = 34e3, 
        e.TEXTURE17 = 34001, e.TEXTURE18 = 34002, e.TEXTURE19 = 34003, e.TEXTURE20 = 34004, 
        e.TEXTURE21 = 34005, e.TEXTURE22 = 34006, e.TEXTURE23 = 34007, e.TEXTURE24 = 34008, 
        e.TEXTURE25 = 34009, e.TEXTURE26 = 34010, e.TEXTURE27 = 34011, e.TEXTURE28 = 34012, 
        e.TEXTURE29 = 34013, e.TEXTURE30 = 34014, e.TEXTURE31 = 34015, e.ACTIVE_TEXTURE = 34016, 
        e.REPEAT = 10497, e.CLAMP_TO_EDGE = 33071, e.MIRRORED_REPEAT = 33648, e.FLOAT_VEC2 = 35664, 
        e.FLOAT_VEC3 = 35665, e.FLOAT_VEC4 = 35666, e.INT_VEC2 = 35667, e.INT_VEC3 = 35668, 
        e.INT_VEC4 = 35669, e.BOOL = 35670, e.BOOL_VEC2 = 35671, e.BOOL_VEC3 = 35672, e.BOOL_VEC4 = 35673, 
        e.FLOAT_MAT2 = 35674, e.FLOAT_MAT3 = 35675, e.FLOAT_MAT4 = 35676, e.SAMPLER_2D = 35678, 
        e.SAMPLER_CUBE = 35680, e.VERTEX_ATTRIB_ARRAY_ENABLED = 34338, e.VERTEX_ATTRIB_ARRAY_SIZE = 34339, 
        e.VERTEX_ATTRIB_ARRAY_STRIDE = 34340, e.VERTEX_ATTRIB_ARRAY_TYPE = 34341, e.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922, 
        e.VERTEX_ATTRIB_ARRAY_POINTER = 34373, e.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975, 
        e.COMPILE_STATUS = 35713, e.LOW_FLOAT = 36336, e.MEDIUM_FLOAT = 36337, e.HIGH_FLOAT = 36338, 
        e.LOW_INT = 36339, e.MEDIUM_INT = 36340, e.HIGH_INT = 36341, e.FRAMEBUFFER = 36160, 
        e.RENDERBUFFER = 36161, e.RGBA4 = 32854, e.RGB5_A1 = 32855, e.RGB565 = 36194, e.DEPTH_COMPONENT16 = 33189, 
        e.STENCIL_INDEX = 6401, e.STENCIL_INDEX8 = 36168, e.DEPTH_STENCIL = 34041, e.RENDERBUFFER_WIDTH = 36162, 
        e.RENDERBUFFER_HEIGHT = 36163, e.RENDERBUFFER_INTERNAL_FORMAT = 36164, e.RENDERBUFFER_RED_SIZE = 36176, 
        e.RENDERBUFFER_GREEN_SIZE = 36177, e.RENDERBUFFER_BLUE_SIZE = 36178, e.RENDERBUFFER_ALPHA_SIZE = 36179, 
        e.RENDERBUFFER_DEPTH_SIZE = 36180, e.RENDERBUFFER_STENCIL_SIZE = 36181, e.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048, 
        e.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049, e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050, 
        e.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051, e.COLOR_ATTACHMENT0 = 36064, 
        e.DEPTH_ATTACHMENT = 36096, e.STENCIL_ATTACHMENT = 36128, e.DEPTH_STENCIL_ATTACHMENT = 33306, 
        e.NONE = 0, e.FRAMEBUFFER_COMPLETE = 36053, e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054, 
        e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055, e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057, 
        e.FRAMEBUFFER_UNSUPPORTED = 36061, e.FRAMEBUFFER_BINDING = 36006, e.RENDERBUFFER_BINDING = 36007, 
        e.MAX_RENDERBUFFER_SIZE = 34024, e.INVALID_FRAMEBUFFER_OPERATION = 1286, e.UNPACK_FLIP_Y_WEBGL = 37440, 
        e.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441, e.CONTEXT_LOST_WEBGL = 37442, e.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443, 
        e.BROWSER_DEFAULT_WEBGL = 37444, e._extTextureFilterAnisotropic = null, e._compressedTextureS3tc = null, 
        e._compressedTexturePvrtc = null, e._compressedTextureEtc1 = null, e._angleInstancedArrays = null, 
        e._glTextureIDs = [ 33984, 33985, 33986, 33987, 33988, 33989, 33990, 33991 ], e._useProgram = null, 
        e._depthTest = !0, e._depthMask = !0, e._blend = !1, e._cullFace = !1, e._activedTextureID = 33984, 
        n(e, [ "_extentionVendorPrefixes", function() {
            return this._extentionVendorPrefixes = [ "", "WEBKIT_", "MOZ_" ];
        }, "_activeTextures", function() {
            return this._activeTextures = new Array(8);
        }, "_depthFunc", function() {
            return this._depthFunc = 513;
        }, "_sFactor", function() {
            return this._sFactor = 1;
        }, "_dFactor", function() {
            return this._dFactor = 0;
        }, "_srcAlpha", function() {
            return this._srcAlpha = 1;
        }, "_dstAlpha", function() {
            return this._dstAlpha = 0;
        }, "_frontFace", function() {
            return this._frontFace = 2305;
        } ]), e;
    }(), rt = (function() {
        function t() {}
        return r(t, "laya.net.ResourceVersion"), t.enable = function(e, n, r) {
            void 0 === r && (r = 2), laya.net.ResourceVersion.type = r, i.loader.load(e, g.create(null, t.onManifestLoaded, [ n ]), null, "json"), 
            q.customFormat = t.addVersionPrefix;
        }, t.onManifestLoaded = function(e, i) {
            t.manifest = i, e.run(), i || console.warn("资源版本清单文件不存在，不使用资源版本管理。忽略ERR_FILE_NOT_FOUND错误。");
        }, t.addVersionPrefix = function(e) {
            return e = q.getAdptedFilePath(e), t.manifest && t.manifest[e] ? 2 == t.type ? t.manifest[e] : t.manifest[e] + "/" + e : e;
        }, t.FOLDER_VERSION = 1, t.FILENAME_VERSION = 2, t.manifest = null, t.type = 1, 
        t;
    }(), function() {
        function t() {}
        r(t, "laya.display.cmd.FillWordsCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.words = null, U.recover("FillWordsCmd", this);
        }, e.run = function(t, e, i) {
            t.fillWords(this.words, this.x + e, this.y + i, this.font, this.color);
        }, s(0, e, "cmdID", function() {
            return "FillWords";
        }), t.create = function(e, i, n, r, s) {
            var a = U.getItemByClass("FillWordsCmd", t);
            return a.words = e, a.x = i, a.y = n, a.font = r, a.color = s, a;
        }, t.ID = "FillWords", t;
    }()), st = function() {
        function t(e, i, n, r, s, a, o) {
            return this._bTransform = !1, void 0 === e && (e = 1), void 0 === i && (i = 0), 
            void 0 === n && (n = 0), void 0 === r && (r = 1), void 0 === s && (s = 0), void 0 === a && (a = 0), 
            void 0 === o && (o = 0), null != t._createFun ? t._createFun(e, i, n, r, s, a, o) : (this.a = e, 
            this.b = i, this.c = n, this.d = r, this.tx = s, this.ty = a, void this._checkTransform());
        }
        r(t, "laya.maths.Matrix");
        var e = t.prototype;
        return e.identity = function() {
            return this.a = this.d = 1, this.b = this.tx = this.ty = this.c = 0, this._bTransform = !1, 
            this;
        }, e._checkTransform = function() {
            return this._bTransform = 1 !== this.a || 0 !== this.b || 0 !== this.c || 1 !== this.d;
        }, e.setTranslate = function(t, e) {
            return this.tx = t, this.ty = e, this;
        }, e.translate = function(t, e) {
            return this.tx += t, this.ty += e, this;
        }, e.scale = function(t, e) {
            return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, 
            this._bTransform = !0, this;
        }, e.rotate = function(t) {
            var e = Math.cos(t), i = Math.sin(t), n = this.a, r = this.c, s = this.tx;
            return this.a = n * e - this.b * i, this.b = n * i + this.b * e, this.c = r * e - this.d * i, 
            this.d = r * i + this.d * e, this.tx = s * e - this.ty * i, this.ty = s * i + this.ty * e, 
            this._bTransform = !0, this;
        }, e.skew = function(t, e) {
            var i = Math.tan(t), n = Math.tan(e), r = this.a, s = this.b;
            return this.a += n * this.c, this.b += n * this.d, this.c += i * r, this.d += i * s, 
            this;
        }, e.invertTransformPoint = function(t) {
            var e = this.a, i = this.b, n = this.c, r = this.d, s = this.tx, a = e * r - i * n, o = r / a, h = -i / a, l = -n / a, u = e / a, c = (n * this.ty - r * s) / a, _ = -(e * this.ty - i * s) / a;
            return t.setTo(o * t.x + l * t.y + c, h * t.x + u * t.y + _);
        }, e.transformPoint = function(t) {
            return t.setTo(this.a * t.x + this.c * t.y + this.tx, this.b * t.x + this.d * t.y + this.ty);
        }, e.transformPointN = function(t) {
            return t.setTo(this.a * t.x + this.c * t.y, this.b * t.x + this.d * t.y);
        }, e.getScaleX = function() {
            return 0 === this.b ? this.a : Math.sqrt(this.a * this.a + this.b * this.b);
        }, e.getScaleY = function() {
            return 0 === this.c ? this.d : Math.sqrt(this.c * this.c + this.d * this.d);
        }, e.invert = function() {
            var t = this.a, e = this.b, i = this.c, n = this.d, r = this.tx, s = t * n - e * i;
            return this.a = n / s, this.b = -e / s, this.c = -i / s, this.d = t / s, this.tx = (i * this.ty - n * r) / s, 
            this.ty = -(t * this.ty - e * r) / s, this;
        }, e.setTo = function(t, e, i, n, r, s) {
            return this.a = t, this.b = e, this.c = i, this.d = n, this.tx = r, this.ty = s, 
            this;
        }, e.concat = function(t) {
            var e = this.a, i = this.c, n = this.tx;
            return this.a = e * t.a + this.b * t.c, this.b = e * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, 
            this.d = i * t.b + this.d * t.d, this.tx = n * t.a + this.ty * t.c + t.tx, this.ty = n * t.b + this.ty * t.d + t.ty, 
            this;
        }, e.scaleEx = function(t, e) {
            var i = this.a, n = this.b, r = this.c, s = this.d;
            0 !== n || 0 !== r ? (this.a = t * i, this.b = t * n, this.c = e * r, this.d = e * s) : (this.a = t * i, 
            this.b = 0 * s, this.c = 0 * i, this.d = e * s), this._bTransform = !0;
        }, e.rotateEx = function(t) {
            var e = Math.cos(t), i = Math.sin(t), n = this.a, r = this.b, s = this.c, a = this.d;
            0 !== r || 0 !== s ? (this.a = e * n + i * s, this.b = e * r + i * a, this.c = -i * n + e * s, 
            this.d = -i * r + e * a) : (this.a = e * n, this.b = i * a, this.c = -i * n, this.d = e * a), 
            this._bTransform = !0;
        }, e.clone = function() {
            var e = t.create();
            return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, 
            e._bTransform = this._bTransform, e;
        }, e.copyTo = function(t) {
            return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, 
            t._bTransform = this._bTransform, t;
        }, e.toString = function() {
            return this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.tx + "," + this.ty;
        }, e.destroy = function() {
            this.recover();
        }, e.recover = function() {
            U.recover("Matrix", this.identity());
        }, t.mul = function(t, e, i) {
            var n = t.a, r = t.b, s = t.c, a = t.d, o = t.tx, h = t.ty, l = e.a, u = e.b, c = e.c, _ = e.d, d = e.tx, f = e.ty;
            return 0 !== u || 0 !== c ? (i.a = n * l + r * c, i.b = n * u + r * _, i.c = s * l + a * c, 
            i.d = s * u + a * _, i.tx = l * o + c * h + d, i.ty = u * o + _ * h + f) : (i.a = n * l, 
            i.b = r * _, i.c = s * l, i.d = a * _, i.tx = l * o + d, i.ty = _ * h + f), i;
        }, t.mul16 = function(t, e, i) {
            var n = t.a, r = t.b, s = t.c, a = t.d, o = t.tx, h = t.ty, l = e.a, u = e.b, c = e.c, _ = e.d, d = e.tx, f = e.ty;
            return 0 !== u || 0 !== c ? (i[0] = n * l + r * c, i[1] = n * u + r * _, i[4] = s * l + a * c, 
            i[5] = s * u + a * _, i[12] = l * o + c * h + d, i[13] = u * o + _ * h + f) : (i[0] = n * l, 
            i[1] = r * _, i[4] = s * l, i[5] = a * _, i[12] = l * o + d, i[13] = _ * h + f), 
            i;
        }, t.create = function() {
            return U.getItemByClass("Matrix", t);
        }, t.EMPTY = new t(), t.TEMP = new t(), t._createFun = null, t;
    }(), at = function() {
        function t(t, e, i, n) {
            this.id = 0, this.name = null, this.color = 0, this.scale = 1, this.datapos = 0, 
            this.datas = new Array(oi.DATANUM), this.id = t, this.color = e, this.name = i, 
            this.scale = n;
        }
        r(t, "laya.utils.PerfData");
        var e = t.prototype;
        return e.addData = function(t) {
            this.datas[this.datapos] = t, this.datapos++, this.datapos %= oi.DATANUM;
        }, t;
    }(), ot = function() {
        function t() {}
        r(t, "laya.display.cmd.TransformCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.matrix = null, U.recover("TransformCmd", this);
        }, e.run = function(t, e, i) {
            t._transform(this.matrix, this.pivotX + e, this.pivotY + i);
        }, s(0, e, "cmdID", function() {
            return "Transform";
        }), t.create = function(e, i, n) {
            var r = U.getItemByClass("TransformCmd", t);
            return r.matrix = e, r.pivotX = i, r.pivotY = n, r;
        }, t.ID = "Transform", t;
    }(), ht = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawTexturesCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.texture._removeReference(), this.texture = null, this.pos = null, U.recover("DrawTexturesCmd", this);
        }, e.run = function(t, e, i) {
            t.drawTextures(this.texture, this.pos, e, i);
        }, s(0, e, "cmdID", function() {
            return "DrawTextures";
        }), t.create = function(e, i) {
            var n = U.getItemByClass("DrawTexturesCmd", t);
            return n.texture = e, e._addReference(), n.pos = i, n;
        }, t.ID = "DrawTextures", t;
    }(), lt = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawCircleCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.fillColor = null, this.lineColor = null, U.recover("DrawCircleCmd", this);
        }, e.run = function(t, e, i) {
            t._drawCircle(this.x + e, this.y + i, this.radius, this.fillColor, this.lineColor, this.lineWidth, this.vid);
        }, s(0, e, "cmdID", function() {
            return "DrawCircle";
        }), t.create = function(e, i, n, r, s, a, o) {
            var h = U.getItemByClass("DrawCircleCmd", t);
            return h.x = e, h.y = i, h.radius = n, h.fillColor = r, h.lineColor = s, h.lineWidth = a, 
            h.vid = o, h;
        }, t.ID = "DrawCircle", t;
    }(), ut = function() {
        function t() {
            if (this._drawTriUseAbsMatrix = !1, this._id = ++t._COUNT, this._other = null, this._renderNextSubmitIndex = 0, 
            this._path = null, this._drawCount = 1, this._renderCount = 0, this._isConvexCmd = !0, 
            this._submits = null, this._curSubmit = null, this._mesh = null, this._pathMesh = null, 
            this._triangleMesh = null, this.meshlist = [], this._clipInCache = !1, this._clipInfoID = 0, 
            this._curMat = null, this._lastMatScaleX = 1, this._lastMatScaleY = 1, this._lastMat_a = 1, 
            this._lastMat_b = 0, this._lastMat_c = 0, this._lastMat_d = 1, this._nBlendType = 0, 
            this._save = null, this._targets = null, this._charSubmitCache = null, this._saveMark = null, 
            this.sprite = null, this._italicDeg = 0, this._lastTex = null, this._fillColor = 0, 
            this._flushCnt = 0, this.defTexture = null, this._colorFiler = null, this.drawTexAlign = !1, 
            this._incache = !1, this.isMain = !1, this._tmpMatrix = new st(), this._drawTexToDrawTri_Vert = new Float32Array(8), 
            this._drawTexToDrawTri_Index = new Uint16Array([ 0, 1, 2, 0, 2, 3 ]), this._tempUV = new Float32Array(8), 
            this._width = 99999999, this._height = 99999999, this._submitKey = new k(), this._transedPoints = new Array(8), 
            this._temp4Points = new Array(8), this._clipRect = t.MAXCLIPRECT, this._globalClipMatrix = new st(99999999, 0, 0, 99999999, 0, 0), 
            this._shader2D = new F(), t._contextcount++, !this.defTexture) {
                var e = new _i(2, 2);
                e.setPixels(new Uint8Array(16)), e.lock = !0, this.defTexture = new Ie(e);
            }
            this._lastTex = this.defTexture, this.clear();
        }
        var e;
        r(t, "laya.resource.Context");
        var a = t.prototype;
        return a.drawImage = function(t) {}, a.getImageData = function(t) {}, a.measureText = function(t) {
            return null;
        }, a.setTransform = function(t) {}, a.$transform = function(t, e, i, n, r, s) {}, 
        a.clearRect = function(t, e, i, n) {}, a._drawRect = function(t, e, i, n, r) {
            A.renderBatches++, r && (this.fillStyle = r), this.fillRect(t, e, i, n);
        }, a.drawTexture2 = function(t, e, i, n, r, s) {}, a.transformByMatrix = function(t, e, i) {
            this.transform(t.a, t.b, t.c, t.d, t.tx + e, t.ty + i);
        }, a.saveTransform = function(t) {
            this.save();
        }, a.restoreTransform = function(t) {
            this.restore();
        }, a.drawRect = function(t, e, i, n, r, s, a) {
            var o = this;
            null != r && (o.fillStyle = r, o.fillRect(t, e, i, n)), null != s && (o.strokeStyle = s, 
            o.lineWidth = a, o.strokeRect(t, e, i, n));
        }, a.alpha = function(t) {
            this.globalAlpha *= t;
        }, a._transform = function(t, e, i) {
            this.translate(e, i), this.transform(t.a, t.b, t.c, t.d, t.tx, t.ty), this.translate(-e, -i);
        }, a._rotate = function(t, e, i) {
            this.translate(e, i), this.rotate(t), this.translate(-e, -i);
        }, a._scale = function(t, e, i, n) {
            this.translate(i, n), this.scale(t, e), this.translate(-i, -n);
        }, a._drawLine = function(t, e, i, n, r, s, a, o, h) {
            this.beginPath(), this.strokeStyle = a, this.lineWidth = o, this.moveTo(t + i, e + n), 
            this.lineTo(t + r, e + s), this.stroke();
        }, a._drawLines = function(t, e, i, n, r, s) {
            this.beginPath(), this.strokeStyle = n, this.lineWidth = r;
            i.length;
            this.addPath(i.slice(), !1, !1, t, e), this.stroke();
        }, a.drawCurves = function(t, e, i, n, r) {
            this.beginPath(), this.strokeStyle = n, this.lineWidth = r, this.moveTo(t + i[0], e + i[1]);
            for (var s = 2, a = i.length; a > s; ) this.quadraticCurveTo(t + i[s++], e + i[s++], t + i[s++], e + i[s++]);
            this.stroke();
        }, a._fillAndStroke = function(t, e, i, n) {
            void 0 === n && (n = !1), null != t && (this.fillStyle = t, this.fill()), null != e && i > 0 && (this.strokeStyle = e, 
            this.lineWidth = i, this.stroke());
        }, a._drawCircle = function(e, i, n, r, s, a, o) {
            A.renderBatches++, this.beginPath(!0), this.arc(e, i, n, 0, t.PI2), this.closePath(), 
            this._fillAndStroke(r, s, a);
        }, a._drawPie = function(t, e, i, n, r, s, a, o, h) {
            this.beginPath(), this.moveTo(t, e), this.arc(t, e, i, n, r), this.closePath(), 
            this._fillAndStroke(s, a, o);
        }, a._drawPoly = function(t, e, i, n, r, s, a, o) {
            i.length;
            this.beginPath(), this.addPath(i.slice(), !0, a, t, e), this.closePath(), this._fillAndStroke(n, r, s, a);
        }, a._drawPath = function(t, e, i, n, r) {
            this.beginPath();
            for (var s = 0, a = i.length; a > s; s++) {
                var o = i[s];
                switch (o[0]) {
                  case "moveTo":
                    this.moveTo(t + o[1], e + o[2]);
                    break;

                  case "lineTo":
                    this.lineTo(t + o[1], e + o[2]);
                    break;

                  case "arcTo":
                    this.arcTo(t + o[1], e + o[2], t + o[3], e + o[4], o[5]);
                    break;

                  case "closePath":
                    this.closePath();
                }
            }
            null != n && (this.fillStyle = n.fillStyle, this.fill()), null != r && (this.strokeStyle = r.strokeStyle, 
            this.lineWidth = r.lineWidth || 1, this.lineJoin = r.lineJoin, this.lineCap = r.lineCap, 
            this.miterLimit = r.miterLimit, this.stroke());
        }, a.clearBG = function(t, e, i, n) {
            var r = wt.mainContext;
            r.clearColor(t, e, i, n), r.clear(16384);
        }, a._getSubmits = function() {
            return this._submits;
        }, a._releaseMem = function(t) {
            if (void 0 === t && (t = !1), this._submits) {
                this._curMat.destroy(), this._curMat = null, this._shader2D.destroy(), this._shader2D = null, 
                this._charSubmitCache.clear();
                for (var e = 0, i = this._submits._length; i > e; e++) this._submits[e].releaseRender();
                this._submits.length = 0, this._submits._length = 0, this._submits = null, this._curSubmit = null, 
                this._path = null, this._save = null;
                var n = 0;
                for (e = 0, n = this.meshlist.length; n > e; e++) {
                    var r = this.meshlist[e];
                    r.destroy();
                }
                this.meshlist.length = 0, this.sprite = null, t || (this._targets && this._targets.destroy(), 
                this._targets = null);
            }
        }, a.destroy = function(e) {
            void 0 === e && (e = !1), --t._contextcount, this.sprite = null, this._releaseMem(e), 
            this._charSubmitCache.destroy(), this._mesh.destroy(), e || (this._targets && this._targets.destroy(), 
            this._targets = null);
        }, a.clear = function() {
            this._submits || (this._other = e.DEFAULT, this._curMat = st.create(), this._charSubmitCache = new re(), 
            this._mesh = Be.getAMesh(this.isMain), this.meshlist.push(this._mesh), this._pathMesh = Se.getAMesh(this.isMain), 
            this.meshlist.push(this._pathMesh), this._triangleMesh = ke.getAMesh(this.isMain), 
            this.meshlist.push(this._triangleMesh), this._submits = [], this._save = [ H.Create(this) ], 
            this._save.length = 10, this._shader2D = new F()), this._submitKey.clear(), this._mesh.clearVB(), 
            this._renderCount++, this._drawCount = 1, this._other = e.DEFAULT, this._other.lineWidth = this._shader2D.ALPHA = 1, 
            this._nBlendType = 0, this._clipRect = t.MAXCLIPRECT, this._curSubmit = l.RENDERBASE, 
            l.RENDERBASE._ref = 16777215, l.RENDERBASE._numEle = 0, this._shader2D.fillStyle = this._shader2D.strokeStyle = Et.DEFAULT;
            for (var i = 0, n = this._submits._length; n > i; i++) this._submits[i].releaseRender();
            this._submits._length = 0, this._curMat.identity(), this._other.clear(), this._saveMark = this._save[0], 
            this._save._length = 1;
        }, a.size = function(t, e) {
            (this._width != t || this._height != e) && (this._width = t, this._height = e, this._targets && (this._targets.destroy(), 
            this._targets = new di(t, e, 1, -1)), Mt._context == this && (wt.mainContext.viewport(0, 0, t, e), 
            ft.width = t, ft.height = e)), 0 === t && 0 === e && this._releaseMem();
        }, a.getMatScaleX = function() {
            return this._lastMat_a == this._curMat.a && this._lastMat_b == this._curMat.b ? this._lastMatScaleX : (this._lastMatScaleX = this._curMat.getScaleX(), 
            this._lastMat_a = this._curMat.a, this._lastMat_b = this._curMat.b, this._lastMatScaleX);
        }, a.getMatScaleY = function() {
            return this._lastMat_c == this._curMat.c && this._lastMat_d == this._curMat.d ? this._lastMatScaleY : (this._lastMatScaleY = this._curMat.getScaleY(), 
            this._lastMat_c = this._curMat.c, this._lastMat_d = this._curMat.d, this._lastMatScaleY);
        }, a.setFillColor = function(t) {
            this._fillColor = t;
        }, a.getFillColor = function() {
            return this._fillColor;
        }, a.translate = function(t, e) {
            (0 !== t || 0 !== e) && (et.save(this), this._curMat._bTransform ? (Lt.save(this), 
            this._curMat.tx += t * this._curMat.a + e * this._curMat.c, this._curMat.ty += t * this._curMat.b + e * this._curMat.d) : (this._curMat.tx = t, 
            this._curMat.ty = e));
        }, a.save = function() {
            this._save[this._save._length++] = H.Create(this);
        }, a.restore = function() {
            var t = this._save._length, e = this._nBlendType;
            if (!(1 > t)) {
                for (var i = t - 1; i >= 0; i--) {
                    var n = this._save[i];
                    if (n.restore(this), n.isSaveMark()) return void (this._save._length = i);
                }
                e != this._nBlendType && (this._curSubmit = l.RENDERBASE);
            }
        }, a.fillText = function(t, e, i, n, r, s) {
            this._fillText(t, null, e, i, n, r, null, 0, null);
        }, a._fillText = function(e, i, n, r, s, a, o, h, l, u) {
            void 0 === u && (u = 0), e ? t._textRender.filltext(this, e, n, r, s, a, o, h, l, u) : i && t._textRender.fillWords(this, i, n, r, s, a, o, h);
        }, a._fast_filltext = function(e, i, n, r, s, a, o, h, l) {
            void 0 === l && (l = 0), t._textRender._fast_filltext(this, e, null, i, n, r, s, a, o, h, l);
        }, a.fillWords = function(t, e, i, n, r) {
            this._fillText(null, t, e, i, n, r, null, -1, null, 0);
        }, a.fillBorderWords = function(t, e, i, n, r, s, a) {
            this._fillBorderText(null, t, e, i, n, r, s, a, null);
        }, a.drawText = function(t, e, i, n, r, s) {
            this._fillText(t, null, e, i, n, o.create(r).strColor, null, -1, s);
        }, a.strokeWord = function(t, e, i, n, r, s, a) {
            this._fillText(t, null, e, i, n, null, o.create(r).strColor, s || 1, a);
        }, a.fillBorderText = function(t, e, i, n, r, s, a, h) {
            this._fillBorderText(t, null, e, i, n, o.create(r).strColor, o.create(s).strColor, a, h);
        }, a._fillBorderText = function(t, e, i, n, r, s, a, o, h) {
            this._fillText(t, e, i, n, r, s, a, o || 1, h);
        }, a._fillRect = function(t, e, i, n, r) {
            var s = this._curSubmit, a = s && 2 === s._key.submitType && s._key.blendShader === this._nBlendType;
            this._mesh.vertNum + 4 > 65535 && (this._mesh = Be.getAMesh(this.isMain), this.meshlist.push(this._mesh), 
            a = !1), a && (a = a && this.isSameClipInfo(s)), this.transformQuad(t, e, i, n, 0, this._curMat, this._transedPoints), 
            this.clipedOff(this._transedPoints) || (this._mesh.addQuad(this._transedPoints, Ie.NO_UV, r, !1), 
            a || (s = this._curSubmit = xe.create(this, this._mesh, X.create(1, 0)), this._submits[this._submits._length++] = s, 
            this._copyClipInfo(s, this._globalClipMatrix), s.shaderValue.textureHost = this._lastTex, 
            s._key.other = this._lastTex && this._lastTex.bitmap ? this._lastTex.bitmap.id : -1, 
            s._renderType = 10016), this._curSubmit._numEle += 6, this._mesh.indexNum += 6, 
            this._mesh.vertNum += 4);
        }, a.fillRect = function(t, e, i, n, r) {
            var s = r ? Et.create(r) : this._shader2D.fillStyle, a = this.mixRGBandAlpha(s.toInt());
            this._fillRect(t, e, i, n, a);
        }, a.fillTexture = function(t, e, n, r, s, a, o, h) {
            return t._getSource() ? void this._fillTexture(t, t.width, t.height, t.uvrect, e, n, r, s, a, o.x, o.y) : void (this.sprite && i.systemTimer.callLater(this, this._repaintSprite));
        }, a._fillTexture = function(t, e, i, n, r, s, a, o, h, l, u) {
            var c = this._curSubmit, _ = !1;
            this._mesh.vertNum + 4 > 65535 && (this._mesh = Be.getAMesh(this.isMain), this.meshlist.push(this._mesh), 
            _ = !1);
            var d = !0, f = !0;
            switch (h) {
              case "repeat":
                break;

              case "repeat-x":
                f = !1;
                break;

              case "repeat-y":
                d = !1;
                break;

              case "no-repeat":
                d = f = !1;
            }
            var p = this._temp4Points, m = 0, g = 0, v = 0, y = 0, x = 0, T = 0;
            if (0 > l ? (v = r, m = -l % e / e) : v = r + l, 0 > u ? (y = s, g = -u % i / i) : y = s + u, 
            x = r + a, T = s + o, !d && (x = Math.min(x, r + l + e)), !f && (T = Math.min(T, s + u + i)), 
            !(r > x || s > T || v > x || y > T)) {
                var b = (x - r - l) / e, w = (T - s - u) / i;
                if (this.transformQuad(v, y, x - v, T - y, 0, this._curMat, this._transedPoints), 
                p[0] = m, p[1] = g, p[2] = b, p[3] = g, p[4] = b, p[5] = w, p[6] = m, p[7] = w, 
                !this.clipedOff(this._transedPoints)) {
                    var C = this._mixRGBandAlpha(4294967295, this._shader2D.ALPHA);
                    this._mesh.addQuad(this._transedPoints, p, C, !0);
                    var A = X.create(1, 0);
                    A.defines.add(256), A.u_TexRange = n, c = this._curSubmit = xe.create(this, this._mesh, A), 
                    this._submits[this._submits._length++] = c, this._copyClipInfo(c, this._globalClipMatrix), 
                    c.shaderValue.textureHost = t, c._renderType = 10016, this._curSubmit._numEle += 6, 
                    this._mesh.indexNum += 6, this._mesh.vertNum += 4;
                }
                this.breakNextMerge();
            }
        }, a.setColorFilter = function(t) {
            h.save(this, 8388608, this, !0), this._colorFiler = t, this._curSubmit = l.RENDERBASE;
        }, a.drawTexture = function(t, e, i, n, r) {
            this._drawTextureM(t, e, i, n, r, null, 1, null);
        }, a.drawTextures = function(t, e, n, r) {
            if (!t._getSource()) return void (this.sprite && i.systemTimer.callLater(this, this._repaintSprite));
            for (var s = e.length / 2, a = 0, o = t.bitmap.id, h = 0; s > h; h++) this._inner_drawTexture(t, o, e[a++] + n, e[a++] + r, 0, 0, null, null, 1, !1);
        }, a._drawTextureAddSubmit = function(t, e) {
            var i = null;
            i = xe.create(this, this._mesh, X.create(1, 0)), this._submits[this._submits._length++] = i, 
            i.shaderValue.textureHost = e, i._key.other = t, i._renderType = 10016, this._curSubmit = i;
        }, a._drawTextureM = function(t, e, i, n, r, s, a, o) {
            var h = this.sprite;
            return t._getSource(function() {
                h && h.repaint();
            }) ? this._inner_drawTexture(t, t.bitmap.id, e, i, n, r, s, o, a, !1) : !1;
        }, a._drawRenderTexture = function(t, e, i, n, r, s, a, o) {
            return this._inner_drawTexture(t, -1, e, i, n, r, s, o, 1, !1);
        }, a.submitDebugger = function() {
            this._submits[this._submits._length++] = $.create([], function() {}, this);
        }, a._copyClipInfo = function(t, e) {
            var i = t.shaderValue.clipMatDir;
            i[0] = e.a, i[1] = e.b, i[2] = e.c, i[3] = e.d;
            var n = t.shaderValue.clipMatPos;
            n[0] = e.tx, n[1] = e.ty, t.clipInfoID = this._clipInfoID, this._clipInCache && (t.shaderValue.clipOff[0] = 1);
        }, a.isSameClipInfo = function(t) {
            return t.clipInfoID === this._clipInfoID;
        }, a._useNewTex2DSubmit = function(t, e) {
            this._mesh.vertNum + e > 65535 && (this._mesh = Be.getAMesh(this.isMain), this.meshlist.push(this._mesh));
            var i = xe.create(this, this._mesh, X.create(1, 0));
            this._submits[this._submits._length++] = this._curSubmit = i, i.shaderValue.textureHost = t, 
            this._copyClipInfo(i, this._globalClipMatrix);
        }, a._drawTexRect = function(t, e, i, n, r) {
            this.transformQuad(t, e, i, n, this._italicDeg, this._curMat, this._transedPoints);
            var s = this._transedPoints;
            s[0] = s[0] + .5 | 0, s[1] = s[1] + .5 | 0, s[2] = s[2] + .5 | 0, s[3] = s[3] + .5 | 0, 
            s[4] = s[4] + .5 | 0, s[5] = s[5] + .5 | 0, s[6] = s[6] + .5 | 0, s[7] = s[7] + .5 | 0, 
            this.clipedOff(this._transedPoints) || (this._mesh.addQuad(this._transedPoints, r, this._fillColor, !0), 
            this._curSubmit._numEle += 6, this._mesh.indexNum += 6, this._mesh.vertNum += 4);
        }, a.drawCallOptimize = function(t) {
            return this._charSubmitCache.enable(t, this), t;
        }, a._inner_drawTexture = function(t, e, i, n, r, s, a, o, h, l) {
            var u = this._curSubmit._key;
            if (o = o || t._uv, 4 === u.submitType && u.other === e) {
                var c = this._drawTexToDrawTri_Vert;
                c[0] = i, c[1] = n, c[2] = i + r, c[3] = n, c[4] = i + r, c[5] = n + s, c[6] = i, 
                c[7] = n + s, this._drawTriUseAbsMatrix = !0;
                var _ = this._tempUV;
                return _[0] = o[0], _[1] = o[1], _[2] = o[2], _[3] = o[3], _[4] = o[4], _[5] = o[5], 
                _[6] = o[6], _[7] = o[7], this.drawTriangles(t, 0, 0, c, _, this._drawTexToDrawTri_Index, a, h, null, null), 
                this._drawTriUseAbsMatrix = !1, !0;
            }
            var d = this._mesh, f = this._curSubmit, p = l ? this._charSubmitCache.getPos() : this._transedPoints;
            if (this.transformQuad(i, n, r || t.width, s || t.height, this._italicDeg, a || this._curMat, p), 
            this.drawTexAlign) {
                var m = Math.round;
                p[0] = m(p[0]), p[1] = m(p[1]), p[2] = m(p[2]), p[3] = m(p[3]), p[4] = m(p[4]), 
                p[5] = m(p[5]), p[6] = m(p[6]), p[7] = m(p[7]), this.drawTexAlign = !1;
            }
            var g = this._mixRGBandAlpha(4294967295, this._shader2D.ALPHA * h);
            if (l) return this._charSubmitCache.add(this, t, e, p, o, g), !0;
            this._drawCount++;
            var v = e >= 0 && 2 === u.submitType && u.other === e;
            return v && (v = v && this.isSameClipInfo(f)), this._lastTex = t, d.vertNum + 4 > 65535 && (d = this._mesh = Be.getAMesh(this.isMain), 
            this.meshlist.push(d), v = !1), d.addQuad(p, o, g, !0), v || (this._submits[this._submits._length++] = this._curSubmit = f = xe.create(this, d, X.create(1, 0)), 
            f.shaderValue.textureHost = t, f._key.other = e, this._copyClipInfo(f, this._globalClipMatrix)), 
            f._numEle += 6, d.indexNum += 6, d.vertNum += 4, !0;
        }, a.transform4Points = function(t, e, i) {
            var n = e.tx, r = e.ty, s = e.a, a = e.b, o = e.c, h = e.d, l = t[0], u = t[1], c = t[2], _ = t[3], d = t[4], f = t[5], p = t[6], m = t[7];
            e._bTransform ? (i[0] = l * s + u * o + n, i[1] = l * a + u * h + r, i[2] = c * s + _ * o + n, 
            i[3] = c * a + _ * h + r, i[4] = d * s + f * o + n, i[5] = d * a + f * h + r, i[6] = p * s + m * o + n, 
            i[7] = p * a + m * h + r) : (i[0] = l + n, i[1] = u + r, i[2] = c + n, i[3] = _ + r, 
            i[4] = d + n, i[5] = f + r, i[6] = p + n, i[7] = m + r);
        }, a.clipedOff = function(t) {
            return this._clipRect.width <= 0 || this._clipRect.height <= 0 ? !0 : !1;
        }, a.transformQuad = function(t, e, i, n, r, s, a) {
            var o = 0;
            0 != r && (o = Math.tan(r * Math.PI / 180) * n);
            var h = t + i, l = e + n, u = s.tx, c = s.ty, _ = s.a, d = s.b, f = s.c, p = s.d, m = t + o, g = e, v = h + o, y = e, x = h, T = l, b = t, w = l;
            s._bTransform ? (a[0] = m * _ + g * f + u, a[1] = m * d + g * p + c, a[2] = v * _ + y * f + u, 
            a[3] = v * d + y * p + c, a[4] = x * _ + T * f + u, a[5] = x * d + T * p + c, a[6] = b * _ + w * f + u, 
            a[7] = b * d + w * p + c) : (a[0] = m + u, a[1] = g + c, a[2] = v + u, a[3] = y + c, 
            a[4] = x + u, a[5] = T + c, a[6] = b + u, a[7] = w + c);
        }, a.pushRT = function() {
            this.addRenderObject($.create(null, di.pushRT, this));
        }, a.popRT = function() {
            this.addRenderObject($.create(null, di.popRT, this)), this.breakNextMerge();
        }, a.useRT = function(t) {
            function e(t) {
                if (!t) throw "error useRT";
                t.start(), t.clear(0, 0, 0, 0);
            }
            this.addRenderObject($.create([ t ], e, this)), this.breakNextMerge();
        }, a.RTRestore = function(t) {
            function e(t) {
                t.restore();
            }
            this.addRenderObject($.create([ t ], e, this)), this.breakNextMerge();
        }, a.breakNextMerge = function() {
            this._curSubmit = l.RENDERBASE;
        }, a._repaintSprite = function() {
            this.sprite && this.sprite.repaint();
        }, a.drawTextureWithTransform = function(t, e, i, n, r, s, a, o, h, l, u) {
            var c = null, _ = this._curMat;
            l && (c = this.globalCompositeOperation, this.globalCompositeOperation = l);
            var d = this._colorFiler;
            if (u && this.setColorFilter(u), !s) return this._drawTextureM(t, e + a, i + o, n, r, _, h, null), 
            l && (this.globalCompositeOperation = c), void (u && this.setColorFilter(d));
            var f = this._tmpMatrix;
            f.a = s.a, f.b = s.b, f.c = s.c, f.d = s.d, f.tx = s.tx + a, f.ty = s.ty + o, f._bTransform = s._bTransform, 
            s && _._bTransform ? (st.mul(f, _, f), s = f, s._bTransform = !0) : (f.tx += _.tx, 
            f.ty += _.ty, s = f), this._drawTextureM(t, e, i, n, r, s, h, null), l && (this.globalCompositeOperation = c), 
            u && this.setColorFilter(d);
        }, a._flushToTarget = function(t, e) {
            ft.worldScissorTest = !1, wt.mainContext.disable(3089);
            var i = ft.worldAlpha, n = ft.worldMatrix4, r = ft.worldMatrix;
            ft.worldShaderDefines;
            ft.worldMatrix = st.EMPTY, ft.restoreTempArray(), ft.worldMatrix4 = ft.TEMPMAT4_ARRAY, 
            ft.worldAlpha = 1, Ke.activeShader = null, e.start(), t._submits._length > 0 && e.clear(0, 0, 0, 0), 
            t._curSubmit = l.RENDERBASE, t.flush(), t.clear(), e.restore(), t._curSubmit = l.RENDERBASE, 
            Ke.activeShader = null, ft.worldAlpha = i, ft.worldMatrix4 = n, ft.worldMatrix = r;
        }, a.drawCanvas = function(t, e, i, n, r) {
            if (t) {
                var s, a = t.context;
                if (a._targets) a._submits._length > 0 && (s = $.create([ a, a._targets ], this._flushToTarget, this), 
                this._submits[this._submits._length++] = s), this._drawRenderTexture(a._targets, e, i, n, r, null, 1, di.flipyuv), 
                this._curSubmit = l.RENDERBASE; else {
                    var o = t;
                    o.touches && o.touches.forEach(function(t) {
                        t.touch();
                    }), s = be.create(t, this._shader2D.ALPHA, this._shader2D.filters), this._submits[this._submits._length++] = s, 
                    s._key.clear();
                    var h = s._matrix;
                    this._curMat.copyTo(h);
                    var u = h.tx, c = h.ty;
                    h.tx = h.ty = 0, h.transformPoint(Yt.TEMP.setTo(e, i)), h.translate(Yt.TEMP.x + u, Yt.TEMP.y + c), 
                    st.mul(o.invMat, h, h), this._curSubmit = l.RENDERBASE;
                }
            }
        }, a.drawTarget = function(t, e, i, n, r, s, a, o, h) {
            void 0 === h && (h = -1), this._drawCount++;
            if (this._mesh.vertNum + 4 > 65535 && (this._mesh = Be.getAMesh(this.isMain), this.meshlist.push(this._mesh)), 
            this.transformQuad(e, i, n, r, 0, s || this._curMat, this._transedPoints), !this.clipedOff(this._transedPoints)) {
                this._mesh.addQuad(this._transedPoints, o || Ie.DEF_UV, 4294967295, !0);
                var u = this._curSubmit = d.create(this, this._mesh, a, t);
                return u.blendType = -1 == h ? this._nBlendType : h, this._copyClipInfo(u, this._globalClipMatrix), 
                u._numEle = 6, this._mesh.indexNum += 6, this._mesh.vertNum += 4, this._submits[this._submits._length++] = u, 
                this._curSubmit = l.RENDERBASE, !0;
            }
            return this._curSubmit = l.RENDERBASE, !1;
        }, a.drawTriangles = function(t, e, n, r, s, a, o, h, u, c) {
            if (!t._getSource()) return void (this.sprite && i.systemTimer.callLater(this, this._repaintSprite));
            this._drawCount++;
            var _ = this._tmpMatrix, d = this._triangleMesh, f = null, p = !1;
            u && (f = this._colorFiler, this._colorFiler = u, this._curSubmit = l.RENDERBASE, 
            p = f != u);
            var m = t.bitmap, g = this._curSubmit._key, v = 4 === g.submitType && g.other === m.id && g.blendShader == this._nBlendType;
            if (d.vertNum + r.length / 2 > 65535 && (d = this._triangleMesh = ke.getAMesh(this.isMain), 
            this.meshlist.push(d), v = !1), !v) {
                var y = this._curSubmit = xe.create(this, d, X.create(1, 0));
                y.shaderValue.textureHost = t, y._renderType = 10016, y._key.submitType = 4, y._key.other = m.id, 
                this._copyClipInfo(y, this._globalClipMatrix), this._submits[this._submits._length++] = y;
            }
            var x = this._mixRGBandAlpha(4294967295, this._shader2D.ALPHA * h);
            this._drawTriUseAbsMatrix ? d.addData(r, s, a, o, x) : (o ? (_.a = o.a, _.b = o.b, 
            _.c = o.c, _.d = o.d, _.tx = o.tx + e, _.ty = o.ty + n) : (_.a = 1, _.b = 0, _.c = 0, 
            _.d = 1, _.tx = e, _.ty = n), st.mul(_, this._curMat, _), d.addData(r, s, a, _, x)), 
            this._curSubmit._numEle += a.length, p && (this._colorFiler = f, this._curSubmit = l.RENDERBASE);
        }, a.transform = function(t, e, i, n, r, s) {
            Lt.save(this), st.mul(st.TEMP.setTo(t, e, i, n, r, s), this._curMat, this._curMat), 
            this._curMat._checkTransform();
        }, a._transformByMatrix = function(t, e, i) {
            t.setTranslate(e, i), st.mul(t, this._curMat, this._curMat), t.setTranslate(0, 0), 
            this._curMat._bTransform = !0;
        }, a.setTransformByMatrix = function(t) {
            t.copyTo(this._curMat);
        }, a.rotate = function(t) {
            Lt.save(this), this._curMat.rotateEx(t);
        }, a.scale = function(t, e) {
            Lt.save(this), this._curMat.scaleEx(t, e);
        }, a.clipRect = function(e, i, n, r) {
            he.save(this), this._clipRect == t.MAXCLIPRECT ? this._clipRect = new mt(e, i, n, r) : (this._clipRect.width = n, 
            this._clipRect.height = r, this._clipRect.x = e, this._clipRect.y = i), t._clipID_Gen++, 
            t._clipID_Gen %= 1e4, this._clipInfoID = t._clipID_Gen;
            var s = this._globalClipMatrix, a = s.tx, o = s.ty, h = a + s.a, l = o + s.d;
            if (this._clipRect.width >= 99999999 ? (s.a = s.d = 99999999, s.b = s.c = s.tx = s.ty = 0) : (this._curMat._bTransform ? (s.tx = this._clipRect.x * this._curMat.a + this._clipRect.y * this._curMat.c + this._curMat.tx, 
            s.ty = this._clipRect.x * this._curMat.b + this._clipRect.y * this._curMat.d + this._curMat.ty, 
            s.a = this._clipRect.width * this._curMat.a, s.b = this._clipRect.width * this._curMat.b, 
            s.c = this._clipRect.height * this._curMat.c, s.d = this._clipRect.height * this._curMat.d) : (s.tx = this._clipRect.x + this._curMat.tx, 
            s.ty = this._clipRect.y + this._curMat.ty, s.a = this._clipRect.width, s.b = s.c = 0, 
            s.d = this._clipRect.height), this._incache && (this._clipInCache = !0)), s.a > 0 && s.d > 0) {
                var u = s.tx + s.a, c = s.ty + s.d;
                a >= u || o >= c || s.tx >= h || s.ty >= l ? (s.a = -.1, s.d = -.1) : (s.tx < a && (s.a -= a - s.tx, 
                s.tx = a), u > h && (s.a -= u - h), s.ty < o && (s.d -= o - s.ty, s.ty = o), c > l && (s.d -= c - l), 
                s.a <= 0 && (s.a = -.1), s.d <= 0 && (s.d = -.1));
            }
        }, a.drawMesh = function(t, e, i, n, r, s, a, o, h) {
            void 0 === h && (h = 0);
        }, a.addRenderObject = function(t) {
            this._submits[this._submits._length++] = t;
        }, a.submitElement = function(t, e) {
            var i = (Mt._context === this, this._submits), n = i._length;
            0 > e && (e = i._length);
            for (var r = l.RENDERBASE; e > t; ) this._renderNextSubmitIndex = t + 1, i[t] !== l.RENDERBASE ? (l.preRender = r, 
            r = i[t], t += r.renderSubmit()) : t++;
            return n;
        }, a.flush = function() {
            var t = this.submitElement(0, this._submits._length);
            this._path && this._path.reset(), v.instance && v.getInstance().reset(), this._curSubmit = l.RENDERBASE;
            for (var e = 0, i = this.meshlist.length; i > e; e++) {
                var n = this.meshlist[e];
                n.canReuse ? n.releaseMesh() : n.destroy();
            }
            return this.meshlist.length = 0, this._mesh = Be.getAMesh(this.isMain), this._pathMesh = Se.getAMesh(this.isMain), 
            this._triangleMesh = ke.getAMesh(this.isMain), this.meshlist.push(this._mesh, this._pathMesh, this._triangleMesh), 
            this._flushCnt++, this._flushCnt % 60 == 0 && Mt._context == this && C.textRenderInst && C.textRenderInst.GC(), 
            t;
        }, a.beginPath = function(t) {
            void 0 === t && (t = !1);
            var e = this._getPath();
            e.beginPath(t);
        }, a.closePath = function() {
            this._path.closePath();
        }, a.addPath = function(t, e, i, n, r) {
            for (var s = 0, a = 0, o = t.length / 2; o > a; a++) {
                var h = t[s] + n, l = t[s + 1] + r;
                t[s] = h, t[s + 1] = l, s += 2;
            }
            this._getPath().push(t, i);
        }, a.fill = function() {
            var t = this._curMat, e = this._getPath(), i = this._curSubmit, n = 3 === i._key.submitType && i._key.blendShader === this._nBlendType;
            n && (n = n && this.isSameClipInfo(i)), n || (this._curSubmit = this.addVGSubmit(this._pathMesh));
            for (var r, s = this.mixRGBandAlpha(this.fillStyle.toInt()), a = 0, o = 0, h = e.paths.length; h > o; o++) {
                var l = e.paths[o], u = l.path.length / 2;
                if (!(3 > u || 3 == u && !l.convex)) {
                    var c = l.path.concat(), _ = 0, d = 0, f = 0, p = NaN, m = NaN;
                    if (t._bTransform) for (_ = 0; u > _; _++) d = _ << 1, f = d + 1, p = c[d], m = c[f], 
                    c[d] = t.a * p + t.c * m + t.tx, c[f] = t.b * p + t.d * m + t.ty; else for (_ = 0; u > _; _++) d = _ << 1, 
                    f = d + 1, p = c[d], m = c[f], c[d] = p + t.tx, c[f] = m + t.ty;
                    this._pathMesh.vertNum + u > 65535 && (this._curSubmit._numEle += a, a = 0, this._pathMesh = Se.getAMesh(this.isMain), 
                    this._curSubmit = this.addVGSubmit(this._pathMesh));
                    var g = this._pathMesh.vertNum;
                    if (l.convex) {
                        var v = u - 2;
                        r = new Array(3 * v);
                        for (var y = 0, x = 0; v > x; x++) r[y++] = g, r[y++] = x + 1 + g, r[y++] = x + 2 + g;
                    } else if (r = Vt.earcut(c, null, 2), g > 0) for (var T = 0; T < r.length; T++) r[T] += g;
                    this._pathMesh.addVertAndIBToMesh(this, c, s, r), a += r.length;
                }
            }
            this._curSubmit._numEle += a;
        }, a.addVGSubmit = function(t) {
            var e = l.createShape(this, t, 0, X.create(4, 0));
            return e._key.submitType = 3, this._submits[this._submits._length++] = e, this._copyClipInfo(e, this._globalClipMatrix), 
            e;
        }, a.stroke = function() {
            if (this.lineWidth > 0) {
                var t = this.mixRGBandAlpha(this.strokeStyle._color.numColor), e = this._getPath(), i = this._curSubmit, n = 3 === i._key.submitType && i._key.blendShader === this._nBlendType;
                n && (n = n && this.isSameClipInfo(i)), n || (this._curSubmit = this.addVGSubmit(this._pathMesh));
                for (var r = 0, s = 0, a = e.paths.length; a > s; s++) {
                    var o = e.paths[s];
                    if (!(o.path.length <= 0)) {
                        var h = [], l = [], u = 2 * o.path.length;
                        if (!(2 > u)) {
                            this._pathMesh.vertNum + u > 65535 && (this._curSubmit._numEle += r, r = 0, this._pathMesh = Se.getAMesh(this.isMain), 
                            this.meshlist.push(this._pathMesh), this._curSubmit = this.addVGSubmit(this._pathMesh)), 
                            Ht.createLine2(o.path, h, this.lineWidth, this._pathMesh.vertNum, l, o.loop);
                            var c = l.length / 2, _ = this._curMat, d = 0, f = 0, p = 0, m = NaN, g = NaN;
                            if (_._bTransform) for (d = 0; c > d; d++) f = d << 1, p = f + 1, m = l[f], g = l[p], 
                            l[f] = _.a * m + _.c * g + _.tx, l[p] = _.b * m + _.d * g + _.ty; else for (d = 0; c > d; d++) f = d << 1, 
                            p = f + 1, m = l[f], g = l[p], l[f] = m + _.tx, l[p] = g + _.ty;
                            this._pathMesh.addVertAndIBToMesh(this, l, t, h), r += h.length;
                        }
                    }
                }
                this._curSubmit._numEle += r;
            }
        }, a.moveTo = function(t, e) {
            var i = this._getPath();
            i.newPath(), i._lastOriX = t, i._lastOriY = e, i.addPoint(t, e);
        }, a.lineTo = function(t, e) {
            var i = this._getPath();
            Math.abs(t - i._lastOriX) < .001 && Math.abs(e - i._lastOriY) < .001 || (i._lastOriX = t, 
            i._lastOriY = e, i.addPoint(t, e));
        }, a.arcTo = function(e, i, n, r, s) {
            var a = 0, o = 0, h = 0, l = this._path._lastOriX - e, u = this._path._lastOriY - i, c = Math.sqrt(l * l + u * u);
            if (!(1e-6 >= c)) {
                var _ = l / c, d = u / c, f = n - e, p = r - i, m = f * f + p * p, g = Math.sqrt(m);
                if (!(1e-6 >= g)) {
                    var v = f / g, y = p / g, x = _ + v, T = d + y, b = Math.sqrt(x * x + T * T);
                    if (!(1e-6 >= b)) {
                        var w = x / b, C = T / b, A = Math.acos(w * _ + C * d), E = Math.PI / 2 - A;
                        c = s / Math.tan(E);
                        var S = c * _ + e, M = c * d + i, R = Math.sqrt(c * c + s * s), I = e + w * R, P = i + C * R, D = _ * y - d * v, L = 0, B = 0, F = 0;
                        if (D >= 0) {
                            L = 2 * E;
                            var O = L / t.SEGNUM;
                            B = Math.sin(O), F = Math.cos(O);
                        } else L = 2 * -E, O = L / t.SEGNUM, B = Math.sin(O), F = Math.cos(O);
                        var N = this._path._lastOriX, k = this._path._lastOriY, U = S, W = M;
                        (Math.abs(U - this._path._lastOriX) > .1 || Math.abs(W - this._path._lastOriY) > .1) && (o = U, 
                        h = W, N = U, k = W, this._path.addPoint(o, h));
                        var V = S - I, G = M - P;
                        for (a = 0; a < t.SEGNUM; a++) {
                            var X = V * F + G * B, Y = -V * B + G * F;
                            o = X + I, h = Y + P, (Math.abs(N - o) > .1 || Math.abs(k - h) > .1) && (this._path.addPoint(o, h), 
                            N = o, k = h), V = X, G = Y;
                        }
                    }
                }
            }
        }, a.arc = function(t, e, i, n, r, s, a) {
            void 0 === s && (s = !1), void 0 === a && (a = !0);
            var o = 0, h = 0, l = 0, u = 0, c = 0, _ = 0, d = 0, f = 0, p = 0, m = 0, g = 0;
            if (h = r - n, s) if (Math.abs(h) >= 2 * Math.PI) h = 2 * -Math.PI; else for (;h > 0; ) h -= 2 * Math.PI; else if (Math.abs(h) >= 2 * Math.PI) h = 2 * Math.PI; else for (;0 > h; ) h += 2 * Math.PI;
            var v = this.getMatScaleX(), y = this.getMatScaleY(), x = i * (v > y ? v : y), T = 2 * Math.PI * x;
            m = 0 | Math.max(T / 10, 10), l = h / m / 2, u = Math.abs(4 / 3 * (1 - Math.cos(l)) / Math.sin(l)), 
            s && (u = -u), g = 0;
            var b = this._getPath();
            for (p = 0; m >= p; p++) o = n + h * (p / m), c = Math.cos(o), _ = Math.sin(o), 
            d = t + c * i, f = e + _ * i, (d != this._path._lastOriX || f != this._path._lastOriY) && b.addPoint(d, f);
            c = Math.cos(r), _ = Math.sin(r), d = t + c * i, f = e + _ * i, (d != this._path._lastOriX || f != this._path._lastOriY) && b.addPoint(d, f);
        }, a.quadraticCurveTo = function(t, e, i, n) {
            for (var r = Ot.I, s = r.getBezierPoints([ this._path._lastOriX, this._path._lastOriY, t, e, i, n ], 30, 2), a = 0, o = s.length / 2; o > a; a++) this.lineTo(s[2 * a], s[2 * a + 1]);
            this.lineTo(i, n);
        }, a.mixRGBandAlpha = function(t) {
            return this._mixRGBandAlpha(t, this._shader2D.ALPHA);
        }, a._mixRGBandAlpha = function(t, e) {
            if (e >= 1) return t;
            var i = (4278190080 & t) >>> 24;
            return 0 != i ? i *= e : i = 255 * e, 16777215 & t | i << 24;
        }, a.strokeRect = function(t, e, i, n, r) {
            if (this.lineWidth > 0) {
                var s = this.mixRGBandAlpha(this.strokeStyle._color.numColor), a = this.lineWidth / 2;
                this._fillRect(t - a, e - a, i + this.lineWidth, this.lineWidth, s), this._fillRect(t - a, e - a + n, i + this.lineWidth, this.lineWidth, s), 
                this._fillRect(t - a, e + a, this.lineWidth, n - this.lineWidth, s), this._fillRect(t - a + i, e + a, this.lineWidth, n - this.lineWidth, s);
            }
        }, a.clip = function() {}, a.drawParticle = function(t, e, i) {
            i.x = t, i.y = e, this._submits[this._submits._length++] = i;
        }, a._getPath = function() {
            return this._path || (this._path = new E());
        }, a._fillTexture_h = function(e, i, n, r, s, a, o, h) {
            for (var l = a, u = Math.floor(h / r), c = h % r, _ = 0; u > _; _++) this._inner_drawTexture(e, i, l, o, r, s, this._curMat, n, 1, !1), 
            l += r;
            if (c > 0) {
                var d = n[2] - n[0], f = n[0] + d * (c / r), p = t.tmpuv1;
                p[0] = n[0], p[1] = n[1], p[2] = f, p[3] = n[3], p[4] = f, p[5] = n[5], p[6] = n[6], 
                p[7] = n[7], this._inner_drawTexture(e, i, l, o, c, s, this._curMat, p, 1, !1);
            }
        }, a._fillTexture_v = function(e, i, n, r, s, a, o, h) {
            for (var l = o, u = Math.floor(h / s), c = h % s, _ = 0; u > _; _++) this._inner_drawTexture(e, i, a, l, r, s, this._curMat, n, 1, !1), 
            l += s;
            if (c > 0) {
                var d = n[7] - n[1], f = n[1] + d * (c / s), p = t.tmpuv1;
                p[0] = n[0], p[1] = n[1], p[2] = n[2], p[3] = n[3], p[4] = n[4], p[5] = f, p[6] = n[6], 
                p[7] = f, this._inner_drawTexture(e, i, a, l, r, c, this._curMat, p, 1, !1);
            }
        }, a.drawTextureWithSizeGrid = function(e, i, n, r, s, a, o, h) {
            if (e._getSource()) {
                i += o, n += h;
                var l = e.uv, u = e.bitmap.width, c = e.bitmap.height, _ = a[0], d = a[3], f = _ / c, p = d / u, m = a[1], g = a[2], v = m / u, y = g / c, x = a[4], T = !1;
                if (r == u && (d = m = 0), s == c && (_ = g = 0), d + m > r) {
                    var b = r;
                    T = !0, r = d + m, this.save(), this.clipRect(0 + i, 0 + n, b, s);
                }
                var w = e.bitmap.id, C = this._curMat, A = this._tempUV, E = l[0], S = l[1], M = l[4], R = l[5], I = E, P = S, D = M, L = R;
                if (d && _ && (D = E + p, L = S + f, A[0] = E, A[1] = S, A[2] = D, A[3] = S, A[4] = D, 
                A[5] = L, A[6] = E, A[7] = L, this._inner_drawTexture(e, w, i, n, d, _, C, A, 1, !1)), 
                m && _ && (I = M - v, P = S, D = M, L = S + f, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, this._inner_drawTexture(e, w, r - m + i, 0 + n, m, _, C, A, 1, !1)), 
                d && g && (I = E, P = R - y, D = E + p, L = R, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, this._inner_drawTexture(e, w, 0 + i, s - g + n, d, g, C, A, 1, !1)), 
                m && g && (I = M - v, P = R - y, D = M, L = R, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, this._inner_drawTexture(e, w, r - m + i, s - g + n, m, g, C, A, 1, !1)), 
                _ && (I = E + p, P = S, D = M - v, L = S + f, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, x ? this._fillTexture_h(e, w, A, e.width - d - m, _, d + i, n, r - d - m) : this._inner_drawTexture(e, w, d + i, n, r - d - m, _, C, A, 1, !1)), 
                g && (I = E + p, P = R - y, D = M - v, L = R, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, x ? this._fillTexture_h(e, w, A, e.width - d - m, g, d + i, s - g + n, r - d - m) : this._inner_drawTexture(e, w, d + i, s - g + n, r - d - m, g, C, A, 1, !1)), 
                d && (I = E, P = S + f, D = E + p, L = R - y, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, x ? this._fillTexture_v(e, w, A, d, e.height - _ - g, i, _ + n, s - _ - g) : this._inner_drawTexture(e, w, i, _ + n, d, s - _ - g, C, A, 1, !1)), 
                m && (I = M - v, P = S + f, D = M, L = R - y, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, x ? this._fillTexture_v(e, w, A, m, e.height - _ - g, r - m + i, _ + n, s - _ - g) : this._inner_drawTexture(e, w, r - m + i, _ + n, m, s - _ - g, C, A, 1, !1)), 
                I = E + p, P = S + f, D = M - v, L = R - y, A[0] = I, A[1] = P, A[2] = D, A[3] = P, 
                A[4] = D, A[5] = L, A[6] = I, A[7] = L, x) {
                    var B = t.tmpUVRect;
                    B[0] = I, B[1] = P, B[2] = D - I, B[3] = L - P, this._fillTexture(e, e.width - d - m, e.height - _ - g, B, d + i, _ + n, r - d - m, s - _ - g, "repeat", 0, 0);
                } else this._inner_drawTexture(e, w, d + i, _ + n, r - d - m, s - _ - g, C, A, 1, !1);
                T && this.restore();
            }
        }, s(0, a, "textAlign", function() {
            return this._other.textAlign;
        }, function(t) {
            this._other.textAlign === t || (this._other = this._other.make(), h.save(this, 32768, this._other, !1), 
            this._other.textAlign = t);
        }), s(0, a, "lineJoin", function() {
            return null;
        }, function(t) {}), s(0, a, "fillStyle", function() {
            return this._shader2D.fillStyle;
        }, function(t) {
            this._shader2D.fillStyle.equal(t) || (h.save(this, 2, this._shader2D, !1), this._shader2D.fillStyle = Et.create(t), 
            this._submitKey.other = -this._shader2D.fillStyle.toInt());
        }), s(0, a, "lineCap", function() {
            return null;
        }, function(t) {}), s(0, a, "miterLimit", function() {
            return null;
        }, function(t) {}), s(0, a, "strokeStyle", function() {
            return this._shader2D.strokeStyle;
        }, function(t) {
            this._shader2D.strokeStyle.equal(t) || (h.save(this, 512, this._shader2D, !1), this._shader2D.strokeStyle = Et.create(t), 
            this._submitKey.other = -this._shader2D.strokeStyle.toInt());
        }), s(0, a, "globalCompositeOperation", function() {
            return _e.NAMES[this._nBlendType];
        }, function(t) {
            var e = _e.TOINT[t];
            null == e || this._nBlendType === e || (h.save(this, 65536, this, !0), this._curSubmit = l.RENDERBASE, 
            this._nBlendType = e);
        }), s(0, a, "globalAlpha", function() {
            return this._shader2D.ALPHA;
        }, function(t) {
            t = Math.floor(1e3 * t) / 1e3, t != this._shader2D.ALPHA && (h.save(this, 1, this._shader2D, !1), 
            this._shader2D.ALPHA = t);
        }), s(0, a, "asBitmap", null, function(t) {
            if (t) {
                if (this._targets || (this._targets = new di(this._width, this._height, 1, -1)), 
                !this._width || !this._height) throw Error("asBitmap no size!");
            } else this._targets && this._targets.destroy(), this._targets = null;
        }), s(0, a, "textBaseline", function() {
            return this._other.textBaseline;
        }, function(t) {
            this._other.textBaseline === t || (this._other = this._other.make(), h.save(this, 16384, this._other, !1), 
            this._other.textBaseline = t);
        }), s(0, a, "lineWidth", function() {
            return this._other.lineWidth;
        }, function(t) {
            this._other.lineWidth === t || (this._other = this._other.make(), h.save(this, 256, this._other, !1), 
            this._other.lineWidth = t);
        }), s(0, a, "font", null, function(t) {
            this._other = this._other.make(), h.save(this, 8, this._other, !1);
        }), s(0, a, "canvas", function() {
            return this._canvas;
        }), t.__init__ = function() {
            t.MAXCLIPRECT = new mt(0, 0, 99999999, 99999999), e.DEFAULT = new e();
        }, t.set2DRenderConfig = function() {
            var t = Pt.instance;
            nt.setBlend(t, !0), nt.setBlendFunc(t, 1, 771), nt.setDepthTest(t, !1), nt.setCullFace(t, !1), 
            nt.setDepthMask(t, !0), nt.setFrontFace(t, 2305), t.viewport(0, 0, ft.width, ft.height);
        }, t.ENUM_TEXTALIGN_DEFAULT = 0, t.ENUM_TEXTALIGN_CENTER = 1, t.ENUM_TEXTALIGN_RIGHT = 2, 
        t._SUBMITVBSIZE = 32e3, t._MAXSIZE = 99999999, t._MAXVERTNUM = 65535, t.MAXCLIPRECT = null, 
        t._COUNT = 0, t.SEGNUM = 32, t._contextcount = 0, t.PI2 = 2 * Math.PI, t._clipID_Gen = 0, 
        n(t, [ "_textRender", function() {
            return this._textRender = new C();
        }, "tmpuv1", function() {
            return this.tmpuv1 = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
        }, "tmpUV", function() {
            return this.tmpUV = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
        }, "tmpUVRect", function() {
            return this.tmpUVRect = [ 0, 0, 0, 0 ];
        } ]), t.__init$ = function() {
            e = function() {
                function t() {
                    this.lineWidth = 1, this.textAlign = null, this.textBaseline = null;
                }
                r(t, "");
                var e = t.prototype;
                return e.clear = function() {
                    this.lineWidth = 1, this.textAlign = this.textBaseline = null;
                }, e.make = function() {
                    return this === t.DEFAULT ? new t() : this;
                }, t.DEFAULT = null, t;
            }();
        }, t;
    }(), ct = function() {
        function t() {}
        r(t, "laya.filters.BlurFilterGLRender");
        var e = t.prototype;
        return e.render = function(t, e, i, n, r) {
            var s = X.create(1, 0);
            this.setShaderInfo(s, r, t.width, t.height), e.drawTarget(t, 0, 0, i, n, st.EMPTY.identity(), s);
        }, e.setShaderInfo = function(e, i, n, r) {
            e.defines.add(16);
            var s = e;
            t.blurinfo[0] = n, t.blurinfo[1] = r, s.blurInfo = t.blurinfo;
            var a = i.strength / 3, o = a * a;
            i.strength_sig2_2sig2_gauss1[0] = i.strength, i.strength_sig2_2sig2_gauss1[1] = o, 
            i.strength_sig2_2sig2_gauss1[2] = 2 * o, i.strength_sig2_2sig2_gauss1[3] = 1 / (2 * Math.PI * o), 
            s.strength_sig2_2sig2_gauss1 = i.strength_sig2_2sig2_gauss1;
        }, n(t, [ "blurinfo", function() {
            return this.blurinfo = new Array(2);
        } ]), t;
    }(), _t = function() {
        function t() {}
        return r(t, "laya.webgl.utils.CONST3D2D"), t.BYTES_PE = 4, t.BYTES_PIDX = 2, t.defaultMatrix4 = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        t.defaultMinusYMatrix4 = [ 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], t.uniformMatrix3 = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0 ], 
        t._TMPARRAY = [], t._OFFSETX = 0, t._OFFSETY = 0, t;
    }(), dt = function() {
        function t() {
            this["char"] = "", this.tex = null, this.deleted = !1, this.pos = 0, this.width = 0, 
            this.height = 0, this.bmpWidth = 0, this.bmpHeight = 0, this.orix = 0, this.oriy = 0, 
            this.touchTick = 0, this.isSpace = !1, this.uv = new Array(8);
        }
        r(t, "laya.webgl.text.CharRenderInfo");
        var e = t.prototype;
        return e.touch = function() {
            var t = A.loopCount;
            this.touchTick != t && this.tex.touchRect(this, t), this.touchTick = t;
        }, t;
    }(), ft = (function() {
        function t() {
            this._renderType = 0, this._repaint = 0, this._x = NaN, this._y = NaN;
        }
        r(t, "laya.layagl.QuickTestTool");
        var e = t.prototype;
        return e.render = function(e, i, n) {
            t._addType(this._renderType), t.showRenderTypeInfo(this._renderType), I.renders[this._renderType]._fun(this, e, i + this._x, n + this._y), 
            this._repaint = 0;
        }, e._stageRender = function(e, n, r) {
            t._countStart(), t._PreStageRender.call(i.stage, e, n, r), t._countEnd();
        }, t.getMCDName = function(e) {
            return t._typeToNameDic[e];
        }, t.showRenderTypeInfo = function(e, i) {
            if (void 0 === i && (i = !1), i || !t.showedDic[e]) {
                if (t.showedDic[e] = !0, !t._rendertypeToStrDic[e]) {
                    var n = [], r = 0;
                    for (r = 1; e >= r; ) r & e && n.push(t.getMCDName(r & e)), r <<= 1;
                    t._rendertypeToStrDic[e] = n.join(",");
                }
                console.log("cmd:", t._rendertypeToStrDic[e]);
            }
        }, t.__init__ = function() {
            t._typeToNameDic[1] = "ALPHA", t._typeToNameDic[2] = "TRANSFORM", t._typeToNameDic[256] = "TEXTURE", 
            t._typeToNameDic[512] = "GRAPHICS", t._typeToNameDic[4096] = "ONECHILD", t._typeToNameDic[8192] = "CHILDS", 
            t._typeToNameDic[3] = "TRANSFORM|ALPHA", t._typeToNameDic[8] = "CANVAS", t._typeToNameDic[4] = "BLEND", 
            t._typeToNameDic[16] = "FILTERS", t._typeToNameDic[32] = "MASK", t._typeToNameDic[64] = "CLIP", 
            t._typeToNameDic[1024] = "LAYAGL3D";
        }, t._countStart = function() {
            var e;
            for (e in t._countDic) t._countDic[e] = 0;
        }, t._countEnd = function() {
            t._i++, t._i > 60 && (t.showCountInfo(), t._i = 0);
        }, t._addType = function(e) {
            t._countDic[e] ? t._countDic[e] += 1 : t._countDic[e] = 1;
        }, t.showCountInfo = function() {
            console.log("===================");
            var e;
            for (e in t._countDic) console.log("count:" + t._countDic[e]), t.showRenderTypeInfo(e, !0);
        }, t.enableQuickTest = function() {
            t.__init__(), je.prototype.render = t.prototype.render, t._PreStageRender = ai.prototype.render, 
            ai.prototype.render = t.prototype._stageRender;
        }, t.showedDic = {}, t._rendertypeToStrDic = {}, t._typeToNameDic = {}, t._PreStageRender = null, 
        t._countDic = {}, t._i = 0, t;
    }(), function() {
        function t() {}
        return r(t, "laya.webgl.utils.RenderState2D"), t.mat2MatArray = function(e, i) {
            var n = e, r = i;
            return r[0] = n.a, r[1] = n.b, r[2] = t.EMPTYMAT4_ARRAY[2], r[3] = t.EMPTYMAT4_ARRAY[3], 
            r[4] = n.c, r[5] = n.d, r[6] = t.EMPTYMAT4_ARRAY[6], r[7] = t.EMPTYMAT4_ARRAY[7], 
            r[8] = t.EMPTYMAT4_ARRAY[8], r[9] = t.EMPTYMAT4_ARRAY[9], r[10] = t.EMPTYMAT4_ARRAY[10], 
            r[11] = t.EMPTYMAT4_ARRAY[11], r[12] = n.tx, r[13] = n.ty, r[14] = t.EMPTYMAT4_ARRAY[14], 
            r[15] = t.EMPTYMAT4_ARRAY[15], i;
        }, t.restoreTempArray = function() {
            t.TEMPMAT4_ARRAY[0] = 1, t.TEMPMAT4_ARRAY[1] = 0, t.TEMPMAT4_ARRAY[4] = 0, t.TEMPMAT4_ARRAY[5] = 1, 
            t.TEMPMAT4_ARRAY[12] = 0, t.TEMPMAT4_ARRAY[13] = 0;
        }, t.clear = function() {
            t.worldScissorTest = !1, t.worldAlpha = 1;
        }, t._MAXSIZE = 99999999, t.EMPTYMAT4_ARRAY = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        t.TEMPMAT4_ARRAY = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], t.worldMatrix4 = t.TEMPMAT4_ARRAY, 
        t.matWVP = null, t.worldAlpha = 1, t.worldScissorTest = !1, t.worldShaderDefines = null, 
        t.worldFilters = null, t.width = 0, t.height = 0, n(t, [ "worldMatrix", function() {
            return this.worldMatrix = new st();
        } ]), t;
    }()), pt = function() {
        function t() {}
        var e, s;
        return r(t, "laya.utils.SceneUtils"), t.getBindFun = function(e) {
            var n = t._funMap.get(e);
            if (null == n) {
                var r = '"' + e + '"';
                r = r.replace(/^"\${|}"$/g, "").replace(/\${/g, '"+').replace(/}/g, '+"');
                var s = "(function(data){if(data==null)return;with(data){try{\nreturn " + r + "\n}catch(e){}}})";
                n = i._runScript(s), t._funMap.set(e, n);
            }
            return n;
        }, t.createByData = function(e, i) {
            var n = s.create();
            if (e = t.createComp(i, e, e, null, n), e._setBit(8, !0), e.hasOwnProperty("_idMap") && (e._idMap = n._idMap), 
            i.animations) {
                var r, a, o = [], h = i.animations, l = 0, u = h.length;
                for (l = 0; u > l; l++) {
                    switch (r = new ci(), a = h[l], r._setUp(n._idMap, a), e[a.name] = r, r._setControlNode(e), 
                    a.action) {
                      case 1:
                        r.play(0, !1);
                        break;

                      case 2:
                        r.play(0, !0);
                    }
                    o.push(r);
                }
                e._aniList = o;
            }
            return "Scene" === e._$componentType && e._width > 0 && null == i.props.hitTestPrior && !e.mouseThrough && (e.hitTestPrior = !0), 
            n.beginLoad(e), e;
        }, t.createInitTool = function() {
            return s.create();
        }, t.createComp = function(e, n, r, s, a) {
            if ("Scene3D" == e.type || "Sprite3D" == e.type) {
                var o = [], h = i.Utils3D._createSceneByJsonForMaker(e, o, a);
                return "Sprite3D" == e.type ? i.StaticBatchManager.combine(h, o) : i.StaticBatchManager.combine(null, o), 
                h;
            }
            if (n = n || t.getCompInstance(e), !n) return e.props && e.props.runtime ? console.warn("runtime not found:" + e.props.runtime) : console.warn("can not create:" + e.type), 
            null;
            var l = e.child;
            if (l) for (var u = "List" == n._$componentType, c = 0, _ = l.length; _ > c; c++) {
                var d = l[c];
                if (!n.hasOwnProperty("itemRender") || "render" != d.props.name && "render" !== d.props.renderType) if ("Graphic" == d.type) Rt._addGraphicsToSprite(d, n); else if (Rt._isDrawType(d.type)) Rt._addGraphicToSprite(d, n, !0); else {
                    if (u) {
                        var f = [], p = t.createComp(d, null, r, f, a);
                        f.length && (p._$bindData = f);
                    } else p = t.createComp(d, null, r, s, a);
                    "Script" == d.type ? p instanceof laya.components.Component ? n._addComponentInstance(p) : "owner" in p ? p.owner = n : "target" in p && (p.target = n) : "mask" == d.props.renderType || "mask" == d.props.name ? n.mask = p : p instanceof laya.display.Node && n.addChild(p);
                } else n.itemRender = d;
            }
            var m = e.props;
            for (var g in m) {
                var v = m[g];
                "string" == typeof v && (v.indexOf("@node:") >= 0 || v.indexOf("@Prefab:") >= 0) ? a && a.addNodeRef(n, g, v) : t.setCompValue(n, g, v, r, s);
            }
            return n._afterInited && n._afterInited(), e.compId && a && a._idMap && (a._idMap[e.compId] = n), 
            n;
        }, t.setCompValue = function(i, n, r, s, a) {
            if ("string" == typeof r && r.indexOf("${") > -1) {
                if (t._sheet || (t._sheet = Rt.getClass("laya.data.Table")), !t._sheet) return void console.warn("Can not find class Sheet");
                if (a) a.push(i, n, r); else if (s) {
                    -1 == r.indexOf("].") && (r = r.replace(".", "[0]."));
                    var o = new e(i, n, r);
                    o.exe(s);
                    for (var h, l, u = r.replace(/\[.*?\]\./g, "."); null != (h = t._parseWatchData.exec(u)); ) {
                        for (var c = h[1]; null != (l = t._parseKeyWord.exec(c)); ) {
                            var _ = l[0], d = s._watchMap[_] || (s._watchMap[_] = []);
                            d.push(o), t._sheet.I.notifer.on(_, s, s.changeData, [ _ ]);
                        }
                        d = s._watchMap[c] || (s._watchMap[c] = []), d.push(o), t._sheet.I.notifer.on(c, s, s.changeData, [ c ]);
                    }
                }
            } else "var" === n && s ? s[r] = i : i[n] = "true" === r ? !0 : "false" === r ? !1 : r;
        }, t.getCompInstance = function(e) {
            if ("UIView" == e.type && e.props && e.props.pageData) return t.createByData(null, e.props.pageData);
            var i = e.props && e.props.runtime || e.type, n = Rt.getClass(i);
            if (!n) throw "Can not find class " + i;
            if ("Script" === e.type && n.prototype._doAwake) {
                var r = U.createByClass(n);
                return r._destroyed = !1, r;
            }
            return e.props && e.props.hasOwnProperty("renderType") && "instance" == e.props.renderType ? (n.instance || (n.instance = new n()), 
            n.instance) : new n();
        }, t._sheet = null, n(t, [ "_funMap", function() {
            return this._funMap = new Ct();
        }, "_parseWatchData", function() {
            return this._parseWatchData = /\${(.*?)}/g;
        }, "_parseKeyWord", function() {
            return this._parseKeyWord = /[a-zA-Z_][a-zA-Z0-9_]*(?:(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+)/g;
        } ]), t.__init$ = function() {
            e = function() {
                function e(t, e, i) {
                    this.comp = null, this.prop = null, this.value = null, this.comp = t, this.prop = e, 
                    this.value = i;
                }
                r(e, "");
                var i = e.prototype;
                return i.exe = function(e) {
                    var i = t.getBindFun(this.value);
                    this.comp[this.prop] = i.call(this, e);
                }, e;
            }(), s = function() {
                function t() {
                    this._nodeRefList = null, this._initList = null, this._loadList = null, this._idMap = null, 
                    this._scene = null;
                }
                r(t, "");
                var e = t.prototype;
                return e.reset = function() {
                    this._nodeRefList = null, this._initList = null, this._idMap = null, this._loadList = null, 
                    this._scene = null;
                }, e.recover = function() {
                    this.reset(), U.recover("InitTool", this);
                }, e.addLoadRes = function(t, e) {
                    this._loadList || (this._loadList = []), e ? this._loadList.push({
                        url: t,
                        type: e
                    }) : this._loadList.push(t);
                }, e.addNodeRef = function(t, e, i) {
                    this._nodeRefList || (this._nodeRefList = []), this._nodeRefList.push([ t, e, i ]), 
                    i.indexOf("@Prefab:") >= 0 && this.addLoadRes(i.replace("@Prefab:", ""), "prefab");
                }, e.setNodeRef = function() {
                    if (this._nodeRefList) {
                        if (!this._idMap) return void (this._nodeRefList = null);
                        var t = 0, e = 0;
                        e = this._nodeRefList.length;
                        var i;
                        for (t = 0; e > t; t++) i = this._nodeRefList[t], i[0][i[1]] = this.getReferData(i[2]);
                        this._nodeRefList = null;
                    }
                }, e.getReferData = function(t) {
                    if (t.indexOf("@Prefab:") >= 0) {
                        var e;
                        return e = De.getRes(t.replace("@Prefab:", ""));
                    }
                    if (t.indexOf("@arr:") >= 0) {
                        t = t.replace("@arr:", "");
                        var i;
                        i = t.split(",");
                        var n, r = 0, s = 0;
                        for (s = i.length, r = 0; s > r; r++) n = i[r], n ? i[r] = this._idMap[n.replace("@node:", "")] : i[r] = null;
                        return i;
                    }
                    return this._idMap[t.replace("@node:", "")];
                }, e.addInitItem = function(t) {
                    this._initList || (this._initList = []), this._initList.push(t);
                }, e.doInits = function() {
                    this._initList && (this._initList = null);
                }, e.finish = function() {
                    this.setNodeRef(), this.doInits(), this._scene._setBit(8, !1), this._scene.parent && this._scene.parent.activeInHierarchy && this._scene.active && this._scene._processActive(), 
                    this._scene.event("onViewCreated"), this.recover();
                }, e.beginLoad = function(t) {
                    this._scene = t, !this._loadList || this._loadList.length < 1 ? this.finish() : i.loader.load(this._loadList, g.create(this, this.finish));
                }, t.create = function() {
                    var e = U.getItemByClass("InitTool", t);
                    return e._idMap = [], e;
                }, t;
            }();
        }, t;
    }(), mt = function() {
        function t(t, e, i, n) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), 
            this.x = t, this.y = e, this.width = i, this.height = n;
        }
        r(t, "laya.maths.Rectangle");
        var e = t.prototype;
        return e.setTo = function(t, e, i, n) {
            return this.x = t, this.y = e, this.width = i, this.height = n, this;
        }, e.reset = function() {
            return this.x = this.y = this.width = this.height = 0, this;
        }, e.recover = function() {
            return this == t.TEMP || this == t.EMPTY ? void console.log("recover Temp or Empty:", this) : void U.recover("Rectangle", this.reset());
        }, e.copyFrom = function(t) {
            return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, 
            this;
        }, e.contains = function(t, e) {
            return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.right && e >= this.y && e < this.bottom ? !0 : !1;
        }, e.intersects = function(t) {
            return !(t.x > this.x + this.width || t.x + t.width < this.x || t.y > this.y + this.height || t.y + t.height < this.y);
        }, e.intersection = function(e, i) {
            return this.intersects(e) ? (i || (i = new t()), i.x = Math.max(this.x, e.x), i.y = Math.max(this.y, e.y), 
            i.width = Math.min(this.right, e.right) - i.x, i.height = Math.min(this.bottom, e.bottom) - i.y, 
            i) : null;
        }, e.union = function(e, i) {
            return i || (i = new t()), this.clone(i), e.width <= 0 || e.height <= 0 ? i : (i.addPoint(e.x, e.y), 
            i.addPoint(e.right, e.bottom), this);
        }, e.clone = function(e) {
            return e || (e = new t()), e.x = this.x, e.y = this.y, e.width = this.width, e.height = this.height, 
            e;
        }, e.toString = function() {
            return this.x + "," + this.y + "," + this.width + "," + this.height;
        }, e.equals = function(t) {
            return t && t.x === this.x && t.y === this.y && t.width === this.width && t.height === this.height ? !0 : !1;
        }, e.addPoint = function(t, e) {
            return this.x > t && (this.width += this.x - t, this.x = t), this.y > e && (this.height += this.y - e, 
            this.y = e), this.width < t - this.x && (this.width = t - this.x), this.height < e - this.y && (this.height = e - this.y), 
            this;
        }, e._getBoundPoints = function() {
            var e = t._temB;
            return e.length = 0, 0 == this.width || 0 == this.height ? e : (e.push(this.x, this.y, this.x + this.width, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height), 
            e);
        }, e.isEmpty = function() {
            return this.width <= 0 || this.height <= 0 ? !0 : !1;
        }, s(0, e, "right", function() {
            return this.x + this.width;
        }), s(0, e, "bottom", function() {
            return this.y + this.height;
        }), t.create = function() {
            return U.getItemByClass("Rectangle", t);
        }, t._getBoundPointS = function(e, i, n, r) {
            var s = t._temA;
            return s.length = 0, 0 == n || 0 == r ? s : (s.push(e, i, e + n, i, e, i + r, e + n, i + r), 
            s);
        }, t._getWrapRec = function(e, i) {
            if (!e || e.length < 1) return i ? i.setTo(0, 0, 0, 0) : t.TEMP.setTo(0, 0, 0, 0);
            i = i ? i : laya.maths.Rectangle.create();
            var n, r, s, a, o, h = e.length, l = Yt.TEMP;
            for (r = a = 99999, s = o = -r, n = 0; h > n; n += 2) l.x = e[n], l.y = e[n + 1], 
            r = r < l.x ? r : l.x, a = a < l.y ? a : l.y, s = s > l.x ? s : l.x, o = o > l.y ? o : l.y;
            return i.setTo(r, a, s - r, o - a);
        }, t.EMPTY = new t(), t.TEMP = new t(), t._temB = [], t._temA = [], t;
    }(), gt = function() {
        function t() {}
        return r(t, "laya.events.KeyBoardManager"), t.__init__ = function() {
            t._addEvent("keydown"), t._addEvent("keypress"), t._addEvent("keyup");
        }, t._addEvent = function(t) {
            Dt.document.addEventListener(t, function(e) {
                laya.events.KeyBoardManager._dispatch(e, t);
            }, !0);
        }, t._dispatch = function(e, n) {
            if (t.enabled) {
                t._event._stoped = !1, t._event.nativeEvent = e, t._event.keyCode = e.keyCode || e.which || e.charCode, 
                "keydown" === n ? t._pressKeys[t._event.keyCode] = !0 : "keyup" === n && (t._pressKeys[t._event.keyCode] = null);
                for (var r = i.stage.focus && null != i.stage.focus.event && i.stage.focus.displayedInStage ? i.stage.focus : i.stage, s = r; s; ) s.event(n, t._event.setTo(n, s, r)), 
                s = s.parent;
            }
        }, t.hasKeyDown = function(e) {
            return t._pressKeys[e];
        }, t._pressKeys = {}, t.enabled = !0, n(t, [ "_event", function() {
            return this._event = new w();
        } ]), t;
    }(), vt = function() {
        function t() {}
        return r(t, "laya.layagl.LayaGLRunner"), t.uploadShaderUniforms = function(t, e, i, n) {
            for (var r = i._data, s = e.getArrayData(), a = 0, o = 0, h = s.length; h > o; o++) {
                var l = s[o];
                if (n || -1 !== l.textureID) {
                    var u = r[l.dataOffset];
                    null != u && (a += l.fun.call(l.caller, l, u));
                }
            }
            return a;
        }, t.uploadCustomUniform = function(t, e, i, n) {
            var r = 0, s = e[i];
            return s && null != n && (r += s.fun.call(s.caller, s, n)), r;
        }, t.uploadShaderUniformsForNative = function(t, e, i) {
            var n = 0;
            i._runtimeCopyValues.length > 0 && (n = 1);
            var r = i._data;
            return t.uploadShaderUniforms(e, r, n);
        }, t;
    }(), yt = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawPathCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.paths = null, this.brush = null, this.pen = null, U.recover("DrawPathCmd", this);
        }, e.run = function(t, e, i) {
            t._drawPath(this.x + e, this.y + i, this.paths, this.brush, this.pen);
        }, s(0, e, "cmdID", function() {
            return "DrawPath";
        }), t.create = function(e, i, n, r, s) {
            var a = U.getItemByClass("DrawPathCmd", t);
            return a.x = e, a.y = i, a.paths = n, a.brush = r, a.pen = s, a;
        }, t.ID = "DrawPath", t;
    }(), xt = function() {
        function t() {
            this._nativeVertexArrayObject = null, this._bindedIndexBuffer = null, this._nativeVertexArrayObject = Pt.instance.createVertexArray();
        }
        r(t, "laya.webgl.BufferStateBase");
        var e = t.prototype;
        return e.bind = function() {
            t._curBindedBufferState !== this && (Pt.instance.bindVertexArray(this._nativeVertexArrayObject), 
            t._curBindedBufferState = this);
        }, e.unBind = function() {
            if (t._curBindedBufferState !== this) throw "BufferState: must call bind() function first.";
            Pt.instance.bindVertexArray(null), t._curBindedBufferState = null;
        }, e.bindForNative = function() {
            Pt.instance.bindVertexArray(this._nativeVertexArrayObject), t._curBindedBufferState = this;
        }, e.unBindForNative = function() {
            Pt.instance.bindVertexArray(null), t._curBindedBufferState = null;
        }, e.destroy = function() {
            Pt.instance.deleteVertexArray(this._nativeVertexArrayObject);
        }, t._curBindedBufferState = null, t;
    }(), Tt = function() {
        function t() {}
        r(t, "laya.display.cmd.SaveCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("SaveCmd", this);
        }, e.run = function(t, e, i) {
            t.save();
        }, s(0, e, "cmdID", function() {
            return "Save";
        }), t.create = function() {
            var e = U.getItemByClass("SaveCmd", t);
            return e;
        }, t.ID = "Save", t;
    }(), bt = function() {
        function e() {}
        var i;
        return r(e, "laya.net.LocalStorage"), e.__init__ = function() {
            return e._baseClass || (e._baseClass = i, i.init()), e.items = e._baseClass.items, 
            e.support = e._baseClass.support, e.support;
        }, e.setItem = function(t, i) {
            e._baseClass.setItem(t, i);
        }, e.getItem = function(t) {
            return e._baseClass.getItem(t);
        }, e.setJSON = function(t, i) {
            e._baseClass.setJSON(t, i);
        }, e.getJSON = function(t) {
            return e._baseClass.getJSON(t);
        }, e.removeItem = function(t) {
            e._baseClass.removeItem(t);
        }, e.clear = function() {
            e._baseClass.clear();
        }, e._baseClass = null, e.items = null, e.support = !1, e.__init$ = function() {
            i = function() {
                function e() {}
                return r(e, ""), e.init = function() {
                    try {
                        e.support = !0, e.items = t.localStorage, e.setItem("laya", "1"), e.removeItem("laya");
                    } catch (i) {
                        e.support = !1;
                    }
                    e.support || console.log("LocalStorage is not supprot or browser is private mode.");
                }, e.setItem = function(t, i) {
                    try {
                        e.support && e.items.setItem(t, i);
                    } catch (n) {
                        console.warn("set localStorage failed", n);
                    }
                }, e.getItem = function(t) {
                    return e.support ? e.items.getItem(t) : null;
                }, e.setJSON = function(t, i) {
                    try {
                        e.support && e.items.setItem(t, JSON.stringify(i));
                    } catch (n) {
                        console.warn("set localStorage failed", n);
                    }
                }, e.getJSON = function(t) {
                    return JSON.parse(e.support ? e.items.getItem(t) : null);
                }, e.removeItem = function(t) {
                    e.support && e.items.removeItem(t);
                }, e.clear = function() {
                    e.support && e.items.clear();
                }, e.items = null, e.support = !1, e;
            }();
        }, e;
    }(), wt = function() {
        function e() {}
        return r(e, "laya.webgl.WebGL"), e._uint8ArraySlice = function() {
            for (var t = this, e = t.length, i = new Uint8Array(t.length), n = 0; e > n; n++) i[n] = t[n];
            return i;
        }, e._float32ArraySlice = function() {
            for (var t = this, e = t.length, i = new Float32Array(t.length), n = 0; e > n; n++) i[n] = t[n];
            return i;
        }, e._uint16ArraySlice = function(t) {
            var e, i = arguments, n = this, r = 0, s = 0;
            if (0 === i.length) for (r = n.length, e = new Uint16Array(r), s = 0; r > s; s++) e[s] = n[s]; else if (2 === i.length) {
                var a = i[0], o = i[1];
                if (o > a) for (r = o - a, e = new Uint16Array(r), s = a; o > s; s++) e[s - a] = n[s]; else e = new Uint16Array(0);
            }
            return e;
        }, e._nativeRender_enable = function() {
            e.isNativeRender_enable || (e.isNativeRender_enable = !0, nt.__init_native(), ni.prototype.uploadTexture2D = function(t) {
                var e = nt;
                e.bindTexture(laya.webgl.WebGL.mainContext, e.TEXTURE_2D, t);
            }, ft.width = Dt.window.innerWidth, ft.height = Dt.window.innerHeight, ue.measureText = function(e, i) {
                return t.conchTextCanvas.font = i, t.conchTextCanvas.measureText(e);
            }, ue.enableNative = function() {
                Mt.supportWebGLPlusRendering && (vt.uploadShaderUniforms = vt.uploadShaderUniformsForNative, 
                Bt = t.GLCommandEncoder, Pt = t.LayaGLContext);
                var e = ai;
                e.prototype.render = e.prototype.renderToNative;
            }, ue.clear = function(t) {
                ut.set2DRenderConfig();
                var e = o.create(t).arrColor, i = Pt.instance;
                e && i.clearColor(e[0], e[1], e[2], e[3]), i.clear(17664), ft.clear();
            }, ue.drawToCanvas = ue.drawToTexture = function(t, e, i, n, r, s) {
                r -= t.x, s -= t.y, r |= 0, s |= 0, i |= 0, n |= 0;
                var a = new si(!1), o = a.getContext("2d");
                return a.size(i, n), o.asBitmap = !0, o._targets.start(), I.renders[e]._fun(t, o, r, s), 
                o.flush(), o._targets.end(), o._targets.restore(), a;
            }, di.prototype._uv = di.flipyuv, Object.defineProperty(di.prototype, "uv", {
                get: function() {
                    return this._uv;
                },
                set: function(t) {
                    this._uv = t;
                }
            }), si.prototype.getTexture = function() {
                return this._texture || (this._texture = this.context._targets, this._texture.uv = di.flipyuv, 
                this._texture.bitmap = this._texture), this._texture;
            });
        }, e.enable = function() {
            return !0;
        }, e.inner_enable = function() {
            return Float32Array.prototype.slice || (Float32Array.prototype.slice = e._float32ArraySlice), 
            Uint16Array.prototype.slice || (Uint16Array.prototype.slice = e._uint16ArraySlice), 
            Uint8Array.prototype.slice || (Uint8Array.prototype.slice = e._uint8ArraySlice), 
            Mt.isConchApp && e._nativeRender_enable(), !0;
        }, e.onStageResize = function(t, i) {
            null != e.mainContext && (e.mainContext.viewport(0, 0, t, i), ft.width = t, ft.height = i);
        }, e.mainContext = null, e.shaderHighPrecision = !1, e._isWebGL2 = !1, e.isNativeRender_enable = !1, 
        e;
    }(), Ct = function() {
        function t() {
            this._obj = null, this._obj = t.supportWeakMap ? new Dt.window.WeakMap() : {}, t.supportWeakMap || t._maps.push(this);
        }
        r(t, "laya.utils.WeakObject");
        var e = t.prototype;
        return e.set = function(e, i) {
            if (null != e) if (t.supportWeakMap) {
                var n = e;
                ("string" == typeof e || "number" == typeof e) && (n = t._keys[e], n || (n = t._keys[e] = {
                    k: e
                })), this._obj.set(n, i);
            } else "string" == typeof e || "number" == typeof e ? this._obj[e] = i : (e.$_GID || (e.$_GID = ie.getGID()), 
            this._obj[e.$_GID] = i);
        }, e.get = function(e) {
            if (null == e) return null;
            if (t.supportWeakMap) {
                var i = "string" == typeof e || "number" == typeof e ? t._keys[e] : e;
                return i ? this._obj.get(i) : null;
            }
            return "string" == typeof e || "number" == typeof e ? this._obj[e] : this._obj[e.$_GID];
        }, e.del = function(e) {
            if (null != e) if (t.supportWeakMap) {
                var i = "string" == typeof e || "number" == typeof e ? t._keys[e] : e;
                if (!i) return;
                this._obj["delete"](i);
            } else "string" == typeof e || "number" == typeof e ? delete this._obj[e] : delete this._obj[this._obj.$_GID];
        }, e.has = function(e) {
            if (null == e) return !1;
            if (t.supportWeakMap) {
                var i = "string" == typeof e || "number" == typeof e ? t._keys[e] : e;
                return this._obj.has(i);
            }
            return "string" == typeof e || "number" == typeof e ? null != this._obj[e] : null != this._obj[this._obj.$_GID];
        }, t.__init__ = function() {
            t.supportWeakMap = null != Dt.window.WeakMap, t.supportWeakMap || i.systemTimer.loop(t.delInterval, null, t.clearCache);
        }, t.clearCache = function() {
            for (var e = 0, i = t._maps.length; i > e; e++) {
                var n = t._maps[e];
                n._obj = {};
            }
        }, t.supportWeakMap = !1, t.delInterval = 6e5, t._keys = {}, t._maps = [], n(t, [ "I", function() {
            return this.I = new t();
        } ]), t;
    }(), At = function() {
        function t() {}
        r(t, "laya.display.css.BoundsStyle");
        var e = t.prototype;
        return e.reset = function() {
            return this.bounds && this.bounds.recover(), this.userBounds && this.userBounds.recover(), 
            this.bounds = null, this.userBounds = null, this.temBM = null, this;
        }, e.recover = function() {
            U.recover("BoundsStyle", this.reset());
        }, t.create = function() {
            return U.getItemByClass("BoundsStyle", t);
        }, t;
    }(), Et = function() {
        function t(t) {
            this._color = null, this.setValue(t);
        }
        r(t, "laya.webgl.canvas.DrawStyle");
        var e = t.prototype;
        return e.setValue = function(t) {
            t ? this._color = t instanceof laya.utils.ColorUtils ? t : o.create(t) : this._color = o.create("#000000");
        }, e.reset = function() {
            this._color = o.create("#000000");
        }, e.toInt = function() {
            return this._color.numColor;
        }, e.equal = function(t) {
            return "string" == typeof t ? this._color.strColor === t : t instanceof laya.utils.ColorUtils ? this._color.numColor === t.numColor : !1;
        }, e.toColorStr = function() {
            return this._color.strColor;
        }, t.create = function(e) {
            if (e) {
                var i = e instanceof laya.utils.ColorUtils ? e : o.create(e);
                return i._drawStyle || (i._drawStyle = new t(e));
            }
            return t.DEFAULT;
        }, n(t, [ "DEFAULT", function() {
            return this.DEFAULT = new t("#000000");
        } ]), t;
    }(), St = function() {
        function t() {}
        return r(t, "laya.system.System"), t.changeDefinition = function(t, e) {
            i[t] = e;
            var n = t + "=classObj";
            i._runScript(n);
        }, t.__init__ = function() {}, t;
    }(), Mt = (function() {
        function t() {}
        r(t, "laya.display.cmd.DrawParticleCmd");
        var e = t.prototype;
        return e.recover = function() {
            this._templ = null, U.recover("DrawParticleCmd", this);
        }, e.run = function(t, e, i) {
            t.drawParticle(e, i, this._templ);
        }, s(0, e, "cmdID", function() {
            return "DrawParticleCmd";
        }), t.create = function(e) {
            var i = U.getItemByClass("DrawParticleCmd", t);
            return i._templ = e, i;
        }, t.ID = "DrawParticleCmd", t;
    }(), function() {
        function e(t, n) {
            function r(t) {
                i.stage._loop(), Dt.window.requestAnimationFrame(r);
            }
            this._timeId = 0, e._mainCanvas.source.id = "layaCanvas", e._mainCanvas.source.width = t, 
            e._mainCanvas.source.height = n, laya.renders.Render.isConchApp ? Dt.document.body.appendChild(e._mainCanvas.source) : Dt.onKGMiniGame || Dt.container.appendChild(e._mainCanvas.source), 
            this.initRender(e._mainCanvas, t, n), Dt.window.requestAnimationFrame(r), i.stage.on("visibilitychange", this, this._onVisibilitychange);
        }
        r(e, "laya.renders.Render");
        var n = e.prototype;
        return n._onVisibilitychange = function() {
            i.stage.isVisibility ? 0 != this._timeId && Dt.window.clearInterval(this._timeId) : this._timeId = Dt.window.setInterval(this._enterFrame, 1e3);
        }, n.initRender = function(t, e, i) {
            function n(t) {
                var e, i = [ "webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl" ];
                se.useWebGL2 || i.shift();
                for (var n = 0; n < i.length; n++) {
                    try {
                        e = t.getContext(i[n], {
                            stencil: se.isStencil,
                            alpha: se.isAlpha,
                            antialias: se.isAntialias,
                            premultipliedAlpha: se.premultipliedAlpha,
                            preserveDrawingBuffer: se.preserveDrawingBuffer
                        });
                    } catch (r) {}
                    if (e) return "webgl2" === i[n] && (wt._isWebGL2 = !0), new Pt(), e;
                }
                return null;
            }
            var r = Pt.instance = wt.mainContext = n(laya.renders.Render._mainCanvas.source);
            if (!r) return !1;
            t.size(e, i), nt.__init__(r), ut.__init__(), l.__init__();
            var s = new ut();
            s.isMain = !0, laya.renders.Render._context = s, t._setContext(s), wt.shaderHighPrecision = !1;
            try {
                var a = r.getShaderPrecisionFormat(35632, 36338);
                a.precision ? wt.shaderHighPrecision = !0 : wt.shaderHighPrecision = !1;
            } catch (o) {}
            return Pt.instance = r, St.__init__(), Re.__init__(), X.__init__(), F.__init__(), 
            Le.__int__(r), _e._init_(r), !0;
        }, n._enterFrame = function(t) {
            i.stage._loop();
        }, s(1, e, "context", function() {
            return e._context;
        }), s(1, e, "canvas", function() {
            return e._mainCanvas.source;
        }), e._context = null, e._mainCanvas = null, e.supportWebGLPlusCulling = !1, e.supportWebGLPlusAnimation = !1, 
        e.supportWebGLPlusRendering = !1, e.isConchApp = !1, e.is3DMode = !1, e.__init$ = function() {
            e.isConchApp = null != t.conch, e.isConchApp && (e.supportWebGLPlusCulling = !0, 
            e.supportWebGLPlusAnimation = !0, e.supportWebGLPlusRendering = !0);
        }, e;
    }()), Rt = function() {
        function t() {}
        return r(t, "laya.utils.ClassUtils"), t.regClass = function(e, i) {
            t._classMap[e] = i;
        }, t.regShortClassName = function(e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i], r = n.name;
                t._classMap[r] = n;
            }
        }, t.getRegClass = function(e) {
            return t._classMap[e];
        }, t.getClass = function(e) {
            var n = t._classMap[e] || e;
            return "string" == typeof n ? i.__classmap[n] || i[e] : n;
        }, t.getInstance = function(e) {
            var i = t.getClass(e);
            return i ? new i() : (console.warn("[error] Undefined class:", e), null);
        }, t.createByJson = function(e, i, n, r, s) {
            "string" == typeof e && (e = JSON.parse(e));
            var a = e.props;
            if (!i && (i = s ? s.runWith(e) : t.getInstance(a.runtime || e.type), !i)) return null;
            var o = e.child;
            if (o) for (var h = 0, l = o.length; l > h; h++) {
                var u = o[h];
                if ("render" !== u.props.name && "render" !== u.props.renderType || !i._$set_itemRender) if ("Graphic" == u.type) t._addGraphicsToSprite(u, i); else if (t._isDrawType(u.type)) t._addGraphicToSprite(u, i, !0); else {
                    var c = t.createByJson(u, null, n, r, s);
                    "Script" === u.type ? c.hasOwnProperty("owner") ? c.owner = i : c.hasOwnProperty("target") && (c.target = i) : "mask" == u.props.renderType ? i.mask = c : i.addChild(c);
                } else i.itemRender = u;
            }
            if (a) for (var _ in a) {
                var d = a[_];
                "var" === _ && n ? n[d] = i : d instanceof Array && "function" == typeof i[_] ? i[_].apply(i, d) : i[_] = d;
            }
            return r && e.customProps && r.runWith([ i, e ]), i.created && i.created(), i;
        }, t._addGraphicsToSprite = function(e, i) {
            var n = e.child;
            if (n && !(n.length < 1)) {
                var r = t._getGraphicsFromSprite(e, i), s = 0, a = 0;
                e.props && (s = t._getObjVar(e.props, "x", 0), a = t._getObjVar(e.props, "y", 0)), 
                0 != s && 0 != a && r.translate(s, a);
                var o = 0, h = 0;
                for (h = n.length, o = 0; h > o; o++) t._addGraphicToGraphics(n[o], r);
                0 != s && 0 != a && r.translate(-s, -a);
            }
        }, t._addGraphicToSprite = function(e, i, n) {
            void 0 === n && (n = !1);
            var r = n ? t._getGraphicsFromSprite(e, i) : i.graphics;
            t._addGraphicToGraphics(e, r);
        }, t._getGraphicsFromSprite = function(t, e) {
            if (!t || !t.props) return e.graphics;
            var i = t.props.renderType;
            if ("hit" === i || "unHit" === i) {
                var n = e._style.hitArea || (e.hitArea = new ve());
                n[i] || (n[i] = new qt());
                var r = n[i];
            }
            return r || (r = e.graphics), r;
        }, t._getTransformData = function(e) {
            var i;
            (e.hasOwnProperty("pivotX") || e.hasOwnProperty("pivotY")) && (i = i || new st(), 
            i.translate(-t._getObjVar(e, "pivotX", 0), -t._getObjVar(e, "pivotY", 0)));
            var n = t._getObjVar(e, "scaleX", 1), r = t._getObjVar(e, "scaleY", 1), s = t._getObjVar(e, "rotation", 0);
            t._getObjVar(e, "skewX", 0), t._getObjVar(e, "skewY", 0);
            return (1 != n || 1 != r || 0 != s) && (i = i || new st(), i.scale(n, r), i.rotate(.0174532922222222 * s)), 
            i;
        }, t._addGraphicToGraphics = function(e, i) {
            var n;
            if (n = e.props) {
                var r;
                if (r = t.DrawTypeDic[e.type]) {
                    var s = i, a = t._getParams(n, r[1], r[2], r[3]), o = t._tM;
                    (o || 1 != t._alpha) && (s.save(), o && s.transform(o), 1 != t._alpha && s.alpha(t._alpha)), 
                    s[r[0]].apply(s, a), (o || 1 != t._alpha) && s.restore();
                }
            }
        }, t._adptLineData = function(t) {
            return t[2] = parseFloat(t[0]) + parseFloat(t[2]), t[3] = parseFloat(t[1]) + parseFloat(t[3]), 
            t;
        }, t._adptTextureData = function(t) {
            return t[0] = De.getRes(t[0]), t;
        }, t._adptLinesData = function(e) {
            return e[2] = t._getPointListByStr(e[2]), e;
        }, t._isDrawType = function(e) {
            return "Image" === e ? !1 : t.DrawTypeDic.hasOwnProperty(e);
        }, t._getParams = function(e, i, n, r) {
            void 0 === n && (n = 0);
            var s = t._temParam;
            s.length = i.length;
            var a = 0, o = 0;
            for (o = i.length, a = 0; o > a; a++) s[a] = t._getObjVar(e, i[a][0], i[a][1]);
            t._alpha = t._getObjVar(e, "alpha", 1);
            var h;
            return h = t._getTransformData(e), h ? (n || (n = 0), h.translate(s[n], s[n + 1]), 
            s[n] = s[n + 1] = 0, t._tM = h) : t._tM = null, r && t[r] && (s = t[r](s)), s;
        }, t._getPointListByStr = function(t) {
            var e = t.split(","), i = 0, n = 0;
            for (n = e.length, i = 0; n > i; i++) e[i] = parseFloat(e[i]);
            return e;
        }, t._getObjVar = function(t, e, i) {
            return t.hasOwnProperty(e) ? t[e] : i;
        }, t._temParam = [], t._classMap = {
            Sprite: je,
            Scene: hi,
            Text: ei,
            Animation: "laya.display.Animation",
            Skeleton: "laya.ani.bone.Skeleton",
            Particle2D: "laya.particle.Particle2D",
            div: "laya.html.dom.HTMLDivParser",
            p: "laya.html.dom.HTMLElement",
            img: "laya.html.dom.HTMLImageElement",
            span: "laya.html.dom.HTMLElement",
            br: "laya.html.dom.HTMLBrElement",
            style: "laya.html.dom.HTMLStyleElement",
            font: "laya.html.dom.HTMLElement",
            a: "laya.html.dom.HTMLElement",
            "#text": "laya.html.dom.HTMLElement",
            link: "laya.html.dom.HTMLLinkElement"
        }, t._tM = null, t._alpha = NaN, n(t, [ "DrawTypeDic", function() {
            return this.DrawTypeDic = {
                Rect: [ "drawRect", [ [ "x", 0 ], [ "y", 0 ], [ "width", 0 ], [ "height", 0 ], [ "fillColor", null ], [ "lineColor", null ], [ "lineWidth", 1 ] ] ],
                Circle: [ "drawCircle", [ [ "x", 0 ], [ "y", 0 ], [ "radius", 0 ], [ "fillColor", null ], [ "lineColor", null ], [ "lineWidth", 1 ] ] ],
                Pie: [ "drawPie", [ [ "x", 0 ], [ "y", 0 ], [ "radius", 0 ], [ "startAngle", 0 ], [ "endAngle", 0 ], [ "fillColor", null ], [ "lineColor", null ], [ "lineWidth", 1 ] ] ],
                Image: [ "drawTexture", [ [ "x", 0 ], [ "y", 0 ], [ "width", 0 ], [ "height", 0 ] ] ],
                Texture: [ "drawTexture", [ [ "skin", null ], [ "x", 0 ], [ "y", 0 ], [ "width", 0 ], [ "height", 0 ] ], 1, "_adptTextureData" ],
                FillTexture: [ "fillTexture", [ [ "skin", null ], [ "x", 0 ], [ "y", 0 ], [ "width", 0 ], [ "height", 0 ], [ "repeat", null ] ], 1, "_adptTextureData" ],
                FillText: [ "fillText", [ [ "text", "" ], [ "x", 0 ], [ "y", 0 ], [ "font", null ], [ "color", null ], [ "textAlign", null ] ], 1 ],
                Line: [ "drawLine", [ [ "x", 0 ], [ "y", 0 ], [ "toX", 0 ], [ "toY", 0 ], [ "lineColor", null ], [ "lineWidth", 0 ] ], 0, "_adptLineData" ],
                Lines: [ "drawLines", [ [ "x", 0 ], [ "y", 0 ], [ "points", "" ], [ "lineColor", null ], [ "lineWidth", 0 ] ], 0, "_adptLinesData" ],
                Curves: [ "drawCurves", [ [ "x", 0 ], [ "y", 0 ], [ "points", "" ], [ "lineColor", null ], [ "lineWidth", 0 ] ], 0, "_adptLinesData" ],
                Poly: [ "drawPoly", [ [ "x", 0 ], [ "y", 0 ], [ "points", "" ], [ "fillColor", null ], [ "lineColor", null ], [ "lineWidth", 1 ] ], 0, "_adptLinesData" ]
            };
        } ]), t;
    }(), It = function() {
        function t() {
            this._cacheBoundsType = !1;
        }
        r(t, "laya.display.GraphicsBounds");
        var e = t.prototype;
        return e.destroy = function() {
            this._graphics = null, this._cacheBoundsType = !1, this._temp && (this._temp.length = 0), 
            this._rstBoundPoints && (this._rstBoundPoints.length = 0), this._bounds && this._bounds.recover(), 
            this._bounds = null, U.recover("GraphicsBounds", this);
        }, e.reset = function() {
            this._temp && (this._temp.length = 0);
        }, e.getBounds = function(t) {
            return void 0 === t && (t = !1), (!this._bounds || !this._temp || this._temp.length < 1 || t != this._cacheBoundsType) && (this._bounds = mt._getWrapRec(this.getBoundPoints(t), this._bounds)), 
            this._cacheBoundsType = t, this._bounds;
        }, e.getBoundPoints = function(t) {
            return void 0 === t && (t = !1), (!this._temp || this._temp.length < 1 || t != this._cacheBoundsType) && (this._temp = this._getCmdPoints(t)), 
            this._cacheBoundsType = t, this._rstBoundPoints = ie.copyArray(this._rstBoundPoints, this._temp);
        }, e._getCmdPoints = function(e) {
            void 0 === e && (e = !1);
            var i, n = (Mt._context, this._graphics.cmds);
            if (i = this._temp || (this._temp = []), i.length = 0, n || null == this._graphics._one || (t._tempCmds.length = 0, 
            t._tempCmds.push(this._graphics._one), n = t._tempCmds), !n) return i;
            var r = t._tempMatrixArrays;
            r.length = 0;
            var s = t._initMatrix;
            s.identity();
            for (var a, o, h = t._tempMatrix, l = 0, u = n.length; u > l; l++) switch (a = n[l], 
            a.cmdID) {
              case "Alpha":
                r.push(s), s = s.clone();
                break;

              case "Restore":
                s = r.pop();
                break;

              case "Scale":
                h.identity(), h.translate(-a.pivotX, -a.pivotY), h.scale(a.scaleX, a.scaleY), h.translate(a.pivotX, a.pivotY), 
                this._switchMatrix(s, h);
                break;

              case "Rotate":
                h.identity(), h.translate(-a.pivotX, -a.pivotY), h.rotate(a.angle), h.translate(a.pivotX, a.pivotY), 
                this._switchMatrix(s, h);
                break;

              case "Translate":
                h.identity(), h.translate(a.tx, a.ty), this._switchMatrix(s, h);
                break;

              case "Transform":
                h.identity(), h.translate(-a.pivotX, -a.pivotY), h.concat(a.matrix), h.translate(a.pivotX, a.pivotY), 
                this._switchMatrix(s, h);
                break;

              case "DrawImage":
              case "FillTexture":
                t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, a.width, a.height), s);
                break;

              case "DrawTexture":
                s.copyTo(h), a.matrix && h.concat(a.matrix), t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, a.width, a.height), h);
                break;

              case "DrawImage":
                if (o = a.texture, e) a.width && a.height ? t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, a.width, a.height), s) : t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, o.width, o.height), s); else {
                    var c = (a.width || o.sourceWidth) / o.width, _ = (a.height || o.sourceHeight) / o.height, d = c * o.sourceWidth, f = _ * o.sourceHeight, p = o.offsetX > 0 ? o.offsetX : 0, m = o.offsetY > 0 ? o.offsetY : 0;
                    p *= c, m *= _, t._addPointArrToRst(i, mt._getBoundPointS(a.x - p, a.y - m, d, f), s);
                }
                break;

              case "FillTexture":
                a.width && a.height ? t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, a.width, a.height), s) : (o = a.texture, 
                t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, o.width, o.height), s));
                break;

              case "DrawTexture":
                var g;
                a.matrix ? (s.copyTo(h), h.concat(a.matrix), g = h) : g = s, e ? a.width && a.height ? t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, a.width, a.height), g) : (o = a.texture, 
                t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, o.width, o.height), g)) : (o = a.texture, 
                c = (a.width || o.sourceWidth) / o.width, _ = (a.height || o.sourceHeight) / o.height, 
                d = c * o.sourceWidth, f = _ * o.sourceHeight, p = o.offsetX > 0 ? o.offsetX : 0, 
                m = o.offsetY > 0 ? o.offsetY : 0, p *= c, m *= _, t._addPointArrToRst(i, mt._getBoundPointS(a.x - p, a.y - m, d, f), g));
                break;

              case "DrawRect":
                t._addPointArrToRst(i, mt._getBoundPointS(a.x, a.y, a.width, a.height), s);
                break;

              case "DrawCircle":
                t._addPointArrToRst(i, mt._getBoundPointS(a.x - a.radius, a.y - a.radius, a.radius + a.radius, a.radius + a.radius), s);
                break;

              case "DrawLine":
                t._tempPoints.length = 0;
                var v = NaN;
                v = .5 * a.lineWidth, a.fromX == a.toX ? t._tempPoints.push(a.fromX + v, a.fromY, a.toX + v, a.toY, a.fromX - v, a.fromY, a.toX - v, a.toY) : a.fromY == a.toY ? t._tempPoints.push(a.fromX, a.fromY + v, a.toX, a.toY + v, a.fromX, a.fromY - v, a.toX, a.toY - v) : t._tempPoints.push(a.fromX, a.fromY, a.toX, a.toY), 
                t._addPointArrToRst(i, t._tempPoints, s);
                break;

              case "DrawCurves":
                t._addPointArrToRst(i, Ot.I.getBezierPoints(a.points), s, a.x, a.y);
                break;

              case "DrawLines":
              case "DrawPoly":
                t._addPointArrToRst(i, a.points, s, a.x, a.y);
                break;

              case "DrawPath":
                t._addPointArrToRst(i, this._getPathPoints(a.paths), s, a.x, a.y);
                break;

              case "DrawPie":
                t._addPointArrToRst(i, this._getPiePoints(a.x, a.y, a.radius, a.startAngle, a.endAngle), s);
            }
            return i.length > 200 ? i = ie.copyArray(i, mt._getWrapRec(i)._getBoundPoints()) : i.length > 8 && (i = Y.scanPList(i)), 
            i;
        }, e._switchMatrix = function(t, e) {
            e.concat(t), e.copyTo(t);
        }, e._getPiePoints = function(e, i, n, r, s) {
            var a = t._tempPoints;
            t._tempPoints.length = 0;
            var o = Math.PI / 180, h = s - r;
            if (h >= 360 || -360 >= h) return a.push(e - n, i - n), a.push(e + n, i - n), a.push(e + n, i + n), 
            a.push(e - n, i + n), a;
            a.push(e, i);
            var l = h % 360;
            0 > l && (l += 360);
            var u = r + l, c = r * o, _ = u * o;
            a.push(e + n * Math.cos(c), i + n * Math.sin(c)), a.push(e + n * Math.cos(_), i + n * Math.sin(_));
            for (var d = 90 * Math.ceil(r / 90), f = 90 * Math.floor(u / 90), p = d; f >= p; p += 90) {
                var m = p * o;
                a.push(e + n * Math.cos(m), i + n * Math.sin(m));
            }
            return a;
        }, e._getPathPoints = function(e) {
            var i = 0, n = 0, r = t._tempPoints;
            r.length = 0, n = e.length;
            var s;
            for (i = 0; n > i; i++) s = e[i], s.length > 1 && (r.push(s[1], s[2]), s.length > 3 && r.push(s[3], s[4]));
            return r;
        }, t.create = function() {
            return U.getItemByClass("GraphicsBounds", t);
        }, t._addPointArrToRst = function(e, i, n, r, s) {
            void 0 === r && (r = 0), void 0 === s && (s = 0);
            var a = 0, o = 0;
            for (o = i.length, a = 0; o > a; a += 2) t._addPointToRst(e, i[a] + r, i[a + 1] + s, n);
        }, t._addPointToRst = function(t, e, i, n) {
            var r = Yt.TEMP;
            r.setTo(e ? e : 0, i ? i : 0), n.transformPoint(r), t.push(r.x, r.y);
        }, t._tempPoints = [], t._tempMatrixArrays = [], t._tempCmds = [], n(t, [ "_tempMatrix", function() {
            return this._tempMatrix = new st();
        }, "_initMatrix", function() {
            return this._initMatrix = new st();
        } ]), t;
    }(), Pt = function() {
        function t() {}
        r(t, "laya.layagl.LayaGL");
        var e = t.prototype;
        return e.createCommandEncoder = function(t, e, i) {
            return void 0 === t && (t = 128), void 0 === e && (e = 64), void 0 === i && (i = !1), 
            new Bt(this, t, e, i);
        }, e.beginCommandEncoding = function(t) {}, e.endCommandEncoding = function() {}, 
        e.matrix4x4Multiply = function(t, e, i) {}, e.evaluateClipDatasRealTime = function(t, e, i, n) {}, 
        t.getFrameCount = function() {
            return 0;
        }, t.syncBufferToRenderThread = function(t, e) {
            void 0 === e && (e = 0);
        }, t.createArrayBufferRef = function(t, e, i) {}, t.createArrayBufferRefs = function(t, e, i, n) {}, 
        t.EXECUTE_JS_THREAD_BUFFER = 0, t.EXECUTE_RENDER_THREAD_BUFFER = 1, t.EXECUTE_COPY_TO_RENDER = 2, 
        t.EXECUTE_COPY_TO_RENDER3D = 3, t.ARRAY_BUFFER_TYPE_DATA = 0, t.ARRAY_BUFFER_TYPE_CMD = 1, 
        t.ARRAY_BUFFER_REF_REFERENCE = 0, t.ARRAY_BUFFER_REF_COPY = 1, t.UPLOAD_SHADER_UNIFORM_TYPE_ID = 0, 
        t.UPLOAD_SHADER_UNIFORM_TYPE_DATA = 1, t.instance = null, t;
    }(), Dt = function() {
        function e() {}
        return r(e, "laya.utils.Browser"), s(1, e, "pixelRatio", function() {
            if (e._pixelRatio < 0) if (e.__init__(), e.userAgent.indexOf("Mozilla/6.0(Linux; Android 6.0; HUAWEI NXT-AL10 Build/HUAWEINXT-AL10)") > -1) e._pixelRatio = 2; else {
                var t = e.context, i = t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1;
                e._pixelRatio = (e._window.devicePixelRatio || 1) / i, e._pixelRatio < 1 && (e._pixelRatio = 1);
            }
            return e._pixelRatio;
        }), s(1, e, "height", function() {
            return e.__init__(), (i.stage && i.stage.canvasRotation ? e.clientWidth : e.clientHeight) * e.pixelRatio;
        }), s(1, e, "clientWidth", function() {
            return e.__init__(), e._window.innerWidth || e._document.body.clientWidth;
        }), s(1, e, "window", function() {
            return e._window || e.__init__();
        }), s(1, e, "clientHeight", function() {
            return e.__init__(), e._window.innerHeight || e._document.body.clientHeight || e._document.documentElement.clientHeight;
        }), s(1, e, "width", function() {
            return e.__init__(), (i.stage && i.stage.canvasRotation ? e.clientHeight : e.clientWidth) * e.pixelRatio;
        }), s(1, e, "container", function() {
            return e._container || (e.__init__(), e._container = e.createElement("div"), e._container.id = "layaContainer", 
            e._document.body.appendChild(e._container)), e._container;
        }, function(t) {
            e._container = t;
        }), s(1, e, "document", function() {
            return e.__init__(), e._document;
        }), e.__init__ = function() {
            if (e._window) return e._window;
            var n = e._window = t, r = e._document = n.document, s = e.userAgent = n.navigator.userAgent, a = n._layalibs;
            if (a) {
                a.sort(function(t, e) {
                    return t.i - e.i;
                });
                for (var o = 0; o < a.length; o++) a[o].f(n, r, i);
            }
            s.indexOf("MiniGame") > -1 && e.window.hasOwnProperty("wx") && (i.MiniAdpter ? i.MiniAdpter.enable() : console.error("请先添加小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0")), 
            s.indexOf("SwanGame") > -1 && (i.BMiniAdapter ? i.BMiniAdapter.enable() : console.error("请先添加百度小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0")), 
            "function" == typeof getApp && (i.KGMiniAdapter ? i.KGMiniAdapter.enable() : console.error("请先添加小米小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0")), 
            s.indexOf("OPPO") > -1 && s.indexOf("MiniGame") > -1 && (i.QGMiniAdapter ? i.QGMiniAdapter.enable() : console.error("请先添加OPPO小游戏适配库")), 
            n.trace = console.log, n.requestAnimationFrame = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || n.oRequestAnimationFrame || n.msRequestAnimationFrame || function(t) {
                return n.setTimeout(t, 1e3 / 60);
            };
            var h = r.body.style;
            h.margin = 0, h.overflow = "hidden", h["-webkit-user-select"] = "none", h["-webkit-tap-highlight-color"] = "rgba(200,200,200,0)";
            for (var l = r.getElementsByTagName("meta"), u = 0, c = !1, _ = "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"; u < l.length; ) {
                var d = l[u];
                if ("viewport" == d.name) {
                    d.content = _, c = !0;
                    break;
                }
                u++;
            }
            c || (d = r.createElement("meta"), d.name = "viewport", d.content = _, r.getElementsByTagName("head")[0].appendChild(d)), 
            e.onMobile = t.isConchApp ? !0 : s.indexOf("Mobile") > -1, e.onIOS = !!s.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/), 
            e.onIPhone = s.indexOf("iPhone") > -1, e.onMac = s.indexOf("Mac OS X") > -1, e.onIPad = s.indexOf("iPad") > -1, 
            e.onAndroid = s.indexOf("Android") > -1 || s.indexOf("Adr") > -1, e.onWP = s.indexOf("Windows Phone") > -1, 
            e.onQQBrowser = s.indexOf("QQBrowser") > -1, e.onMQQBrowser = s.indexOf("MQQBrowser") > -1 || s.indexOf("Mobile") > -1 && s.indexOf("QQ") > -1, 
            e.onIE = !!n.ActiveXObject || "ActiveXObject" in n, e.onWeiXin = s.indexOf("MicroMessenger") > -1, 
            e.onSafari = s.indexOf("Safari") > -1, e.onPC = !e.onMobile, e.onMiniGame = s.indexOf("MiniGame") > -1, 
            e.onBDMiniGame = s.indexOf("SwanGame") > -1, s.indexOf("OPPO") > -1 && s.indexOf("MiniGame") > -1 && (e.onQGMiniGame = !0, 
            e.onMiniGame = !1), e.onLimixiu = s.indexOf("limixiu") > -1, e.onKGMiniGame = s.indexOf("QuickGame") > -1, 
            e.supportLocalStorage = bt.__init__(), e.supportWebAudio = ye.__init__(), Mt._mainCanvas = new si(!0);
            var f = Mt._mainCanvas.source.style;
            f.position = "absolute", f.top = f.left = "0px", f.background = "#000000", e.canvas = new si(!0), 
            e.context = e.canvas.getContext("2d");
            var p = new si(!0);
            laya.utils.Browser.onQGMiniGame && (p = Mt._mainCanvas);
            var m = [ "webgl", "experimental-webgl", "webkit-3d", "moz-webgl" ], g = null;
            for (u = 0; u < m.length; u++) {
                try {
                    g = p.source.getContext(m[u]);
                } catch (v) {}
                if (g) {
                    e._supportWebGL = !0;
                    break;
                }
            }
            return n;
        }, e.createElement = function(t) {
            return e.__init__(), e._document.createElement(t);
        }, e.getElementById = function(t) {
            return e.__init__(), e._document.getElementById(t);
        }, e.removeElement = function(t) {
            t && t.parentNode && t.parentNode.removeChild(t);
        }, e.now = function() {
            return Date.now();
        }, e.userAgent = null, e.onMobile = !1, e.onIOS = !1, e.onMac = !1, e.onIPhone = !1, 
        e.onIPad = !1, e.onAndroid = !1, e.onWP = !1, e.onQQBrowser = !1, e.onMQQBrowser = !1, 
        e.onSafari = !1, e.onIE = !1, e.onWeiXin = !1, e.onPC = !1, e.onMiniGame = !1, e.onBDMiniGame = !1, 
        e.onKGMiniGame = !1, e.onQGMiniGame = !1, e.onLimixiu = !1, e.onFirefox = !1, e.onEdge = !1, 
        e.supportWebAudio = !1, e.supportLocalStorage = !1, e.canvas = null, e.context = null, 
        e._window = null, e._document = null, e._container = null, e._pixelRatio = -1, e._supportWebGL = !1, 
        e;
    }(), Lt = function() {
        function t() {
            this._matrix = new st();
        }
        r(t, "laya.webgl.canvas.save.SaveTransform");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            e._curMat = this._savematrix, t.POOL[t.POOL._length++] = this;
        }, t.save = function(e) {
            var i = e._saveMark;
            if (2048 !== (2048 & i._saveuse)) {
                i._saveuse |= 2048;
                var n = t.POOL, r = n._length > 0 ? n[--n._length] : new t();
                r._savematrix = e._curMat, e._curMat = e._curMat.copyTo(r._matrix);
                var s = e._save;
                s[s._length++] = r;
            }
        }, t.POOL = h._createArray(), t;
    }(), Bt = function() {
        function t(t, e, i, n) {
            this._idata = [];
        }
        r(t, "laya.layagl.CommandEncoder");
        var e = t.prototype;
        return e.getArrayData = function() {
            return this._idata;
        }, e.getPtrID = function() {
            return 0;
        }, e.beginEncoding = function() {}, e.endEncoding = function() {}, e.clearEncoding = function() {
            this._idata.length = 0;
        }, e.getCount = function() {
            return this._idata.length;
        }, e.add_ShaderValue = function(t) {
            this._idata.push(t);
        }, e.addShaderUniform = function(t) {
            this.add_ShaderValue(t);
        }, t;
    }(), Ft = function() {
        function t() {}
        r(t, "laya.display.cmd.FillBorderTextCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("FillBorderTextCmd", this);
        }, e.run = function(t, e, i) {
            t.fillBorderText(this.text, this.x + e, this.y + i, this.font, this.fillColor, this.borderColor, this.lineWidth, this.textAlign);
        }, s(0, e, "cmdID", function() {
            return "FillBorderText";
        }), t.create = function(e, i, n, r, s, a, o, h) {
            var l = U.getItemByClass("FillBorderTextCmd", t);
            return l.text = e, l.x = i, l.y = n, l.font = r, l.fillColor = s, l.borderColor = a, 
            l.lineWidth = o, l.textAlign = h, l;
        }, t.ID = "FillBorderText", t;
    }(), Ot = function() {
        function t() {
            this._controlPoints = [ new Yt(), new Yt(), new Yt() ], this._calFun = this.getPoint2;
        }
        r(t, "laya.maths.Bezier");
        var e = t.prototype;
        return e._switchPoint = function(t, e) {
            var i = this._controlPoints.shift();
            i.setTo(t, e), this._controlPoints.push(i);
        }, e.getPoint2 = function(t, e) {
            var i = this._controlPoints[0], n = this._controlPoints[1], r = this._controlPoints[2], s = Math.pow(1 - t, 2) * i.x + 2 * t * (1 - t) * n.x + Math.pow(t, 2) * r.x, a = Math.pow(1 - t, 2) * i.y + 2 * t * (1 - t) * n.y + Math.pow(t, 2) * r.y;
            e.push(s, a);
        }, e.getPoint3 = function(t, e) {
            var i = this._controlPoints[0], n = this._controlPoints[1], r = this._controlPoints[2], s = this._controlPoints[3], a = Math.pow(1 - t, 3) * i.x + 3 * n.x * t * (1 - t) * (1 - t) + 3 * r.x * t * t * (1 - t) + s.x * Math.pow(t, 3), o = Math.pow(1 - t, 3) * i.y + 3 * n.y * t * (1 - t) * (1 - t) + 3 * r.y * t * t * (1 - t) + s.y * Math.pow(t, 3);
            e.push(a, o);
        }, e.insertPoints = function(t, e) {
            var i = NaN;
            t = t > 0 ? t : 5;
            var n = NaN;
            for (n = 1 / t, i = 0; 1 >= i; i += n) this._calFun(i, e);
        }, e.getBezierPoints = function(t, e, i) {
            void 0 === e && (e = 5), void 0 === i && (i = 2);
            var n = 0, r = 0;
            if (r = t.length, 2 * (i + 1) > r) return [];
            var s = [];
            switch (i) {
              case 2:
                this._calFun = this.getPoint2;
                break;

              case 3:
                this._calFun = this.getPoint3;
                break;

              default:
                return [];
            }
            for (;this._controlPoints.length <= i; ) this._controlPoints.push(Yt.create());
            for (n = 0; 2 * i > n; n += 2) this._switchPoint(t[n], t[n + 1]);
            for (n = 2 * i; r > n; n += 2) this._switchPoint(t[n], t[n + 1]), n / 2 % i == 0 && this.insertPoints(e, s);
            return s;
        }, n(t, [ "I", function() {
            return this.I = new t();
        } ]), t;
    }(), Nt = function() {
        function t() {}
        r(t, "laya.display.cmd.Draw9GridTexture");
        var e = t.prototype;
        return e.recover = function() {
            this.texture._removeReference(), U.recover("Draw9GridTexture", this);
        }, e.run = function(t, e, i) {
            t.drawTextureWithSizeGrid(this.texture, this.x, this.y, this.width, this.height, this.sizeGrid, e, i);
        }, s(0, e, "cmdID", function() {
            return "Draw9GridTexture";
        }), t.create = function(e, i, n, r, s, a) {
            var o = U.getItemByClass("Draw9GridTexture", t);
            return o.texture = e, e._addReference(), o.x = i, o.y = n, o.width = r, o.height = s, 
            o.sizeGrid = a, o;
        }, t.ID = "Draw9GridTexture", t;
    }(), kt = function() {
        function t() {
            this.texWidth = 1024, this.texHeight = 1024, this.atlasgrid = null, this.protectDist = 1, 
            this.texture = null, this.charMaps = {}, this.texHeight = this.texWidth = C.atlasWidth, 
            this.texture = qe.getTextTexture(this.texWidth, this.texHeight), this.texWidth / t.atlasGridW > 256 && (t.atlasGridW = Math.ceil(this.texWidth / 256)), 
            this.atlasgrid = new Qt(this.texWidth / t.atlasGridW, this.texHeight / t.atlasGridW, this.texture.id);
        }
        r(t, "laya.webgl.text.TextAtlas");
        var e = t.prototype;
        return e.setProtecteDist = function(t) {
            this.protectDist = t;
        }, e.getAEmpty = function(e, i, n) {
            var r = this.atlasgrid.addRect(1, Math.ceil(e / t.atlasGridW), Math.ceil(i / t.atlasGridW), n);
            return r && (n.x *= t.atlasGridW, n.y *= t.atlasGridW), r;
        }, e.destroy = function() {
            for (var t in this.charMaps) {
                var e = this.charMaps[t];
                e.deleted = !0;
            }
            this.texture.discard();
        }, e.printDebugInfo = function() {}, s(0, e, "usedRate", function() {
            return this.atlasgrid._used;
        }), t.atlasGridW = 16, t;
    }(), Ut = function() {
        function t() {
            this._strsToID = {}, this._idToStrs = [], this._length = 0;
        }
        r(t, "laya.utils.StringKey");
        var e = t.prototype;
        return e.add = function(t) {
            var e = this._strsToID[t];
            return null != e ? e : (this._idToStrs[this._length] = t, this._strsToID[t] = this._length++);
        }, e.getID = function(t) {
            var e = this._strsToID[t];
            return null == e ? -1 : e;
        }, e.getName = function(t) {
            var e = this._idToStrs[t];
            return null == e ? void 0 : e;
        }, t;
    }(), Wt = function() {
        function t() {
            this.ratio = .92, this.maxOffset = 60, this._dragging = !1, this._clickOnly = !0;
        }
        r(t, "laya.utils.Dragging");
        var e = t.prototype;
        return e.start = function(t, e, n, r, s, a, o, h) {
            void 0 === h && (h = .92), this.clearTimer(), this.target = t, this.area = e, this.hasInertia = n, 
            this.elasticDistance = e ? r : 0, this.elasticBackTime = s, this.data = a, this._disableMouseEvent = o, 
            this.ratio = h, this._parent = t.parent, this._clickOnly = !0, this._dragging = !0, 
            this._elasticRateX = this._elasticRateY = 1, this._lastX = this._parent.mouseX, 
            this._lastY = this._parent.mouseY, i.stage.on("mouseup", this, this.onStageMouseUp), 
            i.stage.on("mouseout", this, this.onStageMouseUp), i.systemTimer.frameLoop(1, this, this.loop);
        }, e.clearTimer = function() {
            i.systemTimer.clear(this, this.loop), i.systemTimer.clear(this, this.tweenMove), 
            this._tween && (this._tween.recover(), this._tween = null);
        }, e.stop = function() {
            this._dragging && (S.instance.disableMouseEvent = !1, i.stage.off("mouseup", this, this.onStageMouseUp), 
            i.stage.off("mouseout", this, this.onStageMouseUp), this._dragging = !1, this.target && this.area && this.backToArea(), 
            this.clear());
        }, e.loop = function() {
            var t = this._parent.getMousePoint(), e = t.x, n = t.y, r = e - this._lastX, s = n - this._lastY;
            if (this._clickOnly) {
                if (!(Math.abs(r * i.stage._canvasTransform.getScaleX()) > 1 || Math.abs(s * i.stage._canvasTransform.getScaleY()) > 1)) return;
                this._clickOnly = !1, this._offsets || (this._offsets = []), this._offsets.length = 0, 
                this.target.event("dragstart", this.data), S.instance.disableMouseEvent = this._disableMouseEvent;
            } else this._offsets.push(r, s);
            (0 !== r || 0 !== s) && (this._lastX = e, this._lastY = n, this.target.x += r * this._elasticRateX, 
            this.target.y += s * this._elasticRateY, this.area && this.checkArea(), this.target.event("dragmove", this.data));
        }, e.checkArea = function() {
            if (this.elasticDistance <= 0) this.backToArea(); else {
                if (this.target._x < this.area.x) var t = this.area.x - this.target._x; else t = this.target._x > this.area.x + this.area.width ? this.target._x - this.area.x - this.area.width : 0;
                if (this._elasticRateX = Math.max(0, 1 - t / this.elasticDistance), this.target._y < this.area.y) var e = this.area.y - this.target.y; else e = this.target._y > this.area.y + this.area.height ? this.target._y - this.area.y - this.area.height : 0;
                this._elasticRateY = Math.max(0, 1 - e / this.elasticDistance);
            }
        }, e.backToArea = function() {
            this.target.x = Math.min(Math.max(this.target._x, this.area.x), this.area.x + this.area.width), 
            this.target.y = Math.min(Math.max(this.target._y, this.area.y), this.area.y + this.area.height);
        }, e.onStageMouseUp = function(t) {
            if (S.instance.disableMouseEvent = !1, i.stage.off("mouseup", this, this.onStageMouseUp), 
            i.stage.off("mouseout", this, this.onStageMouseUp), i.systemTimer.clear(this, this.loop), 
            !this._clickOnly && this.target) if (this.hasInertia) {
                this._offsets.length < 1 && this._offsets.push(this._parent.mouseX - this._lastX, this._parent.mouseY - this._lastY), 
                this._offsetX = this._offsetY = 0;
                for (var e = this._offsets.length, n = Math.min(e, 6), r = this._offsets.length - n, s = e - 1; s > r; s--) this._offsetY += this._offsets[s--], 
                this._offsetX += this._offsets[s];
                this._offsetX = this._offsetX / n * 2, this._offsetY = this._offsetY / n * 2, Math.abs(this._offsetX) > this.maxOffset && (this._offsetX = this._offsetX > 0 ? this.maxOffset : -this.maxOffset), 
                Math.abs(this._offsetY) > this.maxOffset && (this._offsetY = this._offsetY > 0 ? this.maxOffset : -this.maxOffset), 
                i.systemTimer.frameLoop(1, this, this.tweenMove);
            } else this.elasticDistance > 0 ? this.checkElastic() : this.clear();
        }, e.checkElastic = function() {
            var t = NaN, e = NaN;
            if (this.target.x < this.area.x ? t = this.area.x : this.target._x > this.area.x + this.area.width && (t = this.area.x + this.area.width), 
            this.target.y < this.area.y ? e = this.area.y : this.target._y > this.area.y + this.area.height && (e = this.area.y + this.area.height), 
            isNaN(t) && isNaN(e)) this.clear(); else {
                var i = {};
                isNaN(t) || (i.x = t), isNaN(e) || (i.y = e), this._tween = z.to(this.target, i, this.elasticBackTime, te.sineOut, g.create(this, this.clear), 0, !1, !1);
            }
        }, e.tweenMove = function() {
            this._offsetX *= this.ratio * this._elasticRateX, this._offsetY *= this.ratio * this._elasticRateY, 
            this.target.x += this._offsetX, this.target.y += this._offsetY, this.area && this.checkArea(), 
            this.target.event("dragmove", this.data), (Math.abs(this._offsetX) < 1 && Math.abs(this._offsetY) < 1 || this._elasticRateX < .5 || this._elasticRateY < .5) && (i.systemTimer.clear(this, this.tweenMove), 
            this.elasticDistance > 0 ? this.checkElastic() : this.clear());
        }, e.clear = function() {
            if (this.target) {
                this.clearTimer();
                var t = this.target;
                this.target = null, this._parent = null, t.event("dragend", this.data);
            }
        }, t;
    }(), Vt = function() {
        function t() {}
        return r(t, "laya.webgl.shapes.Earcut"), t.earcut = function(e, i, n) {
            n = n || 2;
            var r = i && i.length, s = r ? i[0] * n : e.length, a = t.linkedList(e, 0, s, n, !0), o = [];
            if (!a) return o;
            var h, l, u, c, _, d, f;
            if (r && (a = t.eliminateHoles(e, i, a, n)), e.length > 80 * n) {
                h = u = e[0], l = c = e[1];
                for (var p = n; s > p; p += n) _ = e[p], d = e[p + 1], h > _ && (h = _), l > d && (l = d), 
                _ > u && (u = _), d > c && (c = d);
                f = Math.max(u - h, c - l), f = 0 !== f ? 1 / f : 0;
            }
            return t.earcutLinked(a, o, n, h, l, f), o;
        }, t.linkedList = function(e, i, n, r, s) {
            var a, o;
            if (s === t.signedArea(e, i, n, r) > 0) for (a = i; n > a; a += r) o = t.insertNode(a, e[a], e[a + 1], o); else for (a = n - r; a >= i; a -= r) o = t.insertNode(a, e[a], e[a + 1], o);
            return o && t.equals(o, o.next) && (t.removeNode(o), o = o.next), o;
        }, t.filterPoints = function(e, i) {
            if (!e) return e;
            i || (i = e);
            var n, r = e;
            do {
                if (n = !1, r.steiner || !t.equals(r, r.next) && 0 !== t.area(r.prev, r, r.next)) r = r.next; else {
                    if (t.removeNode(r), r = i = r.prev, r === r.next) break;
                    n = !0;
                }
            } while (n || r !== i);
            return i;
        }, t.earcutLinked = function(e, i, n, r, s, a, o) {
            if (e) {
                !o && a && t.indexCurve(e, r, s, a);
                for (var h, l, u = e; e.prev !== e.next; ) if (h = e.prev, l = e.next, a ? t.isEarHashed(e, r, s, a) : t.isEar(e)) i.push(h.i / n), 
                i.push(e.i / n), i.push(l.i / n), t.removeNode(e), e = l.next, u = l.next; else if (e = l, 
                e === u) {
                    o ? 1 === o ? (e = t.cureLocalIntersections(e, i, n), t.earcutLinked(e, i, n, r, s, a, 2)) : 2 === o && t.splitEarcut(e, i, n, r, s, a) : t.earcutLinked(t.filterPoints(e, null), i, n, r, s, a, 1);
                    break;
                }
            }
        }, t.isEar = function(e) {
            var i = e.prev, n = e, r = e.next;
            if (t.area(i, n, r) >= 0) return !1;
            for (var s = e.next.next; s !== e.prev; ) {
                if (t.pointInTriangle(i.x, i.y, n.x, n.y, r.x, r.y, s.x, s.y) && t.area(s.prev, s, s.next) >= 0) return !1;
                s = s.next;
            }
            return !0;
        }, t.isEarHashed = function(e, i, n, r) {
            var s = e.prev, a = e, o = e.next;
            if (t.area(s, a, o) >= 0) return !1;
            for (var h = s.x < a.x ? s.x < o.x ? s.x : o.x : a.x < o.x ? a.x : o.x, l = s.y < a.y ? s.y < o.y ? s.y : o.y : a.y < o.y ? a.y : o.y, u = s.x > a.x ? s.x > o.x ? s.x : o.x : a.x > o.x ? a.x : o.x, c = s.y > a.y ? s.y > o.y ? s.y : o.y : a.y > o.y ? a.y : o.y, _ = t.zOrder(h, l, i, n, r), d = t.zOrder(u, c, i, n, r), f = e.nextZ; f && f.z <= d; ) {
                if (f !== e.prev && f !== e.next && t.pointInTriangle(s.x, s.y, a.x, a.y, o.x, o.y, f.x, f.y) && t.area(f.prev, f, f.next) >= 0) return !1;
                f = f.nextZ;
            }
            for (f = e.prevZ; f && f.z >= _; ) {
                if (f !== e.prev && f !== e.next && t.pointInTriangle(s.x, s.y, a.x, a.y, o.x, o.y, f.x, f.y) && t.area(f.prev, f, f.next) >= 0) return !1;
                f = f.prevZ;
            }
            return !0;
        }, t.cureLocalIntersections = function(e, i, n) {
            var r = e;
            do {
                var s = r.prev, a = r.next.next;
                !t.equals(s, a) && t.intersects(s, r, r.next, a) && t.locallyInside(s, a) && t.locallyInside(a, s) && (i.push(s.i / n), 
                i.push(r.i / n), i.push(a.i / n), t.removeNode(r), t.removeNode(r.next), r = e = a), 
                r = r.next;
            } while (r !== e);
            return r;
        }, t.splitEarcut = function(e, i, n, r, s, a) {
            var o = e;
            do {
                for (var h = o.next.next; h !== o.prev; ) {
                    if (o.i !== h.i && t.isValidDiagonal(o, h)) {
                        var l = t.splitPolygon(o, h);
                        return o = t.filterPoints(o, o.next), l = t.filterPoints(l, l.next), t.earcutLinked(o, i, n, r, s, a), 
                        void t.earcutLinked(l, i, n, r, s, a);
                    }
                    h = h.next;
                }
                o = o.next;
            } while (o !== e);
        }, t.eliminateHoles = function(e, i, n, r) {
            var s, a, o, h, l, u = [];
            for (s = 0, a = i.length; a > s; s++) o = i[s] * r, h = a - 1 > s ? i[s + 1] * r : e.length, 
            l = t.linkedList(e, o, h, r, !1), l === l.next && (l.steiner = !0), u.push(t.getLeftmost(l));
            for (u.sort(t.compareX), s = 0; s < u.length; s++) t.eliminateHole(u[s], n), n = t.filterPoints(n, n.next);
            return n;
        }, t.compareX = function(t, e) {
            return t.x - e.x;
        }, t.eliminateHole = function(e, i) {
            if (i = t.findHoleBridge(e, i)) {
                var n = t.splitPolygon(i, e);
                t.filterPoints(n, n.next);
            }
        }, t.findHoleBridge = function(e, i) {
            var n, r = i, s = e.x, a = e.y, o = -(1 / 0);
            do {
                if (a <= r.y && a >= r.next.y && r.next.y !== r.y) {
                    var h = r.x + (a - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                    if (s >= h && h > o) {
                        if (o = h, h === s) {
                            if (a === r.y) return r;
                            if (a === r.next.y) return r.next;
                        }
                        n = r.x < r.next.x ? r : r.next;
                    }
                }
                r = r.next;
            } while (r !== i);
            if (!n) return null;
            if (s === o) return n.prev;
            var l, u = n, c = n.x, _ = n.y, d = 1 / 0;
            for (r = n.next; r !== u; ) s >= r.x && r.x >= c && s !== r.x && t.pointInTriangle(_ > a ? s : o, a, c, _, _ > a ? o : s, a, r.x, r.y) && (l = Math.abs(a - r.y) / (s - r.x), 
            (d > l || l === d && r.x > n.x) && t.locallyInside(r, e) && (n = r, d = l)), r = r.next;
            return n;
        }, t.indexCurve = function(e, i, n, r) {
            var s = e;
            do {
                null === s.z && (s.z = t.zOrder(s.x, s.y, i, n, r)), s.prevZ = s.prev, s.nextZ = s.next, 
                s = s.next;
            } while (s !== e);
            s.prevZ.nextZ = null, s.prevZ = null, t.sortLinked(s);
        }, t.sortLinked = function(t) {
            var e, i, n, r, s, a, o, h, l = 1;
            do {
                for (i = t, t = null, s = null, a = 0; i; ) {
                    for (a++, n = i, o = 0, e = 0; l > e && (o++, n = n.nextZ, n); e++) ;
                    for (h = l; o > 0 || h > 0 && n; ) 0 !== o && (0 === h || !n || i.z <= n.z) ? (r = i, 
                    i = i.nextZ, o--) : (r = n, n = n.nextZ, h--), s ? s.nextZ = r : t = r, r.prevZ = s, 
                    s = r;
                    i = n;
                }
                s.nextZ = null, l *= 2;
            } while (a > 1);
            return t;
        }, t.zOrder = function(t, e, i, n, r) {
            return t = 32767 * (t - i) * r, e = 32767 * (e - n) * r, t = 16711935 & (t | t << 8), 
            t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), 
            e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), 
            e = 1431655765 & (e | e << 1), t | e << 1;
        }, t.getLeftmost = function(t) {
            var e = t, i = t;
            do {
                e.x < i.x && (i = e), e = e.next;
            } while (e !== t);
            return i;
        }, t.pointInTriangle = function(t, e, i, n, r, s, a, o) {
            return (r - a) * (e - o) - (t - a) * (s - o) >= 0 && (t - a) * (n - o) - (i - a) * (e - o) >= 0 && (i - a) * (s - o) - (r - a) * (n - o) >= 0;
        }, t.isValidDiagonal = function(e, i) {
            return e.next.i !== i.i && e.prev.i !== i.i && !t.intersectsPolygon(e, i) && t.locallyInside(e, i) && t.locallyInside(i, e) && t.middleInside(e, i);
        }, t.area = function(t, e, i) {
            return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y);
        }, t.equals = function(t, e) {
            return t.x === e.x && t.y === e.y;
        }, t.intersects = function(e, i, n, r) {
            return t.equals(e, i) && t.equals(n, r) || t.equals(e, r) && t.equals(n, i) ? !0 : t.area(e, i, n) > 0 != t.area(e, i, r) > 0 && t.area(n, r, e) > 0 != t.area(n, r, i) > 0;
        }, t.intersectsPolygon = function(e, i) {
            var n = e;
            do {
                if (n.i !== e.i && n.next.i !== e.i && n.i !== i.i && n.next.i !== i.i && t.intersects(n, n.next, e, i)) return !0;
                n = n.next;
            } while (n !== e);
            return !1;
        }, t.locallyInside = function(e, i) {
            return t.area(e.prev, e, e.next) < 0 ? t.area(e, i, e.next) >= 0 && t.area(e, e.prev, i) >= 0 : t.area(e, i, e.prev) < 0 || t.area(e, e.next, i) < 0;
        }, t.middleInside = function(t, e) {
            var i = t, n = !1, r = (t.x + e.x) / 2, s = (t.y + e.y) / 2;
            do {
                i.y > s != i.next.y > s && i.next.y !== i.y && r < (i.next.x - i.x) * (s - i.y) / (i.next.y - i.y) + i.x && (n = !n), 
                i = i.next;
            } while (i !== t);
            return n;
        }, t.splitPolygon = function(t, e) {
            var i = new K(t.i, t.x, t.y), n = new K(e.i, e.x, e.y), r = t.next, s = e.prev;
            return t.next = e, e.prev = t, i.next = r, r.prev = i, n.next = i, i.prev = n, s.next = n, 
            n.prev = s, n;
        }, t.insertNode = function(t, e, i, n) {
            var r = new K(t, e, i);
            return n ? (r.next = n.next, r.prev = n, n.next.prev = r, n.next = r) : (r.prev = r, 
            r.next = r), r;
        }, t.removeNode = function(t) {
            t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), 
            t.nextZ && (t.nextZ.prevZ = t.prevZ);
        }, t.signedArea = function(t, e, i, n) {
            for (var r = 0, s = e, a = i - n; i > s; s += n) r += (t[a] - t[s]) * (t[s + 1] + t[a + 1]), 
            a = s;
            return r;
        }, t;
    }(), Gt = function() {
        function t(t) {
            this.childs = [], this.text = "", this.parent = null, this.name = null, this.noCompile = !1, 
            this.includefiles = null, this.condition = null, this.conditionType = 0, this.useFuns = "", 
            this.z = 0, this.src = null, this.includefiles = t;
        }
        r(t, "laya.webgl.utils.ShaderNode");
        var e = t.prototype;
        return e.setParent = function(t) {
            t.childs.push(this), this.z = t.z + 1, this.parent = t;
        }, e.setCondition = function(t, e) {
            t && (this.conditionType = e, t = t.replace(/(\s*$)/g, ""), this.condition = function() {
                return this[t];
            }, this.condition.__condition = t);
        }, e.toscript = function(e, i) {
            return this._toscript(e, i, ++t.__id);
        }, e._toscript = function(t, e, i) {
            if (this.childs.length < 1 && !this.text) return e;
            e.length;
            if (this.condition) {
                var n = !!this.condition.call(t);
                if (2 === this.conditionType && (n = !n), !n) return e;
            }
            if (this.text && e.push(this.text), this.childs.length > 0 && this.childs.forEach(function(n, r, s) {
                n._toscript(t, e, i);
            }), this.includefiles.length > 0 && this.useFuns.length > 0) for (var r, s = 0, a = this.includefiles.length; a > s; s++) this.includefiles[s].curUseID != i && (r = this.includefiles[s].file.getFunsScript(this.useFuns), 
            r.length > 0 && (this.includefiles[s].curUseID = i, e[0] = r + e[0]));
            return e;
        }, t.__id = 1, t;
    }(), Xt = function() {
        function t() {}
        r(t, "laya.display.cmd.TranslateCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("TranslateCmd", this);
        }, e.run = function(t, e, i) {
            t.translate(this.tx, this.ty);
        }, s(0, e, "cmdID", function() {
            return "Translate";
        }), t.create = function(e, i) {
            var n = U.getItemByClass("TranslateCmd", t);
            return n.tx = e, n.ty = i, n;
        }, t.ID = "Translate", t;
    }(), Yt = function() {
        function t(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e;
        }
        r(t, "laya.maths.Point");
        var e = t.prototype;
        return e.setTo = function(t, e) {
            return this.x = t, this.y = e, this;
        }, e.reset = function() {
            return this.x = this.y = 0, this;
        }, e.recover = function() {
            U.recover("Point", this.reset());
        }, e.distance = function(t, e) {
            return Math.sqrt((this.x - t) * (this.x - t) + (this.y - e) * (this.y - e));
        }, e.toString = function() {
            return this.x + "," + this.y;
        }, e.normalize = function() {
            var t = Math.sqrt(this.x * this.x + this.y * this.y);
            if (t > 0) {
                var e = 1 / t;
                this.x *= e, this.y *= e;
            }
        }, e.copy = function(t) {
            return this.setTo(t.x, t.y);
        }, t.create = function() {
            return U.getItemByClass("Point", t);
        }, t.TEMP = new t(), t.EMPTY = new t(), t;
    }(), Ht = (function() {
        function t() {}
        return r(t, "laya.Const"), t.NOT_ACTIVE = 1, t.ACTIVE_INHIERARCHY = 2, t.AWAKED = 4, 
        t.NOT_READY = 8, t.DISPLAY = 16, t.HAS_ZORDER = 32, t.HAS_MOUSE = 64, t.DISPLAYED_INSTAGE = 128, 
        t.DRAWCALL_OPTIMIZE = 256, t;
    }(), function() {
        function t() {}
        return r(t, "laya.webgl.shapes.BasePoly"), t.createLine2 = function(e, i, n, r, s, a) {
            if (e.length < 4) return null;
            var o = t.tempData.length > e.length + 2 ? t.tempData : new Array(e.length + 2);
            o[0] = e[0], o[1] = e[1];
            var h = 2, l = 0, u = e.length;
            for (l = 2; u > l; l += 2) Math.abs(e[l] - e[l - 2]) + Math.abs(e[l + 1] - e[l - 1]) > .01 && (o[h++] = e[l], 
            o[h++] = e[l + 1]);
            a && Math.abs(e[0] - o[h - 2]) + Math.abs(e[1] - o[h - 1]) > .01 && (o[h++] = e[0], 
            o[h++] = e[1]);
            var c = s;
            u = h / 2;
            var _, d, f, p, m, g, v, y, x, T, b, w, C, A, E, S, M, R, I, P, D, L = n / 2;
            f = o[0], p = o[1], m = o[2], g = o[3], x = -(p - g), T = f - m, D = Math.sqrt(x * x + T * T), 
            x = x / D * L, T = T / D * L;
            for (c.push(f - x, p - T, f + x, p + T), l = 1; u - 1 > l; l++) f = o[2 * (l - 1)], 
            p = o[2 * (l - 1) + 1], m = o[2 * l], g = o[2 * l + 1], v = o[2 * (l + 1)], y = o[2 * (l + 1) + 1], 
            x = -(p - g), T = f - m, D = Math.sqrt(x * x + T * T), x = x / D * L, T = T / D * L, 
            b = -(g - y), w = m - v, D = Math.sqrt(b * b + w * w), b = b / D * L, w = w / D * L, 
            C = -T + p - (-T + g), A = -x + m - (-x + f), E = (-x + f) * (-T + g) - (-x + m) * (-T + p), 
            S = -w + y - (-w + g), M = -b + m - (-b + v), R = (-b + v) * (-w + g) - (-b + m) * (-w + y), 
            I = C * M - S * A, Math.abs(I) < .1 ? (I += 10.1, c.push(m - x, g - T, m + x, g + T)) : (_ = (A * R - M * E) / I, 
            d = (S * E - C * R) / I, P = (_ - m) * (_ - m) + (d - g) + (d - g), c.push(_, d, m - (_ - m), g - (d - g)));
            for (f = o[h - 4], p = o[h - 3], m = o[h - 2], g = o[h - 1], x = -(p - g), T = f - m, 
            D = Math.sqrt(x * x + T * T), x = x / D * L, T = T / D * L, c.push(m - x, g - T, m + x, g + T), 
            l = 1; u > l; l++) i.push(r + 2 * (l - 1), r + 2 * (l - 1) + 1, r + 2 * l + 1, r + 2 * l + 1, r + 2 * l, r + 2 * (l - 1));
            return c;
        }, t.createLineTriangle = function(t, e, i, n, r, s, a) {
            var o = t.slice(), h = o.length, l = o[0], u = o[1], c = o[2], _ = o[2], d = 0, f = 0, p = 0, m = 0, g = h / 2;
            if (!(1 >= g) && 2 != g) {
                for (var v = new Array(4 * g), y = 0, x = 0, T = 0; g - 1 > T; T++) l = o[x++], 
                u = o[x++], c = o[x++], _ = o[x++], p = c - l, m = _ - u, 0 != p && 0 != m && (d = Math.sqrt(p * p + m * m), 
                d > .001 && (f = 4 * y, v[f] = l, v[f + 1] = u, v[f + 2] = p / d, v[f + 3] = m / d, 
                y++));
                for (n ? (l = o[h - 2], u = o[h - 1], c = o[0], _ = o[1], p = c - l, m = _ - u, 
                0 != p && 0 != m && (d = Math.sqrt(p * p + m * m), d > .001 && (f = 4 * y, v[f] = l, 
                v[f + 1] = u, v[f + 2] = p / d, v[f + 3] = m / d, y++))) : (f = 4 * y, v[f] = l, 
                v[f + 1] = u, v[f + 2] = p / d, v[f + 3] = m / d, y++), x = 0, T = 0; g > T; T++) {
                    l = o[x], u = o[x + 1], c = o[x + 2], _ = o[x + 3];
                    o[x + 4], o[x + 5];
                }
            }
        }, n(t, [ "tempData", function() {
            return this.tempData = new Array(256);
        } ]), t;
    }()), zt = function() {
        function t() {}
        r(t, "laya.display.cmd.ScaleCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("ScaleCmd", this);
        }, e.run = function(t, e, i) {
            t._scale(this.scaleX, this.scaleY, this.pivotX + e, this.pivotY + i);
        }, s(0, e, "cmdID", function() {
            return "Scale";
        }), t.create = function(e, i, n, r) {
            var s = U.getItemByClass("ScaleCmd", t);
            return s.scaleX = e, s.scaleY = i, s.pivotX = n, s.pivotY = r, s;
        }, t.ID = "Scale", t;
    }(), jt = function() {
        function t() {}
        r(t, "laya.display.cmd.AlphaCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("AlphaCmd", this);
        }, e.run = function(t, e, i) {
            t.alpha(this.alpha);
        }, s(0, e, "cmdID", function() {
            return "Alpha";
        }), t.create = function(e) {
            var i = U.getItemByClass("AlphaCmd", t);
            return i.alpha = e, i;
        }, t.ID = "Alpha", t;
    }(), Kt = function() {
        function t(t) {
            this._xd_ = !0, this._allocated_ = 8, this._pos_ = 0, this._length = 0, t ? (this._u8d_ = new Uint8Array(t), 
            this._d_ = new DataView(this._u8d_.buffer), this._length = this._d_.byteLength) : this._resizeBuffer(this._allocated_);
        }
        r(t, "laya.utils.Byte");
        var e = t.prototype;
        return e._resizeBuffer = function(t) {
            try {
                var e = new Uint8Array(t);
                null != this._u8d_ && (this._u8d_.length <= t ? e.set(this._u8d_) : e.set(this._u8d_.subarray(0, t))), 
                this._u8d_ = e, this._d_ = new DataView(e.buffer);
            } catch (i) {
                throw "Invalid typed array length:" + t;
            }
        }, e.getString = function() {
            return this.readString();
        }, e.readString = function() {
            return this._rUTF(this.getUint16());
        }, e.getFloat32Array = function(t, e) {
            return this.readFloat32Array(t, e);
        }, e.readFloat32Array = function(t, e) {
            var i = t + e;
            i = i > this._length ? this._length : i;
            var n = new Float32Array(this._d_.buffer.slice(t, i));
            return this._pos_ = i, n;
        }, e.getUint8Array = function(t, e) {
            return this.readUint8Array(t, e);
        }, e.readUint8Array = function(t, e) {
            var i = t + e;
            i = i > this._length ? this._length : i;
            var n = new Uint8Array(this._d_.buffer.slice(t, i));
            return this._pos_ = i, n;
        }, e.getInt16Array = function(t, e) {
            return this.readInt16Array(t, e);
        }, e.readInt16Array = function(t, e) {
            var i = t + e;
            i = i > this._length ? this._length : i;
            var n = new Int16Array(this._d_.buffer.slice(t, i));
            return this._pos_ = i, n;
        }, e.getFloat32 = function() {
            return this.readFloat32();
        }, e.readFloat32 = function() {
            if (this._pos_ + 4 > this._length) throw "getFloat32 error - Out of bounds";
            var t = this._d_.getFloat32(this._pos_, this._xd_);
            return this._pos_ += 4, t;
        }, e.getFloat64 = function() {
            return this.readFloat64();
        }, e.readFloat64 = function() {
            if (this._pos_ + 8 > this._length) throw "getFloat64 error - Out of bounds";
            var t = this._d_.getFloat64(this._pos_, this._xd_);
            return this._pos_ += 8, t;
        }, e.writeFloat32 = function(t) {
            this._ensureWrite(this._pos_ + 4), this._d_.setFloat32(this._pos_, t, this._xd_), 
            this._pos_ += 4;
        }, e.writeFloat64 = function(t) {
            this._ensureWrite(this._pos_ + 8), this._d_.setFloat64(this._pos_, t, this._xd_), 
            this._pos_ += 8;
        }, e.getInt32 = function() {
            return this.readInt32();
        }, e.readInt32 = function() {
            if (this._pos_ + 4 > this._length) throw "getInt32 error - Out of bounds";
            var t = this._d_.getInt32(this._pos_, this._xd_);
            return this._pos_ += 4, t;
        }, e.getUint32 = function() {
            return this.readUint32();
        }, e.readUint32 = function() {
            if (this._pos_ + 4 > this._length) throw "getUint32 error - Out of bounds";
            var t = this._d_.getUint32(this._pos_, this._xd_);
            return this._pos_ += 4, t;
        }, e.writeInt32 = function(t) {
            this._ensureWrite(this._pos_ + 4), this._d_.setInt32(this._pos_, t, this._xd_), 
            this._pos_ += 4;
        }, e.writeUint32 = function(t) {
            this._ensureWrite(this._pos_ + 4), this._d_.setUint32(this._pos_, t, this._xd_), 
            this._pos_ += 4;
        }, e.getInt16 = function() {
            return this.readInt16();
        }, e.readInt16 = function() {
            if (this._pos_ + 2 > this._length) throw "getInt16 error - Out of bounds";
            var t = this._d_.getInt16(this._pos_, this._xd_);
            return this._pos_ += 2, t;
        }, e.getUint16 = function() {
            return this.readUint16();
        }, e.readUint16 = function() {
            if (this._pos_ + 2 > this._length) throw "getUint16 error - Out of bounds";
            var t = this._d_.getUint16(this._pos_, this._xd_);
            return this._pos_ += 2, t;
        }, e.writeUint16 = function(t) {
            this._ensureWrite(this._pos_ + 2), this._d_.setUint16(this._pos_, t, this._xd_), 
            this._pos_ += 2;
        }, e.writeInt16 = function(t) {
            this._ensureWrite(this._pos_ + 2), this._d_.setInt16(this._pos_, t, this._xd_), 
            this._pos_ += 2;
        }, e.getUint8 = function() {
            return this.readUint8();
        }, e.readUint8 = function() {
            if (this._pos_ + 1 > this._length) throw "getUint8 error - Out of bounds";
            return this._u8d_[this._pos_++];
        }, e.writeUint8 = function(t) {
            this._ensureWrite(this._pos_ + 1), this._d_.setUint8(this._pos_, t), this._pos_++;
        }, e._getUInt8 = function(t) {
            return this._readUInt8(t);
        }, e._readUInt8 = function(t) {
            return this._d_.getUint8(t);
        }, e._getUint16 = function(t) {
            return this._readUint16(t);
        }, e._readUint16 = function(t) {
            return this._d_.getUint16(t, this._xd_);
        }, e._getMatrix = function() {
            return this._readMatrix();
        }, e._readMatrix = function() {
            var t = new st(this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32());
            return t;
        }, e._rUTF = function(t) {
            var e = this._pos_ + t, i = 0, n = 0, r = 0, s = String.fromCharCode, a = this._u8d_, o = 0, h = [], l = 0;
            for (h.length = 1e3; this._pos_ < e; ) i = a[this._pos_++], 128 > i ? 0 != i && (h[l++] = s(i)) : 224 > i ? h[l++] = s((63 & i) << 6 | 127 & a[this._pos_++]) : 240 > i ? (n = a[this._pos_++], 
            h[l++] = s((31 & i) << 12 | (127 & n) << 6 | 127 & a[this._pos_++])) : (n = a[this._pos_++], 
            r = a[this._pos_++], h[l++] = s((15 & i) << 18 | (127 & n) << 12 | r << 6 & 127 | 127 & a[this._pos_++])), 
            o++;
            return h.length = l, h.join("");
        }, e.getCustomString = function(t) {
            return this.readCustomString(t);
        }, e.readCustomString = function(t) {
            for (var e = "", i = 0, n = 0, r = 0, s = String.fromCharCode, a = this._u8d_; t > 0; ) if (n = a[this._pos_], 
            128 > n) e += s(n), this._pos_++, t--; else for (i = n - 128, this._pos_++, t -= i; i > 0; ) n = a[this._pos_++], 
            r = a[this._pos_++], e += s(r << 8 | n), i--;
            return e;
        }, e.clear = function() {
            this._pos_ = 0, this.length = 0;
        }, e.__getBuffer = function() {
            return this._d_.buffer;
        }, e.writeUTFBytes = function(t) {
            t += "";
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t.charCodeAt(e);
                127 >= n ? this.writeByte(n) : 2047 >= n ? (this._ensureWrite(this._pos_ + 2), this._u8d_.set([ 192 | n >> 6, 128 | 63 & n ], this._pos_), 
                this._pos_ += 2) : 65535 >= n ? (this._ensureWrite(this._pos_ + 3), this._u8d_.set([ 224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n ], this._pos_), 
                this._pos_ += 3) : (this._ensureWrite(this._pos_ + 4), this._u8d_.set([ 240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n ], this._pos_), 
                this._pos_ += 4);
            }
        }, e.writeUTFString = function(t) {
            var e = this.pos;
            this.writeUint16(1), this.writeUTFBytes(t);
            var i = this.pos - e - 2;
            this._d_.setUint16(e, i, this._xd_);
        }, e.readUTFString = function() {
            return this.readUTFBytes(this.getUint16());
        }, e.getUTFString = function() {
            return this.readUTFString();
        }, e.readUTFBytes = function(t) {
            if (void 0 === t && (t = -1), 0 === t) return "";
            var e = this.bytesAvailable;
            if (t > e) throw "readUTFBytes error - Out of bounds";
            return t = t > 0 ? t : e, this._rUTF(t);
        }, e.getUTFBytes = function(t) {
            return void 0 === t && (t = -1), this.readUTFBytes(t);
        }, e.writeByte = function(t) {
            this._ensureWrite(this._pos_ + 1), this._d_.setInt8(this._pos_, t), this._pos_ += 1;
        }, e.readByte = function() {
            if (this._pos_ + 1 > this._length) throw "readByte error - Out of bounds";
            return this._d_.getInt8(this._pos_++);
        }, e.getByte = function() {
            return this.readByte();
        }, e._ensureWrite = function(t) {
            this._length < t && (this._length = t), this._allocated_ < t && (this.length = t);
        }, e.writeArrayBuffer = function(t, e, i) {
            if (void 0 === e && (e = 0), void 0 === i && (i = 0), 0 > e || 0 > i) throw "writeArrayBuffer error - Out of bounds";
            0 == i && (i = t.byteLength - e), this._ensureWrite(this._pos_ + i);
            var n = new Uint8Array(t);
            this._u8d_.set(n.subarray(e, e + i), this._pos_), this._pos_ += i;
        }, e.readArrayBuffer = function(t) {
            var e;
            return e = this._u8d_.buffer.slice(this._pos_, this._pos_ + t), this._pos_ = this._pos_ + t, 
            e;
        }, s(0, e, "buffer", function() {
            var t = this._d_.buffer;
            return t.byteLength === this._length ? t : t.slice(0, this._length);
        }), s(0, e, "endian", function() {
            return this._xd_ ? "littleEndian" : "bigEndian";
        }, function(t) {
            this._xd_ = "littleEndian" === t;
        }), s(0, e, "length", function() {
            return this._length;
        }, function(t) {
            this._allocated_ < t ? this._resizeBuffer(this._allocated_ = Math.floor(Math.max(t, 2 * this._allocated_))) : this._allocated_ > t && this._resizeBuffer(this._allocated_ = t), 
            this._length = t;
        }), s(0, e, "pos", function() {
            return this._pos_;
        }, function(t) {
            this._pos_ = t;
        }), s(0, e, "bytesAvailable", function() {
            return this._length - this._pos_;
        }), t.getSystemEndian = function() {
            if (!t._sysEndian) {
                var e = new ArrayBuffer(2);
                new DataView(e).setInt16(0, 256, !0), t._sysEndian = 256 === new Int16Array(e)[0] ? "littleEndian" : "bigEndian";
            }
            return t._sysEndian;
        }, t.BIG_ENDIAN = "bigEndian", t.LITTLE_ENDIAN = "littleEndian", t._sysEndian = null, 
        t;
    }(), $t = function() {
        function t() {
            this._pool = [], this._map = [], this._laters = [];
        }
        var e;
        r(t, "laya.utils.CallLater");
        var i = t.prototype;
        return i._update = function() {
            var t = this._laters, e = t.length;
            if (e > 0) {
                for (var i = 0, n = e - 1; n >= i; i++) {
                    var r = t[i];
                    this._map[r.key] = null, null !== r.method && (r.run(), r.clear()), this._pool.push(r), 
                    i === n && (n = t.length - 1);
                }
                t.length = 0;
            }
        }, i._getHandler = function(t, e) {
            var i = t ? t.$_GID || (t.$_GID = ie.getGID()) : 0, n = e.$_TID || (e.$_TID = 1e5 * J._mid++);
            return this._map[i + n];
        }, i.callLater = function(t, i, n) {
            if (null == this._getHandler(t, i)) {
                if (this._pool.length) var r = this._pool.pop(); else r = new e();
                r.caller = t, r.method = i, r.args = n;
                var s = t ? t.$_GID : 0, a = i.$_TID;
                r.key = s + a, this._map[r.key] = r, this._laters.push(r);
            }
        }, i.runCallLater = function(t, e) {
            var i = this._getHandler(t, e);
            i && null != i.method && (this._map[i.key] = null, i.run(), i.clear());
        }, t.I = new t(), t.__init$ = function() {
            e = function() {
                function t() {
                    this.key = 0, this.caller = null, this.method = null, this.args = null;
                }
                r(t, "");
                var e = t.prototype;
                return e.clear = function() {
                    this.caller = null, this.method = null, this.args = null;
                }, e.run = function() {
                    var t = this.caller;
                    if (t && t.destroyed) return this.clear();
                    var e = this.method, i = this.args;
                    null != e && (i ? e.apply(t, i) : e.call(t));
                }, t;
            }();
        }, t;
    }(), qt = function() {
        function t() {
            this._sp = null, this._one = null, this._cmds = null, this._vectorgraphArray = null, 
            this._graphicBounds = null, this.autoDestroy = !1, this._render = this._renderEmpty, 
            this._createData();
        }
        r(t, "laya.display.Graphics");
        var e = t.prototype;
        return e._createData = function() {}, e._clearData = function() {}, e._destroyData = function() {}, 
        e.destroy = function() {
            this.clear(!0), this._graphicBounds && this._graphicBounds.destroy(), this._graphicBounds = null, 
            this._vectorgraphArray = null, this._sp && (this._sp._renderType = 0, this._sp._setRenderType(0), 
            this._sp = null), this._destroyData();
        }, e.clear = function(t) {
            if (void 0 === t && (t = !0), t) {
                var e = this._one;
                if (this._cmds) {
                    var i = 0, n = this._cmds.length;
                    for (i = 0; n > i; i++) e = this._cmds[i], e.recover();
                    this._cmds.length = 0;
                } else e && e.recover();
            } else this._cmds = null;
            if (this._one = null, this._render = this._renderEmpty, this._clearData(), this._sp && (this._sp._renderType &= -513, 
            this._sp._setRenderType(this._sp._renderType)), this._repaint(), this._vectorgraphArray) {
                for (i = 0, n = this._vectorgraphArray.length; n > i; i++) M.getInstance().deleteShape(this._vectorgraphArray[i]);
                this._vectorgraphArray.length = 0;
            }
        }, e._clearBoundsCache = function() {
            this._graphicBounds && this._graphicBounds.reset();
        }, e._initGraphicBounds = function() {
            this._graphicBounds || (this._graphicBounds = It.create(), this._graphicBounds._graphics = this);
        }, e._repaint = function() {
            this._clearBoundsCache(), this._sp && this._sp.repaint();
        }, e._isOnlyOne = function() {
            return !this._cmds || 0 === this._cmds.length;
        }, e.getBounds = function(t) {
            return void 0 === t && (t = !1), this._initGraphicBounds(), this._graphicBounds.getBounds(t);
        }, e.getBoundPoints = function(t) {
            return void 0 === t && (t = !1), this._initGraphicBounds(), this._graphicBounds.getBoundPoints(t);
        }, e.drawImage = function(t, e, i, n, r) {
            if (void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), 
            !t) return null;
            if (n || (n = t.sourceWidth), r || (r = t.sourceHeight), t.getIsReady()) {
                var s = n / t.sourceWidth, a = r / t.sourceHeight;
                if (n = t.width * s, r = t.height * a, 0 >= n || 0 >= r) return null;
                e += t.offsetX * s, i += t.offsetY * a;
            }
            this._sp && (this._sp._renderType |= 512, this._sp._setRenderType(this._sp._renderType));
            var o = f.create.call(this, t, e, i, n, r);
            return null == this._one ? (this._one = o, this._render = this._renderOneImg) : this._saveToCmd(null, o), 
            this._repaint(), o;
        }, e.drawTexture = function(t, e, i, n, r, s, a, o, h) {
            if (void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), 
            void 0 === a && (a = 1), !t || .01 > a) return null;
            if (!t.getIsReady()) return null;
            if (n || (n = t.sourceWidth), r || (r = t.sourceHeight), t.getIsReady()) {
                var l = n / t.sourceWidth, u = r / t.sourceHeight;
                if (n = t.width * l, r = t.height * u, 0 >= n || 0 >= r) return null;
                e += t.offsetX * l, i += t.offsetY * u;
            }
            this._sp && (this._sp._renderType |= 512, this._sp._setRenderType(this._sp._renderType));
            var c = G.create.call(this, t, e, i, n, r, s, a, o, h);
            return this._repaint(), this._saveToCmd(null, c);
        }, e.drawTextures = function(t, e) {
            return t ? this._saveToCmd(Mt._context.drawTextures, ht.create.call(this, t, e)) : null;
        }, e.drawTriangles = function(t, e, i, n, r, s, a, o, h, l) {
            return void 0 === o && (o = 1), this._saveToCmd(Mt._context.drawTriangles, y.create.call(this, t, e, i, n, r, s, a, o, h, l));
        }, e.fillTexture = function(t, e, i, n, r, s, a) {
            return void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === s && (s = "repeat"), 
            t && t.getIsReady() ? this._saveToCmd(Mt._context._fillTexture, u.create.call(this, t, e, i, n, r, s, a || Yt.EMPTY, {})) : null;
        }, e._saveToCmd = function(t, e) {
            return this._sp && (this._sp._renderType |= 512, this._sp._setRenderType(this._sp._renderType)), 
            null == this._one ? (this._one = e, this._render = this._renderOne) : (this._render = this._renderAll, 
            0 === (this._cmds || (this._cmds = [])).length && this._cmds.push(this._one), this._cmds.push(e)), 
            this._repaint(), e;
        }, e.clipRect = function(t, e, i, n) {
            return this._saveToCmd(Mt._context.clipRect, B.create.call(this, t, e, i, n));
        }, e.fillText = function(t, e, i, n, r, s) {
            return this._saveToCmd(Mt._context.fillText, oe.create.call(this, t, e, i, n || ei.defaultFontStr(), r, s));
        }, e.fillBorderText = function(t, e, i, n, r, s, a, o) {
            return this._saveToCmd(Mt._context.fillBorderText, Ft.create.call(this, t, e, i, n || ei.defaultFontStr(), r, s, a, o));
        }, e.fillWords = function(t, e, i, n, r) {
            return this._saveToCmd(Mt._context.fillWords, rt.create.call(this, t, e, i, n || ei.defaultFontStr(), r));
        }, e.fillBorderWords = function(t, e, i, n, r, s, a) {
            return this._saveToCmd(Mt._context.fillBorderWords, ge.create.call(this, t, e, i, n || ei.defaultFontStr(), r, s, a));
        }, e.strokeText = function(t, e, i, n, r, s, a) {
            return this._saveToCmd(Mt._context.fillBorderText, Zt.create.call(this, t, e, i, n || ei.defaultFontStr(), null, r, s, a));
        }, e.alpha = function(t) {
            return this._saveToCmd(Mt._context.alpha, jt.create.call(this, t));
        }, e.transform = function(t, e, i) {
            return void 0 === e && (e = 0), void 0 === i && (i = 0), this._saveToCmd(Mt._context._transform, ot.create.call(this, t, e, i));
        }, e.rotate = function(t, e, i) {
            return void 0 === e && (e = 0), void 0 === i && (i = 0), this._saveToCmd(Mt._context._rotate, de.create.call(this, t, e, i));
        }, e.scale = function(t, e, i, n) {
            return void 0 === i && (i = 0), void 0 === n && (n = 0), this._saveToCmd(Mt._context._scale, zt.create.call(this, t, e, i, n));
        }, e.translate = function(t, e) {
            return this._saveToCmd(Mt._context.translate, Xt.create.call(this, t, e));
        }, e.save = function() {
            return this._saveToCmd(Mt._context._save, Tt.create.call(this));
        }, e.restore = function() {
            return this._saveToCmd(Mt._context.restore, P.create.call(this));
        }, e.replaceText = function(t) {
            this._repaint();
            var e = this._cmds;
            if (e) {
                for (var i = e.length - 1; i > -1; i--) if (this._isTextCmd(e[i])) return e[i].text = t, 
                !0;
            } else if (this._one && this._isTextCmd(this._one)) return this._one.text = t, !0;
            return !1;
        }, e._isTextCmd = function(t) {
            var e = t.cmdID;
            return "FillText" == e || "StrokeText" == e || "FillBorderText" == e;
        }, e.replaceTextColor = function(t) {
            this._repaint();
            var e = this._cmds;
            if (e) for (var i = e.length - 1; i > -1; i--) this._isTextCmd(e[i]) && this._setTextCmdColor(e[i], t); else this._one && this._isTextCmd(this._one) && this._setTextCmdColor(this._one, t);
        }, e._setTextCmdColor = function(t, e) {
            var i = t.cmdID;
            switch (i) {
              case "FillText":
              case "StrokeText":
                t.color = e;
                break;

              case "FillBorderText":
              case "FillBorderWords":
              case "FillBorderText":
                t.fillColor = e;
            }
        }, e.loadImage = function(t, e, i, n, r, s) {
            void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === r && (r = 0);
            var a = De.getRes(t);
            a ? a.getIsReady() ? this.drawImage(a, e, i, n, r) : a.once("ready", this, this.drawImage, [ a, e, i, n, r ]) : (a = new Ie(), 
            a.load(t), De.cacheRes(t, a), a.once("ready", this, this.drawImage, [ a, e, i, n, r ])), 
            null != s && (a.getIsReady() ? s.call(this._sp) : a.on("ready", this._sp, s));
        }, e._renderEmpty = function(t, e, i, n) {}, e._renderAll = function(t, e, i, n) {
            for (var r = this._cmds, s = 0, a = r.length; a > s; s++) r[s].run(e, i, n);
        }, e._renderOne = function(t, e, i, n) {
            e.sprite = t, this._one.run(e, i, n);
        }, e._renderOneImg = function(t, e, i, n) {
            e.sprite = t, this._one.run(e, i, n);
        }, e.drawLine = function(t, e, i, n, r, s) {
            void 0 === s && (s = 1);
            var a = 1 > s || s % 2 === 0 ? 0 : .5;
            return this._saveToCmd(Mt._context._drawLine, it.create.call(this, t + a, e + a, i + a, n + a, r, s, 0));
        }, e.drawLines = function(t, e, i, n, r) {
            if (void 0 === r && (r = 1), !i || i.length < 4) return null;
            var s = 1 > r || r % 2 === 0 ? 0 : .5;
            return this._saveToCmd(Mt._context._drawLines, ne.create.call(this, t + s, e + s, i, n, r, 0));
        }, e.drawCurves = function(t, e, i, n, r) {
            return void 0 === r && (r = 1), this._saveToCmd(Mt._context.drawCurves, ae.create.call(this, t, e, i, n, r));
        }, e.drawRect = function(t, e, i, n, r, s, a) {
            void 0 === a && (a = 1);
            var o = a >= 1 && s ? a / 2 : 0, h = s ? a : 0;
            return this._saveToCmd(Mt._context.drawRect, j.create.call(this, t + o, e + o, i - h, n - h, r, s, a));
        }, e.drawCircle = function(t, e, i, n, r, s) {
            void 0 === s && (s = 1);
            var a = s >= 1 && r ? s / 2 : 0;
            return this._saveToCmd(Mt._context._drawCircle, lt.create.call(this, t, e, i - a, n, r, s, 0));
        }, e.drawPie = function(t, e, i, n, r, s, a, o) {
            void 0 === o && (o = 1);
            var h = o >= 1 && a ? o / 2 : 0, l = a ? o : 0;
            return this._saveToCmd(Mt._context._drawPie, x.create.call(this, t + h, e + h, i - l, ie.toRadian(n), ie.toRadian(r), s, a, o, 0));
        }, e.drawPoly = function(t, e, i, n, r, s) {
            void 0 === s && (s = 1);
            var a = !1;
            a = i.length > 6 ? !1 : !0;
            var o = s >= 1 && r ? s % 2 === 0 ? 0 : .5 : 0;
            return this._saveToCmd(Mt._context._drawPoly, O.create.call(this, t + o, e + o, i, n, r, s, a, 0));
        }, e.drawPath = function(t, e, i, n, r) {
            return this._saveToCmd(Mt._context._drawPath, yt.create.call(this, t, e, i, n, r));
        }, e.draw9Grid = function(t, e, i, n, r, s) {
            void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), 
            this._saveToCmd(null, Nt.create(t, e, i, n, r, s));
        }, s(0, e, "cmds", function() {
            return this._cmds;
        }, function(t) {
            this._sp && (this._sp._renderType |= 512, this._sp._setRenderType(this._sp._renderType)), 
            this._cmds = t, this._render = this._renderAll, this._repaint();
        }), t;
    }(), Qt = (function() {
        function t() {
            this.reset();
        }
        r(t, "laya.utils.HTMLChar");
        var e = t.prototype;
        return e.setData = function(e, i, n, r) {
            return this["char"] = e, this.charNum = e.charCodeAt(0), this.x = this.y = 0, this.width = i, 
            this.height = n, this.style = r, this.isWord = !t._isWordRegExp.test(e), this;
        }, e.reset = function() {
            return this.x = this.y = this.width = this.height = 0, this.isWord = !1, this["char"] = null, 
            this.charNum = 0, this.style = null, this;
        }, e.recover = function() {
            U.recover("HTMLChar", this.reset());
        }, e._isChar = function() {
            return !0;
        }, e._getCSSStyle = function() {
            return this.style;
        }, t.create = function() {
            return U.getItemByClass("HTMLChar", t);
        }, t._isWordRegExp = new RegExp("[\\w.]", ""), t;
    }(), function() {
        function t(t, e, i) {
            this.atlasID = 0, this._width = 0, this._height = 0, this._texCount = 0, this._rowInfo = null, 
            this._cells = null, this._used = 0, void 0 === t && (t = 0), void 0 === e && (e = 0), 
            void 0 === i && (i = 0), this._cells = null, this._rowInfo = null, this.atlasID = i, 
            this._init(t, e);
        }
        r(t, "laya.webgl.text.AtlasGrid");
        var e = t.prototype;
        return e.addRect = function(t, e, i, n) {
            return this._get(e, i, n) ? (this._fill(n.x, n.y, e, i, t), this._texCount++, !0) : !1;
        }, e._release = function() {
            this._cells = null, this._rowInfo = null;
        }, e._init = function(t, e) {
            return this._width = t, this._height = e, this._release(), 0 == this._width ? !1 : (this._cells = new Uint8Array(this._width * this._height * 3), 
            this._rowInfo = new Uint8Array(this._height), this._used = 0, this._clear(), !0);
        }, e._get = function(t, e, i) {
            if (t > this._width || e > this._height) return !1;
            for (var n = -1, r = -1, s = this._width, a = this._height, o = this._cells, h = 0; a > h; h++) if (!(this._rowInfo[h] < t)) for (var l = 0; s > l; ) {
                var u = 3 * (h * s + l);
                if (0 != o[u] || o[u + 1] < t || o[u + 2] < e) l += o[u + 1]; else {
                    n = l, r = h;
                    for (var c = 0; t > c; c++) if (o[3 * c + u + 2] < e) {
                        n = -1;
                        break;
                    }
                    if (!(0 > n)) return i.x = n, i.y = r, !0;
                    l += o[u + 1];
                }
            }
            return !1;
        }, e._fill = function(t, e, i, n, r) {
            var s = this._width, a = this._height;
            this._check(s >= t + i && a >= e + n);
            for (var o = e; n + e > o; ++o) {
                this._check(this._rowInfo[o] >= i), this._rowInfo[o] -= i;
                for (var h = 0; i > h; h++) {
                    var l = 3 * (t + o * s + h);
                    this._check(0 == this._cells[l]), this._cells[l] = r, this._cells[l + 1] = i, this._cells[l + 2] = n;
                }
            }
            if (t > 0) for (o = 0; n > o; ++o) {
                var u = 0;
                for (h = t - 1; h >= 0 && 0 == this._cells[3 * ((e + o) * s + h)]; --h, ++u) ;
                for (h = u; h > 0; --h) this._cells[3 * ((e + o) * s + t - h) + 1] = h, this._check(h > 0);
            }
            if (e > 0) for (h = t; t + i > h; ++h) {
                for (u = 0, o = e - 1; o >= 0 && 0 == this._cells[3 * (h + o * s)]; --o, u++) ;
                for (o = u; o > 0; --o) this._cells[3 * (h + (e - o) * s) + 2] = o, this._check(o > 0);
            }
            this._used += i * n / (this._width * this._height);
        }, e._check = function(t) {
            0 == t && console.log("xtexMerger 错误啦");
        }, e._clear = function() {
            this._texCount = 0;
            for (var t = 0; t < this._height; t++) this._rowInfo[t] = this._width;
            for (var e = 0; e < this._height; e++) for (var i = 0; i < this._width; i++) {
                var n = 3 * (e * this._width + i);
                this._cells[n] = 0, this._cells[n + 1] = this._width - i, this._cells[n + 2] = this._width - e;
            }
        }, t;
    }()), Zt = function() {
        function t() {}
        r(t, "laya.display.cmd.StrokeTextCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("StrokeTextCmd", this);
        }, e.run = function(t, e, i) {
            t.strokeWord(this.text, this.x + e, this.y + i, this.font, this.color, this.lineWidth, this.textAlign);
        }, s(0, e, "cmdID", function() {
            return "StrokeText";
        }), t.create = function(e, i, n, r, s, a, o) {
            var h = U.getItemByClass("StrokeTextCmd", t);
            return h.text = e, h.x = i, h.y = n, h.font = r, h.color = s, h.lineWidth = a, h.textAlign = o, 
            h;
        }, t.ID = "StrokeText", t;
    }(), Jt = function() {
        function t() {}
        r(t, "laya.webgl.text.ICharRender");
        var e = t.prototype;
        return e.getWidth = function(t, e) {
            return 0;
        }, e.scale = function(t, e) {}, e.getCharBmp = function(t, e, i, n, r, s, a, o, h, l, u) {
            return null;
        }, s(0, e, "canvasWidth", function() {
            return 0;
        }, function(t) {}), t;
    }(), te = function() {
        function t() {}
        return r(t, "laya.utils.Ease"), t.linearNone = function(t, e, i, n) {
            return i * t / n + e;
        }, t.linearIn = function(t, e, i, n) {
            return i * t / n + e;
        }, t.linearInOut = function(t, e, i, n) {
            return i * t / n + e;
        }, t.linearOut = function(t, e, i, n) {
            return i * t / n + e;
        }, t.bounceIn = function(e, i, n, r) {
            return n - t.bounceOut(r - e, 0, n, r) + i;
        }, t.bounceInOut = function(e, i, n, r) {
            return .5 * r > e ? .5 * t.bounceIn(2 * e, 0, n, r) + i : .5 * t.bounceOut(2 * e - r, 0, n, r) + .5 * n + i;
        }, t.bounceOut = function(t, e, i, n) {
            return (t /= n) < 1 / 2.75 ? i * (7.5625 * t * t) + e : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e;
        }, t.backIn = function(t, e, i, n, r) {
            return void 0 === r && (r = 1.70158), i * (t /= n) * t * ((r + 1) * t - r) + e;
        }, t.backInOut = function(t, e, i, n, r) {
            return void 0 === r && (r = 1.70158), (t /= .5 * n) < 1 ? .5 * i * (t * t * (((r *= 1.525) + 1) * t - r)) + e : i / 2 * ((t -= 2) * t * (((r *= 1.525) + 1) * t + r) + 2) + e;
        }, t.backOut = function(t, e, i, n, r) {
            return void 0 === r && (r = 1.70158), i * ((t = t / n - 1) * t * ((r + 1) * t + r) + 1) + e;
        }, t.elasticIn = function(e, i, n, r, s, a) {
            void 0 === s && (s = 0), void 0 === a && (a = 0);
            var o;
            return 0 == e ? i : 1 == (e /= r) ? i + n : (a || (a = .3 * r), !s || n > 0 && n > s || 0 > n && -n > s ? (s = n, 
            o = a / 4) : o = a / t.PI2 * Math.asin(n / s), -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - o) * t.PI2 / a)) + i);
        }, t.elasticInOut = function(e, i, n, r, s, a) {
            void 0 === s && (s = 0), void 0 === a && (a = 0);
            var o;
            return 0 == e ? i : 2 == (e /= .5 * r) ? i + n : (a || (a = r * (.3 * 1.5)), !s || n > 0 && n > s || 0 > n && -n > s ? (s = n, 
            o = a / 4) : o = a / t.PI2 * Math.asin(n / s), 1 > e ? -.5 * (s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - o) * t.PI2 / a)) + i : s * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * r - o) * t.PI2 / a) * .5 + n + i);
        }, t.elasticOut = function(e, i, n, r, s, a) {
            void 0 === s && (s = 0), void 0 === a && (a = 0);
            var o;
            return 0 == e ? i : 1 == (e /= r) ? i + n : (a || (a = .3 * r), !s || n > 0 && n > s || 0 > n && -n > s ? (s = n, 
            o = a / 4) : o = a / t.PI2 * Math.asin(n / s), s * Math.pow(2, -10 * e) * Math.sin((e * r - o) * t.PI2 / a) + n + i);
        }, t.strongIn = function(t, e, i, n) {
            return i * (t /= n) * t * t * t * t + e;
        }, t.strongInOut = function(t, e, i, n) {
            return (t /= .5 * n) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e;
        }, t.strongOut = function(t, e, i, n) {
            return i * ((t = t / n - 1) * t * t * t * t + 1) + e;
        }, t.sineInOut = function(t, e, i, n) {
            return .5 * -i * (Math.cos(Math.PI * t / n) - 1) + e;
        }, t.sineIn = function(e, i, n, r) {
            return -n * Math.cos(e / r * t.HALF_PI) + n + i;
        }, t.sineOut = function(e, i, n, r) {
            return n * Math.sin(e / r * t.HALF_PI) + i;
        }, t.quintIn = function(t, e, i, n) {
            return i * (t /= n) * t * t * t * t + e;
        }, t.quintInOut = function(t, e, i, n) {
            return (t /= .5 * n) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e;
        }, t.quintOut = function(t, e, i, n) {
            return i * ((t = t / n - 1) * t * t * t * t + 1) + e;
        }, t.quartIn = function(t, e, i, n) {
            return i * (t /= n) * t * t * t + e;
        }, t.quartInOut = function(t, e, i, n) {
            return (t /= .5 * n) < 1 ? .5 * i * t * t * t * t + e : .5 * -i * ((t -= 2) * t * t * t - 2) + e;
        }, t.quartOut = function(t, e, i, n) {
            return -i * ((t = t / n - 1) * t * t * t - 1) + e;
        }, t.cubicIn = function(t, e, i, n) {
            return i * (t /= n) * t * t + e;
        }, t.cubicInOut = function(t, e, i, n) {
            return (t /= .5 * n) < 1 ? .5 * i * t * t * t + e : .5 * i * ((t -= 2) * t * t + 2) + e;
        }, t.cubicOut = function(t, e, i, n) {
            return i * ((t = t / n - 1) * t * t + 1) + e;
        }, t.quadIn = function(t, e, i, n) {
            return i * (t /= n) * t + e;
        }, t.quadInOut = function(t, e, i, n) {
            return (t /= .5 * n) < 1 ? .5 * i * t * t + e : .5 * -i * (--t * (t - 2) - 1) + e;
        }, t.quadOut = function(t, e, i, n) {
            return -i * (t /= n) * (t - 2) + e;
        }, t.expoIn = function(t, e, i, n) {
            return 0 == t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e - .001 * i;
        }, t.expoInOut = function(t, e, i, n) {
            return 0 == t ? e : t == n ? e + i : (t /= .5 * n) < 1 ? .5 * i * Math.pow(2, 10 * (t - 1)) + e : .5 * i * (-Math.pow(2, -10 * --t) + 2) + e;
        }, t.expoOut = function(t, e, i, n) {
            return t == n ? e + i : i * (-Math.pow(2, -10 * t / n) + 1) + e;
        }, t.circIn = function(t, e, i, n) {
            return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e;
        }, t.circInOut = function(t, e, i, n) {
            return (t /= .5 * n) < 1 ? .5 * -i * (Math.sqrt(1 - t * t) - 1) + e : .5 * i * (Math.sqrt(1 - (t -= 2) * t) + 1) + e;
        }, t.circOut = function(t, e, i, n) {
            return i * Math.sqrt(1 - (t = t / n - 1) * t) + e;
        }, t.HALF_PI = .5 * Math.PI, t.PI2 = 2 * Math.PI, t;
    }(), ee = (function() {
        function t() {
            this.sign = null, this.maxCount = 1e3;
        }
        r(t, "laya.utils.PoolCache");
        var e = t.prototype;
        return e.getCacheList = function() {
            return U.getPoolBySign(this.sign);
        }, e.tryDispose = function(t) {
            var e;
            e = U.getPoolBySign(this.sign), e.length > this.maxCount && e.splice(this.maxCount, e.length - this.maxCount);
        }, t.addPoolCacheManager = function(e, i) {
            void 0 === i && (i = 100);
            var n;
            n = new t(), n.sign = e, n.maxCount = i, Q.regCacheByFunction(ie.bind(n.tryDispose, n), ie.bind(n.getCacheList, n));
        }, t;
    }(), function() {
        function t() {}
        return r(t, "laya.webgl.utils.MatirxArray"), t.ArrayMul = function(e, i, n) {
            if (!e) return void t.copyArray(i, n);
            if (!i) return void t.copyArray(e, n);
            for (var r = NaN, s = NaN, a = NaN, o = NaN, h = 0; 4 > h; h++) r = e[h], s = e[h + 4], 
            a = e[h + 8], o = e[h + 12], n[h] = r * i[0] + s * i[1] + a * i[2] + o * i[3], n[h + 4] = r * i[4] + s * i[5] + a * i[6] + o * i[7], 
            n[h + 8] = r * i[8] + s * i[9] + a * i[10] + o * i[11], n[h + 12] = r * i[12] + s * i[13] + a * i[14] + o * i[15];
        }, t.copyArray = function(t, e) {
            if (t && e) for (var i = 0; i < t.length; i++) e[i] = t[i];
        }, t;
    }(), function() {
        function t() {}
        return r(t, "laya.utils.Mouse"), s(1, t, "cursor", function() {
            return t._style.cursor;
        }, function(e) {
            t._style.cursor = e;
        }), t.hide = function() {
            "none" != t.cursor && (t._preCursor = t.cursor, t.cursor = "none");
        }, t.show = function() {
            "none" == t.cursor && (t._preCursor ? t.cursor = t._preCursor : t.cursor = "auto");
        }, t._preCursor = null, n(t, [ "_style", function() {
            return this._style = Dt.document.body.style;
        } ]), t;
    }(), function() {
        function t() {}
        return r(t, "laya.webgl.VertexArrayObject"), t;
    }()(function() {
        function e(e) {
            t.console && t.console.error && t.console.error(e);
        }
        function i(e) {
            t.console && t.console.log && t.console.log(e);
        }
        function n(t, i) {
            s[t] = !0, void 0 !== i && e(i);
        }
        function r(t) {
            var e = t.getError;
            t.getError = function() {
                var i;
                do {
                    i = e.apply(t), i != t.NO_ERROR && (s[i] = !0);
                } while (i != t.NO_ERROR);
                for (var i in s) if (s[i]) return delete s[i], parseInt(i);
                return t.NO_ERROR;
            };
        }
        var s = {}, a = function h(t) {
            var e = t.gl;
            this.ext = t, this.isAlive = !0, this.hasBeenBound = !1, this.elementArrayBuffer = null, 
            this.attribs = new Array(t.maxVertexAttribs);
            for (var i = 0; i < this.attribs.length; i++) {
                var n = new h.VertexAttrib(e);
                this.attribs[i] = n;
            }
            this.maxAttrib = 0;
        };
        a.VertexAttrib = function(t) {
            this.enabled = !1, this.buffer = null, this.size = 4, this.type = t.FLOAT, this.normalized = !1, 
            this.stride = 16, this.offset = 0, this.cached = "", this.recache();
        }, a.VertexAttrib.prototype.recache = function() {
            this.cached = [ this.size, this.type, this.normalized, this.stride, this.offset ].join(":");
        };
        var o = function(t) {
            var e = this;
            this.gl = t, r(t);
            var n = this.original = {
                getParameter: t.getParameter,
                enableVertexAttribArray: t.enableVertexAttribArray,
                disableVertexAttribArray: t.disableVertexAttribArray,
                bindBuffer: t.bindBuffer,
                getVertexAttrib: t.getVertexAttrib,
                vertexAttribPointer: t.vertexAttribPointer
            };
            t.getParameter = function(t) {
                return t == e.VERTEX_ARRAY_BINDING_OES ? e.currentVertexArrayObject == e.defaultVertexArrayObject ? null : e.currentVertexArrayObject : n.getParameter.apply(this, arguments);
            }, t.enableVertexAttribArray = function(t) {
                var i = e.currentVertexArrayObject;
                i.maxAttrib = Math.max(i.maxAttrib, t);
                var r = i.attribs[t];
                return r.enabled = !0, n.enableVertexAttribArray.apply(this, arguments);
            }, t.disableVertexAttribArray = function(t) {
                var i = e.currentVertexArrayObject;
                i.maxAttrib = Math.max(i.maxAttrib, t);
                var r = i.attribs[t];
                return r.enabled = !1, n.disableVertexAttribArray.apply(this, arguments);
            }, t.bindBuffer = function(i, r) {
                switch (i) {
                  case t.ARRAY_BUFFER:
                    e.currentArrayBuffer = r;
                    break;

                  case t.ELEMENT_ARRAY_BUFFER:
                    e.currentVertexArrayObject.elementArrayBuffer = r;
                }
                return n.bindBuffer.apply(this, arguments);
            }, t.getVertexAttrib = function(i, r) {
                var s = e.currentVertexArrayObject, a = s.attribs[i];
                switch (r) {
                  case t.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
                    return a.buffer;

                  case t.VERTEX_ATTRIB_ARRAY_ENABLED:
                    return a.enabled;

                  case t.VERTEX_ATTRIB_ARRAY_SIZE:
                    return a.size;

                  case t.VERTEX_ATTRIB_ARRAY_STRIDE:
                    return a.stride;

                  case t.VERTEX_ATTRIB_ARRAY_TYPE:
                    return a.type;

                  case t.VERTEX_ATTRIB_ARRAY_NORMALIZED:
                    return a.normalized;

                  default:
                    return n.getVertexAttrib.apply(this, arguments);
                }
            }, t.vertexAttribPointer = function(t, i, r, s, a, o) {
                var h = e.currentVertexArrayObject;
                h.maxAttrib = Math.max(h.maxAttrib, t);
                var l = h.attribs[t];
                return l.buffer = e.currentArrayBuffer, l.size = i, l.type = r, l.normalized = s, 
                l.stride = a, l.offset = o, l.recache(), n.vertexAttribPointer.apply(this, arguments);
            }, t.instrumentExtension && t.instrumentExtension(this, "OES_vertex_array_object"), 
            t.canvas && t.canvas.addEventListener && t.canvas.addEventListener("webglcontextrestored", function() {
                i("OESVertexArrayObject emulation library context restored"), e.reset_();
            }, !0), this.reset_();
        };
        o.prototype.VERTEX_ARRAY_BINDING_OES = 34229, o.prototype.reset_ = function() {
            var t = void 0 !== this.vertexArrayObjects;
            if (t) for (var e = 0; e < this.vertexArrayObjects.length; ++e) this.vertexArrayObjects.isAlive = !1;
            var i = this.gl;
            this.maxVertexAttribs = i.getParameter(i.MAX_VERTEX_ATTRIBS), this.defaultVertexArrayObject = new a(this), 
            this.currentVertexArrayObject = null, this.currentArrayBuffer = null, this.vertexArrayObjects = [ this.defaultVertexArrayObject ], 
            this.bindVertexArrayOES(null);
        }, o.prototype.createVertexArrayOES = function() {
            var t = new a(this);
            return this.vertexArrayObjects.push(t), t;
        }, o.prototype.deleteVertexArrayOES = function(t) {
            t.isAlive = !1, this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(t), 1), 
            this.currentVertexArrayObject == t && this.bindVertexArrayOES(null);
        }, o.prototype.isVertexArrayOES = function(t) {
            return t && t instanceof a && t.hasBeenBound && t.ext == this ? !0 : !1;
        }, o.prototype.bindVertexArrayOES = function(t) {
            var e = this.gl;
            if (t && !t.isAlive) return void n(e.INVALID_OPERATION, "bindVertexArrayOES: attempt to bind deleted arrayObject");
            var i = this.original, r = this.currentVertexArrayObject;
            this.currentVertexArrayObject = t || this.defaultVertexArrayObject, this.currentVertexArrayObject.hasBeenBound = !0;
            var s = this.currentVertexArrayObject;
            if (r != s) {
                r && s.elementArrayBuffer == r.elementArrayBuffer || i.bindBuffer.call(e, e.ELEMENT_ARRAY_BUFFER, s.elementArrayBuffer);
                for (var a = this.currentArrayBuffer, o = Math.max(r ? r.maxAttrib : 0, s.maxAttrib), h = 0; o >= h; h++) {
                    var l = s.attribs[h], u = r ? r.attribs[h] : null;
                    if (r && l.enabled == u.enabled || (l.enabled ? i.enableVertexAttribArray.call(e, h) : i.disableVertexAttribArray.call(e, h)), 
                    l.enabled) {
                        var c = !1;
                        r && l.buffer == u.buffer || (a != l.buffer && (i.bindBuffer.call(e, e.ARRAY_BUFFER, l.buffer), 
                        a = l.buffer), c = !0), (c || l.cached != u.cached) && i.vertexAttribPointer.call(e, h, l.size, l.type, l.normalized, l.stride, l.offset);
                    }
                }
                this.currentArrayBuffer != a && i.bindBuffer.call(e, e.ARRAY_BUFFER, this.currentArrayBuffer);
            }
        }, t._setupVertexArrayObject = function(t) {
            var e = t.getSupportedExtensions;
            t.getSupportedExtensions = function() {
                var t = e.call(this) || [];
                return t.indexOf("OES_vertex_array_object") < 0 && t.push("OES_vertex_array_object"), 
                t;
            };
            var i = t.getExtension;
            t.getExtension = function(t) {
                var e = i.call(this, t);
                return e ? e : "OES_vertex_array_object" !== t ? null : (this.__OESVertexArrayObject || (console.log("Setup OES_vertex_array_object polyfill"), 
                this.__OESVertexArrayObject = new o(this)), this.__OESVertexArrayObject);
            };
        }, t._forceSetupVertexArrayObject = function(t) {
            var e = t.getSupportedExtensions;
            t.getSupportedExtensions = function() {
                var t = e.call(this) || [];
                return t.indexOf("OES_vertex_array_object") < 0 && t.push("OES_vertex_array_object"), 
                t;
            };
            var i = t.getExtension;
            t.getExtension = function(t) {
                if ("OES_vertex_array_object" === t) return this.__OESVertexArrayObject || (console.log("Setup OES_vertex_array_object polyfill"), 
                this.__OESVertexArrayObject = new o(this)), this.__OESVertexArrayObject;
                var e = i.call(this, t);
                return e ? e : null;
            };
        };
    }()), function() {
        function t() {}
        return r(t, "laya.resource.WebGLRTMgr"), t.getRT = function(e, i) {
            e = 0 | e, i = 0 | i, e >= 1e4 && console.error("getRT error! w too big");
            var n, r = 1e4 * i + e, s = t.dict[r];
            return s && s.length > 0 ? (n = s.pop(), n._mgrKey = r, n) : (n = new di(e, i, 1, -1), 
            n._mgrKey = r, n);
        }, t.releaseRT = function(e) {
            if (!(e._mgrKey <= 0)) {
                var i = t.dict[e._mgrKey];
                !i && (i = [], t.dict[e._mgrKey] = i), e._mgrKey = 0, i.push(e);
            }
        }, t.dict = {}, t;
    }()), ie = function() {
        function e() {}
        return r(e, "laya.utils.Utils"), e.toRadian = function(t) {
            return t * e._pi2;
        }, e.toAngle = function(t) {
            return t * e._pi;
        }, e.toHexColor = function(t) {
            if (0 > t || isNaN(t)) return null;
            for (var e = t.toString(16); e.length < 6; ) e = "0" + e;
            return "#" + e;
        }, e.getGID = function() {
            return e._gid++;
        }, e.concatArray = function(t, e) {
            if (!e) return t;
            if (!t) return e;
            var i = 0, n = e.length;
            for (i = 0; n > i; i++) t.push(e[i]);
            return t;
        }, e.clearArray = function(t) {
            return t ? (t.length = 0, t) : t;
        }, e.copyArray = function(t, e) {
            if (t || (t = []), !e) return t;
            t.length = e.length;
            var i = 0, n = e.length;
            for (i = 0; n > i; i++) t[i] = e[i];
            return t;
        }, e.getGlobalRecByPoints = function(t, e, i, n, r) {
            var s;
            s = Yt.create().setTo(e, i), s = t.localToGlobal(s);
            var a;
            a = Yt.create().setTo(n, r), a = t.localToGlobal(a);
            var o = mt._getWrapRec([ s.x, s.y, a.x, a.y ]);
            return s.recover(), a.recover(), o;
        }, e.getGlobalPosAndScale = function(t) {
            return e.getGlobalRecByPoints(t, 0, 0, 1, 1);
        }, e.bind = function(t, e) {
            var i = t;
            return i = t.bind(e);
        }, e.measureText = function(t, e) {
            return ue.measureText(t, e);
        }, e.updateOrder = function(t) {
            if (!t || t.length < 2) return !1;
            for (var e, i = 1, n = 0, r = t.length, s = NaN; r > i; ) {
                for (n = i, e = t[n], s = t[n]._zOrder; --n > -1 && t[n]._zOrder > s; ) t[n + 1] = t[n];
                t[n + 1] = e, i++;
            }
            return !0;
        }, e.transPointList = function(t, e, i) {
            var n = 0, r = t.length;
            for (n = 0; r > n; n += 2) t[n] += e, t[n + 1] += i;
        }, e.parseInt = function(t, e) {
            void 0 === e && (e = 0);
            var i = Dt.window.parseInt(t, e);
            return isNaN(i) ? 0 : i;
        }, e.getFileExtension = function(t) {
            e._extReg.lastIndex = t.lastIndexOf(".");
            var i = e._extReg.exec(t);
            return i && i.length > 1 ? i[1].toLowerCase() : null;
        }, e.getTransformRelativeToWindow = function(t, e, n) {
            var r = i.stage, s = laya.utils.Utils.getGlobalPosAndScale(t), a = r._canvasTransform.clone(), o = a.tx, h = a.ty;
            a.rotate(-Math.PI / 180 * i.stage.canvasDegree), a.scale(i.stage.clientScaleX, i.stage.clientScaleY);
            var l = i.stage.canvasDegree % 180 != 0, u = NaN, c = NaN;
            l ? (u = n + s.y, c = e + s.x, u *= a.d, c *= a.a, 90 == i.stage.canvasDegree ? (u = o - u, 
            c += h) : (u += o, c = h - c)) : (u = e + s.x, c = n + s.y, u *= a.a, c *= a.d, 
            u += o, c += h), c += i.stage._safariOffsetY;
            var _ = NaN, d = NaN;
            return l ? (_ = a.d * s.height, d = a.a * s.width) : (_ = a.a * s.width, d = a.d * s.height), 
            {
                x: u,
                y: c,
                scaleX: _,
                scaleY: d
            };
        }, e.fitDOMElementInArea = function(t, n, r, s, a, o) {
            t._fitLayaAirInitialized || (t._fitLayaAirInitialized = !0, t.style.transformOrigin = t.style.webKittransformOrigin = "left top", 
            t.style.position = "absolute");
            var h = e.getTransformRelativeToWindow(n, r, s);
            t.style.transform = t.style.webkitTransform = "scale(" + h.scaleX + "," + h.scaleY + ") rotate(" + i.stage.canvasDegree + "deg)", 
            t.style.width = a + "px", t.style.height = o + "px", t.style.left = h.x + "px", 
            t.style.top = h.y + "px";
        }, e.isOkTextureList = function(t) {
            if (!t) return !1;
            var e, i = 0, n = t.length;
            for (i = 0; n > i; i++) if (e = t[i], !e || !e._getSource()) return !1;
            return !0;
        }, e.isOKCmdList = function(t) {
            if (!t) return !1;
            var e, i = 0, n = t.length;
            for (i = 0; n > i; i++) e = t[i];
            return !0;
        }, e.getQueryString = function(e) {
            if (Dt.onMiniGame) return null;
            if (!t.location || !t.location.search) return null;
            var i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), n = t.location.search.substr(1).match(i);
            return null != n ? unescape(n[2]) : null;
        }, e._gid = 1, e._pi = 180 / Math.PI, e._pi2 = Math.PI / 180, e._extReg = /\.(\w+)\??/g, 
        e.parseXMLFromString = function(t) {
            var e;
            if (t = t.replace(/>\s+</g, "><"), e = new DOMParser().parseFromString(t, "text/xml"), 
            e.firstChild.textContent.indexOf("This page contains the following errors") > -1) throw new Error(e.firstChild.firstChild.textContent);
            return e;
        }, e;
    }(), ne = (function() {
        function t() {}
        r(t, "laya.webgl.text.ArabicReshaper");
        var e = t.prototype;
        return e.characterMapContains = function(e) {
            for (var i = 0; i < t.charsMap.length; ++i) if (t.charsMap[i][0] === e) return !0;
            return !1;
        }, e.getCharRep = function(e) {
            for (var i = 0; i < t.charsMap.length; ++i) if (t.charsMap[i][0] === e) return t.charsMap[i];
            return !1;
        }, e.getCombCharRep = function(e, i) {
            for (var n = 0; n < t.combCharsMap.length; ++n) if (t.combCharsMap[n][0][0] === e && t.combCharsMap[n][0][1] === i) return t.combCharsMap[n];
            return !1;
        }, e.isTransparent = function(e) {
            for (var i = 0; i < t.transChars.length; ++i) if (t.transChars[i] === e) return !0;
            return !1;
        }, e.getOriginalCharsFromCode = function(e) {
            var i = 0;
            for (i = 0; i < t.charsMap.length; ++i) if (t.charsMap[i].indexOf(e) > -1) return String.fromCharCode(t.charsMap[i][0]);
            for (i = 0; i < t.combCharsMap.length; ++i) if (t.combCharsMap[i].indexOf(e) > -1) return String.fromCharCode(t.combCharsMap[i][0][0]) + String.fromCharCode(t.combCharsMap[i][0][1]);
            return String.fromCharCode(e);
        }, e.convertArabic = function(t) {
            for (var e, i, n = "", r = 0; r < t.length; ++r) {
                var s = t.charCodeAt(r);
                if (this.characterMapContains(s)) {
                    for (var a = null, o = null, h = r - 1, l = r + 1; h >= 0 && this.isTransparent(t.charCodeAt(h)); --h) ;
                    for (a = h >= 0 ? t.charCodeAt(h) : null, e = a ? this.getCharRep(a) : !1, (!e || null == e[2] && null == e[3]) && (a = null); l < t.length && this.isTransparent(t.charCodeAt(l)); ++l) ;
                    if (o = l < t.length ? t.charCodeAt(l) : null, e = o ? this.getCharRep(o) : !1, 
                    (!e || null == e[3] && null == e[4]) && (o = null), 1604 === s && null != o && (1570 === o || 1571 === o || 1573 === o || 1575 === o)) {
                        i = this.getCombCharRep(s, o), n += null != a ? String.fromCharCode(i[4]) : String.fromCharCode(i[1]), 
                        ++r;
                        continue;
                    }
                    if (e = this.getCharRep(s), null != a && null != o && null != e[3]) {
                        n += String.fromCharCode(e[3]);
                        continue;
                    }
                    if (null != a && null != e[4]) {
                        n += String.fromCharCode(e[4]);
                        continue;
                    }
                    if (null != o && null != e[2]) {
                        n += String.fromCharCode(e[2]);
                        continue;
                    }
                    n += String.fromCharCode(e[1]);
                } else n += String.fromCharCode(s);
            }
            return n;
        }, e.convertArabicBack = function(t) {
            var e = "", i = 0, n = 0;
            for (n = 0; n < t.length; ++n) i = t.charCodeAt(n), e += this.getOriginalCharsFromCode(i);
            return e;
        }, n(t, [ "charsMap", function() {
            return this.charsMap = [ [ 1569, 65152, null, null, null ], [ 1570, 65153, null, null, 65154 ], [ 1571, 65155, null, null, 65156 ], [ 1572, 65157, null, null, 65158 ], [ 1573, 65159, null, null, 65160 ], [ 1574, 65161, 65163, 65164, 65162 ], [ 1575, 65165, null, null, 65166 ], [ 1576, 65167, 65169, 65170, 65168 ], [ 1577, 65171, null, null, 65172 ], [ 1578, 65173, 65175, 65176, 65174 ], [ 1579, 65177, 65179, 65180, 65178 ], [ 1580, 65181, 65183, 65184, 65182 ], [ 1581, 65185, 65187, 65188, 65186 ], [ 1582, 65189, 65191, 65192, 65190 ], [ 1583, 65193, null, null, 65194 ], [ 1584, 65195, null, null, 65196 ], [ 1585, 65197, null, null, 65198 ], [ 1586, 65199, null, null, 65200 ], [ 1587, 65201, 65203, 65204, 65202 ], [ 1588, 65205, 65207, 65208, 65206 ], [ 1589, 65209, 65211, 65212, 65210 ], [ 1590, 65213, 65215, 65216, 65214 ], [ 1591, 65217, 65219, 65220, 65218 ], [ 1592, 65221, 65223, 65224, 65222 ], [ 1593, 65225, 65227, 65228, 65226 ], [ 1594, 65229, 65231, 65232, 65230 ], [ 1600, 1600, 1600, 1600, 1600 ], [ 1601, 65233, 65235, 65236, 65234 ], [ 1602, 65237, 65239, 65240, 65238 ], [ 1603, 65241, 65243, 65244, 65242 ], [ 1604, 65245, 65247, 65248, 65246 ], [ 1605, 65249, 65251, 65252, 65250 ], [ 1606, 65253, 65255, 65256, 65254 ], [ 1607, 65257, 65259, 65260, 65258 ], [ 1608, 65261, null, null, 65262 ], [ 1609, 65263, null, null, 65264 ], [ 1610, 65265, 65267, 65268, 65266 ], [ 1662, 64342, 64344, 64345, 64343 ], [ 1740, 64508, 64510, 64511, 64509 ], [ 1670, 64378, 64380, 64381, 64379 ], [ 1705, 64398, 64400, 64401, 64399 ], [ 1711, 64402, 64404, 64405, 64403 ], [ 1688, 64394, null, null, 64395 ] ];
        }, "combCharsMap", function() {
            return this.combCharsMap = [ [ [ 1604, 1570 ], 65269, null, null, 65270 ], [ [ 1604, 1571 ], 65271, null, null, 65272 ], [ [ 1604, 1573 ], 65273, null, null, 65274 ], [ [ 1604, 1575 ], 65275, null, null, 65276 ] ];
        }, "transChars", function() {
            return this.transChars = [ 1552, 1554, 1555, 1556, 1557, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1648, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1759, 1760, 1761, 1762, 1763, 1764, 1767, 1768, 1770, 1771, 1772, 1773 ];
        } ]), t;
    }(), function() {
        function t() {}
        r(t, "laya.display.cmd.DrawLinesCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.points = null, this.lineColor = null, U.recover("DrawLinesCmd", this);
        }, e.run = function(t, e, i) {
            t._drawLines(this.x + e, this.y + i, this.points, this.lineColor, this.lineWidth, this.vid);
        }, s(0, e, "cmdID", function() {
            return "DrawLines";
        }), t.create = function(e, i, n, r, s, a) {
            var o = U.getItemByClass("DrawLinesCmd", t);
            return o.x = e, o.y = i, o.points = n, o.lineColor = r, o.lineWidth = s, o.vid = a, 
            o;
        }, t.ID = "DrawLines", t;
    }()), re = function() {
        function t() {
            this._data = [], this._ndata = 0, this._tex = null, this._imgId = 0, this._clipid = -1, 
            this._enbale = !1, this._colorFiler = null, this._clipMatrix = new st();
        }
        r(t, "laya.webgl.text.CharSubmitCache");
        var e = t.prototype;
        return e.clear = function() {
            this._tex = null, this._imgId = -1, this._ndata = 0, this._enbale = !1, this._colorFiler = null;
        }, e.destroy = function() {
            this.clear(), this._data.length = 0, this._data = null;
        }, e.add = function(t, e, i, n, r, s) {
            this._ndata > 0 && (this._tex != e || this._imgId != i || this._clipid >= 0 && this._clipid != t._clipInfoID) && this.submit(t), 
            this._clipid = t._clipInfoID, t._globalClipMatrix.copyTo(this._clipMatrix), this._tex = e, 
            this._imgId = i, this._colorFiler = t._colorFiler, this._data[this._ndata] = n, 
            this._data[this._ndata + 1] = r, this._data[this._ndata + 2] = s, this._ndata += 3;
        }, e.getPos = function() {
            return 0 == t.__nPosPool ? new Array(8) : t.__posPool[--t.__nPosPool];
        }, e.enable = function(t, e) {
            t !== this._enbale && (this._enbale = t, this._enbale || this.submit(e));
        }, e.submit = function(e) {
            var i = this._ndata;
            if (i) {
                var n = e._mesh, r = e._colorFiler;
                e._colorFiler = this._colorFiler;
                var s = xe.create(e, n, X.create(1, 0));
                e._submits[e._submits._length++] = e._curSubmit = s, s.shaderValue.textureHost = this._tex, 
                s._key.other = this._imgId, e._colorFiler = r, e._copyClipInfo(s, this._clipMatrix), 
                s.clipInfoID = this._clipid;
                for (var a = 0; i > a; a += 3) n.addQuad(this._data[a], this._data[a + 1], this._data[a + 2], !0), 
                t.__posPool[t.__nPosPool++] = this._data[a];
                i /= 3, s._numEle += 6 * i, n.indexNum += 6 * i, n.vertNum += 4 * i, e._drawCount += i, 
                this._ndata = 0, A.loopCount % 100 == 0 && (this._data.length = 0);
            }
        }, t.__posPool = [], t.__nPosPool = 0, t;
    }(), se = function() {
        function t() {}
        return r(t, "Config"), t.animationInterval = 50, t.isAntialias = !1, t.isAlpha = !1, 
        t.premultipliedAlpha = !0, t.isStencil = !0, t.preserveDrawingBuffer = !1, t.webGL2D_MeshAllocMaxMem = !0, 
        t.is2DPixelArtGame = !1, t.useWebGL2 = !1, t.useRetinalCanvas = !1, t;
    }(), ae = function() {
        function t() {}
        r(t, "laya.display.cmd.DrawCurvesCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.points = null, this.lineColor = null, U.recover("DrawCurvesCmd", this);
        }, e.run = function(t, e, i) {
            t.drawCurves(this.x + e, this.y + i, this.points, this.lineColor, this.lineWidth);
        }, s(0, e, "cmdID", function() {
            return "DrawCurves";
        }), t.create = function(e, i, n, r, s) {
            var a = U.getItemByClass("DrawCurvesCmd", t);
            return a.x = e, a.y = i, a.points = n, a.lineColor = r, a.lineWidth = s, a;
        }, t.ID = "DrawCurves", t;
    }(), oe = function() {
        function t() {
            this._textIsWorldText = !1, this._fontColor = 4294967295, this._strokeColor = 0, 
            this._nTexAlign = 0, this._fontObj = t._defFontObj;
        }
        r(t, "laya.display.cmd.FillTextCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("FillTextCmd", this);
        }, e.run = function(t, e, n) {
            i.stage.isGlobalRepaint() && this._textIsWorldText && this._text.cleanCache(), this._textIsWorldText ? t._fast_filltext(this._text, this.x + e, this.y + n, this._fontObj, this._color, null, 0, this._nTexAlign, 0) : t.drawText(this._text, this.x + e, this.y + n, this._font, this._color, this._textAlign);
        }, s(0, e, "text", function() {
            return this._text;
        }, function(t) {
            this._text = t, this._textIsWorldText = t instanceof laya.utils.WordText, this._textIsWorldText && this._text.cleanCache();
        }), s(0, e, "cmdID", function() {
            return "FillText";
        }), s(0, e, "color", function() {
            return this._color;
        }, function(t) {
            this._color = t, this._fontColor = o.create(t).numColor, this._textIsWorldText && this._text.cleanCache();
        }), s(0, e, "font", function() {
            return this._font;
        }, function(t) {
            this._font = t, this._fontObj = fe.Parse(t), this._textIsWorldText && this._text.cleanCache();
        }), s(0, e, "textAlign", function() {
            return this._textAlign;
        }, function(t) {
            switch (this._textAlign = t, t) {
              case "center":
                this._nTexAlign = ut.ENUM_TEXTALIGN_CENTER;
                break;

              case "right":
                this._nTexAlign = ut.ENUM_TEXTALIGN_RIGHT;
                break;

              default:
                this._nTexAlign = ut.ENUM_TEXTALIGN_DEFAULT;
            }
            this._textIsWorldText && this._text.cleanCache();
        }), t.create = function(e, i, n, r, s, a) {
            var o = U.getItemByClass("FillTextCmd", t);
            return o.text = e, o._textIsWorldText = e instanceof laya.utils.WordText, o.x = i, 
            o.y = n, o.font = r, o.color = s, o.textAlign = a, o;
        }, t.ID = "FillText", n(t, [ "_defFontObj", function() {
            return this._defFontObj = new fe(null);
        } ]), t;
    }(), he = (function() {
        function t() {}
        return r(t, "laya.webgl.shader.ShaderValue"), t;
    }(), function() {
        function t() {}
        return r(t, "laya.events.KeyLocation"), t.STANDARD = 0, t.LEFT = 1, t.RIGHT = 2, 
        t.NUM_PAD = 3, t;
    }(), function() {
        function t() {
            this._clipInfoID = -1, this.incache = !1, this._globalClipMatrix = new st(), this._clipRect = new mt();
        }
        r(t, "laya.webgl.canvas.save.SaveClipRect");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            this._globalClipMatrix.copyTo(e._globalClipMatrix), this._clipRect.clone(e._clipRect), 
            e._clipInfoID = this._clipInfoID, t.POOL[t.POOL._length++] = this, e._clipInCache = this.incache;
        }, t.save = function(e) {
            if (131072 != (131072 & e._saveMark._saveuse)) {
                e._saveMark._saveuse |= 131072;
                var i = t.POOL, n = i._length > 0 ? i[--i._length] : new t();
                e._globalClipMatrix.copyTo(n._globalClipMatrix), e._clipRect.clone(n._clipRect), 
                n._clipInfoID = e._clipInfoID, n.incache = e._clipInCache;
                var r = e._save;
                r[r._length++] = n;
            }
        }, t.POOL = h._createArray(), t;
    }()), le = function() {
        function t() {}
        r(t, "laya.filters.GlowFilterGLRender");
        var e = t.prototype;
        return e.setShaderInfo = function(t, e, i, n) {
            t.defines.add(n.type);
            var r = t;
            r.u_blurInfo1 = n._sv_blurInfo1;
            var s = n._sv_blurInfo2;
            s[0] = e, s[1] = i, r.u_blurInfo2 = s, r.u_color = n.getColor();
        }, e.render = function(t, e, i, n, r) {
            var s = i, a = n, o = X.create(1, 0);
            this.setShaderInfo(o, s, a, r);
            var h = X.create(1, 0), l = st.TEMP.identity();
            e.drawTarget(t, 0, 0, s, a, l, o), e.drawTarget(t, 0, 0, s, a, l, h);
        }, t;
    }(), ue = function() {
        function t() {}
        return r(t, "laya.utils.RunDriver"), t.createShaderCondition = function(t) {
            var e = "(function() {return " + t + ";})";
            return i._runScript(e);
        }, t.fontMap = [], t.measureText = function(e, i) {
            var n = t.hanzi.test(e);
            if (n && t.fontMap[i]) return t.fontMap[i];
            var r = Dt.context;
            r.font = i;
            var s = r.measureText(e);
            return n && (t.fontMap[i] = s), s;
        }, t.drawToCanvas = function(t, e, i, n, r, s) {
            r -= t.x, s -= t.y, r |= 0, s |= 0, i |= 0, n |= 0;
            var a = new ut();
            a.size(i, n), a.asBitmap = !0, a._targets.start(), I.renders[e]._fun(t, a, r, s), 
            a.flush(), a._targets.end(), a._targets.restore();
            var o = a._targets.getData(0, 0, i, n);
            a.destroy();
            for (var h = new ImageData(i, n), l = 4 * i, u = (new Uint8Array(l), h.data), c = n - 1, _ = c * l, d = 0; c >= 0; c--) u.set(o.subarray(d, d + l), _), 
            _ -= l, d += l;
            var f = new si(!0);
            f.size(i, n);
            var p = f.getContext("2d");
            return p.putImageData(h, 0, 0), f;
        }, t.drawToTexture = function(t, e, i, n, r, s) {
            r -= t.x, s -= t.y, r |= 0, s |= 0, i |= 0, n |= 0;
            var a = new ut();
            a.size(i, n), a.asBitmap = !0, a._targets.start(), I.renders[e]._fun(t, a, r, s), 
            a.flush(), a._targets.end(), a._targets.restore();
            var o = new Ie(a._targets, Ie.INV_UV);
            return a.destroy(!0), o;
        }, t.changeWebGLSize = function(t, e) {
            wt.onStageResize(t, e);
        }, t.clear = function(t) {
            ut.set2DRenderConfig(), ft.worldScissorTest && wt.mainContext.disable(3089);
            var e = Mt.context, n = 0 == e._submits._length || se.preserveDrawingBuffer ? o.create(t).arrColor : i.stage._wgColor;
            n ? e.clearBG(n[0], n[1], n[2], n[3]) : e.clearBG(0, 0, 0, 0), ft.clear();
        }, t.enableNative = null, n(t, [ "hanzi", function() {
            return this.hanzi = new RegExp("^[一-龥]$");
        } ]), t;
    }(), ce = function() {
        function t() {}
        return r(t, "laya.net.AtlasInfoManager"), t.enable = function(e, n) {
            i.loader.load(e, g.create(null, t._onInfoLoaded, [ n ]), null, "json");
        }, t._onInfoLoaded = function(e, i) {
            var n, r, s, a = 0, o = 0;
            for (n in i) for (s = i[n], r = s[0], s = s[1], o = s.length, a = 0; o > a; a++) t._fileLoadDic[r + s[a]] = n;
            e && e.run();
        }, t.getFileLoadPath = function(e) {
            return t._fileLoadDic[e] || e;
        }, t._fileLoadDic = {}, t;
    }(), _e = function() {
        function t() {}
        return r(t, "laya.webgl.canvas.BlendMode"), t._init_ = function(e) {
            t.fns = [ t.BlendNormal, t.BlendAdd, t.BlendMultiply, t.BlendScreen, t.BlendOverlay, t.BlendLight, t.BlendMask, t.BlendDestinationOut ], 
            t.targetFns = [ t.BlendNormalTarget, t.BlendAddTarget, t.BlendMultiplyTarget, t.BlendScreenTarget, t.BlendOverlayTarget, t.BlendLightTarget, t.BlendMask, t.BlendDestinationOut ];
        }, t.BlendNormal = function(t) {
            nt.setBlendFunc(t, 1, 771);
        }, t.BlendAdd = function(t) {
            nt.setBlendFunc(t, 1, 772);
        }, t.BlendMultiply = function(t) {
            nt.setBlendFunc(t, 774, 771);
        }, t.BlendScreen = function(t) {
            nt.setBlendFunc(t, 1, 1);
        }, t.BlendOverlay = function(t) {
            nt.setBlendFunc(t, 1, 769);
        }, t.BlendLight = function(t) {
            nt.setBlendFunc(t, 1, 1);
        }, t.BlendNormalTarget = function(t) {
            nt.setBlendFunc(t, 1, 771);
        }, t.BlendAddTarget = function(t) {
            nt.setBlendFunc(t, 1, 772);
        }, t.BlendMultiplyTarget = function(t) {
            nt.setBlendFunc(t, 774, 771);
        }, t.BlendScreenTarget = function(t) {
            nt.setBlendFunc(t, 1, 1);
        }, t.BlendOverlayTarget = function(t) {
            nt.setBlendFunc(t, 1, 769);
        }, t.BlendLightTarget = function(t) {
            nt.setBlendFunc(t, 1, 1);
        }, t.BlendMask = function(t) {
            nt.setBlendFunc(t, 0, 770);
        }, t.BlendDestinationOut = function(t) {
            nt.setBlendFunc(t, 0, 0);
        }, t.activeBlendFunction = null, t.NAMES = [ "normal", "add", "multiply", "screen", "overlay", "light", "mask", "destination-out" ], 
        t.TOINT = {
            normal: 0,
            add: 1,
            multiply: 2,
            screen: 3,
            overlay: 4,
            light: 5,
            mask: 6,
            "destination-out": 7,
            lighter: 1
        }, t.NORMAL = "normal", t.ADD = "add", t.MULTIPLY = "multiply", t.SCREEN = "screen", 
        t.OVERLAY = "overlay", t.LIGHT = "light", t.MASK = "mask", t.DESTINATIONOUT = "destination-out", 
        t.LIGHTER = "lighter", t.fns = [], t.targetFns = [], t;
    }(), de = function() {
        function t() {}
        r(t, "laya.display.cmd.RotateCmd");
        var e = t.prototype;
        return e.recover = function() {
            U.recover("RotateCmd", this);
        }, e.run = function(t, e, i) {
            t._rotate(this.angle, this.pivotX + e, this.pivotY + i);
        }, s(0, e, "cmdID", function() {
            return "Rotate";
        }), t.create = function(e, i, n) {
            var r = U.getItemByClass("RotateCmd", t);
            return r.angle = e, r.pivotX = i, r.pivotY = n, r;
        }, t.ID = "Rotate", t;
    }(), fe = function() {
        function t(e) {
            this._font = "14px Arial", this._family = "Arial", this._size = 14, this._italic = !1, 
            this._bold = !1, this._id = t._gfontID++, this.setFont(e || this._font);
        }
        r(t, "laya.utils.FontInfo");
        var e = t.prototype;
        return e.setFont = function(t) {
            this._font = t;
            var e = t.split(" "), i = e.length;
            if (2 > i) return void (1 == i && e[0].indexOf("px") > 0 && (this._size = parseInt(e[0])));
            for (var n = -1, r = 0; i > r; r++) if (e[r].indexOf("px") > 0 || e[r].indexOf("pt") > 0) {
                n = r, this._size = parseInt(e[r]), this._size <= 0 && (console.error("font parse error:" + t), 
                this._size = 14);
                break;
            }
            var s = n + 1, a = e[s];
            for (s++; i > s; s++) a += " " + e[s];
            this._family = a.split(",")[0], this._italic = e.indexOf("italic") >= 0, this._bold = e.indexOf("bold") >= 0;
        }, t.Parse = function(e) {
            if (e === t._lastFont) return t._lastFontInfo;
            var i = t._cache[e];
            return i || (i = t._cache[e] = new t(e)), t._lastFont = e, t._lastFontInfo = i, 
            i;
        }, t.EMPTY = new t(null), t._cache = {}, t._gfontID = 0, t._lastFont = "", t._lastFontInfo = null, 
        t;
    }(), pe = function() {
        function t(t, e, i, n) {
            function r(t) {
                t = t.replace(s._clearCR, "");
                var e = [], i = new Gt(e);
                return s._compileToTree(i, t.split("\n"), 0, e, n), i;
            }
            this._clearCR = new RegExp("\r", "g");
            var s = this, a = Dt.now();
            this._VS = r(t), this._PS = r(e), this._nameMap = i, Dt.now() - a > 2 && console.log("ShaderCompile use time:" + (Dt.now() - a) + "  size:" + t.length + "/" + e.length);
        }
        r(t, "laya.webgl.utils.ShaderCompile");
        var e = t.prototype;
        return e._compileToTree = function(e, i, n, r, s) {
            var a, o, h, l, u, c, _, d = 0, f = 0, p = 0, m = 0;
            for (f = n; f < i.length; f++) if (h = i[f], !(h.length < 1) && (d = h.indexOf("//"), 
            0 !== d)) {
                if (d >= 0 && (h = h.substr(0, d)), a = _ || new Gt(r), _ = null, a.text = h, a.noCompile = !0, 
                (d = h.indexOf("#")) >= 0) {
                    for (l = "#", m = d + 1, p = h.length; p > m; m++) {
                        var g = h.charAt(m);
                        if (" " === g || "\t" === g || "?" === g) break;
                        l += g;
                    }
                    switch (a.name = l, l) {
                      case "#ifdef":
                      case "#ifndef":
                        if (a.src = h, a.noCompile = null != h.match(/[!&|()=<>]/), a.noCompile ? console.log("function():Boolean{return " + h.substr(d + a.name.length) + "}") : (c = h.replace(/^\s*/, "").split(/\s+/), 
                        a.setCondition(c[1], "#ifdef" === l ? 1 : 2), a.text = "//" + a.text), a.setParent(e), 
                        e = a, s) for (c = h.substr(m).split(t._splitToWordExps3), m = 0; m < c.length; m++) h = c[m], 
                        h.length && (s[h] = !0);
                        continue;

                      case "#if":
                        if (a.src = h, a.noCompile = !0, a.setParent(e), e = a, s) for (c = h.substr(m).split(t._splitToWordExps3), 
                        m = 0; m < c.length; m++) h = c[m], h.length && "defined" != h && (s[h] = !0);
                        continue;

                      case "#else":
                        a.src = h, e = e.parent, o = e.childs[e.childs.length - 1], a.noCompile = o.noCompile, 
                        a.noCompile || (a.condition = o.condition, a.conditionType = 1 == o.conditionType ? 2 : 1, 
                        a.text = "//" + a.text + " " + o.text + " " + a.conditionType), a.setParent(e), 
                        e = a;
                        continue;

                      case "#endif":
                        e = e.parent, o = e.childs[e.childs.length - 1], a.noCompile = o.noCompile, a.noCompile || (a.text = "//" + a.text), 
                        a.setParent(e);
                        continue;

                      case "#include":
                        c = t.splitToWords(h, null);
                        var v = t.includes[c[1]];
                        if (!v) throw "ShaderCompile error no this include file:" + c[1];
                        if ((d = c[0].indexOf("?")) < 0) {
                            a.setParent(e), h = v.getWith("with" == c[2] ? c[3] : null), this._compileToTree(a, h.split("\n"), 0, r, s), 
                            a.text = "";
                            continue;
                        }
                        a.setCondition(c[0].substr(d + 1), 1), a.text = v.getWith("with" == c[2] ? c[3] : null);
                        break;

                      case "#import":
                        c = t.splitToWords(h, null), u = c[1], r.push({
                            node: a,
                            file: t.includes[u],
                            ofs: a.text.length
                        });
                        continue;
                    }
                } else {
                    if (o = e.childs[e.childs.length - 1], o && !o.name) {
                        r.length > 0 && t.splitToWords(h, o), _ = a, o.text += "\n" + h;
                        continue;
                    }
                    r.length > 0 && t.splitToWords(h, a);
                }
                a.setParent(e);
            }
        }, e.createShader = function(t, e, i, n) {
            var r = {}, s = "";
            if (t) for (var a in t) s += "#define " + a + "\n", r[a] = !0;
            var o = this._VS.toscript(r, []), h = this._PS.toscript(r, []);
            return (i || ni.create)(s + o.join("\n"), s + h.join("\n"), e, this._nameMap, n);
        }, t._parseOne = function(e, i, n, r, s, a) {
            var o = {
                type: t.shaderParamsMap[n[r + 1]],
                name: n[r + 2],
                size: isNaN(parseInt(n[r + 3])) ? 1 : parseInt(n[r + 3])
            };
            return a && ("attribute" == s ? e.push(o) : i.push(o)), ":" == n[r + 3] && (o.type = n[r + 4], 
            r += 2), r += 2;
        }, t.addInclude = function(e, i) {
            if (!i || 0 === i.length) throw new Error("add shader include file err:" + e);
            if (t.includes[e]) throw new Error("add shader include file err, has add:" + e);
            t.includes[e] = new W(i);
        }, t.preGetParams = function(e, i) {
            var n = [ e, i ], r = {}, s = [], a = [], o = {}, h = [];
            r.attributes = s, r.uniforms = a, r.defines = o;
            for (var l = 0, u = 0, c = 0; 2 > c; c++) {
                n[c] = n[c].replace(t._removeAnnotation, "");
                var _, d = n[c].match(t._reg);
                for (l = 0, u = d.length; u > l; l++) {
                    var f = d[l];
                    if ("attribute" == f || "uniform" == f) l = t._parseOne(s, a, d, l, f, !0); else {
                        if ("#define" == f) {
                            f = d[++l], h[f] = 1;
                            continue;
                        }
                        if ("#ifdef" == f) {
                            _ = d[++l];
                            o[_] = o[_] || [];
                            for (l++; u > l; l++) if (f = d[l], "attribute" == f || "uniform" == f) l = t._parseOne(s, a, d, l, f, h[_]); else if ("#else" == f) for (l++; u > l; l++) if (f = d[l], 
                            "attribute" == f || "uniform" == f) l = t._parseOne(s, a, d, l, f, !h[_]); else if ("#endif" == f) break;
                        }
                    }
                }
            }
            return r;
        }, t.splitToWords = function(t, e) {
            for (var i, n, r = [], s = -1, a = 0, o = t.length; o > a; a++) if (i = t.charAt(a), 
            " \t=+-*/&%!<>()'\",;".indexOf(i) >= 0) {
                if (s >= 0 && a - s > 1 && (n = t.substr(s, a - s), r.push(n)), '"' == i || "'" == i) {
                    var h = t.indexOf(i, a + 1);
                    if (0 > h) throw "Sharder err:" + t;
                    r.push(t.substr(a + 1, h - a - 1)), a = h, s = -1;
                    continue;
                }
                "(" == i && e && r.length > 0 && (n = r[r.length - 1] + ";", "vec4;main;".indexOf(n) < 0 && (e.useFuns += n)), 
                s = -1;
            } else 0 > s && (s = a);
            return o > s && o - s > 1 && (n = t.substr(s, o - s), r.push(n)), r;
        }, t.IFDEF_NO = 0, t.IFDEF_YES = 1, t.IFDEF_ELSE = 2, t.IFDEF_PARENT = 3, t._removeAnnotation = new RegExp("(/\\*([^*]|[\\r\\\n]|(\\*+([^*/]|[\\r\\n])))*\\*+/)|(//.*)", "g"), 
        t._reg = new RegExp("(\".*\")|('.*')|([#\\w\\*-\\.+/()=<>{}\\\\]+)|([,;:\\\\])", "g"), 
        t._splitToWordExps = new RegExp("[(\".*\")]+|[('.*')]+|([ \\t=\\+\\-*/&%!<>!%(),;])", "g"), 
        t.includes = {}, n(t, [ "shaderParamsMap", function() {
            return this.shaderParamsMap = {
                float: 5126,
                int: 5124,
                bool: 35670,
                vec2: 35664,
                vec3: 35665,
                vec4: 35666,
                ivec2: 35667,
                ivec3: 35668,
                ivec4: 35669,
                bvec2: 35671,
                bvec3: 35672,
                bvec4: 35673,
                mat2: 35674,
                mat3: 35675,
                mat4: 35676,
                sampler2D: 35678,
                samplerCube: 35680
            };
        }, "_splitToWordExps3", function() {
            return this._splitToWordExps3 = new RegExp("[ \\t=\\+\\-*/&%!<>!%(),;\\|]", "g");
        } ]), t;
    }(), me = function() {
        function t() {
            this.json = null;
        }
        r(t, "laya.components.Prefab");
        var e = t.prototype;
        return e.create = function() {
            return this.json ? pt.createByData(null, this.json) : null;
        }, t;
    }(), ge = function() {
        function t() {}
        r(t, "laya.display.cmd.FillBorderWordsCmd");
        var e = t.prototype;
        return e.recover = function() {
            this.words = null, U.recover("FillBorderWordsCmd", this);
        }, e.run = function(t, e, i) {
            t.fillBorderWords(this.words, this.x + e, this.y + i, this.font, this.fillColor, this.borderColor, this.lineWidth);
        }, s(0, e, "cmdID", function() {
            return "FillBorderWords";
        }), t.create = function(e, i, n, r, s, a, o) {
            var h = U.getItemByClass("FillBorderWordsCmd", t);
            return h.words = e, h.x = i, h.y = n, h.font = r, h.fillColor = s, h.borderColor = a, 
            h.lineWidth = o, h;
        }, t.ID = "FillBorderWords", t;
    }(), ve = function() {
        function t() {
            this._hit = null, this._unHit = null;
        }
        r(t, "laya.utils.HitArea");
        var e = t.prototype;
        return e.contains = function(e, i) {
            return t._isHitGraphic(e, i, this.hit) ? !t._isHitGraphic(e, i, this.unHit) : !1;
        }, s(0, e, "hit", function() {
            return this._hit || (this._hit = new qt()), this._hit;
        }, function(t) {
            this._hit = t;
        }), s(0, e, "unHit", function() {
            return this._unHit || (this._unHit = new qt()), this._unHit;
        }, function(t) {
            this._unHit = t;
        }), t._isHitGraphic = function(e, i, n) {
            if (!n) return !1;
            var r = n.cmds;
            if (!r && n._one && (r = t._cmds, r.length = 1, r[0] = n._one), !r) return !1;
            var s = 0, a = 0;
            a = r.length;
            var o;
            for (s = 0; a > s; s++) if (o = r[s]) {
                switch (o.cmdID) {
                  case "Translate":
                    e -= o.tx, i -= o.ty;
                }
                if (t._isHitCmd(e, i, o)) return !0;
            }
            return !1;
        }, t._isHitCmd = function(e, i, n) {
            if (!n) return !1;
            var r = !1;
            switch (n.cmdID) {
              case "DrawRect":
                t._rect.setTo(n.x, n.y, n.width, n.height), r = t._rect.contains(e, i);
                break;

              case "DrawCircle":
                var s = NaN;
                e -= n.x, i -= n.y, s = e * e + i * i, r = s < n.radius * n.radius;
                break;

              case "DrawPoly":
                e -= n.x, i -= n.y, r = t._ptInPolygon(e, i, n.points);
            }
            return r;
        }, t._ptInPolygon = function(e, i, n) {
            var r = t._ptPoint;
            r.setTo(e, i);
            var s = 0, a = NaN, o = NaN, h = NaN, l = NaN, u = 0;
            u = n.length;
            for (var c = 0; u > c; c += 2) if (a = n[c], o = n[c + 1], h = n[(c + 2) % u], l = n[(c + 3) % u], 
            o != l && !(r.y < Math.min(o, l) || r.y >= Math.max(o, l))) {
                var _ = (r.y - o) * (h - a) / (l - o) + a;
                _ > r.x && s++;
            }
            return s % 2 == 1;
        }, t._cmds = [], n(t, [ "_rect", function() {
            return this._rect = new mt();
        }, "_ptPoint", function() {
            return this._ptPoint = new Yt();
        } ]), t;
    }(), ye = function() {
        function t() {}
        return r(t, "laya.media.SoundManager"), s(1, t, "useAudioMusic", function() {
            return t._useAudioMusic;
        }, function(e) {
            t._useAudioMusic = e, e ? t._musicClass = we : t._musicClass = null;
        }), s(1, t, "autoStopMusic", function() {
            return t._autoStopMusic;
        }, function(e) {
            i.stage.off("blur", null, t._stageOnBlur), i.stage.off("focus", null, t._stageOnFocus), 
            i.stage.off("visibilitychange", null, t._visibilityChange), t._autoStopMusic = e, 
            e && (i.stage.on("blur", null, t._stageOnBlur), i.stage.on("focus", null, t._stageOnFocus), 
            i.stage.on("visibilitychange", null, t._visibilityChange));
        }), s(1, t, "muted", function() {
            return t._muted;
        }, function(e) {
            e != t._muted && (e && t.stopAllSound(), t.musicMuted = e, t._muted = e);
        }), s(1, t, "musicMuted", function() {
            return t._musicMuted;
        }, function(e) {
            e != t._musicMuted && (e ? (t._bgMusic && t._musicChannel && !t._musicChannel.isStopped ? Mt.isConchApp ? t._musicChannel._audio && (t._musicChannel._audio.muted = !0) : t._musicChannel.pause() : t._musicChannel = null, 
            t._musicMuted = e) : (t._musicMuted = e, t._bgMusic && t._musicChannel && (Mt.isConchApp ? t._musicChannel._audio && (t._musicChannel._audio.muted = !1) : t._musicChannel.resume())));
        }), s(1, t, "soundMuted", function() {
            return t._soundMuted;
        }, function(e) {
            t._soundMuted = e;
        }), t.__init__ = function() {
            var e = Dt.window, i = e.AudioContext || e.webkitAudioContext || e.mozAudioContext ? !0 : !1;
            return i && Fe.initWebAudio(), t._soundClass = i ? Fe : we, we._initMusicAudio(), 
            t._musicClass = we, i;
        }, t.addChannel = function(e) {
            t._channels.indexOf(e) >= 0 || t._channels.push(e);
        }, t.removeChannel = function(e) {
            var i = 0;
            for (i = t._channels.length - 1; i >= 0; i--) t._channels[i] == e && t._channels.splice(i, 1);
        }, t.disposeSoundLater = function(e) {
            t._lastSoundUsedTimeDic[e] = Dt.now(), t._isCheckingDispose || (t._isCheckingDispose = !0, 
            i.timer.loop(5e3, null, t._checkDisposeSound));
        }, t._checkDisposeSound = function() {
            var e, n = Dt.now(), r = !1;
            for (e in t._lastSoundUsedTimeDic) n - t._lastSoundUsedTimeDic[e] > 3e4 ? (delete t._lastSoundUsedTimeDic[e], 
            t.disposeSoundIfNotUsed(e)) : r = !0;
            r || (t._isCheckingDispose = !1, i.timer.clear(null, t._checkDisposeSound));
        }, t.disposeSoundIfNotUsed = function(e) {
            var i = 0;
            for (i = t._channels.length - 1; i >= 0; i--) if (t._channels[i].url == e) return;
            t.destroySound(e);
        }, t._visibilityChange = function() {
            i.stage.isVisibility ? t._stageOnFocus() : t._stageOnBlur();
        }, t._stageOnBlur = function() {
            t._isActive = !1, t._musicChannel && (t._musicChannel.isStopped || (t._blurPaused = !0, 
            t._musicChannel.pause())), t.stopAllSound(), i.stage.once("mousedown", null, t._stageOnFocus);
        }, t._recoverWebAudio = function() {
            Fe.ctx && "running" != Fe.ctx.state && Fe.ctx.resume && Fe.ctx.resume();
        }, t._stageOnFocus = function() {
            t._isActive = !0, t._recoverWebAudio(), i.stage.off("mousedown", null, t._stageOnFocus), 
            t._blurPaused && t._musicChannel && t._musicChannel.isStopped && (t._blurPaused = !1, 
            t._musicChannel.resume());
        }, t.playSound = function(e, n, r, s, a) {
            if (void 0 === n && (n = 1), void 0 === a && (a = 0), !t._isActive || !e) return null;
            if (t._muted) return null;
            if (t._recoverWebAudio(), e = q.formatURL(e), e == t._bgMusic) {
                if (t._musicMuted) return null;
            } else {
                if (Mt.isConchApp) {
                    var o = ie.getFileExtension(e);
                    if ("wav" != o && "ogg" != o) return alert("The sound only supports wav or ogg format,for optimal performance reason,please refer to the official website document."), 
                    null;
                }
                if (t._soundMuted) return null;
            }
            var h;
            Dt.onMiniGame || (h = i.loader.getRes(e)), s || (s = t._soundClass), h || (h = new s(), 
            h.load(e), Dt.onMiniGame || De.cacheRes(e, h));
            var l;
            return (l = h.play(a, n)) ? (l.url = e, l.volume = e == t._bgMusic ? t.musicVolume : t.soundVolume, 
            l.completeHandler = r, l) : null;
        }, t.destroySound = function(t) {
            var e = i.loader.getRes(t);
            e && (De.clearRes(t), e.dispose());
        }, t.playMusic = function(e, i, n, r) {
            return void 0 === i && (i = 0), void 0 === r && (r = 0), e = q.formatURL(e), t._bgMusic = e, 
            t._musicChannel && t._musicChannel.stop(), t._musicChannel = t.playSound(e, i, n, t._musicClass, r);
        }, t.stopSound = function(e) {
            e = q.formatURL(e);
            var i, n = 0;
            for (n = t._channels.length - 1; n >= 0; n--) i = t._channels[n], i.url == e && i.stop();
        }, t.stopAll = function() {
            t._bgMusic = null;
            var e, i = 0;
            for (i = t._channels.length - 1; i >= 0; i--) e = t._channels[i], e.stop();
        }, t.stopAllSound = function() {
            var e, i = 0;
            for (i = t._channels.length - 1; i >= 0; i--) e = t._channels[i], e.url != t._bgMusic && e.stop();
        }, t.stopMusic = function() {
            t._musicChannel && t._musicChannel.stop(), t._bgMusic = null;
        }, t.setSoundVolume = function(e, i) {
            if (i) i = q.formatURL(i), t._setVolume(i, e); else {
                t.soundVolume = e;
                var n, r = 0;
                for (r = t._channels.length - 1; r >= 0; r--) n = t._channels[r], n.url != t._bgMusic && (n.volume = e);
            }
        }, t.setMusicVolume = function(e) {
            t.musicVolume = e, t._setVolume(t._bgMusic, e);
        }, t._setVolume = function(e, i) {
            e = q.formatURL(e);
            var n, r = 0;
            for (r = t._channels.length - 1; r >= 0; r--) n = t._channels[r], n.url == e && (n.volume = i);
        }, t.musicVolume = 1, t.soundVolume = 1, t.playbackRate = 1, t._useAudioMusic = !0, 
        t._muted = !1, t._soundMuted = !1, t._musicMuted = !1, t._bgMusic = null, t._musicChannel = null, 
        t._channels = [], t._autoStopMusic = !1, t._blurPaused = !1, t._isActive = !0, t._soundClass = null, 
        t._musicClass = null, t._lastSoundUsedTimeDic = {}, t._isCheckingDispose = !1, t.autoReleaseSound = !0, 
        t;
    }(), xe = function(t) {
        function e(t) {
            void 0 === t && (t = 1e4), e.__super.call(this, t);
        }
        r(e, "laya.webgl.submit.SubmitTexture", t);
        var i = e.prototype;
        return i.clone = function(t, i, n) {
            var r = e._poolSize ? e.POOL[--e._poolSize] : new e();
            return this._cloneInit(r, t, i, n), r;
        }, i.releaseRender = function() {
            --this._ref < 1 && (e.POOL[e._poolSize++] = this, this.shaderValue.release(), this._mesh = null, 
            this._parent && (this._parent.releaseRender(), this._parent = null));
        }, i.renderSubmit = function() {
            if (0 === this._numEle) return 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                var e = t ? t._getSource() : null;
                if (!e) return 1;
            }
            var i = wt.mainContext;
            this._mesh.useMesh(i);
            var n = l.preRender, r = l.preRender._key;
            return 0 === this._key.blendShader && this._key.submitType === r.submitType && this._key.blendShader === r.blendShader && Ke.activeShader && l.preRender.clipInfoID == this.clipInfoID && n.shaderValue.defines._value === this.shaderValue.defines._value && 0 == (this.shaderValue.defines._value & Re.NOOPTMASK) ? Ke.activeShader.uploadTexture2D(e) : (_e.activeBlendFunction !== this._blendFn && (nt.setBlend(i, !0), 
            this._blendFn(i), _e.activeBlendFunction = this._blendFn), this.shaderValue.texture = e, 
            this.shaderValue.upload()), i.drawElements(4, this._numEle, 5123, this._startIdx), 
            A.renderBatches++, A.trianglesFaces += this._numEle / 3, 1;
        }, e.create = function(t, i, n) {
            var r = e._poolSize ? e.POOL[--e._poolSize] : new e(10016);
            r._mesh = i, r._key.clear(), r._key.submitType = 2, r._ref = 1, r._startIdx = i.indexNum * _t.BYTES_PIDX, 
            r._numEle = 0;
            var s = t._nBlendType;
            if (r._key.blendShader = s, r._blendFn = t._targets ? _e.targetFns[s] : _e.fns[s], 
            r.shaderValue = n, t._colorFiler) {
                var a = t._colorFiler;
                n.defines.add(a.type), n.colorMat = a._mat, n.colorAlpha = a._alpha;
            }
            return r;
        }, e._poolSize = 0, e.POOL = [], e;
    }(l), Te = function(t) {
        function e(t) {
            e.__super.call(this), t || (t = this._copyMatrix(e.IDENTITY_MATRIX)), this._mat = new Float32Array(16), 
            this._alpha = new Float32Array(4), this.setByMatrix(t);
        }
        r(e, "laya.filters.ColorFilter", t);
        var a = e.prototype;
        return i.imps(a, {
            "laya.filters.IFilter": !0
        }), a.gray = function() {
            return this.setByMatrix(e.GRAY_MATRIX);
        }, a.color = function(t, e, i, n) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), 
            void 0 === n && (n = 1), this.setByMatrix([ 1, 0, 0, 0, t, 0, 1, 0, 0, e, 0, 0, 1, 0, i, 0, 0, 0, 1, n ]);
        }, a.setColor = function(t) {
            var e = o.create(t).arrColor, i = [ 0, 0, 0, 0, 256 * e[0], 0, 0, 0, 0, 256 * e[1], 0, 0, 0, 0, 256 * e[2], 0, 0, 0, 1, 0 ];
            return this.setByMatrix(i);
        }, a.setByMatrix = function(t) {
            this._matrix != t && this._copyMatrix(t);
            for (var e = 0, i = 0, n = 0; 20 > n; n++) n % 5 != 4 ? this._mat[e++] = t[n] : this._alpha[i++] = t[n];
            return this;
        }, a.adjustColor = function(t, e, i, n) {
            return this.adjustHue(n), this.adjustContrast(e), this.adjustBrightness(t), this.adjustSaturation(i), 
            this;
        }, a.adjustBrightness = function(t) {
            return t = this._clampValue(t, 100), 0 == t || isNaN(t) ? this : this._multiplyMatrix([ 1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ]);
        }, a.adjustContrast = function(t) {
            if (t = this._clampValue(t, 100), 0 == t || isNaN(t)) return this;
            var i = NaN;
            0 > t ? i = 127 + t / 100 * 127 : (i = t % 1, i = 0 == i ? e.DELTA_INDEX[t] : e.DELTA_INDEX[t << 0] * (1 - i) + e.DELTA_INDEX[(t << 0) + 1] * i, 
            i = 127 * i + 127);
            var n = i / 127, r = .5 * (127 - i);
            return this._multiplyMatrix([ n, 0, 0, 0, r, 0, n, 0, 0, r, 0, 0, n, 0, r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ]);
        }, a.adjustSaturation = function(t) {
            if (t = this._clampValue(t, 100), 0 == t || isNaN(t)) return this;
            var e = 1 + (t > 0 ? 3 * t / 100 : t / 100), i = 1 - e, n = .3086 * i, r = .6094 * i, s = .082 * i;
            return this._multiplyMatrix([ n + e, r, s, 0, 0, n, r + e, s, 0, 0, n, r, s + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ]);
        }, a.adjustHue = function(t) {
            if (t = this._clampValue(t, 180) / 180 * Math.PI, 0 == t || isNaN(t)) return this;
            var e = Math.cos(t), i = Math.sin(t), n = .213, r = .715, s = .072;
            return this._multiplyMatrix([ n + e * (1 - n) + i * -n, r + e * -r + i * -r, s + e * -s + i * (1 - s), 0, 0, n + e * -n + .143 * i, r + e * (1 - r) + .14 * i, s + e * -s + i * -.283, 0, 0, n + e * -n + i * -(1 - n), r + e * -r + i * r, s + e * (1 - s) + i * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ]);
        }, a.reset = function() {
            return this.setByMatrix(this._copyMatrix(e.IDENTITY_MATRIX));
        }, a._multiplyMatrix = function(t) {
            var e = [];
            this._matrix = this._fixMatrix(this._matrix);
            for (var i = 0; 5 > i; i++) {
                for (var n = 0; 5 > n; n++) e[n] = this._matrix[n + 5 * i];
                for (n = 0; 5 > n; n++) {
                    for (var r = 0, s = 0; 5 > s; s++) r += t[n + 5 * s] * e[s];
                    this._matrix[n + 5 * i] = r;
                }
            }
            return this.setByMatrix(this._matrix);
        }, a._clampValue = function(t, e) {
            return Math.min(e, Math.max(-e, t));
        }, a._fixMatrix = function(t) {
            return null == t ? e.IDENTITY_MATRIX : (t.length < 25 ? t = t.slice(0, t.length).concat(e.IDENTITY_MATRIX.slice(t.length, 25)) : t.length > 25 && (t = t.slice(0, 25)), 
            t);
        }, a._copyMatrix = function(t) {
            var e = 25;
            this._matrix || (this._matrix = []);
            for (var i = 0; e > i; i++) this._matrix[i] = t[i];
            return this._matrix;
        }, s(0, a, "type", function() {
            return 32;
        }), e.LENGTH = 25, n(e, [ "DELTA_INDEX", function() {
            return this.DELTA_INDEX = [ 0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10 ];
        }, "GRAY_MATRIX", function() {
            return this.GRAY_MATRIX = [ .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0 ];
        }, "IDENTITY_MATRIX", function() {
            return this.IDENTITY_MATRIX = [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ];
        } ]), e;
    }(c), be = function(t) {
        function e() {
            this._matrix = new st(), this._matrix4 = _t.defaultMatrix4.concat(), e.__super.call(this, 1e4), 
            this.shaderValue = new X(0, 0);
        }
        r(e, "laya.webgl.submit.SubmitCanvas", t);
        var i = e.prototype;
        return i.renderSubmit = function() {
            var t = ft.worldAlpha, e = ft.worldMatrix4, i = ft.worldMatrix, n = ft.worldFilters, r = ft.worldShaderDefines, s = this.shaderValue, a = this._matrix, o = this._matrix4, h = st.TEMP;
            return st.mul(a, i, h), o[0] = h.a, o[1] = h.b, o[4] = h.c, o[5] = h.d, o[12] = h.tx, 
            o[13] = h.ty, ft.worldMatrix = h.clone(), ft.worldMatrix4 = o, ft.worldAlpha = ft.worldAlpha * s.alpha, 
            s.filters && s.filters.length && (ft.worldFilters = s.filters, ft.worldShaderDefines = s.defines), 
            this.canv.flushsubmit(), ft.worldAlpha = t, ft.worldMatrix4 = e, ft.worldMatrix.destroy(), 
            ft.worldMatrix = i, ft.worldFilters = n, ft.worldShaderDefines = r, 1;
        }, i.releaseRender = function() {
            if (--this._ref < 1) {
                var t = e.POOL;
                this._mesh = null, t[t._length++] = this;
            }
        }, i.clone = function(t, e, i) {
            return null;
        }, i.getRenderType = function() {
            return 10003;
        }, e.create = function(t, i, n) {
            var r = e.POOL._length ? e.POOL[--e.POOL._length] : new e();
            r.canv = t, r._ref = 1, r._numEle = 0;
            var s = r.shaderValue;
            return s.alpha = i, s.defines.setValue(0), n && n.length && s.setFilters(n), r;
        }, e.POOL = [], e.__init$ = function() {
            e.POOL._length = 0;
        }, e;
    }(l), we = (function(t) {
        function e() {
            e.__super.call(this);
        }
        r(e, "laya.components.Script", t);
        var n = e.prototype;
        return n._onAwake = function() {
            this.onAwake(), this.onStart !== laya.components.Script.prototype.onStart && i.startTimer.callLater(this, this.onStart);
        }, n._onEnable = function() {
            var t = laya.components.Script.prototype;
            this.onTriggerEnter !== t.onTriggerEnter && this.owner.on("triggerenter", this, this.onTriggerEnter), 
            this.onTriggerStay !== t.onTriggerStay && this.owner.on("triggerstay", this, this.onTriggerStay), 
            this.onTriggerExit !== t.onTriggerExit && this.owner.on("triggerexit", this, this.onTriggerExit), 
            this.onMouseDown !== t.onMouseDown && this.owner.on("mousedown", this, this.onMouseDown), 
            this.onMouseUp !== t.onMouseUp && this.owner.on("mouseup", this, this.onMouseUp), 
            this.onClick !== t.onClick && this.owner.on("click", this, this.onClick), this.onStageMouseDown !== t.onStageMouseDown && i.stage.on("mousedown", this, this.onStageMouseDown), 
            this.onStageMouseUp !== t.onStageMouseUp && i.stage.on("mouseup", this, this.onStageMouseUp), 
            this.onStageClick !== t.onStageClick && i.stage.on("click", this, this.onStageClick), 
            this.onStageMouseMove !== t.onStageMouseMove && i.stage.on("mousemove", this, this.onStageMouseMove), 
            this.onDoubleClick !== t.onDoubleClick && this.owner.on("doubleclick", this, this.onDoubleClick), 
            this.onRightClick !== t.onRightClick && this.owner.on("rightclick", this, this.onRightClick), 
            this.onMouseMove !== t.onMouseMove && this.owner.on("mousemove", this, this.onMouseMove), 
            this.onMouseOver !== t.onMouseOver && this.owner.on("mouseover", this, this.onMouseOver), 
            this.onMouseOut !== t.onMouseOut && this.owner.on("mouseout", this, this.onMouseOut), 
            this.onKeyDown !== t.onKeyDown && i.stage.on("keydown", this, this.onKeyDown), this.onKeyPress !== t.onKeyPress && i.stage.on("keypress", this, this.onKeyPress), 
            this.onKeyUp !== t.onKeyUp && i.stage.on("keyup", this, this.onKeyUp), this.onUpdate !== t.onUpdate && i.updateTimer.frameLoop(1, this, this.onUpdate), 
            this.onLateUpdate !== t.onLateUpdate && i.lateTimer.frameLoop(1, this, this.onLateUpdate), 
            this.onPreRender !== t.onPreRender && i.lateTimer.frameLoop(1, this, this.onPreRender);
        }, n._onDisable = function() {
            this.owner.offAllCaller(this), i.stage.offAllCaller(this), i.startTimer.clearAll(this), 
            i.updateTimer.clearAll(this), i.lateTimer.clearAll(this);
        }, n._isScript = function() {
            return !0;
        }, n._onDestroy = function() {
            this.onDestroy();
        }, n.onAwake = function() {}, n.onEnable = function() {}, n.onStart = function() {}, 
        n.onTriggerEnter = function(t, e, i) {}, n.onTriggerStay = function(t, e, i) {}, 
        n.onTriggerExit = function(t, e, i) {}, n.onMouseDown = function(t) {}, n.onMouseUp = function(t) {}, 
        n.onClick = function(t) {}, n.onStageMouseDown = function(t) {}, n.onStageMouseUp = function(t) {}, 
        n.onStageClick = function(t) {}, n.onStageMouseMove = function(t) {}, n.onDoubleClick = function(t) {}, 
        n.onRightClick = function(t) {}, n.onMouseMove = function(t) {}, n.onMouseOver = function(t) {}, 
        n.onMouseOut = function(t) {}, n.onKeyDown = function(t) {}, n.onKeyPress = function(t) {}, 
        n.onKeyUp = function(t) {}, n.onUpdate = function() {}, n.onLateUpdate = function() {}, 
        n.onPreRender = function() {}, n.onPostRender = function() {}, n.onDisable = function() {}, 
        n.onDestroy = function() {}, s(0, n, "isSingleton", function() {
            return !1;
        }), e;
    }(p), function(t) {
        function e() {
            this.url = null, this.audio = null, this.loaded = !1, e.__super.call(this);
        }
        r(e, "laya.media.h5audio.AudioSound", t);
        var i = e.prototype;
        return i.dispose = function() {
            var t = e._audioCache[this.url];
            U.clearBySign("audio:" + this.url), t && (Mt.isConchApp || (t.src = ""), delete e._audioCache[this.url]);
        }, i.load = function(t) {
            function i() {
                r(), a.loaded = !0, a.event("complete");
            }
            function n() {
                s.load = null, r(), a.event("error");
            }
            function r() {
                s.removeEventListener("canplaythrough", i), s.removeEventListener("error", n);
            }
            t = q.formatURL(t), this.url = t;
            var s;
            if (t == ye._bgMusic ? (e._initMusicAudio(), s = e._musicAudio, s.src != t && (e._audioCache[s.src] = null, 
            s = null)) : s = e._audioCache[t], s && s.readyState >= 2) return void this.event("complete");
            s || (t == ye._bgMusic ? (e._initMusicAudio(), s = e._musicAudio) : s = Dt.createElement("audio"), 
            e._audioCache[t] = s, s.src = t), s.addEventListener("canplaythrough", i), s.addEventListener("error", n);
            var a = this;
            this.audio = s, s.load ? s.load() : n();
        }, i.play = function(t, i) {
            if (void 0 === t && (t = 0), void 0 === i && (i = 0), !this.url) return null;
            var n;
            if (n = this.url == ye._bgMusic ? e._musicAudio : e._audioCache[this.url], !n) return null;
            var r;
            r = U.getItem("audio:" + this.url), Mt.isConchApp ? r || (r = Dt.createElement("audio"), 
            r.src = this.url) : this.url == ye._bgMusic ? (e._initMusicAudio(), r = e._musicAudio, 
            r.src = this.url) : r = r ? r : n.cloneNode(!0);
            var s = new Je(r);
            return s.url = this.url, s.loops = i, s.startTime = t, s.play(), ye.addChannel(s), 
            s;
        }, s(0, i, "duration", function() {
            var t;
            return t = e._audioCache[this.url], t ? t.duration : 0;
        }), e._initMusicAudio = function() {
            e._musicAudio || (e._musicAudio || (e._musicAudio = Dt.createElement("audio")), 
            Mt.isConchApp || Dt.document.addEventListener("mousedown", e._makeMusicOK));
        }, e._makeMusicOK = function() {
            Dt.document.removeEventListener("mousedown", e._makeMusicOK), e._musicAudio.src ? e._musicAudio.play() : (e._musicAudio.src = "", 
            e._musicAudio.load());
        }, e._audioCache = {}, e._musicAudio = null, e;
    }(m)), Ce = (function(t) {
        function e() {
            e.__super.call(this);
        }
        r(e, "laya.media.Sound", t);
        var i = e.prototype;
        return i.load = function(t) {}, i.play = function(t, e) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), null;
        }, i.dispose = function() {}, s(0, i, "duration", function() {
            return 0;
        }), e;
    }(m), function(t) {
        function e(t) {
            e.__super.call(this, 116, 4 * t * 116, 4), this.canReuse = !0, this.setAttributes(laya.webgl.utils.MeshParticle2D._fixattriInfo), 
            this.createQuadIB(t), this._quadNum = t;
        }
        r(e, "laya.webgl.utils.MeshParticle2D", t);
        var i = e.prototype;
        return i.setMaxParticleNum = function(t) {
            this._vb._resizeBuffer(4 * t * 116, !1), this.createQuadIB(t);
        }, i.releaseMesh = function() {
            this._vb.setByteLength(0), this.vertNum = 0, this.indexNum = 0, laya.webgl.utils.MeshParticle2D._POOL.push(this);
        }, i.destroy = function() {
            this._ib.destroy(), this._vb.destroy(), this._vb.deleteBuffer();
        }, e.getAMesh = function(t) {
            if (laya.webgl.utils.MeshParticle2D._POOL.length) {
                var i = laya.webgl.utils.MeshParticle2D._POOL.pop();
                return i.setMaxParticleNum(t), i;
            }
            return new e(t);
        }, e.const_stride = 116, e._POOL = [], n(e, [ "_fixattriInfo", function() {
            return this._fixattriInfo = [ 5126, 4, 0, 5126, 3, 16, 5126, 3, 28, 5126, 4, 40, 5126, 4, 56, 5126, 3, 72, 5126, 2, 84, 5126, 4, 92, 5126, 1, 108, 5126, 1, 112 ];
        } ]), e;
    }(b), function(t) {
        function e() {
            this._bits = 0, this._parent = null, this.name = "", this.destroyed = !1, this._conchData = null, 
            this._components = null, this._activeChangeScripts = null, this._scene = null, e.__super.call(this), 
            this._children = e.ARRAY_EMPTY, this._extUIChild = e.ARRAY_EMPTY, this.createGLBuffer();
        }
        r(e, "laya.display.Node", t);
        var n = e.prototype;
        return n.createGLBuffer = function() {}, n._setBit = function(t, e) {
            if (16 === t) {
                var i = this._getBit(t);
                i != e && this._updateDisplayedInstage();
            }
            e ? this._bits |= t : this._bits &= ~t;
        }, n._getBit = function(t) {
            return 0 != (this._bits & t);
        }, n._setUpNoticeChain = function() {
            this._getBit(16) && this._setBitUp(16);
        }, n._setBitUp = function(t) {
            var e = this;
            for (e._setBit(t, !0), e = e._parent; e; ) {
                if (e._getBit(t)) return;
                e._setBit(t, !0), e = e._parent;
            }
        }, n.on = function(t, e, i, n) {
            return ("display" === t || "undisplay" === t) && (this._getBit(16) || this._setBitUp(16)), 
            this._createListener(t, e, i, n, !1);
        }, n.once = function(t, e, i, n) {
            return ("display" === t || "undisplay" === t) && (this._getBit(16) || this._setBitUp(16)), 
            this._createListener(t, e, i, n, !0);
        }, n.destroy = function(t) {
            void 0 === t && (t = !0), this.destroyed = !0, this._destroyAllComponent(), this._parent && this._parent.removeChild(this), 
            this._children && (t ? this.destroyChildren() : this.removeChildren()), this.onDestroy(), 
            this._children = null, this.offAll();
        }, n.onDestroy = function() {}, n.destroyChildren = function() {
            if (this._children) for (var t = 0, e = this._children.length; e > t; t++) this._children[0].destroy(!0);
        }, n.addChild = function(t) {
            if (!t || this.destroyed || t === this) return t;
            if (t._zOrder && this._setBit(32, !0), t._parent === this) {
                var i = this.getChildIndex(t);
                i !== this._children.length - 1 && (this._children.splice(i, 1), this._children.push(t), 
                this._childChanged());
            } else t._parent && t._parent.removeChild(t), this._children === e.ARRAY_EMPTY && (this._children = []), 
            this._children.push(t), t._setParent(this), this._childChanged();
            return t;
        }, n.addInputChild = function(t) {
            if (this._extUIChild == e.ARRAY_EMPTY) this._extUIChild = [ t ]; else {
                if (this._extUIChild.indexOf(t) >= 0) return null;
                this._extUIChild.push(t);
            }
            return null;
        }, n.removeInputChild = function(t) {
            var e = this._extUIChild.indexOf(t);
            e >= 0 && this._extUIChild.splice(e, 1);
        }, n.addChildren = function(t) {
            for (var e = arguments, i = 0, n = e.length; n > i; ) this.addChild(e[i++]);
        }, n.addChildAt = function(t, i) {
            if (!t || this.destroyed || t === this) return t;
            if (t._zOrder && this._setBit(32, !0), i >= 0 && i <= this._children.length) {
                if (t._parent === this) {
                    var n = this.getChildIndex(t);
                    this._children.splice(n, 1), this._children.splice(i, 0, t), this._childChanged();
                } else t._parent && t._parent.removeChild(t), this._children === e.ARRAY_EMPTY && (this._children = []), 
                this._children.splice(i, 0, t), t._setParent(this);
                return t;
            }
            throw new Error("appendChildAt:The index is out of bounds");
        }, n.getChildIndex = function(t) {
            return this._children.indexOf(t);
        }, n.getChildByName = function(t) {
            var e = this._children;
            if (e) for (var i = 0, n = e.length; n > i; i++) {
                var r = e[i];
                if (r.name === t) return r;
            }
            return null;
        }, n.getChildAt = function(t) {
            return this._children[t] || null;
        }, n.setChildIndex = function(t, e) {
            var i = this._children;
            if (0 > e || e >= i.length) throw new Error("setChildIndex:The index is out of bounds.");
            var n = this.getChildIndex(t);
            if (0 > n) throw new Error("setChildIndex:node is must child of this object.");
            return i.splice(n, 1), i.splice(e, 0, t), this._childChanged(), t;
        }, n._childChanged = function(t) {}, n.removeChild = function(t) {
            if (!this._children) return t;
            var e = this._children.indexOf(t);
            return this.removeChildAt(e);
        }, n.removeSelf = function() {
            return this._parent && this._parent.removeChild(this), this;
        }, n.removeChildByName = function(t) {
            var e = this.getChildByName(t);
            return e && this.removeChild(e), e;
        }, n.removeChildAt = function(t) {
            var e = this.getChildAt(t);
            return e && (this._children.splice(t, 1), e._setParent(null)), e;
        }, n.removeChildren = function(t, i) {
            if (void 0 === t && (t = 0), void 0 === i && (i = 2147483647), this._children && this._children.length > 0) {
                var n = this._children;
                if (0 === t && i >= n.length - 1) {
                    var r = n;
                    this._children = e.ARRAY_EMPTY;
                } else r = n.splice(t, i - t);
                for (var s = 0, a = r.length; a > s; s++) r[s]._setParent(null);
            }
            return this;
        }, n.replaceChild = function(t, e) {
            var i = this._children.indexOf(e);
            return i > -1 ? (this._children.splice(i, 1, t), e._setParent(null), t._setParent(this), 
            t) : null;
        }, n._setParent = function(t) {
            this._parent !== t && (t ? (this._parent = t, this._onAdded(), this.event("added"), 
            this._getBit(16) && (this._setUpNoticeChain(), t.displayedInStage && this._displayChild(this, !0)), 
            t._childChanged(this)) : (this._onRemoved(), this.event("removed"), this._parent._childChanged(), 
            this._getBit(16) && this._displayChild(this, !1), this._parent = t));
        }, n._updateDisplayedInstage = function() {
            var t;
            t = this;
            for (var e = i.stage, n = !1; t; ) {
                if (t._getBit(16)) {
                    n = t._getBit(128);
                    break;
                }
                if (t === e || t._getBit(128)) {
                    n = !0;
                    break;
                }
                t = t._parent;
            }
            this._setBit(128, n);
        }, n._setDisplay = function(t) {
            this._getBit(128) !== t && (this._setBit(128, t), t ? this.event("display") : this.event("undisplay"));
        }, n._displayChild = function(t, e) {
            var i = t._children;
            if (i) for (var n = 0, r = i.length; r > n; n++) {
                var s = i[n];
                s._getBit(16) && (s._children.length > 0 ? this._displayChild(s, e) : s._setDisplay(e));
            }
            t._setDisplay(e);
        }, n.contains = function(t) {
            if (t === this) return !0;
            for (;t; ) {
                if (t._parent === this) return !0;
                t = t._parent;
            }
            return !1;
        }, n.timerLoop = function(t, e, n, r, s, a) {
            void 0 === s && (s = !0), void 0 === a && (a = !1);
            var o = this.scene ? this.scene.timer : i.timer;
            o.loop(t, e, n, r, s, a);
        }, n.timerOnce = function(t, e, n, r, s) {
            void 0 === s && (s = !0);
            var a = this.scene ? this.scene.timer : i.timer;
            a._create(!1, !1, t, e, n, r, s);
        }, n.frameLoop = function(t, e, n, r, s) {
            void 0 === s && (s = !0);
            var a = this.scene ? this.scene.timer : i.timer;
            a._create(!0, !0, t, e, n, r, s);
        }, n.frameOnce = function(t, e, n, r, s) {
            void 0 === s && (s = !0);
            var a = this.scene ? this.scene.timer : i.timer;
            a._create(!0, !1, t, e, n, r, s);
        }, n.clearTimer = function(t, e) {
            var n = this.scene ? this.scene.timer : i.timer;
            n.clear(t, e);
        }, n.callLater = function(t, e) {
            var n = this.scene ? this.scene.timer : i.timer;
            n.callLater(this, t, e);
        }, n.runCallLater = function(t) {
            var e = this.scene ? this.scene.timer : i.timer;
            e.runCallLater(this, t);
        }, n._onActive = function() {
            A.spriteCount++;
        }, n._onInActive = function() {
            A.spriteCount--;
        }, n._onActiveInScene = function() {}, n._onInActiveInScene = function() {}, n._parse = function(t, e) {}, 
        n._setBelongScene = function(t) {
            if (!this._scene) {
                if (this._scene = t, this._components) for (var e = 0, i = this._components.length; i > e; e++) this._components[e]._setActiveInScene(!0);
                for (this._onActiveInScene(), e = 0, i = this._children.length; i > e; e++) this._children[e]._setBelongScene(t);
            }
        }, n._setUnBelongScene = function() {
            if (this._scene !== this) {
                if (this._onInActiveInScene(), this._components) for (var t = 0, e = this._components.length; e > t; t++) this._components[t]._setActiveInScene(!1);
                for (this._scene = null, t = 0, e = this._children.length; e > t; t++) this._children[t]._setUnBelongScene();
            }
        }, n.onAwake = function() {}, n.onEnable = function() {}, n._processActive = function() {
            this._activeChangeScripts || (this._activeChangeScripts = []), this._activeHierarchy(this._activeChangeScripts), 
            this._activeScripts();
        }, n._activeHierarchy = function(t) {
            if (this._setBit(2, !0), this._components) for (var e = 0, i = this._components.length; i > e; e++) {
                var n = this._components[e];
                n._setActive(!0), n._isScript() && n._enabled && t.push(n);
            }
            for (this._onActive(), e = 0, i = this._children.length; i > e; e++) {
                var r = this._children[e];
                !r._getBit(1) && r._activeHierarchy(t);
            }
            this._getBit(4) || (this._setBit(4, !0), this.onAwake()), this.onEnable();
        }, n._activeScripts = function() {
            for (var t = 0, e = this._activeChangeScripts.length; e > t; t++) this._activeChangeScripts[t].onEnable();
            this._activeChangeScripts.length = 0;
        }, n._processInActive = function() {
            this._activeChangeScripts || (this._activeChangeScripts = []), this._inActiveHierarchy(this._activeChangeScripts), 
            this._inActiveScripts();
        }, n._inActiveHierarchy = function(t) {
            if (this._onInActive(), this._components) for (var e = 0, i = this._components.length; i > e; e++) {
                var n = this._components[e];
                n._setActive(!1), n._isScript() && n._enabled && t.push(n);
            }
            for (this._setBit(2, !1), e = 0, i = this._children.length; i > e; e++) {
                var r = this._children[e];
                r && !r._getBit(1) && r._inActiveHierarchy(t);
            }
            this.onDisable();
        }, n._inActiveScripts = function() {
            for (var t = 0, e = this._activeChangeScripts.length; e > t; t++) this._activeChangeScripts[t].onDisable();
            this._activeChangeScripts.length = 0;
        }, n.onDisable = function() {}, n._onAdded = function() {
            if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length) throw "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event.";
            var t = this._parent.scene;
            t && this._setBelongScene(t), this._parent.activeInHierarchy && this.active && this._processActive();
        }, n._onRemoved = function() {
            if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length) throw "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
            this._parent.activeInHierarchy && this.active && this._processInActive(), this._parent.scene && this._setUnBelongScene();
        }, n._addComponentInstance = function(t) {
            this._components = this._components || [], this._components.push(t), t.owner = this, 
            t._onAdded(), this.activeInHierarchy && (t._setActive(!0), t._isScript() && t._enabled && t.onEnable()), 
            this._scene && t._setActiveInScene(!0);
        }, n._destroyComponent = function(t) {
            if (this._components) for (var e = 0, i = this._components.length; i > e; e++) {
                var n = this._components[e];
                if (n === t) {
                    n._destroy(), this._components.splice(e, 1);
                    break;
                }
            }
        }, n._destroyAllComponent = function() {
            if (this._components) {
                for (var t = 0, e = this._components.length; e > t; t++) {
                    var i = this._components[t];
                    i._destroy();
                }
                this._components.length = 0;
            }
        }, n._cloneTo = function(t, e, i) {
            var n = t;
            if (this._components) for (var r = 0, s = this._components.length; s > r; r++) {
                var a = n.addComponent(this._components[r].constructor);
                this._components[r]._cloneTo(a);
            }
        }, n.addComponentIntance = function(t) {
            if (t.owner) throw "Node:the component has belong to other node.";
            if (t.isSingleton && this.getComponent(t.constructor)) throw "Node:the component is singleton,can't add the second one.";
            return this._addComponentInstance(t), t;
        }, n.addComponent = function(t) {
            var e = U.createByClass(t);
            if (e._destroyed = !1, e.isSingleton && this.getComponent(t)) throw "无法实例" + t + "组件，" + t + "组件已存在！";
            return this._addComponentInstance(e), e;
        }, n.getComponent = function(t) {
            if (this._components) for (var e = 0, n = this._components.length; n > e; e++) {
                var r = this._components[e];
                if (i.__typeof(r, t)) return r;
            }
            return null;
        }, n.getComponents = function(t) {
            var e;
            if (this._components) for (var n = 0, r = this._components.length; r > n; n++) {
                var s = this._components[n];
                i.__typeof(s, t) && (e = e || [], e.push(s));
            }
            return e;
        }, s(0, n, "numChildren", function() {
            return this._children.length;
        }), s(0, n, "parent", function() {
            return this._parent;
        }), s(0, n, "activeInHierarchy", function() {
            return this._getBit(2);
        }), s(0, n, "active", function() {
            return !this._getBit(8) && !this._getBit(1);
        }, function(t) {
            if (t = !!t, !this._getBit(1) !== t) {
                if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length) throw t ? "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event." : "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
                this._setBit(1, !t), this._parent && this._parent.activeInHierarchy && (t ? this._processActive() : this._processInActive());
            }
        }), s(0, n, "displayedInStage", function() {
            return this._getBit(16) ? this._getBit(128) : (this._setBitUp(16), this._getBit(128));
        }), s(0, n, "scene", function() {
            return this._scene;
        }), s(0, n, "timer", function() {
            return this.scene ? this.scene.timer : i.timer;
        }), e.ARRAY_EMPTY = [], e;
    }(m)), Ae = function(t) {
        function e() {
            this.url = null, this.loops = 0, this.startTime = NaN, this.isStopped = !1, this.completeHandler = null, 
            e.__super.call(this);
        }
        r(e, "laya.media.SoundChannel", t);
        var i = e.prototype;
        return i.play = function() {}, i.stop = function() {
            this.completeHandler && this.completeHandler.run();
        }, i.pause = function() {}, i.resume = function() {}, i.__runComplete = function(t) {
            t && t.run();
        }, s(0, i, "volume", function() {
            return 1;
        }, function(t) {}), s(0, i, "position", function() {
            return 0;
        }), s(0, i, "duration", function() {
            return 0;
        }), e;
    }(m), Ee = function(t) {
        function e() {
            this._id = 0, this._url = null, this._cpuMemory = 0, this._gpuMemory = 0, this._destroyed = !1, 
            this._referenceCount = 0, this.lock = !1, this.name = null, e.__super.call(this), 
            this._id = ++e._uniqueIDCounter, this._destroyed = !1, this._referenceCount = 0, 
            e._idResourcesMap[this.id] = this, this.lock = !1;
        }
        r(e, "laya.resource.Resource", t);
        var n = e.prototype;
        return i.imps(n, {
            "laya.resource.ICreateResource": !0,
            "laya.resource.IDestroy": !0
        }), n._setCPUMemory = function(t) {
            var i = t - this._cpuMemory;
            this._cpuMemory = t, e._addCPUMemory(i);
        }, n._setGPUMemory = function(t) {
            var i = t - this._gpuMemory;
            this._gpuMemory = t, e._addGPUMemory(i);
        }, n._setCreateURL = function(t) {
            if (t = q.formatURL(t), this._url !== t) {
                var i;
                this._url && (i = e._urlResourcesMap[this._url], i.splice(i.indexOf(this), 1), 0 === i.length && delete e._urlResourcesMap[this._url]), 
                t && (i = e._urlResourcesMap[t], i || (e._urlResourcesMap[t] = i = []), i.push(this)), 
                this._url = t;
            }
        }, n._addReference = function(t) {
            void 0 === t && (t = 1), this._referenceCount += t;
        }, n._removeReference = function(t) {
            void 0 === t && (t = 1), this._referenceCount -= t;
        }, n._clearReference = function() {
            this._referenceCount = 0;
        }, n._recoverResource = function() {}, n._disposeResource = function() {}, n._activeResource = function() {}, 
        n.destroy = function() {
            if (!this._destroyed) {
                this._destroyed = !0, this.lock = !1, this._disposeResource(), delete e._idResourcesMap[this.id];
                var t;
                if (this._url) {
                    t = e._urlResourcesMap[this._url], t && (t.splice(t.indexOf(this), 1), 0 === t.length && delete e._urlResourcesMap[this._url]);
                    var i = De.getRes(this._url);
                    i == this && delete De.loadedMap[this._url];
                }
            }
        }, s(0, n, "id", function() {
            return this._id;
        }), s(0, n, "gpuMemory", function() {
            return this._gpuMemory;
        }), s(0, n, "url", function() {
            return this._url;
        }), s(0, n, "cpuMemory", function() {
            return this._cpuMemory;
        }), s(0, n, "destroyed", function() {
            return this._destroyed;
        }), s(0, n, "referenceCount", function() {
            return this._referenceCount;
        }), s(1, e, "cpuMemory", function() {
            return this._cpuMemory;
        }, laya.events.EventDispatcher._$SET_cpuMemory), s(1, e, "gpuMemory", function() {
            return this._gpuMemory;
        }, laya.events.EventDispatcher._$SET_gpuMemory), e._addCPUMemory = function(t) {
            this._cpuMemory += t;
        }, e._addGPUMemory = function(t) {
            this._gpuMemory += t;
        }, e._addMemory = function(t, e) {
            this._cpuMemory += t, this._gpuMemory += e;
        }, e.getResourceByID = function(t) {
            return e._idResourcesMap[t];
        }, e.getResourceByURL = function(t, i) {
            return void 0 === i && (i = 0), e._urlResourcesMap[t][i];
        }, e.destroyUnusedResources = function() {
            for (var t in e._idResourcesMap) {
                var i = e._idResourcesMap[t];
                i.lock || 0 !== i._referenceCount || i.destroy();
            }
        }, e._uniqueIDCounter = 0, e._idResourcesMap = {}, e._urlResourcesMap = {}, e._cpuMemory = 0, 
        e._gpuMemory = 0, e;
    }(m), Se = function(t) {
        function e() {
            e.__super.call(this, 12, 4, 4), this.canReuse = !0, this.setAttributes(laya.webgl.utils.MeshVG._fixattriInfo);
        }
        r(e, "laya.webgl.utils.MeshVG", t);
        var i = e.prototype;
        return i.addVertAndIBToMesh = function(t, e, i, n) {
            for (var r = this._vb.needSize(e.length / 2 * 12), s = r >> 2, a = this._vb._floatArray32 || this._vb.getFloat32Array(), o = this._vb._uint32Array, h = 0, l = e.length / 2, u = 0; l > u; u++) a[s++] = e[h], 
            a[s++] = e[h + 1], h += 2, o[s++] = i;
            this._vb.setNeedUpload(), this._ib.append(new Uint16Array(n)), this._ib.setNeedUpload(), 
            this.vertNum += l, this.indexNum += n.length;
        }, i.releaseMesh = function() {
            this._vb.setByteLength(0), this._ib.setByteLength(0), this.vertNum = 0, this.indexNum = 0, 
            laya.webgl.utils.MeshVG._POOL.push(this);
        }, i.destroy = function() {
            this._ib.destroy(), this._vb.destroy(), this._ib.disposeResource(), this._vb.deleteBuffer();
        }, e.getAMesh = function(t) {
            var i;
            return i = laya.webgl.utils.MeshVG._POOL.length ? laya.webgl.utils.MeshVG._POOL.pop() : new e(), 
            t && i._vb._resizeBuffer(786432, !1), i;
        }, e.const_stride = 12, e._POOL = [], n(e, [ "_fixattriInfo", function() {
            return this._fixattriInfo = [ 5126, 2, 0, 5121, 4, 8 ];
        } ]), e;
    }(b), Me = function(t) {
        function e() {
            this._labelDic = null, this._tweenDic = {}, this._tweenDataList = [], this._endTweenDataList = null, 
            this._currTime = 0, this._lastTime = 0, this._startTime = 0, this._index = 0, this._gidIndex = 0, 
            this._firstTweenDic = {}, this._startTimeSort = !1, this._endTimeSort = !1, this._loopKey = !1, 
            this.scale = 1, this._frameRate = 60, this._frameIndex = 0, this._total = 0, e.__super.call(this);
        }
        var n;
        r(e, "laya.utils.TimeLine", t);
        var a = e.prototype;
        return a.to = function(t, e, i, n, r) {
            return void 0 === r && (r = 0), this._create(t, e, i, n, r, !0);
        }, a.from = function(t, e, i, n, r) {
            return void 0 === r && (r = 0), this._create(t, e, i, n, r, !1);
        }, a._create = function(t, e, i, r, s, a) {
            var o = U.getItemByClass("tweenData", n);
            return o.isTo = a, o.type = 0, o.target = t, o.duration = i, o.data = e, o.startTime = this._startTime + s, 
            o.endTime = o.startTime + o.duration, o.ease = r, this._startTime = Math.max(o.endTime, this._startTime), 
            this._tweenDataList.push(o), this._startTimeSort = !0, this._endTimeSort = !0, this;
        }, a.addLabel = function(t, e) {
            var i = U.getItemByClass("tweenData", n);
            return i.type = 1, i.data = t, i.endTime = i.startTime = this._startTime + e, this._labelDic || (this._labelDic = {}), 
            this._labelDic[t] = i, this._tweenDataList.push(i), this;
        }, a.removeLabel = function(t) {
            if (this._labelDic && this._labelDic[t]) {
                var e = this._labelDic[t];
                if (e) {
                    var i = this._tweenDataList.indexOf(e);
                    i > -1 && this._tweenDataList.splice(i, 1);
                }
                delete this._labelDic[t];
            }
        }, a.gotoTime = function(t) {
            function e(t, e) {
                return t.endTime > e.endTime ? 1 : t.endTime < e.endTime ? -1 : 0;
            }
            if (null != this._tweenDataList && 0 != this._tweenDataList.length) {
                var i, n;
                for (var r in this._firstTweenDic) if (n = this._firstTweenDic[r]) for (var s in n) n.diyTarget.hasOwnProperty(s) && (n.diyTarget[s] = n[s]);
                for (r in this._tweenDic) i = this._tweenDic[r], i.clear(), delete this._tweenDic[r];
                this._index = 0, this._gidIndex = 0, this._currTime = t, this._lastTime = Dt.now();
                var a;
                null == this._endTweenDataList || this._endTimeSort ? (this._endTimeSort = !1, this._endTweenDataList = a = this._tweenDataList.concat(), 
                a.sort(e)) : a = this._endTweenDataList;
                for (var o, h = 0, l = a.length; l > h; h++) if (o = a[h], 0 == o.type) {
                    if (!(t >= o.endTime)) break;
                    this._index = Math.max(this._index, h + 1);
                    var u = o.data;
                    if (o.isTo) for (var c in u) o.target[c] = u[c];
                }
                for (h = 0, l = this._tweenDataList.length; l > h; h++) o = this._tweenDataList[h], 
                0 == o.type && t >= o.startTime && t < o.endTime && (this._index = Math.max(this._index, h + 1), 
                this._gidIndex++, i = U.getItemByClass("tween", z), i._create(o.target, o.data, o.duration, o.ease, g.create(this, this._animComplete, [ this._gidIndex ]), 0, !1, o.isTo, !0, !1), 
                i.setStartTime(this._currTime - (t - o.startTime)), i._updateEase(this._currTime), 
                i.gid = this._gidIndex, this._tweenDic[this._gidIndex] = i);
            }
        }, a.gotoLabel = function(t) {
            if (null != this._labelDic) {
                var e = this._labelDic[t];
                e && this.gotoTime(e.startTime);
            }
        }, a.pause = function() {
            i.timer.clear(this, this._update);
        }, a.resume = function() {
            this.play(this._currTime, this._loopKey);
        }, a.play = function(t, e) {
            function n(t, e) {
                return t.startTime > e.startTime ? 1 : t.startTime < e.startTime ? -1 : 0;
            }
            if (void 0 === t && (t = 0), void 0 === e && (e = !1), this._tweenDataList) {
                if (this._startTimeSort) {
                    this._startTimeSort = !1, this._tweenDataList.sort(n);
                    for (var r = 0, s = this._tweenDataList.length; s > r; r++) {
                        var a = this._tweenDataList[r];
                        if (null != a && 0 == a.type) {
                            var o = a.target, h = o.$_GID || (o.$_GID = ie.getGID()), l = null;
                            null == this._firstTweenDic[h] ? (l = {}, l.diyTarget = o, this._firstTweenDic[h] = l) : l = this._firstTweenDic[h];
                            for (var u in a.data) null == l[u] && (l[u] = o[u]);
                        }
                    }
                }
                "string" == typeof t ? this.gotoLabel(t) : this.gotoTime(t), this._loopKey = e, 
                this._lastTime = Dt.now(), i.timer.frameLoop(1, this, this._update);
            }
        }, a._update = function() {
            if (this._currTime >= this._startTime) {
                if (!this._loopKey) {
                    for (var t in this._tweenDic) r = this._tweenDic[t], r.complete();
                    return this._complete(), void this.pause();
                }
                if (this._complete(), !this._tweenDataList) return;
                this.gotoTime(0);
            }
            var e = Dt.now(), i = e - this._lastTime, n = this._currTime += i * this.scale;
            this._lastTime = e;
            for (t in this._tweenDic) r = this._tweenDic[t], r._updateEase(n);
            var r;
            if (0 != this._tweenDataList.length && this._index < this._tweenDataList.length) {
                var s = this._tweenDataList[this._index];
                n >= s.startTime && (this._index++, 0 == s.type ? (this._gidIndex++, r = U.getItemByClass("tween", z), 
                r._create(s.target, s.data, s.duration, s.ease, g.create(this, this._animComplete, [ this._gidIndex ]), 0, !1, s.isTo, !0, !1), 
                r.setStartTime(n), r.gid = this._gidIndex, this._tweenDic[this._gidIndex] = r, r._updateEase(n)) : this.event("label", s.data));
            }
        }, a._animComplete = function(t) {
            var e = this._tweenDic[t];
            e && delete this._tweenDic[t];
        }, a._complete = function() {
            this.event("complete");
        }, a.reset = function() {
            var t;
            if (this._labelDic) for (t in this._labelDic) delete this._labelDic[t];
            var e;
            for (t in this._tweenDic) e = this._tweenDic[t], e.clear(), delete this._tweenDic[t];
            for (t in this._firstTweenDic) delete this._firstTweenDic[t];
            if (this._endTweenDataList = null, this._tweenDataList && this._tweenDataList.length) {
                var n = 0, r = 0;
                for (r = this._tweenDataList.length, n = 0; r > n; n++) this._tweenDataList[n] && this._tweenDataList[n].destroy();
            }
            this._tweenDataList.length = 0, this._currTime = 0, this._lastTime = 0, this._startTime = 0, 
            this._index = 0, this._gidIndex = 0, this.scale = 1, i.timer.clear(this, this._update);
        }, a.destroy = function() {
            this.reset(), this._labelDic = null, this._tweenDic = null, this._tweenDataList = null, 
            this._firstTweenDic = null;
        }, s(0, a, "index", function() {
            return this._frameIndex;
        }, function(t) {
            this._frameIndex = t, this.gotoTime(this._frameIndex / this._frameRate * 1e3);
        }), s(0, a, "total", function() {
            return this._total = Math.floor(this._startTime / 1e3 * this._frameRate), this._total;
        }), e.to = function(t, i, n, r, s) {
            return void 0 === s && (s = 0), new e().to(t, i, n, r, s);
        }, e.from = function(t, i, n, r, s) {
            return void 0 === s && (s = 0), new e().from(t, i, n, r, s);
        }, e.__init$ = function() {
            n = function() {
                function t() {
                    this.type = 0, this.isTo = !0, this.startTime = NaN, this.endTime = NaN, this.target = null, 
                    this.duration = NaN, this.ease = null, this.data = null;
                }
                r(t, "");
                var e = t.prototype;
                return e.destroy = function() {
                    this.target = null, this.ease = null, this.data = null, this.isTo = !0, this.type = 0, 
                    U.recover("tweenData", this);
                }, t;
            }();
        }, e;
    }(m), Re = function(t) {
        function e() {
            e.__super.call(this, e.__name2int, e.__int2name, e.__int2nameMap);
        }
        return r(e, "laya.webgl.shader.d2.ShaderDefines2D", t), e.__init__ = function() {
            e.reg("TEXTURE2D", 1), e.reg("PRIMITIVE", 4), e.reg("GLOW_FILTER", 8), e.reg("BLUR_FILTER", 16), 
            e.reg("COLOR_FILTER", 32), e.reg("COLOR_ADD", 64), e.reg("WORLDMAT", 128), e.reg("FILLTEXTURE", 256), 
            e.reg("FSHIGHPRECISION", 1024), e.reg("MVP3D", 2048);
        }, e.reg = function(t, i) {
            D._reg(t, i, e.__name2int, e.__int2name);
        }, e.toText = function(t, e, i) {
            return D._toText(t, e, i);
        }, e.toInt = function(t) {
            return D._toInt(t, e.__name2int);
        }, e.TEXTURE2D = 1, e.PRIMITIVE = 4, e.FILTERGLOW = 8, e.FILTERBLUR = 16, e.FILTERCOLOR = 32, 
        e.COLORADD = 64, e.WORLDMAT = 128, e.FILLTEXTURE = 256, e.SKINMESH = 512, e.SHADERDEFINE_FSHIGHPRECISION = 1024, 
        e.MVP3D = 2048, e.NOOPTMASK = 312, e.__name2int = {}, e.__int2name = [], e.__int2nameMap = [], 
        e;
    }(D), Ie = function(t) {
        function e(t, i, n, r) {
            this.uvrect = [ 0, 0, 1, 1 ], this._destroyed = !1, this._referenceCount = 0, this.$_GID = 0, 
            this.offsetX = 0, this.offsetY = 0, this._w = 0, this._h = 0, this.sourceWidth = 0, 
            this.sourceHeight = 0, this.url = null, this.scaleRate = 1, e.__super.call(this), 
            void 0 === n && (n = 0), void 0 === r && (r = 0), this.setTo(t, i, n, r);
        }
        r(e, "laya.resource.Texture", t);
        var n = e.prototype;
        return n._addReference = function() {
            this._bitmap && this._bitmap._addReference(), this._referenceCount++;
        }, n._removeReference = function() {
            this._bitmap && this._bitmap._removeReference(), this._referenceCount--;
        }, n._getSource = function(t) {
            return this._destroyed || !this._bitmap ? null : (this.recoverBitmap(t), this._bitmap.destroyed ? null : this.bitmap._getSource());
        }, n._onLoaded = function(t, i) {
            if (i) if (i == this) ; else if (i instanceof laya.resource.Texture) {
                var n = i;
                e._create(i, 0, 0, n.width, n.height, 0, 0, n.sourceWidth, n.sourceHeight, this);
            } else this.bitmap = i, this.sourceWidth = this._w = i.width, this.sourceHeight = this._h = i.height; else ;
            t && t.run(), this.event("ready", this);
        }, n.getIsReady = function() {
            return this._destroyed ? !1 : this._bitmap ? !0 : !1;
        }, n.setTo = function(t, i, n, r) {
            void 0 === n && (n = 0), void 0 === r && (r = 0), this.bitmap = t, this.sourceWidth = n, 
            this.sourceHeight = r, t && (this._w = t.width, this._h = t.height, this.sourceWidth = this.sourceWidth || t.width, 
            this.sourceHeight = this.sourceHeight || t.height), this.uv = i || e.DEF_UV;
        }, n.load = function(t, e) {
            this._destroyed || i.loader.load(t, g.create(this, this._onLoaded, [ e ]), null, "htmlimage", 1, !1, null, !0);
        }, n.getTexturePixels = function(t, e, i, n) {
            var r = 0, s = 0, a = 0, o = this.bitmap, h = o.width, l = o.height;
            if (t + i > h && (i -= t + i - h), e + n > l && (n -= e + n - l), 0 >= i || 0 >= n) return null;
            var u = 4 * i, c = null;
            try {
                c = o.getPixels();
            } catch (_) {}
            if (c) {
                if (0 == t && 0 == e && i == h && n == l) return c;
                var d = new Uint8Array(i * n * 4);
                for (u = 4 * h, r = 4 * t, s = (e + n - 1) * u + 4 * t, a = n - 1; a >= 0; a--) d.set(b.slice(s, s + 4 * i), r), 
                r += u, s -= u;
                return d;
            }
            var f = new ut();
            f.size(i, n), f.asBitmap = !0;
            var p = null;
            if (0 != t || 0 != e || i != h || n != l) {
                p = p.concat();
                var m = p[0], g = p[1], v = p[2] - m, y = p[7] - g, x = v / h, T = y / l;
                p = [ m + t * x, g + e * T, m + (t + i) * x, g + e * T, m + (t + i) * x, g + (e + n) * T, m + t * x, g + (e + n) * T ];
            }
            f._drawTextureM(this, 0, 0, i, n, null, 1, p), f._targets.start(), f.flush(), f._targets.end(), 
            f._targets.restore();
            var b = f._targets.getData(0, 0, i, n);
            for (f.destroy(), d = new Uint8Array(i * n * 4), r = 0, s = (n - 1) * u, a = n - 1; a >= 0; a--) d.set(b.slice(s, s + u), r), 
            r += u, s -= u;
            return d;
        }, n.getPixels = function(t, e, i, n) {
            return Mt.isConchApp ? this._nativeObj.getImageData(t, e, i, n) : this.getTexturePixels(t, e, i, n);
        }, n.recoverBitmap = function(t) {
            var e = this, n = this._bitmap.url;
            this._destroyed || this._bitmap && !this._bitmap.destroyed || !n || i.loader.load(n, g.create(this, function(i) {
                e.bitmap = i, t && t();
            }), null, "htmlimage", 1, !1, null, !0);
        }, n.disposeBitmap = function() {
            !this._destroyed && this._bitmap && this._bitmap.destroy();
        }, n.destroy = function(t) {
            if (void 0 === t && (t = !1), !this._destroyed) {
                this._destroyed = !0;
                var e = this._bitmap;
                e && (e._removeReference(this._referenceCount), (0 === e.referenceCount || t) && e.destroy(), 
                e = null), this.url && this === i.loader.getRes(this.url) && i.loader.clearRes(this.url);
            }
        }, s(0, n, "height", function() {
            return this._h ? this._h : this.bitmap ? this.uv && this.uv !== e.DEF_UV ? (this.uv[5] - this.uv[1]) * this.bitmap.height : this.bitmap.height : 0;
        }, function(t) {
            this._h = t, this.sourceHeight || (this.sourceHeight = t);
        }), s(0, n, "uv", function() {
            return this._uv;
        }, function(t) {
            this.uvrect[0] = Math.min(t[0], t[2], t[4], t[6]), this.uvrect[1] = Math.min(t[1], t[3], t[5], t[7]), 
            this.uvrect[2] = Math.max(t[0], t[2], t[4], t[6]) - this.uvrect[0], this.uvrect[3] = Math.max(t[1], t[3], t[5], t[7]) - this.uvrect[1], 
            this._uv = t;
        }), s(0, n, "width", function() {
            return this._w ? this._w : this.bitmap ? this.uv && this.uv !== e.DEF_UV ? (this.uv[2] - this.uv[0]) * this.bitmap.width : this.bitmap.width : 0;
        }, function(t) {
            this._w = t, this.sourceWidth || (this.sourceWidth = t);
        }), s(0, n, "bitmap", function() {
            return this._bitmap;
        }, function(t) {
            this._bitmap && this._bitmap._removeReference(this._referenceCount), this._bitmap = t, 
            t && t._addReference(this._referenceCount);
        }), s(0, n, "destroyed", function() {
            return this._destroyed;
        }), e.moveUV = function(t, e, i) {
            for (var n = 0; 8 > n; n += 2) i[n] += t, i[n + 1] += e;
            return i;
        }, e.create = function(t, i, n, r, s, a, o, h, l) {
            return void 0 === a && (a = 0), void 0 === o && (o = 0), void 0 === h && (h = 0), 
            void 0 === l && (l = 0), e._create(t, i, n, r, s, a, o, h, l);
        }, e._create = function(t, i, n, r, s, a, o, h, l, u) {
            void 0 === a && (a = 0), void 0 === o && (o = 0), void 0 === h && (h = 0), void 0 === l && (l = 0);
            var c = t instanceof laya.resource.Texture, _ = c ? t.uv : e.DEF_UV, d = c ? t.bitmap : t;
            d.width && i + r > d.width && (r = d.width - i), d.height && n + s > d.height && (s = d.height - n);
            var f;
            u ? (f = u, f.setTo(d, null, h || r, l || s)) : f = new e(d, null, h || r, l || s), 
            f.width = r, f.height = s, f.offsetX = a, f.offsetY = o;
            var p = 1 / d.width, m = 1 / d.height;
            i *= p, n *= m, r *= p, s *= m;
            var g = f.uv[0], v = f.uv[1], y = f.uv[4], x = f.uv[5], T = y - g, b = x - v, w = e.moveUV(_[0], _[1], [ i, n, i + r, n, i + r, n + s, i, n + s ]);
            f.uv = new Float32Array([ g + w[0] * T, v + w[1] * b, y - (1 - w[2]) * T, v + w[3] * b, y - (1 - w[4]) * T, x - (1 - w[5]) * b, g + w[6] * T, x - (1 - w[7]) * b ]);
            var C = d.scaleRate;
            return C && 1 != C ? (f.sourceWidth /= C, f.sourceHeight /= C, f.width /= C, f.height /= C, 
            f.scaleRate = C) : f.scaleRate = 1, f;
        }, e.createFromTexture = function(t, i, n, r, s) {
            var a = t.scaleRate;
            1 != a && (i *= a, n *= a, r *= a, s *= a);
            var o = mt.TEMP.setTo(i - t.offsetX, n - t.offsetY, r, s), h = o.intersection(e._rect1.setTo(0, 0, t.width, t.height), e._rect2);
            if (!h) return null;
            var l = e.create(t, h.x, h.y, h.width, h.height, h.x - o.x, h.y - o.y, r, s);
            return l;
        }, e.DEF_UV = new Float32Array([ 0, 0, 1, 0, 1, 1, 0, 1 ]), e.NO_UV = new Float32Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]), 
        e.INV_UV = new Float32Array([ 0, 1, 1, 1, 1, 0, 0, 0 ]), e._rect1 = new mt(), e._rect2 = new mt(), 
        e;
    }(m), Pe = function(t) {
        function e() {
            this._responseType = null, this._data = null, this._url = null, e.__super.call(this), 
            this._http = new Dt.window.XMLHttpRequest();
        }
        r(e, "laya.net.HttpRequest", t);
        var i = e.prototype;
        return i.send = function(t, e, i, n, r) {
            void 0 === i && (i = "get"), void 0 === n && (n = "text"), this._responseType = n, 
            this._data = null, this._url = t;
            var s = this, a = this._http;
            if (t = q.getAdptedFilePath(t), a.open(i, t, !0), r) for (var o = 0; o < r.length; o++) a.setRequestHeader(r[o++], r[o]); else Mt.isConchApp || (e && "string" != typeof e ? a.setRequestHeader("Content-Type", "application/json") : a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"));
            a.responseType = "arraybuffer" !== n ? "text" : "arraybuffer", a.onerror = function(t) {
                s._onError(t);
            }, a.onabort = function(t) {
                s._onAbort(t);
            }, a.onprogress = function(t) {
                s._onProgress(t);
            }, a.onload = function(t) {
                s._onLoad(t);
            }, a.send(e);
        }, i._onProgress = function(t) {
            t && t.lengthComputable && this.event("progress", t.loaded / t.total);
        }, i._onAbort = function(t) {
            this.error("Request was aborted by user");
        }, i._onError = function(t) {
            this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText);
        }, i._onLoad = function(t) {
            var e = this._http, i = void 0 !== e.status ? e.status : 200;
            200 === i || 204 === i || 0 === i ? this.complete() : this.error("[" + e.status + "]" + e.statusText + ":" + e.responseURL);
        }, i.error = function(t) {
            this.clear(), console.warn(this.url, t), this.event("error", t);
        }, i.complete = function() {
            this.clear();
            var t = !0;
            try {
                "json" === this._responseType ? this._data = JSON.parse(this._http.responseText) : "xml" === this._responseType ? this._data = ie.parseXMLFromString(this._http.responseText) : this._data = this._http.response || this._http.responseText;
            } catch (e) {
                t = !1, this.error(e.message);
            }
            t && this.event("complete", this._data instanceof Array ? [ this._data ] : this._data);
        }, i.clear = function() {
            var t = this._http;
            t.onerror = t.onabort = t.onprogress = t.onload = null;
        }, s(0, i, "url", function() {
            return this._url;
        }), s(0, i, "http", function() {
            return this._http;
        }), s(0, i, "data", function() {
            return this._data;
        }), e;
    }(m), De = function(t) {
        function e() {
            this._data = null, this._url = null, this._type = null, this._cache = !1, this._http = null, 
            this._useWorkerLoader = !1, this._customParse = !1, this._constructParams = null, 
            this._propertyParams = null, this._createCache = !1, e.__super.call(this);
        }
        r(e, "laya.net.Loader", t);
        var n = e.prototype;
        return n.load = function(t, i, n, r, s, a) {
            if (void 0 === n && (n = !0), void 0 === s && (s = !1), void 0 === a && (a = !1), 
            !t) return void this.onLoaded(null);
            if (e.setGroup(t, "666"), this._url = t, 0 === t.indexOf("data:image") ? i = "image" : t = q.formatURL(t), 
            this._type = i || (i = e.getTypeFromUrl(this._url)), this._cache = n, this._useWorkerLoader = a, 
            this._data = null, a && Ve.enableWorkerLoader(), !s && e.loadedMap[t]) return this._data = e.loadedMap[t], 
            this.event("progress", 1), void this.event("complete", this._data);
            if (r && e.setGroup(t, r), null != e.parserMap[i]) return this._customParse = !0, 
            void (e.parserMap[i] instanceof laya.utils.Handler ? e.parserMap[i].runWith(this) : e.parserMap[i].call(null, this));
            if ("image" === i || "htmlimage" === i || "nativeimage" === i) return this._loadImage(t);
            if ("sound" === i) return this._loadSound(t);
            if ("ttf" === i) return this._loadTTF(t);
            var o;
            switch (i) {
              case "atlas":
              case "prefab":
              case "plf":
                o = "json";
                break;

              case "font":
                o = "xml";
                break;

              case "plfb":
                o = "arraybuffer";
                break;

              default:
                o = i;
            }
            e.preLoadedMap[t] ? this.onLoaded(e.preLoadedMap[t]) : (this._http || (this._http = new Pe(), 
            this._http.on("progress", this, this.onProgress), this._http.on("error", this, this.onError), 
            this._http.on("complete", this, this.onLoaded)), this._http.send(t, null, "get", o));
        }, n._loadTTF = function(t) {
            t = q.formatURL(t);
            var e = new N();
            e.complete = g.create(this, this.onLoaded), e.load(t);
        }, n._loadImage = function(t) {
            function i() {
                var i = n;
                i && (i.onload = null, i.onerror = null, delete e._imgCache[t]);
            }
            t = q.formatURL(t);
            var n, r = this, s = function() {
                i(), r.event("error", "Load image failed");
            };
            if ("nativeimage" === this._type) {
                var a = function() {
                    i(), r.onLoaded(n);
                };
                n = new Dt.window.Image(), n.crossOrigin = "", n.onload = a, n.onerror = s, n.src = t, 
                e._imgCache[t] = n;
            } else {
                var o = ie.getFileExtension(t);
                if ("ktx" === o || "pvr" === o) {
                    a = function(e) {
                        var s = 0;
                        switch (o) {
                          case "ktx":
                            s = 5;
                            break;

                          case "pvr":
                            s = 12;
                        }
                        n = new _i(0, 0, s, !1, !1), n.wrapModeU = 1, n.wrapModeV = 1, n.setCompressData(e), 
                        n._setCreateURL(t), i(), r.onLoaded(n);
                    };
                    var h;
                    h = new Pe(), h.on("error", null, s), h.on("complete", null, a), h.send(t, null, "get", "arraybuffer");
                } else {
                    var l = new Dt.window.Image();
                    a = function() {
                        var e = new _i(l.width, l.height, 1, !1, !1);
                        e.wrapModeU = 1, e.wrapModeV = 1, e.loadImageSource(l, !0), e._setCreateURL(t), 
                        i(), r.onLoaded(e);
                    }, l.crossOrigin = "", l.onload = a, l.onerror = s, l.src = t, e._imgCache[t] = l;
                }
            }
        }, n._loadSound = function(t) {
            function e() {
                n(), s.onLoaded(r);
            }
            function i() {
                n(), r.dispose(), s.event("error", "Load sound failed");
            }
            function n() {
                r.offAll();
            }
            var r = new ye._soundClass(), s = this;
            r.on("complete", this, e), r.on("error", this, i), r.load(t);
        }, n.onProgress = function(t) {
            "atlas" === this._type ? this.event("progress", .3 * t) : this.event("progress", t);
        }, n.onError = function(t) {
            this.event("error", t);
        }, n.onLoaded = function(t) {
            var i = this._type;
            if ("plfb" == i) this.parsePLFBData(t), this.complete(t); else if ("plf" == i) this.parsePLFData(t), 
            this.complete(t); else if ("image" === i) {
                var n = new Ie(t);
                n.url = this._url, this.complete(n);
            } else if ("sound" === i || "htmlimage" === i || "nativeimage" === i) this.complete(t); else if ("atlas" === i) {
                if (!t.url && !t._setContext) {
                    if (!this._data) {
                        if (this._data = t, t.meta && t.meta.image) {
                            var r, s = t.meta.image.split(","), a = this._url.indexOf("/") >= 0 ? "/" : "\\", o = this._url.lastIndexOf(a), h = o >= 0 ? this._url.substr(0, o + 1) : "";
                            Dt.onAndroid && t.meta.compressTextureAndroid && (r = ".ktx"), Dt.onIOS && t.meta.compressTextureIOS && (r = ".pvr");
                            for (var l = 0, u = s.length; u > l; l++) r ? s[l] = h + s[l].replace(".png", r) : s[l] = h + s[l];
                        } else s = [ this._url.replace(".json", ".png") ];
                        s.reverse(), t.toLoads = s, t.pics = [];
                    }
                    return this.event("progress", .3 + 1 / s.length * .6), this._loadImage(s.pop());
                }
                if (this._data.pics.push(t), this._data.toLoads.length > 0) return this.event("progress", .3 + 1 / this._data.toLoads.length * .6), 
                this._loadImage(this._data.toLoads.pop());
                var c = this._data.frames, _ = this._url.split("?")[0], d = this._data.meta && this._data.meta.prefix ? this._data.meta.prefix : _.substring(0, _.lastIndexOf(".")) + "/", f = this._data.pics, p = q.formatURL(this._url), m = e.atlasMap[p] || (e.atlasMap[p] = []);
                m.dir = d;
                var g = 1;
                if (this._data.meta && this._data.meta.scale && 1 != this._data.meta.scale) {
                    g = parseFloat(this._data.meta.scale);
                    for (var v in c) {
                        var y = c[v], x = f[y.frame.idx ? y.frame.idx : 0], T = q.formatURL(d + v);
                        x.scaleRate = g;
                        var b;
                        b = Ie._create(x, y.frame.x, y.frame.y, y.frame.w, y.frame.h, y.spriteSourceSize.x, y.spriteSourceSize.y, y.sourceSize.w, y.sourceSize.h, laya.net.Loader.getRes(T)), 
                        e.cacheRes(T, b), b.url = T, m.push(T);
                    }
                } else for (v in c) y = c[v], x = f[y.frame.idx ? y.frame.idx : 0], T = q.formatURL(d + v), 
                b = Ie._create(x, y.frame.x, y.frame.y, y.frame.w, y.frame.h, y.spriteSourceSize.x, y.spriteSourceSize.y, y.sourceSize.w, y.sourceSize.h, laya.net.Loader.getRes(T)), 
                e.cacheRes(T, b), b.url = T, m.push(T);
                delete this._data.pics, this.complete(this._data);
            } else if ("font" === i) {
                if (!t._source) return this._data = t, this.event("progress", .5), this._loadImage(this._url.replace(".fnt", ".png"));
                var w = new L();
                w.parseFont(this._data, new Ie(t));
                var C = this._url.split(".fnt")[0].split("/"), A = C[C.length - 1];
                ei.registerBitmapFont(A, w), this._data = w, this.complete(this._data);
            } else if ("prefab" === i) {
                var E = new me();
                E.json = t, this.complete(E);
            } else this.complete(t);
        }, n.parsePLFData = function(t) {
            var i, n, r;
            for (i in t) switch (r = t[i], i) {
              case "json":
              case "text":
                for (n in r) e.preLoadedMap[q.formatURL(n)] = r[n];
                break;

              default:
                for (n in r) e.preLoadedMap[q.formatURL(n)] = r[n];
            }
        }, n.parsePLFBData = function(t) {
            var e;
            e = new Kt(t);
            var i = 0, n = 0;
            for (n = e.getInt32(), i = 0; n > i; i++) this.parseOnePLFBFile(e);
        }, n.parseOnePLFBFile = function(t) {
            var i, n, r = 0;
            i = t.getUTFString(), r = t.getInt32(), n = t.readArrayBuffer(r), e.preLoadedMap[q.formatURL(i)] = n;
        }, n.complete = function(t) {
            this._data = t, this._customParse ? this.event("loaded", t instanceof Array ? [ t ] : t) : (e._loaders.push(this), 
            e._isWorking || e.checkNext());
        }, n.endLoad = function(t) {
            t && (this._data = t), this._cache && e.cacheRes(this._url, this._data), this.event("progress", 1), 
            this.event("complete", this.data instanceof Array ? [ this.data ] : this.data);
        }, s(0, n, "url", function() {
            return this._url;
        }), s(0, n, "data", function() {
            return this._data;
        }), s(0, n, "cache", function() {
            return this._cache;
        }), s(0, n, "type", function() {
            return this._type;
        }), e.getTypeFromUrl = function(t) {
            var i = ie.getFileExtension(t);
            return i ? e.typeMap[i] : (console.warn("Not recognize the resources suffix", t), 
            "text");
        }, e.checkNext = function() {
            e._isWorking = !0;
            for (var t = Dt.now(), n = t; e._startIndex < e._loaders.length; ) if (n = Dt.now(), 
            e._loaders[e._startIndex].endLoad(), e._startIndex++, Dt.now() - t > e.maxTimeOut) return console.warn("loader callback cost a long time:" + (Dt.now() - t) + " url=" + e._loaders[e._startIndex - 1].url), 
            void i.systemTimer.frameOnce(1, null, e.checkNext);
            e._loaders.length = 0, e._startIndex = 0, e._isWorking = !1;
        }, e.clearRes = function(t) {
            t = q.formatURL(t);
            var i = e.getAtlas(t);
            if (i) {
                for (var n = 0, r = i.length; r > n; n++) {
                    var s = i[n], a = e.getRes(s);
                    delete e.loadedMap[s], a && a.destroy();
                }
                i.length = 0, delete e.atlasMap[t], delete e.loadedMap[t];
            } else {
                var o = e.loadedMap[t];
                o && (delete e.loadedMap[t], o instanceof laya.resource.Texture && o.bitmap && o.destroy());
            }
        }, e.clearTextureRes = function(t) {
            t = q.formatURL(t);
            var e = laya.net.Loader.getAtlas(t), i = e && e.length > 0 ? laya.net.Loader.getRes(e[0]) : laya.net.Loader.getRes(t);
            i instanceof laya.resource.Texture && i.disposeBitmap();
        }, e.getRes = function(t) {
            return e.loadedMap[q.formatURL(t)];
        }, e.getAtlas = function(t) {
            return e.atlasMap[q.formatURL(t)];
        }, e.cacheRes = function(t, i) {
            t = q.formatURL(t), null != e.loadedMap[t] ? console.warn("Resources already exist,is repeated loading:", t) : e.loadedMap[t] = i;
        }, e.setGroup = function(t, i) {
            e.groupMap[i] || (e.groupMap[i] = []), e.groupMap[i].push(t);
        }, e.clearResByGroup = function(t) {
            if (e.groupMap[t]) {
                var i = e.groupMap[t], n = 0, r = i.length;
                for (n = 0; r > n; n++) e.clearRes(i[n]);
                i.length = 0;
            }
        }, e.TEXT = "text", e.JSON = "json", e.PREFAB = "prefab", e.XML = "xml", e.BUFFER = "arraybuffer", 
        e.IMAGE = "image", e.SOUND = "sound", e.ATLAS = "atlas", e.FONT = "font", e.TTF = "ttf", 
        e.PLF = "plf", e.PLFB = "plfb", e.HIERARCHY = "HIERARCHY", e.MESH = "MESH", e.MATERIAL = "MATERIAL", 
        e.TEXTURE2D = "TEXTURE2D", e.TEXTURECUBE = "TEXTURECUBE", e.ANIMATIONCLIP = "ANIMATIONCLIP", 
        e.AVATAR = "AVATAR", e.TERRAINHEIGHTDATA = "TERRAINHEIGHTDATA", e.TERRAINRES = "TERRAIN", 
        e.typeMap = {
            ttf: "ttf",
            png: "image",
            jpg: "image",
            jpeg: "image",
            ktx: "image",
            pvr: "image",
            txt: "text",
            json: "json",
            prefab: "prefab",
            xml: "xml",
            als: "atlas",
            atlas: "atlas",
            mp3: "sound",
            ogg: "sound",
            wav: "sound",
            part: "json",
            fnt: "font",
            plf: "plf",
            plfb: "plfb",
            scene: "json",
            ani: "json",
            sk: "arraybuffer"
        }, e.parserMap = {}, e.maxTimeOut = 100, e.groupMap = {}, e.loadedMap = {}, e.atlasMap = {}, 
        e.preLoadedMap = {}, e._imgCache = {}, e._loaders = [], e._isWorking = !1, e._startIndex = 0, 
        e;
    }(m), Le = (function(t) {
        function e(t) {
            this.strength = NaN, this.strength_sig2_2sig2_gauss1 = [], this.strength_sig2_native = null, 
            this.renderFunc = null, e.__super.call(this), void 0 === t && (t = 4), this.strength = t, 
            this._glRender = new ct();
        }
        r(e, "laya.filters.BlurFilter", t);
        var i = e.prototype;
        return i.getStrenth_sig2_2sig2_native = function() {
            this.strength_sig2_native || (this.strength_sig2_native = new Float32Array(4));
            var t = this.strength / 3, e = t * t;
            return this.strength_sig2_native[0] = this.strength, this.strength_sig2_native[1] = e, 
            this.strength_sig2_native[2] = 2 * e, this.strength_sig2_native[3] = 1 / (2 * Math.PI * e), 
            this.strength_sig2_native;
        }, s(0, i, "type", function() {
            return 16;
        }), e;
    }(c), function(t) {
        function e() {
            this._maxsize = 0, this._upload = !0, this._uploadSize = 0, this._bufferSize = 0, 
            this._u8Array = null, e.__super.call(this);
        }
        r(e, "laya.webgl.utils.Buffer2D", t);
        var i = e.prototype;
        return i.setByteLength = function(t) {
            this._byteLength !== t && (t <= this._bufferSize || this._resizeBuffer(2 * t + 256, !0), 
            this._byteLength = t);
        }, i.needSize = function(t) {
            var e = this._byteLength;
            if (t) {
                var i = this._byteLength + t;
                i <= this._bufferSize || this._resizeBuffer(i << 1, !0), this._byteLength = i;
            }
            return e;
        }, i._bufferData = function() {
            this._maxsize = Math.max(this._maxsize, this._byteLength), A.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this._buffer = this._buffer.slice(0, this._maxsize + 64), 
            this._bufferSize = this._buffer.byteLength, this._checkArrayUse()), this._maxsize = this._byteLength), 
            this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength, 
            Pt.instance.bufferData(this._bufferType, this._uploadSize, this._bufferUsage)), 
            Pt.instance.bufferSubData(this._bufferType, 0, new Uint8Array(this._buffer, 0, this._byteLength));
        }, i._bufferSubData = function(t, e, i) {
            if (void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this._maxsize = Math.max(this._maxsize, this._byteLength), 
            A.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this._buffer = this._buffer.slice(0, this._maxsize + 64), 
            this._bufferSize = this._buffer.byteLength, this._checkArrayUse()), this._maxsize = this._byteLength), 
            this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength, 
            Pt.instance.bufferData(this._bufferType, this._uploadSize, this._bufferUsage)), 
            e || i) {
                var n = this._buffer.slice(e, i);
                Pt.instance.bufferSubData(this._bufferType, t, n);
            } else Pt.instance.bufferSubData(this._bufferType, t, this._buffer);
        }, i._checkArrayUse = function() {}, i._bind_uploadForVAO = function() {
            return this._upload ? (this._upload = !1, this._bindForVAO(), this._bufferData(), 
            !0) : !1;
        }, i._bind_upload = function() {
            return this._upload ? (this._upload = !1, this.bind(), this._bufferData(), !0) : !1;
        }, i._bind_subUpload = function(t, e, i) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), 
            this._upload ? (this._upload = !1, this.bind(), this._bufferSubData(t, e, i), !0) : !1;
        }, i._resizeBuffer = function(t, e) {
            var i = this._buffer;
            if (t <= i.byteLength) return this;
            var n = this._u8Array;
            if (e && i && i.byteLength > 0) {
                var r = new ArrayBuffer(t), s = n && n.buffer == i ? n : new Uint8Array(i);
                n = this._u8Array = new Uint8Array(r), n.set(s, 0), i = this._buffer = r;
            } else i = this._buffer = new ArrayBuffer(t), this._u8Array = null;
            return this._checkArrayUse(), this._upload = !0, this._bufferSize = i.byteLength, 
            this;
        }, i.append = function(t) {
            this._upload = !0;
            var e, i = 0;
            i = t.byteLength, t instanceof Uint8Array ? (this._resizeBuffer(this._byteLength + i, !0), 
            e = new Uint8Array(this._buffer, this._byteLength)) : t instanceof Uint16Array ? (this._resizeBuffer(this._byteLength + i, !0), 
            e = new Uint16Array(this._buffer, this._byteLength)) : t instanceof Float32Array && (this._resizeBuffer(this._byteLength + i, !0), 
            e = new Float32Array(this._buffer, this._byteLength)), e.set(t, 0), this._byteLength += i, 
            this._checkArrayUse();
        }, i.appendU16Array = function(t, e) {
            this._resizeBuffer(this._byteLength + 2 * e, !0);
            var i = new Uint16Array(this._buffer, this._byteLength, e);
            if (6 == e) i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = t[3], i[4] = t[4], i[5] = t[5]; else if (e >= 100) i.set(new Uint16Array(t.buffer, 0, e)); else for (var n = 0; e > n; n++) i[n] = t[n];
            this._byteLength += 2 * e, this._checkArrayUse();
        }, i.appendEx = function(t, e) {
            this._upload = !0;
            var i, n = 0;
            n = t.byteLength, this._resizeBuffer(this._byteLength + n, !0), i = new e(this._buffer, this._byteLength), 
            i.set(t, 0), this._byteLength += n, this._checkArrayUse();
        }, i.appendEx2 = function(t, e, i, n) {
            void 0 === n && (n = 1), this._upload = !0;
            var r, s = 0;
            s = i * n, this._resizeBuffer(this._byteLength + s, !0), r = new e(this._buffer, this._byteLength);
            var a = 0;
            for (a = 0; i > a; a++) r[a] = t[a];
            this._byteLength += s, this._checkArrayUse();
        }, i.getBuffer = function() {
            return this._buffer;
        }, i.setNeedUpload = function() {
            this._upload = !0;
        }, i.getNeedUpload = function() {
            return this._upload;
        }, i.upload = function() {
            var t = this._bind_upload();
            return Pt.instance.bindBuffer(this._bufferType, null), 34962 == this._bufferType && (V._bindedVertexBuffer = null), 
            34963 == this._bufferType && (V._bindedIndexBuffer = null), Ke.activeShader = null, 
            t;
        }, i.subUpload = function(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0);
            var n = this._bind_subUpload();
            return Pt.instance.bindBuffer(this._bufferType, null), 34962 == this._bufferType && (V._bindedVertexBuffer = null), 
            34963 == this._bufferType && (V._bindedIndexBuffer = null), Ke.activeShader = null, 
            n;
        }, i._disposeResource = function() {
            this._upload = !0, this._uploadSize = 0;
        }, i.clear = function() {
            this._byteLength = 0, this._upload = !0;
        }, s(0, i, "bufferLength", function() {
            return this._buffer.byteLength;
        }), s(0, i, "byteLength", null, function(t) {
            this.setByteLength(t);
        }), e.__int__ = function(t) {}, e.FLOAT32 = 4, e.SHORT = 2, e;
    }(V)), Be = (function(t) {
        function e(t, i, n, r) {
            this._sv_blurInfo2 = [ 0, 0, 1, 0 ], this._color = null, this._color_native = null, 
            this._blurInof1_native = null, this._blurInof2_native = null, e.__super.call(this), 
            this._elements = new Float32Array(9), this._sv_blurInfo1 = new Array(4), void 0 === i && (i = 4), 
            void 0 === n && (n = 6), void 0 === r && (r = 6), this._color = new o(t), this.blur = Math.min(i, 20), 
            this.offX = n, this.offY = r, this._sv_blurInfo1[0] = this._sv_blurInfo1[1] = this.blur, 
            this._sv_blurInfo1[2] = n, this._sv_blurInfo1[3] = -r, this._glRender = new le();
        }
        r(e, "laya.filters.GlowFilter", t);
        var i = e.prototype;
        return i.getColor = function() {
            return this._color.arrColor;
        }, i.getColorNative = function() {
            this._color_native || (this._color_native = new Float32Array(4));
            var t = this.getColor();
            return this._color_native[0] = t[0], this._color_native[1] = t[1], this._color_native[2] = t[2], 
            this._color_native[3] = t[3], this._color_native;
        }, i.getBlurInfo1Native = function() {
            return this._blurInof1_native || (this._blurInof1_native = new Float32Array(4)), 
            this._blurInof1_native[0] = this._blurInof1_native[1] = this.blur, this._blurInof1_native[2] = this.offX, 
            this._blurInof1_native[3] = this.offY, this._blurInof1_native;
        }, i.getBlurInfo2Native = function() {
            return this._blurInof2_native || (this._blurInof2_native = new Float32Array(4)), 
            this._blurInof2_native[2] = 1, this._blurInof2_native;
        }, s(0, i, "type", function() {
            return 8;
        }), s(0, i, "offY", function() {
            return this._elements[6];
        }, function(t) {
            this._elements[6] = t, this._sv_blurInfo1[3] = -t;
        }), s(0, i, "offX", function() {
            return this._elements[5];
        }, function(t) {
            this._elements[5] = t, this._sv_blurInfo1[2] = t;
        }), s(0, i, "blur", function() {
            return this._elements[4];
        }, function(t) {
            this._elements[4] = t, this._sv_blurInfo1[0] = this._sv_blurInfo1[1] = t;
        }), e;
    }(c), function(t) {
        function e() {
            e.__super.call(this, 24, 4, 4), this.canReuse = !0, this.setAttributes(laya.webgl.utils.MeshQuadTexture._fixattriInfo), 
            laya.webgl.utils.MeshQuadTexture._fixib ? (this._ib = laya.webgl.utils.MeshQuadTexture._fixib, 
            this._quadNum = e._maxIB) : (this.createQuadIB(e._maxIB), laya.webgl.utils.MeshQuadTexture._fixib = this._ib);
        }
        r(e, "laya.webgl.utils.MeshQuadTexture", t);
        var i = e.prototype;
        return i.releaseMesh = function() {
            this._vb.setByteLength(0), this.vertNum = 0, this.indexNum = 0, laya.webgl.utils.MeshQuadTexture._POOL.push(this);
        }, i.destroy = function() {
            this._vb.destroy(), this._vb.deleteBuffer();
        }, i.addQuad = function(t, e, i, n) {
            var r = this._vb, s = r._byteLength >> 2;
            r.setByteLength(s + 24 << 2);
            var a = r._floatArray32 || r.getFloat32Array(), o = r._uint32Array, h = s, l = n ? 255 : 0;
            a[h++] = t[0], a[h++] = t[1], a[h++] = e[0], a[h++] = e[1], o[h++] = i, o[h++] = l, 
            a[h++] = t[2], a[h++] = t[3], a[h++] = e[2], a[h++] = e[3], o[h++] = i, o[h++] = l, 
            a[h++] = t[4], a[h++] = t[5], a[h++] = e[4], a[h++] = e[5], o[h++] = i, o[h++] = l, 
            a[h++] = t[6], a[h++] = t[7], a[h++] = e[6], a[h++] = e[7], o[h++] = i, o[h++] = l, 
            r._upload = !0;
        }, e.getAMesh = function(t) {
            var i = null;
            return i = laya.webgl.utils.MeshQuadTexture._POOL.length ? laya.webgl.utils.MeshQuadTexture._POOL.pop() : new e(), 
            t && i._vb._resizeBuffer(1572864, !1), i;
        }, e.const_stride = 24, e._fixib = null, e._maxIB = 16384, e._POOL = [], n(e, [ "_fixattriInfo", function() {
            return this._fixattriInfo = [ 5126, 4, 0, 5121, 4, 16, 5121, 4, 20 ];
        } ]), e;
    }(b)), Fe = function(t) {
        function e() {
            this.url = null, this.loaded = !1, this.data = null, this.audioBuffer = null, this.__toPlays = null, 
            this._disposed = !1, e.__super.call(this);
        }
        r(e, "laya.media.webaudio.WebAudioSound", t);
        var i = e.prototype;
        return i.load = function(t) {
            var i = this;
            if (t = q.formatURL(t), this.url = t, this.audioBuffer = e._dataCache[t], this.audioBuffer) return void this._loaded(this.audioBuffer);
            if (e.e.on("loaded:" + t, this, this._loaded), e.e.on("err:" + t, this, this._err), 
            !e.__loadingSound[t]) {
                e.__loadingSound[t] = !0;
                var n = new Dt.window.XMLHttpRequest();
                n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function() {
                    return i._disposed ? void i._removeLoadEvents() : (i.data = n.response, e.buffs.push({
                        buffer: i.data,
                        url: i.url
                    }), void e.decode());
                }, n.onerror = function(t) {
                    i._err();
                }, n.send();
            }
        }, i._err = function() {
            this._removeLoadEvents(), e.__loadingSound[this.url] = !1, this.event("error");
        }, i._loaded = function(t) {
            this._removeLoadEvents(), this._disposed || (this.audioBuffer = t, e._dataCache[this.url] = this.audioBuffer, 
            this.loaded = !0, this.event("complete"));
        }, i._removeLoadEvents = function() {
            e.e.off("loaded:" + this.url, this, this._loaded), e.e.off("err:" + this.url, this, this._err);
        }, i.__playAfterLoaded = function() {
            if (this.__toPlays) {
                var t, e = 0, i = 0;
                t = this.__toPlays, i = t.length;
                var n;
                for (e = 0; i > e; e++) n = t[e], n[2] && !n[2].isStopped && this.play(n[0], n[1], n[2]);
                this.__toPlays.length = 0;
            }
        }, i.play = function(t, e, i) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), i = i ? i : new Ze(), this.audioBuffer || this.url && (this.__toPlays || (this.__toPlays = []), 
            this.__toPlays.push([ t, e, i ]), this.once("complete", this, this.__playAfterLoaded), 
            this.load(this.url)), i.url = this.url, i.loops = e, i.audioBuffer = this.audioBuffer, 
            i.startTime = t, i.play(), ye.addChannel(i), i;
        }, i.dispose = function() {
            this._disposed = !0, delete e._dataCache[this.url], delete e.__loadingSound[this.url], 
            this.audioBuffer = null, this.data = null, this.__toPlays = [];
        }, s(0, i, "duration", function() {
            return this.audioBuffer ? this.audioBuffer.duration : 0;
        }), e.decode = function() {
            e.buffs.length <= 0 || e.isDecoding || (e.isDecoding = !0, e.tInfo = e.buffs.shift(), 
            e.ctx.decodeAudioData(e.tInfo.buffer, e._done, e._fail));
        }, e._done = function(t) {
            e.e.event("loaded:" + e.tInfo.url, t), e.isDecoding = !1, e.decode();
        }, e._fail = function() {
            e.e.event("err:" + e.tInfo.url, null), e.isDecoding = !1, e.decode();
        }, e._playEmptySound = function() {
            if (null != e.ctx) {
                var t = e.ctx.createBufferSource();
                t.buffer = e._miniBuffer, t.connect(e.ctx.destination), t.start(0, 0, 0);
            }
        }, e._unlock = function() {
            e._unlocked || (e._playEmptySound(), "running" == e.ctx.state && (Dt.document.removeEventListener("mousedown", e._unlock, !0), 
            Dt.document.removeEventListener("touchend", e._unlock, !0), Dt.document.removeEventListener("touchstart", e._unlock, !0), 
            e._unlocked = !0));
        }, e.initWebAudio = function() {
            "running" != e.ctx.state && (e._unlock(), Dt.document.addEventListener("mousedown", e._unlock, !0), 
            Dt.document.addEventListener("touchend", e._unlock, !0), Dt.document.addEventListener("touchstart", e._unlock, !0));
        }, e._dataCache = {}, e.buffs = [], e.isDecoding = !1, e._unlocked = !1, e.tInfo = null, 
        e.__loadingSound = {}, n(e, [ "window", function() {
            return this.window = Dt.window;
        }, "webAudioEnabled", function() {
            return this.webAudioEnabled = e.window.AudioContext || e.window.webkitAudioContext || e.window.mozAudioContext;
        }, "ctx", function() {
            return this.ctx = e.webAudioEnabled ? new (e.window.AudioContext || e.window.webkitAudioContext || e.window.mozAudioContext)() : void 0;
        }, "_miniBuffer", function() {
            return this._miniBuffer = e.ctx.createBuffer(1, 1, 22050);
        }, "e", function() {
            return this.e = new m();
        } ]), e;
    }(m), Oe = (function(t) {
        function e(t, i, n, r) {
            this._endian = null, this._socket = null, this._connected = !1, this._addInputPosition = 0, 
            this._input = null, this._output = null, this.disableInput = !1, this._byteClass = null, 
            this.protocols = [], e.__super.call(this), void 0 === i && (i = 0), this._byteClass = n ? n : Kt, 
            this.protocols = r, this.endian = "bigEndian", t && i > 0 && 65535 > i && this.connect(t, i);
        }
        r(e, "laya.net.Socket", t);
        var i = e.prototype;
        return i.connect = function(t, e) {
            var i = "ws://" + t + ":" + e;
            this.connectByUrl(i);
        }, i.connectByUrl = function(t) {
            var e = this;
            null != this._socket && this.close(), this._socket && this.cleanSocket(), this.protocols && 0 != this.protocols.length ? this._socket = new Dt.window.WebSocket(t, this.protocols) : this._socket = new Dt.window.WebSocket(t), 
            this._socket.binaryType = "arraybuffer", this._output = new this._byteClass(), this._output.endian = this.endian, 
            this._input = new this._byteClass(), this._input.endian = this.endian, this._addInputPosition = 0, 
            this._socket.onopen = function(t) {
                e._onOpen(t);
            }, this._socket.onmessage = function(t) {
                e._onMessage(t);
            }, this._socket.onclose = function(t) {
                e._onClose(t);
            }, this._socket.onerror = function(t) {
                e._onError(t);
            };
        }, i.cleanSocket = function() {
            this.close(), this._connected = !1, this._socket.onopen = null, this._socket.onmessage = null, 
            this._socket.onclose = null, this._socket.onerror = null, this._socket = null;
        }, i.close = function() {
            if (null != this._socket) try {
                this._socket.close();
            } catch (t) {}
        }, i._onOpen = function(t) {
            this._connected = !0, this.event("open", t);
        }, i._onMessage = function(t) {
            if (t && t.data) {
                var e = t.data;
                if (this.disableInput && e) return void this.event("message", e);
                this._input.length > 0 && this._input.bytesAvailable < 1 && (this._input.clear(), 
                this._addInputPosition = 0);
                var i = this._input.pos;
                !this._addInputPosition && (this._addInputPosition = 0), this._input.pos = this._addInputPosition, 
                e && ("string" == typeof e ? this._input.writeUTFBytes(e) : this._input.writeArrayBuffer(e), 
                this._addInputPosition = this._input.pos, this._input.pos = i), this.event("message", e);
            }
        }, i._onClose = function(t) {
            this._connected = !1, this.event("close", t);
        }, i._onError = function(t) {
            this.event("error", t);
        }, i.send = function(t) {
            this._socket.send(t);
        }, i.flush = function() {
            if (this._output && this._output.length > 0) {
                var t;
                try {
                    this._socket && this._socket.send(this._output.__getBuffer().slice(0, this._output.length));
                } catch (e) {
                    t = e;
                }
                this._output.endian = this.endian, this._output.clear(), t && this.event("error", t);
            }
        }, s(0, i, "input", function() {
            return this._input;
        }), s(0, i, "output", function() {
            return this._output;
        }), s(0, i, "connected", function() {
            return this._connected;
        }), s(0, i, "endian", function() {
            return this._endian;
        }, function(t) {
            this._endian = t, null != this._input && (this._input.endian = t), null != this._output && (this._output.endian = t);
        }), e.LITTLE_ENDIAN = "littleEndian", e.BIG_ENDIAN = "bigEndian", e;
    }(m), function(t) {
        function e(t) {
            this.u_colorMatrix = null, this.strength = 0, this.blurInfo = null, this.colorMat = null, 
            this.colorAlpha = null, void 0 === t && (t = 0), e.__super.call(this, 1, t), this._attribLocation = [ "posuv", 0, "attribColor", 1, "attribFlags", 2 ];
        }
        r(e, "laya.webgl.shader.d2.value.TextureSV", t);
        var i = e.prototype;
        return i.clear = function() {
            this.texture = null, this.shader = null, this.defines._value = this.subID + (wt.shaderHighPrecision ? 1024 : 0);
        }, e;
    }(X)), Ne = (function(t) {
        function e() {
            e.__super.call(this);
        }
        r(e, "laya.components.CommonScript", t);
        var i = e.prototype;
        return i.onAwake = function() {}, i.onEnable = function() {}, i.onStart = function() {}, 
        i.onUpdate = function() {}, i.onLateUpdate = function() {}, i.onDisable = function() {}, 
        i.onDestroy = function() {}, s(0, i, "isSingleton", function() {
            return !1;
        }), e;
    }(p), function(t) {
        function e() {
            this.retryNum = 1, this.retryDelay = 0, this.maxLoader = 5, this._loaders = [], 
            this._loaderCount = 0, this._resInfos = [], this._infoPool = [], this._maxPriority = 5, 
            this._failRes = {}, this._statInfo = {
                count: 1,
                loaded: 1
            }, e.__super.call(this);
            for (var t = 0; t < this._maxPriority; t++) this._resInfos[t] = [];
        }
        var s;
        r(e, "laya.net.LoaderManager", t);
        var a = e.prototype;
        return a.getProgress = function() {
            return this._statInfo.loaded / this._statInfo.count;
        }, a.resetProgress = function() {
            this._statInfo.count = this._statInfo.loaded = 1;
        }, a.create = function(t, e, i, n, r, s, a, o) {
            void 0 === a && (a = 1), void 0 === o && (o = !0), this._create(t, !0, e, i, n, r, s, a, o);
        }, a._create = function(t, e, i, n, r, s, a, o, h) {
            function l(t, e) {
                f++, t.progress = 1, e || (c = !1), f === d && i && i.runWith(c);
            }
            function u(t, e) {
                t.progress = e;
                for (var i = 0, n = 0; d > n; n++) {
                    var r = _[n];
                    i += r.progress;
                }
                var s = i / d;
                p.runWith(s);
            }
            if (void 0 === o && (o = 1), void 0 === h && (h = !0), t instanceof Array) {
                var c = !0, _ = t, d = _.length, f = 0;
                if (n) var p = g.create(n.caller, n.method, n.args, !1);
                for (var m = 0; d > m; m++) {
                    var v = _[m];
                    "string" == typeof v && (v = _[m] = {
                        url: v
                    }), v.progress = 0;
                }
                for (m = 0; d > m; m++) {
                    v = _[m];
                    var y = n ? g.create(null, u, [ v ], !1) : null, x = n || i ? g.create(null, l, [ v ]) : null;
                    this._createOne(v.url, e, x, y, v.type || r, v.constructParams || s, v.propertyParams || a, v.priority || o, h);
                }
            } else this._createOne(t, e, i, n, r, s, a, o, h);
        }, a._createOne = function(t, n, r, s, a, o, h, l, u) {
            function c(e) {
                e && (!n && e instanceof laya.resource.Resource && e._addReference(), e._setCreateURL(t)), 
                r && r.runWith(e), i.loader.event(t);
            }
            void 0 === l && (l = 1), void 0 === u && (u = !0);
            var _ = this.getRes(t);
            if (_) !n && _ instanceof laya.resource.Resource && _._addReference(), s && s.runWith(1), 
            r && r.runWith(_); else {
                var d = ie.getFileExtension(t);
                if (a || (a = e.createMap[d] ? e.createMap[d][0] : null), !a) return void this.load(t, r, s, a, l, u);
                var f = De.parserMap;
                if (!f[a]) return void this.load(t, r, s, a, l, u);
                this._createLoad(t, g.create(null, c), s, a, o, h, l, u, !0);
            }
        }, a.load = function(t, n, r, a, o, h, l, u, c) {
            var _ = this;
            if (void 0 === o && (o = 1), void 0 === h && (h = !0), void 0 === u && (u = !1), 
            void 0 === c && (c = !1), t instanceof Array) return this._loadAssets(t, n, r, a, o, h, l);
            var d = De.getRes(t);
            if (u || null == d) {
                var f;
                f = t, t = ce.getFileLoadPath(t), t != f && "nativeimage" !== a ? a = "atlas" : f = null;
                var p = e._resMap[t];
                p ? (n && (f ? n && p._createListener("complete", this, this._resInfoLoaded, [ f, n ], !1, !1) : n && p._createListener("complete", n.caller, n.method, n.args, !1, !1)), 
                r && p._createListener("progress", r.caller, r.method, r.args, !1, !1)) : (p = this._infoPool.length ? this._infoPool.pop() : new s(), 
                p.url = t, p.type = a, p.cache = h, p.group = l, p.ignoreCache = u, p.useWorkerLoader = c, 
                p.originalUrl = f, n && p.on("complete", n.caller, n.method, n.args), r && p.on("progress", r.caller, r.method, r.args), 
                e._resMap[t] = p, o = o < this._maxPriority ? o : this._maxPriority - 1, this._resInfos[o].push(p), 
                this._statInfo.count++, this.event("progress", this.getProgress()), this._next());
            } else i.systemTimer.frameOnce(1, null, function() {
                r && r.runWith(1), n && n.runWith(d instanceof Array ? [ d ] : d), _._loaderCount || _.event("complete");
            });
            return this;
        }, a._resInfoLoaded = function(t, e) {
            e.runWith(De.getRes(t));
        }, a._createLoad = function(t, n, r, a, o, h, l, u, c) {
            var _ = this;
            if (void 0 === l && (l = 1), void 0 === u && (u = !0), void 0 === c && (c = !1), 
            t instanceof Array) return this._loadAssets(t, n, r, a, l, u);
            var d = De.getRes(t);
            if (null != d) i.systemTimer.frameOnce(1, null, function() {
                r && r.runWith(1), n && n.runWith(d), _._loaderCount || _.event("complete");
            }); else {
                var f = e._resMap[t];
                f ? (n && f._createListener("complete", n.caller, n.method, n.args, !1, !1), r && f._createListener("progress", r.caller, r.method, r.args, !1, !1)) : (f = this._infoPool.length ? this._infoPool.pop() : new s(), 
                f.url = t, f.type = a, f.cache = !1, f.ignoreCache = c, f.originalUrl = null, f.createCache = u, 
                f.createConstructParams = o, f.createPropertyParams = h, n && f.on("complete", n.caller, n.method, n.args), 
                r && f.on("progress", r.caller, r.method, r.args), e._resMap[t] = f, l = l < this._maxPriority ? l : this._maxPriority - 1, 
                this._resInfos[l].push(f), this._statInfo.count++, this.event("progress", this.getProgress()), 
                this._next());
            }
            return this;
        }, a._next = function() {
            if (!(this._loaderCount >= this.maxLoader)) {
                for (var t = 0; t < this._maxPriority; t++) for (var e = this._resInfos[t]; e.length > 0; ) {
                    var i = e.shift();
                    if (i) return this._doLoad(i);
                }
                this._loaderCount || this.event("complete");
            }
        }, a._doLoad = function(t) {
            function e(e) {
                i.offAll(), i._data = null, i._customParse = !1, n._loaders.push(i), n._endLoad(t, e instanceof Array ? [ e ] : e), 
                n._loaderCount--, n._next();
            }
            this._loaderCount++;
            var i = this._loaders.length ? this._loaders.pop() : new De();
            i.on("complete", null, e), i.on("progress", null, function(e) {
                t.event("progress", e);
            }), i.on("error", null, function(t) {
                e(null);
            });
            var n = this;
            i._constructParams = t.createConstructParams, i._propertyParams = t.createPropertyParams, 
            i._createCache = t.createCache, i.load(t.url, t.type, t.cache, t.group, t.ignoreCache, t.useWorkerLoader);
        }, a._endLoad = function(t, n) {
            var r = t.url;
            if (null == n) {
                var s = this._failRes[r] || 0;
                if (s < this.retryNum) return console.warn("[warn]Retry to load:", r), this._failRes[r] = s + 1, 
                void i.systemTimer.once(this.retryDelay, this, this._addReTry, [ t ], !1);
                De.clearRes(r), console.warn("[error]Failed to load:", r), this.event("error", r);
            }
            this._failRes[r] && (this._failRes[r] = 0), delete e._resMap[r], t.originalUrl && (n = De.getRes(t.originalUrl)), 
            t.event("complete", n), t.offAll(), this._infoPool.push(t), this._statInfo.loaded++, 
            this.event("progress", this.getProgress());
        }, a._addReTry = function(t) {
            this._resInfos[this._maxPriority - 1].push(t), this._next();
        }, a.clearRes = function(t) {
            De.clearRes(t);
        }, a.clearTextureRes = function(t) {
            De.clearTextureRes(t);
        }, a.getRes = function(t) {
            return De.getRes(t);
        }, a.cacheRes = function(t, e) {
            De.cacheRes(t, e);
        }, a.setGroup = function(t, e) {
            De.setGroup(t, e);
        }, a.clearResByGroup = function(t) {
            De.clearResByGroup(t);
        }, a.clearUnLoaded = function() {
            for (var t = 0; t < this._maxPriority; t++) {
                for (var i = this._resInfos[t], n = i.length - 1; n > -1; n--) {
                    var r = i[n];
                    r && (r.offAll(), this._infoPool.push(r));
                }
                i.length = 0;
            }
            this._loaderCount = 0, e._resMap = {};
        }, a.cancelLoadByUrls = function(t) {
            if (t) for (var e = 0, i = t.length; i > e; e++) this.cancelLoadByUrl(t[e]);
        }, a.cancelLoadByUrl = function(t) {
            for (var i = 0; i < this._maxPriority; i++) for (var n = this._resInfos[i], r = n.length - 1; r > -1; r--) {
                var s = n[r];
                s && s.url === t && (n[r] = null, s.offAll(), this._infoPool.push(s));
            }
            e._resMap[t] && delete e._resMap[t];
        }, a._loadAssets = function(t, e, i, n, r, s, a) {
            function o(t, i) {
                u++, t.progress = 1, i || (d = !1), u === l && e && e.runWith(d);
            }
            function h(t, e) {
                if (null != i) {
                    t.progress = e;
                    for (var n = 0, r = 0; r < _.length; r++) {
                        var s = _[r];
                        n += s.size * s.progress;
                    }
                    var a = n / c;
                    i.runWith(a);
                }
            }
            void 0 === r && (r = 1), void 0 === s && (s = !0);
            for (var l = t.length, u = 0, c = 0, _ = [], d = !0, f = 0; l > f; f++) {
                var p = t[f];
                "string" == typeof p && (p = {
                    url: p,
                    type: n,
                    size: 1,
                    priority: r
                }), p.size || (p.size = 1), p.progress = 0, c += p.size, _.push(p);
                var m = i ? g.create(null, h, [ p ], !1) : null, v = e || i ? g.create(null, o, [ p ]) : null;
                this.load(p.url, v, m, p.type, p.priority || 1, s, p.group || a, !1, p.useWorkerLoader);
            }
            return this;
        }, a.decodeBitmaps = function(t) {
            var e, i = 0, n = t.length;
            for (e = Mt._context, i = 0; n > i; i++) {
                var r;
                if (r = De.getAtlas(t[i])) this._decodeTexture(r[0], e); else {
                    var s;
                    s = this.getRes(t[i]), s && s instanceof laya.resource.Texture && this._decodeTexture(s, e);
                }
            }
        }, a._decodeTexture = function(t, e) {
            var n = t.bitmap;
            if (t && n) {
                var r = n.source || n.image;
                if (r && i.__typeof(r, Dt.window.HTMLImageElement)) {
                    e.drawImage(r, 0, 0, 1, 1);
                    e.getImageData(0, 0, 1, 1);
                }
            }
        }, e.cacheRes = function(t, e) {
            De.cacheRes(t, e);
        }, e._resMap = {}, n(e, [ "createMap", function() {
            return this.createMap = {
                atlas: [ null, "atlas" ]
            };
        } ]), e.__init$ = function() {
            s = function(t) {
                function e() {
                    this.url = null, this.type = null, this.cache = !1, this.group = null, this.ignoreCache = !1, 
                    this.useWorkerLoader = !1, this.originalUrl = null, this.createCache = !1, this.createConstructParams = null, 
                    this.createPropertyParams = null, e.__super.call(this);
                }
                return r(e, "", t), e;
            }(m);
        }, e;
    }(m)), ke = function(t) {
        function e() {
            e.__super.call(this, 24, 4, 4), this.canReuse = !0, this.setAttributes(laya.webgl.utils.MeshTexture._fixattriInfo);
        }
        r(e, "laya.webgl.utils.MeshTexture", t);
        var i = e.prototype;
        return i.addData = function(t, e, i, n, r) {
            var s = this._vb, a = this._ib, o = t.length >> 1, h = s.needSize(24 * o), l = h >> 2, u = s._floatArray32 || s.getFloat32Array(), c = s._uint32Array, _ = 0, d = n.a, f = n.b, p = n.c, m = n.d, g = n.tx, v = n.ty, y = 0;
            for (y = 0; o > y; y++) {
                var x = t[_], T = t[_ + 1];
                u[l] = x * d + T * p + g, u[l + 1] = x * f + T * m + v, u[l + 2] = e[_], u[l + 3] = e[_ + 1], 
                c[l + 4] = r, c[l + 5] = 255, l += 6, _ += 2;
            }
            s.setNeedUpload();
            var b = this.vertNum, w = i.length, C = a.needSize(i.byteLength), A = a.getUint16Array(), E = C >> 1;
            if (b > 0) {
                var S = E + w, M = 0;
                for (y = E; S > y; y++, M++) A[y] = i[M] + b;
            } else A.set(i, E);
            a.setNeedUpload(), this.vertNum += o, this.indexNum += i.length;
        }, i.releaseMesh = function() {
            this._vb.setByteLength(0), this._ib.setByteLength(0), this.vertNum = 0, this.indexNum = 0, 
            laya.webgl.utils.MeshTexture._POOL.push(this);
        }, i.destroy = function() {
            this._ib.destroy(), this._vb.destroy(), this._ib.disposeResource(), this._vb.deleteBuffer();
        }, e.getAMesh = function(t) {
            var i;
            return i = laya.webgl.utils.MeshTexture._POOL.length ? laya.webgl.utils.MeshTexture._POOL.pop() : new e(), 
            t && i._vb._resizeBuffer(1572864, !1), i;
        }, e.const_stride = 24, e._POOL = [], n(e, [ "_fixattriInfo", function() {
            return this._fixattriInfo = [ 5126, 4, 0, 5121, 4, 16, 5121, 4, 20 ];
        } ]), e;
    }(b), Ue = function(t) {
        function e() {
            this.totalCount = 0, this._completeHandler = null, this._toLoadList = null, this._isLoading = !1, 
            this._curUrl = null, e.__super.call(this), this._completeHandler = new g(this, this.onOneLoadComplete), 
            this.reset();
        }
        r(e, "laya.net.SceneLoader", t);
        var a = e.prototype;
        return a.reset = function() {
            this._toLoadList = [], this._isLoading = !1, this.totalCount = 0;
        }, a.load = function(t, e, i) {
            if (void 0 === e && (e = !1), void 0 === i && (i = !0), t instanceof Array) {
                var n = 0, r = 0;
                for (r = t.length, n = 0; r > n; n++) this._addToLoadList(t[n], e);
            } else this._addToLoadList(t, e);
            i && this._checkNext();
        }, a._addToLoadList = function(t, e) {
            void 0 === e && (e = !1), this._toLoadList.indexOf(t) >= 0 || De.getRes(t) || (e ? this._toLoadList.push({
                url: t
            }) : this._toLoadList.push(t), this.totalCount++);
        }, a._checkNext = function() {
            if (!this._isLoading) {
                if (0 == this._toLoadList.length) return void this.event("complete");
                var t;
                t = this._toLoadList.pop(), "string" == typeof t ? this.loadOne(t) : this.loadOne(t.url, !0);
            }
        }, a.loadOne = function(t, n) {
            void 0 === n && (n = !1), this._curUrl = t;
            var r = ie.getFileExtension(this._curUrl);
            n ? i.loader.create(t, this._completeHandler) : e.LoadableExtensions[r] ? i.loader.load(t, this._completeHandler, null, e.LoadableExtensions[r]) : t != ce.getFileLoadPath(t) || e.No3dLoadTypes[r] || !Ne.createMap[r] ? i.loader.load(t, this._completeHandler) : i.loader.create(t, this._completeHandler);
        }, a.onOneLoadComplete = function() {
            this._isLoading = !1, De.getRes(this._curUrl) || console.log("Fail to load:", this._curUrl);
            var t = ie.getFileExtension(this._curUrl);
            if (e.LoadableExtensions[t]) {
                var i;
                i = De.getRes(this._curUrl), i && i instanceof laya.components.Prefab && (i = i.json), 
                i && (i.loadList && this.load(i.loadList, !1, !1), i.loadList3D && this.load(i.loadList3D, !0, !1));
            }
            "sk" == t && this.load(this._curUrl.replace(".sk", ".png"), !1, !1), this.event("progress", this.getProgress()), 
            this._checkNext();
        }, a.getProgress = function() {
            return this.loadedCount / this.totalCount;
        }, s(0, a, "loadedCount", function() {
            return this.totalCount - this.leftCount;
        }), s(0, a, "leftCount", function() {
            return this._isLoading ? this._toLoadList.length + 1 : this._toLoadList.length;
        }), n(e, [ "LoadableExtensions", function() {
            return this.LoadableExtensions = {
                scene: "json",
                scene3d: "json",
                ani: "json",
                ui: "json",
                prefab: "prefab"
            };
        }, "No3dLoadTypes", function() {
            return this.No3dLoadTypes = {
                png: !0,
                jpg: !0,
                txt: !0
            };
        } ]), e;
    }(m), We = function(t) {
        function e() {
            this.italic = !1, e.__super.call(this);
        }
        r(e, "laya.display.css.TextStyle", t);
        var i = e.prototype;
        return i.reset = function() {
            return t.prototype.reset.call(this), this.italic = !1, this.align = "left", this.wordWrap = !1, 
            this.leading = 0, this.padding = [ 0, 0, 0, 0 ], this.bgColor = null, this.borderColor = null, 
            this.asPassword = !1, this.stroke = 0, this.strokeColor = "#000000", this.bold = !1, 
            this.underline = !1, this.underlineColor = null, this.currBitmapFont = null, this;
        }, i.recover = function() {
            this !== e.EMPTY && U.recover("TextStyle", this.reset());
        }, i.render = function(t, e, i, n) {
            (this.bgColor || this.borderColor) && e.drawRect(i, n, t.width, t.height, this.bgColor, this.borderColor, 1);
        }, e.create = function() {
            return U.getItemByClass("TextStyle", e);
        }, e.EMPTY = new e(), e;
    }(Z), Ve = function(t) {
        function e() {
            this.worker = null, this._useWorkerLoader = !1, e.__super.call(this);
            var t = this;
            this.worker = new Worker(e.workerPath), this.worker.onmessage = function(e) {
                t.workerMessage(e.data);
            };
        }
        r(e, "laya.net.WorkerLoader", t);
        var i = e.prototype;
        return i.workerMessage = function(t) {
            if (t) switch (t.type) {
              case "Image":
                this.imageLoaded(t);
                break;

              case "Disable":
                e.enable = !1;
            }
        }, i.imageLoaded = function(t) {
            if (!t.dataType || "imageBitmap" != t.dataType) return void this.event(t.url, null);
            var e = new si(!0), i = e.source.getContext("2d");
            switch (t.dataType) {
              case "imageBitmap":
                var n = t.imageBitmap;
                e.size(n.width, n.height), i.drawImage(n, 0, 0);
            }
            console.log("load:", t.url), e._setGPUMemory(0);
            var r = new _i();
            r.loadImageSource(e.source), this.event(t.url, r);
        }, i.loadImage = function(t) {
            this.worker.postMessage(t);
        }, i._loadImage = function(t) {
            function i() {
                laya.net.WorkerLoader.I.off(t, n, r);
            }
            var n = this;
            if (!this._useWorkerLoader || !e._enable) return void e._preLoadFun.call(n, t);
            t = q.formatURL(t);
            var r = function(r) {
                i(), r ? n.onLoaded(r) : e._preLoadFun.call(n, t);
            };
            laya.net.WorkerLoader.I.on(t, n, r), laya.net.WorkerLoader.I.loadImage(t);
        }, s(1, e, "enable", function() {
            return e._enable;
        }, function(t) {
            e._enable != t && (e._enable = t, t && null == e._preLoadFun && (e._enable = e.__init__()));
        }), e.__init__ = function() {
            return null != e._preLoadFun ? !1 : Worker ? (e._preLoadFun = De.prototype._loadImage, 
            De.prototype._loadImage = e.prototype._loadImage, e.I || (e.I = new e()), !0) : !1;
        }, e.workerSupported = function() {
            return Worker ? !0 : !1;
        }, e.enableWorkerLoader = function() {
            e._tryEnabled || (e.enable = !0, e._tryEnabled = !0);
        }, e.I = null, e.workerPath = "libs/workerloader.js", e._preLoadFun = null, e._enable = !1, 
        e._tryEnabled = !1, e;
    }(m), Ge = function(t) {
        function e() {
            e.__super.call(this);
        }
        return r(e, "laya.webgl.BufferState2D", t), e;
    }(xt), Xe = function(t) {
        function e(t) {
            e.__super.call(this, 4, 0), this._attribLocation = [ "position", 0, "attribColor", 1 ];
        }
        return r(e, "laya.webgl.shader.d2.value.PrimitiveSV", t), e;
    }(X), Ye = function(t) {
        function e(t) {
            this.texcoord = null, this.position = null, this.offsetX = 300, this.offsetY = 0, 
            e.__super.call(this, 512, 0);
            var i = 8 * _t.BYTES_PE;
            this.position = [ 2, 5126, !1, i, 0 ], this.texcoord = [ 2, 5126, !1, i, 2 * _t.BYTES_PE ], 
            this.color = [ 4, 5126, !1, i, 4 * _t.BYTES_PE ];
        }
        return r(e, "laya.webgl.shader.d2.skinAnishader.SkinSV", t), e;
    }(X), He = function(i) {
        function n(i, r, s, a, o) {
            this.ctx = null, this.lastScaleX = 1, this.lastScaleY = 1, this.needResetScale = !1, 
            this.maxTexW = 0, this.maxTexH = 0, this.scaleFontSize = !0, this.showDbgInfo = !1, 
            this.supportImageData = !0, n.__super.call(this), void 0 === s && (s = !0), void 0 === a && (a = !0), 
            void 0 === o && (o = !1), this.maxTexW = i, this.maxTexH = r, this.scaleFontSize = s, 
            this.supportImageData = a, this.showDbgInfo = o, n.canvas || (n.canvas = t.document.createElement("canvas"), 
            n.canvas.width = 1024, n.canvas.height = 512, n.canvas.style.left = "-10000px", 
            n.canvas.style.position = "absolute", e.body.appendChild(n.canvas), this.ctx = n.canvas.getContext("2d"));
        }
        r(n, "laya.webgl.text.CharRender_Canvas", i);
        var a = n.prototype;
        return a.getWidth = function(t, e) {
            return this.ctx ? (this.ctx._lastFont != t && (this.ctx.font = t, this.ctx._lastFont = t), 
            this.ctx.measureText(e).width) : 0;
        }, a.scale = function(t, e) {
            return this.supportImageData ? void ((this.lastScaleX != t || this.lastScaleY != e) && (this.ctx.setTransform(t, 0, 0, e, 0, 0), 
            this.lastScaleX = t, this.lastScaleY = e)) : (this.lastScaleX = t, void (this.lastScaleY = e));
        }, a.getCharBmp = function(t, e, i, n, r, s, a, o, h, l, u) {
            if (!this.supportImageData) return this.getCharCanvas(t, e, i, n, r, s, a, o, h, l);
            var c = this.ctx;
            c.font != e && (c.font = e, c._lastFont = e), s.width = c.measureText(t).width;
            var _ = s.width * this.lastScaleX, d = s.height * this.lastScaleY;
            _ += (a + h) * this.lastScaleX, d += (o + l) * this.lastScaleY, _ = Math.ceil(_), 
            d = Math.ceil(d), _ = Math.min(_, laya.webgl.text.CharRender_Canvas.canvas.width), 
            d = Math.min(d, laya.webgl.text.CharRender_Canvas.canvas.height);
            var f = _ + 2 * i + 1, p = d + 2 * i + 1;
            u && (f = Math.max(f, u[0] + u[2] + 1), p = Math.max(p, u[1] + u[3] + 1)), c.clearRect(0, 0, f, p), 
            c.save(), c.textBaseline = "top", i > 0 && (c.strokeStyle = r, c.lineWidth = i, 
            c.strokeText(t, a, o)), c.fillStyle = n, c.fillText(t, a, o), this.showDbgInfo && (c.strokeStyle = "#ff0000", 
            c.strokeRect(0, 0, _, d), c.strokeStyle = "#00ff00", c.strokeRect(a, o, s.width, s.height)), 
            u && -1 == u[2] && (u[2] = Math.ceil((s.width + 2 * i) * this.lastScaleX));
            var m = u ? c.getImageData(u[0], u[1], u[2], u[3]) : c.getImageData(0, 0, _, d);
            return c.restore(), s.bmpWidth = m.width, s.bmpHeight = m.height, m;
        }, a.getCharCanvas = function(t, e, i, r, s, a, o, h, l, u) {
            var c = this.ctx;
            c.font != e && (c.font = e, c._lastFont = e), a.width = c.measureText(t).width;
            var _ = a.width * this.lastScaleX, d = a.height * this.lastScaleY;
            return _ += (o + l) * this.lastScaleX, d += (h + u) * this.lastScaleY + 1, _ = Math.min(_, this.maxTexW), 
            d = Math.min(d, this.maxTexH), n.canvas.width = Math.min(_ + 1, this.maxTexW), n.canvas.height = Math.min(d + 1, this.maxTexH), 
            c.font = e, c.clearRect(0, 0, _ + 1 + i, d + 1 + i), c.setTransform(1, 0, 0, 1, 0, 0), 
            c.save(), this.scaleFontSize && c.scale(this.lastScaleX, this.lastScaleY), c.translate(o, h), 
            c.textAlign = "left", c.textBaseline = "top", i > 0 ? (c.strokeStyle = s, c.fillStyle = r, 
            c.lineWidth = i, c.fillAndStrokeText ? c.fillAndStrokeText(t, 0, 0) : (c.strokeText(t, 0, 0), 
            c.fillText(t, 0, 0))) : (c.fillStyle = r, c.fillText(t, 0, 0)), this.showDbgInfo && (c.strokeStyle = "#ff0000", 
            c.strokeRect(0, 0, _, d), c.strokeStyle = "#00ff00", c.strokeRect(0, 0, a.width, a.height)), 
            c.restore(), a.bmpWidth = n.canvas.width, a.bmpHeight = n.canvas.height, n.canvas;
        }, s(0, a, "canvasWidth", function() {
            return n.canvas.width;
        }, function(t) {
            n.canvas.width != t && (n.canvas.width = t, t > 2048 && console.warn("画文字设置的宽度太大，超过2048了"), 
            this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.scale(this.lastScaleX, this.lastScaleY));
        }), n.canvas = null, n;
    }(Jt), ze = function(e) {
        function i() {
            this.lastFont = "", i.__super.call(this);
        }
        r(i, "laya.webgl.text.CharRender_Native", e);
        var n = i.prototype;
        return n.getWidth = function(e, i) {
            return t.conchTextCanvas ? (t.conchTextCanvas.font = e, this.lastFont = e, t.conchTextCanvas.measureText(i).width) : 0;
        }, n.scale = function(t, e) {}, n.getCharBmp = function(e, i, n, r, s, a, h, l, u, c, _) {
            if (!t.conchTextCanvas) return null;
            t.conchTextCanvas.font = i, this.lastFont = i;
            var d = a.width = t.conchTextCanvas.measureText(e).width, f = a.height;
            d += h + u, f += l + c;
            var p = o.create(s), m = p.numColor, g = o.create(r), v = g.numColor, y = t.conchTextCanvas.getTextBitmapData(e, v, n > 2 ? 2 : n, m);
            return a.bmpWidth = y.width, a.bmpHeight = y.height, y;
        }, i;
    }(Jt), je = function(t) {
        function e() {
            this._x = 0, this._y = 0, this._width = 0, this._height = 0, this._visible = !0, 
            this._mouseState = 0, this._zOrder = 0, this._renderType = 0, this._transform = null, 
            this._tfChanged = !1, this._texture = null, this._boundStyle = null, this._graphics = null, 
            this.mouseThrough = !1, this.autoSize = !1, this.hitTestPrior = !1, e.__super.call(this), 
            this._repaint = 0, this._style = Z.EMPTY, this._cacheStyle = tt.EMPTY;
        }
        r(e, "laya.display.Sprite", t);
        var n = e.prototype;
        return n.destroy = function(e) {
            void 0 === e && (e = !0), t.prototype.destroy.call(this, e), this._style && this._style.recover(), 
            this._cacheStyle && this._cacheStyle.recover(), this._boundStyle && this._boundStyle.recover(), 
            this._style = null, this._cacheStyle = null, this._boundStyle = null, this._transform = null, 
            this._graphics && this._graphics.autoDestroy && this._graphics.destroy(), this._graphics = null, 
            this.texture = null;
        }, n.updateZOrder = function() {
            ie.updateOrder(this._children) && this.repaint();
        }, n._getBoundsStyle = function() {
            return this._boundStyle || (this._boundStyle = At.create()), this._boundStyle;
        }, n._setCustomRender = function() {}, n._setCacheAs = function(t) {}, n._checkCanvasEnable = function() {
            var t = this._cacheStyle.needEnableCanvasRender();
            this._getCacheStyle().enableCanvasRender = t, t ? (this._cacheStyle.needBitmapCache() ? this._cacheStyle.cacheAs = "bitmap" : this._cacheStyle.cacheAs = this._cacheStyle.userSetCache, 
            this._cacheStyle.reCache = !0, this._renderType |= 8) : (this._cacheStyle.cacheAs = "none", 
            this._cacheStyle.releaseContext(), this._renderType &= -9), this._setCacheAs(this._cacheStyle.cacheAs), 
            this._setRenderType(this._renderType);
        }, n.reCache = function() {
            this._cacheStyle.reCache = !0, this._repaint |= 2;
        }, n.getRepaint = function() {
            return this._repaint;
        }, n._setX = function(t) {
            this._x = t;
        }, n._setY = function(t) {
            this._y = t;
        }, n._setWidth = function(t, e) {}, n._setHeight = function(t, e) {}, n.setSelfBounds = function(t) {
            this._getBoundsStyle().userBounds = t;
        }, n.getBounds = function() {
            return this._getBoundsStyle().bounds = mt._getWrapRec(this._boundPointsToParent());
        }, n.getSelfBounds = function() {
            return this._boundStyle && this._boundStyle.userBounds ? this._boundStyle.userBounds : this._graphics || 0 !== this._children.length || this._texture ? this._getBoundsStyle().bounds = mt._getWrapRec(this._getBoundPointsM(!1)) : mt.TEMP.setTo(0, 0, 0, 0);
        }, n._boundPointsToParent = function(t) {
            void 0 === t && (t = !1);
            var e = 0, i = 0;
            this._style && (e = this.pivotX, i = this.pivotY, t = t || 0 !== this._style.rotation, 
            this._style.scrollRect && (e += this._style.scrollRect.x, i += this._style.scrollRect.y));
            var n = this._getBoundPointsM(t);
            if (!n || n.length < 1) return n;
            if (8 != n.length && (n = t ? Y.scanPList(n) : mt._getWrapRec(n, mt.TEMP)._getBoundPoints()), 
            !this.transform) return ie.transPointList(n, this._x - e, this._y - i), n;
            var r = Yt.TEMP, s = 0, a = n.length;
            for (s = 0; a > s; s += 2) r.x = n[s], r.y = n[s + 1], this.toParentPoint(r), n[s] = r.x, 
            n[s + 1] = r.y;
            return n;
        }, n.getGraphicBounds = function(t) {
            return void 0 === t && (t = !1), this._graphics ? this._graphics.getBounds(t) : mt.TEMP.setTo(0, 0, 0, 0);
        }, n._getBoundPointsM = function(t) {
            if (void 0 === t && (t = !1), this._boundStyle && this._boundStyle.userBounds) return this._boundStyle.userBounds._getBoundPoints();
            if (this._boundStyle || this._getBoundsStyle(), this._boundStyle.temBM || (this._boundStyle.temBM = []), 
            this._style.scrollRect) {
                var e = ie.clearArray(this._boundStyle.temBM), i = mt.TEMP;
                return i.copyFrom(this._style.scrollRect), ie.concatArray(e, i._getBoundPoints()), 
                e;
            }
            var n;
            this._graphics ? n = this._graphics.getBoundPoints() : (n = ie.clearArray(this._boundStyle.temBM), 
            this._texture && (i = mt.TEMP, i.setTo(0, 0, this.width || this._texture.width, this.height || this._texture.height), 
            ie.concatArray(n, i._getBoundPoints())));
            var r, s, a;
            a = this._children;
            for (var o = 0, h = a.length; h > o; o++) r = a[o], r instanceof laya.display.Sprite && r._visible === !0 && (s = r._boundPointsToParent(t), 
            s && (n = n ? ie.concatArray(n, s) : s));
            return n;
        }, n._getCacheStyle = function() {
            return this._cacheStyle === tt.EMPTY && (this._cacheStyle = tt.create()), this._cacheStyle;
        }, n.getStyle = function() {
            return this._style === Z.EMPTY && (this._style = Z.create()), this._style;
        }, n.setStyle = function(t) {
            this._style = t;
        }, n._setScaleX = function(t) {
            this._style.scaleX = t;
        }, n._setScaleY = function(t) {
            this._style.scaleY = t;
        }, n._setRotation = function(t) {
            this._style.rotation = t;
        }, n._setSkewX = function(t) {
            this._style.skewX = t;
        }, n._setSkewY = function(t) {
            this._style.skewY = t;
        }, n._createTransform = function() {
            return st.create();
        }, n._adjustTransform = function() {
            this._tfChanged = !1;
            var t = this._style, e = t.scaleX, i = t.scaleY, n = t.skewX, r = t.skewY, s = t.rotation, a = this._transform || (this._transform = this._createTransform());
            if (s || 1 !== e || 1 !== i || 0 !== n || 0 !== r) {
                a._bTransform = !0;
                var o = .0174532922222222 * (s - n), h = .0174532922222222 * (s + r), l = Math.cos(h), u = Math.sin(h), c = Math.sin(o), _ = Math.cos(o);
                a.a = e * l, a.b = e * u, a.c = -i * c, a.d = i * _, a.tx = a.ty = 0;
            } else a.identity(), this._renderType &= -3, this._setRenderType(this._renderType);
            return a;
        }, n._setTransform = function(t) {}, n._setPivotX = function(t) {
            var e = this.getStyle();
            e.pivotX = t;
        }, n._getPivotX = function() {
            return this._style.pivotX;
        }, n._setPivotY = function(t) {
            var e = this.getStyle();
            e.pivotY = t;
        }, n._getPivotY = function() {
            return this._style.pivotY;
        }, n._setAlpha = function(t) {
            if (this._style.alpha !== t) {
                var e = this.getStyle();
                e.alpha = t, 1 !== t ? this._renderType |= 1 : this._renderType &= -2, this._setRenderType(this._renderType), 
                this.parentRepaint();
            }
        }, n._getAlpha = function() {
            return this._style.alpha;
        }, n._setBlendMode = function(t) {}, n._setGraphics = function(t) {}, n._setGraphicsCallBack = function() {}, 
        n._setScrollRect = function(t) {}, n.pos = function(t, e, i) {
            if (void 0 === i && (i = !1), this._x !== t || this._y !== e) {
                if (this.destroyed) return this;
                if (i) {
                    this._setX(t), this._setY(e), this.parentRepaint(2);
                    var n = this._cacheStyle.maskParent;
                    n && n.repaint(2);
                } else this.x = t, this.y = e;
            }
            return this;
        }, n.pivot = function(t, e) {
            return this.pivotX = t, this.pivotY = e, this;
        }, n.size = function(t, e) {
            return this.width = t, this.height = e, this;
        }, n.scale = function(t, e, i) {
            void 0 === i && (i = !1);
            var n = this.getStyle();
            if (n.scaleX != t || n.scaleY != e) {
                if (this.destroyed) return this;
                i ? (this._setScaleX(t), this._setScaleY(e), this._setTranformChange()) : (this.scaleX = t, 
                this.scaleY = e);
            }
            return this;
        }, n.skew = function(t, e) {
            return this.skewX = t, this.skewY = e, this;
        }, n.render = function(t, e, i) {
            I.renders[this._renderType]._fun(this, t, e + this._x, i + this._y), this._repaint = 0;
        }, n.drawToCanvas = function(t, e, i, n) {
            return ue.drawToCanvas(this, this._renderType, t, e, i, n);
        }, n.drawToTexture = function(t, e, i, n) {
            return ue.drawToTexture(this, this._renderType, t, e, i, n);
        }, n.customRender = function(t, e, i) {
            this._repaint = 3;
        }, n._applyFilters = function() {}, n._setColorFilter = function(t) {}, n._isHaveGlowFilter = function() {
            var t = 0, e = 0;
            if (this.filters) for (t = 0; t < this.filters.length; t++) if (8 == this.filters[t].type) return !0;
            for (t = 0, e = this._children.length; e > t; t++) if (this._children[t]._isHaveGlowFilter()) return !0;
            return !1;
        }, n.localToGlobal = function(t, e, n) {
            void 0 === e && (e = !1), e === !0 && (t = new Yt(t.x, t.y));
            var r = this;
            for (n = n || i.stage; r && !r.destroyed && r != n; ) t = r.toParentPoint(t), r = r.parent;
            return t;
        }, n.globalToLocal = function(t, e, n) {
            void 0 === e && (e = !1), e && (t = new Yt(t.x, t.y));
            var r = this, s = [];
            for (n = n || i.stage; r && !r.destroyed && r != n; ) s.push(r), r = r.parent;
            for (var a = s.length - 1; a >= 0; ) r = s[a], t = r.fromParentPoint(t), a--;
            return t;
        }, n.toParentPoint = function(t) {
            if (!t) return t;
            t.x -= this.pivotX, t.y -= this.pivotY, this.transform && this._transform.transformPoint(t), 
            t.x += this._x, t.y += this._y;
            var e = this._style.scrollRect;
            return e && (t.x -= e.x, t.y -= e.y), t;
        }, n.fromParentPoint = function(t) {
            if (!t) return t;
            t.x -= this._x, t.y -= this._y;
            var e = this._style.scrollRect;
            return e && (t.x += e.x, t.y += e.y), this.transform && this._transform.invertTransformPoint(t), 
            t.x += this.pivotX, t.y += this.pivotY, t;
        }, n.fromStagePoint = function(t) {
            return t;
        }, n.on = function(e, i, n, r) {
            return 1 !== this._mouseState && this.isMouseEvent(e) ? (this.mouseEnabled = !0, 
            this._setBit(64, !0), this._parent && this._$2__onDisplay(), this._createListener(e, i, n, r, !1)) : t.prototype.on.call(this, e, i, n, r);
        }, n.once = function(e, i, n, r) {
            return 1 !== this._mouseState && this.isMouseEvent(e) ? (this.mouseEnabled = !0, 
            this._setBit(64, !0), this._parent && this._$2__onDisplay(), this._createListener(e, i, n, r, !0)) : t.prototype.once.call(this, e, i, n, r);
        }, n._$2__onDisplay = function() {
            if (1 !== this._mouseState) {
                var t = this;
                for (t = t.parent; t && 1 !== t._mouseState && !t._getBit(64); ) t.mouseEnabled = !0, 
                t._setBit(64, !0), t = t.parent;
            }
        }, n._setParent = function(e) {
            t.prototype._setParent.call(this, e), e && this._getBit(64) && this._$2__onDisplay();
        }, n.loadImage = function(t, e) {
            function i() {
                n.repaint(3), e && e.run();
            }
            var n = this;
            if (null == t) this.texture = null, i(); else {
                var r = De.getRes(t);
                r || (r = new Ie(), r.load(t), De.cacheRes(t, r)), this.texture = r, r.getIsReady() ? i() : r.once("ready", null, i);
            }
            return this;
        }, n.repaint = function(t) {
            void 0 === t && (t = 2), this._repaint & t || (this._repaint |= t, this.parentRepaint(t)), 
            this._cacheStyle && this._cacheStyle.maskParent && this._cacheStyle.maskParent.repaint(t);
        }, n._needRepaint = function() {
            return 2 & this._repaint && this._cacheStyle.enableCanvasRender && this._cacheStyle.reCache;
        }, n._childChanged = function(t) {
            this._children.length ? this._renderType |= 8192 : this._renderType &= -8193, this._setRenderType(this._renderType), 
            t && this._getBit(32) && i.systemTimer.callLater(this, this.updateZOrder), this.repaint(3);
        }, n.parentRepaint = function(t) {
            void 0 === t && (t = 2);
            var e = this._parent;
            !e || e._repaint & t || (e._repaint |= t, e.parentRepaint(t));
        }, n._setMask = function(t) {}, n.startDrag = function(t, e, i, n, r, s, a) {
            void 0 === e && (e = !1), void 0 === i && (i = 0), void 0 === n && (n = 300), void 0 === s && (s = !1), 
            void 0 === a && (a = .92), this._style.dragging || (this.getStyle().dragging = new Wt()), 
            this._style.dragging.start(this, t, e, i, n, r, s, a);
        }, n.stopDrag = function() {
            this._style.dragging && this._style.dragging.stop();
        }, n._setDisplay = function(e) {
            e || this._cacheStyle && (this._cacheStyle.releaseContext(), this._cacheStyle.releaseFilterCache(), 
            this._cacheStyle.hasGlowFilter && (this._cacheStyle.hasGlowFilter = !1)), t.prototype._setDisplay.call(this, e);
        }, n.hitTestPoint = function(t, e) {
            var i = this.globalToLocal(Yt.TEMP.setTo(t, e));
            t = i.x, e = i.y;
            var n = this._style.hitArea ? this._style.hitArea : this._width > 0 && this._height > 0 ? mt.TEMP.setTo(0, 0, this._width, this._height) : this.getSelfBounds();
            return n.contains(t, e);
        }, n.getMousePoint = function() {
            return this.globalToLocal(Yt.TEMP.setTo(i.stage.mouseX, i.stage.mouseY));
        }, n._setTexture = function(t) {}, n._setRenderType = function(t) {}, n._setTranformChange = function() {
            this._tfChanged = !0, this._renderType |= 2, this.parentRepaint(2);
        }, n._setBgStyleColor = function(t, e, i, n, r) {}, n._setBorderStyleColor = function(t, e, i, n, r, s) {}, 
        n.captureMouseEvent = function(t) {
            S.instance.setCapture(this, t);
        }, n.releaseMouseEvent = function() {
            S.instance.releaseCapture();
        }, s(0, n, "customRenderEnable", null, function(t) {
            t && (this._renderType |= 2048, this._setRenderType(this._renderType), this._setCustomRender());
        }), s(0, n, "cacheAs", function() {
            return this._cacheStyle.cacheAs;
        }, function(t) {
            t !== this._cacheStyle.userSetCache && (this.mask && "normal" === t || (this._setCacheAs(t), 
            this._getCacheStyle().userSetCache = t, this._checkCanvasEnable(), this.repaint()));
        }), s(0, n, "globalScaleY", function() {
            for (var t = 1, e = this; e && e !== i.stage; ) t *= e.scaleY, e = e.parent;
            return t;
        }), s(0, n, "hitArea", function() {
            return this._style.hitArea;
        }, function(t) {
            this.getStyle().hitArea = t;
        }), s(0, n, "staticCache", function() {
            return this._cacheStyle.staticCache;
        }, function(t) {
            this._getCacheStyle().staticCache = t, t || this.reCache();
        }), s(0, n, "displayWidth", function() {
            return this.width * this.scaleX;
        }), s(0, n, "zOrder", function() {
            return this._zOrder;
        }, function(t) {
            this._zOrder != t && (this._zOrder = t, this._parent && (t && this._parent._setBit(32, !0), 
            i.systemTimer.callLater(this._parent, this.updateZOrder)));
        }), s(0, n, "rotation", function() {
            return this._style.rotation;
        }, function(t) {
            var e = this.getStyle();
            e.rotation !== t && (this._setRotation(t), this._setTranformChange());
        }), s(0, n, "width", function() {
            return this.autoSize ? this.texture ? this.texture.width : this._graphics || 0 !== this._children.length ? this.getSelfBounds().width : 0 : this._width || (this.texture ? this.texture.width : 0);
        }, function(t) {
            this._width !== t && (this._width = t, this._setWidth(this.texture, t), this._setTranformChange());
        }), s(0, n, "x", function() {
            return this._x;
        }, function(t) {
            if (!this.destroyed && this._x !== t) {
                this._setX(t), this.parentRepaint(2);
                var e = this._cacheStyle.maskParent;
                e && e.repaint(2);
            }
        }), s(0, n, "drawCallOptimize", function() {
            return this._getBit(256);
        }, function(t) {
            this._setBit(256, t);
        }), s(0, n, "texture", function() {
            return this._texture;
        }, function(t) {
            "string" == typeof t ? this.loadImage(t) : this._texture != t && (this._texture && this._texture._removeReference(), 
            this._texture = t, t && t._addReference(), this._setTexture(t), this._setWidth(this._texture, this.width), 
            this._setHeight(this._texture, this.height), t ? this._renderType |= 256 : this._renderType &= -257, 
            this._setRenderType(this._renderType), this.repaint());
        }), s(0, n, "globalRotation", function() {
            for (var t = 0, e = this; e && e !== i.stage; ) t += e.rotation, e = e.parent;
            return t;
        }), s(0, n, "y", function() {
            return this._y;
        }, function(t) {
            if (!this.destroyed && this._y !== t) {
                this._setY(t), this.parentRepaint(2);
                var e = this._cacheStyle.maskParent;
                e && e.repaint(2);
            }
        }), s(0, n, "displayHeight", function() {
            return this.height * this.scaleY;
        }), s(0, n, "height", function() {
            return this.autoSize ? this.texture ? this.texture.height : this._graphics || 0 !== this._children.length ? this.getSelfBounds().height : 0 : this._height || (this.texture ? this.texture.height : 0);
        }, function(t) {
            this._height !== t && (this._height = t, this._setHeight(this.texture, t), this._setTranformChange());
        }), s(0, n, "blendMode", function() {
            return this._style.blendMode;
        }, function(t) {
            this._setBlendMode(t), this.getStyle().blendMode = t, t && "source-over" != t ? this._renderType |= 4 : this._renderType &= -5, 
            this._setRenderType(this._renderType), this.parentRepaint();
        }), s(0, n, "scaleX", function() {
            return this._style.scaleX;
        }, function(t) {
            var e = this.getStyle();
            e.scaleX !== t && (this._setScaleX(t), this._setTranformChange());
        }), s(0, n, "scaleY", function() {
            return this._style.scaleY;
        }, function(t) {
            var e = this.getStyle();
            e.scaleY !== t && (this._setScaleY(t), this._setTranformChange());
        }), s(0, n, "stage", function() {
            return i.stage;
        }), s(0, n, "skewX", function() {
            return this._style.skewX;
        }, function(t) {
            var e = this.getStyle();
            e.skewX !== t && (this._setSkewX(t), this._setTranformChange());
        }), s(0, n, "scrollRect", function() {
            return this._style.scrollRect;
        }, function(t) {
            this.getStyle().scrollRect = t, this._setScrollRect(t), this.repaint(), t ? this._renderType |= 64 : this._renderType &= -65, 
            this._setRenderType(this._renderType);
        }), s(0, n, "skewY", function() {
            return this._style.skewY;
        }, function(t) {
            var e = this.getStyle();
            e.skewY !== t && (this._setSkewY(t), this._setTranformChange());
        }), s(0, n, "transform", function() {
            return this._tfChanged ? this._adjustTransform() : this._transform;
        }, function(t) {
            this._tfChanged = !1;
            var e = this._transform || (this._transform = this._createTransform());
            t.copyTo(e), this._setTransform(e), t && (this._x = e.tx, this._y = e.ty, e.tx = e.ty = 0), 
            t ? this._renderType |= 2 : this._renderType &= -3, this._setRenderType(this._renderType), 
            this.parentRepaint();
        }), s(0, n, "pivotX", function() {
            return this._getPivotX();
        }, function(t) {
            this._setPivotX(t), this.repaint();
        }), s(0, n, "pivotY", function() {
            return this._getPivotY();
        }, function(t) {
            this._setPivotY(t), this.repaint();
        }), s(0, n, "alpha", function() {
            return this._getAlpha();
        }, function(t) {
            t = 0 > t ? 0 : t > 1 ? 1 : t, this._setAlpha(t);
        }), s(0, n, "visible", function() {
            return this._visible;
        }, function(t) {
            this._visible !== t && (this._visible = t, this.parentRepaint(3));
        }), s(0, n, "graphics", function() {
            return this._graphics || (this.graphics = new qt(), this._graphics.autoDestroy = !0), 
            this._graphics;
        }, function(t) {
            this._graphics && (this._graphics._sp = null), this._graphics = t, t ? (this._setGraphics(t), 
            this._renderType |= 512, t._sp = this) : this._renderType &= -513, this._setRenderType(this._renderType), 
            this.repaint();
        }), s(0, n, "filters", function() {
            return this._cacheStyle.filters;
        }, function(t) {
            t && 0 === t.length && (t = null), this._cacheStyle.filters != t && (this._getCacheStyle().filters = t ? t.slice() : null, 
            t && t.length ? (this._setColorFilter(t[0]), this._renderType |= 16) : (this._setColorFilter(null), 
            this._renderType &= -17), this._setRenderType(this._renderType), t && t.length > 0 ? (this._getBit(16) || this._setBitUp(16), 
            1 == t.length && t[0] instanceof laya.filters.ColorFilter || (this._getCacheStyle().cacheForFilters = !0, 
            this._checkCanvasEnable())) : this._cacheStyle.cacheForFilters && (this._cacheStyle.cacheForFilters = !1, 
            this._checkCanvasEnable()), this._getCacheStyle().hasGlowFilter = this._isHaveGlowFilter(), 
            this.repaint());
        }), s(0, n, "mask", function() {
            return this._cacheStyle.mask;
        }, function(t) {
            t && this.mask && this.mask._cacheStyle.maskParent || (this._getCacheStyle().mask = t, 
            this._setMask(t), this._checkCanvasEnable(), t ? t._getCacheStyle().maskParent = this : this.mask && (this.mask._getCacheStyle().maskParent = null), 
            this._renderType |= 32, this._setRenderType(this._renderType), this.parentRepaint(3));
        }), s(0, n, "mouseEnabled", function() {
            return this._mouseState > 1;
        }, function(t) {
            this._mouseState = t ? 2 : 1;
        }), s(0, n, "globalScaleX", function() {
            for (var t = 1, e = this; e && e !== i.stage; ) t *= e.scaleX, e = e.parent;
            return t;
        }), s(0, n, "mouseX", function() {
            return this.getMousePoint().x;
        }), s(0, n, "mouseY", function() {
            return this.getMousePoint().y;
        }), s(0, n, "viewport", function() {
            return this._style.viewport;
        }, function(t) {
            if ("string" == typeof t) {
                var e;
                e = t.split(","), e.length > 3 && (t = new mt(parseFloat(e[0]), parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3])));
            }
            this.getStyle().viewport = t;
        }), e.fromImage = function(t) {
            return new e().loadImage(t);
        }, e;
    }(Ce), Ke = function(t) {
        function e() {
            e.__super.call(this);
        }
        return r(e, "laya.webgl.shader.BaseShader", t), e.activeShader = null, e.bindShader = null, 
        e;
    }(Ee), $e = function(t) {
        function e() {
            e.__super.call(this), this._width = -1, this._height = -1;
        }
        r(e, "laya.resource.Bitmap", t);
        var i = e.prototype;
        return i._getSource = function() {
            throw "Bitmap: must override it.";
        }, s(0, i, "width", function() {
            return this._width;
        }), s(0, i, "height", function() {
            return this._height;
        }), e;
    }(Ee), qe = function(t) {
        function e(t, i) {
            this._source = null, this._texW = 0, this._texH = 0, this.__destroyed = !1, this._discardTm = 0, 
            this.genID = 0, this.bitmap = {
                id: 0,
                _glTexture: null
            }, this.curUsedCovRate = 0, this.curUsedCovRateAtlas = 0, this.lastTouchTm = 0, 
            this.ri = null, e.__super.call(this), this._texW = t || C.atlasWidth, this._texH = i || C.atlasWidth, 
            this.bitmap.id = this.id, this.lock = !0;
        }
        r(e, "laya.webgl.text.TextTexture", t);
        var a = e.prototype;
        return a.recreateResource = function() {
            if (!this._source) {
                var t = Mt.isConchApp ? Pt.instance.getDefaultCommandEncoder() : wt.mainContext, e = this._source = t.createTexture();
                this.bitmap._glTexture = e, nt.bindTexture(t, 3553, e), t.texImage2D(3553, 0, 6408, this._texW, this._texH, 0, 6408, 5121, null), 
                t.texParameteri(3553, 10241, 9729), t.texParameteri(3553, 10240, 9729), t.texParameteri(3553, 10242, 33071), 
                t.texParameteri(3553, 10243, 33071), C.debugUV && this.fillWhite();
            }
        }, a.addChar = function(t, e, i, n) {
            if (C.isWan1Wan) return this.addCharCanvas(t, e, i, n);
            !this._source && this.recreateResource();
            var r = Mt.isConchApp ? Pt.instance.getDefaultCommandEncoder() : wt.mainContext;
            nt.bindTexture(r, 3553, this._source), !Mt.isConchApp && r.pixelStorei(37441, !0);
            var s = t.data;
            t.data instanceof Uint8ClampedArray && (s = new Uint8Array(s.buffer)), r.texSubImage2D(3553, 0, e, i, t.width, t.height, 6408, 5121, s), 
            !Mt.isConchApp && r.pixelStorei(37441, !1);
            var a = NaN, o = NaN, h = NaN, l = NaN;
            return Mt.isConchApp ? (a = e / this._texW, o = i / this._texH, h = (e + t.width) / this._texW, 
            l = (i + t.height) / this._texH) : (a = (e + 1) / this._texW, o = i / this._texH, 
            h = (e + t.width - 1) / this._texW, l = (i + t.height - 1) / this._texH), n = n || new Array(8), 
            n[0] = a, n[1] = o, n[2] = h, n[3] = o, n[4] = h, n[5] = l, n[6] = a, n[7] = l, 
            n;
        }, a.addCharCanvas = function(t, e, i, n) {
            !this._source && this.recreateResource();
            var r = Mt.isConchApp ? Pt.instance.getDefaultCommandEncoder() : wt.mainContext;
            nt.bindTexture(r, 3553, this._source), !Mt.isConchApp && r.pixelStorei(37441, !0), 
            r.texSubImage2D(3553, 0, e, i, 6408, 5121, t), !Mt.isConchApp && r.pixelStorei(37441, !1);
            var s = NaN, a = NaN, o = NaN, h = NaN;
            return Mt.isConchApp ? (s = e / this._texW, a = i / this._texH, o = (e + t.width) / this._texW, 
            h = (i + t.height) / this._texH) : (s = (e + 1) / this._texW, a = (i + 1) / this._texH, 
            o = (e + t.width - 1) / this._texW, h = (i + t.height - 1) / this._texH), n = n || new Array(8), 
            n[0] = s, n[1] = a, n[2] = o, n[3] = a, n[4] = o, n[5] = h, n[6] = s, n[7] = h, 
            n;
        }, a.fillWhite = function() {
            !this._source && this.recreateResource();
            var t = Mt.isConchApp ? Pt.instance.getDefaultCommandEncoder() : wt.mainContext, e = new Uint8Array(this._texW * this._texH * 4);
            e.fill(255), t.texSubImage2D(3553, 0, 0, 0, this._texW, this._texH, 6408, 5121, e);
        }, a.discard = function() {
            return this._texW != C.atlasWidth || this._texH != C.atlasWidth ? void this.destroy() : (this.genID++, 
            e.poolLen >= e.pool.length && (e.pool = e.pool.concat(new Array(10))), this._discardTm = i.stage.getFrameTm(), 
            void (e.pool[e.poolLen++] = this));
        }, a.destroy = function() {
            this.__destroyed = !0;
            var t = Mt.isConchApp ? Pt.instance.getDefaultCommandEncoder() : wt.mainContext;
            this._source && t.deleteTexture(this._source), this._source = null;
        }, a.touchRect = function(t, e) {
            this.lastTouchTm != e && (this.curUsedCovRate = 0, this.curUsedCovRateAtlas = 0, 
            this.lastTouchTm = e);
            var i = C.atlasWidth * C.atlasWidth, n = kt.atlasGridW * kt.atlasGridW;
            this.curUsedCovRate += t.bmpWidth * t.bmpHeight / i, this.curUsedCovRateAtlas += Math.ceil(t.bmpWidth / kt.atlasGridW) * Math.ceil(t.bmpHeight / kt.atlasGridW) / (i / n);
        }, a._getSource = function() {
            return this._source;
        }, a.drawOnScreen = function(t, e) {}, s(0, a, "texture", function() {
            return this;
        }), e.getTextTexture = function(t, i) {
            if (t != C.atlasWidth || t != C.atlasWidth) return new e(t, i);
            if (e.poolLen > 0) {
                var n = e.pool[--e.poolLen];
                return e.poolLen > 0 && e.clean(), n;
            }
            return new e(t, i);
        }, e.clean = function() {
            var t = i.stage.getFrameTm();
            if (0 === e.cleanTm && (e.cleanTm = t), t - e.cleanTm >= C.checkCleanTextureDt) {
                for (var n = 0; n < e.poolLen; n++) {
                    var r = e.pool[n];
                    t - r._discardTm >= C.destroyUnusedTextureDt && (r.destroy(), e.pool[n] = e.pool[e.poolLen - 1], 
                    e.poolLen--, n--);
                }
                e.cleanTm = t;
            }
        }, e.poolLen = 0, e.cleanTm = 0, n(e, [ "pool", function() {
            return this.pool = new Array(10);
        } ]), e;
    }(Ee), Qe = function(t) {
        function e(t) {
            this._uint16Array = null, void 0 === t && (t = 35044), e.__super.call(this), this._bufferUsage = t, 
            this._bufferType = 34963, this._buffer = new ArrayBuffer(8);
        }
        r(e, "laya.webgl.utils.IndexBuffer2D", t);
        var i = e.prototype;
        return i._checkArrayUse = function() {
            this._uint16Array && (this._uint16Array = new Uint16Array(this._buffer));
        }, i.getUint16Array = function() {
            return this._uint16Array || (this._uint16Array = new Uint16Array(this._buffer));
        }, i._bindForVAO = function() {
            Pt.instance.bindBuffer(34963, this._glBuffer);
        }, i.bind = function() {
            return V._bindedIndexBuffer !== this._glBuffer ? (Pt.instance.bindBuffer(34963, this._glBuffer), 
            V._bindedIndexBuffer = this._glBuffer, !0) : !1;
        }, i.destory = function() {
            this._uint16Array = null, this._buffer = null;
        }, i.disposeResource = function() {
            this._disposeResource();
        }, e.create = function(t) {
            return void 0 === t && (t = 35044), new e(t);
        }, e;
    }(Le), Ze = function(t) {
        function e() {
            this.audioBuffer = null, this.gain = null, this.bufferSource = null, this._currentTime = 0, 
            this._volume = 1, this._startTime = 0, this._pauseTime = 0, this._onPlayEnd = null, 
            this.context = Fe.ctx, e.__super.call(this), this._onPlayEnd = ie.bind(this.__onPlayEnd, this), 
            this.context.createGain ? this.gain = this.context.createGain() : this.gain = this.context.createGainNode();
        }
        r(e, "laya.media.webaudio.WebAudioSoundChannel", t);
        var n = e.prototype;
        return n.play = function() {
            if (ye.addChannel(this), this.isStopped = !1, this._clearBufferSource(), this.audioBuffer) {
                var t = this.context, e = this.gain, i = t.createBufferSource();
                this.bufferSource = i, i.buffer = this.audioBuffer, i.connect(e), e && e.disconnect(), 
                e.connect(t.destination), i.onended = this._onPlayEnd, this.startTime >= this.duration && (this.startTime = 0), 
                this._startTime = Dt.now(), this.gain.gain.setTargetAtTime ? this.gain.gain.setTargetAtTime(this._volume, this.context.currentTime, .001) : this.gain.gain.value = this._volume, 
                0 == this.loops && (i.loop = !0), i.playbackRate.setTargetAtTime ? i.playbackRate.setTargetAtTime(ye.playbackRate, this.context.currentTime, .001) : i.playbackRate.value = ye.playbackRate, 
                i.start(0, this.startTime), this._currentTime = 0;
            }
        }, n.__onPlayEnd = function() {
            return 1 == this.loops ? (this.completeHandler && (i.timer.once(10, this, this.__runComplete, [ this.completeHandler ], !1), 
            this.completeHandler = null), this.stop(), void this.event("complete")) : (this.loops > 0 && this.loops--, 
            this.startTime = 0, void this.play());
        }, n._clearBufferSource = function() {
            if (this.bufferSource) {
                var t = this.bufferSource;
                t.stop ? t.stop(0) : t.noteOff(0), t.disconnect(0), t.onended = null, e._tryCleanFailed || this._tryClearBuffer(t), 
                this.bufferSource = null;
            }
        }, n._tryClearBuffer = function(t) {
            if (Dt.onMac) try {
                t.buffer = Fe._miniBuffer;
            } catch (i) {
                e._tryCleanFailed = !0;
            } else try {
                t.buffer = null;
            } catch (i) {
                e._tryCleanFailed = !0;
            }
        }, n.stop = function() {
            t.prototype.stop.call(this), this._clearBufferSource(), this.audioBuffer = null, 
            this.gain && this.gain.disconnect(), this.isStopped = !0, ye.removeChannel(this), 
            this.completeHandler = null, ye.autoReleaseSound && ye.disposeSoundLater(this.url);
        }, n.pause = function() {
            this.isStopped || (this._pauseTime = this.position), this._clearBufferSource(), 
            this.gain && this.gain.disconnect(), this.isStopped = !0, ye.removeChannel(this), 
            ye.autoReleaseSound && ye.disposeSoundLater(this.url);
        }, n.resume = function() {
            this.startTime = this._pauseTime, this.play();
        }, s(0, n, "position", function() {
            return this.bufferSource ? (Dt.now() - this._startTime) / 1e3 + this.startTime : 0;
        }), s(0, n, "duration", function() {
            return this.audioBuffer ? this.audioBuffer.duration : 0;
        }), s(0, n, "volume", function() {
            return this._volume;
        }, function(t) {
            this._volume = t, this.isStopped || (this.gain.gain.setTargetAtTime ? this.gain.gain.setTargetAtTime(t, this.context.currentTime, .001) : this.gain.gain.value = t);
        }), e._tryCleanFailed = !1, e.SetTargetDelay = .001, e;
    }(Ae), Je = function(t) {
        function e(t) {
            this._audio = null, this._onEnd = null, this._resumePlay = null, e.__super.call(this), 
            this._onEnd = ie.bind(this.__onEnd, this), this._resumePlay = ie.bind(this.__resumePlay, this), 
            t.addEventListener("ended", this._onEnd), this._audio = t;
        }
        r(e, "laya.media.h5audio.AudioSoundChannel", t);
        var n = e.prototype;
        return n.__onEnd = function() {
            return 1 == this.loops ? (this.completeHandler && (i.systemTimer.once(10, this, this.__runComplete, [ this.completeHandler ], !1), 
            this.completeHandler = null), this.stop(), void this.event("complete")) : (this.loops > 0 && this.loops--, 
            this.startTime = 0, void this.play());
        }, n.__resumePlay = function() {
            if (this._audio && this._audio.removeEventListener("canplay", this._resumePlay), 
            !this.isStopped) try {
                this._audio.currentTime = this.startTime, Dt.container.appendChild(this._audio), 
                this._audio.play();
            } catch (t) {
                this.event("error");
            }
        }, n.play = function() {
            this.isStopped = !1;
            try {
                this._audio.playbackRate = ye.playbackRate, this._audio.currentTime = this.startTime;
            } catch (t) {
                return void this._audio.addEventListener("canplay", this._resumePlay);
            }
            ye.addChannel(this), Dt.container.appendChild(this._audio), "play" in this._audio && this._audio.play();
        }, n.stop = function() {
            t.prototype.stop.call(this), this.isStopped = !0, ye.removeChannel(this), this.completeHandler = null, 
            this._audio && ("pause" in this._audio && Mt.isConchApp && this._audio.stop(), this._audio.pause(), 
            this._audio.removeEventListener("ended", this._onEnd), this._audio.removeEventListener("canplay", this._resumePlay), 
            Dt.onIE || this._audio != we._musicAudio && U.recover("audio:" + this.url, this._audio), 
            Dt.removeElement(this._audio), this._audio = null);
        }, n.pause = function() {
            this.isStopped = !0, ye.removeChannel(this), "pause" in this._audio && this._audio.pause();
        }, n.resume = function() {
            this._audio && (this.isStopped = !1, ye.addChannel(this), "play" in this._audio && this._audio.play());
        }, s(0, n, "position", function() {
            return this._audio ? this._audio.currentTime : 0;
        }), s(0, n, "duration", function() {
            return this._audio ? this._audio.duration : 0;
        }), s(0, n, "volume", function() {
            return this._audio ? this._audio.volume : 1;
        }, function(t) {
            this._audio && (this._audio.volume = t);
        }), e;
    }(Ae), ti = function(t) {
        function e(t, i) {
            this._floatArray32 = null, this._uint32Array = null, this._vertexStride = 0, e.__super.call(this), 
            this._vertexStride = t, this._bufferUsage = i, this._bufferType = 34962, this._buffer = new ArrayBuffer(8), 
            this._floatArray32 = new Float32Array(this._buffer), this._uint32Array = new Uint32Array(this._buffer);
        }
        r(e, "laya.webgl.utils.VertexBuffer2D", t);
        var i = e.prototype;
        return i.getFloat32Array = function() {
            return this._floatArray32;
        }, i.appendArray = function(t) {
            var e = this._byteLength >> 2;
            this.setByteLength(this._byteLength + 4 * t.length);
            var i = this.getFloat32Array();
            i.set(t, e), this._upload = !0;
        }, i._checkArrayUse = function() {
            this._floatArray32 && (this._floatArray32 = new Float32Array(this._buffer)), this._uint32Array && (this._uint32Array = new Uint32Array(this._buffer));
        }, i.deleteBuffer = function() {
            this._disposeResource();
        }, i._bindForVAO = function() {
            Pt.instance.bindBuffer(34962, this._glBuffer);
        }, i.bind = function() {
            return V._bindedVertexBuffer !== this._glBuffer ? (Pt.instance.bindBuffer(34962, this._glBuffer), 
            V._bindedVertexBuffer = this._glBuffer, !0) : !1;
        }, i.destroy = function() {
            laya.webgl.utils.Buffer.prototype.destroy.call(this), this._byteLength = 0, this._upload = !0, 
            this._buffer = null, this._floatArray32 = null;
        }, s(0, i, "vertexStride", function() {
            return this._vertexStride;
        }), e.create = function(t, i) {
            return void 0 === i && (i = 35048), new e(t, i);
        }, e;
    }(Le), ei = function(e) {
        function a() {
            this._clipPoint = null, this._text = null, this._isChanged = !1, this._textWidth = 0, 
            this._textHeight = 0, this._lines = [], this._lineWidths = [], this._startX = 0, 
            this._startY = 0, this._words = null, this._charSize = {}, this._valign = "top", 
            this._color = "#000000", this._singleCharRender = !1, a.__super.call(this), this._fontSize = a.defaultFontSize, 
            this._font = a.defaultFont, this.overflow = "visible", this._style = We.EMPTY;
        }
        r(a, "laya.display.Text", e);
        var o = a.prototype;
        return o.getStyle = function() {
            return this._style === We.EMPTY && (this._style = We.create()), this._style;
        }, o._getTextStyle = function() {
            return this._style === We.EMPTY && (this._style = We.create()), this._style;
        }, o.destroy = function(t) {
            void 0 === t && (t = !0), e.prototype.destroy.call(this, t), this._clipPoint = null, 
            this._lines = null, this._lineWidths = null, this._words && this._words.forEach(function(t) {
                t.cleanCache();
            }), this._words = null, this._charSize = null;
        }, o._getBoundPointsM = function(t) {
            void 0 === t && (t = !1);
            var e = mt.TEMP;
            return e.setTo(0, 0, this.width, this.height), e._getBoundPoints();
        }, o.getGraphicBounds = function(t) {
            void 0 === t && (t = !1);
            var e = mt.TEMP;
            return e.setTo(0, 0, this.width, this.height), e;
        }, o._getCSSStyle = function() {
            return this._style;
        }, o.lang = function(t, e, i, n, r, s, o, h, l, u, c) {
            if (t = a.langPacks && a.langPacks[t] ? a.langPacks[t] : t, arguments.length < 2) this._text = t; else {
                for (var _ = 0, d = arguments.length; d > _; _++) t = t.replace("{" + _ + "}", arguments[_ + 1]);
                this._text = t;
            }
        }, o._getContextFont = function() {
            return (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + (Dt.onIPhone ? laya.display.Text.fontFamilyMap[this.font] || this.font : this.font);
        }, o._isPassWordMode = function() {
            var t = this._style, e = t.asPassword;
            return "prompt" in this && this.prompt == this._text && (e = !1), e;
        }, o._getPassWordTxt = function(t) {
            var e, i = t.length;
            e = "";
            for (var n = i; n > 0; n--) e += "●";
            return e;
        }, o._renderText = function() {
            var t = this.padding, e = this._lines.length;
            "visible" != this.overflow && (e = Math.min(e, Math.floor((this.height - t[0] - t[2]) / (this.leading + this._charSize.height)) + 1));
            var i = this.scrollY / (this._charSize.height + this.leading) | 0, n = this.graphics;
            n.clear(!0);
            var r = this._getContextFont();
            Dt.context.font = r;
            var s = t[3], a = "left", o = this._lines, h = this.leading + this._charSize.height, l = this._style.currBitmapFont;
            l && (h = this.leading + l.getMaxHeight());
            var u = t[0];
            if (!l && this._width > 0 && this._textWidth <= this._width && ("right" == this.align ? (a = "right", 
            s = this._width - t[1]) : "center" == this.align && (a = "center", s = .5 * this._width + t[3] - t[1])), 
            this._height > 0) {
                var c = this._textHeight > this._height ? "top" : this.valign;
                "middle" === c ? u = .5 * (this._height - e * h) + t[0] - t[2] : "bottom" === c && (u = this._height - e * h - t[2]);
            }
            var _ = this._style;
            if (l && l.autoScaleSize) var d = l.fontSize / this.fontSize;
            if (this._clipPoint) {
                if (n.save(), l && l.autoScaleSize) {
                    var f = 0, p = 0;
                    f = this._width ? this._width - t[3] - t[1] : this._textWidth, p = this._height ? this._height - t[0] - t[2] : this._textHeight, 
                    f *= d, p *= d, n.clipRect(t[3], t[0], f, p);
                } else n.clipRect(t[3], t[0], this._width ? this._width - t[3] - t[1] : this._textWidth, this._height ? this._height - t[0] - t[2] : this._textHeight);
                this.repaint();
            }
            var m = _.asPassword;
            "prompt" in this && this.prompt == this._text && (m = !1);
            for (var g = 0, v = 0, y = Math.min(this._lines.length, e + i) || 1, x = i; y > x; x++) {
                var b, w = o[x];
                if (m) {
                    var C = w.length;
                    w = "";
                    for (var A = C; A > 0; A--) w += "●";
                }
                if (null == w && (w = ""), g = s - (this._clipPoint ? this._clipPoint.x : 0), v = u + h * x - (this._clipPoint ? this._clipPoint.y : 0), 
                this.underline && this._drawUnderline(a, g, v, x), l) {
                    var E = this.width;
                    l.autoScaleSize && (E = this.width * d), l._drawText(w, this, g, v, this.align, E);
                } else this._words || (this._words = []), this._words.length > x - i ? b = this._words[x - i] : (b = new T(), 
                this._words.push(b)), b.setText(w), b.splitRender = this._singleCharRender, _.stroke ? n.fillBorderText(b, g, v, r, this.color, _.strokeColor, _.stroke, a) : n.fillText(b, g, v, r, this.color, a);
            }
            if (l && l.autoScaleSize) {
                var S = 1 / d;
                this.scale(S, S);
            }
            this._clipPoint && n.restore(), this._startX = s, this._startY = u;
        }, o._drawUnderline = function(t, e, i, n) {
            var r = this._lineWidths[n];
            switch (t) {
              case "center":
                e -= r / 2;
                break;

              case "right":
                e -= r;
                break;

              case "left":
            }
            i += this._charSize.height, this._graphics.drawLine(e, i, e + r, i, this.underlineColor || this.color, 1);
        }, o.typeset = function() {
            return this._isChanged = !1, this._text ? (Mt.isConchApp ? t.conchTextCanvas.font = this._getContextFont() : Dt.context.font = this._getContextFont(), 
            this._lines.length = 0, this._lineWidths.length = 0, this._isPassWordMode() ? this._parseLines(this._getPassWordTxt(this._text)) : this._parseLines(this._text), 
            this._evalTextSize(), this._checkEnabledViewportOrNot() ? this._clipPoint || (this._clipPoint = new Yt(0, 0)) : this._clipPoint = null, 
            void this._renderText()) : (this._clipPoint = null, this._textWidth = this._textHeight = 0, 
            void this.graphics.clear(!0));
        }, o._evalTextSize = function() {
            var t = NaN, e = NaN;
            t = Math.max.apply(this, this._lineWidths), e = this._style.currBitmapFont ? this._lines.length * (this._style.currBitmapFont.getMaxHeight() + this.leading) + this.padding[0] + this.padding[2] : this._lines.length * (this._charSize.height + this.leading) + this.padding[0] + this.padding[2], 
            (t != this._textWidth || e != this._textHeight) && (this._textWidth = t, this._textHeight = e);
        }, o._checkEnabledViewportOrNot = function() {
            return "scroll" == this.overflow && (this._width > 0 && this._textWidth > this._width || this._height > 0 && this._textHeight > this._height);
        }, o.changeText = function(t) {
            this._text !== t && (this.lang(t + ""), this._graphics && this._graphics.replaceText(this._text) || this.typeset());
        }, o._parseLines = function(e) {
            var i = this.wordWrap || "hidden" == this.overflow;
            if (i) var n = this._getWordWrapWidth();
            var r = this._style.currBitmapFont;
            if (r) this._charSize.width = r.getMaxWidth(), this._charSize.height = r.getMaxHeight(); else {
                var s = null;
                s = Mt.isConchApp ? t.conchTextCanvas.measureText(this._testWord) : Dt.context.measureText(a._testWord), 
                s || (s = {
                    width: 100
                }), this._charSize.width = s.width, this._charSize.height = s.height || this.fontSize;
            }
            for (var o = e.replace(/\r\n/g, "\n").split("\n"), h = 0, l = o.length; l > h; h++) {
                var u = o[h];
                i ? this._parseLine(u, n) : (this._lineWidths.push(this._getTextWidth(u)), this._lines.push(u));
            }
        }, o._parseLine = function(t, e) {
            var i, n = (Dt.context, this._lines), r = 0, s = NaN, a = NaN, o = 0;
            if (s = this._getTextWidth(t), e >= s) return n.push(t), void this._lineWidths.push(s);
            s = this._charSize.width, r = Math.floor(e / s), 0 == r && (r = 1), s = this._getTextWidth(t.substring(0, r)), 
            a = s;
            for (var h = r, l = t.length; l > h; h++) if (s = this._getTextWidth(t.charAt(h)), 
            a += s, a > e) if (this.wordWrap) {
                var u = t.substring(o, h);
                if (u.charCodeAt(u.length - 1) < 255 && (i = /(?:\w|-)+$/.exec(u), i && (h = i.index + o, 
                0 == i.index ? h += u.length : u = t.substring(o, h))), n.push(u), this._lineWidths.push(a - s), 
                o = h, !(l > h + r)) {
                    n.push(t.substring(o, l)), this._lineWidths.push(this._getTextWidth(n[n.length - 1])), 
                    o = -1;
                    break;
                }
                h += r, s = this._getTextWidth(t.substring(o, h)), a = s, h--;
            } else if ("hidden" == this.overflow) return n.push(t.substring(0, h)), void this._lineWidths.push(this._getTextWidth(n[n.length - 1]));
            this.wordWrap && -1 != o && (n.push(t.substring(o, l)), this._lineWidths.push(this._getTextWidth(n[n.length - 1])));
        }, o._getTextWidth = function(e) {
            var i = this._style.currBitmapFont;
            return i ? i.getTextWidth(e) : Mt.isConchApp ? t.conchTextCanvas.measureText(e).width : Dt.context.measureText(e).width;
        }, o._getWordWrapWidth = function() {
            var t = this.padding, e = NaN, i = this._style.currBitmapFont;
            return e = i && i.autoScaleSize ? this._width * (i.fontSize / this.fontSize) : this._width, 
            0 >= e && (e = this.wordWrap ? 100 : Dt.width), 0 >= e && (e = 100), e - t[3] - t[1];
        }, o.getCharPoint = function(t, e) {
            this._isChanged && i.systemTimer.runCallLater(this, this.typeset);
            for (var n = 0, r = this._lines, s = 0, a = 0, o = r.length; o > a; a++) {
                if (n += r[a].length, n > t) {
                    var h = a;
                    break;
                }
                s = n;
            }
            var l = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + this.font;
            Dt.context.font = l;
            var u = this._getTextWidth(this._text.substring(s, t)), c = e || new Yt();
            return c.setTo(this._startX + u - (this._clipPoint ? this._clipPoint.x : 0), this._startY + h * (this._charSize.height + this.leading) - (this._clipPoint ? this._clipPoint.y : 0));
        }, s(0, o, "width", function() {
            return this._width ? this._width : this.textWidth + this.padding[1] + this.padding[3];
        }, function(t) {
            t != this._width && (i.superSet(je, this, "width", t), this.isChanged = !0, this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1));
        }), s(0, o, "textWidth", function() {
            return this._isChanged && i.systemTimer.runCallLater(this, this.typeset), this._textWidth;
        }), s(0, o, "height", function() {
            return this._height ? this._height : this.textHeight;
        }, function(t) {
            t != this._height && (i.superSet(je, this, "height", t), this.isChanged = !0, this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1));
        }), s(0, o, "textHeight", function() {
            return this._isChanged && i.systemTimer.runCallLater(this, this.typeset), this._textHeight;
        }), s(0, o, "padding", function() {
            return this._style.padding;
        }, function(t) {
            if ("string" == typeof t) {
                var e;
                e = t.split(",");
                var i = 0, n = 0;
                for (n = e.length; e.length < 4; ) e.push(0);
                for (i = 0; n > i; i++) e[i] = parseFloat(e[i]) || 0;
                t = e;
            }
            this._getTextStyle().padding = t, this.isChanged = !0;
        }), s(0, o, "bold", function() {
            return this._style.bold;
        }, function(t) {
            this._getTextStyle().bold = t, this.isChanged = !0;
        }), s(0, o, "text", function() {
            return this._text || "";
        }, function(t) {
            this._text !== t && (this.lang(t + ""), this.isChanged = !0, this.event("change"), 
            this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1));
        }), s(0, o, "color", function() {
            return this._color;
        }, function(t) {
            this._color != t && (this._color = t, !this._isChanged && this._graphics ? this._graphics.replaceTextColor(this.color) : this.isChanged = !0);
        }), s(0, o, "font", function() {
            return this._font;
        }, function(t) {
            this._style.currBitmapFont && (this._getTextStyle().currBitmapFont = null, this.scale(1, 1)), 
            a._bitmapFonts && a._bitmapFonts[t] && (this._getTextStyle().currBitmapFont = a._bitmapFonts[t]), 
            this._font = t, this.isChanged = !0;
        }), s(0, o, "fontSize", function() {
            return this._fontSize;
        }, function(t) {
            this._fontSize != t && (this._fontSize = t, this.isChanged = !0);
        }), s(0, o, "italic", function() {
            return this._style.italic;
        }, function(t) {
            this._getTextStyle().italic = t, this.isChanged = !0;
        }), s(0, o, "align", function() {
            return this._style.align;
        }, function(t) {
            this._getTextStyle().align = t, this.isChanged = !0;
        }), s(0, o, "valign", function() {
            return this._valign;
        }, function(t) {
            this._valign = t, this.isChanged = !0;
        }), s(0, o, "wordWrap", function() {
            return this._style.wordWrap;
        }, function(t) {
            this._getTextStyle().wordWrap = t, this.isChanged = !0;
        }), s(0, o, "singleCharRender", function() {
            return this._singleCharRender;
        }, function(t) {
            this._singleCharRender = t;
        }), s(0, o, "leading", function() {
            return this._style.leading;
        }, function(t) {
            this._getTextStyle().leading = t, this.isChanged = !0;
        }), s(0, o, "bgColor", function() {
            return this._style.bgColor;
        }, function(t) {
            this._getTextStyle().bgColor = t, this._renderType |= 128, this._setBgStyleColor(0, 0, this.width, this.height, t), 
            this._setRenderType(this._renderType), this.isChanged = !0;
        }), s(0, o, "borderColor", function() {
            return this._style.borderColor;
        }, function(t) {
            this._getTextStyle().borderColor = t, this._renderType |= 128, this._setBorderStyleColor(0, 0, this.width, this.height, t, 1), 
            this._setRenderType(this._renderType), this.isChanged = !0;
        }), s(0, o, "stroke", function() {
            return this._style.stroke;
        }, function(t) {
            this._getTextStyle().stroke = t, this.isChanged = !0;
        }), s(0, o, "strokeColor", function() {
            return this._style.strokeColor;
        }, function(t) {
            this._getTextStyle().strokeColor = t, this.isChanged = !0;
        }), s(0, o, "isChanged", null, function(t) {
            this._isChanged !== t && (this._isChanged = t, t && i.systemTimer.callLater(this, this.typeset));
        }), s(0, o, "scrollX", function() {
            return this._clipPoint ? this._clipPoint.x : 0;
        }, function(t) {
            if (!("scroll" != this.overflow || this.textWidth < this._width) && this._clipPoint) {
                t = t < this.padding[3] ? this.padding[3] : t;
                var e = this._textWidth - this._width;
                t = t > e ? e : t, this._clipPoint.x = t, this._renderText();
            }
        }), s(0, o, "scrollY", function() {
            return this._clipPoint ? this._clipPoint.y : 0;
        }, function(t) {
            if (!("scroll" != this.overflow || this.textHeight < this._height) && this._clipPoint) {
                t = t < this.padding[0] ? this.padding[0] : t;
                var e = this._textHeight - this._height;
                t = t > e ? e : t, this._clipPoint.y = t, this._renderText();
            }
        }), s(0, o, "maxScrollX", function() {
            return this.textWidth < this._width ? 0 : this._textWidth - this._width;
        }), s(0, o, "maxScrollY", function() {
            return this.textHeight < this._height ? 0 : this._textHeight - this._height;
        }), s(0, o, "lines", function() {
            return this._isChanged && this.typeset(), this._lines;
        }), s(0, o, "underlineColor", function() {
            return this._style.underlineColor;
        }, function(t) {
            this._getTextStyle().underlineColor = t, this._isChanged || this._renderText();
        }), s(0, o, "underline", function() {
            return this._style.underline;
        }, function(t) {
            this._getTextStyle().underline = t;
        }), a.defaultFontStr = function() {
            return a.defaultFontSize + "px " + a.defaultFont;
        }, a.registerBitmapFont = function(t, e) {
            a._bitmapFonts || (a._bitmapFonts = {}), a._bitmapFonts[t] = e;
        }, a.unregisterBitmapFont = function(t, e) {
            if (void 0 === e && (e = !0), a._bitmapFonts && a._bitmapFonts[t]) {
                var i = a._bitmapFonts[t];
                e && i.destroy(), delete a._bitmapFonts[t];
            }
        }, a.VISIBLE = "visible", a.SCROLL = "scroll", a.HIDDEN = "hidden", a.defaultFontSize = 12, 
        a.defaultFont = "Arial", a.langPacks = null, a.isComplexText = !1, a._testWord = "游", 
        a._bitmapFonts = null, a.CharacterCache = !0, a.RightToLeft = !1, n(a, [ "fontFamilyMap", function() {
            return this.fontFamilyMap = {
                "报隶": "报隶-简",
                "黑体": "黑体-简",
                "楷体": "楷体-简",
                "兰亭黑": "兰亭黑-简",
                "隶变": "隶变-简",
                "凌慧体": "凌慧体-简",
                "翩翩体": "翩翩体-简",
                "苹方": "苹方-简",
                "手札体": "手札体-简",
                "宋体": "宋体-简",
                "娃娃体": "娃娃体-简",
                "魏碑": "魏碑-简",
                "行楷": "行楷-简",
                "雅痞": "雅痞-简",
                "圆体": "圆体-简"
            };
        } ]), a;
    }(je), ii = function(t) {
        function e() {
            this.loop = !1, this.wrapMode = 0, this._index = 0, this._count = 0, this._isPlaying = !1, 
            this._labels = null, this._isReverse = !1, this._frameRateChanged = !1, this._actionName = null, 
            this._controlNode = null, e.__super.call(this), this._interval = se.animationInterval, 
            this._setBitUp(16);
        }
        r(e, "laya.display.AnimationBase", t);
        var i = e.prototype;
        return i.play = function(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = !0), void 0 === i && (i = ""), this._isPlaying = !0, 
            this._actionName = i, this.index = "string" == typeof t ? this._getFrameByLabel(t) : t, 
            this.loop = e, this._isReverse = 1 === this.wrapMode, 0 == this.index && this._isReverse && (this.index = this.count - 1), 
            this.interval > 0 && this.timerLoop(this.interval, this, this._frameLoop, null, !0, !0);
        }, i._getFrameByLabel = function(t) {
            for (var e = 0; e < this._count; e++) {
                var i = this._labels[e];
                if (i && i.indexOf(t) > -1) return e;
            }
            return 0;
        }, i._frameLoop = function() {
            if (this._isReverse) {
                if (this._index--, this._index < 0) {
                    if (!this.loop) return this._index = 0, this.stop(), void this.event("complete");
                    2 == this.wrapMode ? (this._index = this._count > 0 ? 1 : 0, this._isReverse = !1) : this._index = this._count - 1, 
                    this.event("complete");
                }
            } else if (this._index++, this._index >= this._count) {
                if (!this.loop) return this._index--, this.stop(), void this.event("complete");
                2 == this.wrapMode ? (this._index = this._count - 2 >= 0 ? this._count - 2 : 0, 
                this._isReverse = !0) : this._index = 0, this.event("complete");
            }
            this.index = this._index;
        }, i._setControlNode = function(t) {
            this._controlNode && (this._controlNode.off("display", this, this._resumePlay), 
            this._controlNode.off("undisplay", this, this._resumePlay)), this._controlNode = t, 
            t && t != this && (t.on("display", this, this._resumePlay), t.on("undisplay", this, this._resumePlay));
        }, i._setDisplay = function(e) {
            t.prototype._setDisplay.call(this, e), this._resumePlay();
        }, i._resumePlay = function() {
            this._isPlaying && (this._controlNode.displayedInStage ? this.play(this._index, this.loop, this._actionName) : this.clearTimer(this, this._frameLoop));
        }, i.stop = function() {
            this._isPlaying = !1, this.clearTimer(this, this._frameLoop);
        }, i.addLabel = function(t, e) {
            this._labels || (this._labels = {}), this._labels[e] || (this._labels[e] = []), 
            this._labels[e].push(t);
        }, i.removeLabel = function(t) {
            if (t) {
                if (this._labels) for (var e in this._labels) this._removeLabelFromList(this._labels[e], t);
            } else this._labels = null;
        }, i._removeLabelFromList = function(t, e) {
            if (t) for (var i = t.length - 1; i >= 0; i--) t[i] == e && t.splice(i, 1);
        }, i.gotoAndStop = function(t) {
            this.index = "string" == typeof t ? this._getFrameByLabel(t) : t, this.stop();
        }, i._displayToIndex = function(t) {}, i.clear = function() {
            return this.stop(), this._labels = null, this;
        }, s(0, i, "interval", function() {
            return this._interval;
        }, function(t) {
            this._interval != t && (this._frameRateChanged = !0, this._interval = t, this._isPlaying && t > 0 && this.timerLoop(t, this, this._frameLoop, null, !0, !0));
        }), s(0, i, "isPlaying", function() {
            return this._isPlaying;
        }), s(0, i, "index", function() {
            return this._index;
        }, function(t) {
            if (this._index = t, this._displayToIndex(t), this._labels && this._labels[t]) for (var e = this._labels[t], i = 0, n = e.length; n > i; i++) this.event("label", e[i]);
        }), s(0, i, "count", function() {
            return this._count;
        }), e.WRAP_POSITIVE = 0, e.WRAP_REVERSE = 1, e.WRAP_PINGPONG = 2, e;
    }(je), ni = function(t) {
        function e(t, i, n, r, s) {
            if (this._attribInfo = null, this.customCompile = !1, this._curActTexIndex = 0, 
            this.tag = {}, this._program = null, this._params = null, this._paramsMap = {}, 
            e.__super.call(this), !t || !i) throw "Shader Error";
            this._attribInfo = s, this._id = ++e._count, this._vs = t, this._ps = i, this._nameMap = r ? r : {}, 
            null != n && (e.sharders[n] = this), this.recreateResource(), this.lock = !0;
        }
        r(e, "laya.webgl.shader.Shader", t);
        var i = e.prototype;
        return i.recreateResource = function() {
            this._compile(), this._setGPUMemory(0);
        }, i._disposeResource = function() {
            wt.mainContext.deleteShader(this._vshader), wt.mainContext.deleteShader(this._pshader), 
            wt.mainContext.deleteProgram(this._program), this._vshader = this._pshader = this._program = null, 
            this._params = null, this._paramsMap = {}, this._setGPUMemory(0), this._curActTexIndex = 0;
        }, i._compile = function() {
            if (this._vs && this._ps && !this._params) {
                this._reCompile = !0, this._params = [];
                var t;
                this.customCompile && (t = pe.preGetParams(this._vs, this._ps));
                var i = wt.mainContext;
                this._program = i.createProgram(), this._vshader = e._createShader(i, this._vs, 35633), 
                this._pshader = e._createShader(i, this._ps, 35632), i.attachShader(this._program, this._vshader), 
                i.attachShader(this._program, this._pshader);
                var n, r, s = 0, a = 0, o = this._attribInfo ? this._attribInfo.length : 0;
                for (s = 0; o > s; s += 2) i.bindAttribLocation(this._program, this._attribInfo[s + 1], this._attribInfo[s]);
                if (i.linkProgram(this._program), !this.customCompile && !i.getProgramParameter(this._program, 35714)) throw i.getProgramInfoLog(this._program);
                var h = this.customCompile ? t.uniforms.length : i.getProgramParameter(this._program, 35718);
                for (s = 0; h > s; s++) {
                    var l = this.customCompile ? t.uniforms[s] : i.getActiveUniform(this._program, s);
                    r = i.getUniformLocation(this._program, l.name), n = {
                        vartype: "uniform",
                        glfun: null,
                        ivartype: 1,
                        location: r,
                        name: l.name,
                        type: l.type,
                        isArray: !1,
                        isSame: !1,
                        preValue: null,
                        indexOfParams: 0
                    }, n.name.indexOf("[0]") > 0 && (n.name = n.name.substr(0, n.name.length - 3), n.isArray = !0, 
                    n.location = i.getUniformLocation(this._program, n.name)), this._params.push(n);
                }
                for (s = 0, a = this._params.length; a > s; s++) switch (n = this._params[s], n.indexOfParams = s, 
                n.index = 1, n.value = [ n.location, null ], n.codename = n.name, n.name = this._nameMap[n.codename] ? this._nameMap[n.codename] : n.codename, 
                this._paramsMap[n.name] = n, n._this = this, n.uploadedValue = [], n.type) {
                  case 5124:
                    n.fun = n.isArray ? this._uniform1iv : this._uniform1i;
                    break;

                  case 5126:
                    n.fun = n.isArray ? this._uniform1fv : this._uniform1f;
                    break;

                  case 35664:
                    n.fun = n.isArray ? this._uniform_vec2v : this._uniform_vec2;
                    break;

                  case 35665:
                    n.fun = n.isArray ? this._uniform_vec3v : this._uniform_vec3;
                    break;

                  case 35666:
                    n.fun = n.isArray ? this._uniform_vec4v : this._uniform_vec4;
                    break;

                  case 35678:
                    n.fun = this._uniform_sampler2D;
                    break;

                  case 35680:
                    n.fun = this._uniform_samplerCube;
                    break;

                  case 35676:
                    n.glfun = i.uniformMatrix4fv, n.fun = this._uniformMatrix4fv;
                    break;

                  case 35670:
                    n.fun = this._uniform1i;
                    break;

                  case 35674:
                  case 35675:
                    throw new Error("compile shader err!");

                  default:
                    throw new Error("compile shader err!");
                }
            }
        }, i.getUniform = function(t) {
            return this._paramsMap[t];
        }, i._uniform1f = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (wt.mainContext.uniform1f(t.location, i[0] = e), 1) : 0;
        }, i._uniform1fv = function(t, e) {
            if (e.length < 4) {
                var i = t.uploadedValue;
                return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (wt.mainContext.uniform1fv(t.location, e), 
                i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], 1) : 0;
            }
            return wt.mainContext.uniform1fv(t.location, e), 1;
        }, i._uniform_vec2 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (wt.mainContext.uniform2f(t.location, i[0] = e[0], i[1] = e[1]), 
            1) : 0;
        }, i._uniform_vec2v = function(t, e) {
            if (e.length < 2) {
                var i = t.uploadedValue;
                return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (wt.mainContext.uniform2fv(t.location, e), 
                i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], 1) : 0;
            }
            return wt.mainContext.uniform2fv(t.location, e), 1;
        }, i._uniform_vec3 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (wt.mainContext.uniform3f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]), 
            1) : 0;
        }, i._uniform_vec3v = function(t, e) {
            return wt.mainContext.uniform3fv(t.location, e), 1;
        }, i._uniform_vec4 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (wt.mainContext.uniform4f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]), 
            1) : 0;
        }, i._uniform_vec4v = function(t, e) {
            return wt.mainContext.uniform4fv(t.location, e), 1;
        }, i._uniformMatrix2fv = function(t, e) {
            return wt.mainContext.uniformMatrix2fv(t.location, !1, e), 1;
        }, i._uniformMatrix3fv = function(t, e) {
            return wt.mainContext.uniformMatrix3fv(t.location, !1, e), 1;
        }, i._uniformMatrix4fv = function(t, e) {
            return wt.mainContext.uniformMatrix4fv(t.location, !1, e), 1;
        }, i._uniform1i = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (wt.mainContext.uniform1i(t.location, i[0] = e), 1) : 0;
        }, i._uniform1iv = function(t, e) {
            return wt.mainContext.uniform1iv(t.location, e), 1;
        }, i._uniform_ivec2 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (wt.mainContext.uniform2i(t.location, i[0] = e[0], i[1] = e[1]), 
            1) : 0;
        }, i._uniform_ivec2v = function(t, e) {
            return wt.mainContext.uniform2iv(t.location, e), 1;
        }, i._uniform_vec3i = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (wt.mainContext.uniform3i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]), 
            1) : 0;
        }, i._uniform_vec3vi = function(t, e) {
            return wt.mainContext.uniform3iv(t.location, e), 1;
        }, i._uniform_vec4i = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (wt.mainContext.uniform4i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]), 
            1) : 0;
        }, i._uniform_vec4vi = function(t, e) {
            return wt.mainContext.uniform4iv(t.location, e), 1;
        }, i._uniform_sampler2D = function(t, e) {
            var i = wt.mainContext, n = t.uploadedValue;
            return null == n[0] ? (n[0] = this._curActTexIndex, i.uniform1i(t.location, this._curActTexIndex), 
            nt.activeTexture(i, 33984 + this._curActTexIndex), nt.bindTexture(i, 3553, e), this._curActTexIndex++, 
            1) : (nt.activeTexture(i, 33984 + n[0]), nt.bindTexture(i, 3553, e), 0);
        }, i._uniform_samplerCube = function(t, e) {
            var i = wt.mainContext, n = t.uploadedValue;
            return null == n[0] ? (n[0] = this._curActTexIndex, i.uniform1i(t.location, this._curActTexIndex), 
            nt.activeTexture(i, 33984 + this._curActTexIndex), nt.bindTexture(i, 34067, e), 
            this._curActTexIndex++, 1) : (nt.activeTexture(i, 33984 + n[0]), nt.bindTexture(i, 34067, e), 
            0);
        }, i._noSetValue = function(t) {
            console.log("no....:" + t.name);
        }, i.uploadOne = function(t, e) {
            nt.useProgram(wt.mainContext, this._program);
            var i = this._paramsMap[t];
            i.fun.call(this, i, e);
        }, i.uploadTexture2D = function(t) {
            var e = nt;
            e._activeTextures[0] !== t && (e.bindTexture(wt.mainContext, e.TEXTURE_2D, t), e._activeTextures[0] = t);
        }, i.upload = function(t, e) {
            Ke.activeShader = Ke.bindShader = this;
            var i = wt.mainContext;
            nt.useProgram(i, this._program), this._reCompile ? (e = this._params, this._reCompile = !1) : e = e || this._params;
            for (var n, r, s = e.length, a = 0, o = 0; s > o; o++) n = e[o], null !== (r = t[n.name]) && (a += n.fun.call(this, n, r));
            A.shaderCall += a;
        }, i.uploadArray = function(t, e, i) {
            Ke.activeShader = this, Ke.bindShader = this, nt.useProgram(wt.mainContext, this._program);
            for (var n, r, s = (this._params, 0), a = e - 2; a >= 0; a -= 2) r = this._paramsMap[t[a]], 
            r && (n = t[a + 1], null != n && (i && i[r.name] && i[r.name].bind(), s += r.fun.call(this, r, n)));
            A.shaderCall += s;
        }, i.getParams = function() {
            return this._params;
        }, i.setAttributesLocation = function(t) {
            this._attribInfo = t;
        }, e.getShader = function(t) {
            return e.sharders[t];
        }, e.create = function(t, i, n, r, s) {
            return new e(t, i, n, r, s);
        }, e.withCompile = function(t, i, n, r) {
            if (n && e.sharders[n]) return e.sharders[n];
            var s = e._preCompileShader[2e-4 * t];
            if (!s) throw new Error("withCompile shader err!" + t);
            return s.createShader(i, n, r, null);
        }, e.withCompile2D = function(t, i, n, r, s, a) {
            if (r && e.sharders[r]) return e.sharders[r];
            var o = e._preCompileShader[2e-4 * t + i];
            if (!o) throw new Error("withCompile shader err!" + t + " " + i);
            return o.createShader(n, r, s, a);
        }, e.addInclude = function(t, e) {
            pe.addInclude(t, e);
        }, e.preCompile = function(t, i, n, r) {
            var s = 2e-4 * t;
            e._preCompileShader[s] = new pe(i, n, r);
        }, e.preCompile2D = function(t, i, n, r, s) {
            var a = 2e-4 * t + i;
            e._preCompileShader[a] = new pe(n, r, s);
        }, e._createShader = function(t, e, i) {
            var n = t.createShader(i);
            return t.shaderSource(n, e), t.compileShader(n), t.getShaderParameter(n, 35713) ? n : (console.log(t.getShaderInfoLog(n)), 
            null);
        }, e._count = 0, e._preCompileShader = {}, e.SHADERNAME2ID = 2e-4, e.sharders = new Array(32), 
        n(e, [ "nameKey", function() {
            return this.nameKey = new Ut();
        } ]), e;
    }(Ke), ri = (function(t) {
        function e() {
            this.url = null, this._channel = null, this._tar = null, this._playEvents = null, 
            this._stopEvents = null, e.__super.call(this), this.visible = !1, this.on("added", this, this._onParentChange), 
            this.on("removed", this, this._onParentChange);
        }
        r(e, "laya.media.SoundNode", t);
        var i = e.prototype;
        return i._onParentChange = function() {
            this.target = this.parent;
        }, i.play = function(t, e) {
            void 0 === t && (t = 1), isNaN(t) && (t = 1), this.url && (this.stop(), this._channel = ye.playSound(this.url, t, e));
        }, i.stop = function() {
            this._channel && !this._channel.isStopped && this._channel.stop(), this._channel = null;
        }, i._setPlayAction = function(t, e, i, n) {
            void 0 === n && (n = !0), this[i] && t && (n ? t.on(e, this, this[i]) : t.off(e, this, this[i]));
        }, i._setPlayActions = function(t, e, i, n) {
            if (void 0 === n && (n = !0), t && e) {
                var r = e.split(","), s = 0, a = 0;
                for (a = r.length, s = 0; a > s; s++) this._setPlayAction(t, r[s], i, n);
            }
        }, s(0, i, "playEvent", null, function(t) {
            this._playEvents = t, t && this._tar && this._setPlayActions(this._tar, t, "play");
        }), s(0, i, "target", null, function(t) {
            this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !1), this._setPlayActions(this._tar, this._stopEvents, "stop", !1)), 
            this._tar = t, this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !0), 
            this._setPlayActions(this._tar, this._stopEvents, "stop", !0));
        }), s(0, i, "stopEvent", null, function(t) {
            this._stopEvents = t, t && this._tar && this._setPlayActions(this._tar, t, "stop");
        }), e;
    }(je), function(t) {
        function e(t, i) {
            e.__super.call(this), this._wrapModeU = 0, this._wrapModeV = 0, this._filterMode = 1, 
            this._readyed = !1, this._width = -1, this._height = -1, this._format = t, this._mipmap = i, 
            this._anisoLevel = 1, this._glTexture = Pt.instance.createTexture();
        }
        r(e, "laya.resource.BaseTexture", t);
        var i = e.prototype;
        return i._isPot = function(t) {
            return 0 === (t & t - 1);
        }, i._getGLFormat = function() {
            var t = 0;
            switch (this._format) {
              case 0:
                t = 6407;
                break;

              case 1:
                t = 6408;
                break;

              case 2:
                t = 6406;
                break;

              case 3:
                if (!nt._compressedTextureS3tc) throw "BaseTexture: not support DXT1 format.";
                t = nt._compressedTextureS3tc.COMPRESSED_RGB_S3TC_DXT1_EXT;
                break;

              case 4:
                if (!nt._compressedTextureS3tc) throw "BaseTexture: not support DXT5 format.";
                t = nt._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                break;

              case 5:
                if (!nt._compressedTextureEtc1) throw "BaseTexture: not support ETC1RGB format.";
                t = nt._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL;
                break;

              case 9:
                if (!nt._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGB_2BPPV format.";
                t = nt._compressedTexturePvrtc.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                break;

              case 10:
                if (!nt._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGBA_2BPPV format.";
                t = nt._compressedTexturePvrtc.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                break;

              case 11:
                if (!nt._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGB_4BPPV format.";
                t = nt._compressedTexturePvrtc.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                break;

              case 12:
                if (!nt._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGBA_4BPPV format.";
                t = nt._compressedTexturePvrtc.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                break;

              default:
                throw "BaseTexture: unknown texture format.";
            }
            return t;
        }, i._setFilterMode = function(t) {
            var e = Pt.instance;
            switch (nt.bindTexture(e, this._glTextureType, this._glTexture), t) {
              case 0:
                this._mipmap ? e.texParameteri(this._glTextureType, 10241, 9984) : e.texParameteri(this._glTextureType, 10241, 9728), 
                e.texParameteri(this._glTextureType, 10240, 9728);
                break;

              case 1:
                this._mipmap ? e.texParameteri(this._glTextureType, 10241, 9985) : e.texParameteri(this._glTextureType, 10241, 9729), 
                e.texParameteri(this._glTextureType, 10240, 9729);
                break;

              case 2:
                this._mipmap ? e.texParameteri(this._glTextureType, 10241, 9987) : e.texParameteri(this._glTextureType, 10241, 9729), 
                e.texParameteri(this._glTextureType, 10240, 9729);
                break;

              default:
                throw new Error("BaseTexture:unknown filterMode value.");
            }
        }, i._setWarpMode = function(t, e) {
            var i = Pt.instance;
            if (nt.bindTexture(i, this._glTextureType, this._glTexture), this._isPot(this._width) && this._isPot(this._height)) switch (e) {
              case 0:
                i.texParameteri(this._glTextureType, t, 10497);
                break;

              case 1:
                i.texParameteri(this._glTextureType, t, 33071);
            } else i.texParameteri(this._glTextureType, t, 33071);
        }, i._setAnisotropy = function(t) {
            var e = nt._extTextureFilterAnisotropic;
            if (e && !Dt.onLimixiu) {
                t = Math.max(t, 1);
                var i = Pt.instance;
                nt.bindTexture(i, this._glTextureType, this._glTexture), t = Math.min(i.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT), t), 
                i.texParameterf(this._glTextureType, e.TEXTURE_MAX_ANISOTROPY_EXT, t);
            }
        }, i._disposeResource = function() {
            this._glTexture && (Pt.instance.deleteTexture(this._glTexture), this._glTexture = null, 
            this._setGPUMemory(0));
        }, i._getSource = function() {
            return this._readyed ? this._glTexture : null;
        }, i.generateMipmap = function() {
            this._isPot(this.width) && this._isPot(this.height) && Pt.instance.generateMipmap(this._glTextureType);
        }, s(0, i, "wrapModeU", function() {
            return this._wrapModeU;
        }, function(t) {
            this._wrapModeU !== t && (this._wrapModeU = t, -1 !== this._width && this._setWarpMode(10242, t));
        }), s(0, i, "mipmap", function() {
            return this._mipmap;
        }), s(0, i, "format", function() {
            return this._format;
        }), s(0, i, "wrapModeV", function() {
            return this._wrapModeV;
        }, function(t) {
            this._wrapModeV !== t && (this._wrapModeV = t, -1 !== this._height && this._setWarpMode(10243, t));
        }), s(0, i, "defaulteTexture", function() {
            throw "BaseTexture:must override it.";
        }), s(0, i, "filterMode", function() {
            return this._filterMode;
        }, function(t) {
            t !== this._filterMode && (this._filterMode = t, -1 !== this._width && -1 !== this._height && this._setFilterMode(t));
        }), s(0, i, "anisoLevel", function() {
            return this._anisoLevel;
        }, function(t) {
            t !== this._anisoLevel && (this._anisoLevel = Math.max(1, Math.min(16, t)), -1 !== this._width && -1 !== this._height && this._setAnisotropy(t));
        }), e.WARPMODE_REPEAT = 0, e.WARPMODE_CLAMP = 1, e.FILTERMODE_POINT = 0, e.FILTERMODE_BILINEAR = 1, 
        e.FILTERMODE_TRILINEAR = 2, e.FORMAT_R8G8B8 = 0, e.FORMAT_R8G8B8A8 = 1, e.FORMAT_ALPHA8 = 2, 
        e.FORMAT_DXT1 = 3, e.FORMAT_DXT5 = 4, e.FORMAT_ETC1RGB = 5, e.FORMAT_PVRTCRGB_2BPPV = 9, 
        e.FORMAT_PVRTCRGBA_2BPPV = 10, e.FORMAT_PVRTCRGB_4BPPV = 11, e.FORMAT_PVRTCRGBA_4BPPV = 12, 
        e.FORMAT_DEPTH_16 = 0, e.FORMAT_STENCIL_8 = 1, e.FORMAT_DEPTHSTENCIL_16_8 = 2, e.FORMAT_DEPTHSTENCIL_NONE = 3, 
        e;
    }($e)), si = function(t) {
        function e(t) {
            e.__super.call(this), void 0 === t && (t = !1), t ? this._source = Dt.createElement("canvas") : this._source = this, 
            this.lock = !0;
        }
        r(e, "laya.resource.HTMLCanvas", t);
        var i = e.prototype;
        return i._getSource = function() {
            return this._source;
        }, i.clear = function() {
            this._ctx && this._ctx.clear && this._ctx.clear(), this._texture && (this._texture.destroy(), 
            this._texture = null);
        }, i.destroy = function() {
            laya.resource.Resource.prototype.destroy.call(this), this._setCPUMemory(0), this._ctx && this._ctx.destroy(), 
            this._ctx = null;
        }, i.release = function() {}, i._setContext = function(t) {
            this._ctx = t;
        }, i.getContext = function(t, e) {
            return this.context;
        }, i.getMemSize = function() {
            return 0;
        }, i.size = function(t, e) {
            (this._width != t || this._height != e || this._source && (this._source.width != t || this._source.height != e)) && (this._width = t, 
            this._height = e, this._setCPUMemory(t * e * 4), this._ctx && this._ctx.size && this._ctx.size(t, e), 
            this._source && (this._source.height = e, this._source.width = t), this._texture && (this._texture.destroy(), 
            this._texture = null));
        }, i.getTexture = function() {
            if (!this._texture) {
                var t = new _i();
                t.loadImageSource(this.source), this._texture = new Ie(t);
            }
            return this._texture;
        }, i.toBase64 = function(t, e) {
            if (this._source) {
                if (Mt.isConchApp) {
                    if (2 == conchConfig.threadMode) throw "native 2 thread mode use toBase64Async";
                    var i = this._ctx._targets.sourceWidth, n = this._ctx._targets.sourceHeight, r = this._ctx._targets.getData(0, 0, i, n);
                    return conchToBase64FlipY ? conchToBase64FlipY(t, e, r.buffer, i, n) : conchToBase64(t, e, r.buffer, i, n);
                }
                return this._source.toDataURL(t, e);
            }
            return null;
        }, i.toBase64Async = function(t, e, i) {
            var n = this._ctx._targets.sourceWidth, r = this._ctx._targets.sourceHeight;
            this._ctx._targets.getDataAsync(0, 0, n, r, function(s) {
                var a = conchToBase64FlipY ? conchToBase64FlipY(t, e, s.buffer, n, r) : conchToBase64(t, e, s.buffer, n, r);
                i(a);
            });
        }, s(0, i, "source", function() {
            return this._source;
        }), s(0, i, "context", function() {
            return this._ctx ? this._ctx : (this._source == this ? this._ctx = new ut() : this._ctx = this._source.getContext(Mt.isConchApp ? "layagl" : "2d"), 
            this._ctx._canvas = this, this._ctx);
        }), e;
    }($e), ai = (function(t) {
        function e() {
            e.__super.call(this);
        }
        return r(e, "laya.resource.HTMLImage", t), e.create = function(t, e, i) {
            var n = new _i(t, e, i, !1, !1);
            return n.wrapModeU = 1, n.wrapModeV = 1, n;
        }, e;
    }($e), function(e) {
        function a() {
            function t() {
                "hidden" == Dt.document[r] ? (e._isVisibility = !1, n._isInputting() && (li.inputElement.target.focus = !1)) : e._isVisibility = !0, 
                e.renderingEnabled = e._isVisibility, n.event("visibilitychange");
            }
            this.focus = null, this._frameRate = "fast", this.designWidth = 0, this.designHeight = 0, 
            this.canvasRotation = !1, this.canvasDegree = 0, this.renderingEnabled = !0, this.screenAdaptationEnabled = !0, 
            this._screenMode = "none", this._scaleMode = "noscale", this._alignV = "top", this._alignH = "left", 
            this._bgColor = "black", this._mouseMoveTime = 0, this._renderCount = 0, this._safariOffsetY = 0, 
            this._frameStartTime = 0, this._isFocused = !1, this._isVisibility = !1, this._wgColor = [ 0, 0, 0, 1 ], 
            this._scene3Ds = [], this._globalRepaintSet = !1, this._globalRepaintGet = !1, this._curUIBase = null, 
            this.useRetinalCanvas = !1, a.__super.call(this), this.offset = new Yt(), this._canvasTransform = new st(), 
            this._previousOrientation = Dt.window.orientation, this._3dUI = [];
            var e = this;
            this.transform = this._createTransform(), this.mouseEnabled = !0, this.hitTestPrior = !0, 
            this.autoSize = !1, this._setBit(128, !0), this._setBit(2, !0), this._isFocused = !0, 
            this._isVisibility = !0, this.useRetinalCanvas = se.useRetinalCanvas;
            var i = Dt.window, n = this;
            i.addEventListener("focus", function() {
                e._isFocused = !0, n.event("focus"), n.event("focuschange");
            }), i.addEventListener("blur", function() {
                e._isFocused = !1, n.event("blur"), n.event("focuschange"), n._isInputting() && (li.inputElement.target.focus = !1);
            });
            var r = "visibilityState", s = "visibilitychange", o = i.document;
            "undefined" != typeof o.hidden ? (s = "visibilitychange", r = "visibilityState") : "undefined" != typeof o.mozHidden ? (s = "mozvisibilitychange", 
            r = "mozVisibilityState") : "undefined" != typeof o.msHidden ? (s = "msvisibilitychange", 
            r = "msVisibilityState") : "undefined" != typeof o.webkitHidden && (s = "webkitvisibilitychange", 
            r = "webkitVisibilityState"), i.document.addEventListener(s, t), i.addEventListener("resize", function() {
                var t = Dt.window.orientation;
                null != t && t != e._previousOrientation && n._isInputting() && (li.inputElement.target.focus = !1), 
                e._previousOrientation = t, n._isInputting() || (Dt.onSafari && (n._safariOffsetY = (Dt.window.__innerHeight || Dt.document.body.clientHeight || Dt.document.documentElement.clientHeight) - Dt.window.innerHeight), 
                n._resetCanvas());
            }), i.addEventListener("orientationchange", function(t) {
                n._resetCanvas();
            }), this.on("mousemove", this, this._onmouseMove), Dt.onMobile && this.on("mousedown", this, this._onmouseMove);
        }
        r(a, "laya.display.Stage", e);
        var h = a.prototype;
        return h._isInputting = function() {
            return Dt.onMobile && li.isInputting;
        }, h._changeCanvasSize = function() {
            this.setScreenSize(Dt.clientWidth * Dt.pixelRatio, Dt.clientHeight * Dt.pixelRatio);
        }, h._resetCanvas = function() {
            this.screenAdaptationEnabled && this._changeCanvasSize();
        }, h.setScreenSize = function(t, e) {
            var i = !1;
            if ("none" !== this._screenMode) {
                var n = 1 > t / e ? "vertical" : "horizontal";
                if (i = n !== this._screenMode) {
                    var r = e;
                    e = t, t = r;
                }
            }
            this.canvasRotation = i;
            var s = Mt._mainCanvas, a = s.source.style, o = this._canvasTransform.identity(), h = this._scaleMode, l = t / this.designWidth, u = e / this.designHeight, c = this.useRetinalCanvas ? t : this.designWidth, _ = this.useRetinalCanvas ? e : this.designHeight, d = t, f = e, p = Dt.pixelRatio;
            switch (this._width = this.designWidth, this._height = this.designHeight, h) {
              case "noscale":
                l = u = 1, d = this.designWidth, f = this.designHeight;
                break;

              case "showall":
                l = u = Math.min(l, u), c = d = Math.round(this.designWidth * l), _ = f = Math.round(this.designHeight * u);
                break;

              case "noborder":
                l = u = Math.max(l, u), d = Math.round(this.designWidth * l), f = Math.round(this.designHeight * u);
                break;

              case "full":
                l = u = 1, this._width = c = t, this._height = _ = e;
                break;

              case "fixedwidth":
                u = l, this._height = _ = Math.round(e / l);
                break;

              case "fixedheight":
                l = u, this._width = c = Math.round(t / u);
                break;

              case "fixedauto":
                t / e < this.designWidth / this.designHeight ? (u = l, this._height = _ = Math.round(e / l)) : (l = u, 
                this._width = c = Math.round(t / u));
            }
            this.useRetinalCanvas && (c = t, _ = e), l *= this.scaleX, u *= this.scaleY, 1 === l && 1 === u ? this.transform.identity() : (this.transform.a = this._formatData(l / (d / c)), 
            this.transform.d = this._formatData(u / (f / _))), s.size(c, _), ue.changeWebGLSize(c, _), 
            o.scale(d / c / p, f / _ / p), "left" === this._alignH ? this.offset.x = 0 : "right" === this._alignH ? this.offset.x = t - d : this.offset.x = .5 * (t - d) / p, 
            "top" === this._alignV ? this.offset.y = 0 : "bottom" === this._alignV ? this.offset.y = e - f : this.offset.y = .5 * (e - f) / p, 
            this.offset.x = Math.round(this.offset.x), this.offset.y = Math.round(this.offset.y), 
            o.translate(this.offset.x, this.offset.y), this._safariOffsetY && o.translate(0, this._safariOffsetY), 
            this.canvasDegree = 0, i && ("horizontal" === this._screenMode ? (o.rotate(Math.PI / 2), 
            o.translate(e / p, 0), this.canvasDegree = 90) : (o.rotate(-Math.PI / 2), o.translate(0, t / p), 
            this.canvasDegree = -90)), o.a = this._formatData(o.a), o.d = this._formatData(o.d), 
            o.tx = this._formatData(o.tx), o.ty = this._formatData(o.ty), this.transform = this.transform, 
            a.transformOrigin = a.webkitTransformOrigin = a.msTransformOrigin = a.mozTransformOrigin = a.oTransformOrigin = "0px 0px 0px", 
            a.transform = a.webkitTransform = a.msTransform = a.mozTransform = a.oTransform = "matrix(" + o.toString() + ")", 
            this._safariOffsetY && o.translate(0, -this._safariOffsetY), o.translate(parseInt(a.left) || 0, parseInt(a.top) || 0), 
            this.visible = !0, this._repaint |= 2, this.event("resize");
        }, h._formatData = function(t) {
            return Math.abs(t) < 1e-6 ? 0 : Math.abs(1 - t) < .001 ? t > 0 ? 1 : -1 : t;
        }, h.getMousePoint = function() {
            return Yt.TEMP.setTo(this.mouseX, this.mouseY);
        }, h.repaint = function(t) {
            void 0 === t && (t = 2), this._repaint |= t;
        }, h.parentRepaint = function(t) {
            void 0 === t && (t = 2);
        }, h._loop = function() {
            return this._globalRepaintGet = this._globalRepaintSet, this._globalRepaintSet = !1, 
            this.render(Mt._context, 0, 0), !0;
        }, h.getFrameTm = function() {
            return this._frameStartTime;
        }, h._onmouseMove = function(t) {
            this._mouseMoveTime = Dt.now();
        }, h.getTimeFromFrameStart = function() {
            return Dt.now() - this._frameStartTime;
        }, h.render = function(t, i, n) {
            if (a._dbgSprite.graphics.clear(), "sleep" === this._frameRate) {
                var r = Dt.now();
                if (!(r - this._frameStartTime >= 1e3)) return;
                this._frameStartTime = r;
            } else {
                if (!this._visible) return this._renderCount++, void (this._renderCount % 5 === 0 && ($t.I._update(), 
                A.loopCount++, this._updateTimers()));
                this._frameStartTime = Dt.now();
            }
            this._renderCount++;
            var s = "mouse" === this._frameRate ? this._frameStartTime - this._mouseMoveTime < 2e3 ? "fast" : "slow" : this._frameRate, o = "slow" !== s, h = this._renderCount % 2 === 0;
            if (A.renderSlow = !o, (o || h) && ($t.I._update(), A.loopCount++, this.renderingEnabled)) {
                for (var l = 0, u = this._scene3Ds.length; u > l; l++) this._scene3Ds[l]._update();
                t.clear(), e.prototype.render.call(this, t, i, n), A._show && A._sp && A._sp.render(t, i, n);
            }
            a._dbgSprite.render(t, 0, 0), (o || !h) && (this.renderingEnabled && (ue.clear(this._bgColor), 
            t.flush(), M.instance && M.getInstance().endDispose()), this._updateTimers());
        }, h.renderToNative = function(t, i, n) {
            if (this._renderCount++, !this._visible) return void (this._renderCount % 5 === 0 && ($t.I._update(), 
            A.loopCount++, this._updateTimers()));
            if ($t.I._update(), A.loopCount++, this.renderingEnabled) {
                for (var r = 0, s = this._scene3Ds.length; s > r; r++) this._scene3Ds[r]._update();
                t.clear(), e.prototype.render.call(this, t, i, n), A._show && A._sp && A._sp.render(t, i, n);
            }
            this.renderingEnabled && (ue.clear(this._bgColor), t.flush(), M.instance && M.getInstance().endDispose()), 
            this._updateTimers();
        }, h._updateTimers = function() {
            i.systemTimer._update(), i.startTimer._update(), i.physicsTimer._update(), i.updateTimer._update(), 
            i.lateTimer._update(), i.timer._update();
        }, h._requestFullscreen = function() {
            var t = Dt.document.documentElement;
            t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen();
        }, h._fullScreenChanged = function() {
            i.stage.event("fullscreenchange");
        }, h.exitFullscreen = function() {
            var t = Dt.document;
            t.exitFullscreen ? t.exitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen && t.webkitExitFullscreen();
        }, h.isGlobalRepaint = function() {
            return this._globalRepaintGet;
        }, h.setGlobalRepaint = function() {
            this._globalRepaintSet = !0;
        }, h.add3DUI = function(t) {
            var e = t.rootView;
            this._3dUI.indexOf(e) >= 0 || this._3dUI.push(e);
        }, h.remove3DUI = function(t) {
            var e = t.rootView, i = this._3dUI.indexOf(e);
            return i >= 0 ? (this._3dUI.splice(i, 1), !0) : !1;
        }, s(0, h, "clientScaleY", function() {
            return this._transform ? this._transform.getScaleY() : 1;
        }), s(0, h, "width", e.prototype._$get_width, function(t) {
            this.designWidth = t, i.superSet(je, this, "width", t), i.systemTimer.callLater(this, this._changeCanvasSize);
        }), s(0, h, "isFocused", function() {
            return this._isFocused;
        }), s(0, h, "alignH", function() {
            return this._alignH;
        }, function(t) {
            this._alignH = t, i.systemTimer.callLater(this, this._changeCanvasSize);
        }), s(0, h, "height", e.prototype._$get_height, function(t) {
            this.designHeight = t, i.superSet(je, this, "height", t), i.systemTimer.callLater(this, this._changeCanvasSize);
        }), s(0, h, "transform", function() {
            return this._tfChanged && this._adjustTransform(), this._transform = this._transform || this._createTransform();
        }, e.prototype._$set_transform), s(0, h, "isVisibility", function() {
            return this._isVisibility;
        }), s(0, h, "scaleMode", function() {
            return this._scaleMode;
        }, function(t) {
            this._scaleMode = t, i.systemTimer.callLater(this, this._changeCanvasSize);
        }), s(0, h, "alignV", function() {
            return this._alignV;
        }, function(t) {
            this._alignV = t, i.systemTimer.callLater(this, this._changeCanvasSize);
        }), s(0, h, "bgColor", function() {
            return this._bgColor;
        }, function(t) {
            this._bgColor = t, t ? this._wgColor = o.create(t).arrColor : this._wgColor = null, 
            Dt.onLimixiu ? this._wgColor = o.create(t).arrColor : t ? Mt.canvas.style.background = t : Mt.canvas.style.background = "none";
        }), s(0, h, "mouseX", function() {
            return Math.round(S.instance.mouseX / this.clientScaleX);
        }), s(0, h, "mouseY", function() {
            return Math.round(S.instance.mouseY / this.clientScaleY);
        }), s(0, h, "clientScaleX", function() {
            return this._transform ? this._transform.getScaleX() : 1;
        }), s(0, h, "screenMode", function() {
            return this._screenMode;
        }, function(t) {
            this._screenMode = t;
        }), s(0, h, "visible", e.prototype._$get_visible, function(t) {
            if (this.visible !== t) {
                i.superSet(je, this, "visible", t);
                var e = Mt._mainCanvas.source.style;
                e.visibility = t ? "visible" : "hidden";
            }
        }), s(0, h, "fullScreenEnabled", null, function(t) {
            var e = Dt.document, i = Mt.canvas;
            t ? (i.addEventListener("mousedown", this._requestFullscreen), i.addEventListener("touchstart", this._requestFullscreen), 
            e.addEventListener("fullscreenchange", this._fullScreenChanged), e.addEventListener("mozfullscreenchange", this._fullScreenChanged), 
            e.addEventListener("webkitfullscreenchange", this._fullScreenChanged), e.addEventListener("msfullscreenchange", this._fullScreenChanged)) : (i.removeEventListener("mousedown", this._requestFullscreen), 
            i.removeEventListener("touchstart", this._requestFullscreen), e.removeEventListener("fullscreenchange", this._fullScreenChanged), 
            e.removeEventListener("mozfullscreenchange", this._fullScreenChanged), e.removeEventListener("webkitfullscreenchange", this._fullScreenChanged), 
            e.removeEventListener("msfullscreenchange", this._fullScreenChanged));
        }), s(0, h, "frameRate", function() {
            return Mt.isConchApp ? this._frameRateNative : this._frameRate;
        }, function(e) {
            if (Mt.isConchApp) {
                switch (e) {
                  case "fast":
                    t.conch.config.setLimitFPS(60);
                    break;

                  case "mouse":
                    t.conch.config.setMouseFrame(2e3);
                    break;

                  case "slow":
                    t.conch.config.setSlowFrame(!0);
                    break;

                  case "sleep":
                    t.conch.config.setLimitFPS(1);
                }
                this._frameRateNative = e;
            } else this._frameRate = e;
        }), a.SCALE_NOSCALE = "noscale", a.SCALE_EXACTFIT = "exactfit", a.SCALE_SHOWALL = "showall", 
        a.SCALE_NOBORDER = "noborder", a.SCALE_FULL = "full", a.SCALE_FIXED_WIDTH = "fixedwidth", 
        a.SCALE_FIXED_HEIGHT = "fixedheight", a.SCALE_FIXED_AUTO = "fixedauto", a.ALIGN_LEFT = "left", 
        a.ALIGN_RIGHT = "right", a.ALIGN_CENTER = "center", a.ALIGN_TOP = "top", a.ALIGN_MIDDLE = "middle", 
        a.ALIGN_BOTTOM = "bottom", a.SCREEN_NONE = "none", a.SCREEN_HORIZONTAL = "horizontal", 
        a.SCREEN_VERTICAL = "vertical", a.FRAME_FAST = "fast", a.FRAME_SLOW = "slow", a.FRAME_MOUSE = "mouse", 
        a.FRAME_SLEEP = "sleep", n(a, [ "_dbgSprite", function() {
            return this._dbgSprite = new je();
        } ]), a;
    }(je)), oi = function(t) {
        function e() {
            this.datas = [], this.hud_width = 800, this.hud_height = 200, this.gMinV = 0, this.gMaxV = 100, 
            this.textSpace = 40, this._now = null, this.sttm = 0, e.__super.call(this), this.xdata = new Array(e.DATANUM), 
            this.ydata = new Array(e.DATANUM), e.inst = this, this._renderType |= 2048, this._setRenderType(this._renderType), 
            this._setCustomRender(), this.addDataDef(0, 16777215, "frame", 1), this.addDataDef(1, 65280, "update", 1), 
            this.addDataDef(2, 16711680, "flush", 1), this._now = performance ? performance.now.bind(performance) : Date.now;
        }
        r(e, "laya.utils.PerfHUD", t);
        var i = e.prototype;
        return i.now = function() {
            return this._now();
        }, i.start = function() {
            this.sttm = this._now();
        }, i.end = function(t) {
            var e = this._now() - this.sttm;
            this.updateValue(t, e);
        }, i.config = function(t, e) {
            this.hud_width = t, this.hud_height = e;
        }, i.addDataDef = function(t, e, i, n) {
            this.datas[t] = new at(t, e, i, n);
        }, i.updateValue = function(t, e) {
            this.datas[t].addData(e);
        }, i.v2y = function(t) {
            this._y + this.hud_height * (1 - (t - this.gMinV) / this.gMaxV);
            return this._y + this.hud_height * (1 - (t - this.gMinV) / this.gMaxV);
        }, i.drawHLine = function(t, e, i, n) {
            var r = this._x, s = (this._x + this.hud_width, this.v2y(e));
            t.fillText(n, r, s - 6, null, "green", null), r += this.textSpace, t.fillStyle = i, 
            t.fillRect(r, s, this._x + this.hud_width, 1, null);
        }, i.customRender = function(t, i, n) {
            var r = performance.now();
            e._lastTm <= 0 && (e._lastTm = r), this.updateValue(0, r - e._lastTm), e._lastTm = r, 
            t.save(), t.fillRect(this._x, this._y, this.hud_width, this.hud_height + 4, "#000000cc"), 
            t.globalAlpha = .9, this.drawHLine(t, 0, "green", "    0"), this.drawHLine(t, 10, "green", "  10"), 
            this.drawHLine(t, 16.667, "red", " "), this.drawHLine(t, 20, "green", "50|20"), 
            this.drawHLine(t, 33.334, "yellow", ""), this.drawHLine(t, 16.667 * 3, "yellow", ""), 
            this.drawHLine(t, 66.668, "yellow", ""), this.drawHLine(t, 50, "green", "20|50"), 
            this.drawHLine(t, 100, "green", "10|100");
            for (var s = 0, a = this.datas.length; a > s; s++) {
                var o = this.datas[s];
                if (o) {
                    var h = o.datas.length, l = (this.hud_width - this.textSpace) / h, u = o.datapos, c = this._x + this.textSpace;
                    t.fillStyle = o.color;
                    for (var _ = h; _ > u; u++) {
                        var d = this.v2y(o.datas[u] * o.scale);
                        t.fillRect(c, d, l, this.hud_height + this._y - d, null), c += l;
                    }
                    for (u = 0; u < o.datapos; u++) d = this.v2y(o.datas[u] * o.scale), t.fillRect(c, d, l, this.hud_height + this._y - d, null), 
                    c += l;
                }
            }
            t.restore();
        }, e._lastTm = 0, e._now = 0, e.DATANUM = 300, e.inst = null, e.drawTexTm = 0, e;
    }(je), hi = function(t) {
        function e() {
            this.autoDestroyAtClosed = !1, this.url = null, this._timer = null, this._viewCreated = !1, 
            this._idMap = null, this._$componentType = "Scene", e.__super.call(this), this._setBit(8, !0), 
            e.unDestroyedScenes.push(this), this._scene = this, this.createChildren();
        }
        r(e, "laya.display.Scene", t);
        var n = e.prototype;
        return n.createChildren = function() {}, n.loadScene = function(t) {
            var e = t.indexOf(".") > -1 ? t : t + ".scene", n = i.loader.getRes(e);
            if (n) this.createView(n); else {
                i.loader.resetProgress();
                var r = new Ue();
                r.on("complete", this, this._onSceneLoaded, [ e ]), r.load(e);
            }
        }, n._onSceneLoaded = function(t) {
            this.createView(De.getRes(t));
        }, n.createView = function(t) {
            t && !this._viewCreated && (this._viewCreated = !0, pt.createByData(this, t));
        }, n.getNodeByID = function(t) {
            return this._idMap ? this._idMap[t] : null;
        }, n.open = function(t, i) {
            void 0 === t && (t = !0), t && e.closeAll(), e.root.addChild(this), this.onOpened(i);
        }, n.onOpened = function(t) {}, n.close = function(t) {
            this.onClosed(t), this.autoDestroyAtClosed ? this.destroy() : this.removeSelf();
        }, n.onClosed = function(t) {}, n.destroy = function(e) {
            void 0 === e && (e = !0), this._idMap = null, t.prototype.destroy.call(this, e);
            for (var i = laya.display.Scene.unDestroyedScenes, n = i.length - 1; n > -1; n--) if (i[n] === this) return void i.splice(n, 1);
        }, n._sizeChanged = function() {
            this.event("resize");
        }, s(0, n, "scaleX", t.prototype._$get_scaleX, function(t) {
            i.superGet(je, this, "scaleX") != t && (i.superSet(je, this, "scaleX", t), this.event("resize"));
        }), s(0, n, "scaleY", t.prototype._$get_scaleY, function(t) {
            i.superGet(je, this, "scaleY") != t && (i.superSet(je, this, "scaleY", t), this.event("resize"));
        }), s(0, n, "width", function() {
            if (this._width) return this._width;
            for (var t = 0, e = this.numChildren - 1; e > -1; e--) {
                var i = this.getChildAt(e);
                i._visible && (t = Math.max(i._x + i.width * i.scaleX, t));
            }
            return t;
        }, function(t) {
            i.superGet(je, this, "width") != t && (i.superSet(je, this, "width", t), this.callLater(this._sizeChanged));
        }), s(0, n, "timer", function() {
            return this._timer || i.timer;
        }, function(t) {
            this._timer = t;
        }), s(0, n, "height", function() {
            if (this._height) return this._height;
            for (var t = 0, e = this.numChildren - 1; e > -1; e--) {
                var i = this.getChildAt(e);
                i._visible && (t = Math.max(i._y + i.height * i.scaleY, t));
            }
            return t;
        }, function(t) {
            i.superGet(je, this, "height") != t && (i.superSet(je, this, "height", t), this.callLater(this._sizeChanged));
        }), s(1, e, "root", function() {
            function t() {
                e._root.size(i.stage.width, i.stage.height), e._root.event("resize");
            }
            return e._root || (e._root = i.stage.addChild(new je()), e._root.name = "root", 
            i.stage.on("resize", null, t), t()), e._root;
        }, laya.display.Sprite._$SET_root), e.load = function(t, n, r) {
            function s(t) {
                e._loadPage && e._loadPage.event("progress", t), r && r.runWith(t);
            }
            function a() {
                o.off("progress", null, s);
                var i = De.getRes(t);
                if (!i) throw "Can not find scene:" + t;
                if (!i.props) throw "Scene data is error:" + t;
                var r = i.props.runtime ? i.props.runtime : i.type, a = Rt.getClass(r);
                if ("instance" == i.props.renderType) var h = a.instance || (a.instance = new a()); else h = new a();
                if (!(h && h instanceof laya.display.Node)) throw "Can not find scene:" + r;
                h.url = t, h._getBit(8) ? (h.on("onViewCreated", null, function() {
                    n && n.runWith(h);
                }), h.createView(i)) : n && n.runWith(h), e.hideLoadingPage();
            }
            i.loader.resetProgress();
            var o = new Ue();
            o.on("progress", null, s), o.once("complete", null, a), o.load(t);
        }, e.open = function(t, i, n, r, s) {
            if (void 0 === i && (i = !0), n instanceof laya.utils.Handler) {
                var a = r;
                r = n, n = a;
            }
            e.showLoadingPage(), e.load(t, g.create(null, this._onSceneLoaded, [ i, r, n ]), s);
        }, e._onSceneLoaded = function(t, e, i, n) {
            n.open(t, i), e && e.runWith(n);
        }, e.close = function(t, e) {
            void 0 === e && (e = "");
            for (var i = !1, n = laya.display.Scene.unDestroyedScenes, r = 0, s = n.length; s > r; r++) {
                var a = n[r];
                a && a.parent && a.url === t && a.name == e && (a.close(), i = !0);
            }
            return i;
        }, e.closeAll = function() {
            for (var t = laya.display.Scene.root, e = 0, i = t.numChildren; i > e; e++) {
                var n = t.getChildAt(0);
                n instanceof laya.display.Scene ? n.close() : n.removeSelf();
            }
        }, e.destroy = function(t, e) {
            void 0 === e && (e = "");
            for (var i = !1, n = laya.display.Scene.unDestroyedScenes, r = 0, s = n.length; s > r; r++) {
                var a = n[r];
                a.url === t && a.name == e && (a.destroy(), i = !0);
            }
            return i;
        }, e.gc = function() {
            Ee.destroyUnusedResources();
        }, e.setLoadingPage = function(t) {
            e._loadPage != t && (e._loadPage = t);
        }, e.showLoadingPage = function(t, n) {
            void 0 === n && (n = 500), e._loadPage && (i.systemTimer.clear(null, e._showLoading), 
            i.systemTimer.clear(null, e._hideLoading), i.systemTimer.once(n, null, e._showLoading, [ t ], !1));
        }, e._showLoading = function(t) {
            i.stage.addChild(e._loadPage), e._loadPage.onOpened(t);
        }, e._hideLoading = function() {
            e._loadPage.close();
        }, e.hideLoadingPage = function(t) {
            void 0 === t && (t = 500), e._loadPage && (i.systemTimer.clear(null, e._showLoading), 
            i.systemTimer.clear(null, e._hideLoading), i.systemTimer.once(t, null, e._hideLoading));
        }, e.unDestroyedScenes = [], e._root = null, e._loadPage = null, e;
    }(je), li = function(t) {
        function e() {
            this._focus = !1, this._multiline = !1, this._editable = !0, this._restrictPattern = null, 
            this._type = "text", this._prompt = "", this._promptColor = "#A9A9A9", this._originColor = "#000000", 
            this._content = "", e.__super.call(this), this._maxChars = 1e5, this._width = 100, 
            this._height = 20, this.multiline = !1, this.overflow = "scroll", this.on("mousedown", this, this._onMouseDown), 
            this.on("undisplay", this, this._onUnDisplay);
        }
        r(e, "laya.display.Input", t);
        var a = e.prototype;
        return a.setSelection = function(t, e) {
            this.focus = !0, laya.display.Input.inputElement.selectionStart = t, laya.display.Input.inputElement.selectionEnd = e;
        }, a._onUnDisplay = function(t) {
            this.focus = !1;
        }, a._onMouseDown = function(t) {
            this.focus = !0;
        }, a._syncInputTransform = function() {
            var t = this.nativeInput, n = ie.getTransformRelativeToWindow(this, this.padding[3], this.padding[0]), r = this._width - this.padding[1] - this.padding[3], s = this._height - this.padding[0] - this.padding[2];
            Mt.isConchApp ? (t.setScale(n.scaleX, n.scaleY), t.setSize(r, s), t.setPos(n.x, n.y)) : (e.inputContainer.style.transform = e.inputContainer.style.webkitTransform = "scale(" + n.scaleX + "," + n.scaleY + ") rotate(" + i.stage.canvasDegree + "deg)", 
            t.style.width = r + "px", t.style.height = s + "px", e.inputContainer.style.left = n.x + "px", 
            e.inputContainer.style.top = n.y + "px");
        }, a.select = function() {
            this.nativeInput.select();
        }, a._setInputMethod = function() {
            e.input.parentElement && e.inputContainer.removeChild(e.input), e.area.parentElement && e.inputContainer.removeChild(e.area), 
            e.inputElement = this._multiline ? e.area : e.input, e.inputContainer.appendChild(e.inputElement), 
            ei.RightToLeft && (e.inputElement.style.direction = "rtl");
        }, a._focusIn = function() {
            laya.display.Input.isInputting = !0;
            var t = this.nativeInput;
            this._focus = !0;
            var e = t.style;
            e.whiteSpace = this.wordWrap ? "pre-wrap" : "nowrap", this._setPromptColor(), t.readOnly = !this._editable, 
            Mt.isConchApp && (t.setType(this._type), t.setForbidEdit(!this._editable)), t.maxLength = this._maxChars;
            this.padding;
            if (t.type = this._type, t.value = this._content, t.placeholder = this._prompt, 
            i.stage.off("keydown", this, this._onKeyDown), i.stage.on("keydown", this, this._onKeyDown), 
            i.stage.focus = this, this.event("focus"), Dt.onPC && t.focus(), !(Dt.onMiniGame || Dt.onBDMiniGame || Dt.onQGMiniGame || Dt.onKGMiniGame)) {
                this._text;
                this._text = null;
            }
            this.typeset(), t.setColor(this._originColor), t.setFontSize(this.fontSize), t.setFontFace(Dt.onIPhone ? ei.fontFamilyMap[this.font] || this.font : this.font), 
            Mt.isConchApp && t.setMultiAble && t.setMultiAble(this._multiline), e.lineHeight = this.leading + this.fontSize + "px", 
            e.fontStyle = this.italic ? "italic" : "normal", e.fontWeight = this.bold ? "bold" : "normal", 
            e.textAlign = this.align, e.padding = "0 0", this._syncInputTransform(), !Mt.isConchApp && Dt.onPC && i.systemTimer.frameLoop(1, this, this._syncInputTransform);
        }, a._setPromptColor = function() {
            e.promptStyleDOM = Dt.getElementById("promptStyle"), e.promptStyleDOM || (e.promptStyleDOM = Dt.createElement("style"), 
            e.promptStyleDOM.setAttribute("id", "promptStyle"), Dt.document.head.appendChild(e.promptStyleDOM)), 
            e.promptStyleDOM.innerText = "input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color:" + this._promptColor + "}input:-moz-placeholder, textarea:-moz-placeholder {color:" + this._promptColor + "}input::-moz-placeholder, textarea::-moz-placeholder {color:" + this._promptColor + "}input:-ms-input-placeholder, textarea:-ms-input-placeholder {color:" + this._promptColor + "}";
        }, a._focusOut = function() {
            laya.display.Input.isInputting = !1, this._focus = !1, this._text = null, this._content = this.nativeInput.value, 
            this._content ? (i.superSet(ei, this, "text", this._content), i.superSet(ei, this, "color", this._originColor)) : (i.superSet(ei, this, "text", this._prompt), 
            i.superSet(ei, this, "color", this._promptColor)), i.stage.off("keydown", this, this._onKeyDown), 
            i.stage.focus = null, this.event("blur"), this.event("change"), Mt.isConchApp && this.nativeInput.blur(), 
            Dt.onPC && i.systemTimer.clear(this, this._syncInputTransform);
        }, a._onKeyDown = function(t) {
            13 === t.keyCode && (Dt.onMobile && !this._multiline && (this.focus = !1), this.event("enter"));
        }, a.changeText = function(e) {
            this._content = e, this._focus ? (this.nativeInput.value = e || "", this.event("change")) : t.prototype.changeText.call(this, e);
        }, s(0, a, "color", t.prototype._$get_color, function(t) {
            this._focus && this.nativeInput.setColor(t), i.superSet(ei, this, "color", this._content ? t : this._promptColor), 
            this._originColor = t;
        }), s(0, a, "multiline", function() {
            return this._multiline;
        }, function(t) {
            this._multiline = t, this.valign = t ? "top" : "middle";
        }), s(0, a, "maxChars", function() {
            return this._maxChars;
        }, function(t) {
            0 >= t && (t = 1e5), this._maxChars = t;
        }), s(0, a, "text", function() {
            return this._focus ? this.nativeInput.value : this._content || "";
        }, function(t) {
            i.superSet(ei, this, "color", this._originColor), t += "", this._focus ? (this.nativeInput.value = t || "", 
            this.event("change")) : (this._multiline || (t = t.replace(/\r?\n/g, "")), this._content = t, 
            t ? i.superSet(ei, this, "text", t) : (i.superSet(ei, this, "text", this._prompt), 
            i.superSet(ei, this, "color", this.promptColor)));
        }), s(0, a, "nativeInput", function() {
            return this._multiline ? e.area : e.input;
        }), s(0, a, "focus", function() {
            return this._focus;
        }, function(t) {
            var i = this.nativeInput;
            this._focus !== t && (t ? (i.target ? i.target._focusOut() : this._setInputMethod(), 
            i.target = this, this._focusIn()) : (i.target = null, this._focusOut(), Dt.document.body.scrollTop = 0, 
            i.blur(), Mt.isConchApp ? i.setPos(-1e4, -1e4) : e.inputContainer.contains(i) && e.inputContainer.removeChild(i)));
        }), s(0, a, "editable", function() {
            return this._editable;
        }, function(t) {
            this._editable = t, Mt.isConchApp && e.input.setForbidEdit(!t);
        }), s(0, a, "bgColor", t.prototype._$get_bgColor, function(t) {
            i.superSet(ei, this, "bgColor", t), Mt.isConchApp && this.nativeInput.setBgColor(t);
        }), s(0, a, "restrict", function() {
            return this._restrictPattern ? this._restrictPattern.source : "";
        }, function(t) {
            t ? (t = "[^" + t + "]", t.indexOf("^^") > -1 && (t = t.replace("^^", "")), this._restrictPattern = new RegExp(t, "g")) : this._restrictPattern = null;
        }), s(0, a, "prompt", function() {
            return this._prompt;
        }, function(t) {
            !this._text && t && i.superSet(ei, this, "color", this._promptColor), this.promptColor = this._promptColor, 
            this._text ? i.superSet(ei, this, "text", this._text == this._prompt ? t : this._text) : i.superSet(ei, this, "text", t), 
            this._prompt = ei.langPacks && ei.langPacks[t] ? ei.langPacks[t] : t;
        }), s(0, a, "promptColor", function() {
            return this._promptColor;
        }, function(t) {
            this._promptColor = t, this._content || i.superSet(ei, this, "color", t);
        }), s(0, a, "type", function() {
            return this._type;
        }, function(t) {
            "password" === t ? this._getTextStyle().asPassword = !0 : this._getTextStyle().asPassword = !1, 
            this._type = t;
        }), e.__init__ = function() {
            if (e._createInputElement(), Dt.onMobile) {
                var t = !1;
                (Dt.onMiniGame || Dt.onBDMiniGame || Dt.onQGMiniGame || Dt.onKGMiniGame) && (t = !0), 
                Mt.canvas.addEventListener(e.IOS_IFRAME ? t ? "touchend" : "click" : "touchend", e._popupInputMethod);
            }
        }, e._popupInputMethod = function(t) {
            if (laya.display.Input.isInputting) {
                var e = laya.display.Input.inputElement;
                e.focus();
            }
        }, e._createInputElement = function() {
            e._initInput(e.area = Dt.createElement("textarea")), e._initInput(e.input = Dt.createElement("input")), 
            e.inputContainer = Dt.createElement("div"), e.inputContainer.style.position = "absolute", 
            e.inputContainer.style.zIndex = 1e5, Dt.container.appendChild(e.inputContainer), 
            e.inputContainer.setPos = function(t, i) {
                e.inputContainer.style.left = t + "px", e.inputContainer.style.top = i + "px";
            };
        }, e._initInput = function(t) {
            var i = t.style;
            i.cssText = "position:absolute;overflow:hidden;resize:none;transform-origin:0 0;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;", 
            i.resize = "none", i.backgroundColor = "transparent", i.border = "none", i.outline = "none", 
            i.zIndex = 1, t.addEventListener("input", e._processInputting), t.addEventListener("mousemove", e._stopEvent), 
            t.addEventListener("mousedown", e._stopEvent), t.addEventListener("touchmove", e._stopEvent), 
            t.setFontFace = function(e) {
                t.style.fontFamily = e;
            }, Mt.isConchApp || (t.setColor = function(e) {
                t.style.color = e;
            }, t.setFontSize = function(e) {
                t.style.fontSize = e + "px";
            });
        }, e._processInputting = function(t) {
            var e = laya.display.Input.inputElement.target;
            if (e) {
                var i = laya.display.Input.inputElement.value;
                e._restrictPattern && (i = i.replace(/\u2006|\x27/g, ""), e._restrictPattern.test(i) && (i = i.replace(e._restrictPattern, ""), 
                laya.display.Input.inputElement.value = i)), e._text = i, e.event("input");
            }
        }, e._stopEvent = function(t) {
            "touchmove" == t.type && t.preventDefault(), t.stopPropagation && t.stopPropagation();
        }, e.TYPE_TEXT = "text", e.TYPE_PASSWORD = "password", e.TYPE_EMAIL = "email", e.TYPE_URL = "url", 
        e.TYPE_NUMBER = "number", e.TYPE_RANGE = "range", e.TYPE_DATE = "date", e.TYPE_MONTH = "month", 
        e.TYPE_WEEK = "week", e.TYPE_TIME = "time", e.TYPE_DATE_TIME = "datetime", e.TYPE_DATE_TIME_LOCAL = "datetime-local", 
        e.TYPE_SEARCH = "search", e.input = null, e.area = null, e.inputElement = null, 
        e.inputContainer = null, e.confirmButton = null, e.promptStyleDOM = null, e.inputHeight = 45, 
        e.isInputting = !1, e.stageMatrix = null, n(e, [ "IOS_IFRAME", function() {
            return this.IOS_IFRAME = Dt.onIOS && Dt.window.top != Dt.window.self;
        } ]), e;
    }(ei), ui = (function(t) {
        function e() {
            this._frames = null, this._url = null, e.__super.call(this), this._setControlNode(this);
        }
        r(e, "laya.display.Animation", t);
        var n = e.prototype;
        return n.destroy = function(t) {
            void 0 === t && (t = !0), this.stop(), laya.display.Sprite.prototype.destroy.call(this, t), 
            this._frames = null, this._labels = null;
        }, n.play = function(e, i, n) {
            void 0 === e && (e = 0), void 0 === i && (i = !0), void 0 === n && (n = ""), n && this._setFramesFromCache(n, !0), 
            t.prototype.play.call(this, e, i, n);
        }, n._setFramesFromCache = function(t, i) {
            if (void 0 === i && (i = !1), this._url && (t = this._url + "#" + t), t && e.framesMap[t]) {
                var n = e.framesMap[t];
                return n instanceof Array ? (this._frames = e.framesMap[t], this._count = this._frames.length) : (n.nodeRoot && (e.framesMap[t] = fi.parseAnimationByData(n), 
                n = e.framesMap[t]), this._frames = n.frames, this._count = this._frames.length, 
                this._frameRateChanged || (this._interval = n.interval), this._labels = this._copyLabels(n.labels)), 
                !0;
            }
            return i && console.log("ani not found:", t), !1;
        }, n._copyLabels = function(t) {
            if (!t) return null;
            var e;
            e = {};
            var i;
            for (i in t) e[i] = ie.copyArray([], t[i]);
            return e;
        }, n._frameLoop = function() {
            this._visible && this._style.alpha > .01 && this._frames && t.prototype._frameLoop.call(this);
        }, n._displayToIndex = function(t) {
            this._frames && (this.graphics = this._frames[t]);
        }, n.clear = function() {
            return t.prototype.clear.call(this), this.stop(), this.graphics = null, this._frames = null, 
            this._labels = null, this;
        }, n.loadImages = function(t, i) {
            return void 0 === i && (i = ""), this._url = "", this._setFramesFromCache(i) || (this.frames = e.framesMap[i] ? e.framesMap[i] : e.createFrames(t, i)), 
            this;
        }, n.loadAtlas = function(t, n, r) {
            function s(i) {
                t === i && (a.frames = e.framesMap[r] ? e.framesMap[r] : e.createFrames(t, r), n && n.run());
            }
            void 0 === r && (r = ""), this._url = "";
            var a = this;
            return a._setFramesFromCache(r) || (De.getAtlas(t) ? s(t) : i.loader.load(t, g.create(null, s, [ t ]), null, "atlas")), 
            this;
        }, n.loadAnimation = function(t, e, n) {
            this._url = t;
            var r = this;
            return this._actionName || (this._actionName = ""), r._setFramesFromCache(this._actionName) ? (r._setFramesFromCache(this._actionName, !0), 
            this.index = 0, e && e.run()) : !n || De.getAtlas(n) ? this._loadAnimationData(t, e, n) : i.loader.load(n, g.create(this, this._loadAnimationData, [ t, e, n ]), null, "atlas"), 
            this;
        }, n._loadAnimationData = function(t, n, r) {
            function s(i) {
                if (!De.getRes(i)) return void (e.framesMap[t + "#"] && (o._setFramesFromCache(a._actionName, !0), 
                a.index = 0, a._resumePlay(), n && n.run()));
                if (t === i) {
                    var r;
                    if (e.framesMap[t + "#"]) o._setFramesFromCache(a._actionName, !0), a.index = 0, 
                    a._resumePlay(); else {
                        var s = fi.parseAnimationData(De.getRes(t));
                        if (!s) return;
                        var h, l = s.animationList, u = 0, c = l.length;
                        for (u = 0; c > u; u++) r = l[u], e.framesMap[t + "#" + r.name] = r, h || (h = r);
                        h && (e.framesMap[t + "#"] = h, o._setFramesFromCache(a._actionName, !0), a.index = 0), 
                        a._resumePlay();
                    }
                    n && n.run();
                }
                De.clearRes(t);
            }
            var a = this;
            if (r && !De.getAtlas(r)) return void console.warn("atlas load fail:" + r);
            var o = this;
            De.getRes(t) ? s(t) : i.loader.load(t, g.create(null, s, [ t ]), null, "json");
        }, s(0, n, "frames", function() {
            return this._frames;
        }, function(t) {
            this._frames = t, t && (this._count = t.length, this._actionName && this._setFramesFromCache(this._actionName, !0), 
            this.index = this._index);
        }), s(0, n, "autoPlay", null, function(t) {
            t ? this.play() : this.stop();
        }), s(0, n, "source", null, function(t) {
            t.indexOf(".ani") > -1 ? this.loadAnimation(t) : t.indexOf(".json") > -1 || t.indexOf("als") > -1 || t.indexOf("atlas") > -1 ? this.loadAtlas(t) : this.loadImages(t.split(","));
        }), s(0, n, "autoAnimation", null, function(t) {
            this.play(0, !0, t);
        }), e.createFrames = function(t, i) {
            var n;
            if ("string" == typeof t) {
                var r = De.getAtlas(t);
                if (r && r.length) {
                    n = [];
                    for (var s = 0, a = r.length; a > s; s++) {
                        var o = new qt();
                        o.drawImage(De.getRes(r[s]), 0, 0), n.push(o);
                    }
                }
            } else if (t instanceof Array) for (n = [], s = 0, a = t.length; a > s; s++) o = new qt(), 
            o.loadImage(t[s], 0, 0), n.push(o);
            return i && (e.framesMap[i] = n), n;
        }, e.clearCache = function(t) {
            var i, n = e.framesMap, r = t + "#";
            for (i in n) (i === t || 0 === i.indexOf(r)) && delete e.framesMap[i];
        }, e.framesMap = {}, e;
    }(ii), function(t) {
        function e(t, i, n, r, s) {
            this._params2dQuick2 = null, this._shaderValueWidth = 0, this._shaderValueHeight = 0, 
            e.__super.call(this, t, i, n, r, s);
        }
        r(e, "laya.webgl.shader.d2.Shader2X", t);
        var i = e.prototype;
        return i._disposeResource = function() {
            t.prototype._disposeResource.call(this), this._params2dQuick2 = null;
        }, i.upload2dQuick2 = function(t) {
            this.upload(t, this._params2dQuick2 || this._make2dQuick2());
        }, i._make2dQuick2 = function() {
            if (!this._params2dQuick2) {
                this._params2dQuick2 = [];
                for (var t, e = this._params, i = 0, n = e.length; n > i; i++) t = e[i], "size" !== t.name && this._params2dQuick2.push(t);
            }
            return this._params2dQuick2;
        }, e.create = function(t, i, n, r, s) {
            return new e(t, i, n, r, s);
        }, e;
    }(ni)), ci = function(t) {
        function e() {
            this._targetDic = null, this._animationData = null, this._usedFrames = null, e.__super.call(this), 
            null === e._sortIndexFun && (e._sortIndexFun = R.sortByKey("index", !1, !0));
        }
        r(e, "laya.display.FrameAnimation", t);
        var i = e.prototype;
        return i._setUp = function(t, e) {
            this._targetDic = t, this._animationData = e, this.interval = 1e3 / e.frameRate, 
            e.parsed ? (this._count = e.count, this._labels = e.labels, this._usedFrames = e.animationNewFrames) : (this._usedFrames = [], 
            this._calculateDatas(), e.parsed = !0, e.labels = this._labels, e.count = this._count, 
            e.animationNewFrames = this._usedFrames);
        }, i.clear = function() {
            return t.prototype.clear.call(this), this._targetDic = null, this._animationData = null, 
            this;
        }, i._displayToIndex = function(t) {
            if (this._animationData) {
                0 > t && (t = 0), t > this._count && (t = this._count);
                var e = this._animationData.nodes, i = 0, n = e.length;
                for (i = 0; n > i; i++) this._displayNodeToFrame(e[i], t);
            }
        }, i._displayNodeToFrame = function(t, e, i) {
            i || (i = this._targetDic);
            var n = i[t.target];
            if (n) {
                var r, s, a, o = t.frames, h = t.keys, l = 0, u = h.length;
                for (l = 0; u > l; l++) r = h[l], s = o[r], a = s.length > e ? s[e] : s[s.length - 1], 
                n[r] = a;
                var c = t.funkeys;
                u = c.length;
                var _;
                if (0 != u) for (l = 0; u > l; l++) r = c[l], _ = o[r], void 0 !== _[e] && n[r] && n[r].apply(n, _[e]);
            }
        }, i._calculateDatas = function() {
            if (this._animationData) {
                var t, e = this._animationData.nodes, i = 0, n = e.length;
                for (this._count = 0, i = 0; n > i; i++) t = e[i], this._calculateKeyFrames(t);
                this._count += 1;
            }
        }, i._calculateKeyFrames = function(t) {
            var i, n, r = t.keyframes, s = t.target;
            t.frames || (t.frames = {}), t.keys ? t.keys.length = 0 : t.keys = [], t.funkeys ? t.funkeys.length = 0 : t.funkeys = [], 
            t.initValues || (t.initValues = {});
            for (i in r) {
                var a = -1 != i.indexOf("()");
                if (n = r[i], a && (i = i.substr(0, i.length - 2)), t.frames[i] || (t.frames[i] = []), 
                a) {
                    t.funkeys.push(i);
                    for (var o = t.frames[i], h = 0; h < n.length; h++) {
                        var l = n[h];
                        o[l.index] = l.value, l.index > this._count && (this._count = l.index);
                    }
                } else this._targetDic && this._targetDic[s] && (t.initValues[i] = this._targetDic[s][i]), 
                n.sort(e._sortIndexFun), t.keys.push(i), this._calculateNodePropFrames(n, t.frames[i], i, s);
            }
        }, i.resetNodes = function() {
            if (this._targetDic && this._animationData) {
                var t, e, i = this._animationData.nodes, n = 0, r = i.length;
                for (n = 0; r > n; n++) if (t = i[n], e = t.initValues) {
                    var s = this._targetDic[t.target];
                    if (s) {
                        var a;
                        for (a in e) s[a] = e[a];
                    }
                }
            }
        }, i._calculateNodePropFrames = function(t, e, i, n) {
            var r = 0, s = t.length - 1;
            for (e.length = t[s].index + 1, r = 0; s > r; r++) this._dealKeyFrame(t[r]), this._calculateFrameValues(t[r], t[r + 1], e);
            0 == s && (e[0] = t[0].value, this._usedFrames && (this._usedFrames[t[0].index] = !0)), 
            this._dealKeyFrame(t[r]);
        }, i._dealKeyFrame = function(t) {
            t.label && "" != t.label && this.addLabel(t.label, t.index);
        }, i._calculateFrameValues = function(t, e, i) {
            var n, r = 0, s = t.index, a = e.index, o = t.value, h = e.value - t.value, l = a - s, u = this._usedFrames;
            if (a > this._count && (this._count = a), t.tween) for (n = te[t.tweenMethod], null == n && (n = te.linearNone), 
            r = s; a > r; r++) i[r] = n(r - s, o, h, l), u && (u[r] = !0); else for (r = s; a > r; r++) i[r] = o;
            u && (u[t.index] = !0, u[e.index] = !0), i[e.index] = e.value;
        }, e._sortIndexFun = null, e;
    }(ii), _i = function(t) {
        function e(t, i, n, r, s) {
            if (void 0 === t && (t = 0), void 0 === i && (i = 0), void 0 === n && (n = 1), void 0 === r && (r = !0), 
            void 0 === s && (s = !1), e.__super.call(this, n, r), this._glTextureType = 3553, 
            this._width = t, this._height = i, this._canRead = s, this._setWarpMode(10242, this._wrapModeU), 
            this._setWarpMode(10243, this._wrapModeV), this._setFilterMode(this._filterMode), 
            this._setAnisotropy(this._anisoLevel), this._mipmap) {
                this._mipmapCount = Math.max(Math.ceil(Math.log2(t)) + 1, Math.ceil(Math.log2(2)) + 1);
                for (var a = 0; a < this._mipmapCount; a++) this._setPixels(null, a, Math.max(t >> a, 1), Math.max(i >> a, 1));
                this._setGPUMemory(t * i * 4 * (1 + 1 / 3));
            } else this._mipmapCount = 1, this._setGPUMemory(t * i * 4);
        }
        r(e, "laya.resource.Texture2D", t);
        var n = e.prototype;
        return n._getFormatByteCount = function() {
            switch (this._format) {
              case 0:
                return 3;

              case 1:
                return 4;

              case 2:
                return 1;

              default:
                throw "Texture2D: unknown format.";
            }
        }, n._setPixels = function(t, e, i, n) {
            var r = Pt.instance, s = this._glTextureType, a = this._getGLFormat();
            nt.bindTexture(r, s, this._glTexture), 0 === this.format ? (r.pixelStorei(3317, 1), 
            r.texImage2D(s, e, a, i, n, 0, a, 5121, t), r.pixelStorei(3317, 4)) : r.texImage2D(s, e, a, i, n, 0, a, 5121, t);
        }, n._calcualatesCompressedDataSize = function(t, e, i) {
            switch (t) {
              case 3:
              case 5:
                return (e + 3 >> 2) * (i + 3 >> 2) * 8;

              case 4:
                return (e + 3 >> 2) * (i + 3 >> 2) * 16;

              case 11:
              case 12:
                return Math.floor((Math.max(e, 8) * Math.max(i, 8) * 4 + 7) / 8);

              case 9:
              case 10:
                return Math.floor((Math.max(e, 16) * Math.max(i, 8) * 2 + 7) / 8);

              default:
                return 0;
            }
        }, n._pharseDDS = function(t) {
            var e = 827611204, i = 894720068, n = 4, r = 131072, s = 542327876, a = 31, o = 0, h = 1, l = 2, u = 3, c = 4, _ = 7, d = 20, f = 21, p = new Int32Array(t, 0, a);
            if (p[o] != s) throw "Invalid magic number in DDS header";
            if (!(p[d] & n)) throw "Unsupported format, must contain a FourCC code";
            var m = p[f];
            switch (this._format) {
              case 3:
                if (m !== e) throw "the FourCC code is not same with texture format.";
                break;

              case 4:
                if (m !== i) throw "the FourCC code is not same with texture format.";
                break;

              default:
                throw "unknown texture format.";
            }
            var g = 1;
            if (p[l] & r) {
                if (g = Math.max(1, p[_]), !this._mipmap) throw "the mipmap is not same with Texture2D.";
            } else if (this._mipmap) throw "the mipmap is not same with Texture2D.";
            var v = p[c], y = p[u];
            this._width = v, this._height = y;
            var x = p[h] + 4;
            this._upLoadCompressedTexImage2D(t, v, y, g, x, 0);
        }, n._pharseKTX = function(t) {
            var e = 13, i = 4, n = 7, r = 6, s = 11, a = 12, o = new Uint8Array(t, 0, 12);
            if (171 != o[0] || 75 != o[1] || 84 != o[2] || 88 != o[3] || 32 != o[4] || 49 != o[5] || 49 != o[6] || 187 != o[7] || 13 != o[8] || 10 != o[9] || 26 != o[10] || 10 != o[11]) throw "Invalid fileIdentifier in KTX header";
            var h = new Int32Array(o.buffer, o.length, e), l = h[i];
            switch (l) {
              case nt._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL:
                this._format = 5;
                break;

              default:
                throw "unknown texture format.";
            }
            var u = h[s], c = h[r], _ = h[n];
            this._width = c, this._height = _;
            var d = 64 + h[a];
            this._upLoadCompressedTexImage2D(t, c, _, u, d, 4);
        }, n._pharsePVR = function(t) {
            var e = 0, i = 1, n = 2, r = 3, s = 55727696, a = 13, o = 0, h = 2, l = 6, u = 7, c = 11, _ = 12, d = new Int32Array(t, 0, a);
            if (d[o] != s) throw "Invalid magic number in PVR header";
            var f = d[h];
            switch (f) {
              case e:
                this._format = 9;
                break;

              case n:
                this._format = 11;
                break;

              case i:
                this._format = 10;
                break;

              case r:
                this._format = 12;
                break;

              default:
                throw "Texture2D:unknown PVR format.";
            }
            var p = d[c], m = d[u], g = d[l];
            this._width = m, this._height = g;
            var v = d[_] + 52;
            this._upLoadCompressedTexImage2D(t, m, g, p, v, 0);
        }, n._upLoadCompressedTexImage2D = function(t, e, i, n, r, s) {
            var a = Pt.instance, o = this._glTextureType;
            nt.bindTexture(a, o, this._glTexture);
            for (var h = this._getGLFormat(), l = r, u = 0; n > u; u++) {
                l += s;
                var c = this._calcualatesCompressedDataSize(this._format, e, i), _ = new Uint8Array(t, l, c);
                a.compressedTexImage2D(o, u, h, e, i, 0, _), e = Math.max(e >> 1, 1), i = Math.max(i >> 1, 1), 
                l += c;
            }
            var d = l;
            this._setGPUMemory(d), this._readyed = !0, this._activeResource();
        }, n.loadImageSource = function(t, e) {
            void 0 === e && (e = !1);
            var i = t.width, n = t.height;
            this._width = i, this._height = n, this._isPot(i) && this._isPot(n) || (this._mipmap = !1), 
            this._setWarpMode(10242, this._wrapModeU), this._setWarpMode(10243, this._wrapModeV), 
            this._setFilterMode(this._filterMode);
            var r = Pt.instance;
            nt.bindTexture(r, this._glTextureType, this._glTexture);
            var s = this._getGLFormat();
            Mt.isConchApp ? t instanceof laya.resource.HTMLCanvas ? r.texImage2D(this._glTextureType, 0, 6408, 6408, 5121, t) : (t.setPremultiplyAlpha(e), 
            r.texImage2D(this._glTextureType, 0, 6408, 6408, 5121, t)) : (e && r.pixelStorei(37441, !0), 
            r.texImage2D(this._glTextureType, 0, s, s, 5121, t), e && r.pixelStorei(37441, !1)), 
            this._mipmap ? (r.generateMipmap(this._glTextureType), this._setGPUMemory(i * n * 4 * (1 + 1 / 3))) : this._setGPUMemory(i * n * 4), 
            this._canRead && (Mt.isConchApp ? this._pixels = new Uint8Array(t._nativeObj.getImageData(0, 0, i, n)) : (Dt.canvas.size(i, n), 
            Dt.canvas.clear(), Dt.context.drawImage(t, 0, 0, i, n), this._pixels = new Uint8Array(Dt.context.getImageData(0, 0, i, n).data.buffer))), 
            this._readyed = !0, this._activeResource();
        }, n.setPixels = function(t, e) {
            if (void 0 === e && (e = 0), !t) throw "Texture2D:pixels can't be null.";
            var i = Math.max(this._width >> e, 1), n = Math.max(this._height >> e, 1), r = i * n * this._getFormatByteCount();
            if (t.length < r) throw "Texture2D:pixels length should at least " + r + ".";
            this._setPixels(t, e, i, n), this._canRead && (this._pixels = t), this._readyed = !0, 
            this._activeResource();
        }, n.setSubPixels = function(t, e, i, n, r, s) {
            if (void 0 === s && (s = 0), !r) throw "Texture2D:pixels can't be null.";
            var a = Pt.instance, o = this._glTextureType;
            nt.bindTexture(a, o, this._glTexture);
            var h = this._getGLFormat();
            0 === this._format ? (a.pixelStorei(3317, 1), a.texSubImage2D(o, s, t, e, i, n, h, 5121, r), 
            a.pixelStorei(3317, 4)) : a.texSubImage2D(o, s, t, e, i, n, h, 5121, r), this._readyed = !0, 
            this._activeResource();
        }, n.setCompressData = function(t) {
            switch (this._format) {
              case 3:
              case 4:
                this._pharseDDS(t);
                break;

              case 5:
                this._pharseKTX(t);
                break;

              case 9:
              case 10:
              case 11:
              case 12:
                this._pharsePVR(t);
                break;

              default:
                throw "Texture2D:unkonwn format.";
            }
        }, n._recoverResource = function() {}, n.getPixels = function() {
            if (this._canRead) return this._pixels;
            throw new Error("Texture2D: must set texture canRead is true.");
        }, s(0, n, "mipmapCount", function() {
            return this._mipmapCount;
        }), s(0, n, "defaulteTexture", function() {
            return laya.resource.Texture2D.grayTexture;
        }), e.__init__ = function() {
            var t = new Uint8Array(3);
            t[0] = 128, t[1] = 128, t[2] = 128, e.grayTexture = new e(1, 1, 0, !1, !1), e.grayTexture.setPixels(t), 
            e.grayTexture.lock = !0, t[0] = 255, t[1] = 255, t[2] = 255, e.whiteTexture = new e(1, 1, 0, !1, !1), 
            e.whiteTexture.setPixels(t), e.whiteTexture.lock = !0, t[0] = 0, t[1] = 0, t[2] = 0, 
            e.blackTexture = new e(1, 1, 0, !1, !1), e.blackTexture.setPixels(t), e.blackTexture.lock = !0;
        }, e._parse = function(t, i, n) {
            var r = n ? new e(n[0], n[1], n[2], n[3], n[4]) : new e(0, 0);
            switch (i && (r.wrapModeU = i.wrapModeU, r.wrapModeV = i.wrapModeV, r.filterMode = i.filterMode, 
            r.anisoLevel = i.anisoLevel), r._format) {
              case 0:
              case 1:
                r.loadImageSource(t);
                break;

              case 3:
              case 4:
              case 5:
              case 9:
              case 10:
              case 11:
              case 12:
                r.setCompressData(t);
                break;

              default:
                throw "Texture2D:unkonwn format.";
            }
            return r;
        }, e.load = function(t, e) {
            i.loader.create(t, e, null, "TEXTURE2D");
        }, e.grayTexture = null, e.whiteTexture = null, e.blackTexture = null, e;
    }(ri), di = function(t) {
        function e(t, i, n, r) {
            this._mgrKey = 0, void 0 === n && (n = 0), void 0 === r && (r = 0), e.__super.call(this, n, !1), 
            this._glTextureType = 3553, this._width = t, this._height = i, this._depthStencilFormat = r, 
            this._create(t, i), this.lock = !0;
        }
        r(e, "laya.resource.RenderTexture2D", t);
        var i = e.prototype;
        return i.getIsReady = function() {
            return !0;
        }, i._create = function(t, e) {
            var i = Pt.instance;
            this._frameBuffer = i.createFramebuffer(), nt.bindTexture(i, this._glTextureType, this._glTexture);
            var n = this._getGLFormat();
            if (i.texImage2D(this._glTextureType, 0, n, t, e, 0, n, 5121, null), this._setGPUMemory(t * e * 4), 
            i.bindFramebuffer(36160, this._frameBuffer), i.framebufferTexture2D(36160, 36064, 3553, this._glTexture, 0), 
            3 !== this._depthStencilFormat) switch (this._depthStencilBuffer = i.createRenderbuffer(), 
            i.bindRenderbuffer(36161, this._depthStencilBuffer), this._depthStencilFormat) {
              case 0:
                i.renderbufferStorage(36161, 33189, t, e), i.framebufferRenderbuffer(36160, 36096, 36161, this._depthStencilBuffer);
                break;

              case 1:
                i.renderbufferStorage(36161, 36168, t, e), i.framebufferRenderbuffer(36160, 36128, 36161, this._depthStencilBuffer);
                break;

              case 2:
                i.renderbufferStorage(36161, 34041, t, e), i.framebufferRenderbuffer(36160, 33306, 36161, this._depthStencilBuffer);
            }
            i.bindFramebuffer(36160, null), i.bindRenderbuffer(36161, null), this._setWarpMode(10242, this._wrapModeU), 
            this._setWarpMode(10243, this._wrapModeV), this._setFilterMode(this._filterMode), 
            this._setAnisotropy(this._anisoLevel), this._readyed = !0, this._activeResource();
        }, i.generateMipmap = function() {
            this._isPot(this.width) && this._isPot(this.height) ? (this._mipmap = !0, Pt.instance.generateMipmap(this._glTextureType), 
            this._setFilterMode(this._filterMode), this._setGPUMemory(this.width * this.height * 4 * (1 + 1 / 3))) : (this._mipmap = !1, 
            this._setGPUMemory(this.width * this.height * 4));
        }, i.start = function() {
            var t = Pt.instance;
            Pt.instance.bindFramebuffer(36160, this._frameBuffer), this._lastRT = e._currentActive, 
            e._currentActive = this, this._readyed = !0, t.viewport(0, 0, this._width, this._height), 
            this._lastWidth = ft.width, this._lastHeight = ft.height, ft.width = this._width, 
            ft.height = this._height, Ke.activeShader = null;
        }, i.end = function() {
            Pt.instance.bindFramebuffer(36160, null), e._currentActive = null, this._readyed = !0;
        }, i.restore = function() {
            var t = Pt.instance;
            this._lastRT != e._currentActive && (Pt.instance.bindFramebuffer(36160, this._lastRT ? this._lastRT._frameBuffer : null), 
            e._currentActive = this._lastRT), this._readyed = !0, t.viewport(0, 0, this._lastWidth, this._lastHeight), 
            ft.width = this._lastWidth, ft.height = this._lastHeight, Ke.activeShader = null;
        }, i.clear = function(t, e, i, n) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 1);
            var r = Pt.instance;
            r.clearColor(t, e, i, n);
            var s = 16384;
            switch (this._depthStencilFormat) {
              case 33189:
                s |= 256;
                break;

              case 36168:
                s |= 1024;
                break;

              case 34041:
                s |= 256, s |= 1024;
            }
            r.clear(s);
        }, i.getData = function(t, e, i, n) {
            if (Mt.isConchApp && 2 == conchConfig.threadMode) throw "native 2 thread mode use getDataAsync";
            var r = Pt.instance;
            r.bindFramebuffer(36160, this._frameBuffer);
            var s = 36053 === r.checkFramebufferStatus(36160);
            if (!s) return r.bindFramebuffer(36160, null), null;
            var a = new Uint8Array(this._width * this._height * 4), o = this._getGLFormat();
            return r.readPixels(t, e, i, n, o, 5121, a), r.bindFramebuffer(36160, null), a;
        }, i.getDataAsync = function(t, e, i, n, r) {
            var s = Pt.instance;
            s.bindFramebuffer(36160, this._frameBuffer), s.readPixelsAsync(t, e, i, n, 6408, 5121, function(t) {
                r(new Uint8Array(t));
            }), s.bindFramebuffer(36160, null);
        }, i.recycle = function() {}, i._disposeResource = function() {
            if (this._frameBuffer) {
                var t = Pt.instance;
                t.deleteTexture(this._glTexture), t.deleteFramebuffer(this._frameBuffer), t.deleteRenderbuffer(this._depthStencilBuffer), 
                this._glTexture = null, this._frameBuffer = null, this._depthStencilBuffer = null, 
                this._setGPUMemory(0);
            }
        }, s(0, i, "depthStencilFormat", function() {
            return this._depthStencilFormat;
        }), s(0, i, "defaulteTexture", function() {
            return _i.grayTexture;
        }), s(0, i, "sourceWidth", function() {
            return this._width;
        }), s(0, i, "sourceHeight", function() {
            return this._height;
        }), s(0, i, "offsetX", function() {
            return 0;
        }), s(0, i, "offsetY", function() {
            return 0;
        }), s(1, e, "currentActive", function() {
            return e._currentActive;
        }, laya.resource.BaseTexture._$SET_currentActive), e.pushRT = function() {
            e.rtStack.push({
                rt: e._currentActive,
                w: ft.width,
                h: ft.height
            });
        }, e.popRT = function() {
            var t = Pt.instance, i = e.rtStack.pop();
            i && (e._currentActive != i.rt && (Pt.instance.bindFramebuffer(36160, i.rt ? i.rt._frameBuffer : null), 
            e._currentActive = i.rt), t.viewport(0, 0, i.w, i.h), ft.width = i.w, ft.height = i.h);
        }, e._currentActive = null, e.rtStack = [], n(e, [ "defuv", function() {
            return this.defuv = [ 0, 0, 1, 0, 1, 1, 0, 1 ];
        }, "flipyuv", function() {
            return this.flipyuv = [ 0, 1, 1, 1, 1, 0, 0, 0 ];
        } ]), e;
    }(ri), fi = function(t) {
        function e() {
            this.animationList = null, this.animationDic = null, this._nodeList = null, this._nodeDefaultProps = null, 
            this._gList = null, this._nodeIDAniDic = {}, this._rootNode = null, this._nodeGDic = null, 
            e.__super.call(this);
        }
        var i;
        r(e, "laya.utils.GraphicAnimation", t);
        var s = e.prototype;
        return s._parseNodeList = function(t) {
            this._nodeList || (this._nodeList = []), this._nodeDefaultProps[t.compId] = t.props, 
            t.compId && this._nodeList.push(t.compId);
            var e = t.child;
            if (e) {
                var i = 0, n = e.length;
                for (i = 0; n > i; i++) this._parseNodeList(e[i]);
            }
        }, s._calGraphicData = function(t) {
            if (this._setUp(null, t), this._createGraphicData(), this._nodeIDAniDic) {
                var e;
                for (e in this._nodeIDAniDic) this._nodeIDAniDic[e] = null;
            }
        }, s._createGraphicData = function() {
            var t = [], e = 0, i = this.count, n = this._usedFrames;
            n || (n = []);
            var r;
            for (e = 0; i > e; e++) (n[e] || !r) && (r = this._createFrameGraphic(e)), t.push(r);
            this._gList = t;
        }, s._createFrameGraphic = function(t) {
            var i = new qt();
            return e._rootMatrix || (e._rootMatrix = new st()), this._updateNodeGraphic(this._rootNode, t, e._rootMatrix, i), 
            i;
        }, s._updateNodeGraphic = function(t, e, i, n, r) {
            void 0 === r && (r = 1);
            var s;
            s = this._nodeGDic[t.compId] = this._getNodeGraphicData(t.compId, e, this._nodeGDic[t.compId]), 
            s.resultTransform || (s.resultTransform = new st());
            var a;
            a = s.resultTransform, st.mul(s.transform, i, a);
            var o, h = s.alpha * r;
            if (!(.01 > h)) {
                s.skin && (o = this._getTextureByUrl(s.skin), o && (a._checkTransform() ? (n.drawTexture(o, 0, 0, s.width, s.height, a, h), 
                s.resultTransform = null) : n.drawTexture(o, a.tx, a.ty, s.width, s.height, null, h)));
                var l = t.child;
                if (l) {
                    var u = 0, c = 0;
                    for (c = l.length, u = 0; c > u; u++) this._updateNodeGraphic(l[u], e, a, n, h);
                }
            }
        }, s._updateNoChilds = function(t, e) {
            if (t.skin) {
                var i = this._getTextureByUrl(t.skin);
                if (i) {
                    var n = t.transform;
                    n._checkTransform();
                    var r = !1;
                    r = !n._bTransform, r ? e.drawTexture(i, n.tx, n.ty, t.width, t.height, null, t.alpha) : e.drawTexture(i, 0, 0, t.width, t.height, n.clone(), t.alpha);
                }
            }
        }, s._updateNodeGraphic2 = function(t, e, i) {
            var n;
            if (n = this._nodeGDic[t.compId] = this._getNodeGraphicData(t.compId, e, this._nodeGDic[t.compId]), 
            !t.child) return void this._updateNoChilds(n, i);
            var r = n.transform;
            r._checkTransform();
            var s = !1;
            s = !r._bTransform;
            var a = !1;
            a = s && (0 != r.tx || 0 != r.ty);
            var o = !1;
            o = r._bTransform || 1 != n.alpha, o && i.save(), 1 != n.alpha && i.alpha(n.alpha), 
            s ? a && i.translate(r.tx, r.ty) : i.transform(r.clone());
            var h, l = t.child;
            if (n.skin && (h = this._getTextureByUrl(n.skin), h && i.drawImage(h, 0, 0, n.width, n.height)), 
            l) {
                var u = 0, c = 0;
                for (c = l.length, u = 0; c > u; u++) this._updateNodeGraphic2(l[u], e, i);
            }
            o ? i.restore() : s ? a && i.translate(-r.tx, -r.ty) : i.transform(r.clone().invert());
        }, s._calculateKeyFrames = function(e) {
            t.prototype._calculateKeyFrames.call(this, e), this._nodeIDAniDic[e.target] = e;
        }, s.getNodeDataByID = function(t) {
            return this._nodeIDAniDic[t];
        }, s._getParams = function(t, i, n, r) {
            var s = e._temParam;
            s.length = i.length;
            var a = 0, o = i.length;
            for (a = 0; o > a; a++) s[a] = this._getObjVar(t, i[a][0], n, i[a][1], r);
            return s;
        }, s._getObjVar = function(t, e, i, n, r) {
            if (t.hasOwnProperty(e)) {
                var s = t[e];
                return i >= s.length && (i = s.length - 1), t[e][i];
            }
            return r.hasOwnProperty(e) ? r[e] : n;
        }, s._getNodeGraphicData = function(t, n, r) {
            r || (r = new i()), r.transform ? r.transform.identity() : r.transform = new st();
            var s = this.getNodeDataByID(t);
            if (!s) return r;
            var a = s.frames, o = this._getParams(a, e._drawTextureCmd, n, this._nodeDefaultProps[t]), h = o[0], l = NaN, u = NaN, c = o[5], _ = o[6], d = o[13], f = o[14], p = o[7], m = o[8], g = o[9], v = o[11], y = o[12];
            l = o[3], u = o[4], (0 == l || 0 == u) && (h = null), -1 == l && (l = 0), -1 == u && (u = 0);
            var x;
            r.skin = h, r.width = l, r.height = u, h && (x = this._getTextureByUrl(h), x ? (l || (l = x.sourceWidth), 
            u || (u = x.sourceHeight)) : console.warn("lost skin:", h, ",you may load pics first")), 
            r.alpha = o[10];
            var T = r.transform;
            0 != d && (c = d * l), 0 != f && (_ = f * u), (0 != c || 0 != _) && T.translate(-c, -_);
            var b = null;
            if (g || 1 !== p || 1 !== m || v || y) {
                b = e._tempMt, b.identity(), b._bTransform = !0;
                var w = .0174532922222222 * (g - v), C = .0174532922222222 * (g + y), A = Math.cos(C), E = Math.sin(C), S = Math.sin(w), M = Math.cos(w);
                b.a = p * A, b.b = p * E, b.c = -m * S, b.d = m * M, b.tx = b.ty = 0;
            }
            return b && (T = st.mul(T, b, T)), T.translate(o[1], o[2]), r;
        }, s._getTextureByUrl = function(t) {
            return De.getRes(t);
        }, s.setAniData = function(t, i) {
            if (t.animations) {
                this._nodeDefaultProps = {}, this._nodeGDic = {}, this._nodeList && (this._nodeList.length = 0), 
                this._rootNode = t, this._parseNodeList(t);
                var n, r = {}, s = [], a = t.animations, o = 0, h = a.length;
                for (o = 0; h > o; o++) if (n = a[o], this._labels = null, (!i || i == n.name) && n) {
                    try {
                        this._calGraphicData(n);
                    } catch (l) {
                        console.warn("parse animation fail:" + n.name + ",empty animation created"), this._gList = [];
                    }
                    var u = {};
                    u.interval = 1e3 / n.frameRate, u.frames = this._gList, u.labels = this._labels, 
                    u.name = n.name, s.push(u), r[n.name] = u;
                }
                this.animationList = s, this.animationDic = r;
            }
            e._temParam.length = 0;
        }, s.parseByData = function(t) {
            var e, i;
            e = t.nodeRoot, i = t.aniO, delete t.nodeRoot, delete t.aniO, this._nodeDefaultProps = {}, 
            this._nodeGDic = {}, this._nodeList && (this._nodeList.length = 0), this._rootNode = e, 
            this._parseNodeList(e), this._labels = null;
            try {
                this._calGraphicData(i);
            } catch (n) {
                console.warn("parse animation fail:" + i.name + ",empty animation created"), this._gList = [];
            }
            var r = t;
            return r.interval = 1e3 / i.frameRate, r.frames = this._gList, r.labels = this._labels, 
            r.name = i.name, r;
        }, s.setUpAniData = function(t) {
            if (t.animations) {
                var e, i = {}, n = [], r = t.animations, s = 0, a = r.length;
                for (s = 0; a > s; s++) if (e = r[s]) {
                    var o = {};
                    o.name = e.name, o.aniO = e, o.nodeRoot = t, n.push(o), i[e.name] = o;
                }
                this.animationList = n, this.animationDic = i;
            }
        }, s._clear = function() {
            this.animationList = null, this.animationDic = null, this._gList = null, this._nodeGDic = null;
        }, e.parseAnimationByData = function(t) {
            e._I || (e._I = new e());
            var i;
            return i = e._I.parseByData(t), e._I._clear(), i;
        }, e.parseAnimationData = function(t) {
            e._I || (e._I = new e()), e._I.setUpAniData(t);
            var i;
            return i = {}, i.animationList = e._I.animationList, i.animationDic = e._I.animationDic, 
            e._I._clear(), i;
        }, e._temParam = [], e._I = null, e._rootMatrix = null, n(e, [ "_drawTextureCmd", function() {
            return this._drawTextureCmd = [ [ "skin", null ], [ "x", 0 ], [ "y", 0 ], [ "width", -1 ], [ "height", -1 ], [ "pivotX", 0 ], [ "pivotY", 0 ], [ "scaleX", 1 ], [ "scaleY", 1 ], [ "rotation", 0 ], [ "alpha", 1 ], [ "skewX", 0 ], [ "skewY", 0 ], [ "anchorX", 0 ], [ "anchorY", 0 ] ];
        }, "_tempMt", function() {
            return this._tempMt = new st();
        } ]), e.__init$ = function() {
            i = function() {
                function t() {
                    this.skin = null, this.transform = null, this.resultTransform = null, this.width = NaN, 
                    this.height = NaN, this.alpha = 1;
                }
                return r(t, ""), t;
            }();
        }, e;
    }(ci);
    (function(t) {
        function e() {
            this._target = null, this._playEvent = null, this._initData = {}, this._aniKeys = null, 
            this._effectClass = null, e.__super.call(this);
        }
        r(e, "laya.display.EffectAnimation", t);
        var i = e.prototype;
        return i._onOtherBegin = function(t) {
            t !== this && this.stop();
        }, i._addEvent = function() {
            this._target && this._playEvent && (this._setControlNode(this._target), this._target.on(this._playEvent, this, this._onPlayAction));
        }, i._onPlayAction = function() {
            this.play(0, !1);
        }, i.play = function(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = !0), void 0 === i && (i = ""), this._target && (this._target.event("effectbegin", [ this ]), 
            this._recordInitData(), laya.display.AnimationBase.prototype.play.call(this, t, e, i));
        }, i._recordInitData = function() {
            if (this._aniKeys) {
                var t = 0, e = 0;
                e = this._aniKeys.length;
                var i;
                for (t = 0; e > t; t++) i = this._aniKeys[t], this._initData[i] = this._target[i];
            }
        }, i._displayToIndex = function(t) {
            if (this._animationData) {
                0 > t && (t = 0), t > this._count && (t = this._count);
                var e = this._animationData.nodes, i = 0, n = e.length;
                for (n = n > 1 ? 1 : n, i = 0; n > i; i++) this._displayNodeToFrame(e[i], t);
            }
        }, i._displayNodeToFrame = function(t, e, i) {
            if (this._target) {
                var n, r, s, a, o, h, l, u = this._target, c = t.frames, _ = t.keys, d = 0, f = _.length, p = t.secondFrames, m = 0;
                for (d = 0; f > d; d++) n = _[d], r = c[n], m = p[n], -1 == m ? s = this._initData[n] : m > e ? (o = t.keyframes[n], 
                h = o[0], h.tween ? (a = te[h.tweenMethod], null == a && (a = te.linearNone), l = o[1], 
                s = a(e, this._initData[n], l.value - this._initData[n], l.index)) : s = this._initData[n]) : s = r.length > e ? r[e] : r[r.length - 1], 
                u[n] = s;
            }
        }, i._calculateKeyFrames = function(e) {
            t.prototype._calculateKeyFrames.call(this, e);
            var i, n, r = e.keyframes, s = (e.target, {});
            e.secondFrames = s;
            for (i in r) n = r[i], n.length <= 1 ? s[i] = -1 : s[i] = n[1].index;
        }, s(0, i, "target", function() {
            return this._target;
        }, function(t) {
            this._target && this._target.off("effectbegin", this, this._onOtherBegin), this._target = t, 
            this._target && this._target.on("effectbegin", this, this._onOtherBegin), this._addEvent();
        }), s(0, i, "playEvent", null, function(t) {
            this._playEvent = t, t && this._addEvent();
        }), s(0, i, "effectData", null, function(t) {
            if (t) {
                var e = t.animations;
                if (e && e[0]) {
                    var i = e[0];
                    this._setUp({}, i), i.nodes && i.nodes[0] && (this._aniKeys = i.nodes[0].keys);
                }
            }
        }), s(0, i, "effectClass", null, function(t) {
            if (this._effectClass = Rt.getClass(t), this._effectClass) {
                var e = this._effectClass.uiView;
                if (e) {
                    var i = e.animations;
                    if (i && i[0]) {
                        var n = i[0];
                        this._setUp({}, n), n.nodes && n.nodes[0] && (this._aniKeys = n.nodes[0].keys);
                    }
                }
            }
        }), e.EFFECT_BEGIN = "effectbegin", e;
    })(ci);
    i.__init([ m, ut, Ne, E, fi, pt, Mt, $, J, $t, bt, be, d, Me ]);
}(window, document, Laya), function(t, e, i) {
    var n = (i.un, i.uns, i["static"], i["class"]), r = (i.getset, i.__newvec, function() {
        function t() {}
        return n(t, "LayaMain"), t;
    }());
    new r();
}(window, document, Laya);