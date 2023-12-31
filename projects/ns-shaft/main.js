!(function (t) {
  "use strict";
  var i = {};
  function e(t, i, e) {
    var n = function () {
      e && e.apply(this, arguments), t && t.apply(this, arguments);
    };
    return (
      ((i = (function (t, i) {
        for (var e in i) i.hasOwnProperty(e) && (t[e] = i[e]);
        return t;
      })(e ? new e() : {}, i)).constructor = n),
      (n.prototype = i),
      n
    );
  }
  function n(t, i, e, n, o, s) {
    n < 2 * s && (s = 0.5 * n),
      o < 2 * s && (s = 0.5 * o),
      t.beginPath(),
      t.moveTo(i + s, e),
      t.arcTo(i + n, e, i + n, e + o, s),
      t.arcTo(i + n, e + o, i, e + o, s),
      t.arcTo(i, e + o, i, e, s),
      t.arcTo(i, e, i + n, e, s),
      t.closePath();
  }
  t.Game = i;
  var o = {};
  function s(t) {
    var e = o[t];
    if (e)
      for (var n = [].slice.call(arguments, 1), s = 0, r = e.length; s < r; ++s)
        e[s].apply(i, n);
  }
  var r,
    h,
    a,
    l,
    f,
    g,
    c,
    u,
    d,
    v,
    m,
    y,
    w = 30,
    T = 360,
    p = 510,
    x = 100,
    b = 12,
    k = 26,
    F = 0.0015,
    P = 100,
    N = 300,
    E = 600,
    L = 0,
    D = 0,
    M = 0,
    H = 0,
    I = 0,
    R = !1,
    C = !1,
    S = NaN,
    G = NaN,
    O = NaN,
    q = !1,
    B =
      ((m = 0),
      (y = !1),
      {
        start: function () {
          y = !0;
        },
        get: function () {
          return y ? m++ : 0;
        },
        reset: function () {
          (m = 0), (y = !1);
        },
      }),
    U = e(
      function (t, i) {
        (this.x = t || 0), (this.y = i || 0), (this.seq = B.get());
      },
      {
        draw: function (t) {
          t.save(),
            t.translate(this.x, this.y),
            (t.lineWidth = b),
            t.setLineDash([23.5, 2]),
            t.beginPath(),
            t.moveTo(0, -6),
            t.lineTo(x, -6),
            t.stroke(),
            t.restore();
        },
        getHeight: function () {
          return b;
        },
        landing: function (t, i) {
          (t.vy = u), t.regain(), K(this.seq);
        },
        standing: function (t, i) {},
        leaving: function (t, i) {},
      }
    ),
    W = e(
      function (t, i) {
        (this.spring = 8), (this.restoring = !1);
      },
      {
        getHeight: function () {
          return this.spring + 4;
        },
        draw: function (t, i) {
          this.restoring && this.restore(i);
          var e = this.getHeight();
          t.save(),
            t.translate(this.x, this.y),
            t.fillRect(0, -2, x, 2),
            t.fillRect(0, -e, x, 2);
          (t.lineWidth = 20), t.setLineDash([1, 2]), t.beginPath();
          var n = 20;
          t.moveTo(n, 2 - e),
            t.lineTo(n, -2),
            (n += 30),
            t.moveTo(n, 2 - e),
            t.lineTo(n, -2),
            (n += 30),
            t.moveTo(n, 2 - e),
            t.lineTo(n, -2),
            t.stroke(),
            t.restore();
        },
        landing: function (t, i) {
          (this.touchTime = i),
            (this.spring = 8),
            (t.vy = u),
            t.regain(),
            K(this.seq);
        },
        standing: function (t, i) {
          var e = i - this.touchTime;
          e < P
            ? (this.spring = 8 - (e / P) * 5)
            : e < 200
            ? (this.spring = (e / P) * 10 - 7)
            : ((t.vy = -0.5), (t.onFloor = null), this.leaving(t, i));
        },
        leaving: function (t, i) {
          (this.leavingTime = i), (this.restoring = !0);
        },
        restore: function (t) {
          var i = 0.05 * (t - this.leavingTime);
          this.spring < 8
            ? ((this.spring += i),
              this.spring >= 8 && ((this.spring = 8), (this.restoring = !1)))
            : ((this.spring -= i),
              this.spring <= 8 && ((this.spring = 8), (this.restoring = !1)));
        },
      },
      U
    ),
    A = e(
      function (t, i) {
        this.offset = 20;
      },
      {
        draw: function (t) {
          --this.offset < 0 && (this.offset = 20),
            t.save(),
            t.translate(this.x, this.y),
            t.setLineDash([15, 5]),
            (t.lineWidth = 2),
            (t.lineDashOffset = this.offset);
          var i = 20;
          n(t, 1, -11, 98, 10, 6),
            t.stroke(),
            t.setLineDash([]),
            t.beginPath(),
            t.moveTo(i, -9),
            t.lineTo(24, -6),
            t.lineTo(i, -3),
            t.moveTo(28, -9),
            t.lineTo(32, -6),
            t.lineTo(28, -3),
            t.stroke(),
            t.beginPath(),
            t.arc(6, -6, 3, 0, 2 * Math.PI, !1),
            t.arc(94, -6, 3, 0, 2 * Math.PI, !1),
            t.fill(),
            t.restore();
        },
        landing: function (t, i) {
          (t.vy = u), (t.vx = 0.1), t.regain(), K(this.seq);
        },
        leaving: function (t, i) {
          t.vx = 0;
        },
      },
      U
    ),
    _ = e(
      function (t, i) {
        this.offset = 0;
      },
      {
        draw: function (t) {
          ++this.offset >= 20 && (this.offset = 0),
            t.save(),
            t.translate(this.x, this.y),
            t.setLineDash([15, 5]),
            (t.lineWidth = 2),
            (t.lineDashOffset = this.offset);
          var i = 80;
          n(t, 1, -11, 98, 10, 6),
            t.stroke(),
            t.setLineDash([]),
            t.beginPath(),
            t.moveTo(i, -9),
            t.lineTo(76, -6),
            t.lineTo(i, -3),
            t.moveTo(72, -9),
            t.lineTo(68, -6),
            t.lineTo(72, -3),
            t.stroke(),
            t.beginPath(),
            t.arc(6, -6, 3, 0, 2 * Math.PI, !1),
            t.arc(94, -6, 3, 0, 2 * Math.PI, !1),
            t.fill(),
            t.restore();
        },
        landing: function (t, i) {
          (t.vy = u), (t.vx = -0.1), t.regain(), K(this.seq);
        },
        leaving: function (t, i) {
          t.vx = 0;
        },
      },
      U
    ),
    z = e(
      function (t, i) {},
      {
        draw: function (t) {
          t.save(),
            t.translate(this.x, this.y),
            t.fillRect(0, -this.getHeight(), x, 3),
            t.fillRect(0, 6 - this.getHeight(), x, 3),
            t.beginPath();
          var i = 0.5 - this.getHeight(),
            e = i - 15;
          t.moveTo(0.5, i);
          for (var n = 0; n < 99.5; )
            t.lineTo((n += 5), e), t.lineTo(Math.min((n += 5), 99.5), i);
          t.closePath(),
            (t.fillStyle = "#fff"),
            t.fill(),
            t.stroke(),
            t.restore();
        },
        landing: function (t, i) {
          (t.vy = u), t.hurt(4, i), K(this.seq);
        },
      },
      U
    ),
    V = e(
      function (t, i) {
        (this.height = b), (this.restoring = !1);
      },
      {
        getHeight: function () {
          return this.height;
        },
        draw: function (t, i) {
          if (
            (this.restoring && this.restore(i),
            t.save(),
            t.translate(this.x, this.y),
            this.height >= b || this.height <= 0)
          )
            (t.fillStyle = "#999"), t.fillRect(0, -12, x, b);
          else {
            var e = this.height / b,
              n = Math.round(102 * e),
              o = 51 + n;
            (t.fillStyle = "rgb(" + o + "," + o + "," + o + ")"),
              t.fillRect(0, -this.getHeight(), x, this.getHeight()),
              (o = 153 + n),
              (t.fillStyle = "rgb(" + o + "," + o + "," + o + ")"),
              t.fillRect(0, -12, x, b - this.getHeight());
          }
          t.restore();
        },
        landing: function (t, i) {
          (this.touchTime = i), (t.vy = u), t.regain(), K(this.seq);
        },
        standing: function (t, i) {
          var e = i - this.touchTime;
          e < N
            ? (this.height = b)
            : e < E
            ? (this.height = -0.04 * (e - E))
            : ((this.height = 0), (t.onFloor = null), this.leaving(t, i));
        },
        leaving: function (t, i) {
          var e = i - this.touchTime;
          e >= N && e < E && (this.restoring = !0);
        },
        restore: function (t) {
          var i = t - this.touchTime;
          i < E
            ? (this.height = -0.04 * (i - E))
            : ((this.height = 0), (this.restoring = !1));
        },
      },
      U
    ),
    X = e(
      function (t, i) {
        (this.x = t || 0),
          (this.y = i || 0),
          (this.width = k),
          (this.height = k),
          (this.direction = 0),
          (this.onFloor = null),
          (this.vx = 0),
          (this.vy = 0),
          (this.life = 10),
          (this.pos = {
            standing: { middle: [2], right: [62, 32, 62, 92] },
            falling: { middle: [122, 152], right: [182, 212] },
          }),
          (this.hurtTime = 0),
          (this.blinkTime = 0),
          (this.blink = !1),
          (this.frameIndex = 0),
          (this.frameTime = 0);
      },
      {
        turnLeft: function () {
          window.DEBUG && console.log("left"), (this.direction = -1);
        },
        turnRight: function () {
          window.DEBUG && console.log("right"), (this.direction = 1);
        },
        stay: function () {
          window.DEBUG && console.log("stay"), (this.direction = 0);
        },
        draw: function (t, i) {
          t.save(),
            this.direction < 0
              ? (t.scale(-1, 1), t.translate(-this.x - this.width, this.y))
              : t.translate(this.x, this.y),
            this.life < 10 && this.hurtTime > 0 && i - this.hurtTime < 1e3
              ? this.blinkTime < this.hurtTime
                ? ((this.blink = !0), (this.blinkTime = i))
                : i - this.blinkTime >= 100 &&
                  ((this.blink = !this.blink), (this.blinkTime = i))
              : this.blink && (this.blink = !1);
          var e = this.onFloor ? this.pos.standing : this.pos.falling,
            n = 0 == this.direction ? e.middle : e.right;
          i - this.frameTime >= 60 && ((this.frameTime = i), ++this.frameIndex),
            (this.frameIndex = this.frameIndex % n.length),
            t.drawImage(
              g.hero,
              n[this.frameIndex],
              this.blink ? 32 : 2,
              26,
              26,
              0,
              -this.height,
              this.width,
              this.height
            ),
            t.restore();
        },
        regain: function () {
          this.life < 10 && (++this.life, (q = !0));
        },
        hurt: function (t, i) {
          (this.hurtTime = i),
            (this.life = Math.max(0, this.life - t)),
            (q = !0);
        },
      }
    );
  function j() {
    return null == h || h.y > p + h.height || h.life <= 0;
  }
  function J(t, i) {
    t.save(),
      t.beginPath(),
      t.rect(0, w, T, 480),
      t.clip(),
      t.drawImage(g.bg, 0, w, T, 480);
    for (var e = 0, o = r.length; e < o; ++e) r[e].draw(t, i);
    h.draw(t, i), t.beginPath(), t.moveTo(0.5, 30.5);
    for (var s = 0.5; s < T; )
      t.lineTo((s += 5), 44.5), t.lineTo((s += 5), 30.5);
    t.closePath(),
      (t.fillStyle = "#fff"),
      t.fill(),
      t.stroke(),
      R ||
        (t.save(),
        t.translate(180, 255),
        C
          ? ((t.textAlign = "center"),
            (t.font = "bold 32pt monospace"),
            (t.strokeStyle = "#fff"),
            (t.lineWidth = 6),
            t.strokeText("Game Over", 0, 10),
            (t.fillStyle = "#000"),
            t.fillText("Game Over", 0, 10))
          : (isFinite(O) ||
              (t.beginPath(),
              n(t, -109.5, -29.5, 219, 59, 10),
              (t.fillStyle = "rgba(0, 0, 0, 0.5)"),
              t.fill(),
              t.translate(-5, -5)),
            t.beginPath(),
            n(t, -109.5, -29.5, 219, 59, 10),
            (t.fillStyle = "#fff"),
            t.fill(),
            (t.fillStyle = "#000"),
            (t.font = "bold 24pt monospace"),
            (t.textAlign = "center"),
            t.fillText(j() ? "play again" : "continue", 0, 10)),
        t.restore()),
      t.restore(),
      q &&
        ((q = !1),
        t.save(),
        t.clearRect(0, 0, T, w),
        (t.fillStyle = "#000"),
        (t.font = "12pt monospace"),
        t.fillText(
          "life: " +
            "oooooooooo----------".substr(10 - h.life, 10) +
            "  score: " +
            d,
          10,
          24
        ),
        t.restore()),
      window.DEBUG &&
        (t.save(),
        (t.font = "12pt monospace"),
        t.fillText(((1e3 * (D + H)) / (M + i - L)).toFixed(2) + " fps", 10, 60),
        ++D > 20 && ((M = i - L), (H = 20), (D -= 20), (L = i)),
        t.restore());
  }
  function K(t) {
    var i = Math.floor(0.2 * t);
    if (i != d) {
      q = !0;
      var e = Math.floor(0.1 * i);
      e > v && (console.info("level up", e), (u = -0.1 * (1 + 0.1 * (v = e)))),
        (d = i);
    }
  }
  function Q(t, i) {
    h.onFloor && h.onFloor.standing(h, i);
    return (
      (function () {
        for (
          var t = 0 == r.length, i = r[r.length - 1], e = (i && i.y) || 0;
          e < p;

        ) {
          var n = (e += 60),
            o = Math.round(Math.random() * T - 50);
          if (t && n > 450) B.start(), (s = new U((o = 130), n)), r.push(s);
          else {
            var s,
              h = window.DEBUG_FLOOR || Math.random();
            (s =
              h > 0.5
                ? new U(o, n)
                : h > 0.4
                ? new V(o, n)
                : h > 0.3
                ? new z(o, n)
                : h > 0.2
                ? new _(o, n)
                : h > 0.1
                ? new A(o, n)
                : new W(o, n)),
              r.push(s);
          }
        }
      })(),
      (function () {
        var t,
          i = r.length;
        for (t = 0; t < i && !(r[t].y >= w); ++t);
        t > 0 && r.splice(0, t);
      })(),
      (function (t, i) {
        var e = h.vx + 0.2 * h.direction;
        if (
          0 != e &&
          ((h.x = Math.min(Math.max(0, h.x + e * t), 334)), h.onFloor)
        ) {
          var n = h.onFloor;
          (h.x < n.x - k || h.x >= n.x + x) &&
            ((h.onFloor = null), n.leaving(h, i));
        }
      })(t, i),
      (function (t, i) {
        for (var e = t * u, n = 0, o = r.length; n < o; ++n) r[n].y += e;
        if (h.onFloor) {
          var s = h.onFloor;
          h.y = s.y - s.getHeight();
        } else {
          var a = h.vy * t + 75e-5 * t * t,
            l = h.y + a,
            f = !1,
            g = h.x - x,
            c = h.x + k;
          for (n = 0, o = r.length; n < o; ++n)
            if (
              (s = r[n]).x >= g &&
              s.x < c &&
              s.getHeight() > 0 &&
              l >= s.y - s.getHeight() &&
              h.y < s.y - s.getHeight() - e
            ) {
              window.DEBUG &&
                console.info(
                  l,
                  s.y - s.getHeight(),
                  h.y,
                  s.y - s.getHeight() - e
                ),
                (h.y = s.y - s.getHeight()),
                (h.onFloor = s),
                s.landing(h, i),
                (f = !0);
              break;
            }
          f || ((h.y = l), (h.vy += F * t));
        }
      })(t, i),
      (function (t) {
        if (
          h.y - h.height < w &&
          ((h.y = w + h.height), (h.vy = 0), h.hurt(5, t), h.onFloor)
        ) {
          var i = h.onFloor;
          (h.onFloor = null), i.leaving(h, t);
        }
      })(i),
      j()
    );
  }
  function Y(t) {
    window.DEBUG_TIME && (t *= window.DEBUG_TIME), c || (c = t);
    var i = t - c;
    if (i > 2e3)
      console.info("Pause, duration: " + i),
        (R = !1),
        window.addEventListener("touchmove", $, !1);
    else {
      for (var e = !1; i > 20 && !(e = Q(20, t - i)); i -= 20);
      e || (e = Q(i, t)),
        e &&
          ((C = !0),
          setTimeout(function () {
            (C = !1), J(f, t);
          }, 1e3),
          (I = Math.max(d, I)),
          s("gameOver", d, I),
          (R = !1),
          window.addEventListener("touchmove", $, !1));
    }
    J(f, t), (c = t), R && requestAnimationFrame(Y);
  }
  function Z(t, i, e) {
    var n = document.documentElement.clientWidth,
      o = document.documentElement.clientHeight,
      s = Math.min(n / T, o / p),
      r = window.devicePixelRatio || 1;
    (i.style.width = T * s + "px"),
      (i.style.height = p * s + "px"),
      (i.width = T * s * r),
      (i.height = p * s * r),
      e.setTransform(s * r, 0, 0, s * r, 0, 0),
      (q = !0),
      c && J(e, c),
      console.info(
        "resize rate=" +
          s +
          ", ratio=" +
          r +
          ", width=" +
          i.width +
          ", height=" +
          i.height
      );
  }
  function $(t) {
    isFinite(O) && ((O = NaN), J(f, c));
  }
  function tt(t) {
    (g = t),
      ((l = document.createElement("canvas")).style.display = "block"),
      (l.style.margin = "0 auto"),
      (function (t) {
        for (; t.hasChildNodes(); ) t.removeChild(t.lastChild);
      })(a),
      a.appendChild(l),
      (f = l.getContext("2d")),
      setTimeout(function () {
        Z(0, l, f);
      }, 50),
      window.addEventListener(
        "resize",
        function () {
          Z(0, l, f), R && l.scrollIntoView();
        },
        !1
      ),
      window.addEventListener(
        "keydown",
        function (t) {
          37 == t.keyCode
            ? ((S = 0), h.turnLeft(), t.preventDefault(), t.stopPropagation())
            : 39 == t.keyCode
            ? ((G = 0), h.turnRight(), t.preventDefault(), t.stopPropagation())
            : (32 != t.keyCode && 13 != t.keyCode) ||
              (R || C || ((O = 0), J(f, c)),
              t.preventDefault(),
              t.stopPropagation());
        },
        !1
      ),
      window.addEventListener(
        "keyup",
        function (t) {
          37 == t.keyCode
            ? ((S = NaN), isFinite(G) ? h.turnRight() : h.stay())
            : 39 == t.keyCode
            ? ((G = NaN), isFinite(S) ? h.turnLeft() : h.stay())
            : !isFinite(O) ||
              (32 != t.keyCode && 13 != t.keyCode) ||
              ((O = NaN), it());
        },
        !1
      ),
      window.addEventListener(
        "touchstart",
        function (t) {
          var i = t.changedTouches[0];
          i &&
            (R
              ? i.clientX < 0.5 * document.documentElement.clientWidth
                ? ((S = i.identifier),
                  h.turnLeft(),
                  t.preventDefault(),
                  t.stopPropagation())
                : ((G = i.identifier),
                  h.turnRight(),
                  t.preventDefault(),
                  t.stopPropagation())
              : C || t.target != l || ((O = i.identifier), J(f, c)));
        },
        !1
      ),
      window.addEventListener(
        "touchend",
        function (t) {
          var i = t.changedTouches[0];
          i &&
            (i.identifier == O
              ? ((O = NaN), it())
              : i.identifier == S
              ? ((S = NaN), isFinite(G) ? h.turnRight() : h.stay())
              : i.identifier == G &&
                ((G = NaN), isFinite(S) ? h.turnLeft() : h.stay()));
        },
        !1
      ),
      window.addEventListener(
        "touchcancel",
        function (t) {
          var i = t.changedTouches[0];
          i &&
            (i.identifier == S
              ? ((S = NaN), isFinite(G) ? h.turnRight() : h.stay())
              : i.identifier == G &&
                ((G = NaN), isFinite(S) ? h.turnLeft() : h.stay()));
        },
        !1
      ),
      it();
  }
  function it() {
    R ||
      (j() &&
        (s("gameStart"),
        B.reset(),
        (r = []),
        (h = new X(167, 450)),
        (u = -0.1),
        (d = 0),
        (v = 0),
        (q = !0)),
      window.removeEventListener("touchmove", $, !1),
      (R = !0),
      (c = 0),
      l.scrollIntoView(),
      requestAnimationFrame(Y));
  }
  (i.launch = function (t) {
    (a = t),
      (function (t, i) {
        var e = {},
          n = [];
        for (var o in t) n.push(o);
        var s = 0,
          r = function (n) {
            if (0 != n.length) {
              var h = Math.min(5, n.length),
                a = n.slice(h),
                l = function () {
                  0 == --s && r(a);
                };
              s += h;
              for (var f = 0; f < h; ++f) {
                o = n[f];
                var g = t[o],
                  c = new Image();
                (e[o] = c), (c.onload = l), (c.src = g);
              }
            } else
              setTimeout(function () {
                i(e);
              }, 0);
          };
        r(n);
      })({ bg: "bg.png", hero: "led.png" }, tt);
  }),
    (i.on = function (t, i) {
      var e = o[t] || (o[t] = []);
      -1 == e.indexOf(i) && e.push(i);
    }),
    (i.off = function (t, i) {
      var e,
        n = o[t];
      n && -1 != (e = n.indexOf(i)) && n.splice(e, 1);
    });
})(window);
