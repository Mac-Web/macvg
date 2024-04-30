ig.baked = !0;
ig.module("impact.image").defines(function() {
  ig.Image = ig.Class.extend({
      data: null,
      width: 0,
      height: 0,
      loaded: !1,
      failed: !1,
      loadCallback: null,
      path: "",
      staticInstantiate: function(b) {
          return ig.Image.cache[b] || null
      },
      init: function(b) {
          this.path = b;
          this.load()
      },
      load: function(b) {
          this.loaded ? b && b(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = b || null,
          this.data = new Image,
          this.data.onload = this.onload.bind(this),
          this.data.onerror = this.onerror.bind(this),
          this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this),
          ig.Image.cache[this.path] = this)
      },
      reload: function() {
          this.loaded = !1;
          this.data = new Image;
          this.data.onload = this.onload.bind(this);
          this.data.src = this.path + "?" + Date.now()
      },
      onload: function() {
          this.width = this.data.width;
          this.height = this.data.height;
          this.loaded = !0;
          1 != ig.system.scale && this.resize(ig.system.scale);
          this.loadCallback && this.loadCallback(this.path, !0)
      },
      onerror: function() {
          this.failed = !0;
          this.loadCallback && this.loadCallback(this.path, !1)
      },
      resize: function(b) {
          var c = ig.getImagePixels(this.data, 0, 0, this.width, this.height)
            , d = this.width * b
            , e = this.height * b
            , g = ig.$new("canvas");
          g.width = d;
          g.height = e;
          for (var m = g.getContext("2d"), x = m.getImageData(0, 0, d, e), p = 0; p < e; p++)
              for (var v = 0; v < d; v++) {
                  var t = 4 * (Math.floor(p / b) * this.width + Math.floor(v / b))
                    , q = 4 * (p * d + v);
                  x.data[q] = c.data[t];
                  x.data[q + 1] = c.data[t + 1];
                  x.data[q + 2] = c.data[t + 2];
                  x.data[q + 3] = c.data[t + 3]
              }
          m.putImageData(x, 0, 0);
          this.data = g
      },
      draw: function(b, c, d, e, g, m) {
          if (this.loaded) {
              var x = ig.system.scale;
              g = (g ? g : this.width) * x;
              m = (m ? m : this.height) * x;
              ig.system.context.drawImage(this.data, d ? d * x : 0, e ? e * x : 0, g, m, ig.system.getDrawPos(b), ig.system.getDrawPos(c), g, m);
              ig.Image.drawCount++
          }
      },
      drawTile: function(b, c, d, e, g, m, x) {
          g = g ? g : e;
          if (this.loaded && !(e > this.width || g > this.height)) {
              var p = ig.system.scale
                , v = Math.floor(e * p)
                , t = Math.floor(g * p)
                , q = m ? -1 : 1
                , l = x ? -1 : 1;
              if (m || x)
                  ig.system.context.save(),
                  ig.system.context.scale(q, l);
              ig.system.context.drawImage(this.data, Math.floor(d * e) % this.width * p, Math.floor(d * e / this.width) * g * p, v, t, ig.system.getDrawPos(b) * q - (m ? v : 0), ig.system.getDrawPos(c) * l - (x ? t : 0), v, t);
              (m || x) && ig.system.context.restore();
              ig.Image.drawCount++
          }
      }
  });
  ig.Image.drawCount = 0;
  ig.Image.cache = {};
  ig.Image.reloadCache = function() {
      for (var b in ig.Image.cache)
          ig.Image.cache[b].reload()
  }
});
ig.baked = !0;
ig.module("impact.font").requires("impact.image").defines(function() {
  ig.Font = ig.Image.extend({
      widthMap: [],
      indices: [],
      firstChar: 32,
      alpha: 1,
      letterSpacing: 1,
      lineSpacing: 0,
      onload: function(b) {
          this._loadMetrics(this.data);
          this.parent(b)
      },
      widthForString: function(b) {
          if (-1 !== b.indexOf("\n")) {
              b = b.split("\n");
              for (var c = 0, d = 0; d < b.length; d++)
                  c = Math.max(c, this._widthForLine(b[d]));
              return c
          }
          return this._widthForLine(b)
      },
      _widthForLine: function(b) {
          for (var c = 0, d = 0; d < b.length; d++)
              c += this.widthMap[b.charCodeAt(d) - this.firstChar] + this.letterSpacing;
          return c
      },
      heightForString: function(b) {
          return b.split("\n").length * (this.height + this.lineSpacing)
      },
      draw: function(b, c, d, e) {
          "string" != typeof b && (b = b.toString());
          if (-1 !== b.indexOf("\n")) {
              b = b.split("\n");
              for (var g = this.height + this.lineSpacing, m = 0; m < b.length; m++)
                  this.draw(b[m], c, d + m * g, e)
          } else {
              if (e == ig.Font.ALIGN.RIGHT || e == ig.Font.ALIGN.CENTER)
                  m = this._widthForLine(b),
                  c -= e == ig.Font.ALIGN.CENTER ? m / 2 : m;
              1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha);
              for (m = 0; m < b.length; m++)
                  e = b.charCodeAt(m),
                  c += this._drawChar(e - this.firstChar, c, d);
              1 !== this.alpha && (ig.system.context.globalAlpha = 1);
              ig.Image.drawCount += b.length
          }
      },
      _drawChar: function(b, c, d) {
          if (!this.loaded || 0 > b || b >= this.indices.length)
              return 0;
          var e = ig.system.scale
            , g = this.widthMap[b] * e
            , m = (this.height - 2) * e;
          ig.system.context.drawImage(this.data, this.indices[b] * e, 0, g, m, ig.system.getDrawPos(c), ig.system.getDrawPos(d), g, m);
          return this.widthMap[b] + this.letterSpacing
      },
      _loadMetrics: function(b) {
          this.height = b.height - 1;
          this.widthMap = [];
          this.indices = [];
          for (var c = ig.getImagePixels(b, 0, b.height - 1, b.width, 1), d = 0, e = 0, g = 0; g < b.width; g++) {
              var m = 4 * g + 3;
              127 < c.data[m] ? e++ : 128 > c.data[m] && e && (this.widthMap.push(e),
              this.indices.push(g - e),
              d++,
              e = 0)
          }
          this.widthMap.push(e);
          this.indices.push(g - e)
      }
  });
  ig.Font.ALIGN = {
      LEFT: 0,
      RIGHT: 1,
      CENTER: 2
  }
});
ig.baked = !0;
ig.module("impact.sound").defines(function() {
  ig.SoundManager = ig.Class.extend({
      clips: {},
      volume: 1,
      format: null,
      init: function() {
          if (!ig.Sound.enabled || !window.Audio)
              ig.Sound.enabled = !1;
          else {
              for (var b = new Audio, c = 0; c < ig.Sound.use.length; c++) {
                  var d = ig.Sound.use[c];
                  if (b.canPlayType(d.mime)) {
                      this.format = d;
                      break
                  }
              }
              this.format || (ig.Sound.enabled = !1)
          }
      },
      load: function(b, c, d) {
          var e = ig.prefix + b.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
          if (this.clips[b]) {
              if (c && this.clips[b].length < ig.Sound.channels)
                  for (c = this.clips[b].length; c < ig.Sound.channels; c++) {
                      var g = new Audio(e);
                      g.load();
                      this.clips[b].push(g)
                  }
              return this.clips[b][0]
          }
          var m = new Audio(e);
          d && (m.addEventListener("canplaythrough", function p(c) {
              m.removeEventListener("canplaythrough", p, !1);
              d(b, !0, c)
          }, !1),
          m.addEventListener("error", function(c) {
              d(b, !1, c)
          }, !1));
          m.preload = "auto";
          m.load();
          this.clips[b] = [m];
          if (c)
              for (c = 1; c < ig.Sound.channels; c++)
                  g = new Audio(e),
                  g.load(),
                  this.clips[b].push(g);
          return m
      },
      get: function(b) {
          b = this.clips[b];
          for (var c = 0, d; d = b[c++]; )
              if (d.paused || d.ended)
                  return d.ended && (d.currentTime = 0),
                  d;
          b[0].pause();
          b[0].currentTime = 0;
          return b[0]
      }
  });
  ig.Music = ig.Class.extend({
      tracks: [],
      namedTracks: {},
      currentTrack: null,
      currentIndex: 0,
      random: !1,
      _volume: 1,
      _loop: !1,
      _fadeInterval: 0,
      _fadeTimer: null,
      _endedCallbackBound: null,
      init: function() {
          this._endedCallbackBound = this._endedCallback.bind(this);
          Object.defineProperty ? (Object.defineProperty(this, "volume", {
              get: this.getVolume.bind(this),
              set: this.setVolume.bind(this)
          }),
          Object.defineProperty(this, "loop", {
              get: this.getLooping.bind(this),
              set: this.setLooping.bind(this)
          })) : this.__defineGetter__ && (this.__defineGetter__("volume", this.getVolume.bind(this)),
          this.__defineSetter__("volume", this.setVolume.bind(this)),
          this.__defineGetter__("loop", this.getLooping.bind(this)),
          this.__defineSetter__("loop", this.setLooping.bind(this)))
      },
      add: function(b, c) {
          if (ig.Sound.enabled) {
              var d = ig.soundManager.load(b instanceof ig.Sound ? b.path : b, !1);
              d.loop = this._loop;
              d.volume = this._volume;
              d.addEventListener("ended", this._endedCallbackBound, !1);
              this.tracks.push(d);
              c && (this.namedTracks[c] = d);
              this.currentTrack || (this.currentTrack = d)
          }
      },
      next: function() {
          this.tracks.length && (this.stop(),
          this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length,
          this.currentTrack = this.tracks[this.currentIndex],
          this.play())
      },
      pause: function() {
          this.currentTrack && this.currentTrack.pause()
      },
      stop: function() {
          this.currentTrack && (this.currentTrack.pause(),
          this.currentTrack.currentTime = 0)
      },
      play: function(b) {
        console.log("--fx--play--");
          if (b && this.namedTracks[b])
              b = this.namedTracks[b],
              b != this.currentTrack && (this.stop(),
              this.currentTrack = b);
          else if (!this.currentTrack)
              return;

        this.currentTrack.play();
      },
      getLooping: function() {
          return this._loop
      },
      setLooping: function(b) {
          this._loop = b;
          for (var c in this.tracks)
              this.tracks[c].loop = b
      },
      getVolume: function() {
          return this._volume
      },
      setVolume: function(b) {
          this._volume = b.limit(0, 1);
          for (var c in this.tracks)
              this.tracks[c].volume = this._volume
      },
      fadeOut: function(b) {
          this.currentTrack && (clearInterval(this._fadeInterval),
          this.fadeTimer = new ig.Timer(b),
          this._fadeInterval = setInterval(this._fadeStep.bind(this), 50))
      },
      _fadeStep: function() {
          var b = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
          0.01 >= b ? (this.stop(),
          this.currentTrack.volume = this._volume,
          clearInterval(this._fadeInterval)) : this.currentTrack.volume = b
      },
      _endedCallback: function() {
          this._loop ? this.play() : this.next()
      }
  });
  ig.Sound = ig.Class.extend({
      path: "",
      volume: 1,
      currentClip: null,
      multiChannel: !0,
      init: function(b, c) {
          this.path = b;
          this.multiChannel = !1 !== c;
          this.load()
      },
      load: function(b) {
          ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path, this.multiChannel, b) : ig.addResource(this) : b && b(this.path, !0)
      },
      play: function() {
          ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path),
          this.currentClip.volume = ig.soundManager.volume * this.volume,
          this.currentClip.play())
      },
      stop: function() {
          this.currentClip && (this.currentClip.pause(),
          this.currentClip.currentTime = 0)
      }
  });
  ig.Sound.FORMAT = {
      MP3: {
          ext: "mp3",
          mime: "audio/mpeg"
      },
      M4A: {
          ext: "m4a",
          mime: "audio/mp4; codecs=mp4a"
      },
      OGG: {
          ext: "ogg",
          mime: "audio/ogg; codecs=vorbis"
      },
      WEBM: {
          ext: "webm",
          mime: "audio/webm; codecs=vorbis"
      },
      CAF: {
          ext: "caf",
          mime: "audio/x-caf"
      }
  };
  ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
  ig.Sound.channels = 4;
  ig.Sound.enabled = !0
});
ig.baked = !0;
ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
  ig.Loader = ig.Class.extend({
      resources: [],
      gameClass: null,
      status: 0,
      done: !1,
      _unloaded: [],
      _drawStatus: 0,
      _intervalId: 0,
      _loadCallbackBound: null,
      init: function(b, c) {
          this.gameClass = b;
          this.resources = c;
          this._loadCallbackBound = this._loadCallback.bind(this);
          for (var d = 0; d < this.resources.length; d++)
              this._unloaded.push(this.resources[d].path)
      },
      load: function() {
          ig.system.clear("#000");
          if (this.resources.length) {
              for (var b = 0; b < this.resources.length; b++)
                  this.loadResource(this.resources[b]);
              this._intervalId = setInterval(this.draw.bind(this), 16)
          } else
              this.end()
      },
      loadResource: function(b) {
          b.load(this._loadCallbackBound)
      },
      end: function() {
          this.done || (this.done = !0,
          clearInterval(this._intervalId))
      },
      draw: function() {},
      _loadCallback: function(b, c) {
          if (c)
              this._unloaded.erase(b);
          else
              throw "Failed to load resource: " + b;
          this.status = 1 - this._unloaded.length / this.resources.length;
          0 == this._unloaded.length && setTimeout(this.end.bind(this), 250)
      }
  })
});
ig.baked = !0;
ig.module("impact.timer").defines(function() {
  ig.Timer = ig.Class.extend({
      target: 0,
      base: 0,
      last: 0,
      pausedAt: 0,
      init: function(b) {
          this.last = this.base = ig.Timer.time;
          this.target = b || 0
      },
      set: function(b) {
          this.target = b || 0;
          this.base = ig.Timer.time;
          this.pausedAt = 0
      },
      reset: function() {
          this.base = ig.Timer.time;
          this.pausedAt = 0
      },
      tick: function() {
          var b = ig.Timer.time - this.last;
          this.last = ig.Timer.time;
          return this.pausedAt ? 0 : b
      },
      delta: function() {
          return (this.pausedAt || ig.Timer.time) - this.base - this.target
      },
      pause: function() {
          this.pausedAt || (this.pausedAt = ig.Timer.time)
      },
      unpause: function() {
          this.pausedAt && (this.base += ig.Timer.time - this.pausedAt,
          this.pausedAt = 0)
      }
  });
  ig.Timer._last = 0;
  ig.Timer.time = Number.MIN_VALUE;
  ig.Timer.timeScale = 1;
  ig.Timer.maxStep = 0.05;
  ig.Timer.step = function() {
      var b = Date.now();
      ig.Timer.time += Math.min((b - ig.Timer._last) / 1E3, ig.Timer.maxStep) * ig.Timer.timeScale;
      ig.Timer._last = b
  }
});
ig.baked = !0;
ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
  ig.System = ig.Class.extend({
      fps: 30,
      width: 320,
      height: 240,
      realWidth: 320,
      realHeight: 240,
      scale: 1,
      tick: 0,
      animationId: 0,
      newGameClass: null,
      running: !1,
      delegate: null,
      clock: null,
      canvas: null,
      context: null,
      init: function(b, c, d, e, g) {
          this.fps = c;
          this.clock = new ig.Timer;
          this.canvas = ig.$(b);
          this.resize(d, e, g);
          this.context = this.canvas.getContext("2d");
          this.getDrawPos = ig.System.drawMode;
          1 != this.scale && (ig.System.scaleMode = ig.System.SCALE.CRISP);
          ig.System.scaleMode(this.canvas, this.context)
      },
      resize: function(b, c, d) {
          this.width = b;
          this.height = c;
          this.scale = d || this.scale;
          this.realWidth = this.width * this.scale;
          this.realHeight = this.height * this.scale;
          this.canvas.width = this.realWidth;
          this.canvas.height = this.realHeight
      },
      setGame: function(b) {
          this.running ? this.newGameClass = b : this.setGameNow(b)
      },
      setGameNow: function(b) {
          ig.game = new b;
          ig.system.setDelegate(ig.game)
      },
      setDelegate: function(b) {
          if ("function" == typeof b.run)
              this.delegate = b,
              this.startRunLoop();
          else
              throw "System.setDelegate: No run() function in object";
      },
      stopRunLoop: function() {
          ig.clearAnimation(this.animationId);
          this.running = !1
      },
      startRunLoop: function() {
          this.stopRunLoop();
          this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
          this.running = !0
      },
      clear: function(b) {
          this.context.fillStyle = b;
          this.context.fillRect(0, 0, this.realWidth, this.realHeight)
      },
      run: function() {
          ig.Timer.step();
          this.tick = this.clock.tick();
          this.delegate.run();
          ig.input.clearPressed();
          this.newGameClass && (this.setGameNow(this.newGameClass),
          this.newGameClass = null)
      },
      getDrawPos: null
  });
  ig.System.DRAW = {
      AUTHENTIC: function(b) {
          return Math.round(b) * this.scale
      },
      SMOOTH: function(b) {
          return Math.round(b * this.scale)
      },
      SUBPIXEL: function(b) {
          return b * this.scale
      }
  };
  ig.System.drawMode = ig.System.DRAW.SMOOTH;
  ig.System.SCALE = {
      CRISP: function(b, c) {
          ig.setVendorAttribute(c, "imageSmoothingEnabled", !1);
          b.style.imageRendering = "-moz-crisp-edges";
          b.style.imageRendering = "-o-crisp-edges";
          b.style.imageRendering = "-webkit-optimize-contrast";
          b.style.imageRendering = "crisp-edges";
          b.style.msInterpolationMode = "nearest-neighbor"
      },
      SMOOTH: function(b, c) {
          ig.setVendorAttribute(c, "imageSmoothingEnabled", !0);
          b.style.imageRendering = "";
          b.style.msInterpolationMode = ""
      }
  };
  ig.System.scaleMode = ig.System.SCALE.SMOOTH
});
ig.baked = !0;
ig.module("impact.input").defines(function() {
  ig.KEY = {
      MOUSE1: -1,
      MOUSE2: -3,
      MWHEEL_UP: -4,
      MWHEEL_DOWN: -5,
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      PAUSE: 19,
      CAPS: 20,
      ESC: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      INSERT: 45,
      DELETE: 46,
      _0: 48,
      _1: 49,
      _2: 50,
      _3: 51,
      _4: 52,
      _5: 53,
      _6: 54,
      _7: 55,
      _8: 56,
      _9: 57,
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      NUMPAD_0: 96,
      NUMPAD_1: 97,
      NUMPAD_2: 98,
      NUMPAD_3: 99,
      NUMPAD_4: 100,
      NUMPAD_5: 101,
      NUMPAD_6: 102,
      NUMPAD_7: 103,
      NUMPAD_8: 104,
      NUMPAD_9: 105,
      MULTIPLY: 106,
      ADD: 107,
      SUBSTRACT: 109,
      DECIMAL: 110,
      DIVIDE: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PLUS: 187,
      COMMA: 188,
      MINUS: 189,
      PERIOD: 190
  };
  ig.Input = ig.Class.extend({
      bindings: {},
      actions: {},
      presses: {},
      locks: {},
      delayedKeyup: {},
      isUsingMouse: !1,
      isUsingKeyboard: !1,
      isUsingAccelerometer: !1,
      mouse: {
          x: 0,
          y: 0
      },
      accel: {
          x: 0,
          y: 0,
          z: 0
      },
      initMouse: function() {
          if (!this.isUsingMouse) {
              this.isUsingMouse = !0;
              var b = this.mousewheel.bind(this);
              ig.system.canvas.addEventListener("mousewheel", b, !1);
              ig.system.canvas.addEventListener("DOMMouseScroll", b, !1);
              ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1);
              ig.system.canvas.addEventListener("mousedown", this.keydown.bind(this), !1);
              ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1);
              ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1);
              ig.ua.touchDevice && (ig.system.canvas.addEventListener("touchstart", this.keydown.bind(this), !1),
              ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1),
              ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1),
              ig.system.canvas.addEventListener("MSPointerDown", this.keydown.bind(this), !1),
              ig.system.canvas.addEventListener("MSPointerUp", this.keyup.bind(this), !1),
              ig.system.canvas.addEventListener("MSPointerMove", this.mousemove.bind(this), !1),
              ig.system.canvas.style.msTouchAction = "none")
          }
      },
      initKeyboard: function() {
          this.isUsingKeyboard || (this.isUsingKeyboard = !0,
          window.addEventListener("keydown", this.keydown.bind(this), !1),
          window.addEventListener("keyup", this.keyup.bind(this), !1))
      },
      initAccelerometer: function() {
          this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1)
      },
      mousewheel: function(b) {
          var c = this.bindings[0 < (b.wheelDelta ? b.wheelDelta : -1 * b.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
          c && (this.actions[c] = !0,
          this.presses[c] = !0,
          this.delayedKeyup[c] = !0,
          b.stopPropagation(),
          b.preventDefault())
      },
      mousemove: function(b) {
          var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
          ig.ua.mobile && (c = ig.system.realWidth);
          var c = ig.system.scale * (c / ig.system.realWidth)
            , d = {
              left: 0,
              top: 0
          };
          ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
          b = b.touches ? b.touches[0] : b;
          this.mouse.x = (b.clientX - d.left) / c;
          this.mouse.y = (b.clientY - d.top) / c
      },
      contextmenu: function(b) {
          this.bindings[ig.KEY.MOUSE2] && (b.stopPropagation(),
          b.preventDefault())
      },
      keydown: function(b) {
          var c = b.target.tagName;
          if (!("INPUT" == c || "TEXTAREA" == c))
              if (c = "keydown" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1,
              0 > c && window.focus(),
              ("touchstart" == b.type || "mousedown" == b.type) && this.mousemove(b),
              c = this.bindings[c])
                  this.actions[c] = !0,
                  this.locks[c] || (this.presses[c] = !0,
                  this.locks[c] = !0),
                  b.stopPropagation(),
                  b.preventDefault()
      },
      keyup: function(b) {
          var c = b.target.tagName;
          if (!("INPUT" == c || "TEXTAREA" == c))
              if (c = this.bindings["keyup" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1])
                  this.delayedKeyup[c] = !0,
                  b.stopPropagation(),
                  b.preventDefault()
      },
      devicemotion: function(b) {
          this.accel = b.accelerationIncludingGravity
      },
      bind: function(b, c) {
          0 > b ? this.initMouse() : 0 < b && this.initKeyboard();
          this.bindings[b] = c
      },
      bindTouch: function(b, c) {
          var d = ig.$(b)
            , e = this;
          d.addEventListener("touchstart", function(b) {
              e.touchStart(b, c)
          }, !1);
          d.addEventListener("touchend", function(b) {
              e.touchEnd(b, c)
          }, !1);
          d.addEventListener("MSPointerDown", function(b) {
              e.touchStart(b, c)
          }, !1);
          d.addEventListener("MSPointerUp", function(b) {
              e.touchEnd(b, c)
          }, !1)
      },
      unbind: function(b) {
          this.delayedKeyup[this.bindings[b]] = !0;
          this.bindings[b] = null
      },
      unbindAll: function() {
          this.bindings = {};
          this.actions = {};
          this.presses = {};
          this.locks = {};
          this.delayedKeyup = {}
      },
      state: function(b) {
          return this.actions[b]
      },
      pressed: function(b) {
          return this.presses[b]
      },
      released: function(b) {
          return !!this.delayedKeyup[b]
      },
      clearPressed: function() {
          for (var b in this.delayedKeyup)
              this.actions[b] = !1,
              this.locks[b] = !1;
          this.delayedKeyup = {};
          this.presses = {}
      },
      touchStart: function(b, c) {
          this.actions[c] = !0;
          this.presses[c] = !0;
          b.stopPropagation();
          b.preventDefault();
          return !1
      },
      touchEnd: function(b, c) {
          this.delayedKeyup[c] = !0;
          b.stopPropagation();
          b.preventDefault();
          return !1
      }
  })
});
ig.baked = !0;
ig.module("impact.sound-handler").defines(function() {
  ig.SoundHandler = ig.Class.extend({
      formats: {
          ogg: ".ogg",
          mp3: ".mp3"
      },
      jukebox: null,
      pausePosition: null,
      globalMute: !1,
      forceMuted: !1,
      muted: !1,
      bgmStarted: !1,
      bgmPlaying: !1,
      soundPlaying: !1,
      currentSoundPlaying: null,
      soundBuffer: [],
      voSoundLoaded: [],
      sfxSoundLoaded: [],
      SOUNDID: {},
      voSoundsToLoad: [],
      sfxSoundsToLoad: [{
          name: "staticSound",
          path: "media/audio/play/static"
      }, {
          name: "openingSound",
          path: "media/audio/opening/opening"
      }, {
          name: "kittyopeningSound",
          path: "media/audio/opening/kittyopening"
      }, {
          name: "bubble",
          path: "media/audio/bubble"
      }, {
          name: "click",
          path: "media/audio/pop"
      }, {
          name: "count",
          path: "media/audio/count"
      }, {
          name: "over",
          path: "media/audio/over"
      }, {
          name: "evil",
          path: "media/audio/evil"
      }, {
          name: "hehe",
          path: "media/audio/yipee"
      }, {
          name: "win",
          path: "media/audio/win"
      }],
      debug: !1,
      init: function() {
          ig.ua.mobile ? (this.initSfx(),
          this.setupJukebox()) : (this.initSfx(),
          this.setupDesktopMusic());
          this.setupWindowHandler()
      },
      allVoSoundLoaded: function() {
          if (this.voSoundLoaded.length >= this.voSoundsToLoad.length) {
              this.debug && console.log("Vo ready");
              for (index = 0; index < this.voSoundLoaded.length; index++)
                  this.voSoundLoaded[index].on("end", function(b) {
                      b.isPlaying = !1;
                      this.soundBuffer.pop()
                  }
                  .bind(this, this.voSoundLoaded[index])),
                  this.voSoundLoaded[index].on("play", function(b) {
                      b.isPlaying = !0
                  }
                  .bind(this, this.voSoundLoaded[index]));
              return !0
          }
          return !1
      },
      allSfxSoundLoaded: function() {
          return this.sfxSoundLoaded.length >= this.sfxSoundsToLoad.length ? !0 : !1
      },
      stopBackgroundMusic: function() {
          ig.ua.mobile ? this.pausePosition = this.jukebox.player.pause() : ig.music.pause();
          this.bgmPlaying = !1
      },
      playBackgroundMusic: function() {
          if ((!ig.gd || !ig.gd.isFreez) && !this.bgmPlaying)
              this.bgmStarted = !0,
              ig.ua.mobile ? this.pausePosition ? this.jukebox.player.resume(this.pausePosition) : this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start, !0) : ig.music.play(),
              this._unMuteBackgroundMusic(),
              this.bgmPlaying = !0
      },
      playSound: function(b) {
          if ((b = this[b]) && (!this.forceMuted || !this.muted) && !b.isPlaying)
              this.soundBuffer.push(b),
              b.play()
      },
      stopAllAndPlaySound: function(b) {
          this.stopAllSounds();
          this.playSound(b)
      },
      stopAllSounds: function() {
          for (index = 0; index < this.soundBuffer.length; index++)
              this.soundBuffer[index].isPlaying = !1,
              this.soundBuffer.splice(0, 1)[0].stop()
      },
      addSound: function(b, c, d) {
          var e = c + this.formats.ogg;
          c += this.formats.mp3;
          this.SOUNDID[b] = b;
          this[b] = d ? new Howl({
              urls: [e, c],
              onload: d
          }) : new Howl({
              urls: [e, c]
          })
      },
      _muteSounds: function() {
          for (i = 0; i < ig.resources.length; i++)
              ig.resources[i].multiChannel && ig.resources[i].stop();
          Howler.mute();
          this.debug && console.log("Sounds muted")
      },
      _unMuteSounds: function() {
          if (!ig.gd || !ig.gd.isFreez)
              Howler.unmute(),
              ig.Sound.enabled = !0,
              this.debug && console.log("Sounds can play")
      },
      _muteBackgroundMusic: function() {
          ig.ua.mobile ? (this.stopBackgroundMusic(),
          this.jukebox.player.setVolume(0)) : ig.music.volume = 0;
          this.debug && console.log("BGM muted");
          this.bgmPlaying = !1
      },
      _unMuteBackgroundMusic: function() {
          if ((!ig.gd || !ig.gd.isFreez) && this.bgmStarted)
              ig.ua.mobile ? (this.pausePosition ? this.jukebox.player.resume(this.pausePosition) : this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start, !0),
              this.jukebox.player.setVolume(1)) : ig.music.volume = 1,
              this.debug && console.log("BGM can play"),
              this.bgmPlaying = !0
      },
      focusBlurMute: function() {
          this.forceMuted || this.mute()
      },
      focusBlurUnmute: function() {
          this.forceMuted || (this.unmute(),
          ig.game && (ig.game.getSound(),
          ig.game.getMusic()))
      },
      setForceMuted: function(b) {
          this.forceMuted = b
      },
      mute: function() {
          this.muted || (this._muteSounds(),
          this._muteBackgroundMusic(),
          this.muted = !0)
      },
      unmute: function() {
          if ((!ig.gd || !ig.gd.isFreez) && this.muted)
              this._unMuteSounds(),
              this._unMuteBackgroundMusic(),
              this.muted = !1
      },
      setupWindowHandler: function() {
          "true" === getQueryVariable("webview") ? ($(window).focus(function() {
              (!ig.gd || !ig.gd.isFreez) && ig.soundHandler && !ig.gd.adShowing && ig.soundHandler.focusBlurUnmute()
          }),
          $(window).blur(function() {
              ig.gd.adShowing && ig.soundHandler.focusBlurMute();
              ig.soundHandler && ig.soundHandler.focusBlurMute()
          })) : (window.onfocus = function() {
              (!ig.gd || !ig.gd.isFreez) && ig.soundHandler && !ig.gd.adShowing && ig.soundHandler.focusBlurUnmute()
          }
          ,
          window.onblur = function() {
              ig.gd.adShowing && ig.soundHandler.focusBlurMute();
              ig.soundHandler && ig.soundHandler.focusBlurMute()
          }
          )
      },
      initSfx: function() {
          for (index = 0; index < this.sfxSoundsToLoad.length; index++) {
              var b = function(b) {
                  this.sfxSoundLoaded.push(this[b])
              }
              .bind(this, this.sfxSoundsToLoad[index].name);
              this.addSound(this.sfxSoundsToLoad[index].name, this.sfxSoundsToLoad[index].path, b)
          }
      },
      initVoSfx: function() {
          for (index = 0; index < this.voSoundsToLoad.length; index++) {
              var b = function(b) {
                  this.voSoundLoaded.push(this[b])
              }
              .bind(this, this.voSoundsToLoad[index].name);
              this.addSound(this.voSoundsToLoad[index].name, this.voSoundsToLoad[index].path, b)
          }
      },
      setupDesktopMusic: function() {
          ig.music.add("media/audio/bgm.*", "background")
      },
      setupJukebox: function() {
          ig.ua.mobile && (this.jukebox = new ig.Jukebox,
          this.pausePosition = this.jukebox.player.settings.spritemap.music.start)
      },
      forceLoopBGM: function() {
          if (ig.ua.winPhone && !this.forceMuted && this.bgmPlaying && this.jukebox && this.jukebox.player && this.jukebox.player.settings.spritemap.music && this.jukebox.player.settings.spritemap.music.loop) {
              if (0 <= this.prevTime)
                  if (this.jukebox.player.getCurrentTime() === this.prevTime) {
                      if (this.silentCounter || (this.silentCounter = 0),
                      this.silentCounter++,
                      this.jukebox.player.getCurrentTime() >= this.jukebox.player.settings.spritemap.music.end || this.silentCounter > 0.001 * ig.soundHandler.jukebox.player.settings.timeout * ig.system.fps)
                          ig.ua.mobile || this.jukebox.player.pause(),
                          this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start, !0),
                          this.silentCounter = null
                  } else
                      this.silentCounter = null;
              this.prevTime = this.jukebox.player.getCurrentTime()
          }
      }
  })
});
function getHiddenProp() {
  var b = ["webkit", "moz", "ms", "o"];
  if ("hidden"in document)
      return "hidden";
  for (var c = 0; c < b.length; c++)
      if (b[c] + "Hidden"in document)
          return b[c] + "Hidden";
  return null
}
function isHidden() {
  var b = getHiddenProp();
  return !b ? !1 : document[b]
}
var visProp = getHiddenProp();
if (visProp) {
  var evtname = visProp.replace(/[H|h]idden/, "") + "visibilitychange";
  document.addEventListener(evtname, visChange)
}
window.addEventListener("pagehide", function() {
  ig.soundHandler && ig.soundHandler.focusBlurMute()
}, !1);
window.addEventListener("pageshow", function() {
  if (!ig.gd || !ig.gd.isFreez)
      ig.ua.mobile && ig.game && ig.game.resumeGame(),
      ig.soundHandler && ig.soundHandler.focusBlurUnmute()
}, !1);
function visChange() {
  if (isHidden())
      ig.soundHandler && ig.soundHandler.focusBlurMute();
  else if (!ig.gd || !ig.gd.isFreez)
      ig.ua.mobile && ig.game && ig.game.resumeGame(),
      ig.soundHandler && ig.soundHandler.focusBlurUnmute()
}
ig.baked = !0;
ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound", "impact.sound-handler").defines(function() {
  ig.main = function(b, c, d, e, g, m, x) {
      ig.system = new ig.System(b,d,e,g,m || 1);
      ig.input = new ig.Input;
      ig.soundManager = new ig.SoundManager;
      ig.music = new ig.Music;
      ig.ready = !0;
      ig.soundHandler = new ig.SoundHandler;
      (new (x || ig.Loader)(c,ig.resources)).load()
  }
});
ig.baked = !0;
ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
  ig.AnimationSheet = ig.Class.extend({
      width: 8,
      height: 8,
      image: null,
      init: function(b, c, d) {
          this.width = c;
          this.height = d;
          this.image = new ig.Image(b)
      }
  });
  ig.Animation = ig.Class.extend({
      sheet: null,
      timer: null,
      sequence: [],
      flip: {
          x: !1,
          y: !1
      },
      pivot: {
          x: 0,
          y: 0
      },
      frame: 0,
      tile: 0,
      loopCount: 0,
      alpha: 1,
      angle: 0,
      init: function(b, c, d, e) {
          this.sheet = b;
          this.pivot = {
              x: b.width / 2,
              y: b.height / 2
          };
          this.timer = new ig.Timer;
          this.frameTime = c;
          this.sequence = d;
          this.stop = !!e;
          this.tile = this.sequence[0]
      },
      rewind: function() {
          this.timer.set();
          this.frame = this.loopCount = 0;
          this.tile = this.sequence[0];
          return this
      },
      gotoFrame: function(b) {
          this.timer.set(this.frameTime * -b - 1E-4);
          this.update()
      },
      gotoRandomFrame: function() {
          this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
      },
      update: function() {
          var b = Math.floor(this.timer.delta() / this.frameTime);
          this.loopCount = Math.floor(b / this.sequence.length);
          this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : b % this.sequence.length;
          this.tile = this.sequence[this.frame]
      },
      draw: function(b, c) {
          var d = Math.max(this.sheet.width, this.sheet.height);
          b > ig.system.width || (c > ig.system.height || 0 > b + d || 0 > c + d) || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha),
          0 == this.angle ? this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(),
          ig.system.context.translate(ig.system.getDrawPos(b + this.pivot.x), ig.system.getDrawPos(c + this.pivot.y)),
          ig.system.context.rotate(this.angle),
          this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y),
          ig.system.context.restore()),
          1 != this.alpha && (ig.system.context.globalAlpha = 1))
      }
  })
});
ig.baked = !0;
ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
  ig.Entity = ig.Class.extend({
      id: 0,
      settings: {},
      size: {
          x: 16,
          y: 16
      },
      offset: {
          x: 0,
          y: 0
      },
      pos: {
          x: 0,
          y: 0
      },
      last: {
          x: 0,
          y: 0
      },
      vel: {
          x: 0,
          y: 0
      },
      accel: {
          x: 0,
          y: 0
      },
      friction: {
          x: 0,
          y: 0
      },
      maxVel: {
          x: 100,
          y: 100
      },
      zIndex: 0,
      gravityFactor: 1,
      standing: !1,
      bounciness: 0,
      minBounceVelocity: 40,
      anims: {},
      animSheet: null,
      currentAnim: null,
      health: 10,
      type: 0,
      checkAgainst: 0,
      collides: 0,
      _killed: !1,
      slopeStanding: {
          min: (44).toRad(),
          max: (136).toRad()
      },
      init: function(b, c, d) {
          this.id = ++ig.Entity._lastId;
          this.pos.x = this.last.x = b;
          this.pos.y = this.last.y = c;
          ig.merge(this, d)
      },
      reset: function(b, c, d) {
          var e = this.constructor.prototype;
          this.pos.x = b;
          this.pos.y = c;
          this.last.x = b;
          this.last.y = c;
          this.vel.x = e.vel.x;
          this.vel.y = e.vel.y;
          this.accel.x = e.accel.x;
          this.accel.y = e.accel.y;
          this.health = e.health;
          this._killed = e._killed;
          this.standing = e.standing;
          this.type = e.type;
          this.checkAgainst = e.checkAgainst;
          this.collides = e.collides;
          ig.merge(this, d)
      },
      addAnim: function(b, c, d, e) {
          if (!this.animSheet)
              throw "No animSheet to add the animation " + b + " to.";
          c = new ig.Animation(this.animSheet,c,d,e);
          this.anims[b] = c;
          this.currentAnim || (this.currentAnim = c);
          return c
      },
      update: function() {
          this.last.x = this.pos.x;
          this.last.y = this.pos.y;
          this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
          this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
          this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
          var b = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y * ig.system.tick, this.size.x, this.size.y);
          this.handleMovementTrace(b);
          this.currentAnim && this.currentAnim.update()
      },
      getNewVelocity: function(b, c, d, e) {
          return c ? (b + c * ig.system.tick).limit(-e, e) : d ? (c = d * ig.system.tick,
          0 < b - c ? b - c : 0 > b + c ? b + c : 0) : b.limit(-e, e)
      },
      handleMovementTrace: function(b) {
          this.standing = !1;
          b.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0),
          this.vel.y = 0));
          b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
          if (b.collision.slope) {
              var c = b.collision.slope;
              if (0 < this.bounciness) {
                  var d = this.vel.x * c.nx + this.vel.y * c.ny;
                  this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
                  this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
              } else
                  d = (this.vel.x * c.x + this.vel.y * c.y) / (c.x * c.x + c.y * c.y),
                  this.vel.x = c.x * d,
                  this.vel.y = c.y * d,
                  c = Math.atan2(c.x, c.y),
                  c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
          }
          this.pos = b.pos
      },
      draw: function() {
          this.currentAnim && this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
      },
      kill: function() {
          ig.game.removeEntity(this)
      },
      receiveDamage: function(b) {
          this.health -= b;
          0 >= this.health && this.kill()
      },
      touches: function(b) {
          return !(this.pos.x >= b.pos.x + b.size.x || this.pos.x + this.size.x <= b.pos.x || this.pos.y >= b.pos.y + b.size.y || this.pos.y + this.size.y <= b.pos.y)
      },
      distanceTo: function(b) {
          var c = this.pos.x + this.size.x / 2 - (b.pos.x + b.size.x / 2);
          b = this.pos.y + this.size.y / 2 - (b.pos.y + b.size.y / 2);
          return Math.sqrt(c * c + b * b)
      },
      angleTo: function(b) {
          return Math.atan2(b.pos.y + b.size.y / 2 - (this.pos.y + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x / 2))
      },
      check: function() {},
      collideWith: function() {},
      ready: function() {},
      erase: function() {}
  });
  ig.Entity._lastId = 0;
  ig.Entity.COLLIDES = {
      NEVER: 0,
      LITE: 1,
      PASSIVE: 2,
      ACTIVE: 4,
      FIXED: 8
  };
  ig.Entity.TYPE = {
      NONE: 0,
      A: 1,
      B: 2,
      BOTH: 3
  };
  ig.Entity.checkPair = function(b, c) {
      b.checkAgainst & c.type && b.check(c);
      c.checkAgainst & b.type && c.check(b);
      b.collides && (c.collides && b.collides + c.collides > ig.Entity.COLLIDES.ACTIVE) && ig.Entity.solveCollision(b, c)
  }
  ;
  ig.Entity.solveCollision = function(b, c) {
      var d = null;
      if (b.collides == ig.Entity.COLLIDES.LITE || c.collides == ig.Entity.COLLIDES.FIXED)
          d = b;
      else if (c.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED)
          d = c;
      b.last.x + b.size.x > c.last.x && b.last.x < c.last.x + c.size.x ? (b.last.y < c.last.y ? ig.Entity.seperateOnYAxis(b, c, d) : ig.Entity.seperateOnYAxis(c, b, d),
      b.collideWith(c, "y"),
      c.collideWith(b, "y")) : b.last.y + b.size.y > c.last.y && b.last.y < c.last.y + c.size.y && (b.last.x < c.last.x ? ig.Entity.seperateOnXAxis(b, c, d) : ig.Entity.seperateOnXAxis(c, b, d),
      b.collideWith(c, "x"),
      c.collideWith(b, "x"))
  }
  ;
  ig.Entity.seperateOnXAxis = function(b, c, d) {
      var e = b.pos.x + b.size.x - c.pos.x;
      d ? (d.vel.x = -d.vel.x * d.bounciness + (b === d ? c : b).vel.x,
      c = ig.game.collisionMap.trace(d.pos.x, d.pos.y, d == b ? -e : e, 0, d.size.x, d.size.y),
      d.pos.x = c.pos.x) : (d = (b.vel.x - c.vel.x) / 2,
      b.vel.x = -d,
      c.vel.x = d,
      d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, -e / 2, 0, b.size.x, b.size.y),
      b.pos.x = Math.floor(d.pos.x),
      b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, e / 2, 0, c.size.x, c.size.y),
      c.pos.x = Math.ceil(b.pos.x))
  }
  ;
  ig.Entity.seperateOnYAxis = function(b, c, d) {
      var e = b.pos.y + b.size.y - c.pos.y;
      if (d) {
          c = b === d ? c : b;
          d.vel.y = -d.vel.y * d.bounciness + c.vel.y;
          var g = 0;
          d == b && Math.abs(d.vel.y - c.vel.y) < d.minBounceVelocity && (d.standing = !0,
          g = c.vel.x * ig.system.tick);
          b = ig.game.collisionMap.trace(d.pos.x, d.pos.y, g, d == b ? -e : e, d.size.x, d.size.y);
          d.pos.y = b.pos.y;
          d.pos.x = b.pos.x
      } else
          ig.game.gravity && (c.standing || 0 < b.vel.y) ? (d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, 0, -(b.pos.y + b.size.y - c.pos.y), b.size.x, b.size.y),
          b.pos.y = d.pos.y,
          0 < b.bounciness && b.vel.y > b.minBounceVelocity ? b.vel.y *= -b.bounciness : (b.standing = !0,
          b.vel.y = 0)) : (d = (b.vel.y - c.vel.y) / 2,
          b.vel.y = -d,
          c.vel.y = d,
          g = c.vel.x * ig.system.tick,
          d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, g, -e / 2, b.size.x, b.size.y),
          b.pos.y = d.pos.y,
          b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, 0, e / 2, c.size.x, c.size.y),
          c.pos.y = b.pos.y)
  }
});
ig.baked = !0;
ig.module("impact.map").defines(function() {
  ig.Map = ig.Class.extend({
      tilesize: 8,
      width: 1,
      height: 1,
      data: [[]],
      name: null,
      init: function(b, c) {
          this.tilesize = b;
          this.data = c;
          this.height = c.length;
          this.width = c[0].length;
          this.pxWidth = this.width * this.tilesize;
          this.pxHeight = this.height * this.tilesize
      },
      getTile: function(b, c) {
          var d = Math.floor(b / this.tilesize)
            , e = Math.floor(c / this.tilesize);
          return 0 <= d && d < this.width && 0 <= e && e < this.height ? this.data[e][d] : 0
      },
      setTile: function(b, c, d) {
          b = Math.floor(b / this.tilesize);
          c = Math.floor(c / this.tilesize);
          0 <= b && b < this.width && (0 <= c && c < this.height) && (this.data[c][b] = d)
      }
  })
});
ig.baked = !0;
ig.module("impact.collision-map").requires("impact.map").defines(function() {
  ig.CollisionMap = ig.Map.extend({
      lastSlope: 1,
      tiledef: null,
      init: function(b, c, g) {
          this.parent(b, c);
          this.tiledef = g || ig.CollisionMap.defaultTileDef;
          for (var m in this.tiledef)
              m | 0 > this.lastSlope && (this.lastSlope = m | 0)
      },
      trace: function(b, c, g, m, x, p) {
          var v = {
              collision: {
                  x: !1,
                  y: !1,
                  slope: !1
              },
              pos: {
                  x: b,
                  y: c
              },
              tile: {
                  x: 0,
                  y: 0
              }
          }
            , t = Math.ceil(Math.max(Math.abs(g), Math.abs(m)) / this.tilesize);
          if (1 < t)
              for (var q = g / t, l = m / t, n = 0; n < t && (q || l) && !(this._traceStep(v, b, c, q, l, x, p, g, m, n),
              b = v.pos.x,
              c = v.pos.y,
              v.collision.x && (g = q = 0),
              v.collision.y && (m = l = 0),
              v.collision.slope); n++)
                  ;
          else
              this._traceStep(v, b, c, g, m, x, p, g, m, 0);
          return v
      },
      _traceStep: function(b, c, g, m, x, p, v, t, q, l) {
          b.pos.x += m;
          b.pos.y += x;
          var n = 0;
          if (m) {
              var y = 0 < m ? p : 0
                , A = 0 > m ? this.tilesize : 0
                , n = Math.max(Math.floor(g / this.tilesize), 0)
                , F = Math.min(Math.ceil((g + v) / this.tilesize), this.height);
              m = Math.floor((b.pos.x + y) / this.tilesize);
              var B = Math.floor((c + y) / this.tilesize);
              if (0 < l || m == B || 0 > B || B >= this.width)
                  B = -1;
              if (0 <= m && m < this.width)
                  for (var G = n; G < F && !(-1 != B && (n = this.data[G][B],
                  1 < n && n <= this.lastSlope && this._checkTileDef(b, n, c, g, t, q, p, v, B, G))); G++)
                      if (n = this.data[G][m],
                      1 == n || n > this.lastSlope || 1 < n && this._checkTileDef(b, n, c, g, t, q, p, v, m, G)) {
                          if (1 < n && n <= this.lastSlope && b.collision.slope)
                              break;
                          b.collision.x = !0;
                          b.tile.x = n;
                          c = b.pos.x = m * this.tilesize - y + A;
                          t = 0;
                          break
                      }
          }
          if (x) {
              y = 0 < x ? v : 0;
              x = 0 > x ? this.tilesize : 0;
              n = Math.max(Math.floor(b.pos.x / this.tilesize), 0);
              A = Math.min(Math.ceil((b.pos.x + p) / this.tilesize), this.width);
              G = Math.floor((b.pos.y + y) / this.tilesize);
              F = Math.floor((g + y) / this.tilesize);
              if (0 < l || G == F || 0 > F || F >= this.height)
                  F = -1;
              if (0 <= G && G < this.height)
                  for (m = n; m < A && !(-1 != F && (n = this.data[F][m],
                  1 < n && n <= this.lastSlope && this._checkTileDef(b, n, c, g, t, q, p, v, m, F))); m++)
                      if (n = this.data[G][m],
                      1 == n || n > this.lastSlope || 1 < n && this._checkTileDef(b, n, c, g, t, q, p, v, m, G)) {
                          if (1 < n && n <= this.lastSlope && b.collision.slope)
                              break;
                          b.collision.y = !0;
                          b.tile.y = n;
                          b.pos.y = G * this.tilesize - y + x;
                          break
                      }
          }
      },
      _checkTileDef: function(b, c, g, m, x, p, v, t, q, l) {
          var n = this.tiledef[c];
          if (!n)
              return !1;
          c = (n[2] - n[0]) * this.tilesize;
          var y = (n[3] - n[1]) * this.tilesize
            , A = n[4];
          v = g + x + (0 > y ? v : 0) - (q + n[0]) * this.tilesize;
          t = m + p + (0 < c ? t : 0) - (l + n[1]) * this.tilesize;
          if (0 < c * t - y * v) {
              if (0 > x * -y + p * c)
                  return A;
              q = Math.sqrt(c * c + y * y);
              l = y / q;
              q = -c / q;
              var F = v * l + t * q
                , n = l * F
                , F = q * F;
              if (n * n + F * F >= x * x + p * p)
                  return A || 0.5 > c * (t - p) - y * (v - x);
              b.pos.x = g + x - n;
              b.pos.y = m + p - F;
              b.collision.slope = {
                  x: c,
                  y: y,
                  nx: l,
                  ny: q
              };
              return !0
          }
          return !1
      }
  });
  var b = 1 / 3
    , c = 2 / 3;
  ig.CollisionMap.defaultTileDef = {
      5: [0, 1, 1, c, !0],
      6: [0, c, 1, b, !0],
      7: [0, b, 1, 0, !0],
      3: [0, 1, 1, 0.5, !0],
      4: [0, 0.5, 1, 0, !0],
      2: [0, 1, 1, 0, !0],
      10: [0.5, 1, 1, 0, !0],
      21: [0, 1, 0.5, 0, !0],
      32: [c, 1, 1, 0, !0],
      43: [b, 1, c, 0, !0],
      54: [0, 1, b, 0, !0],
      27: [0, 0, 1, b, !0],
      28: [0, b, 1, c, !0],
      29: [0, c, 1, 1, !0],
      25: [0, 0, 1, 0.5, !0],
      26: [0, 0.5, 1, 1, !0],
      24: [0, 0, 1, 1, !0],
      11: [0, 0, 0.5, 1, !0],
      22: [0.5, 0, 1, 1, !0],
      33: [0, 0, b, 1, !0],
      44: [b, 0, c, 1, !0],
      55: [c, 0, 1, 1, !0],
      16: [1, b, 0, 0, !0],
      17: [1, c, 0, b, !0],
      18: [1, 1, 0, c, !0],
      14: [1, 0.5, 0, 0, !0],
      15: [1, 1, 0, 0.5, !0],
      13: [1, 1, 0, 0, !0],
      8: [0.5, 1, 0, 0, !0],
      19: [1, 1, 0.5, 0, !0],
      30: [b, 1, 0, 0, !0],
      41: [c, 1, b, 0, !0],
      52: [1, 1, c, 0, !0],
      38: [1, c, 0, 1, !0],
      39: [1, b, 0, c, !0],
      40: [1, 0, 0, b, !0],
      36: [1, 0.5, 0, 1, !0],
      37: [1, 0, 0, 0.5, !0],
      35: [1, 0, 0, 1, !0],
      9: [1, 0, 0.5, 1, !0],
      20: [0.5, 0, 0, 1, !0],
      31: [1, 0, c, 1, !0],
      42: [c, 0, b, 1, !0],
      53: [b, 0, 0, 1, !0],
      12: [0, 0, 1, 0, !1],
      23: [1, 1, 0, 1, !1],
      34: [1, 0, 1, 1, !1],
      45: [0, 1, 0, 0, !1]
  };
  ig.CollisionMap.staticNoCollision = {
      trace: function(b, c, g, m) {
          return {
              collision: {
                  x: !1,
                  y: !1,
                  slope: !1
              },
              pos: {
                  x: b + g,
                  y: c + m
              },
              tile: {
                  x: 0,
                  y: 0
              }
          }
      }
  }
});
ig.baked = !0;
ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
  ig.BackgroundMap = ig.Map.extend({
      tiles: null,
      scroll: {
          x: 0,
          y: 0
      },
      distance: 1,
      repeat: !1,
      tilesetName: "",
      foreground: !1,
      enabled: !0,
      preRender: !1,
      preRenderedChunks: null,
      chunkSize: 512,
      debugChunks: !1,
      anims: {},
      init: function(b, c, d) {
          this.parent(b, c);
          this.setTileset(d)
      },
      setTileset: function(b) {
          this.tilesetName = b instanceof ig.Image ? b.path : b;
          this.tiles = new ig.Image(this.tilesetName);
          this.preRenderedChunks = null
      },
      setScreenPos: function(b, c) {
          this.scroll.x = b / this.distance;
          this.scroll.y = c / this.distance
      },
      preRenderMapToChunks: function() {
          var b = this.width * this.tilesize * ig.system.scale
            , c = this.height * this.tilesize * ig.system.scale;
          this.chunkSize = Math.min(Math.max(b, c), this.chunkSize);
          var d = Math.ceil(b / this.chunkSize)
            , e = Math.ceil(c / this.chunkSize);
          this.preRenderedChunks = [];
          for (var g = 0; g < e; g++) {
              this.preRenderedChunks[g] = [];
              for (var m = 0; m < d; m++)
                  this.preRenderedChunks[g][m] = this.preRenderChunk(m, g, m == d - 1 ? b - m * this.chunkSize : this.chunkSize, g == e - 1 ? c - g * this.chunkSize : this.chunkSize)
          }
      },
      preRenderChunk: function(b, c, d, e) {
          var g = d / this.tilesize / ig.system.scale + 1
            , m = e / this.tilesize / ig.system.scale + 1
            , x = b * this.chunkSize / ig.system.scale % this.tilesize
            , p = c * this.chunkSize / ig.system.scale % this.tilesize;
          b = Math.floor(b * this.chunkSize / this.tilesize / ig.system.scale);
          c = Math.floor(c * this.chunkSize / this.tilesize / ig.system.scale);
          var v = ig.$new("canvas");
          v.width = d;
          v.height = e;
          v.retinaResolutionEnabled = !1;
          e = v.getContext("2d");
          ig.System.scaleMode(v, e);
          d = ig.system.context;
          ig.system.context = e;
          for (e = 0; e < g; e++)
              for (var t = 0; t < m; t++)
                  if (e + b < this.width && t + c < this.height) {
                      var q = this.data[t + c][e + b];
                      q && this.tiles.drawTile(e * this.tilesize - x, t * this.tilesize - p, q - 1, this.tilesize)
                  }
          ig.system.context = d;
          return v
      },
      draw: function() {
          this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled())
      },
      drawPreRendered: function() {
          this.preRenderedChunks || this.preRenderMapToChunks();
          var b = ig.system.getDrawPos(this.scroll.x)
            , c = ig.system.getDrawPos(this.scroll.y);
          if (this.repeat)
              var d = this.width * this.tilesize * ig.system.scale
                , b = (b % d + d) % d
                , d = this.height * this.tilesize * ig.system.scale
                , c = (c % d + d) % d;
          var d = Math.max(Math.floor(b / this.chunkSize), 0)
            , e = Math.max(Math.floor(c / this.chunkSize), 0)
            , g = Math.ceil((b + ig.system.realWidth) / this.chunkSize)
            , m = Math.ceil((c + ig.system.realHeight) / this.chunkSize)
            , x = this.preRenderedChunks[0].length
            , p = this.preRenderedChunks.length;
          this.repeat || (g = Math.min(g, x),
          m = Math.min(m, p));
          for (var v = 0; e < m; e++) {
              for (var t = 0, q = d; q < g; q++) {
                  var l = this.preRenderedChunks[e % p][q % x]
                    , n = -b + q * this.chunkSize - t
                    , y = -c + e * this.chunkSize - v;
                  ig.system.context.drawImage(l, n, y);
                  ig.Image.drawCount++;
                  this.debugChunks && (ig.system.context.strokeStyle = "#f0f",
                  ig.system.context.strokeRect(n, y, this.chunkSize, this.chunkSize));
                  this.repeat && (l.width < this.chunkSize && n + l.width < ig.system.realWidth) && (t += this.chunkSize - l.width,
                  g++)
              }
              this.repeat && (l.height < this.chunkSize && y + l.height < ig.system.realHeight) && (v += this.chunkSize - l.height,
              m++)
          }
      },
      drawTiled: function() {
          for (var b = 0, c = null, d = (this.scroll.x / this.tilesize).toInt(), e = (this.scroll.y / this.tilesize).toInt(), g = this.scroll.x % this.tilesize, m = this.scroll.y % this.tilesize, x = -g - this.tilesize, g = ig.system.width + this.tilesize - g, p = ig.system.height + this.tilesize - m, v = -1, m = -m - this.tilesize; m < p; v++,
          m += this.tilesize) {
              var t = v + e;
              if (t >= this.height || 0 > t) {
                  if (!this.repeat)
                      continue;
                  t = (t % this.height + this.height) % this.height
              }
              for (var q = -1, l = x; l < g; q++,
              l += this.tilesize) {
                  b = q + d;
                  if (b >= this.width || 0 > b) {
                      if (!this.repeat)
                          continue;
                      b = (b % this.width + this.width) % this.width
                  }
                  if (b = this.data[t][b])
                      (c = this.anims[b - 1]) ? c.draw(l, m) : this.tiles.drawTile(l, m, b - 1, this.tilesize)
              }
          }
      }
  })
});
ig.baked = !0;
ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
  ig.Game = ig.Class.extend({
      clearColor: "#000000",
      gravity: 0,
      screen: {
          x: 0,
          y: 0
      },
      _rscreen: {
          x: 0,
          y: 0
      },
      entities: [],
      namedEntities: {},
      collisionMap: ig.CollisionMap.staticNoCollision,
      backgroundMaps: [],
      backgroundAnims: {},
      autoSort: !1,
      sortBy: null,
      cellSize: 64,
      _deferredKill: [],
      _levelToLoad: null,
      _doSortEntities: !1,
      staticInstantiate: function() {
          this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
          ig.game = this;
          return null
      },
      loadLevel: function(b) {
          this.screen = {
              x: 0,
              y: 0
          };
          this.entities = [];
          this.namedEntities = {};
          for (var c = 0; c < b.entities.length; c++) {
              var d = b.entities[c];
              this.spawnEntity(d.type, d.x, d.y, d.settings)
          }
          this.sortEntities();
          this.collisionMap = ig.CollisionMap.staticNoCollision;
          this.backgroundMaps = [];
          for (c = 0; c < b.layer.length; c++)
              if (d = b.layer[c],
              "collision" == d.name)
                  this.collisionMap = new ig.CollisionMap(d.tilesize,d.data);
              else {
                  var e = new ig.BackgroundMap(d.tilesize,d.data,d.tilesetName);
                  e.anims = this.backgroundAnims[d.tilesetName] || {};
                  e.repeat = d.repeat;
                  e.distance = d.distance;
                  e.foreground = !!d.foreground;
                  e.preRender = !!d.preRender;
                  e.name = d.name;
                  this.backgroundMaps.push(e)
              }
          for (c = 0; c < this.entities.length; c++)
              this.entities[c].ready()
      },
      loadLevelDeferred: function(b) {
          this._levelToLoad = b
      },
      getMapByName: function(b) {
          if ("collision" == b)
              return this.collisionMap;
          for (var c = 0; c < this.backgroundMaps.length; c++)
              if (this.backgroundMaps[c].name == b)
                  return this.backgroundMaps[c];
          return null
      },
      getEntityByName: function(b) {
          return this.namedEntities[b]
      },
      getEntitiesByType: function(b) {
          b = "string" === typeof b ? ig.global[b] : b;
          for (var c = [], d = 0; d < this.entities.length; d++) {
              var e = this.entities[d];
              e instanceof b && !e._killed && c.push(e)
          }
          return c
      },
      spawnEntity: function(b, c, d, e) {
          var g = "string" === typeof b ? ig.global[b] : b;
          if (!g)
              throw "Can't spawn entity of type " + b;
          b = new g(c,d,e || {});
          this.entities.push(b);
          b.name && (this.namedEntities[b.name] = b);
          return b
      },
      sortEntities: function() {
          this.entities.sort(this.sortBy)
      },
      sortEntitiesDeferred: function() {
          this._doSortEntities = !0
      },
      removeEntity: function(b) {
          b.name && delete this.namedEntities[b.name];
          b._killed = !0;
          b.type = ig.Entity.TYPE.NONE;
          b.checkAgainst = ig.Entity.TYPE.NONE;
          b.collides = ig.Entity.COLLIDES.NEVER;
          this._deferredKill.push(b)
      },
      run: function() {
          this.update();
          this.draw()
      },
      update: function() {
          this._levelToLoad && (this.loadLevel(this._levelToLoad),
          this._levelToLoad = null);
          this.updateEntities();
          this.checkEntities();
          for (var b = 0; b < this._deferredKill.length; b++)
              this._deferredKill[b].erase(),
              this.entities.erase(this._deferredKill[b]);
          this._deferredKill = [];
          if (this._doSortEntities || this.autoSort)
              this.sortEntities(),
              this._doSortEntities = !1;
          for (var c in this.backgroundAnims) {
              var b = this.backgroundAnims[c], d;
              for (d in b)
                  b[d].update()
          }
      },
      updateEntities: function() {
          for (var b = 0; b < this.entities.length; b++) {
              var c = this.entities[b];
              c._killed || c.update()
          }
      },
      draw: function() {
          this.clearColor && ig.system.clear(this.clearColor);
          ig.system.context.clearRect(0, 0, ig.system.width, ig.system.height);
          this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
          this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
          var b;
          for (b = 0; b < this.backgroundMaps.length; b++) {
              var c = this.backgroundMaps[b];
              if (c.foreground)
                  break;
              c.setScreenPos(this.screen.x, this.screen.y);
              c.draw()
          }
          this.drawEntities();
          for (b; b < this.backgroundMaps.length; b++)
              c = this.backgroundMaps[b],
              c.setScreenPos(this.screen.x, this.screen.y),
              c.draw()
      },
      drawEntities: function() {
          for (var b = 0; b < this.entities.length; b++)
              this.entities[b].draw()
      },
      checkEntities: function() {
          for (var b = {}, c = 0; c < this.entities.length; c++) {
              var d = this.entities[c];
              if (!(d.type == ig.Entity.TYPE.NONE && d.checkAgainst == ig.Entity.TYPE.NONE && d.collides == ig.Entity.COLLIDES.NEVER))
                  for (var e = {}, g = Math.floor(d.pos.y / this.cellSize), m = Math.floor((d.pos.x + d.size.x) / this.cellSize) + 1, x = Math.floor((d.pos.y + d.size.y) / this.cellSize) + 1, p = Math.floor(d.pos.x / this.cellSize); p < m; p++)
                      for (var v = g; v < x; v++)
                          if (b[p])
                              if (b[p][v]) {
                                  for (var t = b[p][v], q = 0; q < t.length; q++)
                                      d.touches(t[q]) && !e[t[q].id] && (e[t[q].id] = !0,
                                      ig.Entity.checkPair(d, t[q]));
                                  t.push(d)
                              } else
                                  b[p][v] = [d];
                          else
                              b[p] = {},
                              b[p][v] = [d]
          }
      }
  });
  ig.Game.SORT = {
      Z_INDEX: function(b, c) {
          return b.zIndex - c.zIndex
      },
      POS_X: function(b, c) {
          return b.pos.x + b.size.x - (c.pos.x + c.size.x)
      },
      POS_Y: function(b, c) {
          return b.pos.y + b.size.y - (c.pos.y + c.size.y)
      }
  }
});
ig.baked = !0;
ig.module("plugins.splash-loader").requires("impact.loader", "impact.animation").defines(function() {
  ig.SplashLoader = ig.Loader.extend({
      bgIm: new ig.Image("media/graphics/sprites/home-bg.png"),
      barIm: new ig.Image("media/graphics/sprites/bar.png"),
      baseIm: new ig.Image("media/graphics/sprites/bar-base.png"),
      bg: {
          scX: 1,
          scY: 1.005,
          twnScX: !0,
          twnScY: !0
      },
      bar: {
          scX: 1,
          scY: 1,
          twnScX: !0,
          twnScY: !0
      },
      init: function(b, c) {
          this.ctx = ig.system.context;
          this.parent(b, c);
          ig.ua.mobile && _SETTINGS.Ad.Mobile.Preroll.Enabled && MobileAdInGamePreroll.Initialize()
      },
      end: function() {
          this.parent();
          var b = 0 <= document.URL.indexOf("localhost") ? 500 : 3E3;
          window.setTimeout("ig.system.setGame(MyGame)", b)
      },
      setupCustomAnimation: function() {
          this.customAnim = new ig.Animation(this.customAnim,0.05,[0, 1, 2, 3, 4, 5]);
          this.customAnim.currentFrame = 0;
          ig.loadingScreen = this;
          ig.loadingScreen.animationTimer = window.setInterval("ig.loadingScreen.animate()", 100)
      },
      animate: function() {
          this.customAnim.currentFrame < this.customAnim.sequence.length ? this.customAnim.currentFrame++ : this.customAnim.currentFrame = 0;
          this.customAnim.gotoFrame(this.customAnim.currentFrame)
      },
      tweenHolder: function(b, c, d, e) {
          !1 == this[b.targ][b.bol] ? (this[b.targ][b.inner] = this.tinyTween(this[b.targ][b.inner], c, e),
          this[b.targ][b.inner] == c && (this[b.targ][b.bol] = !0)) : (this[b.targ][b.inner] = this.tinyTween(this[b.targ][b.inner], d, e),
          this[b.targ][b.inner] == d && (this[b.targ][b.bol] = !1))
      },
      tinyTween: function(b, c, d) {
          if (b > c)
              return b -= d,
              b < c && (b = c),
              b;
          if (b < c)
              return b += d,
              b > c && (b = c),
              b;
          if (b == c)
              return b
      },
      drawer: function(b) {
          var c = b.ctx || ig.system.context
            , d = b.offX || 0
            , e = b.offY || 0
            , g = b.cent || !1
            , m = null == b.scX ? 1 : b.scX
            , x = null == b.scY ? 1 : b.scY
            , p = null == b.alp && 0 != b.alp ? 1 : b.alp
            , v = null == b.rot ? 0 : b.rot
            , t = b.frameX || 1
            , q = b.frameY || 1
            , l = b.frame || 0
            , n = b.pic.width / t * (l % t)
            , l = b.pic.height / q * Math.floor(l / t)
            , y = b.pic.width / t
            , A = b.pic.height / q
            , t = b.pic.width / t * m
            , q = b.pic.height / q * x;
          if (!(0 >= p))
              if (0 < v || 0 > m || 0 > x) {
                  var F = b.x
                    , B = b.y
                    , d = g ? -y / 2 + d : d || 0
                    , e = g ? -A / 2 + e : e || 0;
                  0 < y && 0 < A && (c.save(),
                  c.translate(F, B),
                  c.scale(m, x),
                  c.rotate(2 * Math.PI / 360 * v),
                  c.globalAlpha = p,
                  c.drawImage(b.pic.data, n, l, y, A, d, e, y, A),
                  c.restore())
              } else
                  F = g ? b.x - t / 2 + d : b.x + d,
                  B = g ? b.y - q / 2 + e : b.y + e,
                  0 < y && 0 < A && (c.globalAlpha = p,
                  c.drawImage(b.pic.data, n, l, y, A, F, B, t, q),
                  c.globalAlpha = 1)
      },
      textW: function(b) {
          return this.ctxRef.measureText(b).width
      },
      textDraw: function(b) {
          var c = b.rot ? b.rot : 0
            , d = b.tx ? b.tx : 0
            , e = b.x ? b.x : 0
            , g = b.y ? b.y : 0
            , m = void 0 == b.scX ? 1 : b.scX
            , x = void 0 == b.scY ? 1 : b.scY
            , p = b.stroke ? b.stroke : !1
            , v = void 0 == b.strokeAlp ? 1 : b.strokeAlp
            , t = b.strokeColour ? b.strokeColour : "black"
            , q = void 0 == b.alp ? 1 : b.alp
            , l = b.col ? b.col : this.ctx.fillStyle
            , n = b.font || "dunkin"
            , y = b.px || 10
            , A = b.strokeLine || 3
            , F = b.align || "center"
            , B = b.ctx || ig.system.context;
          this.ctxRef = b.ctx || ig.system.context;
          B.font = y + "px " + n;
          "left" == F ? e += 0.5 * this.textW(d) : "right" == F && (e -= 0.5 * this.textW(d));
          B.save();
          b = B.measureText("M").width * x;
          B.translate(e, g + b / 2);
          B.scale(m, x);
          B.rotate(c ? 2 * Math.PI / 360 * c : 0);
          B.fillStyle = l;
          B.globalAlpha = v;
          !0 == p && (B.lineWidth = A,
          B.strokeStyle = t,
          B.strokeText(d, -this.textW(d) / 2, 0));
          B.globalAlpha = q;
          B.fillText(d, -this.textW(d) / 2, 0);
          B.restore()
      },
      draw: function() {
          this._drawStatus += (this.status - this._drawStatus) / 5;
          this.textDraw({
              x: -100,
              y: -100,
              tx: "loading",
              px: 10
          });
          this.ctx.clearRect(0, 0, ig.system.width, ig.system.height);
          ig.ua.mobile ? this.bgIm.draw(0, 0) : (this.tweenHolder({
              targ: "bg",
              inner: "scX",
              bol: "twnScX"
          }, 1, 1.008, 2E-4),
          this.tweenHolder({
              targ: "bg",
              inner: "scY",
              bol: "twnScY"
          }, 1.008, 1, 2E-4),
          this.tweenHolder({
              targ: "bar",
              inner: "scX",
              bol: "twnScX"
          }, 1, 0.95, 2E-4),
          this.tweenHolder({
              targ: "bar",
              inner: "scY",
              bol: "twnScY"
          }, 0.95, 1, 2E-4),
          this.drawer({
              x: ig.system.width / 2,
              y: ig.system.height / 2,
              scX: this.bg.scX,
              scY: this.bg.scY,
              pic: this.bgIm,
              cent: !0
          }));
          this.ctx.drawImage(this.baseIm.data, 0, 0, this.baseIm.width - 1, this.baseIm.height - 1, (ig.system.width - this.baseIm.width * this.bar.scX) / 2, 540 - this.baseIm.height / 2 * this.bar.scY, this.baseIm.width * this.bar.scX, this.baseIm.height * this.bar.scY);
          0 < this._drawStatus && this.ctx.drawImage(this.barIm.data, 0, 0, this.barIm.width * this._drawStatus > this.barIm.width - 1 ? this.barIm.width - 1 : this.barIm.width * this._drawStatus, this.barIm.height, (ig.system.width - this.barIm.width * this.bar.scX) / 2, 540 - this.barIm.height / 2 * this.bar.scY, this.barIm.width * this._drawStatus * this.bar.scX, this.barIm.height * this.bar.scY)
      }
  })
});
ig.baked = !0;
ig.module("plugins.tween").requires("impact.entity").defines(function() {
  Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
      for (var c = 0; c < this.length; ++c)
          if (this[c] === b)
              return c;
      return -1
  }
  );
  ig.Entity.prototype.tweens = [];
  ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update;
  ig.Entity.prototype.update = function() {
      this._preTweenUpdate();
      if (0 < this.tweens.length) {
          for (var b = [], c = 0; c < this.tweens.length; c++)
              this.tweens[c].update(),
              this.tweens[c].complete || b.push(this.tweens[c]);
          this.tweens = b
      }
  }
  ;
  ig.Entity.prototype.tween = function(b, c, d) {
      b = new ig.Tween(this,b,c,d);
      this.tweens.push(b);
      return b
  }
  ;
  ig.Entity.prototype.pauseTweens = function() {
      for (var b = 0; b < this.tweens.length; b++)
          this.tweens[b].pause()
  }
  ;
  ig.Entity.prototype.resumeTweens = function() {
      for (var b = 0; b < this.tweens.length; b++)
          this.tweens[b].resume()
  }
  ;
  ig.Entity.prototype.stopTweens = function(b) {
      for (var c = 0; c < this.tweens.length; c++)
          this.tweens[c].stop(b)
  }
  ;
  ig.Tween = function(b, c, d, e) {
      var g = {}
        , m = {}
        , x = {}
        , p = 0
        , v = !1
        , t = !1
        , q = !1;
      this.duration = d;
      this.paused = this.complete = !1;
      this.easing = ig.Tween.Easing.Linear.EaseNone;
      this.onComplete = !1;
      this.loop = this.delay = 0;
      this.loopCount = -1;
      ig.merge(this, e);
      this.loopNum = this.loopCount;
      this.chain = function(b) {
          q = b
      }
      ;
      this.initEnd = function(b, c, d) {
          if ("object" !== typeof c[b])
              d[b] = c[b];
          else
              for (subprop in c[b])
                  d[b] || (d[b] = {}),
                  this.initEnd(subprop, c[b], d[b])
      }
      ;
      this.initStart = function(b, c, d, e) {
          if ("object" !== typeof d[b])
              "undefined" !== typeof c[b] && (e[b] = d[b]);
          else
              for (subprop in d[b])
                  e[b] || (e[b] = {}),
                  "undefined" !== typeof c[b] && this.initStart(subprop, c[b], d[b], e[b])
      }
      ;
      this.start = function() {
          this.paused = this.complete = !1;
          this.loopNum = this.loopCount;
          p = 0;
          -1 == b.tweens.indexOf(this) && b.tweens.push(this);
          t = !0;
          v = new ig.Timer;
          for (var d in c)
              this.initEnd(d, c, m);
          for (d in m)
              this.initStart(d, m, b, g),
              this.initDelta(d, x, b, m)
      }
      ;
      this.initDelta = function(b, c, d, e) {
          if ("object" !== typeof e[b])
              c[b] = e[b] - d[b];
          else
              for (subprop in e[b])
                  c[b] || (c[b] = {}),
                  this.initDelta(subprop, c[b], d[b], e[b])
      }
      ;
      this.propUpdate = function(b, c, d, e, g) {
          if ("object" !== typeof d[b])
              c[b] = "undefined" != typeof d[b] ? d[b] + e[b] * g : c[b];
          else
              for (subprop in d[b])
                  this.propUpdate(subprop, c[b], d[b], e[b], g)
      }
      ;
      this.propSet = function(b, c, d) {
          if ("object" !== typeof c[b])
              d[b] = c[b];
          else
              for (subprop in c[b])
                  d[b] || (d[b] = {}),
                  this.propSet(subprop, c[b], d[b])
      }
      ;
      this.update = function() {
          if (!t)
              return !1;
          if (this.delay) {
              if (v.delta() < this.delay)
                  return;
              this.delay = 0;
              v.reset()
          }
          if (this.paused || this.complete)
              return !1;
          var c = (v.delta() + p) / this.duration
            , c = 1 < c ? 1 : c
            , d = this.easing(c);
          for (property in x)
              this.propUpdate(property, b, g, x, d);
          if (1 <= c) {
              if (0 == this.loopNum || !this.loop) {
                  this.complete = !0;
                  if (this.onComplete)
                      this.onComplete();
                  q && q.start();
                  return !1
              }
              if (this.loop == ig.Tween.Loop.Revert) {
                  for (property in g)
                      this.propSet(property, g, b);
                  p = 0;
                  v.reset();
                  -1 != this.loopNum && this.loopNum--
              } else if (this.loop == ig.Tween.Loop.Reverse) {
                  c = {};
                  d = {};
                  ig.merge(c, m);
                  ig.merge(d, g);
                  ig.merge(g, c);
                  ig.merge(m, d);
                  for (property in m)
                      this.initDelta(property, x, b, m);
                  p = 0;
                  v.reset();
                  -1 != this.loopNum && this.loopNum--
              }
          }
      }
      ;
      this.pause = function() {
          this.paused = !0;
          p += v.delta()
      }
      ;
      this.resume = function() {
          this.paused = !1;
          v.reset()
      }
      ;
      this.stop = function(b) {
          b && (this.loop = this.complete = this.paused = !1,
          p += d,
          this.update());
          this.complete = !0
      }
  }
  ;
  ig.Tween.Loop = {
      Revert: 1,
      Reverse: 2
  };
  ig.Tween.Easing = {
      Linear: {},
      Quadratic: {},
      Cubic: {},
      Quartic: {},
      Quintic: {},
      Sinusoidal: {},
      Exponential: {},
      Circular: {},
      Elastic: {},
      Back: {},
      Bounce: {}
  };
  ig.Tween.Easing.Linear.EaseNone = function(b) {
      return b
  }
  ;
  ig.Tween.Easing.Quadratic.EaseIn = function(b) {
      return b * b
  }
  ;
  ig.Tween.Easing.Quadratic.EaseOut = function(b) {
      return -b * (b - 2)
  }
  ;
  ig.Tween.Easing.Quadratic.EaseInOut = function(b) {
      return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1)
  }
  ;
  ig.Tween.Easing.Cubic.EaseIn = function(b) {
      return b * b * b
  }
  ;
  ig.Tween.Easing.Cubic.EaseOut = function(b) {
      return --b * b * b + 1
  }
  ;
  ig.Tween.Easing.Cubic.EaseInOut = function(b) {
      return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2)
  }
  ;
  ig.Tween.Easing.Quartic.EaseIn = function(b) {
      return b * b * b * b
  }
  ;
  ig.Tween.Easing.Quartic.EaseOut = function(b) {
      return -(--b * b * b * b - 1)
  }
  ;
  ig.Tween.Easing.Quartic.EaseInOut = function(b) {
      return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2)
  }
  ;
  ig.Tween.Easing.Quintic.EaseIn = function(b) {
      return b * b * b * b * b
  }
  ;
  ig.Tween.Easing.Quintic.EaseOut = function(b) {
      return (b -= 1) * b * b * b * b + 1
  }
  ;
  ig.Tween.Easing.Quintic.EaseInOut = function(b) {
      return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2)
  }
  ;
  ig.Tween.Easing.Sinusoidal.EaseIn = function(b) {
      return -Math.cos(b * Math.PI / 2) + 1
  }
  ;
  ig.Tween.Easing.Sinusoidal.EaseOut = function(b) {
      return Math.sin(b * Math.PI / 2)
  }
  ;
  ig.Tween.Easing.Sinusoidal.EaseInOut = function(b) {
      return -0.5 * (Math.cos(Math.PI * b) - 1)
  }
  ;
  ig.Tween.Easing.Exponential.EaseIn = function(b) {
      return 0 == b ? 0 : Math.pow(2, 10 * (b - 1))
  }
  ;
  ig.Tween.Easing.Exponential.EaseOut = function(b) {
      return 1 == b ? 1 : -Math.pow(2, -10 * b) + 1
  }
  ;
  ig.Tween.Easing.Exponential.EaseInOut = function(b) {
      return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2)
  }
  ;
  ig.Tween.Easing.Circular.EaseIn = function(b) {
      return -(Math.sqrt(1 - b * b) - 1)
  }
  ;
  ig.Tween.Easing.Circular.EaseOut = function(b) {
      return Math.sqrt(1 - --b * b)
  }
  ;
  ig.Tween.Easing.Circular.EaseInOut = function(b) {
      return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
  }
  ;
  ig.Tween.Easing.Elastic.EaseIn = function(b) {
      var c, d = 0.1, e = 0.4;
      if (0 == b)
          return 0;
      if (1 == b)
          return 1;
      e || (e = 0.3);
      !d || 1 > d ? (d = 1,
      c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
      return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e))
  }
  ;
  ig.Tween.Easing.Elastic.EaseOut = function(b) {
      var c, d = 0.1, e = 0.4;
      if (0 == b)
          return 0;
      if (1 == b)
          return 1;
      e || (e = 0.3);
      !d || 1 > d ? (d = 1,
      c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
      return d * Math.pow(2, -10 * b) * Math.sin((b - c) * 2 * Math.PI / e) + 1
  }
  ;
  ig.Tween.Easing.Elastic.EaseInOut = function(b) {
      var c, d = 0.1, e = 0.4;
      if (0 == b)
          return 0;
      if (1 == b)
          return 1;
      e || (e = 0.3);
      !d || 1 > d ? (d = 1,
      c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
      return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) + 1
  }
  ;
  ig.Tween.Easing.Back.EaseIn = function(b) {
      return b * b * (2.70158 * b - 1.70158)
  }
  ;
  ig.Tween.Easing.Back.EaseOut = function(b) {
      return (b -= 1) * b * (2.70158 * b + 1.70158) + 1
  }
  ;
  ig.Tween.Easing.Back.EaseInOut = function(b) {
      return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2)
  }
  ;
  ig.Tween.Easing.Bounce.EaseIn = function(b) {
      return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - b)
  }
  ;
  ig.Tween.Easing.Bounce.EaseOut = function(b) {
      return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375
  }
  ;
  ig.Tween.Easing.Bounce.EaseInOut = function(b) {
      return 0.5 > b ? 0.5 * ig.Tween.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tween.Easing.Bounce.EaseOut(2 * b - 1) + 0.5
  }
});
ig.baked = !0;
ig.module("plugins.url-parameters").defines(function() {
  ig.UrlParameters = ig.Class.extend({
      init: function() {
          switch (getQueryVariable("iphone")) {
          case "true":
              ig.ua.iPhone = !0,
              console.log("iPhone mode")
          }
          var b = getQueryVariable("webview");
          if (b)
              switch (b) {
              case "true":
                  ig.ua.is_uiwebview = !0,
                  console.log("webview mode")
              }
          if (b = getQueryVariable("debug"))
              switch (b) {
              case "true":
                  ig.game.showDebugMenu(),
                  console.log("debug mode")
              }
          switch (getQueryVariable("view")) {
          case "stats":
              ig.game.resetPlayerStats(),
              ig.game.endGame()
          }
          getQueryVariable("ad")
      }
  })
});
ig.baked = !0;
ig.module("plugins.jukebox").defines(function() {
  ig.Jukebox = ig.Class.extend({
      init: function() {
          this.player = new jukebox.Player({
              resources: ["media/audio/bgm.mp3", "media/audio/bgm.ogg"],
              autoplay: !1,
              spritemap: {
                  music: {
                      start: 0,
                      end: 11.4,
                      loop: !0
                  }
              },
              timeout: 1E3
          })
      }
  })
});
ig.baked = !0;
ig.module("plugins.director").requires("impact.impact").defines(function() {
  ig.Director = ig.Class.extend({
      init: function(b, c) {
          this.game = b;
          this.levels = [];
          this.currentLevel = 0;
          this.append(c)
      },
      loadLevel: function(b) {
          for (key in dynamicClickableEntityDivs)
              ig.game.hideOverlay([key]);
          this.currentLevel = b;
          this.game.loadLevel(this.levels[b]);
          return !0
      },
      loadLevelWithoutEntities: function(b) {
          this.currentLevel = b;
          this.game.loadLevelWithoutEntities(this.levels[b]);
          return !0
      },
      append: function(b) {
          newLevels = [];
          return "object" === typeof b ? (b.constructor === [].constructor ? newLevels = b : newLevels[0] = b,
          this.levels = this.levels.concat(newLevels),
          !0) : !1
      },
      nextLevel: function() {
          return this.currentLevel + 1 < this.levels.length ? this.loadLevel(this.currentLevel + 1) : !1
      },
      previousLevel: function() {
          return 0 <= this.currentLevel - 1 ? this.loadLevel(this.currentLevel - 1) : !1
      },
      jumpTo: function(b) {
          var c = null;
          for (i = 0; i < this.levels.length; i++)
              this.levels[i] == b && (c = i);
          return 0 <= c ? this.loadLevel(c) : !1
      },
      firstLevel: function() {
          return this.loadLevel(0)
      },
      lastLevel: function() {
          return this.loadLevel(this.levels.length - 1)
      },
      reloadLevel: function() {
          return this.loadLevel(this.currentLevel)
      }
  })
});
ig.baked = !0;
ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
  ig.Storage = ig.Class.extend({
      staticInstantiate: function() {
          return !ig.Storage.instance ? null : ig.Storage.instance
      },
      init: function() {
          ig.Storage.instance = this
      },
      isCapable: function() {
          return "undefined" !== typeof window.localStorage
      },
      isSet: function(b) {
          return null !== this.get(b)
      },
      initUnset: function(b, c) {
          null === this.get(b) && this.set(b, c)
      },
      get: function(b) {
          if (!this.isCapable())
              return null;
          try {
              return JSON.parse(localStorage.getItem(b))
          } catch (c) {
              return window.localStorage.getItem(b)
          }
      },
      getInt: function(b) {
          return ~~this.get(b)
      },
      getFloat: function(b) {
          return parseFloat(this.get(b))
      },
      getBool: function(b) {
          return !!this.get(b)
      },
      key: function(b) {
          return this.isCapable() ? window.localStorage.key(b) : null
      },
      set: function(b, c) {
          if (!this.isCapable())
              return null;
          try {
              window.localStorage.setItem(b, JSON.stringify(c))
          } catch (d) {
              console.log(d)
          }
      },
      setHighest: function(b, c) {
          c > this.getFloat(b) && this.set(b, c)
      },
      remove: function(b) {
          if (!this.isCapable())
              return null;
          window.localStorage.removeItem(b)
      },
      clear: function() {
          if (!this.isCapable())
              return null;
          window.localStorage.clear()
      }
  })
});
ig.baked = !0;
ig.module("plugins.gamedist").defines(function() {
  window.GD_OPTIONS = {
      gameId: "40031a282f2a416ea36bb4ccee5e87eb",
      advertisementSettings: {
          debug: !1,
          autoplay: !1,
          locale: "en"
      },
      onEvent: function(b) {
          switch (b.name) {
          case "SDK_GAME_START":
              ig.gd.unfreez();
              if ("function" === typeof ig.gd.onAdClose)
                  ig.gd.onAdClose();
              ig.gd.onAdClose = 0;
              break;
          case "SDK_GAME_PAUSE":
              ig.gd.freez()
          }
      }
  };
  var b, c = document.getElementsByTagName("script")[0];
  document.getElementById("gamedistribution-jssdk") || (b = document.createElement("script"),
  b.id = "gamedistribution-jssdk",
  b.src = "./gamedistribution/js/main.min.js",
  c.parentNode.insertBefore(b, c));
  ig.Gd = ig.Class.extend({
      pausedMidplay: 0,
      prevMuted: {
          bgm: 0,
          sfx: 0
      },
      onAdClose: 0,
      adShowing: 0,
      isFreez: 0,
      createTestButton: function() {
          this.createDiv("Resume", 5, "green", "white", function() {
              ig.game && ig.gd && ig.gd.unfreez()
          });
          this.createDiv("Pause", 70, "red", "white", function() {
              ig.game && ig.gd && ig.gd.freez()
          })
      },
      createDiv: function(b, c, g, m, x) {
          var p = ig.$new("button");
          document.body.appendChild(p);
          p.textContent = b;
          p.style.position = "absolute";
          p.style.color = m;
          p.style.background = g;
          p.style.top = "5px";
          p.style.left = c + "px";
          p.style.padding = "5px";
          p.style.fontSize = "12px";
          p.style.fontFamily = "Arial";
          p.style.cursor = "pointer";
          p.style["z-index"] = 999999;
          p.onclick = x
      },
      freez: function() {
          gdsdk && (ig.game && (ig.soundHandler.mute(),
          ig.game.pauseGame()),
          this.isFreez = 1)
      },
      unfreez: function() {
          gdsdk && (this.isFreez = this.adShowing = 0,
          ig.game && (ig.soundHandler.unmute(),
          ig.game.resumeGame()))
      },
      show: function(b) {
          gdsdk ? (console.log("Mid roll. Play button"),
          this.adShowing || (this.adShowing = 1,
          this.onAdClose = b || 0,
          gdsdk.showBanner())) : b()
      }
  });
  ig.gd = new ig.Gd
});
this.START_BRANDING_SPLASH;
ig.baked = !0;
ig.module("plugins.branding.splash").requires("impact.impact", "impact.entity").defines(function() {
  ig.BrandingSplash = ig.Class.extend({
      init: function() {
          ig.game.spawnEntity(EntityBranding, 0, 0)
      }
  });
  EntityBranding = ig.Entity.extend({
      gravityFactor: 0,
      size: {
          x: 32,
          y: 32
      },
      logoIm: new ig.Image("branding/logo.png"),
      alp: 0,
      init: function(b, c, d) {
          this.parent(b, c, d);
          this.logo = new ig.AnimationSheet(this.logoIm.path,this.logoIm.width,this.logoIm.height);
          this.size.x = this.logoIm.width;
          this.size.y = this.logoIm.height;
          this.anims.idle = new ig.Animation(this.logo,0,[0],!0);
          this.pos.x = (ig.system.width - this.size.x) / 2;
          this.pos.y = (ig.system.height - this.size.y) / 2;
          this.endPosY = (ig.system.height - this.size.y) / 2;
          b = this.tween({
              alp: 1
          }, 0.3, {});
          c = this.tween({}, 2.5, {
              onComplete: function() {
                  ig.game.director.loadLevel(ig.game.director.currentLevel)
              }
          });
          b.chain(c);
          b.start();
          this.currentAnim = this.anims.idle
      },
      createClickableLayer: function() {
          console.log("Build clickable layer");
          this.checkClickableLayer("branding-splash", _SETTINGS.Branding.Logo.Link, !0)
      },
      doesClickableLayerExist: function(b) {
          for (k in dynamicClickableEntityDivs)
              if (k == b)
                  return !0;
          return !1
      },
      checkClickableLayer: function(b, c, d) {
          "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]),
          $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
      },
      createClickableOutboundLayer: function(b, c, d, e) {
          var g = ig.$new("div");
          g.id = b;
          document.body.appendChild(g);
          $("#" + g.id).css("float", "left");
          $("#" + g.id).css("position", "absolute");
          if (ig.ua.mobile) {
              var m = window.innerHeight / mobileHeight
                , x = window.innerWidth / mobileWidth;
              $("#" + g.id).css("left", this.pos.x * x);
              $("#" + g.id).css("top", this.pos.y * m);
              $("#" + g.id).css("width", this.size.x * x);
              $("#" + g.id).css("height", this.size.y * m)
          } else
              m = w / 2 - destW / 2,
              x = h / 2 - destH / 2,
              console.log(m, x),
              $("#" + g.id).css("left", m + this.pos.x * multiplier),
              $("#" + g.id).css("top", x + this.pos.y * multiplier),
              $("#" + g.id).css("width", this.size.x * multiplier),
              $("#" + g.id).css("height", this.size.y * multiplier);
          e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
          dynamicClickableEntityDivs[b] = {};
          dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
          dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
          dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
          dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
      },
      draw: function() {
          ig.system.context.globalAlpha = 1;
          ig.system.context.fillStyle = "#f3b43b";
          ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
          ig.system.context.globalAlpha = this.alp;
          this.parent();
          ig.system.context.globalAlpha = 1
      }
  })
});
this.END_BRANDING_SPLASH;
ig.baked = !0;
ig.module("game.entities.branding-logo-placeholder").requires("impact.entity").defines(function() {
  EntityBrandingLogoPlaceholder = ig.Entity.extend({
      gravityFactor: 0,
      size: {
          x: 32,
          y: 32
      },
      _wmDrawBox: !0,
      _wmBoxColor: "rgba(0, 0, 255, 0.7)",
      init: function(b, c, d) {
          this.kill();
          this.parent(b, c, d);
          if (d)
              switch (console.log("settings found ... using that div layer name"),
              console.log("settings.centralize:", d.centralize),
              d.centralize) {
              case "true":
                  console.log("centralize true");
                  centralize = !0;
                  break;
              case "false":
                  console.log("centralize false");
                  centralize = !1;
                  break;
              default:
                  console.log("default ... centralize false"),
                  centralize = !1
              }
          else
              centralize = !1;
          "undefined" == typeof wm && this.kill()
      }
  })
});
this.START_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.branding-logo").requires("impact.entity").defines(function() {
  EntityBrandingLogo = ig.Entity.extend({
      gravityFactor: 0,
      logo: new ig.AnimationSheet("branding/logo.png",_SETTINGS.Branding.Logo.Width,_SETTINGS.Branding.Logo.Height),
      size: {
          x: 141,
          y: 20
      },
      zIndex: 10001,
      init: function(b, c, d) {
          this.kill();
          this.parent(b, c, d);
          "undefined" == typeof wm && (_SETTINGS.Branding.Logo.Enabled ? (this.size.x = _SETTINGS.Branding.Logo.Width,
          this.size.y = _SETTINGS.Branding.Logo.Height,
          d && d.centralize && (this.pos.x = ig.system.width / 2 - this.size.x / 2,
          console.log("centralize true ... centering branded logo ..."))) : this.kill());
          this.anims.idle = new ig.Animation(this.logo,0,[0],!0);
          this.currentAnim = this.anims.idle;
          d ? (console.log("branding settings found ... using that div layer name"),
          b = d.div_layer_name) : b = "branding-logo";
          _SETTINGS.Branding.Logo.LinkEnabled && (console.log("logo link enabled"),
          this.checkClickableLayer(b, _SETTINGS.Branding.Logo.Link, _SETTINGS.Branding.Logo.NewWindow));
          console.log("branding logo spawed ...")
      },
      doesClickableLayerExist: function(b) {
          for (k in dynamicClickableEntityDivs)
              if (k == b)
                  return !0;
          return !1
      },
      checkClickableLayer: function(b, c, d) {
          "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]),
          $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
      },
      createClickableOutboundLayer: function(b, c, d, e) {
          var g = ig.$new("div");
          g.id = b;
          document.body.appendChild(g);
          $("#" + g.id).css("float", "left");
          $("#" + g.id).css("position", "absolute");
          if (ig.ua.mobile) {
              var m = window.innerHeight / mobileHeight
                , x = window.innerWidth / mobileWidth;
              $("#" + g.id).css("left", this.pos.x * x);
              $("#" + g.id).css("top", this.pos.y * m);
              $("#" + g.id).css("width", this.size.x * x);
              $("#" + g.id).css("height", this.size.y * m)
          } else
              m = w / 2 - destW / 2,
              x = h / 2 - destH / 2,
              console.log(m, x),
              $("#" + g.id).css("left", m + this.pos.x * multiplier),
              $("#" + g.id).css("top", x + this.pos.y * multiplier),
              $("#" + g.id).css("width", this.size.x * multiplier),
              $("#" + g.id).css("height", this.size.y * multiplier);
          e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
          dynamicClickableEntityDivs[b] = {};
          dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
          dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
          dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
          dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
      }
  })
});
this.END_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.plain").requires("impact.entity").defines(function() {
  EntityPlain = ig.Entity.extend({
      redraw: !1,
      sc: {
          x: 1,
          y: 1
      },
      maxVel: {
          x: 5E3,
          y: 5E3
      },
      sheetX: 1,
      sheetY: 1,
      gravityFactor: 0,
      clearColor: null,
      tweening: !1,
      which: 0,
      size: {
          x: 50,
          y: 50
      },
      halfSize: {
          x: 50,
          y: 50
      },
      ctxRef: null,
      init: function(b, c, d) {
          this.parent(b, c, d);
          ig.global.wm || (this.ctx = ig.system.context)
      },
      circleHitTest: function(b, c, d, e, g, m) {
          b -= e;
          c -= g;
          return Math.sqrt(b * b + c * c) < d + m ? !0 : !1
      },
      getSize: function(b) {
          this.size.x = this[b].width;
          this.size.y = this[b].height;
          this.halfSize.x = this[b].width / 2;
          this.halfSize.y = this[b].height / 2
      },
      ready: function() {
          this.parent();
          this.main = ig.game.getEntitiesByType(EntityPlainGame)[0];
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
      },
      soundLooper: function(b) {
          null == this[b + "sTimer"] && (this[b + "sTimer"] = new ig.Timer,
          this[b + "sTime"] = this.sLoop[b].duration,
          this.sounder(b));
          this[b + "sTimer"].delta() > this[b + "sTime"] && (this[b + "sTimer"].reset(),
          this.sounder(b))
      },
      soundLoopReset: function(b) {
          this[b + "sTimer"].reset()
      },
      sounder: function(b) {
          try {
              ig.soundHandler.playSound(ig.soundHandler.SOUNDID[b])
          } catch (c) {
              console.log(c)
          }
      },
      posXY: function(b) {
          b.pos.x = this.pointer.pos.x;
          b.pos.y = this.pointer.pos.y;
          console.log(this.pos.x, this.pos.y)
      },
      resetFrame: function(b) {
          this[b].ended = !1;
          this[b].frame = 0
      },
      runAnim: function(b) {
          void 0 == this[b] && (this[b] = {});
          this[b].ended = this[b].ended || !1;
          this[b].loop = this[b].loop || !1;
          this[b].frame = this[b].frame || 0;
          this[b].frameTimer = this[b].frameTimer || new ig.Timer;
          this[b].frameTime = this[b].frameTime || 0.03;
          !0 != this[b].ended && (!1 == this[b].loop && this[b].frame == this[b].frames.length - 1 ? (this[b].ended = !0,
          this.done && this.done(b)) : 1 < this[b].frames.length && this[b].frameTimer.delta() > this[b].frameTime && (this[b].frameTimer.reset(),
          this[b].frame = (this[b].frame + 1) % this[b].frames.length))
      },
      tweener: function(b, c, d, e, g) {
          var m = {};
          m[b] = c;
          null == g && (g = 0);
          null == e && (e = "none");
          this.tween("this" == b ? c : m, d, {
              delay: g,
              targ: b,
              seq: e,
              onComplete: function() {
                  null != e && this.tweenF(e, b)
              }
              .bind(this),
              easing: ig.Tween.Easing.Quadratic.EaseOut
          }).start()
      },
      tweener2: function(b, c, d, e, g) {
          var m = {};
          m[b] = c;
          null == g && (g = 0);
          null == e && (e = "none");
          this.tween("this" == b ? c : m, d, {
              delay: g,
              targ: b,
              seq: e,
              onComplete: function() {
                  null != e && this.tweenF(e, b)
              }
              .bind(this),
              easing: ig.Tween.Easing.Linear.EaseNone
          }).start()
      },
      sizer: function(b, c, d, e, g, m, x, p) {
          this.size.x = b.width / c * this.base.oriSc + (x || 0);
          this.size.y = b.height / d * this.base.oriSc + (p || 0);
          !0 == m ? (this.pos.x = e - this.size.x / 2,
          this.pos.y = g - this.size.y / 2) : (this.pos.x = e,
          this.pos.y = g)
      },
      pauseT: function() {
          this.pauseTweens()
      },
      unpauseT: function() {
          this.resumeTweens()
      },
      unpause: function() {
          for (var b = 0; b < this.main.timers.length; b++)
              this.main.timers[b].unpause();
          this.unpauseT()
      },
      pause: function() {
          for (var b = 0; b < this.main.timers.length; b++)
              this.main.timers[b].pause();
          this.pauseT()
      },
      tinyTween: function(b, c, d) {
          if (b > c)
              return b -= d,
              b < c && (b = c),
              b;
          if (b < c)
              return b += d,
              b > c && (b = c),
              b;
          if (b == c)
              return b
      },
      clearBg: function() {
          ig.system.bgcontext.clearRect(0, 0, ig.system.width, ig.system.height);
          ig.game.redrawEntities()
      },
      centDraw: function(b, c, d, e, g) {
          this.drawer("game", b, 1, 1, 0, c, d, e, e, !0, 1, g)
      },
      ctxDrawer: function(b) {
          var c = b.ctx || ig.system.context
            , d = b.offX || 0
            , e = b.offY || 0
            , g = b.cent || !1
            , m = null == b.scX ? 1 : b.scX
            , x = null == b.scY ? 1 : b.scY
            , p = null == b.alp && 0 != b.alp ? 1 : b.alp
            , v = null == b.rot ? 0 : b.rot
            , t = b.sx
            , q = b.sy
            , l = b.sw
            , n = b.sh
            , y = l * m
            , A = n * x;
          if (!(0 >= p))
              if (0 < v || 0 > m || 0 > x) {
                  var F = b.x
                    , B = b.y
                    , d = g ? -l / 2 + d : d || 0
                    , e = g ? -n / 2 + e : e || 0;
                  0 < l && 0 < n && (c.save(),
                  c.translate(F, B),
                  c.scale(m, x),
                  c.rotate(2 * Math.PI / 360 * v),
                  c.globalAlpha = p,
                  c.drawImage(b.pic, t, q, l, n, d, e, l, n),
                  c.restore())
              } else
                  F = g ? b.x - y / 2 + d : b.x + d,
                  B = g ? b.y - A / 2 + e : b.y + e,
                  0 < l && 0 < n && (c.globalAlpha = p,
                  c.drawImage(b.pic, t, q, l, n, F, B, y, A),
                  c.globalAlpha = 1)
      },
      frameDrawer: function(b) {
          var c = b.ctx || ig.system.context
            , d = b.offX || 0
            , e = b.offY || 0
            , g = b.cent || !1
            , m = null == b.scX ? 1 : b.scX
            , x = null == b.scY ? 1 : b.scY
            , p = null == b.alp && 0 != b.alp ? 1 : b.alp
            , v = null == b.rot ? 0 : b.rot
            , t = b.frame.x
            , q = b.frame.y
            , l = b.frame.w
            , n = b.frame.h
            , y = l * m
            , A = n * x;
          if (!(0 >= p))
              if (0 < v || 0 > m || 0 > x) {
                  var F = b.x
                    , B = b.y
                    , d = g ? -l / 2 + d : d || 0
                    , e = g ? -n / 2 + e : e || 0;
                  0 < l && 0 < n && (c.save(),
                  c.translate(F, B),
                  c.scale(m, x),
                  c.rotate(2 * Math.PI / 360 * v),
                  c.globalAlpha = p,
                  c.drawImage(b.pic, t, q, l, n, d, e, l, n),
                  c.restore())
              } else
                  F = g ? b.x - y / 2 + d : b.x + d,
                  B = g ? b.y - A / 2 + e : b.y + e,
                  0 < l && 0 < n && (c.globalAlpha = p,
                  c.drawImage(b.pic, t, q, l, n, F, B, y, A),
                  c.globalAlpha = 1)
      },
      drawer: function(b) {
          var c = b.ctx || ig.system.context
            , d = b.offX || 0
            , e = b.offY || 0
            , g = b.cent || !1
            , m = null == b.scX ? 1 : b.scX
            , x = null == b.scY ? 1 : b.scY
            , p = null == b.alp && 0 != b.alp ? 1 : b.alp
            , v = null == b.rot ? 0 : b.rot
            , t = b.frameX || 1
            , q = b.frameY || 1
            , l = b.frame || 0
            , n = b.pic.width / t * (l % t)
            , l = b.pic.height / q * Math.floor(l / t)
            , y = b.pic.width / t
            , A = b.pic.height / q
            , t = b.pic.width / t * m
            , q = b.pic.height / q * x;
          if (!(0 >= p))
              if (0 < v || 0 > m || 0 > x) {
                  var F = b.x
                    , B = b.y
                    , d = g ? -y / 2 + d : d || 0
                    , e = g ? -A / 2 + e : e || 0;
                  0 < y && 0 < A && (c.save(),
                  c.translate(F, B),
                  c.scale(m, x),
                  c.rotate(2 * Math.PI / 360 * v),
                  c.globalAlpha = p,
                  c.drawImage(b.pic.data, n, l, y, A, d, e, y, A),
                  c.restore())
              } else
                  F = g ? b.x - t / 2 + d : b.x + d,
                  B = g ? b.y - q / 2 + e : b.y + e,
                  0 < y && 0 < A && (c.globalAlpha = p,
                  c.drawImage(b.pic.data, n, l, y, A, F, B, t, q),
                  c.globalAlpha = 1)
      },
      textSet: function(b, c, d, e) {
          this.ctxRef = e = e || ig.system.context;
          e.font = b + "px " + (d || "dunkin");
          e.fillStyle = c
      },
      textLib: function(b, c, d) {
          d = d || 0;
          this.textDraw("game", _STRINGS.Game[b][3], _STRINGS.Game[b][4], _STRINGS.Game[b][0], (c || 0) + _STRINGS.Game[b][1] - this.ctx.measureText(_STRINGS.Game[b][0]).width / 2 * _STRINGS.Game[b][3], _STRINGS.Game[b][2] + d)
      },
      textLibLeft: function(b, c, d) {
          this.textDraw("game", _STRINGS.Game[b][3], _STRINGS.Game[b][4], _STRINGS.Game[b][0], (c || 0) + _STRINGS.Game[b][1], _STRINGS.Game[b][2] + (d || 0))
      },
      textW: function(b) {
          return this.ctxRef.measureText(b).width
      },
      textDraw: function(b) {
          var c = b.rot ? b.rot : 0
            , d = b.tx ? b.tx : 0
            , e = b.x ? b.x : 0
            , g = b.y ? b.y : 0
            , m = void 0 == b.scX ? 1 : b.scX
            , x = void 0 == b.scY ? 1 : b.scY
            , p = b.stroke ? b.stroke : !1
            , v = void 0 == b.strokeAlp ? 1 : b.strokeAlp
            , t = b.strokeColour ? b.strokeColour : "black"
            , q = void 0 == b.alp ? 1 : b.alp
            , l = b.col ? b.col : this.ctx.fillStyle
            , n = b.font || "dunkin"
            , y = b.px || 10
            , A = b.strokeLine || 3
            , F = b.align || "center"
            , B = b.ctx || ig.system.context;
          this.ctxRef = b.ctx || ig.system.context;
          B.font = y + "px " + n;
          void 0 != b.maxWidth && this.textW(d) > b.maxWidth && (x = m = b.maxWidth / this.textW(d));
          "left" == F ? e += 0.5 * this.textW(d) : "right" == F && (e -= 0.5 * this.textW(d));
          B.save();
          b = B.measureText("M").width * x;
          B.translate(e, g + b / 2);
          B.scale(m, x);
          B.rotate(c ? 2 * Math.PI / 360 * c : 0);
          B.fillStyle = l;
          B.globalAlpha = v;
          !0 == p && (B.lineWidth = A,
          B.strokeStyle = t,
          B.strokeText(d, -this.textW(d) / 2, 0));
          B.globalAlpha = q;
          B.fillText(d, -this.textW(d) / 2, 0);
          B.restore()
      },
      angleTo: function(b) {
          return Math.atan2(b.pos.y + b.size.y / 2 - (this.pos.y + 26 + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x / 2))
      },
      checkStorage: function() {
          try {
              return localStorage.setItem("test", "test"),
              localStorage.removeItem("test"),
              "localStorage"in window && null !== window.localStorage
          } catch (b) {
              return !1
          }
      },
      textLeft: function(b, c, d, e, g) {
          var m = ig.system.context;
          m.save();
          var x = m.measureText("M").width * g;
          m.translate(c, d + x / 2);
          m.scale(e, g);
          m.fillText(b, 0, 0);
          m.restore()
      },
      shuffleArray: function(b) {
          for (var c = b.length, d, e; 0 < c; )
              e = Math.floor(Math.random() * c),
              c--,
              d = b[c],
              b[c] = b[e],
              b[e] = d;
          return b
      }
  })
});
ig.baked = !0;
ig.module("game.entities.button-more-games").requires("game.entities.plain").defines(function() {
  EntityButtonMoreGames = EntityPlain.extend({
      gravityFactor: 0,
      moreIm: new ig.Image("media/graphics/sprites/more.png"),
      butIm: new ig.Image("media/graphics/sprites/more.png"),
      size: {
          x: 64,
          y: 66
      },
      oriSc: 1,
      sc: 1,
      mouseSc: 0.95,
      zIndex: 1E3,
      oriPos: {
          x: 0,
          y: 0
      },
      update: function() {
          ig.global.wm || (this.parent(),
          !0 != this.tweening && (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95))
      },
      draw: function() {
          ig.global.wm || this.drawer({
              pic: this.butIm,
              x: this.pos.x + this.butIm.width / 2,
              y: this.pos.y + this.butIm.height / 2,
              scX: this.oriSc * this.sc * this.mouseSc,
              scY: this.oriSc * this.sc * this.mouseSc,
              cent: !0
          })
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.tweenF("floatUp")
      },
      tweenF: function(b) {
          switch (b) {
          case "floatUp":
              this.tweener("pos", {
                  y: this.oriPos.y - 5
              }, 0.8, "floatDown");
              break;
          case "floatDown":
              this.tweener("pos", {
                  y: this.oriPos.y + 8
              }, 1, "floatUp")
          }
      },
      init: function(b, c, d) {
          this.parent(b, c, d);
          this.oriPos.x = b;
          this.oriPos.y = c;
          this.logo = new ig.AnimationSheet(this.moreIm.path,this.moreIm.width,this.moreIm.height);
          this.size.x = this.moreIm.width;
          this.size.y = this.moreIm.height;
          "undefined" == typeof wm && (_SETTINGS.MoreGames.Enabled ? (d.div_layer_name ? (console.log("settings found ... using that div layer name"),
          b = d.div_layer_name) : b = "more-games",
          console.log("div_layer_name:", b),
          this.checkClickableLayer(b, _SETTINGS.MoreGames.Link, _SETTINGS.MoreGames.NewWindow)) : this.kill());
          this.anims.idle = new ig.Animation(this.logo,0,[0],!0);
          this.currentAnim = this.anims.idle
      },
      doesClickableLayerExist: function(b) {
          for (k in dynamicClickableEntityDivs)
              if (k == b)
                  return console.log("clickable layer already exists ..."),
                  !0;
          console.log("doesnt exist yet ...");
          return !1
      },
      checkClickableLayer: function(b, c, d) {
          "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]),
          $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
      },
      createClickableOutboundLayer: function(b, c, d, e) {
          var g = ig.$new("div");
          g.id = b;
          document.body.appendChild(g);
          $("#" + g.id).css("float", "left");
          $("#" + g.id).css("position", "absolute");
          if (ig.ua.mobile) {
              var m = window.innerHeight / mobileHeight
                , x = window.innerWidth / mobileWidth;
              $("#" + g.id).css("left", this.pos.x * x);
              $("#" + g.id).css("top", this.pos.y * m);
              $("#" + g.id).css("width", this.size.x * x);
              $("#" + g.id).css("height", this.size.y * m)
          } else
              m = document.getElementById("game").offsetLeft,
              x = document.getElementById("game").offsetTop,
              $("#" + g.id).css("left", m + this.pos.x * multiplier),
              $("#" + g.id).css("top", x + this.pos.y * multiplier),
              $("#" + g.id).css("width", this.size.x * multiplier),
              $("#" + g.id).css("height", this.size.y * multiplier);
          e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
          dynamicClickableEntityDivs[b] = {};
          dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
          dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
          dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
          dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
      }
  })
});
ig.baked = !0;
ig.module("game.entities.opening-shield").requires("impact.entity").defines(function() {
  EntityOpeningShield = ig.Entity.extend({
      size: {
          x: 48,
          y: 48
      },
      move: 0,
      mIconAnim: 0,
      shieldAnim: 0,
      titleAnim: 0,
      shieldImage: new ig.Image("media/graphics/opening/shield.png"),
      mIconImage: new ig.Image("media/graphics/opening/m_icon.png"),
      titleImage: new ig.Image("media/graphics/opening/title.png"),
      init: function(b, c, d) {
          this.parent(b, c, d)
      },
      ready: function() {
          if (!ig.wm)
              if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
                  this.initTimer = new ig.Timer(0.1);
                  try {
                      ig.soundHandler.playSound(ig.soundHandler.SOUNDID.openingSound)
                  } catch (b) {
                      console.log(b)
                  }
              } else
                  ig.game.director.nextLevel(),
                  ig.system.context.globalAlpha = 1,
                  this.kill()
      },
      update: function() {
          this.parent();
          this.updateOriginalShieldOpening()
      },
      draw: function() {
          this.parent();
          ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()),
          this.drawOriginalShieldOpening())
      },
      updateOriginalShieldOpening: function() {
          this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null,
          this.sheildTimer = new ig.Timer(0.05));
          this.sheildTimer && 0 < this.sheildTimer.delta() && (3 > this.shieldAnim ? (this.shieldAnim++,
          this.sheildTimer.reset()) : (this.sheildTimer = null,
          this.moveTimer = new ig.Timer(0.001),
          this.mIconTimer = new ig.Timer(0.05),
          this.titleTimer = new ig.Timer(0.15)));
          this.moveTimer && 0 < this.moveTimer.delta() && (this.move += 0.3,
          this.moveTimer.reset());
          this.mIconTimer && 0 < this.mIconTimer.delta() && (12 > this.mIconAnim ? (this.mIconAnim++,
          this.moveTimer.reset()) : this.mIconTimer = null);
          this.titleTimer && 0 < this.titleTimer.delta() && (11 > this.titleAnim ? (this.titleAnim++,
          this.titleTimer.reset()) : (this.titleTimer = null,
          this.nextLevelTimer = new ig.Timer(1)));
          this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null,
          ig.game.director.nextLevel(),
          ig.system.context.globalAlpha = 1)
      },
      drawOriginalShieldOpening: function() {
          if (this.moveTimer) {
              var b = ig.system.context;
              b.save();
              var c = ig.system.width / 2
                , d = ig.system.height / 2;
              b.translate(c, d);
              b.rotate(this.move * Math.PI / 180);
              b.beginPath();
              b.moveTo(0, 0);
              for (var e = 0, g = 1; 48 >= g; g += 1)
                  b.lineTo(0 + 800 * Math.cos(2 * g * Math.PI / 48), 0 + 800 * Math.sin(2 * g * Math.PI / 48)),
                  e++,
                  2 == e && (e = 0,
                  b.lineTo(0, 0));
              b.translate(-c, -d);
              c = b.createRadialGradient(c, d, 100, c, d, 250);
              c.addColorStop(0, "rgba(255,255,255,0.1)");
              c.addColorStop(1, "rgba(0,0,0,0)");
              b.fillStyle = c;
              b.fill();
              b.restore()
          }
          this.shieldImage.drawTile(ig.system.width / 2 - 91, 0 - (768 - ig.system.height) / 2, this.shieldAnim, 182, 768);
          this.moveTimer && (this.mIconImage.drawTile(ig.system.width / 2 - 96, ig.system.height / 2 - 70, this.mIconAnim, 166, 160),
          this.titleImage.drawTile(ig.system.width / 2 - 204, ig.system.height / 2 + 100, this.titleAnim, 409, 76));
          ig.system.context.globalAlpha = 1
      }
  })
});
ig.baked = !0;
ig.module("game.entities.opening-kitty").requires("impact.entity").defines(function() {
  EntityOpeningKitty = ig.Entity.extend({
      size: {
          x: 48,
          y: 48
      },
      kittyAnim: -1,
      kittyImage: new ig.Image("media/graphics/opening/kitty.png"),
      kittyTitleImage: new ig.Image("media/graphics/opening/kittytitle.png"),
      init: function(b, c, d) {
          this.parent(b, c, d)
      },
      ready: function() {
          if (!ig.wm)
              if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
                  this.initTimer = new ig.Timer(0.1);
                  try {
                      ig.soundHandler.playSound(ig.soundHandler.SOUNDID.kittyopeningSound)
                  } catch (b) {
                      console.log(b)
                  }
              } else
                  ig.game.director.nextLevel(),
                  ig.system.context.globalAlpha = 1,
                  this.kill()
      },
      update: function() {
          this.parent();
          this.updateKittyOpening()
      },
      draw: function() {
          this.parent();
          ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()),
          this.drawKittyOpening())
      },
      updateKittyOpening: function() {
          this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null,
          this.kittyTimer = new ig.Timer(0.15));
          this.kittyTimer && 0 < this.kittyTimer.delta() && (7 > this.kittyAnim ? (this.kittyAnim++,
          this.kittyTimer.reset()) : (this.kittyTimer = null,
          this.nextLevelTimer = new ig.Timer(2)));
          this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null,
          ig.game.director.nextLevel(),
          ig.system.context.globalAlpha = 1)
      },
      drawKittyOpening: function() {
          var b = ig.system.context.createLinearGradient(0, 0, 0, ig.system.height);
          b.addColorStop(0, "#ffed94");
          b.addColorStop(1, "#ffcd85");
          ig.system.context.fillStyle = b;
          ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
          0 <= this.kittyAnim && (this.kittyImage.drawTile(ig.system.width / 2 - this.kittyImage.width / 8, ig.system.height / 2 - this.kittyImage.height / 4, this.kittyAnim, 218, 325),
          this.kittyTitleImage.drawTile(ig.system.width / 2 - this.kittyTitleImage.width / 2, ig.system.height / 2 + this.kittyImage.height / 4 + 10, this.kittyAnim, 380, 37));
          ig.system.context.globalAlpha = 1
      }
  })
});
ig.baked = !0;
ig.module("game.entities.pointer").requires("impact.entity").defines(function() {
  EntityPointer = ig.Entity.extend({
      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,
      isClicking: !1,
      isHovering: !1,
      firstClick: !1,
      isReleased: !1,
      hoveringItem: null,
      objectArray: [],
      ignorePause: !0,
      zIndex: 0,
      check: function(b) {
          this.objectArray.push(b)
      },
      clickObject: function(b) {
          this.isClicking && !this.firstClick && "function" == typeof b.clicked && (b.clicked(),
          this.firstClick = !0);
          this.firstClick && !this.isReleased && "function" == typeof b.clicking && b.clicking();
          this.firstClick && this.isReleased && "function" == typeof b.released && (b.released(),
          this.firstClick = !1)
      },
      update: function() {
          if (ig.ua.mobile) {
              var b = window.innerHeight / mobileHeight;
              this.pos.x = ig.input.mouse.x / (window.innerWidth / mobileWidth) - this.size.x / 2 + ig.game.screen.x;
              this.pos.y = ig.input.mouse.y / b - this.size.y / 2
          } else
              this.pos.x = ig.input.mouse.x - this.size.x / 2,
              this.pos.y = ig.input.mouse.y - this.size.y / 2;
          var b = null
            , c = -1;
          for (a = this.objectArray.length - 1; -1 < a; a--)
              this.objectArray[a].zIndex > c && (c = this.objectArray[a].zIndex,
              b = this.objectArray[a]);
          null != b ? ("close" == b.name && console.log(b),
          null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && this.hoveringItem != b && this.hoveringItem.idle(),
          this.hoveringItem = b,
          this.clickObject(b),
          this.objectArray = []) : null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && (this.hoveringItem.idle(),
          this.hoveringItem = null);
          this.isClicking = ig.input.pressed("click");
          this.isReleased = ig.input.released("click")
      }
  })
});
ig.baked = !0;
ig.module("game.entities.pointer-selector").requires("game.entities.pointer").defines(function() {
  EntityPointerSelector = EntityPointer.extend({
      zIndex: 1E3,
      _wmDrawBox: !0,
      _wmBoxColor: "rgba(0, 0, 255, 0.7)",
      size: {
          x: 20,
          y: 20
      },
      init: function(b, c, d) {
          this.parent(b, c, d)
      }
  })
});
ig.baked = !0;
ig.module("game.entities.select").requires("impact.entity").defines(function() {
  EntitySelect = ig.Entity.extend({
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.NEVER,
      canSelect: !1,
      canSelectTimerDuration: 0.35,
      zIndex: 99999,
      isHovering: !1,
      isSelected: !1,
      init: function(b, c, d) {
          this.parent(b, c, d);
          this.canSelectTimer = new ig.Timer(this.canSelectTimerDuration)
      },
      doesClickableLayerExist: function(b) {
          for (k in dynamicClickableEntityDivs)
              if (k == b)
                  return !0;
          return !1
      },
      checkClickableLayer: function(b, c, d) {
          "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]),
          $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
      },
      createClickableOutboundLayer: function(b, c, d, e) {
          var g = ig.$new("div");
          g.id = b;
          document.body.appendChild(g);
          $("#" + g.id).css("float", "left");
          $("#" + g.id).css("width", this.size.x * multiplier);
          $("#" + g.id).css("height", this.size.y * multiplier);
          $("#" + g.id).css("position", "absolute");
          var m = w / 2 - destW / 2
            , x = h / 2 - destH / 2;
          w == mobileWidth ? ($("#" + g.id).css("left", this.pos.x),
          $("#" + g.id).css("top", this.pos.y)) : ($("#" + g.id).css("left", m + this.pos.x * multiplier),
          $("#" + g.id).css("top", x + this.pos.y * multiplier));
          e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
          dynamicClickableEntityDivs[b] = {};
          dynamicClickableEntityDivs[b].width = $("#" + g.id).width();
          dynamicClickableEntityDivs[b].height = $("#" + g.id).height();
          dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
          dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
      },
      hovered: function() {
          this.isHovering = !0;
          this.dehoverOthers()
      },
      dehoverOthers: function() {
          var b = ig.game.getEntitiesByType(EntitySelect);
          for (i = 0; i < b.length; i++)
              b[i] != this && (b[i].isHovering = !1)
      },
      deselectOthers: function() {
          var b = ig.game.getEntitiesByType(EntitySelect);
          for (i = 0; i < b.length; i++)
              b[i] != this && (b[i].isSelected = !1)
      },
      update: function() {
          this.parent();
          this.canSelectTimer && 0 < this.canSelectTimer.delta() && (this.canSelect = !0,
          this.canSelectTimer = null)
      }
  })
});
ig.baked = !0;
ig.module("game.levels.opening").requires("impact.image", "game.entities.opening-kitty").defines(function() {
  LevelOpening = {
      entities: [{
          type: "EntityOpeningKitty",
          x: 520,
          y: 212
      }],
      layer: []
  }
});
ig.baked = !0;
ig.module("game.entities.plain-baby").requires("game.entities.plain").defines(function() {
  EntityPlainBaby = EntityPlain.extend({
      type: ig.Entity.TYPE.B,
      zIndex: 10,
      w: 800,
      sc: 2,
      size: {
          x: 50,
          y: 50
      },
      im: new ig.Image("media/graphics/sprites/baby.png"),
      shadowIm: new ig.Image("media/graphics/sprites/babyshadow.png"),
      speed: {
          x: 50,
          y: 0
      },
      sheetX: 8,
      sheetY: 1,
      vel: {
          x: 0,
          y: -100
      },
      accel: {
          x: 0,
          y: 600
      },
      floorPos: 560,
      floorOffset: 10,
      drawSheetCent: function() {},
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0],
          this.reGen(),
          this.zIndex = 2E3,
          ig.game.sortEntitiesDeferred(),
          this.zIndex = 800,
          this.pickWalkSide(),
          this.main.soundLooper("hehe"))
      },
      reGen: function() {
          this.animSheet = new ig.AnimationSheet(this.im.path,this.im.width / this.sheetX,this.im.height / this.sheetY);
          this.size.x = this.im.width / this.sheetX;
          this.size.y = this.im.height / this.sheetY;
          this.addAnim("idle", 0.1, [0, 1]);
          this.currentAnim = this.anims.idle
      },
      pickWalkSide: function() {
          this.walkEdge = 50 + 100 * Math.random()
      },
      tweenF: function() {},
      update: function() {
          !ig.global.wm && !0 != this.main.gamePaused && (this.parent(),
          !0 == this.walkSides ? 0 < this.vel.x ? this.pos.x > ig.system.width - this.walkEdge && (this.pickWalkSide(),
          this.vel.x = -this.speed.x) : this.pos.x < this.walkEdge + 100 && (this.pickWalkSide(),
          this.vel.x = this.speed.x) : (this.pos.y > this.floorPos - this.floorOffset - 200 && ig.game.sortEntitiesDeferred(),
          this.pos.y > this.floorPos - this.floorOffset && (this.walkSides = !0,
          this.vel.y = 0,
          this.accel.y = 0,
          this.vel.x = 0.5 < 1 * Math.random() ? this.speed.x : -this.speed.x,
          this.pos.y = this.floorPos - this.floorOffset)))
      },
      ready: function() {},
      draw: function() {
          this.parent();
          ig.global.wm || (this.drawer({
              cent: !0,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y - 4,
              pic: this.shadowIm
          }),
          this.parent())
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-tile").requires("game.entities.plain", "game.entities.plain-baby").defines(function() {
  EntityPlainTile = EntityPlain.extend({
      type: ig.Entity.TYPE.B,
      zIndex: 100,
      name: "tile",
      renderer: !1,
      renderFrame: 0,
      tweening: !1,
      hitThunder: !1,
      baby: !1,
      iceDelay: !1,
      drawIce: !1,
      w: 800,
      sc: 2,
      size: {
          x: 50,
          y: 50
      },
      causer: "pop",
      offBounce: !1,
      killDelay: 0,
      delayTime: 0.03,
      eviled: !1,
      evilActive: !1,
      tileHit: {
          x: 0,
          y: 0
      },
      evilCauser: !1,
      dropPopHeight: 420,
      iceBubble: {
          sc: 0,
          alp: 0
      },
      iceFrame: 0,
      iceEndFrame: 48,
      ice: {
          frame: 0,
          frameTime: 0.015
      },
      drawBurst: !1,
      burstFrame: 0,
      burstEndFrame: 48,
      burst: {
          frame: 0,
          frameTime: 0.015
      },
      im: new ig.Image("media/graphics/sprites/bubbles.png"),
      plusIm: new ig.Image("media/graphics/sprites/plus.png"),
      minusIm: new ig.Image("media/graphics/sprites/minus.png"),
      skullIm: new ig.Image("media/graphics/sprites/skull.png"),
      skull: {
          sc: 0,
          alp: 1
      },
      skull2: {
          sc: 0,
          alp: 0
      },
      darkAuraIm: new ig.Image("media/graphics/sprites/darkaura.png"),
      darkAura: {
          sc: 0,
          alp: 0
      },
      score: {
          sc: 0,
          alp: 0,
          gradp1: -10,
          gradp2: -3,
          offY: 0,
          tx: "normal"
      },
      sheetX: 8,
      sheetY: 4,
      angle: 0,
      sc: {
          x: 1,
          y: 1
      },
      oriPos: {
          x: 0,
          y: 0
      },
      tile: {
          x: 0,
          y: 0
      },
      offset: {
          x: 2,
          y: 4
      },
      off: {
          x: 0,
          y: 0
      },
      bouncy: {
          x: 0,
          y: 0
      },
      bubbleKilled: !1,
      linkedColours: [],
      refLinked: [],
      hanging: !0,
      killStuff: !1,
      hangingChecked: !1,
      checkedTiles: [],
      linkTeams: [],
      innerNeighbour: [[-1, 0], [1, 0], [0, -1], [1, -1], [0, 1], [1, 1]],
      sideNeighbour: [[-1, 0], [1, 0], [-1, -1], [0, -1], [-1, 1], [0, 1]],
      scoreChoice: {
          normal: {
              where: 0,
              tx: "10",
              sx: 5,
              sy: 205,
              sw: 50,
              sh: 50
          },
          plus: {
              where: 1,
              tx: "+3",
              sx: 65,
              sy: 205,
              sw: 50,
              sh: 50
          },
          minus: {
              where: 2,
              tx: "-3",
              sx: 125,
              sy: 205,
              sw: 50,
              sh: 50
          }
      },
      score: {
          sc: 0,
          alp: 0,
          gradp1: -10,
          gradp2: -3,
          offY: 0,
          tx: "normal"
      },
      linkedBubbleArray: [],
      killBubble: function() {
          this.tweener("this", {}, this.killDelay, "kill")
      },
      dropAndPopBubble: function() {
          this.main.resetCombo();
          this.bubble.basicArmoUpdate();
          for (var b = 0; b < this.linkTeams.length; b++)
              if (!1 == this.linkTeams[b][1])
                  for (var c = 0; c < this.linkTeams[b][0].length; c++) {
                      var d = this.linkTeams[b][0][c];
                      d.hanging = !1;
                      d.tweening = !0;
                      this.main.scoreVault += 10;
                      this.main.dropAll.total++;
                      d.vel.y = -(50 * Math.random() + 80);
                      d.accel.y = 600;
                      d.accel.x = -150 + 300 * Math.random();
                      d.zIndex = 101;
                      !0 == d.baby && this.main.babyRescued++;
                      this.main.tiles[d.tile.y][d.tile.x] = void 0
                  }
          ig.game.sortEntitiesDeferred();
          b = ig.game.getEntitiesByType(EntityPlainTile);
          for (c = 0; c < b.length; c++)
              !0 == b[c].bubbleKilled && (this.main.doneCombo = !1,
              this.main.scoreVault += 10,
              this.main.popAll.total++,
              b[c].killBubble(),
              !0 == b[c].baby && this.main.babyRescued++);
          if (!0 == this.hitThunder)
              for (c = 0; c < b.length; c++)
                  b[c].tile.y >= this.tile.y && !1 == b[c].bubbleKilled && !0 == b[c].hanging && (console.log("hihihi"),
                  b[c].hanging = !1,
                  b[c].tweening = !0,
                  this.main.scoreVault += 10,
                  this.main.dropAll.total++,
                  b[c].vel.y = -(50 * Math.random() + 80),
                  b[c].accel.y = 600,
                  b[c].accel.x = -150 + 300 * Math.random(),
                  b[c].zIndex = 101,
                  !0 == b[c].baby && this.main.babyRescued++,
                  this.main.tiles[b[c].tile.y][b[c].tile.x] = void 0);
          this.main.showComboText();
          ig.game.redraw = !0
      },
      init: function(b, c, d) {
          if (!ig.global.wm) {
              this.main = ig.game.getEntitiesByType(EntityPlainGame)[0];
              this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0];
              this.parent(b, c, d);
              this.tile.x = d.i;
              this.tile.y = d.j;
              void 0 == this.main.tiles[this.tile.y] && (this.main.tiles[this.tile.y] = []);
              this.main.tiles[this.tile.y][this.tile.x] = this;
              this.aniStuff();
              this.dropPopHeight -= 100 * Math.random();
              if (void 0 != d.bubblePos) {
                  this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0];
                  this.main.scoreVault = 0;
                  this.oriPos.x = d.bubblePos.x - this.stage.topLeft.x;
                  this.oriPos.y = d.bubblePos.y - this.stage.pos.y - this.stage.topGap - this.stage.topLeft.y;
                  this.which = d.which;
                  this.tweenF("snap");
                  this.shooter = ig.game.getEntitiesByType(EntityPlainShooter)[0];
                  this.shooter.drawGuide = !0;
                  ig.game.redraw = !0;
                  b = ig.game.getEntitiesByType(EntityPlainTile);
                  for (c = 0; c < b.length; c++)
                      b[c].offBounce = !0,
                      b[c].tileHit = {
                          x: d.i,
                          y: d.j
                      }
              } else
                  this.readPresetTile();
              this.aniStuff();
              this.pos.x = this.oriPos.x + this.stage.topLeft.x;
              this.pos.y = this.oriPos.y + this.stage.pos.y + this.stage.topLeft.y;
              this.bubbleTypeRegen();
              ig.game.sortEntitiesDeferred();
              this.burst.frames = ig.game.burstRender.frames;
              this.ice.frames = ig.game.iceRender.frames
          }
      },
      handleBubbleCheck: function() {
          this.refLinked.push(this);
          this.linkBubbles(this);
          if (!0 != this.evilActive) {
              for (var b = 0; b < this.linkedBubbleArray.length; b++)
                  for (var c = 0; c < this.linkedBubbleArray[b].length; c++)
                      if (3 <= this.linkedBubbleArray[b].length) {
                          var d = this.linkedBubbleArray[b][c];
                          !0 != d.bubbleKilled && (d.bubbleKilled = !0,
                          d.tweening = !0,
                          d.killDelay = (Math.abs(d.tile.x - this.tile.x) + Math.abs(d.tile.y - this.tile.y)) * this.delayTime,
                          -1 == this.checkedTiles.indexOf(d) && this.checkedTiles.push(d),
                          this.killStuff = !0)
                      }
              !0 == this.bubbleKilled && this.triggerHangingCheck();
              this.dropAndPopBubble()
          }
      },
      openLinkTeam: function(b) {
          this.linkTeams[b] = [];
          this.linkTeams[b][0] = [];
          this.linkTeams[b][1] = !1
      },
      triggerHangingCheck: function() {
          for (var b = ig.game.getEntitiesByType(EntityPlainTile), c = 0; this.checkedTiles.length != b.length && !(10 < c); )
              for (var d = 0; d < b.length; d++)
                  if (-1 == this.checkedTiles.indexOf(b[d])) {
                      this.openLinkTeam(this.linkTeams.length);
                      this.findHangingCluster(b[d], this.linkTeams[this.linkTeams.length - 1]);
                      c++;
                      break
                  }
      },
      findHangingCluster: function(b, c) {
          var d = this.getNeighbour(b.tile);
          d.push(b);
          for (var e = 0; e < d.length; e++)
              -1 == this.checkedTiles.indexOf(d[e]) && (!0 == d[e].bubbleKilled ? this.checkedTiles.push(d[e]) : (0 == d[e].tile.y && (c[1] = !0),
              c[0].push(d[e]),
              this.checkedTiles.push(d[e]),
              this.findHangingCluster(d[e], c)))
      },
      getNeighbour: function(b) {
          for (var c = b.y % 2 == this.main.rowOffset ? this.sideNeighbour : this.innerNeighbour, d = [], e = 0; e < c.length; e++) {
              var g = b.x + c[e][0]
                , m = b.y + c[e][1];
              void 0 != this.main.tiles[m] && void 0 != this.main.tiles[m][g] && d.push(this.main.tiles[m][g])
          }
          return d
      },
      iceStuff: function() {
          if (!0 == this.hanging && "pop" == this.causer)
              for (var b = this.getNeighbour(this.tile), c = 0; c < b.length; c++)
                  "ice" == b[c].refType && (b[c].frame = this.getFrame("ice"),
                  b[c].which = !0 == b[c].baby ? "baby" + this.refColour : this.refColour,
                  b[c].refType = "normal",
                  b[c].tweenF("ice"))
      },
      readPresetTile: function() {
          this.oriPos.x = this.tile.y % 2 == this.main.rowOffset ? this.tile.x * this.size.x : this.tile.x * this.size.x + this.size.x / 2;
          this.oriPos.y = this.tile.y * this.size.y;
          var b = this.main.map[this.tile.y][this.tile.x];
          "r" == b && (b = 0.05 > 1 * Math.random() ? this.main.choice[Math.floor(Math.random() * this.main.choice.length)] : 0.2 > 1 * Math.random() ? this.main.choice[Math.floor(Math.random() * (this.main.choice.length - 2))] : this.main.choice[Math.floor(4 * Math.random())]);
          "string" == typeof b ? (-1 < b.indexOf("baby") && (this.baby = !0,
          this.main.totalBaby++),
          this.which = -1 < b.indexOf("baby") && -1 == b.indexOf("ice") ? "baby" + this.main.colourSet[Number(b.replace("baby", ""))] : -1 < b.indexOf("minus") ? "minus" + this.main.colourSet[Number(b.replace("minus", ""))] : -1 < b.indexOf("plus") ? "plus" + this.main.colourSet[Number(b.replace("plus", ""))] : b) : this.which = this.main.colourSet[b]
      },
      bubbleTypeRegen: function() {
          -1 < this.which.indexOf("baby") ? ("babyice" == this.which ? (this.refType = "ice",
          this.refColour = "none") : (this.refType = "baby",
          this.refColour = this.which.replace("baby", "")),
          this.frame = this.getFrame(this.which)) : -1 < this.which.indexOf("plus") ? (this.refType = "plus",
          this.refColour = this.which.replace("plus", ""),
          this.frame = this.getFrame(this.refColour)) : -1 < this.which.indexOf("minus") ? (this.refType = "minus",
          this.refColour = this.which.replace("minus", ""),
          this.frame = this.getFrame(this.refColour)) : (-1 < this.main.bubbleColours.indexOf(this.which) ? (this.refType = "normal",
          this.refColour = this.which) : (this.refType = this.which,
          this.refColour = "none"),
          this.frame = this.getFrame(this.which))
      },
      aniStuff: function() {
          this.size.x = (this.im.width / this.sheetX - 4) * this.sc.x;
          this.size.y = (this.im.height / this.sheetY - 8) * this.sc.y;
          this.animList = [["red", 0], ["orange", 1], ["yellow", 2], ["green", 3], ["cyan", 4], ["blue", 5], ["purple", 6], ["pink", 7], ["super", 19], ["babyred", 8], ["babyorange", 9], ["babyyellow", 10], ["babygreen", 11], ["babycyan", 12], ["babyblue", 13], ["babypurple", 14], ["babypink", 15], ["ice", 16], ["grey", 17], ["babyice", 18], ["rainbow", 19], ["thunder", 20], ["star", 21], ["time", 22], ["bomb", 23], ["steel", 26], ["evil", 25], ["wood", 26], ["guide", 27], ["change", 28], ["pick", 29], ["search", 30], ["armo", 31]]
      },
      getFrame: function(b) {
          return this.animList[this.animIndex(b)][1]
      },
      animIndex: function(b) {
          for (var c = 0; c < this.animList.length; c++)
              if (-1 < this.animList[c].indexOf(b))
                  return c
      },
      powerBubbleCheck: function(b, c) {
          if (void 0 != this.main.tiles[b.y] && this.main.tiles[b.y][b.x])
              switch (this.main.tiles[b.y][b.x].which) {
              case "evil":
                  this.sounder("evil");
                  this.main.tiles[b.y][b.x].evilCauser = !0;
                  this.main.tiles[b.y][b.x].zIndex += 1;
                  ig.game.sortEntitiesDeferred();
                  this.main.tiles[b.y][b.x].tweenF("skullExpand");
                  for (var d = ig.game.getEntitiesByType(EntityPlainTile), e = 0; e < d.length; e++)
                      d[e].killDelay = 0.05 * (Math.abs(d[e].tile.x - this.tile.x) + Math.abs(d[e].tile.y - this.tile.y)),
                      d[e].tweenF("evil");
                  this.tweening = this.evilActive = !0;
                  break;
              case "thunder":
                  for (e = 0; e < this.main.tiles[b.y].length; e++)
                      void 0 != this.main.tiles[b.y] && void 0 != this.main.tiles[b.y][e] && (this.main.tiles[b.y][e].causer = "thunder",
                      this.main.tiles[b.y][e].bubbleKilled = !0,
                      this.main.tiles[b.y][e].tweening = !0,
                      this.main.tiles[b.y][e].killDelay = Math.abs(e - b.x) * this.delayTime);
                  this.main.tiles[c.y][c.x].bubbleKilled = !0;
                  this.main.tiles[c.y][c.x].tweening = !0;
                  this.main.tiles[b.y][b.x].killDelay = (Math.abs(this.main.tiles[b.y][b.x].tile.x - this.tile.x) + Math.abs(this.main.tiles[b.y][b.x].tile.y - this.tile.y)) * this.delayTime;
                  this.tweening = this.hitThunder = !0;
                  break;
              case "star":
                  d = ig.game.getEntitiesByType(EntityPlainTile);
                  for (e = 0; e < d.length; e++)
                      d[e].refColour == this.refColour && (-1 == this.checkedTiles.indexOf(d[e]) && this.checkedTiles.push(d[e]),
                      d[e].causer = "star",
                      d[e].bubbleKilled = !0,
                      d[e].tweening = !0,
                      d[e].killDelay = (Math.abs(d[e].tile.x - this.tile.x) + Math.abs(d[e].tile.y - this.tile.y)) * this.delayTime);
                  -1 == this.checkedTiles.indexOf(this.main.tiles[b.y][b.x]) && this.checkedTiles.push(this.main.tiles[b.y][b.x]);
                  this.main.tiles[b.y][b.x].bubbleKilled = !0;
                  this.main.tiles[b.y][b.x].tweening = !0;
                  this.main.tiles[b.y][b.x].killDelay = (Math.abs(this.main.tiles[b.y][b.x].tile.x - this.tile.x) + Math.abs(this.main.tiles[b.y][b.x].tile.y - this.tile.y)) * this.delayTime;
                  this.tweening = !0
              }
      },
      slotBubbles: function(b) {
          -1 == this.refLinked.indexOf(b) && this.refLinked.push(b)
      },
      slotLinkedBubble: function(b, c) {
          this.slotBubbles(c);
          for (var d = 0; d < this.linkedBubbleArray.length; d++)
              "super" == c.refColour ? 0 == this.linkedBubbleArray[d].length ? this.linkedBubbleArray[d].push(c) : -1 < this.linkedBubbleArray[d].indexOf(b) && this.linkedBubbleArray[d].push(c) : -1 < this.linkedBubbleArray[d].indexOf(b) && this.linkedColours[d] == c.refColour && this.linkedBubbleArray[d].push(c)
      },
      slotBubbleCheck: function(b, c) {
          -1 == this.refLinked.indexOf(c) && (this.slotLinkedBubble(b, c),
          this.linkBubbles(c))
      },
      initiateColourTeam: function(b) {
          for (var c = 0; c < this.main.bubbleColours.length - 1; c++)
              this.linkedColours.push(this.main.bubbleColours[c]),
              this.linkedBubbleArray[this.linkedBubbleArray.length] = [];
          this.slotBubbles(b);
          if ("super" == b.refColour)
              for (c = 0; c < this.linkedBubbleArray.length; c++)
                  this.linkedBubbleArray[c].push(b);
          else
              for (c = 0; c < this.linkedBubbleArray.length; c++)
                  this.linkedColours[c] == b.refColour && this.linkedBubbleArray[c].push(b)
      },
      linkBubbles: function(b) {
          var c = this.getNeighbour(b.tile);
          b == this && this.initiateColourTeam(b);
          for (var d = 0; d < c.length; d++)
              b == this && this.powerBubbleCheck(c[d].tile, b.tile),
              c[d].refColour == b.refColour && "super" != b.refColour ? this.slotBubbleCheck(b, c[d]) : ("super" == b.refColour || "super" == c[d].refColour) && this.slotBubbleCheck(b, c[d])
      },
      tileCheck: function(b, c) {
          return void 0 != this.main.tiles[c] ? void 0 != this.main.tiles[c][b] ? !0 : !1 : !1
      },
      plusStuff: function(b) {
          switch (b) {
          case "changeScoreText":
              "plus" == this.refType && !0 == this.hanging && (this.bubble.plusVault += 3,
              this.score.tx = "plus")
          }
      },
      minusStuff: function(b) {
          switch (b) {
          case "changeScoreText":
              "minus" == this.refType && !0 == this.hanging && (this.bubble.minusVault += 3,
              this.score.tx = "minus")
          }
      },
      tweenF: function(b) {
          switch (b) {
          case "auraExpand":
              this.darkAura.sc = 0;
              this.darkAura.alp = 1;
              this.tweener("darkAura", {
                  sc: 0.8
              }, 1.8, "auraExpand");
              this.tweener("darkAura", {
                  alp: 0
              }, 1.3, "none", 0.5);
              break;
          case "skullExpand":
              this.skull.alp = 0.75;
              this.tweener("skull", {
                  sc: 2.5
              }, 0.8);
              this.tweener("skull", {
                  alp: 0
              }, 0.4, "skullFade", 0.2);
              this.tweener("this", {}, 0.2, "skull2Expand");
              break;
          case "skull2Expand":
              this.skull2.alp = 1;
              this.tweener("skull2", {
                  sc: 1.5
              }, 2);
              this.tweener("skull2", {
                  alp: 0
              }, 0.3, "none", 0.3);
              break;
          case "evil":
              this.tweener("this", {}, this.killDelay, "evil2");
              break;
          case "evil2":
              this.eviled = !0;
              this.tweener("this", {}, 1, "evilGameOver");
              break;
          case "evilGameOver":
              this.main.loseGame();
              break;
          case "bounceBack":
              this.tweener("bouncy", {
                  x: 0,
                  y: 0
              }, 0.03);
              break;
          case "snap":
              this.tweening = !0;
              this.tweener("oriPos", {
                  x: this.tile.y % 2 == this.main.rowOffset ? this.tile.x * this.size.x : this.tile.x * this.size.x + this.size.x / 2,
                  y: this.tile.y * this.size.y
              }, 0.08, "snap2");
              break;
          case "snap2":
              this.tweening = !1;
              ig.game.redraw = !0;
              this.handleBubbleCheck();
              break;
          case "ice":
              this.drawIce = this.tweening = !0;
              this.tweener("iceBubble", {
                  sc: 1.2,
                  alp: 1
              }, 0.2, "ice3", 0.3);
              break;
          case "ice3":
              this.tweener("iceBubble", {
                  sc: 1
              }, 0.1, "convertColour");
              ig.game.redraw = !0;
              this.bubbleTypeRegen();
              break;
          case "convertColour":
              this.drawIce = !1;
              this.iceDelay = !0;
              break;
          case "babyTall":
              this.tweener("sc", {
                  x: 0.99,
                  y: 1.01
              }, 1, "babyFat");
              break;
          case "babyFat":
              this.tweener("sc", {
                  x: 1.01,
                  y: 0.99
              }, 1, "babyTall");
              break;
          case "kill":
              if (!0 == this.eviled)
                  break;
              this.drawBurst = !0;
              this.main.soundLooper("bubble");
              this.main.tiles[this.tile.y][this.tile.x] = void 0;
              this.zIndex += 10;
              ig.game.sortEntitiesDeferred();
              this.vel.x = 0;
              this.vel.y = -30;
              this.accel.x = 0;
              this.accel.y = 0;
              !0 == this.baby && ig.game.spawnEntity(EntityPlainBaby, this.pos.x, this.pos.y, {
                  main: this.main
              });
              this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0];
              this.minusStuff("changeScoreText");
              this.plusStuff("changeScoreText");
              this.iceStuff();
              this.tweener("score", {
                  sc: 1.3,
                  alp: 1
              }, 0.1, "scoreFadeOut");
              break;
          case "scoreFadeOut":
              this.tweener("score", {
                  alp: 0
              }, 0.1, "killTile", 0.2);
              this.tweener("score", {
                  offY: -20
              }, 1);
              break;
          case "killTile":
              !0 == this.hanging ? this.main.popAll.killed++ : this.main.dropAll.killed++,
              this.kill()
          }
      },
      update: function() {
          if (!ig.global.wm && (!1 == this.hanging && (this.tweening = !0),
          !0 != this.main.gamePaused && (!0 == this.iceDelay && !0 == ig.game.redraw && (this.iceDelay = !1,
          !0 == this.hanging && (this.tweening = !1)),
          this.parent(),
          void 0 != this.stage))) {
              if (!0 == this.hanging || !0 == this.bubbleKilled)
                  this.pos.x = this.oriPos.x + this.stage.topLeft.x,
                  this.pos.y = this.oriPos.y + this.stage.pos.y + this.stage.topGap + this.stage.topLeft.y,
                  !0 == this.offBounce && (this.offBounce = !1,
                  this.tweenF("collideOffset"));
              !1 == this.hanging && (this.pos.x + this.size.x > ig.system.width - 10 ? this.pos.x = ig.system.width - this.size.x - 10 : 10 > this.pos.x && (this.pos.x = 10),
              this.pos.y > this.dropPopHeight && !1 == this.drawBurst && this.tweenF("kill"))
          }
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          "evil" == this.which && (this.tweenF("auraExpand"),
          this.zIndex += 1,
          ig.game.sortEntitiesDeferred());
          !0 == this.baby && this.tweenF("babyFat");
          "plus" == this.refType && (this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0],
          this.bubble.armoExtra += 3)
      },
      changeBubble: function() {
          this.which = "super";
          this.frame = this.getFrame(this.which)
      },
      drawSheets: function(b) {
          this[b].update()
      },
      drawEvilStuff: function() {
          !1 == this.eviled && ("evil" == this.which && !0 == this.hanging && !1 == this.drawBurst) && this.drawer({
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              pic: this.darkAuraIm,
              scX: this.sc.x * this.darkAura.sc,
              scY: this.sc.y * this.darkAura.sc,
              cent: !0,
              alp: this.darkAura.alp
          });
          !0 == this.eviled && !1 == this.evilCauser ? this.drawer({
              pic: this.im,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              frame: this.getFrame("grey"),
              frameX: this.sheetX,
              frameY: this.sheetY,
              scX: this.sc.x,
              scY: this.sc.y,
              cent: !0
          }) : !0 == this.evilCauser && (this.drawer({
              pic: this.im,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              frame: this.frame,
              frameX: this.sheetX,
              frameY: this.sheetY,
              scX: this.sc.x,
              scY: this.sc.y,
              cent: !0
          }),
          this.drawer({
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              pic: this.skullIm,
              scX: this.sc.x * this.skull.sc,
              scY: this.sc.y * this.skull.sc,
              cent: !0,
              alp: this.skull.alp
          }),
          this.drawer({
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              pic: this.skullIm,
              scX: this.sc.x * this.skull2.sc,
              scY: this.sc.y * this.skull2.sc,
              cent: !0,
              alp: this.skull2.alp
          }))
      },
      drawBurstStuff: function() {
          this.burst.frame < this.burstEndFrame && void 0 != ig.game.burstRender.frames[this.burst.frame] && this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2 + this.score.offY,
              sx: ig.game.burstRender.frames[Math.floor(this.burst.frame)].sx,
              sy: ig.game.burstRender.frames[Math.floor(this.burst.frame)].sy + 200 * this.scoreChoice[this.score.tx].where,
              sw: 60,
              sh: 60,
              cent: !0
          });
          !1 == this.main.gamePaused && (this.burstFrame += 1 * ig.system.tick,
          this.runAnim("burst"))
      },
      drawIceStuff: function(b) {
          !0 == this.drawIce && (this.ctxDrawer({
              ctx: b,
              x: this.pos.x + this.size.x / 2 + this.off.x,
              y: this.pos.y + this.size.y / 2 + this.off.y,
              pic: ig.game.hidEle,
              cent: !0,
              sx: ig.game.iceRender.frames[this.ice.frame].sx,
              sy: ig.game.iceRender.frames[this.ice.frame].sy,
              sw: 60,
              sh: 60
          }),
          !1 == this.iceDelay && this.drawer({
              ctx: b,
              pic: this.im,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              frame: this.getFrame(this.which),
              frameX: this.sheetX,
              frameY: this.sheetY,
              scX: this.iceBubble.sc,
              scY: this.iceBubble.sc,
              alp: this.iceBubble.alp,
              cent: !0
          }),
          !1 == this.main.gamePaused && this.runAnim("ice"))
      },
      drawPlusStuff: function(b) {
          "plus" == this.refType && this.drawer({
              ctx: b,
              pic: this.plusIm,
              x: this.pos.x + this.size.x / 2 + this.bouncy.x,
              y: this.pos.y + this.size.y / 2 + this.bouncy.y,
              cent: !0,
              alp: 0.8,
              scX: 0.8,
              scY: 0.8
          })
      },
      drawMinusStuff: function(b) {
          "minus" == this.refType && this.drawer({
              ctx: b,
              pic: this.minusIm,
              x: this.pos.x + this.size.x / 2 + this.bouncy.x,
              y: this.pos.y + this.size.y / 2 + this.bouncy.y,
              cent: !0,
              alp: 0.7,
              scX: 0.8,
              scY: 0.8
          })
      },
      draw: function() {
          0 > this.pos.y || (this.drawEvilStuff(),
          !0 != this.eviled && (!0 == this.drawBurst ? this.drawBurstStuff() : !1 == this.tweening ? "evil" == this.which ? this.drawer({
              pic: this.im,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              frame: this.frame,
              frameX: this.sheetX,
              frameY: this.sheetY,
              scX: this.sc.x,
              scY: this.sc.y,
              cent: !0
          }) : !0 == ig.game.redraw && (!1 == this.drawIce && this.drawer({
              ctx: ig.game.bgCtx,
              pic: this.im,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              frame: this.frame,
              frameX: this.sheetX,
              frameY: this.sheetY,
              scX: this.sc.x,
              scY: this.sc.y,
              cent: !0
          }),
          this.drawMinusStuff(ig.game.bgCtx),
          this.drawPlusStuff(ig.game.bgCtx),
          this.drawIceStuff(ig.game.bgCtx)) : (!1 == this.drawIce && this.drawer({
              pic: this.im,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              frame: this.frame,
              frameX: this.sheetX,
              frameY: this.sheetY,
              scX: this.sc.x,
              scY: this.sc.y,
              cent: !0
          }),
          this.drawMinusStuff(this.ctx),
          this.drawPlusStuff(this.ctx),
          this.drawIceStuff(this.ctx))))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-gui").requires("game.entities.plain").defines(function() {
  EntityPlainGui = EntityPlain.extend({
      type: ig.Entity.TYPE.B,
      zIndex: 2010,
      comboTextSize: 18,
      w: 800,
      sc: 2,
      size: {
          x: 50,
          y: 50
      },
      gameOver: !1,
      gamePaused: !1,
      foregroundIm: new ig.Image("media/graphics/sprites/top-wall.png"),
      bottomIm: new ig.Image("media/graphics/sprites/bottom-wall.png"),
      armoIm: new ig.Image("media/graphics/sprites/armo.png"),
      gradIm: new ig.Image("media/graphics/sprites/grad.png"),
      startOffset: 0,
      score: {
          x: 100,
          y: 20,
          gradp1: -10,
          gradp2: 2
      },
      bubbleArmo: 0,
      plus: {
          offY: 0,
          alp: 0,
          sc: 1,
          gradp1: -10,
          gradp2: 0
      },
      minus: {
          offY: 0,
          alp: 0,
          sc: 1,
          gradp1: -10,
          gradp2: 0
      },
      armoCombo: {
          x: 350,
          y: 538,
          alp: 0,
          sc: 0,
          offY: 20
      },
      popCombo: {
          x: 350,
          y: 538,
          alp: 0,
          sc: 0,
          offY: 20
      },
      dropCombo: {
          x: 350,
          y: 538,
          alp: 0,
          sc: 0,
          offY: 20
      },
      starbarIm: new ig.Image("media/graphics/sprites/star-bar.png"),
      starbaseIm: new ig.Image("media/graphics/sprites/star-base.png"),
      star0Im: new ig.Image("media/graphics/sprites/star_01.png"),
      star1Im: new ig.Image("media/graphics/sprites/star_02.png"),
      star2Im: new ig.Image("media/graphics/sprites/star_03.png"),
      scoreIm: new ig.Image("media/graphics/sprites/score.png"),
      lvlIm: new ig.Image("media/graphics/sprites/level.png"),
      starBar: {
          x: 3,
          y: 18,
          percent: 1,
          star1: 0,
          star2: 0,
          star3: 0
      },
      oneBar: 1 / 3,
      drawSheetCent: function() {},
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.reGen(),
          this.score.grad = this.ctx.createLinearGradient(0, this.score.gradp1, 0, this.score.gradp2),
          this.score.grad.addColorStop(0, "#fffcea"),
          this.score.grad.addColorStop(0.8, "#ffd977"),
          this.score.grad.addColorStop(1, "#a85a15"),
          this.score.grad2 = this.ctx.createLinearGradient(0, this.score.gradp1, 0, this.score.gradp2 + 5),
          this.score.grad2.addColorStop(0, "#fffcea"),
          this.score.grad2.addColorStop(0.8, "#ffd977"),
          this.score.grad2.addColorStop(1, "#a85a15"),
          this.plus.grad = this.ctx.createLinearGradient(0, this.plus.gradp1, 0, this.plus.gradp2 + 10),
          this.plus.grad.addColorStop(0, "#e6e438"),
          this.plus.grad.addColorStop(0.3, "#c2d73a"),
          this.plus.grad.addColorStop(1, "#6d8225"),
          this.plus.strokeCol = "#56612f",
          this.minus.grad = this.ctx.createLinearGradient(0, this.plus.gradp1, 0, this.plus.gradp2 + 10),
          this.minus.grad.addColorStop(0, "#ff9c00"),
          this.minus.grad.addColorStop(1, "#e80000"),
          this.minus.strokeCol = "#8b2929",
          this.renderScore(),
          this.renderLevel(),
          this.renderPopCombo(),
          this.renderDropCombo(),
          this.renderArmoCombo())
      },
      reGen: function() {},
      tweenF: function(b) {
          switch (b) {
          case "pauseFadeIn":
              this.tweener("pauseRect", {
                  alp: this.pauseRect.targAlp
              }, 0.3);
              break;
          case "armoPlusUpdate":
              this.bubble.plusMinusArmo();
              0 < this.bubble.plusVault ? (this.plus.offY = -10,
              this.renderPlus(),
              this.tweener("plus", {
                  alp: 1
              }, 0.1, "armoPlusUpdate2")) : 0 < this.bubble.minusVault && this.tweenF("armoPlusUpdate3");
              break;
          case "armoPlusUpdate2":
              this.tweener("plus", {
                  alp: 0,
                  offY: 10
              }, 0.1, "armoPlusUpdate3", 0.1);
              break;
          case "armoPlusUpdate3":
              0 == this.bubble.minusVault ? this.tweenF("armoPlusUpdate5") : (this.renderMinus(),
              this.minus.offY = -10,
              this.tweener("minus", {
                  alp: 1
              }, 0.1, "armoPlusUpdate4"));
              break;
          case "armoPlusUpdate4":
              this.tweener("minus", {
                  alp: 0,
                  offY: 10
              }, 0.1, "armoPlusUpdate5", 0.1);
              break;
          case "armoPlusUpdate5":
              this.bubble.plusMinusArmoUpdate();
              break;
          case "armoCombo":
              0 < this.main.armoCombo && (this.armoCombo.offY = 10,
              this.renderArmoCombo(),
              this.tweener("armoCombo", {
                  sc: 1,
                  alp: 1,
                  offY: 0
              }, 0.1));
              break;
          case "armoCombo2":
              this.tweener("armoCombo", {
                  offY: -1,
                  alp: 0
              }, 0.1);
              break;
          case "popCombo":
              0 < this.main.popAll.combo ? (this.popCombo.offY = 10,
              this.renderPopCombo(),
              this.tweener("popCombo", {
                  sc: 1,
                  alp: 1,
                  offY: 0
              }, 0.1, "popCombo2")) : this.main.doneCombo = !0;
              break;
          case "popCombo2":
              this.tweener("popCombo", {
                  offY: -1,
                  alp: 0
              }, 0.1, "dropCombo", 0.6);
              break;
          case "dropCombo":
              0 < this.main.dropAll.combo ? (this.dropCombo.offY = 10,
              this.renderDropCombo(),
              this.tweener("dropCombo", {
                  sc: 1,
                  alp: 1,
                  offY: 0
              }, 0.1, "dropCombo2")) : this.main.doneCombo = !0;
              break;
          case "dropCombo2":
              this.tweener("dropCombo", {
                  offY: -10,
                  alp: 0
              }, 0.1, "doneCombo", 0.6);
              break;
          case "endDropCombo":
              0 < this.main.dropAll.combo ? (this.dropCombo.offY = 10,
              this.renderDropCombo(),
              this.tweener("dropCombo", {
                  sc: 1,
                  alp: 1,
                  offY: 0
              }, 0.1)) : this.main.doneCombo = !0;
              break;
          case "endDropCombo2":
              this.tweener("dropCombo", {
                  offY: -10,
                  alp: 0
              }, 0.1);
              break;
          case "doneCombo":
              this.main.doneCombo = !0
          }
      },
      update: function() {
          if (!ig.global.wm) {
              this.parent();
              this.bubbleArmo = this.bubble.armoVault.length - this.bubble.armoIndex - this.bubble.armoExtra + this.bubble.armoPlus - this.bubble.armoMinus;
              var b = this.main.starScore
                , c = this.main.score;
              c >= b[0] ? (this.starBar.star1 = this.oneBar,
              this.main.star = 0,
              c >= b[1] ? (this.starBar.star2 = this.oneBar,
              this.main.star = 1,
              c >= b[2] ? (this.starBar.star3 = this.oneBar,
              this.main.star = 2) : this.starBar.star3 = (c - b[1]) / (b[2] - b[1]) * this.oneBar) : this.starBar.star2 = (c - b[0]) / (b[1] - b[0]) * this.oneBar) : this.starBar.star1 = c / b[0] * this.oneBar;
              this.starBar.percent = this.starBar.star1 + this.starBar.star2 + this.starBar.star3
          }
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0];
          this.startOffset = Math.abs(this.stage.startOffset);
          this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0];
          this.over = ig.game.getEntitiesByType(EntityPlainOver)[0];
          this.renderPlus();
          this.renderMinus()
      },
      renderArmoCombo: function() {
          ig.game.hidCtx.clearRect(880, 140, 200, 100);
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 40,
              tx: this.main.armoCombo,
              x: 980,
              y: 177,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: "#92551c"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 40,
              tx: this.main.armoCombo,
              x: 980,
              y: 175,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: this.score.grad2
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.comboTextSize,
              tx: _STRINGS.Game.ArmoCombo,
              x: 980,
              y: 212,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: "#92551c"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.comboTextSize,
              tx: _STRINGS.Game.ArmoCombo,
              x: 980,
              y: 210,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: this.score.grad2
          })
      },
      renderPopCombo: function() {
          ig.game.hidCtx.clearRect(480, 140, 200, 100);
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 40,
              tx: this.main.popAll.combo,
              x: 580,
              y: 177,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: "#92551c"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 40,
              tx: this.main.popAll.combo,
              x: 580,
              y: 175,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: this.score.grad2
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.comboTextSize,
              tx: _STRINGS.Game.PopCombo,
              x: 580,
              y: 212,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: "#92551c"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.comboTextSize,
              tx: _STRINGS.Game.PopCombo,
              x: 580,
              y: 210,
              stroke: !0,
              strokeLine: 5,
              strokeColour: "#92551c",
              col: this.score.grad2
          })
      },
      renderDropCombo: function() {
          ig.game.hidCtx.clearRect(680, 140, 200, 100);
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 40,
              strokeLine: 2,
              tx: this.main.dropAll.combo,
              x: 780,
              y: 177,
              strokeLine: 5,
              stroke: !0,
              strokeColour: "#92551c",
              col: "#92551c"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 40,
              tx: this.main.dropAll.combo,
              x: 780,
              y: 175,
              strokeLine: 5,
              stroke: !0,
              strokeColour: "#92551c",
              col: this.score.grad2
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.comboTextSize,
              tx: _STRINGS.Game.DropCombo,
              x: 780,
              y: 212,
              strokeLine: 5,
              stroke: !0,
              strokeColour: "#92551c",
              col: "#92551c"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.comboTextSize,
              tx: _STRINGS.Game.DropCombo,
              x: 780,
              y: 210,
              strokeLine: 5,
              stroke: !0,
              strokeColour: "#92551c",
              col: this.score.grad2
          })
      },
      renderLevel: function() {
          ig.game.hidCtx.clearRect(680, 100, 200, 40);
          this.drawer({
              ctx: ig.game.hidCtx,
              pic: this.lvlIm,
              x: 780,
              y: 122,
              cent: !0
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: _STRINGS.Game.level,
              x: 746,
              y: 120,
              stroke: !0,
              strokeColour: "#92551c",
              col: "#92551c",
              align: "left"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: _STRINGS.Game.level,
              x: 746,
              y: 119,
              stroke: !0,
              strokeColour: "#92551c",
              col: this.score.grad,
              align: "left"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: ig.game.lvl + 1,
              x: 808,
              y: 120,
              stroke: !0,
              strokeColour: "#92551c",
              col: "#92551c",
              align: "center"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: ig.game.lvl + 1,
              x: 808,
              y: 119,
              stroke: !0,
              strokeColour: "#92551c",
              col: this.score.grad,
              align: "center"
          })
      },
      renderScore: function() {
          ig.game.hidCtx.clearRect(480, 100, 200, 40);
          this.drawer({
              ctx: ig.game.hidCtx,
              pic: this.scoreIm,
              x: 580,
              y: 122,
              cent: !0
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: _STRINGS.Game.score,
              x: 530,
              y: 120,
              stroke: !0,
              strokeColour: "#92551c",
              col: "#92551c",
              align: "left"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: _STRINGS.Game.score,
              x: 530,
              y: 119,
              stroke: !0,
              strokeColour: "#92551c",
              col: this.score.grad,
              align: "left"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: Math.floor(this.main.score),
              x: 608,
              y: 120,
              stroke: !0,
              strokeColour: "#92551c",
              col: "#92551c",
              align: "center"
          });
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 14,
              tx: Math.floor(this.main.score),
              x: 608,
              y: 119,
              stroke: !0,
              strokeColour: "#92551c",
              col: this.score.grad,
              align: "center"
          })
      },
      drawPopCombo: function() {
          0 < this.popCombo.alp && this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.popCombo.x,
              y: this.popCombo.y + this.popCombo.offY,
              sx: 480,
              sy: 140,
              sw: 200,
              sh: 100,
              scX: 0.8 * this.popCombo.sc,
              scY: 0.8 * this.popCombo.sc,
              alp: this.popCombo.alp,
              cent: !0
          })
      },
      drawDropCombo: function() {
          0 < this.dropCombo.alp && this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.dropCombo.x,
              y: this.dropCombo.y + this.dropCombo.offY,
              sx: 680,
              sy: 140,
              sw: 200,
              sh: 100,
              scX: 0.8 * this.dropCombo.sc,
              scY: 0.8 * this.dropCombo.sc,
              alp: this.dropCombo.alp,
              cent: !0
          })
      },
      drawArmoCombo: function() {
          0 < this.armoCombo.alp && this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.armoCombo.x,
              y: this.armoCombo.y + this.armoCombo.offY,
              sx: 880,
              sy: 140,
              sw: 200,
              sh: 100,
              scX: 0.8 * this.armoCombo.sc,
              scY: 0.8 * this.armoCombo.sc,
              alp: this.armoCombo.alp,
              cent: !0
          })
      },
      renderPlus: function() {
          ig.game.hidCtx.clearRect(880, 50, 100, 40);
          this.textDraw({
              tx: "+" + this.bubble.plusVault,
              x: 930,
              y: 70,
              px: 19,
              col: "white",
              strokeLine: 4,
              stroke: !0,
              strokeColour: this.plus.strokeCol,
              col: this.plus.grad,
              ctx: ig.game.hidCtx
          })
      },
      renderMinus: function() {
          ig.game.hidCtx.clearRect(980, 50, 100, 40);
          this.textDraw({
              tx: "-" + this.bubble.minusVault,
              x: 1030,
              y: 70,
              px: 19,
              col: "white",
              strokeLine: 4,
              stroke: !0,
              strokeColour: this.minus.strokeCol,
              col: this.minus.grad,
              ctx: ig.game.hidCtx
          })
      },
      drawPlus: function() {
          0 != this.plus.alp && this.ctxDrawer({
              pic: ig.game.hidEle,
              x: 50,
              y: ig.system.height - this.armoIm.height + this.plus.offY + 5,
              px: 19,
              col: "white",
              alp: this.plus.alp,
              scX: this.plus.sc,
              scY: this.plus.sc,
              sx: 880,
              sy: 50,
              sw: 100,
              sh: 40,
              cent: !0
          })
      },
      drawMinus: function() {
          0 != this.minus.alp && this.ctxDrawer({
              pic: ig.game.hidEle,
              x: 50,
              y: ig.system.height - this.armoIm.height + this.minus.offY + 5,
              px: 19,
              col: "white",
              alp: this.minus.alp,
              scX: this.minus.sc,
              scY: this.minus.sc,
              sx: 980,
              sy: 50,
              sw: 100,
              sh: 40,
              cent: !0
          })
      },
      renderCount: function() {
          ig.game.hidCtx.clearRect(300, 1100, 400, 100);
          this.textDraw({
              tx: 0 > this.main.countDown ? 0 : Math.floor(this.main.countDown),
              x: 500,
              y: 1150,
              px: 80,
              col: "white",
              ctx: ig.game.hidCtx
          });
          ig.game.hidCtx.globalCompositeOperation = "source-atop";
          ig.game.hidCtx.drawImage(this.gradIm.data, 300, 1100, 400, 100);
          ig.game.hidCtx.globalCompositeOperation = "source-over"
      },
      draw: function() {
          this.parent();
          !ig.global.wm && void 0 != this.stage && (this.foregroundIm.draw(0, 0),
          this.starbaseIm.draw(this.starBar.x, this.starBar.y),
          0 < this.starBar.percent && this.ctx.drawImage(this.starbarIm.data, 0, this.starbarIm.height * (1 - this.starBar.percent), this.starbarIm.width, this.starbarIm.height * this.starBar.percent, this.starBar.x + 1, this.starBar.y + this.starbarIm.height * (1 - this.starBar.percent), this.starbarIm.width, this.starbarIm.height * this.starBar.percent),
          this.ctx.globalAlpha = this.starBar.star3 == this.oneBar ? 1 : 0.8,
          this.star2Im.draw(this.starBar.x - 5, this.starBar.y - 10),
          this.ctx.globalAlpha = this.starBar.star2 == this.oneBar ? 1 : 0.8,
          this.star1Im.draw(this.starBar.x, this.starBar.y + 28),
          this.ctx.globalAlpha = this.starBar.star1 == this.oneBar ? 1 : 0.8,
          this.star0Im.draw(this.starBar.x + 5, this.starBar.y + 58),
          this.ctx.globalAlpha = 1,
          this.drawPopCombo(),
          this.drawDropCombo(),
          this.drawArmoCombo(),
          this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.score.x,
              y: this.score.y + 5,
              sx: 480,
              sy: 100,
              sw: 200,
              sh: 40,
              cent: !0
          }),
          this.ctxDrawer({
              pic: ig.game.hidEle,
              x: 370,
              y: this.score.y + 5,
              sx: 680,
              sy: 100,
              sw: 200,
              sh: 40,
              cent: !0
          }),
          !1 == this.stage.startTween ? (this.bottomIm.draw(0, ig.system.height - this.bottomIm.height),
          this.armoIm.draw(0, ig.system.height - this.armoIm.height),
          !0 == this.main.gameOver ? this.textDraw({
              px: 28,
              col: "white",
              tx: 0 > this.main.countDown ? 0 : Math.floor(this.main.countDown),
              x: 50,
              y: ig.system.height - this.armoIm.height + 25,
              rot: -16,
              scX: this.main.scoreSc,
              scY: this.main.scoreSc
          }) : this.textDraw({
              px: 28,
              col: "white",
              tx: 0 > this.bubble.armoLeft ? 0 : this.bubble.armoLeft,
              x: 50,
              y: ig.system.height - this.armoIm.height + 25,
              rot: -16
          })) : (this.bottomIm.draw(0, ig.system.height - this.bottomIm.height + this.stage.pos.y + this.startOffset),
          this.armoIm.draw(0, ig.system.height - this.armoIm.height + this.stage.pos.y + this.startOffset),
          this.textDraw({
              px: 28,
              col: "white",
              tx: this.bubble.armoLeft,
              x: 50,
              y: ig.system.height - this.armoIm.height + 25 + this.stage.pos.y + this.startOffset,
              rot: -16
          })),
          this.drawPlus(),
          this.drawMinus())
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-tut").requires("game.entities.plain").defines(function() {
  EntityPlainTut = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2028,
      size: {
          x: 50,
          y: 50
      },
      textSize: 14,
      arrowIm: new ig.Image("media/graphics/sprites/tut-arrow.png"),
      arrow: {
          offY: 0,
          alp: 1
      },
      speechIm: new ig.Image("media/graphics/sprites/speech.png"),
      speech: {
          sc: 0
      },
      buttons: [],
      offY: -600,
      tutIndex: 0,
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.main = d.main,
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0],
          this.size.x = this.speechIm.width,
          this.size.y = this.speechIm.height,
          this.main.levelStat.speech ? (this.main.tutOn = !0,
          this.prepareText(),
          this.tweenF("fadeIn"),
          this.tweenF("alpFadeIn")) : this.kill())
      },
      clicked: function() {},
      released: function() {},
      handleText: function(b) {
          var c = b.tx.split(" ")
            , d = []
            , e = "";
          this.textSet(b.px, "white", null, ig.game.hidCtx);
          for (var g = 0; g < c.length; g++)
              "" == e ? e += c[g] : this.textW(e + " " + c[g]) < b.maxWidth ? e = 0 == e.length ? e + c[g] : e + (" " + c[g]) : (d.push(e),
              e = c[g]);
          0 != e.length && d.push(e);
          this.textSet(b.px, "white", null, ig.game.hidCtx);
          c = 1.3 * this.textW("M");
          return d.length * c > b.maxHeight ? this.handleText({
              px: b.px - 1,
              tx: b.tx,
              maxWidth: b.maxWidth,
              maxHeight: b.maxHeight
          }) : {
              px: b.px,
              lines: d
          }
      },
      tweenF: function(b) {
          switch (b) {
          case "expandSpeech":
              this.speech.sc = 0;
              0 == this.tutIndex && this.sounder("click");
              this.tweener("speech", {
                  sc: 1.1
              }, 0.1, "expandSpeech2");
              break;
          case "expandSpeech2":
              this.tweener("speech", {
                  sc: 1
              }, 0.1);
              break;
          case "fadeIn":
              this.tweener("arrow", {
                  offY: 10
              }, 0.5, "fadeOut");
              break;
          case "fadeOut":
              this.tweener("arrow", {
                  offY: 0
              }, 0.5, "fadeIn");
              break;
          case "alpFadeIn":
              this.tweener("arrow", {
                  alp: 0
              }, 1, "alpFadeOut", 1);
              break;
          case "alpFadeOut":
              this.tweener("arrow", {
                  alp: 1
              }, 1, "alpFadeIn")
          }
      },
      runTask: function() {},
      update: function() {
          !ig.global.wm && !0 != this.main.gamePaused && (this.parent(),
          ig.input.released("click") && (!1 == this.stage.startTween && !0 != this.main.gamePaused) && 1 == this.speech.sc && (this.sounder("click"),
          this.tutIndex++,
          this.main.levelStat.speech[this.tutIndex] ? this.prepareText() : (this.main.tutOn = !1,
          this.kill())))
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
      },
      prepareText: function() {
          this.speech.sc = 0;
          this.textLines = ig.ua.mobile ? this.main.levelStat.speechMobile ? this.handleText({
              tx: this.main.levelStat.speechMobile[this.tutIndex],
              px: this.textSize,
              maxWidth: 0.86 * this.size.x,
              maxHeight: 0.8 * this.size.y
          }) : this.handleText({
              tx: this.main.levelStat.speech[this.tutIndex],
              px: this.textSize,
              maxWidth: 0.86 * this.size.x,
              maxHeight: 0.8 * this.size.y
          }) : this.handleText({
              tx: this.main.levelStat.speech[this.tutIndex],
              px: this.textSize,
              maxWidth: 0.86 * this.size.x,
              maxHeight: 0.8 * this.size.y
          });
          this.renderText();
          !1 == this.stage.startTween && this.tweenF("expandSpeech")
      },
      renderText: function() {
          ig.game.hidCtx.clearRect(0, 1100, this.size.x, this.size.y);
          this.drawer({
              ctx: ig.game.hidCtx,
              pic: this.speechIm,
              x: 0,
              y: 1100
          });
          this.textSet(this.textLines.px, "#92551c", null, ig.game.hidCtx);
          for (var b = 1.3 * this.textW("M"), c = 0.5 * (b * this.textLines.lines.length - 0.5 * b), d = 0; d < this.textLines.lines.length; d++)
              this.textDraw({
                  ctx: ig.game.hidCtx,
                  px: this.textLines.px,
                  tx: this.textLines.lines[d],
                  x: 0 + 0.07 * this.size.x,
                  y: 1100 + this.size.y / 2 - c + d * b,
                  align: "left",
                  col: "#92551c"
              })
      },
      draw: function() {
          this.parent();
          ig.global.wm || (this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0],
          !1 == this.stage.startTween && !0 == this.main.gameStarted && (0 == this.speech.sc && this.tweenF("expandSpeech"),
          this.main.levelStat.arrow && (this.main.levelStat.arrow[this.tutIndex] ? this.drawer({
              pic: this.arrowIm,
              x: this.main.levelStat.arrow[this.tutIndex].x,
              y: this.main.levelStat.arrow[this.tutIndex].y + this.arrow.offY,
              cent: !0,
              scX: 0.8,
              scY: 0.8
          }) : this.drawer({
              pic: this.arrowIm,
              x: this.main.levelStat.arrow.x,
              y: this.main.levelStat.arrow.y + this.arrow.offY,
              cent: !0,
              scX: 0.8,
              scY: 0.8
          })),
          this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              cent: !0,
              scX: this.speech.sc,
              scY: this.speech.sc,
              sx: 0,
              sy: 1100,
              sw: this.size.x,
              sh: this.size.y
          }),
          this.textDraw({
              tx: _STRINGS.Game.Proceed,
              col: "white",
              px: 8,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y - 2,
              scX: this.speech.sc,
              scY: this.speech.sc
          })))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-stage").requires("game.entities.plain").defines(function() {
  EntityPlainStage = EntityPlain.extend({
      type: ig.Entity.TYPE.B,
      zIndex: 99,
      w: 800,
      sc: 2,
      size: {
          x: 50,
          y: 50
      },
      topLeft: {
          x: 32,
          y: 0
      },
      size: {
          x: 50,
          y: 50
      },
      oriPos: {
          x: 55,
          y: 128
      },
      im: new ig.Image("media/graphics/sprites/line_star.png"),
      wallIm: new ig.Image("media/graphics/sprites/wall.png"),
      sheetX: 8,
      sheetY: 4,
      topGap: 75,
      sc: {
          x: 1,
          y: 1
      },
      startOffset: 0,
      startTween: !0,
      stageHeight: 0.4,
      tweening: !1,
      drawSheetCent: function() {},
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.reGen())
      },
      reGen: function() {},
      tweenF: function(b) {
          switch (b) {
          case "triggerPosDelay":
              this.tweener(this, {}, 0.3, "triggerPos");
              break;
          case "triggerPos":
              this.stagePos();
              break;
          case "startTween":
              this.startTween = !1;
              this.shooter = ig.game.getEntitiesByType(EntityPlainShooter)[0];
              this.shooter.oriPos.y = 490;
              this.shooter.pos.y = this.shooter.oriPos.y;
              this.shooter.shadow.y = this.shooter.pos.y + 110;
              this.tweening = !1;
              ig.game.redraw = !0;
              break;
          case "endTween":
              this.tweening = !1
          }
      },
      update: function() {
          ig.global.wm || !0 != this.main.gamePaused && this.parent()
      },
      stagePos: function() {
          var b = 0;
          this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0];
          for (var c = this.main.tiles.length - 1; 0 < c; c--) {
              var d = !1;
              if (void 0 != this.main.tiles[c])
                  for (var e = 0; e < this.main.tiles[c].length; e++)
                      void 0 != this.main.tiles[c][e] && (d = !0);
              !0 == d && b++
          }
          b = ig.system.height * this.stageHeight - b * this.tile[0].size.y;
          0 < b && (b = 0);
          this.startOffset = b;
          this.tweening = this.main.allowShoot = !0;
          ig.game.redraw = !0;
          this.tweener("pos", {
              y: this.startOffset
          }, 0.5, "endTween")
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.tile = ig.game.getEntitiesByType(EntityPlainTile);
          this.shooter = ig.game.getEntitiesByType(EntityPlainShooter)[0];
          for (var b = 0, c = this.main.tiles.length - 1; 0 < c; c--) {
              for (var d = !1, e = 0; e < this.main.tiles[c].length; e++)
                  void 0 != this.main.tiles[c][e] && (d = !0);
              !0 == d && b++
          }
          this.startOffset = ig.system.height * this.stageHeight - b * this.tile[0].size.y;
          this.tweening = !0;
          ig.game.redraw = !0;
          this.tweener2("pos", {
              y: this.startOffset
          }, Math.abs(this.startOffset) / 100, "startTween");
          this.shooter.setStartPosition()
      },
      draw: function() {
          this.parent();
          if (!ig.global.wm) {
              this.ctx.drawImage(this.im.data, (ig.system.width - this.im.width * this.sc.x) / 2, this.pos.y - 12 + this.topGap - this.im.height / 2 * this.sc.y, this.im.width * this.sc.x, this.im.height * this.sc.y);
              for (var b = 0; b < Math.floor(Math.abs(this.pos.y / this.wallIm.height)) + 5; b++)
                  0 < this.pos.y + this.wallIm.height * b + this.wallIm.height && (this.drawer({
                      x: -1,
                      y: this.pos.y + this.wallIm.height * b,
                      frameX: 2,
                      frameY: 1,
                      frame: 0,
                      cent: !1,
                      pic: this.wallIm
                  }),
                  this.drawer({
                      x: ig.system.width - this.wallIm.width / 2 + 1,
                      y: this.pos.y + this.wallIm.height * b,
                      frameX: 2,
                      frameY: 1,
                      frame: 1,
                      cent: !1,
                      pic: this.wallIm
                  }))
          }
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-bubble").requires("game.entities.plain").defines(function() {
  EntityPlainBubble = EntityPlain.extend({
      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,
      zIndex: 2002,
      sheetX: 8,
      sheetY: 4,
      tile: {
          x: 0,
          y: 0
      },
      size: {
          x: 50,
          y: 50
      },
      friction: {
          x: 0,
          y: 0
      },
      gameOver: !1,
      gamePaused: !1,
      im: new ig.Image("media/graphics/sprites/bubbles.png"),
      speed: 800,
      shooted: !1,
      which: "red",
      realPos: {
          x: 0,
          y: 0
      },
      hitPos: {
          x: 0,
          y: 0
      },
      disPos: {},
      count: 0,
      spawned: !1,
      collided: !1,
      firstBubble: !0,
      ani: "red",
      refColour: "red",
      refType: "normal",
      arrowIm: new ig.Image("media/graphics/sprites/arrow.png"),
      woodIm: new ig.Image("media/graphics/sprites/log.png"),
      woodFrontIm: new ig.Image("media/graphics/sprites/log-front.png"),
      rayIm: new ig.Image("media/graphics/sprites/ray.png"),
      lightIm: new ig.Image("media/graphics/sprites/dot.png"),
      giveBubble: !1,
      showPrevBubble: !1,
      drawShootBubble: !0,
      prevBubble: "red",
      armoLeft: 0,
      armoIndex: -1,
      armoVault: [],
      activeBubble: 0,
      oriPos: {
          x: 0,
          y: 0
      },
      armoPlus: 0,
      armoMinus: 0,
      armoExtra: 10,
      minusVault: 0,
      plusVault: 0,
      light: {
          x: 10,
          y: 0,
          sc: 0,
          alp: 0
      },
      light2: {
          x: 2,
          y: 10,
          sc: 0,
          alp: 0
      },
      light3: {
          x: -10,
          y: -20,
          sc: 0,
          alp: 0
      },
      ray: {
          x: 123,
          y: -93,
          alp: 1
      },
      wood: {
          x: 121,
          y: -30
      },
      woodOff: {
          x: -112,
          y: -60
      },
      woodAniOff: {
          x: -112,
          y: -60
      },
      nextBubbleToggle: 0,
      onHandPos: {
          x: 212,
          y: -49
      },
      onWoodPos: {
          x: 99,
          y: -117
      },
      nextBubble0: {
          x: 99,
          y: -37,
          allow: !0
      },
      nextBubble1: {
          x: 99,
          y: -37,
          allow: !0
      },
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.main = d.main,
          this.aniStuff(),
          this.prepareBubbleArmo())
      },
      prepareBubbleArmo: function() {
          for (var b = [], c = 0; c < this.main.armo.length; c++)
              0 < this.main.armo[c] && b.push(this.main.colourSet[c]);
          for (c = 0; c < this.main.levelStat.armoEachArmo; c++) {
              this.shuffleArray(b);
              for (var d = 0; d < b.length; d++)
                  this.armoVault.push(b[d])
          }
          this.nextBubble0.index = 1;
          this.nextBubble1.index = 2;
          this.armoExtra = this.main.armoExtra;
          this.armoLeft = this.armoVault.length - this.armoExtra + 1
      },
      basicArmoUpdate: function() {
          this.armoLeft -= 1
      },
      plusMinusArmo: function() {
          this.armoPlus += this.plusVault;
          this.armoMinus += this.minusVault
      },
      plusMinusArmoUpdate: function() {
          this.minusVault = this.plusVault = 0;
          this.armoLeft = this.armoLeft + this.armoPlus - this.armoMinus;
          this.armoMinus = this.armoPlus = 0
      },
      bubbleTypeRegen: function() {
          -1 < this.which.indexOf("baby") ? (this.refType = "baby",
          this.refColour = this.which.replace("baby", "")) : this.main.bubbleColours.indexOf(this.which) ? (this.refType = "normal",
          this.refColour = this.which) : (this.refType = this.which,
          this.refColour = "none");
          this.currentAnim = this.anims[this.which]
      },
      followShooterPosition: function() {
          this.pos.x = this.shooter.pos.x + this.shooter.size.x / 2 - this.size.x / 2;
          this.pos.y = this.shooter.pos.y + this.shooter.anims.idle.pivot.y - 43;
          this.oriPos.x = this.pos.x;
          this.oriPos.y = this.pos.y
      },
      toggleBubble: function() {
          if (!(void 0 == this.armoVault[this.armoIndex + 1] || 1 >= this.armoLeft) && !1 != this.main.allowShoot) {
              var b = [this.armoVault[this.armoIndex] + "", this.armoVault[this.armoIndex + 1] + ""];
              this.armoVault[this.armoIndex] = b[1];
              this.armoVault[this.armoIndex + 1] = b[0];
              this.which = this.armoVault[this.armoIndex];
              this.bubbleTypeRegen()
          }
      },
      reGen: function() {
          !0 == this.shooted && (this.shooted = this.giveBubble = !1);
          this.shooter.allowShoot = !0;
          this.armoIndex += 1;
          void 0 != this.armoVault[this.armoIndex] ? (this.which = this.armoVault[this.armoIndex],
          this.bubbleTypeRegen()) : this.main.noArmo = !0
      },
      bubblesCollision: function() {
          var b = this.pos.x + this.size.x / 2
            , c = this.pos.y + this.size.y / 2
            , d = this.size.y / 2 - 2;
          this.tiles = ig.game.getEntitiesByType(EntityPlainTile);
          for (var e = 0; e < this.tiles.length; e++) {
              var g = this.tiles[e].pos.x + this.tiles[e].size.x / 2
                , m = this.tiles[e].pos.y + this.tiles[e].size.y / 2
                , x = this.tiles[e].size.y / 2;
              if (!1 == this.tiles[e].bubbleKilled && !0 == this.tiles[e].hanging && !0 == this.circleHitTest(b, c, d, g, m, x)) {
                  this.bubbleHitted(b - g, c - m);
                  break
              }
          }
          0 > this.pos.y - this.stage.pos.y - this.stage.topGap - this.stage.topLeft.y && this.bubbleHitted(-this.vel.x, 10)
      },
      getTilePos: function() {
          this.tile.y = Math.floor((this.realPos.y + this.size.y / 2) / this.size.y);
          this.tile.y % 2 == this.main.rowOffset ? (this.tile.x = Math.floor((this.realPos.x + this.size.x / 2) / this.size.x),
          10 < this.tile.x && (this.tile.x = 10)) : (this.tile.x = Math.floor(this.realPos.x / this.size.x),
          9 < this.tile.x && (this.tile.x = 9));
          0 > this.tile.x && (this.tile.x = 0)
      },
      bubbleHitted: function(b, c) {
          !0 != this.collided && (this.hitPos.x = this.pos.x,
          this.hitPos.y = this.pos.y,
          this.disPos = {
              x: b,
              y: c
          },
          this.collided = !0,
          this.spawned = !1,
          this.realPos.x = this.pos.x - this.stage.topLeft.x,
          this.realPos.y = this.pos.y - this.stage.pos.y - this.stage.topGap - this.stage.topLeft.y,
          this.count = 0,
          this.handleSnap())
      },
      getPosfromTile: function() {
          this.oriPos.x = this.tile.y % 2 == this.main.rowOffset ? this.tile.x * this.size.x : this.tile.x * this.size.x + this.size.x / 2;
          this.oriPos.y = this.tile.y * this.size.y
      },
      snap: function() {
          !0 != this.spawned && (this.spawned = !0,
          this.main.tiles[this.tile.y][this.tile.x] = this.which,
          ig.game.spawnEntity(EntityPlainTile, 175, 490, {
              main: this.main,
              which: this.which,
              i: this.tile.x,
              j: this.tile.y,
              bubblePos: {
                  x: this.hitPos.x,
                  y: this.hitPos.y
              }
          }),
          this.drawShootBubble = !1,
          this.reGen())
      },
      handleSnap: function() {
          !0 != this.spawned && (this.count++,
          this.getTilePos(),
          void 0 == this.main.tiles[this.tile.y] && (this.main.tiles[this.tile.y] = []),
          void 0 == this.main.tiles[this.tile.y][this.tile.x] || "empty" == this.main.tiles[this.tile.y][this.tile.x] ? this.snap() : ig.ua.mobile ? 1 == this.count ? (this.realPos.x = this.pos.x - (this.pos.x - this.last.x) * (this.count / 2) - this.stage.topLeft.x,
          this.realPos.y = this.pos.y - (this.pos.y - this.last.y) * (this.count / 2) - this.stage.pos.y - this.stage.topGap - this.stage.topLeft.y,
          this.handleSnap()) : 2 == this.count ? (this.realPos.x = this.last.x - this.stage.topLeft.x,
          this.realPos.y = this.last.y - this.stage.pos.y - this.stage.topGap - this.stage.topLeft.y,
          this.handleSnap()) : this.mobileSnapCheck() : (this.realPos.y += 5,
          this.handleSnap()))
      },
      snapMobile: function(b, c) {
          this.tile.y = b;
          this.tile.x = c;
          this.getPosfromTile();
          this.snap()
      },
      mobileSnapCheck: function() {
          var b, c, d, e;
          this.tile.y % 2 == this.main.rowOffset ? (b = -1,
          c = 0,
          d = 10,
          e = 9) : (b = 0,
          c = 1,
          d = 9,
          e = 10);
          0 < this.disPos.x ? void 0 == this.checkTile(this.tile.y + 1, this.tile.x + c) && this.tile.x + 1 <= e ? this.snapMobile(this.tile.y + 1, this.tile.x + c) : void 0 == this.checkTile(this.tile.y, this.tile.x + 1) && this.tile.x + 1 <= d ? this.snapMobile(this.tile.y, this.tile.x + 1) : void 0 == this.checkTile(this.tile.y - 1, this.tile.x + c) && this.tile.x + 1 <= e && -1 < this.tile.y - 1 ? this.snapMobile(this.tile.y - 1, this.tile.x + c) : void 0 == this.checkTile(this.tile.y + 1, this.tile.x + b) && -1 < this.tile.x - 1 ? this.snapMobile(this.tile.y + 1, this.tile.x + b) : void 0 == this.checkTile(this.tile.y, this.tile.x - 1) && -1 < this.tile.x - 1 ? this.snapMobile(this.tile.y, this.tile.x - 1) : void 0 == this.checkTile(this.tile.y - 1, this.tile.x + b) && (-1 < this.tile.x - 1 && -1 < this.tile.y - 1) && this.snapMobile(this.tile.y - 1, this.tile.x + b) : void 0 == this.checkTile(this.tile.y + 1, this.tile.x + b) && -1 < this.tile.x - 1 ? this.snapMobile(this.tile.y + 1, this.tile.x + b) : void 0 == this.checkTile(this.tile.y, this.tile.x - 1) && -1 < this.tile.x - 1 ? this.snapMobile(this.tile.y, this.tile.x - 1) : void 0 == this.checkTile(this.tile.y - 1, this.tile.x + b) && -1 < this.tile.x - 1 && -1 < this.tile.y - 1 ? this.snapMobile(this.tile.y - 1, this.tile.x + b) : void 0 == this.checkTile(this.tile.y + 1, this.tile.x + c) && this.tile.x + 1 <= e ? this.snapMobile(this.tile.y + 1, this.tile.x + c) : void 0 == this.checkTile(this.tile.y, this.tile.x + 1) && this.tile.x + 1 <= d ? this.snapMobile(this.tile.y, this.tile.x + 1) : void 0 == this.checkTile(this.tile.y - 1, this.tile.x + c) && (this.tile.x + 1 <= e && -1 < this.tile.y - 1) && this.snapMobile(this.tile.y - 1, this.tile.x + c)
      },
      checkTile: function(b, c) {
          return void 0 == this.main.tiles[b] ? (this.main.tiles[b] = [],
          this.main.tiles[b][c]) : "empty" == this.main.tiles[b][c] ? void 0 : this.main.tiles[b][c]
      },
      aniStuff: function() {
          this.animSheet = new ig.AnimationSheet(this.im.path,this.im.width / this.sheetX,this.im.height / this.sheetY);
          this.size.x = (this.animSheet.width - 4) * this.sc.x;
          this.size.y = (this.animSheet.height - 8) * this.sc.y;
          this.addAnim("red", 0.1, [0], !0);
          this.addAnim("orange", 0.1, [1], !0);
          this.addAnim("yellow", 0.1, [2], !0);
          this.addAnim("green", 0.1, [3], !0);
          this.addAnim("cyan", 0.1, [4], !0);
          this.addAnim("blue", 0.1, [5], !0);
          this.addAnim("purple", 0.1, [6], !0);
          this.addAnim("pink", 0.1, [7], !0);
          this.addAnim("super", 0.05, [19], !1);
          this.addAnim("babyred", 0.1, [8], !0);
          this.addAnim("babyorange", 0.1, [9], !0);
          this.addAnim("babyyellow", 0.1, [10], !0);
          this.addAnim("babygreen", 0.1, [11], !0);
          this.addAnim("babycyan", 0.1, [12], !0);
          this.addAnim("babyblue", 0.1, [13], !0);
          this.addAnim("babypurple", 0.1, [14], !0);
          this.addAnim("babypink", 0.1, [15], !0);
          this.addAnim("ice", 0.1, [16], !0);
          this.addAnim("right", 0.1, [17], !0);
          this.addAnim("up", 0.1, [18], !0);
          this.addAnim("rainbow", 0.1, [19], !0);
          this.addAnim("thunder", 0.1, [20], !0);
          this.addAnim("star", 0.1, [21], !0);
          this.addAnim("time", 0.1, [22], !0);
          this.addAnim("bomb", 0.1, [23], !0);
          this.addAnim("steel", 0.1, [24], !0);
          this.addAnim("evil", 0.1, [25], !0);
          this.addAnim("wood", 0.1, [26], !0);
          this.addAnim("guide", 0.1, [27], !0);
          this.addAnim("change", 0.1, [28], !0);
          this.addAnim("pick", 0.1, [29], !0);
          this.addAnim("search", 0.1, [30], !0);
          this.addAnim("armo", 0.1, [31], !0);
          this.currentAnim = this.anims.super
      },
      shootBubble: function(b) {
          !0 == this["nextBubble" + this.nextBubbleToggle].allow && (this["nextBubble" + this.nextBubbleToggle].allow = !1,
          this.angle = b,
          this.firstBubble = !1,
          this.drawShootBubble = !0,
          this.vel.x = this.speed * Math.cos(this.angle),
          this.vel.y = this.speed * Math.sin(this.angle),
          this.collided = !1,
          this.shooted = !0,
          this.giveNextBubble())
      },
      giveNextBubble: function() {
          for (var b = 0; b < this.tweens.length; b++)
              this.tweens[b].targ == "nextBubble" + this.nextBubbleToggle && this.tweens[b].stop();
          this["nextBubble" + (this.nextBubbleToggle + 1) % 2].x = this.onWoodPos.x;
          this["nextBubble" + (this.nextBubbleToggle + 1) % 2].y = this.onWoodPos.y + 80;
          this["nextBubble" + (this.nextBubbleToggle + 1) % 2].index = this["nextBubble" + this.nextBubbleToggle].index + 1;
          this.tweenF("giveBubbleUp", "nextBubble" + this.nextBubbleToggle);
          this.nextBubbleToggle = (this.nextBubbleToggle + 1) % 2
      },
      tweenF: function(b, c) {
          switch (b) {
          case "giveBubbleUp":
              this.oriPos.x = this.shooter.pos.x + this.shooter.size.x / 2 - this.size.x / 2;
              this.oriPos.y = this.shooter.pos.y + this.shooter.anims.idle.pivot.y - 43;
              c.y = this.onWoodPos.y;
              this.tweener(c, {
                  x: this.onHandPos.x
              }, 0.3);
              this.tweener(c, {
                  y: this[c].y - 30
              }, 0.2, "giveBubbleDown");
              break;
          case "giveBubbleDown":
              this.tweener(c, {
                  y: this.onHandPos.y
              }, 0.3);
              this.tweenF("nextBubbleUp", "nextBubble" + this.nextBubbleToggle);
              break;
          case "nextBubbleUp":
              this.tweener(c, {
                  y: this.onWoodPos.y - 20
              }, 0.3, "floatDown");
              break;
          case "floatUp":
              this.tweener(c, {
                  y: this.onWoodPos.y - 3
              }, 0.6, "floatDown");
              break;
          case "floatDown":
              this.drawShootBubble = this[c].allow = !0;
              this.tweener(c, {
                  y: this.onWoodPos.y + 3
              }, 0.5, "floatUp");
              break;
          case "gameOver":
              for (var d = 0; d < this.tweens.length; d++)
                  ("nextBubble0" == this.tweens[d].targ || "nextBubble1" == this.tweens[d].targ) && this.tweens[d].stop();
              this.tweener("nextBubble0", {
                  y: this.onWoodPos.y + 80
              }, 0.1);
              this.tweener("nextBubble1", {
                  y: this.onWoodPos.y + 80
              }, 0.1);
              break;
          case "rayBright":
              this.tweener("ray", {
                  alp: 1
              }, 1, "rayDim");
              break;
          case "rayDim":
              this.tweener("ray", {
                  alp: 0.8
              }, 2, "rayBright");
              break;
          case "light":
              this[c].alp = 0;
              this[c].sc = 0;
              this[c].x = -10 + 20 * Math.random();
              this[c].y = 40;
              this.tweener2(c, {
                  alp: 1,
                  sc: 0.5 + 0.5 * Math.random(),
                  x: this[c].x - 30 + 60 * Math.random(),
                  y: this[c].y - 20 - 30 * Math.random()
              }, 0.8 + 0.5 * Math.random(), "light2", 1 * Math.random());
              break;
          case "light2":
              this.tweener2(c, {
                  alp: 0,
                  sc: 0,
                  x: this[c].x - 30 + 60 * Math.random(),
                  y: this[c].y - 20 - 50 * Math.random()
              }, 1.2, "light")
          }
      },
      update: function() {
          !ig.global.wm && !0 != this.main.gamePaused && (this.parent(),
          !1 == this.shooted ? (this.vel.x = 0,
          this.vel.y = 0,
          this.followShooterPosition()) : !1 == this.collided && this.bubblesCollision(),
          30 > this.pos.x ? 0 > this.vel.x && (this.vel.x = -this.vel.x) : this.pos.x + this.size.x > ig.system.width - 30 && 0 < this.vel.x && (this.vel.x = -this.vel.x))
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.tiles = ig.game.getEntitiesByType(EntityPlainTile);
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0];
          this.shooter = ig.game.getEntitiesByType(EntityPlainShooter)[0];
          this.gui = ig.game.getEntitiesByType(EntityPlainGui)[0];
          this.followShooterPosition();
          this.reGen();
          this.tweenF("floatUp", "nextBubble" + this.nextBubbleToggle);
          this.tweenF("rayDim");
          this.tweenF("light", "light");
          this.tweenF("light", "light2");
          this.tweenF("light", "light3");
          this.armoLeft = this.armoVault.length - this.armoExtra + 1
      },
      draw: function() {
          ig.global.wm || (this.drawer({
              pic: this.woodIm,
              x: this.wood.x,
              y: this.wood.y + this.shooter.shadow.y,
              cent: !0
          }),
          this.drawer({
              pic: this.rayIm,
              x: this.ray.x,
              y: this.ray.y + this.shooter.shadow.y,
              cent: !0,
              alp: this.ray.alp
          }),
          !0 == this.shooted && this.parent(),
          !0 == this.firstBubble && this.parent(),
          void 0 != this.armoVault[this.nextBubble0.index] && this.anims[this.armoVault[this.nextBubble0.index]].draw(this.nextBubble0.x, this.shooter.shadow.y + this.nextBubble0.y),
          void 0 != this.armoVault[this.nextBubble1.index] && this.anims[this.armoVault[this.nextBubble1.index]].draw(this.nextBubble1.x, this.shooter.shadow.y + this.nextBubble1.y),
          this.drawer({
              pic: this.woodFrontIm,
              x: this.wood.x,
              y: this.wood.y + this.shooter.shadow.y,
              cent: !0
          }),
          this.drawer({
              pic: this.lightIm,
              x: this.wood.x + this.light.x,
              y: this.wood.y + this.shooter.shadow.y + this.light.y - 60,
              cent: !0,
              scX: this.light.sc,
              scY: this.light.sc,
              alp: this.light.alp
          }),
          this.drawer({
              pic: this.lightIm,
              x: this.wood.x + this.light2.x,
              y: this.wood.y + this.shooter.shadow.y + this.light2.y - 60,
              cent: !0,
              scX: this.light2.sc,
              scY: this.light2.sc,
              alp: this.light2.alp
          }),
          this.drawer({
              pic: this.lightIm,
              x: this.wood.x + this.light3.x,
              y: this.wood.y + this.shooter.shadow.y + this.light3.y - 60,
              cent: !0,
              scX: this.light3.sc,
              scY: this.light3.sc,
              alp: this.light3.alp
          }))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-shooter").requires("game.entities.plain", "game.entities.plain-bubble").defines(function() {
  EntityPlainShooter = EntityPlain.extend({
      type: ig.Entity.TYPE.B,
      zIndex: 2E3,
      w: 800,
      sc: 2,
      flip: {
          x: !1
      },
      size: {
          x: 50,
          y: 50
      },
      gameOver: !1,
      gamePaused: !1,
      im: new ig.Image("media/graphics/sprites/mushroom.png"),
      sc: {
          x: 1,
          y: 1
      },
      sheetX: 3,
      sheetY: 1,
      oriPos: {
          x: 55,
          y: 128
      },
      shadowIm: new ig.Image("media/graphics/sprites/shadow.png"),
      shadow: {
          scX: 1,
          alp: 1,
          offX: 0,
          y: 0
      },
      offset: {
          x: 0,
          y: 10
      },
      guide: {
          x: 0,
          y: 0
      },
      p1: {
          x: 0,
          y: 0
      },
      p2: {
          x: 0,
          y: 0
      },
      rad: 0,
      tweening: !1,
      refAngle: 0,
      angleRange: 70,
      allowShoot: !0,
      wallSide: 35,
      drawGuide: !0,
      guideOffY: 22,
      drawSheetCent: function() {},
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.oriPos.x = b,
          this.oriPos.y = c,
          this.aniStuff(),
          this.reGen())
      },
      guideReflect: function(b, c, d, e) {
          b < d ? (b = d + Math.abs(b - d),
          1 < e && (c += 5)) : b > ig.system.width - d && (d = ig.system.width - d,
          b = d - (b - d),
          1 < e && (c += 5));
          return {
              x: b,
              y: c
          }
      },
      setGuide: function() {
          if (!0 != this.tweening) {
              this.guides = [];
              this.p1 = {
                  x: this.oriPos.x + this.size.x / 2 + 4,
                  y: this.oriPos.y + this.size.y / 2 + 4
              };
              for (var b = 0; 40 > b; b++) {
                  var c = {
                      x: 0,
                      y: 0
                  }
                    , d = !1;
                  c.x = this.p1.x + 50 * b * Math.sin(2 * Math.PI - this.rad + Math.PI / 2);
                  c.y = this.p1.y + 50 * b * Math.cos(2 * Math.PI - this.rad + Math.PI / 2) + this.guideOffY;
                  for (var e = 0; 4 > e; e++) {
                      var g = this.guideReflect(c.x, c.y, this.wallSide, e);
                      c.x = g.x;
                      c.y = g.y
                  }
                  e = ig.game.getEntitiesByType(EntityPlainTile);
                  for (g = 0; g < e.length; g++)
                      if (!0 == this.circleHitTest(c.x, c.y, 10, e[g].pos.x + e[g].size.x / 2, e[g].pos.y + e[g].size.y / 2, 25) && !1 == e[g].bubbleKilled && !0 == e[g].hanging) {
                          d = !0;
                          break
                      }
                  75 > c.y && (d = !0);
                  if (!0 == d)
                      break;
                  this.guides.push(c)
              }
          }
      },
      reGen: function() {},
      setStartPosition: function() {
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0];
          this.startOffset = Math.abs(this.stage.startOffset);
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y + this.stage.pos.y
      },
      shoot: function() {
          !0 != this.main.tutOn && (!0 != this.main.noArmo && !0 != this.tweening && !0 != this.stage.tween && !1 != this.main.allowShoot && !1 != this.allowShoot && !1 != this.main.doneCombo && this.main.totalBaby != this.main.babyRescued && !1 != this.main.gameStarted && !0 != this.main.gameOver && !0 != this.main.gamePaused && !1 != this.bubble["nextBubble" + this.bubble.nextBubbleToggle].allow) && (this.sounder("click"),
          this.drawGuide = !1,
          this.main.gameStarted = !0,
          this.allowShoot = this.main.allowShoot = !1,
          this.flip.x = this.pointer.pos.x + this.pointer.size.x / 2 > ig.system.width / 2 ? !1 : !0,
          this.tweenF("toss1"))
      },
      aniStuff: function() {
          this.animSheet = new ig.AnimationSheet(this.im.path,this.im.width / this.sheetX,this.im.height / this.sheetY);
          this.size.x = (this.animSheet.width - 4) * this.sc.x;
          this.size.y = (this.animSheet.height - 8) * this.sc.y;
          this.addAnim("idle", 0.1, [0], !0);
          this.addAnim("middle", 0.1, [1], !0);
          this.addAnim("top", 0.1, [2], !0);
          this.currentAnim = this.anims.idle;
          this.currentAnim.pivot.x += 20;
          this.currentAnim.pivot.y += 40
      },
      tweenF: function(b) {
          switch (b) {
          case "toss1":
              this.bubble.shootBubble(this.rad);
              this.tweening = !0;
              this.tweener("this", {
                  pos: {
                      y: this.oriPos.y - (this.angleRange - Math.abs(this.rot)),
                      x: this.oriPos.x + 2 * this.rot
                  },
                  refAngle: this.getRad(1.8 * this.rot),
                  shadow: {
                      scX: 1.2,
                      alp: 0.5,
                      offX: this.rot
                  }
              }, 0.2, "toss2");
              this.tweener("this", {}, 0.1, "anim0");
              break;
          case "toss2":
              this.tweener("this", {
                  pos: {
                      y: this.oriPos.y,
                      x: this.oriPos.x
                  },
                  refAngle: 0,
                  shadow: {
                      scX: 1,
                      alp: 1,
                      offX: 0
                  }
              }, 0.2);
              break;
          case "anim0":
              this.currentAnim = this.anims.middle;
              this.tweener("this", {}, 0.03, "anim1");
              break;
          case "anim1":
              this.currentAnim = this.anims.top;
              this.tweener("this", {}, 0.2, "anim2");
              break;
          case "anim2":
              this.currentAnim = this.anims.middle;
              this.tweener("this", {}, 0.03, "anim3");
              break;
          case "anim3":
              this.currentAnim = this.anims.idle,
              this.tweening = !1
          }
      },
      getDeg: function(b) {
          return b * (180 / Math.PI)
      },
      getRad: function(b) {
          return b * (Math.PI / 180)
      },
      update: function() {
          !ig.global.wm && !0 != this.main.gamePaused && (this.parent(),
          this.currentAnim.flip.x = this.flip.x,
          this.pointer.update(),
          this.offset.x = !0 == this.currentAnim.flip.x ? -20 : 22,
          !0 == this.stage.startTween && (this.pos.y = this.oriPos.y + this.stage.pos.y + this.startOffset,
          this.shadow.y = this.oriPos.y + this.stage.pos.y + this.startOffset + 110),
          this.currentAnim.angle = this.refAngle,
          500 > this.pointer.pos.y && (this.rot = this.angleRange - Math.abs(this.angleTo(this.pointer)) / 3.142 * 2 * this.angleRange,
          this.rad = this.angleTo(this.pointer),
          this.setGuide(),
          ig.input.released("click") && (!0 == this.stage.startTween && !0 == this.main.gameStarted ? (this.stage.stopTweens(),
          this.stage.tweener2("pos", {
              y: this.stage.startOffset
          }, 0.3, "startTween")) : this.shoot())))
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0];
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0]
      },
      draw: function() {
          if (!ig.global.wm && void 0 != this.guides) {
              if (500 > this.pointer.pos.y && !0 == this.drawGuide)
                  for (var b = 0; b < this.guides.length; b++)
                      this.ctx.fillStyle = "white",
                      this.ctx.beginPath(),
                      this.ctx.arc(this.guides[b].x, this.guides[b].y, 4, 0, 2 * Math.PI),
                      this.ctx.closePath(),
                      this.ctx.fill();
              this.drawer({
                  pic: this.shadowIm,
                  x: ig.system.width / 2 - 2 - 0.5 * this.offset.x + this.shadow.offX,
                  y: this.shadow.y,
                  cent: !0,
                  scX: this.shadow.scX,
                  scY: 1,
                  alp: this.shadow.alp
              });
              this.parent()
          }
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-menu-but").requires("game.entities.plain").defines(function() {
  EntityPlainMenuBut = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2040,
      sc: 0,
      mouseSc: 0.95,
      runTask: !1,
      tweening: !1,
      oriPos: {
          x: 0,
          y: 0
      },
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.name = d.name,
          this.menu = d.menu,
          void 0 != this.menu && this.menu.buttons.push(this),
          this.size.x = this.butIm.width,
          this.size.y = this.butIm.height,
          this.oriPos.x = b,
          this.oriPos.y = c,
          this.hide(),
          this.oriStat && this.oriStat())
      },
      clicked: function() {
          this.sc = 0.9;
          this.buttonTask();
          this.sounder("click")
      },
      released: function() {
          !0 != this.tweening && (this.sc = 1)
      },
      hide: function() {
          this.pos.x = -200;
          this.pos.y = -200
      },
      show: function() {
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y + this.menu.offY
      },
      tweenF: function(b) {
          switch (b) {
          case "delayTask":
              this.tweener("this", {}, 0.05, "delayTask2");
              break;
          case "delayTask2":
              this.delayTask();
              break;
          case "floatUp":
              this.tweener("pos", {
                  y: this.oriPos.y - 10
              }, 0.3, "floatDown");
              break;
          case "floatDown":
              this.tweener("pos", {
                  y: this.oriPos.y + 10
              }, 0.3, "floatUp");
              break;
          case "fadeIn":
              this.show();
              this.tweening = !0;
              this.tweener("this", {
                  sc: 1
              }, 0.3, "doneFade");
              break;
          case "doneFade":
              this.tweening = !1;
              break;
          case "fadeOut":
              this.tweening = !0;
              this.tweener("this", {
                  sc: 0
              }, 0.3, "fadeOut2");
              break;
          case "fadeOut2":
              this.tweening = !1,
              this.oriPos.x = this.pos.x,
              this.hide()
          }
      },
      update: function() {
          ig.global.wm || (this.parent(),
          !0 == this.menu.tweening && (this.pos.y = this.oriPos.y + this.menu.offY),
          !0 != this.tweening && (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95))
      },
      drawInit: function() {},
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
      },
      draw: function() {
          this.parent();
          ig.global.wm || this.drawer({
              pic: this.butIm,
              x: this.pos.x + this.butIm.width / 2,
              y: this.pos.y + this.butIm.height / 2,
              scX: this.oriSc * this.sc * this.mouseSc,
              scY: this.oriSc * this.sc * this.mouseSc,
              cent: !0
          })
      }
  });
  EntityCloseBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/close.png"),
      buttonTask: function() {
          !0 != this.tweening && !1 != this.main.gamePaused && (this.menu.task = "unpause",
          this.menu.tweenF("pauseFadeOut"))
      }
  });
  EntityOkayBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/ok.png"),
      buttonTask: function() {
          !0 != this.tweening && !1 != this.main.gamePaused && (this.menu.task = "unpause",
          this.menu.tweenF("pauseFadeOut"))
      }
  });
  EntityMenuBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/menu.png"),
      buttonTask: function() {
          !0 != this.tweening && (this.main.gamePaused = !0,
          this.menu.task = "home",
          this.menu.tweenF("pauseFadeOut"))
      }
  });
  EntityMusicKnot = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      hold: {
          x: 0,
          y: 0
      },
      holding: !1,
      butIm: new ig.Image("media/graphics/sprites/music.png"),
      posRef: {
          x: 0,
          y: 0
      },
      oriStat: function() {
          this.posRef.x = this.oriPos.x
      },
      ready: function() {
          this.parent();
          this.oriPos.x = this.posRef.x + 128 * ig.game.musicVolume
      },
      buttonTask: function() {
          !0 != this.tweening && !1 == this.holding && (this.holding = !0,
          this.hold.x = this.pos.x - this.pointer.pos.x)
      },
      update: function() {
          !0 == this.holding && (this.pos.x = this.pointer.pos.x + this.hold.x,
          this.pos.x < this.posRef.x && (this.pos.x = this.posRef.x),
          this.pos.x > this.posRef.x + 128 && (this.pos.x = this.posRef.x + 128),
          ig.ua.mobile ? ig.soundHandler.jukebox.player.setVolume((this.pos.x - this.posRef.x) / 128) : ig.music.volume = (this.pos.x - this.posRef.x) / 128,
          ig.input.released("click") && (this.released(),
          this.holding = this.pointer.firstClick = !1,
          ig.game.setMusic((this.pos.x - this.posRef.x) / 128),
          this.sounder("click")));
          this.parent()
      }
  });
  EntitySoundKnot = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/sound.png"),
      holding: !1,
      hold: {
          x: 0,
          y: 0
      },
      posRef: {
          x: 0,
          y: 0
      },
      oriStat: function() {
          this.posRef.x = this.oriPos.x
      },
      ready: function() {
          this.parent();
          this.oriPos.x = this.posRef.x + 128 * ig.game.soundVolume
      },
      buttonTask: function() {
          !0 != this.tweening && !1 == this.holding && (this.holding = !0,
          this.hold.x = this.pos.x - this.pointer.pos.x)
      },
      update: function() {
          !0 == this.holding && (this.pos.x = this.pointer.pos.x + this.hold.x,
          this.pos.x < this.posRef.x && (this.pos.x = this.posRef.x),
          this.pos.x > this.posRef.x + 128 && (this.pos.x = this.posRef.x + 128),
          ig.input.released("click") && (this.released(),
          this.pointer.firstClick = !1,
          ig.game.setSound((this.pos.x - this.posRef.x) / 128),
          this.holding = !1,
          this.sounder("click")));
          this.parent()
      }
  });
  EntityContinueBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/play.png"),
      buttonTask: function() {
          !0 != this.tweening && !1 != this.main.gamePaused && (this.menu.task = "unpause",
          this.menu.tweenF("pauseFadeOut"))
      }
  });
  EntityReplayBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/replay.png"),
      buttonTask: function() {
          !0 != this.tweening && ig.gd.show(this.replaying.bind(this))
      },
      replaying: function() {
          this.main.gamePaused = !0;
          this.menu.task = "replay";
          this.menu.tweenF("pauseFadeOut")
      }
  });
  EntityProceedBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/continue.png"),
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.menu = ig.game.getEntitiesByType(EntityPlainOver)[0]
      },
      buttonTask: function() {
          !0 != this.tweening && ig.gd.show(this.nextGame.bind(this))
      },
      nextGame: function() {
          this.main.gamePaused = !0;
          this.menu.task = "next";
          this.menu.tweenF("pauseFadeOut")
      }
  });
  EntityLevelNextBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/next.png"),
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.menu = ig.game.getEntitiesByType(EntityPlainLevel)[0]
      },
      buttonTask: function() {
          !0 != this.tweening && this.tweenF("delayTask")
      },
      delayTask: function() {
          !0 != this.tweening && (this.menu.page = 2)
      },
      draw: function() {
          1 == this.menu.page && this.parent()
      }
  });
  EntityLevelPrevBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/prev.png"),
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.menu = ig.game.getEntitiesByType(EntityPlainLevel)[0]
      },
      buttonTask: function() {
          !0 != this.tweening && this.tweenF("delayTask")
      },
      delayTask: function() {
          !0 != this.tweening && (this.menu.page = 1)
      },
      draw: function() {
          2 == this.menu.page && this.parent()
      }
  });
  EntityLevelCloseBut = EntityPlainMenuBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/close.png"),
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.menu = ig.game.getEntitiesByType(EntityPlainLevel)[0]
      },
      buttonTask: function() {
          !0 != this.tweening && !1 != this.main.gamePaused && (this.menu.task = "unpause",
          this.menu.tweenF("pauseFadeOut"),
          this.tweening = !0,
          ig.game.showOverlay(["more-games"]))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-but").requires("game.entities.plain").defines(function() {
  EntityPlainBut = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2040,
      sc: 0,
      mouseSc: 0.95,
      runTask: !1,
      tweening: !1,
      oriPos: {
          x: 0,
          y: 0
      },
      alp: 1,
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.name = d.name,
          this.menu = d.menu,
          void 0 != this.menu && this.menu.buttons.push(this),
          this.size.x = this.butIm.width,
          this.size.y = this.butIm.height,
          this.oriPos.x = b,
          this.oriPos.y = c,
          this.hide(),
          this.oriStat && this.oriStat())
      },
      clicked: function() {
          this.sc = 0.9;
          this.buttonTask()
      },
      released: function() {
          !0 != this.tweening && (this.sc = 1)
      },
      hide: function() {
          this.pos.x = -200;
          this.pos.y = -200
      },
      show: function() {
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y
      },
      tweenF: function(b) {
          switch (b) {
          case "delayTask":
              this.tweener("this", {}, 0.05, "delayTask2")
          }
      },
      update: function() {
          !ig.global.wm && !0 != this.tweening && (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95)
      },
      drawInit: function() {},
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
      },
      draw: function() {
          this.parent();
          ig.global.wm || this.drawer({
              pic: this.butIm,
              x: this.pos.x + this.butIm.width / 2,
              y: this.pos.y + this.butIm.height / 2,
              scX: this.oriSc * this.sc * this.mouseSc,
              scY: this.oriSc * this.sc * this.mouseSc,
              cent: !0,
              alp: this.alp
          })
      }
  });
  EntityPauseBut = EntityPlainBut.extend({
      zIndex: 2020,
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/pause.png"),
      oriStat: function() {
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y;
          this.sc = 1
      },
      buttonTask: function() {
          if (!0 != this.main.gameOver && !0 != this.main.gamePaused && !0 != this.tweening) {
              this.sounder("click");
              this.main.gamePaused = !0;
              this.menu.tweenF("pauseFadeIn");
              for (var b = 0; b < ig.game.entities.length; b++) {
                  var c = ig.game.entities[b];
                  (c instanceof EntityPlainTile || c instanceof EntityPlainStage || c instanceof EntityPlainBubble || c instanceof EntityPlainGame || c instanceof EntityPlainShooter || c instanceof EntityPlainReady || c instanceof EntityPlainGui) && c.pauseTweens()
              }
          }
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.menu = ig.game.getEntitiesByType(EntityPlainPause)[0]
      }
  });
  EntityToggleBubbleBut = EntityPlainBut.extend({
      zIndex: 2020,
      oriSc: 0.7,
      butIm: new ig.Image("media/graphics/sprites/arrow.png"),
      oriStat: function() {
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y;
          this.sc = 1
      },
      buttonTask: function() {
          !1 != this.main.gameStarted && (!0 != this.main.gameOver && !0 != this.main.gamePaused && !0 != this.tweening) && (this.sounder("click"),
          this.bubble.toggleBubble())
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0];
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0];
          this.startOffset = Math.abs(this.stage.startOffset)
      },
      update: function() {
          ig.global.wm || (this.alp = 1 >= this.bubble.armoLeft ? 0.5 : 1,
          this.pos.y = !0 == this.stage.startTween ? this.oriPos.y + this.stage.pos.y + this.startOffset : this.oriPos.y,
          !0 != this.tweening && (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95,
          ig.input.released("toggle") && this.buttonTask()))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-pause").requires("game.entities.plain").defines(function() {
  EntityPlainPause = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2030,
      size: {
          x: 50,
          y: 50
      },
      task: "unpause",
      pauseRect: {
          alp: 0,
          targAlp: 0.5,
          colour: "black"
      },
      boardIm: new ig.Image("media/graphics/sprites/board.png"),
      musicIm: new ig.Image("media/graphics/sprites/music.png"),
      soundIm: new ig.Image("media/graphics/sprites/sound.png"),
      settingIm: new ig.Image("media/graphics/sprites/setting.png"),
      sliderIm: new ig.Image("media/graphics/sprites/slider.png"),
      headerIm: new ig.Image("media/graphics/sprites/header.png"),
      buttons: [],
      offY: -600,
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          ig.game.spawnEntity(EntityCloseBut, 363, 186, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntityMusicKnot, 205, 250, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntitySoundKnot, 205, 311, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntityMenuBut, ig.system.width / 2 - 60 - 50, 368, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntityReplayBut, ig.system.width / 2 - 25, 370, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntityContinueBut, ig.system.width / 2 + 60, 367, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntityProceedBut, ig.system.width / 2 + 60, 367, {
              main: this.main
          }),
          this.board = {
              x: ig.system.width / 2,
              y: 300,
              offX: 0,
              offY: 0,
              scX: 0,
              scY: 0
          },
          this.header = {
              x: 0,
              y: -100,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1
          },
          this.title = {
              x: 0,
              y: -5,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1,
              grad1: -20,
              grad2: 3
          },
          this.title.grad = this.ctx.createLinearGradient(0, this.title.grad1, 0, this.title.grad2),
          this.title.grad.addColorStop(0, "#e6e438"),
          this.title.grad.addColorStop(0.3, "#c2d73a"),
          this.title.grad.addColorStop(1, "#6d8225"),
          this.music = {
              x: -90,
              y: -33,
              lineX: 50,
              lineY: -30,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1
          },
          this.sound = {
              x: -90,
              y: 28,
              lineX: 50,
              lineY: 30,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1
          },
          this.renderText())
      },
      renderText: function() {
          !0 != ig.game.played && this.textDraw({
              ctx: ig.game.hidCtx,
              px: 28,
              tx: _STRINGS.Game.Paused,
              x: 950,
              y: 20,
              stroke: !0,
              strokeColour: "#56612f",
              strokeLine: 6,
              col: this.title.grad
          })
      },
      tweenF: function(b) {
          switch (b) {
          case "pauseFadeIn":
              this.tweening = !0;
              this.tweener("pauseRect", {
                  alp: this.pauseRect.targAlp
              }, 0.3, "boardfadeIn");
              break;
          case "boardfadeIn":
              this.tweener("this", {
                  offY: 50
              }, 0.3, "boardfadeIn2");
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.3, "boardSize4");
              break;
          case "boardSize2":
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.1, "boardSize3");
              break;
          case "boardSize3":
              this.tweener("board", {
                  scX: 0.95,
                  scY: 1.05
              }, 0.1, "boardSize4");
              break;
          case "boardSize4":
              this.tweener("board", {
                  scX: 1,
                  scY: 1
              }, 0.1);
              break;
          case "boardfadeIn2":
              this.tweener("this", {
                  offY: 0
              }, 0.3, "donefadeIn");
              for (b = 0; b < this.buttons.length; b++)
                  this.buttons[b].tweenF("fadeIn");
              break;
          case "donefadeIn":
              this.tweening = !1;
              break;
          case "pauseFadeOut":
              this.tweening = !0;
              for (b = 0; b < this.buttons.length; b++)
                  this.buttons[b].tweenF("fadeOut");
              this.tweener("this", {
                  offY: 50
              }, 0.3, "boardfadeOut2");
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.3, "boardSizeOut");
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0.95,
                  scY: 1.1
              }, 0.3, "boardSizeOut2");
              this.tweener("pauseRect", {
                  alp: 0
              }, 0.3);
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0,
                  scY: 0
              }, 0.3);
              break;
          case "boardfadeOut2":
              this.tweener("this", {
                  offY: -500
              }, 0.3, "donefadeOut");
              break;
          case "donefadeOut":
              this.tweening = !1,
              this.runTask()
          }
      },
      runTask: function() {
          switch (this.task) {
          case "unpause":
              this.main.gamePaused = !1;
              for (var b = 0; b < ig.game.entities.length; b++) {
                  var c = ig.game.entities[b];
                  (c instanceof EntityPlainTile || c instanceof EntityPlainStage || c instanceof EntityPlainBubble || c instanceof EntityPlainGame || c instanceof EntityPlainShooter || c instanceof EntityPlainReady || c instanceof EntityPlainGui) && c.resumeTweens()
              }
              break;
          case "replay":
              ig.game.director.jumpTo(LevelGame);
              break;
          case "home":
              this.main.gamePaused = !1,
              ig.game.showLvlMenu = !0,
              ig.game.director.jumpTo(LevelHome)
          }
      },
      update: function() {
          ig.global.wm || this.parent()
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          for (var b = 0; b < this.buttons.length; b++)
              this.buttons[b].menu = this
      },
      draw: function() {
          this.parent();
          ig.global.wm || (!0 == this.main.gamePaused && (this.ctx.fillStyle = this.pauseRect.colour,
          this.ctx.globalAlpha = this.pauseRect.alp,
          this.ctx.fillRect(0, 0, ig.system.width, ig.system.height)),
          this.drawer({
              x: this.board.x,
              y: this.board.y + this.offY,
              cent: !0,
              scX: this.board.scX,
              scY: this.board.scY,
              pic: this.settingIm
          }),
          this.drawer({
              x: this.board.x + this.header.x,
              y: this.board.y + this.header.y + this.offY,
              cent: !0,
              scX: this.board.scX * this.header.scX,
              scY: this.board.scY * this.header.scY,
              pic: this.headerIm
          }),
          this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.board.x + this.header.x,
              y: this.board.y + this.header.y + this.title.y + this.offY,
              sx: 890,
              sy: 0,
              sw: 120,
              sh: 40,
              cent: !0
          }),
          this.drawer({
              x: this.board.x + this.music.lineX,
              y: this.board.y + this.music.lineY + this.offY,
              cent: !0,
              scX: this.board.scX * this.music.scX,
              scY: this.board.scY * this.music.scY,
              pic: this.sliderIm
          }),
          this.textDraw({
              px: 20,
              tx: _STRINGS.Game.Music,
              x: this.board.x + this.music.x,
              y: this.board.y + this.music.y + this.offY,
              col: "#4d3200"
          }),
          this.drawer({
              x: this.board.x + this.sound.lineX,
              y: this.board.y + this.sound.lineY + this.offY,
              cent: !0,
              scX: this.board.scX * this.sound.scX,
              scY: this.board.scY * this.sound.scY,
              pic: this.sliderIm
          }),
          this.textDraw({
              px: 20,
              tx: _STRINGS.Game.Sound,
              x: this.board.x + this.sound.x,
              y: this.board.y + this.sound.y + this.offY,
              col: "#4d3200"
          }))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-level-box").requires("game.entities.plain", "game.entities.plain-menu-but").defines(function() {
  EntityPlainLevelBox = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2031,
      size: {
          x: 50,
          y: 50
      },
      oriPos: {
          x: 0,
          y: 0
      },
      mouseSc: 0.95,
      infiLockedIm: new ig.Image("media/graphics/sprites/infi-locked.png"),
      infiIm: new ig.Image("media/graphics/sprites/infi.png"),
      lvlIm: new ig.Image("media/graphics/sprites/lvl.png"),
      starIm: new ig.Image("media/graphics/sprites/rank-small.png"),
      baseIm: new ig.Image("media/graphics/sprites/rank-base-small.png"),
      sc: 1,
      buttons: [],
      clicked: function() {
          this.sc = 0.9;
          this.tweenF("delayTask");
          this.sounder("click")
      },
      released: function() {
          !0 != this.tweening && (this.sounder("click"),
          this.sc = 1)
      },
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.oriPos.x = b,
          this.oriPos.y = c,
          this.level = d.level,
          this.main = d.main,
          this.getSize("lvlIm"))
      },
      buttonTask: function() {
          !1 != ig.game.levelStat[this.level + 12 * (this.menu.page - 1)].unlocked && (ig.game.lvl = this.level + 12 * (this.menu.page - 1),
          ig.game.director.jumpTo(LevelGame))
      },
      tweenF: function(b) {
          switch (b) {
          case "fadeIn":
              this.tweener("this", {
                  sc: 1
              }, 0.3);
              break;
          case "fadeOut":
              this.tweener("this", {
                  sc: 0
              }, 0.3);
              break;
          case "delayTask":
              this.tweener("this", {}, 0.01, "runTask");
              break;
          case "runTask":
              this.buttonTask()
          }
      },
      runTask: function() {
          switch (this.task) {
          case "unpause":
              this.main.gamePaused = !1;
              break;
          case "replay":
              this.menu.offY = -600;
              ig.game.director.jumpTo(LevelGame);
              break;
          case "home":
              this.main.gamePaused = !1,
              ig.game.director.jumpTo(LevelHome)
          }
      },
      update: function() {
          ig.global.wm || (this.parent(),
          this.pos.y = this.oriPos.y + this.menu.offY,
          !0 != this.tweening && (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95))
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.menu = ig.game.getEntitiesByType(EntityPlainLevel)[0]
      },
      draw: function() {
          this.parent();
          if (!1 != this.menu.drawing && !ig.global.wm) {
              this.drawer({
                  x: this.pos.x + this.halfSize.x,
                  y: this.pos.y + this.halfSize.y,
                  cent: !0,
                  pic: this.lvlIm,
                  scX: 0.9 * this.menu.board.scX * this.sc * this.mouseSc,
                  scY: 0.9 * this.menu.board.scY * this.sc * this.mouseSc
              });
              24 == this.level + 12 * (this.menu.page - 1) + 1 ? this.drawer({
                  pic: !0 == ig.game.levelStat[this.level + 12 * (this.menu.page - 1)].unlocked ? this.infiIm : this.infiLockedIm,
                  x: this.pos.x + this.halfSize.x,
                  y: this.pos.y + 0.71 * this.halfSize.y + 2,
                  cent: !0,
                  scX: this.menu.board.scX * this.sc * this.mouseSc,
                  scY: this.menu.board.scY * this.sc * this.mouseSc
              }) : this.textDraw({
                  tx: this.level + 12 * (this.menu.page - 1) + 1,
                  px: 27,
                  x: this.pos.x + this.halfSize.x,
                  y: this.pos.y + 0.71 * this.halfSize.y,
                  col: !0 == ig.game.levelStat[this.level + 12 * (this.menu.page - 1)].unlocked ? "white" : "#553600",
                  stroke: !0,
                  strokeColour: "#270600",
                  strokeLine: 5,
                  scX: 0.9 * this.menu.board.scX * this.sc * this.mouseSc,
                  scY: 0.9 * this.menu.board.scY * this.sc * this.mouseSc
              });
              for (var b = 0; 3 > b; b++)
                  b < ig.game.levelStat[this.level + 12 * (this.menu.page - 1)].star ? this.drawer({
                      pic: this.starIm,
                      x: this.pos.x + this.halfSize.x + 16 * (b - 1) * this.mouseSc * this.sc,
                      y: this.pos.y + this.halfSize.y + 0.55 * this.halfSize.y * this.mouseSc * this.sc,
                      cent: !0,
                      scX: 0.8 * this.menu.board.scX * this.sc * this.mouseSc,
                      scY: 0.8 * this.menu.board.scY * this.sc * this.mouseSc
                  }) : this.drawer({
                      pic: this.baseIm,
                      x: this.pos.x + this.halfSize.x + 16 * (b - 1) * this.mouseSc * this.sc,
                      y: this.pos.y + this.halfSize.y + 0.55 * this.halfSize.y * this.mouseSc * this.sc,
                      cent: !0,
                      scX: 0.8 * this.menu.board.scX * this.sc * this.mouseSc,
                      scY: 0.8 * this.menu.board.scY * this.sc * this.mouseSc
                  })
          }
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-ready").requires("game.entities.plain").defines(function() {
  EntityPlainReady = EntityPlain.extend({
      type: ig.Entity.TYPE.B,
      zIndex: 2E3,
      w: 800,
      sc: 2,
      size: {
          x: 50,
          y: 50
      },
      textSize: 80,
      strokeSize: 7,
      shadowCol: "#fffbe3",
      readyText: {
          seq: 0,
          x: 240,
          y: 50,
          scX: 1,
          scY: 1,
          alp: 1,
          offX: 0,
          offY: 0,
          rot: 0
      },
      goText: {
          seq: 0,
          x: 240,
          y: 150,
          scX: 1,
          scY: 1,
          alp: 1,
          offX: 0,
          offY: 0,
          rot: 0
      },
      r: {
          seq: 0,
          x: 135,
          y: 250,
          scX: 0,
          scY: 0,
          alp: 0,
          offX: 0,
          offY: 0,
          rot: 0
      },
      e: {
          seq: 1,
          x: 187,
          y: 250,
          scX: 0,
          scY: 0,
          alp: 0,
          offX: 0,
          offY: 0,
          rot: 0
      },
      a: {
          seq: 2,
          x: 245,
          y: 250,
          scX: 0,
          scY: 0,
          alp: 0,
          offX: 0,
          offY: 0,
          rot: 0
      },
      d: {
          seq: 3,
          x: 305,
          y: 250,
          scX: 0,
          scY: 0,
          alp: 0,
          offX: 0,
          offY: 0,
          rot: 0
      },
      y: {
          seq: 4,
          x: 350,
          y: 250,
          scX: 0,
          scY: 0,
          alp: 0,
          offX: 0,
          offY: 0,
          rot: 0
      },
      g: {
          seq: 0,
          x: 205,
          y: 250,
          scX: 0,
          scY: 0,
          alp: 1,
          offX: 0,
          offY: 0,
          rot: 0
      },
      o: {
          seq: 1,
          x: 275,
          y: 250,
          scX: 0,
          scY: 0,
          alp: 1,
          offX: 0,
          offY: 0,
          rot: 0
      },
      grad1: -60,
      grad2: 10,
      drawSheetCent: function() {},
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.main = d.main,
          this.grad = this.ctx.createLinearGradient(0, this.grad1, 0, this.grad2),
          this.grad.addColorStop(0, "#fffcea"),
          this.grad.addColorStop(0.8, "#ffd05c"),
          this.grad.addColorStop(1, "#a85a15"),
          this.shadowGrad = this.ctx.createLinearGradient(0, this.grad1, 0, this.grad2),
          this.shadowGrad.addColorStop(0, "#FFFFFF"),
          this.shadowGrad.addColorStop(1, "#fffbe3"),
          this.strokeGrad = this.ctx.createLinearGradient(0, this.grad1, 0, this.grad2),
          this.strokeGrad.addColorStop(0, "#6d3a08"),
          this.strokeGrad.addColorStop(0.7, "#8a470b"),
          this.strokeGrad.addColorStop(1, "#6d3a08"),
          this.preRender())
      },
      tweenF: function(b) {
          switch (b) {
          case "ready":
              this.readyText = {
                  seq: 0,
                  x: 250,
                  y: 250,
                  scX: 1,
                  scY: 1,
                  alp: 0,
                  offX: 0,
                  offY: 0,
                  rot: 0
              };
              this.goText = {
                  seq: 0,
                  x: 250,
                  y: 250,
                  scX: 1,
                  scY: 1,
                  alp: 0,
                  offX: 0,
                  offY: 0,
                  rot: 0
              };
              this.tweener("readyText", {
                  alp: 1,
                  scX: 1.3,
                  scY: 1.3
              }, 0.2, "ready2");
              break;
          case "ready2":
              this.tweener("readyText", {
                  scX: 1,
                  scY: 1
              }, 0.2, "ready3");
              this.sounder("count");
              break;
          case "ready3":
              this.tweener("readyText", {
                  scX: 1.3,
                  scY: 1.3
              }, 0.1, "ready4", 0.3);
              break;
          case "ready4":
              this.tweener("readyText", {
                  scX: 0,
                  scY: 0,
                  alp: 0
              }, 0.2, "go");
              break;
          case "go":
              this.tweener("goText", {
                  alp: 1,
                  scX: 1.3,
                  scY: 1.3
              }, 0.2, "go2");
              break;
          case "go2":
              this.sounder("count");
              this.tweener("goText", {
                  scX: 1,
                  scY: 1
              }, 0.2, "go3");
              break;
          case "go3":
              this.tweener("goText", {
                  scX: 1.3,
                  scY: 1.3
              }, 0.1, "go4", 0.3);
              break;
          case "go4":
              this.tweener("goText", {
                  scX: 0,
                  scY: 0,
                  alp: 0
              }, 0.2, "startGame");
              break;
          case "startGame":
              this.main.startGame()
          }
      },
      update: function() {
          ig.global.wm || !0 != this.main.gamePaused && this.parent()
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.tweenF("ready")
      },
      preRender: function() {
          !0 != ig.game.played && (this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.READY,
              x: this.readyText.x + this.readyText.offX,
              y: this.readyText.y + this.readyText.offY + 2,
              stroke: !0,
              strokeColour: this.strokeGrad,
              strokeLine: 8,
              col: "#92551c",
              scX: this.readyText.scX,
              scY: this.readyText.scY,
              alp: this.readyText.alp,
              strokeAlp: this.readyText.alp
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.READY,
              x: this.readyText.x + this.readyText.offX,
              y: this.readyText.y + this.readyText.offY,
              stroke: !0,
              strokeColour: this.strokeGrad,
              strokeLine: this.strokeSize,
              col: "#92551c",
              scX: this.readyText.scX,
              scY: this.readyText.scY,
              alp: this.readyText.alp,
              strokeAlp: this.readyText.alp
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.READY,
              x: this.readyText.x + this.readyText.offX,
              y: this.readyText.y + this.readyText.offY - 1,
              stroke: !0,
              strokeColour: this.strokeGrad,
              strokeLine: this.strokeSize,
              col: this.shadowGrad,
              scX: this.readyText.scX,
              scY: this.readyText.scY,
              alp: this.readyText.alp,
              strokeAlp: this.readyText.alp
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.READY,
              x: this.readyText.x + this.readyText.offX - 1,
              y: this.readyText.y + this.readyText.offY,
              col: this.grad,
              scX: this.readyText.scX,
              scY: this.readyText.scY,
              alp: this.readyText.alp
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.GO,
              x: this.goText.x + this.goText.offX,
              y: this.goText.y + this.goText.offY + 2,
              stroke: !0,
              strokeColour: this.strokeGrad,
              strokeLine: this.strokeSize,
              col: "#92551c",
              scX: this.goText.scX,
              scY: this.goText.scY,
              alp: this.goText.alp,
              strokeAlp: this.goText.alp
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.GO,
              x: this.goText.x + this.goText.offX,
              y: this.goText.y + this.goText.offY,
              stroke: !0,
              strokeColour: this.strokeGrad,
              strokeLine: this.strokeSize,
              col: "#92551c",
              scX: this.goText.scX,
              scY: this.goText.scY,
              alp: this.goText.alp,
              strokeAlp: this.goText.alp
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.GO,
              x: this.goText.x + this.goText.offX,
              y: this.goText.y + this.goText.offY - 1,
              stroke: !0,
              strokeColour: this.strokeGrad,
              strokeLine: this.strokeSize,
              col: this.shadowGrad,
              scX: this.goText.scX,
              scY: this.goText.scY,
              alp: this.goText.alp,
              strokeAlp: this.goText.alp
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: this.textSize,
              tx: _STRINGS.Game.GO,
              x: this.goText.x + this.goText.offX - 1,
              y: this.goText.y + this.goText.offY,
              col: this.grad,
              scX: this.goText.scX,
              scY: this.goText.scY,
              alp: this.goText.alp
          }),
          this.readyText = {
              seq: 0,
              x: 240,
              y: 50,
              scX: 1,
              scY: 1,
              alp: 1,
              offX: 0,
              offY: 0,
              rot: 0
          },
          this.goText = {
              seq: 0,
              x: 240,
              y: 150,
              scX: 1,
              scY: 1,
              alp: 1,
              offX: 0,
              offY: 0,
              rot: 0
          })
      },
      draw: function() {
          this.parent();
          ig.global.wm || (this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.goText.x + this.goText.offX,
              y: this.goText.y + this.goText.offY + 2,
              scX: this.goText.scX,
              scY: this.goText.scY,
              alp: this.goText.alp,
              sx: 40,
              sy: 100,
              sw: 400,
              sh: 100,
              cent: !0
          }),
          this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.readyText.x + this.readyText.offX,
              y: this.readyText.y + this.readyText.offY + 2,
              scX: this.readyText.scX,
              scY: this.readyText.scY,
              alp: this.readyText.alp,
              sx: 40,
              sy: 0,
              sw: 400,
              sh: 100,
              cent: !0
          }))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-over").requires("game.entities.plain").defines(function() {
  EntityPlainOver = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 3E3,
      h: 600,
      w: 800,
      sc: 2,
      offY: -500,
      size: {
          x: 50,
          y: 50
      },
      gameOver: !1,
      gamePaused: !1,
      bgIm: new ig.Image("media/graphics/sprites/bg.png"),
      rect: {
          alp: 0,
          targAlp: 0.5,
          colour: "black"
      },
      boardIm: new ig.Image("media/graphics/sprites/board.png"),
      buttons: [],
      starIm: new ig.Image("media/graphics/sprites/rank-big.png"),
      baseIm: new ig.Image("media/graphics/sprites/rank-base-big.png"),
      headerIm: new ig.Image("media/graphics/sprites/header.png"),
      slotIm: new ig.Image("media/graphics/sprites/text-base.png"),
      task: "unpause",
      textGap: 30,
      winGap: 30,
      loseGap: 35,
      win: !0,
      tx: [],
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.main = d.main,
          this.tx[0] = this.main.score,
          this.tx[1] = this.main.score,
          this.tx[2] = this.main.score,
          this.spawner(),
          this.board = {
              x: ig.system.width / 2,
              y: 300,
              offX: 0,
              offY: 0,
              scX: 0,
              scY: 0
          },
          this.header = {
              x: 0,
              y: -100,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1
          },
          this.title = {
              x: 0,
              y: -5,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1,
              grad1: -20,
              grad2: 0
          },
          this.slot0 = {
              textX: -38,
              x: 50,
              y: 20,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1,
              grad1: -20,
              grad2: 0,
              col: "#553600",
              align: "right",
              tx: _STRINGS.Game.Score
          },
          this.slot1 = {
              textX: -50,
              x: 50,
              y: this.slot0.y + 33,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1,
              grad1: -20,
              grad2: 0,
              tx: _STRINGS.Game.Highscore
          },
          this.slot2 = {
              textX: -50,
              x: 50,
              y: this.slot0.y + 60,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1,
              grad1: -20,
              grad2: 0,
              tx: _STRINGS.Game.Coin
          },
          this.star0 = {
              x: -70,
              y: -43,
              offX: 0,
              offY: 0,
              sc: 0,
              oriSc: 0.8,
              grad1: -20,
              grad2: 0,
              im: this.baseIm,
              rot: 0,
              delay: 0
          },
          this.star1 = {
              x: 0,
              y: -43,
              offX: 0,
              offY: 0,
              sc: 0,
              oriSc: 0.8,
              grad1: -20,
              grad2: 0,
              im: this.baseIm,
              rot: 0,
              delay: 0.1
          },
          this.star2 = {
              x: 70,
              y: -43,
              offX: 0,
              offY: 0,
              sc: 0,
              oriSc: 0.8,
              grad1: -20,
              grad2: 0,
              im: this.baseIm,
              rot: 0,
              delay: 0.2
          },
          this.title.grad = this.ctx.createLinearGradient(0, this.title.grad1, 0, this.title.grad2),
          this.title.grad.addColorStop(0, "#febc41"),
          this.title.grad.addColorStop(0.3, "#fe802b"),
          this.title.grad.addColorStop(0.6, "#fe623a"),
          this.title.grad.addColorStop(0.8, "#ff3d0a"),
          this.title.grad.addColorStop(1, "#fe623a"),
          this.renderText())
      },
      spawner: function() {},
      tweenF: function(b, c) {
          switch (b) {
          case "pauseFadeIn":
              for (var d = 0; d < this.buttons.length; d++)
                  this.buttons[d].menu = this,
                  this.buttons[d].zIndex = 3002,
                  this.buttons[d].oriPos.y += 20,
                  ig.game.sortEntitiesDeferred();
              this.calculateStar();
              this.tweening = !0;
              this.tweener("rect", {
                  alp: this.rect.targAlp
              }, 0.3, "boardfadeIn");
              break;
          case "boardfadeIn":
              this.tweener("this", {
                  offY: 50
              }, 0.4, "boardfadeIn2");
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.3, "boardSize4");
              break;
          case "boardSize2":
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.1, "boardSize3");
              break;
          case "boardSize3":
              this.tweener("board", {
                  scX: 0.95,
                  scY: 1.05
              }, 0.1, "boardSize4");
              break;
          case "boardSize4":
              this.tweener("board", {
                  scX: 1,
                  scY: 1
              }, 0.3);
              break;
          case "boardfadeIn2":
              !1 == this.win ? this.sounder("over") : this.sounder("win");
              this.tweener("this", {
                  offY: 0
              }, 0.3, "donefadeIn");
              for (d = 0; d < this.buttons.length; d++)
                  this.buttons[d].tweenF("fadeIn");
              for (d = 0; 3 > d; d++)
                  this.tweener("star" + d, {
                      sc: 1.2
                  }, 0.2, "star2", this["star" + d].delay);
              break;
          case "star2":
              this.tweener(c, {
                  sc: 1
              }, 0.11);
              break;
          case "donefadeIn":
              this.tweening = !1;
              break;
          case "pauseFadeOut":
              this.tweening = !0;
              for (d = 0; d < this.buttons.length; d++)
                  this.buttons[d].tweenF("fadeOut");
              this.tweener("this", {
                  offY: 50
              }, 0.3, "boardfadeOut2");
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.3, "boardSizeOut");
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0.95,
                  scY: 1.1
              }, 0.3, "boardSizeOut2");
              this.tweener("rect", {
                  alp: 0
              }, 0.3);
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0,
                  scY: 0
              }, 0.3);
              break;
          case "boardfadeOut2":
              this.tweener("this", {
                  offY: -500
              }, 0.3, "donefadeOut");
              break;
          case "donefadeOut":
              this.tweening = !1,
              this.runTask()
          }
      },
      calculateStar: function() {
          !1 != this.win && (this.main.score >= this.main.starScore[0] && (this.star0.im = this.starIm),
          this.main.score >= this.main.starScore[1] && (this.star1.im = this.starIm),
          this.main.score >= this.main.starScore[2] && (this.star2.im = this.starIm))
      },
      update: function() {
          ig.global.wm || this.parent()
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.buttons = [ig.game.getEntitiesByType(EntityMenuBut)[0], ig.game.getEntitiesByType(EntityReplayBut)[0], ig.game.getEntitiesByType(EntityProceedBut)[0]]
      },
      runTask: function() {
          switch (this.task) {
          case "unpause":
              this.main.gamePaused = !1;
              break;
          case "replay":
              ig.game.director.jumpTo(LevelGame);
              break;
          case "next":
              !0 == this.win && 23 > ig.game.lvl && ig.game.lvl++;
              ig.game.director.jumpTo(LevelGame);
              break;
          case "home":
              this.main.gamePaused = !1,
              ig.game.showLvlMenu = !0,
              ig.game.director.jumpTo(LevelHome)
          }
      },
      renderText: function() {
          !0 != ig.game.played && (this.textDraw({
              ctx: ig.game.hidCtx,
              px: 28,
              tx: _STRINGS.Game.You,
              x: 630,
              y: 20,
              stroke: !0,
              strokeColour: "#6a4013",
              strokeLine: 6,
              col: this.title.grad,
              scX: 0.85,
              scY: 0.85
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 28,
              tx: _STRINGS.Game.Win,
              x: 730,
              y: 20,
              stroke: !0,
              strokeColour: "#6a4013",
              strokeLine: 6,
              col: this.title.grad,
              scX: 0.85,
              scY: 0.85
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 28,
              tx: _STRINGS.Game.Lose,
              x: 830,
              y: 20,
              stroke: !0,
              strokeColour: "#6a4013",
              strokeLine: 6,
              col: this.title.grad,
              scX: 0.85,
              scY: 0.85
          }))
      },
      draw: function() {
          this.parent();
          if (!ig.global.wm && !1 != this.main.gameOver) {
              this.ctx.fillStyle = this.rect.colour;
              this.ctx.globalAlpha = this.rect.alp;
              this.ctx.fillRect(0, 0, ig.system.width, ig.system.height);
              this.drawer({
                  x: this.board.x,
                  y: this.board.y + this.offY,
                  cent: !0,
                  scX: this.board.scX,
                  scY: this.board.scY,
                  pic: this.boardIm
              });
              this.drawer({
                  x: this.board.x + this.header.x,
                  y: this.board.y + this.header.y + this.offY,
                  cent: !0,
                  scX: this.board.scX * this.header.scX,
                  scY: this.board.scY * this.header.scY,
                  pic: this.headerIm
              });
              this.ctxDrawer({
                  pic: ig.game.hidEle,
                  x: this.board.x + this.header.x - this.textGap,
                  y: this.board.y + this.header.y + this.title.y + this.offY,
                  sx: 580,
                  sy: 0,
                  sw: 100,
                  sh: 40,
                  cent: !0
              });
              this.ctxDrawer({
                  pic: ig.game.hidEle,
                  x: this.board.x + this.header.x + this.textGap,
                  y: this.board.y + this.header.y + this.title.y + this.offY,
                  sx: !0 == this.win ? 680 : 780,
                  sy: 0,
                  sw: 100,
                  sh: 40,
                  cent: !0
              });
              for (var b = 0; 2 > b; b++)
                  this.drawer({
                      x: this.board.x + this["slot" + b].x,
                      y: this.board.y + this["slot" + b].y + this.offY,
                      cent: !0,
                      scX: this.board.scX,
                      scY: this.board.scY,
                      pic: this.slotIm
                  }),
                  this.textDraw({
                      px: 14,
                      tx: this["slot" + b].tx,
                      x: this.board.x + this.slot0.textX,
                      y: this.board.y + this["slot" + b].y + this.offY - 1,
                      col: this.slot0.col,
                      scX: 1,
                      scY: 1,
                      align: this.slot0.align
                  }),
                  this.textDraw({
                      px: 14,
                      tx: Math.floor(this.tx[b]),
                      x: this.board.x + this["slot" + b].x,
                      y: this.board.y + this["slot" + b].y + this.offY - 1,
                      col: "white",
                      scX: 1,
                      scY: 1
                  });
              for (b = 0; 3 > b; b++)
                  this.drawer({
                      x: this.board.x + this["star" + b].x,
                      y: this.board.y + this["star" + b].y + this.offY + 10,
                      cent: !0,
                      scX: this.board.scX * this["star" + b].sc * this["star" + b].oriSc,
                      scY: this.board.scY * this["star" + b].sc * this["star" + b].oriSc,
                      pic: this["star" + b].im,
                      rot: this["star" + b].rot
                  })
          }
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-count").requires("game.entities.plain").defines(function() {
  EntityPlainCount = EntityPlain.extend({
      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,
      zIndex: 2003,
      gravityFactor: 1,
      vel: {
          x: 50,
          y: -200
      },
      sheetX: 8,
      sheetY: 4,
      im: new ig.Image("media/graphics/sprites/bubbles.png"),
      drawBurst: !1,
      burstFrame: 0,
      burstEndFrame: 48,
      burst: {
          frame: 0,
          frameTime: 0.012
      },
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.burst.frameTimer = new ig.Timer,
          this.popTime = 0.6 + 0.3 * Math.random(),
          this.popTimer = new ig.Timer,
          this.main = d.main,
          this.aniStuff(),
          this.vel.x = 350 * Math.random(),
          this.vel.y = -(700 + 300 * Math.random()),
          this.accel.x = -500 + 1E3 * Math.random())
      },
      update: function() {
          this.parent();
          this.popTimer.delta() > this.popTime && !1 == this.drawBurst && (this.main.soundLooper("bubble"),
          this.drawBurst = !0,
          this.vel.x = 0,
          this.vel.y = 0,
          this.accel.x = 0,
          this.gravityFactor = this.accel.y = 0)
      },
      drawBurstStuff: function() {
          this.burst.frame < this.burstEndFrame ? (void 0 != ig.game.burstRender.frames[this.burst.frame] && this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.pos.x + this.size.x / 2,
              y: this.pos.y + this.size.y / 2,
              sx: ig.game.burstRender.frames[Math.floor(this.burst.frame)].sx,
              sy: ig.game.burstRender.frames[Math.floor(this.burst.frame)].sy,
              sw: 60,
              sh: 60,
              cent: !0
          }),
          this.burst.frameTimer.delta() > this.burst.frameTime && (this.burst.frameTimer.reset(),
          this.burst.frame++)) : this.kill()
      },
      draw: function() {
          !0 == this.drawBurst ? this.drawBurstStuff() : this.parent()
      },
      bubbleTypeRegen: function() {
          -1 < this.which.indexOf("baby") ? (this.refType = "baby",
          this.refColour = this.which.replace("baby", "")) : this.main.bubbleColours.indexOf(this.which) ? (this.refType = "normal",
          this.refColour = this.which) : (this.refType = this.which,
          this.refColour = "none");
          this.currentAnim = this.anims[this.which]
      },
      aniStuff: function() {
          this.animSheet = new ig.AnimationSheet(this.im.path,this.im.width / this.sheetX,this.im.height / this.sheetY);
          this.size.x = (this.animSheet.width - 4) * this.sc.x;
          this.size.y = (this.animSheet.height - 8) * this.sc.y;
          this.addAnim("red", 0.1, [0], !0);
          this.addAnim("orange", 0.1, [1], !0);
          this.addAnim("yellow", 0.1, [2], !0);
          this.addAnim("green", 0.1, [3], !0);
          this.addAnim("cyan", 0.1, [4], !0);
          this.addAnim("blue", 0.1, [5], !0);
          this.addAnim("purple", 0.1, [6], !0);
          this.addAnim("pink", 0.1, [7], !0);
          this.addAnim("super", 0.05, [19], !1);
          this.addAnim("babyred", 0.1, [8], !0);
          this.addAnim("babyorange", 0.1, [9], !0);
          this.addAnim("babyyellow", 0.1, [10], !0);
          this.addAnim("babygreen", 0.1, [11], !0);
          this.addAnim("babycyan", 0.1, [12], !0);
          this.addAnim("babyblue", 0.1, [13], !0);
          this.addAnim("babypurple", 0.1, [14], !0);
          this.addAnim("babypink", 0.1, [15], !0);
          this.addAnim("ice", 0.1, [16], !0);
          this.addAnim("right", 0.1, [17], !0);
          this.addAnim("up", 0.1, [18], !0);
          this.addAnim("rainbow", 0.1, [19], !0);
          this.addAnim("thunder", 0.1, [20], !0);
          this.addAnim("star", 0.1, [21], !0);
          this.addAnim("time", 0.1, [22], !0);
          this.addAnim("bomb", 0.1, [23], !0);
          this.addAnim("steel", 0.1, [24], !0);
          this.addAnim("evil", 0.1, [25], !0);
          this.addAnim("wood", 0.1, [26], !0);
          this.addAnim("guide", 0.1, [27], !0);
          this.addAnim("change", 0.1, [28], !0);
          this.addAnim("pick", 0.1, [29], !0);
          this.addAnim("search", 0.1, [30], !0);
          this.addAnim("armo", 0.1, [31], !0);
          this.currentAnim = this.anims[this.which]
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-game").requires("game.entities.plain", "game.entities.plain-tile", "game.entities.plain-gui", "game.entities.plain-tut", "game.entities.plain-stage", "game.entities.plain-shooter", "game.entities.plain-menu-but", "game.entities.plain-but", "game.entities.plain-pause", "game.entities.plain-level-box", "game.entities.plain-ready", "game.entities.plain-over", "game.entities.plain-count").defines(function() {
  EntityPlainGame = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 1,
      h: 600,
      w: 800,
      score: 0,
      star: 0,
      countSound: !1,
      choice: [0, 1, 2, 3, "plus0", "plus1", "plus2", "plus3", "minus0", "minus1", "minus2", "minus3", "evil", "wood", "ice", "star", "thunder"],
      tutOn: !1,
      sLoop: {
          bubble: {
              duration: 0.05
          },
          hehe: {
              duration: 0.5
          },
          count: {
              duration: 0.05
          }
      },
      scoreSc: 1,
      sc: 2,
      size: {
          x: 50,
          y: 50
      },
      gameOver: !1,
      gamePaused: !1,
      gameStarted: !1,
      doneOver: !1,
      totalBaby: 0,
      babyRescued: 0,
      burstScore: 10,
      allowShoot: !0,
      armoCombo: 0,
      popAll: {
          done: !1,
          total: 0,
          killed: -1,
          combo: 0
      },
      dropAll: {
          done: !1,
          total: 0,
          killed: -1,
          combo: 0
      },
      showCombo: !0,
      doneCombo: !0,
      combo: 0,
      countDown: 0,
      noArmo: !1,
      bgIm: new ig.Image("media/graphics/sprites/bg.png"),
      rowOffset: 1,
      tiles: [],
      bubbleTypes: "red orange yellow green cyan blue purple pink babyred babyorange babyyellow babygreen babycyan babyblue babypurple babypink left right up rainbow thunder star time bomb steel steelglow wood guide change pick search armo super".split(" "),
      bubbleColours: "red orange yellow green cyan blue purple pink super".split(" "),
      colourSet: [],
      floorIm: new ig.Image("media/graphics/sprites/floor.png"),
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          ig.game.redraw = !0,
          ig.game.getMusic(),
          ig.game.getSound(),
          this.hidCtx = ig.game.hidCtx,
          ig.game.gravity = 1E3,
          this.colourSet = _LVL["lvl" + ig.game.lvl].colourSet[Math.floor(Math.random() * _LVL["lvl" + ig.game.lvl].colourSet.length)],
          this.levelStat = _LVL["lvl" + ig.game.lvl],
          this.armo = this.levelStat.armo,
          this.armoExtra = this.levelStat.armoExtra,
          this.starScore = this.levelStat.starScore,
          this.map = this.levelStat.map,
          this.spawner())
      },
      spawner: function() {
          ig.game.spawnEntity(EntityPointer, 0, 0, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainStage, 0, 0, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainTut, 259, 387, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainPause, 0, 0, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainOver, 0, 0, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainReady, 0, 0, {
              main: this
          });
          ig.game.spawnEntity(EntityToggleBubbleBut, 97, 556, {
              main: this
          });
          ig.game.spawnEntity(EntityPauseBut, ig.system.width - 55, 10, {
              main: this
          });
          for (var b = 0; b < this.map.length; b++)
              for (var c = 0; c < this.map[b].length; c++)
                  "empty" == this.map[b][c] || void 0 == this.map[b][c] ? this.map[b][c] = void 0 : ig.game.spawnEntity(EntityPlainTile, 0, 0, {
                      main: this,
                      j: b,
                      i: c
                  });
          ig.game.spawnEntity(EntityPlainShooter, 175, 490, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainBubble, 175, 490, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainGui, 0, 0, {
              main: this
          })
      },
      dropBubbles: function(b) {
          b.tweening = !0;
          b.hanging = !1;
          b.vel.y = -(50 * Math.random() + 80);
          b.accel.y = 600;
          b.accel.x = -150 + 300 * Math.random();
          b.zIndex = 101;
          this.tiles[b.tile.y][b.tile.x] = void 0
      },
      genBubbles: function() {},
      bubbleHeight: function() {},
      winDropBubbles: function() {
          this.dropAll.killed = 0;
          this.dropAll.total = 0;
          this.dropAll.done = !1;
          for (var b = ig.game.getEntitiesByType(EntityPlainTile), c = 0; c < b.length; c++) {
              var d = b[c];
              this.scoreVault += 10;
              this.dropAll.total++;
              this.dropBubbles(d)
          }
          this.dropAll.combo = Math.floor(this.dropAll.total / 5) * (55 + 2 * Math.floor(this.dropAll.total / 5));
          this.tweener("this", {
              score: this.score + this.dropAll.combo + this.scoreVault
          }, 0.3, "drawScore");
          0 < this.dropAll.combo && this.gui.tweenF("endDropCombo")
      },
      winGame: function(b) {
          if (!1 != this.over.win)
              switch (b) {
              case "stopGame":
                  if (!0 == this.gameOver)
                      break;
                  this.gameOver = !0;
                  this.countDown = this.bubble.armoLeft;
                  this.armoCombo = 50 * this.countDown;
                  this.winDropBubbles();
                  break;
              case "overScreen":
                  this.over = ig.game.getEntitiesByType(EntityPlainOver)[0],
                  this.over.textGap = this.over.winGap,
                  this.over.tweenF("pauseFadeIn"),
                  this.recordGame(),
                  this.over.tx[0] = this.score,
                  this.over.calculateStar(),
                  this.over.tx[1] = ig.game.levelStat[ig.game.lvl].highScore
              }
      },
      loseGame: function() {
          if (!0 != this.gameOver) {
              this.gameOver = !0;
              this.countDown = this.bubble.armoLeft;
              this.over = ig.game.getEntitiesByType(EntityPlainOver)[0];
              this.over.win = !1;
              this.over.textGap = this.over.loseGap;
              this.over.tweenF("pauseFadeIn");
              this.over.tx[0] = this.score;
              this.over.tx[1] = ig.game.levelStat[ig.game.lvl].highScore;
              this.over.buttons.pop();
              for (var b = 0; b < this.over.buttons.length; b++)
                  this.over.buttons[b].oriPos.x += 43
          }
      },
      startGame: function() {
          this.gameStarted = this.doneCombo = !0
      },
      resetCombo: function() {
          this.popAll.done = !1;
          this.doneCombo = this.showCombo = this.dropAll.done = !1;
          this.popAll.total = 0;
          this.dropAll.total = 0;
          this.popAll.killed = 0;
          this.dropAll.killed = 0;
          this.popAll.combo = 0;
          this.dropAll.combo = 0
      },
      showComboText: function() {
          3 < this.popAll.total && (this.popAll.combo = Math.floor(this.popAll.total / 5) * (50 + 2 * Math.floor(this.popAll.total / 5)));
          this.dropAll.combo = Math.floor(this.dropAll.total / 5) * (55 + 2 * Math.floor(this.dropAll.total / 5));
          3 < this.popAll.total ? this.gui.tweenF("popCombo") : 0 < this.dropAll.combo ? this.gui.tweenF("dropCombo") : this.doneCombo = !0;
          this.tweener("this", {
              score: this.score + this.popAll.combo + this.dropAll.combo + this.scoreVault
          }, 0.3, "drawScore")
      },
      recordGame: function() {
          ig.game.levelStat[ig.game.lvl].highScore < this.score && (ig.game.levelStat[ig.game.lvl].highScore = this.score);
          this.score >= this.starScore[0] && ig.game.levelStat[ig.game.lvl].star < this.star + 1 && (ig.game.levelStat[ig.game.lvl].star = this.star + 1);
          void 0 != ig.game.levelStat[ig.game.lvl + 1] && (ig.game.levelStat[ig.game.lvl + 1].unlocked = !0);
          ig.game.setScore()
      },
      tweenF: function(b) {
          switch (b) {
          case "drawScore":
              this.gui.renderScore();
              break;
          case "countDown":
              0 < this.countDown ? (this.sounder("count"),
              this.countDown--,
              this.score += 50,
              ig.ua.mobile || (this.gui.renderScore(),
              this.gui.renderCount()),
              this.scoreSc = 1.2,
              this.tweener("this", {
                  scoreSc: 1,
                  score: this.score + 50
              }, 0.08, "countDown")) : (this.gui.renderScore(),
              this.gui.tweenF("armoCombo2"),
              this.winGame("overScreen"));
              0 < this.countDown && (ig.game.spawnEntity(EntityPlainCount, 97, 530, {
                  main: this,
                  which: this.bubble.armoVault[this.bubble.armoVault.length - this.countDown]
              }),
              this.bubble.tweenF("gameOver"));
              break;
          case "winGame":
              this.countSound = !1,
              this.gui.renderScore(),
              this.gui.tweenF("armoCombo2"),
              this.winGame("overScreen")
          }
      },
      update: function() {
          !ig.global.wm && !0 != this.gamePaused && (this.parent(),
          !0 == this.countSound && this.soundLooper("count"),
          ig.game.played = !0,
          !1 == this.gameOver ? !1 != this.gameStarted && (!0 == this.popAll.done && !0 == this.dropAll.done ? (this.doneCombo = !0,
          !1 == this.showCombo ? (this.showCombo = !0,
          this.stage.tweenF("triggerPos"),
          this.gui.tweenF("armoPlusUpdate")) : !0 == this.doneCombo && (this.babyRescued == this.totalBaby ? this.winGame("stopGame") : 0 >= this.bubble.armoLeft && (0 >= this.bubble.plusVault - this.bubble.minusVault && this.babyRescued < this.totalBaby) && this.loseGame())) : (!1 == this.popAll.done && this.popAll.total == this.popAll.killed && (this.doneCombo = !0,
          this.popAll.done = !0),
          !1 == this.dropAll.done && this.dropAll.total == this.dropAll.killed && (this.dropAll.done = !0))) : this.dropAll.total == this.dropAll.killed && !1 == this.doneOver && (this.doneOver = !0,
          this.gui.renderScore(),
          this.gui.tweenF("endDropCombo2"),
          !0 == this.over.win && this.tweenF("countDown"),
          this.gui.tweenF("armoCombo")))
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.shooter = ig.game.getEntitiesByType(EntityPlainShooter)[0];
          this.bubble = ig.game.getEntitiesByType(EntityPlainBubble)[0];
          this.gui = ig.game.getEntitiesByType(EntityPlainGui)[0];
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[0];
          this.over = ig.game.getEntitiesByType(EntityPlainOver)[0]
      },
      draw: function() {
          this.parent();
          ig.global.wm || (!0 == ig.game.redraw && this.drawer({
              pic: this.bgIm,
              x: 0,
              y: 0,
              ctx: ig.game.bgCtx
          }),
          this.drawer({
              pic: this.floorIm,
              x: ig.system.width / 2,
              y: this.shooter.shadow.y - 38,
              cent: !0
          }))
      }
  })
});
ig.baked = !0;
ig.module("game.levels.game").requires("impact.image", "game.entities.plain-game").defines(function() {
  LevelGame = {
      entities: [{
          type: "EntityPlainGame",
          x: 0,
          y: 0
      }],
      layer: []
  }
});
ig.baked = !0;
ig.module("game.entities.plain-home-but").requires("game.entities.plain").defines(function() {
  EntityPlainHomeBut = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2040,
      sc: 0,
      mouseSc: 0.95,
      runTask: !1,
      tweening: !1,
      oriPos: {
          x: 0,
          y: 0
      },
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.name = d.name,
          this.menu = d.menu,
          void 0 != this.menu && this.menu.buttons.push(this),
          this.size.x = this.butIm.width,
          this.size.y = this.butIm.height,
          this.oriPos.x = b,
          this.oriPos.y = c,
          this.hide(),
          this.oriStat && this.oriStat())
      },
      clicked: function() {
          this.sc = 0.9;
          this.buttonTask();
          this.sounder("click")
      },
      released: function() {
          !0 != this.tweening && (this.sounder("click"),
          this.sc = 1)
      },
      hide: function() {
          this.pos.x = -200;
          this.pos.y = -200
      },
      show: function() {
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y + this.menu.offY
      },
      tweenF: function(b) {
          switch (b) {
          case "floatUp":
              this.tweener("pos", {
                  y: this.oriPos.y - 5
              }, this.floatTime, "floatDown");
              break;
          case "floatDown":
              this.tweener("pos", {
                  y: this.oriPos.y + 8
              }, this.floatTime, "floatUp")
          }
      },
      update: function() {
          ig.global.wm || (this.parent(),
          !0 != this.tweening && (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95))
      },
      drawInit: function() {},
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
      },
      draw: function() {
          this.parent();
          ig.global.wm || this.drawer({
              pic: this.butIm,
              x: this.pos.x + this.butIm.width / 2,
              y: this.pos.y + this.butIm.height / 2,
              scX: this.oriSc * this.sc * this.mouseSc,
              scY: this.oriSc * this.sc * this.mouseSc,
              cent: !0
          })
      }
  });
  EntityPlayBut = EntityPlainHomeBut.extend({
      oriSc: 0.98,
      zIndex: 1E3,
      floatTime: 0.95,
      butIm: new ig.Image("media/graphics/sprites/start.png"),
      oriStat: function() {
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y;
          this.sc = 1;
          this.tweenF("floatUp")
      },
      clicked: function() {
          this.sc = 0.9;
          this.sounder("click")
      },
      released: function() {
          !0 != this.tweening && (this.sc = 1,
          this.buttonTask())
      },
      buttonTask: function() {
          !0 != this.main.gamePaused && !0 != this.tweening && (this.main.gamePaused = !0,
          this.level = ig.game.getEntitiesByType(EntityPlainLevel)[0],
          this.level.tweenF("rectFadeIn"),
          ig.game.hideOverlay(["more-games"]))
      }
  });
  EntitySettingBut = EntityPlainHomeBut.extend({
      oriSc: 0.98,
      butIm: new ig.Image("media/graphics/sprites/gear.png"),
      zIndex: 1E3,
      floatTime: 0.7,
      oriStat: function() {
          this.pos.x = this.oriPos.x;
          this.pos.y = this.oriPos.y;
          this.sc = 1;
          this.tweenF("floatDown")
      },
      clicked: function() {
          this.sc = 0.9;
          this.sounder("click")
      },
      released: function() {
          !0 != this.tweening && (this.sc = 1,
          this.buttonTask())
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.menu = ig.game.getEntitiesByType(EntityPlainSetting)[0]
      },
      buttonTask: function() {
          !0 != this.main.gamePaused && !0 != this.tweening && (this.main.gamePaused = !0,
          this.menu.tweenF("pauseFadeIn"),
          ig.game.hideOverlay(["more-games"]))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-setting").requires("game.entities.plain", "game.entities.plain-menu-but").defines(function() {
  EntityPlainSetting = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2030,
      size: {
          x: 50,
          y: 50
      },
      task: "unpause",
      pauseRect: {
          alp: 0,
          targAlp: 0.5,
          colour: "black"
      },
      boardIm: new ig.Image("media/graphics/sprites/board.png"),
      musicIm: new ig.Image("media/graphics/sprites/music.png"),
      soundIm: new ig.Image("media/graphics/sprites/sound.png"),
      settingIm: new ig.Image("media/graphics/sprites/setting.png"),
      sliderIm: new ig.Image("media/graphics/sprites/slider.png"),
      headerIm: new ig.Image("media/graphics/sprites/header.png"),
      buttons: [],
      offY: -600,
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.main = d.main,
          ig.game.spawnEntity(EntityCloseBut, 363, 186, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntityMusicKnot, 205, 250, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntitySoundKnot, 205, 311, {
              main: this.main,
              menu: this
          }),
          ig.game.spawnEntity(EntityOkayBut, ig.system.width / 2 - 25, 370, {
              main: this.main,
              menu: this
          }),
          this.board = {
              x: ig.system.width / 2,
              y: 300,
              offX: 0,
              offY: 0,
              scX: 0,
              scY: 0
          },
          this.header = {
              x: 0,
              y: -100,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1
          },
          this.title = {
              x: 0,
              y: -5,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1,
              grad1: -20,
              grad2: 3
          },
          this.title.grad = this.ctx.createLinearGradient(0, this.title.grad1, 0, this.title.grad2),
          this.title.grad.addColorStop(0, "#e6e438"),
          this.title.grad.addColorStop(0.3, "#c2d73a"),
          this.title.grad.addColorStop(1, "#6d8225"),
          this.music = {
              x: -90,
              y: -33,
              lineX: 50,
              lineY: -30,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1
          },
          this.sound = {
              x: -90,
              y: 28,
              lineX: 50,
              lineY: 30,
              offX: 0,
              offY: 0,
              scX: 1,
              scY: 1
          },
          this.renderText())
      },
      tweenF: function(b) {
          switch (b) {
          case "pauseFadeIn":
              this.tweening = !0;
              this.tweener("pauseRect", {
                  alp: this.pauseRect.targAlp
              }, 0.3, "boardfadeIn");
              break;
          case "boardfadeIn":
              this.tweener("this", {
                  offY: 50
              }, 0.3, "boardfadeIn2");
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.1, "boardSize4");
              break;
          case "boardSize2":
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.1, "boardSize3");
              break;
          case "boardSize3":
              this.tweener("board", {
                  scX: 0.95,
                  scY: 1.05
              }, 0.1, "boardSize4");
              break;
          case "boardSize4":
              this.tweener("board", {
                  scX: 1,
                  scY: 1
              }, 0.1);
              break;
          case "boardfadeIn2":
              this.tweener("this", {
                  offY: 0
              }, 0.3, "donefadeIn");
              for (b = 0; b < this.buttons.length; b++)
                  this.buttons[b].tweenF("fadeIn");
              break;
          case "donefadeIn":
              this.tweening = !1;
              break;
          case "pauseFadeOut":
              this.tweening = !0;
              for (b = 0; b < this.buttons.length; b++)
                  this.buttons[b].tweenF("fadeOut");
              this.tweener("this", {
                  offY: 50
              }, 0.3, "boardfadeOut2");
              this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.3, "boardSizeOut");
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0.95,
                  scY: 1.1
              }, 0.3, "boardSizeOut2");
              this.tweener("pauseRect", {
                  alp: 0
              }, 0.3);
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0,
                  scY: 0
              }, 0.3);
              break;
          case "boardfadeOut2":
              this.tweener("this", {
                  offY: -500
              }, 0.3, "donefadeOut");
              break;
          case "donefadeOut":
              this.tweening = !1,
              this.runTask()
          }
      },
      runTask: function() {
          switch (this.task) {
          case "unpause":
              this.main.gamePaused = !1;
              ig.game.showOverlay(["more-games"]);
              break;
          case "replay":
              ig.game.director.jumpTo(LevelGame);
              break;
          case "home":
              this.main.gamePaused = !1,
              ig.game.director.jumpTo(LevelHome)
          }
      },
      update: function() {
          ig.global.wm || this.parent()
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          this.buttons = [ig.game.getEntitiesByType(EntitySoundKnot)[0], ig.game.getEntitiesByType(EntityMusicKnot)[0], ig.game.getEntitiesByType(EntityOkayBut)[0], ig.game.getEntitiesByType(EntityCloseBut)[0]];
          for (var b = 0; b < this.buttons.length; b++)
              this.buttons[b].menu = this
      },
      renderText: function() {
          !0 != ig.game.played && this.textDraw({
              ctx: ig.game.hidCtx,
              px: 28,
              tx: _STRINGS.Game.Settings,
              x: 560,
              y: 70,
              stroke: !0,
              strokeColour: "#56612f",
              strokeLine: 6,
              col: this.title.grad
          })
      },
      draw: function() {
          this.parent();
          ig.global.wm || (!0 == this.main.gamePaused && (this.ctx.fillStyle = this.pauseRect.colour,
          this.ctx.globalAlpha = this.pauseRect.alp,
          this.ctx.fillRect(0, 0, ig.system.width, ig.system.height)),
          this.drawer({
              x: this.board.x,
              y: this.board.y + this.offY,
              cent: !0,
              scX: this.board.scX,
              scY: this.board.scY,
              pic: this.settingIm
          }),
          this.drawer({
              x: this.board.x + this.header.x,
              y: this.board.y + this.header.y + this.offY,
              cent: !0,
              scX: this.board.scX * this.header.scX,
              scY: this.board.scY * this.header.scY,
              pic: this.headerIm
          }),
          this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.board.x + this.header.x,
              y: this.board.y + this.header.y + this.title.y + this.offY,
              sx: 480,
              sy: 50,
              sw: 160,
              sh: 40,
              cent: !0
          }),
          this.drawer({
              x: this.board.x + this.music.lineX,
              y: this.board.y + this.music.lineY + this.offY,
              cent: !0,
              scX: this.board.scX * this.music.scX,
              scY: this.board.scY * this.music.scY,
              pic: this.sliderIm
          }),
          this.textDraw({
              px: 20,
              tx: _STRINGS.Game.Music,
              x: this.board.x + this.music.x,
              y: this.board.y + this.music.y + this.offY,
              col: "#4d3200"
          }),
          this.drawer({
              x: this.board.x + this.sound.lineX,
              y: this.board.y + this.sound.lineY + this.offY,
              cent: !0,
              scX: this.board.scX * this.sound.scX,
              scY: this.board.scY * this.sound.scY,
              pic: this.sliderIm
          }),
          this.textDraw({
              px: 20,
              tx: _STRINGS.Game.Sound,
              x: this.board.x + this.sound.x,
              y: this.board.y + this.sound.y + this.offY,
              col: "#4d3200"
          }))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-level").requires("game.entities.plain", "game.entities.plain-menu-but", "game.entities.plain-level-box").defines(function() {
  EntityPlainLevel = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 2030,
      size: {
          x: 50,
          y: 50
      },
      page: 1,
      drawing: !1,
      task: "unpause",
      fadeRect: {
          alp: 0,
          targAlp: 0.5,
          colour: "black"
      },
      boardIm: new ig.Image("media/graphics/sprites/board.png"),
      headerIm: new ig.Image("media/graphics/sprites/header.png"),
      settingIm: new ig.Image("media/graphics/sprites/setting.png"),
      buttons: [],
      offY: -600,
      init: function(b, c, d) {
          if (!ig.global.wm) {
              this.parent(b, c, d);
              this.main = d.main;
              ig.game.spawnEntity(EntityLevelCloseBut, 363, 186, {
                  main: this.main,
                  menu: this
              });
              ig.game.spawnEntity(EntityLevelNextBut, 379, 272, {
                  main: this.main,
                  menu: this
              });
              ig.game.spawnEntity(EntityLevelPrevBut, 70, 272, {
                  main: this.main,
                  menu: this
              });
              this.board = {
                  x: ig.system.width / 2,
                  y: 300,
                  offX: 0,
                  offY: 0,
                  scX: 0,
                  scY: 0
              };
              this.header = {
                  x: 0,
                  y: -115,
                  offX: 0,
                  offY: 0,
                  scX: 1,
                  scY: 1
              };
              this.title = {
                  x: 0,
                  y: -5,
                  offX: 0,
                  offY: 0,
                  scX: 1,
                  scY: 1,
                  grad1: -20,
                  grad2: 3
              };
              this.title.grad = this.ctx.createLinearGradient(0, this.title.grad1, 0, this.title.grad2);
              this.title.grad.addColorStop(0, "#e6e438");
              this.title.grad.addColorStop(0.3, "#c2d73a");
              this.title.grad.addColorStop(1, "#6d8225");
              for (c = b = 0; 3 > c; c++)
                  for (d = 0; 4 > d; d++)
                      ig.game.spawnEntity(EntityPlainLevelBox, ig.system.width / 2 - 120 + 60 * d, 0.52 * ig.system.height - 130 + 65 * c, {
                          main: this,
                          level: b
                      }),
                      b++;
              this.renderText();
              ig.ua.mobile && (this.board.scX = 1,
              this.board.scY = 1)
          }
      },
      tweenF: function(b) {
          switch (b) {
          case "rectFadeIn":
              this.tweening = !0;
              this.tweener("fadeRect", {
                  alp: this.fadeRect.targAlp
              }, 0.3, "boardfadeIn");
              break;
          case "boardfadeIn":
              this.drawing = !0;
              this.tweener("this", {
                  offY: 50
              }, 0.3, "boardfadeIn2");
              ig.ua.mobile || this.tweener("board", {
                  scX: 0.9,
                  scY: 1.1
              }, 0.3, "boardSize2");
              break;
          case "boardfadeIn2":
              this.tweener("this", {
                  offY: 0
              }, 0.3, "donefadeIn");
              for (b = 0; b < this.buttons.length; b++)
                  this.buttons[b].tweenF("fadeIn");
              break;
          case "donefadeIn":
              this.tweening = !1;
              break;
          case "boardSize2":
              this.tweener("board", {
                  scX: 1,
                  scY: 1
              }, 0.3);
              break;
          case "pauseFadeOut":
              this.tweening = !0;
              for (b = 0; b < this.buttons.length; b++)
                  this.buttons[b].tweenF("fadeOut");
              this.tweener("this", {
                  offY: 50
              }, 0.3, "boardfadeOut2");
              ig.ua.mobile || this.tweener("board", {
                  scX: 1.1,
                  scY: 0.9
              }, 0.3, "boardSizeOut");
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0.95,
                  scY: 1.1
              }, 0.3, "boardSizeOut2");
              break;
          case "boardSizeOut":
              this.tweener("board", {
                  scX: 0,
                  scY: 0
              }, 0.3);
              break;
          case "boardfadeOut2":
              this.tweener("this", {
                  offY: -500
              }, 0.3, "donefadeOut");
              this.tweener("fadeRect", {
                  alp: 0
              }, 0.3);
              break;
          case "donefadeOut":
              this.tweening = !1,
              this.runTask()
          }
      },
      runTask: function() {
          switch (this.task) {
          case "unpause":
              this.main.gamePaused = !1;
              ig.game.showOverlay(["more-games"]);
              break;
          case "replay":
              ig.game.director.jumpTo(LevelGame);
              break;
          case "home":
              this.main.gamePaused = !1,
              ig.game.director.jumpTo(LevelHome)
          }
      },
      update: function() {
          ig.global.wm || this.parent()
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
      },
      renderText: function() {
          !0 != ig.game.played && this.textDraw({
              ctx: ig.game.hidCtx,
              px: 28,
              tx: _STRINGS.Game.Levels,
              x: 740,
              y: 70,
              stroke: !0,
              strokeColour: "#56612f",
              strokeLine: 6,
              col: this.title.grad
          })
      },
      draw: function() {
          this.parent();
          !ig.global.wm && !1 != this.drawing && (this.ctx.fillStyle = this.fadeRect.colour,
          this.ctx.globalAlpha = this.fadeRect.alp,
          this.ctx.fillRect(0, 0, ig.system.width, ig.system.height),
          this.drawer({
              x: this.board.x,
              y: this.board.y + this.offY,
              cent: !0,
              scX: this.board.scX,
              scY: this.board.scY,
              pic: this.boardIm
          }),
          this.drawer({
              x: this.board.x + this.header.x,
              y: this.board.y + this.header.y + this.offY,
              cent: !0,
              scX: this.board.scX * this.header.scX,
              scY: this.board.scY * this.header.scY,
              pic: this.headerIm
          }),
          this.ctxDrawer({
              pic: ig.game.hidEle,
              x: this.board.x + this.header.x,
              y: this.board.y + this.header.y + this.title.y + this.offY,
              sx: 660,
              sy: 50,
              sw: 160,
              sh: 40,
              cent: !0
          }))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-renderer").requires("game.entities.plain").defines(function() {
  EntityPlainRenderer = EntityPlain.extend({
      type: ig.Entity.TYPE.B,
      zIndex: 3030,
      w: 800,
      sc: 2,
      startRendered: !1,
      burstFrame: 0,
      iceFrame: 0,
      off: {
          x: 0,
          y: 0
      },
      size: {
          x: 50,
          y: 50
      },
      sc: {
          x: 1,
          y: 1
      },
      star: {
          sc: 1,
          alp: 1,
          rot: 0
      },
      iceStar: {
          sc: 1,
          alp: 1,
          rot: 0
      },
      iceRing: {
          sc: 1,
          alp: 1,
          rot: 0
      },
      iceBubble: {
          sc: 0,
          alp: 0
      },
      ring: {
          sc: 0,
          alp: 1,
          rot: 0
      },
      blop: {
          sc: 0.1,
          alp: 1,
          rot: 0
      },
      light: {
          sc: 0,
          alp: 1,
          rot: 0,
          offX: 0,
          offY: 0
      },
      light2: {
          sc: 0,
          alp: 1,
          rot: 0,
          offX: 0,
          offY: 0
      },
      light3: {
          sc: 0,
          alp: 0.8,
          rot: 0,
          offX: 0,
          offY: 0
      },
      burstIm: new ig.Image("media/graphics/sprites/burst.png"),
      starIm1: new ig.Image("media/graphics/sprites/star1.png"),
      starIm2: new ig.Image("media/graphics/sprites/star2.png"),
      starIm3: new ig.Image("media/graphics/sprites/star3.png"),
      starIm4: new ig.Image("media/graphics/sprites/star4.png"),
      lightIm1: new ig.Image("media/graphics/sprites/light1.png"),
      lightIm2: new ig.Image("media/graphics/sprites/light2.png"),
      lightIm3: new ig.Image("media/graphics/sprites/light3.png"),
      lightIm4: new ig.Image("media/graphics/sprites/light4.png"),
      ringIm: new ig.Image("media/graphics/sprites/ring.png"),
      scoreChoice: {
          normal: {
              where: 0,
              tx: "10",
              sx: 5,
              sy: 205,
              sw: 50,
              sh: 50
          },
          plus: {
              where: 1,
              tx: "+3",
              sx: 65,
              sy: 205,
              sw: 50,
              sh: 50
          },
          minus: {
              where: 2,
              tx: "-3",
              sx: 125,
              sy: 205,
              sw: 50,
              sh: 50
          }
      },
      score: {
          sc: 0,
          alp: 0,
          gradp1: -10,
          gradp2: 0,
          offY: 0,
          tx: "normal"
      },
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          this.main = d.main,
          this.score.grad = this.ctx.createLinearGradient(0, this.score.gradp1, 0, this.score.gradp2),
          this.score.grad.addColorStop(0, "#fef1ba"),
          this.score.grad.addColorStop(1, "white"),
          this.scoreChoice.plus.grad = this.ctx.createLinearGradient(0, this.score.gradp1, 0, this.score.gradp2 + 10),
          this.scoreChoice.plus.grad.addColorStop(0, "#e6e438"),
          this.scoreChoice.plus.grad.addColorStop(0.3, "#c2d73a"),
          this.scoreChoice.plus.grad.addColorStop(1, "#6d8225"),
          this.scoreChoice.plus.strokeCol = "#92551c",
          this.scoreChoice.minus.grad = this.ctx.createLinearGradient(0, this.score.gradp1, 0, this.score.gradp2 + 10),
          this.scoreChoice.minus.grad.addColorStop(0, "#ff9c00"),
          this.scoreChoice.minus.grad.addColorStop(1, "#e80000"),
          this.scoreChoice.minus.strokeCol = "#a02f2f",
          this.preRenderText(),
          this.renderTile())
      },
      renderTile: function() {
          !0 != ig.game.played && !1 == ig.game.burstRender.done && (this.startRendered = !0,
          this.tweenF("preRenderBurst"),
          this.tweenF("preRenderIce"))
      },
      tweenF: function(b, c) {
          switch (b) {
          case "preRenderBurst":
              this.tweener("score", {
                  sc: 1,
                  alp: 1
              }, 0.1, "scoreFadeOutRender", 0.2);
              this.tweener("ring", {
                  sc: 0,
                  alp: 0.5
              }, 0.3);
              this.tweener("star", {
                  sc: 0.6,
                  rot: 280,
                  alp: 1
              }, 0.15, "lightFadeOut");
              this.tweener("blop", {
                  sc: 1.2
              }, 0.1, "blop2");
              this.tweener("light", {
                  sc: 2,
                  offX: 18,
                  offY: -15,
                  rot: 280,
                  alp: 0.3
              }, 0.1, "light-2", 0.1);
              this.tweener("light2", {
                  sc: 1.5,
                  offX: -16,
                  offY: 15,
                  rot: 180,
                  alp: 0.3
              }, 0.15, "light2-2", 0.2);
              this.tweener("light3", {
                  sc: 1,
                  offX: -14,
                  offY: -15,
                  rot: 130,
                  alp: 0.3
              }, 0.05, "light3-2", 0.3);
              break;
          case "scoreFadeOutRender":
              this.tweener("score", {
                  alp: 0
              }, 0.1, "doneRender", 0.4);
              break;
          case "doneRender":
              !1 == ig.game.burstRender.done && (ig.game.burstRender.done = !0,
              ig.game.burstEndFrame = ig.game.burstRender.frames.length);
              break;
          case "light-2":
              this.tweener("light", {
                  sc: 0.3,
                  offX: 30,
                  offY: 5,
                  rot: 360,
                  alp: 0.1
              }, 0.1, "lightFadeOut");
              break;
          case "light2-2":
              this.tweener("light2", {
                  sc: 0.3,
                  offX: -30,
                  offY: 35,
                  rot: 230,
                  alp: 0.5
              }, 0.1, "lightFadeOut");
              break;
          case "light3-2":
              this.tweener("light3", {
                  sc: 0.3,
                  offX: -30,
                  offY: 5,
                  rot: 280,
                  alp: 0.3
              }, 0.1, "lightFadeOut");
              break;
          case "lightFadeOut":
              this.tweener(c, {
                  alp: 0,
                  sc: 0
              }, 0.1);
              break;
          case "blop2":
              this.tweener("blop", {
                  sc: 0
              }, 0.02);
              break;
          case "preRenderIce":
              this.drawIce = !0;
              this.tweener("iceStar", {
                  rot: 360
              }, 0.6);
              this.tweener("iceStar", {
                  sc: 1.3
              }, 0.3, "iceStar");
              this.tweener("iceBubble", {
                  sc: 1.2,
                  alp: 1
              }, 0.2, "ice3", 0.3);
              this.tweener("iceRing", {
                  sc: 1
              }, 0.1, "iceRing");
              break;
          case "iceRing":
              this.tweener("iceRing", {
                  sc: 0
              }, 0.1, "none", 0.1);
              break;
          case "iceStar":
              this.tweener("iceStar", {
                  sc: 1
              }, 0.1);
              break;
          case "ice3":
              this.tweener("iceBubble", {
                  sc: 1
              }, 0.1, "convertColour");
              break;
          case "convertColour":
              this.drawIce = !1,
              ig.game.iceEndFrame = ig.game.iceRender.frames.length
          }
      },
      update: function() {
          ig.global.wm || this.parent()
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
      },
      preRenderText: function() {
          !0 != ig.game.played && (this.textDraw({
              ctx: ig.game.hidCtx,
              px: 18,
              tx: this.scoreChoice.normal.tx,
              x: 30,
              y: 231,
              scX: 1,
              scY: 1,
              alp: 1,
              stroke: !0,
              strokeColour: "#92551c",
              strokeAlp: 0.5,
              col: "#92551c"
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 18,
              tx: this.scoreChoice.normal.tx,
              x: 30,
              y: 230,
              scX: 1,
              scY: 1,
              alp: 1,
              stroke: !0,
              strokeColour: "#92551c",
              strokeAlp: 0.5,
              col: this.score.grad
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 18,
              tx: this.scoreChoice.plus.tx,
              x: 90,
              y: 231,
              scX: 1,
              scY: 1,
              alp: 1,
              stroke: !0,
              strokeColour: this.scoreChoice.plus.strokeCol,
              strokeAlp: 0.5,
              col: "#92551c"
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 18,
              tx: this.scoreChoice.plus.tx,
              x: 90,
              y: 230,
              scX: 1,
              scY: 1,
              alp: 1,
              stroke: !0,
              strokeColour: this.scoreChoice.plus.strokeCol,
              strokeAlp: 0.5,
              col: this.scoreChoice.plus.grad
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 18,
              tx: this.scoreChoice.minus.tx,
              x: 150,
              y: 231,
              scX: 1,
              scY: 1,
              alp: 1,
              stroke: !0,
              strokeColour: this.scoreChoice.minus.strokeCol,
              strokeAlp: 0.5,
              col: this.scoreChoice.minus.grad
          }),
          this.textDraw({
              ctx: ig.game.hidCtx,
              px: 18,
              tx: this.scoreChoice.minus.tx,
              x: 150,
              y: 230,
              scX: 1,
              scY: 1,
              alp: 1,
              stroke: !0,
              strokeColour: this.scoreChoice.minus.strokeCol,
              strokeAlp: 0.5,
              col: this.scoreChoice.minus.grad
          }),
          ig.game.burstTextRendered = !0)
      },
      drawIceStuff: function() {
          var b = Math.floor(this.iceFrame / 16)
            , c = this.iceFrame % 16
            , d = 30 + 60 * c
            , e = 930 + 60 * b;
          !0 == this.drawIce && (this.drawer({
              ctx: ig.game.hidCtx,
              x: d,
              y: e,
              pic: this.starIm3,
              scX: this.iceStar.sc,
              scY: this.iceStar.sc,
              cent: !0,
              alp: this.iceStar.alp,
              rot: this.iceStar.rot
          }),
          this.drawer({
              ctx: ig.game.hidCtx,
              x: d - 1,
              y: e,
              pic: this.ringIm,
              scX: this.sc.x * this.iceRing.sc,
              scY: this.sc.y * this.iceRing.sc,
              cent: !0,
              alp: this.iceRing.alp
          }),
          this.iceFrame += 1);
          void 0 == ig.game.iceRender.frames[this.iceFrame] && ig.game.iceRender.frames.push({
              sx: 60 * c,
              sy: 900 + 60 * b
          })
      },
      renderBurstStuff: function(b, c) {
          var d = Math.floor(this.burstFrame / 16)
            , e = this.burstFrame % 16
            , g = 30 + 60 * e
            , m = 330 + 60 * d + 200 * c;
          this.ctxDrawer({
              ctx: ig.game.hidCtx,
              pic: ig.game.hidEle,
              x: g,
              y: m,
              scX: this.score.sc,
              scY: this.score.sc,
              alp: this.score.alp,
              sx: this.scoreChoice[b].sx,
              sy: this.scoreChoice[b].sy,
              sw: this.scoreChoice[b].sw,
              sh: this.scoreChoice[b].sh,
              cent: !0
          });
          this.drawer({
              ctx: ig.game.hidCtx,
              x: g - 1 + this.off.x + this.light2.offX,
              y: m + this.off.y + this.light2.offY,
              pic: this.starIm3,
              scX: 0.3 * this.sc.x * this.light2.sc,
              scY: 0.3 * this.sc.y * this.light2.sc,
              cent: !0,
              alp: this.light2.alp,
              rot: this.light2.rot
          });
          this.drawer({
              ctx: ig.game.hidCtx,
              x: g - 1 + this.off.x + this.light3.offX,
              y: m + this.off.y + this.light3.offY,
              pic: this.starIm3,
              scX: 0.3 * this.sc.x * this.light3.sc,
              scY: 0.3 * this.sc.y * this.light3.sc,
              cent: !0,
              alp: this.light2.alp,
              rot: this.light2.rot
          });
          this.drawer({
              ctx: ig.game.hidCtx,
              x: g - 1 + this.off.x + this.light.offX,
              y: m + this.off.y + this.light.offY,
              pic: this.starIm3,
              scX: 0.3 * this.sc.x * this.light.sc,
              scY: 0.3 * this.sc.y * this.light.sc,
              cent: !0,
              alp: this.light2.alp,
              rot: this.light2.rot
          });
          this.drawer({
              ctx: ig.game.hidCtx,
              x: g - 1 + this.off.x,
              y: m + this.off.y,
              pic: this.starIm3,
              scX: this.sc.x * this.star.sc,
              scY: this.sc.y * this.star.sc,
              cent: !0,
              alp: this.star.alp,
              rot: this.star.rot
          });
          this.drawer({
              ctx: ig.game.hidCtx,
              x: g - 1 + this.off.x,
              y: m + this.off.y,
              pic: this.ringIm,
              scX: this.sc.x * this.ring.sc,
              scY: this.sc.y * this.ring.sc,
              cent: !0,
              alp: this.ring.alp
          });
          this.drawer({
              ctx: ig.game.hidCtx,
              x: g - 1 + this.off.x,
              y: m + this.off.y,
              pic: this.burstIm,
              scX: this.sc.x * this.blop.sc,
              scY: this.sc.y * this.blop.sc,
              cent: !0,
              alp: 0.8
          });
          void 0 == ig.game.burstRender.frames[this.burstFrame] && ig.game.burstRender.frames.push({
              sx: 60 * e,
              sy: 300 + 60 * d
          })
      },
      draw: function() {
          ig.global.wm || (this.parent(),
          this.drawIceStuff(),
          !0 == this.startRendered && !1 == ig.game.burstRender.done && (this.renderBurstStuff("normal", 0),
          this.renderBurstStuff("plus", 1),
          this.renderBurstStuff("minus", 2),
          this.burstFrame += 1))
      }
  })
});
ig.baked = !0;
ig.module("game.entities.plain-home").requires("game.entities.plain", "game.entities.plain-menu-but", "game.entities.plain-home-but", "game.entities.plain-setting", "game.entities.plain-level", "game.entities.plain-renderer").defines(function() {
  EntityPlainHome = EntityPlain.extend({
      gravityFactor: 0,
      type: ig.Entity.TYPE.B,
      zIndex: 1,
      h: 600,
      w: 800,
      sc: 2,
      size: {
          x: 50,
          y: 50
      },
      gamePaused: !1,
      bgIm: new ig.Image("media/graphics/sprites/home-bg.png"),
      scX: 1,
      scY: 1.005,
      init: function(b, c, d) {
          ig.global.wm || (this.parent(b, c, d),
          ig.game.redraw = !0,
          this.spawner(),
          ig.game.getMusic(),
          ig.game.getSound())
      },
      spawner: function() {
          ig.game.spawnEntity(EntityPointer, 800, 800, {
              main: this
          });
          _SETTINGS.MoreGames.Enabled && ig.game.spawnEntity(EntityButtonMoreGames, 342, 288, {
              main: this
          });
          ig.game.spawnEntity(EntityPlayBut, 163, 487, {
              main: this
          });
          ig.game.spawnEntity(EntitySettingBut, 11, 157, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainSetting, 0, 0, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainLevel, 0, 0, {
              main: this
          });
          ig.game.spawnEntity(EntityPlainRenderer, 0, 0, {
              main: this
          })
      },
      tweenF: function(b) {
          switch (b) {
          case "fat":
              this.tweener("this", {
                  scX: 1.008,
                  scY: 1
              }, 1, "tall");
              break;
          case "tall":
              this.tweener("this", {
                  scX: 1,
                  scY: 1.008
              }, 1, "fat")
          }
      },
      update: function() {
          ig.global.wm || this.parent()
      },
      ready: function() {
          this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
          !0 == ig.game.showLvlMenu && (this.gamePaused = !0,
          this.level = ig.game.getEntitiesByType(EntityPlainLevel)[0],
          this.level.tweenF("rectFadeIn"),
          ig.game.hideOverlay(["more-games"]));
          this.tweenF("fat")
      },
      draw: function() {
          this.parent();
          ig.global.wm || (ig.ua.mobile ? this.bgIm.draw(0, 0) : this.drawer({
              x: ig.system.width / 2,
              y: ig.system.height / 2,
              scX: this.scX,
              scY: this.scY,
              pic: this.bgIm,
              cent: !0
          }))
      }
  })
});
ig.baked = !0;
ig.module("game.levels.home").requires("impact.image", "game.entities.plain-home").defines(function() {
  LevelHome = {
      entities: [{
          type: "EntityPlainHome",
          x: 0,
          y: 0
      }],
      layer: []
  }
});
