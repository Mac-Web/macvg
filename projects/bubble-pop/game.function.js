(function() {
var b = {}
  , c = null
  , d = !0
  , e = !1;
if ("undefined" !== typeof AudioContext)
    c = new AudioContext;
else if ("undefined" !== typeof webkitAudioContext)
    c = new webkitAudioContext;
else if ("undefined" !== typeof Audio) {
    d = !1;
    try {
        new Audio
    } catch (g) {
        e = !0
    }
} else
    d = !1,
    e = !0;
if (d) {
    var m = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
    m.gain.value = 1;
    m.connect(c.destination)
}
var x = function() {
    this._volume = 1;
    this._muted = !1;
    this.usingWebAudio = d;
    this.noAudio = e;
    this._howls = []
};
x.prototype = {
    volume: function(b) {
        b = parseFloat(b);
        if (0 <= b && 1 >= b) {
            this._volume = b;
            d && (m.gain.value = b);
            for (var c in this._howls)
                if (this._howls.hasOwnProperty(c) && !1 === this._howls[c]._webAudio)
                    for (b = 0; b < this._howls[c]._audioNode.length; b++)
                        this._howls[c]._audioNode[b].volume = this._howls[c]._volume * this._volume;
            return this
        }
        return d ? m.gain.value : this._volume
    },
    mute: function() {
        this._setMuted(!0);
        return this
    },
    unmute: function() {
        this._setMuted(!1);
        return this
    },
    _setMuted: function(b) {
        this._muted = b;
        d && (m.gain.value = b ? 0 : this._volume);
        for (var c in this._howls)
            if (this._howls.hasOwnProperty(c) && !1 === this._howls[c]._webAudio)
                for (var e = 0; e < this._howls[c]._audioNode.length; e++)
                    this._howls[c]._audioNode[e].muted = b
    }
};
var p = new x
  , x = null;
if (!e)
    var x = new Audio
      , v = {
        mp3: !!x.canPlayType("audio/mpeg;").replace(/^no$/, ""),
        opus: !!x.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
        ogg: !!x.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
        wav: !!x.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
        m4a: !!(x.canPlayType("audio/x-m4a;") || x.canPlayType("audio/aac;")).replace(/^no$/, ""),
        mp4: !!(x.canPlayType("audio/x-mp4;") || x.canPlayType("audio/aac;")).replace(/^no$/, ""),
        weba: !!x.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
    };
var t = function(b) {
    this._autoplay = b.autoplay || !1;
    this._buffer = b.buffer || !1;
    this._duration = b.duration || 0;
    this._format = b.format || null;
    this._loop = b.loop || !1;
    this._loaded = !1;
    this._sprite = b.sprite || {};
    this._src = b.src || "";
    this._pos3d = b.pos3d || [0, 0, -0.5];
    this._volume = void 0 !== b.volume ? b.volume : 1;
    this._urls = b.urls || [];
    this._rate = b.rate || 1;
    this._onload = [b.onload || function() {}
    ];
    this._onloaderror = [b.onloaderror || function() {}
    ];
    this._onend = [b.onend || function() {}
    ];
    this._onpause = [b.onpause || function() {}
    ];
    this._onplay = [b.onplay || function() {}
    ];
    this._onendTimer = [];
    this._webAudio = d && !this._buffer;
    this._audioNode = [];
    this._webAudio && this._setupAudioNode();
    p._howls.push(this);
    this.load()
};
t.prototype = {
    load: function() {
        var d = this
          , g = null;
        if (!e) {
            for (var m = 0; m < d._urls.length; m++) {
                var t, x;
                if (d._format)
                    t = d._format;
                else if (x = d._urls[m].toLowerCase().split("?")[0],
                t = (t = x.match(/.+\.([^?]+)(\?|$)/)) && 2 <= t.length ? t : x.match(/data\:audio\/([^?]+);/))
                    t = t[1];
                else {
                    d.on("loaderror");
                    return
                }
                if (v[t]) {
                    g = d._urls[m];
                    break
                }
            }
            if (g) {
                d._src = g;
                if (d._webAudio) {
                    var B = g;
                    if (B in b)
                        d._duration = b[B].duration,
                        q(d);
                    else {
                        var G = new XMLHttpRequest;
                        G.open("GET", B, !0);
                        G.responseType = "arraybuffer";
                        G.onload = function() {
                            c.decodeAudioData(G.response, function(c) {
                                c && (b[B] = c,
                                q(d, c))
                            }, function() {
                                d.on("loaderror")
                            })
                        }
                        ;
                        G.onerror = function() {
                            d._webAudio && (d._buffer = !0,
                            d._webAudio = !1,
                            d._audioNode = [],
                            delete d._gainNode,
                            d.load())
                        }
                        ;
                        try {
                            G.send()
                        } catch (Ya) {
                            G.onerror()
                        }
                    }
                } else {
                    var I = new Audio;
                    d._audioNode.push(I);
                    I.src = g;
                    I._pos = 0;
                    I.preload = "auto";
                    I.volume = p._muted ? 0 : d._volume * p.volume();
                    b[g] = d;
                    var P = function() {
                        d._duration = Math.ceil(10 * I.duration) / 10;
                        0 === Object.getOwnPropertyNames(d._sprite).length && (d._sprite = {
                            _default: [0, 1E3 * d._duration]
                        });
                        d._loaded || (d._loaded = !0,
                        d.on("load"));
                        d._autoplay && d.play();
                        I.removeEventListener("canplaythrough", P, !1)
                    };
                    I.addEventListener("canplaythrough", P, !1);
                    I.load()
                }
                return d
            }
        }
        d.on("loaderror")
    },
    urls: function(b) {
        return b ? (this.stop(),
        this._urls = "string" === typeof b ? [b] : b,
        this._loaded = !1,
        this.load(),
        this) : this._urls
    },
    play: function(d, e) {
        var g = this;
        "function" === typeof d && (e = d);
        if (!d || "function" === typeof d)
            d = "_default";
        if (!g._loaded)
            return g.on("load", function() {
                g.play(d, e)
            }),
            g;
        if (!g._sprite[d])
            return "function" === typeof e && e(),
            g;
        g._inactiveNode(function(m) {
            m._sprite = d;
            var q = 0 < m._pos ? m._pos : g._sprite[d][0] / 1E3, v = g._sprite[d][1] / 1E3 - m._pos, t = !(!g._loop && !g._sprite[d][2]), x = "string" === typeof e ? e : Math.round(Date.now() * Math.random()) + "", I, P = {
                id: x,
                sprite: d,
                loop: t
            };
            I = setTimeout(function() {
                !g._webAudio && t && g.stop(P.id, P.timer).play(d, P.id);
                g._webAudio && !t && (g._nodeById(P.id).paused = !0,
                g._nodeById(P.id)._pos = 0);
                !g._webAudio && !t && g.stop(P.id, P.timer);
                g.on("end", x)
            }, 1E3 * v);
            g._onendTimer.push(I);
            P.timer = g._onendTimer[g._onendTimer.length - 1];
            if (g._webAudio) {
                I = g._sprite[d][0] / 1E3;
                var N = g._sprite[d][1] / 1E3;
                m.id = x;
                m.paused = !1;
                I = [t, I, N];
                N = g._nodeById(x);
                N.bufferSource = c.createBufferSource();
                N.bufferSource.buffer = b[g._src];
                N.bufferSource.connect(N.panner);
                N.bufferSource.loop = I[0];
                I[0] && (N.bufferSource.loopStart = I[1],
                N.bufferSource.loopEnd = I[1] + I[2]);
                N.bufferSource.playbackRate.value = g._rate;
                g._playStart = c.currentTime;
                m.gain.value = g._volume;
                "undefined" === typeof m.bufferSource.start ? m.bufferSource.noteGrainOn(0, q, v) : m.bufferSource.start(0, q, v)
            } else if (4 === m.readyState)
                m.id = x,
                m.currentTime = q,
                m.muted = p._muted,
                m.volume = g._volume * p.volume(),
                setTimeout(function() {
                    m.play()
                }, 0);
            else {
                g._clearEndTimer(I);
                var Aa = d
                  , oa = e
                  , ta = function() {
                    g.play(Aa, oa);
                    m.removeEventListener("canplaythrough", ta, !1)
                };
                m.addEventListener("canplaythrough", ta, !1);
                return g
            }
            g.on("play");
            "function" === typeof e && e(x);
            return g
        });
        return g
    },
    pause: function(b, c) {
        var d = this;
        if (!d._loaded)
            return d.on("play", function() {
                d.pause(b)
            }),
            d;
        d._clearEndTimer(c || 0);
        var e = b ? d._nodeById(b) : d._activeNode();
        if (e)
            if (e._pos = d.pos(null, b),
            d._webAudio) {
                if (!e.bufferSource || e.paused)
                    return d;
                e.paused = !0;
                "undefined" === typeof e.bufferSource.stop ? e.bufferSource.noteOff(0) : e.bufferSource.stop(0)
            } else
                e.pause();
        d.on("pause");
        return d
    },
    stop: function(b, c) {
        var d = this;
        if (!d._loaded)
            return d.on("play", function() {
                d.stop(b)
            }),
            d;
        d._clearEndTimer(c || 0);
        var e = b ? d._nodeById(b) : d._activeNode();
        if (e)
            if (e._pos = 0,
            d._webAudio) {
                if (!e.bufferSource || e.paused)
                    return d;
                e.paused = !0;
                "undefined" === typeof e.bufferSource.stop ? e.bufferSource.noteOff(0) : e.bufferSource.stop(0)
            } else
                e.pause(),
                e.currentTime = 0;
        return d
    },
    mute: function(b) {
        var c = this;
        if (!c._loaded)
            return c.on("play", function() {
                c.mute(b)
            }),
            c;
        var d = b ? c._nodeById(b) : c._activeNode();
        d && (c._webAudio ? d.gain.value = 0 : d.volume = 0);
        return c
    },
    unmute: function(b) {
        var c = this;
        if (!c._loaded)
            return c.on("play", function() {
                c.unmute(b)
            }),
            c;
        var d = b ? c._nodeById(b) : c._activeNode();
        d && (c._webAudio ? d.gain.value = c._volume : d.volume = c._volume);
        return c
    },
    volume: function(b, c) {
        var d = this;
        b = parseFloat(b);
        if (0 <= b && 1 >= b) {
            d._volume = b;
            if (!d._loaded)
                return d.on("play", function() {
                    d.volume(b, c)
                }),
                d;
            var e = c ? d._nodeById(c) : d._activeNode();
            e && (d._webAudio ? e.gain.value = b : e.volume = b * p.volume());
            return d
        }
        return d._volume
    },
    loop: function(b) {
        return "boolean" === typeof b ? (this._loop = b,
        this) : this._loop
    },
    sprite: function(b) {
        return "object" === typeof b ? (this._sprite = b,
        this) : this._sprite
    },
    pos: function(b, d) {
        var e = this;
        if (!e._loaded)
            return e.on("load", function() {
                e.pos(b)
            }),
            "number" === typeof b ? e : e._pos || 0;
        b = parseFloat(b);
        var g = d ? e._nodeById(d) : e._activeNode();
        if (g)
            return 0 <= b ? (e.pause(d),
            g._pos = b,
            e.play(g._sprite, d),
            e) : e._webAudio ? g._pos + (c.currentTime - e._playStart) : g.currentTime;
        if (0 <= b)
            return e;
        for (g = 0; g < e._audioNode.length; g++)
            if (e._audioNode[g].paused && 4 === e._audioNode[g].readyState)
                return e._webAudio ? e._audioNode[g]._pos : e._audioNode[g].currentTime
    },
    pos3d: function(b, c, d, e) {
        var g = this;
        c = "undefined" === typeof c || !c ? 0 : c;
        d = "undefined" === typeof d || !d ? -0.5 : d;
        if (!g._loaded)
            return g.on("play", function() {
                g.pos3d(b, c, d, e)
            }),
            g;
        if (0 <= b || 0 > b) {
            if (g._webAudio) {
                var p = e ? g._nodeById(e) : g._activeNode();
                p && (g._pos3d = [b, c, d],
                p.panner.setPosition(b, c, d))
            }
        } else
            return g._pos3d;
        return g
    },
    fade: function(b, c, d, e, g) {
        var p = this
          , m = Math.abs(b - c)
          , q = b > c ? "down" : "up"
          , m = m / 0.01
          , v = d / m;
        if (!p._loaded)
            return p.on("load", function() {
                p.fade(b, c, d, e, g)
            }),
            p;
        p.volume(b, g);
        for (var t = 1; t <= m; t++)
            (function() {
                var b = Math.round(1E3 * (p._volume + ("up" === q ? 0.01 : -0.01) * t)) / 1E3;
                setTimeout(function() {
                    p.volume(b, g);
                    b === c && e && e()
                }, v * t)
            }
            )()
    },
    fadeIn: function(b, c, d) {
        return this.volume(0).play().fade(0, b, c, d)
    },
    fadeOut: function(b, c, d, e) {
        var g = this;
        return g.fade(g._volume, b, c, function() {
            d && d();
            g.pause(e);
            g.on("end")
        }, e)
    },
    _nodeById: function(b) {
        for (var c = this._audioNode[0], d = 0; d < this._audioNode.length; d++)
            if (this._audioNode[d].id === b) {
                c = this._audioNode[d];
                break
            }
        return c
    },
    _activeNode: function() {
        for (var b = null, c = 0; c < this._audioNode.length; c++)
            if (!this._audioNode[c].paused) {
                b = this._audioNode[c];
                break
            }
        this._drainPool();
        return b
    },
    _inactiveNode: function(b) {
        for (var c = null, d = 0; d < this._audioNode.length; d++)
            if (this._audioNode[d].paused && 4 === this._audioNode[d].readyState) {
                b(this._audioNode[d]);
                c = !0;
                break
            }
        this._drainPool();
        if (!c) {
            var e;
            this._webAudio ? (e = this._setupAudioNode(),
            b(e)) : (this.load(),
            e = this._audioNode[this._audioNode.length - 1],
            e.addEventListener("loadedmetadata", function() {
                b(e)
            }))
        }
    },
    _drainPool: function() {
        var b = 0, c;
        for (c = 0; c < this._audioNode.length; c++)
            this._audioNode[c].paused && b++;
        for (c = this._audioNode.length - 1; 0 <= c && !(5 >= b); c--)
            this._audioNode[c].paused && (this._webAudio && this._audioNode[c].disconnect(0),
            b--,
            this._audioNode.splice(c, 1))
    },
    _clearEndTimer: function(b) {
        b = this._onendTimer.indexOf(b);
        b = 0 <= b ? b : 0;
        this._onendTimer[b] && (clearTimeout(this._onendTimer[b]),
        this._onendTimer.splice(b, 1))
    },
    _setupAudioNode: function() {
        var b = this._audioNode
          , d = this._audioNode.length;
        b[d] = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
        b[d].gain.value = this._volume;
        b[d].paused = !0;
        b[d]._pos = 0;
        b[d].readyState = 4;
        b[d].connect(m);
        b[d].panner = c.createPanner();
        b[d].panner.setPosition(this._pos3d[0], this._pos3d[1], this._pos3d[2]);
        b[d].panner.connect(b[d]);
        return b[d]
    },
    on: function(b, c) {
        var d = this["_on" + b];
        if ("function" === typeof c)
            d.push(c);
        else
            for (var e = 0; e < d.length; e++)
                c ? d[e].call(this, c) : d[e].call(this);
        return this
    },
    off: function(b, c) {
        for (var d = this["_on" + b], e = c.toString(), g = 0; g < d.length; g++)
            if (e === d[g].toString()) {
                d.splice(g, 1);
                break
            }
        return this
    },
    unload: function() {
        for (var c = this._audioNode, d = 0; d < this._audioNode.length; d++)
            c[d].paused || this.stop(c[d].id),
            this._webAudio ? c[d].disconnect(0) : c[d].src = "";
        c = p._howls.indexOf(this);
        null !== c && 0 <= c && p._howls.splice(c, 1);
        delete b[this._src]
    }
};
if (d)
    var q = function(b, c) {
        b._duration = c ? c.duration : b._duration;
        0 === Object.getOwnPropertyNames(b._sprite).length && (b._sprite = {
            _default: [0, 1E3 * b._duration]
        });
        b._loaded || (b._loaded = !0,
        b.on("load"));
        b._autoplay && b.play()
    };
"function" === typeof define && define.amd && define(function() {
    return {
        Howler: p,
        Howl: t
    }
});
"undefined" !== typeof exports && (exports.Howler = p,
exports.Howl = t);
window.Howler = p;
window.Howl = t
}
)();
