DEBUG_ENABLED=false;BUILD_TIMESTAMP=1537347403140;FORCED_ORIENTATION="landscape";RENDERER="canvas";var util;
(function (util) {
    var Scale = (function () {
        function Scale() {
        }
        Scale.determineAssetType = function () {
            if (Game.config["forcedAssetType"] != null && Game.config["assetTypes"][Game.config["forcedAssetType"]] != undefined) {
                Scale.assetType = Game.config["forcedAssetType"];
            }
            else {
                var sizeTest;
                if (Game.game.device.desktop) {
                    if (Game.orientation == "portrait") {
                        sizeTest = window.innerHeight;
                    }
                    else if (Game.orientation == "landscape") {
                        sizeTest = window.innerWidth;
                    }
                }
                else {
                    if (Game.orientation == "portrait") {
                        sizeTest = document.documentElement.offsetHeight;
                    }
                    else if (Game.orientation == "landscape") {
                        sizeTest = document.documentElement.offsetWidth;
                    }
                }
                Object.keys(Game.config["assetTypes"]).forEach(function (type) {
                    if (Scale.assetType)
                        return;
                    var data = Game.config["assetTypes"][type];
                    if (data["minRes"] && data["maxRes"]) {
                        if (sizeTest > data["minRes"] && sizeTest <= data["maxRes"]) {
                            Scale.assetType = type;
                        }
                    }
                    else if (data["minRes"]) {
                        if (sizeTest > data["minRes"]) {
                            Scale.assetType = type;
                        }
                    }
                    else if (data["maxRes"]) {
                        if (sizeTest <= data["maxRes"]) {
                            Scale.assetType = type;
                        }
                    }
                    else {
                        throw "Asset type " + type + " is missing a minRes and/or maxRes in config.json";
                    }
                });
                if (!Scale.assetType) {
                    Scale.assetType = Object.keys(Game.config["assetTypes"])[0];
                }
            }
            Scale.imageScale = Game.config["assetTypes"][Scale.assetType]["scale"];
        };
        Scale.setup = function () {
            util.Scale.determineAssetType();
            var orientationSettings = this._getOrientationSettings();
            Game.game.scale.setMinMax(orientationSettings["minResolution"].width, orientationSettings["minResolution"].height);
            Game.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            Game.dimensions = util.Scale.getDimensions();
            Game.game.scale.setGameSize(Game.dimensions.width, Game.dimensions.height);
        };
        Scale.getGameRatio = function () {
            var windowRatio, gameRatio, orientationSettings = this._getOrientationSettings();
            if (Game.orientation == "portrait") {
                windowRatio = window.innerHeight / window.innerWidth;
                gameRatio = Phaser.Math.clamp(windowRatio, 1 / orientationSettings["minRatio"], 1 / orientationSettings["maxRatio"]);
            }
            else if (Game.orientation == "landscape") {
                windowRatio = window.innerWidth / window.innerHeight;
                gameRatio = Phaser.Math.clamp(windowRatio, 1 / orientationSettings["maxRatio"], 1 / orientationSettings["minRatio"]);
            }
            return gameRatio;
        };
        Scale.getDimensions = function () {
            var dimensions, orientationSettings = this._getOrientationSettings();
            if (Game.orientation == "portrait") {
                var gameWidth = orientationSettings["workingWidth"] * Scale.imageScale;
                dimensions = new util.Dimensions(gameWidth, gameWidth * Scale.getGameRatio());
            }
            else if (Game.orientation == "landscape") {
                if (orientationSettings["workingHeight"]) {
                    var gameHeight = orientationSettings["workingHeight"] * Scale.imageScale;
                    dimensions = new util.Dimensions(gameHeight * Scale.getGameRatio(), gameHeight);
                }
                else {
                    var gameWidth = orientationSettings["workingWidth"] * Scale.imageScale;
                    dimensions = new util.Dimensions(gameWidth, gameWidth / Scale.getGameRatio());
                }
            }
            return dimensions;
        };
        Scale.getCanvasScale = function () {
            return parseInt(Game.game.canvas.style.width, 10) / Game.game.canvas.width;
        };
        Scale._getOrientationSettings = function () {
            return Game.config["orientationSettings"][Game.orientation];
        };
        Scale.assetType = null;
        Scale.imageScale = null;
        return Scale;
    })();
    util.Scale = Scale;
})(util || (util = {}));
var util;
(function (util) {
    var Dimensions = (function () {
        function Dimensions(width, height) {
            this.width = width;
            this.height = height;
        }
        Dimensions.prototype.set = function (width, height) {
            this.width = width;
            this.height = height;
        };
        return Dimensions;
    })();
    util.Dimensions = Dimensions;
})(util || (util = {}));
///<reference path="util/Scale.ts" />
///<reference path="util/Dimensions.ts" />
var Game = (function () {
    function Game() {
    }
    Game.init = function () {
        var renderer;
        if (RENDERER == "canvas") {
            renderer = Phaser.CANVAS;
        }
        else if (RENDERER == "webgl") {
            renderer = Phaser.WEBGL;
        }
        else {
            if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null) {
                renderer = Phaser.CANVAS;
            }
            else {
                renderer = Phaser.AUTO;
            }
        }
        Game.game = new Phaser.Game(0, 0, renderer, "phaser-game", {
            preload: Game.preload,
            create: Game.create
        });
        PokiSDK.init().then(function () {
            Game.pokiSDKLoaded = true;
        }).catch(function () {
        });
        for (var stateName in Game._states) {
            Game.game.state.add(stateName, Game._states[stateName]);
        }
    };
    Game.preload = function () {
        Game.game.load.json("images", "assets/data/images.json");
        Game.game.load.json("config", "assets/data/config.json");
    };
    Game.create = function () {
        Game.config = Game.game.cache.getJSON("config");
        Game.orientation = Game.config["forcedOrientation"] ? Game.config["forcedOrientation"] : (window.innerWidth > window.innerHeight ? "landscape" : "portrait");
        Game.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        util.Scale.setup();
        if (Game.game.debug && Game.game.debug.sprite) {
            Game.game.debug.bmd = null;
            Game.game.debug.sprite.destroy();
            Game.game.debug.sprite = null;
            Game.game.debug.context = null;
            Game.game.debug.canvas = null;
            Game.game.debug.boot();
        }
        Game.game.time.advancedTiming = true;
        Game.game.stage.disableVisibilityChange = true;
        window.onfocus = null;
        window.onblur = null;
        Game.analytics = new util.Analytics(Game.config["googleAnalyticsKey"], Game.config["flurryKey"]);
        Game.analytics.pageview("GameInit");
        Game.analytics.event("VersionInfo", "BuildTimestamp", BUILD_TIMESTAMP);
        Game.analytics.event("VersionInfo", "BuildDate", util.TimeFormatter.unixToFullDate(parseInt(BUILD_TIMESTAMP) * .001));
        Game.save = new util.Save();
        Game.test = new util.Test();
        Game.effects = new util.Effects();
        Game.events = new util.Events();
        util.Debug.logScalingInfo();
        Game.game.state.start("BrandingState");
    };
    Game.addState = function (stateName, state) {
        Game._states[stateName] = state;
    };
    Game.scale = function (value) {
        if (util.Scale.imageScale == undefined)
            util.Debug.error("You cannot use Game.scale before util.Scale.setup() is ran");
        return util.Scale.imageScale * value;
    };
    Game.unScale = function (value) {
        if (util.Scale.imageScale == undefined)
            util.Debug.error("You cannot use Game.scale before util.Scale.setup() is ran");
        return value / util.Scale.imageScale;
    };
    Game.screenScale = function (value) {
        if (util.Scale.imageScale == undefined)
            util.Debug.error("You cannot use Game.screenScale before util.Scale.setup() is ran");
        return Math.round(util.Scale.imageScale * value * util.Scale.getCanvasScale());
    };
    Game.makeScreenshot = function (callback) {
        if (Game.renderer == "canvas") {
            callback(Game.game.canvas.toDataURL());
        }
        else {
            Game.state.onRender(function () {
                callback(Game.game.canvas.toDataURL());
            }, true);
        }
    };
    Game.openUrl = function (url) {
        if (Game.game.device.iOS) {
            window.location.href = url;
        }
        else {
            window.open(url);
        }
    };
    Object.defineProperty(Game, "state", {
        get: function () {
            var state = Game.game.state.getCurrentState();
            if (!(state instanceof states.BaseState))
                console.error("All states should extend the BaseState and implement IState!", state);
            return state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game, "renderer", {
        get: function () {
            if (Game.game.renderer instanceof PIXI.CanvasRenderer) {
                return "canvas";
            }
            else {
                return "webgl";
            }
        },
        enumerable: true,
        configurable: true
    });
    Game.pokiSDKLoaded = false;
    Game._states = {};
    return Game;
})();
/**
 * Bootstrap
 *
 * Handles the starting of the game, and checking of window orientation
 */
var startTime = new Date().getTime();
// ga("send", "event", "Screen", "pre-game-loader");
if (document.readyState != "loading") {
    bootstrap();
}
else {
    document.addEventListener("DOMContentLoaded", bootstrap);
}
function bootstrap() {
    // ga("send", "event", "Timing", "pre-game-loader-finished", "loadingTime", new Date().getTime() - startTime);
    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null, visibleCheckStarted = false, gameStarted = false;
    if (FORCED_ORIENTATION == null || DEBUG_ENABLED || !isMobile) {
        startVisibilityCheck();
    }
    else {
        var orientationDiv = document.createElement("div");
        orientationDiv.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;background:#fff;text-align:center";
        orientationDiv.style.display = "none";
        document.body.appendChild(orientationDiv);
        var helper = document.createElement("div");
        helper.style.cssText = "display:inline-block;height:100%;vertical-align:middle;";
        orientationDiv.appendChild(helper);
        var orientationGraphic = document.createElement("img");
        orientationGraphic.src = "assets/static/orientation-" + FORCED_ORIENTATION + ".png";
        orientationGraphic.style.cssText = "max-width: 50%;max-height:50%;vertical-align:middle;";
        orientationDiv.appendChild(orientationGraphic);
        checkOrientation();
        window.addEventListener("resize", checkOrientation, false);
        window.addEventListener("focus", checkOrientation, false);
        function checkOrientation() {
            var orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
            if (orientation == FORCED_ORIENTATION) {
                orientationDiv.style.display = "none";
                startVisibilityCheck();
            }
            else {
                orientationDiv.style.display = "block";
            }
        }
    }
    function startVisibilityCheck() {
        if (visibleCheckStarted)
            return;
        visibleCheckStarted = true;
        checkVisible();
    }
    function checkVisible() {
        if (window.innerWidth == 0 || window.innerHeight == 0) {
            window.setTimeout(checkVisible, 500);
        }
        else {
            startGame();
        }
    }
    function startGame() {
        if (gameStarted)
            return;
        gameStarted = true;
        Game.init();
    }
}
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var states;
(function (states) {
    var BaseState = (function (_super) {
        __extends(BaseState, _super);
        function BaseState() {
            _super.apply(this, arguments);
            this._updateCallbacks = [];
            this._renderCallbacks = [];
            this._stepLimitedCallbacks = [];
        }
        BaseState.prototype.onUpdate = function (callback, runOnce) {
            if (runOnce === void 0) { runOnce = false; }
            this._updateCallbacks.push({
                callback: callback,
                runOnce: runOnce
            });
        };
        BaseState.prototype.onRender = function (callback, runOnce) {
            if (runOnce === void 0) { runOnce = false; }
            this._renderCallbacks.push({
                callback: callback,
                runOnce: runOnce
            });
        };
        BaseState.prototype.removeOnUpdate = function (callback) {
            var _this = this;
            this._updateCallbacks.forEach(function (item, idx) {
                if (item == null)
                    return;
                if (item.callback == callback) {
                    _this._updateCallbacks[idx] = null;
                }
            });
        };
        BaseState.prototype.removeOnRender = function (callback) {
            var _this = this;
            this._renderCallbacks.forEach(function (item, idx) {
                if (item == null)
                    return;
                if (item.callback == callback) {
                    _this._renderCallbacks[idx] = null;
                }
            });
        };
        BaseState.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            util.Debug.calcAvgFPS();
            this._updateCallbacks.forEach(function (callback, idx) {
                if (callback == null)
                    return;
                callback.callback();
                if (callback.runOnce) {
                    _this._updateCallbacks.splice(idx);
                }
            });
            if (Game.config["trackFPS"] != null && Game.config["trackFPS"]) {
                this._runOncePerNSteps("TrackFPS", 500, function () {
                    util.Debug.trackFPS();
                });
            }
        };
        BaseState.prototype.render = function () {
            var _this = this;
            _super.prototype.update.call(this);
            util.Debug.renderFPS();
            this._renderCallbacks.forEach(function (callback, idx) {
                if (callback == null)
                    return;
                callback.callback();
                if (callback.runOnce) {
                    _this._renderCallbacks.splice(idx);
                }
            });
        };
        BaseState.prototype._setupLayers = function () {
            this.farBackLayer = Game.game.add.group();
            this.backLayer = Game.game.add.group();
            this.midLayer = Game.game.add.group();
            this.frontLayer = Game.game.add.group();
            this.uiLayer = Game.game.add.group();
            this.fixedUiLayer = Game.game.add.group();
            this.fixedUiLayer.fixedToCamera = true;
        };
        BaseState.prototype._resetCameraAndBounds = function () {
            var x = 0, y = 0, width = Game.game.camera.width, height = Game.game.camera.height;
            Game.game.world.bounds.setTo(x, y, width, height);
            if (Game.game.camera.bounds) {
                Game.game.camera.bounds.setTo(x, y, width, height);
            }
        };
        BaseState.prototype._setBounds = function (bounds) {
            Game.game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
            Game.game.camera.bounds.setTo(bounds.x, bounds.y, bounds.width, bounds.height);
        };
        BaseState.prototype._runOncePerNSteps = function (id, steps, callback) {
            if (!this._stepLimitedCallbacks[id]) {
                this._stepLimitedCallbacks[id] = {
                    totalSteps: steps,
                    currentSteps: steps,
                    callback: callback
                };
            }
            else {
                var data = this._stepLimitedCallbacks[id];
                if (data.currentSteps == 0) {
                    callback();
                    data.currentSteps = data.totalSteps;
                }
                else {
                    data.currentSteps--;
                }
            }
        };
        BaseState.prototype._fadeOut = function (callback) {
            var overlay = util.Sprite.createSprite(Game.dimensions.width, Game.dimensions.height, { r: 0, g: 0, b: 0 });
            overlay.alpha = 0;
            Game.game.add.existing(overlay);
            var tween = Game.game.add.tween(overlay).to({
                alpha: 1
            }, 500, Phaser.Easing.Cubic.Out, true);
            if (callback != undefined) {
                tween.onComplete.add(callback, this);
            }
        };
        return BaseState;
    })(Phaser.State);
    states.BaseState = BaseState;
})(states || (states = {}));
var states;
(function (states) {
    var BrandingState = (function (_super) {
        __extends(BrandingState, _super);
        function BrandingState() {
            _super.apply(this, arguments);
        }
        BrandingState.prototype.preload = function () {
            var images = Game.game.cache.getJSON("images");
            for (var idx in images[util.Scale.assetType]["sheets"]) {
                var path = images[util.Scale.assetType]["sheets"][idx], key = path.split("/").splice(3).join("/");
                if (key != "preroll")
                    continue;
                Game.game.load.atlasJSONHash(key, path + ".png", path + ".json");
                util.Cleaner.addToCacheCleanupQueue("JSON", key);
            }
        };
        BrandingState.prototype.create = function () {
            Game.analytics.pageview("BrandingState");
            this._initBackground();
            this._fadeOut(function () {
                Game.game.state.start("PreloadState");
            });
        };
        BrandingState.prototype._initBackground = function () {
            Game.game.stage.backgroundColor = 0x39baea;
        };
        BrandingState.prototype._initLogo = function () {
            var pokiLogo = Game.game.add.sprite(Game.game.world.centerX, 0, "preroll", "poki-logo");
            pokiLogo.y = -pokiLogo.height;
            pokiLogo.anchor.set(0.5, 0.5);
            var tween = Game.game.add.tween(pokiLogo).to({
                y: Game.game.world.centerY
            }, 1000, Phaser.Easing.Bounce.Out, true);
            util.Cleaner.addToDestroyQueue(pokiLogo);
            util.Cleaner.addToDestroyQueue(tween);
        };
        BrandingState.prototype.destroy = function () {
            util.Cleaner.cleanupAll();
        };
        return BrandingState;
    })(states.BaseState);
    states.BrandingState = BrandingState;
})(states || (states = {}));
Game.addState("BrandingState", states.BrandingState);
var util;
(function (util) {
    var Analytics = (function () {
        function Analytics(gaKey, flurryKey) {
            // this._gaEnabled = false;
            // this._flurryEnabled = false;
            // if (gaKey != undefined && typeof ga != "undefined") {
            //     this._gaEnabled = true;
            //     ga("create", gaKey, "auto");
            // }
            // if (flurryKey != undefined && typeof FlurryAgent != "undefined") {
            //     this._flurryEnabled = true;
            //     FlurryAgent.startSession(flurryKey);
            // }
        }
        Analytics.prototype.pageview = function (page) {
            // if (this._gaEnabled) {
            //     ga("send", "pageview", page);
            // }
            // if (this._flurryEnabled) {
            //     FlurryAgent.logEvent("Pageview - " + page);
            // }
        };
        Analytics.prototype.event = function (category, action, label, value) {
            // if (this._gaEnabled) {
            //     if (typeof value !== "undefined") {
            //         value = value ? Math.round(value * 1) : 0;
            //     }
            //     else {
            //         value = 0;
            //     }
            //     if (typeof label !== "undefined") {
            //         label = label ? label : '';
            //     }
            //     else {
            //         label = '';
            //     }
            //     ga("send", "event", category, action, label, value);
            // }
            // if (this._flurryEnabled) {
            //     FlurryAgent.logEvent(category + " - " + action + " - " + label, {
            //         value: value ? value.toString() : undefined
            //     });
            // }
        };
        return Analytics;
    })();
    util.Analytics = Analytics;
})(util || (util = {}));
/**
 * Turns out, this adds nothing. Phaser memory management is pretty good.
 */
var util;
(function (util) {
    var Cleaner = (function () {
        function Cleaner() {
        }
        Cleaner.cleanupCache = function (type, key) {
            var methodName = "remove" + type;
            if (Phaser.Cache.prototype.hasOwnProperty(methodName)) {
                Game.game.cache[methodName](key);
            }
            else {
                util.Debug.warn("Phaser.Cache doesn't have a method called " + methodName);
            }
        };
        Cleaner.destroy = function (object) {
            if (typeof object["destroy"] == "function") {
                if (object instanceof Phaser.Group) {
                    object.children.forEach(function (child) {
                        Cleaner.destroy(child);
                    });
                    object.destroy();
                }
                else {
                    object.destroy();
                }
            }
            object = null;
        };
        Cleaner.addToDestroyQueue = function (object, queueId) {
            if (queueId === void 0) { queueId = "all"; }
            if (Cleaner._destroyQueues[queueId] == undefined) {
                Cleaner._destroyQueues[queueId] = [];
            }
            Cleaner._destroyQueues[queueId].push(object);
        };
        Cleaner.addToCacheCleanupQueue = function (type, key, queueId) {
            if (queueId === void 0) { queueId = "all"; }
            if (Cleaner._cacheCleanupQueues[queueId] == undefined) {
                Cleaner._cacheCleanupQueues[queueId] = [];
            }
            Cleaner._cacheCleanupQueues[queueId].push({ type: type, key: key });
        };
        Cleaner.cleanupQueue = function (queueId) {
            Object.keys(Cleaner._destroyQueues).forEach(function (id) {
                if (id == queueId) {
                    Cleaner._destroyQueues[id].forEach(function (object) {
                        Cleaner.destroy(object);
                    });
                    delete Cleaner._destroyQueues[id];
                }
            });
            Object.keys(Cleaner._cacheCleanupQueues).forEach(function (id) {
                if (id == queueId) {
                    Cleaner._cacheCleanupQueues[id].forEach(function (data) {
                        Cleaner.cleanupCache(data.type, data.key);
                    });
                    delete Cleaner._cacheCleanupQueues[id];
                }
            });
        };
        Cleaner.cleanupAll = function () {
            Object.keys(Cleaner._destroyQueues).forEach(function (id) {
                if (Cleaner._destroyQueues[id] == undefined)
                    return;
                Cleaner._destroyQueues[id].forEach(function (object) {
                    Cleaner.destroy(object);
                });
                delete Cleaner._destroyQueues[id];
            });
            Object.keys(Cleaner._cacheCleanupQueues).forEach(function (id) {
                if (Cleaner._cacheCleanupQueues[id] == undefined)
                    return;
                Cleaner._cacheCleanupQueues[id].forEach(function (data) {
                    Cleaner.cleanupCache(data.type, data.key);
                });
                delete Cleaner._cacheCleanupQueues[id];
            });
        };
        Cleaner._destroyQueues = {};
        Cleaner._cacheCleanupQueues = {};
        return Cleaner;
    })();
    util.Cleaner = Cleaner;
})(util || (util = {}));
/**
 * util.ColorUtil
 *
 *
 */
var util;
(function (util) {
    var Color = (function () {
        function Color() {
        }
        Color.RGBtoHEX = function (rgb) {
            function componentToHex(c) {
                var hex = Math.floor(c).toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }
            return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
        };
        Color.HSLtoHEX = function (hsl) {
            return Color.RGBtoHEX(Color.HSLtoRGB(hsl));
        };
        Color.HEXtoRGB = function (hex) {
            return Phaser.Color.hexToColor(hex);
        };
        Color.HSLtoRGB = function (hsl) {
            return Phaser.Color.HSLtoRGB(hsl.h, hsl.s, hsl.l);
        };
        Color.HEXtoHSL = function (value) {
            var rgb = Phaser.Color.hexToColor(value);
            return Phaser.Color.RGBtoHSL(rgb.r, rgb.g, rgb.b);
        };
        Color.HEXtoINT = function (hex) {
            return parseInt(hex.replace("#", ""), 16);
        };
        Color.getRandomHex = function () {
            return (function co(lor) {
                return (lor +=
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"][Math.floor(Math.random() * 16)])
                    && (lor.length == 6) ? lor : co(lor);
            })("");
        };
        return Color;
    })();
    util.Color = Color;
})(util || (util = {}));
var util;
(function (util) {
    var Cookie = (function () {
        function Cookie() {
        }
        Cookie.createCookie = function (name, value, days) {
            if (days === void 0) { days = 365; }
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        };
        Cookie.readCookie = function (name) {
            var nameEQ = name + "=", cookieArray = document.cookie.split(';');
            for (var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i];
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(nameEQ) == 0) {
                    return cookie.substring(nameEQ.length, cookie.length);
                }
            }
            return null;
        };
        Cookie.eraseCookie = function (name) {
            Cookie.createCookie(name, "", -1);
        };
        return Cookie;
    })();
    util.Cookie = Cookie;
})(util || (util = {}));
var util;
(function (util) {
    var Debug = (function () {
        function Debug() {
        }
        Debug.calcAvgFPS = function () {
            if (Game.game.time.fps !== null) {
                if (Debug._fps.length > 100) {
                    Debug._fps.shift();
                }
                Debug._fps.push(Game.game.time.fps);
                var totalFps = 0;
                for (var idx in Debug._fps) {
                    totalFps += Debug._fps[idx];
                }
                var decimals = 2;
                Debug._avgFPS = Math.round(totalFps / Debug._fps.length * 10 * decimals) / 10 / decimals;
            }
        };
        Debug.renderFPS = function () {
            if (!DEBUG_ENABLED)
                return;
            Game.game.debug.text("FPS: " + Game.game.time.fps + " (AVG: " + Debug._avgFPS + ")", 2, 14, "#00ff00");
        };
        Debug.trackFPS = function () {
            if (Debug._fpsTrackedPerState[Game.state.key] == undefined) {
                Debug._fpsTrackedPerState[Game.state.key] = 0;
            }
            else {
                Debug._fpsTrackedPerState[Game.state.key]++;
            }
            if (Game.state.key == "GameState") {
                if (Debug._fpsTrackedPerState[Game.state.key] > 100) {
                    return;
                }
            }
            else if (Debug._fpsTrackedPerState[Game.state.key] > 10) {
                return;
            }
            Game.analytics.event("Performance", "FPS", Game.state.key, Debug._avgFPS);
        };
        Debug.logCreationTime = function () {
            Game.analytics.event("LoadTimes", "Creation", "Time", (Date.now() - Debug._creationStartTime) / 1000);
            if (!DEBUG_ENABLED)
                return;
            Debug.log("Game was created in " + (Date.now() - Debug._creationStartTime) / 1000 + " seconds");
        };
        Debug.logScalingInfo = function () {
            Game.analytics.event("ScalingInfo", "Available dimensions", window.screen.availWidth + "x" + window.screen.availHeight);
            Game.analytics.event("ScalingInfo", "Screen dimensions", window.screen.width + "x" + window.screen.height);
            Game.analytics.event("ScalingInfo", "Game dimensions", Game.dimensions.width + "x" + Game.dimensions.height);
            Game.analytics.event("ScalingInfo", "Asset type", util.Scale.assetType);
            if (!DEBUG_ENABLED)
                return;
            Debug.log("Game orientation: " + Game.orientation);
            Debug.log("Screen available dimensions: " + window.screen.availWidth + "x" + window.screen.availHeight);
            Debug.log("Screen dimensions: " + window.screen.width + "x" + window.screen.height);
            Debug.log("Game dimensions: " + Game.dimensions.width + "x" + Game.dimensions.height);
            Debug.log("Game ratio: " + util.Scale.getGameRatio());
            Debug.log("Asset type: " + util.Scale.assetType);
        };
        Debug.warn = function (message) {
            if (!DEBUG_ENABLED)
                return;
            console.warn(message);
        };
        Debug.error = function (message) {
            if (!DEBUG_ENABLED)
                return;
            console.error(message);
        };
        Debug.log = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i - 0] = arguments[_i];
            }
            if (!DEBUG_ENABLED)
                return;
            console.log.apply(console, messages);
        };
        Debug.startTime = function (id) {
            if (!DEBUG_ENABLED)
                return;
            Debug._startTimes[id] = Date.now();
        };
        Debug.stopTime = function (id) {
            if (!DEBUG_ENABLED)
                return;
            if (!Debug._times[id]) {
                Debug._times[id] = [];
            }
            Debug._times[id].push(Date.now() - Debug._startTimes[id]);
        };
        Debug.getAverageTime = function (id) {
            if (!DEBUG_ENABLED)
                return 0;
            if (Debug._times[id] && Debug._times[id].length) {
                var total = 0;
                Debug._times[id].forEach(function (time) {
                    total += time;
                });
                return total / Debug._times[id].length;
            }
            else {
                return 0;
            }
        };
        Debug.logAverageTimes = function () {
            if (!DEBUG_ENABLED)
                return;
            Object.keys(Debug._times).forEach(function (id) {
                var avgTime = Debug.getAverageTime(id) / 1000;
                Debug.log(id + " - Average of: " + avgTime + " seconds over " + Debug._times[id].length + " iterations with a total of " + avgTime * Debug._times[id].length + " seconds");
            });
        };
        Debug._fps = [];
        Debug._creationStartTime = Date.now();
        Debug._avgFPS = 0;
        Debug._startTimes = [];
        Debug._times = [];
        Debug._fpsTrackedPerState = {};
        return Debug;
    })();
    util.Debug = Debug;
})(util || (util = {}));
var util;
(function (util) {
    var Effects = (function () {
        function Effects() {
            this._screenFlashSprite = null;
            this.cameraShakeOffset = new Phaser.Point(0, 0);
        }
        Effects.prototype.prepare = function () {
            this._prepareScreenFlash();
        };
        Effects.prototype._prepareScreenFlash = function () {
            this._screenFlashSprite = util.Sprite.createSprite(Game.dimensions.width, Game.dimensions.height, { r: 122, g: 122, b: 122 });
            this._screenFlashSprite.fixedToCamera = true;
            this._screenFlashSprite.alpha = 0;
            Game.game.add.existing(this._screenFlashSprite);
        };
        Effects.prototype.screenFlash = function (color, maxAlpha, duration) {
            if (maxAlpha === void 0) { maxAlpha = .8; }
            if (duration === void 0) { duration = 50; }
            if (!this._screenFlashSprite) {
                this._prepareScreenFlash();
            }
            Game.game.world.bringToTop(this._screenFlashSprite);
            this._screenFlashSprite.tint = color;
            var flashTween = Game.game.add.tween(this._screenFlashSprite).to({ alpha: maxAlpha }, duration, Phaser.Easing.Linear.None, true, 0, 0, true);
            flashTween.onComplete.add(function () {
                this._screenFlashSprite.alpha = 0;
            }, this);
        };
        Effects.prototype.screenShake = function (strength, frames) {
            var _this = this;
            if (strength === void 0) { strength = 5; }
            if (frames === void 0) { frames = 20; }
            if (this._screenShakes > 0)
                return;
            if (frames % 2 > 0)
                frames++;
            this._lastShakedAt = Game.game.time.now;
            this._screenShakes = frames;
            var shakeCallback = function () {
                if (_this._screenShakes > 0) {
                    _this._screenShakes--;
                    var amt = Game.scale(_this._screenShakes * 0.5 * strength);
                    if (_this._screenShakes % 2) {
                        Game.game.camera.y += amt;
                        Game.game.camera.x += amt;
                        _this.cameraShakeOffset.y = amt;
                        _this.cameraShakeOffset.x = amt;
                    }
                    else {
                        Game.game.camera.y -= amt;
                        Game.game.camera.x -= amt;
                        _this.cameraShakeOffset.y = -amt;
                        _this.cameraShakeOffset.x = -amt;
                    }
                    if (_this._screenShakes == 0) {
                        _this.cameraShakeOffset.setTo(0, 0);
                    }
                    Game.game.camera.displayObject.position.y = -Game.game.camera.view.y;
                    Game.game.camera.displayObject.position.x = -Game.game.camera.view.x;
                }
                else {
                    Game.state.removeOnUpdate(shakeCallback);
                }
            };
            Game.state.onUpdate(shakeCallback);
        };
        Effects.prototype.reset = function () {
            this._lastShakedAt = null;
            this._screenShakes = null;
            this.cameraShakeOffset = new Phaser.Point(0, 0);
            this._screenFlashSprite = null;
        };
        return Effects;
    })();
    util.Effects = Effects;
})(util || (util = {}));
var util;
(function (util) {
    var Events = (function () {
        function Events() {
            this._callbacks = {};
        }
        Events.prototype.addListener = function (eventName, callback, context) {
            if (!this._callbacks[eventName]) {
                this._callbacks[eventName] = [];
            }
            this._callbacks[eventName].push({
                callback: callback,
                context: context
            });
        };
        Events.prototype.removeListener = function (eventName, callback, context) {
            var idx = this._callbacks[eventName].indexOf({
                callback: callback,
                context: context
            });
            if (idx > -1) {
                this._callbacks[eventName][idx] = null;
            }
        };
        Events.prototype.trigger = function (eventName) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            if (this._callbacks[eventName]) {
                this._callbacks[eventName].forEach(function (data) {
                    data.callback.call(data.context, parameters);
                });
            }
        };
        Events.prototype.clearByName = function (eventName) {
            this._callbacks[eventName] = [];
        };
        Events.prototype.clearAll = function () {
            this._callbacks = {};
        };
        return Events;
    })();
    util.Events = Events;
})(util || (util = {}));
var util;
(function (util) {
    var PokiGameScore = (function () {
        function PokiGameScore() {
        }
        PokiGameScore.init = function () {
            if (typeof POKI_GAME_SCORE == "undefined")
                return;
            var pokiGameScore = new POKI_GAME_SCORE(window.top);
            pokiGameScore.send(pokiGameScore.events.bridge);
            pokiGameScore.addEventListener(pokiGameScore.events.rating, function (data) {
                Game.analytics.event("Performance", "Rating", Game.state.key, data['score']);
            });
        };
        return PokiGameScore;
    })();
    util.PokiGameScore = PokiGameScore;
})(util || (util = {}));
var util;
(function (util) {
    var PositionGroupSprite = (function (_super) {
        __extends(PositionGroupSprite, _super);
        function PositionGroupSprite() {
            _super.apply(this, arguments);
        }
        PositionGroupSprite.prototype.setGroup = function (group) {
            this._parentTransform = group;
        };
        PositionGroupSprite.prototype.updateTransform = function () {
            if (!this.visible) {
                return;
            }
            this.displayObjectUpdateTransform(this._parentTransform);
        };
        return PositionGroupSprite;
    })(Phaser.Sprite);
    util.PositionGroupSprite = PositionGroupSprite;
})(util || (util = {}));
var util;
(function (util) {
    var PositionHelper = (function () {
        function PositionHelper() {
        }
        PositionHelper.centerHorizontally = function (items, betweenMargin, bounds) {
            if (betweenMargin === void 0) { betweenMargin = 0; }
            bounds = bounds || Game.game.world.bounds;
            var totalSize = betweenMargin * (items.length - 1);
            items.forEach(function (item) {
                totalSize += item.width;
            });
            var xPos = bounds.y + bounds.width / 2 - totalSize / 2;
            items.forEach(function (item) {
                var anchor = item.anchor || (item instanceof Phaser.Group ? new Phaser.Point(.5, .5) : new Phaser.Point());
                item.x = xPos - (item.width * -anchor.x);
                xPos += (item.width + betweenMargin);
            });
        };
        PositionHelper.centerVertically = function (items, betweenMargin, bounds) {
            if (betweenMargin === void 0) { betweenMargin = 0; }
            bounds = bounds || Game.game.world.bounds;
            var totalSize = betweenMargin * (items.length - 1);
            items.forEach(function (item) {
                totalSize += item.height;
            });
            var yPos = bounds.y + bounds.height / 2 - totalSize / 2;
            items.forEach(function (item) {
                var anchor = item.anchor || (item instanceof Phaser.Group ? new Phaser.Point(.5, .5) : new Phaser.Point());
                item.y = yPos - (item.height * -anchor.y);
                yPos += (item.height + betweenMargin);
            });
        };
        return PositionHelper;
    })();
    util.PositionHelper = PositionHelper;
})(util || (util = {}));
var util;
(function (util) {
    var Save = (function () {
        function Save() {
            this._data = {};
            this._localStorageSupported = undefined;
            var rawData;
            if (this.localStorageSupported()) {
                rawData = localStorage.getItem(Game.config["gameId"]);
            }
            else {
                rawData = util.Cookie.readCookie(Game.config["gameId"]);
            }
            this._data = JSON.parse(rawData) || {};
            if (Object.keys(this._data).length == 0) {
                this._data["dateCreated"] = Date.now();
            }
        }
        Save.prototype.load = function (key) {
            return this._data[key];
        };
        Save.prototype.save = function (key, value) {
            this._data[key] = value;
            this.doSave();
        };
        Save.prototype.doSave = function () {
            this._data["dateModified"] = Date.now();
            if (this.localStorageSupported()) {
                localStorage.setItem(Game.config["gameId"], JSON.stringify(this._data));
            }
            else {
                util.Cookie.createCookie(Game.config["gameId"], JSON.stringify(this._data));
            }
        };
        Save.prototype.clear = function (key) {
            if (typeof this._data[key] !== "undefined") {
                delete this._data[key];
                this.doSave();
            }
        };
        Save.prototype.localStorageSupported = function () {
            var testKey = 'test', storage = window.sessionStorage;
            if (this._localStorageSupported === undefined) {
                try {
                    storage.setItem(testKey, '1');
                    storage.removeItem(testKey);
                    this._localStorageSupported = true;
                }
                catch (error) {
                    this._localStorageSupported = false;
                }
            }
            return this._localStorageSupported;
        };
        return Save;
    })();
    util.Save = Save;
})(util || (util = {}));
var util;
(function (util) {
    var Sound = (function () {
        function Sound() {
        }
        Sound.playFx = function (id, loop) {
            if (loop === void 0) { loop = false; }
            if (Sound.muted || Sound.soundMuted)
                return;
            if (Sound._sounds[id] == undefined) {
                Sound._sounds[id] = Game.game.add.audio(id, this._soundVolume, loop);
            }
            Sound._sounds[id].play();
        };
        Sound.stopFx = function (id) {
            if (Sound._sounds[id] != undefined) {
                Sound._sounds[id].stop();
            }
        };
        Sound.playMusic = function (id, loop, onCompleteCallback) {
            if (loop === void 0) { loop = true; }
            if (onCompleteCallback === void 0) { onCompleteCallback = null; }
            if (Sound._musics[id] == undefined) {
                Sound._musics[id] = Game.game.add.audio(id, this._musicVolume, loop);
                if (!loop && onCompleteCallback !== null) {
                    Sound._musics[id].onStop.add(onCompleteCallback);
                }
            }
            var music = Sound._musics[id];
            if (Sound.muted || Sound.musicMuted) {
                var pauseOnPlay = function () {
                    music.pause();
                    music.onPlay.remove(pauseOnPlay);
                };
                music.onPlay.add(pauseOnPlay);
            }
            if (music.isPlaying)
                return;
            this.pauseAllMusic();
            music.play();
        };
        Sound.stopMusic = function (id) {
            if (Sound._musics[id] != undefined) {
                Sound._musics[id].stop();
            }
        };
        Sound.setMusicVolume = function (id, volume) {
            Sound._musics[id].volume = volume;
        };
        Sound.pauseMusic = function (id) {
            if (typeof Sound._musics[id] !== "undefined") {
                Sound._musics[id].pause();
            }
        };
        Sound.pauseAllMusic = function () {
            for (var key in Sound._musics) {
                Sound._musics[key].pause();
            }
        };
        Sound.resumeMusic = function (id) {
            if (typeof Sound._musics[id] !== "undefined") {
                Sound._musics[id].resume();
            }
        };
        Sound.pauseAll = function () {
            for (var key in Sound._sounds) {
                Sound._sounds[key].pause();
            }
            for (var key in Sound._musics) {
                Sound._musics[key].pause();
            }
        };
        Sound.resumeAll = function () {
            for (var key in Sound._sounds) {
                Sound._sounds[key].resume();
            }
            for (var key in Sound._musics) {
                Sound._musics[key].resume();
            }
        };
        Sound.resumeAllMusic = function () {
            for (var key in Sound._musics) {
                Sound._musics[key].resume();
            }
        };
        Sound.setAllMusicVolume = function (volume) {
            for (var key in Sound._musics) {
                Sound._musics[key].volume = volume;
            }
        };
        Sound.setSoundVolume = function (id, volume) {
            Sound._sounds[id].volume = volume;
        };
        Sound.pauseAllSound = function () {
            for (var key in Sound._sounds) {
                Sound._sounds[key].pause();
            }
        };
        Sound.setAllSoundVolume = function (volume) {
            for (var key in Sound._sounds) {
                Sound._sounds[key].volume = volume;
            }
        };
        Sound.mute = function () {
            this.pauseAllMusic();
            this.pauseAllSound();
            Sound.muted = true;
            Game.save.save("muted", true);
        };
        Sound.muteSounds = function () {
            this.pauseAllSound();
            Sound.soundMuted = true;
            Game.save.save("soundMuted", true);
        };
        Sound.muteMusic = function () {
            this.pauseAllMusic();
            Sound.musicMuted = true;
            Game.save.save("musicMuted", true);
        };
        Sound.unMute = function () {
            Sound.muted = false;
            Game.save.save("muted", false);
        };
        Sound.unMuteSounds = function () {
            Sound.soundMuted = false;
            Game.save.save("soundMuted", false);
        };
        Sound.unMuteMusic = function () {
            this.resumeAllMusic();
            Sound.musicMuted = false;
            Game.save.save("musicMuted", false);
        };
        Sound.muted = false;
        Sound.soundMuted = false;
        Sound.musicMuted = false;
        Sound._musics = {};
        Sound._sounds = {};
        Sound._soundVolume = 1;
        Sound._musicVolume = 1;
        return Sound;
    })();
    util.Sound = Sound;
})(util || (util = {}));
/**
 * Sprite util class
 */
var util;
(function (util) {
    var Sprite = (function () {
        function Sprite() {
        }
        Sprite.createBitmapData = function (width, height, color) {
            if (color === void 0) { color = undefined; }
            var bitmapData = Game.game.make.bitmapData(width, height);
            if (color != undefined) {
                bitmapData.fill(color.r, color.g, color.b);
            }
            return bitmapData;
        };
        Sprite.createSprite = function (width, height, color) {
            if (color === void 0) { color = undefined; }
            var bmd = Sprite.createBitmapData(width, height, color);
            return new Phaser.Sprite(Game.game, 0, 0, bmd);
        };
        Sprite.maskColor = function (mask, color) {
            var base = util.Sprite.createBitmapData(mask.width, mask.height, color), finalImage = Game.game.make.bitmapData(mask.width, mask.height);
            finalImage.alphaMask(base, mask);
            return finalImage;
        };
        return Sprite;
    })();
    util.Sprite = Sprite;
})(util || (util = {}));
var util;
(function (util) {
    var Test = (function () {
        function Test() {
            this._testGroups = Game.save.load("testGroups") || {};
        }
        Test.prototype.assignTestGroup = function (testKey, groupSize) {
            if (groupSize === void 0) { groupSize = 2; }
            if (this._testGroups[testKey] != undefined) {
                util.Debug.log("Testgroup for '" + testKey + "': " + this._testGroups[testKey]);
                Game.analytics.event("TestGroup", testKey, this._testGroups[testKey]);
                return;
            }
            var groups = ["A", "B", "C"].slice(0, groupSize), key = Math.floor(Math.random() * groups.length);
            this._testGroups[testKey] = groups[key];
            Game.save.save("testGroups", this._testGroups);
            util.Debug.log("Testgroup for '" + testKey + "': " + groups[key]);
            Game.analytics.event("TestGroup", testKey, groups[key]);
        };
        Test.prototype.getTestGroup = function (testKey) {
            if (this._testGroups[testKey] == undefined) {
                util.Debug.error("No test group assigned yet for '" + testKey + "'");
                return;
            }
            return this._testGroups[testKey];
        };
        return Test;
    })();
    util.Test = Test;
})(util || (util = {}));
var util;
(function (util) {
    var TimeFormatter = (function () {
        function TimeFormatter() {
        }
        TimeFormatter.unixToFullDate = function (time) {
            var date = new Date();
            date.setSeconds(time);
            var year = date.getFullYear() + "";
            var month = ("0" + (date.getMonth() + 1)).substr(-2);
            var day = ("0" + date.getDate()).substr(-2);
            var hour = ("0" + date.getHours()).substr(-2);
            var minutes = ("0" + date.getMinutes()).substr(-2);
            var seconds = ("0" + date.getSeconds()).substr(-2);
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        };
        return TimeFormatter;
    })();
    util.TimeFormatter = TimeFormatter;
})(util || (util = {}));
var character;
(function (character) {
    var Player = (function () {
        function Player(characterString, playerMaterial, isLeft, group) {
            if (characterString === void 0) { characterString = "messi"; }
            if (playerMaterial === void 0) { playerMaterial = null; }
            if (isLeft === void 0) { isLeft = false; }
            if (group === void 0) { group = Game.state.midLayer; }
            this.grounded = false;
            this.isLeft = false;
            this.isMoving = false;
            this.x = 0;
            this.y = 0;
            this.stunTime = 400;
            this._playerScale = .5;
            this._orientationIsLeft = false;
            this._isKicking = false;
            this._kickTime = 200;
            this._kickDelay = 200;
            this._kickForce = Game.scale(2900);
            this._moveSpeed = Game.scale(1000);
            this._jumpCounter = 0;
            this._jumpLimit = 2;
            this._ballKickDistance = Game.scale(270);
            this._headRelativePosition = new Phaser.Point(Game.scale(0), Game.scale(110));
            this._headAngle = 0;
            this._headScale = new Phaser.Point(1, 1);
            this._leftShoeRelativePosition = new Phaser.Point(Game.scale(65), Game.scale(260));
            this._leftShoeRelativeBasePosition = this._leftShoeRelativePosition.clone();
            this._leftShoeAngle = 0;
            this._leftShoeScale = new Phaser.Point(1, 1);
            this._rightShoeRelativePosition = new Phaser.Point(Game.scale(-45), Game.scale(260));
            this._rightShoeRelativeBasePosition = this._rightShoeRelativePosition.clone();
            this._rightShoeAngle = 0;
            this._rightShoeScale = new Phaser.Point(1, 1);
            this._leftArmRelativePosition = new Phaser.Point(Game.scale(175), Game.scale(170));
            this._leftArmAngle = 0;
            this._leftArmScale = new Phaser.Point(1, 1);
            this._rightArmRelativePosition = new Phaser.Point(Game.scale(-195), Game.scale(170));
            this._rightArmAngle = 0;
            this._rightArmScale = new Phaser.Point(1, 1);
            this._followBall = true;
            this._isRunning = false;
            this._runSteps = 0;
            this._isPunching = false;
            this._isJumping = false;
            this._playerPolyRaw = [
                0.4, 0.75,
                0.6, 0.75,
                .85, 1,
                .85, 1.25,
                0.6, 1.5,
                0.6, 2,
                0.4, 2,
                0.4, 1.5,
                0.15, 1.25,
                0.15, 1
            ];
            this._playerPoly = [];
            this.isLeft = isLeft;
            this._playerShadow = Game.game.add.sprite(0, Game.dimensions.height * .768, "effects", "player-shadow", group);
            this._playerShadow.anchor.set(.5, .5);
            this._characterString = characterString;
            var bodySprite = util.Sprite.createSprite(Game.scale(200), Game.scale(200), { r: 0, g: 0, b: 0 });
            bodySprite.alpha = 0;
            this.body = Game.game.add.existing(bodySprite);
            this.body.anchor.set(.5, .5);
            this._leftArm = Game.game.add.sprite(0, 0, "character", characterString + "-hand-back", group);
            this._leftArm.anchor.set(.5, .5);
            this._leftShoe = Game.game.add.sprite(0, 0, "character", characterString + "-foot", group);
            this._leftShoe.anchor.set(.5, .5);
            this._head = Game.game.add.sprite(0, 0, "character", characterString + "-head", group);
            this._head.anchor.set(.5, .8);
            this._rightShoe = Game.game.add.sprite(0, 0, "character", characterString + "-foot", group);
            this._rightShoe.anchor.set(.5, .5);
            this._rightArm = Game.game.add.sprite(0, 0, "character", characterString + "-hand-front", group);
            this._rightArm.anchor.set(.5, .5);
            Game.game.physics.p2.enable(this.body, false);
            this.setPlayerScale();
            this.body.body.mass = 100;
            this.body.body.immovable = false;
            this.body.body.fixedRotation = true;
            this.body.body.damping = 0.5;
            if (playerMaterial === null) {
                playerMaterial = Game.game.physics.p2.createMaterial('playerMaterial');
            }
            this.body.body.setMaterial(playerMaterial);
            this._prepareGrassEmitter();
        }
        Player.prototype.isCharacter = function (characterString) {
            return this._characterString == characterString;
        };
        Player.prototype.changeCharacter = function (characterString) {
            this._characterString = characterString;
            this._leftArm.frameName = this._characterString + "-hand-back";
            this._rightArm.frameName = this._characterString + "-hand-front";
            this._leftShoe.frameName = this._characterString + "-foot";
            this._rightShoe.frameName = this._characterString + "-foot";
            this._head.frameName = this._characterString + "-head";
        };
        Player.prototype.getBallKickDistance = function () {
            return this._ballKickDistance;
        };
        Player.prototype.cheer = function (length) {
            var _this = this;
            this._followBall = false;
            this.lookNatural();
            var leftArmBase = this._leftArmRelativePosition.clone();
            var rightArmBase = this._rightArmRelativePosition.clone();
            this._leftArmAngle = -90;
            this._rightArmAngle = 150;
            this._leftArmRelativePosition.set(leftArmBase.x, leftArmBase.y - Game.scale(100));
            this._rightArmRelativePosition.set(leftArmBase.x - Game.scale(200), rightArmBase.y - Game.scale(100));
            var armInterval = setInterval(function () {
                if (_this._isPunching)
                    return;
                Game.game.add.tween(_this._leftArmRelativePosition).to({
                    x: leftArmBase.x + Game.scale(40),
                    y: leftArmBase.y - Game.scale(330)
                }, 350, Phaser.Easing.Quadratic.Out, true, 0, 0, true);
                Game.game.add.tween(_this._rightArmRelativePosition).to({
                    x: rightArmBase.x + Game.scale(80),
                    y: rightArmBase.y - Game.scale(330)
                }, 350, Phaser.Easing.Quadratic.Out, true, 0, 0, true);
                _this.jump(Game.scale(500));
            }, 800);
            setTimeout(function () {
                _this._leftArmRelativePosition = leftArmBase;
                _this._rightArmRelativePosition = rightArmBase;
                _this._leftArmAngle = 0;
                _this._rightArmAngle = 0;
                _this._followBall = true;
                clearInterval(armInterval);
            }, length);
        };
        Player.prototype.sad = function (length) {
            var _this = this;
            this._followBall = false;
            this.lookNatural();
            this._headAngle = 45;
            setTimeout(function () {
                _this._headAngle = 0;
                _this._followBall = true;
            }, length);
        };
        Player.prototype.run = function () {
            this._isRunning = true;
        };
        Player.prototype.idle = function () {
            var _this = this;
            this._isRunning = false;
            if (!this._isKicking) {
                this._rightShoeRelativePosition = this._rightShoeRelativeBasePosition.clone();
                this._leftShoeRelativePosition = this._leftShoeRelativeBasePosition.clone();
            }
            else {
                setTimeout(function () {
                    _this._rightShoeRelativePosition = _this._rightShoeRelativeBasePosition.clone();
                    _this._leftShoeRelativePosition = _this._leftShoeRelativeBasePosition.clone();
                }, this._kickTime);
            }
        };
        Player.prototype.getKickVelocityIfWeKickBallAtPosition = function (ballPosition) {
            if (ballPosition === void 0) { ballPosition = null; }
            if (ballPosition === null) {
                var ball = Game.state.gameplayHandler.getBall();
                ballPosition = new Phaser.Point(ball.sprite.position.x - ball.sprite.width / 2, ball.sprite.position.y - ball.sprite.height / 2);
            }
            var ballDistance = this.getDistance(ballPosition);
            if (ballDistance < this._ballKickDistance) {
                var kickAngle = this.getKickAngle(ballPosition);
                return [
                    Math.sin(kickAngle) * this._kickForce,
                    Math.cos(kickAngle) * this._kickForce * .7
                ];
            }
            return [0, 0];
        };
        Player.prototype.kick = function () {
            var _this = this;
            if (this._isKicking) {
                return;
            }
            util.Sound.playFx("player-kick");
            this._isKicking = true;
            var orientationFactor = (this._orientationIsLeft ? -1 : 1);
            var ball = Game.state.gameplayHandler.getBall();
            var ballPosition = new Phaser.Point(ball.sprite.position.x - ball.sprite.width / 2, ball.sprite.position.y - ball.sprite.height / 2);
            var kickPosition = new Phaser.Point((ballPosition.x - this.x) / this._playerScale * orientationFactor, (ballPosition.y - this.y) / this._playerScale);
            var ballDistance = this.getDistance(ballPosition);
            if (ballDistance < this._ballKickDistance) {
                var kickAngle = this.getKickAngle(ballPosition);
                Game.state.gameplayHandler.ballKick(Math.sin(kickAngle) * this._kickForce, Math.cos(kickAngle) * this._kickForce * .8);
            }
            else {
                kickPosition = new Phaser.Point(Game.scale(200), Game.scale(200));
            }
            var basePosition = this._rightShoeRelativePosition.clone();
            this._rightShoeRelativePosition.set(kickPosition.x, kickPosition.y);
            this.update(ballPosition);
            var kickTween = Game.game.add.tween(this._rightShoeRelativePosition).to({
                x: basePosition.x,
                y: basePosition.y
            }, this._kickTime, Phaser.Easing.Quadratic.Out, true);
            this._rightShoeScale.set(1.5 * this._rightShoeScale.x, 1.5 * this._rightShoeScale.y);
            Game.game.add.tween(this._rightShoeScale).to({ x: 1, y: 1 }, this._kickTime, Phaser.Easing.Quadratic.Out, true);
            var baseRightShoeAngle = this._rightShoe.angle;
            this._rightShoe.angle = 60;
            Game.game.add.tween(this._rightShoe).to({
                angle: baseRightShoeAngle
            }, this._kickTime, Phaser.Easing.Quadratic.Out, true);
            kickTween.onComplete.add(function () {
                setTimeout(function () {
                    _this._isKicking = false;
                }, _this._kickDelay);
                _this._rightShoeScale.set(1, 1);
            });
        };
        Player.prototype.setStatic = function (value) {
            if (value === void 0) { value = false; }
            this.body.body.static = value;
        };
        Player.prototype.jump = function (force) {
            if (force === void 0) { force = Game.scale(2000); }
            if (this.grounded || this._jumpCounter < this._jumpLimit) {
                util.Sound.playFx("player-jump");
                if (!this._isJumping) {
                    this._isJumping = true;
                    var orientationFactor = this._orientationIsLeft ? -1 : 1;
                    var jumpTween = Game.game.add.tween(this._leftShoe).to({
                        angle: this._leftShoe.angle + 47 * orientationFactor
                    }, force * .3, Phaser.Easing.Quadratic.Out, true);
                    Game.game.add.tween(this._rightShoe).to({
                        angle: this._rightShoe.angle + 50 * orientationFactor
                    }, force * .28, Phaser.Easing.Quadratic.In, true);
                }
                this.body.body.velocity.y = -force;
                this.grounded = false;
                this._jumpCounter++;
            }
        };
        Player.prototype.getKickAngle = function (position) {
            return this.getAngle(position) + (this.grounded ? Math.PI * .2 : 0) * (this._orientationIsLeft ? -1 : 1);
        };
        Player.prototype.setPosition = function (position) {
            this.x = position.x;
            this.y = position.y;
            this.body.body.x = position.x;
            this.body.body.y = position.y;
        };
        Player.prototype.setCollisionGroup = function (collisionGroup) {
            this.body.body.setCollisionGroup(collisionGroup);
        };
        Player.prototype.setCollides = function (collisionGroups) {
            this.body.body.collides(collisionGroups);
        };
        Player.prototype.ground = function () {
            var orientationFactor = (this._orientationIsLeft ? -1 : 1);
            this.grounded = true;
            this._jumpCounter = 0;
            this._isJumping = false;
            this._leftShoe.angle = this._leftShoeAngle * orientationFactor;
            this._rightShoe.angle = this._rightShoeAngle * orientationFactor;
        };
        Player.prototype.moveLeft = function () {
            this.isMoving = true;
            this.body.body.moveLeft(this._moveSpeed);
            this._orientationIsLeft = true;
            this.run();
        };
        Player.prototype.orientateLeft = function () {
            this._orientationIsLeft = true;
        };
        Player.prototype.orientateRight = function () {
            this._orientationIsLeft = false;
        };
        Player.prototype.moveRight = function () {
            this.isMoving = true;
            this.body.body.moveRight(this._moveSpeed);
            this._orientationIsLeft = false;
            this.run();
        };
        Player.prototype.getDistance = function (position) {
            return Math.sqrt(Math.pow(position.x - this.x, 2) +
                Math.pow(position.y - this.y, 2));
        };
        Player.prototype.getAngle = function (position) {
            return Math.atan2(position.x - this.x, position.y - this.y);
        };
        Player.prototype.setPlayerScale = function (playerScale) {
            var _this = this;
            if (playerScale === void 0) { playerScale = this._playerScale; }
            this._playerScale = playerScale;
            this.body.scale.set(this._playerScale, this._playerScale);
            this._playerPolyRaw.forEach(function (number) {
                _this._playerPoly.push(number * _this.body.width * 2);
            });
            this.body.body.clearShapes();
            this.body.body.addPolygon({}, this._playerPoly);
        };
        Player.prototype.lookAtPosition = function (position) {
            if (position.x > this.x) {
                this._head.scale.x = this._playerScale;
                this._head.scale.y = this._playerScale;
            }
            else {
                this._head.scale.x = -this._playerScale;
                this._head.scale.y = this._playerScale;
            }
        };
        Player.prototype.lookNatural = function () {
            var orientationFactor = (this._orientationIsLeft ? -1 : 1);
            this._head.scale.x = this._playerScale * orientationFactor;
        };
        Player.prototype._updateRunAnimation = function () {
            this._runSteps++;
            this._rightShoeRelativePosition.set(this._rightShoeRelativeBasePosition.x + Math.sin(this._runSteps / 3) * Game.scale(60), this._rightShoeRelativeBasePosition.y - Math.cos(this._runSteps / 3) * Game.scale(30));
            this._leftShoeRelativePosition.set(this._leftShoeRelativeBasePosition.x + Math.sin(this._runSteps / 3 + Math.PI) * Game.scale(60), this._leftShoeRelativeBasePosition.y - Math.cos(this._runSteps / 3 + Math.PI) * Game.scale(30));
            if (this._runSteps % 10 == 0) {
                this._grassEmitter.x = this.x;
                this._grassEmitter.y = this.y + Game.scale(160);
                this._grassEmitter.start(true, 400, null, 2);
            }
        };
        Player.prototype._prepareGrassEmitter = function () {
            this._grassEmitter = Game.game.add.emitter(0, 0, 500);
            this._grassEmitter.bounce.setTo(0.5, 0.5);
            this._grassEmitter.setXSpeed(-300, 300);
            this._grassEmitter.setYSpeed(-300, -350);
            this._grassEmitter.setScale(.2, .4, .2, .4, 3000);
            this._grassEmitter.gravity = Game.scale(4000);
            this._grassEmitter.makeParticles("effects", "particle-grass", 50);
        };
        Player.prototype.update = function (ballPosition) {
            this.x = this.body.body.x;
            this.y = this.body.body.y;
            if (!this.isMoving) {
                this.body.body.velocity.x *= 0.6;
            }
            this.body.body.data.force[1] -= Game.scale(10000);
            if (this._followBall) {
                this.lookAtPosition(ballPosition);
            }
            if (this._isRunning && this.grounded && !this._isKicking) {
                this._updateRunAnimation();
            }
            this._drawBody();
            this.isMoving = false;
        };
        Player.prototype._updateShadow = function () {
            this._playerShadow.x = this.body.body.x;
            var scale = Math.min(Math.max(0, (this._playerShadow.y - this.body.body.y) / Game.scale(540)), 1);
            if (scale === 1) {
                this._playerShadow.visible = false;
            }
            else {
                this._playerShadow.visible = true;
                this._playerShadow.alpha = 1 - scale;
                this._playerShadow.scale.set(1 - scale, 1 - scale);
            }
        };
        Player.prototype._drawBody = function () {
            var orientationFactor = (this._orientationIsLeft ? -1 : 1);
            this._leftArm.position.set(this.x + this._leftArmRelativePosition.x * this._playerScale * orientationFactor, this.y + this._leftArmRelativePosition.y * this._playerScale);
            this._leftArm.angle = this._leftArmAngle * orientationFactor;
            this._leftArm.scale.set(this._leftArmScale.x * this._playerScale * orientationFactor, this._leftArmScale.y * this._playerScale);
            this._rightArm.position.set(this.x + this._rightArmRelativePosition.x * this._playerScale * orientationFactor, this.y + this._rightArmRelativePosition.y * this._playerScale);
            this._rightArm.angle = this._rightArmAngle * orientationFactor;
            this._rightArm.scale.set(this._rightArmScale.x * this._playerScale * orientationFactor, this._rightArmScale.y * this._playerScale);
            this._head.position.set(this.x + this._headRelativePosition.x * this._playerScale * orientationFactor, this.y + this._headRelativePosition.y * this._playerScale);
            this._head.angle = this._headAngle * orientationFactor;
            if (this.isMoving) {
                this._head.scale.set(this._headScale.x * this._playerScale * orientationFactor, this._headScale.y * this._playerScale);
            }
            this._leftShoe.position.set(this.x + this._leftShoeRelativePosition.x * this._playerScale * orientationFactor, this.y + this._leftShoeRelativePosition.y * this._playerScale);
            this._leftShoe.scale.set(this._leftShoeScale.x * this._playerScale * orientationFactor, this._leftShoeScale.y * this._playerScale);
            this._rightShoe.position.set(this.x + this._rightShoeRelativePosition.x * this._playerScale * orientationFactor, this.y + this._rightShoeRelativePosition.y * this._playerScale);
            this._rightShoe.scale.set(this._rightShoeScale.x * this._playerScale * orientationFactor, this._rightShoeScale.y * this._playerScale);
            this._updateShadow();
        };
        return Player;
    })();
    character.Player = Player;
})(character || (character = {}));
var level;
(function (level) {
    var Arena = (function () {
        function Arena(fieldMaterial, arenaMaterial) {
            this._fieldDrawer = new level.FieldDrawer();
            this.inGoal = false;
            this._spriteOffset = new Phaser.Point(0, Game.scale(200));
            this._fieldSize = Game.scale(1980);
            this._fieldDepth = Game.scale(290);
            this._cornerSize = Game.scale(40);
            this._goalAreaSize = Game.scale(250);
            this._midToEnd = this._fieldSize / 2 + this._goalAreaSize + this._cornerSize;
            this._background = Game.game.add.tileSprite(Game.dimensions.width / 2, Game.dimensions.height / 2 - Game.scale(200), Game.dimensions.width, Game.dimensions.height, "level", "bg-back", Game.state.farBackLayer);
            this._background.anchor.set(.5, .5);
            this._backgroundTwo = Game.game.add.tileSprite(Game.dimensions.width / 2, Game.dimensions.height / 2 + Game.scale(200), Game.dimensions.width, Game.dimensions.height, "level", "bg-front", Game.state.farBackLayer);
            this._backgroundTwo.anchor.set(.5, .5);
            this._tribune = Game.game.add.sprite(Game.dimensions.width / 2, Game.dimensions.height / 2 + Game.scale(30), "level", "tribune", Game.state.backLayer);
            this._tribune.anchor.set(.5, .5);
            this._crowd = new level.Crowd();
            this.floor = Game.game.add.sprite(0, Game.dimensions.height, "level", "field", Game.state.backLayer);
            this._floorHeight = this.floor.height;
            Game.state.backLayer.add(this.floor);
            Game.game.physics.p2.enable(this.floor);
            this.floor.body.clearShapes();
            this._fieldDrawer.drawArenaOnBody(this.floor.body, this.floor.height, this.floor.height - this._fieldDepth, this._fieldSize, this._cornerSize, this._goalAreaSize);
            this.floor.pivot = this._spriteOffset;
            this.floor.body['x'] = Game.dimensions.width * .5 + this._spriteOffset.x;
            this.floor.body['y'] = Game.dimensions.height - this._floorHeight * .5 + this._spriteOffset.y;
            this.floor.body.setMaterial(fieldMaterial);
            this.floor.body['static'] = true;
            this._leftGoal = new level.Goal(arenaMaterial, this._floorHeight, this._midToEnd, true);
            this._rightGoal = new level.Goal(arenaMaterial, this._floorHeight, this._midToEnd);
        }
        Arena.prototype.setCollisionGroup = function (collisionGroup) {
            this.floor.body.setCollisionGroup(collisionGroup);
            this._leftGoal.setCollisionGroup(collisionGroup);
            this._rightGoal.setCollisionGroup(collisionGroup);
        };
        Arena.prototype.setCollides = function (collisionGroup, isBall) {
            if (isBall === void 0) { isBall = false; }
            if (isBall) {
                this.floor.body.collides(collisionGroup, function () {
                    util.Sound.playFx("ball-hit-grass");
                });
            }
            else {
                this.floor.body.collides(collisionGroup);
            }
            this._leftGoal.setCollides(collisionGroup, isBall);
            this._rightGoal.setCollides(collisionGroup, isBall);
        };
        Arena.prototype.getPlayerStart = function (playerIndex, teamSize) {
            var xStart = Game.dimensions.width / 2 + (((this._fieldSize / 2) / (teamSize + 1)) * (playerIndex % teamSize + 1)) * (playerIndex < teamSize ? -1 : 1);
            var yStart = Game.dimensions.height - this._floorHeight;
            return new Phaser.Point(xStart, yStart);
        };
        Arena.prototype.killCrowd = function () {
            this._crowd.stop();
        };
        Arena.prototype.checkGoal = function (ballPosition, scoredCallback, isActualBall) {
            var _this = this;
            if (isActualBall === void 0) { isActualBall = true; }
            if (this.inGoal)
                return;
            var isInLeftGoal = this._leftGoal.isInGoal(ballPosition);
            var isInRightGoal = this._rightGoal.isInGoal(ballPosition);
            if (isInLeftGoal || isInRightGoal) {
                this._crowd.setTempo(100);
                setTimeout(function () {
                    _this._crowd.setTempo(1000);
                }, 4000);
                if (isActualBall) {
                    this.inGoal = true;
                }
                scoredCallback(isInRightGoal);
            }
        };
        Arena.prototype.getY = function () {
            return this.floor.body.y + this._spriteOffset.y;
        };
        Arena.prototype.getX = function () {
            return this.floor.body.x + this._spriteOffset.x;
        };
        Arena.prototype.update = function () {
            this._backgroundTwo.tilePosition.x = this._backgroundTwo.tilePosition.x + 0.2;
        };
        return Arena;
    })();
    level.Arena = Arena;
})(level || (level = {}));
var level;
(function (level) {
    var Ball = (function () {
        function Ball(material, arena) {
            this.ballPosition = new Phaser.Point();
            this._trajectorySprites = [];
            this._ballScale = .5;
            this._arena = arena;
            this._shadow = Game.game.add.sprite(0, Game.dimensions.height * .768, "effects", "player-shadow", Game.state.midLayer);
            this._shadow.anchor.set(.5, .5);
            this._spriteBg = Game.game.add.sprite(0, 0, "level", "ball-back", Game.state.midLayer);
            this._spriteBg.scale.set(this._ballScale, this._ballScale);
            this._spriteBg.anchor.set(.5, .5);
            this._spriteFront = Game.game.add.sprite(0, 0, "level", "ball-front", Game.state.midLayer);
            this._spriteFront.scale.set(this._ballScale, this._ballScale);
            this._spriteFront.anchor.set(.5, .5);
            this.sprite = Game.game.add.sprite(0, 0, "level", "ball-front", Game.state.midLayer);
            this.sprite.scale.set(this._ballScale, this._ballScale);
            this.sprite.anchor.set(.5, .5);
            this.sprite.alpha = 0;
            Game.game.physics.p2.enable(this.sprite);
            this.sprite.body.setCircle(this.sprite.width * .45);
            this.sprite.body.mass = 2;
            this.sprite.body.collideWorldBounds = true;
            this.sprite.body.setMaterial(material);
            this._setupTrajectory();
            this.setStart(new Phaser.Point(Game.dimensions.width / 2, Game.dimensions.height * .75), new Phaser.Point(0, 0));
        }
        Ball.prototype.makeGolden = function () {
            this._spriteBg.frameName = "ball-gold-back";
            this._spriteFront.frameName = "ball-gold-front";
        };
        Ball.prototype.makeNormal = function () {
            this._spriteBg.frameName = "ball-back";
            this._spriteFront.frameName = "ball-front";
        };
        Ball.prototype.setStart = function (position, velocity) {
            this.sprite.body.x = position.x;
            this.sprite.body.y = position.y;
            this.sprite.body.setZeroVelocity();
            this.sprite.body.moveRight(velocity.x);
            this.sprite.body.moveUp(velocity.y);
        };
        Ball.prototype.setScale = function (amount) {
            if (amount === void 0) { amount = this._ballScale; }
            this._ballScale = amount;
            this._spriteBg.scale.set(this._ballScale, this._ballScale);
            this._spriteFront.scale.set(this._ballScale, this._ballScale);
            this.sprite.scale.set(this._ballScale, this._ballScale);
        };
        Ball.prototype.setVelocity = function (velocity) {
            this.sprite.body.velocity.y = velocity.y;
            this.sprite.body.velocity.x = velocity.x;
        };
        Ball.prototype.setCollisionGroup = function (collisionGroup) {
            this.sprite.body.setCollisionGroup(collisionGroup);
        };
        Ball.prototype.setCollides = function (collisionGroups) {
            this.sprite.body.collides(collisionGroups);
        };
        Ball.prototype._setupTrajectory = function () {
            var tmpSprite;
            for (var i = 0; i < 40; i++) {
                tmpSprite = util.Sprite.createSprite(10, 10, { r: 255, g: 255, b: 255 });
                tmpSprite.alpha = .5;
                this._trajectorySprites.push(tmpSprite);
            }
            Game.state.frontLayer.addMultiple(this._trajectorySprites);
        };
        Ball.prototype.willBallLandInGoal = function (velocity, ballPosition, precision) {
            if (velocity === void 0) { velocity = null; }
            if (ballPosition === void 0) { ballPosition = null; }
            if (precision === void 0) { precision = 0.025; }
            var ballTrajectory = this.getTrajectory(velocity, ballPosition, precision);
            var returnValue = 0;
            for (var i = 0; i < ballTrajectory.length; i++) {
                this._arena.checkGoal(ballTrajectory[i], function (leftScored) {
                    if (leftScored) {
                        returnValue = -1;
                    }
                    else {
                        returnValue = 1;
                    }
                }, false);
            }
            return returnValue;
        };
        Ball.prototype.getLandingPosition = function () {
            var trajectory = this.getTrajectory();
            if (trajectory.length < 2) {
                return trajectory[0].x;
            }
            return trajectory[trajectory.length - 2].x;
        };
        Ball.prototype.getTrajectory = function (velocity, ballPosition, precision) {
            if (velocity === void 0) { velocity = null; }
            if (ballPosition === void 0) { ballPosition = null; }
            if (precision === void 0) { precision = 0.025; }
            if (ballPosition === null) {
                var x = this.sprite.body.x, y = this.sprite.body.y;
            }
            else {
                var x = ballPosition.x, y = ballPosition.y;
            }
            if (velocity === null) {
                velocity = [
                    this.sprite.body.velocity.x / 10,
                    this.sprite.body.velocity.y / 10
                ];
            }
            var returnedPoints = [];
            for (var t = 0; t < precision * 40; t += precision) {
                x += velocity[0];
                y += velocity[1] + Game.scale(9000) * t * t;
                returnedPoints.push(new Phaser.Point(x, y));
                if (y > Game.dimensions.height - Game.scale(400)) {
                    break;
                }
            }
            return returnedPoints;
        };
        Ball.prototype.drawTrajectory = function () {
            var spriteIndex = 0;
            var trajectoryPoints = this.getTrajectory();
            for (var i = 0; i < trajectoryPoints.length; i++) {
                this._trajectorySprites[spriteIndex].position.set(trajectoryPoints[i].x, trajectoryPoints[i].y);
                spriteIndex++;
                if (spriteIndex === 40) {
                    break;
                }
            }
        };
        Ball.prototype._updateShadow = function () {
            this._shadow.x = this.sprite.body.x;
            var scale = Math.min(Math.max(0, (this._shadow.y - this.sprite.body.y) / Game.scale(400)), 1);
            if (scale === 1) {
                this._shadow.visible = false;
            }
            else {
                this._shadow.visible = true;
                this._shadow.alpha = 1 - scale;
                this._shadow.scale.set((1 - scale) * .3, (1 - scale) * .3);
            }
        };
        Ball.prototype.update = function () {
            this._updateShadow();
            this.ballPosition.set(this.sprite.body.x, this.sprite.body.y);
            this._spriteBg.x = this.sprite.body.x;
            this._spriteBg.y = this.sprite.body.y;
            this._spriteFront.x = this.sprite.body.x;
            this._spriteFront.y = this.sprite.body.y;
            this._spriteFront.angle = this.sprite.body.angle;
        };
        return Ball;
    })();
    level.Ball = Ball;
})(level || (level = {}));
var level;
(function (level) {
    var Crowd = (function () {
        function Crowd() {
            this._crowdTempo = 1000;
            this._crowdFrames = [
                'crowd-1',
                'crowd-2',
                'crowd-3',
                'crowd-4',
                'crowd-5',
                'crowd-4',
                'crowd-3',
                'crowd-2',
            ];
            this._currentFrameIndex = 0;
            this._looping = true;
            this._crowdSprite = Game.game.add.sprite(Game.dimensions.width / 2, Game.dimensions.height / 2 + Game.scale(130), "character", this._crowdFrames[0], Game.state.backLayer);
            this._crowdSprite.anchor.set(.5, .5);
            this._loop();
        }
        Crowd.prototype.setTempo = function (tempo) {
            this._crowdTempo = tempo;
        };
        Crowd.prototype.stop = function () {
            this._looping = false;
            this._crowdSprite.destroy();
        };
        Crowd.prototype.start = function () {
            this._looping = true;
        };
        Crowd.prototype._loop = function () {
            var _this = this;
            setTimeout(function () {
                if (_this._looping) {
                    if (_this._crowdSprite.visible) {
                        _this._nextFrame();
                        _this._loop();
                    }
                }
            }, this._crowdTempo);
        };
        Crowd.prototype._nextFrame = function () {
            this._currentFrameIndex++;
            if (this._currentFrameIndex === this._crowdFrames.length) {
                this._currentFrameIndex = 0;
            }
            this._crowdSprite.frameName = this._crowdFrames[this._currentFrameIndex];
        };
        return Crowd;
    })();
    level.Crowd = Crowd;
})(level || (level = {}));
var level;
(function (level) {
    var FieldDrawer = (function () {
        function FieldDrawer() {
        }
        FieldDrawer.prototype.drawArenaOnBody = function (body, height, floorHeight, fieldWidth, cornerSize, goalArea) {
            var halfField = fieldWidth * .5;
            var halfSize = halfField + cornerSize + goalArea;
            body.addPolygon({}, [
                [-halfSize, 0],
                [-halfSize, -height],
                [-halfSize + goalArea, -height],
                [-halfSize + goalArea + cornerSize, -height + cornerSize],
                [-halfSize + goalArea + cornerSize, -floorHeight - cornerSize],
                [-halfSize + goalArea + cornerSize * 2, -floorHeight],
                [halfSize - goalArea - cornerSize * 2, -floorHeight],
                [halfSize - goalArea - cornerSize, -floorHeight - cornerSize],
                [halfSize - goalArea - cornerSize, -height + cornerSize],
                [halfSize - goalArea, -height],
                [halfSize, -height],
                [halfSize, 0]
            ]);
        };
        return FieldDrawer;
    })();
    level.FieldDrawer = FieldDrawer;
})(level || (level = {}));
var level;
(function (level) {
    var Goal = (function () {
        function Goal(arenaMaterial, floorHeight, offset, isLeft) {
            if (isLeft === void 0) { isLeft = false; }
            this._isLeft = false;
            this._isLeft = isLeft;
            this._spriteBack = Game.game.add.sprite(0, 0, "level", "goal-back", Game.state.backLayer);
            this._spriteBack.anchor.set(.5, 1);
            this._prepareWoodEmitter();
            this._spriteBack.y = Game.dimensions.height - floorHeight + Game.scale(150);
            this._sprite = Game.game.add.sprite(0, 0, "level", "goal-front", Game.state.frontLayer);
            this._sprite.y = Game.dimensions.height - floorHeight + Game.scale(182);
            this._sprite.anchor.set(.5, 1);
            this.bar = Game.game.add.existing(util.Sprite.createSprite(this._sprite.width, Game.scale(40), { r: 0, g: 0, b: 0 }));
            this.bar.anchor.set(.5, 1);
            this.net = Game.game.add.existing(util.Sprite.createSprite(this._sprite.width, Game.dimensions.height * 8, { r: 0, g: 0, b: 0 }));
            this.net.anchor.set(.5, 1);
            Game.game.physics.p2.enable(this.bar);
            Game.game.physics.p2.enable(this.net);
            this.bar.body.setMaterial(arenaMaterial);
            this.net.body.setMaterial(arenaMaterial);
            var backOffset = offset + Game.scale(18);
            var frontOffset = offset + Game.scale(135);
            if (isLeft) {
                this._sprite.scale.x *= -1;
                this._sprite.x = Game.dimensions.width / 2 - frontOffset;
                this._spriteBack.scale.x *= -1;
                this._spriteBack.x = Game.dimensions.width / 2 - backOffset;
            }
            else {
                this._sprite.x = Game.dimensions.width / 2 + frontOffset;
                this._spriteBack.x = Game.dimensions.width / 2 + backOffset;
            }
            this.bar.alpha = 0;
            this.bar.body.angle = 12 * (isLeft ? 1 : -1);
            this.bar.body.x = this._sprite.x + Game.scale(25) * (isLeft ? 1 : -1);
            this.bar.body.y = Game.dimensions.height - this._sprite.height - floorHeight + Game.scale(280);
            this.bar.body['static'] = true;
            this.net.alpha = 0;
            this.net.body.x = this._sprite.x + Game.scale(170) * (isLeft ? -1 : 1);
            this.net.body.y = -Game.dimensions.height;
            this.net.body['static'] = true;
        }
        Goal.prototype._prepareWoodEmitter = function () {
            this._woodEmitter = Game.game.add.emitter(0, 0, 200);
            this._woodEmitter.bounce.setTo(0.5, 0.5);
            this._woodEmitter.makeParticles("effects", "particle-wood", 50);
            this._woodEmitter.minParticleScale = 0.3;
            this._woodEmitter.maxParticleScale = 0.4;
            this._woodEmitter.gravity = Game.scale(2000);
        };
        Goal.prototype._emitWood = function (force) {
            if (this._isLeft) {
                this._woodEmitter.setXSpeed(force * .1, force);
            }
            else {
                this._woodEmitter.setXSpeed(-force * .1, -force);
            }
            this._woodEmitter.setYSpeed(-force, force);
            this._woodEmitter.start(true, 300, null, 5);
        };
        Goal.prototype.isInGoal = function (position) {
            if (position.y > this._sprite.y - this._sprite.height * .7 &&
                position.y < this._sprite.y) {
                if (this._isLeft) {
                    if (position.x < this._sprite.x + Math.abs(this._sprite.width) * .5) {
                        return true;
                    }
                }
                else {
                    if (position.x > this._sprite.x - this._sprite.width * .5) {
                        return true;
                    }
                }
            }
            return false;
        };
        Goal.prototype.setCollisionGroup = function (collisionGroup) {
            this.bar.body.setCollisionGroup(collisionGroup);
            this.net.body.setCollisionGroup(collisionGroup);
        };
        Goal.prototype.setCollides = function (collisionGroup, isBall) {
            var _this = this;
            if (isBall === void 0) { isBall = false; }
            if (isBall) {
                this.bar.body.collides(collisionGroup, function (body1, body2) {
                    util.Sound.playFx("ball-hit-metal");
                });
                this.net.body.collides(collisionGroup, function (body1, body2) {
                    if (body2.y < _this.bar.top) {
                        util.Sound.playFx("ball-hit-wood");
                        _this._woodEmitter.x = body2.x;
                        _this._woodEmitter.y = body2.y;
                        var absoluteVelocity = new Phaser.Point(Math.abs(body2.velocity.x), Math.abs(body2.velocity.y)), magnitude = absoluteVelocity.getMagnitude();
                        _this._emitWood(magnitude);
                    }
                    else {
                        body2.setZeroForce();
                    }
                });
            }
            else {
                this.bar.body.collides(collisionGroup);
                this.net.body.collides(collisionGroup);
            }
        };
        return Goal;
    })();
    level.Goal = Goal;
})(level || (level = {}));
var logic;
(function (logic) {
    var AIControls = (function () {
        function AIControls(player, players, ball, arena, difficulty, role) {
            if (difficulty === void 0) { difficulty = 1; }
            if (role === void 0) { role = "defender"; }
            this._ally = null;
            this._maxDifficulty = 9;
            this._ballPosition = new Phaser.Point();
            this.inputAllowed = true;
            this._isStunned = false;
            this._steps = 0;
            this._player = player;
            this._ball = ball;
            this._arena = arena;
            this._maxKickDelta = player.getBallKickDistance() * .55 * (player.isLeft ? 1 : -1);
            this._minKickDelta = this._maxKickDelta * .2;
            this._jumpDistance = player.body.height * 1.5;
            this._players = players;
            this._enemies = [];
            this._ally = null;
            this._steps = Math.floor(30 * Math.random());
            this._setAlliesAndEnemies();
            if (this._ally) {
                this._nearBallDistance = Game.dimensions.width / 5;
            }
            else {
                this._nearBallDistance = Game.dimensions.width / 3;
            }
            this._difficulty = difficulty;
            if (this._difficulty > this._maxDifficulty) {
                this._difficulty = this._maxDifficulty;
            }
            if (this._difficulty < 7) {
                this._role = "idiot";
            }
            else {
                this._role = role;
            }
            this._bufferBallPositionForSteps = (10 - this._difficulty) * 10;
            this._ownGoalPosition = new Phaser.Point(Game.dimensions.width / 2 - Game.scale(1030) * (player.isLeft ? -1 : 1), Game.dimensions.height - Game.scale(800));
            this._otherGoalPosition = new Phaser.Point(Game.dimensions.width / 2 + Game.scale(1030) * (player.isLeft ? -1 : 1), Game.dimensions.height - Game.scale(800));
            this._doEventBindings();
        }
        AIControls.prototype._doEventBindings = function () {
            var _this = this;
            Game.events.addListener("playerPunch", function (punchData) {
                punchData = punchData[0];
                if (!_this._player.isCharacter(punchData["playerKey"])) {
                    _this._isStunned = true;
                    setTimeout(function () {
                        _this._isStunned = false;
                    }, _this._player.stunTime);
                }
            });
        };
        AIControls.prototype.getDifficulty = function () {
            return this._difficulty;
        };
        AIControls.prototype.getDifficultyAsString = function () {
            switch (true) {
                case this._difficulty < 2:
                    return "easy";
                case this._difficulty < 6:
                    return "medium";
                case this._difficulty >= 6:
                default:
                    return "hard";
            }
        };
        AIControls.prototype._getDifficultyModifier = function (factor) {
            if (factor === void 0) { factor = 1; }
            return (this._difficulty / this._maxDifficulty) * factor;
        };
        AIControls.prototype._isAlly = function (player) {
            return this._player.isLeft === player.isLeft && this._player !== player;
        };
        AIControls.prototype._setAlliesAndEnemies = function () {
            for (var i = 0; i < this._players.length; i++) {
                if (this._isAlly(this._players[i])) {
                    this._ally = this._players[i];
                }
                else {
                    this._enemies.push(this._players[i]);
                }
            }
        };
        AIControls.prototype._estimatedShot = function (precision, delayOffset) {
            var _this = this;
            if (precision === void 0) { precision = 100; }
            if (delayOffset === void 0) { delayOffset = 0; }
            var usedDelay = 0;
            var dontShoot = false;
            var trajectoryPrecision = 0.0167 / (precision / 100);
            var ballTrajectory = this._ball.getTrajectory(null, null, trajectoryPrecision);
            var kickVelocity = [0, 0], whichGoal = 0;
            for (var i = 0; i < ballTrajectory.length; i++) {
                kickVelocity = this._player.getKickVelocityIfWeKickBallAtPosition(ballTrajectory[i]);
                if (kickVelocity[0] !== 0 || kickVelocity[1] !== 0) {
                    whichGoal = this._ball.willBallLandInGoal([kickVelocity[0] * 10,
                        kickVelocity[1] * 10], ballTrajectory[i], trajectoryPrecision);
                    if (this._player.isLeft && whichGoal === 1 ||
                        !this._player.isLeft && whichGoal === -1) {
                        dontShoot = false;
                        usedDelay = i * trajectoryPrecision;
                        break;
                    }
                    else if (this._player.isLeft && whichGoal === -1 ||
                        !this._player.isLeft && whichGoal === 1) {
                        dontShoot = true;
                    }
                }
            }
            if (!dontShoot) {
                setTimeout(function () {
                    _this._quickShot();
                }, usedDelay + delayOffset);
            }
        };
        AIControls.prototype._averageShot = function () {
            this._estimatedShot(this._getDifficultyModifier(80), 40 - this._getDifficultyModifier(40));
        };
        AIControls.prototype._lateShot = function () {
            this._estimatedShot(this._getDifficultyModifier(100), 150 - this._getDifficultyModifier(130));
        };
        AIControls.prototype._perfectShot = function () {
            this._estimatedShot(100, 0);
        };
        AIControls.prototype._quickShot = function () {
            this._player.kick();
        };
        AIControls.prototype._goToOwnGoal = function () {
            this._goToPosition(this._ownGoalPosition.x, Game.scale(50));
            if (Math.abs(this._ownGoalPosition.x - this._player.x) < Game.scale(250) &&
                Math.abs(this._ownGoalPosition.y - this._player.y) > Game.scale(100)) {
                this._player.jump();
            }
        };
        AIControls.prototype._goToOtherGoal = function () {
            this._goToPosition(this._otherGoalPosition.x + Game.scale(200) * (this._player.isLeft ? -1 : 1), Game.scale(200));
        };
        AIControls.prototype._goToPosition = function (targetHorizontalPosition, easing) {
            if (this._player.x > targetHorizontalPosition - easing &&
                this._player.x < targetHorizontalPosition + easing) {
                return;
            }
            if (this._player.x < targetHorizontalPosition - easing) {
                this._player.moveRight();
                return;
            }
            if (this._player.x > targetHorizontalPosition + easing) {
                this._player.moveLeft();
                return;
            }
        };
        AIControls.prototype._doRole = function () {
            switch (this._role) {
                case "defender":
                    this._goToOwnGoal();
                    break;
                case "attacker":
                    this._goToBall();
                    break;
                case "idiot":
                    this._doIdiot();
                    break;
            }
        };
        AIControls.prototype._getIdealBallPosition = function () {
            return this._ballPosition.x + this._maxKickDelta;
        };
        AIControls.prototype._doIdiot = function () {
            this._goToPosition(Game.dimensions.width * (this._difficulty > 3 ? .65 : .6) +
                Math.sin(this._steps / (this._difficulty > 3 ? 20 : 40)) * Game.dimensions.height *
                    (this._difficulty > 3 ? .6 : .55), Game.scale(300));
            if (Math.random() > .98) {
                this._player.jump();
            }
        };
        AIControls.prototype._goToBall = function () {
            var targetHorizontalPosition = this._getIdealBallPosition();
            var easing = Math.abs(this._maxKickDelta) * .5;
            this._goToPosition(targetHorizontalPosition, easing);
        };
        AIControls.prototype._resetBallTrajectory = function () {
            this._trajectoryTargetHorizontalPosition = this._ball.getLandingPosition() + this._maxKickDelta;
        };
        AIControls.prototype._goToBallTrajectory = function () {
            if (!this._trajectoryTargetHorizontalPosition) {
                this._resetBallTrajectory();
            }
            this._goToPosition(this._trajectoryTargetHorizontalPosition, Math.abs(this._maxKickDelta) * .5);
        };
        AIControls.prototype._playerVerticallyAlignedToBall = function () {
            return (this._ball.ballPosition.y > this._player.body.y - Math.max(Game.scale(200), Game.scale(100) * this._difficulty) &&
                this._ball.ballPosition.y < this._player.body.y + Math.max(Game.scale(200), Game.scale(100) * this._difficulty));
        };
        AIControls.prototype._playerUnderBall = function () {
            return (this._ball.ballPosition.y > this._player.y - this._jumpDistance * 2 &&
                this._ball.ballPosition.y < this._player.y - this._jumpDistance * .75);
        };
        AIControls.prototype._playerHorizontallyAlignedToBall = function () {
            var targetHorizontalPosition = this._ball.ballPosition.x;
            var easing = Math.abs(this._maxKickDelta * 1.5);
            if (this._player.x > targetHorizontalPosition - easing &&
                this._player.x < targetHorizontalPosition + easing) {
                return true;
            }
            return false;
        };
        AIControls.prototype.update = function () {
            this._player.idle();
            this._steps++;
            if (this._steps % this._bufferBallPositionForSteps === 0) {
                this._ballPosition = this._ball.ballPosition.clone();
                this._resetBallTrajectory();
            }
            if (!this.inputAllowed || this._isStunned) {
                return;
            }
            if (this._difficulty > 5) {
                var ballInGoal = this._ball.willBallLandInGoal();
                if (ballInGoal !== 0) {
                    if (this._player.isLeft && ballInGoal === -1) {
                        this._goToOwnGoal();
                        if (Math.abs(this._ballPosition.x - this._player.x) < Game.scale(150) &&
                            this._ballPosition.y - Game.scale(50) < this._player.y) {
                            this._player.jump();
                        }
                    }
                    else {
                        this._goToPosition(Game.dimensions.width / 2, Game.scale(150));
                    }
                }
            }
            if (this._role === "defender" && this._ally && this._ally.getDistance(this._ballPosition) < this._nearBallDistance ||
                this._role === "idiot") {
                this._doRole();
            }
            else {
                if (this._role !== "idiot" && this._player.getDistance(this._ballPosition) < this._nearBallDistance) {
                    if (this._difficulty > 5) {
                        this._goToBall();
                    }
                    else {
                        this._doIdiot();
                    }
                }
                else {
                    this._doRole();
                }
            }
            if (this._playerHorizontallyAlignedToBall()) {
                if (this._playerUnderBall()) {
                    this._player.jump();
                }
                if (this._playerVerticallyAlignedToBall()) {
                    if (this._difficulty < 2) {
                        this._lateShot();
                        return;
                    }
                    var rand = Math.random();
                    if (this._difficulty < 6) {
                        switch (true) {
                            case rand > 0:
                                this._averageShot();
                                break;
                            case rand > .33:
                                this._lateShot();
                                break;
                            case rand > .67:
                                this._quickShot();
                                break;
                        }
                        return;
                    }
                    if (this._difficulty < 9) {
                        switch (true) {
                            case rand > 0:
                                this._averageShot();
                                break;
                            case rand > .33:
                                this._quickShot();
                                break;
                            case rand > .67:
                                this._perfectShot();
                                break;
                        }
                        return;
                    }
                    this._perfectShot();
                }
            }
        };
        AIControls.AILevels = {
            'easy': 1,
            'medium': 5,
            'hard': 9
        };
        return AIControls;
    })();
    logic.AIControls = AIControls;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var GameplayHandler = (function () {
        function GameplayHandler(gameSettings) {
            var _this = this;
            this._players = [];
            this._playerControls = [];
            this._aiControls = [];
            this._ballPosition = new Phaser.Point();
            this._isInHalfOrFullTimeCallback = false;
            this._isGoldenGoal = false;
            this._matchCompleteCallback = null;
            this._isPaused = false;
            this._hasAI = null;
            this._setupPhysics();
            this._setupPauseEvents();
            var ballMaterial = Game.game.physics.p2.createMaterial('ballMaterial');
            var arenaMaterial = Game.game.physics.p2.createMaterial('arenaMaterial');
            var fieldMaterial = Game.game.physics.p2.createMaterial('fieldMaterial');
            var playerMaterial = Game.game.physics.p2.createMaterial('playerMaterial');
            this._gameUI = new ui.GameUI();
            this._arena = new level.Arena(fieldMaterial, arenaMaterial);
            this._scoreHandler = new logic.ScoreHandler();
            this._setupTimer();
            var playerAmount = gameSettings.humanControlledPlayers.length + gameSettings.aiControlledPlayers.length;
            var teamSize = playerAmount / 2;
            for (var i = 0; i < playerAmount; i++) {
                this._players.push(new character.Player(gameSettings.players[i], playerMaterial, i >= teamSize));
            }
            this._ball = new level.Ball(ballMaterial, this._arena);
            var ballFieldContactMaterial = Game.game.physics.p2.createContactMaterial(ballMaterial, fieldMaterial);
            ballFieldContactMaterial.restitution = .8;
            var ballArenaContactMaterial = Game.game.physics.p2.createContactMaterial(ballMaterial, arenaMaterial);
            ballArenaContactMaterial.restitution = .5;
            var ballPlayerContactMaterial = Game.game.physics.p2.createContactMaterial(ballMaterial, playerMaterial);
            ballPlayerContactMaterial.restitution = .3;
            this._setupCollisions();
            this._setupControls(gameSettings.humanControlledPlayers, gameSettings.aiControlledPlayers, gameSettings.aiLevels, gameSettings.playerControlIndexes);
            this._prepareBallForceEmitter();
            if (gameSettings.rematchPossible) {
                this._matchCompleteCallback = function () {
                    _this._gameUI.questionDisplay("REMATCH?", function () {
                        _this.rematch();
                    }, function () {
                        gameSettings.matchCompleteCallback(_this._scoreHandler.score);
                    });
                };
            }
            else {
                this._matchCompleteCallback = function () {
                    gameSettings.matchCompleteCallback(_this._scoreHandler.score);
                };
            }
        }
        GameplayHandler.prototype._emitBallForceAtPosition = function (x, y, force, duration) {
            if (force === void 0) { force = Game.scale(1000); }
            if (duration === void 0) { duration = 150; }
            this._ballForceEmitter.x = x;
            this._ballForceEmitter.y = y;
            this._ballForceEmitter.setXSpeed(force, force);
            this._ballForceEmitter.setYSpeed(force, force);
            this._ballForceEmitter.start(true, duration, null, 1);
            this._ballForceEmitter.setXSpeed(-force, -force);
            this._ballForceEmitter.setYSpeed(force, force);
            this._ballForceEmitter.start(true, duration, null, 1);
            this._ballForceEmitter.setXSpeed(force, force);
            this._ballForceEmitter.setYSpeed(-force, -force);
            this._ballForceEmitter.start(true, duration, null, 1);
            this._ballForceEmitter.setXSpeed(-force, -force);
            this._ballForceEmitter.setYSpeed(-force, -force);
            this._ballForceEmitter.start(true, duration, null, 1);
            this._ballForceEmitter.setXSpeed(0, 0);
            this._ballForceEmitter.setYSpeed(force * 1.41, force * 1.41);
            this._ballForceEmitter.start(true, duration, null, 1);
            this._ballForceEmitter.setXSpeed(-force * 1.41, -force * 1.41);
            this._ballForceEmitter.setYSpeed(0, 0);
            this._ballForceEmitter.start(true, duration, null, 1);
            this._ballForceEmitter.setXSpeed(0, 0);
            this._ballForceEmitter.setYSpeed(-force * 1.41, -force * 1.41);
            this._ballForceEmitter.start(true, duration, null, 1);
            this._ballForceEmitter.setXSpeed(-force * 1.41, -force * 1.41);
            this._ballForceEmitter.setYSpeed(0, 0);
            this._ballForceEmitter.start(true, duration, null, 1);
        };
        GameplayHandler.prototype._prepareBallForceEmitter = function () {
            this._ballForceEmitter = Game.game.add.emitter(0, 0, 200);
            this._ballForceEmitter.bounce.setTo(0.5, 0.5);
            this._ballForceEmitter.setScale(.05, .05, .05, .05, 200);
            this._ballForceEmitter.gravity = Game.scale(0);
            this._ballForceEmitter.makeParticles("effects", "particle-ball", 50);
        };
        GameplayHandler.prototype._setupPauseEvents = function () {
            var _this = this;
            Game.events.addListener("inGamePause", function () {
                if (!_this._isPaused) {
                    _this._isPaused = true;
                    _this.disableInput();
                    _this._timer.pause();
                }
            });
            Game.events.addListener("inGameResume", function () {
                if (_this._isPaused) {
                    _this._gameUI.doCountDown(function () {
                        _this._isPaused = false;
                        _this._timer.resume();
                        _this.enableInput();
                    });
                }
                else {
                    _this._timer.resume();
                    _this.enableInput();
                }
            });
        };
        GameplayHandler.prototype._setupTimer = function () {
            var _this = this;
            this._timer = new logic.Timer(function (displayTime) {
                _this._gameUI.setTime(displayTime);
            }, function () {
                util.Sound.playFx("whistle-halftime");
                _this._gameUI.flashText("HALF TIME");
                _this.disableInput();
                _this._isInHalfOrFullTimeCallback = true;
                if (!Game.game.device.desktop) {
                    var footballIcon = Game.game.add.sprite(0, 0, "icons", "icon-ball");
                    var roundButton = new ui.RoundButton(footballIcon, function () {
                        _this._doHalfTimeAdCall();
                        roundButton.visible = false;
                    });
                    roundButton.x = Game.dimensions.width * .5;
                    roundButton.y = Game.dimensions.height * .75;
                }
                else {
                    _this._doHalfTimeAdCall();
                }
            }, function () {
                util.Sound.playFx("whistle-halftime");
                _this.disableInput();
                _this._isInHalfOrFullTimeCallback = true;
                if (_this._scoreHandler.score[0] === _this._scoreHandler.score[1]) {
                    _this._gameUI.flashGoldenGoal();
                    setTimeout(function () {
                        _this.goldenGoalKickoff();
                    }, 2000);
                }
                else {
                    _this._doEndScreen();
                }
            });
        };
        GameplayHandler.prototype._doHalfTimeAdCall = function () {
            var _this = this;
            setTimeout(function () {
                var muteStateBeforeAd = util.Sound.muted;
                util.Sound.mute();
                var callback = function () {
                    _this.kickoff();
                    _this._isInHalfOrFullTimeCallback = false;
                    if (!muteStateBeforeAd) {
                        util.Sound.playFx("crowd-loop", true);
                        util.Sound.unMute();
                    }
                };
                if (Game.pokiSDKLoaded) {
                    PokiSDK.commercialBreak()
                        .then(callback)
                        .catch(callback);
                }
                else {
                    callback();
                }
            }, 3000);
        };
        GameplayHandler.prototype._hasAIPlayers = function () {
            if (this._hasAI !== null)
                return this._hasAI;
            return this._hasAI = this._aiControls.length > 0;
        };
        GameplayHandler.prototype._doEndScreen = function () {
            var _this = this;
            var leftWon = this._scoreHandler.score[0] > this._scoreHandler.score[1];
            if (leftWon) {
                this._scoreHandler.leftMatch();
            }
            else {
                this._scoreHandler.rightMatch();
            }
            this._responseAnimations(leftWon);
            if (this._hasAIPlayers()) {
                var label = "";
                for (var i = 0; i < this._aiControls.length; i++) {
                    if (i != 0) {
                        label += "-";
                    }
                    label += this._aiControls[i].getDifficultyAsString();
                }
                Game.analytics.event("Gameplay", "vs-ai-match-result", label, leftWon ? "win" : "lose");
                if (leftWon) {
                    PokiSDK.happyTime(1);
                }
            }
            else {
                PokiSDK.happyTime(0.8);
            }
            this._gameUI.setMatchHistory(this._scoreHandler.matchHistory[0] + '', this._scoreHandler.matchHistory[1] + '');
            this._gameUI.endScreen(function () {
                _this._restartCallback();
            });
        };
        GameplayHandler.prototype._restartCallback = function () {
            this._matchCompleteCallback(this._scoreHandler.score);
        };
        GameplayHandler.prototype.gameUIQuestion = function (question, positiveCallback, negativeCallback) {
            this._gameUI.questionDisplay(question.toUpperCase(), positiveCallback, negativeCallback);
        };
        GameplayHandler.prototype._setupControls = function (humanControlledPlayers, aiControlledPlayers, aiLevels, playerControlIndexes, aiBehaviours) {
            if (aiBehaviours === void 0) { aiBehaviours = ["attacker", "defender"]; }
            if (Game.game.device.desktop) {
                var playerControls = [
                    logic.InputList.getPlayerControlsForPlayer(0),
                    logic.InputList.getPlayerControlsForPlayer(1),
                    logic.InputList.getPlayerControlsForPlayer(2),
                    logic.InputList.getPlayerControlsForPlayer(3),
                ];
                this._controlIndicators = [];
                var controlIndicatorIndex = 0;
                for (var j = 0; j < humanControlledPlayers.length; j++) {
                    this._playerControls.push(new logic.PlayerControls(playerControls[playerControlIndexes[j]][0], playerControls[playerControlIndexes[j]][1], playerControls[playerControlIndexes[j]][2], playerControls[playerControlIndexes[j]][3], this._players[humanControlledPlayers[j]]));
                    this._controlIndicators.push(new ui.ControlsIndicator(new Phaser.Point(0, 0), false, playerControlIndexes[j]));
                    controlIndicatorIndex++;
                }
            }
            else {
                if (typeof this._players[0] !== "undefined") {
                    this._playerControls.push(new logic.MobileControls(this._players[0]));
                }
            }
            for (var i = 0; i < aiControlledPlayers.length; i++) {
                this._aiControls.push(new logic.AIControls(this._players[aiControlledPlayers[i]], this._players, this._ball, this._arena, aiLevels[i], aiBehaviours[i % aiBehaviours.length]));
            }
            if (Game.game.device.desktop) {
                var controlIndicatorsY = Game.dimensions.height - Game.scale(130);
                var controlIndicatorsCenter = Game.dimensions.width / 2;
                for (var k = 0; k < this._controlIndicators.length; k++) {
                    this._controlIndicators[k].scale.set(.9, .9);
                    this._controlIndicators[k].alpha = .8;
                    if (humanControlledPlayers.length + aiControlledPlayers.length > 2) {
                        this._controlIndicators[k].y = controlIndicatorsY;
                        if (k < 2) {
                            this._controlIndicators[k].x = controlIndicatorsCenter - Game.scale(1100) + k * Game.scale(400);
                        }
                        else {
                            this._controlIndicators[k].x = controlIndicatorsCenter + Game.scale(1100) - (k - 2) * Game.scale(400);
                        }
                    }
                    else {
                        this._controlIndicators[k].y = controlIndicatorsY;
                        if (k < 1) {
                            this._controlIndicators[k].x = controlIndicatorsCenter - Game.scale(1100);
                        }
                        else {
                            this._controlIndicators[k].x = controlIndicatorsCenter + Game.scale(1100);
                        }
                    }
                }
            }
        };
        GameplayHandler.prototype._setupPhysics = function () {
            Game.game.physics.startSystem(Phaser.Physics.P2JS);
            Game.game.physics.p2.gravity.y = Game.scale(1600);
            Game.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
            Game.game.physics.p2.world.setGlobalStiffness(1e5);
            Game.game.physics.p2.setImpactEvents(true);
        };
        GameplayHandler.prototype._setupCollisions = function () {
            this._arenaCollisionGroup = Game.game.physics.p2.createCollisionGroup();
            this._ballCollisionGroup = Game.game.physics.p2.createCollisionGroup();
            this._playerCollisionGroup = Game.game.physics.p2.createCollisionGroup();
            this._arena.setCollisionGroup(this._arenaCollisionGroup);
            this._ball.setCollisionGroup(this._ballCollisionGroup);
            this._ball.setCollides([this._arenaCollisionGroup, this._playerCollisionGroup]);
            for (var i = 0; i < this._players.length; i++) {
                this._players[i].setCollisionGroup(this._playerCollisionGroup);
                this._players[i].setCollides([this._arenaCollisionGroup, this._playerCollisionGroup, this._ballCollisionGroup]);
            }
            this._arena.setCollides(this._playerCollisionGroup);
            this._arena.setCollides(this._ballCollisionGroup, true);
            Game.game.physics.p2.updateBoundsCollisionGroup();
            var self = this;
            var playerCollision = function (body, bodyB, shapeA, shapeB, equation) {
                if (body === self._arena.floor.body) {
                    this.ground();
                    return;
                }
                for (var i = 0; i < self._players.length; i++) {
                    if (body === self._players[i].body.body && self._players[i].grounded) {
                        this.ground();
                        return;
                    }
                }
            };
            for (var i = 0; i < this._players.length; i++) {
                this._players[i].body.body.onBeginContact.add(playerCollision, this._players[i]);
            }
        };
        GameplayHandler.prototype.ballContact = function (player) {
            return;
        };
        GameplayHandler.prototype.ballKick = function (kickForceX, kickForceY) {
            var body = this._ball.sprite.body;
            body.setZeroVelocity();
            body.moveDown(kickForceY);
            body.moveRight(kickForceX);
            var absoluteVelocity = new Phaser.Point(Math.abs(body.velocity.x), Math.abs(body.velocity.y)), magnitude = absoluteVelocity.getMagnitude();
            if (magnitude < Game.scale(2350)) {
                util.Sound.playFx("ball-kick-normal");
            }
            else if (magnitude < Game.scale(2450)) {
                util.Sound.playFx("ball-kick-hard");
            }
            else {
                util.Sound.playFx("ball-kick-hardest");
            }
            this._emitBallForceAtPosition(body.x, body.y);
        };
        GameplayHandler.prototype.disableInput = function () {
            if (Game.pokiSDKLoaded)
                PokiSDK.gameplayStop();
            for (var j = 0; j < this._playerControls.length; j++) {
                this._playerControls[j].inputAllowed = false;
            }
            for (var k = 0; k < this._aiControls.length; k++) {
                this._aiControls[k].inputAllowed = false;
            }
        };
        GameplayHandler.prototype.enableInput = function () {
            if (Game.pokiSDKLoaded)
                PokiSDK.gameplayStart();
            for (var j = 0; j < this._playerControls.length; j++) {
                this._playerControls[j].inputAllowed = true;
            }
            for (var k = 0; k < this._aiControls.length; k++) {
                this._aiControls[k].inputAllowed = true;
            }
        };
        GameplayHandler.prototype.kickoff = function () {
            var _this = this;
            if (this._goalTimeout)
                clearTimeout(this._goalTimeout);
            this._arena.inGoal = false;
            this._isGoldenGoal = false;
            this.disableInput();
            this.startGame();
            this._gameUI.doCountDown(function () {
                if (!_this._isPaused) {
                    _this._timer.resume();
                    _this.enableInput();
                }
            });
        };
        GameplayHandler.prototype.goldenGoalKickoff = function () {
            var _this = this;
            if (this._goalTimeout)
                clearTimeout(this._goalTimeout);
            this._ball.makeGolden();
            this._isGoldenGoal = true;
            this._arena.inGoal = false;
            this.disableInput();
            this.startGame();
            this._isInHalfOrFullTimeCallback = false;
            this._gameUI.doCountDown(function () {
                _this.enableInput();
            });
        };
        GameplayHandler.prototype.rematch = function () {
            this._timer.reset();
            this._scoreHandler.reset();
            this._gameUI.setTime('0000');
            this._arena.inGoal = false;
            this._isInHalfOrFullTimeCallback = false;
            this._gameUI.setScore(this._scoreHandler.score);
            this.kickoff();
            this._ball.makeNormal();
        };
        GameplayHandler.prototype.startGame = function () {
            var teamSize = this._players.length / 2;
            for (var i = 0; i < this._players.length; i++) {
                this._players[i].setPosition(this._arena.getPlayerStart(i, teamSize));
                if (i >= teamSize) {
                    this._players[i].orientateLeft();
                }
                else {
                    this._players[i].orientateRight();
                }
            }
            this._ball.setStart(new Phaser.Point(Game.dimensions.width * .5, Game.dimensions.height * .3), new Phaser.Point((this._scoreHandler.score[0] - this._scoreHandler.score[1]) * Game.scale(5), 0));
        };
        GameplayHandler.prototype.killCrowd = function () {
            this._arena.killCrowd();
        };
        GameplayHandler.prototype.getBall = function () {
            return this._ball;
        };
        GameplayHandler.prototype._responseAnimations = function (leftCelebrate) {
            if (leftCelebrate) {
                PokiSDK.happyTime(.4);
                if (this._players.length > 2) {
                    this._players[0].cheer(3000);
                    this._players[1].cheer(3000);
                    this._players[2].sad(3000);
                    this._players[3].sad(3000);
                }
                else {
                    this._players[0].cheer(3000);
                    this._players[1].sad(3000);
                }
            }
            else {
                if (!this._hasAIPlayers()) {
                    PokiSDK.happyTime(.4);
                }
                if (this._players.length > 2) {
                    this._players[2].cheer(3000);
                    this._players[3].cheer(3000);
                    this._players[0].sad(3000);
                    this._players[1].sad(3000);
                }
                else {
                    this._players[1].cheer(3000);
                    this._players[0].sad(3000);
                }
            }
        };
        GameplayHandler.prototype.update = function () {
            var _this = this;
            var self = this;
            this._ballForceEmitter.forEachAlive(function (particle) {
                particle.alpha = particle.lifespan / this._ballForceEmitter.lifespan;
            }, this);
            this._ballPosition.set(this._ball.sprite.body.x, this._ball.sprite.body.y);
            for (var i = 0; i < this._players.length; i++) {
                this._players[i].update(this._ballPosition);
            }
            for (var j = 0; j < this._playerControls.length; j++) {
                this._playerControls[j].update();
            }
            for (var k = 0; k < this._aiControls.length; k++) {
                this._aiControls[k].update();
            }
            this._arena.update();
            this._ball.update();
            if (this._isPaused)
                return;
            if (!this._isInHalfOrFullTimeCallback) {
                this._arena.checkGoal(this._ballPosition, function (leftScored) {
                    Game.state.gameplayHandler.disableInput();
                    util.Sound.playFx("crowd-goal");
                    if (leftScored) {
                        _this._scoreHandler.leftScored();
                    }
                    else {
                        _this._scoreHandler.rightScored();
                    }
                    _this._responseAnimations(leftScored);
                    _this._timer.pause();
                    _this._gameUI.flashGoal();
                    _this._gameUI.setScore(_this._scoreHandler.score);
                    _this._goalTimeout = setTimeout(function () {
                        if (_this._isGoldenGoal) {
                            _this._doEndScreen();
                            _this._isInHalfOrFullTimeCallback = true;
                        }
                        else {
                            _this.kickoff();
                        }
                        _this._arena.inGoal = false;
                    }, 3000);
                });
            }
        };
        GameplayHandler._adAttempt = 0;
        return GameplayHandler;
    })();
    logic.GameplayHandler = GameplayHandler;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var GameplaySettings = (function () {
        function GameplaySettings(humanControlledPlayers, aiControlledPlayers, aiLevels, players, playerControlIndexes, rematchPossible, matchCompleteCallback) {
            this.humanControlledPlayers = humanControlledPlayers;
            this.aiControlledPlayers = aiControlledPlayers;
            this.aiLevels = aiLevels;
            this.players = players;
            this.rematchPossible = rematchPossible;
            this.playerControlIndexes = playerControlIndexes;
            this.matchCompleteCallback = matchCompleteCallback;
        }
        return GameplaySettings;
    })();
    logic.GameplaySettings = GameplaySettings;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var InputList = (function () {
        function InputList() {
        }
        InputList.getPlayerControlsForPlayer = function (playerNumber) {
            if (playerNumber === void 0) { playerNumber = 0; }
            var cursors = Game.game.input.keyboard.createCursorKeys();
            var controlList = [
                [
                    cursors.left,
                    cursors.right,
                    Game.game.input.keyboard.addKey(32),
                    cursors.up
                ],
                [
                    Game.game.input.keyboard.addKey("1".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("3".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("0".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("5".charCodeAt(0))
                ],
                [
                    Game.game.input.keyboard.addKey("A".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("D".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("Q".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("W".charCodeAt(0))
                ],
                [
                    Game.game.input.keyboard.addKey("J".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("L".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("O".charCodeAt(0)),
                    Game.game.input.keyboard.addKey("H".charCodeAt(0))
                ]
            ];
            return controlList[playerNumber];
        };
        InputList.getPlayerTextControlsForPlayer = function (playerNumber) {
            if (playerNumber === void 0) { playerNumber = 0; }
            var controlList = [
                [
                    "left",
                    "right",
                    "_",
                    "up"
                ],
                [
                    "1",
                    "3",
                    "0",
                    "5"
                ],
                [
                    "A",
                    "D",
                    "Q",
                    "W"
                ],
                [
                    "J",
                    "L",
                    "H",
                    "I"
                ]
            ];
            return controlList[playerNumber];
        };
        return InputList;
    })();
    logic.InputList = InputList;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var PlayerControls = (function () {
        function PlayerControls(leftKey, rightKey, kickKey, jumpKey, player) {
            this._isStunned = false;
            this.inputAllowed = true;
            this._leftKey = leftKey;
            this._rightKey = rightKey;
            this._kickKey = kickKey;
            this._jumpKey = jumpKey;
            this._player = player;
            this._doEventBindings();
        }
        PlayerControls.prototype._doEventBindings = function () {
            var _this = this;
            Game.events.addListener("playerPunch", function (punchData) {
                punchData = punchData[0];
                if (!_this._player.isCharacter(punchData["playerKey"])) {
                    _this._isStunned = true;
                    setTimeout(function () {
                        _this._isStunned = false;
                    }, _this._player.stunTime);
                }
            });
        };
        PlayerControls.prototype.update = function () {
            if (!this.inputAllowed || this._isStunned) {
                this._player.idle();
                this._jumpKey.justDown;
                this._kickKey.justDown;
                return;
            }
            if (this._leftKey.isDown && !this._rightKey.isDown) {
                this._player.moveLeft();
            }
            if (this._rightKey.isDown && !this._leftKey.isDown) {
                this._player.moveRight();
            }
            if (this._rightKey.isUp && this._leftKey.isUp) {
                this._player.idle();
            }
            if (this._jumpKey.justDown) {
                this._player.jump();
            }
            if (this._kickKey.justDown) {
                this._player.kick();
            }
        };
        return PlayerControls;
    })();
    logic.PlayerControls = PlayerControls;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var ScoreHandler = (function () {
        function ScoreHandler() {
            this.score = [0, 0];
            this.matchHistory = [0, 0];
        }
        ScoreHandler.prototype.leftScored = function () {
            this.score[0]++;
        };
        ScoreHandler.prototype.rightScored = function () {
            this.score[1]++;
        };
        ScoreHandler.prototype.reset = function () {
            this.score = [0, 0];
        };
        ScoreHandler.prototype.leftMatch = function () {
            this.matchHistory[0]++;
        };
        ScoreHandler.prototype.rightMatch = function () {
            this.matchHistory[1]++;
        };
        ScoreHandler.prototype.resetMathHistory = function () {
            this.matchHistory = [0, 0];
        };
        return ScoreHandler;
    })();
    logic.ScoreHandler = ScoreHandler;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var Timer = (function () {
        function Timer(timerCallback, halftimeCallback, fulltimeCallback) {
            this._timeLimit = 90;
            this._actualTimeLimit = 60;
            this._currentTime = 0;
            this._timer = null;
            this.halfTime = false;
            this._timerCallback = timerCallback;
            this._halftimeCallback = halftimeCallback;
            this._fulltimeCallback = fulltimeCallback;
        }
        Timer.prototype.reset = function () {
            this._currentTime = 0;
            this.halfTime = false;
        };
        Timer.prototype.resume = function () {
            var _this = this;
            clearInterval(this._timer);
            this._timer = setInterval(function () {
                _this._currentTime += _this._timeLimit / _this._actualTimeLimit;
                _this._checkTimerCallbacks();
            }, 1000 / 60);
        };
        Timer.prototype.pause = function () {
            clearInterval(this._timer);
        };
        Timer.prototype._checkTimerCallbacks = function () {
            var displayTime = this._getDisplayTime();
            var timeLimit = this._timeLimit * 60;
            this._timerCallback(displayTime);
            if (this._currentTime >= timeLimit / 2 && !this.halfTime) {
                this.pause();
                this.halfTime = true;
                this._halftimeCallback();
            }
            if (this._currentTime >= timeLimit) {
                this.pause();
                this._fulltimeCallback();
            }
        };
        Timer.prototype._getDisplayTime = function () {
            var minutes = Math.floor(this._currentTime / 60) + '';
            var seconds = Math.floor(this._currentTime) % 60 + '';
            return String("00" + minutes).slice(minutes.length) +
                String("00" + seconds).slice(seconds.length);
        };
        return Timer;
    })();
    logic.Timer = Timer;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var TourneyGame = (function () {
        function TourneyGame(score, teams, gameFinished) {
            if (score === void 0) { score = [0, 0]; }
            if (teams === void 0) { teams = null; }
            if (gameFinished === void 0) { gameFinished = false; }
            this.score = score;
            this.teams = teams;
            this.gameFinished = gameFinished;
        }
        TourneyGame.fromCache = function (data) {
            return new TourneyGame(data["score"], data["teams"], data["gameFinished"]);
        };
        TourneyGame.prototype.setTeams = function (teams) {
            this.teams = teams;
        };
        TourneyGame.prototype.getTeams = function () {
            return this.teams;
        };
        TourneyGame.prototype.setScore = function (score, isFinished) {
            if (isFinished === void 0) { isFinished = false; }
            this.score = score;
            this.gameFinished = isFinished;
        };
        TourneyGame.prototype.randomizeResult = function () {
            if (!this.gameFinished) {
                while (this.score[0] === this.score[1]) {
                    this.score[0] = Math.floor(Math.random() * 11);
                    this.score[1] = Math.floor(Math.random() * 10);
                }
                this.gameFinished = true;
            }
        };
        TourneyGame.prototype.getResult = function () {
            if (this.gameFinished) {
                return this.score;
            }
            return null;
        };
        TourneyGame.prototype.getWinner = function () {
            if (this.gameFinished) {
                if (this.score[0] > this.score[1]) {
                    return this.teams[0];
                }
                else {
                    return this.teams[1];
                }
            }
            return null;
        };
        return TourneyGame;
    })();
    logic.TourneyGame = TourneyGame;
})(logic || (logic = {}));
var logic;
(function (logic) {
    var TourneyHandler = (function () {
        function TourneyHandler() {
        }
        TourneyHandler.hasActiveTourney = function () {
            var tourneyRounds = Game.save.load(TourneyHandler.playerPrefix + "activeTourney");
            if (tourneyRounds) {
                for (var i = 0; i < tourneyRounds.length; i++) {
                    for (var j = 0; j < tourneyRounds[i].length; j++) {
                        tourneyRounds[i][j] = logic.TourneyGame.fromCache(tourneyRounds[i][j]);
                    }
                }
                TourneyHandler.tourneyRounds = tourneyRounds;
                TourneyHandler.selectedPlayers = Game.save.load(TourneyHandler.playerPrefix + "selectedPlayers");
                TourneyHandler.selectedTeam = Game.save.load(TourneyHandler.playerPrefix + "selectedTeam");
                TourneyHandler.currentRoundIndex = Game.save.load(TourneyHandler.playerPrefix + "currentRoundIndex");
                TourneyHandler.activeTeams = Game.save.load(TourneyHandler.playerPrefix + "activeTeams");
                return true;
            }
            return false;
        };
        TourneyHandler.createNewTourney = function (selectedTeam, selectedPlayers, amountOfTeams) {
            if (amountOfTeams === void 0) { amountOfTeams = 8; }
            var _tmpTeamsAmount = amountOfTeams;
            TourneyHandler.tourneyRounds = [];
            TourneyHandler.activeTeams = [];
            TourneyHandler.currentRoundIndex = 0;
            TourneyHandler.selectedTeam = selectedTeam;
            TourneyHandler.selectedPlayers = selectedPlayers;
            var index = 0;
            while (_tmpTeamsAmount / 2 > .5) {
                var roundData = [];
                for (var i = 0; i < _tmpTeamsAmount; i += 2) {
                    roundData.push(new logic.TourneyGame());
                }
                TourneyHandler.tourneyRounds[index] = roundData;
                index++;
                _tmpTeamsAmount /= 2;
            }
            TourneyHandler.activeTeams.push(selectedTeam['sprite-key']);
            var randomOpponent = TourneyHandler.getRandomUnPickedTeam();
            TourneyHandler.activeTeams.push(randomOpponent['sprite-key']);
            TourneyHandler.setTeamsForRound(0, 0, [selectedTeam, randomOpponent]);
            TourneyHandler.fillUpRandomly();
            TourneyHandler.save();
        };
        TourneyHandler.forEachCurrentGame = function (callback) {
            for (var i = 0; i < TourneyHandler.tourneyRounds[TourneyHandler.currentRoundIndex].length; i++) {
                callback(TourneyHandler.tourneyRounds[TourneyHandler.currentRoundIndex][i]);
            }
        };
        TourneyHandler.forEachRoundAndGame = function (callback) {
            for (var i = 0; i < TourneyHandler.tourneyRounds.length; i++) {
                for (var j = 0; j < TourneyHandler.tourneyRounds[i].length; j++) {
                    callback(TourneyHandler.tourneyRounds[i][j], i, j);
                }
            }
        };
        TourneyHandler.goToNextRoundAndRandomizeScoresForUnfinishedMatches = function () {
            TourneyHandler.forEachCurrentGame(function (game) {
                if (game.getWinner() === null) {
                    game.randomizeResult();
                }
            });
            TourneyHandler.tourneyRounds[TourneyHandler.currentRoundIndex];
            TourneyHandler.nextRound();
            TourneyHandler.save();
        };
        TourneyHandler.nextRound = function () {
            var gameIndex = 0;
            var teamsWhoGoToNextRound = [];
            TourneyHandler.forEachCurrentGame(function (game) {
                var winner = game.getWinner();
                if (typeof teamsWhoGoToNextRound[Math.floor(gameIndex / 2)] === "undefined") {
                    teamsWhoGoToNextRound[Math.floor(gameIndex / 2)] = [];
                }
                teamsWhoGoToNextRound[Math.floor(gameIndex / 2)][gameIndex % 2] = winner;
                gameIndex++;
            });
            TourneyHandler.currentRoundIndex++;
            if (TourneyHandler.currentRoundIndex > 2) {
            }
            else {
                for (var i = 0; i < teamsWhoGoToNextRound.length; i++) {
                    TourneyHandler.tourneyRounds[TourneyHandler.currentRoundIndex][i].setTeams(teamsWhoGoToNextRound[i]);
                }
            }
        };
        TourneyHandler.clear = function () {
            Game.save.clear(TourneyHandler.playerPrefix + "activeTourney");
            Game.save.clear(TourneyHandler.playerPrefix + "selectedTeam");
            Game.save.clear(TourneyHandler.playerPrefix + "activeTeams");
            Game.save.clear(TourneyHandler.playerPrefix + "currentRoundIndex");
            Game.save.clear(TourneyHandler.playerPrefix + "selectedPlayers");
        };
        TourneyHandler.getCurrentGameIndexForSelectedTeam = function () {
            var index = 0;
            var tmpIndex = 0;
            TourneyHandler.forEachCurrentGame(function (game) {
                var teams = game.getTeams();
                if (teams[0]['sprite-key'] === TourneyHandler.selectedTeam['sprite-key'] || teams[1]['sprite-key'] === TourneyHandler.selectedTeam['sprite-key']) {
                    index = tmpIndex;
                }
                tmpIndex++;
            });
            return index;
        };
        TourneyHandler.getCurrentGameForSelectedTeam = function () {
            var currentGame = false;
            TourneyHandler.forEachCurrentGame(function (game) {
                var teams = game.getTeams();
                if (teams[0]['sprite-key'] === TourneyHandler.selectedTeam['sprite-key'] || teams[1]['sprite-key'] === TourneyHandler.selectedTeam['sprite-key']) {
                    currentGame = game;
                }
            });
            if (currentGame !== false) {
                return currentGame;
            }
            util.Debug.log(TourneyHandler.selectedTeam, "not found in current round.");
            return null;
        };
        TourneyHandler.fillUpRandomly = function () {
            for (var i = 0; i < TourneyHandler.tourneyRounds[0].length; i++) {
                if (TourneyHandler.tourneyRounds[0][i].getTeams() === null) {
                    var teamLeft = TourneyHandler.getRandomUnPickedTeam();
                    TourneyHandler.activeTeams.push(teamLeft['sprite-key']);
                    var teamRight = TourneyHandler.getRandomUnPickedTeam();
                    TourneyHandler.activeTeams.push(teamRight['sprite-key']);
                    TourneyHandler.setTeamsForRound(0, i, [teamLeft, teamRight]);
                }
            }
        };
        TourneyHandler.getTeamData = function () {
            if (TourneyHandler.teamData !== null) {
                return TourneyHandler.teamData;
            }
            else {
                return TourneyHandler.teamData = Game.game.cache.getJSON("teamdata")["teams"];
            }
        };
        TourneyHandler.getRandomUnPickedTeam = function () {
            var randomIndex = Math.floor(Math.random() * TourneyHandler.getTotalTeams());
            var randomTeam = TourneyHandler.getTeamByIndex(randomIndex);
            var count = 0;
            while (TourneyHandler.activeTeams.indexOf(randomTeam['sprite-key']) !== -1) {
                randomIndex++;
                if (randomIndex >= TourneyHandler.getTotalTeams()) {
                    randomIndex = 0;
                    count++;
                    if (count > 3) {
                        return randomTeam;
                    }
                }
                randomTeam = TourneyHandler.getTeamByIndex(randomIndex);
            }
            return randomTeam;
        };
        TourneyHandler.getRandomTeam = function () {
            var randomIndex = Math.floor(Math.random() * TourneyHandler.getTotalTeams());
            var team = TourneyHandler.getTeamByIndex(randomIndex);
            return team;
        };
        TourneyHandler.getTotalTeams = function () {
            if (TourneyHandler.totalTeams !== null)
                return TourneyHandler.totalTeams;
            return TourneyHandler.totalTeams = Object.keys(TourneyHandler.getTeamData()).length;
        };
        TourneyHandler.getTeamByIndex = function (index) {
            var key = Object.keys(TourneyHandler.getTeamData())[index];
            return TourneyHandler.getTeamData()[key];
        };
        TourneyHandler.setTeamsForRound = function (round, game, teams) {
            TourneyHandler.tourneyRounds[round][game].setTeams(teams);
            TourneyHandler.save();
        };
        TourneyHandler.getGamesForRound = function (round) {
            return TourneyHandler.tourneyRounds[round];
        };
        TourneyHandler.setScoreForRoundAndGame = function (round, game, score, finished) {
            TourneyHandler.tourneyRounds[round][game].setScore(score, finished);
            TourneyHandler.save();
        };
        TourneyHandler.save = function () {
            Game.save.save(TourneyHandler.playerPrefix + "activeTourney", TourneyHandler.tourneyRounds);
            Game.save.save(TourneyHandler.playerPrefix + "selectedTeam", TourneyHandler.selectedTeam);
            Game.save.save(TourneyHandler.playerPrefix + "activeTeams", TourneyHandler.activeTeams);
            Game.save.save(TourneyHandler.playerPrefix + "currentRoundIndex", TourneyHandler.currentRoundIndex);
            Game.save.save(TourneyHandler.playerPrefix + "selectedPlayers", TourneyHandler.selectedPlayers);
        };
        TourneyHandler.tourneyRounds = null;
        TourneyHandler.selectedPlayers = null;
        TourneyHandler.activeTeams = [];
        TourneyHandler.teamData = null;
        TourneyHandler.totalTeams = null;
        TourneyHandler.currentRoundIndex = 0;
        TourneyHandler.playerPrefix = "solo";
        TourneyHandler.playerModePrefixes = {
            'solo': "solo",
            'coop': "coop"
        };
        return TourneyHandler;
    })();
    logic.TourneyHandler = TourneyHandler;
})(logic || (logic = {}));
var states;
(function (states) {
    var BaseMenuState = (function (_super) {
        __extends(BaseMenuState, _super);
        function BaseMenuState() {
            _super.apply(this, arguments);
        }
        BaseMenuState.prototype.create = function () {
            util.Sound.playMusic("music");
            this._setupLayers();
            this._createBackground();
            this._createPokiLogo();
            this._createSoundButtons();
        };
        BaseMenuState.prototype._createBackground = function () {
            this._uiBackdrop = new ui.ArenaBackground();
            this.farBackLayer.add(this._uiBackdrop);
            this._uiBackground = Game.game.add.sprite(Game.dimensions.width * .5, Game.dimensions.height * .5, "ui", "ui-holder");
            this.backLayer.add(this._uiBackground);
            this._uiBackground.anchor.set(.5, .5);
            this._uiBackground.x = Game.dimensions.width * .5;
        };
        BaseMenuState.prototype._createPokiLogo = function () {
        };
        BaseMenuState.prototype._createMenuTitle = function (string, size) {
            if (size === void 0) { size = Game.scale(140); }
            var titleBg = Game.game.add.sprite(Game.dimensions.width * .5, size * .5, "ui", "menu-header");
            titleBg.anchor.set(.5, .15);
            var text = Game.game.add.bitmapText(Game.dimensions.width * .5, size * .3, "normal", string.toUpperCase().charAt(0) + string.toLocaleLowerCase().substring(1), size);
            text.anchor.set(.5, 0);
            text.align = "center";
            this.midLayer.addMultiple([titleBg, text]);
        };
        BaseMenuState.prototype._createSoundButtons = function () {
            var soundButtons = new ui.SoundButtons();
            soundButtons.position.set(this._uiBackground.right - Game.scale(450), this._uiBackground.top + Game.scale(200));
            this.midLayer.add(soundButtons);
        };
        BaseMenuState.prototype._createBackButton = function (backstate, extraCallback) {
            if (backstate === void 0) { backstate = "ModeSelectState"; }
            if (extraCallback === void 0) { extraCallback = null; }
            this._backButton = new ui.RoundButton(Game.game.add.sprite(0, 0, "icons", "icon-back"), function () {
                if (extraCallback !== null) {
                    extraCallback();
                }
                Game.game.state.start(backstate);
            });
            this._backButton.position.set(this._uiBackground.left + this._backButton.width * .5 + Game.scale(200), this._uiBackground.bottom - this._backButton.height * .5 - Game.scale(200));
            this.midLayer.add(this._backButton);
        };
        BaseMenuState.prototype._drawPlayerIconsAtPositions = function (buttonPosition, iconIdentifiers) {
            if (iconIdentifiers === void 0) { iconIdentifiers = 'HA'; }
            var sprites = [];
            var margin = Game.scale(220);
            var scale = .45;
            if (iconIdentifiers.length < 3) {
                sprites.push(Game.game.add.sprite(buttonPosition.x - margin, buttonPosition.y + margin * .5, "ui", iconIdentifiers[0] == 'H' ? "icon-player" : "icon-computer"));
                sprites.push(Game.game.add.sprite(buttonPosition.x + margin, buttonPosition.y + margin * .5, "ui", iconIdentifiers[1] == 'H' ? "icon-player" : "icon-computer"));
                sprites[1].scale.x *= -1;
            }
            else {
                sprites.push(Game.game.add.sprite(buttonPosition.x - margin, buttonPosition.y + margin * .5, "ui", iconIdentifiers[0] == 'H' ? "icon-player" : "icon-computer"));
                sprites.push(Game.game.add.sprite(buttonPosition.x - margin * .4, buttonPosition.y + margin * .5, "ui", iconIdentifiers[1] == 'H' ? "icon-player" : "icon-computer"));
                sprites.push(Game.game.add.sprite(buttonPosition.x + margin * .4, buttonPosition.y + margin * .5, "ui", iconIdentifiers[2] == 'H' ? "icon-player" : "icon-computer"));
                sprites.push(Game.game.add.sprite(buttonPosition.x + margin, buttonPosition.y + margin * .5, "ui", iconIdentifiers[3] == 'H' ? "icon-player" : "icon-computer"));
                sprites[2].scale.x *= -1;
                sprites[3].scale.x *= -1;
            }
            sprites.forEach(function (sprite) {
                sprite.anchor.set(.5, 0);
                sprite.scale.set(sprite.scale.x * scale, sprite.scale.y * scale);
            });
            this.midLayer.addMultiple(sprites);
        };
        BaseMenuState.prototype._createConfirmButton = function (text, confirmCallback) {
            this._confirmButton = new ui.Button(new Phaser.Point(0, 0), text, "normal", Game.scale(100));
            this._confirmButton.position.set(this._uiBackground.right - this._confirmButton.width * .5 - Game.scale(200), this._uiBackground.bottom - this._confirmButton.height * .5 - Game.scale(200));
            this._confirmButton.onClick(confirmCallback);
        };
        BaseMenuState.prototype._enablePhysics = function () {
            Game.game.physics.startSystem(Phaser.Physics.P2JS);
            Game.game.physics.p2.gravity.y = Game.scale(1600);
            Game.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
            Game.game.physics.p2.world.setGlobalStiffness(1e5);
            Game.game.physics.p2.setImpactEvents(true);
        };
        return BaseMenuState;
    })(states.BaseState);
    states.BaseMenuState = BaseMenuState;
})(states || (states = {}));
var states;
(function (states) {
    var GameplaySettings = logic.GameplaySettings;
    var CoopNormalState = (function (_super) {
        __extends(CoopNormalState, _super);
        function CoopNormalState() {
            _super.apply(this, arguments);
        }
        CoopNormalState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("CoopNormalState");
            this._enablePhysics();
            this._createMenuTitle('co-op\nnormal');
            var playerTeamAndPlayerSelector = new ui.TeamAndDoublePlayerSelector("players"), enemyTeamAndPlayerSelector = new ui.TeamAndDoublePlayerSelector("computer", true);
            enemyTeamAndPlayerSelector.randomize();
            util.PositionHelper.centerHorizontally([playerTeamAndPlayerSelector, enemyTeamAndPlayerSelector], Game.scale(100));
            util.PositionHelper.centerVertically([playerTeamAndPlayerSelector]);
            enemyTeamAndPlayerSelector.y = playerTeamAndPlayerSelector.y;
            this._createBackButton("NormalModeState");
            this._createConfirmButton("play", function () {
                Game.game.state.start("GameState", true, false, "Solo Normal", new GameplaySettings([1, 0], [2, 3], enemyTeamAndPlayerSelector.getAILevels(), [
                    playerTeamAndPlayerSelector.selectedPlayers[1],
                    playerTeamAndPlayerSelector.selectedPlayers[0],
                    enemyTeamAndPlayerSelector.selectedPlayers[0],
                    enemyTeamAndPlayerSelector.selectedPlayers[1]
                ], playerTeamAndPlayerSelector.switched ? [1, 0] : [0, 1], true, function () {
                    Game.game.state.start("CoopNormalState");
                }));
            });
        };
        CoopNormalState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return CoopNormalState;
    })(states.BaseMenuState);
    states.CoopNormalState = CoopNormalState;
})(states || (states = {}));
Game.addState("CoopNormalState", states.CoopNormalState);
var states;
(function (states) {
    var CoopTournamentState = (function (_super) {
        __extends(CoopTournamentState, _super);
        function CoopTournamentState() {
            _super.apply(this, arguments);
        }
        CoopTournamentState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("CoopTournamentState");
            this._enablePhysics();
            this._createMenuTitle('co-op\ntournament');
            var teamSelector = new ui.TeamAndDoublePlayerSelector("players", false, 0, 1, true, [0, 2]);
            util.PositionHelper.centerHorizontally([teamSelector]);
            util.PositionHelper.centerVertically([teamSelector]);
            teamSelector.randomize();
            this._createBackButton("TournamentModeState");
            this._createConfirmButton("play", function () {
                logic.TourneyHandler.createNewTourney(teamSelector.selectedTeam, teamSelector.selectedPlayers, 8);
                Game.game.state.start("TourneyState", true, false, false, true);
            });
        };
        CoopTournamentState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return CoopTournamentState;
    })(states.BaseMenuState);
    states.CoopTournamentState = CoopTournamentState;
})(states || (states = {}));
Game.addState("CoopTournamentState", states.CoopTournamentState);
/**
 * GameState
 *
 *
 */
var states;
(function (states) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
        }
        GameState.prototype.create = function () {
        };
        GameState.prototype.init = function (mode, gameSettings) {
            util.Sound.stopMusic("music");
            util.Sound.playFx("crowd-loop", true);
            Game.analytics.pageview("GameState");
            var gameStartFired = Game.save.load("gamestartFired");
            if (typeof gameStartFired == undefined || gameStartFired == false) {
                Game.analytics.event("Screen", "GameStart");
                Game.save.save("gamestartFired", true);
            }
            this._resetCameraAndBounds();
            Game.effects.reset();
            Game.effects.prepare();
            this._setupLayers();
            Game.analytics.event("Gamesettings", "mode", mode);
            Game.analytics.event("Gamesettings", "players", gameSettings.humanControlledPlayers.length + "");
            this.gameplayHandler = new logic.GameplayHandler(gameSettings);
            this.gameplayHandler.kickoff();
        };
        GameState.prototype.update = function () {
            _super.prototype.update.call(this);
            this.gameplayHandler.update();
        };
        GameState.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        GameState.prototype.shutdown = function () {
            util.Sound.playFx("crowd-loop", false);
        };
        return GameState;
    })(states.BaseState);
    states.GameState = GameState;
})(states || (states = {}));
Game.addState("GameState", states.GameState);
var states;
(function (states) {
    var ModeSelectState = (function (_super) {
        __extends(ModeSelectState, _super);
        function ModeSelectState() {
            _super.apply(this, arguments);
        }
        ModeSelectState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("ModeSelectState");
            this._createMenuTitle('select\nmode');
            var tournamentModeButton = new ui.Button(new Phaser.Point(Game.dimensions.width * .5, Game.dimensions.height * .5), "tournament", "normal", Game.scale(130), "blue", Game.scale(50));
            tournamentModeButton.onClick(function () {
                if (Game.game.device.desktop) {
                    Game.game.state.start("TournamentModeState");
                }
                else {
                    Game.game.state.start("SoloTournamentState");
                }
            });
            var normalModeButton = new ui.Button(new Phaser.Point(Game.dimensions.width * .5, Game.dimensions.height * .7), "party", "normal", Game.scale(130), "blue", Game.scale(50));
            normalModeButton.onClick(function () {
                if (Game.game.device.desktop) {
                    Game.game.state.start("NormalModeState");
                }
                else {
                    Game.game.state.start("SoloNormalState");
                }
            });
            normalModeButton.scale.set(.8, .8);
            var normalIcon = Game.game.add.sprite(tournamentModeButton.x - tournamentModeButton.width * .8, normalModeButton.y, "ui", "button-ball");
            normalIcon.anchor.set(.5, .5);
            normalIcon.scale.set(.7, .7);
            var tournamentIcon = Game.game.add.sprite(tournamentModeButton.x - tournamentModeButton.width * .8, tournamentModeButton.y, "ui", "button-prize");
            tournamentIcon.anchor.set(.5, .5);
            tournamentIcon.scale.set(.7, .7);
        };
        ModeSelectState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return ModeSelectState;
    })(states.BaseMenuState);
    states.ModeSelectState = ModeSelectState;
})(states || (states = {}));
Game.addState("ModeSelectState", states.ModeSelectState);
var states;
(function (states) {
    var NormalModeState = (function (_super) {
        __extends(NormalModeState, _super);
        function NormalModeState() {
            _super.apply(this, arguments);
        }
        NormalModeState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("NormalModeState");
            this._createMenuTitle('NORMAL\nMODE');
            var soloButton = new ui.Button(new Phaser.Point(0, Game.dimensions.height * .35), "solo", "normal", Game.scale(100), "blue", Game.scale(50));
            soloButton.onClick(function () {
                Game.game.state.start("SoloNormalState");
            });
            var coopButton = new ui.Button(new Phaser.Point(0, Game.dimensions.height * .35), '2 vs 2\nco-op', "normal", Game.scale(100), "blue", Game.scale(50));
            coopButton.onClick(function () {
                Game.game.state.start("CoopNormalState");
            });
            var versusButton = new ui.Button(new Phaser.Point(0, Game.dimensions.height * .7), "1 vs 1", "normal", Game.scale(100), "blue", Game.scale(50));
            versusButton.onClick(function () {
                Game.game.state.start("VersusNormalState");
            });
            var teamVersusButton = new ui.Button(new Phaser.Point(0, Game.dimensions.height * .7), '2 vs 2', "normal", Game.scale(100), "blue", Game.scale(50));
            teamVersusButton.onClick(function () {
                Game.game.state.start("TeamVersusNormalState");
            });
            util.PositionHelper.centerHorizontally([soloButton, coopButton], Game.scale(400));
            util.PositionHelper.centerHorizontally([versusButton, teamVersusButton], Game.scale(400));
            this.midLayer.addMultiple([versusButton, teamVersusButton, soloButton, coopButton]);
            this._drawPlayerIconsAtPositions(soloButton.position, 'HA');
            this._drawPlayerIconsAtPositions(coopButton.position, 'HHAA');
            this._drawPlayerIconsAtPositions(versusButton.position, 'HH');
            this._drawPlayerIconsAtPositions(teamVersusButton.position, 'HHHH');
            this._createBackButton();
        };
        NormalModeState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return NormalModeState;
    })(states.BaseMenuState);
    states.NormalModeState = NormalModeState;
})(states || (states = {}));
Game.addState("NormalModeState", states.NormalModeState);
/**
 * PreloadState is the state in which all preloading happens
 */
var states;
(function (states) {
    var PreloadState = (function (_super) {
        __extends(PreloadState, _super);
        function PreloadState() {
            var _this = this;
            _super.apply(this, arguments);
            this._startTime = 0;
            this._loaders = [
                function () {
                    _this._loaderPercentageAllocation = 100;
                    var images = Game.game.cache.getJSON("images");
                    for (var idx in images[util.Scale.assetType]["sheets"]) {
                        var path = images[util.Scale.assetType]["sheets"][idx], key = path.split("/").splice(3).join("/");
                        if (key != "preroll") {
                            Game.game.load.atlasJSONHash(key, path + ".png", path + ".json");
                            util.Cleaner.cleanupCache("JSON", key);
                        }
                    }
                    for (var idx in images[util.Scale.assetType]["images"]) {
                        var path = images[util.Scale.assetType]["images"][idx], key = path.split("/").splice(3).join("/");
                        Game.game.load.image(key, path + ".png");
                    }
                    util.Cleaner.addToCacheCleanupQueue("JSON", "images");
                    var sfx = [
                        "ball-hit-grass",
                        "ball-hit-wood",
                        "ball-hit-metal",
                        "ball-kick-normal",
                        "ball-kick-hard",
                        "ball-kick-hardest",
                        "button",
                        "countdown",
                        "crowd-goal",
                        "crowd-loop",
                        "player-jump",
                        "player-kick",
                        "whistle-halftime",
                        "whistle-start"
                    ];
                    for (var idx in sfx) {
                        Game.game.load.audio(sfx[idx], ["assets/audio/" + sfx[idx] + ".wav"]);
                    }
                    var music = [
                        "music"
                    ];
                    for (var idx in music) {
                        Game.game.load.audio(music[idx], ["assets/audio/" + music[idx] + ".ogg"]);
                    }
                    var bitmapFonts = {
                        'icons': Game.scale(0),
                        'normal': Game.scale(0),
                        'digital-time': Game.scale(0),
                        'digital-time-tourney': Game.scale(0)
                    };
                    Game.game.load.json("teamdata", "assets/data/teamdata.json");
                    Object.keys(bitmapFonts).forEach(function (fontName) {
                        Game.game.load.bitmapFont(fontName, "assets/bitmapfonts/" + util.Scale.assetType + "/" + fontName + ".png", "assets/bitmapfonts/" + util.Scale.assetType + "/" + fontName + ".fnt", null, bitmapFonts[fontName]);
                    });
                }
            ];
        }
        PreloadState.prototype.preload = function () {
            Game.analytics.pageview("PreloadState");
            this._startTime = Date.now();
            this._ui = new ui.LoadUI();
            util.Cleaner.addToDestroyQueue(this._ui);
            var loaderProgress = 0;
            PokiSDK.gameLoadingStart();
            Game.game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
                var percentageDone = (totalLoaded / totalFiles * this._loaderPercentageAllocation) - loaderProgress;
                loaderProgress += percentageDone;
                PokiSDK.gameLoadingProgress({
                    percentageDone: loaderProgress
                });
                this._ui.updateProgressBar(percentageDone);
                if (totalLoaded == totalFiles) {
                    loaderProgress = 0;
                    this._loadNext();
                }
            }, this);
            this._loadNext();
            if (Game.save.load("musicMuted")) {
                util.Sound.muteMusic();
            }
            if (Game.save.load("soundMuted")) {
                util.Sound.muteSounds();
            }
        };
        PreloadState.prototype._loadNext = function () {
            if (this._loaders.length > 0) {
                var next = this._loaders.shift();
                next();
            }
            else {
                this._done();
            }
        };
        PreloadState.prototype.shutdown = function () {
            util.Cleaner.cleanupAll();
        };
        PreloadState.prototype._done = function () {
            PokiSDK.gameLoadingFinished();
            Game.analytics.event("LoadTimes", "Preload", "Time", (Date.now() - this._startTime));
            util.Debug.log("Preload finished in " + (Date.now() - this._startTime) / 1000 + " seconds");
            Game.save.save("gamestartFired", false);
            Game.game.state.start("SplashState");
        };
        return PreloadState;
    })(states.BaseState);
    states.PreloadState = PreloadState;
})(states || (states = {}));
Game.addState("PreloadState", states.PreloadState);
var states;
(function (states) {
    var GameplaySettings = logic.GameplaySettings;
    var SoloNormalState = (function (_super) {
        __extends(SoloNormalState, _super);
        function SoloNormalState() {
            _super.apply(this, arguments);
        }
        SoloNormalState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("SoloNormalState");
            this._enablePhysics();
            this._createMenuTitle('solo\nnormal');
            var singleTeamAndPlayerSelector = new ui.TeamAndSinglePlayerSelector("player"), enemyTeamAndPlayerSelector = new ui.TeamAndSinglePlayerSelector("computer", true);
            singleTeamAndPlayerSelector.randomize();
            enemyTeamAndPlayerSelector.randomize();
            util.PositionHelper.centerHorizontally([singleTeamAndPlayerSelector, enemyTeamAndPlayerSelector], Game.scale(100));
            util.PositionHelper.centerVertically([singleTeamAndPlayerSelector]);
            enemyTeamAndPlayerSelector.y = singleTeamAndPlayerSelector.y;
            if (Game.game.device.desktop) {
                this._createBackButton("NormalModeState");
            }
            else {
                this._createBackButton("ModeSelectState");
            }
            this._createConfirmButton("play", function () {
                Game.game.state.start("GameState", true, false, "Solo Normal", new GameplaySettings([0], [1], [enemyTeamAndPlayerSelector.getAILevel()], [singleTeamAndPlayerSelector.selectedPlayer, enemyTeamAndPlayerSelector.selectedPlayer], [singleTeamAndPlayerSelector.controlIndex], true, function () {
                    Game.game.state.start("SoloNormalState");
                }));
            });
        };
        SoloNormalState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return SoloNormalState;
    })(states.BaseMenuState);
    states.SoloNormalState = SoloNormalState;
})(states || (states = {}));
Game.addState("SoloNormalState", states.SoloNormalState);
var states;
(function (states) {
    var SoloTournamentState = (function (_super) {
        __extends(SoloTournamentState, _super);
        function SoloTournamentState() {
            _super.apply(this, arguments);
        }
        SoloTournamentState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("SoloTournamentState");
            this._enablePhysics();
            this._createMenuTitle('solo\ntournament');
            var singleTeamAndPlayerSelector = new ui.TeamAndSinglePlayerSelector("player", false, 0, true);
            singleTeamAndPlayerSelector.randomize();
            util.PositionHelper.centerHorizontally([singleTeamAndPlayerSelector]);
            util.PositionHelper.centerVertically([singleTeamAndPlayerSelector]);
            if (Game.game.device.desktop) {
                this._createBackButton("TournamentModeState");
            }
            else {
                this._createBackButton("ModeSelectState");
            }
            this._createConfirmButton("play", function () {
                logic.TourneyHandler.createNewTourney(singleTeamAndPlayerSelector.selectedTeam, [singleTeamAndPlayerSelector.selectedPlayer], 8);
                Game.game.state.start("TourneyState", true, false, false, false);
            });
        };
        SoloTournamentState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return SoloTournamentState;
    })(states.BaseMenuState);
    states.SoloTournamentState = SoloTournamentState;
})(states || (states = {}));
Game.addState("SoloTournamentState", states.SoloTournamentState);
var states;
(function (states) {
    var SplashState = (function (_super) {
        __extends(SplashState, _super);
        function SplashState() {
            _super.apply(this, arguments);
        }
        SplashState.prototype.create = function () {
            Game.analytics.pageview("SplashState");
            this.uiLayer = Game.game.add.group();
            this._initUI();
        };
        SplashState.prototype._initUI = function () {
            var _this = this;
            var background = this.uiLayer.add(new Phaser.Sprite(Game.game, Game.dimensions.width / 2, Game.dimensions.height / 2, "ui", "splashnew-bg"));
            background.anchor.setTo(.5, .5);
            var logo = new Phaser.Sprite(Game.game, Game.dimensions.width / 2, 0, "preroll", "logo");
            logo.anchor.setTo(.5, .5);
            var headEnd = new Phaser.Point((Game.dimensions.width / 2) - Game.scale(950), (Game.dimensions.height / 2) - Game.scale(150)), footFrontEnd = new Phaser.Point(headEnd.x + Game.scale(690), headEnd.y + Game.scale(550)), footBackEnd = new Phaser.Point(headEnd.x - Game.scale(50), headEnd.y + Game.scale(750)), handFrontEnd = new Phaser.Point(headEnd.x - Game.scale(350), headEnd.y + Game.scale(750)), handBackEnd = new Phaser.Point(headEnd.x + Game.scale(800), headEnd.y - Game.scale(50)), headAngleEnd = 0, ground1End = new Phaser.Point(headEnd.x + Game.scale(1500), headEnd.y + Game.scale(300)), ground2End = new Phaser.Point(headEnd.x + Game.scale(1400), headEnd.y + Game.scale(480)), ground3End = new Phaser.Point(headEnd.x + Game.scale(1400), headEnd.y + Game.scale(480)), ground4End = new Phaser.Point(headEnd.x + Game.scale(1680), headEnd.y + Game.scale(450)), ground5End = new Phaser.Point(headEnd.x + Game.scale(1680), headEnd.y + Game.scale(450)), ground6End = new Phaser.Point(headEnd.x + Game.scale(1500), headEnd.y + Game.scale(600)), ground7End = new Phaser.Point(headEnd.x + Game.scale(1000), headEnd.y + Game.scale(600)), ballFrontEnd = new Phaser.Point((Game.dimensions.width / 2) + Game.scale(950), (Game.dimensions.height / 2) - Game.scale(50)), ballBackEnd = new Phaser.Point((Game.dimensions.width / 2) + Game.scale(950), (Game.dimensions.height / 2) - Game.scale(50));
            var headStart = new Phaser.Point(((Game.dimensions.width / 2) - Game.scale(950)) - Game.dimensions.width, ((Game.dimensions.height / 2) - Game.scale(150)) + Game.dimensions.height), footFrontStart = new Phaser.Point(headStart.x - Game.scale(1200), headStart.y + Game.scale(900)), footBackStart = new Phaser.Point(headStart.x + Game.scale(800), headStart.y + Game.scale(750)), handFrontStart = new Phaser.Point(headStart.x + Game.scale(2000), headStart.y + Game.scale(750)), handBackStart = new Phaser.Point(headStart.x + Game.scale(500), headStart.y + Game.scale(1200)), headAngleStart = (45), ground1Start = new Phaser.Point(headStart.x - Game.scale(200), headStart.y + Game.scale(300)), ground2Start = new Phaser.Point(headStart.x - Game.scale(200), headStart.y + Game.scale(480)), ground3Start = new Phaser.Point(headStart.x - Game.scale(400), headStart.y + Game.scale(480)), ground4Start = new Phaser.Point(headStart.x - Game.scale(600), headStart.y + Game.scale(450)), ground5Start = new Phaser.Point(headStart.x - Game.scale(800), headStart.y + Game.scale(450)), ground6Start = new Phaser.Point(headStart.x - Game.scale(1000), headStart.y + Game.scale(600)), ground7Start = new Phaser.Point(headStart.x - Game.scale(1200), headStart.y + Game.scale(600)), ballFrontStart = new Phaser.Point(((Game.dimensions.width / 2) - Game.scale(650)) - Game.dimensions.width, ((Game.dimensions.height / 2) - Game.scale(300)) + Game.dimensions.height), ballBackStart = new Phaser.Point(((Game.dimensions.width / 2) - Game.scale(650)) - Game.dimensions.width, ((Game.dimensions.height / 2) - Game.scale(300)) + Game.dimensions.height);
            var head = new Phaser.Sprite(Game.game, headStart.x, headStart.y, "ui", "splashnew-ronaldo-head");
            head.angle = headAngleStart;
            var footFront = new Phaser.Sprite(Game.game, footFrontStart.x, footFrontStart.y, "ui", "splashnew-foot-front");
            var footBack = new Phaser.Sprite(Game.game, footBackStart.x, footBackStart.y, "ui", "splashnew-foot-back");
            var handBack = new Phaser.Sprite(Game.game, handBackStart.x, handBackStart.y, "ui", "splashnew-hand-back");
            var handFront = new Phaser.Sprite(Game.game, handFrontStart.x, handFrontStart.y, "ui", "splashnew-hand-front");
            var ground1 = new Phaser.Sprite(Game.game, ground1Start.x, ground1Start.y, "ui", "splashnew-ground1");
            var ground2 = new Phaser.Sprite(Game.game, ground2Start.x, ground2Start.y, "ui", "splashnew-ground2");
            var ground3 = new Phaser.Sprite(Game.game, ground3Start.x, ground3Start.y, "ui", "splashnew-ground3");
            var ground4 = new Phaser.Sprite(Game.game, ground4Start.x, ground4Start.y, "ui", "splashnew-ground4");
            var ground5 = new Phaser.Sprite(Game.game, ground5Start.x, ground5Start.y, "ui", "splashnew-ground5");
            var ground6 = new Phaser.Sprite(Game.game, ground6Start.x, ground6Start.y, "ui", "splashnew-ground6");
            var ground7 = new Phaser.Sprite(Game.game, ground7Start.x, ground7Start.y, "ui", "splashnew-ground7");
            var ballBack = new Phaser.Sprite(Game.game, ballBackStart.x, ballBackStart.y, "ui", "splashnew-ball-back");
            var ballFront = new Phaser.Sprite(Game.game, ballFrontStart.x, ballFrontStart.y, "ui", "splashnew-ball-front");
            handFront.anchor.setTo(.5, .5);
            handFront.anchor.setTo(.5, .5);
            head.anchor.setTo(.5, .5);
            footFront.anchor.setTo(.5, .5);
            footBack.anchor.setTo(.5, .5);
            handBack.anchor.setTo(.5, .5);
            handFront.anchor.setTo(.5, .5);
            ground1.anchor.setTo(.5, .5);
            ground2.anchor.setTo(.5, .5);
            ground3.anchor.setTo(.5, .5);
            ground4.anchor.setTo(.5, .5);
            ground5.anchor.setTo(.5, .5);
            ground6.anchor.setTo(.5, .5);
            ground7.anchor.setTo(.5, .5);
            ballFront.anchor.setTo(.5, .5);
            ballBack.anchor.setTo(.5, .5);
            this.uiLayer.addMultiple([footBack, handBack, head, footFront, handFront, ballBack, ballFront, ground1, ground2, ground3, ground4, ground5, ground6, ground7]);
            var headTween = Game.game.add.tween(head.position).to({ x: headEnd.x, y: headEnd.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(head).to({ angle: headAngleEnd }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(footFront.position).to({ x: footFrontEnd.x, y: footFrontEnd.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(footBack.position).to({ x: footBackEnd.x, y: footBackEnd.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(handBack.position).to({ x: handBackEnd.x, y: handBackEnd.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(handFront.position).to({ x: handFrontEnd.x, y: handFrontEnd.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ground1.position).to({ x: ground1End.x, y: ground1End.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ground2.position).to({ x: ground2End.x, y: ground2End.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ground3.position).to({ x: ground3End.x, y: ground3End.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ground4.position).to({ x: ground4End.x, y: ground4End.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ground5.position).to({ x: ground5End.x, y: ground5End.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ground6.position).to({ x: ground6End.x, y: ground6End.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ground7.position).to({ x: ground7End.x, y: ground7End.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ballBack.position).to({ x: ballBackEnd.x, y: ballBackEnd.y }, 2000, Phaser.Easing.Quartic.Out, true);
            Game.game.add.tween(ballFront.position).to({ x: ballFrontEnd.x, y: ballFrontEnd.y }, 2000, Phaser.Easing.Quartic.Out, true);
            headTween.onComplete.add(function () {
                Game.game.add.tween(head.position).to({ y: headEnd.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(footFront.position).to({ y: footFrontEnd.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(footBack.position).to({ y: footBackEnd.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(handBack.position).to({ y: handBackEnd.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(handFront.position).to({ y: handFrontEnd.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ground1.position).to({ y: ground1End.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ground2.position).to({ y: ground2End.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ground3.position).to({ y: ground3End.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ground4.position).to({ y: ground4End.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ground5.position).to({ y: ground5End.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ground6.position).to({ y: ground6End.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ground7.position).to({ y: ground7End.y + Game.scale(25 + (Math.random() * 50)) }, 4000 + (Math.random() * 2000), Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                Game.game.add.tween(ballFront).to({ angle: 360 }, 200000, Phaser.Easing.Linear.None, true, 0, -1, false);
                var bmd = Game.game.make.bitmapData(Game.dimensions.width, Game.dimensions.height);
                bmd.rect(0, 0, Game.dimensions.width, Game.dimensions.height, 'rgba(255,255,255,1)');
                var whiteOverlay = new Phaser.Sprite(Game.game, Game.dimensions.width / 2, Game.dimensions.height / 2, bmd);
                whiteOverlay.anchor.setTo(.5, .5);
                _this.uiLayer.add(whiteOverlay);
                _this.uiLayer.add(logo);
                util.Sound.playMusic("music");
                var startButton = new ui.Button(new Phaser.Point(Game.dimensions.width / 2, 0), "play", "normal", Game.scale(100));
                util.PositionHelper.centerVertically([logo, startButton], Game.scale(100));
                Game.game.add.tween(logo).to({ width: logo.width * 1.1, height: logo.height * 1.1 }, 2000, Phaser.Easing.Sinusoidal.Out, true);
                Game.game.add.tween(startButton).to({ width: startButton.width * 1.1, startButton: logo.height * 1.1 }, 2000, Phaser.Easing.Sinusoidal.Out, true);
                startButton.onClick(function () {
                    if (Game.pokiSDKLoaded) {
                        util.Sound.pauseMusic("music");
                        PokiSDK.commercialBreak()
                            .then(function () {
                            Game.game.state.start("ModeSelectState");
                            util.Sound.resumeMusic("music");
                        });
                    }
                    else {
                        Game.game.state.start("ModeSelectState");
                    }
                });
                Game.game.add.tween(whiteOverlay).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                    whiteOverlay.visible = false;
                });
            });
        };
        return SplashState;
    })(states.BaseState);
    states.SplashState = SplashState;
})(states || (states = {}));
Game.addState("SplashState", states.SplashState);
var states;
(function (states) {
    var GameplaySettings = logic.GameplaySettings;
    var TeamVersusNormalState = (function (_super) {
        __extends(TeamVersusNormalState, _super);
        function TeamVersusNormalState() {
            _super.apply(this, arguments);
        }
        TeamVersusNormalState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("TeamVersusNormalState");
            this._enablePhysics();
            this._createMenuTitle('co-op\nnormal');
            var teamOneSelector = new ui.TeamAndDoublePlayerSelector("team 1"), teamTwoSelector = new ui.TeamAndDoublePlayerSelector("team 2", false, 2);
            teamOneSelector.randomize();
            teamTwoSelector.randomize();
            util.PositionHelper.centerHorizontally([teamOneSelector, teamTwoSelector], Game.scale(100));
            util.PositionHelper.centerVertically([teamOneSelector]);
            teamTwoSelector.y = teamOneSelector.y;
            this._createBackButton("NormalModeState");
            this._createConfirmButton("play", function () {
                var playerControlIndexes = [];
                playerControlIndexes = playerControlIndexes.concat(teamOneSelector.switched ? [1, 0] : [0, 1]);
                playerControlIndexes = playerControlIndexes.concat(teamTwoSelector.switched ? [3, 2] : [2, 3]);
                Game.game.state.start("GameState", true, false, "Solo Normal", new GameplaySettings([1, 0, 3, 2], [], [], [
                    teamOneSelector.selectedPlayers[1],
                    teamOneSelector.selectedPlayers[0],
                    teamTwoSelector.selectedPlayers[1],
                    teamTwoSelector.selectedPlayers[0]
                ], playerControlIndexes, true, function () {
                    Game.game.state.start("TeamVersusNormalState");
                }));
            });
        };
        TeamVersusNormalState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return TeamVersusNormalState;
    })(states.BaseMenuState);
    states.TeamVersusNormalState = TeamVersusNormalState;
})(states || (states = {}));
Game.addState("TeamVersusNormalState", states.TeamVersusNormalState);
var states;
(function (states) {
    var TournamentModeState = (function (_super) {
        __extends(TournamentModeState, _super);
        function TournamentModeState() {
            _super.apply(this, arguments);
        }
        TournamentModeState.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            Game.analytics.pageview("TournamentModeState");
            this._createMenuTitle('TOURNAMENT\nMODE');
            var soloTournamentButton = new ui.Button(new Phaser.Point(0, Game.dimensions.height * .5), "solo", "normal", Game.scale(100), "blue", Game.scale(50));
            soloTournamentButton.onClick(function () {
                logic.TourneyHandler.playerPrefix = "solo";
                _this._checkPreviousTournament(function (continueWithPrevious) {
                    if (continueWithPrevious) {
                        Game.game.state.start("TourneyState", true, false, true, false);
                    }
                    else {
                        logic.TourneyHandler.clear();
                        Game.game.state.start("SoloTournamentState");
                    }
                });
            });
            var coopTournamentButton = new ui.Button(new Phaser.Point(0, Game.dimensions.height * .5), '2vs2\nco-op', "normal", Game.scale(100), "blue", Game.scale(50));
            coopTournamentButton.onClick(function () {
                logic.TourneyHandler.playerPrefix = "coop";
                _this._checkPreviousTournament(function (continueWithPrevious) {
                    if (continueWithPrevious) {
                        Game.game.state.start("TourneyState", true, false, true, true);
                    }
                    else {
                        logic.TourneyHandler.clear();
                        Game.game.state.start("CoopTournamentState");
                    }
                });
            });
            this.midLayer.addMultiple([soloTournamentButton, coopTournamentButton]);
            util.PositionHelper.centerHorizontally([soloTournamentButton, coopTournamentButton], Game.scale(200));
            this._drawPlayerIconsAtPositions(soloTournamentButton.position, 'HA');
            this._drawPlayerIconsAtPositions(coopTournamentButton.position, 'HHAA');
            this._createBackButton();
        };
        TournamentModeState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        TournamentModeState.prototype._checkPreviousTournament = function (callback) {
            if (logic.TourneyHandler.hasActiveTourney()) {
                new ui.QuestionDisplay("Continue with previous tournament?", function () {
                    callback(true);
                }, function () {
                    callback(false);
                }, "Yes, continue", "No, start a new one", true);
            }
            else {
                callback(false);
            }
        };
        return TournamentModeState;
    })(states.BaseMenuState);
    states.TournamentModeState = TournamentModeState;
})(states || (states = {}));
Game.addState("TournamentModeState", states.TournamentModeState);
/**
 * GameState
 *
 *
 */
var states;
(function (states) {
    var TourneyState = (function (_super) {
        __extends(TourneyState, _super);
        function TourneyState() {
            _super.apply(this, arguments);
            this._screenShakeEnabled = false;
        }
        TourneyState.prototype.create = function () {
        };
        TourneyState.prototype.init = function (continueTourney, isCoop) {
            if (continueTourney === void 0) { continueTourney = true; }
            if (isCoop === void 0) { isCoop = false; }
            _super.prototype.create.call(this);
            Game.analytics.pageview("TournamentState");
            this._maxShake = Game.scale(10);
            if (logic.TourneyHandler.currentRoundIndex < 3) {
                this._createMenuTitle('tournament\nround ' + (logic.TourneyHandler.currentRoundIndex + 1));
            }
            else {
                var felicitadoes = [
                    'congratulations!',
                    'awesome!',
                    'winner winner\n chicken dinner!',
                    'waaahaaahoooooww!'
                ];
                this._createMenuTitle(felicitadoes[Math.floor(felicitadoes.length * Math.random())]);
            }
            if (logic.TourneyHandler.currentRoundIndex < 3) {
                this._createNextRoundButtonAndBindings(isCoop);
                this._createBackButton("TournamentModeState");
                this._createTourneyUI();
            }
            else {
                logic.TourneyHandler.currentRoundIndex = 2;
                this._createTourneyUI();
                this._createBackButton("TournamentModeState", function () {
                    logic.TourneyHandler.clear();
                });
                this._winnerCelebration();
            }
        };
        TourneyState.prototype._winnerCelebration = function () {
            var _this = this;
            this._tourneyUI.doTeamLogoAnimation(logic.TourneyHandler.selectedTeam);
            this._screenShakeEnabled = true;
            setTimeout(function () {
                _this._screenShakeEnabled = false;
                Game.game.world.setBounds(0, 0, Game.dimensions.width, Game.dimensions.height);
            }, 1000);
        };
        TourneyState.prototype._createTourneyUI = function () {
            this._tourneyUI = new ui.TourneyUI();
            this._tourneyUI.scale.set(.7, .7);
            this._tourneyUI.x += Game.dimensions.width * .13;
            this._tourneyUI.y += Game.dimensions.height * .25;
        };
        TourneyState.prototype._createNextRoundButtonAndBindings = function (isCoop) {
            if (isCoop === void 0) { isCoop = false; }
            var aiLevel = 1;
            switch (logic.TourneyHandler.currentRoundIndex) {
                default:
                case 0:
                    break;
                case 1:
                    aiLevel = 5;
                    break;
                case 2:
                    aiLevel = 9;
                    break;
            }
            var humanControlledPlayers, aiControlledPlayers, aiLevels, players = [], playerControlIndexes;
            var game = logic.TourneyHandler.getCurrentGameForSelectedTeam();
            var teams = game.getTeams();
            if (!isCoop) {
                var selectedPlayer = logic.TourneyHandler.selectedPlayers[0];
                if (selectedPlayer === null) {
                    selectedPlayer = logic.TourneyHandler.selectedPlayers[1];
                }
                humanControlledPlayers = [0];
                aiControlledPlayers = [1];
                aiLevels = [aiLevel];
                players.push(selectedPlayer);
                for (var i = 0; i < teams[1]["players"].length; i++) {
                    players.push(teams[1]["players"][i]);
                    break;
                }
                playerControlIndexes = [0];
            }
            else {
                humanControlledPlayers = [0, 1];
                aiControlledPlayers = [2, 3];
                aiLevels = [aiLevel, aiLevel];
                players.push(logic.TourneyHandler.selectedPlayers[0]);
                players.push(logic.TourneyHandler.selectedPlayers[1]);
                for (var i = 0; i < teams[1]["players"].length; i++) {
                    players.push(teams[1]["players"][i]);
                }
                playerControlIndexes = [0, 2];
            }
            this._createConfirmButton("play", function () {
                var gameplaySettings = new logic.GameplaySettings(humanControlledPlayers, aiControlledPlayers, aiLevels, players, playerControlIndexes, false, function (result) {
                    if (result[0] > result[1]) {
                        logic.TourneyHandler.setScoreForRoundAndGame(logic.TourneyHandler.currentRoundIndex, logic.TourneyHandler.getCurrentGameIndexForSelectedTeam(), result, true);
                        logic.TourneyHandler.goToNextRoundAndRandomizeScoresForUnfinishedMatches();
                        Game.game.state.start("TourneyState", true, false, true, isCoop);
                    }
                    else {
                        new ui.QuestionDisplay("retry?", function () {
                            Game.state.gameplayHandler.rematch();
                        }, function () {
                            Game.game.state.start("SplashState");
                        });
                    }
                });
                Game.game.state.start("GameState", true, false, "Single Tournament", gameplaySettings);
            });
        };
        TourneyState.prototype._doPotentialScreenShake = function () {
            if (this._screenShakeEnabled) {
                var shakeOffset = new Phaser.Point(Math.ceil((Math.random() - .5) * 2 * this._maxShake), Math.ceil((Math.random() - .5) * 2 * this._maxShake));
                Game.game.world.setBounds(shakeOffset.x, shakeOffset.y, Game.dimensions.width, Game.dimensions.height);
            }
        };
        TourneyState.prototype.update = function () {
            _super.prototype.update.call(this);
            this._doPotentialScreenShake();
        };
        TourneyState.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        return TourneyState;
    })(states.BaseMenuState);
    states.TourneyState = TourneyState;
})(states || (states = {}));
Game.addState("TourneyState", states.TourneyState);
var states;
(function (states) {
    var GameplaySettings = logic.GameplaySettings;
    var VersusNormalState = (function (_super) {
        __extends(VersusNormalState, _super);
        function VersusNormalState() {
            _super.apply(this, arguments);
        }
        VersusNormalState.prototype.create = function () {
            _super.prototype.create.call(this);
            Game.analytics.pageview("VersusNormalState");
            this._enablePhysics();
            this._createMenuTitle('solo\nnormal');
            var playerOneSelector = new ui.TeamAndSinglePlayerSelector("player 1"), playerTwoSelector = new ui.TeamAndSinglePlayerSelector("player 2", false, 2);
            playerTwoSelector.randomize();
            playerOneSelector.randomize();
            util.PositionHelper.centerHorizontally([playerOneSelector, playerTwoSelector], Game.scale(100));
            util.PositionHelper.centerVertically([playerOneSelector]);
            playerTwoSelector.y = playerOneSelector.y;
            this._createBackButton("NormalModeState");
            this._createConfirmButton("play", function () {
                Game.game.state.start("GameState", true, false, "Solo Normal", new GameplaySettings([0, 1], [], [], [playerOneSelector.selectedPlayer, playerTwoSelector.selectedPlayer], [playerOneSelector.controlIndex, playerTwoSelector.controlIndex], true, function () {
                    Game.game.state.start("VersusNormalState");
                }));
            });
        };
        VersusNormalState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return VersusNormalState;
    })(states.BaseMenuState);
    states.VersusNormalState = VersusNormalState;
})(states || (states = {}));
Game.addState("VersusNormalState", states.VersusNormalState);
var ui;
(function (ui) {
    var ArenaBackground = (function (_super) {
        __extends(ArenaBackground, _super);
        function ArenaBackground() {
            _super.call(this, Game.game);
            this._background = Game.game.add.tileSprite(Game.dimensions.width / 2, Game.dimensions.height / 2 - Game.scale(200), Game.dimensions.width, Game.dimensions.height, "level", "bg-back", Game.state.farBackLayer);
            this._background.anchor.set(.5, .5);
            this._backgroundTwo = Game.game.add.tileSprite(Game.dimensions.width / 2, Game.dimensions.height / 2 + Game.scale(200), Game.dimensions.width, Game.dimensions.height, "level", "bg-front", Game.state.farBackLayer);
            this._backgroundTwo.anchor.set(.5, .5);
            this._tribune = Game.game.add.sprite(Game.dimensions.width * .5, Game.dimensions.height * .5 + Game.scale(150), "level", "tribune", Game.state.backLayer);
            this._tribune.anchor.set(.5, .5);
            this._field = Game.game.add.sprite(Game.dimensions.width * .5, Game.dimensions.height + Game.scale(100), "level", "field", Game.state.backLayer);
            this._field.anchor.set(.5, 1);
            this.addMultiple([this._background, this._backgroundTwo, this._tribune, this._field]);
        }
        ArenaBackground.prototype.update = function () {
            this._background.tilePosition.x++;
            this._backgroundTwo.tilePosition.x += .5;
        };
        return ArenaBackground;
    })(Phaser.Group);
    ui.ArenaBackground = ArenaBackground;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(position, text, bitmapFont, size, buttonId, padding) {
            var _this = this;
            if (buttonId === void 0) { buttonId = "blue"; }
            if (padding === void 0) { padding = Game.scale(10); }
            _super.call(this, Game.game);
            this._clickCallbacks = [];
            this._hoverCallbacks = [];
            this._downCallbacks = [];
            this._outCallbacks = [];
            this._contentOverridden = false;
            if (bitmapFont === "normal") {
                text = text.toUpperCase().charAt(0) + text.toLocaleLowerCase().substring(1);
            }
            this._padding = padding;
            this._buttonId = buttonId;
            this._buttonLeft = Game.game.add.sprite(0, 0, "ui", buttonId + "-left");
            this._buttonLeft.anchor.set(1, .5);
            this.add(this._buttonLeft);
            this._buttonCenter = Game.game.add.tileSprite(0, 0, 1, this._buttonLeft.height, "ui", buttonId + "-mid");
            this._buttonCenter.anchor.set(.5, .5);
            this.add(this._buttonCenter);
            this._buttonRight = Game.game.add.sprite(0, 0, "ui", buttonId + "-right");
            this._buttonRight.anchor.set(0, .5);
            this.add(this._buttonRight);
            this._text = Game.game.add.bitmapText(0, 0, bitmapFont, text, size);
            this._text.anchor.set(.5, .5);
            if (bitmapFont === "normal") {
                this._text.anchor.set(.475, .6);
            }
            this.add(this._text);
            this._button = Game.game.add.button(0, 0);
            this._button.anchor.set(.5, .5);
            this.add(this._button);
            this._button.onInputOver.add(function () { _this._onHover(); });
            this._button.onInputDown.add(function () { _this._onDown(); });
            this._button.onInputUp.add(function () { _this._onClick(); });
            this._button.onInputOut.add(function () { _this._onOut(); });
            this._setup();
            this.position = position.clone();
        }
        Button.prototype._setup = function () {
            if (this._contentOverridden) {
                this.overriddenContent.x = -this._overriddenContentWidth / 2 + Game.scale(80);
                this._buttonCenter.width = this._overriddenContentWidth + this._padding * 2;
            }
            else {
                if (this._text && typeof this._text.width !== "undefined") {
                    this._buttonCenter.width = Math.ceil(this._text.width + this._padding * 2);
                }
                this._text.x = 0;
            }
            this._buttonLeft.x = Math.ceil(-this._buttonCenter.width * .5) + 1;
            this._buttonRight.x = Math.ceil(this._buttonCenter.width * .5) - 1;
            this._button.width = this.width;
            this._button.height = this.height;
        };
        Button.prototype._onOut = function () {
            this._setFrame();
            for (var i = 0; i < this._outCallbacks.length; i++) {
                this._outCallbacks[i](this);
            }
        };
        Button.prototype._onClick = function (playSound) {
            if (playSound === void 0) { playSound = true; }
            if (playSound) {
                util.Sound.playFx("button");
            }
            this._setFrame();
            for (var i = 0; i < this._clickCallbacks.length; i++) {
                this._clickCallbacks[i](this);
            }
        };
        Button.prototype._onHover = function () {
            this._setFrame('down');
            for (var i = 0; i < this._hoverCallbacks.length; i++) {
                this._hoverCallbacks[i](this);
            }
        };
        Button.prototype._onDown = function () {
            for (var i = 0; i < this._downCallbacks.length; i++) {
                this._downCallbacks[i](this);
            }
        };
        Button.prototype._setFrame = function (string) {
            this._buttonLeft.frameName = this._buttonId + (string ? '-' + string : '') + "-left";
            this._buttonCenter.frameName = this._buttonId + (string ? '-' + string : '') + "-mid";
            this._buttonRight.frameName = this._buttonId + (string ? '-' + string : '') + "-right";
        };
        Button.prototype.clearClick = function () {
            this._clickCallbacks = [];
        };
        Button.prototype.clearHover = function () {
            this._hoverCallbacks = [];
        };
        Button.prototype.clearDown = function () {
            this._downCallbacks = [];
        };
        Button.prototype.clearOut = function () {
            this._outCallbacks = [];
        };
        Button.prototype.onClick = function (callback) {
            this._clickCallbacks.push(callback);
        };
        Button.prototype.onHover = function (callback) {
            this._hoverCallbacks.push(callback);
        };
        Button.prototype.onDown = function (callback) {
            this._downCallbacks.push(callback);
        };
        Button.prototype.onOut = function (callback) {
            this._outCallbacks.push(callback);
        };
        Button.prototype.click = function () {
            this._onClick(false);
        };
        Button.prototype.setText = function (text) {
            this._text.text = text.toUpperCase();
        };
        Button.prototype.getText = function () {
            return this._text.text;
        };
        Button.prototype.overrideContents = function (group, width, stillShowText) {
            if (stillShowText === void 0) { stillShowText = false; }
            if (!stillShowText) {
                this._text.visible = false;
            }
            this.overriddenContent = group;
            this._overriddenContentWidth = width;
            this._contentOverridden = true;
            this.add(this.overriddenContent);
            group.add(this._text);
            this.add(this._text);
            this._setup();
        };
        return Button;
    })(Phaser.Group);
    ui.Button = Button;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var ControlsIndicator = (function (_super) {
        __extends(ControlsIndicator, _super);
        function ControlsIndicator(position, ai, index) {
            var _this = this;
            if (ai === void 0) { ai = false; }
            if (index === void 0) { index = 0; }
            _super.call(this, Game.game);
            this._playerIndex = 0;
            this._aiLevel = 1;
            this._currentModifier = "easy";
            this._isAI = false;
            this._scale = .3;
            this.position = position;
            this._isAI = ai;
            this._aiGroup = Game.game.add.group();
            this._keyGroup = Game.game.add.group();
            this.addMultiple([this._aiGroup, this._keyGroup]);
            this._keyBackground = Game.game.add.sprite(0, 0, "ui", "player-buttons", this._keyGroup);
            this._keyBackground.anchor.set(.5, .5);
            this._aiDifficultyModifierButton = Game.game.add.sprite(0, 0, "ui", this._currentModifier + "-up");
            this._aiDifficultyModifierButton.anchor.set(.5, .5);
            this._aiDifficultyModifierButton.inputEnabled = true;
            this._aiText = Game.game.add.bitmapText(0, 0, "normal", this._currentModifier.toUpperCase(), Game.scale(100));
            this._aiText.anchor.set(.49, .5);
            this._aiDifficultyModifierButton.events.onInputUp.add(function () {
                if (_this._currentModifier === "easy") {
                    _this._currentModifier = "medium";
                }
                else if (_this._currentModifier === "medium") {
                    _this._currentModifier = "hard";
                }
                else if (_this._currentModifier === "hard") {
                    _this._currentModifier = "easy";
                }
                _this._aiDifficultyModifierButton.frameName = _this._currentModifier + "-up";
                _this._aiText.text = _this._currentModifier.toUpperCase();
            });
            this._aiDifficultyModifierButton.events.onInputOver.add(function () {
                Game.game.canvas.style.cursor = "pointer";
                _this._aiDifficultyModifierButton.frameName = _this._currentModifier + "-down";
            });
            this._aiDifficultyModifierButton.events.onInputOut.add(function () {
                Game.game.canvas.style.cursor = "default";
                _this._aiDifficultyModifierButton.frameName = _this._currentModifier + "-up";
            });
            this._aiGroup.addMultiple([this._aiDifficultyModifierButton, this._aiText]);
            this.setControls(index, ai);
            this._doPositioning();
        }
        ControlsIndicator.prototype.getAILevel = function () {
            return logic.AIControls.AILevels[this._currentModifier];
        };
        ControlsIndicator.prototype.disable = function () {
            this._hideAI();
            this._hidePlayerControls();
        };
        ControlsIndicator.prototype._hideAI = function () {
            this._aiGroup.visible = false;
        };
        ControlsIndicator.prototype._hidePlayerControls = function () {
            this._keyGroup.visible = false;
        };
        ControlsIndicator.prototype._showPlayerControls = function () {
            this._keyGroup.visible = true;
        };
        ControlsIndicator.prototype._showAI = function () {
            this._aiGroup.visible = true;
        };
        ControlsIndicator.prototype.enable = function () {
            if (this._isAI) {
                this._hidePlayerControls();
                this._showAI();
            }
            else {
                this._hideAI();
                var controls = logic.InputList.getPlayerTextControlsForPlayer(this._playerIndex);
                this._keyLeftText = this._destroyAndCreate(this._keyLeftText, controls[0], this._keyGroup);
                this._keyRightText = this._destroyAndCreate(this._keyRightText, controls[1], this._keyGroup);
                this._keyKickText = this._destroyAndCreate(this._keyKickText, controls[2], this._keyGroup);
                this._keyJumpText = this._destroyAndCreate(this._keyJumpText, controls[3], this._keyGroup);
                this._doPositioning();
                this._showPlayerControls();
            }
        };
        ControlsIndicator.prototype._destroyAndCreate = function (item, key, group) {
            if (item)
                item.destroy();
            if (["left", "right", "up", "_"].indexOf(key) > -1) {
                var sprite;
                if (key === "_") {
                    sprite = Game.game.add.sprite(0, 0, "icons", "icon-space", group);
                    sprite.scale.set(this._scale, this._scale);
                    sprite.visible = false;
                }
                if (key === "left") {
                    sprite = Game.game.add.sprite(0, 0, "icons", "icon-back", group);
                    sprite.scale.set(this._scale, this._scale);
                }
                else if (key == "right") {
                    sprite = Game.game.add.sprite(0, 0, "icons", "icon-back", group);
                    sprite.scale.set(-this._scale, this._scale);
                }
                else if (key == "up") {
                    sprite = Game.game.add.sprite(0, 0, "icons", "icon-back", group);
                    sprite.anchor.set(0, 1);
                    sprite.angle = 90;
                    sprite.scale.set(this._scale, this._scale);
                }
                this._keyBackground.frameName = 'player-buttons-space';
                return sprite;
            }
            else {
                this._keyBackground.frameName = 'player-buttons';
                var bitmapText = Game.game.add.bitmapText(0, 0, "normal", key.toUpperCase(), Game.scale(70));
                group.add(bitmapText);
                return bitmapText;
            }
        };
        ControlsIndicator.prototype.setPosition = function (position) {
            this.position = position;
            this._doPositioning();
        };
        ControlsIndicator.prototype._doPositioning = function () {
            var margin = Game.scale(120);
            if (!this.isAI()) {
                this._keyBackground.position.set(0, 0);
                var positionWithOffsetForKeys = new Phaser.Point(0, 0 - Game.scale(70));
                this._keyLeftText.anchor.set(.5, .5);
                this._keyLeftText.position.set(positionWithOffsetForKeys.x - margin, positionWithOffsetForKeys.y + margin);
                this._keyRightText.anchor.set(.5, .5);
                this._keyRightText.position.set(positionWithOffsetForKeys.x + margin, positionWithOffsetForKeys.y + margin);
                this._keyJumpText.anchor.set(.5, .5);
                this._keyJumpText.position.set(positionWithOffsetForKeys.x, positionWithOffsetForKeys.y);
                this._keyKickText.anchor.set(.5, .5);
                this._keyKickText.position.set(positionWithOffsetForKeys.x, positionWithOffsetForKeys.y + margin);
            }
            this._aiText.position.set(0, 0);
        };
        ControlsIndicator.prototype.isAI = function () {
            return this._isAI;
        };
        ControlsIndicator.prototype.setControls = function (index, ai) {
            if (ai === void 0) { ai = false; }
            this._isAI = ai;
            if (ai) {
                this._aiLevel = index;
            }
            else {
                this._playerIndex = index;
            }
            this.enable();
        };
        ControlsIndicator.prototype.getControls = function () {
            return [
                this._isAI ? "A" : "H",
                this._isAI ? this._aiLevel : this._playerIndex
            ];
        };
        return ControlsIndicator;
    })(Phaser.Group);
    ui.ControlsIndicator = ControlsIndicator;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var FlashText = (function (_super) {
        __extends(FlashText, _super);
        function FlashText() {
            _super.call(this, Game.game);
            this._flashyText = Game.game.add.bitmapText(Game.dimensions.width / 2, Game.dimensions.height / 2, "normal", "", Game.scale(150));
            this._flashyText.align = 'center';
            this._flashyText.anchor.set(.5, .5);
            this._flashyText.scale.set(.2, .2);
            this._flashyText.alpha = 0;
            this.add(this._flashyText);
        }
        FlashText.prototype.flashText = function (text, hideWithCallback, animationCompleteCallback) {
            var _this = this;
            if (hideWithCallback === void 0) { hideWithCallback = false; }
            this._flashyText.text = text.toUpperCase().charAt(0) + text.toLocaleLowerCase().substring(1);
            Game.game.add.tween(this._flashyText).to({
                alpha: 1
            }, 500, Phaser.Easing.Quadratic.Out, true);
            var tween = Game.game.add.tween(this._flashyText.scale).to({
                x: 1.1,
                y: 1.1
            }, 500, Phaser.Easing.Quadratic.Out, true);
            if (animationCompleteCallback) {
                tween.onComplete.add(animationCompleteCallback);
            }
            var hideFn = function () {
                Game.game.add.tween(_this._flashyText).to({
                    alpha: 0
                }, 500, Phaser.Easing.Quadratic.Out, true);
                Game.game.add.tween(_this._flashyText.scale).to({
                    x: .2,
                    y: .2
                }, 500, Phaser.Easing.Quadratic.Out, true);
            };
            if (hideWithCallback) {
                return hideFn;
            }
            else {
                setTimeout(hideFn, 1500);
            }
            return;
        };
        return FlashText;
    })(Phaser.Group);
    ui.FlashText = FlashText;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var GameUI = (function () {
        function GameUI() {
            this._timerDigits = [];
            this._seperatorString = "   -   ";
            var timerSpacing = Game.scale(123);
            var midSpacing = Game.scale(85);
            var xOffset = Game.scale(45);
            var yPosition = Game.dimensions.height / 2 - Game.scale(730);
            var timerPositions = [
                new Phaser.Point(xOffset + Game.dimensions.width / 2 - midSpacing - timerSpacing, yPosition),
                new Phaser.Point(xOffset + Game.dimensions.width / 2 - midSpacing, yPosition),
                new Phaser.Point(xOffset + Game.dimensions.width / 2 + midSpacing, yPosition),
                new Phaser.Point(xOffset + Game.dimensions.width / 2 + midSpacing + timerSpacing, yPosition),
            ];
            for (var i = 0; i < 4; i++) {
                var bitmapText = Game.game.add.bitmapText(timerPositions[i].x, timerPositions[i].y, "digital-time", "0", Game.scale(190));
                bitmapText.align = 'right';
                bitmapText.anchor.set(1, .5);
                Game.state.midLayer.add(bitmapText);
                this._timerDigits.push(bitmapText);
            }
            this._scoreBasePosition = new Phaser.Point(Game.dimensions.width / 2, Game.dimensions.height - Game.scale(130));
            this._goalFlashBehind = Game.game.add.sprite(Game.dimensions.width / 2, Game.dimensions.height / 2, "effects", "goal", Game.state.backLayer);
            this._goalFlashBehind.anchor.set(.5, .5);
            this._goalFlashBehind.visible = false;
            this._goalFlashFront = Game.game.add.sprite(Game.dimensions.width / 2, Game.dimensions.height / 2, "effects", "goal", Game.state.frontLayer);
            this._goalFlashFront.anchor.set(.5, .5);
            this._goalFlashFront.visible = false;
            this._scoreBackground = Game.game.add.sprite(this._scoreBasePosition.x, this._scoreBasePosition.y - Game.scale(20), "ui", "score", Game.state.midLayer);
            this._scoreBackground.anchor.set(.5, .5);
            this._scoreBallLeft = Game.game.add.sprite(this._scoreBasePosition.x - Game.scale(385), this._scoreBasePosition.y - Game.scale(12), "ui", "ball", Game.state.midLayer);
            this._scoreBallLeft.anchor.set(.5, .5);
            this._scoreBallLeft.scale.set(.6, .6);
            this._matchHistoryLeft = Game.game.add.bitmapText(this._scoreBallLeft.x + Game.scale(45), this._scoreBasePosition.y - Game.scale(22), "normal", "0", Game.scale(60));
            this._matchHistoryLeft.anchor.set(0, .5);
            Game.state.midLayer.add(this._matchHistoryLeft);
            this._scoreBallRight = Game.game.add.sprite(this._scoreBasePosition.x + Game.scale(385), this._scoreBasePosition.y - Game.scale(12), "ui", "ball", Game.state.midLayer);
            this._scoreBallRight.anchor.set(.5, .5);
            this._scoreBallRight.scale.set(.6, .6);
            this._matchHistoryRight = Game.game.add.bitmapText(this._scoreBallRight.x - Game.scale(45), this._scoreBasePosition.y - Game.scale(22), "normal", "0", Game.scale(60));
            this._matchHistoryRight.anchor.set(1, .5);
            Game.state.midLayer.add(this._matchHistoryRight);
            this._scoreText = Game.game.add.bitmapText(this._scoreBasePosition.x, this._scoreBasePosition.y - Game.scale(20), "normal", "0" + this._seperatorString + "0", Game.scale(120));
            this._scoreText.align = 'center';
            this._scoreText.anchor.set(.5, .5);
            this._hideScore();
            Game.state.midLayer.add(this._scoreText);
            this._countDownText = Game.game.add.bitmapText(Game.dimensions.width / 2, Game.dimensions.height / 2, "normal", "", Game.scale(170));
            this._countDownText.align = 'center';
            this._countDownText.anchor.set(.5, .5);
            Game.state.uiLayer.add(this._countDownText);
            this._createFlashText();
            this._createPauseButtonAndMenu();
        }
        GameUI.prototype._createPauseButtonAndMenu = function () {
            var pauseIcon = Game.game.add.sprite(0, 0, "icons", "icon-pause"), pauseButton = new ui.RoundButton(pauseIcon, function () {
                Game.events.trigger("inGamePause");
                pauseButton.visible = false;
            });
            Game.events.addListener("inGameResume", function () {
                pauseButton.visible = true;
            });
            pauseButton.position.set(Game.dimensions.width - Game.scale(100), Game.scale(100));
            var pauseMenu = new ui.PauseMenu(new Phaser.Point(Game.dimensions.width * .5, Game.dimensions.height * .5));
            Game.state.fixedUiLayer.addMultiple([pauseButton, pauseMenu]);
        };
        GameUI.prototype._createFlashText = function () {
            this._textFlasher = new ui.FlashText();
            Game.state.uiLayer.add(this._textFlasher);
        };
        GameUI.prototype.doCountDown = function (callback) {
            var _this = this;
            var countDown = 3;
            var timer = setInterval(function () {
                util.Sound.playFx("countdown");
                _this._countDownText.text = countDown + "";
                if (countDown === 0) {
                    clearInterval(timer);
                    _this._showScore();
                    util.Sound.playFx("whistle-start");
                    callback();
                    setTimeout(function () {
                        _this._countDownText.text = "";
                    }, 600);
                }
                countDown--;
            }, 600);
        };
        GameUI.prototype.setMatchHistory = function (leftText, rightText) {
            this._matchHistoryLeft.text = leftText;
            this._matchHistoryRight.text = rightText;
        };
        GameUI.prototype.setTime = function (digits) {
            for (var i = 0; i < 4; i++) {
                this._timerDigits[i].text = digits[i];
            }
        };
        GameUI.prototype.setScore = function (score) {
            this._scoreText.text = score[0] + this._seperatorString + score[1];
        };
        GameUI.prototype._showScore = function () {
            this._scoreText.visible = true;
            this._scoreBallLeft.visible = true;
            this._scoreBallRight.visible = true;
            this._matchHistoryLeft.visible = true;
            this._matchHistoryRight.visible = true;
        };
        GameUI.prototype._hideScore = function () {
            this._scoreText.visible = false;
            this._scoreBallLeft.visible = false;
            this._scoreBallRight.visible = false;
            this._matchHistoryLeft.visible = false;
            this._matchHistoryRight.visible = false;
        };
        GameUI.prototype._highlightScore = function () {
            Game.game.add.tween(this._scoreText.position).to({
                y: Game.dimensions.height / 2
            }, 500, Phaser.Easing.Quadratic.Out, true);
            Game.game.add.tween(this._scoreText.scale).to({
                x: 2,
                y: 2
            }, 500, Phaser.Easing.Quadratic.Out, true);
        };
        GameUI.prototype._hideHighlightScore = function () {
            Game.game.add.tween(this._scoreText.position).to({
                y: this._scoreBasePosition.y - Game.scale(20)
            }, 500, Phaser.Easing.Quadratic.Out, true);
            Game.game.add.tween(this._scoreText.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Quadratic.Out, true);
        };
        GameUI.prototype.endScreen = function (callback) {
            var _this = this;
            this._highlightScore();
            setTimeout(function () {
                _this._hideHighlightScore();
                callback();
            }, 3000);
        };
        GameUI.prototype.flashGoal = function (anitemationCompleteCallback) {
            var _this = this;
            this._goalFlashBehind.visible = true;
            this._goalFlashBehind.alpha = .7;
            this._goalFlashBehind.scale.set(.1, .1);
            this._goalFlashBehind.position.set(Game.dimensions.width / 2, Game.dimensions.height - Game.scale(400));
            this._goalFlashFront.visible = true;
            this._goalFlashFront.alpha = 1;
            this._goalFlashFront.scale.set(.7, .7);
            this._goalFlashFront.y = Game.scale(-600);
            this._goalFlashFront.angle = 0;
            Game.game.world.bringToTop(this._goalFlashFront);
            var behindTween = Game.game.add.tween(this._goalFlashBehind).to({
                y: Game.scale(-600),
                alhpa: 1
            }, 700, Phaser.Easing.Quadratic.Out, true);
            Game.game.add.tween(this._goalFlashBehind.scale).to({
                x: .7,
                y: .7
            }, 700, Phaser.Easing.Quadratic.Out, true);
            var frontTween = Game.game.add.tween(this._goalFlashFront).to({
                y: Game.scale(400),
                alhpa: 1
            }, 500, Phaser.Easing.Quadratic.Out, true, 700);
            Game.game.add.tween(this._goalFlashFront.scale).to({
                x: .9,
                y: .9
            }, 500, Phaser.Easing.Quadratic.Out, true, 700);
            frontTween.onComplete.add(function () {
                var frontTweenPartTwo = Game.game.add.tween(_this._goalFlashFront).to({
                    angle: 1
                }, 50, Phaser.Easing.Quadratic.Out, true);
                frontTweenPartTwo.onComplete.add(function () {
                    var frontTweenPartThree = Game.game.add.tween(_this._goalFlashFront).to({
                        angle: -1
                    }, 50, Phaser.Easing.Quadratic.Out, true, 0, 15, true);
                    frontTweenPartThree.onComplete.add(function () {
                        var frontTweenPartThree = Game.game.add.tween(_this._goalFlashFront).to({
                            alpha: 0,
                            y: Game.scale(-600)
                        }, 1000, Phaser.Easing.Quadratic.Out, true);
                        if (anitemationCompleteCallback) {
                            frontTweenPartThree.onComplete.add(anitemationCompleteCallback);
                        }
                    });
                });
            });
        };
        GameUI.prototype.flashGoldenGoal = function (anitemationCompleteCallback) {
            var _this = this;
            this._goalFlashBehind.frameName = "golden-goal";
            this._goalFlashFront.frameName = "golden-goal";
            this.flashGoal(function () {
                if (anitemationCompleteCallback)
                    anitemationCompleteCallback();
                _this._goalFlashBehind.frameName = "goal";
                _this._goalFlashFront.frameName = "goal";
            });
        };
        GameUI.prototype.flashText = function (text, hideWithCallback, animationCompleteCallback) {
            if (hideWithCallback === void 0) { hideWithCallback = false; }
            return this._textFlasher.flashText(text, hideWithCallback, animationCompleteCallback);
        };
        GameUI.prototype.questionDisplay = function (question, positiveCallback, negativeCallback, positiveAnswer, negativeAnswer) {
            if (positiveAnswer === void 0) { positiveAnswer = "YES"; }
            if (negativeAnswer === void 0) { negativeAnswer = "NO"; }
            new ui.QuestionDisplay(question, positiveCallback, negativeCallback, positiveAnswer, negativeAnswer);
        };
        return GameUI;
    })();
    ui.GameUI = GameUI;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var IngameLogo = (function () {
        function IngameLogo(position) {
            var gameLogo = Game.game.add.sprite(0, 0, "ui", "logo-only");
            gameLogo.anchor.set(.5, .5);
            gameLogo.position.set(position.x - Game.scale(160), position.y + Game.scale(15));
            gameLogo.scale.set(.25, .25);
            var subTitle = Game.game.add.sprite(0, 0, "ui", "logo-sub");
            subTitle.anchor.set(.5, .5);
            subTitle.scale.set(.5, .5);
            subTitle.position.set(gameLogo.x + Game.scale(300), gameLogo.y + Game.scale(15));
        }
        return IngameLogo;
    })();
    ui.IngameLogo = IngameLogo;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var InteractivePokiLogo = (function (_super) {
        __extends(InteractivePokiLogo, _super);
        function InteractivePokiLogo(x, y, baseScale, zoomScale, size) {
            if (baseScale === void 0) { baseScale = 0; }
            if (zoomScale === void 0) { zoomScale = 0; }
            if (size === void 0) { size = "small"; }
            _super.call(this, Game.game, x, y, "preroll", "poki-logo-" + size);
            this._baseScale = .8;
            this._zoomScale = .9;
            this._activeTween = null;
            this.anchor.set(.5, .5);
            if (baseScale != 0) {
                this._baseScale = baseScale;
            }
            if (zoomScale != 0) {
                this._zoomScale = zoomScale;
            }
            this.scale.set(this._baseScale, this._baseScale);
            this._createBalloon(x, y);
            this._bindEvents();
        }
        InteractivePokiLogo.prototype.balloonSprite = function () {
            return this._balloon;
        };
        InteractivePokiLogo.prototype.disable = function () {
            this.visible = false;
        };
        InteractivePokiLogo.prototype._createBalloon = function (x, y) {
            this._balloon = Game.game.add.sprite(x - Game.scale(225), y, "preroll", "play-more-balloon");
            this._balloon.anchor.set(1, .5);
            this._balloon.scale.set(.001, 1);
            this._balloon.visible = false;
        };
        InteractivePokiLogo.prototype._bindEvents = function () {
            var _this = this;
            this.inputEnabled = true;
            this.input.useHandCursor = true;
            this.events.onInputOver.add(function () {
                if (_this.scale.x == _this._baseScale) {
                    _this._showBalloon();
                    _this.scale.setTo(_this._zoomScale, _this._zoomScale);
                }
            });
            this.events.onInputOut.add(function () {
                _this._hideBalloon();
                _this.scale.setTo(_this._baseScale, _this._baseScale);
            });
            this.events.onInputDown.add(function () {
                Game.analytics.event("Button", "PokiMenu", "clicked");
                Game.openUrl("http://poki.com");
            }, this);
        };
        InteractivePokiLogo.prototype._showBalloon = function () {
            this._disableTween();
            this._balloon.visible = true;
            this._activeTween = Game.game.add.tween(this._balloon.scale).to({
                x: 1,
                y: 1
            }, 1500, Phaser.Easing.Elastic.Out, true, 0, 0, false);
        };
        InteractivePokiLogo.prototype._hideBalloon = function () {
            var _this = this;
            this._disableTween();
            this._activeTween = Game.game.add.tween(this._balloon.scale).to({
                x: .001,
                y: 1
            }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            this._activeTween.onComplete.addOnce(function () {
                _this._balloon.visible = false;
            });
        };
        InteractivePokiLogo.prototype._disableTween = function () {
            if (this._activeTween !== null) {
                this._activeTween.stop();
            }
        };
        return InteractivePokiLogo;
    })(Phaser.Sprite);
    ui.InteractivePokiLogo = InteractivePokiLogo;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var LoadUI = (function () {
        function LoadUI() {
            this._percentageLoaded = 0;
            this._drawLogos();
            this._drawLoadingBar();
            this.updateProgressBar(0);
        }
        LoadUI.prototype._drawLogos = function () {
            this._logo = Game.game.add.sprite(Game.game.world.centerX, Game.game.world.centerY, "preroll", "logo");
            this._logo.anchor.set(.5, .5);
            this._logo.position.set(Game.dimensions.width / 2, Game.dimensions.height / 2 - Game.scale(200));
            var pokiLogo = Game.game.add.sprite(this._logo.x, this._logo.y, "preroll", "poki-logo-small");
            pokiLogo.anchor.set(.5, .5);
            pokiLogo.position.set(Game.dimensions.width / 2, pokiLogo.height);
            pokiLogo.inputEnabled = true;
            pokiLogo.input.useHandCursor = true;
            pokiLogo.events.onInputOver.add(function () {
                if (pokiLogo.scale.x == 1) {
                    pokiLogo.scale.setTo(1.2, 1.2);
                }
            });
            pokiLogo.events.onInputOut.add(function () {
                pokiLogo.scale.setTo(1, 1);
            });
            pokiLogo.events.onInputDown.add(function () {
                Game.analytics.event("Button", "PokiPreroll", "clicked");
                Game.openUrl("http://poki.com");
            }, this);
        };
        LoadUI.prototype._drawLoadingBar = function () {
            var preloadGroup = Game.game.add.group(), barWidth = Game.dimensions.width * .8;
            var background = Game.game.add.tileSprite(3, 0, barWidth - 3, Game.scale(206), "preroll", "load-bar-bg");
            preloadGroup.add(background);
            var bar = Game.game.add.tileSprite(3, 0, barWidth - 3, Game.scale(206), "preroll", "load-bar");
            preloadGroup.add(bar);
            bar.width = background.width = barWidth - Game.scale(60);
            bar.x = background.x = Game.scale(40);
            bar.y = background.y = Game.scale(36);
            var frameMiddle = Game.game.add.tileSprite(0, 0, 0, 0, "preroll", "load-frame-middle");
            preloadGroup.add(frameMiddle);
            var frameLeft = Game.game.add.sprite(0, 0, "preroll", "load-frame-left");
            preloadGroup.add(frameLeft);
            var frameRight = Game.game.add.sprite(0, 0, "preroll", "load-frame-right");
            preloadGroup.add(frameRight);
            frameLeft.x = 1;
            frameRight.x = barWidth - frameRight.width - 1;
            frameMiddle.x = frameLeft.width;
            frameMiddle.width = barWidth - frameLeft.width - frameRight.width;
            frameMiddle.height = Game.scale(276);
            preloadGroup.x = Game.dimensions.width * .1;
            preloadGroup.y = this._logo.bottom + Game.scale(150);
            this._fullBarWidth = bar.width;
            this._loadingBar = bar;
            util.Cleaner.addToDestroyQueue(preloadGroup, "LoadUI");
        };
        LoadUI.prototype.updateProgressBar = function (percentage) {
            this._percentageLoaded += percentage;
            this._loadingBar.width = this._fullBarWidth * this._percentageLoaded / 100;
        };
        LoadUI.destroy = function () {
            util.Cleaner.cleanupQueue("LoadUI");
        };
        return LoadUI;
    })();
    ui.LoadUI = LoadUI;
})(ui || (ui = {}));
var logic;
(function (logic) {
    var MobileControls = (function () {
        function MobileControls(player) {
            this._leftDown = false;
            this._rightDown = false;
            this._jumpDown = false;
            this._kickDown = false;
            this._buttonSize = new Phaser.Point(Game.scale(400), Game.scale(350));
            this._scale = 1.2;
            this.inputAllowed = true;
            this._leftButton = util.Sprite.createSprite(this._buttonSize.x, this._buttonSize.y, { r: 200, g: 0, b: 200 });
            this._leftButton.anchor.set(0, 1);
            this._leftButton.position.set(0, Game.dimensions.height);
            this._leftButton.alpha = 0;
            this._rightButton = util.Sprite.createSprite(this._buttonSize.x, this._buttonSize.y, { r: 0, g: 200, b: 200 });
            this._rightButton.anchor.set(0, 1);
            this._rightButton.position.set(this._leftButton.right, Game.dimensions.height);
            this._rightButton.alpha = 0;
            this._jumpButton = util.Sprite.createSprite(this._buttonSize.x, this._buttonSize.y, { r: 0, g: 0, b: 200 });
            this._jumpButton.anchor.set(1, 1);
            this._jumpButton.position.set(Game.dimensions.width, Game.dimensions.height);
            this._jumpButton.alpha = 0;
            this._kickButton = util.Sprite.createSprite(this._buttonSize.x, this._buttonSize.y, { r: 200, g: 0, b: 0 });
            this._kickButton.anchor.set(1, 1);
            this._kickButton.position.set(this._jumpButton.left, Game.dimensions.height);
            this._kickButton.alpha = 0;
            this._leftHighlightButton = Game.game.add.sprite(this._leftButton.left + this._leftButton.width * .5, this._leftButton.top + this._leftButton.height * .5, "ui", "mobi-move-down");
            this._leftHighlightButton.anchor.set(.5, .5);
            this._leftHighlightButton.scale.set(this._scale, this._scale);
            this._leftHighlightButton.scale.x *= -1;
            this._rightHighlightButton = Game.game.add.sprite(this._rightButton.left + this._rightButton.width * .5, this._rightButton.top + this._rightButton.height * .5, "ui", "mobi-move-down");
            this._rightHighlightButton.anchor.set(.5, .5);
            this._rightHighlightButton.scale.set(this._scale, this._scale);
            this._jumpHighlightButton = Game.game.add.sprite(this._jumpButton.left + this._jumpButton.width * .5, this._jumpButton.top + this._jumpButton.height * .5, "ui", "mobi-round-down");
            this._jumpHighlightButton.anchor.set(.5, .5);
            this._jumpHighlightButton.scale.set(this._scale, this._scale);
            this._kickHighlightButton = Game.game.add.sprite(this._kickButton.left + this._kickButton.width * .5, this._kickButton.top + this._kickButton.height * .5, "ui", "mobi-round-down");
            this._kickHighlightButton.anchor.set(.5, .5);
            this._kickHighlightButton.scale.set(this._scale, this._scale);
            this._leftDisplayButton = Game.game.add.sprite(this._leftButton.left + this._leftButton.width * .5, this._leftButton.top + this._leftButton.height * .5, "ui", "mobi-right");
            this._leftDisplayButton.anchor.set(.5, .5);
            this._leftDisplayButton.scale.set(this._scale, this._scale);
            this._leftDisplayButton.scale.x *= -1;
            this._rightDisplayButton = Game.game.add.sprite(this._rightButton.left + this._rightButton.width * .5, this._rightButton.top + this._rightButton.height * .5, "ui", "mobi-right");
            this._rightDisplayButton.anchor.set(.5, .5);
            this._rightDisplayButton.scale.set(this._scale, this._scale);
            this._jumpDisplayButton = Game.game.add.sprite(this._jumpButton.left + this._jumpButton.width * .5, this._jumpButton.top + this._jumpButton.height * .5, "ui", "mobi-jump");
            this._jumpDisplayButton.anchor.set(.5, .5);
            this._jumpDisplayButton.scale.set(this._scale, this._scale);
            this._kickDisplayButton = Game.game.add.sprite(this._kickButton.left + this._kickButton.width * .5, this._kickButton.top + this._kickButton.height * .5, "ui", "mob-shoot");
            this._kickDisplayButton.anchor.set(.5, .5);
            this._kickDisplayButton.scale.set(this._scale, this._scale);
            Game.state.fixedUiLayer.addMultiple([this._leftButton, this._rightButton, this._kickButton, this._jumpButton,
                this._leftDisplayButton, this._rightDisplayButton, this._kickDisplayButton, this._jumpDisplayButton]);
            this._player = player;
            this._setup();
        }
        MobileControls.prototype._setup = function () {
            var _this = this;
            this._leftButton.inputEnabled = true;
            this._leftButton.events.onInputOver.add(function () {
                _this._leftDown = true;
            });
            this._leftButton.events.onInputDown.add(function () {
                _this._leftDown = true;
            });
            this._leftButton.events.onInputOut.add(function () {
                _this._leftDown = false;
            });
            this._leftButton.events.onInputUp.add(function () {
                _this._leftDown = false;
            });
            this._rightButton.inputEnabled = true;
            this._rightButton.events.onInputOver.add(function () {
                _this._rightDown = true;
            });
            this._rightButton.events.onInputDown.add(function () {
                _this._rightDown = true;
            });
            this._rightButton.events.onInputOut.add(function () {
                _this._rightDown = false;
            });
            this._rightButton.events.onInputUp.add(function () {
                _this._rightDown = false;
            });
            this._jumpButton.inputEnabled = true;
            this._jumpButton.events.onInputDown.add(function () {
                if (_this.inputAllowed) {
                    _this._player.jump();
                }
                _this._jumpDown = true;
            });
            this._jumpButton.events.onInputUp.add(function () {
                _this._jumpDown = false;
            });
            this._kickButton.inputEnabled = true;
            this._kickButton.events.onInputDown.add(function () {
                if (_this.inputAllowed) {
                    _this._player.kick();
                }
                _this._kickDown = true;
            });
            this._kickButton.events.onInputUp.add(function () {
                _this._kickDown = false;
            });
        };
        MobileControls.prototype._doButtonHighlights = function () {
            this._leftHighlightButton.alpha = this._leftDown ? 1 : 0;
            this._rightHighlightButton.alpha = this._rightDown ? 1 : 0;
            this._jumpHighlightButton.alpha = this._jumpDown ? 1 : 0;
            this._kickHighlightButton.alpha = this._kickDown ? 1 : 0;
        };
        MobileControls.prototype.update = function () {
            this._doButtonHighlights();
            if (!this.inputAllowed) {
                this._player.idle();
                return;
            }
            if (this._leftDown && !this._rightDown) {
                this._player.moveLeft();
            }
            if (this._rightDown && !this._leftDown) {
                this._player.moveRight();
            }
            if (!this._leftDown && !this._rightDown) {
                this._player.idle();
            }
        };
        return MobileControls;
    })();
    logic.MobileControls = MobileControls;
})(logic || (logic = {}));
var ui;
(function (ui) {
    var PauseMenu = (function (_super) {
        __extends(PauseMenu, _super);
        function PauseMenu(visiblePosition, movefromPosition) {
            var _this = this;
            if (movefromPosition === void 0) { movefromPosition = null; }
            _super.call(this, Game.game);
            if (movefromPosition === null) {
                movefromPosition = new Phaser.Point(visiblePosition.x, visiblePosition.y - Game.dimensions.height);
            }
            this._moveFromPosition = movefromPosition;
            this._pauseBg = Game.game.add.sprite(0, 0, "ui", "gui-menu");
            this._pauseBg.anchor.set(.5, .5);
            this._hiddenCloseButton = Game.game.add.button(this._pauseBg.right, this._pauseBg.top);
            this._hiddenCloseButton.anchor.set(.5, .5);
            this._hiddenCloseButton.width = Game.scale(300);
            this._hiddenCloseButton.height = this._hiddenCloseButton.width;
            this._hiddenCloseButton.onInputUp.add(function () {
                _this._resume();
            });
            this.visible = true;
            Game.events.addListener("inGamePause", function () {
                _this.visible = true;
                Game.game.add.tween(_this.position).to({
                    x: visiblePosition.x,
                    y: visiblePosition.y
                }, 500, Phaser.Easing.Quadratic.Out, true);
            });
            this.position = movefromPosition.clone();
            this._soundButtons = new ui.SoundButtons();
            this._soundButtons.position.set(this._pauseBg.right - Game.scale(675), this._pauseBg.top + Game.scale(200));
            this._soundButtons.scale.set(1.2, 1.2);
            this._resumeButton = new ui.Button(new Phaser.Point(0, this._pauseBg.height * .5 - Game.scale(650)), "resume", "normal", Game.scale(100));
            this._resumeButton.onClick(function () {
                _this._resume();
            });
            this._quitButton = new ui.Button(new Phaser.Point(0, this._pauseBg.height * .5 - Game.scale(250)), "quit", "normal", Game.scale(100));
            this._quitButton.onClick(function () {
                new ui.QuestionDisplay("Are you sure?", function () {
                    Game.game.state.start("SplashState");
                }, function () {
                });
            });
            this.addMultiple([this._pauseBg, this._hiddenCloseButton, this._soundButtons, this._resumeButton, this._quitButton]);
        }
        PauseMenu.prototype._resume = function () {
            var _this = this;
            Game.events.trigger("inGameResume");
            util.Sound.playFx("crowd-loop", true);
            var tweenOut = Game.game.add.tween(this.position).to({
                x: this._moveFromPosition.x,
                y: this._moveFromPosition.y
            }, 500, Phaser.Easing.Quadratic.Out, true);
            tweenOut.onComplete.add(function () {
                _this.visible = false;
            });
        };
        return PauseMenu;
    })(Phaser.Group);
    ui.PauseMenu = PauseMenu;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var PlayerIcon = (function (_super) {
        __extends(PlayerIcon, _super);
        function PlayerIcon(spriteKey, orientationFactor) {
            if (orientationFactor === void 0) { orientationFactor = 1; }
            _super.call(this, Game.game);
            this._headRelativePosition = new Phaser.Point(Game.scale(0), Game.scale(110));
            this._headScale = new Phaser.Point(1, 1);
            this._leftShoeRelativePosition = new Phaser.Point(Game.scale(65), Game.scale(260));
            this._leftShoeScale = new Phaser.Point(1, 1);
            this._rightShoeRelativePosition = new Phaser.Point(Game.scale(-45), Game.scale(260));
            this._rightShoeScale = new Phaser.Point(1, 1);
            this._leftArmRelativePosition = new Phaser.Point(Game.scale(175), Game.scale(170));
            this._leftArmScale = new Phaser.Point(1, 1);
            this._rightArmRelativePosition = new Phaser.Point(Game.scale(-195), Game.scale(170));
            this._rightArmScale = new Phaser.Point(1, 1);
            this._headAngle = 0;
            this._leftShoeAngle = 0;
            this._rightShoeAngle = 0;
            this._leftArmAngle = 0;
            this._rightArmAngle = 0;
            this._playerScale = 1;
            this._characterString = spriteKey;
            this._build();
            this._doPositioning(orientationFactor);
        }
        PlayerIcon.prototype._build = function () {
            this._leftArm = Game.game.add.sprite(0, 0, "character", this._characterString + "-hand-back", this);
            this._leftArm.anchor.set(.5, .5);
            this._leftShoe = Game.game.add.sprite(0, 0, "character", this._characterString + "-foot", this);
            this._leftShoe.anchor.set(.5, .5);
            this._head = Game.game.add.sprite(0, 0, "character", this._characterString + "-head", this);
            this._head.anchor.set(.5, .8);
            this._rightShoe = Game.game.add.sprite(0, 0, "character", this._characterString + "-foot", this);
            this._rightShoe.anchor.set(.5, .5);
            this._rightArm = Game.game.add.sprite(0, 0, "character", this._characterString + "-hand-front", this);
            this._rightArm.anchor.set(.5, .5);
        };
        PlayerIcon.prototype._doPositioning = function (orientationFactor) {
            this._leftArm.position.set(this.x + this._leftArmRelativePosition.x * this._playerScale * orientationFactor, this.y + this._leftArmRelativePosition.y * this._playerScale);
            this._leftArm.angle = this._leftArmAngle * orientationFactor;
            this._leftArm.scale.set(this._leftArmScale.x * this._playerScale * orientationFactor, this._leftArmScale.y * this._playerScale);
            this._rightArm.position.set(this.x + this._rightArmRelativePosition.x * this._playerScale * orientationFactor, this.y + this._rightArmRelativePosition.y * this._playerScale);
            this._rightArm.angle = this._rightArmAngle * orientationFactor;
            this._rightArm.scale.set(this._rightArmScale.x * this._playerScale * orientationFactor, this._rightArmScale.y * this._playerScale);
            this._head.position.set(this.x + this._headRelativePosition.x * this._playerScale * orientationFactor, this.y + this._headRelativePosition.y * this._playerScale);
            this._head.angle = this._headAngle * orientationFactor;
            this._leftShoe.position.set(this.x + this._leftShoeRelativePosition.x * this._playerScale * orientationFactor, this.y + this._leftShoeRelativePosition.y * this._playerScale);
            this._leftShoe.scale.set(this._leftShoeScale.x * this._playerScale * orientationFactor, this._leftShoeScale.y * this._playerScale);
            this._rightShoe.position.set(this.x + this._rightShoeRelativePosition.x * this._playerScale * orientationFactor, this.y + this._rightShoeRelativePosition.y * this._playerScale);
            this._rightShoe.scale.set(this._rightShoeScale.x * this._playerScale * orientationFactor, this._rightShoeScale.y * this._playerScale);
        };
        PlayerIcon.prototype.changeCharacter = function (characterString) {
            this._characterString = characterString;
            this._leftArm.frameName = this._characterString + "-hand-back";
            this._rightArm.frameName = this._characterString + "-hand-front";
            this._leftShoe.frameName = this._characterString + "-foot";
            this._rightShoe.frameName = this._characterString + "-foot";
            this._head.frameName = this._characterString + "-head";
        };
        return PlayerIcon;
    })(Phaser.Group);
    ui.PlayerIcon = PlayerIcon;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var PlayerSelector = (function (_super) {
        __extends(PlayerSelector, _super);
        function PlayerSelector(position, isAI) {
            if (isAI === void 0) { isAI = false; }
            _super.call(this, Game.game);
            this.selected = false;
            this._isAI = isAI;
            this._background = Game.game.add.sprite(0, 0, "ui", "player-select", Game.state.frontLayer);
            this._background.anchor.set(.5, .5);
            this._player = new ui.PlayerIcon("aguero");
            this._player.scale.set(.55, .55);
            this._player.position.y -= Game.scale(250);
            this.position = position;
            this.addMultiple([this._background, this._player]);
            if (Game.game.device.desktop || isAI) {
                this.controlsIndicator = new ui.ControlsIndicator(new Phaser.Point(0, Game.scale(175)), isAI, 0);
                this.add(this.controlsIndicator);
            }
        }
        PlayerSelector.prototype.setPlayer = function (player) {
            this._spriteKey = player;
            this._player.changeCharacter(this._spriteKey);
        };
        PlayerSelector.prototype.getPlayer = function () {
            return this._spriteKey;
        };
        return PlayerSelector;
    })(Phaser.Group);
    ui.PlayerSelector = PlayerSelector;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var QuestionDisplay = (function (_super) {
        __extends(QuestionDisplay, _super);
        function QuestionDisplay(question, positiveCallback, negativeCallback, positiveAnswer, negativeAnswer, canBeClickedOutisde) {
            var _this = this;
            if (positiveAnswer === void 0) { positiveAnswer = "YES"; }
            if (negativeAnswer === void 0) { negativeAnswer = "NO"; }
            if (canBeClickedOutisde === void 0) { canBeClickedOutisde = false; }
            _super.call(this, Game.game);
            if (!this._questionDisplayOverlay) {
                this._questionDisplayOverlay = Game.game.add.existing(util.Sprite.createSprite(Game.dimensions.width, Game.dimensions.height, { r: 0, g: 0, b: 0 }));
                this._questionDisplayOverlay.alpha = .5;
                this._questionDisplayOverlay.visible = false;
                Game.state.uiLayer.add(this._questionDisplayOverlay);
            }
            this._questionDisplayOverlay.visible = true;
            this._flashText = new ui.FlashText();
            var position = new Phaser.Point(0, Game.dimensions.height / 2 + Game.scale(300));
            if (!this._positiveButton) {
                this._positiveButton = new ui.Button(position, positiveAnswer, "normal", Game.scale(90));
            }
            else {
                this._positiveButton.setText(positiveAnswer);
                this._positiveButton.clearClick();
            }
            if (!this._negativeButton) {
                this._negativeButton = new ui.Button(position, negativeAnswer, "normal", Game.scale(90));
            }
            else {
                this._negativeButton.setText(negativeAnswer);
                this._negativeButton.clearClick();
            }
            util.PositionHelper.centerHorizontally([this._negativeButton, this._positiveButton], Game.scale(100));
            this._negativeButton.visible = false;
            this._positiveButton.visible = false;
            var hideTextFn = this._flashText.flashText(question, true, function () {
                _this._negativeButton.visible = true;
                _this._positiveButton.visible = true;
            });
            this._negativeButton.onClick(function () {
                _this._negativeButton.visible = false;
                _this._positiveButton.visible = false;
                _this._negativeButton.x = Game.dimensions.width * 1.5;
                _this._positiveButton.x = Game.dimensions.width * 1.5;
                _this._questionDisplayOverlay.visible = false;
                hideTextFn();
                _this.destroy(true);
                negativeCallback();
            });
            this._positiveButton.onClick(function () {
                _this._negativeButton.visible = false;
                _this._positiveButton.visible = false;
                _this._negativeButton.x = Game.dimensions.width * 1.5;
                _this._positiveButton.x = Game.dimensions.width * 1.5;
                _this._questionDisplayOverlay.visible = false;
                hideTextFn();
                _this.destroy(true);
                positiveCallback();
            });
            if (canBeClickedOutisde) {
                this._questionDisplayOverlay.inputEnabled = true;
                this._questionDisplayOverlay.events.onInputUp.add(function () {
                    hideTextFn();
                    _this.destroy(true);
                });
            }
            this.addMultiple([this._questionDisplayOverlay, this._flashText, this._negativeButton, this._positiveButton]);
        }
        return QuestionDisplay;
    })(Phaser.Group);
    ui.QuestionDisplay = QuestionDisplay;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var RoundButton = (function (_super) {
        __extends(RoundButton, _super);
        function RoundButton(content, clickCallback) {
            _super.call(this, Game.game);
            this._button = Game.game.add.button(0, 0, "ui", function () { clickCallback(); }, this, "button-down", "button-up", "button-down");
            this._button.anchor.set(.5, .5);
            var maxContentDimension = Math.max(content.width, content.height), scaleFactor = this._button.width * .5 / maxContentDimension;
            this.add(this._button);
            content.anchor.set(.5, .5);
            content.scale.set(scaleFactor, scaleFactor);
            this.add(content);
        }
        return RoundButton;
    })(Phaser.Group);
    ui.RoundButton = RoundButton;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var Selector = (function (_super) {
        __extends(Selector, _super);
        function Selector(leftArrowPosition, rightArrowPosition, list) {
            var _this = this;
            _super.call(this, Game.game);
            this.index = 0;
            this._onChangeCallbacks = [];
            this._onCycleCallbacks = [];
            this.list = list;
            this._arrowLeft = Game.game.add.button(leftArrowPosition.x, leftArrowPosition.y, "ui", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                util.Sound.playFx("button");
                _this.index--;
                if (_this.index < 0) {
                    _this.index = _this.list.length - 1;
                    _this.fireCycle(true);
                }
                _this.fireChange();
            }, this, "arrow-down", "arrow-up", "arrow-up");
            this._arrowLeft.scale.x *= -1;
            this._arrowLeft.anchor.set(.5, .5);
            this._arrowRight = Game.game.add.button(rightArrowPosition.x, rightArrowPosition.y, "ui", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                util.Sound.playFx("button");
                _this.index++;
                if (_this.index >= _this.list.length) {
                    _this.index = 0;
                    _this.fireCycle(false);
                }
                _this.fireChange();
            }, this, "arrow-down", "arrow-up", "arrow-up");
            this._arrowRight.anchor.set(.5, .5);
            this.addMultiple([this._arrowLeft, this._arrowRight]);
        }
        Selector.prototype.onChange = function (callback) {
            this._onChangeCallbacks.push(callback);
        };
        Selector.prototype.onCycle = function (callback) {
            this._onCycleCallbacks.push(callback);
        };
        Selector.prototype.fireChange = function () {
            for (var i = 0; i < this._onChangeCallbacks.length; i++) {
                this._onChangeCallbacks[i](this.list[this.index], this.index);
            }
        };
        Selector.prototype.fireCycle = function (isLeft) {
            for (var i = 0; i < this._onCycleCallbacks.length; i++) {
                this._onCycleCallbacks[i](isLeft);
            }
        };
        return Selector;
    })(Phaser.Group);
    ui.Selector = Selector;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var SoundButtons = (function (_super) {
        __extends(SoundButtons, _super);
        function SoundButtons() {
            _super.call(this, Game.game);
            var soundIcon = Game.game.add.sprite(0, 0, "icons", util.Sound.soundMuted ? "icon-soundoff" : "icon-sound"), soundButton = new ui.RoundButton(soundIcon, function () {
                if (util.Sound.soundMuted) {
                    soundIcon.frameName = "icon-sound";
                    util.Sound.unMuteSounds();
                }
                else {
                    soundIcon.frameName = "icon-soundoff";
                    util.Sound.muteSounds();
                }
            });
            soundButton.position.set(-Game.scale(125), soundButton.height / 2);
            var musicIcon = Game.game.add.sprite(0, 0, "icons", util.Sound.musicMuted ? "icon-music-off" : "icon-music"), musicButton = new ui.RoundButton(musicIcon, function () {
                if (util.Sound.musicMuted) {
                    musicIcon.frameName = "icon-music";
                    util.Sound.unMuteMusic();
                }
                else {
                    musicIcon.frameName = "icon-music-off";
                    util.Sound.muteMusic();
                }
            });
            musicButton.position.set(Game.scale(125), soundButton.y);
            this.addMultiple([soundButton, musicButton]);
        }
        return SoundButtons;
    })(Phaser.Group);
    ui.SoundButtons = SoundButtons;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var TeamAndDoublePlayerSelector = (function (_super) {
        __extends(TeamAndDoublePlayerSelector, _super);
        function TeamAndDoublePlayerSelector(title, isAI, controlsOffset, scaling, noswitch, forcedPlayerIndexes) {
            var _this = this;
            if (isAI === void 0) { isAI = false; }
            if (controlsOffset === void 0) { controlsOffset = 0; }
            if (scaling === void 0) { scaling = .65; }
            if (noswitch === void 0) { noswitch = false; }
            if (forcedPlayerIndexes === void 0) { forcedPlayerIndexes = []; }
            _super.call(this, Game.game);
            this.switched = false;
            this._spacing = Game.scale(310);
            this._controlOffset = controlsOffset;
            this._scaling = scaling;
            var text = Game.game.add.bitmapText(0, -Game.dimensions.height * .06 * this._scaling, "normal", title.toUpperCase().charAt(0) + title.toLocaleLowerCase().substring(1), Game.scale(100));
            text.anchor.set(.5, 1);
            text.align = "center";
            this._playerDisplays = [];
            this._playerDisplays.push(new ui.PlayerSelector(new Phaser.Point(-this._spacing * this._scaling, Game.dimensions.height * .15 * this._scaling), isAI));
            this._playerDisplays.push(new ui.PlayerSelector(new Phaser.Point(this._spacing * this._scaling, Game.dimensions.height * .15 * this._scaling), isAI));
            this._playerDisplays[0].scale.set(this._scaling, this._scaling);
            this._playerDisplays[1].scale.set(this._scaling, this._scaling);
            this._teamSelector = new ui.TeamSelector(new Phaser.Point(0, -Game.dimensions.height * .175), 0);
            this.selectedTeam = this._teamSelector.getCurrentSelectedTeam();
            this._teamSelector.onChangeTeam(function (team) {
                _this.selectedTeam = team;
                var list = Object.keys(_this.selectedTeam["players"]);
                _this.selectedPlayers = [_this.selectedTeam["players"][list[0]], _this.selectedTeam["players"][list[1]]];
                _this._playerDisplays[0].setPlayer(_this.selectedPlayers[0]);
                _this._playerDisplays[1].setPlayer(_this.selectedPlayers[1]);
            });
            var list = Object.keys(this.selectedTeam["players"]);
            this.selectedPlayers = [this.selectedTeam["players"][list[0]], this.selectedTeam["players"][list[1]]];
            this._playerDisplays[0].setPlayer(this.selectedPlayers[0]);
            this._playerDisplays[1].setPlayer(this.selectedPlayers[1]);
            this.addMultiple(this._playerDisplays);
            this.addMultiple([this._teamSelector, text]);
            if (!isAI && !noswitch && Game.game.device.desktop) {
                var switchIcon = Game.game.add.sprite(0, 0, "icons", "icon-switch");
                switchIcon.anchor.set(.5, .5);
                var switchButton = new ui.RoundButton(switchIcon, function () {
                    _this.switched = !_this.switched;
                    _this._updatePlayerControlDisplays();
                });
                switchButton.position.set(0, Game.scale(450));
                switchButton.scale.set(.8, .8);
                this.add(switchButton);
            }
            if (!isAI) {
                this._updatePlayerControlDisplays(forcedPlayerIndexes);
            }
        }
        TeamAndDoublePlayerSelector.prototype._updatePlayerControlDisplays = function (forcedPlayerIndexes) {
            if (forcedPlayerIndexes === void 0) { forcedPlayerIndexes = []; }
            if (!this._playerDisplays[0].controlsIndicator ||
                !this._playerDisplays[1].controlsIndicator) {
                return;
            }
            if (forcedPlayerIndexes.length == 2) {
                this._playerDisplays[0].controlsIndicator.setControls(forcedPlayerIndexes[0], false);
                this._playerDisplays[1].controlsIndicator.setControls(forcedPlayerIndexes[1], false);
            }
            else {
                if (this.switched) {
                    this._playerDisplays[0].controlsIndicator.setControls(this._controlOffset + 1, false);
                    this._playerDisplays[1].controlsIndicator.setControls(this._controlOffset, false);
                }
                else {
                    this._playerDisplays[0].controlsIndicator.setControls(this._controlOffset, false);
                    this._playerDisplays[1].controlsIndicator.setControls(this._controlOffset + 1, false);
                }
            }
        };
        TeamAndDoublePlayerSelector.prototype.getAILevels = function () {
            if (this._playerDisplays[0].controlsIndicator.isAI() && this._playerDisplays[1].controlsIndicator.isAI()) {
                return [
                    this._playerDisplays[0].controlsIndicator.getAILevel(),
                    this._playerDisplays[1].controlsIndicator.getAILevel()
                ];
            }
            else {
                return null;
            }
        };
        TeamAndDoublePlayerSelector.prototype.randomize = function () {
            this._teamSelector.randomizeTeam();
        };
        return TeamAndDoublePlayerSelector;
    })(Phaser.Group);
    ui.TeamAndDoublePlayerSelector = TeamAndDoublePlayerSelector;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var TeamAndSinglePlayerSelector = (function (_super) {
        __extends(TeamAndSinglePlayerSelector, _super);
        function TeamAndSinglePlayerSelector(title, isAI, controlIndex, noswitch) {
            var _this = this;
            if (isAI === void 0) { isAI = false; }
            if (controlIndex === void 0) { controlIndex = 0; }
            if (noswitch === void 0) { noswitch = false; }
            _super.call(this, Game.game);
            this.switched = false;
            this._arrowMargin = Game.scale(220);
            this.controlIndex = controlIndex;
            var text = Game.game.add.bitmapText(0, -Game.dimensions.height * .06, "normal", title.toUpperCase().charAt(0) + title.toLocaleLowerCase().substring(1), Game.scale(100));
            text.anchor.set(.5, 1);
            text.align = "center";
            this._teamSelector = new ui.TeamSelector(new Phaser.Point(0, -Game.dimensions.height * .175), 0);
            this.selectedTeam = this._teamSelector.getCurrentSelectedTeam();
            this._teamSelector.onChangeTeam(function (team) {
                _this.selectedTeam = team;
                selector.list = Object.keys(_this.selectedTeam["players"]);
                _this.selectedPlayer = _this.selectedTeam["players"][selector.list[0]];
                _this._playerDisplay.setPlayer(_this.selectedTeam["players"][selector.list[0]]);
            });
            this._playerDisplay = new ui.PlayerSelector(new Phaser.Point(0, Game.dimensions.height * .15), isAI);
            if (typeof this._playerDisplay.controlsIndicator !== "undefined") {
                this._playerDisplay.controlsIndicator.setControls(controlIndex, isAI);
            }
            var selector = new ui.Selector(new Phaser.Point(-this._arrowMargin, this._playerDisplay.y - Game.scale(180)), new Phaser.Point(this._arrowMargin, this._playerDisplay.y - Game.scale(180)), this.selectedTeam["players"]);
            selector.list = this.selectedTeam["players"];
            selector.onChange(function (item) {
                _this.selectedPlayer = _this.selectedTeam["players"][item];
                _this._playerDisplay.setPlayer(_this.selectedPlayer);
            });
            selector.onCycle(function (isLeft) {
                if (isLeft) {
                    _this._teamSelector.back();
                }
                else {
                    _this._teamSelector.forward();
                }
                selector.index = isLeft ? 1 : 0;
                selector.fireChange();
            });
            this.selectedPlayer = this.selectedTeam["players"][0];
            this._playerDisplay.setPlayer(this.selectedPlayer);
            this.addMultiple([this._teamSelector, this._playerDisplay, selector, text]);
            if (!isAI && !noswitch && Game.game.device.desktop) {
                var switchIcon = Game.game.add.sprite(0, 0, "icons", "icon-switch");
                switchIcon.anchor.set(.5, .5);
                var switchButton = new ui.RoundButton(switchIcon, function () {
                    _this.switched = !_this.switched;
                    _this._updatePlayerControlDisplays();
                });
                switchButton.position.set(0, Game.scale(700));
                switchButton.scale.set(.8, .8);
                this.add(switchButton);
            }
            if (!isAI) {
                this._updatePlayerControlDisplays();
            }
        }
        TeamAndSinglePlayerSelector.prototype._updatePlayerControlDisplays = function () {
            if (!this._playerDisplay.controlsIndicator) {
                return;
            }
            if (this.switched) {
                this._playerDisplay.controlsIndicator.setControls(this.controlIndex + 1, false);
            }
            else {
                this._playerDisplay.controlsIndicator.setControls(this.controlIndex, false);
            }
        };
        TeamAndSinglePlayerSelector.prototype.getAILevel = function () {
            if (this._playerDisplay.controlsIndicator.isAI()) {
                return this._playerDisplay.controlsIndicator.getAILevel();
            }
            else {
                return null;
            }
        };
        TeamAndSinglePlayerSelector.prototype.randomize = function () {
            this._teamSelector.randomizeTeam();
        };
        return TeamAndSinglePlayerSelector;
    })(Phaser.Group);
    ui.TeamAndSinglePlayerSelector = TeamAndSinglePlayerSelector;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var TeamSelector = (function (_super) {
        __extends(TeamSelector, _super);
        function TeamSelector(position, selectorOffset) {
            var _this = this;
            if (selectorOffset === void 0) { selectorOffset = 0; }
            _super.call(this, Game.game);
            this._changedTeamCallbacks = [];
            this._currentIndex = 0;
            this._teamdata = Game.game.cache.getJSON("teamdata")["teams"];
            this._teamBackground = Game.game.add.sprite(0, 0, "ui", "team-logo-bg");
            this._teamBackground.scale.set(.6, .6);
            this._currentIndex = selectorOffset;
            this._arrowLeft = Game.game.add.button(0, 0, "ui", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                util.Sound.playFx("button");
                _this.back();
            }, this, "arrow-down", "arrow-up", "arrow-up");
            this._arrowLeft.scale.x = -1;
            this._arrowLeft.anchor.set(.5, .5);
            this._arrowRight = Game.game.add.button(0, 0, "ui", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                util.Sound.playFx("button");
                _this.forward();
            }, this, "arrow-down", "arrow-up", "arrow-up");
            this._arrowRight.anchor.set(.5, .5);
            this._teamIndicator = Game.game.add.sprite(0, 0, "teams", "teamlogo-" + this._getTeamKeyByIndex(selectorOffset));
            this._setTeam(selectorOffset, false, true);
            this.addMultiple([this._teamBackground, this._arrowLeft, this._arrowRight, this._teamIndicator]);
            this.position = position;
            this._doPositioning();
        }
        TeamSelector.prototype.back = function () {
            this._currentIndex--;
            if (this._currentIndex < 0) {
                this._currentIndex = this._getTotalTeams() - 1;
            }
            this._setTeam(this._currentIndex, true);
        };
        TeamSelector.prototype.forward = function () {
            this._currentIndex++;
            if (this._currentIndex >= this._getTotalTeams()) {
                this._currentIndex = 0;
            }
            this._setTeam(this._currentIndex, false);
        };
        TeamSelector.prototype.onChangeTeam = function (callback) {
            this._changedTeamCallbacks.push(callback);
        };
        TeamSelector.prototype.randomizeTeam = function () {
            var randomIndex = Math.floor(Math.random() * this._getTotalTeams());
            this._setTeam(randomIndex, false, true);
        };
        TeamSelector.prototype._getTotalTeams = function () {
            if (this._totalTeams)
                return this._totalTeams;
            return this._totalTeams = Object.keys(this._teamdata).length;
        };
        TeamSelector.prototype._getTeamByIndex = function (index) {
            var key = this._getTeamKeyByIndex(index);
            if (key !== null) {
                return this._teamdata[key];
            }
            return null;
        };
        TeamSelector.prototype._getTeamKeyByIndex = function (index) {
            try {
                return Object.keys(this._teamdata)[index];
            }
            catch (e) {
                return null;
            }
        };
        TeamSelector.prototype._getTeamByKey = function (key) {
            return this._teamdata[key];
        };
        TeamSelector.prototype._fireChangeTeam = function () {
            for (var i = 0; i < this._changedTeamCallbacks.length; i++) {
                this._changedTeamCallbacks[i](this._currentTeamData);
            }
        };
        TeamSelector.prototype.getCurrentSelectedTeam = function () {
            return this._currentTeamData;
        };
        TeamSelector.prototype.setPosition = function (position) {
            this.position = position;
            this._doPositioning();
        };
        TeamSelector.prototype.hide = function () {
            this.disable();
            this._teamBackground.destroy();
            this._teamIndicator.destroy();
        };
        TeamSelector.prototype._doPositioning = function () {
            this._teamBackground.anchor.set(.5, .5);
            this._teamIndicator.anchor.set(.5, .5);
            this._arrowLeft.position.set(-this._teamBackground.width * .7, 0);
            this._arrowRight.position.set(this._teamBackground.width * .7, 0);
        };
        TeamSelector.prototype._setTeam = function (index, animateLeft, instantly) {
            var _this = this;
            if (animateLeft === void 0) { animateLeft = true; }
            if (instantly === void 0) { instantly = false; }
            this._currentTeam = this._getTeamKeyByIndex(index);
            this._currentTeamData = this._getTeamByIndex(index);
            if (instantly) {
                this._setIndicatorFrame(this._currentTeam);
                this._fireChangeTeam();
            }
            else {
                if (animateLeft) {
                    this._fireChangeTeam();
                    this._animateLeft(function () {
                        _this._setIndicatorFrame(_this._currentTeam);
                    });
                }
                else {
                    this._fireChangeTeam();
                    this._animateRight(function () {
                        _this._setIndicatorFrame(_this._currentTeam);
                    });
                }
            }
        };
        TeamSelector.prototype.disable = function () {
            this._arrowLeft.destroy();
            this._arrowRight.destroy();
        };
        TeamSelector.prototype._setIndicatorFrame = function (frame) {
            this._teamIndicator.frameName = "teamlogo-" + frame;
        };
        TeamSelector.prototype._animateLeft = function (callback) {
            var _this = this;
            var tween = Game.game.add.tween(this._teamIndicator).to({
                x: this._teamBackground.left,
                alpha: .1
            }, 200, Phaser.Easing.Quadratic.Out, true);
            Game.game.add.tween(this._teamIndicator.scale).to({
                x: 0.001,
                y: 0.001
            }, 200, Phaser.Easing.Quadratic.Out, true);
            tween.onComplete.add(function () {
                if (callback) {
                    callback();
                }
                _this._teamIndicator.x = _this._teamBackground.right;
                Game.game.add.tween(_this._teamIndicator.scale).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.Quadratic.Out, true);
                Game.game.add.tween(_this._teamIndicator).to({
                    x: _this._teamBackground.x,
                    alpha: 1
                }, 200, Phaser.Easing.Quadratic.Out, true);
            });
        };
        TeamSelector.prototype._animateRight = function (callback) {
            var _this = this;
            var tween = Game.game.add.tween(this._teamIndicator).to({
                x: this._teamBackground.right,
                alpha: .1
            }, 200, Phaser.Easing.Quadratic.Out, true);
            Game.game.add.tween(this._teamIndicator.scale).to({
                x: 0.001,
                y: 0.001
            }, 200, Phaser.Easing.Quadratic.Out, true);
            tween.onComplete.add(function () {
                if (callback) {
                    callback();
                }
                _this._teamIndicator.x = _this._teamBackground.left;
                Game.game.add.tween(_this._teamIndicator.scale).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.Quadratic.Out, true);
                Game.game.add.tween(_this._teamIndicator).to({
                    x: _this._teamBackground.x,
                    alpha: 1
                }, 200, Phaser.Easing.Quadratic.Out, true);
            });
        };
        return TeamSelector;
    })(Phaser.Group);
    ui.TeamSelector = TeamSelector;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var TourneyGameDisplay = (function (_super) {
        __extends(TourneyGameDisplay, _super);
        function TourneyGameDisplay(tourneyGame, spacing, isPlayer) {
            if (spacing === void 0) { spacing = 0; }
            if (isPlayer === void 0) { isPlayer = false; }
            _super.call(this, Game.game);
            this._isBlinking = false;
            this._tourneyGame = tourneyGame;
            var teams = tourneyGame.getTeams();
            this._teamOneBackground = Game.game.add.sprite(0, 0, "ui", "tour-score-menu" + (isPlayer ? "-player" : ""));
            this._teamOneBackground.anchor.set(.5, .5);
            this._teamTwoBackground = Game.game.add.sprite(0, 0, "ui", "tour-score-menu");
            this._teamTwoBackground.anchor.set(.5, .5);
            var teamOneY = -Game.scale(5) - this._teamOneBackground.height / 2 - spacing / 2;
            var teamTwoY = Game.scale(5) + this._teamOneBackground.height / 2 + spacing / 2;
            this._teamOneBackground.y = teamOneY;
            this._teamTwoBackground.y = teamTwoY;
            if (teams !== null || typeof teams === "undefined") {
                this._teamOneLogo = Game.game.add.sprite(Game.scale(-100), teamOneY, "teams", "teamlogo-" + teams[0]["sprite-key"]);
                this._teamTwoLogo = Game.game.add.sprite(Game.scale(-100), teamTwoY, "teams", "teamlogo-" + teams[1]["sprite-key"]);
            }
            else {
                this._teamOneLogo = Game.game.add.sprite(Game.scale(-100), teamOneY, "teams", "teamlogo-unknown");
                this._teamTwoLogo = Game.game.add.sprite(Game.scale(-100), teamTwoY, "teams", "teamlogo-unknown");
            }
            this._teamTwoLogo.anchor.set(.5, .5);
            this._teamTwoLogo.scale.set(.8, .8);
            this._teamOneLogo.anchor.set(.5, .5);
            this._teamOneLogo.scale.set(.8, .8);
            this._teamOneScore = Game.game.add.bitmapText(Game.scale(100), teamOneY, "digital-time-tourney", "", Game.scale(100));
            this._teamOneScore.anchor.set(.5, .5);
            this._teamTwoScore = Game.game.add.bitmapText(Game.scale(100), teamTwoY, "digital-time-tourney", "", Game.scale(100));
            this._teamTwoScore.anchor.set(.5, .5);
            var arrow = Game.game.add.sprite(this._teamOneBackground.right + Game.scale(50), 0, "ui", "tourney-arrow");
            arrow.scale.setTo(.5, .5);
            arrow.anchor.y = .5;
            this.add(this._teamOneBackground);
            this.add(this._teamTwoBackground);
            this.add(this._teamOneLogo);
            this.add(this._teamTwoLogo);
            this.add(this._teamOneScore);
            this.add(this._teamTwoScore);
            this.add(arrow);
            Game.state.frontLayer.add(this);
            this.refresh();
            if (isPlayer && !this._tourneyGame.gameFinished) {
                this.doBlinkAnimation();
            }
        }
        TourneyGameDisplay.prototype.setBackgroundAlpha = function (value) {
            this._teamOneBackground.alpha = value;
            this._teamTwoBackground.alpha = value;
        };
        TourneyGameDisplay.prototype.doBlinkAnimation = function () {
            var _this = this;
            if (this._isBlinking)
                return;
            this._isBlinking = true;
            var blinks = 8;
            for (var i = 0; i < blinks; i++) {
                setTimeout(function () {
                    if (_this._teamOneBackground.frameName === "tour-score-menu") {
                        _this._teamOneBackground.frameName = "tour-score-menu-player";
                    }
                    else {
                        _this._teamOneBackground.frameName = "tour-score-menu";
                    }
                }, 200 + i * 200);
            }
        };
        TourneyGameDisplay.prototype.refresh = function () {
            var teams = this._tourneyGame.getTeams();
            if (teams !== null) {
                this._teamOneLogo.frameName = "teamlogo-" + teams[0]["sprite-key"];
                this._teamTwoLogo.frameName = "teamlogo-" + teams[1]["sprite-key"];
            }
            else {
                this._teamOneLogo.frameName = "teamlogo-unknown";
                this._teamTwoLogo.frameName = "teamlogo-unknown";
            }
            if (this._tourneyGame.gameFinished) {
                this._teamOneScore.text = this._tourneyGame.score[0] + "";
                this._teamTwoScore.text = this._tourneyGame.score[1] + "";
            }
            else {
                this._teamOneScore.text = "";
                this._teamTwoScore.text = "";
            }
        };
        return TourneyGameDisplay;
    })(Phaser.Group);
    ui.TourneyGameDisplay = TourneyGameDisplay;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var TourneyUI = (function (_super) {
        __extends(TourneyUI, _super);
        function TourneyUI() {
            var _this = this;
            _super.call(this, Game.game);
            this._gameDisplays = [];
            var roundGroups = [];
            var padding, spacing;
            logic.TourneyHandler.forEachRoundAndGame(function (game, roundIndex, gameIndex) {
                var currentGroup = roundGroups[roundIndex];
                if (currentGroup == null) {
                    currentGroup = Game.game.add.group();
                }
                roundGroups[roundIndex] = currentGroup;
                if (typeof _this._gameDisplays[roundIndex] === "undefined") {
                    _this._gameDisplays[roundIndex] = [];
                }
                var isPlayer = logic.TourneyHandler.getCurrentGameIndexForSelectedTeam() == gameIndex && roundIndex <= logic.TourneyHandler.currentRoundIndex;
                padding = (roundIndex == 1 ? Game.scale(10) : Game.scale(120));
                spacing = (Game.scale(171) + padding) * roundIndex;
                var display = new ui.TourneyGameDisplay(game, spacing, isPlayer);
                display.setBackgroundAlpha(.4);
                if (roundIndex == logic.TourneyHandler.currentRoundIndex) {
                    display.setBackgroundAlpha(1);
                }
                _this._gameDisplays[roundIndex][gameIndex] = display;
                currentGroup.add(display);
            });
            var positionBounds = Phaser.Rectangle.clone(Game.game.world.bounds);
            positionBounds.height -= (Game.scale(300));
            positionBounds.width -= (Game.scale(300));
            this._trophy = new Phaser.Sprite(Game.game, 0, 0, "ui", "trophy-small");
            this._trophy.anchor.set(0, .5);
            this._trophy.scale.set(1.3, 1.3);
            util.PositionHelper.centerVertically([this._trophy], 0, positionBounds);
            Object.keys(this._gameDisplays).forEach(function (roundIndex) {
                if (roundIndex == "0") {
                    util.PositionHelper.centerVertically(_this._gameDisplays[roundIndex], Game.scale(20), positionBounds);
                }
                else {
                    _this._gameDisplays[roundIndex].forEach(function (display, idx) {
                        positionBounds = new Phaser.Rectangle(Game.dimensions.width, Game.dimensions.height, 0, 0);
                        var bottom = 0;
                        _this._gameDisplays[parseInt(roundIndex, 10) - 1].forEach(function (_display, _idx) {
                            if (idx * 2 == _idx || idx * 2 + 1 == _idx) {
                                positionBounds.x = Math.min(positionBounds.x, _display.x - _display.width / 2);
                                positionBounds.y = Math.min(positionBounds.y, _display.y - _display.height / 2);
                                bottom = Math.max(bottom, _display.y + _display.height / 2);
                            }
                        });
                        positionBounds.height = bottom - positionBounds.y;
                        util.PositionHelper.centerVertically([_this._gameDisplays[roundIndex][idx]], Game.scale(20), positionBounds);
                    });
                }
            });
            var positionArray = roundGroups;
            positionArray.push(this._trophy);
            util.PositionHelper.centerHorizontally(positionArray, Game.scale(70));
            this.add(this._trophy);
            this.addMultiple(roundGroups);
        }
        TourneyUI.prototype.doTeamLogoAnimation = function (team) {
            util.Sound.playFx("crowd-goal");
            this._trophy.scale.x *= -1;
            this._trophy.anchor.set(.5, .5);
            this._trophy.x += Game.scale(300);
            var teamLogoSprite = Game.game.add.sprite(this._trophy.x, this._trophy.y - Game.scale(800), "teams", "teamlogo-" + team["sprite-key"], Game.state.uiLayer);
            teamLogoSprite.anchor.set(.5, .5);
            teamLogoSprite.alpha = 0;
            teamLogoSprite.scale.set(-2, 2);
            this.add(teamLogoSprite);
            Game.game.add.tween(teamLogoSprite).to({
                x: this._trophy.x,
                y: this._trophy.y - Game.scale(195),
                alpha: 1
            }, 1500, Phaser.Easing.Quadratic.Out, true, 500);
            Game.game.add.tween(teamLogoSprite.scale).to({
                x: 1.1,
                y: 1.1,
            }, 1000, Phaser.Easing.Quadratic.Out, true, 1000);
            Game.game.add.tween(this._trophy.scale).to({
                x: 2,
                y: 2,
            }, 1000, Phaser.Easing.Quadratic.Out, true, 1000);
        };
        return TourneyUI;
    })(Phaser.Group);
    ui.TourneyUI = TourneyUI;
})(ui || (ui = {}));
//# sourceMappingURL=game.compiled.js.map
