var __extends = this && this.__extends || function() {
    var t = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
    };
    return function(e, i) {
        function a() {
            this.constructor = e;
        }
        t(e, i), e.prototype = null === i ? Object.create(i) : (a.prototype = i.prototype,
        new a());
    };
}();

!function() {
    function t(e, i, a) {
        function n(s, r) {
            if (!i[s]) {
                if (!e[s]) {
                    var h = "function" == typeof require && require;
                    if (!r && h) return h(s, !0);
                    if (o) return o(s, !0);
                    var l = new Error("Cannot find module '" + s + "'");
                    throw l.code = "MODULE_NOT_FOUND", l;
                }
                var d = i[s] = {
                    exports: {}
                };
                e[s][0].call(d.exports, function(t) {
                    var i = e[s][1][t];
                    return n(i || t);
                }, d, d.exports, t, e, i, a);
            }
            return i[s].exports;
        }
        for (var o = "function" == typeof require && require, s = 0; s < a.length; s++) n(a[s]);
        return n;
    }
    return t;
}()({
    1: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./scripts/views/GameOver"), n = t("./scripts/uiComp/OverAdListLoop"), o = t("./scripts/uiComp/AdListLoop"), s = t("./scripts/views/CollectView"), r = t("./scripts/uiComp/ConvergeAd"), h = t("./scripts/views/SkinTrail"), l = t("./scripts/views/GameView"), d = t("./scripts/views/HomeView"), c = t("./scripts/uiComp/PromotionAnimation"), u = t("./scripts/views/LoginView"), p = t("./scripts/views/Resurgence"), f = t("./scripts/views/RankView"), m = function() {
            function t() {}
            return t.init = function() {
                var t = Laya.ClassUtils.regClass;
                t("scripts/views/GameOver.ts", a["default"]), t("scripts/uiComp/OverAdListLoop.ts", n["default"]),
                t("scripts/uiComp/AdListLoop.ts", o["default"]), t("scripts/views/CollectView.ts", s["default"]),
                t("scripts/uiComp/ConvergeAd.ts", r["default"]), t("scripts/views/SkinTrail.ts", h["default"]),
                t("scripts/views/GameView.ts", l["default"]), t("scripts/views/HomeView.ts", d["default"]),
                t("scripts/uiComp/PromotionAnimation.ts", c["default"]), t("scripts/views/LoginView.ts", u["default"]),
                t("scripts/views/Resurgence.ts", p["default"]), t("scripts/views/RankView.ts", f["default"]);
            }, t.width = 750, t.height = 1334, t.scaleMode = "fixedauto", t.screenMode = "none",
            t.alignV = "middle", t.alignH = "center", t.startScene = "views/login.scene", t.sceneRoot = "",
            t.debug = !1, t.stat = !1, t.physicsDebug = !1, t.exportSceneToJson = !0, t;
        }();
        i["default"] = m, m.init();
    }, {
        "./scripts/uiComp/AdListLoop": 22,
        "./scripts/uiComp/ConvergeAd": 23,
        "./scripts/uiComp/OverAdListLoop": 24,
        "./scripts/uiComp/PromotionAnimation": 25,
        "./scripts/views/CollectView": 29,
        "./scripts/views/GameOver": 30,
        "./scripts/views/GameView": 31,
        "./scripts/views/HomeView": 32,
        "./scripts/views/LoginView": 33,
        "./scripts/views/RankView": 34,
        "./scripts/views/Resurgence": 35,
        "./scripts/views/SkinTrail": 36
    } ],
    2: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./GameConfig"), n = t("./scripts/LayaSample"), o = function() {
            function t() {
                var t = Laya.Browser.height / Laya.Browser.width, e = Laya.Browser.onMobile ? t * a["default"].width : a["default"].height;
                n["default"].screen.realPxRatio = e / Laya.Browser.clientHeight, n["default"].screen.allScreen = t > 17 / 9 ? !0 : !1,
                n["default"].screen.offsetTop = (e - a["default"].height) / 2, window.Laya3D ? Laya3D.init(a["default"].width, e) : Laya.init(a["default"].width, a["default"].height, Laya.WebGL),
                Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(),
                Laya.stage.scaleMode = a["default"].scaleMode,
                // Laya.stage.screenMode = a["default"].screenMode,
                Laya.stage.alignV = a["default"].alignV, Laya.stage.alignH = a["default"].alignH,
                Laya.stage.useRetinalCanvas = !0, Laya.URL.exportSceneToJson = a["default"].exportSceneToJson,
                (a["default"].debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(),
                a["default"].physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(),
                a["default"].stat && Laya.Stat.show(), Laya.alertGlobalError = !0, Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
            }
            return t.prototype.onVersionLoaded = function() {
                Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
            }, t.prototype.onConfigLoaded = function() {
                a["default"].startScene && Laya.Scene.open(a["default"].startScene);
            }, t;
        }();
        new o();
    }, {
        "./GameConfig": 1,
        "./scripts/LayaSample": 3
    } ],
    3: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./manager/StorageMgr"), n = t("./manager/SoundMgr"), o = t("./manager/NetMgr"), s = t("./platforms/wx/WxAd"), r = t("./manager/GameMgr"), h = t("./comp/CreateModel"), l = t("./platforms/wx/WxAPI"), d = t("./other/ConfigData"), c = function() {
            function t() {}
            return Object.defineProperty(t, "gameMgr", {
                get: function() {
                    return this._gameMgr;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "glEvent", {
                get: function() {
                    return this._eventListener;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "soundMgr", {
                get: function() {
                    return void 0 === this._soundMgr && (this._soundMgr = new n["default"]()), this._soundMgr;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "storageMgr", {
                get: function() {
                    return void 0 === this._storageMge && (this._storageMge = new a["default"]()), this._storageMge;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "netMgr", {
                get: function() {
                    return this._netMgr;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "commonData", {
                get: function() {
                    return this._commonData;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "adMgr", {
                get: function() {
                    return void 0 === this._adMgr && (this._adMgr = this.wxAd), this._adMgr;
                },
                set: function(t) {
                    this._adMgr = t;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "wxMgr", {
                get: function() {
                    return void 0 === this._wxMgr && (this._wxMgr = new l["default"]()), this._wxMgr;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "wxAd", {
                get: function() {
                    return void 0 === this._wxAd && (this._wxAd = new s["default"]()), this._wxAd;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t, "modelCreator", {
                get: function() {
                    return void 0 === this._modelCreator && (this._modelCreator = new h["default"]()),
                    this._modelCreator;
                },
                enumerable: !0,
                configurable: !0
            }), t._eventListener = new Laya.EventDispatcher(), t._gameMgr = new r["default"](),
            t._netMgr = new o["default"](), t._commonData = new d["default"](), t.screen = {
                realPxRatio: 0,
                offsetTop: 0,
                allScreen: !1
            }, t;
        }();
        i["default"] = c;
    }, {
        "./comp/CreateModel": 7,
        "./manager/GameMgr": 11,
        "./manager/NetMgr": 12,
        "./manager/SoundMgr": 13,
        "./manager/StorageMgr": 15,
        "./other/ConfigData": 16,
        "./platforms/wx/WxAPI": 19,
        "./platforms/wx/WxAd": 20
    } ],
    4: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.canChecks = [], e.isTouchs = [], e;
            }
            return __extends(e, t), e.prototype.init = function(t) {
                this.width = 1, this.distance = 5, this.distance += 1.5, this.targets = t, this.canChecks = [];
                for (var e = 0; e < this.targets.length; e++) this.canChecks.push(!0);
            }, e.prototype.onUpdate = function() {
                if (!a["default"].gameMgr.isOver) for (var t = 0; t < this.targets.length; t++) {
                    var e = this.targets[t];
                    if (e && e.getBike.transform.position.y < 3) {
                        var i = e.getChild("TargetPos").transform.position, n = this.owner, o = n.transform.position;
                        i.z > o.z && i.z < o.z + this.distance ? (this.isTouchs[t] = i.x > o.x - this.width && i.x < o.x + this.width,
                        this.isTouchs[t] && this.canChecks[t] && (this.canChecks[t] = !1, e.speedUp())) : -1 != e.owner.name.indexOf("Role") && i.z > o.z + 1e3 && (Laya.Pool.recover("arrow", this.owner),
                        this.owner.parent.removeChild(this.owner));
                    }
                }
            }, e;
        }(Laya.Script3D);
        i["default"] = n;
    }, {
        "../LayaSample": 3
    } ],
    5: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = t("../other/ConfigData"), o = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.originMaxSpeed = .55, e.maxSpeed = .55, e.factor_speed = 1.28, e.factor_jump = .1,
                e.G = -.25, e.Acc = .02, e.acceTimer = 0, e.deceTimer = 1, e.speedToZ = 0, e.speedToY = 0,
                e.carWidth = .54, e.currentHeight = .689, e.turnoverHeight = 0, e.rotateUnit = new Laya.Vector3(1, 0, 0),
                e.rotateTimer = 0, e.rotateAngle = 0, e.rotateStatus = 0, e.originAngle = 0, e.isSpeedUp = !1,
                e.speedLevel = 0, e;
            }
            return __extends(e, t), e.prototype.init = function() {
                Laya.timer.clearAll(this), this.speedToZ = 0, this.speedToY = 0, this.acceTimer = 0,
                this.deceTimer = 1, this.setParticleFxExplsion(!1), this.particleAccePlay(), this.changeData(),
                this.isJump = !1, this.isSpeedUp = !1, this.isRotate = !1, this.anim && (this.anim.speed = 1,
                this.anim.play("idle")), this.bike.transform.position = this.originPos.clone(),
                this.bike.transform.rotationEuler = new Laya.Vector3(), this.trail.active = !0,
                this.trail1.active = !0, this.fxExplsion.transform.localRotationEuler = new Laya.Vector3(0, 0, 0),
                this.isHit = !1;
            }, e.prototype.onAwake = function() {
                this.bike = this.owner, this.originPos = this.bike.transform.position.clone(), this.move = new Laya.Vector3();
                var t = this.owner.getChildByName("Effect");
                this.trail = t.getChildByName("FX_BikeTrails"), this.trail1 = t.getChildByName("FX_BikeTrails (1)"),
                this.fxExplsion = t.getChildByName("FX_Explsion"), this.setParticleFxExplsion(!1),
                this.particleAcce = t.getChildByName("FX_jiasu"), this.particleAcce1 = t.getChildByName("FX_jiasu_a"),
                this.particleAcce2 = t.getChildByName("FX_jiasu_b"), this.particleAcce3 = t.getChildByName("FX_jiasu_c"),
                this.setParticleAcce(0, !1), this.anim = this.owner.getChildByName("Role").getComponent(Laya.Animator),
                this.wheels = [];
                for (var e = 0; 4 > e; e++) this.wheels.push(this.owner.getChildByName("Role").getChildByName("Wheels_" + (e + 1)));
            }, e.prototype.wheelsRolling = function() {
                var t = this;
                a["default"].gameMgr.isMove && this.wheels.forEach(function(e) {
                    e.transform.rotate(t.rotateUnit);
                });
            }, e.prototype.particleAccePlay = function() {
                for (var t = 0; 2 > t; t++) {
                    var e = this.particleAcce.getChildAt(t).particleSystem;
                    e && e.play();
                }
            }, e.prototype.particleAcceStop = function() {
                for (var t = 0; 2 > t; t++) {
                    var e = this.particleAcce.getChildAt(t).particleSystem;
                    e && e.stop();
                }
            }, e.prototype.onUpdate = function() {
                !this.isHit && a["default"].gameMgr.isPlay && (this.moveUpdate(), this.wheelsRolling());
            }, e.prototype.moveUpdate = function() {
                0 != this.deceTimer && (this.deceTimer = 0, this.anim && (this.anim.play("start"),
                this.anim.crossFade("run", 1)), this.particleAccePlay()), this.acceTimer += Laya.timer.delta,
                this.speedToZ += this.Acc * (this.acceTimer / 1e3), this.speedToZ > this.maxSpeed && (this.speedToZ = this.maxSpeed),
                this.move.setValue(0, this.speedToY, this.speedToZ), this.bike.transform.translate(this.move, !1);
            }, e.prototype.setParticleFxExplsion = function(t) {
                var e = this.fxExplsion.getChildAt(0), i = e.particleSystem;
                i && (t ? (e.active = !0, i.looping = !1, i.play()) : (e.active = !1, i.stop()));
                for (var a = e.numChildren, n = 0; a > n; n++) {
                    var o = e.getChildAt(n).particleSystem;
                    o && (t ? o.play() : o.stop());
                }
            }, Object.defineProperty(e.prototype, "getBike", {
                get: function() {
                    return this.bike;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.getChild = function(t) {
                return this.bike.getChildByName(t);
            }, e.prototype.changeData = function() {
                this.rotateAngle = 0, this.anim && (this.anim.speed = 1), this.isRotate = !1;
            }, e.prototype.setParticleAcce = function(t, e) {
                if (e) switch (t) {
                  case 1:
                    var i = this.particleAcce1.getChildAt(0);
                    i && (i.active = !0, i.transform.localPosition = new Laya.Vector3(0, 1, 1.8), i.transform.localScale = new Laya.Vector3(1.5, 1.5, 2.6));
                    for (var a = 1; 4 > a; a++) {
                        var n = this.particleAcce1.getChildAt(a).particleSystem;
                        n && n.play();
                    }
                    break;

                  case 2:
                    var i = this.particleAcce2.getChildAt(0);
                    i && (i.active = !0, i.transform.localPosition = new Laya.Vector3(0, 1, 1.8), i.transform.localScale = new Laya.Vector3(1.5, 1.5, 2.6));
                    for (var a = 1; 7 > a; a++) {
                        var o = this.particleAcce2.getChildAt(a).particleSystem;
                        o && o.play();
                    }
                    break;

                  case 3:
                    var i = this.particleAcce3.getChildAt(0);
                    i && (i.active = !0, i.transform.localPosition = new Laya.Vector3(0, 1, 1.8), i.transform.localScale = new Laya.Vector3(1.5, 1.5, 2.6));
                    for (var a = 1; 9 > a; a++) {
                        var s = this.particleAcce3.getChildAt(a).particleSystem;
                        s && s.play();
                    }
                } else {
                    for (var a = 1; 4 > a; a++) {
                        var i = this.particleAcce1.getChildAt(0);
                        i && (i.active = !1);
                        var n = this.particleAcce1.getChildAt(a).particleSystem;
                        n && n.stop();
                    }
                    for (var a = 1; 7 > a; a++) {
                        var i = this.particleAcce2.getChildAt(0);
                        i && (i.active = !1);
                        var o = this.particleAcce2.getChildAt(a).particleSystem;
                        o && o.stop();
                    }
                    for (var a = 1; 9 > a; a++) {
                        var i = this.particleAcce3.getChildAt(0);
                        i && (i.active = !1);
                        var s = this.particleAcce3.getChildAt(a).particleSystem;
                        s && s.stop();
                    }
                }
            }, e.prototype.rotate = function() {
                if (a["default"].gameMgr.isPressed && this.isJump && this.canRotate) {
                    Laya.timer.clear(this, this.rotateSlowDown), this.rotateTimer += Laya.timer.delta,
                    this.isRotate = !0;
                    var t = this.bike.transform.rotationEuler;
                    t.x -= 6, this.bike.transform.rotationEuler = t, this.anim && (this.anim.speed = 1),
                    this.rotateAngle += 6, this.checkAngle();
                } else this.isRotate && (this.isRotate = !1, this.rotateSlow());
            }, e.prototype.rotateSlow = function() {
                this.rotateSlowTimer = 0, this.rotateTimer > 1e3 && (this.rotateTimer = 1e3), this.rotateTimer *= .5,
                Laya.timer.frameLoop(1, this, this.rotateSlowDown);
            }, e.prototype.rotateSlowDown = function() {
                this.rotateSlowTimer += Laya.timer.delta;
                var t = this.rotateSlowTimer / this.rotateTimer, e = 6 * (1 - t);
                this.anim && (this.anim.speed = .9 * (1 - t) + .1);
                var i = this.bike.transform.rotationEuler;
                i.x -= e, this.rotateAngle += e, this.checkAngle(), this.bike.transform.rotationEuler = i,
                t > 1 && (Laya.timer.clear(this, this.rotateSlowDown), this.rotateTimer = 0);
            }, e.prototype.checkAngle = function() {
                this.rotateAngle > 300 && this.rotateAngle < 660 && 0 == this.rotateStatus ? (this.anim && this.anim.play("turn02"),
                this.rotateStatus = 1) : this.rotateAngle > 660 && this.rotateAngle < 1020 && 1 == this.rotateStatus ? (this.anim && this.anim.play("turn03"),
                this.rotateStatus = 2) : this.rotateAngle > 1020 && 2 == this.rotateStatus && (this.rotateStatus = 3);
            }, e.prototype.jump = function(t, e) {
                void 0 === e && (e = !0), Laya.timer.clear(this, this.fallDown), this.rotateStatus = 0,
                this.changeData(), this.canRotate = e || this.speedLevel > 0, this.anim && this.anim.play("turn01"),
                this.trail.active = !1, this.trail1.active = !1, this.isJump = !0, this.originAngle = this.bike.transform.rotationEuler.x,
                this.speedToZ < .1 && (this.speedToZ = .1), this.speedToY = t * (this.speedToZ / this.maxSpeed) + this.speedLevel * this.factor_jump,
                this.slowTimer = 0, Laya.timer.frameLoop(1, this, this.slowDown);
            }, e.prototype.slowDown = function() {
                this.slowTimer += Laya.timer.delta, this.speedToY -= this.Acc * (this.slowTimer / 1e3),
                this.speedToY < 0 && (this.speedToY = 0, Laya.timer.clear(this, this.slowDown),
                this.fall());
            }, e.prototype.fall = function() {
                this.declineTimer = 0, Laya.timer.clear(this, this.fallDown), Laya.timer.frameLoop(1, this, this.fallDown);
            }, e.prototype.fallDown = function() {
                if (this.declineTimer += Laya.timer.delta, this.speedToY = this.G * this.declineTimer / 1e3,
                this.bike.transform.position.y < this.currentHeight) {
                    this.changeData(), Laya.timer.clear(this, this.rotateSlowDown), this.isJump = !1,
                    this.anim && (this.anim.speed = 1, this.anim.crossFade("hit_the_ground", .5)), this.trail.active = !0,
                    this.trail1.active = !0, this.speedToY = 0;
                    var t = this.bike.transform.position;
                    if (t.y = this.currentHeight, this.bike.transform.position = t, Laya.timer.clear(this, this.fallDown),
                    this.currentAngle = Math.abs(this.bike.transform.rotationEuler.x) % 360, this.currentAngle > 60 && this.currentAngle <= 300) return void this.crash(2, 1);
                    if (this.rotateStatus > 0) for (var e = 0; e < this.rotateStatus; e++) this.speedUp(); else this.anim && this.anim.crossFade("run", .5);
                    this.fixAngle();
                }
            }, e.prototype.fixAngle = function() {
                function t() {
                    e += Laya.timer.delta;
                    var s = e / (200 * i);
                    a.x = n + (o - n) * s, this.owner.transform.rotationEuler = a, s > 1 && (Laya.timer.clear(this, t),
                    this.owner.transform.rotationEuler = new Laya.Vector3(), this.isFixing = !1);
                }
                this.deceTimer = 0, this.isFixing = !0;
                var e = 0, i = this.speedToZ, a = this.bike.transform.rotationEuler, n = -a.x;
                n > 360 && (n %= 360);
                var o = n > 270 ? 360 : 0;
                Laya.timer.frameLoop(1, this, t);
            }, e.prototype["continue"] = function(t) {
                Laya.timer.clearAll(this), this.speedToZ = 0, this.speedToY = 0, this.acceTimer = 0,
                this.deceTimer = 1, this.setParticleFxExplsion(!1), this.particleAcceStop(), this.changeData(),
                this.isJump = !1, this.isSpeedUp = !1, this.isRotate = !1, this.anim && (this.anim.speed = 1,
                this.anim.play("idle"));
                var e = this.bike.transform.position;
                e.x = Math.floor(100 * Math.random() % 5) - 2, e.y = this.currentHeight, e.z = t,
                this.bike.transform.position = e, this.bike.transform.rotationEuler = new Laya.Vector3(),
                this.trail.active = !0, this.trail1.active = !0, this.isHit = !1;
            }, e.prototype.crash = function(t, e) {
                if (!this.isHit) {
                    Laya.Tween.clearAll(this.bike.transform.position);
                    var i = this.bike.transform.rotationEuler.x % 360;
                    1 == t && (a["default"].glEvent.event(n.EventType.HIT_CAR_EVENT), a["default"].glEvent.event(n.EventType.CIRCLE_COUNT_EVENT, {
                        circleNum: -1
                    })), 1 == e ? (this.fxExplsion.transform.localRotationEuler = new Laya.Vector3(180, 0, 0),
                    this.bike.transform.rotationEuler = new Laya.Vector3(200 - 40 * Math.random(), 0, 0)) : this.bike.transform.rotationEuler = new Laya.Vector3();
                    var o = this.bike.transform.position;
                    1 == e ? o.y = this.turnoverHeight : o.y = this.currentHeight, this.bike.transform.position = o,
                    a["default"].wxMgr.playVibrateShort(), this.anim && (i > -240 && -30 > i ? this.anim.play("die02") : this.anim.play("die01")),
                    this.setParticleFxExplsion(!0), this.particleAcceStop(), Laya.timer.clearAll(this),
                    this.changeData(), this.isHit = !0;
                }
            }, e.prototype.speedUp = function() {
                this.speedLevel >= 3 ? this.speedLevel = 3 : (this.speedLevel++, this.acceTimer = 0,
                this.isSpeedUp = !0, this.maxSpeed *= this.factor_speed, this.speedUpTotalTime = 1e3);
                var t = Math.ceil(100 * Math.random() % 3);
                this.anim && this.anim.crossFade("accelerate0" + t, .5), this.speedUpTimer = 0,
                Laya.timer.clear(this, this.speedProgress), Laya.timer.frameLoop(1, this, this.speedProgress);
            }, e.prototype.speedProgress = function() {
                this.speedUpTimer += Laya.timer.delta;
                var t = this.speedUpTimer / this.speedUpTotalTime;
                t > 1 && (this.isJump || this.anim && this.anim.crossFade("run", .5), this.speedLevel = 0,
                Laya.Tween.to(this, {
                    maxSpeed: this.originMaxSpeed
                }, 300), Laya.timer.clear(this, this.speedProgress), this.isSpeedUp = !1);
            }, e;
        }(Laya.Script3D);
        i["default"] = o;
    }, {
        "../LayaSample": 3,
        "../other/ConfigData": 16
    } ],
    6: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.cameraPos = new Laya.Vector3(-.6, 3.911, -5.6), e;
            }
            return __extends(e, t), e.prototype.init = function() {
                this.camera.transform.position = new Laya.Vector3(-2.2, 3, -4.3), this.camera.transform.rotationEuler = new Laya.Vector3(-18, -158.5, 0),
                this.moveRot = this.camera.transform.rotationEuler.clone(), this.offset.setValue(-2.2, 2.311, -5.3),
                this.setParticleSuDuXian(!1), this.camera.fieldOfView = 60;
            }, e.prototype.onAwake = function() {
                this.camera = this.owner, this.camera.transform.position = new Laya.Vector3(-2.2, 3, -4.3),
                this.camera.transform.rotationEuler = new Laya.Vector3(-18, -158.5, 0), this.offset = new Laya.Vector3(),
                this.movePos = new Laya.Vector3(0, 0, .1), this.moveRot = this.camera.transform.rotationEuler.clone();
                var t = Laya.stage.getChildAt(0);
                this.target = t.getChildByName("Role"), this.suDuXian = this.owner.getChildByName("eff_suduxian"),
                this.suDuXian.transform.localPosition = new Laya.Vector3(0, .2, -4.5), this.suDuXian.transform.localRotationEuler = new Laya.Vector3(-3, 180, 0),
                this.setParticleSuDuXian(!1), Laya.Vector3.subtract(this.camera.transform.position, this.target.transform.position, this.offset);
            }, e.prototype.onEnable = function() {
                a["default"].glEvent.on("cameraEffect", this, this.setParticleSuDuXian);
            }, e.prototype.onDisable = function() {
                a["default"].glEvent.off("cameraEffect", this, this.setParticleSuDuXian);
            }, e.prototype.onLateUpdate = function() {
                Laya.Vector3.add(this.offset, this.target.transform.position, this.movePos), Laya.Vector3.lerp(this.camera.transform.position, this.movePos, .23, this.movePos),
                this.camera.transform.position = this.movePos;
            }, e.prototype.startAnim = function() {
                var t = 800;
                Laya.Tween.to(this.offset, {
                    x: this.cameraPos.x,
                    y: this.cameraPos.y,
                    z: this.cameraPos.z
                }, t);
                var e = Laya.Tween.to(this.moveRot, {
                    x: -18,
                    y: -175,
                    z: 0
                }, t);
                e.update = new Laya.Handler(this, function() {
                    this.camera.transform.rotationEuler = this.moveRot;
                });
            }, e.prototype.changeRole = function(t) {
                a["default"].gameMgr.isPlay || (this.camera.transform.position = new Laya.Vector3(-2.2, 3, -4.3),
                this.camera.transform.rotationEuler = new Laya.Vector3(-18, -158.5, 0)), this.offset = new Laya.Vector3(),
                this.movePos = new Laya.Vector3(0, 0, .1), this.moveRot = this.camera.transform.rotationEuler.clone(),
                this.target = t, Laya.Vector3.subtract(this.camera.transform.position, this.target.transform.position, this.offset);
            }, e.prototype.setParticleSuDuXian = function(t) {
                var e = this.suDuXian.getChildAt(0), i = e.particleSystem;
                i && (t ? i.play() : i.stop());
                for (var a = e.numChildren, n = 0; a > n; n++) {
                    var o = e.getChildAt(n).particleSystem;
                    o && (t ? o.play() : o.stop());
                }
            }, e;
        }(Laya.Script3D);
        i["default"] = n;
    }, {
        "../LayaSample": 3
    } ],
    7: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = t("../comp/AiCar"), o = t("../comp/Accelerator"), s = t("../comp/Rail"), r = t("../comp/Player"), h = t("../comp/Slope"), l = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.jumpPlatforms = [], e.barriers = [], e.arrows = [], e.roads = [], e.bikeComps = [],
                e.offset = 0, e.constructsArray = [], e.loadEasyModels(), e.loadModels(), e.loadConstruct(),
                e;
            }
            return __extends(e, t), e.getUnitRoadLength = function() {
                return 26.999;
            }, e.prototype.init = function(t) {
                this.scene = t, this.bikeComp = t.getChildByName("Role").getComponent(r["default"]),
                this.bikeComps.push(this.bikeComp), this.bikeComps.push(t.getChildByName("AI").getComponent(n["default"])),
                this.bikeComps.push(t.getChildByName("AI_2").getComponent(n["default"])), a["default"].commonData.bikeComps = this.bikeComps;
                var e = Laya.loader.getRes(a["default"].commonData.models);
                this.model = e.getChildByName("Model"), this.slope_h = this.model.getChildByName("Ramp_Hig"),
                this.slope_m = this.model.getChildByName("Ramp_Mid"), this.slope_l = this.model.getChildByName("Ramp_Low"),
                this.slope_h_acce = this.model.getChildByName("Ramp_Hig_Acce"), this.slope_m_acce = this.model.getChildByName("Ramp_Mid_Acce"),
                this.slope_l_acce = this.model.getChildByName("Ramp_Low_Acce"), this.rail = this.model.getChildByName("Barrier"),
                this.railMat = this.model.getChildByName("Barrier"), this.arrow = this.model.getChildByName("AcceArrow"),
                this.setSkins();
            }, e.prototype.changeModelLight = function(t) {
                for (var e = this.model.numChildren, i = 0; e > i; i++) {
                    var a = this.model.getChildAt(i), n = a.meshRenderer.material;
                    n.albedoIntensity = t;
                }
            }, e.prototype.setSkins = function() {
                var t = Laya.loader.getRes(a["default"].commonData.skinList);
                t && (this.skins = t.getChildAt(0));
            }, e.prototype.createSlope = function(t, e) {
                var i = Laya.Pool.getItemByCreateFun(t, function() {
                    switch (t) {
                      case "jp_low":
                        return Laya.Sprite3D.instantiate(this.slope_l);

                      case "jp_mid":
                        return Laya.Sprite3D.instantiate(this.slope_m);

                      case "jp_hig":
                        return Laya.Sprite3D.instantiate(this.slope_h);

                      case "jp_low_acce":
                        return Laya.Sprite3D.instantiate(this.slope_l_acce);

                      case "jp_mid_acce":
                        return Laya.Sprite3D.instantiate(this.slope_m_acce);

                      case "jp_hig_acce":
                        return Laya.Sprite3D.instantiate(this.slope_h_acce);
                    }
                }, this);
                i.name = t, this.scene.addChild(i), i.transform.position = new Laya.Vector3(Number(e.x), Number(e.y), Number(e.z) + this.offset);
                var a = i.getComponent(h["default"]);
                a || (a = i.addComponent(h["default"])), a.init(t, this.bikeComps), this.jumpPlatforms.push(i);
            }, e.prototype.getMaterails = function(t, e) {
                for (var i = t.numChildren, a = 0; i > a; a++) {
                    var n = t.getChildAt(a);
                    e.push(n.meshRenderer.sharedMaterial);
                }
            }, e.prototype.createRail = function(t) {
                var e = this, i = Laya.Pool.getItemByCreateFun("barrier", function() {
                    return Laya.Sprite3D.instantiate(e.rail);
                }, this);
                this.scene.addChild(i), i.transform.position = new Laya.Vector3(Number(t.x), Number(t.y), Number(t.z) + this.offset);
                var a = i.getComponent(s["default"]);
                a || (a = i.addComponent(s["default"])), a.init(this.bikeComps), this.barriers.push(i);
            }, e.prototype.createRoad = function(t, e, i, a) {
                var n = Laya.Pool.getItemByCreateFun("road", function() {
                    return Laya.Sprite3D.instantiate(e);
                });
                this.scene.addChild(n);
                var o = e.transform.position.clone();
                n.transform.position = new Laya.Vector3(o.x, o.y, o.z + i * a), this.roads.push(n);
            }, e.prototype.createAcceArrow = function(t) {
                var e = Laya.Pool.getItemByCreateFun("arrow", function() {
                    return Laya.Sprite3D.instantiate(this.arrow);
                }, this);
                this.scene.addChild(e), e.transform.position = new Laya.Vector3(Number(t.x), Number(t.y), Number(t.z) + this.offset);
                var i = e.getComponent(o["default"]);
                i || (i = e.addComponent(o["default"])), i.init(this.bikeComps), this.arrows.push(e);
            }, e.prototype.recoverRoad = function() {
                for (var t = 0; t < this.roads.length; t++) {
                    var e = this.roads[t];
                    Laya.Pool.recover("road", e), this.scene.removeChild(e);
                }
            }, e.prototype.recoverAll = function() {
                this.recoverRoad(), this.clearConstructs(), this.recoverAllModels();
            }, e.prototype.recoverAllModels = function() {
                for (var t = 0; t < this.arrows.length; t++) {
                    var e = this.arrows[t];
                    Laya.Pool.recover("arrow", e), this.scene.removeChild(e);
                }
                for (var t = 0; t < this.barriers.length; t++) {
                    var e = this.barriers[t];
                    Laya.Pool.recover("barrier", e), this.scene.removeChild(e);
                }
                for (var t = 0; t < this.jumpPlatforms.length; t++) {
                    var e = this.jumpPlatforms[t];
                    Laya.Pool.recover(e.name, e), this.scene.removeChild(e);
                }
            }, e.prototype.random = function() {
                var t = Math.floor(1e3 * Math.random() % 13.45);
                return Math.random() > .5 ? t : -t;
            }, e.prototype.loadEasyModels = function() {
                Laya.loader.load("jsonConfig/EasyModelsConfig.json", Laya.Handler.create(this, function() {
                    this.easyModels = Laya.Loader.getRes("jsonConfig/EasyModelsConfig.json");
                }), null, Laya.Loader.JSON);
            }, e.prototype.loadConstruct = function() {
                Laya.loader.load("jsonConfig/ConstructConfig.json", Laya.Handler.create(this, function() {
                    this.constructions = Laya.Loader.getRes("jsonConfig/ConstructConfig.json");
                }), null, Laya.Loader.JSON);
            }, e.prototype.loadModels = function() {
                Laya.loader.load("jsonConfig/ModelsConfig.json", Laya.Handler.create(this, function() {
                    this.models = Laya.Loader.getRes("jsonConfig/ModelsConfig.json");
                }), null, Laya.Loader.JSON);
            }, e.prototype.createModels = function(t) {
                var i = this;
                this.offset = 0;
                for (var a = 0; 4 > a; a++) {
                    var n = this.easyModels[a];
                    this.offset += e.getUnitRoadLength() * (a + 1), n.models.forEach(function(t) {
                        i.createModel(t);
                    });
                }
            }, e.prototype.randomCreateEasyModels = function(t) {
                var e = this;
                this.offset = t;
                var i = Math.floor(100 * Math.random() % this.easyModels.length), a = this.models[i];
                a.models.forEach(function(t) {
                    e.createModel(t);
                });
            }, e.prototype.randomCreateModels = function(t) {
                var e = this;
                this.offset = t;
                var i = Math.floor(100 * Math.random() % this.models.length), a = this.models[i];
                a.models.forEach(function(t) {
                    e.createModel(t);
                });
            }, e.prototype.randomCreateConstructs = function(t) {
                var e = this;
                this.offset = t;
                var i = Math.floor(100 * Math.random() % this.constructions.length), a = this.constructions[i];
                a.models.forEach(function(t) {
                    e.createConstruct(t);
                });
            }, e.prototype.createModel = function(t) {
                switch (t.name) {
                  case "Ramp_Low":
                    this.createSlope("jp_low", t.position);
                    break;

                  case "Ramp_Mid":
                    this.createSlope("jp_mid", t.position);
                    break;

                  case "Ramp_Hig":
                    this.createSlope("jp_hig", t.position);
                    break;

                  case "Ramp_Low_Acce":
                    this.createSlope("jp_low_acce", t.position);
                    break;

                  case "Ramp_Mid_Acce":
                    this.createSlope("jp_mid_acce", t.position);
                    break;

                  case "Ramp_Hig_Acce":
                    this.createSlope("jp_hig_acce", t.position);
                    break;

                  case "Barrier":
                    this.createRail(t.position);
                    break;

                  case "AcceArrow":
                    this.createAcceArrow(t.position);
                }
            }, e.prototype.createConstruct = function(t) {}, e.prototype.clearConstructs = function() {
                this.constructsArray.forEach(function(t) {
                    t.destroy();
                }), this.constructsArray = [];
            }, e.prototype.getCarModel = function(t) {
                if (!(0 > t || t > 6)) {
                    var e = this.skins.getChildByName("RoleMatList"), i = this.skins.getChildByName("Model"), a = null, n = null;
                    if (0 == t || 1 == t || 2 == t) {
                        var o = i.getChildAt(0);
                        a = o.getChildAt(0).clone(), n = o.getChildAt(1).clone();
                    } else {
                        var o = i.getChildAt(t - 2);
                        a = o.getChildAt(0).clone(), n = o.getChildAt(1).clone();
                    }
                    for (var s = a, r = s.numChildren, h = 0; r > h; h++) a.getChildAt(h).meshRenderer.material = e.meshRenderer.materials[t];
                    return {
                        r: a,
                        e: n
                    };
                }
            }, e.prototype.getSkinByIndex = function(t) {
                if (!(0 > t || t > 6)) {
                    var e = this.skins.getChildByName("RoleList");
                    if (1 == t || 2 == t) var i = e.getChildAt(0).clone(); else var i = e.getChildAt(1).clone();
                    var a = this.getCarModel(t);
                    return i.addChild(a.r), i.addChild(a.e), a.r.transform.localPosition = new Laya.Vector3(0, -.689, 0),
                    a.e.transform.localPosition = new Laya.Vector3(0, 0, 0), i.transform.scale = new Laya.Vector3(.8, .8, .8),
                    i;
                }
            }, e.prototype.changeCar = function(t) {
                this.bikeComps.length > 2 && this.bikeComps.splice(this.bikeComps.indexOf(this.bikeComp), 1),
                this.bikeComp = t, this.bikeComps.push(t);
            }, e;
        }(Laya.Script3D);
        i["default"] = l;
        (function() {
            function t() {}
            return t;
        })(), function() {
            function t() {}
            return t;
        }(), function() {
            function t() {}
            return t;
        }();
    }, {
        "../LayaSample": 3,
        "../comp/Accelerator": 4,
        "../comp/AiCar": 5,
        "../comp/Player": 8,
        "../comp/Rail": 9,
        "../comp/Slope": 10
    } ],
    8: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = t("../manager/SoundMgr"), o = t("../other/ConfigData"), s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.originMaxSpeed = .7, e.maxSpeed = .7, e.factor_speed = 1.3, e.factor_jump = .1,
                e.G = -.25, e.Acc = .02, e.acceTimer = 0, e.deceTimer = 1, e.speedToZ = 0, e.speedToY = 0,
                e.carWidth = .54, e.currentHeight = .689, e.turnoverHeight = .3, e.rotateUnit = new Laya.Vector3(1, 0, 0),
                e.isDie = !1, e.isPlay = !1, e.rotateTimer = 0, e.rotateAngle = 0, e.rotateStatus = 0,
                e.cheerCount = 0, e.originAngle = 0, e.isSpeedUp = !1, e.speedLevel = 0, e;
            }
            return __extends(e, t), e.prototype.init = function() {
                Laya.timer.clearAll(this), this.speedToZ = 0, this.speedToY = 0, this.acceTimer = 0,
                this.deceTimer = 1, this.maxSpeed = .7, this.isDie = !1, this.isPlay = !1, this.setParticleFxExplsion(!1),
                this.particleAccePlay(), this.changeData(), this.isJump = !1, this.isSpeedUp = !1,
                this.isRotate = !1, this.anim && (this.anim.speed = 1, this.anim.play("idle")),
                this.bike.transform.position = this.originPos.clone(), this.bike.transform.rotationEuler = new Laya.Vector3(),
                this.trail.active = !0, this.trail1.active = !0, this.fxExplsion.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
            }, e.prototype.onAwake = function() {
                this.bike = this.owner, this.originPos = this.bike.transform.position.clone(), this.move = new Laya.Vector3();
                var t = this.owner.getChildByName("Effect");
                this.trail = t.getChildByName("FX_BikeTrails"), this.trail1 = t.getChildByName("FX_BikeTrails (1)"),
                this.fxExplsion = t.getChildByName("FX_Explsion"), this.setParticleFxExplsion(!1),
                this.particleAcce = t.getChildByName("FX_jiasu"), this.particleAcce1 = t.getChildByName("FX_jiasu_a"),
                this.particleAcce2 = t.getChildByName("FX_jiasu_b"), this.particleAcce3 = t.getChildByName("FX_jiasu_c"),
                this.setParticleAcce(0, !1), this.anim = this.owner.getChildByName("Role").getComponent(Laya.Animator),
                this.wheels = [];
                for (var e = 0; 4 > e; e++) this.wheels.push(this.owner.getChildByName("Role").getChildByName("Wheels_" + (e + 1)));
            }, e.prototype.changeData = function() {
                this.rotateAngle = 0, this.anim && (this.anim.speed = 1), this.isRotate = !1;
            }, e.prototype["continue"] = function() {
                Laya.timer.clearAll(this), this.speedToZ = 0, this.speedToY = 0, this.acceTimer = 0,
                this.deceTimer = 1, this.isDie = !1, this.isPlay = !1, this.setParticleFxExplsion(!1),
                this.particleAcceStop(), this.changeData(), this.isJump = !1, this.isSpeedUp = !1,
                this.isRotate = !1, this.anim && (this.anim.speed = 1, this.anim.play("idle"));
                var t = this.bike.transform.position;
                t.x = 0, t.y = 1, this.bike.transform.position = t, this.bike.transform.rotationEuler = new Laya.Vector3(),
                this.trail.active = !0, this.trail1.active = !0;
            }, e.prototype.wheelsRolling = function() {
                var t = this;
                a["default"].gameMgr.isMove && this.wheels.forEach(function(e) {
                    e.transform.rotate(t.rotateUnit);
                });
            }, e.prototype.particleAccePlay = function() {
                if (!this.isDie) for (var t = 0; 2 > t; t++) {
                    var e = this.particleAcce.getChildAt(t).particleSystem;
                    e && e.play();
                }
            }, e.prototype.particleAcceStop = function() {
                for (var t = 0; 2 > t; t++) {
                    var e = this.particleAcce.getChildAt(t).particleSystem;
                    e && e.stop();
                }
            }, e.prototype.particleAcceEffect = function() {
                a["default"].gameMgr.isPressed ? this.isPlay || (this.particleAccePlay(), this.isPlay = !0) : this.isPlay && (this.particleAcceStop(),
                this.isPlay = !1);
            }, e.prototype.onUpdate = function() {
                !a["default"].gameMgr.isOver && a["default"].gameMgr.isPlay && (this.moveUpdate(),
                this.rotate(), this.otherCar(), this.wheelsRolling(), this.particleAcceEffect());
            }, e.prototype.moveUpdate = function() {
                a["default"].gameMgr.isPressed || this.isSpeedUp ? (0 != this.deceTimer && (this.deceTimer = 0,
                this.anim && (this.anim.play("start"), this.anim.crossFade("run", 1)), a["default"].soundMgr.play(n.SoundType.RIDE)),
                this.acceTimer += Laya.timer.delta, this.speedToZ += this.Acc * (this.acceTimer / 1e3),
                this.speedToZ > this.maxSpeed && (this.speedToZ = this.maxSpeed)) : this.speedToZ > 0 && !this.isJump && (0 != this.acceTimer && (this.acceTimer = 0),
                this.deceTimer += Laya.timer.delta, this.speedToZ -= this.Acc * (this.deceTimer / 1e3),
                this.speedToZ < 0 && (this.speedToZ = 0, this.setParticleAcce(this.speedLevel, !1),
                this.anim && this.anim.play("end"), a["default"].soundMgr.stop(n.SoundType.RIDE))),
                a["default"].glEvent.event(o.EventType.UPDATE_SPEED_EVENT, {
                    speed: this.speedToZ,
                    maxSpeed: this.maxSpeed,
                    level: this.speedLevel
                }), this.move.setValue(0, this.speedToY, this.speedToZ), this.bike.transform.translate(this.move, !1);
            }, e.prototype.setParticleFxExplsion = function(t) {
                var e = this.fxExplsion.getChildAt(0), i = e.particleSystem;
                i && (t ? (e.active = !0, i.looping = !1, i.play()) : (e.active = !1, i.stop()));
                for (var a = e.numChildren, n = 0; a > n; n++) {
                    var o = e.getChildAt(n).particleSystem;
                    o && (t ? o.play() : o.stop());
                }
            }, e.prototype.otherCar = function() {
                var t = this, e = a["default"].commonData.bikeComps, i = new Laya.Vector3(), n = 0;
                e.forEach(function(e) {
                    -1 == e.owner.name.indexOf("Role") && (Laya.Vector3.subtract(e.owner.transform.position, t.bike.transform.position, i),
                    n = Laya.Vector3.scalarLength(i), 1 > n && e.crash(1, 0), e.owner.transform.position.z - t.bike.transform.position.z > 120 ? e["continue"](t.bike.transform.position.z - 50) : t.bike.transform.position.z - e.owner.transform.position.z > 120 ? e["continue"](t.bike.transform.position.z + 80) : e.isHit && t.bike.transform.position.z - e.owner.transform.position.z > 50 && e["continue"](t.bike.transform.position.z + 80));
                });
            }, e.prototype.setParticleAcce = function(t, e) {
                if (e) switch (t) {
                  case 1:
                    var i = this.particleAcce1.getChildAt(0);
                    i && (i.active = !0, i.transform.localPosition = new Laya.Vector3(0, 1, 1.8), i.transform.localScale = new Laya.Vector3(1.5, 1.5, 2.6));
                    for (var a = 1; 4 > a; a++) {
                        var n = this.particleAcce1.getChildAt(a).particleSystem;
                        n && n.play();
                    }
                    break;

                  case 2:
                    var i = this.particleAcce2.getChildAt(0);
                    i && (i.active = !0, i.transform.localPosition = new Laya.Vector3(0, 1, 1.8), i.transform.localScale = new Laya.Vector3(1.5, 1.5, 2.6));
                    for (var a = 1; 7 > a; a++) {
                        var o = this.particleAcce2.getChildAt(a).particleSystem;
                        o && o.play();
                    }
                    break;

                  case 3:
                    var i = this.particleAcce3.getChildAt(0);
                    i && (i.active = !0, i.transform.localPosition = new Laya.Vector3(0, 1, 1.8), i.transform.localScale = new Laya.Vector3(1.5, 1.5, 2.6));
                    for (var a = 1; 9 > a; a++) {
                        var s = this.particleAcce3.getChildAt(a).particleSystem;
                        s && s.play();
                    }
                } else {
                    for (var a = 1; 4 > a; a++) {
                        var i = this.particleAcce1.getChildAt(0);
                        i && (i.active = !1);
                        var n = this.particleAcce1.getChildAt(a).particleSystem;
                        n && n.stop();
                    }
                    for (var a = 1; 7 > a; a++) {
                        var i = this.particleAcce2.getChildAt(0);
                        i && (i.active = !1);
                        var o = this.particleAcce2.getChildAt(a).particleSystem;
                        o && o.stop();
                    }
                    for (var a = 1; 9 > a; a++) {
                        var i = this.particleAcce3.getChildAt(0);
                        i && (i.active = !1);
                        var s = this.particleAcce3.getChildAt(a).particleSystem;
                        s && s.stop();
                    }
                }
            }, e.prototype.rotate = function() {
                if (a["default"].gameMgr.isPressed && this.isJump && this.canRotate) {
                    Laya.timer.clear(this, this.rotateSlowDown), this.rotateTimer += Laya.timer.delta,
                    this.isRotate = !0;
                    var t = this.bike.transform.rotationEuler;
                    t.x -= 6, this.bike.transform.rotationEuler = t, this.anim && (this.anim.speed = 1),
                    this.rotateAngle += 6, this.checkPlayerAngle();
                } else this.isRotate && (this.isRotate = !1, this.rotateToSlow());
            }, e.prototype.rotateToSlow = function() {
                this.rotateSlowTimer = 0, this.rotateTimer > 1e3 && (this.rotateTimer = 1e3), this.rotateTimer *= .5,
                Laya.timer.frameLoop(1, this, this.rotateSlowDown);
            }, e.prototype.rotateSlowDown = function() {
                this.rotateSlowTimer += Laya.timer.delta;
                var t = this.rotateSlowTimer / this.rotateTimer, e = 6 * (1 - t);
                this.anim && (this.anim.speed = .9 * (1 - t) + .1);
                var i = this.bike.transform.rotationEuler;
                i.x -= e, this.rotateAngle += e, this.checkPlayerAngle(), this.bike.transform.rotationEuler = i,
                t > 1 && (Laya.timer.clear(this, this.rotateSlowDown), this.rotateTimer = 0);
            }, e.prototype.checkPlayerAngle = function() {
                this.rotateAngle > 300 && this.rotateAngle < 660 && 0 == this.rotateStatus ? (this.anim && this.anim.play("turn02"),
                this.rotateStatus = 1, a["default"].glEvent.event(o.EventType.CIRCLE_COUNT_EVENT, {
                    circleNum: this.rotateStatus
                }), a["default"].commonData.needShowGuide && (this.canRotate = !1), this.playSound()) : this.rotateAngle > 660 && this.rotateAngle < 1020 && 1 == this.rotateStatus ? (this.rotateStatus = 2,
                a["default"].glEvent.event(o.EventType.CIRCLE_COUNT_EVENT, {
                    circleNum: this.rotateStatus
                }), this.playSound()) : this.rotateAngle > 1020 && this.rotateAngle < 1380 && 2 == this.rotateStatus ? (this.rotateStatus = 3,
                a["default"].glEvent.event(o.EventType.CIRCLE_COUNT_EVENT, {
                    circleNum: this.rotateStatus
                }), this.playSound()) : this.rotateAngle > 1380 && 3 == this.rotateStatus && (this.rotateStatus = 4,
                a["default"].glEvent.event(o.EventType.CIRCLE_COUNT_EVENT, {
                    circleNum: this.rotateStatus
                }), this.playSound());
            }, e.prototype.playSound = function() {
                function t() {
                    e += Laya.timer.delta, e > 2e3 && (Laya.timer.clear(this, t), this.cheerCount = 0);
                }
                this.cheerCount++, this.cheerCount > 5 && (this.cheerCount = 5), a["default"].soundMgr.play(n.SoundType.CHEER),
                Laya.timer.clear(this, t);
                var e = 0;
                Laya.timer.frameLoop(1, this, t);
            }, e.prototype.jump = function(t, e) {
                void 0 === e && (e = !0), a["default"].soundMgr.stop(n.SoundType.RIDE), a["default"].soundMgr.play(n.SoundType.JUMP),
                Laya.timer.clear(this, this.fallDown), this.rotateStatus = 0, this.changeData(),
                this.canRotate = e || this.speedLevel > 0, this.anim && this.anim.play("turn01"),
                this.setParticleAcce(this.speedLevel, !1), this.trail.active = !1, this.trail1.active = !1,
                this.isJump = !0, this.originAngle = this.bike.transform.rotationEuler.x, this.speedToZ < .1 && (this.speedToZ = .1),
                this.speedToY = t * (this.speedToZ / this.maxSpeed) + this.speedLevel * this.factor_jump,
                this.slowTimer = 0, Laya.timer.frameLoop(1, this, this.slowDown);
            }, e.prototype.slowDown = function() {
                this.slowTimer += Laya.timer.delta, this.speedToY -= this.Acc * (this.slowTimer / 1e3),
                this.speedToY < 0 && (this.speedToY = 0, Laya.timer.clear(this, this.slowDown),
                this.fall());
            }, e.prototype.fall = function() {
                this.declineTimer = 0, Laya.timer.clear(this, this.fallDown), Laya.timer.frameLoop(1, this, this.fallDown);
            }, e.prototype.fallDown = function() {
                if (this.declineTimer += Laya.timer.delta, this.speedToY = this.G * this.declineTimer / 1e3,
                this.bike.transform.position.y < this.currentHeight) {
                    a["default"].soundMgr.play(n.SoundType.GROUND), a["default"].soundMgr.play(n.SoundType.RIDE),
                    a["default"].wxMgr.playVibrateShort(), a["default"].glEvent.event(o.EventType.CIRCLE_COUNT_EVENT, {
                        circleNum: 0
                    }), this.changeData(), Laya.timer.clear(this, this.rotateSlowDown), this.isJump = !1,
                    this.anim && (this.anim.speed = 1, this.anim.crossFade("hit_the_ground", .5)), this.trail.active = !0,
                    this.trail1.active = !0, this.speedToY = 0;
                    var t = this.bike.transform.position;
                    if (t.y = this.currentHeight, this.bike.transform.position = t, Laya.timer.clear(this, this.fallDown),
                    this.currentAngle = Math.abs(this.bike.transform.rotationEuler.x) % 360, this.currentAngle > 70 && this.currentAngle <= 300) return this.currentAngle < 90 || this.currentAngle > 270 ? void this.crash() : void this.crash(1);
                    if (this.rotateStatus > 0) for (var e = 0; e < this.rotateStatus; e++) this.speedUp(); else this.anim && this.anim.crossFade("run", .5);
                    this.changeAngle();
                }
            }, e.prototype.changeAngle = function() {
                function t() {
                    e += Laya.timer.delta;
                    var s = e / (200 * i);
                    a.x = n + (o - n) * s, this.owner.transform.rotationEuler = a, s > 1 && (Laya.timer.clear(this, t),
                    this.owner.transform.rotationEuler = new Laya.Vector3(), this.isFixing = !1);
                }
                this.deceTimer = 0, this.isFixing = !0;
                var e = 0, i = this.speedToZ, a = this.bike.transform.rotationEuler, n = -a.x;
                n > 360 && (n %= 360);
                var o = n > 270 ? 360 : 0;
                Laya.timer.frameLoop(1, this, t);
            }, e.prototype.crash = function(t) {
                a["default"].soundMgr.stop(n.SoundType.RIDE), a["default"].soundMgr.play(n.SoundType.HIT),
                a["default"].wxMgr.playVibrateLong();
                var e = this.bike.transform.rotationEuler.x % 360;
                1 == t ? (this.fxExplsion.transform.localRotationEuler = new Laya.Vector3(180, 0, 0),
                this.bike.transform.rotationEuler = new Laya.Vector3(200 - 40 * Math.random(), 0, 0)) : this.bike.transform.rotationEuler = new Laya.Vector3();
                var i = this.bike.transform.position;
                1 == t ? i.y = this.turnoverHeight : i.y = this.currentHeight, this.bike.transform.position = i,
                this.anim && (e > -240 && -30 > e ? this.anim.play("die02") : this.anim.play("die01")),
                this.setParticleAcce(0, !1), a["default"].glEvent.event("cameraEffect", !1), a["default"].glEvent.event(o.EventType.CIRCLE_COUNT_EVENT, {
                    circleNum: 0
                }), this.setParticleFxExplsion(!0), this.isDie = !0, this.isPlay = !1, this.particleAcceStop(),
                Laya.timer.clearAll(this), this.changeData(), a["default"].glEvent.event(o.EventType.OVER_GAME_EVENT);
            }, e.prototype.speedUp = function() {
                a["default"].wxMgr.playVibrateShort(), this.speedLevel >= 3 ? this.speedLevel = 3 : (this.speedLevel++,
                this.acceTimer = 0, this.isSpeedUp = !0, this.maxSpeed *= this.factor_speed, this.speedUpTotalTime = 1e3);
                var t = Math.ceil(100 * Math.random() % 3);
                this.anim && this.anim.crossFade("accelerate0" + t, .5), this.speedUpTimer = 0,
                Laya.timer.clear(this, this.speedProgress), Laya.timer.frameLoop(1, this, this.speedProgress),
                this.setParticleAcce(0, !1), this.setParticleAcce(this.speedLevel, !0), a["default"].wxMgr.playVibrateShort(),
                a["default"].glEvent.event("cameraEffect", !0);
                var e = 1 == this.speedLevel ? n.SoundType.SPEED_UP_1 : 2 == this.speedLevel ? n.SoundType.SPEED_UP_2 : n.SoundType.SPEED_UP_3;
                a["default"].soundMgr.play(e);
            }, e.prototype.speedProgress = function() {
                this.speedUpTimer += Laya.timer.delta;
                var t = this.speedUpTimer / this.speedUpTotalTime;
                a["default"].glEvent.event(o.EventType.SPEED_UP_EVENT, {
                    progress: t,
                    level: this.speedLevel
                }), t > 1 && (this.isJump || this.anim && this.anim.crossFade("run", .5), this.setParticleAcce(0, !1),
                a["default"].glEvent.event("cameraEffect", !1), a["default"].glEvent.event(o.EventType.SPEED_UP_EVENT, {
                    progress: 1,
                    level: 0
                }), this.speedLevel = 0, Laya.Tween.to(this, {
                    maxSpeed: this.originMaxSpeed
                }, 300), Laya.timer.clear(this, this.speedProgress), this.isSpeedUp = !1);
            }, Object.defineProperty(e.prototype, "getBike", {
                get: function() {
                    return this.bike;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.getChild = function(t) {
                return this.bike.getChildByName(t);
            }, e;
        }(Laya.Script3D);
        i["default"] = s;
    }, {
        "../LayaSample": 3,
        "../manager/SoundMgr": 13,
        "../other/ConfigData": 16
    } ],
    9: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.isHits = [], e.checkOnce = [], e.toLeft = [], e;
            }
            return __extends(e, t), e.prototype.init = function(t) {
                this.width = .75, this.height = .7, this.distance = .7, this.width_limit = this.width + .2,
                this.distance += 1.5, this.targets = t, this.checkOnce = [], this.isHits = [], this.toLeft = [];
                for (var e = 0; e < this.targets.length; e++) this.checkOnce.push(!0), this.isHits.push(!1),
                this.toLeft.push(!1);
            }, e.prototype.onUpdate = function() {
                if (!a["default"].gameMgr.isOver) for (var t = 0; t < this.targets.length; t++) {
                    var e = this.targets[t], i = e.getChild("TargetPos").transform.position, n = e.carWidth, o = this.owner, s = o.transform.position;
                    e && e.getBike.transform.position.y < this.height + .7 && i.z < s.z + this.distance ? i.z > s.z && (this.checkOnce[t] && (this.checkOnce[t] = !1,
                    this.isHits[t] = i.x - n / 2 > s.x - this.width && i.x - n / 2 < s.x + this.width || i.x + n / 2 < s.x + this.width && i.x + n / 2 > s.x - this.width || i.x + n / 2 > s.x + this.width && i.x - n / 2 < s.x - this.width || i.x + n / 2 < s.x + this.width && i.x - n / 2 > s.x - this.width,
                    i.x + n / 2 < s.x + this.width, this.toLeft[t] = i.x < s.x - this.width, this.isHits[t] && e.crash()),
                    -1 != e.owner.name.indexOf("Role") && i.z > s.z + 1e3 && (Laya.Pool.recover("barrier", this.owner),
                    this.owner.parent.removeChild(this.owner))) : this.checkOnce[t] || (this.checkOnce[t] = !0,
                    this.isHits[t] = !1, this.toLeft[t] = !1);
                }
            }, e;
        }(Laya.Script3D);
        i["default"] = n;
    }, {
        "../LayaSample": 3
    } ],
    10: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = t("../manager/SoundMgr"), o = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.width = 1, e.firstChecks = [], e.jumping = [], e.toLeft = [], e.jumped = [],
                e;
            }
            return __extends(e, t), e.prototype.init = function(t, e) {
                switch (this.canRotate = !0, this.type = t, t) {
                  case "jp_low":
                    this.height = .8, this.distance = 3, this.angle_max = -15, this.canRotate = !1,
                    this.jump_strength = .03;
                    break;

                  case "jp_mid":
                    this.height = 1.3, this.distance = 2.8, this.angle_max = -25, this.jump_strength = .1;
                    break;

                  case "jp_hig":
                    this.height = 1.7, this.distance = 2.5, this.angle_max = -35, this.jump_strength = .15;
                    break;

                  case "jp_low_acce":
                    this.height = .8, this.distance = 3, this.angle_max = -15, this.canAcce = !0, this.jump_strength = .15;
                    break;

                  case "jp_mid_acce":
                    this.height = 1.3, this.distance = 2.8, this.angle_max = -25, this.canAcce = !0,
                    this.jump_strength = .25;
                    break;

                  case "jp_hig_acce":
                    this.height = 1.7, this.distance = 2.5, this.angle_max = -35, this.canAcce = !0,
                    this.jump_strength = .7;
                }
                this.targets = e, this.firstChecks = [], this.jumping = [], this.jumped = [], this.toLeft = [];
                for (var i = 0; i < this.targets.length; i++) this.firstChecks.push(!0), this.jumping.push(!1),
                this.jumped.push(!1), this.toLeft.push(!1);
                this.width_limit = this.width + .2, this.distance += 1.5;
            }, e.prototype.onUpdate = function() {
                if (!a["default"].gameMgr.isOver) for (var t = 0; t < this.targets.length; t++) {
                    var e = this.targets[t], i = e.getChild("TargetPos").transform.position, o = this.owner, s = o.transform.position, r = e.carWidth;
                    if (e && (this.jumping[t] && !e.isJump || e.getBike.transform.position.y < this.height + 1.9) && i.z < s.z + this.distance + 1) {
                        if (i.z > s.z) {
                            if ((!this.jumping[t] || e.isJump) && e.getBike.transform.position.y > .69 * (i.z - s.z)) return;
                            if (this.firstChecks[t]) this.firstChecks[t] = !1, this.jumping[t] = i.x - r / 2 > s.x - this.width && i.x - r / 2 < s.x + this.width || i.x + r / 2 < s.x + this.width && i.x + r / 2 > s.x - this.width || i.x + r / 2 > s.x + this.width && i.x - r / 2 < s.x - this.width || i.x + r / 2 < s.x + this.width && i.x - r / 2 > s.x - this.width,
                            this.toLeft[t] = i.x < s.x - this.width, this.jumping[t] && this.canAcce && e.speedUp(); else if (this.jumping[t] && i.z < s.z + this.distance - 1) {
                                var h = e.getBike.transform.position.clone();
                                h.y = .69 * (i.z - s.z);
                                var l = e.getBike.transform.rotationEuler.clone();
                                l.x = -7.14 * (i.z - s.z), l.x < this.angle_max && (l.x = this.angle_max), e.getBike.transform.position = h,
                                e.getBike.transform.rotationEuler = l;
                            } else !this.jumping[t] && i.z < s.z + this.distance || this.jumping[t] && !this.jumped[t] && i.z < s.z + this.distance + 1 && (this.jumped[t] = !0,
                            e.jump(this.jump_strength, this.canRotate), "Role" == e.owner.name && a["default"].soundMgr.play(n.SoundType.RUSH));
                            -1 != e.owner.name.indexOf("Role") && i.z > s.z + 1e3 && (Laya.Pool.recover(this.type, this.owner),
                            this.owner.parent.removeChild(this.owner));
                        }
                    } else this.firstChecks[t] || (this.firstChecks[t] = !0, this.jumping[t] = !1, this.toLeft[t] = !1,
                    this.jumped[t] = !1);
                }
            }, e;
        }(Laya.Script3D);
        i["default"] = o;
    }, {
        "../LayaSample": 3,
        "../manager/SoundMgr": 13
    } ],
    11: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function t() {
                this._isPlay = !1, this._isPause = !1, this._isOver = !1, this._isPressed = !1;
            }
            return Object.defineProperty(t.prototype, "isPlay", {
                get: function() {
                    return this._isPlay;
                },
                set: function(t) {
                    this._isPlay = t;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isPressed", {
                get: function() {
                    return this._isPressed;
                },
                set: function(t) {
                    this._isPressed = t;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isMove", {
                get: function() {
                    return this._isMove;
                },
                set: function(t) {
                    this._isMove = t;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isOver", {
                get: function() {
                    return this._isOver;
                },
                set: function(t) {
                    this._isOver = t;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isPause", {
                get: function() {
                    return this._isPause;
                },
                set: function(t) {
                    this._isPause = t, Laya.timer.scale = t ? 0 : 1;
                },
                enumerable: !0,
                configurable: !0
            }), t;
        }();
        i["default"] = a;
        var n;
        !function(t) {
            t.Login = "views/login.scene", t.Game = "views/game.scene", t.Home = "views/home.scene",
            t.Over = "views/over.scene", t.Clearing = "views/clearing.scene", t.Rank = "views/rank.scene",
            t.Collect = "views/collect.scene", t.Skin = "views/freeSkin.scene", t.Converge = "views/ConvergeAd.scene";
        }(n = i.SceneType || (i.SceneType = {}));
    }, {} ],
    12: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = t("./StatisticsMgr"), o = function() {
            function t() {
                this.isTokenActive = !1, this._connectCount = 0;
            }
            return t.prototype.request = function(e, i, a) {
                // var n = this;
                // if (e == t.apiAd) console.log("allAds..."); else if (e == t.apiLogin) console.log("login..."); else {
                //     if (!this.isTokenActive || !t.sessionId) return console.error("Token is null or token inactive. Request api" + e),
                //     void this.reconnect();
                //     i.sessionId = t.sessionId, console.log("token...");
                // }
                // var o = function(t) {
                //     t && (t.data || (t = JSON.parse(t)), t.data && (t = JSON.parse(t.data)), n.connected(t.sessionId)),
                //     a && (console.log("url:" + h + " res:" + JSON.stringify(t)), a(t)), a = null;
                // }, s = function(t) {
                //     console.error("HTTP error：", t), n.reconnect();
                // }, r = new Laya.HttpRequest();
                // r.once(Laya.Event.COMPLETE, this, o), r.once(Laya.Event.ERROR, this, s), r.on(Laya.Event.PROGRESS, this, this.progressHandler);
                // var h = t.host + e, l = JSON.stringify(this.setParmData(i));
                // console.log("HTTP request:", h, JSON.stringify(l)), t.encryptDES && window.strEnc && (l = window.strEnc(l, t.encryptDESKey1, t.encryptDESKey2, t.encryptDESKey3)),
                // r.send(h, "param=" + encodeURIComponent(l), "post", "json", [ "Content-Type", "application/x-www-form-urlencoded" ]);
            }, t.prototype.urlEncode = function(t) {
                if (null == t) return "";
                var e = "", i = new Array();
                for (var a in t) i.push(a);
                i = i.sort();
                for (var n = 0, o = i.length; o > n; ++n) e += i[n] + "=" + encodeURIComponent(t[i[n]]),
                n != o - 1 && (e += "&");
                return e;
            }, t.prototype.setParmData = function(e) {
                t.sessionId && (e.sessionId = t.sessionId);
                var i = "", a = new Array();
                for (var n in e) a.push(n);
                a = a.sort();
                for (var o = 0; o < a.length; o++) i += encodeURIComponent(e[a[o]]);
                return e;
            }, t.prototype.errorHandler = function(t) {
                console.error("HTTP error：", t), this.reconnect();
            }, t.prototype.progressHandler = function(t) {}, t.prototype.connected = function(e) {
                this._requData = null, this._connectCount = 0, e && (t.sessionId = e), this.isTokenActive = !0;
            }, t.prototype.unconnect = function() {
                this.isTokenActive = !1;
            }, t.prototype.reconnect = function() {
                console.log("reconnect...");
                var t = this;
                t._connectCount += 1, t._connectCount < 3 ? (console.error("net error，try to connect " + t._connectCount + " time"),
                setTimeout(function(t) {
                    a["default"].wxMgr.login();
                }, 1e3 * t._connectCount)) : t._connectCount = 0;
            }, t.prototype.requestStatistics = function(e) {
                // var i = e.meth || "post", a = e.data || {};
                // e.url = e.url || "";
                // var n = t.statisticsUrl + e.url, o = function(t) {
                //     e.callback && e.callback(t);
                // }, s = function(t) {
                //     a.fail && a.fail(t);
                // };
                // t.sessionId;
                // var r = new Laya.HttpRequest();
                // r.once(Laya.Event.COMPLETE, this, o), r.once(Laya.Event.ERROR, this, s);
                // var h = JSON.stringify(a);
                // console.log("datastr", h), r.send(n, "param=" + h, i, "json", [ "Content-Type", "application/x-www-form-urlencoded" ]);
            }, t.prototype.navigateToMiniProgram = function(t) {
                t && t.to_appid && Laya.Browser.onMiniGame && (n["default"].instance.navigateToMiniProgramStatistics(t),
                window.wx.navigateToMiniProgram({
                    appId: t.to_appid,
                    path: t.toLinks,
                    extraData: {
                        foo: "bar"
                    },
                    complete: function(e) {
                        t.complete && t.complete(), t.complete = null;
                    },
                    fail: function(e) {
                        window.wx.showToast({
                            title: "跳转失败"
                        }), t.fail && t.fail(), t.fail = null;
                    },
                    success: function(e) {
                        n["default"].instance.navigateToMiniProgramBackStatistics(t), t.callback && t.callback("success"),
                        t.callback = null;
                    }
                }));
            }, t.deviceType = "wxapp", t.apiLogin = "userLogin.action", t.apiAd = "",
            t.host = "", t.statisticsUrl = "",
            t.apiKey = "", t.apiSecret = "", t.version = 127, t.encryptDESKey1 = "qire1", t.encryptDESKey2 = "qire2",
            t.encryptDESKey3 = "qire3", t.encryptDES = !0, t.sessionId = "", t.ctrlInfo = {},
            t.bannerAdIds = [ "" ], t.rewardedAdIds = [ "" ], t.innerADIds = [ "" ], t.wudian_level = [ 1, 1, 1, 1 ],
            t.systemInfo = {}, t.aladingStatus = 1, t.code = "", t.isNew = !1, t.openId = "",
            t.allAdsControl = [], t;
        }();
        i["default"] = o;
    }, {
        "../LayaSample": 3,
        "./StatisticsMgr": 14
    } ],
    13: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = function() {
            function t() {
                this.isPlayingBGM = !1, this.isPlayingRide = !1, this._pathRoot = "res/sound/",
                this._soundCtx = {}, this._soundFile = [];
                for (var t in o) {
                    var e = o[t];
                    this._soundFile.push(e);
                }
            }
            return t.prototype.init = function() {
                for (var t = this._pathRoot, e = "", i = this._soundFile, a = this._soundFile.length, n = 0; a > n; ++n) {
                    e = i[n];
                    var o = new Laya.SoundChannel();
                    o.url = t + e + ".mp3", ("ride" == e || "bgm" == e) && (o.loops = 0), Laya.SoundManager.addChannel(o),
                    this._soundCtx[e] = !0;
                }
            }, t.prototype.play = function(t) {
                if (this._soundCtx[t] && a["default"].storageMgr.isPlaySound()) {
                    if ("ride" == t) {
                        if (this.isPlayingRide) return;
                        this.isPlayingRide = !0;
                    }
                    Laya.SoundManager.playSound(this._pathRoot + t + ".mp3");
                }
            }, t.prototype.playMusic = function(t, e) {
                if (void 0 === e && (e = 0), this._soundCtx[t] && a["default"].storageMgr.isPlaySound()) {
                    var i = this._pathRoot + t + ".mp3";
                    Laya.Browser.onMiniGame ? (this.bgm || (this.bgm = wx.createInnerAudioContext(),
                    this.bgm.src = i, this.bgm.loop = !0), this.bgm.play()) : Laya.SoundManager.playMusic(i, e);
                }
            }, t.prototype.stop = function(t) {
                this._soundCtx[t] && (this.isPlayingRide = !1, Laya.SoundManager.stopSound(this._pathRoot + t + ".mp3"));
            }, t.prototype.stopMusic = function(t) {
                this._soundCtx[t] && (Laya.Browser.onMiniGame && this.bgm && this.bgm.stop(), Laya.SoundManager.stopMusic());
            }, t;
        }();
        i["default"] = n;
        var o;
        !function(t) {
            t.BGM = "bgm", t.RIDE = "ride", t.OVER = "over", t.CHEER = "cheer", t.HIT = "hit",
            t.CLICK = "click", t.JUMP = "jump", t.GROUND = "ground", t.DJS = "djs", t.RUSH = "rush",
            t.SPEED_UP_1 = "speed_up_2_3", t.SPEED_UP_2 = "speed_up_2_3", t.SPEED_UP_3 = "speed_up_2_3";
        }(o = i.SoundType || (i.SoundType = {}));
    }, {
        "../LayaSample": 3
    } ],
    14: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a, n = t("./NetMgr"), o = t("../LayaSample");
        !function(t) {
            t[t.NORMAL = 0] = "NORMAL", t[t.RESURGENCE = 1] = "RESURGENCE", t[t.PROP = 2] = "PROP",
            t[t.LOTTERY = 3] = "LOTTERY", t[t.START_GAME = 4] = "START_GAME", t[t.TRY_SKIN = 5] = "TRY_SKIN",
            t[t.OFFLINE = 6] = "OFFLINE", t[t.SETTLE = 7] = "SETTLE", t[t.EGG = 8] = "EGG",
            t[t.SKILL = 9] = "SKILL";
        }(a = i.SHARE_VIDEO_TYPE || (i.SHARE_VIDEO_TYPE = {}));
        var s = function() {
            function t() {
                this.httpsArr = [];
            }
            return t.prototype.init = function() {
                Laya.timer.loop(6e4, this, this.goPost);
            }, t.prototype.loginStatisticsPost = function() {
                var t = {
                    action: "1005",
                    from_appid: n["default"].fromAppid,
                    from_imgid: n["default"].fromImgid,
                    code: n["default"].code,
                    isnew: n["default"].isNew ? 1 : 0
                };
                this.statisticsPost(t);
            }, t.prototype.authorStatistics = function() {
                var t = {
                    action: "1006",
                    from_appid: n["default"].fromAppid,
                    from_imgid: n["default"].fromImgid,
                    code: n["default"].code,
                    isnew: n["default"].isNew ? 1 : 0
                };
                this.statisticsPost(t);
            }, t.prototype.startGameStatistics = function() {
                var t = {
                    action: "1008"
                };
                this.statisticsPost(t);
            }, t.prototype.shareStatistics = function(t) {
                var e = {
                    action: "1009",
                    type: t
                };
                this.statisticsPost(e);
            }, t.prototype.clickVideoStatistics = function(t) {
                var e = {
                    action: "1010",
                    type: t
                };
                this.statisticsPost(e);
            }, t.prototype.videoPlayOverAdStatistics = function(t) {
                var e = {
                    action: "1011",
                    type: t
                };
                this.statisticsPost(e);
            }, t.prototype.navigateToMiniProgramStatistics = function(t) {
                t.action = "1007", this.statisticsPost(t);
            }, t.prototype.navigateToMiniProgramBackStatistics = function(t) {
                t.action = "1017", this.statisticsPost(t);
            }, t.prototype.interstitialAdStatistics = function() {
                var t = {
                    action: "1011",
                    type: 4
                };
                this.statisticsPost(t);
            }, t.prototype.statisticsPost = function(t) {
                var e = this, i = {
                    channel: n["default"].channelId,
                    my_appid: o["default"].commonData.myAppid,
                    openid: n["default"].openId
                };
                for (var a in t) t.hasOwnProperty(a) && "toLinks" != a && (i[a] = t[a]);
                i.fail = function() {
                    e.httpsArr.push(i);
                }, i.callback = function(t) {
                    0 != t.code && e.httpsArr.push(i);
                }, o["default"].netMgr.requestStatistics({
                    data: i
                });
            }, t.prototype.goPost = function() {
                for (var t = this, e = 0; e < this.httpsArr.length; e++) {
                    var i = this.httpsArr[e];
                    i && (this.httpsArr[e].index = e, i.index = e, i.fail = null, i.callback = function(e) {
                        if (0 == e.code) for (var i = 0; i < t.httpsArr.length; i++) {
                            t.httpsArr[i].index = e.index, t.httpsArr.splice(i, 1);
                            break;
                        }
                    }, o["default"].netMgr.requestStatistics({
                        data: i
                    }));
                }
            }, t.instance = new t(), t;
        }();
        i["default"] = s;
    }, {
        "../LayaSample": 3,
        "./NetMgr": 12
    } ],
    15: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function t() {
                this._userData = null, this._userDataKey = "userData", this.init();
            }
            return t.prototype.init = function() {
                this._userData = {
                    isPlaySound: !0,
                    isPlayVibrate: !0,
                    isNoAds: !1,
                    levelID: 0,
                    isCollect: !1
                }, this.readStorage(),
                this.initGameStatus(),
                void 0 == this._userData.isNoAds && (this._userData.isNoAds = !1);
            }, t.prototype.readStorage = function() {
                var t = Laya.LocalStorage.getItem(this._userDataKey);

                if(t){
                    this._userData = JSON.parse(t);
                }
                t && (this._userData = JSON.parse(t));
            }, t.prototype.writeStorage = function() {
                this._userData && Laya.LocalStorage.setItem(this._userDataKey, JSON.stringify(this._userData));
            }, t.prototype.setNoAds = function(t) {
                this._userData.isNoAds = t, this.writeStorage();
            }, t.prototype.isPlaySound = function() {
                return this._userData.isPlaySound;
            }, t.prototype.setPlaySound = function(t) {
                this._userData.isPlaySound = t, this.writeStorage();
            }, t.prototype.isSkinTips = function() {
                return Math.floor(this._userData.skinTipsTime / 86400) != Math.floor(Date.parse(new Date().toString()) / 864e5);
            }, t.prototype.setSkinTips = function(t) {
                this._userData.skinTipsTime = t ? 0 : Math.floor(Date.parse(new Date().toString()) / 1e3),
                this.writeStorage();
            }, t.prototype.isPlayVibrate = function() {
                return this._userData.isPlayVibrate;
            }, t.prototype.setPlayVibrate = function(t) {
                this._userData.isPlayVibrate = t, this.writeStorage();
            }, t.prototype.getGameStatus = function() {
                return this._userData.gameStatus;
            }, t.prototype.initGameStatus = function() {
                this._userData.gameStatus || (this._userData.gameStatus = {}),
                this._userData.gameStatus.maxLevel || (this._userData.gameStatus.maxLevel = 1),
                this._userData.gameStatus.maxScore || (this._userData.gameStatus.maxScore = 0),
                this._userData.gameStatus.gold || (this._userData.gameStatus.gold = 0), this._userData.signinTime || (this._userData.signinTime = 0),
                this._userData.skinTipsTime || (this._userData.skinTipsTime = 0), this.writeStorage();
            }, t.prototype.setMaxScore = function(t) {
                this._userData.gameStatus.maxScore < t && (this._userData.gameStatus.maxScore = t,
                this.writeStorage());
            }, t;
        }();
        i["default"] = a;
    }, {} ],
    16: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function t() {
                this.scenes = "res/scenes/Conventional/ModelScene.ls", this.models = "res/res3d/models/Conventional/ModelScene.lh",
                this.skinList = "res/res3d/skinList_V1/Conventional/ModelScene.lh", this.newScore = 1,
                this.goonCount = 0, this.isSleep = !1, this.watchVideo = !1, this.watchInter = !1,
                this.useTime = 1e3, this.needWxAuthorize = !1, this.userInfo = {}, this.existInterAd = !1,
                this.existVideoAd = !1, this.existBannerAd = !1, this.isAdDelay = !1, this.adTime = 13e3,
                this.myAppid = "wx329acc38987d8151", this.curSkinIndex = 0, this.shareInfo = {},
                this.launchOptions = {}, this.wxsysInfo = {}, this.construction = 2, this.isCheckSignin = !1,
                this.lateWay = 0, this.needShowGuide = !1, this.bikeComps = [], this.gameCount = 0,
                this.isShowSkin = !1, this.skinIncome = 0, this.skinScore = 0;
            }
            return t;
        }();
        i["default"] = a;
        var n;
        !function(t) {
            t.AD_LOAD_EVENT = "ad_load_event", t.CHANGE_SKIN = "change_skin_event", t.CIRCLE_COUNT_EVENT = "circle_count_event",
            t.OVER_GAME_EVENT = "over_game_event", t.UPDATE_SPEED_EVENT = "update_speed_event",
            t.SPEED_UP_EVENT = "speed_up_event", t.AI_HIT_EVENT = "ai_hit_event", t.INIT_GAME_EVENT = "init_game_event",
            t.PLAY_GAME_EVENT = "play_game_event", t.GOON_GAME_EVENT = "goon_game_event", t.SHOW_APPLITE_EVENT = "show_applite_event",
            t.LOGIN_EVENT = "login_success_event", t.DRAW_WORLD_RANK_EVENT = "draw_world_rank_event",
            t.AD_SHOW_EVENT = "ad_show_event", t.AD_VIDEO_CLOSE_EVENT = "ad_video_close_event",
            t.WX_WAKE_EVENT = "wx_wake_event", t.WX_SLEEP_EVENT = "wx_sleep_event", t.SHARE_BACK_EVENT = "share_back_event",
            t.LOAD_FINISH_EVENT = "load_finish_event", t.HIT_CAR_EVENT = "hit_car_event";
        }(n = i.EventType || (i.EventType = {}));
    }, {} ],
    17: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../manager/NetMgr"), n = function() {
            function t() {}
            return t.isNull = function(t) {
                return null == t || void 0 == t || "" == t ? !0 : !1;
            }, t.random = function(t, e) {
                var i = e - t, a = Math.random(), n = t + Math.round(a * i);
                return n;
            }, t.autoScreenSize = function(t) {
                if (Laya.Browser.onMiniGame) {
                    var e = a["default"].systemInfo, i = 20;
                    20 == e.statusBarHeight || (44 == e.statusBarHeight || 27 == e.statusBarHeight || 30 == e.statusBarHeight ? i += 70 : 24 == e.statusBarHeight && (i += 16)),
                    t.forEach(function(t) {
                        t.y = i + t.height / 2;
                    });
                }
            }, t.scoreConversion = function(t) {
                for (var e = null, i = Math.round(t), a = i.toString(), n = [ 1e12, 1e9, 1e6, 1e3 ], o = 0; o < n.length; o++) {
                    var s = Math.floor(i / n[o]);
                    if (s >= 1) {
                        e = o, a = s.toString();
                        break;
                    }
                }
                for (var r = /(\d+)(\d{3})/; r.test(a); ) a = a.replace(r, "$1,$2");
                return {
                    value: a.toLocaleString(),
                    isK: e
                };
            }, t.randomSipArray = function(t, e) {
                if (t.length < e) return console.log("数组长度不够"), null;
                if (t.length == e) {
                    for (var i = [], a = 0; a < t.length; a++) i.push(t[a]);
                    return i;
                }
                for (var n = [], o = 0; o < t.length; o++) n.push(o);
                for (var i = [], s = 0; e > s; s++) {
                    var r = this.random(0, n.length - 1), h = n[r];
                    n.splice(r, 1), i.push(t[h]);
                }
                return i;
            }, t.ald = function(t, e) {
                Laya.Browser.onMiniGame && 0 == a["default"].aladingStatus && window.wx.aldSendEvent(t, e);
            }, t.getAdData = function(e) {
                var i = this.getCtrlData("adInfo");
                if (!t.isNull(i)) {
                    for (var a = i, n = [], o = 0; o < a.length; o++) {
                        var s = a[o];
                        s.position == e && n.push(s);
                    }
                    return n;
                }
            }, t.fromScale = function(t, e, i, a) {
                function n() {
                    var n = a ? new Laya.Handler(this, o) : null;
                    Laya.Tween.from(t, {
                        scaleX: e,
                        scaleY: e
                    }, i, null, n);
                }
                function o() {
                    Laya.Tween.from(t, {
                        scaleX: 1,
                        scaleY: 1
                    }, i, null, Laya.Handler.create(this, n));
                }
                void 0 === a && (a = !1), n();
            }, t.toAlpha = function(t, e, i, a, n) {
                function o() {
                    var n = a ? new Laya.Handler(this, s) : null;
                    Laya.Tween.to(t, {
                        alpha: e
                    }, i, null, n);
                }
                function s() {
                    Laya.Tween.to(t, {
                        alpha: 1
                    }, i, null, Laya.Handler.create(this, o));
                }
                void 0 === a && (a = !1), void 0 === n && (n = 1), t.alpha = n, o();
            }, t.getCtrlData = function(t) {
                return a["default"].ctrlInfo[t];
            }, t.toScale = function(t, e, i, a, n, o) {
                function s() {
                    var e = n || a ? new Laya.Handler(this, r) : null;
                    Laya.Tween.to(t, {
                        scaleX: o,
                        scaleY: o
                    }, i, null, e);
                }
                function r() {
                    var e = n ? new Laya.Handler(this, s) : null;
                    Laya.Tween.to(t, {
                        scaleX: 1,
                        scaleY: 1
                    }, i, null, e);
                }
                void 0 === n && (n = !1), void 0 === o && (o = e), t.scaleX = 1, t.scaleY = 1, s();
            }, t.getRGB = function(t) {
                var e = [], i = [], a = t.replace(/#/, "");
                if (3 == a.length) {
                    for (var n = [], o = 0; 3 > o; o++) n.push(a.charAt(o) + a.charAt(o));
                    a = n.join("");
                }
                for (var o = 0; 3 > o; o++) e[o] = "0x" + a.substr(2 * o, 2), i.push(parseInt(e[o]));
                return new Laya.Vector3(i[0] / 255, i[1] / 255, i[2] / 255);
            }, t.toPosition = function(t, e, i, a, n) {
                function o() {
                    if (a) switch (n) {
                      case 0:
                        var o = new Laya.Handler(this, s);
                        break;

                      case 1:
                        var o = new Laya.Handler(this, r);
                    }
                    Laya.Tween.to(t, {
                        x: e.x,
                        y: e.y
                    }, i, null, o);
                }
                function s() {
                    Laya.Tween.to(t, {
                        x: h.x,
                        y: h.y
                    }, i, null, Laya.Handler.create(this, o));
                }
                function r() {
                    t.x = h.x, t.y = h.y, o();
                }
                void 0 === a && (a = !1), void 0 === n && (n = 0), Laya.Tween.clearAll(t);
                var h = new Laya.Vector2(t.x, t.y);
                o();
            }, t.loadSubpackage = function(t, e, i) {
                Laya.Browser.onMiniGame && wx.loadSubpackage({
                    name: t,
                    success: function(t) {
                        console.log("分包加载成功"), e.call(t, i, !0);
                    },
                    fail: function(t) {
                        console.error("分包加载失败"), e.call(t, i, !1);
                    }
                });
            }, t;
        }();
        i["default"] = n;
    }, {
        "../manager/NetMgr": 12
    } ],
    18: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function t() {}
            return t.prototype.init = function() {}, t.prototype.getBannerCount = function() {
                return 0;
            }, t.prototype.getBannerItem = function() {}, t.prototype.setBannerItem = function() {},
            t.prototype.showBannerAd = function() {}, t.prototype.getInterstitialAd = function() {},
            t.prototype.hideBannerAd = function() {}, t.prototype.setBannerAdWidth = function(t) {},
            t.prototype.setBannerAdTop = function(t) {}, t.prototype.getBannerAd = function() {},
            t.prototype.showVideoAd = function(t) {}, t.prototype.getVideoAd = function() {},
            t.prototype.loadVideoAd = function() {}, t.prototype.showInterstitialAd = function() {},
            t;
        }();
        i["default"] = a;
    }, {} ],
    19: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./WxAdManager"), n = t("../../manager/NetMgr"), o = t("../../LayaSample"), s = t("../../manager/SoundMgr"), r = t("../../other/ConfigData"), h = t("../../manager/StatisticsMgr"), l = function() {
            function t() {}
            return t.prototype.init = function() {
                if (this.preTime = 0, this.buttonAuthorize1 = null, this._shareStartTime = new Date().getTime() + 86e3,
                this._isCreateWxInfoBtn = !1, Laya.Browser.onMiniGame) {
                    var t = window.wx.getSystemInfoSync();
                    n["default"].systemInfo = t, o["default"].commonData.wxsysInfo = t, this._regisiterWXCallback(),
                    this.getLaunchOption(), this.showShareMenuWithTicket(!0);
                }
                this.login(), this.getAllAdsControl();
            }, t.prototype.login = function() {
                // t.setUserInfo(e)),
                o["default"].glEvent.event(r.EventType.LOGIN_EVENT)

                // var t = this;
                // o["default"].wxMgr;
                // if (Laya.Browser.onMiniGame) window.wx.login({
                // }); else {
                //     var e = {
                //         code: "123",
                //         inviteId: "",
                //         channelId: ""
                //     };
                //     o["default"].netMgr.request(n["default"].apiLogin, e, function(e) {
                //         0 !== e.code ? console.error("code login fault. code:" + e.code) : (console.log("code 登录成功", JSON.stringify(e)),
                //         t.setUserInfo(e)), o["default"].glEvent.event(r.EventType.LOGIN_EVENT);
                //     });
                // }
            }, t.prototype.createWxInfoBtn1 = function() {
                var t = this;
                this._isCreateWxInfoBtn = !0;
                var e = o["default"].wxMgr, i = o["default"].commonData.wxsysInfo, a = i.screenWidth, n = i.screenHeight, s = (i.screenWidth - a) / 2, r = (i.screenHeight - n) / 2, l = {
                    left: s,
                    top: r,
                    width: a,
                    height: n,
                    lineHeight: n,
                    backgroundColor: "#00000000",
                    color: "#ffffffff",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 4
                };
                e.buttonAuthorize1 = window.wx.createUserInfoButton({
                    type: "text",
                    text: "",
                    style: l,
                    withCredentials: !0
                }), e.showAuthorizeBtn(!0), e.buttonAuthorize1.onTap(function(i) {
                    var a = new Date().getTime(), n = Math.floor((a - e.preTime) / 1e3);
                    if (e.preTime = a, !(1 > n)) {
                        if (i.userInfo) {
                            console.log("用户授权登录");
                            var s = {};
                            h["default"].instance.authorStatistics(), s.nickname = i.userInfo.nickName, s.gender = i.userInfo.gender,
                            s.avatarUrl = i.userInfo.avatarUrl, o["default"].commonData.userInfo.nickname = s.nickname,
                            o["default"].commonData.userInfo.avatarUrl = s.avatarUrl, t.updateUserInfo(s);
                        } else console.log("授权取消");
                        o["default"].commonData.needWxAuthorize = !1, e.showAuthorizeBtn(!1);
                    }
                });
            }, t.prototype.getSystemParameter = function() {
                var t = {
                    nowVersion: n["default"].version
                };
                o["default"].netMgr.request("getSystemParamList.action", t, function(t) {
                    if (0 == t.code) {
                        var e = [];
                        if (t.adInfo) {
                            e = JSON.parse(t.adInfo);
                            for (var i = e.length, a = i - 1; a >= 0; a--) 1 == e[a].toHz && e.splice(a, 1);
                        }
                        if (n["default"].ctrlInfo = {
                            isShare: 1 == t.fuhuoControl,
                            isWudian: t.positionControl,
                            shareInfo: t.shareInfo,
                            mainAdMy: 1 == t.noAd,
                            adInfo: e,
                            isGoldeggs: t.isGoldeggs,
                            lateDelay: t.lateDelay || [ 1600, 1400, 1600, 1600, 1100, 1100 ],
                            adDelayedTime: t.adDelayedTime || 0,
                            adRefreshTimes: t.adRefreshTimes || 0,
                            noAd: t.noAd,
                            innerAD_delayed_time: t.innerAD_delayed_time || 12e4,
                            inviteFriendsControl: t.inviteFriendsControl || 0,
                            inviteFriendsGolds: t.inviteFriendsGolds || 0,
                            inviteShareMaxCount: t.inviteShareMaxCount || 8,
                            trialAdd: t.trialAdd || .3,
                            onlineTimes: t.onlineTimes,
                            onlineItemSecond: t.onlineItemSecond,
                            onlineItemGold: t.onlineItemGold,
                            fuhuoUiType: t.fuhuoUiType,
                            startOfflineTime: new Date().getTime(),
                            shareBntSwitch: t.shareBntSwitch || 0,
                            videoBntSwitch: t.videoBntSwitch || 1,
                            marqueeBntSwitch: t.marqueeBntSwitch || 0,
                            backHomeControl: t.backHomeControl || 0,
                            btuMove: [ 1900, 1900, 1900, 1900, 1900, 1900 ],
                            btuAppear: [ 700, 700, 700, 700, 700, 700 ],
                            toConverge: t.toConverge || 1
                        }, t.bannerAdIds && (n["default"].bannerAdIds = t.bannerAdIds.split(",")), t.rewardedAdIds && (n["default"].ctrlInfo.isVideo = !0,
                        n["default"].rewardedAdIds = t.rewardedAdIds.split(",")), t.innerADIds && (n["default"].innerADIds = t.innerADIds.split(",")),
                        // t.allAdsControl && (),
                        t.wudianLevel) {
                            // var o = t.wudianLevel.split(",");
                            // if (o.length > 0) {
                            //     n["default"].wudian_level = [];
                            //     for (var a = 0, s = o.length; s > a; ++a) n["default"].wudian_level.push(parseInt(o[a]));
                            // }
                        }
                        if (t.lateDelay) {
                            // var o = t.lateDelay.split(",");
                            // if (o.length > 0) {
                            //     n["default"].ctrlInfo.lateDelay = [];
                            //     for (var a = 0, s = o.length; s > a; ++a) n["default"].ctrlInfo.lateDelay.push(parseInt(o[a]));
                            // }
                        }
                        if (t.btuMove) {
                            // var o = t.btuMove.split(",");
                            // if (o.length > 0) {
                            //     n["default"].ctrlInfo.btuMove = [];
                            //     for (var a = 0, s = o.length; s > a; ++a) n["default"].ctrlInfo.btuMove.push(parseInt(o[a]));
                            // }
                        }
                        if (t.btuAppear) {
                            // var o = t.btuAppear.split(",");
                            // if (o.length > 0) {
                            //     n["default"].ctrlInfo.btuAppear = [];
                            //     for (var a = 0, s = o.length; s > a; ++a) n["default"].ctrlInfo.btuAppear.push(parseInt(o[a]));
                            // }
                        }
                    }
                });
            }, t.prototype.setUserInfo = function(t) {
                // o["default"].commonData.isCheckSignin = !0;
                // var e = o["default"].storageMgr.getGameStatus(), i = t.maxScore < e.maxScore ? e.maxScore : t.maxScore;
                // n["default"].isNew = t.isNewUser, n["default"].channelId = t.channelId, n["default"].openId = t.openid,
                // o["default"].commonData.userInfo.nickname = t.nikename, o["default"].commonData.userInfo.avatarUrl = t.headImage,
                // o["default"].glEvent.event("updateCoin", {}), h["default"].instance.loginStatisticsPost(),
                // i && this.settlementLevel(i), this.getSystemParameter(), n["default"].aladingStatus = t.aladingStatus,
                // 0 == t.aladingStatus && Laya.Browser.onMiniGame && (window.aldJs(), window.wx.aldSendOpenid(t.openid));
            }, t.prototype.getAllAdsControl = function() {
                var t = this, e = {};
                e.nowVersion = n["default"].version, e.timeout = t.getAllAdsControl, o["default"].netMgr.request("getAllAdsControl.action", e, function(t) {
                    console.log("getAllAdsControl.action:", t), 0 == t.code && t.allAdsControl && (n["default"].allAdsControl = JSON.parse(t.allAdsControl),
                    a["default"].Instance.init());
                });
            }, t.prototype.showAuthorizeBtn = function(t) {
                this.buttonAuthorize1 && (t ? (this.buttonAuthorize1.show(), console.log("show")) : (this.buttonAuthorize1.hide(),
                console.log("hide")));
            }, t.prototype.getLaunchOption = function() {
                o["default"].commonData.launchOptions = window.wx.getLaunchOptionsSync();
            }, t.prototype.showToast = function(t, e) {
                void 0 === e && (e = 2e3), window.wx && window.wx.showToast({
                    title: t,
                    duration: e,
                    icon: "none"
                });
            }, t.prototype.hideToast = function() {
                window.wx && window.wx.hideToast();
            }, t.prototype._regisiterWXShareCallback = function() {
                var t = o["default"].wxMgr;
                Laya.Browser.onMiniGame && n["default"].sessionId && window.wx.onShareAppMessage(function() {
                    var e = t.getShareContent(1), i = {
                        title: e.share_title,
                        imageUrl: e.share_img,
                        query: "share_id=" + e.share_id + "&share_type=" + e.share_type + "&id=" + o["default"].commonData.userInfo.id,
                        success: function(t) {},
                        fail: function() {}
                    };
                    return console.log("渠道2"), t._upShareInfo(e.share_id), i;
                });
            }, t.prototype.settlementLevel = function(t) {
                var e = o["default"].storageMgr.getGameStatus(), i = o["default"].wxMgr;
                if (e.maxScore < t) {
                    i._submitScroe(t), o["default"].storageMgr.setMaxScore(t);
                    // var a = {};
                    // a.score = t,
                    //  a.use_time = Math.floor(o["default"].commonData.useTime / 1e3),
                    //  o["default"].netMgr.request("settle.action", a, function(t) {
                    //     0 == t.code && (console.log("上传分数成功", t.maxScore),
                    //     o["default"].commonData.userInfo.max_score = t.maxScore);
                    // });
                }
            }, t.prototype.worldRank = function(t) {
                var e = {
                    page: t
                };
                o["default"].netMgr.request("getWorldRank.action", e, function(e) {
                    0 == e.code ? o["default"].glEvent.event(r.EventType.DRAW_WORLD_RANK_EVENT, {
                        data: e.rank,
                        myIndex: e.myIndex,
                        page: t
                    }) : console.error("get world ranking error:", e, t);
                });
            }, t.prototype._submitScroe = function(t) {
                if (Laya.Browser.onMiniGame) {
                    var e = window.wx.getOpenDataContext();
                    e.postMessage({
                        cmd: "submit_scroe",
                        score: t
                    }), o["default"].glEvent.event("submit_scroe_event", {});
                }
            }, t.prototype.showFriendRank = function(t) {
                if (Laya.Browser.onMiniGame) {
                    o["default"].glEvent.event("show_friend_rank_event", {
                        isShow: t
                    });
                    var e = t ? "open_friend_rank" : "close_friend_rank", i = window.wx.getOpenDataContext();
                    console.log("显示好友排行榜"), i.postMessage({
                        cmd: e
                    });
                }
            }, t.prototype.destroyFriendRank = function() {
                if (Laya.Browser.onMiniGame) {
                    var t = window.wx.getOpenDataContext();
                    t.postMessage({
                        cmd: "destroy_friend_rank"
                    });
                }
            }, t.prototype.onFrientMouseEvent = function(t) {
                Laya.Browser.onMiniGame && window.wx.getOpenDataContext().postMessage(t);
            }, t.prototype.playVibrateShort = function() {
                Laya.Browser.onMiniGame && o["default"].storageMgr.isPlayVibrate() && window.wx.vibrateShort({
                    success: function(t) {}
                });
            }, t.prototype.playVibrateLong = function() {
                Laya.Browser.onMiniGame && o["default"].storageMgr.isPlayVibrate() && window.wx.vibrateLong({
                    success: function(t) {}
                });
            }, t.prototype.showShareMenuWithTicket = function(t) {
                window.wx && window.wx.showShareMenu({
                    withShareTicket: t
                });
            }, t.prototype._regisiterWXCallback = function() {
                Laya.Browser.onMiniGame && (window.wx.offShow(this.onShowEvent), window.wx.onShow(this.onShowEvent),
                window.wx.offHide(this.onHideEvent), window.wx.onHide(this.onHideEvent));
            }, t.prototype.onShowEvent = function(t) {
                var e = o["default"].wxMgr;
                if (o["default"].commonData.isSleep = !1, console.log(o["default"].soundMgr.isPlayingBGM),
                console.log(o["default"].storageMgr.isPlaySound()), o["default"].soundMgr.isPlayingBGM || o["default"].soundMgr.playMusic(s.SoundType.BGM),
                o["default"].glEvent.event(r.EventType.WX_WAKE_EVENT, {}), e._statuShareGame) {
                    console.log("渠道1"), e._statuShareGame = !1;
                    var i = new Date().getTime(), a = i - e._shareStartTime, n = 2500 > a ? !1 : !0;
                    n && e._upShareInfo(e._shareId), o["default"].glEvent.event(r.EventType.SHARE_BACK_EVENT, {
                        isShare: n,
                        shareId: e._shareId
                    }), e._shareStartTime = new Date().getTime() + 86e3;
                }
            }, t.prototype.updateUserInfo = function(t) {
                o["default"].netMgr.request("updateUserInfo.action", {
                    nickname: t.nickname,
                    headimgurl: t.avatarUrl,
                    sex: t.gender
                }, function(t) {
                    0 == t.code ? console.log("更新用户信息成功") : console.log("更新用户信息失败", t.code);
                });
            }, t.prototype.onHideEvent = function() {
                o["default"].commonData.isSleep = !0, o["default"].soundMgr.isPlayingBGM = !1;
                o["default"].wxMgr;
                console.log("休屏监听hide: "), o["default"].glEvent.event("wx_sleep_event", {});
            }, t.prototype.shareFriend = function(t, e, i, a) {
                if (Laya.Browser.onMiniGame) {
                    var n, s = o["default"].wxMgr, r = s.getShareContent(t);
                    e && (s._shareStartTime = new Date().getTime(), s._statuShareGame = !0, s._shareId = r.share_id),
                    n = {
                        title: r.share_title,
                        imageUrl: r.share_img,
                        query: "share_id=" + r.share_id + "&share_type=" + r.share_type + "&id=" + o["default"].commonData.userInfo.id,
                        success: function(t) {},
                        fail: function() {},
                        complete: function() {}
                    }, h["default"].instance.shareStatistics(t), window.wx.shareAppMessage(n);
                }
            }, t.prototype.getShareContent = function(t) {
                if (n["default"].ctrlInfo.shareInfo) {
                    o["default"].commonData.shareInfo = JSON.parse(n["default"].ctrlInfo.shareInfo);
                    var e = o["default"].commonData.shareInfo, i = {
                    };
                    if (e) {
                        var a = Math.floor(Math.random() * e.length), s = {
                            share_title: e[a].title,
                            share_img: e[a].img,
                            share_id: 1,
                            share_type: t
                        };
                        return s;
                    }
                    return i;
                }
            }, t.prototype.upViewVideoInfo = function(t, e) {
                return;
            }, t.prototype._upShareInfo = function(t) {
                var e = {};
                e.share_id = t;
            }, t.prototype.openCustomerService = function() {
                Laya.Browser.onMiniGame && window.wx.openCustomerServiceConversation();
            }, t;
        }();
        i["default"] = l;
    }, {
        "../../LayaSample": 3,
        "../../manager/NetMgr": 12,
        "../../manager/SoundMgr": 13,
        "../../manager/StatisticsMgr": 14,
        "../../other/ConfigData": 16,
        "./WxAdManager": 21
    } ],
    20: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../../LayaSample"), n = t("./BaseAd"), o = t("./WxAdManager"), s = t("../../manager/NetMgr"), r = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this;
            }
            return __extends(e, t), e.prototype.init = function() {
                if (this._videoAd = null, this._interAd = null, this._videoCate = -1, this._isCreateInter = !1,
                Laya.Browser.onMiniGame) {
                    var t = a["default"].commonData.wxsysInfo.SDKVersion;
                    this._isCreateInter = o["default"].Instance.compareVersion(t, "2.6.0") >= 0, this.getVideoAd(),
                    this.getInterstitialAd();
                }
            }, e.prototype.loadVideoAd = function() {
                Laya.Browser.onMiniGame && this._videoAd && this._videoAd.load();
            }, e.prototype.showVideoAd = function(t) {
                var e = this._videoAd;
                Laya.Browser.onMiniGame && e && (this._videoCate = t, a["default"].wxMgr.upViewVideoInfo(0, t),
                e.show().then(function() {
                    a["default"].commonData.watchVideo = !0;
                })["catch"](function(t) {
                    a["default"].wxMgr.showToast("今日视频次数已用完", 2e3), a["default"].glEvent.event("changeIsStartTimer");
                }));
            }, e.prototype.getVideoAd = function() {
                if (Laya.Browser.onMiniGame) {
                    if (!wx.createRewardedVideoAd) return void (a["default"].commonData.existVideoAd = !1);
                    var t = this._videoAd;
                    t && (t.offLoad(this._onLoadVideo), t.offError(this._onErrorVideo), t.offClose(this._onCloseVideo)),
                    t = wx.createRewardedVideoAd({
                        adUnitId: s["default"].rewardedAdIds
                    }), t.onLoad(this._onLoadVideo), t.onError(this._onErrorVideo), t.onClose(this._onCloseVideo),
                    this._videoAd = t;
                }
            }, e.prototype._onLoadVideo = function() {
                a["default"].commonData.existVideoAd = !0, a["default"].glEvent.event("ad_load_event", {
                    adtype: "video",
                    isLoad: !0
                });
            }, e.prototype._onCloseVideo = function(t) {
                a["default"].commonData.watchVideo = !1;
                var e = t && t.isEnded || void 0 === t ? !0 : !1;
                e && a["default"].wxMgr.upViewVideoInfo(1, this._videoCate), a["default"].glEvent.event("ad_video_close_event", {
                    isEnded: e
                });
            }, e.prototype._onErrorVideo = function(t) {
                console.error("video 加载错误", t), a["default"].commonData.existVideoAd = !1, a["default"].glEvent.event("ad_load_event", {
                    adtype: "video",
                    isLoad: !1
                });
            }, e.prototype.showInterstitialAd = function() {
                var t = this._interAd;
                this._isCreateInter && t && t.show().then(function() {
                    a["default"].commonData.watchInter = !0;
                })["catch"](function(t) {
                    console.error("Interstitial 显示错误", t), a["default"].glEvent.event("ad_inter_close_event", {});
                });
            }, e.prototype.getInterstitialAd = function() {
                if (this._isCreateInter && wx.createInterstitialAd) {
                    var t = this._interAd;
                    t && (t.offLoad(this._onLoadInterstitial), t.offError(this._onErrorInterstitial),
                    t.offClose(this._onCloseInterstitial)), t = wx.createInterstitialAd({
                        adUnitId: s["default"].innerADIds
                    }), t.onLoad(this._onLoadInterstitial), t.onError(this._onErrorInterstitial), t.onClose(this._onCloseInterstitial),
                    this._interAd = t;
                }
            }, e.prototype._onLoadInterstitial = function() {
                console.log("Interstitial 加载成功"), a["default"].commonData.existInterAd = !0, a["default"].glEvent.event("ad_load_event", {
                    adtype: "inter",
                    isLoad: !0
                });
            }, e.prototype._onCloseInterstitial = function(t) {
                console.error("Interstitial 关闭", t), a["default"].glEvent.event("ad_inter_close_event", {});
            }, e.prototype._onErrorInterstitial = function(t) {
                console.error("Interstitial 加载错误", t), a["default"].commonData.existInterAd = !1,
                a["default"].glEvent.event("ad_load_event", {
                    adtype: "inter",
                    isLoad: !1
                });
            }, e;
        }(n["default"]);
        i["default"] = r;
    }, {
        "../../LayaSample": 3,
        "../../manager/NetMgr": 12,
        "./BaseAd": 18,
        "./WxAdManager": 21
    } ],
    21: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../../manager/NetMgr"), n = t("../../LayaSample"), o = t("../../manager/SoundMgr"), s = function() {
            function t() {
                this.isInited = !1, this.isInterstitial = !1, this.interstitialList = [], this.videoPlayedTimes = 0;
            }
            return Object.defineProperty(t, "Instance", {
                get: function() {
                    return null == t.instance && (t.instance = new t()), t.instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.compareVersion = function(t, e) {
                t = t.split("."), e = e.split(".");
                for (var i = Math.max(t.length, e.length); t.length < i; ) t.push("0");
                for (;e.length < i; ) e.push("0");
                for (var a = 0; i > a; a++) {
                    var n = parseInt(t[a]), o = parseInt(e[a]);
                    if (n > o) return 1;
                    if (o > n) return -1;
                }
                return 0;
            }, t.prototype.init = function() {
                Laya.Browser.onMiniGame && !this.isInited && (a["default"].systemInfo.SDKVersion && this.compareVersion(a["default"].systemInfo.SDKVersion, "2.0.4") >= 0 && (this.isInited = !0,
                this.showBannerAd_fuhuo(!0), this.showBannerAd_jiesuanjiemian(!0), this.showBannerAd_jiesuanjinbi(!0),
                this.showBannerAd_shiyongpifu(!0), this.showBannerAd_zhujiemian(!0), this.showBannerAd_zhujiemianlingqujinbi(!0),
                this.LoadRewardedVideoAdList()), a["default"].systemInfo.SDKVersion && this.compareVersion(a["default"].systemInfo.SDKVersion, "2.6.0") >= 0);
            }, t.prototype.getAdInfo = function(t) {
                for (var e = null, i = 0; i < a["default"].allAdsControl.length; i++) a["default"].allAdsControl[i].ad_position_id == t && (e = a["default"].allAdsControl[i]);
                return e;
            }, t.prototype.LoadRewardedVideoAdList = function() {
                var t = this;
                a["default"].allAdsControl.forEach(function(e) {
                    3 == e.ad_type && (201 == e.ad_position_id ? t.initRewardedVideoAd_shiyongpifu1(e.ad_id) : 202 == e.ad_position_id ? t.initRewardedVideoAd_shiyongpifu2(e.ad_id) : 203 == e.ad_position_id ? t.initRewardedVideoAd_shiyongpifu3(e.ad_id) : 204 == e.ad_position_id ? t.initRewardedVideoAd_shiyongpifu4(e.ad_id) : 205 == e.ad_position_id ? t.initRewardedVideoAd_shiyongpifu(e.ad_id) : 206 == e.ad_position_id && t.initRewardedVideoAd_fuhuo(e.ad_id));
                });
            }, t.prototype.loadInterstitialList = function() {
                var t = this;
                a["default"].allAdsControl.forEach(function(e) {
                    1 == e.ad_type && t.showInterstitialAd(e.ad_position_id, !0);
                });
            }, t.prototype.showInterstitialAd = function(t, e) {
                if (void 0 === e && (e = !1), !Laya.Browser.onMiniGame || !this.isInterstitial) return !1;
                if (!a["default"].allAdsControl) return !1;
                var i = this.getAdInfo(t);
                return null == i || 0 == i.ad_status ? !1 : (this.interstitialList[t] || (this.interstitialList[t] = window.wx.createInterstitialAd({
                    adUnitId: i.ad_id
                }), this.interstitialList[t] && this.interstitialList[t].load(), this.interstitialList[t].onLoad(function(t) {}),
                this.interstitialList[t].onError(function(t) {}), this.interstitialList[t].onClose(function(t) {})),
                void (e || this.interstitialList[t] && this.interstitialList[t].show()));
            }, t.prototype.destroyInterstitialAd = function(t) {
                this.interstitialList[t] && (this.interstitialList[t].destroy(), this.interstitialList[t] = null);
            }, t.prototype.showBannerAd_zhujiemian = function(e) {
                if (void 0 === e && (e = !1), !Laya.Browser.onMiniGame || !this.isInited) return !1;
                if (!a["default"].allAdsControl) return !1;
                var i = this.getAdInfo(101);
                if (console.log("zhujiemian adid=", i), null == i || 0 == i.ad_status) return !1;
                var n = a["default"].systemInfo.windowWidth, o = Laya.stage.width / 2 - 140, s = a["default"].systemInfo.windowHeight;
                return this.bannerAd_zhujiemian || (this.bannerAd_zhujiemian = window.wx.createBannerAd({
                    adUnitId: i.ad_id,
                    style: {
                        left: 0,
                        top: s - 100,
                        width: o
                    }
                }), this.bannerAd_zhujiemian.onResize(function(e) {
                    var i = t.Instance.bannerAd_zhujiemian;
                    i && (i.style.left = (n - i.style.realWidth) / 2, i.style.top = s - i.style.realHeight,
                    s / n > 2 && (i.style.top = i.style.top - 10));
                }), this.bannerAd_zhujiemian.onError(function(e) {
                    console.log("广告加载错误:", e), t.Instance.destroyBannerAd_zhujiemian();
                }), this.bannerAd_zhujiemian.onLoad(function() {})), e ? (console.log("预加载广告"),
                void 0 != this.bannerAd_zhujiemian && this.bannerAd_zhujiemian.hide(), !0) : (this.bannerAd_zhujiemian && this.bannerAd_zhujiemian.show(),
                !0);
            }, t.prototype.hideBannerAd_zhujiemian = function() {
                this.bannerAd_zhujiemian && this.bannerAd_zhujiemian.hide();
            }, t.prototype.destroyBannerAd_zhujiemian = function() {
                this.bannerAd_zhujiemian && (this.bannerAd_zhujiemian.destroy(), this.bannerAd_zhujiemian = null);
            }, t.prototype.showBannerAd_zhujiemianlingqujinbi = function(e) {
                if (void 0 === e && (e = !1), !Laya.Browser.onMiniGame || !this.isInited) return !1;
                if (!a["default"].allAdsControl) return !1;
                var i = this.getAdInfo(102);
                if (null == i || 0 == i.ad_status) return !1;
                var n = a["default"].systemInfo.windowWidth, o = n, s = a["default"].systemInfo.windowHeight;
                return this.bannerAd_zhujiemianlingqujinbi || (this.bannerAd_zhujiemianlingqujinbi = window.wx.createBannerAd({
                    adUnitId: i.ad_id,
                    style: {
                        left: 0,
                        top: s - 100,
                        width: o
                    }
                }), this.bannerAd_zhujiemianlingqujinbi.onResize(function(e) {
                    var i = t.Instance.bannerAd_zhujiemianlingqujinbi;
                    i && (i.style.left = (n - i.style.realWidth) / 2, i.style.top = s - i.style.realHeight,
                    s / n > 2 && (i.style.top = i.style.top - 25));
                }), this.bannerAd_zhujiemianlingqujinbi.onError(function(e) {
                    console.log("广告加载错误:", e), t.Instance.destroyBannerAd_zhujiemianlingqujinbi();
                }), this.bannerAd_zhujiemianlingqujinbi.onLoad(function() {})), e ? (console.log("预加载广告"),
                void 0 != this.bannerAd_zhujiemianlingqujinbi && this.bannerAd_zhujiemianlingqujinbi.hide(),
                !0) : (void 0 != this.bannerAd_zhujiemianlingqujinbi && (0 != a["default"].wudian_level[4] && 1 == a["default"].ctrlInfo.isWudian ? (console.log("show_zhujiemianlingqujinbi NetMgr.ctrlInfo.lateDelay[4] = ", a["default"].ctrlInfo.lateDelay[4]),
                Laya.timer.clear(this, this.show_zhujiemianlingqujinbi), Laya.timer.once(a["default"].ctrlInfo.lateDelay[4], this, this.show_zhujiemianlingqujinbi)) : (Laya.timer.clear(this, this.show_zhujiemianlingqujinbi),
                Laya.timer.once(700, this, this.show_zhujiemianlingqujinbi))), !0);
            }, t.prototype.show_zhujiemianlingqujinbi = function() {
                console.log("show_zhujiemianlingqujinbi"), this.bannerAd_zhujiemianlingqujinbi && this.bannerAd_zhujiemianlingqujinbi.show();
            }, t.prototype.hideBannerAd_zhujiemianlingqujinbi = function(t) {
                void 0 === t && (t = NaN), this.bannerAd_zhujiemianlingqujinbi && this.bannerAd_zhujiemianlingqujinbi.hide();
            }, t.prototype.destroyBannerAd_zhujiemianlingqujinbi = function() {
                this.bannerAd_zhujiemianlingqujinbi && (this.bannerAd_zhujiemianlingqujinbi.destroy(),
                this.bannerAd_zhujiemianlingqujinbi = null);
            }, t.prototype.showBannerAd_shiyongpifu = function(e) {
                if (void 0 === e && (e = !1), !Laya.Browser.onMiniGame || !this.isInited) return !1;
                if (!a["default"].allAdsControl) return !1;
                var i = this.getAdInfo(103);
                if (console.log("shiyongpifu adInfo =", i), null == i || 0 == i.ad_status) return !1;
                var n = a["default"].systemInfo.windowWidth, o = n, s = a["default"].systemInfo.windowHeight;
                return this.bannerAd_shiyongpifu || (this.bannerAd_shiyongpifu = window.wx.createBannerAd({
                    adUnitId: i.ad_id,
                    style: {
                        left: 0,
                        top: s - 100,
                        width: o
                    }
                }), this.bannerAd_shiyongpifu.onResize(function(e) {
                    var i = t.Instance.bannerAd_shiyongpifu;
                    i && (i.style.left = (n - i.style.realWidth) / 2, i.style.top = s - i.style.realHeight,
                    s / n > 2 && (i.style.top = i.style.top - 25));
                }), this.bannerAd_shiyongpifu.onError(function(e) {
                    console.log("广告加载错误:", e), t.Instance.destroyBannerAd_zhujiemianlingqujinbi();
                }), this.bannerAd_shiyongpifu.onLoad(function() {})), e ? (console.log("预加载广告"),
                void 0 != this.bannerAd_shiyongpifu && this.bannerAd_shiyongpifu.hide(), !0) : (void 0 != this.bannerAd_shiyongpifu && (0 != a["default"].wudian_level[0] && 1 == a["default"].ctrlInfo.isWudian ? (Laya.timer.clear(this, this.show_shiyongpifu),
                console.log("shiyongpifu NetMgr.ctrlInfo.lateDelay[0] =" + a["default"].ctrlInfo.lateDelay[0]),
                Laya.timer.once(a["default"].ctrlInfo.lateDelay[0], this, this.show_shiyongpifu)) : (Laya.timer.clear(this, this.show_shiyongpifu),
                Laya.timer.once(700, this, this.show_shiyongpifu))), !0);
            }, t.prototype.show_shiyongpifu = function() {
                console.log("show_shiyongpifu"), this.bannerAd_shiyongpifu && this.bannerAd_shiyongpifu.show();
            }, t.prototype.hideBannerAd_shiyongpifu = function(t) {
                void 0 === t && (t = NaN), this.bannerAd_shiyongpifu && this.bannerAd_shiyongpifu.hide();
            }, t.prototype.destroyBannerAd_shiyongpifu = function() {
                this.bannerAd_shiyongpifu && (this.bannerAd_shiyongpifu.destroy(), this.bannerAd_shiyongpifu = null);
            }, t.prototype.showBannerAd_fuhuo = function(e) {
                if (void 0 === e && (e = !1), !Laya.Browser.onMiniGame || !this.isInited) return !1;
                if (!a["default"].allAdsControl) return !1;
                var i = this.getAdInfo(104);
                if (console.log("showBannerAd_fuhuo adInfo =", i), null == i || 0 == i.ad_status) return !1;
                var n = a["default"].systemInfo.windowWidth, o = n, s = a["default"].systemInfo.windowHeight;
                return this.bannerAd_fuhuo || (this.bannerAd_fuhuo = window.wx.createBannerAd({
                    adUnitId: i.ad_id,
                    style: {
                        left: 0,
                        top: s - 100,
                        width: o
                    }
                }), this.bannerAd_fuhuo.onResize(function(e) {
                    var i = t.Instance.bannerAd_fuhuo;
                    i && (i.style.left = (n - i.style.realWidth) / 2, i.style.top = s - i.style.realHeight,
                    s / n > 2 && (i.style.top = i.style.top - 25));
                }), this.bannerAd_fuhuo.onError(function(e) {
                    console.log("广告加载错误:", e), t.Instance.destroyBannerAd_zhujiemianlingqujinbi();
                }), this.bannerAd_fuhuo.onLoad(function() {})), e ? (console.log("预加载广告"), void 0 != this.bannerAd_fuhuo && this.bannerAd_fuhuo.hide(),
                !0) : (void 0 != this.bannerAd_fuhuo && (0 != a["default"].wudian_level[1] && 1 == a["default"].ctrlInfo.isWudian ? (Laya.timer.clear(this, this.show_fuhuo),
                Laya.timer.once(a["default"].ctrlInfo.lateDelay[1], this, this.show_fuhuo), console.log("shiyongpifu NetMgr.ctrlInfo.lateDelay[1] =" + a["default"].ctrlInfo.lateDelay[1])) : (Laya.timer.clear(this, this.show_fuhuo),
                Laya.timer.once(700, this, this.show_fuhuo))), !0);
            }, t.prototype.show_fuhuo = function() {
                console.log("show_fuhuo"), this.bannerAd_fuhuo && this.bannerAd_fuhuo.show();
            }, t.prototype.hideBannerAd_fuhuo = function(t) {
                void 0 === t && (t = NaN), this.bannerAd_fuhuo && this.bannerAd_fuhuo.hide();
            }, t.prototype.destroyBannerAd_fuhuo = function() {
                this.bannerAd_fuhuo && (this.bannerAd_fuhuo.destroy(), this.bannerAd_fuhuo = null);
            }, t.prototype.showBannerAd_jiesuanjinbi = function(e) {
                if (void 0 === e && (e = !1), !Laya.Browser.onMiniGame || !this.isInited) return !1;
                if (!a["default"].allAdsControl) return !1;
                var i = this.getAdInfo(105);
                if (console.log("showBannerAd_jiesuanjinbi adInfo =", i), null == i || 0 == i.ad_status) return !1;
                var n = a["default"].systemInfo.windowWidth, o = n, s = a["default"].systemInfo.windowHeight;
                return this.bannerAd_jiesuanjinbi || (this.bannerAd_jiesuanjinbi = window.wx.createBannerAd({
                    adUnitId: i.ad_id,
                    style: {
                        left: 0,
                        top: s - 100,
                        width: o
                    }
                }), this.bannerAd_jiesuanjinbi.onResize(function(e) {
                    var i = t.Instance.bannerAd_jiesuanjinbi;
                    i && (i.style.left = (n - i.style.realWidth) / 2, i.style.top = s - i.style.realHeight,
                    s / n > 2 && (i.style.top = i.style.top - 25));
                }), this.bannerAd_jiesuanjinbi.onError(function(e) {
                    console.log("广告加载错误:", e), t.Instance.destroyBannerAd_zhujiemianlingqujinbi();
                }), this.bannerAd_jiesuanjinbi.onLoad(function() {})), e ? (console.log("预加载广告"),
                void 0 != this.bannerAd_jiesuanjinbi && this.bannerAd_jiesuanjinbi.hide(), !0) : (void 0 != this.bannerAd_jiesuanjinbi && (0 != a["default"].wudian_level[2] && 1 == a["default"].ctrlInfo.isWudian ? (console.log("show_jiesuanjinbi NetMgr.ctrlInfo.lateDelay[2] = ", a["default"].ctrlInfo.lateDelay[2]),
                Laya.timer.clear(this, this.show_jiesuanjinbi), Laya.timer.once(a["default"].ctrlInfo.lateDelay[2], this, this.show_jiesuanjinbi)) : (Laya.timer.clear(this, this.show_jiesuanjinbi),
                Laya.timer.once(700, this, this.show_jiesuanjinbi))), !0);
            }, t.prototype.show_jiesuanjinbi = function() {
                console.log("show_jiesuanjinbi"), this.bannerAd_jiesuanjinbi && this.bannerAd_jiesuanjinbi.show();
            }, t.prototype.hideBannerAd_jiesuanjinbi = function(t) {
                void 0 === t && (t = NaN), this.bannerAd_jiesuanjinbi && this.bannerAd_jiesuanjinbi.hide();
            }, t.prototype.destroyBannerAd_jiesuanjinbi = function() {
                this.bannerAd_jiesuanjinbi && (this.bannerAd_jiesuanjinbi.destroy(), this.bannerAd_jiesuanjinbi = null);
            }, t.prototype.showBannerAd_jiesuanjiemian = function(e) {
                if (void 0 === e && (e = !1), !Laya.Browser.onMiniGame || !this.isInited) return !1;
                if (!a["default"].allAdsControl) return !1;
                var i = this.getAdInfo(106);
                if (console.log("jiesuanjiemian adid=", i), null == i || 0 == i.ad_status) return !1;
                var n = a["default"].systemInfo.windowWidth, o = n, s = a["default"].systemInfo.windowHeight;
                return this.bannerAd_jiesuanjiemian || (this.bannerAd_jiesuanjiemian = window.wx.createBannerAd({
                    adUnitId: i.ad_id,
                    style: {
                        left: 0,
                        top: s - 100,
                        width: o
                    }
                }), this.bannerAd_jiesuanjiemian.onResize(function(e) {
                    var i = t.Instance.bannerAd_jiesuanjiemian;
                    i && (i.style.left = (n - i.style.realWidth) / 2, i.style.top = s - i.style.realHeight,
                    s / n > 2 && (i.style.top = i.style.top - 25));
                }), this.bannerAd_jiesuanjiemian.onError(function(e) {
                    console.log("广告加载错误:", e), t.Instance.destroyBannerAd_zhujiemianlingqujinbi();
                }), this.bannerAd_jiesuanjiemian.onLoad(function() {})), e ? (console.log("预加载广告"),
                void 0 != this.bannerAd_jiesuanjiemian && this.bannerAd_jiesuanjiemian.hide(), !0) : (void 0 != this.bannerAd_jiesuanjiemian && (0 != a["default"].wudian_level[3] && 1 == a["default"].ctrlInfo.isWudian ? (Laya.timer.clear(this, this.show_jiesuanjiemian),
                Laya.timer.once(a["default"].ctrlInfo.lateDelay[3], this, this.show_jiesuanjiemian),
                console.log("show_jiesuanjiemian NetMgr.ctrlInfo.lateDelay[3] = ", a["default"].ctrlInfo.lateDelay[3])) : (Laya.timer.clear(this, this.show_jiesuanjiemian),
                Laya.timer.once(700, this, this.show_jiesuanjiemian))), !0);
            }, t.prototype.show_jiesuanjiemian = function() {
                this.bannerAd_jiesuanjiemian && (console.log("show_jiesuanjiemian"), this.bannerAd_jiesuanjiemian.show());
            }, t.prototype.hideBannerAd_jiesuanjiemian = function(t) {
                void 0 === t && (t = NaN), this.bannerAd_jiesuanjiemian && this.bannerAd_jiesuanjiemian.hide();
            }, t.prototype.destroyBannerAd_jiesuanjiemian = function() {
                this.bannerAd_jiesuanjiemian && (this.bannerAd_jiesuanjiemian.destroy(), this.bannerAd_jiesuanjiemian = null);
            }, t.prototype.hideBannerAd = function() {
                Laya.timer.clear(this, this.show_zhujiemianlingqujinbi), Laya.timer.clear(this, this.show_shiyongpifu),
                Laya.timer.clear(this, this.show_fuhuo), Laya.timer.clear(this, this.show_jiesuanjinbi),
                Laya.timer.clear(this, this.show_jiesuanjiemian), this.hideBannerAd_fuhuo(), this.hideBannerAd_jiesuanjiemian(),
                this.hideBannerAd_jiesuanjinbi(), this.hideBannerAd_shiyongpifu(), this.hideBannerAd_zhujiemian(),
                this.hideBannerAd_zhujiemianlingqujinbi();
            }, t.prototype.initRewardedVideoAd_shiyongpifu1 = function(e) {
                Laya.Browser.onMiniGame && this.isInited && (this.rewardedVideoAd_shuangbeikaiju = window.wx.createRewardedVideoAd({
                    adUnitId: e
                }), void 0 != this.rewardedVideoAd_shuangbeikaiju && (this.rewardedVideoAd_shuangbeikaiju.onLoad(function() {
                    t.Instance.hasAd_shuangbeikaiju = !0;
                }), this.rewardedVideoAd_shuangbeikaiju.onError(function(e) {
                    t.Instance.hasAd_shuangbeikaiju = !1, null != t.Instance.callBackErro_shuangbeikaiju && t.Instance.callBackErro_shuangbeikaiju(t.Instance.caller_shuangbeikaiju);
                }), this.rewardedVideoAd_shuangbeikaiju.onClose(function(e) {
                    e && e.isEnded || void 0 === e ? (t.Instance.videoPlayedTimes += 1, null != t.Instance.callBackSuc_shuangbeikaiju && t.Instance.callBackSuc_shuangbeikaiju(t.Instance.caller_shuangbeikaiju)) : null != t.Instance.callBackFail_shuangbeikaiju && t.Instance.callBackFail_shuangbeikaiju(t.Instance.caller_shuangbeikaiju);
                })));
            }, t.prototype.showVideo_shiyongpifu1 = function(e, i, a, n, o) {
                this.isInited && (this.caller_shuangbeikaiju = i, this.callBackSuc_shuangbeikaiju = a,
                this.callBackFail_shuangbeikaiju = n, this.callBackErro_shuangbeikaiju = o, this.hasAd_shuangbeikaiju ? (this.hasAd_shuangbeikaiju = !1,
                this.rewardedVideoAd_shuangbeikaiju.show()) : this.rewardedVideoAd_shuangbeikaiju.load().then(function() {
                    t.Instance.rewardedVideoAd_shuangbeikaiju.show(), t.Instance.hasAd_shuangbeikaiju = !1;
                }));
            }, t.prototype.initRewardedVideoAd_shiyongpifu2 = function(e) {
                Laya.Browser.onMiniGame && this.isInited && (this.rewardedVideoAd_zhujiemianduobeijinbi = window.wx.createRewardedVideoAd({
                    adUnitId: e
                }), void 0 != this.rewardedVideoAd_zhujiemianduobeijinbi && (this.rewardedVideoAd_zhujiemianduobeijinbi.onLoad(function() {
                    t.Instance.hasAd_zhujiemianduobeijinbi = !0;
                }), this.rewardedVideoAd_zhujiemianduobeijinbi.onError(function(e) {
                    t.Instance.hasAd_zhujiemianduobeijinbi = !1, null != t.Instance.callBackErro_zhujiemianduobeijinbi ? t.Instance.callBackErro_zhujiemianduobeijinbi(t.Instance.caller_zhujiemianduobeijinbi) : null != t.Instance.callBackSuc_zhujiemianduobeijinbi && t.Instance.callBackSuc_zhujiemianduobeijinbi(t.Instance.caller_zhujiemianduobeijinbi);
                }), this.rewardedVideoAd_zhujiemianduobeijinbi.onClose(function(e) {
                    e && e.isEnded || void 0 === e ? (t.Instance.videoPlayedTimes += 1, null != t.Instance.callBackSuc_zhujiemianduobeijinbi && t.Instance.callBackSuc_zhujiemianduobeijinbi(t.Instance.caller_zhujiemianduobeijinbi)) : null != t.Instance.callBackFail_zhujiemianduobeijinbi && t.Instance.callBackFail_zhujiemianduobeijinbi(t.Instance.caller_zhujiemianduobeijinbi);
                })));
            }, t.prototype.showVideo_shiyongpifu2 = function(e, i, a, n, o) {
                this.isInited && (this.caller_zhujiemianduobeijinbi = i, this.callBackSuc_zhujiemianduobeijinbi = a,
                this.callBackFail_zhujiemianduobeijinbi = n, this.callBackErro_zhujiemianduobeijinbi = o,
                this.hasAd_zhujiemianduobeijinbi ? (this.hasAd_zhujiemianduobeijinbi = !1, this.rewardedVideoAd_zhujiemianduobeijinbi.show()) : this.rewardedVideoAd_zhujiemianduobeijinbi.load().then(function() {
                    t.Instance.rewardedVideoAd_zhujiemianduobeijinbi.show(), t.Instance.hasAd_zhujiemianduobeijinbi = !1;
                }));
            }, t.prototype.initRewardedVideoAd_shiyongpifu = function(e) {
                Laya.Browser.onMiniGame && this.isInited && (this.rewardedVideoAd_shiyongpifu = window.wx.createRewardedVideoAd({
                    adUnitId: e
                }), void 0 != this.rewardedVideoAd_shiyongpifu && (this.rewardedVideoAd_shiyongpifu.onLoad(function() {
                    t.Instance.hasAd_shiyongpifu = !0;
                }), this.rewardedVideoAd_shiyongpifu.onError(function(e) {
                    t.Instance.hasAd_shiyongpifu = !1, null != t.Instance.callBackErro_shiyongpifu ? t.Instance.callBackErro_shiyongpifu(t.Instance.caller_shiyongpifu) : null != t.Instance.callBackSuc_shiyongpifu && t.Instance.callBackSuc_shiyongpifu(t.Instance.caller_shiyongpifu);
                }), this.rewardedVideoAd_shiyongpifu.onClose(function(e) {
                    n["default"].soundMgr.playMusic(o.SoundType.BGM), e && e.isEnded || void 0 === e ? (t.Instance.videoPlayedTimes += 1,
                    null != t.Instance.callBackSuc_shiyongpifu && t.Instance.callBackSuc_shiyongpifu(t.Instance.caller_shiyongpifu)) : null != t.Instance.callBackFail_shiyongpifu && t.Instance.callBackFail_shiyongpifu(t.Instance.caller_shiyongpifu);
                })));
            }, t.prototype.showVideo_shiyongpifu = function(e, i, a, n, o) {
                this.isInited && (this.caller_shiyongpifu = i, this.callBackSuc_shiyongpifu = a,
                this.callBackFail_shiyongpifu = n, this.callBackErro_shiyongpifu = o, this.hasAd_shiyongpifu ? (this.hasAd_shiyongpifu = !1,
                this.rewardedVideoAd_shiyongpifu.show()) : this.rewardedVideoAd_shiyongpifu.load().then(function() {
                    t.Instance.rewardedVideoAd_shiyongpifu.show(), t.Instance.hasAd_shiyongpifu = !1;
                }));
            }, t.prototype.initRewardedVideoAd_fuhuo = function(e) {
                Laya.Browser.onMiniGame && this.isInited && (this.rewardedVideoAd_fuhuo = window.wx.createRewardedVideoAd({
                    adUnitId: e
                }), void 0 != this.rewardedVideoAd_fuhuo && (this.rewardedVideoAd_fuhuo.onLoad(function() {
                    t.Instance.hasAd_fuhuo = !0;
                }), this.rewardedVideoAd_fuhuo.onError(function(e) {
                    t.Instance.hasAd_fuhuo = !1, null != t.Instance.callBackErro_fuhuo && t.Instance.callBackErro_fuhuo(t.Instance.caller_fuhuo);
                }), this.rewardedVideoAd_fuhuo.onClose(function(e) {
                    e && e.isEnded || void 0 === e ? (t.Instance.videoPlayedTimes += 1, null != t.Instance.callBackSuc_fuhuo && t.Instance.callBackSuc_fuhuo(t.Instance.caller_fuhuo)) : null != t.Instance.callBackFail_fuhuo && t.Instance.callBackFail_fuhuo(t.Instance.caller_fuhuo);
                })));
            }, t.prototype.showVideo_fuhuo = function(e, i, a, n, o) {
                this.isInited && (this.caller_fuhuo = i, this.callBackSuc_fuhuo = a, this.callBackFail_fuhuo = n,
                this.callBackErro_fuhuo = o, this.hasAd_fuhuo ? (this.hasAd_fuhuo = !1, this.rewardedVideoAd_fuhuo.show()) : this.rewardedVideoAd_fuhuo.load().then(function() {
                    t.Instance.rewardedVideoAd_fuhuo.show(), t.Instance.hasAd_fuhuo = !1;
                }));
            }, t.prototype.initRewardedVideoAd_shiyongpifu3 = function(e) {
                Laya.Browser.onMiniGame && this.isInited && (this.rewardedVideoAd_jiesuanjinbi = window.wx.createRewardedVideoAd({
                    adUnitId: e
                }), void 0 != this.rewardedVideoAd_jiesuanjinbi && (this.rewardedVideoAd_jiesuanjinbi.onLoad(function() {
                    t.Instance.hasAd_jiesuanjinbi = !0;
                }), this.rewardedVideoAd_jiesuanjinbi.onError(function(e) {
                    t.Instance.hasAd_jiesuanjinbi = !1, null != t.Instance.callBackErro_jiesuanjinbi ? t.Instance.callBackErro_jiesuanjinbi(t.Instance.caller_jiesuanjinbi) : null != t.Instance.callBackSuc_jiesuanjinbi && t.Instance.callBackSuc_jiesuanjinbi(t.Instance.caller_jiesuanjinbi);
                }), this.rewardedVideoAd_jiesuanjinbi.onClose(function(e) {
                    e && e.isEnded || void 0 === e ? (t.Instance.videoPlayedTimes += 1, null != t.Instance.callBackSuc_jiesuanjinbi && t.Instance.callBackSuc_jiesuanjinbi(t.Instance.caller_jiesuanjinbi)) : null != t.Instance.callBackFail_jiesuanjinbi && t.Instance.callBackFail_jiesuanjinbi(t.Instance.caller_jiesuanjinbi);
                })));
            }, t.prototype.showVideo_shiyongpifu3 = function(e, i, a, n, o) {
                this.isInited && (this.caller_jiesuanjinbi = i, this.callBackSuc_jiesuanjinbi = a,
                this.callBackFail_jiesuanjinbi = n, this.callBackErro_jiesuanjinbi = o, this.hasAd_jiesuanjinbi ? (this.hasAd_jiesuanjinbi = !1,
                this.rewardedVideoAd_jiesuanjinbi.show()) : this.rewardedVideoAd_jiesuanjinbi.load().then(function() {
                    t.Instance.rewardedVideoAd_jiesuanjinbi.show(), t.Instance.hasAd_jiesuanjinbi = !1;
                }));
            }, t.prototype.initRewardedVideoAd_shiyongpifu4 = function(e) {
                Laya.Browser.onMiniGame && this.isInited && (this.rewardedVideoAd_shangcheng = window.wx.createRewardedVideoAd({
                    adUnitId: e
                }), void 0 != this.rewardedVideoAd_shangcheng && (this.rewardedVideoAd_shangcheng.onLoad(function() {
                    t.Instance.hasAd_shangcheng = !0;
                }), this.rewardedVideoAd_shangcheng.onError(function(e) {
                    t.Instance.hasAd_shangcheng = !1, null != t.Instance.callBackErro_shangcheng ? t.Instance.callBackErro_shangcheng(t.Instance.caller_shangcheng) : null != t.Instance.callBackSuc_shangcheng && t.Instance.callBackSuc_shangcheng(t.Instance.caller_shangcheng);
                }), this.rewardedVideoAd_shangcheng.onClose(function(e) {
                    e && e.isEnded || void 0 === e ? (t.Instance.videoPlayedTimes += 1, null != t.Instance.callBackSuc_shangcheng && t.Instance.callBackSuc_shangcheng(t.Instance.caller_shangcheng)) : null != t.Instance.callBackFail_shangcheng && t.Instance.callBackFail_shangcheng(t.Instance.caller_shangcheng);
                })));
            }, t.prototype.showVideo_shiyongpifu4 = function(e, i, a, n, o) {
                this.isInited && (this.caller_shangcheng = i, this.callBackSuc_shangcheng = a, this.callBackFail_shangcheng = n,
                this.callBackErro_shangcheng = o, this.hasAd_shangcheng ? (this.hasAd_shangcheng = !1,
                this.rewardedVideoAd_shangcheng.show()) : this.rewardedVideoAd_shangcheng.load().then(function() {
                    t.Instance.rewardedVideoAd_shangcheng.show(), t.Instance.hasAd_shangcheng = !1;
                }));
            }, t;
        }();
        i["default"] = s;
    }, {
        "../../LayaSample": 3,
        "../../manager/NetMgr": 12,
        "../../manager/SoundMgr": 13
    } ],
    22: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a, n = t("../other/MyUtils"), o = t("../LayaSample");
        !function(t) {
            t[t.LEFT = 0] = "LEFT", t[t.RIGHT = 1] = "RIGHT";
        }(a || (a = {}));
        var s = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._cellWidth = 101, e._cellHeight = 128, e._spaceX = 20, e.speedTime = 500,
                e.itemWidth = 101, e;
            }
            return __extends(e, t), e.prototype.init = function(t) {
                this._cellWidth = t._cellWidth || 108, this._spaceX = t._spaceX || 31, this.speedTime = t.speedTime || 500,
                this._cellHeight = t._cellHeight || 108;
            }, e.prototype.start = function(t, e, i) {
                if (!n["default"].isNull(t)) {
                    var o = this;
                    this.owner.removeChildren(), this._cells = [];
                    var s = t.length > 4 ? !0 : !1;
                    this.posY = (this.owner.height - this._cellHeight) / 2;
                    for (var r, h = function() {
                        r = t[d];
                        var a = new Laya.Image(), n = new Laya.Image();
                        l.owner.addChild(a);
                        var h = new Laya.Text();
                        a.addChild(h), a.addChild(n), s ? a.pos((d - 1) * (l._cellWidth + l._spaceX), l.posY) : a.pos(d * (l._cellWidth + l._spaceX), l.posY),
                        n.skin = r.param, n.width = l._cellWidth, n.height = l._cellHeight, a.width = l._cellWidth,
                        a.height = 140, h.y = 118, h.width = l._cellWidth, h.height = 24, h.fontSize = 24,
                        h.color = "#4A4A4A", h.align = "center", h.valign = "middle", h.zOrder = 10;
                        var c = d;
                        a.on(Laya.Event.MOUSE_DOWN, l, function() {
                            o.startTime = Laya.timer.currTimer;
                        }), a.on(Laya.Event.MOUSE_UP, l, function() {
                            Laya.timer.currTimer - o.startTime <= 200 && o.tiaozhuang(t[c], e, i), o.startTime = Laya.timer.currTimer;
                        }), l._cells.push(a);
                    }, l = this, d = 0; d < t.length; d++) h();
                    this.fristPosX = this._cells[0].x, this.endPosX = this._cells[this._cells.length - 1].x,
                    this.moveDirection = a.RIGHT, this._mouseDown = !1, this.autoMove(), this.owner.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
                    this.owner.on(Laya.Event.MOUSE_UP, this, this.mouseUp), this.owner.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove),
                    this.owner.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
                }
            }, e.prototype.tiaozhuang = function(t, e, i) {
                var a = {
                    my_uuid: e,
                    to_appid: t.appid,
                    appid: t.appid,
                    toLinks: t.toLinks
                };
                a.callback = function() {
                    n["default"].ald(i + "广告位跳出成功", {
                        path: t.toLinks,
                        appId: t.appid,
                        position: t.position
                    });
                }, n["default"].ald(i + "广告位跳出", {
                    path: t.toLinks,
                    appId: t.appid,
                    position: t.position
                }), o["default"].netMgr.navigateToMiniProgram(a);
            }, e.prototype.autoMove = function() {
                this._cells.length <= 4 || (Laya.timer.clearAll(this), Laya.timer.loop(10, this, function() {
                    this.move();
                }));
            }, e.prototype.move = function() {
                for (var t = -(this._cells[0].x - this.fristPosX), e = (Math.abs(this.speedTime / (this._cellWidth + this._spaceX) * t),
                0); e < this._cells.length; e++) {
                    var i = this._cells[e];
                    i.pos(i.x - .5, this.posY);
                }
                this._cells[this._cells.length - 1].x > this.endPosX && this.endMoveToFrist(), this._cells[0].x < this.fristPosX && this.firstMoveToEnd();
            }, e.prototype.firstMoveToEnd = function() {
                var t = this._cells[this._cells.length - 1], e = this._cells.shift();
                e.pos(t.x + this._cellWidth + this._spaceX, this.posY), this._cells.push(e);
            }, e.prototype.endMoveToFrist = function() {
                var t = this._cells[0], e = this._cells.pop(), i = t.x - this._cellWidth - this._spaceX;
                e.pos(i, t.y), this._cells.unshift(e);
            }, e.prototype.mouseDown = function() {
                this._mouseDown = !0, Laya.timer.clearAll(this), this._mouseX = this._mouseX = Laya.MouseManager.instance.mouseX,
                Laya.timer.clearAll(this);
                for (var t = 0; t < this._cells.length; t++) {
                    var e = this._cells[t];
                    Laya.Tween.clearAll(e);
                }
            }, e.prototype.mouseMove = function() {
                if (this._mouseDown) {
                    var t = Laya.MouseManager.instance.mouseX - this._mouseX;
                    this._mouseX = Laya.MouseManager.instance.mouseX;
                    for (var e = 0; e < this._cells.length; e++) {
                        var i = this._cells[e];
                        i.pos(i.x + t, this.posY);
                    }
                    this._cells[this._cells.length - 1].x > this.endPosX && this.endMoveToFrist(), this._cells[0].x < this.fristPosX && this.firstMoveToEnd();
                }
            }, e.prototype.mouseUp = function(t) {
                this._mouseDown = !1, this.autoMove();
            }, e;
        }(Laya.Script);
        i["default"] = s;
    }, {
        "../LayaSample": 3,
        "../other/MyUtils": 17
    } ],
    23: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../other/MyUtils"), n = t("../LayaSample"), o = t("../platforms/wx/WxAdManager"), s = t("../other/ConfigData"), r = t("../manager/GameMgr"), h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.appid = "", e._isOver = !1, e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                t.prototype.onAwake.call(this), this.homeBtn = this.owner.getChildByName("homeBtn"),
                a["default"].autoScreenSize([ this.homeBtn ]), this.view = this.owner, this.adList = this.owner.getChildByName("list"),
                this.adList.vScrollBarSkin = "", this.adList.selectEnable = !0, this.adList.y = 20,
                this.adList.renderHandler = new Laya.Handler(this, this.onRender), this.adList.mouseHandler = new Laya.Handler(this, this.onClickItem),
                Laya.stage.height > 1334 && (this.adList.y = 20 + (Laya.stage.height - 1334) / 2),
                o["default"].Instance.hideBannerAd(), this.okBtn = this.owner.getChildByName("okBtn"),
                this.okBtn.bottom = 0, this.homeBtn = this.owner.getChildByName("homeBtn");
            }, e.prototype.onEnable = function() {
                this.initEvent(), this.initData();
            }, e.prototype.initEvent = function() {
                console.log("njnnnnnnnnnnnnnnn")
                this.okBtn.on(Laya.Event.CLICK, this, this.clickPlay), this.homeBtn.on(Laya.Event.CLICK, this, this.clickHome);
            }, e.prototype.initData = function() {
                var t = this;
                this.homeBtn.visible = !1;
                var e = [];
                null == this.adList.array && (e = a["default"].getAdData(1004), this.adList.array = e),
                this.adList.refresh(), this.adList.scrollTo(0), Laya.timer.once(1e3, this, function() {
                    t && t.homeBtn && (t.homeBtn.visible = !0);
                }), this._isOver = !1;
            }, e.prototype.clickHome = function() {
                var t = this;
                Laya.Scene.open(r.SceneType.Home, !1, Laya.Handler.create(this, function(e) {
                    n["default"].glEvent.event(s.EventType.INIT_GAME_EVENT, {
                        isPlay: !1
                    }), t.view.close();
                }));
            }, e.prototype.clickPlay = function() {
                this.view.close(), n["default"].glEvent.event(s.EventType.INIT_GAME_EVENT, {
                    isPlay: !1
                }), n["default"].glEvent.event(s.EventType.PLAY_GAME_EVENT);
            }, e.prototype.onClickItem = function(t, e) {
                if (t.type == Laya.Event.CLICK && t.target instanceof Laya.Box) {
                    var i = this.adList.array[e], o = {
                        my_uuid: i.position,
                        to_appid: i.appid,
                        appid: i.appid,
                        toLinks: i.toLinks
                    };
                    o.callback = function() {
                        a["default"].ald("聚合页广告位跳出成功", {
                            path: i.toLinks,
                            appId: i.appid,
                            position: i.position
                        });
                    }, a["default"].ald("聚合页广告位跳出", {
                        path: i.toLinks,
                        appId: i.appid,
                        position: i.position
                    }), n["default"].netMgr.navigateToMiniProgram(o);
                }
            }, e.prototype.onRender = function(t, e) {
                if (!(e > this.adList.array.length && 0 == this.adList.array.length) && null != this.adList.array[e]) {
                    var i = t.getChildByName("img");
                    i.skin = this.adList.array[e].param;
                }
            }, e;
        }(Laya.Script);
        i["default"] = h;
    }, {
        "../LayaSample": 3,
        "../manager/GameMgr": 11,
        "../other/ConfigData": 16,
        "../other/MyUtils": 17,
        "../platforms/wx/WxAdManager": 21
    } ],
    24: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a, n = t("../other/MyUtils"), o = t("../LayaSample");
        !function(t) {
            t[t.UP = 0] = "UP", t[t.DOWN = 1] = "DOWN";
        }(a || (a = {}));
        var s = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.moveSpeed = .5, e._itemHeight = 244, e._itemWidth = 184, e._spaceX = 14,
                e._spaceY = 14, e._repeatX = 3, e._repeatY = 3, e.speedTime = 500, e.viewHeight = 503,
                e;
            }
            return __extends(e, t), e.prototype.start = function(t) {
                if (!n["default"].isNull(t)) {
                    this.owner.removeChildren(), this._cells = [], this.adInfos = t;
                    for (var e = 0, i = new r(), o = this, s = function() {
                        var t = o.adInfos[l], a = new Laya.Image();
                        h.owner.addChild(a);
                        var n = h._cells.length * (h._itemHeight + h._spaceY);
                        a.pos(e * (h._itemWidth + h._spaceX), n), a.skin = t.param, a.width = h._itemWidth,
                        a.height = h._itemHeight, a.on(Laya.Event.MOUSE_DOWN, h, function() {
                            o.startTime = Laya.timer.currTimer;
                        }), a.name = l.toString(), a.on(Laya.Event.MOUSE_UP, h, function() {
                            var t = Number(a.name), e = o.adInfos[t];
                            Laya.timer.currTimer - o.startTime <= 200 && o.tiaozhuang(e, 1003), o.startTime = Laya.timer.currTimer;
                        }), e++, i._posY = n, i._cells.push(a), e > 2 && (h._cells.push(i), e = 0, i = new r());
                    }, h = this, l = 0; l < o.adInfos.length; l++) s();
                    0 != e && this._cells.push(i), this.fristPosY = 0, this.endPosY = this.viewHeight - this._itemHeight,
                    this.setDirtion(a.DOWN), this._mouseDown = !1, this.autoMove(), this.owner.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
                    this.owner.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove), this.owner.on(Laya.Event.MOUSE_UP, this, this.mouseUp),
                    this.owner.on(Laya.Event.MOUSE_OUT, this, this.mouseUp), this.owner.on(Laya.Event.FOCUS_CHANGE, this, this.mouseUp);
                }
            }, e.prototype.autoMove = function() {
                var t = this;
                Laya.timer.clearAll(this), Laya.timer.loop(10, this, function() {
                    t.move();
                });
            }, e.prototype.move = function() {
                for (var t = -(this._cells[0].getPosY() - this.fristPosY), e = (Math.abs(this.speedTime / (this._itemHeight + this._spaceY) * t),
                0); e < this._cells.length; e++) {
                    var i = this._cells[e];
                    i.setPosY(i.getPosY() + this.moveSpeed);
                }
                this.moveDirection == a.DOWN && this._cells[0].getPosY() > this.fristPosY && this.setDirtion(a.UP),
                this.moveDirection == a.UP && this._cells[this._cells.length - 1].getPosY() < this.endPosY && this.setDirtion(a.DOWN);
            }, e.prototype.setDirtion = function(t) {
                this.moveDirection = t, this.moveDirection == a.DOWN ? this.moveSpeed = .5 : this.moveSpeed = -.5;
            }, e.prototype.tiaozhuang = function(t, e) {
                var i = {
                    my_uuid: e,
                    to_appid: t.appid,
                    appid: t.appid,
                    toLinks: t.toLinks
                };
                i.callback = function() {
                    n["default"].ald("结算页广告位跳出成功", {
                        path: t.toLinks,
                        appId: t.appid,
                        position: t.position
                    });
                }, n["default"].ald("结算页广告位跳出", {
                    path: t.toLinks,
                    appId: t.appid,
                    position: t.position
                }), o["default"].netMgr.navigateToMiniProgram(i);
            }, e.prototype.mouseDown = function() {
                Laya.timer.clearAll(this), this._mouseDown = !0, this._mouseY = Laya.MouseManager.instance.mouseX;
            }, e.prototype.mouseMove = function() {
                if (this._mouseDown) {
                    var t = Laya.MouseManager.instance.mouseY - this._mouseY;
                    t = t > 30 ? 30 : -30 > t ? -30 : t, this._mouseY = Laya.MouseManager.instance.mouseY,
                    t > 0 && this._cells[0].getPosY() + t > this.fristPosY && (t = this.fristPosY - this._cells[0].getPosY()),
                    0 > t && this._cells[this._cells.length - 1].getPosY() + t < this.endPosY && (t = this.endPosY - this._cells[this._cells.length - 1].getPosY());
                    for (var e = 0; e < this._cells.length; e++) {
                        var i = this._cells[e];
                        i.setPosY(i.getPosY() + t);
                    }
                }
            }, e.prototype.mouseUp = function(t) {
                this._mouseDown = !1, this._mouseY = 0, this.autoMove();
            }, e;
        }(Laya.Script);
        i["default"] = s;
        var r = function() {
            function t() {
                this._cells = [], this._posY = 0;
            }
            return t.prototype.setPosY = function(t) {
                for (var e = 0; e < this._cells.length; e++) {
                    var i = this._cells[e], a = i.x;
                    i.pos(a, t);
                }
                this._posY = t;
            }, t.prototype.getPosY = function() {
                return this._posY;
            }, t;
        }();
    }, {
        "../LayaSample": 3,
        "../other/MyUtils": 17
    } ],
    25: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../other/MyUtils"), n = t("../LayaSample"), o = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.isClick = !1, e.toLinks = "", e.toAppId = "", e.thePosition = 1, e.nowidx = 0,
                e.maxdix = 0, e.isAnim = !0, e.isChange = !1, e.lastRand = 0, e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                this.owner.on(Laya.Event.CLICK, this, this.jumpOtherGame);
            }, e.prototype.init = function(t) {
                this.typeScene = t, this.adImg = this.owner.getChildByName("ADImg");
            }, e.prototype.start = function(t, e, i) {
                Laya.Tween.clearAll(this);
                var n = a["default"].getAdData(i);
                return !n || n.length <= 0 ? void (this.owner.visible = !1) : (this.owner.visible = !0,
                this.owner.rotation = 0, this.owner.scale(1, 1), this.isAnim = t, this.isChange = e,
                this.thePosition = i, this.nowidx = 0, this.maxdix = n.length - 1, this.randomAD(),
                this.isAnim && this.adAnim(), Laya.timer.clearAll(this), void this.startAnim());
            }, e.prototype.startAnim = function() {
                var t = this, e = a["default"].getAdData(this.thePosition);
                Laya.timer.loop(1e4, this, function() {
                    null != e ? e.length > 1 && t.isChange ? t.changeAD() : t.randomAD() : t.isChange ? t.changeAD() : t.randomAD();
                });
            }, e.prototype.randomAD = function() {
                var t = a["default"].getAdData(this.thePosition);
                if (t) {
                    var e = (t.length, a["default"].random(0, this.maxdix));
                    this.lastRand == e && (e += 1, e > this.maxdix && (e = 0)), this.lastRand = e, this.nowidx = e,
                    this.toAppId = t[this.nowidx].appid, this.toLinks = t[this.nowidx].toLinks, this.adImg ? this.adImg.skin = t[this.nowidx].param : this.owner.skin = t[this.nowidx].param;
                }
            }, e.prototype.changeAD = function() {
                var t = this, e = this.owner;
                e.scale(1, 1), Laya.Tween.clearAll(e), Laya.Tween.to(e, {
                    scaleX: 0,
                    scaleY: 0
                }, 300, null, Laya.Handler.create(this, function() {
                    t.randomAD(), Laya.Tween.to(e, {
                        scaleX: 0,
                        scaleY: 0
                    }, 100, null, Laya.Handler.create(t, function() {
                        Laya.Tween.to(e, {
                            scaleX: 1,
                            scaleY: 1
                        }, 300, null, Laya.Handler.create(t, function() {
                            t.adAnim();
                        }));
                    }));
                }));
            }, e.prototype.adAnim = function() {
                var t = this, e = this.owner;
                e.rotation = 0, Laya.Tween.clearAll(e), Laya.Tween.to(e, {
                    rotation: 10
                }, 300, null, Laya.Handler.create(this, function() {
                    Laya.Tween.to(e, {
                        rotation: 0
                    }, 300, null, Laya.Handler.create(t, function() {
                        Laya.Tween.to(e, {
                            rotation: -10
                        }, 300, null, Laya.Handler.create(t, function() {
                            Laya.Tween.to(e, {
                                rotation: 0
                            }, 300, null, Laya.Handler.create(t, function() {
                                t.adAnim();
                            }));
                        }));
                    }));
                }));
            }, e.prototype.jumpOtherGame = function() {
            }, e;
        }(Laya.Script);
        i["default"] = o;
    }, {
        "../LayaSample": 3,
        "../other/MyUtils": 17
    } ],
    26: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.size(e.width, e.height), e.initUI(), e;
            }
            return __extends(e, t), e.prototype.initUI = function() {
                var t = Laya.loader.getRes("prefab/rankItem.json"), e = Laya.Pool.getItemByCreateFun("rankItem", t.create, t);
                this.imgBg = e.getChildByName("bg"), this.lblName = e.getChildByName("lblName"),
                this.lblScore = e.getChildByName("lblScore"), this.lblRank = e.getChildByName("lblRank"),
                this.imgAvatar = e.getChildByName("avatar"), this.addChild(e);
            }, e.prototype.setRankItem = function(t, e) {
                void 0 === e && (e = !1);
                var i = t.nickname.length > 6 ? t.nickname.substr(0, 8) : t.nickname;
                this.lblName.text = "" != i ? i : "神秘玩家";
                var a = 28, n = t.index;
                0 == t.index && (a = 24, n = "未上榜"), this.lblRank.fontSize = a, this.lblRank.text = n,
                this.lblScore.text = t.score;
                var o = "";
                o = "youke" == t.headImage || "" == t.headImage ? "rank/avater_default.png" : t.headImage;
                var s = "rank/W_pab_d3.png";
                e && (s = "rank/W_pab_d4.png"), this.imgBg.skin = s, this.imgBg.width = 559, this.imgAvatar.loadImage(o);
            }, e;
        }(Laya.Box);
        i["default"] = a;
    }, {} ],
    27: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.icon = null, e.getTypeTag = null, e.initItem(), e;
            }
            return __extends(e, t), e.prototype.onDisable = function() {}, e.prototype.initItem = function() {
                if (!e.itemPrefab) return void console.error("app prefab is null");
                var t = Laya.Pool.getItemByCreateFun("SkinItem", e.itemPrefab.create, e.itemPrefab);
                this.icon = t.getChildByName("skinIcon"), this.getTypeTag = t.getChildByName("maskBg"),
                t.size(e.itemWidth, e.itemHeight), this.addChild(t);
            }, e.prototype.setItemInfo = function(t) {
                null != t && (this.icon.skin = t.iconPath);
            }, e.itemWidth = 128, e.itemHeight = 128, e.itemPrefab = null, e.iconWidth = 155,
            e.iconHeight = 99, e.iconOffset = Laya.Vector2.ZERO, e;
        }(Laya.Box);
        i["default"] = a;
    }, {} ],
    28: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../LayaSample"), n = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._maxBottom = 204, e._minBottom = 0, e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                this.initData(), this.initUI(), this.initEvent(), this.initSize(this), this.setOpenDomainOffset();
            }, e.prototype.onOpened = function(t) {}, e.prototype.onClosed = function() {
                Laya.timer.clearAll(this), a["default"].glEvent.offAllCaller(this);
            }, e.prototype.initData = function() {
                this._isOpen = !0;
            }, e.prototype.initUI = function() {}, e.prototype.initEvent = function() {}, e.prototype.getChild = function(t, e) {
                return e || (e = this), e.getChildByName(t);
            }, e.prototype.setOpenDomainOffset = function() {
                var t = Laya.stage.width - 750;
                0 > t && (t = 0);
                var e = Laya.stage.height - 1334;
                0 > e && (e = 0), this.offset = new Laya.Vector2(t, e);
            }, e.prototype.initSize = function(t) {
                this.x = (Laya.stage.width - this.width)/2;
                this.height = Laya.stage.height;
            }, e;
        }(Laya.Scene);
        i["default"] = n;
    }, {
        "../LayaSample": 3
    } ],
    29: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./BaseView"), n = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                t.prototype.onAwake.call(this);
            }, e.prototype.initUI = function() {
                this.btnCancel = this.getChild("btnCancel");
            }, e.prototype.initEvent = function() {
                var t = this;
                this.btnCancel.on(Laya.Event.CLICK, this, function() {
                    t.close();
                });
            }, e;
        }(a["default"]);
        i["default"] = n;
    }, {
        "./BaseView": 28
    } ],
    30: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./BaseView"), n = t("../LayaSample"), o = t("../uiComp/AdListLoop"), s = t("../uiComp/OverAdListLoop"), r = t("../other/MyUtils"), h = t("../manager/NetMgr"), l = t("../platforms/wx/WxAdManager"),
        d = t("../other/ConfigData"), c = t("../manager/GameMgr"), u = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this;
            }
            return __extends(e, t), e.prototype.initData = function() {
                n["default"].wxMgr.settlementLevel(n["default"].commonData.newScore);
            }, e.prototype.initUI = function() {
                this.bottom = this.getChild("bottom"), this.btnBack = this.getChild("btnBack", this.bottom),
                this.btnPlay = this.getChild("btnPlay", this.bottom), this.btnShare = this.getChild("btnShare", this.bottom);
                var t = this.getChild("content");
                var a = this.getChild("score");
                this.fontScore = this.getChild("fontScore", a),
                this.fontScore.value = n["default"].commonData.newScore.toString();

                var gameStatus = n["default"].storageMgr.getGameStatus();
                var lblScoreb = this.getChild("lblScoreb", a);
                lblScoreb.text = gameStatus.maxScore;
                if(n["default"].commonData.newScore > gameStatus.maxScore){
                    lblScoreb.text = n["default"].commonData.newScore;
                }

                let content  = this.getChild("content");

                this.listAd  = this.getChild("listAd",content);
                console.log("--fx--initUI--");
                return false;

                if(YYGSDK.isGamedistribution){
                    this.listAd.visible = false;
                }else{
                    this.listAd.renderHandler = new Laya.Handler(this,function(e){
                        e.offAll(Laya.Event.MOUSE_DOWN);
                        e.on(Laya.Event.MOUSE_DOWN,e,()=>{platform.getInstance().navigate("GAME","MORE",e.dataSource.id)});
                    })
                    this.listAd.array = platform.getInstance().getForgames();
                }




            }, e.prototype.initEvent = function() {
                console.log("aaaadfafasfasdfasfas");
                 this.btnPlay.on(Laya.Event.CLICK, this, this.clickPlay),
                this.btnBack.on(Laya.Event.CLICK, this, this.clickBack);
            }, e.prototype.showADPanel = function() {
            }, e.prototype.hideADPanel = function() {
            }, e.prototype.ShowBanner = function() {
            }, e.prototype.onOpened = function() {
                // this.bottom.bottom = 300,
                 this.bottom.visible = !0;
            }, e.prototype.onClosed = function() {
                t.prototype.onClosed.call(this), l["default"].Instance.hideBannerAd();
            }, e.prototype.clickShare = function() {
            }, e.prototype.clickPlay = function() {
                console.log("--fx--clickPlay--");
                this.close(), n["default"].commonData.construction = Math.floor(3 * Math.random()),
                    n["default"].glEvent.event(d.EventType.INIT_GAME_EVENT, {
                        isPlay: !1
                    }), n["default"].glEvent.event(d.EventType.PLAY_GAME_EVENT);
                return false;
                platform.getInstance().showInterstitial(()=>{
                    this.close(), n["default"].commonData.construction = Math.floor(3 * Math.random()),
                    n["default"].glEvent.event(d.EventType.INIT_GAME_EVENT, {
                        isPlay: !1
                    }), n["default"].glEvent.event(d.EventType.PLAY_GAME_EVENT);
                })
            }, e.prototype.clickBack = function() {
                this.close(), n["default"].commonData.construction = Math.floor(3 * Math.random()),
                1 == h["default"].ctrlInfo.backHomeControl ? Laya.Scene.open(c.SceneType.Converge, !1) : (Laya.Scene.open(c.SceneType.Home, !1),
                n["default"].glEvent.event(d.EventType.INIT_GAME_EVENT, {
                    isPlay: !1
                }));
            }, e;
        }(a["default"]);
        i["default"] = u;
    }, {
        "../LayaSample": 3,
        "../manager/GameMgr": 11,
        "../manager/NetMgr": 12,
        "../other/ConfigData": 16,
        "../other/MyUtils": 17,
        "../platforms/wx/WxAdManager": 21,
        "../uiComp/AdListLoop": 22,
        "../uiComp/OverAdListLoop": 24,
        "./BaseView": 28
    } ],
    31: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./BaseView"), n = t("../LayaSample"), o = t("../comp/CameraFollow"), s = t("../comp/AiCar"), r = t("../comp/Player"), h = t("../other/MyUtils"), l = t("../comp/CreateModel"), d = t("../manager/SoundMgr"), c = t("../other/ConfigData"), u = t("../manager/GameMgr"), p = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.speedFactor = .1, e.constructionArray = [ "Construction", "Construction_2", "Construction_3", "Construction_4", "Construction_5", "Construction_6", "Construction_7", "Construction_8", "Construction_9" ],
                e.skyM = [], e.maxDis = 0, e.circleScore = 0, e.carHitTime = 0, e.carHitScore = 0,
                e.guideProcess = 0, e;
            }
            return __extends(e, t), e.prototype.initData = function() {
                n["default"].commonData.gameCount = 0, n["default"].commonData.isShowSkin = !0,
                this.targetPos = new Laya.Vector3(), this.targetRot = new Laya.Vector3(), this.lerpPos = new Laya.Vector3(),
                this.lerpRot = new Laya.Vector3(), this.loadScene(), this.setFog();
            }, e.prototype.initUI = function() {
                var t = this.getChild("topPanel");
                this.barSpeed = this.getChild("barSpeed", t), this.barSpeed.value = 0, this.barSpeed.bar.height = 21,
                this.barSpeed.visible = !1, this.fontScore = this.getChild("fontScore", t), this.fontScore.value = "0",
                this.fontScore.visible = !1, this.circle = this.getChild("circle"), this.circle.alpha = 0,
                this.fontCircleNum = this.getChild("fontCircleNum", this.circle), this.fontAddScore = this.getChild("fontAddScore", this.circle),
                this.imgCircle = this.getChild("imgCircle", this.circle), this.guidePanel = this.getChild("guidePanel"),
                this.sprGuide = this.getChild("sprGuide", this.guidePanel), h["default"].toPosition(this.sprGuide, {
                    x: 539,
                    y: 1075
                }, 1e3, !0), this.imgGuide = this.getChild("imgGuide", this.guidePanel), this.imgGuideRotate = this.getChild("imgGuideRotate"),
                this.imgGuideRotate.visible = !1, this.visible = !1;
            }, e.prototype.initEvent = function() {
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUpEvent), Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownEvent),
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveEvent), n["default"].glEvent.on(c.EventType.UPDATE_SPEED_EVENT, this, this.updateScore),
                n["default"].glEvent.on(c.EventType.INIT_GAME_EVENT, this, this.initGame), n["default"].glEvent.on(c.EventType.OVER_GAME_EVENT, this, this.overGameEvent),
                n["default"].glEvent.on(c.EventType.PLAY_GAME_EVENT, this, this.onPlayGameEvent),
                n["default"].glEvent.on(c.EventType.GOON_GAME_EVENT, this, this.onGoonGameEvent),
                n["default"].glEvent.on(c.EventType.SPEED_UP_EVENT, this, this.updateSpeedBarEvent),
                n["default"].glEvent.on(c.EventType.CIRCLE_COUNT_EVENT, this, this.circleCountEvent),
                n["default"].glEvent.on(c.EventType.CHANGE_SKIN, this, this.changeSkin), n["default"].glEvent.on(c.EventType.HIT_CAR_EVENT, this, this.addPlayerScore);
            }, e.prototype.loadScene = function() {
                var t = Laya.loader.getRes(n["default"].commonData.scenes);
                Laya.stage.addChild(t), Laya.stage.setChildIndex(t, 0), this.mainScene = t, n["default"].modelCreator.setSkins(),
                this.bike = t.getChildByName("Role"), this.bike.transform.scale = new Laya.Vector3(.8, .8, .8);
                var e = this.getRoleMat(), i = n["default"].modelCreator.getCarModel(e);
                n["default"].commonData.curSkinIndex = e, this.bike.addChild(i.r), this.bike.addChild(i.e),
                i.r.transform.localPosition = new Laya.Vector3(0, -.889, 0), i.e.transform.localPosition = new Laya.Vector3(0, -.2, 0),
                this.targetPos = this.bike.transform.position.clone(), this.bikeComp = this.bike.addComponent(r["default"]),
                this.enermy = t.getChildByName("AI"), this.enermy.transform.scale = new Laya.Vector3(.8, .8, .8),
                i = n["default"].modelCreator.getCarModel(3), this.enermy.addChild(i.r), this.enermy.addChild(i.e),
                i.r.transform.localPosition = new Laya.Vector3(0, -.889, 0), i.e.transform.localPosition = new Laya.Vector3(0, -.2, 0),
                this.enermyComp = this.enermy.addComponent(s["default"]), this.enermy2 = t.getChildByName("AI_2"),
                this.enermy2.transform.scale = new Laya.Vector3(.8, .8, .8), i = n["default"].modelCreator.getCarModel(1),
                this.enermy2.addChild(i.r), this.enermy2.addChild(i.e), i.r.transform.localPosition = new Laya.Vector3(0, -.889, 0),
                i.e.transform.localPosition = new Laya.Vector3(0, -.2, 0), this.enermy2Comp = this.enermy2.addComponent(s["default"]),
                this.mainCamera = this.mainScene.getChildByName("Main Camera"), this.cameraComp = this.mainCamera.addComponent(o["default"]),
                this.light = this.mainScene.getChildByName("Directional Light"), this.skyMaterails = this.mainScene.getChildByName("skyBoxMaterials"),
                n["default"].modelCreator.init(t), this.getMaterails(this.skyMaterails, this.skyM),
                this.loadConstruction(), this.constructionNum = 0, this.roadNum = 1;
                var a = l["default"].getUnitRoadLength(), h = 3;
                n["default"].commonData.needShowGuide && (n["default"].modelCreator.createModels(a),
                this.enermy.active = !1, this.enermy2.active = !1, Laya.timer.frameLoop(1, this, this.newPlayGuide));
                var d = 4;
                Laya.timer.frameLoop(1, this, function() {
                    var t = Math.floor(this.roadNum / d);
                    if (this.bike.transform.position.z > a * (t * d) && this.constructionNum != t) if (console.log("dividend " + t + "    this.roadNum " + this.roadNum + "   this.bike.transform.position.z " + this.bike.transform.position.z),
                    this.constructionNum = t, t % 2 == 0) {
                        var e = this.construction1.transform.position.clone();
                        this.construction1.transform.position = new Laya.Vector3(e.x, e.y, this.startConstruction1PosZ + t * a * d),
                        console.log("_2  ", this.construction1.transform.position);
                    } else {
                        var e = this.construction.transform.position.clone();
                        this.construction.transform.position = new Laya.Vector3(e.x, e.y, this.startConstructionPosZ + (t + 1) * a * d),
                        console.log("_  ", this.construction.transform.position);
                    }
                    this.bike.transform.position.z > a * this.roadNum && (this.roadNum++, this.roadNum % 2 != 0 || n["default"].commonData.needShowGuide || n["default"].modelCreator.randomCreateModels(a * (this.roadNum + h)));
                });
            }, e.prototype.loadConstruction = function() {
                var t = 0;
                t = n["default"].commonData.construction, this.construction = this.mainScene.getChildByName(this.constructionArray[0 + 3 * t]),
                this.construction1 = this.mainScene.getChildByName(this.constructionArray[1 + 3 * t]),
                this.construction2 = this.mainScene.getChildByName(this.constructionArray[2 + 3 * t]),
                this.startConstructionPosZ = this.construction.transform.position.z, this.startConstruction1PosZ = this.construction1.transform.position.z,
                this.startconstruction2Pos = this.construction2.transform.position.clone(), this.construction.active = !0,
                this.construction1.active = !0, this.construction2.active = !0, this.light.intensity = .8,
                this.mainScene.skyRenderer.material = this.skyM[0], this.mainScene.ambientColor = h["default"].getRGB("#7C8390"),
                n["default"].modelCreator.changeModelLight(1), 0 == t ? (this.mainScene.fogColor = h["default"].getRGB("#E1D8A4"),
                this.light.color = h["default"].getRGB("#98885D"), this.light.intensity = 1.1) : 1 == t ? (this.mainScene.fogColor = h["default"].getRGB("#BDDEE3"),
                this.light.color = h["default"].getRGB("#DFD7C2")) : 2 == t ? (this.mainScene.fogColor = h["default"].getRGB("#DADCE1"),
                this.mainScene.ambientColor = h["default"].getRGB("#525358"), this.light.color = h["default"].getRGB("#B2BFD6"),
                this.mainScene.skyRenderer.material = this.skyM[1], n["default"].modelCreator.changeModelLight(1.2)) : (this.mainScene.fogColor = h["default"].getRGB("#DADCE1"),
                this.mainScene.ambientColor = h["default"].getRGB("#525358"), this.light.color = h["default"].getRGB("#B2BFD6"),
                this.mainScene.skyRenderer.material = this.skyM[1], n["default"].modelCreator.changeModelLight(1.2));
                for (var e = 0; e < this.constructionArray.length; e++) (3 * t > e || e >= 3 * (t + 1)) && (this.constructionOther = this.mainScene.getChildByName(this.constructionArray[e]),
                this.constructionOther.active = !1);
            }, e.prototype.getMaterails = function(t, e) {
                for (var i = t.numChildren, a = 0; i > a; a++) {
                    var n = t.getChildAt(a);
                    e.push(n.meshRenderer.sharedMaterial);
                }
            }, e.prototype.setFog = function() {
                var t = this.mainScene;
                t.enableFog = !0, t.fogStart = 20, t.fogRange = 80;
            }, e.prototype.onMouseDownEvent = function(t) {
                n["default"].gameMgr.isPlay && !n["default"].gameMgr.isOver && (this.guidePanel.visible && 0 == this.guideProcess && this.showGuide(!1),
                n["default"].gameMgr.isMove = !1, Laya.timer.clear(this, this.updatePlayer), Laya.timer.frameLoop(1, this, this.updatePlayer),
                this.fontScore.visible = !0, n["default"].gameMgr.isPressed = !0, this.originPosX = t.stageX);
            }, e.prototype.onMouseUpEvent = function() {
                n["default"].commonData.needShowGuide && this.guideProcess > 0 && (n["default"].gameMgr.isPlay = !0,
                this.imgGuideRotate.visible && (this.imgGuideRotate.visible = !1)), n["default"].gameMgr.isPressed = !1;
            }, e.prototype.onMouseMoveEvent = function(t) {
                if (n["default"].gameMgr.isPressed) {
                    var e = 2.8;
                    if (t.stageX != this.originPosX) {
                        var i = this.bike.transform.position.clone(), a = this.bike.transform.rotationEuler.clone(), o = t.stageX - this.originPosX;
                        (o > 0 && this.maxDis < 0 || 0 > o && this.maxDis > 0) && (this.maxDis = 0), Math.abs(o) > Math.abs(this.maxDis) && (this.maxDis = o),
                        i.x -= .1 * this.maxDis * this.speedFactor, a.z += o / 20, i.x > e ? i.x = e : i.x < -e && (i.x = -e),
                        this.targetPos = i, this.originPosX = t.stageX;
                    }
                }
            }, e.prototype.updatePlayer = function() {
                n["default"].gameMgr.isMove = !0, this.targetPos.setValue(this.targetPos.x, this.bike.transform.position.y, this.bike.transform.position.z),
                Laya.Vector3.lerp(this.bike.transform.position, this.targetPos, .05, this.lerpPos),
                this.bike.transform.position = this.lerpPos, this.construction2.transform.position = new Laya.Vector3(this.startconstruction2Pos.x, this.startconstruction2Pos.y, this.startconstruction2Pos.z + this.lerpPos.z - 1),
                this.targetRot.setValue(this.bike.transform.rotationEuler.x, this.targetRot.y, this.targetRot.z),
                Laya.Vector3.lerp(this.bike.transform.rotationEuler, this.targetRot, .05, this.lerpRot),
                this.bike.transform.rotationEuler = this.lerpRot, !n["default"].gameMgr.isPressed && Math.abs(this.lerpRot.z) < .01 && (n["default"].gameMgr.isMove = !1),
                Math.abs(this.lerpPos.x - this.targetPos.x) < .01 && (this.maxDis = 0);
            }, e.prototype.updateScore = function(t) {
                this.speedFactor = t.speed / t.maxSpeed + .1, this.fontScore.value = (this.bike.transform.position.z - 1 + this.circleScore + this.carHitScore).toFixed(0);
            }, e.prototype.initGame = function(t) {
                n["default"].commonData.needShowGuide ? (this.enermy.active = !1, this.enermy2.active = !1,
                this.guidePanel.y = 0, this.guideProcess = 0, this.imgGuide.skin = "ui/common/font_guide.png",
                Laya.timer.clear(this, this.newPlayGuide), Laya.timer.frameLoop(1, this, this.newPlayGuide),
                this.sprGuide.x = 108, h["default"].toPosition(this.sprGuide, {
                    x: 539,
                    y: 1075
                }, 1e3, !0)) : (this.enermy.active = !0, this.enermy2.active = !0, n["default"].commonData.isShowSkin = !0);
                var e = this.construction1.transform.position.clone();
                this.construction1.transform.position = new Laya.Vector3(e.x, e.y, this.startConstruction1PosZ),
                e = this.construction.transform.position.clone(), this.construction.transform.position = new Laya.Vector3(e.x, e.y, this.startConstructionPosZ),
                e = this.startconstruction2Pos.clone(), this.construction2.transform.position = e,
                this.constructionNum = 0, this.roadNum = 1, this.changeSkin({
                    isPlay: !1
                }), this.loadConstruction(), this.bikeComp.init(), this.enermyComp.init(), this.enermy2Comp.init(),
                this.fontScore.value = "0", this.circleScore = 0, this.carHitTime = 0, this.carHitScore = 0,
                this.visible = t.isPlay, this.showGuide(t.isPlay), n["default"].gameMgr.isPlay = t.isPlay,
                n["default"].gameMgr.isOver = !1, this.targetPos = new Laya.Vector3(), this.targetRot = new Laya.Vector3(),
                this.lerpPos = new Laya.Vector3(), this.lerpRot = new Laya.Vector3(), Laya.timer.once(800, this, function() {
                    n["default"].modelCreator.recoverAll(), n["default"].commonData.needShowGuide && n["default"].modelCreator.createModels(l["default"].getUnitRoadLength());
                }), t.isPlay ? n["default"].commonData.isShowSkin && (n["default"].storageMgr.isSkinTips() && n["default"].commonData.existVideoAd && n["default"].commonData.gameCount % 3 == 0 && Laya.Scene.open(u.SceneType.Skin, !1, {
                    isPlay: !0
                }), n["default"].commonData.gameCount++) : this.cameraComp.init();
            }, e.prototype.onPlayGameEvent = function() {
                return n["default"].commonData.isShowSkin ? void Laya.Scene.open(u.SceneType.Skin, !1, {
                    isPlay: !0
                }) : n["default"].commonData.isShowSkin && n["default"].storageMgr.isSkinTips() && n["default"].commonData.existVideoAd && n["default"].commonData.gameCount % 3 == 0 ? void Laya.Scene.open(u.SceneType.Skin, !1) : void (n["default"].gameMgr.isPlay || (n["default"].commonData.gameCount++,
                n["default"].commonData.isShowSkin = !0, this.cameraComp.startAnim(), n["default"].gameMgr.isPlay = !0,
                this.visible = !0, this.showGuide(!0), this.fontScore.visible = !1, this.mainCamera));
            }, e.prototype.showGuide = function(t) {
                this.guidePanel.visible = t;
            }, e.prototype.onGoonGameEvent = function() {
                n["default"].commonData.goonCount++, n["default"].gameMgr.isPlay || (n["default"].gameMgr.isPlay = !0,
                n["default"].gameMgr.isOver = !1, this.visible = !0, this.showGuide(!1)), this.targetPos = new Laya.Vector3(),
                this.targetRot = new Laya.Vector3(), this.lerpPos = new Laya.Vector3(), this.lerpRot = new Laya.Vector3(),
                this.bikeComp["continue"](), n["default"].modelCreator.recoverAllModels();
            }, e.prototype.overGameEvent = function() {
                this.barSpeed.visible = !1, n["default"].gameMgr.isOver = !0, n["default"].gameMgr.isPlay = !1,
                n["default"].gameMgr.isPressed = !1, this.visible = !1, n["default"].commonData.newScore = Number(this.fontScore.value),
                Laya.timer.clear(this, this.updatePlayer), Laya.timer.once(800, this, function() {
                    n["default"].soundMgr.play(d.SoundType.OVER), Laya.timer.once(1e3, this, function() {
                        n["default"].commonData.goonCount > 0 ? (n["default"].commonData.goonCount = 0,
                        Laya.Scene.open(u.SceneType.Clearing, !1)) : Laya.Scene.open(u.SceneType.Over, !1);
                    });
                });
            }, e.prototype.updateSpeedBarEvent = function(t) {
                if (0 != t.level) {
                    var e = this.barSpeed.getChildAt(1);
                    e.skin = "game/speed_up_" + t.level + "$bar.png";
                }
                this.barSpeed.value = 1 - t.progress, this.barSpeed.visible = 1 != t.progress;
            }, e.prototype.addPlayerScore = function() {
                console.log("加分");
                var t = 50;
                this.fontAddScore.value = "+" + t, this.carHitTime++, this.carHitScore = t * this.carHitTime;
            }, e.prototype.circleCountEvent = function(t) {
                n["default"].wxMgr.playVibrateShort();
                var e = 200, i = this.circle;
                if (this.imgCircle.visible = !0, this.fontCircleNum.visible = !0, -1 == t.circleNum && (this.imgCircle.visible = !1,
                this.fontCircleNum.visible = !1), 0 == t.circleNum && 0 != i.alpha) return h["default"].fromScale(i, 1, e),
                void h["default"].toAlpha(i, 0, e, !1);
                if (0 != t.circleNum) {
                    n["default"].commonData.needShowGuide && (console.log("指引松开手"), this.imgGuideRotate.visible = !0,
                    n["default"].gameMgr.isPlay = !1), i.alpha = 0, i.scaleX = 1, i.scaleY = 1, this.fontCircleNum.value = t.circleNum,
                    h["default"].toAlpha(i, 1, e), h["default"].toScale(i, 1.3, e, !1), this.fontAddScore.y = -50,
                    this.fontAddScore.alpha = 1;
                    var a = 100 * Math.pow(2, t.circleNum - 1);
                    this.circleScore += a, -1 == t.circleNum ? this.fontAddScore.value = "+50" : this.fontAddScore.value = "+" + a;
                    var o = 120;
                    h["default"].toScale(this.fontAddScore, .8, o, !1), h["default"].toPosition(this.fontAddScore, new Laya.Vector2(this.fontAddScore.x, this.fontAddScore.y - 80), o),
                    Laya.timer.once(o + 200, this, function() {
                        h["default"].toPosition(this.fontAddScore, new Laya.Vector2(this.fontAddScore.x, this.fontAddScore.y - 70), o),
                        h["default"].toScale(this.fontAddScore, .6, o, !1), h["default"].toAlpha(this.fontAddScore, 0, o);
                    });
                }
            }, e.prototype.getRoleMat = function() {
                switch (n["default"].commonData.construction) {
                  case 0:
                    return 0;

                  case 1:
                    return 1;

                  case 2:
                    return 2;

                  default:
                    return 0;
                }
            }, e.prototype.newPlayGuide = function() {
                var t = this.bike.transform.position.z;
                0 == this.guideProcess && t > 5 ? (console.log("指引右滑"), this.imgGuide.skin = "ui/common/font_guide_right.png",
                this.guidePanel.y = -650, this.showGuide(!0), this.guideProcess = 1, this.sprGuide.x = 108,
                h["default"].toPosition(this.sprGuide, {
                    x: 539,
                    y: 1075
                }, 1e3, !0, 1)) : 1 == this.guideProcess && t > 40 ? (console.log("指引左滑"), this.imgGuide.skin = "ui/common/font_guide_left.png",
                this.showGuide(!0), this.guideProcess = 2, this.sprGuide.x = 569, h["default"].toPosition(this.sprGuide, {
                    x: 108,
                    y: 1075
                }, 1e3, !0, 1)) : t > 90 && 100 > t ? this.showGuide(!1) : 2 == this.guideProcess && t > 300 && (Laya.timer.clear(this, this.newPlayGuide),
                n["default"].commonData.needShowGuide = !1, this.guideProcess = 0, this.guidePanel.y = 0,
                this.imgGuide.skin = "ui/common/font_guide.png", this.sprGuide.x = 108, h["default"].toPosition(this.sprGuide, {
                    x: 539,
                    y: 1075
                }, 1e3, !0));
            }, e.prototype.changeSkin = function(t) {
                var e = this.getRoleMat();
                if (t.index || (t.index = e), n["default"].commonData.curSkinIndex == t.index) t.isPlay && this.onPlayGameEvent(); else {
                    n["default"].commonData.curSkinIndex = t.index;
                    var i = n["default"].modelCreator.getSkinByIndex(t.index);
                    if (i) {
                        this.bike && (this.bike.destroy(!0), this.mainScene.removeChild(this.bike)), this.bike = i,
                        this.mainScene.addChild(this.bike);
                        var a = i.getComponent(r["default"]);
                        a || (a = i.addComponent(r["default"])), this.bikeComp = a, this.bikeComp.init(),
                        this.cameraComp.changeRole(i), n["default"].modelCreator.changeCar(this.bikeComp),
                        t.isPlay ? this.onPlayGameEvent() : (n["default"].commonData.skinIncome = 0, n["default"].commonData.skinScore = 0);
                    }
                }
            }, e;
        }(a["default"]);
        i["default"] = p;
    }, {
        "../LayaSample": 3,
        "../comp/AiCar": 5,
        "../comp/CameraFollow": 6,
        "../comp/CreateModel": 7,
        "../comp/Player": 8,
        "../manager/GameMgr": 11,
        "../manager/SoundMgr": 13,
        "../other/ConfigData": 16,
        "../other/MyUtils": 17,
        "./BaseView": 28
    } ],
    32: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./BaseView"), n = t("../LayaSample"), o = t("../manager/NetMgr"), s = t("../uiComp/PromotionAnimation"), r = t("../uiComp/AdListLoop"), h = t("../other/MyUtils"), l = t("../platforms/wx/WxAdManager"), d = t("../manager/SoundMgr"), c = t("../other/ConfigData"), u = t("../manager/GameMgr"), p = t("../manager/StatisticsMgr"), f = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.soundSkin = "main/btn_sound_", e.vibrateSkin = "main/btn_vibrate_", e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                t.prototype.onAwake.call(this);
            }, e.prototype.initUI = function() {
                var t = this.getChild("topPanel"), e = this.getChild("bottomui");
                this.setting = this.getChild("setting", t), this.settingS = this.getChild("settingS", this.setting),
                this.img_settings = this.getChild("img_settings", this.settingS), this.btnSound = this.getChild("btnSound", this.img_settings),
                this.setSound(n["default"].storageMgr.isPlaySound()), this.btnVibrate = this.getChild("btnVibrate", this.img_settings),
                this.setVibrate(n["default"].storageMgr.isPlayVibrate()), this.btnStart = this.getChild("btnStart"),
                this.btnPlay = this.getChild("btnPlay", e), this.btnRank = this.getChild("btnRank", e),
                this.btnShare = this.getChild("btnShare", e), this.btnService = this.getChild("btnSvrvice", e),
                this.btnCollect = this.getChild("btnCollect", e),
                this.adPlane = this.getChild("ADPanel");

                this.upList  = this.getChild("upList", this.adPlane);
                return false;
                if(YYGSDK.isGamedistribution){
                    this.upList.visible = false;
                }else{
                    this.upList.renderHandler = new Laya.Handler(this,function(e){
                        e.offAll(Laya.Event.MOUSE_DOWN);
                        e.on(Laya.Event.MOUSE_DOWN,e,()=>{platform.getInstance().navigate("GAME","MORE",e.dataSource.id)});
                    })
                    this.upList.array = platform.getInstance().getForgames();

                }
            }, e.prototype.initEvent = function() {
                // platform.getInstance().canNavigate = true;
                console.log("zhenzhenzhe")
                this.btnSound.on(Laya.Event.CLICK, this, this.clickSound),
                this.btnStart.on(Laya.Event.CLICK, this, this.clickStart),
                this.btnPlay.on(Laya.Event.CLICK, this, this.clickStart),
                this.setting.on(Laya.Event.CLICK, this, this.onClickSetting);
            }, e.prototype.onOpened = function() {
            }, e.prototype.setSound = function(t) {
                var e = t ? "on.png" : "off.png";
                this.btnSound.skin = this.soundSkin + e, laya.media.SoundManager.muted = !t, n["default"].storageMgr.setPlaySound(t),
                t ? n["default"].soundMgr.playMusic(d.SoundType.BGM) : n["default"].soundMgr.stopMusic(d.SoundType.BGM);
            }, e.prototype.setVibrate = function(t) {
            }, e.prototype.onClickSetting = function() {
                this.popSetting ? Laya.Tween.to(this.img_settings, {
                    y: -160
                }, 200 * (this.img_settings.y + 160) / 230) : Laya.Tween.to(this.img_settings, {
                    y: 70
                }, 200 * (70 - this.img_settings.y) / 230), this.popSetting = !this.popSetting;
            }, e.prototype.clickSound = function() {
                this.setSound(!n["default"].storageMgr.isPlaySound());
            }, e.prototype.clickVibrate = function() {
                this.setVibrate(!n["default"].storageMgr.isPlayVibrate());
            }, e.prototype.clickStart = function() {
                console.log("--fx--clickStart--");
                this.close();
                p["default"].instance.startGameStatistics(),
                n["default"].glEvent.event(c.EventType.PLAY_GAME_EVENT);
                return false;
                platform.getInstance().showInterstitial(()=>{
                    platform.getInstance().canNavigate = false;
                    this.close(),
                    p["default"].instance.startGameStatistics(),
                    n["default"].glEvent.event(c.EventType.PLAY_GAME_EVENT);
                })
            }, e.prototype.clickRank = function() {
            }, e.prototype.showADPanel = function() {

            }, e.prototype.hideADPanel = function() {
            }, e.prototype.ShowBanner = function() {
            }, e.prototype.clickService = function() {
                n["default"].wxMgr.openCustomerService();
            }, e.prototype.clickInvite = function() {
                n["default"].wxMgr.shareFriend(0, !1);
            }, e.prototype.clickCollect = function() {
                Laya.Scene.open(u.SceneType.Collect, !1);
            }, e;
        }(a["default"]);
        i["default"] = f;
    }, {
        "../LayaSample": 3,
        "../manager/GameMgr": 11,
        "../manager/NetMgr": 12,
        "../manager/SoundMgr": 13,
        "../manager/StatisticsMgr": 14,
        "../other/ConfigData": 16,
        "../other/MyUtils": 17,
        "../platforms/wx/WxAdManager": 21,
        "../uiComp/AdListLoop": 22,
        "../uiComp/PromotionAnimation": 25,
        "./BaseView": 28
    } ],
    33: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./BaseView"), n = t("../LayaSample"), o = t("../other/ConfigData"), s = t("../manager/GameMgr"), r = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._loadCount = 1, e._loadNum = 0, e._isLoadFinish = !1, e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                t.prototype.onAwake.call(this),
                this.loadRes();

            },

            e.prototype.initSize =function(){
                this.x = 0;
                this.width = Laya.stage.width;
                this.height = Laya.stage.height;

            },

            e.prototype.loadSub = function() {
            }, e.prototype.onOpened = function() {
                n["default"].soundMgr.init(), n["default"].wxMgr.init();
            }, e.prototype.initUI = function() {
                var t = this.getChildByName("viewLoad");
                this.lblPres = t.getChildByName("lblPres"), this.barPres = t.getChildByName("barPres");
            }, e.prototype.initEvent = function() {
                n["default"].glEvent.on(o.EventType.LOAD_FINISH_EVENT, this, this.onLoadFinish);
            }, e.prototype.onLoadFinish = function(t) {
                this._loadNum++, this._loadNum >= this._loadCount && (
                    this.barPres.value = 1, this.lblPres.text = "100%",
                this.loadFinished = !0, this.loadGameScene()
                );
            }, e.prototype.onLoading = function(t) {
                var e = (this._loadNum + t) / (this._loadCount + 1);
                this.barPres.value = e, this.lblPres.text = Math.floor(100 * e) + "%";
            }, e.prototype.loadRes = function() {
                var t = [ {
                    url: n["default"].commonData.scenes,
                    clas: Laya.Scene,
                    priority: 1
                }, {
                    url: n["default"].commonData.models,
                    clas: Laya.Sprite3D,
                    priority: 2
                }, {
                    url: n["default"].commonData.skinList,
                    clas: Laya.Sprite3D,
                    priority: 2
                } ];
                Laya.loader.create(t, Laya.Handler.create(this, this.onLoadFinish, [ {
                    target: "3dres"
                } ], !1), Laya.Handler.create(this, this.onLoading, null, !1)), Laya.loader.on(Laya.Event.ERROR, this, function(t) {
                    console.error("load 3dres error:", t);
                });
            }, e.prototype.loadGameScene = function() {
                console.log("--fx--loadGameScene--");
                this.openGameScene();
                return false;
                platform.getInstance().startup("Car-Rush","d3ce1c5fa9694a8f87ba5e4c757f1f80",()=>{
                    let yad     = new Laya.Image();
                    yad.scale(0.8,0.8);
                    yad.skin    = "common/yad.png";
                    yad.centerX = 0;
                    yad.top     = 10;
                    yad.zOrder  = 1e3;
                    yad.on(Laya.Event.MOUSE_DOWN,yad,()=>{platform.getInstance().navigate("GAME","LOGO")})
                    Laya.stage.addChild(yad);
                    window.yad  = yad;
                    this.openGameScene();

                })
                // Laya.Browser.onMiniGame ? this.loadFinished && this.openGameScene() :;
            }, e.prototype.openGameScene = function() {
                var t = this;
                Laya.Scene.open(s.SceneType.Game, !1, Laya.Handler.create(this, function(e) {
                    Laya.Scene.open(s.SceneType.Home, !1, Laya.Handler.create(t, function(e) {
                        t.close();
                    }));
                }));
            }, e;
        }(a["default"]);
        i["default"] = r;
    }, {
        "../LayaSample": 3,
        "../manager/GameMgr": 11,
        "../other/ConfigData": 16,
        "./BaseView": 28
    } ],
    34: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../uiComp/RankItem"), n = t("./BaseView"), o = t("../LayaSample"), s = t("../other/ConfigData"), r = t("../manager/GameMgr"), h = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.rankBgList = [ "rank/W_pab_d3.png", "rank/W_pab_d3.png", "rank/W_pab_d3.png" ],
                e.worldList = null, e.rankMe = null, e.btnBack = null, e.tabRank = null, e.friendList = null,
                e.existWorldRank = !0, e.worldLoading = 0, e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                this.initUI(), this.initSize(this), this.initEvent(), this.onRankFriend(), this.pageWorldRank = 1,
                this.isLoadedWorldRank = !1, o["default"].wxMgr.worldRank(1), Laya.loader.load("prefab/rankItem.json", Laya.Handler.create(this, this.initList), null, Laya.Loader.PREFAB);
            }, e.prototype.initUI = function() {
                var t = this.getChild("topPanel"), e = this.getChild("node");
                this.btnBack = this.getChild("btnBack", t), this.tabRank = this.getChild("tabRank", e),
                this.world = this.getChild("world", e), this.worldList = this.getChild("list", this.world),
                this.rankMe = this.getChild("rankMe", this.world), this.friend = this.getChild("friend", e),
                this.friendList = this.getChild("list", this.friend), this.touchArea = this.getChild("touchArea", this.friend),
                this.touchArea.alpha = 0;
            }, e.prototype.initEvent = function() {
                this.btnBack.on(Laya.Event.CLICK, this, this.clickClose), this.tabRank.selectHandler = new Laya.Handler(this, this.onRankClick),
                o["default"].glEvent.on(s.EventType.DRAW_WORLD_RANK_EVENT, this, this.onDrawWorldrankEvent);
            }, e.prototype.onClosed = function() {
                t.prototype.onClosed.call(this), Laya.loader.clearRes("prefab/rankItem.json"), o["default"].wxMgr.showFriendRank(!1),
                this.touchArea.offAllCaller(this), this.worldList.array = [], this.worldList.destroy();
            }, e.prototype.initRankEvent = function(t) {
                if (!t) return this.touchArea.offAllCaller(this), this.touchArea.visible = !1, void (this.friendList.visible = !1);
                this.touchArea.visible = !0, this.friendList.visible = !0;
                var e = 0, i = 0, a = 0, n = 0, s = o["default"].commonData.wxsysInfo.pixelRatio ? o["default"].commonData.wxsysInfo.pixelRatio : 1;
                Laya.Browser.onMiniGame && (this.touchArea.on(Laya.Event.MOUSE_DOWN, this, function(t) {
                    t.stopPropagation(), a = 0, i = t.nativeEvent.timeStamp, e = t.nativeEvent.changedTouches[0].clientY,
                    o["default"].wxMgr.onFrientMouseEvent({
                        cmd: "touch_start"
                    });
                }), this.touchArea.on(Laya.Event.MOUSE_MOVE, this, function(t) {
                    t.stopPropagation(), a = t.nativeEvent.changedTouches[0].clientY - e, o["default"].wxMgr.onFrientMouseEvent({
                        cmd: "touch_move",
                        deltaY: a * s
                    });
                }), this.touchArea.on(Laya.Event.MOUSE_UP, this, function(t) {
                    t.stopPropagation(), n = a / (t.nativeEvent.timeStamp - i), o["default"].wxMgr.onFrientMouseEvent({
                        cmd: "touch_end",
                        speed: n
                    });
                }), this.touchArea.on(Laya.Event.MOUSE_OUT, this, function(t) {
                    t.stopPropagation(), n = a / (t.nativeEvent.timeStamp - i), o["default"].wxMgr.onFrientMouseEvent({
                        cmd: "touch_cancel",
                        speed: n
                    });
                }));
            }, e.prototype.showList = function(t) {
                var e = t ? 1 : 0;
                this.worldList.alpha = e, this.rankMe.alpha = e;
            }, e.prototype.initList = function() {
                var t = this.worldList;
                t.itemRender = a["default"], t.cacheContent = !1, t.vScrollBarSkin = "", t.selectEnable = !1,
                t.renderHandler = new Laya.Handler(this, this.updateItem), this.worldLoading++;
            }, e.prototype.refreshList = function() {
                if (this.worldLoading >= 2) {
                    if (this.worldList.refresh(), 0 == this.rankMe.numChildren) {
                        var t = new a["default"]();
                        this.rankMe.addChild(t), t.setRankItem(this.userRank, !0);
                    }
                    Laya.timer.clear(this, this.refreshList);
                }
            }, e.prototype.clickClose = function() {
                var t = this;
                Laya.Scene.open(r.SceneType.Home, !1, laya.utils.Handler.create(this, function(e) {
                    t.close();
                }));
            }, e.prototype.onRankClick = function(t) {
                1 == t ? this.onRankWorld() : this.onRankFriend();
            }, e.prototype.onRankFriend = function() {
                if (this.world.visible = !1, this.friend.visible = !0, this.friendList.visible = !0,
                this.showList(!1), this.initRankEvent(!0), o["default"].wxMgr.showFriendRank(!0),
                window.wx && window.sharedCanvas) {
                    var t = this.friendList.width, e = this.friendList.height;
                    window.sharedCanvas.width = t, window.sharedCanvas.height = e;
                }
            }, e.prototype.onRankWorld = function() {
                this.world.visible = !0, this.friend.visible = !1, this.friendList.visible = !1,
                this.showList(!0), this.initRankEvent(!1), o["default"].wxMgr.showFriendRank(!1),
                Laya.timer.loop(100, this, this.refreshList);
            }, e.prototype.onDrawWorldrankEvent = function(t) {
                this.worldLoading++;
                var e = t.page, i = {}, a = [];
                if (!(t.data instanceof Array)) return void console.error("rank data is null.");
                a = t.data;
                var n = {
                    index: t.myIndex,
                    nickname: o["default"].commonData.userInfo.nickname,
                    score: o["default"].commonData.userInfo.max_score || 0,
                    headImage: o["default"].commonData.userInfo.avatarUrl
                };
                if (this.userRank = n, t.myIndex && t.myIndex > 0 && t.myIndex <= a.length && (this.userRank = t.data[t.myIndex - 1]),
                i.data = {
                    list: a,
                    page: e
                }, !a) return void (this.existWorldRank = !1);
                this.existWorldRank = a.length >= 20 ? !0 : !1;
                for (var s = i.data.list.length, r = 0; s > r; ++r) {
                    i.data.list[r].userId = i.data.list[r].id;
                    var h = (i.data.list[r].rank - 1) % 2;
                    i.data.list[r].bgUrl = this.rankBgList[h], delete i.data.list[r].id;
                }
                this.rankData || (this.rankData = {}), this.pageWorldRank = e, this.rankData[e] = i;
                var l = [];
                for (var d in this.rankData) l.push.apply(l, this.rankData[d].data.list);
                this.worldList.array = l, this.isLoadedWorldRank = !0;
            }, e.prototype.updateItem = function(t, e) {
                t.setRankItem(t.dataSource);
                var i = this.pageWorldRank;
                if (e - 6 == 0 && 6 > i) ; else if (e + 6 == this.worldList.length) {
                    i += 1;
                    var a = this.rankData[i];
                    a || this.isLoadedWorldRank && this.existWorldRank && 6 > i;
                }
            }, e;
        }(n["default"]);
        i["default"] = h;
    }, {
        "../LayaSample": 3,
        "../manager/GameMgr": 11,
        "../other/ConfigData": 16,
        "../uiComp/RankItem": 26,
        "./BaseView": 28
    } ],
    35: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("./BaseView"), n = t("../LayaSample"), o = t("../uiComp/AdListLoop"), s = t("../other/MyUtils"), r = t("../manager/NetMgr"), h = t("../platforms/wx/WxAdManager"), l = t("../manager/SoundMgr"), d = t("../other/ConfigData"), c = t("../manager/GameMgr"), u = t("../manager/StatisticsMgr"), p = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.overTime = 10, e.angle = 0, e.drawDelay = 0, e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                t.prototype.onAwake.call(this);
            }, e.prototype.onOpened = function() {
            }, e.prototype.onWxWakeEvent = function() {
                this.isStartTimer = !0;
            }, e.prototype.onWxSleepEvent = function() {
                this.isStartTimer = !1;
            }, e.prototype.initData = function() {
                n["default"].adMgr.getBannerCount() < 2 && n["default"].adMgr.getBannerAd(),
                n["default"].commonData.existVideoAd || n["default"].adMgr.loadVideoAd(),
                n["default"].commonData.existInterAd || n["default"].adMgr.getInterstitialAd();
            }, e.prototype.initUI = function() {
                this.btnVideo = this.getChild("btnVideo");
                var e = this.getChild("bottom");
                this.btnSkip = this.getChild("btnSkip", e);


                let score     = this.getChild("score");
                let lblScore  = this.getChild("lblScore",score);
                let lblScoreb = this.getChild("lblScoreb",score);

                var gameStatus = n["default"].storageMgr.getGameStatus();
                lblScore.text  =  n["default"].commonData.newScore.toString();
                lblScoreb.text = gameStatus.maxScore;
                if(n["default"].commonData.newScore > gameStatus.maxScore){
                    lblScoreb.text = n["default"].commonData.newScore;
                }

                let content     = this.getChild("content");
                this.listAd  = this.getChild("listAd",content);

                console.log("--fx--initUI--");
                return false;
                if(YYGSDK.isGamedistribution){
                    this.listAd.visible = false;
                }else{
                    this.listAd.renderHandler = new Laya.Handler(this,function(e){
                        e.offAll(Laya.Event.MOUSE_DOWN);
                        e.on(Laya.Event.MOUSE_DOWN,e,()=>{platform.getInstance().navigate("GAME","MORE",e.dataSource.id)});
                    })
                    this.listAd.array = platform.getInstance().getForgames();

                }


            }, e.prototype.initEvent = function() {
                this.btnVideo.on(Laya.Event.CLICK, this, this.onVideoClick),
                this.btnSkip.on(Laya.Event.CLICK, this, this.onSkipClick),
                 n["default"].glEvent.on(d.EventType.WX_SLEEP_EVENT, this, this.onWxSleepEvent),
                n["default"].glEvent.on(d.EventType.WX_WAKE_EVENT, this, this.onWxWakeEvent),
                 n["default"].glEvent.on(d.EventType.SHARE_BACK_EVENT, this, this.onShareBackEvent),
                n["default"].glEvent.on(d.EventType.AD_VIDEO_CLOSE_EVENT, this, this.onVideoCloseEvent),
                n["default"].glEvent.on("changeIsStartTimer", this, this.changeTimer);
            }, e.prototype.changeTimer = function() {
                this.isStartTimer = !0;
            }, e.prototype.onShareClick = function() {
                this.isStartTimer = !1, n["default"].wxMgr.shareFriend(1, !0);
            }, e.prototype.onVideoClick = function() {
                var t = this;
                console.log("--fx--onVideoClick--");
                return false;
                platform.getInstance().showReward(()=>{
                    t.close(), t.goonGame();
                })
            }, e.prototype.onSkipClick = function() {
                n["default"].commonData.existInterAd && n["default"].adMgr.showInterstitialAd(),
                this.closeView();
            }, e.prototype.closeView = function() {
                var t = this;
                Laya.Scene.open(c.SceneType.Clearing, !1, Laya.Handler.create(this, function(e) {
                    t.close();
                }));
            }, e.prototype.showADPanel = function() {
            }, e.prototype.hideADPanel = function() {
            }, e.prototype.ShowBanner = function() {
            }, e.prototype.onShareBackEvent = function(t) {
                t.isShare ? (h["default"].Instance.hideBannerAd(), this.close(), this.goonGame()) : (n["default"].wxMgr.showToast("分享失败", 2e3),
                this.isStartTimer = !0);
            }, e.prototype.onVideoCloseEvent = function(t) {
                t.isEnded ? (this.close(), this.goonGame()) : (n["default"].wxMgr.showToast("看完视频才能复活", 2e3),
                this.isStartTimer = !0);
            }, e.prototype.goonGame = function() {
                n["default"].glEvent.event(d.EventType.GOON_GAME_EVENT);
            }, e.prototype.countDown = function() {
                return !this.isStartTimer || Laya.timer.delta > 800 ? void 0 : (this.drawPie(),
                this.overTime > 0 ? void (this.isStartTimer && (this.overTime -= 1, this.lbTimer.text = this.overTime.toString(),
                n["default"].soundMgr.play(l.SoundType.DJS))) : void this.onSkipClick());
            }, e.prototype.drawPie = function() {
                this.angle += 360 / this.drawDelay, this.sprMask.graphics.clear(), this.sprMask.graphics.drawPie(8, 7, 150, -90, this.angle - 90, "#00ffff");
            }, e;
        }(a["default"]);
        i["default"] = p;
    }, {
        "../LayaSample": 3,
        "../manager/GameMgr": 11,
        "../manager/NetMgr": 12,
        "../manager/SoundMgr": 13,
        "../manager/StatisticsMgr": 14,
        "../other/ConfigData": 16,
        "../other/MyUtils": 17,
        "../platforms/wx/WxAdManager": 21,
        "../uiComp/AdListLoop": 22,
        "./BaseView": 28
    } ],
    36: [ function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = t("../uiComp/skinItem"), n = t("../LayaSample"), o = t("./BaseView"), s = t("../uiComp/AdListLoop"), r = t("../other/MyUtils"), h = t("../platforms/wx/WxAdManager"), l = t("../manager/NetMgr"), d = t("../other/ConfigData"), c = t("../manager/StatisticsMgr"), u = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.itemCount = 0, e.itemIndex = 0, e.skinItemPath = "prefab/freeSkinItem.json",
                e.skinData = [], e;
            }
            return __extends(e, t), e.prototype.onAwake = function() {
                t.prototype.onAwake.call(this), Laya.loader.load(this.skinItemPath, Laya.Handler.create(this, this.initList), null, Laya.Loader.PREFAB),
                n["default"].commonData.isShowSkin = !1;
            }, e.prototype.onOpened = function(t) {
                var e = this;
                if (t && t.isPlay && (this.isPlay = t.isPlay, n["default"].gameMgr.isPlay = !1),
                this.ShowBanner(), l["default"].ctrlInfo.isWudian && 1 == l["default"].wudian_level[0]) {
                    this.btnBack.alpha = 0, Laya.timer.once(l["default"].ctrlInfo.btuAppear[0], this, function() {
                        Laya.Tween.to(e.btnBack, {
                            alpha: 1
                        }, 300);
                    });
                    var i = -114;
                    console.log("SkinTrial this.offset.y = " + l["default"].ctrlInfo.btuMove[0]);
                    var a = r["default"].random(i, i + 30);
                    this.btnBack.y = a, Laya.timer.once(l["default"].ctrlInfo.btuMove[0], this, function() {
                        Laya.Tween.to(e.btnBack, {
                            y: -314
                        }, 300, Laya.Ease.backOut);
                    });
                } else {
                    var i = -314;
                    this.btnBack.y = i;
                }
            }, e.prototype.initUI = function() {
                var t = this.getChild("content");
                this.skinList = this.getChild("skinList", t), this.bottomPanel = this.getChild("bottom"),
                this.btnVideo = this.getChild("btnVideo", this.bottomPanel),
                this.btnVideo.visible = true;
                this.btnBack = this.getChild("btnBack", this.bottomPanel);
            }, e.prototype.initEvent = function() {
                this.btnVideo.on(Laya.Event.CLICK, this, this.clickVideo),
                this.btnBack.on(Laya.Event.CLICK, this, this.clickSkip),
                n["default"].glEvent.on(d.EventType.AD_VIDEO_CLOSE_EVENT, this, this.videoCallBack);
            }, e.prototype.onClosed = function() {
                t.prototype.onClosed.call(this), h["default"].Instance.hideBannerAd(), this.isPlay && (n["default"].gameMgr.isPlay = !0);
            }, e.prototype.onDisable = function() {
                n["default"].glEvent.off(d.EventType.AD_VIDEO_CLOSE_EVENT, this, this.videoCallBack);
            }, e.prototype.initData = function() {
                this.itemCount = 4, this.skinData = [];
                for (var t = 0; t < this.itemCount; ++t) {
                    var e = {
                        id: t + 1,
                        iconPath: "skinTrail/che00" + (t + 1) + ".png"
                    };
                    this.skinData.push(e);
                }
            }, e.prototype.initList = function() {
                a["default"].itemWidth = 200, a["default"].itemHeight = 270, a["default"].iconWidth = 142,
                a["default"].iconHeight = 195, a["default"].iconOffset = new Laya.Vector2(29, 8),
                a["default"].itemPrefab = Laya.loader.getRes(this.skinItemPath);
                var t = this.skinList;
                t.itemRender = a["default"], t.selectEnable = !0, t.selectHandler = new Laya.Handler(this, this.onSelect),
                t.renderHandler = new Laya.Handler(this, this.updateItem), t.array = this.skinData;
            }, e.prototype.updateItem = function(t, e) {
                t.setItemInfo(t.dataSource);
            }, e.prototype.onSelect = function(t) {

                if(t<0){

                }else{
                    this.itemIndex = t + 3;
                    this.selectVideo(t);
                    this.skinList.selectedIndex = -1
                }

            }, e.prototype.selectVideo = function(t) {
                var e = this;
                console.log("--fx--selectVideo--");
                return false;
                platform.getInstance().showReward(()=>{
                    e.changeSkin();
                });
            }, e.prototype.clickTip = function() {
                var t = n["default"].storageMgr.isSkinTips();
                this.tipsTag.visible = t, n["default"].storageMgr.setSkinTips(!t);
            }, e.prototype.showADPanel = function() {
            }, e.prototype.hideADPanel = function() {
            }, e.prototype.ShowBanner = function() {
            }, e.prototype.clickVideo = function() {


                this.itemIndex = Math.floor(4 * Math.random()) + 3;
                console.log("--fx--clickVideo--");
                return false;
                platform.getInstance().showReward(()=>{
                    this.changeSkin();
                });

                //  Laya.Browser.onMiniGame ? this.showVideo() : this.changeSkin();
            }, e.prototype.showVideo = function() {
            }, e.prototype.clickSkip = function() {
                this.itemIndex = 0, n["default"].glEvent.event(d.EventType.PLAY_GAME_EVENT), this.close();
            }, e.prototype.videoCallBack = function(t) {
                t.isEnded ? this.changeSkin() : n["default"].wxMgr.showToast("未观看完视频", 2e3);
            }, e.prototype.changeSkin = function() {
                n["default"].commonData.isShowSkin = !1, n["default"].glEvent.event(d.EventType.CHANGE_SKIN, {
                    index: this.itemIndex,
                    isPlay: !0
                }), this.close();
            }, e;
        }(o["default"]);
        i["default"] = u;
    }, {
        "../LayaSample": 3,
        "../manager/NetMgr": 12,
        "../manager/StatisticsMgr": 14,
        "../other/ConfigData": 16,
        "../other/MyUtils": 17,
        "../platforms/wx/WxAdManager": 21,
        "../uiComp/AdListLoop": 22,
        "../uiComp/skinItem": 27,
        "./BaseView": 28
    } ]
}, {}, [ 2 ]);