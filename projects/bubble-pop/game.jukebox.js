this.jukebox = {};
jukebox.Player = function(b, c) {

  this.id = ++jukebox.__jukeboxId;
  this.origin = c || null;
  this.settings = {};
  for (var d in this.defaults)
      this.settings[d] = this.defaults[d];
  if ("[object Object]" === Object.prototype.toString.call(b))
      for (var e in b)
          this.settings[e] = b[e];
  "[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager);
  this.resource = this.isPlaying = null;
  this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) : this.settings.resources[0] || null;
  if (null === this.resource)
      throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
  this.__init();
  return this
}
;
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
  defaults: {
      resources: [],
      autoplay: !1,
      spritemap: {},
      flashMediaElement: "./swf/FlashMediaElement.swf",
      timeout: 1E3
  },
  __addToManager: function() {
      !0 !== this.__wasAddedToManager && (jukebox.Manager.add(this),
      this.__wasAddedToManager = !0)
  },
  __init: function() {
      var b = this, c = this.settings, d = {}, e;
      jukebox.Manager && void 0 !== jukebox.Manager.features && (d = jukebox.Manager.features);
      if (!0 === d.html5audio) {
          this.context = new Audio;
          this.context.src = this.resource;
          if (null === this.origin) {
              var g = function(c) {
                  b.__addToManager(c)
              };
              this.context.addEventListener("canplaythrough", g, !0);
              window.setTimeout(function() {
                  b.context.removeEventListener("canplaythrough", g, !0);
                  g("timeout")
              }, c.timeout)
          }
          this.context.autobuffer = !0;
          this.context.preload = !0;
          for (e in this.HTML5API)
              this[e] = this.HTML5API[e];
          1 < d.channels ? !0 === c.autoplay ? this.context.autoplay = !0 : void 0 !== c.spritemap[c.autoplay] && this.play(c.autoplay) : 1 === d.channels && void 0 !== c.spritemap[c.autoplay] && (this.backgroundMusic = c.spritemap[c.autoplay],
          this.backgroundMusic.started = Date.now ? Date.now() : +new Date,
          this.play(c.autoplay));
          1 == d.channels && !0 !== c.canPlayBackground && (window.addEventListener("pagehide", function() {
              null !== b.isPlaying && (b.pause(),
              b.__wasAutoPaused = !0)
          }),
          window.addEventListener("pageshow", function() {
              b.__wasAutoPaused && (b.resume(),
              delete b._wasAutoPaused)
          }))
      } else if (!0 === d.flashaudio) {
          for (e in this.FLASHAPI)
              this[e] = this.FLASHAPI[e];
          d = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
          this.__initFlashContext(d);
          !0 === c.autoplay ? this.play(0) : c.spritemap[c.autoplay] && this.play(c.autoplay)
      } else
          throw "Your Browser does not support Flash Audio or HTML5 Audio.";
  },
  __initFlashContext: function(b) {
      var c, d = this.settings.flashMediaElement, e, g = {
          flashvars: b.join("&"),
          quality: "high",
          bgcolor: "#000000",
          wmode: "transparent",
          allowscriptaccess: "always",
          allowfullscreen: "true"
      };
      if (navigator.userAgent.match(/MSIE/)) {
          c = document.createElement("div");
          document.getElementsByTagName("body")[0].appendChild(c);
          var m = document.createElement("object");
          m.id = "jukebox-flashstream-" + this.id;
          m.setAttribute("type", "application/x-shockwave-flash");
          m.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
          m.setAttribute("width", "0");
          m.setAttribute("height", "0");
          g.movie = d + "?x=" + (Date.now ? Date.now() : +new Date);
          g.flashvars = b.join("&amp;");
          for (e in g)
              b = document.createElement("param"),
              b.setAttribute("name", e),
              b.setAttribute("value", g[e]),
              m.appendChild(b);
          c.outerHTML = m.outerHTML;
          this.context = document.getElementById("jukebox-flashstream-" + this.id)
      } else {
          c = document.createElement("embed");
          c.id = "jukebox-flashstream-" + this.id;
          c.setAttribute("type", "application/x-shockwave-flash");
          c.setAttribute("width", "100");
          c.setAttribute("height", "100");
          g.play = !1;
          g.loop = !1;
          g.src = d + "?x=" + (Date.now ? Date.now() : +new Date);
          for (e in g)
              c.setAttribute(e, g[e]);
          document.getElementsByTagName("body")[0].appendChild(c);
          this.context = c
      }
  },
  backgroundHackForiOS: function() {
      if (void 0 !== this.backgroundMusic) {
          var b = Date.now ? Date.now() : +new Date;
          void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started = b,
          this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (b - this.backgroundMusic.started) / 1E3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start,
          this.play(this.backgroundMusic.lastPointer))
      }
  },
  play: function(b, c) {
      if (null !== this.isPlaying && !0 !== c)
          void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(b, this.id);
      else {
          var d = this.settings.spritemap, e;
          if (void 0 !== d[b])
              e = d[b].start;
          else if ("number" === typeof b) {
              e = b;
              for (var g in d)
                  if (e >= d[g].start && e <= d[g].end) {
                      b = g;
                      break
                  }
          }
          void 0 !== e && "[object Object]" === Object.prototype.toString.call(d[b]) && (this.isPlaying = this.settings.spritemap[b],
          this.context.play && this.context.play(),
          this.wasReady = this.setCurrentTime(e))
      }
  },
  stop: function() {
      this.__lastPosition = 0;
      this.isPlaying = null;
      this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause();
      return !0
  },
  pause: function() {
      this.isPlaying = null;
      this.__lastPosition = this.getCurrentTime();
      this.context.pause();
      return this.__lastPosition
  },
  resume: function(b) {
      b = "number" === typeof b ? b : this.__lastPosition;
      if (null !== b)
          return this.play(b),
          this.__lastPosition = null,
          !0;
      this.context.play();
      return !1
  },
  HTML5API: {
      getVolume: function() {
          return this.context.volume || 1
      },
      setVolume: function(b) {
          this.context.volume = b;
          return 1E-4 > Math.abs(this.context.volume - b) ? !0 : !1
      },
      getCurrentTime: function() {
          return this.context.currentTime || 0
      },
      setCurrentTime: function(b) {
          try {
              return this.context.currentTime = b,
              !0
          } catch (c) {
              return !1
          }
      }
  },
  FLASHAPI: {
      getVolume: function() {
          return this.context && "function" === typeof this.context.getVolume ? this.context.getVolume() : 1
      },
      setVolume: function(b) {
          return this.context && "function" === typeof this.context.setVolume ? (this.context.setVolume(b),
          !0) : !1
      },
      getCurrentTime: function() {
          return this.context && "function" === typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0
      },
      setCurrentTime: function(b) {
          return this.context && "function" === typeof this.context.setCurrentTime ? this.context.setCurrentTime(b) : !1
      }
  }
};
if (void 0 === this.jukebox)
  throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(b) {
  this.features = {};
  this.codecs = {};
  this.__players = {};
  this.__playersLength = 0;
  this.__clones = {};
  this.__queue = [];
  this.settings = {};
  for (var c in this.defaults)
      this.settings[c] = this.defaults[c];
  if ("[object Object]" === Object.prototype.toString.call(b))
      for (var d in b)
          this.settings[d] = b[d];
  this.__detectFeatures();
  jukebox.Manager.__initialized = !1 === this.settings.useGameLoop ? window.setInterval(function() {
      jukebox.Manager.loop()
  }, 20) : !0
}
;
jukebox.Manager.prototype = {
  defaults: {
      useFlash: !1,
      useGameLoop: !1
  },
  __detectFeatures: function() {
      var b = window.Audio && new Audio;
      if (b && b.canPlayType && !1 === this.settings.useFlash) {
          for (var c = [{
              e: "3gp",
              m: ["audio/3gpp", "audio/amr"]
          }, {
              e: "aac",
              m: ["audio/aac", "audio/aacp"]
          }, {
              e: "amr",
              m: ["audio/amr", "audio/3gpp"]
          }, {
              e: "caf",
              m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"']
          }, {
              e: "m4a",
              m: 'audio/mp4{audio/mp4; codecs="mp4a.40.2,avc1.42E01E"{audio/mpeg4{audio/mpeg4-generic{audio/mp4a-latm{audio/MP4A-LATM{audio/x-m4a'.split("{")
          }, {
              e: "mp3",
              m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"]
          }, {
              e: "mpga",
              m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"]
          }, {
              e: "mp4",
              m: ["audio/mp4", "video/mp4"]
          }, {
              e: "ogg",
              m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
          }, {
              e: "wav",
              m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"]
          }, {
              e: "webm",
              m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"]
          }], d, e, g = 0, m = c.length; g < m; g++)
              if (e = c[g].e,
              c[g].m.length && "object" === typeof c[g].m)
                  for (var x = 0, p = c[g].m.length; x < p; x++)
                      if (d = c[g].m[x],
                      "" !== b.canPlayType(d)) {
                          this.codecs[e] = d;
                          break
                      } else
                          this.codecs[e] || (this.codecs[e] = !1);
          this.features.html5audio = !(!this.codecs.mp3 && !this.codecs.ogg && !this.codecs.webm && !this.codecs.wav);
          this.features.channels = 8;
          b.volume = 0.1337;
          this.features.volume = !!(1E-4 > Math.abs(b.volume - 0.1337));
          navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
      }
      this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1;
      if (window.ActiveXObject)
          try {
              new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"),
              this.features.flashaudio = !0
          } catch (v) {}
      !0 === this.settings.useFlash && (this.features.flashaudio = !0);
      !0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "audio/mp3",
      this.codecs.mpga = "audio/mpeg",
      this.codecs.mp4 = "audio/mp4",
      this.codecs.m4a = "audio/mp4",
      this.codecs["3gp"] = "audio/3gpp",
      this.codecs.amr = "audio/amr",
      this.features.volume = !0,
      this.features.channels = 1)
  },
  __getPlayerById: function(b) {
      return this.__players && void 0 !== this.__players[b] ? this.__players[b] : null
  },
  __getClone: function(b, c) {
      for (var d in this.__clones) {
          var e = this.__clones[d];
          if (null === e.isPlaying && e.origin === b)
              return e
      }
      if ("[object Object]" === Object.prototype.toString.call(c)) {
          d = {};
          for (var g in c)
              d[g] = c[g];
          d.autoplay = !1;
          g = new jukebox.Player(d,b);
          g.isClone = !0;
          g.wasReady = !1;
          return this.__clones[g.id] = g
      }
      return null
  },
  loop: function() {
      if (0 !== this.__playersLength)
          if (this.__queue.length && this.__playersLength < this.features.channels) {
              var b = this.__queue[0]
                , c = this.__getPlayerById(b.origin);
              if (null !== c) {
                  var d = this.__getClone(b.origin, c.settings);
                  null !== d && (!0 === this.features.volume && (c = this.__players[b.origin]) && d.setVolume(c.getVolume()),
                  this.add(d),
                  d.play(b.pointer, !0))
              }
              this.__queue.splice(0, 1)
          } else
              for (d in this.__queue.length && 1 === this.features.channels && (b = this.__queue[0],
              c = this.__getPlayerById(b.origin),
              null !== c && c.play(b.pointer, !0),
              this.__queue.splice(0, 1)),
              this.__players)
                  b = this.__players[d],
                  c = b.getCurrentTime() || 0,
                  b.isPlaying && !1 === b.wasReady ? b.wasReady = b.setCurrentTime(b.isPlaying.start) : b.isPlaying && !0 === b.wasReady ? c > b.isPlaying.end && (!0 === b.isPlaying.loop ? b.play(b.isPlaying.start, !0) : b.stop()) : b.isClone && null === b.isPlaying ? this.remove(b) : void 0 !== b.backgroundMusic && null === b.isPlaying && c > b.backgroundMusic.end && b.backgroundHackForiOS()
  },
  getPlayableResource: function(b) {
      "[object Array]" !== Object.prototype.toString.call(b) && (b = [b]);
      for (var c = 0, d = b.length; c < d; c++) {
          var e = b[c]
            , g = e.match(/\.([^\.]*)$/)[1];
          if (g && this.codecs[g])
              return e
      }
      return null
  },
  add: function(b) {
      return b instanceof jukebox.Player && void 0 === this.__players[b.id] ? (this.__playersLength++,
      this.__players[b.id] = b,
      !0) : !1
  },
  remove: function(b) {
      return b instanceof jukebox.Player && void 0 !== this.__players[b.id] ? (this.__playersLength--,
      delete this.__players[b.id],
      !0) : !1
  },
  addToQueue: function(b, c) {
      return ("string" === typeof b || "number" === typeof b) && void 0 !== this.__players[c] ? (this.__queue.push({
          pointer: b,
          origin: c
      }),
      !0) : !1
  }
};
