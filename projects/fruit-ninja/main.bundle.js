/******/
(function(modules) { // webpackBootstrap
    /******/ // install a JSONP callback for chunk loading
    /******/
    function webpackJsonpCallback(data) {
        /******/
        var chunkIds = data[0];
        /******/
        var moreModules = data[1];
        /******/
        var executeModules = data[2];
        /******/
        /******/ // add "moreModules" to the modules object,
        /******/ // then flag all "chunkIds" as loaded and fire callback
        /******/
        var moduleId, chunkId, i = 0,
            resolves = [];
        /******/
        for (; i < chunkIds.length; i++) {
            /******/
            chunkId = chunkIds[i];
            /******/
            if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
                /******/
                resolves.push(installedChunks[chunkId][0]);
                /******/
            }
            /******/
            installedChunks[chunkId] = 0;
            /******/
        }
        /******/
        for (moduleId in moreModules) {
            /******/
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                /******/
                modules[moduleId] = moreModules[moduleId];
                /******/
            }
            /******/
        }
        /******/
        if (parentJsonpFunction) parentJsonpFunction(data);
        /******/
        /******/
        while (resolves.length) {
            /******/
            resolves.shift()();
            /******/
        }
        /******/
        /******/ // add entry modules from loaded chunk to deferred list
        /******/
        deferredModules.push.apply(deferredModules, executeModules || []);
        /******/
        /******/ // run deferred modules when all chunks ready
        /******/
        return checkDeferredModules();
        /******/
    };
    /******/
    function checkDeferredModules() {
        /******/
        var result;
        /******/
        for (var i = 0; i < deferredModules.length; i++) {
            /******/
            var deferredModule = deferredModules[i];
            /******/
            var fulfilled = true;
            /******/
            for (var j = 1; j < deferredModule.length; j++) {
                /******/
                var depId = deferredModule[j];
                /******/
                if (installedChunks[depId] !== 0) fulfilled = false;
                /******/
            }
            /******/
            if (fulfilled) {
                /******/
                deferredModules.splice(i--, 1);
                /******/
                result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
                /******/
            }
            /******/
        }
        /******/
        /******/
        return result;
        /******/
    }
    /******/
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // object to store loaded and loading chunks
    /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
    /******/ // Promise = chunk loading, 0 = chunk loaded
    /******/
    var installedChunks = {
        /******/
        "main": 0
        /******/
    };
    /******/
    /******/
    var deferredModules = [];
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {}
            /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/
    __webpack_require__.d = function(exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
            /******/
        }
        /******/
    };
    /******/
    /******/ // define __esModule on exports
    /******/
    __webpack_require__.r = function(exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            });
            /******/
        }
        /******/
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
        /******/
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/
    __webpack_require__.t = function(value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/
        if (mode & 8) return value;
        /******/
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        /******/
        var ns = Object.create(null);
        /******/
        __webpack_require__.r(ns);
        /******/
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        /******/
        if (mode & 2 && typeof value != 'string')
            for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
        /******/
        return ns;
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function(module) {
        /******/
        var getter = module && module.__esModule ?
            /******/
            function getDefault() {
                return module['default'];
            } :
            /******/
            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/
    var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    /******/
    var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    /******/
    jsonpArray.push = webpackJsonpCallback;
    /******/
    jsonpArray = jsonpArray.slice();
    /******/
    for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
    /******/
    var parentJsonpFunction = oldJsonpFunction;
    /******/
    /******/
    /******/ // add entry module to deferred list
    /******/
    deferredModules.push([0, "vendors"]);
    /******/ // run deferred modules when ready
    /******/
    return checkDeferredModules();
    /******/
})
/************************************************************************/
/******/
({

    /***/
    "./src/scripts/game.ts":
        /*!*****************************!*\
          !*** ./src/scripts/game.ts ***!
          \*****************************/
        /*! no static exports found */
        /***/
        (function(module, exports, __webpack_require__) {

            "use strict";

            var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
                if (k2 === undefined) k2 = k;
                Object.defineProperty(o, k2, {
                    enumerable: true,
                    get: function() {
                        return m[k];
                    }
                });
            }) : (function(o, m, k, k2) {
                if (k2 === undefined) k2 = k;
                o[k2] = m[k];
            }));
            var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
                Object.defineProperty(o, "default", {
                    enumerable: true,
                    value: v
                });
            }) : function(o, v) {
                o["default"] = v;
            });
            var __importStar = (this && this.__importStar) || function(mod) {
                if (mod && mod.__esModule) return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
                __setModuleDefault(result, mod);
                return result;
            };
            var __importDefault = (this && this.__importDefault) || function(mod) {
                return (mod && mod.__esModule) ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            const Phaser = __importStar(__webpack_require__( /*! phaser */ "./node_modules/phaser/dist/phaser.js"));
            const phaser_extension_1 = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            const mainScene_1 = __importDefault(__webpack_require__( /*! ./scenes/mainScene */ "./src/scripts/scenes/mainScene.js"));
            const preloadScene_1 = __importDefault(__webpack_require__( /*! ./scenes/preloadScene */ "./src/scripts/scenes/preloadScene.js"));
            const preLoadingScene_1 = __importDefault(__webpack_require__( /*! ./scenes/preLoadingScene */ "./src/scripts/scenes/preLoadingScene.js"));
            const config = Object.assign({
                type: Phaser.WEBGL,
                transparent: true,
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    width: 1280,
                    height: 768
                },
                parent: 'phaser-canvas',
                fps: {
                    target: 60,
                    forceSetTimeOut: true
                },
                audio: {
                    disableWebAudio: false
                },
                scene: [preLoadingScene_1.default, preloadScene_1.default, mainScene_1.default],
                backgroundColor: '#000000'
            }, phaser_extension_1.Canvas());
            window.addEventListener('load', () => {
                phaser_extension_1.enable3d(() => new Phaser.Game(config)).withPhysics('assets/ammo');
            });


            /***/
        }),

    /***/
    "./src/scripts/gameobjects/Blade.js":
        /*!******************************************!*\
          !*** ./src/scripts/gameobjects/Blade.js ***!
          \******************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return Blade;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);



            var currentScreen = "HomeScreen";
            var clickedHomeClassic = false;
            var clickedHomeSetting = false;
            var clickedSettingBack = false;
            var clickedResultQuit = false;
            var clickedResultRetry = false;

            class Blade {

                constructor(scene) {
                    this.scene = scene;
                    this.points = [];

                    this.slashes = this.scene.add.graphics(0, 0);
                    this.slashes2 = this.scene.add.graphics(0, 0);
                    this.slashes3 = this.scene.add.graphics(0, 0);
                    this.slashes4 = this.scene.add.graphics(0, 0);

                    this.slashes.setDepth(2);
                    this.slashes2.setDepth(2);
                    this.slashes3.setDepth(2);
                    this.slashes4.setDepth(2);

                    this.create();
                    this.lastTimeStamp = 0;

                    this.SliceEffect = __webpack_require__( /*! ./../gameobjects/SliceEffect.js */ "./src/scripts/gameobjects/SliceEffect.js").default;
                    this.poolSliceEffect = [];
                    this.activeSliceEffect = [];

                    for (let i = 0; i < 10; i++) {
                        let sliceEffect = new this.SliceEffect(this.scene, 0, 0, 'SliceDiamondNeutral');
                        sliceEffect.deactivate();
                        this.poolSliceEffect.push(sliceEffect);
                    }

                    this.SliceCriticalEffect = __webpack_require__( /*! ./../gameobjects/SliceCriticalEffect.js */ "./src/scripts/gameobjects/SliceCriticalEffect.js").default;
                    this.poolSliceCriticalEffect = [];
                    this.activeSliceCriticalEffect = [];

                    for (let i = 0; i < 10; i++) {
                        let sliceCriticalEffect = new this.SliceCriticalEffect(this.scene, 0, 0);
                        sliceCriticalEffect.deactivate();
                        this.poolSliceCriticalEffect.push(sliceCriticalEffect);
                    }
                }

                async create() {}

                changeCurrentScreen(screenName) {
                    currentScreen = screenName;
                }

                getCurrentScreen() {
                    return currentScreen;
                }

                changeClickedHomeClassic(val) {
                    clickedHomeClassic = val;
                }

                getClickedHomeClassic() {
                    return clickedHomeClassic;
                }

                changeClickedHomeSetting(val) {
                    clickedHomeSetting = val;
                }

                getClickedHomeSetting() {
                    return clickedHomeSetting;
                }

                changeClickedSettingBack(val) {
                    clickedSettingBack = val;
                }

                getClickedSettingBack() {
                    return clickedSettingBack;
                }

                changeClickedResultQuit(val) {
                    clickedResultQuit = val;
                }

                getClickedResultQuit() {
                    return clickedResultQuit;
                }

                changeClickedResultRetry(val) {
                    clickedResultRetry = val;
                }

                getClickedResultRetry() {
                    return clickedResultRetry;
                }

                createBlade(trail, points, maxHeight, color) {
                    trail.clear();
                    let lastPos = 2; //4
                    if (points.length > lastPos) {
                        trail.lineStyle(1, 0xFFFF00, 1.0);
                        trail.beginPath();
                        trail.lineStyle(0, 0xFFFF00, 1.0);

                        trail.moveTo(points[0].x, points[0].y);

                        for (var index = 1; index < points.length - lastPos; ++index) {
                            var point = points[index];
                            let strokeSize = this.linearInterpolation(index / (points.length - lastPos), 0, maxHeight);
                            trail.lineStyle(
                                this.linearInterpolation(index / (points.length - lastPos), 0, maxHeight),
                                color,
                                1.0
                            );
                            //trail.setFill('blade_basic');
                            trail.lineTo(point.x, point.y);
                        }
                        var count = 0;
                        for (var index = points.length - lastPos; index < points.length; ++index) {
                            var point = points[index];
                            count += 1;
                            let strokeSize = this.linearInterpolation(count / lastPos, maxHeight, 3);
                            trail.lineStyle(
                                strokeSize,
                                color,
                                1.0
                            );
                            trail.lineTo(point.x, point.y);
                        }
                        trail.strokePath();
                        trail.closePath();
                    }
                }

                updateBlade(delta) {
                    let points = this.points;

                    let maxHeight = 32;

                    this.createBlade(this.slashes, this.points, 48, 0x41567A);
                    this.createBlade(this.slashes2, this.points, 40, 0x7D91A5);
                    this.createBlade(this.slashes3, this.points, 32, 0xC9DFD7);
                    this.createBlade(this.slashes4, this.points, 24, 0xFFFFFF);

                    let playAny = false;
                    this.lastTimeStamp -= delta;
                    for (var index = 0; index < points.length; ++index) {
                        var point = points[index];

                        if (point.first) {
                            if (index > 0) {
                                let distanceX = point.x - points[index - 1].x;
                                let distanceY = point.y - points[index - 1].y;
                                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                                if (distance > 50 && !playAny && this.lastTimeStamp <= 0) {
                                    if (!this.scene.SFXMuted) {
                                        this.scene.sound.play('BladeRegularSwipe0' + Phaser.Math.Between(1, 7));
                                    }
                                    this.lastTimeStamp = 200;
                                    playAny = true;
                                }
                            }
                            point.first = false;
                        }
                        point.time -= 0.5;
                        if (point.time <= 0) {
                            points.splice(index, 1);
                            index -= 1;
                        }

                    }

                    for (let i = 0; i < this.activeSliceEffect.length; i++) {
                        if (this.activeSliceEffect[i].visible == false) {
                            this.poolSliceEffect.push(this.activeSliceEffect[i]);
                            this.activeSliceEffect.splice(i, 1);
                        }
                    }


                    for (let i = 0; i < this.activeSliceCriticalEffect.length; i++) {
                        if (this.activeSliceCriticalEffect[i].visible == false) {
                            this.poolSliceCriticalEffect.push(this.activeSliceCriticalEffect[i]);
                            this.activeSliceCriticalEffect.splice(i, 1);
                        }
                    }

                }

                checkFruits(fruitFactory) {
                    let points = this.points;
                    let listFruits = fruitFactory.getListFruits();
                    let count = 0;

                    for (var i = 1; i < points.length; i++) {
                        let line = new Phaser.Geom.Line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);

                        listFruits.forEach(fruitObj => {
                            if (fruitObj.active) {
                                let posFruit = this.scene.third.transform.from3dto2d(fruitObj.object.position);
                                let fruit = {
                                    x: posFruit.x,
                                    y: posFruit.y,
                                    width: 100,
                                    height: 100
                                };
                                if (this.checkIntersects(fruit, line)) {
                                    let dy = points[i].y - points[i - 1].y;
                                    let dx = points[i].x - points[i - 1].x;
                                    let degree = Math.atan2(-dy, dx) / Math.PI * 180;
                                    let resSlice = this.scene.fruitFactory.slice(fruitObj, degree);
                                    if (resSlice != -1) {
                                        let sliceEffect;
                                        let splashEffect;

                                        if (resSlice == 1) {
                                            if (this.poolSliceEffect.length == 0) {
                                                sliceEffect = new this.SliceEffect(this.scene, posFruit.x, posFruit.y, 'SliceDiamondNeutral');
                                            } else {
                                                sliceEffect = this.poolSliceEffect[0];
                                                sliceEffect.setTexture('SliceDiamondNeutral');
                                                this.poolSliceEffect.splice(0, 1);
                                            }
                                            sliceEffect.x = posFruit.x;
                                            sliceEffect.y = posFruit.y;
                                            this.scene.lastPosX = posFruit.x;
                                            this.scene.lastPosY = posFruit.y;
                                            sliceEffect.angle = -degree + 90;
                                            sliceEffect.activate();
                                            sliceEffect.tint = 0xffffff;
                                            this.activeSliceEffect.push(sliceEffect);
                                        } else {
                                            if (this.poolSliceCriticalEffect.length == 0) {
                                                sliceEffect = new this.SliceCriticalEffect(this.scene, posFruit.x, posFruit.y);
                                            } else {
                                                sliceEffect = this.poolSliceCriticalEffect[0];
                                                this.poolSliceCriticalEffect.splice(0, 1);
                                            }
                                            sliceEffect.x = posFruit.x;
                                            sliceEffect.y = posFruit.y;
                                            this.scene.lastPosX = posFruit.x;
                                            this.scene.lastPosY = posFruit.y;
                                            sliceEffect.angle = -degree + 90;
                                            sliceEffect.activate();
                                            // sliceEffect.tint = 0xffffff;
                                            this.activeSliceCriticalEffect.push(sliceEffect);
                                        }


                                        if (fruitObj.hasSplash) {
                                            if (this.poolSliceEffect.length == 0) {
                                                splashEffect = new this.SliceEffect(this.scene, posFruit.x, posFruit.y, 'FruitSplash');
                                            } else {
                                                splashEffect = this.poolSliceEffect[0];
                                                splashEffect.setTexture('FruitSplash');
                                                this.poolSliceEffect.splice(0, 1);
                                            }
                                            splashEffect.x = posFruit.x;
                                            splashEffect.y = posFruit.y;
                                            splashEffect.angle = -degree + 90;

                                            splashEffect.tint = fruitObj.splashColor;
                                            splashEffect.activateSplash();
                                            this.activeSliceEffect.push(splashEffect);
                                        }
                                        if (fruitObj.id != 'Bomb') {
                                            count++;
                                        }

                                    }
                                }
                            }
                        });

                    }
                    return count;
                }

                checkFruitsUI(fruitFactory) {
                    let points = this.points;
                    let listFruits = fruitFactory.getListFruits();
                    let count = 0;
                    let res = '';

                    if (clickedHomeClassic || clickedHomeSetting || clickedSettingBack || clickedResultQuit || clickedResultRetry) {
                        points = [{
                            "x": 363.08797127468586,
                            "y": 356.1988919279052
                        }, {
                            "x": 363.08797127468586,
                            "y": 355.04986324426676
                        }]
                    }

                    for (var i = 1; i < points.length; i++) {
                        let line = new Phaser.Geom.Line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);

                        listFruits.forEach(fruitObj => {

                            if (fruitObj.active && res == '') {
                                let posFruit = this.scene.third.transform.from3dto2d(fruitObj.object.position);
                                let fruit = {
                                    x: posFruit.x,
                                    y: posFruit.y,
                                    width: 100,
                                    height: 100
                                };

                                let modifiedLine = {
                                    "type": 2,
                                    "x1": posFruit.x,
                                    "x2": posFruit.x,
                                    "y1": posFruit.y,
                                    "y2": posFruit.y,
                                    "bottom": posFruit.y,
                                    "left": posFruit.x,
                                    "right": posFruit.x,
                                    "top": posFruit.y
                                };

                                let followMe = "";

                                if (clickedHomeClassic && fruitObj.id == "WMUI") {
                                    followMe = "classic";
                                } else if (clickedHomeSetting && fruitObj.id == "KWUI") {
                                    followMe = "setting";
                                } else if (clickedSettingBack && fruitObj.id == "BUI") {
                                    followMe = "back";
                                } else if (clickedResultQuit && fruitObj.id == "BUI") {
                                    followMe = "quit";
                                } else if (clickedResultRetry && fruitObj.id == "AGUI") {
                                    followMe = "retry";
                                }

                                if (followMe == "classic") {
                                    if (this.checkIntersects(fruit, modifiedLine, "WMUI")) {
                                        let dy = points[i].y - points[i - 1].y;
                                        let dx = points[i].x - points[i - 1].x;
                                        let degree = Math.atan2(-dy, dx) / Math.PI * 180;

                                        if (res == '' && this.scene.fruitFactory.slice(fruitObj, degree) != -1) {
                                            res = fruitObj.id;

                                        }
                                    }
                                } else if (followMe == "setting") {
                                    if (this.checkIntersects(fruit, modifiedLine, "KWUI")) {
                                        let dy = points[i].y - points[i - 1].y;
                                        let dx = points[i].x - points[i - 1].x;
                                        let degree = Math.atan2(-dy, dx) / Math.PI * 180;

                                        if (res == '' && this.scene.fruitFactory.slice(fruitObj, degree) != -1) {
                                            res = fruitObj.id;

                                        }
                                    }
                                } else if (followMe == "back") {
                                    if (this.checkIntersects(fruit, modifiedLine, "BUI")) {
                                        let dy = points[i].y - points[i - 1].y;
                                        let dx = points[i].x - points[i - 1].x;
                                        let degree = Math.atan2(-dy, dx) / Math.PI * 180;

                                        if (res == '' && this.scene.fruitFactory.slice(fruitObj, degree) != -1) {
                                            res = fruitObj.id;

                                        }
                                    }
                                } else if (followMe == "quit") {
                                    if (this.checkIntersects(fruit, modifiedLine, "BUI")) {
                                        let dy = points[i].y - points[i - 1].y;
                                        let dx = points[i].x - points[i - 1].x;
                                        let degree = Math.atan2(-dy, dx) / Math.PI * 180;

                                        if (res == '' && this.scene.fruitFactory.slice(fruitObj, degree) != -1) {
                                            res = fruitObj.id;

                                        }
                                    }
                                } else if (followMe == "retry") {
                                    if (this.checkIntersects(fruit, modifiedLine, "AGUI")) {
                                        let dy = points[i].y - points[i - 1].y;
                                        let dx = points[i].x - points[i - 1].x;
                                        let degree = Math.atan2(-dy, dx) / Math.PI * 180;

                                        if (res == '' && this.scene.fruitFactory.slice(fruitObj, degree) != -1) {
                                            res = fruitObj.id;

                                        }
                                    }
                                } else {
                                    if (this.checkIntersects(fruit, line)) {
                                        let dy = points[i].y - points[i - 1].y;
                                        let dx = points[i].x - points[i - 1].x;
                                        let degree = Math.atan2(-dy, dx) / Math.PI * 180;
                                        if (res == '' && this.scene.fruitFactory.slice(fruitObj, degree) != -1) {
                                            res = fruitObj.id;

                                        }
                                    }
                                }
                            }

                        });

                    }

                    if (res == "WMUI") {
                        currentScreen = "GameScreen";
                    } else if (res == "AGUI") {
                        currentScreen = "GameScreen";
                    }

                    clickedHomeClassic = false;
                    clickedHomeSetting = false;
                    clickedSettingBack = false;
                    clickedResultQuit = false;
                    clickedResultRetry = false;
                    return res;
                }

                normalizeValue(value, min, max) {
                    return (value - min) / (max - min);
                };

                linearInterpolation(norm, min, max) {
                    return (max - min) * norm + min;
                };

                checkIntersects(fruit, line, type = "") {
                    var l1 = new Phaser.Geom.Line(fruit.x - fruit.width / 2, fruit.y - fruit.height / 2, fruit.x + fruit.width / 2, fruit.y + fruit.height / 2);
                    var l2 = new Phaser.Geom.Line(fruit.x - fruit.width / 2, fruit.y + fruit.height / 2, fruit.x + fruit.width / 2, fruit.y - fruit.height / 2);
                    l2.angle = 90;

                    if (type == "WMUI" || type == "KWUI" || type == "BUI" || type == "AGUI") {
                        return true
                    }

                    if (Phaser.Geom.Intersects.LineToLine(line, l1, true) ||
                        Phaser.Geom.Intersects.LineToLine(line, l2, true)) {

                        let input = this.scene.input;
                        let contactPoint = new Phaser.Math.Vector2(250, 0);;
                        contactPoint.x = input.x;
                        contactPoint.y = input.y;

                        var distance = Phaser.Math.Distance.BetweenPoints(contactPoint, new Phaser.Math.Vector2(fruit.x, fruit.y));



                        if (Phaser.Math.Distance.BetweenPoints(contactPoint, new Phaser.Math.Vector2(fruit.x, fruit.y)) > 500) {
                            return false;
                        }

                        return true;
                    }
                }

                pushPoint(point) {
                    this.points.push(point);
                }

            }

            /***/
        }),

    /***/
    "./src/scripts/gameobjects/ComboText.js":
        /*!**********************************************!*\
          !*** ./src/scripts/gameobjects/ComboText.js ***!
          \**********************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return ComboText;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);


            class ComboText extends Phaser.GameObjects.Container {
                constructor(scene, x, y) {
                    super(scene, x, y);
                    scene.add.existing(this);

                    this.listTextAtas = [];
                    this.listTextTengah = [];
                    this.listTextBawah = [];

                    this.scene = scene;
                    this.textAtas = this.scene.add.text(0, 0, "N Fruit", {
                        fontFamily: "gangofchinese",
                        fontSize: 60,
                        align: 'center'
                    });
                    this.textAtas.setOrigin(0.5, 0.5);
                    this.textAtas.setStroke('#AA7800', 16);
                    let gradient = this.textAtas.context.createLinearGradient(0, 0, 0, this.textAtas.height);
                    gradient.addColorStop(0, '#FEDB3D');
                    gradient.addColorStop(0.5, '#FDF5C5');
                    gradient.addColorStop(0.5, '#D69E00');
                    gradient.addColorStop(1, '#FEF38D');
                    this.textAtas.setFill(gradient);
                    this.listTextAtas.push(this.textAtas);

                    this.textTengah = this.scene.add.text(0, this.textAtas.height / 2 + 30, "Combo", {
                        fontFamily: "gangofchinese",
                        fontSize: 60,
                        align: 'center'
                    });
                    this.textTengah.setOrigin(0.5, 0.5);
                    this.textTengah.setStroke('#AA7800', 16);
                    gradient = this.textTengah.context.createLinearGradient(0, 0, 0, this.textTengah.height);
                    gradient.addColorStop(0, '#FEDB3D');
                    gradient.addColorStop(0.55, '#FDF5C5');
                    gradient.addColorStop(0.55, '#D69E00');
                    gradient.addColorStop(1, '#FEF38D');
                    this.textTengah.setFill(gradient);
                    this.listTextTengah.push(this.textTengah);

                    this.textBawah = this.scene.add.text(0, this.textTengah.y + this.textAtas.height / 2 + 50, "+ N", {
                        fontFamily: "gangofchinese",
                        fontSize: 140,
                        align: 'center'
                    });
                    this.textBawah.setOrigin(0.5, 0.5);
                    this.textBawah.setStroke('#AA7800', 16);
                    gradient = this.textBawah.context.createLinearGradient(0, 0, 0, this.textBawah.height);
                    gradient.addColorStop(0, '#FEDB3D');
                    gradient.addColorStop(0.5, '#FDF5C5');
                    gradient.addColorStop(0.5, '#D69E00');
                    gradient.addColorStop(1, '#FEF38D');
                    this.textBawah.setFill(gradient);
                    this.listTextBawah.push(this.textBawah);

                    this.textAtas2 = this.scene.add.text(0, 0, "N Fruit", {
                        fontFamily: "gangofchinese",
                        fontSize: 60,
                        align: 'center'
                    });
                    this.textAtas2.setOrigin(0.5, 0.5);
                    this.textAtas2.setStroke('#B24700', 16);
                    gradient = this.textAtas2.context.createLinearGradient(0, 0, 0, this.textAtas2.height);
                    gradient.addColorStop(0, '#FF9936');
                    gradient.addColorStop(0.5, '#FFE264');
                    gradient.addColorStop(0.5, '#E17C2F');
                    gradient.addColorStop(1, '#FAC96A');
                    this.textAtas2.setFill(gradient);
                    this.listTextAtas.push(this.textAtas2);

                    this.textAtas3 = this.scene.add.text(0, 0, "N Fruit", {
                        fontFamily: "gangofchinese",
                        fontSize: 60,
                        align: 'center'
                    });
                    this.textAtas3.setOrigin(0.5, 0.5);
                    this.textAtas3.setStroke('#AA2200', 16);
                    gradient = this.textAtas3.context.createLinearGradient(0, 0, 0, this.textAtas3.height);
                    gradient.addColorStop(0, '#FE7838');
                    gradient.addColorStop(0.5, '#FFBA93');
                    gradient.addColorStop(0.5, '#EF562F');
                    gradient.addColorStop(1, '#FE7130');
                    this.textAtas3.setFill(gradient);
                    this.listTextAtas.push(this.textAtas3);

                    this.textTengah2 = this.scene.add.text(0, this.textAtas.height / 2 + 30, "Combo", {
                        fontFamily: "gangofchinese",
                        fontSize: 60,
                        align: 'center'
                    });
                    this.textTengah2.setOrigin(0.5, 0.5);
                    this.textTengah2.setStroke('#B24700', 16);
                    gradient = this.textTengah2.context.createLinearGradient(0, 0, 0, this.textTengah2.height);
                    gradient.addColorStop(0, '#FF9936');
                    gradient.addColorStop(0.55, '#FFE264');
                    gradient.addColorStop(0.55, '#E17C2F');
                    gradient.addColorStop(1, '#FAC96A');
                    this.textTengah2.setFill(gradient);
                    this.listTextTengah.push(this.textTengah2);

                    this.textTengah3 = this.scene.add.text(0, this.textAtas.height / 2 + 30, "Combo", {
                        fontFamily: "gangofchinese",
                        fontSize: 60,
                        align: 'center'
                    });
                    this.textTengah3.setOrigin(0.5, 0.5);
                    this.textTengah3.setStroke('#AA2200', 16);
                    gradient = this.textTengah3.context.createLinearGradient(0, 0, 0, this.textTengah3.height);
                    gradient.addColorStop(0, '#FE7838');
                    gradient.addColorStop(0.55, '#FFBA93');
                    gradient.addColorStop(0.55, '#EF562F');
                    gradient.addColorStop(1, '#FE7130');
                    this.textTengah3.setFill(gradient);
                    this.listTextTengah.push(this.textTengah3);

                    this.textBawah2 = this.scene.add.text(0, this.textTengah.y + this.textAtas.height / 2 + 50, "+ N", {
                        fontFamily: "gangofchinese",
                        fontSize: 140,
                        align: 'center'
                    });
                    this.textBawah2.setOrigin(0.5, 0.5);
                    this.textBawah2.setStroke('#B24700', 16);
                    gradient = this.textBawah2.context.createLinearGradient(0, 0, 0, this.textBawah2.height);
                    gradient.addColorStop(0, '#FF9936');
                    gradient.addColorStop(0.5, '#FFE264');
                    gradient.addColorStop(0.5, '#E17C2F');
                    gradient.addColorStop(1, '#FAC96A');
                    this.textBawah2.setFill(gradient);
                    this.listTextBawah.push(this.textBawah2);

                    this.textBawah3 = this.scene.add.text(0, this.textTengah.y + this.textAtas.height / 2 + 50, "+ N", {
                        fontFamily: "gangofchinese",
                        fontSize: 140,
                        align: 'center'
                    });
                    this.textBawah3.setOrigin(0.5, 0.5);
                    this.textBawah3.setStroke('#AA2200', 16);
                    gradient = this.textBawah3.context.createLinearGradient(0, 0, 0, this.textBawah3.height);
                    gradient.addColorStop(0, '#FE7838');
                    gradient.addColorStop(0.5, '#FFBA93');
                    gradient.addColorStop(0.5, '#EF562F');
                    gradient.addColorStop(1, '#FE7130');
                    this.textBawah3.setFill(gradient);
                    this.listTextBawah.push(this.textBawah3);

                    this.add(this.textAtas);
                    this.add(this.textTengah);
                    this.add(this.textBawah);

                    this.add(this.textAtas2);
                    this.add(this.textTengah2);
                    this.add(this.textBawah2);

                    this.add(this.textAtas3);
                    this.add(this.textTengah3);
                    this.add(this.textBawah3);

                    for (let i = 0; i < 3; i++) {
                        this.listTextAtas[i].visible = false;
                        this.listTextTengah[i].visible = false;
                        this.listTextBawah[i].visible = false;
                    }

                    this.deactivate();
                }

                activate(combo) {
                    this.visible = true;
                    this.scaleY = 0;
                    this.scaleX = 0;
                    let idColor = 0;
                    if (combo >= 8) {
                        idColor = 2;
                    } else if (combo >= 5) {
                        idColor = 1;
                    }

                    let textAtas = this.listTextAtas[idColor];
                    let textTengah = this.listTextTengah[idColor];
                    let textBawah = this.listTextBawah[idColor];
                    textAtas.text = combo + ' Fruit';
                    textBawah.text = '+ ' + combo;

                    textAtas.visible = true;
                    textTengah.visible = true;
                    textBawah.visible = true;


                    this.scene.tweens.add({
                        targets: this,
                        scale: 1.1,
                        // alpha: 1,
                        // yoyo: true,
                        duration: 200,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                scale: 1,
                                duration: 100,
                                onComplete: () => {
                                    this.scene.tweens.add({
                                        targets: this,
                                        scale: 1.1,
                                        duration: 100,
                                        onComplete: () => {
                                            this.scene.tweens.add({
                                                targets: this,
                                                scale: 0,
                                                delay: 1000,
                                                // alpha: 1,
                                                // yoyo: true,
                                                duration: 100,
                                                onComplete: () => {
                                                    this.deactivate();
                                                }
                                            });
                                        }
                                    });
                                }
                            });

                        }
                    });
                }

                deactivate() {
                    this.visible = false;
                    this.scaleX = 0;
                    this.scaleY = 0;


                    for (let i = 0; i < 3; i++) {
                        this.listTextAtas[i].visible = false;
                        this.listTextTengah[i].visible = false;
                        this.listTextBawah[i].visible = false;
                    }
                }


            }

            /***/
        }),

    /***/
    "./src/scripts/gameobjects/CriticalText.js":
        /*!*************************************************!*\
          !*** ./src/scripts/gameobjects/CriticalText.js ***!
          \*************************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return CriticalText;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);


            class CriticalText extends Phaser.GameObjects.Container {
                constructor(scene, x, y) {
                    super(scene, x, y);
                    scene.add.existing(this);

                    this.scene = scene;

                    this.textAtas = this.scene.add.text(0, 0, "CRITICAL", {
                        fontFamily: "gangofchinese",
                        fontSize: 60,
                        align: 'center'
                    });
                    this.textAtas.setOrigin(0.5, 0.5);
                    this.textAtas.setStroke('#022967', 16);
                    let gradient = this.textAtas.context.createLinearGradient(0, 0, 0, this.textAtas.height);
                    gradient.addColorStop(0, '#B2D6F5');
                    gradient.addColorStop(1, '#135ECD');
                    this.textAtas.setFill(gradient);

                    this.textBawah = this.scene.add.text(0, 0, "+10", {
                        fontFamily: "gangofchinese",
                        fontSize: 120,
                        align: 'center'
                    });
                    this.textBawah.setOrigin(0.5, 0.5);
                    this.textBawah.setStroke('#022967', 16);
                    let gradientBawah = this.textBawah.context.createLinearGradient(0, 0, 0, this.textBawah.height);
                    gradientBawah.addColorStop(0, '#B2D6F5');
                    gradientBawah.addColorStop(1, '#135ECD');
                    this.textBawah.setFill(gradientBawah);

                    this.textBawah.setPosition(0, this.textAtas.y + this.textAtas.height / 2 + this.textBawah.height / 2 - 25);

                    this.add(this.textAtas);
                    this.add(this.textBawah);

                    this.deactivate();
                }

                activate() {
                    this.visible = true;
                    this.scaleY = 0;
                    this.scaleX = 0;

                    this.textAtas.visible = true;
                    this.textBawah.visible = true;


                    this.scene.tweens.add({
                        targets: this,
                        scale: 1.1,
                        // alpha: 1,
                        // yoyo: true,
                        duration: 200,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                scale: 1,
                                duration: 100,
                                onComplete: () => {
                                    this.scene.tweens.add({
                                        targets: this,
                                        scale: 1.1,
                                        duration: 100,
                                        onComplete: () => {
                                            this.scene.tweens.add({
                                                targets: this,
                                                scale: 0,
                                                delay: 1000,
                                                // alpha: 1,
                                                // yoyo: true,
                                                duration: 100,
                                                onComplete: () => {
                                                    this.deactivate();
                                                }
                                            });
                                        }
                                    });
                                }
                            });

                        }
                    });
                }

                deactivate() {
                    this.visible = false;
                    this.scaleX = 0;
                    this.scaleY = 0;

                }


            }

            /***/
        }),

    /***/
    "./src/scripts/gameobjects/FruitFactory.js":
        /*!*************************************************!*\
          !*** ./src/scripts/gameobjects/FruitFactory.js ***!
          \*************************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* WEBPACK VAR INJECTION */
            (function(global) { /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "default", function() {
                    return FruitFactory;
                });
                /* harmony import */
                var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
                /* harmony import */
                var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);



                class FruitFactory {

                    constructor(scene) {

                        global.gameData = {

                            fruitList: [{
                                    id: "Coconut",
                                    path: "assets/fruits/Coconut.FBX",
                                    scale: 1.2413,
                                    splashColor: 0xF9FFFF,
                                    alpha: 179,
                                    splashTex: 'splash',
                                    droplets: 'JuiceDragonFruit',
                                    impactSFX: 'FruitImpactBigHollow',
                                    minSplash: 2,
                                    maxSplash: 4
                                },
                                {
                                    id: "Pineapple",
                                    path: "assets/fruits/Pineapple.FBX",
                                    scale: 1.1526,
                                    splashColor: 0xFFEF3F,
                                    alpha: 180,
                                    splashTex: 'splash',
                                    droplets: 'JuicePineapple',
                                    impactSFX: 'FruitImpactBigWet0',
                                    minSplash: 2,
                                    maxSplash: 3
                                },
                                {
                                    id: "Orange",
                                    path: "assets/fruits/Orange.FBX",
                                    scale: 1.034,
                                    splashColor: 0xFC7804,
                                    alpha: 180,
                                    splashTex: 'splash',
                                    droplets: 'JuiceOrange',
                                    impactSFX: 'FruitImpactBigWet0',
                                    minSplash: 3,
                                    maxSplash: 4
                                },
                                {
                                    id: "Kiwifruit",
                                    path: "assets/fruits/Kiwifruit.FBX",
                                    scale: 0.8866,
                                    splashColor: 0x54AD10,
                                    alpha: 180,
                                    splashTex: 'splash',
                                    droplets: 'JuiceGreen',
                                    impactSFX: 'FruitImpactSmallWet0',
                                    minSplash: 1,
                                    maxSplash: 4
                                },
                                {
                                    id: "Lemon",
                                    path: "assets/fruits/Lemon.FBX",
                                    scale: 0.9753,
                                    splashColor: 0xFFEF3F,
                                    alpha: 180,
                                    splashTex: 'splash',
                                    droplets: 'JuicePineapple',
                                    impactSFX: 'FruitImpactMediumWet0',
                                    minSplash: 3,
                                    maxSplash: 4
                                },
                                {
                                    id: "Peach",
                                    path: "assets/fruits/Peach.FBX",
                                    scale: 1.0108,
                                    splashColor: 0xFFC51B,
                                    alpha: 180,
                                    splashTex: 'splash',
                                    droplets: 'JuiceMango',
                                    impactSFX: 'FruitImpactMediumWet0',
                                    minSplash: 4,
                                    maxSplash: 4
                                },
                                {
                                    id: "AppleGreen",
                                    path: "assets/fruits/AppleGreen.FBX",
                                    scale: 1.064,
                                    splashColor: 0xFEDC35,
                                    alpha: 179,
                                    splashTex: 'splash2',
                                    droplets: 'JuicePineapple',
                                    impactSFX: 'FruitImpactApple',
                                    minSplash: 2,
                                    maxSplash: 2
                                },
                                {
                                    id: "Mango",
                                    path: "assets/fruits/Mango.FBX",
                                    scale: 1.1526,
                                    splashColor: 0xFFB720,
                                    alpha: 180,
                                    splashTex: 'splash',
                                    droplets: 'JuiceMango',
                                    impactSFX: 'FruitImpactMediumWet0',
                                    minSplash: 2,
                                    maxSplash: 4
                                },
                                {
                                    id: "Watermelon",
                                    path: "assets/fruits/Watermelon.FBX",
                                    scale: 1.33,
                                    splashColor: 0xFB2618,
                                    alpha: 255,
                                    splashTex: 'splash',
                                    droplets: 'JuiceRed',
                                    impactSFX: 'FruitImpactBigWet0',
                                    minSplash: 3,
                                    maxSplash: 4
                                },
                                {
                                    id: "WMUI",
                                    path: "assets/fruits/Watermelon.FBX",
                                    scale: 1.33,
                                    splashColor: 0xFB2618,
                                    alpha: 255,
                                    splashTex: 'splash',
                                    droplets: 'JuiceRed',
                                    impactSFX: 'FruitImpactBigWet0',
                                    minSplash: 3,
                                    maxSplash: 4
                                },
                                {
                                    id: "KWUI",
                                    path: "assets/fruits/Kiwifruit.FBX",
                                    scale: 0.8866,
                                    splashColor: 0x54AD10,
                                    alpha: 180,
                                    splashTex: 'splash',
                                    droplets: 'JuiceGreen',
                                    impactSFX: 'FruitImpactSmallWet0',
                                    minSplash: 1,
                                    maxSplash: 4
                                },
                                {
                                    id: "BUI",
                                    path: "assets/fruits/Bomb.fbx",
                                    scale: 1.0,
                                    splashTex: 'none',
                                    droplets: 'none',
                                    impactSFX: 'BombExplodeGameOver'
                                },
                                {
                                    id: "AGUI",
                                    path: "assets/fruits/AppleGreen.FBX",
                                    scale: 1.064,
                                    splashColor: 0xFEDC35,
                                    alpha: 179,
                                    splashTex: 'splash2',
                                    droplets: 'JuicePineapple',
                                    impactSFX: 'FruitImpactApple',
                                    minSplash: 2,
                                    maxSplash: 2
                                },
                                {
                                    id: "Banana",
                                    path: "assets/fruits/Banana.FBX",
                                    scale: 0.95,
                                    splashTex: 'none',
                                    droplets: 'none',
                                    impactSFX: 'FruitImpactMediumDry'
                                },
                                {
                                    id: "Bomb",
                                    path: "assets/fruits/Bomb.fbx",
                                    scale: 1.0,
                                    splashTex: 'none',
                                    droplets: 'none',
                                    impactSFX: 'BombExplodeGameOver'
                                }
                            ],

                        };

                        this.scene = scene;
                        this.listFruits = [];

                        this.fruitToSpawnList = [];
                        this.fruitNeedUpdate = [];

                        this.frustumSizeChanger = 192;
                        this.bombHit = false;
                        this.udahFinish = false;
                        this.create();

                    }

                    async create() {
                        this.fruitTexture = await this.scene.third.load.texture('fruits_tex');
                        this.shadowTexture = await this.scene.third.load.texture('fruit_shadow');
                        this.bombTexture = await this.scene.third.load.texture('bomb_tex');
                        this.bombRayTexture = await this.scene.third.load.texture('bomb_ray_tex');
                        this.splashTexture = await this.scene.third.load.texture('splash_tex');
                        this.splashTexture2 = await this.scene.third.load.texture('splash2_tex');
                        this.splashTexture3 = await this.scene.third.load.texture('splash3_tex');
                        this.splashTexture4 = await this.scene.third.load.texture('splash4_tex');

                        this.splashSliced1 = await this.scene.third.load.texture('SplashSlice1');
                        this.splashSliced2 = await this.scene.third.load.texture('SplashSlice2');

                        this.fruitTrailTex = await this.scene.third.load.texture('FruitTrail');
                        this.criticalTrailTex = await this.scene.third.load.texture('CriticalTrail');
                        this.bombTrailTex = await this.scene.third.load.texture('BombTrail');
                        this.bombSmokeTex = await this.scene.third.load.texture('BombSmoke');

                        this.helperVec3 = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(0, 0, 0);

                        let data = global.gameData.fruitList;
                        for (var i = 0; i < data.length; i++) {
                            this.load(data[i].path, i * 20 - 180, 75, 0, 0.7 * data[i].scale / this.frustumSizeChanger, data[i].id, data[i]);
                        }

                        this.emitterDroplets = {};
                        this.emitterDroplets['JuiceDragonFruit'] = this.createEmitter('JuiceDragonfruit');
                        this.emitterDroplets['JuiceGreen'] = this.createEmitter('JuiceGreen');
                        this.emitterDroplets['JuiceMango'] = this.createEmitter('JuiceMango');
                        this.emitterDroplets['JuiceOrange'] = this.createEmitter('JuiceOrange');
                        this.emitterDroplets['JuicePineapple'] = this.createEmitter('JuicePineapple');
                        this.emitterDroplets['JuiceRed'] = this.createEmitter('JuiceRed');
                        this.emitterDroplets['StarCritical'] = this.createEmitter('StarCritical', 1.0);

                        this.emitterDroplets2 = {};
                        this.emitterDroplets2['JuiceDragonFruit'] = this.createEmitter('JuiceDragonfruit', 1);
                        this.emitterDroplets2['JuiceGreen'] = this.createEmitter('JuiceGreen', 1);
                        this.emitterDroplets2['JuiceMango'] = this.createEmitter('JuiceMango', 1);
                        this.emitterDroplets2['JuiceOrange'] = this.createEmitter('JuiceOrange', 1);
                        this.emitterDroplets2['JuicePineapple'] = this.createEmitter('JuicePineapple', 1);
                        this.emitterDroplets2['JuiceRed'] = this.createEmitter('JuiceRed', 1);

                        this.bombRay = [];
                        this.bombFuse = this.scene.sound.add('BombFuseLP');

                    }

                    populateRayForBomb(bomb) {
                        let nRay = 8;

                        let startRand = Phaser.Math.Between(1, 12) * 30;
                        for (let i = 0; i < nRay; i++) {
                            this.scene.third.load.fbx('assets/effects/PomegranateRay.fbx').then(object => {
                                this.scene.third.add.existing(object);
                                object.position.set(0, 0, 2);
                                object.rotation.set(-90, startRand + i * 30, 0);
                                const material = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                                    map: this.bombRayTexture
                                })
                                material.transparent = true;

                                let bombRayTexture = this.bombRayTexture;
                                object.traverse(function(child) {

                                    if (child.isMesh) {
                                        child.material = material;
                                    }

                                });
                                object.material = material;
                                material.opacity = Phaser.Math.Between(5, 10) / 10.0;
                                object.visible = false;
                                this.bombRay.push(object);
                            });
                        }
                    }

                    createEmitter(textureName, startScale = 2.0) {
                        let dropletParticle = this.scene.add.particles(textureName);
                        let emitter;
                        if (textureName == 'StarCritical') {
                            let shape = new Phaser.Geom.Line(0, -100, 0, 100);
                            emitter = dropletParticle.createEmitter({
                                x: 384,
                                y: 640,
                                emitZone: {
                                    type: 'random',
                                    source: shape
                                },
                                alpha: 1,
                                scale: {
                                    start: startScale,
                                    end: 0
                                },
                                speed: {
                                    min: 300,
                                    max: 800,
                                    step: 100
                                },
                                angle: {
                                    min: -30,
                                    max: 30,
                                    step: 15
                                },
                                lifespan: 1000,
                                gravityX: 0,
                                gravityY: 500,
                                quantity: 15,
                                tint: 0x9FF1FF,
                                on: false
                            });
                        } else if (startScale == 2) {
                            emitter = dropletParticle.createEmitter({
                                x: 384,
                                y: 640,
                                alpha: 1,
                                scale: {
                                    start: startScale,
                                    end: 0
                                },
                                speed: {
                                    min: 300,
                                    max: 600
                                },
                                angle: {
                                    min: -15,
                                    max: 15
                                },
                                lifespan: 1000,
                                gravityX: 0,
                                gravityY: 1000,
                                quantity: 10,
                                on: false
                            });
                        } else {
                            emitter = dropletParticle.createEmitter({
                                x: 384,
                                y: 640,
                                alpha: 1,
                                scale: {
                                    start: startScale,
                                    end: 0
                                },
                                // speed: 50,
                                speedX: {
                                    min: -400,
                                    max: 400
                                },
                                speedY: {
                                    min: -350,
                                    max: -50
                                },
                                // angle: { min: 0, max: -180},
                                lifespan: 750,
                                gravityX: 0,
                                gravityY: 1000,
                                quantity: 10,
                                on: false
                            });
                        }

                        return emitter;
                    }

                    load(path, posX, posY, posZ, scaleSize, id, data) {
                        let fruitTexture;
                        if (id == "Bomb" || id == "BUI") {
                            fruitTexture = this.bombTexture;
                        } else {
                            fruitTexture = this.fruitTexture;
                        }
                        let me = this;
                        let fruitTrailTex = this.fruitTrailTex;
                        let criticalTrailTex = this.criticalTrailTex;
                        let bombTrailTex = this.bombTrailTex;
                        let bombSmokeTex = this.bombSmokeTex;

                        if (id == 'WMUI') {

                            posX = 0;
                            posY = -64 / this.frustumSizeChanger;
                            posZ = 10 / this.frustumSizeChanger
                        } else if (id == 'KWUI') {
                            // 5.5,0,0.85
                            posX = 5.5 * 32 / this.frustumSizeChanger;
                            posY = 0 / this.frustumSizeChanger;
                            posZ = 10 / this.frustumSizeChanger
                            console.log('kiwi: ' + posX + ', ' + posY + ', ' + posZ);
                        }

                        this.scene.third.load.fbx(path).then(object => {

                            object.scale.set(scaleSize, scaleSize, scaleSize);
                            object.position.set(posX, posY, posZ);

                            let half1BasePos;
                            let half2BasePos;
                            let theBombTrail;
                            object.traverse(function(child) {

                                if (child.isMesh) {
                                    if (child.name.includes("Outline") || child.name.includes("outline")) {
                                        if (id != "Bomb" && id != "BUI") {
                                            child.visible = false;
                                        } else {
                                            const outlineColor = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshLambertMaterial({
                                                color: 0xff0000
                                            });
                                            child.material = outlineColor;
                                        }

                                    }


                                    if (child.name.includes("Half") || child.name.includes("half")) {
                                        child.visible = false;
                                        child.firstLoad = true;
                                        if (child.name.includes("Half1") || child.name.includes("half1")) {
                                            half1BasePos = child.position;
                                        } else {
                                            half2BasePos = child.position;
                                        }
                                        // console.log(half1BasePos);
                                        me.scene.third.physics.add.existing(child, {
                                            shape: 'convexMesh'
                                        });
                                        child.body.on.update(() => {
                                            // child.visible = true;
                                            if (!child.body) {
                                                return;
                                            }
                                            if (child.firstLoad) {
                                                child.firstLoad = false;
                                                return;
                                            }

                                            child.body.setVelocity(0, 0, 0)
                                            child.body.setAngularVelocity(0, 0, 0);
                                            child.body.setRotation(0, 0, 0);

                                            child.position.set(0, 0, 10);
                                            // console.log(child.position);
                                            child.body.setCollisionFlags(4);
                                            // console.log('after set');
                                            // console.log(child.position);
                                            let force = 100;
                                            if (child.critical) {
                                                force = 1000;
                                            }

                                            if (child.name.includes("Half1") || child.name.includes("half1")) {
                                                child.body.applyForce(200 / me.frustumSizeChanger, force / me.frustumSizeChanger, -20 / me.frustumSizeChanger);
                                                child.body.setAngularVelocity(1, 0, 1);
                                            } else {
                                                child.body.applyForce(-200 / me.frustumSizeChanger, -force / me.frustumSizeChanger, -20 / me.frustumSizeChanger);
                                                child.body.setAngularVelocity(-1, 0, -1);
                                            }
                                        });
                                        // child.body.setCollisionFlags(6);
                                        // child.body.checkCollisions = false; 
                                        child.body.needUpdate = true;
                                    }


                                    if (id != "Bomb" && id != "BUI") {
                                        child.material.map = fruitTexture;
                                    } else if (!child.name.includes("Outline") && !child.name.includes("outline")) {
                                        child.material.map = fruitTexture;

                                        const BombTrail = __webpack_require__( /*! ./../utils/BombTrail.js */ "./src/scripts/utils/BombTrail.js").default;
                                        theBombTrail = new BombTrail({
                                            parent: me.scene.third.scene,
                                            camera: me.scene.third.camera,
                                            helper: me.scene,
                                            texturePS: bombTrailTex
                                        });

                                    }

                                }

                            });


                            this.scene.third.add.existing(object);
                            this.scene.third.physics.add.existing(object, {
                                shape: 'convexMesh'
                            });


                            // object.traverse( function ( child ) {

                            //   if ( child.isMesh ) {
                            //     if(child.name.includes("Half") || child.name.includes("half")){
                            //       console.log(child);
                            //         me.scene.third.physics.add.existing(child,{shape: 'convexMesh'});
                            //         child.body.setCollisionFlags(6);
                            //     }
                            //   }
                            // } );

                            if (id == 'Bomb') {
                                this.populateRayForBomb(object);
                            }

                            this.shadowTexture.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                            this.shadowTexture.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                            const material = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                                map: this.shadowTexture
                            })
                            material.transparent = true;
                            const shadow = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(scaleSize * 110, scaleSize * 110), material)
                            shadow.opacity = 0.8;
                            shadow.position.z = -699
                            shadow.position.x = posX;
                            shadow.position.y = posY;
                            this.scene.third.add.existing(shadow);

                            let splash = [];
                            let hasSplash = false;
                            if (data.splashTex != 'none') {
                                hasSplash = true;
                                let texture = this.splashTexture;
                                if (data.splashTex == 'splash2') {
                                    texture = this.splashTexture2;
                                }
                                texture.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                texture.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                for (let a = 0; a < 4; a++) {
                                    const materialSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                                        map: texture,
                                        color: data.splashColor
                                    })
                                    materialSplash.transparent = true;
                                    materialSplash.opacity = data.alpha / 255.0;
                                    materialSplash.color.alpha = data.alpha / 255.0;
                                    materialSplash.color.baseAlpha = data.alpha / 255.0;

                                    let aSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(scaleSize * 110, scaleSize * 110), materialSplash)
                                    aSplash.position.z = -698
                                    aSplash.position.x = posX;
                                    aSplash.position.y = posY;
                                    aSplash.visible = false;
                                    this.scene.third.add.existing(aSplash);
                                    splash.push(aSplash);
                                }

                                texture = this.splashTexture3;
                                if (data.splashTex == 'splash2') {
                                    texture = this.splashTexture4;
                                }
                                texture.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                texture.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                for (let a = 0; a < 2; a++) {
                                    const materialSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                                        map: texture,
                                        color: data.splashColor
                                    })
                                    materialSplash.transparent = true;
                                    materialSplash.opacity = data.alpha / 255.0;
                                    materialSplash.color.alpha = data.alpha / 255.0;
                                    materialSplash.color.baseAlpha = data.alpha / 255.0;

                                    let aSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(scaleSize * 110, scaleSize * 110), materialSplash)
                                    aSplash.position.z = -698
                                    aSplash.position.x = posX;
                                    aSplash.position.y = posY;
                                    aSplash.visible = false;
                                    this.scene.third.add.existing(aSplash);
                                    splash.push(aSplash);
                                }

                                if (data.splashTex != 'splash2') {
                                    texture = this.splashSliced1;
                                    texture.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                    texture.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                    for (let a = 0; a < 1; a++) {
                                        const materialSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                                            map: texture,
                                            color: data.splashColor
                                        })
                                        materialSplash.transparent = true;
                                        materialSplash.opacity = data.alpha / 255.0;
                                        materialSplash.color.alpha = data.alpha / 255.0;
                                        materialSplash.color.baseAlpha = data.alpha / 255.0;

                                        let aSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(scaleSize * 110, scaleSize * 110), materialSplash)
                                        aSplash.position.z = -698
                                        aSplash.position.x = posX;
                                        aSplash.position.y = posY;
                                        aSplash.visible = false;
                                        this.scene.third.add.existing(aSplash);
                                        splash.push(aSplash);
                                    }

                                    texture = this.splashSliced2;
                                    texture.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                    texture.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                                    for (let a = 0; a < 1; a++) {
                                        const materialSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                                            map: texture,
                                            color: data.splashColor
                                        })
                                        materialSplash.transparent = true;
                                        materialSplash.opacity = data.alpha / 255.0;
                                        materialSplash.color.alpha = data.alpha / 255.0;
                                        materialSplash.color.baseAlpha = data.alpha / 255.0;

                                        let aSplash = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(scaleSize * 110, scaleSize * 110), materialSplash)
                                        aSplash.position.z = -698
                                        aSplash.position.x = posX;
                                        aSplash.position.y = posY;
                                        aSplash.visible = false;
                                        this.scene.third.add.existing(aSplash);
                                        splash.push(aSplash);
                                    }
                                }

                            }

                            let fruitTrail;
                            if (id == 'Bomb' || id == 'BUI') {

                                const BombSmoke = __webpack_require__( /*! ./../utils/BombSmoke.js */ "./src/scripts/utils/BombSmoke.js").default;
                                fruitTrail = new BombSmoke({
                                    parent: this.scene.third.scene,
                                    camera: this.scene.third.camera,
                                    helper: this.scene,
                                    texturePS: bombSmokeTex
                                });
                            } else {

                                const FruitTrail = __webpack_require__( /*! ./../utils/FruitTrail.js */ "./src/scripts/utils/FruitTrail.js").default;
                                fruitTrail = new FruitTrail({
                                    parent: this.scene.third.scene,
                                    camera: this.scene.third.camera,
                                    helper: this.scene,
                                    texturePS: fruitTrailTex
                                });
                            }

                            const CriticalTrail = __webpack_require__( /*! ./../utils/CriticalTrail.js */ "./src/scripts/utils/CriticalTrail.js").default;
                            let criticalTrailHalf1 = new CriticalTrail({
                                parent: this.scene.third.scene,
                                camera: this.scene.third.camera,
                                helper: this.scene,
                                texturePS: criticalTrailTex
                            });
                            let criticalTrailHalf2 = new CriticalTrail({
                                parent: this.scene.third.scene,
                                camera: this.scene.third.camera,
                                helper: this.scene,
                                texturePS: criticalTrailTex
                            }); //must follow half

                            const item = {
                                object,
                                active: true,
                                pastScreen: false,
                                willActive: false,
                                count: 0,
                                sliced: false,
                                half1BasePos,
                                half2BasePos,
                                shadow,
                                id,
                                splash: splash,
                                hasSplash: hasSplash,
                                droplets: data.droplets,
                                impactSFX: data.impactSFX,
                                splashColor: data.splashColor,
                                minSplash: data.minSplash,
                                maxSplash: data.maxSplash,
                                fruitTrail,
                                theBombTrail,
                                criticalTrailHalf1,
                                criticalTrailHalf2
                            };
                            console.log(object);
                            item.object.body.on.update(() => {
                                if (!item) {
                                    return;
                                }

                                if (this.scene.gameState == -1 || this.scene.gameState == 0 || this.scene.gameState == 3 || this.scene.gameState == 4) {

                                    item.object.position.set(item.uiPosX, item.uiPosY, 10);

                                    this.activate(item);
                                    if (item.id == 'Bomb' || item.id == 'BUI') {
                                        item.fruitTrail.setOn();
                                    } else {
                                        item.object.body.setAngularVelocity(0.5, 0.25, 0.5);
                                        item.fruitTrail.setOff();
                                    }

                                    item.object.body.physics.setGravity(0, 0, 0);

                                    item.object.body.setVelocity(0, 0, 0);
                                } else if (this.scene.gameState == 2) {
                                    if (item.willActive) {
                                        this.activate(item);
                                        let force = Math.floor(Math.random() * 50) * 2 + 530;
                                        if (item.id == 'Bomb' || item.id == 'BUI') {
                                            force = Math.floor(Math.random() * 50) * 2 + 550;
                                            if (item.object.position.x < 0) {
                                                item.object.body.applyForce(70 / this.frustumSizeChanger, force / this.frustumSizeChanger, -250 / this.frustumSizeChanger);
                                                // f.object.body.applyTorqueImpulse(700,-700,700);
                                                item.object.body.setAngularVelocity(1, 0, 1);
                                            } else {
                                                item.object.body.applyForce(-70 / this.frustumSizeChanger, force / this.frustumSizeChanger, -250 / this.frustumSizeChanger);
                                                // f.object.body.applyTorqueImpulse(-700,700,-700);
                                                item.object.body.setAngularVelocity(-1, 0, -1);
                                            }
                                        } else {
                                            if (item.object.position.x < 0) {
                                                item.object.body.applyForce(100 / this.frustumSizeChanger, force / this.frustumSizeChanger, -250 / this.frustumSizeChanger);
                                                // f.object.body.applyTorqueImpulse(700,-700,700);
                                                item.object.body.setAngularVelocity(1, 0, 1);
                                            } else {
                                                item.object.body.applyForce(-100 / this.frustumSizeChanger, force / this.frustumSizeChanger, -250 / this.frustumSizeChanger);
                                                // f.object.body.applyTorqueImpulse(-700,700,-700);
                                                item.object.body.setAngularVelocity(-1, 0, -1);
                                            }
                                        }

                                    } else {

                                        item.object.body.setCollisionFlags(6)
                                        item.object.visible = false;

                                        item.object.body.setVelocity(0, 0, 0);
                                        item.object.body.setAngularVelocity(0, 0, 0);
                                        // item.object.position.set(0,-1.95,0);
                                    }
                                } else {
                                    this.activate(item);
                                }


                            });
                            this.deactivate(item);
                            this.listFruits.push(item);

                            if (this.isFinish()) {
                                console.log('masuk finish');
                                this.scene.contLoad();
                            }


                        });
                    }

                    isFinish() {
                        if (this.udahFinish) {
                            return false;
                        }
                        if (this.listFruits.length == 15) {
                            this.udahFinish = true;
                            return true;
                        }
                    }

                    scheduleSpawnFruit(toSpawn, z, x, delay) {
                        this.fruitToSpawnList.push({
                            toSpawn,
                            z,
                            x,
                            delay
                        });
                    }

                    spawnFruit(toSpawn, z, x) {
                        let helper = [];
                        let min = 9999;
                        let bebas = toSpawn == "R";
                        if (toSpawn == "B") {
                            toSpawn = "Bomb";
                        }
                        this.listFruits.forEach(fruit => {
                            if (!fruit.active && !fruit.willActive) {

                                if (bebas && fruit.id != 'Bomb' && !fruit.id.includes('UI')) {
                                    helper.push(fruit);
                                } else {
                                    if (toSpawn == fruit.id) {
                                        helper.push(fruit);
                                    }
                                }

                            }
                        });

                        let f;
                        if (helper.length > 0) {
                            let idx = Phaser.Math.Between(0, helper.length - 1);
                            f = helper[idx];
                        }


                        if (f) {
                            f.willActive = true;
                            f.pastScreen = false;
                            f.count++;
                            f.object.position.set(x, -1.95, z);
                            // f.newPosX = x;
                            // f.newPosZ = z;


                            // this.activate(f);

                            f.object.body.needUpdate = true;
                            // f.once = false;



                            // console.log('set position '+f.id);
                            // this.fruitNeedUpdate.push(f);

                            if (!this.scene.SFXMuted) {
                                if (f.id != 'Bomb') {
                                    this.scene.sound.play('FruitLaunch');
                                } else {
                                    this.scene.sound.play('BombLaunch');
                                    this.bombFuse.play();
                                }
                            }

                        }
                    }

                    clearBomb() {
                        let bomb;
                        this.listFruits.forEach(fruit => {

                            if (fruit.id == 'Bomb') {
                                bomb = fruit;
                            } else {
                                if (fruit.active) {
                                    this.deactivate(fruit);
                                }
                            }
                        });
                        if (bomb) {
                            this.deactivate(bomb);
                        }
                        for (let i = 0; i < this.bombRay.length; i++) {
                            this.bombRay[i].visible = false;
                        }
                        this.bombHit = false;

                    }

                    stopAllFruit() {
                        this.fruitToSpawnList = [];
                        this.listFruits.forEach(fruit => {
                            fruit.object.body.setVelocity(0, 0, 0)
                        });
                    }

                    slice(fruit, sliceDirection) {
                        let me = this;
                        if (!fruit.sliced) {
                            fruit.preventDeactivate = false;
                            fruit.sliced = true;
                            fruit.fruitTrail.setOff();
                            fruit.shadow.visible = false;
                            fruit.object.body.setCollisionFlags(6);
                            if (fruit.id == "Bomb" || fruit.id == "BUI") {
                                if (this.scene.gameState == 2) {
                                    fruit.deactivateTimerSlice = 4000;
                                    this.bombHit = true;
                                    let posFruit = this.scene.third.transform.from3dto2d(fruit.object.position);
                                    this.scene.notifyBombHit(posFruit.x, posFruit.y);
                                    if (!this.scene.SFXMuted) {
                                        this.scene.sound.play(fruit.impactSFX);
                                    }
                                    this.scene.tweens.addCounter({
                                        from: 0,
                                        to: 8,
                                        duration: 1500,
                                        onUpdate: (tween) => {
                                            const value = Math.floor(tween.getValue());
                                            if (value != 8) {
                                                this.bombRay[value].position.set(fruit.object.position.x, fruit.object.position.y, fruit.object.position.z - 2);
                                                this.bombRay[value].visible = true;
                                            }

                                        }
                                    });
                                    fruit.object.body.physics.setGravity(0, 0, 0);
                                    this.stopAllFruit();
                                } else {
                                    this.deactivate(fruit);
                                    if (!this.scene.SFXMuted) {
                                        this.scene.sound.play('FruitImpactBigHollow');
                                    }
                                    fruit.object.body.physics.setGravity(0, -2, 0);
                                    return true;
                                }

                            } else {
                                if (fruit.hasSplash) {
                                    let posFruit = this.scene.third.transform.from3dto2d(fruit.object.position);

                                    fruit.critical = false;
                                    if (this.scene.gameState == 2 && (Phaser.Math.Between(1, 100) <= 12)) {
                                        // console.log(fruit.object.getObjectByName(fruit.id+'Half1'));
                                        this.scene.showCriticalText(posFruit.x, posFruit.y);
                                        fruit.critical = true;
                                        fruit.criticalTrailHalf1.setOn();
                                        fruit.criticalTrailHalf2.setOn();
                                        // let body = fruit.object.body
                                        // body.applyForce(2000,2000,200);
                                        // body.setAngularVelocity(1,0,1);
                                    }


                                    if (fruit.critical) {
                                        let curAngle = -sliceDirection;
                                        this.emitterDroplets['StarCritical'].angle.start = curAngle - 15;
                                        this.emitterDroplets['StarCritical'].angle.end = curAngle + 15;
                                        this.emitterDroplets['StarCritical'].emitParticleAt(posFruit.x, posFruit.y);

                                        this.emitterDroplets2[fruit.droplets].emitParticleAt(posFruit.x, posFruit.y);
                                    } else {
                                        if (fruit.id != 'AppleGreen') {
                                            let curAngle = -sliceDirection;
                                            this.emitterDroplets[fruit.droplets].angle.start = curAngle - 15;
                                            this.emitterDroplets[fruit.droplets].angle.end = curAngle + 15;
                                            this.emitterDroplets[fruit.droplets].emitParticleAt(posFruit.x, posFruit.y);

                                            // this.emitterDroplets[fruit.droplets].texture.key = 'CrossRed';
                                            // console.log(this.emitterDroplets[fruit.droplets]);
                                        }
                                        this.emitterDroplets2[fruit.droplets].emitParticleAt(posFruit.x, posFruit.y);
                                    }





                                    let nSplat = Phaser.Math.Between(fruit.minSplash, fruit.maxSplash);
                                    if (fruit.critical) {
                                        nSplat = fruit.splash.length;
                                    }
                                    let possibleSplash = [];
                                    for (let a = 0; a < fruit.splash.length; a++) {
                                        possibleSplash.push(a);
                                        if (a != 0) {
                                            fruit.splash[a].position.set(fruit.splash[0].position.x, fruit.splash[0].position.y, fruit.splash[0].position.z);
                                        }
                                        if (fruit.critical) {
                                            //console.log(fruit.splash[a].material.color);
                                            fruit.splash[a].material.color.setHex(0x1A5F90);
                                        } else {
                                            fruit.splash[a].material.color.setHex(fruit.splashColor);
                                        }
                                        fruit.splash[a].material.color.alpha = 0;
                                        //fruit.splash[a].material.opacity = 1;

                                    }

                                    let sfxName = fruit.impactSFX;
                                    if (sfxName.includes('Wet')) {
                                        let rand = Phaser.Math.Between(1, 3);
                                        sfxName += ('' + rand);
                                    }
                                    if (!this.scene.SFXMuted) {
                                        this.scene.sound.play(sfxName);
                                    }

                                    // let me = this;
                                    if (this.scene.gameState == 2) {
                                        fruit.deactivateTimerSlice = 4000;
                                    } else {
                                        // setTimeout(function(){ me.deactivate(fruit); }, 3000);  
                                        fruit.deactivateTimerSlice = 3000;
                                    }



                                    let tmpArr = [];
                                    for (let a = 0; a < nSplat; a++) {
                                        let idx = Phaser.Math.Between(0, possibleSplash.length - 1);
                                        let splashId = possibleSplash[idx];
                                        possibleSplash.splice(idx, 1);

                                        fruit.splash[splashId].visible = true;
                                        if (splashId == 6 || splashId == 7) {
                                            fruit.splash[splashId].rotation.set(0, 0, sliceDirection * Math.PI / 180);
                                        }

                                        let tmp = fruit.splash[splashId].material.color;
                                        fruit.splash[splashId].material.color.alpha = 1;
                                        fruit.splash[splashId].material.opacity = 1;

                                        this.scene.tweens.add({
                                            targets: tmp,
                                            alpha: 0,
                                            delay: 2000,
                                            onUpdate: () => {
                                                fruit.splash[splashId].material.opacity = tmp.alpha;
                                            }
                                        });
                                        let tmpPos = fruit.splash[splashId].position;
                                        if (splashId == 6 || splashId == 7) {
                                            let xGeser = Math.cos(sliceDirection * Math.PI / 180) / 2;
                                            let yGeser = Math.sin(sliceDirection * Math.PI / 180) / 2;
                                            tmpPos.x += xGeser;
                                            tmpPos.y += yGeser;

                                        } else {
                                            tmpPos.x += Phaser.Math.Between(-2, 2) * 5 / 40;
                                            tmpPos.y += Phaser.Math.Between(-2, 2) * 5 / 40;
                                            this.scene.tweens.add({
                                                targets: tmpPos,
                                                y: '-=0.08',
                                                duration: 1000,
                                                delay: 2000,
                                                onUpdate: () => {
                                                    fruit.splash[splashId].position.set(tmpPos.x, tmpPos.y, tmpPos.z)

                                                }
                                            });
                                        }

                                    }

                                } else {
                                    if (this.scene.gameState == 2) {
                                        fruit.deactivateTimerSlice = 4000;
                                    } else {
                                        // setTimeout(function(){ me.deactivate(fruit); }, 3000);  
                                        fruit.deactivateTimerSlice = 3000;
                                    }
                                    let posFruit = this.scene.third.transform.from3dto2d(fruit.object.position);

                                    fruit.critical = false;
                                    if (this.scene.gameState == 2 && (Phaser.Math.Between(1, 100) <= 12)) {
                                        // console.log(fruit.object.getObjectByName(fruit.id+'Half1'));
                                        this.scene.showCriticalText(posFruit.x, posFruit.y);
                                        fruit.critical = true;
                                        fruit.criticalTrailHalf1.setOn();
                                        fruit.criticalTrailHalf2.setOn();
                                        // let body = fruit.object.body
                                        // body.applyForce(2000,2000,200);
                                        // body.setAngularVelocity(1,0,1);
                                    }

                                    if (fruit.critical) {
                                        let curAngle = -sliceDirection;
                                        this.emitterDroplets['StarCritical'].angle.start = curAngle - 15;
                                        this.emitterDroplets['StarCritical'].angle.end = curAngle + 15;
                                        this.emitterDroplets['StarCritical'].emitParticleAt(posFruit.x, posFruit.y);
                                    }

                                    let sfxName = fruit.impactSFX;
                                    if (sfxName.includes('Wet')) {
                                        let rand = Phaser.Math.Between(1, 3);
                                        sfxName += ('' + rand);
                                    }
                                    if (!this.scene.SFXMuted) {
                                        this.scene.sound.play(sfxName);
                                    }
                                }
                                let me = this;
                                fruit.object.rotation.x = 0;
                                fruit.object.rotation.y = 0;
                                fruit.object.rotation.z = (sliceDirection) * Math.PI / 180;
                                fruit.object.body.setAngularVelocity(0, 0, 0);
                                fruit.object.traverse(function(child) {

                                    if (child.isMesh) {
                                        if (child.name.includes("Whole") || child.name.includes("whole")) {
                                            child.visible = false;
                                        }

                                        if (child.name.includes("Half") || child.name.includes("half")) {

                                            child.visible = true;

                                            child.rotation.x = -Math.PI / 2;
                                            child.rotation.z = 0;
                                            child.position.set(0, 0, 10);
                                            child.critical = fruit.critical;

                                            // me.scene.third.physics.add.existing(child,{shape: 'convexMesh'});
                                            child.body.needUpdate = true;

                                            // console.log(child);
                                            // child.body.setCollisionFlags(4);
                                            // let force = 100;
                                            // if(child.name.includes("Half1") || child.name.includes("half1")){
                                            //   child.body.applyForce(200/me.frustumSizeChanger,force/me.frustumSizeChanger,-20/me.frustumSizeChanger);
                                            //   child.body.setAngularVelocity(1,0,1);
                                            // }else{
                                            //   child.body.applyForce(-200/me.frustumSizeChanger,force/me.frustumSizeChanger,-20/me.frustumSizeChanger);
                                            //   child.body.setAngularVelocity(-1,0,-1);
                                            // }
                                        }

                                    }

                                });

                            }

                            fruit.object.body.physics.setGravity(0, -2, 0);
                            return fruit.critical ? 2 : 1;

                        }
                        return -1;

                    }

                    activate(fruit) {
                        fruit.object.body.setVelocity(0, 0, 0)
                        fruit.object.body.setAngularVelocity(0, 0, 0);
                        fruit.object.body.setRotation(0, 0, 0);
                        if (this.scene.gameState == 2) {
                            fruit.object.body.setCollisionFlags(4);
                        }
                        // fruit.object.body.setCollisionFlags(4);
                        fruit.object.visible = true;

                        fruit.shadow.position.x = fruit.object.position.x - 0.0825;
                        fruit.shadow.position.y = fruit.object.position.y - 0.125;
                        fruit.fruitTrail.setPosition(fruit.object.position.x, fruit.object.position.y - 0.08);
                        fruit.fruitTrail.setOn();
                        if (fruit.id == 'Bomb' || fruit.id == 'BUI') {
                            fruit.theBombTrail.setPosition(fruit.object.position.x, fruit.object.position.y + 0.08);
                            fruit.theBombTrail.setOn();

                            fruit.fruitTrail.setPosition(fruit.object.position.x - 0.065, fruit.object.position.y + 0.03);
                        }

                        fruit.shadow.visible = true;

                        let me = this;

                        fruit.object.traverse(function(child) {

                            if (child.isMesh) {
                                if (child.name.includes("Whole") || child.name.includes("whole")) {
                                    child.visible = true;
                                }

                                if (child.name.includes("Half") || child.name.includes("half")) {

                                    child.visible = false;
                                }

                            }
                        });
                        fruit.sliced = false;
                        fruit.active = true
                        if (fruit.hasSplash) {
                            fruit.splash[0].material.color.alpha = fruit.splash[0].material.color.baseAlpha;
                            fruit.splash[0].material.opacity = fruit.splash[0].material.color.alpha;
                        }
                    }

                    deactivate(fruit) {
                        if (fruit.preventDeactivate) {
                            return;
                        }
                        fruit.object.body.setCollisionFlags(6)
                        fruit.object.visible = false;
                        fruit.critical = false;
                        fruit.shadow.position.x = -100;
                        // fruit.object.position.y = -100;
                        fruit.object.body.setVelocity(0, 0, 0);
                        fruit.object.body.setAngularVelocity(0, 0, 0);
                        fruit.object.position.set(0, -1.95, 0);

                        fruit.active = false
                        fruit.willActive = false;
                        fruit.needUpdate = true;
                        if (fruit.hasSplash) {
                            for (let a = 0; a < fruit.splash.length; a++) {
                                fruit.splash[a].visible = false;
                            }

                        }
                        if (fruit.id == 'Bomb' || fruit.id == 'BUI') {
                            this.bombFuse.stop();
                            fruit.fruitTrail.setOff();
                            fruit.theBombTrail.setOff();
                        } else {
                            fruit.fruitTrail.setOff();
                            fruit.criticalTrailHalf1.setOff();
                            fruit.criticalTrailHalf2.setOff();
                        }

                        let me = this;
                        fruit.object.traverse(function(child) {

                            if (child.isMesh) {
                                if (child.name.includes("Whole") || child.name.includes("whole")) {
                                    child.visible = true;
                                }

                                if (child.name.includes("Half") || child.name.includes("half")) {

                                    child.visible = false;
                                    if (child.body) {
                                        child.body.setVelocity(0, 0, 0)
                                        child.body.setAngularVelocity(0, 0, 0);
                                        child.body.setRotation(0, 0, 0);

                                        // me.scene.third.physics.destroy(child.body);
                                        child.body.setCollisionFlags(6)
                                        // child.body = undefined;

                                        if (child.name.includes("Half1") || child.name.includes("half1")) {
                                            child.position.x = 0;
                                            child.position.y = 0;
                                            child.position.z = 0;

                                            child.rotation.x = 0;
                                            child.rotation.y = 0;
                                            child.rotation.z = 0;
                                        } else {
                                            child.position.x = 0;
                                            child.position.y = 0;
                                            child.position.z = 0;

                                            child.rotation.x = 0;
                                            child.rotation.y = 0;
                                            child.rotation.z = 0;
                                        }

                                    }
                                }

                            }
                        });

                        if (!fruit.sliced && fruit.id != 'Bomb' && fruit.id != 'BUI') {
                            let posX = this.scene.third.transform.from3dto2d(fruit.object.position).x;
                            if (fruit.pastScreen) {
                                this.scene.loseLife(posX);
                            }

                            if (this.scene.gameState == 3) {
                                this.fruitToSpawnList = [];
                            }
                        }
                    }

                    update(delta) {

                        // for(let a=0;a<this.fruitNeedUpdate.length;a++){
                        //   let f = this.fruitNeedUpdate[a];

                        // f.object.position.set(f.newPosX,-1.95,f.newPosZ);
                        // f.object.body.needUpdate = true;
                        // setTimeout(()=>{f.object.body.needUpdate = true;},100);
                        // setTimeout(function (){
                        //   f.object.body.needUpdate = true;
                        //   console.log('needupdate: '+f.id);
                        // },100);
                        // console.log('needupdate: '+this.fruitNeedUpdate[a].id);
                        // }
                        //      this.fruitNeedUpdate = [];

                        if (this.scene.gameState == 2 && !this.scene.hitBomb) {
                            for (let a = 0; a < this.fruitToSpawnList.length; a++) {
                                let obj = this.fruitToSpawnList[a];
                                obj.delay -= delta;
                                if (obj.delay <= 0) {
                                    this.spawnFruit(obj.toSpawn, obj.z, obj.x);
                                }
                            }

                            var newArr = [];
                            for (let a = 0; a < this.fruitToSpawnList.length; a++) {
                                let obj = this.fruitToSpawnList[a];
                                if (obj.delay > 0) {
                                    newArr.push(obj);
                                }
                            }
                            this.fruitToSpawnList = newArr;

                        }

                        this.listFruits.forEach(fruit => {

                            if (fruit.id == 'Bomb' || fruit.id == 'BUI') {
                                let curRot = fruit.object.rotation.z - Math.PI / 2;
                                let moveX = Math.cos(curRot) * 0.21;
                                let moveY = Math.sin(curRot) * 0.21;
                                fruit.theBombTrail.setPosition(fruit.object.position.x - moveX, fruit.object.position.y - moveY);
                                fruit.theBombTrail.Step(delta / 1000.0);

                                fruit.fruitTrail.setPosition(fruit.object.position.x - moveX, fruit.object.position.y - moveY);
                                fruit.fruitTrail.Step(delta / 1000.0);
                            } else {
                                fruit.fruitTrail.Step(delta / 1000.0);

                                fruit.criticalTrailHalf1.Step(delta / 1000.0);
                                fruit.criticalTrailHalf2.Step(delta / 1000.0);
                            }
                            if (fruit.active) {
                                // fruit.needUpdate = true;
                                if (this.scene.gameState == -1 || this.scene.gameState == 0 || this.scene.gameState == 3 || this.scene.gameState == 4) {
                                    // fruit.object.body.setCollisionFlags(6);

                                    if (fruit.id == 'BUI' || fruit.id == 'WMUI' || fruit.id == 'KWUI' || fruit.id == 'AGUI') {
                                        fruit.object.position.set(fruit.uiPosX, fruit.uiPosY, 0);
                                    }
                                    // fruit.object.body.setCollisionFlags(4);
                                    // console.log('repos: '+fruit.uiPosX+', '+fruit.uiPosY);
                                }
                                if (this.bombHit) {
                                    fruit.object.body.physics.setGravity(0, 0, 0);
                                    fruit.object.body.setVelocity(0, 0, 0);
                                }

                                if (fruit.object.position.y > -1.9) {
                                    fruit.pastScreen = true;
                                }

                                if (fruit.sliced) {
                                    fruit.deactivateTimerSlice -= delta;
                                    let canDeactivate = fruit.deactivateTimerSlice <= 0;

                                    if (canDeactivate) {
                                        this.deactivate(fruit);
                                    }
                                }

                                if (fruit.object.position.y < -2) {
                                    if (!fruit.sliced) {
                                        this.deactivate(fruit);
                                    }
                                } else {
                                    fruit.fruitTrail.setPosition(fruit.object.position.x, fruit.object.position.y - 0.08)

                                    if (fruit.sliced) {
                                        let half1 = fruit.object.getObjectByName(fruit.id + 'Half1');
                                        let half2 = fruit.object.getObjectByName(fruit.id + 'Half2');
                                        if (half1 && half2) {
                                            // console.log(half1);
                                            half1.getWorldPosition(this.helperVec3);
                                            fruit.criticalTrailHalf1.setPosition(this.helperVec3.x, this.helperVec3.y - 0.08)
                                            half2.getWorldPosition(this.helperVec3);
                                            fruit.criticalTrailHalf2.setPosition(this.helperVec3.x, this.helperVec3.y - 0.08)
                                            // console.log(posHalf2);


                                        }
                                    }

                                    fruit.shadow.position.x = fruit.object.position.x - 0.0825;
                                    fruit.shadow.position.y = fruit.object.position.y - 0.125;

                                    if (fruit.hasSplash && !fruit.splash[0].visible) {
                                        fruit.splash[0].position.x = fruit.object.position.x;
                                        fruit.splash[0].position.y = fruit.object.position.y;

                                    }

                                }
                            }
                        })
                    }

                    positionWaterMelonUI() {
                        let watermelon;
                        this.listFruits.forEach(fruit => {

                            if (fruit.id == 'WMUI') {
                                watermelon = fruit;
                            }
                        });
                        if (watermelon) {
                            this.deactivate(watermelon);
                            watermelon.object.position.set(0, -64 / this.frustumSizeChanger, 10 / this.frustumSizeChanger);
                            watermelon.splash[0].position.x = watermelon.object.position.x;
                            watermelon.splash[0].position.y = watermelon.object.position.y;
                            watermelon.uiPosX = 0;
                            watermelon.uiPosY = -64 / this.frustumSizeChanger;
                            let ss = 0; //0.85
                            watermelon.object.visible = true;

                            watermelon.object.traverse(function(child) {

                                if (child.isMesh) {
                                    if (child.name.includes("Whole") || child.name.includes("whole")) {
                                        child.visible = true;
                                        child.scale.set(ss, ss, ss);
                                    }

                                    if (child.name.includes("Half") || child.name.includes("half")) {

                                        child.visible = false;
                                        child.scale.set(ss, ss, ss);
                                    }

                                }
                            });
                            watermelon.object.body.needUpdate = true;
                            return true;
                        }
                        return false;

                    }

                    forcePositionWaterMelonUI() {
                        let watermelon;
                        this.listFruits.forEach(fruit => {

                            if (fruit.id == 'Watermelon') {
                                watermelon = fruit;
                            }
                        });
                        if (watermelon) {
                            watermelon.object.position.set(0, -64 / this.frustumSizeChanger, 10 / this.frustumSizeChanger);
                            watermelon.splash[0].position.x = watermelon.object.position.x;
                            watermelon.splash[0].position.y = watermelon.object.position.y;
                            watermelon.object.visible = true;
                            watermelon.object.traverse(function(child) {

                                if (child.isMesh) {
                                    if (child.name.includes("Whole") || child.name.includes("whole")) {
                                        child.visible = true;
                                    }

                                }
                            });
                        }

                    }

                    getFruit(id) {
                        let res;
                        this.listFruits.forEach(fruit => {
                            if (fruit.id == id) {
                                res = fruit;
                            }
                        });
                        return res;
                    }

                    resetWaterMelonUI(id = 'Watermelon') {
                        let watermelon;
                        this.listFruits.forEach(fruit => {

                            if (fruit.id == id) {
                                watermelon = fruit;
                            }
                        });

                        if (watermelon) {
                            watermelon.preventDeactivate = false;
                            let ss = 1;
                            watermelon.object.traverse(function(child) {

                                if (child.isMesh) {
                                    if (child.name.includes("Whole") || child.name.includes("whole")) {
                                        child.visible = false;
                                        child.scale.set(ss, ss, ss);
                                    }

                                    if (child.name.includes("Half") || child.name.includes("half")) {

                                        child.visible = false;
                                        child.scale.set(ss, ss, ss);
                                    }

                                    if (child.name.includes("Bomb") || child.name.includes("bomb")) {

                                        child.scale.set(ss, ss, ss);
                                    }

                                }
                            });

                            let me = this;
                            if (watermelon.sliced) {} else {
                                this.deactivate(watermelon);
                            }

                        }

                    }

                    positionFruitUI(id, posX, posY, scaleSize) {
                        let watermelon;
                        this.listFruits.forEach(fruit => {

                            if (fruit.id == id) {
                                watermelon = fruit;
                            }
                        });
                        if (watermelon) {
                            this.deactivate(watermelon);
                            watermelon.preventDeactivate = true;
                            if (id != 'Bomb' && id != 'BUI') {
                                watermelon.fruitTrail.setOff();
                            }

                            watermelon.object.position.set(posX * 32 / this.frustumSizeChanger, posY * 32 / this.frustumSizeChanger, 10 / this.frustumSizeChanger);
                            if (id == 'Bomb' || id == 'BUI') {
                                watermelon.object.rotation.set(0, 0.523, -0.523);

                            }

                            if (watermelon.hasSplash) {
                                watermelon.splash[0].position.x = watermelon.object.position.x;
                                watermelon.splash[0].position.y = watermelon.object.position.y;
                            }

                            // let ss = scaleSize;
                            let ss = 0;
                            watermelon.object.visible = true;
                            let me = this;
                            watermelon.uiPosX = posX * 32 / this.frustumSizeChanger;
                            watermelon.uiPosY = posY * 32 / this.frustumSizeChanger;

                            watermelon.object.traverse(function(child) {

                                if (child.isMesh) {
                                    if (child.name.includes("Whole") || child.name.includes("whole")) {
                                        child.visible = true;
                                        child.scale.set(ss, ss, ss);
                                    }

                                    if (child.name.includes("Half") || child.name.includes("half")) {

                                        child.visible = false;
                                        child.scale.set(ss, ss, ss);
                                    }

                                    if (child.name.includes("Bomb") || child.name.includes("bomb")) {
                                        me.scene.tweens.addCounter({
                                            from: 0,
                                            to: 360,
                                            duration: 7000,
                                            loop: -1,
                                            onUpdate: (tween) => {
                                                const value = Math.floor(tween.getValue());
                                                child.rotation.set(0, value / 180 * Math.PI, 0);
                                            }
                                        });
                                        child.scale.set(ss, ss, ss);
                                    }

                                }
                            });

                            watermelon.object.body.needUpdate = true;
                            return true;
                        }
                        return false;

                    }

                    getListFruits() {
                        return this.listFruits;
                    }

                }
                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__( /*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

            /***/
        }),

    /***/
    "./src/scripts/gameobjects/SliceCriticalEffect.js":
        /*!********************************************************!*\
          !*** ./src/scripts/gameobjects/SliceCriticalEffect.js ***!
          \********************************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return SliceCriticalEffect;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);


            class SliceCriticalEffect extends Phaser.GameObjects.Container {
                constructor(scene, x, y) {
                    super(scene, x, y);
                    scene.add.existing(this);
                    this.scene = scene;

                    this.sliceAtas = this.scene.add.image(0, 0, 'SliceDiamondCritical');
                    this.sliceBawah = this.scene.add.image(0, 0, 'SliceDiamondCritical');
                    this.sliceAtas.setOrigin(0.5, 0.5);
                    this.sliceBawah.setOrigin(0.5, 0.5);

                    this.add(this.sliceAtas);
                    this.add(this.sliceBawah);

                    this.deactivate();
                }

                activate() {
                    this.visible = true;
                    this.scaleY = 1;
                    this.scaleX = 1;
                    this.alpha = 1;
                    this.scene.tweens.add({
                        targets: this,
                        scaleY: 3.0,
                        // alpha: 1,
                        // yoyo: true,
                        duration: 100,
                        onComplete: () => {

                            this.sliceAtas.angle = 45;
                            this.sliceBawah.angle = -45;

                            this.scene.tweens.add({
                                targets: this,
                                scaleY: 0,
                                scaleX: 0,
                                // alpha: 1,
                                // yoyo: true,
                                duration: 200,
                                onComplete: () => {
                                    this.deactivate();
                                }
                            });
                        }
                    });
                }

                deactivate() {
                    this.visible = false;
                    this.alpha = 1;
                    //this.destroy();
                    // this.alpha = 0;
                }


            }

            /***/
        }),

    /***/
    "./src/scripts/gameobjects/SliceEffect.js":
        /*!************************************************!*\
          !*** ./src/scripts/gameobjects/SliceEffect.js ***!
          \************************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return SliceEffect;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);


            class SliceEffect extends Phaser.GameObjects.Image {
                constructor(scene, x, y, texture, frame) {
                    super(scene, x, y, texture, frame);
                    scene.add.existing(this);
                    this.scene = scene;

                    this.deactivate();
                }

                activate() {
                    this.visible = true;
                    this.scaleY = 1;
                    this.scaleX = 1;
                    this.alpha = 1;
                    this.scene.tweens.add({
                        targets: this,
                        scaleY: 2.0,
                        // alpha: 1,
                        // yoyo: true,
                        duration: 100,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                scaleY: 0,
                                // alpha: 1,
                                // yoyo: true,
                                duration: 100,
                                onComplete: () => {
                                    this.deactivate();
                                }
                            });
                        }
                    });
                }

                activateSplash() {
                    this.visible = true;
                    this.scaleY = 1;
                    this.scaleX = 1;
                    this.alpha = 1;
                    this.scene.tweens.add({
                        targets: this,
                        scaleY: 1.3,
                        scaleX: 2.3,
                        // alpha: 0,
                        // yoyo: true,
                        duration: 100,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                alpha: 0,
                                scaleY: 1.95,
                                scaleX: 3.45,
                                // yoyo: true,
                                duration: 200,
                                onComplete: () => {
                                    this.deactivate();
                                }
                            });
                        }
                    });
                }

                deactivate() {
                    this.visible = false;
                    this.alpha = 1;
                    //this.destroy();
                    // this.alpha = 0;
                }


            }

            /***/
        }),

    /***/
    "./src/scripts/scenes/mainScene.js":
        /*!*****************************************!*\
          !*** ./src/scripts/scenes/mainScene.js ***!
          \*****************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return MainScene;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);

            //import {FruitFactory}

            var canShowClassic = true;

            class MainScene extends _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["Scene3D"] {
                constructor() {
                    super({
                        key: 'MainScene'
                    })
                }

                init() {
                    //this.accessThirdDimension();
                    this.gameWidth = this.cameras.main.width;
                    this.gameHeight = this.cameras.main.width;
                    this.cameras.main.setBackgroundColor('#000000');
                    this.frustumSizeChanger = 6;

                    const frustumSize = 12 / this.frustumSizeChanger; //768/2 = 384, for height/2 size
                    const aspect = this.cameras.main.width / this.cameras.main.height
                    this.accessThirdDimension({
                        camera: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].OrthographicCamera((frustumSize * aspect) / -2, (frustumSize * aspect) / 2, frustumSize / 2, frustumSize / -2, 0.1, 1000),
                        gravity: {
                            x: 0,
                            y: -2,
                            z: 0
                        }
                    })
                    this.timerCombo = 0;
                    this.comboCount = 0;
                    // this.third.renderer.setClearColorHex( 0x000000, 1 );
                    //this.third.background = new THREE.Color( 0xff0000 );
                }

                preload() {
                    this.third.load.preload('dojo_tex', 'assets/textures/Dojo_Basic.png');
                    this.third.load.preload('fruits_tex', 'assets/textures/FruitAtlas.png');
                    this.third.load.preload('fruit_shadow', 'assets/textures/Fruit_shadow.png');
                    this.third.load.preload('bomb_tex', 'assets/textures/BombRedCross.png');
                    this.third.load.preload('bomb_ray_tex', 'assets/effects/BombRay.png');
                    this.third.load.preload('splash_tex', 'assets/textures/splat12.png');
                    this.third.load.preload('splash2_tex', 'assets/textures/splat14.png');
                    this.third.load.preload('splash3_tex', 'assets/textures/splat11.png');
                    this.third.load.preload('splash4_tex', 'assets/textures/splat13.png');
                    this.third.load.preload('FruitTrail', 'assets/textures/particles/FruitTrail.png');
                    this.third.load.preload('CriticalTrail', 'assets/textures/particles/Star.png');
                    this.third.load.preload('BombTrail', 'assets/textures/particles/Spark01.png');
                    this.third.load.preload('BombSmoke', 'assets/textures/particles/SmokeYellow.png');

                    this.third.load.preload('SplashSlice1', 'assets/textures/SplashSlice.png');
                    this.third.load.preload('SplashSlice2', 'assets/textures/SplashSlice2.png');

                    this.third.load.preload('classic_ring_tex', 'assets/textures/FruitRingClassic.png');
                    this.third.load.preload('settings_ring_tex', 'assets/textures/FruitRingPurple.png');
                    this.third.load.preload('shadow_ring_tex', 'assets/textures/FruitRingShadow.png');

                    this.third.load.preload('quit_ring_tex', 'assets/textures/FruitRingQuit.png');
                    this.third.load.preload('retry_ring_tex', 'assets/textures/FruitRingRetry.png');
                    this.third.load.preload('back_ring_tex', 'assets/textures/FruitRingBack.png');


                    const FruitFactory = __webpack_require__( /*! ./../gameobjects/FruitFactory.js */ "./src/scripts/gameobjects/FruitFactory.js").default;
                    this.fruitFactory = new FruitFactory(this);
                    // this.third.load.preload('logo_tex', 'assets/textures/LogoLarge.png');

                    // this.points = [];

                    this.testBlade = this.add.container(0, 0);

                    this.gameData = {
                        score: 0,
                        best: 0
                    };
                }

                async create() {
                    this.gameState = -2;
                    this.hitBomb = false;
                    this.startLedakan = false;
                    this.showCredit = false;
                    this.holdCheckUI = false;
                    this.homeAnimation = false;

                    this.homescreenBgm = this.sound.add('MusicMenu', {
                        loop: 1
                    });
                    this.gameplayBgm = this.sound.add('AmbArenaClassicLP', {
                        loop: 1
                    });
                    this.homescreenBgm.play({
                        loop: 1
                    });

                    //SETUP INPUT
                    this.input.on("pointerdown", this.OnPointerDown, this);
                    this.input.on("pointermove", this.OnPointerMove, this);
                    this.input.on("pointerup", this.OnPointerUp, this);

                    //SETUP SCENE + CAMERA
                    this.third.warpSpeed('light', 'camera', 'sky')
                    this.third.camera.position.set(0, 0, 200)
                    //====================


                    // let arrbuffer = this.cache.binary.get('WatermelonText');
                    // let viewBuffer = new Uint8Array(arrbuffer);
                    // for (let a = 0;a<viewBuffer.length;a++){
                    //     viewBuffer[a] ^= 127;
                    // }
                    // console.log(viewBuffer);
                    // arrbuffer = viewBuffer.buffer;
                    // console.log(arrbuffer);
                    // let resParse = this.third.load.fbxLoader.parse(arrbuffer,'');
                    // console.log('parse: ');
                    // console.log(resParse);

                    // let resParse2 = this.third.load.fbxLoader.parse(arrbuffer,'');
                    // console.log('parse: ');
                    // console.log(resParse);
                    // this.wm1 = resParse;
                    // this.wm2 = resParse2;

                    //ADJUSTING LIGHTS
                    const intensity = 0.2;
                    const hemisphereLight = this.third.lights.hemisphereLight({
                        skyColor: 0xffffff,
                        groundColor: 0x000000,
                        intensity
                    });
                    const ambientLight = this.third.lights.ambientLight({
                        color: 0xffffff,
                        intensity
                    });
                    const directionalLight = this.third.lights.directionalLight({
                        color: 0xffffff,
                        intensity
                    });
                    directionalLight.position.set(0, 0, 0);
                    const d = 10;
                    directionalLight.shadow.camera.top = d;
                    directionalLight.shadow.camera.bottom = -d;
                    directionalLight.shadow.camera.left = -d;
                    directionalLight.shadow.camera.right = d;
                    directionalLight.shadow.mapSize.set(1024, 1024);
                    // this.directionalLight = light
                    const lights = {
                        // ambientLight
                        directionalLight
                        // hemisphereLight
                    };
                    this.third.lights = lights;
                    // this.third.lights.directionalLight.intensity = 0;
                    // this.third.lights.ambientLight.intensity = 0;
                    // this.third.lights.hemisphereLight.intensity = 0;
                    // this.third.lights.pointLight.intensity = 0;
                    // this.third.lights.rectAreaLight.intensity = 0;
                    // this.third.lights.spotLight.intensity = 0;
                    //==================================

                    // await this.fruitFactory.letMeFinish();

                    //CREATE BACKGROUND DOJO
                    const textureDojo = await this.third.load.texture('dojo_tex')
                    textureDojo.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    textureDojo.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    const material = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshLambertMaterial({
                        map: textureDojo
                    })
                    const plane = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(22 / this.frustumSizeChanger, 22 / this.frustumSizeChanger), material)
                    plane.position.z = -700
                    this.third.add.existing(plane)
                    //==========


                    const Blade = __webpack_require__( /*! ./../gameobjects/Blade.js */ "./src/scripts/gameobjects/Blade.js").default;
                    this.blade = new Blade(this);
                    this.startTimer = 0.75;

                    // const Blade = require('./../gameobjects/Blade.js').default;
                    //this.blade = new Blade(this,384,640,'blade_basic');
                    //this.blade = this.add.image(384,640,'blade_basic');
                    // adds a box
                    // this.third.add.box({ x: 1, y: 2 })

                    // adds a box with physics
                    // this.third.physics.add.box({ x: -1, y: 2 })

                    // throws some random object on the scene
                    // this.third.haveSomeFun()

                    //FRUIT POOL
                    // this.fruitPool = [];
                    // for(var i=0;i<fruitList.length;i++){
                    //   this.fruitPool.push([]);
                    // }
                }

                async contLoad() {
                    // this.gameState
                    // console.log('aaa');
                    await this.resumeLoad();
                }

                async resumeLoad() {
                    // console.log('bbb');
                    //CREATE RING UI

                    const Button = __webpack_require__( /*! ./../utils/Button.js */ "./src/scripts/utils/Button.js").default;

                    const textureRing = await this.third.load.texture('classic_ring_tex')
                    textureRing.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    textureRing.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    const materialRing = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                        map: textureRing
                    })
                    materialRing.transparent = true;
                    this.planeRing = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(5.12 / this.frustumSizeChanger, 5.12 / this.frustumSizeChanger), materialRing)
                    this.planeRing.position.z = -499;
                    this.planeRing.position.y = -2 / this.frustumSizeChanger;
                    this.third.add.existing(this.planeRing)
                    this.planeRing.angle = 0;

                    this.planeRing.scale.x = 0;
                    this.planeRing.scale.y = 0;
                    this.planeRing.scale.z = 0;
                    let tmp = this.planeRing;
                    this.tweens.add({
                        targets: tmp,
                        angle: 360,
                        loop: -1,
                        // y: '-=0.5',
                        duration: 20000,
                        onUpdate: () => {
                            // console.log(tmp.angle);
                            this.planeRing.rotation.z = tmp.angle / 180 * Math.PI;
                            // fruit.splash.position.set(tmp.x, tmp.y, tmp.z)
                        }
                    });


                    const textureShadowRing = await this.third.load.texture('shadow_ring_tex')
                    textureShadowRing.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    textureShadowRing.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    const materialShadowRing = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                        map: textureShadowRing
                    })
                    materialShadowRing.transparent = true;
                    this.planeShadowRing = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(5.12 / this.frustumSizeChanger, 5.12 / this.frustumSizeChanger), materialShadowRing)
                    this.planeShadowRing.position.z = -500;
                    this.planeShadowRing.position.x = (0.2) / this.frustumSizeChanger;
                    this.planeShadowRing.position.y = (-0.2 - 2) / this.frustumSizeChanger;
                    this.third.add.existing(this.planeShadowRing)

                    this.planeShadowRing.scale.x = 0;
                    this.planeShadowRing.scale.y = 0;
                    this.planeShadowRing.scale.z = 0;

                    //CREATE RING Settings
                    const textureRingSettings = await this.third.load.texture('settings_ring_tex')
                    textureRingSettings.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    textureRingSettings.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    const materialRingSettings = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                        map: textureRingSettings
                    })
                    materialRingSettings.transparent = true;
                    this.planeRingSettings = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(4.12 / this.frustumSizeChanger, 4.12 / this.frustumSizeChanger), materialRingSettings)
                    this.planeRingSettings.position.z = -499;
                    this.planeRingSettings.position.y = 0;
                    this.planeRingSettings.position.x = 5.5 / this.frustumSizeChanger;
                    this.third.add.existing(this.planeRingSettings)
                    this.planeRingSettings.angle = 0;
                    let tmpSettings = this.planeRingSettings;
                    this.tweens.add({
                        targets: tmpSettings,
                        angle: 360,
                        loop: -1,
                        // y: '-=0.5',
                        duration: 20000,
                        onUpdate: () => {
                            // console.log(tmp.angle);
                            this.planeRingSettings.rotation.z = tmpSettings.angle / 180 * Math.PI;
                            // fruit.splash.position.set(tmp.x, tmp.y, tmp.z)
                        }
                    });

                    this.planeShadowRingSettings = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(4.12 / this.frustumSizeChanger, 4.12 / this.frustumSizeChanger), materialShadowRing)
                    this.planeShadowRingSettings.position.z = -500;
                    this.planeShadowRingSettings.position.x = (0.2 + 5.5) / this.frustumSizeChanger;
                    this.planeShadowRingSettings.position.y = (-0.2) / this.frustumSizeChanger;
                    this.third.add.existing(this.planeShadowRingSettings)

                    this.planeRingSettings.scale.x = 0;
                    this.planeRingSettings.scale.y = 0;
                    this.planeRingSettings.scale.z = 0;
                    this.planeShadowRingSettings.scale.x = 0;
                    this.planeShadowRingSettings.scale.y = 0;
                    this.planeShadowRingSettings.scale.z = 0;

                    // this.planeRingSettings.visible = false;
                    // this.planeShadowRingSettings.visible = false;

                    //CREATE LOGO
                    // const textureLogo = await this.third.load.texture('logo_tex')
                    // textureLogo.wrapS = THREE.RepeatWrapping
                    // textureLogo.wrapT = THREE.RepeatWrapping
                    // const materialLogo = new THREE.MeshPhongMaterial({ map: textureLogo })
                    // materialLogo.transparent = true;
                    // this.planeLogo = new THREE.Mesh(new THREE.PlaneGeometry(10.24,2.56),materialLogo)
                    // this.planeLogo.position.z = -498;
                    // this.planeLogo.position.y = 4;
                    // this.third.add.existing(this.planeLogo)
                    let blackArea = this.add.image(0, 0, 'blackAreaforTitle');
                    blackArea.alpha = 0.6;
                    blackArea.setOrigin(0, 0);
                    let logoFruit = this.add.image(-10, 40, 'LogoFruit');
                    logoFruit.setOrigin(0, 0);

                    let logoNinja = this.add.image(logoFruit.width - 20, 30 + logoFruit.height, 'LogoNinja');
                    logoNinja.setOrigin(0, 1);
                    logoNinja.setScale(0.7, 0.7);
                    logoNinja.angle = 0;

                    let contBoardSlice = this.add.container(150, blackArea.height - 10);

                    let scrollLockBoard = this.add.image(0, 0, 'ScrollLockBoard');
                    scrollLockBoard.setScale(0.6, 0.6);
                    scrollLockBoard.setOrigin(0.5, 0.5);

                    let textSlice = this.add.text(0, -2, "Tap Fruit\nto begin", {
                        fontFamily: "gangofchinese",
                        fontSize: 30,
                        color: '#5E3C0D',
                        align: 'center'
                    });
                    textSlice.setOrigin(0.5, 0.5);

                    contBoardSlice.add(scrollLockBoard);
                    contBoardSlice.add(textSlice);
                    contBoardSlice.angle = -8;

                    this.buttonClassic = new Button(this, 641, 513, 'ButtonClassic');

                    this.buttonClassic.on('pointerup', function() {
                        this.blade.changeClickedHomeClassic(true);
                    }, this);

                    this.buttonClassic.visible = false;


                    this.buttonSetting = new Button(this, 992, 385, 'MediumButton');

                    this.buttonSetting.on('pointerup', function() {
                        this.blade.changeClickedHomeSetting(true);
                    }, this);

                    this.buttonSetting.visible = false;


                    this.buttonBack = new Button(this, 1120, 607, 'SmallButton');

                    this.buttonBack.on('pointerup', function() {
                        this.blade.changeClickedSettingBack(true);
                        this.buttonBack.visible = false;
                    }, this);

                    this.buttonBack.visible = false;


                    this.buttonQuit = new Button(this, 832, 607, 'MediumSmallButton');

                    this.buttonQuit.on('pointerup', function() {
                        this.blade.changeClickedResultQuit(true);
                        this.buttonQuit.visible = false;
                    }, this);

                    this.buttonQuit.visible = false;


                    this.buttonRetry = new Button(this, 450, 607, 'MediumSmallButton');

                    this.buttonRetry.on('pointerup', function() {
                        this.blade.changeClickedResultRetry(true);
                        this.buttonRetry.visible = false;
                        this.buttonQuit.visible = false;
                    }, this);

                    this.buttonRetry.visible = false;

                    this.topHomescreen = this.add.container(0, -500);
                    this.topHomescreen.add(blackArea);
                    this.topHomescreen.add(logoFruit);
                    this.topHomescreen.add(logoNinja);
                    this.topHomescreen.add(contBoardSlice);


                    //scrollLockBoard.angle = -8

                    //TEXT READY
                    // this.textReady = this.add.text(420, 310, "Ready", { fontFamily: "gangofchinese", fontSize: 150 });
                    this.textReady = this.add.text(420, 560, "Ready", {
                        fontFamily: "gangofchinese",
                        fontSize: 150
                    });
                    this.textReady.setStroke('#8A4F00', 16);
                    let gradient = this.textReady.context.createLinearGradient(0, 0, 0, this.textReady.height);
                    gradient.addColorStop(0, '#FFF210');
                    gradient.addColorStop(1, '#DDA011');
                    this.textReady.setFill(gradient);
                    this.textReady.alpha = 0;

                    //TEXT GO
                    // this.textGo = this.add.text(490, 460, "GO!!", { fontFamily: "gangofchinese", fontSize: 150 });
                    this.textGo = this.add.text(490, 560, "GO!!", {
                        fontFamily: "gangofchinese",
                        fontSize: 150
                    });
                    this.textGo.setStroke('#183930', 16);
                    gradient = this.textReady.context.createLinearGradient(0, 0, 0, this.textGo.height);
                    gradient.addColorStop(0, '#9CE41D');
                    gradient.addColorStop(1, '#69CE21');
                    this.textGo.setFill(gradient);
                    this.textGo.alpha = 0;

                    this.textReady.visible = false;
                    this.textGo.visible = false;

                    //GAMEPLAY UI
                    this.contGameplayUI = this.add.container(0, 0);
                    this.iconScore = this.add.image(10 + 51, 10 + 51, 'HUDWatermelon');
                    this.iconScore.setScale(0.4, 0.4);
                    this.iconScore.setOrigin(0.5, 0.5);
                    this.contGameplayUI.add(this.iconScore);

                    this.textScore = this.add.text(110, 0, "0", {
                        fontFamily: "gangofchinese",
                        fontSize: 105
                    });
                    this.textScore.setStroke('#633700', 8);
                    gradient = this.textScore.context.createLinearGradient(0, 0, 0, this.textScore.height);
                    gradient.addColorStop(0, '#FEF65C');
                    gradient.addColorStop(1, '#EB8D11');
                    this.textScore.setFill(gradient);
                    this.contGameplayUI.add(this.textScore);

                    this.textBest = this.add.text(25, 110, "Best: 0", {
                        fontFamily: "gangofchinese",
                        fontSize: 35
                    });
                    this.textBest.setStroke('#3E1400', 8);
                    gradient = this.textBest.context.createLinearGradient(0, 0, 0, this.textBest.height);
                    gradient.addColorStop(0, '#FCA21E');
                    gradient.addColorStop(1, '#DF7200');
                    this.textBest.setFill(gradient);
                    this.contGameplayUI.add(this.textBest);

                    this.textBestGreen = this.add.text(25, 110, "Best: 0", {
                        fontFamily: "gangofchinese",
                        fontSize: 35
                    });
                    this.textBestGreen.setStroke('#1F4201', 8);
                    gradient = this.textBest.context.createLinearGradient(0, 0, 0, this.textBest.height);
                    gradient.addColorStop(0, '#15F21D');
                    gradient.addColorStop(1, '#17AD0E');
                    this.textBestGreen.setFill(gradient);
                    this.contGameplayUI.add(this.textBestGreen);



                    this.cross3 = this.add.image(1280, 10, 'CrossBlue');
                    this.cross3.setOrigin(1, 0);
                    this.cross3.setScale(0.8359375, 0.8359375);

                    this.cross2 = this.add.image(1170, 10, 'CrossBlue');
                    this.cross2.setOrigin(1, 0);
                    this.cross2.setScale(0.7109375, 0.7109375);

                    this.cross1 = this.add.image(1076, 10, 'CrossBlue');
                    this.cross1.setOrigin(1, 0);
                    this.cross1.setScale(0.5859375, 0.5859375);

                    this.contGameplayUI.add(this.cross1);
                    this.contGameplayUI.add(this.cross2);
                    this.contGameplayUI.add(this.cross3);

                    this.contGameplayUI.y = -200;


                    this.crossList = [this.cross1, this.cross2, this.cross3];
                    this.crossFruitPool = [];
                    this.resetGameplay();


                    this.initResultScreen();
                    //CREATE RING RESULT
                    const textureRingPA = await this.third.load.texture('retry_ring_tex')
                    textureRingPA.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    textureRingPA.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    const materialRingPA = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                        map: textureRingPA
                    })
                    materialRingPA.transparent = true;
                    this.planeRingPA = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(3.62 / this.frustumSizeChanger, 3.62 / this.frustumSizeChanger), materialRingPA)
                    this.planeRingPA.position.z = -499;
                    this.planeRingPA.position.y = -3.5 / this.frustumSizeChanger;
                    this.planeRingPA.position.x = -3 / this.frustumSizeChanger;
                    this.third.add.existing(this.planeRingPA)
                    this.planeRingPA.angle = 0;
                    this.planeRingPA.scale.x = 0;
                    this.planeRingPA.scale.y = 0;
                    this.planeRingPA.scale.z = 0;
                    let tmpPA = this.planeRingPA;
                    this.tweens.add({
                        targets: tmpPA,
                        angle: 360,
                        loop: -1,
                        // y: '-=0.5',
                        duration: 20000,
                        onUpdate: () => {
                            // console.log(tmp.angle);
                            this.planeRingPA.rotation.z = tmpPA.angle / 180 * Math.PI;
                            // fruit.splash.position.set(tmp.x, tmp.y, tmp.z)
                        }
                    });

                    this.planeShadowRingPA = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(3.62 / this.frustumSizeChanger, 3.62 / this.frustumSizeChanger), materialShadowRing)
                    this.planeShadowRingPA.position.z = -500;
                    this.planeShadowRingPA.position.x = (0.2 - 3) / this.frustumSizeChanger;
                    this.planeShadowRingPA.position.y = (-0.2 - 3.5) / this.frustumSizeChanger;
                    this.third.add.existing(this.planeShadowRingPA)
                    this.planeShadowRingPA.scale.x = 0;
                    this.planeShadowRingPA.scale.y = 0;
                    this.planeShadowRingPA.scale.z = 0;

                    this.planeRingPA.visible = false;
                    this.planeShadowRingPA.visible = false;

                    //CREATE RING QUIT
                    const textureRingQuit = await this.third.load.texture('quit_ring_tex')
                    textureRingQuit.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    textureRingQuit.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    const materialRingQuit = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                        map: textureRingQuit
                    })
                    materialRingQuit.transparent = true;
                    this.planeRingQuit = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(3.62 / this.frustumSizeChanger, 3.62 / this.frustumSizeChanger), materialRingQuit)
                    this.planeRingQuit.position.z = -499;
                    this.planeRingQuit.position.y = -3.5 / this.frustumSizeChanger;
                    this.planeRingQuit.position.x = 3 / this.frustumSizeChanger;
                    this.third.add.existing(this.planeRingQuit)
                    this.planeRingQuit.angle = 0;
                    this.planeRingQuit.scale.x = 0;
                    this.planeRingQuit.scale.y = 0;
                    this.planeRingQuit.scale.z = 0;
                    let tmpQuit = this.planeRingQuit;
                    this.tweens.add({
                        targets: tmpQuit,
                        angle: 360,
                        loop: -1,
                        // y: '-=0.5',
                        duration: 20000,
                        onUpdate: () => {
                            // console.log(tmp.angle);
                            this.planeRingQuit.rotation.z = tmpQuit.angle / 180 * Math.PI;
                            // fruit.splash.position.set(tmp.x, tmp.y, tmp.z)
                        }
                    });

                    this.planeShadowRingQuit = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(3.62 / this.frustumSizeChanger, 3.62 / this.frustumSizeChanger), materialShadowRing)
                    this.planeShadowRingQuit.position.z = -500;
                    this.planeShadowRingQuit.position.x = (0.2 + 3) / this.frustumSizeChanger;
                    this.planeShadowRingQuit.position.y = (-0.2 - 3.5) / this.frustumSizeChanger;
                    this.third.add.existing(this.planeShadowRingQuit)
                    this.planeShadowRingQuit.scale.x = 0;
                    this.planeShadowRingQuit.scale.y = 0;
                    this.planeShadowRingQuit.scale.z = 0;

                    this.planeRingQuit.visible = false;
                    this.planeShadowRingQuit.visible = false;

                    this.textGameover = this.add.image(640, 384, 'GOText');
                    this.textGameover.setOrigin(0.5, 0.5);
                    // this.textGameover = this.add.text(640, 384, "Game over", { fontFamily: "gangofchinese", fontSize: 150 });
                    // this.textGameover.setStroke('#000000', 2);
                    // gradient = this.textReady.context.createLinearGradient(0, 0, 0, this.textGameover.height);
                    // gradient.addColorStop(0, '#E51F1D');
                    // gradient.addColorStop(0.5, '#F03736');
                    // gradient.addColorStop(0.5, '#E01C1E');
                    // gradient.addColorStop(1, '#A30F0B');
                    // this.textGameover.setFill(gradient);
                    // this.textGameover.setOrigin(0.5,0.5);
                    this.textGameover.setScale(0, 0);
                    this.textGameover.visible = false;

                    this.glowLedakan = this.add.image(640, 384, 'Glow');
                    this.glowLedakan.visible = false;

                    //LEVEL DESIGN
                    this.waveList = [{
                            id: 1,
                            minWave: 0,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 1,
                            dtScale: 0.9,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['Watermelon'],
                                min: 1,
                                max: 1,
                                between: 0
                            }]
                        },
                        {
                            id: 2,
                            minWave: 1,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 1,
                            dtScale: 0.9,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R'],
                                min: 1,
                                max: 1,
                                between: 0
                            }]
                        },
                        {
                            id: 3,
                            minWave: 2,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 1,
                            dtScale: 0.9,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R'],
                                min: 2,
                                max: 3,
                                between: 0
                            }]
                        },
                        {
                            id: 4,
                            minWave: 4,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.9,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['Bomb'],
                                min: 1,
                                max: 2,
                                between: 0
                            }]
                        },
                        {
                            id: 5,
                            minWave: 5,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.9,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['Bomb'],
                                min: 1,
                                max: 1,
                                between: 0
                            }, {
                                fruits: ['R'],
                                min: 1,
                                max: 2,
                                between: 0
                            }]
                        },
                        {
                            id: 6,
                            minWave: 5,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.9,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R'],
                                min: 7,
                                max: 7,
                                between: 0.7
                            }]
                        },
                        {
                            id: 7,
                            minWave: 9,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.95,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R', 'R', 'B'],
                                min: 4,
                                max: 6,
                                between: 0.6
                            }]
                        },
                        {
                            id: 8,
                            minWave: 9,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.95,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R'],
                                min: 4,
                                max: 6,
                                between: 0
                            }]
                        },
                        {
                            id: 9,
                            minWave: 9,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.95,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R', 'R', 'R', 'B'],
                                min: 3,
                                max: 4,
                                between: 0
                            }]
                        },
                        {
                            id: 10,
                            minWave: 14,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.95,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['Bomb'],
                                min: 1,
                                max: 2,
                                between: 0
                            }, {
                                fruits: ['R'],
                                min: 2,
                                max: 3,
                                between: 0
                            }]
                        },
                        {
                            id: 11,
                            minWave: 14,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 1.0,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R', 'R', 'B'],
                                min: 16,
                                max: 16,
                                between: 0.4
                            }]
                        },
                        {
                            id: 12,
                            minWave: 14,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 1.0,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R'],
                                min: 10,
                                max: 10,
                                between: 0.3
                            }]
                        },
                        {
                            id: 13,
                            minWave: 19,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 1.0,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R', 'R', 'B'],
                                min: 8,
                                max: 8,
                                between: 0.5,
                                delayInc: -0.2
                            }]
                        },
                        {
                            id: 14,
                            minWave: 19,
                            chance: 90,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 1.0,
                            dtScaleIncrease: 0,
                            fruitChance: [{
                                fruits: ['R', 'R', 'R', 'R', 'R', 'B'],
                                min: 4,
                                max: 6,
                                between: 0
                            }]
                        },
                        {
                            id: 15,
                            minWave: 22,
                            chance: 67,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 1.0,
                            dtScaleIncrease: 0.02,
                            fruitChance: [{
                                fruits: ['R', 'R', 'R', 'B'],
                                min: 5,
                                max: 10,
                                between: 0.4
                            }]
                        },
                        {
                            id: 16,
                            minWave: 22,
                            chance: 67,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 1.0,
                            dtScaleIncrease: 0.02,
                            fruitChance: [{
                                fruits: ['R', 'R', 'R', 'B'],
                                min: 3,
                                max: 5,
                                between: 0.4
                            }]
                        },
                        {
                            id: 17,
                            minWave: 22,
                            chance: 67,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 0.9,
                            dtScaleIncrease: 0.02,
                            fruitChance: [{
                                fruits: ['R'],
                                min: 4,
                                max: 7,
                                between: 0.25
                            }]
                        },
                        {
                            id: 18,
                            minWave: 22,
                            chance: 68,
                            chanceRegrowth: 0.33,
                            delay: 0.8,
                            dtScale: 1.0,
                            dtScaleIncrease: 0.02,
                            fruitChance: [{
                                fruits: ['R', 'R', 'B'],
                                min: 5,
                                max: 7,
                                between: 0.4
                            }]
                        }
                    ];
                    this.waveCounter = 0;

                    // if(this.fruitFactory){
                    //   this.fruitFactory.positionWaterMelonUI()
                    //   this.fruitFactory.positionFruitUI('KWUI',5.5,0,0.85);
                    // }

                    //Restore Life
                    this.ring = this.add.image(640, 384, 'Ring');
                    this.impact = this.add.image(640, 384, 'ImpactClassic');
                    this.ring.visible = false;
                    this.impact.visible = false;


                    //CREATE CREDITS
                    this.creditsPopup = this.add.container(0, 0);
                    let basePopup = this.add.image(490, 384, 'BackingPaper');
                    // let borderPopup = this.add.image(490,384,'BorderWood');
                    basePopup.setScale(1.6, 1.25)
                    // borderPopup.setScale(1.6*1.24,1.25*1.24)
                    let borderPopup = this.createWoodBorder(340, 264, 595, 475, 0.5, 0.5);

                    this.creditsPopup.add(basePopup);
                    this.creditsPopup.add(borderPopup);

                    let creditText1 = this.createCreditsText();
                    var boxMask = this.make.graphics();
                    boxMask.fillRect(42, 75, 880, 620);
                    var mask = new Phaser.Display.Masks.GeometryMask(this, boxMask);
                    // for(let a=0;a<creditText1.list.length;a++){
                    //     creditText1.list[a].setMask(mask);
                    // }
                    creditText1.y = 0;
                    creditText1.setMask(mask);

                    let creditText2 = this.createCreditsText();

                    creditText2.y = 5900;
                    creditText2.setMask(mask);

                    this.tCrd1 = creditText1;
                    this.tCrd2 = creditText2;

                    this.conCreditText = this.add.container(0, 0);
                    this.conCreditText.add(creditText1);
                    this.conCreditText.add(creditText2);

                    this.conCreditText.setSize(819 * 2, 5900 * 3);
                    this.holdCredit = false;
                    let me = this;
                    this.conCreditText.setInteractive().on('drag', function(pointer, dragX, dragY) {
                        var container = me.conCreditText;;
                        container.y = dragY;
                        console.log(dragY);
                        me.delayScrollCredit = 0;
                        me.holdCredit = true;
                    });
                    this.conCreditText.setInteractive().on('dragend', function(pointer, dragX, dragY) {
                        me.holdCredit = false;
                    });
                    this.input.setDraggable(this.conCreditText);

                    this.creditsPopup.add(this.conCreditText);

                    this.creditsPopup.visible = false;

                    let basePopupAudio = this.add.image(1100, 270, 'BackingPaper');
                    let borderPopupAudio = this.add.image(1100, 270, 'BorderWood');
                    basePopupAudio.setScale(0.6, 0.5)
                    borderPopupAudio.setScale(0.6 * 1.24, 0.5 * 1.24)
                    this.audioPopup = this.add.container(0, 0);
                    this.audioPopup.add(basePopupAudio);
                    this.audioPopup.add(borderPopupAudio);
                    this.audioPopup.visible = false;

                    let textAudio = this.add.text(1100, 160, 'Audio', {
                        fontFamily: 'gangofchinese',
                        fontSize: 60,
                        color: '#653A11',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    this.audioPopup.add(textAudio)

                    this.buttonSFX = new Button(this, 1030, 300, 'ButtonSFX');
                    this.buttonBGM = new Button(this, 1170, 300, 'ButtonMusic');
                    this.BGMMuted = false;
                    this.SFXMuted = false;
                    this.buttonSFX.on('pointerup', function() {
                        if (this.buttonSFX.clicked) this.toogleSFX();
                        this.buttonSFX.animateRelease();
                    }, this);

                    this.buttonBGM.on('pointerup', function() {
                        if (this.buttonBGM.clicked) this.toogleMusic();
                        this.buttonBGM.animateRelease();
                    }, this);

                    this.audioPopup.add(this.buttonSFX);
                    this.audioPopup.add(this.buttonBGM);

                    this.textVersi = this.add.text(450, 708, 'v1.1.0.8', {
                        fontFamily: 'gangofchinese',
                        fontSize: 30,
                        color: '#FFFFFF',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    this.textVersi.setStroke('#464646', 8);
                    let gradientVersi = this.textVersi.context.createLinearGradient(0, 0, 0, this.textVersi.height);
                    gradientVersi.addColorStop(0, '#CECFCE');
                    gradientVersi.addColorStop(0.5, '#FFFFFF');
                    gradientVersi.addColorStop(0.5, '#CECFCE');
                    gradientVersi.addColorStop(1, '#FFFFFF');
                    this.textVersi.setFill(gradientVersi);
                    this.textVersi.visible = false;

                    //CREATE RING Back
                    const textureRingBack = await this.third.load.texture('back_ring_tex')
                    textureRingBack.wrapS = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    textureRingBack.wrapT = _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].RepeatWrapping
                    const materialRingBack = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].MeshPhongMaterial({
                        map: textureRingBack
                    })
                    materialRingBack.transparent = true;
                    this.planeRingBack = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(3.12 / this.frustumSizeChanger, 3.12 / this.frustumSizeChanger), materialRingBack)
                    this.planeRingBack.position.z = -499;
                    this.planeRingBack.position.y = -3.5 / this.frustumSizeChanger;
                    this.planeRingBack.position.x = 7.5 / this.frustumSizeChanger;
                    this.third.add.existing(this.planeRingBack)
                    this.planeRingBack.angle = 0;
                    let tmpBack = this.planeRingBack;
                    this.tweens.add({
                        targets: tmpBack,
                        angle: 360,
                        loop: -1,
                        duration: 20000,
                        onUpdate: () => {
                            this.planeRingBack.rotation.z = tmpBack.angle / 180 * Math.PI;
                        }
                    });

                    this.planeShadowRingBack = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Mesh(new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].PlaneGeometry(3.12 / this.frustumSizeChanger, 3.12 / this.frustumSizeChanger), materialShadowRing)
                    this.planeShadowRingBack.position.z = -500;
                    this.planeShadowRingBack.position.x = (0.2 + 7.5) / this.frustumSizeChanger;
                    this.planeShadowRingBack.position.y = (-0.2 - 3.5) / this.frustumSizeChanger;
                    this.third.add.existing(this.planeShadowRingBack)

                    this.planeRingBack.visible = false;
                    this.planeShadowRingBack.visible = false;

                    //CRITICAL HANDLER
                    this.CriticalText = __webpack_require__( /*! ./../gameobjects/CriticalText.js */ "./src/scripts/gameobjects/CriticalText.js").default;
                    this.poolCritical = [];
                    this.activeCritical = [];
                    for (let i = 0; i < 5; i++) {
                        let criticalText = new this.CriticalText(this, 0, 0);
                        criticalText.deactivate();
                        this.poolCritical.push(criticalText);
                    }

                    //COMBO HANDLER
                    this.ComboText = __webpack_require__( /*! ./../gameobjects/ComboText.js */ "./src/scripts/gameobjects/ComboText.js").default;
                    this.poolComboText = [];
                    this.activeComboText = [];
                    this.iconScaleUp = false;

                    for (let i = 0; i < 5; i++) {
                        let comboText = new this.ComboText(this, 0, 0);
                        comboText.deactivate();
                        this.poolComboText.push(comboText);
                    }


                    this.scene.stop('PreloadScene');
                    this.gameState = -1;

                    this.tweens.add({
                        targets: this.topHomescreen,
                        y: 0,
                        duration: 250
                    });
                    // console.log('ccc');

                    this.buttonClassic.visible = true;
                    this.buttonSetting.visible = true;

                    pokiGameLoadingFinished();
                }

                showCriticalText(x, y) {
                    let critContainer;

                    if (this.poolCritical.length == 0) {
                        critContainer = new this.CriticalText(this, 0, 0);
                    } else {
                        critContainer = this.poolCritical[0];
                        this.poolCritical.splice(0, 1);
                    }

                    critContainer.setPosition(x, y);
                    critContainer.activate();

                    if (!this.SFXMuted) {
                        this.sound.play('UICritical');
                    }

                    this.gameData.score += 10;

                    this.activeCritical.push(critContainer);
                }

                createRingFruitTweenDisappear(planeRing, planeRingShadow, fruit) {
                    let scale = 1;

                    let temp = {
                        scale: 1
                    };
                    this.tweens.add({
                        targets: temp,
                        scale: 0,
                        // y: '-=0.5',
                        duration: 200,
                        onUpdate: () => {
                            // console.log(tmp.angle);
                            planeRing.scale.x = temp.scale;
                            planeRing.scale.y = temp.scale;
                            planeRing.scale.z = temp.scale;

                            planeRingShadow.scale.x = temp.scale;
                            planeRingShadow.scale.y = temp.scale;
                            planeRingShadow.scale.z = temp.scale;

                            fruit.object.traverse(function(child) {
                                if (child.name.includes("Whole") || child.name.includes("whole")) {
                                    child.scale.x = temp.scale;
                                    child.scale.y = temp.scale;
                                    child.scale.z = temp.scale;
                                }

                                if (child.name.includes("Half") || child.name.includes("half")) {
                                    child.scale.x = temp.scale;
                                    child.scale.y = temp.scale;
                                    child.scale.z = temp.scale;
                                }
                            });
                        },
                        onComplete: () => {
                            planeRing.visible = false;
                            planeRingShadow.visible = false;
                            this.fruitFactory.deactivate(fruit);
                        }
                    });
                }

                createRingFruitTweenAppear(planeRing, planeRingShadow, fruit, fruitScale) {
                    let scale = 1;

                    let temp = {
                        scale: 0
                    };
                    this.tweens.add({
                        targets: temp,
                        scale: 1,
                        // y: '-=0.5',
                        duration: 200,
                        onUpdate: () => {
                            // console.log(tmp.angle);
                            planeRing.scale.x = temp.scale;
                            planeRing.scale.y = temp.scale;
                            planeRing.scale.z = temp.scale;

                            planeRingShadow.scale.x = temp.scale;
                            planeRingShadow.scale.y = temp.scale;
                            planeRingShadow.scale.z = temp.scale;
                            fruit.object.body.setCollisionFlags(4);
                            fruit.object.traverse(function(child) {
                                if (child.name.includes("Whole") || child.name.includes("whole")) {
                                    child.scale.x = temp.scale * fruitScale;
                                    child.scale.y = temp.scale * fruitScale;
                                    child.scale.z = temp.scale * fruitScale;
                                }

                                if (child.name.includes("Bomb") || child.name.includes("bomb")) {
                                    child.scale.x = temp.scale * fruitScale;
                                    child.scale.y = temp.scale * fruitScale;
                                    child.scale.z = temp.scale * fruitScale;
                                }

                                if (child.name.includes("Half") || child.name.includes("half")) {
                                    child.scale.x = temp.scale;
                                    child.scale.y = temp.scale;
                                    child.scale.z = temp.scale;
                                }
                            });
                        }
                    });
                }

                createRingTweenDisappear(planeRing, planeRingShadow) {
                    let scale = 1;

                    let temp = {
                        scale: 1
                    };
                    this.tweens.add({
                        targets: temp,
                        scale: 0,
                        // y: '-=0.5',
                        duration: 200,
                        onUpdate: () => {
                            // console.log(tmp.angle);
                            planeRing.scale.x = temp.scale;
                            planeRing.scale.y = temp.scale;
                            planeRing.scale.z = temp.scale;

                            planeRingShadow.scale.x = temp.scale;
                            planeRingShadow.scale.y = temp.scale;
                            planeRingShadow.scale.z = temp.scale;

                            // fruit.object.scale.x = temp.scale;
                            // fruit.object.scale.y = temp.scale;
                            // fruit.object.scale.z = temp.scale;

                            // fruit.splash.position.set(tmp.x, tmp.y, tmp.z)
                        },
                        onComplete: () => {
                            planeRing.visible = false;
                            planeRingShadow.visible = false;
                        }
                    });
                }

                createCreditsText() {
                    let wholeCredit = this.add.container(0, 0);
                    let textAbout = this.add.text(490, 140, 'About', {
                        fontFamily: 'gangofchinese',
                        fontSize: 80,
                        color: '#B74A32',
                        align: 'center'
                    }).setOrigin(0.5, 0.5);
                    wholeCredit.add(textAbout);
                    let textGameDesc = this.add.text(490, 180, 'All ninjas hate fruit!\nSwipe the fruit with your finger to end their journey\n\nBe wary of bombs, and make sensei proud', {
                        fontFamily: 'gangofchinese',
                        fontSize: 33,
                        color: '#6F461E',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(textGameDesc);

                    // let textCredit = this.add.text(490, 370, 'Credits', {fontFamily:'gangofchinese', fontSize:80, color:'#B74A32',align:'center'}).setOrigin(0.5, 0);
                    // let textHTML5Port = this.add.text(490, 470, 'HTML5 Port V.0.4.1.3', {fontFamily:'gangofchinese', fontSize:33, color:'#4D2E11',align:'center'}).setOrigin(0.5, 0);
                    // let textIsiPort = this.add.text(490, 510, 'Developed by\nOwn Games\nIndonsesia', {fontFamily:'gangofchinese', fontSize:28, color:'#693E17',align:'center'}).setOrigin(0.5, 0);
                    // wholeCredit.add(textCredit);
                    // wholeCredit.add(textHTML5Port);
                    // wholeCredit.add(textIsiPort);

                    let textCredit = this.add.text(490, 480, 'Credits', {
                        fontFamily: 'gangofchinese',
                        fontSize: 80,
                        color: '#B74A32',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let textHTML5Port = this.add.text(490, 370, 'EXCLUSIVE PARTNER:', {
                        fontFamily: 'gangofchinese',
                        fontSize: 33,
                        color: '#4D2E11',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let textIsiPort = this.add.text(490, 410, 'STORMS', {
                        fontFamily: 'gangofchinese',
                        fontSize: 28,
                        color: '#693E17',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(textCredit);
                    wholeCredit.add(textHTML5Port);
                    wholeCredit.add(textIsiPort);

                    let textCurrentTeam = this.add.text(490, 630, 'Current Team', {
                        fontFamily: 'gangofchinese',
                        fontSize: 45,
                        color: '#689927',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(textCurrentTeam);

                    let cDivision = '#4C2E12';
                    let cMember = '#6F461F';

                    var mid = 490;
                    var left = 490 - 200;
                    var right = 490 + 200;
                    var distanceY = 80;
                    var fontSize = 33;
                    var startY = 710;


                    let t_teamLead = this.add.text(left, startY, 'Team Lead', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_teamLead = this.add.text(left, startY + t_teamLead.height + 5, 'Shainiel Deo', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_teamLead);
                    wholeCredit.add(n_teamLead);

                    let t_art = this.add.text(right, startY, 'Art', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_art = this.add.text(right, startY + t_art.height + 5, 'Laura McCabe', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_art);
                    wholeCredit.add(n_art);

                    startY = n_teamLead.y + n_teamLead.height + distanceY;

                    let t_code = this.add.text(left, startY, 'Code', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_code = this.add.text(left, startY + t_code.height + 5, 'Samantha Turner\nVictor Rykov\nKayleb Garrett', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_code);
                    wholeCredit.add(n_code);

                    let t_design = this.add.text(right, startY, 'Design', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_design = this.add.text(right, startY + t_design.height + 5, 'Shainiel Deo\nDylan Van Beek', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_design);
                    wholeCredit.add(n_design);

                    startY = Math.max(n_code.y + n_code.height, n_design.y + n_design.height) + distanceY;

                    let t_qa = this.add.text(left, startY, 'QA', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_qa = this.add.text(left, startY + t_qa.height + 5, 'Brent Hobson', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_qa);
                    wholeCredit.add(n_qa);

                    let t_cs = this.add.text(right, startY, 'Customer Support', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_cs = this.add.text(right, startY + t_cs.height + 5, 'Madison Annibale\nAkaash Deo\nSam Scarpignato', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_cs);
                    wholeCredit.add(n_cs);

                    startY = Math.max(n_qa.y + n_qa.height, n_cs.y + n_cs.height) + distanceY;

                    let t_audio = this.add.text(left, startY, 'Audio', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_audio = this.add.text(left, startY + t_audio.height + 5, 'Cedar Jones\nJamie Campbell\nRicardo Pujol', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_audio);
                    wholeCredit.add(n_audio);

                    let t_marketing = this.add.text(right, startY, 'Marketing', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_marketing = this.add.text(right, startY + t_marketing.height + 5, 'Jason Maundrell\nSalvatore Compagnone\nOlivia Bambury\nParis Ormerod', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_marketing);
                    wholeCredit.add(n_marketing);

                    startY = Math.max(n_audio.y + n_audio.height, n_marketing.y + n_marketing.height) + distanceY;

                    let t_originalTeam = this.add.text(mid, startY, 'Original Team', {
                        fontFamily: 'gangofchinese',
                        fontSize: 45,
                        color: "#689927",
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_originalTeam);

                    startY = t_originalTeam.y + t_originalTeam.height + distanceY;

                    let t_teamLead2 = this.add.text(left, startY, 'Team Lead / Design', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_teamLead2 = this.add.text(left, startY + t_teamLead2.height + 5, 'Luke Muscat', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_teamLead2);
                    wholeCredit.add(n_teamLead2);

                    let t_art2 = this.add.text(right, startY, 'Art', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_art2 = this.add.text(right, startY + t_art2.height + 5, 'Shath', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_art2);
                    wholeCredit.add(n_art2);

                    startY = Math.max(n_teamLead2.y + n_teamLead2.height, n_art2.y + n_art2.height) + distanceY;

                    let t_code2 = this.add.text(left, startY, 'Code', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_code2 = this.add.text(left, startY + t_code2.height + 5, 'Adam Wood\nStephen Last', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_code2);
                    wholeCredit.add(n_code2);

                    let t_qa2 = this.add.text(right, startY, 'QA', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_qa2 = this.add.text(right, startY + t_qa2.height + 5, 'Brent Hobson\nJason Maundrell', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_qa2);
                    wholeCredit.add(n_qa2);

                    startY = Math.max(n_code2.y + n_code2.height, n_qa2.y + n_qa2.height) + distanceY;

                    let t_audio2 = this.add.text(left, startY, 'Audio', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_audio2 = this.add.text(left, startY + t_audio2.height + 5, 'Jesse Higginson\nCedar Jones', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_audio2);
                    wholeCredit.add(n_audio2);

                    let t_production = this.add.text(right, startY, 'Production', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_production = this.add.text(right, startY + t_production.height + 5, 'Jason Harwood', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_production);
                    wholeCredit.add(n_production);

                    startY = Math.max(n_audio2.y + n_audio2.height, n_production.y + n_production.height) + distanceY;

                    let t_marketing2 = this.add.text(mid, startY, 'Marketing', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_marketing2 = this.add.text(mid, startY + t_marketing2.height + 5, 'Beverley Chen', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_marketing2);
                    wholeCredit.add(n_marketing2);

                    startY = n_marketing2.y + n_marketing2.height + distanceY;

                    let t_add_development = this.add.text(mid, startY, 'Additional Development', {
                        fontFamily: 'gangofchinese',
                        fontSize: 45,
                        color: "#689927",
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_add_development);

                    startY = t_add_development.y + t_add_development.height + distanceY;

                    let n_leftTeam = this.add.text(left, startY, 'Adam Nichols\nAnthony Hansen\nAlex Butterfield\nAlex Richardson\nAshley Muller\nBen Marrinan\nBen Vale\nBertrand Thomachot\nBrendon Thomas\nCorey Hearder\nCorey Taylor\nDaemon Walters\nDale Williams\nDaniel Baxter\nDaniel Fisher\nDaniel John\nDean Loades\nElliot Courtney\nEmma Koch\nGareth Heavon-Jones\nGemma Refalo\nGuillaume Evrard\nMark Hurst\nHugh Walters\nJames Barnes\nJames Quick\nJared Oats\nJason Robson\nJesse Higginson', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_rightTeam = this.add.text(right, startY, 'John Qian\nJohnathon Carr\nJonathan Law\nJordan Comino\nJosh Sanderson\nKate Hynes\nLayton Hawkes\nMatt Millwood\nMatt Ross\nMatthew Knights\nMelanie Devoy\nMichael Dobele\nMichael Szewczyk\nMotze Asher\nMurry Lancashire\nNathan Steenstra\nPaul McNab\nPhil Larsen\nRamine Darabiha\nResa Liputra\nRichard McKinney\nRod Wong\nRyan Langley\nSean Druitt\nSean Ockert\nTerry Greisbach\nWill Goddard\nWren Brier\nZac Congo', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(n_leftTeam);
                    wholeCredit.add(n_rightTeam);

                    startY = Math.max(n_leftTeam.y + n_leftTeam.height, n_rightTeam.y + n_rightTeam.height) + distanceY;

                    let t_ceo = this.add.text(left, startY, 'CEO', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_ceo = this.add.text(left, startY + t_ceo.height + 5, 'Shainiel Deo', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_ceo);
                    wholeCredit.add(n_ceo);

                    let t_cfo = this.add.text(right, startY, 'CFO', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_cfo = this.add.text(right, startY + t_cfo.height + 5, 'Rinal Deo', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_cfo);
                    wholeCredit.add(n_cfo);

                    startY = Math.max(n_ceo.y + n_ceo.height, n_cfo.y + n_cfo.height) + distanceY;

                    let t_marketing3 = this.add.text(left, startY, 'Marketing', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_marketing3 = this.add.text(left, startY + t_marketing3.height + 5, 'Beverley Chen\nBob Jones\nFiona Guo\nJames Schultz\nJustin Bowen\nMichelle Whitehead\nPhoebe Ong\nScheree Reeves\nTerry Greisbach\nToby Meadows', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_marketing3);
                    wholeCredit.add(n_marketing3);

                    let t_engine = this.add.text(right, startY, 'Engine', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_engine = this.add.text(right, startY + t_engine.height + 5, 'Jason Maundrell\nGrant Peters\nZac Congo', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_engine);
                    wholeCredit.add(n_engine);

                    startY = Math.max(n_marketing3.y + n_marketing3.height, n_engine.y + n_engine.height) + distanceY;

                    let t_qa3 = this.add.text(left, startY, 'QA', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_qa3 = this.add.text(left, startY + t_marketing3.height + 5, 'Charles Bussy\nClement Valette\nKirby Scarfe\nSethlans Vayu', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_qa3);
                    wholeCredit.add(n_qa3);

                    let t_support = this.add.text(right, startY, 'Support', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_support = this.add.text(right, startY + t_engine.height + 5, 'Brendan Deboy\nChloe Pearson\nChris Edwards\nGenevieve Carter\nGeorgia Shephard\nPaul Howatson\nPing Ma\nSam Gillespie\nSam White\nSethlans Vayu', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_support);
                    wholeCredit.add(n_support);

                    startY = Math.max(n_qa3.y + n_qa3.height, n_support.y + n_support.height) + distanceY;

                    let t_special = this.add.text(mid, startY, 'Special Thanks', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_special = this.add.text(mid, startY + t_engine.height + 5, 'Char + Emma Wood\nKaaren + Raymond Hawkes\nKate Exley\nKing Dragon Le + Family\nLauren Fryer\nLeah Mostyn\nMadonna + Callum Bryan\nNatalie Clarke\nNell + Calyb Rehua\nShinta Liputra\nStella Kalis', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_special);
                    wholeCredit.add(n_special);

                    startY = n_special.y + n_special.height + distanceY;

                    let t_copyright = this.add.text(mid, startY, '© 2010 - 2021 Halfbrick Studios Pty Ltd. FRUIT NINJA®\nGame characters, Halfbrick and logo are trademarks of\nHalfbrick Studios Pty Ltd and are protected by copyright.\nAll rights reserved.', {
                        fontFamily: 'gangofchinese',
                        fontSize: 28,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_copyright);

                    startY = t_copyright.y + t_copyright.height + distanceY;

                    let t_fact = this.add.text(mid, startY, 'Bonus Fruit Fact', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cDivision,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let n_fact = this.add.text(mid, startY + t_fact.height + 5, 'Sensei loves prunes! :p', {
                        fontFamily: 'gangofchinese',
                        fontSize: fontSize,
                        color: cMember,
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(t_fact);
                    wholeCredit.add(n_fact);
                    // console.log(startY);

                    startY = n_fact.y + n_fact.height + distanceY;

                    // let textCredit = this.add.text(490, 480, 'Credits', {fontFamily:'gangofchinese', fontSize:80, color:'#B74A32',align:'center'}).setOrigin(0.5, 0);
                    let sthanksog = this.add.text(490, startY, 'Special Thanks:', {
                        fontFamily: 'gangofchinese',
                        fontSize: 33,
                        color: '#4D2E11',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    let thanksogid = this.add.text(490, startY + sthanksog.height + 5, 'Own Games Indonesia', {
                        fontFamily: 'gangofchinese',
                        fontSize: 28,
                        color: '#693E17',
                        align: 'center'
                    }).setOrigin(0.5, 0);
                    wholeCredit.add(sthanksog);
                    wholeCredit.add(thanksogid);

                    return wholeCredit;
                }

                initResultScreen() {
                    //GAMEOVER UI
                    this.wholePopupGameover = this.add.container(0, 0);
                    this.popupGameover = this.add.image(640, 25, 'ParchmentBackingLarge');
                    this.popupGameover.setOrigin(0.5, 0);
                    this.popupGameover.setScale(1.25, 1.25);

                    let senseiHead = this.add.image(this.popupGameover.x + (this.popupGameover.width / 2) * 1.25 - 20, this.popupGameover.y + 119, 'SenseiHead');
                    senseiHead.setOrigin(0.5, 0.5);
                    senseiHead.setScale(0.625, 0.625);
                    senseiHead.angle = -20;

                    let titleText = this.add.text(640, 70, "SCORE", {
                        fontFamily: "gangofchinese",
                        fontSize: 85
                    });
                    titleText.setStroke('#633700', 8);
                    let gradient = titleText.context.createLinearGradient(0, 0, 0, titleText.height);
                    gradient.addColorStop(0, '#FDF353');
                    gradient.addColorStop(1, '#E38D13');
                    titleText.setOrigin(0.5, 0);
                    titleText.setFill(gradient);

                    this.textScoreGameover = this.add.text(640, 265, "0", {
                        fontFamily: "gangofchinese",
                        fontSize: 275
                    });
                    this.textScoreGameover.setStroke('#633700', 16);
                    gradient = this.textScoreGameover.context.createLinearGradient(0, 0, 0, this.textScoreGameover.height);
                    gradient.addColorStop(0, '#FDF353');
                    gradient.addColorStop(1, '#E38D13');
                    this.textScoreGameover.setFill(gradient);
                    this.textScoreGameover.setOrigin(0.5, 0.5);

                    this.newBestText = this.add.text(640, 380, "NEW BEST!", {
                        fontFamily: "gangofchinese",
                        fontSize: 55
                    });
                    this.newBestText.setStroke('#360000', 4);
                    gradient = titleText.context.createLinearGradient(0, 0, 0, this.newBestText.height);
                    gradient.addColorStop(0, '#FF9E26');
                    gradient.addColorStop(1, '#B32E0B');
                    this.newBestText.setOrigin(0.5, 0);
                    this.newBestText.setFill(gradient);
                    this.newBestText.visible = false;

                    this.wholePopupGameover.add(this.popupGameover);
                    this.wholePopupGameover.add(senseiHead);
                    this.wholePopupGameover.add(titleText);
                    this.wholePopupGameover.add(this.textScoreGameover);
                    this.wholePopupGameover.add(this.newBestText);

                    this.wholePopupGameover.visible = false;

                    const ScreenShake = __webpack_require__( /*! ./../utils/ScreenShake.js */ "./src/scripts/utils/ScreenShake.js").default;
                    this.screenShake = ScreenShake();
                    JumpGame.showInterstitial({
                        beforeShowAd: ()=> {                  
                        },
                        afterShowAd: ()=> {                    
                        }
                    })
                }

                getCrossFruit(posX) {
                    let crossFruit;
                    if (this.crossFruitPool.length == 0) {
                        crossFruit = this.createCrossFruit();
                    } else {
                        crossFruit = this.crossFruitPool[0];
                        this.crossFruitPool.splice(0, 1);
                    }
                    crossFruit.visible = true;
                    crossFruit.setOrigin(0.5, 0.5);
                    crossFruit.x = posX;
                    crossFruit.scale = 0;

                    this.tweens.add({
                        targets: crossFruit,
                        scale: 1,
                        duration: 200,
                        onComplete: () => {
                            this.tweens.add({
                                targets: crossFruit,
                                scale: 0,
                                duration: 200,
                                delay: 700,
                                onComplete: () => {
                                    crossFruit.visible = false;
                                    this.crossFruitPool.push(crossFruit);
                                }
                            })
                        }
                    })
                }

                createCrossFruit() {
                    let crossFruit = this.add.image(0, 720, 'CrossRed');
                    crossFruit.visible = false;
                    crossFruit.setOrigin(0.5, 0.5);

                    return crossFruit;
                }

                update(time, delta) {
                    if (this.screenShake) {
                        // console.log('aa');
                        this.screenShake.update(this.third.camera);
                        if (this.startLedakan) {
                            this.timerStartLedakan -= delta;
                            if (this.timerStartLedakan <= 0) {
                                this.screenShake.shake(this.third.camera, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(0.0625, 0.0625, 0), 100 /* ms */ );
                                this.timerStartLedakan = 100;
                            }

                        }
                    }

                    if (this.gameState == -1) {
                        // console.log('ddd')
                        if (this.fruitFactory) {
                            // console.log('eee')
                            //if(this.fruitFactory.isFinish()){
                            //if(this.fruitFactory.positionWaterMelonUI()){
                            this.fruitFactory.positionWaterMelonUI();
                            this.fruitFactory.positionFruitUI('KWUI', 5.5, 0, 0.85);
                            this.gameState = 0;
                            this.createRingFruitTweenAppear(this.planeRing, this.planeShadowRing, this.fruitFactory.getFruit('WMUI'), 0.85);
                            this.createRingFruitTweenAppear(this.planeRingSettings, this.planeShadowRingSettings, this.fruitFactory.getFruit('KWUI'), 0.85);
                            //}
                            //}
                        }
                    } else if (this.gameState == 0) {
                        // this.fruitFactory.forcePositionWaterMelonUI()
                        if (this.blade) {
                            this.blade.updateBlade(delta);
                            if (!this.holdCheckUI && !this.homeAnimation) {
                                let resHit = this.blade.checkFruitsUI(this.fruitFactory);
                                if (resHit == 'WMUI') {
                                    this.blade.changeCurrentScreen("GameScreen");
                                    this.moveToGameplay();
                                } else if (resHit == 'KWUI') {
                                    this.blade.changeCurrentScreen("SettingScreen");
                                    this.moveToSettings();
                                } else if (resHit == 'BUI') {
                                    this.blade.changeCurrentScreen("HomeScreen");
                                    this.exitSettings();
                                }
                                if (this.fruitFactory) {
                                    this.fruitFactory.update(delta);
                                }
                                if (this.showCredit) {
                                    this.delayScrollCredit -= delta;
                                    if (this.delayScrollCredit <= 0) {
                                        if (!this.holdCredit) {
                                            this.conCreditText.y -= (150 * delta) / 1000;
                                        }

                                        if (this.conCreditText.y <= -5900) {
                                            this.conCreditText.y += 5900;
                                        } else if (this.conCreditText.y > 0) {
                                            this.conCreditText.y -= 5900;
                                        }
                                    }
                                }
                            }

                        }
                    } else if (this.gameState == 1) {

                        if (this.blade) {
                            this.blade.updateBlade(delta);
                            this.blade.checkFruits(this.fruitFactory);
                        }
                        if (this.fruitFactory) {
                            this.fruitFactory.update(delta);
                        }
                    } else if (this.gameState == 2) {
                        if (this.fruitFactory) {
                            this.startTimer -= delta / 1000.0;
                            if (this.startTimer <= 0 && !this.hitBomb) {
                                // console.log('sec');
                                //this.fruitFactory.spawnAnyFruit();
                                let wave = this.getWave();

                            }
                            if (this.fruitFactory) {
                                this.fruitFactory.update(delta);
                            }
                            if (this.blade) {
                                this.blade.updateBlade(delta);
                                let prevScore = this.gameData.score;
                                let upScore = this.blade.checkFruits(this.fruitFactory);

                                this.gameData.score += upScore;
                                if (this.timerCombo > 0) {
                                    this.timerCombo -= delta;
                                    if (this.timerCombo <= 0) {
                                        this.timerCombo = 0;
                                        //try show combo
                                        if (this.comboCount >= 3) {
                                            this.showCombo(this.comboCount, this.lastPosX, this.lastPosY);
                                        }

                                        this.comboCount = 0;
                                    }
                                }
                                if (upScore != 0) {
                                    if (this.comboCount == 0) {
                                        this.timerCombo = 300;
                                        this.comboCount = upScore;
                                    } else {
                                        this.timerCombo += 100;
                                        this.comboCount += upScore;
                                    }

                                }
                            }

                            this.updateScore(delta);
                            for (let i = 0; i < this.activeComboText.length; i++) {
                                if (this.activeComboText[i].visible == false) {
                                    this.poolComboText.push(this.activeComboText[i]);
                                    this.activeComboText.splice(i, 1);
                                }
                            }

                            for (let i = 0; i < this.activeCritical.length; i++) {
                                if (this.activeCritical[i].visible == false) {
                                    this.poolCritical.push(this.activeCritical[i]);
                                    this.activeCritical.splice(i, 1);
                                }
                            }
                        }
                    } else if (this.gameState == 3) {
                        if (this.fruitFactory) {
                            this.fruitFactory.update(delta);
                        }
                        if (this.blade) {
                            this.blade.updateBlade(delta);

                        }
                    } else if (this.gameState == 4) {
                        if (this.fruitFactory) {
                            this.fruitFactory.update(delta);
                        }
                        if (this.blade) {
                            this.blade.updateBlade(delta);
                            let resUI = this.blade.checkFruitsUI(this.fruitFactory);
                            if (gameMode != GAMEMODE_TOURNAMENT) {
                                if (resUI == 'AGUI') {
                                    this.blade.changeCurrentScreen("GameScreen");
                                    this.showAds('gameplay');
                                    this.hideResults();
                                } else if (resUI == 'BUI') {
                                    this.blade.changeCurrentScreen("HomeScreen");
                                    this.showAds('homescreen');
                                    this.hideResults();
                                }
                            } else {
                                if (resUI == 'AGUI') {
                                    this.replayGame();
                                } else if (resUI == 'BUI') {
                                    this.moveToHomescreen();
                                }
                            }

                        }
                    } else if (this.gameState == 5) {
                        if (!this.adsShowing) {
                            this.timerAds += delta;
                        }
                        if (this.fruitFactory) {
                            this.fruitFactory.update(delta);
                        }
                        if (this.blade) {
                            this.blade.updateBlade(delta);
                        }
                        console.log(this.timerAds);
                        if (this.timerAds >= 3000) {
                            this.startShowAds = false;
                            this.timerAds = 0;
                            if (this.tipeAds == "homescreen") {
                                this.moveToHomescreen();
                            } else if (this.tipeAds == "gameplay") {
                                this.moveToGameplay();
                            }
                        }
                    }

                }

                updateScore(delta) {
                    if (this.gameData.best < this.gameData.score) {
                        this.gameData.best = this.gameData.score;
                    }
                    // this.textScore.text = ''+this.gameData.score;
                    this.textBest.text = 'Best: ' + this.gameData.best;
                    this.textBestGreen.text = 'Best: ' + this.gameData.best;

                    if (this.gameData.best == this.gameData.score && this.gameData.best != 0) {
                        this.textBest.visible = false;
                        this.textBestGreen.visible = true;
                    } else {
                        this.textBest.visible = true;
                        this.textBestGreen.visible = false;
                    }

                    if (this.gameData.displayScore != this.gameData.score) {
                        let prevScore = this.gameData.displayScore;
                        if (!this.iconScaleUp) {
                            this.iconScaleUp = true;
                            this.tweens.add({
                                targets: this.iconScore,
                                scale: 0.43,
                                duration: 100
                            });
                        }
                        let temp = this.gameData.displayScore;
                        temp += (delta) / 100;
                        if (temp > this.gameData.score) {
                            temp = this.gameData.score;
                        }
                        this.gameData.displayScore = temp;

                        this.textScore.text = '' + this.gameData.displayScore.toFixed(0);

                        let curScore = this.gameData.displayScore;
                        if (Math.floor(curScore / 100.0) > Math.floor(prevScore / 100.0)) {
                            this.TryRestoreLife();
                        }
                    } else {
                        if (this.iconScaleUp) {
                            this.iconScaleUp = false;
                            this.tweens.add({
                                targets: this.iconScore,
                                scale: 0.4,
                                duration: 100
                            });
                        }
                    }
                }

                showCombo(nCombo, posX, posY) {
                    let comboText;
                    if (this.poolComboText.length == 0) {
                        comboText = new this.ComboText(this, 0, 0);
                    } else {
                        comboText = this.poolComboText[0];
                        this.poolComboText.splice(0, 1);
                    }
                    if (nCombo >= 10) {
                        if (!this.SFXMuted) {
                            this.sound.play('Combo10');
                        }
                    } else {
                        if (!this.SFXMuted) {
                            this.sound.play('Combo' + nCombo);
                        }
                    }

                    this.gameData.score += nCombo;
                    //last slice fruit pos + something
                    comboText.x = posX;
                    comboText.y = posY;

                    comboText.activate(nCombo);
                    this.activeComboText.push(comboText);

                }

                getWave() {
                    let capableWave = [];
                    let lastMinWave = 0;
                    for (let i = 0; i < this.waveList.length; i++) {
                        if (this.waveCounter >= this.waveList[i].minWave) {
                            if (lastMinWave == this.waveList[i].minWave) {
                                capableWave.push(this.waveList[i]);
                            } else {
                                lastMinWave = this.waveList[i].minWave;
                                capableWave = [];
                                capableWave.push(this.waveList[i]);
                            }
                        }
                    }

                    let idRand = Phaser.Math.Between(0, capableWave.length - 1); //UPGRADE USED CHANCE
                    let waveUsed = capableWave[idRand];
                    let totalDelay = 0;
                    let counter = 0;
                    let possibleSpawn = [-1.2, -0.6, 0.6, 1.2];
                    for (let i = 0; i < waveUsed.fruitChance.length; i++) {
                        let fruitToSpawn = waveUsed.fruitChance[i].fruits;
                        let nFruit = Phaser.Math.Between(waveUsed.fruitChance[i].min, waveUsed.fruitChance[i].max);
                        let delay = waveUsed.fruitChance[i].between;
                        console.log('spawning wave: ' + waveUsed.id + ' on index: ' + i + ' for ' + nFruit + ' fruits, interval: ' + delay);

                        for (let j = 0; j < nFruit; j++) {
                            let toSpawn = fruitToSpawn[j % fruitToSpawn.length];
                            let timeSpawn = j * delay * 1000;
                            if (possibleSpawn.length == 0) {
                                possibleSpawn = [-1.2, -0.6, 0.6, 1.2];
                            }
                            let idxX = Phaser.Math.Between(0, possibleSpawn.length - 1);
                            let xUsed = possibleSpawn[idxX];
                            possibleSpawn.splice(idxX, 1);
                            if (timeSpawn == 0) {
                                this.fruitFactory.spawnFruit(toSpawn, 10 - counter * 4, xUsed);
                            } else {
                                // let me = this;
                                // setTimeout(function(){
                                //   if(!me.hitBomb && me.gameState==2){
                                //     me.fruitFactory.spawnFruit(toSpawn,10-counter*4,xUsed);
                                //   }
                                // },timeSpawn);
                                this.fruitFactory.scheduleSpawnFruit(toSpawn, 10 - counter * 4, xUsed, timeSpawn);
                            }
                            counter++;
                        }
                        if (totalDelay < nFruit * delay) {
                            totalDelay = nFruit * delay;
                        }
                    }

                    this.startTimer = waveUsed.delay + totalDelay + 2;
                    console.log('next timer on: ' + this.startTimer);
                    this.waveCounter++;
                }

                notifyBombHit(posX, posY) {
                    this.hitBomb = true;
                    this.glowLedakan.x = posX;
                    this.glowLedakan.y = posY;

                    this.tweens.add({
                        targets: this.glowLedakan,
                        scale: 200,
                        duration: 300,
                        delay: 1500,
                        onStart: () => {
                            this.glowLedakan.visible = true;
                        },
                        onComplete: () => {
                            this.fruitFactory.clearBomb();
                            this.tweens.add({
                                targets: this.glowLedakan,
                                duration: 500,
                                delay: 500,
                                alpha: 0,
                                onComplete: () => {
                                    this.glowLedakan.visible = false;
                                    this.glowLedakan.scale = 0;
                                    this.glowLedakan.alpha = 1;
                                    this.hitBomb = false;
                                    this.showResult();

                                }
                            });
                            let me = this;
                            setTimeout(function() {
                                me.startLedakan = false;
                                me.third.camera.position.set(0, 0, 200);
                            }, 800);
                        }
                    })

                    this.startLedakan = true;
                    this.timerStartLedakan = 0;

                }

                TryRestoreLife() {
                    if (this.loseCount > 0) {
                        this.loseCount--;
                        if (!this.SFXMuted) {
                            this.sound.play('UIExtraLife');
                        }
                        this.crossList[this.loseCount].setTexture('CrossBlue');
                        let baseX = this.crossList[this.loseCount].x;
                        let baseY = this.crossList[this.loseCount].y;
                        let thisCross = this.crossList[this.loseCount];

                        this.ring.visible = true;
                        this.impact.visible = true;
                        this.ring.alpha = 1;
                        this.impact.alpha = 1;
                        this.ring.x = baseX - this.crossList[this.loseCount].width / 4;
                        this.ring.y = baseY + this.crossList[this.loseCount].height / 4;
                        this.impact.x = baseX - this.crossList[this.loseCount].width / 4;
                        this.impact.y = baseY + this.crossList[this.loseCount].height / 4;
                        this.ring.scale = 1;
                        this.impact.scale = 1;
                        this.tweens.add({
                            targets: [this.ring, this.impact],
                            scale: 3,
                            alpha: 0,
                            duration: 200,
                            onComplete: () => {
                                this.ring.visible = false;
                                this.impact.visible = false;
                            }
                        })

                        this.tweens.timeline({

                            targets: this.crossList[this.loseCount],
                            loop: 2,

                            tweens: [{
                                    x: baseX - 6,
                                    duration: 50
                                },
                                {
                                    y: baseY - 6,
                                    duration: 50
                                },
                                {
                                    y: baseY + 6,
                                    duration: 50
                                },
                                {
                                    x: baseX + 6,
                                    duration: 50
                                }
                            ],

                            onComplete: () => {
                                thisCross.x = baseX;
                                thisCross.y = baseY;
                            }

                        });


                    }
                }

                loseLife(posX) {
                    if (this.gameState == 2 && !this.hitBomb) {
                        this.getCrossFruit(posX);
                        if (!this.SFXMuted) {
                            this.sound.play('UIGank');
                        }
                        this.crossList[this.loseCount].setTexture('CrossRed');
                        let baseX = this.crossList[this.loseCount].x;
                        let baseY = this.crossList[this.loseCount].y;
                        let thisCross = this.crossList[this.loseCount];

                        this.tweens.timeline({

                            targets: this.crossList[this.loseCount],
                            loop: 2,

                            tweens: [{
                                    x: baseX - 6,
                                    duration: 50
                                },
                                {
                                    y: baseY - 6,
                                    duration: 50
                                },
                                {
                                    y: baseY + 6,
                                    duration: 50
                                },
                                {
                                    x: baseX + 6,
                                    duration: 50
                                }
                            ],

                            onComplete: () => {
                                thisCross.x = baseX;
                                thisCross.y = baseY;
                            }

                        });

                        this.loseCount++;
                        if (this.loseCount == 3) {
                            //this.sys.pause();
                            this.showResult();
                        }
                    }

                }

                showResult() {
                    pokiGamePlayStop();
                    this.blade.changeCurrentScreen("ResultScreen");

                    this.gameState = 3;
                    this.textGameover.visible = true;
                    this.textScoreGameover.text = '' + this.gameData.score;
                    // H5SDK.submit({ SCORE: this.gameData.score });
                    if (!this.SFXMuted) {
                        this.sound.play('UIGameOver');
                    }
                    this.gameplayBgm.stop();
                    this.tweens.add({
                        targets: this.textGameover,
                        scale: 1,
                        ease: 'Back',
                        easeParams: [1.5],
                        duration: 1000,
                        onComplete: () => {
                            this.tweens.add({
                                targets: this.contGameplayUI,
                                y: -200,
                                duration: 500,
                                delay: 500
                            });
                            this.tweens.add({
                                targets: this.textGameover,
                                scale: 0,
                                delay: 500,
                                duration: 500,
                                onComplete: () => {

                                    // this.gameoverTop.visible = true;
                                    // this.gameoverTop.y = -200;

                                    this.wholePopupGameover.visible = true;
                                    if (this.gameData.best == this.gameData.score) {
                                        this.newBestText.visible = true;
                                    } else {
                                        this.newBestText.visible = false;
                                    }
                                    this.wholePopupGameover.y = -500;
                                    // this.tweens.add({
                                    //   targets: this.gameoverTop,
                                    //   y: 0,
                                    //   duration: 500
                                    // });
                                    this.tweens.add({
                                        targets: this.wholePopupGameover,
                                        y: 0,
                                        duration: 250,
                                        onComplete: () => {
                                            this.gameState = 4;

                                            this.planeRingPA.visible = true;
                                            this.planeShadowRingPA.visible = true;

                                            this.planeRingQuit.visible = true;
                                            this.planeShadowRingQuit.visible = true;

                                            this.buttonQuit.visible = true;
                                            this.buttonRetry.visible = true;

                                            this.fruitFactory.positionFruitUI('AGUI', -3, -3.5, 0.85);
                                            this.fruitFactory.positionFruitUI('BUI', 3, -3.5, 0.85);

                                            this.createRingFruitTweenAppear(this.planeRingPA, this.planeShadowRingPA, this.fruitFactory.getFruit('AGUI'), 0.85);
                                            this.createRingFruitTweenAppear(this.planeRingQuit, this.planeShadowRingQuit, this.fruitFactory.getFruit('BUI'), 0.65);
                                        }
                                    });
                                }
                            })
                        }
                    });

                    JumpGame.showInterstitial({
                        beforeShowAd: ()=> {                  
                        },
                        afterShowAd: ()=> {                    
                        }
                    })
                }

                exitSettings() {
                    this.showCredit = false;

                    this.createRingTweenDisappear(this.planeRingBack, this.planeShadowRingBack);
                    this.tweens.add({
                        targets: this.audioPopup,
                        x: 800,
                        duration: 1000
                    });
                    this.tweens.add({
                        targets: [this.creditsPopup, this.textVersi],
                        x: -2000,
                        duration: 1000,
                        onComplete: () => {
                            this.fruitFactory.resetWaterMelonUI('BUI');

                            this.creditsPopup.visible = false;
                            this.audioPopup.visible = false;
                            this.textVersi.visible = false;
                            this.moveToHomescreen();
                        }
                    });
                    JumpGame.showInterstitial({
                        beforeShowAd: ()=> {                  
                        },
                        afterShowAd: ()=> {                    
                        }
                    })
                }

                moveToHomescreen() {
                    this.resetGameplay();
                    this.planeRingPA.visible = false;
                    this.planeShadowRingPA.visible = false;
                    this.planeRingQuit.visible = false;
                    this.planeShadowRingQuit.visible = false;
                    this.homeAnimation = true;

                    this.fruitFactory.resetWaterMelonUI('AGUI');
                    this.fruitFactory.resetWaterMelonUI('BUI');
                    if (this.gameState != 0) {
                        if (!this.BGMMuted) {
                            this.homescreenBgm.play();
                            this.tweens.add({
                                targets: this.homescreenBgm,
                                volume: 1,
                                duration: 500,
                                onComplete: () => {}
                            })
                        }

                    }

                    this.tweens.add({
                        targets: this.wholePopupGameover,
                        y: -500,
                        duration: 500,
                        onComplete: () => {

                            this.gameState = -1;

                            this.planeRing.visible = true;
                            this.planeShadowRing.visible = true;
                            this.planeRingSettings.visible = true;
                            this.planeShadowRingSettings.visible = true;

                            this.tweens.add({
                                targets: this.topHomescreen,
                                y: 0,
                                duration: 500,
                                onComplete: () => {
                                    this.homeAnimation = false;
                                }
                            });
                            this.createRingFruitTweenAppear(this.planeRing, this.planeShadowRing, this.fruitFactory.getFruit('WMUI'), 0.85);
                            this.createRingFruitTweenAppear(this.planeRingSettings, this.planeShadowRingSettings, this.fruitFactory.getFruit('KWUI'), 0.85);
                        }
                    });

                    this.buttonClassic.visible = true;
                    this.buttonSetting.visible = true;
                    this.buttonBack.visible = false;
                    this.buttonQuit.visible = false;
                    this.buttonRetry.visible = false;

                }

                moveToSettings() {
                    this.tweens.add({
                        targets: this.topHomescreen,
                        y: -500,
                        duration: 250
                    });

                    this.creditsPopup.visible = true;
                    this.audioPopup.visible = true;
                    this.textVersi.visible = true;
                    this.holdCheckUI = true;

                    this.buttonClassic.visible = false;
                    this.buttonSetting.visible = false;


                    this.createRingFruitTweenDisappear(this.planeRing, this.planeShadowRing, this.fruitFactory.getFruit('WMUI'));
                    this.createRingTweenDisappear(this.planeRingSettings, this.planeShadowRingSettings);

                    this.creditsPopup.x = -2000;
                    this.textVersi.x = -1550;

                    this.tweens.add({
                        targets: this.textVersi,
                        x: 450,
                        duration: 500
                    });

                    this.audioPopup.x = 800;
                    this.tweens.add({
                        targets: [this.creditsPopup, this.audioPopup],
                        x: 0,
                        duration: 500,
                        onComplete: () => {
                            this.fruitFactory.resetWaterMelonUI('KWUI');
                            this.fruitFactory.resetWaterMelonUI('WMUI');
                            this.delayScrollCredit = 1000;
                            this.showCredit = true;
                            this.holdCheckUI = false;
                            // this.creditTween.play();
                            // this.tCrd2.y = 500;
                            //this.creditTween2.play();

                            this.planeRingBack.visible = true;
                            this.planeShadowRingBack.visible = true;
                            this.fruitFactory.positionFruitUI('BUI', 7.5, -3.5, 0.65);
                            this.createRingFruitTweenAppear(this.planeRingBack, this.planeShadowRingBack, this.fruitFactory.getFruit('BUI'), 0.65);
                        }
                    });

                    this.buttonBack.visible = true;

                    // this.gameState = -2;
                }

                moveToGameplay() {
                    pokiGamePlayStarted();

                    this.buttonClassic.visible = false;
                    this.buttonSetting.visible = false;
                    this.waveCounter = 0;
                    this.hitBomb = false;
                    this.gameState = 1;
                    this.holdCheckUI = true;
                    if (!this.BGMMuted) {
                        this.gameplayBgm.play();
                    }

                    // this.homescreenBgm.stop();
                    this.tweens.add({
                        targets: this.homescreenBgm,
                        volume: 0,
                        duration: 500,
                        onComplete: () => {
                            this.homescreenBgm.stop();
                            this.holdCheckUI = false;

                            if (!this.SFXMuted) {
                                this.sound.play('UIGameStart');
                            }
                        }
                    })

                    this.createRingFruitTweenDisappear(this.planeRingSettings, this.planeShadowRingSettings, this.fruitFactory.getFruit('KWUI'));
                    this.createRingTweenDisappear(this.planeRing, this.planeShadowRing);
                    this.textReady.visible = true;

                    this.textBest.visible = true;
                    this.textBestGreen.visible = false;
                    this.tweens.add({
                        targets: this.topHomescreen,
                        y: -500,
                        duration: 250
                    });
                    this.tweens.add({
                        targets: this.textReady,
                        y: '-=250',
                        alpha: 1,
                        duration: 500,
                        delay: 500,
                        onComplete: () => {
                            this.tweens.add({
                                targets: this.contGameplayUI,
                                y: 0,
                                duration: 500
                            });
                            this.tweens.add({
                                targets: this.textReady,
                                y: '-=250',
                                alpha: 0,
                                duration: 250,
                                delay: 200,
                                onComplete: () => {
                                    this.textGo.visible = true;
                                    this.fruitFactory.resetWaterMelonUI('WMUI');
                                    this.fruitFactory.resetWaterMelonUI('KWUI');

                                    this.tweens.add({
                                        targets: this.textGo,
                                        y: '-=250',
                                        alpha: 1,
                                        duration: 250,
                                        onComplete: () => {
                                            this.tweens.add({
                                                targets: this.textGo,
                                                y: '-=250',
                                                alpha: 0,
                                                duration: 250,
                                                delay: 200,
                                                onComplete: () => {
                                                    this.gameState = 2;
                                                }
                                            });
                                        }
                                    });
                                }
                            });

                        }
                    });
                    //console.log(sliced);
                }

                createWoodBorder(x, y, w, h, px, py) {
                    let contBorder = this.add.container(x + w * -px, y + h * -py);
                    let topLeft = this.add.image(0, 0, 'BorderWoodTL');
                    topLeft.setOrigin(0, 0);
                    let topRight = this.add.image(w - 70, 0, 'BorderWoodTR');
                    topRight.setOrigin(0, 0);
                    let top = this.add.image(70, 0, 'BorderWoodT');
                    top.setOrigin(0, 0);
                    top.scaleX = (w - 140) / 116;

                    let bottomLeft = this.add.image(0, h - 70, 'BorderWoodBL');
                    bottomLeft.setOrigin(0, 0);
                    let bottomRight = this.add.image(w - 70, h - 70, 'BorderWoodBR');
                    bottomRight.setOrigin(0, 0);
                    let bottom = this.add.image(70, h - 70, 'BorderWoodB')
                    bottom.setOrigin(0, 0);
                    bottom.scaleX = (w - 140) / 116;

                    let left = this.add.image(0, 70, 'BorderWoodL');
                    let right = this.add.image(w - 70, 70, 'BorderWoodR');
                    left.scaleY = (h - 140) / 116;
                    right.scaleY = (h - 140) / 116;
                    left.setOrigin(0, 0);
                    right.setOrigin(0, 0);

                    contBorder.add(topLeft);
                    contBorder.add(topRight);
                    contBorder.add(top);
                    contBorder.add(bottomLeft);
                    contBorder.add(bottomRight);
                    contBorder.add(bottom);

                    contBorder.add(left);
                    contBorder.add(right);

                    contBorder.setScale(1.5);

                    return contBorder;

                }

                resetGameplay() {
                    this.loseCount = 0;
                    this.contGameplayUI.y = -200;
                    this.textReady.y = 560;
                    this.textGo.y = 560;
                    this.crossList[0].setTexture('CrossBlue');
                    this.crossList[1].setTexture('CrossBlue');
                    this.crossList[2].setTexture('CrossBlue');
                    this.gameData.score = 0;
                    this.gameData.displayScore = 0;
                    this.textScore.text = '' + this.gameData.score;
                }

                hideResults() {
                    this.resetGameplay();
                    this.gameState = 5;
                    if (this.tipeAds == 'gameplay') {
                        this.createRingTweenDisappear(this.planeRingPA, this.planeShadowRingPA);
                        this.createRingFruitTweenDisappear(this.planeRingQuit, this.planeShadowRingQuit, this.fruitFactory.getFruit('BUI'));
                    } else {
                        this.createRingFruitTweenDisappear(this.planeRingPA, this.planeShadowRingPA, this.fruitFactory.getFruit('AGUI'));
                        this.createRingTweenDisappear(this.planeRingQuit, this.planeShadowRingQuit);
                    }


                    this.tweens.add({
                        targets: this.wholePopupGameover,
                        y: -500,
                        duration: 250,
                        onComplete: () => {
                            this.fruitFactory.resetWaterMelonUI('BUI');
                            // this.moveToGameplay();
                        }
                    });
                }

                replayGame() {

                    this.resetGameplay();

                    this.createRingTweenDisappear(this.planeRingPA, this.planeShadowRingPA);
                    this.createRingFruitTweenDisappear(this.planeRingQuit, this.planeShadowRingQuit, this.fruitFactory.getFruit('BUI'));

                    this.tweens.add({
                        targets: this.wholePopupGameover,
                        y: -500,
                        duration: 250,
                        onComplete: () => {
                            this.fruitFactory.resetWaterMelonUI('BUI');
                            // this.moveToGameplay();
                        }
                    });
                    JumpGame.showInterstitial({
                        beforeShowAd: ()=> {                  
                        },
                        afterShowAd: ()=> {                    
                        }
                    })
                }

                toogleMusic() {
                    this.BGMMuted = !this.BGMMuted;
                    if (this.BGMMuted) {
                        this.buttonBGM.setTexture('ButtonMusicMute');
                        this.homescreenBgm.stop();

                    } else {
                        this.buttonBGM.setTexture('ButtonMusic');
                        this.homescreenBgm.play();
                    }

                }

                toogleSFX() {
                    this.SFXMuted = !this.SFXMuted;
                    if (this.SFXMuted) {
                        this.buttonSFX.setTexture('ButtonSFXMute');
                    } else {
                        this.buttonSFX.setTexture('ButtonSFX');
                    }
                }

                OnPointerDown(pointer) {
                    this.startMovingBlade = true;
                }

                OnPointerMove(pointer) {
                    if (this.startMovingBlade && !this.hitBomb && !this.holdCredit) {
                        this.blade.pushPoint({
                            x: pointer.x,
                            y: pointer.y,
                            time: 6.0,
                            first: true
                        });

                    }
                }

                OnPointerUp(pointer) {
                    this.startMovingBlade = false;
                }

                showAds(tipe) { //03082021
                    this.tipeAds = tipe;
                    if (!this.startShowAds) {
                        this.startShowAds = true;
                        this.timerAds = 0;
                        this.adsShowing = false;
                        console.log("showAds " + tipe);
                        this.startShowAds = false;
                        if (this.tipeAds == "homescreen") {
                            this.moveToHomescreen();
                        } else if (this.tipeAds == "gameplay") {
                            this.moveToGameplay();
                        }
                        JumpGame.showInterstitial({
                            beforeShowAd: ()=> {
                                this.adsShowing = true;                       
                            },
                            afterShowAd: ()=> {
                                this.startShowAds = false;                       
                            }
                        })
                        // adBreak({ 
                        //     type: 'next',
                        //     name: 'next-game',
                        //     beforeAd: () => { 
                        //         console.log("beforeBreak");
                        //         this.adsShowing = true;
                        //         // callAnalytics("SHOW_ADS_INTERSTITIAL");
                        //     },
                        //     afterAd: () => {
                        //         this.startShowAds = false;
                        //         if(this.tipeAds=="homescreen"){
                        //             this.moveToHomescreen();
                        //         }else if(this.tipeAds=="gameplay"){
                        //             this.moveToGameplay();
                        //         }
                        //     },
                        // });
                    }
                }

            }

            function pokiGameLoadingFinished() {
                // fire loading function gameLoadingFinished()
             
                console.log("*** Poki - Game Loading Finished")
            
            }

            function pokiGamePlayStarted() {
                // first level loads, player clicks anywhere
             
                console.log("*** Poki - Player Started the Game");
                // player is playing
            }

            function pokiGamePlayStop() {
                // player loses round
                console.log("*** Poki - Game Play Stop");
                // game over screen pops up
            }

            function pokiCommercialBreak() {
                console.log("*** Poki - CommercialBreak started");
                JumpGame.showInterstitial({
                    beforeShowAd: ()=> {
                                               
                    },
                    afterShowAd: ()=> {
                                                
                    }
                })
             
                
            }

            function callCommercialBreak() {
                setTimeout(
                    function() {
                        pokiCommercialBreak();
                    }, 2500);
            }

            function pokiRewardBread() {
                JumpGame.showReward({
                    beforeShowAd: ()=> {
                                               
                    },
                    afterShowAd: ()=> {
                                                
                    }
                })
              

                function callRewardBreak() {
                    setTimeout(
                        function() {
                       //     pokiRewardBread();
                        }, 2500);
                }
            }



            /***/
        }),

    /***/
    "./src/scripts/scenes/preLoadingScene.js":
        /*!***********************************************!*\
          !*** ./src/scripts/scenes/preLoadingScene.js ***!
          \***********************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* WEBPACK VAR INJECTION */
            (function(global) { /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "default", function() {
                    return PreloadingScene;
                });
                class PreloadingScene extends Phaser.Scene {
                    constructor() {
                        super({
                            key: 'PreloadingScene'
                        })
                    }

                    preload() {
                        this.load.image('splash', 'assets/splash/splash screen.png');
                        this.load.image('loadBarIsi', 'assets/splash/LoadingBar.png');
                        this.load.image('loadingText', 'assets/splash/loading text.png');

                        checkMode();
                        console.log("gameMode " + gameMode);
                    }

                    create() {
                        this.scene.start('PreloadScene');
                    }
                }

                global.gameMode = "normal";
                global.GAMEMODE_TOURNAMENT = 'tournament';
                global.GAMEMODE_NORMAL = 'normal';

                function checkMode() {
                    var link = window.location.href;
                    if (link.includes("#tournament")) {
                        gameMode = GAMEMODE_TOURNAMENT;
                    } else {
                        gameMode = GAMEMODE_NORMAL;
                    }
                }
                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__( /*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

            /***/
        }),

    /***/
    "./src/scripts/scenes/preloadScene.js":
        /*!********************************************!*\
          !*** ./src/scripts/scenes/preloadScene.js ***!
          \********************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return PreloadScene;
            });
            class PreloadScene extends Phaser.Scene {
                constructor() {
                    super({
                        key: 'PreloadScene'
                    })
                }

                init() {
                    this.finishFont = true;
                    this.finishBar = false;
                }

                preload() {
                    // if(gameMode!=GAMEMODE_TOURNAMENT){
                    //     adConfig({preloadAdBreaks: 'on'});//03082021
                    // }
                    // H5SDK.init();
                    this.add.image(640, 384, 'splash');

                    this.cameras.main.setBackgroundColor('#000000');


                    var progressBar = this.add.graphics();
                    var progressBox = this.add.graphics();

                    var htext = 768 - 70;
                    var hloading = htext + 20;
                    var wbar = 500,
                        persen = wbar - 2;
                    var rect = new Phaser.Geom.Rectangle(1280 / 2 - wbar / 2, hloading, wbar, 40); //x,y,w,h
                    var progressBox = this.add.graphics({
                        fillStyle: {
                            color: 0x362f2d,
                            alpha: 0
                        }
                    });
                    // progressBox.fillRectShape(rect);
                    let isiBar = this.add.image(rect.x, rect.y + 1, 'loadBarIsi');
                    isiBar.setOrigin(0, 0);
                    // progressBar.fillStyle(0xDA4C00, 1);
                    // progressBar.fillRect(rect.x+2, hloading, wbar, 16);
                    // progressBar.fillStyle(0x944D00, 1);
                    // progressBar.fillRect(rect.x+2, hloading+16, wbar, 16);
                    progressBox.lineStyle(5, 0x290A07);
                    progressBox.lineBetween(rect.x - 3, rect.y, rect.x + rect.width + 3, rect.y); //atas
                    progressBox.lineBetween(rect.x, rect.y, rect.x, rect.y + rect.height - 5); //kiri
                    progressBox.lineBetween(rect.x - 3, rect.y + rect.height - 5, rect.x + rect.width + 3, rect.y + rect.height - 5); //bawah
                    progressBox.lineBetween(rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + rect.height - 5); //kanan

                    // var loadingText = this.add.text(
                    //     rect.x+wbar/2, htext,'Loading...',
                    //     {fontFamily:"gangofchinese", fontSize:"28pt", color:'#fff'}
                    //   );
                    // loadingText.setOrigin(0.5, 1);
                    var loadingText = this.add.image(rect.x + wbar / 2, htext + 18, 'loadingText');
                    loadingText.setOrigin(0.5, 1);

                    this.load.on('loaderror', function(file) {
                        this.registry.destroy(); // destroy registry
                        this.events.off();﻿ // disable all active events
                        this.scene.restart();﻿﻿﻿﻿ // restart current scene

                    }, this);

                    this.load.on('progress', function(value) {
                        progressBar.clear();
                        // console.log('bb');
                        // progressBar.fillStyle(0xffffff, 1);
                        // progressBar.fillRect(rect.x+2, hloading, persen * value, 10);
                        progressBar.fillStyle(0xDA4C00, 1);
                        progressBar.fillRect(rect.x + 2, hloading, wbar, 16);
                        progressBar.fillStyle(0x944D00, 1);
                        progressBar.fillRect(rect.x + 2, hloading + 16, wbar, 16);
                        isiBar.setScale((value * wbar) / 32.0, 1);
                        // loadingText.setText(''+parseInt(value * 100) + '%');
                    });

                    this.load.on('complete', function() {
                        this.finishBar = true;
                    }, this);

                    //this.third.load.fbx('assets/fruits/AppleGreen.FBX');
                    // this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

                    this.load.audio('AmbArenaClassicLP', 'assets/sound/AmbArenaClassicLP.mp3');
                    this.load.audio('MusicMenu', 'assets/sound/MusicMenu.mp3');

                    this.load.audio('BladeRegularSwipe01', 'assets/sound/BladeRegularSwipe01.mp3');
                    this.load.audio('BladeRegularSwipe02', 'assets/sound/BladeRegularSwipe02.mp3');
                    this.load.audio('BladeRegularSwipe03', 'assets/sound/BladeRegularSwipe03.mp3');
                    this.load.audio('BladeRegularSwipe04', 'assets/sound/BladeRegularSwipe04.mp3');
                    this.load.audio('BladeRegularSwipe05', 'assets/sound/BladeRegularSwipe05.mp3');
                    this.load.audio('BladeRegularSwipe06', 'assets/sound/BladeRegularSwipe06.mp3');
                    this.load.audio('BladeRegularSwipe07', 'assets/sound/BladeRegularSwipe07.mp3');

                    this.load.audio('Combo3', 'assets/sound/UICombo3Fruit.mp3');
                    this.load.audio('Combo4', 'assets/sound/UICombo4Fruit.mp3');
                    this.load.audio('Combo5', 'assets/sound/UICombo5Fruit.mp3');
                    this.load.audio('Combo6', 'assets/sound/UICombo6Fruit.mp3');
                    this.load.audio('Combo7', 'assets/sound/UICombo7Fruit.mp3');
                    this.load.audio('Combo8', 'assets/sound/UICombo8Fruit.mp3');
                    this.load.audio('Combo9', 'assets/sound/UICombo9Fruit.mp3');
                    this.load.audio('Combo10', 'assets/sound/UICombo10FruitPlus.mp3');

                    this.load.audio('UICritical', 'assets/sound/UICritical.mp3');

                    this.load.audio('BombFuseLP', 'assets/sound/BombFuseLP.mp3');
                    this.load.audio('BombLaunch', 'assets/sound/BombLaunch.mp3');
                    this.load.audio('BombExplodeGameOver', 'assets/sound/BombExplodeGameOver.mp3');

                    this.load.audio('FruitImpactApple', 'assets/sound/FruitImpactApple.mp3');
                    this.load.audio('FruitImpactBigHollow', 'assets/sound/FruitImpactBigHollow.mp3');
                    this.load.audio('FruitImpactBigWet01', 'assets/sound/FruitImpactBigWet01.mp3');
                    this.load.audio('FruitImpactBigWet02', 'assets/sound/FruitImpactBigWet02.mp3');
                    this.load.audio('FruitImpactBigWet03', 'assets/sound/FruitImpactBigWet03.mp3');
                    this.load.audio('FruitImpactMediumDry', 'assets/sound/FruitImpactMediumDry.mp3');
                    this.load.audio('FruitImpactMediumWet01', 'assets/sound/FruitImpactMediumWet01.mp3');
                    this.load.audio('FruitImpactMediumWet02', 'assets/sound/FruitImpactMediumWet02.mp3');
                    this.load.audio('FruitImpactMediumWet03', 'assets/sound/FruitImpactMediumWet03.mp3');
                    this.load.audio('FruitImpactSmallWet01', 'assets/sound/FruitImpactSmallWet01.mp3');
                    this.load.audio('FruitImpactSmallWet02', 'assets/sound/FruitImpactSmallWet02.mp3');
                    this.load.audio('FruitImpactSmallWet03', 'assets/sound/FruitImpactSmallWet03.mp3');

                    this.load.audio('FruitLaunch', 'assets/sound/FruitLaunch.mp3');
                    this.load.audio('UIGank', 'assets/sound/UIGank.mp3');

                    this.load.audio('UIGameOver', 'assets/sound/UIGameOver.mp3');
                    this.load.audio('UIGameStart', 'assets/sound/UIGameStart.mp3');
                    this.load.audio('UIExtraLife', 'assets/sound/UIExtraLife.mp3');

                    this.load.image('JuiceRed', 'assets/textures/particles/JuiceRed.png');
                    this.load.image('JuiceGreen', 'assets/textures/particles/JuiceGreen.png');
                    this.load.image('JuiceDragonfruit', 'assets/textures/particles/JuiceDragonfruit.png');
                    this.load.image('JuiceMango', 'assets/textures/particles/JuiceMango.png');
                    this.load.image('JuiceOrange', 'assets/textures/particles/JuiceOrange.png');
                    this.load.image('JuicePineapple', 'assets/textures/particles/JuicePineapple.png');
                    this.load.image('StarCritical', 'assets/textures/particles/StarCritical.png');

                    this.load.image('SliceDiamondNeutral', 'assets/effects/SliceDiamondNeutral.png');
                    this.load.image('SliceDiamondCritical', 'assets/effects/SliceDiamondCritical.png');
                    this.load.image('FruitSplash', 'assets/effects/FruitSplash.png');
                    this.load.image('GOText', 'assets/UI/gameover text.png')
                    // this.load.image('SplashSlice','assets/effects/SplashSlice.png');
                    // this.load.image('SplashSlice2','assets/effects/SplashSlice2.png');

                    this.load.image('HUDWatermelon', 'assets/UI/HUDWatermelon.png');
                    this.load.image('CrossBlue', 'assets/UI/CrossBlue.png');
                    this.load.image('CrossRed', 'assets/UI/CrossRed.png');
                    // this.load.image('HalfPopup','assets/UI/ScrollBackingQuad.png');
                    this.load.image('HeaderWood', 'assets/UI/HeaderWood.png');
                    this.load.image('blackAreaforTitle', 'assets/UI/blackAreaforTitle.png');

                    this.load.image('LogoFruit', 'assets/UI/LogoFruit.png');
                    this.load.image('LogoNinja', 'assets/UI/LogoNinja.png');
                    this.load.image('ScrollLockBoard', 'assets/UI/ParchmentBackingSmall.png');

                    this.load.image('ImpactClassic', 'assets/effects/ImpactClassic.png');
                    this.load.image('Ring', 'assets/effects/Ring01.png');

                    this.load.image('Glow', 'assets/effects/Glow.png');

                    //Result Screen
                    this.load.image('ParchmentBackingLarge', 'assets/UI/ParchmentBackingLarge.png');
                    this.load.image('SenseiHead', 'assets/UI/SenseiHead.png');

                    //Settings Screen
                    this.load.image('BorderWood', 'assets/UI/BorderWood.png');

                    this.load.image('BorderWoodTL', 'assets/UI/BorderWoodTopLeft.png');
                    this.load.image('BorderWoodT', 'assets/UI/BorderWoodTop.png');
                    this.load.image('BorderWoodTR', 'assets/UI/BorderWoodTopRight.png');
                    this.load.image('BorderWoodL', 'assets/UI/BorderWoodLeft.png');
                    this.load.image('BorderWoodR', 'assets/UI/BorderWoodRight.png');
                    this.load.image('BorderWoodBL', 'assets/UI/BorderWoodBottomLeft.png');
                    this.load.image('BorderWoodB', 'assets/UI/BorderWoodBottom.png');
                    this.load.image('BorderWoodBR', 'assets/UI/BorderWoodBottomRight.png');

                    this.load.image('BackingPaper', 'assets/UI/BackingPaper.png');
                    // this.load.image('SenseiOrange','assets/UI/SenseiOrange.png');

                    this.load.image('ButtonSFX', 'assets/UI/ButtonSFX.png');
                    this.load.image('ButtonSFXMute', 'assets/UI/ButtonSFXMute.png');
                    this.load.image('ButtonMusic', 'assets/UI/ButtonMusic.png');
                    this.load.image('ButtonMusicMute', 'assets/UI/ButtonMusicMute.png');

                    this.load.image('ButtonClassic', 'assets/UI/circle2.png');
                    this.load.image('MediumButton', 'assets/UI/medium_button.png');
                    this.load.image('SmallButton', 'assets/UI/small_button.png');
                    this.load.image('MediumSmallButton', 'assets/UI/medium_small_button.png');


                    // this.load.binary('WatermelonText2','assets/fruits/CWatermelon.FBX');
                    // this.load.binary('WatermelonText','assets/fruits/5hXi4K4GXT35VxQ3N');

                    initializePokiSDK();

                }

                create() {

                    let me = this;
                    // WebFont.load({
                    //     custom: {
                    //         families: [ 'gangofchinese' ]
                    //     },
                    //     active: function ()
                    //     {
                    //         //me.scene.start('MainScene')
                    //         me.finishFont = true;
                    //     }
                    // });
                    this.once = false;
                    // this.scene.start('MainScene')

                    /**
                     * This is how you would dynamically import the mainScene class (with code splitting),
                     * add the mainScene to the Scene Manager
                     * and start the scene.
                     * The name of the chunk would be 'mainScene.chunk.js
                     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
                     */
                    // let someCondition = true
                    // if (someCondition)
                    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
                    //     this.scene.add('MainScene', mainScene.default, true)
                    //   })
                    // else console.log('The mainScene class will not even be loaded by the browser')
                }

                update() {
                    if (this.finishFont && this.finishBar && !this.once) {
                        this.once = true;
                        this.scene.launch('MainScene');
                    }
                }
            }

            function initializePokiSDK() {
                    setTimeout(function() {
                     //   pokiRewardBread();
                    }, 2500);
            }


            /***/
        }),

    /***/
    "./src/scripts/utils/BombSmoke.js":
        /*!****************************************!*\
          !*** ./src/scripts/utils/BombSmoke.js ***!
          \****************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return BombTrail;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);




            const _VS = `
	uniform float pointMultiplier;

	attribute float size;
	attribute float angle;
	attribute vec4 colour;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

	  gl_Position = projectionMatrix * mvPosition;
	  gl_PointSize = size * pointMultiplier / gl_Position.w;

	  vAngle = vec2(cos(angle), sin(angle));
	  vColour = colour;
	}`;

            const _FS = `

	uniform sampler2D diffuseTexture;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
	  gl_FragColor = texture2D(diffuseTexture, coords) * vColour;
	}`;

            class BombTrail {
                constructor(params) {
                    const uniforms = {
                        diffuseTexture: {
                            //value: new THREE.TextureLoader().load('./resources/fire.png')
                            value: params.texturePS
                        },
                        pointMultiplier: {
                            //value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
                            value: 6
                        }
                    };

                    this._material = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].ShaderMaterial({
                        uniforms: uniforms,
                        vertexShader: _VS,
                        fragmentShader: _FS,
                        blending: _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].NormalBlending,
                        depthTest: true,
                        depthWrite: false,
                        transparent: true,
                        vertexColors: true
                    });

                    this.curX = 0;
                    this.curY = 0;
                    this.on = false;
                    this.emitEvery = 0.1;

                    this._camera = params.camera;
                    this._particles = [];

                    this._geometry = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].BufferGeometry();
                    this._geometry.setAttribute('position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 3));
                    this._geometry.setAttribute('size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));
                    this._geometry.setAttribute('colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 4));
                    this._geometry.setAttribute('angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));

                    this._points = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Points(this._geometry, this._material);

                    params.parent.add(this._points);

                    const LinearSpline = __webpack_require__( /*! ./../utils/LinearSpline.js */ "./src/scripts/utils/LinearSpline.js").default;

                    this._alphaSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._alphaSpline.AddPoint(0.0, 1.0);
                    this._alphaSpline.AddPoint(1.0, 0.0);

                    this._colourSpline = new LinearSpline((t, a, b) => {
                        const c = a.clone();
                        return c.lerp(b, t);
                    });
                    this._colourSpline.AddPoint(0.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0xFFFFFF));
                    this._colourSpline.AddPoint(1.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0xFFFFFF));

                    this._sizeSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._sizeSpline.AddPoint(0.0, 1.0);
                    this._sizeSpline.AddPoint(1.0, 0.5);

                    this._UpdateGeometry();
                }

                _AddParticles(timeElapsed) {
                    // console.log('aaaa ps aaa');
                    if (!this.gdfsghk) {
                        this.gdfsghk = 0.0;
                    }
                    this.gdfsghk += timeElapsed;
                    // this.gdfsghk += timeElapsed;
                    // const n = Math.floor(this.gdfsghk * 10.0);
                    // this.gdfsghk -= n / 10.0;

                    if (this.gdfsghk >= this.emitEvery) {
                        this.gdfsghk = 0;
                        // const life = 0.5;

                        // for (let i = 0; i < n; i++) {
                        // const life = (Math.random() * 0.75 + 0.25) * 10.0;
                        const life = Math.random() * 0.2 + 0.3;
                        this._particles.push({
                            position: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curX,
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curY,
                                // (Math.random() * 2 - 1) * 1.0 + 10),
                                3),
                            size: 10.0,
                            colour: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(),
                            alpha: 1.0,
                            life: life,
                            maxLife: life,
                            rotation: -Math.PI,
                            velocity: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(0.25, 0.25, 0),
                        });
                        // }
                    }
                }

                _UpdateGeometry() {
                    const positions = [];
                    const sizes = [];
                    const colours = [];
                    const angles = [];

                    for (let p of this._particles) {
                        positions.push(p.position.x, p.position.y, p.position.z);
                        colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
                        sizes.push(p.currentSize);
                        angles.push(p.rotation);
                    }

                    this._geometry.setAttribute(
                        'position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(positions, 3));
                    this._geometry.setAttribute(
                        'size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(sizes, 1));
                    this._geometry.setAttribute(
                        'colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(colours, 4));
                    this._geometry.setAttribute(
                        'angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(angles, 1));

                    this._geometry.attributes.position.needsUpdate = true;
                    this._geometry.attributes.size.needsUpdate = true;
                    this._geometry.attributes.colour.needsUpdate = true;
                    this._geometry.attributes.angle.needsUpdate = true;
                }

                _UpdateParticles(timeElapsed) {
                    for (let p of this._particles) {
                        p.life -= timeElapsed;
                    }

                    this._particles = this._particles.filter(p => {
                        return p.life > 0.0;
                    });

                    for (let p of this._particles) {
                        const t = 1.0 - p.life / p.maxLife;

                        p.rotation += timeElapsed * 0.5;
                        p.alpha = this._alphaSpline.Get(t);
                        p.currentSize = p.size * this._sizeSpline.Get(t);
                        p.colour.copy(this._colourSpline.Get(t));

                        //console.log(p.position);

                        p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));

                        const drag = p.velocity.clone();
                        drag.multiplyScalar(timeElapsed * 0.1);
                        drag.x = Math.sign(p.velocity.x) * Math.min(Math.abs(drag.x), Math.abs(p.velocity.x));
                        drag.y = Math.sign(p.velocity.y) * Math.min(Math.abs(drag.y), Math.abs(p.velocity.y));
                        drag.z = Math.sign(p.velocity.z) * Math.min(Math.abs(drag.z), Math.abs(p.velocity.z));
                        p.velocity.sub(drag);
                    }

                    this._particles.sort((a, b) => {
                        const d1 = this._camera.position.distanceTo(a.position);
                        const d2 = this._camera.position.distanceTo(b.position);

                        if (d1 > d2) {
                            return -1;
                        }

                        if (d1 < d2) {
                            return 1;
                        }

                        return 0;
                    });
                }

                Step(timeElapsed) {
                    if (this.on) {
                        this._AddParticles(timeElapsed);
                    }

                    this._UpdateParticles(timeElapsed);
                    this._UpdateGeometry();
                }

                setPosition(posX, posY) {
                    this.curX = posX;
                    this.curY = posY;
                    // this._particles.position.x = posX;
                    // this._particles.position.y = posY;
                }

                setOff() {
                    this.on = false;
                }

                setOn() {
                    this.on = true;
                }

            }

            /***/
        }),

    /***/
    "./src/scripts/utils/BombTrail.js":
        /*!****************************************!*\
          !*** ./src/scripts/utils/BombTrail.js ***!
          \****************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return BombTrail;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);




            const _VS = `
	uniform float pointMultiplier;

	attribute float size;
	attribute float angle;
	attribute vec4 colour;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

	  gl_Position = projectionMatrix * mvPosition;
	  gl_PointSize = size * pointMultiplier / gl_Position.w;

	  vAngle = vec2(cos(angle), sin(angle));
	  vColour = colour;
	}`;

            const _FS = `

	uniform sampler2D diffuseTexture;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
	  gl_FragColor = texture2D(diffuseTexture, coords) * vColour;
	}`;

            class BombTrail {
                constructor(params) {
                    const uniforms = {
                        diffuseTexture: {
                            //value: new THREE.TextureLoader().load('./resources/fire.png')
                            value: params.texturePS
                        },
                        pointMultiplier: {
                            //value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
                            value: 6
                        }
                    };

                    this._material = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].ShaderMaterial({
                        uniforms: uniforms,
                        vertexShader: _VS,
                        fragmentShader: _FS,
                        blending: _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].NormalBlending,
                        depthTest: true,
                        depthWrite: false,
                        transparent: true,
                        vertexColors: true
                    });

                    this.curX = 0;
                    this.curY = 0;
                    this.on = false;

                    this._camera = params.camera;
                    this._particles = [];

                    this._geometry = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].BufferGeometry();
                    this._geometry.setAttribute('position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 3));
                    this._geometry.setAttribute('size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));
                    this._geometry.setAttribute('colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 4));
                    this._geometry.setAttribute('angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));

                    this._points = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Points(this._geometry, this._material);

                    params.parent.add(this._points);

                    const LinearSpline = __webpack_require__( /*! ./../utils/LinearSpline.js */ "./src/scripts/utils/LinearSpline.js").default;

                    this._alphaSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._alphaSpline.AddPoint(0.0, 1.0);
                    this._alphaSpline.AddPoint(1.0, 1.0);

                    this._colourSpline = new LinearSpline((t, a, b) => {
                        const c = a.clone();
                        return c.lerp(b, t);
                    });
                    this._colourSpline.AddPoint(0.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0xFFFFFF));
                    this._colourSpline.AddPoint(1.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0xFFF425));

                    this._sizeSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._sizeSpline.AddPoint(0.0, 0.0);
                    this._sizeSpline.AddPoint(0.5, 1.0);
                    this._sizeSpline.AddPoint(1.0, 0.0);

                    this._UpdateGeometry();
                }

                _AddParticles(timeElapsed) {
                    // console.log('aaaa ps aaa');
                    if (!this.gdfsghk) {
                        this.gdfsghk = 0.0;
                    }
                    this.gdfsghk += timeElapsed;
                    const n = Math.floor(this.gdfsghk * 20.0);
                    this.gdfsghk -= n / 20.0;

                    for (let i = 0; i < n; i++) {
                        // const life = (Math.random() * 0.75 + 0.25) * 10.0;
                        const life = 0.2;
                        let sudut = Math.random() * 2.0 * Math.PI;
                        let speed = Math.random() * 1.5 + 0.5;
                        // sudut = -Math.PI;
                        // sudut = 0;
                        sudut = sudut + 0.523;

                        this._particles.push({
                            position: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curX,
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curY,
                                // (Math.random() * 2 - 1) * 1.0 + 10),
                                10),
                            size: Math.random() * 6.0 + 4.8,
                            colour: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(),
                            alpha: 1.0,
                            life: life,
                            maxLife: life,
                            rotation: sudut,
                            velocity: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(Math.cos(-sudut) * speed, Math.sin(-sudut) * speed, Math.random() * 2.0 - 1.0),
                        });
                    }
                }

                _UpdateGeometry() {
                    const positions = [];
                    const sizes = [];
                    const colours = [];
                    const angles = [];

                    for (let p of this._particles) {
                        positions.push(p.position.x, p.position.y, p.position.z);
                        colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
                        sizes.push(p.currentSize);
                        angles.push(p.rotation);
                    }

                    this._geometry.setAttribute(
                        'position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(positions, 3));
                    this._geometry.setAttribute(
                        'size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(sizes, 1));
                    this._geometry.setAttribute(
                        'colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(colours, 4));
                    this._geometry.setAttribute(
                        'angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(angles, 1));

                    this._geometry.attributes.position.needsUpdate = true;
                    this._geometry.attributes.size.needsUpdate = true;
                    this._geometry.attributes.colour.needsUpdate = true;
                    this._geometry.attributes.angle.needsUpdate = true;
                }

                _UpdateParticles(timeElapsed) {
                    for (let p of this._particles) {
                        p.life -= timeElapsed;
                    }

                    this._particles = this._particles.filter(p => {
                        return p.life > 0.0;
                    });

                    for (let p of this._particles) {
                        const t = 1.0 - p.life / p.maxLife;

                        // p.rotation += timeElapsed * 0.5;
                        p.alpha = this._alphaSpline.Get(t);
                        p.currentSize = p.size * this._sizeSpline.Get(t);
                        p.colour.copy(this._colourSpline.Get(t));

                        //console.log(p.position);

                        p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));

                        const drag = p.velocity.clone();
                        drag.multiplyScalar(timeElapsed * 0.1);
                        drag.x = Math.sign(p.velocity.x) * Math.min(Math.abs(drag.x), Math.abs(p.velocity.x));
                        drag.y = Math.sign(p.velocity.y) * Math.min(Math.abs(drag.y), Math.abs(p.velocity.y));
                        drag.z = Math.sign(p.velocity.z) * Math.min(Math.abs(drag.z), Math.abs(p.velocity.z));
                        p.velocity.sub(drag);
                    }

                    this._particles.sort((a, b) => {
                        const d1 = this._camera.position.distanceTo(a.position);
                        const d2 = this._camera.position.distanceTo(b.position);

                        if (d1 > d2) {
                            return -1;
                        }

                        if (d1 < d2) {
                            return 1;
                        }

                        return 0;
                    });
                }

                Step(timeElapsed) {
                    if (this.on) {
                        this._AddParticles(timeElapsed);
                    }

                    this._UpdateParticles(timeElapsed);
                    this._UpdateGeometry();
                }

                setPosition(posX, posY) {
                    this.curX = posX;
                    this.curY = posY;
                    // this._particles.position.x = posX;
                    // this._particles.position.y = posY;
                }

                setOff() {
                    this.on = false;
                }

                setOn() {
                    this.on = true;
                }

            }

            /***/
        }),

    /***/
    "./src/scripts/utils/Button.js":
        /*!*************************************!*\
          !*** ./src/scripts/utils/Button.js ***!
          \*************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return Button;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);


            class Button extends Phaser.GameObjects.Image {
                constructor(scene, x, y, texture, frame) {
                    super(scene, x, y, texture, frame);

                    this.setInteractive();

                    this.clicked = false;
                    this.focus = false;

                    scene.add.existing(this);

                    this.name = frame;
                    //this.on('pointerup', this.animateRelease, this);
                    this.on('pointerdown', this.animateClick, this);
                }

                animateClick() {
                    if (this.defaultScaleX == undefined) {
                        this.defaultScaleX = this.scaleX;
                        this.defaultScaleY = this.scaleY;
                    }
                    // console.log(this);
                    if (this.clicked) return;
                    this.clicked = true;

                    // console.log("click");
                    // this.scene.tweens.add({
                    //     targets:[this],
                    //     scaleX: this.defaultScaleX - 0.1,
                    //     scaleY: this.defaultScaleY - 0.1,
                    //     tint: '#333333',
                    //     duration:25,
                    //   });

                    this.scene.tweens.addCounter({
                        from: 255,
                        to: 204,
                        duration: 100,
                        onUpdate: (tween) => {
                            const value = Math.floor(tween.getValue());

                            this.setTint(Phaser.Display.Color.GetColor(value, value, value));
                        }
                    });
                }

                animateRelease() {
                    if (!this.clicked) return;
                    this.clicked = false;
                    // console.log("release");
                    // this.scene.tweens.add({
                    //     targets:[this],
                    //     scaleX: this.defaultScaleX,
                    //     scaleY: this.defaultScaleY,
                    //     tint: '#000000',
                    //     duration:25,
                    //   });


                    this.scene.tweens.addCounter({
                        from: 204,
                        to: 255,
                        duration: 100,
                        onUpdate: (tween) => {
                            const value = Math.floor(tween.getValue());

                            this.setTint(Phaser.Display.Color.GetColor(value, value, value));
                        }
                    });
                }

                setChild(child) {
                    this.child = child;
                }

                setFocus(focus) {
                    this.focus = focus;
                    var imageKey = this.name
                    if (focus) imageKey = this.name + "_sel";
                    this.setTexture('game_assets', imageKey);
                }

                pointerout() {
                    var imageKey = this.texture.key;
                    var last4Text = imageKey.substring(imageKey.length - 4, imageKey.length);
                    if (last4Text == "_sel") {
                        imageKey = this.texture.key;
                        imageKey = imageKey.substring(0, imageKey.length - 4);
                        this.setTexture('game_assets', imageKey);
                        this.animateRelease();
                    }
                }

                pointerover() {
                    var imageKey = this.texture.key;
                    var last4Text = imageKey.substring(imageKey.length - 4, imageKey.length);
                    if (last4Text != "_sel") {
                        this.setTexture('game_assets', this.texture.key + "_sel");
                    }
                }

                // preUpdate(time, delta) {}
            }

            /***/
        }),

    /***/
    "./src/scripts/utils/CriticalTrail.js":
        /*!********************************************!*\
          !*** ./src/scripts/utils/CriticalTrail.js ***!
          \********************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return CriticalTrail;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);




            const _VS = `
	uniform float pointMultiplier;

	attribute float size;
	attribute float angle;
	attribute vec4 colour;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

	  gl_Position = projectionMatrix * mvPosition;
	  gl_PointSize = size * pointMultiplier / gl_Position.w;

	  vAngle = vec2(cos(angle), sin(angle));
	  vColour = colour;
	}`;

            const _FS = `

	uniform sampler2D diffuseTexture;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
	  gl_FragColor = texture2D(diffuseTexture, coords) * vColour;
	}`;

            class CriticalTrail {
                constructor(params) {
                    const uniforms = {
                        diffuseTexture: {
                            //value: new THREE.TextureLoader().load('./resources/fire.png')
                            value: params.texturePS
                        },
                        pointMultiplier: {
                            //value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
                            value: 6
                        }
                    };

                    this._material = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].ShaderMaterial({
                        uniforms: uniforms,
                        vertexShader: _VS,
                        fragmentShader: _FS,
                        blending: _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].NormalBlending,
                        depthTest: true,
                        depthWrite: false,
                        transparent: true,
                        vertexColors: true
                    });

                    this.curX = 0;
                    this.curY = 0;
                    this.on = false;
                    this.emitEvery = 0.01;

                    this._camera = params.camera;
                    this._particles = [];

                    this._geometry = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].BufferGeometry();
                    this._geometry.setAttribute('position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 3));
                    this._geometry.setAttribute('size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));
                    this._geometry.setAttribute('colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 4));
                    this._geometry.setAttribute('angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));

                    this._points = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Points(this._geometry, this._material);

                    params.parent.add(this._points);

                    const LinearSpline = __webpack_require__( /*! ./../utils/LinearSpline.js */ "./src/scripts/utils/LinearSpline.js").default;

                    this._alphaSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._alphaSpline.AddPoint(0.0, 1.0);
                    this._alphaSpline.AddPoint(1.0, 1.0);

                    this._colourSpline = new LinearSpline((t, a, b) => {
                        const c = a.clone();
                        return c.lerp(b, t);
                    });

                    this._colourSpline.AddPoint(0.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0x9FF1FF));
                    this._colourSpline.AddPoint(1.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0xFFFFFF));

                    this._sizeSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._sizeSpline.AddPoint(0.0, 0.7);
                    this._sizeSpline.AddPoint(0.5, 0.7);
                    // this._sizeSpline.AddPoint(0.8, 0.7);
                    this._sizeSpline.AddPoint(1.0, 0.0);

                    this._UpdateGeometry();
                }

                _AddParticles(timeElapsed) {
                    // console.log('aaaa ps aaa');
                    if (!this.gdfsghk) {
                        this.gdfsghk = 0.0;
                    }
                    this.gdfsghk += timeElapsed;
                    // const n = Math.floor(this.gdfsghk * 10.0);
                    // this.gdfsghk -= n / 10.0;


                    // for (let i = 0; i < n; i++) {
                    // const life = (Math.random() * 0.75 + 0.25) * 10.0;
                    if (this.gdfsghk >= this.emitEvery) {
                        this.gdfsghk = 0;
                        const life = 1.0;
                        this._particles.push({
                            position: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curX + (Math.random() * 2 - 1) * 0.05,
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curY + (Math.random() * 2 - 1) * 0.05,
                                // (Math.random() * 2 - 1) * 1.0 + 10),
                                -30),
                            size: 15.0,
                            colour: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(),
                            alpha: 1.0,
                            life: life,
                            maxLife: life,
                            rotation: Math.random() * 2.0 * Math.PI,
                            velocity: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(0, 0, 0),
                        });
                    }

                    // }
                }

                _UpdateGeometry() {
                    const positions = [];
                    const sizes = [];
                    const colours = [];
                    const angles = [];

                    for (let p of this._particles) {
                        positions.push(p.position.x, p.position.y, p.position.z);
                        colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
                        sizes.push(p.currentSize);
                        angles.push(p.rotation);
                    }

                    this._geometry.setAttribute(
                        'position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(positions, 3));
                    this._geometry.setAttribute(
                        'size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(sizes, 1));
                    this._geometry.setAttribute(
                        'colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(colours, 4));
                    this._geometry.setAttribute(
                        'angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(angles, 1));

                    this._geometry.attributes.position.needsUpdate = true;
                    this._geometry.attributes.size.needsUpdate = true;
                    this._geometry.attributes.colour.needsUpdate = true;
                    this._geometry.attributes.angle.needsUpdate = true;
                }

                _UpdateParticles(timeElapsed) {
                    for (let p of this._particles) {
                        p.life -= timeElapsed;
                    }

                    this._particles = this._particles.filter(p => {
                        return p.life > 0.0;
                    });

                    for (let p of this._particles) {
                        const t = 1.0 - p.life / p.maxLife;

                        p.rotation += timeElapsed * 0.5;
                        p.alpha = this._alphaSpline.Get(t);
                        p.currentSize = p.size * this._sizeSpline.Get(t);
                        p.colour.copy(this._colourSpline.Get(t));

                        //console.log(p.position);

                        p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));

                        const drag = p.velocity.clone();
                        drag.multiplyScalar(timeElapsed * 0.1);
                        drag.x = Math.sign(p.velocity.x) * Math.min(Math.abs(drag.x), Math.abs(p.velocity.x));
                        drag.y = Math.sign(p.velocity.y) * Math.min(Math.abs(drag.y), Math.abs(p.velocity.y));
                        drag.z = Math.sign(p.velocity.z) * Math.min(Math.abs(drag.z), Math.abs(p.velocity.z));
                        p.velocity.sub(drag);
                    }

                    this._particles.sort((a, b) => {
                        const d1 = this._camera.position.distanceTo(a.position);
                        const d2 = this._camera.position.distanceTo(b.position);

                        if (d1 > d2) {
                            return -1;
                        }

                        if (d1 < d2) {
                            return 1;
                        }

                        return 0;
                    });
                }

                Step(timeElapsed) {
                    if (this.on) {
                        this._AddParticles(timeElapsed);
                    }

                    this._UpdateParticles(timeElapsed);
                    this._UpdateGeometry();
                }

                setPosition(posX, posY) {
                    this.curX = posX;
                    this.curY = posY;
                    // this._particles.position.x = posX;
                    // this._particles.position.y = posY;
                }

                setOff() {
                    this.on = false;
                }

                setOn() {
                    this.on = true;
                }

            }

            /***/
        }),

    /***/
    "./src/scripts/utils/FruitTrail.js":
        /*!*****************************************!*\
          !*** ./src/scripts/utils/FruitTrail.js ***!
          \*****************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return FruitTrail;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);




            const _VS = `
	uniform float pointMultiplier;

	attribute float size;
	attribute float angle;
	attribute vec4 colour;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

	  gl_Position = projectionMatrix * mvPosition;
	  gl_PointSize = size * pointMultiplier / gl_Position.w;

	  vAngle = vec2(cos(angle), sin(angle));
	  vColour = colour;
	}`;

            const _FS = `

	uniform sampler2D diffuseTexture;

	varying vec4 vColour;
	varying vec2 vAngle;

	void main() {
	  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
	  gl_FragColor = texture2D(diffuseTexture, coords) * vColour;
	}`;

            class FruitTrail {
                constructor(params) {
                    const uniforms = {
                        diffuseTexture: {
                            //value: new THREE.TextureLoader().load('./resources/fire.png')
                            value: params.texturePS
                        },
                        pointMultiplier: {
                            //value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
                            value: 6
                        }
                    };

                    this._material = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].ShaderMaterial({
                        uniforms: uniforms,
                        vertexShader: _VS,
                        fragmentShader: _FS,
                        blending: _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].NormalBlending,
                        depthTest: true,
                        depthWrite: false,
                        transparent: true,
                        vertexColors: true
                    });

                    this.curX = 0;
                    this.curY = 0;
                    this.on = false;
                    this.emitEvery = 0.05;

                    this._camera = params.camera;
                    this._particles = [];

                    this._geometry = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].BufferGeometry();
                    this._geometry.setAttribute('position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 3));
                    this._geometry.setAttribute('size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));
                    this._geometry.setAttribute('colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 4));
                    this._geometry.setAttribute('angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute([], 1));

                    this._points = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Points(this._geometry, this._material);

                    params.parent.add(this._points);

                    const LinearSpline = __webpack_require__( /*! ./../utils/LinearSpline.js */ "./src/scripts/utils/LinearSpline.js").default;

                    this._alphaSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._alphaSpline.AddPoint(0.0, 0.05);
                    this._alphaSpline.AddPoint(1.0, 0.0);

                    this._colourSpline = new LinearSpline((t, a, b) => {
                        const c = a.clone();
                        return c.lerp(b, t);
                    });
                    this._colourSpline.AddPoint(0.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0xBCB986));
                    this._colourSpline.AddPoint(1.0, new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(0xBCB986));

                    this._sizeSpline = new LinearSpline((t, a, b) => {
                        return a + t * (b - a);
                    });
                    this._sizeSpline.AddPoint(0.0, 1.0);
                    this._sizeSpline.AddPoint(1.0, 0.5);

                    this._UpdateGeometry();
                }

                _AddParticles(timeElapsed) {
                    // console.log('aaaa ps aaa');
                    if (!this.gdfsghk) {
                        this.gdfsghk = 0.0;
                    }
                    this.gdfsghk += timeElapsed;
                    // const n = Math.floor(this.gdfsghk * 10.0);
                    // this.gdfsghk -= n / 10.0;


                    // for (let i = 0; i < n; i++) {
                    // const life = (Math.random() * 0.75 + 0.25) * 10.0;
                    if (this.gdfsghk >= this.emitEvery) {
                        this.gdfsghk = 0;
                        const life = 0.5;
                        this._particles.push({
                            position: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curX,
                                // (Math.random() * 2 - 1) * 1.0,
                                this.curY,
                                // (Math.random() * 2 - 1) * 1.0 + 10),
                                -30),
                            size: 20.0,
                            colour: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Color(),
                            alpha: 1.0,
                            life: life,
                            maxLife: life,
                            rotation: Math.random() * 2.0 * Math.PI,
                            velocity: new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(0, 0, 0),
                        });
                    }

                    // }
                }

                _UpdateGeometry() {
                    const positions = [];
                    const sizes = [];
                    const colours = [];
                    const angles = [];

                    for (let p of this._particles) {
                        positions.push(p.position.x, p.position.y, p.position.z);
                        colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
                        sizes.push(p.currentSize);
                        angles.push(p.rotation);
                    }

                    this._geometry.setAttribute(
                        'position', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(positions, 3));
                    this._geometry.setAttribute(
                        'size', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(sizes, 1));
                    this._geometry.setAttribute(
                        'colour', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(colours, 4));
                    this._geometry.setAttribute(
                        'angle', new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Float32BufferAttribute(angles, 1));

                    this._geometry.attributes.position.needsUpdate = true;
                    this._geometry.attributes.size.needsUpdate = true;
                    this._geometry.attributes.colour.needsUpdate = true;
                    this._geometry.attributes.angle.needsUpdate = true;
                }

                _UpdateParticles(timeElapsed) {
                    for (let p of this._particles) {
                        p.life -= timeElapsed;
                    }

                    this._particles = this._particles.filter(p => {
                        return p.life > 0.0;
                    });

                    for (let p of this._particles) {
                        const t = 1.0 - p.life / p.maxLife;

                        p.rotation += timeElapsed * 0.5;
                        p.alpha = this._alphaSpline.Get(t);
                        p.currentSize = p.size * this._sizeSpline.Get(t);
                        p.colour.copy(this._colourSpline.Get(t));

                        //console.log(p.position);

                        p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));

                        const drag = p.velocity.clone();
                        drag.multiplyScalar(timeElapsed * 0.1);
                        drag.x = Math.sign(p.velocity.x) * Math.min(Math.abs(drag.x), Math.abs(p.velocity.x));
                        drag.y = Math.sign(p.velocity.y) * Math.min(Math.abs(drag.y), Math.abs(p.velocity.y));
                        drag.z = Math.sign(p.velocity.z) * Math.min(Math.abs(drag.z), Math.abs(p.velocity.z));
                        p.velocity.sub(drag);
                    }

                    this._particles.sort((a, b) => {
                        const d1 = this._camera.position.distanceTo(a.position);
                        const d2 = this._camera.position.distanceTo(b.position);

                        if (d1 > d2) {
                            return -1;
                        }

                        if (d1 < d2) {
                            return 1;
                        }

                        return 0;
                    });
                }

                Step(timeElapsed) {
                    if (this.on) {
                        this._AddParticles(timeElapsed);
                    }

                    this._UpdateParticles(timeElapsed);
                    this._UpdateGeometry();
                }

                setPosition(posX, posY) {
                    this.curX = posX;
                    this.curY = posY;
                    // this._particles.position.x = posX;
                    // this._particles.position.y = posY;
                }

                setOff() {
                    this.on = false;
                }

                setOn() {
                    this.on = true;
                }

            }

            /***/
        }),

    /***/
    "./src/scripts/utils/LinearSpline.js":
        /*!*******************************************!*\
          !*** ./src/scripts/utils/LinearSpline.js ***!
          \*******************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return LinearSpline;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);


            class LinearSpline {
                constructor(lerp) {
                    this._points = [];
                    this._lerp = lerp;
                }

                AddPoint(t, d) {
                    this._points.push([t, d]);
                }

                Get(t) {
                    let p1 = 0;

                    for (let i = 0; i < this._points.length; i++) {
                        if (this._points[i][0] >= t) {
                            break;
                        }
                        p1 = i;
                    }

                    const p2 = Math.min(this._points.length - 1, p1 + 1);

                    if (p1 == p2) {
                        return this._points[p1][1];
                    }

                    return this._lerp(
                        (t - this._points[p1][0]) / (
                            this._points[p2][0] - this._points[p1][0]),
                        this._points[p1][1], this._points[p2][1]);
                }
            }

            /***/
        }),

    /***/
    "./src/scripts/utils/ScreenShake.js":
        /*!******************************************!*\
          !*** ./src/scripts/utils/ScreenShake.js ***!
          \******************************************/
        /*! exports provided: default */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "default", function() {
                return ScreenShake;
            });
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @enable3d/phaser-extension */ "./node_modules/@enable3d/phaser-extension/dist/index.js");
            /* harmony import */
            var _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__);

            function ScreenShake() {

                return {

                    // When a function outside ScreenShake handle the camera, it should
                    // always check that ScreenShake.enabled is false before.
                    enabled: false,

                    _timestampStart: undefined,

                    _timestampEnd: undefined,

                    _startPoint: undefined,

                    _endPoint: undefined,



                    // update(camera) must be called in the loop function of the renderer,
                    // it will re-position the camera according to the requested shaking.
                    update: function update(camera) {
                        if (this.enabled == true) {
                            const now = Date.now();
                            if (this._timestampEnd > now) {
                                let interval = (Date.now() - this._timestampStart) /
                                    (this._timestampEnd - this._timestampStart);
                                this.computePosition(camera, interval);
                            } else {
                                camera.position.copy(this._startPoint);
                                this.enabled = false;
                            };
                        };
                    },



                    // This initialize the values of the shaking.
                    // vecToAdd param is the offset of the camera position at the climax of its wave.
                    shake: function shake(camera, vecToAdd, milliseconds) {
                        this.enabled = true;
                        this._timestampStart = Date.now();
                        this._timestampEnd = this._timestampStart + milliseconds;
                        this._startPoint = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3().copy(camera.position);
                        this._endPoint = new _enable3d_phaser_extension__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3().addVectors(camera.position, vecToAdd);
                    },




                    computePosition: function computePosition(camera, interval) {

                        // This creates the wavy movement of the camera along the interval.
                        // The first bloc call this.getQuadra() with a positive indice between
                        // 0 and 1, then the second call it again with a negative indice between
                        // 0 and -1, etc. Variable position will get the sign of the indice, and
                        // get wavy.
                        if (interval < 0.4) {
                            var position = this.getQuadra(interval / 0.4);
                        } else if (interval < 0.7) {
                            var position = this.getQuadra((interval - 0.4) / 0.3) * -0.6;
                        } else if (interval < 0.9) {
                            var position = this.getQuadra((interval - 0.7) / 0.2) * 0.3;
                        } else {
                            var position = this.getQuadra((interval - 0.9) / 0.1) * -0.1;
                        }

                        // if (interval < 0.1) {
                        // 	var position = this.getQuadra( interval / 0.1 );
                        // } else if (interval < 0.2) {
                        // 	var position = this.getQuadra( (interval-0.1) / 0.8 ) * -0.6;
                        // } else if (interval < 0.3) {
                        // 	var position = this.getQuadra( (interval-0.3) / 0.7 ) * 0.3;
                        // }else if (interval < 0.4) {
                        // 	var position = this.getQuadra( (interval-0.4) / 0.6 );
                        // } else if (interval < 0.7) {
                        // 	var position = this.getQuadra( (interval-0.4) / 0.3 ) * -0.6;
                        // } else if (interval < 0.9) {
                        // 	var position = this.getQuadra( (interval-0.7) / 0.2 ) * 0.3;
                        // } else {
                        // 	var position = this.getQuadra( (interval-0.9) / 0.1 ) * -0.1;
                        // }

                        // Here the camera is positioned according to the wavy 'position' variable.
                        camera.position.lerpVectors(this._startPoint, this._endPoint, position);
                    },

                    // This is a quadratic function that return 0 at first, then return 0.5 when t=0.5,
                    // then return 0 when t=1 ;
                    getQuadra: function getQuadra(t) {
                        return 9.436896e-16 + (4 * t) - (4 * (t * t));
                    }

                };

            };


            /***/
        }),

    /***/
    "./webpack/credits.js":
        /*!****************************!*\
          !*** ./webpack/credits.js ***!
          \****************************/
        /*! no static exports found */
        /***/
        (function(module, exports) {

            /**
             * PLEASE DO NOT REMOVE THIS NOTICE!
             *
             * @template        This Phaser game was built using phaser-project-template (https://github.com/yandeu/phaser-project-template)
             * @author          Yannick Deubel (https://github.com/yandeu)
             * @copyright       2019 Yannick Deubel
             * @license         {@link https://github.com/yandeu/phaser-project-template/blob/master/LICENSE|MIT License}
             */

            // Of course you can remove it if you really want to, but it would be nice if you would leave it there :)

            console.log(
                '%c %c %c %c %c Built using phaser-project-template %c https://github.com/yandeu/phaser-project-template',
                'background: #ff0000',
                'background: #ffff00',
                'background: #00ff00',
                'background: #00ffff',
                'color: #fff; background: #000000;',
                'background: none'
            )


            /***/
        }),

    /***/
    0:
        /*!********************************************************!*\
          !*** multi ./src/scripts/game.ts ./webpack/credits.js ***!
          \********************************************************/
        /*! no static exports found */
        /***/
        (function(module, exports, __webpack_require__) {

            __webpack_require__( /*! ./src/scripts/game.ts */ "./src/scripts/game.ts");
            module.exports = __webpack_require__( /*! ./webpack/credits.js */ "./webpack/credits.js");


            /***/
        })

    /******/
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYW1lb2JqZWN0cy9CbGFkZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYW1lb2JqZWN0cy9Db21ib1RleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2FtZW9iamVjdHMvQ3JpdGljYWxUZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWVvYmplY3RzL0ZydWl0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYW1lb2JqZWN0cy9TbGljZUNyaXRpY2FsRWZmZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWVvYmplY3RzL1NsaWNlRWZmZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjZW5lcy9tYWluU2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2NlbmVzL3ByZUxvYWRpbmdTY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY2VuZXMvcHJlbG9hZFNjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL0JvbWJTbW9rZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9Cb21iVHJhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL0NyaXRpY2FsVHJhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvRnJ1aXRUcmFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9MaW5lYXJTcGxpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvU2NyZWVuU2hha2UuanMiLCJ3ZWJw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O0FBQ0E7QUFDQTs7QUFFQSxZQUFZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7O0FDdmNBO0FBQUE7QUFBQTtBQUFBO0FBQWE7QUFDOEU7QUFDNUU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQThELDZEQUE2RDtBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0ZBQXdGLDZEQUE2RDtBQUNySjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUdBQXlHLDhEQUE4RDtBQUN2SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQStELDZEQUE2RDtBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQStELDZEQUE2RDtBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUZBQXlGLDZEQUE2RDtBQUN0SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUZBQXlGLDZEQUE2RDtBQUN0SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEdBQTBHLDhEQUE4RDtBQUN4SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEdBQTBHLDhEQUE4RDtBQUN4SztB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QUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7QUNyekNBO0FBQUE7QUFBQTtBQUFBO0FBQWE7QUFDOEU7QUFDNUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxDOzs7Ozs7Ozs7Ozs7QUMxREE7QUFBQTtBQUFBO0FBQUE7QUFBYTtBQUM4RTtBQUM1RTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7OztBQUdUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RDtBQUNBLHdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7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O0FBQzVCO0FBQ0Esc0JBQXNCLGdFQUFLOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEM7Ozs7Ozs7Ozs7OztBQzVPQTtBQUFBO0FBQUE7QUFBQTtBQUFhO0FBQzhFO0FBQzVFO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7OztBQUdkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CO0FBQ0EsMkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBOztBQUVBLGtCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7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IGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tICdwaGFzZXInXHJcbmltcG9ydCB7IGVuYWJsZTNkLCBDYW52YXMgfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuaW1wb3J0IE1haW5TY2VuZSBmcm9tICcuL3NjZW5lcy9tYWluU2NlbmUnXHJcbmltcG9ydCBQcmVsb2FkU2NlbmUgZnJvbSAnLi9zY2VuZXMvcHJlbG9hZFNjZW5lJ1xyXG5pbXBvcnQgUHJlbG9hZGluZ1NjZW5lIGZyb20gJy4vc2NlbmVzL3ByZUxvYWRpbmdTY2VuZSdcclxuXHJcbmNvbnN0IGNvbmZpZzogUGhhc2VyLlR5cGVzLkNvcmUuR2FtZUNvbmZpZyA9IHtcclxuICB0eXBlOiBQaGFzZXIuV0VCR0wsXHJcbiAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgc2NhbGU6IHtcclxuICAgIG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICBhdXRvQ2VudGVyOiBQaGFzZXIuU2NhbGUuQ0VOVEVSX0JPVEgsXHJcbiAgICB3aWR0aDogMTI4MCxcclxuICAgIGhlaWdodDogNzY4XHJcbiAgfSxcclxuICBwYXJlbnQ6J3BoYXNlci1jYW52YXMnLFxyXG4gIGZwczoge1xyXG4gICAgdGFyZ2V0OiA2MCxcclxuICAgIGZvcmNlU2V0VGltZU91dDogdHJ1ZVxyXG4gIH0sXHJcbiAgYXVkaW86IHtcclxuICAgIGRpc2FibGVXZWJBdWRpbzogZmFsc2VcclxuICB9LFxyXG4gIHNjZW5lOiBbUHJlbG9hZGluZ1NjZW5lLCBQcmVsb2FkU2NlbmUsIE1haW5TY2VuZV0sXHJcbiAgYmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgLi4uQ2FudmFzKClcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgZW5hYmxlM2QoKCkgPT4gbmV3IFBoYXNlci5HYW1lKGNvbmZpZykpLndpdGhQaHlzaWNzKCdhc3NldHMvYW1tbycpXHJcbn0pXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5pbXBvcnQgeyBTY2VuZTNELCBUSFJFRSwgRXh0ZW5kZWRPYmplY3QzRCwgRXh0ZW5kZWRNZXNoIH0gZnJvbSAnQGVuYWJsZTNkL3BoYXNlci1leHRlbnNpb24nXHJcblxyXG52YXIgY3VycmVudFNjcmVlbiA9IFwiSG9tZVNjcmVlblwiO1xyXG52YXIgY2xpY2tlZEhvbWVDbGFzc2ljID0gZmFsc2U7XHJcbnZhciBjbGlja2VkSG9tZVNldHRpbmcgPSBmYWxzZTtcclxudmFyIGNsaWNrZWRTZXR0aW5nQmFjayA9IGZhbHNlO1xyXG52YXIgY2xpY2tlZFJlc3VsdFF1aXQgPSBmYWxzZTtcclxudmFyIGNsaWNrZWRSZXN1bHRSZXRyeSA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxhZGV7XHJcblxyXG5cdCAgY29uc3RydWN0b3Ioc2NlbmUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGFzaGVzID0gdGhpcy5zY2VuZS5hZGQuZ3JhcGhpY3MoMCwwKTtcclxuXHQgICAgdGhpcy5zbGFzaGVzMiA9IHRoaXMuc2NlbmUuYWRkLmdyYXBoaWNzKDAsMCk7XHJcblx0ICAgIHRoaXMuc2xhc2hlczMgPSB0aGlzLnNjZW5lLmFkZC5ncmFwaGljcygwLDApO1xyXG5cdCAgICB0aGlzLnNsYXNoZXM0ID0gdGhpcy5zY2VuZS5hZGQuZ3JhcGhpY3MoMCwwKTtcclxuXHJcblx0ICAgIHRoaXMuc2xhc2hlcy5zZXREZXB0aCgyKTtcclxuXHQgICAgdGhpcy5zbGFzaGVzMi5zZXREZXB0aCgyKTtcclxuXHQgICAgdGhpcy5zbGFzaGVzMy5zZXREZXB0aCgyKTtcclxuXHQgICAgdGhpcy5zbGFzaGVzNC5zZXREZXB0aCgyKTtcclxuXHJcblx0ICAgIHRoaXMuY3JlYXRlKCk7XHJcblx0ICAgIHRoaXMubGFzdFRpbWVTdGFtcCA9IDA7XHJcblxyXG5cdCAgICB0aGlzLlNsaWNlRWZmZWN0ID0gcmVxdWlyZSgnLi8uLi9nYW1lb2JqZWN0cy9TbGljZUVmZmVjdC5qcycpLmRlZmF1bHQ7XHJcblx0ICAgIHRoaXMucG9vbFNsaWNlRWZmZWN0PVtdO1xyXG5cdCAgICB0aGlzLmFjdGl2ZVNsaWNlRWZmZWN0PVtdO1xyXG5cclxuXHQgICAgZm9yKGxldCBpPTA7aTwxMDtpKyspe1xyXG5cdCAgICBcdGxldCBzbGljZUVmZmVjdCA9IG5ldyB0aGlzLlNsaWNlRWZmZWN0KHRoaXMuc2NlbmUsMCwwLCdTbGljZURpYW1vbmROZXV0cmFsJyk7XHJcblx0ICAgIFx0c2xpY2VFZmZlY3QuZGVhY3RpdmF0ZSgpO1xyXG5cdCAgICBcdHRoaXMucG9vbFNsaWNlRWZmZWN0LnB1c2goc2xpY2VFZmZlY3QpO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB0aGlzLlNsaWNlQ3JpdGljYWxFZmZlY3QgPSByZXF1aXJlKCcuLy4uL2dhbWVvYmplY3RzL1NsaWNlQ3JpdGljYWxFZmZlY3QuanMnKS5kZWZhdWx0O1xyXG5cdCAgICB0aGlzLnBvb2xTbGljZUNyaXRpY2FsRWZmZWN0PVtdO1xyXG5cdCAgICB0aGlzLmFjdGl2ZVNsaWNlQ3JpdGljYWxFZmZlY3Q9W107XHJcblxyXG5cdCAgICBmb3IobGV0IGk9MDtpPDEwO2krKyl7XHJcblx0ICAgIFx0bGV0IHNsaWNlQ3JpdGljYWxFZmZlY3QgPSBuZXcgdGhpcy5TbGljZUNyaXRpY2FsRWZmZWN0KHRoaXMuc2NlbmUsMCwwKTtcclxuXHQgICAgXHRzbGljZUNyaXRpY2FsRWZmZWN0LmRlYWN0aXZhdGUoKTtcclxuXHQgICAgXHR0aGlzLnBvb2xTbGljZUNyaXRpY2FsRWZmZWN0LnB1c2goc2xpY2VDcml0aWNhbEVmZmVjdCk7XHJcblx0ICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYXN5bmMgY3JlYXRlKCl7XHJcbiAgICAgIH1cclxuXHJcblx0ICBjaGFuZ2VDdXJyZW50U2NyZWVuKHNjcmVlbk5hbWUpe1xyXG5cdFx0Y3VycmVudFNjcmVlbiA9IHNjcmVlbk5hbWU7XHJcblx0ICB9XHJcblxyXG5cdCAgZ2V0Q3VycmVudFNjcmVlbigpe1xyXG5cdFx0cmV0dXJuIGN1cnJlbnRTY3JlZW47XHJcblx0ICB9XHJcblxyXG5cdCAgY2hhbmdlQ2xpY2tlZEhvbWVDbGFzc2ljKHZhbCl7XHJcblx0XHRjbGlja2VkSG9tZUNsYXNzaWMgPSB2YWw7XHJcblx0ICB9XHJcblxyXG5cdCAgZ2V0Q2xpY2tlZEhvbWVDbGFzc2ljKCl7XHJcblx0XHRyZXR1cm4gY2xpY2tlZEhvbWVDbGFzc2ljO1xyXG5cdCAgfVxyXG5cclxuXHQgIGNoYW5nZUNsaWNrZWRIb21lU2V0dGluZyh2YWwpe1xyXG5cdFx0Y2xpY2tlZEhvbWVTZXR0aW5nID0gdmFsO1xyXG5cdCAgfVxyXG5cclxuXHQgIGdldENsaWNrZWRIb21lU2V0dGluZygpe1xyXG5cdFx0cmV0dXJuIGNsaWNrZWRIb21lU2V0dGluZztcclxuXHQgIH1cclxuXHJcblx0ICBjaGFuZ2VDbGlja2VkU2V0dGluZ0JhY2sodmFsKXtcclxuXHRcdGNsaWNrZWRTZXR0aW5nQmFjayA9IHZhbDtcclxuXHQgIH1cclxuXHJcblx0ICBnZXRDbGlja2VkU2V0dGluZ0JhY2soKXtcclxuXHRcdHJldHVybiBjbGlja2VkU2V0dGluZ0JhY2s7XHJcblx0ICB9XHJcblxyXG5cdCAgY2hhbmdlQ2xpY2tlZFJlc3VsdFF1aXQodmFsKXtcclxuXHRcdGNsaWNrZWRSZXN1bHRRdWl0ID0gdmFsO1xyXG5cdCAgfVxyXG5cclxuXHQgIGdldENsaWNrZWRSZXN1bHRRdWl0KCl7XHJcblx0XHRyZXR1cm4gY2xpY2tlZFJlc3VsdFF1aXQ7XHJcblx0ICB9XHJcblxyXG5cdCAgY2hhbmdlQ2xpY2tlZFJlc3VsdFJldHJ5KHZhbCl7XHJcblx0XHRjbGlja2VkUmVzdWx0UmV0cnkgPSB2YWw7XHJcblx0ICB9XHJcblxyXG5cdCAgZ2V0Q2xpY2tlZFJlc3VsdFJldHJ5KCl7XHJcblx0XHRyZXR1cm4gY2xpY2tlZFJlc3VsdFJldHJ5O1xyXG5cdCAgfVxyXG5cclxuXHQgIGNyZWF0ZUJsYWRlKHRyYWlsLHBvaW50cyxtYXhIZWlnaHQsY29sb3Ipe1xyXG5cdCAgICB0cmFpbC5jbGVhcigpO1xyXG5cdCAgICBsZXQgbGFzdFBvcyA9IDI7Ly80XHJcblx0ICAgIGlmIChwb2ludHMubGVuZ3RoID4gbGFzdFBvcykge1xyXG5cdCAgICAgICAgICB0cmFpbC5saW5lU3R5bGUoMSwgMHhGRkZGMDAsIDEuMCk7XHJcblx0ICAgICAgICAgIHRyYWlsLmJlZ2luUGF0aCgpO1xyXG5cdCAgICAgICAgICB0cmFpbC5saW5lU3R5bGUoMCwgMHhGRkZGMDAsIDEuMCk7XHJcblxyXG5cdCAgICAgICAgICB0cmFpbC5tb3ZlVG8ocG9pbnRzWzBdLngsIHBvaW50c1swXS55KTtcclxuXHQgICAgICAgICAgXHJcblx0ICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBwb2ludHMubGVuZ3RoIC0gbGFzdFBvczsgKytpbmRleClcclxuXHQgICAgICAgICAge1xyXG5cdCAgICAgICAgICAgICAgdmFyIHBvaW50ID0gcG9pbnRzW2luZGV4XTtcclxuXHQgICAgICAgICAgICAgIGxldCBzdHJva2VTaXplID0gdGhpcy5saW5lYXJJbnRlcnBvbGF0aW9uKGluZGV4IC8gKHBvaW50cy5sZW5ndGggLSBsYXN0UG9zKSwgMCwgbWF4SGVpZ2h0KTtcclxuXHQgICAgICAgICAgICAgIHRyYWlsLmxpbmVTdHlsZShcclxuXHQgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVhckludGVycG9sYXRpb24oaW5kZXggLyAocG9pbnRzLmxlbmd0aCAtIGxhc3RQb3MpLCAwLCBtYXhIZWlnaHQpLFxyXG5cdCAgICAgICAgICAgICAgICAgIGNvbG9yLFxyXG5cdCAgICAgICAgICAgICAgICAgIDEuMFxyXG5cdCAgICAgICAgICAgICAgKTtcclxuXHQgICAgICAgICAgICAgIC8vdHJhaWwuc2V0RmlsbCgnYmxhZGVfYmFzaWMnKTtcclxuXHQgICAgICAgICAgICAgIHRyYWlsLmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuXHQgICAgICAgICAgfVxyXG5cdCAgICAgICAgICB2YXIgY291bnQgPSAwO1xyXG5cdCAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IHBvaW50cy5sZW5ndGggLSBsYXN0UG9zOyBpbmRleCA8IHBvaW50cy5sZW5ndGg7ICsraW5kZXgpXHJcblx0ICAgICAgICAgIHtcclxuXHQgICAgICAgICAgICAgIHZhciBwb2ludCA9IHBvaW50c1tpbmRleF07XHJcblx0ICAgICAgICAgICAgICBjb3VudCs9MTtcclxuXHQgICAgICAgICAgICAgIGxldCBzdHJva2VTaXplID0gdGhpcy5saW5lYXJJbnRlcnBvbGF0aW9uKGNvdW50IC8gbGFzdFBvcywgbWF4SGVpZ2h0LCAzKTtcclxuXHQgICAgICAgICAgICAgIHRyYWlsLmxpbmVTdHlsZShcclxuXHQgICAgICAgICAgICAgICAgICBzdHJva2VTaXplLFxyXG5cdCAgICAgICAgICAgICAgICAgIGNvbG9yLFxyXG5cdCAgICAgICAgICAgICAgICAgIDEuMFxyXG5cdCAgICAgICAgICAgICAgKTtcclxuXHQgICAgICAgICAgICAgIHRyYWlsLmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuXHQgICAgICAgICAgfVxyXG5cdCAgICAgICAgICB0cmFpbC5zdHJva2VQYXRoKCk7XHJcblx0ICAgICAgICAgIHRyYWlsLmNsb3NlUGF0aCgpO1xyXG5cdCAgICAgIH1cclxuXHQgIH1cclxuXHJcblx0ICB1cGRhdGVCbGFkZShkZWx0YSl7XHJcblx0ICAgICAgbGV0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG5cclxuXHQgICAgICBsZXQgbWF4SGVpZ2h0ID0gMzI7XHJcblxyXG5cdCAgICAgIHRoaXMuY3JlYXRlQmxhZGUodGhpcy5zbGFzaGVzLHRoaXMucG9pbnRzLDQ4LDB4NDE1NjdBKTtcclxuXHQgICAgICB0aGlzLmNyZWF0ZUJsYWRlKHRoaXMuc2xhc2hlczIsdGhpcy5wb2ludHMsNDAsMHg3RDkxQTUpO1xyXG5cdCAgICAgIHRoaXMuY3JlYXRlQmxhZGUodGhpcy5zbGFzaGVzMyx0aGlzLnBvaW50cywzMiwweEM5REZENyk7XHJcblx0ICAgICAgdGhpcy5jcmVhdGVCbGFkZSh0aGlzLnNsYXNoZXM0LHRoaXMucG9pbnRzLDI0LDB4RkZGRkZGKTtcclxuXHJcblx0ICAgICAgbGV0IHBsYXlBbnkgPSBmYWxzZTtcclxuXHQgICAgICB0aGlzLmxhc3RUaW1lU3RhbXAgLT0gZGVsdGE7XHJcblx0ICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHBvaW50cy5sZW5ndGg7ICsraW5kZXgpXHJcblx0ICAgICAge1xyXG5cdCAgICAgICAgICB2YXIgcG9pbnQgPSBwb2ludHNbaW5kZXhdO1xyXG5cclxuXHQgICAgICAgICAgaWYocG9pbnQuZmlyc3Qpe1xyXG5cdCAgICAgICAgICBcdGlmKGluZGV4PjApe1xyXG5cdCAgICAgICAgICBcdFx0bGV0IGRpc3RhbmNlWCA9IHBvaW50LnggLSBwb2ludHNbaW5kZXgtMV0ueDtcclxuXHQgICAgICAgICAgXHRcdGxldCBkaXN0YW5jZVkgPSBwb2ludC55IC0gcG9pbnRzW2luZGV4LTFdLnk7XHJcblx0ICAgICAgICAgIFx0XHRsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZGlzdGFuY2VYKmRpc3RhbmNlWCArIGRpc3RhbmNlWSpkaXN0YW5jZVkpO1xyXG5cdCAgICAgICAgICBcdFx0aWYoZGlzdGFuY2UgPiA1MCAmJiAhcGxheUFueSAmJiB0aGlzLmxhc3RUaW1lU3RhbXA8PTApe1xyXG5cdCAgICAgICAgICBcdFx0XHRpZighdGhpcy5zY2VuZS5TRlhNdXRlZCl7XHJcblx0ICAgICAgICAgIFx0XHRcdFx0dGhpcy5zY2VuZS5zb3VuZC5wbGF5KCdCbGFkZVJlZ3VsYXJTd2lwZTAnK1BoYXNlci5NYXRoLkJldHdlZW4oMSw3KSk7XHJcblx0ICAgICAgICAgIFx0XHRcdH1cclxuXHQgICAgICAgICAgXHRcdFx0dGhpcy5sYXN0VGltZVN0YW1wID0gMjAwO1xyXG5cdCAgICAgICAgICBcdFx0XHRwbGF5QW55ID0gdHJ1ZTtcclxuXHQgICAgICAgICAgXHRcdH1cclxuXHQgICAgICAgICAgXHR9XHJcblx0ICAgICAgICAgIFx0cG9pbnQuZmlyc3QgPSBmYWxzZTtcclxuXHQgICAgICAgICAgfVxyXG5cdCAgICAgICAgICBwb2ludC50aW1lIC09IDAuNTtcclxuXHQgICAgICAgICAgaWYgKHBvaW50LnRpbWUgPD0gMClcclxuXHQgICAgICAgICAge1xyXG5cdCAgICAgICAgICAgICAgcG9pbnRzLnNwbGljZShpbmRleCwgMSk7XHJcblx0ICAgICAgICAgICAgICBpbmRleCAtPSAxO1xyXG5cdCAgICAgICAgICB9XHJcblx0ICAgICAgICAgIFxyXG5cdCAgICAgIH1cclxuXHJcblx0ICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmFjdGl2ZVNsaWNlRWZmZWN0Lmxlbmd0aDtpKyspe1xyXG5cdCAgICAgIFx0aWYodGhpcy5hY3RpdmVTbGljZUVmZmVjdFtpXS52aXNpYmxlID09IGZhbHNlKXtcclxuXHQgICAgICBcdFx0dGhpcy5wb29sU2xpY2VFZmZlY3QucHVzaCh0aGlzLmFjdGl2ZVNsaWNlRWZmZWN0W2ldKTtcclxuXHQgICAgICBcdFx0dGhpcy5hY3RpdmVTbGljZUVmZmVjdC5zcGxpY2UoaSwxKTtcclxuXHQgICAgICBcdH1cclxuXHQgICAgICB9XHJcblxyXG5cclxuXHQgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuYWN0aXZlU2xpY2VDcml0aWNhbEVmZmVjdC5sZW5ndGg7aSsrKXtcclxuXHQgICAgICBcdGlmKHRoaXMuYWN0aXZlU2xpY2VDcml0aWNhbEVmZmVjdFtpXS52aXNpYmxlID09IGZhbHNlKXtcclxuXHQgICAgICBcdFx0dGhpcy5wb29sU2xpY2VDcml0aWNhbEVmZmVjdC5wdXNoKHRoaXMuYWN0aXZlU2xpY2VDcml0aWNhbEVmZmVjdFtpXSk7XHJcblx0ICAgICAgXHRcdHRoaXMuYWN0aXZlU2xpY2VDcml0aWNhbEVmZmVjdC5zcGxpY2UoaSwxKTtcclxuXHQgICAgICBcdH1cclxuXHQgICAgICB9XHJcblx0ICAgICAgXHJcblx0ICB9XHJcblxyXG5cdCAgY2hlY2tGcnVpdHMoZnJ1aXRGYWN0b3J5KXtcclxuXHQgIFx0bGV0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG5cdCAgXHRsZXQgbGlzdEZydWl0cyA9IGZydWl0RmFjdG9yeS5nZXRMaXN0RnJ1aXRzKCk7XHJcblx0ICBcdGxldCBjb3VudCA9IDA7XHJcblxyXG5cdCAgXHRmb3IgKHZhciBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgICBsZXQgbGluZSA9IG5ldyBQaGFzZXIuR2VvbS5MaW5lKHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSwgcG9pbnRzW2kgLSAxXS54LCBwb2ludHNbaSAtIDFdLnkpO1xyXG5cclxuXHQgICAgICAgICAgbGlzdEZydWl0cy5mb3JFYWNoKGZydWl0T2JqID0+IHtcclxuXHQgICAgICAgICAgXHRpZihmcnVpdE9iai5hY3RpdmUpe1xyXG5cdFx0ICAgICAgICAgICAgICBsZXQgcG9zRnJ1aXQgPSB0aGlzLnNjZW5lLnRoaXJkLnRyYW5zZm9ybS5mcm9tM2R0bzJkKGZydWl0T2JqLm9iamVjdC5wb3NpdGlvbik7XHJcblx0XHQgICAgICAgICAgICAgIGxldCBmcnVpdCA9IHt4OnBvc0ZydWl0LngseTpwb3NGcnVpdC55LHdpZHRoOjEwMCxoZWlnaHQ6MTAwfTtcclxuXHRcdCAgICAgICAgICAgICAgaWYodGhpcy5jaGVja0ludGVyc2VjdHMoZnJ1aXQsbGluZSkpe1xyXG5cdFx0ICAgICAgICAgICAgICBcdGxldCBkeSA9IHBvaW50c1tpXS55IC0gcG9pbnRzW2ktMV0ueTtcclxuXHRcdCAgICAgICAgICAgICAgXHRsZXQgZHggPSBwb2ludHNbaV0ueCAtIHBvaW50c1tpLTFdLng7XHJcblx0XHQgICAgICAgICAgICAgIFx0bGV0IGRlZ3JlZSA9IE1hdGguYXRhbjIoLWR5LGR4KSAvIE1hdGguUEkgKiAxODA7XHJcblx0XHQgICAgICAgICAgICAgIFx0bGV0IHJlc1NsaWNlID0gdGhpcy5zY2VuZS5mcnVpdEZhY3Rvcnkuc2xpY2UoZnJ1aXRPYmosZGVncmVlKTtcclxuXHRcdCAgICAgICAgICAgICAgICBpZihyZXNTbGljZSE9LTEpe1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0bGV0IHNsaWNlRWZmZWN0O1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0bGV0IHNwbGFzaEVmZmVjdDtcclxuXHJcblx0XHQgICAgICAgICAgICAgICAgXHRpZihyZXNTbGljZT09MSl7XHJcblx0XHQgICAgICAgICAgICAgICAgXHRcdGlmKHRoaXMucG9vbFNsaWNlRWZmZWN0Lmxlbmd0aD09MCl7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdFx0c2xpY2VFZmZlY3QgPSBuZXcgdGhpcy5TbGljZUVmZmVjdCh0aGlzLnNjZW5lLHBvc0ZydWl0LngscG9zRnJ1aXQueSwnU2xpY2VEaWFtb25kTmV1dHJhbCcpO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHR9ZWxzZXtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0XHRzbGljZUVmZmVjdCA9IHRoaXMucG9vbFNsaWNlRWZmZWN0WzBdO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRcdHNsaWNlRWZmZWN0LnNldFRleHR1cmUoJ1NsaWNlRGlhbW9uZE5ldXRyYWwnKTtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0XHR0aGlzLnBvb2xTbGljZUVmZmVjdC5zcGxpY2UoMCwxKTtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0fVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRzbGljZUVmZmVjdC54ID0gcG9zRnJ1aXQueDtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0c2xpY2VFZmZlY3QueSA9IHBvc0ZydWl0Lnk7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdHRoaXMuc2NlbmUubGFzdFBvc1ggPSBwb3NGcnVpdC54O1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHR0aGlzLnNjZW5lLmxhc3RQb3NZID0gcG9zRnJ1aXQueTtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0c2xpY2VFZmZlY3QuYW5nbGUgPSAtZGVncmVlKzkwO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRzbGljZUVmZmVjdC5hY3RpdmF0ZSgpO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRzbGljZUVmZmVjdC50aW50ID0gMHhmZmZmZmY7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdHRoaXMuYWN0aXZlU2xpY2VFZmZlY3QucHVzaChzbGljZUVmZmVjdCk7XHJcblx0XHQgICAgICAgICAgICAgICAgXHR9ZWxzZXtcclxuXHRcdCAgICAgICAgICAgICAgICBcdFx0aWYodGhpcy5wb29sU2xpY2VDcml0aWNhbEVmZmVjdC5sZW5ndGg9PTApe1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRcdHNsaWNlRWZmZWN0ID0gbmV3IHRoaXMuU2xpY2VDcml0aWNhbEVmZmVjdCh0aGlzLnNjZW5lLHBvc0ZydWl0LngscG9zRnJ1aXQueSk7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdH1lbHNle1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRcdHNsaWNlRWZmZWN0ID0gdGhpcy5wb29sU2xpY2VDcml0aWNhbEVmZmVjdFswXTtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0XHR0aGlzLnBvb2xTbGljZUNyaXRpY2FsRWZmZWN0LnNwbGljZSgwLDEpO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHR9XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdHNsaWNlRWZmZWN0LnggPSBwb3NGcnVpdC54O1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRzbGljZUVmZmVjdC55ID0gcG9zRnJ1aXQueTtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0dGhpcy5zY2VuZS5sYXN0UG9zWCA9IHBvc0ZydWl0Lng7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdHRoaXMuc2NlbmUubGFzdFBvc1kgPSBwb3NGcnVpdC55O1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRzbGljZUVmZmVjdC5hbmdsZSA9IC1kZWdyZWUrOTA7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdHNsaWNlRWZmZWN0LmFjdGl2YXRlKCk7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdC8vIHNsaWNlRWZmZWN0LnRpbnQgPSAweGZmZmZmZjtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0dGhpcy5hY3RpdmVTbGljZUNyaXRpY2FsRWZmZWN0LnB1c2goc2xpY2VFZmZlY3QpO1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0fVxyXG5cdFx0ICAgICAgICAgICAgICAgIFx0XHJcblxyXG5cdFx0ICAgICAgICAgICAgICAgIFx0aWYoZnJ1aXRPYmouaGFzU3BsYXNoKXtcclxuXHRcdCAgICAgICAgICAgICAgICBcdFx0aWYodGhpcy5wb29sU2xpY2VFZmZlY3QubGVuZ3RoPT0wKXtcclxuXHRcdCAgICAgICAgICAgICAgICBcdFx0c3BsYXNoRWZmZWN0ID0gbmV3IHRoaXMuU2xpY2VFZmZlY3QodGhpcy5zY2VuZSxwb3NGcnVpdC54LHBvc0ZydWl0LnksJ0ZydWl0U3BsYXNoJyk7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdH1lbHNle1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRcdHNwbGFzaEVmZmVjdCA9IHRoaXMucG9vbFNsaWNlRWZmZWN0WzBdO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRcdHNwbGFzaEVmZmVjdC5zZXRUZXh0dXJlKCdGcnVpdFNwbGFzaCcpO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRcdHRoaXMucG9vbFNsaWNlRWZmZWN0LnNwbGljZSgwLDEpO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHR9XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdHNwbGFzaEVmZmVjdC54ID0gcG9zRnJ1aXQueDtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0c3BsYXNoRWZmZWN0LnkgPSBwb3NGcnVpdC55O1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgXHRzcGxhc2hFZmZlY3QuYW5nbGUgPSAtZGVncmVlKzkwO1xyXG5cclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0c3BsYXNoRWZmZWN0LnRpbnQgPSBmcnVpdE9iai5zcGxhc2hDb2xvcjtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0c3BsYXNoRWZmZWN0LmFjdGl2YXRlU3BsYXNoKCk7XHJcblx0XHRcdCAgICAgICAgICAgICAgICBcdHRoaXMuYWN0aXZlU2xpY2VFZmZlY3QucHVzaChzcGxhc2hFZmZlY3QpO1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0fVxyXG5cdFx0ICAgICAgICAgICAgICAgIFx0aWYoZnJ1aXRPYmouaWQhPSdCb21iJyl7XHJcblx0XHQgICAgICAgICAgICAgICAgXHRcdGNvdW50Kys7XHJcblx0XHQgICAgICAgICAgICAgICAgXHR9XHJcblx0XHQgICAgICAgICAgICAgICAgXHRcclxuXHRcdCAgICAgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgICAgICAgIH1cclxuXHRcdCAgICAgICAgICB9XHJcblx0ICAgICAgICAgIH0pO1xyXG5cclxuXHQgICAgICB9XHJcblx0ICAgICAgcmV0dXJuIGNvdW50O1xyXG5cdCAgfVxyXG5cclxuXHQgIGNoZWNrRnJ1aXRzVUkoZnJ1aXRGYWN0b3J5KXtcclxuXHQgIFx0bGV0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG5cdCAgXHRsZXQgbGlzdEZydWl0cyA9IGZydWl0RmFjdG9yeS5nZXRMaXN0RnJ1aXRzKCk7XHJcblx0ICBcdGxldCBjb3VudCA9IDA7XHJcblx0ICBcdGxldCByZXMgPSAnJztcclxuXHJcblx0XHRpZihjbGlja2VkSG9tZUNsYXNzaWMgfHwgY2xpY2tlZEhvbWVTZXR0aW5nIHx8IGNsaWNrZWRTZXR0aW5nQmFjayB8fCBjbGlja2VkUmVzdWx0UXVpdCB8fCBjbGlja2VkUmVzdWx0UmV0cnkpe1xyXG5cdFx0XHRwb2ludHMgPSBbe1wieFwiOjM2My4wODc5NzEyNzQ2ODU4NiwgXCJ5XCI6MzU2LjE5ODg5MTkyNzkwNTJ9LCB7XCJ4XCI6MzYzLjA4Nzk3MTI3NDY4NTg2LCBcInlcIjozNTUuMDQ5ODYzMjQ0MjY2NzZ9XVxyXG5cdFx0fVxyXG5cclxuXHQgIFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgICAgbGV0IGxpbmUgPSBuZXcgUGhhc2VyLkdlb20uTGluZShwb2ludHNbaV0ueCwgcG9pbnRzW2ldLnksIHBvaW50c1tpIC0gMV0ueCwgcG9pbnRzW2kgLSAxXS55KTtcclxuXHJcblx0ICAgICAgICAgIGxpc3RGcnVpdHMuZm9yRWFjaChmcnVpdE9iaiA9PiB7XHJcblxyXG5cdCAgICAgICAgICBcdFx0aWYoZnJ1aXRPYmouYWN0aXZlICYmIHJlcz09Jycpe1xyXG5cdCAgICAgICAgICBcdFx0XHRsZXQgcG9zRnJ1aXQgPSB0aGlzLnNjZW5lLnRoaXJkLnRyYW5zZm9ybS5mcm9tM2R0bzJkKGZydWl0T2JqLm9iamVjdC5wb3NpdGlvbik7XHJcblx0XHRcdFx0XHRcdGxldCBmcnVpdCA9IHt4OnBvc0ZydWl0LngseTpwb3NGcnVpdC55LHdpZHRoOjEwMCxoZWlnaHQ6MTAwfTtcclxuXHJcblx0XHRcdFx0XHRcdGxldCBtb2RpZmllZExpbmUgPSB7XCJ0eXBlXCI6IDIsIFwieDFcIjogcG9zRnJ1aXQueCwgXCJ4MlwiOiBwb3NGcnVpdC54LCBcInkxXCI6IHBvc0ZydWl0LnksIFwieTJcIjogcG9zRnJ1aXQueSxcclxuXHRcdFx0XHRcdFx0XCJib3R0b21cIjogcG9zRnJ1aXQueSwgXCJsZWZ0XCI6IHBvc0ZydWl0LngsIFwicmlnaHRcIjogcG9zRnJ1aXQueCwgXCJ0b3BcIjogcG9zRnJ1aXQueX07XHJcblxyXG5cdFx0XHRcdFx0XHRsZXQgZm9sbG93TWUgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoY2xpY2tlZEhvbWVDbGFzc2ljICYmIGZydWl0T2JqLmlkPT1cIldNVUlcIil7XHJcblx0XHRcdFx0XHRcdFx0Zm9sbG93TWUgPSBcImNsYXNzaWNcIjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIGlmKGNsaWNrZWRIb21lU2V0dGluZyAmJiBmcnVpdE9iai5pZD09XCJLV1VJXCIpe1xyXG5cdFx0XHRcdFx0XHRcdGZvbGxvd01lID0gXCJzZXR0aW5nXCI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSBpZihjbGlja2VkU2V0dGluZ0JhY2sgJiYgZnJ1aXRPYmouaWQ9PVwiQlVJXCIpe1xyXG5cdFx0XHRcdFx0XHRcdGZvbGxvd01lID0gXCJiYWNrXCI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSBpZihjbGlja2VkUmVzdWx0UXVpdCAmJiBmcnVpdE9iai5pZD09XCJCVUlcIil7XHJcblx0XHRcdFx0XHRcdFx0Zm9sbG93TWUgPSBcInF1aXRcIjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIGlmKGNsaWNrZWRSZXN1bHRSZXRyeSAmJiBmcnVpdE9iai5pZD09XCJBR1VJXCIpe1xyXG5cdFx0XHRcdFx0XHRcdGZvbGxvd01lID0gXCJyZXRyeVwiO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdCAgICAgICAgICAgIFxyXG5cdFx0XHQgICAgICAgICAgICBpZihmb2xsb3dNZSA9PSBcImNsYXNzaWNcIil7XHJcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5jaGVja0ludGVyc2VjdHMoZnJ1aXQsbW9kaWZpZWRMaW5lLCBcIldNVUlcIikpe1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGR5ID0gcG9pbnRzW2ldLnkgLSBwb2ludHNbaS0xXS55O1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGR4ID0gcG9pbnRzW2ldLnggLSBwb2ludHNbaS0xXS54O1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGRlZ3JlZSA9IE1hdGguYXRhbjIoLWR5LGR4KSAvIE1hdGguUEkgKiAxODA7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCAgaWYocmVzPT0nJyAmJiB0aGlzLnNjZW5lLmZydWl0RmFjdG9yeS5zbGljZShmcnVpdE9iaixkZWdyZWUpIT0tMSl7XHJcblx0XHRcdFx0XHRcdFx0XHQgIHJlcyA9IGZydWl0T2JqLmlkO1xyXG4gIFxyXG5cdFx0XHRcdFx0XHRcdCAgfVxyXG5cdFx0XHRcdFx0XHQgIH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIGlmKGZvbGxvd01lID09IFwic2V0dGluZ1wiKXtcclxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmNoZWNrSW50ZXJzZWN0cyhmcnVpdCxtb2RpZmllZExpbmUsIFwiS1dVSVwiKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZHkgPSBwb2ludHNbaV0ueSAtIHBvaW50c1tpLTFdLnk7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZHggPSBwb2ludHNbaV0ueCAtIHBvaW50c1tpLTFdLng7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZGVncmVlID0gTWF0aC5hdGFuMigtZHksZHgpIC8gTWF0aC5QSSAqIDE4MDtcclxuXHJcblx0XHRcdFx0XHRcdFx0ICBpZihyZXM9PScnICYmIHRoaXMuc2NlbmUuZnJ1aXRGYWN0b3J5LnNsaWNlKGZydWl0T2JqLGRlZ3JlZSkhPS0xKXtcclxuXHRcdFx0XHRcdFx0XHRcdCAgcmVzID0gZnJ1aXRPYmouaWQ7XHJcbiAgXHJcblx0XHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdCAgfVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2UgaWYoZm9sbG93TWUgPT0gXCJiYWNrXCIpe1xyXG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuY2hlY2tJbnRlcnNlY3RzKGZydWl0LG1vZGlmaWVkTGluZSwgXCJCVUlcIikpe1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGR5ID0gcG9pbnRzW2ldLnkgLSBwb2ludHNbaS0xXS55O1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGR4ID0gcG9pbnRzW2ldLnggLSBwb2ludHNbaS0xXS54O1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGRlZ3JlZSA9IE1hdGguYXRhbjIoLWR5LGR4KSAvIE1hdGguUEkgKiAxODA7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCAgaWYocmVzPT0nJyAmJiB0aGlzLnNjZW5lLmZydWl0RmFjdG9yeS5zbGljZShmcnVpdE9iaixkZWdyZWUpIT0tMSl7XHJcblx0XHRcdFx0XHRcdFx0XHQgIHJlcyA9IGZydWl0T2JqLmlkO1xyXG4gIFxyXG5cdFx0XHRcdFx0XHRcdCAgfVxyXG5cdFx0XHRcdFx0XHQgIH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIGlmKGZvbGxvd01lID09IFwicXVpdFwiKXtcclxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmNoZWNrSW50ZXJzZWN0cyhmcnVpdCxtb2RpZmllZExpbmUsIFwiQlVJXCIpKXtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBkeSA9IHBvaW50c1tpXS55IC0gcG9pbnRzW2ktMV0ueTtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBkeCA9IHBvaW50c1tpXS54IC0gcG9pbnRzW2ktMV0ueDtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBkZWdyZWUgPSBNYXRoLmF0YW4yKC1keSxkeCkgLyBNYXRoLlBJICogMTgwO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQgIGlmKHJlcz09JycgJiYgdGhpcy5zY2VuZS5mcnVpdEZhY3Rvcnkuc2xpY2UoZnJ1aXRPYmosZGVncmVlKSE9LTEpe1xyXG5cdFx0XHRcdFx0XHRcdFx0ICByZXMgPSBmcnVpdE9iai5pZDtcclxuICBcclxuXHRcdFx0XHRcdFx0XHQgIH1cclxuXHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSBpZihmb2xsb3dNZSA9PSBcInJldHJ5XCIpe1xyXG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuY2hlY2tJbnRlcnNlY3RzKGZydWl0LG1vZGlmaWVkTGluZSwgXCJBR1VJXCIpKXtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBkeSA9IHBvaW50c1tpXS55IC0gcG9pbnRzW2ktMV0ueTtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBkeCA9IHBvaW50c1tpXS54IC0gcG9pbnRzW2ktMV0ueDtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBkZWdyZWUgPSBNYXRoLmF0YW4yKC1keSxkeCkgLyBNYXRoLlBJICogMTgwO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQgIGlmKHJlcz09JycgJiYgdGhpcy5zY2VuZS5mcnVpdEZhY3Rvcnkuc2xpY2UoZnJ1aXRPYmosZGVncmVlKSE9LTEpe1xyXG5cdFx0XHRcdFx0XHRcdFx0ICByZXMgPSBmcnVpdE9iai5pZDtcclxuICBcclxuXHRcdFx0XHRcdFx0XHQgIH1cclxuXHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmNoZWNrSW50ZXJzZWN0cyhmcnVpdCxsaW5lKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZHkgPSBwb2ludHNbaV0ueSAtIHBvaW50c1tpLTFdLnk7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZHggPSBwb2ludHNbaV0ueCAtIHBvaW50c1tpLTFdLng7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZGVncmVlID0gTWF0aC5hdGFuMigtZHksZHgpIC8gTWF0aC5QSSAqIDE4MDtcclxuXHRcdFx0XHRcdFx0XHQgIGlmKHJlcz09JycgJiYgdGhpcy5zY2VuZS5mcnVpdEZhY3Rvcnkuc2xpY2UoZnJ1aXRPYmosZGVncmVlKSE9LTEpe1xyXG5cdFx0XHRcdFx0XHRcdFx0ICByZXMgPSBmcnVpdE9iai5pZDtcclxuICBcclxuXHRcdFx0XHRcdFx0XHQgIH1cclxuXHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdH1cclxuXHQgICAgICAgICAgXHRcdH1cclxuXHQgICAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICB9KTtcclxuXHJcblx0ICAgICAgfVxyXG5cclxuXHRcdCAgaWYocmVzID09IFwiV01VSVwiKXtcclxuXHRcdFx0Y3VycmVudFNjcmVlbiA9IFwiR2FtZVNjcmVlblwiO1xyXG5cdFx0ICB9XHJcblx0XHQgIGVsc2UgaWYocmVzID09IFwiQUdVSVwiKXtcclxuXHRcdFx0Y3VycmVudFNjcmVlbiA9IFwiR2FtZVNjcmVlblwiO1xyXG5cdFx0ICB9XHJcblxyXG5cdFx0ICBjbGlja2VkSG9tZUNsYXNzaWMgPSBmYWxzZTtcclxuXHRcdCAgY2xpY2tlZEhvbWVTZXR0aW5nID0gZmFsc2U7XHJcblx0XHQgIGNsaWNrZWRTZXR0aW5nQmFjayA9IGZhbHNlO1xyXG5cdFx0ICBjbGlja2VkUmVzdWx0UXVpdCA9IGZhbHNlO1xyXG5cdFx0ICBjbGlja2VkUmVzdWx0UmV0cnkgPSBmYWxzZTtcclxuXHQgICAgICByZXR1cm4gcmVzO1xyXG5cdCAgfVxyXG5cclxuXHQgIG5vcm1hbGl6ZVZhbHVlKHZhbHVlLCBtaW4sIG1heCkge1xyXG5cdCAgICAgIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XHJcblx0ICB9O1xyXG5cclxuXHQgIGxpbmVhckludGVycG9sYXRpb24obm9ybSwgbWluLCBtYXgpIHtcclxuXHQgICAgICByZXR1cm4gKG1heCAtIG1pbikgKiBub3JtICsgbWluO1xyXG5cdCAgfTtcclxuXHJcblx0ICBjaGVja0ludGVyc2VjdHMoZnJ1aXQsbGluZSwgdHlwZT1cIlwiKSB7XHJcblx0ICAgICAgdmFyIGwxID0gbmV3IFBoYXNlci5HZW9tLkxpbmUoZnJ1aXQueCAtIGZydWl0LndpZHRoLzIsIGZydWl0LnkgLSBmcnVpdC5oZWlnaHQvMiwgZnJ1aXQueCArIGZydWl0LndpZHRoLzIsIGZydWl0LnkgKyBmcnVpdC5oZWlnaHQvMik7XHJcblx0ICAgICAgdmFyIGwyID0gbmV3IFBoYXNlci5HZW9tLkxpbmUoZnJ1aXQueCAtIGZydWl0LndpZHRoLzIsIGZydWl0LnkgKyBmcnVpdC5oZWlnaHQvMiwgZnJ1aXQueCArIGZydWl0LndpZHRoLzIsIGZydWl0LnkgLSBmcnVpdC5oZWlnaHQvMik7XHJcblx0ICAgICAgbDIuYW5nbGUgPSA5MDtcclxuXHJcblx0XHQgIGlmKHR5cGUgPT0gXCJXTVVJXCIgfHwgdHlwZSA9PSBcIktXVUlcIiB8fCB0eXBlID09IFwiQlVJXCIgfHwgdHlwZT09XCJBR1VJXCIpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0ICB9XHJcblxyXG5cdCAgICAgIGlmIChQaGFzZXIuR2VvbS5JbnRlcnNlY3RzLkxpbmVUb0xpbmUobGluZSwgbDEsIHRydWUpIHx8XHJcblx0ICAgICAgICAgIFBoYXNlci5HZW9tLkludGVyc2VjdHMuTGluZVRvTGluZShsaW5lLCBsMiwgdHJ1ZSkpIHtcclxuXHJcblx0ICAgICAgICAgIGxldCBpbnB1dCA9IHRoaXMuc2NlbmUuaW5wdXQ7XHJcblx0ICAgICAgICAgIGxldCBjb250YWN0UG9pbnQgPSBuZXcgUGhhc2VyLk1hdGguVmVjdG9yMigyNTAsIDApOztcclxuXHQgICAgICAgICAgY29udGFjdFBvaW50LnggPSBpbnB1dC54O1xyXG5cdCAgICAgICAgICBjb250YWN0UG9pbnQueSA9IGlucHV0Lnk7XHJcblxyXG5cdCAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBQaGFzZXIuTWF0aC5EaXN0YW5jZS5CZXR3ZWVuUG9pbnRzKGNvbnRhY3RQb2ludCwgbmV3IFBoYXNlci5NYXRoLlZlY3RvcjIoZnJ1aXQueCwgZnJ1aXQueSkpO1xyXG5cclxuXHJcblxyXG5cdCAgICAgICAgICBpZiAoUGhhc2VyLk1hdGguRGlzdGFuY2UuQmV0d2VlblBvaW50cyhjb250YWN0UG9pbnQsIG5ldyBQaGFzZXIuTWF0aC5WZWN0b3IyKGZydWl0LngsIGZydWl0LnkpKSA+IDUwMCkge1xyXG5cdCAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICB9XHJcblx0ICB9XHJcblxyXG5cdCAgcHVzaFBvaW50KHBvaW50KXtcclxuXHQgIFx0dGhpcy5wb2ludHMucHVzaChwb2ludCk7XHJcblx0ICB9XHJcblxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tYm9UZXh0IGV4dGVuZHMgUGhhc2VyLkdhbWVPYmplY3RzLkNvbnRhaW5lciB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLHgseSk7XHJcbiAgICAgICAgc2NlbmUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGlzdFRleHRBdGFzID0gW107XHJcbiAgICAgICAgdGhpcy5saXN0VGV4dFRlbmdhaCA9IFtdO1xyXG4gICAgICAgIHRoaXMubGlzdFRleHRCYXdhaCA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy50ZXh0QXRhcyA9IHRoaXMuc2NlbmUuYWRkLnRleHQoMCwgMCwgXCJOIEZydWl0XCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiA2MCwgYWxpZ246ICdjZW50ZXInIH0pO1xyXG4gICAgICAgIHRoaXMudGV4dEF0YXMuc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG4gICAgICAgIHRoaXMudGV4dEF0YXMuc2V0U3Ryb2tlKCcjQUE3ODAwJywgMTYpO1xyXG4gICAgICAgIGxldCBncmFkaWVudCA9IHRoaXMudGV4dEF0YXMuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnRleHRBdGFzLmhlaWdodCk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjRkVEQjNEJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNSwgJyNGREY1QzUnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAnI0Q2OUUwMCcpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAnI0ZFRjM4RCcpO1xyXG4gICAgICAgIHRoaXMudGV4dEF0YXMuc2V0RmlsbChncmFkaWVudCk7XHJcbiAgICAgICAgdGhpcy5saXN0VGV4dEF0YXMucHVzaCh0aGlzLnRleHRBdGFzKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0VGVuZ2FoID0gdGhpcy5zY2VuZS5hZGQudGV4dCgwLCB0aGlzLnRleHRBdGFzLmhlaWdodC8yICsgMzAsIFwiQ29tYm9cIiwgeyBmb250RmFtaWx5OiBcImdhbmdvZmNoaW5lc2VcIiwgZm9udFNpemU6IDYwLCBhbGlnbjogJ2NlbnRlcicgfSk7XHJcbiAgICAgICAgdGhpcy50ZXh0VGVuZ2FoLnNldE9yaWdpbigwLjUsMC41KTtcclxuICAgICAgICB0aGlzLnRleHRUZW5nYWguc2V0U3Ryb2tlKCcjQUE3ODAwJywgMTYpO1xyXG4gICAgICAgIGdyYWRpZW50ID0gdGhpcy50ZXh0VGVuZ2FoLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0VGVuZ2FoLmhlaWdodCk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjRkVEQjNEJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTUsICcjRkRGNUM1Jyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTUsICcjRDY5RTAwJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRkVGMzhEJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0VGVuZ2FoLnNldEZpbGwoZ3JhZGllbnQpO1xyXG4gICAgICAgIHRoaXMubGlzdFRleHRUZW5nYWgucHVzaCh0aGlzLnRleHRUZW5nYWgpO1xyXG5cclxuICAgICAgICB0aGlzLnRleHRCYXdhaCA9IHRoaXMuc2NlbmUuYWRkLnRleHQoMCwgdGhpcy50ZXh0VGVuZ2FoLnkgKyB0aGlzLnRleHRBdGFzLmhlaWdodC8yICsgNTAsIFwiKyBOXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAxNDAsIGFsaWduOiAnY2VudGVyJyB9KTtcclxuICAgICAgICB0aGlzLnRleHRCYXdhaC5zZXRPcmlnaW4oMC41LDAuNSk7XHJcbiAgICAgICAgdGhpcy50ZXh0QmF3YWguc2V0U3Ryb2tlKCcjQUE3ODAwJywgMTYpO1xyXG4gICAgICAgIGdyYWRpZW50ID0gdGhpcy50ZXh0QmF3YWguY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnRleHRCYXdhaC5oZWlnaHQpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0ZFREIzRCcpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUsICcjRkRGNUM1Jyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNSwgJyNENjlFMDAnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJyNGRUYzOEQnKTtcclxuICAgICAgICB0aGlzLnRleHRCYXdhaC5zZXRGaWxsKGdyYWRpZW50KTtcclxuICAgICAgICB0aGlzLmxpc3RUZXh0QmF3YWgucHVzaCh0aGlzLnRleHRCYXdhaCk7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dEF0YXMyID0gdGhpcy5zY2VuZS5hZGQudGV4dCgwLCAwLCBcIk4gRnJ1aXRcIiwgeyBmb250RmFtaWx5OiBcImdhbmdvZmNoaW5lc2VcIiwgZm9udFNpemU6IDYwLCBhbGlnbjogJ2NlbnRlcicgfSk7XHJcbiAgICAgICAgdGhpcy50ZXh0QXRhczIuc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG4gICAgICAgIHRoaXMudGV4dEF0YXMyLnNldFN0cm9rZSgnI0IyNDcwMCcsIDE2KTtcclxuICAgICAgICBncmFkaWVudCA9IHRoaXMudGV4dEF0YXMyLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0QXRhczIuaGVpZ2h0KTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyNGRjk5MzYnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAnI0ZGRTI2NCcpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUsICcjRTE3QzJGJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRkFDOTZBJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0QXRhczIuc2V0RmlsbChncmFkaWVudCk7XHJcbiAgICAgICAgdGhpcy5saXN0VGV4dEF0YXMucHVzaCh0aGlzLnRleHRBdGFzMik7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dEF0YXMzID0gdGhpcy5zY2VuZS5hZGQudGV4dCgwLCAwLCBcIk4gRnJ1aXRcIiwgeyBmb250RmFtaWx5OiBcImdhbmdvZmNoaW5lc2VcIiwgZm9udFNpemU6IDYwLCBhbGlnbjogJ2NlbnRlcicgfSk7XHJcbiAgICAgICAgdGhpcy50ZXh0QXRhczMuc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG4gICAgICAgIHRoaXMudGV4dEF0YXMzLnNldFN0cm9rZSgnI0FBMjIwMCcsIDE2KTtcclxuICAgICAgICBncmFkaWVudCA9IHRoaXMudGV4dEF0YXMzLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0QXRhczMuaGVpZ2h0KTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyNGRTc4MzgnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAnI0ZGQkE5MycpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUsICcjRUY1NjJGJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRkU3MTMwJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0QXRhczMuc2V0RmlsbChncmFkaWVudCk7XHJcbiAgICAgICAgdGhpcy5saXN0VGV4dEF0YXMucHVzaCh0aGlzLnRleHRBdGFzMyk7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dFRlbmdhaDIgPSB0aGlzLnNjZW5lLmFkZC50ZXh0KDAsIHRoaXMudGV4dEF0YXMuaGVpZ2h0LzIgKyAzMCwgXCJDb21ib1wiLCB7IGZvbnRGYW1pbHk6IFwiZ2FuZ29mY2hpbmVzZVwiLCBmb250U2l6ZTogNjAsIGFsaWduOiAnY2VudGVyJyB9KTtcclxuICAgICAgICB0aGlzLnRleHRUZW5nYWgyLnNldE9yaWdpbigwLjUsMC41KTtcclxuICAgICAgICB0aGlzLnRleHRUZW5nYWgyLnNldFN0cm9rZSgnI0IyNDcwMCcsIDE2KTtcclxuICAgICAgICBncmFkaWVudCA9IHRoaXMudGV4dFRlbmdhaDIuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnRleHRUZW5nYWgyLmhlaWdodCk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjRkY5OTM2Jyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTUsICcjRkZFMjY0Jyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTUsICcjRTE3QzJGJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRkFDOTZBJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0VGVuZ2FoMi5zZXRGaWxsKGdyYWRpZW50KTtcclxuICAgICAgICB0aGlzLmxpc3RUZXh0VGVuZ2FoLnB1c2godGhpcy50ZXh0VGVuZ2FoMik7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dFRlbmdhaDMgPSB0aGlzLnNjZW5lLmFkZC50ZXh0KDAsIHRoaXMudGV4dEF0YXMuaGVpZ2h0LzIgKyAzMCwgXCJDb21ib1wiLCB7IGZvbnRGYW1pbHk6IFwiZ2FuZ29mY2hpbmVzZVwiLCBmb250U2l6ZTogNjAsIGFsaWduOiAnY2VudGVyJyB9KTtcclxuICAgICAgICB0aGlzLnRleHRUZW5nYWgzLnNldE9yaWdpbigwLjUsMC41KTtcclxuICAgICAgICB0aGlzLnRleHRUZW5nYWgzLnNldFN0cm9rZSgnI0FBMjIwMCcsIDE2KTtcclxuICAgICAgICBncmFkaWVudCA9IHRoaXMudGV4dFRlbmdhaDMuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnRleHRUZW5nYWgzLmhlaWdodCk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjRkU3ODM4Jyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTUsICcjRkZCQTkzJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTUsICcjRUY1NjJGJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRkU3MTMwJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0VGVuZ2FoMy5zZXRGaWxsKGdyYWRpZW50KTtcclxuICAgICAgICB0aGlzLmxpc3RUZXh0VGVuZ2FoLnB1c2godGhpcy50ZXh0VGVuZ2FoMyk7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dEJhd2FoMiA9IHRoaXMuc2NlbmUuYWRkLnRleHQoMCwgdGhpcy50ZXh0VGVuZ2FoLnkgKyB0aGlzLnRleHRBdGFzLmhlaWdodC8yICsgNTAsIFwiKyBOXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAxNDAsIGFsaWduOiAnY2VudGVyJyB9KTtcclxuICAgICAgICB0aGlzLnRleHRCYXdhaDIuc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG4gICAgICAgIHRoaXMudGV4dEJhd2FoMi5zZXRTdHJva2UoJyNCMjQ3MDAnLCAxNik7XHJcbiAgICAgICAgZ3JhZGllbnQgPSB0aGlzLnRleHRCYXdhaDIuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnRleHRCYXdhaDIuaGVpZ2h0KTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyNGRjk5MzYnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAnI0ZGRTI2NCcpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUsICcjRTE3QzJGJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRkFDOTZBJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0QmF3YWgyLnNldEZpbGwoZ3JhZGllbnQpO1xyXG4gICAgICAgIHRoaXMubGlzdFRleHRCYXdhaC5wdXNoKHRoaXMudGV4dEJhd2FoMik7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dEJhd2FoMyA9IHRoaXMuc2NlbmUuYWRkLnRleHQoMCwgdGhpcy50ZXh0VGVuZ2FoLnkgKyB0aGlzLnRleHRBdGFzLmhlaWdodC8yICsgNTAsIFwiKyBOXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAxNDAsIGFsaWduOiAnY2VudGVyJyB9KTtcclxuICAgICAgICB0aGlzLnRleHRCYXdhaDMuc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG4gICAgICAgIHRoaXMudGV4dEJhd2FoMy5zZXRTdHJva2UoJyNBQTIyMDAnLCAxNik7XHJcbiAgICAgICAgZ3JhZGllbnQgPSB0aGlzLnRleHRCYXdhaDMuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnRleHRCYXdhaDMuaGVpZ2h0KTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyNGRTc4MzgnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAnI0ZGQkE5MycpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUsICcjRUY1NjJGJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRkU3MTMwJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0QmF3YWgzLnNldEZpbGwoZ3JhZGllbnQpO1xyXG4gICAgICAgIHRoaXMubGlzdFRleHRCYXdhaC5wdXNoKHRoaXMudGV4dEJhd2FoMyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkKHRoaXMudGV4dEF0YXMpO1xyXG4gICAgICAgIHRoaXMuYWRkKHRoaXMudGV4dFRlbmdhaCk7XHJcbiAgICAgICAgdGhpcy5hZGQodGhpcy50ZXh0QmF3YWgpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZCh0aGlzLnRleHRBdGFzMik7XHJcbiAgICAgICAgdGhpcy5hZGQodGhpcy50ZXh0VGVuZ2FoMik7XHJcbiAgICAgICAgdGhpcy5hZGQodGhpcy50ZXh0QmF3YWgyKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQodGhpcy50ZXh0QXRhczMpO1xyXG4gICAgICAgIHRoaXMuYWRkKHRoaXMudGV4dFRlbmdhaDMpO1xyXG4gICAgICAgIHRoaXMuYWRkKHRoaXMudGV4dEJhd2FoMyk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RUZXh0QXRhc1tpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFRleHRUZW5nYWhbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RUZXh0QmF3YWhbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoY29tYm8pe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY2FsZVkgPSAwO1xyXG4gICAgICAgIHRoaXMuc2NhbGVYID0gMDtcclxuICAgICAgICBsZXQgaWRDb2xvciA9IDA7XHJcbiAgICAgICAgaWYoY29tYm8+PTgpe1xyXG4gICAgICAgICAgICBpZENvbG9yID0gMjtcclxuICAgICAgICB9ZWxzZSBpZihjb21ibz49NSl7XHJcbiAgICAgICAgICAgIGlkQ29sb3IgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRleHRBdGFzID0gdGhpcy5saXN0VGV4dEF0YXNbaWRDb2xvcl07XHJcbiAgICAgICAgbGV0IHRleHRUZW5nYWggPSB0aGlzLmxpc3RUZXh0VGVuZ2FoW2lkQ29sb3JdO1xyXG4gICAgICAgIGxldCB0ZXh0QmF3YWggPSB0aGlzLmxpc3RUZXh0QmF3YWhbaWRDb2xvcl07XHJcbiAgICAgICAgdGV4dEF0YXMudGV4dCA9IGNvbWJvKycgRnJ1aXQnO1xyXG4gICAgICAgIHRleHRCYXdhaC50ZXh0ID0gJysgJytjb21ibztcclxuXHJcbiAgICAgICAgdGV4dEF0YXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGV4dFRlbmdhaC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0ZXh0QmF3YWgudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgIHRhcmdldHM6IHRoaXMsXHJcbiAgICAgICAgICAgIHNjYWxlOiAxLjEsXHJcbiAgICAgICAgICAgIC8vIGFscGhhOiAxLFxyXG4gICAgICAgICAgICAvLyB5b3lvOiB0cnVlLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogMS4xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHBoYTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8geW95bzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NhbGVYID0gMDtcclxuICAgICAgICB0aGlzLnNjYWxlWSA9IDA7XHJcblxyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDtpPDM7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5saXN0VGV4dEF0YXNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RUZXh0VGVuZ2FoW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0VGV4dEJhd2FoW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgU2NlbmUzRCwgVEhSRUUsIEV4dGVuZGVkT2JqZWN0M0QsIEV4dGVuZGVkTWVzaCB9IGZyb20gJ0BlbmFibGUzZC9waGFzZXItZXh0ZW5zaW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcml0aWNhbFRleHQgZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuQ29udGFpbmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCB4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUseCx5KTtcclxuICAgICAgICBzY2VuZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0QXRhcyA9IHRoaXMuc2NlbmUuYWRkLnRleHQoMCwgMCwgXCJDUklUSUNBTFwiLCB7IGZvbnRGYW1pbHk6IFwiZ2FuZ29mY2hpbmVzZVwiLCBmb250U2l6ZTogNjAsIGFsaWduOiAnY2VudGVyJyB9KTtcclxuICAgICAgICB0aGlzLnRleHRBdGFzLnNldE9yaWdpbigwLjUsMC41KTtcclxuICAgICAgICB0aGlzLnRleHRBdGFzLnNldFN0cm9rZSgnIzAyMjk2NycsIDE2KTtcclxuICAgICAgICBsZXQgZ3JhZGllbnQgPSB0aGlzLnRleHRBdGFzLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0QXRhcy5oZWlnaHQpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0IyRDZGNScpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAnIzEzNUVDRCcpO1xyXG4gICAgICAgIHRoaXMudGV4dEF0YXMuc2V0RmlsbChncmFkaWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dEJhd2FoID0gdGhpcy5zY2VuZS5hZGQudGV4dCgwLCAwLCBcIisxMFwiLCB7IGZvbnRGYW1pbHk6IFwiZ2FuZ29mY2hpbmVzZVwiLCBmb250U2l6ZTogMTIwLCBhbGlnbjogJ2NlbnRlcicgfSk7XHJcbiAgICAgICAgdGhpcy50ZXh0QmF3YWguc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG4gICAgICAgIHRoaXMudGV4dEJhd2FoLnNldFN0cm9rZSgnIzAyMjk2NycsIDE2KTtcclxuICAgICAgICBsZXQgZ3JhZGllbnRCYXdhaCA9IHRoaXMudGV4dEJhd2FoLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0QmF3YWguaGVpZ2h0KTtcclxuICAgICAgICBncmFkaWVudEJhd2FoLmFkZENvbG9yU3RvcCgwLCAnI0IyRDZGNScpO1xyXG4gICAgICAgIGdyYWRpZW50QmF3YWguYWRkQ29sb3JTdG9wKDEsICcjMTM1RUNEJyk7XHJcbiAgICAgICAgdGhpcy50ZXh0QmF3YWguc2V0RmlsbChncmFkaWVudEJhd2FoKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0QmF3YWguc2V0UG9zaXRpb24oMCwgdGhpcy50ZXh0QXRhcy55ICsgdGhpcy50ZXh0QXRhcy5oZWlnaHQgLyAyICsgdGhpcy50ZXh0QmF3YWguaGVpZ2h0IC8gMiAtIDI1KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQodGhpcy50ZXh0QXRhcyk7XHJcbiAgICAgICAgdGhpcy5hZGQodGhpcy50ZXh0QmF3YWgpO1xyXG5cclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY2FsZVkgPSAwO1xyXG4gICAgICAgIHRoaXMuc2NhbGVYID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0QXRhcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRleHRCYXdhaC52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICAgICAgdGFyZ2V0czogdGhpcyxcclxuICAgICAgICAgICAgc2NhbGU6IDEuMSxcclxuICAgICAgICAgICAgLy8gYWxwaGE6IDEsXHJcbiAgICAgICAgICAgIC8vIHlveW86IHRydWUsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxLjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFscGhhOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB5b3lvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2FsZVggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NhbGVZID0gMDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgU2NlbmUzRCwgVEhSRUUsIEV4dGVuZGVkT2JqZWN0M0QsIEV4dGVuZGVkTWVzaCB9IGZyb20gJ0BlbmFibGUzZC9waGFzZXItZXh0ZW5zaW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRGYWN0b3J5e1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSkge1xyXG5cclxuXHRcdGdsb2JhbC5nYW1lRGF0YSA9IHtcclxuXHJcblx0XHRcdGZydWl0TGlzdDpbXHJcblx0XHRcdFx0e2lkOiBcIkNvY29udXRcIixwYXRoOiBcImFzc2V0cy9mcnVpdHMvQ29jb251dC5GQlhcIixzY2FsZTogMS4yNDEzLCBzcGxhc2hDb2xvcjogMHhGOUZGRkYsIGFscGhhOiAxNzksIHNwbGFzaFRleDogJ3NwbGFzaCcsIGRyb3BsZXRzOiAnSnVpY2VEcmFnb25GcnVpdCcsIGltcGFjdFNGWDonRnJ1aXRJbXBhY3RCaWdIb2xsb3cnLCBtaW5TcGxhc2g6MiAsIG1heFNwbGFzaDo0IH0sXHJcblx0XHRcdFx0e2lkOiBcIlBpbmVhcHBsZVwiLHBhdGg6IFwiYXNzZXRzL2ZydWl0cy9QaW5lYXBwbGUuRkJYXCIsc2NhbGU6IDEuMTUyNiwgc3BsYXNoQ29sb3I6IDB4RkZFRjNGLCBhbHBoYTogMTgwLCBzcGxhc2hUZXg6ICdzcGxhc2gnLCBkcm9wbGV0czogJ0p1aWNlUGluZWFwcGxlJywgaW1wYWN0U0ZYOidGcnVpdEltcGFjdEJpZ1dldDAnLCBtaW5TcGxhc2g6MiAsIG1heFNwbGFzaDozfSxcclxuXHRcdFx0XHR7aWQ6IFwiT3JhbmdlXCIscGF0aDogXCJhc3NldHMvZnJ1aXRzL09yYW5nZS5GQlhcIixzY2FsZTogMS4wMzQsIHNwbGFzaENvbG9yOiAweEZDNzgwNCwgYWxwaGE6IDE4MCwgc3BsYXNoVGV4OiAnc3BsYXNoJywgZHJvcGxldHM6ICdKdWljZU9yYW5nZScsIGltcGFjdFNGWDonRnJ1aXRJbXBhY3RCaWdXZXQwJywgbWluU3BsYXNoOjMgLCBtYXhTcGxhc2g6NH0sXHJcblx0XHRcdFx0e2lkOiBcIktpd2lmcnVpdFwiLHBhdGg6IFwiYXNzZXRzL2ZydWl0cy9LaXdpZnJ1aXQuRkJYXCIsc2NhbGU6IDAuODg2Niwgc3BsYXNoQ29sb3I6IDB4NTRBRDEwLCBhbHBoYTogMTgwLCBzcGxhc2hUZXg6ICdzcGxhc2gnLCBkcm9wbGV0czogJ0p1aWNlR3JlZW4nLCBpbXBhY3RTRlg6J0ZydWl0SW1wYWN0U21hbGxXZXQwJywgbWluU3BsYXNoOjEgLCBtYXhTcGxhc2g6NH0sXHJcblx0XHRcdFx0e2lkOiBcIkxlbW9uXCIscGF0aDogXCJhc3NldHMvZnJ1aXRzL0xlbW9uLkZCWFwiLHNjYWxlOiAwLjk3NTMsIHNwbGFzaENvbG9yOiAweEZGRUYzRiwgYWxwaGE6IDE4MCwgc3BsYXNoVGV4OiAnc3BsYXNoJywgZHJvcGxldHM6ICdKdWljZVBpbmVhcHBsZScsIGltcGFjdFNGWDonRnJ1aXRJbXBhY3RNZWRpdW1XZXQwJywgbWluU3BsYXNoOjMgLCBtYXhTcGxhc2g6NH0sXHJcblx0XHRcdFx0e2lkOiBcIlBlYWNoXCIscGF0aDogXCJhc3NldHMvZnJ1aXRzL1BlYWNoLkZCWFwiLHNjYWxlOiAxLjAxMDgsIHNwbGFzaENvbG9yOiAweEZGQzUxQiwgYWxwaGE6IDE4MCwgc3BsYXNoVGV4OiAnc3BsYXNoJywgZHJvcGxldHM6ICdKdWljZU1hbmdvJywgaW1wYWN0U0ZYOidGcnVpdEltcGFjdE1lZGl1bVdldDAnLCBtaW5TcGxhc2g6NCAsIG1heFNwbGFzaDo0fSxcclxuXHRcdFx0XHR7aWQ6IFwiQXBwbGVHcmVlblwiLHBhdGg6IFwiYXNzZXRzL2ZydWl0cy9BcHBsZUdyZWVuLkZCWFwiLHNjYWxlOiAxLjA2NCwgc3BsYXNoQ29sb3I6IDB4RkVEQzM1LCBhbHBoYTogMTc5LCBzcGxhc2hUZXg6ICdzcGxhc2gyJywgZHJvcGxldHM6ICdKdWljZVBpbmVhcHBsZScsIGltcGFjdFNGWDonRnJ1aXRJbXBhY3RBcHBsZScsIG1pblNwbGFzaDoyICwgbWF4U3BsYXNoOjJ9LFxyXG5cdFx0XHRcdHtpZDogXCJNYW5nb1wiLHBhdGg6IFwiYXNzZXRzL2ZydWl0cy9NYW5nby5GQlhcIixzY2FsZTogMS4xNTI2LCBzcGxhc2hDb2xvcjogMHhGRkI3MjAsIGFscGhhOiAxODAsIHNwbGFzaFRleDogJ3NwbGFzaCcsIGRyb3BsZXRzOiAnSnVpY2VNYW5nbycsIGltcGFjdFNGWDonRnJ1aXRJbXBhY3RNZWRpdW1XZXQwJywgbWluU3BsYXNoOjIgLCBtYXhTcGxhc2g6NH0sXHJcblx0XHRcdFx0e2lkOiBcIldhdGVybWVsb25cIixwYXRoOiBcImFzc2V0cy9mcnVpdHMvV2F0ZXJtZWxvbi5GQlhcIixzY2FsZTogMS4zMywgc3BsYXNoQ29sb3I6IDB4RkIyNjE4LCBhbHBoYTogMjU1LCBzcGxhc2hUZXg6ICdzcGxhc2gnLCBkcm9wbGV0czogJ0p1aWNlUmVkJywgaW1wYWN0U0ZYOidGcnVpdEltcGFjdEJpZ1dldDAnLCBtaW5TcGxhc2g6MyAsIG1heFNwbGFzaDo0fSxcclxuICAgICAgICB7aWQ6IFwiV01VSVwiLHBhdGg6IFwiYXNzZXRzL2ZydWl0cy9XYXRlcm1lbG9uLkZCWFwiLHNjYWxlOiAxLjMzLCBzcGxhc2hDb2xvcjogMHhGQjI2MTgsIGFscGhhOiAyNTUsIHNwbGFzaFRleDogJ3NwbGFzaCcsIGRyb3BsZXRzOiAnSnVpY2VSZWQnLCBpbXBhY3RTRlg6J0ZydWl0SW1wYWN0QmlnV2V0MCcsIG1pblNwbGFzaDozICwgbWF4U3BsYXNoOjR9LFxyXG4gICAgICAgIHtpZDogXCJLV1VJXCIscGF0aDogXCJhc3NldHMvZnJ1aXRzL0tpd2lmcnVpdC5GQlhcIixzY2FsZTogMC44ODY2LCBzcGxhc2hDb2xvcjogMHg1NEFEMTAsIGFscGhhOiAxODAsIHNwbGFzaFRleDogJ3NwbGFzaCcsIGRyb3BsZXRzOiAnSnVpY2VHcmVlbicsIGltcGFjdFNGWDonRnJ1aXRJbXBhY3RTbWFsbFdldDAnLCBtaW5TcGxhc2g6MSAsIG1heFNwbGFzaDo0fSxcclxuICAgICAgICB7aWQ6IFwiQlVJXCIscGF0aDogXCJhc3NldHMvZnJ1aXRzL0JvbWIuZmJ4XCIsc2NhbGU6IDEuMCwgc3BsYXNoVGV4OiAnbm9uZScsIGRyb3BsZXRzOiAnbm9uZScsIGltcGFjdFNGWDonQm9tYkV4cGxvZGVHYW1lT3Zlcid9LFxyXG4gICAgICAgIHtpZDogXCJBR1VJXCIscGF0aDogXCJhc3NldHMvZnJ1aXRzL0FwcGxlR3JlZW4uRkJYXCIsc2NhbGU6IDEuMDY0LCBzcGxhc2hDb2xvcjogMHhGRURDMzUsIGFscGhhOiAxNzksIHNwbGFzaFRleDogJ3NwbGFzaDInLCBkcm9wbGV0czogJ0p1aWNlUGluZWFwcGxlJywgaW1wYWN0U0ZYOidGcnVpdEltcGFjdEFwcGxlJywgbWluU3BsYXNoOjIgLCBtYXhTcGxhc2g6Mn0sXHJcblx0XHRcdFx0e2lkOiBcIkJhbmFuYVwiLHBhdGg6IFwiYXNzZXRzL2ZydWl0cy9CYW5hbmEuRkJYXCIsc2NhbGU6IDAuOTUsIHNwbGFzaFRleDogJ25vbmUnLCBkcm9wbGV0czogJ25vbmUnLCBpbXBhY3RTRlg6J0ZydWl0SW1wYWN0TWVkaXVtRHJ5J30sXHJcbiAgICAgICAge2lkOiBcIkJvbWJcIixwYXRoOiBcImFzc2V0cy9mcnVpdHMvQm9tYi5mYnhcIixzY2FsZTogMS4wLCBzcGxhc2hUZXg6ICdub25lJywgZHJvcGxldHM6ICdub25lJywgaW1wYWN0U0ZYOidCb21iRXhwbG9kZUdhbWVPdmVyJ31cclxuXHRcdFx0XSxcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdCAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgXHR0aGlzLmxpc3RGcnVpdHMgPSBbXTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuZnJ1aXRUb1NwYXduTGlzdCA9IFtdO1xyXG4gICAgICB0aGlzLmZydWl0TmVlZFVwZGF0ZSA9IFtdO1xyXG5cclxuICAgICAgdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIgPSAxOTI7XHJcbiAgICAgIHRoaXMuYm9tYkhpdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnVkYWhGaW5pc2ggPSBmYWxzZTtcclxuICAgIFx0dGhpcy5jcmVhdGUoKTtcclxuXHJcbiAgXHR9XHJcblxyXG4gIFx0YXN5bmMgY3JlYXRlKCl7XHJcbiAgXHRcdHRoaXMuZnJ1aXRUZXh0dXJlID0gYXdhaXQgdGhpcy5zY2VuZS50aGlyZC5sb2FkLnRleHR1cmUoJ2ZydWl0c190ZXgnKTtcclxuICAgICAgdGhpcy5zaGFkb3dUZXh0dXJlID0gYXdhaXQgdGhpcy5zY2VuZS50aGlyZC5sb2FkLnRleHR1cmUoJ2ZydWl0X3NoYWRvdycpO1xyXG4gICAgICB0aGlzLmJvbWJUZXh0dXJlID0gYXdhaXQgdGhpcy5zY2VuZS50aGlyZC5sb2FkLnRleHR1cmUoJ2JvbWJfdGV4Jyk7XHJcbiAgICAgIHRoaXMuYm9tYlJheVRleHR1cmUgPSBhd2FpdCB0aGlzLnNjZW5lLnRoaXJkLmxvYWQudGV4dHVyZSgnYm9tYl9yYXlfdGV4Jyk7XHJcbiAgICAgIHRoaXMuc3BsYXNoVGV4dHVyZSA9IGF3YWl0IHRoaXMuc2NlbmUudGhpcmQubG9hZC50ZXh0dXJlKCdzcGxhc2hfdGV4Jyk7XHJcbiAgICAgIHRoaXMuc3BsYXNoVGV4dHVyZTIgPSBhd2FpdCB0aGlzLnNjZW5lLnRoaXJkLmxvYWQudGV4dHVyZSgnc3BsYXNoMl90ZXgnKTtcclxuICAgICAgdGhpcy5zcGxhc2hUZXh0dXJlMyA9IGF3YWl0IHRoaXMuc2NlbmUudGhpcmQubG9hZC50ZXh0dXJlKCdzcGxhc2gzX3RleCcpO1xyXG4gICAgICB0aGlzLnNwbGFzaFRleHR1cmU0ID0gYXdhaXQgdGhpcy5zY2VuZS50aGlyZC5sb2FkLnRleHR1cmUoJ3NwbGFzaDRfdGV4Jyk7XHJcblxyXG4gICAgICB0aGlzLnNwbGFzaFNsaWNlZDEgPSBhd2FpdCB0aGlzLnNjZW5lLnRoaXJkLmxvYWQudGV4dHVyZSgnU3BsYXNoU2xpY2UxJyk7XHJcbiAgICAgIHRoaXMuc3BsYXNoU2xpY2VkMiA9IGF3YWl0IHRoaXMuc2NlbmUudGhpcmQubG9hZC50ZXh0dXJlKCdTcGxhc2hTbGljZTInKTtcclxuXHJcbiAgICAgIHRoaXMuZnJ1aXRUcmFpbFRleCA9IGF3YWl0IHRoaXMuc2NlbmUudGhpcmQubG9hZC50ZXh0dXJlKCdGcnVpdFRyYWlsJyk7XHJcbiAgICAgIHRoaXMuY3JpdGljYWxUcmFpbFRleCA9IGF3YWl0IHRoaXMuc2NlbmUudGhpcmQubG9hZC50ZXh0dXJlKCdDcml0aWNhbFRyYWlsJyk7XHJcbiAgICAgIHRoaXMuYm9tYlRyYWlsVGV4ID0gYXdhaXQgdGhpcy5zY2VuZS50aGlyZC5sb2FkLnRleHR1cmUoJ0JvbWJUcmFpbCcpO1xyXG4gICAgICB0aGlzLmJvbWJTbW9rZVRleCA9IGF3YWl0IHRoaXMuc2NlbmUudGhpcmQubG9hZC50ZXh0dXJlKCdCb21iU21va2UnKTtcclxuXHJcbiAgICAgIHRoaXMuaGVscGVyVmVjMyA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsMCwwKTtcclxuXHJcbiAgICBcdGxldCBkYXRhID0gZ2xvYmFsLmdhbWVEYXRhLmZydWl0TGlzdDtcclxuICAgIFx0Zm9yKHZhciBpPTA7aTxkYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgXHRcdHRoaXMubG9hZChkYXRhW2ldLnBhdGgsaSoyMC0xODAsNzUsMCwwLjcqZGF0YVtpXS5zY2FsZS90aGlzLmZydXN0dW1TaXplQ2hhbmdlcixkYXRhW2ldLmlkLGRhdGFbaV0pO1xyXG4gICAgXHR9XHJcblxyXG4gICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0cyA9IHt9O1xyXG4gICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0c1snSnVpY2VEcmFnb25GcnVpdCddID0gdGhpcy5jcmVhdGVFbWl0dGVyKCdKdWljZURyYWdvbmZydWl0Jyk7XHJcbiAgICAgIHRoaXMuZW1pdHRlckRyb3BsZXRzWydKdWljZUdyZWVuJ10gPSB0aGlzLmNyZWF0ZUVtaXR0ZXIoJ0p1aWNlR3JlZW4nKTtcclxuICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHNbJ0p1aWNlTWFuZ28nXSA9IHRoaXMuY3JlYXRlRW1pdHRlcignSnVpY2VNYW5nbycpO1xyXG4gICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0c1snSnVpY2VPcmFuZ2UnXSA9IHRoaXMuY3JlYXRlRW1pdHRlcignSnVpY2VPcmFuZ2UnKTtcclxuICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHNbJ0p1aWNlUGluZWFwcGxlJ10gPSB0aGlzLmNyZWF0ZUVtaXR0ZXIoJ0p1aWNlUGluZWFwcGxlJyk7XHJcbiAgICAgIHRoaXMuZW1pdHRlckRyb3BsZXRzWydKdWljZVJlZCddID0gdGhpcy5jcmVhdGVFbWl0dGVyKCdKdWljZVJlZCcpO1xyXG4gICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0c1snU3RhckNyaXRpY2FsJ10gPSB0aGlzLmNyZWF0ZUVtaXR0ZXIoJ1N0YXJDcml0aWNhbCcsIDEuMCk7XHJcblxyXG4gICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0czIgPSB7fTtcclxuICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHMyWydKdWljZURyYWdvbkZydWl0J10gPSB0aGlzLmNyZWF0ZUVtaXR0ZXIoJ0p1aWNlRHJhZ29uZnJ1aXQnLCAxKTtcclxuICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHMyWydKdWljZUdyZWVuJ10gPSB0aGlzLmNyZWF0ZUVtaXR0ZXIoJ0p1aWNlR3JlZW4nLCAxKTtcclxuICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHMyWydKdWljZU1hbmdvJ10gPSB0aGlzLmNyZWF0ZUVtaXR0ZXIoJ0p1aWNlTWFuZ28nLCAxKTtcclxuICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHMyWydKdWljZU9yYW5nZSddID0gdGhpcy5jcmVhdGVFbWl0dGVyKCdKdWljZU9yYW5nZScsIDEpO1xyXG4gICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0czJbJ0p1aWNlUGluZWFwcGxlJ10gPSB0aGlzLmNyZWF0ZUVtaXR0ZXIoJ0p1aWNlUGluZWFwcGxlJywgMSk7XHJcbiAgICAgIHRoaXMuZW1pdHRlckRyb3BsZXRzMlsnSnVpY2VSZWQnXSA9IHRoaXMuY3JlYXRlRW1pdHRlcignSnVpY2VSZWQnLCAxKTtcclxuXHJcbiAgICAgIHRoaXMuYm9tYlJheSA9IFtdO1xyXG4gICAgICB0aGlzLmJvbWJGdXNlID0gdGhpcy5zY2VuZS5zb3VuZC5hZGQoJ0JvbWJGdXNlTFAnKTtcclxuICAgICAgXHJcbiAgXHR9XHJcblxyXG4gICAgcG9wdWxhdGVSYXlGb3JCb21iKGJvbWIpe1xyXG4gICAgICBsZXQgblJheSA9IDg7XHJcblxyXG4gICAgICBsZXQgc3RhcnRSYW5kID0gUGhhc2VyLk1hdGguQmV0d2VlbigxLDEyKSozMDtcclxuICAgICAgZm9yKGxldCBpPTA7aTxuUmF5O2krKyl7XHJcbiAgICAgICAgdGhpcy5zY2VuZS50aGlyZC5sb2FkLmZieCgnYXNzZXRzL2VmZmVjdHMvUG9tZWdyYW5hdGVSYXkuZmJ4JykudGhlbihvYmplY3QgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zY2VuZS50aGlyZC5hZGQuZXhpc3Rpbmcob2JqZWN0KTtcclxuICAgICAgICAgIG9iamVjdC5wb3NpdGlvbi5zZXQoMCwwLDIpO1xyXG4gICAgICAgICAgb2JqZWN0LnJvdGF0aW9uLnNldCgtOTAsc3RhcnRSYW5kK2kqMzAsMCk7XHJcbiAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IG1hcDogdGhpcy5ib21iUmF5VGV4dHVyZSB9KVxyXG4gICAgICAgICAgbWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGxldCBib21iUmF5VGV4dHVyZSA9IHRoaXMuYm9tYlJheVRleHR1cmU7XHJcbiAgICAgICAgICBvYmplY3QudHJhdmVyc2UoIGZ1bmN0aW9uICggY2hpbGQgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIGNoaWxkLmlzTWVzaCApIHtcclxuICAgICAgICAgICAgICBjaGlsZC5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSApO1xyXG4gICAgICAgICAgb2JqZWN0Lm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgICBtYXRlcmlhbC5vcGFjaXR5ID0gUGhhc2VyLk1hdGguQmV0d2Vlbig1LDEwKS8xMC4wO1xyXG4gICAgICAgICAgb2JqZWN0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuYm9tYlJheS5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVFbWl0dGVyKHRleHR1cmVOYW1lLCBzdGFydFNjYWxlID0gMi4wKXtcclxuICAgICAgbGV0IGRyb3BsZXRQYXJ0aWNsZSA9IHRoaXMuc2NlbmUuYWRkLnBhcnRpY2xlcyh0ZXh0dXJlTmFtZSk7XHJcbiAgICAgIGxldCBlbWl0dGVyO1xyXG4gICAgICBpZih0ZXh0dXJlTmFtZT09J1N0YXJDcml0aWNhbCcpe1xyXG4gICAgICAgIGxldCBzaGFwZSA9IG5ldyBQaGFzZXIuR2VvbS5MaW5lKDAsIC0xMDAsIDAsIDEwMCk7XHJcbiAgICAgICAgZW1pdHRlciA9IGRyb3BsZXRQYXJ0aWNsZS5jcmVhdGVFbWl0dGVyKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeDogMzg0LFxyXG4gICAgICAgICAgICB5OiA2NDAsXHJcbiAgICAgICAgICAgIGVtaXRab25lOiB7IHR5cGU6ICdyYW5kb20nLCBzb3VyY2U6IHNoYXBlfSxcclxuICAgICAgICAgICAgYWxwaGE6IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHN0YXJ0OiBzdGFydFNjYWxlLCBlbmQ6IDB9LFxyXG4gICAgICAgICAgICBzcGVlZDoge21pbjogMzAwLCBtYXg6IDgwMCwgc3RlcDogMTAwfSxcclxuICAgICAgICAgICAgYW5nbGU6IHttaW46IC0zMCwgbWF4OiAzMCwgc3RlcDoxNX0sXHJcbiAgICAgICAgICAgIGxpZmVzcGFuOiAxMDAwLFxyXG4gICAgICAgICAgICBncmF2aXR5WDogMCxcclxuICAgICAgICAgICAgZ3Jhdml0eVk6IDUwMCxcclxuICAgICAgICAgICAgcXVhbnRpdHkgOiAxNSxcclxuICAgICAgICAgICAgdGludDogMHg5RkYxRkYsXHJcbiAgICAgICAgICAgIG9uOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9ZWxzZSBpZihzdGFydFNjYWxlPT0yKXtcclxuICAgICAgICBlbWl0dGVyID0gZHJvcGxldFBhcnRpY2xlLmNyZWF0ZUVtaXR0ZXIoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4OiAzODQsXHJcbiAgICAgICAgICAgIHk6IDY0MCxcclxuICAgICAgICAgICAgYWxwaGE6IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHN0YXJ0OiBzdGFydFNjYWxlLCBlbmQ6IDB9LFxyXG4gICAgICAgICAgICBzcGVlZDoge21pbjogMzAwLCBtYXg6IDYwMH0sXHJcbiAgICAgICAgICAgIGFuZ2xlOiB7bWluOiAtMTUsIG1heDogMTV9LFxyXG4gICAgICAgICAgICBsaWZlc3BhbjogMTAwMCxcclxuICAgICAgICAgICAgZ3Jhdml0eVg6IDAsXHJcbiAgICAgICAgICAgIGdyYXZpdHlZOiAxMDAwLFxyXG4gICAgICAgICAgICBxdWFudGl0eSA6IDEwLFxyXG4gICAgICAgICAgICBvbjogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgZW1pdHRlciA9IGRyb3BsZXRQYXJ0aWNsZS5jcmVhdGVFbWl0dGVyKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeDogMzg0LFxyXG4gICAgICAgICAgICB5OiA2NDAsXHJcbiAgICAgICAgICAgIGFscGhhOiAxLFxyXG4gICAgICAgICAgICBzY2FsZTogeyBzdGFydDogc3RhcnRTY2FsZSwgZW5kOiAwfSxcclxuICAgICAgICAgICAgLy8gc3BlZWQ6IDUwLFxyXG4gICAgICAgICAgICBzcGVlZFg6IHttaW46IC00MDAsIG1heDogNDAwfSxcclxuICAgICAgICAgICAgc3BlZWRZOiB7bWluOiAtMzUwLCBtYXg6IC01MH0sXHJcbiAgICAgICAgICAgIC8vIGFuZ2xlOiB7IG1pbjogMCwgbWF4OiAtMTgwfSxcclxuICAgICAgICAgICAgbGlmZXNwYW46IDc1MCxcclxuICAgICAgICAgICAgZ3Jhdml0eVg6IDAsXHJcbiAgICAgICAgICAgIGdyYXZpdHlZOiAxMDAwLFxyXG4gICAgICAgICAgICBxdWFudGl0eSA6IDEwLFxyXG4gICAgICAgICAgICBvbjogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcbiAgICB9XHJcblxyXG4gIFx0bG9hZChwYXRoLHBvc1gscG9zWSxwb3NaLHNjYWxlU2l6ZSxpZCxkYXRhKXtcclxuICBcdFx0bGV0IGZydWl0VGV4dHVyZTtcclxuICAgICAgaWYoaWQ9PVwiQm9tYlwiIHx8IGlkPT1cIkJVSVwiKXtcclxuICAgICAgICBmcnVpdFRleHR1cmUgPSB0aGlzLmJvbWJUZXh0dXJlO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAgZnJ1aXRUZXh0dXJlID0gdGhpcy5mcnVpdFRleHR1cmU7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IG1lID0gdGhpcztcclxuICAgICAgbGV0IGZydWl0VHJhaWxUZXggPSB0aGlzLmZydWl0VHJhaWxUZXg7XHJcbiAgICAgIGxldCBjcml0aWNhbFRyYWlsVGV4ID0gdGhpcy5jcml0aWNhbFRyYWlsVGV4O1xyXG4gICAgICBsZXQgYm9tYlRyYWlsVGV4ID0gdGhpcy5ib21iVHJhaWxUZXg7XHJcbiAgICAgIGxldCBib21iU21va2VUZXggPSB0aGlzLmJvbWJTbW9rZVRleDtcclxuXHJcbiAgICAgIGlmKGlkPT0nV01VSScpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBvc1ggPSAwO1xyXG4gICAgICAgIHBvc1kgPSAtNjQvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXI7XHJcbiAgICAgICAgcG9zWiA9IDEwL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyXHJcbiAgICAgIH1lbHNlIGlmKGlkPT0nS1dVSScpe1xyXG4gICAgICAgIC8vIDUuNSwwLDAuODVcclxuICAgICAgICBwb3NYID0gNS41KjMyL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgICAgIHBvc1kgPSAwL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgICAgIHBvc1ogPSAxMC90aGlzLmZydXN0dW1TaXplQ2hhbmdlclxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdraXdpOiAnK3Bvc1grJywgJytwb3NZKycsICcrcG9zWik7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICBcdHRoaXMuc2NlbmUudGhpcmQubG9hZC5mYngocGF0aCkudGhlbihvYmplY3QgPT4ge1xyXG4gICAgICAgICAgXHJcblx0ICAgICAgICBvYmplY3Quc2NhbGUuc2V0KHNjYWxlU2l6ZSxzY2FsZVNpemUsc2NhbGVTaXplKTtcclxuXHQgICAgICAgIG9iamVjdC5wb3NpdGlvbi5zZXQocG9zWCxwb3NZLHBvc1opO1xyXG5cclxuICAgICAgICAgIGxldCBoYWxmMUJhc2VQb3M7XHJcbiAgICAgICAgICBsZXQgaGFsZjJCYXNlUG9zO1xyXG4gICAgICAgICAgbGV0IHRoZUJvbWJUcmFpbDtcclxuICAgICAgICAgIG9iamVjdC50cmF2ZXJzZSggZnVuY3Rpb24gKCBjaGlsZCApIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggY2hpbGQuaXNNZXNoICkge1xyXG4gICAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJPdXRsaW5lXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJvdXRsaW5lXCIpKXtcclxuICAgICAgICAgICAgICAgIGlmKGlkIT1cIkJvbWJcIiAmJiBpZCE9XCJCVUlcIil7XHJcbiAgICAgICAgICAgICAgICAgIGNoaWxkLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBvdXRsaW5lQ29sb3IgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgY2hpbGQubWF0ZXJpYWwgPSBvdXRsaW5lQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiSGFsZlwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwiaGFsZlwiKSl7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5maXJzdExvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQubmFtZS5pbmNsdWRlcyhcIkhhbGYxXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJoYWxmMVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgIGhhbGYxQmFzZVBvcyA9IGNoaWxkLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIGhhbGYyQmFzZVBvcyA9IGNoaWxkLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFsZjFCYXNlUG9zKTtcclxuICAgICAgICAgICAgICAgIG1lLnNjZW5lLnRoaXJkLnBoeXNpY3MuYWRkLmV4aXN0aW5nKGNoaWxkLHtzaGFwZTogJ2NvbnZleE1lc2gnfSk7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5ib2R5Lm9uLnVwZGF0ZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAvLyBjaGlsZC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgaWYoIWNoaWxkLmJvZHkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBpZihjaGlsZC5maXJzdExvYWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgY2hpbGQuYm9keS5zZXRWZWxvY2l0eSgwLCAwLCAwKVxyXG4gICAgICAgICAgICAgICAgICBjaGlsZC5ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSgwLDAsMCk7XHJcbiAgICAgICAgICAgICAgICAgIGNoaWxkLmJvZHkuc2V0Um90YXRpb24oMCwwLDApO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgY2hpbGQucG9zaXRpb24uc2V0KDAsMCwxMCk7XHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNoaWxkLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25GbGFncyg0KTtcclxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FmdGVyIHNldCcpO1xyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGlsZC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBmb3JjZSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgaWYoY2hpbGQuY3JpdGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlID0gMTAwMDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgaWYoY2hpbGQubmFtZS5pbmNsdWRlcyhcIkhhbGYxXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJoYWxmMVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYm9keS5hcHBseUZvcmNlKDIwMC9tZS5mcnVzdHVtU2l6ZUNoYW5nZXIsZm9yY2UvbWUuZnJ1c3R1bVNpemVDaGFuZ2VyLC0yMC9tZS5mcnVzdHVtU2l6ZUNoYW5nZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmJvZHkuc2V0QW5ndWxhclZlbG9jaXR5KDEsMCwxKTtcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYm9keS5hcHBseUZvcmNlKC0yMDAvbWUuZnJ1c3R1bVNpemVDaGFuZ2VyLC1mb3JjZS9tZS5mcnVzdHVtU2l6ZUNoYW5nZXIsLTIwL21lLmZydXN0dW1TaXplQ2hhbmdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYm9keS5zZXRBbmd1bGFyVmVsb2NpdHkoLTEsMCwtMSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY2hpbGQuYm9keS5zZXRDb2xsaXNpb25GbGFncyg2KTtcclxuICAgICAgICAgICAgICAgIC8vIGNoaWxkLmJvZHkuY2hlY2tDb2xsaXNpb25zID0gZmFsc2U7IFxyXG4gICAgICAgICAgICAgICAgY2hpbGQuYm9keS5uZWVkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgIGlmKGlkIT1cIkJvbWJcIiAmJiBpZCE9XCJCVUlcIil7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5tYXRlcmlhbC5tYXAgPSBmcnVpdFRleHR1cmU7XHJcbiAgICAgICAgICAgICAgfWVsc2UgaWYoIWNoaWxkLm5hbWUuaW5jbHVkZXMoXCJPdXRsaW5lXCIpICYmICFjaGlsZC5uYW1lLmluY2x1ZGVzKFwib3V0bGluZVwiKSl7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5tYXRlcmlhbC5tYXAgPSBmcnVpdFRleHR1cmU7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjb25zdCBCb21iVHJhaWwgPSByZXF1aXJlKCcuLy4uL3V0aWxzL0JvbWJUcmFpbC5qcycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIHRoZUJvbWJUcmFpbCA9IG5ldyBCb21iVHJhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogbWUuc2NlbmUudGhpcmQuc2NlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhOiBtZS5zY2VuZS50aGlyZC5jYW1lcmEsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyOiBtZS5zY2VuZSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlUFM6IGJvbWJUcmFpbFRleFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0gKTtcclxuXHJcblxyXG5cdCAgICAgICAgdGhpcy5zY2VuZS50aGlyZC5hZGQuZXhpc3Rpbmcob2JqZWN0KTtcclxuXHQgICAgICAgIHRoaXMuc2NlbmUudGhpcmQucGh5c2ljcy5hZGQuZXhpc3Rpbmcob2JqZWN0LHtzaGFwZTogJ2NvbnZleE1lc2gnfSk7XHJcblxyXG5cclxuICAgICAgICAgIC8vIG9iamVjdC50cmF2ZXJzZSggZnVuY3Rpb24gKCBjaGlsZCApIHtcclxuXHJcbiAgICAgICAgICAvLyAgIGlmICggY2hpbGQuaXNNZXNoICkge1xyXG4gICAgICAgICAgLy8gICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJIYWxmXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJoYWxmXCIpKXtcclxuICAgICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKGNoaWxkKTtcclxuICAgICAgICAgIC8vICAgICAgICAgbWUuc2NlbmUudGhpcmQucGh5c2ljcy5hZGQuZXhpc3RpbmcoY2hpbGQse3NoYXBlOiAnY29udmV4TWVzaCd9KTtcclxuICAgICAgICAgIC8vICAgICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25GbGFncyg2KTtcclxuICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gKTtcclxuXHJcbiAgICAgICAgICBpZihpZD09J0JvbWInKXtcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVJheUZvckJvbWIob2JqZWN0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLnNoYWRvd1RleHR1cmUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgICAgICAgdGhpcy5zaGFkb3dUZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcclxuICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgbWFwOiB0aGlzLnNoYWRvd1RleHR1cmUgfSlcclxuICAgICAgICAgIG1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IHNoYWRvdyA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KHNjYWxlU2l6ZSoxMTAsc2NhbGVTaXplKjExMCksbWF0ZXJpYWwpXHJcbiAgICAgICAgICBzaGFkb3cub3BhY2l0eSA9IDAuODtcclxuICAgICAgICAgIHNoYWRvdy5wb3NpdGlvbi56ID0gLTY5OVxyXG4gICAgICAgICAgc2hhZG93LnBvc2l0aW9uLnggPSBwb3NYO1xyXG4gICAgICAgICAgc2hhZG93LnBvc2l0aW9uLnkgPSBwb3NZO1xyXG4gICAgICAgICAgdGhpcy5zY2VuZS50aGlyZC5hZGQuZXhpc3Rpbmcoc2hhZG93KTtcclxuXHJcbiAgICAgICAgICBsZXQgc3BsYXNoID0gW107XHJcbiAgICAgICAgICBsZXQgaGFzU3BsYXNoID0gZmFsc2U7XHJcbiAgICAgICAgICBpZihkYXRhLnNwbGFzaFRleCE9J25vbmUnKXtcclxuICAgICAgICAgICAgaGFzU3BsYXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLnNwbGFzaFRleHR1cmU7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuc3BsYXNoVGV4PT0nc3BsYXNoMicpe1xyXG4gICAgICAgICAgICAgIHRleHR1cmUgPSB0aGlzLnNwbGFzaFRleHR1cmUyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleHR1cmUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgICAgICAgICB0ZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcclxuICAgICAgICAgICAgZm9yKGxldCBhPTA7YTw0O2ErKyl7XHJcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxTcGxhc2ggPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUsIGNvbG9yOiBkYXRhLnNwbGFzaENvbG9yfSlcclxuICAgICAgICAgICAgICBtYXRlcmlhbFNwbGFzaC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgbWF0ZXJpYWxTcGxhc2gub3BhY2l0eSA9IGRhdGEuYWxwaGEvMjU1LjA7XHJcbiAgICAgICAgICAgICAgbWF0ZXJpYWxTcGxhc2guY29sb3IuYWxwaGEgPSBkYXRhLmFscGhhLzI1NS4wO1xyXG4gICAgICAgICAgICAgIG1hdGVyaWFsU3BsYXNoLmNvbG9yLmJhc2VBbHBoYSA9IGRhdGEuYWxwaGEvMjU1LjA7XHJcblxyXG4gICAgICAgICAgICAgIGxldCBhU3BsYXNoID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoc2NhbGVTaXplKjExMCxzY2FsZVNpemUqMTEwKSxtYXRlcmlhbFNwbGFzaClcclxuICAgICAgICAgICAgICBhU3BsYXNoLnBvc2l0aW9uLnogPSAtNjk4XHJcbiAgICAgICAgICAgICAgYVNwbGFzaC5wb3NpdGlvbi54ID0gcG9zWDtcclxuICAgICAgICAgICAgICBhU3BsYXNoLnBvc2l0aW9uLnkgPSBwb3NZO1xyXG4gICAgICAgICAgICAgIGFTcGxhc2gudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2NlbmUudGhpcmQuYWRkLmV4aXN0aW5nKGFTcGxhc2gpO1xyXG4gICAgICAgICAgICAgIHNwbGFzaC5wdXNoKGFTcGxhc2gpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXh0dXJlID0gdGhpcy5zcGxhc2hUZXh0dXJlMztcclxuICAgICAgICAgICAgaWYoZGF0YS5zcGxhc2hUZXg9PSdzcGxhc2gyJyl7XHJcbiAgICAgICAgICAgICAgdGV4dHVyZSA9IHRoaXMuc3BsYXNoVGV4dHVyZTQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICAgICAgICAgIHRleHR1cmUud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgICAgICAgICBmb3IobGV0IGE9MDthPDI7YSsrKXtcclxuICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbFNwbGFzaCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSwgY29sb3I6IGRhdGEuc3BsYXNoQ29sb3J9KVxyXG4gICAgICAgICAgICAgIG1hdGVyaWFsU3BsYXNoLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBtYXRlcmlhbFNwbGFzaC5vcGFjaXR5ID0gZGF0YS5hbHBoYS8yNTUuMDtcclxuICAgICAgICAgICAgICBtYXRlcmlhbFNwbGFzaC5jb2xvci5hbHBoYSA9IGRhdGEuYWxwaGEvMjU1LjA7XHJcbiAgICAgICAgICAgICAgbWF0ZXJpYWxTcGxhc2guY29sb3IuYmFzZUFscGhhID0gZGF0YS5hbHBoYS8yNTUuMDtcclxuXHJcbiAgICAgICAgICAgICAgbGV0IGFTcGxhc2ggPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShzY2FsZVNpemUqMTEwLHNjYWxlU2l6ZSoxMTApLG1hdGVyaWFsU3BsYXNoKVxyXG4gICAgICAgICAgICAgIGFTcGxhc2gucG9zaXRpb24ueiA9IC02OThcclxuICAgICAgICAgICAgICBhU3BsYXNoLnBvc2l0aW9uLnggPSBwb3NYO1xyXG4gICAgICAgICAgICAgIGFTcGxhc2gucG9zaXRpb24ueSA9IHBvc1k7XHJcbiAgICAgICAgICAgICAgYVNwbGFzaC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5zY2VuZS50aGlyZC5hZGQuZXhpc3RpbmcoYVNwbGFzaCk7XHJcbiAgICAgICAgICAgICAgc3BsYXNoLnB1c2goYVNwbGFzaCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGEuc3BsYXNoVGV4IT0nc3BsYXNoMicpe1xyXG4gICAgICAgICAgICAgIHRleHR1cmUgPSB0aGlzLnNwbGFzaFNsaWNlZDE7XHJcbiAgICAgICAgICAgICAgdGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICAgICAgICAgICAgdGV4dHVyZS53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICAgICAgICAgICAgZm9yKGxldCBhPTA7YTwxO2ErKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbFNwbGFzaCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSwgY29sb3I6IGRhdGEuc3BsYXNoQ29sb3J9KVxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxTcGxhc2gudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxTcGxhc2gub3BhY2l0eSA9IGRhdGEuYWxwaGEvMjU1LjA7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFNwbGFzaC5jb2xvci5hbHBoYSA9IGRhdGEuYWxwaGEvMjU1LjA7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFNwbGFzaC5jb2xvci5iYXNlQWxwaGEgPSBkYXRhLmFscGhhLzI1NS4wO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBhU3BsYXNoID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoc2NhbGVTaXplKjExMCxzY2FsZVNpemUqMTEwKSxtYXRlcmlhbFNwbGFzaClcclxuICAgICAgICAgICAgICAgIGFTcGxhc2gucG9zaXRpb24ueiA9IC02OThcclxuICAgICAgICAgICAgICAgIGFTcGxhc2gucG9zaXRpb24ueCA9IHBvc1g7XHJcbiAgICAgICAgICAgICAgICBhU3BsYXNoLnBvc2l0aW9uLnkgPSBwb3NZO1xyXG4gICAgICAgICAgICAgICAgYVNwbGFzaC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnRoaXJkLmFkZC5leGlzdGluZyhhU3BsYXNoKTtcclxuICAgICAgICAgICAgICAgIHNwbGFzaC5wdXNoKGFTcGxhc2gpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdGV4dHVyZSA9IHRoaXMuc3BsYXNoU2xpY2VkMjtcclxuICAgICAgICAgICAgICB0ZXh0dXJlLndyYXBTID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcclxuICAgICAgICAgICAgICB0ZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcclxuICAgICAgICAgICAgICBmb3IobGV0IGE9MDthPDE7YSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsU3BsYXNoID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlLCBjb2xvcjogZGF0YS5zcGxhc2hDb2xvcn0pXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFNwbGFzaC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFNwbGFzaC5vcGFjaXR5ID0gZGF0YS5hbHBoYS8yNTUuMDtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsU3BsYXNoLmNvbG9yLmFscGhhID0gZGF0YS5hbHBoYS8yNTUuMDtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsU3BsYXNoLmNvbG9yLmJhc2VBbHBoYSA9IGRhdGEuYWxwaGEvMjU1LjA7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFTcGxhc2ggPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShzY2FsZVNpemUqMTEwLHNjYWxlU2l6ZSoxMTApLG1hdGVyaWFsU3BsYXNoKVxyXG4gICAgICAgICAgICAgICAgYVNwbGFzaC5wb3NpdGlvbi56ID0gLTY5OFxyXG4gICAgICAgICAgICAgICAgYVNwbGFzaC5wb3NpdGlvbi54ID0gcG9zWDtcclxuICAgICAgICAgICAgICAgIGFTcGxhc2gucG9zaXRpb24ueSA9IHBvc1k7XHJcbiAgICAgICAgICAgICAgICBhU3BsYXNoLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUudGhpcmQuYWRkLmV4aXN0aW5nKGFTcGxhc2gpO1xyXG4gICAgICAgICAgICAgICAgc3BsYXNoLnB1c2goYVNwbGFzaCk7XHJcbiAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IGZydWl0VHJhaWw7XHJcbiAgICAgICAgICBpZihpZD09J0JvbWInIHx8IGlkPT0nQlVJJyl7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBCb21iU21va2UgPSByZXF1aXJlKCcuLy4uL3V0aWxzL0JvbWJTbW9rZS5qcycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgIGZydWl0VHJhaWwgPSBuZXcgQm9tYlNtb2tlKHtcclxuICAgICAgICAgICAgICBwYXJlbnQ6IHRoaXMuc2NlbmUudGhpcmQuc2NlbmUsXHJcbiAgICAgICAgICAgICAgY2FtZXJhOiB0aGlzLnNjZW5lLnRoaXJkLmNhbWVyYSxcclxuICAgICAgICAgICAgICBoZWxwZXI6IHRoaXMuc2NlbmUsXHJcbiAgICAgICAgICAgICAgdGV4dHVyZVBTOiBib21iU21va2VUZXhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IEZydWl0VHJhaWwgPSByZXF1aXJlKCcuLy4uL3V0aWxzL0ZydWl0VHJhaWwuanMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICBmcnVpdFRyYWlsID0gbmV3IEZydWl0VHJhaWwoe1xyXG4gICAgICAgICAgICAgIHBhcmVudDogdGhpcy5zY2VuZS50aGlyZC5zY2VuZSxcclxuICAgICAgICAgICAgICBjYW1lcmE6IHRoaXMuc2NlbmUudGhpcmQuY2FtZXJhLFxyXG4gICAgICAgICAgICAgIGhlbHBlcjogdGhpcy5zY2VuZSxcclxuICAgICAgICAgICAgICB0ZXh0dXJlUFM6IGZydWl0VHJhaWxUZXhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgQ3JpdGljYWxUcmFpbCA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvQ3JpdGljYWxUcmFpbC5qcycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICBsZXQgY3JpdGljYWxUcmFpbEhhbGYxID0gbmV3IENyaXRpY2FsVHJhaWwoe1xyXG4gICAgICAgICAgICAgIHBhcmVudDogdGhpcy5zY2VuZS50aGlyZC5zY2VuZSxcclxuICAgICAgICAgICAgICBjYW1lcmE6IHRoaXMuc2NlbmUudGhpcmQuY2FtZXJhLFxyXG4gICAgICAgICAgICAgIGhlbHBlcjogdGhpcy5zY2VuZSxcclxuICAgICAgICAgICAgICB0ZXh0dXJlUFM6IGNyaXRpY2FsVHJhaWxUZXhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbGV0IGNyaXRpY2FsVHJhaWxIYWxmMiA9IG5ldyBDcml0aWNhbFRyYWlsKHtcclxuICAgICAgICAgICAgICBwYXJlbnQ6IHRoaXMuc2NlbmUudGhpcmQuc2NlbmUsXHJcbiAgICAgICAgICAgICAgY2FtZXJhOiB0aGlzLnNjZW5lLnRoaXJkLmNhbWVyYSxcclxuICAgICAgICAgICAgICBoZWxwZXI6IHRoaXMuc2NlbmUsXHJcbiAgICAgICAgICAgICAgdGV4dHVyZVBTOiBjcml0aWNhbFRyYWlsVGV4XHJcbiAgICAgICAgICB9KTsvL211c3QgZm9sbG93IGhhbGZcclxuXHJcbiAgICAgICAgICBjb25zdCBpdGVtID0ge29iamVjdCxhY3RpdmU6IHRydWUscGFzdFNjcmVlbjogZmFsc2Usd2lsbEFjdGl2ZTogZmFsc2UsY291bnQ6IDAsc2xpY2VkOiBmYWxzZSxoYWxmMUJhc2VQb3MsaGFsZjJCYXNlUG9zLHNoYWRvdyxpZCxzcGxhc2g6IHNwbGFzaCxoYXNTcGxhc2g6IGhhc1NwbGFzaCxkcm9wbGV0czogZGF0YS5kcm9wbGV0cywgaW1wYWN0U0ZYOiBkYXRhLmltcGFjdFNGWCxzcGxhc2hDb2xvcjpkYXRhLnNwbGFzaENvbG9yLG1pblNwbGFzaDpkYXRhLm1pblNwbGFzaCxtYXhTcGxhc2g6ZGF0YS5tYXhTcGxhc2gsZnJ1aXRUcmFpbCx0aGVCb21iVHJhaWwsY3JpdGljYWxUcmFpbEhhbGYxLGNyaXRpY2FsVHJhaWxIYWxmMn07XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xyXG4gICAgICAgICAgaXRlbS5vYmplY3QuYm9keS5vbi51cGRhdGUoKCk9PntcclxuICAgICAgICAgICAgaWYoIWl0ZW0pe1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5zY2VuZS5nYW1lU3RhdGU9PS0xIHx8IHRoaXMuc2NlbmUuZ2FtZVN0YXRlPT0wIHx8IHRoaXMuc2NlbmUuZ2FtZVN0YXRlPT0zIHx8IHRoaXMuc2NlbmUuZ2FtZVN0YXRlPT00KXtcclxuXHJcbiAgICAgICAgICAgICAgaXRlbS5vYmplY3QucG9zaXRpb24uc2V0KGl0ZW0udWlQb3NYLGl0ZW0udWlQb3NZLDEwKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZShpdGVtKTtcclxuICAgICAgICAgICAgICBpZihpdGVtLmlkPT0nQm9tYicgfHwgaXRlbS5pZD09J0JVSScpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5mcnVpdFRyYWlsLnNldE9uKCk7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9iamVjdC5ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSgwLjUsMC4yNSwwLjUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5mcnVpdFRyYWlsLnNldE9mZigpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaXRlbS5vYmplY3QuYm9keS5waHlzaWNzLnNldEdyYXZpdHkoMCwwLDApO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGl0ZW0ub2JqZWN0LmJvZHkuc2V0VmVsb2NpdHkoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuc2NlbmUuZ2FtZVN0YXRlPT0yKXtcclxuICAgICAgICAgICAgICBpZihpdGVtLndpbGxBY3RpdmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZShpdGVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JjZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwKSoyICs1MzA7IFxyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5pZD09J0JvbWInIHx8IGl0ZW0uaWQ9PSdCVUknKXtcclxuICAgICAgICAgICAgICAgICAgZm9yY2UgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MCkqMiArNTUwOyBcclxuICAgICAgICAgICAgICAgICAgaWYoaXRlbS5vYmplY3QucG9zaXRpb24ueDwwKXtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9iamVjdC5ib2R5LmFwcGx5Rm9yY2UoNzAvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsZm9yY2UvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsLTI1MC90aGlzLmZydXN0dW1TaXplQ2hhbmdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZi5vYmplY3QuYm9keS5hcHBseVRvcnF1ZUltcHVsc2UoNzAwLC03MDAsNzAwKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9iamVjdC5ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSgxLDAsMSk7XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub2JqZWN0LmJvZHkuYXBwbHlGb3JjZSgtNzAvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsZm9yY2UvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsLTI1MC90aGlzLmZydXN0dW1TaXplQ2hhbmdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZi5vYmplY3QuYm9keS5hcHBseVRvcnF1ZUltcHVsc2UoLTcwMCw3MDAsLTcwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5vYmplY3QuYm9keS5zZXRBbmd1bGFyVmVsb2NpdHkoLTEsMCwtMSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBpZihpdGVtLm9iamVjdC5wb3NpdGlvbi54PDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub2JqZWN0LmJvZHkuYXBwbHlGb3JjZSgxMDAvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsZm9yY2UvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsLTI1MC90aGlzLmZydXN0dW1TaXplQ2hhbmdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZi5vYmplY3QuYm9keS5hcHBseVRvcnF1ZUltcHVsc2UoNzAwLC03MDAsNzAwKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9iamVjdC5ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSgxLDAsMSk7XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub2JqZWN0LmJvZHkuYXBwbHlGb3JjZSgtMTAwL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyLGZvcmNlL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyLC0yNTAvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGYub2JqZWN0LmJvZHkuYXBwbHlUb3JxdWVJbXB1bHNlKC03MDAsNzAwLC03MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub2JqZWN0LmJvZHkuc2V0QW5ndWxhclZlbG9jaXR5KC0xLDAsLTEpO1xyXG4gICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW0ub2JqZWN0LmJvZHkuc2V0Q29sbGlzaW9uRmxhZ3MoNilcclxuICAgICAgICAgICAgICAgIGl0ZW0ub2JqZWN0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaXRlbS5vYmplY3QuYm9keS5zZXRWZWxvY2l0eSgwLDAsMCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9iamVjdC5ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSgwLDAsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpdGVtLm9iamVjdC5wb3NpdGlvbi5zZXQoMCwtMS45NSwwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoaXRlbSk7XHJcblx0ICAgICAgICB0aGlzLmxpc3RGcnVpdHMucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICBpZih0aGlzLmlzRmluaXNoKCkpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWFzdWsgZmluaXNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuY29udExvYWQoKTtcclxuICAgICAgICAgIH1cclxuXHQgICAgICAgIFxyXG5cclxuXHQgICAgfSk7XHJcbiAgXHR9XHJcblxyXG4gICAgaXNGaW5pc2goKXtcclxuICAgICAgaWYodGhpcy51ZGFoRmluaXNoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5saXN0RnJ1aXRzLmxlbmd0aD09MTUpe1xyXG4gICAgICAgIHRoaXMudWRhaEZpbmlzaCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzY2hlZHVsZVNwYXduRnJ1aXQodG9TcGF3bix6LHgsZGVsYXkpe1xyXG4gICAgICB0aGlzLmZydWl0VG9TcGF3bkxpc3QucHVzaCh7dG9TcGF3bix6LHgsZGVsYXl9KTtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3bkZydWl0KHRvU3Bhd24seix4KXtcclxuICAgICAgbGV0IGhlbHBlciA9IFtdO1xyXG4gICAgICBsZXQgbWluID0gOTk5OTtcclxuICAgICAgbGV0IGJlYmFzID0gdG9TcGF3bj09XCJSXCI7XHJcbiAgICAgIGlmKHRvU3Bhd249PVwiQlwiKXtcclxuICAgICAgICB0b1NwYXduPVwiQm9tYlwiO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGlzdEZydWl0cy5mb3JFYWNoKGZydWl0ID0+IHtcclxuICAgICAgICBpZiAoIWZydWl0LmFjdGl2ZSAmJiAhZnJ1aXQud2lsbEFjdGl2ZSkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGJlYmFzICYmIGZydWl0LmlkIT0nQm9tYicgJiYgIWZydWl0LmlkLmluY2x1ZGVzKCdVSScpKXtcclxuICAgICAgICAgICAgICBoZWxwZXIucHVzaChmcnVpdCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGlmKHRvU3Bhd249PWZydWl0LmlkKXtcclxuICAgICAgICAgICAgICAgIGhlbHBlci5wdXNoKGZydWl0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCBmO1xyXG4gICAgICBpZihoZWxwZXIubGVuZ3RoPjApe1xyXG4gICAgICAgIGxldCBpZHggPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDAsaGVscGVyLmxlbmd0aC0xKTtcclxuICAgICAgICBmID0gaGVscGVyW2lkeF07XHJcbiAgICAgIH1cclxuICAgICAgXHJcblxyXG4gICAgICBpZihmKXtcclxuICAgICAgICBmLndpbGxBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGYucGFzdFNjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIGYuY291bnQrKztcclxuICAgICAgICBmLm9iamVjdC5wb3NpdGlvbi5zZXQoeCwtMS45NSx6KTtcclxuICAgICAgICAvLyBmLm5ld1Bvc1ggPSB4O1xyXG4gICAgICAgIC8vIGYubmV3UG9zWiA9IHo7XHJcblxyXG5cclxuICAgICAgICAvLyB0aGlzLmFjdGl2YXRlKGYpO1xyXG5cclxuICAgICAgICBmLm9iamVjdC5ib2R5Lm5lZWRVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIC8vIGYub25jZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZXQgcG9zaXRpb24gJytmLmlkKTtcclxuICAgICAgICAvLyB0aGlzLmZydWl0TmVlZFVwZGF0ZS5wdXNoKGYpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5zY2VuZS5TRlhNdXRlZCl7XHJcbiAgICAgICAgICBpZihmLmlkIT0nQm9tYicpe1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnNvdW5kLnBsYXkoJ0ZydWl0TGF1bmNoJyk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5zb3VuZC5wbGF5KCdCb21iTGF1bmNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9tYkZ1c2UucGxheSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckJvbWIoKXtcclxuICAgICAgbGV0IGJvbWI7XHJcbiAgICAgIHRoaXMubGlzdEZydWl0cy5mb3JFYWNoKGZydWl0ID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBpZihmcnVpdC5pZD09J0JvbWInKXtcclxuICAgICAgICAgIGJvbWIgPSBmcnVpdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGlmKGZydWl0LmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZShmcnVpdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYoYm9tYil7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKGJvbWIpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5ib21iUmF5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgIHRoaXMuYm9tYlJheVtpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ib21iSGl0ID0gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0b3BBbGxGcnVpdCgpe1xyXG4gICAgICB0aGlzLmZydWl0VG9TcGF3bkxpc3QgPSBbXTtcclxuICAgICAgdGhpcy5saXN0RnJ1aXRzLmZvckVhY2goZnJ1aXQgPT4ge1xyXG4gICAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnNldFZlbG9jaXR5KDAsIDAsIDApXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWNlKGZydWl0LHNsaWNlRGlyZWN0aW9uKXtcclxuICAgICAgbGV0IG1lID0gdGhpcztcclxuICAgICAgaWYoIWZydWl0LnNsaWNlZCl7XHJcbiAgICAgICAgZnJ1aXQucHJldmVudERlYWN0aXZhdGUgPSBmYWxzZTtcclxuICAgICAgICBmcnVpdC5zbGljZWQgPSB0cnVlO1xyXG4gICAgICAgIGZydWl0LmZydWl0VHJhaWwuc2V0T2ZmKCk7XHJcbiAgICAgICAgZnJ1aXQuc2hhZG93LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBmcnVpdC5vYmplY3QuYm9keS5zZXRDb2xsaXNpb25GbGFncyg2KTtcclxuICAgICAgICBpZihmcnVpdC5pZD09XCJCb21iXCIgfHwgZnJ1aXQuaWQ9PVwiQlVJXCIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjZW5lLmdhbWVTdGF0ZT09Mil7XHJcbiAgICAgICAgICAgICAgZnJ1aXQuZGVhY3RpdmF0ZVRpbWVyU2xpY2UgPSA0MDAwO1xyXG4gICAgICAgICAgICAgIHRoaXMuYm9tYkhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgbGV0IHBvc0ZydWl0ID0gdGhpcy5zY2VuZS50aGlyZC50cmFuc2Zvcm0uZnJvbTNkdG8yZChmcnVpdC5vYmplY3QucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2NlbmUubm90aWZ5Qm9tYkhpdChwb3NGcnVpdC54LHBvc0ZydWl0LnkpO1xyXG4gICAgICAgICAgICAgIGlmKCF0aGlzLnNjZW5lLlNGWE11dGVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuc291bmQucGxheShmcnVpdC5pbXBhY3RTRlgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGRDb3VudGVyKHtcclxuICAgICAgICAgICAgICAgICAgZnJvbTogMCxcclxuICAgICAgICAgICAgICAgICAgdG86IDgsXHJcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxyXG4gICAgICAgICAgICAgICAgICBvblVwZGF0ZTogKHR3ZWVuKT0+XHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5mbG9vcih0d2Vlbi5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlIT04KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib21iUmF5W3ZhbHVlXS5wb3NpdGlvbi5zZXQoZnJ1aXQub2JqZWN0LnBvc2l0aW9uLngsZnJ1aXQub2JqZWN0LnBvc2l0aW9uLnksZnJ1aXQub2JqZWN0LnBvc2l0aW9uLnotMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9tYlJheVt2YWx1ZV0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnBoeXNpY3Muc2V0R3Jhdml0eSgwLDAsMCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdG9wQWxsRnJ1aXQoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKGZydWl0KTtcclxuICAgICAgICAgICAgICBpZighdGhpcy5zY2VuZS5TRlhNdXRlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnNvdW5kLnBsYXkoJ0ZydWl0SW1wYWN0QmlnSG9sbG93Jyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnBoeXNpY3Muc2V0R3Jhdml0eSgwLC0yLDApO1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgaWYoZnJ1aXQuaGFzU3BsYXNoKXtcclxuICAgICAgICAgICAgbGV0IHBvc0ZydWl0ID0gdGhpcy5zY2VuZS50aGlyZC50cmFuc2Zvcm0uZnJvbTNkdG8yZChmcnVpdC5vYmplY3QucG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgZnJ1aXQuY3JpdGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYodGhpcy5zY2VuZS5nYW1lU3RhdGU9PTIgJiYgKFBoYXNlci5NYXRoLkJldHdlZW4oMSwxMDApIDw9IDEyKSl7XHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZnJ1aXQub2JqZWN0LmdldE9iamVjdEJ5TmFtZShmcnVpdC5pZCsnSGFsZjEnKSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zY2VuZS5zaG93Q3JpdGljYWxUZXh0KHBvc0ZydWl0LngsIHBvc0ZydWl0LnkpO1xyXG4gICAgICAgICAgICAgIGZydWl0LmNyaXRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBmcnVpdC5jcml0aWNhbFRyYWlsSGFsZjEuc2V0T24oKTtcclxuICAgICAgICAgICAgICBmcnVpdC5jcml0aWNhbFRyYWlsSGFsZjIuc2V0T24oKTtcclxuICAgICAgICAgICAgICAvLyBsZXQgYm9keSA9IGZydWl0Lm9iamVjdC5ib2R5XHJcbiAgICAgICAgICAgICAgLy8gYm9keS5hcHBseUZvcmNlKDIwMDAsMjAwMCwyMDApO1xyXG4gICAgICAgICAgICAgIC8vIGJvZHkuc2V0QW5ndWxhclZlbG9jaXR5KDEsMCwxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGZydWl0LmNyaXRpY2FsKXtcclxuICAgICAgICAgICAgICBsZXQgY3VyQW5nbGUgPSAgLXNsaWNlRGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgIHRoaXMuZW1pdHRlckRyb3BsZXRzWydTdGFyQ3JpdGljYWwnXS5hbmdsZS5zdGFydCA9IGN1ckFuZ2xlLTE1O1xyXG4gICAgICAgICAgICAgIHRoaXMuZW1pdHRlckRyb3BsZXRzWydTdGFyQ3JpdGljYWwnXS5hbmdsZS5lbmQgPSBjdXJBbmdsZSsxNTtcclxuICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0c1snU3RhckNyaXRpY2FsJ10uZW1pdFBhcnRpY2xlQXQocG9zRnJ1aXQueCxwb3NGcnVpdC55KTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHMyW2ZydWl0LmRyb3BsZXRzXS5lbWl0UGFydGljbGVBdChwb3NGcnVpdC54LHBvc0ZydWl0LnkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBpZihmcnVpdC5pZCE9J0FwcGxlR3JlZW4nKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJBbmdsZSA9ICAtc2xpY2VEaXJlY3Rpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0c1tmcnVpdC5kcm9wbGV0c10uYW5nbGUuc3RhcnQgPSBjdXJBbmdsZS0xNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlckRyb3BsZXRzW2ZydWl0LmRyb3BsZXRzXS5hbmdsZS5lbmQgPSBjdXJBbmdsZSsxNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlckRyb3BsZXRzW2ZydWl0LmRyb3BsZXRzXS5lbWl0UGFydGljbGVBdChwb3NGcnVpdC54LHBvc0ZydWl0LnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZW1pdHRlckRyb3BsZXRzW2ZydWl0LmRyb3BsZXRzXS50ZXh0dXJlLmtleSA9ICdDcm9zc1JlZCc7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmVtaXR0ZXJEcm9wbGV0c1tmcnVpdC5kcm9wbGV0c10pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0czJbZnJ1aXQuZHJvcGxldHNdLmVtaXRQYXJ0aWNsZUF0KHBvc0ZydWl0LngscG9zRnJ1aXQueSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgblNwbGF0ID0gUGhhc2VyLk1hdGguQmV0d2VlbihmcnVpdC5taW5TcGxhc2gsZnJ1aXQubWF4U3BsYXNoKTtcclxuICAgICAgICAgICAgaWYoZnJ1aXQuY3JpdGljYWwpe1xyXG4gICAgICAgICAgICAgIG5TcGxhdCA9IGZydWl0LnNwbGFzaC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBvc3NpYmxlU3BsYXNoID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgYT0wO2E8ZnJ1aXQuc3BsYXNoLmxlbmd0aDthKyspe1xyXG4gICAgICAgICAgICAgIHBvc3NpYmxlU3BsYXNoLnB1c2goYSk7XHJcbiAgICAgICAgICAgICAgaWYoYSE9MCl7XHJcbiAgICAgICAgICAgICAgICBmcnVpdC5zcGxhc2hbYV0ucG9zaXRpb24uc2V0KGZydWl0LnNwbGFzaFswXS5wb3NpdGlvbi54LGZydWl0LnNwbGFzaFswXS5wb3NpdGlvbi55LGZydWl0LnNwbGFzaFswXS5wb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoZnJ1aXQuY3JpdGljYWwpe1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmcnVpdC5zcGxhc2hbYV0ubWF0ZXJpYWwuY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgZnJ1aXQuc3BsYXNoW2FdLm1hdGVyaWFsLmNvbG9yLnNldEhleCgweDFBNUY5MCk7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmcnVpdC5zcGxhc2hbYV0ubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KGZydWl0LnNwbGFzaENvbG9yKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZnJ1aXQuc3BsYXNoW2FdLm1hdGVyaWFsLmNvbG9yLmFscGhhID0gMDtcclxuICAgICAgICAgICAgICAvL2ZydWl0LnNwbGFzaFthXS5tYXRlcmlhbC5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHNmeE5hbWUgPSBmcnVpdC5pbXBhY3RTRlg7XHJcbiAgICAgICAgICAgIGlmKHNmeE5hbWUuaW5jbHVkZXMoJ1dldCcpKXtcclxuICAgICAgICAgICAgICBsZXQgcmFuZCA9IFBoYXNlci5NYXRoLkJldHdlZW4oMSwzKTtcclxuICAgICAgICAgICAgICBzZnhOYW1lICs9ICgnJytyYW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhpcy5zY2VuZS5TRlhNdXRlZCl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zY2VuZS5zb3VuZC5wbGF5KHNmeE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjZW5lLmdhbWVTdGF0ZT09Mil7XHJcbiAgICAgICAgICAgICAgZnJ1aXQuZGVhY3RpdmF0ZVRpbWVyU2xpY2UgPSA0MDAwO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IG1lLmRlYWN0aXZhdGUoZnJ1aXQpOyB9LCAzMDAwKTsgIFxyXG4gICAgICAgICAgICAgIGZydWl0LmRlYWN0aXZhdGVUaW1lclNsaWNlID0gMzAwMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdG1wQXJyID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgYT0wO2E8blNwbGF0O2ErKyl7XHJcbiAgICAgICAgICAgICAgbGV0IGlkeCA9IFBoYXNlci5NYXRoLkJldHdlZW4oMCxwb3NzaWJsZVNwbGFzaC5sZW5ndGgtMSk7XHJcbiAgICAgICAgICAgICAgbGV0IHNwbGFzaElkID0gcG9zc2libGVTcGxhc2hbaWR4XTtcclxuICAgICAgICAgICAgICBwb3NzaWJsZVNwbGFzaC5zcGxpY2UoaWR4LDEpO1xyXG5cclxuICAgICAgICAgICAgICBmcnVpdC5zcGxhc2hbc3BsYXNoSWRdLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGlmKHNwbGFzaElkPT02IHx8IHNwbGFzaElkPT03KXtcclxuICAgICAgICAgICAgICAgIGZydWl0LnNwbGFzaFtzcGxhc2hJZF0ucm90YXRpb24uc2V0KDAsMCxzbGljZURpcmVjdGlvbipNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBsZXQgdG1wID0gZnJ1aXQuc3BsYXNoW3NwbGFzaElkXS5tYXRlcmlhbC5jb2xvcjtcclxuICAgICAgICAgICAgICBmcnVpdC5zcGxhc2hbc3BsYXNoSWRdLm1hdGVyaWFsLmNvbG9yLmFscGhhID0gMTtcclxuICAgICAgICAgICAgICBmcnVpdC5zcGxhc2hbc3BsYXNoSWRdLm1hdGVyaWFsLm9wYWNpdHkgPSAxO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHRtcCxcclxuICAgICAgICAgICAgICAgICAgICBhbHBoYTogMCxcclxuICAgICAgICAgICAgICAgICAgICBkZWxheTogMjAwMCxcclxuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZnJ1aXQuc3BsYXNoW3NwbGFzaElkXS5tYXRlcmlhbC5vcGFjaXR5ID0gdG1wLmFscGhhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgICAgIGxldCB0bXBQb3MgPSBmcnVpdC5zcGxhc2hbc3BsYXNoSWRdLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgIGlmKHNwbGFzaElkPT02IHx8IHNwbGFzaElkPT03KXtcclxuICAgICAgICAgICAgICAgIGxldCB4R2VzZXIgPSBNYXRoLmNvcyhzbGljZURpcmVjdGlvbipNYXRoLlBJLzE4MCkvMjtcclxuICAgICAgICAgICAgICAgIGxldCB5R2VzZXIgPSBNYXRoLnNpbihzbGljZURpcmVjdGlvbipNYXRoLlBJLzE4MCkvMjtcclxuICAgICAgICAgICAgICAgIHRtcFBvcy54ICs9IHhHZXNlcjtcclxuICAgICAgICAgICAgICAgIHRtcFBvcy55ICs9IHlHZXNlcjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdG1wUG9zLnggKz0gUGhhc2VyLk1hdGguQmV0d2VlbigtMiwyKSo1LzQwOyAgXHJcbiAgICAgICAgICAgICAgICB0bXBQb3MueSArPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0yLDIpKjUvNDA7ICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUudHdlZW5zLmFkZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHRtcFBvcyxcclxuICAgICAgICAgICAgICAgICAgICAgIHk6ICctPTAuMDgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkZWxheTogMjAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZydWl0LnNwbGFzaFtzcGxhc2hJZF0ucG9zaXRpb24uc2V0KHRtcFBvcy54LCB0bXBQb3MueSwgdG1wUG9zLnopXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjZW5lLmdhbWVTdGF0ZT09Mil7XHJcbiAgICAgICAgICAgICAgZnJ1aXQuZGVhY3RpdmF0ZVRpbWVyU2xpY2UgPSA0MDAwO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IG1lLmRlYWN0aXZhdGUoZnJ1aXQpOyB9LCAzMDAwKTsgIFxyXG4gICAgICAgICAgICAgIGZydWl0LmRlYWN0aXZhdGVUaW1lclNsaWNlID0gMzAwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcG9zRnJ1aXQgPSB0aGlzLnNjZW5lLnRoaXJkLnRyYW5zZm9ybS5mcm9tM2R0bzJkKGZydWl0Lm9iamVjdC5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBmcnVpdC5jcml0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjZW5lLmdhbWVTdGF0ZT09MiAmJiAoUGhhc2VyLk1hdGguQmV0d2VlbigxLDEwMCkgPD0gMTIpKXtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhmcnVpdC5vYmplY3QuZ2V0T2JqZWN0QnlOYW1lKGZydWl0LmlkKydIYWxmMScpKTtcclxuICAgICAgICAgICAgICB0aGlzLnNjZW5lLnNob3dDcml0aWNhbFRleHQocG9zRnJ1aXQueCwgcG9zRnJ1aXQueSk7XHJcbiAgICAgICAgICAgICAgZnJ1aXQuY3JpdGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGZydWl0LmNyaXRpY2FsVHJhaWxIYWxmMS5zZXRPbigpO1xyXG4gICAgICAgICAgICAgIGZydWl0LmNyaXRpY2FsVHJhaWxIYWxmMi5zZXRPbigpO1xyXG4gICAgICAgICAgICAgIC8vIGxldCBib2R5ID0gZnJ1aXQub2JqZWN0LmJvZHlcclxuICAgICAgICAgICAgICAvLyBib2R5LmFwcGx5Rm9yY2UoMjAwMCwyMDAwLDIwMCk7XHJcbiAgICAgICAgICAgICAgLy8gYm9keS5zZXRBbmd1bGFyVmVsb2NpdHkoMSwwLDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihmcnVpdC5jcml0aWNhbCl7XHJcbiAgICAgICAgICAgICAgbGV0IGN1ckFuZ2xlID0gIC1zbGljZURpcmVjdGlvbjtcclxuICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0c1snU3RhckNyaXRpY2FsJ10uYW5nbGUuc3RhcnQgPSBjdXJBbmdsZS0xNTtcclxuICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJEcm9wbGV0c1snU3RhckNyaXRpY2FsJ10uYW5nbGUuZW5kID0gY3VyQW5nbGUrMTU7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyRHJvcGxldHNbJ1N0YXJDcml0aWNhbCddLmVtaXRQYXJ0aWNsZUF0KHBvc0ZydWl0LngscG9zRnJ1aXQueSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzZnhOYW1lID0gZnJ1aXQuaW1wYWN0U0ZYO1xyXG4gICAgICAgICAgICBpZihzZnhOYW1lLmluY2x1ZGVzKCdXZXQnKSl7XHJcbiAgICAgICAgICAgICAgbGV0IHJhbmQgPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDEsMyk7XHJcbiAgICAgICAgICAgICAgc2Z4TmFtZSArPSAoJycrcmFuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMuc2NlbmUuU0ZYTXV0ZWQpe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2NlbmUuc291bmQucGxheShzZnhOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGV0IG1lID0gdGhpcztcclxuICAgICAgICAgIGZydWl0Lm9iamVjdC5yb3RhdGlvbi54ID0gMDtcclxuICAgICAgICAgIGZydWl0Lm9iamVjdC5yb3RhdGlvbi55ID0gMDtcclxuICAgICAgICAgIGZydWl0Lm9iamVjdC5yb3RhdGlvbi56ID0gKHNsaWNlRGlyZWN0aW9uKSpNYXRoLlBJLzE4MDtcclxuICAgICAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSgwLDAsMCk7XHJcbiAgICAgICAgICBmcnVpdC5vYmplY3QudHJhdmVyc2UoIGZ1bmN0aW9uICggY2hpbGQgKSB7XHJcblxyXG4gICAgICAgICAgaWYgKCBjaGlsZC5pc01lc2ggKSB7XHJcbiAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJXaG9sZVwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwid2hvbGVcIikpe1xyXG4gICAgICAgICAgICAgIGNoaWxkLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoY2hpbGQubmFtZS5pbmNsdWRlcyhcIkhhbGZcIikgfHwgY2hpbGQubmFtZS5pbmNsdWRlcyhcImhhbGZcIikpe1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGNoaWxkLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICBjaGlsZC5yb3RhdGlvbi54ID0gLU1hdGguUEkvMjtcclxuICAgICAgICAgICAgICBjaGlsZC5yb3RhdGlvbi56ID0gMDtcclxuICAgICAgICAgICAgICBjaGlsZC5wb3NpdGlvbi5zZXQoMCwwLDEwKTtcclxuICAgICAgICAgICAgICBjaGlsZC5jcml0aWNhbCA9IGZydWl0LmNyaXRpY2FsO1xyXG5cclxuICAgICAgICAgICAgICAvLyBtZS5zY2VuZS50aGlyZC5waHlzaWNzLmFkZC5leGlzdGluZyhjaGlsZCx7c2hhcGU6ICdjb252ZXhNZXNoJ30pO1xyXG4gICAgICAgICAgICAgIGNoaWxkLmJvZHkubmVlZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2hpbGQpO1xyXG4gICAgICAgICAgICAgIC8vIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uRmxhZ3MoNCk7XHJcbiAgICAgICAgICAgICAgLy8gbGV0IGZvcmNlID0gMTAwO1xyXG4gICAgICAgICAgICAgIC8vIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJIYWxmMVwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwiaGFsZjFcIikpe1xyXG4gICAgICAgICAgICAgIC8vICAgY2hpbGQuYm9keS5hcHBseUZvcmNlKDIwMC9tZS5mcnVzdHVtU2l6ZUNoYW5nZXIsZm9yY2UvbWUuZnJ1c3R1bVNpemVDaGFuZ2VyLC0yMC9tZS5mcnVzdHVtU2l6ZUNoYW5nZXIpO1xyXG4gICAgICAgICAgICAgIC8vICAgY2hpbGQuYm9keS5zZXRBbmd1bGFyVmVsb2NpdHkoMSwwLDEpO1xyXG4gICAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAgIC8vICAgY2hpbGQuYm9keS5hcHBseUZvcmNlKC0yMDAvbWUuZnJ1c3R1bVNpemVDaGFuZ2VyLGZvcmNlL21lLmZydXN0dW1TaXplQ2hhbmdlciwtMjAvbWUuZnJ1c3R1bVNpemVDaGFuZ2VyKTtcclxuICAgICAgICAgICAgICAvLyAgIGNoaWxkLmJvZHkuc2V0QW5ndWxhclZlbG9jaXR5KC0xLDAsLTEpO1xyXG4gICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnJ1aXQub2JqZWN0LmJvZHkucGh5c2ljcy5zZXRHcmF2aXR5KDAsLTIsMCk7XHJcbiAgICAgICAgcmV0dXJuIGZydWl0LmNyaXRpY2FsPzI6MTtcclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gLTE7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2YXRlKGZydWl0KSB7XHJcbiAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnNldFZlbG9jaXR5KDAsIDAsIDApXHJcbiAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSgwLDAsMCk7XHJcbiAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnNldFJvdGF0aW9uKDAsMCwwKTtcclxuICAgICAgaWYodGhpcy5zY2VuZS5nYW1lU3RhdGU9PTIpe1xyXG4gICAgICAgIGZydWl0Lm9iamVjdC5ib2R5LnNldENvbGxpc2lvbkZsYWdzKDQpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGZydWl0Lm9iamVjdC5ib2R5LnNldENvbGxpc2lvbkZsYWdzKDQpO1xyXG4gICAgICBmcnVpdC5vYmplY3QudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICBmcnVpdC5zaGFkb3cucG9zaXRpb24ueCA9IGZydWl0Lm9iamVjdC5wb3NpdGlvbi54LTAuMDgyNTtcclxuICAgICAgZnJ1aXQuc2hhZG93LnBvc2l0aW9uLnkgPSBmcnVpdC5vYmplY3QucG9zaXRpb24ueS0wLjEyNTtcclxuICAgICAgZnJ1aXQuZnJ1aXRUcmFpbC5zZXRQb3NpdGlvbihmcnVpdC5vYmplY3QucG9zaXRpb24ueCxmcnVpdC5vYmplY3QucG9zaXRpb24ueS0wLjA4KTtcclxuICAgICAgZnJ1aXQuZnJ1aXRUcmFpbC5zZXRPbigpO1xyXG4gICAgICBpZihmcnVpdC5pZD09J0JvbWInIHx8IGZydWl0LmlkPT0nQlVJJyl7XHJcbiAgICAgICAgZnJ1aXQudGhlQm9tYlRyYWlsLnNldFBvc2l0aW9uKGZydWl0Lm9iamVjdC5wb3NpdGlvbi54LGZydWl0Lm9iamVjdC5wb3NpdGlvbi55KzAuMDgpO1xyXG4gICAgICAgIGZydWl0LnRoZUJvbWJUcmFpbC5zZXRPbigpOyAgXHJcblxyXG4gICAgICAgIGZydWl0LmZydWl0VHJhaWwuc2V0UG9zaXRpb24oZnJ1aXQub2JqZWN0LnBvc2l0aW9uLngtMC4wNjUsZnJ1aXQub2JqZWN0LnBvc2l0aW9uLnkrMC4wMyk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGZydWl0LnNoYWRvdy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgXHJcbiAgICAgIGxldCBtZSA9IHRoaXM7XHJcblxyXG4gICAgICBmcnVpdC5vYmplY3QudHJhdmVyc2UoIGZ1bmN0aW9uICggY2hpbGQgKSB7XHJcblxyXG4gICAgICAgIGlmICggY2hpbGQuaXNNZXNoICkge1xyXG4gICAgICAgICAgaWYoY2hpbGQubmFtZS5pbmNsdWRlcyhcIldob2xlXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJ3aG9sZVwiKSl7XHJcbiAgICAgICAgICAgIGNoaWxkLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJIYWxmXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJoYWxmXCIpKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNoaWxkLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgZnJ1aXQuc2xpY2VkID0gZmFsc2U7XHJcbiAgICAgIGZydWl0LmFjdGl2ZSA9IHRydWVcclxuICAgICAgaWYoZnJ1aXQuaGFzU3BsYXNoKXtcclxuICAgICAgICBmcnVpdC5zcGxhc2hbMF0ubWF0ZXJpYWwuY29sb3IuYWxwaGEgPSBmcnVpdC5zcGxhc2hbMF0ubWF0ZXJpYWwuY29sb3IuYmFzZUFscGhhO1xyXG4gICAgICAgIGZydWl0LnNwbGFzaFswXS5tYXRlcmlhbC5vcGFjaXR5ID0gZnJ1aXQuc3BsYXNoWzBdLm1hdGVyaWFsLmNvbG9yLmFscGhhO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZSAoZnJ1aXQpIHtcclxuICAgICAgaWYoZnJ1aXQucHJldmVudERlYWN0aXZhdGUpe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBmcnVpdC5vYmplY3QuYm9keS5zZXRDb2xsaXNpb25GbGFncyg2KVxyXG4gICAgICBmcnVpdC5vYmplY3QudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICBmcnVpdC5jcml0aWNhbCA9IGZhbHNlO1xyXG4gICAgICBmcnVpdC5zaGFkb3cucG9zaXRpb24ueCA9IC0xMDA7XHJcbiAgICAgIC8vIGZydWl0Lm9iamVjdC5wb3NpdGlvbi55ID0gLTEwMDtcclxuICAgICAgZnJ1aXQub2JqZWN0LmJvZHkuc2V0VmVsb2NpdHkoMCwwLDApO1xyXG4gICAgICBmcnVpdC5vYmplY3QuYm9keS5zZXRBbmd1bGFyVmVsb2NpdHkoMCwwLDApO1xyXG4gICAgICBmcnVpdC5vYmplY3QucG9zaXRpb24uc2V0KDAsLTEuOTUsMCk7XHJcbiAgICAgIFxyXG4gICAgICBmcnVpdC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICBmcnVpdC53aWxsQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIGZydWl0Lm5lZWRVcGRhdGUgPSB0cnVlO1xyXG4gICAgICBpZihmcnVpdC5oYXNTcGxhc2gpe1xyXG4gICAgICAgIGZvcihsZXQgYT0wO2E8ZnJ1aXQuc3BsYXNoLmxlbmd0aDthKyspe1xyXG4gICAgICAgICAgZnJ1aXQuc3BsYXNoW2FdLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgaWYoZnJ1aXQuaWQ9PSdCb21iJyB8fCBmcnVpdC5pZD09J0JVSScpe1xyXG4gICAgICAgIHRoaXMuYm9tYkZ1c2Uuc3RvcCgpO1xyXG4gICAgICAgIGZydWl0LmZydWl0VHJhaWwuc2V0T2ZmKCk7XHJcbiAgICAgICAgZnJ1aXQudGhlQm9tYlRyYWlsLnNldE9mZigpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBmcnVpdC5mcnVpdFRyYWlsLnNldE9mZigpO1xyXG4gICAgICAgIGZydWl0LmNyaXRpY2FsVHJhaWxIYWxmMS5zZXRPZmYoKTtcclxuICAgICAgICBmcnVpdC5jcml0aWNhbFRyYWlsSGFsZjIuc2V0T2ZmKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBtZSA9IHRoaXM7XHJcbiAgICAgIGZydWl0Lm9iamVjdC50cmF2ZXJzZSggZnVuY3Rpb24gKCBjaGlsZCApIHtcclxuXHJcbiAgICAgICAgaWYgKCBjaGlsZC5pc01lc2ggKSB7XHJcbiAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiV2hvbGVcIikgfHwgY2hpbGQubmFtZS5pbmNsdWRlcyhcIndob2xlXCIpKXtcclxuICAgICAgICAgICAgY2hpbGQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYoY2hpbGQubmFtZS5pbmNsdWRlcyhcIkhhbGZcIikgfHwgY2hpbGQubmFtZS5pbmNsdWRlcyhcImhhbGZcIikpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2hpbGQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZihjaGlsZC5ib2R5KXtcclxuICAgICAgICAgICAgICBjaGlsZC5ib2R5LnNldFZlbG9jaXR5KDAsIDAsIDApXHJcbiAgICAgICAgICAgICAgY2hpbGQuYm9keS5zZXRBbmd1bGFyVmVsb2NpdHkoMCwwLDApO1xyXG4gICAgICAgICAgICAgIGNoaWxkLmJvZHkuc2V0Um90YXRpb24oMCwwLDApO1xyXG5cclxuICAgICAgICAgICAgICAvLyBtZS5zY2VuZS50aGlyZC5waHlzaWNzLmRlc3Ryb3koY2hpbGQuYm9keSk7XHJcbiAgICAgICAgICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25GbGFncyg2KVxyXG4gICAgICAgICAgICAgIC8vIGNoaWxkLmJvZHkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJIYWxmMVwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwiaGFsZjFcIikpe1xyXG4gICAgICAgICAgICAgICAgY2hpbGQucG9zaXRpb24ueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wb3NpdGlvbi55ID0gMDtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnBvc2l0aW9uLnogPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoaWxkLnJvdGF0aW9uLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQucm90YXRpb24ueSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5yb3RhdGlvbi56ID0gMDtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnBvc2l0aW9uLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQucG9zaXRpb24ueSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wb3NpdGlvbi56ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5yb3RhdGlvbi54ID0gMDtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnJvdGF0aW9uLnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQucm90YXRpb24ueiA9IDA7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZighZnJ1aXQuc2xpY2VkICYmIGZydWl0LmlkICE9ICdCb21iJyAmJiBmcnVpdC5pZCAhPSAnQlVJJyl7XHJcbiAgICAgICAgbGV0IHBvc1ggPSB0aGlzLnNjZW5lLnRoaXJkLnRyYW5zZm9ybS5mcm9tM2R0bzJkKGZydWl0Lm9iamVjdC5wb3NpdGlvbikueDtcclxuICAgICAgICBpZihmcnVpdC5wYXN0U2NyZWVuKXtcclxuICAgICAgICAgIHRoaXMuc2NlbmUubG9zZUxpZmUocG9zWCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnNjZW5lLmdhbWVTdGF0ZT09Myl7XHJcbiAgICAgICAgICB0aGlzLmZydWl0VG9TcGF3bkxpc3QgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGVsdGEpIHtcclxuXHJcbiAgICAgIC8vIGZvcihsZXQgYT0wO2E8dGhpcy5mcnVpdE5lZWRVcGRhdGUubGVuZ3RoO2ErKyl7XHJcbiAgICAgIC8vICAgbGV0IGYgPSB0aGlzLmZydWl0TmVlZFVwZGF0ZVthXTtcclxuXHJcbiAgICAgICAgLy8gZi5vYmplY3QucG9zaXRpb24uc2V0KGYubmV3UG9zWCwtMS45NSxmLm5ld1Bvc1opO1xyXG4gICAgICAgIC8vIGYub2JqZWN0LmJvZHkubmVlZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKT0+e2Yub2JqZWN0LmJvZHkubmVlZFVwZGF0ZSA9IHRydWU7fSwxMDApO1xyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgLy8gICBmLm9iamVjdC5ib2R5Lm5lZWRVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ25lZWR1cGRhdGU6ICcrZi5pZCk7XHJcbiAgICAgICAgLy8gfSwxMDApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCduZWVkdXBkYXRlOiAnK3RoaXMuZnJ1aXROZWVkVXBkYXRlW2FdLmlkKTtcclxuICAgICAgLy8gfVxyXG4vLyAgICAgIHRoaXMuZnJ1aXROZWVkVXBkYXRlID0gW107XHJcblxyXG4gICAgICBpZih0aGlzLnNjZW5lLmdhbWVTdGF0ZT09MiAmJiAhdGhpcy5zY2VuZS5oaXRCb21iKXtcclxuICAgICAgICBmb3IobGV0IGE9MDthPHRoaXMuZnJ1aXRUb1NwYXduTGlzdC5sZW5ndGg7YSsrKXtcclxuICAgICAgICAgIGxldCBvYmogPSB0aGlzLmZydWl0VG9TcGF3bkxpc3RbYV07XHJcbiAgICAgICAgICBvYmouZGVsYXkgLT0gZGVsdGE7XHJcbiAgICAgICAgICBpZihvYmouZGVsYXkgPD0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3Bhd25GcnVpdChvYmoudG9TcGF3bixvYmoueixvYmoueCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbmV3QXJyID0gW107XHJcbiAgICAgICAgZm9yKGxldCBhPTA7YTx0aGlzLmZydWl0VG9TcGF3bkxpc3QubGVuZ3RoO2ErKyl7XHJcbiAgICAgICAgICBsZXQgb2JqID0gdGhpcy5mcnVpdFRvU3Bhd25MaXN0W2FdO1xyXG4gICAgICAgICAgaWYob2JqLmRlbGF5ID4gMCl7XHJcbiAgICAgICAgICAgIG5ld0Fyci5wdXNoKG9iaik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJ1aXRUb1NwYXduTGlzdCA9IG5ld0FycjtcclxuICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5saXN0RnJ1aXRzLmZvckVhY2goZnJ1aXQgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGZydWl0LmlkPT0nQm9tYicgfHwgZnJ1aXQuaWQ9PSdCVUknKXtcclxuICAgICAgICAgIGxldCBjdXJSb3QgPSBmcnVpdC5vYmplY3Qucm90YXRpb24uei1NYXRoLlBJLzI7XHJcbiAgICAgICAgICBsZXQgbW92ZVggPSBNYXRoLmNvcyhjdXJSb3QpKjAuMjE7XHJcbiAgICAgICAgICBsZXQgbW92ZVkgPSBNYXRoLnNpbihjdXJSb3QpKjAuMjE7XHJcbiAgICAgICAgICBmcnVpdC50aGVCb21iVHJhaWwuc2V0UG9zaXRpb24oZnJ1aXQub2JqZWN0LnBvc2l0aW9uLngtbW92ZVgsZnJ1aXQub2JqZWN0LnBvc2l0aW9uLnktbW92ZVkpO1xyXG4gICAgICAgICAgZnJ1aXQudGhlQm9tYlRyYWlsLlN0ZXAoZGVsdGEvMTAwMC4wKTtcclxuXHJcbiAgICAgICAgICBmcnVpdC5mcnVpdFRyYWlsLnNldFBvc2l0aW9uKGZydWl0Lm9iamVjdC5wb3NpdGlvbi54LW1vdmVYLGZydWl0Lm9iamVjdC5wb3NpdGlvbi55LW1vdmVZKTtcclxuICAgICAgICAgIGZydWl0LmZydWl0VHJhaWwuU3RlcChkZWx0YS8xMDAwLjApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZnJ1aXQuZnJ1aXRUcmFpbC5TdGVwKGRlbHRhLzEwMDAuMCk7XHJcblxyXG4gICAgICAgICAgZnJ1aXQuY3JpdGljYWxUcmFpbEhhbGYxLlN0ZXAoZGVsdGEvMTAwMC4wKTtcclxuICAgICAgICAgIGZydWl0LmNyaXRpY2FsVHJhaWxIYWxmMi5TdGVwKGRlbHRhLzEwMDAuMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZydWl0LmFjdGl2ZSl7XHJcbiAgICAgICAgICAvLyBmcnVpdC5uZWVkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgIGlmKHRoaXMuc2NlbmUuZ2FtZVN0YXRlPT0tMSB8fCB0aGlzLnNjZW5lLmdhbWVTdGF0ZT09MCB8fCB0aGlzLnNjZW5lLmdhbWVTdGF0ZT09MyB8fCB0aGlzLnNjZW5lLmdhbWVTdGF0ZT09NCl7XHJcbiAgICAgICAgICAgIC8vIGZydWl0Lm9iamVjdC5ib2R5LnNldENvbGxpc2lvbkZsYWdzKDYpO1xyXG5cclxuICAgICAgICAgICAgaWYoZnJ1aXQuaWQ9PSdCVUknIHx8IGZydWl0LmlkPT0nV01VSScgfHwgZnJ1aXQuaWQ9PSdLV1VJJyB8fCBmcnVpdC5pZD09J0FHVUknKXtcclxuICAgICAgICAgICAgICBmcnVpdC5vYmplY3QucG9zaXRpb24uc2V0KGZydWl0LnVpUG9zWCxmcnVpdC51aVBvc1ksMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZnJ1aXQub2JqZWN0LmJvZHkuc2V0Q29sbGlzaW9uRmxhZ3MoNCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXBvczogJytmcnVpdC51aVBvc1grJywgJytmcnVpdC51aVBvc1kpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYodGhpcy5ib21iSGl0KXtcclxuICAgICAgICAgICAgZnJ1aXQub2JqZWN0LmJvZHkucGh5c2ljcy5zZXRHcmF2aXR5KDAsMCwwKTtcclxuICAgICAgICAgICAgZnJ1aXQub2JqZWN0LmJvZHkuc2V0VmVsb2NpdHkoMCwwLDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZihmcnVpdC5vYmplY3QucG9zaXRpb24ueT4tMS45KXtcclxuICAgICAgICAgICAgZnJ1aXQucGFzdFNjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYoZnJ1aXQuc2xpY2VkKXtcclxuICAgICAgICAgICAgZnJ1aXQuZGVhY3RpdmF0ZVRpbWVyU2xpY2UgLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGxldCBjYW5EZWFjdGl2YXRlID0gZnJ1aXQuZGVhY3RpdmF0ZVRpbWVyU2xpY2U8PTA7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgaWYoY2FuRGVhY3RpdmF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoZnJ1aXQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZnJ1aXQub2JqZWN0LnBvc2l0aW9uLnkgPCAtMikge1xyXG4gICAgICAgICAgICBpZighZnJ1aXQuc2xpY2VkKXtcclxuICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoZnJ1aXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZnJ1aXQuZnJ1aXRUcmFpbC5zZXRQb3NpdGlvbihmcnVpdC5vYmplY3QucG9zaXRpb24ueCxmcnVpdC5vYmplY3QucG9zaXRpb24ueS0wLjA4KVxyXG5cclxuICAgICAgICAgICAgaWYoZnJ1aXQuc2xpY2VkKXtcclxuICAgICAgICAgICAgICBsZXQgaGFsZjEgPSBmcnVpdC5vYmplY3QuZ2V0T2JqZWN0QnlOYW1lKGZydWl0LmlkKydIYWxmMScpO1xyXG4gICAgICAgICAgICAgIGxldCBoYWxmMiA9IGZydWl0Lm9iamVjdC5nZXRPYmplY3RCeU5hbWUoZnJ1aXQuaWQrJ0hhbGYyJyk7XHJcbiAgICAgICAgICAgICAgaWYoaGFsZjEgJiYgaGFsZjIpe1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFsZjEpO1xyXG4gICAgICAgICAgICAgICAgaGFsZjEuZ2V0V29ybGRQb3NpdGlvbih0aGlzLmhlbHBlclZlYzMpO1xyXG4gICAgICAgICAgICAgICAgZnJ1aXQuY3JpdGljYWxUcmFpbEhhbGYxLnNldFBvc2l0aW9uKHRoaXMuaGVscGVyVmVjMy54LHRoaXMuaGVscGVyVmVjMy55LTAuMDgpXHJcbiAgICAgICAgICAgICAgICBoYWxmMi5nZXRXb3JsZFBvc2l0aW9uKHRoaXMuaGVscGVyVmVjMyk7XHJcbiAgICAgICAgICAgICAgICBmcnVpdC5jcml0aWNhbFRyYWlsSGFsZjIuc2V0UG9zaXRpb24odGhpcy5oZWxwZXJWZWMzLngsdGhpcy5oZWxwZXJWZWMzLnktMC4wOClcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBvc0hhbGYyKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmcnVpdC5zaGFkb3cucG9zaXRpb24ueCA9IGZydWl0Lm9iamVjdC5wb3NpdGlvbi54LTAuMDgyNTtcclxuICAgICAgICAgICAgZnJ1aXQuc2hhZG93LnBvc2l0aW9uLnkgPSBmcnVpdC5vYmplY3QucG9zaXRpb24ueS0wLjEyNTtcclxuXHJcbiAgICAgICAgICAgIGlmKGZydWl0Lmhhc1NwbGFzaCAmJiAhZnJ1aXQuc3BsYXNoWzBdLnZpc2libGUpe1xyXG4gICAgICAgICAgICAgIGZydWl0LnNwbGFzaFswXS5wb3NpdGlvbi54ID0gZnJ1aXQub2JqZWN0LnBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgZnJ1aXQuc3BsYXNoWzBdLnBvc2l0aW9uLnkgPSBmcnVpdC5vYmplY3QucG9zaXRpb24ueTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHBvc2l0aW9uV2F0ZXJNZWxvblVJKCl7XHJcbiAgICAgIGxldCB3YXRlcm1lbG9uO1xyXG4gICAgICB0aGlzLmxpc3RGcnVpdHMuZm9yRWFjaChmcnVpdCA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZnJ1aXQuaWQ9PSdXTVVJJyl7XHJcbiAgICAgICAgICB3YXRlcm1lbG9uID0gZnJ1aXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYod2F0ZXJtZWxvbil7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKHdhdGVybWVsb24pO1xyXG4gICAgICAgIHdhdGVybWVsb24ub2JqZWN0LnBvc2l0aW9uLnNldCgwLC02NC90aGlzLmZydXN0dW1TaXplQ2hhbmdlciwxMC90aGlzLmZydXN0dW1TaXplQ2hhbmdlcik7XHJcbiAgICAgICAgd2F0ZXJtZWxvbi5zcGxhc2hbMF0ucG9zaXRpb24ueCA9IHdhdGVybWVsb24ub2JqZWN0LnBvc2l0aW9uLng7XHJcbiAgICAgICAgd2F0ZXJtZWxvbi5zcGxhc2hbMF0ucG9zaXRpb24ueSA9IHdhdGVybWVsb24ub2JqZWN0LnBvc2l0aW9uLnk7XHJcbiAgICAgICAgd2F0ZXJtZWxvbi51aVBvc1ggPSAwO1xyXG4gICAgICAgIHdhdGVybWVsb24udWlQb3NZID0gLTY0L3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgICAgIGxldCBzcyA9IDA7Ly8wLjg1XHJcbiAgICAgICAgd2F0ZXJtZWxvbi5vYmplY3QudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHdhdGVybWVsb24ub2JqZWN0LnRyYXZlcnNlKCBmdW5jdGlvbiAoIGNoaWxkICkge1xyXG5cclxuICAgICAgICAgIGlmICggY2hpbGQuaXNNZXNoICkge1xyXG4gICAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiV2hvbGVcIikgfHwgY2hpbGQubmFtZS5pbmNsdWRlcyhcIndob2xlXCIpKXtcclxuICAgICAgICAgICAgICBjaGlsZC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBjaGlsZC5zY2FsZS5zZXQoc3Msc3Msc3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiSGFsZlwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwiaGFsZlwiKSl7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgY2hpbGQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnNldChzcyxzcyxzcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2F0ZXJtZWxvbi5vYmplY3QuYm9keS5uZWVkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlUG9zaXRpb25XYXRlck1lbG9uVUkoKXtcclxuICAgICAgbGV0IHdhdGVybWVsb247XHJcbiAgICAgIHRoaXMubGlzdEZydWl0cy5mb3JFYWNoKGZydWl0ID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBpZihmcnVpdC5pZD09J1dhdGVybWVsb24nKXtcclxuICAgICAgICAgIHdhdGVybWVsb24gPSBmcnVpdDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZih3YXRlcm1lbG9uKXtcclxuICAgICAgICB3YXRlcm1lbG9uLm9iamVjdC5wb3NpdGlvbi5zZXQoMCwtNjQvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsMTAvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIpO1xyXG4gICAgICAgIHdhdGVybWVsb24uc3BsYXNoWzBdLnBvc2l0aW9uLnggPSB3YXRlcm1lbG9uLm9iamVjdC5wb3NpdGlvbi54O1xyXG4gICAgICAgIHdhdGVybWVsb24uc3BsYXNoWzBdLnBvc2l0aW9uLnkgPSB3YXRlcm1lbG9uLm9iamVjdC5wb3NpdGlvbi55O1xyXG4gICAgICAgIHdhdGVybWVsb24ub2JqZWN0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHdhdGVybWVsb24ub2JqZWN0LnRyYXZlcnNlKCBmdW5jdGlvbiAoIGNoaWxkICkge1xyXG5cclxuICAgICAgICAgIGlmICggY2hpbGQuaXNNZXNoICkge1xyXG4gICAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiV2hvbGVcIikgfHwgY2hpbGQubmFtZS5pbmNsdWRlcyhcIndob2xlXCIpKXtcclxuICAgICAgICAgICAgICBjaGlsZC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRGcnVpdChpZCl7XHJcbiAgICAgIGxldCByZXM7XHJcbiAgICAgIHRoaXMubGlzdEZydWl0cy5mb3JFYWNoKGZydWl0ID0+e1xyXG4gICAgICAgIGlmKGZydWl0LmlkPT1pZCl7XHJcbiAgICAgICAgICByZXMgPSBmcnVpdDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0V2F0ZXJNZWxvblVJKGlkPSdXYXRlcm1lbG9uJyl7XHJcbiAgICAgIGxldCB3YXRlcm1lbG9uO1xyXG4gICAgICB0aGlzLmxpc3RGcnVpdHMuZm9yRWFjaChmcnVpdCA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZnJ1aXQuaWQ9PWlkKXtcclxuICAgICAgICAgIHdhdGVybWVsb24gPSBmcnVpdDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYod2F0ZXJtZWxvbil7XHJcbiAgICAgICAgd2F0ZXJtZWxvbi5wcmV2ZW50RGVhY3RpdmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzcyA9IDE7XHJcbiAgICAgICAgd2F0ZXJtZWxvbi5vYmplY3QudHJhdmVyc2UoIGZ1bmN0aW9uICggY2hpbGQgKSB7XHJcblxyXG4gICAgICAgICAgaWYgKCBjaGlsZC5pc01lc2ggKSB7XHJcbiAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJXaG9sZVwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwid2hvbGVcIikpe1xyXG4gICAgICAgICAgICAgIGNoaWxkLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBjaGlsZC5zY2FsZS5zZXQoc3Msc3Msc3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiSGFsZlwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwiaGFsZlwiKSl7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgY2hpbGQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnNldChzcyxzcyxzcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJCb21iXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJib21iXCIpKXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBjaGlsZC5zY2FsZS5zZXQoc3Msc3Msc3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xyXG4gICAgICAgIGlmKHdhdGVybWVsb24uc2xpY2VkKXtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZSh3YXRlcm1lbG9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHBvc2l0aW9uRnJ1aXRVSShpZCxwb3NYLHBvc1ksc2NhbGVTaXplKXtcclxuICAgICAgbGV0IHdhdGVybWVsb247XHJcbiAgICAgIHRoaXMubGlzdEZydWl0cy5mb3JFYWNoKGZydWl0ID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBpZihmcnVpdC5pZD09aWQpe1xyXG4gICAgICAgICAgd2F0ZXJtZWxvbiA9IGZydWl0O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmKHdhdGVybWVsb24pe1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSh3YXRlcm1lbG9uKTtcclxuICAgICAgICB3YXRlcm1lbG9uLnByZXZlbnREZWFjdGl2YXRlID0gdHJ1ZTtcclxuICAgICAgICBpZihpZCE9J0JvbWInICYmIGlkIT0nQlVJJyl7XHJcbiAgICAgICAgICB3YXRlcm1lbG9uLmZydWl0VHJhaWwuc2V0T2ZmKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3YXRlcm1lbG9uLm9iamVjdC5wb3NpdGlvbi5zZXQocG9zWCozMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlcixwb3NZKjMyL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyLDEwL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyKTtcclxuICAgICAgICBpZihpZD09J0JvbWInIHx8IGlkPT0nQlVJJyl7XHJcbiAgICAgICAgICB3YXRlcm1lbG9uLm9iamVjdC5yb3RhdGlvbi5zZXQoMCwwLjUyMywtMC41MjMpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih3YXRlcm1lbG9uLmhhc1NwbGFzaCl7XHJcbiAgICAgICAgICB3YXRlcm1lbG9uLnNwbGFzaFswXS5wb3NpdGlvbi54ID0gd2F0ZXJtZWxvbi5vYmplY3QucG9zaXRpb24ueDtcclxuICAgICAgICAgIHdhdGVybWVsb24uc3BsYXNoWzBdLnBvc2l0aW9uLnkgPSB3YXRlcm1lbG9uLm9iamVjdC5wb3NpdGlvbi55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBsZXQgc3MgPSBzY2FsZVNpemU7XHJcbiAgICAgICAgbGV0IHNzID0gMDtcclxuICAgICAgICB3YXRlcm1lbG9uLm9iamVjdC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xyXG4gICAgICAgIHdhdGVybWVsb24udWlQb3NYID0gcG9zWCozMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgICAgICB3YXRlcm1lbG9uLnVpUG9zWSA9IHBvc1kqMzIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXI7XHJcblxyXG4gICAgICAgIHdhdGVybWVsb24ub2JqZWN0LnRyYXZlcnNlKCBmdW5jdGlvbiAoIGNoaWxkICkge1xyXG5cclxuICAgICAgICAgIGlmICggY2hpbGQuaXNNZXNoICkge1xyXG4gICAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiV2hvbGVcIikgfHwgY2hpbGQubmFtZS5pbmNsdWRlcyhcIndob2xlXCIpKXtcclxuICAgICAgICAgICAgICBjaGlsZC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBjaGlsZC5zY2FsZS5zZXQoc3Msc3Msc3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihjaGlsZC5uYW1lLmluY2x1ZGVzKFwiSGFsZlwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwiaGFsZlwiKSl7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgY2hpbGQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnNldChzcyxzcyxzcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJCb21iXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJib21iXCIpKXtcclxuICAgICAgICAgICAgICBtZS5zY2VuZS50d2VlbnMuYWRkQ291bnRlcih7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiAwLFxyXG4gICAgICAgICAgICAgICAgdG86IDM2MCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA3MDAwLFxyXG4gICAgICAgICAgICAgICAgbG9vcDogLTEsXHJcbiAgICAgICAgICAgICAgICBvblVwZGF0ZTogKHR3ZWVuKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBNYXRoLmZsb29yKHR3ZWVuLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnJvdGF0aW9uLnNldCgwLHZhbHVlLzE4MCpNYXRoLlBJLDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnNldChzcyxzcyxzcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdhdGVybWVsb24ub2JqZWN0LmJvZHkubmVlZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0RnJ1aXRzKCl7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RGcnVpdHM7XHJcbiAgICB9XHJcblxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpY2VDcml0aWNhbEVmZmVjdCBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Db250YWluZXIge1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHgsIHkpIHtcclxuICAgICAgICBzdXBlcihzY2VuZSwgeCwgeSk7XHJcbiAgICAgICAgc2NlbmUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGljZUF0YXMgPSB0aGlzLnNjZW5lLmFkZC5pbWFnZSgwLDAsJ1NsaWNlRGlhbW9uZENyaXRpY2FsJyk7XHJcbiAgICAgICAgdGhpcy5zbGljZUJhd2FoID0gdGhpcy5zY2VuZS5hZGQuaW1hZ2UoMCwwLCdTbGljZURpYW1vbmRDcml0aWNhbCcpO1xyXG4gICAgICAgIHRoaXMuc2xpY2VBdGFzLnNldE9yaWdpbigwLjUsMC41KTtcclxuICAgICAgICB0aGlzLnNsaWNlQmF3YWguc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZCh0aGlzLnNsaWNlQXRhcyk7XHJcbiAgICAgICAgdGhpcy5hZGQodGhpcy5zbGljZUJhd2FoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2NhbGVZID0gMTtcclxuICAgICAgICB0aGlzLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICAgICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICAgICAgdGFyZ2V0czogdGhpcyxcclxuICAgICAgICAgICAgc2NhbGVZOiAzLjAsXHJcbiAgICAgICAgICAgIC8vIGFscGhhOiAxLFxyXG4gICAgICAgICAgICAvLyB5b3lvOiB0cnVlLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWNlQXRhcy5hbmdsZSA9IDQ1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGljZUJhd2FoLmFuZ2xlID0gLTQ1O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBzY2FsZVk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVYOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFscGhhOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHlveW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFscGhhID0gMTtcclxuICAgICAgICAvL3RoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIC8vIHRoaXMuYWxwaGEgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpY2VFZmZlY3QgZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuSW1hZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHgsIHksIHRleHR1cmUsIGZyYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHgsIHksIHRleHR1cmUsIGZyYW1lKTtcclxuICAgICAgICBzY2VuZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY2FsZVkgPSAxO1xyXG4gICAgICAgIHRoaXMuc2NhbGVYID0gMTtcclxuICAgICAgICB0aGlzLmFscGhhID0gMTtcclxuICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICB0YXJnZXRzOiB0aGlzLFxyXG4gICAgICAgICAgICBzY2FsZVk6IDIuMCxcclxuICAgICAgICAgICAgLy8gYWxwaGE6IDEsXHJcbiAgICAgICAgICAgIC8vIHlveW86IHRydWUsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVZOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFscGhhOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHlveW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2YXRlU3BsYXNoKCl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNjYWxlWSA9IDE7XHJcbiAgICAgICAgdGhpcy5zY2FsZVggPSAxO1xyXG4gICAgICAgIHRoaXMuYWxwaGEgPSAxO1xyXG4gICAgICAgIHRoaXMuc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgIHRhcmdldHM6IHRoaXMsXHJcbiAgICAgICAgICAgIHNjYWxlWTogMS4zLFxyXG4gICAgICAgICAgICBzY2FsZVg6IDIuMyxcclxuICAgICAgICAgICAgLy8gYWxwaGE6IDAsXHJcbiAgICAgICAgICAgIC8vIHlveW86IHRydWUsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxwaGE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVZOiAxLjk1LFxyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlWDogMy40NSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB5b3lvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICAgICAgLy90aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICAvLyB0aGlzLmFscGhhID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBcclxufSIsImltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuLy9pbXBvcnQge0ZydWl0RmFjdG9yeX1cclxuXHJcbnZhciBjYW5TaG93Q2xhc3NpYyA9IHRydWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBTY2VuZTNEIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKHsga2V5OiAnTWFpblNjZW5lJyB9KVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIC8vdGhpcy5hY2Nlc3NUaGlyZERpbWVuc2lvbigpO1xyXG4gICAgdGhpcy5nYW1lV2lkdGggPSB0aGlzLmNhbWVyYXMubWFpbi53aWR0aDtcclxuICAgIHRoaXMuZ2FtZUhlaWdodCA9IHRoaXMuY2FtZXJhcy5tYWluLndpZHRoO1xyXG4gICAgdGhpcy5jYW1lcmFzLm1haW4uc2V0QmFja2dyb3VuZENvbG9yKCcjMDAwMDAwJyk7XHJcbiAgICB0aGlzLmZydXN0dW1TaXplQ2hhbmdlciA9IDY7XHJcblxyXG4gICAgY29uc3QgZnJ1c3R1bVNpemUgPSAxMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjsvLzc2OC8yID0gMzg0LCBmb3IgaGVpZ2h0LzIgc2l6ZVxyXG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5jYW1lcmFzLm1haW4ud2lkdGggLyB0aGlzLmNhbWVyYXMubWFpbi5oZWlnaHRcclxuICAgIHRoaXMuYWNjZXNzVGhpcmREaW1lbnNpb24oe1xyXG4gICAgICBjYW1lcmE6IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoKGZydXN0dW1TaXplICogYXNwZWN0KSAvIC0yLCAoZnJ1c3R1bVNpemUgKiBhc3BlY3QpIC8gMiwgZnJ1c3R1bVNpemUgLyAyLCBmcnVzdHVtU2l6ZSAvIC0yLDAuMSwxMDAwKSxcclxuICAgICAgZ3Jhdml0eTogeyB4OiAwLCB5OiAtMiwgejogMCB9XHJcbiAgICB9KVxyXG4gICAgdGhpcy50aW1lckNvbWJvID0gMDtcclxuICAgIHRoaXMuY29tYm9Db3VudCA9IDA7XHJcbiAgICAvLyB0aGlzLnRoaXJkLnJlbmRlcmVyLnNldENsZWFyQ29sb3JIZXgoIDB4MDAwMDAwLCAxICk7XHJcbiAgICAvL3RoaXMudGhpcmQuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvciggMHhmZjAwMDAgKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKXtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdkb2pvX3RleCcsICdhc3NldHMvdGV4dHVyZXMvRG9qb19CYXNpYy5wbmcnKTtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdmcnVpdHNfdGV4JywgJ2Fzc2V0cy90ZXh0dXJlcy9GcnVpdEF0bGFzLnBuZycpO1xyXG4gICAgdGhpcy50aGlyZC5sb2FkLnByZWxvYWQoJ2ZydWl0X3NoYWRvdycsICdhc3NldHMvdGV4dHVyZXMvRnJ1aXRfc2hhZG93LnBuZycpO1xyXG4gICAgdGhpcy50aGlyZC5sb2FkLnByZWxvYWQoJ2JvbWJfdGV4JywgJ2Fzc2V0cy90ZXh0dXJlcy9Cb21iUmVkQ3Jvc3MucG5nJyk7XHJcbiAgICB0aGlzLnRoaXJkLmxvYWQucHJlbG9hZCgnYm9tYl9yYXlfdGV4JywgJ2Fzc2V0cy9lZmZlY3RzL0JvbWJSYXkucG5nJyk7XHJcbiAgICB0aGlzLnRoaXJkLmxvYWQucHJlbG9hZCgnc3BsYXNoX3RleCcsICdhc3NldHMvdGV4dHVyZXMvc3BsYXQxMi5wbmcnKTtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdzcGxhc2gyX3RleCcsICdhc3NldHMvdGV4dHVyZXMvc3BsYXQxNC5wbmcnKTtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdzcGxhc2gzX3RleCcsICdhc3NldHMvdGV4dHVyZXMvc3BsYXQxMS5wbmcnKTtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdzcGxhc2g0X3RleCcsICdhc3NldHMvdGV4dHVyZXMvc3BsYXQxMy5wbmcnKTtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdGcnVpdFRyYWlsJywgJ2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvRnJ1aXRUcmFpbC5wbmcnKTtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdDcml0aWNhbFRyYWlsJywgJ2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvU3Rhci5wbmcnKTtcclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdCb21iVHJhaWwnLCAnYXNzZXRzL3RleHR1cmVzL3BhcnRpY2xlcy9TcGFyazAxLnBuZycpO1xyXG4gICAgdGhpcy50aGlyZC5sb2FkLnByZWxvYWQoJ0JvbWJTbW9rZScsICdhc3NldHMvdGV4dHVyZXMvcGFydGljbGVzL1Ntb2tlWWVsbG93LnBuZycpO1xyXG5cclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdTcGxhc2hTbGljZTEnLCAnYXNzZXRzL3RleHR1cmVzL1NwbGFzaFNsaWNlLnBuZycpO1xyXG4gICAgdGhpcy50aGlyZC5sb2FkLnByZWxvYWQoJ1NwbGFzaFNsaWNlMicsICdhc3NldHMvdGV4dHVyZXMvU3BsYXNoU2xpY2UyLnBuZycpO1xyXG5cclxuICAgIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdjbGFzc2ljX3JpbmdfdGV4JywgJ2Fzc2V0cy90ZXh0dXJlcy9GcnVpdFJpbmdDbGFzc2ljLnBuZycpO1xyXG4gICAgdGhpcy50aGlyZC5sb2FkLnByZWxvYWQoJ3NldHRpbmdzX3JpbmdfdGV4JywgJ2Fzc2V0cy90ZXh0dXJlcy9GcnVpdFJpbmdQdXJwbGUucG5nJyk7XHJcbiAgICB0aGlzLnRoaXJkLmxvYWQucHJlbG9hZCgnc2hhZG93X3JpbmdfdGV4JywgJ2Fzc2V0cy90ZXh0dXJlcy9GcnVpdFJpbmdTaGFkb3cucG5nJyk7XHJcblxyXG4gICAgdGhpcy50aGlyZC5sb2FkLnByZWxvYWQoJ3F1aXRfcmluZ190ZXgnLCAnYXNzZXRzL3RleHR1cmVzL0ZydWl0UmluZ1F1aXQucG5nJyk7XHJcbiAgICB0aGlzLnRoaXJkLmxvYWQucHJlbG9hZCgncmV0cnlfcmluZ190ZXgnLCAnYXNzZXRzL3RleHR1cmVzL0ZydWl0UmluZ1JldHJ5LnBuZycpO1xyXG4gICAgdGhpcy50aGlyZC5sb2FkLnByZWxvYWQoJ2JhY2tfcmluZ190ZXgnLCAnYXNzZXRzL3RleHR1cmVzL0ZydWl0UmluZ0JhY2sucG5nJyk7XHJcblxyXG5cclxuICAgIGNvbnN0IEZydWl0RmFjdG9yeSA9IHJlcXVpcmUoJy4vLi4vZ2FtZW9iamVjdHMvRnJ1aXRGYWN0b3J5LmpzJykuZGVmYXVsdDtcclxuICAgIHRoaXMuZnJ1aXRGYWN0b3J5ID0gbmV3IEZydWl0RmFjdG9yeSh0aGlzKTtcclxuICAgIC8vIHRoaXMudGhpcmQubG9hZC5wcmVsb2FkKCdsb2dvX3RleCcsICdhc3NldHMvdGV4dHVyZXMvTG9nb0xhcmdlLnBuZycpO1xyXG5cclxuICAgIC8vIHRoaXMucG9pbnRzID0gW107XHJcblxyXG4gICAgdGhpcy50ZXN0QmxhZGUgPSB0aGlzLmFkZC5jb250YWluZXIoMCwwKTtcclxuXHJcbiAgICB0aGlzLmdhbWVEYXRhID0ge3Njb3JlOiAwLGJlc3Q6IDB9O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSAtMjtcclxuICAgIHRoaXMuaGl0Qm9tYiA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdGFydExlZGFrYW4gPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NyZWRpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ob2xkQ2hlY2tVSSA9IGZhbHNlO1xyXG4gICAgdGhpcy5ob21lQW5pbWF0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5ob21lc2NyZWVuQmdtID0gdGhpcy5zb3VuZC5hZGQoJ011c2ljTWVudScse2xvb3A6MX0pO1xyXG4gICAgdGhpcy5nYW1lcGxheUJnbSA9IHRoaXMuc291bmQuYWRkKCdBbWJBcmVuYUNsYXNzaWNMUCcse2xvb3A6MX0pO1xyXG4gICAgdGhpcy5ob21lc2NyZWVuQmdtLnBsYXkoe2xvb3A6IDF9KTtcclxuXHJcbiAgICAvL1NFVFVQIElOUFVUXHJcbiAgICB0aGlzLmlucHV0Lm9uKFwicG9pbnRlcmRvd25cIiwgdGhpcy5PblBvaW50ZXJEb3duLCB0aGlzKTtcclxuICAgIHRoaXMuaW5wdXQub24oXCJwb2ludGVybW92ZVwiLCB0aGlzLk9uUG9pbnRlck1vdmUsIHRoaXMpO1xyXG4gICAgdGhpcy5pbnB1dC5vbihcInBvaW50ZXJ1cFwiLCB0aGlzLk9uUG9pbnRlclVwLCB0aGlzKTtcclxuXHJcbiAgICAvL1NFVFVQIFNDRU5FICsgQ0FNRVJBXHJcbiAgICB0aGlzLnRoaXJkLndhcnBTcGVlZCgnbGlnaHQnLCAnY2FtZXJhJywgJ3NreScpIFxyXG4gICAgdGhpcy50aGlyZC5jYW1lcmEucG9zaXRpb24uc2V0KDAsIDAsIDIwMClcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG4gICAgLy8gbGV0IGFycmJ1ZmZlciA9IHRoaXMuY2FjaGUuYmluYXJ5LmdldCgnV2F0ZXJtZWxvblRleHQnKTtcclxuICAgIC8vIGxldCB2aWV3QnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYXJyYnVmZmVyKTtcclxuICAgIC8vIGZvciAobGV0IGEgPSAwO2E8dmlld0J1ZmZlci5sZW5ndGg7YSsrKXtcclxuICAgIC8vICAgICB2aWV3QnVmZmVyW2FdIF49IDEyNztcclxuICAgIC8vIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKHZpZXdCdWZmZXIpO1xyXG4gICAgLy8gYXJyYnVmZmVyID0gdmlld0J1ZmZlci5idWZmZXI7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhhcnJidWZmZXIpO1xyXG4gICAgLy8gbGV0IHJlc1BhcnNlID0gdGhpcy50aGlyZC5sb2FkLmZieExvYWRlci5wYXJzZShhcnJidWZmZXIsJycpO1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3BhcnNlOiAnKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc1BhcnNlKTtcclxuXHJcbiAgICAvLyBsZXQgcmVzUGFyc2UyID0gdGhpcy50aGlyZC5sb2FkLmZieExvYWRlci5wYXJzZShhcnJidWZmZXIsJycpO1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3BhcnNlOiAnKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc1BhcnNlKTtcclxuICAgIC8vIHRoaXMud20xID0gcmVzUGFyc2U7XHJcbiAgICAvLyB0aGlzLndtMiA9IHJlc1BhcnNlMjtcclxuICAgXHJcbiAgIC8vQURKVVNUSU5HIExJR0hUU1xyXG4gICAgY29uc3QgaW50ZW5zaXR5ID0gMC4yO1xyXG4gICAgY29uc3QgaGVtaXNwaGVyZUxpZ2h0ID0gdGhpcy50aGlyZC5saWdodHMuaGVtaXNwaGVyZUxpZ2h0KHsgc2t5Q29sb3I6IDB4ZmZmZmZmLCBncm91bmRDb2xvcjogMHgwMDAwMDAsIGludGVuc2l0eSB9KTtcclxuICAgIGNvbnN0IGFtYmllbnRMaWdodCA9IHRoaXMudGhpcmQubGlnaHRzLmFtYmllbnRMaWdodCh7IGNvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5IH0pO1xyXG4gICAgY29uc3QgZGlyZWN0aW9uYWxMaWdodCA9IHRoaXMudGhpcmQubGlnaHRzLmRpcmVjdGlvbmFsTGlnaHQoeyBjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eSB9KTtcclxuICAgIGRpcmVjdGlvbmFsTGlnaHQucG9zaXRpb24uc2V0KDAsIDAsIDApO1xyXG4gICAgY29uc3QgZCA9IDEwO1xyXG4gICAgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IGQ7XHJcbiAgICBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLWQ7XHJcbiAgICBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC1kO1xyXG4gICAgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gZDtcclxuICAgIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93Lm1hcFNpemUuc2V0KDEwMjQsIDEwMjQpO1xyXG4gICAgLy8gdGhpcy5kaXJlY3Rpb25hbExpZ2h0ID0gbGlnaHRcclxuICAgIGNvbnN0IGxpZ2h0cyA9IHtcclxuICAgICAgICAvLyBhbWJpZW50TGlnaHRcclxuICAgICAgICBkaXJlY3Rpb25hbExpZ2h0XHJcbiAgICAgICAgLy8gaGVtaXNwaGVyZUxpZ2h0XHJcbiAgICB9O1xyXG4gICAgdGhpcy50aGlyZC5saWdodHMgPSBsaWdodHM7XHJcbiAgIC8vIHRoaXMudGhpcmQubGlnaHRzLmRpcmVjdGlvbmFsTGlnaHQuaW50ZW5zaXR5ID0gMDtcclxuICAgLy8gdGhpcy50aGlyZC5saWdodHMuYW1iaWVudExpZ2h0LmludGVuc2l0eSA9IDA7XHJcbiAgIC8vIHRoaXMudGhpcmQubGlnaHRzLmhlbWlzcGhlcmVMaWdodC5pbnRlbnNpdHkgPSAwO1xyXG4gICAvLyB0aGlzLnRoaXJkLmxpZ2h0cy5wb2ludExpZ2h0LmludGVuc2l0eSA9IDA7XHJcbiAgIC8vIHRoaXMudGhpcmQubGlnaHRzLnJlY3RBcmVhTGlnaHQuaW50ZW5zaXR5ID0gMDtcclxuICAgLy8gdGhpcy50aGlyZC5saWdodHMuc3BvdExpZ2h0LmludGVuc2l0eSA9IDA7XHJcbiAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgLy8gYXdhaXQgdGhpcy5mcnVpdEZhY3RvcnkubGV0TWVGaW5pc2goKTtcclxuXHJcbiAgIC8vQ1JFQVRFIEJBQ0tHUk9VTkQgRE9KT1xyXG4gICAgY29uc3QgdGV4dHVyZURvam8gPSBhd2FpdCB0aGlzLnRoaXJkLmxvYWQudGV4dHVyZSgnZG9qb190ZXgnKVxyXG4gICAgdGV4dHVyZURvam8ud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgdGV4dHVyZURvam8ud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogdGV4dHVyZURvam8gfSlcclxuICAgIGNvbnN0IHBsYW5lID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMjIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsMjIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIpLG1hdGVyaWFsKVxyXG4gICAgcGxhbmUucG9zaXRpb24ueiA9IC03MDBcclxuICAgIHRoaXMudGhpcmQuYWRkLmV4aXN0aW5nKHBsYW5lKVxyXG4gICAgLy89PT09PT09PT09XHJcblxyXG5cclxuICAgIGNvbnN0IEJsYWRlID0gcmVxdWlyZSgnLi8uLi9nYW1lb2JqZWN0cy9CbGFkZS5qcycpLmRlZmF1bHQ7XHJcbiAgICB0aGlzLmJsYWRlID0gbmV3IEJsYWRlKHRoaXMpO1xyXG4gICAgdGhpcy5zdGFydFRpbWVyID0gMC43NTtcclxuXHJcbiAgICAvLyBjb25zdCBCbGFkZSA9IHJlcXVpcmUoJy4vLi4vZ2FtZW9iamVjdHMvQmxhZGUuanMnKS5kZWZhdWx0O1xyXG4gICAgLy90aGlzLmJsYWRlID0gbmV3IEJsYWRlKHRoaXMsMzg0LDY0MCwnYmxhZGVfYmFzaWMnKTtcclxuICAgIC8vdGhpcy5ibGFkZSA9IHRoaXMuYWRkLmltYWdlKDM4NCw2NDAsJ2JsYWRlX2Jhc2ljJyk7XHJcbiAgICAvLyBhZGRzIGEgYm94XHJcbiAgICAvLyB0aGlzLnRoaXJkLmFkZC5ib3goeyB4OiAxLCB5OiAyIH0pXHJcblxyXG4gICAgLy8gYWRkcyBhIGJveCB3aXRoIHBoeXNpY3NcclxuICAgIC8vIHRoaXMudGhpcmQucGh5c2ljcy5hZGQuYm94KHsgeDogLTEsIHk6IDIgfSlcclxuXHJcbiAgICAvLyB0aHJvd3Mgc29tZSByYW5kb20gb2JqZWN0IG9uIHRoZSBzY2VuZVxyXG4gICAgLy8gdGhpcy50aGlyZC5oYXZlU29tZUZ1bigpXHJcblxyXG4gICAgLy9GUlVJVCBQT09MXHJcbiAgICAvLyB0aGlzLmZydWl0UG9vbCA9IFtdO1xyXG4gICAgLy8gZm9yKHZhciBpPTA7aTxmcnVpdExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAvLyAgIHRoaXMuZnJ1aXRQb29sLnB1c2goW10pO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29udExvYWQoKXtcclxuICAgIC8vIHRoaXMuZ2FtZVN0YXRlXHJcbiAgICAvLyBjb25zb2xlLmxvZygnYWFhJyk7XHJcbiAgICBhd2FpdCB0aGlzLnJlc3VtZUxvYWQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc3VtZUxvYWQoKXtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdiYmInKTtcclxuICAgIC8vQ1JFQVRFIFJJTkcgVUlcclxuXHJcbiAgICBjb25zdCBCdXR0b24gPSByZXF1aXJlKCcuLy4uL3V0aWxzL0J1dHRvbi5qcycpLmRlZmF1bHQ7XHJcblxyXG4gICAgY29uc3QgdGV4dHVyZVJpbmcgPSBhd2FpdCB0aGlzLnRoaXJkLmxvYWQudGV4dHVyZSgnY2xhc3NpY19yaW5nX3RleCcpXHJcbiAgICB0ZXh0dXJlUmluZy53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICB0ZXh0dXJlUmluZy53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICBjb25zdCBtYXRlcmlhbFJpbmcgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmVSaW5nIH0pXHJcbiAgICBtYXRlcmlhbFJpbmcudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgdGhpcy5wbGFuZVJpbmcgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSg1LjEyL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyLDUuMTIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIpLG1hdGVyaWFsUmluZylcclxuICAgIHRoaXMucGxhbmVSaW5nLnBvc2l0aW9uLnogPSAtNDk5O1xyXG4gICAgdGhpcy5wbGFuZVJpbmcucG9zaXRpb24ueSA9IC0yL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgdGhpcy50aGlyZC5hZGQuZXhpc3RpbmcodGhpcy5wbGFuZVJpbmcpXHJcbiAgICB0aGlzLnBsYW5lUmluZy5hbmdsZSA9IDA7XHJcblxyXG4gICAgdGhpcy5wbGFuZVJpbmcuc2NhbGUueCA9IDA7XHJcbiAgICB0aGlzLnBsYW5lUmluZy5zY2FsZS55ID0gMDtcclxuICAgIHRoaXMucGxhbmVSaW5nLnNjYWxlLnogPSAwO1xyXG4gICAgbGV0IHRtcCA9IHRoaXMucGxhbmVSaW5nO1xyXG4gICAgdGhpcy50d2VlbnMuYWRkKFxyXG4gICAge1xyXG4gICAgICAgICAgdGFyZ2V0czogdG1wLFxyXG4gICAgICAgICAgYW5nbGU6IDM2MCxcclxuICAgICAgICAgIGxvb3A6IC0xLFxyXG4gICAgICAgICAgLy8geTogJy09MC41JyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwMCxcclxuICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRtcC5hbmdsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbmVSaW5nLnJvdGF0aW9uLnogPSB0bXAuYW5nbGUvMTgwKk1hdGguUEk7XHJcbiAgICAgICAgICAgIC8vIGZydWl0LnNwbGFzaC5wb3NpdGlvbi5zZXQodG1wLngsIHRtcC55LCB0bXAueilcclxuICAgICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBjb25zdCB0ZXh0dXJlU2hhZG93UmluZyA9IGF3YWl0IHRoaXMudGhpcmQubG9hZC50ZXh0dXJlKCdzaGFkb3dfcmluZ190ZXgnKVxyXG4gICAgdGV4dHVyZVNoYWRvd1Jpbmcud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgdGV4dHVyZVNoYWRvd1Jpbmcud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgY29uc3QgbWF0ZXJpYWxTaGFkb3dSaW5nID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlU2hhZG93UmluZyB9KVxyXG4gICAgbWF0ZXJpYWxTaGFkb3dSaW5nLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoNS4xMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciw1LjEyL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyKSxtYXRlcmlhbFNoYWRvd1JpbmcpXHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZy5wb3NpdGlvbi56ID0gLTUwMDtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nLnBvc2l0aW9uLnggPSAoMC4yKS90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nLnBvc2l0aW9uLnkgPSAoLTAuMi0yKS90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgIHRoaXMudGhpcmQuYWRkLmV4aXN0aW5nKHRoaXMucGxhbmVTaGFkb3dSaW5nKVxyXG5cclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nLnNjYWxlLnggPSAwO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1Jpbmcuc2NhbGUueSA9IDA7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZy5zY2FsZS56ID0gMDtcclxuXHJcbiAgICAvL0NSRUFURSBSSU5HIFNldHRpbmdzXHJcbiAgICBjb25zdCB0ZXh0dXJlUmluZ1NldHRpbmdzID0gYXdhaXQgdGhpcy50aGlyZC5sb2FkLnRleHR1cmUoJ3NldHRpbmdzX3JpbmdfdGV4JylcclxuICAgIHRleHR1cmVSaW5nU2V0dGluZ3Mud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgdGV4dHVyZVJpbmdTZXR0aW5ncy53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICBjb25zdCBtYXRlcmlhbFJpbmdTZXR0aW5ncyA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IG1hcDogdGV4dHVyZVJpbmdTZXR0aW5ncyB9KVxyXG4gICAgbWF0ZXJpYWxSaW5nU2V0dGluZ3MudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgdGhpcy5wbGFuZVJpbmdTZXR0aW5ncyA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDQuMTIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsNC4xMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciksbWF0ZXJpYWxSaW5nU2V0dGluZ3MpXHJcbiAgICB0aGlzLnBsYW5lUmluZ1NldHRpbmdzLnBvc2l0aW9uLnogPSAtNDk5O1xyXG4gICAgdGhpcy5wbGFuZVJpbmdTZXR0aW5ncy5wb3NpdGlvbi55ID0gMDtcclxuICAgIHRoaXMucGxhbmVSaW5nU2V0dGluZ3MucG9zaXRpb24ueCA9IDUuNS90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgIHRoaXMudGhpcmQuYWRkLmV4aXN0aW5nKHRoaXMucGxhbmVSaW5nU2V0dGluZ3MpXHJcbiAgICB0aGlzLnBsYW5lUmluZ1NldHRpbmdzLmFuZ2xlID0gMDtcclxuICAgIGxldCB0bXBTZXR0aW5ncyA9IHRoaXMucGxhbmVSaW5nU2V0dGluZ3M7XHJcbiAgICB0aGlzLnR3ZWVucy5hZGQoXHJcbiAgICB7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0bXBTZXR0aW5ncyxcclxuICAgICAgICAgIGFuZ2xlOiAzNjAsXHJcbiAgICAgICAgICBsb29wOiAtMSxcclxuICAgICAgICAgIC8vIHk6ICctPTAuNScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMDAsXHJcbiAgICAgICAgICBvblVwZGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0bXAuYW5nbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYW5lUmluZ1NldHRpbmdzLnJvdGF0aW9uLnogPSB0bXBTZXR0aW5ncy5hbmdsZS8xODAqTWF0aC5QSTtcclxuICAgICAgICAgICAgLy8gZnJ1aXQuc3BsYXNoLnBvc2l0aW9uLnNldCh0bXAueCwgdG1wLnksIHRtcC56KVxyXG4gICAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdTZXR0aW5ncyA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDQuMTIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsNC4xMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciksbWF0ZXJpYWxTaGFkb3dSaW5nKVxyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdTZXR0aW5ncy5wb3NpdGlvbi56ID0gLTUwMDtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nU2V0dGluZ3MucG9zaXRpb24ueCA9ICgwLjIrNS41KS90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nU2V0dGluZ3MucG9zaXRpb24ueSA9ICgtMC4yKS90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgIHRoaXMudGhpcmQuYWRkLmV4aXN0aW5nKHRoaXMucGxhbmVTaGFkb3dSaW5nU2V0dGluZ3MpXHJcblxyXG4gICAgdGhpcy5wbGFuZVJpbmdTZXR0aW5ncy5zY2FsZS54ID0gMDtcclxuICAgIHRoaXMucGxhbmVSaW5nU2V0dGluZ3Muc2NhbGUueSA9IDA7XHJcbiAgICB0aGlzLnBsYW5lUmluZ1NldHRpbmdzLnNjYWxlLnogPSAwO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdTZXR0aW5ncy5zY2FsZS54ID0gMDtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nU2V0dGluZ3Muc2NhbGUueSA9IDA7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZ1NldHRpbmdzLnNjYWxlLnogPSAwO1xyXG5cclxuICAgIC8vIHRoaXMucGxhbmVSaW5nU2V0dGluZ3MudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgLy8gdGhpcy5wbGFuZVNoYWRvd1JpbmdTZXR0aW5ncy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy9DUkVBVEUgTE9HT1xyXG4gICAgLy8gY29uc3QgdGV4dHVyZUxvZ28gPSBhd2FpdCB0aGlzLnRoaXJkLmxvYWQudGV4dHVyZSgnbG9nb190ZXgnKVxyXG4gICAgLy8gdGV4dHVyZUxvZ28ud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgLy8gdGV4dHVyZUxvZ28ud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgLy8gY29uc3QgbWF0ZXJpYWxMb2dvID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlTG9nbyB9KVxyXG4gICAgLy8gbWF0ZXJpYWxMb2dvLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgIC8vIHRoaXMucGxhbmVMb2dvID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTAuMjQsMi41NiksbWF0ZXJpYWxMb2dvKVxyXG4gICAgLy8gdGhpcy5wbGFuZUxvZ28ucG9zaXRpb24ueiA9IC00OTg7XHJcbiAgICAvLyB0aGlzLnBsYW5lTG9nby5wb3NpdGlvbi55ID0gNDtcclxuICAgIC8vIHRoaXMudGhpcmQuYWRkLmV4aXN0aW5nKHRoaXMucGxhbmVMb2dvKVxyXG4gICAgbGV0IGJsYWNrQXJlYSA9IHRoaXMuYWRkLmltYWdlKDAsMCwnYmxhY2tBcmVhZm9yVGl0bGUnKTtcclxuICAgIGJsYWNrQXJlYS5hbHBoYSA9IDAuNjtcclxuICAgIGJsYWNrQXJlYS5zZXRPcmlnaW4oMCwwKTtcclxuICAgIGxldCBsb2dvRnJ1aXQgPSB0aGlzLmFkZC5pbWFnZSgtMTAsNDAsJ0xvZ29GcnVpdCcpO1xyXG4gICAgbG9nb0ZydWl0LnNldE9yaWdpbigwLDApO1xyXG5cclxuICAgIGxldCBsb2dvTmluamEgPSB0aGlzLmFkZC5pbWFnZShsb2dvRnJ1aXQud2lkdGgtMjAsMzArbG9nb0ZydWl0LmhlaWdodCwnTG9nb05pbmphJyk7XHJcbiAgICBsb2dvTmluamEuc2V0T3JpZ2luKDAsMSk7XHJcbiAgICBsb2dvTmluamEuc2V0U2NhbGUoMC43LDAuNyk7XHJcbiAgICBsb2dvTmluamEuYW5nbGUgPSAwO1xyXG5cclxuICAgIGxldCBjb250Qm9hcmRTbGljZSA9IHRoaXMuYWRkLmNvbnRhaW5lcigxNTAsYmxhY2tBcmVhLmhlaWdodC0xMCk7XHJcblxyXG4gICAgbGV0IHNjcm9sbExvY2tCb2FyZCA9IHRoaXMuYWRkLmltYWdlKDAsMCwnU2Nyb2xsTG9ja0JvYXJkJyk7XHJcbiAgICBzY3JvbGxMb2NrQm9hcmQuc2V0U2NhbGUoMC42LDAuNik7XHJcbiAgICBzY3JvbGxMb2NrQm9hcmQuc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG5cclxuICAgIGxldCB0ZXh0U2xpY2UgPSB0aGlzLmFkZC50ZXh0KDAsIC0yLCBcIlRhcCBGcnVpdFxcbnRvIGJlZ2luXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAzMCwgY29sb3I6ICcjNUUzQzBEJywgYWxpZ246ICdjZW50ZXInIH0pO1xyXG4gICAgdGV4dFNsaWNlLnNldE9yaWdpbigwLjUsMC41KTtcclxuXHJcbiAgICBjb250Qm9hcmRTbGljZS5hZGQoc2Nyb2xsTG9ja0JvYXJkKTtcclxuICAgIGNvbnRCb2FyZFNsaWNlLmFkZCh0ZXh0U2xpY2UpO1xyXG4gICAgY29udEJvYXJkU2xpY2UuYW5nbGUgPSAtODtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbkNsYXNzaWMgPSBuZXcgQnV0dG9uKHRoaXMsNjQxLDUxMywnQnV0dG9uQ2xhc3NpYycpO1xyXG4gICAgXHJcbiAgICB0aGlzLmJ1dHRvbkNsYXNzaWMub24oJ3BvaW50ZXJ1cCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMuYmxhZGUuY2hhbmdlQ2xpY2tlZEhvbWVDbGFzc2ljKHRydWUpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b25DbGFzc2ljLnZpc2libGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgdGhpcy5idXR0b25TZXR0aW5nID0gbmV3IEJ1dHRvbih0aGlzLDk5MiwzODUsJ01lZGl1bUJ1dHRvbicpO1xyXG4gICAgXHJcbiAgICB0aGlzLmJ1dHRvblNldHRpbmcub24oJ3BvaW50ZXJ1cCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMuYmxhZGUuY2hhbmdlQ2xpY2tlZEhvbWVTZXR0aW5nKHRydWUpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b25TZXR0aW5nLnZpc2libGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgdGhpcy5idXR0b25CYWNrID0gbmV3IEJ1dHRvbih0aGlzLDExMjAsNjA3LCdTbWFsbEJ1dHRvbicpO1xyXG4gICAgXHJcbiAgICB0aGlzLmJ1dHRvbkJhY2sub24oJ3BvaW50ZXJ1cCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMuYmxhZGUuY2hhbmdlQ2xpY2tlZFNldHRpbmdCYWNrKHRydWUpO1xyXG4gICAgICB0aGlzLmJ1dHRvbkJhY2sudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b25CYWNrLnZpc2libGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgdGhpcy5idXR0b25RdWl0ID0gbmV3IEJ1dHRvbih0aGlzLDgzMiw2MDcsJ01lZGl1bVNtYWxsQnV0dG9uJyk7XHJcbiAgICBcclxuICAgIHRoaXMuYnV0dG9uUXVpdC5vbigncG9pbnRlcnVwJywgZnVuY3Rpb24oKXtcclxuICAgICAgdGhpcy5ibGFkZS5jaGFuZ2VDbGlja2VkUmVzdWx0UXVpdCh0cnVlKTtcclxuICAgICAgdGhpcy5idXR0b25RdWl0LnZpc2libGUgPSBmYWxzZTtcclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uUXVpdC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG5cclxuICAgIHRoaXMuYnV0dG9uUmV0cnkgPSBuZXcgQnV0dG9uKHRoaXMsNDUwLDYwNywnTWVkaXVtU21hbGxCdXR0b24nKTtcclxuICAgIFxyXG4gICAgdGhpcy5idXR0b25SZXRyeS5vbigncG9pbnRlcnVwJywgZnVuY3Rpb24oKXtcclxuICAgICAgdGhpcy5ibGFkZS5jaGFuZ2VDbGlja2VkUmVzdWx0UmV0cnkodHJ1ZSk7XHJcbiAgICAgIHRoaXMuYnV0dG9uUmV0cnkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmJ1dHRvblF1aXQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b25SZXRyeS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50b3BIb21lc2NyZWVuID0gdGhpcy5hZGQuY29udGFpbmVyKDAsLTUwMCk7XHJcbiAgICB0aGlzLnRvcEhvbWVzY3JlZW4uYWRkKGJsYWNrQXJlYSk7XHJcbiAgICB0aGlzLnRvcEhvbWVzY3JlZW4uYWRkKGxvZ29GcnVpdCk7XHJcbiAgICB0aGlzLnRvcEhvbWVzY3JlZW4uYWRkKGxvZ29OaW5qYSk7XHJcbiAgICB0aGlzLnRvcEhvbWVzY3JlZW4uYWRkKGNvbnRCb2FyZFNsaWNlKTtcclxuXHJcblxyXG4gICAgLy9zY3JvbGxMb2NrQm9hcmQuYW5nbGUgPSAtOFxyXG5cclxuICAgIC8vVEVYVCBSRUFEWVxyXG4gICAgLy8gdGhpcy50ZXh0UmVhZHkgPSB0aGlzLmFkZC50ZXh0KDQyMCwgMzEwLCBcIlJlYWR5XCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAxNTAgfSk7XHJcbiAgICB0aGlzLnRleHRSZWFkeSA9IHRoaXMuYWRkLnRleHQoNDIwLCA1NjAsIFwiUmVhZHlcIiwgeyBmb250RmFtaWx5OiBcImdhbmdvZmNoaW5lc2VcIiwgZm9udFNpemU6IDE1MCB9KTtcclxuICAgIHRoaXMudGV4dFJlYWR5LnNldFN0cm9rZSgnIzhBNEYwMCcsIDE2KTtcclxuICAgIGxldCBncmFkaWVudCA9IHRoaXMudGV4dFJlYWR5LmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0UmVhZHkuaGVpZ2h0KTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0ZGRjIxMCcpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRERBMDExJyk7XHJcbiAgICB0aGlzLnRleHRSZWFkeS5zZXRGaWxsKGdyYWRpZW50KTtcclxuICAgIHRoaXMudGV4dFJlYWR5LmFscGhhID0gMDtcclxuXHJcbiAgICAvL1RFWFQgR09cclxuICAgIC8vIHRoaXMudGV4dEdvID0gdGhpcy5hZGQudGV4dCg0OTAsIDQ2MCwgXCJHTyEhXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAxNTAgfSk7XHJcbiAgICB0aGlzLnRleHRHbyA9IHRoaXMuYWRkLnRleHQoNDkwLCA1NjAsIFwiR08hIVwiLCB7IGZvbnRGYW1pbHk6IFwiZ2FuZ29mY2hpbmVzZVwiLCBmb250U2l6ZTogMTUwIH0pO1xyXG4gICAgdGhpcy50ZXh0R28uc2V0U3Ryb2tlKCcjMTgzOTMwJywgMTYpO1xyXG4gICAgZ3JhZGllbnQgPSB0aGlzLnRleHRSZWFkeS5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIHRoaXMudGV4dEdvLmhlaWdodCk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyM5Q0U0MUQnKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAnIzY5Q0UyMScpO1xyXG4gICAgdGhpcy50ZXh0R28uc2V0RmlsbChncmFkaWVudCk7XHJcbiAgICB0aGlzLnRleHRHby5hbHBoYSA9IDA7XHJcblxyXG4gICAgdGhpcy50ZXh0UmVhZHkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy50ZXh0R28udmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vR0FNRVBMQVkgVUlcclxuICAgIHRoaXMuY29udEdhbWVwbGF5VUkgPSB0aGlzLmFkZC5jb250YWluZXIoMCwwKTtcclxuICAgIHRoaXMuaWNvblNjb3JlID0gdGhpcy5hZGQuaW1hZ2UoMTArNTEsMTArNTEsJ0hVRFdhdGVybWVsb24nKTtcclxuICAgIHRoaXMuaWNvblNjb3JlLnNldFNjYWxlKDAuNCwwLjQpO1xyXG4gICAgdGhpcy5pY29uU2NvcmUuc2V0T3JpZ2luKDAuNSwwLjUpO1xyXG4gICAgdGhpcy5jb250R2FtZXBsYXlVSS5hZGQodGhpcy5pY29uU2NvcmUpO1xyXG5cclxuICAgIHRoaXMudGV4dFNjb3JlID0gdGhpcy5hZGQudGV4dCgxMTAsIDAsIFwiMFwiLCB7IGZvbnRGYW1pbHk6IFwiZ2FuZ29mY2hpbmVzZVwiLCBmb250U2l6ZTogMTA1IH0pO1xyXG4gICAgdGhpcy50ZXh0U2NvcmUuc2V0U3Ryb2tlKCcjNjMzNzAwJywgOCk7XHJcbiAgICBncmFkaWVudCA9IHRoaXMudGV4dFNjb3JlLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0U2NvcmUuaGVpZ2h0KTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0ZFRjY1QycpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRUI4RDExJyk7XHJcbiAgICB0aGlzLnRleHRTY29yZS5zZXRGaWxsKGdyYWRpZW50KTtcclxuICAgIHRoaXMuY29udEdhbWVwbGF5VUkuYWRkKHRoaXMudGV4dFNjb3JlKTtcclxuXHJcbiAgICB0aGlzLnRleHRCZXN0ID0gdGhpcy5hZGQudGV4dCgyNSwgMTEwLCBcIkJlc3Q6IDBcIiwgeyBmb250RmFtaWx5OiBcImdhbmdvZmNoaW5lc2VcIiwgZm9udFNpemU6IDM1IH0pO1xyXG4gICAgdGhpcy50ZXh0QmVzdC5zZXRTdHJva2UoJyMzRTE0MDAnLCA4KTtcclxuICAgIGdyYWRpZW50ID0gdGhpcy50ZXh0QmVzdC5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIHRoaXMudGV4dEJlc3QuaGVpZ2h0KTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0ZDQTIxRScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjREY3MjAwJyk7XHJcbiAgICB0aGlzLnRleHRCZXN0LnNldEZpbGwoZ3JhZGllbnQpO1xyXG4gICAgdGhpcy5jb250R2FtZXBsYXlVSS5hZGQodGhpcy50ZXh0QmVzdCk7XHJcblxyXG4gICAgdGhpcy50ZXh0QmVzdEdyZWVuID0gdGhpcy5hZGQudGV4dCgyNSwgMTEwLCBcIkJlc3Q6IDBcIiwgeyBmb250RmFtaWx5OiBcImdhbmdvZmNoaW5lc2VcIiwgZm9udFNpemU6IDM1IH0pO1xyXG4gICAgdGhpcy50ZXh0QmVzdEdyZWVuLnNldFN0cm9rZSgnIzFGNDIwMScsIDgpO1xyXG4gICAgZ3JhZGllbnQgPSB0aGlzLnRleHRCZXN0LmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0QmVzdC5oZWlnaHQpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjMTVGMjFEJyk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJyMxN0FEMEUnKTtcclxuICAgIHRoaXMudGV4dEJlc3RHcmVlbi5zZXRGaWxsKGdyYWRpZW50KTtcclxuICAgIHRoaXMuY29udEdhbWVwbGF5VUkuYWRkKHRoaXMudGV4dEJlc3RHcmVlbik7XHJcbiAgICBcclxuXHJcblxyXG4gICAgdGhpcy5jcm9zczMgPSB0aGlzLmFkZC5pbWFnZSgxMjgwLDEwLCdDcm9zc0JsdWUnKTtcclxuICAgIHRoaXMuY3Jvc3MzLnNldE9yaWdpbigxLDApO1xyXG4gICAgdGhpcy5jcm9zczMuc2V0U2NhbGUoMC44MzU5Mzc1LDAuODM1OTM3NSk7XHJcblxyXG4gICAgdGhpcy5jcm9zczIgPSB0aGlzLmFkZC5pbWFnZSgxMTcwLDEwLCdDcm9zc0JsdWUnKTtcclxuICAgIHRoaXMuY3Jvc3MyLnNldE9yaWdpbigxLDApO1xyXG4gICAgdGhpcy5jcm9zczIuc2V0U2NhbGUoMC43MTA5Mzc1LDAuNzEwOTM3NSk7XHJcblxyXG4gICAgdGhpcy5jcm9zczEgPSB0aGlzLmFkZC5pbWFnZSgxMDc2LDEwLCdDcm9zc0JsdWUnKTtcclxuICAgIHRoaXMuY3Jvc3MxLnNldE9yaWdpbigxLDApO1xyXG4gICAgdGhpcy5jcm9zczEuc2V0U2NhbGUoMC41ODU5Mzc1LDAuNTg1OTM3NSk7XHJcblxyXG4gICAgdGhpcy5jb250R2FtZXBsYXlVSS5hZGQodGhpcy5jcm9zczEpO1xyXG4gICAgdGhpcy5jb250R2FtZXBsYXlVSS5hZGQodGhpcy5jcm9zczIpO1xyXG4gICAgdGhpcy5jb250R2FtZXBsYXlVSS5hZGQodGhpcy5jcm9zczMpO1xyXG5cclxuICAgIHRoaXMuY29udEdhbWVwbGF5VUkueSA9IC0yMDA7XHJcblxyXG4gICAgXHJcbiAgICB0aGlzLmNyb3NzTGlzdCA9IFt0aGlzLmNyb3NzMSx0aGlzLmNyb3NzMix0aGlzLmNyb3NzM107XHJcbiAgICB0aGlzLmNyb3NzRnJ1aXRQb29sID0gW107XHJcbiAgICB0aGlzLnJlc2V0R2FtZXBsYXkoKTtcclxuXHJcblxyXG4gICAgdGhpcy5pbml0UmVzdWx0U2NyZWVuKCk7XHJcbiAgICAvL0NSRUFURSBSSU5HIFJFU1VMVFxyXG4gICAgY29uc3QgdGV4dHVyZVJpbmdQQSA9IGF3YWl0IHRoaXMudGhpcmQubG9hZC50ZXh0dXJlKCdyZXRyeV9yaW5nX3RleCcpXHJcbiAgICB0ZXh0dXJlUmluZ1BBLndyYXBTID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcclxuICAgIHRleHR1cmVSaW5nUEEud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgY29uc3QgbWF0ZXJpYWxSaW5nUEEgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmVSaW5nUEEgfSlcclxuICAgIG1hdGVyaWFsUmluZ1BBLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMucGxhbmVSaW5nUEEgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgzLjYyL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyLDMuNjIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIpLG1hdGVyaWFsUmluZ1BBKVxyXG4gICAgdGhpcy5wbGFuZVJpbmdQQS5wb3NpdGlvbi56ID0gLTQ5OTtcclxuICAgIHRoaXMucGxhbmVSaW5nUEEucG9zaXRpb24ueSA9IC0zLjUvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXI7XHJcbiAgICB0aGlzLnBsYW5lUmluZ1BBLnBvc2l0aW9uLnggPSAtMy90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgIHRoaXMudGhpcmQuYWRkLmV4aXN0aW5nKHRoaXMucGxhbmVSaW5nUEEpXHJcbiAgICB0aGlzLnBsYW5lUmluZ1BBLmFuZ2xlID0gMDtcclxuICAgIHRoaXMucGxhbmVSaW5nUEEuc2NhbGUueCA9IDA7XHJcbiAgICB0aGlzLnBsYW5lUmluZ1BBLnNjYWxlLnkgPSAwO1xyXG4gICAgdGhpcy5wbGFuZVJpbmdQQS5zY2FsZS56ID0gMDtcclxuICAgIGxldCB0bXBQQSA9IHRoaXMucGxhbmVSaW5nUEE7XHJcbiAgICB0aGlzLnR3ZWVucy5hZGQoXHJcbiAgICB7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0bXBQQSxcclxuICAgICAgICAgIGFuZ2xlOiAzNjAsXHJcbiAgICAgICAgICBsb29wOiAtMSxcclxuICAgICAgICAgIC8vIHk6ICctPTAuNScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMDAsXHJcbiAgICAgICAgICBvblVwZGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0bXAuYW5nbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYW5lUmluZ1BBLnJvdGF0aW9uLnogPSB0bXBQQS5hbmdsZS8xODAqTWF0aC5QSTtcclxuICAgICAgICAgICAgLy8gZnJ1aXQuc3BsYXNoLnBvc2l0aW9uLnNldCh0bXAueCwgdG1wLnksIHRtcC56KVxyXG4gICAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdQQSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDMuNjIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsMy42Mi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciksbWF0ZXJpYWxTaGFkb3dSaW5nKVxyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdQQS5wb3NpdGlvbi56ID0gLTUwMDtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nUEEucG9zaXRpb24ueCA9ICgwLjItMykvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXI7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZ1BBLnBvc2l0aW9uLnkgPSAoLTAuMi0zLjUpL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgdGhpcy50aGlyZC5hZGQuZXhpc3RpbmcodGhpcy5wbGFuZVNoYWRvd1JpbmdQQSlcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nUEEuc2NhbGUueCA9IDA7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZ1BBLnNjYWxlLnkgPSAwO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdQQS5zY2FsZS56ID0gMDtcclxuXHJcbiAgICB0aGlzLnBsYW5lUmluZ1BBLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nUEEudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vQ1JFQVRFIFJJTkcgUVVJVFxyXG4gICAgY29uc3QgdGV4dHVyZVJpbmdRdWl0ID0gYXdhaXQgdGhpcy50aGlyZC5sb2FkLnRleHR1cmUoJ3F1aXRfcmluZ190ZXgnKVxyXG4gICAgdGV4dHVyZVJpbmdRdWl0LndyYXBTID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcclxuICAgIHRleHR1cmVSaW5nUXVpdC53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICBjb25zdCBtYXRlcmlhbFJpbmdRdWl0ID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlUmluZ1F1aXQgfSlcclxuICAgIG1hdGVyaWFsUmluZ1F1aXQudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgdGhpcy5wbGFuZVJpbmdRdWl0ID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMy42Mi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciwzLjYyL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyKSxtYXRlcmlhbFJpbmdRdWl0KVxyXG4gICAgdGhpcy5wbGFuZVJpbmdRdWl0LnBvc2l0aW9uLnogPSAtNDk5O1xyXG4gICAgdGhpcy5wbGFuZVJpbmdRdWl0LnBvc2l0aW9uLnkgPSAtMy41L3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgdGhpcy5wbGFuZVJpbmdRdWl0LnBvc2l0aW9uLnggPSAzL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgdGhpcy50aGlyZC5hZGQuZXhpc3RpbmcodGhpcy5wbGFuZVJpbmdRdWl0KVxyXG4gICAgdGhpcy5wbGFuZVJpbmdRdWl0LmFuZ2xlID0gMDtcclxuICAgIHRoaXMucGxhbmVSaW5nUXVpdC5zY2FsZS54ID0gMDtcclxuICAgIHRoaXMucGxhbmVSaW5nUXVpdC5zY2FsZS55ID0gMDtcclxuICAgIHRoaXMucGxhbmVSaW5nUXVpdC5zY2FsZS56ID0gMDtcclxuICAgIGxldCB0bXBRdWl0ID0gdGhpcy5wbGFuZVJpbmdRdWl0O1xyXG4gICAgdGhpcy50d2VlbnMuYWRkKFxyXG4gICAge1xyXG4gICAgICAgICAgdGFyZ2V0czogdG1wUXVpdCxcclxuICAgICAgICAgIGFuZ2xlOiAzNjAsXHJcbiAgICAgICAgICBsb29wOiAtMSxcclxuICAgICAgICAgIC8vIHk6ICctPTAuNScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMDAsXHJcbiAgICAgICAgICBvblVwZGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0bXAuYW5nbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYW5lUmluZ1F1aXQucm90YXRpb24ueiA9IHRtcFF1aXQuYW5nbGUvMTgwKk1hdGguUEk7XHJcbiAgICAgICAgICAgIC8vIGZydWl0LnNwbGFzaC5wb3NpdGlvbi5zZXQodG1wLngsIHRtcC55LCB0bXAueilcclxuICAgICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nUXVpdCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDMuNjIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsMy42Mi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciksbWF0ZXJpYWxTaGFkb3dSaW5nKVxyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdRdWl0LnBvc2l0aW9uLnogPSAtNTAwO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdRdWl0LnBvc2l0aW9uLnggPSAoMC4yKzMpL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdRdWl0LnBvc2l0aW9uLnkgPSAoLTAuMi0zLjUpL3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgdGhpcy50aGlyZC5hZGQuZXhpc3RpbmcodGhpcy5wbGFuZVNoYWRvd1JpbmdRdWl0KVxyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdRdWl0LnNjYWxlLnggPSAwO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdRdWl0LnNjYWxlLnkgPSAwO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdRdWl0LnNjYWxlLnogPSAwO1xyXG5cclxuICAgIHRoaXMucGxhbmVSaW5nUXVpdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZ1F1aXQudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudGV4dEdhbWVvdmVyID0gdGhpcy5hZGQuaW1hZ2UoNjQwLDM4NCwnR09UZXh0Jyk7XHJcbiAgICB0aGlzLnRleHRHYW1lb3Zlci5zZXRPcmlnaW4oMC41LDAuNSk7XHJcbiAgICAvLyB0aGlzLnRleHRHYW1lb3ZlciA9IHRoaXMuYWRkLnRleHQoNjQwLCAzODQsIFwiR2FtZSBvdmVyXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAxNTAgfSk7XHJcbiAgICAvLyB0aGlzLnRleHRHYW1lb3Zlci5zZXRTdHJva2UoJyMwMDAwMDAnLCAyKTtcclxuICAgIC8vIGdyYWRpZW50ID0gdGhpcy50ZXh0UmVhZHkuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnRleHRHYW1lb3Zlci5oZWlnaHQpO1xyXG4gICAgLy8gZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjRTUxRjFEJyk7XHJcbiAgICAvLyBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAnI0YwMzczNicpO1xyXG4gICAgLy8gZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNSwgJyNFMDFDMUUnKTtcclxuICAgIC8vIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAnI0EzMEYwQicpO1xyXG4gICAgLy8gdGhpcy50ZXh0R2FtZW92ZXIuc2V0RmlsbChncmFkaWVudCk7XHJcbiAgICAvLyB0aGlzLnRleHRHYW1lb3Zlci5zZXRPcmlnaW4oMC41LDAuNSk7XHJcbiAgICB0aGlzLnRleHRHYW1lb3Zlci5zZXRTY2FsZSgwLDApO1xyXG4gICAgdGhpcy50ZXh0R2FtZW92ZXIudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZ2xvd0xlZGFrYW4gPSB0aGlzLmFkZC5pbWFnZSg2NDAsMzg0LCdHbG93Jyk7XHJcbiAgICB0aGlzLmdsb3dMZWRha2FuLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAvL0xFVkVMIERFU0lHTlxyXG4gICAgdGhpcy53YXZlTGlzdCA9IFtcclxuICAgICAge2lkOjEsbWluV2F2ZTowLGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjEsZHRTY2FsZTowLjksZHRTY2FsZUluY3JlYXNlOjAsZnJ1aXRDaGFuY2U6W3tmcnVpdHM6WydXYXRlcm1lbG9uJ10sbWluOjEsbWF4OjEsYmV0d2VlbjowfV19LFxyXG4gICAgICB7aWQ6MixtaW5XYXZlOjEsY2hhbmNlOjkwLGNoYW5jZVJlZ3Jvd3RoOjAuMzMsZGVsYXk6MSxkdFNjYWxlOjAuOSxkdFNjYWxlSW5jcmVhc2U6MCxmcnVpdENoYW5jZTpbe2ZydWl0czpbJ1InXSxtaW46MSxtYXg6MSxiZXR3ZWVuOjB9XX0sXHJcbiAgICAgIHtpZDozLG1pbldhdmU6MixjaGFuY2U6OTAsY2hhbmNlUmVncm93dGg6MC4zMyxkZWxheToxLGR0U2NhbGU6MC45LGR0U2NhbGVJbmNyZWFzZTowLGZydWl0Q2hhbmNlOlt7ZnJ1aXRzOlsnUiddLG1pbjoyLG1heDozLGJldHdlZW46MH1dfSxcclxuICAgICAge2lkOjQsbWluV2F2ZTo0LGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjAuOCxkdFNjYWxlOjAuOSxkdFNjYWxlSW5jcmVhc2U6MCxmcnVpdENoYW5jZTpbe2ZydWl0czpbJ0JvbWInXSxtaW46MSxtYXg6MixiZXR3ZWVuOjB9XX0sXHJcbiAgICAgIHtpZDo1LG1pbldhdmU6NSxjaGFuY2U6OTAsY2hhbmNlUmVncm93dGg6MC4zMyxkZWxheTowLjgsZHRTY2FsZTowLjksZHRTY2FsZUluY3JlYXNlOjAsZnJ1aXRDaGFuY2U6W3tmcnVpdHM6WydCb21iJ10sbWluOjEsbWF4OjEsYmV0d2VlbjowfSx7ZnJ1aXRzOlsnUiddLG1pbjoxLG1heDoyLGJldHdlZW46MH1dfSxcclxuICAgICAge2lkOjYsbWluV2F2ZTo1LGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjAuOCxkdFNjYWxlOjAuOSxkdFNjYWxlSW5jcmVhc2U6MCxmcnVpdENoYW5jZTpbe2ZydWl0czpbJ1InXSxtaW46NyxtYXg6NyxiZXR3ZWVuOjAuN31dfSxcclxuICAgICAge2lkOjcsbWluV2F2ZTo5LGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjAuOCxkdFNjYWxlOjAuOTUsZHRTY2FsZUluY3JlYXNlOjAsZnJ1aXRDaGFuY2U6W3tmcnVpdHM6WydSJywnUicsJ0InXSxtaW46NCxtYXg6NixiZXR3ZWVuOjAuNn1dfSxcclxuICAgICAge2lkOjgsbWluV2F2ZTo5LGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjAuOCxkdFNjYWxlOjAuOTUsZHRTY2FsZUluY3JlYXNlOjAsZnJ1aXRDaGFuY2U6W3tmcnVpdHM6WydSJ10sbWluOjQsbWF4OjYsYmV0d2VlbjowfV19LFxyXG4gICAgICB7aWQ6OSxtaW5XYXZlOjksY2hhbmNlOjkwLGNoYW5jZVJlZ3Jvd3RoOjAuMzMsZGVsYXk6MC44LGR0U2NhbGU6MC45NSxkdFNjYWxlSW5jcmVhc2U6MCxmcnVpdENoYW5jZTpbe2ZydWl0czpbJ1InLCdSJywnUicsJ0InXSxtaW46MyxtYXg6NCxiZXR3ZWVuOjB9XX0sXHJcbiAgICAgIHtpZDoxMCxtaW5XYXZlOjE0LGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjAuOCxkdFNjYWxlOjAuOTUsZHRTY2FsZUluY3JlYXNlOjAsZnJ1aXRDaGFuY2U6W3tmcnVpdHM6WydCb21iJ10sbWluOjEsbWF4OjIsYmV0d2VlbjowfSx7ZnJ1aXRzOlsnUiddLG1pbjoyLG1heDozLGJldHdlZW46MH1dfSxcclxuICAgICAge2lkOjExLG1pbldhdmU6MTQsY2hhbmNlOjkwLGNoYW5jZVJlZ3Jvd3RoOjAuMzMsZGVsYXk6MC44LGR0U2NhbGU6MS4wLGR0U2NhbGVJbmNyZWFzZTowLGZydWl0Q2hhbmNlOlt7ZnJ1aXRzOlsnUicsJ1InLCdCJ10sbWluOjE2LG1heDoxNixiZXR3ZWVuOjAuNH1dfSxcclxuICAgICAge2lkOjEyLG1pbldhdmU6MTQsY2hhbmNlOjkwLGNoYW5jZVJlZ3Jvd3RoOjAuMzMsZGVsYXk6MC44LGR0U2NhbGU6MS4wLGR0U2NhbGVJbmNyZWFzZTowLGZydWl0Q2hhbmNlOlt7ZnJ1aXRzOlsnUiddLG1pbjoxMCxtYXg6MTAsYmV0d2VlbjowLjN9XX0sXHJcbiAgICAgIHtpZDoxMyxtaW5XYXZlOjE5LGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjAuOCxkdFNjYWxlOjEuMCxkdFNjYWxlSW5jcmVhc2U6MCxmcnVpdENoYW5jZTpbe2ZydWl0czpbJ1InLCdSJywnQiddLG1pbjo4LG1heDo4LGJldHdlZW46MC41LGRlbGF5SW5jOi0wLjJ9XX0sXHJcbiAgICAgIHtpZDoxNCxtaW5XYXZlOjE5LGNoYW5jZTo5MCxjaGFuY2VSZWdyb3d0aDowLjMzLGRlbGF5OjAuOCxkdFNjYWxlOjEuMCxkdFNjYWxlSW5jcmVhc2U6MCxmcnVpdENoYW5jZTpbe2ZydWl0czpbJ1InLCdSJywnUicsJ1InLCdSJywnQiddLG1pbjo0LG1heDo2LGJldHdlZW46MH1dfSxcclxuICAgICAge2lkOjE1LG1pbldhdmU6MjIsY2hhbmNlOjY3LGNoYW5jZVJlZ3Jvd3RoOjAuMzMsZGVsYXk6MC44LGR0U2NhbGU6MS4wLGR0U2NhbGVJbmNyZWFzZTowLjAyLGZydWl0Q2hhbmNlOlt7ZnJ1aXRzOlsnUicsJ1InLCdSJywnQiddLG1pbjo1LG1heDoxMCxiZXR3ZWVuOjAuNH1dfSxcclxuICAgICAge2lkOjE2LG1pbldhdmU6MjIsY2hhbmNlOjY3LGNoYW5jZVJlZ3Jvd3RoOjAuMzMsZGVsYXk6MC44LGR0U2NhbGU6MS4wLGR0U2NhbGVJbmNyZWFzZTowLjAyLGZydWl0Q2hhbmNlOlt7ZnJ1aXRzOlsnUicsJ1InLCdSJywnQiddLG1pbjozLG1heDo1LGJldHdlZW46MC40fV19LFxyXG4gICAgICB7aWQ6MTcsbWluV2F2ZToyMixjaGFuY2U6NjcsY2hhbmNlUmVncm93dGg6MC4zMyxkZWxheTowLjgsZHRTY2FsZTowLjksZHRTY2FsZUluY3JlYXNlOjAuMDIsZnJ1aXRDaGFuY2U6W3tmcnVpdHM6WydSJ10sbWluOjQsbWF4OjcsYmV0d2VlbjowLjI1fV19LFxyXG4gICAgICB7aWQ6MTgsbWluV2F2ZToyMixjaGFuY2U6NjgsY2hhbmNlUmVncm93dGg6MC4zMyxkZWxheTowLjgsZHRTY2FsZToxLjAsZHRTY2FsZUluY3JlYXNlOjAuMDIsZnJ1aXRDaGFuY2U6W3tmcnVpdHM6WydSJywnUicsJ0InXSxtaW46NSxtYXg6NyxiZXR3ZWVuOjAuNH1dfVxyXG4gICAgXTtcclxuICAgIHRoaXMud2F2ZUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIC8vIGlmKHRoaXMuZnJ1aXRGYWN0b3J5KXtcclxuICAgIC8vICAgdGhpcy5mcnVpdEZhY3RvcnkucG9zaXRpb25XYXRlck1lbG9uVUkoKVxyXG4gICAgLy8gICB0aGlzLmZydWl0RmFjdG9yeS5wb3NpdGlvbkZydWl0VUkoJ0tXVUknLDUuNSwwLDAuODUpO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvL1Jlc3RvcmUgTGlmZVxyXG4gICAgdGhpcy5yaW5nID0gdGhpcy5hZGQuaW1hZ2UoNjQwLDM4NCwnUmluZycpO1xyXG4gICAgdGhpcy5pbXBhY3QgPSB0aGlzLmFkZC5pbWFnZSg2NDAsMzg0LCdJbXBhY3RDbGFzc2ljJyk7XHJcbiAgICB0aGlzLnJpbmcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbXBhY3QudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAvL0NSRUFURSBDUkVESVRTXHJcbiAgICB0aGlzLmNyZWRpdHNQb3B1cCA9IHRoaXMuYWRkLmNvbnRhaW5lcigwLDApO1xyXG4gICAgbGV0IGJhc2VQb3B1cCA9IHRoaXMuYWRkLmltYWdlKDQ5MCwzODQsJ0JhY2tpbmdQYXBlcicpO1xyXG4gICAgLy8gbGV0IGJvcmRlclBvcHVwID0gdGhpcy5hZGQuaW1hZ2UoNDkwLDM4NCwnQm9yZGVyV29vZCcpO1xyXG4gICAgYmFzZVBvcHVwLnNldFNjYWxlKDEuNiwxLjI1KVxyXG4gICAgLy8gYm9yZGVyUG9wdXAuc2V0U2NhbGUoMS42KjEuMjQsMS4yNSoxLjI0KVxyXG4gICAgbGV0IGJvcmRlclBvcHVwID10aGlzLmNyZWF0ZVdvb2RCb3JkZXIoMzQwLDI2NCw1OTUsNDc1LDAuNSwwLjUpO1xyXG5cclxuICAgIHRoaXMuY3JlZGl0c1BvcHVwLmFkZChiYXNlUG9wdXApO1xyXG4gICAgdGhpcy5jcmVkaXRzUG9wdXAuYWRkKGJvcmRlclBvcHVwKTtcclxuXHJcbiAgICBsZXQgY3JlZGl0VGV4dDEgPSB0aGlzLmNyZWF0ZUNyZWRpdHNUZXh0KCk7XHJcbiAgICB2YXIgYm94TWFzayA9IHRoaXMubWFrZS5ncmFwaGljcygpO1xyXG4gICAgYm94TWFzay5maWxsUmVjdCg0MiwgNzUsIDg4MCwgNjIwKTtcclxuICAgIHZhciBtYXNrID0gbmV3IFBoYXNlci5EaXNwbGF5Lk1hc2tzLkdlb21ldHJ5TWFzayh0aGlzLCBib3hNYXNrKTtcclxuICAgIC8vIGZvcihsZXQgYT0wO2E8Y3JlZGl0VGV4dDEubGlzdC5sZW5ndGg7YSsrKXtcclxuICAgIC8vICAgICBjcmVkaXRUZXh0MS5saXN0W2FdLnNldE1hc2sobWFzayk7XHJcbiAgICAvLyB9XHJcbiAgICBjcmVkaXRUZXh0MS55ID0gMDtcclxuICAgIGNyZWRpdFRleHQxLnNldE1hc2sobWFzayk7XHJcbiAgICBcclxuICAgIGxldCBjcmVkaXRUZXh0MiA9IHRoaXMuY3JlYXRlQ3JlZGl0c1RleHQoKTtcclxuICAgIFxyXG4gICAgY3JlZGl0VGV4dDIueSA9IDU5MDA7XHJcbiAgICBjcmVkaXRUZXh0Mi5zZXRNYXNrKG1hc2spO1xyXG5cclxuICAgIHRoaXMudENyZDEgPSBjcmVkaXRUZXh0MTtcclxuICAgIHRoaXMudENyZDIgPSBjcmVkaXRUZXh0MjtcclxuXHJcbiAgICB0aGlzLmNvbkNyZWRpdFRleHQgPSB0aGlzLmFkZC5jb250YWluZXIoMCwwKTtcclxuICAgIHRoaXMuY29uQ3JlZGl0VGV4dC5hZGQoY3JlZGl0VGV4dDEpO1xyXG4gICAgdGhpcy5jb25DcmVkaXRUZXh0LmFkZChjcmVkaXRUZXh0Mik7XHJcblxyXG4gICAgdGhpcy5jb25DcmVkaXRUZXh0LnNldFNpemUoODE5KjIsIDU5MDAqMyk7XHJcbiAgICB0aGlzLmhvbGRDcmVkaXQgPSBmYWxzZTtcclxuICAgIGxldCBtZSA9IHRoaXM7XHJcbiAgICB0aGlzLmNvbkNyZWRpdFRleHQuc2V0SW50ZXJhY3RpdmUoKS5vbignZHJhZycsIGZ1bmN0aW9uKHBvaW50ZXIsIGRyYWdYLCBkcmFnWSl7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IG1lLmNvbkNyZWRpdFRleHQ7O1xyXG4gICAgICAgIGNvbnRhaW5lci55ID0gZHJhZ1k7XHJcbiAgICAgICAgY29uc29sZS5sb2coZHJhZ1kpO1xyXG4gICAgICAgIG1lLmRlbGF5U2Nyb2xsQ3JlZGl0ID0gMDtcclxuICAgICAgICBtZS5ob2xkQ3JlZGl0ID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb25DcmVkaXRUZXh0LnNldEludGVyYWN0aXZlKCkub24oJ2RyYWdlbmQnLCBmdW5jdGlvbihwb2ludGVyLCBkcmFnWCwgZHJhZ1kpe1xyXG4gICAgICAgIG1lLmhvbGRDcmVkaXQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5pbnB1dC5zZXREcmFnZ2FibGUodGhpcy5jb25DcmVkaXRUZXh0KTtcclxuICAgIFxyXG4gICAgdGhpcy5jcmVkaXRzUG9wdXAuYWRkKHRoaXMuY29uQ3JlZGl0VGV4dCk7XHJcblxyXG4gICAgdGhpcy5jcmVkaXRzUG9wdXAudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBiYXNlUG9wdXBBdWRpbyA9IHRoaXMuYWRkLmltYWdlKDExMDAsMjcwLCdCYWNraW5nUGFwZXInKTtcclxuICAgIGxldCBib3JkZXJQb3B1cEF1ZGlvID0gdGhpcy5hZGQuaW1hZ2UoMTEwMCwyNzAsJ0JvcmRlcldvb2QnKTtcclxuICAgIGJhc2VQb3B1cEF1ZGlvLnNldFNjYWxlKDAuNiwwLjUpXHJcbiAgICBib3JkZXJQb3B1cEF1ZGlvLnNldFNjYWxlKDAuNioxLjI0LDAuNSoxLjI0KVxyXG4gICAgdGhpcy5hdWRpb1BvcHVwID0gdGhpcy5hZGQuY29udGFpbmVyKDAsMCk7XHJcbiAgICB0aGlzLmF1ZGlvUG9wdXAuYWRkKGJhc2VQb3B1cEF1ZGlvKTtcclxuICAgIHRoaXMuYXVkaW9Qb3B1cC5hZGQoYm9yZGVyUG9wdXBBdWRpbyk7XHJcbiAgICB0aGlzLmF1ZGlvUG9wdXAudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGxldCB0ZXh0QXVkaW8gPSB0aGlzLmFkZC50ZXh0KDExMDAsIDE2MCwgJ0F1ZGlvJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTo2MCwgY29sb3I6JyM2NTNBMTEnLGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB0aGlzLmF1ZGlvUG9wdXAuYWRkKHRleHRBdWRpbylcclxuXHJcbiAgICB0aGlzLmJ1dHRvblNGWCA9IG5ldyBCdXR0b24odGhpcywxMDMwLDMwMCwnQnV0dG9uU0ZYJyk7XHJcbiAgICB0aGlzLmJ1dHRvbkJHTSA9IG5ldyBCdXR0b24odGhpcywxMTcwLDMwMCwnQnV0dG9uTXVzaWMnKTtcclxuICAgIHRoaXMuQkdNTXV0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU0ZYTXV0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuYnV0dG9uU0ZYLm9uKCdwb2ludGVydXAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmJ1dHRvblNGWC5jbGlja2VkKXRoaXMudG9vZ2xlU0ZYKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uU0ZYLmFuaW1hdGVSZWxlYXNlKCk7XHJcbiAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uQkdNLm9uKCdwb2ludGVydXAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmJ1dHRvbkJHTS5jbGlja2VkKXRoaXMudG9vZ2xlTXVzaWMoKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25CR00uYW5pbWF0ZVJlbGVhc2UoKTtcclxuICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5hdWRpb1BvcHVwLmFkZCh0aGlzLmJ1dHRvblNGWCk7XHJcbiAgICB0aGlzLmF1ZGlvUG9wdXAuYWRkKHRoaXMuYnV0dG9uQkdNKTtcclxuXHJcbiAgICB0aGlzLnRleHRWZXJzaSA9IHRoaXMuYWRkLnRleHQoNDUwLCA3MDgsICd2MS4xLjAuOCcsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6MzAsIGNvbG9yOicjRkZGRkZGJyxhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgdGhpcy50ZXh0VmVyc2kuc2V0U3Ryb2tlKCcjNDY0NjQ2JywgOCk7XHJcbiAgICBsZXQgZ3JhZGllbnRWZXJzaSA9IHRoaXMudGV4dFZlcnNpLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgdGhpcy50ZXh0VmVyc2kuaGVpZ2h0KTtcclxuICAgIGdyYWRpZW50VmVyc2kuYWRkQ29sb3JTdG9wKDAsICcjQ0VDRkNFJyk7XHJcbiAgICBncmFkaWVudFZlcnNpLmFkZENvbG9yU3RvcCgwLjUsICcjRkZGRkZGJyk7XHJcbiAgICBncmFkaWVudFZlcnNpLmFkZENvbG9yU3RvcCgwLjUsICcjQ0VDRkNFJyk7XHJcbiAgICBncmFkaWVudFZlcnNpLmFkZENvbG9yU3RvcCgxLCAnI0ZGRkZGRicpO1xyXG4gICAgdGhpcy50ZXh0VmVyc2kuc2V0RmlsbChncmFkaWVudFZlcnNpKTtcclxuICAgIHRoaXMudGV4dFZlcnNpLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAvL0NSRUFURSBSSU5HIEJhY2tcclxuICAgIGNvbnN0IHRleHR1cmVSaW5nQmFjayA9IGF3YWl0IHRoaXMudGhpcmQubG9hZC50ZXh0dXJlKCdiYWNrX3JpbmdfdGV4JylcclxuICAgIHRleHR1cmVSaW5nQmFjay53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXHJcbiAgICB0ZXh0dXJlUmluZ0JhY2sud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xyXG4gICAgY29uc3QgbWF0ZXJpYWxSaW5nQmFjayA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IG1hcDogdGV4dHVyZVJpbmdCYWNrIH0pXHJcbiAgICBtYXRlcmlhbFJpbmdCYWNrLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMucGxhbmVSaW5nQmFjayA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDMuMTIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsMy4xMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciksbWF0ZXJpYWxSaW5nQmFjaylcclxuICAgIHRoaXMucGxhbmVSaW5nQmFjay5wb3NpdGlvbi56ID0gLTQ5OTtcclxuICAgIHRoaXMucGxhbmVSaW5nQmFjay5wb3NpdGlvbi55ID0gLTMuNS90aGlzLmZydXN0dW1TaXplQ2hhbmdlcjtcclxuICAgIHRoaXMucGxhbmVSaW5nQmFjay5wb3NpdGlvbi54ID0gNy41L3RoaXMuZnJ1c3R1bVNpemVDaGFuZ2VyO1xyXG4gICAgdGhpcy50aGlyZC5hZGQuZXhpc3RpbmcodGhpcy5wbGFuZVJpbmdCYWNrKVxyXG4gICAgdGhpcy5wbGFuZVJpbmdCYWNrLmFuZ2xlID0gMDtcclxuICAgIGxldCB0bXBCYWNrID0gdGhpcy5wbGFuZVJpbmdCYWNrO1xyXG4gICAgdGhpcy50d2VlbnMuYWRkKFxyXG4gICAge1xyXG4gICAgICAgICAgdGFyZ2V0czogdG1wQmFjayxcclxuICAgICAgICAgIGFuZ2xlOiAzNjAsXHJcbiAgICAgICAgICBsb29wOiAtMSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwMCxcclxuICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbmVSaW5nQmFjay5yb3RhdGlvbi56ID0gdG1wQmFjay5hbmdsZS8xODAqTWF0aC5QSTtcclxuICAgICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nQmFjayA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDMuMTIvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXIsMy4xMi90aGlzLmZydXN0dW1TaXplQ2hhbmdlciksbWF0ZXJpYWxTaGFkb3dSaW5nKVxyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdCYWNrLnBvc2l0aW9uLnogPSAtNTAwO1xyXG4gICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdCYWNrLnBvc2l0aW9uLnggPSAoMC4yKzcuNSkvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXI7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZ0JhY2sucG9zaXRpb24ueSA9ICgtMC4yLTMuNSkvdGhpcy5mcnVzdHVtU2l6ZUNoYW5nZXI7XHJcbiAgICB0aGlzLnRoaXJkLmFkZC5leGlzdGluZyh0aGlzLnBsYW5lU2hhZG93UmluZ0JhY2spXHJcblxyXG4gICAgdGhpcy5wbGFuZVJpbmdCYWNrLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nQmFjay52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy9DUklUSUNBTCBIQU5ETEVSXHJcbiAgICB0aGlzLkNyaXRpY2FsVGV4dCA9IHJlcXVpcmUoJy4vLi4vZ2FtZW9iamVjdHMvQ3JpdGljYWxUZXh0LmpzJykuZGVmYXVsdDtcclxuICAgIHRoaXMucG9vbENyaXRpY2FsID0gW107ICAgICAgXHJcbiAgICB0aGlzLmFjdGl2ZUNyaXRpY2FsPVtdO1xyXG4gICAgZm9yKGxldCBpPTA7aTw1O2krKyl7XHJcbiAgICAgICAgbGV0IGNyaXRpY2FsVGV4dCA9IG5ldyB0aGlzLkNyaXRpY2FsVGV4dCh0aGlzLDAsMCk7XHJcbiAgICAgICAgY3JpdGljYWxUZXh0LmRlYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnBvb2xDcml0aWNhbC5wdXNoKGNyaXRpY2FsVGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9DT01CTyBIQU5ETEVSXHJcbiAgICB0aGlzLkNvbWJvVGV4dCA9IHJlcXVpcmUoJy4vLi4vZ2FtZW9iamVjdHMvQ29tYm9UZXh0LmpzJykuZGVmYXVsdDtcclxuICAgIHRoaXMucG9vbENvbWJvVGV4dD1bXTtcclxuICAgIHRoaXMuYWN0aXZlQ29tYm9UZXh0PVtdO1xyXG4gICAgdGhpcy5pY29uU2NhbGVVcCA9IGZhbHNlO1xyXG5cclxuICAgIGZvcihsZXQgaT0wO2k8NTtpKyspe1xyXG4gICAgICAgIGxldCBjb21ib1RleHQgPSBuZXcgdGhpcy5Db21ib1RleHQodGhpcywwLDApO1xyXG4gICAgICAgIGNvbWJvVGV4dC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5wb29sQ29tYm9UZXh0LnB1c2goY29tYm9UZXh0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5zY2VuZS5zdG9wKCdQcmVsb2FkU2NlbmUnKTtcclxuICAgIHRoaXMuZ2FtZVN0YXRlID0gLTE7XHJcblxyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogdGhpcy50b3BIb21lc2NyZWVuLFxyXG4gICAgICB5OiAwLFxyXG4gICAgICBkdXJhdGlvbjogMjUwXHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdjY2MnKTtcclxuICAgIFxyXG4gICAgdGhpcy5idXR0b25DbGFzc2ljLnZpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy5idXR0b25TZXR0aW5nLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHBva2lHYW1lTG9hZGluZ0ZpbmlzaGVkKCk7XHJcbiAgfVxyXG5cclxuICAgIHNob3dDcml0aWNhbFRleHQoeCwgeSl7XHJcbiAgICAgIGxldCBjcml0Q29udGFpbmVyO1xyXG5cclxuICAgICAgaWYodGhpcy5wb29sQ3JpdGljYWwubGVuZ3RoID09IDApe1xyXG4gICAgICAgIGNyaXRDb250YWluZXIgPSBuZXcgdGhpcy5Dcml0aWNhbFRleHQodGhpcywwLDApO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBjcml0Q29udGFpbmVyID0gdGhpcy5wb29sQ3JpdGljYWxbMF07XHJcbiAgICAgICAgdGhpcy5wb29sQ3JpdGljYWwuc3BsaWNlKDAsMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNyaXRDb250YWluZXIuc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgIGNyaXRDb250YWluZXIuYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgIGlmKCF0aGlzLlNGWE11dGVkKXtcclxuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ1VJQ3JpdGljYWwnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5nYW1lRGF0YS5zY29yZSArPSAgMTA7XHJcblxyXG4gICAgICB0aGlzLmFjdGl2ZUNyaXRpY2FsLnB1c2goY3JpdENvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gIGNyZWF0ZVJpbmdGcnVpdFR3ZWVuRGlzYXBwZWFyKHBsYW5lUmluZyxwbGFuZVJpbmdTaGFkb3csZnJ1aXQpe1xyXG4gICAgbGV0IHNjYWxlID0gMTtcclxuICAgIFxyXG4gICAgbGV0IHRlbXAgPSB7c2NhbGU6IDF9O1xyXG4gICAgdGhpcy50d2VlbnMuYWRkKFxyXG4gICAge1xyXG4gICAgICAgICAgdGFyZ2V0czogdGVtcCxcclxuICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgLy8geTogJy09MC41JyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICBvblVwZGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0bXAuYW5nbGUpO1xyXG4gICAgICAgICAgICBwbGFuZVJpbmcuc2NhbGUueCA9IHRlbXAuc2NhbGU7XHJcbiAgICAgICAgICAgIHBsYW5lUmluZy5zY2FsZS55ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgcGxhbmVSaW5nLnNjYWxlLnogPSB0ZW1wLnNjYWxlO1xyXG5cclxuICAgICAgICAgICAgcGxhbmVSaW5nU2hhZG93LnNjYWxlLnggPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICBwbGFuZVJpbmdTaGFkb3cuc2NhbGUueSA9IHRlbXAuc2NhbGU7XHJcbiAgICAgICAgICAgIHBsYW5lUmluZ1NoYWRvdy5zY2FsZS56ID0gdGVtcC5zY2FsZTtcclxuXHJcbiAgICAgICAgICAgIGZydWl0Lm9iamVjdC50cmF2ZXJzZSggZnVuY3Rpb24gKCBjaGlsZCApIHtcclxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJXaG9sZVwiKSB8fCBjaGlsZC5uYW1lLmluY2x1ZGVzKFwid2hvbGVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnggPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnkgPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnogPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJIYWxmXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJoYWxmXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS54ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS55ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS56ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICAgICAgcGxhbmVSaW5nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGxhbmVSaW5nU2hhZG93LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5mcnVpdEZhY3RvcnkuZGVhY3RpdmF0ZShmcnVpdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJpbmdGcnVpdFR3ZWVuQXBwZWFyKHBsYW5lUmluZyxwbGFuZVJpbmdTaGFkb3csZnJ1aXQsZnJ1aXRTY2FsZSl7XHJcbiAgICBsZXQgc2NhbGUgPSAxO1xyXG4gICAgXHJcbiAgICBsZXQgdGVtcCA9IHtzY2FsZTogMH07XHJcbiAgICB0aGlzLnR3ZWVucy5hZGQoXHJcbiAgICB7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0ZW1wLFxyXG4gICAgICAgICAgc2NhbGU6IDEsXHJcbiAgICAgICAgICAvLyB5OiAnLT0wLjUnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRtcC5hbmdsZSk7XHJcbiAgICAgICAgICAgIHBsYW5lUmluZy5zY2FsZS54ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgcGxhbmVSaW5nLnNjYWxlLnkgPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICBwbGFuZVJpbmcuc2NhbGUueiA9IHRlbXAuc2NhbGU7XHJcblxyXG4gICAgICAgICAgICBwbGFuZVJpbmdTaGFkb3cuc2NhbGUueCA9IHRlbXAuc2NhbGU7XHJcbiAgICAgICAgICAgIHBsYW5lUmluZ1NoYWRvdy5zY2FsZS55ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgcGxhbmVSaW5nU2hhZG93LnNjYWxlLnogPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICBmcnVpdC5vYmplY3QuYm9keS5zZXRDb2xsaXNpb25GbGFncyg0KTtcclxuICAgICAgICAgICAgZnJ1aXQub2JqZWN0LnRyYXZlcnNlKCBmdW5jdGlvbiAoIGNoaWxkICkge1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQubmFtZS5pbmNsdWRlcyhcIldob2xlXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJ3aG9sZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2NhbGUueCA9IHRlbXAuc2NhbGUqZnJ1aXRTY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS55ID0gdGVtcC5zY2FsZSpmcnVpdFNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnogPSB0ZW1wLnNjYWxlKmZydWl0U2NhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQubmFtZS5pbmNsdWRlcyhcIkJvbWJcIikgfHwgY2hpbGQubmFtZS5pbmNsdWRlcyhcImJvbWJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNjYWxlLnggPSB0ZW1wLnNjYWxlKmZydWl0U2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2NhbGUueSA9IHRlbXAuc2NhbGUqZnJ1aXRTY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS56ID0gdGVtcC5zY2FsZSpmcnVpdFNjYWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJIYWxmXCIpIHx8IGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJoYWxmXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS54ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS55ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zY2FsZS56ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJpbmdUd2VlbkRpc2FwcGVhcihwbGFuZVJpbmcscGxhbmVSaW5nU2hhZG93KXtcclxuICAgIGxldCBzY2FsZSA9IDE7XHJcbiAgICBcclxuICAgIGxldCB0ZW1wID0ge3NjYWxlOiAxfTtcclxuICAgIHRoaXMudHdlZW5zLmFkZChcclxuICAgIHtcclxuICAgICAgICAgIHRhcmdldHM6IHRlbXAsXHJcbiAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgIC8vIHk6ICctPTAuNScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgb25VcGRhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codG1wLmFuZ2xlKTtcclxuICAgICAgICAgICAgcGxhbmVSaW5nLnNjYWxlLnggPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICBwbGFuZVJpbmcuc2NhbGUueSA9IHRlbXAuc2NhbGU7XHJcbiAgICAgICAgICAgIHBsYW5lUmluZy5zY2FsZS56ID0gdGVtcC5zY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHBsYW5lUmluZ1NoYWRvdy5zY2FsZS54ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgcGxhbmVSaW5nU2hhZG93LnNjYWxlLnkgPSB0ZW1wLnNjYWxlO1xyXG4gICAgICAgICAgICBwbGFuZVJpbmdTaGFkb3cuc2NhbGUueiA9IHRlbXAuc2NhbGU7XHJcblxyXG4gICAgICAgICAgICAvLyBmcnVpdC5vYmplY3Quc2NhbGUueCA9IHRlbXAuc2NhbGU7XHJcbiAgICAgICAgICAgIC8vIGZydWl0Lm9iamVjdC5zY2FsZS55ID0gdGVtcC5zY2FsZTtcclxuICAgICAgICAgICAgLy8gZnJ1aXQub2JqZWN0LnNjYWxlLnogPSB0ZW1wLnNjYWxlO1xyXG5cclxuICAgICAgICAgICAgLy8gZnJ1aXQuc3BsYXNoLnBvc2l0aW9uLnNldCh0bXAueCwgdG1wLnksIHRtcC56KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgICAgIHBsYW5lUmluZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHBsYW5lUmluZ1NoYWRvdy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNyZWRpdHNUZXh0KCl7XHJcbiAgICBsZXQgd2hvbGVDcmVkaXQgPSB0aGlzLmFkZC5jb250YWluZXIoMCwwKTtcclxuICAgIGxldCB0ZXh0QWJvdXQgPSB0aGlzLmFkZC50ZXh0KDQ5MCwgMTQwLCAnQWJvdXQnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOjgwLCBjb2xvcjonI0I3NEEzMicsYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRleHRBYm91dCk7XHJcbiAgICBsZXQgdGV4dEdhbWVEZXNjID0gdGhpcy5hZGQudGV4dCg0OTAsIDE4MCwgJ0FsbCBuaW5qYXMgaGF0ZSBmcnVpdCFcXG5Td2lwZSB0aGUgZnJ1aXQgd2l0aCB5b3VyIGZpbmdlciB0byBlbmQgdGhlaXIgam91cm5leVxcblxcbkJlIHdhcnkgb2YgYm9tYnMsIGFuZCBtYWtlIHNlbnNlaSBwcm91ZCcsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6MzMsIGNvbG9yOicjNkY0NjFFJyxhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRleHRHYW1lRGVzYyk7XHJcblxyXG4gICAgLy8gbGV0IHRleHRDcmVkaXQgPSB0aGlzLmFkZC50ZXh0KDQ5MCwgMzcwLCAnQ3JlZGl0cycsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6ODAsIGNvbG9yOicjQjc0QTMyJyxhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgLy8gbGV0IHRleHRIVE1MNVBvcnQgPSB0aGlzLmFkZC50ZXh0KDQ5MCwgNDcwLCAnSFRNTDUgUG9ydCBWLjAuNC4xLjMnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOjMzLCBjb2xvcjonIzREMkUxMScsYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIC8vIGxldCB0ZXh0SXNpUG9ydCA9IHRoaXMuYWRkLnRleHQoNDkwLCA1MTAsICdEZXZlbG9wZWQgYnlcXG5Pd24gR2FtZXNcXG5JbmRvbnNlc2lhJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZToyOCwgY29sb3I6JyM2OTNFMTcnLGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICAvLyB3aG9sZUNyZWRpdC5hZGQodGV4dENyZWRpdCk7XHJcbiAgICAvLyB3aG9sZUNyZWRpdC5hZGQodGV4dEhUTUw1UG9ydCk7XHJcbiAgICAvLyB3aG9sZUNyZWRpdC5hZGQodGV4dElzaVBvcnQpO1xyXG5cclxuICAgIGxldCB0ZXh0Q3JlZGl0ID0gdGhpcy5hZGQudGV4dCg0OTAsIDQ4MCwgJ0NyZWRpdHMnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOjgwLCBjb2xvcjonI0I3NEEzMicsYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCB0ZXh0SFRNTDVQb3J0ID0gdGhpcy5hZGQudGV4dCg0OTAsIDM3MCwgJ0VYQ0xVU0lWRSBQQVJUTkVSOicsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6MzMsIGNvbG9yOicjNEQyRTExJyxhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgbGV0IHRleHRJc2lQb3J0ID0gdGhpcy5hZGQudGV4dCg0OTAsIDQxMCwgJ1NUT1JNUycsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6MjgsIGNvbG9yOicjNjkzRTE3JyxhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRleHRDcmVkaXQpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRleHRIVE1MNVBvcnQpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRleHRJc2lQb3J0KTtcclxuXHJcbiAgICBsZXQgdGV4dEN1cnJlbnRUZWFtID0gdGhpcy5hZGQudGV4dCg0OTAsIDYzMCwgJ0N1cnJlbnQgVGVhbScsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6NDUsIGNvbG9yOicjNjg5OTI3JyxhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRleHRDdXJyZW50VGVhbSk7XHJcblxyXG4gICAgbGV0IGNEaXZpc2lvbiA9ICcjNEMyRTEyJztcclxuICAgIGxldCBjTWVtYmVyID0gJyM2RjQ2MUYnO1xyXG5cclxuICAgIHZhciBtaWQgPSA0OTA7XHJcbiAgICB2YXIgbGVmdCA9IDQ5MCAtIDIwMDtcclxuICAgIHZhciByaWdodCA9IDQ5MCArIDIwMDtcclxuICAgIHZhciBkaXN0YW5jZVkgPSA4MDtcclxuICAgIHZhciBmb250U2l6ZSA9IDMzO1xyXG4gICAgdmFyIHN0YXJ0WSA9IDcxMDtcclxuXHJcblxyXG4gICAgbGV0IHRfdGVhbUxlYWQgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSwgJ1RlYW0gTGVhZCcsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjRGl2aXNpb24sIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICBsZXQgbl90ZWFtTGVhZCA9IHRoaXMuYWRkLnRleHQobGVmdCwgc3RhcnRZICsgdF90ZWFtTGVhZC5oZWlnaHQgKyA1LCAnU2hhaW5pZWwgRGVvJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF90ZWFtTGVhZCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQobl90ZWFtTGVhZCk7XHJcblxyXG4gICAgbGV0IHRfYXJ0ID0gdGhpcy5hZGQudGV4dChyaWdodCwgc3RhcnRZLCAnQXJ0Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX2FydCA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSArIHRfYXJ0LmhlaWdodCArIDUsICdMYXVyYSBNY0NhYmUnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X2FydCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQobl9hcnQpO1xyXG5cclxuICAgIHN0YXJ0WSA9IG5fdGVhbUxlYWQueSArIG5fdGVhbUxlYWQuaGVpZ2h0ICsgZGlzdGFuY2VZO1xyXG5cclxuICAgIGxldCB0X2NvZGUgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSwgJ0NvZGUnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY0RpdmlzaW9uLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgbGV0IG5fY29kZSA9IHRoaXMuYWRkLnRleHQobGVmdCwgc3RhcnRZICsgdF9jb2RlLmhlaWdodCArIDUsICdTYW1hbnRoYSBUdXJuZXJcXG5WaWN0b3IgUnlrb3ZcXG5LYXlsZWIgR2FycmV0dCcsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjTWVtYmVyLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApOyAgICAgICAgXHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF9jb2RlKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX2NvZGUpO1xyXG5cclxuICAgIGxldCB0X2Rlc2lnbiA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSwgJ0Rlc2lnbicsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjRGl2aXNpb24sIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICBsZXQgbl9kZXNpZ24gPSB0aGlzLmFkZC50ZXh0KHJpZ2h0LCBzdGFydFkgKyB0X2Rlc2lnbi5oZWlnaHQgKyA1LCAnU2hhaW5pZWwgRGVvXFxuRHlsYW4gVmFuIEJlZWsnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X2Rlc2lnbik7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQobl9kZXNpZ24pO1xyXG5cclxuICAgIHN0YXJ0WSA9IE1hdGgubWF4KG5fY29kZS55ICsgbl9jb2RlLmhlaWdodCwgbl9kZXNpZ24ueSArIG5fZGVzaWduLmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfcWEgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSwgJ1FBJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX3FhID0gdGhpcy5hZGQudGV4dChsZWZ0LCBzdGFydFkgKyB0X3FhLmhlaWdodCArIDUsICdCcmVudCBIb2Jzb24nLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X3FhKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX3FhKTtcclxuXHJcbiAgICBsZXQgdF9jcyA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSwgJ0N1c3RvbWVyIFN1cHBvcnQnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY0RpdmlzaW9uLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgbGV0IG5fY3MgPSB0aGlzLmFkZC50ZXh0KHJpZ2h0LCBzdGFydFkgKyB0X2NzLmhlaWdodCArIDUsICdNYWRpc29uIEFubmliYWxlXFxuQWthYXNoIERlb1xcblNhbSBTY2FycGlnbmF0bycsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjTWVtYmVyLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfY3MpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fY3MpO1xyXG5cclxuICAgIHN0YXJ0WSA9IE1hdGgubWF4KG5fcWEueSArIG5fcWEuaGVpZ2h0LCBuX2NzLnkgKyBuX2NzLmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfYXVkaW8gPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSwgJ0F1ZGlvJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX2F1ZGlvID0gdGhpcy5hZGQudGV4dChsZWZ0LCBzdGFydFkgKyB0X2F1ZGlvLmhlaWdodCArIDUsICdDZWRhciBKb25lc1xcbkphbWllIENhbXBiZWxsXFxuUmljYXJkbyBQdWpvbCcsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjTWVtYmVyLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfYXVkaW8pO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fYXVkaW8pO1xyXG5cclxuICAgIGxldCB0X21hcmtldGluZyA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSwgJ01hcmtldGluZycsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjRGl2aXNpb24sIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICBsZXQgbl9tYXJrZXRpbmcgPSB0aGlzLmFkZC50ZXh0KHJpZ2h0LCBzdGFydFkgKyB0X21hcmtldGluZy5oZWlnaHQgKyA1LCAnSmFzb24gTWF1bmRyZWxsXFxuU2FsdmF0b3JlIENvbXBhZ25vbmVcXG5PbGl2aWEgQmFtYnVyeVxcblBhcmlzIE9ybWVyb2QnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTsgICAgICAgIFxyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfbWFya2V0aW5nKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX21hcmtldGluZyk7XHJcblxyXG4gICAgc3RhcnRZID0gTWF0aC5tYXgobl9hdWRpby55ICsgbl9hdWRpby5oZWlnaHQsIG5fbWFya2V0aW5nLnkgKyBuX21hcmtldGluZy5oZWlnaHQpICsgZGlzdGFuY2VZO1xyXG5cclxuICAgIGxldCB0X29yaWdpbmFsVGVhbSA9IHRoaXMuYWRkLnRleHQobWlkLCBzdGFydFksICdPcmlnaW5hbCBUZWFtJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTo0NSwgY29sb3I6IFwiIzY4OTkyN1wiLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfb3JpZ2luYWxUZWFtKTtcclxuXHJcbiAgICBzdGFydFkgPSB0X29yaWdpbmFsVGVhbS55ICsgdF9vcmlnaW5hbFRlYW0uaGVpZ2h0ICsgZGlzdGFuY2VZO1xyXG5cclxuICAgIGxldCB0X3RlYW1MZWFkMiA9IHRoaXMuYWRkLnRleHQobGVmdCwgc3RhcnRZLCAnVGVhbSBMZWFkIC8gRGVzaWduJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX3RlYW1MZWFkMiA9IHRoaXMuYWRkLnRleHQobGVmdCwgc3RhcnRZICsgdF90ZWFtTGVhZDIuaGVpZ2h0ICsgNSwgJ0x1a2UgTXVzY2F0Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF90ZWFtTGVhZDIpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fdGVhbUxlYWQyKTtcclxuXHJcbiAgICBsZXQgdF9hcnQyID0gdGhpcy5hZGQudGV4dChyaWdodCwgc3RhcnRZLCAnQXJ0Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX2FydDIgPSB0aGlzLmFkZC50ZXh0KHJpZ2h0LCBzdGFydFkgKyB0X2FydDIuaGVpZ2h0ICsgNSwgJ1NoYXRoJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF9hcnQyKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX2FydDIpO1xyXG5cclxuICAgIHN0YXJ0WSA9IE1hdGgubWF4KG5fdGVhbUxlYWQyLnkgKyBuX3RlYW1MZWFkMi5oZWlnaHQsIG5fYXJ0Mi55ICsgbl9hcnQyLmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfY29kZTIgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSwgJ0NvZGUnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY0RpdmlzaW9uLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgbGV0IG5fY29kZTIgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSArIHRfY29kZTIuaGVpZ2h0ICsgNSwgJ0FkYW0gV29vZFxcblN0ZXBoZW4gTGFzdCcsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjTWVtYmVyLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfY29kZTIpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fY29kZTIpO1xyXG5cclxuICAgIGxldCB0X3FhMiA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSwgJ1FBJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX3FhMiA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSArIHRfcWEyLmhlaWdodCArIDUsICdCcmVudCBIb2Jzb25cXG5KYXNvbiBNYXVuZHJlbGwnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X3FhMik7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQobl9xYTIpO1xyXG5cclxuICAgIHN0YXJ0WSA9IE1hdGgubWF4KG5fY29kZTIueSArIG5fY29kZTIuaGVpZ2h0LCBuX3FhMi55ICsgbl9xYTIuaGVpZ2h0KSArIGRpc3RhbmNlWTtcclxuXHJcbiAgICBsZXQgdF9hdWRpbzIgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSwgJ0F1ZGlvJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX2F1ZGlvMiA9IHRoaXMuYWRkLnRleHQobGVmdCwgc3RhcnRZICsgdF9hdWRpbzIuaGVpZ2h0ICsgNSwgJ0plc3NlIEhpZ2dpbnNvblxcbkNlZGFyIEpvbmVzJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF9hdWRpbzIpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fYXVkaW8yKTtcclxuXHJcbiAgICBsZXQgdF9wcm9kdWN0aW9uID0gdGhpcy5hZGQudGV4dChyaWdodCwgc3RhcnRZLCAnUHJvZHVjdGlvbicsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjRGl2aXNpb24sIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICBsZXQgbl9wcm9kdWN0aW9uID0gdGhpcy5hZGQudGV4dChyaWdodCwgc3RhcnRZICsgdF9wcm9kdWN0aW9uLmhlaWdodCArIDUsICdKYXNvbiBIYXJ3b29kJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF9wcm9kdWN0aW9uKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX3Byb2R1Y3Rpb24pO1xyXG5cclxuICAgIHN0YXJ0WSA9IE1hdGgubWF4KG5fYXVkaW8yLnkgKyBuX2F1ZGlvMi5oZWlnaHQsIG5fcHJvZHVjdGlvbi55ICsgbl9wcm9kdWN0aW9uLmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfbWFya2V0aW5nMiA9IHRoaXMuYWRkLnRleHQobWlkLCBzdGFydFksICdNYXJrZXRpbmcnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY0RpdmlzaW9uLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgbGV0IG5fbWFya2V0aW5nMiA9IHRoaXMuYWRkLnRleHQobWlkLCBzdGFydFkgKyB0X21hcmtldGluZzIuaGVpZ2h0ICsgNSwgJ0JldmVybGV5IENoZW4nLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X21hcmtldGluZzIpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fbWFya2V0aW5nMik7XHJcblxyXG4gICAgc3RhcnRZID0gbl9tYXJrZXRpbmcyLnkgKyBuX21hcmtldGluZzIuaGVpZ2h0ICsgZGlzdGFuY2VZO1xyXG5cclxuICAgIGxldCB0X2FkZF9kZXZlbG9wbWVudCA9IHRoaXMuYWRkLnRleHQobWlkLCBzdGFydFksICdBZGRpdGlvbmFsIERldmVsb3BtZW50Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTo0NSwgY29sb3I6IFwiIzY4OTkyN1wiLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfYWRkX2RldmVsb3BtZW50KTtcclxuXHJcbiAgICBzdGFydFkgPSB0X2FkZF9kZXZlbG9wbWVudC55ICsgdF9hZGRfZGV2ZWxvcG1lbnQuaGVpZ2h0ICsgZGlzdGFuY2VZO1xyXG5cclxuICAgIGxldCBuX2xlZnRUZWFtID0gdGhpcy5hZGQudGV4dChsZWZ0LCBzdGFydFksICdBZGFtIE5pY2hvbHNcXG5BbnRob255IEhhbnNlblxcbkFsZXggQnV0dGVyZmllbGRcXG5BbGV4IFJpY2hhcmRzb25cXG5Bc2hsZXkgTXVsbGVyXFxuQmVuIE1hcnJpbmFuXFxuQmVuIFZhbGVcXG5CZXJ0cmFuZCBUaG9tYWNob3RcXG5CcmVuZG9uIFRob21hc1xcbkNvcmV5IEhlYXJkZXJcXG5Db3JleSBUYXlsb3JcXG5EYWVtb24gV2FsdGVyc1xcbkRhbGUgV2lsbGlhbXNcXG5EYW5pZWwgQmF4dGVyXFxuRGFuaWVsIEZpc2hlclxcbkRhbmllbCBKb2huXFxuRGVhbiBMb2FkZXNcXG5FbGxpb3QgQ291cnRuZXlcXG5FbW1hIEtvY2hcXG5HYXJldGggSGVhdm9uLUpvbmVzXFxuR2VtbWEgUmVmYWxvXFxuR3VpbGxhdW1lIEV2cmFyZFxcbk1hcmsgSHVyc3RcXG5IdWdoIFdhbHRlcnNcXG5KYW1lcyBCYXJuZXNcXG5KYW1lcyBRdWlja1xcbkphcmVkIE9hdHNcXG5KYXNvbiBSb2Jzb25cXG5KZXNzZSBIaWdnaW5zb24nLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX3JpZ2h0VGVhbSA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSwgJ0pvaG4gUWlhblxcbkpvaG5hdGhvbiBDYXJyXFxuSm9uYXRoYW4gTGF3XFxuSm9yZGFuIENvbWlub1xcbkpvc2ggU2FuZGVyc29uXFxuS2F0ZSBIeW5lc1xcbkxheXRvbiBIYXdrZXNcXG5NYXR0IE1pbGx3b29kXFxuTWF0dCBSb3NzXFxuTWF0dGhldyBLbmlnaHRzXFxuTWVsYW5pZSBEZXZveVxcbk1pY2hhZWwgRG9iZWxlXFxuTWljaGFlbCBTemV3Y3p5a1xcbk1vdHplIEFzaGVyXFxuTXVycnkgTGFuY2FzaGlyZVxcbk5hdGhhbiBTdGVlbnN0cmFcXG5QYXVsIE1jTmFiXFxuUGhpbCBMYXJzZW5cXG5SYW1pbmUgRGFyYWJpaGFcXG5SZXNhIExpcHV0cmFcXG5SaWNoYXJkIE1jS2lubmV5XFxuUm9kIFdvbmdcXG5SeWFuIExhbmdsZXlcXG5TZWFuIERydWl0dFxcblNlYW4gT2NrZXJ0XFxuVGVycnkgR3JlaXNiYWNoXFxuV2lsbCBHb2RkYXJkXFxuV3JlbiBCcmllclxcblphYyBDb25nbycsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjTWVtYmVyLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fbGVmdFRlYW0pO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fcmlnaHRUZWFtKTtcclxuXHJcbiAgICBzdGFydFkgPSBNYXRoLm1heChuX2xlZnRUZWFtLnkgKyBuX2xlZnRUZWFtLmhlaWdodCwgbl9yaWdodFRlYW0ueSArIG5fcmlnaHRUZWFtLmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfY2VvID0gdGhpcy5hZGQudGV4dChsZWZ0LCBzdGFydFksICdDRU8nLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY0RpdmlzaW9uLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgbGV0IG5fY2VvID0gdGhpcy5hZGQudGV4dChsZWZ0LCBzdGFydFkgKyB0X2Nlby5oZWlnaHQgKyA1LCAnU2hhaW5pZWwgRGVvJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF9jZW8pO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fY2VvKTtcclxuXHJcbiAgICBsZXQgdF9jZm8gPSB0aGlzLmFkZC50ZXh0KHJpZ2h0LCBzdGFydFksICdDRk8nLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY0RpdmlzaW9uLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgbGV0IG5fY2ZvID0gdGhpcy5hZGQudGV4dChyaWdodCwgc3RhcnRZICsgdF9jZm8uaGVpZ2h0ICsgNSwgJ1JpbmFsIERlbycsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjTWVtYmVyLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfY2ZvKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX2Nmbyk7XHJcblxyXG4gICAgc3RhcnRZID0gTWF0aC5tYXgobl9jZW8ueSArIG5fY2VvLmhlaWdodCwgbl9jZm8ueSArIG5fY2ZvLmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfbWFya2V0aW5nMyA9IHRoaXMuYWRkLnRleHQobGVmdCwgc3RhcnRZLCAnTWFya2V0aW5nJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX21hcmtldGluZzMgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSArIHRfbWFya2V0aW5nMy5oZWlnaHQgKyA1LCAnQmV2ZXJsZXkgQ2hlblxcbkJvYiBKb25lc1xcbkZpb25hIEd1b1xcbkphbWVzIFNjaHVsdHpcXG5KdXN0aW4gQm93ZW5cXG5NaWNoZWxsZSBXaGl0ZWhlYWRcXG5QaG9lYmUgT25nXFxuU2NoZXJlZSBSZWV2ZXNcXG5UZXJyeSBHcmVpc2JhY2hcXG5Ub2J5IE1lYWRvd3MnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X21hcmtldGluZzMpO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKG5fbWFya2V0aW5nMyk7XHJcblxyXG4gICAgbGV0IHRfZW5naW5lID0gdGhpcy5hZGQudGV4dChyaWdodCwgc3RhcnRZLCAnRW5naW5lJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX2VuZ2luZSA9IHRoaXMuYWRkLnRleHQocmlnaHQsIHN0YXJ0WSArIHRfZW5naW5lLmhlaWdodCArIDUsICdKYXNvbiBNYXVuZHJlbGxcXG5HcmFudCBQZXRlcnNcXG5aYWMgQ29uZ28nLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X2VuZ2luZSk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQobl9lbmdpbmUpO1xyXG5cclxuICAgIHN0YXJ0WSA9IE1hdGgubWF4KG5fbWFya2V0aW5nMy55ICsgbl9tYXJrZXRpbmczLmhlaWdodCwgbl9lbmdpbmUueSArIG5fZW5naW5lLmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfcWEzID0gdGhpcy5hZGQudGV4dChsZWZ0LCBzdGFydFksICdRQScsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjRGl2aXNpb24sIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICBsZXQgbl9xYTMgPSB0aGlzLmFkZC50ZXh0KGxlZnQsIHN0YXJ0WSArIHRfbWFya2V0aW5nMy5oZWlnaHQgKyA1LCAnQ2hhcmxlcyBCdXNzeVxcbkNsZW1lbnQgVmFsZXR0ZVxcbktpcmJ5IFNjYXJmZVxcblNldGhsYW5zIFZheXUnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOmZvbnRTaXplLCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X3FhMyk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQobl9xYTMpO1xyXG5cclxuICAgIGxldCB0X3N1cHBvcnQgPSB0aGlzLmFkZC50ZXh0KHJpZ2h0LCBzdGFydFksICdTdXBwb3J0Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX3N1cHBvcnQgPSB0aGlzLmFkZC50ZXh0KHJpZ2h0LCBzdGFydFkgKyB0X2VuZ2luZS5oZWlnaHQgKyA1LCAnQnJlbmRhbiBEZWJveVxcbkNobG9lIFBlYXJzb25cXG5DaHJpcyBFZHdhcmRzXFxuR2VuZXZpZXZlIENhcnRlclxcbkdlb3JnaWEgU2hlcGhhcmRcXG5QYXVsIEhvd2F0c29uXFxuUGluZyBNYVxcblNhbSBHaWxsZXNwaWVcXG5TYW0gV2hpdGVcXG5TZXRobGFucyBWYXl1Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF9zdXBwb3J0KTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX3N1cHBvcnQpO1xyXG5cclxuICAgIHN0YXJ0WSA9IE1hdGgubWF4KG5fcWEzLnkgKyBuX3FhMy5oZWlnaHQsIG5fc3VwcG9ydC55ICsgbl9zdXBwb3J0LmhlaWdodCkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfc3BlY2lhbCA9IHRoaXMuYWRkLnRleHQobWlkLCBzdGFydFksICdTcGVjaWFsIFRoYW5rcycsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjRGl2aXNpb24sIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICBsZXQgbl9zcGVjaWFsID0gdGhpcy5hZGQudGV4dChtaWQsIHN0YXJ0WSArIHRfZW5naW5lLmhlaWdodCArIDUsICdDaGFyICsgRW1tYSBXb29kXFxuS2FhcmVuICsgUmF5bW9uZCBIYXdrZXNcXG5LYXRlIEV4bGV5XFxuS2luZyBEcmFnb24gTGUgKyBGYW1pbHlcXG5MYXVyZW4gRnJ5ZXJcXG5MZWFoIE1vc3R5blxcbk1hZG9ubmEgKyBDYWxsdW0gQnJ5YW5cXG5OYXRhbGllIENsYXJrZVxcbk5lbGwgKyBDYWx5YiBSZWh1YVxcblNoaW50YSBMaXB1dHJhXFxuU3RlbGxhIEthbGlzJywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNNZW1iZXIsIGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodF9zcGVjaWFsKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZChuX3NwZWNpYWwpO1xyXG5cclxuICAgIHN0YXJ0WSA9IG5fc3BlY2lhbC55ICsgbl9zcGVjaWFsLmhlaWdodCArIGRpc3RhbmNlWTtcclxuXHJcbiAgICBsZXQgdF9jb3B5cmlnaHQgPSB0aGlzLmFkZC50ZXh0KG1pZCwgc3RhcnRZLCAnwqkgMjAxMCAtIDIwMjEgSGFsZmJyaWNrIFN0dWRpb3MgUHR5IEx0ZC4gRlJVSVQgTklOSkHCrlxcbkdhbWUgY2hhcmFjdGVycywgSGFsZmJyaWNrIGFuZCBsb2dvIGFyZSB0cmFkZW1hcmtzIG9mXFxuSGFsZmJyaWNrIFN0dWRpb3MgUHR5IEx0ZCBhbmQgYXJlIHByb3RlY3RlZCBieSBjb3B5cmlnaHQuXFxuQWxsIHJpZ2h0cyByZXNlcnZlZC4nLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOjI4LCBjb2xvcjogY01lbWJlciwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIHdob2xlQ3JlZGl0LmFkZCh0X2NvcHlyaWdodCk7XHJcbiAgICBcclxuICAgIHN0YXJ0WSA9IHRfY29weXJpZ2h0LnkgKyB0X2NvcHlyaWdodC5oZWlnaHQgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgbGV0IHRfZmFjdCA9IHRoaXMuYWRkLnRleHQobWlkLCBzdGFydFksICdCb251cyBGcnVpdCBGYWN0Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTpmb250U2l6ZSwgY29sb3I6IGNEaXZpc2lvbiwgYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBuX2ZhY3QgPSB0aGlzLmFkZC50ZXh0KG1pZCwgc3RhcnRZICsgdF9mYWN0LmhlaWdodCArIDUsICdTZW5zZWkgbG92ZXMgcHJ1bmVzISA6cCcsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6Zm9udFNpemUsIGNvbG9yOiBjTWVtYmVyLCBhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHRfZmFjdCk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQobl9mYWN0KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0WSk7XHJcblxyXG4gICAgc3RhcnRZID0gbl9mYWN0LnkgKyBuX2ZhY3QuaGVpZ2h0ICsgZGlzdGFuY2VZO1xyXG5cclxuICAgIC8vIGxldCB0ZXh0Q3JlZGl0ID0gdGhpcy5hZGQudGV4dCg0OTAsIDQ4MCwgJ0NyZWRpdHMnLCB7Zm9udEZhbWlseTonZ2FuZ29mY2hpbmVzZScsIGZvbnRTaXplOjgwLCBjb2xvcjonI0I3NEEzMicsYWxpZ246J2NlbnRlcid9KS5zZXRPcmlnaW4oMC41LCAwKTtcclxuICAgIGxldCBzdGhhbmtzb2cgPSB0aGlzLmFkZC50ZXh0KDQ5MCwgc3RhcnRZLCAnU3BlY2lhbCBUaGFua3M6Jywge2ZvbnRGYW1pbHk6J2dhbmdvZmNoaW5lc2UnLCBmb250U2l6ZTozMywgY29sb3I6JyM0RDJFMTEnLGFsaWduOidjZW50ZXInfSkuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICBsZXQgdGhhbmtzb2dpZCA9IHRoaXMuYWRkLnRleHQoNDkwLCBzdGFydFkrc3RoYW5rc29nLmhlaWdodCs1LCAnT3duIEdhbWVzIEluZG9uZXNpYScsIHtmb250RmFtaWx5OidnYW5nb2ZjaGluZXNlJywgZm9udFNpemU6MjgsIGNvbG9yOicjNjkzRTE3JyxhbGlnbjonY2VudGVyJ30pLnNldE9yaWdpbigwLjUsIDApO1xyXG4gICAgd2hvbGVDcmVkaXQuYWRkKHN0aGFua3NvZyk7XHJcbiAgICB3aG9sZUNyZWRpdC5hZGQodGhhbmtzb2dpZCk7XHJcblxyXG4gICAgcmV0dXJuIHdob2xlQ3JlZGl0O1xyXG4gIH1cclxuXHJcbiAgaW5pdFJlc3VsdFNjcmVlbigpe1xyXG4gICAgLy9HQU1FT1ZFUiBVSVxyXG4gICAgdGhpcy53aG9sZVBvcHVwR2FtZW92ZXIgPSB0aGlzLmFkZC5jb250YWluZXIoMCwwKTtcclxuICAgIHRoaXMucG9wdXBHYW1lb3ZlciA9IHRoaXMuYWRkLmltYWdlKDY0MCwyNSwnUGFyY2htZW50QmFja2luZ0xhcmdlJyk7XHJcbiAgICB0aGlzLnBvcHVwR2FtZW92ZXIuc2V0T3JpZ2luKDAuNSwwKTtcclxuICAgIHRoaXMucG9wdXBHYW1lb3Zlci5zZXRTY2FsZSgxLjI1LDEuMjUpO1xyXG5cclxuICAgIGxldCBzZW5zZWlIZWFkID0gdGhpcy5hZGQuaW1hZ2UodGhpcy5wb3B1cEdhbWVvdmVyLngrKHRoaXMucG9wdXBHYW1lb3Zlci53aWR0aC8yKSoxLjI1LTIwLHRoaXMucG9wdXBHYW1lb3Zlci55KzExOSwnU2Vuc2VpSGVhZCcpO1xyXG4gICAgc2Vuc2VpSGVhZC5zZXRPcmlnaW4oMC41LDAuNSk7XHJcbiAgICBzZW5zZWlIZWFkLnNldFNjYWxlKDAuNjI1LDAuNjI1KTtcclxuICAgIHNlbnNlaUhlYWQuYW5nbGUgPSAtMjA7XHJcblxyXG4gICAgbGV0IHRpdGxlVGV4dCA9IHRoaXMuYWRkLnRleHQoNjQwLCA3MCwgXCJTQ09SRVwiLCB7IGZvbnRGYW1pbHk6IFwiZ2FuZ29mY2hpbmVzZVwiLCBmb250U2l6ZTogODUgfSk7XHJcbiAgICB0aXRsZVRleHQuc2V0U3Ryb2tlKCcjNjMzNzAwJywgOCk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSB0aXRsZVRleHQuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aXRsZVRleHQuaGVpZ2h0KTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0ZERjM1MycpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRTM4RDEzJyk7XHJcbiAgICB0aXRsZVRleHQuc2V0T3JpZ2luKDAuNSwwKTtcclxuICAgIHRpdGxlVGV4dC5zZXRGaWxsKGdyYWRpZW50KTtcclxuXHJcbiAgICB0aGlzLnRleHRTY29yZUdhbWVvdmVyID0gdGhpcy5hZGQudGV4dCg2NDAsIDI2NSwgXCIwXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiAyNzUgfSk7XHJcbiAgICB0aGlzLnRleHRTY29yZUdhbWVvdmVyLnNldFN0cm9rZSgnIzYzMzcwMCcsIDE2KTtcclxuICAgIGdyYWRpZW50ID0gdGhpcy50ZXh0U2NvcmVHYW1lb3Zlci5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIHRoaXMudGV4dFNjb3JlR2FtZW92ZXIuaGVpZ2h0KTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0ZERjM1MycpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjRTM4RDEzJyk7XHJcbiAgICB0aGlzLnRleHRTY29yZUdhbWVvdmVyLnNldEZpbGwoZ3JhZGllbnQpO1xyXG4gICAgdGhpcy50ZXh0U2NvcmVHYW1lb3Zlci5zZXRPcmlnaW4oMC41LDAuNSk7XHJcblxyXG4gICAgdGhpcy5uZXdCZXN0VGV4dCA9IHRoaXMuYWRkLnRleHQoNjQwLCAzODAsIFwiTkVXIEJFU1QhXCIsIHsgZm9udEZhbWlseTogXCJnYW5nb2ZjaGluZXNlXCIsIGZvbnRTaXplOiA1NSB9KTtcclxuICAgIHRoaXMubmV3QmVzdFRleHQuc2V0U3Ryb2tlKCcjMzYwMDAwJywgNCk7XHJcbiAgICBncmFkaWVudCA9IHRpdGxlVGV4dC5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIHRoaXMubmV3QmVzdFRleHQuaGVpZ2h0KTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI0ZGOUUyNicpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjQjMyRTBCJyk7XHJcbiAgICB0aGlzLm5ld0Jlc3RUZXh0LnNldE9yaWdpbigwLjUsMCk7XHJcbiAgICB0aGlzLm5ld0Jlc3RUZXh0LnNldEZpbGwoZ3JhZGllbnQpO1xyXG4gICAgdGhpcy5uZXdCZXN0VGV4dC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy53aG9sZVBvcHVwR2FtZW92ZXIuYWRkKHRoaXMucG9wdXBHYW1lb3Zlcik7XHJcbiAgICB0aGlzLndob2xlUG9wdXBHYW1lb3Zlci5hZGQoc2Vuc2VpSGVhZCk7XHJcbiAgICB0aGlzLndob2xlUG9wdXBHYW1lb3Zlci5hZGQodGl0bGVUZXh0KTtcclxuICAgIHRoaXMud2hvbGVQb3B1cEdhbWVvdmVyLmFkZCh0aGlzLnRleHRTY29yZUdhbWVvdmVyKTtcclxuICAgIHRoaXMud2hvbGVQb3B1cEdhbWVvdmVyLmFkZCh0aGlzLm5ld0Jlc3RUZXh0KTtcclxuXHJcbiAgICB0aGlzLndob2xlUG9wdXBHYW1lb3Zlci52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgU2NyZWVuU2hha2UgPSByZXF1aXJlKCcuLy4uL3V0aWxzL1NjcmVlblNoYWtlLmpzJykuZGVmYXVsdDtcclxuICAgIHRoaXMuc2NyZWVuU2hha2UgPSBTY3JlZW5TaGFrZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q3Jvc3NGcnVpdChwb3NYKXtcclxuICAgIGxldCBjcm9zc0ZydWl0O1xyXG4gICAgaWYodGhpcy5jcm9zc0ZydWl0UG9vbC5sZW5ndGg9PTApe1xyXG4gICAgICBjcm9zc0ZydWl0ID0gdGhpcy5jcmVhdGVDcm9zc0ZydWl0KCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgY3Jvc3NGcnVpdCA9IHRoaXMuY3Jvc3NGcnVpdFBvb2xbMF07XHJcbiAgICAgIHRoaXMuY3Jvc3NGcnVpdFBvb2wuc3BsaWNlKDAsMSk7XHJcbiAgICB9XHJcbiAgICBjcm9zc0ZydWl0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgY3Jvc3NGcnVpdC5zZXRPcmlnaW4oMC41LDAuNSk7XHJcbiAgICBjcm9zc0ZydWl0LnggPSBwb3NYO1xyXG4gICAgY3Jvc3NGcnVpdC5zY2FsZSA9IDA7XHJcblxyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogY3Jvc3NGcnVpdCxcclxuICAgICAgc2NhbGU6IDEsXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgICAgIHRhcmdldHM6IGNyb3NzRnJ1aXQsXHJcbiAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICBkZWxheTogNzAwLFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICAgICAgY3Jvc3NGcnVpdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3Jvc3NGcnVpdFBvb2wucHVzaChjcm9zc0ZydWl0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ3Jvc3NGcnVpdCgpe1xyXG4gICAgbGV0IGNyb3NzRnJ1aXQgPSB0aGlzLmFkZC5pbWFnZSgwLDcyMCwnQ3Jvc3NSZWQnKTtcclxuICAgIGNyb3NzRnJ1aXQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgY3Jvc3NGcnVpdC5zZXRPcmlnaW4oMC41LDAuNSk7XHJcblxyXG4gICAgcmV0dXJuIGNyb3NzRnJ1aXQ7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUodGltZSxkZWx0YSkge1xyXG4gICAgaWYodGhpcy5zY3JlZW5TaGFrZSl7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdhYScpO1xyXG4gICAgICB0aGlzLnNjcmVlblNoYWtlLnVwZGF0ZSh0aGlzLnRoaXJkLmNhbWVyYSk7XHJcbiAgICAgIGlmKHRoaXMuc3RhcnRMZWRha2FuKXtcclxuICAgICAgICB0aGlzLnRpbWVyU3RhcnRMZWRha2FuIC09IGRlbHRhO1xyXG4gICAgICAgIGlmKHRoaXMudGltZXJTdGFydExlZGFrYW48PTApe1xyXG4gICAgICAgICAgdGhpcy5zY3JlZW5TaGFrZS5zaGFrZSggdGhpcy50aGlyZC5jYW1lcmEsIG5ldyBUSFJFRS5WZWN0b3IzKDAuMDYyNSwgMC4wNjI1LCAwKSwgMTAwIC8qIG1zICovICk7XHJcbiAgICAgICAgICB0aGlzLnRpbWVyU3RhcnRMZWRha2FuID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZih0aGlzLmdhbWVTdGF0ZT09LTEpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZGQnKVxyXG4gICAgICBpZih0aGlzLmZydWl0RmFjdG9yeSl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2VlZScpXHJcbiAgICAgICAgLy9pZih0aGlzLmZydWl0RmFjdG9yeS5pc0ZpbmlzaCgpKXtcclxuICAgICAgICAgIC8vaWYodGhpcy5mcnVpdEZhY3RvcnkucG9zaXRpb25XYXRlck1lbG9uVUkoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnBvc2l0aW9uV2F0ZXJNZWxvblVJKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnBvc2l0aW9uRnJ1aXRVSSgnS1dVSScsNS41LDAsMC44NSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSaW5nRnJ1aXRUd2VlbkFwcGVhcih0aGlzLnBsYW5lUmluZyx0aGlzLnBsYW5lU2hhZG93UmluZyx0aGlzLmZydWl0RmFjdG9yeS5nZXRGcnVpdCgnV01VSScpLDAuODUpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJpbmdGcnVpdFR3ZWVuQXBwZWFyKHRoaXMucGxhbmVSaW5nU2V0dGluZ3MsdGhpcy5wbGFuZVNoYWRvd1JpbmdTZXR0aW5ncyx0aGlzLmZydWl0RmFjdG9yeS5nZXRGcnVpdCgnS1dVSScpLDAuODUpO1xyXG4gICAgICAgICAgLy99XHJcbiAgICAgICAgLy99XHJcbiAgICAgIH1cclxuICAgIH1lbHNlIGlmKHRoaXMuZ2FtZVN0YXRlPT0wKXtcclxuICAgICAgLy8gdGhpcy5mcnVpdEZhY3RvcnkuZm9yY2VQb3NpdGlvbldhdGVyTWVsb25VSSgpXHJcbiAgICAgIGlmKHRoaXMuYmxhZGUpe1xyXG4gICAgICAgICAgdGhpcy5ibGFkZS51cGRhdGVCbGFkZShkZWx0YSk7XHJcbiAgICAgICAgICBpZighdGhpcy5ob2xkQ2hlY2tVSSAmJiAhdGhpcy5ob21lQW5pbWF0aW9uKXtcclxuICAgICAgICAgICAgbGV0IHJlc0hpdCA9IHRoaXMuYmxhZGUuY2hlY2tGcnVpdHNVSSh0aGlzLmZydWl0RmFjdG9yeSk7XHJcbiAgICAgICAgICAgIGlmKHJlc0hpdD09J1dNVUknKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxhZGUuY2hhbmdlQ3VycmVudFNjcmVlbihcIkdhbWVTY3JlZW5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb0dhbWVwbGF5KCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlc0hpdD09J0tXVUknKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxhZGUuY2hhbmdlQ3VycmVudFNjcmVlbihcIlNldHRpbmdTY3JlZW5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1NldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlc0hpdD09J0JVSScpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGFkZS5jaGFuZ2VDdXJyZW50U2NyZWVuKFwiSG9tZVNjcmVlblwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhpdFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5mcnVpdEZhY3Rvcnkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcnVpdEZhY3RvcnkudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dDcmVkaXQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxheVNjcm9sbENyZWRpdC09ZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRlbGF5U2Nyb2xsQ3JlZGl0PD0wKXtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5ob2xkQ3JlZGl0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25DcmVkaXRUZXh0LnkgLT0gKDE1MCpkZWx0YSkvMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jb25DcmVkaXRUZXh0LnkgPD0gLTU5MDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbkNyZWRpdFRleHQueSArPSA1OTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY29uQ3JlZGl0VGV4dC55ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uQ3JlZGl0VGV4dC55IC09IDU5MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9ZWxzZSBpZih0aGlzLmdhbWVTdGF0ZT09MSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5ibGFkZSl7XHJcbiAgICAgICAgICB0aGlzLmJsYWRlLnVwZGF0ZUJsYWRlKGRlbHRhKTtcclxuICAgICAgICAgIHRoaXMuYmxhZGUuY2hlY2tGcnVpdHModGhpcy5mcnVpdEZhY3RvcnkpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5mcnVpdEZhY3Rvcnkpe1xyXG4gICAgICAgICAgICB0aGlzLmZydWl0RmFjdG9yeS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgfWVsc2UgaWYodGhpcy5nYW1lU3RhdGU9PTIpe1xyXG4gICAgICBpZih0aGlzLmZydWl0RmFjdG9yeSl7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWVyIC09IGRlbHRhLzEwMDAuMDtcclxuICAgICAgICAgIGlmKHRoaXMuc3RhcnRUaW1lcjw9MCAmJiAhdGhpcy5oaXRCb21iKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlYycpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZnJ1aXRGYWN0b3J5LnNwYXduQW55RnJ1aXQoKTtcclxuICAgICAgICAgICAgbGV0IHdhdmUgPSB0aGlzLmdldFdhdmUoKTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih0aGlzLmZydWl0RmFjdG9yeSl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ibGFkZSl7XHJcbiAgICAgICAgICB0aGlzLmJsYWRlLnVwZGF0ZUJsYWRlKGRlbHRhKTtcclxuICAgICAgICAgIGxldCBwcmV2U2NvcmUgPSB0aGlzLmdhbWVEYXRhLnNjb3JlO1xyXG4gICAgICAgICAgbGV0IHVwU2NvcmUgPSB0aGlzLmJsYWRlLmNoZWNrRnJ1aXRzKHRoaXMuZnJ1aXRGYWN0b3J5KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5nYW1lRGF0YS5zY29yZSArPSAgdXBTY29yZTtcclxuICAgICAgICAgIGlmKHRoaXMudGltZXJDb21ibz4wKXtcclxuICAgICAgICAgICAgdGhpcy50aW1lckNvbWJvLT1kZWx0YTtcclxuICAgICAgICAgICAgaWYodGhpcy50aW1lckNvbWJvPD0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXJDb21ibyA9IDA7XHJcbiAgICAgICAgICAgICAgICAvL3RyeSBzaG93IGNvbWJvXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbWJvQ291bnQ+PTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvbWJvKHRoaXMuY29tYm9Db3VudCx0aGlzLmxhc3RQb3NYLHRoaXMubGFzdFBvc1kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih1cFNjb3JlIT0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jb21ib0NvdW50PT0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXJDb21ibyA9IDMwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9Db3VudCA9IHVwU2NvcmU7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXJDb21ibyArPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvQ291bnQgKz0gdXBTY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoZGVsdGEpO1xyXG4gICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmFjdGl2ZUNvbWJvVGV4dC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RpdmVDb21ib1RleHRbaV0udmlzaWJsZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvb2xDb21ib1RleHQucHVzaCh0aGlzLmFjdGl2ZUNvbWJvVGV4dFtpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbWJvVGV4dC5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5hY3RpdmVDcml0aWNhbC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RpdmVDcml0aWNhbFtpXS52aXNpYmxlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9vbENyaXRpY2FsLnB1c2godGhpcy5hY3RpdmVDcml0aWNhbFtpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUNyaXRpY2FsLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1lbHNlIGlmKHRoaXMuZ2FtZVN0YXRlPT0zKXtcclxuICAgICAgICBpZih0aGlzLmZydWl0RmFjdG9yeSl7XHJcbiAgICAgICAgICB0aGlzLmZydWl0RmFjdG9yeS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJsYWRlKXtcclxuICAgICAgICAgIHRoaXMuYmxhZGUudXBkYXRlQmxhZGUoZGVsdGEpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfWVsc2UgaWYodGhpcy5nYW1lU3RhdGU9PTQpe1xyXG4gICAgICAgIGlmKHRoaXMuZnJ1aXRGYWN0b3J5KXtcclxuICAgICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmxhZGUpe1xyXG4gICAgICAgICAgdGhpcy5ibGFkZS51cGRhdGVCbGFkZShkZWx0YSk7XHJcbiAgICAgICAgICBsZXQgcmVzVUkgPSB0aGlzLmJsYWRlLmNoZWNrRnJ1aXRzVUkodGhpcy5mcnVpdEZhY3RvcnkpO1xyXG4gICAgICAgICAgaWYoZ2FtZU1vZGUhPUdBTUVNT0RFX1RPVVJOQU1FTlQpe1xyXG4gICAgICAgICAgICBpZihyZXNVST09J0FHVUknKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxhZGUuY2hhbmdlQ3VycmVudFNjcmVlbihcIkdhbWVTY3JlZW5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBZHMoJ2dhbWVwbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlc1VJPT0nQlVJJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsYWRlLmNoYW5nZUN1cnJlbnRTY3JlZW4oXCJIb21lU2NyZWVuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWRzKCdob21lc2NyZWVuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZihyZXNVST09J0FHVUknKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVwbGF5R2FtZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXNVST09J0JVSScpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ib21lc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1lbHNlIGlmKHRoaXMuZ2FtZVN0YXRlPT01KXtcclxuICAgICAgICBpZighdGhpcy5hZHNTaG93aW5nKXtcclxuICAgICAgICAgICAgdGhpcy50aW1lckFkcyArPSBkZWx0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5mcnVpdEZhY3Rvcnkpe1xyXG4gICAgICAgICAgdGhpcy5mcnVpdEZhY3RvcnkudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ibGFkZSl7XHJcbiAgICAgICAgICB0aGlzLmJsYWRlLnVwZGF0ZUJsYWRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50aW1lckFkcyk7XHJcbiAgICAgICAgaWYodGhpcy50aW1lckFkcz49MzAwMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTaG93QWRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJBZHMgPSAwO1xyXG4gICAgICAgICAgICBpZih0aGlzLnRpcGVBZHM9PVwiaG9tZXNjcmVlblwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvSG9tZXNjcmVlbigpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnRpcGVBZHM9PVwiZ2FtZXBsYXlcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb0dhbWVwbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNjb3JlKGRlbHRhKXtcclxuICAgIGlmKHRoaXMuZ2FtZURhdGEuYmVzdCA8IHRoaXMuZ2FtZURhdGEuc2NvcmUpe1xyXG4gICAgICAgIHRoaXMuZ2FtZURhdGEuYmVzdCA9IHRoaXMuZ2FtZURhdGEuc2NvcmU7XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLnRleHRTY29yZS50ZXh0ID0gJycrdGhpcy5nYW1lRGF0YS5zY29yZTtcclxuICAgIHRoaXMudGV4dEJlc3QudGV4dCA9ICdCZXN0OiAnK3RoaXMuZ2FtZURhdGEuYmVzdDtcclxuICAgIHRoaXMudGV4dEJlc3RHcmVlbi50ZXh0ID0gJ0Jlc3Q6ICcrdGhpcy5nYW1lRGF0YS5iZXN0O1xyXG5cclxuICAgIGlmKHRoaXMuZ2FtZURhdGEuYmVzdCA9PSB0aGlzLmdhbWVEYXRhLnNjb3JlICYmIHRoaXMuZ2FtZURhdGEuYmVzdCAhPSAwKXtcclxuICAgICAgICB0aGlzLnRleHRCZXN0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRleHRCZXN0R3JlZW4udmlzaWJsZSA9IHRydWU7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLnRleHRCZXN0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGV4dEJlc3RHcmVlbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5nYW1lRGF0YS5kaXNwbGF5U2NvcmUhPXRoaXMuZ2FtZURhdGEuc2NvcmUpe1xyXG4gICAgICAgIGxldCBwcmV2U2NvcmUgPSB0aGlzLmdhbWVEYXRhLmRpc3BsYXlTY29yZTtcclxuICAgICAgICBpZighdGhpcy5pY29uU2NhbGVVcCl7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvblNjYWxlVXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogdGhpcy5pY29uU2NvcmUsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC40MyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZW1wID0gdGhpcy5nYW1lRGF0YS5kaXNwbGF5U2NvcmU7XHJcbiAgICAgICAgdGVtcCArPSAoZGVsdGEpLzEwMDtcclxuICAgICAgICBpZih0ZW1wPnRoaXMuZ2FtZURhdGEuc2NvcmUpe1xyXG4gICAgICAgICAgICB0ZW1wID0gdGhpcy5nYW1lRGF0YS5zY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YS5kaXNwbGF5U2NvcmUgPSB0ZW1wO1xyXG5cclxuICAgICAgICB0aGlzLnRleHRTY29yZS50ZXh0ID0gJycrdGhpcy5nYW1lRGF0YS5kaXNwbGF5U2NvcmUudG9GaXhlZCgwKTtcclxuXHJcbiAgICAgICAgbGV0IGN1clNjb3JlID0gdGhpcy5nYW1lRGF0YS5kaXNwbGF5U2NvcmU7XHJcbiAgICAgICAgaWYoTWF0aC5mbG9vcihjdXJTY29yZS8xMDAuMCk+TWF0aC5mbG9vcihwcmV2U2NvcmUvMTAwLjApKXtcclxuICAgICAgICAgICAgdGhpcy5UcnlSZXN0b3JlTGlmZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICAgIGlmKHRoaXMuaWNvblNjYWxlVXApe1xyXG4gICAgICAgICAgICB0aGlzLmljb25TY2FsZVVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiB0aGlzLmljb25TY29yZSxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjQsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3dDb21ibyhuQ29tYm8scG9zWCxwb3NZKXtcclxuICAgIGxldCBjb21ib1RleHQ7XHJcbiAgICBpZih0aGlzLnBvb2xDb21ib1RleHQubGVuZ3RoPT0wKXtcclxuICAgICAgICBjb21ib1RleHQgPSBuZXcgdGhpcy5Db21ib1RleHQodGhpcywwLDApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY29tYm9UZXh0ID0gdGhpcy5wb29sQ29tYm9UZXh0WzBdO1xyXG4gICAgICAgIHRoaXMucG9vbENvbWJvVGV4dC5zcGxpY2UoMCwxKTtcclxuICAgIH1cclxuICAgIGlmKG5Db21ibz49MTApe1xyXG4gICAgICAgIGlmKCF0aGlzLlNGWE11dGVkKXtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdDb21ibzEwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgaWYoIXRoaXMuU0ZYTXV0ZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ0NvbWJvJytuQ29tYm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdhbWVEYXRhLnNjb3JlICs9ICBuQ29tYm87XHJcbiAgICAvL2xhc3Qgc2xpY2UgZnJ1aXQgcG9zICsgc29tZXRoaW5nXHJcbiAgICBjb21ib1RleHQueCA9IHBvc1g7XHJcbiAgICBjb21ib1RleHQueSA9IHBvc1k7XHJcblxyXG4gICAgY29tYm9UZXh0LmFjdGl2YXRlKG5Db21ibyk7XHJcbiAgICB0aGlzLmFjdGl2ZUNvbWJvVGV4dC5wdXNoKGNvbWJvVGV4dCk7XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0V2F2ZSgpe1xyXG4gICAgbGV0IGNhcGFibGVXYXZlID0gW107XHJcbiAgICBsZXQgbGFzdE1pbldhdmUgPSAwO1xyXG4gICAgZm9yKGxldCBpPTA7aTx0aGlzLndhdmVMaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICBpZih0aGlzLndhdmVDb3VudGVyPj10aGlzLndhdmVMaXN0W2ldLm1pbldhdmUpe1xyXG4gICAgICAgIGlmKGxhc3RNaW5XYXZlPT10aGlzLndhdmVMaXN0W2ldLm1pbldhdmUpe1xyXG4gICAgICAgICAgY2FwYWJsZVdhdmUucHVzaCh0aGlzLndhdmVMaXN0W2ldKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGxhc3RNaW5XYXZlID0gdGhpcy53YXZlTGlzdFtpXS5taW5XYXZlO1xyXG4gICAgICAgICAgY2FwYWJsZVdhdmUgPSBbXTtcclxuICAgICAgICAgIGNhcGFibGVXYXZlLnB1c2godGhpcy53YXZlTGlzdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlkUmFuZCA9IFBoYXNlci5NYXRoLkJldHdlZW4oMCxjYXBhYmxlV2F2ZS5sZW5ndGgtMSk7Ly9VUEdSQURFIFVTRUQgQ0hBTkNFXHJcbiAgICBsZXQgd2F2ZVVzZWQgPSBjYXBhYmxlV2F2ZVtpZFJhbmRdO1xyXG4gICAgbGV0IHRvdGFsRGVsYXkgPSAwO1xyXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgbGV0IHBvc3NpYmxlU3Bhd24gPSBbLTEuMiwtMC42LDAuNiwxLjJdO1xyXG4gICAgZm9yKGxldCBpPTA7aTx3YXZlVXNlZC5mcnVpdENoYW5jZS5sZW5ndGg7aSsrKXtcclxuICAgICAgbGV0IGZydWl0VG9TcGF3biA9IHdhdmVVc2VkLmZydWl0Q2hhbmNlW2ldLmZydWl0cztcclxuICAgICAgbGV0IG5GcnVpdCA9IFBoYXNlci5NYXRoLkJldHdlZW4od2F2ZVVzZWQuZnJ1aXRDaGFuY2VbaV0ubWluLHdhdmVVc2VkLmZydWl0Q2hhbmNlW2ldLm1heCk7XHJcbiAgICAgIGxldCBkZWxheSA9IHdhdmVVc2VkLmZydWl0Q2hhbmNlW2ldLmJldHdlZW47XHJcbiAgICAgIGNvbnNvbGUubG9nKCdzcGF3bmluZyB3YXZlOiAnK3dhdmVVc2VkLmlkKycgb24gaW5kZXg6ICcraSsnIGZvciAnK25GcnVpdCsnIGZydWl0cywgaW50ZXJ2YWw6ICcrZGVsYXkpO1xyXG4gICAgICBcclxuICAgICAgZm9yKGxldCBqPTA7ajxuRnJ1aXQ7aisrKXtcclxuICAgICAgICBsZXQgdG9TcGF3biA9IGZydWl0VG9TcGF3bltqJWZydWl0VG9TcGF3bi5sZW5ndGhdO1xyXG4gICAgICAgIGxldCB0aW1lU3Bhd24gPSBqKmRlbGF5KjEwMDA7XHJcbiAgICAgICAgaWYocG9zc2libGVTcGF3bi5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgcG9zc2libGVTcGF3biA9IFstMS4yLC0wLjYsMC42LDEuMl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZHhYID0gUGhhc2VyLk1hdGguQmV0d2VlbigwLHBvc3NpYmxlU3Bhd24ubGVuZ3RoLTEpO1xyXG4gICAgICAgIGxldCB4VXNlZCA9IHBvc3NpYmxlU3Bhd25baWR4WF07XHJcbiAgICAgICAgcG9zc2libGVTcGF3bi5zcGxpY2UoaWR4WCwxKTtcclxuICAgICAgICBpZih0aW1lU3Bhd249PTApe1xyXG4gICAgICAgICAgdGhpcy5mcnVpdEZhY3Rvcnkuc3Bhd25GcnVpdCh0b1NwYXduLDEwLWNvdW50ZXIqNCx4VXNlZCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAvLyBsZXQgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy8gICBpZighbWUuaGl0Qm9tYiAmJiBtZS5nYW1lU3RhdGU9PTIpe1xyXG4gICAgICAgICAgLy8gICAgIG1lLmZydWl0RmFjdG9yeS5zcGF3bkZydWl0KHRvU3Bhd24sMTAtY291bnRlcio0LHhVc2VkKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSx0aW1lU3Bhd24pO1xyXG4gICAgICAgICAgdGhpcy5mcnVpdEZhY3Rvcnkuc2NoZWR1bGVTcGF3bkZydWl0KHRvU3Bhd24sMTAtY291bnRlcio0LHhVc2VkLHRpbWVTcGF3bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgfVxyXG4gICAgICBpZih0b3RhbERlbGF5PG5GcnVpdCpkZWxheSl7XHJcbiAgICAgICAgdG90YWxEZWxheSA9IG5GcnVpdCpkZWxheTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhcnRUaW1lciA9IHdhdmVVc2VkLmRlbGF5K3RvdGFsRGVsYXkrMjtcclxuICAgIGNvbnNvbGUubG9nKCduZXh0IHRpbWVyIG9uOiAnK3RoaXMuc3RhcnRUaW1lcik7XHJcbiAgICB0aGlzLndhdmVDb3VudGVyKys7XHJcbiAgfVxyXG5cclxuICBub3RpZnlCb21iSGl0KHBvc1gscG9zWSl7XHJcbiAgICB0aGlzLmhpdEJvbWIgPSB0cnVlO1xyXG4gICAgdGhpcy5nbG93TGVkYWthbi54ID0gcG9zWDtcclxuICAgIHRoaXMuZ2xvd0xlZGFrYW4ueSA9IHBvc1k7XHJcblxyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogdGhpcy5nbG93TGVkYWthbixcclxuICAgICAgc2NhbGU6IDIwMCxcclxuICAgICAgZHVyYXRpb246IDMwMCxcclxuICAgICAgZGVsYXk6IDE1MDAsXHJcbiAgICAgIG9uU3RhcnQ6ICgpPT57XHJcbiAgICAgICAgdGhpcy5nbG93TGVkYWthbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICB0aGlzLmZydWl0RmFjdG9yeS5jbGVhckJvbWIoKTtcclxuICAgICAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgdGFyZ2V0czogdGhpcy5nbG93TGVkYWthbixcclxuICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICBkZWxheTogNTAwLFxyXG4gICAgICAgICAgYWxwaGE6IDAsXHJcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmdsb3dMZWRha2FuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5nbG93TGVkYWthbi5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvd0xlZGFrYW4uYWxwaGEgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmhpdEJvbWIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgbWUuc3RhcnRMZWRha2FuID0gZmFsc2U7XHJcbiAgICAgICAgICBtZS50aGlyZC5jYW1lcmEucG9zaXRpb24uc2V0KDAsMCwyMDApO1xyXG4gICAgICAgIH0sODAwKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIFxyXG4gICAgdGhpcy5zdGFydExlZGFrYW4gPSB0cnVlO1xyXG4gICAgdGhpcy50aW1lclN0YXJ0TGVkYWthbiA9IDA7XHJcblxyXG4gIH1cclxuXHJcbiAgVHJ5UmVzdG9yZUxpZmUoKXtcclxuICAgIGlmKHRoaXMubG9zZUNvdW50PjApe1xyXG4gICAgICAgIHRoaXMubG9zZUNvdW50LS07XHJcbiAgICAgICAgaWYoIXRoaXMuU0ZYTXV0ZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ1VJRXh0cmFMaWZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3Jvc3NMaXN0W3RoaXMubG9zZUNvdW50XS5zZXRUZXh0dXJlKCdDcm9zc0JsdWUnKTtcclxuICAgICAgICBsZXQgYmFzZVggPSB0aGlzLmNyb3NzTGlzdFt0aGlzLmxvc2VDb3VudF0ueDtcclxuICAgICAgICBsZXQgYmFzZVkgPSB0aGlzLmNyb3NzTGlzdFt0aGlzLmxvc2VDb3VudF0ueTtcclxuICAgICAgICBsZXQgdGhpc0Nyb3NzID0gdGhpcy5jcm9zc0xpc3RbdGhpcy5sb3NlQ291bnRdO1xyXG5cclxuICAgICAgICB0aGlzLnJpbmcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbXBhY3QudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yaW5nLmFscGhhID0gMTtcclxuICAgICAgICB0aGlzLmltcGFjdC5hbHBoYSA9IDE7XHJcbiAgICAgICAgdGhpcy5yaW5nLnggPSBiYXNlWCAtIHRoaXMuY3Jvc3NMaXN0W3RoaXMubG9zZUNvdW50XS53aWR0aC80O1xyXG4gICAgICAgIHRoaXMucmluZy55ID0gYmFzZVkgKyB0aGlzLmNyb3NzTGlzdFt0aGlzLmxvc2VDb3VudF0uaGVpZ2h0LzQ7XHJcbiAgICAgICAgdGhpcy5pbXBhY3QueCA9IGJhc2VYIC0gdGhpcy5jcm9zc0xpc3RbdGhpcy5sb3NlQ291bnRdLndpZHRoLzQ7XHJcbiAgICAgICAgdGhpcy5pbXBhY3QueSA9IGJhc2VZICsgdGhpcy5jcm9zc0xpc3RbdGhpcy5sb3NlQ291bnRdLmhlaWdodC80O1xyXG4gICAgICAgIHRoaXMucmluZy5zY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5pbXBhY3Quc2NhbGUgPSAxO1xyXG4gICAgICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgIHRhcmdldHM6IFt0aGlzLnJpbmcsIHRoaXMuaW1wYWN0XSxcclxuICAgICAgICAgICAgc2NhbGU6IDMsXHJcbiAgICAgICAgICAgIGFscGhhOiAwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaW5nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1wYWN0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMudHdlZW5zLnRpbWVsaW5lKHtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldHM6IHRoaXMuY3Jvc3NMaXN0W3RoaXMubG9zZUNvdW50XSxcclxuICAgICAgICAgICAgbG9vcDogMixcclxuXHJcbiAgICAgICAgICAgIHR3ZWVuczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiBiYXNlWC02LFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHk6IGJhc2VZLTYsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeTogYmFzZVkrNixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiBiYXNlWCs2LFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgICAgICAgdGhpc0Nyb3NzLnggPSBiYXNlWDtcclxuICAgICAgICAgICAgICB0aGlzQ3Jvc3MueSA9IGJhc2VZO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb3NlTGlmZShwb3NYKXtcclxuICAgIGlmKHRoaXMuZ2FtZVN0YXRlPT0yICYmICF0aGlzLmhpdEJvbWIpe1xyXG4gICAgICB0aGlzLmdldENyb3NzRnJ1aXQocG9zWCk7XHJcbiAgICAgIGlmKCF0aGlzLlNGWE11dGVkKXtcclxuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ1VJR2FuaycpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3Jvc3NMaXN0W3RoaXMubG9zZUNvdW50XS5zZXRUZXh0dXJlKCdDcm9zc1JlZCcpO1xyXG4gICAgICBsZXQgYmFzZVggPSB0aGlzLmNyb3NzTGlzdFt0aGlzLmxvc2VDb3VudF0ueDtcclxuICAgICAgbGV0IGJhc2VZID0gdGhpcy5jcm9zc0xpc3RbdGhpcy5sb3NlQ291bnRdLnk7XHJcbiAgICAgIGxldCB0aGlzQ3Jvc3MgPSB0aGlzLmNyb3NzTGlzdFt0aGlzLmxvc2VDb3VudF07XHJcblxyXG4gICAgICB0aGlzLnR3ZWVucy50aW1lbGluZSh7XHJcblxyXG4gICAgICAgIHRhcmdldHM6IHRoaXMuY3Jvc3NMaXN0W3RoaXMubG9zZUNvdW50XSxcclxuICAgICAgICBsb29wOiAyLFxyXG5cclxuICAgICAgICB0d2VlbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHg6IGJhc2VYLTYsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB5OiBiYXNlWS02LFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeTogYmFzZVkrNixcclxuICAgICAgICAgICAgZHVyYXRpb246IDUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHg6IGJhc2VYKzYsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1MFxyXG4gICAgICAgIH1cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgdGhpc0Nyb3NzLnggPSBiYXNlWDtcclxuICAgICAgICAgIHRoaXNDcm9zcy55ID0gYmFzZVk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5sb3NlQ291bnQrKztcclxuICAgICAgaWYodGhpcy5sb3NlQ291bnQ9PTMpe1xyXG4gICAgICAgIC8vdGhpcy5zeXMucGF1c2UoKTtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBzaG93UmVzdWx0KCl7XHJcbiAgICBwb2tpR2FtZVBsYXlTdG9wKCk7XHJcbiAgICB0aGlzLmJsYWRlLmNoYW5nZUN1cnJlbnRTY3JlZW4oXCJSZXN1bHRTY3JlZW5cIik7XHJcblxyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSAzO1xyXG4gICAgdGhpcy50ZXh0R2FtZW92ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnRleHRTY29yZUdhbWVvdmVyLnRleHQgPSAnJyt0aGlzLmdhbWVEYXRhLnNjb3JlO1xyXG4gICAgLy8gSDVTREsuc3VibWl0KHsgU0NPUkU6IHRoaXMuZ2FtZURhdGEuc2NvcmUgfSk7XHJcbiAgICBpZighdGhpcy5TRlhNdXRlZCl7XHJcbiAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdVSUdhbWVPdmVyJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdhbWVwbGF5QmdtLnN0b3AoKTtcclxuICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgIHRhcmdldHM6IHRoaXMudGV4dEdhbWVvdmVyLFxyXG4gICAgICBzY2FsZTogMSxcclxuICAgICAgZWFzZTogJ0JhY2snLFxyXG4gICAgICBlYXNlUGFyYW1zOiBbIDEuNSBdLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgdGFyZ2V0czogdGhpcy5jb250R2FtZXBsYXlVSSxcclxuICAgICAgICAgIHk6IC0yMDAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgZGVsYXk6IDUwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0aGlzLnRleHRHYW1lb3ZlcixcclxuICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5nYW1lb3ZlclRvcC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5nYW1lb3ZlclRvcC55ID0gLTIwMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2hvbGVQb3B1cEdhbWVvdmVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZih0aGlzLmdhbWVEYXRhLmJlc3QgPT0gdGhpcy5nYW1lRGF0YS5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0Jlc3RUZXh0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3QmVzdFRleHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMud2hvbGVQb3B1cEdhbWVvdmVyLnkgPSAtNTAwO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAvLyAgIHRhcmdldHM6IHRoaXMuZ2FtZW92ZXJUb3AsXHJcbiAgICAgICAgICAgIC8vICAgeTogMCxcclxuICAgICAgICAgICAgLy8gICBkdXJhdGlvbjogNTAwXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgICAgICAgIHRhcmdldHM6IHRoaXMud2hvbGVQb3B1cEdhbWVvdmVyLFxyXG4gICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcclxuICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSA0O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbmVSaW5nUEEudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW5lU2hhZG93UmluZ1BBLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbmVSaW5nUXVpdC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nUXVpdC52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblF1aXQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblJldHJ5LnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnBvc2l0aW9uRnJ1aXRVSSgnQUdVSScsLTMsLTMuNSwwLjg1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnBvc2l0aW9uRnJ1aXRVSSgnQlVJJywzLC0zLjUsMC44NSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVSaW5nRnJ1aXRUd2VlbkFwcGVhcih0aGlzLnBsYW5lUmluZ1BBLHRoaXMucGxhbmVTaGFkb3dSaW5nUEEsdGhpcy5mcnVpdEZhY3RvcnkuZ2V0RnJ1aXQoJ0FHVUknKSwwLjg1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUmluZ0ZydWl0VHdlZW5BcHBlYXIodGhpcy5wbGFuZVJpbmdRdWl0LHRoaXMucGxhbmVTaGFkb3dSaW5nUXVpdCx0aGlzLmZydWl0RmFjdG9yeS5nZXRGcnVpdCgnQlVJJyksMC42NSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjYWxsQ29tbWVyY2lhbEJyZWFrKCk7XHJcbiAgfVxyXG5cclxuICBleGl0U2V0dGluZ3MoKXtcclxuICAgIHRoaXMuc2hvd0NyZWRpdCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlUmluZ1R3ZWVuRGlzYXBwZWFyKHRoaXMucGxhbmVSaW5nQmFjayx0aGlzLnBsYW5lU2hhZG93UmluZ0JhY2spO1xyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgICB0YXJnZXRzOiB0aGlzLmF1ZGlvUG9wdXAsXHJcbiAgICAgICAgeDogODAwLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICB9KTtcclxuICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgdGFyZ2V0czogW3RoaXMuY3JlZGl0c1BvcHVwLHRoaXMudGV4dFZlcnNpXSxcclxuICAgICAgICB4OiAtMjAwMCxcclxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmZydWl0RmFjdG9yeS5yZXNldFdhdGVyTWVsb25VSSgnQlVJJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWRpdHNQb3B1cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Qb3B1cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dFZlcnNpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ib21lc2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIG1vdmVUb0hvbWVzY3JlZW4oKXtcclxuICAgIHRoaXMucmVzZXRHYW1lcGxheSgpO1xyXG4gICAgdGhpcy5wbGFuZVJpbmdQQS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZ1BBLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGxhbmVSaW5nUXVpdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBsYW5lU2hhZG93UmluZ1F1aXQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5ob21lQW5pbWF0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmZydWl0RmFjdG9yeS5yZXNldFdhdGVyTWVsb25VSSgnQUdVSScpO1xyXG4gICAgdGhpcy5mcnVpdEZhY3RvcnkucmVzZXRXYXRlck1lbG9uVUkoJ0JVSScpO1xyXG4gICAgaWYodGhpcy5nYW1lU3RhdGUhPTApe1xyXG4gICAgICAgIGlmKCF0aGlzLkJHTU11dGVkKXtcclxuICAgICAgICAgICAgdGhpcy5ob21lc2NyZWVuQmdtLnBsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIHRhcmdldHM6IHRoaXMuaG9tZXNjcmVlbkJnbSxcclxuICAgICAgICAgICAgICAgIHZvbHVtZTogMSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogdGhpcy53aG9sZVBvcHVwR2FtZW92ZXIsXHJcbiAgICAgIHk6IC01MDAsXHJcbiAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gLTE7XHJcblxyXG4gICAgICAgIHRoaXMucGxhbmVSaW5nLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGxhbmVSaW5nU2V0dGluZ3MudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wbGFuZVNoYWRvd1JpbmdTZXR0aW5ncy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgICAgIHRhcmdldHM6IHRoaXMudG9wSG9tZXNjcmVlbixcclxuICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ob21lQW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVSaW5nRnJ1aXRUd2VlbkFwcGVhcih0aGlzLnBsYW5lUmluZyx0aGlzLnBsYW5lU2hhZG93UmluZyx0aGlzLmZydWl0RmFjdG9yeS5nZXRGcnVpdCgnV01VSScpLDAuODUpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUmluZ0ZydWl0VHdlZW5BcHBlYXIodGhpcy5wbGFuZVJpbmdTZXR0aW5ncyx0aGlzLnBsYW5lU2hhZG93UmluZ1NldHRpbmdzLHRoaXMuZnJ1aXRGYWN0b3J5LmdldEZydWl0KCdLV1VJJyksMC44NSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uQ2xhc3NpYy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuYnV0dG9uU2V0dGluZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuYnV0dG9uQmFjay52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmJ1dHRvblF1aXQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5idXR0b25SZXRyeS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgbW92ZVRvU2V0dGluZ3MoKXtcclxuICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgIHRhcmdldHM6IHRoaXMudG9wSG9tZXNjcmVlbixcclxuICAgICAgeTogLTUwMCxcclxuICAgICAgZHVyYXRpb246IDI1MFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jcmVkaXRzUG9wdXAudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLmF1ZGlvUG9wdXAudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnRleHRWZXJzaS52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuaG9sZENoZWNrVUkgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uQ2xhc3NpYy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmJ1dHRvblNldHRpbmcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBcclxuICAgIHRoaXMuY3JlYXRlUmluZ0ZydWl0VHdlZW5EaXNhcHBlYXIodGhpcy5wbGFuZVJpbmcsdGhpcy5wbGFuZVNoYWRvd1JpbmcsdGhpcy5mcnVpdEZhY3RvcnkuZ2V0RnJ1aXQoJ1dNVUknKSk7XHJcbiAgICB0aGlzLmNyZWF0ZVJpbmdUd2VlbkRpc2FwcGVhcih0aGlzLnBsYW5lUmluZ1NldHRpbmdzLHRoaXMucGxhbmVTaGFkb3dSaW5nU2V0dGluZ3MpO1xyXG5cclxuICAgIHRoaXMuY3JlZGl0c1BvcHVwLnggPSAtMjAwMDtcclxuICAgIHRoaXMudGV4dFZlcnNpLnggPSAtMTU1MDtcclxuXHJcbiAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgIHRhcmdldHM6IHRoaXMudGV4dFZlcnNpLFxyXG4gICAgICAgIHg6IDQ1MCxcclxuICAgICAgICBkdXJhdGlvbjogNTAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmF1ZGlvUG9wdXAueCA9IDgwMDtcclxuICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgdGFyZ2V0czogW3RoaXMuY3JlZGl0c1BvcHVwLHRoaXMuYXVkaW9Qb3B1cF0sXHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnJlc2V0V2F0ZXJNZWxvblVJKCdLV1VJJyk7IFxyXG4gICAgICAgICAgICB0aGlzLmZydWl0RmFjdG9yeS5yZXNldFdhdGVyTWVsb25VSSgnV01VSScpOyBcclxuICAgICAgICAgICAgdGhpcy5kZWxheVNjcm9sbENyZWRpdCA9IDEwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NyZWRpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZENoZWNrVUkgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5jcmVkaXRUd2Vlbi5wbGF5KCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudENyZDIueSA9IDUwMDtcclxuICAgICAgICAgICAgLy90aGlzLmNyZWRpdFR3ZWVuMi5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYW5lUmluZ0JhY2sudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbmVTaGFkb3dSaW5nQmFjay52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcnVpdEZhY3RvcnkucG9zaXRpb25GcnVpdFVJKCdCVUknLDcuNSwtMy41LDAuNjUpOyBcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSaW5nRnJ1aXRUd2VlbkFwcGVhcih0aGlzLnBsYW5lUmluZ0JhY2ssdGhpcy5wbGFuZVNoYWRvd1JpbmdCYWNrLHRoaXMuZnJ1aXRGYWN0b3J5LmdldEZydWl0KCdCVUknKSwwLjY1KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbkJhY2sudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgLy8gdGhpcy5nYW1lU3RhdGUgPSAtMjtcclxuICB9XHJcblxyXG4gIG1vdmVUb0dhbWVwbGF5KCl7XHJcbiAgICBwb2tpR2FtZVBsYXlTdGFydGVkKCk7XHJcblxyXG4gICAgdGhpcy5idXR0b25DbGFzc2ljLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuYnV0dG9uU2V0dGluZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLndhdmVDb3VudGVyID0gMDtcclxuICAgIHRoaXMuaGl0Qm9tYiA9IGZhbHNlO1xyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSAxO1xyXG4gICAgdGhpcy5ob2xkQ2hlY2tVSSA9IHRydWU7XHJcbiAgICBpZighdGhpcy5CR01NdXRlZCl7XHJcbiAgICAgICAgdGhpcy5nYW1lcGxheUJnbS5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIHRoaXMuaG9tZXNjcmVlbkJnbS5zdG9wKCk7XHJcbiAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgIHRhcmdldHM6IHRoaXMuaG9tZXNjcmVlbkJnbSxcclxuICAgICAgICB2b2x1bWU6IDAsXHJcbiAgICAgICAgZHVyYXRpb246IDUwMCxcclxuICAgICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmhvbWVzY3JlZW5CZ20uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRDaGVja1VJID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZighdGhpcy5TRlhNdXRlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ1VJR2FtZVN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuY3JlYXRlUmluZ0ZydWl0VHdlZW5EaXNhcHBlYXIodGhpcy5wbGFuZVJpbmdTZXR0aW5ncyx0aGlzLnBsYW5lU2hhZG93UmluZ1NldHRpbmdzLHRoaXMuZnJ1aXRGYWN0b3J5LmdldEZydWl0KCdLV1VJJykpO1xyXG4gICAgdGhpcy5jcmVhdGVSaW5nVHdlZW5EaXNhcHBlYXIodGhpcy5wbGFuZVJpbmcsdGhpcy5wbGFuZVNoYWRvd1JpbmcpO1xyXG4gICAgdGhpcy50ZXh0UmVhZHkudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy50ZXh0QmVzdC52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMudGV4dEJlc3RHcmVlbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICB0YXJnZXRzOiB0aGlzLnRvcEhvbWVzY3JlZW4sXHJcbiAgICAgIHk6IC01MDAsXHJcbiAgICAgIGR1cmF0aW9uOiAyNTBcclxuICAgIH0pO1xyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogdGhpcy50ZXh0UmVhZHksXHJcbiAgICAgIHk6ICctPTI1MCcsXHJcbiAgICAgIGFscGhhOiAxLFxyXG4gICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICBkZWxheTogNTAwLFxyXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgICAgIHRhcmdldHM6IHRoaXMuY29udEdhbWVwbGF5VUksXHJcbiAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0aGlzLnRleHRSZWFkeSxcclxuICAgICAgICAgIHk6ICctPTI1MCcsXHJcbiAgICAgICAgICBhbHBoYTogMCxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyNTAsXHJcbiAgICAgICAgICBkZWxheTogMjAwLFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRleHRHby52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcnVpdEZhY3RvcnkucmVzZXRXYXRlck1lbG9uVUkoJ1dNVUknKTtcclxuICAgICAgICAgICAgdGhpcy5mcnVpdEZhY3RvcnkucmVzZXRXYXRlck1lbG9uVUkoJ0tXVUknKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0czogdGhpcy50ZXh0R28sXHJcbiAgICAgICAgICAgICAgeTogJy09MjUwJyxcclxuICAgICAgICAgICAgICBhbHBoYTogMSxcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwLFxyXG4gICAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHRoaXMudGV4dEdvLFxyXG4gICAgICAgICAgICAgICAgICB5OiAnLT0yNTAnLFxyXG4gICAgICAgICAgICAgICAgICBhbHBoYTogMCxcclxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcclxuICAgICAgICAgICAgICAgICAgZGVsYXk6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHNsaWNlZCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVXb29kQm9yZGVyKHgseSx3LGgscHgscHkpe1xyXG4gICAgbGV0IGNvbnRCb3JkZXIgPSB0aGlzLmFkZC5jb250YWluZXIoeCt3Ki1weCx5K2gqLXB5KTtcclxuICAgIGxldCB0b3BMZWZ0ID0gdGhpcy5hZGQuaW1hZ2UoMCwwLCdCb3JkZXJXb29kVEwnKTtcclxuICAgIHRvcExlZnQuc2V0T3JpZ2luKDAsMCk7XHJcbiAgICBsZXQgdG9wUmlnaHQgPSB0aGlzLmFkZC5pbWFnZSh3LTcwLDAsJ0JvcmRlcldvb2RUUicpO1xyXG4gICAgdG9wUmlnaHQuc2V0T3JpZ2luKDAsMCk7XHJcbiAgICBsZXQgdG9wID0gdGhpcy5hZGQuaW1hZ2UoNzAsMCwnQm9yZGVyV29vZFQnKTtcclxuICAgIHRvcC5zZXRPcmlnaW4oMCwwKTtcclxuICAgIHRvcC5zY2FsZVggPSAody0xNDApLzExNjtcclxuXHJcbiAgICBsZXQgYm90dG9tTGVmdCA9IHRoaXMuYWRkLmltYWdlKDAsaC03MCwnQm9yZGVyV29vZEJMJyk7XHJcbiAgICBib3R0b21MZWZ0LnNldE9yaWdpbigwLDApO1xyXG4gICAgbGV0IGJvdHRvbVJpZ2h0ID0gdGhpcy5hZGQuaW1hZ2Uody03MCxoLTcwLCdCb3JkZXJXb29kQlInKTtcclxuICAgIGJvdHRvbVJpZ2h0LnNldE9yaWdpbigwLDApO1xyXG4gICAgbGV0IGJvdHRvbSA9IHRoaXMuYWRkLmltYWdlKDcwLGgtNzAsJ0JvcmRlcldvb2RCJylcclxuICAgIGJvdHRvbS5zZXRPcmlnaW4oMCwwKTtcclxuICAgIGJvdHRvbS5zY2FsZVggPSAody0xNDApLzExNjtcclxuXHJcbiAgICBsZXQgbGVmdCA9IHRoaXMuYWRkLmltYWdlKDAsNzAsJ0JvcmRlcldvb2RMJyk7XHJcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmFkZC5pbWFnZSh3LTcwLDcwLCdCb3JkZXJXb29kUicpO1xyXG4gICAgbGVmdC5zY2FsZVkgPSAoaC0xNDApLzExNjtcclxuICAgIHJpZ2h0LnNjYWxlWSA9IChoLTE0MCkvMTE2O1xyXG4gICAgbGVmdC5zZXRPcmlnaW4oMCwwKTtcclxuICAgIHJpZ2h0LnNldE9yaWdpbigwLDApO1xyXG5cclxuICAgIGNvbnRCb3JkZXIuYWRkKHRvcExlZnQpO1xyXG4gICAgY29udEJvcmRlci5hZGQodG9wUmlnaHQpO1xyXG4gICAgY29udEJvcmRlci5hZGQodG9wKTtcclxuICAgIGNvbnRCb3JkZXIuYWRkKGJvdHRvbUxlZnQpO1xyXG4gICAgY29udEJvcmRlci5hZGQoYm90dG9tUmlnaHQpO1xyXG4gICAgY29udEJvcmRlci5hZGQoYm90dG9tKTtcclxuXHJcbiAgICBjb250Qm9yZGVyLmFkZChsZWZ0KTtcclxuICAgIGNvbnRCb3JkZXIuYWRkKHJpZ2h0KTtcclxuXHJcbiAgICBjb250Qm9yZGVyLnNldFNjYWxlKDEuNSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRCb3JkZXI7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVzZXRHYW1lcGxheSgpe1xyXG4gICAgdGhpcy5sb3NlQ291bnQgPSAwO1xyXG4gICAgdGhpcy5jb250R2FtZXBsYXlVSS55ID0gLTIwMDtcclxuICAgIHRoaXMudGV4dFJlYWR5LnkgPSA1NjA7XHJcbiAgICB0aGlzLnRleHRHby55ID0gNTYwO1xyXG4gICAgdGhpcy5jcm9zc0xpc3RbMF0uc2V0VGV4dHVyZSgnQ3Jvc3NCbHVlJyk7XHJcbiAgICB0aGlzLmNyb3NzTGlzdFsxXS5zZXRUZXh0dXJlKCdDcm9zc0JsdWUnKTtcclxuICAgIHRoaXMuY3Jvc3NMaXN0WzJdLnNldFRleHR1cmUoJ0Nyb3NzQmx1ZScpO1xyXG4gICAgdGhpcy5nYW1lRGF0YS5zY29yZSA9IDA7XHJcbiAgICB0aGlzLmdhbWVEYXRhLmRpc3BsYXlTY29yZSA9IDA7XHJcbiAgICB0aGlzLnRleHRTY29yZS50ZXh0ID0gJycrdGhpcy5nYW1lRGF0YS5zY29yZTtcclxuICB9XHJcblxyXG4gIGhpZGVSZXN1bHRzKCl7XHJcbiAgICB0aGlzLnJlc2V0R2FtZXBsYXkoKTtcclxuICAgIHRoaXMuZ2FtZVN0YXRlID0gNTtcclxuICAgIGlmKHRoaXMudGlwZUFkcz09J2dhbWVwbGF5Jyl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVSaW5nVHdlZW5EaXNhcHBlYXIodGhpcy5wbGFuZVJpbmdQQSx0aGlzLnBsYW5lU2hhZG93UmluZ1BBKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVJpbmdGcnVpdFR3ZWVuRGlzYXBwZWFyKHRoaXMucGxhbmVSaW5nUXVpdCx0aGlzLnBsYW5lU2hhZG93UmluZ1F1aXQsdGhpcy5mcnVpdEZhY3RvcnkuZ2V0RnJ1aXQoJ0JVSScpKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUmluZ0ZydWl0VHdlZW5EaXNhcHBlYXIodGhpcy5wbGFuZVJpbmdQQSx0aGlzLnBsYW5lU2hhZG93UmluZ1BBLHRoaXMuZnJ1aXRGYWN0b3J5LmdldEZydWl0KCdBR1VJJykpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUmluZ1R3ZWVuRGlzYXBwZWFyKHRoaXMucGxhbmVSaW5nUXVpdCx0aGlzLnBsYW5lU2hhZG93UmluZ1F1aXQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgIHRhcmdldHM6IHRoaXMud2hvbGVQb3B1cEdhbWVvdmVyLFxyXG4gICAgICB5OiAtNTAwLFxyXG4gICAgICBkdXJhdGlvbjogMjUwLFxyXG4gICAgICBvbkNvbXBsZXRlOiAoKT0+e1xyXG4gICAgICAgIHRoaXMuZnJ1aXRGYWN0b3J5LnJlc2V0V2F0ZXJNZWxvblVJKCdCVUknKTtcclxuICAgICAgICAvLyB0aGlzLm1vdmVUb0dhbWVwbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVwbGF5R2FtZSgpe1xyXG5cclxuICAgIHRoaXMucmVzZXRHYW1lcGxheSgpO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlUmluZ1R3ZWVuRGlzYXBwZWFyKHRoaXMucGxhbmVSaW5nUEEsdGhpcy5wbGFuZVNoYWRvd1JpbmdQQSk7XHJcbiAgICB0aGlzLmNyZWF0ZVJpbmdGcnVpdFR3ZWVuRGlzYXBwZWFyKHRoaXMucGxhbmVSaW5nUXVpdCx0aGlzLnBsYW5lU2hhZG93UmluZ1F1aXQsdGhpcy5mcnVpdEZhY3RvcnkuZ2V0RnJ1aXQoJ0JVSScpKTtcclxuICAgIFxyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogdGhpcy53aG9sZVBvcHVwR2FtZW92ZXIsXHJcbiAgICAgIHk6IC01MDAsXHJcbiAgICAgIGR1cmF0aW9uOiAyNTAsXHJcbiAgICAgIG9uQ29tcGxldGU6ICgpPT57XHJcbiAgICAgICAgdGhpcy5mcnVpdEZhY3RvcnkucmVzZXRXYXRlck1lbG9uVUkoJ0JVSScpO1xyXG4gICAgICAgIC8vIHRoaXMubW92ZVRvR2FtZXBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHRvb2dsZU11c2ljKCl7XHJcbiAgICB0aGlzLkJHTU11dGVkID0gIXRoaXMuQkdNTXV0ZWQ7XHJcbiAgICBpZih0aGlzLkJHTU11dGVkKXtcclxuICAgICAgICB0aGlzLmJ1dHRvbkJHTS5zZXRUZXh0dXJlKCdCdXR0b25NdXNpY011dGUnKTtcclxuICAgICAgICB0aGlzLmhvbWVzY3JlZW5CZ20uc3RvcCgpO1xyXG4gICAgICAgIFxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgdGhpcy5idXR0b25CR00uc2V0VGV4dHVyZSgnQnV0dG9uTXVzaWMnKTtcclxuICAgICAgICB0aGlzLmhvbWVzY3JlZW5CZ20ucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHRvb2dsZVNGWCgpe1xyXG4gICAgdGhpcy5TRlhNdXRlZCA9ICF0aGlzLlNGWE11dGVkO1xyXG4gICAgaWYodGhpcy5TRlhNdXRlZCl7XHJcbiAgICAgICAgdGhpcy5idXR0b25TRlguc2V0VGV4dHVyZSgnQnV0dG9uU0ZYTXV0ZScpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgdGhpcy5idXR0b25TRlguc2V0VGV4dHVyZSgnQnV0dG9uU0ZYJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBPblBvaW50ZXJEb3duKHBvaW50ZXIpe1xyXG4gICAgdGhpcy5zdGFydE1vdmluZ0JsYWRlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIE9uUG9pbnRlck1vdmUocG9pbnRlcil7XHJcbiAgICBpZih0aGlzLnN0YXJ0TW92aW5nQmxhZGUgJiYgIXRoaXMuaGl0Qm9tYiAmJiAhdGhpcy5ob2xkQ3JlZGl0KXtcclxuICAgICAgdGhpcy5ibGFkZS5wdXNoUG9pbnQoe1xyXG4gICAgICAgICAgICB4OiBwb2ludGVyLngsXHJcbiAgICAgICAgICAgIHk6IHBvaW50ZXIueSxcclxuICAgICAgICAgICAgdGltZTogNi4wLFxyXG4gICAgICAgICAgICBmaXJzdDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIE9uUG9pbnRlclVwKHBvaW50ZXIpe1xyXG4gICAgICB0aGlzLnN0YXJ0TW92aW5nQmxhZGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNob3dBZHModGlwZSl7Ly8wMzA4MjAyMVxyXG4gICAgICAgIHRoaXMudGlwZUFkcyA9IHRpcGU7XHJcbiAgICAgICAgaWYoIXRoaXMuc3RhcnRTaG93QWRzKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNob3dBZHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyQWRzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5hZHNTaG93aW5nID0gZmFsc2U7ICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzaG93QWRzIFwiK3RpcGUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2hvd0FkcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZih0aGlzLnRpcGVBZHM9PVwiaG9tZXNjcmVlblwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvSG9tZXNjcmVlbigpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnRpcGVBZHM9PVwiZ2FtZXBsYXlcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb0dhbWVwbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYWRCcmVhayh7IFxyXG4gICAgICAgICAgICAvLyAgICAgdHlwZTogJ25leHQnLFxyXG4gICAgICAgICAgICAvLyAgICAgbmFtZTogJ25leHQtZ2FtZScsXHJcbiAgICAgICAgICAgIC8vICAgICBiZWZvcmVBZDogKCkgPT4geyBcclxuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImJlZm9yZUJyZWFrXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuYWRzU2hvd2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gY2FsbEFuYWx5dGljcyhcIlNIT1dfQURTX0lOVEVSU1RJVElBTFwiKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICBhZnRlckFkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydFNob3dBZHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnRpcGVBZHM9PVwiaG9tZXNjcmVlblwiKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ib21lc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy50aXBlQWRzPT1cImdhbWVwbGF5XCIpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLm1vdmVUb0dhbWVwbGF5KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBwb2tpR2FtZUxvYWRpbmdGaW5pc2hlZCgpe1xyXG4gIC8vIGZpcmUgbG9hZGluZyBmdW5jdGlvbiBnYW1lTG9hZGluZ0ZpbmlzaGVkKClcclxuICBQb2tpU0RLLmdhbWVMb2FkaW5nRmluaXNoZWQoKTtcclxuICBjb25zb2xlLmxvZyhcIioqKiBQb2tpIC0gR2FtZSBMb2FkaW5nIEZpbmlzaGVkXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBva2lHYW1lUGxheVN0YXJ0ZWQoKXtcclxuICAvLyBmaXJzdCBsZXZlbCBsb2FkcywgcGxheWVyIGNsaWNrcyBhbnl3aGVyZVxyXG4gIFBva2lTREsuZ2FtZXBsYXlTdGFydCgpO1xyXG4gIGNvbnNvbGUubG9nKFwiKioqIFBva2kgLSBQbGF5ZXIgU3RhcnRlZCB0aGUgR2FtZVwiKTtcclxuICAvLyBwbGF5ZXIgaXMgcGxheWluZ1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb2tpR2FtZVBsYXlTdG9wKCl7XHJcbiAgLy8gcGxheWVyIGxvc2VzIHJvdW5kXHJcbiAgUG9raVNESy5nYW1lcGxheVN0b3AoKTtcclxuICBjb25zb2xlLmxvZyhcIioqKiBQb2tpIC0gR2FtZSBQbGF5IFN0b3BcIik7XHJcbiAgLy8gZ2FtZSBvdmVyIHNjcmVlbiBwb3BzIHVwXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBva2lDb21tZXJjaWFsQnJlYWsoKXtcclxuICBjb25zb2xlLmxvZyhcIioqKiBQb2tpIC0gQ29tbWVyY2lhbEJyZWFrIHN0YXJ0ZWRcIik7XHJcbiAgLy8gcGF1c2UgeW91ciBnYW1lIGhlcmUgaWYgaXQgaXNuJ3QgYWxyZWFkeVxyXG4gIFBva2lTREsuY29tbWVyY2lhbEJyZWFrKCgpID0+IHtcclxuICAgICAgLy8geW91IGNhbiBwYXVzZSBhbnkgYmFja2dyb3VuZCBtdXNpYyBvciBvdGhlciBhdWRpbyBoZXJlXHJcbiAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiKioqIFBva2kgLSBDb21tZXJjaWFsIGJyZWFrIGZpbmlzaGVkLCBwcm9jZWVkaW5nIHRvIGdhbWVcIik7XHJcbiAgICAgIC8vIGlmIHRoZSBhdWRpbyB3YXMgcGF1c2VkIHlvdSBjYW4gcmVzdW1lIGl0IGhlcmUgKGtlZXAgaW4gbWluZCB0aGF0IHRoZSBmdW5jdGlvbiBhYm92ZSB0byBwYXVzZSBpdCBtaWdodCBub3QgYWx3YXlzIGdldCBjYWxsZWQpXHJcbiAgICAgIC8vIGNvbnRpbnVlIHlvdXIgZ2FtZSBoZXJlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGxDb21tZXJjaWFsQnJlYWsoKXtcclxuICBzZXRUaW1lb3V0KFxyXG4gICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBva2lDb21tZXJjaWFsQnJlYWsoKTtcclxuICAgIH0sIDI1MDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb2tpUmV3YXJkQnJlYWQoKXtcclxuICBjb25zb2xlLmxvZyhcIioqKiBQb2tpIC0gUmV3YXJkIEJyZWFrIFN0YXJ0ZWRcIilcclxuXHJcbiAgLy8gcGF1c2UgeW91ciBnYW1lIGhlcmUgaWYgaXQgaXNuJ3QgYWxyZWFkeVxyXG4gIFBva2lTREsucmV3YXJkZWRCcmVhaygoKSA9PiB7XHJcbiAgICAvLyB5b3UgY2FuIHBhdXNlIGFueSBiYWNrZ3JvdW5kIG11c2ljIG9yIG90aGVyIGF1ZGlvIGhlcmVcclxuICB9KS50aGVuKChzdWNjZXNzKSA9PiB7XHJcbiAgICAgIGlmKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgIC8vIHZpZGVvIHdhcyBkaXNwbGF5ZWQsIGdpdmUgcmV3YXJkXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB2aWRlbyBub3QgZGlzcGxheWVkLCBzaG91bGQgbm90IGdpdmUgcmV3YXJkXHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgdGhlIGF1ZGlvIHdhcyBwYXVzZWQgeW91IGNhbiByZXN1bWUgaXQgaGVyZSAoa2VlcCBpbiBtaW5kIHRoYXQgdGhlIGZ1bmN0aW9uIGFib3ZlIHRvIHBhdXNlIGl0IG1pZ2h0IG5vdCBhbHdheXMgZ2V0IGNhbGxlZClcclxuICAgICAgY29uc29sZS5sb2coXCIqKiogUG9raSAtIFJld2FyZGVkIGJyZWFrIGZpbmlzaGVkLCBwcm9jZWVkaW5nIHRvIGdhbWVcIik7XHJcbiAgICAgIC8vIGNvbnRpbnVlIHlvdXIgZ2FtZSBoZXJlXHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGNhbGxSZXdhcmRCcmVhaygpe1xyXG4gICAgc2V0VGltZW91dChcclxuICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcG9raVJld2FyZEJyZWFkKCk7XHJcbiAgICAgIH0sIDI1MDApO1xyXG4gIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZGluZ1NjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKHsga2V5OiAnUHJlbG9hZGluZ1NjZW5lJyB9KVxyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpe1xyXG4gIFx0dGhpcy5sb2FkLmltYWdlKCdzcGxhc2gnLCdhc3NldHMvc3BsYXNoL3NwbGFzaCBzY3JlZW4ucG5nJyk7XHJcbiAgXHR0aGlzLmxvYWQuaW1hZ2UoJ2xvYWRCYXJJc2knLCdhc3NldHMvc3BsYXNoL0xvYWRpbmdCYXIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvYWRpbmdUZXh0JywnYXNzZXRzL3NwbGFzaC9sb2FkaW5nIHRleHQucG5nJyk7XHJcblxyXG4gICAgY2hlY2tNb2RlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcImdhbWVNb2RlIFwiK2dhbWVNb2RlKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpe1xyXG4gIFx0dGhpcy5zY2VuZS5zdGFydCgnUHJlbG9hZFNjZW5lJyk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuZ2FtZU1vZGUgPSBcIm5vcm1hbFwiO1xyXG5nbG9iYWwuR0FNRU1PREVfVE9VUk5BTUVOVCA9ICd0b3VybmFtZW50JztcclxuZ2xvYmFsLkdBTUVNT0RFX05PUk1BTCA9ICdub3JtYWwnO1xyXG5cclxuZnVuY3Rpb24gY2hlY2tNb2RlKCl7XHJcbiAgdmFyIGxpbmsgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICBpZihsaW5rLmluY2x1ZGVzKFwiI3RvdXJuYW1lbnRcIikpe1xyXG4gICAgZ2FtZU1vZGUgPSBHQU1FTU9ERV9UT1VSTkFNRU5UO1xyXG4gIH1lbHNle1xyXG4gICAgZ2FtZU1vZGUgPSBHQU1FTU9ERV9OT1JNQUw7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZFNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKHsga2V5OiAnUHJlbG9hZFNjZW5lJyB9KVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpe1xyXG4gICAgdGhpcy5maW5pc2hGb250ID0gdHJ1ZTtcclxuICAgIHRoaXMuZmluaXNoQmFyID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG4gICAgLy8gaWYoZ2FtZU1vZGUhPUdBTUVNT0RFX1RPVVJOQU1FTlQpe1xyXG4gICAgLy8gICAgIGFkQ29uZmlnKHtwcmVsb2FkQWRCcmVha3M6ICdvbid9KTsvLzAzMDgyMDIxXHJcbiAgICAvLyB9XHJcbiAgICAvLyBINVNESy5pbml0KCk7XHJcbiAgICB0aGlzLmFkZC5pbWFnZSg2NDAsMzg0LCdzcGxhc2gnKTtcclxuXHJcbiAgICB0aGlzLmNhbWVyYXMubWFpbi5zZXRCYWNrZ3JvdW5kQ29sb3IoJyMwMDAwMDAnKTtcclxuICAgIFxyXG5cclxuICAgIHZhciBwcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XHJcbiAgICB2YXIgcHJvZ3Jlc3NCb3ggPSB0aGlzLmFkZC5ncmFwaGljcygpO1xyXG4gICAgXHJcbiAgICB2YXIgaHRleHQgPSA3NjgtNzA7XHJcbiAgICB2YXIgaGxvYWRpbmcgPSBodGV4dCsyMDtcclxuICAgIHZhciB3YmFyID0gNTAwLCBwZXJzZW4gPSB3YmFyLTI7XHJcbiAgICB2YXIgcmVjdCA9IG5ldyBQaGFzZXIuR2VvbS5SZWN0YW5nbGUoMTI4MC8yLXdiYXIvMiwgaGxvYWRpbmcsIHdiYXIsIDQwKTsvL3gseSx3LGhcclxuICAgIHZhciBwcm9ncmVzc0JveCA9IHRoaXMuYWRkLmdyYXBoaWNzKHsgZmlsbFN0eWxlOiB7IGNvbG9yOiAweDM2MmYyZCAsYWxwaGE6MH0gfSk7XHJcbiAgICAvLyBwcm9ncmVzc0JveC5maWxsUmVjdFNoYXBlKHJlY3QpO1xyXG4gICAgbGV0IGlzaUJhciA9IHRoaXMuYWRkLmltYWdlKHJlY3QueCxyZWN0LnkrMSwnbG9hZEJhcklzaScpO1xyXG4gICAgaXNpQmFyLnNldE9yaWdpbigwLDApO1xyXG4gICAgLy8gcHJvZ3Jlc3NCYXIuZmlsbFN0eWxlKDB4REE0QzAwLCAxKTtcclxuICAgIC8vIHByb2dyZXNzQmFyLmZpbGxSZWN0KHJlY3QueCsyLCBobG9hZGluZywgd2JhciwgMTYpO1xyXG4gICAgLy8gcHJvZ3Jlc3NCYXIuZmlsbFN0eWxlKDB4OTQ0RDAwLCAxKTtcclxuICAgIC8vIHByb2dyZXNzQmFyLmZpbGxSZWN0KHJlY3QueCsyLCBobG9hZGluZysxNiwgd2JhciwgMTYpO1xyXG4gICAgcHJvZ3Jlc3NCb3gubGluZVN0eWxlKDUsIDB4MjkwQTA3KTtcclxuICAgIHByb2dyZXNzQm94LmxpbmVCZXR3ZWVuKHJlY3QueC0zLCByZWN0LnksIHJlY3QueCArIHJlY3Qud2lkdGgrMywgcmVjdC55KTsvL2F0YXNcclxuICAgIHByb2dyZXNzQm94LmxpbmVCZXR3ZWVuKHJlY3QueCwgcmVjdC55LCByZWN0LngsIHJlY3QueSArIHJlY3QuaGVpZ2h0LTUpOy8va2lyaVxyXG4gICAgcHJvZ3Jlc3NCb3gubGluZUJldHdlZW4ocmVjdC54LTMsIHJlY3QueSArIHJlY3QuaGVpZ2h0LTUsIHJlY3QueCArIHJlY3Qud2lkdGgrMywgcmVjdC55ICsgcmVjdC5oZWlnaHQtNSk7Ly9iYXdhaFxyXG4gICAgcHJvZ3Jlc3NCb3gubGluZUJldHdlZW4ocmVjdC54K3JlY3Qud2lkdGgsIHJlY3QueSwgcmVjdC54K3JlY3Qud2lkdGgsIHJlY3QueSArIHJlY3QuaGVpZ2h0LTUpOy8va2FuYW5cclxuXHJcbiAgICAvLyB2YXIgbG9hZGluZ1RleHQgPSB0aGlzLmFkZC50ZXh0KFxyXG4gICAgLy8gICAgIHJlY3QueCt3YmFyLzIsIGh0ZXh0LCdMb2FkaW5nLi4uJyxcclxuICAgIC8vICAgICB7Zm9udEZhbWlseTpcImdhbmdvZmNoaW5lc2VcIiwgZm9udFNpemU6XCIyOHB0XCIsIGNvbG9yOicjZmZmJ31cclxuICAgIC8vICAgKTtcclxuICAgIC8vIGxvYWRpbmdUZXh0LnNldE9yaWdpbigwLjUsIDEpO1xyXG4gICAgdmFyIGxvYWRpbmdUZXh0ID0gdGhpcy5hZGQuaW1hZ2UocmVjdC54K3diYXIvMixodGV4dCsxOCwnbG9hZGluZ1RleHQnKTtcclxuICAgIGxvYWRpbmdUZXh0LnNldE9yaWdpbigwLjUsMSk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uKCdsb2FkZXJyb3InLGZ1bmN0aW9uKGZpbGUpe1xyXG4gICAgICAgIHRoaXMucmVnaXN0cnkuZGVzdHJveSgpOyAvLyBkZXN0cm95IHJlZ2lzdHJ5XHJcbiAgICAgICAgdGhpcy5ldmVudHMub2ZmKCk777u/IC8vIGRpc2FibGUgYWxsIGFjdGl2ZSBldmVudHNcclxuICAgICAgICB0aGlzLnNjZW5lLnJlc3RhcnQoKTvvu7/vu7/vu7/vu78gLy8gcmVzdGFydCBjdXJyZW50IHNjZW5lXHJcbiAgICAgICAgXHJcbiAgICB9LHRoaXMpO1xyXG4gICAgXHJcbiAgICB0aGlzLmxvYWQub24oJ3Byb2dyZXNzJywgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgcHJvZ3Jlc3NCYXIuY2xlYXIoKTtcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYmInKTtcclxuICAgICAgICAgICAvLyBwcm9ncmVzc0Jhci5maWxsU3R5bGUoMHhmZmZmZmYsIDEpO1xyXG4gICAgICAgICAgIC8vIHByb2dyZXNzQmFyLmZpbGxSZWN0KHJlY3QueCsyLCBobG9hZGluZywgcGVyc2VuICogdmFsdWUsIDEwKTtcclxuICAgICAgICAgICBwcm9ncmVzc0Jhci5maWxsU3R5bGUoMHhEQTRDMDAsIDEpO1xyXG4gICAgICAgICAgcHJvZ3Jlc3NCYXIuZmlsbFJlY3QocmVjdC54KzIsIGhsb2FkaW5nLCB3YmFyLCAxNik7XHJcbiAgICAgICAgICBwcm9ncmVzc0Jhci5maWxsU3R5bGUoMHg5NDREMDAsIDEpO1xyXG4gICAgICAgICAgcHJvZ3Jlc3NCYXIuZmlsbFJlY3QocmVjdC54KzIsIGhsb2FkaW5nKzE2LCB3YmFyLCAxNik7XHJcbiAgICAgICAgICAgaXNpQmFyLnNldFNjYWxlKCh2YWx1ZSp3YmFyKS8zMi4wLDEpO1xyXG4gICAgICAgICAgIC8vIGxvYWRpbmdUZXh0LnNldFRleHQoJycrcGFyc2VJbnQodmFsdWUgKiAxMDApICsgJyUnKTtcclxuICAgICAgfSk7XHJcbiAgICBcclxuICAgIHRoaXMubG9hZC5vbignY29tcGxldGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuZmluaXNoQmFyID0gdHJ1ZTtcclxuICAgICAgIH0sdGhpcyk7ICAgIFxyXG5cclxuICAgIC8vdGhpcy50aGlyZC5sb2FkLmZieCgnYXNzZXRzL2ZydWl0cy9BcHBsZUdyZWVuLkZCWCcpO1xyXG4gICAgLy8gdGhpcy5sb2FkLnNjcmlwdCgnd2ViZm9udCcsICdodHRwczovL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3dlYmZvbnQvMS42LjI2L3dlYmZvbnQuanMnKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0FtYkFyZW5hQ2xhc3NpY0xQJywnYXNzZXRzL3NvdW5kL0FtYkFyZW5hQ2xhc3NpY0xQLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdNdXNpY01lbnUnLCdhc3NldHMvc291bmQvTXVzaWNNZW51Lm1wMycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygnQmxhZGVSZWd1bGFyU3dpcGUwMScsJ2Fzc2V0cy9zb3VuZC9CbGFkZVJlZ3VsYXJTd2lwZTAxLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdCbGFkZVJlZ3VsYXJTd2lwZTAyJywnYXNzZXRzL3NvdW5kL0JsYWRlUmVndWxhclN3aXBlMDIubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0JsYWRlUmVndWxhclN3aXBlMDMnLCdhc3NldHMvc291bmQvQmxhZGVSZWd1bGFyU3dpcGUwMy5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygnQmxhZGVSZWd1bGFyU3dpcGUwNCcsJ2Fzc2V0cy9zb3VuZC9CbGFkZVJlZ3VsYXJTd2lwZTA0Lm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdCbGFkZVJlZ3VsYXJTd2lwZTA1JywnYXNzZXRzL3NvdW5kL0JsYWRlUmVndWxhclN3aXBlMDUubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0JsYWRlUmVndWxhclN3aXBlMDYnLCdhc3NldHMvc291bmQvQmxhZGVSZWd1bGFyU3dpcGUwNi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygnQmxhZGVSZWd1bGFyU3dpcGUwNycsJ2Fzc2V0cy9zb3VuZC9CbGFkZVJlZ3VsYXJTd2lwZTA3Lm1wMycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygnQ29tYm8zJywnYXNzZXRzL3NvdW5kL1VJQ29tYm8zRnJ1aXQubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0NvbWJvNCcsJ2Fzc2V0cy9zb3VuZC9VSUNvbWJvNEZydWl0Lm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdDb21ibzUnLCdhc3NldHMvc291bmQvVUlDb21ibzVGcnVpdC5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygnQ29tYm82JywnYXNzZXRzL3NvdW5kL1VJQ29tYm82RnJ1aXQubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0NvbWJvNycsJ2Fzc2V0cy9zb3VuZC9VSUNvbWJvN0ZydWl0Lm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdDb21ibzgnLCdhc3NldHMvc291bmQvVUlDb21ibzhGcnVpdC5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygnQ29tYm85JywnYXNzZXRzL3NvdW5kL1VJQ29tYm85RnJ1aXQubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0NvbWJvMTAnLCdhc3NldHMvc291bmQvVUlDb21ibzEwRnJ1aXRQbHVzLm1wMycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygnVUlDcml0aWNhbCcsJ2Fzc2V0cy9zb3VuZC9VSUNyaXRpY2FsLm1wMycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygnQm9tYkZ1c2VMUCcsJ2Fzc2V0cy9zb3VuZC9Cb21iRnVzZUxQLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdCb21iTGF1bmNoJywnYXNzZXRzL3NvdW5kL0JvbWJMYXVuY2gubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0JvbWJFeHBsb2RlR2FtZU92ZXInLCdhc3NldHMvc291bmQvQm9tYkV4cGxvZGVHYW1lT3Zlci5tcDMnKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0ZydWl0SW1wYWN0QXBwbGUnLCdhc3NldHMvc291bmQvRnJ1aXRJbXBhY3RBcHBsZS5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygnRnJ1aXRJbXBhY3RCaWdIb2xsb3cnLCdhc3NldHMvc291bmQvRnJ1aXRJbXBhY3RCaWdIb2xsb3cubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0ZydWl0SW1wYWN0QmlnV2V0MDEnLCdhc3NldHMvc291bmQvRnJ1aXRJbXBhY3RCaWdXZXQwMS5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygnRnJ1aXRJbXBhY3RCaWdXZXQwMicsJ2Fzc2V0cy9zb3VuZC9GcnVpdEltcGFjdEJpZ1dldDAyLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdGcnVpdEltcGFjdEJpZ1dldDAzJywnYXNzZXRzL3NvdW5kL0ZydWl0SW1wYWN0QmlnV2V0MDMubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0ZydWl0SW1wYWN0TWVkaXVtRHJ5JywnYXNzZXRzL3NvdW5kL0ZydWl0SW1wYWN0TWVkaXVtRHJ5Lm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdGcnVpdEltcGFjdE1lZGl1bVdldDAxJywnYXNzZXRzL3NvdW5kL0ZydWl0SW1wYWN0TWVkaXVtV2V0MDEubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ0ZydWl0SW1wYWN0TWVkaXVtV2V0MDInLCdhc3NldHMvc291bmQvRnJ1aXRJbXBhY3RNZWRpdW1XZXQwMi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygnRnJ1aXRJbXBhY3RNZWRpdW1XZXQwMycsJ2Fzc2V0cy9zb3VuZC9GcnVpdEltcGFjdE1lZGl1bVdldDAzLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdGcnVpdEltcGFjdFNtYWxsV2V0MDEnLCdhc3NldHMvc291bmQvRnJ1aXRJbXBhY3RTbWFsbFdldDAxLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdGcnVpdEltcGFjdFNtYWxsV2V0MDInLCdhc3NldHMvc291bmQvRnJ1aXRJbXBhY3RTbWFsbFdldDAyLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdGcnVpdEltcGFjdFNtYWxsV2V0MDMnLCdhc3NldHMvc291bmQvRnJ1aXRJbXBhY3RTbWFsbFdldDAzLm1wMycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygnRnJ1aXRMYXVuY2gnLCdhc3NldHMvc291bmQvRnJ1aXRMYXVuY2gubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ1VJR2FuaycsJ2Fzc2V0cy9zb3VuZC9VSUdhbmsubXAzJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdVSUdhbWVPdmVyJywnYXNzZXRzL3NvdW5kL1VJR2FtZU92ZXIubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ1VJR2FtZVN0YXJ0JywnYXNzZXRzL3NvdW5kL1VJR2FtZVN0YXJ0Lm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKCdVSUV4dHJhTGlmZScsJ2Fzc2V0cy9zb3VuZC9VSUV4dHJhTGlmZS5tcDMnKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0p1aWNlUmVkJywnYXNzZXRzL3RleHR1cmVzL3BhcnRpY2xlcy9KdWljZVJlZC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnSnVpY2VHcmVlbicsJ2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvSnVpY2VHcmVlbi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnSnVpY2VEcmFnb25mcnVpdCcsJ2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvSnVpY2VEcmFnb25mcnVpdC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnSnVpY2VNYW5nbycsJ2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvSnVpY2VNYW5nby5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnSnVpY2VPcmFuZ2UnLCdhc3NldHMvdGV4dHVyZXMvcGFydGljbGVzL0p1aWNlT3JhbmdlLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdKdWljZVBpbmVhcHBsZScsJ2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvSnVpY2VQaW5lYXBwbGUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ1N0YXJDcml0aWNhbCcsJ2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvU3RhckNyaXRpY2FsLnBuZycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgnU2xpY2VEaWFtb25kTmV1dHJhbCcsJ2Fzc2V0cy9lZmZlY3RzL1NsaWNlRGlhbW9uZE5ldXRyYWwucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ1NsaWNlRGlhbW9uZENyaXRpY2FsJywnYXNzZXRzL2VmZmVjdHMvU2xpY2VEaWFtb25kQ3JpdGljYWwucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0ZydWl0U3BsYXNoJywnYXNzZXRzL2VmZmVjdHMvRnJ1aXRTcGxhc2gucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0dPVGV4dCcsJ2Fzc2V0cy9VSS9nYW1lb3ZlciB0ZXh0LnBuZycpXHJcbiAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ1NwbGFzaFNsaWNlJywnYXNzZXRzL2VmZmVjdHMvU3BsYXNoU2xpY2UucG5nJyk7XHJcbiAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ1NwbGFzaFNsaWNlMicsJ2Fzc2V0cy9lZmZlY3RzL1NwbGFzaFNsaWNlMi5wbmcnKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0hVRFdhdGVybWVsb24nLCdhc3NldHMvVUkvSFVEV2F0ZXJtZWxvbi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQ3Jvc3NCbHVlJywnYXNzZXRzL1VJL0Nyb3NzQmx1ZS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQ3Jvc3NSZWQnLCdhc3NldHMvVUkvQ3Jvc3NSZWQucG5nJyk7XHJcbiAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ0hhbGZQb3B1cCcsJ2Fzc2V0cy9VSS9TY3JvbGxCYWNraW5nUXVhZC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnSGVhZGVyV29vZCcsJ2Fzc2V0cy9VSS9IZWFkZXJXb29kLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdibGFja0FyZWFmb3JUaXRsZScsJ2Fzc2V0cy9VSS9ibGFja0FyZWFmb3JUaXRsZS5wbmcnKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0xvZ29GcnVpdCcsICdhc3NldHMvVUkvTG9nb0ZydWl0LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdMb2dvTmluamEnLCAnYXNzZXRzL1VJL0xvZ29OaW5qYS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnU2Nyb2xsTG9ja0JvYXJkJywgJ2Fzc2V0cy9VSS9QYXJjaG1lbnRCYWNraW5nU21hbGwucG5nJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdJbXBhY3RDbGFzc2ljJywgJ2Fzc2V0cy9lZmZlY3RzL0ltcGFjdENsYXNzaWMucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ1JpbmcnLCAnYXNzZXRzL2VmZmVjdHMvUmluZzAxLnBuZycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgnR2xvdycsICdhc3NldHMvZWZmZWN0cy9HbG93LnBuZycpO1xyXG5cclxuICAgIC8vUmVzdWx0IFNjcmVlblxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdQYXJjaG1lbnRCYWNraW5nTGFyZ2UnLCdhc3NldHMvVUkvUGFyY2htZW50QmFja2luZ0xhcmdlLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdTZW5zZWlIZWFkJywnYXNzZXRzL1VJL1NlbnNlaUhlYWQucG5nJyk7XHJcblxyXG4gICAgLy9TZXR0aW5ncyBTY3JlZW5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQm9yZGVyV29vZCcsJ2Fzc2V0cy9VSS9Cb3JkZXJXb29kLnBuZycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQm9yZGVyV29vZFRMJywnYXNzZXRzL1VJL0JvcmRlcldvb2RUb3BMZWZ0LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdCb3JkZXJXb29kVCcsJ2Fzc2V0cy9VSS9Cb3JkZXJXb29kVG9wLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdCb3JkZXJXb29kVFInLCdhc3NldHMvVUkvQm9yZGVyV29vZFRvcFJpZ2h0LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdCb3JkZXJXb29kTCcsJ2Fzc2V0cy9VSS9Cb3JkZXJXb29kTGVmdC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQm9yZGVyV29vZFInLCdhc3NldHMvVUkvQm9yZGVyV29vZFJpZ2h0LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdCb3JkZXJXb29kQkwnLCdhc3NldHMvVUkvQm9yZGVyV29vZEJvdHRvbUxlZnQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0JvcmRlcldvb2RCJywnYXNzZXRzL1VJL0JvcmRlcldvb2RCb3R0b20ucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0JvcmRlcldvb2RCUicsJ2Fzc2V0cy9VSS9Cb3JkZXJXb29kQm90dG9tUmlnaHQucG5nJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdCYWNraW5nUGFwZXInLCdhc3NldHMvVUkvQmFja2luZ1BhcGVyLnBuZycpO1xyXG4gICAgLy8gdGhpcy5sb2FkLmltYWdlKCdTZW5zZWlPcmFuZ2UnLCdhc3NldHMvVUkvU2Vuc2VpT3JhbmdlLnBuZycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQnV0dG9uU0ZYJywnYXNzZXRzL1VJL0J1dHRvblNGWC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQnV0dG9uU0ZYTXV0ZScsJ2Fzc2V0cy9VSS9CdXR0b25TRlhNdXRlLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdCdXR0b25NdXNpYycsJ2Fzc2V0cy9VSS9CdXR0b25NdXNpYy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnQnV0dG9uTXVzaWNNdXRlJywnYXNzZXRzL1VJL0J1dHRvbk11c2ljTXV0ZS5wbmcnKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ0J1dHRvbkNsYXNzaWMnLCdhc3NldHMvVUkvY2lyY2xlMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnTWVkaXVtQnV0dG9uJywnYXNzZXRzL1VJL21lZGl1bV9idXR0b24ucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ1NtYWxsQnV0dG9uJywnYXNzZXRzL1VJL3NtYWxsX2J1dHRvbi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnTWVkaXVtU21hbGxCdXR0b24nLCdhc3NldHMvVUkvbWVkaXVtX3NtYWxsX2J1dHRvbi5wbmcnKTtcclxuICAgIFxyXG5cclxuICAgIC8vIHRoaXMubG9hZC5iaW5hcnkoJ1dhdGVybWVsb25UZXh0MicsJ2Fzc2V0cy9mcnVpdHMvQ1dhdGVybWVsb24uRkJYJyk7XHJcbiAgICAvLyB0aGlzLmxvYWQuYmluYXJ5KCdXYXRlcm1lbG9uVGV4dCcsJ2Fzc2V0cy9mcnVpdHMvNWhYaTRLNEdYVDM1VnhRM04nKTtcclxuXHJcbiAgICBpbml0aWFsaXplUG9raVNESygpO1xyXG5cclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIFxyXG4gICAgbGV0IG1lID0gdGhpcztcclxuICAgIC8vIFdlYkZvbnQubG9hZCh7XHJcbiAgICAvLyAgICAgY3VzdG9tOiB7XHJcbiAgICAvLyAgICAgICAgIGZhbWlsaWVzOiBbICdnYW5nb2ZjaGluZXNlJyBdXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBhY3RpdmU6IGZ1bmN0aW9uICgpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICAvL21lLnNjZW5lLnN0YXJ0KCdNYWluU2NlbmUnKVxyXG4gICAgLy8gICAgICAgICBtZS5maW5pc2hGb250ID0gdHJ1ZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9KTtcclxuICAgIHRoaXMub25jZSA9IGZhbHNlO1xyXG4gICAgLy8gdGhpcy5zY2VuZS5zdGFydCgnTWFpblNjZW5lJylcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgaG93IHlvdSB3b3VsZCBkeW5hbWljYWxseSBpbXBvcnQgdGhlIG1haW5TY2VuZSBjbGFzcyAod2l0aCBjb2RlIHNwbGl0dGluZyksXHJcbiAgICAgKiBhZGQgdGhlIG1haW5TY2VuZSB0byB0aGUgU2NlbmUgTWFuYWdlclxyXG4gICAgICogYW5kIHN0YXJ0IHRoZSBzY2VuZS5cclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBjaHVuayB3b3VsZCBiZSAnbWFpblNjZW5lLmNodW5rLmpzXHJcbiAgICAgKiBGaW5kIG1vcmUgYWJvdXQgY29kZSBzcGxpdHRpbmcgaGVyZTogaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9ndWlkZXMvY29kZS1zcGxpdHRpbmcvXHJcbiAgICAgKi9cclxuICAgIC8vIGxldCBzb21lQ29uZGl0aW9uID0gdHJ1ZVxyXG4gICAgLy8gaWYgKHNvbWVDb25kaXRpb24pXHJcbiAgICAvLyAgIGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIm1haW5TY2VuZVwiICovICcuL21haW5TY2VuZScpLnRoZW4obWFpblNjZW5lID0+IHtcclxuICAgIC8vICAgICB0aGlzLnNjZW5lLmFkZCgnTWFpblNjZW5lJywgbWFpblNjZW5lLmRlZmF1bHQsIHRydWUpXHJcbiAgICAvLyAgIH0pXHJcbiAgICAvLyBlbHNlIGNvbnNvbGUubG9nKCdUaGUgbWFpblNjZW5lIGNsYXNzIHdpbGwgbm90IGV2ZW4gYmUgbG9hZGVkIGJ5IHRoZSBicm93c2VyJylcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpe1xyXG4gICAgaWYodGhpcy5maW5pc2hGb250ICYmIHRoaXMuZmluaXNoQmFyICYmICF0aGlzLm9uY2Upe1xyXG4gICAgICB0aGlzLm9uY2UgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNjZW5lLmxhdW5jaCgnTWFpblNjZW5lJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplUG9raVNESygpe1xyXG4gIC8vIEluaXRpYWxpemUgdGhlIFBva2kgU0RLIFxyXG4gIFBva2lTREsuaW5pdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCIqKiogUG9raSAtIFNESyBzdWNjZXNzZnVsbHkgaW5pdGlhbGl6ZWRcIik7XHJcbiAgICAvLyBmaXJlIHlvdXIgZnVuY3Rpb24gdG8gY29udGludWUgdG8gZ2FtZVxyXG4gICAgcG9raUdhbWVMb2FkaW5nRmluaXNoZWQoKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHBva2lSZXdhcmRCcmVhZCgpOyB9LCAyNTAwKTtcclxuICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiKioqIFBva2kgLSBTREsgSW5pdGlhbGl6ZWQsIGJ1dCB0aGUgdXNlciBsaWtlbHkgaGFzIGFkYmxvY2tcIik7XHJcbiAgICAgIC8vIGZpcmUgeW91ciBmdW5jdGlvbiB0byBjb250aW51ZSB0byBnYW1lXHJcbiAgfSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuXHJcblxyXG5jb25zdCBfVlMgPSBgXHJcblx0dW5pZm9ybSBmbG9hdCBwb2ludE11bHRpcGxpZXI7XHJcblxyXG5cdGF0dHJpYnV0ZSBmbG9hdCBzaXplO1xyXG5cdGF0dHJpYnV0ZSBmbG9hdCBhbmdsZTtcclxuXHRhdHRyaWJ1dGUgdmVjNCBjb2xvdXI7XHJcblxyXG5cdHZhcnlpbmcgdmVjNCB2Q29sb3VyO1xyXG5cdHZhcnlpbmcgdmVjMiB2QW5nbGU7XHJcblxyXG5cdHZvaWQgbWFpbigpIHtcclxuXHQgIHZlYzQgbXZQb3NpdGlvbiA9IG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XHJcblxyXG5cdCAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbXZQb3NpdGlvbjtcclxuXHQgIGdsX1BvaW50U2l6ZSA9IHNpemUgKiBwb2ludE11bHRpcGxpZXIgLyBnbF9Qb3NpdGlvbi53O1xyXG5cclxuXHQgIHZBbmdsZSA9IHZlYzIoY29zKGFuZ2xlKSwgc2luKGFuZ2xlKSk7XHJcblx0ICB2Q29sb3VyID0gY29sb3VyO1xyXG5cdH1gO1xyXG5cclxuXHRjb25zdCBfRlMgPSBgXHJcblxyXG5cdHVuaWZvcm0gc2FtcGxlcjJEIGRpZmZ1c2VUZXh0dXJlO1xyXG5cclxuXHR2YXJ5aW5nIHZlYzQgdkNvbG91cjtcclxuXHR2YXJ5aW5nIHZlYzIgdkFuZ2xlO1xyXG5cclxuXHR2b2lkIG1haW4oKSB7XHJcblx0ICB2ZWMyIGNvb3JkcyA9IChnbF9Qb2ludENvb3JkIC0gMC41KSAqIG1hdDIodkFuZ2xlLngsIHZBbmdsZS55LCAtdkFuZ2xlLnksIHZBbmdsZS54KSArIDAuNTtcclxuXHQgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRChkaWZmdXNlVGV4dHVyZSwgY29vcmRzKSAqIHZDb2xvdXI7XHJcblx0fWA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb21iVHJhaWx7XHJcblx0Y29uc3RydWN0b3IocGFyYW1zKSB7XHJcblx0ICAgIGNvbnN0IHVuaWZvcm1zID0ge1xyXG5cdCAgICAgICAgZGlmZnVzZVRleHR1cmU6IHtcclxuXHQgICAgICAgICAgICAvL3ZhbHVlOiBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpLmxvYWQoJy4vcmVzb3VyY2VzL2ZpcmUucG5nJylcclxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyYW1zLnRleHR1cmVQU1xyXG5cdCAgICAgICAgfSxcclxuXHQgICAgICAgIHBvaW50TXVsdGlwbGllcjoge1xyXG5cdCAgICAgICAgICAgIC8vdmFsdWU6IHdpbmRvdy5pbm5lckhlaWdodCAvICgyLjAgKiBNYXRoLnRhbigwLjUgKiA2MC4wICogTWF0aC5QSSAvIDE4MC4wKSlcclxuXHQgICAgICAgICAgICB2YWx1ZTogNlxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9O1xyXG5cclxuXHQgICAgdGhpcy5fbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xyXG5cdCAgICAgICAgdW5pZm9ybXM6IHVuaWZvcm1zLFxyXG5cdCAgICAgICAgdmVydGV4U2hhZGVyOiBfVlMsXHJcblx0ICAgICAgICBmcmFnbWVudFNoYWRlcjogX0ZTLFxyXG5cdCAgICAgICAgYmxlbmRpbmc6IFRIUkVFLk5vcm1hbEJsZW5kaW5nLFxyXG5cdCAgICAgICAgZGVwdGhUZXN0OiB0cnVlLFxyXG5cdCAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0ICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuXHQgICAgICAgIHZlcnRleENvbG9yczogdHJ1ZVxyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIHRoaXMuY3VyWCA9IDA7XHJcblx0ICAgIHRoaXMuY3VyWSA9IDA7XHJcblx0ICAgIHRoaXMub24gPSBmYWxzZTtcclxuXHQgICAgdGhpcy5lbWl0RXZlcnkgPSAwLjE7XHJcblxyXG5cdCAgICB0aGlzLl9jYW1lcmEgPSBwYXJhbXMuY2FtZXJhO1xyXG5cdCAgICB0aGlzLl9wYXJ0aWNsZXMgPSBbXTtcclxuXHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShbXSwgMykpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3NpemUnLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShbXSwgMSkpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ2NvbG91cicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKFtdLCA0KSk7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LnNldEF0dHJpYnV0ZSgnYW5nbGUnLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShbXSwgMSkpO1xyXG5cclxuXHQgICAgdGhpcy5fcG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyh0aGlzLl9nZW9tZXRyeSwgdGhpcy5fbWF0ZXJpYWwpO1xyXG5cclxuXHQgICAgcGFyYW1zLnBhcmVudC5hZGQodGhpcy5fcG9pbnRzKTtcclxuXHJcblx0ICAgIGNvbnN0IExpbmVhclNwbGluZSA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvTGluZWFyU3BsaW5lLmpzJykuZGVmYXVsdDtcclxuXHJcblx0ICAgIHRoaXMuX2FscGhhU3BsaW5lID0gbmV3IExpbmVhclNwbGluZSgodCwgYSwgYikgPT4ge1xyXG5cdCAgICAgIHJldHVybiBhICsgdCAqIChiIC0gYSk7XHJcblx0ICAgIH0pO1xyXG5cdCAgICB0aGlzLl9hbHBoYVNwbGluZS5BZGRQb2ludCgwLjAsIDEuMCk7XHJcblx0ICAgIHRoaXMuX2FscGhhU3BsaW5lLkFkZFBvaW50KDEuMCwgMC4wKTtcclxuXHJcblx0ICAgIHRoaXMuX2NvbG91clNwbGluZSA9IG5ldyBMaW5lYXJTcGxpbmUoKHQsIGEsIGIpID0+IHtcclxuXHQgICAgICBjb25zdCBjID0gYS5jbG9uZSgpO1xyXG5cdCAgICAgIHJldHVybiBjLmxlcnAoYiwgdCk7XHJcblx0ICAgIH0pO1xyXG5cdCAgICB0aGlzLl9jb2xvdXJTcGxpbmUuQWRkUG9pbnQoMC4wLCBuZXcgVEhSRUUuQ29sb3IoMHhGRkZGRkYpKTtcclxuXHQgICAgdGhpcy5fY29sb3VyU3BsaW5lLkFkZFBvaW50KDEuMCwgbmV3IFRIUkVFLkNvbG9yKDB4RkZGRkZGKSk7XHJcblxyXG5cdCAgICB0aGlzLl9zaXplU3BsaW5lID0gbmV3IExpbmVhclNwbGluZSgodCwgYSwgYikgPT4ge1xyXG5cdCAgICAgIHJldHVybiBhICsgdCAqIChiIC0gYSk7XHJcblx0ICAgIH0pO1xyXG5cdCAgICB0aGlzLl9zaXplU3BsaW5lLkFkZFBvaW50KDAuMCwgMS4wKTtcclxuXHQgICAgdGhpcy5fc2l6ZVNwbGluZS5BZGRQb2ludCgxLjAsIDAuNSk7XHJcblx0ICBcclxuXHQgICAgdGhpcy5fVXBkYXRlR2VvbWV0cnkoKTtcclxuXHQgIH1cclxuXHJcblx0ICBfQWRkUGFydGljbGVzKHRpbWVFbGFwc2VkKSB7XHJcblx0ICBcdC8vIGNvbnNvbGUubG9nKCdhYWFhIHBzIGFhYScpO1xyXG5cdCAgICBpZiAoIXRoaXMuZ2Rmc2doaykge1xyXG5cdCAgICAgIHRoaXMuZ2Rmc2doayA9IDAuMDtcclxuXHQgICAgfVxyXG5cdCAgICB0aGlzLmdkZnNnaGsgKz0gdGltZUVsYXBzZWQ7XHJcblx0ICAgIC8vIHRoaXMuZ2Rmc2doayArPSB0aW1lRWxhcHNlZDtcclxuXHQgICAgLy8gY29uc3QgbiA9IE1hdGguZmxvb3IodGhpcy5nZGZzZ2hrICogMTAuMCk7XHJcblx0ICAgIC8vIHRoaXMuZ2Rmc2doayAtPSBuIC8gMTAuMDtcclxuXHJcblx0ICAgIGlmKHRoaXMuZ2Rmc2doaz49dGhpcy5lbWl0RXZlcnkpe1xyXG5cdCAgICAgIFx0dGhpcy5nZGZzZ2hrID0gMDtcclxuXHQgICAgICBcdC8vIGNvbnN0IGxpZmUgPSAwLjU7XHJcblxyXG5cdFx0ICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcblx0XHQgICAgICAvLyBjb25zdCBsaWZlID0gKE1hdGgucmFuZG9tKCkgKiAwLjc1ICsgMC4yNSkgKiAxMC4wO1xyXG5cdCAgICAgIGNvbnN0IGxpZmUgPSBNYXRoLnJhbmRvbSgpKjAuMiswLjM7XHJcblx0ICAgICAgdGhpcy5fcGFydGljbGVzLnB1c2goe1xyXG5cdCAgICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoXHJcblx0ICAgICAgICAgICAgICAvLyAoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIDEuMCxcclxuXHQgICAgICAgICAgICAgIHRoaXMuY3VyWCxcclxuXHQgICAgICAgICAgICAgIC8vIChNYXRoLnJhbmRvbSgpICogMiAtIDEpICogMS4wLFxyXG5cdCAgICAgICAgICAgICAgdGhpcy5jdXJZLFxyXG5cdCAgICAgICAgICAgICAgLy8gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgKiAxLjAgKyAxMCksXHJcblx0ICAgICAgICAgICAgICAzKSxcclxuXHQgICAgICAgICAgc2l6ZTogMTAuMCxcclxuXHQgICAgICAgICAgY29sb3VyOiBuZXcgVEhSRUUuQ29sb3IoKSxcclxuXHQgICAgICAgICAgYWxwaGE6IDEuMCxcclxuXHQgICAgICAgICAgbGlmZTogbGlmZSxcclxuXHQgICAgICAgICAgbWF4TGlmZTogbGlmZSxcclxuXHQgICAgICAgICAgcm90YXRpb246IC1NYXRoLlBJLFxyXG5cdCAgICAgICAgICB2ZWxvY2l0eTogbmV3IFRIUkVFLlZlY3RvcjMoMC4yNSwgMC4yNSwgMCksXHJcblx0ICAgICAgfSk7XHJcblx0XHQgICAgLy8gfVxyXG5cdFx0fVxyXG5cdCAgfVxyXG5cclxuXHQgIF9VcGRhdGVHZW9tZXRyeSgpIHtcclxuXHQgICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcblx0ICAgIGNvbnN0IHNpemVzID0gW107XHJcblx0ICAgIGNvbnN0IGNvbG91cnMgPSBbXTtcclxuXHQgICAgY29uc3QgYW5nbGVzID0gW107XHJcblxyXG5cdCAgICBmb3IgKGxldCBwIG9mIHRoaXMuX3BhcnRpY2xlcykge1xyXG5cdCAgICAgIHBvc2l0aW9ucy5wdXNoKHAucG9zaXRpb24ueCwgcC5wb3NpdGlvbi55LCBwLnBvc2l0aW9uLnopO1xyXG5cdCAgICAgIGNvbG91cnMucHVzaChwLmNvbG91ci5yLCBwLmNvbG91ci5nLCBwLmNvbG91ci5iLCBwLmFscGhhKTtcclxuXHQgICAgICBzaXplcy5wdXNoKHAuY3VycmVudFNpemUpO1xyXG5cdCAgICAgIGFuZ2xlcy5wdXNoKHAucm90YXRpb24pO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXHJcblx0ICAgICAgICAncG9zaXRpb24nLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ3NpemUnLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShzaXplcywgMSkpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXHJcblx0ICAgICAgICAnY29sb3VyJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoY29sb3VycywgNCkpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXHJcblx0ICAgICAgICAnYW5nbGUnLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShhbmdsZXMsIDEpKTtcclxuXHQgIFxyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5zaXplLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5jb2xvdXIubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5hdHRyaWJ1dGVzLmFuZ2xlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgIH1cclxuXHJcblx0ICBfVXBkYXRlUGFydGljbGVzKHRpbWVFbGFwc2VkKSB7XHJcblx0ICAgIGZvciAobGV0IHAgb2YgdGhpcy5fcGFydGljbGVzKSB7XHJcblx0ICAgICAgcC5saWZlIC09IHRpbWVFbGFwc2VkO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB0aGlzLl9wYXJ0aWNsZXMgPSB0aGlzLl9wYXJ0aWNsZXMuZmlsdGVyKHAgPT4ge1xyXG5cdCAgICAgIHJldHVybiBwLmxpZmUgPiAwLjA7XHJcblx0ICAgIH0pO1xyXG5cclxuXHQgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9wYXJ0aWNsZXMpIHtcclxuXHQgICAgICBjb25zdCB0ID0gMS4wIC0gcC5saWZlIC8gcC5tYXhMaWZlO1xyXG5cclxuXHQgICAgICBwLnJvdGF0aW9uICs9IHRpbWVFbGFwc2VkICogMC41O1xyXG5cdCAgICAgIHAuYWxwaGEgPSB0aGlzLl9hbHBoYVNwbGluZS5HZXQodCk7XHJcblx0ICAgICAgcC5jdXJyZW50U2l6ZSA9IHAuc2l6ZSAqIHRoaXMuX3NpemVTcGxpbmUuR2V0KHQpO1xyXG5cdCAgICAgIHAuY29sb3VyLmNvcHkodGhpcy5fY29sb3VyU3BsaW5lLkdldCh0KSk7XHJcblxyXG5cdCAgICAgIC8vY29uc29sZS5sb2cocC5wb3NpdGlvbik7XHJcblxyXG5cdCAgICAgIHAucG9zaXRpb24uYWRkKHAudmVsb2NpdHkuY2xvbmUoKS5tdWx0aXBseVNjYWxhcih0aW1lRWxhcHNlZCkpO1xyXG5cclxuXHQgICAgICBjb25zdCBkcmFnID0gcC52ZWxvY2l0eS5jbG9uZSgpO1xyXG5cdCAgICAgIGRyYWcubXVsdGlwbHlTY2FsYXIodGltZUVsYXBzZWQgKiAwLjEpO1xyXG5cdCAgICAgIGRyYWcueCA9IE1hdGguc2lnbihwLnZlbG9jaXR5LngpICogTWF0aC5taW4oTWF0aC5hYnMoZHJhZy54KSwgTWF0aC5hYnMocC52ZWxvY2l0eS54KSk7XHJcblx0ICAgICAgZHJhZy55ID0gTWF0aC5zaWduKHAudmVsb2NpdHkueSkgKiBNYXRoLm1pbihNYXRoLmFicyhkcmFnLnkpLCBNYXRoLmFicyhwLnZlbG9jaXR5LnkpKTtcclxuXHQgICAgICBkcmFnLnogPSBNYXRoLnNpZ24ocC52ZWxvY2l0eS56KSAqIE1hdGgubWluKE1hdGguYWJzKGRyYWcueiksIE1hdGguYWJzKHAudmVsb2NpdHkueikpO1xyXG5cdCAgICAgIHAudmVsb2NpdHkuc3ViKGRyYWcpO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB0aGlzLl9wYXJ0aWNsZXMuc29ydCgoYSwgYikgPT4ge1xyXG5cdCAgICAgIGNvbnN0IGQxID0gdGhpcy5fY2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oYS5wb3NpdGlvbik7XHJcblx0ICAgICAgY29uc3QgZDIgPSB0aGlzLl9jYW1lcmEucG9zaXRpb24uZGlzdGFuY2VUbyhiLnBvc2l0aW9uKTtcclxuXHJcblx0ICAgICAgaWYgKGQxID4gZDIpIHtcclxuXHQgICAgICAgIHJldHVybiAtMTtcclxuXHQgICAgICB9XHJcblxyXG5cdCAgICAgIGlmIChkMSA8IGQyKSB7XHJcblx0ICAgICAgICByZXR1cm4gMTtcclxuXHQgICAgICB9XHJcblxyXG5cdCAgICAgIHJldHVybiAwO1xyXG5cdCAgICB9KTtcclxuXHQgIH1cclxuXHJcblx0ICBTdGVwKHRpbWVFbGFwc2VkKSB7XHJcblx0ICBcdGlmKHRoaXMub24pe1xyXG5cdCAgXHRcdHRoaXMuX0FkZFBhcnRpY2xlcyh0aW1lRWxhcHNlZCk7XHJcblx0ICBcdH1cclxuXHQgICAgXHJcblx0ICAgIHRoaXMuX1VwZGF0ZVBhcnRpY2xlcyh0aW1lRWxhcHNlZCk7XHJcblx0ICAgIHRoaXMuX1VwZGF0ZUdlb21ldHJ5KCk7XHJcblx0ICB9XHJcblxyXG5cdCAgc2V0UG9zaXRpb24ocG9zWCxwb3NZKXtcclxuXHQgIFx0dGhpcy5jdXJYID0gcG9zWDtcclxuXHQgIFx0dGhpcy5jdXJZID0gcG9zWTtcclxuXHQgIFx0Ly8gdGhpcy5fcGFydGljbGVzLnBvc2l0aW9uLnggPSBwb3NYO1xyXG5cdCAgXHQvLyB0aGlzLl9wYXJ0aWNsZXMucG9zaXRpb24ueSA9IHBvc1k7XHJcblx0ICB9XHJcblxyXG5cdCAgc2V0T2ZmKCl7XHJcblx0ICBcdHRoaXMub24gPSBmYWxzZTtcclxuXHQgIH1cclxuXHJcblx0ICBzZXRPbigpe1xyXG5cdCAgXHR0aGlzLm9uID0gdHJ1ZTtcclxuXHQgIH1cclxuXHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgU2NlbmUzRCwgVEhSRUUsIEV4dGVuZGVkT2JqZWN0M0QsIEV4dGVuZGVkTWVzaCB9IGZyb20gJ0BlbmFibGUzZC9waGFzZXItZXh0ZW5zaW9uJ1xyXG5cclxuXHJcbmNvbnN0IF9WUyA9IGBcclxuXHR1bmlmb3JtIGZsb2F0IHBvaW50TXVsdGlwbGllcjtcclxuXHJcblx0YXR0cmlidXRlIGZsb2F0IHNpemU7XHJcblx0YXR0cmlidXRlIGZsb2F0IGFuZ2xlO1xyXG5cdGF0dHJpYnV0ZSB2ZWM0IGNvbG91cjtcclxuXHJcblx0dmFyeWluZyB2ZWM0IHZDb2xvdXI7XHJcblx0dmFyeWluZyB2ZWMyIHZBbmdsZTtcclxuXHJcblx0dm9pZCBtYWluKCkge1xyXG5cdCAgdmVjNCBtdlBvc2l0aW9uID0gbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcclxuXHJcblx0ICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtdlBvc2l0aW9uO1xyXG5cdCAgZ2xfUG9pbnRTaXplID0gc2l6ZSAqIHBvaW50TXVsdGlwbGllciAvIGdsX1Bvc2l0aW9uLnc7XHJcblxyXG5cdCAgdkFuZ2xlID0gdmVjMihjb3MoYW5nbGUpLCBzaW4oYW5nbGUpKTtcclxuXHQgIHZDb2xvdXIgPSBjb2xvdXI7XHJcblx0fWA7XHJcblxyXG5cdGNvbnN0IF9GUyA9IGBcclxuXHJcblx0dW5pZm9ybSBzYW1wbGVyMkQgZGlmZnVzZVRleHR1cmU7XHJcblxyXG5cdHZhcnlpbmcgdmVjNCB2Q29sb3VyO1xyXG5cdHZhcnlpbmcgdmVjMiB2QW5nbGU7XHJcblxyXG5cdHZvaWQgbWFpbigpIHtcclxuXHQgIHZlYzIgY29vcmRzID0gKGdsX1BvaW50Q29vcmQgLSAwLjUpICogbWF0Mih2QW5nbGUueCwgdkFuZ2xlLnksIC12QW5nbGUueSwgdkFuZ2xlLngpICsgMC41O1xyXG5cdCAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKGRpZmZ1c2VUZXh0dXJlLCBjb29yZHMpICogdkNvbG91cjtcclxuXHR9YDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbWJUcmFpbHtcclxuXHRjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuXHQgICAgY29uc3QgdW5pZm9ybXMgPSB7XHJcblx0ICAgICAgICBkaWZmdXNlVGV4dHVyZToge1xyXG5cdCAgICAgICAgICAgIC8vdmFsdWU6IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZCgnLi9yZXNvdXJjZXMvZmlyZS5wbmcnKVxyXG5cdCAgICAgICAgICAgIHZhbHVlOiBwYXJhbXMudGV4dHVyZVBTXHJcblx0ICAgICAgICB9LFxyXG5cdCAgICAgICAgcG9pbnRNdWx0aXBsaWVyOiB7XHJcblx0ICAgICAgICAgICAgLy92YWx1ZTogd2luZG93LmlubmVySGVpZ2h0IC8gKDIuMCAqIE1hdGgudGFuKDAuNSAqIDYwLjAgKiBNYXRoLlBJIC8gMTgwLjApKVxyXG5cdCAgICAgICAgICAgIHZhbHVlOiA2XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH07XHJcblxyXG5cdCAgICB0aGlzLl9tYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XHJcblx0ICAgICAgICB1bmlmb3JtczogdW5pZm9ybXMsXHJcblx0ICAgICAgICB2ZXJ0ZXhTaGFkZXI6IF9WUyxcclxuXHQgICAgICAgIGZyYWdtZW50U2hhZGVyOiBfRlMsXHJcblx0ICAgICAgICBibGVuZGluZzogVEhSRUUuTm9ybWFsQmxlbmRpbmcsXHJcblx0ICAgICAgICBkZXB0aFRlc3Q6IHRydWUsXHJcblx0ICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHQgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxyXG5cdCAgICAgICAgdmVydGV4Q29sb3JzOiB0cnVlXHJcblx0ICAgIH0pO1xyXG5cclxuXHQgICAgdGhpcy5jdXJYID0gMDtcclxuXHQgICAgdGhpcy5jdXJZID0gMDtcclxuXHQgICAgdGhpcy5vbiA9IGZhbHNlO1xyXG5cclxuXHQgICAgdGhpcy5fY2FtZXJhID0gcGFyYW1zLmNhbWVyYTtcclxuXHQgICAgdGhpcy5fcGFydGljbGVzID0gW107XHJcblxyXG5cdCAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoW10sIDMpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdzaXplJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoW10sIDEpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdjb2xvdXInLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShbXSwgNCkpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ2FuZ2xlJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoW10sIDEpKTtcclxuXHJcblx0ICAgIHRoaXMuX3BvaW50cyA9IG5ldyBUSFJFRS5Qb2ludHModGhpcy5fZ2VvbWV0cnksIHRoaXMuX21hdGVyaWFsKTtcclxuXHJcblx0ICAgIHBhcmFtcy5wYXJlbnQuYWRkKHRoaXMuX3BvaW50cyk7XHJcblxyXG5cdCAgICBjb25zdCBMaW5lYXJTcGxpbmUgPSByZXF1aXJlKCcuLy4uL3V0aWxzL0xpbmVhclNwbGluZS5qcycpLmRlZmF1bHQ7XHJcblxyXG5cdCAgICB0aGlzLl9hbHBoYVNwbGluZSA9IG5ldyBMaW5lYXJTcGxpbmUoKHQsIGEsIGIpID0+IHtcclxuXHQgICAgICByZXR1cm4gYSArIHQgKiAoYiAtIGEpO1xyXG5cdCAgICB9KTtcclxuXHQgICAgdGhpcy5fYWxwaGFTcGxpbmUuQWRkUG9pbnQoMC4wLCAxLjApO1xyXG5cdCAgICB0aGlzLl9hbHBoYVNwbGluZS5BZGRQb2ludCgxLjAsIDEuMCk7XHJcblxyXG5cdCAgICB0aGlzLl9jb2xvdXJTcGxpbmUgPSBuZXcgTGluZWFyU3BsaW5lKCh0LCBhLCBiKSA9PiB7XHJcblx0ICAgICAgY29uc3QgYyA9IGEuY2xvbmUoKTtcclxuXHQgICAgICByZXR1cm4gYy5sZXJwKGIsIHQpO1xyXG5cdCAgICB9KTtcclxuXHQgICAgdGhpcy5fY29sb3VyU3BsaW5lLkFkZFBvaW50KDAuMCwgbmV3IFRIUkVFLkNvbG9yKDB4RkZGRkZGKSk7XHJcblx0ICAgIHRoaXMuX2NvbG91clNwbGluZS5BZGRQb2ludCgxLjAsIG5ldyBUSFJFRS5Db2xvcigweEZGRjQyNSkpO1xyXG5cclxuXHQgICAgdGhpcy5fc2l6ZVNwbGluZSA9IG5ldyBMaW5lYXJTcGxpbmUoKHQsIGEsIGIpID0+IHtcclxuXHQgICAgICByZXR1cm4gYSArIHQgKiAoYiAtIGEpO1xyXG5cdCAgICB9KTtcclxuXHQgICAgdGhpcy5fc2l6ZVNwbGluZS5BZGRQb2ludCgwLjAsIDAuMCk7XHJcblx0ICAgIHRoaXMuX3NpemVTcGxpbmUuQWRkUG9pbnQoMC41LCAxLjApO1xyXG5cdCAgICB0aGlzLl9zaXplU3BsaW5lLkFkZFBvaW50KDEuMCwgMC4wKTtcclxuXHQgIFxyXG5cdCAgICB0aGlzLl9VcGRhdGVHZW9tZXRyeSgpO1xyXG5cdCAgfVxyXG5cclxuXHQgIF9BZGRQYXJ0aWNsZXModGltZUVsYXBzZWQpIHtcclxuXHQgIFx0Ly8gY29uc29sZS5sb2coJ2FhYWEgcHMgYWFhJyk7XHJcblx0ICAgIGlmICghdGhpcy5nZGZzZ2hrKSB7XHJcblx0ICAgICAgdGhpcy5nZGZzZ2hrID0gMC4wO1xyXG5cdCAgICB9XHJcblx0ICAgIHRoaXMuZ2Rmc2doayArPSB0aW1lRWxhcHNlZDtcclxuXHQgICAgY29uc3QgbiA9IE1hdGguZmxvb3IodGhpcy5nZGZzZ2hrICogMjAuMCk7XHJcblx0ICAgIHRoaXMuZ2Rmc2doayAtPSBuIC8gMjAuMDtcclxuXHJcblx0ICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcblx0ICAgICAgLy8gY29uc3QgbGlmZSA9IChNYXRoLnJhbmRvbSgpICogMC43NSArIDAuMjUpICogMTAuMDtcclxuXHQgICAgICBjb25zdCBsaWZlID0gMC4yO1xyXG5cdCAgICAgIGxldCBzdWR1dCA9IE1hdGgucmFuZG9tKCkgKiAyLjAgKiBNYXRoLlBJO1xyXG5cdCAgICAgIGxldCBzcGVlZCA9IE1hdGgucmFuZG9tKCkgKiAxLjUrMC41O1xyXG5cdCAgICAgIC8vIHN1ZHV0ID0gLU1hdGguUEk7XHJcblx0ICAgICAgLy8gc3VkdXQgPSAwO1xyXG5cdCAgICAgIHN1ZHV0ID0gc3VkdXQrMC41MjM7XHJcblxyXG5cdCAgICAgIHRoaXMuX3BhcnRpY2xlcy5wdXNoKHtcclxuXHQgICAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKFxyXG5cdCAgICAgICAgICAgICAgLy8gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgKiAxLjAsXHJcblx0ICAgICAgICAgICAgICB0aGlzLmN1clgsXHJcblx0ICAgICAgICAgICAgICAvLyAoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIDEuMCxcclxuXHQgICAgICAgICAgICAgIHRoaXMuY3VyWSxcclxuXHQgICAgICAgICAgICAgIC8vIChNYXRoLnJhbmRvbSgpICogMiAtIDEpICogMS4wICsgMTApLFxyXG5cdCAgICAgICAgICAgICAgMTApLFxyXG5cdCAgICAgICAgICBzaXplOiBNYXRoLnJhbmRvbSgpKjYuMCs0LjgsXHJcblx0ICAgICAgICAgIGNvbG91cjogbmV3IFRIUkVFLkNvbG9yKCksXHJcblx0ICAgICAgICAgIGFscGhhOiAxLjAsXHJcblx0ICAgICAgICAgIGxpZmU6IGxpZmUsXHJcblx0ICAgICAgICAgIG1heExpZmU6IGxpZmUsXHJcblx0ICAgICAgICAgIHJvdGF0aW9uOiBzdWR1dCxcclxuXHQgICAgICAgICAgdmVsb2NpdHk6IG5ldyBUSFJFRS5WZWN0b3IzKE1hdGguY29zKC1zdWR1dCkqc3BlZWQsIE1hdGguc2luKC1zdWR1dCkqc3BlZWQsIE1hdGgucmFuZG9tKCkqMi4wLTEuMCksXHJcblx0ICAgICAgfSk7XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHJcblx0ICBfVXBkYXRlR2VvbWV0cnkoKSB7XHJcblx0ICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG5cdCAgICBjb25zdCBzaXplcyA9IFtdO1xyXG5cdCAgICBjb25zdCBjb2xvdXJzID0gW107XHJcblx0ICAgIGNvbnN0IGFuZ2xlcyA9IFtdO1xyXG5cclxuXHQgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9wYXJ0aWNsZXMpIHtcclxuXHQgICAgICBwb3NpdGlvbnMucHVzaChwLnBvc2l0aW9uLngsIHAucG9zaXRpb24ueSwgcC5wb3NpdGlvbi56KTtcclxuXHQgICAgICBjb2xvdXJzLnB1c2gocC5jb2xvdXIuciwgcC5jb2xvdXIuZywgcC5jb2xvdXIuYiwgcC5hbHBoYSk7XHJcblx0ICAgICAgc2l6ZXMucHVzaChwLmN1cnJlbnRTaXplKTtcclxuXHQgICAgICBhbmdsZXMucHVzaChwLnJvdGF0aW9uKTtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LnNldEF0dHJpYnV0ZShcclxuXHQgICAgICAgICdzaXplJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoc2l6ZXMsIDEpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ2NvbG91cicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKGNvbG91cnMsIDQpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ2FuZ2xlJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoYW5nbGVzLCAxKSk7XHJcblx0ICBcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LmF0dHJpYnV0ZXMuc2l6ZS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LmF0dHJpYnV0ZXMuY29sb3VyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5hbmdsZS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0ICB9XHJcblxyXG5cdCAgX1VwZGF0ZVBhcnRpY2xlcyh0aW1lRWxhcHNlZCkge1xyXG5cdCAgICBmb3IgKGxldCBwIG9mIHRoaXMuX3BhcnRpY2xlcykge1xyXG5cdCAgICAgIHAubGlmZSAtPSB0aW1lRWxhcHNlZDtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgdGhpcy5fcGFydGljbGVzID0gdGhpcy5fcGFydGljbGVzLmZpbHRlcihwID0+IHtcclxuXHQgICAgICByZXR1cm4gcC5saWZlID4gMC4wO1xyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIGZvciAobGV0IHAgb2YgdGhpcy5fcGFydGljbGVzKSB7XHJcblx0ICAgICAgY29uc3QgdCA9IDEuMCAtIHAubGlmZSAvIHAubWF4TGlmZTtcclxuXHJcblx0ICAgICAgLy8gcC5yb3RhdGlvbiArPSB0aW1lRWxhcHNlZCAqIDAuNTtcclxuXHQgICAgICBwLmFscGhhID0gdGhpcy5fYWxwaGFTcGxpbmUuR2V0KHQpO1xyXG5cdCAgICAgIHAuY3VycmVudFNpemUgPSBwLnNpemUgKiB0aGlzLl9zaXplU3BsaW5lLkdldCh0KTtcclxuXHQgICAgICBwLmNvbG91ci5jb3B5KHRoaXMuX2NvbG91clNwbGluZS5HZXQodCkpO1xyXG5cclxuXHQgICAgICAvL2NvbnNvbGUubG9nKHAucG9zaXRpb24pO1xyXG5cclxuXHQgICAgICBwLnBvc2l0aW9uLmFkZChwLnZlbG9jaXR5LmNsb25lKCkubXVsdGlwbHlTY2FsYXIodGltZUVsYXBzZWQpKTtcclxuXHJcblx0ICAgICAgY29uc3QgZHJhZyA9IHAudmVsb2NpdHkuY2xvbmUoKTtcclxuXHQgICAgICBkcmFnLm11bHRpcGx5U2NhbGFyKHRpbWVFbGFwc2VkICogMC4xKTtcclxuXHQgICAgICBkcmFnLnggPSBNYXRoLnNpZ24ocC52ZWxvY2l0eS54KSAqIE1hdGgubWluKE1hdGguYWJzKGRyYWcueCksIE1hdGguYWJzKHAudmVsb2NpdHkueCkpO1xyXG5cdCAgICAgIGRyYWcueSA9IE1hdGguc2lnbihwLnZlbG9jaXR5LnkpICogTWF0aC5taW4oTWF0aC5hYnMoZHJhZy55KSwgTWF0aC5hYnMocC52ZWxvY2l0eS55KSk7XHJcblx0ICAgICAgZHJhZy56ID0gTWF0aC5zaWduKHAudmVsb2NpdHkueikgKiBNYXRoLm1pbihNYXRoLmFicyhkcmFnLnopLCBNYXRoLmFicyhwLnZlbG9jaXR5LnopKTtcclxuXHQgICAgICBwLnZlbG9jaXR5LnN1YihkcmFnKTtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgdGhpcy5fcGFydGljbGVzLnNvcnQoKGEsIGIpID0+IHtcclxuXHQgICAgICBjb25zdCBkMSA9IHRoaXMuX2NhbWVyYS5wb3NpdGlvbi5kaXN0YW5jZVRvKGEucG9zaXRpb24pO1xyXG5cdCAgICAgIGNvbnN0IGQyID0gdGhpcy5fY2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oYi5wb3NpdGlvbik7XHJcblxyXG5cdCAgICAgIGlmIChkMSA+IGQyKSB7XHJcblx0ICAgICAgICByZXR1cm4gLTE7XHJcblx0ICAgICAgfVxyXG5cclxuXHQgICAgICBpZiAoZDEgPCBkMikge1xyXG5cdCAgICAgICAgcmV0dXJuIDE7XHJcblx0ICAgICAgfVxyXG5cclxuXHQgICAgICByZXR1cm4gMDtcclxuXHQgICAgfSk7XHJcblx0ICB9XHJcblxyXG5cdCAgU3RlcCh0aW1lRWxhcHNlZCkge1xyXG5cdCAgXHRpZih0aGlzLm9uKXtcclxuXHQgIFx0XHR0aGlzLl9BZGRQYXJ0aWNsZXModGltZUVsYXBzZWQpO1xyXG5cdCAgXHR9XHJcblx0ICAgIFxyXG5cdCAgICB0aGlzLl9VcGRhdGVQYXJ0aWNsZXModGltZUVsYXBzZWQpO1xyXG5cdCAgICB0aGlzLl9VcGRhdGVHZW9tZXRyeSgpO1xyXG5cdCAgfVxyXG5cclxuXHQgIHNldFBvc2l0aW9uKHBvc1gscG9zWSl7XHJcblx0ICBcdHRoaXMuY3VyWCA9IHBvc1g7XHJcblx0ICBcdHRoaXMuY3VyWSA9IHBvc1k7XHJcblx0ICBcdC8vIHRoaXMuX3BhcnRpY2xlcy5wb3NpdGlvbi54ID0gcG9zWDtcclxuXHQgIFx0Ly8gdGhpcy5fcGFydGljbGVzLnBvc2l0aW9uLnkgPSBwb3NZO1xyXG5cdCAgfVxyXG5cclxuXHQgIHNldE9mZigpe1xyXG5cdCAgXHR0aGlzLm9uID0gZmFsc2U7XHJcblx0ICB9XHJcblxyXG5cdCAgc2V0T24oKXtcclxuXHQgIFx0dGhpcy5vbiA9IHRydWU7XHJcblx0ICB9XHJcblxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUGhhc2VyLkdhbWVPYmplY3RzLkltYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCB4LCB5LCB0ZXh0dXJlLCBmcmFtZSkge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCB4LCB5LCB0ZXh0dXJlLCBmcmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHNjZW5lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lID0gZnJhbWU7XHJcbiAgICAgICAgLy90aGlzLm9uKCdwb2ludGVydXAnLCB0aGlzLmFuaW1hdGVSZWxlYXNlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm9uKCdwb2ludGVyZG93bicsdGhpcy5hbmltYXRlQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVDbGljaygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGVmYXVsdFNjYWxlWCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRTY2FsZVggPSB0aGlzLnNjYWxlWDtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2NhbGVZID0gdGhpcy5zY2FsZVk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5jbGlja2VkKXJldHVybjtcclxuICAgICAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tcIik7XHJcbiAgICAgICAgLy8gdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0czpbdGhpc10sXHJcbiAgICAgICAgLy8gICAgIHNjYWxlWDogdGhpcy5kZWZhdWx0U2NhbGVYIC0gMC4xLFxyXG4gICAgICAgIC8vICAgICBzY2FsZVk6IHRoaXMuZGVmYXVsdFNjYWxlWSAtIDAuMSxcclxuICAgICAgICAvLyAgICAgdGludDogJyMzMzMzMzMnLFxyXG4gICAgICAgIC8vICAgICBkdXJhdGlvbjoyNSxcclxuICAgICAgICAvLyAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGRDb3VudGVyKHtcclxuICAgICAgICAgICAgZnJvbTogMjU1LFxyXG4gICAgICAgICAgICB0bzogMjA0LFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogKHR3ZWVuKT0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5mbG9vcih0d2Vlbi5nZXRWYWx1ZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRpbnQoUGhhc2VyLkRpc3BsYXkuQ29sb3IuR2V0Q29sb3IodmFsdWUsIHZhbHVlLCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVJlbGVhc2UoKXtcclxuICAgICAgICBpZighdGhpcy5jbGlja2VkKXJldHVybjtcclxuICAgICAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlbGVhc2VcIik7XHJcbiAgICAgICAgLy8gdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0czpbdGhpc10sXHJcbiAgICAgICAgLy8gICAgIHNjYWxlWDogdGhpcy5kZWZhdWx0U2NhbGVYLFxyXG4gICAgICAgIC8vICAgICBzY2FsZVk6IHRoaXMuZGVmYXVsdFNjYWxlWSxcclxuICAgICAgICAvLyAgICAgdGludDogJyMwMDAwMDAnLFxyXG4gICAgICAgIC8vICAgICBkdXJhdGlvbjoyNSxcclxuICAgICAgICAvLyAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkQ291bnRlcih7XHJcbiAgICAgICAgICAgIGZyb206IDIwNCxcclxuICAgICAgICAgICAgdG86IDI1NSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEwMCxcclxuICAgICAgICAgICAgb25VcGRhdGU6ICh0d2Vlbik9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IE1hdGguZmxvb3IodHdlZW4uZ2V0VmFsdWUoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaW50KFBoYXNlci5EaXNwbGF5LkNvbG9yLkdldENvbG9yKHZhbHVlLCB2YWx1ZSwgdmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoaWxkKGNoaWxkKXtcclxuICAgICAgICB0aGlzLmNoaWxkID0gY2hpbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Rm9jdXMoZm9jdXMpeyAgICAgXHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZvY3VzOyAgIFxyXG4gICAgICAgIHZhciBpbWFnZUtleSA9IHRoaXMubmFtZVxyXG4gICAgICAgIGlmKGZvY3VzKSBpbWFnZUtleSA9IHRoaXMubmFtZSArIFwiX3NlbFwiO1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZSgnZ2FtZV9hc3NldHMnLCBpbWFnZUtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9pbnRlcm91dCgpe1xyXG4gICAgICAgIHZhciBpbWFnZUtleSA9IHRoaXMudGV4dHVyZS5rZXk7XHJcbiAgICAgICAgdmFyIGxhc3Q0VGV4dCA9IGltYWdlS2V5LnN1YnN0cmluZyhpbWFnZUtleS5sZW5ndGgtNCwgaW1hZ2VLZXkubGVuZ3RoKTtcclxuICAgICAgICBpZihsYXN0NFRleHQgPT0gXCJfc2VsXCIpe1xyXG4gICAgICAgICAgICBpbWFnZUtleSA9IHRoaXMudGV4dHVyZS5rZXk7XHJcbiAgICAgICAgICAgIGltYWdlS2V5ID0gaW1hZ2VLZXkuc3Vic3RyaW5nKDAsIGltYWdlS2V5Lmxlbmd0aCAtIDQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoJ2dhbWVfYXNzZXRzJywgaW1hZ2VLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVSZWxlYXNlKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcG9pbnRlcm92ZXIoKXsgICAgICAgIFxyXG4gICAgICAgIHZhciBpbWFnZUtleSA9IHRoaXMudGV4dHVyZS5rZXk7XHJcbiAgICAgICAgdmFyIGxhc3Q0VGV4dCA9IGltYWdlS2V5LnN1YnN0cmluZyhpbWFnZUtleS5sZW5ndGgtNCwgaW1hZ2VLZXkubGVuZ3RoKTtcclxuICAgICAgICBpZihsYXN0NFRleHQgIT0gXCJfc2VsXCIpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoJ2dhbWVfYXNzZXRzJywgdGhpcy50ZXh0dXJlLmtleSArIFwiX3NlbFwiKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcmVVcGRhdGUodGltZSwgZGVsdGEpIHt9XHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgU2NlbmUzRCwgVEhSRUUsIEV4dGVuZGVkT2JqZWN0M0QsIEV4dGVuZGVkTWVzaCB9IGZyb20gJ0BlbmFibGUzZC9waGFzZXItZXh0ZW5zaW9uJ1xyXG5cclxuXHJcbmNvbnN0IF9WUyA9IGBcclxuXHR1bmlmb3JtIGZsb2F0IHBvaW50TXVsdGlwbGllcjtcclxuXHJcblx0YXR0cmlidXRlIGZsb2F0IHNpemU7XHJcblx0YXR0cmlidXRlIGZsb2F0IGFuZ2xlO1xyXG5cdGF0dHJpYnV0ZSB2ZWM0IGNvbG91cjtcclxuXHJcblx0dmFyeWluZyB2ZWM0IHZDb2xvdXI7XHJcblx0dmFyeWluZyB2ZWMyIHZBbmdsZTtcclxuXHJcblx0dm9pZCBtYWluKCkge1xyXG5cdCAgdmVjNCBtdlBvc2l0aW9uID0gbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcclxuXHJcblx0ICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtdlBvc2l0aW9uO1xyXG5cdCAgZ2xfUG9pbnRTaXplID0gc2l6ZSAqIHBvaW50TXVsdGlwbGllciAvIGdsX1Bvc2l0aW9uLnc7XHJcblxyXG5cdCAgdkFuZ2xlID0gdmVjMihjb3MoYW5nbGUpLCBzaW4oYW5nbGUpKTtcclxuXHQgIHZDb2xvdXIgPSBjb2xvdXI7XHJcblx0fWA7XHJcblxyXG5cdGNvbnN0IF9GUyA9IGBcclxuXHJcblx0dW5pZm9ybSBzYW1wbGVyMkQgZGlmZnVzZVRleHR1cmU7XHJcblxyXG5cdHZhcnlpbmcgdmVjNCB2Q29sb3VyO1xyXG5cdHZhcnlpbmcgdmVjMiB2QW5nbGU7XHJcblxyXG5cdHZvaWQgbWFpbigpIHtcclxuXHQgIHZlYzIgY29vcmRzID0gKGdsX1BvaW50Q29vcmQgLSAwLjUpICogbWF0Mih2QW5nbGUueCwgdkFuZ2xlLnksIC12QW5nbGUueSwgdkFuZ2xlLngpICsgMC41O1xyXG5cdCAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKGRpZmZ1c2VUZXh0dXJlLCBjb29yZHMpICogdkNvbG91cjtcclxuXHR9YDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyaXRpY2FsVHJhaWx7XHJcblx0Y29uc3RydWN0b3IocGFyYW1zKSB7XHJcblx0ICAgIGNvbnN0IHVuaWZvcm1zID0ge1xyXG5cdCAgICAgICAgZGlmZnVzZVRleHR1cmU6IHtcclxuXHQgICAgICAgICAgICAvL3ZhbHVlOiBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpLmxvYWQoJy4vcmVzb3VyY2VzL2ZpcmUucG5nJylcclxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyYW1zLnRleHR1cmVQU1xyXG5cdCAgICAgICAgfSxcclxuXHQgICAgICAgIHBvaW50TXVsdGlwbGllcjoge1xyXG5cdCAgICAgICAgICAgIC8vdmFsdWU6IHdpbmRvdy5pbm5lckhlaWdodCAvICgyLjAgKiBNYXRoLnRhbigwLjUgKiA2MC4wICogTWF0aC5QSSAvIDE4MC4wKSlcclxuXHQgICAgICAgICAgICB2YWx1ZTogNlxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9O1xyXG5cclxuXHQgICAgdGhpcy5fbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xyXG5cdCAgICAgICAgdW5pZm9ybXM6IHVuaWZvcm1zLFxyXG5cdCAgICAgICAgdmVydGV4U2hhZGVyOiBfVlMsXHJcblx0ICAgICAgICBmcmFnbWVudFNoYWRlcjogX0ZTLFxyXG5cdCAgICAgICAgYmxlbmRpbmc6IFRIUkVFLk5vcm1hbEJsZW5kaW5nLFxyXG5cdCAgICAgICAgZGVwdGhUZXN0OiB0cnVlLFxyXG5cdCAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0ICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuXHQgICAgICAgIHZlcnRleENvbG9yczogdHJ1ZVxyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIHRoaXMuY3VyWCA9IDA7XHJcblx0ICAgIHRoaXMuY3VyWSA9IDA7XHJcblx0ICAgIHRoaXMub24gPSBmYWxzZTtcclxuXHQgICAgdGhpcy5lbWl0RXZlcnkgPSAwLjAxO1xyXG5cclxuXHQgICAgdGhpcy5fY2FtZXJhID0gcGFyYW1zLmNhbWVyYTtcclxuXHQgICAgdGhpcy5fcGFydGljbGVzID0gW107XHJcblxyXG5cdCAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoW10sIDMpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdzaXplJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoW10sIDEpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdjb2xvdXInLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShbXSwgNCkpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ2FuZ2xlJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoW10sIDEpKTtcclxuXHJcblx0ICAgIHRoaXMuX3BvaW50cyA9IG5ldyBUSFJFRS5Qb2ludHModGhpcy5fZ2VvbWV0cnksIHRoaXMuX21hdGVyaWFsKTtcclxuXHJcblx0ICAgIHBhcmFtcy5wYXJlbnQuYWRkKHRoaXMuX3BvaW50cyk7XHJcblxyXG5cdCAgICBjb25zdCBMaW5lYXJTcGxpbmUgPSByZXF1aXJlKCcuLy4uL3V0aWxzL0xpbmVhclNwbGluZS5qcycpLmRlZmF1bHQ7XHJcblxyXG5cdCAgICB0aGlzLl9hbHBoYVNwbGluZSA9IG5ldyBMaW5lYXJTcGxpbmUoKHQsIGEsIGIpID0+IHtcclxuXHQgICAgICByZXR1cm4gYSArIHQgKiAoYiAtIGEpO1xyXG5cdCAgICB9KTtcclxuXHQgICAgdGhpcy5fYWxwaGFTcGxpbmUuQWRkUG9pbnQoMC4wLCAxLjApO1xyXG5cdCAgICB0aGlzLl9hbHBoYVNwbGluZS5BZGRQb2ludCgxLjAsIDEuMCk7XHJcblxyXG5cdCAgICB0aGlzLl9jb2xvdXJTcGxpbmUgPSBuZXcgTGluZWFyU3BsaW5lKCh0LCBhLCBiKSA9PiB7XHJcblx0ICAgICAgY29uc3QgYyA9IGEuY2xvbmUoKTtcclxuXHQgICAgICByZXR1cm4gYy5sZXJwKGIsIHQpO1xyXG5cdCAgICB9KTtcclxuXHQgICAgXHJcblx0ICAgIHRoaXMuX2NvbG91clNwbGluZS5BZGRQb2ludCgwLjAsIG5ldyBUSFJFRS5Db2xvcigweDlGRjFGRikpO1xyXG5cdCAgICB0aGlzLl9jb2xvdXJTcGxpbmUuQWRkUG9pbnQoMS4wLCBuZXcgVEhSRUUuQ29sb3IoMHhGRkZGRkYpKTtcclxuXHJcblx0ICAgIHRoaXMuX3NpemVTcGxpbmUgPSBuZXcgTGluZWFyU3BsaW5lKCh0LCBhLCBiKSA9PiB7XHJcblx0ICAgICAgcmV0dXJuIGEgKyB0ICogKGIgLSBhKTtcclxuXHQgICAgfSk7XHJcblx0ICAgIHRoaXMuX3NpemVTcGxpbmUuQWRkUG9pbnQoMC4wLCAwLjcpO1xyXG5cdCAgICB0aGlzLl9zaXplU3BsaW5lLkFkZFBvaW50KDAuNSwgMC43KTtcclxuXHQgICAgLy8gdGhpcy5fc2l6ZVNwbGluZS5BZGRQb2ludCgwLjgsIDAuNyk7XHJcblx0ICAgIHRoaXMuX3NpemVTcGxpbmUuQWRkUG9pbnQoMS4wLCAwLjApO1xyXG5cdCAgXHJcblx0ICAgIHRoaXMuX1VwZGF0ZUdlb21ldHJ5KCk7XHJcblx0ICB9XHJcblxyXG5cdCAgX0FkZFBhcnRpY2xlcyh0aW1lRWxhcHNlZCkge1xyXG5cdCAgXHQvLyBjb25zb2xlLmxvZygnYWFhYSBwcyBhYWEnKTtcclxuXHQgICAgaWYgKCF0aGlzLmdkZnNnaGspIHtcclxuXHQgICAgICB0aGlzLmdkZnNnaGsgPSAwLjA7XHJcblx0ICAgIH1cclxuXHQgICAgdGhpcy5nZGZzZ2hrICs9IHRpbWVFbGFwc2VkO1xyXG5cdCAgICAvLyBjb25zdCBuID0gTWF0aC5mbG9vcih0aGlzLmdkZnNnaGsgKiAxMC4wKTtcclxuXHQgICAgLy8gdGhpcy5nZGZzZ2hrIC09IG4gLyAxMC4wO1xyXG5cclxuXHJcblx0ICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcblx0ICAgICAgLy8gY29uc3QgbGlmZSA9IChNYXRoLnJhbmRvbSgpICogMC43NSArIDAuMjUpICogMTAuMDtcclxuXHQgICAgICBpZih0aGlzLmdkZnNnaGs+PXRoaXMuZW1pdEV2ZXJ5KXtcclxuXHQgICAgICBcdHRoaXMuZ2Rmc2doayA9IDA7XHJcblx0ICAgICAgXHRjb25zdCBsaWZlID0gMS4wO1xyXG5cdFx0ICAgICAgdGhpcy5fcGFydGljbGVzLnB1c2goe1xyXG5cdFx0ICAgICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMyhcclxuXHRcdCAgICAgICAgICAgICAgLy8gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgKiAxLjAsXHJcblx0XHQgICAgICAgICAgICAgIHRoaXMuY3VyWCArIChNYXRoLnJhbmRvbSgpICogMiAtIDEpICogMC4wNSxcclxuXHRcdCAgICAgICAgICAgICAgLy8gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgKiAxLjAsXHJcblx0XHQgICAgICAgICAgICAgIHRoaXMuY3VyWSArIChNYXRoLnJhbmRvbSgpICogMiAtIDEpICogMC4wNSxcclxuXHRcdCAgICAgICAgICAgICAgLy8gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgKiAxLjAgKyAxMCksXHJcblx0XHQgICAgICAgICAgICAgIC0zMCksXHJcblx0XHQgICAgICAgICAgc2l6ZTogMTUuMCxcclxuXHRcdCAgICAgICAgICBjb2xvdXI6IG5ldyBUSFJFRS5Db2xvcigpLFxyXG5cdFx0ICAgICAgICAgIGFscGhhOiAxLjAsXHJcblx0XHQgICAgICAgICAgbGlmZTogbGlmZSxcclxuXHRcdCAgICAgICAgICBtYXhMaWZlOiBsaWZlLFxyXG5cdFx0ICAgICAgICAgIHJvdGF0aW9uOiBNYXRoLnJhbmRvbSgpICogMi4wICogTWF0aC5QSSxcclxuXHRcdCAgICAgICAgICB2ZWxvY2l0eTogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCksXHJcblx0XHQgICAgICB9KTtcclxuXHQgICAgICB9XHJcblx0ICAgICAgXHJcblx0ICAgIC8vIH1cclxuXHQgIH1cclxuXHJcblx0ICBfVXBkYXRlR2VvbWV0cnkoKSB7XHJcblx0ICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG5cdCAgICBjb25zdCBzaXplcyA9IFtdO1xyXG5cdCAgICBjb25zdCBjb2xvdXJzID0gW107XHJcblx0ICAgIGNvbnN0IGFuZ2xlcyA9IFtdO1xyXG5cclxuXHQgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9wYXJ0aWNsZXMpIHtcclxuXHQgICAgICBwb3NpdGlvbnMucHVzaChwLnBvc2l0aW9uLngsIHAucG9zaXRpb24ueSwgcC5wb3NpdGlvbi56KTtcclxuXHQgICAgICBjb2xvdXJzLnB1c2gocC5jb2xvdXIuciwgcC5jb2xvdXIuZywgcC5jb2xvdXIuYiwgcC5hbHBoYSk7XHJcblx0ICAgICAgc2l6ZXMucHVzaChwLmN1cnJlbnRTaXplKTtcclxuXHQgICAgICBhbmdsZXMucHVzaChwLnJvdGF0aW9uKTtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LnNldEF0dHJpYnV0ZShcclxuXHQgICAgICAgICdzaXplJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoc2l6ZXMsIDEpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ2NvbG91cicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKGNvbG91cnMsIDQpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ2FuZ2xlJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoYW5nbGVzLCAxKSk7XHJcblx0ICBcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LmF0dHJpYnV0ZXMuc2l6ZS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LmF0dHJpYnV0ZXMuY29sb3VyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5hbmdsZS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0ICB9XHJcblxyXG5cdCAgX1VwZGF0ZVBhcnRpY2xlcyh0aW1lRWxhcHNlZCkge1xyXG5cdCAgICBmb3IgKGxldCBwIG9mIHRoaXMuX3BhcnRpY2xlcykge1xyXG5cdCAgICAgIHAubGlmZSAtPSB0aW1lRWxhcHNlZDtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgdGhpcy5fcGFydGljbGVzID0gdGhpcy5fcGFydGljbGVzLmZpbHRlcihwID0+IHtcclxuXHQgICAgICByZXR1cm4gcC5saWZlID4gMC4wO1xyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIGZvciAobGV0IHAgb2YgdGhpcy5fcGFydGljbGVzKSB7XHJcblx0ICAgICAgY29uc3QgdCA9IDEuMCAtIHAubGlmZSAvIHAubWF4TGlmZTtcclxuXHJcblx0ICAgICAgcC5yb3RhdGlvbiArPSB0aW1lRWxhcHNlZCAqIDAuNTtcclxuXHQgICAgICBwLmFscGhhID0gdGhpcy5fYWxwaGFTcGxpbmUuR2V0KHQpO1xyXG5cdCAgICAgIHAuY3VycmVudFNpemUgPSBwLnNpemUgKiB0aGlzLl9zaXplU3BsaW5lLkdldCh0KTtcclxuXHQgICAgICBwLmNvbG91ci5jb3B5KHRoaXMuX2NvbG91clNwbGluZS5HZXQodCkpO1xyXG5cclxuXHQgICAgICAvL2NvbnNvbGUubG9nKHAucG9zaXRpb24pO1xyXG5cclxuXHQgICAgICBwLnBvc2l0aW9uLmFkZChwLnZlbG9jaXR5LmNsb25lKCkubXVsdGlwbHlTY2FsYXIodGltZUVsYXBzZWQpKTtcclxuXHJcblx0ICAgICAgY29uc3QgZHJhZyA9IHAudmVsb2NpdHkuY2xvbmUoKTtcclxuXHQgICAgICBkcmFnLm11bHRpcGx5U2NhbGFyKHRpbWVFbGFwc2VkICogMC4xKTtcclxuXHQgICAgICBkcmFnLnggPSBNYXRoLnNpZ24ocC52ZWxvY2l0eS54KSAqIE1hdGgubWluKE1hdGguYWJzKGRyYWcueCksIE1hdGguYWJzKHAudmVsb2NpdHkueCkpO1xyXG5cdCAgICAgIGRyYWcueSA9IE1hdGguc2lnbihwLnZlbG9jaXR5LnkpICogTWF0aC5taW4oTWF0aC5hYnMoZHJhZy55KSwgTWF0aC5hYnMocC52ZWxvY2l0eS55KSk7XHJcblx0ICAgICAgZHJhZy56ID0gTWF0aC5zaWduKHAudmVsb2NpdHkueikgKiBNYXRoLm1pbihNYXRoLmFicyhkcmFnLnopLCBNYXRoLmFicyhwLnZlbG9jaXR5LnopKTtcclxuXHQgICAgICBwLnZlbG9jaXR5LnN1YihkcmFnKTtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgdGhpcy5fcGFydGljbGVzLnNvcnQoKGEsIGIpID0+IHtcclxuXHQgICAgICBjb25zdCBkMSA9IHRoaXMuX2NhbWVyYS5wb3NpdGlvbi5kaXN0YW5jZVRvKGEucG9zaXRpb24pO1xyXG5cdCAgICAgIGNvbnN0IGQyID0gdGhpcy5fY2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oYi5wb3NpdGlvbik7XHJcblxyXG5cdCAgICAgIGlmIChkMSA+IGQyKSB7XHJcblx0ICAgICAgICByZXR1cm4gLTE7XHJcblx0ICAgICAgfVxyXG5cclxuXHQgICAgICBpZiAoZDEgPCBkMikge1xyXG5cdCAgICAgICAgcmV0dXJuIDE7XHJcblx0ICAgICAgfVxyXG5cclxuXHQgICAgICByZXR1cm4gMDtcclxuXHQgICAgfSk7XHJcblx0ICB9XHJcblxyXG5cdCAgU3RlcCh0aW1lRWxhcHNlZCkge1xyXG5cdCAgXHRpZih0aGlzLm9uKXtcclxuXHQgIFx0XHR0aGlzLl9BZGRQYXJ0aWNsZXModGltZUVsYXBzZWQpO1xyXG5cdCAgXHR9XHJcblx0ICAgIFxyXG5cdCAgICB0aGlzLl9VcGRhdGVQYXJ0aWNsZXModGltZUVsYXBzZWQpO1xyXG5cdCAgICB0aGlzLl9VcGRhdGVHZW9tZXRyeSgpO1xyXG5cdCAgfVxyXG5cclxuXHQgIHNldFBvc2l0aW9uKHBvc1gscG9zWSl7XHJcblx0ICBcdHRoaXMuY3VyWCA9IHBvc1g7XHJcblx0ICBcdHRoaXMuY3VyWSA9IHBvc1k7XHJcblx0ICBcdC8vIHRoaXMuX3BhcnRpY2xlcy5wb3NpdGlvbi54ID0gcG9zWDtcclxuXHQgIFx0Ly8gdGhpcy5fcGFydGljbGVzLnBvc2l0aW9uLnkgPSBwb3NZO1xyXG5cdCAgfVxyXG5cclxuXHQgIHNldE9mZigpe1xyXG5cdCAgXHR0aGlzLm9uID0gZmFsc2U7XHJcblx0ICB9XHJcblxyXG5cdCAgc2V0T24oKXtcclxuXHQgIFx0dGhpcy5vbiA9IHRydWU7XHJcblx0ICB9XHJcblxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuXHJcblxyXG5jb25zdCBfVlMgPSBgXHJcblx0dW5pZm9ybSBmbG9hdCBwb2ludE11bHRpcGxpZXI7XHJcblxyXG5cdGF0dHJpYnV0ZSBmbG9hdCBzaXplO1xyXG5cdGF0dHJpYnV0ZSBmbG9hdCBhbmdsZTtcclxuXHRhdHRyaWJ1dGUgdmVjNCBjb2xvdXI7XHJcblxyXG5cdHZhcnlpbmcgdmVjNCB2Q29sb3VyO1xyXG5cdHZhcnlpbmcgdmVjMiB2QW5nbGU7XHJcblxyXG5cdHZvaWQgbWFpbigpIHtcclxuXHQgIHZlYzQgbXZQb3NpdGlvbiA9IG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XHJcblxyXG5cdCAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbXZQb3NpdGlvbjtcclxuXHQgIGdsX1BvaW50U2l6ZSA9IHNpemUgKiBwb2ludE11bHRpcGxpZXIgLyBnbF9Qb3NpdGlvbi53O1xyXG5cclxuXHQgIHZBbmdsZSA9IHZlYzIoY29zKGFuZ2xlKSwgc2luKGFuZ2xlKSk7XHJcblx0ICB2Q29sb3VyID0gY29sb3VyO1xyXG5cdH1gO1xyXG5cclxuXHRjb25zdCBfRlMgPSBgXHJcblxyXG5cdHVuaWZvcm0gc2FtcGxlcjJEIGRpZmZ1c2VUZXh0dXJlO1xyXG5cclxuXHR2YXJ5aW5nIHZlYzQgdkNvbG91cjtcclxuXHR2YXJ5aW5nIHZlYzIgdkFuZ2xlO1xyXG5cclxuXHR2b2lkIG1haW4oKSB7XHJcblx0ICB2ZWMyIGNvb3JkcyA9IChnbF9Qb2ludENvb3JkIC0gMC41KSAqIG1hdDIodkFuZ2xlLngsIHZBbmdsZS55LCAtdkFuZ2xlLnksIHZBbmdsZS54KSArIDAuNTtcclxuXHQgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRChkaWZmdXNlVGV4dHVyZSwgY29vcmRzKSAqIHZDb2xvdXI7XHJcblx0fWA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcnVpdFRyYWlse1xyXG5cdGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG5cdCAgICBjb25zdCB1bmlmb3JtcyA9IHtcclxuXHQgICAgICAgIGRpZmZ1c2VUZXh0dXJlOiB7XHJcblx0ICAgICAgICAgICAgLy92YWx1ZTogbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCcuL3Jlc291cmNlcy9maXJlLnBuZycpXHJcblx0ICAgICAgICAgICAgdmFsdWU6IHBhcmFtcy50ZXh0dXJlUFNcclxuXHQgICAgICAgIH0sXHJcblx0ICAgICAgICBwb2ludE11bHRpcGxpZXI6IHtcclxuXHQgICAgICAgICAgICAvL3ZhbHVlOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAoMi4wICogTWF0aC50YW4oMC41ICogNjAuMCAqIE1hdGguUEkgLyAxODAuMCkpXHJcblx0ICAgICAgICAgICAgdmFsdWU6IDZcclxuXHQgICAgICAgIH1cclxuXHQgICAgfTtcclxuXHJcblx0ICAgIHRoaXMuX21hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcclxuXHQgICAgICAgIHVuaWZvcm1zOiB1bmlmb3JtcyxcclxuXHQgICAgICAgIHZlcnRleFNoYWRlcjogX1ZTLFxyXG5cdCAgICAgICAgZnJhZ21lbnRTaGFkZXI6IF9GUyxcclxuXHQgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5Ob3JtYWxCbGVuZGluZyxcclxuXHQgICAgICAgIGRlcHRoVGVzdDogdHJ1ZSxcclxuXHQgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdCAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcblx0ICAgICAgICB2ZXJ0ZXhDb2xvcnM6IHRydWVcclxuXHQgICAgfSk7XHJcblxyXG5cdCAgICB0aGlzLmN1clggPSAwO1xyXG5cdCAgICB0aGlzLmN1clkgPSAwO1xyXG5cdCAgICB0aGlzLm9uID0gZmFsc2U7XHJcblx0ICAgIHRoaXMuZW1pdEV2ZXJ5ID0gMC4wNTtcclxuXHJcblx0ICAgIHRoaXMuX2NhbWVyYSA9IHBhcmFtcy5jYW1lcmE7XHJcblx0ICAgIHRoaXMuX3BhcnRpY2xlcyA9IFtdO1xyXG5cclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKFtdLCAzKSk7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LnNldEF0dHJpYnV0ZSgnc2l6ZScsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKFtdLCAxKSk7XHJcblx0ICAgIHRoaXMuX2dlb21ldHJ5LnNldEF0dHJpYnV0ZSgnY29sb3VyJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoW10sIDQpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdhbmdsZScsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKFtdLCAxKSk7XHJcblxyXG5cdCAgICB0aGlzLl9wb2ludHMgPSBuZXcgVEhSRUUuUG9pbnRzKHRoaXMuX2dlb21ldHJ5LCB0aGlzLl9tYXRlcmlhbCk7XHJcblxyXG5cdCAgICBwYXJhbXMucGFyZW50LmFkZCh0aGlzLl9wb2ludHMpO1xyXG5cclxuXHQgICAgY29uc3QgTGluZWFyU3BsaW5lID0gcmVxdWlyZSgnLi8uLi91dGlscy9MaW5lYXJTcGxpbmUuanMnKS5kZWZhdWx0O1xyXG5cclxuXHQgICAgdGhpcy5fYWxwaGFTcGxpbmUgPSBuZXcgTGluZWFyU3BsaW5lKCh0LCBhLCBiKSA9PiB7XHJcblx0ICAgICAgcmV0dXJuIGEgKyB0ICogKGIgLSBhKTtcclxuXHQgICAgfSk7XHJcblx0ICAgIHRoaXMuX2FscGhhU3BsaW5lLkFkZFBvaW50KDAuMCwgMC4wNSk7XHJcblx0ICAgIHRoaXMuX2FscGhhU3BsaW5lLkFkZFBvaW50KDEuMCwgMC4wKTtcclxuXHJcblx0ICAgIHRoaXMuX2NvbG91clNwbGluZSA9IG5ldyBMaW5lYXJTcGxpbmUoKHQsIGEsIGIpID0+IHtcclxuXHQgICAgICBjb25zdCBjID0gYS5jbG9uZSgpO1xyXG5cdCAgICAgIHJldHVybiBjLmxlcnAoYiwgdCk7XHJcblx0ICAgIH0pO1xyXG5cdCAgICB0aGlzLl9jb2xvdXJTcGxpbmUuQWRkUG9pbnQoMC4wLCBuZXcgVEhSRUUuQ29sb3IoMHhCQ0I5ODYpKTtcclxuXHQgICAgdGhpcy5fY29sb3VyU3BsaW5lLkFkZFBvaW50KDEuMCwgbmV3IFRIUkVFLkNvbG9yKDB4QkNCOTg2KSk7XHJcblxyXG5cdCAgICB0aGlzLl9zaXplU3BsaW5lID0gbmV3IExpbmVhclNwbGluZSgodCwgYSwgYikgPT4ge1xyXG5cdCAgICAgIHJldHVybiBhICsgdCAqIChiIC0gYSk7XHJcblx0ICAgIH0pO1xyXG5cdCAgICB0aGlzLl9zaXplU3BsaW5lLkFkZFBvaW50KDAuMCwgMS4wKTtcclxuXHQgICAgdGhpcy5fc2l6ZVNwbGluZS5BZGRQb2ludCgxLjAsIDAuNSk7XHJcblx0ICBcclxuXHQgICAgdGhpcy5fVXBkYXRlR2VvbWV0cnkoKTtcclxuXHQgIH1cclxuXHJcblx0ICBfQWRkUGFydGljbGVzKHRpbWVFbGFwc2VkKSB7XHJcblx0ICBcdC8vIGNvbnNvbGUubG9nKCdhYWFhIHBzIGFhYScpO1xyXG5cdCAgICBpZiAoIXRoaXMuZ2Rmc2doaykge1xyXG5cdCAgICAgIHRoaXMuZ2Rmc2doayA9IDAuMDtcclxuXHQgICAgfVxyXG5cdCAgICB0aGlzLmdkZnNnaGsgKz0gdGltZUVsYXBzZWQ7XHJcblx0ICAgIC8vIGNvbnN0IG4gPSBNYXRoLmZsb29yKHRoaXMuZ2Rmc2doayAqIDEwLjApO1xyXG5cdCAgICAvLyB0aGlzLmdkZnNnaGsgLT0gbiAvIDEwLjA7XHJcblxyXG5cclxuXHQgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuXHQgICAgICAvLyBjb25zdCBsaWZlID0gKE1hdGgucmFuZG9tKCkgKiAwLjc1ICsgMC4yNSkgKiAxMC4wO1xyXG5cdCAgICAgIGlmKHRoaXMuZ2Rmc2doaz49dGhpcy5lbWl0RXZlcnkpe1xyXG5cdCAgICAgIFx0dGhpcy5nZGZzZ2hrID0gMDtcclxuXHQgICAgICBcdGNvbnN0IGxpZmUgPSAwLjU7XHJcblx0XHQgICAgICB0aGlzLl9wYXJ0aWNsZXMucHVzaCh7XHJcblx0XHQgICAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKFxyXG5cdFx0ICAgICAgICAgICAgICAvLyAoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIDEuMCxcclxuXHRcdCAgICAgICAgICAgICAgdGhpcy5jdXJYLFxyXG5cdFx0ICAgICAgICAgICAgICAvLyAoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIDEuMCxcclxuXHRcdCAgICAgICAgICAgICAgdGhpcy5jdXJZLFxyXG5cdFx0ICAgICAgICAgICAgICAvLyAoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIDEuMCArIDEwKSxcclxuXHRcdCAgICAgICAgICAgICAgLTMwKSxcclxuXHRcdCAgICAgICAgICBzaXplOiAyMC4wLFxyXG5cdFx0ICAgICAgICAgIGNvbG91cjogbmV3IFRIUkVFLkNvbG9yKCksXHJcblx0XHQgICAgICAgICAgYWxwaGE6IDEuMCxcclxuXHRcdCAgICAgICAgICBsaWZlOiBsaWZlLFxyXG5cdFx0ICAgICAgICAgIG1heExpZmU6IGxpZmUsXHJcblx0XHQgICAgICAgICAgcm90YXRpb246IE1hdGgucmFuZG9tKCkgKiAyLjAgKiBNYXRoLlBJLFxyXG5cdFx0ICAgICAgICAgIHZlbG9jaXR5OiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSxcclxuXHRcdCAgICAgIH0pO1xyXG5cdCAgICAgIH1cclxuXHQgICAgICBcclxuXHQgICAgLy8gfVxyXG5cdCAgfVxyXG5cclxuXHQgIF9VcGRhdGVHZW9tZXRyeSgpIHtcclxuXHQgICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcblx0ICAgIGNvbnN0IHNpemVzID0gW107XHJcblx0ICAgIGNvbnN0IGNvbG91cnMgPSBbXTtcclxuXHQgICAgY29uc3QgYW5nbGVzID0gW107XHJcblxyXG5cdCAgICBmb3IgKGxldCBwIG9mIHRoaXMuX3BhcnRpY2xlcykge1xyXG5cdCAgICAgIHBvc2l0aW9ucy5wdXNoKHAucG9zaXRpb24ueCwgcC5wb3NpdGlvbi55LCBwLnBvc2l0aW9uLnopO1xyXG5cdCAgICAgIGNvbG91cnMucHVzaChwLmNvbG91ci5yLCBwLmNvbG91ci5nLCBwLmNvbG91ci5iLCBwLmFscGhhKTtcclxuXHQgICAgICBzaXplcy5wdXNoKHAuY3VycmVudFNpemUpO1xyXG5cdCAgICAgIGFuZ2xlcy5wdXNoKHAucm90YXRpb24pO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXHJcblx0ICAgICAgICAncG9zaXRpb24nLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxyXG5cdCAgICAgICAgJ3NpemUnLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShzaXplcywgMSkpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXHJcblx0ICAgICAgICAnY29sb3VyJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoY29sb3VycywgNCkpO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXHJcblx0ICAgICAgICAnYW5nbGUnLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShhbmdsZXMsIDEpKTtcclxuXHQgIFxyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5zaXplLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgICAgdGhpcy5fZ2VvbWV0cnkuYXR0cmlidXRlcy5jb2xvdXIubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdCAgICB0aGlzLl9nZW9tZXRyeS5hdHRyaWJ1dGVzLmFuZ2xlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHQgIH1cclxuXHJcblx0ICBfVXBkYXRlUGFydGljbGVzKHRpbWVFbGFwc2VkKSB7XHJcblx0ICAgIGZvciAobGV0IHAgb2YgdGhpcy5fcGFydGljbGVzKSB7XHJcblx0ICAgICAgcC5saWZlIC09IHRpbWVFbGFwc2VkO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB0aGlzLl9wYXJ0aWNsZXMgPSB0aGlzLl9wYXJ0aWNsZXMuZmlsdGVyKHAgPT4ge1xyXG5cdCAgICAgIHJldHVybiBwLmxpZmUgPiAwLjA7XHJcblx0ICAgIH0pO1xyXG5cclxuXHQgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9wYXJ0aWNsZXMpIHtcclxuXHQgICAgICBjb25zdCB0ID0gMS4wIC0gcC5saWZlIC8gcC5tYXhMaWZlO1xyXG5cclxuXHQgICAgICBwLnJvdGF0aW9uICs9IHRpbWVFbGFwc2VkICogMC41O1xyXG5cdCAgICAgIHAuYWxwaGEgPSB0aGlzLl9hbHBoYVNwbGluZS5HZXQodCk7XHJcblx0ICAgICAgcC5jdXJyZW50U2l6ZSA9IHAuc2l6ZSAqIHRoaXMuX3NpemVTcGxpbmUuR2V0KHQpO1xyXG5cdCAgICAgIHAuY29sb3VyLmNvcHkodGhpcy5fY29sb3VyU3BsaW5lLkdldCh0KSk7XHJcblxyXG5cdCAgICAgIC8vY29uc29sZS5sb2cocC5wb3NpdGlvbik7XHJcblxyXG5cdCAgICAgIHAucG9zaXRpb24uYWRkKHAudmVsb2NpdHkuY2xvbmUoKS5tdWx0aXBseVNjYWxhcih0aW1lRWxhcHNlZCkpO1xyXG5cclxuXHQgICAgICBjb25zdCBkcmFnID0gcC52ZWxvY2l0eS5jbG9uZSgpO1xyXG5cdCAgICAgIGRyYWcubXVsdGlwbHlTY2FsYXIodGltZUVsYXBzZWQgKiAwLjEpO1xyXG5cdCAgICAgIGRyYWcueCA9IE1hdGguc2lnbihwLnZlbG9jaXR5LngpICogTWF0aC5taW4oTWF0aC5hYnMoZHJhZy54KSwgTWF0aC5hYnMocC52ZWxvY2l0eS54KSk7XHJcblx0ICAgICAgZHJhZy55ID0gTWF0aC5zaWduKHAudmVsb2NpdHkueSkgKiBNYXRoLm1pbihNYXRoLmFicyhkcmFnLnkpLCBNYXRoLmFicyhwLnZlbG9jaXR5LnkpKTtcclxuXHQgICAgICBkcmFnLnogPSBNYXRoLnNpZ24ocC52ZWxvY2l0eS56KSAqIE1hdGgubWluKE1hdGguYWJzKGRyYWcueiksIE1hdGguYWJzKHAudmVsb2NpdHkueikpO1xyXG5cdCAgICAgIHAudmVsb2NpdHkuc3ViKGRyYWcpO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB0aGlzLl9wYXJ0aWNsZXMuc29ydCgoYSwgYikgPT4ge1xyXG5cdCAgICAgIGNvbnN0IGQxID0gdGhpcy5fY2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oYS5wb3NpdGlvbik7XHJcblx0ICAgICAgY29uc3QgZDIgPSB0aGlzLl9jYW1lcmEucG9zaXRpb24uZGlzdGFuY2VUbyhiLnBvc2l0aW9uKTtcclxuXHJcblx0ICAgICAgaWYgKGQxID4gZDIpIHtcclxuXHQgICAgICAgIHJldHVybiAtMTtcclxuXHQgICAgICB9XHJcblxyXG5cdCAgICAgIGlmIChkMSA8IGQyKSB7XHJcblx0ICAgICAgICByZXR1cm4gMTtcclxuXHQgICAgICB9XHJcblxyXG5cdCAgICAgIHJldHVybiAwO1xyXG5cdCAgICB9KTtcclxuXHQgIH1cclxuXHJcblx0ICBTdGVwKHRpbWVFbGFwc2VkKSB7XHJcblx0ICBcdGlmKHRoaXMub24pe1xyXG5cdCAgXHRcdHRoaXMuX0FkZFBhcnRpY2xlcyh0aW1lRWxhcHNlZCk7XHJcblx0ICBcdH1cclxuXHQgICAgXHJcblx0ICAgIHRoaXMuX1VwZGF0ZVBhcnRpY2xlcyh0aW1lRWxhcHNlZCk7XHJcblx0ICAgIHRoaXMuX1VwZGF0ZUdlb21ldHJ5KCk7XHJcblx0ICB9XHJcblxyXG5cdCAgc2V0UG9zaXRpb24ocG9zWCxwb3NZKXtcclxuXHQgIFx0dGhpcy5jdXJYID0gcG9zWDtcclxuXHQgIFx0dGhpcy5jdXJZID0gcG9zWTtcclxuXHQgIFx0Ly8gdGhpcy5fcGFydGljbGVzLnBvc2l0aW9uLnggPSBwb3NYO1xyXG5cdCAgXHQvLyB0aGlzLl9wYXJ0aWNsZXMucG9zaXRpb24ueSA9IHBvc1k7XHJcblx0ICB9XHJcblxyXG5cdCAgc2V0T2ZmKCl7XHJcblx0ICBcdHRoaXMub24gPSBmYWxzZTtcclxuXHQgIH1cclxuXHJcblx0ICBzZXRPbigpe1xyXG5cdCAgXHR0aGlzLm9uID0gdHJ1ZTtcclxuXHQgIH1cclxuXHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgU2NlbmUzRCwgVEhSRUUsIEV4dGVuZGVkT2JqZWN0M0QsIEV4dGVuZGVkTWVzaCB9IGZyb20gJ0BlbmFibGUzZC9waGFzZXItZXh0ZW5zaW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lYXJTcGxpbmUge1xyXG5cdCAgY29uc3RydWN0b3IobGVycCkge1xyXG5cdCAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuXHQgICAgdGhpcy5fbGVycCA9IGxlcnA7XHJcblx0ICB9XHJcblxyXG5cdCAgQWRkUG9pbnQodCwgZCkge1xyXG5cdCAgICB0aGlzLl9wb2ludHMucHVzaChbdCwgZF0pO1xyXG5cdCAgfVxyXG5cclxuXHQgIEdldCh0KSB7XHJcblx0ICAgIGxldCBwMSA9IDA7XHJcblxyXG5cdCAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BvaW50cy5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgIGlmICh0aGlzLl9wb2ludHNbaV1bMF0gPj0gdCkge1xyXG5cdCAgICAgICAgYnJlYWs7XHJcblx0ICAgICAgfVxyXG5cdCAgICAgIHAxID0gaTtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgY29uc3QgcDIgPSBNYXRoLm1pbih0aGlzLl9wb2ludHMubGVuZ3RoIC0gMSwgcDEgKyAxKTtcclxuXHJcblx0ICAgIGlmIChwMSA9PSBwMikge1xyXG5cdCAgICAgIHJldHVybiB0aGlzLl9wb2ludHNbcDFdWzFdO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gdGhpcy5fbGVycChcclxuXHQgICAgICAgICh0IC0gdGhpcy5fcG9pbnRzW3AxXVswXSkgLyAoXHJcblx0ICAgICAgICAgICAgdGhpcy5fcG9pbnRzW3AyXVswXSAtIHRoaXMuX3BvaW50c1twMV1bMF0pLFxyXG5cdCAgICAgICAgdGhpcy5fcG9pbnRzW3AxXVsxXSwgdGhpcy5fcG9pbnRzW3AyXVsxXSk7XHJcblx0ICB9XHJcblx0fSIsImltcG9ydCB7IFNjZW5lM0QsIFRIUkVFLCBFeHRlbmRlZE9iamVjdDNELCBFeHRlbmRlZE1lc2ggfSBmcm9tICdAZW5hYmxlM2QvcGhhc2VyLWV4dGVuc2lvbidcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2NyZWVuU2hha2UoKSB7XHJcblxyXG5cdHJldHVybiB7XHJcblxyXG5cdFx0Ly8gV2hlbiBhIGZ1bmN0aW9uIG91dHNpZGUgU2NyZWVuU2hha2UgaGFuZGxlIHRoZSBjYW1lcmEsIGl0IHNob3VsZFxyXG5cdFx0Ly8gYWx3YXlzIGNoZWNrIHRoYXQgU2NyZWVuU2hha2UuZW5hYmxlZCBpcyBmYWxzZSBiZWZvcmUuXHJcblx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHJcblx0XHRfdGltZXN0YW1wU3RhcnQ6IHVuZGVmaW5lZCxcclxuXHJcblx0XHRfdGltZXN0YW1wRW5kOiB1bmRlZmluZWQsXHJcblxyXG5cdFx0X3N0YXJ0UG9pbnQ6IHVuZGVmaW5lZCxcclxuXHJcblx0XHRfZW5kUG9pbnQ6IHVuZGVmaW5lZCxcclxuXHJcblxyXG5cclxuXHRcdC8vIHVwZGF0ZShjYW1lcmEpIG11c3QgYmUgY2FsbGVkIGluIHRoZSBsb29wIGZ1bmN0aW9uIG9mIHRoZSByZW5kZXJlcixcclxuXHRcdC8vIGl0IHdpbGwgcmUtcG9zaXRpb24gdGhlIGNhbWVyYSBhY2NvcmRpbmcgdG8gdGhlIHJlcXVlc3RlZCBzaGFraW5nLlxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoY2FtZXJhKSB7XHJcblx0XHRcdGlmICggdGhpcy5lbmFibGVkID09IHRydWUgKSB7XHJcblx0XHRcdFx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuXHRcdFx0XHRpZiAoIHRoaXMuX3RpbWVzdGFtcEVuZCA+IG5vdyApIHtcclxuXHRcdFx0XHRcdGxldCBpbnRlcnZhbCA9IChEYXRlLm5vdygpIC0gdGhpcy5fdGltZXN0YW1wU3RhcnQpIC8gXHJcblx0XHRcdFx0XHRcdCh0aGlzLl90aW1lc3RhbXBFbmQgLSB0aGlzLl90aW1lc3RhbXBTdGFydCkgO1xyXG5cdFx0XHRcdFx0dGhpcy5jb21wdXRlUG9zaXRpb24oIGNhbWVyYSwgaW50ZXJ2YWwgKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y2FtZXJhLnBvc2l0aW9uLmNvcHkodGhpcy5fc3RhcnRQb2ludCk7XHJcblx0XHRcdFx0XHR0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHJcblxyXG5cclxuXHRcdC8vIFRoaXMgaW5pdGlhbGl6ZSB0aGUgdmFsdWVzIG9mIHRoZSBzaGFraW5nLlxyXG5cdFx0Ly8gdmVjVG9BZGQgcGFyYW0gaXMgdGhlIG9mZnNldCBvZiB0aGUgY2FtZXJhIHBvc2l0aW9uIGF0IHRoZSBjbGltYXggb2YgaXRzIHdhdmUuXHJcblx0XHRzaGFrZTogZnVuY3Rpb24gc2hha2UoY2FtZXJhLCB2ZWNUb0FkZCwgbWlsbGlzZWNvbmRzKSB7XHJcblx0XHRcdHRoaXMuZW5hYmxlZCA9IHRydWUgO1xyXG5cdFx0XHR0aGlzLl90aW1lc3RhbXBTdGFydCA9IERhdGUubm93KCk7XHJcblx0XHRcdHRoaXMuX3RpbWVzdGFtcEVuZCA9IHRoaXMuX3RpbWVzdGFtcFN0YXJ0ICsgbWlsbGlzZWNvbmRzO1xyXG5cdFx0XHR0aGlzLl9zdGFydFBvaW50ID0gbmV3IFRIUkVFLlZlY3RvcjMoKS5jb3B5KGNhbWVyYS5wb3NpdGlvbik7XHJcblx0XHRcdHRoaXMuX2VuZFBvaW50ID0gbmV3IFRIUkVFLlZlY3RvcjMoKS5hZGRWZWN0b3JzKCBjYW1lcmEucG9zaXRpb24sIHZlY1RvQWRkICk7XHJcblx0XHR9LFxyXG5cclxuXHJcblxyXG5cclxuXHRcdGNvbXB1dGVQb3NpdGlvbjogZnVuY3Rpb24gY29tcHV0ZVBvc2l0aW9uKGNhbWVyYSwgaW50ZXJ2YWwpIHtcclxuXHJcblx0XHRcdC8vIFRoaXMgY3JlYXRlcyB0aGUgd2F2eSBtb3ZlbWVudCBvZiB0aGUgY2FtZXJhIGFsb25nIHRoZSBpbnRlcnZhbC5cclxuXHRcdFx0Ly8gVGhlIGZpcnN0IGJsb2MgY2FsbCB0aGlzLmdldFF1YWRyYSgpIHdpdGggYSBwb3NpdGl2ZSBpbmRpY2UgYmV0d2VlblxyXG5cdFx0XHQvLyAwIGFuZCAxLCB0aGVuIHRoZSBzZWNvbmQgY2FsbCBpdCBhZ2FpbiB3aXRoIGEgbmVnYXRpdmUgaW5kaWNlIGJldHdlZW5cclxuXHRcdFx0Ly8gMCBhbmQgLTEsIGV0Yy4gVmFyaWFibGUgcG9zaXRpb24gd2lsbCBnZXQgdGhlIHNpZ24gb2YgdGhlIGluZGljZSwgYW5kXHJcblx0XHRcdC8vIGdldCB3YXZ5LlxyXG5cdFx0XHRpZiAoaW50ZXJ2YWwgPCAwLjQpIHtcclxuXHRcdFx0XHR2YXIgcG9zaXRpb24gPSB0aGlzLmdldFF1YWRyYSggaW50ZXJ2YWwgLyAwLjQgKTtcclxuXHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDAuNykge1xyXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UXVhZHJhKCAoaW50ZXJ2YWwtMC40KSAvIDAuMyApICogLTAuNjtcclxuXHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDAuOSkge1xyXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UXVhZHJhKCAoaW50ZXJ2YWwtMC43KSAvIDAuMiApICogMC4zO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UXVhZHJhKCAoaW50ZXJ2YWwtMC45KSAvIDAuMSApICogLTAuMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gaWYgKGludGVydmFsIDwgMC4xKSB7XHJcblx0XHRcdC8vIFx0dmFyIHBvc2l0aW9uID0gdGhpcy5nZXRRdWFkcmEoIGludGVydmFsIC8gMC4xICk7XHJcblx0XHRcdC8vIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAwLjIpIHtcclxuXHRcdFx0Ly8gXHR2YXIgcG9zaXRpb24gPSB0aGlzLmdldFF1YWRyYSggKGludGVydmFsLTAuMSkgLyAwLjggKSAqIC0wLjY7XHJcblx0XHRcdC8vIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAwLjMpIHtcclxuXHRcdFx0Ly8gXHR2YXIgcG9zaXRpb24gPSB0aGlzLmdldFF1YWRyYSggKGludGVydmFsLTAuMykgLyAwLjcgKSAqIDAuMztcclxuXHRcdFx0Ly8gfWVsc2UgaWYgKGludGVydmFsIDwgMC40KSB7XHJcblx0XHRcdC8vIFx0dmFyIHBvc2l0aW9uID0gdGhpcy5nZXRRdWFkcmEoIChpbnRlcnZhbC0wLjQpIC8gMC42ICk7XHJcblx0XHRcdC8vIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAwLjcpIHtcclxuXHRcdFx0Ly8gXHR2YXIgcG9zaXRpb24gPSB0aGlzLmdldFF1YWRyYSggKGludGVydmFsLTAuNCkgLyAwLjMgKSAqIC0wLjY7XHJcblx0XHRcdC8vIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAwLjkpIHtcclxuXHRcdFx0Ly8gXHR2YXIgcG9zaXRpb24gPSB0aGlzLmdldFF1YWRyYSggKGludGVydmFsLTAuNykgLyAwLjIgKSAqIDAuMztcclxuXHRcdFx0Ly8gfSBlbHNlIHtcclxuXHRcdFx0Ly8gXHR2YXIgcG9zaXRpb24gPSB0aGlzLmdldFF1YWRyYSggKGludGVydmFsLTAuOSkgLyAwLjEgKSAqIC0wLjE7XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0XHJcblx0XHRcdC8vIEhlcmUgdGhlIGNhbWVyYSBpcyBwb3NpdGlvbmVkIGFjY29yZGluZyB0byB0aGUgd2F2eSAncG9zaXRpb24nIHZhcmlhYmxlLlxyXG5cdFx0XHRjYW1lcmEucG9zaXRpb24ubGVycFZlY3RvcnMoIHRoaXMuX3N0YXJ0UG9pbnQsIHRoaXMuX2VuZFBvaW50LCBwb3NpdGlvbiApO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBUaGlzIGlzIGEgcXVhZHJhdGljIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIDAgYXQgZmlyc3QsIHRoZW4gcmV0dXJuIDAuNSB3aGVuIHQ9MC41LFxyXG5cdFx0Ly8gdGhlbiByZXR1cm4gMCB3aGVuIHQ9MSA7XHJcblx0XHRnZXRRdWFkcmE6IGZ1bmN0aW9uIGdldFF1YWRyYSh0KSB7XHJcblx0XHRcdHJldHVybiA5LjQzNjg5NmUtMTYgKyAoNCp0KSAtICg0Kih0KnQpKSA7XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG59O1xyXG4iLCIvKipcclxuICogUExFQVNFIERPIE5PVCBSRU1PVkUgVEhJUyBOT1RJQ0UhXHJcbiAqXHJcbiAqIEB0ZW1wbGF0ZSAgICAgICAgVGhpcyBQaGFzZXIgZ2FtZSB3YXMgYnVpbHQgdXNpbmcgcGhhc2VyLXByb2plY3QtdGVtcGxhdGUgKGh0dHBzOi8vZ2l0aHViLmNvbS95YW5kZXUvcGhhc2VyLXByb2plY3QtdGVtcGxhdGUpXHJcbiAqIEBhdXRob3IgICAgICAgICAgWWFubmljayBEZXViZWwgKGh0dHBzOi8vZ2l0aHViLmNvbS95YW5kZXUpXHJcbiAqIEBjb3B5cmlnaHQgICAgICAgMjAxOSBZYW5uaWNrIERldWJlbFxyXG4gKiBAbGljZW5zZSAgICAgICAgIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20veWFuZGV1L3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlL2Jsb2IvbWFzdGVyL0xJQ0VOU0V8TUlUIExpY2Vuc2V9XHJcbiAqL1xyXG5cclxuLy8gT2YgY291cnNlIHlvdSBjYW4gcmVtb3ZlIGl0IGlmIHlvdSByZWFsbHkgd2FudCB0bywgYnV0IGl0IHdvdWxkIGJlIG5pY2UgaWYgeW91IHdvdWxkIGxlYXZlIGl0IHRoZXJlIDopXHJcblxyXG5jb25zb2xlLmxvZyhcclxuICAnJWMgJWMgJWMgJWMgJWMgQnVpbHQgdXNpbmcgcGhhc2VyLXByb2plY3QtdGVtcGxhdGUgJWMgaHR0cHM6Ly9naXRodWIuY29tL3lhbmRldS9waGFzZXItcHJvamVjdC10ZW1wbGF0ZScsXHJcbiAgJ2JhY2tncm91bmQ6ICNmZjAwMDAnLFxyXG4gICdiYWNrZ3JvdW5kOiAjZmZmZjAwJyxcclxuICAnYmFja2dyb3VuZDogIzAwZmYwMCcsXHJcbiAgJ2JhY2tncm91bmQ6ICMwMGZmZmYnLFxyXG4gICdjb2xvcjogI2ZmZjsgYmFja2dyb3VuZDogIzAwMDAwMDsnLFxyXG4gICdiYWNrZ3JvdW5kOiBub25lJ1xyXG4pXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
JumpGame.startup("4kci7og3klgj0ivy2wz3gdvd9dth5e7n");
