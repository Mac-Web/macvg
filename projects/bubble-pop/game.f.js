(function(b, c) {
  function d(b, j, z) {
      if (z === c && 1 === b.nodeType)
          if (z = "data-" + j.replace(tc, "-$1").toLowerCase(),
          z = b.getAttribute(z),
          "string" == typeof z) {
              try {
                  z = "true" === z ? !0 : "false" === z ? !1 : "null" === z ? null : +z + "" === z ? +z : uc.test(z) ? f.parseJSON(z) : z
              } catch (d) {}
              f.data(b, j, z)
          } else
              z = c;
      return z
  }
  function e(b) {
      for (var j in b)
          if (!("data" === j && f.isEmptyObject(b[j])) && "toJSON" !== j)
              return !1;
      return !0
  }
  function g() {
      return !1
  }
  function m() {
      return !0
  }
  function x(b) {
      return !b || !b.parentNode || 11 === b.parentNode.nodeType
  }
  function p(b, j) {
      do
          b = b[j];
      while (b && 1 !== b.nodeType);
      return b
  }
  function v(b, j, c) {
      j = j || 0;
      if (f.isFunction(j))
          return f.grep(b, function(b, u) {
              return !!j.call(b, u, b) === c
          });
      if (j.nodeType)
          return f.grep(b, function(b) {
              return b === j === c
          });
      if ("string" == typeof j) {
          var d = f.grep(b, function(b) {
              return 1 === b.nodeType
          });
          if (vc.test(j))
              return f.filter(j, d, !c);
          j = f.filter(j, d)
      }
      return f.grep(b, function(b) {
          return 0 <= f.inArray(b, j) === c
      })
  }
  function t(b) {
      var j = xb.split("|");
      b = b.createDocumentFragment();
      if (b.createElement)
          for (; j.length; )
              b.createElement(j.pop());
      return b
  }
  function q(b, j) {
      if (1 === j.nodeType && f.hasData(b)) {
          var c, d, s;
          d = f._data(b);
          var D = f._data(j, d)
            , r = d.events;
          if (r)
              for (c in delete D.handle,
              D.events = {},
              r) {
                  d = 0;
                  for (s = r[c].length; d < s; d++)
                      f.event.add(j, c, r[c][d])
              }
          D.data && (D.data = f.extend({}, D.data))
      }
  }
  function l(b, j) {
      var c;
      1 === j.nodeType && (j.clearAttributes && j.clearAttributes(),
      j.mergeAttributes && j.mergeAttributes(b),
      c = j.nodeName.toLowerCase(),
      "object" === c ? (j.parentNode && (j.outerHTML = b.outerHTML),
      f.support.html5Clone && b.innerHTML && !f.trim(j.innerHTML) && (j.innerHTML = b.innerHTML)) : "input" === c && yb.test(b.type) ? (j.defaultChecked = j.checked = b.checked,
      j.value !== b.value && (j.value = b.value)) : "option" === c ? j.selected = b.defaultSelected : "input" === c || "textarea" === c ? j.defaultValue = b.defaultValue : "script" === c && j.text !== b.text && (j.text = b.text),
      j.removeAttribute(f.expando))
  }
  function n(b) {
      return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : "undefined" != typeof b.querySelectorAll ? b.querySelectorAll("*") : []
  }
  function y(b) {
      yb.test(b.type) && (b.defaultChecked = b.checked)
  }
  function A(b, j) {
      if (j in b)
          return j;
      for (var c = j.charAt(0).toUpperCase() + j.slice(1), f = j, d = zb.length; d--; )
          if (j = zb[d] + c,
          j in b)
              return j;
      return f
  }
  function F(b, j) {
      return b = j || b,
      "none" === f.css(b, "display") || !f.contains(b.ownerDocument, b)
  }
  function B(b, j) {
      for (var c, d, s = [], D = 0, r = b.length; D < r; D++)
          c = b[D],
          c.style && (s[D] = f._data(c, "olddisplay"),
          j ? (!s[D] && "none" === c.style.display && (c.style.display = ""),
          "" === c.style.display && F(c) && (s[D] = f._data(c, "olddisplay", P(c.nodeName)))) : (d = Q(c, "display"),
          !s[D] && "none" !== d && f._data(c, "olddisplay", d)));
      for (D = 0; D < r; D++)
          if (c = b[D],
          c.style && (!j || "none" === c.style.display || "" === c.style.display))
              c.style.display = j ? s[D] || "" : "none";
      return b
  }
  function G(b, j, c) {
      return (b = wc.exec(j)) ? Math.max(0, b[1] - (c || 0)) + (b[2] || "px") : j
  }
  function Ya(b, j, c, d) {
      j = c === (d ? "border" : "content") ? 4 : "width" === j ? 1 : 0;
      for (var s = 0; 4 > j; j += 2)
          "margin" === c && (s += f.css(b, c + ea[j], !0)),
          d ? ("content" === c && (s -= parseFloat(Q(b, "padding" + ea[j])) || 0),
          "margin" !== c && (s -= parseFloat(Q(b, "border" + ea[j] + "Width")) || 0)) : (s += parseFloat(Q(b, "padding" + ea[j])) || 0,
          "padding" !== c && (s += parseFloat(Q(b, "border" + ea[j] + "Width")) || 0));
      return s
  }
  function I(b, j, c) {
      var d = "width" === j ? b.offsetWidth : b.offsetHeight
        , s = !0
        , D = f.support.boxSizing && "border-box" === f.css(b, "boxSizing");
      if (0 >= d || null == d) {
          d = Q(b, j);
          if (0 > d || null == d)
              d = b.style[j];
          if (za.test(d))
              return d;
          s = D && (f.support.boxSizingReliable || d === b.style[j]);
          d = parseFloat(d) || 0
      }
      return d + Ya(b, j, c || (D ? "border" : "content"), s) + "px"
  }
  function P(b) {
      if (Za[b])
          return Za[b];
      var j = f("<" + b + ">").appendTo(C.body)
        , c = j.css("display");
      j.remove();
      if ("none" === c || "" === c) {
          ma = C.body.appendChild(ma || f.extend(C.createElement("iframe"), {
              frameBorder: 0,
              width: 0,
              height: 0
          }));
          if (!na || !ma.createElement)
              na = (ma.contentWindow || ma.contentDocument).document,
              na.write("<!doctype html><html><body>"),
              na.close();
          j = na.body.appendChild(na.createElement(b));
          c = Q(j, "display");
          C.body.removeChild(ma)
      }
      return Za[b] = c,
      c
  }
  function N(b, j, c, d) {
      var s;
      if (f.isArray(j))
          f.each(j, function(j, f) {
              c || xc.test(b) ? d(b, f) : N(b + "[" + ("object" == typeof f ? j : "") + "]", f, c, d)
          });
      else if (!c && "object" === f.type(j))
          for (s in j)
              N(b + "[" + s + "]", j[s], c, d);
      else
          d(b, j)
  }
  function Aa(b) {
      return function(j, c) {
          "string" != typeof j && (c = j,
          j = "*");
          var d, s, D = j.toLowerCase().split(fa), r = 0, e = D.length;
          if (f.isFunction(c))
              for (; r < e; r++)
                  d = D[r],
                  (s = /^\+/.test(d)) && (d = d.substr(1) || "*"),
                  d = b[d] = b[d] || [],
                  d[s ? "unshift" : "push"](c)
      }
  }
  function oa(b, j, z, f, d, D) {
      d = d || j.dataTypes[0];
      D = D || {};
      D[d] = !0;
      var r;
      d = b[d];
      for (var e = 0, l = d ? d.length : 0, g = b === $a; e < l && (g || !r); e++)
          r = d[e](j, z, f),
          "string" == typeof r && (!g || D[r] ? r = c : (j.dataTypes.unshift(r),
          r = oa(b, j, z, f, r, D)));
      return (g || !r) && !D["*"] && (r = oa(b, j, z, f, "*", D)),
      r
  }
  function ta(b, j) {
      var z, d, s = f.ajaxSettings.flatOptions || {};
      for (z in j)
          j[z] !== c && ((s[z] ? b : d || (d = {}))[z] = j[z]);
      d && f.extend(!0, b, d)
  }
  function Ab() {
      try {
          return new b.XMLHttpRequest
      } catch (u) {}
  }
  function Bb() {
      return setTimeout(function() {
          Ba = c
      }, 0),
      Ba = f.now()
  }
  function Cb(b, j, c) {
      var d, s = 0, e = Ca.length, r = f.Deferred().always(function() {
          delete l.elem
      }), l = function() {
          for (var j = Ba || Bb(), j = Math.max(0, g.startTime + g.duration - j), c = 1 - (j / g.duration || 0), z = 0, d = g.tweens.length; z < d; z++)
              g.tweens[z].run(c);
          return r.notifyWith(b, [g, c, j]),
          1 > c && d ? j : (r.resolveWith(b, [g]),
          !1)
      }, g = r.promise({
          elem: b,
          props: f.extend({}, j),
          opts: f.extend(!0, {
              specialEasing: {}
          }, c),
          originalProperties: j,
          originalOptions: c,
          startTime: Ba || Bb(),
          duration: c.duration,
          tweens: [],
          createTween: function(j, c) {
              var z = f.Tween(b, g.opts, j, c, g.opts.specialEasing[j] || g.opts.easing);
              return g.tweens.push(z),
              z
          },
          stop: function(j) {
              for (var c = 0, z = j ? g.tweens.length : 0; c < z; c++)
                  g.tweens[c].run(1);
              return j ? r.resolveWith(b, [g, j]) : r.rejectWith(b, [g, j]),
              this
          }
      });
      j = g.props;
      c = g.opts.specialEasing;
      var n, y, p, m;
      for (d in j)
          if (n = f.camelCase(d),
          y = c[n],
          p = j[d],
          f.isArray(p) && (y = p[1],
          p = j[d] = p[0]),
          d !== n && (j[n] = p,
          delete j[d]),
          (m = f.cssHooks[n]) && "expand"in m)
              for (d in p = m.expand(p),
              delete j[n],
              p)
                  d in j || (j[d] = p[d],
                  c[d] = y);
          else
              c[n] = y;
      for (; s < e; s++)
          if (d = Ca[s].call(g, b, j, g.opts))
              return d;
      var v = g;
      f.each(j, function(b, u) {
          for (var j = (ua[b] || []).concat(ua["*"]), c = 0, z = j.length; c < z && !j[c].call(v, b, u); c++)
              ;
      });
      return f.isFunction(g.opts.start) && g.opts.start.call(b, g),
      f.fx.timer(f.extend(l, {
          anim: g,
          queue: g.opts.queue,
          elem: b
      })),
      g.progress(g.opts.progress).done(g.opts.done, g.opts.complete).fail(g.opts.fail).always(g.opts.always)
  }
  function S(b, j, c, d, f) {
      return new S.prototype.init(b,j,c,d,f)
  }
  function Da(b, j) {
      var c, d = {
          height: b
      }, f = 0;
      for (j = j ? 1 : 0; 4 > f; f += 2 - j)
          c = ea[f],
          d["margin" + c] = d["padding" + c] = b;
      return j && (d.opacity = d.width = b),
      d
  }
  function Db(b) {
      return f.isWindow(b) ? b : 9 === b.nodeType ? b.defaultView || b.parentWindow : !1
  }
  var Eb, Ea, C = b.document, zc = b.location, Ac = b.navigator, Bc = b.jQuery, Cc = b.$, Fb = Array.prototype.push, aa = Array.prototype.slice, Gb = Array.prototype.indexOf, Dc = Object.prototype.toString, ab = Object.prototype.hasOwnProperty, bb = String.prototype.trim, f = function(b, j) {
      return new f.fn.init(b,j,Eb)
  }, Fa = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, Ec = /\S/, fa = /\s+/, Fc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, Gc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, Hb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Hc = /^[\],:{}\s]*$/, Ic = /(?:^|:|,)(?:\s*\[)+/g, Jc = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, Kc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, Lc = /^-ms-/, Mc = /-([\da-z])/gi, Nc = function(b, j) {
      return (j + "").toUpperCase()
  }, Ga = function() {
      C.addEventListener ? (C.removeEventListener("DOMContentLoaded", Ga, !1),
      f.ready()) : "complete" === C.readyState && (C.detachEvent("onreadystatechange", Ga),
      f.ready())
  }, Ib = {};
  f.fn = f.prototype = {
      constructor: f,
      init: function(b, j, z) {
          var d, s;
          if (!b)
              return this;
          if (b.nodeType)
              return this.context = this[0] = b,
              this.length = 1,
              this;
          if ("string" == typeof b) {
              "<" === b.charAt(0) && ">" === b.charAt(b.length - 1) && 3 <= b.length ? d = [null, b, null] : d = Gc.exec(b);
              if (d && (d[1] || !j)) {
                  if (d[1])
                      return j = j instanceof f ? j[0] : j,
                      s = j && j.nodeType ? j.ownerDocument || j : C,
                      b = f.parseHTML(d[1], s, !0),
                      Hb.test(d[1]) && f.isPlainObject(j) && this.attr.call(b, j, !0),
                      f.merge(this, b);
                  if ((j = C.getElementById(d[2])) && j.parentNode) {
                      if (j.id !== d[2])
                          return z.find(b);
                      this.length = 1;
                      this[0] = j
                  }
                  return this.context = C,
                  this.selector = b,
                  this
              }
              return !j || j.jquery ? (j || z).find(b) : this.constructor(j).find(b)
          }
          return f.isFunction(b) ? z.ready(b) : (b.selector !== c && (this.selector = b.selector,
          this.context = b.context),
          f.makeArray(b, this))
      },
      selector: "",
      jquery: "1.8.2",
      length: 0,
      size: function() {
          return this.length
      },
      toArray: function() {
          return aa.call(this)
      },
      get: function(b) {
          return null == b ? this.toArray() : 0 > b ? this[this.length + b] : this[b]
      },
      pushStack: function(b, j, c) {
          b = f.merge(this.constructor(), b);
          return b.prevObject = this,
          b.context = this.context,
          "find" === j ? b.selector = this.selector + (this.selector ? " " : "") + c : j && (b.selector = this.selector + "." + j + "(" + c + ")"),
          b
      },
      each: function(b, j) {
          return f.each(this, b, j)
      },
      ready: function(b) {
          return f.ready.promise().done(b),
          this
      },
      eq: function(b) {
          return b = +b,
          -1 === b ? this.slice(b) : this.slice(b, b + 1)
      },
      first: function() {
          return this.eq(0)
      },
      last: function() {
          return this.eq(-1)
      },
      slice: function() {
          return this.pushStack(aa.apply(this, arguments), "slice", aa.call(arguments).join(","))
      },
      map: function(b) {
          return this.pushStack(f.map(this, function(j, c) {
              return b.call(j, c, j)
          }))
      },
      end: function() {
          return this.prevObject || this.constructor(null)
      },
      push: Fb,
      sort: [].sort,
      splice: [].splice
  };
  f.fn.init.prototype = f.fn;
  f.extend = f.fn.extend = function() {
      var b, j, z, d, s, e, r = arguments[0] || {}, l = 1, g = arguments.length, n = !1;
      "boolean" == typeof r && (n = r,
      r = arguments[1] || {},
      l = 2);
      "object" != typeof r && !f.isFunction(r) && (r = {});
      for (g === l && (r = this,
      --l); l < g; l++)
          if (null != (b = arguments[l]))
              for (j in b)
                  z = r[j],
                  d = b[j],
                  r !== d && (n && d && (f.isPlainObject(d) || (s = f.isArray(d))) ? (s ? (s = !1,
                  e = z && f.isArray(z) ? z : []) : e = z && f.isPlainObject(z) ? z : {},
                  r[j] = f.extend(n, e, d)) : d !== c && (r[j] = d));
      return r
  }
  ;
  f.extend({
      noConflict: function(u) {
          return b.$ === f && (b.$ = Cc),
          u && b.jQuery === f && (b.jQuery = Bc),
          f
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function(b) {
          b ? f.readyWait++ : f.ready(!0)
      },
      ready: function(b) {
          if (!(!0 === b ? --f.readyWait : f.isReady)) {
              if (!C.body)
                  return setTimeout(f.ready, 1);
              f.isReady = !0;
              !0 !== b && 0 < --f.readyWait || (Ea.resolveWith(C, [f]),
              f.fn.trigger && f(C).trigger("ready").off("ready"))
          }
      },
      isFunction: function(b) {
          return "function" === f.type(b)
      },
      isArray: Array.isArray || function(b) {
          return "array" === f.type(b)
      }
      ,
      isWindow: function(b) {
          return null != b && b == b.window
      },
      isNumeric: function(b) {
          return !isNaN(parseFloat(b)) && isFinite(b)
      },
      type: function(b) {
          return null == b ? String(b) : Ib[Dc.call(b)] || "object"
      },
      isPlainObject: function(b) {
          if (!b || "object" !== f.type(b) || b.nodeType || f.isWindow(b))
              return !1;
          try {
              if (b.constructor && !ab.call(b, "constructor") && !ab.call(b.constructor.prototype, "isPrototypeOf"))
                  return !1
          } catch (j) {
              return !1
          }
          for (var z in b)
              ;
          return z === c || ab.call(b, z)
      },
      isEmptyObject: function(b) {
          for (var j in b)
              return !1;
          return !0
      },
      error: function(b) {
          throw Error(b);
      },
      parseHTML: function(b, j, c) {
          var d;
          return !b || "string" != typeof b ? null : ("boolean" == typeof j && (c = j,
          j = 0),
          j = j || C,
          (d = Hb.exec(b)) ? [j.createElement(d[1])] : (d = f.buildFragment([b], j, c ? null : []),
          f.merge([], (d.cacheable ? f.clone(d.fragment) : d.fragment).childNodes)))
      },
      parseJSON: function(u) {
          if (!u || "string" != typeof u)
              return null;
          u = f.trim(u);
          if (b.JSON && b.JSON.parse)
              return b.JSON.parse(u);
          if (Hc.test(u.replace(Jc, "@").replace(Kc, "]").replace(Ic, "")))
              return (new Function("return " + u))();
          f.error("Invalid JSON: " + u)
      },
      parseXML: function(u) {
          var j, z;
          if (!u || "string" != typeof u)
              return null;
          try {
              b.DOMParser ? (z = new DOMParser,
              j = z.parseFromString(u, "text/xml")) : (j = new ActiveXObject("Microsoft.XMLDOM"),
              j.async = "false",
              j.loadXML(u))
          } catch (d) {
              j = c
          }
          return (!j || !j.documentElement || j.getElementsByTagName("parsererror").length) && f.error("Invalid XML: " + u),
          j
      },
      noop: function() {},
      globalEval: function(u) {
        console.log("--eval--", u);
          u && Ec.test(u) && (b.execScript || function(u) {
              b.eval.call(b, u)
          }
          )(u)
      },
      camelCase: function(b) {
          return b.replace(Lc, "ms-").replace(Mc, Nc)
      },
      nodeName: function(b, j) {
          return b.nodeName && b.nodeName.toLowerCase() === j.toLowerCase()
      },
      each: function(b, j, z) {
          var d, s = 0, e = b.length, r = e === c || f.isFunction(b);
          if (z)
              if (r)
                  for (d in b) {
                      if (!1 === j.apply(b[d], z))
                          break
                  }
              else
                  for (; s < e && !1 !== j.apply(b[s++], z); )
                      ;
          else if (r)
              for (d in b) {
                  if (!1 === j.call(b[d], d, b[d]))
                      break
              }
          else
              for (; s < e && !1 !== j.call(b[s], s, b[s++]); )
                  ;
          return b
      },
      trim: bb && !bb.call("\ufeff\u00a0") ? function(b) {
          return null == b ? "" : bb.call(b)
      }
      : function(b) {
          return null == b ? "" : (b + "").replace(Fc, "")
      }
      ,
      makeArray: function(b, j) {
          var c, d = j || [];
          return null != b && (c = f.type(b),
          null == b.length || "string" === c || "function" === c || "regexp" === c || f.isWindow(b) ? Fb.call(d, b) : f.merge(d, b)),
          d
      },
      inArray: function(b, j, c) {
          var d;
          if (j) {
              if (Gb)
                  return Gb.call(j, b, c);
              d = j.length;
              for (c = c ? 0 > c ? Math.max(0, d + c) : c : 0; c < d; c++)
                  if (c in j && j[c] === b)
                      return c
          }
          return -1
      },
      merge: function(b, j) {
          var d = j.length
            , f = b.length
            , s = 0;
          if ("number" == typeof d)
              for (; s < d; s++)
                  b[f++] = j[s];
          else
              for (; j[s] !== c; )
                  b[f++] = j[s++];
          return b.length = f,
          b
      },
      grep: function(b, j, c) {
          var d, f = [], e = 0, r = b.length;
          for (c = !!c; e < r; e++)
              d = !!j(b[e], e),
              c !== d && f.push(b[e]);
          return f
      },
      map: function(b, j, d) {
          var E, s, e = [], r = 0, l = b.length;
          if (b instanceof f || l !== c && "number" == typeof l && (0 < l && b[0] && b[l - 1] || 0 === l || f.isArray(b)))
              for (; r < l; r++)
                  E = j(b[r], r, d),
                  null != E && (e[e.length] = E);
          else
              for (s in b)
                  E = j(b[s], s, d),
                  null != E && (e[e.length] = E);
          return e.concat.apply([], e)
      },
      guid: 1,
      proxy: function(b, j) {
          var d, E, s;
          return "string" == typeof j && (d = b[j],
          j = b,
          b = d),
          f.isFunction(b) ? (E = aa.call(arguments, 2),
          s = function() {
              return b.apply(j, E.concat(aa.call(arguments)))
          }
          ,
          s.guid = b.guid = b.guid || f.guid++,
          s) : c
      },
      access: function(b, j, d, E, s, e, r) {
          var l, g = null == d, n = 0, p = b.length;
          if (d && "object" == typeof d) {
              for (n in d)
                  f.access(b, j, n, d[n], 1, e, E);
              s = 1
          } else if (E !== c) {
              l = r === c && f.isFunction(E);
              g && (l ? (l = j,
              j = function(b, u, j) {
                  return l.call(f(b), j)
              }
              ) : (j.call(b, E),
              j = null));
              if (j)
                  for (; n < p; n++)
                      j(b[n], d, l ? E.call(b[n], n, j(b[n], d)) : E, r);
              s = 1
          }
          return s ? b : g ? j.call(b) : p ? j(b[0], d) : e
      },
      now: function() {
          return (new Date).getTime()
      }
  });
  f.ready.promise = function(u) {
      if (!Ea)
          if (Ea = f.Deferred(),
          "complete" === C.readyState)
              setTimeout(f.ready, 1);
          else if (C.addEventListener)
              C.addEventListener("DOMContentLoaded", Ga, !1),
              b.addEventListener("load", f.ready, !1);
          else {
              C.attachEvent("onreadystatechange", Ga);
              b.attachEvent("onload", f.ready);
              var j = !1;
              try {
                  j = null == b.frameElement && C.documentElement
              } catch (c) {}
              j && j.doScroll && function s() {
                  if (!f.isReady) {
                      try {
                          j.doScroll("left")
                      } catch (b) {
                          return setTimeout(s, 50)
                      }
                      f.ready()
                  }
              }()
          }
      return Ea.promise(u)
  }
  ;
  f.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(b, j) {
      Ib["[object " + j + "]"] = j.toLowerCase()
  });
  Eb = f(C);
  var Jb = {};
  f.Callbacks = function(b) {
      var j;
      if ("string" == typeof b) {
          if (!(j = Jb[b])) {
              j = b;
              var d = Jb[j] = {};
              j = (f.each(j.split(fa), function(b, u) {
                  d[u] = !0
              }),
              d)
          }
      } else
          j = f.extend({}, b);
      b = j;
      var E, s, e, r, l, g, n = [], p = !b.once && [], y = function(j) {
          E = b.memory && j;
          s = !0;
          g = r || 0;
          r = 0;
          l = n.length;
          for (e = !0; n && g < l; g++)
              if (!1 === n[g].apply(j[0], j[1]) && b.stopOnFalse) {
                  E = !1;
                  break
              }
          e = !1;
          n && (p ? p.length && y(p.shift()) : E ? n = [] : m.disable())
      }, m = {
          add: function() {
              if (n) {
                  var j = n.length;
                  (function yc(j) {
                      f.each(j, function(j, c) {
                          var d = f.type(c);
                          "function" === d && (!b.unique || !m.has(c)) ? n.push(c) : c && c.length && "string" !== d && yc(c)
                      })
                  }
                  )(arguments);
                  e ? l = n.length : E && (r = j,
                  y(E))
              }
              return this
          },
          remove: function() {
              return n && f.each(arguments, function(b, u) {
                  for (var j; -1 < (j = f.inArray(u, n, j)); )
                      n.splice(j, 1),
                      e && (j <= l && l--,
                      j <= g && g--)
              }),
              this
          },
          has: function(b) {
              return -1 < f.inArray(b, n)
          },
          empty: function() {
              return n = [],
              this
          },
          disable: function() {
              return n = p = E = c,
              this
          },
          disabled: function() {
              return !n
          },
          lock: function() {
              return p = c,
              E || m.disable(),
              this
          },
          locked: function() {
              return !p
          },
          fireWith: function(b, u) {
              return u = u || [],
              u = [b, u.slice ? u.slice() : u],
              n && (!s || p) && (e ? p.push(u) : y(u)),
              this
          },
          fire: function() {
              return m.fireWith(this, arguments),
              this
          },
          fired: function() {
              return !!s
          }
      };
      return m
  }
  ;
  f.extend({
      Deferred: function(b) {
          var j = [["resolve", "done", f.Callbacks("once memory"), "resolved"], ["reject", "fail", f.Callbacks("once memory"), "rejected"], ["notify", "progress", f.Callbacks("memory")]]
            , c = "pending"
            , d = {
              state: function() {
                  return c
              },
              always: function() {
                  return s.done(arguments).fail(arguments),
                  this
              },
              then: function() {
                  var b = arguments;
                  return f.Deferred(function(u) {
                      f.each(j, function(j, c) {
                          var d = c[0]
                            , z = b[j];
                          s[c[1]](f.isFunction(z) ? function() {
                              var b = z.apply(this, arguments);
                              b && f.isFunction(b.promise) ? b.promise().done(u.resolve).fail(u.reject).progress(u.notify) : u[d + "With"](this === s ? u : this, [b])
                          }
                          : u[d])
                      });
                      b = null
                  }).promise()
              },
              promise: function(b) {
                  return null != b ? f.extend(b, d) : d
              }
          }
            , s = {};
          return d.pipe = d.then,
          f.each(j, function(b, u) {
              var f = u[2]
                , e = u[3];
              d[u[1]] = f.add;
              e && f.add(function() {
                  c = e
              }, j[b ^ 1][2].disable, j[2][2].lock);
              s[u[0]] = f.fire;
              s[u[0] + "With"] = f.fireWith
          }),
          d.promise(s),
          b && b.call(s, s),
          s
      },
      when: function(b) {
          var j = 0, c = aa.call(arguments), d = c.length, s = 1 !== d || b && f.isFunction(b.promise) ? d : 0, e = 1 === s ? b : f.Deferred(), r = function(b, u, j) {
              return function(c) {
                  u[b] = this;
                  j[b] = 1 < arguments.length ? aa.call(arguments) : c;
                  j === l ? e.notifyWith(u, j) : --s || e.resolveWith(u, j)
              }
          }, l, g, n;
          if (1 < d) {
              l = Array(d);
              g = Array(d);
              for (n = Array(d); j < d; j++)
                  c[j] && f.isFunction(c[j].promise) ? c[j].promise().done(r(j, n, c)).fail(e.reject).progress(r(j, g, l)) : --s
          }
          return s || e.resolveWith(n, c),
          e.promise()
      }
  });
  var Oc = f, cb;
  var O, Ha, ha, Ia, Ja, T, ia, Ka, db, va, Kb, L = C.createElement("div");
  L.setAttribute("className", "t");
  L.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
  Ha = L.getElementsByTagName("*");
  ha = L.getElementsByTagName("a")[0];
  ha.style.cssText = "top:1px;float:left;opacity:.5";
  if (!Ha || !Ha.length)
      cb = {};
  else {
      Ia = C.createElement("select");
      Ja = Ia.appendChild(C.createElement("option"));
      T = L.getElementsByTagName("input")[0];
      O = {
          leadingWhitespace: 3 === L.firstChild.nodeType,
          tbody: !L.getElementsByTagName("tbody").length,
          htmlSerialize: !!L.getElementsByTagName("link").length,
          style: /top/.test(ha.getAttribute("style")),
          hrefNormalized: "/a" === ha.getAttribute("href"),
          opacity: /^0.5/.test(ha.style.opacity),
          cssFloat: !!ha.style.cssFloat,
          checkOn: "on" === T.value,
          optSelected: Ja.selected,
          getSetAttribute: "t" !== L.className,
          enctype: !!C.createElement("form").enctype,
          html5Clone: "<:nav></:nav>" !== C.createElement("nav").cloneNode(!0).outerHTML,
          boxModel: "CSS1Compat" === C.compatMode,
          submitBubbles: !0,
          changeBubbles: !0,
          focusinBubbles: !1,
          deleteExpando: !0,
          noCloneEvent: !0,
          inlineBlockNeedsLayout: !1,
          shrinkWrapBlocks: !1,
          reliableMarginRight: !0,
          boxSizingReliable: !0,
          pixelPosition: !1
      };
      T.checked = !0;
      O.noCloneChecked = T.cloneNode(!0).checked;
      Ia.disabled = !0;
      O.optDisabled = !Ja.disabled;
      try {
          delete L.test
      } catch (Qd) {
          O.deleteExpando = !1
      }
      !L.addEventListener && L.attachEvent && L.fireEvent && (L.attachEvent("onclick", Kb = function() {
          O.noCloneEvent = !1
      }
      ),
      L.cloneNode(!0).fireEvent("onclick"),
      L.detachEvent("onclick", Kb));
      T = C.createElement("input");
      T.value = "t";
      T.setAttribute("type", "radio");
      O.radioValue = "t" === T.value;
      T.setAttribute("checked", "checked");
      T.setAttribute("name", "t");
      L.appendChild(T);
      ia = C.createDocumentFragment();
      ia.appendChild(L.lastChild);
      O.checkClone = ia.cloneNode(!0).cloneNode(!0).lastChild.checked;
      O.appendChecked = T.checked;
      ia.removeChild(T);
      ia.appendChild(L);
      if (L.attachEvent)
          for (db in {
              submit: !0,
              change: !0,
              focusin: !0
          })
              Ka = "on" + db,
              (va = Ka in L) || (L.setAttribute(Ka, "return;"),
              va = "function" == typeof L[Ka]),
              O[db + "Bubbles"] = va;
      cb = (f(function() {
          var u, j, c, d, f = C.getElementsByTagName("body")[0];
          f && (u = C.createElement("div"),
          u.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
          f.insertBefore(u, f.firstChild),
          j = C.createElement("div"),
          u.appendChild(j),
          j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
          c = j.getElementsByTagName("td"),
          c[0].style.cssText = "padding:0;margin:0;border:0;display:none",
          va = 0 === c[0].offsetHeight,
          c[0].style.display = "",
          c[1].style.display = "none",
          O.reliableHiddenOffsets = va && 0 === c[0].offsetHeight,
          j.innerHTML = "",
          j.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
          O.boxSizing = 4 === j.offsetWidth,
          O.doesNotIncludeMarginInBodyOffset = 1 !== f.offsetTop,
          b.getComputedStyle && (O.pixelPosition = "1%" !== (b.getComputedStyle(j, null) || {}).top,
          O.boxSizingReliable = "4px" === (b.getComputedStyle(j, null) || {
              width: "4px"
          }).width,
          d = C.createElement("div"),
          d.style.cssText = j.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
          d.style.marginRight = d.style.width = "0",
          j.style.width = "1px",
          j.appendChild(d),
          O.reliableMarginRight = !parseFloat((b.getComputedStyle(d, null) || {}).marginRight)),
          "undefined" != typeof j.style.zoom && (j.innerHTML = "",
          j.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1",
          O.inlineBlockNeedsLayout = 3 === j.offsetWidth,
          j.style.display = "block",
          j.style.overflow = "visible",
          j.innerHTML = "<div></div>",
          j.firstChild.style.width = "5px",
          O.shrinkWrapBlocks = 3 !== j.offsetWidth,
          u.style.zoom = 1),
          f.removeChild(u))
      }),
      ia.removeChild(L),
      Ha = ha = Ia = Ja = T = ia = L = null,
      O)
  }
  Oc.support = cb;
  var uc = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
    , tc = /([A-Z])/g;
  f.extend({
      cache: {},
      deletedIds: [],
      uuid: 0,
      expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
      noData: {
          embed: !0,
          object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
          applet: !0
      },
      hasData: function(b) {
          return b = b.nodeType ? f.cache[b[f.expando]] : b[f.expando],
          !!b && !e(b)
      },
      data: function(b, j, d, E) {
          if (f.acceptData(b)) {
              var s, e, r = f.expando, l = "string" == typeof j, g = b.nodeType, n = g ? f.cache : b, p = g ? b[r] : b[r] && r;
              if (p && n[p] && (E || n[p].data) || !(l && d === c)) {
                  p || (g ? b[r] = p = f.deletedIds.pop() || f.guid++ : p = r);
                  n[p] || (n[p] = {},
                  g || (n[p].toJSON = f.noop));
                  if ("object" == typeof j || "function" == typeof j)
                      E ? n[p] = f.extend(n[p], j) : n[p].data = f.extend(n[p].data, j);
                  return s = n[p],
                  E || (s.data || (s.data = {}),
                  s = s.data),
                  d !== c && (s[f.camelCase(j)] = d),
                  l ? (e = s[j],
                  null == e && (e = s[f.camelCase(j)])) : e = s,
                  e
              }
          }
      },
      removeData: function(b, j, c) {
          if (f.acceptData(b)) {
              var d, s, l, r = b.nodeType, g = r ? f.cache : b, n = r ? b[f.expando] : f.expando;
              if (g[n]) {
                  if (j && (d = c ? g[n] : g[n].data)) {
                      f.isArray(j) || (j in d ? j = [j] : (j = f.camelCase(j),
                      j in d ? j = [j] : j = j.split(" ")));
                      s = 0;
                      for (l = j.length; s < l; s++)
                          delete d[j[s]];
                      if (!(c ? e : f.isEmptyObject)(d))
                          return
                  }
                  if (!c && (delete g[n].data,
                  !e(g[n])))
                      return;
                  r ? f.cleanData([b], !0) : f.support.deleteExpando || g != g.window ? delete g[n] : g[n] = null
              }
          }
      },
      _data: function(b, c, d) {
          return f.data(b, c, d, !0)
      },
      acceptData: function(b) {
          var c = b.nodeName && f.noData[b.nodeName.toLowerCase()];
          return !c || !0 !== c && b.getAttribute("classid") === c
      }
  });
  f.fn.extend({
      data: function(b, j) {
          var z, E, s, e, r, l = this[0], g = 0, n = null;
          if (b === c) {
              if (this.length && (n = f.data(l),
              1 === l.nodeType && !f._data(l, "parsedAttrs"))) {
                  s = l.attributes;
                  for (r = s.length; g < r; g++)
                      e = s[g].name,
                      e.indexOf("data-") || (e = f.camelCase(e.substring(5)),
                      d(l, e, n[e]));
                  f._data(l, "parsedAttrs", !0)
              }
              return n
          }
          return "object" == typeof b ? this.each(function() {
              f.data(this, b)
          }) : (z = b.split(".", 2),
          z[1] = z[1] ? "." + z[1] : "",
          E = z[1] + "!",
          f.access(this, function(j) {
              if (j === c)
                  return n = this.triggerHandler("getData" + E, [z[0]]),
                  n === c && l && (n = f.data(l, b),
                  n = d(l, b, n)),
                  n === c && z[1] ? this.data(z[0]) : n;
              z[1] = j;
              this.each(function() {
                  var c = f(this);
                  c.triggerHandler("setData" + E, z);
                  f.data(this, b, j);
                  c.triggerHandler("changeData" + E, z)
              })
          }, null, j, 1 < arguments.length, null, !1))
      },
      removeData: function(b) {
          return this.each(function() {
              f.removeData(this, b)
          })
      }
  });
  f.extend({
      queue: function(b, c, d) {
          var E;
          if (b)
              return c = (c || "fx") + "queue",
              E = f._data(b, c),
              d && (!E || f.isArray(d) ? E = f._data(b, c, f.makeArray(d)) : E.push(d)),
              E || []
      },
      dequeue: function(b, c) {
          c = c || "fx";
          var d = f.queue(b, c)
            , E = d.length
            , s = d.shift()
            , e = f._queueHooks(b, c)
            , r = function() {
              f.dequeue(b, c)
          };
          "inprogress" === s && (s = d.shift(),
          E--);
          s && ("fx" === c && d.unshift("inprogress"),
          delete e.stop,
          s.call(b, r, e));
          !E && e && e.empty.fire()
      },
      _queueHooks: function(b, c) {
          var d = c + "queueHooks";
          return f._data(b, d) || f._data(b, d, {
              empty: f.Callbacks("once memory").add(function() {
                  f.removeData(b, c + "queue", !0);
                  f.removeData(b, d, !0)
              })
          })
      }
  });
  f.fn.extend({
      queue: function(b, j) {
          var d = 2;
          return "string" != typeof b && (j = b,
          b = "fx",
          d--),
          arguments.length < d ? f.queue(this[0], b) : j === c ? this : this.each(function() {
              var c = f.queue(this, b, j);
              f._queueHooks(this, b);
              "fx" === b && "inprogress" !== c[0] && f.dequeue(this, b)
          })
      },
      dequeue: function(b) {
          return this.each(function() {
              f.dequeue(this, b)
          })
      },
      delay: function(b, c) {
          return b = f.fx ? f.fx.speeds[b] || b : b,
          c = c || "fx",
          this.queue(c, function(c, j) {
              var d = setTimeout(c, b);
              j.stop = function() {
                  clearTimeout(d)
              }
          })
      },
      clearQueue: function(b) {
          return this.queue(b || "fx", [])
      },
      promise: function(b, j) {
          var d, E = 1, e = f.Deferred(), l = this, r = this.length, g = function() {
              --E || e.resolveWith(l, [l])
          };
          "string" != typeof b && (j = b,
          b = c);
          for (b = b || "fx"; r--; )
              (d = f._data(l[r], b + "queueHooks")) && d.empty && (E++,
              d.empty.add(g));
          return g(),
          e.promise(j)
      }
  });
  var ba, Lb, Mb, Nb = /[\t\r\n]/g, Pc = /\r/g, Qc = /^(?:button|input)$/i, Rc = /^(?:button|input|object|select|textarea)$/i, Sc = /^a(?:rea|)$/i, Ob = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Pb = f.support.getSetAttribute;
  f.fn.extend({
      attr: function(b, c) {
          return f.access(this, f.attr, b, c, 1 < arguments.length)
      },
      removeAttr: function(b) {
          return this.each(function() {
              f.removeAttr(this, b)
          })
      },
      prop: function(b, c) {
          return f.access(this, f.prop, b, c, 1 < arguments.length)
      },
      removeProp: function(b) {
          return b = f.propFix[b] || b,
          this.each(function() {
              try {
                  this[b] = c,
                  delete this[b]
              } catch (j) {}
          })
      },
      addClass: function(b) {
          var c, d, E, e, l, r, g;
          if (f.isFunction(b))
              return this.each(function(c) {
                  f(this).addClass(b.call(this, c, this.className))
              });
          if (b && "string" == typeof b) {
              c = b.split(fa);
              d = 0;
              for (E = this.length; d < E; d++)
                  if (e = this[d],
                  1 === e.nodeType)
                      if (!e.className && 1 === c.length)
                          e.className = b;
                      else {
                          l = " " + e.className + " ";
                          r = 0;
                          for (g = c.length; r < g; r++)
                              0 > l.indexOf(" " + c[r] + " ") && (l += c[r] + " ");
                          e.className = f.trim(l)
                      }
          }
          return this
      },
      removeClass: function(b) {
          var j, d, E, e, l, r, g;
          if (f.isFunction(b))
              return this.each(function(c) {
                  f(this).removeClass(b.call(this, c, this.className))
              });
          if (b && "string" == typeof b || b === c) {
              j = (b || "").split(fa);
              r = 0;
              for (g = this.length; r < g; r++)
                  if (E = this[r],
                  1 === E.nodeType && E.className) {
                      d = (" " + E.className + " ").replace(Nb, " ");
                      e = 0;
                      for (l = j.length; e < l; e++)
                          for (; 0 <= d.indexOf(" " + j[e] + " "); )
                              d = d.replace(" " + j[e] + " ", " ");
                      E.className = b ? f.trim(d) : ""
                  }
          }
          return this
      },
      toggleClass: function(b, c) {
          var d = typeof b
            , E = "boolean" == typeof c;
          return f.isFunction(b) ? this.each(function(d) {
              f(this).toggleClass(b.call(this, d, this.className, c), c)
          }) : this.each(function() {
              if ("string" === d)
                  for (var e, l = 0, r = f(this), g = c, n = b.split(fa); e = n[l++]; )
                      g = E ? g : !r.hasClass(e),
                      r[g ? "addClass" : "removeClass"](e);
              else if ("undefined" === d || "boolean" === d)
                  this.className && f._data(this, "__className__", this.className),
                  this.className = this.className || !1 === b ? "" : f._data(this, "__className__") || ""
          })
      },
      hasClass: function(b) {
          b = " " + b + " ";
          for (var c = 0, d = this.length; c < d; c++)
              if (1 === this[c].nodeType && 0 <= (" " + this[c].className + " ").replace(Nb, " ").indexOf(b))
                  return !0;
          return !1
      },
      val: function(b) {
          var j, d, e, s = this[0];
          if (arguments.length)
              return e = f.isFunction(b),
              this.each(function(d) {
                  var z, s = f(this);
                  if (1 === this.nodeType && (e ? z = b.call(this, d, s.val()) : z = b,
                  null == z ? z = "" : "number" == typeof z ? z += "" : f.isArray(z) && (z = f.map(z, function(b) {
                      return null == b ? "" : b + ""
                  })),
                  j = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()],
                  !j || !("set"in j) || j.set(this, z, "value") === c))
                      this.value = z
              });
          if (s)
              return j = f.valHooks[s.type] || f.valHooks[s.nodeName.toLowerCase()],
              j && "get"in j && (d = j.get(s, "value")) !== c ? d : (d = s.value,
              "string" == typeof d ? d.replace(Pc, "") : null == d ? "" : d)
      }
  });
  f.extend({
      valHooks: {
          option: {
              get: function(b) {
                  var c = b.attributes.value;
                  return !c || c.specified ? b.value : b.text
              }
          },
          select: {
              get: function(b) {
                  var c, d, e = b.selectedIndex, s = [], l = b.options, r = "select-one" === b.type;
                  if (0 > e)
                      return null;
                  b = r ? e : 0;
                  for (d = r ? e + 1 : l.length; b < d; b++)
                      if (c = l[b],
                      c.selected && (f.support.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !f.nodeName(c.parentNode, "optgroup"))) {
                          c = f(c).val();
                          if (r)
                              return c;
                          s.push(c)
                      }
                  return r && !s.length && l.length ? f(l[e]).val() : s
              },
              set: function(b, c) {
                  var d = f.makeArray(c);
                  return f(b).find("option").each(function() {
                      this.selected = 0 <= f.inArray(f(this).val(), d)
                  }),
                  d.length || (b.selectedIndex = -1),
                  d
              }
          }
      },
      attrFn: {},
      attr: function(b, j, d, e) {
          var s, l, r = b.nodeType;
          if (b && !(3 === r || 8 === r || 2 === r)) {
              if (e && f.isFunction(f.fn[j]))
                  return f(b)[j](d);
              if ("undefined" == typeof b.getAttribute)
                  return f.prop(b, j, d);
              (e = 1 !== r || !f.isXMLDoc(b)) && (j = j.toLowerCase(),
              l = f.attrHooks[j] || (Ob.test(j) ? Lb : ba));
              if (d !== c) {
                  if (null === d) {
                      f.removeAttr(b, j);
                      return
                  }
                  return l && "set"in l && e && (s = l.set(b, d, j)) !== c ? s : (b.setAttribute(j, d + ""),
                  d)
              }
              return l && "get"in l && e && null !== (s = l.get(b, j)) ? s : (s = b.getAttribute(j),
              null === s ? c : s)
          }
      },
      removeAttr: function(b, c) {
          var d, e, s, l, r = 0;
          if (c && 1 === b.nodeType)
              for (e = c.split(fa); r < e.length; r++)
                  (s = e[r]) && (d = f.propFix[s] || s,
                  l = Ob.test(s),
                  l || f.attr(b, s, ""),
                  b.removeAttribute(Pb ? s : d),
                  l && d in b && (b[d] = !1))
      },
      attrHooks: {
          type: {
              set: function(b, c) {
                  if (Qc.test(b.nodeName) && b.parentNode)
                      f.error("type property can't be changed");
                  else if (!f.support.radioValue && "radio" === c && f.nodeName(b, "input")) {
                      var d = b.value;
                      return b.setAttribute("type", c),
                      d && (b.value = d),
                      c
                  }
              }
          },
          value: {
              get: function(b, c) {
                  return ba && f.nodeName(b, "button") ? ba.get(b, c) : c in b ? b.value : null
              },
              set: function(b, c, d) {
                  if (ba && f.nodeName(b, "button"))
                      return ba.set(b, c, d);
                  b.value = c
              }
          }
      },
      propFix: {
          tabindex: "tabIndex",
          readonly: "readOnly",
          "for": "htmlFor",
          "class": "className",
          maxlength: "maxLength",
          cellspacing: "cellSpacing",
          cellpadding: "cellPadding",
          rowspan: "rowSpan",
          colspan: "colSpan",
          usemap: "useMap",
          frameborder: "frameBorder",
          contenteditable: "contentEditable"
      },
      prop: function(b, j, d) {
          var e, s, l, r = b.nodeType;
          if (b && !(3 === r || 8 === r || 2 === r))
              return l = 1 !== r || !f.isXMLDoc(b),
              l && (j = f.propFix[j] || j,
              s = f.propHooks[j]),
              d !== c ? s && "set"in s && (e = s.set(b, d, j)) !== c ? e : b[j] = d : s && "get"in s && null !== (e = s.get(b, j)) ? e : b[j]
      },
      propHooks: {
          tabIndex: {
              get: function(b) {
                  var j = b.getAttributeNode("tabindex");
                  return j && j.specified ? parseInt(j.value, 10) : Rc.test(b.nodeName) || Sc.test(b.nodeName) && b.href ? 0 : c
              }
          }
      }
  });
  Lb = {
      get: function(b, j) {
          var d, e = f.prop(b, j);
          return !0 === e || "boolean" != typeof e && (d = b.getAttributeNode(j)) && !1 !== d.nodeValue ? j.toLowerCase() : c
      },
      set: function(b, c, d) {
          var e;
          return !1 === c ? f.removeAttr(b, d) : (e = f.propFix[d] || d,
          e in b && (b[e] = !0),
          b.setAttribute(d, d.toLowerCase())),
          d
      }
  };
  Pb || (Mb = {
      name: !0,
      id: !0,
      coords: !0
  },
  ba = f.valHooks.button = {
      get: function(b, j) {
          var d;
          return d = b.getAttributeNode(j),
          d && (Mb[j] ? "" !== d.value : d.specified) ? d.value : c
      },
      set: function(b, c, d) {
          var f = b.getAttributeNode(d);
          return f || (f = C.createAttribute(d),
          b.setAttributeNode(f)),
          f.value = c + ""
      }
  },
  f.each(["width", "height"], function(b, c) {
      f.attrHooks[c] = f.extend(f.attrHooks[c], {
          set: function(b, u) {
              if ("" === u)
                  return b.setAttribute(c, "auto"),
                  u
          }
      })
  }),
  f.attrHooks.contenteditable = {
      get: ba.get,
      set: function(b, c, d) {
          "" === c && (c = "false");
          ba.set(b, c, d)
      }
  });
  f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(b, j) {
      f.attrHooks[j] = f.extend(f.attrHooks[j], {
          get: function(b) {
              b = b.getAttribute(j, 2);
              return null === b ? c : b
          }
      })
  });
  f.support.style || (f.attrHooks.style = {
      get: function(b) {
          return b.style.cssText.toLowerCase() || c
      },
      set: function(b, c) {
          return b.style.cssText = c + ""
      }
  });
  f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
      get: function(b) {
          b = b.parentNode;
          return b && (b.selectedIndex,
          b.parentNode && b.parentNode.selectedIndex),
          null
      }
  }));
  f.support.enctype || (f.propFix.enctype = "encoding");
  f.support.checkOn || f.each(["radio", "checkbox"], function() {
      f.valHooks[this] = {
          get: function(b) {
              return null === b.getAttribute("value") ? "on" : b.value
          }
      }
  });
  f.each(["radio", "checkbox"], function() {
      f.valHooks[this] = f.extend(f.valHooks[this], {
          set: function(b, c) {
              if (f.isArray(c))
                  return b.checked = 0 <= f.inArray(f(b).val(), c)
          }
      })
  });
  var eb = /^(?:textarea|input|select)$/i
    , Qb = /^([^\.]*|)(?:\.(.+)|)$/
    , Tc = /(?:^|\s)hover(\.\S+|)\b/
    , Uc = /^key/
    , Vc = /^(?:mouse|contextmenu)|click/
    , Rb = /^(?:focusinfocus|focusoutblur)$/
    , Sb = function(b) {
      return f.event.special.hover ? b : b.replace(Tc, "mouseenter$1 mouseleave$1")
  };
  f.event = {
      add: function(b, j, d, e, s) {
          var l, r, g, n, p, y, m, v, t;
          if (!(3 === b.nodeType || 8 === b.nodeType || !j || !d || !(l = f._data(b)))) {
              d.handler && (m = d,
              d = m.handler,
              s = m.selector);
              d.guid || (d.guid = f.guid++);
              (g = l.events) || (l.events = g = {});
              (r = l.handle) || (l.handle = r = function(b) {
                  return "undefined" != typeof f && (!b || f.event.triggered !== b.type) ? f.event.dispatch.apply(r.elem, arguments) : c
              }
              ,
              r.elem = b);
              j = f.trim(Sb(j)).split(" ");
              for (l = 0; l < j.length; l++) {
                  n = Qb.exec(j[l]) || [];
                  p = n[1];
                  y = (n[2] || "").split(".").sort();
                  t = f.event.special[p] || {};
                  p = (s ? t.delegateType : t.bindType) || p;
                  t = f.event.special[p] || {};
                  n = f.extend({
                      type: p,
                      origType: n[1],
                      data: e,
                      handler: d,
                      guid: d.guid,
                      selector: s,
                      needsContext: s && f.expr.match.needsContext.test(s),
                      namespace: y.join(".")
                  }, m);
                  v = g[p];
                  if (!v && (v = g[p] = [],
                  v.delegateCount = 0,
                  !t.setup || !1 === t.setup.call(b, e, y, r)))
                      b.addEventListener ? b.addEventListener(p, r, !1) : b.attachEvent && b.attachEvent("on" + p, r);
                  t.add && (t.add.call(b, n),
                  n.handler.guid || (n.handler.guid = d.guid));
                  s ? v.splice(v.delegateCount++, 0, n) : v.push(n);
                  f.event.global[p] = !0
              }
              b = null
          }
      },
      global: {},
      remove: function(b, c, d, e, s) {
          var l, r, g, n, p, y, m, v, t, A, q = f.hasData(b) && f._data(b);
          if (q && (m = q.events)) {
              c = f.trim(Sb(c || "")).split(" ");
              for (l = 0; l < c.length; l++)
                  if (r = Qb.exec(c[l]) || [],
                  g = n = r[1],
                  r = r[2],
                  g) {
                      v = f.event.special[g] || {};
                      g = (e ? v.delegateType : v.bindType) || g;
                      t = m[g] || [];
                      p = t.length;
                      r = r ? RegExp("(^|\\.)" + r.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                      for (y = 0; y < t.length; y++)
                          A = t[y],
                          (s || n === A.origType) && (!d || d.guid === A.guid) && (!r || r.test(A.namespace)) && (!e || e === A.selector || "**" === e && A.selector) && (t.splice(y--, 1),
                          A.selector && t.delegateCount--,
                          v.remove && v.remove.call(b, A));
                      0 === t.length && p !== t.length && ((!v.teardown || !1 === v.teardown.call(b, r, q.handle)) && f.removeEvent(b, g, q.handle),
                      delete m[g])
                  } else
                      for (g in m)
                          f.event.remove(b, g + c[l], d, e, !0);
              f.isEmptyObject(m) && (delete q.handle,
              f.removeData(b, "events", !0))
          }
      },
      customEvent: {
          getData: !0,
          setData: !0,
          changeData: !0
      },
      trigger: function(u, j, d, e) {
          if (!d || 3 !== d.nodeType && 8 !== d.nodeType) {
              var s, l, r, g, n, p, y, m = u.type || u;
              g = [];
              if (!Rb.test(m + f.event.triggered) && (0 <= m.indexOf("!") && (m = m.slice(0, -1),
              s = !0),
              0 <= m.indexOf(".") && (g = m.split("."),
              m = g.shift(),
              g.sort()),
              d && !f.event.customEvent[m] || f.event.global[m]))
                  if (u = "object" == typeof u ? u[f.expando] ? u : new f.Event(m,u) : new f.Event(m),
                  u.type = m,
                  u.isTrigger = !0,
                  u.exclusive = s,
                  u.namespace = g.join("."),
                  u.namespace_re = u.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                  g = 0 > m.indexOf(":") ? "on" + m : "",
                  d) {
                      if (u.result = c,
                      u.target || (u.target = d),
                      j = null != j ? f.makeArray(j) : [],
                      j.unshift(u),
                      n = f.event.special[m] || {},
                      !(n.trigger && !1 === n.trigger.apply(d, j))) {
                          y = [[d, n.bindType || m]];
                          if (!e && !n.noBubble && !f.isWindow(d)) {
                              l = n.delegateType || m;
                              s = Rb.test(l + m) ? d : d.parentNode;
                              for (r = d; s; s = s.parentNode)
                                  y.push([s, l]),
                                  r = s;
                              r === (d.ownerDocument || C) && y.push([r.defaultView || r.parentWindow || b, l])
                          }
                          for (l = 0; l < y.length && !u.isPropagationStopped(); l++)
                              s = y[l][0],
                              u.type = y[l][1],
                              (p = (f._data(s, "events") || {})[u.type] && f._data(s, "handle")) && p.apply(s, j),
                              (p = g && s[g]) && f.acceptData(s) && p.apply && !1 === p.apply(s, j) && u.preventDefault();
                          return u.type = m,
                          !e && !u.isDefaultPrevented() && (!n._default || !1 === n._default.apply(d.ownerDocument, j)) && ("click" !== m || !f.nodeName(d, "a")) && f.acceptData(d) && g && d[m] && ("focus" !== m && "blur" !== m || 0 !== u.target.offsetWidth) && !f.isWindow(d) && (r = d[g],
                          r && (d[g] = null),
                          f.event.triggered = m,
                          d[m](),
                          f.event.triggered = c,
                          r && (d[g] = r)),
                          u.result
                      }
                  } else
                      for (l in d = f.cache,
                      d)
                          d[l].events && d[l].events[m] && f.event.trigger(u, j, d[l].handle.elem, !0)
          }
      },
      dispatch: function(u) {
          u = f.event.fix(u || b.event);
          var j, d, e, l, g, r, n = (f._data(this, "events") || {})[u.type] || [], p = n.delegateCount, m = aa.call(arguments), y = !u.exclusive && !u.namespace, v = f.event.special[u.type] || {}, t = [];
          m[0] = u;
          u.delegateTarget = this;
          if (!(v.preDispatch && !1 === v.preDispatch.call(this, u))) {
              if (p && (!u.button || "click" !== u.type))
                  for (d = u.target; d != this; d = d.parentNode || this)
                      if (!0 !== d.disabled || "click" !== u.type) {
                          l = {};
                          g = [];
                          for (j = 0; j < p; j++)
                              e = n[j],
                              r = e.selector,
                              l[r] === c && (l[r] = e.needsContext ? 0 <= f(r, this).index(d) : f.find(r, this, null, [d]).length),
                              l[r] && g.push(e);
                          g.length && t.push({
                              elem: d,
                              matches: g
                          })
                      }
              n.length > p && t.push({
                  elem: this,
                  matches: n.slice(p)
              });
              for (j = 0; j < t.length && !u.isPropagationStopped(); j++) {
                  l = t[j];
                  u.currentTarget = l.elem;
                  for (d = 0; d < l.matches.length && !u.isImmediatePropagationStopped(); d++)
                      if (e = l.matches[d],
                      y || !u.namespace && !e.namespace || u.namespace_re && u.namespace_re.test(e.namespace))
                          u.data = e.data,
                          u.handleObj = e,
                          e = ((f.event.special[e.origType] || {}).handle || e.handler).apply(l.elem, m),
                          e !== c && (u.result = e,
                          !1 === e && (u.preventDefault(),
                          u.stopPropagation()))
              }
              return v.postDispatch && v.postDispatch.call(this, u),
              u.result
          }
      },
      props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
          props: ["char", "charCode", "key", "keyCode"],
          filter: function(b, c) {
              return null == b.which && (b.which = null != c.charCode ? c.charCode : c.keyCode),
              b
          }
      },
      mouseHooks: {
          props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
          filter: function(b, j) {
              var d, f, e, l = j.button, r = j.fromElement;
              return null == b.pageX && null != j.clientX && (d = b.target.ownerDocument || C,
              f = d.documentElement,
              e = d.body,
              b.pageX = j.clientX + (f && f.scrollLeft || e && e.scrollLeft || 0) - (f && f.clientLeft || e && e.clientLeft || 0),
              b.pageY = j.clientY + (f && f.scrollTop || e && e.scrollTop || 0) - (f && f.clientTop || e && e.clientTop || 0)),
              !b.relatedTarget && r && (b.relatedTarget = r === b.target ? j.toElement : r),
              !b.which && l !== c && (b.which = l & 1 ? 1 : l & 2 ? 3 : l & 4 ? 2 : 0),
              b
          }
      },
      fix: function(b) {
          if (b[f.expando])
              return b;
          var c, d, e = b, l = f.event.fixHooks[b.type] || {}, g = l.props ? this.props.concat(l.props) : this.props;
          b = f.Event(e);
          for (c = g.length; c; )
              d = g[--c],
              b[d] = e[d];
          return b.target || (b.target = e.srcElement || C),
          3 === b.target.nodeType && (b.target = b.target.parentNode),
          b.metaKey = !!b.metaKey,
          l.filter ? l.filter(b, e) : b
      },
      special: {
          load: {
              noBubble: !0
          },
          focus: {
              delegateType: "focusin"
          },
          blur: {
              delegateType: "focusout"
          },
          beforeunload: {
              setup: function(b, c, d) {
                  f.isWindow(this) && (this.onbeforeunload = d)
              },
              teardown: function(b, c) {
                  this.onbeforeunload === c && (this.onbeforeunload = null)
              }
          }
      },
      simulate: function(b, c, d, e) {
          b = f.extend(new f.Event, d, {
              type: b,
              isSimulated: !0,
              originalEvent: {}
          });
          e ? f.event.trigger(b, null, c) : f.event.dispatch.call(c, b);
          b.isDefaultPrevented() && d.preventDefault()
      }
  };
  f.event.handle = f.event.dispatch;
  f.removeEvent = C.removeEventListener ? function(b, c, d) {
      b.removeEventListener && b.removeEventListener(c, d, !1)
  }
  : function(b, c, d) {
      c = "on" + c;
      b.detachEvent && ("undefined" == typeof b[c] && (b[c] = null),
      b.detachEvent(c, d))
  }
  ;
  f.Event = function(b, c) {
      if (this instanceof f.Event)
          b && b.type ? (this.originalEvent = b,
          this.type = b.type,
          this.isDefaultPrevented = b.defaultPrevented || !1 === b.returnValue || b.getPreventDefault && b.getPreventDefault() ? m : g) : this.type = b,
          c && f.extend(this, c),
          this.timeStamp = b && b.timeStamp || f.now(),
          this[f.expando] = !0;
      else
          return new f.Event(b,c)
  }
  ;
  f.Event.prototype = {
      preventDefault: function() {
          this.isDefaultPrevented = m;
          var b = this.originalEvent;
          b && (b.preventDefault ? b.preventDefault() : b.returnValue = !1)
      },
      stopPropagation: function() {
          this.isPropagationStopped = m;
          var b = this.originalEvent;
          b && (b.stopPropagation && b.stopPropagation(),
          b.cancelBubble = !0)
      },
      stopImmediatePropagation: function() {
          this.isImmediatePropagationStopped = m;
          this.stopPropagation()
      },
      isDefaultPrevented: g,
      isPropagationStopped: g,
      isImmediatePropagationStopped: g
  };
  f.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout"
  }, function(b, c) {
      f.event.special[b] = {
          delegateType: c,
          bindType: c,
          handle: function(b) {
              var u, d = b.relatedTarget, e = b.handleObj;
              if (!d || d !== this && !f.contains(this, d))
                  b.type = e.origType,
                  u = e.handler.apply(this, arguments),
                  b.type = c;
              return u
          }
      }
  });
  f.support.submitBubbles || (f.event.special.submit = {
      setup: function() {
          if (f.nodeName(this, "form"))
              return !1;
          f.event.add(this, "click._submit keypress._submit", function(b) {
              b = b.target;
              (b = f.nodeName(b, "input") || f.nodeName(b, "button") ? b.form : c) && !f._data(b, "_submit_attached") && (f.event.add(b, "submit._submit", function(b) {
                  b._submit_bubble = !0
              }),
              f._data(b, "_submit_attached", !0))
          })
      },
      postDispatch: function(b) {
          b._submit_bubble && (delete b._submit_bubble,
          this.parentNode && !b.isTrigger && f.event.simulate("submit", this.parentNode, b, !0))
      },
      teardown: function() {
          if (f.nodeName(this, "form"))
              return !1;
          f.event.remove(this, "._submit")
      }
  });
  f.support.changeBubbles || (f.event.special.change = {
      setup: function() {
          if (eb.test(this.nodeName)) {
              if ("checkbox" === this.type || "radio" === this.type)
                  f.event.add(this, "propertychange._change", function(b) {
                      "checked" === b.originalEvent.propertyName && (this._just_changed = !0)
                  }),
                  f.event.add(this, "click._change", function(b) {
                      this._just_changed && !b.isTrigger && (this._just_changed = !1);
                      f.event.simulate("change", this, b, !0)
                  });
              return !1
          }
          f.event.add(this, "beforeactivate._change", function(b) {
              b = b.target;
              eb.test(b.nodeName) && !f._data(b, "_change_attached") && (f.event.add(b, "change._change", function(b) {
                  this.parentNode && !b.isSimulated && !b.isTrigger && f.event.simulate("change", this.parentNode, b, !0)
              }),
              f._data(b, "_change_attached", !0))
          })
      },
      handle: function(b) {
          var c = b.target;
          if (this !== c || b.isSimulated || b.isTrigger || "radio" !== c.type && "checkbox" !== c.type)
              return b.handleObj.handler.apply(this, arguments)
      },
      teardown: function() {
          return f.event.remove(this, "._change"),
          !eb.test(this.nodeName)
      }
  });
  f.support.focusinBubbles || f.each({
      focus: "focusin",
      blur: "focusout"
  }, function(b, c) {
      var d = 0
        , e = function(b) {
          f.event.simulate(c, b.target, f.event.fix(b), !0)
      };
      f.event.special[c] = {
          setup: function() {
              0 === d++ && C.addEventListener(b, e, !0)
          },
          teardown: function() {
              0 === --d && C.removeEventListener(b, e, !0)
          }
      }
  });
  f.fn.extend({
      on: function(b, j, d, e, l) {
          var n, r;
          if ("object" == typeof b) {
              "string" != typeof j && (d = d || j,
              j = c);
              for (r in b)
                  this.on(r, j, d, b[r], l);
              return this
          }
          null == d && null == e ? (e = j,
          d = j = c) : null == e && ("string" == typeof j ? (e = d,
          d = c) : (e = d,
          d = j,
          j = c));
          if (!1 === e)
              e = g;
          else if (!e)
              return this;
          return 1 === l && (n = e,
          e = function(b) {
              return f().off(b),
              n.apply(this, arguments)
          }
          ,
          e.guid = n.guid || (n.guid = f.guid++)),
          this.each(function() {
              f.event.add(this, b, e, d, j)
          })
      },
      one: function(b, c, d, f) {
          return this.on(b, c, d, f, 1)
      },
      off: function(b, d, e) {
          var l, s;
          if (b && b.preventDefault && b.handleObj)
              return l = b.handleObj,
              f(b.delegateTarget).off(l.namespace ? l.origType + "." + l.namespace : l.origType, l.selector, l.handler),
              this;
          if ("object" == typeof b) {
              for (s in b)
                  this.off(s, d, b[s]);
              return this
          }
          if (!1 === d || "function" == typeof d)
              e = d,
              d = c;
          return !1 === e && (e = g),
          this.each(function() {
              f.event.remove(this, b, e, d)
          })
      },
      bind: function(b, c, d) {
          return this.on(b, null, c, d)
      },
      unbind: function(b, c) {
          return this.off(b, null, c)
      },
      live: function(b, c, d) {
          return f(this.context).on(b, this.selector, c, d),
          this
      },
      die: function(b, c) {
          return f(this.context).off(b, this.selector || "**", c),
          this
      },
      delegate: function(b, c, d, f) {
          return this.on(c, b, d, f)
      },
      undelegate: function(b, c, d) {
          return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", d)
      },
      trigger: function(b, c) {
          return this.each(function() {
              f.event.trigger(b, c, this)
          })
      },
      triggerHandler: function(b, c) {
          if (this[0])
              return f.event.trigger(b, c, this[0], !0)
      },
      toggle: function(b) {
          var c = arguments
            , d = b.guid || f.guid++
            , e = 0
            , l = function(d) {
              var z = (f._data(this, "lastToggle" + b.guid) || 0) % e;
              return f._data(this, "lastToggle" + b.guid, z + 1),
              d.preventDefault(),
              c[z].apply(this, arguments) || !1
          };
          for (l.guid = d; e < c.length; )
              c[e++].guid = d;
          return this.click(l)
      },
      hover: function(b, c) {
          return this.mouseenter(b).mouseleave(c || b)
      }
  });
  f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(b, c) {
      f.fn[c] = function(b, d) {
          return null == d && (d = b,
          b = null),
          0 < arguments.length ? this.on(c, null, b, d) : this.trigger(c)
      }
      ;
      Uc.test(c) && (f.event.fixHooks[c] = f.event.keyHooks);
      Vc.test(c) && (f.event.fixHooks[c] = f.event.mouseHooks)
  });
  var Wc = b, H = function(b, c, d, f) {
      d = d || [];
      c = c || X;
      var e, l, r, g, n = c.nodeType;
      if (!b || "string" != typeof b)
          return d;
      if (1 !== n && 9 !== n)
          return [];
      r = La(c);
      if (!r && !f && (e = Xc.exec(b)))
          if (g = e[1])
              if (9 === n) {
                  l = c.getElementById(g);
                  if (!l || !l.parentNode)
                      return d;
                  if (l.id === g)
                      return d.push(l),
                      d
              } else {
                  if (c.ownerDocument && (l = c.ownerDocument.getElementById(g)) && Tb(c, l) && l.id === g)
                      return d.push(l),
                      d
              }
          else {
              if (e[2])
                  return pa.apply(d, qa.call(c.getElementsByTagName(b), 0)),
                  d;
              if ((g = e[3]) && Ub && c.getElementsByClassName)
                  return pa.apply(d, qa.call(c.getElementsByClassName(g), 0)),
                  d
          }
      return fb(b.replace(Ma, "$1"), c, d, f, r)
  }, wa = function(b) {
      return function(c) {
          return "input" === c.nodeName.toLowerCase() && c.type === b
      }
  }, Vb = function(b) {
      return function(c) {
          var d = c.nodeName.toLowerCase();
          return ("input" === d || "button" === d) && c.type === b
      }
  }, ja = function(b) {
      return Y(function(c) {
          return c = +c,
          Y(function(d, f) {
              for (var e, l = b([], d.length, c), r = l.length; r--; )
                  d[e = l[r]] && (d[e] = !(f[e] = d[e]))
          })
      })
  }, Na = function(b, c, d) {
      if (b === c)
          return d;
      for (b = b.nextSibling; b; ) {
          if (b === c)
              return -1;
          b = b.nextSibling
      }
      return 1
  }, Pa = function(b, c) {
      var d, f, e, l, r, g, n;
      if (r = Wb[J][b])
          return c ? 0 : r.slice(0);
      r = b;
      g = [];
      for (n = M.preFilter; r; ) {
          if (!d || (f = Yc.exec(r)))
              f && (r = r.slice(f[0].length)),
              g.push(e = []);
          d = !1;
          if (f = Zc.exec(r))
              e.push(d = new Xb(f.shift())),
              r = r.slice(d.length),
              d.type = f[0].replace(Ma, " ");
          for (l in M.filter)
              (f = Oa[l].exec(r)) && (!n[l] || (f = n[l](f, X, !0))) && (e.push(d = new Xb(f.shift())),
              r = r.slice(d.length),
              d.type = l,
              d.matches = f);
          if (!d)
              break
      }
      return c ? r.length : r ? H.error(b) : Wb(b, g).slice(0)
  }, hb = function(b, c, d) {
      var f = c.dir
        , e = d && "parentNode" === c.dir
        , l = $c++;
      return c.first ? function(c, d, j) {
          for (; c = c[f]; )
              if (e || 1 === c.nodeType)
                  return b(c, d, j)
      }
      : function(c, d, j) {
          if (j)
              for (; c = c[f]; ) {
                  if ((e || 1 === c.nodeType) && b(c, d, j))
                      return c
              }
          else
              for (var z, g = xa + " " + l + " ", n = g + gb; c = c[f]; )
                  if (e || 1 === c.nodeType) {
                      if ((z = c[J]) === n)
                          return c.sizset;
                      if ("string" == typeof z && 0 === z.indexOf(g)) {
                          if (c.sizset)
                              return c
                      } else {
                          c[J] = n;
                          if (b(c, d, j))
                              return c.sizset = !0,
                              c;
                          c.sizset = !1
                      }
                  }
      }
  }, ib = function(b) {
      return 1 < b.length ? function(c, d, f) {
          for (var e = b.length; e--; )
              if (!b[e](c, d, f))
                  return !1;
          return !0
      }
      : b[0]
  }, Qa = function(b, c, d, f, e) {
      for (var l, g = [], n = 0, p = b.length, m = null != c; n < p; n++)
          if (l = b[n])
              if (!d || d(l, f, e))
                  g.push(l),
                  m && c.push(n);
      return g
  }, jb = function(b, c, d, f, e, l) {
      return f && !f[J] && (f = jb(f)),
      e && !e[J] && (e = jb(e, l)),
      Y(function(l, g, n, p) {
          if (!l || !e) {
              var m, y, D = [], v = [], t = g.length;
              if (!(y = l)) {
                  y = c || "*";
                  var A = n.nodeType ? [n] : n
                    , q = [];
                  m = 0;
                  for (var x = A.length; m < x; m++)
                      H(y, A[m], q, l);
                  y = q
              }
              A = b && (l || !c) ? Qa(y, D, b, n, p) : y;
              q = d ? e || (l ? b : t || f) ? [] : g : A;
              d && d(A, q, n, p);
              if (f) {
                  y = Qa(q, v);
                  f(y, [], n, p);
                  for (n = y.length; n--; )
                      if (m = y[n])
                          q[v[n]] = !(A[v[n]] = m)
              }
              if (l)
                  for (n = b && q.length; n--; ) {
                      if (m = q[n])
                          l[D[n]] = !(g[D[n]] = m)
                  }
              else
                  q = Qa(q === g ? q.splice(t, q.length) : q),
                  e ? e(null, g, q, p) : pa.apply(g, q)
          }
      })
  }, kb = function(b) {
      var c, d, f, e = b.length, l = M.relative[b[0].type];
      d = l || M.relative[" "];
      for (var g = l ? 1 : 0, n = hb(function(b) {
          return b === c
      }, d, !0), p = hb(function(b) {
          return -1 < Yb.call(c, b)
      }, d, !0), m = [function(b, d, u) {
          return !l && (u || d !== Ra) || ((c = d).nodeType ? n(b, d, u) : p(b, d, u))
      }
      ]; g < e; g++)
          if (d = M.relative[b[g].type])
              m = [hb(ib(m), d)];
          else {
              d = M.filter[b[g].type].apply(null, b[g].matches);
              if (d[J]) {
                  for (f = ++g; f < e && !M.relative[b[f].type]; f++)
                      ;
                  return jb(1 < g && ib(m), 1 < g && b.slice(0, g - 1).join("").replace(Ma, "$1"), d, g < f && kb(b.slice(g, f)), f < e && kb(b = b.slice(f)), f < e && b.join(""))
              }
              m.push(d)
          }
      return ib(m)
  }, fb = function(b, c, d, f, e) {
      var l, g, n, p, m = Pa(b);
      if (!f && 1 === m.length) {
          g = m[0] = m[0].slice(0);
          if (2 < g.length && "ID" === (n = g[0]).type && 9 === c.nodeType && !e && M.relative[g[1].type]) {
              c = M.find.ID(n.matches[0].replace(ka, ""), c, e)[0];
              if (!c)
                  return d;
              b = b.slice(g.shift().length)
          }
          for (l = Oa.POS.test(b) ? -1 : g.length - 1; 0 <= l; l--) {
              n = g[l];
              if (M.relative[p = n.type])
                  break;
              if (p = M.find[p])
                  if (f = p(n.matches[0].replace(ka, ""), lb.test(g[0].type) && c.parentNode || c, e)) {
                      g.splice(l, 1);
                      b = f.length && g.join("");
                      if (!b)
                          return pa.apply(d, qa.call(f, 0)),
                          d;
                      break
                  }
          }
      }
      return mb(b, m)(f, c, e, d, lb.test(b)),
      d
  }, Zb = function() {}, gb, nb, M, Sa, La, Tb, mb, ob, ya, Ra, $b = !0, J = ("sizcache" + Math.random()).replace(".", ""), Xb = String, X = Wc.document, W = X.documentElement, xa = 0, $c = 0, ad = [].pop, pa = [].push, qa = [].slice, Yb = [].indexOf || function(b) {
      for (var c = 0, d = this.length; c < d; c++)
          if (this[c] === b)
              return c;
      return -1
  }
  , Y = function(b, c) {
      return b[J] = null == c || c,
      b
  }, pb = function() {
      var b = {}
        , c = [];
      return Y(function(d, f) {
          return c.push(d) > M.cacheLength && delete b[c.shift()],
          b[d] = f
      }, b)
  }, ac = pb(), Wb = pb(), bc = pb(), cc = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", qb = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + cc + ")|[^:]|\\\\.)*|.*))\\)|)", Ma = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g, Yc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, Zc = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/, bd = RegExp(qb), Xc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, lb = /[\x20\t\r\n\f]*[+~]/, cd = /h\d/i, dd = /input|select|textarea|button/i, ka = /\\(?!\\)/g, Oa = {
      ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
      CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
      NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
      TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
      ATTR: RegExp("^" + cc),
      PSEUDO: RegExp("^" + qb),
      POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
      CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
      needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
  }, ca = function(b) {
      var c = X.createElement("div");
      try {
          return b(c)
      } catch (d) {
          return !1
      } finally {}
  }, ed = ca(function(b) {
      return b.appendChild(X.createComment("")),
      !b.getElementsByTagName("*").length
  }), fd = ca(function(b) {
      return b.innerHTML = "<a href='#'></a>",
      b.firstChild && "undefined" !== typeof b.firstChild.getAttribute && "#" === b.firstChild.getAttribute("href")
  }), gd = ca(function(b) {
      b.innerHTML = "<select></select>";
      b = typeof b.lastChild.getAttribute("multiple");
      return "boolean" !== b && "string" !== b
  }), Ub = ca(function(b) {
      return b.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
      !b.getElementsByClassName || !b.getElementsByClassName("e").length ? !1 : (b.lastChild.className = "e",
      2 === b.getElementsByClassName("e").length)
  }), hd = ca(function(b) {
      b.id = J + 0;
      b.innerHTML = "<a name='" + J + "'></a><div name='" + J + "'></div>";
      W.insertBefore(b, W.firstChild);
      var c = X.getElementsByName && X.getElementsByName(J).length === 2 + X.getElementsByName(J + 0).length;
      return nb = !X.getElementById(J),
      W.removeChild(b),
      c
  });
  try {
      qa.call(W.childNodes, 0)[0].nodeType
  } catch (Rd) {
      qa = function(b) {
          for (var c, d = []; c = this[b]; b++)
              d.push(c);
          return d
      }
  }
  H.matches = function(b, c) {
      return H(b, null, null, c)
  }
  ;
  H.matchesSelector = function(b, c) {
      return 0 < H(c, null, null, [b]).length
  }
  ;
  Sa = H.getText = function(b) {
      var c, d = "", f = 0;
      if (c = b.nodeType)
          if (1 === c || 9 === c || 11 === c) {
              if ("string" == typeof b.textContent)
                  return b.textContent;
              for (b = b.firstChild; b; b = b.nextSibling)
                  d += Sa(b)
          } else {
              if (3 === c || 4 === c)
                  return b.nodeValue
          }
      else
          for (; c = b[f]; f++)
              d += Sa(c);
      return d
  }
  ;
  La = H.isXML = function(b) {
      return (b = b && (b.ownerDocument || b).documentElement) ? "HTML" !== b.nodeName : !1
  }
  ;
  Tb = H.contains = W.contains ? function(b, c) {
      var d = 9 === b.nodeType ? b.documentElement : b
        , f = c && c.parentNode;
      return b === f || !(!f || !(1 === f.nodeType && d.contains && d.contains(f)))
  }
  : W.compareDocumentPosition ? function(b, c) {
      return c && !!(b.compareDocumentPosition(c) & 16)
  }
  : function(b, c) {
      for (; c = c.parentNode; )
          if (c === b)
              return !0;
      return !1
  }
  ;
  H.attr = function(b, c) {
      var d, f = La(b);
      return f || (c = c.toLowerCase()),
      (d = M.attrHandle[c]) ? d(b) : f || gd ? b.getAttribute(c) : (d = b.getAttributeNode(c),
      d ? "boolean" == typeof b[c] ? b[c] ? c : null : d.specified ? d.value : null : null)
  }
  ;
  M = H.selectors = {
      cacheLength: 50,
      createPseudo: Y,
      match: Oa,
      attrHandle: fd ? {} : {
          href: function(b) {
              return b.getAttribute("href", 2)
          },
          type: function(b) {
              return b.getAttribute("type")
          }
      },
      find: {
          ID: nb ? function(b, c, d) {
              if ("undefined" !== typeof c.getElementById && !d)
                  return (b = c.getElementById(b)) && b.parentNode ? [b] : []
          }
          : function(b, c, d) {
              if ("undefined" !== typeof c.getElementById && !d)
                  return (c = c.getElementById(b)) ? c.id === b || "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id").value === b ? [c] : void 0 : []
          }
          ,
          TAG: ed ? function(b, c) {
              if ("undefined" !== typeof c.getElementsByTagName)
                  return c.getElementsByTagName(b)
          }
          : function(b, c) {
              var d = c.getElementsByTagName(b);
              if ("*" === b) {
                  for (var f, e = [], l = 0; f = d[l]; l++)
                      1 === f.nodeType && e.push(f);
                  return e
              }
              return d
          }
          ,
          NAME: hd && function(b, c) {
              if ("undefined" !== typeof c.getElementsByName)
                  return c.getElementsByName(name)
          }
          ,
          CLASS: Ub && function(b, c, d) {
              if ("undefined" !== typeof c.getElementsByClassName && !d)
                  return c.getElementsByClassName(b)
          }
      },
      relative: {
          ">": {
              dir: "parentNode",
              first: !0
          },
          " ": {
              dir: "parentNode"
          },
          "+": {
              dir: "previousSibling",
              first: !0
          },
          "~": {
              dir: "previousSibling"
          }
      },
      preFilter: {
          ATTR: function(b) {
              return b[1] = b[1].replace(ka, ""),
              b[3] = (b[4] || b[5] || "").replace(ka, ""),
              "~=" === b[2] && (b[3] = " " + b[3] + " "),
              b.slice(0, 4)
          },
          CHILD: function(b) {
              return b[1] = b[1].toLowerCase(),
              "nth" === b[1] ? (b[2] || H.error(b[0]),
              b[3] = +(b[3] ? b[4] + (b[5] || 1) : 2 * ("even" === b[2] || "odd" === b[2])),
              b[4] = +(b[6] + b[7] || "odd" === b[2])) : b[2] && H.error(b[0]),
              b
          },
          PSEUDO: function(b) {
              var c, d;
              if (Oa.CHILD.test(b[0]))
                  return null;
              if (b[3])
                  b[2] = b[3];
              else if (c = b[4])
                  bd.test(c) && (d = Pa(c, !0)) && (d = c.indexOf(")", c.length - d) - c.length) && (c = c.slice(0, d),
                  b[0] = b[0].slice(0, d)),
                  b[2] = c;
              return b.slice(0, 3)
          }
      },
      filter: {
          ID: nb ? function(b) {
              return b = b.replace(ka, ""),
              function(c) {
                  return c.getAttribute("id") === b
              }
          }
          : function(b) {
              return b = b.replace(ka, ""),
              function(c) {
                  return (c = "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id")) && c.value === b
              }
          }
          ,
          TAG: function(b) {
              return "*" === b ? function() {
                  return !0
              }
              : (b = b.replace(ka, "").toLowerCase(),
              function(c) {
                  return c.nodeName && c.nodeName.toLowerCase() === b
              }
              )
          },
          CLASS: function(b) {
              var c = ac[J][b];
              return c || (c = ac(b, RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)"))),
              function(b) {
                  return c.test(b.className || "undefined" !== typeof b.getAttribute && b.getAttribute("class") || "")
              }
          },
          ATTR: function(b, c, d) {
              return function(f) {
                  f = H.attr(f, b);
                  return null == f ? "!=" === c : c ? (f += "",
                  "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && -1 < f.indexOf(d) : "$=" === c ? d && f.substr(f.length - d.length) === d : "~=" === c ? -1 < (" " + f + " ").indexOf(d) : "|=" === c ? f === d || f.substr(0, d.length + 1) === d + "-" : !1) : !0
              }
          },
          CHILD: function(b, c, d, f) {
              return "nth" === b ? function(b) {
                  var c, j;
                  c = b.parentNode;
                  if (1 === d && 0 === f)
                      return !0;
                  if (c) {
                      j = 0;
                      for (c = c.firstChild; c && !(1 === c.nodeType && (j++,
                      b === c)); c = c.nextSibling)
                          ;
                  }
                  return j -= f,
                  j === d || 0 === j % d && 0 <= j / d
              }
              : function(c) {
                  var d = c;
                  switch (b) {
                  case "only":
                  case "first":
                      for (; d = d.previousSibling; )
                          if (1 === d.nodeType)
                              return !1;
                      if ("first" === b)
                          return !0;
                      d = c;
                  case "last":
                      for (; d = d.nextSibling; )
                          if (1 === d.nodeType)
                              return !1;
                      return !0
                  }
              }
          },
          PSEUDO: function(b, c) {
              var d, f = M.pseudos[b] || M.setFilters[b.toLowerCase()] || H.error("unsupported pseudo: " + b);
              return f[J] ? f(c) : 1 < f.length ? (d = [b, b, "", c],
              M.setFilters.hasOwnProperty(b.toLowerCase()) ? Y(function(b, d) {
                  for (var u, e = f(b, c), l = e.length; l--; )
                      u = Yb.call(b, e[l]),
                      b[u] = !(d[u] = e[l])
              }) : function(b) {
                  return f(b, 0, d)
              }
              ) : f
          }
      },
      pseudos: {
          not: Y(function(b) {
              var c = []
                , d = []
                , f = mb(b.replace(Ma, "$1"));
              return f[J] ? Y(function(b, c, d, j) {
                  j = f(b, null, j, []);
                  for (var u = b.length; u--; )
                      if (d = j[u])
                          b[u] = !(c[u] = d)
              }) : function(b, u, e) {
                  return c[0] = b,
                  f(c, null, e, d),
                  !d.pop()
              }
          }),
          has: Y(function(b) {
              return function(c) {
                  return 0 < H(b, c).length
              }
          }),
          contains: Y(function(b) {
              return function(c) {
                  return -1 < (c.textContent || c.innerText || Sa(c)).indexOf(b)
              }
          }),
          enabled: function(b) {
              return !1 === b.disabled
          },
          disabled: function(b) {
              return !0 === b.disabled
          },
          checked: function(b) {
              var c = b.nodeName.toLowerCase();
              return "input" === c && !!b.checked || "option" === c && !!b.selected
          },
          selected: function(b) {
              return b.parentNode && b.parentNode.selectedIndex,
              !0 === b.selected
          },
          parent: function(b) {
              return !M.pseudos.empty(b)
          },
          empty: function(b) {
              var c;
              for (b = b.firstChild; b; ) {
                  if ("@" < b.nodeName || 3 === (c = b.nodeType) || 4 === c)
                      return !1;
                  b = b.nextSibling
              }
              return !0
          },
          header: function(b) {
              return cd.test(b.nodeName)
          },
          text: function(b) {
              var c, d;
              return "input" === b.nodeName.toLowerCase() && "text" === (c = b.type) && (null == (d = b.getAttribute("type")) || d.toLowerCase() === c)
          },
          radio: wa("radio"),
          checkbox: wa("checkbox"),
          file: wa("file"),
          password: wa("password"),
          image: wa("image"),
          submit: Vb("submit"),
          reset: Vb("reset"),
          button: function(b) {
              var c = b.nodeName.toLowerCase();
              return "input" === c && "button" === b.type || "button" === c
          },
          input: function(b) {
              return dd.test(b.nodeName)
          },
          focus: function(b) {
              var c = b.ownerDocument;
              return b === c.activeElement && (!c.hasFocus || c.hasFocus()) && (!!b.type || !!b.href)
          },
          active: function(b) {
              return b === b.ownerDocument.activeElement
          },
          first: ja(function() {
              return [0]
          }),
          last: ja(function(b, c) {
              return [c - 1]
          }),
          eq: ja(function(b, c, d) {
              return [0 > d ? d + c : d]
          }),
          even: ja(function(b, c) {
              for (var d = 0; d < c; d += 2)
                  b.push(d);
              return b
          }),
          odd: ja(function(b, c) {
              for (var d = 1; d < c; d += 2)
                  b.push(d);
              return b
          }),
          lt: ja(function(b, c, d) {
              for (c = 0 > d ? d + c : d; 0 <= --c; )
                  b.push(c);
              return b
          }),
          gt: ja(function(b, c, d) {
              for (d = 0 > d ? d + c : d; ++d < c; )
                  b.push(d);
              return b
          })
      }
  };
  ob = W.compareDocumentPosition ? function(b, c) {
      return b === c ? (ya = !0,
      0) : (!b.compareDocumentPosition || !c.compareDocumentPosition ? b.compareDocumentPosition : b.compareDocumentPosition(c) & 4) ? -1 : 1
  }
  : function(b, c) {
      if (b === c)
          return ya = !0,
          0;
      if (b.sourceIndex && c.sourceIndex)
          return b.sourceIndex - c.sourceIndex;
      var d, f, e = [], l = [];
      d = b.parentNode;
      f = c.parentNode;
      var g = d;
      if (d === f)
          return Na(b, c);
      if (!d)
          return -1;
      if (!f)
          return 1;
      for (; g; )
          e.unshift(g),
          g = g.parentNode;
      for (g = f; g; )
          l.unshift(g),
          g = g.parentNode;
      d = e.length;
      f = l.length;
      for (g = 0; g < d && g < f; g++)
          if (e[g] !== l[g])
              return Na(e[g], l[g]);
      return g === d ? Na(b, l[g], -1) : Na(e[g], c, 1)
  }
  ;
  [0, 0].sort(ob);
  $b = !ya;
  H.uniqueSort = function(b) {
      var c, d = 1;
      ya = $b;
      b.sort(ob);
      if (ya)
          for (; c = b[d]; d++)
              c === b[d - 1] && b.splice(d--, 1);
      return b
  }
  ;
  H.error = function(b) {
      throw Error("Syntax error, unrecognized expression: " + b);
  }
  ;
  mb = H.compile = function(b, c) {
      var d, f = [], e = [], l = bc[J][b];
      if (!l) {
          c || (c = Pa(b));
          for (d = c.length; d--; )
              l = kb(c[d]),
              l[J] ? f.push(l) : e.push(l);
          var g = 0 < f.length
            , n = 0 < e.length
            , p = function(b, c, d, j, u) {
              var l, z, m = [], y = 0, D = "0", v = b && [], t = null != u, q = Ra, A = b || n && M.find.TAG("*", u && c.parentNode || c), x = xa += null == q ? 1 : Math.E;
              for (t && (Ra = c !== X && c,
              gb = p.el); null != (u = A[D]); D++) {
                  if (n && u) {
                      for (l = 0; z = e[l]; l++)
                          if (z(u, c, d)) {
                              j.push(u);
                              break
                          }
                      t && (xa = x,
                      gb = ++p.el)
                  }
                  g && ((u = !z && u) && y--,
                  b && v.push(u))
              }
              y += D;
              if (g && D !== y) {
                  for (l = 0; z = f[l]; l++)
                      z(v, m, c, d);
                  if (b) {
                      if (0 < y)
                          for (; D--; )
                              !v[D] && !m[D] && (m[D] = ad.call(j));
                      m = Qa(m)
                  }
                  pa.apply(j, m);
                  t && !b && 0 < m.length && 1 < y + f.length && H.uniqueSort(j)
              }
              return t && (xa = x,
              Ra = q),
              v
          };
          d = (p.el = 0,
          g ? Y(p) : p);
          l = bc(b, d)
      }
      return l
  }
  ;
  if (X.querySelectorAll) {
      var dc, id = fb, jd = /'|\\/g, kd = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, Z = [":focus"], Ta = [":active", ":focus"], Ua = W.matchesSelector || W.mozMatchesSelector || W.webkitMatchesSelector || W.oMatchesSelector || W.msMatchesSelector;
      ca(function(b) {
          b.innerHTML = "<select><option selected=''></option></select>";
          b.querySelectorAll("[selected]").length || Z.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
          b.querySelectorAll(":checked").length || Z.push(":checked")
      });
      ca(function(b) {
          b.innerHTML = "<p test=''></p>";
          b.querySelectorAll("[test^='']").length && Z.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
          b.innerHTML = "<input type='hidden'/>";
          b.querySelectorAll(":enabled").length || Z.push(":enabled", ":disabled")
      });
      Z = RegExp(Z.join("|"));
      fb = function(b, c, d, f, e) {
          if (!f && !e && (!Z || !Z.test(b))) {
              var l, g, n = !0, p = J;
              g = c;
              l = 9 === c.nodeType && b;
              if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                  l = Pa(b);
                  (n = c.getAttribute("id")) ? p = n.replace(jd, "\\$&") : c.setAttribute("id", p);
                  p = "[id='" + p + "'] ";
                  for (g = l.length; g--; )
                      l[g] = p + l[g].join("");
                  g = lb.test(b) && c.parentNode || c;
                  l = l.join(",")
              }
              if (l)
                  try {
                      return pa.apply(d, qa.call(g.querySelectorAll(l), 0)),
                      d
                  } catch (m) {} finally {
                      n || c.removeAttribute("id")
                  }
          }
          return id(b, c, d, f, e)
      }
      ;
      Ua && (ca(function(b) {
          dc = Ua.call(b, "div");
          try {
              Ua.call(b, "[test!='']:sizzle"),
              Ta.push("!=", qb)
          } catch (c) {}
      }),
      Ta = RegExp(Ta.join("|")),
      H.matchesSelector = function(b, c) {
          c = c.replace(kd, "='$1']");
          if (!La(b) && !Ta.test(c) && (!Z || !Z.test(c)))
              try {
                  var d = Ua.call(b, c);
                  if (d || dc || b.document && 11 !== b.document.nodeType)
                      return d
              } catch (f) {}
          return 0 < H(c, null, null, [b]).length
      }
      )
  }
  M.pseudos.nth = M.pseudos.eq;
  M.filters = Zb.prototype = M.pseudos;
  M.setFilters = new Zb;
  H.attr = f.attr;
  f.find = H;
  f.expr = H.selectors;
  f.expr[":"] = f.expr.pseudos;
  f.unique = H.uniqueSort;
  f.text = H.getText;
  f.isXMLDoc = H.isXML;
  f.contains = H.contains;
  var ld = /Until$/
    , md = /^(?:parents|prev(?:Until|All))/
    , vc = /^.[^:#\[\.,]*$/
    , ec = f.expr.match.needsContext
    , nd = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
  };
  f.fn.extend({
      find: function(b) {
          var c, d, e, l, g, n, p = this;
          if ("string" != typeof b)
              return f(b).filter(function() {
                  c = 0;
                  for (d = p.length; c < d; c++)
                      if (f.contains(p[c], this))
                          return !0
              });
          n = this.pushStack("", "find", b);
          c = 0;
          for (d = this.length; c < d; c++)
              if (e = n.length,
              f.find(b, this[c], n),
              0 < c)
                  for (l = e; l < n.length; l++)
                      for (g = 0; g < e; g++)
                          if (n[g] === n[l]) {
                              n.splice(l--, 1);
                              break
                          }
          return n
      },
      has: function(b) {
          var c, d = f(b, this), e = d.length;
          return this.filter(function() {
              for (c = 0; c < e; c++)
                  if (f.contains(this, d[c]))
                      return !0
          })
      },
      not: function(b) {
          return this.pushStack(v(this, b, !1), "not", b)
      },
      filter: function(b) {
          return this.pushStack(v(this, b, !0), "filter", b)
      },
      is: function(b) {
          return !!b && ("string" == typeof b ? ec.test(b) ? 0 <= f(b, this.context).index(this[0]) : 0 < f.filter(b, this).length : 0 < this.filter(b).length)
      },
      closest: function(b, c) {
          for (var d, e = 0, l = this.length, g = [], n = ec.test(b) || "string" != typeof b ? f(b, c || this.context) : 0; e < l; e++)
              for (d = this[e]; d && d.ownerDocument && d !== c && 11 !== d.nodeType; ) {
                  if (n ? -1 < n.index(d) : f.find.matchesSelector(d, b)) {
                      g.push(d);
                      break
                  }
                  d = d.parentNode
              }
          return g = 1 < g.length ? f.unique(g) : g,
          this.pushStack(g, "closest", b)
      },
      index: function(b) {
          return b ? "string" == typeof b ? f.inArray(this[0], f(b)) : f.inArray(b.jquery ? b[0] : b, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
      },
      add: function(b, c) {
          var d = "string" == typeof b ? f(b, c) : f.makeArray(b && b.nodeType ? [b] : b)
            , e = f.merge(this.get(), d);
          return this.pushStack(x(d[0]) || x(e[0]) ? e : f.unique(e))
      },
      addBack: function(b) {
          return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
      }
  });
  f.fn.andSelf = f.fn.addBack;
  f.each({
      parent: function(b) {
          return (b = b.parentNode) && 11 !== b.nodeType ? b : null
      },
      parents: function(b) {
          return f.dir(b, "parentNode")
      },
      parentsUntil: function(b, c, d) {
          return f.dir(b, "parentNode", d)
      },
      next: function(b) {
          return p(b, "nextSibling")
      },
      prev: function(b) {
          return p(b, "previousSibling")
      },
      nextAll: function(b) {
          return f.dir(b, "nextSibling")
      },
      prevAll: function(b) {
          return f.dir(b, "previousSibling")
      },
      nextUntil: function(b, c, d) {
          return f.dir(b, "nextSibling", d)
      },
      prevUntil: function(b, c, d) {
          return f.dir(b, "previousSibling", d)
      },
      siblings: function(b) {
          return f.sibling((b.parentNode || {}).firstChild, b)
      },
      children: function(b) {
          return f.sibling(b.firstChild)
      },
      contents: function(b) {
          return f.nodeName(b, "iframe") ? b.contentDocument || b.contentWindow.document : f.merge([], b.childNodes)
      }
  }, function(b, c) {
      f.fn[b] = function(d, e) {
          var l = f.map(this, c, d);
          return ld.test(b) || (e = d),
          e && "string" == typeof e && (l = f.filter(e, l)),
          l = 1 < this.length && !nd[b] ? f.unique(l) : l,
          1 < this.length && md.test(b) && (l = l.reverse()),
          this.pushStack(l, b, aa.call(arguments).join(","))
      }
  });
  f.extend({
      filter: function(b, c, d) {
          return d && (b = ":not(" + b + ")"),
          1 === c.length ? f.find.matchesSelector(c[0], b) ? [c[0]] : [] : f.find.matches(b, c)
      },
      dir: function(b, d, e) {
          var l = [];
          for (b = b[d]; b && 9 !== b.nodeType && (e === c || 1 !== b.nodeType || !f(b).is(e)); )
              1 === b.nodeType && l.push(b),
              b = b[d];
          return l
      },
      sibling: function(b, c) {
          for (var d = []; b; b = b.nextSibling)
              1 === b.nodeType && b !== c && d.push(b);
          return d
      }
  });
  var xb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
    , od = / jQuery\d+="(?:null|\d+)"/g
    , rb = /^\s+/
    , fc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
    , gc = /<([\w:]+)/
    , pd = /<tbody/i
    , qd = /<|&#?\w+;/
    , rd = /<(?:script|style|link)/i
    , sd = /<(?:script|object|embed|option|style)/i
    , sb = RegExp("<(?:" + xb + ")[\\s/>]", "i")
    , yb = /^(?:checkbox|radio)$/
    , hc = /checked\s*(?:[^=]|=\s*.checked.)/i
    , td = /\/(java|ecma)script/i
    , ud = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
    , V = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      area: [1, "<map>", "</map>"],
      _default: [0, "", ""]
  }
    , ic = t(C)
    , tb = ic.appendChild(C.createElement("div"));
  V.optgroup = V.option;
  V.tbody = V.tfoot = V.colgroup = V.caption = V.thead;
  V.th = V.td;
  f.support.htmlSerialize || (V._default = [1, "X<div>", "</div>"]);
  f.fn.extend({
      text: function(b) {
          return f.access(this, function(b) {
              return b === c ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || C).createTextNode(b))
          }, null, b, arguments.length)
      },
      wrapAll: function(b) {
          if (f.isFunction(b))
              return this.each(function(c) {
                  f(this).wrapAll(b.call(this, c))
              });
          if (this[0]) {
              var c = f(b, this[0].ownerDocument).eq(0).clone(!0);
              this[0].parentNode && c.insertBefore(this[0]);
              c.map(function() {
                  for (var b = this; b.firstChild && 1 === b.firstChild.nodeType; )
                      b = b.firstChild;
                  return b
              }).append(this)
          }
          return this
      },
      wrapInner: function(b) {
          return f.isFunction(b) ? this.each(function(c) {
              f(this).wrapInner(b.call(this, c))
          }) : this.each(function() {
              var c = f(this)
                , d = c.contents();
              d.length ? d.wrapAll(b) : c.append(b)
          })
      },
      wrap: function(b) {
          var c = f.isFunction(b);
          return this.each(function(d) {
              f(this).wrapAll(c ? b.call(this, d) : b)
          })
      },
      unwrap: function() {
          return this.parent().each(function() {
              f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
          }).end()
      },
      append: function() {
          return this.domManip(arguments, !0, function(b) {
              (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(b)
          })
      },
      prepend: function() {
          return this.domManip(arguments, !0, function(b) {
              (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(b, this.firstChild)
          })
      },
      before: function() {
          if (!x(this[0]))
              return this.domManip(arguments, !1, function(b) {
                  this.parentNode.insertBefore(b, this)
              });
          if (arguments.length) {
              var b = f.clean(arguments);
              return this.pushStack(f.merge(b, this), "before", this.selector)
          }
      },
      after: function() {
          if (!x(this[0]))
              return this.domManip(arguments, !1, function(b) {
                  this.parentNode.insertBefore(b, this.nextSibling)
              });
          if (arguments.length) {
              var b = f.clean(arguments);
              return this.pushStack(f.merge(this, b), "after", this.selector)
          }
      },
      remove: function(b, c) {
          for (var d, e = 0; null != (d = this[e]); e++)
              if (!b || f.filter(b, [d]).length)
                  !c && 1 === d.nodeType && (f.cleanData(d.getElementsByTagName("*")),
                  f.cleanData([d])),
                  d.parentNode && d.parentNode.removeChild(d);
          return this
      },
      empty: function() {
          for (var b, c = 0; null != (b = this[c]); c++)
              for (1 === b.nodeType && f.cleanData(b.getElementsByTagName("*")); b.firstChild; )
                  b.removeChild(b.firstChild);
          return this
      },
      clone: function(b, c) {
          return b = null == b ? !1 : b,
          c = null == c ? b : c,
          this.map(function() {
              return f.clone(this, b, c)
          })
      },
      html: function(b) {
          return f.access(this, function(b) {
              var d = this[0] || {}
                , e = 0
                , l = this.length;
              if (b === c)
                  return 1 === d.nodeType ? d.innerHTML.replace(od, "") : c;
              if ("string" == typeof b && !rd.test(b) && (f.support.htmlSerialize || !sb.test(b)) && (f.support.leadingWhitespace || !rb.test(b)) && !V[(gc.exec(b) || ["", ""])[1].toLowerCase()]) {
                  b = b.replace(fc, "<$1></$2>");
                  try {
                      for (; e < l; e++)
                          d = this[e] || {},
                          1 === d.nodeType && (f.cleanData(d.getElementsByTagName("*")),
                          d.innerHTML = b);
                      d = 0
                  } catch (u) {}
              }
              d && this.empty().append(b)
          }, null, b, arguments.length)
      },
      replaceWith: function(b) {
          return x(this[0]) ? this.length ? this.pushStack(f(f.isFunction(b) ? b() : b), "replaceWith", b) : this : f.isFunction(b) ? this.each(function(c) {
              var d = f(this)
                , e = d.html();
              d.replaceWith(b.call(this, c, e))
          }) : ("string" != typeof b && (b = f(b).detach()),
          this.each(function() {
              var c = this.nextSibling
                , d = this.parentNode;
              f(this).remove();
              c ? f(c).before(b) : f(d).append(b)
          }))
      },
      detach: function(b) {
          return this.remove(b, !0)
      },
      domManip: function(b, d, e) {
          b = [].concat.apply([], b);
          var l, g, n, r = 0, p = b[0], m = [], y = this.length;
          if (!f.support.checkClone && 1 < y && "string" == typeof p && hc.test(p))
              return this.each(function() {
                  f(this).domManip(b, d, e)
              });
          if (f.isFunction(p))
              return this.each(function(l) {
                  var g = f(this);
                  b[0] = p.call(this, l, d ? g.html() : c);
                  g.domManip(b, d, e)
              });
          if (this[0]) {
              l = f.buildFragment(b, this, m);
              n = l.fragment;
              g = n.firstChild;
              1 === n.childNodes.length && (n = g);
              if (g) {
                  d = d && f.nodeName(g, "tr");
                  for (l = l.cacheable || y - 1; r < y; r++)
                      e.call(d && f.nodeName(this[r], "table") ? this[r].getElementsByTagName("tbody")[0] || this[r].appendChild(this[r].ownerDocument.createElement("tbody")) : this[r], r === l ? n : f.clone(n, !0, !0))
              }
              n = g = null;
              m.length && f.each(m, function(b, c) {
                  c.src ? f.ajax ? f.ajax({
                      url: c.src,
                      type: "GET",
                      dataType: "script",
                      async: !1,
                      global: !1,
                      "throws": !0
                  }) : f.error("no ajax") : f.globalEval((c.text || c.textContent || c.innerHTML || "").replace(ud, ""));
                  c.parentNode && c.parentNode.removeChild(c)
              })
          }
          return this
      }
  });
  f.buildFragment = function(b, d, e) {
      var l, g, n, r = b[0];
      return d = d || C,
      d = !d.nodeType && d[0] || d,
      d = d.ownerDocument || d,
      1 === b.length && "string" == typeof r && 512 > r.length && d === C && "<" === r.charAt(0) && !sd.test(r) && (f.support.checkClone || !hc.test(r)) && (f.support.html5Clone || !sb.test(r)) && (g = !0,
      l = f.fragments[r],
      n = l !== c),
      l || (l = d.createDocumentFragment(),
      f.clean(b, d, l, e),
      g && (f.fragments[r] = n && l)),
      {
          fragment: l,
          cacheable: g
      }
  }
  ;
  f.fragments = {};
  f.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
  }, function(b, c) {
      f.fn[b] = function(d) {
          var e, l = 0, g = [];
          d = f(d);
          var n = d.length;
          e = 1 === this.length && this[0].parentNode;
          if ((null == e || e && 11 === e.nodeType && 1 === e.childNodes.length) && 1 === n)
              return d[c](this[0]),
              this;
          for (; l < n; l++)
              e = (0 < l ? this.clone(!0) : this).get(),
              f(d[l])[c](e),
              g = g.concat(e);
          return this.pushStack(g, b, d.selector)
      }
  });
  f.extend({
      clone: function(b, c, d) {
          var e, g, p, r;
          f.support.html5Clone || f.isXMLDoc(b) || !sb.test("<" + b.nodeName + ">") ? r = b.cloneNode(!0) : (tb.innerHTML = b.outerHTML,
          tb.removeChild(r = tb.firstChild));
          if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (1 === b.nodeType || 11 === b.nodeType) && !f.isXMLDoc(b)) {
              l(b, r);
              e = n(b);
              g = n(r);
              for (p = 0; e[p]; ++p)
                  g[p] && l(e[p], g[p])
          }
          if (c && (q(b, r),
          d)) {
              e = n(b);
              g = n(r);
              for (p = 0; e[p]; ++p)
                  q(e[p], g[p])
          }
          return r
      },
      clean: function(b, c, d, e) {
          var l, g, n, p, m, v, q, A = c === C && ic, x = [];
          if (!c || "undefined" == typeof c.createDocumentFragment)
              c = C;
          for (l = 0; null != (n = b[l]); l++)
              if ("number" == typeof n && (n += ""),
              n) {
                  if ("string" == typeof n)
                      if (qd.test(n)) {
                          A = A || t(c);
                          v = c.createElement("div");
                          A.appendChild(v);
                          n = n.replace(fc, "<$1></$2>");
                          g = (gc.exec(n) || ["", ""])[1].toLowerCase();
                          p = V[g] || V._default;
                          m = p[0];
                          for (v.innerHTML = p[1] + n + p[2]; m--; )
                              v = v.lastChild;
                          if (!f.support.tbody) {
                              m = pd.test(n);
                              p = "table" === g && !m ? v.firstChild && v.firstChild.childNodes : "<table>" === p[1] && !m ? v.childNodes : [];
                              for (g = p.length - 1; 0 <= g; --g)
                                  f.nodeName(p[g], "tbody") && !p[g].childNodes.length && p[g].parentNode.removeChild(p[g])
                          }
                          !f.support.leadingWhitespace && rb.test(n) && v.insertBefore(c.createTextNode(rb.exec(n)[0]), v.firstChild);
                          n = v.childNodes;
                          v.parentNode.removeChild(v)
                      } else
                          n = c.createTextNode(n);
                  n.nodeType ? x.push(n) : f.merge(x, n)
              }
          v && (n = v = A = null);
          if (!f.support.appendChecked)
              for (l = 0; null != (n = x[l]); l++)
                  f.nodeName(n, "input") ? y(n) : "undefined" != typeof n.getElementsByTagName && f.grep(n.getElementsByTagName("input"), y);
          if (d) {
              b = function(b) {
                  if (!b.type || td.test(b.type))
                      return e ? e.push(b.parentNode ? b.parentNode.removeChild(b) : b) : d.appendChild(b)
              }
              ;
              for (l = 0; null != (n = x[l]); l++)
                  if (!f.nodeName(n, "script") || !b(n))
                      d.appendChild(n),
                      "undefined" != typeof n.getElementsByTagName && (q = f.grep(f.merge([], n.getElementsByTagName("script")), b),
                      x.splice.apply(x, [l + 1, 0].concat(q)),
                      l += q.length)
          }
          return x
      },
      cleanData: function(b, c) {
          for (var d, e, l, g, n = 0, p = f.expando, m = f.cache, y = f.support.deleteExpando, v = f.event.special; null != (l = b[n]); n++)
              if (c || f.acceptData(l))
                  if (d = (e = l[p]) && m[e]) {
                      if (d.events)
                          for (g in d.events)
                              v[g] ? f.event.remove(l, g) : f.removeEvent(l, g, d.handle);
                      m[e] && (delete m[e],
                      y ? delete l[p] : l.removeAttribute ? l.removeAttribute(p) : l[p] = null,
                      f.deletedIds.push(e))
                  }
      }
  });
  var Va, da;
  f.uaMatch = function(b) {
      b = b.toLowerCase();
      b = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || 0 > b.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [];
      return {
          browser: b[1] || "",
          version: b[2] || "0"
      }
  }
  ;
  Va = f.uaMatch(Ac.userAgent);
  da = {};
  Va.browser && (da[Va.browser] = !0,
  da.version = Va.version);
  da.chrome ? da.webkit = !0 : da.webkit && (da.safari = !0);
  f.browser = da;
  f.sub = function() {
      function b(c, d) {
          return new b.fn.init(c,d)
      }
      f.extend(!0, b, this);
      b.superclass = this;
      b.fn = b.prototype = this();
      b.fn.constructor = b;
      b.sub = this.sub;
      b.fn.init = function(d, e) {
          return e && e instanceof f && !(e instanceof b) && (e = b(e)),
          f.fn.init.call(this, d, e, c)
      }
      ;
      b.fn.init.prototype = b.fn;
      var c = b(C);
      return b
  }
  ;
  var Q, ma, na, ub = /alpha\([^)]*\)/i, vd = /opacity=([^)]*)/, wd = /^(top|right|bottom|left)$/, xd = /^(none|table(?!-c[ea]).+)/, jc = /^margin/, wc = RegExp("^(" + Fa + ")(.*)$", "i"), za = RegExp("^(" + Fa + ")(?!px)[a-z%]+$", "i"), yd = RegExp("^([-+])=(" + Fa + ")", "i"), Za = {}, zd = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
  }, kc = {
      letterSpacing: 0,
      fontWeight: 400
  }, ea = ["Top", "Right", "Bottom", "Left"], zb = ["Webkit", "O", "Moz", "ms"], Ad = f.fn.toggle;
  f.fn.extend({
      css: function(b, d) {
          return f.access(this, function(b, d, e) {
              return e !== c ? f.style(b, d, e) : f.css(b, d)
          }, b, d, 1 < arguments.length)
      },
      show: function() {
          return B(this, !0)
      },
      hide: function() {
          return B(this)
      },
      toggle: function(b, c) {
          var d = "boolean" == typeof b;
          return f.isFunction(b) && f.isFunction(c) ? Ad.apply(this, arguments) : this.each(function() {
              (d ? b : F(this)) ? f(this).show() : f(this).hide()
          })
      }
  });
  f.extend({
      cssHooks: {
          opacity: {
              get: function(b, c) {
                  if (c) {
                      var d = Q(b, "opacity");
                      return "" === d ? "1" : d
                  }
              }
          }
      },
      cssNumber: {
          fillOpacity: !0,
          fontWeight: !0,
          lineHeight: !0,
          opacity: !0,
          orphans: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0
      },
      cssProps: {
          "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
      },
      style: function(b, d, e, l) {
          if (b && !(3 === b.nodeType || 8 === b.nodeType || !b.style)) {
              var g, n, p, m = f.camelCase(d), y = b.style;
              d = f.cssProps[m] || (f.cssProps[m] = A(y, m));
              p = f.cssHooks[d] || f.cssHooks[m];
              if (e === c)
                  return p && "get"in p && (g = p.get(b, !1, l)) !== c ? g : y[d];
              n = typeof e;
              "string" === n && (g = yd.exec(e)) && (e = (g[1] + 1) * g[2] + parseFloat(f.css(b, d)),
              n = "number");
              if (!(null == e || "number" === n && isNaN(e)))
                  if ("number" === n && !f.cssNumber[m] && (e += "px"),
                  !p || !("set"in p) || (e = p.set(b, e, l)) !== c)
                      try {
                          y[d] = e
                      } catch (v) {}
          }
      },
      css: function(b, d, e, l) {
          var g, n, p, m = f.camelCase(d);
          return d = f.cssProps[m] || (f.cssProps[m] = A(b.style, m)),
          p = f.cssHooks[d] || f.cssHooks[m],
          p && "get"in p && (g = p.get(b, !0, l)),
          g === c && (g = Q(b, d)),
          "normal" === g && d in kc && (g = kc[d]),
          e || l !== c ? (n = parseFloat(g),
          e || f.isNumeric(n) ? n || 0 : g) : g
      },
      swap: function(b, c, d) {
          var f, e = {};
          for (f in c)
              e[f] = b.style[f],
              b.style[f] = c[f];
          d = d.call(b);
          for (f in c)
              b.style[f] = e[f];
          return d
      }
  });
  b.getComputedStyle ? Q = function(c, d) {
      var e, l, g, n, p = b.getComputedStyle(c, null), m = c.style;
      return p && (e = p[d],
      "" === e && !f.contains(c.ownerDocument, c) && (e = f.style(c, d)),
      za.test(e) && jc.test(d) && (l = m.width,
      g = m.minWidth,
      n = m.maxWidth,
      m.minWidth = m.maxWidth = m.width = e,
      e = p.width,
      m.width = l,
      m.minWidth = g,
      m.maxWidth = n)),
      e
  }
  : C.documentElement.currentStyle && (Q = function(b, c) {
      var d, f, e = b.currentStyle && b.currentStyle[c], l = b.style;
      return null == e && l && l[c] && (e = l[c]),
      za.test(e) && !wd.test(c) && (d = l.left,
      f = b.runtimeStyle && b.runtimeStyle.left,
      f && (b.runtimeStyle.left = b.currentStyle.left),
      l.left = "fontSize" === c ? "1em" : e,
      e = l.pixelLeft + "px",
      l.left = d,
      f && (b.runtimeStyle.left = f)),
      "" === e ? "auto" : e
  }
  );
  f.each(["height", "width"], function(b, c) {
      f.cssHooks[c] = {
          get: function(b, d, e) {
              if (d)
                  return 0 === b.offsetWidth && xd.test(Q(b, "display")) ? f.swap(b, zd, function() {
                      return I(b, c, e)
                  }) : I(b, c, e)
          },
          set: function(b, d, e) {
              return G(b, d, e ? Ya(b, c, e, f.support.boxSizing && "border-box" === f.css(b, "boxSizing")) : 0)
          }
      }
  });
  f.support.opacity || (f.cssHooks.opacity = {
      get: function(b, c) {
          return vd.test((c && b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
      },
      set: function(b, c) {
          var d = b.style
            , e = b.currentStyle
            , l = f.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : ""
            , g = e && e.filter || d.filter || "";
          d.zoom = 1;
          if (1 <= c && ("" === f.trim(g.replace(ub, "")) && d.removeAttribute) && (d.removeAttribute("filter"),
          e && !e.filter))
              return;
          d.filter = ub.test(g) ? g.replace(ub, l) : g + " " + l
      }
  });
  f(function() {
      f.support.reliableMarginRight || (f.cssHooks.marginRight = {
          get: function(b, c) {
              return f.swap(b, {
                  display: "inline-block"
              }, function() {
                  if (c)
                      return Q(b, "marginRight")
              })
          }
      });
      !f.support.pixelPosition && f.fn.position && f.each(["top", "left"], function(b, c) {
          f.cssHooks[c] = {
              get: function(b, d) {
                  if (d) {
                      var e = Q(b, c);
                      return za.test(e) ? f(b).position()[c] + "px" : e
                  }
              }
          }
      })
  });
  f.expr && f.expr.filters && (f.expr.filters.hidden = function(b) {
      return 0 === b.offsetWidth && 0 === b.offsetHeight || !f.support.reliableHiddenOffsets && "none" === (b.style && b.style.display || Q(b, "display"))
  }
  ,
  f.expr.filters.visible = function(b) {
      return !f.expr.filters.hidden(b)
  }
  );
  f.each({
      margin: "",
      padding: "",
      border: "Width"
  }, function(b, c) {
      f.cssHooks[b + c] = {
          expand: function(d) {
              var f = "string" == typeof d ? d.split(" ") : [d]
                , e = {};
              for (d = 0; 4 > d; d++)
                  e[b + ea[d] + c] = f[d] || f[d - 2] || f[0];
              return e
          }
      };
      jc.test(b) || (f.cssHooks[b + c].set = G)
  });
  var Bd = /%20/g
    , xc = /\[\]$/
    , lc = /\r?\n/g
    , Cd = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
    , Dd = /^(?:select|textarea)/i;
  f.fn.extend({
      serialize: function() {
          return f.param(this.serializeArray())
      },
      serializeArray: function() {
          return this.map(function() {
              return this.elements ? f.makeArray(this.elements) : this
          }).filter(function() {
              return this.name && !this.disabled && (this.checked || Dd.test(this.nodeName) || Cd.test(this.type))
          }).map(function(b, c) {
              var d = f(this).val();
              return null == d ? null : f.isArray(d) ? f.map(d, function(b) {
                  return {
                      name: c.name,
                      value: b.replace(lc, "\r\n")
                  }
              }) : {
                  name: c.name,
                  value: d.replace(lc, "\r\n")
              }
          }).get()
      }
  });
  f.param = function(b, d) {
      var e, l = [], g = function(b, c) {
          c = f.isFunction(c) ? c() : null == c ? "" : c;
          l[l.length] = encodeURIComponent(b) + "=" + encodeURIComponent(c)
      };
      d === c && (d = f.ajaxSettings && f.ajaxSettings.traditional);
      if (f.isArray(b) || b.jquery && !f.isPlainObject(b))
          f.each(b, function() {
              g(this.name, this.value)
          });
      else
          for (e in b)
              N(e, b[e], d, g);
      return l.join("&").replace(Bd, "+")
  }
  ;
  var ra, la, Ed = /#.*$/, Fd = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Gd = /^(?:GET|HEAD)$/, Hd = /^\/\//, mc = /\?/, Id = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Jd = /([?&])_=[^&]*/, nc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, oc = f.fn.load, $a = {}, pc = {}, qc = ["*/"] + ["*"];
  try {
      la = zc.href
  } catch (Sd) {
      la = C.createElement("a"),
      la.href = "",
      la = la.href
  }
  ra = nc.exec(la.toLowerCase()) || [];
  f.fn.load = function(b, d, e) {
      if ("string" != typeof b && oc)
          return oc.apply(this, arguments);
      if (!this.length)
          return this;
      var l, g, n, p = this, m = b.indexOf(" ");
      return 0 <= m && (l = b.slice(m, b.length),
      b = b.slice(0, m)),
      f.isFunction(d) ? (e = d,
      d = c) : d && "object" == typeof d && (g = "POST"),
      f.ajax({
          url: b,
          type: g,
          dataType: "html",
          data: d,
          complete: function(b, c) {
              e && p.each(e, n || [b.responseText, c, b])
          }
      }).done(function(b) {
          n = arguments;
          p.html(l ? f("<div>").append(b.replace(Id, "")).find(l) : b)
      }),
      this
  }
  ;
  f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, c) {
      f.fn[c] = function(b) {
          return this.on(c, b)
      }
  });
  f.each(["get", "post"], function(b, d) {
      f[d] = function(b, e, l, g) {
          return f.isFunction(e) && (g = g || l,
          l = e,
          e = c),
          f.ajax({
              type: d,
              url: b,
              data: e,
              success: l,
              dataType: g
          })
      }
  });
  f.extend({
      getScript: function(b, d) {
          return f.get(b, c, d, "script")
      },
      getJSON: function(b, c, d) {
          return f.get(b, c, d, "json")
      },
      ajaxSetup: function(b, c) {
          return c ? ta(b, f.ajaxSettings) : (c = b,
          b = f.ajaxSettings),
          ta(b, c),
          b
      },
      ajaxSettings: {
          url: la,
          isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(ra[1]),
          global: !0,
          type: "GET",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          processData: !0,
          async: !0,
          accepts: {
              xml: "application/xml, text/xml",
              html: "text/html",
              text: "text/plain",
              json: "application/json, text/javascript",
              "*": qc
          },
          contents: {
              xml: /xml/,
              html: /html/,
              json: /json/
          },
          responseFields: {
              xml: "responseXML",
              text: "responseText"
          },
          converters: {
              "* text": b.String,
              "text html": !0,
              "text json": f.parseJSON,
              "text xml": f.parseXML
          },
          flatOptions: {
              context: !0,
              url: !0
          }
      },
      ajaxPrefilter: Aa($a),
      ajaxTransport: Aa(pc),
      ajax: function(b, d) {
          function e(b, d, j, n) {
              var u, y, t, z, D, G = d;
              if (2 !== I) {
                  I = 2;
                  m && clearTimeout(m);
                  p = c;
                  g = n || "";
                  K.readyState = 0 < b ? 4 : 0;
                  if (j) {
                      z = q;
                      n = K;
                      var U, R, H, L, M = z.contents, N = z.dataTypes, P = z.responseFields;
                      for (R in P)
                          R in j && (n[P[R]] = j[R]);
                      for (; "*" === N[0]; )
                          N.shift(),
                          U === c && (U = z.mimeType || n.getResponseHeader("content-type"));
                      if (U)
                          for (R in M)
                              if (M[R] && M[R].test(U)) {
                                  N.unshift(R);
                                  break
                              }
                      if (N[0]in j)
                          H = N[0];
                      else {
                          for (R in j) {
                              if (!N[0] || z.converters[R + " " + N[0]]) {
                                  H = R;
                                  break
                              }
                              L || (L = R)
                          }
                          H = H || L
                      }
                      j = H ? (H !== N[0] && N.unshift(H),
                      j[H]) : void 0;
                      z = j
                  }
                  if (200 <= b && 300 > b || 304 === b)
                      if (q.ifModified && (D = K.getResponseHeader("Last-Modified"),
                      D && (f.lastModified[l] = D),
                      D = K.getResponseHeader("Etag"),
                      D && (f.etag[l] = D)),
                      304 === b)
                          G = "notmodified",
                          u = !0;
                      else {
                          var J;
                          a: {
                              u = q;
                              y = z;
                              var O, G = u.dataTypes.slice();
                              j = G[0];
                              U = {};
                              R = 0;
                              u.dataFilter && (y = u.dataFilter(y, u.dataType));
                              if (G[1])
                                  for (J in u.converters)
                                      U[J.toLowerCase()] = u.converters[J];
                              for (; t = G[++R]; )
                                  if ("*" !== t) {
                                      if ("*" !== j && j !== t) {
                                          J = U[j + " " + t] || U["* " + t];
                                          if (!J)
                                              for (O in U)
                                                  if (D = O.split(" "),
                                                  D[1] === t && (J = U[j + " " + D[0]] || U["* " + D[0]])) {
                                                      !0 === J ? J = U[O] : !0 !== U[O] && (t = D[0],
                                                      G.splice(R--, 0, t));
                                                      break
                                                  }
                                          if (!0 !== J)
                                              if (J && u["throws"])
                                                  y = J(y);
                                              else
                                                  try {
                                                      y = J(y)
                                                  } catch (Q) {
                                                      J = {
                                                          state: "parsererror",
                                                          error: J ? Q : "No conversion from " + j + " to " + t
                                                      };
                                                      break a
                                                  }
                                      }
                                      j = t
                                  }
                              J = {
                                  state: "success",
                                  data: y
                              }
                          }
                          u = J;
                          G = u.state;
                          y = u.data;
                          t = u.error;
                          u = !t
                      }
                  else if (t = G,
                  !G || b)
                      G = "error",
                      0 > b && (b = 0);
                  K.status = b;
                  K.statusText = (d || G) + "";
                  u ? F.resolveWith(A, [y, G, K]) : F.rejectWith(A, [K, G, t]);
                  K.statusCode(C);
                  C = c;
                  v && x.trigger("ajax" + (u ? "Success" : "Error"), [K, q, u ? y : t]);
                  B.fireWith(A, [K, G]);
                  v && (x.trigger("ajaxComplete", [K, q]),
                  --f.active || f.event.trigger("ajaxStop"))
              }
          }
          "object" == typeof b && (d = b,
          b = c);
          d = d || {};
          var l, g, n, p, m, y, v, t, q = f.ajaxSetup({}, d), A = q.context || q, x = A !== q && (A.nodeType || A instanceof f) ? f(A) : f.event, F = f.Deferred(), B = f.Callbacks("once memory"), C = q.statusCode || {}, G = {}, H = {}, I = 0, L = "canceled", K = {
              readyState: 0,
              setRequestHeader: function(b, c) {
                  if (!I) {
                      var d = b.toLowerCase();
                      b = H[d] = H[d] || b;
                      G[b] = c
                  }
                  return this
              },
              getAllResponseHeaders: function() {
                  return 2 === I ? g : null
              },
              getResponseHeader: function(b) {
                  var d;
                  if (2 === I) {
                      if (!n)
                          for (n = {}; d = Fd.exec(g); )
                              n[d[1].toLowerCase()] = d[2];
                      d = n[b.toLowerCase()]
                  }
                  return d === c ? null : d
              },
              overrideMimeType: function(b) {
                  return I || (q.mimeType = b),
                  this
              },
              abort: function(b) {
                  return b = b || L,
                  p && p.abort(b),
                  e(0, b),
                  this
              }
          };
          F.promise(K);
          K.success = K.done;
          K.error = K.fail;
          K.complete = B.add;
          K.statusCode = function(b) {
              if (b) {
                  var c;
                  if (2 > I)
                      for (c in b)
                          C[c] = [C[c], b[c]];
                  else
                      c = b[K.status],
                      K.always(c)
              }
              return this
          }
          ;
          q.url = ((b || q.url) + "").replace(Ed, "").replace(Hd, ra[1] + "//");
          q.dataTypes = f.trim(q.dataType || "*").toLowerCase().split(fa);
          null == q.crossDomain && (y = nc.exec(q.url.toLowerCase()) || !1,
          q.crossDomain = y && y.join(":") + (y[3] ? "" : "http:" === y[1] ? 80 : 443) !== ra.join(":") + (ra[3] ? "" : "http:" === ra[1] ? 80 : 443));
          q.data && q.processData && "string" != typeof q.data && (q.data = f.param(q.data, q.traditional));
          oa($a, q, d, K);
          if (2 === I)
              return K;
          v = q.global;
          q.type = q.type.toUpperCase();
          q.hasContent = !Gd.test(q.type);
          v && 0 === f.active++ && f.event.trigger("ajaxStart");
          if (!q.hasContent && (q.data && (q.url += (mc.test(q.url) ? "&" : "?") + q.data,
          delete q.data),
          l = q.url,
          !1 === q.cache)) {
              y = f.now();
              var M = q.url.replace(Jd, "$1_=" + y);
              q.url = M + (M === q.url ? (mc.test(q.url) ? "&" : "?") + "_=" + y : "")
          }
          (q.data && q.hasContent && !1 !== q.contentType || d.contentType) && K.setRequestHeader("Content-Type", q.contentType);
          q.ifModified && (l = l || q.url,
          f.lastModified[l] && K.setRequestHeader("If-Modified-Since", f.lastModified[l]),
          f.etag[l] && K.setRequestHeader("If-None-Match", f.etag[l]));
          K.setRequestHeader("Accept", q.dataTypes[0] && q.accepts[q.dataTypes[0]] ? q.accepts[q.dataTypes[0]] + ("*" !== q.dataTypes[0] ? ", " + qc + "; q=0.01" : "") : q.accepts["*"]);
          for (t in q.headers)
              K.setRequestHeader(t, q.headers[t]);
          if (!q.beforeSend || !1 !== q.beforeSend.call(A, K, q) && 2 !== I) {
              L = "abort";
              for (t in {
                  success: 1,
                  error: 1,
                  complete: 1
              })
                  K[t](q[t]);
              if (p = oa(pc, q, d, K)) {
                  K.readyState = 1;
                  v && x.trigger("ajaxSend", [K, q]);
                  q.async && 0 < q.timeout && (m = setTimeout(function() {
                      K.abort("timeout")
                  }, q.timeout));
                  try {
                      I = 1,
                      p.send(G, e)
                  } catch (N) {
                      if (2 > I)
                          e(-1, N);
                      else
                          throw N;
                  }
              } else
                  e(-1, "No Transport");
              return K
          }
          return K.abort()
      },
      active: 0,
      lastModified: {},
      etag: {}
  });
  var rc = []
    , Kd = /\?/
    , Wa = /(=)\?(?=&|$)|\?\?/
    , Ld = f.now();
  f.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
          var b = rc.pop() || f.expando + "_" + Ld++;
          return this[b] = !0,
          b
      }
  });
  f.ajaxPrefilter("json jsonp", function(d, e, l) {
      var g, n, p, m = d.data, y = d.url, q = !1 !== d.jsonp, v = q && Wa.test(y), t = q && !v && "string" == typeof m && !(d.contentType || "").indexOf("application/x-www-form-urlencoded") && Wa.test(m);
      if ("jsonp" === d.dataTypes[0] || v || t)
          return g = d.jsonpCallback = f.isFunction(d.jsonpCallback) ? d.jsonpCallback() : d.jsonpCallback,
          n = b[g],
          v ? d.url = y.replace(Wa, "$1" + g) : t ? d.data = m.replace(Wa, "$1" + g) : q && (d.url += (Kd.test(y) ? "&" : "?") + d.jsonp + "=" + g),
          d.converters["script json"] = function() {
              return p || f.error(g + " was not called"),
              p[0]
          }
          ,
          d.dataTypes[0] = "json",
          b[g] = function() {
              p = arguments
          }
          ,
          l.always(function() {
              b[g] = n;
              d[g] && (d.jsonpCallback = e.jsonpCallback,
              rc.push(g));
              p && f.isFunction(n) && n(p[0]);
              p = n = c
          }),
          "script"
  });
  f.ajaxSetup({
      accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
          script: /javascript|ecmascript/
      },
      converters: {
          "text script": function(b) {
              return f.globalEval(b),
              b
          }
      }
  });
  f.ajaxPrefilter("script", function(b) {
      b.cache === c && (b.cache = !1);
      b.crossDomain && (b.type = "GET",
      b.global = !1)
  });
  f.ajaxTransport("script", function(b) {
      if (b.crossDomain) {
          var d, f = C.head || C.getElementsByTagName("head")[0] || C.documentElement;
          return {
              send: function(e, l) {
                  d = C.createElement("script");
                  d.async = "async";
                  b.scriptCharset && (d.charset = b.scriptCharset);
                  d.src = b.url;
                  d.onload = d.onreadystatechange = function(b, e) {
                      if (e || !d.readyState || /loaded|complete/.test(d.readyState))
                          d.onload = d.onreadystatechange = null,
                          f && d.parentNode && f.removeChild(d),
                          d = c,
                          e || l(200, "success")
                  }
                  ;
                  f.insertBefore(d, f.firstChild)
              },
              abort: function() {
                  d && d.onload(0, 1)
              }
          }
      }
  });
  var sa, vb = b.ActiveXObject ? function() {
      for (var b in sa)
          sa[b](0, 1)
  }
  : !1, Md = 0;
  f.ajaxSettings.xhr = b.ActiveXObject ? function() {
      var c;
      if (!(c = !this.isLocal && Ab()))
          a: {
              try {
                  c = new b.ActiveXObject("Microsoft.XMLHTTP");
                  break a
              } catch (d) {}
              c = void 0
          }
      return c
  }
  : Ab;
  var wb = f.ajaxSettings.xhr();
  f.extend(f.support, {
      ajax: !!wb,
      cors: !!wb && "withCredentials"in wb
  });
  f.support.ajax && f.ajaxTransport(function(d) {
      if (!d.crossDomain || f.support.cors) {
          var e;
          return {
              send: function(l, g) {
                  var n, p, m = d.xhr();
                  d.username ? m.open(d.type, d.url, d.async, d.username, d.password) : m.open(d.type, d.url, d.async);
                  if (d.xhrFields)
                      for (p in d.xhrFields)
                          m[p] = d.xhrFields[p];
                  d.mimeType && m.overrideMimeType && m.overrideMimeType(d.mimeType);
                  !d.crossDomain && !l["X-Requested-With"] && (l["X-Requested-With"] = "XMLHttpRequest");
                  try {
                      for (p in l)
                          m.setRequestHeader(p, l[p])
                  } catch (y) {}
                  m.send(d.hasContent && d.data || null);
                  e = function(b, l) {
                      var p, y, q, v, t;
                      try {
                          if (e && (l || 4 === m.readyState))
                              if (e = c,
                              n && (m.onreadystatechange = f.noop,
                              vb && delete sa[n]),
                              l)
                                  4 !== m.readyState && m.abort();
                              else {
                                  p = m.status;
                                  q = m.getAllResponseHeaders();
                                  v = {};
                                  (t = m.responseXML) && t.documentElement && (v.xml = t);
                                  try {
                                      v.text = m.responseText
                                  } catch (z) {}
                                  try {
                                      y = m.statusText
                                  } catch (A) {
                                      y = ""
                                  }
                                  !p && d.isLocal && !d.crossDomain ? p = v.text ? 200 : 404 : 1223 === p && (p = 204)
                              }
                      } catch (x) {
                          l || g(-1, x)
                      }
                      v && g(p, y, v, q)
                  }
                  ;
                  d.async ? 4 === m.readyState ? setTimeout(e, 0) : (n = ++Md,
                  vb && (sa || (sa = {},
                  f(b).unload(vb)),
                  sa[n] = e),
                  m.onreadystatechange = e) : e()
              },
              abort: function() {
                  e && e(0, 1)
              }
          }
      }
  });
  var Ba, Xa, Nd = /^(?:toggle|show|hide)$/, Od = RegExp("^(?:([-+])=|)(" + Fa + ")([a-z%]*)$", "i"), Pd = /queueHooks$/, Ca = [function(b, c, d) {
      var e, l, g, n, p, m, y = this, q = b.style, v = {}, t = [], A = b.nodeType && F(b);
      d.queue || (p = f._queueHooks(b, "fx"),
      null == p.unqueued && (p.unqueued = 0,
      m = p.empty.fire,
      p.empty.fire = function() {
          p.unqueued || m()
      }
      ),
      p.unqueued++,
      y.always(function() {
          y.always(function() {
              p.unqueued--;
              f.queue(b, "fx").length || p.empty.fire()
          })
      }));
      1 === b.nodeType && ("height"in c || "width"in c) && (d.overflow = [q.overflow, q.overflowX, q.overflowY],
      "inline" === f.css(b, "display") && "none" === f.css(b, "float") && (!f.support.inlineBlockNeedsLayout || "inline" === P(b.nodeName) ? q.display = "inline-block" : q.zoom = 1));
      d.overflow && (q.overflow = "hidden",
      f.support.shrinkWrapBlocks || y.done(function() {
          q.overflow = d.overflow[0];
          q.overflowX = d.overflow[1];
          q.overflowY = d.overflow[2]
      }));
      for (e in c)
          l = c[e],
          Nd.exec(l) && (delete c[e],
          l !== (A ? "hide" : "show") && t.push(e));
      if (l = t.length) {
          g = f._data(b, "fxshow") || f._data(b, "fxshow", {});
          A ? f(b).show() : y.done(function() {
              f(b).hide()
          });
          y.done(function() {
              var c;
              f.removeData(b, "fxshow", !0);
              for (c in v)
                  f.style(b, c, v[c])
          });
          for (e = 0; e < l; e++)
              c = t[e],
              n = y.createTween(c, A ? g[c] : 0),
              v[c] = g[c] || f.style(b, c),
              c in g || (g[c] = n.start,
              A && (n.end = n.start,
              n.start = "width" === c || "height" === c ? 1 : 0))
      }
  }
  ], ua = {
      "*": [function(b, c) {
          var d, e, l = this.createTween(b, c), g = Od.exec(c), n = l.cur(), p = +n || 0, m = 1, y = 20;
          if (g) {
              d = +g[2];
              e = g[3] || (f.cssNumber[b] ? "" : "px");
              if ("px" !== e && p) {
                  p = f.css(l.elem, b, !0) || d || 1;
                  do
                      m = m || ".5",
                      p /= m,
                      f.style(l.elem, b, p + e);
                  while (m !== (m = l.cur() / n) && 1 !== m && --y)
              }
              l.unit = e;
              l.start = p;
              l.end = g[1] ? p + (g[1] + 1) * d : d
          }
          return l
      }
      ]
  };
  f.Animation = f.extend(Cb, {
      tweener: function(b, c) {
          f.isFunction(b) ? (c = b,
          b = ["*"]) : b = b.split(" ");
          for (var d, e = 0, l = b.length; e < l; e++)
              d = b[e],
              ua[d] = ua[d] || [],
              ua[d].unshift(c)
      },
      prefilter: function(b, c) {
          c ? Ca.unshift(b) : Ca.push(b)
      }
  });
  f.Tween = S;
  S.prototype = {
      constructor: S,
      init: function(b, c, d, e, l, g) {
          this.elem = b;
          this.prop = d;
          this.easing = l || "swing";
          this.options = c;
          this.start = this.now = this.cur();
          this.end = e;
          this.unit = g || (f.cssNumber[d] ? "" : "px")
      },
      cur: function() {
          var b = S.propHooks[this.prop];
          return b && b.get ? b.get(this) : S.propHooks._default.get(this)
      },
      run: function(b) {
          var c, d = S.propHooks[this.prop];
          return this.options.duration ? this.pos = c = f.easing[this.easing](b, this.options.duration * b, 0, 1, this.options.duration) : this.pos = c = b,
          this.now = (this.end - this.start) * c + this.start,
          this.options.step && this.options.step.call(this.elem, this.now, this),
          d && d.set ? d.set(this) : S.propHooks._default.set(this),
          this
      }
  };
  S.prototype.init.prototype = S.prototype;
  S.propHooks = {
      _default: {
          get: function(b) {
              var c;
              return null == b.elem[b.prop] || b.elem.style && null != b.elem.style[b.prop] ? (c = f.css(b.elem, b.prop, !1, ""),
              !c || "auto" === c ? 0 : c) : b.elem[b.prop]
          },
          set: function(b) {
              f.fx.step[b.prop] ? f.fx.step[b.prop](b) : b.elem.style && (null != b.elem.style[f.cssProps[b.prop]] || f.cssHooks[b.prop]) ? f.style(b.elem, b.prop, b.now + b.unit) : b.elem[b.prop] = b.now
          }
      }
  };
  S.propHooks.scrollTop = S.propHooks.scrollLeft = {
      set: function(b) {
          b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
      }
  };
  f.each(["toggle", "show", "hide"], function(b, c) {
      var d = f.fn[c];
      f.fn[c] = function(e, l, g) {
          return null == e || "boolean" == typeof e || !b && f.isFunction(e) && f.isFunction(l) ? d.apply(this, arguments) : this.animate(Da(c, !0), e, l, g)
      }
  });
  f.fn.extend({
      fadeTo: function(b, c, d, f) {
          return this.filter(F).css("opacity", 0).show().end().animate({
              opacity: c
          }, b, d, f)
      },
      animate: function(b, c, d, e) {
          var l = f.isEmptyObject(b)
            , g = f.speed(c, d, e);
          c = function() {
              var c = Cb(this, f.extend({}, b), g);
              l && c.stop(!0)
          }
          ;
          return l || !1 === g.queue ? this.each(c) : this.queue(g.queue, c)
      },
      stop: function(b, d, e) {
          var l = function(b) {
              var c = b.stop;
              delete b.stop;
              c(e)
          };
          return "string" != typeof b && (e = d,
          d = b,
          b = c),
          d && !1 !== b && this.queue(b || "fx", []),
          this.each(function() {
              var c = !0
                , d = null != b && b + "queueHooks"
                , g = f.timers
                , j = f._data(this);
              if (d)
                  j[d] && j[d].stop && l(j[d]);
              else
                  for (d in j)
                      j[d] && j[d].stop && Pd.test(d) && l(j[d]);
              for (d = g.length; d--; )
                  g[d].elem === this && (null == b || g[d].queue === b) && (g[d].anim.stop(e),
                  c = !1,
                  g.splice(d, 1));
              (c || !e) && f.dequeue(this, b)
          })
      }
  });
  f.each({
      slideDown: Da("show"),
      slideUp: Da("hide"),
      slideToggle: Da("toggle"),
      fadeIn: {
          opacity: "show"
      },
      fadeOut: {
          opacity: "hide"
      },
      fadeToggle: {
          opacity: "toggle"
      }
  }, function(b, c) {
      f.fn[b] = function(b, d, f) {
          return this.animate(c, b, d, f)
      }
  });
  f.speed = function(b, c, d) {
      var e = b && "object" == typeof b ? f.extend({}, b) : {
          complete: d || !d && c || f.isFunction(b) && b,
          duration: b,
          easing: d && c || c && !f.isFunction(c) && c
      };
      e.duration = f.fx.off ? 0 : "number" == typeof e.duration ? e.duration : e.duration in f.fx.speeds ? f.fx.speeds[e.duration] : f.fx.speeds._default;
      if (null == e.queue || !0 === e.queue)
          e.queue = "fx";
      return e.old = e.complete,
      e.complete = function() {
          f.isFunction(e.old) && e.old.call(this);
          e.queue && f.dequeue(this, e.queue)
      }
      ,
      e
  }
  ;
  f.easing = {
      linear: function(b) {
          return b
      },
      swing: function(b) {
          return 0.5 - Math.cos(b * Math.PI) / 2
      }
  };
  f.timers = [];
  f.fx = S.prototype.init;
  f.fx.tick = function() {
      for (var b, c = f.timers, d = 0; d < c.length; d++)
          b = c[d],
          !b() && c[d] === b && c.splice(d--, 1);
      c.length || f.fx.stop()
  }
  ;
  f.fx.timer = function(b) {
      b() && f.timers.push(b) && !Xa && (Xa = setInterval(f.fx.tick, f.fx.interval))
  }
  ;
  f.fx.interval = 13;
  f.fx.stop = function() {
      clearInterval(Xa);
      Xa = null
  }
  ;
  f.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
  };
  f.fx.step = {};
  f.expr && f.expr.filters && (f.expr.filters.animated = function(b) {
      return f.grep(f.timers, function(c) {
          return b === c.elem
      }).length
  }
  );
  var sc = /^(?:body|html)$/i;
  f.fn.offset = function(b) {
      if (arguments.length)
          return b === c ? this : this.each(function(c) {
              f.offset.setOffset(this, b, c)
          });
      var d, e, l, g, n, p, m, y = {
          top: 0,
          left: 0
      }, q = this[0], v = q && q.ownerDocument;
      if (v)
          return (e = v.body) === q ? f.offset.bodyOffset(q) : (d = v.documentElement,
          f.contains(d, q) ? ("undefined" != typeof q.getBoundingClientRect && (y = q.getBoundingClientRect()),
          l = Db(v),
          g = d.clientTop || e.clientTop || 0,
          n = d.clientLeft || e.clientLeft || 0,
          p = l.pageYOffset || d.scrollTop,
          m = l.pageXOffset || d.scrollLeft,
          {
              top: y.top + p - g,
              left: y.left + m - n
          }) : y)
  }
  ;
  f.offset = {
      bodyOffset: function(b) {
          var c = b.offsetTop
            , d = b.offsetLeft;
          return f.support.doesNotIncludeMarginInBodyOffset && (c += parseFloat(f.css(b, "marginTop")) || 0,
          d += parseFloat(f.css(b, "marginLeft")) || 0),
          {
              top: c,
              left: d
          }
      },
      setOffset: function(b, c, d) {
          var e = f.css(b, "position");
          "static" === e && (b.style.position = "relative");
          var l = f(b), g = l.offset(), n = f.css(b, "top"), p = f.css(b, "left"), m = {}, y = {}, q, v;
          ("absolute" === e || "fixed" === e) && -1 < f.inArray("auto", [n, p]) ? (y = l.position(),
          q = y.top,
          v = y.left) : (q = parseFloat(n) || 0,
          v = parseFloat(p) || 0);
          f.isFunction(c) && (c = c.call(b, d, g));
          null != c.top && (m.top = c.top - g.top + q);
          null != c.left && (m.left = c.left - g.left + v);
          "using"in c ? c.using.call(b, m) : l.css(m)
      }
  };
  f.fn.extend({
      position: function() {
          if (this[0]) {
              var b = this[0]
                , c = this.offsetParent()
                , d = this.offset()
                , e = sc.test(c[0].nodeName) ? {
                  top: 0,
                  left: 0
              } : c.offset();
              return d.top -= parseFloat(f.css(b, "marginTop")) || 0,
              d.left -= parseFloat(f.css(b, "marginLeft")) || 0,
              e.top += parseFloat(f.css(c[0], "borderTopWidth")) || 0,
              e.left += parseFloat(f.css(c[0], "borderLeftWidth")) || 0,
              {
                  top: d.top - e.top,
                  left: d.left - e.left
              }
          }
      },
      offsetParent: function() {
          return this.map(function() {
              for (var b = this.offsetParent || C.body; b && !sc.test(b.nodeName) && "static" === f.css(b, "position"); )
                  b = b.offsetParent;
              return b || C.body
          })
      }
  });
  f.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
  }, function(b, d) {
      var e = /Y/.test(d);
      f.fn[b] = function(l) {
          return f.access(this, function(b, l, g) {
              var n = Db(b);
              if (g === c)
                  return n ? d in n ? n[d] : n.document.documentElement[l] : b[l];
              n ? n.scrollTo(e ? f(n).scrollLeft() : g, e ? g : f(n).scrollTop()) : b[l] = g
          }, b, l, arguments.length, null)
      }
  });
  f.each({
      Height: "height",
      Width: "width"
  }, function(b, d) {
      f.each({
          padding: "inner" + b,
          content: d,
          "": "outer" + b
      }, function(e, l) {
          f.fn[l] = function(l, g) {
              var n = arguments.length && (e || "boolean" != typeof l)
                , p = e || (!0 === l || !0 === g ? "margin" : "border");
              return f.access(this, function(d, e, l) {
                  var g;
                  return f.isWindow(d) ? d.document.documentElement["client" + b] : 9 === d.nodeType ? (g = d.documentElement,
                  Math.max(d.body["scroll" + b], g["scroll" + b], d.body["offset" + b], g["offset" + b], g["client" + b])) : l === c ? f.css(d, e, l, p) : f.style(d, e, l, p)
              }, d, n ? l : c, n, null)
          }
      })
  });
  b.jQuery = b.$ = f;
  "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
      return f
  })
}
)(window);
console.log("--fx--!0--", !0);
var portraitMode = !0,
    mobilePortraitWidth = 480,
    mobilePortraitHeight = 640,
    mobileLandscapeWidth = 640,
    mobileLandscapeHeight = 480,
    mobileWidth = portraitMode ? mobilePortraitWidth : mobileLandscapeWidth,
    mobileHeight = portraitMode ? mobilePortraitHeight : mobileLandscapeHeight,
    desktopWidth = 480, desktopHeight = 640,
    w, h, multiplier, destW, destH, dynamicClickableEntityDivs = {},
    coreDivsToResize = ["game", "play", "orientate"], advancedDivsToResize = {
  MobileAdInGamePreroll: {
      "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
      "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
  },
  MobileAdInGameEnd: {
      "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
      "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
  },
  MobileAdInGamePreroll2: {
      "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
      "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
  },
  MobileAdInGameEnd2: {
      "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
      "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
  },
  MobileAdInGamePreroll3: {
      "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
      "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
  },
  MobileAdInGameEnd3: {
      "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
      "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
  }
};
function adjustLayers(b) {

  for (i = 0; i < coreDivsToResize.length; i++)
      ig.ua.mobile ? ($("#" + coreDivsToResize[i]).width(w),
      $("#" + coreDivsToResize[i]).height(h)) : ($("#" + coreDivsToResize[i]).width(destW),
      $("#" + coreDivsToResize[i]).height(destH),
      $("#" + coreDivsToResize[i]).css("left", b ? 0 : w / 2 - destW / 2));
  for (key in advancedDivsToResize)
      try {
          $("#" + key).width(w),
          $("#" + key).height(h),
          $("#" + key + "-Box").css("left", (w - advancedDivsToResize[key]["box-width"]) / 2),
          $("#" + key + "-Box").css("top", (h - advancedDivsToResize[key]["box-height"]) / 2)
      } catch (c) {
          console.log(c)
      }
  $("#ajaxbar").width(w);
  $("#ajaxbar").height(h)
}
var minHeight = 99999999;
function sizeHandler() {
  if ($("#game")) {
      w = window.innerWidth;
      h = window.innerHeight;
      console.log("--fx--ig.ua.mobile--", ig.ua.mobile);
      if (ig.ua.mobile && 1==0) {
        multiplier = Math.min(h / mobileHeight, w / mobileWidth),
        destW = mobileWidth * multiplier,
        destH = mobileHeight * multiplier
      } else {
        multiplier = Math.min(h / desktopHeight, w / desktopWidth),
        destW = desktopWidth * multiplier,
        destH = desktopHeight * multiplier
      }
      widthRatio = window.innerWidth / mobileWidth;
      heightRatio = window.innerHeight / mobileHeight;
      adjustLayers();
      window.scrollTo(0, 1);
      for (var b = navigator.userAgent.split(" "), c = 0; c < b.length; c++)
          b[c].substr(0, 8);
      navigator.userAgent.indexOf("wv");
      navigator.userAgent.indexOf("SamsungBrowser")
  }
}
function orientationHandler() {
  console.log("changing orientation ...");
  ig.ua.mobile && ((portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth) ? ($("#orientate").show(),
  $("#game").hide()) : ($("#orientate").hide(),
  $("#game").show()));
  sizeHandler()
}
function fixSamsungHandler() {
  ig.ua.android && (!(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && !(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox"))) && (document.addEventListener("touchstart", function(b) {
      b.preventDefault();
      return !1
  }, !1),
  document.addEventListener("touchmove", function(b) {
      b.preventDefault();
      return !1
  }, !1),
  document.addEventListener("touchend", function(b) {
      b.preventDefault();
      return !1
  }, !1))
}
window.addEventListener("resize", function() {
  orientationHandler()
}, !1);
window.addEventListener("orientationchange", function() {
  orientationHandler()
}, !1);
document.ontouchmove = function(b) {
  window.scrollTo(0, 1);
  b.preventDefault()
}
;
function getInternetExplorerVersion() {
  var b = -1;
  "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
  return b
}
var ie = getInternetExplorerVersion();
function getQueryVariable(b) {
    for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
      var e = c[d].split("=");
      if (decodeURIComponent(e[0]) == b) {
        return decodeURIComponent(e[1])
      }
  }
}
