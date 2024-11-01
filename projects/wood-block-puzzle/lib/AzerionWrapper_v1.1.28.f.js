(()=>{
    "use strict";
    var __webpack_modules__ = {
        "./node_modules/@billjs/event-emitter/lib/index.js": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = (a.prototype.isValidType = function(e) {
                return "string" == typeof e
            }
            ,
            a.prototype.isValidHandler = function(e) {
                return "function" == typeof e
            }
            ,
            a.prototype.on = function(e, t) {
                if (!e || !t)
                    return !1;
                if (!this.isValidType(e))
                    return !1;
                if (!this.isValidHandler(t))
                    return !1;
                var r = this._eventHandlers[e];
                return !(0 <= (r = r || (this._eventHandlers[e] = [])).indexOf(t)) && (t._once = !1,
                r.push(t),
                !0)
            }
            ,
            a.prototype.once = function(e, t) {
                if (!e || !t)
                    return !1;
                if (!this.isValidType(e))
                    return !1;
                if (!this.isValidHandler(t))
                    return !1;
                e = this.on(e, t);
                return e && (t._once = !0),
                e
            }
            ,
            a.prototype.off = function(e, t) {
                if (!e)
                    return this.offAll();
                if (t) {
                    if (this.isValidType(e) && this.isValidHandler(t)) {
                        var r = this._eventHandlers[e];
                        if (r && r.length)
                            for (var a = 0; a < r.length; a++)
                                if (r[a] === t) {
                                    r.splice(a, 1);
                                    break
                                }
                    }
                } else
                    this._eventHandlers[e] = []
            }
            ,
            a.prototype.offAll = function() {
                this._eventHandlers = {}
            }
            ,
            a.prototype.fire = function(e, t) {
                if (e && this.isValidType(e)) {
                    var r = this._eventHandlers[e];
                    if (r && r.length)
                        for (var a = this.createEvent(e, t), n = 0, s = r; n < s.length; n++) {
                            var i = s[n];
                            this.isValidHandler(i) && (i._once && (a.once = !0),
                            i(a),
                            a.once && this.off(e, i))
                        }
                }
            }
            ,
            a.prototype.has = function(e, t) {
                if (!e || !this.isValidType(e))
                    return !1;
                e = this._eventHandlers[e];
                return !(!e || !e.length) && (!t || !this.isValidHandler(t) || 0 <= e.indexOf(t))
            }
            ,
            a.prototype.getHandlers = function(e) {
                return e && this.isValidType(e) && this._eventHandlers[e] || []
            }
            ,
            a.prototype.createEvent = function(e, t, r) {
                return void 0 === r && (r = !1),
                {
                    type: e,
                    data: t,
                    timestamp: Date.now(),
                    once: r
                }
            }
            ,
            a);
            function a() {
                this._eventHandlers = {}
            }
            t.EventEmitter = r,
            t.globalEvent = new r
        }
        ,
        "./src/Wrapper.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./node_modules/@billjs/event-emitter/lib/index.js")
              , s = r("./src/constants/InterfaceType.ts")
              , i = r("./src/constants/PlatformType.ts")
              , o = r("./src/events/InterfaceEvent.ts")
              , d = a(r("./src/events/WrapperEvent.ts"))
              , l = a(r("./src/interface/FBInstant/FBInstantInterface.ts"))
              , c = a(r("./src/interface/GCBXPromo.ts/GCBXPromoInterface.ts"))
              , u = a(r("./src/interface/SGHooks/SGHooksInterface.ts"))
              , f = a(r("./src/interface/SGSDK/SGSDKInterface.ts"))
              , g = a(r("./src/ui/CountdownTag.ts"))
              , _ = a(r("./src/ui/loading/ADPreloader.ts"))
              , m = a(r("./src/ui/options/FoldReloader.ts"));
            class p extends n.EventEmitter {
                constructor() {
                    super(),
                    this.isReady = !1,
                    this["interface"] = new n.EventEmitter
                }
                static get instance() {
                    return p._instance === undefined ? p._instance = new p : p._instance
                }
                static isPlatformSupported() {
                    return p.commsManager.isPlatformSupported
                }
                async init(e) {
                    this.config = e,
                    console.log(e.gameTitle + " v" + e.gameBuild),
                    await this.initComms(),
                    await this.storageManager.initialize(this.config),
                    this.createInterface(e["interface"]),
                    await this.initAds(),
                    this.config.inAppPurchase && await this.initIAP(),
                    this.createUI(e.platform),
                    this.config.options !== undefined && (e = window.navigator.userAgent.includes("Android"),
                    this.config.options.reloadOnFold && e && new m["default"]),
                    window.sgWrapper = this,
                    window.onWrapperReady && window.onWrapperReady(),
                    this.isReady = !0,
                    this.fire(d["default"].READY)
                }
                onStart() {
                    this.config.platform === i.PlatformType.SAMSUNG_INSTANT && this.SGPreloader.show()
                }
                createUI(e) {
                    this.countdownTag = new g["default"],
                    this.adLoadBg = new _["default"]
                }
                async initComms() {
                    var e = (await this.commsManager.initialize())["err"];
                    e && (console.error(e),
                    this.commsManager.checkPlatformSupport(e))
                }
                async initAds() {
                    return this.adManager.initialize()
                }
                async initIAP() {
                    await this.iapManager.initialize()
                }
                hookUpInterface() {
                    this["interface"].once(o.InterfaceEvent.LOADED, ()=>{
                        this.onStartGame()
                    }
                    ),
                    this["interface"].on(o.InterfaceEvent.LOAD_PROGRESS, e=>{
                        this.commsManager.setLoadingProgress(e.data.progress)
                    }
                    )
                }
                async onStartGame() {
                    var e = (await this.commsManager.startGame())["err"];
                    e && (console.log(e),
                    this.commsManager.checkPlatformSupport(e)),
                    this.fire(d["default"].GAME_START)
                }
                createInterface(e) {
                    switch (e) {
                    case s.InterfaceType.SGSDK:
                        new f["default"](this["interface"]);
                        break;
                    case s.InterfaceType.SG_HOOKS:
                        new u["default"](this["interface"]);
                        break;
                    case s.InterfaceType.FBInstant:
                        new l["default"](this["interface"]),
                        new c["default"](this["interface"]);
                        break;
                    default:
                        console.warn("Interface not initialized: type not recognized.")
                    }
                    this.hookUpInterface()
                }
                static get placementIDs() {
                    return p.instance.placementIDs
                }
                static get commsManager() {
                    return p.instance.commsManager
                }
                static get adManager() {
                    return p.instance.adManager
                }
                static get iapManager() {
                    return p.instance.iapManager
                }
                static get "interface"() {
                    return p.instance["interface"]
                }
                static get config() {
                    return p.instance.config
                }
                static get storageManager() {
                    return p.instance.storageManager
                }
                static get leaderboards() {
                    return p.instance.leaderboards
                }
            }
            t["default"] = p
        },
        "./src/constants/InterfaceType.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.InterfaceType = void 0,
            (t = t.InterfaceType || (t.InterfaceType = {})).SG_HOOKS = "SG_Hooks",
            t.SGSDK = "sgSdk",
            t.FBInstant = "FBInstant"
        }
        ,
        "./src/constants/Paths.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
            }
            (t["default"] = r).platformConfig = "platform-config.json",
            r.ratingImage = "lib/assets/grac_kr_rating_all.png",
            r.softgamesLogo = "lib/assets/softgames_logo.png",
            r.firebaseConfig = "firebaseConfig.json"
        }
        ,
        "./src/constants/PlatformType.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PlatformType = void 0,
            (t = t.PlatformType || (t.PlatformType = {})).SAMSUNG_INSTANT = "samsung",
            t.AZERION = "azerion"
        }
        ,
        "./src/constants/style/UIStyle.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            a = a(r("./src/constants/style/UIStyleDefault.ts"));
            class n {
                static setupUIStyle() {
                    const e = document.createElement("style");
                    e.setAttribute("id", n.UI_STYLES_ELEMENT_ID),
                    e.innerHTML = n.UI_STYLE,
                    document.body.appendChild(e)
                }
            }
            (t["default"] = n).UI_STYLES_ELEMENT_ID = "ui-styles",
            n.UI_STYLE = `
    .wrapper-ui {
      color: white;
      font-family: sans-serif;
      text-align: center;
      z-index: ${a["default"].UI_ELEMENT_Z_INDEX};
    }

    #${a["default"].RATING_CONTAINER_ID}{
      position: absolute;
      right: 0;
      top: 10px;
      width: 20%;
      max-width: 80px;
      z-index: ${a["default"].RATING_CONTAINER_Z_INDEX}
    }

    .loading-screen {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: black;
      z-index: inherit;
    }

    .splash-screen {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      background-color: white;
      align-items: center;
      justify-content: space-around;
      z-index: 9999;
    }

    .game-logo {
      position: absolute;
      top: calc(25vh - 30px);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      max-height: 20%;
      width: auto;
      border-radius: 16%;
    }

    .play-button {
      position: absolute;
      font-style: bold;
      font-family: Arial;
      top: calc(60vh);
      max-height: 20%;
      padding: 10px;
      padding-left: 20px;
      padding-right: 20px;
      text-align:center;
      font-size: 28px;
      color: #FFFFFF;
      background-color: #ff8c00;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .play-button-bg {
      position:relative;
      display:block;
      top:20px;
    }

    .play-text {
      font-size: 24px;
      font-color: white;
      user-select: none;
    }

    .game-logo-azerion {
      position: absolute;
      top: calc(25vh - 30px);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      max-height: 20%;
      width: auto;
      border-radius: 16%;
      top:-50;
    }

    .background-image {
        width:100vw;
        height:100vh;
        filter: blur(40px);
    }

    .progress-ring {
      position: absolute;
      top: calc(50vh);
      width: ${2 * a["default"].SPLASH_SPINNER_SIZE}px;
      height: ${2 * a["default"].SPLASH_SPINNER_SIZE}px;
    }

    /* https://css-tricks.com/building-progress-ring-quickly/ */
    .background-circle {
      stroke: #f3f3f3;
      fill: transparent;
    }

    .progress-ring-circle {
      stroke: #f1672b;
      fill: transparent;
      transform: rotate(-90deg);
      transition: stroke-dashoffset 0.35s;
      transform-origin: 50% 50%;
    }

    .softgames-logo {
      position:absolute;
      max-height: 5%;
      max-width: 60%;
      bottom: 0;
    }

    @media (orientation: landscape) and (max-device-height: 640px) {
      .progress-ring {
        transform: scale(0.8);
      }

      .game-logo {
        max-height: 30%;
      }

      .softgames-logo {
        max-height: 10%;
      }
    }


    /* ref: https://www.w3schools.com/howto/howto_css_loader.asp */
    .spinner {
      position: absolute;
      top: calc(50vh - 30px);
      left: calc(50vw - 30px);

      border: 4px solid #f3f3f3;
      border-top: 4px solid black;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .countdown-tag {
      pointer-events: none;
      position: absolute;
      right: 0;
      bottom: 80px;
      padding: 0 20px;
      width: 90px;
      background-color: black;
      opacity: 0;
      z-index: inherit;
    }

    /* ref: https://css-tricks.com/snippets/css/toggle-visibility-when-hiding-elements/ */
    .countdown-tag-fadeIn {
      opacity: 1;
      transition: opacity 300ms;
    }

    .countdown-tag-label {
      font-size: 16px;
      padding: 0 10px;
    }
  `
        },
        "./src/constants/style/UIStyleDefault.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
            }
            (t["default"] = r).SAMSUNG_SPLASH_DURATION_MS = 3e3,
            r.SHOW_RATING_DURATION_MS = 3e3,
            r.RATING_CONTAINER_Z_INDEX = 1e3,
            r.RATING_CONTAINER_ID = "rating_container",
            r.SPLASH_SPINNER_SIZE = 36,
            r.SPLASH_SPINNER_STROKE = 5,
            r.UI_ELEMENT_Z_INDEX = 9e3,
            r.ADS_CONTAINER_Z_INDEX = 1e4,
            r.ADS_CONTAINER_ID = "ads_container",
            r.LOGGER_CONTAINER_Z_INDEX = 2e3,
            r.LOGGER_CONTAINER_ID = "debug_logger",
            r.DEBUG_MENU_Z_INDEX = 3e4
        }
        ,
        "./src/events/AdManagerEvent.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AdManagerEvent = void 0,
            (t = t.AdManagerEvent || (t.AdManagerEvent = {})).AD_ERROR = "AD_ERROR",
            t.AD_LOADED = "AD_LOADED",
            t.AD_START = "AD_START",
            t.AD_SKIP = "AD_SKIP",
            t.AD_COMPLETE = "AD_COMPLETE",
            t.AD_CLOSE = "AD_CLOSE",
            t.INTERSTITIAL_AD_REQUESTED = "INTERSTITIAL_AD_REQUESTED",
            t.REWARDED_AD_REQUESTED = "REWARDED_AD_REQUESTED",
            t.AD_REQUESTED = "AD_REQUESTED",
            t.FREE_REWARD_AWARDED = "FREE_REWARD_AWARDED"
        }
        ,
        "./src/events/AdTimerEvent.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AdTimerEvent = void 0,
            (t = t.AdTimerEvent || (t.AdTimerEvent = {})).COOLDOWN_START = "COOLDOWN_START",
            t.COOLDOWN_END = "COOLDOWN_END",
            t.LONGPLAY_TRIGGER = "LONGPLAY_TRIGGER",
            t.LONGPLAY_TICKER_START = "LONGPLAY_TICKER_START",
            t.LONGPLAY_TICKER_STOP = "LONGPLAY_TICKER_STOP",
            t.LONGPLAY_TICK = "LONGPLAY_TICK",
            t.LONGPLAY_WARN_TICK = "LONGPLAY_WARN_TICK",
            t.LONGPLAY_WARN = "LONGPLAY_WARN"
        }
        ,
        "./src/events/GameEvent.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GameEvent = void 0,
            (t = t.GameEvent || (t.GameEvent = {})).LEVEL_START = "LEVEL_START",
            t.LEVEL_FINISH = "LEVEL_FINISH",
            t.GAME_START = "GAME_START",
            t.GAME_OVER = "GAME_OVER"
        }
        ,
        "./src/events/InterfaceEvent.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.InterfaceEvent = void 0,
            (t = t.InterfaceEvent || (t.InterfaceEvent = {})).LOADED = "GAME_LOADED",
            t.LOAD_PROGRESS = "LOAD_PROGRESS"
        }
        ,
        "./src/events/WrapperEvent.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
            }
            (t["default"] = r).SDK_INIT = "SDK_INIT",
            r.SPLASH_HIDDEN = "SPLASH_HIDDEN",
            r.REQUEST_AD = "REQUEST_AD",
            r.GAME_START = "GAME_START",
            r.GAME_PAUSE = "GAME_PAUSE",
            r.GAME_RESUME = "GAME_RESUME",
            r.READY = "WRAPPER_READY"
        }
        ,
        "./src/index/indexAzerion.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/constants/PlatformType.ts")
              , s = r("./src/leaderboards/LeaderboardTypes.ts")
              , i = a(r("./src/platforms/azerion/AzerionAdManager.ts"))
              , o = a(r("./src/platforms/azerion/AzerionCommsManager.ts"))
              , d = a(r("./src/platforms/azerion/AzerionIAPManager.ts"))
              , l = a(r("./src/platforms/azerion/AzerionStorageManager.ts"))
              , c = r("./src/platforms/azerion/constants/AzerionPlacementIDs.ts")
              , u = a(r("./src/platforms/azerion/ui/AzerionSplash.ts"))
              , f = a(r("./src/Wrapper.ts"));
            class g extends a(r("./src/index/indexBase.ts"))["default"] {
                async createWrapper(e) {
                    (f["default"].instance.config = e).platform = n.PlatformType.AZERION,
                    f["default"].instance.storageManager = new l["default"],
                    f["default"].instance.commsManager = new o["default"],
                    f["default"].instance.adManager = new i["default"],
                    f["default"].instance.placementIDs = {
                        rewarded: c.AzerionPlacementIDs.REWARDED,
                        interstitial: c.AzerionPlacementIDs.INTERSTITIAL
                    },
                    f["default"].instance.iapManager = new d["default"],
                    f["default"].instance.init(e),
                    !0 === e.leaderboardSupport && (f["default"].instance.leaderboards = await this.getLeaderboardHandler(s.LeaderboardTypes.FIREBASE));
                    const t = new u["default"];
                    t.show(),
                    f["default"].instance.onStart()
                }
            }
            new (t["default"] = g)
        },
        "./src/index/indexBase.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = a(r("./src/constants/Paths.ts"))
              , s = a(r("./src/Wrapper.ts"));
            class i {
                constructor() {
                    this.loadConfig(n["default"].platformConfig)
                }
                async loadConfig(e) {
                    const t = await fetch(e);
                    e = await t.json();
                    await this.createWrapper(e)
                }
                async createWrapper(e) {}
                async getLeaderboardHandler(r) {
                    let a;
                    return new Promise((t,e)=>{
                        a = window.setInterval(()=>{
                            var e;
                            window.sgLeaderboards && (window.clearInterval(a),
                            e = window.sgLeaderboards.getHandler(s["default"].config, r),
                            t(e))
                        }
                        , 100)
                    }
                    )
                }
            }
            t["default"] = i
        },
        "./src/interface/FBInstant/FBInstantInterface.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/events/InterfaceEvent.ts")
              , s = a(r("./src/Wrapper.ts"));
            var i = a(r("./src/interface/common/InterfaceBase.ts"));
            const o = a(r("./src/interface/FBInstant/modules/FBContext.ts"))
              , d = a(r("./src/interface/FBInstant/modules/FBPayments.ts"))
              , l = a(r("./src/interface/FBInstant/modules/FBPlayer.ts"))
              , c = a(r("./src/interface/FBInstant/modules/FBTournament.ts"));
            class u extends i["default"] {
                constructor(e) {
                    super(e),
                    this.player = new l["default"],
                    this.payments = new d["default"],
                    this.tournament = new c["default"],
                    this.context = new o["default"],
                    window.FBInstant = this
                }
                initializeAsync() {
                    return Promise.resolve()
                }
                startGameAsync() {
                    return this.interfaceRef.fire(n.InterfaceEvent.LOAD_PROGRESS, {
                        progress: 101
                    }),
                    s["default"].commsManager.startGame(),
                    Promise.resolve()
                }
                setLoadingProgress(e) {
                    e = e || 0;
                    s["default"].commsManager.setLoadingProgress(e)
                }
                onPause(e) {}
                getLocale() {
                    return console.log("FBInterface locale :: " + s["default"].commsManager.getLanguage()),
                    s["default"].commsManager.getLanguage()
                }
                getPlatform() {
                    return null
                }
                getSDKVersion() {
                    return ""
                }
                logEvent(e, t, r) {
                    return null
                }
                quit() {}
                async getInterstitialAdAsync(e) {
                    return Promise.resolve({
                        loadAsync() {
                            return Promise.resolve()
                        },
                        showAsync() {
                            return s["default"].adManager.showInterstitialAd()
                        },
                        getPlacementID() {
                            return e
                        }
                    })
                }
                async getRewardedVideoAsync(e) {
                    return Promise.resolve({
                        loadAsync() {
                            return Promise.resolve()
                        },
                        showAsync() {
                            return new Promise(async(e,t)=>{
                                e(await s["default"].adManager.showRewardedAd())
                            }
                            )
                        },
                        getPlacementID() {
                            return e
                        }
                    })
                }
                async getLeaderboardAsync(e) {
                    return new Promise(async e=>{
                        e(await window.sgLeaderboards.getHandler(s["default"].config))
                    }
                    )
                }
                canCreateShortcutAsync() {
                    return Promise.resolve(!1)
                }
                checkCanPlayerMatchAsync() {
                    return Promise.resolve(!1)
                }
                createShortcutAsync() {
                    return Promise.resolve(undefined)
                }
                getEntryPointAsync() {
                    return Promise.resolve("")
                }
                getEntryPointData() {
                    return null
                }
                getSupportedAPIs() {
                    return ["getRewardedVideoAsync", "getInterstitialAdAsync", "startGameAsync"]
                }
                matchPlayerAsync(e, t, r) {
                    return Promise.resolve(undefined)
                }
                postSessionScore(e) {}
                setSessionData(e) {}
                shareAsync(e) {
                    return Promise.resolve(undefined)
                }
                switchGameAsync(e, t) {
                    return Promise.resolve(undefined)
                }
                updateAsync(e) {
                    return Promise.resolve(undefined)
                }
            }
            t["default"] = u
        },
        "./src/interface/FBInstant/modules/FBContext.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = a(r("./src/Wrapper.ts"));
            class s {
                getID() {
                    return n["default"].config.platform
                }
                getType() {
                    return null
                }
                isSizeBetween(e, t) {
                    return null
                }
                switchAsync(e) {
                    return Promise.resolve()
                }
                chooseAsync(e) {
                    return Promise.resolve()
                }
                createAsync(e) {
                    return Promise.resolve()
                }
                getPlayersAsync() {
                    return Promise.resolve([])
                }
            }
            t["default"] = s
        },
        "./src/interface/FBInstant/modules/FBPayments.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
                getCatalogAsync() {
                    return Promise.resolve([])
                }
                purchaseAsync(e) {
                    return Promise.resolve(null)
                }
                getPurchasesAsync() {
                    return Promise.resolve([])
                }
                consumePurchaseAsync(e) {
                    return Promise.resolve()
                }
                onReady(e) {
                    e && e()
                }
                hasIAPSupport() {
                    return !1
                }
            }
            t["default"] = r
        }
        ,
        "./src/interface/FBInstant/modules/FBPlayer.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const i = a(r("./src/Wrapper.ts"));
            class n {
                getID() {}
                getSignedPlayerInfoAsync(e) {
                    return Promise.resolve({
                        getPlayerID() {
                            return "id"
                        },
                        getSignature() {
                            return ""
                        }
                    })
                }
                canSubscribeBotAsync() {
                    return Promise.resolve(!1)
                }
                subscribeBotAsync() {
                    return Promise.resolve(undefined)
                }
                getName() {
                    return ""
                }
                getPhoto() {
                    return ""
                }
                async getDataAsync(e) {
                    return await i["default"].storageManager.getItem()
                }
                setDataAsync(s) {
                    return new Promise((e,t)=>{
                        try {
                            var r, a;
                            for ([r,a] of Object.entries(s))
                                i["default"].storageManager.setItem(r, a);
                            e()
                        } catch (n) {
                            t(n)
                        }
                    }
                    )
                }
                flushDataAsync() {
                    return Promise.resolve(undefined)
                }
                getStatsAsync(e) {
                    return Promise.resolve(null)
                }
                setStatsAsync(e) {
                    return Promise.resolve(undefined)
                }
                incrementStatsAsync(e) {
                    return Promise.resolve(null)
                }
                getConnectedPlayersAsync() {
                    return Promise.resolve([{
                        getID: ()=>"id",
                        getPhoto: ()=>"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                        getName: ()=>"Name"
                    }])
                }
            }
            t["default"] = n
        },
        "./src/interface/FBInstant/modules/FBTournament.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
                async postScoreAsync() {}
                async createAsync() {
                    return {
                        getID: ()=>0,
                        getContextID: ()=>0,
                        getEndTime: ()=>0,
                        getTitle: ()=>"",
                        getPayload: ()=>""
                    }
                }
                async getTournamentsAsync() {
                    return []
                }
                async joinAsync(e) {}
                async shareAsync() {}
            }
            t["default"] = r
        }
        ,
        "./src/interface/GCBXPromo.ts/GCBXPromoInterface.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/events/GameEvent.ts")
              , s = r("./src/events/InterfaceEvent.ts")
              , i = a(r("./src/Wrapper.ts"));
            var o = a(r("./src/interface/common/InterfaceBase.ts"));
            const d = a(r("./src/interface/GCBXPromo.ts/sgModules/GCBXModuleBackend.ts"))
              , l = a(r("./src/interface/GCBXPromo.ts/sgModules/GCBXModulesXPromo.ts"));
            class c extends o["default"] {
                constructor(e) {
                    super(e),
                    this.storage = {
                        getStorageValue: this.getStorageValue.bind(this),
                        getStorageData: this.getStorageData.bind(this),
                        isGameBotRateLimited: this.isGameBotRateLimited.bind(this),
                        save: this.save.bind(this)
                    },
                    this.loading = {
                        finished: this.finished.bind(this)
                    },
                    this.tracking = {
                        isFirstTimeUser: this.isFirstTimeUser.bind(this),
                        getGameBotSubscribed: this.getGameBotSubscribed.bind(this),
                        isGameBotRateLimited: this.isGameBotRateLimited.bind(this),
                        getRegistrationDate: this.getRegistrationDate.bind(this)
                    },
                    this.utils = {
                        createShortcut: this.createShortcut.bind(this),
                        waitForGBCBeingLive: this.waitForGBCBeingLive.bind(this)
                    },
                    this.backend = new d["default"],
                    this.xpromo = new l["default"],
                    this.sgModules = {
                        backend: this.backend,
                        xpromo: this.xpromo
                    },
                    window.GBCXPromo = this
                }
                getGameConfig() {
                    return null
                }
                init(e, t) {
                    return Promise.resolve()
                }
                getLocale() {
                    return console.log("'getLocale' has an implemented logic."),
                    i["default"].commsManager.getLanguage()
                }
                setLocale(e) {
                    return ""
                }
                prepareText(e, t) {
                    return ""
                }
                getLocalizableContent(e, t) {
                    return {
                        "default": "",
                        localizations: {}
                    }
                }
                setProgress(e) {
                    e = e || 0;
                    i["default"].commsManager.setLoadingProgress(e)
                }
                finished(e) {
                    return this.interfaceRef.fire(s.InterfaceEvent.LOADED),
                    this.interfaceRef.fire(s.InterfaceEvent.LOAD_PROGRESS, {
                        progress: 101
                    }),
                    Promise.resolve()
                }
                async showRewardedAd(e) {
                    return console.log("'showRewardedAd' has an implemented logic."),
                    await i["default"].adManager.showRewardedAd()
                }
                async showInterstitialAd(e) {
                    return console.log("'showInterstitialAd' has an implemented logic."),
                    await i["default"].adManager.showInterstitialAd()
                }
                areRewardedAdsSupported() {
                    return i["default"].config.adsConfig.rewarded
                }
                areInterstitialAdsSupported() {
                    return !0
                }
                gameStart() {
                    this.interfaceRef.fire(n.GameEvent.GAME_START)
                }
                gameOver(e, t) {
                    this.interfaceRef.fire(n.GameEvent.GAME_OVER, {
                        level: e,
                        score: t
                    })
                }
                subscribeToBot() {
                    return Promise.resolve()
                }
                isFirstTimeUser() {
                    return !1
                }
                getUserLifetime() {
                    return -1
                }
                getSessionOfDay() {
                    return -1
                }
                getGameBotSubscribed() {
                    return !1
                }
                isGameBotRateLimited() {
                    return !1
                }
                getRegistrationDate() {
                    return -1
                }
                isChallengeAvailable() {
                    return !1
                }
                initChallenge(e) {}
                startChallengeAsync(e) {
                    return Promise.resolve()
                }
                updateScore(e) {}
                trackScore(e) {
                    i["default"].commsManager.setScore(e)
                }
                getStorageValue(e, t) {
                    var r;
                    try {
                        if ((r = i["default"].storageManager.getItem(e)) !== undefined && null !== r)
                            return r
                    } catch (a) {
                        console.log("Could not restore data - " + a)
                    }
                    return t
                }
                save(s, e) {
                    return new Promise((e,t)=>{
                        try {
                            var r, a;
                            for ([r,a] of Object.entries(s))
                                i["default"].storageManager.setItem(r, a);
                            e()
                        } catch (n) {
                            t(n)
                        }
                    }
                    )
                }
                load(e) {
                    return i["default"].storageManager.getItem(e)
                }
                getStorageData() {
                    return Object()
                }
                getLocalStorageKey() {
                    return ""
                }
                waitForGBCBeingLive(e) {
                    return Promise.resolve()
                }
                createShortcut() {
                    return Promise.resolve()
                }
            }
            t["default"] = c
        },
        "./src/interface/GCBXPromo.ts/sgModules/GCBXModuleBackend.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
                isConnected() {
                    return Promise.resolve(!1)
                }
                getUserProfile() {
                    return Promise.resolve(undefined)
                }
                getServerTimestamp() {
                    return Promise.resolve(-1)
                }
                setUserProfile({}) {
                    return Promise.resolve()
                }
                syncFriendListByPlatformPlayerId({}) {
                    return Promise.resolve()
                }
                getFriendsScores({}) {
                    return Promise.resolve(null)
                }
                postScore({}) {
                    return Promise.resolve()
                }
                executeRuntimeScript({}) {
                    return Promise.resolve(null)
                }
            }
            t["default"] = r
        }
        ,
        "./src/interface/GCBXPromo.ts/sgModules/GCBXModulesXPromo.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
                getXPromo({}) {
                    return Promise.resolve([])
                }
                switchGame(e) {
                    return Promise.resolve()
                }
                initialize({}) {
                    return ()=>{}
                }
            }
            t["default"] = r
        }
        ,
        "./src/interface/SGHooks/SGHooksActionType.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.SGHooksActionType = void 0,
            (t = t.SGHooksActionType || (t.SGHooksActionType = {})).RUN = "runGame",
            t.PAUSE = "pauseGame",
            t.UNPAUSE = "unpauseGame"
        }
        ,
        "./src/interface/SGHooks/SGHooksInterface.ts": function(__unused_webpack_module, exports, __webpack_require__) {
            var __importDefault = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            const GameEvent_1 = __webpack_require__("./src/events/GameEvent.ts")
              , InterfaceEvent_1 = __webpack_require__("./src/events/InterfaceEvent.ts")
              , html_1 = __webpack_require__("./src/ui/helpers/html.ts")
              , Wrapper_1 = __importDefault(__webpack_require__("./src/Wrapper.ts"))
              , InterfaceBase_1 = __importDefault(__webpack_require__("./src/interface/common/InterfaceBase.ts"))
              , SGHooksActionType_1 = __webpack_require__("./src/interface/SGHooks/SGHooksActionType.ts");
            class SGHooksInterface extends InterfaceBase_1["default"] {
                constructor(e) {
                    super(e),
                    this.loadGameScripts(),
                    window.SG_Hooks = this,
                    window.SG = {
                        lang: Wrapper_1["default"].commsManager.getLanguage()
                    }
                }
                start() {
                    this.interfaceRef.fire(InterfaceEvent_1.InterfaceEvent.LOAD_PROGRESS, {
                        progress: 101
                    }),
                    Wrapper_1["default"].commsManager.startGame()
                }
                triggerMoreGames() {}
                getLanguage(e) {
                    return Wrapper_1["default"].commsManager.getLanguage(e)
                }
                registerObserver(e) {
                    this.observer = e
                }
                setPauseHandler(e) {
                    Wrapper_1["default"].commsManager.setPauseCallback(e),
                    this.observer({
                        action: SGHooksActionType_1.SGHooksActionType.PAUSE
                    })
                }
                setUnpauseHandler(e) {
                    Wrapper_1["default"].commsManager.setResumeCallback(e),
                    this.observer({
                        action: SGHooksActionType_1.SGHooksActionType.UNPAUSE
                    })
                }
                setOrientationHandler(e) {
                    window.addEventListener("orientationchange", ()=>{
                        e()
                    }
                    )
                }
                setResizeHandler(e) {
                    window.addEventListener("resize", ()=>{
                        e()
                    }
                    )
                }
                async loaded() {
                    this.interfaceRef.fire(InterfaceEvent_1.InterfaceEvent.LOADED),
                    this.interfaceRef.fire(InterfaceEvent_1.InterfaceEvent.LOAD_PROGRESS, {
                        progress: 101
                    }),
                    this.observer !== undefined && this.observer({
                        action: SGHooksActionType_1.SGHooksActionType.RUN
                    })
                }
                async triggerIncentivise(e) {
                    var t = await Wrapper_1["default"].adManager.showRewardedAd();
                    e && e(t)
                }
                async beforePlayButtonDisplay(e) {
                    console.log("--fx--beforePlayButtonDisplay--");
                    var t;
                    Wrapper_1["default"].config.adsConfig.supportsAdPlayButton && (t = await Wrapper_1["default"].adManager.showInterstitialAd(),
                    e && e(t))
                }
                async playButtonPressed(e) {
                    console.log("--fx--playButtonPressed--");
                    e && e()
                }
                isEnabledIncentiviseButton() {
                    return !0
                }
                levelStarted(e, t) {
                    this.interfaceRef.fire(GameEvent_1.GameEvent.LEVEL_START, {
                        level: e
                    }),
                    t && t()
                }
                levelFinished(e, t, r) {
                    this.interfaceRef.fire(GameEvent_1.GameEvent.LEVEL_FINISH, {
                        level: e
                    }),
                    r && r()
                }
                gameStart(e) {
                    this.interfaceRef.fire(GameEvent_1.GameEvent.GAME_START),
                    e && e()
                }
                gameOver(e, t, r) {
                    this.interfaceRef.fire(GameEvent_1.GameEvent.GAME_OVER, {
                        level: e,
                        score: t
                    }),
                    r && r()
                }
                levelUp(e, t, r) {
                    r && r()
                }
                addBooster() {}
                setStorageItem(e, t) {
                    Wrapper_1["default"].storageManager.setItem(e, t)
                }
                getStorageItem(e) {
                    return Wrapper_1["default"].storageManager.getItem(e)
                }
                setCloseCallback(e) {
                    Wrapper_1["default"].commsManager.setResumeCallback(e)
                }
                async loadGameScripts() {
                    if (window.gameJS) {
                        Wrapper_1["default"].instance.supportedLanguages = window.gameLangs;
                        for (const src of window.gameJS)
                            await (0,
                            html_1.createHTMLElement)({
                                src: src,
                                tag: "script"
                            });
                        try {
                            eval(window.gameOnLoadScript)
                        } catch (error) {}
                    }
                }
                trackScore(e) {
                    Wrapper_1["default"].commsManager.setScore(e)
                }
            }
            exports["default"] = SGHooksInterface
        },
        "./src/interface/SGSDK/SGSDKInterface.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/events/GameEvent.ts")
              , s = r("./src/events/InterfaceEvent.ts")
              , i = a(r("./src/events/WrapperEvent.ts"))
              , o = a(r("./src/Wrapper.ts"));
            a = a(r("./src/interface/common/InterfaceBase.ts"));
            const d = r("./src/interface/SGSDK/SGSDKTriggers.ts");
            class l extends a["default"] {
                constructor(e) {
                    super(e),
                    this.actionMapping = [],
                    (window.sgSdk = this).mapTriggers()
                }
                trigger(e, t) {
                    if (this.actionMapping[e]) {
                        const r = this.actionMapping[e].bind(this);
                        r(t)
                    }
                }
                initialize(e, t, r) {
                    this.initData = t,
                    o["default"].instance.supportedLanguages = t.supportedLanguages;
                    var a = {
                        commands: {
                            supportedLanguages: t.supportedLanguages
                        },
                        config: {
                            env: {
                                locale: o["default"].commsManager.getLanguage()
                            },
                            rewarded: {
                                enabled: !0
                            }
                        }
                    };
                    o["default"].instance.on(i["default"].GAME_PAUSE, ()=>{
                        this.initData.freezeGame()
                    }
                    ),
                    o["default"].instance.on(i["default"].GAME_RESUME, ()=>{
                        this.initData.unfreezeGame()
                    }
                    ),
                    o["default"].instance.supportedLanguages = t.supportedLanguages,
                    r && r(null, a, this)
                }
                getLocale() {
                    return o["default"].commsManager.getLanguage()
                }
                onStart() {
                    this.interfaceRef.fire(s.InterfaceEvent.LOAD_PROGRESS, {
                        progress: 101
                    }),
                    o["default"].commsManager.startGame()
                }
                onLoadingComplete() {
                    console.log("onLoadingComplete calleed"),
                    this.interfaceRef.fire(s.InterfaceEvent.LOAD_PROGRESS, {
                        progress: 101
                    }),
                    this.interfaceRef.fire(s.InterfaceEvent.LOADED),
                    this.initData.runGame()
                }
                onLoadingUpdate(e) {
                    console.log("onLoadingUpdate ::" + e.progressPercentage),
                    this.interfaceRef.fire(s.InterfaceEvent.LOAD_PROGRESS, {
                        progress: e.progressPercentage
                    }),
                    100 <= e.progressPercentage && this.interfaceRef.fire(s.InterfaceEvent.LOADED)
                }
                onGameStart() {
                    this.interfaceRef.fire(n.GameEvent.GAME_START)
                }
                onGameOver(e) {
                    this.interfaceRef.fire(n.GameEvent.GAME_OVER, e),
                    e.callback && e.callback()
                }
                onLevelStart(e) {
                    this.interfaceRef.fire(n.GameEvent.LEVEL_START, {
                        level: e.level
                    }),
                    e.callback && e.callback()
                }
                onLevelFinish(e) {
                    this.interfaceRef.fire(n.GameEvent.LEVEL_FINISH, {
                        level: e.level
                    }),
                    e.callback && e.callback()
                }
                onSave(e) {
                    o["default"].storageManager.setItem(e.key, e.value),
                    e.callback && e.callback()
                }
                onRestore(e) {
                    e.callback(null, o["default"].storageManager.getItem(e.key))
                }
                async onRewardedAd(e) {
                    var t = await o["default"].adManager.showRewardedAd();
                    e.callback && e.callback(t)
                }
                async onBeforePlayButtonDisplay(e) {
                    var t;
                    o["default"].config.adsConfig.supportsAdPlayButton && (t = await o["default"].adManager.showInterstitialAd(),
                    e.callback && e.callback(t))
                }
                async onPlayButtonPressed(e) {
                    e.callback && e.callback(!0)
                }
                onMoreGames() {}
                onGameTracking() {}
                onPageDisplay() {}
                trackScore(e) {
                    o["default"].commsManager.setScore(e)
                }
                mapTriggers() {
                    this.actionMapping[d.SGSDKTriggers.START] = this.onStart,
                    this.actionMapping[d.SGSDKTriggers.LOADING_COMPLETED] = this.onLoadingComplete,
                    this.actionMapping[d.SGSDKTriggers.LOADING_UPDATE] = this.onLoadingUpdate,
                    this.actionMapping[d.SGSDKTriggers.SAVE] = this.onSave,
                    this.actionMapping[d.SGSDKTriggers.RESTORE] = this.onRestore,
                    this.actionMapping[d.SGSDKTriggers.REWARDED_AD] = this.onRewardedAd,
                    this.actionMapping[d.SGSDKTriggers.BEFORE_PLAY_BUTTON_DISPLAY] = this.onBeforePlayButtonDisplay,
                    this.actionMapping[d.SGSDKTriggers.MORE_GAMES] = this.onMoreGames,
                    this.actionMapping[d.SGSDKTriggers.GAME_TRACKING] = this.onGameTracking,
                    this.actionMapping[d.SGSDKTriggers.PAGE_DISPLAY] = this.onPageDisplay,
                    this.actionMapping[d.SGSDKTriggers.LEVEL_START] = this.onLevelStart,
                    this.actionMapping[d.SGSDKTriggers.LEVEL_FINISH] = this.onLevelFinish,
                    this.actionMapping[d.SGSDKTriggers.GAME_START] = this.onGameStart,
                    this.actionMapping[d.SGSDKTriggers.GAME_OVER] = this.onGameOver,
                    this.actionMapping[d.SGSDKTriggers.START_LONGPLAY_AD_TIMER] = this.startLongPlayAdTimer,
                    this.actionMapping[d.SGSDKTriggers.STOP_LONGPLAY_AD_TIMER] = this.stopLongPlayAdTimer,
                    this.actionMapping[d.SGSDKTriggers.PLAY_BUTTON_PRESSED] = this.onPlayButtonPressed
                }
            }
            t["default"] = l
        },
        "./src/interface/SGSDK/SGSDKTriggers.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.SGSDKTriggers = void 0,
            (t = t.SGSDKTriggers || (t.SGSDKTriggers = {})).START = "start",
            t.LOADING_COMPLETED = "loading.completed",
            t.LOADING_UPDATE = "loading.update",
            t.SAVE = "save",
            t.RESTORE = "restore",
            t.REWARDED_AD = "rewardedAd",
            t.BEFORE_PLAY_BUTTON_DISPLAY = "beforePlayButtonDisplay",
            t.PLAY_BUTTON_PRESSED = "playButtonPressed",
            t.MORE_GAMES = "moreGames",
            t.GAME_TRACKING = "gameTracking",
            t.PAGE_DISPLAY = "pageDisplay",
            t.LEVEL_START = "levelStart",
            t.LEVEL_FINISH = "levelFinish",
            t.GAME_START = "gameStart",
            t.GAME_OVER = "gameOver",
            t.START_LONGPLAY_AD_TIMER = "startLongPlayAdTimer",
            t.STOP_LONGPLAY_AD_TIMER = "stopLongPlayAdTimer"
        }
        ,
        "./src/interface/common/InterfaceBase.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/events/AdManagerEvent.ts")
              , s = a(r("./src/Wrapper.ts"));
            class i {
                constructor(e) {
                    this.interfaceRef = e
                }
                setPauseHandler(e) {
                    s["default"].commsManager.setPauseCallback(e)
                }
                setUnpauseHandler(e) {
                    s["default"].commsManager.setResumeCallback(e)
                }
                setAdClosedCallback(e) {
                    s["default"].adManager.on(n.AdManagerEvent.AD_CLOSE, ()=>{
                        e && e()
                    }
                    )
                }
                startLongPlayAdTimer() {
                    s["default"].adManager.forceLongPlayStart(!0)
                }
                stopLongPlayAdTimer() {
                    s["default"].adManager.forceLongPlayStart(!1)
                }
                getWrapper() {
                    return s["default"].instance
                }
            }
            t["default"] = i
        },
        "./src/leaderboards/LeaderboardTypes.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LeaderboardTypes = void 0,
            (t = t.LeaderboardTypes || (t.LeaderboardTypes = {}))[t.FIREBASE = 0] = "FIREBASE",
            t[t.SAMSUNG = 1] = "SAMSUNG"
        }
        ,
        "./src/platforms/azerion/Azerion.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AZERION = void 0,
            t.AZERION = function() {
                return gdsdk || (console.warn("AZERION GDSDK IS NOT DEFINED"),
                null)
            }
        }
        ,
        "./src/platforms/azerion/AzerionAdManager.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/events/AdManagerEvent.ts")
              , s = a(r("./src/Wrapper.ts"));
            var i = a(r("./src/platforms/common/ADManager.ts"));
            const o = r("./src/platforms/azerion/Azerion.ts")
              , d = a(r("./src/platforms/azerion/AzerionAdTimer.ts"))
              , l = a(r("./src/platforms/azerion/AzerionEventDispatcher.ts"))
              , c = r("./src/platforms/azerion/constants/AzerionAdType.ts")
              , u = r("./src/platforms/azerion/events/AzerionEvent.ts")
              , f = r("./src/platforms/azerion/events/AzerionMetaEvents.ts");
            class g extends i["default"] {
                async initialize() {
                    return super.initialize(),
                    this.setupTimer(),
                    l["default"].i.on(f.AzerionMetaEvents.CONTENT_PAUSE_REQUESTED, ()=>{
                        this.fire(n.AdManagerEvent.AD_START)
                    }
                    ),
                    l["default"].i.on(u.AzerionEvent.SDK_COMPLETE, ()=>{
                        this.fire(n.AdManagerEvent.AD_CLOSE)
                    }
                    ),
                    l["default"].i.on(u.AzerionEvent.SDK_SKIPPED, ()=>{
                        this.fire(n.AdManagerEvent.AD_CLOSE)
                    }
                    ),
                    l["default"].i.on(u.AzerionEvent.SDK_GAME_START, ()=>{
                        this.fire(n.AdManagerEvent.AD_CLOSE)
                    }
                    ),
                    l["default"].i.on(u.AzerionEvent.SDK_ERROR, ()=>{
                        this.fire(n.AdManagerEvent.AD_CLOSE)
                    }
                    ),
                    l["default"].i.on(u.AzerionEvent.AD_IS_ALREADY_RUNNING, ()=>{
                        this.fire(n.AdManagerEvent.AD_CLOSE)
                    }
                    ),
                    s["default"].config.adsConfig.rewarded && this.preloadNextRewarded(),
                    Promise.resolve()
                }
                async showInterstitialAd() {
                    this.fire(n.AdManagerEvent.AD_REQUESTED),
                    this.adTimer.ready && (super.showInterstitialAd(),
                    (0,
                    o.AZERION)().showAd())
                }
                async showRewardedAd() {
                    super.showRewardedAd(),
                    this.fire(n.AdManagerEvent.AD_REQUESTED);
                    var e = new Promise(async(t,e)=>{
                        const r = ()=>{
                            l["default"].i.off(u.AzerionEvent.SDK_SKIPPED, a),
                            t(!0),
                            this.fire(n.AdManagerEvent.AD_COMPLETE),
                            this.fire(n.AdManagerEvent.AD_CLOSE)
                        }
                          , a = ()=>{
                            l["default"].i.off(u.AzerionEvent.SDK_REWARDED_WATCH_COMPLETE, r),
                            t(!1),
                            this.fire(n.AdManagerEvent.AD_SKIP),
                            this.fire(n.AdManagerEvent.AD_CLOSE)
                        }
                        ;
                        l["default"].i.once(u.AzerionEvent.SDK_REWARDED_WATCH_COMPLETE, r),
                        l["default"].i.once(u.AzerionEvent.SDK_SKIPPED, a),
                        (0,
                        o.AZERION)().showAd(c.AzerionAdType.REWARDED).then(e=>{}
                        )["catch"](e=>{
                            this.adTimer.freeRewardedReady,
                            t(!1),
                            this.fire(n.AdManagerEvent.AD_ERROR, e),
                            this.fire(n.AdManagerEvent.AD_CLOSE)
                        }
                        )
                    }
                    );
                    return this.preloadNextRewarded(),
                    e
                }
                setupTimer() {
                    this.adTimer = new d["default"],
                    super.setupTimer()
                }
                async preloadNextRewarded() {
                    var e = (await (0,
                    o.AZERION)().preloadAd(c.AzerionAdType.REWARDED))["err"];
                    e ? console.log("ADManager : Rewarded Ad could not be preloaded.") : console.log("ADManager : Rewarded Ad loaded succesfully.")
                }
            }
            t["default"] = g
        },
        "./src/platforms/azerion/AzerionAdTimer.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = a(r("./src/platforms/common/AdTimer.ts"));
            const s = a(r("./src/platforms/azerion/constants/AzerionAdRules.ts"));
            class i extends n["default"] {
                constructor() {
                    super(),
                    this.initialize(s["default"].get())
                }
            }
            t["default"] = i
        },
        "./src/platforms/azerion/AzerionCommsManager.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = a(r("./src/events/WrapperEvent.ts"))
              , s = r("./src/ui/helpers/html.ts")
              , i = a(r("./src/Wrapper.ts"));
            var o = a(r("./src/platforms/common/CommsManager.ts"));
            const d = a(r("./src/platforms/azerion/AzerionEventDispatcher.ts"))
              , l = r("./src/platforms/azerion/events/AzerionEvent.ts");
            class c extends o["default"] {
                constructor() {
                    super(...arguments),
                    this.hasPaused = !1
                }
                async initialize() {
                    window.GD_OPTIONS = {
                        gameId: i["default"].config.gameID,
                        prefix: "sg_",
                        onEvent: function(e) {
                            console.log("event :: " + e.name),
                            d["default"].i.fire(e.name, e)
                        },
                        advertisementSettings: {
                            debug: !1,
                            autoplay: !1,
                            locale: "en"
                        }
                    };
                    var e = new Promise(async(e,t)=>{
                        d["default"].i.once(l.AzerionEvent.SDK_READY, ()=>{
                            e(!0)
                        }
                        )
                    }
                    );
                    return function(e, t) {
                        let r, a = e.getElementsByTagName("script")[0];
                        e.getElementById(t) || (r = e.createElement("script"),
                        r.id = t,
                        r.src = "js/main.min.js",
                        a.parentNode.insertBefore(r, a))
                    }(document, "gamedistribution-jssdk"),
                    d["default"].i.on(l.AzerionEvent.SDK_GAME_PAUSE, ()=>{
                        this.hasPaused = !0,
                        i["default"].instance.fire(n["default"].GAME_PAUSE)
                    }
                    ),
                    d["default"].i.on(l.AzerionEvent.SDK_GAME_START, ()=>{
                        this.hasPaused && i["default"].instance.fire(n["default"].GAME_RESUME),
                        this.hasPaused = !1
                    }
                    ),
                    e
                }
                async startGame() {
                    return Promise.resolve({
                        err: null
                    })
                }
                getLanguage(e=0) {
                    return (0,
                    s.getParameterByName)("lang") || "en"
                }
                setLoadingProgress(e) {}
                setPauseCallback(e) {
                    d["default"].i.on(l.AzerionEvent.SDK_GAME_PAUSE, ()=>{
                        e && e()
                    }
                    )
                }
                setResumeCallback(e) {
                    d["default"].i.on(l.AzerionEvent.SDK_GAME_START, ()=>{
                        e && e()
                    }
                    )
                }
                setCloseCallback(e) {}
                checkPlatformSupport(e) {
                    return !0
                }
                setScore(e) {}
            }
            t["default"] = c
        },
        "./src/platforms/azerion/AzerionEventDispatcher.ts": (e,t,r)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class a extends r("./node_modules/@billjs/event-emitter/lib/index.js").EventEmitter {
                static get i() {
                    return a._i || (a._i = new a)
                }
            }
            t["default"] = a
        }
        ,
        "./src/platforms/azerion/AzerionIAPManager.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class n extends a(r("./src/platforms/common/IAPManager.ts"))["default"] {
            }
            t["default"] = n
        },
        "./src/platforms/azerion/AzerionStorageManager.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class n extends a(r("./src/platforms/common/StorageManager.ts"))["default"] {
                async setCloudData(e, t) {}
                async getCloudData(e) {
                    return null
                }
            }
            t["default"] = n
        },
        "./src/platforms/azerion/constants/AzerionAdRules.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
                constructor() {
                    this.adCooldownDuration = 15e3,
                    this.adWarningDuration = 5e3,
                    this.startOnCooldown = !1,
                    this.maxLongPlayAdTimerRollover = 2e3,
                    this.prerollAd = !0
                }
                static get() {
                    return new r
                }
            }
            t["default"] = r
        }
        ,
        "./src/platforms/azerion/constants/AzerionAdType.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AzerionAdType = void 0,
            (t.AzerionAdType || (t.AzerionAdType = {})).REWARDED = "rewarded"
        }
        ,
        "./src/platforms/azerion/constants/AzerionPlacementIDs.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AzerionPlacementIDs = void 0,
            (t = t.AzerionPlacementIDs || (t.AzerionPlacementIDs = {})).INTERSTITIAL = "tbd",
            t.REWARDED = "tbd"
        }
        ,
        "./src/platforms/azerion/events/AzerionEvent.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AzerionEvent = void 0,
            (t = t.AzerionEvent || (t.AzerionEvent = {})).SDK_GAME_START = "SDK_GAME_START",
            t.CONTENT_RESUME_REQUESTED = "CONTENT_RESUME_REQUESTED ",
            t.SDK_GAME_PAUSE = "CONTENT_PAUSE_REQUESTED",
            t.SDK_GDPR_TRACKING = "SDK_GDPR_TRACKING",
            t.SDK_REWARDED_WATCH_COMPLETE = "SDK_REWARDED_WATCH_COMPLETE",
            t.SDK_SKIPPED = "SKIPPED",
            t.SDK_COMPLETE = "COMPLETE",
            t.SDK_READY = "SDK_READY",
            t.SDK_STARTED = "STARTED",
            t.SDK_ERROR = "AD_ERROR",
            t.AD_IS_ALREADY_RUNNING = "AD_IS_ALREADY_RUNNING"
        }
        ,
        "./src/platforms/azerion/events/AzerionMetaEvents.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AzerionMetaEvents = void 0,
            (t = t.AzerionMetaEvents || (t.AzerionMetaEvents = {})).AD_ERROR = "AD_ERROR",
            t.AD_BREAK_READY = "AD_BREAK_READY",
            t.AD_METADATA = "AD_METADATA",
            t.ALL_ADS_COMPLETED = "ALL_ADS_COMPLETED",
            t.CLICK = "CLICK",
            t.COMPLETE = "COMPLETE",
            t.CONTENT_PAUSE_REQUESTED = "CONTENT_PAUSE_REQUESTED",
            t.CONTENT_RESUME_REQUESTED = "CONTENT_RESUME_REQUESTED",
            t.DURATION_CHANGE = "DURATION_CHANGE",
            t.FIRST_QUARTILE = "FIRST_QUARTILE",
            t.IMPRESSION = "IMPRESSION",
            t.INTERACTION = "INTERACTION",
            t.LINEAR_CHANGED = "LINEAR_CHANGED",
            t.LOADED = "LOADED",
            t.LOG = "LOG",
            t.MIDPOINT = "MIDPOINT",
            t.PAUSED = "PAUSED",
            t.RESUMED = "RESUMED",
            t.SKIPPABLE_STATE_CHANGED = "SKIPPABLE_STATE_CHANGED",
            t.THIRD_QUARTILE = "THIRD_QUARTILE",
            t.USER_CLOSE = "USER_CLOSE",
            t.VOLUME_CHANGED = "VOLUME_CHANGED",
            t.VOLUME_MUTED = "VOLUME_MUTED",
            t.GDPR_TARGETING = "SDK_GDPR_TARGETING",
            t.SDK_GDPR_THIRD_PARTY = "SDK_GDPR_THIRD_PARTY"
        }
        ,
        "./src/platforms/azerion/ui/AzerionSplash.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = a(r("./src/constants/style/UIStyle.ts"))
              , s = r("./src/ui/helpers/uiRoot.ts")
              , i = a(r("./src/platforms/azerion/constants/AzerionAdRules.ts"))
              , o = a(r("./src/Wrapper.ts"))
              , d = r("./src/texts.ts")
              , l = a(r("./src/events/WrapperEvent.ts"));
            class c {
                constructor() {
                    n["default"].setupUIStyle(),
                    this.root = (0,
                    s.createUIRoot)(),
                    this.build()
                }
                build() {
                    return true;
                    this.bg = document.createElement("div"),
                    this.bg.setAttribute("class", "splash-screen");
                    const e = document.createElement("img");
                    e.setAttribute("src", "./Icon_512x512.png"),
                    e.setAttribute("class", "background-image"),
                    this.bg.appendChild(e);
                    const t = document.createElement("img");
                    t.setAttribute("src", "./Icon_512x512.png"),
                    t.setAttribute("class", "game-logo-azerion"),
                    this.bg.appendChild(t);
                    const r = i["default"].get()
                      , a = ()=>{
                        this.hide(),
                        r.prerollAd && o["default"].adManager.showInterstitialAd()
                    }
                      , n = document.createElement("div");
                    n.setAttribute("class", "play-button"),
                    o["default"].instance.isReady && this.bg.appendChild(n),
                    o["default"].instance.once(l["default"].READY, ()=>{
                        this.bg.contains(n) || this.bg.appendChild(n)
                    }
                    );
                    var s = o["default"].commsManager.getLanguage(d.wrapperLanguages)
                      , s = d.TEXTS[s].play;
                    n.innerHTML += "<span class= 'play-text'>" + s + "</span>",
                    n.onclick = ()=>{
                        a()
                    }
                    ,
                    this.createdAt = new Date
                }
                show() {
                    return true;
                    document.body.appendChild(this.bg)
                }
                hide() {
                    return true;
                    document.body.contains(this.bg) && document.body.removeChild(this.bg)
                }
                destroy() {
                    return true;
                    this.hide()
                }
            }
            t["default"] = c
        },
        "./src/platforms/common/ADManager.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = r("./node_modules/@billjs/event-emitter/lib/index.js");
            const s = r("./src/events/AdManagerEvent.ts")
              , i = r("./src/events/AdTimerEvent.ts")
              , o = r("./src/events/GameEvent.ts")
              , d = a(r("./src/Wrapper.ts"));
            class l extends n.EventEmitter {
                constructor() {
                    super(),
                    this.levelsPlayedSinceLastAd = 0
                }
                async initialize() {
                    d["default"]["interface"].on(o.GameEvent.GAME_OVER, e=>{
                        this.onGameOver(e)
                    }
                    ),
                    d["default"]["interface"].on(o.GameEvent.LEVEL_FINISH, e=>{
                        this.onGameOver(e)
                    }
                    )
                }
                forceLongPlayStart(e) {
                    e ? this.adTimer.startLongPlayAdTimer() : this.adTimer.stopLongPlayAdTimer()
                }
                get longPlayTimeLeft() {
                    return this.adTimer.longPlayTimeLeft
                }
                showInterstitialAd() {
                    this.adTimer.stopLongPlayAdTimer(),
                    this.fire(s.AdManagerEvent.INTERSTITIAL_AD_REQUESTED)
                }
                showRewardedAd() {
                    this.fire(s.AdManagerEvent.REWARDED_AD_REQUESTED)
                }
                setupTimer() {
                    this.adTimer.on(i.AdTimerEvent.LONGPLAY_TRIGGER, ()=>{
                        this.showInterstitialAd()
                    }
                    )
                }
                onGameOver(e) {
                    this.shouldAdPlayOnGameEnd(e.level, e.score) && this.showInterstitialAd()
                }
                shouldAdPlayOnGameEnd(e, t) {
                    this.levelsPlayedSinceLastAd++;
                    e = !d["default"].config.adsConfig.supportsAdPlayButton && (e >= d["default"].config.adsConfig.adFreeInitialLevels || null === e || e === undefined) && this.levelsPlayedSinceLastAd > d["default"].config.adsConfig.interstitialCooldownLevel;
                    return e && (this.levelsPlayedSinceLastAd = 0),
                    e
                }
            }
            t["default"] = l
        },
        "./src/platforms/common/AdTimer.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = r("./node_modules/@billjs/event-emitter/lib/index.js");
            const s = a(r("./src/Wrapper.ts"))
              , i = r("./src/events/GameEvent.ts")
              , o = r("./src/events/AdManagerEvent.ts")
              , d = r("./src/events/AdTimerEvent.ts");
            class l extends n.EventEmitter {
                constructor() {
                    super(...arguments),
                    this._longPlayTimeLeft = -1,
                    this.isGameOrLevelPlaying = !1
                }
                get ready() {
                    return this._ready
                }
                get freeRewardedReady() {
                    return this._freeRewardedReady
                }
                get longPlayTimeLeft() {
                    return this._longPlayTimeLeft
                }
                initialize(e) {
                    if (this.adRules = e,
                    this.isLongPlayTimerRunning = !1,
                    s["default"].config.adsConfig.enableLongGameplayAds) {
                        const t = ()=>{
                            this.isGameOrLevelPlaying = !0,
                            this.startLongPlayAdTimer()
                        }
                          , r = ()=>{
                            this.isGameOrLevelPlaying = !1,
                            this.stopLongPlayAdTimer()
                        }
                        ;
                        s["default"]["interface"].on(i.GameEvent.GAME_START, ()=>{
                            t()
                        }
                        ),
                        s["default"]["interface"].on(i.GameEvent.LEVEL_START, ()=>{
                            t()
                        }
                        ),
                        s["default"]["interface"].on(i.GameEvent.GAME_OVER, ()=>{
                            r()
                        }
                        ),
                        s["default"]["interface"].on(i.GameEvent.LEVEL_FINISH, ()=>{
                            r()
                        }
                        )
                    }
                    this._ready = !e.startOnCooldown,
                    this.ready || this.startAdCoolDownTimer(),
                    this.handleFreeRewardedTimer(),
                    s["default"].adManager.on(o.AdManagerEvent.AD_SKIP, ()=>{
                        this.onAdPlayed()
                    }
                    ),
                    s["default"].adManager.on(o.AdManagerEvent.AD_ERROR, ()=>{
                        this.onAdFail()
                    }
                    )
                }
                startLongPlayAdTimer() {
                    !this.isLongPlayTimerRunning && this.isGameOrLevelPlaying && (this.isLongPlayTimerRunning = !0,
                    this.longPlayTimerID && window.clearInterval(this.longPlayTimerID),
                    this._longPlayTimeLeft = s["default"].config.adsConfig.longGameplayCooldownMS,
                    this.longPlayTimerID = window.setInterval(()=>{
                        this._longPlayTimeLeft -= 1e3,
                        this.fire(d.AdTimerEvent.LONGPLAY_TICK),
                        0 === this.longPlayTimeLeft ? (window.clearInterval(this.longPlayTimerID),
                        this.onLongPlayTimerEnd()) : this._longPlayTimeLeft <= this.adRules.adWarningDuration && (this._longPlayTimeLeft == this.adRules.adWarningDuration && this.fire(d.AdTimerEvent.LONGPLAY_WARN),
                        console.log("warning :: " + this._longPlayTimeLeft),
                        this.fire(d.AdTimerEvent.LONGPLAY_WARN_TICK))
                    }
                    , 1e3),
                    this.fire(d.AdTimerEvent.LONGPLAY_TICKER_START))
                }
                stopLongPlayAdTimer() {
                    window.clearTimeout(this.longPlayTimerID),
                    this.isLongPlayTimerRunning = !1,
                    this.fire(d.AdTimerEvent.LONGPLAY_TICKER_STOP)
                }
                startAdCoolDownTimer() {
                    this.adCooldownTimerID = window.setTimeout(()=>{
                        this.onAdCoolDownTimerEnd()
                    }
                    , this.adRules.adCooldownDuration),
                    this.fire(d.AdTimerEvent.COOLDOWN_START)
                }
                stopAdCoolDownTimer() {
                    window.clearTimeout(this.adCooldownTimerID)
                }
                handleFreeRewardedTimer() {
                    this._freeRewardedReady = !0,
                    s["default"].adManager.on(o.AdManagerEvent.FREE_REWARD_AWARDED, ()=>{
                        this._freeRewardedReady = !1,
                        window.setTimeout(()=>{
                            this._freeRewardedReady = !0
                        }
                        , s["default"].config.adsConfig.freeRewardedCooldown)
                    }
                    )
                }
                onAdPlayed() {
                    this._ready = !1,
                    this._longPlayTimeLeft = -1,
                    this.startAdCoolDownTimer()
                }
                onAdFail() {}
                onAdCoolDownTimerEnd() {
                    this._ready = !0,
                    this.fire(d.AdTimerEvent.COOLDOWN_END)
                }
                onLongPlayTimerEnd() {
                    this._longPlayTimeLeft = -1,
                    s["default"].adManager.once(o.AdManagerEvent.AD_CLOSE, ()=>{
                        s["default"].config.adsConfig.enableLongGameplayAds && (this.isLongPlayTimerRunning = !1,
                        this.startLongPlayAdTimer())
                    }
                    ),
                    this.fire(d.AdTimerEvent.LONGPLAY_TRIGGER),
                    console.log(" AD TRIGGERED!"),
                    this.isLongPlayTimerRunning = !1
                }
            }
            t["default"] = l
        },
        "./src/platforms/common/CommsManager.ts": (e,t,r)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class a extends r("./node_modules/@billjs/event-emitter/lib/index.js").EventEmitter {
                constructor() {
                    super(...arguments),
                    this.isPlatformSupported = !0
                }
                checkPlatformSupport(e) {
                    return this.isPlatformSupported = !0
                }
            }
            t["default"] = a
        }
        ,
        "./src/platforms/common/IAPManager.ts": (e,t,r)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class a extends r("./node_modules/@billjs/event-emitter/lib/index.js").EventEmitter {
                initialize() {
                    return Promise.resolve(!0)
                }
            }
            t["default"] = a
        }
        ,
        "./src/platforms/common/StorageManager.ts": (e,t,r)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const a = r("./node_modules/uuid/dist/esm-browser/index.js");
            class n {
                constructor() {
                    this.store = this.createStore()
                }
                async initialize(e) {
                    var t = e.gameSlug.replace(/-/g, "_").toUpperCase();
                    this.storageKey = (0,
                    a.v5)(t + "_STORAGE", "28c78f71-1c31-4331-a9ca-e51e9221b3fa");
                    e = this.getLocalData(this.storageKey),
                    t = await this.getCloudData(this.storageKey);
                    this.store = t || e,
                    console.log(`user data loaded from '${t ? "cloudStorage" : "localStorage"}'.`),
                    console.log("data: " + JSON.stringify(this.store))
                }
                setItem(e, t) {
                    var r = Date.now();
                    return this.store = Object.assign(Object.assign({}, this.store), {
                        [e]: t,
                        _lastUpdate: r
                    }),
                    this.save()
                }
                getItem(e) {
                    return null === this.store ? null : e === undefined ? this.store : this.store[e] || null
                }
                async save() {
                    this.saveLocalData(this.storageKey, this.store);
                    return this.setCloudData(this.storageKey, this.store)
                }
                createStore() {
                    return {
                        _lastUpdate: 0
                    }
                }
                saveLocalData(e, t) {
                    t = JSON.stringify(t);
                    localStorage.setItem(e, t)
                }
                getLocalData(e) {
                    e = localStorage.getItem(e);
                    return e && JSON.parse(e)
                }
                async setCloudData(e, t) {}
                async getCloudData(e) {
                    return null
                }
            }
            t["default"] = n
        }
        ,
        "./src/texts.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.wrapperLanguages = t.TEXTS = void 0,
            t.TEXTS = [],
            t.TEXTS.fr = {
                play: "JOUER"
            },
            t.TEXTS.de = {
                play: "SPIELEN"
            },
            t.TEXTS.en = {
                play: "PLAY"
            },
            t.TEXTS.es = {
                play: "JUEGA"
            },
            t.TEXTS.it = {
                play: "GIOCA"
            },
            t.TEXTS.pt = {
                play: "JOGAR"
            },
            t.TEXTS.ru = {
                play: "Играть"
            },
            t.TEXTS.tr = {
                play: "OYNA"
            },
            t.TEXTS.nl = {
                play: "SPEEL"
            },
            t.TEXTS.pl = {
                play: "GRAJ"
            },
            t.TEXTS.hi = {
                play: "खेलें"
            },
            t.TEXTS.vi = {
                play: "Chơi"
            },
            t.TEXTS.th = {
                play: "เล่น"
            },
            t.TEXTS.ja = {
                play: "プレイ"
            },
            t.TEXTS.kr = {
                play: "놀다"
            },
            t.TEXTS.ar = {
                play: "لعب"
            },
            t.wrapperLanguages = ["en", "fr", "de", "es", "it", "pt", "ru", "tr", "nl", "pl", "hi", "vi", "th", "ja", "kr", "ar"]
        }
        ,
        "./src/ui/CountdownTag.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/events/AdManagerEvent.ts")
              , s = r("./src/events/AdTimerEvent.ts")
              , i = a(r("./src/Wrapper.ts"))
              , o = r("./src/ui/helpers/uiRoot.ts");
            class d {
                constructor() {
                    const e = (0,
                    o.getUIRoot)();
                    this.tag = document.createElement("div"),
                    this.tag.setAttribute("class", "countdown-tag"),
                    e.appendChild(this.tag),
                    this.textfield = document.createElement("h4"),
                    this.textfield.setAttribute("class", "countdown-tag-label"),
                    this.tag.appendChild(this.textfield),
                    i["default"].adManager.adTimer.on(s.AdTimerEvent.LONGPLAY_WARN, ()=>{
                        console.log("--fx--adTimer--LONGPLAY_WARN--");
                        this.show()
                    }
                    ),
                    i["default"].adManager.adTimer.on(s.AdTimerEvent.LONGPLAY_WARN_TICK, ()=>{
                        console.log("--fx--adTimer--LONGPLAY_WARN_TICK--");
                        this.update(i["default"].adManager.adTimer.longPlayTimeLeft / 1e3)
                    }
                    ),
                    i["default"].adManager.on(n.AdManagerEvent.AD_START, ()=>{
                        console.log("--fx--adTimer--AD_START--");
                        this.hide()
                    }
                    )
                }
                show() {
                    console.log("--fx--adTimer--show--");
                    this.tag.classList.toggle("countdown-tag-fadeIn", !0)
                }
                update(e) {
                    console.log("--fx--adTimer--update--");
                    this.textfield.textContent = `Ad in ${e}s`,
                    1 === e && window.setTimeout(()=>{
                        this.hide()
                    }
                    , 1e3);
                    this.hide();
                }
                hide() {
                    console.log("--fx--adTimer--hide--");
                    this.tag.classList.toggle("countdown-tag-fadeIn", !1)
                }
            }
            t["default"] = d
        },
        "./src/ui/helpers/html.ts": (e,t)=>{
            function d(t) {
                return new Promise(e=>{
                    document.addEventListener(t, e)
                }
                )
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.getParameterByName = t.DOMEventToPromise = t.createHTMLElement = void 0,
            t.createHTMLElement = async function({tag: e, id: t, src: r, style: a, optParent: n}) {
                document.body || await d("DOMContentLoaded");
                const s = document.createElement(e);
                t && (s.id = t),
                a && s.setAttribute("style", a);
                const i = n || document.body;
                var o;
                return i.appendChild(s),
                r && (o = s,
                n = new Promise(e=>{
                    o.onload = ()=>{
                        e()
                    }
                }
                ),
                s.setAttribute("src", r),
                await n),
                s
            }
            ,
            t.DOMEventToPromise = d,
            t.getParameterByName = function(e, t=window.location.href) {
                return e = e.replace(/[\[\]]/g, "\\$&"),
                (t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t)) ? t[2] ? decodeURIComponent(t[2].replace(/\+/g, " ")) : "" : null
            }
        }
        ,
        "./src/ui/helpers/uiRoot.ts": (e,t)=>{
            function r() {
                const e = document.createElement("div");
                return e.setAttribute("id", t.UI_ROOT_ELEMENT_ID),
                e.setAttribute("class", "wrapper-ui"),
                document.body.appendChild(e),
                e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.getUIRoot = t.createUIRoot = t.UI_ROOT_ELEMENT_ID = void 0,
            t.UI_ROOT_ELEMENT_ID = "ui-root",
            t.createUIRoot = r,
            t.getUIRoot = function() {
                return document.getElementById(t.UI_ROOT_ELEMENT_ID) || r()
            }
        }
        ,
        "./src/ui/loading/ADPreloader.ts": function(e, t, r) {
            var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = r("./src/events/AdManagerEvent.ts")
              , s = a(r("./src/Wrapper.ts"))
              , i = r("./src/ui/helpers/uiRoot.ts");
            class o {
                constructor() {
                    this.root = (0,
                    i.getUIRoot)(),
                    this.bg = document.createElement("div"),
                    this.bg.setAttribute("class", "loading-screen");
                    const e = document.createElement("div");
                    e.setAttribute("class", "spinner"),
                    this.bg.appendChild(e),
                    s["default"].adManager.on(n.AdManagerEvent.AD_REQUESTED, ()=>{
                        this.show()
                    }
                    ),
                    s["default"].adManager.on(n.AdManagerEvent.AD_START, ()=>{
                        this.hide()
                    }
                    ),
                    s["default"].adManager.on(n.AdManagerEvent.AD_CLOSE, ()=>{
                        this.hide()
                    }
                    )
                }
                show() {
                    console.log("ad preloader show!"),
                    this.root.appendChild(this.bg),
                    window.setTimeout(()=>{
                        this.hide()
                    }
                    , 5e3)
                }
                hide() {
                    console.log("ad preloader hide!"),
                    this.root.contains(this.bg) && this.root.removeChild(this.bg)
                }
            }
            t["default"] = o
        },
        "./src/ui/options/FoldReloader.ts": (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class r {
                constructor() {
                    this.oldO = window.orientation,
                    this.oldW = window.innerWidth,
                    this.oldH = window.innerHeight,
                    window.addEventListener("resize", ()=>{
                        window.setTimeout(()=>{
                            var e = this.oldW !== window.innerWidth || this.oldH !== window.innerHeight
                              , t = this.oldW / this.oldH == window.innerWidth / window.innerHeight;
                            this.oldW = window.innerWidth,
                            this.oldH = window.innerHeight;
                            var r = this.oldO !== window.orientation;
                            this.oldO = window.orientation,
                            r || !e || t || location.reload()
                        }
                        , 500)
                    }
                    )
                }
            }
            t["default"] = r
        }
        ,
        "./node_modules/uuid/dist/esm-browser/index.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                v1: ()=>a["default"],
                v3: ()=>n["default"],
                v4: ()=>s["default"],
                v5: ()=>i["default"],
                NIL: ()=>o["default"],
                version: ()=>d["default"],
                validate: ()=>l["default"],
                stringify: ()=>c["default"],
                parse: ()=>u["default"]
            });
            var a = r("./node_modules/uuid/dist/esm-browser/v1.js")
              , n = r("./node_modules/uuid/dist/esm-browser/v3.js")
              , s = r("./node_modules/uuid/dist/esm-browser/v4.js")
              , i = r("./node_modules/uuid/dist/esm-browser/v5.js")
              , o = r("./node_modules/uuid/dist/esm-browser/nil.js")
              , d = r("./node_modules/uuid/dist/esm-browser/version.js")
              , l = r("./node_modules/uuid/dist/esm-browser/validate.js")
              , c = r("./node_modules/uuid/dist/esm-browser/stringify.js")
              , u = r("./node_modules/uuid/dist/esm-browser/parse.js")
        }
        ,
        "./node_modules/uuid/dist/esm-browser/md5.js": (e,t,r)=>{
            function u(e) {
                return 14 + (e + 64 >>> 9 << 4) + 1
            }
            function f(e, t) {
                var r = (65535 & e) + (65535 & t);
                return (e >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
            }
            function o(e, t, r, a, n, s) {
                return f((s = f(f(t, e), f(a, s))) << n | s >>> 32 - n, r)
            }
            function g(e, t, r, a, n, s, i) {
                return o(t & r | ~t & a, e, t, n, s, i)
            }
            function _(e, t, r, a, n, s, i) {
                return o(t & a | r & ~a, e, t, n, s, i)
            }
            function m(e, t, r, a, n, s, i) {
                return o(t ^ r ^ a, e, t, n, s, i)
            }
            function p(e, t, r, a, n, s, i) {
                return o(r ^ (t | ~a), e, t, n, s, i)
            }
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            const a = function(e) {
                if ("string" == typeof e) {
                    var t = unescape(encodeURIComponent(e));
                    e = new Uint8Array(t.length);
                    for (var r = 0; r < t.length; ++r)
                        e[r] = t.charCodeAt(r)
                }
                return function(e) {
                    for (var t = [], r = 32 * e.length, a = "0123456789abcdef", n = 0; n < r; n += 8) {
                        var s = e[n >> 5] >>> n % 32 & 255
                          , s = parseInt(a.charAt(s >>> 4 & 15) + a.charAt(15 & s), 16);
                        t.push(s)
                    }
                    return t
                }(function(e, t) {
                    e[t >> 5] |= 128 << t % 32,
                    e[u(t) - 1] = t;
                    for (var r = 1732584193, a = -271733879, n = -1732584194, s = 271733878, i = 0; i < e.length; i += 16) {
                        var o = r
                          , d = a
                          , l = n
                          , c = s;
                        r = g(r, a, n, s, e[i], 7, -680876936),
                        s = g(s, r, a, n, e[i + 1], 12, -389564586),
                        n = g(n, s, r, a, e[i + 2], 17, 606105819),
                        a = g(a, n, s, r, e[i + 3], 22, -1044525330),
                        r = g(r, a, n, s, e[i + 4], 7, -176418897),
                        s = g(s, r, a, n, e[i + 5], 12, 1200080426),
                        n = g(n, s, r, a, e[i + 6], 17, -1473231341),
                        a = g(a, n, s, r, e[i + 7], 22, -45705983),
                        r = g(r, a, n, s, e[i + 8], 7, 1770035416),
                        s = g(s, r, a, n, e[i + 9], 12, -1958414417),
                        n = g(n, s, r, a, e[i + 10], 17, -42063),
                        a = g(a, n, s, r, e[i + 11], 22, -1990404162),
                        r = g(r, a, n, s, e[i + 12], 7, 1804603682),
                        s = g(s, r, a, n, e[i + 13], 12, -40341101),
                        n = g(n, s, r, a, e[i + 14], 17, -1502002290),
                        a = g(a, n, s, r, e[i + 15], 22, 1236535329),
                        r = _(r, a, n, s, e[i + 1], 5, -165796510),
                        s = _(s, r, a, n, e[i + 6], 9, -1069501632),
                        n = _(n, s, r, a, e[i + 11], 14, 643717713),
                        a = _(a, n, s, r, e[i], 20, -373897302),
                        r = _(r, a, n, s, e[i + 5], 5, -701558691),
                        s = _(s, r, a, n, e[i + 10], 9, 38016083),
                        n = _(n, s, r, a, e[i + 15], 14, -660478335),
                        a = _(a, n, s, r, e[i + 4], 20, -405537848),
                        r = _(r, a, n, s, e[i + 9], 5, 568446438),
                        s = _(s, r, a, n, e[i + 14], 9, -1019803690),
                        n = _(n, s, r, a, e[i + 3], 14, -187363961),
                        a = _(a, n, s, r, e[i + 8], 20, 1163531501),
                        r = _(r, a, n, s, e[i + 13], 5, -1444681467),
                        s = _(s, r, a, n, e[i + 2], 9, -51403784),
                        n = _(n, s, r, a, e[i + 7], 14, 1735328473),
                        a = _(a, n, s, r, e[i + 12], 20, -1926607734),
                        r = m(r, a, n, s, e[i + 5], 4, -378558),
                        s = m(s, r, a, n, e[i + 8], 11, -2022574463),
                        n = m(n, s, r, a, e[i + 11], 16, 1839030562),
                        a = m(a, n, s, r, e[i + 14], 23, -35309556),
                        r = m(r, a, n, s, e[i + 1], 4, -1530992060),
                        s = m(s, r, a, n, e[i + 4], 11, 1272893353),
                        n = m(n, s, r, a, e[i + 7], 16, -155497632),
                        a = m(a, n, s, r, e[i + 10], 23, -1094730640),
                        r = m(r, a, n, s, e[i + 13], 4, 681279174),
                        s = m(s, r, a, n, e[i], 11, -358537222),
                        n = m(n, s, r, a, e[i + 3], 16, -722521979),
                        a = m(a, n, s, r, e[i + 6], 23, 76029189),
                        r = m(r, a, n, s, e[i + 9], 4, -640364487),
                        s = m(s, r, a, n, e[i + 12], 11, -421815835),
                        n = m(n, s, r, a, e[i + 15], 16, 530742520),
                        a = m(a, n, s, r, e[i + 2], 23, -995338651),
                        r = p(r, a, n, s, e[i], 6, -198630844),
                        s = p(s, r, a, n, e[i + 7], 10, 1126891415),
                        n = p(n, s, r, a, e[i + 14], 15, -1416354905),
                        a = p(a, n, s, r, e[i + 5], 21, -57434055),
                        r = p(r, a, n, s, e[i + 12], 6, 1700485571),
                        s = p(s, r, a, n, e[i + 3], 10, -1894986606),
                        n = p(n, s, r, a, e[i + 10], 15, -1051523),
                        a = p(a, n, s, r, e[i + 1], 21, -2054922799),
                        r = p(r, a, n, s, e[i + 8], 6, 1873313359),
                        s = p(s, r, a, n, e[i + 15], 10, -30611744),
                        n = p(n, s, r, a, e[i + 6], 15, -1560198380),
                        a = p(a, n, s, r, e[i + 13], 21, 1309151649),
                        r = p(r, a, n, s, e[i + 4], 6, -145523070),
                        s = p(s, r, a, n, e[i + 11], 10, -1120210379),
                        n = p(n, s, r, a, e[i + 2], 15, 718787259),
                        a = p(a, n, s, r, e[i + 9], 21, -343485551),
                        r = f(r, o),
                        a = f(a, d),
                        n = f(n, l),
                        s = f(s, c)
                    }
                    return [r, a, n, s]
                }(function(e) {
                    if (0 === e.length)
                        return [];
                    for (var t = 8 * e.length, r = new Uint32Array(u(t)), a = 0; a < t; a += 8)
                        r[a >> 5] |= (255 & e[a / 8]) << a % 32;
                    return r
                }(e), 8 * e.length))
            }
        }
        ,
        "./node_modules/uuid/dist/esm-browser/nil.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            const a = "00000000-0000-0000-0000-000000000000"
        }
        ,
        "./node_modules/uuid/dist/esm-browser/parse.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>n
            });
            var a = r("./node_modules/uuid/dist/esm-browser/validate.js");
            const n = function(e) {
                if (!(0,
                a["default"])(e))
                    throw TypeError("Invalid UUID");
                var t, r = new Uint8Array(16);
                return r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24,
                r[1] = t >>> 16 & 255,
                r[2] = t >>> 8 & 255,
                r[3] = 255 & t,
                r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8,
                r[5] = 255 & t,
                r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8,
                r[7] = 255 & t,
                r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8,
                r[9] = 255 & t,
                r[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255,
                r[11] = t / 4294967296 & 255,
                r[12] = t >>> 24 & 255,
                r[13] = t >>> 16 & 255,
                r[14] = t >>> 8 & 255,
                r[15] = 255 & t,
                r
            }
        }
        ,
        "./node_modules/uuid/dist/esm-browser/regex.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            const a = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
        }
        ,
        "./node_modules/uuid/dist/esm-browser/rng.js": (e,t,r)=>{
            var a;
            r.r(t),
            r.d(t, {
                "default": ()=>function() {
                    if (!a && !(a = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
                        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                    return a(n)
                }
            });
            var n = new Uint8Array(16)
        }
        ,
        "./node_modules/uuid/dist/esm-browser/sha1.js": (e,t,r)=>{
            function S(e, t) {
                return e << t | e >>> 32 - t
            }
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            const a = function(e) {
                var t = [1518500249, 1859775393, 2400959708, 3395469782]
                  , r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                if ("string" == typeof e) {
                    var a = unescape(encodeURIComponent(e));
                    e = [];
                    for (var n = 0; n < a.length; ++n)
                        e.push(a.charCodeAt(n))
                } else
                    Array.isArray(e) || (e = Array.prototype.slice.call(e));
                e.push(128);
                for (var s = e.length / 4 + 2, i = Math.ceil(s / 16), o = new Array(i), d = 0; d < i; ++d) {
                    for (var l = new Uint32Array(16), c = 0; c < 16; ++c)
                        l[c] = e[64 * d + 4 * c] << 24 | e[64 * d + 4 * c + 1] << 16 | e[64 * d + 4 * c + 2] << 8 | e[64 * d + 4 * c + 3];
                    o[d] = l
                }
                o[i - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32),
                o[i - 1][14] = Math.floor(o[i - 1][14]),
                o[i - 1][15] = 8 * (e.length - 1) & 4294967295;
                for (var u = 0; u < i; ++u) {
                    for (var f = new Uint32Array(80), g = 0; g < 16; ++g)
                        f[g] = o[u][g];
                    for (var _ = 16; _ < 80; ++_)
                        f[_] = S(f[_ - 3] ^ f[_ - 8] ^ f[_ - 14] ^ f[_ - 16], 1);
                    for (var m = r[0], p = r[1], E = r[2], A = r[3], h = r[4], v = 0; v < 80; ++v)
                        var T = Math.floor(v / 20)
                          , T = S(m, 5) + function(e, t, r, a) {
                            switch (e) {
                            case 0:
                                return t & r ^ ~t & a;
                            case 1:
                                return t ^ r ^ a;
                            case 2:
                                return t & r ^ t & a ^ r & a;
                            case 3:
                                return t ^ r ^ a
                            }
                        }(T, p, E, A) + h + t[T] + f[v] >>> 0
                          , h = A
                          , A = E
                          , E = S(p, 30) >>> 0
                          , p = m
                          , m = T;
                    r[0] = r[0] + m >>> 0,
                    r[1] = r[1] + p >>> 0,
                    r[2] = r[2] + E >>> 0,
                    r[3] = r[3] + A >>> 0,
                    r[4] = r[4] + h >>> 0
                }
                return [r[0] >> 24 & 255, r[0] >> 16 & 255, r[0] >> 8 & 255, 255 & r[0], r[1] >> 24 & 255, r[1] >> 16 & 255, r[1] >> 8 & 255, 255 & r[1], r[2] >> 24 & 255, r[2] >> 16 & 255, r[2] >> 8 & 255, 255 & r[2], r[3] >> 24 & 255, r[3] >> 16 & 255, r[3] >> 8 & 255, 255 & r[3], r[4] >> 24 & 255, r[4] >> 16 & 255, r[4] >> 8 & 255, 255 & r[4]]
            }
        }
        ,
        "./node_modules/uuid/dist/esm-browser/stringify.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>i
            });
            for (var a = r("./node_modules/uuid/dist/esm-browser/validate.js"), n = [], s = 0; s < 256; ++s)
                n.push((s + 256).toString(16).substr(1));
            const i = function(e) {
                var t = 1 < arguments.length && arguments[1] !== undefined ? arguments[1] : 0
                  , e = (n[e[t + 0]] + n[e[t + 1]] + n[e[t + 2]] + n[e[t + 3]] + "-" + n[e[t + 4]] + n[e[t + 5]] + "-" + n[e[t + 6]] + n[e[t + 7]] + "-" + n[e[t + 8]] + n[e[t + 9]] + "-" + n[e[t + 10]] + n[e[t + 11]] + n[e[t + 12]] + n[e[t + 13]] + n[e[t + 14]] + n[e[t + 15]]).toLowerCase();
                if (!(0,
                a["default"])(e))
                    throw TypeError("Stringified UUID is invalid");
                return e
            }
        }
        ,
        "./node_modules/uuid/dist/esm-browser/v1.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            var c, u, f = r("./node_modules/uuid/dist/esm-browser/rng.js"), g = r("./node_modules/uuid/dist/esm-browser/stringify.js"), _ = 0, m = 0;
            const a = function(e, t, r) {
                var a = t && r || 0
                  , n = t || new Array(16)
                  , s = (e = e || {}).node || c
                  , i = e.clockseq !== undefined ? e.clockseq : u;
                null != s && null != i || (d = e.random || (e.rng || f["default"])(),
                null == s && (s = c = [1 | d[0], d[1], d[2], d[3], d[4], d[5]]),
                null == i && (i = u = 16383 & (d[6] << 8 | d[7])));
                var o = e.msecs !== undefined ? e.msecs : Date.now()
                  , r = e.nsecs !== undefined ? e.nsecs : m + 1
                  , d = o - _ + (r - m) / 1e4;
                if (d < 0 && e.clockseq === undefined && (i = i + 1 & 16383),
                1e4 <= (r = (d < 0 || _ < o) && e.nsecs === undefined ? 0 : r))
                    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                _ = o,
                u = i,
                r = (1e4 * (268435455 & (o += 122192928e5)) + (m = r)) % 4294967296,
                n[a++] = r >>> 24 & 255,
                n[a++] = r >>> 16 & 255,
                n[a++] = r >>> 8 & 255,
                n[a++] = 255 & r,
                o = o / 4294967296 * 1e4 & 268435455,
                n[a++] = o >>> 8 & 255,
                n[a++] = 255 & o,
                n[a++] = o >>> 24 & 15 | 16,
                n[a++] = o >>> 16 & 255,
                n[a++] = i >>> 8 | 128,
                n[a++] = 255 & i;
                for (var l = 0; l < 6; ++l)
                    n[a + l] = s[l];
                return t || (0,
                g["default"])(n)
            }
        }
        ,
        "./node_modules/uuid/dist/esm-browser/v3.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            t = r("./node_modules/uuid/dist/esm-browser/v35.js"),
            r = r("./node_modules/uuid/dist/esm-browser/md5.js");
            const a = (0,
            t["default"])("v3", 48, r["default"])
        }
        ,
        "./node_modules/uuid/dist/esm-browser/v35.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                DNS: ()=>a,
                URL: ()=>n,
                "default": ()=>function(e, i, o) {
                    function t(e, t, r, a) {
                        if ("string" == typeof e && (e = function(e) {
                            e = unescape(encodeURIComponent(e));
                            for (var t = [], r = 0; r < e.length; ++r)
                                t.push(e.charCodeAt(r));
                            return t
                        }(e)),
                        16 !== (t = "string" == typeof t ? (0,
                        l["default"])(t) : t).length)
                            throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                        var n = new Uint8Array(16 + e.length);
                        if (n.set(t),
                        n.set(e, t.length),
                        (n = o(n))[6] = 15 & n[6] | i,
                        n[8] = 63 & n[8] | 128,
                        r) {
                            a = a || 0;
                            for (var s = 0; s < 16; ++s)
                                r[a + s] = n[s];
                            return r
                        }
                        return (0,
                        d["default"])(n)
                    }
                    try {
                        t.name = e
                    } catch (r) {}
                    return t.DNS = a,
                    t.URL = n,
                    t
                }
            });
            var d = r("./node_modules/uuid/dist/esm-browser/stringify.js")
              , l = r("./node_modules/uuid/dist/esm-browser/parse.js");
            var a = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
              , n = "6ba7b811-9dad-11d1-80b4-00c04fd430c8"
        }
        ,
        "./node_modules/uuid/dist/esm-browser/v4.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            var s = r("./node_modules/uuid/dist/esm-browser/rng.js")
              , i = r("./node_modules/uuid/dist/esm-browser/stringify.js");
            const a = function(e, t, r) {
                var a = (e = e || {}).random || (e.rng || s["default"])();
                if (a[6] = 15 & a[6] | 64,
                a[8] = 63 & a[8] | 128,
                t) {
                    r = r || 0;
                    for (var n = 0; n < 16; ++n)
                        t[r + n] = a[n];
                    return t
                }
                return (0,
                i["default"])(a)
            }
        }
        ,
        "./node_modules/uuid/dist/esm-browser/v5.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>a
            });
            t = r("./node_modules/uuid/dist/esm-browser/v35.js"),
            r = r("./node_modules/uuid/dist/esm-browser/sha1.js");
            const a = (0,
            t["default"])("v5", 80, r["default"])
        }
        ,
        "./node_modules/uuid/dist/esm-browser/validate.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>n
            });
            var a = r("./node_modules/uuid/dist/esm-browser/regex.js");
            const n = function(e) {
                return "string" == typeof e && a["default"].test(e)
            }
        }
        ,
        "./node_modules/uuid/dist/esm-browser/version.js": (e,t,r)=>{
            r.r(t),
            r.d(t, {
                "default": ()=>n
            });
            var a = r("./node_modules/uuid/dist/esm-browser/validate.js");
            const n = function(e) {
                if (!(0,
                a["default"])(e))
                    throw TypeError("Invalid UUID");
                return parseInt(e.substr(14, 1), 16)
            }
        }
    }
      , __webpack_module_cache__ = {};
    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        if (t !== undefined)
            return t.exports;
        t = __webpack_module_cache__[e] = {
            exports: {}
        };
        return __webpack_modules__[e].call(t.exports, t, t.exports, __webpack_require__),
        t.exports
    }
    __webpack_require__.d = (e,t)=>{
        for (var r in t)
            __webpack_require__.o(t, r) && !__webpack_require__.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    }
    ,
    __webpack_require__.o = (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
    __webpack_require__.r = e=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ;
    var __webpack_exports__ = __webpack_require__("./src/index/indexAzerion.ts")
}
)();
