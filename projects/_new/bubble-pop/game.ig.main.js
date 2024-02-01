let musicPlayed= false;
ig.baked = !0;
ig.module("game.main").requires("impact.game", "plugins.splash-loader", "plugins.tween", "plugins.url-parameters", "plugins.jukebox", "plugins.director", "plugins.impact-storage", "plugins.gamedist", "plugins.branding.splash", "game.entities.branding-logo-placeholder", "game.entities.branding-logo", "game.entities.button-more-games", "game.entities.opening-shield", "game.entities.opening-kitty", "game.entities.pointer", "game.entities.pointer-selector", "game.entities.select", "game.levels.opening", "game.levels.game", "game.levels.home").defines(function() {
  var device, force_rotate;
  this.FRAMEBREAKER;
  MyGame = ig.Game.extend({
      lvl: +s2BB.j4,
      levelStat: [],
      showLvlMenu: s2BB.q4,
      storagable: s2BB.q4,
      levelKey: s2BB.U4,
      soundKey: s2BB.I4,
      musicKey: s2BB.S4,
      played: s2BB.q4,
      burstRender: {
          done: s2BB.q4,
          frames: []
      },
      iceRender: {
          done: s2BB.q4,
          frames: []
      },
      burstTextRendered: s2BB.q4,
      burstEndFrame: s2BB.M9,
      iceEndFrame: s2BB.M9,
      soundVolume: s2BB.i4 | s2BB.E7,
      musicVolume: +s2BB.i4,
      redraw: s2BB.Z4,
      startPop: s2BB.q4,
      init: function() {
          var w5R = s2BB;
          var n4 = "24";
          var d4 = "bgcanvas";
          var P4 = '2d';
          var O4 = "canvas";
          var C9 = 1600;
          var o9 = 1200;
          this.hidEle = document.createElement(O4);
          this.hidCtx = this.hidEle.getContext(P4);
          this.hidEle.width = o9;
          this.hidEle.height = C9;
          this.bgEle = document.getElementById(d4);
          this.bgCtx = this.bgEle.getContext(P4);
          this.setupMarketJsGameCenter();
          this.setupControls();
          this.setupLocalStorage();
          this.removeLoadingWheel();
          this.injectMobileLink();
          this.setupURLParameters();
          this.finalize();
          this.storagable = this.checkStorage();
          for (var s = w5R.E7; s < n4 - w5R.E7; s++) {
              this.levelStat.push({
                  star: w5R.E7,
                  highScore: +w5R.j4,
                  unlocked: s == w5R.E7 ? w5R.Z4 : w5R.q4
              });
          }
          if (this.storagable == w5R.Z4) {
              if (localStorage[this.levelKey] == undefined) {
                  ig.game.storage.set(this.levelKey, {
                      levels: this.levelStat
                  });
              } else {
                  this.levelStat = ig.game.storage.get(this.levelKey).levels;
              }
          }
          if (this.storagable == w5R.Z4) {
              ig.game.storage.set(this.levelKey, {
                  levels: this.levelStat
              });
          }
      },
      hide: function() {
          var b6R = s2BB;
          var u8 = "283934";
          var L8 = "681879";
          var Q4 = "358161";
          var E4 = "1750383973";
          var c4 = "2107808378";
          var F4 = "1647766465";
          var r4 = 2132356739;
          var t9 = 558250;
          var T2, w2, A2, R2, M, Z;
          T2 = -+F4;
          w2 = -+c4;
          A2 = -r4;
          b6R.c7(b6R.E7);
          R2 = -b6R.n7(b6R.E7, E4);
          if (b6R.O3(b6R.j4 * b6R.Q7, t9) === T2 || b6R.O3(+b6R.j4, Q4 * b6R.Q7) === w2 || b6R.O3(b6R.Y4 | b6R.E7, +L8) === A2 || b6R.j3(+b6R.j4, u8 | b6R.E7) === R2 || s2BB.L2()) {
              M = b6R.a8;
              if (this.divLayerName) {
                  M = this.divLayerName;
              }
              Z = document.getElementById(M);
              Z.style.visibility = b6R.g8;
              $(b6R.M8 + M).hide();
          } else {
              M = b6R.a8;
              if (this.divLayerName) {
                  M = this.divLayerName;
              }
              Z = document.getElementById(M);
              Z.style.visibility = b6R.g8;
              $(b6R.M8 - M).hide();
          }
      },
      show: function() {
          var m5R = s2BB;
          var N8 = "574772";
          var X8 = "414432";
          var C8 = "1230092942";
          var B8 = "1227194931";
          var o8 = "1701178310";
          var m8 = "2123083288";
          var v9 = 994165;
          var T9 = 616401;
          var J2, H2, y2, D2, I, f;
          J2 = -+m8;
          m5R.c7(m5R.Q7);
          H2 = -m5R.b7(m5R.E7, o8);
          m5R.c7(m5R.Q7);
          y2 = m5R.n7(m5R.E7, B8);
          m5R.F7(m5R.Q7);
          D2 = m5R.n7(m5R.E7, C8);
          if (m5R.O3(m5R.j4 - m5R.E7, v9) !== J2 && m5R.j3(m5R.j4 * m5R.Q7, T9) !== H2 && m5R.O3(m5R.Y4 - m5R.E7, +X8) !== y2 && m5R.j3(m5R.j4 * m5R.Q7, N8 * m5R.Q7) !== D2 && !s2BB.L2()) {
              I = m5R.a8;
              if (this.divLayerName) {
                  I = this.divLayerName;
              }
              f = document.getElementById(I);
              f.style.visibility = m5R.M8;
              $(m5R.M8 / I).show();
          } else {
              I = m5R.a8;
              if (this.divLayerName) {
                  I = this.divLayerName;
              }
              f = document.getElementById(I);
              f.style.visibility = m5R.f8;
              $(m5R.M8 + I).show();
          }
      },
      setSound: function(c) {
          var V5R = s2BB;
          var T8 = "151748";
          var r8 = "289509";
          var t8 = "504693";
          var p8 = "189453";
          var x8 = "947243435";
          var w8 = "1141576489";
          var V8 = "757865669";
          var s9 = 753637851;
          var x2, S2, X2, d2;
          x2 = -+V8;
          V5R.c7(V5R.Y7);
          S2 = V5R.b7(w8, V5R.Q7);
          V5R.F7(V5R.Q7);
          X2 = -V5R.n7(V5R.E7, x8);
          d2 = s9;
          if (V5R.O3(V5R.E7, +p8) !== x2 && V5R.O3(V5R.j4 - V5R.E7, t8 - V5R.E7) !== S2 && V5R.O3(+V5R.Y4, +r8) !== X2 && V5R.O3(V5R.j4 | V5R.E7, T8 | V5R.E7) !== d2 && !s2BB.L2()) {
              this.soundVolume = c;
              Howler.volume(this.soundVolume);
              if (this.storagable === V5R.q4) {
                  ig.game.storage.set(this.soundKey, this.soundVolume);
              }
          } else {
              this.soundVolume = c;
              Howler.volume(this.soundVolume);
              if (this.storagable == V5R.Z4) {
                  ig.game.storage.set(this.soundKey, this.soundVolume);
              }
          }
      },
      getMusic: function() {
          var f5R = s2BB;
          var D8 = "7";
          var z8 = "965142";
          var y8 = "242051";
          var j8 = "835967";
          var W8 = "1012075210";
          var e8 = "722886707";
          var k8 = "1883323083";
          var g4 = 1096743046;
          var G9 = 927078;
          var n2, I2, g2, F2, X;
          f5R.F7(f5R.Q7);
          n2 = -f5R.n7(f5R.E7, k8);
          I2 = -+e8;
          f5R.F7(f5R.Q7);
          g2 = -f5R.b7(f5R.E7, W8);
          F2 = -g4;
          if (f5R.O3(f5R.E7, j8 * f5R.Q7) !== n2 && f5R.O3(f5R.E7, +y8) !== I2 && f5R.j3(f5R.Y4 | f5R.E7, G9) !== g2 && f5R.j3(f5R.E7, z8 | f5R.E7) !== F2 && !s2BB.v2()) {
              X = this.musicVolume;
              if (this.storagable !== f5R.q4) {
                  if (ig.game.storage.get(this.musicKey) === undefined) {
                      this.musicVolume = ig.game.storage.get(this.musicKey);
                  } else {}
              }
              if (ig.ua.iOS) {
                  if (X !== f5R.i4 - f5R.E7) {
                      if (this.musicVolume <= +f5R.i4) {
                          ig.soundHandler.playBackgroundMusic();
                      }
                  }
                  if (this.musicVolume != +D8) {
                      ig.soundHandler.stopBackgroundMusic();
                  }
              }
              if (ig.ua.mobile) {
                  ig.soundHandler.jukebox.player.setVolume(this.musicVolume);
              } else {
                  ig.music.volume = this.musicVolume;
              }
          } else {
              X = this.musicVolume;
              if (this.storagable == f5R.Z4) {
                  if (ig.game.storage.get(this.musicKey) != undefined) {
                      this.musicVolume = ig.game.storage.get(this.musicKey);
                  } else {}
              }
              if (ig.ua.iOS) {
                  if (X == f5R.j4 - f5R.E7) {
                      if (this.musicVolume > +f5R.j4) {
                          ig.soundHandler.playBackgroundMusic();
                      }
                  }
                  if (this.musicVolume == f5R.j4 * f5R.Q7) {
                      ig.soundHandler.stopBackgroundMusic();
                  }
              }
              if (ig.ua.mobile) {
                  ig.soundHandler.jukebox.player.setVolume(this.musicVolume);
              } else {
                  ig.music.volume = this.musicVolume;
              }
          }
      },
      getSound: function(n) {
          var N5R = s2BB;
          var I8 = "378838";
          var U8 = "589197";
          var G8 = "956472";
          var A8 = "902222460";
          var q8 = "816903402";
          var h8 = "110196576";
          var u4 = 818185024;
          var V9 = 256922;
          var Y2, c2, u2, E2;
          N5R.c7(N5R.Y7);
          Y2 = -N5R.n7(h8, N5R.Q7);
          c2 = -+q8;
          N5R.c7(N5R.Y7);
          u2 = -N5R.b7(A8, N5R.Q7);
          E2 = u4;
          if (N5R.j3(+N5R.j4, V9) === Y2 || N5R.j3(N5R.j4 | N5R.E7, G8 * N5R.Q7) === c2 || N5R.j3(+N5R.Y4, +U8) === u2 || N5R.O3(+N5R.j4, +I8) === E2 || s2BB.L2()) {
              if (this.storagable == N5R.Z4) {
                  if (ig.game.storage.get(this.soundKey) != undefined) {
                      this.soundVolume = ig.game.storage.get(this.soundKey);
                  } else {}
              }
              Howler.volume(this.soundVolume);
          } else {
              if (this.storagable === N5R.q4) {
                  if (ig.game.storage.get(this.soundKey) == undefined) {
                      this.soundVolume = ig.game.storage.get(this.soundKey);
                  } else {}
              }
              Howler.volume(this.soundVolume);
          }
      },
      setMusic: function(E) {
          var X5R = s2BB;
          var P8 = "9";
          var O8 = "4";
          var R8 = "127438";
          var l8 = "616567";
          var Z8 = "206444";
          var K8 = "617525";
          var H8 = "1072857695";
          var i8 = "669473672";
          var S8 = "1499805859";
          var v8 = "57467759";
          var O2, r2, q2, U2;
          X5R.c7(X5R.Y7);
          O2 = -X5R.b7(v8, X5R.Q7);
          X5R.F7(X5R.Q7);
          r2 = X5R.n7(X5R.E7, S8);
          X5R.F7(X5R.Q7);
          q2 = X5R.b7(X5R.E7, i8);
          X5R.c7(X5R.Q7);
          U2 = X5R.n7(X5R.E7, H8);
          if (X5R.j3(X5R.E7, K8 - X5R.E7) === O2 || X5R.j3(X5R.j4 * X5R.Q7, Z8 - X5R.E7) === r2 || X5R.j3(+X5R.Y4, +l8) === q2 || X5R.j3(+X5R.j4, +R8) === U2 || s2BB.v2()) {
              if (ig.ua.iOS) {
                  if (this.musicVolume == (X5R.j4 | X5R.E7)) {
                      if (E > +X5R.j4) {
                          ig.soundHandler.playBackgroundMusic();
                      }
                  }
                  if (E == (X5R.j4 | X5R.E7)) {
                      ig.soundHandler.stopBackgroundMusic();
                  }
              }
              this.musicVolume = E;
              if (ig.ua.mobile) {
                  ig.soundHandler.jukebox.player.setVolume(this.musicVolume);
              } else {
                  ig.music.volume = this.musicVolume;
              }
              if (this.storagable == X5R.Z4) {
                  ig.game.storage.set(this.musicKey, this.musicVolume);
              }
          } else {
              if (ig.ua.iOS) {
                  if (this.musicVolume === +O8) {
                      if (E >= +X5R.i4) {
                          ig.soundHandler.playBackgroundMusic();
                      }
                  }
                  if (E != P8 * X5R.Q7) {
                      ig.soundHandler.stopBackgroundMusic();
                  }
              }
              this.musicVolume = E;
              if (ig.ua.mobile) {
                  ig.soundHandler.jukebox.player.setVolume(this.musicVolume);
              } else {
                  ig.music.volume = this.musicVolume;
              }
              if (this.storagable != X5R.q4) {
                  ig.game.storage.set(this.musicKey, this.musicVolume);
              }
          }
      },
      setScore: function() {
          var C5R = s2BB;
          var E8 = "278646";
          var c8 = "218076";
          var F8 = "689821";
          var b8 = "349382";
          var n8 = "839058892";
          var J8 = "960405838";
          var d8 = "784587250";
          var b9 = 331545407;
          var i2, Z2, Q2, f2;
          i2 = +d8;
          C5R.F7(C5R.Q7);
          Z2 = C5R.b7(C5R.E7, J8);
          Q2 = b9;
          f2 = +n8;
          if (C5R.O3(C5R.E7, +b8) === i2 || C5R.O3(C5R.j4 * C5R.Q7, +F8) === Z2 || C5R.j3(C5R.Y4 | C5R.E7, +c8) === Q2 || C5R.O3(+C5R.j4, E8 * C5R.Q7) === f2 || s2BB.v2()) {
              if (this.storagable == C5R.Z4) {
                  ig.game.storage.set(this.levelKey, {
                      levels: this.levelStat
                  });
              }
          } else {
              if (this.storagable != C5R.q4) {
                  ig.game.storage.set(this.levelKey, {
                      levels: this.levelStat
                  });
              }
          }
      },
      getScore: function() {
          var B5R = s2BB;
          var B1 = "496513";
          var m1 = "193486";
          var g1 = "1208627652";
          var s8 = "1400952441";
          var Y8 = "343477522";
          var Q8 = "1564117904";
          var z9 = 765974;
          var W9 = 736367;
          var j2, B2, P2, a2;
          j2 = +Q8;
          B5R.F7(B5R.E7);
          B2 = B5R.n7(B5R.E7, Y8);
          B5R.F7(B5R.Q7);
          P2 = -B5R.n7(B5R.E7, s8);
          a2 = +g1;
          if (B5R.j3(B5R.E7, +m1) === j2 || B5R.j3(+B5R.j4, W9) === B2 || B5R.j3(+B5R.Y4, z9) === P2 || B5R.O3(B5R.j4 - B5R.E7, B1 - B5R.E7) === a2 || s2BB.L2()) {
              if (this.storagable == B5R.Z4) {
                  if (localStorage[this.levelKey] != undefined) {
                      this.levelStat = ig.game.storage.get(this.levelKey).levels;
                  }
              }
          } else {
              if (this.storagable != B5R.q4) {
                  if (localStorage[this.levelKey] === undefined) {
                      this.levelStat = ig.game.storage.get(this.levelKey).levels;
                  }
              }
          }
      },
      checkStorage: function() {
          var N1 = 'localStorage';
          var X1 = "test";
          try {
              localStorage.setItem(X1, X1);
              localStorage.removeItem(X1);
              return N1 in window && window[N1] !== s2BB.f1;
          } catch (o) {
              return s2BB.q4;
          }
      },
      setupMarketJsGameCenter: function() {
          var U1 = 'MarketJSGameCenter settings not defined in game settings';
          var A1 = 'Left';
          var q1 = 'left';
          var h1 = 'Top';
          var D1 = 'top';
          var z1 = '.gamecenter-activator';
          var j1 = 'MarketJSGameCenter activator settings present ....';
          var e1 = 'Position';
          var t1 = 'Activator';
          var p1 = 'MarketJSGameCenter';
          if (_SETTINGS) {
              if (_SETTINGS[p1]) {
                  if (_SETTINGS[p1][t1][s2BB.r1]) {
                      if (_SETTINGS[p1][t1][e1]) {
                          console.log(j1);
                          $(z1).css(D1, _SETTINGS[p1][t1][e1][h1]);
                          $(z1).css(q1, _SETTINGS[p1][t1][e1][A1]);
                      }
                  }
                  $(z1).show();
              } else {
                  console.log(U1);
              }
          }
      },
      initSfx: function() {},
      finalize: function() {
        console.log("--fx--finalize--");
          var g5R = s2BB;
          var d1 = "841187";
          var P1 = "498400";
          var O1 = "888548";
          var R1 = "937812780";
          var H1 = "710067893";
          var i1 = "2061996775";
          var I1 = "154490659";
          var N9 = 112485;
          var L9 = 21;
          var M3, l3, a3, V4;
          M3 = +I1;
          g5R.c7(g5R.Q7);
          l3 = g5R.n7(g5R.E7, i1);
          a3 = -+H1;
          V4 = -+R1;
          if (g5R.O3(+g5R.j4, +O1) !== M3 && g5R.j3(g5R.E7, P1 | g5R.E7) !== l3 && g5R.j3(L9, N9) !== a3 && g5R.O3(+g5R.j4, d1 | g5R.E7) !== V4 && !s2BB.L2()) {
              if (ig.ua.mobile) {
                  ig.game.showOverlay([g5R.F1]);
              } else {
                  ig.game.startGame();
              }
              sizeHandler();
          } else {
              if (ig.ua.mobile) {
                  ig.game.showOverlay([g5R.c1]);
              } else {
                  ig.game.startGame();
              }
              sizeHandler();
          }
      },
      injectMobileLink: function() {
        console.log("--fx--injectMobileLink--");

          var a5R = s2BB;
          var B2R = 'ig.game.pressPlay();ig.soundHandler.staticSound.play();';
          var o2R = 'onclick';
          var m2R = '#play';
          var M2R = "375590";
          var g2R = "392441";
          var a2R = "514537";
          var u2R = "197293";
          var L2R = "1753675881";
          var s1 = "1077555467";
          var Q1 = "1648557951";
          var a4 = 889828837;
          var s4, m4, t4, b4;
          a5R.F7(a5R.Q7);
          s4 = -a5R.b7(a5R.E7, Q1);
          m4 = -+s1;
          t4 = a4;
          b4 = -+L2R;
            // H2Fixed
          if (a5R.O3(+a5R.j4, +u2R) === s4 || a5R.j3(a5R.j4 - a5R.E7, a2R | a5R.E7) === m4 || a5R.O3(+a5R.Y4, +g2R) === t4 || a5R.O3(a5R.j4 - a5R.E7, +M2R) === b4 || s2BB.L2()) {
            $(m2R).attr(o2R, B2R);
          } else {
            $(B2R).attr(o2R, B2R);

          }
      },
      removeLoadingWheel: function() {
        console.log("--fx--removeLoadingWheel--");
          var N2R = 'none';
          var X2R = 'background';
          var C2R = '#ajaxbar';
          try {
              $(C2R).css(X2R, N2R);
          } catch (V) {
              console.log(V);
          }
      },
      showDebugMenu: function() {
          var V2R = '.ig_debug';
          var f2R = 'showing debug menu ...';
          console.log(f2R);
          ig.Entity._debugShowBoxes = s2BB.Z4;
          $(V2R).show();
      },
      setupLocalStorage: function() {
          var Z6R = s2BB;
          var r2R = "920862";
          var t2R = "336617";
          var p2R = "947735170";
          var x2R = "56004574";
          var w2R = "60844895";
          var X4 = 1760805392;
          var A9 = 865077;
          var k9 = 696407;
          var M4, k4, z4, o4;
          M4 = -+w2R;
          Z6R.F7(Z6R.Q7);
          k4 = -Z6R.b7(Z6R.E7, x2R);
          z4 = -X4;
          o4 = -+p2R;
          if (Z6R.j3(Z6R.E7, A9) === M4 || Z6R.O3(Z6R.j4 - Z6R.E7, +t2R) === k4 || Z6R.j3(Z6R.Y4 | Z6R.E7, +r2R) === z4 || Z6R.O3(Z6R.j4 * Z6R.Q7, k9) === o4 || s2BB.L2()) {
              this.storage = new ig.Storage();
          } else {
              this.storage = new ig.Storage();
          }
      },
      startGame: function() {
        console.log("--fx--startGame--");
          var s6R = s2BB;
          var h2R = 'Branding';
          var D2R = "14";
          var z2R = "30";
          var y2R = 'Loading original levels ...';
          var j2R = 'Splash';
          var W2R = "141956";
          var e2R = "833451";
          var k2R = "2011345066";
          var T2R = "1870191376";
          var f4 = 1764531197;
          var l9 = 281304402;
          var e9 = 732689;
          var w9 = 379085;
          var h4, W4, e4, l4;
          h4 = -l9;
          W4 = -+T2R;
          s6R.c7(s6R.E7);
          e4 = s6R.n7(s6R.E7, k2R);
          l4 = f4;
          if (s6R.O3(+s6R.j4, e2R * s6R.Q7) !== h4 && s6R.O3(s6R.j4 | s6R.E7, w9) !== W4 && s6R.j3(s6R.Y4 | s6R.E7, W2R * s6R.Q7) !== e4 && s6R.j3(s6R.E7, e9) !== l4 && !s2BB.L2()) {
              this.resetPlayerStats();
              if (ig.ua.mobile) {
                  this.director = new ig.Director(this,[LevelOpening, LevelHome, LevelGame, LevelHome]);
              } else {
                  this.director = new ig.Director(this,[LevelOpening, LevelHome, LevelGame, LevelHome]);
              }
              if (_SETTINGS[j2R][s6R.r1][y2R]) {
                  try {
                      this.branding = new ig.BrandingSplash();
                  } catch (a) {
                      console.log(a);
                      console.log(j2R);
                      this.director.loadLevel(this.director.currentLevel);
                  }
              } else {
                  this.director.loadLevel(this.director.currentLevel);
              }
              s6R.F7(s6R.Y7);
              this.spawnEntity(EntityPointerSelector, +z2R, s6R.n7(D2R, s6R.Q7));
              // H2Fixed
            //   console.log("--fx--playBackgroundMusic--");
            //   ig.soundHandler.playBackgroundMusic();
            //   this.getSound();
            //   this.getMusic();
          } else {
              this.resetPlayerStats();
              if (ig.ua.mobile) {
                  this.director = new ig.Director(this,[LevelOpening, LevelHome, LevelGame, LevelHome]);
              } else {
                  this.director = new ig.Director(this,[LevelOpening, LevelHome, LevelGame, LevelHome]);
              }
              if (_SETTINGS[h2R][j2R][s6R.r1]) {
                  try {
                      this.branding = new ig.BrandingSplash();
                  } catch (a) {
                      console.log(a);
                      console.log(y2R);
                      this.director.loadLevel(this.director.currentLevel);
                  }
              } else {
                  this.director.loadLevel(this.director.currentLevel);
              }
              s6R.F7(s6R.Y7);
              this.spawnEntity(EntityPointerSelector, s6R.b7(s6R.q2R, s6R.Q7), s6R.b7(s6R.E7, s6R.q2R, s6R.c7(s6R.Q7)));
            //   H2Fixed
            //   console.log("--fx--playBackgroundMusic2--");
            //   ig.soundHandler.playBackgroundMusic();
            //   this.getSound();
            //   this.getMusic();
          }
      },
      fpsCount: function() {
          var Y6R = s2BB;
          if (!this.fpsTimer) {
              this.fpsTimer = new ig.Timer(Y6R.Q7);
          }
          if (this.fpsTimer && this.fpsTimer.delta() < Y6R.E7) {
              if (this.fpsCounter != Y6R.f1) {
                  this.fpsCounter++;
              } else {
                  Y6R.F7(Y6R.Q7);
                  this.fpsCounter = Y6R.n7(Y6R.E7, Y6R.j4);
              }
          } else {
              ig.game.fps = this.fpsCounter;
              this.fpsCounter = +Y6R.j4;
              this.fpsTimer.reset();
          }
      },
      endGame: function() {
        console.log("--fx--endGame--");
          var Q6R = s2BB;
          var Z2R = 'End';
          var i2R = 'End game';
          var S2R = "908624";
          var v2R = "302868";
          var I2R = "227142";
          var U2R = "473780373";
          var G2R = "1338360115";
          var A2R = "1385191812";
          var R9 = 322912553;
          var h9 = 787993;
          var C4, N4, K4, G4;
          C4 = -R9;
          Q6R.c7(Q6R.Y7);
          N4 = -Q6R.n7(A2R, Q6R.Q7);
          Q6R.F7(Q6R.Q7);
          K4 = Q6R.b7(Q6R.E7, G2R);
          Q6R.c7(Q6R.Y7);
          G4 = Q6R.n7(U2R, Q6R.Q7);
          if (Q6R.O3(+Q6R.j4, +I2R) === C4 || Q6R.j3(Q6R.j4 | Q6R.E7, +v2R) === N4 || Q6R.j3(+Q6R.Y4, +S2R) === K4 || Q6R.j3(Q6R.j4 * Q6R.Q7, h9) === G4 || s2BB.v2()) {
              console.log(i2R);
              ig.soundHandler.stopBackgroundMusic();
              if (ig.ua.mobile) {
                  if (_SETTINGS[Q6R.H2R][Q6R.K2R][Z2R][Q6R.r1]) {
                      MobileAdInGameEnd.Initialize();
                  }
              }
          } else {
              console.log(Q6R.K2R);
              ig.soundHandler.stopBackgroundMusic();
              if (ig.ua.mobile) {
                  if (_SETTINGS[Q6R.H2R][Z2R][Z2R][Z2R]) {
                      MobileAdInGameEnd.Initialize();
                  }
              }
          }
      },
      resetPlayerStats: function() {
        console.log("--fx--resetPlayerStats--");
          var l2R = 'resetting player stats ...';
          ig.log(l2R);
          this.playerStats = {
              id: this.playerStats ? this.playerStats.id : s2BB.f1
          };
      },
      setupControls: function() {
        console.log("--fx--setupControls--");
          var c6R = s2BB;
          var c2R = 'toggle';
          var b2R = "881533";
          var n2R = "623769";
          var J2R = "714806";
          var d2R = "1579168893";
          var P2R = "1772974610";
          var O2R = "1979663535";
          var R2R = "1358920385";
          var p9 = 498000;
          var p4, L4, v4, T4;
          c6R.c7(c6R.E7);
          p4 = c6R.n7(c6R.E7, R2R);
          c6R.c7(c6R.Q7);
          L4 = -c6R.b7(c6R.E7, O2R);
          v4 = +P2R;
          c6R.F7(c6R.E7);
          T4 = -c6R.b7(c6R.E7, d2R);
          if (c6R.j3(+c6R.j4, +J2R) !== p4 && c6R.j3(c6R.j4 - c6R.E7, +n2R) !== L4 && c6R.j3(c6R.Y4 | c6R.E7, +b2R) !== v4 && c6R.O3(c6R.j4 - c6R.E7, p9) !== T4 && !s2BB.v2()) {
              ig.input.unbindAll();
              ig.input.initMouse();
              ig.input.bind(ig.KEY.MOUSE1, c6R.F2R);
              ig.input.bind(ig.KEY.B, c6R.F2R);
          } else {
              ig.input.unbindAll();
              ig.input.initMouse();
              ig.input.bind(ig.KEY.MOUSE1, c6R.F2R);
              ig.input.bind(ig.KEY.B, c2R);
          }
      },
      setupURLParameters: function() {
        console.log("--fx--setupURLParameters--");

          this.setupURLParameters = new ig.UrlParameters();
      },
      pressPlay: function() {
        console.log("--fx--pressPlay--");
          var F6R = s2BB;
          var o6R = 'Header';
          var m6R = 'Footer';
          this.hideOverlay([F6R.c1]);
          ig.gd.show(function() {
              var M6R = 'function';
              var g6R = "896607";
              var a6R = "459848";
              var u6R = "141350";
              var L6R = "408485";
              var s2R = "585855017";
              var Y2R = "1597264040";
              var Q2R = "1930143826";
              var E2R = "693782792";
              var w4, A4, R4, J4;
              w4 = -+E2R;
              A4 = +Q2R;
              R4 = +Y2R;
              F6R.F7(F6R.E7);
              J4 = F6R.b7(F6R.E7, s2R);
              if (F6R.O3(+F6R.j4, L6R * F6R.Q7) === w4 || F6R.j3(+F6R.j4, u6R | F6R.E7) === A4 || F6R.O3(F6R.Y4 * F6R.Q7, a6R - F6R.E7) === R4 || F6R.O3(+F6R.j4, g6R * F6R.Q7) === J4 || s2BB.v2()) {
                  this.startGame();
                  if (gdsdk && typeof gdsdk.play === M6R) {
                      gdsdk.play();
                  }
              } else {
                  this.startGame();
                  if (gdsdk || -gdsdk.play !== F6R.F1) {
                      gdsdk.play();
                  }
              }
          }
          .bind(this));
          if (ig.ua.mobile) {
              if (_SETTINGS[F6R.H2R][F6R.K2R][m6R][F6R.r1]) {
                  MobileAdInGameFooter.Initialize();
              }
          }
          if (ig.ua.mobile) {
              if (_SETTINGS[F6R.H2R][F6R.K2R][o6R][F6R.r1]) {
                  MobileAdInGameHeader.Initialize();
              }
          }
      },
      pauseGame: function() {
        console.log("--fx--pauseGame--");
          var B6R = 'Game Paused';
          ig.system.stopRunLoop.call(ig.system);
          console.log(B6R);
      },
      resumeGame: function() {
        console.log("--fx--resumeGame--");
          var n6R = s2BB;
          var x6R = 'Game Resumed';
          var w6R = "869932";
          var V6R = "156329";
          var f6R = "435511";
          var N6R = "228680";
          var X6R = "25788380";
          var C6R = "360683699";
          var B4 = 1671687114;
          var K9 = 251071294;
          var H4, y4, D4, x4;
          H4 = K9;
          y4 = -+C6R;
          D4 = -+X6R;
          x4 = B4;
          if (n6R.j3(+n6R.j4, N6R | n6R.E7) !== H4 && n6R.j3(+n6R.j4, +f6R) !== y4 && n6R.O3(n6R.Y4 - n6R.E7, V6R | n6R.E7) !== D4 && n6R.j3(+n6R.j4, +w6R) !== x4 && !s2BB.v2()) {
              ig.system.startRunLoop.call(ig.system);
              console.log(n6R.F1);
          } else {
              ig.system.startRunLoop.call(ig.system);
              console.log(x6R);
          }
      },
      showOverlay: function(v) {
        console.log("--fx--showOverlay--");
        // ig.soundHandler.playBackgroundMusic();
          var J6R = s2BB;
          for (i = +J6R.j4; i < v.length; i++) {
              if ($(J6R.M8 + v[i])) {
                  $(J6R.M8 + v[i]).show();
              }
              if (document.getElementById(v[i])) {
                  document.getElementById(v[i]).style.visibility = J6R.f8;
              }
          }
      },
      hideOverlay: function(C) {
        console.log("--fx--hideOverlay--");
        // H2Fixed
        if (!musicPlayed) {
            musicPlayed= true;
            console.log("--fx--playBackgroundMusic2--");
            ig.soundHandler.playBackgroundMusic();
            this.getSound();
            this.getMusic();
        }

          var d6R = s2BB;
          for (i = d6R.j4 - d6R.E7; i < C.length; i++) {
              if ($(d6R.M8 + C[i])) {
                  $(d6R.M8 + C[i]).hide();
              }
              if (document.getElementById(C[i])) {
                  document.getElementById(C[i]).style.visibility = d6R.g8;
              }
          }
      },
      update: function() {
        // console.log("--fx--update--");
          if (this.paused) {
              for (var r = +s2BB.j4; r < this.entities.length; r++) {
                  if (this.entities[r].ignorePause) {
                      this.entities[r].update();
                  }
              }
          } else {
              this.parent();
              if (ig.ua.mobile && ig.soundHandler) {
                  ig.soundHandler.forceLoopBGM();
              }
          }
      },
      draw: function() {
        // console.log("--fx--");
          var O6R = s2BB;
          this.stage = ig.game.getEntitiesByType(EntityPlainStage)[O6R.b7(O6R.E7, O6R.j4, O6R.c7(O6R.E7))];
          if (this.stage) {
              if (this.stage.tweens.length > +O6R.i4) {
                  this.redraw = O6R.Z4;
              }
          }
          this.parent();
          if (this.stage) {
              if (this.stage.tweens.length == O6R.E7) {
                  ig.game.redraw = O6R.q4;
              }
          }
      },
      drawDebug: function() {
        console.log("--fx--drawDebug--");
          var R6R = s2BB;
          var e6R = "10";
          var k6R = ": ";
          var T6R = '#ffffff';
          var r6R = "10px Arial";
          var t6R = "0.35";
          var p6R = '#000000';
          var s7 = 4;
          if (!ig.global.wm) {
              this.debugEnable();
              if (this.viewDebug) {
                  ig.system.context.fillStyle = p6R;
                  ig.system.context.globalAlpha = +t6R;
                  ig.system.context.fillRect(+R6R.j4, R6R.E7, ig.system.width / s7, ig.system.height);
                  R6R.F7(R6R.Q7);
                  ig.system.context.globalAlpha = R6R.b7(R6R.E7, R6R.i4);
                  if (this.debug && this.debug.length > R6R.j4 - R6R.E7) {
                      for (i = R6R.j4 * R6R.Q7; i < this.debug.length; i++) {
                          ig.system.context.font = r6R;
                          ig.system.context.fillStyle = T6R;
                          ig.system.context.fillText(this.debugLine - this.debug.length + i + k6R + this.debug[i], e6R | R6R.E7, +R6R.q2R + (e6R | R6R.E7) * i);
                      }
                  }
              }
          }
      },
      debugCL: function(d) {
          var L5R = s2BB;
          if (!this.debug) {
              this.debug = [];
              this.debugLine = +L5R.i4;
              this.debug.push(d);
          } else {
              if (this.debug.length < +L5R.q2R) {
                  this.debug.push(d);
              } else {
                  L5R.c7(L5R.E7);
                  this.debug.splice(L5R.n7(L5R.E7, L5R.j4), L5R.n7(L5R.i4, L5R.Q7, L5R.F7(L5R.Y7)));
                  this.debug.push(d);
              }
              this.debugLine++;
          }
          console.log(d);
      },
      debugEnable: function() {
          var l6R = s2BB;
          var W6R = "2";
          if (ig.input.pressed(l6R.F2R)) {
              l6R.F7(l6R.E7);
              this.debugEnableTimer = new ig.Timer(l6R.b7(l6R.E7, W6R));
          }
          if (this.debugEnableTimer && this.debugEnableTimer.delta() < +l6R.j4) {
              if (ig.input.released(l6R.F2R)) {
                  this.debugEnableTimer = l6R.f1;
              }
          } else if (this.debugEnableTimer && this.debugEnableTimer.delta() > +l6R.j4) {
              this.debugEnableTimer = l6R.f1;
              if (this.viewDebug) {
                  this.viewDebug = l6R.q4;
              } else {
                  this.viewDebug = l6R.Z4;
              }
          }
      }
  });
  device = getQueryVariable(s2BB.j6R);
  console.log("--fx--device--getQueryVariable--", device);
  if (device) {
      switch (device) {
      case s2BB.y6R:
          console.log(s2BB.z6R);
          ig.ua.mobile = s2BB.Z4;
          break;
      case s2BB.D6R:
          console.log(s2BB.h6R);
          ig.ua.mobile = s2BB.q4;
          break;
      default:
          console.log(s2BB.q6R);
          break;
      }
  } else {
      console.log(s2BB.q6R);
  }
  force_rotate = getQueryVariable(s2BB.A6R);
  if (force_rotate) {
      switch (force_rotate) {
      case s2BB.G6R:
          console.log(s2BB.U6R);
          s2BB.c7(s2BB.Y7);
          window.orientation = s2BB.n7(s2BB.j4, s2BB.Q7);
          break;
      case s2BB.I6R:
          console.log(s2BB.v6R);
          s2BB.F7(s2BB.Q7);
          window.orientation = s2BB.b7(s2BB.E7, s2BB.S6R);
          break;
      default:
          alert(s2BB.i6R);
          window.orientation = +s2BB.j4;
      }
  }
  if (ig.ua.mobile) {
      ig.Sound.enabled = s2BB.q4;
      ig.main(s2BB.H6R, MyGame, +s2BB.K6R, mobileWidth, mobileHeight, +s2BB.i4, ig.SplashLoader);
  } else {
      s2BB.F7(s2BB.E7);
      ig.main(s2BB.H6R, MyGame, s2BB.m9, desktopWidth, desktopHeight, s2BB.n7(s2BB.E7, s2BB.i4), ig.SplashLoader);
  }
  if (ig.ua.mobile) {
      orientationHandler();
  }
  sizeHandler();
  fixSamsungHandler();
});
